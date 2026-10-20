# Optional helper (not used by the build): shadow pre-pass for a raw painting before art_process.
# usage: RAW=work/raw [LOW= PT= PRING= PMIN= ZONE= ZT= ZC= ZPOCK=] art_preclean.py item [T]
# Pre-pass on a raw (work/ only): flood from the card border through warm light
# pixels close to the card colour (the painted floor shadow), repaint as card.
# usage: preclean.py item [T]
import sys,os,shutil,numpy as np
from PIL import Image
from scipy import ndimage as ndi
k=sys.argv[1];T=float(sys.argv[2]) if len(sys.argv)>2 else 85
R=os.environ.get('RAW') or 'work/raw';p=f'{R}/{k}.jpg';o=f'{R}/{k}.orig.jpg'
if not os.path.exists(o): shutil.copy(p,o)
rgb=np.array(Image.open(o).convert('RGB')).astype(float)
bg=np.median(np.concatenate([rgb[:8].reshape(-1,3),rgb[-8:].reshape(-1,3)]),0)
d=np.sqrt(((rgb-bg)**2).sum(2));r,g,b=rgb[...,0],rgb[...,1],rgb[...,2]
sh=(d<T)&(r>=g-3)&(g>=b-3)&(r-b<80)
zall=np.zeros(d.shape,bool)
# ZONE=x0,y0,x1,y1[;...] with ZT: a stronger shadow key inside those boxes only (outline still stops the flood)
for z in filter(None,(os.environ.get('ZONE') or '').split(';')):
    x0,y0,x1,y1=[int(v) for v in z.split(',')];zm=np.zeros(d.shape,bool);zm[y0:y1,x0:x1]=True;zall|=zm
    sh|=zm&(d<float(os.environ.get('ZT') or 150))&(r>=g-3)&(g>=b-3)&(r-b<float(os.environ.get('ZC') or 999))
lab,_=ndi.label(sh);bb=np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]]));m=np.isin(lab,bb[bb>0])
p2=f'{R}/{k}.open.png'
if os.path.exists(p2): os.remove(p2)
rgb[m]=bg;Image.fromarray(rgb.astype('uint8')).save(p,quality=96);print(k,'shadow-key T',T)
# enclosed shadow pockets low in the object (between legs / rockers): repaint as card too
if float(os.environ.get('LOW') or 0)>0:
    frac=float(os.environ['LOW'])
    obj=~m; ys=np.where(obj.any(1))[0]; y0,y1=ys.min(),ys.max()
    PT=float(os.environ.get('PT') or 1e9); rest=sh&~m&(d<PT)
    if os.environ.get('ZPOCK'): rest&=zall  # pockets only inside ZONE boxes
    l2,n2=ndi.label(rest)
    om=np.zeros_like(m)
    for i,sl in enumerate(ndi.find_objects(l2),1):
        c=(sl[0].start+sl[0].stop)/2
        cm=l2==i
        if c>y1-(y1-y0)*frac and cm.sum()>int(os.environ.get('PMIN') or 300):
            ring=ndi.binary_dilation(cm,iterations=3)&~cm
            if (d[ring]>60).mean()<float(os.environ.get('PRING') or 0): continue
            rgb[cm]=bg; om|=cm
    om=ndi.binary_erosion(om,iterations=1)
    Image.fromarray((om*255).astype('uint8')).save(f'{R}/{k}.open.png')
    Image.fromarray(rgb.astype('uint8')).save(p,quality=96);print('low pockets',frac)
