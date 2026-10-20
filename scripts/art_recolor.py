# Optional helper (not used by the build). usage: [BY=0.38] art_recolor.py src.jpg dst.jpg tan|cocoa fromhue:tohue|keep
# Derive a doll variant from a doll raw: shift skin tone and blanket hue (work/ only).
import sys,numpy as np
from PIL import Image
src,dst,skin,blank=sys.argv[1:5]
im=Image.open(src).convert('RGB');h=np.array(im.convert('HSV')).astype(float)/255
H,S,V=h[...,0],h[...,1],h[...,2]
sk=(np.arange(H.shape[0])[:,None]<H.shape[0]*0.6)&(H>0.035)&(H<0.11)&(S>0.18)&(S<0.62)&(V>0.72)
tone={'tan':(0.07,1.05,0.82),'cocoa':(0.06,1.45,0.50)}[skin]
h2=h.copy()
h2[...,0]=np.where(sk,tone[0],H);h2[...,1]=np.where(sk,np.clip(S*tone[1],0,1),S);h2[...,2]=np.where(sk,V*tone[2],V)
if blank!='keep':
    a,b=[float(x) for x in blank.split(':')]
    yy=np.arange(H.shape[0])[:,None]>H.shape[0]*float(__import__('os').environ.get('BY','0.38'))
    bl=yy&(np.abs(((H-a+0.5)%1)-0.5)<0.07)&(S>0.15)&~sk
    h2[...,0]=np.where(bl,b,h2[...,0]);h2[...,1]=np.where(bl,S*0.6,h2[...,1]);h2[...,2]=np.where(bl,V*0.93,h2[...,2])
Image.fromarray((np.clip(h2,0,1)*255).astype('uint8'),'HSV').convert('RGB').save(dst,quality=96)
