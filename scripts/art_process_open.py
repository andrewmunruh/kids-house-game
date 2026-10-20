# Optional helper (not used by the build). usage: art_process_open.py items.json rawdir group kind...
# Wrapper around scripts/art_process.py (shared tool untouched): a pocket
# mask from preclean.py (raw/<k>.open.png: floor seen between legs/rockers) is
# opened and plum-ringed like any other between-parts gap.
import sys,os,numpy as np
from PIL import Image
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import art_process as ap
orig=ap.key; cur={}
def key(rgb,*a,**k):
    rgb,solid,opening=orig(rgb,*a,**k)
    f=cur.get('mask')
    if f and os.path.exists(f):
        m=np.array(Image.open(f))>127
        m&=solid; opening=opening|m; solid=solid&~m
    return rgb,solid,opening
ap.key=key
from scipy import ndimage as ndi
ofin=ap.finish
def finish(fg,al,ring):
    if cur.get('mask') and os.path.exists(cur['mask']):
        R=int(os.environ.get("RIM") or 3)
        for _ in range(2):
            solid=al>40; pk=ndi.binary_fill_holes(solid)&~solid
            lab,n=ndi.label(pk)
            for i,sl in enumerate(ndi.find_objects(lab),1):
                m=lab==i
                if m.sum()<30: continue
                rim=ndi.binary_dilation(m,iterations=R)&~m
                fg[rim]=ap.PLUM; al[rim]=255; al[m]=0
            ring=ring|(fg==ap.PLUM).all(2)
            pc=ap.plum_contour
            if _==0: ap.plum_contour=lambda f,a:(f,a)   # lay the contour once, on the last pass
            try: fg,al=ofin(fg,al,ring)
            finally: ap.plum_contour=pc
        s=al>0; lab,n=ndi.label(ndi.binary_fill_holes(s)&~s)   # seal pinholes left by the pocket rims
        for i in range(1,n+1):
            m=lab==i
            if m.sum()<30: fg[m]=ap.OUTLINE; al[m]=255
            elif m.sum()<int(os.environ.get('SEAL') or 0):   # SEAL=px: close a narrow sliver with its surroundings
                _,(iy,ix)=ndi.distance_transform_edt(~(s&~m),return_indices=True)
                fg[m]=fg[iy[m],ix[m]]; al[m]=255
        return fg,al
    return ofin(fg,al,ring)
def seal_faint(fg,al):
    """Faint pockets (alpha<200) that hold no fully clear pixel are pinholes or
    bubbles inside the outline, not see-through openings: make them solid plum."""
    lab,n=ndi.label(al<200)
    if n:
        clear=ndi.sum(al==0,lab,index=np.arange(1,n+1))
        bad=np.isin(lab,1+np.where(clear==0)[0])
        fg[bad]=ap.OUTLINE; al[bad]=255
    return fg,al
def tidy(fg,al):
    """Drop solid specks cut off from the body (with their faint halo), fill
    1-30 px clear pinholes, and with OPEN="kind:r" shave silhouette parts thinner
    than 2r px (e.g. a teat tip that turns into a plum spike) and re-lay the edge."""
    solid=al>=200; lab,n=ndi.label(solid)
    if n>1:
        sz=ndi.sum(solid,lab,index=np.arange(1,n+1)); keep=np.isin(lab,1+np.where(sz>=60)[0])
        _,(iy,ix)=ndi.distance_transform_edt(~solid,return_indices=True)
        owner=keep[iy,ix]; drop=(al>0)&~owner
        al[drop]=0
        if drop.any():   # soften the notch the dropped halo leaves
            N=ndi.binary_dilation(drop,iterations=4)&(al>0)&(al<255)
            b=ndi.gaussian_filter(al.astype(float),1.0); al[N]=np.minimum(al[N],b[N])
    clear=al==0; hl,hn=ndi.label(ndi.binary_fill_holes(~clear)&clear)
    for i in range(1,hn+1):
        m=hl==i
        if m.sum()<30: fg[m]=ap.OUTLINE; al[m]=255
    r=OPEN.get(cur.get('kind'))
    if r:
        m=al>=128; yy,xx=np.mgrid[-r:r+1,-r:r+1]; o=ndi.binary_opening(m,structure=(xx*xx+yy*yy)<=r*r)
        rows=np.where(m.any(1))[0]; top=np.zeros_like(m); top[:rows[0]+int(0.2*(rows[-1]-rows[0]))]=True   # top fifth only
        cut=ndi.binary_dilation(m&~o&top,iterations=3)&~ndi.binary_dilation(o,iterations=1)&top
        al[cut]=0
        if cut.any():   # re-lay the soft edge only around the cut
            near=ndi.binary_dilation(cut,iterations=10)&(al>0)
            d=ndi.distance_transform_edt(np.pad(al>0,1))[1:-1,1:-1]
            fg[near&(d<=ap.CONTOUR_PX)]=ap.OUTLINE
            for i,a in enumerate(ap.RAMP,1):
                mm=near&(d>i-1)&(d<=i); al[mm]=np.minimum(al[mm],a)
    lab,n=ndi.label(al>0)   # one island: drop faint crumbs left off the body
    if n>1:
        sz=ndi.sum(al>0,lab,index=np.arange(1,n+1)); al[(lab>0)&(lab!=1+int(np.argmax(sz)))]=0
    return fg,al
OPEN={t.split(':')[0]:int(t.split(':')[1]) for t in (os.environ.get('OPEN') or '').split(',') if t}
_f=finish
finish=lambda fg,al,ring: tidy(*seal_faint(*_f(fg,al,ring)))
ap.finish=finish
# SHRINK="kind:fx:fy,..." scales the fitted box about its bottom centre (feet stay put),
# for refitting to the in-game alpha>0 size measured by tests/art_ingame_bounds.py.
SHRINK={t.split(':')[0]:(float(t.split(':')[1]),float(t.split(':')[2])) for t in (os.environ.get('SHRINK') or '').split(',') if t}
osb=ap.svg_box
def svg_box(it):
    W,H,(x0,y0,x1,y1)=osb(it)
    fx,fy=SHRINK.get(it['kind'],(1,1))
    if (fx,fy)!=(1,1):
        cx=(x0+x1)/2; w=(x1-x0)*fx; h=(y1-y0)*fy
        x0=round(cx-w/2); x1=x0+round(w); y0=round(y1-h)
    return W,H,(x0,y0,x1,y1)
ap.svg_box=svg_box
import json
items={i['kind']:i for i in json.load(open(sys.argv[1]))}
rawdir,group=sys.argv[2],sys.argv[3]
for k in sys.argv[4:]:
    cur['mask']=os.path.join(rawdir,k+'.open.png'); cur['kind']=k
    out,size,st=ap.build(items[k],os.path.join(rawdir,k+'.jpg'),group)
    print(f"{k} {size}B stretch {st:.2f}{' STRETCH' if abs(st-1)>.18 else ''}",flush=True)
