(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const Zl="modulepreload",Ql=function(e){return"/kids-house-game/"+e},Ki={},Gl=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(n.map(l=>{if(l=Ql(l),l in Ki)return;Ki[l]=!0;const c=l.endsWith(".css"),g=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${g}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":Zl,c||(d.as="script"),d.crossOrigin="",d.href=l,r&&d.setAttribute("nonce",r),document.head.appendChild(d),c)return new Promise((u,y)=>{d.addEventListener("load",u),d.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return o.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})},zs="#5a3d5c",I=(e=4)=>`stroke="${zs}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,bo=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],We=1e3,rt=700,wo="M 30 660 C 150 640, 200 540, 330 545 S 540 650, 690 600 S 925 470, 850 375 S 640 330, 520 355 S 270 385, 250 285 S 330 145, 480 150 S 700 200, 790 150",xt={x:115,y:170},tt={x:880,y:120},Mt={x:600,y:480},$t={x:400,y:260},qa=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${I(3)}/><circle cx="0" cy="-10" r="20" fill="${s}" ${I(3)}/><circle cx="-12" cy="-2" r="12" fill="${s}" ${I(3)}/><circle cx="12" cy="-3" r="13" fill="${s}" ${I(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`,cn=(e,t,n)=>`<g transform="translate(${e} ${t})">${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*4}" cy="${Math.sin(s*Math.PI/180)*4}" r="3.6" fill="${n}"/>`).join("")}<circle r="2.6" fill="#ffd43b"/></g>`;function Kl(){return`<svg class="mapBg" viewBox="0 0 ${We} ${rt}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${We}" height="${rt}" rx="34" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="160" cy="420" rx="150" ry="90"/><ellipse cx="760" cy="250" rx="170" ry="70"/><ellipse cx="480" cy="640" rx="140" ry="50"/><ellipse cx="930" cy="600" rx="90" ry="110"/></g>
  <g fill="#93d78e" opacity=".7"><ellipse cx="420" cy="260" rx="70" ry="30"/><ellipse cx="80" cy="560" rx="60" ry="26"/><ellipse cx="700" cy="420" rx="50" ry="22"/></g>
  <!-- pond -->
  <ellipse cx="120" cy="470" rx="72" ry="40" fill="#8ecae6" ${I()}/><ellipse cx="108" cy="462" rx="42" ry="16" fill="#bde6f7"/><path d="M150 480 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <!-- side paths to the park and the ranch -->
  <path d="M250 285 Q190 250 150 215" fill="none" stroke="${zs}" stroke-width="30" stroke-linecap="round"/><path d="M250 285 Q190 250 150 215" fill="none" stroke="#f2dcb8" stroke-width="22" stroke-linecap="round"/>
  <!-- the street -->
  <path d="${wo}" fill="none" stroke="${zs}" stroke-width="58" stroke-linecap="round"/>
  <path id="mapRoad" d="${wo}" fill="none" stroke="#f2dcb8" stroke-width="48" stroke-linecap="round"/>
  <path d="${wo}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 16" stroke-linecap="round" opacity=".9"/>
  <!-- town square -->
  <g transform="translate(${Mt.x} ${Mt.y})"><circle r="74" fill="#f7e6c8" ${I()}/><circle r="74" fill="none" stroke="#e6cfa6" stroke-width="10" stroke-dasharray="10 12" transform="scale(.82)"/>
    <circle r="30" fill="#bde6f7" ${I()}/><circle r="13" fill="#fff6e6" ${I(3)}/><path d="M0 -13 Q-8 -32 -16 -20 M0 -13 Q8 -32 16 -20 M0 -13 V-34" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>
    ${cn(-52,-40,"#ff8fab")}${cn(54,-38,"#b197fc")}${cn(-56,40,"#ffd43b")}${cn(52,44,"#ff8fab")}</g>
  ${[[60,330,"#ff8fab"],[300,470,"#b197fc"],[430,560,"#ffd43b"],[760,520,"#ff8fab"],[950,260,"#b197fc"],[600,260,"#ffd43b"],[380,90,"#ff8fab"],[40,120,"#b197fc"],[960,420,"#ffd43b"],[840,640,"#b197fc"],[210,620,"#ff8fab"]].map(([e,t,n])=>cn(+e,+t,String(n))+cn(+e+14,+t+8,String(n))).join("")}
  </svg>`}function Yl(e,t){const n=[];let s=7;const o=()=>(s=(s*9301+49297)%233280)/233280;for(let i=0;i<260&&n.length<34;i++){const a=30+o()*(We-60),r=40+o()*(rt-70);t(a,r)||e.some(l=>Math.hypot(l.x-a,l.y-r)<l.r)||(e.push({x:a,y:r,r:46}),n.push(qa(a,r,.75+o()*.45,["#5cc985","#4fbf7a","#78d39a"][i%3])))}return`<svg class="mapTrees" viewBox="0 0 ${We} ${rt}" xmlns="http://www.w3.org/2000/svg">${n.join("")}</svg>`}const Xl=`<svg viewBox="0 0 200 170"><ellipse cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${I()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${I(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${I(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${I(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${I(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${I(2.5)}/>
  ${qa(40,66,1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${I(3)}/><path d="M178 88 V132" ${I(4)}/>
</svg>`,Jl=`<svg viewBox="0 0 220 180"><ellipse cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${I()}/>
  ${bo.map((e,t)=>`<path d="M${20+t*7} 120 A${90-t*7} ${84-t*7} 0 0 1 ${200-t*7} 120" fill="none" stroke="${e}" stroke-width="7"/>`).join("")}
  <path d="M60 140 V82 L80 58 H140 L160 82 V140 Z" fill="#ef5b5b" ${I(4)}/>
  <path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${zs}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  ${bo.map((e,t)=>`<path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${e}" stroke-width="1.3" transform="translate(0 ${-3+t*1.2})"/>`).join("")}
  <rect x="88" y="100" width="44" height="40" rx="3" fill="#d94848" ${I(3)}/><path d="M88 100 L132 140 M132 100 L88 140" stroke="#fff6e6" stroke-width="3"/>
  <rect x="94" y="70" width="32" height="18" rx="4" fill="#fff6e6" ${I(3)}/>
  <path d="M10 150 H52 M168 150 H212 M14 140 V158 M30 140 V158 M46 140 V158 M174 140 V158 M190 140 V158 M206 140 V158" stroke="#fff6e6" stroke-width="5" stroke-linecap="round"/><path d="M10 150 H52 M168 150 H212" ${I(1.5)}/>
  <g transform="translate(178 122) scale(.42)"><ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" ${I(5)}/><path d="M24 -8 L40 -34 L54 -26 L36 2 Z" fill="#fff" ${I(5)}/>${bo.slice(0,4).map((e,t)=>`<path d="M38 ${-34+t*5} q-14 4 -20 14" fill="none" stroke="${e}" stroke-width="5" stroke-linecap="round"/>`).join("")}<path d="M-20 14 V34 M20 14 V34" ${I(6)}/></g>
</svg>`,ec=`<svg viewBox="0 0 190 156">
  <ellipse cx="95" cy="118" rx="88" ry="32" fill="#ffd0e6" ${I()}/>
  <path d="M28 108 V62 L95 28 L162 62 V108 Z" fill="#fff0f6" ${I(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="#ff6b9a" ${I(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="none" stroke="#ffd43b" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="78" y="78" width="34" height="30" rx="4" fill="#ff8ec8" ${I(3)}/>
  <path d="M95 86 C90 80 82 82 86 90 C90 96 95 100 95 100 C95 100 100 96 104 90 C108 82 100 80 95 86 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  <rect x="42" y="74" width="22" height="16" rx="3" fill="#66d9e8" ${I(2)}/><rect x="126" y="74" width="22" height="16" rx="3" fill="#d0bfff" ${I(2)}/>
  ${[36,52,68,84,100,116,132,148].map((e,t)=>`<circle cx="${e}" cy="58" r="3.2" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" ${I(1.4)}/>`).join("")}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`,li=`<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${I(3)}/><path d="M17 8 V35 M31 13 V40" ${I(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${I(2)}/></svg>`,ci=e=>e.replace('viewBox="0 0 100 160"','viewBox="14 2 72 74"'),tc={},Nt=e=>(tc?.VITE_STORE_PREFIX??"")+e,ts=3600,en=470,yt=590,Kt=["goat","sheep","piglet","chicks","bunny","cow"],nc=[1085,1215,1345,1470,1600,1735],sc=520,gi=1900,di=[600,800,1e3,1200,1400,1600],Vn=435,oc=["Chestnut","Snowy","Midnight","Sunny","Rainbow"],ja=[2470,2600,2730,2860,2990],tn=540,ic=["pet","carrot","apple","hay"],To=6,ac=e=>3175+e*68,rc=8e4,Po=20,lc=1500,Va=["egg","carrot","flower"],cc={egg:"ranch-egg",carrot:"ranch-carrot",flower:"ranch-bouquet"},gc=()=>({egg:0,carrot:0,flower:0}),dc=(e,t,n)=>Number.isInteger(e)&&e>=t&&e<=n?e:null;function pi(e){const t=gc();if(!e||typeof e!="object")return t;for(const n of Va)t[n]=dc(e[n],0,Po)??0;return t}function hi(e){const t=Array(To).fill(null);if(Array.isArray(e))for(let n=0;n<To;n++){const s=e[n];if(!s||s.seed!=="carrot"&&s.seed!=="flower")continue;const o=Number(s.at),i=Number(s.wet);Number.isFinite(o)&&Number.isFinite(i)&&(t[n]={seed:s.seed,at:o,wet:i})}return t}function Js(e,t){if(!e||!e.wet)return 0;const n=(t-e.wet)/rc;return n>=1?3:n>=.4?2:1}function zo(e,t,n,s,o=0){const i=e.slice(),a={...t};switch(n.op){case"plant":return i[n.i]?"taken":(i[n.i]={seed:n.seed,at:s,wet:0},{plots:i,basket:a,garden:!0});case"water":{const r=i[n.i];return r?r.wet?"wet":(i[n.i]={...r,wet:s},{plots:i,basket:a,garden:!0}):"empty"}case"pick":{const r=i[n.i];return r?Js(r,s)<3?"notReady":a[r.seed]>=Po?"full":(a[r.seed]++,i[n.i]=null,{plots:i,basket:a,garden:!0,got:r.seed}):"empty"}case"egg":return s-o<lc?"slow":a.egg>=Po?"full":(a.egg++,{plots:i,basket:a,garden:!1,got:"egg"});case"use":return a.carrot<=0?"none":(a.carrot--,{plots:i,basket:a,garden:!1});case"take":return a[n.kind]<=0?"none":(a[n.kind]--,{plots:i,basket:a,garden:!1})}}const Lt=80,pc=30*24*60*60*1e3,hc=5,Fa=6,bt=["#ffd6e8","#fff3b0","#d8f5e8","#e6d6ff","#d6efff"],fc=/^m[A-Za-z0-9]{4,40}$/,mc=/^[A-Za-z0-9:_\/.-]{1,80}$/;function fi(e){return e.replace(/https?:\/\/\S+/gi,"").replace(/\bwww\.\S+/gi,"").replace(/\b[a-z0-9-]+\s*(?:\.|\(dot\)|\sdot\s)\s*(?:com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b\S*/gi,"").replace(/\S+\s*(?:@|\(at\)|\sat\s)\s*\S+\s*(?:\.|\sdot\s)\s*\w{2,}/gi,"").replace(/\s+/g," ").trim()}function _o(e,t=Date.now()){const n=Math.floor((t-e)/864e5);return n<=0?"today":n===1?"yesterday":n<7?"a few days ago":"a while ago"}function uc(e,t=Date.now()){const n=e?.letters;if(!Array.isArray(n))return null;const s=[];for(const i of n.slice(-30*2)){if(!i||typeof i!="object")continue;const a=i;if(typeof a.id!="string"||!fc.test(a.id)||typeof a.from!="string")continue;const r=a.from.normalize("NFC").replace(/\s+/g," ").trim();if(!r||r.length>24||typeof a.fromPid!="string"||!mc.test(a.fromPid)||typeof a.text!="string"||a.text.length>Lt||typeof a.at!="number"||!Number.isFinite(a.at)||t-a.at>pc||a.at>t+864e5||!Number.isInteger(a.color)||a.color<0||a.color>=hc||!Number.isInteger(a.sticker)||a.sticker<0||a.sticker>=Fa)continue;const l=a.text.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(l.length>Lt||l&&fi(l)!==l)continue;const c={id:a.id,from:r,fromPid:a.fromPid,text:l,color:a.color,sticker:a.sticker,at:a.at};a.read===!0&&(c.read=!0),s.push(c)}const o=s.slice(-30);return o.length?{letters:o}:null}function yc(e){return e?.letters.filter(t=>!t.read&&t.text).length??0}const Es=["living","bedroom","kitchen","salon","nursery","backyard"],Za=["living","bedroom","kitchen","salon","nursery"],Bt=2400,In=600,Qa=1e3,Mn=(Bt-Qa)/2,Ln=8,kc=/^[A-Za-z0-9:_\/.-]{1,80}$/;function mi(e){const t=e?.dogKennel;if(!t||typeof t!="object"||typeof t.item!="string"||!kc.test(t.item))return null;const n=e.rooms;if(!n)return null;for(const s of Object.values(n))if(s?.items?.some(o=>o&&o.id===t.item&&o.kind==="kennel"))return{item:t.item};return null}function vc(e,t){return mi({dogKennel:{item:t},rooms:e.rooms})!==null}const W=(e,t,n,s,o=1)=>({id:e+"-"+s,kind:e,x:t+Mn,y:n,flip:!1,z:s,scale:o});function Ut(){return{version:3,houseId:"local",currentRoom:"living",rooms:{living:{wallpaper:"#ffd6e0",floor:"#e8b98a",pattern:1,items:[W("sofa",470,470,1),W("lamp",230,470,2),W("plant",760,480,3),W("rug",480,530,0),W("picture",470,200,4),W("cat",600,520,5),W("window",-350,230,6),W("armchair",-300,480,7),W("bookshelf",1250,470,8),W("tree",1500,480,9),W("clock",1100,170,10)]},bedroom:{wallpaper:"#d9ccff",floor:"#f2d0a4",pattern:2,items:[W("bed",450,480,1),W("window",750,230,2),W("teddy",330,500,3),W("stars",300,180,4),W("tub",1350,480,5),W("lamp",-250,470,6),W("flowers",-150,500,7)]},salon:{wallpaper:"#ffe0f0",floor:"#f6d6ff",pattern:2,items:[W("rug",470,540,0),W("mirror",470,150,1),W("vanity",470,480,2),W("perfume",400,345,3),W("polish",450,345,4),W("hairdryer",560,340,5),W("stool",470,545,6),W("lamp",200,470,7),W("flowers",780,480,8),W("picture",780,200,9),W("chair",-250,490,10),W("mirror",-250,170,11),W("plant",1300,480,12)]},kitchen:{wallpaper:"#cdf3dc",floor:"#ffe7a8",pattern:3,items:[W("fridge",200,470,1),W("table",520,500,2),W("cake",520,395,3),W("stove",800,470,4),W("chair",380,500,5),W("chair",660,500,6),W("juice",470,395,7),W("plant",-300,480,8),W("fish",1300,480,9)]},nursery:{wallpaper:"#d6f3ff",floor:"#f3ddc4",pattern:1,items:[W("cloud-rug",480,545,0),W("crib",470,480,1),W("crib-mobile",470,155,2),W("rocker",780,490,3)]},backyard:{wallpaper:"#c5ecff",floor:"#b6e3a8",pattern:0,items:[]}},characters:[nn({id:"c1",skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6",room:"living",x:330+Mn,y:540})],soundOn:!0,dogKennel:null}}function nn(e){return{skin:"#f1c27d",hair:"#5b3a29",hairStyle:0,shirt:"#ff7aa8",pants:"#5aa9e6",size:"kid",acc:0,room:"living",x:Bt/2,y:540,flip:!1,held:{left:null,right:null},...e}}const Vt=(e,t,n)=>Math.max(t,Math.min(n,e)),Tn=e=>e.items.reduce((t,n)=>Math.max(t,n.z),0),bc=e=>e.items.reduce((t,n)=>Math.min(t,n.z),0);function cs(e,t,n){return{...e,characters:e.characters.map(s=>s.id===t?n(s):s)}}function ke(e,t,n){const s=e.rooms[t];return s?{...e,rooms:{...e.rooms,[t]:n(s)}}:e}function Ga(e){if(!e||!e.rooms)return e;const t=Ut().rooms,n=e.rooms;let s=!1;for(const i of Es){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(s=!0)}if(!s)return e;const o={...n};for(const i of Es){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(o[i]=t[i])}return{...e,rooms:o}}function Hs(e,t){switch(t.type){case"room/switch":return e.rooms[t.room]?{...e,currentRoom:t.room}:e;case"item/add":return ke(e,t.room,n=>n.items.length>=80?n:{...n,items:[...n.items,{...t.item,z:Tn(n)+1}]});case"item/move":return ke(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,x:Vt(t.x,0,Bt),y:Vt(t.y,40,In)}:s)}));case"item/flip":return ke(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,flip:!s.flip}:s)}));case"item/front":return ke(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:Tn(n)+1}:s)}));case"item/back":return ke(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:bc(n)-1}:s)}));case"item/delete":{const n=e.rooms[t.room]?.items.some(o=>o.id===t.id&&o.kind==="kennel"),s=ke(e,t.room,o=>({...o,items:o.items.filter(i=>i.id!==t.id)}));return n&&e.dogKennel?.item===t.id?{...s,dogKennel:null}:s}case"room/wallpaper":return ke(e,t.room,n=>({...n,wallpaper:t.color}));case"room/floor":return ke(e,t.room,n=>({...n,floor:t.color}));case"room/pattern":return ke(e,t.room,n=>({...n,pattern:t.pattern,wallTile:null}));case"room/wallTile":return ke(e,t.room,n=>({...n,wallTile:t.tile}));case"room/floorTile":return ke(e,t.room,n=>({...n,floorTile:t.tile}));case"char/add":return e.characters.length>=Ln||e.characters.some(n=>n.id===t.char.id)?e:{...e,characters:[...e.characters,t.char]};case"char/update":return cs(e,t.id,n=>({...n,...t.patch}));case"char/move":return e.rooms[t.room]?cs(e,t.id,n=>({...n,room:t.room,x:Vt(t.x,0,Bt),y:Vt(t.y,60,In)})):e;case"char/delete":{const n=e.characters.find(o=>o.id===t.id);if(!n)return e;let s={...e,characters:e.characters.filter(o=>o.id!==t.id)};return["left","right"].forEach((o,i)=>{const a=n.held[o];a&&(s=ke(s,n.room,r=>({...r,items:[...r.items,{...a,x:n.x+(i?40:-40),y:n.y,z:Tn(r)+1}]})))}),s}case"char/hold":{const n=e.characters.find(a=>a.id===t.id),s=e.rooms[t.room]?.items.find(a=>a.id===t.itemId);if(!n||!s||n.held[t.hand]||n.room!==t.room)return e;const o=ke(e,t.room,a=>({...a,items:a.items.filter(r=>r.id!==t.itemId)})),i=cs(o,t.id,a=>({...a,held:{...a.held,[t.hand]:s}}));return s.kind==="kennel"&&e.dogKennel?.item===t.itemId?{...i,dogKennel:null}:i}case"char/release":{const n=e.characters.find(i=>i.id===t.id),s=n?.held[t.hand];if(!n||!s)return e;const o=cs(e,t.id,i=>({...i,held:{...i.held,[t.hand]:null}}));return ke(o,n.room,i=>({...i,items:[...i.items,{...s,x:Vt(t.x,0,Bt),y:Vt(t.y,40,In),z:Tn(i)+1}]}))}case"cat/set":return{...e,cat:t.cat};case"cat/move":return e.cat&&e.rooms[t.room]?{...e,cat:{...e.cat,room:t.room,x:Vt(t.x,100,Bt-100)}}:e;case"dog/set":return{...e,dog:t.dog};case"dog/kennel":return t.item===null?e.dogKennel?{...e,dogKennel:null}:e:!vc(e,t.item)||e.dogKennel?.item===t.item?e:{...e,dogKennel:{item:t.item}};case"ranch/op":{const n=zo(hi(e.garden),pi(e.basket),t.op,t.now,e.lastEgg??0);if(typeof n=="string")return e;let s={...e,garden:n.plots,basket:n.basket,lastEgg:t.op.op==="egg"?t.now:e.lastEgg};if(t.op.op==="take"&&s.rooms[t.op.room]){const o=t.op;s=ke(s,o.room,i=>i.items.length>=80?i:{...i,items:[...i.items,{id:o.id,kind:cc[o.kind],x:o.x,y:560,flip:!1,z:Tn(i)+1,scale:1}]})}return s}case"settings/sound":return{...e,soundOn:t.on};case"game/reset":return Ut()}}const Yi=Nt("cozy-house"),wc=Nt("cozy-house-v1");function ui(e){if(!e||typeof e!="object"||!e.rooms)return Ut();let t=e;if(t.version===1){const c=d=>(Number(d)||0)+Mn,g={};for(const[d,u]of Object.entries(t.rooms))g[d]={...u,items:(u.items??[]).map(y=>({...y,x:c(y.x)}))};t={...t,version:2,rooms:g,character:{...t.character,x:c(t.character?.x)}}}if(t.version===2){const c=t.character??{};t={...t,version:3,characters:[nn({...c,id:"c1",size:"kid",acc:0,held:{left:null,right:null}})]},delete t.character}if(t.version!==3)return Ut();const n=Ut(),s=(Array.isArray(t.characters)?t.characters:[]).slice(0,Ln).map((c,g)=>nn({...c,id:String(c.id??"c"+(g+1)),held:{left:c.held?.left??null,right:c.held?.right??null}})),o=Ga({...n,...t,rooms:{...n.rooms,...t.rooms},characters:s}),i=mi(o),a=i===o.dogKennel?o:{...o,dogKennel:i},r=uc(a.mailbox);let l=a;if(r)l={...l,mailbox:r};else if(l.mailbox){const{mailbox:c,...g}=l;l=g}return _c(l)}function _c(e){const t=e.currentRoom,n=Za.includes(t),s=a=>Es.includes(a);let o=!1;const i=e.characters.map(a=>{const r=a.room;return!s(r)||!n&&r===t?(o=!0,{...a,room:"living"}):a});return n&&!o?e:{...e,currentRoom:n?e.currentRoom:"living",characters:i}}function Ka(){let e;try{const s=localStorage.getItem(Yi)??localStorage.getItem(wc);e=s?ui(JSON.parse(s)):Ut()}catch{e=Ut()}const t=[];let n;return{get:()=>e,subscribe(s){t.push(s)},dispatch(s){e=Hs(e,s),t.forEach(o=>o(e,s)),clearTimeout(n),n=window.setTimeout(()=>{try{localStorage.setItem(Yi,JSON.stringify(e))}catch{}},250)}}}const xc=Object.freeze(Object.defineProperty({__proto__:null,MAX_CHARS:Ln,ROOM_H:In,ROOM_IDS:Es,ROOM_W:Bt,TAB_ROOMS:Za,V1_OFFSET:Mn,V1_ROOM_W:Qa,createStore:Ka,ensureRooms:Ga,initialState:Ut,migrate:ui,newCharacter:nn,reduce:Hs,validKennel:mi},Symbol.toStringTag,{value:"Module"}));function Eo(e,t){for(let n=e.length-1;n>0;n--){const s=Math.floor(t()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}const Ya=4,Xi=7,$c=30;function Mc(){const e=[];let t=0;for(let n=0;n<Ya;n++){e.push({id:t++,c:n,v:0});for(let s=1;s<=9;s++)for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s});for(const s of["skip","rev","d2"])for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s})}for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"wild"});for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"w4"});return e}const Ho=e=>e.discard[e.discard.length-1],Pn=(e,t)=>t.c===4||t.c===e.color||t.v===Ho(e).v&&Ho(e).c!==4,wt=(e,t,n=1)=>{const s=e.hands.length;return((t+e.dir*n)%s+s)%s};function Ao(e,t,n,s){const o=[];for(let i=0;i<n&&e.hands[t].length<$c;i++){if(!e.deck.length){const r=e.discard.pop();if(e.deck=Eo(e.discard.map(l=>l),s),e.discard=[r],!e.deck.length)break}const a=e.deck.pop();e.hands[t].push(a),o.push(a)}return e.hands[t].length>1&&(e.slay[t]=!1),o}function Lc(e,t){if(e.owe!==null&&e.hands[e.owe]?.length===1&&!e.slay[e.owe]){const n=e.owe;return e.owe=null,{victim:n,vdrew:Ao(e,n,2,t).length}}return e.owe=null,{}}const Ji=e=>{const t=[0,0,0,0];return e.forEach(n=>{n.c<4&&t[n.c]++}),t.indexOf(Math.max(...t))},Bc={id:"slay",name:"Slay",minPlayers:2,maxPlayers:6,setup(e,t){const n=Eo(Mc(),t),s=Array.from({length:e},()=>n.splice(-Xi,Xi));let o=n.length-1;for(;typeof n[o].v!="number";)o--;const i=n.splice(o,1)[0];return{deck:n,discard:[i],hands:s,color:i.c,turn:Math.floor(t()*e),dir:1,drawn:null,slay:s.map(()=>!1),owe:null,winner:null,ev:{n:0,p:-1,k:"start",card:i}}},cleanMove(e){return!e||typeof e!="object"?null:e.k==="play"&&Number.isInteger(e.id)&&e.id>=0&&e.id<108?{k:"play",id:e.id,...Number.isInteger(e.color)&&e.color>=0&&e.color<Ya?{color:e.color}:{}}:e.k==="draw"||e.k==="pass"||e.k==="slay"?{k:e.k}:null},legal(e,t,n){if(e.winner!==null)return!1;if(n.k==="slay")return e.hands[t].length<=2&&!e.slay[t];if(t!==e.turn)return!1;if(n.k==="draw")return e.drawn===null;if(n.k==="pass")return e.drawn!==null;const s=e.hands[t].find(o=>o.id===n.id);return!s||e.drawn!==null&&s.id!==e.drawn||s.c===4&&n.color===void 0?!1:Pn(e,s)},apply(e,t,n,s){const o=e.ev.n+1;if(n.k==="slay")return e.slay[t]=!0,e.owe===t&&(e.owe=null),e.ev={n:o,p:t,k:"slay"},e;const i=Lc(e,s);if(n.k==="draw"){const g=Ao(e,t,1,s),d=g[0];if(d&&Pn(e,d))e.drawn=d.id,e.ev={n:o,p:t,k:"draw",drew:1,...i};else{if(e.drawn=null,e.ev={n:o,p:t,k:"draw",drew:g.length,...i},e.stuck=g.length?0:(e.stuck??0)+1,(e.stuck??0)>=e.hands.length){const u=Math.min(...e.hands.map(y=>y.length));return e.winner=e.hands.findIndex(y=>y.length===u),e.turn=-1,e}e.turn=wt(e,t)}return e}if(n.k==="pass")return e.drawn=null,e.turn=wt(e,t),e.ev={n:o,p:t,k:"pass",...i},e;e.stuck=0;const a=e.hands[t],r=a.splice(a.findIndex(g=>g.id===n.id),1)[0];e.discard.push(r),e.drawn=null,e.color=r.c===4?n.color:r.c;const l={n:o,p:t,k:"play",card:r,color:e.color,...i};if(!a.length)return e.winner=t,e.turn=-1,e.ev=l,e;a.length===1&&!e.slay[t]&&(e.owe=t);const c=e.hands.length===2;if(r.v==="rev")e.dir=e.dir===1?-1:1,e.turn=c?t:wt(e,t);else if(r.v==="skip")l.skipped=wt(e,t),e.turn=wt(e,t,2);else if(r.v==="d2"||r.v==="w4"){const g=wt(e,t);l.skipped=g;const d=r.v==="d2"?2:4;l.drew=Ao(e,g,d,s).length,e.turn=wt(e,t,2)}else e.turn=wt(e,t);return e.ev=l,e},turn:e=>e.winner!==null?-1:e.turn,winner:e=>e.winner,view(e,t){return{top:Ho(e),color:e.color,turn:e.winner!==null?-1:e.turn,dir:e.dir,deck:e.deck.length,counts:e.hands.map(n=>n.length),slay:e.slay,winner:e.winner,ev:e.ev,...t!==null&&e.hands[t]?{hand:e.hands[t],drawn:t===e.turn?e.drawn:null}:{}}},autoMove(e,t){if(t!==e.turn)return null;if(e.drawn!==null){const s=e.hands[t].find(o=>o.id===e.drawn);return s&&Pn(e,s)?{k:"play",id:s.id,...s.c===4?{color:Ji(e.hands[t])}:{}}:{k:"pass"}}const n=e.hands[t].find(s=>Pn(e,s)&&s.c!==4)??e.hands[t].find(s=>Pn(e,s));return n?{k:"play",id:n.id,...n.c===4?{color:Ji(e.hands[t])}:{}}:{k:"draw"}},removePlayer(e,t,n){if(e.hands.length<=2)return null;const s=e.turn===t;return e.deck.unshift(...e.hands[t]),Eo(e.deck,n),e.hands.splice(t,1),e.slay.splice(t,1),e.owe===t?e.owe=null:e.owe!==null&&e.owe>t&&e.owe--,e.turn>t&&e.turn--,s&&(e.drawn=null,e.dir===-1?e.turn=((t-1)%e.hands.length+e.hands.length)%e.hands.length:e.turn=t%e.hands.length),e.ev={n:e.ev.n+1,p:t,k:"left"},e}},Ro=7,Ms=6,Cc=(e,t,n)=>{const s=e[t][n];for(const[o,i]of[[1,0],[0,1],[1,1],[1,-1]]){const a=[[t,n]];for(const r of[1,-1])for(let l=1;l<4;l++){const c=t+o*l*r,g=n+i*l*r;if(c<0||c>=Ro||g<0||g>=Ms||e[c][g]!==s)break;a.push([c,g])}if(a.length>=4)return a}return null},Sc={id:"four",name:"Four in a Row",minPlayers:2,maxPlayers:2,setup:(e,t)=>({b:Array.from({length:Ro},()=>[]),turn:t()<.5?0:1,winner:null,draw:!1,line:null,last:null,n:0}),cleanMove:e=>e&&Number.isInteger(e.col)&&e.col>=0&&e.col<Ro?{col:e.col}:null,legal:(e,t,n)=>e.winner===null&&!e.draw&&t===e.turn&&e.b[n.col].length<Ms,apply(e,t,n){e.b[n.col].push(t);const s=e.b[n.col].length-1;e.last={col:n.col,row:s,p:t},e.n++;const o=Cc(e.b,n.col,s);return o?(e.winner=t,e.line=o,e.turn=-1):e.b.every(i=>i.length>=Ms)?(e.draw=!0,e.turn=-1):e.turn=1-t,e},turn:e=>e.turn,winner:e=>e.winner,view:e=>e,autoMove:(e,t)=>{if(t!==e.turn)return null;const s=[3,2,4,1,5,0,6].find(o=>e.b[o].length<Ms);return s===void 0?null:{col:s}},removePlayer:()=>null},Xa={slay:Bc,four:Sc},eo=2600,Fn=[{game:"slay",seats:6,x:720},{game:"four",seats:2,x:1500},{game:"slay",seats:4,x:2150}],Wc=2e4,Uc=4,yi=16,As=e=>String(e??"").toUpperCase().replace(/[^A-Z0-9]/g,""),Tc=e=>e.length>=Uc&&e.length<=yi&&/^[A-Z0-9]+$/.test(e),Pc=12,zc=["Cada","Chloe","Quinn","Reagan","Sloane"],Ec=460,Hc=320,ea=["Sunny Bunny","Bubbly Panda","Sparkle Kitty","Happy Hippo","Cozy Koala","Jolly Jelly","Zippy Fox","Dreamy Deer","Giggly Goose","Peachy Pup","Minty Mouse","Rainbow Duck","Cuddly Cub","Starry Owl","Bouncy Frog","Lucky Lamb","Snuggly Seal","Twinkle Tiger","Berry Bear","Cloudy Llama","Pebble Penguin","Honey Hedgehog","Marshmallow Moose","Cupcake Cat"],Nn=["Hi!","Come over!","I love your house!","Let's play!","Follow me!","Look at this!","Want a snack?","Nice!","Yes!","No thanks","Hehe","Be right back","Bye!","Let's decorate!","Wanna race?","So cute!"],Ja=["👋","😀","😂","😍","😮","😢","🎉","⭐","❤️","👍","🍕","🐱","🌈","🎶","💤","✨"],er=60,tr={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t","@":"a",$:"s","!":"i","+":"t"},Ls=["fuck","fuk","fck","shit","sht","bitch","btch","bastard","asshole","ass","dick","cock","pussy","cunt","whore","slut","damn","crap","piss","fag","faggot","retard","nigger","nigga","porn","sex","sexy","nude","naked","boob","boobs","penis","vagina","kill","suicide","stupid","idiot","dumb","hate","loser","shutup","wtf","stfu","gtfo","bs"],Ac=["zero","oh","one","two","three","four","five","six","seven","eight","nine","ten"],Rc=[/\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i,/\bi\s*live\s+(at|on|in)\b/i,/\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,/\b(password|passcode|zip\s*code|postcode)\b/i,/\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i],Dc=/(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i,Ic=/\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i,Nc=/@\w/,Oc=/\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;function to(e,t=er){if(typeof e!="string")return{ok:!1,reason:"empty"};const n=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(!n)return{ok:!1,reason:"empty"};if(n.length>t)return{ok:!1,reason:"long"};if(Dc.test(n))return{ok:!1,reason:"link"};if(Ic.test(n)||Nc.test(n))return{ok:!1,reason:"contact"};if((n.match(/\d/g)??[]).length>=5||/\d[\d\s().\-]{4,}\d/.test(n)||Oc.test(n))return{ok:!1,reason:"contact"};const o=n.toLowerCase().split(/[^a-z]+/).filter(Boolean);let i=0;for(const c of o)if(i=Ac.includes(c)?i+1:0,i>=4)return{ok:!1,reason:"contact"};if(Rc.some(c=>c.test(n)))return{ok:!1,reason:"personal"};const a=n.toLowerCase().replace(/[0-9@$!+]/g,c=>tr[c]??c),r=a.split(/[^a-z]+/).filter(Boolean),l=a.replace(/[^a-z]/g,"").replace(/(.)\1{2,}/g,"$1$1");return r.some(c=>Ls.includes(c)||Ls.includes(c.replace(/(.)\1+/g,"$1")))||Ls.filter(c=>c.length>=5).some(c=>l.includes(c))?{ok:!1,reason:"words"}:{ok:!0,text:n}}const no={long:"That is a bit long!",link:"No links, please!",contact:"Keep numbers and contact info secret!",personal:"Keep personal info secret!",words:"Let's use kind words!",mail:"Oops, try different words!",empty:""},qc=new Set([...Ls,"fat","ugly","stoopid","dummy","hateyou","hateu","shutup"]),jc=new Set(["hateyou","hateu","shutup"]),ta=["three","seven","eight","four","five","nine","zero","one","two","six","ten","oh"],Bs=new Set(["hi","hey","hello","bye","yes","no","ok","okay","oh","wow","yay","dear","love","house","cat","bed","play","slay","cute","why","your","want","come","look","nice","the","and","my","our","so","too","very","good","fun","cool","best","friend","friends","please","thanks","thank","happy","birthday","morning","night","day","today","room","home"]),Vc=new Set(["the","my","on","at","to","a","an","our","your","in","of","and","is","it","me","we","go","up","so","no","ok","be","do","or"]),Fc="street|st|ave|avenue|road|rd|lane|ln|drive|dr|court|ct|way|blvd",Zc=/\b(?:house|garden|backyard|ranch|treehouse|game\s*room|clubhouse|bedroom|kitchen|nursery|salon|park)\b/i,nr={};for(const e of["АA","аa","ВB","вb","ЕE","еe","КK","кk","МM","мm","НH","нh","ОO","оo","РP","рp","СC","сc","ТT","тt","УY","уy","ХX","хx","ІI","іi","ЈJ","јj","ЅS","ѕs","ЁE","ёe","ЇI","їi","ΑA","ΕE","ΖZ","ΗH","ΙI","ΚK","ΜM","ΝN","ΟO","ΡP","ΤT","ΥY","ΧX","αa","εe","ζz","ιi","κk","νv","οo","ρp","τt","υu","χx"])nr[e[0]]=e[1];function Do(e){const t=e.length,n=[];for(let s=0;s<=t;s++)n.push(-1);n[0]=0;for(let s=0;s<t;s++)if(!(n[s]<0))for(let o=0;o<ta.length;o++){const i=ta[o];if(!e.startsWith(i,s))continue;const a=s+i.length,r=n[s]+(i==="ten"?2:1);r>n[a]&&(n[a]=r)}return n[t]}function Qc(e){let t="";for(const n of e)t+=nr[n]??n;return t}function Gc(e){return Qc(String(e).normalize("NFKC")).replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\p{M}]/gu,"").replace(/[\p{Extended_Pictographic}\p{S}\p{P}]+/gu,"").replace(/\s+/g," ").trim()}function Kc(e){const t=e.replace(/(.)\1{2,}/g,"$1"),n=e.replace(/(.)\1{2,}/g,"$1$1");return t===e?[e]:[e,t,n]}function Yc(e){const n=e.toLowerCase().replace(/[01345$@]/g,r=>tr[r]??r).replace(/[*.]/g,"").split(/[^a-z]+/).filter(Boolean),s=r=>Kc(r).some(l=>qc.has(l)||l==="kys"||/^sto+pid$/.test(l));if(n.some(s))return!0;let o="";const i=[],a=()=>{o.length>1&&i.push(o),o=""};for(let r=0;r<n.length;r++)n[r].length===1?o+=n[r]:a();if(a(),i.some(s))return!0;for(let r=0;r<n.length-1;r++)if(jc.has(n[r]+n[r+1]))return!0;return!1}function Xc(e){if(/\b(?:middle|high)\s+school\b/i.test(e))return!0;const t=/\b([A-Z][a-z]+)\s+(Elementary|School|Academy|Middle|High)\b/g;let n;for(;n=t.exec(e);)if(!Bs.has(n[1].toLowerCase()))return!0;return!1}function sr(e){const t=new RegExp(`\\b([A-Za-z]{2,})\\s+(?:${Fc})\\b`,"gi");let n;for(;n=t.exec(e);)if(!Vc.has(n[1].toLowerCase()))return!0;return!1}function Jc(e){const t=[];let n="";const s=()=>{n&&(t.push(n),n="")};for(let o=0;o<e.length;o++)e[o].length===1&&e[o]>="a"&&e[o]<="z"?n+=e[o]:(s(),t.push(e[o]));return s(),t}function eg(e){const t=e.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);let n=0;for(let o=0;o<t.length;o++){const i=Do(t[o]);if(i>0&&(n+=i),i>=3)return!0}if((e.match(/\d/g)??[]).length+n>=5)return!0;const s=[t,Jc(t)];for(let o=0;o<s.length;o++){let i=0;for(let a=0;a<s[o].length;a++){const r=s[o][a];if(i=/^\d+$/.test(r)||Do(r)>0?i+1:0,i>=3)return!0}}return!1}function tg(e){const t=String(e).normalize("NFKC");if(t===e)return!1;const n=t.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);for(let s=0;s<n.length;s++)if(/^\d+$/.test(n[s])||Do(n[s])>0)return!0;return!1}function ng(e,t){const n=e.match(/[A-Za-z]+/g)??[],s=new Set(t.map(o=>o.toLowerCase()));for(let o=0;o<n.length-1;o++){const i=n[o],a=n[o+1];if(!/^[A-Z][a-z]+$/.test(i)||!/^[A-Z][a-z]+$/.test(a))continue;const r=i.toLowerCase(),l=a.toLowerCase();if(!(Bs.has(r)||Bs.has(l))&&!(s.has(r)&&Bs.has(l)))return!0}return!1}function sg(e){return!/\b(?:i'm|im|i am)\b/i.test(e)||!/\b(?:\d{1,2}|zero|oh|one|two|three|four|five|six|seven|eight|nine|ten)\b/i.test(e)?!1:/\blive\s+(?:on|at)\b/i.test(e)||sr(e)}function og(e){if(/\bat\s+\d{1,2}\b/.test(e)||/\b\d{1,2}\s*(?:am|pm)\b/i.test(e)||/\b\d{1,2}:\d{2}\b/.test(e))return!0;const t=/\b(?:come to|meet me)\b/i.test(e);return t&&Zc.test(e)?!1:!!(t||/\bat the park\b/i.test(e))}function ig(e,t){if(tg(e))return!0;const n=Gc(e);return!!(/\b(?:fortnite|roblox|minecraft|tiktok|snapchat|discord|instagram|youtube|twitch|xbox|psn)\b/i.test(n)||/\b(?:snap|insta)\b/i.test(n)||/\b(?:add|friend)\s+me\b[\s,.:!\-]*[A-Za-z0-9_]{2,}/i.test(n)||/\b(?:user|username)\b[\s:._-]*[@#]?[A-Za-z0-9_]{2,}/i.test(n)||/(^|\s)@[A-Za-z0-9_]{2,}/.test(n)||sg(n)||sr(n)||/\blive\s+(?:on|at)\b/i.test(n)||/\b(?:my\s+)?address\b/i.test(n)||/\blast\s+name\b/i.test(n)||/\b(?:call|text)\s+me\b/i.test(n)||/\b(?:phone|number|kys)\b/i.test(n)||/\bplay\s+for\s+the\b/i.test(n)||/\b(?:soccer|softball|dance)\s+team\b/i.test(n)||Xc(n)||og(n)||eg(n)||Yc(n)||ng(n,t))}const na=(e,t,n)=>typeof e=="number"&&Number.isFinite(e)?Math.max(t,Math.min(n,e)):null,ag=(e,t,n=80)=>typeof e=="string"&&e.length<=n&&t.test(e)?e:null,rg=/^#[0-9a-fA-F]{3,8}$/,lg=["little","kid","adult"];function cg(e){if(!e||typeof e!="object")return null;const t={};for(const n of["skin","hair","shirt","pants"])if(n in e){const s=ag(e[n],rg,9);if(!s)return null;t[n]=s}if("hairStyle"in e){const n=na(e.hairStyle,0,3);if(n===null)return null;t.hairStyle=Math.round(n)}if("acc"in e){const n=na(e.acc,0,3);if(n===null)return null;t.acc=Math.round(n)}if("size"in e){if(!lg.includes(e.size))return null;t.size=e.size}if("flip"in e){if(typeof e.flip!="boolean")return null;t.flip=e.flip}return Object.keys(t).length?t:null}function ns(e){const t=nn({id:"x"}),n=cg({skin:e?.skin,hair:e?.hair,hairStyle:e?.hairStyle,shirt:e?.shirt,pants:e?.pants,size:e?.size,acc:e?.acc})??{},s=o=>n[o]??t[o];return{skin:s("skin"),hair:s("hair"),hairStyle:s("hairStyle"),shirt:s("shirt"),pants:s("pants"),size:s("size"),acc:s("acc")}}const sa=4,gg=["Mittens","Luna","Biscuit","Pumpkin","Whiskers","Mochi","Pepper","Noodle","Ginger","Socks"],dg=["Buddy","Coco","Max","Daisy","Peanut","Rocket","Bella","Waffles","Scout","Honey"];function pg(e){const t=String(e??"").normalize("NFC").replace(/\s+/g," ").trim();return!/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u.test(t)||(t.match(/\d/g)??[]).length>2?null:to(t).ok?t:null}function hg(e,t=[]){const n=to(e,Lt);if(!n.ok)return n;const s=fi(n.text);return!s||s!==n.text?{ok:!1,reason:"link"}:ig(typeof e=="string"?e:s,t)?{ok:!1,reason:"mail"}:{ok:!0,text:s}}function or(e){return typeof e.freeMail=="boolean"?e.freeMail:e.freeChat}const ki=2900,Io=[{kind:"swing",x:430,y:500},{kind:"swing",x:570,y:500},{kind:"blanket",x:1730,y:548},{kind:"blanket",x:1850,y:548},{kind:"bench",x:2025,y:512},{kind:"bench",x:2105,y:512},{kind:"bench",x:2225,y:512},{kind:"bench",x:2305,y:512}],O={top:{x:905,y:330},bottom:{x:1110,y:545},ladder:850},me={x0:2440,x1:2840,y0:470,y1:585},fg=(e,t)=>e.where===t.where&&(e.where!=="house"||e.houseId===t.houseId&&e.room===t.room),mg=(e,t)=>fg(e,t)&&Math.abs(e.x-t.x)<=Ec&&Math.abs(e.y-t.y)<=Hc;function gs(e){try{return ui(e)}catch{return e}}const No=Nt("cozy-hood"),wn=()=>{try{return JSON.parse(localStorage.getItem(No)??"null")}catch{return null}},mt=e=>{e?localStorage.setItem(No,JSON.stringify(e)):localStorage.removeItem(No)};function so(){const e=new URLSearchParams(location.search).get("hood");return e?e.replace(/\/$/,""):"https://cozy-hood.andrewmunruh.workers.dev".replace(/\/$/,"")}async function ug(e){const t=await fetch(e+"/api/create",{method:"POST"});if(!t.ok)throw new Error("create failed "+t.status);return t.json()}async function yg(e,t){const n=await fetch(`${e}/api/hood/${encodeURIComponent(t)}`);if(n.status===429)return{slow:!0};if(!n.ok)throw new Error("lookup failed");return n.json()}const oa=e=>e.type==="item/move"?"im:"+e.id:e.type==="char/move"?"cm:"+e.id:null;class oo{constructor(t){this.cfg=t,this.ws=null,this.pid="",this.settings={freeChat:!0},this.players=new Map,this.houses=new Map,this.presence=new Map,this.status="offline",this.replaced=!1,this.ranch={plots:[],skew:0},this.tables=new Map,this.handlers=new Map,this.cid=1,this.flushT=0,this.presT=0,this.lastPres=null,this.presDirty=!1,this.closedByUs=!1,this.retry=0,this.retryT=0,this.epoch=0,this.stableT=0,this.outbox=[]}on(t,n){(this.handlers.get(t)??this.handlers.set(t,[]).get(t)).push(n)}emit(t,...n){this.handlers.get(t)?.forEach(s=>s(...n))}send(t){return this.ws?.readyState!==WebSocket.OPEN?!1:(this.ws.send(JSON.stringify(t)),!0)}reliable(t){this.send(t)||(t.t==="lock"?this.outbox=this.outbox.filter(n=>!(n.t==="lock"&&n.houseId===t.houseId)):(t.t==="look"||t.t==="dog")&&(this.outbox=this.outbox.filter(n=>n.t!==t.t)),this.outbox.push(t),this.outbox.length>8&&this.outbox.splice(0,this.outbox.length-8))}flushOutbox(){if(this.ws?.readyState!==WebSocket.OPEN||!this.outbox.length)return;const t=this.outbox;this.outbox=[];for(const n of t)this.send(n)||this.outbox.push(n)}scheduleRetry(){if(this.closedByUs||this.replaced||!this.cfg.token||this.retryT)return;const t=this.epoch,n=Math.min(15e3,400*2**Math.min(this.retry,6));this.retry++,this.retryT=window.setTimeout(()=>{this.retryT=0,!(t!==this.epoch||this.closedByUs||this.replaced||!this.cfg.token)&&this.connect()},n)}armStable(){this.stableT&&clearTimeout(this.stableT),this.stableT=window.setTimeout(()=>{this.stableT=0,this.retry=0},1e4)}clearStable(){this.stableT&&(clearTimeout(this.stableT),this.stableT=0)}connect(t){this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.closedByUs=!1,this.replaced=!1,this.status="connecting",this.emit("status",this.status);const n=this.ws;return new Promise(s=>{let o=!1;const i=r=>{o||(o=!0,s(r))},a=new WebSocket(this.cfg.url.replace(/^http/,"ws")+"/ws/"+encodeURIComponent(this.cfg.id??this.cfg.code));if(this.ws=a,n&&n!==a)try{n.close()}catch{}a.onopen=()=>{t&&!this.cfg.token?this.send({t:"join",...t,v:sa,pet:1,mail:1}):this.cfg.token?this.send({t:"hello",token:this.cfg.token,v:sa,pet:1,mail:1}):i("notoken")},a.onmessage=r=>{const l=JSON.parse(r.data);this.handle(l),l.t==="welcome"&&(this.armStable(),i("ok")),l.t==="error"&&i(l.code+(l.msg?":"+l.msg:"")),l.t==="removed"&&i("removed")},a.onclose=r=>{if(this.ws===a){if(this.clearStable(),this.ws=null,this.status="offline",i("closed"),r.code===4e3){this.replaced=!0,this.emit("status",this.status),this.emit("replaced");return}this.emit("status",this.status),this.scheduleRetry()}},a.onerror=()=>{}})}close(){this.closedByUs=!0,this.replaced=!1,this.epoch++,this.outbox=[],this.clearStable(),this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.presT&&(clearTimeout(this.presT),this.presT=0);try{this.ws?.close()}catch{}this.ws=null,this.status="offline",clearInterval(this.flushT)}handle(t){switch(t.t){case"joined":this.cfg.token=t.token,this.cfg.pid=t.pid,mt(this.cfg);break;case"welcome":this.pid=t.pid,this.settings=t.settings,this.status="online",this.players=new Map(t.players.map(n=>[n.pid,n]));{const n=this.houses;this.houses=new Map;for(const s of t.houses){const{state:o,...i}=s,a=n.get(s.id);this.houses.set(s.id,{meta:i,confirmed:gs(o),pending:a?a.pending.filter(r=>!r.sent):[],view:null})}}this.presence=new Map(Object.entries(t.presence)),this.presence.delete(this.pid),t.ranch&&(this.ranch={plots:t.ranch.plots,skew:t.ranch.now-Date.now()});{const n=new Map;for(const s of t.tables??[])n.set(s.tb,this.stampTable(s));this.tables=n}clearInterval(this.flushT),this.flushT=window.setInterval(()=>this.flush(),60),this.lastPres&&(this.presDirty=!0),this.flushPres(),this.flushOutbox(),this.emit("welcome"),this.emit("status",this.status);break;case"act":{const n=this.houses.get(t.houseId);if(!n)return;n.confirmed=Hs(gs(n.confirmed),t.action);const s=t.by===this.pid&&n.pending[0]?.cid===t.cid;s&&n.pending.shift(),n.view=null,s||this.emit("act",t.houseId,t.action);break}case"nack":{const n=this.houses.get(t.houseId);if(!n)return;n.pending=n.pending.filter(s=>s.cid!==t.cid),t.state&&(n.confirmed=gs(t.state)),n.view=null,this.emit("reset",t.houseId,t.reason);break}case"pres":t.pid!==this.pid&&(t.p?this.presence.set(t.pid,t.p):this.presence.delete(t.pid),this.emit("pres",t.pid));break;case"players":this.players=new Map(t.players.map(n=>[n.pid,n])),this.emit("players");break;case"house":{const{state:n,...s}=t.house;this.houses.set(s.id,{meta:s,confirmed:gs(n),pending:[],view:null}),this.emit("houses");break}case"houseMeta":{const n=this.houses.get(t.meta.id);n&&(n.meta=t.meta,this.emit("houses"),this.emit("houseMeta",t.meta.id));break}case"houseGone":this.houses.delete(t.houseId),this.emit("houses"),this.emit("houseGone",t.houseId);break;case"settings":this.settings=t.settings,this.emit("settings");break;case"bubble":this.emit("bubble",t.pid,t.b);break;case"fx":this.emit("fx",t.pid,t.fx);break;case"ranch":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch");break;case"ranchFail":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch"),this.emit("ranchFail",t.reason);break;case"noride":this.emit("noride",t.ride);break;case"table":{const n=this.stampTable(t.table);this.tables.set(n.tb,n),this.emit("table",n);break}case"tblFail":this.emit("tblFail",t.tb,t.reason);break;case"sayFail":this.emit("sayFail",t.reason);break;case"mailbox":{const n=this.houses.get(t.houseId);if(!n)return;if(t.mailbox?.letters?.length)n.confirmed={...n.confirmed,mailbox:t.mailbox};else{const{mailbox:s,...o}=n.confirmed;n.confirmed=o}n.view=null,this.emit("mailbox",t.houseId);break}case"mailFail":this.emit("mailFail",t.reason);break;case"parentInfo":this.emit("parentInfo",t);break;case"error":this.emit("error",t.code),t.code==="badtoken"&&(this.cfg.token=void 0,this.cfg.pid=void 0,mt(this.cfg));break;case"removed":this.closedByUs=!0,this.emit("removed");break}}stampTable(t){const n=this.tables.get(t.tb),s=n&&n.away===t.away&&n.receivedAt?n.receivedAt:Date.now();return{...t,receivedAt:s}}view(t){const n=this.houses.get(t);return n?n.view??=n.pending.reduce((s,o)=>Hs(s,o.action),n.confirmed):null}myHouseId(){return this.players.get(this.pid)?.houseId??""}canEdit(t){const n=this.houses.get(t);return!!n&&(!n.meta.locked||n.meta.ownerId===this.pid)}dispatch(t,n){const s=this.houses.get(t);if(!s)return;const o=oa(n),i=s.pending[s.pending.length-1];o&&i&&!i.sent&&oa(i.action)===o?i.action=n:s.pending.push({cid:this.cid++,action:n,sent:!1}),s.view=null}flush(){for(const[t,n]of this.houses)for(const s of n.pending)!s.sent&&this.send({t:"act",houseId:t,cid:s.cid,action:s.action})&&(s.sent=!0);this.flushPres()}setPresence(t){this.lastPres=t,this.presDirty=!0,this.presT||this.flushPres()}flushPres(){if(!(!this.presDirty||!this.lastPres)){if(!this.send({t:"pres",p:this.lastPres})){!this.closedByUs&&!this.presT&&(this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90));return}this.presDirty=!1,this.presT&&clearTimeout(this.presT),this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90)}}myPresence(){return this.lastPres}say(t){this.reliable({t:"say",b:t})}lock(t,n){this.reliable({t:"lock",houseId:t,locked:n})}setLook(t){this.reliable({t:"look",look:t});const n=this.players.get(this.pid);n&&(n.look=t)}setDog(t){this.reliable({t:"dog",dog:t});const n=this.players.get(this.pid);n&&(n.dog=t)}fx(t){this.reliable({t:"fx",fx:t})}ranchOp(t){this.reliable({t:"ranch",o:t})}tbl(t){this.reliable({t:"tbl",...t})}sendMail(t,n,s,o){this.reliable({t:"mail",op:"send",houseId:t,text:n,color:s,sticker:o})}readMail(t,n){this.reliable({t:"mail",op:"read",houseId:t,id:n})}dropMail(t,n){this.reliable({t:"mail",op:"drop",houseId:t,id:n})}now(){return Date.now()+this.ranch.skew}parent(t){this.cfg.parentKey&&this.reliable({t:"parent",key:this.cfg.parentKey,...t})}}function kg(e,t,n,s="living"){let o=s;const i=[],a=()=>({...e.view(t),currentRoom:o,soundOn:n.get()}),r=l=>{if(e.houses.has(t)){const c=a();i.forEach(g=>g(c,l))}};return e.on("act",(l,c)=>{l===t&&r(c)}),e.on("reset",l=>{l===t&&r({type:"game/reset"})}),{houseId:t,get:a,subscribe(l){i.push(l)},dispatch(l){if(l.type==="room/switch")o=l.room;else if(l.type==="settings/sound")n.set(l.on);else{if(l.type==="game/reset")return;if(!e.canEdit(t))return;e.dispatch(t,l)}r(l)}}}const ge="#5a3d5c",H=`stroke="${ge}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,Oo=[{name:"Tabby",body:"#ffb26b",stripe:"#e8893a",belly:"#ffe3c4"},{name:"Smokey",body:"#b9b6c9",stripe:"#8f8ba3",belly:"#ecebf3"},{name:"Tuxedo",body:"#4f4660",stripe:"",belly:"#ffffff"},{name:"Calico",body:"#fff6ec",stripe:"",belly:"#fff6ec"}],qo=[{name:"Pup",body:"#f2d0a4",ear:"#b07d54",snout:"#fbe7cc"},{name:"Poodle",body:"#fff0f6",ear:"#ffc8dd",snout:"#fff7fb"},{name:"Dachshund",body:"#c07a45",ear:"#7d4a26",snout:"#d99a68"},{name:"Golden",body:"#f4b860",ear:"#e09a3e",snout:"#fbd9a0"},{name:"Spotty",body:"#ffffff",ear:"#4a3f52",snout:"#ffffff"}],vg=(e,t,n,s=!1)=>s?`<path d="M${e-3} ${n} q3 3 6 0 M${t-3} ${n} q3 3 6 0" fill="none" ${H} stroke-width="2.5"/>`:`<circle cx="${e}" cy="${n}" r="2.8" fill="${ge}"/><circle cx="${t}" cy="${n}" r="2.8" fill="${ge}"/><circle cx="${e+.9}" cy="${n-.9}" r=".9" fill="#fff"/><circle cx="${t+.9}" cy="${n-.9}" r=".9" fill="#fff"/>`,jo=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>`;function _n(e,t="stand"){const n=Oo[e]??Oo[0],s="#ffb3c6",o=(i,a,r,l)=>`
    <path d="M${i-13} ${a-8} L${i-10} ${a-25} L${i-1} ${a-13} Z" fill="${n.body}" ${H}/><path d="M${i-10.5} ${a-11} L${i-9.5} ${a-20} L${i-4} ${a-13} Z" fill="${s}"/>
    <path d="M${i+1} ${a-13} L${i+11} ${a-26} L${i+13} ${a-7} Z" fill="${e===3?"#f4a259":n.body}" ${H}/><path d="M${i+4} ${a-13} L${i+10} ${a-21} L${i+11} ${a-11} Z" fill="${s}"/>
    <circle cx="${i}" cy="${a}" r="${r}" fill="${n.body}" ${H}/>
    ${e===3?`<path d="M${i+2} ${a-r+1} a${r} ${r} 0 0 1 ${r-3} ${r-2} q-6 2 -${r-3} -${r-3}z" fill="#f4a259"/>`:""}
    ${e===2?`<ellipse cx="${i+2}" cy="${a+7}" rx="9" ry="7" fill="#fff"/>`:""}
    ${n.stripe?`<path d="M${i-4} ${a-r+2} v5 M${i+2} ${a-r+1} v6 M${i+8} ${a-r+3} v4" ${H} stroke="${n.stripe}" stroke-width="2.5"/>`:""}
    ${vg(i-4,i+7,a,l)}
    <path d="M${i+3} ${a+4} l-2.5 -2 h5 z" fill="#ff8fab"/><path d="M${i+.5} ${a+6} q2.5 2.5 5 0" fill="none" ${H} stroke-width="2"/>
    ${jo(i-8,a+5)}${jo(i+12,a+5)}
    <path d="M${i+r-2} ${a+3} l9 -2 M${i+r-2} ${a+6} l9 2" ${H} stroke-width="1.6"/>`;return t==="nap"?`<svg viewBox="0 0 120 100" class="catsvg nap">
    <g class="breathe"><path class="tail" d="M28 84 Q22 96 64 94" fill="none" stroke="${ge}" stroke-width="11" stroke-linecap="round"/><path d="M28 84 Q22 96 64 94" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="76" rx="36" ry="18" fill="${n.body}" ${H}/>
    ${e===3?'<ellipse cx="44" cy="72" rx="12" ry="8" fill="#f4a259"/><ellipse cx="66" cy="70" rx="9" ry="6" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 62 q3 6 0 12 M56 61 q3 6 0 12 M68 62 q3 6 0 11" fill="none" ${H} stroke="${n.stripe}" stroke-width="3"/>`:""}
    ${o(90,76,15,!0)}</g></svg>`:t==="sit"?`<svg viewBox="0 0 120 100" class="catsvg sit">
    <path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${ge}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="70" rx="20" ry="25" fill="${n.body}" ${H}/>
    <ellipse cx="70" cy="74" rx="10" ry="15" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="54" cy="66" rx="9" ry="12" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M50 60 q5 2 4 8 M49 72 q5 2 4 8" fill="none" ${H} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect x="62" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${H}/><rect x="74" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${H}/>
    ${e===2?'<ellipse cx="66.5" cy="93" rx="4" ry="2.5" fill="#fff"/><ellipse cx="78.5" cy="93" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(72,36,17,!1)}</svg>`:`<svg viewBox="0 0 120 100" class="catsvg stand">
    <path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${ge}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <rect class="leg b" x="34" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${H}/><rect class="leg a" x="74" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${H}/>
    <ellipse cx="58" cy="58" rx="32" ry="17" fill="${n.body}" ${H}/>
    <ellipse cx="64" cy="66" rx="20" ry="7" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="46" cy="52" rx="12" ry="9" fill="#f4a259"/><ellipse cx="68" cy="50" rx="9" ry="7" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 43 q3 6 0 12 M56 42 q3 6 0 12 M68 43 q3 6 0 11" fill="none" ${H} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect class="leg a" x="44" y="64" width="9" height="30" rx="4.5" fill="${n.body}" ${H}/><rect class="leg b" x="84" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${H}/>
    ${e===2?'<ellipse cx="48.5" cy="92" rx="4" ry="2.5" fill="#fff"/><ellipse cx="88.5" cy="92" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(90,40,17,!1)}</svg>`}function Zn(e,t="stand"){const n=qo[e]??qo[0],s=t==="sleep",o=e===2,i=e===1,a=e===3,r=e===4,l=o?66:58,c=o?70:62,g=94-c,d=o?102:92,u=o?50:40,y=(C,S)=>i?`<rect class="leg ${S}" x="${C+2}" y="${c}" width="6" height="${g}" rx="3" fill="${n.body}" ${H}/><circle class="leg ${S}" cx="${C+5}" cy="91" r="6" fill="${n.body}" ${H}/>`:`<rect class="leg ${S}" x="${C}" y="${c}" width="10" height="${g}" rx="5" fill="${n.body}" ${H}/>`,w=i?`<circle cx="44" cy="58" r="15" fill="${n.body}" ${H}/><circle cx="70" cy="56" r="17" fill="${n.body}" ${H}/><ellipse cx="57" cy="58" rx="22" ry="12" fill="${n.body}"/>`:`<ellipse cx="${o?62:58}" cy="${l}" rx="${o?42:32}" ry="${o?13:17}" fill="${n.body}" ${H}/>`,_=r?`<circle cx="46" cy="54" r="5" fill="${ge}"/><circle cx="64" cy="62" r="4" fill="${ge}"/><circle cx="72" cy="50" r="3.5" fill="${ge}"/><circle cx="38" cy="64" r="3" fill="${ge}"/>`:"",B=i?`<g class="tail"><path d="M30 52 L22 38" ${H}/><circle cx="21" cy="34" r="7" fill="${n.body}" ${H}/></g>`:a?`<path class="tail" d="M30 52 Q10 50 14 30 Q20 40 30 46" fill="${n.body}" ${H}/>`:`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${ge}" stroke-width="9" stroke-linecap="round"/>`,p=!i&&!a?`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`:"",f=`
    ${i?`<circle cx="${d-2}" cy="${u-16}" r="10" fill="${n.body}" ${H}/>`:""}
    <circle cx="${d}" cy="${u}" r="17" fill="${n.body}" ${H}/>
    ${r?`<circle cx="${d-6}" cy="${u-8}" r="4" fill="${ge}"/>`:""}
    <ellipse cx="${d+13}" cy="${u+7}" rx="11" ry="8" fill="${n.snout}" ${H}/>
    <circle cx="${d+22}" cy="${u+4}" r="4" fill="${ge}"/>
    <path d="M${d+14} ${u+12} q4 3 8 0" fill="none" ${H} stroke-width="2"/>
    ${s?"":`<path class="tongue" d="M${d+16} ${u+13} q2 7 6 0" fill="#ff8fab" ${H} stroke-width="2"/>`}
    ${s?`<path d="M${d+2} ${u-4} q3 3 6 0" fill="none" ${H} stroke-width="2.4"/>`:`<circle cx="${d+5}" cy="${u-3}" r="3" fill="${ge}"/><circle cx="${d+6}" cy="${u-4}" r="1" fill="#fff"/>`}
    ${jo(d+2,u+8)}
    ${i?`<circle cx="${d-9}" cy="${u+8}" r="9" fill="${n.ear}" ${H}/>`:`<ellipse class="ear" cx="${d-9}" cy="${u+4}" rx="7" ry="${a||o?14:12}" fill="${n.ear}" ${H} transform="rotate(12 ${d-9} ${u+4})"/>`}
    <path d="M${d-12} ${u+14} q10 6 20 2" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/><circle cx="${d-1}" cy="${u+19}" r="3" fill="#ffd166" ${H} stroke-width="1.5"/>`,v=i?`<g class="tail"><path d="M42 86 L28 80" ${H}/><circle cx="25" cy="78" r="7" fill="${n.body}" ${H}/></g>`:`<path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${ge}" stroke-width="9" stroke-linecap="round"/><path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`;return t==="sit"||t==="sleep"?`<svg viewBox="0 0 130 100" class="dogsvg ${s?"sleep":"sit"}">${v}
    <ellipse cx="60" cy="70" rx="22" ry="24" fill="${n.body}" ${H}/>${r?`<circle cx="54" cy="66" r="5" fill="${ge}"/><circle cx="64" cy="80" r="4" fill="${ge}"/>`:""}
    ${y(62,"a")}${y(74,"b")}<g transform="translate(-22 -2)">${f}</g></svg>`:`<svg viewBox="0 0 130 100" class="dogsvg stand">${B}${p}
    ${y(o?30:34,"b")}${y(o?82:72,"a")}
    ${w}${_}
    ${y(o?42:46,"a")}${y(o?94:84,"b")}
    ${f}</svg>`}const ir=e=>{let t=2166136261;for(const n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0},Zt=(e,t)=>{let n=(e^Math.imul(t,2654435761))>>>0;return n^=n>>>15,n=Math.imul(n,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296},ia=18,bg={1:.35,2:.6};function wg(e,t,n){return e-t*bg[n]}function _g(e,t){const s=Math.floor(t/1e3/2.8);return Zt(ir(e||"pup"),s)<.62?"rest":"peek"}function xg(e,t,n,s,o=!1){const i=ir(e.name+":"+e.coat+":"+e.room+":"+Math.round(e.x)+(n?":t"+Math.round(n.x):"")),a=t/1e3,r=Math.floor(a/ia),l=a-r*ia;if(!n){const p=ye=>Math.max(160,Math.min(2240,e.x+(Zt(i,ye)-.5)*760)),f=p(r-1);let v=p(r);const C=Zt(i+7,r),S=C<.45?"nap":C<.75?"sit":"groom",D=!!(s&&S==="nap"&&Zt(i+13,r)<.72);D&&s&&(v=Math.max(160,Math.min(2240,s.x)));const R=Math.abs(v-f),ee=Math.min(5,R/110);return l<ee&&!o?{x:f+(v-f)*(l/ee),mood:"walk",flip:v<f,perch:0,curl:0}:{x:v,mood:S,flip:v<f,perch:0,curl:D?1:0}}const c=Math.max(160,Math.min(2240,n.x)),g=Zt(i+5,r)<.45?2:1,d=Math.max(160,Math.min(2240,c+(Zt(i,r)-.5)*420)),u=Math.abs(c-d),y=Math.min(4.2,Math.max(.6,u/160)),w=c<d;if(l<y&&!o)return{x:d+(c-d)*(l/y),mood:"walk",flip:w,perch:0,curl:0};const _=Zt(i+11,r),B=_<.34?"nap":_<.67?"sit":"play";return{x:c,mood:B,flip:w,perch:g,curl:0}}const Rs="#5a3d5c",X=`stroke="${Rs}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,zn=[`<svg viewBox="0 0 48 48"><path d="M24 40 C16 32 6 26 10 16 C14 8 24 12 24 20 C24 12 34 8 38 16 C42 26 32 32 24 40 Z" fill="#ff6b9a" ${X}/></svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd166" ${X}/></svg>`,`<svg viewBox="0 0 48 48"><circle cx="24" cy="22" r="6" fill="#ff8fab" ${X}/>${[0,60,120,180,240,300].map(e=>`<circle cx="${24+Math.cos(e*Math.PI/180)*12}" cy="${22+Math.sin(e*Math.PI/180)*12}" r="5" fill="#ffd166" ${X}/>`).join("")}<path d="M24 34 V44" ${X}/></svg>`,`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="10" fill="#ffb26b" ${X}/><circle cx="34" cy="20" r="8" fill="#ffc46b" ${X}/><path d="M28 14 L30 6 L36 14" fill="#ffb26b" ${X}/><circle cx="32" cy="19" r="1.4" fill="${Rs}"/><circle cx="37" cy="19" r="1.4" fill="${Rs}"/></svg>`,`<svg viewBox="0 0 48 48">${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M8 ${30-t*4} Q24 ${10-t*3} 40 ${30-t*4}" fill="none" stroke="${e}" stroke-width="4"/>`).join("")}</svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l3 10 10 1 -8 6 3 10 -8 -5 -8 5 3 -10 -8 -6 10 -1z" fill="#fff3b0" ${X}/><circle cx="12" cy="34" r="3" fill="#ff8fab" ${X}/><circle cx="36" cy="36" r="2.4" fill="#bde0fe" ${X}/></svg>`];function $g(e){const t=e?`<g class="flag"><path d="M30 16 V6" ${X}/><path d="M30 6 H42 L38 11 L42 16 H30 Z" fill="#ff6b6b" ${X}/></g>`:`<g class="flag"><path d="M18 28 H28" ${X}/><path d="M18 22 H28 L25 25 L28 28 H18 Z" fill="#ffd166" ${X}/></g>`;return`<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="68" rx="18" ry="3" fill="#000" opacity=".12"/>
    <rect x="30" y="40" width="5" height="26" rx="2" fill="#c99366" ${X}/>
    <path d="M8 40 V22 Q8 8 32 8 Q56 8 56 22 V40 Z" fill="#8ecae6" ${X}/>
    <path d="M8 28 H56" ${X}/>
    <rect x="14" y="32" width="36" height="16" rx="4" fill="#fff6e6" ${X}/>
    <circle cx="32" cy="40" r="3" fill="${Rs}"/>
    ${t}
  </svg>`}function Mg(e,t=[]){const n=hg(e,t);return n.ok?{ok:!0,text:n.text}:{ok:!1,msg:n.reason==="empty"?"Write a little note!":no[n.reason]||"Oops, try different words!"}}const Lg={...no,empty:"Write a little note!",slow:"Let's wait a moment!",full:"This mailbox is full!",notyours:"Only she can open her mail.",nohouse:"That house is not on the street.",gone:"That letter is already gone.",toobig:"The mailbox is too full!",presetsOnly:"Typing is turned off: pick a phrase!",unread:"She still has your letters! Wait until she reads them."};function Bg(e){return Lg[e]||"Let's try that again!"}function Cg(e){let t="",n="",s=!1,o="",i=0,a=0,r=-1,l="",c="";const g=()=>document.getElementById("mailCue");g()?.addEventListener("click",()=>{e.openOwn()});function d(){t="",n="",document.getElementById("mailSheet")?.remove()}function u(){let p=document.getElementById("mailSheet");return p||(p=document.createElement("div"),p.id="mailSheet",p.className="sheet mailSheet",p.innerHTML='<div class="card" id="mailCard"></div>',document.body.appendChild(p),p.addEventListener("click",f=>{const v=f.target;if(v===p||v.closest('[data-m="close"]')){d();return}w(v)}),p.addEventListener("input",f=>{const v=f.target;if(v.id!=="mailText")return;const C=document.getElementById("mailCount");C&&(C.textContent=`${v.value.length}/${Lt}`)})),p}function y(){if(!t)return;const p=u().querySelector("#mailText")?.value??"",f=e.mine(t),v=e.lettersOf(t),C=e.houseName(t),S=u().querySelector("#mailCard");if(n&&f&&!s){const R=v.find(ee=>ee.id===n);if(R&&R.text){_(R);return}n=""}if(s||!f){const R=e.freeType(),ee=o?`Reply to ${e.houseName(o)||"your friend"}`:f?"Leave a letter":`Letter for ${C}`,ye=R?`<textarea id="mailText" class="mailBox" maxlength="${Lt}" placeholder="Hi! Come play!"></textarea>
        <div class="mailCount" id="mailCount">0/${Lt}</div>`:`<h3>Phrase</h3><div class="phrases mailPhrases">${Nn.map((et,Ee)=>`<button type="button" data-phrase="${Ee}" class="${Ee===r?"on":""}">${ve(et)}</button>`).join("")}</div>`;S.innerHTML=`<button class="close" data-m="close">✕</button><h2>${ve(ee)}</h2>
        <p class="hint">${R?"A short note. Your name goes on it for you.":"Pick a phrase. Your name goes on it for you."}</p>
        ${ye}
        <h3>Paper</h3><div class="mailRow">${bt.map((et,Ee)=>`<button class="swatch ${Ee===i?"on":""}" data-color="${Ee}" style="background:${et}" aria-label="Paper ${Ee+1}"></button>`).join("")}</div>
        <h3>Sticker</h3><div class="mailRow">${zn.slice(0,Fa).map((et,Ee)=>`<button class="stick ${Ee===a?"on":""}" data-sticker="${Ee}" aria-label="Sticker ${Ee+1}">${et}</button>`).join("")}</div>
        ${l?`<p class="mailErr" id="mailErr">${ve(l)}</p>`:""}
        <button class="mailSend" id="mailSend" type="button">Send</button>
        ${f&&v.length?'<button class="mailRow" data-act="back" type="button" style="margin-top:8px">Back to my mail</button>':""}`;const he=u().querySelector("#mailText");if(he&&p){he.value=p;const et=document.getElementById("mailCount");et&&(et.textContent=`${p.length}/${Lt}`)}return}const D=v.length?v.slice().reverse().map(R=>R.text?`<button type="button" class="letter ${R.read?"":"fresh"}" data-letter="${ve(R.id)}" style="background:${bt[R.color]??bt[0]}">
        <span class="sticker">${zn[R.sticker]??zn[0]}</span>
        <span class="who">${ve(R.from)}</span><span class="when">${ve(_o(R.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${X}/><path d="M4 8 L40 24 L76 8" fill="${bt[R.color]??"#fff"}" ${X}/></svg>
      </button>`:`<div class="letter" style="background:${bt[R.color]??bt[0]}"><span class="who">Your letter</span><span class="when">${ve(_o(R.at))}</span><span class="statusChip ${R.read?"read":""}">${R.read?"Read":"Delivered"}</span></div>`).join(""):'<p class="hint">No letters yet. Your flag pops up when one arrives!</p>';S.innerHTML=`<button class="close" data-m="close">✕</button><h2>${ve(C)} mailbox</h2>${D}
      <div class="mailRow"><button type="button" data-act="write">Write a letter</button></div>
      ${l?`<p class="mailErr">${ve(l)}</p>`:""}`}function w(p){const f=p.closest(".mailPhrases [data-phrase]");if(f){r=+f.dataset.phrase,l="",y();return}const v=p.closest("[data-color]");if(v){i=+v.dataset.color,y();return}const C=p.closest("[data-sticker]");if(C){a=+C.dataset.sticker,y();return}if(p.closest("#mailSend"))return B();const S=p.closest("[data-act]")?.dataset.act;if(S==="write"){s=!0,o="",n="",l="",y();return}if(S==="back"){s=!1,o="",n="",l="",y();return}if(S==="reply"){const he=e.houseOf(p.closest("[data-from]")?.dataset.from??"");if(!he){e.toast("They are not on the street anymore.");return}o=he,s=!0,n="",l="",t=he,y();return}if(S==="drop"){const he=p.closest("[data-id]")?.dataset.id??"";if(c!==he){c=he,e.toast("Tap again to throw it away");return}c="",e.drop(t,he);return}const D=p.closest("[data-letter]");if(!D)return;const R=D.dataset.letter,ye=e.lettersOf(t).find(he=>he.id===R);ye&&(!e.mine(t)||!ye.text||(ye.read||e.read(t,R),n=R,_(ye)))}function _(p){const f=Sg(p.text),v=u().querySelector("#mailCard");v.innerHTML=`<button class="close" data-m="close">✕</button>
      <div class="letter open read" style="background:${bt[p.color]??bt[0]}" data-id="${ve(p.id)}" data-from="${ve(p.fromPid)}">
        <span class="sticker">${zn[p.sticker]??zn[0]}</span>
        <span class="who">${ve(p.from)}</span><span class="when">${ve(_o(p.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${X}/><path class="flap" d="M4 8 L40 24 L76 8" fill="#fff" ${X}/></svg>
        <p class="words">${ve(f??"")}</p>
        <span class="mailRow"><button type="button" data-act="reply">Reply</button><button type="button" class="throw" data-act="drop">${c===p.id?"Tap again":"Throw away"}</button></span>
      </div>
      <button type="button" data-act="back">All my mail</button>
      ${l?`<p class="mailErr">${ve(l)}</p>`:""}`}function B(){let p="";if(e.freeType()){const v=u().querySelector("#mailText")?.value??"",C=Mg(v);if(!C.ok){l=C.msg,y();const S=u().querySelector("#mailText");S&&(S.value=v);return}p=C.text}else{if(r<0||r>=Nn.length){l="Pick a phrase!",y();return}p=Nn[r]}const f=o||t;l="",e.send(f,p,i,a),e.toast("On its way!"),e.mine(f)?(s=!1,o="",t=f,y()):d()}return{open(p,f,v,C){t=p,n="",s=!v,o="",l="",c="",i=0,a=0,r=-1,y()},fail(p){l=Bg(p),t?y():e.toast(l)},refresh(){t&&y()},syncCue(p){g()?.classList.toggle("show",p)}}}function Sg(e){if(!e)return null;const t=to(e,Lt);if(!t.ok)return null;const n=fi(t.text);return n&&n===t.text?n:null}function ve(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const ar=()=>Nt("cozy-play");function Wg(){try{return localStorage.getItem(ar())==="play"?"play":"decorate"}catch{return"decorate"}}function Ug(e){try{localStorage.setItem(ar(),e)}catch{}}function Tg(e){return e==="kennel"?"kennel":e==="cat-tower"?"tower":e==="lamp"||/(^|:)lamp|starlamp|light/.test(e)?"lamp":e==="fridge"||e==="stove"||e==="vanity"||e==="bookshelf"||e==="window"||e==="mirror"||e==="tv"||/fridge|stove|cabinet|drawer|vanity/.test(e)?"open":e==="sofa"||e==="armchair"||e==="chair"||e==="stool"||e==="bed"||e==="crib"||/(sofa|armchair|chair|stool|bench)/.test(e)?"sit":"wiggle"}const Pg='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M34 8 l1.2 3 3 .4 -2.2 2 .6 3 -2.6-1.6 -2.6 1.6 .6-3 -2.2-2 3-.4z" fill="#ffd166" stroke="#5a3d5c" stroke-width="1.4"/></svg>',zg='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 36 h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M8 14 l2 1 M40 34 l2 2 M8 40 l3 -1" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>';function Eg(e,t){let n="decorate";const s=e.querySelector("#modePlay"),o=e.querySelector("#modeDecorate");s.querySelector(".modeIco").innerHTML=Pg,o.querySelector(".modeIco").innerHTML=zg;const i=()=>{const c=n==="play";document.body.classList.toggle("mode-play",c),s.classList.toggle("on",c),o.classList.toggle("on",!c),s.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-pressed",c?"false":"true")},a=(c,g)=>{n=c,g&&Ug(c),i(),t.onChange?.()};e.addEventListener("pointerdown",c=>c.stopPropagation()),e.addEventListener("click",c=>{const g=c.target.closest("[data-mode]");if(!g)return;const d=g.dataset.mode==="play"?"play":"decorate";a(d,t.ownHouse())}),i();let r=!1;return{mode:()=>n,isPlay:()=>n==="play",sync(c){a(c?Wg():"play",!1)},hint:()=>{if(r||!document.body.classList.contains("phone"))return;const c=Nt("cozy-mode-hint");try{if(localStorage.getItem(c)){r=!0;return}}catch{r=!0;return}r=!0;const g=document.createElement("p");g.className="modeHint",g.textContent="Play: tap things! Decorate: move things!",e.appendChild(g);const d=()=>{g.remove();try{localStorage.setItem(c,"1")}catch{}};window.setTimeout(d,6500),g.addEventListener("click",d)}}}const re="#5a3d5c",P=(e=4)=>`stroke="${re}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,vi=600,Fe=250,Ft=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})">
  <rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${P()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${P()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${P()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${P()}/>
  <circle cx="-18" cy="-78" r="9" fill="#fff" opacity=".35"/></g>`,Hg=(e,t,n)=>`<g transform="translate(${e} ${t})"><path d="M0 0 V-16" ${P(3)}/>${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*6}" cy="${-20+Math.sin(s*Math.PI/180)*6}" r="5" fill="${n}" ${P(2)}/>`).join("")}<circle cx="0" cy="-20" r="4" fill="#ffd166" ${P(2)}/></g>`,aa=e=>`<g transform="translate(${e} 0)">
  <rect x="-80" y="452" width="160" height="12" rx="6" fill="#ff9f68" ${P()}/><rect x="-80" y="470" width="160" height="12" rx="6" fill="#ff9f68" ${P()}/>
  <rect x="-70" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${P(3)}/><rect x="60" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${P(3)}/>
  <rect x="-86" y="490" width="172" height="14" rx="7" fill="#ffb385" ${P()}/></g>`;function Ag(){const e=ki,t=Array.from({length:Math.floor((me.x1-me.x0+40)/34)},(n,s)=>`<path d="M${me.x0-20+s*34} 470 V428 l8 -10 l8 10 V470 Z" fill="#fff6e6" ${P(3)}/>`).join("");return`<svg class="parkScene" viewBox="0 0 ${e} ${vi}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient>
  <pattern id="pkCheck" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><rect width="15" height="15" fill="#ff8fab"/><rect x="15" y="15" width="15" height="15" fill="#ff8fab"/></pattern></defs>
  <rect width="${e}" height="440" fill="url(#pkSky)"/>
  ${[180,900,1600,2300].map((n,s)=>`<g transform="translate(${n} ${70+s%2*30})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <circle cx="${e-220}" cy="90" r="46" fill="#ffe066" ${P(4)}/>
  <path d="M-50 360 Q500 220 1100 340 T2300 330 T${e+100} 350 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#9fe0aa"/><path d="M0 410 H${e}" ${P(4)}/>
  <path d="M0 560 Q700 520 1400 565 T${e} 545 V600 H0 Z" fill="#f6e3c3" opacity=".9"/>
  ${Ft(260,390,.9)}${Ft(720,380,1.05,"#4fbf7a")}${Ft(1230,385,.8)}${Ft(1640,380,1,"#4fbf7a")}${Ft(1990,388,.85)}${Ft(2380,380,.95)}${Ft(2860,390,.9,"#4fbf7a")}
  ${[[300,470,"#ff8fab"],[690,455,"#c9a0dc"],[1210,470,"#ffd166"],[1960,450,"#8ecae6"],[2390,470,"#ff8fab"],[1580,590,"#c9a0dc"],[140,585,"#ffd166"]].map(([n,s,o])=>Hg(+n,+s,String(o))).join("")}
  <!-- gate back to the street -->
  <g><rect x="40" y="300" width="22" height="200" rx="6" fill="#c99366" ${P()}/><rect x="168" y="300" width="22" height="200" rx="6" fill="#c99366" ${P()}/>
    <path d="M30 312 Q115 240 200 312" fill="none" stroke="${re}" stroke-width="16" stroke-linecap="round"/><path d="M30 312 Q115 240 200 312" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
    <rect x="62" y="252" width="106" height="36" rx="12" fill="#fff6e6" ${P(3)}/><text x="115" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="${re}" font-family="Nunito, system-ui, sans-serif">PARK</text></g>
  <!-- swing set (seats are separate so they can swing) -->
  <g><path d="M350 ${Fe} L310 500 M350 ${Fe} L390 500 M650 ${Fe} L610 500 M650 ${Fe} L690 500" stroke="${re}" stroke-width="14" stroke-linecap="round"/>
    <path d="M350 ${Fe} L310 500 M350 ${Fe} L390 500 M650 ${Fe} L610 500 M650 ${Fe} L690 500" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/>
    <rect x="330" y="${Fe-10}" width="340" height="20" rx="10" fill="#ff8fab" ${P()}/></g>
  <!-- slide -->
  <g><path d="M${O.ladder-20} 560 V${O.top.y} M${O.ladder+30} 560 V${O.top.y}" stroke="${re}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${O.ladder-20} 560 V${O.top.y} M${O.ladder+30} 560 V${O.top.y}" stroke="#c9a0dc" stroke-width="6" stroke-linecap="round"/>
    ${[380,420,460,500,540].map(n=>`<path d="M${O.ladder-20} ${n} H${O.ladder+30}" ${P(5)}/>`).join("")}
    <rect x="${O.ladder-30}" y="${O.top.y-14}" width="100" height="18" rx="8" fill="#ffd166" ${P()}/>
    <path d="M${O.ladder+60} ${O.top.y-10} C 1000 ${O.top.y} 1010 520 ${O.bottom.x+40} 548 L${O.bottom.x+40} 572 C 990 548 975 ${O.top.y+30} ${O.ladder+60} ${O.top.y+14} Z" fill="#ffd166" ${P()}/>
    <path d="M${O.ladder+70} ${O.top.y-2} C 990 ${O.top.y+8} 1000 525 ${O.bottom.x+30} 552" fill="none" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/></g>
  <!-- splash pond -->
  <g class="pondArt"><ellipse cx="1420" cy="515" rx="185" ry="52" fill="#8ecae6" ${P()}/><ellipse cx="1420" cy="510" rx="150" ry="36" fill="#b5e3f5"/>
    <ellipse cx="1340" cy="520" rx="24" ry="9" fill="#80ed99" ${P(3)}/><ellipse cx="1500" cy="505" rx="20" ry="8" fill="#80ed99" ${P(3)}/>
    <g transform="translate(1440 500)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ffd166" ${P(3)}/><circle cx="16" cy="-12" r="9" fill="#ffd166" ${P(3)}/><path d="M24 -12 l8 2 l-8 3 z" fill="#ff9f68" ${P(2)}/><circle cx="18" cy="-14" r="1.8" fill="${re}"/></g></g>
  <!-- picnic blanket -->
  <g><path d="M1670 530 L1910 530 L1940 580 L1640 580 Z" fill="url(#pkCheck)" ${P()}/>
    <g transform="translate(1915 520)"><rect x="-26" y="-20" width="52" height="32" rx="8" fill="#e6b88a" ${P(3)}/><path d="M-18 -20 Q0 -46 18 -20" fill="none" ${P(4)}/><circle cx="-10" cy="-24" r="7" fill="#ff6b6b" ${P(2)}/></g></g>
  ${aa(2065)}${aa(2265)}
  <!-- dog area -->
  <g>${t}<path d="M${me.x0-20} 440 H${me.x1+20}" ${P(3)}/>
    <g transform="translate(${me.x0+10} 380)"><rect x="-6" y="0" width="12" height="70" fill="#c99366" ${P(3)}/><rect x="-55" y="-34" width="110" height="38" rx="10" fill="#fff6e6" ${P(3)}/>
      <text x="0" y="-8" text-anchor="middle" font-size="20" font-weight="900" fill="${re}" font-family="Nunito, system-ui, sans-serif">DOGS 🐾</text></g>
    <g transform="translate(${me.x1-30} 470)"><path d="M-50 0 V-60 L0 -100 L50 -60 V0 Z" fill="#ff8fab" ${P()}/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="${re}" stroke-width="14" stroke-linecap="round"/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="#c9a0dc" stroke-width="8" stroke-linecap="round"/><path d="M-20 0 V-30 a20 20 0 0 1 40 0 V0 Z" fill="#5a3d5c"/></g>
    <g transform="translate(${me.x0+120} 500)"><rect x="-12" y="-30" width="24" height="34" rx="8" fill="#ff6b6b" ${P(3)}/><rect x="-18" y="-18" width="36" height="8" rx="4" fill="#ff6b6b" ${P(3)}/><circle cx="0" cy="-32" r="10" fill="#ff6b6b" ${P(3)}/></g></g>
  </svg>`}const Rg=`<svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M10 0 V222 M50 0 V222" stroke="${re}" stroke-width="4"/><rect x="0" y="216" width="60" height="14" rx="6" fill="#ff9f68" ${P(3)}/></svg>`,Dg=`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffd166" ${P(3)}/><path d="M6 16 Q20 24 34 16 M8 27 Q20 19 32 27" fill="none" stroke="#fff" stroke-width="3"/></svg>`,Ig=`<svg viewBox="0 0 48 48"><rect x="20" y="28" width="8" height="14" rx="3" fill="#c99366" stroke="${re}" stroke-width="3"/><circle cx="24" cy="20" r="13" fill="#5cc985" stroke="${re}" stroke-width="3"/><circle cx="19" cy="16" r="3" fill="#fff" opacity=".5"/></svg>`,rr=`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8" fill="#ff8fab" stroke="${re}" stroke-width="3"/><circle cx="13" cy="20" r="4.5" fill="#ff8fab" stroke="${re}" stroke-width="3"/><circle cx="20" cy="13" r="4.5" fill="#ff8fab" stroke="${re}" stroke-width="3"/><circle cx="28" cy="13" r="4.5" fill="#ff8fab" stroke="${re}" stroke-width="3"/><circle cx="35" cy="20" r="4.5" fill="#ff8fab" stroke="${re}" stroke-width="3"/></svg>`,Ng=`<svg viewBox="0 0 48 48"><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="${re}" stroke-width="4" stroke-linecap="round"/><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="#ff9f68" stroke-width="2"/><path d="M16 40 V26 M24 40 V22 M32 40 V26" stroke="${re}" stroke-width="3" stroke-linecap="round"/></svg>`,Z="#5a3d5c",ne=`stroke="${Z}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,ds=[{body:"#ffd6e0",roof:"#ff7aa8",door:"#8fd3ff",trim:"#fff6e6"},{body:"#d9f2ff",roof:"#5aa9e6",door:"#ffd166",trim:"#ffffff"},{body:"#e3f9d9",roof:"#5cc985",door:"#ff9f68",trim:"#fffbe6"},{body:"#fff1b8",roof:"#ff9f43",door:"#c9a0dc",trim:"#ffffff"},{body:"#eadcff",roof:"#9b7bd8",door:"#80ed99",trim:"#fff6fb"},{body:"#ffe0c7",roof:"#e07a5f",door:"#5fb0d8",trim:"#fffaf0"},{body:"#d8f5ef",roof:"#2fb3a3",door:"#ff8fab",trim:"#ffffff"},{body:"#fde2f3",roof:"#e879c6",door:"#ffd166",trim:"#fff"}];function Vo(e,t={}){const n=ds[(e%ds.length+ds.length)%ds.length],s=e%2===1,o=t.lit?"#fff3b0":"#cfe8ff",i=s?`<path d="M22 138 Q22 36 160 30 Q298 36 298 138 Z" fill="${n.roof}" ${ne}/><path d="M60 110 Q70 60 120 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`:`<path d="M14 140 L160 26 L306 140 Z" fill="${n.roof}" ${ne}/><path d="M70 110 L140 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`;return`<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="294" rx="150" ry="8" fill="#000" opacity=".12"/>
  <rect x="${s?232:220}" y="${s?36:44}" width="30" height="56" rx="6" fill="${n.trim}" ${ne}/>
  <rect x="44" y="124" width="232" height="168" rx="20" fill="${n.body}" ${ne}/>
  ${i}
  <circle cx="160" cy="${s?92:98}" r="18" fill="${o}" ${ne}/><path d="M160 ${s?74:80} V${s?110:116} M142 ${s?92:98} H178" ${ne}/>
  <rect x="62" y="160" width="62" height="58" rx="18" fill="${o}" ${ne}/><path d="M93 160 V218 M62 189 H124" ${ne}/>
  <rect x="196" y="160" width="62" height="58" rx="18" fill="${o}" ${ne}/><path d="M227 160 V218 M196 189 H258" ${ne}/>
  <rect x="56" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${ne}/><rect x="190" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${ne}/>
  <circle cx="72" cy="212" r="7" fill="#ff8fab" ${ne}/><circle cx="92" cy="208" r="7" fill="#ffd166" ${ne}/><circle cx="112" cy="212" r="7" fill="#ff8fab" ${ne}/>
  <circle cx="208" cy="212" r="7" fill="#c9a0dc" ${ne}/><circle cx="228" cy="208" r="7" fill="#80ed99" ${ne}/><circle cx="248" cy="212" r="7" fill="#c9a0dc" ${ne}/>
  <path d="M132 292 V226 Q132 196 160 196 Q188 196 188 226 V292 Z" fill="${n.door}" ${ne}/>
  <circle cx="176" cy="250" r="5" fill="${Z}"/><path d="M146 222 Q160 212 174 222" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>
  <rect x="118" y="286" width="84" height="10" rx="5" fill="${n.trim}" ${ne}/>
</svg>`}const He={street:`<svg viewBox="0 0 48 48"><circle cx="16" cy="15" r="7" fill="#ffd166" stroke="${Z}" stroke-width="3"/><circle cx="32" cy="15" r="7" fill="#ff8fab" stroke="${Z}" stroke-width="3"/><circle cx="13.5" cy="14.5" r="1.2" fill="${Z}"/><circle cx="18.5" cy="14.5" r="1.2" fill="${Z}"/><circle cx="29.5" cy="14.5" r="1.2" fill="${Z}"/><circle cx="34.5" cy="14.5" r="1.2" fill="${Z}"/><path d="M13 18 q3 2.2 6 0 M29 18 q3 2.2 6 0" fill="none" stroke="${Z}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 40 Q16 28 24 33 Q32 38 40 28" fill="none" stroke="#5cc985" stroke-width="4" stroke-linecap="round"/><circle cx="16" cy="36" r="2.2" fill="#fff" stroke="${Z}" stroke-width="1.5"/><circle cx="32" cy="32" r="2.2" fill="#fff" stroke="${Z}" stroke-width="1.5"/></svg>`,home:`<svg viewBox="0 0 48 48"><path d="M8 22 L24 8 L40 22 V40 H8 Z" fill="#ffd166" stroke="${Z}" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 V28 H28 V40" fill="#fff" stroke="${Z}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="20" r="2.4" fill="${Z}"/></svg>`,lockOn:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q33 7 33 16 V22" fill="none" stroke="${Z}" stroke-width="4"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#ffd166" stroke="${Z}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${Z}"/></svg>`,lockOff:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q31 7 32.5 13" fill="none" stroke="${Z}" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#b6f0a8" stroke="${Z}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${Z}"/></svg>`,chat:`<svg viewBox="0 0 48 48"><path d="M8 12 Q8 6 14 6 H34 Q40 6 40 12 V26 Q40 32 34 32 H22 L13 40 V32 Q8 32 8 26 Z" fill="#fff3b0" stroke="${Z}" stroke-width="3" stroke-linejoin="round"/><circle cx="17" cy="19" r="2.5" fill="${Z}"/><circle cx="24" cy="19" r="2.5" fill="${Z}"/><circle cx="31" cy="19" r="2.5" fill="${Z}"/></svg>`,shield:`<svg viewBox="0 0 48 48"><path d="M24 5 L39 11 V23 Q39 36 24 43 Q9 36 9 23 V11 Z" fill="#c9a0dc" stroke="${Z}" stroke-width="3" stroke-linejoin="round"/><path d="M17 24 L22 29 L31 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,solo:`<svg viewBox="0 0 48 48"><path d="M8 24 L24 9 L40 24 V41 H8 Z" fill="#ffd166" stroke="${Z}" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="28" width="10" height="13" rx="4" fill="#fff" stroke="${Z}" stroke-width="2.5"/><path d="M33 7 l2 4 4 .5 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.5z" fill="#ff8fab" stroke="${Z}" stroke-width="1.5"/></svg>`};function T(e,t=2600){const n=document.createElement("div");n.className="toast",n.textContent=e,(document.getElementById("toastLane")??document.body).appendChild(n),setTimeout(()=>n.classList.add("out"),t),setTimeout(()=>n.remove(),t+400)}function lr(){return new Promise(e=>{let t=0,n=0,s="",o=0;const i=document.createElement("div");i.className="sheet adult",i.innerHTML='<div class="card adultCard"></div>',document.body.appendChild(i);const a=i.firstElementChild,r=()=>{t=6+Math.floor(Math.random()*4),n=3+Math.floor(Math.random()*7),s="",l()},l=()=>{a.innerHTML=`<button class="close" data-k="x">✕</button><h2>Grown-ups only</h2><p class="q" data-q="${t*n}">What is ${t} × ${n}?</p>
        <div class="ans">${s||"&nbsp;"}</div>
        <div class="pad">${[1,2,3,4,5,6,7,8,9,"⌫",0,"OK"].map(g=>`<button data-k="${g}">${g}</button>`).join("")}</div>`},c=g=>{i.remove(),e(g)};a.addEventListener("click",g=>{const d=g.target.closest("[data-k]")?.dataset.k;if(d){if(d==="x")return c(!1);if(d==="⌫")s=s.slice(0,-1);else if(d==="OK"){if(+s===t*n)return c(!0);if(++o>=3)return c(!1);a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400),r();return}else s.length<3&&(s+=d);l()}}),i.addEventListener("click",g=>{g.target===i&&c(!1)}),r()})}const xe="#5a3d5c",F=`stroke="${xe}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,xo=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${xe}"/><circle cx="${t}" cy="${n}" r="3" fill="${xe}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,$o=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,ps='<ellipse cx="50" cy="97" rx="34" ry="3" fill="#000" opacity=".12"/>',Og=`<svg viewBox="0 0 40 30"><path d="M4 30 V16 Q4 2 20 2 Q36 2 36 16 V30 Z" fill="#3b2a3d" ${F}/><circle cx="14" cy="18" r="1.6" fill="#fff" opacity=".8"/><circle cx="22" cy="18" r="1.6" fill="#fff" opacity=".8"/></svg>`,qg=`<svg viewBox="0 0 48 30"><path d="M4 27 Q10 22 22 23 L42 23 Q46 27 42 28 H6 Z" fill="#cdeccf" ${F}/><circle cx="26" cy="15" r="11" fill="#ffb3c6" ${F}/><path d="M26 15 m-5 0 a5 5 0 1 1 5 5" fill="none" ${F}/><path d="M8 23 L5 13 M12 23 L12 13" ${F}/></svg>`,jg=`<svg viewBox="0 0 30 30"><path d="M15 2 l3.6 8 8.4 1 -6.3 5.8 1.8 8.4 -7.5 -4.4 -7.5 4.4 1.8 -8.4 L3 11 l8.4 -1z" fill="#fff3b0" ${F}/></svg>`,Vg=`<svg viewBox="0 0 30 22"><ellipse cx="15" cy="13" rx="13" ry="8" fill="#e6b88a" ${F}/><circle cx="10" cy="11" r="1.8" fill="${xe}"/><circle cx="18" cy="14" r="1.8" fill="${xe}"/><circle cx="16" cy="9" r="1.5" fill="${xe}"/></svg>`,Fg=`<svg viewBox="0 0 30 28"><path d="M15 26 C3 18 1 10 6 5 C10 1 14 4 15 7 C16 4 20 1 24 5 C29 10 27 18 15 26 Z" fill="#ffc8dd" ${F}/></svg>`,Ds=[{name:"Cada",room:"living",x:150,y:382,w:40,h:30,taps:3,spot:Og,hello:"Squeak! Hi Cada!",item:{kind:"egg:cada-mouse",name:"Cada's Mouse",cat:"secrets",w:80,holdable:!0,svg:`${ps}<path d="M78 74 Q96 68 92 52" stroke="#ff9bb5" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="28" ry="18" fill="#d6d6e8" ${F}/><circle cx="28" cy="40" r="13" fill="#d6d6e8" ${F}/><circle cx="62" cy="38" r="13" fill="#d6d6e8" ${F}/><circle cx="28" cy="40" r="7" fill="#ffc8dd"/><circle cx="62" cy="38" r="7" fill="#ffc8dd"/><circle cx="45" cy="56" r="20" fill="#e4e4f2" ${F}/>${xo(38,52,54)}<circle cx="45" cy="64" r="3" fill="#ff8fab"/>${$o(32,58,62)}<text x="50" y="96" font-size="11" font-weight="900" text-anchor="middle" fill="${xe}">C</text>`}},{name:"Sloane",room:"living",x:2290,y:383,w:48,h:30,taps:3,spot:qg,hello:"Hi Sloane! ✨",item:{kind:"egg:sloane-snail",name:"Sloane's Rainbow Snail",cat:"secrets",w:110,holdable:!0,svg:`${ps}<path d="M6 92 Q14 80 36 82 L84 82 Q94 90 84 94 H10 Z" fill="#cdeccf" ${F}/><circle cx="56" cy="52" r="32" fill="#ff8fab" ${F}/><circle cx="56" cy="52" r="24" fill="#ffd166"/><circle cx="56" cy="52" r="17" fill="#80ed99"/><circle cx="56" cy="52" r="10" fill="#8ecae6"/><circle cx="56" cy="52" r="4" fill="#c9a0dc"/><circle cx="56" cy="52" r="32" fill="none" ${F}/><path d="M14 82 L8 60 M24 82 L24 60" ${F}/><circle cx="8" cy="58" r="4" fill="${xe}"/><circle cx="24" cy="58" r="4" fill="${xe}"/>${$o(14,30,76)}`}},{name:"Chloe",room:"bedroom",x:2230,y:92,w:30,h:30,taps:5,spot:jg,item:{kind:"egg:chloe-starlamp",name:"Chloe's Star Lamp",cat:"secrets",w:100,holdable:!0,svg:`${ps}<circle cx="50" cy="38" r="34" fill="#fff3b0" opacity=".6"/><path d="M50 6 l8 17 19 2.5 -14 13 4 19 -17 -9.5 -17 9.5 4 -19 -14 -13 19 -2.5z" fill="#ffd166" ${F}/>${xo(43,57,38)}<path d="M45 46 q5 4 10 0" ${F} fill="none"/><rect x="46" y="66" width="8" height="22" rx="4" fill="#c9a0dc" ${F}/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#b388d6" ${F}/><text x="50" y="93" font-size="8" font-weight="900" text-anchor="middle" fill="#fff">CHLOE</text>`}},{name:"Quinn",room:"kitchen",x:80,y:588,w:30,h:22,taps:4,spot:Vg,hello:"Woof! Hi Quinn!",item:{kind:"egg:quinn-pup",name:"Quinn's Cookie Pup",cat:"secrets",w:110,holdable:!0,svg:`${ps}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#e6b88a" ${F}/><circle cx="50" cy="44" r="27" fill="#f2d0a4" ${F}/><ellipse cx="24" cy="46" rx="10" ry="17" fill="#b07d54" ${F}/><ellipse cx="76" cy="46" rx="10" ry="17" fill="#b07d54" ${F}/>${xo(41,59,42)}<ellipse cx="50" cy="53" rx="5" ry="4" fill="${xe}"/>${$o(34,66,54)}<circle cx="84" cy="80" r="10" fill="#e6b88a" ${F}/><circle cx="81" cy="78" r="1.8" fill="${xe}"/><circle cx="87" cy="82" r="1.8" fill="${xe}"/><text x="50" y="30" font-size="10" font-weight="900" text-anchor="middle" fill="${xe}">Q</text>`}},{name:"Reagan",room:"salon",x:2300,y:352,w:30,h:28,taps:5,spot:Fg,item:{kind:"egg:reagan-frame",name:"Reagan's Frame",cat:"secrets",w:120,wall:!0,svg:`<rect x="8" y="10" width="84" height="84" rx="16" fill="#ff8fab" ${F}/><rect x="18" y="20" width="64" height="64" rx="10" fill="#fff3f7" ${F}/><text x="50" y="72" font-size="52" font-weight="900" text-anchor="middle" fill="#e879c6" stroke="${xe}" stroke-width="2.5">R</text><circle cx="14" cy="16" r="6" fill="#ffd166" ${F}/><circle cx="86" cy="88" r="6" fill="#ffd166" ${F}/><path d="M76 24 l2 4 4 .5 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.5z" fill="#ffd166"/>`}}],Zg=Ds.map(e=>({...e.item,rooms:["any"],secret:e.name})),cr=Nt("cozy-secrets"),io=()=>{try{return new Set(JSON.parse(localStorage.getItem(cr)??"[]"))}catch{return new Set}},Qg=e=>localStorage.setItem(cr,JSON.stringify([...e]));function Gg(e){const t=document.createElement("div");t.className="eggs",e.world.appendChild(t);const n=new Map;for(const o of Ds){const i=document.createElement("div");i.className="eggspot",i.dataset.egg=o.name,i.style.left=(o.x-o.w/2)/e.roomW*100+"%",i.style.top=(o.y-o.h)/e.roomH*100+"%",i.style.width=o.w/e.roomW*100+"%",i.style.height=o.h/e.roomH*100+"%",i.innerHTML=o.spot,t.appendChild(i),i.addEventListener("pointerdown",a=>a.stopPropagation()),i.addEventListener("click",a=>{a.stopPropagation();const r=Date.now(),l=n.get(o.name)??{n:0,t:0};if(l.n=r-l.t<1500?l.n+1:1,l.t=r,n.set(o.name,l),i.classList.remove("poke"),i.offsetWidth,i.classList.add("poke"),e.tap(),l.n<o.taps)return;l.n=0;const c=io(),g=!c.has(o.name);c.add(o.name),Qg(c),Kg(o,i),e.sparkle(),e.onFound(o.name,g)})}const s=()=>{const o=e.currentRoom();t.querySelectorAll(".eggspot").forEach(i=>{i.style.display=Ds.find(a=>a.name===i.dataset.egg).room===o?"":"none"})};return s(),{update:s}}function Kg(e,t){if(e.hello){const s=document.createElement("div");s.className="eggpop",s.innerHTML=`<div class="eggcritter"><svg viewBox="0 0 100 100">${e.item.svg}</svg></div><div class="bubble">${e.hello}</div>`,t.appendChild(s),setTimeout(()=>s.remove(),3200)}const n=document.createElement("div");n.className="eggbanner",n.innerHTML=`<span class="sp">✨</span><span class="nm">${[...e.name].map((s,o)=>`<i style="animation-delay:${o*70}ms">${s}</i>`).join("")}</span><span class="sp">✨</span>`,document.body.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3100),gr()}function gr(e=70){const t=["#ff8fab","#ffd166","#8ecae6","#80ed99","#c9a0dc","#ff9f68"],n=document.createElement("div");n.className="confetti",document.body.appendChild(n);for(let s=0;s<e;s++){const o=document.createElement("i");o.style.left=Math.random()*100+"vw",o.style.background=t[s%t.length],o.style.animationDelay=Math.random()*.5+"s",o.style.animationDuration=1.6+Math.random()*1.2+"s",o.style.setProperty("--r",Math.random()*720-360+"deg"),o.style.setProperty("--dx",Math.random()*160-80+"px"),s%3===0&&(o.style.borderRadius="50%"),n.appendChild(o)}setTimeout(()=>n.remove(),3600)}const Yg=`[
  {
    "type": "item",
    "slug": "comfy-armchair",
    "name": "Comfy Chair",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "svg": "living/comfy-armchair.svg",
    "png": "living/comfy-armchair.png",
    "widthUnits": 161.7,
    "heightUnits": 162.5,
    "gameW": 161.7,
    "viewBox": [
      1.0,
      2.5,
      98.0,
      98.5
    ],
    "pngPx": [
      1082,
      1088
    ]
  },
  {
    "type": "item",
    "slug": "daisy-rug",
    "name": "Daisy Rug",
    "room": "living",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "svg": "living/daisy-rug.svg",
    "png": "living/daisy-rug.png",
    "widthUnits": 306.0,
    "heightUnits": 108.0,
    "gameW": 306.0,
    "viewBox": [
      -1.0,
      64.0,
      102.0,
      36.0
    ],
    "pngPx": [
      2048,
      723
    ]
  },
  {
    "type": "item",
    "slug": "monstera-plant",
    "name": "Big Leaf Plant",
    "room": "living",
    "category": "plants",
    "tag": "plant",
    "size": "medium",
    "svg": "living/monstera-plant.svg",
    "png": "living/monstera-plant.png",
    "widthUnits": 158.2,
    "heightUnits": 145.6,
    "gameW": 158.2,
    "viewBox": [
      -6.5,
      -3.0,
      113.0,
      104.0
    ],
    "pngPx": [
      1059,
      974
    ]
  },
  {
    "type": "item",
    "slug": "canopy-bed",
    "name": "Canopy Bed",
    "room": "bedroom",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "svg": "bedroom/canopy-bed.svg",
    "png": "bedroom/canopy-bed.png",
    "widthUnits": 294.0,
    "heightUnits": 294.0,
    "gameW": 294.0,
    "viewBox": [
      1.0,
      3.0,
      98.0,
      98.0
    ],
    "pngPx": [
      1968,
      1968
    ]
  },
  {
    "type": "item",
    "slug": "cat-bed",
    "name": "Cat Bed",
    "room": "bedroom",
    "category": "pets",
    "tag": "pet",
    "size": "medium",
    "svg": "bedroom/cat-bed.svg",
    "png": "bedroom/cat-bed.png",
    "widthUnits": 112.8,
    "heightUnits": 91.2,
    "gameW": 112.8,
    "viewBox": [
      3.0,
      25.0,
      94.0,
      76.0
    ],
    "pngPx": [
      755,
      610
    ]
  },
  {
    "type": "item",
    "slug": "moon-night-light",
    "name": "Moon Night-Light",
    "room": "bedroom",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "svg": "bedroom/moon-night-light.svg",
    "png": "bedroom/moon-night-light.png",
    "widthUnits": 57.7,
    "heightUnits": 70.0,
    "gameW": 57.7,
    "holdable": true,
    "viewBox": [
      7.0,
      1.0,
      82.5,
      100.0
    ],
    "pngPx": [
      386,
      468
    ]
  },
  {
    "type": "item",
    "slug": "dino-plush",
    "name": "Dino Plushie",
    "room": "bedroom",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "svg": "bedroom/dino-plush.svg",
    "png": "bedroom/dino-plush.png",
    "widthUnits": 78.3,
    "heightUnits": 90.9,
    "gameW": 78.3,
    "holdable": true,
    "viewBox": [
      11.0,
      0.0,
      87.0,
      101.0
    ],
    "pngPx": [
      524,
      608
    ]
  },
  {
    "type": "item",
    "slug": "happy-fridge",
    "name": "Happy Fridge",
    "room": "kitchen",
    "category": "furniture",
    "tag": "appliance",
    "size": "large",
    "svg": "kitchen/happy-fridge.svg",
    "png": "kitchen/happy-fridge.png",
    "widthUnits": 132.6,
    "heightUnits": 170.0,
    "gameW": 132.6,
    "viewBox": [
      11.0,
      1.0,
      78.0,
      100.0
    ],
    "pngPx": [
      887,
      1138
    ]
  },
  {
    "type": "item",
    "slug": "toaster",
    "name": "Toaster",
    "room": "kitchen",
    "category": "decor",
    "tag": "appliance",
    "size": "small",
    "svg": "kitchen/toaster.svg",
    "png": "kitchen/toaster.png",
    "widthUnits": 70.4,
    "heightUnits": 73.6,
    "gameW": 70.4,
    "holdable": true,
    "viewBox": [
      9.0,
      9.0,
      88.0,
      92.0
    ],
    "pngPx": [
      471,
      493
    ]
  },
  {
    "type": "item",
    "slug": "fruit-bowl",
    "name": "Fruit Bowl",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "small",
    "svg": "kitchen/fruit-bowl.svg",
    "png": "kitchen/fruit-bowl.png",
    "widthUnits": 75.2,
    "heightUnits": 70.0,
    "gameW": 75.2,
    "holdable": true,
    "viewBox": [
      3.0,
      13.5,
      94.0,
      87.5
    ],
    "pngPx": [
      503,
      468
    ]
  },
  {
    "type": "item",
    "slug": "coffee-table",
    "name": "Coffee Table",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "svg": "living/coffee-table.svg",
    "png": "living/coffee-table.png",
    "widthUnits": 159.8,
    "heightUnits": 102.0,
    "gameW": 159.8,
    "viewBox": [
      3.0,
      41.0,
      94.0,
      60.0
    ],
    "pngPx": [
      1070,
      683
    ]
  },
  {
    "type": "item",
    "slug": "bean-bag",
    "name": "Bean Bag",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "svg": "living/bean-bag.svg",
    "png": "living/bean-bag.png",
    "widthUnits": 112.8,
    "heightUnits": 87.6,
    "gameW": 112.8,
    "viewBox": [
      3.0,
      28.0,
      94.0,
      73.0
    ],
    "pngPx": [
      755,
      586
    ]
  },
  {
    "type": "item",
    "slug": "pouf",
    "name": "Pouf",
    "room": "living",
    "category": "furniture",
    "tag": "seating",
    "size": "small",
    "svg": "living/pouf.svg",
    "png": "living/pouf.png",
    "widthUnits": 62.4,
    "heightUnits": 52.0,
    "gameW": 62.4,
    "viewBox": [
      11.0,
      36.0,
      78.0,
      65.0
    ],
    "pngPx": [
      418,
      348
    ]
  },
  {
    "type": "item",
    "slug": "rocking-chair",
    "name": "Rocking Chair",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "svg": "living/rocking-chair.svg",
    "png": "living/rocking-chair.png",
    "widthUnits": 137.2,
    "heightUnits": 136.5,
    "gameW": 137.2,
    "viewBox": [
      1.0,
      3.5,
      98.0,
      97.5
    ],
    "pngPx": [
      918,
      914
    ]
  },
  {
    "type": "item",
    "slug": "cubby-shelf",
    "name": "Cubby Shelf",
    "room": "living",
    "category": "furniture",
    "tag": "storage",
    "size": "medium",
    "svg": "living/cubby-shelf.svg",
    "png": "living/cubby-shelf.png",
    "widthUnits": 159.8,
    "heightUnits": 125.8,
    "gameW": 159.8,
    "viewBox": [
      3.0,
      27.0,
      94.0,
      74.0
    ],
    "pngPx": [
      1070,
      842
    ]
  },
  {
    "type": "item",
    "slug": "piano",
    "name": "Piano",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "svg": "living/piano.svg",
    "png": "living/piano.png",
    "widthUnits": 186.2,
    "heightUnits": 174.8,
    "gameW": 186.2,
    "viewBox": [
      1.0,
      9.0,
      98.0,
      92.0
    ],
    "pngPx": [
      1246,
      1170
    ]
  },
  {
    "type": "item",
    "slug": "fireplace",
    "name": "Fireplace",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "svg": "living/fireplace.svg",
    "png": "living/fireplace.png",
    "widthUnits": 204.0,
    "heightUnits": 180.0,
    "gameW": 204.0,
    "viewBox": [
      -1.0,
      11.0,
      102.0,
      90.0
    ],
    "pngPx": [
      1365,
      1205
    ]
  },
  {
    "type": "item",
    "slug": "tv-stand",
    "name": "TV Stand",
    "room": "living",
    "category": "furniture",
    "tag": "storage",
    "size": "medium",
    "svg": "living/tv-stand.svg",
    "png": "living/tv-stand.png",
    "widthUnits": 176.4,
    "heightUnits": 90.0,
    "gameW": 176.4,
    "viewBox": [
      1.0,
      51.0,
      98.0,
      50.0
    ],
    "pngPx": [
      1181,
      602
    ]
  },
  {
    "type": "item",
    "slug": "arc-floor-lamp",
    "name": "Arc Lamp",
    "room": "living",
    "category": "decor",
    "tag": "lighting",
    "size": "medium",
    "svg": "living/arc-floor-lamp.svg",
    "png": "living/arc-floor-lamp.png",
    "widthUnits": 135.0,
    "heightUnits": 146.2,
    "gameW": 135.0,
    "viewBox": [
      3.0,
      3.5,
      90.0,
      97.5
    ],
    "pngPx": [
      904,
      978
    ]
  },
  {
    "type": "item",
    "slug": "string-lights",
    "name": "String Lights",
    "room": "living",
    "category": "decor",
    "tag": "lighting",
    "size": "large",
    "svg": "living/string-lights.svg",
    "png": "living/string-lights.png",
    "widthUnits": 262.6,
    "heightUnits": 68.9,
    "gameW": 262.6,
    "wall": true,
    "viewBox": [
      -0.5,
      17.5,
      101.0,
      26.5
    ],
    "pngPx": [
      1758,
      461
    ]
  },
  {
    "type": "item",
    "slug": "tassel-rug",
    "name": "Tassel Rug",
    "room": "living",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "svg": "living/tassel-rug.svg",
    "png": "living/tassel-rug.png",
    "widthUnits": 294.0,
    "heightUnits": 100.5,
    "gameW": 294.0,
    "viewBox": [
      1.0,
      67.0,
      98.0,
      33.5
    ],
    "pngPx": [
      1968,
      673
    ]
  },
  {
    "type": "item",
    "slug": "rainbow-rug",
    "name": "Rainbow Rug",
    "room": "living",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "svg": "living/rainbow-rug.svg",
    "png": "living/rainbow-rug.png",
    "widthUnits": 254.8,
    "heightUnits": 66.3,
    "gameW": 254.8,
    "viewBox": [
      1.0,
      68.5,
      98.0,
      25.5
    ],
    "pngPx": [
      1705,
      444
    ]
  },
  {
    "type": "item",
    "slug": "rainbow-wall-art",
    "name": "Rainbow Art",
    "room": "living",
    "category": "decor",
    "tag": "wall-art",
    "size": "medium",
    "svg": "living/rainbow-wall-art.svg",
    "png": "living/rainbow-wall-art.png",
    "widthUnits": 130.2,
    "heightUnits": 67.2,
    "gameW": 130.2,
    "wall": true,
    "viewBox": [
      -3.5,
      27.0,
      108.5,
      56.0
    ],
    "pngPx": [
      871,
      450
    ]
  },
  {
    "type": "item",
    "slug": "wall-shelf",
    "name": "Wall Shelf",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "svg": "living/wall-shelf.svg",
    "png": "living/wall-shelf.png",
    "widthUnits": 156.8,
    "heightUnits": 100.0,
    "gameW": 156.8,
    "wall": true,
    "viewBox": [
      1.0,
      14.5,
      98.0,
      62.5
    ],
    "pngPx": [
      1049,
      669
    ]
  },
  {
    "type": "item",
    "slug": "globe",
    "name": "Globe",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "svg": "living/globe.svg",
    "png": "living/globe.png",
    "widthUnits": 49.7,
    "heightUnits": 63.7,
    "gameW": 49.7,
    "holdable": true,
    "viewBox": [
      9.0,
      10.0,
      71.0,
      91.0
    ],
    "pngPx": [
      333,
      426
    ]
  },
  {
    "type": "item",
    "slug": "tulip-vase",
    "name": "Tulip Vase",
    "room": "living",
    "category": "plants",
    "tag": "plant",
    "size": "small",
    "svg": "living/tulip-vase.svg",
    "png": "living/tulip-vase.png",
    "widthUnits": 44.8,
    "heightUnits": 76.4,
    "gameW": 44.8,
    "holdable": true,
    "viewBox": [
      22.0,
      5.5,
      56.0,
      95.5
    ],
    "pngPx": [
      300,
      511
    ]
  },
  {
    "type": "item",
    "slug": "fiddle-leaf-fig",
    "name": "Fig Tree",
    "room": "living",
    "category": "plants",
    "tag": "plant",
    "size": "large",
    "svg": "living/fiddle-leaf-fig.svg",
    "png": "living/fiddle-leaf-fig.png",
    "widthUnits": 118.8,
    "heightUnits": 195.7,
    "gameW": 118.8,
    "viewBox": [
      18.5,
      -2.0,
      62.5,
      103.0
    ],
    "pngPx": [
      795,
      1310
    ]
  },
  {
    "type": "item",
    "slug": "hanging-planter",
    "name": "Hanging Plant",
    "room": "living",
    "category": "plants",
    "tag": "plant",
    "size": "small",
    "svg": "living/hanging-planter.svg",
    "png": "living/hanging-planter.png",
    "widthUnits": 67.0,
    "heightUnits": 98.0,
    "gameW": 67.0,
    "wall": true,
    "viewBox": [
      17.0,
      -2.5,
      67.0,
      98.0
    ],
    "pngPx": [
      448,
      656
    ]
  },
  {
    "type": "item",
    "slug": "snake-plant",
    "name": "Snake Plant",
    "room": "living",
    "category": "plants",
    "tag": "plant",
    "size": "medium",
    "svg": "living/snake-plant.svg",
    "png": "living/snake-plant.png",
    "widthUnits": 68.2,
    "heightUnits": 103.4,
    "gameW": 68.2,
    "viewBox": [
      19.0,
      7.0,
      62.0,
      94.0
    ],
    "pngPx": [
      456,
      692
    ]
  },
  {
    "type": "item",
    "slug": "succulent-trio",
    "name": "Succulents",
    "room": "living",
    "category": "plants",
    "tag": "plant",
    "size": "small",
    "svg": "living/succulent-trio.svg",
    "png": "living/succulent-trio.png",
    "widthUnits": 81.0,
    "heightUnits": 66.2,
    "gameW": 81.0,
    "holdable": true,
    "viewBox": [
      5.0,
      27.5,
      90.0,
      73.5
    ],
    "pngPx": [
      542,
      443
    ]
  },
  {
    "type": "item",
    "slug": "throw-pillow",
    "name": "Pillow",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "svg": "living/throw-pillow.svg",
    "png": "living/throw-pillow.png",
    "widthUnits": 53.4,
    "heightUnits": 52.2,
    "gameW": 53.4,
    "holdable": true,
    "viewBox": [
      5.5,
      14.0,
      89.0,
      87.0
    ],
    "pngPx": [
      357,
      349
    ]
  },
  {
    "type": "item",
    "slug": "blanket-basket",
    "name": "Blanket Basket",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "svg": "living/blanket-basket.svg",
    "png": "living/blanket-basket.png",
    "widthUnits": 77.4,
    "heightUnits": 72.9,
    "gameW": 77.4,
    "viewBox": [
      7.0,
      20.0,
      86.0,
      81.0
    ],
    "pngPx": [
      518,
      488
    ]
  },
  {
    "type": "item",
    "slug": "building-blocks",
    "name": "Blocks",
    "room": "living",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "svg": "living/building-blocks.svg",
    "png": "living/building-blocks.png",
    "widthUnits": 69.0,
    "heightUnits": 63.0,
    "gameW": 69.0,
    "holdable": true,
    "viewBox": [
      5.0,
      17.0,
      92.0,
      84.0
    ],
    "pngPx": [
      462,
      422
    ]
  },
  {
    "type": "item",
    "slug": "toy-car",
    "name": "Toy Car",
    "room": "living",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "svg": "living/toy-car.svg",
    "png": "living/toy-car.png",
    "widthUnits": 65.8,
    "heightUnits": 54.6,
    "gameW": 65.8,
    "holdable": true,
    "viewBox": [
      3.0,
      23.0,
      94.0,
      78.0
    ],
    "pngPx": [
      440,
      365
    ]
  },
  {
    "type": "item",
    "slug": "rocking-horse",
    "name": "Rocking Horse",
    "room": "living",
    "category": "decor",
    "tag": "toy",
    "size": "medium",
    "svg": "living/rocking-horse.svg",
    "png": "living/rocking-horse.png",
    "widthUnits": 128.7,
    "heightUnits": 127.4,
    "gameW": 128.7,
    "viewBox": [
      0.5,
      3.0,
      99.0,
      98.0
    ],
    "pngPx": [
      861,
      853
    ]
  },
  {
    "type": "item",
    "slug": "popcorn",
    "name": "Popcorn",
    "room": "living",
    "category": "food",
    "tag": "food",
    "size": "small",
    "svg": "living/popcorn.svg",
    "png": "living/popcorn.png",
    "widthUnits": 41.8,
    "heightUnits": 50.9,
    "gameW": 41.8,
    "holdable": true,
    "viewBox": [
      12.0,
      8.5,
      76.0,
      92.5
    ],
    "pngPx": [
      280,
      341
    ]
  },
  {
    "type": "item",
    "slug": "bird-cage",
    "name": "Birdie",
    "room": "living",
    "category": "pets",
    "tag": "pet",
    "size": "medium",
    "svg": "living/bird-cage.svg",
    "png": "living/bird-cage.png",
    "widthUnits": 99.0,
    "heightUnits": 111.7,
    "gameW": 99.0,
    "viewBox": [
      5.0,
      -0.5,
      90.0,
      101.5
    ],
    "pngPx": [
      663,
      748
    ]
  },
  {
    "type": "item",
    "slug": "turtle",
    "name": "Turtle",
    "room": "living",
    "category": "pets",
    "tag": "pet",
    "size": "small",
    "svg": "living/turtle.svg",
    "png": "living/turtle.png",
    "widthUnits": 67.9,
    "heightUnits": 46.2,
    "gameW": 67.9,
    "holdable": true,
    "viewBox": [
      1.0,
      35.0,
      97.0,
      66.0
    ],
    "pngPx": [
      454,
      309
    ]
  },
  {
    "type": "item",
    "slug": "aquarium",
    "name": "Fish Tank",
    "room": "living",
    "category": "pets",
    "tag": "pet",
    "size": "medium",
    "svg": "living/aquarium.svg",
    "png": "living/aquarium.png",
    "widthUnits": 163.2,
    "heightUnits": 134.4,
    "gameW": 163.2,
    "viewBox": [
      -1.0,
      17.0,
      102.0,
      84.0
    ],
    "pngPx": [
      1092,
      900
    ]
  },
  {
    "type": "item",
    "slug": "bunk-bed",
    "name": "Bunk Bed",
    "room": "bedroom",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "svg": "bedroom/bunk-bed.svg",
    "png": "bedroom/bunk-bed.png",
    "widthUnits": 294.0,
    "heightUnits": 300.0,
    "gameW": 294.0,
    "viewBox": [
      1.0,
      1.0,
      98.0,
      100.0
    ],
    "pngPx": [
      1968,
      2008
    ]
  },
  {
    "type": "item",
    "slug": "dresser",
    "name": "Dresser",
    "room": "bedroom",
    "category": "furniture",
    "tag": "storage",
    "size": "medium",
    "svg": "bedroom/dresser.svg",
    "png": "bedroom/dresser.png",
    "widthUnits": 141.0,
    "heightUnits": 126.0,
    "gameW": 141.0,
    "viewBox": [
      3.0,
      17.0,
      94.0,
      84.0
    ],
    "pngPx": [
      944,
      843
    ]
  },
  {
    "type": "item",
    "slug": "nightstand",
    "name": "Nightstand",
    "room": "bedroom",
    "category": "furniture",
    "tag": "furniture",
    "size": "small",
    "svg": "bedroom/nightstand.svg",
    "png": "bedroom/nightstand.png",
    "widthUnits": 69.7,
    "heightUnits": 59.5,
    "gameW": 69.7,
    "viewBox": [
      9.0,
      31.0,
      82.0,
      70.0
    ],
    "pngPx": [
      466,
      398
    ]
  },
  {
    "type": "item",
    "slug": "wardrobe",
    "name": "Wardrobe",
    "room": "bedroom",
    "category": "furniture",
    "tag": "storage",
    "size": "medium",
    "svg": "bedroom/wardrobe.svg",
    "png": "bedroom/wardrobe.png",
    "widthUnits": 150.5,
    "heightUnits": 178.5,
    "gameW": 150.5,
    "viewBox": [
      7.0,
      -1.0,
      86.0,
      102.0
    ],
    "pngPx": [
      1007,
      1195
    ]
  },
  {
    "type": "item",
    "slug": "desk",
    "name": "Desk",
    "room": "bedroom",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "svg": "bedroom/desk.svg",
    "png": "bedroom/desk.png",
    "widthUnits": 166.6,
    "heightUnits": 166.6,
    "gameW": 166.6,
    "viewBox": [
      1.0,
      3.0,
      98.0,
      98.0
    ],
    "pngPx": [
      1115,
      1115
    ]
  },
  {
    "type": "item",
    "slug": "toy-chest",
    "name": "Toy Chest",
    "room": "bedroom",
    "category": "furniture",
    "tag": "storage",
    "size": "medium",
    "svg": "bedroom/toy-chest.svg",
    "png": "bedroom/toy-chest.png",
    "widthUnits": 126.0,
    "heightUnits": 114.8,
    "gameW": 126.0,
    "viewBox": [
      5.0,
      19.0,
      90.0,
      82.0
    ],
    "pngPx": [
      843,
      768
    ]
  },
  {
    "type": "item",
    "slug": "play-tent",
    "name": "Play Tent",
    "room": "bedroom",
    "category": "decor",
    "tag": "toy",
    "size": "large",
    "svg": "bedroom/play-tent.svg",
    "png": "bedroom/play-tent.png",
    "widthUnits": 180.0,
    "heightUnits": 200.0,
    "gameW": 180.0,
    "viewBox": [
      5.0,
      1.0,
      90.0,
      100.0
    ],
    "pngPx": [
      1205,
      1339
    ]
  },
  {
    "type": "item",
    "slug": "egg-chair",
    "name": "Swing Chair",
    "room": "bedroom",
    "category": "furniture",
    "tag": "seating",
    "size": "medium",
    "svg": "bedroom/egg-chair.svg",
    "png": "bedroom/egg-chair.png",
    "widthUnits": 126.0,
    "heightUnits": 154.5,
    "gameW": 126.0,
    "viewBox": [
      9.0,
      -2.0,
      84.0,
      103.0
    ],
    "pngPx": [
      843,
      1034
    ]
  },
  {
    "type": "item",
    "slug": "alarm-clock",
    "name": "Alarm Clock",
    "room": "bedroom",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "svg": "bedroom/alarm-clock.svg",
    "png": "bedroom/alarm-clock.png",
    "widthUnits": 40.7,
    "heightUnits": 51.2,
    "gameW": 40.7,
    "holdable": true,
    "viewBox": [
      13.0,
      8.0,
      74.0,
      93.0
    ],
    "pngPx": [
      272,
      343
    ]
  },
  {
    "type": "item",
    "slug": "lava-lamp",
    "name": "Lava Lamp",
    "room": "bedroom",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "svg": "bedroom/lava-lamp.svg",
    "png": "bedroom/lava-lamp.png",
    "widthUnits": 33.0,
    "heightUnits": 50.0,
    "gameW": 33.0,
    "holdable": true,
    "viewBox": [
      17.0,
      1.0,
      66.0,
      100.0
    ],
    "pngPx": [
      221,
      335
    ]
  },
  {
    "type": "item",
    "slug": "paper-lantern",
    "name": "Paper Lantern",
    "room": "bedroom",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "svg": "bedroom/paper-lantern.svg",
    "png": "bedroom/paper-lantern.png",
    "widthUnits": 91.8,
    "heightUnits": 98.5,
    "gameW": 91.8,
    "wall": true,
    "viewBox": [
      -1.0,
      -2.5,
      102.0,
      109.5
    ],
    "pngPx": [
      614,
      659
    ]
  },
  {
    "type": "item",
    "slug": "heart-rug",
    "name": "Heart Rug",
    "room": "bedroom",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "svg": "bedroom/heart-rug.svg",
    "png": "bedroom/heart-rug.png",
    "widthUnits": 217.8,
    "heightUnits": 77.0,
    "gameW": 217.8,
    "viewBox": [
      0.5,
      65.0,
      99.0,
      35.0
    ],
    "pngPx": [
      1458,
      515
    ]
  },
  {
    "type": "item",
    "slug": "cloud-rug",
    "name": "Cloud Rug",
    "room": "bedroom",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "svg": "bedroom/cloud-rug.svg",
    "png": "bedroom/cloud-rug.png",
    "widthUnits": 258.7,
    "heightUnits": 98.8,
    "gameW": 258.7,
    "viewBox": [
      1.5,
      63.0,
      99.5,
      38.0
    ],
    "pngPx": [
      1731,
      661
    ]
  },
  {
    "type": "item",
    "slug": "cloud-shelf",
    "name": "Cloud Shelf",
    "room": "bedroom",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "svg": "bedroom/cloud-shelf.svg",
    "png": "bedroom/cloud-shelf.png",
    "widthUnits": 118.2,
    "heightUnits": 60.6,
    "gameW": 118.2,
    "wall": true,
    "viewBox": [
      0.5,
      20.5,
      98.5,
      50.5
    ],
    "pngPx": [
      791,
      406
    ]
  },
  {
    "type": "item",
    "slug": "star-mobile",
    "name": "Star Mobile",
    "room": "bedroom",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "svg": "bedroom/star-mobile.svg",
    "png": "bedroom/star-mobile.png",
    "widthUnits": 102.3,
    "heightUnits": 105.1,
    "gameW": 102.3,
    "wall": true,
    "viewBox": [
      3.5,
      -2.5,
      93.0,
      95.5
    ],
    "pngPx": [
      685,
      703
    ]
  },
  {
    "type": "item",
    "slug": "cork-board",
    "name": "Pin Board",
    "room": "bedroom",
    "category": "decor",
    "tag": "wall-art",
    "size": "medium",
    "svg": "bedroom/cork-board.svg",
    "png": "bedroom/cork-board.png",
    "widthUnits": 127.4,
    "heightUnits": 98.8,
    "gameW": 127.4,
    "wall": true,
    "viewBox": [
      1.0,
      11.0,
      98.0,
      76.0
    ],
    "pngPx": [
      853,
      661
    ]
  },
  {
    "type": "item",
    "slug": "bunny-slippers",
    "name": "Bunny Slippers",
    "room": "bedroom",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "svg": "bedroom/bunny-slippers.svg",
    "png": "bedroom/bunny-slippers.png",
    "widthUnits": 54.0,
    "heightUnits": 45.6,
    "gameW": 54.0,
    "holdable": true,
    "viewBox": [
      5.0,
      25.0,
      90.0,
      76.0
    ],
    "pngPx": [
      361,
      305
    ]
  },
  {
    "type": "item",
    "slug": "book-stack",
    "name": "Books",
    "room": "bedroom",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "svg": "bedroom/book-stack.svg",
    "png": "bedroom/book-stack.png",
    "widthUnits": 47.3,
    "heightUnits": 38.5,
    "gameW": 47.3,
    "holdable": true,
    "viewBox": [
      7.0,
      31.0,
      86.0,
      70.0
    ],
    "pngPx": [
      317,
      258
    ]
  },
  {
    "type": "item",
    "slug": "piggy-bank",
    "name": "Piggy Bank",
    "room": "bedroom",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "svg": "bedroom/piggy-bank.svg",
    "png": "bedroom/piggy-bank.png",
    "widthUnits": 52.8,
    "heightUnits": 51.6,
    "gameW": 52.8,
    "holdable": true,
    "viewBox": [
      9.0,
      15.0,
      88.0,
      86.0
    ],
    "pngPx": [
      353,
      345
    ]
  },
  {
    "type": "item",
    "slug": "doll-house",
    "name": "Doll House",
    "room": "bedroom",
    "category": "decor",
    "tag": "toy",
    "size": "medium",
    "svg": "bedroom/doll-house.svg",
    "png": "bedroom/doll-house.png",
    "widthUnits": 109.2,
    "heightUnits": 131.6,
    "gameW": 109.2,
    "viewBox": [
      11.0,
      7.0,
      78.0,
      94.0
    ],
    "pngPx": [
      731,
      881
    ]
  },
  {
    "type": "item",
    "slug": "toy-robot",
    "name": "Robot",
    "room": "bedroom",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "svg": "bedroom/toy-robot.svg",
    "png": "bedroom/toy-robot.png",
    "widthUnits": 60.2,
    "heightUnits": 72.4,
    "gameW": 60.2,
    "holdable": true,
    "viewBox": [
      7.0,
      -2.5,
      86.0,
      103.5
    ],
    "pngPx": [
      403,
      485
    ]
  },
  {
    "type": "item",
    "slug": "unicorn-plush",
    "name": "Unicorn Plushie",
    "room": "bedroom",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "svg": "bedroom/unicorn-plush.svg",
    "png": "bedroom/unicorn-plush.png",
    "widthUnits": 66.3,
    "heightUnits": 90.1,
    "gameW": 66.3,
    "holdable": true,
    "viewBox": [
      11.0,
      -5.0,
      78.0,
      106.0
    ],
    "pngPx": [
      444,
      603
    ]
  },
  {
    "type": "item",
    "slug": "toy-train",
    "name": "Toy Train",
    "room": "bedroom",
    "category": "decor",
    "tag": "toy",
    "size": "medium",
    "svg": "bedroom/toy-train.svg",
    "png": "bedroom/toy-train.png",
    "widthUnits": 114.4,
    "heightUnits": 115.0,
    "gameW": 114.4,
    "viewBox": [
      1.0,
      -3.5,
      104.0,
      104.5
    ],
    "pngPx": [
      766,
      770
    ]
  },
  {
    "type": "item",
    "slug": "plant-stand",
    "name": "Plant Stand",
    "room": "bedroom",
    "category": "plants",
    "tag": "plant",
    "size": "medium",
    "svg": "bedroom/plant-stand.svg",
    "png": "bedroom/plant-stand.png",
    "widthUnits": 78.1,
    "heightUnits": 107.8,
    "gameW": 78.1,
    "viewBox": [
      14.5,
      3.0,
      71.0,
      98.0
    ],
    "pngPx": [
      523,
      721
    ]
  },
  {
    "type": "item",
    "slug": "daisy-pot",
    "name": "Daisy Pot",
    "room": "bedroom",
    "category": "plants",
    "tag": "plant",
    "size": "small",
    "svg": "bedroom/daisy-pot.svg",
    "png": "bedroom/daisy-pot.png",
    "widthUnits": 37.7,
    "heightUnits": 57.2,
    "gameW": 37.7,
    "holdable": true,
    "viewBox": [
      21.0,
      13.0,
      58.0,
      88.0
    ],
    "pngPx": [
      252,
      383
    ]
  },
  {
    "type": "item",
    "slug": "hamster-cage",
    "name": "Hamster House",
    "room": "bedroom",
    "category": "pets",
    "tag": "pet",
    "size": "medium",
    "svg": "bedroom/hamster-cage.svg",
    "png": "bedroom/hamster-cage.png",
    "widthUnits": 112.8,
    "heightUnits": 119.4,
    "gameW": 112.8,
    "viewBox": [
      3.0,
      1.5,
      94.0,
      99.5
    ],
    "pngPx": [
      755,
      799
    ]
  },
  {
    "type": "item",
    "slug": "guinea-pig",
    "name": "Guinea Pig",
    "room": "bedroom",
    "category": "pets",
    "tag": "pet",
    "size": "small",
    "svg": "bedroom/guinea-pig.svg",
    "png": "bedroom/guinea-pig.png",
    "widthUnits": 51.6,
    "heightUnits": 41.7,
    "gameW": 51.6,
    "holdable": true,
    "viewBox": [
      9.0,
      31.5,
      86.0,
      69.5
    ],
    "pngPx": [
      345,
      279
    ]
  },
  {
    "type": "item",
    "slug": "kitchen-counter",
    "name": "Counter",
    "room": "kitchen",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "svg": "kitchen/kitchen-counter.svg",
    "png": "kitchen/kitchen-counter.png",
    "widthUnits": 166.6,
    "heightUnits": 146.2,
    "gameW": 166.6,
    "viewBox": [
      1.0,
      15.0,
      98.0,
      86.0
    ],
    "pngPx": [
      1115,
      978
    ]
  },
  {
    "type": "item",
    "slug": "kitchen-sink",
    "name": "Sink",
    "room": "kitchen",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "svg": "kitchen/kitchen-sink.svg",
    "png": "kitchen/kitchen-sink.png",
    "widthUnits": 166.6,
    "heightUnits": 162.3,
    "gameW": 166.6,
    "viewBox": [
      1.0,
      5.5,
      98.0,
      95.5
    ],
    "pngPx": [
      1115,
      1086
    ]
  },
  {
    "type": "item",
    "slug": "bar-stool",
    "name": "Bar Stool",
    "room": "kitchen",
    "category": "furniture",
    "tag": "seating",
    "size": "small",
    "svg": "kitchen/bar-stool.svg",
    "png": "kitchen/bar-stool.png",
    "widthUnits": 52.8,
    "heightUnits": 68.8,
    "gameW": 52.8,
    "viewBox": [
      17.0,
      15.0,
      66.0,
      86.0
    ],
    "pngPx": [
      353,
      460
    ]
  },
  {
    "type": "item",
    "slug": "high-chair",
    "name": "High Chair",
    "room": "kitchen",
    "category": "furniture",
    "tag": "furniture",
    "size": "small",
    "svg": "kitchen/high-chair.svg",
    "png": "kitchen/high-chair.png",
    "widthUnits": 88.0,
    "heightUnits": 99.0,
    "gameW": 88.0,
    "viewBox": [
      7.0,
      11.0,
      80.0,
      90.0
    ],
    "pngPx": [
      589,
      663
    ]
  },
  {
    "type": "item",
    "slug": "china-hutch",
    "name": "Dish Cabinet",
    "room": "kitchen",
    "category": "furniture",
    "tag": "storage",
    "size": "medium",
    "svg": "kitchen/china-hutch.svg",
    "png": "kitchen/china-hutch.png",
    "widthUnits": 164.5,
    "heightUnits": 171.5,
    "gameW": 164.5,
    "viewBox": [
      3.0,
      3.0,
      94.0,
      98.0
    ],
    "pngPx": [
      1101,
      1148
    ]
  },
  {
    "type": "item",
    "slug": "pantry-shelf",
    "name": "Pantry",
    "room": "kitchen",
    "category": "furniture",
    "tag": "storage",
    "size": "medium",
    "svg": "kitchen/pantry-shelf.svg",
    "png": "kitchen/pantry-shelf.png",
    "widthUnits": 137.6,
    "heightUnits": 153.6,
    "gameW": 137.6,
    "viewBox": [
      7.0,
      5.0,
      86.0,
      96.0
    ],
    "pngPx": [
      921,
      1028
    ]
  },
  {
    "type": "item",
    "slug": "microwave",
    "name": "Microwave",
    "room": "kitchen",
    "category": "decor",
    "tag": "appliance",
    "size": "small",
    "svg": "kitchen/microwave.svg",
    "png": "kitchen/microwave.png",
    "widthUnits": 89.3,
    "heightUnits": 70.3,
    "gameW": 89.3,
    "viewBox": [
      3.0,
      27.0,
      94.0,
      74.0
    ],
    "pngPx": [
      598,
      471
    ]
  },
  {
    "type": "item",
    "slug": "kettle",
    "name": "Kettle",
    "room": "kitchen",
    "category": "decor",
    "tag": "appliance",
    "size": "small",
    "svg": "kitchen/kettle.svg",
    "png": "kitchen/kettle.png",
    "widthUnits": 49.2,
    "heightUnits": 56.4,
    "gameW": 49.2,
    "holdable": true,
    "viewBox": [
      15.0,
      7.0,
      82.0,
      94.0
    ],
    "pngPx": [
      329,
      377
    ]
  },
  {
    "type": "item",
    "slug": "rice-cooker",
    "name": "Rice Cooker",
    "room": "kitchen",
    "category": "decor",
    "tag": "appliance",
    "size": "small",
    "svg": "kitchen/rice-cooker.svg",
    "png": "kitchen/rice-cooker.png",
    "widthUnits": 55.9,
    "heightUnits": 53.0,
    "gameW": 55.9,
    "holdable": true,
    "viewBox": [
      7.0,
      19.5,
      86.0,
      81.5
    ],
    "pngPx": [
      374,
      355
    ]
  },
  {
    "type": "item",
    "slug": "stand-mixer",
    "name": "Mixer",
    "room": "kitchen",
    "category": "decor",
    "tag": "appliance",
    "size": "small",
    "svg": "kitchen/stand-mixer.svg",
    "png": "kitchen/stand-mixer.png",
    "widthUnits": 64.5,
    "heightUnits": 67.5,
    "gameW": 64.5,
    "viewBox": [
      7.0,
      11.0,
      86.0,
      90.0
    ],
    "pngPx": [
      432,
      452
    ]
  },
  {
    "type": "item",
    "slug": "pendant-lamp",
    "name": "Hanging Lamp",
    "room": "kitchen",
    "category": "decor",
    "tag": "lighting",
    "size": "medium",
    "svg": "kitchen/pendant-lamp.svg",
    "png": "kitchen/pendant-lamp.png",
    "widthUnits": 78.0,
    "heightUnits": 103.5,
    "gameW": 78.0,
    "wall": true,
    "viewBox": [
      11.0,
      -2.5,
      78.0,
      103.5
    ],
    "pngPx": [
      522,
      693
    ]
  },
  {
    "type": "item",
    "slug": "runner-rug",
    "name": "Runner Rug",
    "room": "kitchen",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "svg": "kitchen/runner-rug.svg",
    "png": "kitchen/runner-rug.png",
    "widthUnits": 207.2,
    "heightUnits": 105.0,
    "gameW": 207.2,
    "viewBox": [
      13.0,
      63.0,
      74.0,
      37.5
    ],
    "pngPx": [
      1387,
      703
    ]
  },
  {
    "type": "item",
    "slug": "utensil-rail",
    "name": "Utensil Rail",
    "room": "kitchen",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "svg": "kitchen/utensil-rail.svg",
    "png": "kitchen/utensil-rail.png",
    "widthUnits": 127.4,
    "heightUnits": 94.2,
    "gameW": 127.4,
    "wall": true,
    "viewBox": [
      1.0,
      7.0,
      98.0,
      72.5
    ],
    "pngPx": [
      853,
      630
    ]
  },
  {
    "type": "item",
    "slug": "spice-rack",
    "name": "Spice Rack",
    "room": "kitchen",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "svg": "kitchen/spice-rack.svg",
    "png": "kitchen/spice-rack.png",
    "widthUnits": 107.8,
    "heightUnits": 56.7,
    "gameW": 107.8,
    "wall": true,
    "viewBox": [
      1.0,
      25.5,
      98.0,
      51.5
    ],
    "pngPx": [
      721,
      379
    ]
  },
  {
    "type": "item",
    "slug": "cookie-jar",
    "name": "Cookie Jar",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "small",
    "svg": "kitchen/cookie-jar.svg",
    "png": "kitchen/cookie-jar.png",
    "widthUnits": 43.8,
    "heightUnits": 54.0,
    "gameW": 43.8,
    "holdable": true,
    "viewBox": [
      13.5,
      11.0,
      73.0,
      90.0
    ],
    "pngPx": [
      293,
      361
    ]
  },
  {
    "type": "item",
    "slug": "teapot",
    "name": "Teapot",
    "room": "kitchen",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "svg": "kitchen/teapot.svg",
    "png": "kitchen/teapot.png",
    "widthUnits": 55.5,
    "heightUnits": 43.8,
    "gameW": 55.5,
    "holdable": true,
    "viewBox": [
      5.0,
      28.0,
      92.5,
      73.0
    ],
    "pngPx": [
      371,
      293
    ]
  },
  {
    "type": "item",
    "slug": "cocoa-mug",
    "name": "Cocoa Mug",
    "room": "kitchen",
    "category": "food",
    "tag": "drink",
    "size": "small",
    "svg": "kitchen/cocoa-mug.svg",
    "png": "kitchen/cocoa-mug.png",
    "widthUnits": 33.8,
    "heightUnits": 36.6,
    "gameW": 33.8,
    "holdable": true,
    "viewBox": [
      15.0,
      9.5,
      84.5,
      91.5
    ],
    "pngPx": [
      226,
      245
    ]
  },
  {
    "type": "item",
    "slug": "cooking-pot",
    "name": "Cooking Pot",
    "room": "kitchen",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "svg": "kitchen/cooking-pot.svg",
    "png": "kitchen/cooking-pot.png",
    "widthUnits": 73.5,
    "heightUnits": 66.0,
    "gameW": 73.5,
    "holdable": true,
    "viewBox": [
      1.0,
      13.0,
      98.0,
      88.0
    ],
    "pngPx": [
      492,
      442
    ]
  },
  {
    "type": "item",
    "slug": "frying-pan",
    "name": "Egg Pan",
    "room": "kitchen",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "svg": "kitchen/frying-pan.svg",
    "png": "kitchen/frying-pan.png",
    "widthUnits": 80.4,
    "heightUnits": 40.4,
    "gameW": 80.4,
    "holdable": true,
    "viewBox": [
      3.0,
      50.5,
      100.5,
      50.5
    ],
    "pngPx": [
      538,
      270
    ]
  },
  {
    "type": "item",
    "slug": "herb-box",
    "name": "Herb Box",
    "room": "kitchen",
    "category": "plants",
    "tag": "plant",
    "size": "medium",
    "svg": "kitchen/herb-box.svg",
    "png": "kitchen/herb-box.png",
    "widthUnits": 110.0,
    "heightUnits": 83.6,
    "gameW": 110.0,
    "viewBox": [
      0.0,
      25.0,
      100.0,
      76.0
    ],
    "pngPx": [
      736,
      560
    ]
  },
  {
    "type": "item",
    "slug": "lemon-tree",
    "name": "Lemon Tree",
    "room": "kitchen",
    "category": "plants",
    "tag": "plant",
    "size": "medium",
    "svg": "kitchen/lemon-tree.svg",
    "png": "kitchen/lemon-tree.png",
    "widthUnits": 79.8,
    "heightUnits": 120.0,
    "gameW": 79.8,
    "viewBox": [
      18.0,
      1.0,
      66.5,
      100.0
    ],
    "pngPx": [
      534,
      803
    ]
  },
  {
    "type": "item",
    "slug": "bananas",
    "name": "Bananas",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "small",
    "svg": "kitchen/bananas.svg",
    "png": "kitchen/bananas.png",
    "widthUnits": 44.5,
    "heightUnits": 42.5,
    "gameW": 44.5,
    "holdable": true,
    "viewBox": [
      14.0,
      17.0,
      89.0,
      85.0
    ],
    "pngPx": [
      298,
      284
    ]
  },
  {
    "type": "item",
    "slug": "watermelon-slice",
    "name": "Watermelon",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "small",
    "svg": "kitchen/watermelon-slice.svg",
    "png": "kitchen/watermelon-slice.png",
    "widthUnits": 45.0,
    "heightUnits": 34.0,
    "gameW": 45.0,
    "holdable": true,
    "viewBox": [
      5.0,
      33.0,
      90.0,
      68.0
    ],
    "pngPx": [
      301,
      228
    ]
  },
  {
    "type": "item",
    "slug": "pancakes",
    "name": "Pancakes",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "small",
    "svg": "kitchen/pancakes.svg",
    "png": "kitchen/pancakes.png",
    "widthUnits": 56.4,
    "heightUnits": 47.1,
    "gameW": 56.4,
    "holdable": true,
    "viewBox": [
      3.0,
      22.5,
      94.0,
      78.5
    ],
    "pngPx": [
      377,
      315
    ]
  },
  {
    "type": "item",
    "slug": "ice-cream",
    "name": "Ice Cream",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "small",
    "svg": "kitchen/ice-cream.svg",
    "png": "kitchen/ice-cream.png",
    "widthUnits": 18.4,
    "heightUnits": 39.8,
    "gameW": 18.4,
    "holdable": true,
    "viewBox": [
      27.0,
      -0.5,
      46.0,
      99.5
    ],
    "pngPx": [
      123,
      266
    ]
  },
  {
    "type": "item",
    "slug": "milk-bottle",
    "name": "Milk",
    "room": "kitchen",
    "category": "food",
    "tag": "drink",
    "size": "small",
    "svg": "kitchen/milk-bottle.svg",
    "png": "kitchen/milk-bottle.png",
    "widthUnits": 23.2,
    "heightUnits": 37.6,
    "gameW": 23.2,
    "holdable": true,
    "viewBox": [
      21.0,
      7.0,
      58.0,
      94.0
    ],
    "pngPx": [
      155,
      252
    ]
  },
  {
    "type": "item",
    "slug": "bread-loaf",
    "name": "Bread",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "small",
    "svg": "kitchen/bread-loaf.svg",
    "png": "kitchen/bread-loaf.png",
    "widthUnits": 48.4,
    "heightUnits": 44.0,
    "gameW": 48.4,
    "holdable": true,
    "viewBox": [
      6.0,
      21.0,
      88.0,
      80.0
    ],
    "pngPx": [
      324,
      294
    ]
  },
  {
    "type": "item",
    "slug": "cupcake",
    "name": "Cupcake",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "small",
    "svg": "kitchen/cupcake.svg",
    "png": "kitchen/cupcake.png",
    "widthUnits": 32.9,
    "heightUnits": 44.8,
    "gameW": 32.9,
    "holdable": true,
    "viewBox": [
      13.5,
      1.5,
      73.0,
      99.5
    ],
    "pngPx": [
      220,
      300
    ]
  },
  {
    "type": "item",
    "slug": "dish-rack",
    "name": "Dish Rack",
    "room": "kitchen",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "svg": "kitchen/dish-rack.svg",
    "png": "kitchen/dish-rack.png",
    "widthUnits": 76.5,
    "heightUnits": 67.6,
    "gameW": 76.5,
    "viewBox": [
      5.0,
      21.5,
      90.0,
      79.5
    ],
    "pngPx": [
      512,
      452
    ]
  },
  {
    "type": "item",
    "slug": "pet-bowl",
    "name": "Pet Bowl",
    "room": "kitchen",
    "category": "pets",
    "tag": "pet",
    "size": "small",
    "svg": "kitchen/pet-bowl.svg",
    "png": "kitchen/pet-bowl.png",
    "widthUnits": 49.5,
    "heightUnits": 34.4,
    "gameW": 49.5,
    "holdable": true,
    "viewBox": [
      5.0,
      38.5,
      90.0,
      62.5
    ],
    "pngPx": [
      331,
      230
    ]
  },
  {
    "type": "item",
    "slug": "chick",
    "name": "Chick",
    "room": "kitchen",
    "category": "pets",
    "tag": "pet",
    "size": "small",
    "svg": "kitchen/chick.svg",
    "png": "kitchen/chick.png",
    "widthUnits": 37.4,
    "heightUnits": 37.6,
    "gameW": 37.4,
    "holdable": true,
    "viewBox": [
      8.5,
      17.5,
      83.0,
      83.5
    ],
    "pngPx": [
      250,
      252
    ]
  },
  {
    "type": "item",
    "slug": "retro-radio",
    "name": "Radio",
    "room": "living",
    "category": "decor",
    "tag": "appliance",
    "size": "small",
    "svg": "living/retro-radio.svg",
    "png": "living/retro-radio.png",
    "widthUnits": 63.0,
    "heightUnits": 70.0,
    "gameW": 63.0,
    "holdable": true,
    "viewBox": [
      5.0,
      1.0,
      90.0,
      100.0
    ],
    "pngPx": [
      422,
      468
    ]
  },
  {
    "type": "item",
    "slug": "floor-fan",
    "name": "Fan",
    "room": "bedroom",
    "category": "decor",
    "tag": "appliance",
    "size": "small",
    "svg": "bedroom/floor-fan.svg",
    "png": "bedroom/floor-fan.png",
    "widthUnits": 52.8,
    "heightUnits": 78.4,
    "gameW": 52.8,
    "viewBox": [
      17.0,
      3.0,
      66.0,
      98.0
    ],
    "pngPx": [
      353,
      525
    ]
  },
  {
    "type": "item",
    "slug": "bedtime-snack",
    "name": "Milk & Cookies",
    "room": "bedroom",
    "category": "food",
    "tag": "food",
    "size": "small",
    "svg": "bedroom/bedtime-snack.svg",
    "png": "bedroom/bedtime-snack.png",
    "widthUnits": 56.4,
    "heightUnits": 44.4,
    "gameW": 56.4,
    "holdable": true,
    "viewBox": [
      3.0,
      27.0,
      94.0,
      74.0
    ],
    "pngPx": [
      377,
      297
    ]
  },
  {
    "slug": "wood-bookshelf",
    "room": "any",
    "name": "Wood Bookshelf",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 124.0,
    "designW": 200,
    "widthUnits": 124.0,
    "heightUnits": 200.0,
    "viewBox": [
      19.0,
      1.0,
      62.0,
      100.0
    ],
    "svg": "packs/welcome-home/wood-bookshelf.svg",
    "png": "packs/welcome-home/wood-bookshelf.png"
  },
  {
    "slug": "lattice-bench",
    "room": "living",
    "name": "Lattice Bench",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 147.0,
    "designW": 150,
    "widthUnits": 147.0,
    "heightUnits": 135.0,
    "viewBox": [
      1.0,
      11.0,
      98.0,
      90.0
    ],
    "svg": "packs/welcome-home/lattice-bench.svg",
    "png": "packs/welcome-home/lattice-bench.png"
  },
  {
    "slug": "wood-coffee-table",
    "room": "living",
    "name": "Wood Coffee Table",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "gameW": 171.0,
    "designW": 190,
    "widthUnits": 171.0,
    "heightUnits": 121.6,
    "viewBox": [
      5.0,
      37.0,
      90.0,
      64.0
    ],
    "svg": "packs/welcome-home/wood-coffee-table.svg",
    "png": "packs/welcome-home/wood-coffee-table.png"
  },
  {
    "slug": "wood-desk",
    "room": "bedroom",
    "name": "Wood Desk",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 150.4,
    "designW": 160,
    "widthUnits": 150.4,
    "heightUnits": 137.6,
    "viewBox": [
      3.0,
      15.0,
      94.0,
      86.0
    ],
    "svg": "packs/welcome-home/wood-desk.svg",
    "png": "packs/welcome-home/wood-desk.png"
  },
  {
    "slug": "big-wardrobe",
    "room": "bedroom",
    "name": "Big Wardrobe",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 154.0,
    "designW": 220,
    "widthUnits": 154.0,
    "heightUnits": 220.0,
    "viewBox": [
      15.0,
      1.0,
      70.0,
      100.0
    ],
    "svg": "packs/welcome-home/big-wardrobe.svg",
    "png": "packs/welcome-home/big-wardrobe.png"
  },
  {
    "slug": "glass-cabinet",
    "room": "living",
    "name": "Glass Cabinet",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 118.8,
    "designW": 180,
    "widthUnits": 118.8,
    "heightUnits": 180.0,
    "viewBox": [
      17.0,
      1.0,
      66.0,
      100.0
    ],
    "svg": "packs/welcome-home/glass-cabinet.svg",
    "png": "packs/welcome-home/glass-cabinet.png"
  },
  {
    "slug": "ladder-shelf",
    "room": "any",
    "name": "Ladder Shelf",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 87.0,
    "designW": 150,
    "widthUnits": 87.0,
    "heightUnits": 151.5,
    "viewBox": [
      21.0,
      0.0,
      58.0,
      101.0
    ],
    "svg": "packs/welcome-home/ladder-shelf.svg",
    "png": "packs/welcome-home/ladder-shelf.png"
  },
  {
    "slug": "moving-box",
    "room": "living",
    "name": "Moving Box",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "gameW": 88.2,
    "designW": 90,
    "widthUnits": 88.2,
    "heightUnits": 73.8,
    "viewBox": [
      1.0,
      19.0,
      98.0,
      82.0
    ],
    "svg": "packs/welcome-home/moving-box.svg",
    "png": "packs/welcome-home/moving-box.png",
    "holdable": true
  },
  {
    "slug": "box-stack",
    "room": "living",
    "name": "Box Stack",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "gameW": 128.8,
    "designW": 140,
    "widthUnits": 128.8,
    "heightUnits": 114.8,
    "viewBox": [
      5.0,
      19.0,
      92.0,
      82.0
    ],
    "svg": "packs/welcome-home/box-stack.svg",
    "png": "packs/welcome-home/box-stack.png"
  },
  {
    "slug": "wh-fiddle-leaf-fig",
    "room": "any",
    "name": "Fiddle-Leaf Fig",
    "type": "item",
    "pack": "welcome-home",
    "category": "plants",
    "tag": "plant",
    "size": "large",
    "gameW": 75.0,
    "designW": 150,
    "widthUnits": 75.0,
    "heightUnits": 158.2,
    "viewBox": [
      25.0,
      -4.5,
      50.0,
      105.5
    ],
    "svg": "packs/welcome-home/wh-fiddle-leaf-fig.svg",
    "png": "packs/welcome-home/wh-fiddle-leaf-fig.png"
  },
  {
    "slug": "apple-tree",
    "room": "backyard",
    "name": "Apple Tree",
    "type": "item",
    "pack": "welcome-home",
    "category": "plants",
    "tag": "plant",
    "size": "large",
    "gameW": 187.2,
    "designW": 240,
    "widthUnits": 187.2,
    "heightUnits": 235.2,
    "viewBox": [
      11.0,
      3.0,
      78.0,
      98.0
    ],
    "svg": "packs/welcome-home/apple-tree.svg",
    "png": "packs/welcome-home/apple-tree.png"
  },
  {
    "slug": "mini-greenhouse",
    "room": "backyard",
    "name": "Mini Greenhouse",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 156.0,
    "designW": 200,
    "widthUnits": 156.0,
    "heightUnits": 188.0,
    "viewBox": [
      11.0,
      7.0,
      78.0,
      94.0
    ],
    "svg": "packs/welcome-home/mini-greenhouse.svg",
    "png": "packs/welcome-home/mini-greenhouse.png"
  },
  {
    "slug": "brick-fireplace",
    "room": "living",
    "name": "Cozy Fireplace",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 156.8,
    "designW": 160,
    "widthUnits": 156.8,
    "heightUnits": 150.4,
    "viewBox": [
      1.0,
      7.0,
      98.0,
      94.0
    ],
    "svg": "packs/welcome-home/brick-fireplace.svg",
    "png": "packs/welcome-home/brick-fireplace.png"
  },
  {
    "slug": "wh-string-lights",
    "room": "any",
    "name": "Cozy Lights",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "lighting",
    "size": "medium",
    "gameW": 222.2,
    "designW": 220,
    "widthUnits": 222.2,
    "heightUnits": 58.3,
    "viewBox": [
      -0.5,
      7.5,
      101.0,
      26.5
    ],
    "svg": "packs/welcome-home/wh-string-lights.svg",
    "png": "packs/welcome-home/wh-string-lights.png",
    "holdable": true
  },
  {
    "slug": "wh-pendant-lamp",
    "room": "any",
    "name": "Pendant Lamp",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "gameW": 54.0,
    "designW": 100,
    "widthUnits": 54.0,
    "heightUnits": 107.5,
    "viewBox": [
      23.0,
      -0.5,
      54.0,
      107.5
    ],
    "svg": "packs/welcome-home/wh-pendant-lamp.svg",
    "png": "packs/welcome-home/wh-pendant-lamp.png"
  },
  {
    "slug": "wh-arc-floor-lamp",
    "room": "any",
    "name": "Arc Floor Lamp",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "lighting",
    "size": "large",
    "gameW": 105.0,
    "designW": 150,
    "widthUnits": 105.0,
    "heightUnits": 141.8,
    "viewBox": [
      29.0,
      6.5,
      70.0,
      94.5
    ],
    "svg": "packs/welcome-home/wh-arc-floor-lamp.svg",
    "png": "packs/welcome-home/wh-arc-floor-lamp.png"
  },
  {
    "slug": "cream-sofa",
    "room": "living",
    "name": "Cream Sofa",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 234.6,
    "designW": 230,
    "widthUnits": 234.6,
    "heightUnits": 188.6,
    "viewBox": [
      -1.0,
      19.0,
      102.0,
      82.0
    ],
    "svg": "packs/welcome-home/cream-sofa.svg",
    "png": "packs/welcome-home/cream-sofa.png"
  },
  {
    "slug": "wooden-bed",
    "room": "bedroom",
    "name": "Wooden Bed",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 235.2,
    "designW": 240,
    "widthUnits": 235.2,
    "heightUnits": 192.0,
    "viewBox": [
      1.0,
      21.0,
      98.0,
      80.0
    ],
    "svg": "packs/welcome-home/wooden-bed.svg",
    "png": "packs/welcome-home/wooden-bed.png"
  },
  {
    "slug": "bulletin-board",
    "room": "any",
    "name": "Bulletin Board",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "gameW": 131.6,
    "designW": 140,
    "widthUnits": 131.6,
    "heightUnits": 92.4,
    "viewBox": [
      3.0,
      7.0,
      94.0,
      66.0
    ],
    "svg": "packs/welcome-home/bulletin-board.svg",
    "png": "packs/welcome-home/bulletin-board.png",
    "holdable": true
  },
  {
    "slug": "landscape-art",
    "room": "any",
    "name": "Landscape Art",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "gameW": 103.2,
    "designW": 120,
    "widthUnits": 103.2,
    "heightUnits": 84.0,
    "viewBox": [
      7.0,
      7.0,
      86.0,
      70.0
    ],
    "svg": "packs/welcome-home/landscape-art.svg",
    "png": "packs/welcome-home/landscape-art.png",
    "holdable": true
  },
  {
    "slug": "sale-sign",
    "room": "backyard",
    "name": "Yard Sign",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "gameW": 63.8,
    "designW": 110,
    "widthUnits": 63.8,
    "heightUnits": 103.4,
    "viewBox": [
      25.0,
      7.0,
      58.0,
      94.0
    ],
    "svg": "packs/welcome-home/sale-sign.svg",
    "png": "packs/welcome-home/sale-sign.png"
  },
  {
    "slug": "fire-pit",
    "room": "backyard",
    "name": "Fire Pit",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "gameW": 126.0,
    "designW": 140,
    "widthUnits": 126.0,
    "heightUnits": 106.4,
    "viewBox": [
      5.0,
      25.0,
      90.0,
      76.0
    ],
    "svg": "packs/welcome-home/fire-pit.svg",
    "png": "packs/welcome-home/fire-pit.png"
  },
  {
    "slug": "hanging-lantern",
    "room": "any",
    "name": "Hanging Lantern",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "gameW": 39.6,
    "designW": 60,
    "widthUnits": 39.6,
    "heightUnits": 54.9,
    "viewBox": [
      17.0,
      -0.5,
      66.0,
      91.5
    ],
    "svg": "packs/welcome-home/hanging-lantern.svg",
    "png": "packs/welcome-home/hanging-lantern.png"
  },
  {
    "slug": "round-rug",
    "room": "any",
    "name": "Round Woven Rug",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "gameW": 244.8,
    "designW": 240,
    "widthUnits": 244.8,
    "heightUnits": 86.4,
    "viewBox": [
      -1.0,
      62.0,
      102.0,
      36.0
    ],
    "svg": "packs/welcome-home/round-rug.svg",
    "png": "packs/welcome-home/round-rug.png"
  },
  {
    "slug": "stripe-runner",
    "room": "any",
    "name": "Striped Runner",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "gameW": 235.2,
    "designW": 240,
    "widthUnits": 235.2,
    "heightUnits": 64.8,
    "viewBox": [
      1.0,
      69.0,
      98.0,
      27.0
    ],
    "svg": "packs/welcome-home/stripe-runner.svg",
    "png": "packs/welcome-home/stripe-runner.png"
  },
  {
    "slug": "wood-armchair",
    "room": "living",
    "name": "Wood Armchair",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 127.4,
    "designW": 130,
    "widthUnits": 127.4,
    "heightUnits": 117.0,
    "viewBox": [
      1.0,
      11.0,
      98.0,
      90.0
    ],
    "svg": "packs/welcome-home/wood-armchair.svg",
    "png": "packs/welcome-home/wood-armchair.png"
  },
  {
    "slug": "wh-nightstand",
    "room": "bedroom",
    "name": "Cozy Nightstand",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "gameW": 74.0,
    "designW": 100,
    "widthUnits": 74.0,
    "heightUnits": 90.0,
    "viewBox": [
      13.0,
      11.0,
      74.0,
      90.0
    ],
    "svg": "packs/welcome-home/wh-nightstand.svg",
    "png": "packs/welcome-home/wh-nightstand.png"
  },
  {
    "slug": "wh-kitchen-counter",
    "room": "kitchen",
    "name": "Kitchen Counter",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "appliance",
    "size": "large",
    "gameW": 166.6,
    "designW": 170,
    "widthUnits": 166.6,
    "heightUnits": 155.5,
    "viewBox": [
      1.0,
      9.5,
      98.0,
      91.5
    ],
    "svg": "packs/welcome-home/wh-kitchen-counter.svg",
    "png": "packs/welcome-home/wh-kitchen-counter.png"
  },
  {
    "slug": "wood-stool",
    "room": "living",
    "name": "Wood Stool",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "small",
    "gameW": 46.2,
    "designW": 70,
    "widthUnits": 46.2,
    "heightUnits": 47.6,
    "viewBox": [
      17.0,
      33.0,
      66.0,
      68.0
    ],
    "svg": "packs/welcome-home/wood-stool.svg",
    "png": "packs/welcome-home/wood-stool.png"
  },
  {
    "slug": "wh-dresser",
    "room": "bedroom",
    "name": "Wood Dresser",
    "type": "item",
    "pack": "welcome-home",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 146.2,
    "designW": 170,
    "widthUnits": 146.2,
    "heightUnits": 158.1,
    "viewBox": [
      7.0,
      8.0,
      86.0,
      93.0
    ],
    "svg": "packs/welcome-home/wh-dresser.svg",
    "png": "packs/welcome-home/wh-dresser.png"
  },
  {
    "slug": "wh-snake-plant",
    "room": "any",
    "name": "Cozy Snake Plant",
    "type": "item",
    "pack": "welcome-home",
    "category": "plants",
    "tag": "plant",
    "size": "medium",
    "gameW": 50.0,
    "designW": 90,
    "widthUnits": 50.0,
    "heightUnits": 87.8,
    "viewBox": [
      20.5,
      3.5,
      55.5,
      97.5
    ],
    "svg": "packs/welcome-home/wh-snake-plant.svg",
    "png": "packs/welcome-home/wh-snake-plant.png"
  },
  {
    "slug": "sprout-pot",
    "room": "any",
    "name": "Little Sprout",
    "type": "item",
    "pack": "welcome-home",
    "category": "plants",
    "tag": "plant",
    "size": "small",
    "gameW": 27.6,
    "designW": 60,
    "widthUnits": 27.6,
    "heightUnits": 44.7,
    "viewBox": [
      27.0,
      26.5,
      46.0,
      74.5
    ],
    "svg": "packs/welcome-home/sprout-pot.svg",
    "png": "packs/welcome-home/sprout-pot.png",
    "holdable": true
  },
  {
    "slug": "trailing-plant",
    "room": "any",
    "name": "Trailing Plant Shelf",
    "type": "item",
    "pack": "welcome-home",
    "category": "plants",
    "tag": "plant",
    "size": "medium",
    "gameW": 94.6,
    "designW": 110,
    "widthUnits": 94.6,
    "heightUnits": 97.4,
    "viewBox": [
      7.0,
      9.0,
      86.0,
      88.5
    ],
    "svg": "packs/welcome-home/trailing-plant.svg",
    "png": "packs/welcome-home/trailing-plant.png",
    "holdable": true
  },
  {
    "slug": "acorn-friend",
    "room": "living",
    "name": "Acorn Friend",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "gameW": 26.4,
    "designW": 40,
    "widthUnits": 26.4,
    "heightUnits": 36.0,
    "viewBox": [
      17.0,
      11.0,
      66.0,
      90.0
    ],
    "svg": "packs/welcome-home/acorn-friend.svg",
    "png": "packs/welcome-home/acorn-friend.png",
    "holdable": true
  },
  {
    "slug": "wh-teapot",
    "room": "kitchen",
    "name": "Cozy Teapot",
    "type": "item",
    "pack": "welcome-home",
    "category": "food",
    "tag": "food",
    "size": "small",
    "gameW": 60.2,
    "designW": 70,
    "widthUnits": 60.2,
    "heightUnits": 54.6,
    "viewBox": [
      7.5,
      23.0,
      86.0,
      78.0
    ],
    "svg": "packs/welcome-home/wh-teapot.svg",
    "png": "packs/welcome-home/wh-teapot.png",
    "holdable": true
  },
  {
    "slug": "cozy-mug",
    "room": "kitchen",
    "name": "Cozy Mug",
    "type": "item",
    "pack": "welcome-home",
    "category": "food",
    "tag": "food",
    "size": "small",
    "gameW": 28.4,
    "designW": 40,
    "widthUnits": 28.4,
    "heightUnits": 36.6,
    "viewBox": [
      19.0,
      9.5,
      71.0,
      91.5
    ],
    "svg": "packs/welcome-home/cozy-mug.svg",
    "png": "packs/welcome-home/cozy-mug.png",
    "holdable": true
  },
  {
    "slug": "wh-book-stack",
    "room": "any",
    "name": "Book Stack",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "gameW": 49.2,
    "designW": 60,
    "widthUnits": 49.2,
    "heightUnits": 44.4,
    "viewBox": [
      9.0,
      27.0,
      82.0,
      74.0
    ],
    "svg": "packs/welcome-home/wh-book-stack.svg",
    "png": "packs/welcome-home/wh-book-stack.png",
    "holdable": true
  },
  {
    "slug": "knit-cushion",
    "room": "any",
    "name": "Knit Cushion",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "gameW": 46.8,
    "designW": 60,
    "widthUnits": 46.8,
    "heightUnits": 44.4,
    "viewBox": [
      11.0,
      27.0,
      78.0,
      74.0
    ],
    "svg": "packs/welcome-home/knit-cushion.svg",
    "png": "packs/welcome-home/knit-cushion.png",
    "holdable": true
  },
  {
    "slug": "picnic-basket",
    "room": "backyard",
    "name": "Picnic Basket",
    "type": "item",
    "pack": "welcome-home",
    "category": "food",
    "tag": "food",
    "size": "small",
    "gameW": 60.2,
    "designW": 70,
    "widthUnits": 60.2,
    "heightUnits": 59.1,
    "viewBox": [
      7.0,
      16.5,
      86.0,
      84.5
    ],
    "svg": "packs/welcome-home/picnic-basket.svg",
    "png": "packs/welcome-home/picnic-basket.png",
    "holdable": true
  },
  {
    "slug": "leaf-wreath",
    "room": "any",
    "name": "Autumn Wreath",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "gameW": 96.0,
    "designW": 80,
    "widthUnits": 96.0,
    "heightUnits": 96.0,
    "viewBox": [
      -10.0,
      -10.0,
      120.0,
      120.0
    ],
    "svg": "packs/welcome-home/leaf-wreath.svg",
    "png": "packs/welcome-home/leaf-wreath.png"
  },
  {
    "slug": "wall-clock",
    "room": "any",
    "name": "Wood Wall Clock",
    "type": "item",
    "pack": "welcome-home",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "gameW": 60.2,
    "designW": 70,
    "widthUnits": 60.2,
    "heightUnits": 60.2,
    "viewBox": [
      7.0,
      7.0,
      86.0,
      86.0
    ],
    "svg": "packs/welcome-home/wall-clock.svg",
    "png": "packs/welcome-home/wall-clock.png",
    "holdable": true
  },
  {
    "slug": "ring-light",
    "room": "any",
    "name": "Ring Light",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "lighting",
    "size": "large",
    "gameW": 105.4,
    "designW": 170,
    "widthUnits": 105.4,
    "heightUnits": 173.4,
    "viewBox": [
      19.0,
      -1.0,
      62.0,
      102.0
    ],
    "svg": "packs/sunny-vibes/ring-light.svg",
    "png": "packs/sunny-vibes/ring-light.png"
  },
  {
    "slug": "phone-stand",
    "room": "bedroom",
    "name": "Phone on a Stand",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "gameW": 27.0,
    "designW": 50,
    "widthUnits": 27.0,
    "heightUnits": 45.0,
    "viewBox": [
      23.0,
      11.0,
      54.0,
      90.0
    ],
    "svg": "packs/sunny-vibes/phone-stand.svg",
    "png": "packs/sunny-vibes/phone-stand.png",
    "holdable": true
  },
  {
    "slug": "gaming-chair",
    "room": "bedroom",
    "name": "Gaming Chair",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 101.4,
    "designW": 130,
    "widthUnits": 101.4,
    "heightUnits": 130.0,
    "viewBox": [
      11.0,
      1.0,
      78.0,
      100.0
    ],
    "svg": "packs/sunny-vibes/gaming-chair.svg",
    "png": "packs/sunny-vibes/gaming-chair.png"
  },
  {
    "slug": "curvy-desk",
    "room": "bedroom",
    "name": "Curvy Yellow Desk",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 180.0,
    "designW": 200,
    "widthUnits": 180.0,
    "heightUnits": 168.0,
    "viewBox": [
      5.0,
      17.0,
      90.0,
      84.0
    ],
    "svg": "packs/sunny-vibes/curvy-desk.svg",
    "png": "packs/sunny-vibes/curvy-desk.png"
  },
  {
    "slug": "cloud-sofa",
    "room": "living",
    "name": "Puffy Cloud Sofa",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 212.0,
    "designW": 200,
    "widthUnits": 212.0,
    "heightUnits": 168.0,
    "viewBox": [
      -3.5,
      17.0,
      106.0,
      84.0
    ],
    "svg": "packs/sunny-vibes/cloud-sofa.svg",
    "png": "packs/sunny-vibes/cloud-sofa.png"
  },
  {
    "slug": "arched-mirror",
    "room": "salon",
    "name": "Arched Mirror",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 112.0,
    "designW": 160,
    "widthUnits": 112.0,
    "heightUnits": 160.0,
    "viewBox": [
      15.0,
      1.0,
      70.0,
      100.0
    ],
    "svg": "packs/sunny-vibes/arched-mirror.svg",
    "png": "packs/sunny-vibes/arched-mirror.png"
  },
  {
    "slug": "clothes-rail",
    "room": "bedroom",
    "name": "Clothes Rail",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 135.0,
    "designW": 150,
    "widthUnits": 135.0,
    "heightUnits": 138.0,
    "viewBox": [
      5.0,
      9.0,
      90.0,
      92.0
    ],
    "svg": "packs/sunny-vibes/clothes-rail.svg",
    "png": "packs/sunny-vibes/clothes-rail.png"
  },
  {
    "slug": "cube-shelf",
    "room": "any",
    "name": "Cube Shelf",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 106.6,
    "designW": 130,
    "widthUnits": 106.6,
    "heightUnits": 122.2,
    "viewBox": [
      9.0,
      7.0,
      82.0,
      94.0
    ],
    "svg": "packs/sunny-vibes/cube-shelf.svg",
    "png": "packs/sunny-vibes/cube-shelf.png"
  },
  {
    "slug": "big-monitor",
    "room": "bedroom",
    "name": "Big Monitor",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "appliance",
    "size": "medium",
    "gameW": 103.4,
    "designW": 110,
    "widthUnits": 103.4,
    "heightUnits": 107.8,
    "viewBox": [
      3.0,
      3.0,
      94.0,
      98.0
    ],
    "svg": "packs/sunny-vibes/big-monitor.svg",
    "png": "packs/sunny-vibes/big-monitor.png"
  },
  {
    "slug": "keyboard",
    "room": "bedroom",
    "name": "Cute Keyboard",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "appliance",
    "size": "small",
    "gameW": 65.8,
    "designW": 70,
    "widthUnits": 65.8,
    "heightUnits": 32.2,
    "viewBox": [
      3.0,
      55.0,
      94.0,
      46.0
    ],
    "svg": "packs/sunny-vibes/keyboard.svg",
    "png": "packs/sunny-vibes/keyboard.png",
    "holdable": true
  },
  {
    "slug": "vlog-camera",
    "room": "bedroom",
    "name": "Vlog Camera",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "gameW": 51.6,
    "designW": 60,
    "widthUnits": 51.6,
    "heightUnits": 46.8,
    "viewBox": [
      9.0,
      23.0,
      86.0,
      78.0
    ],
    "svg": "packs/sunny-vibes/vlog-camera.svg",
    "png": "packs/sunny-vibes/vlog-camera.png",
    "holdable": true
  },
  {
    "slug": "desk-mic",
    "room": "bedroom",
    "name": "Desk Mic",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "gameW": 27.0,
    "designW": 50,
    "widthUnits": 27.0,
    "heightUnits": 47.0,
    "viewBox": [
      23.0,
      7.0,
      54.0,
      94.0
    ],
    "svg": "packs/sunny-vibes/desk-mic.svg",
    "png": "packs/sunny-vibes/desk-mic.png",
    "holdable": true
  },
  {
    "slug": "star-lamp",
    "room": "any",
    "name": "Star Lamp",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "lighting",
    "size": "medium",
    "gameW": 82.0,
    "designW": 100,
    "widthUnits": 82.0,
    "heightUnits": 102.0,
    "viewBox": [
      9.0,
      -1.0,
      82.0,
      102.0
    ],
    "svg": "packs/sunny-vibes/star-lamp.svg",
    "png": "packs/sunny-vibes/star-lamp.png"
  },
  {
    "slug": "flower-lamp",
    "room": "any",
    "name": "Flower Lamp",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "gameW": 48.0,
    "designW": 80,
    "widthUnits": 48.0,
    "heightUnits": 77.6,
    "viewBox": [
      20.0,
      4.0,
      60.0,
      97.0
    ],
    "svg": "packs/sunny-vibes/flower-lamp.svg",
    "png": "packs/sunny-vibes/flower-lamp.png"
  },
  {
    "slug": "boba-cup",
    "room": "kitchen",
    "name": "Boba Buddy",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "food",
    "tag": "food",
    "size": "small",
    "gameW": 26.4,
    "designW": 40,
    "widthUnits": 26.4,
    "heightUnits": 41.4,
    "viewBox": [
      17.0,
      -2.5,
      66.0,
      103.5
    ],
    "svg": "packs/sunny-vibes/boba-cup.svg",
    "png": "packs/sunny-vibes/boba-cup.png",
    "holdable": true
  },
  {
    "slug": "mini-fridge",
    "room": "kitchen",
    "name": "Mini Fridge",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "appliance",
    "size": "medium",
    "gameW": 77.0,
    "designW": 110,
    "widthUnits": 77.0,
    "heightUnits": 88.0,
    "viewBox": [
      15.0,
      21.0,
      70.0,
      80.0
    ],
    "svg": "packs/sunny-vibes/mini-fridge.svg",
    "png": "packs/sunny-vibes/mini-fridge.png"
  },
  {
    "slug": "bubble-bath",
    "room": "bedroom",
    "name": "Bubble Bath",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 166.6,
    "designW": 170,
    "widthUnits": 166.6,
    "heightUnits": 156.4,
    "viewBox": [
      1.0,
      9.0,
      98.0,
      92.0
    ],
    "svg": "packs/sunny-vibes/bubble-bath.svg",
    "png": "packs/sunny-vibes/bubble-bath.png"
  },
  {
    "slug": "checker-rug",
    "room": "any",
    "name": "Checker Rug",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "gameW": 244.8,
    "designW": 240,
    "widthUnits": 244.8,
    "heightUnits": 86.4,
    "viewBox": [
      -1.0,
      62.0,
      102.0,
      36.0
    ],
    "svg": "packs/sunny-vibes/checker-rug.svg",
    "png": "packs/sunny-vibes/checker-rug.png"
  },
  {
    "slug": "sv-cloud-rug",
    "room": "any",
    "name": "Sunny Cloud Rug",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "gameW": 224.4,
    "designW": 220,
    "widthUnits": 224.4,
    "heightUnits": 83.6,
    "viewBox": [
      -1.0,
      61.0,
      102.0,
      38.0
    ],
    "svg": "packs/sunny-vibes/sv-cloud-rug.svg",
    "png": "packs/sunny-vibes/sv-cloud-rug.png"
  },
  {
    "slug": "caterpillar-plush",
    "room": "bedroom",
    "name": "Caterpillar Plush",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "gameW": 94.0,
    "designW": 100,
    "widthUnits": 94.0,
    "heightUnits": 74.0,
    "viewBox": [
      0.0,
      27.0,
      94.0,
      74.0
    ],
    "svg": "packs/sunny-vibes/caterpillar-plush.svg",
    "png": "packs/sunny-vibes/caterpillar-plush.png",
    "holdable": true
  },
  {
    "slug": "frog-plush",
    "room": "bedroom",
    "name": "Frog Plush",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "gameW": 44.4,
    "designW": 60,
    "widthUnits": 44.4,
    "heightUnits": 45.0,
    "viewBox": [
      13.0,
      26.0,
      74.0,
      75.0
    ],
    "svg": "packs/sunny-vibes/frog-plush.svg",
    "png": "packs/sunny-vibes/frog-plush.png",
    "holdable": true
  },
  {
    "slug": "hamster-pet",
    "room": "bedroom",
    "name": "Hamster Pal",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "pets",
    "tag": "pet",
    "size": "small",
    "gameW": 39.0,
    "designW": 50,
    "widthUnits": 39.0,
    "heightUnits": 41.0,
    "viewBox": [
      11.0,
      19.0,
      78.0,
      82.0
    ],
    "svg": "packs/sunny-vibes/hamster-pet.svg",
    "png": "packs/sunny-vibes/hamster-pet.png",
    "holdable": true
  },
  {
    "slug": "sunny-art",
    "room": "any",
    "name": "Sunny Art",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "gameW": 77.4,
    "designW": 90,
    "widthUnits": 77.4,
    "heightUnits": 84.6,
    "viewBox": [
      7.0,
      3.0,
      86.0,
      94.0
    ],
    "svg": "packs/sunny-vibes/sunny-art.svg",
    "png": "packs/sunny-vibes/sunny-art.png",
    "holdable": true
  },
  {
    "slug": "pothos-plant",
    "room": "any",
    "name": "Pothos Plant",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "plants",
    "tag": "plant",
    "size": "medium",
    "gameW": 48.6,
    "designW": 90,
    "widthUnits": 48.6,
    "heightUnits": 62.6,
    "viewBox": [
      23.0,
      31.5,
      54.0,
      69.5
    ],
    "svg": "packs/sunny-vibes/pothos-plant.svg",
    "png": "packs/sunny-vibes/pothos-plant.png"
  },
  {
    "slug": "cactus-buddy",
    "room": "any",
    "name": "Cactus Buddy",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "plants",
    "tag": "plant",
    "size": "small",
    "gameW": 33.0,
    "designW": 50,
    "widthUnits": 33.0,
    "heightUnits": 46.5,
    "viewBox": [
      17.0,
      8.0,
      66.0,
      93.0
    ],
    "svg": "packs/sunny-vibes/cactus-buddy.svg",
    "png": "packs/sunny-vibes/cactus-buddy.png",
    "holdable": true
  },
  {
    "slug": "checker-bed",
    "room": "bedroom",
    "name": "Checkered Bed",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 196.0,
    "designW": 200,
    "widthUnits": 196.0,
    "heightUnits": 144.0,
    "viewBox": [
      1.0,
      29.0,
      98.0,
      72.0
    ],
    "svg": "packs/sunny-vibes/checker-bed.svg",
    "png": "packs/sunny-vibes/checker-bed.png"
  },
  {
    "slug": "puffy-stool",
    "room": "living",
    "name": "Puffy Stool",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "furniture",
    "size": "small",
    "gameW": 46.9,
    "designW": 70,
    "widthUnits": 46.9,
    "heightUnits": 52.8,
    "viewBox": [
      16.0,
      25.5,
      67.0,
      75.5
    ],
    "svg": "packs/sunny-vibes/puffy-stool.svg",
    "png": "packs/sunny-vibes/puffy-stool.png"
  },
  {
    "slug": "sv-wall-shelf",
    "room": "any",
    "name": "Sunny Shelf",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "gameW": 122.2,
    "designW": 130,
    "widthUnits": 122.2,
    "heightUnits": 56.6,
    "viewBox": [
      3.0,
      33.0,
      94.0,
      43.5
    ],
    "svg": "packs/sunny-vibes/sv-wall-shelf.svg",
    "png": "packs/sunny-vibes/sv-wall-shelf.png"
  },
  {
    "slug": "headphones",
    "room": "bedroom",
    "name": "Headphones",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "gameW": 43.0,
    "designW": 50,
    "widthUnits": 43.0,
    "heightUnits": 36.8,
    "viewBox": [
      7.0,
      11.5,
      86.0,
      73.5
    ],
    "svg": "packs/sunny-vibes/headphones.svg",
    "png": "packs/sunny-vibes/headphones.png",
    "holdable": true
  },
  {
    "slug": "game-controller",
    "room": "bedroom",
    "name": "Game Controller",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "gameW": 45.5,
    "designW": 50,
    "widthUnits": 45.5,
    "heightUnits": 36.0,
    "viewBox": [
      4.5,
      29.0,
      91.0,
      72.0
    ],
    "svg": "packs/sunny-vibes/game-controller.svg",
    "png": "packs/sunny-vibes/game-controller.png",
    "holdable": true
  },
  {
    "slug": "heart-light",
    "room": "any",
    "name": "Heart Wall Light",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "gameW": 60.2,
    "designW": 70,
    "widthUnits": 60.2,
    "heightUnits": 60.2,
    "viewBox": [
      7.0,
      7.0,
      86.0,
      86.0
    ],
    "svg": "packs/sunny-vibes/heart-light.svg",
    "png": "packs/sunny-vibes/heart-light.png"
  },
  {
    "slug": "sv-bean-bag",
    "room": "living",
    "name": "Sunny Bean Bag",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "gameW": 114.4,
    "designW": 130,
    "widthUnits": 114.4,
    "heightUnits": 98.2,
    "viewBox": [
      5.5,
      25.5,
      88.0,
      75.5
    ],
    "svg": "packs/sunny-vibes/sv-bean-bag.svg",
    "png": "packs/sunny-vibes/sv-bean-bag.png"
  },
  {
    "slug": "cute-speaker",
    "room": "living",
    "name": "Cute Speaker",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "appliance",
    "size": "small",
    "gameW": 29.0,
    "designW": 50,
    "widthUnits": 29.0,
    "heightUnits": 45.0,
    "viewBox": [
      21.0,
      11.0,
      58.0,
      90.0
    ],
    "svg": "packs/sunny-vibes/cute-speaker.svg",
    "png": "packs/sunny-vibes/cute-speaker.png",
    "holdable": true
  },
  {
    "slug": "wavy-floor-lamp",
    "room": "any",
    "name": "Wavy Floor Lamp",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "lighting",
    "size": "large",
    "gameW": 45.0,
    "designW": 90,
    "widthUnits": 45.0,
    "heightUnits": 86.4,
    "viewBox": [
      25.0,
      5.0,
      50.0,
      96.0
    ],
    "svg": "packs/sunny-vibes/wavy-floor-lamp.svg",
    "png": "packs/sunny-vibes/wavy-floor-lamp.png"
  },
  {
    "slug": "pastel-wardrobe",
    "room": "bedroom",
    "name": "Pastel Wardrobe",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 132.0,
    "designW": 200,
    "widthUnits": 132.0,
    "heightUnits": 200.0,
    "viewBox": [
      17.0,
      1.0,
      66.0,
      100.0
    ],
    "svg": "packs/sunny-vibes/pastel-wardrobe.svg",
    "png": "packs/sunny-vibes/pastel-wardrobe.png"
  },
  {
    "slug": "desk-lamp",
    "room": "any",
    "name": "Desk Lamp",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "gameW": 43.2,
    "designW": 60,
    "widthUnits": 43.2,
    "heightUnits": 51.6,
    "viewBox": [
      15.0,
      15.0,
      72.0,
      86.0
    ],
    "svg": "packs/sunny-vibes/desk-lamp.svg",
    "png": "packs/sunny-vibes/desk-lamp.png",
    "holdable": true
  },
  {
    "slug": "side-table-round",
    "room": "living",
    "name": "Round Side Table",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "furniture",
    "tag": "furniture",
    "size": "small",
    "gameW": 68.8,
    "designW": 80,
    "widthUnits": 68.8,
    "heightUnits": 64.0,
    "viewBox": [
      7.0,
      21.0,
      86.0,
      80.0
    ],
    "svg": "packs/sunny-vibes/side-table-round.svg",
    "png": "packs/sunny-vibes/side-table-round.png"
  },
  {
    "slug": "sticker-board",
    "room": "any",
    "name": "Sticker Board",
    "type": "item",
    "pack": "sunny-vibes",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "gameW": 103.4,
    "designW": 110,
    "widthUnits": 103.4,
    "heightUnits": 77.0,
    "viewBox": [
      3.0,
      7.0,
      94.0,
      70.0
    ],
    "svg": "packs/sunny-vibes/sticker-board.svg",
    "png": "packs/sunny-vibes/sticker-board.png",
    "holdable": true
  },
  {
    "slug": "salon-chair",
    "name": "Salon Chair",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 111.8,
    "designW": 130,
    "widthUnits": 111.8,
    "heightUnits": 127.4,
    "viewBox": [
      7.0,
      3.0,
      86.0,
      98.0
    ],
    "svg": "packs/glossy/salon-chair.svg",
    "png": "packs/glossy/salon-chair.png"
  },
  {
    "slug": "wash-chair",
    "name": "Hair-Wash Chair",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 186.2,
    "designW": 190,
    "widthUnits": 186.2,
    "heightUnits": 174.8,
    "viewBox": [
      1.0,
      9.0,
      98.0,
      92.0
    ],
    "svg": "packs/glossy/wash-chair.svg",
    "png": "packs/glossy/wash-chair.png"
  },
  {
    "slug": "glow-mirror",
    "name": "Glow Mirror",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "lighting",
    "size": "medium",
    "gameW": 103.4,
    "designW": 110,
    "widthUnits": 103.4,
    "heightUnits": 103.4,
    "viewBox": [
      3.0,
      -1.0,
      94.0,
      94.0
    ],
    "svg": "packs/glossy/glow-mirror.svg",
    "png": "packs/glossy/glow-mirror.png"
  },
  {
    "slug": "pink-vanity",
    "name": "Pink Vanity",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 159.8,
    "designW": 170,
    "widthUnits": 159.8,
    "heightUnits": 166.6,
    "viewBox": [
      3.0,
      3.0,
      94.0,
      98.0
    ],
    "svg": "packs/glossy/pink-vanity.svg",
    "png": "packs/glossy/pink-vanity.png"
  },
  {
    "slug": "polish-rack",
    "name": "Nail Polish Rack",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "gameW": 99.0,
    "designW": 110,
    "widthUnits": 99.0,
    "heightUnits": 103.4,
    "viewBox": [
      5.0,
      3.0,
      90.0,
      94.0
    ],
    "svg": "packs/glossy/polish-rack.svg",
    "png": "packs/glossy/polish-rack.png"
  },
  {
    "slug": "polish-bottle",
    "name": "Polish Bottle",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "gameW": 18.6,
    "designW": 30,
    "widthUnits": 18.6,
    "heightUnits": 29.4,
    "viewBox": [
      19.0,
      3.0,
      62.0,
      98.0
    ],
    "svg": "packs/glossy/polish-bottle.svg",
    "png": "packs/glossy/polish-bottle.png",
    "holdable": true
  },
  {
    "slug": "cream-jars",
    "name": "Cream Jars",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "gameW": 47.0,
    "designW": 50,
    "widthUnits": 47.0,
    "heightUnits": 31.0,
    "viewBox": [
      3.0,
      39.0,
      94.0,
      62.0
    ],
    "svg": "packs/glossy/cream-jars.svg",
    "png": "packs/glossy/cream-jars.png",
    "holdable": true
  },
  {
    "slug": "lotion-trio",
    "name": "Lotion Bottles",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "gameW": 49.2,
    "designW": 60,
    "widthUnits": 49.2,
    "heightUnits": 43.2,
    "viewBox": [
      9.0,
      29.0,
      82.0,
      72.0
    ],
    "svg": "packs/glossy/lotion-trio.svg",
    "png": "packs/glossy/lotion-trio.png"
  },
  {
    "slug": "hair-dryer",
    "name": "Glossy Hair Dryer",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "gameW": 42.0,
    "designW": 50,
    "widthUnits": 42.0,
    "heightUnits": 40.0,
    "viewBox": [
      9.0,
      15.0,
      84.0,
      80.0
    ],
    "svg": "packs/glossy/hair-dryer.svg",
    "png": "packs/glossy/hair-dryer.png",
    "holdable": true
  },
  {
    "slug": "towel-cart",
    "name": "Towel Cart",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "gameW": 93.6,
    "designW": 120,
    "widthUnits": 93.6,
    "heightUnits": 112.8,
    "viewBox": [
      11.0,
      7.0,
      78.0,
      94.0
    ],
    "svg": "packs/glossy/towel-cart.svg",
    "png": "packs/glossy/towel-cart.png"
  },
  {
    "slug": "nail-table",
    "name": "Manicure Table",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 169.2,
    "designW": 180,
    "widthUnits": 169.2,
    "heightUnits": 140.4,
    "viewBox": [
      3.0,
      23.0,
      94.0,
      78.0
    ],
    "svg": "packs/glossy/nail-table.svg",
    "png": "packs/glossy/nail-table.png"
  },
  {
    "slug": "arched-shelf",
    "name": "Arched Shelf",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 98.6,
    "designW": 170,
    "widthUnits": 98.6,
    "heightUnits": 170.0,
    "viewBox": [
      21.0,
      1.0,
      58.0,
      100.0
    ],
    "svg": "packs/glossy/arched-shelf.svg",
    "png": "packs/glossy/arched-shelf.png"
  },
  {
    "slug": "pink-fountain",
    "name": "Bubbly Fountain",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "decor",
    "size": "large",
    "gameW": 126.0,
    "designW": 140,
    "widthUnits": 126.0,
    "heightUnits": 131.6,
    "viewBox": [
      5.0,
      7.0,
      90.0,
      94.0
    ],
    "svg": "packs/glossy/pink-fountain.svg",
    "png": "packs/glossy/pink-fountain.png"
  },
  {
    "slug": "fancy-sofa",
    "name": "Fancy Sofa",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 234.6,
    "designW": 230,
    "widthUnits": 234.6,
    "heightUnits": 202.4,
    "viewBox": [
      -1.0,
      13.0,
      102.0,
      88.0
    ],
    "svg": "packs/glossy/fancy-sofa.svg",
    "png": "packs/glossy/fancy-sofa.png"
  },
  {
    "slug": "lilac-curtain",
    "name": "Lilac Curtain",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "decor",
    "size": "large",
    "gameW": 176.4,
    "designW": 180,
    "widthUnits": 176.4,
    "heightUnits": 172.8,
    "viewBox": [
      1.0,
      1.0,
      98.0,
      96.0
    ],
    "svg": "packs/glossy/lilac-curtain.svg",
    "png": "packs/glossy/lilac-curtain.png"
  },
  {
    "slug": "reception-desk",
    "name": "Reception Desk",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 186.2,
    "designW": 190,
    "widthUnits": 186.2,
    "heightUnits": 163.4,
    "viewBox": [
      1.0,
      15.0,
      98.0,
      86.0
    ],
    "svg": "packs/glossy/reception-desk.svg",
    "png": "packs/glossy/reception-desk.png"
  },
  {
    "slug": "bubbly-plant",
    "name": "Bubbly Plant",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "plants",
    "tag": "plant",
    "size": "medium",
    "gameW": 53.1,
    "designW": 90,
    "widthUnits": 53.1,
    "heightUnits": 81.0,
    "viewBox": [
      20.0,
      11.0,
      59.0,
      90.0
    ],
    "svg": "packs/glossy/bubbly-plant.svg",
    "png": "packs/glossy/bubbly-plant.png"
  },
  {
    "slug": "vine-planter",
    "name": "Hanging Vine Planter",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "plants",
    "tag": "plant",
    "size": "medium",
    "gameW": 56.7,
    "designW": 90,
    "widthUnits": 56.7,
    "heightUnits": 99.9,
    "viewBox": [
      18.5,
      -0.5,
      63.0,
      111.0
    ],
    "svg": "packs/glossy/vine-planter.svg",
    "png": "packs/glossy/vine-planter.png"
  },
  {
    "slug": "droplet-buddy",
    "name": "Droplet Buddy",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "gameW": 32.0,
    "designW": 50,
    "widthUnits": 32.0,
    "heightUnits": 49.0,
    "viewBox": [
      18.0,
      3.0,
      64.0,
      98.0
    ],
    "svg": "packs/glossy/droplet-buddy.svg",
    "png": "packs/glossy/droplet-buddy.png",
    "holdable": true
  },
  {
    "slug": "flower-cart",
    "name": "Flower Cart",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 173.4,
    "designW": 170,
    "widthUnits": 173.4,
    "heightUnits": 153.0,
    "viewBox": [
      -1.0,
      11.0,
      102.0,
      90.0
    ],
    "svg": "packs/glossy/flower-cart.svg",
    "png": "packs/glossy/flower-cart.png"
  },
  {
    "slug": "globe-pendants",
    "name": "Globe Pendants",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "lighting",
    "size": "medium",
    "gameW": 92.4,
    "designW": 110,
    "widthUnits": 92.4,
    "heightUnits": 84.2,
    "viewBox": [
      8.0,
      -0.5,
      84.0,
      76.5
    ],
    "svg": "packs/glossy/globe-pendants.svg",
    "png": "packs/glossy/globe-pendants.png"
  },
  {
    "slug": "drop-lamp",
    "name": "Water-Drop Lamp",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "gameW": 32.4,
    "designW": 60,
    "widthUnits": 32.4,
    "heightUnits": 58.5,
    "viewBox": [
      23.0,
      -0.5,
      54.0,
      97.5
    ],
    "svg": "packs/glossy/drop-lamp.svg",
    "png": "packs/glossy/drop-lamp.png"
  },
  {
    "slug": "gold-floor-mirror",
    "name": "Gold Floor Mirror",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 52.2,
    "designW": 90,
    "widthUnits": 52.2,
    "heightUnits": 90.0,
    "viewBox": [
      21.0,
      1.0,
      58.0,
      100.0
    ],
    "svg": "packs/glossy/gold-floor-mirror.svg",
    "png": "packs/glossy/gold-floor-mirror.png"
  },
  {
    "slug": "heart-pouf",
    "name": "Heart Pouf",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "small",
    "gameW": 58.4,
    "designW": 80,
    "widthUnits": 58.4,
    "heightUnits": 62.0,
    "viewBox": [
      13.5,
      23.5,
      73.0,
      77.5
    ],
    "svg": "packs/glossy/heart-pouf.svg",
    "png": "packs/glossy/heart-pouf.png"
  },
  {
    "slug": "swivel-stool",
    "name": "Swivel Stool",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "small",
    "gameW": 46.2,
    "designW": 70,
    "widthUnits": 46.2,
    "heightUnits": 51.8,
    "viewBox": [
      17.0,
      27.0,
      66.0,
      74.0
    ],
    "svg": "packs/glossy/swivel-stool.svg",
    "png": "packs/glossy/swivel-stool.png"
  },
  {
    "slug": "spray-bottle",
    "name": "Spray Bottle",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "gameW": 26.4,
    "designW": 40,
    "widthUnits": 26.4,
    "heightUnits": 37.6,
    "viewBox": [
      19.0,
      7.0,
      66.0,
      94.0
    ],
    "svg": "packs/glossy/spray-bottle.svg",
    "png": "packs/glossy/spray-bottle.png",
    "holdable": true
  },
  {
    "slug": "comb-brush",
    "name": "Brush & Comb",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "toy",
    "size": "small",
    "gameW": 36.2,
    "designW": 50,
    "widthUnits": 36.2,
    "heightUnits": 44.5,
    "viewBox": [
      11.0,
      10.0,
      72.5,
      89.0
    ],
    "svg": "packs/glossy/comb-brush.svg",
    "png": "packs/glossy/comb-brush.png",
    "holdable": true
  },
  {
    "slug": "towel-stack",
    "name": "Towel Stack",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "gameW": 49.2,
    "designW": 60,
    "widthUnits": 49.2,
    "heightUnits": 43.2,
    "viewBox": [
      9.0,
      29.0,
      82.0,
      72.0
    ],
    "svg": "packs/glossy/towel-stack.svg",
    "png": "packs/glossy/towel-stack.png",
    "holdable": true
  },
  {
    "slug": "blob-rug",
    "name": "Bubble-Gum Rug",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "gameW": 224.4,
    "designW": 240,
    "widthUnits": 224.4,
    "heightUnits": 92.4,
    "viewBox": [
      3.0,
      59.5,
      93.5,
      38.5
    ],
    "svg": "packs/glossy/blob-rug.svg",
    "png": "packs/glossy/blob-rug.png"
  },
  {
    "slug": "pebble-rug",
    "name": "Mint Pebble Rug",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "rug",
    "size": "medium",
    "gameW": 156.8,
    "designW": 160,
    "widthUnits": 156.8,
    "heightUnits": 57.6,
    "viewBox": [
      1.0,
      62.0,
      98.0,
      36.0
    ],
    "svg": "packs/glossy/pebble-rug.svg",
    "png": "packs/glossy/pebble-rug.png"
  },
  {
    "slug": "heart-plant",
    "name": "Heart-Leaf Plant",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "plants",
    "tag": "plant",
    "size": "small",
    "gameW": 34.2,
    "designW": 60,
    "widthUnits": 34.2,
    "heightUnits": 54.3,
    "viewBox": [
      21.5,
      10.5,
      57.0,
      90.5
    ],
    "svg": "packs/glossy/heart-plant.svg",
    "png": "packs/glossy/heart-plant.png",
    "holdable": true
  },
  {
    "slug": "bud-vase",
    "name": "Bud Vase",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "gameW": 21.6,
    "designW": 40,
    "widthUnits": 21.6,
    "heightUnits": 39.6,
    "viewBox": [
      23.0,
      2.0,
      54.0,
      99.0
    ],
    "svg": "packs/glossy/bud-vase.svg",
    "png": "packs/glossy/bud-vase.png",
    "holdable": true
  },
  {
    "slug": "perfume-bottle",
    "name": "Perfume Bottle",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "gameW": 27.6,
    "designW": 40,
    "widthUnits": 27.6,
    "heightUnits": 37.2,
    "viewBox": [
      15.5,
      8.0,
      69.0,
      93.0
    ],
    "svg": "packs/glossy/perfume-bottle.svg",
    "png": "packs/glossy/perfume-bottle.png",
    "holdable": true
  },
  {
    "slug": "scent-candle",
    "name": "Candle Jar",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "gameW": 24.8,
    "designW": 40,
    "widthUnits": 24.8,
    "heightUnits": 38.2,
    "viewBox": [
      19.0,
      5.5,
      62.0,
      95.5
    ],
    "svg": "packs/glossy/scent-candle.svg",
    "png": "packs/glossy/scent-candle.png",
    "holdable": true
  },
  {
    "slug": "foot-spa",
    "name": "Foot Spa",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "appliance",
    "size": "medium",
    "gameW": 84.6,
    "designW": 90,
    "widthUnits": 84.6,
    "heightUnits": 62.1,
    "viewBox": [
      3.0,
      32.0,
      94.0,
      69.0
    ],
    "svg": "packs/glossy/foot-spa.svg",
    "png": "packs/glossy/foot-spa.png"
  },
  {
    "slug": "mani-lamp",
    "name": "Nail Dryer",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "appliance",
    "size": "small",
    "gameW": 54.0,
    "designW": 60,
    "widthUnits": 54.0,
    "heightUnits": 44.4,
    "viewBox": [
      5.0,
      27.0,
      90.0,
      74.0
    ],
    "svg": "packs/glossy/mani-lamp.svg",
    "png": "packs/glossy/mani-lamp.png",
    "holdable": true
  },
  {
    "slug": "tiered-tray",
    "name": "Tiered Tray",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "gameW": 46.8,
    "designW": 60,
    "widthUnits": 46.8,
    "heightUnits": 60.0,
    "viewBox": [
      11.0,
      1.0,
      78.0,
      100.0
    ],
    "svg": "packs/glossy/tiered-tray.svg",
    "png": "packs/glossy/tiered-tray.png",
    "holdable": true
  },
  {
    "slug": "star-wall-sign",
    "name": "Sparkle Wall Light",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "gameW": 76.0,
    "designW": 80,
    "widthUnits": 76.0,
    "heightUnits": 76.0,
    "viewBox": [
      2.5,
      2.5,
      95.0,
      95.0
    ],
    "svg": "packs/glossy/star-wall-sign.svg",
    "png": "packs/glossy/star-wall-sign.png"
  },
  {
    "slug": "waiting-bench",
    "name": "Waiting Bench",
    "type": "item",
    "pack": "glossy",
    "room": "salon",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "gameW": 166.6,
    "designW": 170,
    "widthUnits": 166.6,
    "heightUnits": 108.8,
    "viewBox": [
      1.0,
      37.0,
      98.0,
      64.0
    ],
    "svg": "packs/glossy/waiting-bench.svg",
    "png": "packs/glossy/waiting-bench.png"
  },
  {
    "type": "item",
    "slug": "cc-scallop-loveseat",
    "name": "Scalloped Loveseat",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-scallop-loveseat.svg",
    "png": "packs/cottage/cc-scallop-loveseat.png",
    "widthUnits": 96,
    "heightUnits": 82,
    "gameW": 248,
    "viewBox": [
      2,
      18,
      96,
      82
    ],
    "room": "living"
  },
  {
    "type": "item",
    "slug": "cc-heart-pouf",
    "name": "Cottage Heart Pouf",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "cottage",
    "svg": "packs/cottage/cc-heart-pouf.svg",
    "png": "packs/cottage/cc-heart-pouf.png",
    "widthUnits": 80,
    "heightUnits": 72,
    "gameW": 124,
    "viewBox": [
      10,
      28,
      80,
      72
    ],
    "room": "living"
  },
  {
    "type": "item",
    "slug": "cc-flower-lamp",
    "name": "Flower Floor Lamp",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "cottage",
    "svg": "packs/cottage/cc-flower-lamp.svg",
    "png": "packs/cottage/cc-flower-lamp.png",
    "widthUnits": 56,
    "heightUnits": 98,
    "gameW": 86,
    "viewBox": [
      22,
      2,
      56,
      98
    ],
    "room": "living"
  },
  {
    "type": "item",
    "slug": "cc-petal-table",
    "name": "Petal Coffee Table",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-petal-table.svg",
    "png": "packs/cottage/cc-petal-table.png",
    "widthUnits": 96,
    "heightUnits": 72,
    "gameW": 196,
    "viewBox": [
      2,
      28,
      96,
      72
    ],
    "room": "living"
  },
  {
    "type": "item",
    "slug": "cc-heart-rug",
    "name": "Cottage Heart Rug",
    "category": "decor",
    "tag": "decor",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-heart-rug.svg",
    "png": "packs/cottage/cc-heart-rug.png",
    "widthUnits": 100,
    "heightUnits": 68,
    "gameW": 250,
    "viewBox": [
      0,
      30,
      100,
      68
    ],
    "room": "living"
  },
  {
    "type": "item",
    "slug": "cc-record-player",
    "name": "Record Player",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "cottage",
    "svg": "packs/cottage/cc-record-player.svg",
    "png": "packs/cottage/cc-record-player.png",
    "widthUnits": 88,
    "heightUnits": 78,
    "gameW": 148,
    "viewBox": [
      6,
      22,
      88,
      78
    ],
    "room": "living"
  },
  {
    "type": "item",
    "slug": "cc-macrame-swing",
    "name": "Macrame Swing Chair",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-macrame-swing.svg",
    "png": "packs/cottage/cc-macrame-swing.png",
    "widthUnits": 84,
    "heightUnits": 98,
    "gameW": 168,
    "viewBox": [
      8,
      2,
      84,
      98
    ],
    "room": "living"
  },
  {
    "type": "item",
    "slug": "cc-fairy-shelf",
    "name": "Fairy-Light Shelf",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "cottage",
    "svg": "packs/cottage/cc-fairy-shelf.svg",
    "png": "packs/cottage/cc-fairy-shelf.png",
    "widthUnits": 92,
    "heightUnits": 70,
    "gameW": 176,
    "viewBox": [
      4,
      16,
      92,
      70
    ],
    "room": "living",
    "wall": true,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "cc-canopy-daybed",
    "name": "Canopy Daybed",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-canopy-daybed.svg",
    "png": "packs/cottage/cc-canopy-daybed.png",
    "widthUnits": 96,
    "heightUnits": 98,
    "gameW": 276,
    "viewBox": [
      2,
      2,
      96,
      98
    ],
    "room": "bedroom"
  },
  {
    "type": "item",
    "slug": "cc-star-dresser",
    "name": "Star Dresser",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-star-dresser.svg",
    "png": "packs/cottage/cc-star-dresser.png",
    "widthUnits": 76,
    "heightUnits": 92,
    "gameW": 156,
    "viewBox": [
      12,
      8,
      76,
      92
    ],
    "room": "bedroom"
  },
  {
    "type": "item",
    "slug": "cc-heart-bed",
    "name": "Heart Headboard Bed",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-heart-bed.svg",
    "png": "packs/cottage/cc-heart-bed.png",
    "widthUnits": 96,
    "heightUnits": 96,
    "gameW": 236,
    "viewBox": [
      2,
      4,
      96,
      96
    ],
    "room": "bedroom"
  },
  {
    "type": "item",
    "slug": "cc-fairy-garland",
    "name": "Fairy-Light Garland",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "cottage",
    "svg": "packs/cottage/cc-fairy-garland.svg",
    "png": "packs/cottage/cc-fairy-garland.png",
    "widthUnits": 100,
    "heightUnits": 48,
    "gameW": 210,
    "viewBox": [
      0,
      8,
      100,
      48
    ],
    "room": "bedroom",
    "wall": true,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "cc-cloud-beanbag",
    "name": "Cloud Beanbag",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-cloud-beanbag.svg",
    "png": "packs/cottage/cc-cloud-beanbag.png",
    "widthUnits": 92,
    "heightUnits": 74,
    "gameW": 156,
    "viewBox": [
      4,
      26,
      92,
      74
    ],
    "room": "bedroom"
  },
  {
    "type": "item",
    "slug": "cc-jewel-box",
    "name": "Jewelry Box",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "cottage",
    "svg": "packs/cottage/cc-jewel-box.svg",
    "png": "packs/cottage/cc-jewel-box.png",
    "widthUnits": 68,
    "heightUnits": 80,
    "gameW": 72,
    "viewBox": [
      16,
      18,
      68,
      80
    ],
    "room": "bedroom",
    "holdable": true
  },
  {
    "type": "item",
    "slug": "cc-cloud-lamp",
    "name": "Cloud Lamp",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "cottage",
    "svg": "packs/cottage/cc-cloud-lamp.svg",
    "png": "packs/cottage/cc-cloud-lamp.png",
    "widthUnits": 64,
    "heightUnits": 94,
    "gameW": 74,
    "viewBox": [
      18,
      6,
      64,
      94
    ],
    "room": "bedroom",
    "holdable": true
  },
  {
    "type": "item",
    "slug": "cc-window-seat",
    "name": "Window Seat",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-window-seat.svg",
    "png": "packs/cottage/cc-window-seat.png",
    "widthUnits": 92,
    "heightUnits": 94,
    "gameW": 214,
    "viewBox": [
      4,
      6,
      92,
      94
    ],
    "room": "bedroom"
  },
  {
    "type": "item",
    "slug": "cc-pastel-range",
    "name": "Pastel Range",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-pastel-range.svg",
    "png": "packs/cottage/cc-pastel-range.png",
    "widthUnits": 88,
    "heightUnits": 88,
    "gameW": 172,
    "viewBox": [
      6,
      12,
      88,
      88
    ],
    "room": "kitchen"
  },
  {
    "type": "item",
    "slug": "cc-mint-fridge",
    "name": "Mint Fridge",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-mint-fridge.svg",
    "png": "packs/cottage/cc-mint-fridge.png",
    "widthUnits": 68,
    "heightUnits": 96,
    "gameW": 132,
    "viewBox": [
      16,
      4,
      68,
      96
    ],
    "room": "kitchen"
  },
  {
    "type": "item",
    "slug": "cc-cupcake-stand",
    "name": "Cupcake Stand",
    "category": "food",
    "tag": "food",
    "size": "medium",
    "pack": "cottage",
    "svg": "packs/cottage/cc-cupcake-stand.svg",
    "png": "packs/cottage/cc-cupcake-stand.png",
    "widthUnits": 76,
    "heightUnits": 90,
    "gameW": 128,
    "viewBox": [
      12,
      10,
      76,
      90
    ],
    "room": "kitchen",
    "holdable": false
  },
  {
    "type": "item",
    "slug": "cc-teapot-set",
    "name": "Teapot Set",
    "category": "food",
    "tag": "food",
    "size": "medium",
    "pack": "cottage",
    "svg": "packs/cottage/cc-teapot-set.svg",
    "png": "packs/cottage/cc-teapot-set.png",
    "widthUnits": 92,
    "heightUnits": 72,
    "gameW": 150,
    "viewBox": [
      4,
      28,
      92,
      72
    ],
    "room": "kitchen",
    "holdable": false
  },
  {
    "type": "item",
    "slug": "cc-bakery-shelf",
    "name": "Bakery Shelf",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "cottage",
    "svg": "packs/cottage/cc-bakery-shelf.svg",
    "png": "packs/cottage/cc-bakery-shelf.png",
    "widthUnits": 84,
    "heightUnits": 94,
    "gameW": 156,
    "viewBox": [
      8,
      6,
      84,
      94
    ],
    "room": "kitchen"
  },
  {
    "type": "item",
    "slug": "cc-breakfast-table",
    "name": "Round Breakfast Table",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-breakfast-table.svg",
    "png": "packs/cottage/cc-breakfast-table.png",
    "widthUnits": 92,
    "heightUnits": 78,
    "gameW": 186,
    "viewBox": [
      4,
      22,
      92,
      78
    ],
    "room": "kitchen"
  },
  {
    "type": "item",
    "slug": "cc-macaron-jar",
    "name": "Macaron Jar",
    "category": "food",
    "tag": "food",
    "size": "small",
    "pack": "cottage",
    "svg": "packs/cottage/cc-macaron-jar.svg",
    "png": "packs/cottage/cc-macaron-jar.png",
    "widthUnits": 56,
    "heightUnits": 92,
    "gameW": 64,
    "viewBox": [
      22,
      8,
      56,
      92
    ],
    "room": "kitchen",
    "holdable": true
  },
  {
    "type": "item",
    "slug": "cc-flower-kettle",
    "name": "Flower Kettle",
    "category": "food",
    "tag": "food",
    "size": "small",
    "pack": "cottage",
    "svg": "packs/cottage/cc-flower-kettle.svg",
    "png": "packs/cottage/cc-flower-kettle.png",
    "widthUnits": 76,
    "heightUnits": 84,
    "gameW": 78,
    "viewBox": [
      12,
      16,
      76,
      84
    ],
    "room": "kitchen",
    "holdable": true
  },
  {
    "type": "item",
    "slug": "cc-light-vanity",
    "name": "Lighted Vanity",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-light-vanity.svg",
    "png": "packs/cottage/cc-light-vanity.png",
    "widthUnits": 92,
    "heightUnits": 98,
    "gameW": 196,
    "viewBox": [
      4,
      2,
      92,
      98
    ],
    "room": "salon"
  },
  {
    "type": "item",
    "slug": "cc-bubble-chair",
    "name": "Bubble Chair",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "cottage",
    "svg": "packs/cottage/cc-bubble-chair.svg",
    "png": "packs/cottage/cc-bubble-chair.png",
    "widthUnits": 84,
    "heightUnits": 92,
    "gameW": 142,
    "viewBox": [
      8,
      8,
      84,
      92
    ],
    "room": "salon"
  },
  {
    "type": "item",
    "slug": "cc-mani-chair",
    "name": "Mani-Pedi Chair",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-mani-chair.svg",
    "png": "packs/cottage/cc-mani-chair.png",
    "widthUnits": 96,
    "heightUnits": 84,
    "gameW": 188,
    "viewBox": [
      2,
      16,
      96,
      84
    ],
    "room": "salon"
  },
  {
    "type": "item",
    "slug": "cc-ribbon-mirror",
    "name": "Ribbon Mirror",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "cottage",
    "svg": "packs/cottage/cc-ribbon-mirror.svg",
    "png": "packs/cottage/cc-ribbon-mirror.png",
    "widthUnits": 68,
    "heightUnits": 94,
    "gameW": 112,
    "viewBox": [
      16,
      4,
      68,
      94
    ],
    "room": "salon",
    "wall": true,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "cc-perfume-tray",
    "name": "Perfume Tray",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "cottage",
    "svg": "packs/cottage/cc-perfume-tray.svg",
    "png": "packs/cottage/cc-perfume-tray.png",
    "widthUnits": 92,
    "heightUnits": 62,
    "gameW": 108,
    "viewBox": [
      4,
      36,
      92,
      62
    ],
    "room": "salon",
    "holdable": false
  },
  {
    "type": "item",
    "slug": "cc-dryer-chair",
    "name": "Hair-Dryer Chair",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-dryer-chair.svg",
    "png": "packs/cottage/cc-dryer-chair.png",
    "widthUnits": 88,
    "heightUnits": 96,
    "gameW": 164,
    "viewBox": [
      6,
      4,
      88,
      96
    ],
    "room": "salon"
  },
  {
    "type": "item",
    "slug": "cc-heart-clock",
    "room": "any",
    "name": "Heart Wall Clock",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "cottage",
    "svg": "packs/cottage/cc-heart-clock.svg",
    "png": "packs/cottage/cc-heart-clock.png",
    "widthUnits": 72,
    "heightUnits": 82,
    "gameW": 84,
    "viewBox": [
      14,
      10,
      72,
      82
    ],
    "wall": true,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "cc-scallop-curtains",
    "room": "any",
    "name": "Scallop Curtains",
    "category": "decor",
    "tag": "decor",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-scallop-curtains.svg",
    "png": "packs/cottage/cc-scallop-curtains.png",
    "widthUnits": 96,
    "heightUnits": 94,
    "gameW": 196,
    "viewBox": [
      2,
      4,
      96,
      94
    ],
    "wall": true,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "cc-mushroom-stool",
    "room": "living",
    "name": "Mushroom Stool",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "cottage",
    "svg": "packs/cottage/cc-mushroom-stool.svg",
    "png": "packs/cottage/cc-mushroom-stool.png",
    "widthUnits": 80,
    "heightUnits": 84,
    "gameW": 112,
    "viewBox": [
      10,
      16,
      80,
      84
    ]
  },
  {
    "type": "item",
    "slug": "cc-plant-wall",
    "room": "any",
    "name": "Plant Wall",
    "category": "plants",
    "tag": "plants",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-plant-wall.svg",
    "png": "packs/cottage/cc-plant-wall.png",
    "widthUnits": 92,
    "heightUnits": 90,
    "gameW": 176,
    "viewBox": [
      4,
      6,
      92,
      90
    ],
    "wall": true,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "cc-cottage-aquarium",
    "room": "living",
    "name": "Bubble Aquarium",
    "category": "pets",
    "tag": "pets",
    "size": "medium",
    "pack": "cottage",
    "svg": "packs/cottage/cc-cottage-aquarium.svg",
    "png": "packs/cottage/cc-cottage-aquarium.png",
    "widthUnits": 84,
    "heightUnits": 90,
    "gameW": 136,
    "viewBox": [
      8,
      10,
      84,
      90
    ]
  },
  {
    "type": "item",
    "slug": "cc-reading-nook",
    "room": "bedroom",
    "name": "Cozy Reading Nook",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "cottage",
    "svg": "packs/cottage/cc-reading-nook.svg",
    "png": "packs/cottage/cc-reading-nook.png",
    "widthUnits": 92,
    "heightUnits": 96,
    "gameW": 210,
    "viewBox": [
      4,
      4,
      92,
      96
    ]
  }
]
`,Xg=`[
  {
    "slug": "leafy-cream",
    "name": "Leafy Cream",
    "type": "wallpaper",
    "pack": "welcome-home",
    "svg": "welcome-home/leafy-cream.svg",
    "png": "welcome-home/leafy-cream.png"
  },
  {
    "slug": "orange-gingham",
    "name": "Orange Gingham",
    "type": "wallpaper",
    "pack": "welcome-home",
    "svg": "welcome-home/orange-gingham.svg",
    "png": "welcome-home/orange-gingham.png"
  },
  {
    "slug": "wood-panel",
    "name": "Wood Panel",
    "type": "wallpaper",
    "pack": "welcome-home",
    "svg": "welcome-home/wood-panel.svg",
    "png": "welcome-home/wood-panel.png"
  },
  {
    "slug": "wood-planks",
    "name": "Wood Planks",
    "type": "floor",
    "pack": "welcome-home",
    "svg": "welcome-home/wood-planks.svg",
    "png": "welcome-home/wood-planks.png"
  },
  {
    "slug": "terracotta-tiles",
    "name": "Terracotta Tiles",
    "type": "floor",
    "pack": "welcome-home",
    "svg": "welcome-home/terracotta-tiles.svg",
    "png": "welcome-home/terracotta-tiles.png"
  },
  {
    "slug": "sunny-stars",
    "name": "Sunny Stars",
    "type": "wallpaper",
    "pack": "sunny-vibes",
    "svg": "sunny-vibes/sunny-stars.svg",
    "png": "sunny-vibes/sunny-stars.png"
  },
  {
    "slug": "mint-checks",
    "name": "Mint Checks",
    "type": "wallpaper",
    "pack": "sunny-vibes",
    "svg": "sunny-vibes/mint-checks.svg",
    "png": "sunny-vibes/mint-checks.png"
  },
  {
    "slug": "sky-clouds",
    "name": "Sky Clouds",
    "type": "wallpaper",
    "pack": "sunny-vibes",
    "svg": "sunny-vibes/sky-clouds.svg",
    "png": "sunny-vibes/sky-clouds.png"
  },
  {
    "slug": "butter-check-floor",
    "name": "Butter Check Floor",
    "type": "floor",
    "pack": "sunny-vibes",
    "svg": "sunny-vibes/butter-check-floor.svg",
    "png": "sunny-vibes/butter-check-floor.png"
  },
  {
    "slug": "sky-tiles",
    "name": "Sky Tiles",
    "type": "floor",
    "pack": "sunny-vibes",
    "svg": "sunny-vibes/sky-tiles.svg",
    "png": "sunny-vibes/sky-tiles.png"
  },
  {
    "slug": "pink-hearts",
    "name": "Pink Hearts",
    "type": "wallpaper",
    "pack": "glossy",
    "svg": "glossy/pink-hearts.svg",
    "png": "glossy/pink-hearts.png"
  },
  {
    "slug": "lilac-stripes",
    "name": "Lilac Stripes",
    "type": "wallpaper",
    "pack": "glossy",
    "svg": "glossy/lilac-stripes.svg",
    "png": "glossy/lilac-stripes.png"
  },
  {
    "slug": "mint-bubbles",
    "name": "Mint Bubbles",
    "type": "wallpaper",
    "pack": "glossy",
    "svg": "glossy/mint-bubbles.svg",
    "png": "glossy/mint-bubbles.png"
  },
  {
    "slug": "pink-check-floor",
    "name": "Pink Check Floor",
    "type": "floor",
    "pack": "glossy",
    "svg": "glossy/pink-check-floor.svg",
    "png": "glossy/pink-check-floor.png"
  },
  {
    "slug": "lilac-terrazzo",
    "name": "Lilac Terrazzo",
    "type": "floor",
    "pack": "glossy",
    "svg": "glossy/lilac-terrazzo.svg",
    "png": "glossy/lilac-terrazzo.png"
  },
  {
    "slug": "cloud-sky",
    "name": "Cloud Sky",
    "type": "wallpaper",
    "pack": "nursery",
    "svg": "nursery/cloud-sky.svg"
  },
  {
    "slug": "tiny-hearts",
    "name": "Tiny Hearts",
    "type": "wallpaper",
    "pack": "nursery",
    "svg": "nursery/tiny-hearts.svg"
  },
  {
    "slug": "star-sprinkle",
    "name": "Star Sprinkle",
    "type": "wallpaper",
    "pack": "nursery",
    "svg": "nursery/star-sprinkle.svg"
  },
  {
    "slug": "soft-carpet",
    "name": "Soft Carpet",
    "type": "floor",
    "pack": "nursery",
    "svg": "nursery/soft-carpet.svg"
  },
  {
    "slug": "pastel-planks",
    "name": "Pastel Planks",
    "type": "floor",
    "pack": "nursery",
    "svg": "nursery/pastel-planks.svg"
  },
  {
    "slug": "cc-lilac-gingham",
    "name": "Lilac Gingham",
    "type": "wallpaper",
    "pack": "cottage",
    "svg": "cottage/cc-lilac-gingham.svg",
    "png": "cottage/cc-lilac-gingham.png"
  },
  {
    "slug": "cc-peach-scallops",
    "name": "Peach Scallops",
    "type": "wallpaper",
    "pack": "cottage",
    "svg": "cottage/cc-peach-scallops.svg",
    "png": "cottage/cc-peach-scallops.png"
  },
  {
    "slug": "cc-mint-florals",
    "name": "Mint Florals",
    "type": "wallpaper",
    "pack": "cottage",
    "svg": "cottage/cc-mint-florals.svg",
    "png": "cottage/cc-mint-florals.png"
  },
  {
    "slug": "cc-pink-plaid",
    "name": "Pink Plaid",
    "type": "wallpaper",
    "pack": "cottage",
    "svg": "cottage/cc-pink-plaid.svg",
    "png": "cottage/cc-pink-plaid.png"
  },
  {
    "slug": "cc-butter-polka",
    "name": "Butter Polka",
    "type": "wallpaper",
    "pack": "cottage",
    "svg": "cottage/cc-butter-polka.svg",
    "png": "cottage/cc-butter-polka.png"
  },
  {
    "slug": "cc-lavender-lattice",
    "name": "Lavender Lattice",
    "type": "wallpaper",
    "pack": "cottage",
    "svg": "cottage/cc-lavender-lattice.svg",
    "png": "cottage/cc-lavender-lattice.png"
  },
  {
    "slug": "cc-rose-herringbone",
    "name": "Rose Herringbone",
    "type": "floor",
    "pack": "cottage",
    "svg": "cottage/cc-rose-herringbone.svg",
    "png": "cottage/cc-rose-herringbone.png"
  },
  {
    "slug": "cc-cream-hex",
    "name": "Cream Hex Tiles",
    "type": "floor",
    "pack": "cottage",
    "svg": "cottage/cc-cream-hex.svg",
    "png": "cottage/cc-cream-hex.png"
  },
  {
    "slug": "cc-rag-planks",
    "name": "Pastel Rag Rug",
    "type": "floor",
    "pack": "cottage",
    "svg": "cottage/cc-rag-planks.svg",
    "png": "cottage/cc-rag-planks.png"
  },
  {
    "slug": "cc-mint-checks",
    "name": "Mint Gingham Floor",
    "type": "floor",
    "pack": "cottage",
    "svg": "cottage/cc-mint-checks.svg",
    "png": "cottage/cc-mint-checks.png"
  }
]`,Jg="/kids-house-game/assets/alarm-clock-DOVobLzL.png",ed="/kids-house-game/assets/alarm-clock-BCd1-e86.svg",td="/kids-house-game/assets/bedtime-snack-COvX4Nqo.png",nd="/kids-house-game/assets/bedtime-snack-BoNDQqOK.svg",sd="/kids-house-game/assets/book-stack-BlyqbTA1.png",od="/kids-house-game/assets/book-stack-upnp1NwG.svg",id="/kids-house-game/assets/bunk-bed-COiQly1s.png",ad="/kids-house-game/assets/bunk-bed-YZiRWNFR.svg",rd="/kids-house-game/assets/bunny-slippers-DajXa_JK.png",ld="/kids-house-game/assets/bunny-slippers-PNucIc_Q.svg",cd="/kids-house-game/assets/canopy-bed-Db9GIfyT.png",gd="/kids-house-game/assets/canopy-bed-BwWkRhe2.svg",dd="/kids-house-game/assets/cat-bed-ChP4s69B.png",pd="/kids-house-game/assets/cat-bed-B8ULFbHc.svg",hd="/kids-house-game/assets/cloud-rug-Bv3GScgR.png",fd="/kids-house-game/assets/cloud-rug-CFl6aZc5.svg",md="/kids-house-game/assets/cloud-shelf-BAmU3DSp.png",ud="/kids-house-game/assets/cloud-shelf-DF5b_IoZ.svg",yd="/kids-house-game/assets/cork-board-B8yw-MFd.png",kd="/kids-house-game/assets/cork-board-Bj5OuLbv.svg",vd="/kids-house-game/assets/daisy-pot-BQDVlAug.png",bd="/kids-house-game/assets/daisy-pot-Cy8SrSS6.svg",wd="/kids-house-game/assets/desk-UTaBcI2Q.png",_d="/kids-house-game/assets/desk-2rRtV3Vk.svg",xd="/kids-house-game/assets/dino-plush-yhz7rVZD.png",$d="/kids-house-game/assets/dino-plush-Dq_qccf0.svg",Md="/kids-house-game/assets/doll-house-DfYMaHqJ.png",Ld="/kids-house-game/assets/doll-house-BrC3RiST.svg",Bd="/kids-house-game/assets/dresser-jJcAkDG_.png",Cd="/kids-house-game/assets/dresser-__9TGuYc.svg",Sd="/kids-house-game/assets/egg-chair-DobnnZdC.png",Wd="/kids-house-game/assets/egg-chair-CtiaqWNQ.svg",Ud="/kids-house-game/assets/floor-fan-C2R5oDHp.png",Td="/kids-house-game/assets/floor-fan-Dt9SIAmB.svg",Pd="/kids-house-game/assets/guinea-pig-BzHyXlGo.png",zd="/kids-house-game/assets/guinea-pig-CwLeNU_S.svg",Ed="/kids-house-game/assets/hamster-cage-zv59jo6b.png",Hd="/kids-house-game/assets/hamster-cage-lQ6r7saV.svg",Ad="/kids-house-game/assets/heart-rug-DYGPCKpT.png",Rd="/kids-house-game/assets/heart-rug-CBDvH6Q6.svg",Dd="/kids-house-game/assets/lava-lamp-Df-lJpLx.png",Id="/kids-house-game/assets/lava-lamp-DEuHvlco.svg",Nd="/kids-house-game/assets/moon-night-light-JPI5SkUV.png",Od="/kids-house-game/assets/moon-night-light-CAKsjYZv.svg",qd="/kids-house-game/assets/nightstand-D3WOPlqw.png",jd="/kids-house-game/assets/nightstand-Bgsh0YUi.svg",Vd="/kids-house-game/assets/paper-lantern-mpw1jXzL.png",Fd="/kids-house-game/assets/paper-lantern-CErOGyrT.svg",Zd="/kids-house-game/assets/piggy-bank-DaSktUUA.png",Qd="/kids-house-game/assets/piggy-bank-DsHrmOcp.svg",Gd="/kids-house-game/assets/plant-stand-BpU338ra.png",Kd="/kids-house-game/assets/plant-stand-DDyIDaL0.svg",Yd="/kids-house-game/assets/play-tent-ih6xOGXC.png",Xd="/kids-house-game/assets/play-tent-Bsawe52j.svg",Jd="/kids-house-game/assets/star-mobile-Bqyd_ikl.png",ep="/kids-house-game/assets/star-mobile-DzOGs-Jo.svg",tp="/kids-house-game/assets/toy-chest-DhEoVFj0.png",np="/kids-house-game/assets/toy-chest-6iPrDiZH.svg",sp="/kids-house-game/assets/toy-robot-Bfkjfj_6.png",op="/kids-house-game/assets/toy-robot-OaCEwmDT.svg",ip="/kids-house-game/assets/toy-train-DILjZiya.png",ap="/kids-house-game/assets/toy-train-D5GqAnpy.svg",rp="/kids-house-game/assets/unicorn-plush-5YQqQjND.png",lp="/kids-house-game/assets/unicorn-plush-C0W1eEs9.svg",cp="/kids-house-game/assets/wardrobe-sJcJSWZ2.png",gp="/kids-house-game/assets/wardrobe-Dn492IK0.svg",dp="/kids-house-game/assets/bananas-D4irRkGy.png",pp="/kids-house-game/assets/bananas-aPQwdEVo.svg",hp="/kids-house-game/assets/bar-stool-xbwaa01H.png",fp="/kids-house-game/assets/bar-stool-DWxhX1Ah.svg",mp="/kids-house-game/assets/bread-loaf-DKmR5wPN.png",up="/kids-house-game/assets/bread-loaf-C9cEAYcl.svg",yp="/kids-house-game/assets/chick-DCnoMwEt.png",kp="/kids-house-game/assets/chick-BTEVfgqU.svg",vp="/kids-house-game/assets/china-hutch-K3xtlmqi.png",bp="/kids-house-game/assets/china-hutch-BTmMY6rg.svg",wp="/kids-house-game/assets/cocoa-mug-BmqSzNJ6.png",_p="/kids-house-game/assets/cocoa-mug-CraNCc9b.svg",xp="/kids-house-game/assets/cookie-jar-CZsO9PSp.png",$p="/kids-house-game/assets/cookie-jar-ripj0oyT.svg",Mp="/kids-house-game/assets/cooking-pot-BSKPlqyT.png",Lp="/kids-house-game/assets/cooking-pot-BWtfOm9f.svg",Bp="/kids-house-game/assets/cupcake-KO1KLKav.png",Cp="/kids-house-game/assets/cupcake-DFCw42xb.svg",Sp="/kids-house-game/assets/dish-rack-DICSEn5E.png",Wp="/kids-house-game/assets/dish-rack-BpVmmU6k.svg",Up="/kids-house-game/assets/fruit-bowl-BL5EkaC8.png",Tp="/kids-house-game/assets/fruit-bowl-Dw9lsB3B.svg",Pp="/kids-house-game/assets/frying-pan-BocrLcES.png",zp="/kids-house-game/assets/frying-pan-CTBY6MC_.svg",Ep="/kids-house-game/assets/happy-fridge-BTbpm-W1.png",Hp="/kids-house-game/assets/happy-fridge-D7ENuEJs.svg",Ap="/kids-house-game/assets/herb-box-DFtC2qBN.png",Rp="/kids-house-game/assets/herb-box-CdRxefnV.svg",Dp="/kids-house-game/assets/high-chair-DZCqRJV8.png",Ip="/kids-house-game/assets/high-chair-BQtLYlq4.svg",Np="/kids-house-game/assets/ice-cream-CLLMXjn9.png",Op="/kids-house-game/assets/ice-cream-DydSyNXx.svg",qp="/kids-house-game/assets/kettle-DScYOeEK.png",jp="/kids-house-game/assets/kettle-D1nuAiG_.svg",Vp="/kids-house-game/assets/kitchen-counter-cZcDRQIw.png",Fp="/kids-house-game/assets/kitchen-counter-C8sTAZ-V.svg",Zp="/kids-house-game/assets/kitchen-sink-DrP43iga.png",Qp="/kids-house-game/assets/kitchen-sink-CYjDcd1n.svg",Gp="/kids-house-game/assets/lemon-tree-BwA7W0cM.png",Kp="/kids-house-game/assets/lemon-tree-CZz-Vy3P.svg",Yp="/kids-house-game/assets/microwave-BJRDd-L-.png",Xp="/kids-house-game/assets/microwave-lopm-FCT.svg",Jp="/kids-house-game/assets/milk-bottle-D7UB6VD8.png",eh="/kids-house-game/assets/milk-bottle-DxcUA6XT.svg",th="/kids-house-game/assets/pancakes-CbisCK-C.png",nh="/kids-house-game/assets/pancakes-CLqxnc5R.svg",sh="/kids-house-game/assets/pantry-shelf-DI_CgvVD.png",oh="/kids-house-game/assets/pantry-shelf-Azdxpmzd.svg",ih="/kids-house-game/assets/pendant-lamp-BhZanag5.png",ah="/kids-house-game/assets/pendant-lamp-fZv6y1p0.svg",rh="/kids-house-game/assets/pet-bowl-Oe3KGELz.png",lh="/kids-house-game/assets/pet-bowl-ETL_EOAP.svg",ch="/kids-house-game/assets/rice-cooker-DUTXsBbb.png",gh="/kids-house-game/assets/rice-cooker-JX0L4bi2.svg",dh="/kids-house-game/assets/runner-rug-AYIsQudU.png",ph="/kids-house-game/assets/runner-rug-BbUgZFy4.svg",hh="/kids-house-game/assets/spice-rack-8ll-6Q2f.png",fh="/kids-house-game/assets/spice-rack-D9kAw-vT.svg",mh="/kids-house-game/assets/stand-mixer-CP2fpC-Q.png",uh="/kids-house-game/assets/stand-mixer-CZrLn00l.svg",yh="/kids-house-game/assets/teapot-iFnJNGiA.png",kh="/kids-house-game/assets/teapot-CtPOJzEm.svg",vh="/kids-house-game/assets/toaster-T2WkZkdo.png",bh="/kids-house-game/assets/toaster-CNk0hJDw.svg",wh="/kids-house-game/assets/utensil-rail-_vjcgBpy.png",_h="/kids-house-game/assets/utensil-rail-B0QkGP3A.svg",xh="/kids-house-game/assets/watermelon-slice-yHBcfKGj.png",$h="/kids-house-game/assets/watermelon-slice-VzvgalD5.svg",Mh="/kids-house-game/assets/aquarium-rYRAu69m.png",Lh="/kids-house-game/assets/aquarium-BlhJ9UCr.svg",Bh="/kids-house-game/assets/arc-floor-lamp-CBq3G9j8.png",Ch="/kids-house-game/assets/arc-floor-lamp-DL5cEVzq.svg",Sh="/kids-house-game/assets/bean-bag-CMLYRsbz.png",Wh="/kids-house-game/assets/bean-bag-CauyDuZQ.svg",Uh="/kids-house-game/assets/bird-cage-qj5P0te2.png",Th="/kids-house-game/assets/bird-cage-xqeVahX7.svg",Ph="/kids-house-game/assets/blanket-basket-5IQiUSS2.png",zh="/kids-house-game/assets/blanket-basket-B4LREUo9.svg",Eh="/kids-house-game/assets/building-blocks-CzqAFUNB.png",Hh="/kids-house-game/assets/building-blocks-DbtoodPT.svg",Ah="/kids-house-game/assets/coffee-table-iKZ20Gpy.png",Rh="/kids-house-game/assets/coffee-table-ZYO2ApH6.svg",Dh="/kids-house-game/assets/comfy-armchair-U_SI3sk9.png",Ih="/kids-house-game/assets/comfy-armchair-tjNYbfgO.svg",Nh="/kids-house-game/assets/cubby-shelf-B0De91CO.png",Oh="/kids-house-game/assets/cubby-shelf-CLzTUpiz.svg",qh="/kids-house-game/assets/daisy-rug-BqSOjPlJ.png",jh="/kids-house-game/assets/daisy-rug-CvOlxjsu.svg",Vh="/kids-house-game/assets/fiddle-leaf-fig-DnvG8l2j.png",Fh="/kids-house-game/assets/fiddle-leaf-fig-DiUNW4Q_.svg",Zh="/kids-house-game/assets/fireplace-C9azNipx.png",Qh="/kids-house-game/assets/fireplace-CqxIMN3Z.svg",Gh="/kids-house-game/assets/globe-C-L7vS0t.png",Kh="/kids-house-game/assets/globe-DN0sih3W.svg",Yh="/kids-house-game/assets/hanging-planter-DGgUXZpP.png",Xh="/kids-house-game/assets/hanging-planter-M9IHqztp.svg",Jh="/kids-house-game/assets/monstera-plant-BbGZQtOh.png",ef="/kids-house-game/assets/monstera-plant-CLmuB_RM.svg",tf="/kids-house-game/assets/piano-DpS7nvdq.png",nf="/kids-house-game/assets/piano-Y0KQ4rD2.svg",sf="/kids-house-game/assets/popcorn-CFk12JbR.png",of="/kids-house-game/assets/popcorn-BD2d8sUH.svg",af="/kids-house-game/assets/pouf-DY0Vcx75.png",rf="/kids-house-game/assets/pouf-as0li8On.svg",lf="/kids-house-game/assets/rainbow-rug-DwzLb6aY.png",cf="/kids-house-game/assets/rainbow-rug-C5ZVauOA.svg",gf="/kids-house-game/assets/rainbow-wall-art--5LLrrQJ.png",df="/kids-house-game/assets/rainbow-wall-art-CCXUPPen.svg",pf="/kids-house-game/assets/retro-radio-BIX4GYkL.png",hf="/kids-house-game/assets/retro-radio-B3T98xMQ.svg",ff="/kids-house-game/assets/rocking-chair-CDLlJFiP.png",mf="/kids-house-game/assets/rocking-chair-BgoIQu5H.svg",uf="/kids-house-game/assets/rocking-horse-Iz-CpscK.png",yf="/kids-house-game/assets/rocking-horse-1WLLV43R.svg",kf="/kids-house-game/assets/snake-plant-DgPna4k9.png",vf="/kids-house-game/assets/snake-plant-BGDwPcMj.svg",bf="/kids-house-game/assets/string-lights-nDUZa5m1.png",wf="/kids-house-game/assets/string-lights-DGC0Ni2I.svg",_f="/kids-house-game/assets/succulent-trio-VYNH-o5B.png",xf="/kids-house-game/assets/succulent-trio-uPD-ljlL.svg",$f="/kids-house-game/assets/tassel-rug-BBXtknxh.png",Mf="/kids-house-game/assets/tassel-rug-DolXtxfQ.svg",Lf="/kids-house-game/assets/throw-pillow-BjuGXMYA.png",Bf="/kids-house-game/assets/throw-pillow-qWyWQ9cT.svg",Cf="/kids-house-game/assets/toy-car-Bwrt0-AT.png",Sf="/kids-house-game/assets/toy-car-CTJy5H4V.svg",Wf="/kids-house-game/assets/tulip-vase-CpQUgXPR.png",Uf="/kids-house-game/assets/tulip-vase-o2vjI1Hg.svg",Tf="/kids-house-game/assets/turtle-Bf8_yRql.png",Pf="/kids-house-game/assets/turtle-B9Y6NDSv.svg",zf="/kids-house-game/assets/tv-stand-DnwT-hn4.png",Ef="/kids-house-game/assets/tv-stand-CcLHFc1J.svg",Hf="/kids-house-game/assets/wall-shelf-Bs6mROe1.png",Af="/kids-house-game/assets/wall-shelf-CCWuZ6Xl.svg",Rf="/kids-house-game/assets/cc-bakery-shelf-dMrnZVB3.png",Df="/kids-house-game/assets/cc-bakery-shelf-BxdhLTTC.svg",If="/kids-house-game/assets/cc-breakfast-table-DwHbMV2p.png",Nf="/kids-house-game/assets/cc-breakfast-table-DwaO0eFy.svg",Of="/kids-house-game/assets/cc-bubble-chair-DuDi-bRz.png",qf="/kids-house-game/assets/cc-bubble-chair-DncHA7F-.svg",jf="/kids-house-game/assets/cc-canopy-daybed-CAZpSo2a.png",Vf="/kids-house-game/assets/cc-canopy-daybed-CVbt6QDr.svg",Ff="/kids-house-game/assets/cc-cloud-beanbag-BYcBLKf9.png",Zf="/kids-house-game/assets/cc-cloud-beanbag-SM0m-3qY.svg",Qf="/kids-house-game/assets/cc-cloud-lamp-v0UO1VrK.png",Gf="/kids-house-game/assets/cc-cloud-lamp-BWwxoCux.svg",Kf="/kids-house-game/assets/cc-cottage-aquarium-XYuN1CnR.png",Yf="/kids-house-game/assets/cc-cottage-aquarium-iY2D26Vq.svg",Xf="/kids-house-game/assets/cc-cupcake-stand-jKA3zoCC.png",Jf="/kids-house-game/assets/cc-cupcake-stand-B08kdXZL.svg",em="/kids-house-game/assets/cc-dryer-chair-CP8q6yyq.png",tm="/kids-house-game/assets/cc-dryer-chair-DQmosxUz.svg",nm="/kids-house-game/assets/cc-fairy-garland-B4DVLP6L.png",sm="/kids-house-game/assets/cc-fairy-garland-BncKvkRL.svg",om="/kids-house-game/assets/cc-fairy-shelf-DSmhC08i.png",im="/kids-house-game/assets/cc-fairy-shelf-CE6x7J1w.svg",am="/kids-house-game/assets/cc-flower-kettle-DZFkbEk5.png",rm="/kids-house-game/assets/cc-flower-kettle-ZTbAh26L.svg",lm="/kids-house-game/assets/cc-flower-lamp-hc1e4xxL.png",cm="/kids-house-game/assets/cc-flower-lamp-CS2T2S89.svg",gm="/kids-house-game/assets/cc-heart-bed-BtOx4_a4.png",dm="/kids-house-game/assets/cc-heart-bed-76-z9nJg.svg",pm="/kids-house-game/assets/cc-heart-clock-CLtzUj8w.png",hm="/kids-house-game/assets/cc-heart-clock-ByixSFru.svg",fm="/kids-house-game/assets/cc-heart-pouf-C3vCLnoM.png",mm="/kids-house-game/assets/cc-heart-pouf-DH5J2s2J.svg",um="/kids-house-game/assets/cc-heart-rug-CpvyM_wf.png",ym="/kids-house-game/assets/cc-heart-rug-Jwmh-m0j.svg",km="/kids-house-game/assets/cc-jewel-box-DZ6IxYiU.png",vm="/kids-house-game/assets/cc-jewel-box-qMbIQmo4.svg",bm="/kids-house-game/assets/cc-light-vanity-BxKLJiVW.png",wm="/kids-house-game/assets/cc-light-vanity-DD4uQJ_7.svg",_m="/kids-house-game/assets/cc-macaron-jar-NI43JiPM.png",xm="/kids-house-game/assets/cc-macaron-jar-A0sT-Lvj.svg",$m="/kids-house-game/assets/cc-macrame-swing-x8sop4y4.png",Mm="/kids-house-game/assets/cc-macrame-swing-qIcoPp0o.svg",Lm="/kids-house-game/assets/cc-mani-chair-C1J_zCFX.png",Bm="/kids-house-game/assets/cc-mani-chair-7AWb60tv.svg",Cm="/kids-house-game/assets/cc-mint-fridge-7zQk2-Kj.png",Sm="/kids-house-game/assets/cc-mint-fridge-Cc87e_gW.svg",Wm="/kids-house-game/assets/cc-mushroom-stool-DeoO7P27.png",Um="/kids-house-game/assets/cc-mushroom-stool-B9-y9WNf.svg",Tm="/kids-house-game/assets/cc-pastel-range-CXu-Gr6f.png",Pm="/kids-house-game/assets/cc-pastel-range-D6cjzJTl.svg",zm="/kids-house-game/assets/cc-perfume-tray-DkUHaA_i.png",Em="/kids-house-game/assets/cc-perfume-tray-DN4chcIn.svg",Hm="/kids-house-game/assets/cc-petal-table-DadCDnSy.png",Am="/kids-house-game/assets/cc-petal-table-QrNho7KH.svg",Rm="/kids-house-game/assets/cc-plant-wall-CCxqRxsH.png",Dm="/kids-house-game/assets/cc-plant-wall-BMii8_kR.svg",Im="/kids-house-game/assets/cc-reading-nook-Eq4Eh0MW.png",Nm="/kids-house-game/assets/cc-reading-nook-wiDgasP8.svg",Om="/kids-house-game/assets/cc-record-player-LmfaPaE5.png",qm="/kids-house-game/assets/cc-record-player-BoxZhHLy.svg",jm="/kids-house-game/assets/cc-ribbon-mirror-BEsGok51.png",Vm="/kids-house-game/assets/cc-ribbon-mirror-DiCje_iy.svg",Fm="/kids-house-game/assets/cc-scallop-curtains-Cvab-FzV.png",Zm="/kids-house-game/assets/cc-scallop-curtains-Bzhy2peV.svg",Qm="/kids-house-game/assets/cc-scallop-loveseat-CR3Z2O-W.png",Gm="/kids-house-game/assets/cc-scallop-loveseat-Dfi7dg3b.svg",Km="/kids-house-game/assets/cc-star-dresser-b15t-WLI.png",Ym="/kids-house-game/assets/cc-star-dresser-2wqSnsip.svg",Xm="/kids-house-game/assets/cc-teapot-set-ygQBLdbl.png",Jm="/kids-house-game/assets/cc-teapot-set-DnZlJvn7.svg",eu="/kids-house-game/assets/cc-window-seat-D-Rfuuwm.png",tu="/kids-house-game/assets/cc-window-seat-BCOise4Z.svg",nu="/kids-house-game/assets/arched-shelf-Dt4oWiBK.png",su="/kids-house-game/assets/arched-shelf-XtiqRVaT.svg",ou="/kids-house-game/assets/blob-rug-Ckw1kSsa.png",iu="/kids-house-game/assets/blob-rug-Deh5k10s.svg",au="/kids-house-game/assets/bubbly-plant-CV9ioei6.png",ru="/kids-house-game/assets/bubbly-plant-CFTOJd5Y.svg",lu="/kids-house-game/assets/bud-vase-Bzj5qGgr.png",cu="/kids-house-game/assets/bud-vase-BF-nd69Q.svg",gu="/kids-house-game/assets/comb-brush-CfTGGk1L.png",du="/kids-house-game/assets/comb-brush-oPJeQv0v.svg",pu="/kids-house-game/assets/cream-jars-dLRXypJR.png",hu="/kids-house-game/assets/cream-jars-D6bxrnJR.svg",fu="/kids-house-game/assets/drop-lamp-DWqiPjZB.png",mu="/kids-house-game/assets/drop-lamp-CJg63ZKz.svg",uu="/kids-house-game/assets/droplet-buddy-DCjbvrlK.png",yu="/kids-house-game/assets/droplet-buddy-DTpHggFh.svg",ku="/kids-house-game/assets/fancy-sofa-BRlr2j8I.png",vu="/kids-house-game/assets/fancy-sofa-kq2L0ob5.svg",bu="/kids-house-game/assets/flower-cart-C3W7v2RD.png",wu="/kids-house-game/assets/flower-cart-BWgfg0s_.svg",_u="/kids-house-game/assets/foot-spa-HwiSNgdS.png",xu="/kids-house-game/assets/foot-spa-DdA5_fj_.svg",$u="/kids-house-game/assets/globe-pendants-ChKRw_Bp.png",Mu="/kids-house-game/assets/globe-pendants-DNV5WnAO.svg",Lu="/kids-house-game/assets/glow-mirror-D4P3UibJ.png",Bu="/kids-house-game/assets/glow-mirror-C_dTGwQc.svg",Cu="/kids-house-game/assets/gold-floor-mirror-CSYqaszS.png",Su="/kids-house-game/assets/gold-floor-mirror-jfPQepmr.svg",Wu="/kids-house-game/assets/hair-dryer-_nFRnXBv.png",Uu="/kids-house-game/assets/hair-dryer-CAkhCf7J.svg",Tu="/kids-house-game/assets/heart-plant-CN47o4my.png",Pu="/kids-house-game/assets/heart-plant-fSU4uLVy.svg",zu="/kids-house-game/assets/heart-pouf-b76ZFT07.png",Eu="/kids-house-game/assets/heart-pouf-BMVPBVKJ.svg",Hu="/kids-house-game/assets/lilac-curtain-94MUZIqr.png",Au="/kids-house-game/assets/lilac-curtain-D_mFsZKu.svg",Ru="/kids-house-game/assets/lotion-trio-wGXg7qdC.png",Du="/kids-house-game/assets/lotion-trio-D3lKwvho.svg",Iu="/kids-house-game/assets/mani-lamp-B6MLP1xK.png",Nu="/kids-house-game/assets/mani-lamp-B4SmvhvS.svg",Ou="/kids-house-game/assets/nail-table-CP0_pEA8.png",qu="/kids-house-game/assets/nail-table-C3FitmuG.svg",ju="/kids-house-game/assets/pebble-rug-BgHMxQ6Q.png",Vu="/kids-house-game/assets/pebble-rug-DHBZUggl.svg",Fu="/kids-house-game/assets/perfume-bottle-F_MkREQh.png",Zu="/kids-house-game/assets/perfume-bottle-BcNXSWTW.svg",Qu="/kids-house-game/assets/pink-fountain-DtB69ljQ.png",Gu="/kids-house-game/assets/pink-fountain-DQ3CIetr.svg",Ku="/kids-house-game/assets/pink-vanity-CPmOesS7.png",Yu="/kids-house-game/assets/pink-vanity-qE3SwdD6.svg",Xu="/kids-house-game/assets/polish-bottle-B2f4PsGZ.png",Ju="/kids-house-game/assets/polish-bottle-VWed8EQ-.svg",e0="/kids-house-game/assets/polish-rack-ANlncwDe.png",t0="/kids-house-game/assets/polish-rack-8Ph2n2nM.svg",n0="/kids-house-game/assets/reception-desk-DnhqgkHu.png",s0="/kids-house-game/assets/reception-desk-D4Gevx64.svg",o0="/kids-house-game/assets/salon-chair-Bl31ZE_E.png",i0="/kids-house-game/assets/salon-chair-Wj2sOSW8.svg",a0="/kids-house-game/assets/scent-candle-BYUsO9s1.png",r0="/kids-house-game/assets/scent-candle-BEUE-6Uv.svg",l0="/kids-house-game/assets/spray-bottle-DJKZeNmL.png",c0="/kids-house-game/assets/spray-bottle-Bc8iuceJ.svg",g0="/kids-house-game/assets/star-wall-sign-D_9XhB91.png",d0="/kids-house-game/assets/star-wall-sign-DvenTqvU.svg",p0="/kids-house-game/assets/swivel-stool-BGAwWXNX.png",h0="/kids-house-game/assets/swivel-stool-P-Egqq_Z.svg",f0="/kids-house-game/assets/tiered-tray-CGuVyK1K.png",m0="/kids-house-game/assets/tiered-tray-DLnZTsUF.svg",u0="/kids-house-game/assets/towel-cart-5At-syZP.png",y0="/kids-house-game/assets/towel-cart-DJmR97UL.svg",k0="/kids-house-game/assets/towel-stack-D-pX5koc.png",v0="/kids-house-game/assets/towel-stack-C1qplZ4T.svg",b0="/kids-house-game/assets/vine-planter-mviuZvkw.png",w0="/kids-house-game/assets/vine-planter-Duhx9OMZ.svg",_0="/kids-house-game/assets/waiting-bench-DXbi7ObC.png",x0="/kids-house-game/assets/waiting-bench-BQuoXbE3.svg",$0="/kids-house-game/assets/wash-chair-CJo64U_O.png",M0="/kids-house-game/assets/wash-chair-sdgNnj79.svg",L0="/kids-house-game/assets/arched-mirror-2vakzmQ8.png",B0="/kids-house-game/assets/arched-mirror-ClJgTBd9.svg",C0="/kids-house-game/assets/big-monitor-BRiCdofl.png",S0="/kids-house-game/assets/big-monitor-jx5PnUa_.svg",W0="/kids-house-game/assets/boba-cup-Dn_S1oAa.png",U0="/kids-house-game/assets/boba-cup-CwUerXNm.svg",T0="/kids-house-game/assets/bubble-bath-D4AZavWB.png",P0="/kids-house-game/assets/bubble-bath-8VwrkImA.svg",z0="/kids-house-game/assets/cactus-buddy-D_lAS12Y.png",E0="/kids-house-game/assets/cactus-buddy-D3uacuVA.svg",H0="/kids-house-game/assets/caterpillar-plush-vK3r58Ch.png",A0="/kids-house-game/assets/caterpillar-plush-BhR8Pydf.svg",R0="/kids-house-game/assets/checker-bed-DD4Ra6RV.png",D0="/kids-house-game/assets/checker-bed-mtuxfPje.svg",I0="/kids-house-game/assets/checker-rug-C9Gs09p_.png",N0="/kids-house-game/assets/checker-rug-CmSO3Y4j.svg",O0="/kids-house-game/assets/clothes-rail-CJ8Du1xN.png",q0="/kids-house-game/assets/clothes-rail-BY-f9coz.svg",j0="/kids-house-game/assets/cloud-sofa-3eVlcAzs.png",V0="/kids-house-game/assets/cloud-sofa-CZS1Y5s-.svg",F0="/kids-house-game/assets/cube-shelf-DPFNgFhk.png",Z0="/kids-house-game/assets/cube-shelf-DoI0tLGL.svg",Q0="/kids-house-game/assets/curvy-desk-BxyVtcg3.png",G0="/kids-house-game/assets/curvy-desk-eWCvec1f.svg",K0="/kids-house-game/assets/cute-speaker-Cy7ml0bm.png",Y0="/kids-house-game/assets/cute-speaker-DrVF9uns.svg",X0="/kids-house-game/assets/desk-lamp-B39R5SBQ.png",J0="/kids-house-game/assets/desk-lamp-C-VtrE1V.svg",ey="/kids-house-game/assets/desk-mic-C-4XirP6.png",ty="/kids-house-game/assets/desk-mic-BqYzh6ma.svg",ny="/kids-house-game/assets/flower-lamp-DyDRXGpR.png",sy="/kids-house-game/assets/flower-lamp-Dpz6tQ2x.svg",oy="/kids-house-game/assets/frog-plush-NmeU5sHZ.png",iy="/kids-house-game/assets/frog-plush-BhkTrE24.svg",ay="/kids-house-game/assets/game-controller-B6phnmU4.png",ry="/kids-house-game/assets/game-controller-6gvwykQG.svg",ly="/kids-house-game/assets/gaming-chair-B7ZnwG2W.png",cy="/kids-house-game/assets/gaming-chair-BCyGMzy0.svg",gy="/kids-house-game/assets/hamster-pet-C09aLs5N.png",dy="/kids-house-game/assets/hamster-pet-LBcghoJj.svg",py="/kids-house-game/assets/headphones-MRHfNh-e.png",hy="/kids-house-game/assets/headphones-Cjjqt_92.svg",fy="/kids-house-game/assets/heart-light-B6LXGE4j.png",my="/kids-house-game/assets/heart-light-DfDwRHju.svg",uy="/kids-house-game/assets/keyboard-Dvxz1PEW.png",yy="/kids-house-game/assets/keyboard-Cbtwvtj1.svg",ky="/kids-house-game/assets/mini-fridge-DgYceOBW.png",vy="/kids-house-game/assets/mini-fridge-qdNm4NKf.svg",by="/kids-house-game/assets/pastel-wardrobe-CFIOdtrx.png",wy="/kids-house-game/assets/pastel-wardrobe-BubkWAN2.svg",_y="/kids-house-game/assets/phone-stand-CWfRuwT_.png",xy="/kids-house-game/assets/phone-stand-VLW-DsK-.svg",$y="/kids-house-game/assets/pothos-plant-mnKAaH_K.png",My="/kids-house-game/assets/pothos-plant-C1I15M9a.svg",Ly="/kids-house-game/assets/puffy-stool-B5z3sd2l.png",By="/kids-house-game/assets/puffy-stool-CwjoblCa.svg",Cy="/kids-house-game/assets/ring-light-BoqM9Lks.png",Sy="/kids-house-game/assets/ring-light-CdxNAXA6.svg",Wy="/kids-house-game/assets/side-table-round-x1NbWzDq.png",Uy="/kids-house-game/assets/side-table-round-rCsBU0YO.svg",Ty="/kids-house-game/assets/star-lamp-Bocs3YRP.png",Py="/kids-house-game/assets/star-lamp-CHKQnzvB.svg",zy="/kids-house-game/assets/sticker-board-CMn2BF_D.png",Ey="/kids-house-game/assets/sticker-board-LUm1_I_P.svg",Hy="/kids-house-game/assets/sunny-art-372bwMLG.png",Ay="/kids-house-game/assets/sunny-art-C25M7k02.svg",Ry="/kids-house-game/assets/sv-bean-bag-DlsJBRMG.png",Dy="/kids-house-game/assets/sv-bean-bag-DdsCYd4e.svg",Iy="/kids-house-game/assets/sv-cloud-rug-Bo5aP_HP.png",Ny="/kids-house-game/assets/sv-cloud-rug-BvczSj77.svg",Oy="/kids-house-game/assets/sv-wall-shelf-C61Y5OFn.png",qy="/kids-house-game/assets/sv-wall-shelf-BtJLzNMg.svg",jy="/kids-house-game/assets/vlog-camera-DAiD7LSW.png",Vy="/kids-house-game/assets/vlog-camera-CBd28A7P.svg",Fy="/kids-house-game/assets/wavy-floor-lamp-1BJBLV8q.png",Zy="/kids-house-game/assets/wavy-floor-lamp-Iy8llzr8.svg",Qy="/kids-house-game/assets/acorn-friend-SMoU5de2.png",Gy="/kids-house-game/assets/acorn-friend-BsLiZ2Z_.svg",Ky="/kids-house-game/assets/apple-tree-CN7tYao3.png",Yy="/kids-house-game/assets/apple-tree-DGIUIjY1.svg",Xy="/kids-house-game/assets/big-wardrobe-DcZpROWW.png",Jy="/kids-house-game/assets/big-wardrobe-BnfnkPXl.svg",e1="/kids-house-game/assets/box-stack-DBdO-RRV.png",t1="/kids-house-game/assets/box-stack-ji13G2mP.svg",n1="/kids-house-game/assets/brick-fireplace-CxelyhgA.png",s1="/kids-house-game/assets/brick-fireplace-BGCbiSK5.svg",o1="/kids-house-game/assets/bulletin-board-BWUCktvK.png",i1="/kids-house-game/assets/bulletin-board-DqA69wQH.svg",a1="/kids-house-game/assets/cozy-mug-DGMQRJK7.png",r1="/kids-house-game/assets/cozy-mug-CFJEPRKb.svg",l1="/kids-house-game/assets/cream-sofa-Dzaz9Eg9.png",c1="/kids-house-game/assets/cream-sofa-CB4EWIDp.svg",g1="/kids-house-game/assets/fire-pit-FhRYTkJU.png",d1="/kids-house-game/assets/fire-pit-De3s05T8.svg",p1="/kids-house-game/assets/glass-cabinet-C1Dud5Om.png",h1="/kids-house-game/assets/glass-cabinet-BCHExP4F.svg",f1="/kids-house-game/assets/hanging-lantern-5_A0FrVU.png",m1="/kids-house-game/assets/hanging-lantern-DZbXB8L1.svg",u1="/kids-house-game/assets/knit-cushion-CeEpuawZ.png",y1="/kids-house-game/assets/knit-cushion-DUewI6rR.svg",k1="/kids-house-game/assets/ladder-shelf-kDBx9ho_.png",v1="/kids-house-game/assets/ladder-shelf-DXYDmQiE.svg",b1="/kids-house-game/assets/landscape-art-CXy-fkYO.png",w1="/kids-house-game/assets/landscape-art-CdCqCPL2.svg",_1="/kids-house-game/assets/lattice-bench-BQ7wYgqI.png",x1="/kids-house-game/assets/lattice-bench-D3zCZTQp.svg",$1="/kids-house-game/assets/leaf-wreath-01dJ9WfP.png",M1="/kids-house-game/assets/leaf-wreath-DUjq1MWh.svg",L1="/kids-house-game/assets/mini-greenhouse-DLsY7-VZ.png",B1="/kids-house-game/assets/mini-greenhouse-CGE5F9A_.svg",C1="/kids-house-game/assets/moving-box-DszcEI-k.png",S1="/kids-house-game/assets/moving-box-CZXbXcJO.svg",W1="/kids-house-game/assets/picnic-basket-CYmGfWoy.png",U1="/kids-house-game/assets/picnic-basket-D72DCNRY.svg",T1="/kids-house-game/assets/round-rug-DZTiY9p2.png",P1="/kids-house-game/assets/round-rug-D8ePosbv.svg",z1="/kids-house-game/assets/sale-sign-CLwCvavX.png",E1="/kids-house-game/assets/sale-sign-CXWpgQt5.svg",H1="/kids-house-game/assets/sprout-pot-BlPwmBjK.png",A1="/kids-house-game/assets/sprout-pot-BbXk09mS.svg",R1="/kids-house-game/assets/stripe-runner-CWfHHL2f.png",D1="/kids-house-game/assets/stripe-runner-ClycKEW5.svg",I1="/kids-house-game/assets/trailing-plant-BBqKhPvp.png",N1="/kids-house-game/assets/trailing-plant-NbG7dy8O.svg",O1="/kids-house-game/assets/wall-clock-ItDQFPVO.png",q1="/kids-house-game/assets/wall-clock-CDC1o6eG.svg",j1="/kids-house-game/assets/wh-arc-floor-lamp-Dg8j_uAI.png",V1="/kids-house-game/assets/wh-arc-floor-lamp-BKVes2Fd.svg",F1="/kids-house-game/assets/wh-book-stack-9oDTUUnY.png",Z1="/kids-house-game/assets/wh-book-stack-DjDFey2h.svg",Q1="/kids-house-game/assets/wh-dresser-DhrzqcZ2.png",G1="/kids-house-game/assets/wh-dresser-Y-jnNt5q.svg",K1="/kids-house-game/assets/wh-fiddle-leaf-fig-Bt0Bc12k.png",Y1="/kids-house-game/assets/wh-fiddle-leaf-fig-B0-kGmHI.svg",X1="/kids-house-game/assets/wh-kitchen-counter-BWikwkWo.png",J1="/kids-house-game/assets/wh-kitchen-counter-BtBenu6u.svg",ek="/kids-house-game/assets/wh-nightstand-BXusZ0A4.png",tk="/kids-house-game/assets/wh-nightstand-DPUoV5aO.svg",nk="/kids-house-game/assets/wh-pendant-lamp-DbfSrUho.png",sk="/kids-house-game/assets/wh-pendant-lamp-DBg4p7hi.svg",ok="/kids-house-game/assets/wh-snake-plant-kt_6Tus5.png",ik="/kids-house-game/assets/wh-snake-plant-Cj3bHF25.svg",ak="/kids-house-game/assets/wh-string-lights-CWVP27K_.png",rk="/kids-house-game/assets/wh-string-lights-C3JVBkgW.svg",lk="/kids-house-game/assets/wh-teapot-BclPHtYN.png",ck="/kids-house-game/assets/wh-teapot-kevlW5hN.svg",gk="/kids-house-game/assets/wood-armchair-BoX1llWe.png",dk="/kids-house-game/assets/wood-armchair-DNVhKBWe.svg",pk="/kids-house-game/assets/wood-bookshelf-CfgOK-7q.png",hk="/kids-house-game/assets/wood-bookshelf-CvT7GAuI.svg",fk="/kids-house-game/assets/wood-coffee-table-DmAJknnU.png",mk="/kids-house-game/assets/wood-coffee-table-CuAR_7Kr.svg",uk="/kids-house-game/assets/wood-desk-S1h5jwM2.png",yk="/kids-house-game/assets/wood-desk-DPCJq_XQ.svg",kk="/kids-house-game/assets/wood-stool-BWBID67e.png",vk="/kids-house-game/assets/wood-stool-CV7YeZwC.svg",bk="/kids-house-game/assets/wooden-bed-511IemjK.png",wk="/kids-house-game/assets/wooden-bed-Qj-sf8yq.svg",_k="/kids-house-game/assets/cc-butter-polka-DGTIwtTO.png",xk="/kids-house-game/assets/cc-butter-polka-CmiHLPHI.svg",$k="/kids-house-game/assets/cc-cream-hex-DMlsmhhY.png",Mk="/kids-house-game/assets/cc-cream-hex-Bkf3o84Z.svg",Lk="/kids-house-game/assets/cc-lavender-lattice-D6QyuSPi.png",Bk="/kids-house-game/assets/cc-lavender-lattice-DhxILx5n.svg",Ck="/kids-house-game/assets/cc-lilac-gingham-C8gKChr3.png",Sk="/kids-house-game/assets/cc-lilac-gingham-C-WPjvD8.svg",Wk="/kids-house-game/assets/cc-mint-checks-Bj1xaUgE.png",Uk="/kids-house-game/assets/cc-mint-checks-BKmyOLlr.svg",Tk="/kids-house-game/assets/cc-mint-florals-DubHlfkl.png",Pk="/kids-house-game/assets/cc-mint-florals-Dz8qRBHw.svg",zk="/kids-house-game/assets/cc-peach-scallops-3xV_Pu-6.png",Ek="/kids-house-game/assets/cc-peach-scallops-GPn_mXbS.svg",Hk="/kids-house-game/assets/cc-pink-plaid-C9HKdB4f.png",Ak="/kids-house-game/assets/cc-pink-plaid-VgppBwax.svg",Rk="/kids-house-game/assets/cc-rag-planks-B67vRZlX.png",Dk="/kids-house-game/assets/cc-rag-planks-C5Hombhc.svg",Ik="/kids-house-game/assets/cc-rose-herringbone-Cmke3vGv.png",Nk="/kids-house-game/assets/cc-rose-herringbone-CQRix6_f.svg",Ok="/kids-house-game/assets/lilac-stripes-DcsSoVwO.png",qk="/kids-house-game/assets/lilac-stripes-yb9DhjTf.svg",jk="/kids-house-game/assets/lilac-terrazzo-DOghNP_d.png",Vk="/kids-house-game/assets/lilac-terrazzo-8CaN2qhK.svg",Fk="/kids-house-game/assets/mint-bubbles-DtsYAubK.png",Zk="/kids-house-game/assets/mint-bubbles-BIQM5a2P.svg",Qk="/kids-house-game/assets/pink-check-floor-DjPuYxlq.png",Gk="/kids-house-game/assets/pink-check-floor-Cy9k3Fal.svg",Kk="/kids-house-game/assets/pink-hearts-DP4TxPV5.png",Yk="/kids-house-game/assets/pink-hearts-BpVCT-98.svg",Xk="/kids-house-game/assets/cloud-sky-CbZL0zcC.svg",Jk="/kids-house-game/assets/pastel-planks-BAcEss7w.svg",ev="/kids-house-game/assets/soft-carpet-BSwTSDW1.svg",tv="/kids-house-game/assets/star-sprinkle-5bH7qjW0.svg",nv="/kids-house-game/assets/tiny-hearts-C-RHlg1h.svg",sv="/kids-house-game/assets/butter-check-floor-yLFbEdi4.png",ov="/kids-house-game/assets/butter-check-floor-C8HdmZ0P.svg",iv="/kids-house-game/assets/mint-checks-7rTweT19.png",av="/kids-house-game/assets/mint-checks-rWbOdhfH.svg",rv="/kids-house-game/assets/sky-clouds-9-shWk3w.png",lv="/kids-house-game/assets/sky-clouds-DUJlygwI.svg",cv="/kids-house-game/assets/sky-tiles-Cu-Ga741.png",gv="/kids-house-game/assets/sky-tiles-xxuodD5m.svg",dv="/kids-house-game/assets/sunny-stars-Bc3CbIvZ.png",pv="/kids-house-game/assets/sunny-stars-C6fsFX70.svg",hv="/kids-house-game/assets/leafy-cream-Cv5o-u-w.png",fv="/kids-house-game/assets/leafy-cream-WIcyLI1T.svg",mv="/kids-house-game/assets/orange-gingham-BjUerG-F.png",uv="/kids-house-game/assets/orange-gingham-CVNizWBt.svg",yv="/kids-house-game/assets/terracotta-tiles-dXqpLLce.png",kv="/kids-house-game/assets/terracotta-tiles-j3yOSRI7.svg",vv="/kids-house-game/assets/wood-panel-BGEVUu4R.png",bv="/kids-house-game/assets/wood-panel-Dob8WRpW.svg",wv="/kids-house-game/assets/wood-planks-vE8-OOXo.png",_v="/kids-house-game/assets/wood-planks-4TUYjAkF.svg",ra={small:80,medium:150,large:260},xv={"welcome-home":"Welcome Home","sunny-vibes":"Sunny Vibes",glossy:"Glossy",cottage:"Cozy Cottage"},dr=e=>xv[e]??e.replace(/[-_]+/g," ").replace(/\b\w/g,t=>t.toUpperCase()),$v=Object.assign({"../assets/items/manifest.json":Yg,"../assets/patterns/manifest.json":Xg}),la=Object.assign({"../assets/items/bedroom/alarm-clock.png":Jg,"../assets/items/bedroom/alarm-clock.svg":ed,"../assets/items/bedroom/bedtime-snack.png":td,"../assets/items/bedroom/bedtime-snack.svg":nd,"../assets/items/bedroom/book-stack.png":sd,"../assets/items/bedroom/book-stack.svg":od,"../assets/items/bedroom/bunk-bed.png":id,"../assets/items/bedroom/bunk-bed.svg":ad,"../assets/items/bedroom/bunny-slippers.png":rd,"../assets/items/bedroom/bunny-slippers.svg":ld,"../assets/items/bedroom/canopy-bed.png":cd,"../assets/items/bedroom/canopy-bed.svg":gd,"../assets/items/bedroom/cat-bed.png":dd,"../assets/items/bedroom/cat-bed.svg":pd,"../assets/items/bedroom/cloud-rug.png":hd,"../assets/items/bedroom/cloud-rug.svg":fd,"../assets/items/bedroom/cloud-shelf.png":md,"../assets/items/bedroom/cloud-shelf.svg":ud,"../assets/items/bedroom/cork-board.png":yd,"../assets/items/bedroom/cork-board.svg":kd,"../assets/items/bedroom/daisy-pot.png":vd,"../assets/items/bedroom/daisy-pot.svg":bd,"../assets/items/bedroom/desk.png":wd,"../assets/items/bedroom/desk.svg":_d,"../assets/items/bedroom/dino-plush.png":xd,"../assets/items/bedroom/dino-plush.svg":$d,"../assets/items/bedroom/doll-house.png":Md,"../assets/items/bedroom/doll-house.svg":Ld,"../assets/items/bedroom/dresser.png":Bd,"../assets/items/bedroom/dresser.svg":Cd,"../assets/items/bedroom/egg-chair.png":Sd,"../assets/items/bedroom/egg-chair.svg":Wd,"../assets/items/bedroom/floor-fan.png":Ud,"../assets/items/bedroom/floor-fan.svg":Td,"../assets/items/bedroom/guinea-pig.png":Pd,"../assets/items/bedroom/guinea-pig.svg":zd,"../assets/items/bedroom/hamster-cage.png":Ed,"../assets/items/bedroom/hamster-cage.svg":Hd,"../assets/items/bedroom/heart-rug.png":Ad,"../assets/items/bedroom/heart-rug.svg":Rd,"../assets/items/bedroom/lava-lamp.png":Dd,"../assets/items/bedroom/lava-lamp.svg":Id,"../assets/items/bedroom/moon-night-light.png":Nd,"../assets/items/bedroom/moon-night-light.svg":Od,"../assets/items/bedroom/nightstand.png":qd,"../assets/items/bedroom/nightstand.svg":jd,"../assets/items/bedroom/paper-lantern.png":Vd,"../assets/items/bedroom/paper-lantern.svg":Fd,"../assets/items/bedroom/piggy-bank.png":Zd,"../assets/items/bedroom/piggy-bank.svg":Qd,"../assets/items/bedroom/plant-stand.png":Gd,"../assets/items/bedroom/plant-stand.svg":Kd,"../assets/items/bedroom/play-tent.png":Yd,"../assets/items/bedroom/play-tent.svg":Xd,"../assets/items/bedroom/star-mobile.png":Jd,"../assets/items/bedroom/star-mobile.svg":ep,"../assets/items/bedroom/toy-chest.png":tp,"../assets/items/bedroom/toy-chest.svg":np,"../assets/items/bedroom/toy-robot.png":sp,"../assets/items/bedroom/toy-robot.svg":op,"../assets/items/bedroom/toy-train.png":ip,"../assets/items/bedroom/toy-train.svg":ap,"../assets/items/bedroom/unicorn-plush.png":rp,"../assets/items/bedroom/unicorn-plush.svg":lp,"../assets/items/bedroom/wardrobe.png":cp,"../assets/items/bedroom/wardrobe.svg":gp,"../assets/items/kitchen/bananas.png":dp,"../assets/items/kitchen/bananas.svg":pp,"../assets/items/kitchen/bar-stool.png":hp,"../assets/items/kitchen/bar-stool.svg":fp,"../assets/items/kitchen/bread-loaf.png":mp,"../assets/items/kitchen/bread-loaf.svg":up,"../assets/items/kitchen/chick.png":yp,"../assets/items/kitchen/chick.svg":kp,"../assets/items/kitchen/china-hutch.png":vp,"../assets/items/kitchen/china-hutch.svg":bp,"../assets/items/kitchen/cocoa-mug.png":wp,"../assets/items/kitchen/cocoa-mug.svg":_p,"../assets/items/kitchen/cookie-jar.png":xp,"../assets/items/kitchen/cookie-jar.svg":$p,"../assets/items/kitchen/cooking-pot.png":Mp,"../assets/items/kitchen/cooking-pot.svg":Lp,"../assets/items/kitchen/cupcake.png":Bp,"../assets/items/kitchen/cupcake.svg":Cp,"../assets/items/kitchen/dish-rack.png":Sp,"../assets/items/kitchen/dish-rack.svg":Wp,"../assets/items/kitchen/fruit-bowl.png":Up,"../assets/items/kitchen/fruit-bowl.svg":Tp,"../assets/items/kitchen/frying-pan.png":Pp,"../assets/items/kitchen/frying-pan.svg":zp,"../assets/items/kitchen/happy-fridge.png":Ep,"../assets/items/kitchen/happy-fridge.svg":Hp,"../assets/items/kitchen/herb-box.png":Ap,"../assets/items/kitchen/herb-box.svg":Rp,"../assets/items/kitchen/high-chair.png":Dp,"../assets/items/kitchen/high-chair.svg":Ip,"../assets/items/kitchen/ice-cream.png":Np,"../assets/items/kitchen/ice-cream.svg":Op,"../assets/items/kitchen/kettle.png":qp,"../assets/items/kitchen/kettle.svg":jp,"../assets/items/kitchen/kitchen-counter.png":Vp,"../assets/items/kitchen/kitchen-counter.svg":Fp,"../assets/items/kitchen/kitchen-sink.png":Zp,"../assets/items/kitchen/kitchen-sink.svg":Qp,"../assets/items/kitchen/lemon-tree.png":Gp,"../assets/items/kitchen/lemon-tree.svg":Kp,"../assets/items/kitchen/microwave.png":Yp,"../assets/items/kitchen/microwave.svg":Xp,"../assets/items/kitchen/milk-bottle.png":Jp,"../assets/items/kitchen/milk-bottle.svg":eh,"../assets/items/kitchen/pancakes.png":th,"../assets/items/kitchen/pancakes.svg":nh,"../assets/items/kitchen/pantry-shelf.png":sh,"../assets/items/kitchen/pantry-shelf.svg":oh,"../assets/items/kitchen/pendant-lamp.png":ih,"../assets/items/kitchen/pendant-lamp.svg":ah,"../assets/items/kitchen/pet-bowl.png":rh,"../assets/items/kitchen/pet-bowl.svg":lh,"../assets/items/kitchen/rice-cooker.png":ch,"../assets/items/kitchen/rice-cooker.svg":gh,"../assets/items/kitchen/runner-rug.png":dh,"../assets/items/kitchen/runner-rug.svg":ph,"../assets/items/kitchen/spice-rack.png":hh,"../assets/items/kitchen/spice-rack.svg":fh,"../assets/items/kitchen/stand-mixer.png":mh,"../assets/items/kitchen/stand-mixer.svg":uh,"../assets/items/kitchen/teapot.png":yh,"../assets/items/kitchen/teapot.svg":kh,"../assets/items/kitchen/toaster.png":vh,"../assets/items/kitchen/toaster.svg":bh,"../assets/items/kitchen/utensil-rail.png":wh,"../assets/items/kitchen/utensil-rail.svg":_h,"../assets/items/kitchen/watermelon-slice.png":xh,"../assets/items/kitchen/watermelon-slice.svg":$h,"../assets/items/living/aquarium.png":Mh,"../assets/items/living/aquarium.svg":Lh,"../assets/items/living/arc-floor-lamp.png":Bh,"../assets/items/living/arc-floor-lamp.svg":Ch,"../assets/items/living/bean-bag.png":Sh,"../assets/items/living/bean-bag.svg":Wh,"../assets/items/living/bird-cage.png":Uh,"../assets/items/living/bird-cage.svg":Th,"../assets/items/living/blanket-basket.png":Ph,"../assets/items/living/blanket-basket.svg":zh,"../assets/items/living/building-blocks.png":Eh,"../assets/items/living/building-blocks.svg":Hh,"../assets/items/living/coffee-table.png":Ah,"../assets/items/living/coffee-table.svg":Rh,"../assets/items/living/comfy-armchair.png":Dh,"../assets/items/living/comfy-armchair.svg":Ih,"../assets/items/living/cubby-shelf.png":Nh,"../assets/items/living/cubby-shelf.svg":Oh,"../assets/items/living/daisy-rug.png":qh,"../assets/items/living/daisy-rug.svg":jh,"../assets/items/living/fiddle-leaf-fig.png":Vh,"../assets/items/living/fiddle-leaf-fig.svg":Fh,"../assets/items/living/fireplace.png":Zh,"../assets/items/living/fireplace.svg":Qh,"../assets/items/living/globe.png":Gh,"../assets/items/living/globe.svg":Kh,"../assets/items/living/hanging-planter.png":Yh,"../assets/items/living/hanging-planter.svg":Xh,"../assets/items/living/monstera-plant.png":Jh,"../assets/items/living/monstera-plant.svg":ef,"../assets/items/living/piano.png":tf,"../assets/items/living/piano.svg":nf,"../assets/items/living/popcorn.png":sf,"../assets/items/living/popcorn.svg":of,"../assets/items/living/pouf.png":af,"../assets/items/living/pouf.svg":rf,"../assets/items/living/rainbow-rug.png":lf,"../assets/items/living/rainbow-rug.svg":cf,"../assets/items/living/rainbow-wall-art.png":gf,"../assets/items/living/rainbow-wall-art.svg":df,"../assets/items/living/retro-radio.png":pf,"../assets/items/living/retro-radio.svg":hf,"../assets/items/living/rocking-chair.png":ff,"../assets/items/living/rocking-chair.svg":mf,"../assets/items/living/rocking-horse.png":uf,"../assets/items/living/rocking-horse.svg":yf,"../assets/items/living/snake-plant.png":kf,"../assets/items/living/snake-plant.svg":vf,"../assets/items/living/string-lights.png":bf,"../assets/items/living/string-lights.svg":wf,"../assets/items/living/succulent-trio.png":_f,"../assets/items/living/succulent-trio.svg":xf,"../assets/items/living/tassel-rug.png":$f,"../assets/items/living/tassel-rug.svg":Mf,"../assets/items/living/throw-pillow.png":Lf,"../assets/items/living/throw-pillow.svg":Bf,"../assets/items/living/toy-car.png":Cf,"../assets/items/living/toy-car.svg":Sf,"../assets/items/living/tulip-vase.png":Wf,"../assets/items/living/tulip-vase.svg":Uf,"../assets/items/living/turtle.png":Tf,"../assets/items/living/turtle.svg":Pf,"../assets/items/living/tv-stand.png":zf,"../assets/items/living/tv-stand.svg":Ef,"../assets/items/living/wall-shelf.png":Hf,"../assets/items/living/wall-shelf.svg":Af,"../assets/items/packs/cottage/cc-bakery-shelf.png":Rf,"../assets/items/packs/cottage/cc-bakery-shelf.svg":Df,"../assets/items/packs/cottage/cc-breakfast-table.png":If,"../assets/items/packs/cottage/cc-breakfast-table.svg":Nf,"../assets/items/packs/cottage/cc-bubble-chair.png":Of,"../assets/items/packs/cottage/cc-bubble-chair.svg":qf,"../assets/items/packs/cottage/cc-canopy-daybed.png":jf,"../assets/items/packs/cottage/cc-canopy-daybed.svg":Vf,"../assets/items/packs/cottage/cc-cloud-beanbag.png":Ff,"../assets/items/packs/cottage/cc-cloud-beanbag.svg":Zf,"../assets/items/packs/cottage/cc-cloud-lamp.png":Qf,"../assets/items/packs/cottage/cc-cloud-lamp.svg":Gf,"../assets/items/packs/cottage/cc-cottage-aquarium.png":Kf,"../assets/items/packs/cottage/cc-cottage-aquarium.svg":Yf,"../assets/items/packs/cottage/cc-cupcake-stand.png":Xf,"../assets/items/packs/cottage/cc-cupcake-stand.svg":Jf,"../assets/items/packs/cottage/cc-dryer-chair.png":em,"../assets/items/packs/cottage/cc-dryer-chair.svg":tm,"../assets/items/packs/cottage/cc-fairy-garland.png":nm,"../assets/items/packs/cottage/cc-fairy-garland.svg":sm,"../assets/items/packs/cottage/cc-fairy-shelf.png":om,"../assets/items/packs/cottage/cc-fairy-shelf.svg":im,"../assets/items/packs/cottage/cc-flower-kettle.png":am,"../assets/items/packs/cottage/cc-flower-kettle.svg":rm,"../assets/items/packs/cottage/cc-flower-lamp.png":lm,"../assets/items/packs/cottage/cc-flower-lamp.svg":cm,"../assets/items/packs/cottage/cc-heart-bed.png":gm,"../assets/items/packs/cottage/cc-heart-bed.svg":dm,"../assets/items/packs/cottage/cc-heart-clock.png":pm,"../assets/items/packs/cottage/cc-heart-clock.svg":hm,"../assets/items/packs/cottage/cc-heart-pouf.png":fm,"../assets/items/packs/cottage/cc-heart-pouf.svg":mm,"../assets/items/packs/cottage/cc-heart-rug.png":um,"../assets/items/packs/cottage/cc-heart-rug.svg":ym,"../assets/items/packs/cottage/cc-jewel-box.png":km,"../assets/items/packs/cottage/cc-jewel-box.svg":vm,"../assets/items/packs/cottage/cc-light-vanity.png":bm,"../assets/items/packs/cottage/cc-light-vanity.svg":wm,"../assets/items/packs/cottage/cc-macaron-jar.png":_m,"../assets/items/packs/cottage/cc-macaron-jar.svg":xm,"../assets/items/packs/cottage/cc-macrame-swing.png":$m,"../assets/items/packs/cottage/cc-macrame-swing.svg":Mm,"../assets/items/packs/cottage/cc-mani-chair.png":Lm,"../assets/items/packs/cottage/cc-mani-chair.svg":Bm,"../assets/items/packs/cottage/cc-mint-fridge.png":Cm,"../assets/items/packs/cottage/cc-mint-fridge.svg":Sm,"../assets/items/packs/cottage/cc-mushroom-stool.png":Wm,"../assets/items/packs/cottage/cc-mushroom-stool.svg":Um,"../assets/items/packs/cottage/cc-pastel-range.png":Tm,"../assets/items/packs/cottage/cc-pastel-range.svg":Pm,"../assets/items/packs/cottage/cc-perfume-tray.png":zm,"../assets/items/packs/cottage/cc-perfume-tray.svg":Em,"../assets/items/packs/cottage/cc-petal-table.png":Hm,"../assets/items/packs/cottage/cc-petal-table.svg":Am,"../assets/items/packs/cottage/cc-plant-wall.png":Rm,"../assets/items/packs/cottage/cc-plant-wall.svg":Dm,"../assets/items/packs/cottage/cc-reading-nook.png":Im,"../assets/items/packs/cottage/cc-reading-nook.svg":Nm,"../assets/items/packs/cottage/cc-record-player.png":Om,"../assets/items/packs/cottage/cc-record-player.svg":qm,"../assets/items/packs/cottage/cc-ribbon-mirror.png":jm,"../assets/items/packs/cottage/cc-ribbon-mirror.svg":Vm,"../assets/items/packs/cottage/cc-scallop-curtains.png":Fm,"../assets/items/packs/cottage/cc-scallop-curtains.svg":Zm,"../assets/items/packs/cottage/cc-scallop-loveseat.png":Qm,"../assets/items/packs/cottage/cc-scallop-loveseat.svg":Gm,"../assets/items/packs/cottage/cc-star-dresser.png":Km,"../assets/items/packs/cottage/cc-star-dresser.svg":Ym,"../assets/items/packs/cottage/cc-teapot-set.png":Xm,"../assets/items/packs/cottage/cc-teapot-set.svg":Jm,"../assets/items/packs/cottage/cc-window-seat.png":eu,"../assets/items/packs/cottage/cc-window-seat.svg":tu,"../assets/items/packs/glossy/arched-shelf.png":nu,"../assets/items/packs/glossy/arched-shelf.svg":su,"../assets/items/packs/glossy/blob-rug.png":ou,"../assets/items/packs/glossy/blob-rug.svg":iu,"../assets/items/packs/glossy/bubbly-plant.png":au,"../assets/items/packs/glossy/bubbly-plant.svg":ru,"../assets/items/packs/glossy/bud-vase.png":lu,"../assets/items/packs/glossy/bud-vase.svg":cu,"../assets/items/packs/glossy/comb-brush.png":gu,"../assets/items/packs/glossy/comb-brush.svg":du,"../assets/items/packs/glossy/cream-jars.png":pu,"../assets/items/packs/glossy/cream-jars.svg":hu,"../assets/items/packs/glossy/drop-lamp.png":fu,"../assets/items/packs/glossy/drop-lamp.svg":mu,"../assets/items/packs/glossy/droplet-buddy.png":uu,"../assets/items/packs/glossy/droplet-buddy.svg":yu,"../assets/items/packs/glossy/fancy-sofa.png":ku,"../assets/items/packs/glossy/fancy-sofa.svg":vu,"../assets/items/packs/glossy/flower-cart.png":bu,"../assets/items/packs/glossy/flower-cart.svg":wu,"../assets/items/packs/glossy/foot-spa.png":_u,"../assets/items/packs/glossy/foot-spa.svg":xu,"../assets/items/packs/glossy/globe-pendants.png":$u,"../assets/items/packs/glossy/globe-pendants.svg":Mu,"../assets/items/packs/glossy/glow-mirror.png":Lu,"../assets/items/packs/glossy/glow-mirror.svg":Bu,"../assets/items/packs/glossy/gold-floor-mirror.png":Cu,"../assets/items/packs/glossy/gold-floor-mirror.svg":Su,"../assets/items/packs/glossy/hair-dryer.png":Wu,"../assets/items/packs/glossy/hair-dryer.svg":Uu,"../assets/items/packs/glossy/heart-plant.png":Tu,"../assets/items/packs/glossy/heart-plant.svg":Pu,"../assets/items/packs/glossy/heart-pouf.png":zu,"../assets/items/packs/glossy/heart-pouf.svg":Eu,"../assets/items/packs/glossy/lilac-curtain.png":Hu,"../assets/items/packs/glossy/lilac-curtain.svg":Au,"../assets/items/packs/glossy/lotion-trio.png":Ru,"../assets/items/packs/glossy/lotion-trio.svg":Du,"../assets/items/packs/glossy/mani-lamp.png":Iu,"../assets/items/packs/glossy/mani-lamp.svg":Nu,"../assets/items/packs/glossy/nail-table.png":Ou,"../assets/items/packs/glossy/nail-table.svg":qu,"../assets/items/packs/glossy/pebble-rug.png":ju,"../assets/items/packs/glossy/pebble-rug.svg":Vu,"../assets/items/packs/glossy/perfume-bottle.png":Fu,"../assets/items/packs/glossy/perfume-bottle.svg":Zu,"../assets/items/packs/glossy/pink-fountain.png":Qu,"../assets/items/packs/glossy/pink-fountain.svg":Gu,"../assets/items/packs/glossy/pink-vanity.png":Ku,"../assets/items/packs/glossy/pink-vanity.svg":Yu,"../assets/items/packs/glossy/polish-bottle.png":Xu,"../assets/items/packs/glossy/polish-bottle.svg":Ju,"../assets/items/packs/glossy/polish-rack.png":e0,"../assets/items/packs/glossy/polish-rack.svg":t0,"../assets/items/packs/glossy/reception-desk.png":n0,"../assets/items/packs/glossy/reception-desk.svg":s0,"../assets/items/packs/glossy/salon-chair.png":o0,"../assets/items/packs/glossy/salon-chair.svg":i0,"../assets/items/packs/glossy/scent-candle.png":a0,"../assets/items/packs/glossy/scent-candle.svg":r0,"../assets/items/packs/glossy/spray-bottle.png":l0,"../assets/items/packs/glossy/spray-bottle.svg":c0,"../assets/items/packs/glossy/star-wall-sign.png":g0,"../assets/items/packs/glossy/star-wall-sign.svg":d0,"../assets/items/packs/glossy/swivel-stool.png":p0,"../assets/items/packs/glossy/swivel-stool.svg":h0,"../assets/items/packs/glossy/tiered-tray.png":f0,"../assets/items/packs/glossy/tiered-tray.svg":m0,"../assets/items/packs/glossy/towel-cart.png":u0,"../assets/items/packs/glossy/towel-cart.svg":y0,"../assets/items/packs/glossy/towel-stack.png":k0,"../assets/items/packs/glossy/towel-stack.svg":v0,"../assets/items/packs/glossy/vine-planter.png":b0,"../assets/items/packs/glossy/vine-planter.svg":w0,"../assets/items/packs/glossy/waiting-bench.png":_0,"../assets/items/packs/glossy/waiting-bench.svg":x0,"../assets/items/packs/glossy/wash-chair.png":$0,"../assets/items/packs/glossy/wash-chair.svg":M0,"../assets/items/packs/sunny-vibes/arched-mirror.png":L0,"../assets/items/packs/sunny-vibes/arched-mirror.svg":B0,"../assets/items/packs/sunny-vibes/big-monitor.png":C0,"../assets/items/packs/sunny-vibes/big-monitor.svg":S0,"../assets/items/packs/sunny-vibes/boba-cup.png":W0,"../assets/items/packs/sunny-vibes/boba-cup.svg":U0,"../assets/items/packs/sunny-vibes/bubble-bath.png":T0,"../assets/items/packs/sunny-vibes/bubble-bath.svg":P0,"../assets/items/packs/sunny-vibes/cactus-buddy.png":z0,"../assets/items/packs/sunny-vibes/cactus-buddy.svg":E0,"../assets/items/packs/sunny-vibes/caterpillar-plush.png":H0,"../assets/items/packs/sunny-vibes/caterpillar-plush.svg":A0,"../assets/items/packs/sunny-vibes/checker-bed.png":R0,"../assets/items/packs/sunny-vibes/checker-bed.svg":D0,"../assets/items/packs/sunny-vibes/checker-rug.png":I0,"../assets/items/packs/sunny-vibes/checker-rug.svg":N0,"../assets/items/packs/sunny-vibes/clothes-rail.png":O0,"../assets/items/packs/sunny-vibes/clothes-rail.svg":q0,"../assets/items/packs/sunny-vibes/cloud-sofa.png":j0,"../assets/items/packs/sunny-vibes/cloud-sofa.svg":V0,"../assets/items/packs/sunny-vibes/cube-shelf.png":F0,"../assets/items/packs/sunny-vibes/cube-shelf.svg":Z0,"../assets/items/packs/sunny-vibes/curvy-desk.png":Q0,"../assets/items/packs/sunny-vibes/curvy-desk.svg":G0,"../assets/items/packs/sunny-vibes/cute-speaker.png":K0,"../assets/items/packs/sunny-vibes/cute-speaker.svg":Y0,"../assets/items/packs/sunny-vibes/desk-lamp.png":X0,"../assets/items/packs/sunny-vibes/desk-lamp.svg":J0,"../assets/items/packs/sunny-vibes/desk-mic.png":ey,"../assets/items/packs/sunny-vibes/desk-mic.svg":ty,"../assets/items/packs/sunny-vibes/flower-lamp.png":ny,"../assets/items/packs/sunny-vibes/flower-lamp.svg":sy,"../assets/items/packs/sunny-vibes/frog-plush.png":oy,"../assets/items/packs/sunny-vibes/frog-plush.svg":iy,"../assets/items/packs/sunny-vibes/game-controller.png":ay,"../assets/items/packs/sunny-vibes/game-controller.svg":ry,"../assets/items/packs/sunny-vibes/gaming-chair.png":ly,"../assets/items/packs/sunny-vibes/gaming-chair.svg":cy,"../assets/items/packs/sunny-vibes/hamster-pet.png":gy,"../assets/items/packs/sunny-vibes/hamster-pet.svg":dy,"../assets/items/packs/sunny-vibes/headphones.png":py,"../assets/items/packs/sunny-vibes/headphones.svg":hy,"../assets/items/packs/sunny-vibes/heart-light.png":fy,"../assets/items/packs/sunny-vibes/heart-light.svg":my,"../assets/items/packs/sunny-vibes/keyboard.png":uy,"../assets/items/packs/sunny-vibes/keyboard.svg":yy,"../assets/items/packs/sunny-vibes/mini-fridge.png":ky,"../assets/items/packs/sunny-vibes/mini-fridge.svg":vy,"../assets/items/packs/sunny-vibes/pastel-wardrobe.png":by,"../assets/items/packs/sunny-vibes/pastel-wardrobe.svg":wy,"../assets/items/packs/sunny-vibes/phone-stand.png":_y,"../assets/items/packs/sunny-vibes/phone-stand.svg":xy,"../assets/items/packs/sunny-vibes/pothos-plant.png":$y,"../assets/items/packs/sunny-vibes/pothos-plant.svg":My,"../assets/items/packs/sunny-vibes/puffy-stool.png":Ly,"../assets/items/packs/sunny-vibes/puffy-stool.svg":By,"../assets/items/packs/sunny-vibes/ring-light.png":Cy,"../assets/items/packs/sunny-vibes/ring-light.svg":Sy,"../assets/items/packs/sunny-vibes/side-table-round.png":Wy,"../assets/items/packs/sunny-vibes/side-table-round.svg":Uy,"../assets/items/packs/sunny-vibes/star-lamp.png":Ty,"../assets/items/packs/sunny-vibes/star-lamp.svg":Py,"../assets/items/packs/sunny-vibes/sticker-board.png":zy,"../assets/items/packs/sunny-vibes/sticker-board.svg":Ey,"../assets/items/packs/sunny-vibes/sunny-art.png":Hy,"../assets/items/packs/sunny-vibes/sunny-art.svg":Ay,"../assets/items/packs/sunny-vibes/sv-bean-bag.png":Ry,"../assets/items/packs/sunny-vibes/sv-bean-bag.svg":Dy,"../assets/items/packs/sunny-vibes/sv-cloud-rug.png":Iy,"../assets/items/packs/sunny-vibes/sv-cloud-rug.svg":Ny,"../assets/items/packs/sunny-vibes/sv-wall-shelf.png":Oy,"../assets/items/packs/sunny-vibes/sv-wall-shelf.svg":qy,"../assets/items/packs/sunny-vibes/vlog-camera.png":jy,"../assets/items/packs/sunny-vibes/vlog-camera.svg":Vy,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.png":Fy,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.svg":Zy,"../assets/items/packs/welcome-home/acorn-friend.png":Qy,"../assets/items/packs/welcome-home/acorn-friend.svg":Gy,"../assets/items/packs/welcome-home/apple-tree.png":Ky,"../assets/items/packs/welcome-home/apple-tree.svg":Yy,"../assets/items/packs/welcome-home/big-wardrobe.png":Xy,"../assets/items/packs/welcome-home/big-wardrobe.svg":Jy,"../assets/items/packs/welcome-home/box-stack.png":e1,"../assets/items/packs/welcome-home/box-stack.svg":t1,"../assets/items/packs/welcome-home/brick-fireplace.png":n1,"../assets/items/packs/welcome-home/brick-fireplace.svg":s1,"../assets/items/packs/welcome-home/bulletin-board.png":o1,"../assets/items/packs/welcome-home/bulletin-board.svg":i1,"../assets/items/packs/welcome-home/cozy-mug.png":a1,"../assets/items/packs/welcome-home/cozy-mug.svg":r1,"../assets/items/packs/welcome-home/cream-sofa.png":l1,"../assets/items/packs/welcome-home/cream-sofa.svg":c1,"../assets/items/packs/welcome-home/fire-pit.png":g1,"../assets/items/packs/welcome-home/fire-pit.svg":d1,"../assets/items/packs/welcome-home/glass-cabinet.png":p1,"../assets/items/packs/welcome-home/glass-cabinet.svg":h1,"../assets/items/packs/welcome-home/hanging-lantern.png":f1,"../assets/items/packs/welcome-home/hanging-lantern.svg":m1,"../assets/items/packs/welcome-home/knit-cushion.png":u1,"../assets/items/packs/welcome-home/knit-cushion.svg":y1,"../assets/items/packs/welcome-home/ladder-shelf.png":k1,"../assets/items/packs/welcome-home/ladder-shelf.svg":v1,"../assets/items/packs/welcome-home/landscape-art.png":b1,"../assets/items/packs/welcome-home/landscape-art.svg":w1,"../assets/items/packs/welcome-home/lattice-bench.png":_1,"../assets/items/packs/welcome-home/lattice-bench.svg":x1,"../assets/items/packs/welcome-home/leaf-wreath.png":$1,"../assets/items/packs/welcome-home/leaf-wreath.svg":M1,"../assets/items/packs/welcome-home/mini-greenhouse.png":L1,"../assets/items/packs/welcome-home/mini-greenhouse.svg":B1,"../assets/items/packs/welcome-home/moving-box.png":C1,"../assets/items/packs/welcome-home/moving-box.svg":S1,"../assets/items/packs/welcome-home/picnic-basket.png":W1,"../assets/items/packs/welcome-home/picnic-basket.svg":U1,"../assets/items/packs/welcome-home/round-rug.png":T1,"../assets/items/packs/welcome-home/round-rug.svg":P1,"../assets/items/packs/welcome-home/sale-sign.png":z1,"../assets/items/packs/welcome-home/sale-sign.svg":E1,"../assets/items/packs/welcome-home/sprout-pot.png":H1,"../assets/items/packs/welcome-home/sprout-pot.svg":A1,"../assets/items/packs/welcome-home/stripe-runner.png":R1,"../assets/items/packs/welcome-home/stripe-runner.svg":D1,"../assets/items/packs/welcome-home/trailing-plant.png":I1,"../assets/items/packs/welcome-home/trailing-plant.svg":N1,"../assets/items/packs/welcome-home/wall-clock.png":O1,"../assets/items/packs/welcome-home/wall-clock.svg":q1,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.png":j1,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.svg":V1,"../assets/items/packs/welcome-home/wh-book-stack.png":F1,"../assets/items/packs/welcome-home/wh-book-stack.svg":Z1,"../assets/items/packs/welcome-home/wh-dresser.png":Q1,"../assets/items/packs/welcome-home/wh-dresser.svg":G1,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.png":K1,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.svg":Y1,"../assets/items/packs/welcome-home/wh-kitchen-counter.png":X1,"../assets/items/packs/welcome-home/wh-kitchen-counter.svg":J1,"../assets/items/packs/welcome-home/wh-nightstand.png":ek,"../assets/items/packs/welcome-home/wh-nightstand.svg":tk,"../assets/items/packs/welcome-home/wh-pendant-lamp.png":nk,"../assets/items/packs/welcome-home/wh-pendant-lamp.svg":sk,"../assets/items/packs/welcome-home/wh-snake-plant.png":ok,"../assets/items/packs/welcome-home/wh-snake-plant.svg":ik,"../assets/items/packs/welcome-home/wh-string-lights.png":ak,"../assets/items/packs/welcome-home/wh-string-lights.svg":rk,"../assets/items/packs/welcome-home/wh-teapot.png":lk,"../assets/items/packs/welcome-home/wh-teapot.svg":ck,"../assets/items/packs/welcome-home/wood-armchair.png":gk,"../assets/items/packs/welcome-home/wood-armchair.svg":dk,"../assets/items/packs/welcome-home/wood-bookshelf.png":pk,"../assets/items/packs/welcome-home/wood-bookshelf.svg":hk,"../assets/items/packs/welcome-home/wood-coffee-table.png":fk,"../assets/items/packs/welcome-home/wood-coffee-table.svg":mk,"../assets/items/packs/welcome-home/wood-desk.png":uk,"../assets/items/packs/welcome-home/wood-desk.svg":yk,"../assets/items/packs/welcome-home/wood-stool.png":kk,"../assets/items/packs/welcome-home/wood-stool.svg":vk,"../assets/items/packs/welcome-home/wooden-bed.png":bk,"../assets/items/packs/welcome-home/wooden-bed.svg":wk}),ca=Object.assign({"../assets/patterns/cottage/cc-butter-polka.png":_k,"../assets/patterns/cottage/cc-butter-polka.svg":xk,"../assets/patterns/cottage/cc-cream-hex.png":$k,"../assets/patterns/cottage/cc-cream-hex.svg":Mk,"../assets/patterns/cottage/cc-lavender-lattice.png":Lk,"../assets/patterns/cottage/cc-lavender-lattice.svg":Bk,"../assets/patterns/cottage/cc-lilac-gingham.png":Ck,"../assets/patterns/cottage/cc-lilac-gingham.svg":Sk,"../assets/patterns/cottage/cc-mint-checks.png":Wk,"../assets/patterns/cottage/cc-mint-checks.svg":Uk,"../assets/patterns/cottage/cc-mint-florals.png":Tk,"../assets/patterns/cottage/cc-mint-florals.svg":Pk,"../assets/patterns/cottage/cc-peach-scallops.png":zk,"../assets/patterns/cottage/cc-peach-scallops.svg":Ek,"../assets/patterns/cottage/cc-pink-plaid.png":Hk,"../assets/patterns/cottage/cc-pink-plaid.svg":Ak,"../assets/patterns/cottage/cc-rag-planks.png":Rk,"../assets/patterns/cottage/cc-rag-planks.svg":Dk,"../assets/patterns/cottage/cc-rose-herringbone.png":Ik,"../assets/patterns/cottage/cc-rose-herringbone.svg":Nk,"../assets/patterns/glossy/lilac-stripes.png":Ok,"../assets/patterns/glossy/lilac-stripes.svg":qk,"../assets/patterns/glossy/lilac-terrazzo.png":jk,"../assets/patterns/glossy/lilac-terrazzo.svg":Vk,"../assets/patterns/glossy/mint-bubbles.png":Fk,"../assets/patterns/glossy/mint-bubbles.svg":Zk,"../assets/patterns/glossy/pink-check-floor.png":Qk,"../assets/patterns/glossy/pink-check-floor.svg":Gk,"../assets/patterns/glossy/pink-hearts.png":Kk,"../assets/patterns/glossy/pink-hearts.svg":Yk,"../assets/patterns/nursery/cloud-sky.svg":Xk,"../assets/patterns/nursery/pastel-planks.svg":Jk,"../assets/patterns/nursery/soft-carpet.svg":ev,"../assets/patterns/nursery/star-sprinkle.svg":tv,"../assets/patterns/nursery/tiny-hearts.svg":nv,"../assets/patterns/sunny-vibes/butter-check-floor.png":sv,"../assets/patterns/sunny-vibes/butter-check-floor.svg":ov,"../assets/patterns/sunny-vibes/mint-checks.png":iv,"../assets/patterns/sunny-vibes/mint-checks.svg":av,"../assets/patterns/sunny-vibes/sky-clouds.png":rv,"../assets/patterns/sunny-vibes/sky-clouds.svg":lv,"../assets/patterns/sunny-vibes/sky-tiles.png":cv,"../assets/patterns/sunny-vibes/sky-tiles.svg":gv,"../assets/patterns/sunny-vibes/sunny-stars.png":dv,"../assets/patterns/sunny-vibes/sunny-stars.svg":pv,"../assets/patterns/welcome-home/leafy-cream.png":hv,"../assets/patterns/welcome-home/leafy-cream.svg":fv,"../assets/patterns/welcome-home/orange-gingham.png":mv,"../assets/patterns/welcome-home/orange-gingham.svg":uv,"../assets/patterns/welcome-home/terracotta-tiles.png":yv,"../assets/patterns/welcome-home/terracotta-tiles.svg":kv,"../assets/patterns/welcome-home/wood-panel.png":vv,"../assets/patterns/welcome-home/wood-panel.svg":bv,"../assets/patterns/welcome-home/wood-planks.png":wv,"../assets/patterns/welcome-home/wood-planks.svg":_v});function Mv(e,t){if(!e||!e.trim())return[];try{const n=JSON.parse(e);return(Array.isArray(n)?n:[...Array.isArray(n?.items)?n.items:[],...Array.isArray(n?.patterns)?n.patterns:[]]).filter(o=>o&&typeof o.slug=="string"&&o.slug.trim())}catch(n){return console.warn(`[packs] ${t} is not valid JSON; ignoring`,n),[]}}const pr=Object.entries($v).flatMap(([e,t])=>Mv(t,e)),Lv=["svg","png","webp","SVG","PNG","WEBP"];function hr(e,t,n,s){for(const i of Lv){const a=e[`../assets/${t}/${n}/${s}.${i}`];if(a)return a}const o=Object.keys(e).find(i=>i.split("/").pop().replace(/\.\w+$/,"")===s);return o?e[o]:void 0}const ga={furniture:"furniture",appliance:"furniture",appliances:"furniture",seating:"furniture",storage:"furniture",bed:"furniture",table:"furniture",decor:"decor",rug:"decor",rugs:"decor",lighting:"decor",light:"decor",lamp:"decor",toy:"decor",toys:"decor","wall-art":"decor",art:"decor",beauty:"decor",plant:"plants",plants:"plants",flower:"plants",flowers:"plants",food:"food",drink:"food",drinks:"food",snack:"food",pet:"pets",pets:"pets",animal:"pets",animals:"pets"};function Bv(e){const t=typeof e=="string"?e.trim().toLowerCase():"";return ga[t]??ga[t.replace(/s$/,"")]??"decor"}const un=(e,t)=>typeof e=="string"&&e.trim()?e.trim().toLowerCase():t,fr=e=>["wallpaper","floor"].includes(un(e.type,"")),da=new Set,Cv=pr.filter(e=>!fr(e)).flatMap(e=>{const t=un(e.room,"any"),n=e.slug.trim();if(da.has(n))return[];da.add(n);const o=[e.svg,e.png].filter(u=>typeof u=="string").map(u=>la["../assets/items/"+u.replace(/^\.?\//,"")]).find(Boolean)??hr(la,"items",t,n);if(!o)return console.warn(`[packs] no image for items/${t}/${n}`),[];const i=un(e.pack,""),a=un(e.size,"medium"),r=Bv(e.category),l=typeof e.gameW=="number"&&e.gameW>20&&e.gameW<800?e.gameW:ra[a]??ra.medium,c=typeof e.widthUnits=="number"&&typeof e.heightUnits=="number"&&e.widthUnits>0&&e.heightUnits>0?e.heightUnits/e.widthUnits:1,g=Math.round(l*Math.min(4,Math.max(.2,c))),d=typeof e.holdable=="boolean"?e.holdable:a!=="large"&&r!=="furniture";return[{kind:`pack:${n}`,name:e.name||n,cat:r,rooms:[t],w:l,h:g,wall:e.wall===!0||void 0,svg:"",img:o,pack:i||void 0,holdable:d}]}),Fo=pr.filter(fr).flatMap(e=>{const t=un(e.pack,"extra"),n=e.slug.trim(),o=[e.svg,e.png].filter(i=>typeof i=="string").map(i=>ca["../assets/patterns/"+i.replace(/^\.?\//,"")]).find(Boolean)??hr(ca,"patterns",t,n);return o?[{id:`${t}/${n}`,name:e.name||n,pack:t,kind:un(e.type,"wallpaper"),url:o}]:(console.warn(`[packs] no image for patterns/${t}/${n}`),[])}),pa=Object.fromEntries(Fo.map(e=>[e.id,e])),pt="#5a3d5c",M=`stroke="${pt}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,mr=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="2.4" fill="${pt}"/><circle cx="${t}" cy="${n}" r="2.4" fill="${pt}"/><circle cx="${e+.8}" cy="${n-.8}" r=".8" fill="#fff"/><circle cx="${t+.8}" cy="${n-.8}" r=".8" fill="#fff"/>`,ur=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/><ellipse cx="${t}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/>`,ce='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>';function Mo(e,t,n){return`${ce}<ellipse cx="50" cy="78" rx="28" ry="16" fill="${t}" ${M}/><path d="M24 62 Q50 48 76 62 V78 Q50 92 24 78 Z" fill="${t}" ${M}/>
    <circle cx="50" cy="40" r="18" fill="${e}" ${M}/>${mr(43,57,40)}${ur(38,62,48)}<path d="M46 50 q4 3 8 0" fill="none" ${M}/>
    <path d="M38 26 Q50 16 62 26" fill="${n}" ${M}/><circle cx="50" cy="24" r="3" fill="${n}" ${M}/>`}const yr=[{kind:"crib",name:"Crib",cat:"furniture",w:260,svg:`${ce}<rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${M}/><path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${M}/><rect x="6" y="22" width="88" height="12" rx="6" fill="#9ad7f5" ${M}/><rect x="14" y="48" width="72" height="16" rx="6" fill="#ffe0ec"/><ellipse cx="32" cy="56" rx="8" ry="5" fill="#fff" ${M}/><ellipse cx="50" cy="56" rx="8" ry="5" fill="#c9e7ff" ${M}/>`},{kind:"bassinet",name:"Bassinet",cat:"furniture",w:170,svg:`${ce}<path d="M18 78 Q8 78 10 64 L22 36 H78 L90 64 Q92 78 82 78 Z" fill="#fff" ${M}/><ellipse cx="50" cy="36" rx="32" ry="10" fill="#fff" ${M}/><path d="M22 40 Q50 52 78 40" fill="#ffe0ec" ${M}/><ellipse cx="50" cy="44" rx="16" ry="7" fill="#fff"/><path d="M30 78 L22 94 M70 78 L78 94" ${M}/><ellipse cx="50" cy="90" rx="28" ry="4" fill="none" ${M}/><path d="M14 22 Q50 4 86 22" fill="none" stroke="#9ad7f5" stroke-width="6" stroke-linecap="round"/>`},{kind:"rocker",name:"Rocker",cat:"furniture",w:190,svg:`${ce}<path d="M16 88 Q50 98 84 88" fill="none" ${M}/><path d="M28 84 Q50 74 72 84" fill="#c9a0dc" ${M}/><rect x="30" y="28" width="40" height="36" rx="12" fill="#e4ccf2" ${M}/><path d="M22 48 Q18 70 30 80 H70 Q82 70 78 48 Z" fill="#f6e6ff" ${M}/><rect x="36" y="58" width="28" height="12" rx="6" fill="#ffc8dd" ${M}/><circle cx="50" cy="40" r="6" fill="#fff" opacity=".7"/>`},{kind:"changing-table",name:"Changing Table",cat:"furniture",w:230,svg:`${ce}<rect x="8" y="36" width="84" height="16" rx="8" fill="#fff" ${M}/><rect x="14" y="40" width="72" height="8" rx="4" fill="#ffd6e8"/><rect x="16" y="52" width="28" height="32" rx="6" fill="#bde0fe" ${M}/><rect x="56" y="52" width="28" height="32" rx="6" fill="#c9f0d8" ${M}/><path d="M22 60 H38 M22 68 H38 M62 60 H78 M62 68 H78" ${M}/><rect x="18" y="84" width="8" height="10" rx="2" fill="${pt}"/><rect x="74" y="84" width="8" height="10" rx="2" fill="${pt}"/><rect x="34" y="22" width="18" height="12" rx="3" fill="#ffe0ec" ${M}/><rect x="54" y="24" width="16" height="10" rx="3" fill="#fff6d8" ${M}/>`},{kind:"toy-bin",name:"Toy Bin",cat:"furniture",w:150,svg:`${ce}<path d="M14 40 H86 L78 90 H22 Z" fill="#ffd166" ${M}/><rect x="10" y="32" width="80" height="14" rx="7" fill="#ffe08a" ${M}/><circle cx="36" cy="58" r="8" fill="#ff8fab" ${M}/><rect x="50" y="50" width="16" height="16" rx="3" fill="#8ecae6" ${M}/><circle cx="62" cy="70" r="6" fill="#90e0a8" ${M}/>`},{kind:"baby-shelf",name:"Bookshelf",cat:"furniture",w:150,svg:`${ce}<rect x="14" y="8" width="72" height="84" rx="8" fill="#f3d2b5" ${M}/><path d="M14 36 H86 M14 64 H86" ${M}/><rect x="22" y="14" width="8" height="18" rx="2" fill="#ff8fab" ${M}/><rect x="32" y="18" width="8" height="14" rx="2" fill="#8ecae6" ${M}/><rect x="44" y="14" width="8" height="18" rx="2" fill="#ffd166" ${M}/><rect x="58" y="16" width="8" height="16" rx="2" fill="#90e0a8" ${M}/><circle cx="34" cy="50" r="7" fill="#ffadad" ${M}/><rect x="50" y="44" width="18" height="14" rx="3" fill="#c9a0dc" ${M}/><ellipse cx="40" cy="78" rx="14" ry="8" fill="#fff" ${M}/>`},{kind:"doll-rose",name:"Rose Doll",cat:"decor",w:80,svg:Mo("#f6d3b0","#ffc2d4","#ff8fab")},{kind:"doll-honey",name:"Honey Doll",cat:"decor",w:80,svg:Mo("#e0ac69","#cdeffd","#ffd166")},{kind:"doll-cocoa",name:"Cocoa Doll",cat:"decor",w:80,svg:Mo("#8d5524","#d8f3dc","#c9a0dc")},{kind:"crib-mobile",name:"Crib Mobile",cat:"decor",w:150,wall:!0,svg:`<path d="M50 6 V22" ${M}/><ellipse cx="50" cy="28" rx="28" ry="8" fill="#fff" ${M}/><path d="M28 32 V48 M50 36 V58 M72 32 V48" ${M}/><circle cx="28" cy="56" r="8" fill="#ffd166" ${M}/><circle cx="50" cy="68" r="9" fill="#ff8fab" ${M}/><path d="M72 56 l6 4 -6 4 -6 -4 z" fill="#8ecae6" ${M}/><circle cx="28" cy="54" r="2" fill="#fff"/><circle cx="50" cy="66" r="2" fill="#fff"/>`},{kind:"night-light",name:"Night Light",cat:"decor",w:70,svg:`${ce}<circle cx="50" cy="46" r="22" fill="#fff6c8" ${M}/><circle cx="50" cy="46" r="12" fill="#ffe08a"/><path d="M50 18 V10 M30 26 L24 20 M70 26 L76 20 M24 46 H14 M86 46 H76" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><rect x="40" y="70" width="20" height="16" rx="4" fill="#c9a0dc" ${M}/><circle cx="50" cy="78" r="3" fill="#ff8fab"/>`},{kind:"bunny-plush",name:"Bunny Plush",cat:"decor",w:90,svg:`${ce}<ellipse cx="34" cy="28" rx="8" ry="18" fill="#fff" ${M}/><ellipse cx="66" cy="28" rx="8" ry="18" fill="#fff" ${M}/><ellipse cx="34" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="66" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="50" cy="74" rx="26" ry="18" fill="#fff" ${M}/><circle cx="50" cy="50" r="20" fill="#fff" ${M}/>${mr(43,57,50)}<path d="M47 58 l3 3 3 -3" fill="none" ${M}/>${ur(38,62,58)}`},{kind:"stacking-rings",name:"Stacking Rings",cat:"decor",w:70,svg:`${ce}<ellipse cx="50" cy="86" rx="26" ry="7" fill="#ff8fab" ${M}/><ellipse cx="50" cy="74" rx="20" ry="6" fill="#ffd166" ${M}/><ellipse cx="50" cy="64" rx="15" ry="5" fill="#8ecae6" ${M}/><ellipse cx="50" cy="56" rx="10" ry="4" fill="#90e0a8" ${M}/><rect x="46" y="28" width="8" height="40" rx="4" fill="#c9a0dc" ${M}/><circle cx="50" cy="24" r="7" fill="#ffb3c6" ${M}/>`},{kind:"rattle",name:"Rattle",cat:"decor",w:60,svg:`${ce}<circle cx="38" cy="40" r="20" fill="#ffd166" ${M}/><circle cx="32" cy="34" r="5" fill="#fff" opacity=".7"/><rect x="50" y="52" width="10" height="28" rx="5" fill="#ff8fab" ${M} transform="rotate(-20 55 66)"/><circle cx="68" cy="82" r="8" fill="#8ecae6" ${M}/>`},{kind:"baby-bottle",name:"Baby Bottle",cat:"food",w:55,svg:`${ce}<rect x="36" y="8" width="28" height="12" rx="4" fill="#c9a0dc" ${M}/><rect x="42" y="18" width="16" height="8" fill="#fff" ${M}/><path d="M30 30 H70 L66 88 Q50 96 34 88 Z" fill="#e7f6ff" ${M}/><path d="M32 48 H68 L66 80 Q50 88 34 80 Z" fill="#fff" opacity=".85"/><rect x="34" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="46" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="58" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/>`},{kind:"blocks",name:"Baby Blocks",cat:"decor",w:90,svg:`${ce}<rect x="14" y="58" width="28" height="28" rx="4" fill="#ff8fab" ${M}/><rect x="40" y="46" width="28" height="28" rx="4" fill="#ffd166" ${M}/><rect x="28" y="28" width="26" height="26" rx="4" fill="#8ecae6" ${M}/><path d="M20 72 H36 M48 60 H62 M34 42 H48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"rocking-horse",name:"Little Rocking Horse",cat:"decor",w:180,svg:`${ce}<path d="M12 86 Q50 98 88 82" fill="none" ${M}/><ellipse cx="48" cy="62" rx="26" ry="14" fill="#e6b88a" ${M}/><path d="M62 58 L84 40 Q92 36 90 48 L74 64 Z" fill="#f0d0b0" ${M}/><circle cx="82" cy="42" r="3" fill="${pt}"/><path d="M70 36 L76 24 L84 34" fill="#ff8fab" ${M}/><rect x="36" y="48" width="16" height="8" rx="3" fill="#c9a0dc" ${M}/><path d="M30 70 L22 84 M58 72 L66 86" ${M}/>`},{kind:"music-box",name:"Music Box",cat:"decor",w:80,svg:`${ce}<rect x="22" y="40" width="56" height="46" rx="8" fill="#f6d6ff" ${M}/><path d="M22 40 L50 22 L78 40" fill="#e4ccf2" ${M}/><circle cx="50" cy="64" r="10" fill="#fff" ${M}/><path d="M50 58 V70 M44 64 H56" ${M}/><circle cx="50" cy="30" r="4" fill="#ffd166" ${M}/>`},{kind:"cloud-rug",name:"Nursery Cloud Rug",cat:"decor",w:340,svg:`<ellipse cx="50" cy="78" rx="46" ry="16" fill="#e7f6ff" ${M}/><circle cx="28" cy="70" r="16" fill="#f4fbff" ${M}/><circle cx="50" cy="62" r="18" fill="#fff" ${M}/><circle cx="72" cy="70" r="16" fill="#f4fbff" ${M}/><ellipse cx="50" cy="78" rx="30" ry="8" fill="#d6f0ff"/>`},{kind:"play-mat",name:"Play Mat",cat:"decor",w:300,svg:`<rect x="6" y="62" width="88" height="30" rx="14" fill="#ffe0ec" ${M}/><path d="M50 70 C42 62 30 64 34 74 C38 82 50 88 50 88 C50 88 62 82 66 74 C70 64 58 62 50 70 Z" fill="#ff8fab" ${M}/><circle cx="22" cy="76" r="5" fill="#ffd166" ${M}/><circle cx="78" cy="76" r="5" fill="#8ecae6" ${M}/>`},{kind:"moon-art",name:"Moon and Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M58 18 A28 28 0 1 0 58 78 A18 18 0 1 1 58 18 Z" fill="#fff3b0" ${M}/><path d="M22 30 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1 z" fill="#ffd166" ${M}/><path d="M78 58 l2 5 5 1 -4 4 1 5 -4 -3 -4 3 1 -5 -4 -4 5 -1 z" fill="#c9e7ff" ${M}/>`},{kind:"nursery-dresser",name:"Nursery Dresser",cat:"furniture",w:170,svg:`${ce}<rect x="14" y="22" width="72" height="68" rx="8" fill="#f6e2c4" ${M}/><path d="M14 44 H86 M14 66 H86" ${M}/><circle cx="50" cy="34" r="3" fill="${pt}"/><circle cx="50" cy="55" r="3" fill="${pt}"/><circle cx="50" cy="76" r="3" fill="${pt}"/><rect x="30" y="10" width="18" height="12" rx="3" fill="#ffc2d4" ${M}/><rect x="52" y="12" width="16" height="10" rx="3" fill="#c9e7ff" ${M}/>`},{kind:"nursery-lamp",name:"Nursery Lamp",cat:"decor",w:80,svg:`${ce}<path d="M28 42 L36 12 H64 L72 42 Z" fill="#fff6c8" ${M}/><rect x="46" y="42" width="8" height="40" rx="4" fill="#c9a0dc" ${M}/><ellipse cx="50" cy="88" rx="20" ry="6" fill="#b388d6" ${M}/><circle cx="46" cy="24" r="3" fill="#fff" opacity=".85"/><path d="M34 20 q6 -8 4 -2" fill="none" stroke="#ffd166" stroke-width="2"/>`},{kind:"nursery-curtains",name:"Curtains",cat:"decor",w:180,wall:!0,svg:`<rect x="16" y="10" width="68" height="50" rx="6" fill="#cfefff" ${M}/><path d="M50 10 V60 M16 34 H84" ${M}/><path d="M8 8 Q18 28 10 92" fill="#ffd6e8" ${M}/><path d="M92 8 Q82 28 90 92" fill="#ffd6e8" ${M}/><rect x="6" y="6" width="88" height="8" rx="3" fill="#f3d2b5" ${M}/>`}],G="#5a3d5c",m=`stroke="${G}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,gn=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${G}"/><circle cx="${t}" cy="${n}" r="3" fill="${G}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,hs=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,Q='<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>',vt=[{kind:"sofa",name:"Sofa",cat:"furniture",w:260,svg:`${Q}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${m}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${m}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${m}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${m}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${m}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${G}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${G}"/>`},{kind:"armchair",name:"Armchair",cat:"furniture",w:150,svg:`${Q}<rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${m}/><rect x="6" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${m}/><rect x="72" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${m}/><rect x="24" y="58" width="52" height="24" rx="10" fill="#b8e0f2" ${m}/><rect x="20" y="86" width="6" height="10" rx="2" fill="${G}"/><rect x="74" y="86" width="6" height="10" rx="2" fill="${G}"/>`},{kind:"bed",name:"Bed",cat:"furniture",w:300,svg:`${Q}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${m}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${m}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${m}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${m}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${m}/>`},{kind:"table",name:"Table",cat:"furniture",w:200,svg:`${Q}<rect x="4" y="30" width="92" height="14" rx="7" fill="#f4a261" ${m}/><rect x="14" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${m}/><rect x="76" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${m}/><path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".5"/>`},{kind:"chair",name:"Chair",cat:"furniture",w:100,svg:`${Q}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${m}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${m}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${m}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${m}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/>`},{kind:"lamp",name:"Lamp",cat:"furniture",w:90,svg:`${Q}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${m}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${m}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${m}/><circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>`},{kind:"fridge",name:"Fridge",cat:"furniture",w:150,svg:`${Q}<rect x="16" y="4" width="68" height="90" rx="14" fill="#bde0fe" ${m}/><path d="M16 38 H84" ${m}/><rect x="70" y="14" width="5" height="16" rx="2" fill="${G}"/><rect x="70" y="46" width="5" height="22" rx="2" fill="${G}"/><circle cx="32" cy="22" r="5" fill="#ff8fab" ${m}/><rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${m}/>`},{kind:"stove",name:"Stove",cat:"furniture",w:170,svg:`${Q}<rect x="8" y="26" width="84" height="68" rx="12" fill="#ffadad" ${m}/><rect x="8" y="18" width="84" height="14" rx="6" fill="#ffd6a5" ${m}/><rect x="20" y="46" width="60" height="36" rx="8" fill="#5a3d5c" opacity=".85"/><rect x="26" y="52" width="48" height="8" rx="4" fill="#fff" opacity=".25"/><circle cx="22" cy="38" r="3" fill="${G}"/><circle cx="36" cy="38" r="3" fill="${G}"/><circle cx="78" cy="38" r="3" fill="${G}"/>`},{kind:"bookshelf",name:"Shelf",cat:"furniture",w:170,svg:`${Q}<rect x="10" y="4" width="80" height="90" rx="10" fill="#d4a373" ${m}/><path d="M10 34 H90 M10 64 H90" ${m}/><rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${m}/><rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${m}/><rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${m}/><rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${m}/><rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${m}/><circle cx="34" cy="80" r="8" fill="#ffadad" ${m}/>`},{kind:"tub",name:"Bathtub",cat:"furniture",w:240,svg:`${Q}<circle cx="30" cy="40" r="7" fill="#bde0fe" ${m}/><circle cx="44" cy="34" r="9" fill="#e0f2ff" ${m}/><circle cx="60" cy="40" r="7" fill="#bde0fe" ${m}/><path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${m}/><rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${m}/><rect x="22" y="88" width="8" height="8" rx="2" fill="${G}"/><rect x="70" y="88" width="8" height="8" rx="2" fill="${G}"/>`},{kind:"rug",name:"Rug",cat:"decor",w:320,svg:`<ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${m}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${m}/><ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${m}/>`},{kind:"picture",name:"Picture",cat:"decor",w:130,wall:!0,svg:`<rect x="10" y="20" width="80" height="64" rx="8" fill="#ffd166" ${m}/><rect x="18" y="28" width="64" height="48" rx="4" fill="#bde0fe"/><circle cx="66" cy="40" r="7" fill="#fff3b0"/><path d="M18 76 L38 50 L52 64 L62 54 L82 76 Z" fill="#90e0a8" ${m}/>`},{kind:"window",name:"Window",cat:"decor",w:180,wall:!0,svg:`<rect x="12" y="8" width="76" height="76" rx="38" fill="#a2d2ff" ${m}/><path d="M50 8 V84 M12 50 H88" ${m}/><circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/><path d="M4 8 Q20 40 10 90 M96 8 Q80 40 90 90" stroke="#ff8fab" stroke-width="9" fill="none" stroke-linecap="round"/>`},{kind:"clock",name:"Clock",cat:"decor",w:90,wall:!0,svg:`<circle cx="50" cy="50" r="38" fill="#fff" ${m}/><circle cx="50" cy="50" r="30" fill="#fff3b0"/><path d="M50 50 V28 M50 50 L64 58" ${m}/><circle cx="50" cy="50" r="3" fill="${G}"/>${hs(30,70,66)}`},{kind:"stars",name:"Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M30 20 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffd166" ${m}/><path d="M70 40 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#ffadad" ${m}/><path d="M40 66 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#a2d2ff" ${m}/>`},{kind:"balloon",name:"Balloons",cat:"decor",w:110,svg:`<path d="M38 52 Q44 74 50 96 M64 46 Q58 72 50 96" stroke="${G}" stroke-width="2" fill="none"/><ellipse cx="36" cy="32" rx="18" ry="22" fill="#ff8fab" ${m}/><ellipse cx="66" cy="28" rx="18" ry="22" fill="#a2d2ff" ${m}/><ellipse cx="30" cy="24" rx="4" ry="7" fill="#fff" opacity=".6"/>`},{kind:"teddy",name:"Teddy",cat:"decor",w:100,svg:`${Q}<circle cx="26" cy="22" r="10" fill="#d4a373" ${m}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${m}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${m}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${m}/>${gn(40,60,36)}<ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/><circle cx="50" cy="46" r="2.5" fill="${G}"/>${hs(32,68,46)}`},{kind:"ball",name:"Ball",cat:"decor",w:70,svg:`${Q}<circle cx="50" cy="58" r="36" fill="#ffd166" ${m}/><path d="M18 46 Q50 66 82 46 M26 82 Q50 60 74 82" stroke="#ff7096" stroke-width="7" fill="none"/>`},{kind:"tv",name:"TV",cat:"decor",w:170,svg:`${Q}<rect x="6" y="14" width="88" height="62" rx="14" fill="#c9a0dc" ${m}/><rect x="16" y="22" width="68" height="46" rx="8" fill="#a2d2ff"/><path d="M30 6 L44 14 M70 6 L56 14" ${m}/><rect x="36" y="78" width="28" height="16" rx="4" fill="#b388d6" ${m}/>${gn(42,58,42)}<path d="M44 52 q6 5 12 0" ${m} fill="none"/>`},{kind:"plant",name:"Plant",cat:"plants",w:110,svg:`${Q}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${m} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${m} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${m}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${m}/><rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${m}/>`},{kind:"cactus",name:"Cactus",cat:"plants",w:80,svg:`${Q}<rect x="36" y="12" width="28" height="64" rx="14" fill="#80ed99" ${m}/><path d="M36 50 H24 a8 8 0 0 1 -8 -8 V34" fill="none" stroke="${G}" stroke-width="3.5"/><rect x="12" y="26" width="12" height="22" rx="6" fill="#80ed99" ${m}/><circle cx="50" cy="12" r="6" fill="#ff8fab" ${m}/>${gn(44,56,40)}<path d="M28 74 H72 L66 96 H34 Z" fill="#c9a0dc" ${m}/>`},{kind:"flowers",name:"Flowers",cat:"plants",w:90,svg:`${Q}<path d="M50 70 V30 M50 60 Q30 50 30 30 M50 60 Q70 50 70 30" stroke="#52b788" stroke-width="4" fill="none"/><circle cx="50" cy="26" r="10" fill="#ff8fab" ${m}/><circle cx="30" cy="28" r="9" fill="#ffd166" ${m}/><circle cx="70" cy="28" r="9" fill="#a2d2ff" ${m}/><circle cx="50" cy="26" r="3" fill="#fff"/><path d="M32 66 H68 L62 96 H38 Z" fill="#a2d2ff" ${m}/>`},{kind:"tree",name:"Mini Tree",cat:"plants",w:140,svg:`${Q}<rect x="44" y="54" width="12" height="30" rx="4" fill="#b07d54" ${m}/><circle cx="50" cy="36" r="30" fill="#52b788" ${m}/><circle cx="38" cy="30" r="5" fill="#ff8fab"/><circle cx="62" cy="40" r="5" fill="#ff8fab"/><circle cx="52" cy="22" r="5" fill="#ff8fab"/><path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${m}/>`},{kind:"cake",name:"Cake",cat:"food",w:100,svg:`<rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${m}/><path d="M16 58 q8 10 17 0 q8 10 17 0 q8 10 17 0 q8 10 17 0" fill="#fff" ${m}/><rect x="46" y="28" width="8" height="22" rx="3" fill="#a2d2ff" ${m}/><path d="M50 14 q6 8 0 12 q-6 -4 0 -12" fill="#ffd166" ${m}/><ellipse cx="50" cy="92" rx="40" ry="5" fill="#fff" ${m}/>`},{kind:"apple",name:"Apple",cat:"food",w:60,svg:`<path d="M50 30 C20 18 8 50 22 74 C32 92 44 90 50 86 C56 90 68 92 78 74 C92 50 80 18 50 30 Z" fill="#ff6b6b" ${m}/><path d="M50 30 Q52 16 58 10" ${m} fill="none"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#80ed99" ${m} transform="rotate(-20 64 18)"/><ellipse cx="34" cy="46" rx="5" ry="9" fill="#fff" opacity=".5"/>`},{kind:"donut",name:"Donut",cat:"food",w:70,svg:`<circle cx="50" cy="58" r="36" fill="#e9c46a" ${m}/><path d="M18 52 Q20 26 50 24 Q80 26 82 52 Q76 62 66 56 Q56 66 46 58 Q34 66 24 58 Z" fill="#ff8fab" ${m}/><circle cx="50" cy="52" r="10" fill="#fff" ${m}/><rect x="30" y="36" width="6" height="3" rx="1.5" fill="#a2d2ff" transform="rotate(30 33 37)"/><rect x="64" y="38" width="6" height="3" rx="1.5" fill="#ffd166"/><rect x="56" y="30" width="6" height="3" rx="1.5" fill="#80ed99" transform="rotate(-30 59 31)"/>`},{kind:"pizza",name:"Pizza",cat:"food",w:80,svg:`<path d="M10 20 Q50 6 90 20 L50 94 Z" fill="#ffd166" ${m}/><path d="M10 20 Q50 6 90 20 L86 28 Q50 16 14 28 Z" fill="#e9a96a" ${m}/><circle cx="42" cy="38" r="7" fill="#ff6b6b" ${m}/><circle cx="62" cy="44" r="6" fill="#ff6b6b" ${m}/><circle cx="50" cy="62" r="6" fill="#ff6b6b" ${m}/>`},{kind:"juice",name:"Juice",cat:"food",w:55,svg:`<path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${m}/><path d="M27 44 H73 L70 92 H30 Z" fill="#ffb347"/><path d="M24 26 H76 L70 92 H30 Z" fill="none" ${m}/><path d="M58 30 L66 4" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="60" r="4" fill="#fff" opacity=".6"/>`},{kind:"cat",name:"Toy cat",cat:"pets",w:110,svg:`${Q}<path d="M78 80 Q98 70 90 50" stroke="#ffb347" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="30" ry="20" fill="#ffb347" ${m}/><path d="M22 30 L26 8 L40 22 M78 30 L74 8 L60 22" fill="#ffb347" ${m}/><circle cx="50" cy="42" r="28" fill="#ffc46b" ${m}/>${gn(40,60,40)}<path d="M46 50 q4 4 8 0" ${m} fill="none"/>${hs(32,68,50)}`},{kind:"dog",name:"Puppy",cat:"pets",w:120,svg:`${Q}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#f5ebe0" ${m}/><circle cx="50" cy="42" r="28" fill="#fff" ${m}/><ellipse cx="22" cy="44" rx="10" ry="18" fill="#b07d54" ${m}/><ellipse cx="78" cy="44" rx="10" ry="18" fill="#b07d54" ${m}/><circle cx="60" cy="34" r="8" fill="#e6b88a" opacity=".7"/>${gn(40,60,40)}<ellipse cx="50" cy="52" rx="5" ry="4" fill="${G}"/><path d="M50 56 v6" ${m}/>`},{kind:"bunny",name:"Bunny",cat:"pets",w:90,svg:`${Q}<ellipse cx="36" cy="22" rx="8" ry="20" fill="#fff" ${m}/><ellipse cx="64" cy="22" rx="8" ry="20" fill="#fff" ${m}/><ellipse cx="36" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="64" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="50" cy="76" rx="28" ry="20" fill="#fff" ${m}/><circle cx="50" cy="52" r="22" fill="#fff" ${m}/>${gn(42,58,50)}<path d="M47 58 l3 3 3 -3" ${m} fill="none"/>${hs(36,64,58)}`},{kind:"fish",name:"Fish Bowl",cat:"pets",w:100,svg:`${Q}<circle cx="50" cy="54" r="40" fill="#cdeffd" ${m}/><path d="M14 46 H86" stroke="#8ecae6" stroke-width="3"/><path d="M60 64 l14 -8 v16 z" fill="#ff9f68" ${m}/><ellipse cx="46" cy="64" rx="16" ry="11" fill="#ffb347" ${m}/><circle cx="40" cy="62" r="2.5" fill="${G}"/><circle cx="32" cy="38" r="3" fill="#fff" opacity=".8"/><rect x="24" y="10" width="52" height="8" rx="4" fill="#cdeffd" ${m}/>`},{kind:"kennel",name:"Dog Kennel",cat:"pets",w:210,h:175,holdable:!1,vb:"0 0 120 100",svg:`<ellipse cx="60" cy="97" rx="48" ry="3.2" fill="#000" opacity=".12"/><path d="M14 50 L60 12 L106 50 Z" fill="#ff8fab" ${m}/><path d="M28 46 L60 22 L92 46 Z" fill="#ffd6e4"/><rect x="20" y="46" width="80" height="50" rx="10" fill="#fff6ea" ${m}/><path d="M20 56 H100" stroke="#ffc2d4" stroke-width="7"/><path d="M34 96 V58 Q60 36 86 58 V96 Z" fill="#f3e4ff" ${m}/><path d="M40 96 V64 Q60 46 80 64 V96 Z" fill="#ffe8c7"/><circle cx="86" cy="64" r="8" fill="#bde0fe" ${m}/><circle cx="84" cy="62" r="2.2" fill="#fff" opacity=".9"/><path d="M28 62 l2.4 2.4 2.4-2.4 2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4z" fill="#ff8fab" ${m}/><circle cx="30" cy="90" r="3.2" fill="#fff" ${m}/><rect x="32" y="88.4" width="14" height="3.4" rx="1.7" fill="#fff" ${m}/><circle cx="48" cy="90" r="3.2" fill="#fff" ${m}/>`},{kind:"cat-tower",name:"Cat Tower",cat:"pets",w:150,h:225,holdable:!1,vb:"0 0 100 150",svg:`<ellipse cx="50" cy="146" rx="36" ry="3.4" fill="#000" opacity=".12"/><rect x="44" y="30" width="12" height="104" rx="6" fill="#c9a0dc" ${m}/><ellipse cx="50" cy="136" rx="34" ry="10" fill="#ffc8dd" ${m}/><ellipse cx="50" cy="132" rx="26" ry="6" fill="#fff6ea"/><ellipse cx="50" cy="102" rx="30" ry="8" fill="#bde0fe" ${m}/><ellipse cx="50" cy="98" rx="22" ry="4" fill="#fff" opacity=".8"/><ellipse cx="50" cy="64" rx="28" ry="8" fill="#ffd166" ${m}/><ellipse cx="50" cy="60" rx="20" ry="4" fill="#fff6d0"/><circle cx="50" cy="22" r="8" fill="#ff8fab" ${m}/><circle cx="47" cy="19" r="2.2" fill="#fff" opacity=".75"/><g class="dangle"><circle cx="22" cy="126" r="8" fill="#ffb3c6" ${m}/><path d="M22 126 q12 5 7 16" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/></g><circle cx="80" cy="92" r="3.4" fill="#ffd166" ${m}/>`},{kind:"vanity",name:"Vanity",cat:"furniture",w:230,svg:`${Q}<ellipse cx="50" cy="26" rx="24" ry="22" fill="#fff" ${m}/><ellipse cx="50" cy="26" rx="18" ry="16" fill="#cdeffd"/><path d="M38 18 l6 -6 M42 26 l10 -10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="12" r="3" fill="#ffd166" ${m}/><circle cx="74" cy="12" r="3" fill="#ffd166" ${m}/><rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${m}/><rect x="10" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${m}/><rect x="62" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${m}/><circle cx="24" cy="75" r="3" fill="${G}"/><circle cx="76" cy="75" r="3" fill="${G}"/><rect x="12" y="90" width="6" height="7" rx="2" fill="${G}"/><rect x="82" y="90" width="6" height="7" rx="2" fill="${G}"/>`},{kind:"stool",name:"Vanity Stool",cat:"furniture",w:90,svg:`${Q}<ellipse cx="50" cy="48" rx="34" ry="14" fill="#c9a0dc" ${m}/><ellipse cx="50" cy="44" rx="28" ry="9" fill="#e4ccf2"/><path d="M28 58 L22 94 M72 58 L78 94 M50 62 V94" ${m}/><ellipse cx="50" cy="78" rx="22" ry="4" fill="none" ${m}/>`},{kind:"perfume",name:"Perfume",cat:"decor",w:50,svg:`<rect x="40" y="8" width="20" height="14" rx="5" fill="#ffd166" ${m}/><rect x="46" y="20" width="8" height="10" fill="#fff" ${m}/><path d="M20 50 Q20 30 50 30 Q80 30 80 50 V80 Q80 94 66 94 H34 Q20 94 20 80 Z" fill="#ff8fab" ${m}/><ellipse cx="36" cy="52" rx="5" ry="10" fill="#fff" opacity=".6"/><path d="M50 56 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#fff" opacity=".8"/>`},{kind:"polish",name:"Nail Polish",cat:"decor",w:40,svg:`<rect x="38" y="4" width="24" height="40" rx="8" fill="${G}"/><path d="M24 54 Q24 42 36 42 H64 Q76 42 76 54 V84 Q76 96 64 96 H36 Q24 96 24 84 Z" fill="#b388d6" ${m}/><ellipse cx="38" cy="62" rx="5" ry="12" fill="#fff" opacity=".55"/>`},{kind:"hairdryer",name:"Hair Dryer",cat:"decor",w:90,svg:`<path d="M60 52 L70 92 Q70 96 64 96 H58 Q52 96 52 90 L46 56 Z" fill="#a2d2ff" ${m}/><rect x="6" y="20" width="62" height="40" rx="20" fill="#bde0fe" ${m}/><ellipse cx="82" cy="40" rx="12" ry="20" fill="#ffc8dd" ${m}/><ellipse cx="82" cy="40" rx="6" ry="11" fill="#fff" ${m}/><circle cx="24" cy="40" r="7" fill="#fff" opacity=".7"/>`},{kind:"mirror",name:"Mirror",cat:"decor",w:120,wall:!0,svg:`<path d="M50 6 C74 6 88 24 88 50 C88 76 72 94 50 94 C28 94 12 76 12 50 C12 24 26 6 50 6 Z" fill="#ffd166" ${m}/><ellipse cx="50" cy="50" rx="30" ry="36" fill="#e0f4ff" ${m}/><path d="M36 34 l10 -10 M36 46 l20 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ff8fab" ${m}/>`}],kr={sofa:["living"],armchair:["living"],lamp:["living","bedroom"],tv:["living"],rug:["living","bedroom"],picture:["living","bedroom"],bookshelf:["living","bedroom"],bed:["bedroom"],teddy:["bedroom"],stars:["bedroom"],tub:["bedroom"],balloon:["any"],clock:["any"],window:["any"],ball:["any"],vanity:["salon"],stool:["salon"],perfume:["salon"],polish:["salon"],hairdryer:["salon"],mirror:["salon","bedroom"],fridge:["kitchen"],stove:["kitchen"],table:["kitchen","living"],chair:["kitchen","living"]};for(const e of yr)kr[e.kind]=["nursery"];vt.push(...yr);for(const e of vt)e.rooms=kr[e.kind]??(["food"].includes(e.cat)?["kitchen"]:["any"]);const Sv=new Set(["rug","tv","tree"]);for(const e of vt)e.holdable??=!e.wall&&e.cat!=="furniture"&&e.w<=150&&!Sv.has(e.kind);const Wv=[{kind:"ranch-egg",name:"Fresh Egg",cat:"ranch",w:50,holdable:!0,rooms:["any"],svg:`${Q}<path d="M50 30 C70 30 80 62 80 74 C80 90 66 96 50 96 C34 96 20 90 20 74 C20 62 30 30 50 30 Z" fill="#fff6e6" ${m}/><ellipse cx="40" cy="52" rx="6" ry="9" fill="#fff"/>`},{kind:"ranch-carrot",name:"Garden Carrot",cat:"ranch",w:70,holdable:!0,rooms:["any"],svg:`${Q}<path d="M30 40 L78 34 L40 96 Z" fill="#ff922b" ${m}/><path d="M44 50 l10 -2 M42 64 l8 -2 M44 78 l6 -1" ${m}/><path d="M72 36 Q80 14 92 14 M72 36 Q68 14 76 4 M72 36 Q90 30 96 36" fill="none" stroke="#40c057" stroke-width="7" stroke-linecap="round"/>`},{kind:"ranch-bouquet",name:"Ranch Flowers",cat:"ranch",w:80,holdable:!0,rooms:["any"],svg:`${Q}<path d="M50 94 L40 50 M50 94 L50 44 M50 94 L62 50" stroke="#40c057" stroke-width="5" stroke-linecap="round"/><path d="M36 78 L64 78 L56 96 L44 96 Z" fill="#c9a0dc" ${m}/>${[[38,40,"#ff8fab"],[50,30,"#ffd43b"],[64,40,"#74c0fc"],[44,52,"#ff922b"],[58,52,"#c9a0dc"]].map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="9" fill="${n}" ${m}/><circle cx="${e}" cy="${t}" r="3" fill="#fff3b0"/>`).join("")}`}];vt.push(...Cv,...Zg,...Wv);const Ke=Object.fromEntries(vt.map(e=>[e.kind,e])),ha=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),Ae=e=>e.h??e.w,yn=e=>e.img?`<img class="packimg" src="${ha(e.img)}" alt="${ha(e.name)}" draggable="false" />`:`<svg viewBox="${e.vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${e.svg}</svg>`,Ce="#5a3d5c",fe=`stroke="${Ce}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,vr=["#ffe0c4","#f1c27d","#e0ac69","#c68642","#8d5524","#5c3a1e"],br=["#2b1d16","#5b3a29","#a0522d","#f4d58d","#ff8fab","#8ecae6","#b388d6","#ff9f43"],Is=["#ff7aa8","#ffd166","#5aa9e6","#80ed99","#c9a0dc","#ff9f68","#ffffff","#5a3d5c"],wr=4,Uv=4,Tv=["little","kid","adult"],sn={little:.78,kid:1,adult:1.28},Ct={left:{x:15,y:113},right:{x:85,y:113}};function Pv(e,t){return e===1?`<path d="M62 16 L76 8 L76 26 Z M62 16 L50 6 L48 24 Z" fill="#ff7aa8" stroke="${Ce}" stroke-width="3" stroke-linejoin="round"/><circle cx="62" cy="16" r="5" fill="#ffd166" stroke="${Ce}" stroke-width="3"/>`:e===2?`<circle cx="40" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${Ce}" stroke-width="3"/><circle cx="60" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${Ce}" stroke-width="3"/><path d="M49 48 h2" stroke="${Ce}" stroke-width="3"/>`:e===3?`<path d="M20 30 Q22 8 50 8 Q78 8 80 30 Z" fill="${t}" stroke="${Ce}" stroke-width="3.5" stroke-linejoin="round"/><path d="M60 28 Q84 26 92 32 Q80 36 60 34 Z" fill="${t}" stroke="${Ce}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="9" r="4" fill="#fff" stroke="${Ce}" stroke-width="3"/>`:""}function fa(e,t,n){return n?e===1?`<path d="M20 40 Q16 86 30 92 L70 92 Q84 86 80 40 Z" fill="${t}" ${fe}/>`:e===2?`<circle cx="18" cy="34" r="12" fill="${t}" ${fe}/><circle cx="82" cy="34" r="12" fill="${t}" ${fe}/>`:e===3?`<circle cx="50" cy="8" r="13" fill="${t}" ${fe}/>`:"":e===3?`<path d="M22 42 Q20 14 50 12 Q80 14 78 42 Q66 26 50 30 Q34 26 22 42 Z" fill="${t}" ${fe}/>`:`<path d="M21 46 Q18 12 50 12 Q82 12 79 46 Q72 30 58 28 Q50 36 36 30 Q26 34 21 46 Z" fill="${t}" ${fe}/>`}function de(e){return`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${fa(e.hairStyle,e.hair,!0)}
  <rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${fe}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${fe}/>
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${Ce}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${Ce}"/>
  <rect class="arm" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${fe} transform="rotate(12 22 82)"/>
  <rect class="arm" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${fe} transform="rotate(-12 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${fe}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${fe}/>
  <circle cx="50" cy="44" r="30" fill="${e.skin}" ${fe}/>
  ${fa(e.hairStyle,e.hair,!1)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${Ce}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${Ce}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${fe} fill="none"/>
  ${Pv(e.acc??0,e.shirt)}
  <circle class="hand" cx="${Ct.left.x}" cy="${Ct.left.y}" r="6" fill="${e.skin}" ${fe}/><circle class="hand" cx="${Ct.right.x}" cy="${Ct.right.y}" r="6" fill="${e.skin}" ${fe}/>
</svg>`}let dt=null,_r=!0;const zv=e=>{_r=e};function N(e,t,n="sine",s=0,o=.15){if(_r)try{dt??=new(window.AudioContext||window.webkitAudioContext),dt.state==="suspended"&&dt.resume();const i=dt.createOscillator(),a=dt.createGain(),r=dt.currentTime,l=Math.max(40,e*(.94+Math.random()*.12));i.type=n,i.frequency.setValueAtTime(l,r),s&&i.frequency.exponentialRampToValueAtTime(Math.max(40,l*s),r+t);const c=Math.min(.02,Math.max(.008,t*.22));if(a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(Math.max(2e-4,o),r+c),a.gain.exponentialRampToValueAtTime(.001,r+Math.max(t,c+.02)),n==="square"||n==="sawtooth"){const g=dt.createBiquadFilter();g.type="lowpass",g.frequency.setValueAtTime(1400,r),g.Q.setValueAtTime(.7,r),i.connect(g).connect(a).connect(dt.destination)}else i.connect(a).connect(dt.destination);i.start(r),i.stop(r+t+.02)}catch{}}const $={pick:()=>N(520,.12,"sine",1.6),drop:()=>{N(380,.1,"triangle",.7),setTimeout(()=>N(620,.08,"sine"),60)},pop:()=>N(800,.15,"square",.3,.08),click:()=>N(660,.07,"triangle"),swish:()=>N(300,.25,"sine",2.5,.1),meow:()=>{N(700,.12,"triangle",1.3,.1),setTimeout(()=>N(900,.22,"triangle",.6,.1),110)},purr:()=>[0,90,180,270,360].forEach(e=>setTimeout(()=>N(70,.09,"sawtooth",1,.05),e)),woof:()=>{N(260,.09,"square",.6,.09),setTimeout(()=>N(220,.12,"square",.5,.09),130)},spin:()=>N(400,.35,"sine",2.2,.08),boing:()=>N(200,.3,"sine",3,.1),splash:()=>[0,50,110].forEach((e,t)=>setTimeout(()=>N(900-t*200,.12,"triangle",.4,.06),e)),moo:()=>{N(160,.5,"sawtooth",.8,.07),setTimeout(()=>N(140,.45,"sawtooth",.85,.06),380)},baa:()=>[0,90,180].forEach(e=>setTimeout(()=>N(420,.1,"sawtooth",.95,.05),e)),bleat:()=>[0,70,140,210].forEach(e=>setTimeout(()=>N(520,.07,"square",1.05,.04),e)),oink:()=>{N(300,.12,"square",.6,.07),setTimeout(()=>N(330,.12,"square",.55,.07),160)},peep:()=>[0,120,240].forEach((e,t)=>setTimeout(()=>N(1800+t*150,.07,"sine",1.2,.08),e)),squeak:()=>N(1400,.1,"sine",1.5,.08),neigh:()=>{N(700,.5,"sawtooth",.6,.05),[0,60,120,180,240].forEach(e=>setTimeout(()=>N(620-e,.06,"triangle",1,.04),300+e))},honk:()=>{N(330,.18,"square",1,.07),setTimeout(()=>N(330,.25,"square",1,.07),230)},munch:()=>[0,110,220,330].forEach(e=>setTimeout(()=>N(180+Math.random()*60,.05,"square",.6,.05),e)),cluck:()=>[0,100,180].forEach((e,t)=>setTimeout(()=>N(600+t*80,.06,"square",.8,.05),e)),plant:()=>{N(260,.1,"triangle",.6),setTimeout(()=>N(520,.1,"sine"),90)},water:()=>[0,60,120,180,240].forEach((e,t)=>setTimeout(()=>N(1200-t*120,.08,"sine",.7,.05),e)),pickup:()=>[660,880,990].forEach((e,t)=>setTimeout(()=>N(e,.1,"triangle"),t*60)),sparkle:()=>[880,1100,1320].forEach((e,t)=>setTimeout(()=>N(e,.12),t*70))},Ev=/rug|lamp|light|plant|curtain|clock|window|lantern/;function Hv(e){if(e.cat==="plants")return!0;const t=`${e.name} ${e.kind??""}`.toLowerCase();return Ev.test(t)}const xr=new Set(["pack:ring-light","pack:desk-lamp"]);function Av(e,t){if(t==="nursery"&&e.kind&&xr.has(e.kind))return!1;if(t==="all"||!t)return!0;const n=e.rooms;return!n||n.length===0||n.includes(t)?!0:n.includes("any")?e.cat==="decor"||e.cat==="furniture"?Hv(e):!0:!1}function Rv(e,t,n,s,o){return e.secret&&!(o&&o.has(e.secret))||n==="nursery"&&e.kind&&xr.has(e.kind)?!1:t.startsWith("pack:")?e.pack===t.slice(5):e.cat!==t?!1:Av(e,s?"all":n)}function Dv(e){const t=e.scale;let n=0;e.overflowR>1&&e.overflowL>1?n=-e.overflowL:e.overflowR>1?n=e.overflowR:e.overflowL>1&&(n=-e.overflowL);const s=e.cam+n/t,o=Math.max(0,Math.min(e.maxCam,s)),i=s-o,a=e.nudgeX&&Math.abs(i)>.5?e.kidX-i:e.kidX;return{cam:o,kidX:a}}function Iv(e){const t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[1][0]).toUpperCase():"?"}function Nv(e,t=3){const n=[...e].sort((r,l)=>r.x-l.x||r.id.localeCompare(l.id)),s=[],o=[],i=(r,l,c)=>s.some(g=>g.lane===c&&Math.abs(g.x-r)<(g.w+l)/2+8),a=[];for(const r of n){let l=-1;for(let c=0;c<t;c++)if(!i(r.x,r.w,c)){l=c;break}l<0?a.push(r):(s.push({x:r.x,w:r.w,lane:l}),o.push({id:r.id,lane:l,initials:!1}))}for(const r of a){const l=Math.min(r.w,44);let c=0;for(let g=0;g<t;g++)if(!i(r.x,l,g)){c=g;break}s.push({x:r.x,w:l,lane:c}),o.push({id:r.id,lane:c,initials:!0})}return o}let Ov=0;function $r(e=document){const t=[...e.querySelectorAll(".nametag")].filter(o=>{const i=o.getBoundingClientRect();return i.width>2&&i.height>2});if(!t.length)return;const n=t.map(o=>{o.dataset.tagId||(o.dataset.tagId="tg"+(++Ov).toString(36)),o.dataset.full||(o.dataset.full=(o.textContent||"").trim()),o.classList.contains("is-initials")||(o.dataset.fullW=String(o.getBoundingClientRect().width));const i=o.getBoundingClientRect(),a=Number(o.dataset.fullW)||i.width;return{id:o.dataset.tagId,x:i.left+i.width/2,w:a}}),s=new Map(Nv(n).map(o=>[o.id,o]));for(const o of t){const i=s.get(o.dataset.tagId||"");if(!i)continue;const a=o.dataset.full||"",r=i.initials?Iv(a):a;o.textContent!==r&&(o.textContent=r),o.classList.toggle("is-initials",i.initials),o.style.setProperty("--tag-lane",String(i.lane))}}function ao(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function qv(e){!e||ao()||(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),window.setTimeout(()=>e.classList.remove("wiggle"),480))}function jv(){document.addEventListener("pointerup",e=>{if(ao())return;const t=e.target?.closest("button");t&&(t.classList.remove("spring"),t.offsetWidth,t.classList.add("spring"))},!0)}const Mr="#5a3d5c",$e=`stroke="${Mr}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,Vv={living:"#ff8fab",bedroom:"#c9a0dc",kitchen:"#8fd6a6",salon:"#f0a0d8",nursery:"#9ad7f5",backyard:"#80ed99"};function Fv(e){const t=Vv[e]??"#ffb3c6";return`<div class="sceneWin builtin-window" aria-hidden="true"><svg viewBox="0 0 160 180">
    <path d="M18 20 H142 V150 H18 Z" fill="#fff6ea" ${$e}/>
    <path d="M28 30 H132 V118 H28 Z" fill="#b9e3ff" ${$e}/>
    <path d="M80 30 V118 M28 74 H132" ${$e} stroke-width="3"/>
    <circle cx="48" cy="52" r="10" fill="#fff" opacity=".85"/>
    <ellipse cx="108" cy="48" rx="16" ry="8" fill="#fff" opacity=".8"/>
    <path d="M40 118 Q58 96 70 118 Q90 100 112 118" fill="#7dce8a" stroke="${Mr}" stroke-width="3"/>
    <rect x="96" y="86" width="8" height="32" rx="3" fill="#6b4a32" ${$e} stroke-width="2"/>
    <circle cx="100" cy="80" r="12" fill="#5cc985" ${$e} stroke-width="2"/>
    <path d="M8 16 Q6 80 16 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <path d="M152 16 Q154 80 144 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <rect x="46" y="146" width="68" height="12" rx="4" fill="#ffe7c2" ${$e}/>
  </svg></div>`}function Zv(){return`<div class="sceneRug" aria-hidden="true"><svg viewBox="0 0 200 80">
    <ellipse cx="100" cy="48" rx="92" ry="24" fill="#ffc8dd" ${$e}/>
    <ellipse cx="100" cy="48" rx="64" ry="15" fill="#bde0fe" ${$e} stroke-width="3"/>
    <ellipse cx="100" cy="48" rx="28" ry="7" fill="#fff6ea"/>
  </svg></div>
  <div class="sceneLamp" aria-hidden="true"><svg viewBox="0 0 80 160">
    <path d="M18 52 L30 8 H50 L62 52 Z" fill="#ffd166" ${$e}/>
    <rect x="36" y="52" width="8" height="78" rx="4" fill="#c9a0dc" ${$e}/>
    <ellipse cx="40" cy="136" rx="26" ry="8" fill="#b388d6" ${$e}/>
    <circle cx="34" cy="28" r="4" fill="#fff" opacity=".8"/>
  </svg></div>
  <div class="scenePlant" aria-hidden="true"><svg viewBox="0 0 90 140">
    <path d="M45 128 C45 90 18 78 20 48 C40 58 44 80 45 128" fill="#5cc985" ${$e}/>
    <path d="M45 128 C45 92 74 70 78 40 C58 54 50 82 45 128" fill="#80ed99" ${$e}/>
    <path d="M45 128 C40 96 28 88 22 70" fill="none" stroke="#3d9a62" stroke-width="3"/>
    <path d="M30 132 H62 L56 118 H36 Z" fill="#e07a5f" ${$e}/>
    <ellipse cx="46" cy="126" rx="16" ry="5" fill="#c4634a"/>
  </svg></div>`}function Qv(e){return[{id:e("rug"),kind:"rug",x:1152,y:540,flip:!1,z:0,scale:1},{id:e("lamp"),kind:"lamp",x:804,y:470,flip:!1,z:0,scale:1},{id:e("plant"),kind:"plant",x:1584,y:480,flip:!1,z:0,scale:1}]}let ma="";function Lr(e,t,n){const s=n.length===0,o=n.some(a=>/window|curtain/i.test(a.kind)),i=t+(s?"|e":"")+(o?"|w":"");i===ma&&e.childElementCount||(ma=i,e.innerHTML=(o?"":Fv(t))+(s?Zv():""),e.dataset.room=t)}const J="#5a3d5c",k=(e=4)=>`stroke="${J}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,ss=600,Ge=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],st=(e,t,n=3)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${J}"/><circle cx="${e+1}" cy="${t-1}" r="${n/3}" fill="#fff"/>`,Yt=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="5" ry="3" fill="#ff9bb5" opacity=".75"/>`,Gv=(e,t,n,s)=>Ge.map((o,i)=>`<path d="M${e-n+i*s} ${t} A${n-i*s} ${n-i*s} 0 0 1 ${e+n-i*s} ${t}" fill="none" stroke="${o}" stroke-width="${s}"/>`).join(""),Kv=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${k()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${k()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${k()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${k()}/></g>`,ft=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-46" y="-50" width="92" height="50" rx="14" fill="#f5d27a" ${k()}/>
  <path d="M-30 -42 V-8 M0 -44 V-6 M30 -42 V-8" stroke="#d9a93f" stroke-width="4" stroke-linecap="round"/><path d="M-46 -26 H46" stroke="#c98a2e" stroke-width="5"/></g>`,Yv=(e,t,n)=>{const s=Array.from({length:Math.floor((t-e)/70)+1},(o,i)=>`<rect x="${e+i*70-7}" y="${n-58}" width="14" height="64" rx="5" fill="#fff6e6" ${k(3)}/>`).join("");return`<rect x="${e}" y="${n-46}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${k(3)}/><rect x="${e}" y="${n-22}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${k(3)}/>${s}`};function Xv(){const e=ts;return`<svg class="parkScene ranchScene" viewBox="0 0 ${e} ${ss}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="rcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7e8ff"/><stop offset="1" stop-color="#fff4fb"/></linearGradient></defs>
  <rect width="${e}" height="440" fill="url(#rcSky)"/>
  <g opacity=".55">${Gv(1900,430,620,26)}</g>
  ${[160,820,1500,2300,3e3].map((t,n)=>`<g transform="translate(${t} ${70+n%2*34})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <g transform="translate(${e-200} 92)"><circle r="48" fill="#ffe066" ${k()}/>${st(-15,-6,4)}${st(13,-6,4)}<path d="M-14 12 Q0 24 14 12" fill="none" ${k(3)}/>${Yt(-26,8)}${Yt(26,8)}</g>
  <path d="M-50 370 Q600 230 1300 350 T2600 330 T${e+100} 360 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#a6e3a0"/><path d="M0 410 H${e}" ${k()}/>
  <path d="M0 566 Q900 530 1800 570 T${e} 552 V600 H0 Z" fill="#f2dcb8" opacity=".9"/>
  ${Kv(3560,400,.8,"#4fbf7a")}
  <!-- entrance gate with a rainbow arch -->
  <g><rect x="40" y="290" width="24" height="210" rx="6" fill="#c99366" ${k()}/><rect x="196" y="290" width="24" height="210" rx="6" fill="#c99366" ${k()}/>
    <path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${J}" stroke-width="44" stroke-linecap="round"/>
    ${Ge.map((t,n)=>`<path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${t}" stroke-width="${36-n*6}" stroke-linecap="round"/>`).join("")}
    <rect x="22" y="250" width="216" height="40" rx="14" fill="#fff6e6" ${k(3)}/><text x="130" y="277" text-anchor="middle" font-size="19" font-weight="900" fill="${J}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  <!-- red barn with rainbow trim and banner -->
  <g transform="translate(270 0)">
    <path d="M0 470 V250 L60 180 H270 L330 250 V470 Z" fill="#ef5b5b" ${k(5)}/>
    <path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${J}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    ${Ge.map((t,n)=>`<path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${t}" stroke-width="3" transform="translate(0 ${-7+n*2.8})" stroke-linejoin="round"/>`).join("")}
    <rect x="115" y="215" width="100" height="56" rx="10" fill="#fff6e6" ${k(4)}/><path d="M115 215 L215 271 M215 215 L115 271" stroke="#ef5b5b" stroke-width="6"/>
    <rect x="95" y="330" width="140" height="140" rx="8" fill="#fff6e6" ${k(4)}/><rect x="108" y="342" width="56" height="128" fill="#d94848" ${k(3)}/><rect x="166" y="342" width="56" height="128" fill="#d94848" ${k(3)}/>
    <path d="M108 342 L164 470 M164 342 L108 470 M166 342 L222 470 M222 342 L166 470" stroke="#fff6e6" stroke-width="6"/>
    <g transform="translate(165 300)">${Ge.map((t,n)=>`<rect x="${-120+n*40}" y="-16" width="40" height="30" fill="${t}"/>`).join("")}<rect x="-120" y="-16" width="240" height="30" fill="none" ${k(3)}/>
      <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${J}" stroke-width="4" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  </g>
  ${ft(640,560,.8)}${ft(1950,470,.7)}${ft(1880,470,.55)}${ft(3115,470,.7)}${ft(3115,425,.55)}
  <!-- the petting zoo moved into the barn: a sign by the barn door, sunflowers where the pen was -->
  ${Array.from({length:6},(t,n)=>{const s=1030+n*66,o=70+n%3*18;return`<g transform="translate(${s} 470)"><path d="M0 0 V-${o}" stroke="#40c057" stroke-width="6" stroke-linecap="round"/><ellipse cx="${n%2?9:-9}" cy="-${o/2}" rx="11" ry="5" fill="#69db7c" ${k(2.5)}/>${[0,45,90,135,180,225,270,315].map(i=>`<ellipse cx="${Math.cos(i*Math.PI/180)*14}" cy="${-o+Math.sin(i*Math.PI/180)*14}" rx="8" ry="5" transform="rotate(${i} ${Math.cos(i*Math.PI/180)*14} ${-o+Math.sin(i*Math.PI/180)*14})" fill="#ffd43b" ${k(2)}/>`).join("")}<circle cy="-${o}" r="10" fill="#a0522d" ${k(2.5)}/></g>`}).join("")}
  <!-- pond -->
  <ellipse cx="${we.x}" cy="${we.y}" rx="${we.rx}" ry="${we.ry}" fill="#8ecae6" ${k()}/><ellipse cx="${we.x-15}" cy="${we.y-6}" rx="70" ry="16" fill="#bde6f7"/>
  <!-- paddock fence + HORSES sign are their own depth layer (paddockFenceSVG) -->
  <!-- garden -->
  <rect x="3140" y="520" width="420" height="70" rx="20" fill="#b07d54" ${k()}/>
  <rect x="3260" y="430" width="160" height="40" rx="12" fill="#fff6e6" ${k(3)}/><text x="3340" y="458" text-anchor="middle" font-size="21" font-weight="900" fill="${J}" font-family="Nunito, system-ui, sans-serif">GARDEN</text>
  <path d="M3340 470 V500" ${k(5)}/>
  </svg>`}function Jv(){return`<svg class="fenceLayer" viewBox="0 0 ${ts} ${ss}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  ${Yv(2400,3080,470)}
  <rect x="2640" y="380" width="180" height="40" rx="12" fill="#fff6e6" ${k(3)}/><text x="2730" y="408" text-anchor="middle" font-size="21" font-weight="900" fill="${J}" font-family="Nunito, system-ui, sans-serif">HORSES</text>
  </svg>`}const Br=[{name:"Goat",say:"Meh-eh-eh!",snd:"bleat"},{name:"Sheep",say:"Baa!",snd:"baa"},{name:"Piglet",say:"Oink oink!",snd:"oink"},{name:"Chicks",say:"Peep peep!",snd:"peep"},{name:"Bunny",say:"*wiggle wiggle*",snd:"squeak"},{name:"Cow",say:"Moooo!",snd:"moo"}],fs=(e,t,n,s=94)=>e.map((o,i)=>`<rect class="leg ${i%2?"b":"a"}" x="${o}" y="${t}" width="9" height="${s-t}" rx="4" fill="${n}" ${k(3)}/>`).join("");function Zo(e){switch(e){case 0:return`<svg viewBox="0 0 120 100">${fs([32,44,70,82],60,"#efe6dc")}<path class="tail" d="M24 50 l-8 -10" ${k(5)}/>
      <ellipse cx="58" cy="56" rx="34" ry="17" fill="#f4ede5" ${k()}/><g class="head"><path d="M86 30 l-6 -16 l10 10 Z M96 30 l2 -17 l5 13 Z" fill="#c9b8a8" ${k(3)}/>
      <ellipse cx="94" cy="40" rx="14" ry="16" fill="#f4ede5" ${k()}/><ellipse class="ear" cx="80" cy="36" rx="9" ry="4" fill="#e8d6c4" ${k(3)}/>${st(98,36)}<path d="M98 56 q2 8 6 0" fill="#e8d6c4" ${k(3)}/>${Yt(102,46)}<circle cx="106" cy="44" r="2" fill="${J}"/></g></svg>`;case 1:return`<svg viewBox="0 0 120 100">${fs([36,48,70,80],62,"#5a4a5c")}
      ${[[40,50],[56,44],[72,48],[86,56],[70,64],[48,64],[34,60]].map(([t,n])=>`<circle cx="${t}" cy="${n}" r="15" fill="#fff" ${k(3)}/>`).join("")}<ellipse cx="60" cy="55" rx="30" ry="14" fill="#fff"/>
      <g class="head"><ellipse cx="96" cy="46" rx="13" ry="15" fill="#6b5a6e" ${k()}/><circle cx="92" cy="32" r="8" fill="#fff" ${k(3)}/><ellipse class="ear" cx="82" cy="44" rx="8" ry="4" fill="#6b5a6e" ${k(3)}/>
      <circle cx="99" cy="42" r="3.2" fill="#fff"/><circle cx="99.5" cy="42" r="1.8" fill="${J}"/>${Yt(102,52)}</g></svg>`;case 2:return`<svg viewBox="0 0 120 100">${fs([38,50,66,78],66,"#ffadc6")}<path class="tail" d="M28 54 q-10 -4 -6 -12 q6 0 2 8" fill="none" ${k(3)}/>
      <ellipse cx="58" cy="60" rx="32" ry="20" fill="#ffc2d4" ${k()}/><g class="head"><circle cx="90" cy="52" r="16" fill="#ffc2d4" ${k()}/><path d="M80 38 l2 -12 l9 8 Z" fill="#ffadc6" ${k(3)}/>
      <ellipse cx="104" cy="56" rx="7" ry="8" fill="#ff9bb8" ${k(3)}/><circle cx="102" cy="54" r="1.6" fill="${J}"/><circle cx="106" cy="57" r="1.6" fill="${J}"/>${st(92,46)}${Yt(90,60)}</g></svg>`;case 3:return`<svg viewBox="0 0 120 100">${[[30,72,1],[62,66,1.15],[92,74,.95]].map(([t,n,s])=>`<g transform="translate(${t} ${n}) scale(${s})"><path d="M-4 16 v8 M4 16 v8" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="4" r="14" fill="#ffe066" ${k(3)}/><path d="M-8 2 q-6 4 0 8" fill="#ffd43b" ${k(2)}/><g class="head"><circle cx="5" cy="-8" r="9" fill="#ffe066" ${k(3)}/><path d="M13 -9 l7 2 l-7 3 Z" fill="#ff9f43" ${k(2)}/>${st(7,-10,2.2)}</g></g>`).join("")}</svg>`;case 4:return`<svg viewBox="0 0 120 100"><circle class="tail" cx="30" cy="68" r="8" fill="#fff" ${k(3)}/><ellipse cx="56" cy="72" rx="28" ry="20" fill="#f6eef9" ${k()}/><ellipse cx="74" cy="90" rx="12" ry="5" fill="#f6eef9" ${k(3)}/>
      <g class="head"><ellipse class="ear" cx="78" cy="26" rx="7" ry="20" fill="#f6eef9" ${k(3)} transform="rotate(-12 78 26)"/><ellipse cx="78" cy="26" rx="3" ry="13" fill="#ffc2d4" transform="rotate(-12 78 26)"/>
      <ellipse cx="90" cy="28" rx="7" ry="20" fill="#f6eef9" ${k(3)} transform="rotate(10 90 28)"/><circle cx="86" cy="56" r="17" fill="#f6eef9" ${k()}/>${st(92,52)}<circle cx="102" cy="58" r="2.5" fill="#ff8fab"/>${Yt(90,63)}</g></svg>`;default:return`<svg viewBox="0 0 120 100">${fs([30,42,72,84],62,"#fff")}<path class="tail" d="M20 50 q-6 14 0 26" fill="none" ${k(3)}/>
      <rect x="18" y="38" width="80" height="34" rx="16" fill="#fff" ${k()}/><path d="M30 40 q10 8 4 20 q-10 -2 -10 -14 Z M60 42 q14 2 10 18 q-12 4 -14 -8 Z" fill="${J}"/><ellipse cx="60" cy="74" rx="8" ry="5" fill="#ffadc6" ${k(2)}/>
      <g class="head"><path d="M90 24 l-8 -8 M108 24 l8 -8" stroke="#f5d27a" stroke-width="5" stroke-linecap="round"/><rect x="86" y="22" width="26" height="30" rx="12" fill="#fff" ${k()}/>
      <ellipse cx="100" cy="52" rx="14" ry="10" fill="#ffc2d4" ${k(3)}/><circle cx="95" cy="52" r="1.8" fill="${J}"/><circle cx="105" cy="52" r="1.8" fill="${J}"/>${st(94,34)}${st(106,34)}
      <ellipse class="ear" cx="82" cy="30" rx="7" ry="4" fill="#fff" ${k(3)}/></g></svg>`}}const we={x:2265,y:520,rx:110,ry:34},e2=476,Ns=[{name:"Chestnut",body:"#c97b45",mane:"#7a3f22",sock:"#fff6e6"},{name:"Snowy",body:"#fdf8f3",mane:"#d9cdc4",sock:"#e9ddd2"},{name:"Midnight",body:"#4a3f52",mane:"#2a2230",sock:"#6b5e74"},{name:"Sunny",body:"#f2c96b",mane:"#fff6e0",sock:"#fff6e0"},{name:"Rainbow Pony",body:"#fff0fa",mane:"rainbow",sock:"#ffd6ec"}];function bi(e,t=!1){const n=Ns[e]??Ns[0],s=n.mane==="rainbow",o=s?Ge.map((r,l)=>{const c=124-l*1.6,g=14+l*2.4;return`<path d="M${c.toFixed(1)} ${g.toFixed(1)} q-6.5 2 -4.5 ${6+l*.35}" fill="none" stroke="${r}" stroke-width="5.5" stroke-linecap="round"/>`}).join(""):`<path d="M106 20 q-14 6 -18 30 q8 -6 10 -2 q4 -12 14 -18 Z" fill="${n.mane}" ${k(3)}/>`,i=s?`<g class="tail">${Ge.map((r,l)=>`<path d="M30 58 q-18 ${8+l*3} -14 ${36+l}" fill="none" stroke="${r}" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`:`<path class="tail" d="M30 56 q-20 10 -14 44 q10 -10 8 -20 q6 -10 10 -18 Z" fill="${n.mane}" ${k(3)}/>`,a=(r,l)=>`<g class="leg ${l}"><rect x="${r}" y="78" width="12" height="44" rx="5" fill="${n.body}" ${k(3)}/><rect x="${r}" y="110" width="12" height="12" rx="4" fill="${n.sock}" ${k(3)}/></g>`;return`<svg viewBox="0 0 160 130" class="horsesvg">${i}${a(40,"a")}${a(56,"b")}${a(96,"b")}${a(112,"a")}
    <ellipse cx="80" cy="68" rx="50" ry="24" fill="${n.body}" ${k()}/>
    ${t||s?`<path class="saddle" data-top="43" d="M64 46 q16 -6 32 0 l-2 22 q-14 4 -28 0 Z" fill="${s?"#b197fc":"#e8590c"}" ${k(3)}/>`:""}
    <g class="head"><path d="M108 66 L114 30 Q118 16 132 18 L148 36 Q152 46 142 48 L130 46 L128 70 Z" fill="${n.body}" ${k()}/>
    <path d="M114 22 l2 -14 l8 12 Z" fill="${n.body}" ${k(3)}/>${o}
    ${st(130,30,3.4)}<circle cx="146" cy="42" r="2" fill="${J}"/>${Yt(136,40)}
    ${s?`<path d="M120 14 l4 -14 l4 14 Z" fill="#ffd43b" ${k(2)}/>`:""}</g>
    ${s?'<g fill="#fff" opacity=".9"><path d="M60 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M92 74 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/></g>':""}</svg>`}const t2=`<svg viewBox="0 0 180 170"><path d="M10 70 L90 14 L170 70" fill="#ffa94d" ${k(5)}/>
  <rect x="24" y="66" width="132" height="84" rx="8" fill="#fff6e6" ${k()}/>${Ge.map((e,t)=>`<rect x="${24+t*22}" y="66" width="22" height="10" fill="${e}"/>`).join("")}
  <rect x="24" y="66" width="132" height="10" fill="none" ${k(3)}/><circle cx="90" cy="108" r="22" fill="#5a3d5c"/>
  <path d="M60 150 l-12 16 M120 150 l12 16" ${k(5)}/>
  <g class="hen"><ellipse cx="90" cy="118" rx="20" ry="14" fill="#fff" ${k(3)}/><circle cx="104" cy="104" r="10" fill="#fff" ${k(3)}/><path d="M100 94 q3 -8 8 0" fill="#ff6b6b" ${k(2)}/>
  <path d="M113 104 l7 2 -7 3 Z" fill="#ffa94d" ${k(2)}/>${st(106,102,2)}</g>
  <text x="90" y="54" text-anchor="middle" font-size="16" font-weight="900" fill="${J}" font-family="Nunito, system-ui, sans-serif">EGGS</text></svg>`,n2=`<svg viewBox="0 0 170 130"><rect x="80" y="30" width="54" height="50" rx="8" fill="#bde6f7" ${k()}/><rect x="74" y="24" width="66" height="10" rx="4" fill="#ff6b6b" ${k(3)}/>
  <rect x="20" y="62" width="130" height="34" rx="12" fill="#ff6b6b" ${k()}/><rect x="28" y="40" width="10" height="24" rx="3" fill="#868e96" ${k(3)}/>
  <circle cx="122" cy="98" r="28" fill="${J}"/><circle cx="122" cy="98" r="13" fill="#ffd43b" ${k(3)}/><circle cx="44" cy="106" r="18" fill="${J}"/><circle cx="44" cy="106" r="8" fill="#ffd43b" ${k(3)}/>
  <circle cx="26" cy="76" r="5" fill="#fff3b0" ${k(2)}/></svg>`,s2=`<svg viewBox="0 0 240 300"><rect x="104" y="160" width="32" height="140" rx="10" fill="#c99366" ${k()}/>
  <circle cx="120" cy="110" r="90" fill="#5cc985" ${k()}/><circle cx="62" cy="140" r="50" fill="#5cc985" ${k()}/><circle cx="180" cy="140" r="52" fill="#5cc985" ${k()}/>
  ${[[80,90],[150,70],[175,140],[100,150],[130,115],[60,140]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="11" fill="#ff6b6b" ${k(3)}/><path d="M${e} ${t-10} q2 -6 6 -7" fill="none" ${k(2)}/>`).join("")}</svg>`,ua=[[80,90],[150,70],[175,140],[100,150]],Cr=`<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="14" fill="#ff6b6b" ${k(3)}/><path d="M20 10 q2 -6 6 -7" fill="none" ${k(2.5)}/><ellipse cx="27" cy="8" rx="5" ry="3" fill="#5cc985" ${k(2)}/><circle cx="14" cy="18" r="3" fill="#fff" opacity=".6"/></svg>`,ro=`<svg viewBox="0 0 40 40"><path d="M12 14 L32 10 L16 36 Z" fill="#ff922b" ${k(3)}/><path d="M18 18 l5 -1 M17 24 l4 -1" ${k(2)}/><path d="M30 10 q4 -8 8 -6 M30 10 q-2 -8 2 -10 M30 10 q6 -2 8 2" fill="none" stroke="#40c057" stroke-width="4" stroke-linecap="round"/></svg>`,o2=`<svg viewBox="0 0 40 40"><path d="M6 34 Q20 4 34 34 Z" fill="#f5d27a" ${k(3)}/><path d="M14 30 L18 14 M20 32 V10 M26 30 L22 14" stroke="#d9a93f" stroke-width="2.5" stroke-linecap="round"/></svg>`,Qn=`<svg viewBox="0 0 40 40"><path d="M20 4 C30 4 34 20 34 26 C34 34 28 38 20 38 C12 38 6 34 6 26 C6 20 10 4 20 4 Z" fill="#fff6e6" ${k(3)}/><circle cx="15" cy="16" r="3" fill="#fff"/></svg>`,wi=(e="#ff8fab")=>`<svg viewBox="0 0 40 40"><path d="M20 38 V20" stroke="#40c057" stroke-width="4" stroke-linecap="round"/>${[0,72,144,216,288].map(t=>`<circle cx="${20+Math.cos(t*Math.PI/180)*8}" cy="${14+Math.sin(t*Math.PI/180)*8}" r="7" fill="${e}" ${k(2.5)}/>`).join("")}<circle cx="20" cy="14" r="5" fill="#ffd43b" ${k(2)}/></svg>`,Sr={carrot:ro,apple:Cr,hay:o2},i2=e=>`<svg viewBox="0 0 80 90"><g transform="translate(14 0) scale(1.3)">${Sr[e].replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g>
  <path d="M10 40 H70 L62 86 H18 Z" fill="${e==="carrot"?"#74c0fc":e==="apple"?"#ffa8c5":"#b2f2bb"}" ${k(4)}/><path d="M12 52 H68" stroke="#fff" stroke-width="4" opacity=".6"/></svg>`,a2=`<svg viewBox="0 0 60 50"><path d="M12 22 Q30 -6 48 22" fill="none" stroke="${J}" stroke-width="7" stroke-linecap="round"/><path d="M12 22 Q30 -6 48 22" fill="none" stroke="#e0a96d" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 22 H56 L50 46 H10 Z" fill="#e0a96d" ${k(3.5)}/><path d="M12 30 H48 M14 38 H46" stroke="#b5793d" stroke-width="3"/></svg>`,ya=["#ff8fab","#c9a0dc","#ffd43b","#74c0fc","#ff922b"];function Wr(e,t,n){const s=`<ellipse cx="35" cy="76" rx="30" ry="11" fill="${e?.wet?"#7a4b2e":"#9c6b46"}" ${k(3)}/>`;if(!e)return`<svg viewBox="0 0 70 90">${s}<path d="M20 74 q4 -3 8 0 M36 78 q4 -3 8 0" stroke="#b5875f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;const o=ya[n%ya.length];let i="";t===0&&(i=`<circle cx="27" cy="72" r="3" fill="#f2dcb8" ${k(1.5)}/><circle cx="36" cy="75" r="3" fill="#f2dcb8" ${k(1.5)}/><circle cx="44" cy="71" r="3" fill="#f2dcb8" ${k(1.5)}/>`),t===1&&(i=`<path d="M35 72 V58" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="57" rx="7" ry="4" fill="#69db7c" ${k(2)}/><ellipse cx="41" cy="55" rx="7" ry="4" fill="#69db7c" ${k(2)}/>`),t===2&&(i=`<path d="M35 72 V40 M35 60 Q22 54 20 42 M35 56 Q48 50 50 38" stroke="#40c057" stroke-width="4" fill="none" stroke-linecap="round"/>${e.seed==="flower"?`<circle cx="35" cy="38" r="7" fill="#b2f2bb" ${k(2)}/>`:""}`),t===3&&(i=e.seed==="carrot"?`<path d="M26 74 L44 72 L35 86 Z" fill="#ff922b" ${k(2.5)}/><path d="M35 72 Q24 50 22 38 M35 72 Q36 48 36 34 M35 72 Q46 50 50 40" stroke="#40c057" stroke-width="5" fill="none" stroke-linecap="round"/>`:`<path d="M35 72 V34" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="54" rx="8" ry="4" fill="#69db7c" ${k(2)}/>${[0,72,144,216,288].map(l=>`<circle cx="${35+Math.cos(l*Math.PI/180)*10}" cy="${28+Math.sin(l*Math.PI/180)*10}" r="8" fill="${o}" ${k(2.5)}/>`).join("")}<circle cx="35" cy="28" r="6" fill="#ffd43b" ${k(2)}/>`);const a=e.wet?"":`<g class="needWater"><path d="M56 18 q6 10 0 14 q-6 -4 0 -14 Z" fill="#74c0fc" ${k(2)}/></g>`,r=t===3?`<g class="ready"><path d="M58 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffd43b" ${k(1.5)}/></g>`:"";return`<svg viewBox="0 0 70 90">${s}${i}${a}${r}</svg>`}const r2=`<svg viewBox="0 0 48 48">${Ge.map((e,t)=>`<path d="M${6+t*2.6} 38 A${18-t*2.6} ${18-t*2.6} 0 0 1 ${42-t*2.6} 38" fill="none" stroke="${e}" stroke-width="3"/>`).join("")}<path d="M4 38 H44" ${k(3)}/></svg>`,l2=`<svg viewBox="0 0 48 48"><path d="M10 34 Q24 22 38 34" fill="none" ${k(4)}/><path d="M24 30 V8 M16 16 L24 8 L32 16" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40 H40" ${k(4)}/></svg>`,c2=`<svg viewBox="0 0 200 320"><path d="M70 310 L84 120 H116 L130 310 Z" fill="#fff6e6" ${k(4)}/><path d="M78 200 H122 M74 260 H126" ${k(3)}/><rect x="88" y="262" width="24" height="48" rx="10" fill="#b197fc" ${k(3)}/>
  <path d="M78 124 L100 92 L122 124 Z" fill="#ff8fab" ${k(4)}/>
  <g class="sails" style="transform-origin:100px 110px">${[0,90,180,270].map(e=>`<g transform="rotate(${e} 100 110)"><path d="M100 110 L104 30 L126 30 L118 104 Z" fill="${["#ffd43b","#74c0fc","#ff8fab","#69db7c"][e/90]}" ${k(3)}/><path d="M108 40 H122 M107 58 H121 M106 76 H120" ${k(2)}/></g>`).join("")}<circle cx="100" cy="110" r="10" fill="#ffa94d" ${k(3)}/></g></svg>`,g2=["GOAT","SHEEP","PIGLET","CHICKS","BUNNY","COW"],d2=e=>`<g class="lantern" style="transform-origin:${e}px 146px"><path d="M${e} 146 V178" ${k(3)}/><circle cx="${e}" cy="204" r="34" fill="#fff3b0" opacity=".45"/>
  <path d="M${e-14} 182 H${e+14} L${e+11} 226 H${e-11} Z" fill="#ffe066" ${k(3)}/><rect x="${e-17}" y="176" width="34" height="8" rx="3" fill="#495057" ${k(2.5)}/><rect x="${e-15}" y="224" width="30" height="7" rx="3" fill="#495057" ${k(2.5)}/><ellipse cx="${e}" cy="205" rx="5" ry="9" fill="#ff922b"/></g>`;function p2(){const e=gi,t=Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64} 146 V440" stroke="#d4895f" stroke-width="3"/>`).join(""),n=Array.from({length:Math.ceil(e/46)},(o,i)=>{const a=i*46,r=160+Math.sin(i/3.1)*8;return`<path d="M${a} ${r} L${a+40} ${r} L${a+20} ${r+30} Z" fill="${Ge[i%6]}" ${k(2.5)}/>`}).join(""),s=di.map((o,i)=>`<g><rect x="${o-96}" y="318" width="192" height="122" rx="6" fill="#f0c49a" ${k(4)}/>
    <path d="M${o-96} 350 H${o+96} M${o-96} 384 H${o+96} M${o-96} 412 H${o+96}" stroke="#d9a074" stroke-width="3"/><path d="M${o-96} 318 L${o+96} 440 M${o+96} 318 L${o-96} 440" stroke="#e0aa7e" stroke-width="7" opacity=".7"/>
    <rect x="${o-54}" y="284" width="108" height="30" rx="10" fill="#fff6e6" ${k(3)}/><text x="${o}" y="305" text-anchor="middle" font-size="17" font-weight="900" fill="${J}" font-family="Nunito, system-ui, sans-serif">${g2[i]}</text></g>`).join("");return`<svg class="parkScene ranchScene barnScene" viewBox="0 0 ${e} ${ss}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="440" fill="#e8a87c"/>${t}
  <!-- hay loft -->
  <rect width="${e}" height="128" fill="#c98a5e"/>${Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64+32} 0 V128" stroke="#b5764d" stroke-width="3"/>`).join("")}
  ${[120,260,420,980,1130,1290,1640,1790].map((o,i)=>ft(o,126,i%3===1?.72:.85)).join("")}${[190,1060,1720].map(o=>ft(o,82,.7)).join("")}
  <rect x="0" y="126" width="${e}" height="24" fill="#a8653a" ${k(4)}/>
  ${[0,1,2,3,4,5,6].map(o=>`<path d="M${120+o*280} 150 L${180+o*280} 210" stroke="#a8653a" stroke-width="12" stroke-linecap="round"/><path d="M${120+o*280} 150 L${180+o*280} 210" ${k(2)}/>`).join("")}
  <!-- ladder up to the loft -->
  <g transform="translate(1840 0)"><path d="M-22 150 L-30 440 M22 150 L30 440" stroke="#c99366" stroke-width="10" stroke-linecap="round"/>${[190,240,290,340,390].map(o=>`<path d="M${-22-(o-150)*.028} ${o} H${22+(o-150)*.028}" stroke="#c99366" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
  <!-- rainbow bunting + big rainbow banner -->
  <path d="M0 160 Q${e/2} 176 ${e} 160" fill="none" ${k(2)}/>${n}
  <g transform="translate(${e/2+60} 236)">${Ge.map((o,i)=>`<rect x="${-180+i*60}" y="-26" width="60" height="44" fill="${o}"/>`).join("")}<rect x="-180" y="-26" width="360" height="44" rx="4" fill="none" ${k(4)}/>
    <path d="M-180 -26 L-200 -4 L-180 18 M180 -26 L200 -4 L180 18" fill="#ff8fab" ${k(3)}/>
    <text x="0" y="6" text-anchor="middle" font-size="26" font-weight="900" fill="#fff" stroke="${J}" stroke-width="5" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  <!-- round windows with daylight -->
  ${[440,1720].map(o=>`<circle cx="${o}" cy="236" r="34" fill="#c7e8ff" ${k(4)}/><path d="M${o-34} 236 H${o+34} M${o} 202 V270" ${k(3)}/>`).join("")}
  ${s}
  <!-- the big door (back outside) -->
  <rect x="24" y="200" width="206" height="244" rx="10" fill="#b5703f" ${k(4)}/>
  <rect x="38" y="214" width="178" height="230" fill="#c7e8ff"/><path d="M38 360 Q120 330 216 352 V444 H38 Z" fill="#a6e3a0"/><circle cx="180" cy="250" r="16" fill="#ffe066"/>
  <path d="M38 214 H216 V444 M38 214 V444" fill="none" ${k(4)}/>
  <!-- straw floor -->
  <rect x="0" y="438" width="${e}" height="162" fill="#f2d58a"/><path d="M0 440 H${e}" ${k(4)}/>
  ${Array.from({length:70},(o,i)=>{const a=i*137%e,r=470+i*53%120;return`<path d="M${a} ${r} l${14+i%3*4} ${i%2?-4:4}" stroke="#d9a93f" stroke-width="3" stroke-linecap="round"/>`}).join("")}
  <!-- feed station -->
  <g transform="translate(356 0)"><rect x="-70" y="456" width="140" height="34" rx="12" fill="#fff6e6" ${k(3)}/><text x="0" y="480" text-anchor="middle" font-size="16" font-weight="900" fill="${J}" font-family="Nunito, system-ui, sans-serif">FOOD 🥕🍎🌾</text></g>
  ${ft(1790,590,.8)}${ft(1700,600,.65)}
  ${[290,660,1330,1590].map(d2).join("")}
  </svg>`}const Os=600,Re="#5a3d5c",z=(e=4)=>`stroke="${Re}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function os(e){const t=Fn[e].seats,n=t<=2?140:t===4?110:100,s=(t-1)/2;return Array.from({length:t},(o,i)=>({x:Fn[e].x+(i-s)*n,y:558-Math.abs(i-s)*8}))}const ka=["#ff7eb3","#ffd43b","#66d9e8","#d0bfff","#fff"],_t=(e,t,n=1,s="#fff")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -9 L2.2 -2.4 L9 -2.2 L3.4 2.2 L5.4 9 L0 4.6 L-5.4 9 L-3.4 2.2 L-9 -2.2 L-2.2 -2.4 Z" fill="${s}" stroke="${Re}" stroke-width="1.2" stroke-linejoin="round"/>`;function va(e,t,n,s){const o=`<path d="M36 ${t} Q ${e/2} ${t+n+8} ${e-36} ${t}" fill="none" stroke="${Re}" stroke-width="3"/>`,i=Array.from({length:s},(a,r)=>{const l=s===1?.5:r/(s-1),c=48+l*(e-96),g=t+Math.sin(l*Math.PI)*n,d=ka[r%ka.length];return`<g class="bulb" style="animation-delay:-${r%8*.22}s"><line x1="${c}" y1="${g-16}" x2="${c}" y2="${g-6}" stroke="${Re}" stroke-width="2"/><circle cx="${c}" cy="${g}" r="7.5" fill="${d}" ${z(2)}/><circle cx="${c-2}" cy="${g-2}" r="2.2" fill="#fff" opacity=".85"/></g>`}).join("");return o+i}const En=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">
  <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".12"/>
  <path d="M-40 10 Q-48 -22 -10 -28 Q10 -46 34 -18 Q50 2 34 18 Q8 32 -24 20 Q-42 16 -40 10 Z" fill="${n}" ${z(3)}/>
  <path d="M-18 -6 Q-4 -20 14 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <circle cx="16" cy="6" r="4" fill="#fff" opacity=".35"/>
</g>`,ba=(e,t,n)=>`<g transform="translate(${e} ${t})">
  <ellipse cx="0" cy="16" rx="28" ry="9" fill="#000" opacity=".12"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="${n}" ${z(3)}/>
  <ellipse cx="-6" cy="-2" rx="12" ry="7" fill="#fff" opacity=".35"/>
  <path d="M0 -16 V-28" ${z(3)}/><circle cy="-32" r="6" fill="#ffd43b" ${z(2)}/>
</g>`;function ms(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-40" y="-52" width="80" height="104" rx="6" fill="#fff" ${z(3.5)}/>
    <rect x="-32" y="-44" width="64" height="72" rx="4" fill="${s}"/>
    ${o}
    <rect x="-10" y="-58" width="20" height="10" rx="2" fill="#ffe8a3" opacity=".85" transform="rotate(-8)"/>
  </g>`}function us(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-28" y="-34" width="56" height="68" rx="3" fill="#fff" ${z(3)}/>
    <rect x="-22" y="-28" width="44" height="40" fill="${s}"/>
    ${o}
  </g>`}function ys(e,t,n,s){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="36" rx="26" ry="8" fill="#000" opacity=".12"/>
    <path d="M-18 36 L-12 -2 H12 L18 36 Z" fill="${n}" ${z(3)}/>
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c9a27a" ${z(2)}/>
    <ellipse cx="-16" cy="-16" rx="16" ry="22" fill="${s}" ${z(3)} transform="rotate(-18)"/>
    <ellipse cx="16" cy="-18" rx="16" ry="22" fill="${s}" ${z(3)} transform="rotate(16)"/>
    <ellipse cx="0" cy="-28" rx="14" ry="20" fill="${s}" ${z(3)}/>
    <circle cx="0" cy="-36" r="6" fill="#ff8ec8" ${z(2)}/>
  </g>`}function h2(e,t){return`<g transform="translate(${e} ${t})">
    <ellipse cx="28" cy="118" rx="32" ry="8" fill="#000" opacity=".12"/>
    <rect width="56" height="118" rx="10" fill="#e7fbff" ${z()}/>
    <rect y="52" width="56" height="8" fill="#d0f4ff" ${z(2)}/>
    <rect x="44" y="18" width="6" height="22" rx="3" fill="#ffd43b" ${z(2)}/>
    <rect x="44" y="70" width="6" height="28" rx="3" fill="#ffd43b" ${z(2)}/>
    <rect x="8" y="12" width="28" height="22" rx="4" fill="#fff" ${z(2)}/>
    <circle cx="16" cy="22" r="4" fill="#ff8ec8"/><circle cx="28" cy="24" r="3" fill="#ffd43b"/>
    <path d="M18 78 C14 72 8 74 12 82 C15 88 18 90 18 90 C18 90 21 88 24 82 C28 74 22 72 18 78 Z" fill="#ff4d94" ${z(1.5)}/>
  </g>`}function f2(e,t,n){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="6" rx="34" ry="9" fill="#000" opacity=".1"/>
    <path d="M-46 -16 C-50 -86 -26 -108 0 -110 C26 -108 50 -86 46 -16 Z" fill="#fff6fb" ${z()}/>
    <path d="M-32 -20 C-34 -74 -16 -90 0 -92 C16 -90 34 -74 32 -20 Z" fill="${n}"/>
    <ellipse cx="0" cy="-10" rx="40" ry="16" fill="${n}" ${z()}/>
    <ellipse cx="-8" cy="-16" rx="14" ry="6" fill="#fff" opacity=".4"/>
    <path d="M-22 -2 L-26 16 M22 -2 L26 16" fill="none" stroke="${Re}" stroke-width="4" stroke-linecap="round"/>
  </g>`}function m2(e){const t=Fn[e],n=t.game==="four"?"Four":"Slay",s=t.game==="four"?"#7ad7ea":e===0?"#ff8ec8":"#e0b0ff",o=t.game==="four"?"#b8f2ff":e===0?"#ffd0e6":"#ead9ff",i=t.seats>=6?250:t.seats>=4?200:150;return`${os(e).map(r=>f2(r.x,r.y,o)).join("")}
  <g transform="translate(${t.x} 500)">
    <ellipse cx="0" cy="28" rx="${i+18}" ry="20" fill="#000" opacity=".1"/>
    <rect x="-18" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${z(3)}/>
    <rect x="4" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${z(3)}/>
    <ellipse cx="0" cy="-4" rx="${i}" ry="30" fill="${s}" stroke="#ffd43b" stroke-width="6"/>
    <ellipse cx="0" cy="-4" rx="${i-16}" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <ellipse cx="${-i*.25}" cy="-12" rx="${i*.35}" ry="8" fill="#fff" opacity=".28"/>
    <text x="0" y="4" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="${Re}" stroke-width="4" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${n}</text>
  </g>`}const ks=(e,t,n=1,s="#ff4d94")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 4 C-6 -4 -14 -2 -10 6 C-7 12 0 16 0 16 C0 16 7 12 10 6 C14 -2 6 -4 0 4 Z" fill="${s}" stroke="${Re}" stroke-width="1.6" stroke-linejoin="round"/>`;function u2(){const e=eo,t=[[120,200],[260,250],[640,210],[900,250],[1180,190],[1560,230],[1860,180],[2100,240],[2420,200],[2520,280]];return`<svg class="grScene" viewBox="0 0 ${e} ${Os}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe0f2"/><stop offset="0.45" stop-color="#f3d4ff"/><stop offset="0.78" stop-color="#e7f7ff"/><stop offset="1" stop-color="#fff1c9"/>
    </linearGradient>
    <linearGradient id="grFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f7b7d4"/><stop offset="1" stop-color="#e089ab"/>
    </linearGradient>
    <linearGradient id="grSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c9f0ff"/><stop offset="1" stop-color="#ffe0f0"/>
    </linearGradient>
    <radialGradient id="disco" cx="38%" cy="32%" r="68%">
      <stop offset="0" stop-color="#fff"/><stop offset="0.4" stop-color="#ffe0f2"/><stop offset="1" stop-color="#d0bfff"/>
    </radialGradient>
  </defs>
  <rect width="${e}" height="${Os}" fill="url(#grWall)"/>
  <rect y="390" width="${e}" height="80" fill="#fff6fb" opacity=".45"/>
  ${Array.from({length:8},(n,s)=>`<rect x="${40+s*330}" y="400" width="280" height="62" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`).join("")}
  <rect y="468" width="${e}" height="132" fill="url(#grFloor)"/>
  <rect y="464" width="${e}" height="12" fill="#ffd43b" ${z(3)}/>
  ${[720,1500,2150].map((n,s)=>`<ellipse cx="${n}" cy="548" rx="${s===1?210:280}" ry="42" fill="${s===1?"#d8f6ff":s===0?"#ffe0f0":"#f3e8ff"}" stroke="#fff" stroke-width="4" opacity=".8"/>`).join("")}
  ${va(e,28,22,28)}
  ${va(e,78,16,18)}
  ${t.map(([n,s],o)=>_t(n,s,.7+o%3*.28,o%2?"#fff":"#ffd43b")).join("")}

  <g transform="translate(1180 70)">
    <rect x="20" y="20" width="220" height="150" rx="16" fill="url(#grSky)" ${z()}/>
    <path d="M20 70 H240 M130 20 V170" ${z(3)}/>
    <circle cx="78" cy="48" r="14" fill="#ffd43b" ${z(2)}/>
    <path d="M8 36 Q20 90 8 150" fill="#ff8ec8" ${z(3)}/><path d="M252 36 Q240 90 252 150" fill="#d0bfff" ${z(3)}/>
  </g>

  <g class="neonSign" transform="translate(560 168)">
    <rect x="-228" y="-58" width="456" height="108" rx="28" fill="#2b1430" ${z(5)}/>
    <rect class="neonRing" x="-214" y="-44" width="428" height="80" rx="22" fill="none" stroke="#ff4d94" stroke-width="4"/>
    <path d="M-150 8 C-162 -14 -186 -8 -174 12 C-166 26 -150 36 -150 36 C-150 36 -134 26 -126 12 C-114 -8 -138 -14 -150 8 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="2"/>
    <text x="6" y="16" text-anchor="middle" font-size="40" font-weight="900" fill="#ff7eb3" stroke="#fff6fb" stroke-width="2" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY CLUB</text>
  </g>

  ${ms(250,250,-6,"#ffe0f0",`${ks(0,8,1.4)}${_t(-18,-16,.7,"#ffd43b")}${_t(18,-10,.55,"#66d9e8")}`)}
  ${ms(980,240,5,"#e7fbff",`<ellipse cx="0" cy="6" rx="16" ry="12" fill="#fff" ${z(2)}/><path d="M-6 6 Q0 -8 6 6" fill="none" stroke="${Re}" stroke-width="2"/><path d="M0 18 V28 M-12 24 H12" ${z(2)}/>`)}
  ${ms(1680,255,-4,"#fff3c4",`${_t(0,2,1.5,"#ffd43b")}`)}
  ${ms(2360,245,6,"#f3e8ff",`${ks(0,4,1.3,"#d0bfff")}`)}
  ${us(400,300,8,"#fff0f6",ks(0,-4,1.1))}
  ${us(820,310,-7,"#e7fbff",_t(0,-6,1,"#66d9e8"))}
  ${us(1900,300,9,"#fff6e6",_t(0,-6,1,"#ffd43b"))}
  ${us(2280,320,-8,"#ffe0f0",ks(0,-4,1))}

  <g class="disco" transform="translate(1288 36)">
    <line y1="0" y2="22" stroke="${Re}" stroke-width="3"/>
    <circle cy="44" r="26" fill="url(#disco)" ${z(3)}/>
    <path d="M-14 36 L0 56 L14 36 M-8 48 H8" fill="none" stroke="#fff" stroke-width="2.5"/>
    ${_t(-30,20,.45)}${_t(32,28,.4,"#ffd43b")}
  </g>

  <g transform="translate(86 292)">
    <rect width="78" height="168" rx="12" fill="#ff8ec8" ${z()}/>
    <rect x="8" y="10" width="62" height="36" rx="8" fill="#fff6e6" ${z(2)}/>
    <text x="39" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="${Re}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
    <circle cx="62" cy="96" r="5" fill="#ffd43b" ${z(2)}/>
    <rect x="22" y="118" width="34" height="8" rx="3" fill="#fff" opacity=".45"/>
  </g>

  ${ys(40,400,"#ffd43b","#8ce99a")}
  ${ys(1080,392,"#ff8ec8","#69db7c")}
  ${ys(1600,400,"#d0bfff","#8ce99a")}
  ${ys(2520,396,"#66d9e8","#69db7c")}
  ${h2(200,348)}
  <g transform="translate(2420 360)">
    <rect width="130" height="100" rx="14" fill="#fff6fb" ${z()}/>
    <rect y="28" width="130" height="10" fill="#ffd0e6" ${z(2)}/>
    <circle cx="28" cy="64" r="12" fill="#ffd43b" ${z(2)}/><circle cx="64" cy="66" r="10" fill="#ff8ec8" ${z(2)}/><rect x="86" y="52" width="28" height="22" rx="6" fill="#66d9e8" ${z(2)}/>
    <text x="65" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="${Re}" font-family="Nunito, ui-rounded, system-ui, sans-serif">SNACKS</text>
  </g>

  ${En(330,455,"#ff8ec8",1.05)}
  ${En(1120,468,"#d0bfff")}
  ${En(1360,470,"#8ce4f2",.9)}
  ${En(1780,462,"#ffd43b")}
  ${ba(1480,500,"#ffb3d9")}
  ${ba(2e3,505,"#c9b3ff")}
  ${En(2550,468,"#ff8ec8",.85)}

  ${Fn.map((n,s)=>m2(s)).join("")}
  </svg>`}const y2=`<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${Re}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`,A="#5a3d5c",k2=`<svg viewBox="0 0 120 100"><rect x="0" y="62" width="120" height="38" rx="14" fill="#9fe0aa" stroke="${A}" stroke-width="3"/>
  <path d="M18 70 L30 22 L42 70 M78 70 L90 22 L102 70" fill="none" stroke="#8ecae6" stroke-width="5" stroke-linecap="round"/><path d="M26 22 H94" stroke="#ff8fab" stroke-width="7" stroke-linecap="round"/>
  <path d="M50 22 V54 M66 22 V54" stroke="${A}" stroke-width="2.5"/><rect x="45" y="52" width="26" height="7" rx="3" fill="#ff9f68" stroke="${A}" stroke-width="2.5"/>
  <circle cx="104" cy="14" r="9" fill="#ffd166" stroke="${A}" stroke-width="3"/></svg>`,Ur=`<svg viewBox="0 0 120 100"><path d="M20 50 L60 16 L100 50" fill="#ff8fab" stroke="${A}" stroke-width="4" stroke-linejoin="round"/><rect x="28" y="48" width="64" height="44" rx="6" fill="#fff6e6" stroke="${A}" stroke-width="4"/>
  <rect x="52" y="64" width="16" height="28" rx="4" fill="#c9a0dc" stroke="${A}" stroke-width="3"/><rect x="34" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${A}" stroke-width="3"/><rect x="73" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${A}" stroke-width="3"/></svg>`,v2=`<svg viewBox="0 0 120 100"><path d="M40 18 L24 28 L14 46 L30 52 L34 44 V88 H86 V44 L90 52 L106 46 L96 28 L80 18 Q60 34 40 18 Z" fill="#8ecae6" stroke="${A}" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="58" r="7" fill="#fff3b0" stroke="${A}" stroke-width="3"/></svg>`,Y=e=>`<div class="wnArt">${e}</div>`,Tr=`<svg viewBox="0 0 120 100"><rect x="16" y="58" width="74" height="24" rx="10" fill="#fff" stroke="${A}" stroke-width="4"/><circle cx="32" cy="70" r="7" fill="#ff8fab" stroke="${A}" stroke-width="3"/><circle cx="52" cy="70" r="7" fill="#ffe066" stroke="${A}" stroke-width="3"/><circle cx="72" cy="70" r="7" fill="#8ecae6" stroke="${A}" stroke-width="3"/><path d="M86 46 l14 -16 8 8 -14 16z" fill="#ffd166" stroke="${A}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="44" width="12" height="24" rx="4" fill="#c9a0dc" stroke="${A}" stroke-width="3"/></svg>`,b2=`<svg viewBox="0 0 120 100">${Ge.map((e,t)=>`<path d="M${12+t*6} 84 A${48-t*6} ${48-t*6} 0 0 1 ${108-t*6} 84" fill="none" stroke="${e}" stroke-width="6"/>`).join("")}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${A}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${A}" stroke-width="3"/></svg>`,w2=`<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${Qn.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g><g transform="translate(52 22) scale(1.4)">${Qn.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g></svg>`,Qo=(e,t,n,s)=>`<g transform="translate(${t} ${n}) scale(${s})">${e.replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"")}</g>`,_2=`<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${A}" stroke-width="4"/>${Qo(ci(de({skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6"})).replace('viewBox="14 2 72 74"','viewBox="0 0 100 160"'),26,12,.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`,x2=`<svg viewBox="0 0 120 100"><rect x="8" y="28" width="104" height="64" rx="16" fill="#fff0f6" stroke="${A}" stroke-width="4"/><path d="M8 40 L60 12 L112 40" fill="#ff6b9a" stroke="${A}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 58 C52 48 40 50 46 60 C50 68 60 74 60 74 C60 74 70 68 74 60 C80 50 68 48 60 58 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  ${[18,34,50,66,82,98].map((e,t)=>`<circle cx="${e}" cy="24" r="4" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" stroke="${A}" stroke-width="1.5"/>`).join("")}</svg>`,$2=`<svg viewBox="0 0 120 100"><rect x="28" y="8" width="64" height="84" rx="12" fill="#fff" stroke="${A}" stroke-width="4"/><rect x="28" y="8" width="64" height="84" rx="12" fill="none" stroke="#ff7eb3" stroke-width="6"/><path d="M48 36 L54 24 L60 34 L68 20 L76 34 L82 24 L88 36 Z" fill="#ffd43b" stroke="${A}" stroke-width="2" stroke-linejoin="round"/><text x="60" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#ff4d94" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY</text></svg>`,M2=`<svg viewBox="0 0 120 100"><rect x="10" y="16" width="100" height="72" rx="14" fill="#fff6fb" stroke="${A}" stroke-width="4"/>
  <path d="M36 58 C28 48 18 50 24 60 C28 68 36 74 36 74 C36 74 44 68 48 60 C54 50 44 48 36 58 Z" fill="#ff4d94" stroke="${A}" stroke-width="2"/>
  <path d="M78 28 L82 40 H94 L84 48 L88 60 L78 52 L68 60 L72 48 L62 40 H74 Z" fill="#66d9e8" stroke="${A}" stroke-width="2"/></svg>`,Pr=`<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="22" rx="6" fill="#fff" stroke="${A}" stroke-width="3"/><path d="M6 26 H42 M14 18 V40 M22 18 V40 M30 18 V40 M36 18 V40" stroke="${A}" stroke-width="2.4"/><rect x="4" y="12" width="40" height="8" rx="4" fill="#9ad7f5" stroke="${A}" stroke-width="3"/><ellipse cx="20" cy="32" rx="5" ry="3" fill="#ffe0ec"/><ellipse cx="30" cy="32" rx="5" ry="3" fill="#c9e7ff"/></svg>`,L2=`<svg viewBox="0 0 120 100"><ellipse cx="60" cy="72" rx="50" ry="20" fill="#ffc2d4" stroke="${A}" stroke-width="4"/><ellipse cx="60" cy="72" rx="32" ry="11" fill="#fff" stroke="${A}" stroke-width="3"/><path d="M60 58 C50 46 36 48 42 60 C48 70 60 78 60 78 C60 78 72 70 78 60 C84 48 70 46 60 58 Z" fill="#ff4d94" stroke="${A}" stroke-width="3"/><path d="M22 40 Q28 28 36 36" fill="none" stroke="#7dce8a" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="5" fill="#ffd166" stroke="${A}" stroke-width="2"/></svg>`,B2=`<svg viewBox="0 0 120 100"><path d="M16 50 L60 14 L104 50" fill="#ff8fab" stroke="${A}" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="48" width="68" height="40" rx="10" fill="#fff6ea" stroke="${A}" stroke-width="4"/><path d="M42 88 V60 Q60 44 78 60 V88" fill="#ffe8c7" stroke="${A}" stroke-width="3"/><circle cx="82" cy="64" r="7" fill="#bde0fe" stroke="${A}" stroke-width="3"/><circle cx="80" cy="62" r="2" fill="#fff"/></svg>`,zr=[{v:7,title:"New Nursery!",lines:[{art:Y(Pr),text:"A new <b>Nursery</b> room, with a <b>crib</b> and a rocker!"},{art:Y(L2),text:"The <b>Cozy Cottage</b> furniture pack is in your drawer!"},{art:Y(B2),text:"A <b>dog kennel</b> and a <b>cat tower</b> for your pets!"}]},{v:6,title:"The clubhouse is open!",lines:[{art:Y(x2),text:"A glam <b>clubhouse</b> on the map!"},{art:Y($2),text:"Play <b>Slay</b> with friends at a table!"},{art:Y(M2),text:"Line up <b>hearts</b> or <b>stars</b>!"}]},{v:5,title:"Your house looks even cozier!",lines:[{art:Y(Tr),text:"Wallpaper and floors show their <b>real patterns</b> when you paint!"},{art:Y(_n(0,"sit")),text:"Your cat is <b>big and cozy</b>, just like the toy cat."},{art:Y(Ur),text:"Tap <b>home</b> to come back from the map, the park, or the ranch."}]},{v:4,title:"A map of our neighborhood!",lines:[{art:Y(li),text:"Tap the <b>map</b> to go anywhere!"},{art:Y(_2),text:"Tap a friend's face to <b>find her</b>."},{art:Y(Zo(0)),text:"The petting zoo is inside the <b>barn</b> now!"}]},{v:3,title:"Rainbow Ranch is open!",lines:[{art:Y(b2),text:"Visit <b>Rainbow Ranch</b>!"},{art:Y(Zo(1)),text:"Pet and feed animals at the <b>petting zoo</b>."},{art:Y(`<svg viewBox="0 0 160 130">${Qo(bi(4),0,0,1)}</svg>`),text:"Ride <b>horses</b> and the <b>rainbow pony</b>!"},{art:Y(w2),text:"Collect <b>eggs</b> from the hens."},{art:Y(`<svg viewBox="0 0 70 90">${Qo(Wr({seed:"carrot",wet:1},3,0),0,0,1)}</svg>`),text:"Grow carrots and flowers in the <b>garden</b>."}]},{v:2,title:"What's new!",lines:[{art:Y(k2),text:"A new <b>park</b>! Swing, slide and splash with friends."},{art:Y(_n(3,"sit")),text:"Adopt a <b>cat</b>! She lives in your house."},{art:Y(Zn(3,"stand")),text:"Adopt a <b>dog</b>! Take it to the park to play fetch."}]}],Er=zr[0].v,Hr={v:Er,title:"Welcome to your cozy house!",lines:[{art:Y(Ur),text:"Drag furniture into your rooms."},{art:Y(v2),text:"Dress up your friends."},{art:Y(_n(0,"sit")),text:"Tap the paw to adopt a pet!"}]},Ar=Nt("cozy-whatsnew"),C2=1;function S2(){try{const e=Number(localStorage.getItem(Ar)),t=["cozy-house","cozy-house-v1","cozy-hood"].some(o=>localStorage.getItem(Nt(o))!==null);if(!e&&!t)return{kind:"welcome",entries:[Hr]};const n=e||C2,s=zr.filter(o=>o.v>n).slice(0,3);return s.length?{kind:"news",entries:s}:{kind:"none",entries:[]}}catch{return{kind:"none",entries:[]}}}function W2(){try{localStorage.setItem(Ar,String(Er))}catch{}}function U2(e,t){const n=e==="welcome"?Hr.title:t[0].title,s=t.flatMap(o=>o.lines).slice(0,5);return`<div class="wnBadge">${e==="welcome"?rr:t[0].v>=7?Pr:t[0].v>=6?y2:t[0].v>=5?Tr:t[0].v>=4?li:t[0].v>=3?r2:Ig}</div>
    <h2 class="wnTitle">${n}</h2>
    <div class="wnList ${s.length>3?"many":""}">${s.map((o,i)=>`<div class="wnLine" style="animation-delay:${.15+i*.18}s">${o.art}<p>${o.text}</p></div>`).join("")}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`}const fn=[{name:"Pink",fill:"#ff7eb3",ink:"#9d174d"},{name:"Lilac",fill:"#c9b3ff",ink:"#5f3dc4"},{name:"Aqua",fill:"#66d9e8",ink:"#0b7285"},{name:"Gold",fill:"#ffd43b",ink:"#e67700"}],be="#5a3d5c",Lo=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),wa=e=>typeof e=="number"?e:{skip:10,rev:11,d2:12,wild:13,w4:14}[e]??0,_a=e=>typeof e.v=="number"?String(e.v):e.v==="skip"?"✕":e.v==="rev"?"↻":e.v==="d2"?"+2":e.v==="w4"?"+4":"♛",T2=e=>e.v==="skip"?"Nope":e.v==="rev"?"Flip":e.v==="d2"?"+2":e.v==="wild"||e.v==="w4"?"Crown":"",Qt=(e,t,n=1,s="#ffd43b")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -6 L1.4 -1.4 L6 -1 L1.6 1.4 L3 6 L0 3 L-3 6 L-1.6 1.4 L-6 -1 L-1.4 -1.4 Z" fill="${s}" stroke="${be}" stroke-width="1" stroke-linejoin="round"/>`,Cs=(e,t,n=1)=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 1.2 C-2.2 -1.6 -5.2 -0.6 -3.6 2.2 C-2.4 4 0 5.2 0 5.2 C0 5.2 2.4 4 3.6 2.2 C5.2 -0.6 2.2 -1.6 0 1.2 Z" fill="#ff4d94" stroke="${be}" stroke-width="1"/>`;function P2(e){return e.v==="wild"||e.v==="w4"?`<g transform="translate(14 28)">
      <path d="M4 26 L10 8 L18 16 L24 2 L30 16 L38 8 L44 26 Z" fill="#ffd43b" stroke="${be}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="4" y="26" width="40" height="8" rx="2" fill="#ffd43b" stroke="${be}" stroke-width="2.2"/>
      <circle cx="10" cy="8" r="2.4" fill="#ff7eb3"/><circle cx="24" cy="3" r="2.4" fill="#66d9e8"/><circle cx="38" cy="8" r="2.4" fill="#d0bfff"/>
      ${Qt(-2,0,.7)}${Qt(46,4,.65,"#fff")}${Qt(22,-4,.55,"#ff7eb3")}
    </g>${e.v==="w4"?`<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${be}" font-family="Nunito, ui-rounded, system-ui, sans-serif">+4</text>`:""}`:e.v==="d2"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff" stroke="${be}" stroke-width="2.4"/>
      ${Cs(14,8,1.35)}${Cs(32,8,1.35)}
      <path d="M12 26 Q23 34 34 26" fill="none" stroke="${be}" stroke-width="2.4" stroke-linecap="round"/>
      ${Cs(40,22,.8)}
    </g>`:e.v==="rev"?`<g fill="none" stroke="${be}" stroke-width="3.2" stroke-linecap="round">
      <path d="M16 40 C42 22 54 52 34 60 C16 68 12 46 30 40"/>
      <path d="M14 38 L22 30 L24 42" stroke-linejoin="round"/>
    </g>${Qt(48,28,.85)}${Qt(20,62,.6,"#ff7eb3")}${Qt(50,58,.55,"#66d9e8")}`:e.v==="skip"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff6d8" stroke="${be}" stroke-width="2.4"/>
      <rect x="8" y="12" width="14" height="9" rx="3" fill="#2b1430"/><rect x="24" y="12" width="14" height="9" rx="3" fill="#2b1430"/>
      <path d="M22 16.5 H24 M5 14 H2 M41 14 H44" stroke="${be}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 27 Q23 32 34 27" fill="none" stroke="${be}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`:""}function Go(e){const t=e.c===4,n=t?{fill:"#fff8ee",ink:be}:fn[e.c]??fn[0],s=typeof e.v=="number",o=T2(e),i=t?'<rect x="2" y="2" width="66" height="96" rx="13" fill="#fff8ee" stroke="#ff7eb3" stroke-width="4"/><rect x="5" y="5" width="60" height="90" rx="11" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="7.5" y="7.5" width="55" height="85" rx="9" fill="none" stroke="#66d9e8" stroke-width="1.6"/><rect x="9.5" y="9.5" width="51" height="81" rx="8" fill="none" stroke="#ffd43b" stroke-width="1.6"/>':`<rect x="2" y="2" width="66" height="96" rx="13" fill="${n.fill}" stroke="${be}" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`,a='<ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/>',r=`fill="${n.ink}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif"`,l=`<text x="8" y="16" font-size="13" font-weight="900" ${r}>${_a(e)}</text>`+(s?`<text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" ${r}>${_a(e)}</text>`:""),c=s?`<text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="${n.ink}" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${e.v}</text>`:`${P2(e)}${o?`<text x="35" y="92" text-anchor="middle" font-size="12" font-weight="900" ${r}>${o}</text>`:""}`;return`<svg viewBox="0 0 70 100">${i}${a}${l}${c}</svg>`}const z2=[[18,28],[40,28],[29,46],[18,64],[40,64],[29,78]].map(([e,t])=>Cs(e,t,.9)).join(""),E2=`<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff4d94" stroke="${be}" stroke-width="3"/>
  <rect x="7" y="7" width="56" height="86" rx="10" fill="none" stroke="#ffd43b" stroke-width="3"/>
  <rect x="11" y="11" width="48" height="78" rx="8" fill="#ff7eb3"/>
  ${z2}
  <circle cx="35" cy="50" r="14" fill="#fff6fb" stroke="${be}" stroke-width="2.4"/>
  ${Qt(35,50,1.15,"#ffd43b")}
</svg>`,Rr=(e,t)=>{if(t.turn<0||t.drawn!=null&&e.id!==t.drawn)return!1;const n=t.top;return e.c===4||e.c===t.color||e.v===n.v&&n.c!==4};let Ko=null,Se=null,dn=-1,xa=-1;function $a(e,t){Ko=e;const n=t.table,s=n.view;if(!s||!s.top){e.innerHTML="";return}n.tb!==xa&&(Se=null,dn=-1,xa=n.tb);const o=n.you,i=o!==null&&Array.isArray(s.hand)?s.hand.slice():[];Se!==null&&!i.some(f=>f.id===Se)&&(Se=null);const a=s.ev;let r=null;if(a&&a.n!==dn&&dn>=0&&a.k==="play"&&a.card){const f=e.querySelector(`[data-card="${a.card.id}"]`)||e.querySelector(`[data-p="${a.p}"]`);f&&(r=f.getBoundingClientRect())}const c=n.phase==="play"&&s.turn>=0,g=c&&o!==null&&s.turn===o,d=o!==null&&i.length<=2&&i.length>0&&!s.slay?.[o]&&g,u=g&&s.drawn==null&&n.phase==="play",y=g&&s.drawn!=null&&n.phase==="play",w=i.sort((f,v)=>f.c-v.c||wa(f.v)-wa(v.v)),_=c?n.players[s.turn]:"",B=c?g?"Your turn!":`${Lo(t.name(_))}'s turn`:"",p=fn[s.color]??fn[0];if(e.innerHTML=`<div class="slayFelt">
    ${B?`<div class="whose ${g?"yours":""}" id="whoseTurn">${B}<span class="slayDir" aria-hidden="true">${s.dir===1?"→":"←"}</span></div>`:""}
    <div class="slayOpps">${n.players.map((f,v)=>v===o?"":`<div class="slayOpp ${s.turn===v?"isTurn":""}" data-p="${v}" data-count="${s.counts?.[v]??0}"><span class="chipFace">${t.face(f)}</span><b>${Lo(t.name(f))}</b><span class="cnt">${s.counts?.[v]??0}</span>${t.away(f)?'<i class="awayBadge">away</i>':""}${s.slay?.[v]?"<em>SLAY!</em>":""}</div>`).join("")}</div>
    <div class="slayPile">
      <button type="button" id="slayDeck" class="slayDeck" ${u?"":"disabled"} aria-label="Draw a card">${E2}<span>${s.deck??0}</span></button>
      <div id="slayDiscard" class="slayDiscard" data-top="${s.top.id}">${Go(s.top)}</div>
      <div class="nowColor" data-color="${s.color}" style="background:${p.fill}" aria-label="${p.name}"></div>
    </div>
    ${o===null?'<p class="watching">You are watching</p>':""}
    ${Se!==null?`<div id="crownPick" class="crownPick"><p>Pick a color for your Crown!</p><div class="crownRow">${fn.map((f,v)=>`<button type="button" data-color="${v}" aria-label="${f.name}" style="background:${f.fill}"><span>${f.name}</span></button>`).join("")}</div></div>`:""}
    <div id="slayHand" class="slayHand ${g?"isTurn":""}">${w.map(f=>{const v=g&&n.phase==="play"&&Rr(f,s),C=v?"can":g?"dim":"wait",S=typeof f.v=="number"?fn[f.c].name+" "+f.v:f.v==="wild"?"Crown":f.v==="w4"?"Crown plus 4":f.v==="d2"?"plus 2":f.v==="rev"?"Flip":"Nope";return`<button type="button" class="slayCard ${C} ${f.id===s.drawn?"justDrew":""} ${f.id===Se?"picked":""}" data-card="${f.id}" data-c="${f.c}" data-v="${f.v}" aria-label="${Lo(S)}" ${v?"":"disabled"}>${Go(f)}</button>`}).join("")}</div>
    ${c&&o!==null?`<button type="button" id="slayCall" class="slayCall ${d?"ready":""}" ${d?"":"disabled"}>SLAY!</button>`:""}
    <button type="button" id="slayPass" class="slayPass ${y?"":"hidden"}" ${y?"":"disabled"}>Pass</button>
  </div>`,a&&a.n!==dn){const f=dn;if(dn=a.n,f>=0){if(a.k==="play"&&a.card){const v=e.querySelector("#slayDiscard");v&&H2(r,a.card,v.getBoundingClientRect()),a.card.v==="skip"?t.toast("Nope!"):a.card.v==="rev"?t.toast("Flip!"):a.card.v==="d2"?t.toast("+2!"):a.card.v==="w4"&&t.toast("Crown +4!"),t.sfx.swish()}a.vdrew&&t.toast("Forgot to say SLAY! Draw 2"),a.k==="slay"&&t.sfx.sparkle()}}}function H2(e,t,n){const s=document.createElement("div");s.className="flyCard",s.innerHTML=Go(t);const o=e?.width||70,i=e?.height||100;Object.assign(s.style,{left:(e?.left??innerWidth/2)+"px",top:(e?.top??80)+"px",width:o+"px",height:i+"px"}),document.body.appendChild(s),requestAnimationFrame(()=>{s.style.left=n.left+"px",s.style.top=n.top+"px",s.style.width=Math.max(n.width,70)+"px",s.style.height=Math.max(n.height,96)+"px"}),setTimeout(()=>s.remove(),560)}const A2={id:"slay",render:$a,handle(e,t){const n=t.table.view,s=t.table.you;if(!n||t.table.phase!=="play"||s===null)return!1;const o=n.hand??[];if(e.closest("#slayCall"))return o.length<=2&&o.length>0&&!n.slay?.[s]&&(t.move({k:"slay"}),t.sfx.sparkle()),!0;if(e.closest("#slayDeck"))return n.turn===s&&n.drawn==null&&(Se=null,t.move({k:"draw"}),t.sfx.click()),!0;if(e.closest("#slayPass"))return n.turn===s&&n.drawn!=null&&(Se=null,t.move({k:"pass"}),t.sfx.click()),!0;const i=e.closest("#crownPick [data-color]");if(i&&Se!==null)return t.move({k:"play",id:Se,color:+i.dataset.color}),Se=null,t.sfx.sparkle(),!0;const a=e.closest("#slayHand [data-card]");if(!a||a.hasAttribute("disabled"))return!!a;const r=+a.dataset.card,l=o.find(c=>c.id===r);return!l||n.turn!==s||!Rr(l,n)||(l.c===4?(Se=r,t.sfx.pop(),Ko&&$a(Ko,t)):(Se=null,t.move({k:"play",id:r}),t.sfx.click())),!0}},Dr="#5a3d5c",Ma=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),R2=`<svg viewBox="0 0 48 48"><path d="M24 42 C8 30 2 22 7 13 C11 6 20 8 24 16 C28 8 37 6 41 13 C46 22 40 30 24 42 Z" fill="#ff4d94" stroke="${Dr}" stroke-width="3" stroke-linejoin="round"/><path d="M16 16 Q20 12 22 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`,D2=`<svg viewBox="0 0 48 48"><path d="M24 3 L29 17 H44 L32 26 L37 42 L24 33 L11 42 L16 26 L4 17 H19 Z" fill="#66d9e8" stroke="${Dr}" stroke-width="3" stroke-linejoin="round"/><path d="M24 12 L26 18 H22 Z" fill="#fff" opacity=".8"/></svg>`,I2={id:"four",render(e,t){const n=t.table,s=n.view;if(!s||!Array.isArray(s.b)){e.innerHTML="";return}const o=n.you,i=o!==null&&s.turn===o&&n.phase==="play",a=new Set((s.line??[]).map(([_,B])=>_+":"+B)),r=s.last;let l="";for(let _=0;_<7;_++){const B=s.b[_];let p="";for(let v=5;v>=0;v--){const C=v<B.length?B[v]:null,S=a.has(_+":"+v)?" hot":"",D=r&&r.col===_&&r.row===v?" just":"";p+=`<span class="fourCell${C===0?" heart":C===1?" star":""}${S}${D}">${C===0?R2:C===1?D2:""}</span>`}const f=i&&B.length<6;l+=`<button type="button" class="fourCol" data-col="${_}" ${f?"":"disabled"} aria-label="Drop in column ${_+1}">${p}<span class="dropHint">${f?"▼":""}</span></button>`}const c=n.phase==="play"&&s.turn>=0,g=c?n.players[s.turn]:"",d=c?i?"Your turn!":`${Ma(t.name(g))}'s turn`:"",u=o===0?"You are <b>pink hearts</b>":o===1?"You are <b>aqua stars</b>":"Pink hearts and aqua stars",y=_=>_===0?"♥":"★",w=n.players.map((_,B)=>`<div class="playerChip ${s.turn===B?"isTurn":""}"><span class="chipFace">${t.face(_)}</span><b>${Ma(t.name(_))} ${y(B)}</b>${t.away(_)?'<i class="awayBadge">away</i>':""}</div>`).join("");e.innerHTML=`<div class="fourPlay">
      ${d?`<div class="whose ${i?"yours":""}" id="whoseTurn">${d}</div>`:""}
      <div class="fourChips">${w}</div>
      <p class="fourLegend">${u}</p>
      <div class="fourBoard" id="fourBoard">${l}</div>
    </div>`},handle(e,t){const n=e.closest(".fourCol");if(!n)return!1;const s=t.table.view,o=t.table.you;if(n.hasAttribute("disabled")||!s||o===null||s.turn!==o||t.table.phase!=="play")return!0;const i=+n.dataset.col;return!Number.isInteger(i)||s.b[i].length>=6||(t.move({col:i}),t.sfx.click()),!0}},La={slay:A2,four:I2},vs=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),N2={notHere:"Come into the clubhouse first!",taken:"Someone is sitting there!",playing:"You are already in this game!",playingElsewhere:"Finish your other game first!",notHost:"Waiting for the host…",needMore:"Play with friends on your street",tooMany:"That table is full!",notPlaying:"The game has not started!",notPlayer:"Sit down to play!",illegal:"You can't play that!",notAway:"She is still here!",tooSoon:"Give her a moment!",notSeated:"You are not at this table!",noMove:"No move to play!"};function O2(e){const t=document.getElementById("tableOverlay");let n=null,s="",o=0;const i=p=>p.away==null?0:p.away+Math.max(0,Date.now()-(p.receivedAt??Date.now())),a=()=>{o&&(clearInterval(o),o=0)},r=p=>{const f=!!p&&p.phase==="play"&&p.away!=null&&n!==null;f&&!o&&(o=window.setInterval(()=>d(),1e3)),f||a()},l=()=>e.hood(),c=()=>{const p=l();return!p||n===null?null:p.tables.get(n)??null},g=p=>{const f=l();return{table:p,me:f.pid,name:v=>f.players.get(v)?.nickname??"friend",face:v=>{const C=f.players.get(v)?.look;return C?ci(de(C)):""},move:v=>f.tbl({op:"move",tb:p.tb,m:v}),away:v=>{if(v===f.pid)return!1;const C=f.players.get(v);if(C&&!C.online)return!0;const S=f.presence.get(v);return!S||S.where!=="gameroom"},toast:e.toast,sfx:e.sfx}};t.addEventListener("click",p=>{const f=p.target;if(f.closest("#tblBack")){y(),e.sfx.swish();return}if(f.closest("#tblLeave")){w();return}if(f.closest("#tblStart")){_();return}if(f.closest("#tblNudge")){B();return}const v=c();v&&La[v.game]?.handle(f,g(v))});function d(){const p=l(),f=c();if(!p||!f){t.classList.add("hidden"),t.innerHTML="",a();return}const v=Xa[f.game],C=p.pid,S=f.seats.includes(C),D=f.seats.filter(Boolean).length,R=f.phase==="play"&&f.you!==null&&f.view&&f.view.turn===f.you,ee=f.view?.winPid??null;let ye="";if(f.phase==="over"){const Un=ee?p.players.get(ee)?.nickname??"Friend":"";f.game==="slay"?ye=ee?ee===C?"You slayed!":`${vs(Un)} slayed!`:"It's a tie!":ye=f.view?.draw||!ee?"It's a tie!":ee===C?"You got four!":`${vs(Un)} got four!`;const Gi=f.tb+":"+f.seq;ee===C&&s!==Gi&&(s=Gi,e.confetti(),e.sfx.sparkle())}const he=i(f),et=f.phase==="play"&&S&&he>=Wc&&f.you!==null&&!!f.view&&f.view.turn!==f.you&&f.view.turn>=0,Ee=f.phase!=="play"&&f.host===C&&D>=v.minPlayers&&D<=v.maxPlayers,Vl=S&&f.phase==="lobby"&&f.host!==C&&D>=v.minPlayers,Fl=S&&f.phase==="lobby"&&D<v.minPlayers;t.classList.remove("hidden"),t.dataset.tb=String(f.tb),t.dataset.phase=f.phase,t.dataset.game=f.game,t.dataset.you=f.you===null?"":String(f.you),t.innerHTML=`<div class="tblCard ${R?"yourTurn":""} game-${f.game}">
      <div class="tblTop"><h2>${vs(v.name)}</h2><div class="seatDots">${f.seats.map(Un=>`<i class="${Un?"on":""} ${Un===C?"me":""}"></i>`).join("")}</div></div>
      ${ye?`<div class="winWrap"><div class="winBanner" id="winBanner">${ye}</div></div>`:""}
      <div id="tblStage"></div>
      <div class="tblBar">
        ${Ee?'<button type="button" id="tblStart">Start</button>':""}
        ${Vl?'<p class="tblWait">Waiting for the host…</p>':""}
        ${et?'<button type="button" id="tblNudge">Play for her</button>':""}
        <button type="button" id="tblBack">Back to room</button>
        <button type="button" id="tblLeave">Leave table</button>
      </div>
      ${Fl?'<p class="tblWait" id="needFriend">Play with friends on your street</p>':""}
    </div>`;const Qi=t.querySelector("#tblStage");f.phase==="lobby"||!f.view?Qi.innerHTML=u(f,p,C):La[f.game]?.render(Qi,g(f)),r(f)}function u(p,f,v){return`<div class="lobby">${p.seats.map((C,S)=>`<div class="lobbySeat ${C?"filled":""} ${C===v?"me":""}">
      <span>${S+1}</span><b>${C?vs(f.players.get(C)?.nickname??"friend"):"Empty"}</b>
      ${C&&C===p.host?"<i>host</i>":""}${C===v?"<i>you</i>":""}
    </div>`).join("")}</div>`}function y(){n=null,a(),t.classList.add("hidden"),t.innerHTML=""}function w(){const p=l(),f=c();p&&f&&f.seats.includes(p.pid)&&p.tbl({op:"leave",tb:f.tb}),e.sfx.click(),y()}function _(){const p=l(),f=c();p&&f&&(p.tbl({op:"start",tb:f.tb}),e.sfx.sparkle())}function B(){const p=l(),f=c();p&&f&&(p.tbl({op:"nudge",tb:f.tb}),e.sfx.click())}return{open(p){n=p,d()},close:y,refresh:d,fail(p,f){e.toast(N2[f]||"Try that again!"),e.sfx.pop(),n===p&&d()},isOpen:()=>n}}const q2=120,j2=192,V2=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let U=null,Tt=null,ht=null,Ba=!1;const Ot=()=>(document.getElementById("gameroom")?.clientHeight||600)/Os,Ss=()=>Tt;function Bn(){const e=U?.hood();if(!e)return null;for(const[t,n]of e.tables){const s=n.seats.indexOf(e.pid);if(s>=0){const o=os(Number(t))[s];return{tb:Number(t),seat:s,x:o.x,y:o.y}}}return null}function F2(){const e=U?.hood();if(!e)return!1;for(const[t,n]of e.players)if(t!==e.pid&&n.online)return!0;return!1}function Z2(e){if(U=e,Tt=O2({hood:e.hood,toast:e.toast,confetti:()=>gr(),sfx:e.sfx}),Ba)return Tt;Ba=!0;const t=document.getElementById("grWorld");return t.addEventListener("click",G2),t.addEventListener("pointerdown",n=>{n.target.closest(".grChair, .grTable, .grDoor, .pet")&&n.stopPropagation()}),Tt}function _i(){if(!U)return;const e=Ot(),t=document.getElementById("grWorld"),n=o=>o*e+"px";t.style.width=eo*e+"px",t.style.height=Os*e+"px",t.style.setProperty("--sc",String(e));let s=u2();s+=`<button class="grDoor" data-gr="map" aria-label="Back to the map" style="left:${n(78)};top:${n(268)};width:${n(86)};height:${n(170)}"></button>`,Fn.forEach((o,i)=>{const a=o.seats>=6?560:o.seats>=4?440:340;s+=`<button class="grTable" data-tb="${i}" aria-label="${Xa[o.game].name} table" style="left:${n(o.x-a/2)};top:${n(456)};width:${n(a)};height:${n(70)}"></button>`,os(i).forEach((r,l)=>{s+=`<button class="grChair" data-tb="${i}" data-seat="${l}" aria-label="Empty chair" style="left:${n(r.x-38)};top:${n(r.y-16)};width:${n(76)};height:${n(72)}"></button>`})}),s+='<div class="savatars" id="gavatars"></div>',t.innerHTML=s,On()}function On(){if(!U||U.view()!=="gameroom")return;const e=document.getElementById("gavatars");if(!e)return;const t=Ot(),n=new Set;for(const i of Q2()){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&X2(a));const r=JSON.stringify(i.look)+i.name+(i.away?":away":"");if(a.dataset.look!==r){const u=a.querySelector(".bubble");a.innerHTML=`<div class="inner">${de(i.look)}</div>${i.name?`<div class="nametag">${V2(i.name)}${i.away?'<i class="awayBadge">away</i>':""}</div>`:""}`,u&&a.appendChild(u),a.dataset.look=r}const l=(sn[i.look.size]??1)*t*.95,c=q2*l,g=j2*l,d=i.seated?i.y-8:i.y;a.style.left=i.x*t-c/2+"px",a.style.top=d*t-g+"px",a.style.width=c+"px",a.style.height=g+"px",a.style.zIndex=String(100+Math.round(i.y)),a.classList.toggle("flipped",i.flip),a.classList.toggle("away",i.away),a.classList.toggle("seated",i.seated)}e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),U.refreshNear();const s=U.hood();document.querySelectorAll("#grWorld .grChair").forEach(i=>{const a=s?.tables.get(+i.dataset.tb)?.seats[+i.dataset.seat];i.classList.toggle("taken",!!a);const r=a?s.players.get(a)?.nickname:"";i.setAttribute("aria-label",r?r+" is sitting":"Empty chair")});const o=document.getElementById("grSolo");o&&o.classList.toggle("hidden",F2())}function Q2(){const e=[],t=U.hood();if(t){const n=new Map;for(const[a,r]of t.tables)r.seats.forEach((l,c)=>{l&&n.set(l,os(Number(a))[c])});const s=[...t.presence.entries()],o=U.myPres();o&&s.push([t.pid,o]);const i=new Set;for(const[a,r]of s){if(r.where!=="gameroom")continue;const l=t.players.get(a);if(!l)continue;i.add(a);const c=n.get(a);e.push({key:a,look:l.look,name:l.nickname,x:c?.x??r.x,y:c?.y??r.y,flip:r.flip,mine:a===t.pid,away:!1,seated:!!c})}for(const[a,r]of n){if(i.has(a))continue;const l=t.players.get(a);l&&e.push({key:a,look:l.look,name:l.nickname,x:r.x,y:r.y,flip:!1,mine:!1,away:!0,seated:!0})}}else{const n=U.solo();if(n?.where==="gameroom"){const s=U.soloLook();e.push({key:"solo",look:s.look,name:"",x:n.x,y:n.y,flip:n.flip,mine:!0,away:!1,seated:!1})}}return e}function G2(e){if(!U||U.view()!=="gameroom")return;const t=e.target,n=t.closest(".savatar");if(n){const c=U.hood(),g=n.dataset.pid;if(c&&g){for(const[d,u]of c.tables)if(u.seats.includes(g)){Tt?.open(Number(d));return}}return}if(t.closest('[data-gr="map"]')){U.goMap();return}const s=t.closest(".grChair");if(s){K2(+s.dataset.tb,+s.dataset.seat);return}const o=t.closest(".grTable");if(o){if(!U.hood()){Ir();return}Tt?.open(+o.dataset.tb),U.sfx.click();return}if(t.closest(".pet")||Bn())return;const i=document.getElementById("grWorld").getBoundingClientRect(),a=Ot(),r=(e.clientX-i.left)/a,l=(e.clientY-i.top)/a;l<430||(ht={x:Math.max(60,Math.min(eo-60,r)),y:Math.max(470,Math.min(590,l))})}function K2(e,t){if(!U)return;const n=U.hood();if(!n){Ir();return}const s=n.tables.get(e)?.seats[t];if(s&&s!==n.pid){U.toast((n.players.get(s)?.nickname??"Someone")+" is sitting there!"),U.sfx.pop(),Tt?.open(e);return}ht=null,n.tbl({op:"sit",tb:e,seat:t});const o=os(e)[t];U.setPres({where:"gameroom",x:o.x,y:Math.max(470,Math.min(590,o.y)),flip:!1}),Tt?.open(e),U.sfx.click()}function Ir(){if(!U)return;const e=document.getElementById("grSolo");e&&(e.classList.remove("hidden"),e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),U.toast("Play with friends on your street"),U.sfx.pop()}function Y2(e){if(!U||U.view()!=="gameroom"||!ht)return;if(Bn()){ht=null;return}const t=U.hood()?U.myPres():U.solo();if(!t||t.where!=="gameroom"){ht=null;return}const n=ht.x-t.x,s=ht.y-t.y,o=Math.hypot(n,s);if(o<4){ht=null;return}const i=Math.min(o,300*e),a={where:"gameroom",x:t.x+n/o*i,y:t.y+s/o*i,flip:Math.abs(n)>2?n<0:t.flip};U.setPres(a);const r=Ot(),l=document.getElementById("grScroll"),c=a.x*r-l.scrollLeft;(c<l.clientWidth*.22||c>l.clientWidth*.78)&&(l.scrollLeft=a.x*r-l.clientWidth/2)}function X2(e){e.addEventListener("pointerdown",t=>{if(!U||Bn())return;const n=U.hood()?U.myPres():U.solo();if(!n||n.where!=="gameroom")return;t.preventDefault(),t.stopPropagation(),ht=null;const s=Ot(),o=document.getElementById("grWorld"),i=document.getElementById("grScroll"),a=p=>{const f=o.getBoundingClientRect();return{x:(p.clientX-f.left)/s,y:(p.clientY-f.top)/s}},r=a(t),l={x:n.x-r.x,y:n.y-r.y};let c=t,g=0,d=n.x,u=!1;const y=p=>{const f=U.hood()?U.myPres():U.solo();if(!f||f.where!=="gameroom")return;const v=a(p),C=Math.max(60,Math.min(eo-60,v.x+l.x)),S=Math.max(470,Math.min(590,v.y+l.y));if(!u&&Math.hypot(C-f.x,S-f.y)<6)return;u=!0;const D=Math.abs(C-d)>3?C<d:f.flip;Math.abs(C-d)>3&&(d=C),U.setPres({where:"gameroom",x:C,y:S,flip:D})},w=()=>{const p=i.getBoundingClientRect(),f=c.clientX<p.left+70?-12:c.clientX>p.right-70?12:0;f&&u&&(i.scrollLeft+=f,y(c)),g=requestAnimationFrame(w)};g=requestAnimationFrame(w),e.classList.add("lifted"),U.sfx.pick();const _=p=>{p.pointerId===t.pointerId&&(c=p,y(p))},B=p=>{p.pointerId===t.pointerId&&(cancelAnimationFrame(g),window.removeEventListener("pointermove",_),window.removeEventListener("pointerup",B),e.classList.remove("lifted"),u&&U.sfx.drop())};window.addEventListener("pointermove",_),window.addEventListener("pointerup",B)})}const Hn=S2(),V=Ka();let Pe=V;const Nr=[],Ca=new WeakSet;function Or(e){Ca.has(e)||(Ca.add(e),e.subscribe((t,n)=>{Pe===e&&Nr.forEach(s=>s(t,n))}))}Or(V);const L={get:()=>Pe.get(),dispatch:e=>Pe.dispatch(e),subscribe:e=>{Nr.push(e)}},ae=Bt,De=In,lo=390;let se=1e3;const co=()=>Math.max(0,ae-se),qr=375,jr=(e,t)=>e.wall?Math.min(t,qr):t,qt=120,lt=192,xi=[{id:"living",name:"Living Room",color:"#ff8fab"},{id:"bedroom",name:"Bedroom",color:"#b388d6"},{id:"kitchen",name:"Kitchen",color:"#5cc985"},{id:"salon",name:"Salon",color:"#f0a0d8"},{id:"nursery",name:"Nursery",color:"#9ad7f5"}],Vr=e=>xi.find(t=>t.id===e)?.color??"#ccc",xn=[{id:"__people",name:"People",icon:"",kind:"people"},...["furniture","decor","plants","food","pets"].map((e,t)=>({id:e,name:e,icon:["armchair","balloon","flowers","donut","cat"][t],kind:"cat"}))];xn.push({id:"secrets",name:"Secrets",icon:"egg:chloe-starlamp",kind:"cat"});for(const e of vt)xn.some(t=>t.kind==="cat"&&t.id===e.cat)||xn.push({id:e.cat,name:e.cat,icon:e.kind,kind:"cat"});for(const e of vt)e.pack&&!xn.some(t=>t.id==="pack:"+e.pack)&&xn.push({id:"pack:"+e.pack,name:dr(e.pack),icon:e.kind,kind:"pack"});const Bo=e=>vt.filter(t=>Rv(t,e,L.get().currentRoom,$i==="all",io())),J2=["#ffd6e0","#d9ccff","#cdf3dc","#cfe8ff","#fff1b8","#ffe0c7","#ffffff","#f6c1ff"],eb=["#e8b98a","#f2d0a4","#c99366","#ffe7a8","#bfe3d0","#d6d6f5","#ffc8dd","#9fb4c7"],nt={paint:'<svg viewBox="0 0 48 48"><path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M28 12 L34 6 L42 14 L36 20" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/></svg>',shirt:'<svg viewBox="0 0 48 48"><path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',soundOn:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 17 Q37 24 32 31 M36 12 Q45 24 36 36" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',soundOff:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ddd" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M33 19 L43 29 M43 19 L33 29" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',flip:'<svg viewBox="0 0 48 48"><path d="M24 6 V42" stroke="#5a3d5c" stroke-width="3" stroke-dasharray="4 4"/><path d="M18 12 L6 36 H18 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M30 12 L42 36 H30 Z" fill="#fff" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',front:'<svg viewBox="0 0 48 48"><rect x="6" y="6" width="22" height="22" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="18" y="18" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',back:'<svg viewBox="0 0 48 48"><rect x="18" y="18" width="24" height="24" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="22" height="22" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',trash:'<svg viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="28" rx="5" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><rect x="8" y="9" width="32" height="7" rx="3.5" fill="#ffadad" stroke="#5a3d5c" stroke-width="3"/><path d="M20 21 V35 M28 21 V35" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>'},tb='<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',Fr='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',nb=document.getElementById("app");nb.innerHTML=`
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round ownOnly" id="btnLock" aria-label="Lock house"></button>
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${He.chat}</button>
    <button class="round soloOnly" id="btnHood" aria-label="Friends">${He.street}</button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${He.home}</button>
    <button class="round streetOnly" id="btnParent" aria-label="Grown-ups">${He.shield}</button>
    <button class="round streetOnly" id="btnSolo" aria-label="Play in my own house">${He.solo}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${Ng}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${l2}</button>
    <button class="round" id="btnPets" aria-label="Pets">${rr}</button>
    <button class="round" id="btnPaint" aria-label="Colors">${nt.paint}</button>
    <button class="round" id="btnDress" aria-label="Characters">${nt.shirt}</button>
    <button class="round" id="btnSound" aria-label="Sound"></button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${li}</button>
  </div>
</div>
<div class="stageWrap" id="stageWrap">
  <div class="stage" id="stage">
    <div class="world" id="world">
      <div class="wall" id="wall"></div><div class="floor" id="floor"></div><div class="baseboard"></div>
      <div class="scenery" id="scenery"></div>
      <div class="layer" id="layer"></div>
      <div class="toolbar hidden" id="toolbar">
        <button data-a="flip">${nt.flip}</button><button data-a="front">${nt.front}</button><button data-a="back">${nt.back}</button><button data-a="delete" class="danger">${nt.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <div class="bin" id="bin">${nt.trash}</div>
  <div class="houseTag hoodOnly" id="houseTag"></div>
  <div class="secrets" id="secrets"></div>
</div>
<div class="drawer">
  <div class="drawerBar" id="drawerBar">
    <div class="drawerTop">
      <div class="modeToggle" id="modeToggle">
        <button type="button" id="modePlay" data-mode="play" aria-label="Play" aria-pressed="false"><span class="modeIco"></span><span class="modeWord">Play</span></button>
        <button type="button" id="modeDecorate" data-mode="decorate" aria-label="Decorate" aria-pressed="true"><span class="modeIco"></span><span class="modeWord">Decorate</span></button>
      </div>
      <div class="rooms" id="roomFilter"></div>
      <div class="cats" id="cats"></div>
    </div>
    <div class="chipCue" id="chipCue" aria-hidden="true">›</div>
  </div>
  <div class="shelf" id="shelf"></div>
</div>
<div class="street park ranch hidden" id="ranch"><div class="streetScroll" id="ranchScroll"><div class="parkWorld ranchWorld" id="ranchWorld"></div></div></div>
<button class="basketChip hidden" id="basketChip" aria-label="My basket"></button>
<div class="street park hidden" id="park"><div class="streetScroll" id="parkScroll"><div class="parkWorld" id="parkWorld"></div></div></div>
<div class="street grRoom hidden" id="gameroom"><div class="streetScroll" id="grScroll"><div class="parkWorld grWorld" id="grWorld"></div></div><div id="grSolo" class="grSolo hidden">Play with friends on your street</div></div>
<div id="tableOverlay" class="tableOverlay hidden"></div>
<div class="street mapView hidden" id="street"><button class="mailCue" id="mailCue" type="button">You've got mail!</button><div class="mapWorld" id="mapWorld"></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>
<div id="toastLane"></div>
<div class="phoneNote" id="phoneNote"><div class="card"><h2>Turn sideways</h2><p>Turn your phone sideways for more room to play!</p><button class="phoneOk" id="phoneOk" type="button">OK!</button></div></div>
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>`;const b=e=>document.getElementById(e),K=b("stage"),Zr=b("world"),Le=b("layer"),ut=b("toolbar"),Ws=b("bin");let pe=null,Be=L.get().characters[0]?.id??null,Ze="furniture",$i="",Yo="",sb=Date.now()%1e5;const Xo=e=>`${e}-${Date.now().toString(36)}${(++sb).toString(36)}${Math.random().toString(36).slice(2,5)}`,ot="__me";let h=null,x="house",ie=!1,le="",qs=new Map,Qr=!1;const Ve=Eg(b("modeToggle"),{ownHouse:()=>!h||!le||le===h.myHouseId(),onChange:()=>{Qr&&Cn()}}),qn=Cg({send:(e,t,n,s)=>h?.sendMail(e,t,n,s),read:(e,t)=>h?.readMail(e,t),drop:(e,t)=>h?.dropMail(e,t),houseOf:e=>[...h?.players.values()??[]].find(t=>t.pid===e)?.houseId??"",houseName:e=>h?.houses.get(e)?.meta.name??"My House",lettersOf:e=>h?.houses.get(e)?.confirmed.mailbox?.letters??[],mine:e=>!!h&&h.houses.get(e)?.meta.ownerId===h.pid,toast:T,openOwn:()=>{const e=h?.myHouseId();e&&yl(e)},freeType:()=>!h||or(h.settings)});Ve.sync(!0);const An=new Map,js={};let j=Mn,kn=0;Qr=!0;let Gn=null;const go=()=>{cancelAnimationFrame(kn),Gn=null},Mi=e=>Math.max(0,Math.min(co(),e));function Ne(e){j=Mi(e),js[L.get().currentRoom]=j,Zr.style.transform=`translate3d(${-j}px,0,0)`,b("nudgeL").classList.toggle("off",j<=1),b("nudgeR").classList.toggle("off",j>=co()-1);const t=b("mmView");t.style.left=j/ae*100+"%",t.style.width=se/ae*100+"%",pe&&ol(L.get())}function po(e){cancelAnimationFrame(kn),e=Mi(e),Gn=e;const t=()=>{const n=e-j;if(Math.abs(n)<.5){Ne(e),Gn=null;return}Ne(j+n*.18),kn=requestAnimationFrame(t)};kn=requestAnimationFrame(t)}const Ue=()=>K.getBoundingClientRect().width/se,ob="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)",Li=window.matchMedia(ob);function ib(){const e=Li.matches;document.body.classList.toggle("phone",e),document.body.classList.toggle("phone-portrait",e&&window.matchMedia("(orientation: portrait)").matches);const t=b("stageWrap");for(const n of[b("nudgeL"),b("nudgeR")]){const s=e?t:K;n.parentElement!==s&&s.appendChild(n)}}function Gr(){const e=document.querySelector(".top");if(!e)return;const t=e.getBoundingClientRect(),n=document.body.classList.contains("phone")?t.bottom:t.height;document.documentElement.style.setProperty("--chrome-h",Math.ceil(n)+"px")}function ab(){const e=document.documentElement,t=document.getElementById("app");if(!(document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait"))){t.style.top="",t.style.height="",t.style.bottom="",e.style.removeProperty("--vvh"),e.style.removeProperty("--vvt");return}const s=window.visualViewport,o=Math.round(s?s.height:window.innerHeight),i=Math.round(s?s.offsetTop:0);e.style.setProperty("--vvh",o+"px"),e.style.setProperty("--vvt",i+"px"),t.style.top=i+"px",t.style.height=o+"px",t.style.bottom="auto"}function Cn(){ib(),ab(),Gr();const e=b("stageWrap"),t=document.body.classList.contains("phone"),n=e.clientWidth,s=e.clientHeight;if(t?s>n*.85:s>n+40){const a=n/Math.max(1,s);se=Math.round(Math.max(480,Math.min(860,De*a)))}else if(t){const a=n/Math.max(1,s);se=Math.round(Math.max(480,Math.min(ae,De*a)))}else se=1e3;K.style.width=se+"px",K.style.height=De+"px";const i=Math.min(n/se,s/De);if(K.style.left="",K.style.top="",K.style.transform=`translate(-50%,-50%) scale(${i})`,t&&K.style.setProperty("--fit",String(Ue())),rb(),j>co())Ne(j);else{const a=b("mmView");a.style.left=j/ae*100+"%",a.style.width=se/ae*100+"%"}ue(),!t&&x==="house"&&is(!1),hb(),x==="ranch"&&requestAnimationFrame(ri),Wn(),t&&x==="ranch"&&g4(),Kr(),Ve.hint()}function rb(){const e=b("stageWrap"),t=document.body.classList.contains("phone")&&x==="house";for(const n of[b("nudgeL"),b("nudgeR")]){if(!t||n.parentElement!==e){n.style.top="",n.style.marginTop="",n.style.left="",n.style.right="";continue}const s=K.getBoundingClientRect(),o=e.getBoundingClientRect(),i=(s.top+s.bottom)/2-o.top;n.style.top=i+"px",n.style.marginTop=-n.offsetHeight/2+"px",n.style.left="",n.style.right=""}}function Kr(){const e=b("secrets"),t=b("stageWrap"),n=document.querySelector(".tools"),s=document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait")&&window.matchMedia("(orientation: landscape) and (max-height: 360px)").matches;if(e.classList.remove("compact"),document.body.classList.remove("secrets-chrome"),e.parentElement!==t&&t.appendChild(e),!s||!n)return;const o=e.getBoundingClientRect().width,i=K.getBoundingClientRect(),a=window.innerWidth-i.right;if(a>=o+2)return;e.classList.add("compact");const r=e.getBoundingClientRect();!(r.left<i.right-.5&&r.right>i.left+.5&&r.top<i.bottom-.5&&r.bottom>i.top+.5)&&a>=44||(document.body.classList.add("secrets-chrome"),e.parentElement!==n&&n.appendChild(e))}function ue(e=0){if(!document.body.classList.contains("phone"))return;if(x==="house"){Yr();return}const t=x==="park"?"parkScroll":x==="ranch"?"ranchScroll":x==="gameroom"?"grScroll":"";if(!t)return;const n=document.getElementById(t);if(!n||n.clientWidth<20){e<8&&requestAnimationFrame(()=>ue(e+1));return}const s=n.querySelector(".savatar.mine")??n.querySelector(".savatar");if(!s){e<8&&requestAnimationFrame(()=>ue(e+1));return}lb(n,[s,...s.querySelectorAll(".nametag")])&&e<8?requestAnimationFrame(()=>ue(e+1)):x==="ranch"&&!ie&&ql()}function lb(e,t){const s=e.getBoundingClientRect(),o=Math.min(s.right,window.innerWidth)-8,i=Math.max(s.left,0)+8;let a=0,r=0;for(const c of t){const g=c.getBoundingClientRect();g.width<2||g.height<2||(a=Math.max(a,g.right-o),r=Math.max(r,i-g.left))}if(a<=1&&r<=1)return!1;const l=e.scrollLeft;return a>1&&r>1?e.scrollLeft-=r:a>1?e.scrollLeft+=a:e.scrollLeft-=r,Math.abs(e.scrollLeft-l)>.5}function Yr(){is(!1)}function is(e){if(x!=="house")return;const t=document.querySelector("#layer .char.avatar.mine")??document.querySelector("#layer .char");if(!t)return;const n=Ue()||1,s=K.getBoundingClientRect(),o=8;let i=Math.min(s.right,window.innerWidth)-o,a=Math.max(s.left,0)+o;for(const w of["nudgeL","nudgeR"]){const _=b(w);if(!_||_.classList.contains("off")||_.offsetParent===null)continue;const B=_.getBoundingClientRect();B.width<2||B.height<2||(w==="nudgeL"?a=Math.max(a,B.right+6):i=Math.min(i,B.left-6))}i-a<48&&(i=Math.min(s.right,window.innerWidth)-o,a=Math.max(s.left,0)+o);const r=[t,...t.querySelectorAll(".nametag")];let l=0,c=0,g=1/0,d=-1/0;for(const w of r){const _=w.getBoundingClientRect();_.width<2||_.height<2||(l=Math.max(l,_.right-i),c=Math.max(c,a-_.left),g=Math.min(g,_.left),d=Math.max(d,_.right))}if(document.body.classList.contains("phone-portrait")&&g<1/0){const w=(g+d)/2-(a+i)/2;if(Math.abs(w)>3){Ne(j+w/n);return}}const u=cb(t),y=Dv({cam:j,maxCam:co(),kidX:u,overflowL:c,overflowR:l,scale:n,nudgeX:e});Math.abs(y.cam-j)>.5&&Ne(y.cam),e&&Math.abs(y.kidX-u)>.5&&gb(t,y.kidX)}function cb(e){if(e.dataset.pid&&h){const t=e.dataset.pid===h.pid?oe():h.presence.get(e.dataset.pid);if(t&&t.where==="house")return t.x}return L.get().characters.find(t=>t.id===e.dataset.cid)?.x??0}function gb(e,t){if(e.dataset.pid&&h&&e.classList.contains("mine")){const o=oe();if(!o||o.where!=="house")return;_e({...o,x:t}),Dt();return}const n=e.dataset.cid;if(!n)return;const s=L.get().characters.find(o=>o.id===n);s&&L.dispatch({type:"char/move",id:n,room:L.get().currentRoom,x:t,y:s.y})}const db={living:"Living",bedroom:"Bed",kitchen:"Kitchen",salon:"Salon",nursery:"Nursery"},pb='<svg class="tabIco" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6 L8 1 L15 6 V11 H1 Z" fill="currentColor"/></svg>';function Xr(){return window.matchMedia("(max-width: 900px) and (min-height: 700px)").matches&&!document.body.classList.contains("phone")}function hb(){const e=Xr()?"c":"f";e!==Yo&&(Yo=e,sl(L.get()))}window.addEventListener("resize",Cn);Li.addEventListener("change",Cn);let Sa="",Co=!1;function Wa(){const e=b("stageWrap"),t=document.querySelector(".top"),n=document.querySelector(".tools"),s=a=>a?a.clientWidth+"x"+a.clientHeight:"0",o=window.visualViewport;return(o?Math.round(o.offsetTop)+"x"+Math.round(o.height)+"x"+Math.round(o.width):"")+" "+s(e)+" "+s(t)+" "+s(n)}function Kn(){if(!(Co||!Li.matches||Wa()===Sa)){Co=!0;try{Cn(),Sa=Wa()}finally{Co=!1}}}if(typeof ResizeObserver<"u"){const e=new ResizeObserver(()=>Kn()),t=document.querySelector(".top");t&&e.observe(t),e.observe(b("stageWrap"));const n=document.querySelector(".tools");n&&e.observe(n)}window.visualViewport&&(window.visualViewport.addEventListener("resize",()=>Kn()),window.visualViewport.addEventListener("scroll",()=>Kn()));K.addEventListener("scroll",()=>{K.scrollLeft=0,K.scrollTop=0});const ct=(e,t)=>{const n=K.getBoundingClientRect();return{x:(e-n.left)/n.width*se+j,y:(t-n.top)/n.height*De}},Jo=(e,t)=>{const n=K.getBoundingClientRect();return e>n.left&&e<n.right&&t>n.top&&t<n.bottom},Ua=(e,t)=>{const n=Ws.getBoundingClientRect();return e>n.left-20&&e<n.right+20&&t>n.top-20&&t<n.bottom+20},as=e=>sn[e.size]??1;function fb(e,t){const n=as(e);let s=Ct[t].x;return e.flip&&(s=100-s),{x:e.x+(s-50)/100*qt*n,y:e.y-lt*n+Ct[t].y/160*lt*n}}function Jr(e){const t=L.get();let n=null;for(const s of t.characters){if(s.room!==t.currentRoom)continue;const o=as(s),i=Math.abs(e.x-s.x)<qt*o/2+25&&e.y>s.y-lt*o-25&&e.y<s.y+20;for(const a of["left","right"]){if(s.held[a])continue;const r=fb(s,a),l=Math.hypot(e.x-r.x,e.y-r.y);(i||l<75)&&(!n||l<n.d)&&(n={c:s,hand:a,d:l})}}return n}const el=["none","radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)","repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)","linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)"],tl="repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 125px), linear-gradient(rgba(0,0,0,.06), transparent 50%)",ei=e=>`url('${e.replace(/'/g,"%27")}')`;function nl(e){const t=e.rooms[e.currentRoom],n=b("wall"),s=b("floor"),o=t.wallTile?pa[t.wallTile]:void 0;n.style.backgroundColor=t.wallpaper,o?(n.style.backgroundImage=ei(o.url),n.style.backgroundSize="220px auto",n.style.backgroundPosition="0 0"):(n.style.backgroundImage=el[t.pattern]??"none",n.style.backgroundSize=t.pattern===1?"44px 44px":t.pattern===3?"60px 60px":"auto",n.style.backgroundPosition=t.pattern===3?"0 0, 30px 30px":"0 0");const i=t.floorTile?pa[t.floorTile]:void 0;s.style.backgroundColor=t.floor,s.style.backgroundImage=i?`${ei(i.url)}, linear-gradient(rgba(0,0,0,.06), transparent 50%)`:tl,s.style.backgroundSize=i?"180px auto, auto":"auto",b("mmWall").style.background=t.wallpaper,b("mmFloor").style.background=t.floor,Lr(b("scenery"),e.currentRoom,t.items)}function Bi(e){const n=e.rooms[e.currentRoom].items.filter(o=>Ke[o.kind]).map(o=>`<i style="left:${o.x/ae*100}%;top:${(o.y-Ae(Ke[o.kind])*o.scale/2)/De*100}%"></i>`).join(""),s=e.characters.filter(o=>o.room===e.currentRoom).map(o=>`<b style="left:${o.x/ae*100}%;top:${(o.y-90)/De*100}%;background:${o.shirt}"></b>`).join("");b("mmDots").innerHTML=n+s}function sl(e){const t=Xr();Yo=t?"c":"f",document.body.classList.toggle("tabs-compact",t),b("tabs").innerHTML=xi.map(n=>{const s=t?db[n.id]??n.name:n.name;return`<button class="tab ${e.currentRoom===n.id?"on":""}" data-room="${n.id}" style="--c:${n.color}" aria-label="${n.name}">${t?pb:""}${s}</button>`}).join("")}function Sn(e,t,n,s,o){e.style.left=(t-s/2)/ae*100+"%",e.style.top=(n-o)/De*100+"%",e.style.width=s/ae*100+"%",e.style.height=o/De*100+"%"}function mb(e,t){let n=e.w*t,s=Ae(e)*t;if((e.kind==="kennel"||e.kind==="cat-tower")&&document.body.classList.contains("phone")){const o=Math.max(.2,Ue()||1),i=44*ae/(Math.max(1,se)*o),a=44/o;n<i&&(n=i),s<a&&(s=a)}return{w:n,h:s}}function kt(e){const t=e.rooms[e.currentRoom],n=new Set;for(const s of t.items){const o=Ke[s.kind];if(!o)continue;n.add(s.id);let i=Le.querySelector(`.item[data-id="${s.id}"]`);i||(i=document.createElement("div"),i.className="item",i.dataset.id=s.id,i.innerHTML=`<div class="inner">${yn(o)}</div>`,Le.appendChild(i),i.addEventListener("pointerdown",r=>ll(i,r))),i.dataset.kind=s.kind;const a=mb(o,s.scale);Sn(i,s.x,s.y,a.w,a.h),i.style.zIndex=String(1e3+s.z),i.classList.toggle("flipped",s.flip),i.classList.toggle("sel",pe===s.id)}Le.querySelectorAll(".item").forEach(s=>{n.has(s.dataset.id)||s.remove()}),Lr(b("scenery"),e.currentRoom,t.items),ol(e),Bi(e)}const it=new Map;function ub(e){const t=as(e),n=qt*t,s=lt*t;return["left","right"].map(o=>{const i=e.held[o],a=i&&Ke[i.kind];if(!i||!a)return"";const r=Math.min(.7,120*t/Math.max(a.w,Ae(a))/i.scale),l=a.w*i.scale*r,c=Ae(a)*i.scale*r,g=Ct[o].x/100*n,d=Ct[o].y/160*s;return`<div class="held ${i.flip?"flipped":""}" data-hand="${o}" style="left:${(g-l/2)/n*100}%;top:${(d-c*.62)/s*100}%;width:${l/n*100}%;height:${c/s*100}%"><div class="inner">${yn(a)}</div></div>`}).join("")}function At(e){const t=e.characters.filter(n=>n.room===e.currentRoom);for(const[n,s]of it)t.some(o=>o.id===n)||(s.remove(),it.delete(n));for(const n of t){let s=it.get(n.id);s||(s=document.createElement("div"),s.className="char",s.dataset.cid=n.id,s.innerHTML='<div class="inner"></div><div class="hands"></div>',Le.appendChild(s),it.set(n.id,s),vb(s));const o=[n.skin,n.hair,n.hairStyle,n.shirt,n.pants,n.acc].join("|");s.dataset.look!==o&&(s.querySelector(".inner").innerHTML=de(n),s.dataset.look=o);const i=JSON.stringify([n.held.left?.id,n.held.left?.flip,n.held.right?.id,n.held.right?.flip,n.size]);s.dataset.held!==i&&(s.querySelector(".hands").innerHTML=ub(n),s.dataset.held=i);const a=as(n);Sn(s,n.x,n.y,qt*a,lt*a),s.style.zIndex=String(5e3+Math.round(n.y)),s.classList.toggle("flipped",n.flip),s.classList.toggle("active",n.id===Be)}Bi(e)}function ol(e){const t=pe&&e.rooms[e.currentRoom].items.find(o=>o.id===pe);if(!t||!Ke[t.kind]){ut.classList.add("hidden");return}const n=Ke[t.kind],s=t.y-Ae(n)*t.scale-20;ut.classList.remove("hidden"),ut.style.left=Math.max(j+130,Math.min(j+se-130,t.x))/ae*100+"%",ut.style.top=Math.max(40,s)/De*100+"%"}function il(e){b("btnSound").innerHTML=e.soundOn?nt.soundOn:nt.soundOff,zv(e.soundOn)}function $n(){const e=L.get();Le.innerHTML="",it.clear(),sl(e),nl(e),kt(e),At(e),il(e);const t=e.characters.find(o=>o.room===e.currentRoom),n=h&&oe(),s=n&&n.where==="house"?n.x:t?.x;go(),Ne(js[e.currentRoom]??Mi(s!==void 0?s-se/2:Mn)),Dt(),gt(),document.body.classList.contains("phone")&&x==="house"&&requestAnimationFrame(()=>Yr())}L.subscribe((e,t)=>{switch(t.type){case"room/switch":h&&Pe!==V&&xb(t.room),$n(),Xe();break;case"game/reset":$n();break;case"room/wallpaper":case"room/floor":case"room/pattern":case"room/wallTile":case"room/floorTile":nl(e);break;case"char/update":case"char/move":At(e),x==="ranch"?Ht():x==="park"&&on();break;case"char/add":case"char/delete":case"char/hold":case"char/release":kt(e),At(e),Ze==="__people"&&Xe();break;case"settings/sound":il(e);break;default:kt(e)}});function Ie(e){if(!e)return;const t=e.querySelector(":scope > .inner")??e;t.classList.remove("bounce"),t.offsetWidth,t.classList.add("bounce")}function Ci(e,t,n=7){const s=b("fx"),o=["#ffd166","#ff8fab","#8ecae6","#80ed99","#c9a0dc"];for(let i=0;i<n;i++){const a=document.createElement("div");a.className="spark";const r=Math.PI*2*i/n+Math.random()*.5,l=40+Math.random()*30;a.style.left=e+"px",a.style.top=t+"px",a.style.background=o[i%o.length],a.style.setProperty("--dx",Math.cos(r)*l+"px"),a.style.setProperty("--dy",Math.sin(r)*l+"px"),s.appendChild(a),setTimeout(()=>a.remove(),650)}}const ho=e=>{const t=e?.getBoundingClientRect();t&&Ci(t.left+t.width/2,t.top+t.height/2)};function Si(e,t){Ci(e,t,10),$.pop()}function Vs(e){it.forEach((t,n)=>{t.classList.toggle("hold-target",!!e&&e.c.id===n),t.dataset.hand=e&&e.c.id===n?e.hand:""})}function al(e,t){L.dispatch({type:"char/hold",id:e.c.id,hand:e.hand,room:e.c.room,itemId:t}),pe=null,kt(L.get());const n=it.get(e.c.id);Ie(n),ho(n?.querySelector(`.held[data-hand="${e.hand}"]`)),$.sparkle()}const at=new Map;let Ye=!1,Fs=0;const Wi=()=>[...at.values()].reduce((e,t)=>e+t,0)/at.size;K.addEventListener("pointerdown",e=>{e.pointerType==="touch"&&(at.set(e.pointerId,e.clientX),at.size>=2&&(Ye=!0,Fs=Wi(),go(),ut.classList.add("hidden")))},!0);window.addEventListener("pointermove",e=>{if(at.has(e.pointerId)&&(at.set(e.pointerId,e.clientX),Ye&&at.size>=2)){const t=Wi();Ne(j-(t-Fs)/Ue()),Fs=t}},!0);const rl=e=>{at.delete(e.pointerId),at.size<2&&Ye&&(at.size===0?Ye=!1:Fs=Wi())};window.addEventListener("pointerup",rl,!0);window.addEventListener("pointercancel",rl,!0);const pn=80;function yb(e,t){const n=K.getBoundingClientRect();return t<n.top-40||t>n.bottom+10?0:e<n.left+pn?-Math.min(1,(n.left+pn-e)/pn)*16:e>n.right-pn?Math.min(1,(e-(n.right-pn))/pn)*16:0}function an(e,t){let n=e,s=0;const o=()=>{const r=Ye?0:yb(n.clientX,n.clientY);if(r){const l=j;Ne(j+r),j!==l&&t.onMove(n)}s=requestAnimationFrame(o)};t.edgeScroll!==!1&&(s=requestAnimationFrame(o));const i=r=>{r.pointerId===e.pointerId&&(r.preventDefault(),n=r,Ye||t.onMove(r))},a=r=>{r.pointerId===e.pointerId&&(cancelAnimationFrame(s),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",a),t.onUp(r))};window.addEventListener("pointermove",i,{passive:!1}),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a)}function ll(e,t,n=!1){if(t.preventDefault(),t.stopPropagation(),Ye)return;if(Ve.isPlay()){Fb(e,e.dataset.id);return}if(!Oe()){Rt(e);return}const s=L.get(),o=s.currentRoom,i=e.dataset.id,a=s.rooms[o].items.find(u=>u.id===i);if(!a)return;const r=Ke[a.kind],l=ct(t.clientX,t.clientY),c={x:a.x-l.x,y:a.y-l.y};let g=n,d=null;pe=i,L.dispatch({type:"item/front",room:o,id:i}),e.classList.add("lifted"),$.pick(),an(t,{onMove(u){const y=ct(u.clientX,u.clientY);Math.hypot(y.x-l.x,y.y-l.y)>6&&(g=!0),g&&(ut.classList.add("hidden"),Ws.classList.add("show")),Ws.classList.toggle("hot",Ua(u.clientX,u.clientY));const w=r.w*a.scale/2;L.dispatch({type:"item/move",room:o,id:i,x:Math.max(w*.6,Math.min(ae-w*.6,y.x+c.x)),y:jr(r,y.y+c.y)}),g&&ut.classList.add("hidden"),d=g&&r.holdable?Jr(y):null,Vs(d)},onUp(u){if(e.classList.remove("lifted"),Ws.classList.remove("show","hot"),Vs(null),g&&Ua(u.clientX,u.clientY)){pe=null,L.dispatch({type:"item/delete",room:o,id:i}),Si(u.clientX,u.clientY);return}if(g&&d){al(d,i);return}g?($.drop(),Ie(e)):($.click(),Bl(i),qv(e)),kt(L.get())}})}function kb(e,t,n){if(n.preventDefault(),n.stopPropagation(),Ye||Ve.isPlay())return;const s=e.dataset.cid,o=t.dataset.hand,i=L.get().characters.find(g=>g.id===s),a=i?.held[o];if(!i||!a)return;const r=t.getBoundingClientRect(),l=ct(r.left+r.width/2,r.bottom);L.dispatch({type:"char/release",id:s,hand:o,x:l.x,y:l.y});const c=Le.querySelector(`.item[data-id="${a.id}"]`);c&&ll(c,n,!0)}function vb(e){e.addEventListener("pointerdown",t=>{const n=t.target.closest(".held");if(n){if(Ve.isPlay()){t.preventDefault(),t.stopPropagation();return}if(!Oe()){t.stopPropagation(),Rt(e);return}return kb(e,n,t)}if(t.preventDefault(),t.stopPropagation(),Ye)return;if(!Oe()){Rt(e);return}pe=null,kt(L.get());const s=e.dataset.cid;Be=s;const o=L.get(),i=o.characters.find(g=>g.id===s);if(!i)return;const a=ct(t.clientX,t.clientY),r={x:i.x-a.x,y:i.y-a.y};let l=i.x,c=!1;e.classList.add("lifted"),$.pick(),At(L.get()),an(t,{onMove(g){const d=ct(g.clientX,g.clientY),u=d.x+r.x;Math.hypot(d.x-a.x,d.y-a.y)>6&&(c=!0);const y=L.get().characters.find(w=>w.id===s);if(y){if(Math.abs(u-l)>3){const w=u<l;w!==y.flip&&L.dispatch({type:"char/update",id:s,patch:{flip:w}}),l=u}L.dispatch({type:"char/move",id:s,room:o.currentRoom,x:u,y:Math.max(lo+40,d.y+r.y)}),document.querySelectorAll(".tab").forEach(w=>w.classList.remove("drop")),document.elementFromPoint(g.clientX,g.clientY)?.closest(".tab:not(.on)")?.classList.add("drop")}},onUp(g){e.classList.remove("lifted"),document.querySelectorAll(".tab").forEach(y=>y.classList.remove("drop"));const d=document.elementFromPoint(g.clientX,g.clientY)?.closest("[data-room]"),u=L.get().characters.find(y=>y.id===s);if(c&&u&&d&&d.dataset.room!==o.currentRoom){const y=d.getBoundingClientRect();Ci(y.left+y.width/2,y.top+y.height/2,9),$.swish(),L.dispatch({type:"char/move",id:s,room:d.dataset.room,x:u.x,y:u.y});return}$.drop(),Ie(e),c&&requestAnimationFrame(()=>is(!0))}})})}function bb(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Ve.isPlay()){n.stopPropagation();return}if(!Oe()){Rt(e);return}const s=document.createElement("div");s.className="ghost",s.innerHTML=yn(t),document.body.appendChild(s);const o=Math.max(1,60/(Math.max(t.w,Ae(t))*Ue())),i=t.w*Ue()*o,a=Ae(t)*Ue()*o;s.style.width=i+"px",s.style.height=a+"px";let r=null;const l=d=>{s.style.left=d.clientX-i/2+"px",s.style.top=d.clientY-a*.8+"px",r=t.holdable&&Jo(d.clientX,d.clientY)?Jr(ct(d.clientX,d.clientY)):null,Vs(r)};l(n),$.pick(),e.classList.add("pressed");const c=n.clientX,g=n.clientY;an(n,{onMove:l,onUp(d){s.remove(),e.classList.remove("pressed"),Vs(null);const u=L.get().currentRoom,y=Math.hypot(d.clientX-c,d.clientY-g)<8;let w,_;if(y)w=j+380+Math.random()*240,_=t.wall?Math.min(qr,200+Ae(t)/2):500+Math.random()*40;else if(Jo(d.clientX,d.clientY)){const f=ct(d.clientX,d.clientY);w=f.x,_=jr(t,f.y+Ae(t)*.2)}else return;const B={id:Xo(t.kind.replace(/[^a-z0-9-]/gi,"")),kind:t.kind,x:w,y:_,flip:!1,z:0,scale:1};if(L.get().rooms[u].items.length===0){const f=Qv(v=>Xo(v));for(let v=0;v<f.length;v++)L.dispatch({type:"item/add",room:u,item:f[v]})}if(L.dispatch({type:"item/add",room:u,item:B}),!y&&r){al(r,B.id);return}pe=B.id,kt(L.get());const p=Le.querySelector(`.item[data-id="${B.id}"]`);Ie(p),ho(p),$.sparkle()}})})}function wb(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Ve.isPlay())return;if(!Oe()){Rt(e);return}const s=L.get().characters.find(u=>u.id===t);if(!s)return;const o=as(s),i=qt*o*Ue(),a=lt*o*Ue(),r=document.createElement("div");r.className="ghost",r.innerHTML=de(s),r.style.width=i+"px",r.style.height=a+"px",document.body.appendChild(r);const l=u=>{r.style.left=u.clientX-i/2+"px",r.style.top=u.clientY-a*.85+"px"},c=n.clientX,g=n.clientY;let d=!1;r.style.visibility="hidden",an(n,{onMove(u){Math.hypot(u.clientX-c,u.clientY-g)>8&&(d=!0,r.style.visibility=""),l(u)},onUp(u){if(r.remove(),!d){$.click(),Be=t,Xn("dress");return}if(!Jo(u.clientX,u.clientY))return;const y=ct(u.clientX,u.clientY),w=L.get().currentRoom;L.dispatch({type:"char/move",id:t,room:w,x:y.x,y:Math.max(lo+40,y.y+lt*o*.15)}),Be=t,At(L.get());const _=it.get(t);Ie(_),ho(_),$.sparkle()}})})}const bs=e=>e[Math.floor(Math.random()*e.length)];function cl(){if(!Oe())return Rt(null),null;const e=L.get();if(e.characters.length>=Ln)return null;const t=Xo("c");L.dispatch({type:"char/add",char:nn({id:t,skin:bs(vr),hair:bs(br),hairStyle:Math.floor(Math.random()*wr),shirt:bs(Is),pants:bs(Is),room:e.currentRoom,x:j+300+Math.random()*400,y:520+Math.random()*40})}),Be=t,At(L.get());const n=it.get(t);return Ie(n),ho(n),$.sparkle(),t}function _b(){return $i==="all"?"all":L.get().currentRoom}function Xe(){const e=L.get().currentRoom,t=_b(),n=xi.find(l=>l.id===e)?.name??"This room",s=t==="all";b("roomFilter").innerHTML=`<button class="rf ${s?"on":""}" data-rf="${s?"room":"all"}">${s?"Just "+n:"All rooms"}</button>`;const o=Bo("secrets").length>0,i=xn.filter(l=>l.id!=="secrets"&&(l.kind==="people"||l.kind==="pack"||Bo(l.id).length));!(Ze==="secrets"&&o)&&!i.some(l=>l.id===Ze)&&(Ze=i[1]?.id??"__people"),b("cats").innerHTML=i.map(l=>`<button class="cat ${l.kind} ${l.id===Ze?"on":""}" data-cat="${l.id}" aria-label="${l.name}" title="${l.name}">${l.kind==="people"?tb:l.kind==="pack"?`<span class="packicon">${yn(Ke[l.icon])}</span><span class="packname">${l.name}</span>`:yn(Ke[l.icon])}</button>`).join("")+(o?`<button class="cat secretTab ${Ze==="secrets"?"on":""}" data-cat="secrets" aria-label="Secrets" title="Secrets">🎁</button>`:"");const a=b("shelf");if(a.innerHTML="",!Oe()){a.innerHTML='<div class="empty locked">🔒 This house is look-only right now</div>';return}if(Ze==="__people"){const l=L.get(),c=Ti();if(c){const g=document.createElement("button");g.className="thing person me",g.setAttribute("aria-label","Me"),g.innerHTML=`<div class="face">${de(c)}</div><span class="meStar">★</span>`,g.addEventListener("click",()=>{$.click(),Be=ot,Xn("dress")}),a.appendChild(g)}for(const g of l.characters){const d=document.createElement("button");d.className="thing person",d.setAttribute("aria-label","Character"),d.innerHTML=`<div class="face">${de(g)}</div><span class="where" style="background:${Vr(g.room)}"></span>`,a.appendChild(d),wb(d,g.id)}if(l.characters.length<Ln){const g=document.createElement("button");g.className="thing add",g.setAttribute("aria-label","New character"),g.innerHTML=Fr,g.addEventListener("click",()=>{cl()&&(Xe(),Xn("dress"))}),a.appendChild(g)}return}const r=Bo(Ze);r.length||(a.innerHTML='<div class="empty">Nothing here yet!</div>');for(const l of r){const c=document.createElement("button");c.className="thing",c.setAttribute("aria-label",l.name),c.innerHTML=yn(l),a.appendChild(c),bb(c,l)}a.scrollLeft=0,Ui()}function Ui(){const e=document.querySelector(".drawerTop"),t=document.getElementById("drawerBar");!e||!t||t.classList.toggle("more",e.scrollWidth-e.clientWidth-e.scrollLeft>6)}document.querySelector(".drawerTop").addEventListener("scroll",Ui,{passive:!0});window.addEventListener("resize",Ui);function hn(e,t,n){return`<div class="sw">${e.map(s=>`<button class="dot ${s===t?"on":""}" style="background:${s}" data-act="${n}" data-v="${s}"></button>`).join("")}</div>`}let Yn=null,Xt=!1;function mn(){const e=L.get(),t=b("card");if(Yn==="paint"){const n=e.rooms[e.currentRoom],s=Fo.filter(a=>a.kind==="wallpaper"),o=Fo.filter(a=>a.kind==="floor"),i=(a,r,l,c)=>`<button class="dot pat tile ${a.id===r?"on":""}" data-act="${l}" data-v="${a.id}" title="${a.name} (${dr(a.pack)})" style="background-color:${c};background-image:${ei(a.url)};background-size:48px auto"></button>`;t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${hn(J2,n.wallpaper,"wall")}
      <h3>Wallpaper</h3><div class="sw">${el.map((a,r)=>`<button class="dot pat ${!n.wallTile&&r===n.pattern?"on":""}" data-act="pat" data-v="${r}" style="background-color:${n.wallpaper};background-image:${a};background-size:${r===1?"16px 16px":r===3?"20px 20px":"auto"}"></button>`).join("")}${s.map(a=>i(a,n.wallTile,"wtile",n.wallpaper)).join("")}</div>
      <h3>Floor</h3>${hn(eb,n.floor,"floor")}
      ${o.length?`<h3>Floor style</h3><div class="sw"><button class="dot pat ${n.floorTile?"":"on"}" data-act="ftile" data-v="" style="background-color:${n.floor};background-image:${tl}"></button>${o.map(a=>i(a,n.floorTile,"ftile",n.floor)).join("")}</div>`:""}`}else if(Yn==="dress"){const n=Ti(),s=n?nn({id:ot,...n}):null;let o=Be===ot&&s?s:e.characters.find(r=>r.id===Be)??s??e.characters[0];const i=`<div class="picker">${s?`<button class="pk me ${o?.id===ot?"on":""}" data-act="pickc" data-v="${ot}"><div class="face">${de(s)}</div><span class="meStar">★</span></button>`:""}${e.characters.map(r=>`<button class="pk ${r.id===o?.id?"on":""}" data-act="pickc" data-v="${r.id}"><div class="face">${de(r)}</div><span class="where" style="background:${Vr(r.room)}"></span></button>`).join("")}${e.characters.length<Ln?`<button class="pk add" data-act="newc">${Fr}</button>`:""}</div>`;if(!o){t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Characters</h2>${i}<p class="hint">Tap + to make someone new!</p>`;return}Be=o.id;const a=r=>de({...o,...r}).replace("<svg ",'<svg preserveAspectRatio="xMidYMin slice" ');t.innerHTML=`<button class="close" data-act="close">✕</button>${i}<div class="dress"><div class="previewCol"><div class="preview"><div style="height:${sn[o.size]*78}%">${de(o)}</div></div>
        ${o.id===ot?'<div class="meNote">This is you!</div>':`<button class="del ${Xt?"sure":""}" data-act="delc">`}${o.id===ot?"":`${nt.trash}<span>${Xt?"Tap again":""}</span></button>`}</div><div class="opts">
      <div class="row2"><div class="optCol"><h3>Size</h3><div class="sw">${Tv.map(r=>`<button class="dot sz ${r===o.size?"on":""}" data-act="size" data-v="${r}"><div style="height:${sn[r]*70}%">${de(o)}</div></button>`).join("")}</div></div>
      <div class="optCol"><h3>Extras</h3><div class="sw">${Array.from({length:Uv},(r,l)=>`<button class="dot hs ${l===o.acc?"on":""}" data-act="acc" data-v="${l}">${a({acc:l})}</button>`).join("")}</div></div></div>
      <h3>Skin</h3>${hn(vr,o.skin,"skin")}
      <h3>Hair</h3>${hn(br,o.hair,"hair")}
      <h3>Hair style</h3><div class="sw">${Array.from({length:wr},(r,l)=>`<button class="dot hs ${l===o.hairStyle?"on":""}" data-act="hs" data-v="${l}">${a({hairStyle:l,acc:0})}</button>`).join("")}</div>
      <h3>Shirt</h3>${hn(Is,o.shirt,"shirt")}
      <h3>Pants</h3>${hn(Is,o.pants,"pants")}</div></div>`}}function Xn(e){Yn=e,Xt=!1,mn(),b("sheet").classList.remove("hidden"),$.swish()}b("sheet").addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(e.target===b("sheet")||t?.dataset.act==="close"){b("sheet").classList.add("hidden"),Yn=null,$.click(),Ze==="__people"&&Xe();return}if(!t)return;const n=L.get(),s=n.currentRoom,o=t.dataset.v,i=Be??"",a=t.dataset.act;switch(a!=="delc"&&(Xt=!1),a){case"wall":L.dispatch({type:"room/wallpaper",room:s,color:o});break;case"floor":L.dispatch({type:"room/floor",room:s,color:o});break;case"pat":L.dispatch({type:"room/pattern",room:s,pattern:+o});break;case"wtile":L.dispatch({type:"room/wallTile",room:s,tile:o});break;case"ftile":L.dispatch({type:"room/floorTile",room:s,tile:o||null});break;case"skin":case"hair":case"shirt":case"pants":ws(i,{[a]:o});break;case"hs":ws(i,{hairStyle:+o});break;case"acc":ws(i,{acc:+o});break;case"size":ws(i,{size:o}),At(L.get());break;case"pickc":Be=o,At(L.get()),$.click(),mn();return;case"newc":if(!cl())return;break;case"delc":if(i===ot||!Oe())return;if(!Xt){Xt=!0,$.click(),mn();return}Xt=!1;{const l=it.get(i)?.getBoundingClientRect();L.dispatch({type:"char/delete",id:i}),l?Si(l.left+l.width/2,l.top+l.height/2):$.pop()}Be=L.get().characters[0]?.id??null,mn();return}$.sparkle(),mn(),Ie(document.querySelector(".preview"))});b("tabs").addEventListener("click",e=>{const t=e.target.closest("[data-room]");if(!t)return;const n=t.dataset.room;n!==L.get().currentRoom&&(pe=null,$.swish(),K.classList.remove("swap"),K.offsetWidth,K.classList.add("swap"),L.dispatch({type:"room/switch",room:n}))});b("cats").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");t&&(Ze=t.dataset.cat,$.click(),Xe())});b("roomFilter").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");if(t){Ze=t.dataset.cat,$.click(),Xe();return}const n=e.target.closest("[data-rf]");n&&($i=n.dataset.rf==="all"?"all":"",$.click(),Xe())});ut.addEventListener("pointerdown",e=>e.stopPropagation());ut.addEventListener("click",e=>{const t=e.target.closest("[data-a]");if(!t||!pe)return;if(!Oe()){Rt(null);return}const n=L.get().currentRoom,s=pe,o=Le.querySelector(`.item[data-id="${s}"]`);switch(t.dataset.a){case"flip":L.dispatch({type:"item/flip",room:n,id:s}),$.swish(),Ie(o);break;case"front":L.dispatch({type:"item/front",room:n,id:s}),$.click(),Ie(o);break;case"back":L.dispatch({type:"item/back",room:n,id:s}),$.click(),Ie(o);break;case"delete":{const i=o?.getBoundingClientRect();pe=null,L.dispatch({type:"item/delete",room:n,id:s}),i&&Si(i.left+i.width/2,i.top+i.height/2);break}}});K.addEventListener("pointerdown",e=>{if(e.target.closest(".nudge"))return;go();const t=e.clientX,n=j;let s=!1,o=0,i=e.clientX,a=performance.now();an(e,{edgeScroll:!1,onMove(r){if(Math.abs(r.clientX-t)>6&&(s=!0),!s)return;const l=performance.now();o=(r.clientX-i)/Math.max(1,l-a),i=r.clientX,a=l,Ne(n-(r.clientX-t)/Ue())},onUp(){if(!s){pe&&(pe=null,kt(L.get()));return}if(Ye)return;let r=-o*16/Ue();const l=()=>{Math.abs(r)<.3||(Ne(j+r),r*=.92,kn=requestAnimationFrame(l))};kn=requestAnimationFrame(l)}})});K.addEventListener("wheel",e=>{e.preventDefault(),go(),Ne(j+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/Ue())},{passive:!1});b("nudgeL").addEventListener("pointerdown",e=>{e.stopPropagation(),$.swish(),po((Gn??j)-se*.6)});b("nudgeR").addEventListener("pointerdown",e=>{e.stopPropagation(),$.swish(),po((Gn??j)+se*.6)});const Ta=b("minimap");Ta.addEventListener("pointerdown",e=>{e.stopPropagation(),e.preventDefault();const t=n=>{const s=Ta.getBoundingClientRect();po((n.clientX-s.left)/s.width*ae-se/2)};t(e),$.click(),an(e,{edgeScroll:!1,onMove:t,onUp(){}})});b("btnPaint").addEventListener("click",()=>{if(!Oe())return Rt(null);Xn("paint")});b("btnDress").addEventListener("click",()=>Xn("dress"));b("btnSound").addEventListener("click",()=>{L.dispatch({type:"settings/sound",on:!L.get().soundOn}),$.click()});document.addEventListener("gesturestart",e=>e.preventDefault());document.addEventListener("contextmenu",e=>e.preventDefault());"serviceWorker"in navigator&&navigator.serviceWorker.register("/kids-house-game/sw.js");window.__store=L;window.__items=Object.fromEntries(vt.filter(e=>e.img).map(e=>[e.kind,{w:e.w,h:Ae(e),cat:e.cat,holdable:e.holdable,svg:e.img.includes(".svg")}]));window.__cam={get:()=>j,set:Ne};window.__phoneShowKids=()=>ue();window.__frameHouseKid=()=>is(!0);window.__layoutNameTags=()=>$r();const q=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Oe(){return!h||Pe===V||h.canEdit(le)}function Rt(e){$.pop();const t=b("houseTag");t.classList.remove("wiggle"),t.offsetWidth,t.classList.add("wiggle"),e&&(e.classList.remove("nope"),e.offsetWidth,e.classList.add("nope")),T("🔒 Look-only house: ask the owner to unlock it!",1800)}const oe=()=>h?.myPresence()??null,Ti=()=>h?h.players.get(h.pid)?.look??null:null;function ws(e,t){if(e===ot){const n=Ti();if(!n||!h)return;h.setLook(ns({...n,...t})),Dt(),x==="street"&&Zs(),x==="park"&&on(),x==="ranch"&&Ht();return}L.dispatch({type:"char/update",id:e,patch:t})}function _e(e){h?.setPresence(e)}function xb(e){const t=oe();t&&t.where==="house"&&_e({...t,room:e})}function gl(e){Pe=e,Or(e),pe=null,setTimeout(()=>jl.update());for(const t of Object.keys(js))delete js[t];Be=e===V?e.get().characters[0]?.id??null:ot,$n(),Xe()}function Pi(e,t){return`<div class="inner">${de(e)}</div><div class="nametag">${q(t)}</div>`}function Dt(){const e=new Set;if(h&&Pe!==V&&x==="house"){const t=L.get().currentRoom,n=[...h.presence.entries()],s=oe();s&&n.push([h.pid,s]);for(const[o,i]of n){const a=h.players.get(o);if(!a||i.where!=="house"||i.houseId!==le||i.room!==t)continue;e.add(o);let r=An.get(o);(!r||!r.isConnected)&&(r=document.createElement("div"),r.className="char avatar "+(o===h.pid?"mine":"other"),r.dataset.pid=o,Le.appendChild(r),An.set(o,r),o===h.pid&&$b(r));const l=a.look,c=JSON.stringify(l)+a.nickname;if(r.dataset.look!==c){const d=r.querySelector(".bubble");r.innerHTML=Pi(l,a.nickname),d&&r.appendChild(d),r.dataset.look=c}const g=sn[l.size]??1;Sn(r,i.x,i.y,qt*g,lt*g),r.style.zIndex=String(5e3+Math.round(i.y)),r.classList.toggle("flipped",i.flip)}}for(const[t,n]of An)(!e.has(t)||!n.isConnected)&&(e.has(t)||n.remove(),An.delete(t));rn()}function $b(e){e.addEventListener("pointerdown",t=>{if(t.preventDefault(),t.stopPropagation(),Ye||!h)return;const n=oe();if(!n||n.where!=="house")return;const s=ct(t.clientX,t.clientY),o={x:n.x-s.x,y:n.y-s.y};let i=n.x;e.classList.add("lifted"),$.pick(),an(t,{onMove(a){const r=ct(a.clientX,a.clientY),l=oe();if(!l||l.where!=="house")return;const c=Math.max(40,Math.min(ae-40,r.x+o.x)),g=Math.max(lo+40,Math.min(De,r.y+o.y)),d=Math.abs(c-i)>3?c<i:l.flip;Math.abs(c-i)>3&&(i=c),_e({...l,x:c,y:g,flip:d}),Dt(),Bi(L.get())},onUp(){e.classList.remove("lifted"),$.drop(),Ie(e),requestAnimationFrame(()=>is(!0))}})})}function Mb(e){return e.kind==="text"?e.v:(e.kind==="phrase"?Nn:Ja)[e.v]??""}function Wn(){const e=document.querySelectorAll(".bubble");if(!document.body.classList.contains("phone")){e.forEach(s=>{(s.style.marginLeft||s.style.marginTop)&&(s.style.marginLeft="",s.style.marginTop="")});return}const t=K.getBoundingClientRect(),n=Ue()||1;e.forEach(s=>{s.style.marginLeft="0px",s.style.marginTop="0px";const o=s.getBoundingClientRect();let i=0;o.width>=t.width-8||o.left<t.left+4?i=t.left+4-o.left:o.right>t.right-4&&(i=t.right-4-o.right);let a=0;o.top<t.top+4?a=t.top+4-o.top:o.bottom>t.bottom-4&&(a=t.bottom-4-o.bottom),i&&(s.style.marginLeft=i/n+"px"),a&&(s.style.marginTop=a/n+"px")})}function Lb(e,t){const n=x==="street"?document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`):x==="park"?document.querySelector(`#pavatars .savatar[data-pid="${e}"]`):x==="ranch"?document.querySelector(`#ravatars .savatar[data-pid="${e}"]`):x==="gameroom"?document.querySelector(`#gavatars .savatar[data-pid="${e}"]`):An.get(e),s=n?[n]:[];for(const o of s){o.querySelector(".bubble")?.remove();const i=document.createElement("div");i.className="bubble"+(t.kind==="emote"?" emote":""),i.textContent=Mb(t),o.appendChild(i),Wn(),setTimeout(()=>i.classList.add("out"),4600),setTimeout(()=>i.remove(),5e3)}e!==h?.pid&&$.click()}function zi(){const e=oe();if(!h||!e)return 0;let t=0;return h.presence.forEach(n=>{mg(e,n)&&t++}),t}function rn(){const e=zi();b("btnChat").classList.toggle("glow",e>0);const t=document.getElementById("chatNear");t&&(t.textContent=e?`${e} friend${e>1?"s":""} nearby can hear you`:"Walk closer to a friend to talk!",b("chatTray").classList.toggle("nobody",!e))}function dl(){const e=b("chatTray");if(!h)return;e.innerHTML=`<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${Ja.map((n,s)=>`<button data-emote="${s}">${n}</button>`).join("")}</div>
    <div class="phrases">${Nn.map((n,s)=>`<button data-phrase="${s}">${q(n)}</button>`).join("")}</div>
    ${h.settings.freeChat?`<form class="typed" id="chatForm"><input id="chatInput" maxlength="${er}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>`:'<div class="presetsOnly">Picking from the bubbles above 💬</div>'}`,rn(),document.getElementById("chatForm")?.addEventListener("submit",n=>{n.preventDefault();const s=b("chatInput"),o=to(s.value);if(!o.ok){b("chatWarn").textContent=no[o.reason]??"",$.pop();return}if(!zi()){T("Walk closer to a friend to talk!");return}h.say({kind:"text",v:o.text}),s.value="",b("chatWarn").textContent="",s.blur()})}b("chatTray").addEventListener("click",e=>{const t=e.target;if(!h)return;if(t.closest('[data-chat="close"]')){b("chatTray").classList.add("hidden");return}const n=t.closest("[data-emote]"),s=t.closest("[data-phrase]");if(!(!n&&!s)){if(!zi()){T("Walk closer to a friend to talk!");return}h.say(n?{kind:"emote",v:+n.dataset.emote}:{kind:"phrase",v:+s.dataset.phrase}),$.click()}});b("btnChat").addEventListener("click",()=>{b("chatTray").classList.toggle("hidden")||(dl(),$.swish())});function gt(){const e=document.body.classList,n=!!h&&Pe!==V&&x==="house"?h.houses.get(le):void 0,s=!!n&&n.meta.ownerId===h.pid;if(e.toggle("mode-hood",!!h),e.toggle("view-street",x!=="house"),e.toggle("view-park",x==="park"),e.toggle("view-ranch",x==="ranch"),e.toggle("view-map",x==="street"),e.toggle("view-gameroom",x==="gameroom"),e.toggle("in-barn",x==="ranch"&&ie),e.toggle("mode-play",x==="house"&&Ve.isPlay()),Zi(),ul(),e.toggle("own-house",s),e.toggle("locked",!!n&&!Oe()),e.toggle("has-hood",!!so()),n){const o=h.players.get(n.meta.ownerId)?.nickname??"";b("houseTag").innerHTML=`${n.meta.locked?"🔒 ":""}<b>${q(n.meta.name)}</b>${s?" · yours":o?" · "+q(o):""}`,b("btnLock").innerHTML=n.meta.locked?He.lockOn:He.lockOff,b("btnLock").setAttribute("aria-label",n.meta.locked?"Unlock house":"Lock house")}rn(),document.body.classList.contains("phone")&&Gr()}b("btnLock").addEventListener("click",()=>{const e=h?.houses.get(le);!e||e.meta.ownerId!==h.pid||(h.lock(e.meta.id,!e.meta.locked),$.click(),T(e.meta.locked?"Unlocked: friends can decorate!":"Locked: friends can look but not change things"))});const Gt=new Map;let Pa="",ti=0;function pl(){const e=b("street");return Math.min(e.clientWidth/We,e.clientHeight/rt)}function Bb(){return h?[...h.houses.values()].map(e=>e.meta).sort((e,t)=>e.slot-t.slot):[]}function Jt(e=!1){if(x!=="street")return;const t=pl(),n=b("mapWorld"),s=Bb(),o=t.toFixed(3)+JSON.stringify(s)+(h?s.map(p=>(h.players.get(p.ownerId)?.online?1:0)+(si(p.id)?"u":"")).join("")+h.pid:"solo");if(!e&&o===Pa&&n.querySelector("#mapFaces")){Zs();return}Pa=o,n.style.width=We*t+"px",n.style.height=rt*t+"px",n.style.setProperty("--sc",String(t)),n.innerHTML=Kl();const i=n.querySelector("#mapRoad"),a=i.getTotalLength(),r=Array.from({length:160},(p,f)=>i.getPointAtLength(a*f/159)),l=(p,f)=>r.some(v=>Math.hypot(v.x-p,v.y-f)<50),c=p=>p*t+"px",g=ni();Gt.clear();const d=h?s.map(p=>({id:p.id,name:p.name,style:p.style,locked:p.locked,mine:p.ownerId===h.pid,lit:!!h.players.get(p.ownerId)?.online})):ti?Array.from({length:ti},(p,f)=>({id:"fake"+f,name:["Reagan","Quinn","Chloe","Sloane","Cada","Emma","Olivia","Charlotte","Amelia","Sophia","Isabella","Mia"][f%12]+"'s House",style:f,locked:f===3,mine:f===0,lit:f%3!==1})):[null],u=d.length,y=u>8?80:94,w=y*300/320;let _="";const B=hl(i,u,g);d.forEach((p,f)=>{const v=B[f],C=p?`house:${p.id}`:"home",S=p?p.name:"My House";Gt.set(p?"house:"+p.id:"home",{x:v.x,y:v.y-w/2-4});const D=!!(p&&si(p.id)),R=34,ee=40,ye=Math.max(4,Math.min(We-R-4,v.x+y*.28)),he=Math.max(4,Math.min(rt-ee-4,v.y+w*.28));_+=`<button class="mapSpot mapHouse ${p?.mine||!p?"mine":""}" data-go="${C}" aria-label="${q(S)}" style="left:${c(v.x-y/2)};top:${c(v.y-w/2)};width:${c(y)};height:${c(w)}">${Vo(p?p.style:0,{lit:p?p.lit:!0})}${p?.locked?'<span class="lockBadge">🔒</span>':""}${p?.mine||!p?'<span class="homeBadge">★</span>':""}</button>
      <button class="mapMail ${D?"up":""}" data-mail="${p?p.id:"home"}" aria-label="${q(S)} mailbox" style="left:${c(ye)};top:${c(he)};width:${c(R)};height:${c(ee)}">${$g(D)}</button>
      <div class="mapSign ${p?.mine||!p?"mine":""} ${v.x>We-130?"edgeR":v.x<130?"edgeL":""}" style="left:${c(v.x>We-130?We-8:v.x<130?8:v.x)};top:${c(v.y+w/2-2)}">${q(S)}</div>`}),_+=`<button class="mapSpot mapPark" data-go="park" aria-label="The park" style="left:${c(xt.x-100)};top:${c(xt.y-85)};width:${c(200)};height:${c(170)}">${Xl}</button><div class="mapSign place" style="left:${c(xt.x)};top:${c(xt.y+70)}">Park</div>`,_+=`<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${c(tt.x-110)};top:${c(tt.y-90)};width:${c(220)};height:${c(180)}">${Jl}</button><div class="mapSign place" style="left:${c(tt.x)};top:${c(tt.y+78)}">Rainbow Ranch</div>`,_+=`<button class="mapSpot mapClub" data-go="gameroom" aria-label="The clubhouse" style="left:${c($t.x-95)};top:${c($t.y-78)};width:${c(190)};height:${c(156)}">${ec}</button><div class="mapSign place" style="left:${c($t.x)};top:${c($t.y+82)}">Clubhouse</div>`,Gt.set("park",{x:xt.x,y:xt.y-60}),Gt.set("ranch",{x:tt.x-30,y:tt.y-60}),Gt.set("barn",{x:tt.x+10,y:tt.y+10}),Gt.set("gameroom",{x:$t.x,y:$t.y-52}),n.insertAdjacentHTML("beforeend",Yl(g,l)+_+'<div class="mapFaces" id="mapFaces"></div>'),Zs()}const ni=()=>[{x:xt.x,y:xt.y,r:115},{x:tt.x,y:tt.y,r:125},{x:Mt.x,y:Mt.y,r:100},{x:$t.x,y:$t.y,r:90}];function hl(e,t,n){const s=e.getTotalLength(),o=[];for(let i=0;i<t;i++){const a=t===1?.2:.05+.75*i/(t-1),r=e.getPointAtLength(s*a),l=e.getPointAtLength(Math.min(s,s*a+3));let c=-(l.y-r.y),g=l.x-r.x;const d=Math.hypot(c,g)||1;c/=d,g/=d;const u=[1,-1].map(_=>({x:r.x+c*72*_,y:r.y+g*72*_})).map(_=>({..._,score:Math.min(...n.map(B=>Math.hypot(B.x-_.x,B.y-_.y)-B.r),_.x-50,We-50-_.x,_.y-60,rt-40-_.y)})),y=i%2?u:[u[1],u[0]],w=y[0].score>0||y[0].score>=y[1].score?y[0]:y[1];w.x=Math.max(60,Math.min(We-60,w.x)),w.y=Math.max(62,Math.min(rt-72,w.y)),n.push({x:w.x,y:w.y,r:70}),o.push({x:w.x,y:w.y})}return o}window.__mapFake=e=>{ti=e,Jt(!0)};window.__mapLayout=e=>{const t=document.querySelector("#mapRoad");if(!t)return null;const n=hl(t,e,ni());let s=1e9,o=1e9,i=!0;return n.forEach((a,r)=>{n.forEach((l,c)=>{c>r&&(s=Math.min(s,Math.hypot(a.x-l.x,a.y-l.y)))}),ni().forEach(l=>{o=Math.min(o,Math.hypot(a.x-l.x,a.y-l.y)-l.r)}),(a.x<55||a.x>We-55||a.y<60||a.y>rt-70)&&(i=!1)}),{n:e,minHouse:s,minSpot:o,inside:i}};function fl(e){return e.where==="house"&&e.houseId?{kind:"house",houseId:e.houseId,room:e.room}:e.where==="park"||e.where==="ranch"||e.where==="barn"||e.where==="gameroom"?{kind:e.where}:{kind:"square"}}const Cb=e=>e.kind==="house"?"house:"+e.houseId:e.kind;function Zs(){const e=document.getElementById("mapFaces");if(!e||x!=="street")return;const t=pl(),n=new Set,s=[];if(h){const i=[...h.presence.entries()],a=oe();a&&i.push([h.pid,a]);for(const[r,l]of i){const c=h.players.get(r);c&&s.push({key:r,look:c.look,name:c.nickname,mine:r===h.pid,place:fl(l)})}}else{const i=V.get().characters[0];i&&s.push({key:"solo",look:ns(i),name:"You",mine:!0,place:{kind:"square"}})}const o=new Map;for(const i of s){const a=Cb(i.place);o.has(a)||o.set(a,[]),o.get(a).push(i)}for(const[i,a]of o)a.sort((r,l)=>r.mine?-1:l.mine?1:r.name.localeCompare(l.name)),a.forEach((r,l)=>{let c,g;if(i==="square"){const w=-Math.PI/2+l*(Math.PI*2/Math.max(5,a.length));c=Mt.x+Math.cos(w)*50,g=Mt.y+Math.sin(w)*50}else{const w=Gt.get(i)??{x:Mt.x,y:Mt.y},_=4,B=Math.floor(l/_),p=l%_,f=Math.min(_,a.length-B*_);c=w.x+(p-(f-1)/2)*40,g=w.y-B*40}n.add(r.key);let d=e.querySelector(`.mapFace[data-pid="${r.key}"]`);d||(d=document.createElement("button"),d.className="mapFace "+(r.mine?"mine":"other"),d.dataset.pid=r.key,d.setAttribute("aria-label",r.mine?"You":r.name),e.appendChild(d));const u=JSON.stringify(r.look)+r.name;if(d.dataset.look!==u){const w=d.querySelector(".bubble");d.innerHTML=`<span class="face">${ci(de(r.look))}</span><span class="fname">${q(r.mine?"You":r.name)}</span>`,w&&d.appendChild(w),d.dataset.look=u}d.dataset.place=i;const y=46;d.style.left=(c-y/2)*t+"px",d.style.top=(g-y/2)*t+"px",d.style.width=d.style.height=y*t+"px"});e.querySelectorAll(".mapFace").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),rn()}function ml(e,t){const n=b("mapWorld");if(t&&!n.classList.contains("zoomIn")){const s=t.getBoundingClientRect(),o=n.getBoundingClientRect();n.style.transformOrigin=`${s.left+s.width/2-o.left}px ${s.top+s.height/2-o.top}px`,n.classList.remove("mapIn"),n.classList.add("zoomIn"),$.swish(),setTimeout(()=>{n.classList.remove("zoomIn"),za(e)},360)}else za(e)}function rs(e){e.classList.remove("sceneIn"),e.offsetWidth,e.classList.add("sceneIn"),setTimeout(()=>e.classList.remove("sceneIn"),600)}function za(e){e.kind==="house"?vl(e.houseId,e.room):e.kind==="home"?kl():e.kind==="park"?Hb():e.kind==="ranch"?es(!1):e.kind==="barn"?es(!0):e.kind==="gameroom"&&Ab()}function Sb(e){const t=h?.presence.get(e);if(!h||!t)return;const n=fl(t),s=h.players.get(e)?.nickname??"your friend";if(n.kind==="square"){T(`${s} is on the map too! 👋`);return}const o=document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`)??void 0;ml(n,o),setTimeout(()=>{const i=oe();if(!i||!h)return;const a=t.x+(t.x>300?-110:110);if(n.kind==="house"&&i.where==="house")_e({...i,x:a,y:t.y}),Dt(),po(a-se/2);else if((n.kind==="park"||n.kind==="ranch"||n.kind==="barn")&&i.where===n.kind){Qe({...i,x:a,y:Math.max(en,Math.min(yt,t.y)),flip:a>t.x});const r=n.kind==="park"?jt():ze(),l=b(n.kind==="park"?"parkScroll":"ranchScroll");requestAnimationFrame(()=>{l.scrollLeft=t.x*r-l.clientWidth/2,ue()})}else if(n.kind==="gameroom"&&i.where==="gameroom"){const r=Bn();r||Qe({where:"gameroom",x:a,y:Math.max(en,Math.min(yt,t.y)),flip:a>t.x});const l=Ot(),c=b("grScroll"),g=r?.x??t.x;requestAnimationFrame(()=>{c.scrollLeft=g*l-c.clientWidth/2,ue()})}T(`You found ${s}! 💕`)},420)}function si(e){if(!h)return!1;const t=h.houses.get(e);return!!t&&t.meta.ownerId===h.pid&&yc(t.confirmed.mailbox)>0}function ul(){const e=!!h&&x==="street"&&si(h.myHouseId());qn.syncCue(e)}function yl(e){if(!h||e==="home"||!h.houses.has(e)){T("Join a street to send letters!");return}const t=h.houses.get(e);qn.open(e,t.meta.name,t.meta.ownerId===h.pid,t.confirmed.mailbox?.letters??[]),$.click()}b("mapWorld").addEventListener("click",e=>{const t=e.target;if(x!=="street")return;const n=t.closest(".mapMail");if(n){yl(n.dataset.mail||"home");return}const s=t.closest(".mapFace");if(s){s.classList.contains("mine")?(Ie(s),$.pop(),T("That's you! Tap a place to go there")):Sb(s.dataset.pid);return}const o=t.closest("[data-go]");if(!o)return;const i=o.dataset.go;ml(i.startsWith("house:")?{kind:"house",houseId:i.slice(6)}:{kind:i},o)});function ln(){b("street").classList.add("hidden"),b("park").classList.add("hidden"),b("ranch").classList.add("hidden"),b("gameroom").classList.add("hidden"),Ss()?.close(),b("chatTray").classList.add("hidden"),b("sheet").classList.add("hidden")}function vn(){te=null,Me=[],ie=!1,h?_e({where:"street",x:600,y:540,flip:!1}):Te=null,ln(),x="street",b("street").classList.remove("hidden"),b("streetTitle").textContent=h?"Our Neighborhood":"My Map",gt(),Jt(!0);const e=b("mapWorld");e.style.transformOrigin="50% 50%",e.classList.remove("zoomIn","mapIn"),e.offsetWidth,e.classList.add("mapIn"),$.swish()}function kl(){if(h){const e=h.myHouseId();e&&h.houses.has(e)&&vl(e);return}ln(),x="house",Te=null,Ve.sync(!0),gt(),$n(),rs(b("stageWrap")),$.sparkle(),Kn()}function vl(e,t="living"){if(!h||!h.houses.has(e))return;le=e,x="house",ie=!1,Ve.sync(e===h.myHouseId());let n=qs.get(e);n||(n=kg(h,e,{get:()=>V.get().soundOn,set:s=>V.dispatch({type:"settings/sound",on:s})}),qs.set(e,n)),n.dispatch({type:"room/switch",room:t}),_e({where:"house",houseId:e,room:t,x:900+Math.random()*300,y:540,flip:!1}),ln(),gl(n),rs(b("stageWrap")),$.sparkle(),Kn()}function Ei(){h?.close(),h=null,qs=new Map,x="house",le="",Te=null,te=null,Me=[],ie=!1,b("elsewhere").classList.add("hidden"),ln(),Ve.sync(!0),gl(V),gt()}b("btnMap").addEventListener("click",()=>{if(x==="street"){$.pop();return}vn()});b("btnHome").addEventListener("click",()=>{if(x==="house"&&(!h||le===h.myHouseId())){$.pop();return}kl()});b("phoneOk").addEventListener("click",()=>{b("phoneNote").classList.add("hidden"),$.click()});b("elsewhereGo").addEventListener("click",()=>{$.click(),h?.connect()});b("btnSolo").addEventListener("click",()=>{Ei(),T("Playing in your own house 🏠")});window.addEventListener("resize",()=>{x==="street"&&Jt(!0),x==="park"&&Ri(),x==="ranch"&&Vi(),x==="gameroom"&&_i(),ue()});function Hi(e){h=e,qs=new Map,e.on("players",()=>{h===e&&(x==="street"?Jt():x==="park"?on():x==="ranch"?(Ht(),Zi()):x==="gameroom"?On():(Dt(),gt()),Yn==="dress"&&mn())}),e.on("houses",()=>{h===e&&(x==="street"?Jt():x==="house"&&!e.houses.has(le)&&(T("That house is gone now"),vn()))}),e.on("houseMeta",t=>{h!==e||t!==le||x!=="house"||(pe=null,gt(),kt(L.get()),Xe(),Oe()||b("sheet").classList.add("hidden"))}),e.on("pres",()=>{h===e&&(x==="street"?Zs():x==="park"?on():x==="ranch"?Ht():x==="gameroom"?On():Dt())}),e.on("ranch",()=>{h===e&&x==="ranch"&&vo(!0)}),e.on("ranchFail",t=>{h===e&&ii(t)}),e.on("noride",()=>{if(h!==e)return;const t=oe();if(t?.ride!==void 0){const{ride:n,...s}=t;_e(s),Ht()}T("Someone is riding that horse!")}),e.on("fx",(t,n)=>{h===e&&e4(t,n)}),e.on("bubble",(t,n)=>{h===e&&Lb(t,n)}),e.on("sayFail",t=>T(t==="presetsOnly"?"Typing is turned off: pick a bubble!":no[t]||"Couldn't send that")),e.on("mailbox",()=>{h===e&&(x==="street"&&Jt(!0),ul(),qn.refresh())}),e.on("mailFail",t=>{h===e&&qn.fail(t)}),e.on("settings",()=>{h===e&&(b("chatTray").classList.contains("hidden")||dl(),qn.refresh())}),e.on("removed",()=>{T("A grown-up took this iPad off the street");const t=e.cfg;mt({url:t.url,code:t.code,id:t.id,parentKey:t.parentKey}),Ei()}),e.on("status",t=>{h===e&&(document.body.classList.toggle("reconnecting",t!=="online"&&!e.replaced),(t==="online"||t==="connecting")&&b("elsewhere").classList.add("hidden"))}),e.on("replaced",()=>{h===e&&b("elsewhere").classList.remove("hidden")}),e.on("table",()=>{if(h===e){if(x==="gameroom"){const t=Bn(),n=oe();t&&n?.where==="gameroom"&&Math.hypot(n.x-t.x,n.y-t.y)>40&&_e({where:"gameroom",x:t.x,y:Math.max(en,Math.min(yt,t.y)),flip:n.flip}),On()}Ss()?.refresh()}}),e.on("tblFail",(t,n)=>{h===e&&Ss()?.fail(t,n)}),e.on("welcome",()=>{if(h===e)if(x==="street")Jt(!0);else if(x==="park"||x==="ranch"){const t=oe();t&&_e(t),x==="park"?Ri():Vi(),ue()}else if(x==="gameroom"){const t=oe();t&&_e(t),_i(),ue(),Ss()?.refresh()}else e.houses.has(le)?$n():vn()}),vn()}async function Wb(){gt();const e=so(),t=wn();if(!e||!t?.token||t.url!==e)return;const n=new oo(t),s=await n.connect();s==="ok"?Hi(n):(n.close(),s!=="closed"&&T("Couldn't reach the street. Playing at home!"))}function qe(e,t,n=""){const s=document.createElement("div");s.className="sheet hoodSheet "+n,s.innerHTML=`<div class="card">${e}</div>`,document.body.appendChild(s),$.swish();const o=()=>s.remove();return s.addEventListener("click",i=>{const a=i.target;if(a===s||a.closest('[data-m="close"]'))return o();t(a,o,s)}),{root:s,close:o}}const je='<button class="close" data-m="close">✕</button>';b("btnHood").addEventListener("click",()=>Ub());function Ub(){const e=so();if(!e){qe(`${je}<h2>Neighborhood</h2><p class="hint">The street isn't open yet. Ask a grown-up to set it up!</p>`,()=>{});return}const t=wn()?.url===e?wn():null;qe(`${je}<h2>Neighborhood</h2><div class="bigBtns">
      ${t?.token?`<button class="big go" data-m="go">${He.street}<span>Go to my street</span></button>`:`<button class="big go" data-m="join">${He.street}<span>Join a friend's street</span></button>`}
      <button class="big grown" data-m="create">${He.shield}<span>${t?.parentKey?"Grown-ups":"Grown-ups: start a street"}</span></button></div>`,async(n,s)=>{const o=n.closest("[data-m]")?.dataset.m;if(o==="go"){s();const i=new oo(t),a=await i.connect();a==="ok"?Hi(i):(i.close(),T(a.startsWith("badtoken")?"Please join again":"Couldn't reach the street"))}o==="join"&&(s(),jn(e)),o==="create"&&(s(),await lr()&&(t?.parentKey?fo():Tb(e)))})}async function Tb(e){let t;try{t=await ug(e)}catch{T("Couldn't create a street right now");return}mt({url:e,code:t.code,id:t.id,parentKey:t.parentKey}),qe(`${je}<h2>Your street is ready!</h2><p class="hint">Kids join with this code (you can pick your own on the grown-up screen):</p><div class="code" id="newCode">${t.code}</div>
    <p class="hint small">Grown-up key (keep it private; it opens the grown-up screen on another device):<br><b class="key" id="parentKey">${t.parentKey}</b></p>
    <div class="bigBtns"><button class="big grown" data-m="setup">${He.shield}<span>Add kids' names &amp; code</span></button>
    <button class="big go" data-m="joinhere">${He.street}<span>Join on this iPad</span></button></div>`,(n,s)=>{n.closest('[data-m="joinhere"]')&&(s(),Ai(e,t.code)),n.closest('[data-m="setup"]')&&(s(),fo())})}function jn(e,t=""){const n=qe(`${je}<h2>Join a street</h2><p class="hint">Type the code a grown-up gave you</p>
    <form id="codeForm" class="codeForm"><input id="codeInput" maxlength="${yi}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="CODE"/><button type="submit" class="go">Next</button></form>
    <p class="err">${q(t)}</p>`,()=>{}),s=n.root.querySelector("#codeInput");setTimeout(()=>s.focus(),50),s.addEventListener("input",()=>{s.value=As(s.value)}),n.root.querySelector("#codeForm").addEventListener("submit",o=>{o.preventDefault();const i=As(s.value);if(!Tc(i)){n.close(),jn(e,"That code looks wrong. Try again!");return}n.close(),Ai(e,i)})}async function Ai(e,t,n=""){let s;try{s=await yg(e,t)}catch{jn(e,"Couldn't reach the street. Try again!");return}if("slow"in s){jn(e,"Too many tries. Ask a grown-up and try again in a few minutes.");return}if(!s.exists){jn(e,"Hmm, we couldn't find that street.");return}window.__lastLookupId=s.id,Pb(e,t,s.id,s.roster,n)}function Pb(e,t,n,s,o=""){if(s.length){qe(`${je}<h2>Who are you?</h2>${o?`<p class="err">${q(o)}</p>`:'<p class="hint">Tap your name</p>'}<div class="nicks roster">${s.map((i,a)=>`<button data-nick="${a}" ${i.claimed?"disabled":""}>${q(i.name)}${i.claimed?"<small>signed in</small>":""}</button>`).join("")}</div>
      <p class="hint small">Not on the list? Ask a grown-up to add your name.</p>`,(i,a)=>{const r=i.closest("[data-nick]");if(!r||r.disabled)return;a();const l=s[+r.dataset.nick];l.hasHouse?bl(e,t,n,l.name,void 0):Ea(e,t,n,l.name)},"wide");return}qe(`${je}<h2>Pick your street name</h2>${o?`<p class="err">${q(o)}</p>`:""}<div class="nicks">${ea.map((i,a)=>`<button data-nick="${a}">${q(i)}</button>`).join("")}</div>`,(i,a)=>{const r=i.closest("[data-nick]");r&&(a(),Ea(e,t,n,ea[+r.dataset.nick]))},"wide")}function Ea(e,t,n,s){qe(`${je}<h2>Hi, ${q(s)}!</h2><p class="hint">What should your house on the street be?</p>
    <div class="bigBtns"><button class="big go" data-m="bring">${Vo(2)}<span>Bring my house</span></button>
    <button class="big" data-m="fresh">${Vo(5)}<span>Start a new one</span></button></div>`,(o,i)=>{const a=o.closest("[data-m]")?.dataset.m;a&&(i(),bl(e,t,n,s,a==="bring"))})}async function bl(e,t,n,s,o){const i=V.get(),a=i.characters[0],r=ns(a??{});let l;if(o&&(l=i,a)){const{reduce:w}=await Gl(async()=>{const{reduce:_}=await Promise.resolve().then(()=>xc);return{reduce:_}},void 0);l=w(i,{type:"char/delete",id:a.id})}const c=wn(),g={url:e,code:t,id:n,parentKey:c?.id===n||c?.code===t?c.parentKey:void 0},d=i.dog?{name:i.dog.name,breed:i.dog.breed}:null,u=new oo(g),y=await u.connect({nickname:s,look:r,house:l,dog:d});if(y==="ok"){mt(u.cfg),Hi(u),T(`Welcome to the street, ${s}!`);return}u.close(),y.startsWith("nickname")?Ai(e,t,y.endsWith("notOnList")?"That name is not on the list anymore.":"That name is already signed in on another iPad. Ask a grown-up!"):T(y==="full"?"That street is full":"Couldn't join right now")}b("btnParent").addEventListener("click",async()=>{await lr()&&fo()});const zb={codeTaken:"That code is already used by another street. Try adding a number!",badCode:"Codes are 4–16 letters or numbers.",badName:"Use a first name only (letters).",rosterFull:`Up to ${Pc} names.`,nameInUse:"Remove that player first.",codeFixed:"This street's code can't be changed."};async function fo(){const e=wn();if(!e)return;if(!e.parentKey){const a=qe(`${je}<h2>Grown-up key</h2><p class="hint">Enter the key you got when the street was made</p><form id="keyForm" class="codeForm"><input id="keyInput" autocomplete="off" spellcheck="false"/><button class="go">OK</button></form>`,()=>{});a.root.querySelector("#keyForm").addEventListener("submit",r=>{r.preventDefault(),e.parentKey=a.root.querySelector("#keyInput").value.trim(),mt(e),h&&(h.cfg.parentKey=e.parentKey),a.close(),fo()});return}let t=h;t||(t=new oo({...e,token:void 0}),await t.connect());const n=t,s=a=>o.root.querySelector(a).value,o=qe(`${je}<h2>Grown-up screen</h2><div id="parentBody"><p class="hint">Loading…</p></div>`,async a=>{const r=a.closest("[data-p]");if(!r)return;const l=r.dataset.p;if(l==="free"&&n.parent({op:"freeChat",on:r.dataset.on!=="1"}),l==="freeMail"&&n.parent({op:"freeMail",on:r.dataset.on!=="1"}),l==="rename"&&n.parent({op:"rename",houseId:r.dataset.hid,name:s(`input[data-hid="${r.dataset.hid}"]`)}),l==="add"&&n.parent({op:"rosterAdd",name:r.dataset.name??s("#rosterInput")}),l==="unname"&&n.parent({op:"rosterRemove",name:r.dataset.name}),l==="unclaim"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again";return}n.parent({op:"unclaim",name:r.dataset.name})}if(l==="setcode"&&n.parent({op:"setCode",code:s("#codeEdit")}),l==="remove"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again to remove";return}n.parent({op:"remove",pid:r.dataset.pid})}if(l==="mailClear"||l==="mailClearAll"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent=l==="mailClearAll"?"Tap again to clear every mailbox":r.dataset.id?"Tap again":"Tap again to clear this mailbox";return}l==="mailClearAll"?n.parent({op:"mailClearAll"}):n.parent({op:"mailClear",houseId:r.dataset.hid,...r.dataset.id?{id:r.dataset.id}:{}})}if(l==="leave"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again: forget this street here";return}mt(null),o.close(),Ei(),T("This iPad left the street")}},"wide parent");o.root.addEventListener("submit",a=>{a.preventDefault();const r=a.target.id;r==="rosterForm"&&n.parent({op:"rosterAdd",name:s("#rosterInput")}),r==="codeForm2"&&n.parent({op:"setCode",code:s("#codeEdit")})});const i=a=>{const r=new Date(a);return Number.isFinite(r.getTime())?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r.getMonth()]+" "+r.getDate()+", "+r.getFullYear():""};n.on("parentInfo",a=>{const r=o.root.querySelector("#parentBody");if(!r)return;const l=wn();l&&l.code!==a.code&&(l.code=a.code,mt(l)),n.cfg.code=a.code;const c=a.roster??[],g=new Set(c.map(p=>p.name.toLowerCase())),d=zc.filter(p=>!g.has(p.toLowerCase())),u=c[0]?.name??"Reagan",y=Array.isArray(a.mail)?a.mail:[],w=y.some(p=>p.letters&&p.letters.length),_=or(a.settings),B=y.map(p=>`<div class="pMailHouse"><div class="pMailName">${q(p.name||"House")}</div>${(p.letters||[]).slice().reverse().map(f=>`<div class="pLetter"><b>${q(f.from)}</b><span class="pWhen">${q(i(f.at))}</span><p>${q(f.text)}</p><button type="button" class="danger" data-p="mailClear" data-hid="${q(p.houseId)}" data-id="${q(f.id)}">Clear</button></div>`).join("")||'<p class="hint">No letters.</p>'}${(p.letters||[]).length?`<button type="button" class="danger" data-p="mailClear" data-hid="${q(p.houseId)}">Clear this mailbox</button>`:""}</div>`).join("");r.innerHTML=`${a.note?`<p class="err" id="pNote">${q(zb[a.note]??a.note)}</p>`:""}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${q(a.code)}</div></div>
        <div><div class="label">Free typing</div><button class="toggle ${a.settings.freeChat?"on":""}" data-p="free" data-on="${a.settings.freeChat?1:0}" id="pFree">${a.settings.freeChat?"On":"Off (presets only)"}</button><p class="hint small">Chat bubbles. Off means preset phrases only.</p></div>
        <div><div class="label">Let kids type their own letters</div><button class="toggle ${_?"on":""}" data-p="freeMail" data-on="${_?1:0}" id="pFreeMail">${_?"On":"Off (presets only)"}</button><p class="hint small">Letters only. Off means preset phrases only.</p></div></div>
      <div class="label">Letters</div><div id="parentMail">${B||'<p class="hint">No letters right now.</p>'}${w?'<button type="button" class="danger" data-p="mailClearAll" id="mailClearAll">Clear every mailbox</button>':""}</div>
      <form class="pAdd" id="codeForm2"><input id="codeEdit" maxlength="${yi}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="e.g. ${q(As(u))}7"/><button data-p="setcode" type="button">Use this code</button></form>
      <p class="hint small">Tip: a word plus a number (like ${q(As(u))}7) is easy to remember and harder to guess. Not case-sensitive.</p>
      <div class="label">Kids' names (sign-in list)</div>
      <div class="roster">${c.map(p=>`<span class="rName ${p.claimed?"claimed":""}"><b>${q(p.name)}</b>${p.claimed?`<i>signed in</i><button data-p="unclaim" data-name="${q(p.name)}">Reset</button>`:p.hasHouse?"<i>not signed in</i>":`<button class="x" data-p="unname" data-name="${q(p.name)}" aria-label="Remove name">×</button>`}</span>`).join("")||'<p class="hint">No names yet: kids pick a fun nickname instead.</p>'}</div>
      <form class="pAdd" id="rosterForm"><input id="rosterInput" maxlength="20" autocomplete="off" placeholder="First name"/><button data-p="add" type="button">Add</button></form>
      ${d.length?`<div class="sugg">${d.map(p=>`<button data-p="add" data-name="${p}">+ ${p}</button>`).join("")}</div>`:""}
      <div class="label">Houses</div>${a.houses.map(p=>`<div class="pHouse"><input data-hid="${p.id}" value="${q(p.name)}" maxlength="24"/><button data-p="rename" data-hid="${p.id}">Rename</button></div>`).join("")||'<p class="hint">No houses yet.</p>'}
      <div class="label">Players</div>${a.players.map(p=>`<div class="pPlayer"><span class="dot ${p.online?"on":""}"></span>${q(p.nickname)}<button class="danger" data-p="remove" data-pid="${p.pid}">Remove</button></div>`).join("")||'<p class="hint">Nobody has joined yet.</p>'}
      <p class="hint small">Letters stay on the server for up to 30 days. They are filtered, and only a first name is stored. You can clear them here, or turn off “Let kids type their own letters” so new letters use preset phrases. Chat bubbles are only relayed to kids standing nearby and are not saved. No emails or last names. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays).</p>
      <button class="danger wideBtn" data-p="leave">Forget this street on this device</button>`}),n.on("error",a=>{a==="badkey"&&(T("That grown-up key didn't work"),e.parentKey=void 0,mt(e),o.close())}),n.parent({op:"info"})}let Te=null;function jt(){return b("park").clientHeight/vi}const Eb=()=>{const e=V.get();return e.characters.find(t=>t.id===e.dog?.owner)??e.characters[0]},Je=()=>h?oe():Te;function Qe(e){h?_e(e):Te=e,x==="ranch"?Ht():x==="gameroom"?On():on()}function Pt(e="park"){if(h){const n=[],s=[...h.presence.entries()],o=oe();o&&s.push([h.pid,o]);for(const[i,a]of s){const r=h.players.get(i);r&&a.where===e&&n.push({key:i,look:r.look,name:r.nickname,p:a,mine:i===h.pid,dog:r.dog??null})}return n}const t=Eb();return Te&&Te.where===e?[{key:"solo",look:ns(t??{}),name:"",p:Te,mine:!0,dog:V.get().dog??null}]:[]}function Ri(){const e=jt(),t=b("parkWorld"),n=s=>s*e+"px";t.style.width=ki*e+"px",t.style.height=vi*e+"px",t.style.setProperty("--sc",String(e)),t.innerHTML=Ag()+Io.map((s,o)=>s.kind==="swing"?`<div class="swing" data-swing="${o}" style="left:${n(s.x-30)};top:${n(Fe)};width:${n(60)};height:${n(240)}">${Rg}</div>`:"").join("")+Io.map((s,o)=>`<button class="pspot k-${s.kind}" data-spot="${o}" aria-label="${s.kind}" style="left:${n(s.x-50)};top:${n(s.y-(s.kind==="swing"?70:55))};width:${n(100)};height:${n(s.kind==="swing"?90:65)}"></button>`).join("")+`<button class="pspot slide" data-act="slide" aria-label="Slide" style="left:${n(O.ladder-45)};top:${n(O.top.y-30)};width:${n(130)};height:${n(560-O.top.y+30)}"></button><button class="pspot pond" data-act="splash" aria-label="Pond" style="left:${n(1235)};top:${n(462)};width:${n(370)};height:${n(105)}"></button><button class="pspot gate" data-act="exit" aria-label="Back to the street" style="left:${n(25)};top:${n(240)};width:${n(180)};height:${n(260)}"></button><div class="ripples" id="ripples"></div><button class="ball" id="ball" aria-label="Ball">${Dg}</button><div class="savatars" id="pavatars"></div>`,Qs(),on(),ue()}const Ha=2400;function on(){const e=document.getElementById("pavatars");if(!e||x!=="park")return;const t=jt(),n=new Set,s=new Set;for(const o of Pt()){n.add(o.key);let i=e.querySelector(`.savatar[data-pid="${o.key}"]`);i||(i=document.createElement("div"),i.className="savatar "+(o.mine?"mine":"other"),i.dataset.pid=o.key,e.appendChild(i),o.mine&&wl(i));const a=JSON.stringify(o.look)+o.name;if(i.dataset.look!==a){const d=i.querySelector(".bubble");i.innerHTML=o.name?Pi(o.look,o.name):`<div class="inner">${de(o.look)}</div>`,d&&i.appendChild(d),i.dataset.look=a}const r=(sn[o.look.size]??1)*t*.95,l=qt*r,c=lt*r;i.style.left=o.p.x*t-l/2+"px",i.style.top=o.p.y*t-c+"px",i.style.width=l+"px",i.style.height=c+"px",i.style.zIndex=String(100+Math.round(o.p.y)),i.classList.toggle("flipped",o.p.flip);const g=o.p.pose??"";i.dataset.pose!==g&&(i.classList.remove("pose-sit","pose-swing","pose-slide"),i.offsetWidth,g==="slide"&&(i.style.setProperty("--sx",(O.top.x-O.bottom.x)*t+"px"),i.style.setProperty("--sy",(O.top.y-O.bottom.y)*t+"px")),g&&i.classList.add("pose-"+g),i.dataset.pose=g),g==="swing"?(i.style.transformOrigin=`50% ${(Fe-o.p.y)*t+c}px`,i.style.animationDelay=-(Date.now()%Ha)/1e3+"s",s.add(o.p.spot??-1)):(i.style.transformOrigin="",i.style.animationDelay="")}e.querySelectorAll(".savatar").forEach(o=>{n.has(o.dataset.pid)||o.remove()}),document.querySelectorAll("#parkWorld .swing").forEach(o=>{const i=s.has(+o.dataset.swing);i&&!o.classList.contains("swinging")&&(o.style.animationDelay=-(Date.now()%Ha)/1e3+"s"),o.classList.toggle("swinging",i)}),rn()}function wl(e){e.addEventListener("pointerdown",t=>{t.preventDefault(),t.stopPropagation();const n=Je();if(!n||n.where!=="park"&&n.where!=="ranch"&&n.where!=="barn")return;const s=n.where!=="park",o=n.where;Me=[];const i=b(s?"ranchScroll":"parkScroll"),a=s?ze():jt(),r=o==="barn"?gi:s?ts:ki,l=v=>{const C=b(s?"ranchWorld":"parkWorld").getBoundingClientRect();return{x:(v.clientX-C.left)/a,y:(v.clientY-C.top)/a}},c=l(t),g={x:n.x-c.x,y:n.y-c.y};let d=t,u=0,y=n.x,w=!1;const _=v=>{const C=l(v),S=Je();if(!S)return;const D=Math.max(60,Math.min(r-60,C.x+g.x)),R=Math.max(470,Math.min(590,C.y+g.y));if(!w&&Math.hypot(D-S.x,R-S.y)<6)return;w=!0;const ee=Math.abs(D-y)>3?D<y:S.flip;Math.abs(D-y)>3&&(y=D),Qe(o==="barn"?{where:"barn",x:D,y:R,flip:ee}:s?{where:"ranch",x:D,y:R,flip:ee,...S.ride!==void 0?{ride:S.ride}:{}}:{where:"park",x:D,y:R,flip:ee})},B=()=>{const v=i.getBoundingClientRect(),C=d.clientX<v.left+70?-10:d.clientX>v.right-70?10:0;C&&w&&(i.scrollLeft+=C,_(d)),u=requestAnimationFrame(B)};u=requestAnimationFrame(B),e.classList.add("lifted"),$.pick();const p=v=>{v.pointerId===t.pointerId&&(d=v,_(v))},f=v=>{v.pointerId===t.pointerId&&(cancelAnimationFrame(u),window.removeEventListener("pointermove",p),window.removeEventListener("pointerup",f),e.classList.remove("lifted"),$.drop())};window.addEventListener("pointermove",p),window.addEventListener("pointerup",f)})}b("parkWorld").addEventListener("pointerdown",e=>{e.target.closest(".pspot, .ball, .pet")&&e.stopPropagation()});b("parkWorld").addEventListener("click",e=>{const t=e.target,n=Je();if(!n)return;if(t.closest("#ball")){Rb();return}const s=t.closest("[data-spot]");if(s){const i=+s.dataset.spot,a=Io[i];if(n.spot===i&&n.pose){Qe({where:"park",x:a.x,y:Math.min(590,a.y+40),flip:n.flip});return}if(Pt().some(r=>!r.mine&&r.p.spot===i&&r.p.pose)){T("Someone is already there!");return}Qe({where:"park",x:a.x,y:a.y,flip:n.flip,pose:a.kind==="swing"?"swing":"sit",spot:i}),a.kind==="swing"?$.boing():$.drop();return}const o=t.closest("[data-act]")?.dataset.act;if(o==="slide"&&(Qe({where:"park",x:O.bottom.x,y:O.bottom.y,flip:!1,pose:"slide"}),$.swish(),setTimeout(()=>{const i=Je();i?.pose==="slide"&&Qe({where:"park",x:i.x,y:i.y,flip:i.flip})},1500)),o==="splash"){const i=b("parkWorld").getBoundingClientRect(),a=(e.clientX-i.left)/jt();_l(a),h?.fx({k:"splash",x:a})}o==="exit"&&xl()});function _l(e){const t=document.getElementById("ripples");if(!t||x!=="park")return;const n=jt();for(let s=0;s<2;s++){const o=document.createElement("div");o.className="ripple";const i=(120+s*70)*n;Object.assign(o.style,{left:e*n-i/2+"px",top:512*n-i*.18+"px",width:i+"px",height:i*.36+"px",animationDelay:s*.15+"s"}),t.appendChild(o),setTimeout(()=>o.remove(),1400)}for(let s=0;s<6;s++){const o=document.createElement("div");o.className="drop",Object.assign(o.style,{left:e*n+"px",top:505*n+"px"}),o.style.setProperty("--dx",(s-2.5)*14+"px"),t.appendChild(o),setTimeout(()=>o.remove(),900)}$.splash()}function Hb(){ln(),Me=[],ie=!1,x="park",b("park").classList.remove("hidden"),rs(b("park"));const e={where:"park",x:290,y:548,flip:!1};h?_e(e):Te=e,b("streetTitle").textContent="The Park",gt(),Ri(),requestAnimationFrame(()=>{const t=b("parkScroll");t.scrollLeft=0,ue()}),$.sparkle()}function xl(){vn()}function Ab(){ln(),Me=[],ie=!1,x="gameroom",b("gameroom").classList.remove("hidden");const e=Bn(),t=e?{where:"gameroom",x:e.x,y:Math.max(en,Math.min(yt,e.y)),flip:!1}:{where:"gameroom",x:280,y:560,flip:!1};h?_e(t):Te=t,b("streetTitle").textContent="The Clubhouse",gt(),_i(),requestAnimationFrame(()=>{const n=Ot(),s=b("grScroll");s.scrollLeft=Math.max(0,(e?.x??520)*n-s.clientWidth/2),ue()}),rs(b("gameroom")),$.sparkle()}b("btnLeavePark").addEventListener("click",()=>{x==="ranch"&&ie?es(!1):xl()});let St={x:2620,y:565},te=null;function Qs(e=!1){const t=document.getElementById("ball");if(!t)return;const n=jt(),s=34*n;e||t.classList.remove("flying"),t.style.left=St.x*n-s/2+"px",t.style.top=St.y*n-s+"px",t.style.width=t.style.height=s+"px"}function Rb(){if(te)return;const e=me.x0+40+Math.random()*(me.x1-me.x0-80),t=me.y0+25+Math.random()*(me.y1-me.y0-35);$l(h?h.pid:"solo",e,t),h?.fx({k:"ball",x:e,y:t})}function $l(e,t,n){if(x!=="park")return;const s=document.getElementById("ball");St={x:t,y:n},te={thrower:e,phase:"fly",dog:null,until:performance.now()+12e3},s&&(s.classList.remove("flying"),s.offsetWidth,s.classList.add("flying"),Qs(!0)),$.boing(),setTimeout(()=>{te?.phase==="fly"&&(te.phase="chase",document.getElementById("ball")?.classList.remove("flying"),Wt.size||(te=null))},650)}function Db(e){if(!h)return Te;const t=e===h.pid?oe():h.presence.get(e);return t&&t.where==="park"?t:null}const Wt=new Map,So=e=>(t,n,s,o,i)=>{t.style.left=(n-o/2)*e+"px",t.style.top=(s-i)*e+"px",t.style.width=o*e+"px",t.style.height=i*e+"px"};function Ib(){const e=[];if(x==="house"){const t=L.get(),n={box:Le,place:Sn,z:s=>String(4e3+Math.round(s)),scale:1};if(h&&Pe!==V){const s=[...h.presence.entries()],o=oe();o&&s.push([h.pid,o]);for(const[i,a]of s){const r=h.players.get(i)?.dog;r&&a.where==="house"&&a.houseId===le&&a.room===t.currentRoom&&e.push({key:i,dog:r,x:a.x,y:a.y,flip:a.flip,...n})}}else if(t.dog){const s=t.characters.find(o=>o.id===t.dog.owner)??t.characters[0];s&&s.room===t.currentRoom&&e.push({key:"solo",dog:t.dog,x:s.x,y:s.y,flip:s.flip,...n})}}else if(x==="park"){const t=document.getElementById("pavatars");if(!t)return e;const n=jt();for(const s of Pt())s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:So(n),z:o=>String(Math.round(o)-200),scale:.95})}else if(x==="ranch"){const t=document.getElementById("ravatars");if(!t)return e;const n=ze();for(const s of Pt(ie?"barn":"ranch"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:So(n),z:o=>String(100+Math.round(o)),scale:.95,riding:s.p.ride!==void 0})}else if(x==="gameroom"){const t=document.getElementById("gavatars");if(!t)return e;const n=Ot();for(const s of Pt("gameroom"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:So(n),z:o=>String(Math.round(o)-200),scale:.95})}return e}let Aa=performance.now();function Nb(e,t){const n=new Set;for(const s of Ib()){if(jb(s.key))continue;n.add(s.key);let o=Wt.get(s.key);const i=s.flip?1:-1,a=s.riding?200:78;let r=s.x+i*a;s.riding&&(r=Math.max(50,Math.min(ts-50,r)));const l=Math.min(595,s.y+(s.riding?28:6));if(!o||o.box!==s.box||!o.el.isConnected){o?.el.remove();const v=document.createElement("div");v.className="pet pet-dog",v.dataset.dog=s.key,s.box.appendChild(v),Ob(v,s.key),o={el:v,box:s.box,x:r,y:l,flip:s.flip,pose:"",look:"",idle:1,trickUntil:0,sitTrick:!1},Wt.set(s.key,o)}let c=r,g=l,d=s.riding?980:320;if(te&&e>te.until&&(te=null,Qs()),te&&x==="park"){if(te.phase==="chase")c=St.x,g=St.y,d=950,Math.hypot(o.x-c,o.y-g)<28&&(te.phase="carry",te.dog=s.key,$.woof());else if(te.phase==="carry"&&te.dog===s.key){const v=Db(te.thrower)??{x:(me.x0+me.x1)/2,y:540};c=v.x+60,g=Math.min(590,v.y+6),d=750,St={x:o.x+(o.flip?-40:40),y:o.y-30*s.scale},Math.hypot(o.x-c,o.y-g)<26&&(St={x:v.x+70,y:Math.min(590,v.y+12)},te=null,Us(o,"♥"),$.sparkle()),Qs()}}const u=e<o.trickUntil,y=c-o.x,w=g-o.y,_=Math.hypot(y,w);let B=!1;if(_>(te?4:10)&&!u){const v=ao()?_:Math.min(_,d*t);o.x+=y/_*v,o.y+=w/_*v,B=!0,Math.abs(y)>1.5&&(o.flip=y<0),o.idle=0}else o.idle+=t,!u&&o.idle>.3&&Math.abs(s.x-o.x)>4&&(o.flip=s.x<o.x);const p=u&&o.sitTrick?"sit":B?"stand":o.idle>.9?"sit":"stand",f=p+s.dog.breed;if(o.pose+o.look!==p+f){const v=[...o.el.querySelectorAll(".bubble, .kennelBtn")];o.el.innerHTML=`<div class="inner">${Zn(s.dog.breed,p)}</div>`;for(const C of v)o.el.appendChild(C);o.pose=p,o.look=f}o.el.dataset.name=s.dog.name,o.el.classList.toggle("walking",B),o.el.classList.toggle("flipped",o.flip),s.place(o.el,o.x,o.y,92*s.scale,71*s.scale),o.el.style.zIndex=s.z(o.y+1),Cl(o.el,s.key,!1)}for(const[s,o]of Wt)n.has(s)||(o.el.remove(),Wt.delete(s))}function Us(e,t){e.el.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.el.appendChild(n),Wn(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const Ra=new Map;function Ml(e,t){const n=Wt.get(e);if(!n)return;const s=n.el.dataset.name??"";n.trickUntil=performance.now()+1400,n.sitTrick=t===0,n.el.classList.remove("spin","hop"),n.el.offsetWidth,t===0&&(Us(n,`${s} sits! 🐾`),$.pop()),t===1&&(n.el.classList.add("spin"),Us(n,"Wheee! ✨"),$.spin()),t===2&&(n.el.classList.add("hop"),Us(n,"Woof! Woof!"),$.woof())}function Ob(e,t){e.addEventListener("pointerdown",n=>{n.stopPropagation(),n.preventDefault()}),e.addEventListener("click",n=>{n.stopPropagation();const s=(Ra.get(t)??0)%3;Ra.set(t,s+1),Ml(t,s),h&&h.fx({k:"trick",owner:t,v:s})})}function mo(e){const t=e?.dogKennel?.item;if(!t||!e)return null;for(const n of Object.values(e.rooms)){const s=n.items.find(o=>o.id===t&&o.kind==="kennel");if(s)return s}return null}function qb(e){if(e==="solo")return V.get();if(!h)return null;const t=h.players.get(e)?.houseId;return t?h.view(t):null}function jb(e){return!!mo(qb(e))}function Di(){if(h){const e=h.myHouseId();return e?h.view(e):null}return V.get()}function Ll(){if(x!=="house")return null;const e=L.get(),t=mo(e);if(!t||!e.rooms[e.currentRoom]?.items.some(n=>n.id===t.id))return null;if(h&&Pe!==V){const n=h.houses.get(le)?.meta.ownerId,s=n?h.players.get(n)?.dog??null:null;return!n||!s?null:{key:n,dog:s,item:t}}return e.dog?{key:"solo",dog:e.dog,item:t}:null}function Vb(){const e=Di();if(!e)return null;const t=Gs()?L.get().currentRoom:null;let n=null,s=null;for(const[o,i]of Object.entries(e.rooms))for(const a of i.items)a.kind==="kennel"&&((!n||a.z>=n.z)&&(n=a),o===t&&(!s||a.z>=s.z)&&(s=a));return s??n}function _s(e){if(!Oi()){T("Adopt a dog first!");return}Dn({type:"dog/kennel",item:e}),e?($.pop(),T("Rest well, puppy!")):($.woof(),T("Come on, puppy!"))}function Ii(e){if(!Oi()){T("Adopt a dog first!");return}const t=mo(Di());if(e===void 0){if(t){_s(null);return}const n=Vb();if(!n){T("Put a dog kennel down first!");return}_s(n.id);return}t?.id===e?_s(null):_s(e)}function Bl(e){const t=L.get(),n=t.rooms[t.currentRoom]?.items.find(s=>s.id===e);if(n){if(n.kind==="kennel"){Gs()&&Ii(n.id);return}n.kind==="cat-tower"&&Xb()}}function Fb(e,t){const n=L.get(),s=n.rooms[n.currentRoom]?.items.find(i=>i.id===t);if(!s)return;const o=Tg(s.kind);if(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),$.click(),o==="kennel"||o==="tower"){Bl(t);return}if(o==="lamp"){e.classList.toggle("lamp-on");return}if(o==="open"){e.classList.toggle("opened");return}o==="sit"&&Zb(s)}function Zb(e){const t=Math.max(lo+40,e.y-8);if(h&&x==="house"){const o=oe();o&&o.where==="house"&&(_e({...o,x:e.x,y:t,flip:!1}),Dt());return}const n=L.get(),s=n.characters.find(o=>o.id===Be&&o.room===n.currentRoom)??n.characters.find(o=>o.room===n.currentRoom);s&&L.dispatch({type:"char/move",id:s.id,room:n.currentRoom,x:e.x,y:t})}function Cl(e,t,n){const s=h?t===h.pid:t==="solo";let o=e.querySelector(".kennelBtn");if(!s){o?.remove();return}o||(o=document.createElement("button"),o.type="button",o.className="kennelBtn",o.addEventListener("pointerdown",i=>{i.stopPropagation(),i.preventDefault()}),o.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault(),Ii()}),e.appendChild(o)),o.textContent=n?"Out":"Kennel"}function Qb(e,t){e.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.appendChild(n),Wn(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const Rn=new Map;function Gb(){const e=new Set,t=Ll();if(t){e.add(t.key);const n=_g(t.dog.name,Date.now()),s=t.item.y-(n==="peek"?24:2);let o=Rn.get(t.key);if(!o||!o.el.isConnected){o?.el.remove();const a=document.createElement("div");a.className="pet pet-dog kenneled",a.dataset.dog="kennel:"+t.key,Le.appendChild(a),a.addEventListener("pointerdown",r=>{r.target.closest(".kennelBtn")||(r.stopPropagation(),r.preventDefault())}),a.addEventListener("click",r=>{r.target.closest(".kennelBtn")||(r.stopPropagation(),Qb(a,`${a.dataset.name??"Puppy"} is resting`))}),o={el:a,pose:"",look:"",x:t.item.x,y:s},Rn.set(t.key,o)}const i=n==="rest"?"sleep":"sit";if(o.pose!==i||o.look!==n+t.dog.breed){const a=[...o.el.querySelectorAll(".bubble, .kennelBtn")];o.el.innerHTML=`<div class="inner">${Zn(t.dog.breed,i)}</div>${n==="rest"?'<div class="zzz"><b>Zzz</b><i>z</i><i>z</i><i>z</i></div>':""}`;for(const r of a)o.el.appendChild(r);o.pose=i,o.look=n+t.dog.breed}o.el.dataset.name=t.dog.name,o.el.classList.toggle("rest",n==="rest"),o.el.classList.toggle("peek",n==="peek"),o.x=t.item.x,o.y=s,Sn(o.el,t.item.x,s,100,77),o.el.style.zIndex=String(1e3+t.item.z+1),Cl(o.el,t.key,!0)}for(const[n,s]of Rn)e.has(n)||(s.el.remove(),Rn.delete(n))}let E=null,xs="",Wo=0,Ni=0,Ts={x:0,perch:0,leap:!1};const Kb=562;function Sl(e){return(e.rooms[e.currentRoom]?.items.filter(n=>n.kind==="cat-tower")??[]).reduce((n,s)=>!n||s.z>=n.z?s:n,null)}function Da(e){return e==="cat-bed"||e==="pet-bed"||e==="dog-bed"||e==="pack:cat-bed"||/(?:^|:)cat-bed$|(?:^|:)pet-bed$/.test(e)}function Yb(e){const t=e.rooms[e.currentRoom]?.items??[],n=t.filter(a=>Da(a.kind)),s=t.filter(a=>a.kind==="bed"),o=(n.length?n:s).reduce((a,r)=>!a||r.z>=a.z?r:a,null);if(!o)return null;const i=Ke[o.kind];return{x:o.x,y:o.y,h:i?Ae(i)*o.scale:80,pet:Da(o.kind)}}function Xb(){const e=L.get();!e.cat||e.cat.room!==e.currentRoom||!Sl(e)||(Ni=performance.now()+900,$.boing(),h?.fx({k:"leap"}))}function Jb(){const e=L.get(),t=x==="house"?e.cat:null;if(!t||t.room!==e.currentRoom){E&&(E.remove(),E=null,xs="",Wo=0);return}(!E||!E.isConnected)&&(E=document.createElement("div"),E.className="pet pet-cat",Le.appendChild(E),xs="",E.addEventListener("pointerdown",B=>{B.stopPropagation(),B.preventDefault()}),E.addEventListener("click",B=>{B.stopPropagation(),Wl(),h&&h.fx({k:"purr"})}));const n=Sl(e),s=n?null:Yb(e),o=n?Ke[n.kind]:void 0,i=n&&o?Ae(o)*n.scale:0,a=xg(t,Date.now(),n?{x:n.x}:null,s?{x:s.x}:null,ao()),r=!!n&&performance.now()<Ni,l=r?2:a.perch,c=r&&n?n.x:a.x,g=r?"play":a.mood,d=g==="walk"?"stand":g==="nap"?"nap":"sit",u=d+t.coat+(l?"p":"");if(u!==xs){const B=[...E.querySelectorAll(".bubble, .heart")];E.innerHTML=`<div class="inner">${_n(t.coat,d)}</div>${d==="nap"?'<div class="zzz"><i>z</i><i>z</i><i>z</i></div>':""}`;for(const p of B)E.appendChild(p);xs=u}if(l>0&&Wo===0){E.classList.add("hop");const B=E;setTimeout(()=>B.classList.remove("hop"),420)}Wo=l,E.dataset.name=t.name,E.dataset.mood=g,E.dataset.perch=String(l),E.dataset.leap=r?"1":"0",E.dataset.curl=a.curl?"1":"0",E.classList.toggle("walking",g==="walk"),E.classList.toggle("groom",g==="groom"),E.classList.toggle("play",g==="play"&&!r),E.classList.toggle("leap",r),E.classList.toggle("flipped",a.flip),E.classList.toggle("curl",a.curl===1),Le.querySelectorAll(".item.toy-live").forEach(B=>B.classList.remove("toy-live")),n&&g==="play"&&l&&!r&&Le.querySelector(`.item[data-id="${n.id}"]`)?.classList.add("toy-live");const y=window.__pinCat,w=!!(y&&Number.isFinite(y.x)),_=!w&&l&&n?wg(n.y,i,l):!w&&a.curl&&s?s.y-s.h*(s.pet?.38:.2):Kb;Sn(E,w?y.x:c,_,!w&&l?110:150,!w&&l?92:128),E.style.zIndex=String(4e3+Math.round(_)),Ts={x:w?y.x:c,perch:l,leap:r}}function Wl(){if(!E)return;$.purr(),setTimeout(()=>$.meow(),250),E.querySelector(".bubble")?.remove();const e=document.createElement("div");e.className="bubble petBubble",e.textContent=`${E.dataset.name} purrs ♥`,E.appendChild(e),Wn(),setTimeout(()=>e.classList.add("out"),1500),setTimeout(()=>e.remove(),1900),E.classList.remove("happy"),E.offsetWidth,E.classList.add("happy");for(let t=0;t<5;t++){const n=document.createElement("div");n.className="heart",n.textContent="♥",n.style.left=20+Math.random()*60+"%",n.style.animationDelay=t*.12+"s",n.style.color=["#ff6b9a","#ff8fab","#e879c6"][t%3],E.appendChild(n),setTimeout(()=>n.remove(),1800)}}function e4(e,t){if(t.k==="zoo"||t.k==="apple"||t.k==="honk"||t.k==="hen"){m4(t);return}t.k==="trick"?Ml(t.owner,t.v):t.k==="purr"?x==="house"&&Wl():t.k==="leap"?x==="house"&&(Ni=performance.now()+900):t.k==="ball"?$l(e,t.x,t.y):t.k==="splash"&&_l(t.x)}function Ul(e){const t=Math.min(.05,Math.max(0,(e-Aa)/1e3));Aa=e;try{Nb(e,t),Gb(),Jb(),y4(e,t),Y2(t),$r()}catch{}requestAnimationFrame(Ul)}function t4(){return h?h.view(h.myHouseId())?.cat??null:V.get().cat??null}function Oi(){return h?h.players.get(h.pid)?.dog??null:V.get().dog??null}function Dn(e){if(h){const t=h.myHouseId();t&&h.dispatch(t,e)}else V.dispatch(e)}const Gs=()=>x==="house"&&(!h||Pe===V||le===h.myHouseId());function n4(e="cat"){const t=t4(),n=Oi(),s=V.get().characters,o={tab:e,coat:t?.coat??0,catName:t?.name??"",breed:n?.breed??0,dogName:n?.name??"",owner:n?.owner??s[0]?.id,err:"",bye:!1},i=qe("",(l,c)=>{const g=y=>l.closest(`[${y}]`)?.getAttribute(y);if(g("data-pt")){o.tab=g("data-pt"),o.err="",o.bye=!1,r();return}if(g("data-coat")!=null){o.coat=+g("data-coat"),$.click(),r();return}if(g("data-breed")!=null){o.breed=+g("data-breed"),$.click(),r();return}if(g("data-cname")){o.catName=g("data-cname"),$.click(),r();return}if(g("data-dname")){o.dogName=g("data-dname"),$.click(),r();return}if(g("data-owner")){o.owner=g("data-owner"),$.click(),r();return}const d=g("data-pa");if(!d)return;const u=(i.root.querySelector("#petName")?.value??"").trim();if(d==="adoptCat"||d==="adoptDog"){const y=u||(d==="adoptCat"?o.catName:o.dogName),w=pg(y);if(!w){o.err=y?"Hmm, try a different name!":"Pick a name first!",$.pop(),r();return}if(d==="adoptCat"){const _=Gs(),B={name:w,coat:o.coat,room:_?L.get().currentRoom:t?.room??"living",x:_?Math.max(200,Math.min(ae-200,j+se/2)):t?.x??1200};Dn({type:"cat/set",cat:B}),$.meow(),c(),T(t?`${w} looks great! 🐱`:_?`${w} moved in! 🐱`:`${w} is waiting at your house! 🐱`)}else{const _=h?{name:w,breed:o.breed}:{name:w,breed:o.breed,owner:o.owner};h?(h.setDog(_),x==="park"&&on()):V.dispatch({type:"dog/set",dog:_}),$.woof(),c(),T(n?`${w} looks great! 🐶`:`${w} is your new best friend! 🐶`)}return}if(d==="callCat"){Dn({type:"cat/move",room:L.get().currentRoom,x:Math.max(200,Math.min(ae-200,j+se/2))}),$.meow(),c();return}if(d==="kennelDog"){Ii(),c();return}if(d==="bye"){if(!o.bye){o.bye=!0,r();return}o.tab==="cat"?Dn({type:"cat/set",cat:null}):(Dn({type:"dog/kennel",item:null}),h?h.setDog(null):V.dispatch({type:"dog/set",dog:null})),c(),T("They went to live with a kind friend 💛");return}},"wide pets"),a=i.root.querySelector(".card");function r(){const l=o.tab==="cat",c=l?t:n,g=l?gg:dg,d=l?o.catName:o.dogName,u=i.root.querySelector("#petName")?.value??"";a.innerHTML=`${je}<h2>Pets</h2>
      <div class="petTabs"><button data-pt="cat" class="${l?"on":""}">🐱 Cat</button><button data-pt="dog" class="${l?"":"on"}">🐶 Dog</button></div>
      <p class="hint small">${l?h?"Your cat lives in your house. Friends can see her when they visit!":"Your cat lives in your house. She naps, purrs, and plays!":h?"Your dog follows you everywhere: the street, friends' houses, and the park!":"Your dog follows you around the house and to the park!"}</p>
      <div class="petRow"><div class="petPreview">${l?_n(o.coat,"sit"):Zn(o.breed,"stand")}</div>
        <div class="swatches">${(l?Oo:qo).map((y,w)=>`<button ${l?"data-coat":"data-breed"}="${w}" class="${w===(l?o.coat:o.breed)?"on":""}"><div>${l?_n(w,"sit"):Zn(w,"stand")}</div><span>${y.name}</span></button>`).join("")}</div></div>
      <div class="label">Name</div>
      <div class="nameChips">${g.map(y=>`<button ${l?"data-cname":"data-dname"}="${y}" class="${y===d?"on":""}">${y}</button>`).join("")}</div>
      <input id="petName" class="petName" maxlength="14" autocomplete="off" placeholder="…or type a name" value="${q(u)}"/>
      ${o.err?`<p class="err" id="petErr">${q(o.err)}</p>`:""}
      ${!l&&!h&&s.length>1?`<div class="label">Who does your dog follow?</div><div class="walkers">${s.map(y=>`<button data-owner="${y.id}" class="${y.id===o.owner?"on":""}">${de(y)}</button>`).join("")}</div>`:""}
      <div class="petBtns"><button class="go" data-pa="${l?"adoptCat":"adoptDog"}" id="adoptBtn">${c?"Save":"Adopt! 💛"}</button>
        ${l&&t&&Gs()?'<button data-pa="callCat" id="callCat">Here, kitty!</button>':""}
        ${!l&&n?`<button data-pa="kennelDog" id="kennelDog">${mo(Di())?"Come, puppy!":"Kennel"}</button>`:""}
        ${c?`<button class="danger" data-pa="bye">${o.bye?"Tap again to say goodbye":"Find a new home"}</button>`:""}</div>`}r()}b("btnPets").addEventListener("click",()=>n4(x==="house"?"cat":"dog"));requestAnimationFrame(Ul);window.__pets=()=>{const e=Ll(),t=e?Rn.get(e.key):void 0;return{dogs:[...Wt.keys()],dogPos:Object.fromEntries([...Wt].map(([n,s])=>[n,{x:Math.round(s.x),y:Math.round(s.y)}])),cat:E?{mood:E.dataset.mood,name:E.dataset.name,perch:Ts.perch,x:Math.round(Ts.x),leap:Ts.leap,curl:E.dataset.curl==="1"}:null,kennel:e&&t?{x:Math.round(t.x),y:Math.round(t.y),pose:t.pose,name:e.dog.name,item:e.item.id}:null,dogKennel:L.get().dogKennel??null,fetch:te?.phase??null,ball:St,view:x}};function ze(){return b("ranch").clientHeight/ss}let Me=[];const Jn=e=>String(100+Math.round(e)),Tl=220,s4=Tl*130/160,Pl=156,o4=Pl*130/160,i4=.6,a4=3.5,r4=3,oi=10,zt=new Map,Ps=new Map;function Ks(e,t,n=oi){const s=(e-we.x)/(we.rx+n),o=(t-we.y)/(we.ry+n);return s*s+o*o<1}function Uo(e,t,n,s){for(let o=0;o<=18;o++){const i=o/18;if(Ks(e+(n-e)*i,t+(s-t)*i))return!0}return!1}function Ys(e,t){return{x:Math.max(70,Math.min(ji()-70,e)),y:Math.max(en,Math.min(yt,t))}}function l4(e,t){const n=Ys(t.x,t.y);if(Ks(n.x,n.y,6))return null;if(!Uo(e.x,e.y,n.x,n.y))return[n];const s=we.x-we.rx-oi-28,o=we.x+we.rx+oi+28;let i=null,a=1/0;for(const r of[en+1,yt-2]){const l=[];let c=e.x,g=e.y;const d=(B,p)=>{const f=Ys(B,p);l.push(f),c=f.x,g=f.y};Uo(c,g,c,r)&&d(c<we.x?s:o,g),Math.abs(g-r)>3&&d(c,r),Math.abs(c-n.x)>3&&d(n.x,r),l.push(n);let u=!0,y=e.x,w=e.y,_=0;for(const B of l){if(Uo(y,w,B.x,B.y)||Ks(B.x,B.y,4)){u=!1;break}_+=Math.hypot(B.x-y,B.y-w),y=B.x,w=B.y}u&&_<a&&(i=l,a=_)}return i}function zl(e,t){const n=Je();if(!n)return;const s={x:Math.max(60,Math.min(ji()-60,e)),y:Math.max(en,Math.min(yt,t))};if(n.ride!==void 0&&n.where==="ranch"){const o=l4(n,s);if(!o){T("The horse won't splash through the pond!"),$.pop();return}Me=o}else Me=[s]}function c4(e){const t="#5a3d5c",n=(s,o,i,a)=>`<path class="${s}" d="${o}" fill="none" stroke="${t}" stroke-width="${i}" stroke-linecap="round"/><path class="${s} cloth" d="${o}" fill="none" stroke="${e}" stroke-width="${a}" stroke-linecap="round"/>`;return`<svg class="rideleg" viewBox="0 0 160 130">${n("thigh","M66 56 L102 66",13,8)}${n("shin","M102 68 L106 104",12,7.2)}<circle class="knee" cx="102" cy="67" r="6.2" fill="${e}" stroke="${t}" stroke-width="3.5"/><ellipse class="shoe" cx="116" cy="106" rx="11" ry="5.2" fill="${t}"/></svg>`}function Et(){return document.body.classList.contains("phone")&&document.body.classList.contains("phone-portrait")&&!ie}function uo(){if(!Et())return ja.map((t,n)=>n);const e=[0,2,4];for(const t of Pt("ranch")){const n=t.p.ride;n!==void 0&&e.indexOf(n)<0&&e.push(n)}return e}function It(e){if(!Et())return ja[e];const t=uo(),n=t.indexOf(e),s=t.length,o=n<0?0:n,i=qi().w/2,a=2400+i+18,r=3080-i-18;return s<=1?Math.round((a+r)/2):Math.round(a+(r-a)*o/(s-1))}function qi(){return Et()?{w:131,h:106}:{w:150,h:122}}function Xs(e,t,n){const s=ze(),{w:o,h:i}=qi();e.style.left=(t-o/2)*s+"px",e.style.top=(n-i)*s+"px",e.style.width=o*s+"px",e.style.height=i*s+"px",e.style.zIndex=Jn(n)}function g4(){if(x!=="ranch"||ie||!document.body.classList.contains("phone"))return;const e=new Set(uo());document.querySelectorAll("#ranchWorld .horse").forEach(t=>{const n=+t.dataset.horse;t.classList.toggle("stallOff",Et()&&!e.has(n)),!(!e.has(n)||zt.has(n)||t.classList.contains("away"))&&Xs(t,It(n),tn)})}function d4(e,t,n){if(zt.has(e)||Math.hypot(t-It(e),n-tn)<26)return;zt.set(e,{x:t,y:n});const s=document.querySelector(`#ranchWorld .horse[data-horse="${e}"]`);s&&(s.classList.add("trotting"),s.classList.remove("away"),s.classList.toggle("flipped",It(e)<t),Xs(s,t,n))}function p4(e,t,n){const s=n?-1:1;for(const o of[s*118,-s*118,s*160,-s*78])for(const i of[0,30,-26,48]){const a=Ys(e+o,t+i);if(!(Math.hypot(a.x-e,a.y-t)<50)&&!Ks(a.x,a.y,8))return a}return Ys(e,t)}let Ia=0,El=0;const yo=()=>h?h.now():Date.now(),ko=()=>hi(h?h.ranch.plots:V.get().garden),ls=()=>pi(h?h.players.get(h.pid)?.basket:V.get().basket),ji=()=>ie?gi:ts,Hl=()=>ie?"barn":"ranch",Al=()=>{const e=new Map;for(const t of Pt("ranch"))t.p.ride!==void 0&&e.set(t.p.ride,t);return e};function ii(e){const t={taken:"A friend just planted there!",wet:"Already watered 💧",notReady:"Still growing! 🌱",full:"Your basket is full!",slow:"The hen is laying… try again!",none:"Your basket has none left",nohouse:"Go home to put it in your room"};t[e]&&(T(t[e]),$.pop())}function bn(e){if(h){const o=zo(ko(),ls(),e,yo(),e.op==="egg"?Ia:0);return typeof o=="string"?(ii(o),!1):(e.op==="egg"&&(Ia=Date.now()),h.ranchOp(e),!0)}const t=V.get(),n=Date.now(),s=zo(hi(t.garden),pi(t.basket),e,n,t.lastEgg??0);return typeof s=="string"?(ii(s),!1):(V.dispatch({type:"ranch/op",op:e,now:n}),vo(!0),Zi(),!0)}function es(e=!1){const t=x==="ranch"&&ie&&!e;ln(),b("ranch").classList.remove("hidden"),te=null,Me=[],x="ranch",ie=e;const n=e?{where:"barn",x:170,y:560,flip:!1}:{where:"ranch",x:t?Vn:130,y:t?520:565,flip:!1};h?_e(n):Te=n,b("streetTitle").textContent=e?"The Barn":"Rainbow Ranch",gt(),Vi(),requestAnimationFrame(()=>{const s=b("ranchScroll"),o=ze();s.scrollLeft=t?Math.max(0,Vn*o-s.clientWidth/2):0,ri()}),setTimeout(ri,650),rs(b("ranch")),e?$.swish():$.sparkle()}b("btnHopOff").addEventListener("click",()=>Rl());function Vi(){const e=ze(),t=b("ranchWorld"),n=o=>o*e+"px",s=(o,i,a,r)=>`left:${n(o-a/2)};top:${n(i-r)};width:${n(a)};height:${n(r)};z-index:${Jn(i)}`;if(t.style.width=ji()*e+"px",t.style.height=ss*e+"px",t.style.setProperty("--sc",String(e)),ie){t.innerHTML=p2()+`<button class="rprop barnExit" data-r="exit" aria-label="Go outside" style="${s(127,444,206,244)}"><span class="exitHint"><span>Outside ☀️</span></span></button>`+Kt.map((o,i)=>`<button class="animal" data-animal="${i}" aria-label="${Br[i].name}" style="${s(di[i],sc+30,128,107)}">${Zo(i)}</button>`).join("")+[300,1244].map(o=>["carrot","apple","hay"].map((i,a)=>`<button class="bucket" data-feed="${i}" aria-label="${i} bucket" style="${s(o+a*56,592,54,62)}">${i2(i)}</button>`).join("")).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',Ht(),ue();return}t.innerHTML=Xv()+Jv().replace("<svg ",`<svg style="z-index:${Jn(e2)}" `)+`<button class="rprop barnDoor" data-r="barn" aria-label="Go into the barn" style="${s(Vn,472,150,150)}"><span class="doorHint"><span>Petting zoo inside! 🐐</span></span></button><button class="rprop windmill" data-r="mill" aria-label="Windmill" style="${s(1540,478,150,240)}">${c2}</button><button class="rprop henHouse" data-r="egg" aria-label="Hen house" style="${s(715,482,180,170)}">${t2}</button><button class="rprop tractor" data-r="honk" aria-label="Tractor" style="${s(900,580,170,130)}">${n2}</button><button class="rprop appleTree" data-r="apple" aria-label="Apple tree" style="${s(2085,482,240,300)}">${s2}</button>`+oc.map((o,i)=>{const a=qi();return`<button class="horse${Et()&&uo().indexOf(i)<0?" stallOff":""}" data-horse="${i}" aria-label="${Ns[i].name} horse" style="${s(It(i),tn,a.w,a.h)}">${bi(i)}</button>`}).join("")+Array.from({length:To},(o,i)=>`<button class="plot" data-plot="${i}" aria-label="Garden plot" style="${s(ac(i),594,66,86)}"></button>`).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',vo(!0),Ht(),ue()}const $s=[];function vo(e=!1){if(x!=="ranch"||ie)return;const t=ko(),n=yo();document.querySelectorAll("#ranchWorld .plot").forEach(s=>{const o=+s.dataset.plot,i=t[o]??null,a=Js(i,n),r=JSON.stringify(i)+a;!e&&$s[o]===r||($s[o]!==void 0&&$s[o]!==r&&a>0&&(s.classList.remove("grow"),s.offsetWidth,s.classList.add("grow")),$s[o]=r,s.innerHTML=Wr(i,a,o),s.dataset.stage=i?String(a):"empty")})}function Ht(){const e=document.getElementById("ravatars");if(!e||x!=="ranch")return;const t=ze(),n=new Set,s=new Set;let o=!1;for(const i of Pt(Hl())){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&wl(a));const r=JSON.stringify(i.look)+i.name;if(a.dataset.look!==r){const y=a.querySelector(".bubble");a.innerHTML=i.name?Pi(i.look,i.name):`<div class="inner">${de(i.look)}</div>`,y&&a.appendChild(y),a.dataset.look=r,a.dataset.ride=""}const l=i.p.ride,c=(sn[i.look.size]??1)*t*.95*(l!==void 0?i4:1),g=qt*c,d=lt*c;if(a.dataset.ride!==String(l??"")&&(a.querySelector(".mount")?.remove(),l!==void 0&&a.insertAdjacentHTML("afterbegin",`<div class="mount" data-mount="${l}">${bi(l,!0)}${c4(i.look.pants)}</div>`),a.dataset.ride=String(l??"")),a.classList.toggle("riding",l!==void 0),l!==void 0){s.add(l),i.mine&&(o=!0),Ps.set(l,{x:i.p.x,y:i.p.y});const y=Et()?Pl:Tl,w=Et()?o4:s4,_=y*t,B=w*t,p=a.querySelector(".mount");p.style.width=_+"px",p.style.height=B+"px",p.style.left=(g-_)/2+"px",p.style.top=d-B+"px";const f=Number(a.querySelector(".shirt")?.getAttribute("data-hem")??126),v=Number(p.querySelector(".saddle")?.getAttribute("data-top")??43),C=(f+a4/2)/160*d,S=d-B+(v-r4/2)/130*B;a.style.setProperty("--lift",C-S+"px");const D=p.querySelector(".rideleg");D&&(D.style.left="0",D.style.top="0",D.style.width="100%",D.style.height="100%")}else a.style.removeProperty("--lift");const u=parseFloat(a.dataset.lx??"NaN");Number.isFinite(u)&&Math.abs(u-i.p.x)>2&&(a.classList.add("moving"),clearTimeout(+(a.dataset.mt??0)),a.dataset.mt=String(window.setTimeout(()=>a.classList.remove("moving"),260))),a.dataset.lx=String(i.p.x),a.style.left=i.p.x*t-g/2+"px",a.style.top=i.p.y*t-d+"px",a.style.width=g+"px",a.style.height=d+"px",a.style.zIndex=Jn(i.p.y),a.classList.toggle("flipped",i.p.flip)}if(e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),document.body.classList.contains("phone")){const i=new Set(uo());document.querySelectorAll("#ranchWorld .horse").forEach(a=>{a.classList.toggle("stallOff",Et()&&!i.has(+a.dataset.horse))})}document.querySelectorAll("#ranchWorld .horse").forEach(i=>{const a=+i.dataset.horse;s.has(a)?(i.classList.add("away"),zt.delete(a)):i.classList.remove("away")});for(const[i,a]of[...Ps])s.has(i)||(d4(i,a.x,a.y),Ps.delete(i));document.body.classList.toggle("riding",o),rn()}function h4(e){const t=Je();if(!t||t.where!=="ranch")return;const n=Al().get(e);if(n&&!n.mine){T("Someone is riding!"),$.pop();return}if(t.ride!==void 0){if(n?.mine||t.ride===e){Rl();return}zl(It(e),Math.min(yt,tn+8));return}Me=[],zt.delete(e),Qe({where:"ranch",x:It(e),y:Math.min(yt,tn+8),flip:!1,ride:e}),$.neigh(),T(`You're riding ${Ns[e].name}! Tap the ground to gallop 🐴`)}function Rl(){const e=Je();if(!e||e.ride===void 0)return;const t=e.ride,{ride:n,...s}=e;Me=[];const o=p4(s.x,s.y,s.flip);Ps.set(t,{x:s.x,y:s.y}),Qe({...s,x:o.x,y:o.y}),$.drop()}function Fi(e,t){const n=e<Kt.length?document.querySelector(`#ranchWorld .animal[data-animal="${e}"]`):document.querySelector(`#ranchWorld .horse[data-horse="${e-Kt.length}"]:not(.away)`)??document.querySelector(`#ravatars .mount[data-mount="${e-Kt.length}"]`);if(!n||x!=="ranch")return;const s=e>=Kt.length,o=s?{say:"Neigh! ♥",snd:"neigh"}:Br[e];n.classList.remove("hop","munch"),n.offsetWidth,n.classList.add(t?"munch":"hop"),setTimeout(()=>n.classList.remove("hop","munch"),1400),n.querySelector(".abubble")?.remove();const i=document.createElement("div");i.className="bubble petBubble abubble",i.textContent=t?`Yum! Munch munch ${t===1?"🥕":t===2?"🍎":"🌾"}`:o.say,n.appendChild(i),Wn(),setTimeout(()=>i.classList.add("out"),1400),setTimeout(()=>i.remove(),1800);for(let a=0;a<(t?6:4);a++){const r=document.createElement("div");r.className="heart",r.textContent="♥",r.style.left=15+Math.random()*70+"%",r.style.animationDelay=a*.12+"s",r.style.color=["#ff6b9a","#ff8fab","#e879c6","#b197fc"][a%4],n.appendChild(r),setTimeout(()=>r.remove(),1900)}$[o.snd]?.(),t&&setTimeout(()=>$.munch(),250)}function Dl(){const e=document.querySelector("#ranchWorld .henHouse");e&&(e.classList.remove("lay"),e.offsetWidth,e.classList.add("lay"),$.cluck())}function f4(){const e=document.querySelector("#ranchWorld .henHouse"),t=b("basketChip");if(!e)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=document.createElement("div");o.className="flyEgg",o.innerHTML=Qn,document.body.appendChild(o),Object.assign(o.style,{left:n.left+n.width/2-18+"px",top:n.top+n.height*.6+"px"}),requestAnimationFrame(()=>{o.style.left=s.left+s.width/2-18+"px",o.style.top=s.top+"px",o.style.transform="scale(.6) rotate(200deg)"}),setTimeout(()=>{o.remove(),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")},650)}function Il(e){const t=document.getElementById("rfx");if(!t||x!=="ranch")return;const n=ze(),[s,o]=ua[e]??ua[0],i=1965+s,a=182+o,r=i+(e%2?26:-22),l=575+e*4,c=document.createElement("button");c.className="fallenApple",c.dataset.feed="apple",c.setAttribute("aria-label","Apple"),c.innerHTML=Cr;const g=32*n;Object.assign(c.style,{width:g+"px",height:g+"px",left:i*n-g/2+"px",top:a*n-g/2+"px",zIndex:Jn(l)}),t.appendChild(c),requestAnimationFrame(()=>{c.style.left=r*n-g/2+"px",c.style.top=l*n-g+"px",c.classList.add("fallen")});const d=document.querySelector("#ranchWorld .appleTree");d?.classList.remove("shake"),d?.offsetWidth,d?.classList.add("shake"),$.boing(),setTimeout(()=>c.remove(),12e3)}function Nl(){const e=document.querySelector("#ranchWorld .tractor");e?.classList.remove("bounce"),e?.offsetWidth,e?.classList.add("bounce"),$.honk()}function m4(e){e.k==="zoo"?Fi(e.a,e.f):e.k==="apple"?Il(e.v):e.k==="honk"?Nl():e.k==="hen"&&Dl()}function Na(e,t){const n=document.elementFromPoint(e,t);if(!n)return null;const s=n.closest("[data-animal]");if(s)return+s.dataset.animal;const o=n.closest(".horse:not(.away)");if(o)return Kt.length+ +o.dataset.horse;const i=n.closest(".savatar.riding");return i?.dataset.ride?Kt.length+ +i.dataset.ride:null}function ai(e,t,n){e.preventDefault(),e.stopPropagation();const s=document.createElement("div");s.className="feedGhost",s.innerHTML=Sr[t],document.body.appendChild(s);const o=w=>{s.style.left=w.clientX-30+"px",s.style.top=w.clientY-50+"px"};o(e),$.pick();let i=0;const a=e.clientX,r=e.clientY;n instanceof HTMLElement&&(n.style.visibility="hidden");let l=e.clientX,c=0;const g=b("ranchScroll"),d=()=>{const w=g.getBoundingClientRect(),_=l<w.left+60?-12:l>w.right-60?12:0;_&&i>12&&x==="ranch"&&(g.scrollLeft+=_),c=requestAnimationFrame(d)};c=requestAnimationFrame(d);const u=w=>{if(w.pointerId!==e.pointerId)return;l=w.clientX,i=Math.max(i,Math.hypot(w.clientX-a,w.clientY-r)),o(w),document.querySelectorAll(".feedHover").forEach(B=>B.classList.remove("feedHover")),Na(w.clientX,w.clientY)!==null&&document.elementFromPoint(w.clientX,w.clientY)?.closest(".animal, .horse, .savatar")?.classList.add("feedHover")},y=w=>{if(w.pointerId!==e.pointerId)return;cancelAnimationFrame(c),window.removeEventListener("pointermove",u),window.removeEventListener("pointerup",y),s.remove(),El=Date.now(),document.querySelectorAll(".feedHover").forEach(p=>p.classList.remove("feedHover"));const _=Na(w.clientX,w.clientY);if(_===null){n instanceof HTMLElement&&(n.style.visibility=""),i<12?T("Drag the food onto an animal! 🥕"):$.drop();return}if(n==="basket"&&!bn({op:"use",kind:"carrot"}))return;n instanceof HTMLElement&&n.remove();const B=ic.indexOf(t);Fi(_,B),h?.fx({k:"zoo",a:_,f:B})};window.addEventListener("pointermove",u),window.addEventListener("pointerup",y)}b("ranchWorld").addEventListener("pointerdown",e=>{const t=e.target,n=t.closest(".bucket");if(n)return ai(e,n.dataset.feed,"bucket");const s=t.closest(".fallenApple");if(s)return ai(e,"apple",s);t.closest(".rprop, .animal, .horse, .plot, .pet")&&e.stopPropagation()});b("ranchWorld").addEventListener("click",e=>{const t=e.target;if(!Je()||x!=="ranch"||Date.now()-El<400)return;const s=t.closest("[data-animal]");if(s){const d=+s.dataset.animal;Fi(d,0),h?.fx({k:"zoo",a:d,f:0});return}const o=t.closest("[data-horse]");if(o){h4(+o.dataset.horse);return}const i=t.closest("[data-r]")?.dataset.r;if(i==="egg"){Dl(),bn({op:"egg"})&&(f4(),$.pickup());return}if(i==="honk"){Nl(),h?.fx({k:"honk"});return}if(i==="apple"){const d=Math.floor(Math.random()*4);Il(d),h?.fx({k:"apple",v:d});return}if(i==="barn"){es(!0);return}if(i==="exit"){es(!1);return}if(i==="mill"){const d=t.closest(".windmill");d?.classList.remove("whirl"),d?.offsetWidth,d?.classList.add("whirl"),$.swish();return}const a=t.closest("[data-plot]");if(a){u4(+a.dataset.plot,a);return}if(t.closest(".bucket, .fallenApple, .savatar, .pet"))return;const r=b("ranchWorld").getBoundingClientRect(),l=ze(),c=(e.clientX-r.left)/l,g=(e.clientY-r.top)/l;g<400||zl(c,g)});function u4(e,t){const n=ko()[e]??null,s=Js(n,yo());if(document.querySelector(".seedPick")?.remove(),!n){const o=document.createElement("div");o.className="seedPick",o.innerHTML=`<button data-seed="carrot">${ro}<span>Carrot</span></button><button data-seed="flower">${wi()}<span>Flower</span></button>`,t.parentElement.appendChild(o),o.style.left=t.offsetLeft+t.offsetWidth/2+"px",o.style.top=t.offsetTop-8+"px",o.addEventListener("pointerdown",i=>i.stopPropagation()),o.addEventListener("click",i=>{i.stopPropagation();const a=i.target.closest("[data-seed]")?.dataset.seed;o.remove(),a&&bn({op:"plant",i:e,seed:a})&&($.plant(),T("Planted! Now tap it to water 💧"))}),setTimeout(()=>o.remove(),6e3);return}if(!n.wet){bn({op:"water",i:e})&&($.water(),t.classList.remove("watering"),t.offsetWidth,t.classList.add("watering"));return}if(s<3){T("Still growing! 🌱"),$.pop();return}bn({op:"pick",i:e})&&($.pickup(),T(n.seed==="carrot"?"A carrot for your basket! 🥕":"Pretty flowers for your basket! 🌸"))}let Oa=0;function y4(e,t){if(x!=="ranch")return;const n=Date.now();if(document.querySelectorAll("#ranchWorld .animal").forEach(s=>{const o=+s.dataset.animal,i=ze(),a=n/5200+o*1.7,r=(ie?di:nc)[o]+Math.sin(a)*32;s.style.left=(r-s.offsetWidth/i/2)*i+"px",s.classList.toggle("flipped",Math.cos(a)<0),s.classList.toggle("walking",Math.abs(Math.cos(a))>.35)}),e-Oa>1e3&&(Oa=e,vo()),Me.length){const s=Je();if(!s||s.where!==Hl())Me=[];else{const o=Me[0],i=s.ride!==void 0?720:300,a=o.x-s.x,r=o.y-s.y,l=Math.hypot(a,r);if(l<6)Me.shift();else{const c=Math.min(l,i*t),g={...s,x:s.x+a/l*c,y:s.y+r/l*c,flip:Math.abs(a)>2?a<0:s.flip};Qe(g);const d=ze(),u=b("ranchScroll"),y=g.x*d-u.scrollLeft;y>-40&&y<u.clientWidth+40&&(y<u.clientWidth*.2||y>u.clientWidth*.8)&&(u.scrollLeft=g.x*d-u.clientWidth/2)}}}for(const[s,o]of zt){const i=document.querySelector(`#ranchWorld .horse[data-horse="${s}"]`);if(!i||i.classList.contains("away")){zt.delete(s);continue}const a=It(s)-o.x,r=tn-o.y,l=Math.hypot(a,r);if(l<8){zt.delete(s),i.classList.remove("trotting","flipped"),Xs(i,It(s),tn);continue}const c=Math.min(l,460*t);o.x+=a/l*c,o.y+=r/l*c,i.classList.add("trotting"),i.classList.toggle("flipped",a<0),Xs(i,o.x,o.y)}}function Zi(){const e=document.getElementById("basketChip");if(!e)return;const t=x==="ranch"||x==="house"&&(!h||Pe===V||le===h.myHouseId()),n=ls(),s=n.egg+n.carrot+n.flower>0;e.classList.toggle("hidden",!t||x==="house"&&!s),e.classList.toggle("inHouse",x==="house"),t&&(e.innerHTML=`<span class="bIcon">${a2}</span><span class="bcount" data-kind="egg">${Qn}<b>${n.egg}</b></span><span class="bcount" data-kind="carrot">${ro}<b>${n.carrot}</b></span><span class="bcount" data-kind="flower">${wi()}<b>${n.flower}</b></span>`)}b("basketChip").addEventListener("pointerdown",e=>{e.target.closest('.bcount[data-kind="carrot"]')&&x==="ranch"&&ls().carrot>0&&ai(e,"carrot","basket")});b("basketChip").addEventListener("click",()=>k4());function k4(){const e=x==="house"&&(!h||Pe===V||le===h.myHouseId()),t={egg:["Eggs",Qn],carrot:["Carrots",ro],flower:["Flowers",wi()]},n=qe("",(o,i)=>{const a=o.closest("[data-take]")?.dataset.take;if(!a)return;if(!e){T("Take it home to put it in your room! 🏠");return}const r="r"+Math.random().toString(36).slice(2,10),l=Math.max(120,Math.min(ae-120,j+se/2+(Math.random()-.5)*300));bn({op:"take",kind:a,id:r,room:L.get().currentRoom,x:l})&&($.drop(),i(),T("It's in your room! Drag it to a hand to carry it ✋"))},"basketSheet"),s=ls();n.root.querySelector(".card").innerHTML=`${je}<h2>My Basket</h2><p class="hint small">${e?"Tap one to put it in your room.":"Collect eggs, carrots and flowers at Rainbow Ranch, then take them home!"}</p>
    <div class="basketRows">${Va.map(o=>`<button class="bRow" data-take="${o}" ${s[o]?"":"disabled"}>${t[o][1]}<b>${s[o]}</b><span>${t[o][0]}</span></button>`).join("")}</div>`}window.__ranch=()=>({view:x,inBarn:ie,plots:ko().map(e=>e?{seed:e.seed,stage:Js(e,yo()),wet:!!e.wet}:null),basket:ls(),me:Je(),ridden:[...Al().keys()]});function v4(){if(Hn.kind==="none")return;W2(),qe(U2(Hn.kind,Hn.entries),(t,n)=>{t.closest("#wnGo")&&($.sparkle(),n())},"whatsNew "+Hn.kind).root.querySelector(".card").insertAdjacentHTML("afterbegin",je)}setTimeout(v4,500);window.__whatsnew=Hn;window.__hood=()=>h;window.__hood_url=()=>so();window.__ui=()=>({view:x,currentHouseId:le,mode:h?"hood":"solo",play:Ve.mode()});Z2({hood:()=>h,view:()=>x,solo:()=>Te,myPres:oe,setPres:Qe,toast:T,refreshNear:rn,sfx:$,goMap:vn,soloLook:()=>{const e=V.get();return{look:ns(e.characters[0]??{}),dog:e.dog??null}}});jv();$n();Xe();Cn();requestAnimationFrame(Cn);const Ol=()=>{const e=io().size,t=Ds.length,n=b("secrets");n.innerHTML=`<span class="secGift">🎁</span><span class="secWord"> Surprises: </span><span class="secCount">${e}/${t}</span>`,n.setAttribute("aria-label",`Surprises, ${e} of ${t}`),Kr()};function ri(){if(x!=="ranch"||ie)return;const e=b("ranchScroll"),t=document.querySelector(".doorHint");if(!t||!e.clientWidth)return;const n=ze(),s=14,o=e.clientWidth,i=t.offsetWidth,a=Math.max(0,Vn*n+i/2+s-o);if(e.scrollLeft<a){const r=Je(),l=r&&r.where==="ranch"?Math.max(0,r.x*n-60*n-s):a;e.scrollLeft=Math.min(a,l)}ue(),ql()}function ql(){const e=document.querySelector(".doorHint"),t=document.getElementById("ranchScroll");if(!e||!t)return;const n=ze(),s=Vn*n-t.scrollLeft,o=e.offsetWidth,i=12,a=s+o/2,r=s-o/2;let l=0;a>innerWidth-i&&(l-=a-(innerWidth-i)),r+l<i&&(l+=i-(r+l)),e.style.transform=`translateX(calc(-50% + ${l}px))`}const jl=Gg({world:Zr,roomW:ae,roomH:De,currentRoom:()=>L.get().currentRoom,sparkle:()=>$.sparkle(),tap:()=>$.click(),onFound:(e,t)=>{if(Ol(),t){const n=b("secrets");n.classList.remove("pulse"),n.offsetWidth,n.classList.add("pulse"),setTimeout(()=>T("🎁 A secret surprise appeared in your drawer!"),1400),Xe()}}});L.subscribe((e,t)=>{(t.type==="room/switch"||t.type==="game/reset")&&jl.update()});Ol();window.__eggs=()=>({found:[...io()]});Wb();
