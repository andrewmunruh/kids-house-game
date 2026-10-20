# Optional helper: thumbnail sheet of the newest shared generations; pick by hash prefix, never by index.
# usage: ART_ATTACH=<attachments dir> [RAW=work/raw] art_pick.py [item hashprefix]
import glob,os,sys,time
from PIL import Image,ImageDraw
A=os.environ['ART_ATTACH']
fs=sorted(glob.glob(A+'/*.jpg'),key=os.path.getmtime)[-10:][::-1]
sh=Image.new('RGB',(5*200,2*180),'white');d=ImageDraw.Draw(sh)
for n,f in enumerate(fs):
  im=Image.open(f);im.thumbnail((200,160));sh.paste(im,((n%5)*200,(n//5)*180));d.text(((n%5)*200+4,(n//5)*180+2),str(n),fill='red');d.text(((n%5)*200+20,(n//5)*180+2),os.path.basename(f)[:8],fill='blue');print(n,os.path.basename(f))
if len(sys.argv)<3: p=f"/tmp/npick-{time.time_ns()}.png";sh.save(p);print(p)
if len(sys.argv)>2:
    import shutil;R=os.environ.get('RAW') or 'work/raw';k=sys.argv[1];f=glob.glob(A+'/'+sys.argv[2]+'*.jpg')[0]
    for x in (f'{R}/{k}.orig.jpg',f'{R}/{k}.open.png'):
        if os.path.exists(x): os.remove(x)
    shutil.copy(f,f'{R}/{k}.jpg');open(os.path.join(R,'..','sources.txt'),'a').write(f'{k} <- {os.path.basename(f)}\n');print('grabbed',k,os.path.basename(f))
