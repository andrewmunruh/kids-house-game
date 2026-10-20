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
ap.finish=finish
import json
items={i['kind']:i for i in json.load(open(sys.argv[1]))}
rawdir,group=sys.argv[2],sys.argv[3]
for k in sys.argv[4:]:
    cur['mask']=os.path.join(rawdir,k+'.open.png')
    out,size,st=ap.build(items[k],os.path.join(rawdir,k+'.jpg'),group)
    print(f"{k} {size}B stretch {st:.2f}{' STRETCH' if abs(st-1)>.18 else ''}",flush=True)
