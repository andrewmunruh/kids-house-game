(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const Pd="modulepreload",Ud=function(e){return"/kids-house-game/"+e},yr={},_a=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(n.map(l=>{if(l=Ud(l),l in yr)return;yr[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":Pd,c||(g.as="script"),g.crossOrigin="",g.href=l,r&&g.setAttribute("nonce",r),document.head.appendChild(g),c)return new Promise((p,m)=>{g.addEventListener("load",p),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return o.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})},_o="#5a3d5c",I=(e=4)=>`stroke="${_o}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,xi=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],Re=1e3,yt=700,Mi="M 30 660 C 150 640, 200 540, 330 545 S 540 650, 690 600 S 925 470, 850 375 S 640 330, 520 355 S 270 385, 250 285 S 330 145, 480 150 S 700 200, 790 150",Dt={x:115,y:170},gt={x:880,y:120},qt={x:600,y:480},Ot={x:400,y:260},xl=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${I(3)}/><circle cx="0" cy="-10" r="20" fill="${s}" ${I(3)}/><circle cx="-12" cy="-2" r="12" fill="${s}" ${I(3)}/><circle cx="12" cy="-3" r="13" fill="${s}" ${I(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`,Un=(e,t,n)=>`<g transform="translate(${e} ${t})">${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*4}" cy="${Math.sin(s*Math.PI/180)*4}" r="3.6" fill="${n}"/>`).join("")}<circle r="2.6" fill="#ffd43b"/></g>`;function Hd(){return`<svg class="mapBg" viewBox="0 0 ${Re} ${yt}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${Re}" height="${yt}" rx="34" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="160" cy="420" rx="150" ry="90"/><ellipse cx="760" cy="250" rx="170" ry="70"/><ellipse cx="480" cy="640" rx="140" ry="50"/><ellipse cx="930" cy="600" rx="90" ry="110"/></g>
  <g fill="#93d78e" opacity=".7"><ellipse cx="420" cy="260" rx="70" ry="30"/><ellipse cx="80" cy="560" rx="60" ry="26"/><ellipse cx="700" cy="420" rx="50" ry="22"/></g>
  <!-- pond -->
  <ellipse cx="120" cy="470" rx="72" ry="40" fill="#8ecae6" ${I()}/><ellipse cx="108" cy="462" rx="42" ry="16" fill="#bde6f7"/><path d="M150 480 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <!-- side paths to the park and the ranch -->
  <path d="M250 285 Q190 250 150 215" fill="none" stroke="${_o}" stroke-width="30" stroke-linecap="round"/><path d="M250 285 Q190 250 150 215" fill="none" stroke="#f2dcb8" stroke-width="22" stroke-linecap="round"/>
  <!-- the street -->
  <path d="${Mi}" fill="none" stroke="${_o}" stroke-width="58" stroke-linecap="round"/>
  <path id="mapRoad" d="${Mi}" fill="none" stroke="#f2dcb8" stroke-width="48" stroke-linecap="round"/>
  <path d="${Mi}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 16" stroke-linecap="round" opacity=".9"/>
  <!-- town square -->
  <g transform="translate(${qt.x} ${qt.y})"><circle r="74" fill="#f7e6c8" ${I()}/><circle r="74" fill="none" stroke="#e6cfa6" stroke-width="10" stroke-dasharray="10 12" transform="scale(.82)"/>
    <circle r="30" fill="#bde6f7" ${I()}/><circle r="13" fill="#fff6e6" ${I(3)}/><path d="M0 -13 Q-8 -32 -16 -20 M0 -13 Q8 -32 16 -20 M0 -13 V-34" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>
    ${Un(-52,-40,"#ff8fab")}${Un(54,-38,"#b197fc")}${Un(-56,40,"#ffd43b")}${Un(52,44,"#ff8fab")}</g>
  ${[[60,330,"#ff8fab"],[300,470,"#b197fc"],[430,560,"#ffd43b"],[760,520,"#ff8fab"],[950,260,"#b197fc"],[600,260,"#ffd43b"],[380,90,"#ff8fab"],[40,120,"#b197fc"],[960,420,"#ffd43b"],[840,640,"#b197fc"],[210,620,"#ff8fab"]].map(([e,t,n])=>Un(+e,+t,String(n))+Un(+e+14,+t+8,String(n))).join("")}
  </svg>`}function Qd(e,t){const n=[];let s=7;const o=()=>(s=(s*9301+49297)%233280)/233280;for(let i=0;i<260&&n.length<34;i++){const a=30+o()*(Re-60),r=40+o()*(yt-70);t(a,r)||e.some(l=>Math.hypot(l.x-a,l.y-r)<l.r)||(e.push({x:a,y:r,r:46}),n.push(xl(a,r,.75+o()*.45,["#5cc985","#4fbf7a","#78d39a"][i%3])))}return`<svg class="mapTrees" viewBox="0 0 ${Re} ${yt}" xmlns="http://www.w3.org/2000/svg">${n.join("")}</svg>`}const Ed=`<svg viewBox="0 0 200 170"><ellipse cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${I()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${I(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${I(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${I(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${I(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${I(2.5)}/>
  ${xl(40,66,1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${I(3)}/><path d="M178 88 V132" ${I(4)}/>
</svg>`,zd=`<svg viewBox="0 0 220 180"><ellipse cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${I()}/>
  ${xi.map((e,t)=>`<path d="M${20+t*7} 120 A${90-t*7} ${84-t*7} 0 0 1 ${200-t*7} 120" fill="none" stroke="${e}" stroke-width="7"/>`).join("")}
  <path d="M60 140 V82 L80 58 H140 L160 82 V140 Z" fill="#ef5b5b" ${I(4)}/>
  <path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${_o}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  ${xi.map((e,t)=>`<path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${e}" stroke-width="1.3" transform="translate(0 ${-3+t*1.2})"/>`).join("")}
  <rect x="88" y="100" width="44" height="40" rx="3" fill="#d94848" ${I(3)}/><path d="M88 100 L132 140 M132 100 L88 140" stroke="#fff6e6" stroke-width="3"/>
  <rect x="94" y="70" width="32" height="18" rx="4" fill="#fff6e6" ${I(3)}/>
  <path d="M10 150 H52 M168 150 H212 M14 140 V158 M30 140 V158 M46 140 V158 M174 140 V158 M190 140 V158 M206 140 V158" stroke="#fff6e6" stroke-width="5" stroke-linecap="round"/><path d="M10 150 H52 M168 150 H212" ${I(1.5)}/>
  <g transform="translate(178 122) scale(.42)"><ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" ${I(5)}/><path d="M24 -8 L40 -34 L54 -26 L36 2 Z" fill="#fff" ${I(5)}/>${xi.slice(0,4).map((e,t)=>`<path d="M38 ${-34+t*5} q-14 4 -20 14" fill="none" stroke="${e}" stroke-width="5" stroke-linecap="round"/>`).join("")}<path d="M-20 14 V34 M20 14 V34" ${I(6)}/></g>
</svg>`,Rd=`<svg viewBox="0 0 190 156">
  <ellipse cx="95" cy="118" rx="88" ry="32" fill="#ffd0e6" ${I()}/>
  <path d="M28 108 V62 L95 28 L162 62 V108 Z" fill="#fff0f6" ${I(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="#ff6b9a" ${I(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="none" stroke="#ffd43b" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="78" y="78" width="34" height="30" rx="4" fill="#ff8ec8" ${I(3)}/>
  <path d="M95 86 C90 80 82 82 86 90 C90 96 95 100 95 100 C95 100 100 96 104 90 C108 82 100 80 95 86 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  <rect x="42" y="74" width="22" height="16" rx="3" fill="#66d9e8" ${I(2)}/><rect x="126" y="74" width="22" height="16" rx="3" fill="#d0bfff" ${I(2)}/>
  ${[36,52,68,84,100,116,132,148].map((e,t)=>`<circle cx="${e}" cy="58" r="3.2" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" ${I(1.4)}/>`).join("")}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`,xa=`<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${I(3)}/><path d="M17 8 V35 M31 13 V40" ${I(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${I(2)}/></svg>`,Ma=e=>e.indexOf("data-chibi")>=0?e.replace('viewBox="0 0 200 320"','viewBox="24 0 152 168"'):e.replace('viewBox="0 0 100 160"','viewBox="14 2 72 74"'),Ad={},wt=e=>(Ad?.VITE_STORE_PREFIX??"")+e,Dd=400,Fo=["#ffe0c4","#f6d2b5","#f1c27d","#e0ac69","#c9956c","#c68642","#a86b3c","#8d5524","#5c3a1e","#3d2914"],Vo=["#2b1d16","#5b3a29","#a0522d","#f4d58d","#ff8fab","#8ecae6","#b388d6","#ff9f43","#1d1416","#c8602a","#7a4b32","#f7f1e8"],La=["#5a321c","#3f9b52","#3d7ec4","#c48a3a","#7b4fb8"],Ae=["#ff7aa8","#ffd166","#5aa9e6","#80ed99","#c9a0dc","#ff9f68","#ffffff","#5a3d5c","#ff8f7a","#7ec8c3","#f7f3ee","#f4a3c8","#6b8e4e","#e8d5b5","#ef6b6b","#3d4a6b"],Go=["short","bob","buns","topbun","pixie","long","wavy","puffs","afro","curlybob","coily","boxbraids","braids","sidebraid","crown","pony","sidepony","pigtails","lowbun","locs","halfup","bangs","sidebangs","wavybob"],Ko=["classic","stripes","hoodie","sweater","tank","puff","ruffle","button","jersey","cardigan","bib","raincoat"],Yo=["pants","jeans","shorts","skirt","tutu","leggings","overalls","joggers"],Xo=["","twirl","sundress","party","pinafore","jumper","ballet","nightgown","raindress"],Jo=["classic","sneakers","lightup","boots","rainboots","sandals","maryjanes","slippers"],ei=["round","big","sleepy","sparkle","soft","bright"],In=["glasses","square","sunnies","bow","bigbow","headband","flower","cap","beanie","sunhat","catears","earmuffs"],Od=new Set(Go),Id=new Set(Ko),qd=new Set(Yo),Nd=new Set(Xo),jd=new Set(Jo),Zd=new Set(ei),Fd=new Set(In),Vd=new Set(["short","pixie","coily","afro","bangs"]),Gd=new Set(["buns","puffs"]),Kd=new Set(["topbun","lowbun"]),Yd={hair:"buns",hairC:"#5b3a29",skin:"#f1c27d",eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"pants",bottomC:"#5aa9e6",dress:"",dressC:"#ff7aa8",shoes:"classic",shoesC:"#5a3d5c",accC:"#ffd166"};function Xd(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Hn(e,t){return typeof e=="string"&&t.has(e)}function xt(e,t){if(typeof e!="string")return null;const n=e.trim().toLowerCase();for(let s=0;s<t.length;s++)if(t[s]===n)return t[s];return null}function As(e){if(!Xd(e))return null;let t=0;try{t=JSON.stringify(e).length}catch{return null}if(t>Dd)return null;const n={v:1};Hn(e.hair,Od)&&(n.hair=e.hair);const s=xt(e.hairC,Vo);s&&(n.hairC=s);const o=xt(e.skin,Fo);o&&(n.skin=o),Hn(e.eyes,Zd)&&(n.eyes=e.eyes);const i=xt(e.eyeC,La);i&&(n.eyeC=i),(e.freckles===!0||e.freckles===!1)&&(n.freckles=e.freckles),(e.blush===!0||e.blush===!1)&&(n.blush=e.blush),Hn(e.top,Id)&&(n.top=e.top);const a=xt(e.topC,Ae);a&&(n.topC=a),Hn(e.bottom,qd)&&(n.bottom=e.bottom);const r=xt(e.bottomC,Ae);r&&(n.bottomC=r),Hn(e.dress,Nd)&&(n.dress=e.dress);const l=xt(e.dressC,Ae);l&&(n.dressC=l),Hn(e.shoes,jd)&&(n.shoes=e.shoes);const c=xt(e.shoesC,Ae);if(c&&(n.shoesC=c),Array.isArray(e.acc)){const g=[];for(let p=0;p<e.acc.length&&g.length<2;p++){const m=e.acc[p];typeof m=="string"&&Fd.has(m)&&g.indexOf(m)<0&&g.push(m)}n.acc=g}const d=xt(e.accC,Ae);return d&&(n.accC=d),n}function Jn(e){const t=Yd,n=e??{};return{v:1,hair:n.hair??t.hair,hairC:n.hairC??t.hairC,skin:n.skin??t.skin,eyes:n.eyes??t.eyes,eyeC:n.eyeC??t.eyeC,freckles:n.freckles??t.freckles,blush:n.blush??t.blush,top:n.top??t.top,topC:n.topC??t.topC,bottom:n.bottom??t.bottom,bottomC:n.bottomC??t.bottomC,dress:n.dress??t.dress,dressC:n.dressC??t.dressC,shoes:n.shoes??t.shoes,shoesC:n.shoesC??t.shoesC,acc:n.acc?n.acc.slice():[],accC:n.accC??t.accC}}function kr(e){const t=/^#([0-9a-f]{6})$/i.exec(e.trim());if(!t){const s=/^#([0-9a-f]{3})$/i.exec(e.trim());return s?[parseInt(s[1][0]+s[1][0],16),parseInt(s[1][1]+s[1][1],16),parseInt(s[1][2]+s[1][2],16)]:null}const n=parseInt(t[1],16);return[n>>16&255,n>>8&255,n&255]}function Ks(e,t){const n=xt(e,t);if(n)return n;const s=kr(e);if(!s)return t[0];let o=t[0],i=1e12;for(let a=0;a<t.length;a++){const r=kr(t[a]);if(!r)continue;const l=(s[0]-r[0])*(s[0]-r[0])+(s[1]-r[1])*(s[1]-r[1])+(s[2]-r[2])*(s[2]-r[2]);l<i&&(i=l,o=t[a])}return o}function Jd(e){return Vd.has(e)?0:Gd.has(e)?2:Kd.has(e)?3:1}function eg(e){for(let t=0;t<e.length;t++){const n=e[t];if(n==="glasses"||n==="square"||n==="sunnies")return 2}for(let t=0;t<e.length;t++){const n=e[t];if(n==="cap"||n==="beanie"||n==="sunhat")return 3}for(let t=0;t<e.length;t++){const n=e[t];if(n==="bow"||n==="bigbow")return 1}return 0}function ti(e){const t=Jn(e),n=t.dress!=="";return{skin:t.skin,hair:t.hairC,hairStyle:Jd(t.hair),shirt:n?t.dressC:t.topC,pants:n?t.dressC:t.bottomC,acc:eg(t.acc)}}const tg=["short","bob","buns","topbun"];function xo(e){const t=typeof e.hairStyle=="number"&&e.hairStyle>=0&&e.hairStyle<=3?Math.round(e.hairStyle):0,n=e.acc===1?["bow"]:e.acc===2?["glasses"]:e.acc===3?["cap"]:[],s=Ks(String(e.shirt??""),Ae);return{v:1,hair:tg[t],hairC:Ks(String(e.hair??""),Vo),skin:Ks(String(e.skin??""),Fo),eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:s,bottom:"pants",bottomC:Ks(String(e.pants??""),Ae),dress:"",dressC:s,shoes:"classic",shoesC:"#5a3d5c",acc:n,accC:"#ffd166"}}function Mo(e){const t=As(e)??{},n=Jn(t);return{...ti(n),look2:n}}const ng=new Set(["glasses","square","sunnies"]),sg=new Set(["bow","bigbow","flower","headband"]),og=new Set(["cap","beanie","sunhat","catears","earmuffs"]);function Lo(e){return ng.has(e)?"face":sg.has(e)?"bow":og.has(e)?"hat":"other"}function fe(e,t){return t[Math.floor(e()*t.length)]}function ni(e=Math.random){const t=e()<.38,n=e();let s=[];if(n<.22)s=[];else if(n<.68)s=[fe(e,In)];else{const o=fe(e,In),i=In.filter(a=>Lo(a)!==Lo(o));s=[o,fe(e,i)]}return{v:1,hair:fe(e,Go),hairC:fe(e,Vo),skin:fe(e,Fo),eyes:fe(e,ei),eyeC:fe(e,La),freckles:e()<.4,blush:e()<.85,top:fe(e,Ko),topC:fe(e,Ae),bottom:fe(e,Yo),bottomC:fe(e,Ae),dress:t?fe(e,Xo.filter(o=>o!=="")):"",dressC:fe(e,Ae),shoes:fe(e,Jo),shoesC:fe(e,Ae),acc:s,accC:fe(e,Ae)}}function ig(e,t=Math.random){const n=e.characters[0];if(!n)return e;const s=ni(t),o=ti(s),i=e.characters.slice();return i[0]={...n,...o,look2:s},{...e,characters:i}}function ag(e){return[e.skin,e.hair,e.hairStyle,e.shirt,e.pants,e.acc,e.look2?JSON.stringify(e.look2):""].join("|")}const Ds=3600,_n=470,Pt=590,mn=["goat","sheep","piglet","chicks","bunny","cow"],rg=[1085,1215,1345,1470,1600,1735],lg=520,Ca=1900,Ba=[600,800,1e3,1200,1400,1600],Ss=435,cg=["Chestnut","Snowy","Midnight","Sunny","Rainbow"],Ml=[2470,2600,2730,2860,2990],xn=540,dg=["pet","carrot","apple","hay"],Oi=6,gg=e=>3175+e*68,fg=8e4,Ii=20,hg=1500,Ll=["egg","carrot","flower"],pg={egg:"ranch-egg",carrot:"ranch-carrot",flower:"ranch-bouquet"},ug=()=>({egg:0,carrot:0,flower:0}),mg=(e,t,n)=>Number.isInteger(e)&&e>=t&&e<=n?e:null;function Sa(e){const t=ug();if(!e||typeof e!="object")return t;for(const n of Ll)t[n]=mg(e[n],0,Ii)??0;return t}function Wa(e){const t=Array(Oi).fill(null);if(Array.isArray(e))for(let n=0;n<Oi;n++){const s=e[n];if(!s||s.seed!=="carrot"&&s.seed!=="flower")continue;const o=Number(s.at),i=Number(s.wet);Number.isFinite(o)&&Number.isFinite(i)&&(t[n]={seed:s.seed,at:o,wet:i})}return t}function si(e,t){if(!e||!e.wet)return 0;const n=(t-e.wet)/fg;return n>=1?3:n>=.4?2:1}function qi(e,t,n,s,o=0){const i=e.slice(),a={...t};switch(n.op){case"plant":return i[n.i]?"taken":(i[n.i]={seed:n.seed,at:s,wet:0},{plots:i,basket:a,garden:!0});case"water":{const r=i[n.i];return r?r.wet?"wet":(i[n.i]={...r,wet:s},{plots:i,basket:a,garden:!0}):"empty"}case"pick":{const r=i[n.i];return r?si(r,s)<3?"notReady":a[r.seed]>=Ii?"full":(a[r.seed]++,i[n.i]=null,{plots:i,basket:a,garden:!0,got:r.seed}):"empty"}case"egg":return s-o<hg?"slow":a.egg>=Ii?"full":(a.egg++,{plots:i,basket:a,garden:!1,got:"egg"});case"use":return a.carrot<=0?"none":(a.carrot--,{plots:i,basket:a,garden:!1});case"take":return a[n.kind]<=0?"none":(a[n.kind]--,{plots:i,basket:a,garden:!1})}}const Nt=80,yg=30*24*60*60*1e3,kg=5,Cl=6,Qt=["#ffd6e8","#fff3b0","#d8f5e8","#e6d6ff","#d6efff"],vg=/^m[A-Za-z0-9]{4,40}$/,bg=/^[A-Za-z0-9:_\/.-]{1,80}$/;function Li(e,t=Date.now()){const n=Math.floor((t-e)/864e5);return n<=0?"today":n===1?"yesterday":n<7?"a few days ago":"a while ago"}function wg(e,t=Date.now()){const n=e?.letters;if(!Array.isArray(n))return null;const s=[];for(const i of n.slice(-30*2)){if(!i||typeof i!="object")continue;const a=i;if(typeof a.id!="string"||!vg.test(a.id)||typeof a.from!="string")continue;const r=a.from.normalize("NFC").replace(/\s+/g," ").trim();if(!r||r.length>24||typeof a.fromPid!="string"||!bg.test(a.fromPid)||typeof a.text!="string"||a.text.length>Nt||typeof a.at!="number"||!Number.isFinite(a.at)||t-a.at>yg||a.at>t+864e5||!Number.isInteger(a.color)||a.color<0||a.color>=kg||!Number.isInteger(a.sticker)||a.sticker<0||a.sticker>=Cl)continue;const l=a.text.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(l.length>Nt)continue;const c={id:a.id,from:r,fromPid:a.fromPid,text:l,color:a.color,sticker:a.sticker,at:a.at};a.read===!0&&(c.read=!0),s.push(c)}const o=s.slice(-30);return o.length?{letters:o}:null}function $g(e){return e?.letters.filter(t=>!t.read&&t.text).length??0}const Co=["living","bedroom","kitchen","salon","nursery","backyard"],Bl=["living","bedroom","kitchen","salon","nursery"],jt=2400,ws=600,Sl=1e3,es=(jt-Sl)/2,ts=8,_g=/^[A-Za-z0-9:_\/.-]{1,80}$/;function Ta(e){const t=e?.dogKennel;if(!t||typeof t!="object"||typeof t.item!="string"||!_g.test(t.item))return null;const n=e.rooms;if(!n)return null;for(const s of Object.values(n))if(s?.items?.some(o=>o&&o.id===t.item&&o.kind==="kennel"))return{item:t.item};return null}function xg(e,t){return Ta({dogKennel:{item:t},rooms:e.rooms})!==null}const U=(e,t,n,s,o=1)=>({id:e+"-"+s,kind:e,x:t+es,y:n,flip:!1,z:s,scale:o});function Vt(){return{version:3,houseId:"local",currentRoom:"living",rooms:{living:{wallpaper:"#ffd6e0",floor:"#e8b98a",pattern:1,items:[U("sofa",470,470,1),U("lamp",230,470,2),U("plant",760,480,3),U("rug",480,530,0),U("picture",470,200,4),U("cat",600,520,5),U("window",-350,230,6),U("armchair",-300,480,7),U("bookshelf",1250,470,8),U("tree",1500,480,9),U("clock",1100,170,10)]},bedroom:{wallpaper:"#d9ccff",floor:"#f2d0a4",pattern:2,items:[U("bed",450,480,1),U("window",750,230,2),U("teddy",330,500,3),U("stars",300,180,4),U("tub",1350,480,5),U("lamp",-250,470,6),U("flowers",-150,500,7)]},salon:{wallpaper:"#ffe0f0",floor:"#f6d6ff",pattern:2,items:[U("rug",470,540,0),U("mirror",470,150,1),U("vanity",470,480,2),U("perfume",400,345,3),U("polish",450,345,4),U("hairdryer",560,340,5),U("stool",470,545,6),U("lamp",200,470,7),U("flowers",780,480,8),U("picture",780,200,9),U("chair",-250,490,10),U("mirror",-250,170,11),U("plant",1300,480,12)]},kitchen:{wallpaper:"#cdf3dc",floor:"#ffe7a8",pattern:3,items:[U("fridge",200,470,1),U("table",520,500,2),U("cake",520,395,3),U("stove",800,470,4),U("chair",380,500,5),U("chair",660,500,6),U("juice",470,395,7),U("plant",-300,480,8),U("fish",1300,480,9)]},nursery:{wallpaper:"#d6f3ff",floor:"#f3ddc4",pattern:1,items:[U("cloud-rug",480,545,0),U("crib",470,480,1),U("crib-mobile",470,155,2),U("rocker",780,490,3)]},backyard:{wallpaper:"#c5ecff",floor:"#b6e3a8",pattern:0,items:[]}},characters:[tn({id:"c1",skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6",room:"living",x:330+es,y:540})],soundOn:!0,dogKennel:null}}function tn(e){return{skin:"#f1c27d",hair:"#5b3a29",hairStyle:0,shirt:"#ff7aa8",pants:"#5aa9e6",size:"kid",acc:0,room:"living",x:jt/2,y:540,flip:!1,held:{left:null,right:null},...e}}const cn=(e,t,n)=>Math.max(t,Math.min(n,e)),rs=e=>e.items.reduce((t,n)=>Math.max(t,n.z),0),Mg=e=>e.items.reduce((t,n)=>Math.min(t,n.z),0);function Ys(e,t,n){return{...e,characters:e.characters.map(s=>s.id===t?n(s):s)}}function $e(e,t,n){const s=e.rooms[t];return s?{...e,rooms:{...e.rooms,[t]:n(s)}}:e}function Wl(e){if(!e||!e.rooms)return e;const t=Vt().rooms,n=e.rooms;let s=!1;for(const i of Co){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(s=!0)}if(!s)return e;const o={...n};for(const i of Co){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(o[i]=t[i])}return{...e,rooms:o}}function Bo(e,t){switch(t.type){case"room/switch":return e.rooms[t.room]?{...e,currentRoom:t.room}:e;case"item/add":return $e(e,t.room,n=>n.items.length>=80?n:{...n,items:[...n.items,{...t.item,z:rs(n)+1}]});case"item/move":return $e(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,x:cn(t.x,0,jt),y:cn(t.y,40,ws)}:s)}));case"item/flip":return $e(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,flip:!s.flip}:s)}));case"item/front":return $e(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:rs(n)+1}:s)}));case"item/back":return $e(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:Mg(n)-1}:s)}));case"item/delete":{const n=e.rooms[t.room]?.items.some(o=>o.id===t.id&&o.kind==="kennel"),s=$e(e,t.room,o=>({...o,items:o.items.filter(i=>i.id!==t.id)}));return n&&e.dogKennel?.item===t.id?{...s,dogKennel:null}:s}case"room/wallpaper":return $e(e,t.room,n=>({...n,wallpaper:t.color}));case"room/floor":return $e(e,t.room,n=>({...n,floor:t.color}));case"room/pattern":return $e(e,t.room,n=>({...n,pattern:t.pattern,wallTile:null}));case"room/wallTile":return $e(e,t.room,n=>({...n,wallTile:t.tile}));case"room/floorTile":return $e(e,t.room,n=>({...n,floorTile:t.tile}));case"char/add":return e.characters.length>=ts||e.characters.some(n=>n.id===t.char.id)?e:{...e,characters:[...e.characters,t.char]};case"char/update":return Ys(e,t.id,n=>{const{look2:s,...o}=t.patch,i={...n,...o};return"look2"in t.patch&&(s?i.look2=s:delete i.look2),i});case"char/move":return e.rooms[t.room]?Ys(e,t.id,n=>({...n,room:t.room,x:cn(t.x,0,jt),y:cn(t.y,60,ws)})):e;case"char/delete":{const n=e.characters.find(o=>o.id===t.id);if(!n)return e;let s={...e,characters:e.characters.filter(o=>o.id!==t.id)};return["left","right"].forEach((o,i)=>{const a=n.held[o];a&&(s=$e(s,n.room,r=>({...r,items:[...r.items,{...a,x:n.x+(i?40:-40),y:n.y,z:rs(r)+1}]})))}),s}case"char/hold":{const n=e.characters.find(a=>a.id===t.id),s=e.rooms[t.room]?.items.find(a=>a.id===t.itemId);if(!n||!s||n.held[t.hand]||n.room!==t.room)return e;const o=$e(e,t.room,a=>({...a,items:a.items.filter(r=>r.id!==t.itemId)})),i=Ys(o,t.id,a=>({...a,held:{...a.held,[t.hand]:s}}));return s.kind==="kennel"&&e.dogKennel?.item===t.itemId?{...i,dogKennel:null}:i}case"char/release":{const n=e.characters.find(i=>i.id===t.id),s=n?.held[t.hand];if(!n||!s)return e;const o=Ys(e,t.id,i=>({...i,held:{...i.held,[t.hand]:null}}));return $e(o,n.room,i=>({...i,items:[...i.items,{...s,x:cn(t.x,0,jt),y:cn(t.y,40,ws),z:rs(i)+1}]}))}case"cat/set":return{...e,cat:t.cat};case"cat/move":return e.cat&&e.rooms[t.room]?{...e,cat:{...e.cat,room:t.room,x:cn(t.x,100,jt-100)}}:e;case"dog/set":return{...e,dog:t.dog};case"dog/kennel":return t.item===null?e.dogKennel?{...e,dogKennel:null}:e:!xg(e,t.item)||e.dogKennel?.item===t.item?e:{...e,dogKennel:{item:t.item}};case"ranch/op":{const n=qi(Wa(e.garden),Sa(e.basket),t.op,t.now,e.lastEgg??0);if(typeof n=="string")return e;let s={...e,garden:n.plots,basket:n.basket,lastEgg:t.op.op==="egg"?t.now:e.lastEgg};if(t.op.op==="take"&&s.rooms[t.op.room]){const o=t.op;s=$e(s,o.room,i=>i.items.length>=80?i:{...i,items:[...i.items,{id:o.id,kind:pg[o.kind],x:o.x,y:560,flip:!1,z:rs(i)+1,scale:1}]})}return s}case"settings/sound":return{...e,soundOn:t.on};case"game/reset":return Vt()}}const vr=wt("cozy-house"),Lg=wt("cozy-house-v1");function Pa(e){if(!e||typeof e!="object"||!e.rooms)return Vt();let t=e;if(t.version===1){const c=g=>(Number(g)||0)+es,d={};for(const[g,p]of Object.entries(t.rooms))d[g]={...p,items:(p.items??[]).map(m=>({...m,x:c(m.x)}))};t={...t,version:2,rooms:d,character:{...t.character,x:c(t.character?.x)}}}if(t.version===2){const c=t.character??{};t={...t,version:3,characters:[tn({...c,id:"c1",size:"kid",acc:0,held:{left:null,right:null}})]},delete t.character}if(t.version!==3)return Vt();const n=Vt(),s=(Array.isArray(t.characters)?t.characters:[]).slice(0,ts).map((c,d)=>{const g=c?.look2,p=tn({...c,id:String(c.id??"c"+(d+1)),held:{left:c.held?.left??null,right:c.held?.right??null}});if(delete p.look2,g!=null){const m=As(g);m&&(p.look2=m)}return p}),o=Wl({...n,...t,rooms:{...n.rooms,...t.rooms},characters:s}),i=Ta(o),a=i===o.dogKennel?o:{...o,dogKennel:i},r=wg(a.mailbox);let l=a;if(r)l={...l,mailbox:r};else if(l.mailbox){const{mailbox:c,...d}=l;l=d}return Cg(l)}function Cg(e){const t=e.currentRoom,n=Bl.includes(t),s=a=>Co.includes(a);let o=!1;const i=e.characters.map(a=>{const r=a.room;return!s(r)||!n&&r===t?(o=!0,{...a,room:"living"}):a});return n&&!o?e:{...e,currentRoom:n?e.currentRoom:"living",characters:i}}function Tl(){let e;try{const s=localStorage.getItem(vr)??localStorage.getItem(Lg);e=s?Pa(JSON.parse(s)):Vt(),!s&&typeof navigator<"u"&&!navigator.webdriver&&(e=ig(e))}catch{e=Vt()}const t=[];let n;return{get:()=>e,subscribe(s){t.push(s)},dispatch(s){e=Bo(e,s),t.forEach(o=>o(e,s)),clearTimeout(n),n=window.setTimeout(()=>{try{localStorage.setItem(vr,JSON.stringify(e))}catch{}},250)}}}const Bg=Object.freeze(Object.defineProperty({__proto__:null,MAX_CHARS:ts,ROOM_H:ws,ROOM_IDS:Co,ROOM_W:jt,TAB_ROOMS:Bl,V1_OFFSET:es,V1_ROOM_W:Sl,createStore:Tl,ensureRooms:Wl,initialState:Vt,migrate:Pa,newCharacter:tn,reduce:Bo,validKennel:Ta},Symbol.toStringTag,{value:"Module"}));function Ni(e,t){for(let n=e.length-1;n>0;n--){const s=Math.floor(t()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}const Pl=4,br=7,Sg=30;function Wg(){const e=[];let t=0;for(let n=0;n<Pl;n++){e.push({id:t++,c:n,v:0});for(let s=1;s<=9;s++)for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s});for(const s of["skip","rev","d2"])for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s})}for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"wild"});for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"w4"});return e}const ji=e=>e.discard[e.discard.length-1],ls=(e,t)=>t.c===4||t.c===e.color||t.v===ji(e).v&&ji(e).c!==4,Et=(e,t,n=1)=>{const s=e.hands.length;return((t+e.dir*n)%s+s)%s};function Zi(e,t,n,s){const o=[];for(let i=0;i<n&&e.hands[t].length<Sg;i++){if(!e.deck.length){const r=e.discard.pop();if(e.deck=Ni(e.discard.map(l=>l),s),e.discard=[r],!e.deck.length)break}const a=e.deck.pop();e.hands[t].push(a),o.push(a)}return e.hands[t].length>1&&(e.slay[t]=!1),o}function Tg(e,t){if(e.owe!==null&&e.hands[e.owe]?.length===1&&!e.slay[e.owe]){const n=e.owe;return e.owe=null,{victim:n,vdrew:Zi(e,n,2,t).length}}return e.owe=null,{}}const wr=e=>{const t=[0,0,0,0];return e.forEach(n=>{n.c<4&&t[n.c]++}),t.indexOf(Math.max(...t))},Pg={id:"slay",name:"Slay",minPlayers:2,maxPlayers:6,setup(e,t){const n=Ni(Wg(),t),s=Array.from({length:e},()=>n.splice(-br,br));let o=n.length-1;for(;typeof n[o].v!="number";)o--;const i=n.splice(o,1)[0];return{deck:n,discard:[i],hands:s,color:i.c,turn:Math.floor(t()*e),dir:1,drawn:null,slay:s.map(()=>!1),owe:null,winner:null,ev:{n:0,p:-1,k:"start",card:i}}},cleanMove(e){return!e||typeof e!="object"?null:e.k==="play"&&Number.isInteger(e.id)&&e.id>=0&&e.id<108?{k:"play",id:e.id,...Number.isInteger(e.color)&&e.color>=0&&e.color<Pl?{color:e.color}:{}}:e.k==="draw"||e.k==="pass"||e.k==="slay"?{k:e.k}:null},legal(e,t,n){if(e.winner!==null)return!1;if(n.k==="slay")return e.hands[t].length<=2&&!e.slay[t];if(t!==e.turn)return!1;if(n.k==="draw")return e.drawn===null;if(n.k==="pass")return e.drawn!==null;const s=e.hands[t].find(o=>o.id===n.id);return!s||e.drawn!==null&&s.id!==e.drawn||s.c===4&&n.color===void 0?!1:ls(e,s)},apply(e,t,n,s){const o=e.ev.n+1;if(n.k==="slay")return e.slay[t]=!0,e.owe===t&&(e.owe=null),e.ev={n:o,p:t,k:"slay"},e;const i=Tg(e,s);if(n.k==="draw"){const d=Zi(e,t,1,s),g=d[0];if(g&&ls(e,g))e.drawn=g.id,e.ev={n:o,p:t,k:"draw",drew:1,...i};else{if(e.drawn=null,e.ev={n:o,p:t,k:"draw",drew:d.length,...i},e.stuck=d.length?0:(e.stuck??0)+1,(e.stuck??0)>=e.hands.length){const p=Math.min(...e.hands.map(m=>m.length));return e.winner=e.hands.findIndex(m=>m.length===p),e.turn=-1,e}e.turn=Et(e,t)}return e}if(n.k==="pass")return e.drawn=null,e.turn=Et(e,t),e.ev={n:o,p:t,k:"pass",...i},e;e.stuck=0;const a=e.hands[t],r=a.splice(a.findIndex(d=>d.id===n.id),1)[0];e.discard.push(r),e.drawn=null,e.color=r.c===4?n.color:r.c;const l={n:o,p:t,k:"play",card:r,color:e.color,...i};if(!a.length)return e.winner=t,e.turn=-1,e.ev=l,e;a.length===1&&!e.slay[t]&&(e.owe=t);const c=e.hands.length===2;if(r.v==="rev")e.dir=e.dir===1?-1:1,e.turn=c?t:Et(e,t);else if(r.v==="skip")l.skipped=Et(e,t),e.turn=Et(e,t,2);else if(r.v==="d2"||r.v==="w4"){const d=Et(e,t);l.skipped=d;const g=r.v==="d2"?2:4;l.drew=Zi(e,d,g,s).length,e.turn=Et(e,t,2)}else e.turn=Et(e,t);return e.ev=l,e},turn:e=>e.winner!==null?-1:e.turn,winner:e=>e.winner,view(e,t){return{top:ji(e),color:e.color,turn:e.winner!==null?-1:e.turn,dir:e.dir,deck:e.deck.length,counts:e.hands.map(n=>n.length),slay:e.slay,winner:e.winner,ev:e.ev,...t!==null&&e.hands[t]?{hand:e.hands[t],drawn:t===e.turn?e.drawn:null}:{}}},autoMove(e,t){if(t!==e.turn)return null;if(e.drawn!==null){const s=e.hands[t].find(o=>o.id===e.drawn);return s&&ls(e,s)?{k:"play",id:s.id,...s.c===4?{color:wr(e.hands[t])}:{}}:{k:"pass"}}const n=e.hands[t].find(s=>ls(e,s)&&s.c!==4)??e.hands[t].find(s=>ls(e,s));return n?{k:"play",id:n.id,...n.c===4?{color:wr(e.hands[t])}:{}}:{k:"draw"}},removePlayer(e,t,n){if(e.hands.length<=2)return null;const s=e.turn===t;return e.deck.unshift(...e.hands[t]),Ni(e.deck,n),e.hands.splice(t,1),e.slay.splice(t,1),e.owe===t?e.owe=null:e.owe!==null&&e.owe>t&&e.owe--,e.turn>t&&e.turn--,s&&(e.drawn=null,e.dir===-1?e.turn=((t-1)%e.hands.length+e.hands.length)%e.hands.length:e.turn=t%e.hands.length),e.ev={n:e.ev.n+1,p:t,k:"left"},e}},Fi=7,ho=6,Ug=(e,t,n)=>{const s=e[t][n];for(const[o,i]of[[1,0],[0,1],[1,1],[1,-1]]){const a=[[t,n]];for(const r of[1,-1])for(let l=1;l<4;l++){const c=t+o*l*r,d=n+i*l*r;if(c<0||c>=Fi||d<0||d>=ho||e[c][d]!==s)break;a.push([c,d])}if(a.length>=4)return a}return null},Hg={id:"four",name:"Four in a Row",minPlayers:2,maxPlayers:2,setup:(e,t)=>({b:Array.from({length:Fi},()=>[]),turn:t()<.5?0:1,winner:null,draw:!1,line:null,last:null,n:0}),cleanMove:e=>e&&Number.isInteger(e.col)&&e.col>=0&&e.col<Fi?{col:e.col}:null,legal:(e,t,n)=>e.winner===null&&!e.draw&&t===e.turn&&e.b[n.col].length<ho,apply(e,t,n){e.b[n.col].push(t);const s=e.b[n.col].length-1;e.last={col:n.col,row:s,p:t},e.n++;const o=Ug(e.b,n.col,s);return o?(e.winner=t,e.line=o,e.turn=-1):e.b.every(i=>i.length>=ho)?(e.draw=!0,e.turn=-1):e.turn=1-t,e},turn:e=>e.turn,winner:e=>e.winner,view:e=>e,autoMove:(e,t)=>{if(t!==e.turn)return null;const s=[3,2,4,1,5,0,6].find(o=>e.b[o].length<ho);return s===void 0?null:{col:s}},removePlayer:()=>null},Ul={slay:Pg,four:Hg},oi=2600,Ws=[{game:"slay",seats:6,x:720},{game:"four",seats:2,x:1500},{game:"slay",seats:4,x:2150}],Qg=2e4,Eg=["Acorn Friend","Alarm Clock","Apple","Apple Tree","Arc Floor Lamp","Arc Lamp","Arched Mirror","Arched Shelf","Armchair","Autumn Wreath","Baby Blocks","Baby Bottle","Bakery Shelf","Ball","Balloons","Bananas","Bar Stool","Bassinet","Bathtub","Bean Bag","Bed","Big Leaf Plant","Big Monitor","Big Wardrobe","Birdie","Blanket Basket","Blocks","Boba Buddy","Book Stack","Books","Bookshelf","Box Stack","Bread","Brush & Comb","Bubble Aquarium","Bubble Bath","Bubble Chair","Bubble-Gum Rug","Bubbly Fountain","Bubbly Plant","Bud Vase","Bulletin Board","Bunk Bed","Bunny","Bunny Plush","Bunny Slippers","Cactus","Cactus Buddy","Cada's Mouse","Cake","Candle Jar","Canopy Bed","Canopy Daybed","Cat Bed","Cat Tower","Caterpillar Plush","Chair","Changing Table","Checker Rug","Checkered Bed","Chick","Chloe's Star Lamp","Clock","Clothes Rail","Cloud Beanbag","Cloud Lamp","Cloud Rug","Cloud Shelf","Cocoa Doll","Cocoa Mug","Coffee Table","Comfy Chair","Cookie Jar","Cooking Pot","Cottage Heart Pouf","Cottage Heart Rug","Counter","Cozy Fireplace","Cozy Lights","Cozy Mug","Cozy Nightstand","Cozy Reading Nook","Cozy Snake Plant","Cozy Teapot","Cream Jars","Cream Sofa","Crib","Crib Mobile","Cubby Shelf","Cube Shelf","Cupcake","Cupcake Stand","Curtains","Curvy Yellow Desk","Cute Keyboard","Cute Speaker","Daisy Pot","Daisy Rug","Desk","Desk Lamp","Desk Mic","Dino Plushie","Dish Cabinet","Dish Rack","Dog Kennel","Doll House","Donut","Dresser","Droplet Buddy","Egg Pan","Fairy-Light Garland","Fairy-Light Shelf","Fan","Fancy Sofa","Fiddle-Leaf Fig","Fig Tree","Fire Pit","Fireplace","Fish Bowl","Fish Tank","Flower Cart","Flower Floor Lamp","Flower Kettle","Flower Lamp","Flowers","Foot Spa","Fresh Egg","Fridge","Frog Plush","Fruit Bowl","Game Controller","Gaming Chair","Garden Carrot","Glass Cabinet","Globe","Globe Pendants","Glossy Hair Dryer","Glow Mirror","Gold Floor Mirror","Guinea Pig","Hair Dryer","Hair-Dryer Chair","Hair-Wash Chair","Hamster House","Hamster Pal","Hanging Lamp","Hanging Lantern","Hanging Plant","Hanging Vine Planter","Happy Fridge","Headphones","Heart Headboard Bed","Heart Pouf","Heart Rug","Heart Wall Clock","Heart Wall Light","Heart-Leaf Plant","Herb Box","High Chair","Honey Doll","Ice Cream","Jewelry Box","Juice","Kettle","Kitchen Counter","Knit Cushion","Ladder Shelf","Lamp","Landscape Art","Lattice Bench","Lava Lamp","Lemon Tree","Lighted Vanity","Lilac Curtain","Little Rocking Horse","Little Sprout","Lotion Bottles","Macaron Jar","Macrame Swing Chair","Mani-Pedi Chair","Manicure Table","Microwave","Milk","Milk & Cookies","Mini Fridge","Mini Greenhouse","Mini Tree","Mint Fridge","Mint Pebble Rug","Mirror","Mixer","Moon and Stars","Moon Night-Light","Moving Box","Mushroom Stool","Music Box","Nail Dryer","Nail Polish","Nail Polish Rack","Night Light","Nightstand","Nursery Cloud Rug","Nursery Dresser","Nursery Lamp","Pancakes","Pantry","Paper Lantern","Pastel Range","Pastel Wardrobe","Pendant Lamp","Perfume","Perfume Bottle","Perfume Tray","Pet Bowl","Petal Coffee Table","Phone on a Stand","Piano","Picnic Basket","Picture","Piggy Bank","Pillow","Pin Board","Pink Vanity","Pizza","Plant","Plant Stand","Plant Wall","Play Mat","Play Tent","Polish Bottle","Popcorn","Pothos Plant","Pouf","Puffy Cloud Sofa","Puffy Stool","Puppy","Quinn's Cookie Pup","Radio","Rainbow Art","Rainbow Rug","Ranch Flowers","Rattle","Reagan's Frame","Reception Desk","Record Player","Ribbon Mirror","Rice Cooker","Ring Light","Robot","Rocker","Rocking Chair","Rocking Horse","Rose Doll","Round Breakfast Table","Round Side Table","Round Woven Rug","Rug","Runner Rug","Salon Chair","Scallop Curtains","Scalloped Loveseat","Shelf","Sink","Sloane's Rainbow Snail","Snake Plant","Sofa","Sparkle Wall Light","Spice Rack","Spray Bottle","Stacking Rings","Star Dresser","Star Lamp","Star Mobile","Stars","Sticker Board","Stove","String Lights","Striped Runner","Succulents","Sunny Art","Sunny Bean Bag","Sunny Cloud Rug","Sunny Shelf","Swing Chair","Swivel Stool","Table","Tassel Rug","Teapot","Teapot Set","Teddy","Tiered Tray","Toaster","Towel Cart","Towel Stack","Toy Bin","Toy Car","Toy cat","Toy Chest","Toy Train","Trailing Plant Shelf","Tulip Vase","Turtle","TV","TV Stand","Unicorn Plushie","Utensil Rail","Vanity","Vanity Stool","Vlog Camera","Waiting Bench","Wall Shelf","Wardrobe","Water-Drop Lamp","Watermelon","Wavy Floor Lamp","Window","Window Seat","Wood Armchair","Wood Bookshelf","Wood Coffee Table","Wood Desk","Wood Dresser","Wood Stool","Wood Wall Clock","Wooden Bed","Yard Sign"],zg=4,Ua=16,So=e=>String(e??"").toUpperCase().replace(/[^A-Z0-9]/g,""),Rg=e=>e.length>=zg&&e.length<=Ua&&/^[A-Z0-9]+$/.test(e),Ag=12,Dg=["Cada","Chloe","Quinn","Reagan","Sloane"],Og=460,Ig=320,$r=["Sunny Bunny","Bubbly Panda","Sparkle Kitty","Happy Hippo","Cozy Koala","Jolly Jelly","Zippy Fox","Dreamy Deer","Giggly Goose","Peachy Pup","Minty Mouse","Rainbow Duck","Cuddly Cub","Starry Owl","Bouncy Frog","Lucky Lamb","Snuggly Seal","Twinkle Tiger","Berry Bear","Cloudy Llama","Pebble Penguin","Honey Hedgehog","Marshmallow Moose","Cupcake Cat"],$s=["Hi!","Come over!","I love your house!","Let's play!","Follow me!","Look at this!","Want a snack?","Nice!","Yes!","No thanks","Hehe","Be right back","Bye!","Let's decorate!","Wanna race?","So cute!"],Hl=["👋","😀","😂","😍","😮","😢","🎉","⭐","❤️","👍","🍕","🐱","🌈","🎶","💤","✨"],Ha=60,qg={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t","@":"a",$:"s","!":"i","+":"t"},Ci=["fuck","fuk","fck","shit","sht","bitch","btch","bastard","asshole","ass","dick","cock","pussy","cunt","whore","slut","damn","crap","piss","fag","faggot","retard","nigger","nigga","porn","sex","sexy","nude","naked","boob","boobs","penis","vagina","kill","suicide","stupid","idiot","dumb","hate","loser","shutup","wtf","stfu","gtfo","bs"],Ng=["zero","oh","one","two","three","four","five","six","seven","eight","nine","ten"],jg=[/\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i,/\bi\s*live\s+(at|on|in)\b/i,/\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,/\b(password|passcode|zip\s*code|postcode)\b/i,/\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i],Zg=/(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i,Fg=/\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i,Vg=/@\w/,Gg=/\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;function Kg(e,t=Ha){if(typeof e!="string")return{ok:!1,reason:"empty"};const n=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(!n)return{ok:!1,reason:"empty"};if(n.length>t)return{ok:!1,reason:"long"};if(Zg.test(n))return{ok:!1,reason:"link"};if(Fg.test(n)||Vg.test(n))return{ok:!1,reason:"contact"};if((n.match(/\d/g)??[]).length>=5||/\d[\d\s().\-]{4,}\d/.test(n)||Gg.test(n))return{ok:!1,reason:"contact"};const o=n.toLowerCase().split(/[^a-z]+/).filter(Boolean);let i=0;for(const c of o)if(i=Ng.includes(c)?i+1:0,i>=4)return{ok:!1,reason:"contact"};if(jg.some(c=>c.test(n)))return{ok:!1,reason:"personal"};const a=n.toLowerCase().replace(/[0-9@$!+]/g,c=>qg[c]??c),r=a.split(/[^a-z]+/).filter(Boolean),l=a.replace(/[^a-z]/g,"").replace(/(.)\1{2,}/g,"$1$1");return r.some(c=>Ci.includes(c)||Ci.includes(c.replace(/(.)\1+/g,"$1")))||Ci.filter(c=>c.length>=5).some(c=>l.includes(c))?{ok:!1,reason:"words"}:{ok:!0,text:n}}const Yg={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t",8:"b","@":"a",$:"s","!":"i","+":"t",v:"u","|":"k","<":"k","#":"h"};function Xg(e){return/^f+u+c+k+$/.test(e)||/^f+u+k+$/.test(e)||/^f+c+k+$/.test(e)||/^s+h+i+t+$/.test(e)||/^s+h+t+$/.test(e)||/^b+i+t+c+h+$/.test(e)||/^b+t+c+h+$/.test(e)||/^a+s+h+o+l+e+$/.test(e)||/^d+u+m+b+a+s+$/.test(e)||/^n+i+g{2,}e+r+$/.test(e)||/^n+i+g{2,}a+$/.test(e)||/^f+a+g+$/.test(e)||/^f+a+g+o+t+$/.test(e)||/^r+e+t+a+r+d+$/.test(e)||/^k+y+s+$/.test(e)}function Jg(e){return/^c+u+n+t+$/.test(e)||/^a+h+o+l+e+$/.test(e)||/^k+i+k+e+$/.test(e)||/^c+h+i+n+k+$/.test(e)||/^s+p+i+c+$/.test(e)||/^c+o{2,}n+$/.test(e)||/^w+e+t+b+a+c+k+$/.test(e)||/^t+r+a+n+y+$/.test(e)||/^t+r+a+n+i+$/.test(e)||/^d+y+k+e+$/.test(e)||/^b+e+a+n+e+r+$/.test(e)||/^g+o{2,}k+$/.test(e)||/^r+a+g+h+e+a+d+$/.test(e)||/^t+o+w+e+l+h+e+a+d+$/.test(e)||/^h+e+i+l+h+i+t+l+e+r+$/.test(e)}const ef=new Set(["spicy","spices","spicing","spicey","spicier","spiciest","cocky","chinking","spicer","gooky","slutty","twatt"]);function tf(e,t){if(!/^[a-z]+$/.test(e)||t&&ef.has(e))return!1;const n=[e],s=["ing","in","ers","er","ed","es","y","s"];for(let o=0;o<s.length;o++){const i=s[o];e.endsWith(i)&&e.length>i.length+2&&n.push(e.slice(0,-i.length))}for(let o=0;o<n.length;o++)if(Xg(n[o])||t&&Jg(n[o]))return!0;return!1}function nf(e){if(!e.includes("*"))return[e];const t=e.split("*").length-1,n=e.replace(/\*/g,""),s=n?[n]:[];if(t<1||t>3)return s;const o=e.split(""),i=[];for(let r=0;r<o.length;r++)o[r]==="*"&&i.push(r);const a=r=>{if(r===i.length){s.push(o.join(""));return}for(let l=97;l<=122;l++)o[i[r]]=String.fromCharCode(l),a(r+1)};return a(0),s}const _r=["mother","sonofa","horse","bull","dip"],xr=["face","head","you"];function qn(e,t){const n=e.replace(/ph(?=u+c+k)/g,"f").replace(/ph(?=u+k)/g,"f");if(tf(n,t)||/^w+t+f+$/.test(n)||/^s+t+f+u+$/.test(n))return!0;for(let s=0;s<_r.length;s++){const o=_r[s];if(n.startsWith(o)&&n.length>o.length+2&&qn(n.slice(o.length),t))return!0}for(let s=0;s<xr.length;s++){const o=sf(n,xr[s]);if(o&&qn(o,t))return!0}return!!(n.length>4&&n.endsWith("s")&&!n.endsWith("ss")&&qn(n.slice(0,-1),t))}function sf(e,t){let n=e.length;for(let s=t.length-1;s>=0;s--){const o=t[s];if(n===0||e[n-1]!==o)return null;for(;n>0&&e[n-1]===o;)n--}return n<=2?null:e.slice(0,n)}function Wo(e){let t="";for(let n=0;n<e.length;n++)t+=Yg[e[n]]??e[n];return t}const of={ѕ:"s",һ:"h",с:"c",а:"a",е:"e",о:"o",р:"p",і:"i",х:"x",у:"y",к:"k"};function af(e){const n=e.replace(/[\u00ad\u0336\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").normalize("NFKC").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase();let s="";for(let o=0;o<n.length;o++)s+=of[n[o]]??n[o];return s}const rf=new Set(["it","its","it's","is","as","a","i","uh","oh","so","he","she","hi","um","umm","hmm","hm","ah","eh","er","ow","ha","hey","yo","ok","yeah","yes","no","nah","wow","ho","ooh","ahh","uhh","ohh"]);function Ts(e){return e>="a"&&e<="z"||e>="0"&&e<="9"||"@$!+*v|#<".includes(e)}function Mr(e,t){let n=t;for(;n<e.length&&e[n]==="!";)n++;if(n>=e.length||!Ts(e[n])||e[n]==="!")return null;const s=e[n];let o=n+1;for(;o<e.length&&e[o]==="!";)o++;return o<e.length&&Ts(e[o])?null:{ch:s,end:o}}function lf(e,t){const n=e.length,s=" .-_~";let o=0;for(;o<n;){if(o>0&&Ts(e[o-1])){o++;continue}const i=Mr(e,o);if(!i){o++;continue}const a=[i.ch];let r=i.end;for(;r<n&&s.includes(e[r]);){const l=Mr(e,r+1);if(!l)break;a.push(l.ch),r=l.end}if(a.length>=2){const l=Wo(a.join("")).replace(/\*/g,"");if(qn(l,t))return!0}o=Math.max(o+1,r)}return!1}function Mn(e){return e.replace(/^!+/,"").replace(/!+$/,"")}function To(e){return Wo(Mn(e)).replace(/\*/g,"")}function Ql(e){return/[0-9@$!+*|#<]/.test(Mn(e))}function cf(e){return Mn(e).length===1}function df(e){const t=Mn(e);return t.length<2||Ql(e)?!1:/^sh+$/.test(t)||rf.has(t)}function gf(e){let t="space";for(let n=0;n<e.length;n++){const s=e[n];if(!(s===" "||s==="	"||s===`
`||s==="\r")){if(s==="-"){t="hyphen";continue}return"punct"}}return t}function ff(e){const t=[];let n=0,s="";for(;n<e.length;){if(!Ts(e[n])){s+=e[n],n++;continue}let o=n+1;for(;o<e.length&&Ts(e[o]);)o++;t.push({text:e.slice(n,o),gap:t.length===0?"start":gf(s)}),s="",n=o}return t}function hf(e){const t=[Wo(e)];if(e.charAt(0)==="!"||e.charAt(e.length-1)==="!"){const n=e.replace(/^!+/,"").replace(/!+$/,"");n&&n!==e&&t.push(Wo(n))}return t}function pf(e){for(let t=0;t<e.length;t++){if(!/^k+i+l+$/.test(e[t]))continue;const n=e[t+1]||"",s=e[t+2]||"";if(/^y+o+u+r+s+e+l+f+$/.test(n)||/^u+r+s+e+l+f+$/.test(n)||/^u+r+$/.test(n)&&/^s+e+l+f+$/.test(s))return!0}return!1}function uf(e,t,n){if(Mn(e[n].text)!=="coon")return!1;const s=n>0?t[n-1]:"",o=t[n+1]||"";return s==="maine"||o==="cat"}function mf(e,t,n){return n===t+1&&e[n].gap==="space"&&/^a+$/.test(To(e[t].text))&&/^h+o+l+e+$/.test(To(e[n].text))}function yf(e,t,n){return Mn(e[n].text)!=="dyke"?!1:n>0&&Mn(e[n-1].text)==="van"}function kf(e){for(let t=0;t<e.length-1;t++)if(/^h+e+i+l+$/.test(e[t])&&/^h+i+t+l+e+r+$/.test(e[t+1]))return!0;return!1}function vf(e,t=!0){const n=af(e);if(lf(n,t))return!0;const s=ff(n),o=s.map(a=>hf(a.text)),i=s.map(a=>To(a.text));if(pf(i)||t&&kf(i))return!0;for(let a=0;a<o.length;a++)if(!(t&&(uf(s,i,a)||yf(s,i,a))))for(let r=0;r<o[a].length;r++){const l=nf(o[a][r]);for(let c=0;c<l.length;c++)if(qn(l[c].replace(/\*/g,""),t))return!0}for(let a=0;a<s.length;a++){let r="",l=0,c=!1,d=!1;for(let g=a;g<s.length&&g<a+8;g++){if(g>a){const p=s[g].gap,m=s[g-1].text;if(p==="punct"||p==="start"||m.endsWith("!")||s[g].text.startsWith("!")||p!=="space"&&p!=="hyphen")break}if(r+=To(s[g].text),cf(s[g].text)&&l++,df(s[g].text)&&(c=!0),Ql(s[g].text)&&(d=!0),g!==a&&!(c&&l<2&&!d)&&qn(r,t)){if(t&&mf(s,a,g))break;return!0}}}return!1}function El(e,t,n,s=!1){if(typeof e!="string")return{ok:!1,reason:"empty"};const o=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return o?o.length>t?{ok:!1,reason:"long"}:vf(o,!s)?{ok:!1,reason:n}:{ok:!0,text:o}:{ok:!1,reason:"empty"}}function bf(e,t=Ha){return El(e,t,"words")}const ii={long:"That is a bit long!",link:"No links, please!",contact:"Keep numbers and contact info secret!",personal:"Keep personal info secret!",words:"Let's use kind words!",mail:"Oops, try different words!",empty:""},zl={};for(const e of["АA","аa","ВB","вb","ЕE","еe","КK","кk","МM","мm","НH","нh","ОO","оo","РP","рp","СC","сc","ТT","тt","УY","уy","ХX","хx","ІI","іi","ЈJ","јj","ЅS","ѕs","ЁE","ёe","ЇI","їi","ΑA","ΕE","ΖZ","ΗH","ΙI","ΚK","ΜM","ΝN","ΟO","ΡP","ΤT","ΥY","ΧX","αa","εe","ζz","ιi","κk","νv","οo","ρp","τt","υu","χx"])zl[e[0]]=e[1];function wf(e){let t="";for(const n of e)t+=zl[n]??n;return t}function $f(e){return wf(String(e).normalize("NFKC")).replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\p{M}]/gu,"").replace(/[\p{Extended_Pictographic}\p{S}\p{P}]+/gu,"").replace(/\s+/g," ").trim()}function _f(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(()=>{const e=[...new Set(Eg.map(t=>$f(t)).filter(t=>t.length>=2))].sort((t,n)=>n.length-t.length);return new RegExp(`(^|[^A-Za-z])(?:${e.map(_f).join("|")})(?![A-Za-z])`,"gi")})();const Lr=(e,t,n)=>typeof e=="number"&&Number.isFinite(e)?Math.max(t,Math.min(n,e)):null,xf=(e,t,n=80)=>typeof e=="string"&&e.length<=n&&t.test(e)?e:null,Mf=/^#[0-9a-fA-F]{3,8}$/,Lf=["little","kid","adult"];function Cf(e){if(!e||typeof e!="object")return null;const t={};for(const n of["skin","hair","shirt","pants"])if(n in e){const s=xf(e[n],Mf,9);if(!s)return null;t[n]=s}if("hairStyle"in e){const n=Lr(e.hairStyle,0,3);if(n===null)return null;t.hairStyle=Math.round(n)}if("acc"in e){const n=Lr(e.acc,0,3);if(n===null)return null;t.acc=Math.round(n)}if("size"in e){if(!Lf.includes(e.size))return null;t.size=e.size}if("flip"in e){if(typeof e.flip!="boolean")return null;t.flip=e.flip}return"look2"in e&&(t.look2=As(e.look2)??null),Object.keys(t).length?t:null}function Os(e){const t=tn({id:"x"}),n=Cf({skin:e?.skin,hair:e?.hair,hairStyle:e?.hairStyle,shirt:e?.shirt,pants:e?.pants,size:e?.size,acc:e?.acc})??{},s=i=>n[i]??t[i],o={skin:s("skin"),hair:s("hair"),hairStyle:s("hairStyle"),shirt:s("shirt"),pants:s("pants"),size:s("size"),acc:s("acc")};if(e&&typeof e=="object"&&"look2"in e){const i=As(e.look2);i&&(o.look2=i)}return o}const Cr=4,Bf=["Mittens","Luna","Biscuit","Pumpkin","Whiskers","Mochi","Pepper","Noodle","Ginger","Socks"],Sf=["Buddy","Coco","Max","Daisy","Peanut","Rocket","Bella","Waffles","Scout","Honey"];function Wf(e){const t=String(e??"").normalize("NFC").replace(/\s+/g," ").trim();return!/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u.test(t)||(t.match(/\d/g)??[]).length>2?null:Kg(t).ok?t:null}function Tf(e,t=[]){return El(e,Nt,"mail")}function Rl(e){return typeof e.freeMail=="boolean"?e.freeMail:e.freeChat}const Qa=2900,Vi=[{kind:"swing",x:430,y:500},{kind:"swing",x:570,y:500},{kind:"blanket",x:1730,y:548},{kind:"blanket",x:1850,y:548},{kind:"bench",x:2025,y:512},{kind:"bench",x:2105,y:512},{kind:"bench",x:2225,y:512},{kind:"bench",x:2305,y:512}],N={top:{x:905,y:330},bottom:{x:1110,y:545},ladder:850},ve={x0:2440,x1:2840,y0:470,y1:585},Pf=(e,t)=>e.where===t.where&&(e.where!=="house"||e.houseId===t.houseId&&e.room===t.room),Uf=(e,t)=>Pf(e,t)&&Math.abs(e.x-t.x)<=Og&&Math.abs(e.y-t.y)<=Ig;function Xs(e){try{return Pa(e)}catch{return e}}const Gi=wt("cozy-hood"),Vn=()=>{try{return JSON.parse(localStorage.getItem(Gi)??"null")}catch{return null}},Wt=e=>{e?localStorage.setItem(Gi,JSON.stringify(e)):localStorage.removeItem(Gi)};function ai(){const e=new URLSearchParams(location.search).get("hood");return e?e.replace(/\/$/,""):"https://cozy-hood.andrewmunruh.workers.dev".replace(/\/$/,"")}async function Hf(e){const t=await fetch(e+"/api/create",{method:"POST"});if(!t.ok)throw new Error("create failed "+t.status);return t.json()}async function Qf(e,t){const n=await fetch(`${e}/api/hood/${encodeURIComponent(t)}`);if(n.status===429)return{slow:!0};if(!n.ok)throw new Error("lookup failed");return n.json()}const Br=e=>e.type==="item/move"?"im:"+e.id:e.type==="char/move"?"cm:"+e.id:null;class ri{constructor(t){this.cfg=t,this.ws=null,this.pid="",this.settings={freeChat:!0},this.players=new Map,this.houses=new Map,this.presence=new Map,this.status="offline",this.replaced=!1,this.ranch={plots:[],skew:0},this.tables=new Map,this.handlers=new Map,this.cid=1,this.flushT=0,this.presT=0,this.lastPres=null,this.presDirty=!1,this.closedByUs=!1,this.retry=0,this.retryT=0,this.epoch=0,this.stableT=0,this.outbox=[]}on(t,n){(this.handlers.get(t)??this.handlers.set(t,[]).get(t)).push(n)}emit(t,...n){this.handlers.get(t)?.forEach(s=>s(...n))}send(t){return this.ws?.readyState!==WebSocket.OPEN?!1:(this.ws.send(JSON.stringify(t)),!0)}reliable(t){this.send(t)||(t.t==="lock"?this.outbox=this.outbox.filter(n=>!(n.t==="lock"&&n.houseId===t.houseId)):(t.t==="look"||t.t==="dog")&&(this.outbox=this.outbox.filter(n=>n.t!==t.t)),this.outbox.push(t),this.outbox.length>8&&this.outbox.splice(0,this.outbox.length-8))}flushOutbox(){if(this.ws?.readyState!==WebSocket.OPEN||!this.outbox.length)return;const t=this.outbox;this.outbox=[];for(const n of t)this.send(n)||this.outbox.push(n)}scheduleRetry(){if(this.closedByUs||this.replaced||!this.cfg.token||this.retryT)return;const t=this.epoch,n=Math.min(15e3,400*2**Math.min(this.retry,6));this.retry++,this.retryT=window.setTimeout(()=>{this.retryT=0,!(t!==this.epoch||this.closedByUs||this.replaced||!this.cfg.token)&&this.connect()},n)}armStable(){this.stableT&&clearTimeout(this.stableT),this.stableT=window.setTimeout(()=>{this.stableT=0,this.retry=0},1e4)}clearStable(){this.stableT&&(clearTimeout(this.stableT),this.stableT=0)}connect(t){this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.closedByUs=!1,this.replaced=!1,this.status="connecting",this.emit("status",this.status);const n=this.ws;return new Promise(s=>{let o=!1;const i=r=>{o||(o=!0,s(r))},a=new WebSocket(this.cfg.url.replace(/^http/,"ws")+"/ws/"+encodeURIComponent(this.cfg.id??this.cfg.code));if(this.ws=a,n&&n!==a)try{n.close()}catch{}a.onopen=()=>{t&&!this.cfg.token?this.send({t:"join",...t,v:Cr,pet:1,mail:1}):this.cfg.token?this.send({t:"hello",token:this.cfg.token,v:Cr,pet:1,mail:1}):i("notoken")},a.onmessage=r=>{const l=JSON.parse(r.data);this.handle(l),l.t==="welcome"&&(this.armStable(),i("ok")),l.t==="error"&&i(l.code+(l.msg?":"+l.msg:"")),l.t==="removed"&&i("removed")},a.onclose=r=>{if(this.ws===a){if(this.clearStable(),this.ws=null,this.status="offline",i("closed"),r.code===4e3){this.replaced=!0,this.emit("status",this.status),this.emit("replaced");return}this.emit("status",this.status),this.scheduleRetry()}},a.onerror=()=>{}})}close(){this.closedByUs=!0,this.replaced=!1,this.epoch++,this.outbox=[],this.clearStable(),this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.presT&&(clearTimeout(this.presT),this.presT=0);try{this.ws?.close()}catch{}this.ws=null,this.status="offline",clearInterval(this.flushT)}handle(t){switch(t.t){case"joined":this.cfg.token=t.token,this.cfg.pid=t.pid,Wt(this.cfg);break;case"welcome":this.pid=t.pid,this.settings=t.settings,this.status="online",this.players=new Map(t.players.map(n=>[n.pid,n]));{const n=this.houses;this.houses=new Map;for(const s of t.houses){const{state:o,...i}=s,a=n.get(s.id);this.houses.set(s.id,{meta:i,confirmed:Xs(o),pending:a?a.pending.filter(r=>!r.sent):[],view:null})}}this.presence=new Map(Object.entries(t.presence)),this.presence.delete(this.pid),t.ranch&&(this.ranch={plots:t.ranch.plots,skew:t.ranch.now-Date.now()});{const n=new Map;for(const s of t.tables??[])n.set(s.tb,this.stampTable(s));this.tables=n}clearInterval(this.flushT),this.flushT=window.setInterval(()=>this.flush(),60),this.lastPres&&(this.presDirty=!0),this.flushPres(),this.flushOutbox(),this.emit("welcome"),this.emit("status",this.status);break;case"act":{const n=this.houses.get(t.houseId);if(!n)return;n.confirmed=Bo(Xs(n.confirmed),t.action);const s=t.by===this.pid&&n.pending[0]?.cid===t.cid;s&&n.pending.shift(),n.view=null,s||this.emit("act",t.houseId,t.action);break}case"nack":{const n=this.houses.get(t.houseId);if(!n)return;n.pending=n.pending.filter(s=>s.cid!==t.cid),t.state&&(n.confirmed=Xs(t.state)),n.view=null,this.emit("reset",t.houseId,t.reason);break}case"pres":t.pid!==this.pid&&(t.p?this.presence.set(t.pid,t.p):this.presence.delete(t.pid),this.emit("pres",t.pid));break;case"players":this.players=new Map(t.players.map(n=>[n.pid,n])),this.emit("players");break;case"house":{const{state:n,...s}=t.house;this.houses.set(s.id,{meta:s,confirmed:Xs(n),pending:[],view:null}),this.emit("houses");break}case"houseMeta":{const n=this.houses.get(t.meta.id);n&&(n.meta=t.meta,this.emit("houses"),this.emit("houseMeta",t.meta.id));break}case"houseGone":this.houses.delete(t.houseId),this.emit("houses"),this.emit("houseGone",t.houseId);break;case"settings":this.settings=t.settings,this.emit("settings");break;case"bubble":this.emit("bubble",t.pid,t.b);break;case"fx":this.emit("fx",t.pid,t.fx);break;case"ranch":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch");break;case"ranchFail":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch"),this.emit("ranchFail",t.reason);break;case"noride":this.emit("noride",t.ride);break;case"table":{const n=this.stampTable(t.table);this.tables.set(n.tb,n),this.emit("table",n);break}case"tblFail":this.emit("tblFail",t.tb,t.reason);break;case"sayFail":this.emit("sayFail",t.reason);break;case"mailbox":{const n=this.houses.get(t.houseId);if(!n)return;if(t.mailbox?.letters?.length)n.confirmed={...n.confirmed,mailbox:t.mailbox};else{const{mailbox:s,...o}=n.confirmed;n.confirmed=o}n.view=null,this.emit("mailbox",t.houseId);break}case"mailFail":this.emit("mailFail",t.reason);break;case"parentInfo":this.emit("parentInfo",t);break;case"error":this.emit("error",t.code),t.code==="badtoken"&&(this.cfg.token=void 0,this.cfg.pid=void 0,Wt(this.cfg));break;case"removed":this.closedByUs=!0,this.emit("removed");break}}stampTable(t){const n=this.tables.get(t.tb),s=n&&n.away===t.away&&n.receivedAt?n.receivedAt:Date.now();return{...t,receivedAt:s}}view(t){const n=this.houses.get(t);return n?n.view??=n.pending.reduce((s,o)=>Bo(s,o.action),n.confirmed):null}myHouseId(){return this.players.get(this.pid)?.houseId??""}canEdit(t){const n=this.houses.get(t);return!!n&&(!n.meta.locked||n.meta.ownerId===this.pid)}dispatch(t,n){const s=this.houses.get(t);if(!s)return;const o=Br(n),i=s.pending[s.pending.length-1];o&&i&&!i.sent&&Br(i.action)===o?i.action=n:s.pending.push({cid:this.cid++,action:n,sent:!1}),s.view=null}flush(){for(const[t,n]of this.houses)for(const s of n.pending)!s.sent&&this.send({t:"act",houseId:t,cid:s.cid,action:s.action})&&(s.sent=!0);this.flushPres()}setPresence(t){this.lastPres=t,this.presDirty=!0,this.presT||this.flushPres()}flushPres(){if(!(!this.presDirty||!this.lastPres)){if(!this.send({t:"pres",p:this.lastPres})){!this.closedByUs&&!this.presT&&(this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90));return}this.presDirty=!1,this.presT&&clearTimeout(this.presT),this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90)}}myPresence(){return this.lastPres}say(t){this.reliable({t:"say",b:t})}lock(t,n){this.reliable({t:"lock",houseId:t,locked:n})}setLook(t){this.reliable({t:"look",look:t});const n=this.players.get(this.pid);n&&(n.look=t)}setDog(t){this.reliable({t:"dog",dog:t});const n=this.players.get(this.pid);n&&(n.dog=t)}fx(t){this.reliable({t:"fx",fx:t})}ranchOp(t){this.reliable({t:"ranch",o:t})}tbl(t){this.reliable({t:"tbl",...t})}sendMail(t,n,s,o){this.reliable({t:"mail",op:"send",houseId:t,text:n,color:s,sticker:o})}readMail(t,n){this.reliable({t:"mail",op:"read",houseId:t,id:n})}dropMail(t,n){this.reliable({t:"mail",op:"drop",houseId:t,id:n})}now(){return Date.now()+this.ranch.skew}parent(t){this.cfg.parentKey&&this.reliable({t:"parent",key:this.cfg.parentKey,...t})}}function Ef(e,t,n,s="living"){let o=s;const i=[],a=()=>({...e.view(t),currentRoom:o,soundOn:n.get()}),r=l=>{if(e.houses.has(t)){const c=a();i.forEach(d=>d(c,l))}};return e.on("act",(l,c)=>{l===t&&r(c)}),e.on("reset",l=>{l===t&&r({type:"game/reset"})}),{houseId:t,get:a,subscribe(l){i.push(l)},dispatch(l){if(l.type==="room/switch")o=l.room;else if(l.type==="settings/sound")n.set(l.on);else{if(l.type==="game/reset")return;if(!e.canEdit(t))return;e.dispatch(t,l)}r(l)}}}const pe="#5a3d5c",A=`stroke="${pe}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,Ki=[{name:"Tabby",body:"#ffb26b",stripe:"#e8893a",belly:"#ffe3c4"},{name:"Smokey",body:"#b9b6c9",stripe:"#8f8ba3",belly:"#ecebf3"},{name:"Tuxedo",body:"#4f4660",stripe:"",belly:"#ffffff"},{name:"Calico",body:"#fff6ec",stripe:"",belly:"#fff6ec"}],Yi=[{name:"Pup",body:"#f2d0a4",ear:"#b07d54",snout:"#fbe7cc"},{name:"Poodle",body:"#fff0f6",ear:"#ffc8dd",snout:"#fff7fb"},{name:"Dachshund",body:"#c07a45",ear:"#7d4a26",snout:"#d99a68"},{name:"Golden",body:"#f4b860",ear:"#e09a3e",snout:"#fbd9a0"},{name:"Spotty",body:"#ffffff",ear:"#4a3f52",snout:"#ffffff"}],zf=(e,t,n,s=!1)=>s?`<path d="M${e-3} ${n} q3 3 6 0 M${t-3} ${n} q3 3 6 0" fill="none" ${A} stroke-width="2.5"/>`:`<circle cx="${e}" cy="${n}" r="2.8" fill="${pe}"/><circle cx="${t}" cy="${n}" r="2.8" fill="${pe}"/><circle cx="${e+.9}" cy="${n-.9}" r=".9" fill="#fff"/><circle cx="${t+.9}" cy="${n-.9}" r=".9" fill="#fff"/>`,Xi=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>`;function Gn(e,t="stand"){const n=Ki[e]??Ki[0],s="#ffb3c6",o=(i,a,r,l)=>`
    <path d="M${i-13} ${a-8} L${i-10} ${a-25} L${i-1} ${a-13} Z" fill="${n.body}" ${A}/><path d="M${i-10.5} ${a-11} L${i-9.5} ${a-20} L${i-4} ${a-13} Z" fill="${s}"/>
    <path d="M${i+1} ${a-13} L${i+11} ${a-26} L${i+13} ${a-7} Z" fill="${e===3?"#f4a259":n.body}" ${A}/><path d="M${i+4} ${a-13} L${i+10} ${a-21} L${i+11} ${a-11} Z" fill="${s}"/>
    <circle cx="${i}" cy="${a}" r="${r}" fill="${n.body}" ${A}/>
    ${e===3?`<path d="M${i+2} ${a-r+1} a${r} ${r} 0 0 1 ${r-3} ${r-2} q-6 2 -${r-3} -${r-3}z" fill="#f4a259"/>`:""}
    ${e===2?`<ellipse cx="${i+2}" cy="${a+7}" rx="9" ry="7" fill="#fff"/>`:""}
    ${n.stripe?`<path d="M${i-4} ${a-r+2} v5 M${i+2} ${a-r+1} v6 M${i+8} ${a-r+3} v4" ${A} stroke="${n.stripe}" stroke-width="2.5"/>`:""}
    ${zf(i-4,i+7,a,l)}
    <path d="M${i+3} ${a+4} l-2.5 -2 h5 z" fill="#ff8fab"/><path d="M${i+.5} ${a+6} q2.5 2.5 5 0" fill="none" ${A} stroke-width="2"/>
    ${Xi(i-8,a+5)}${Xi(i+12,a+5)}
    <path d="M${i+r-2} ${a+3} l9 -2 M${i+r-2} ${a+6} l9 2" ${A} stroke-width="1.6"/>`;return t==="nap"?`<svg viewBox="0 0 120 100" class="catsvg nap">
    <g class="breathe"><path class="tail" d="M28 84 Q22 96 64 94" fill="none" stroke="${pe}" stroke-width="11" stroke-linecap="round"/><path d="M28 84 Q22 96 64 94" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="76" rx="36" ry="18" fill="${n.body}" ${A}/>
    ${e===3?'<ellipse cx="44" cy="72" rx="12" ry="8" fill="#f4a259"/><ellipse cx="66" cy="70" rx="9" ry="6" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 62 q3 6 0 12 M56 61 q3 6 0 12 M68 62 q3 6 0 11" fill="none" ${A} stroke="${n.stripe}" stroke-width="3"/>`:""}
    ${o(90,76,15,!0)}</g></svg>`:t==="sit"?`<svg viewBox="0 0 120 100" class="catsvg sit">
    <path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${pe}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="70" rx="20" ry="25" fill="${n.body}" ${A}/>
    <ellipse cx="70" cy="74" rx="10" ry="15" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="54" cy="66" rx="9" ry="12" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M50 60 q5 2 4 8 M49 72 q5 2 4 8" fill="none" ${A} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect x="62" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${A}/><rect x="74" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${A}/>
    ${e===2?'<ellipse cx="66.5" cy="93" rx="4" ry="2.5" fill="#fff"/><ellipse cx="78.5" cy="93" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(72,36,17,!1)}</svg>`:`<svg viewBox="0 0 120 100" class="catsvg stand">
    <path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${pe}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <rect class="leg b" x="34" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${A}/><rect class="leg a" x="74" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${A}/>
    <ellipse cx="58" cy="58" rx="32" ry="17" fill="${n.body}" ${A}/>
    <ellipse cx="64" cy="66" rx="20" ry="7" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="46" cy="52" rx="12" ry="9" fill="#f4a259"/><ellipse cx="68" cy="50" rx="9" ry="7" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 43 q3 6 0 12 M56 42 q3 6 0 12 M68 43 q3 6 0 11" fill="none" ${A} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect class="leg a" x="44" y="64" width="9" height="30" rx="4.5" fill="${n.body}" ${A}/><rect class="leg b" x="84" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${A}/>
    ${e===2?'<ellipse cx="48.5" cy="92" rx="4" ry="2.5" fill="#fff"/><ellipse cx="88.5" cy="92" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(90,40,17,!1)}</svg>`}function Ps(e,t="stand"){const n=Yi[e]??Yi[0],s=t==="sleep",o=e===2,i=e===1,a=e===3,r=e===4,l=o?66:58,c=o?70:62,d=94-c,g=o?102:92,p=o?50:40,m=(W,P)=>i?`<rect class="leg ${P}" x="${W+2}" y="${c}" width="6" height="${d}" rx="3" fill="${n.body}" ${A}/><circle class="leg ${P}" cx="${W+5}" cy="91" r="6" fill="${n.body}" ${A}/>`:`<rect class="leg ${P}" x="${W}" y="${c}" width="10" height="${d}" rx="5" fill="${n.body}" ${A}/>`,v=i?`<circle cx="44" cy="58" r="15" fill="${n.body}" ${A}/><circle cx="70" cy="56" r="17" fill="${n.body}" ${A}/><ellipse cx="57" cy="58" rx="22" ry="12" fill="${n.body}"/>`:`<ellipse cx="${o?62:58}" cy="${l}" rx="${o?42:32}" ry="${o?13:17}" fill="${n.body}" ${A}/>`,$=r?`<circle cx="46" cy="54" r="5" fill="${pe}"/><circle cx="64" cy="62" r="4" fill="${pe}"/><circle cx="72" cy="50" r="3.5" fill="${pe}"/><circle cx="38" cy="64" r="3" fill="${pe}"/>`:"",x=i?`<g class="tail"><path d="M30 52 L22 38" ${A}/><circle cx="21" cy="34" r="7" fill="${n.body}" ${A}/></g>`:a?`<path class="tail" d="M30 52 Q10 50 14 30 Q20 40 30 46" fill="${n.body}" ${A}/>`:`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${pe}" stroke-width="9" stroke-linecap="round"/>`,f=!i&&!a?`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`:"",h=`
    ${i?`<circle cx="${g-2}" cy="${p-16}" r="10" fill="${n.body}" ${A}/>`:""}
    <circle cx="${g}" cy="${p}" r="17" fill="${n.body}" ${A}/>
    ${r?`<circle cx="${g-6}" cy="${p-8}" r="4" fill="${pe}"/>`:""}
    <ellipse cx="${g+13}" cy="${p+7}" rx="11" ry="8" fill="${n.snout}" ${A}/>
    <circle cx="${g+22}" cy="${p+4}" r="4" fill="${pe}"/>
    <path d="M${g+14} ${p+12} q4 3 8 0" fill="none" ${A} stroke-width="2"/>
    ${s?"":`<path class="tongue" d="M${g+16} ${p+13} q2 7 6 0" fill="#ff8fab" ${A} stroke-width="2"/>`}
    ${s?`<path d="M${g+2} ${p-4} q3 3 6 0" fill="none" ${A} stroke-width="2.4"/>`:`<circle cx="${g+5}" cy="${p-3}" r="3" fill="${pe}"/><circle cx="${g+6}" cy="${p-4}" r="1" fill="#fff"/>`}
    ${Xi(g+2,p+8)}
    ${i?`<circle cx="${g-9}" cy="${p+8}" r="9" fill="${n.ear}" ${A}/>`:`<ellipse class="ear" cx="${g-9}" cy="${p+4}" rx="7" ry="${a||o?14:12}" fill="${n.ear}" ${A} transform="rotate(12 ${g-9} ${p+4})"/>`}
    <path d="M${g-12} ${p+14} q10 6 20 2" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/><circle cx="${g-1}" cy="${p+19}" r="3" fill="#ffd166" ${A} stroke-width="1.5"/>`,b=i?`<g class="tail"><path d="M42 86 L28 80" ${A}/><circle cx="25" cy="78" r="7" fill="${n.body}" ${A}/></g>`:`<path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${pe}" stroke-width="9" stroke-linecap="round"/><path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`;return t==="sit"||t==="sleep"?`<svg viewBox="0 0 130 100" class="dogsvg ${s?"sleep":"sit"}">${b}
    <ellipse cx="60" cy="70" rx="22" ry="24" fill="${n.body}" ${A}/>${r?`<circle cx="54" cy="66" r="5" fill="${pe}"/><circle cx="64" cy="80" r="4" fill="${pe}"/>`:""}
    ${m(62,"a")}${m(74,"b")}<g transform="translate(-22 -2)">${h}</g></svg>`:`<svg viewBox="0 0 130 100" class="dogsvg stand">${x}${f}
    ${m(o?30:34,"b")}${m(o?82:72,"a")}
    ${v}${$}
    ${m(o?42:46,"a")}${m(o?94:84,"b")}
    ${h}</svg>`}const Al=e=>{let t=2166136261;for(const n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0},hn=(e,t)=>{let n=(e^Math.imul(t,2654435761))>>>0;return n^=n>>>15,n=Math.imul(n,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296},Sr=18,Rf={1:.35,2:.6};function Af(e,t,n){return e-t*Rf[n]}function Df(e,t){const s=Math.floor(t/1e3/2.8);return hn(Al(e||"pup"),s)<.62?"rest":"peek"}function Of(e,t,n,s,o=!1){const i=Al(e.name+":"+e.coat+":"+e.room+":"+Math.round(e.x)+(n?":t"+Math.round(n.x):"")),a=t/1e3,r=Math.floor(a/Sr),l=a-r*Sr;if(!n){const f=we=>Math.max(160,Math.min(2240,e.x+(hn(i,we)-.5)*760)),h=f(r-1);let b=f(r);const W=hn(i+7,r),P=W<.45?"nap":W<.75?"sit":"groom",D=!!(s&&P==="nap"&&hn(i+13,r)<.72);D&&s&&(b=Math.max(160,Math.min(2240,s.x)));const O=Math.abs(b-h),ne=Math.min(5,O/110);return l<ne&&!o?{x:h+(b-h)*(l/ne),mood:"walk",flip:b<h,perch:0,curl:0}:{x:b,mood:P,flip:b<h,perch:0,curl:D?1:0}}const c=Math.max(160,Math.min(2240,n.x)),d=hn(i+5,r)<.45?2:1,g=Math.max(160,Math.min(2240,c+(hn(i,r)-.5)*420)),p=Math.abs(c-g),m=Math.min(4.2,Math.max(.6,p/160)),v=c<g;if(l<m&&!o)return{x:g+(c-g)*(l/m),mood:"walk",flip:v,perch:0,curl:0};const $=hn(i+11,r),x=$<.34?"nap":$<.67?"sit":"play";return{x:c,mood:x,flip:v,perch:d,curl:0}}const Po="#5a3d5c",ee=`stroke="${Po}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,cs=[`<svg viewBox="0 0 48 48"><path d="M24 40 C16 32 6 26 10 16 C14 8 24 12 24 20 C24 12 34 8 38 16 C42 26 32 32 24 40 Z" fill="#ff6b9a" ${ee}/></svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd166" ${ee}/></svg>`,`<svg viewBox="0 0 48 48"><circle cx="24" cy="22" r="6" fill="#ff8fab" ${ee}/>${[0,60,120,180,240,300].map(e=>`<circle cx="${24+Math.cos(e*Math.PI/180)*12}" cy="${22+Math.sin(e*Math.PI/180)*12}" r="5" fill="#ffd166" ${ee}/>`).join("")}<path d="M24 34 V44" ${ee}/></svg>`,`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="10" fill="#ffb26b" ${ee}/><circle cx="34" cy="20" r="8" fill="#ffc46b" ${ee}/><path d="M28 14 L30 6 L36 14" fill="#ffb26b" ${ee}/><circle cx="32" cy="19" r="1.4" fill="${Po}"/><circle cx="37" cy="19" r="1.4" fill="${Po}"/></svg>`,`<svg viewBox="0 0 48 48">${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M8 ${30-t*4} Q24 ${10-t*3} 40 ${30-t*4}" fill="none" stroke="${e}" stroke-width="4"/>`).join("")}</svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l3 10 10 1 -8 6 3 10 -8 -5 -8 5 3 -10 -8 -6 10 -1z" fill="#fff3b0" ${ee}/><circle cx="12" cy="34" r="3" fill="#ff8fab" ${ee}/><circle cx="36" cy="36" r="2.4" fill="#bde0fe" ${ee}/></svg>`];function If(e){const t=e?`<g class="flag"><path d="M30 16 V6" ${ee}/><path d="M30 6 H42 L38 11 L42 16 H30 Z" fill="#ff6b6b" ${ee}/></g>`:`<g class="flag"><path d="M18 28 H28" ${ee}/><path d="M18 22 H28 L25 25 L28 28 H18 Z" fill="#ffd166" ${ee}/></g>`;return`<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="68" rx="18" ry="3" fill="#000" opacity=".12"/>
    <rect x="30" y="40" width="5" height="26" rx="2" fill="#c99366" ${ee}/>
    <path d="M8 40 V22 Q8 8 32 8 Q56 8 56 22 V40 Z" fill="#8ecae6" ${ee}/>
    <path d="M8 28 H56" ${ee}/>
    <rect x="14" y="32" width="36" height="16" rx="4" fill="#fff6e6" ${ee}/>
    <circle cx="32" cy="40" r="3" fill="${Po}"/>
    ${t}
  </svg>`}function qf(e,t=[]){const n=Tf(e,t);return n.ok?{ok:!0,text:n.text}:{ok:!1,msg:n.reason==="empty"?"Write a little note!":ii[n.reason]||"Oops, try different words!"}}const Nf={...ii,empty:"Write a little note!",slow:"Let's wait a moment!",full:"This mailbox is full!",notyours:"Only she can open her mail.",nohouse:"That house is not on the street.",gone:"That letter is already gone.",toobig:"The mailbox is too full!",presetsOnly:"Typing is turned off: pick a phrase!",unread:"She still has your letters! Wait until she reads them."};function jf(e){return Nf[e]||"Let's try that again!"}function Zf(e){let t="",n="",s=!1,o="",i=0,a=0,r=-1,l="",c="";const d=()=>document.getElementById("mailCue");d()?.addEventListener("click",()=>{e.openOwn()});function g(){t="",n="",document.getElementById("mailSheet")?.remove()}function p(){let f=document.getElementById("mailSheet");return f||(f=document.createElement("div"),f.id="mailSheet",f.className="sheet mailSheet",f.innerHTML='<div class="card" id="mailCard"></div>',document.body.appendChild(f),f.addEventListener("click",h=>{const b=h.target;if(b===f||b.closest('[data-m="close"]')){g();return}v(b)}),f.addEventListener("input",h=>{const b=h.target;if(b.id!=="mailText")return;const W=document.getElementById("mailCount");W&&(W.textContent=`${b.value.length}/${Nt}`)})),f}function m(){if(!t)return;const f=p().querySelector("#mailText")?.value??"",h=e.mine(t),b=e.lettersOf(t),W=e.houseName(t),P=p().querySelector("#mailCard");if(n&&h&&!s){const O=b.find(ne=>ne.id===n);if(O&&O.text){$(O);return}n=""}if(s||!h){const O=e.freeType(),ne=o?`Reply to ${e.houseName(o)||"your friend"}`:h?"Leave a letter":`Letter for ${W}`,we=O?`<textarea id="mailText" class="mailBox" maxlength="${Nt}" placeholder="Hi! Come play!"></textarea>
        <div class="mailCount" id="mailCount">0/${Nt}</div>`:`<h3>Phrase</h3><div class="phrases mailPhrases">${$s.map((dt,je)=>`<button type="button" data-phrase="${je}" class="${je===r?"on":""}">${_e(dt)}</button>`).join("")}</div>`;P.innerHTML=`<button class="close" data-m="close">✕</button><h2>${_e(ne)}</h2>
        <p class="hint">${O?"A short note. Your name goes on it for you.":"Pick a phrase. Your name goes on it for you."}</p>
        ${we}
        <h3>Paper</h3><div class="mailRow">${Qt.map((dt,je)=>`<button class="swatch ${je===i?"on":""}" data-color="${je}" style="background:${dt}" aria-label="Paper ${je+1}"></button>`).join("")}</div>
        <h3>Sticker</h3><div class="mailRow">${cs.slice(0,Cl).map((dt,je)=>`<button class="stick ${je===a?"on":""}" data-sticker="${je}" aria-label="Sticker ${je+1}">${dt}</button>`).join("")}</div>
        ${l?`<p class="mailErr" id="mailErr">${_e(l)}</p>`:""}
        <button class="mailSend" id="mailSend" type="button">Send</button>
        ${h&&b.length?'<button class="mailRow" data-act="back" type="button" style="margin-top:8px">Back to my mail</button>':""}`;const me=p().querySelector("#mailText");if(me&&f){me.value=f;const dt=document.getElementById("mailCount");dt&&(dt.textContent=`${f.length}/${Nt}`)}return}const D=b.length?b.slice().reverse().map(O=>O.text?`<button type="button" class="letter ${O.read?"":"fresh"}" data-letter="${_e(O.id)}" style="background:${Qt[O.color]??Qt[0]}">
        <span class="sticker">${cs[O.sticker]??cs[0]}</span>
        <span class="who">${_e(O.from)}</span><span class="when">${_e(Li(O.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${ee}/><path d="M4 8 L40 24 L76 8" fill="${Qt[O.color]??"#fff"}" ${ee}/></svg>
      </button>`:`<div class="letter" style="background:${Qt[O.color]??Qt[0]}"><span class="who">Your letter</span><span class="when">${_e(Li(O.at))}</span><span class="statusChip ${O.read?"read":""}">${O.read?"Read":"Delivered"}</span></div>`).join(""):'<p class="hint">No letters yet. Your flag pops up when one arrives!</p>';P.innerHTML=`<button class="close" data-m="close">✕</button><h2>${_e(W)} mailbox</h2>${D}
      <div class="mailRow"><button type="button" data-act="write">Write a letter</button></div>
      ${l?`<p class="mailErr">${_e(l)}</p>`:""}`}function v(f){const h=f.closest(".mailPhrases [data-phrase]");if(h){r=+h.dataset.phrase,l="",m();return}const b=f.closest("[data-color]");if(b){i=+b.dataset.color,m();return}const W=f.closest("[data-sticker]");if(W){a=+W.dataset.sticker,m();return}if(f.closest("#mailSend"))return x();const P=f.closest("[data-act]")?.dataset.act;if(P==="write"){s=!0,o="",n="",l="",m();return}if(P==="back"){s=!1,o="",n="",l="",m();return}if(P==="reply"){const me=e.houseOf(f.closest("[data-from]")?.dataset.from??"");if(!me){e.toast("They are not on the street anymore.");return}o=me,s=!0,n="",l="",t=me,m();return}if(P==="drop"){const me=f.closest("[data-id]")?.dataset.id??"";if(c!==me){c=me,e.toast("Tap again to throw it away");return}c="",e.drop(t,me);return}const D=f.closest("[data-letter]");if(!D)return;const O=D.dataset.letter,we=e.lettersOf(t).find(me=>me.id===O);we&&(!e.mine(t)||!we.text||(we.read||e.read(t,O),n=O,$(we)))}function $(f){const h=Ff(f.text),b=p().querySelector("#mailCard");b.innerHTML=`<button class="close" data-m="close">✕</button>
      <div class="letter open read" style="background:${Qt[f.color]??Qt[0]}" data-id="${_e(f.id)}" data-from="${_e(f.fromPid)}">
        <span class="sticker">${cs[f.sticker]??cs[0]}</span>
        <span class="who">${_e(f.from)}</span><span class="when">${_e(Li(f.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${ee}/><path class="flap" d="M4 8 L40 24 L76 8" fill="#fff" ${ee}/></svg>
        <p class="words">${_e(h??"")}</p>
        <span class="mailRow"><button type="button" data-act="reply">Reply</button><button type="button" class="throw" data-act="drop">${c===f.id?"Tap again":"Throw away"}</button></span>
      </div>
      <button type="button" data-act="back">All my mail</button>
      ${l?`<p class="mailErr">${_e(l)}</p>`:""}`}function x(){let f="";if(e.freeType()){const b=p().querySelector("#mailText")?.value??"",W=qf(b);if(!W.ok){l=W.msg,m();const P=p().querySelector("#mailText");P&&(P.value=b);return}f=W.text}else{if(r<0||r>=$s.length){l="Pick a phrase!",m();return}f=$s[r]}const h=o||t;l="",e.send(h,f,i,a),e.toast("On its way!"),e.mine(h)?(s=!1,o="",t=h,m()):g()}return{open(f,h,b,W){t=f,n="",s=!b,o="",l="",c="",i=0,a=0,r=-1,m()},fail(f){l=jf(f),t?m():e.toast(l)},refresh(){t&&m()},syncCue(f){d()?.classList.toggle("show",f)}}}function Ff(e){if(!e)return null;const t=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return!t||t.length>Nt?null:t}function _e(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const Dl=()=>wt("cozy-play");function Vf(){try{return localStorage.getItem(Dl())==="play"?"play":"decorate"}catch{return"decorate"}}function Gf(e){try{localStorage.setItem(Dl(),e)}catch{}}function Kf(e){return e==="kennel"?"kennel":e==="cat-tower"?"tower":e==="lamp"||/(^|:)lamp|starlamp|light/.test(e)?"lamp":e==="fridge"||e==="stove"||e==="vanity"||e==="bookshelf"||e==="window"||e==="mirror"||e==="tv"||/fridge|stove|cabinet|drawer|vanity/.test(e)?"open":e==="sofa"||e==="armchair"||e==="chair"||e==="stool"||e==="bed"||e==="crib"||/(sofa|armchair|chair|stool|bench)/.test(e)?"sit":"wiggle"}const Yf='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M34 8 l1.2 3 3 .4 -2.2 2 .6 3 -2.6-1.6 -2.6 1.6 .6-3 -2.2-2 3-.4z" fill="#ffd166" stroke="#5a3d5c" stroke-width="1.4"/></svg>',Xf='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 36 h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M8 14 l2 1 M40 34 l2 2 M8 40 l3 -1" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>';function Jf(e,t){let n="decorate";const s=e.querySelector("#modePlay"),o=e.querySelector("#modeDecorate");s.querySelector(".modeIco").innerHTML=Yf,o.querySelector(".modeIco").innerHTML=Xf;const i=()=>{const c=n==="play";document.body.classList.toggle("mode-play",c),s.classList.toggle("on",c),o.classList.toggle("on",!c),s.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-pressed",c?"false":"true")},a=(c,d)=>{n=c,d&&Gf(c),i(),t.onChange?.()};e.addEventListener("pointerdown",c=>c.stopPropagation()),e.addEventListener("click",c=>{const d=c.target.closest("[data-mode]");if(!d)return;const g=d.dataset.mode==="play"?"play":"decorate";a(g,t.ownHouse())}),i();let r=!1;return{mode:()=>n,isPlay:()=>n==="play",sync(c){a(c?Vf():"play",!1)},hint:()=>{if(r||!document.body.classList.contains("phone"))return;const c=wt("cozy-mode-hint");try{if(localStorage.getItem(c)){r=!0;return}}catch{r=!0;return}r=!0;const d=document.createElement("p");d.className="modeHint",d.textContent="Play: tap things! Decorate: move things!",e.appendChild(d);const g=()=>{d.remove();try{localStorage.setItem(c,"1")}catch{}};window.setTimeout(g,6500),d.addEventListener("click",g)}}}const ce="#5a3d5c",E=(e=4)=>`stroke="${ce}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Ea=600,st=250,dn=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})">
  <rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${E()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${E()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${E()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${E()}/>
  <circle cx="-18" cy="-78" r="9" fill="#fff" opacity=".35"/></g>`,eh=(e,t,n)=>`<g transform="translate(${e} ${t})"><path d="M0 0 V-16" ${E(3)}/>${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*6}" cy="${-20+Math.sin(s*Math.PI/180)*6}" r="5" fill="${n}" ${E(2)}/>`).join("")}<circle cx="0" cy="-20" r="4" fill="#ffd166" ${E(2)}/></g>`,Wr=e=>`<g transform="translate(${e} 0)">
  <rect x="-80" y="452" width="160" height="12" rx="6" fill="#ff9f68" ${E()}/><rect x="-80" y="470" width="160" height="12" rx="6" fill="#ff9f68" ${E()}/>
  <rect x="-70" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${E(3)}/><rect x="60" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${E(3)}/>
  <rect x="-86" y="490" width="172" height="14" rx="7" fill="#ffb385" ${E()}/></g>`;function th(){const e=Qa,t=Array.from({length:Math.floor((ve.x1-ve.x0+40)/34)},(n,s)=>`<path d="M${ve.x0-20+s*34} 470 V428 l8 -10 l8 10 V470 Z" fill="#fff6e6" ${E(3)}/>`).join("");return`<svg class="parkScene" viewBox="0 0 ${e} ${Ea}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient>
  <pattern id="pkCheck" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><rect width="15" height="15" fill="#ff8fab"/><rect x="15" y="15" width="15" height="15" fill="#ff8fab"/></pattern></defs>
  <rect width="${e}" height="440" fill="url(#pkSky)"/>
  ${[180,900,1600,2300].map((n,s)=>`<g transform="translate(${n} ${70+s%2*30})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <circle cx="${e-220}" cy="90" r="46" fill="#ffe066" ${E(4)}/>
  <path d="M-50 360 Q500 220 1100 340 T2300 330 T${e+100} 350 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#9fe0aa"/><path d="M0 410 H${e}" ${E(4)}/>
  <path d="M0 560 Q700 520 1400 565 T${e} 545 V600 H0 Z" fill="#f6e3c3" opacity=".9"/>
  ${dn(260,390,.9)}${dn(720,380,1.05,"#4fbf7a")}${dn(1230,385,.8)}${dn(1640,380,1,"#4fbf7a")}${dn(1990,388,.85)}${dn(2380,380,.95)}${dn(2860,390,.9,"#4fbf7a")}
  ${[[300,470,"#ff8fab"],[690,455,"#c9a0dc"],[1210,470,"#ffd166"],[1960,450,"#8ecae6"],[2390,470,"#ff8fab"],[1580,590,"#c9a0dc"],[140,585,"#ffd166"]].map(([n,s,o])=>eh(+n,+s,String(o))).join("")}
  <!-- gate back to the street -->
  <g><rect x="40" y="300" width="22" height="200" rx="6" fill="#c99366" ${E()}/><rect x="168" y="300" width="22" height="200" rx="6" fill="#c99366" ${E()}/>
    <path d="M30 312 Q115 240 200 312" fill="none" stroke="${ce}" stroke-width="16" stroke-linecap="round"/><path d="M30 312 Q115 240 200 312" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
    <rect x="62" y="252" width="106" height="36" rx="12" fill="#fff6e6" ${E(3)}/><text x="115" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="${ce}" font-family="Nunito, system-ui, sans-serif">PARK</text></g>
  <!-- swing set (seats are separate so they can swing) -->
  <g><path d="M350 ${st} L310 500 M350 ${st} L390 500 M650 ${st} L610 500 M650 ${st} L690 500" stroke="${ce}" stroke-width="14" stroke-linecap="round"/>
    <path d="M350 ${st} L310 500 M350 ${st} L390 500 M650 ${st} L610 500 M650 ${st} L690 500" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/>
    <rect x="330" y="${st-10}" width="340" height="20" rx="10" fill="#ff8fab" ${E()}/></g>
  <!-- slide -->
  <g><path d="M${N.ladder-20} 560 V${N.top.y} M${N.ladder+30} 560 V${N.top.y}" stroke="${ce}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${N.ladder-20} 560 V${N.top.y} M${N.ladder+30} 560 V${N.top.y}" stroke="#c9a0dc" stroke-width="6" stroke-linecap="round"/>
    ${[380,420,460,500,540].map(n=>`<path d="M${N.ladder-20} ${n} H${N.ladder+30}" ${E(5)}/>`).join("")}
    <rect x="${N.ladder-30}" y="${N.top.y-14}" width="100" height="18" rx="8" fill="#ffd166" ${E()}/>
    <path d="M${N.ladder+60} ${N.top.y-10} C 1000 ${N.top.y} 1010 520 ${N.bottom.x+40} 548 L${N.bottom.x+40} 572 C 990 548 975 ${N.top.y+30} ${N.ladder+60} ${N.top.y+14} Z" fill="#ffd166" ${E()}/>
    <path d="M${N.ladder+70} ${N.top.y-2} C 990 ${N.top.y+8} 1000 525 ${N.bottom.x+30} 552" fill="none" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/></g>
  <!-- splash pond -->
  <g class="pondArt"><ellipse cx="1420" cy="515" rx="185" ry="52" fill="#8ecae6" ${E()}/><ellipse cx="1420" cy="510" rx="150" ry="36" fill="#b5e3f5"/>
    <ellipse cx="1340" cy="520" rx="24" ry="9" fill="#80ed99" ${E(3)}/><ellipse cx="1500" cy="505" rx="20" ry="8" fill="#80ed99" ${E(3)}/>
    <g transform="translate(1440 500)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ffd166" ${E(3)}/><circle cx="16" cy="-12" r="9" fill="#ffd166" ${E(3)}/><path d="M24 -12 l8 2 l-8 3 z" fill="#ff9f68" ${E(2)}/><circle cx="18" cy="-14" r="1.8" fill="${ce}"/></g></g>
  <!-- picnic blanket -->
  <g><path d="M1670 530 L1910 530 L1940 580 L1640 580 Z" fill="url(#pkCheck)" ${E()}/>
    <g transform="translate(1915 520)"><rect x="-26" y="-20" width="52" height="32" rx="8" fill="#e6b88a" ${E(3)}/><path d="M-18 -20 Q0 -46 18 -20" fill="none" ${E(4)}/><circle cx="-10" cy="-24" r="7" fill="#ff6b6b" ${E(2)}/></g></g>
  ${Wr(2065)}${Wr(2265)}
  <!-- dog area -->
  <g>${t}<path d="M${ve.x0-20} 440 H${ve.x1+20}" ${E(3)}/>
    <g transform="translate(${ve.x0+10} 380)"><rect x="-6" y="0" width="12" height="70" fill="#c99366" ${E(3)}/><rect x="-55" y="-34" width="110" height="38" rx="10" fill="#fff6e6" ${E(3)}/>
      <text x="0" y="-8" text-anchor="middle" font-size="20" font-weight="900" fill="${ce}" font-family="Nunito, system-ui, sans-serif">DOGS 🐾</text></g>
    <g transform="translate(${ve.x1-30} 470)"><path d="M-50 0 V-60 L0 -100 L50 -60 V0 Z" fill="#ff8fab" ${E()}/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="${ce}" stroke-width="14" stroke-linecap="round"/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="#c9a0dc" stroke-width="8" stroke-linecap="round"/><path d="M-20 0 V-30 a20 20 0 0 1 40 0 V0 Z" fill="#5a3d5c"/></g>
    <g transform="translate(${ve.x0+120} 500)"><rect x="-12" y="-30" width="24" height="34" rx="8" fill="#ff6b6b" ${E(3)}/><rect x="-18" y="-18" width="36" height="8" rx="4" fill="#ff6b6b" ${E(3)}/><circle cx="0" cy="-32" r="10" fill="#ff6b6b" ${E(3)}/></g></g>
  </svg>`}const nh=`<svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M10 0 V222 M50 0 V222" stroke="${ce}" stroke-width="4"/><rect x="0" y="216" width="60" height="14" rx="6" fill="#ff9f68" ${E(3)}/></svg>`,sh=`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffd166" ${E(3)}/><path d="M6 16 Q20 24 34 16 M8 27 Q20 19 32 27" fill="none" stroke="#fff" stroke-width="3"/></svg>`,oh=`<svg viewBox="0 0 48 48"><rect x="20" y="28" width="8" height="14" rx="3" fill="#c99366" stroke="${ce}" stroke-width="3"/><circle cx="24" cy="20" r="13" fill="#5cc985" stroke="${ce}" stroke-width="3"/><circle cx="19" cy="16" r="3" fill="#fff" opacity=".5"/></svg>`,Ol=`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8" fill="#ff8fab" stroke="${ce}" stroke-width="3"/><circle cx="13" cy="20" r="4.5" fill="#ff8fab" stroke="${ce}" stroke-width="3"/><circle cx="20" cy="13" r="4.5" fill="#ff8fab" stroke="${ce}" stroke-width="3"/><circle cx="28" cy="13" r="4.5" fill="#ff8fab" stroke="${ce}" stroke-width="3"/><circle cx="35" cy="20" r="4.5" fill="#ff8fab" stroke="${ce}" stroke-width="3"/></svg>`,ih=`<svg viewBox="0 0 48 48"><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="${ce}" stroke-width="4" stroke-linecap="round"/><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="#ff9f68" stroke-width="2"/><path d="M16 40 V26 M24 40 V22 M32 40 V26" stroke="${ce}" stroke-width="3" stroke-linecap="round"/></svg>`,G="#5a3d5c",oe=`stroke="${G}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,Js=[{body:"#ffd6e0",roof:"#ff7aa8",door:"#8fd3ff",trim:"#fff6e6"},{body:"#d9f2ff",roof:"#5aa9e6",door:"#ffd166",trim:"#ffffff"},{body:"#e3f9d9",roof:"#5cc985",door:"#ff9f68",trim:"#fffbe6"},{body:"#fff1b8",roof:"#ff9f43",door:"#c9a0dc",trim:"#ffffff"},{body:"#eadcff",roof:"#9b7bd8",door:"#80ed99",trim:"#fff6fb"},{body:"#ffe0c7",roof:"#e07a5f",door:"#5fb0d8",trim:"#fffaf0"},{body:"#d8f5ef",roof:"#2fb3a3",door:"#ff8fab",trim:"#ffffff"},{body:"#fde2f3",roof:"#e879c6",door:"#ffd166",trim:"#fff"}];function Ji(e,t={}){const n=Js[(e%Js.length+Js.length)%Js.length],s=e%2===1,o=t.lit?"#fff3b0":"#cfe8ff",i=s?`<path d="M22 138 Q22 36 160 30 Q298 36 298 138 Z" fill="${n.roof}" ${oe}/><path d="M60 110 Q70 60 120 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`:`<path d="M14 140 L160 26 L306 140 Z" fill="${n.roof}" ${oe}/><path d="M70 110 L140 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`;return`<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="294" rx="150" ry="8" fill="#000" opacity=".12"/>
  <rect x="${s?232:220}" y="${s?36:44}" width="30" height="56" rx="6" fill="${n.trim}" ${oe}/>
  <rect x="44" y="124" width="232" height="168" rx="20" fill="${n.body}" ${oe}/>
  ${i}
  <circle cx="160" cy="${s?92:98}" r="18" fill="${o}" ${oe}/><path d="M160 ${s?74:80} V${s?110:116} M142 ${s?92:98} H178" ${oe}/>
  <rect x="62" y="160" width="62" height="58" rx="18" fill="${o}" ${oe}/><path d="M93 160 V218 M62 189 H124" ${oe}/>
  <rect x="196" y="160" width="62" height="58" rx="18" fill="${o}" ${oe}/><path d="M227 160 V218 M196 189 H258" ${oe}/>
  <rect x="56" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${oe}/><rect x="190" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${oe}/>
  <circle cx="72" cy="212" r="7" fill="#ff8fab" ${oe}/><circle cx="92" cy="208" r="7" fill="#ffd166" ${oe}/><circle cx="112" cy="212" r="7" fill="#ff8fab" ${oe}/>
  <circle cx="208" cy="212" r="7" fill="#c9a0dc" ${oe}/><circle cx="228" cy="208" r="7" fill="#80ed99" ${oe}/><circle cx="248" cy="212" r="7" fill="#c9a0dc" ${oe}/>
  <path d="M132 292 V226 Q132 196 160 196 Q188 196 188 226 V292 Z" fill="${n.door}" ${oe}/>
  <circle cx="176" cy="250" r="5" fill="${G}"/><path d="M146 222 Q160 212 174 222" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>
  <rect x="118" y="286" width="84" height="10" rx="5" fill="${n.trim}" ${oe}/>
</svg>`}const Ve={street:`<svg viewBox="0 0 48 48"><circle cx="16" cy="15" r="7" fill="#ffd166" stroke="${G}" stroke-width="3"/><circle cx="32" cy="15" r="7" fill="#ff8fab" stroke="${G}" stroke-width="3"/><circle cx="13.5" cy="14.5" r="1.2" fill="${G}"/><circle cx="18.5" cy="14.5" r="1.2" fill="${G}"/><circle cx="29.5" cy="14.5" r="1.2" fill="${G}"/><circle cx="34.5" cy="14.5" r="1.2" fill="${G}"/><path d="M13 18 q3 2.2 6 0 M29 18 q3 2.2 6 0" fill="none" stroke="${G}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 40 Q16 28 24 33 Q32 38 40 28" fill="none" stroke="#5cc985" stroke-width="4" stroke-linecap="round"/><circle cx="16" cy="36" r="2.2" fill="#fff" stroke="${G}" stroke-width="1.5"/><circle cx="32" cy="32" r="2.2" fill="#fff" stroke="${G}" stroke-width="1.5"/></svg>`,home:`<svg viewBox="0 0 48 48"><path d="M8 22 L24 8 L40 22 V40 H8 Z" fill="#ffd166" stroke="${G}" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 V28 H28 V40" fill="#fff" stroke="${G}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="20" r="2.4" fill="${G}"/></svg>`,lockOn:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q33 7 33 16 V22" fill="none" stroke="${G}" stroke-width="4"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#ffd166" stroke="${G}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${G}"/></svg>`,lockOff:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q31 7 32.5 13" fill="none" stroke="${G}" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#b6f0a8" stroke="${G}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${G}"/></svg>`,chat:`<svg viewBox="0 0 48 48"><path d="M8 12 Q8 6 14 6 H34 Q40 6 40 12 V26 Q40 32 34 32 H22 L13 40 V32 Q8 32 8 26 Z" fill="#fff3b0" stroke="${G}" stroke-width="3" stroke-linejoin="round"/><circle cx="17" cy="19" r="2.5" fill="${G}"/><circle cx="24" cy="19" r="2.5" fill="${G}"/><circle cx="31" cy="19" r="2.5" fill="${G}"/></svg>`,shield:`<svg viewBox="0 0 48 48"><path d="M24 5 L39 11 V23 Q39 36 24 43 Q9 36 9 23 V11 Z" fill="#c9a0dc" stroke="${G}" stroke-width="3" stroke-linejoin="round"/><path d="M17 24 L22 29 L31 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,solo:`<svg viewBox="0 0 48 48"><path d="M8 24 L24 9 L40 24 V41 H8 Z" fill="#ffd166" stroke="${G}" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="28" width="10" height="13" rx="4" fill="#fff" stroke="${G}" stroke-width="2.5"/><path d="M33 7 l2 4 4 .5 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.5z" fill="#ff8fab" stroke="${G}" stroke-width="1.5"/></svg>`};function Q(e,t=2600){const n=document.createElement("div");n.className="toast",n.textContent=e,(document.getElementById("toastLane")??document.body).appendChild(n),setTimeout(()=>n.classList.add("out"),t),setTimeout(()=>n.remove(),t+400)}function Il(){return new Promise(e=>{let t=0,n=0,s="",o=0;const i=document.createElement("div");i.className="sheet adult",i.innerHTML='<div class="card adultCard"></div>',document.body.appendChild(i);const a=i.firstElementChild,r=()=>{t=6+Math.floor(Math.random()*4),n=3+Math.floor(Math.random()*7),s="",l()},l=()=>{a.innerHTML=`<button class="close" data-k="x">✕</button><h2>Grown-ups only</h2><p class="q" data-q="${t*n}">What is ${t} × ${n}?</p>
        <div class="ans">${s||"&nbsp;"}</div>
        <div class="pad">${[1,2,3,4,5,6,7,8,9,"⌫",0,"OK"].map(d=>`<button data-k="${d}">${d}</button>`).join("")}</div>`},c=d=>{i.remove(),e(d)};a.addEventListener("click",d=>{const g=d.target.closest("[data-k]")?.dataset.k;if(g){if(g==="x")return c(!1);if(g==="⌫")s=s.slice(0,-1);else if(g==="OK"){if(+s===t*n)return c(!0);if(++o>=3)return c(!1);a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400),r();return}else s.length<3&&(s+=g);l()}}),i.addEventListener("click",d=>{d.target===i&&c(!1)}),r()})}const Te="#5a3d5c",V=`stroke="${Te}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Bi=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${Te}"/><circle cx="${t}" cy="${n}" r="3" fill="${Te}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,Si=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,eo='<ellipse cx="50" cy="97" rx="34" ry="3" fill="#000" opacity=".12"/>',ah=`<svg viewBox="0 0 40 30"><path d="M4 30 V16 Q4 2 20 2 Q36 2 36 16 V30 Z" fill="#3b2a3d" ${V}/><circle cx="14" cy="18" r="1.6" fill="#fff" opacity=".8"/><circle cx="22" cy="18" r="1.6" fill="#fff" opacity=".8"/></svg>`,rh=`<svg viewBox="0 0 48 30"><path d="M4 27 Q10 22 22 23 L42 23 Q46 27 42 28 H6 Z" fill="#cdeccf" ${V}/><circle cx="26" cy="15" r="11" fill="#ffb3c6" ${V}/><path d="M26 15 m-5 0 a5 5 0 1 1 5 5" fill="none" ${V}/><path d="M8 23 L5 13 M12 23 L12 13" ${V}/></svg>`,lh=`<svg viewBox="0 0 30 30"><path d="M15 2 l3.6 8 8.4 1 -6.3 5.8 1.8 8.4 -7.5 -4.4 -7.5 4.4 1.8 -8.4 L3 11 l8.4 -1z" fill="#fff3b0" ${V}/></svg>`,ch=`<svg viewBox="0 0 30 22"><ellipse cx="15" cy="13" rx="13" ry="8" fill="#e6b88a" ${V}/><circle cx="10" cy="11" r="1.8" fill="${Te}"/><circle cx="18" cy="14" r="1.8" fill="${Te}"/><circle cx="16" cy="9" r="1.5" fill="${Te}"/></svg>`,dh=`<svg viewBox="0 0 30 28"><path d="M15 26 C3 18 1 10 6 5 C10 1 14 4 15 7 C16 4 20 1 24 5 C29 10 27 18 15 26 Z" fill="#ffc8dd" ${V}/></svg>`,Uo=[{name:"Cada",room:"living",x:150,y:382,w:40,h:30,taps:3,spot:ah,hello:"Squeak! Hi Cada!",item:{kind:"egg:cada-mouse",name:"Cada's Mouse",cat:"secrets",w:80,holdable:!0,svg:`${eo}<path d="M78 74 Q96 68 92 52" stroke="#ff9bb5" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="28" ry="18" fill="#d6d6e8" ${V}/><circle cx="28" cy="40" r="13" fill="#d6d6e8" ${V}/><circle cx="62" cy="38" r="13" fill="#d6d6e8" ${V}/><circle cx="28" cy="40" r="7" fill="#ffc8dd"/><circle cx="62" cy="38" r="7" fill="#ffc8dd"/><circle cx="45" cy="56" r="20" fill="#e4e4f2" ${V}/>${Bi(38,52,54)}<circle cx="45" cy="64" r="3" fill="#ff8fab"/>${Si(32,58,62)}<text x="50" y="96" font-size="11" font-weight="900" text-anchor="middle" fill="${Te}">C</text>`}},{name:"Sloane",room:"living",x:2290,y:383,w:48,h:30,taps:3,spot:rh,hello:"Hi Sloane! ✨",item:{kind:"egg:sloane-snail",name:"Sloane's Rainbow Snail",cat:"secrets",w:110,holdable:!0,svg:`${eo}<path d="M6 92 Q14 80 36 82 L84 82 Q94 90 84 94 H10 Z" fill="#cdeccf" ${V}/><circle cx="56" cy="52" r="32" fill="#ff8fab" ${V}/><circle cx="56" cy="52" r="24" fill="#ffd166"/><circle cx="56" cy="52" r="17" fill="#80ed99"/><circle cx="56" cy="52" r="10" fill="#8ecae6"/><circle cx="56" cy="52" r="4" fill="#c9a0dc"/><circle cx="56" cy="52" r="32" fill="none" ${V}/><path d="M14 82 L8 60 M24 82 L24 60" ${V}/><circle cx="8" cy="58" r="4" fill="${Te}"/><circle cx="24" cy="58" r="4" fill="${Te}"/>${Si(14,30,76)}`}},{name:"Chloe",room:"bedroom",x:2230,y:92,w:30,h:30,taps:5,spot:lh,item:{kind:"egg:chloe-starlamp",name:"Chloe's Star Lamp",cat:"secrets",w:100,holdable:!0,svg:`${eo}<circle cx="50" cy="38" r="34" fill="#fff3b0" opacity=".6"/><path d="M50 6 l8 17 19 2.5 -14 13 4 19 -17 -9.5 -17 9.5 4 -19 -14 -13 19 -2.5z" fill="#ffd166" ${V}/>${Bi(43,57,38)}<path d="M45 46 q5 4 10 0" ${V} fill="none"/><rect x="46" y="66" width="8" height="22" rx="4" fill="#c9a0dc" ${V}/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#b388d6" ${V}/><text x="50" y="93" font-size="8" font-weight="900" text-anchor="middle" fill="#fff">CHLOE</text>`}},{name:"Quinn",room:"kitchen",x:80,y:588,w:30,h:22,taps:4,spot:ch,hello:"Woof! Hi Quinn!",item:{kind:"egg:quinn-pup",name:"Quinn's Cookie Pup",cat:"secrets",w:110,holdable:!0,svg:`${eo}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#e6b88a" ${V}/><circle cx="50" cy="44" r="27" fill="#f2d0a4" ${V}/><ellipse cx="24" cy="46" rx="10" ry="17" fill="#b07d54" ${V}/><ellipse cx="76" cy="46" rx="10" ry="17" fill="#b07d54" ${V}/>${Bi(41,59,42)}<ellipse cx="50" cy="53" rx="5" ry="4" fill="${Te}"/>${Si(34,66,54)}<circle cx="84" cy="80" r="10" fill="#e6b88a" ${V}/><circle cx="81" cy="78" r="1.8" fill="${Te}"/><circle cx="87" cy="82" r="1.8" fill="${Te}"/><text x="50" y="30" font-size="10" font-weight="900" text-anchor="middle" fill="${Te}">Q</text>`}},{name:"Reagan",room:"salon",x:2300,y:352,w:30,h:28,taps:5,spot:dh,item:{kind:"egg:reagan-frame",name:"Reagan's Frame",cat:"secrets",w:120,wall:!0,svg:`<rect x="8" y="10" width="84" height="84" rx="16" fill="#ff8fab" ${V}/><rect x="18" y="20" width="64" height="64" rx="10" fill="#fff3f7" ${V}/><text x="50" y="72" font-size="52" font-weight="900" text-anchor="middle" fill="#e879c6" stroke="${Te}" stroke-width="2.5">R</text><circle cx="14" cy="16" r="6" fill="#ffd166" ${V}/><circle cx="86" cy="88" r="6" fill="#ffd166" ${V}/><path d="M76 24 l2 4 4 .5 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.5z" fill="#ffd166"/>`}}],gh=Uo.map(e=>({...e.item,rooms:["any"],secret:e.name})),ql=wt("cozy-secrets"),li=()=>{try{return new Set(JSON.parse(localStorage.getItem(ql)??"[]"))}catch{return new Set}},fh=e=>localStorage.setItem(ql,JSON.stringify([...e]));function hh(e){const t=document.createElement("div");t.className="eggs",e.world.appendChild(t);const n=new Map;for(const o of Uo){const i=document.createElement("div");i.className="eggspot",i.dataset.egg=o.name,i.style.left=(o.x-o.w/2)/e.roomW*100+"%",i.style.top=(o.y-o.h)/e.roomH*100+"%",i.style.width=o.w/e.roomW*100+"%",i.style.height=o.h/e.roomH*100+"%",i.innerHTML=o.spot,t.appendChild(i),i.addEventListener("pointerdown",a=>a.stopPropagation()),i.addEventListener("click",a=>{a.stopPropagation();const r=Date.now(),l=n.get(o.name)??{n:0,t:0};if(l.n=r-l.t<1500?l.n+1:1,l.t=r,n.set(o.name,l),i.classList.remove("poke"),i.offsetWidth,i.classList.add("poke"),e.tap(),l.n<o.taps)return;l.n=0;const c=li(),d=!c.has(o.name);c.add(o.name),fh(c),ph(o,i),e.sparkle(),e.onFound(o.name,d)})}const s=()=>{const o=e.currentRoom();t.querySelectorAll(".eggspot").forEach(i=>{i.style.display=Uo.find(a=>a.name===i.dataset.egg).room===o?"":"none"})};return s(),{update:s}}function ph(e,t){if(e.hello){const s=document.createElement("div");s.className="eggpop",s.innerHTML=`<div class="eggcritter"><svg viewBox="0 0 100 100">${e.item.svg}</svg></div><div class="bubble">${e.hello}</div>`,t.appendChild(s),setTimeout(()=>s.remove(),3200)}const n=document.createElement("div");n.className="eggbanner",n.innerHTML=`<span class="sp">✨</span><span class="nm">${[...e.name].map((s,o)=>`<i style="animation-delay:${o*70}ms">${s}</i>`).join("")}</span><span class="sp">✨</span>`,document.body.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3100),Nl()}function Nl(e=70){const t=["#ff8fab","#ffd166","#8ecae6","#80ed99","#c9a0dc","#ff9f68"],n=document.createElement("div");n.className="confetti",document.body.appendChild(n);for(let s=0;s<e;s++){const o=document.createElement("i");o.style.left=Math.random()*100+"vw",o.style.background=t[s%t.length],o.style.animationDelay=Math.random()*.5+"s",o.style.animationDuration=1.6+Math.random()*1.2+"s",o.style.setProperty("--r",Math.random()*720-360+"deg"),o.style.setProperty("--dx",Math.random()*160-80+"px"),s%3===0&&(o.style.borderRadius="50%"),n.appendChild(o)}setTimeout(()=>n.remove(),3600)}const uh=`[
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
`,mh=`[
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
]`,yh="/kids-house-game/assets/alarm-clock-DOVobLzL.png",kh="/kids-house-game/assets/alarm-clock-BCd1-e86.svg",vh="/kids-house-game/assets/bedtime-snack-COvX4Nqo.png",bh="/kids-house-game/assets/bedtime-snack-BoNDQqOK.svg",wh="/kids-house-game/assets/book-stack-BlyqbTA1.png",$h="/kids-house-game/assets/book-stack-upnp1NwG.svg",_h="/kids-house-game/assets/bunk-bed-COiQly1s.png",xh="/kids-house-game/assets/bunk-bed-YZiRWNFR.svg",Mh="/kids-house-game/assets/bunny-slippers-DajXa_JK.png",Lh="/kids-house-game/assets/bunny-slippers-PNucIc_Q.svg",Ch="/kids-house-game/assets/canopy-bed-Db9GIfyT.png",Bh="/kids-house-game/assets/canopy-bed-BwWkRhe2.svg",Sh="/kids-house-game/assets/cat-bed-ChP4s69B.png",Wh="/kids-house-game/assets/cat-bed-B8ULFbHc.svg",Th="/kids-house-game/assets/cloud-rug-Bv3GScgR.png",Ph="/kids-house-game/assets/cloud-rug-CFl6aZc5.svg",Uh="/kids-house-game/assets/cloud-shelf-BAmU3DSp.png",Hh="/kids-house-game/assets/cloud-shelf-DF5b_IoZ.svg",Qh="/kids-house-game/assets/cork-board-B8yw-MFd.png",Eh="/kids-house-game/assets/cork-board-Bj5OuLbv.svg",zh="/kids-house-game/assets/daisy-pot-BQDVlAug.png",Rh="/kids-house-game/assets/daisy-pot-Cy8SrSS6.svg",Ah="/kids-house-game/assets/desk-UTaBcI2Q.png",Dh="/kids-house-game/assets/desk-2rRtV3Vk.svg",Oh="/kids-house-game/assets/dino-plush-yhz7rVZD.png",Ih="/kids-house-game/assets/dino-plush-Dq_qccf0.svg",qh="/kids-house-game/assets/doll-house-DfYMaHqJ.png",Nh="/kids-house-game/assets/doll-house-BrC3RiST.svg",jh="/kids-house-game/assets/dresser-jJcAkDG_.png",Zh="/kids-house-game/assets/dresser-__9TGuYc.svg",Fh="/kids-house-game/assets/egg-chair-DobnnZdC.png",Vh="/kids-house-game/assets/egg-chair-CtiaqWNQ.svg",Gh="/kids-house-game/assets/floor-fan-C2R5oDHp.png",Kh="/kids-house-game/assets/floor-fan-Dt9SIAmB.svg",Yh="/kids-house-game/assets/guinea-pig-BzHyXlGo.png",Xh="/kids-house-game/assets/guinea-pig-CwLeNU_S.svg",Jh="/kids-house-game/assets/hamster-cage-zv59jo6b.png",ep="/kids-house-game/assets/hamster-cage-lQ6r7saV.svg",tp="/kids-house-game/assets/heart-rug-DYGPCKpT.png",np="/kids-house-game/assets/heart-rug-CBDvH6Q6.svg",sp="/kids-house-game/assets/lava-lamp-Df-lJpLx.png",op="/kids-house-game/assets/lava-lamp-DEuHvlco.svg",ip="/kids-house-game/assets/moon-night-light-JPI5SkUV.png",ap="/kids-house-game/assets/moon-night-light-CAKsjYZv.svg",rp="/kids-house-game/assets/nightstand-D3WOPlqw.png",lp="/kids-house-game/assets/nightstand-Bgsh0YUi.svg",cp="/kids-house-game/assets/paper-lantern-mpw1jXzL.png",dp="/kids-house-game/assets/paper-lantern-CErOGyrT.svg",gp="/kids-house-game/assets/piggy-bank-DaSktUUA.png",fp="/kids-house-game/assets/piggy-bank-DsHrmOcp.svg",hp="/kids-house-game/assets/plant-stand-BpU338ra.png",pp="/kids-house-game/assets/plant-stand-DDyIDaL0.svg",up="/kids-house-game/assets/play-tent-ih6xOGXC.png",mp="/kids-house-game/assets/play-tent-Bsawe52j.svg",yp="/kids-house-game/assets/star-mobile-Bqyd_ikl.png",kp="/kids-house-game/assets/star-mobile-DzOGs-Jo.svg",vp="/kids-house-game/assets/toy-chest-DhEoVFj0.png",bp="/kids-house-game/assets/toy-chest-6iPrDiZH.svg",wp="/kids-house-game/assets/toy-robot-Bfkjfj_6.png",$p="/kids-house-game/assets/toy-robot-OaCEwmDT.svg",_p="/kids-house-game/assets/toy-train-DILjZiya.png",xp="/kids-house-game/assets/toy-train-D5GqAnpy.svg",Mp="/kids-house-game/assets/unicorn-plush-5YQqQjND.png",Lp="/kids-house-game/assets/unicorn-plush-C0W1eEs9.svg",Cp="/kids-house-game/assets/wardrobe-sJcJSWZ2.png",Bp="/kids-house-game/assets/wardrobe-Dn492IK0.svg",Sp="/kids-house-game/assets/bananas-D4irRkGy.png",Wp="/kids-house-game/assets/bananas-aPQwdEVo.svg",Tp="/kids-house-game/assets/bar-stool-xbwaa01H.png",Pp="/kids-house-game/assets/bar-stool-DWxhX1Ah.svg",Up="/kids-house-game/assets/bread-loaf-DKmR5wPN.png",Hp="/kids-house-game/assets/bread-loaf-C9cEAYcl.svg",Qp="/kids-house-game/assets/chick-DCnoMwEt.png",Ep="/kids-house-game/assets/chick-BTEVfgqU.svg",zp="/kids-house-game/assets/china-hutch-K3xtlmqi.png",Rp="/kids-house-game/assets/china-hutch-BTmMY6rg.svg",Ap="/kids-house-game/assets/cocoa-mug-BmqSzNJ6.png",Dp="/kids-house-game/assets/cocoa-mug-CraNCc9b.svg",Op="/kids-house-game/assets/cookie-jar-CZsO9PSp.png",Ip="/kids-house-game/assets/cookie-jar-ripj0oyT.svg",qp="/kids-house-game/assets/cooking-pot-BSKPlqyT.png",Np="/kids-house-game/assets/cooking-pot-BWtfOm9f.svg",jp="/kids-house-game/assets/cupcake-KO1KLKav.png",Zp="/kids-house-game/assets/cupcake-DFCw42xb.svg",Fp="/kids-house-game/assets/dish-rack-DICSEn5E.png",Vp="/kids-house-game/assets/dish-rack-BpVmmU6k.svg",Gp="/kids-house-game/assets/fruit-bowl-BL5EkaC8.png",Kp="/kids-house-game/assets/fruit-bowl-Dw9lsB3B.svg",Yp="/kids-house-game/assets/frying-pan-BocrLcES.png",Xp="/kids-house-game/assets/frying-pan-CTBY6MC_.svg",Jp="/kids-house-game/assets/happy-fridge-BTbpm-W1.png",e0="/kids-house-game/assets/happy-fridge-D7ENuEJs.svg",t0="/kids-house-game/assets/herb-box-DFtC2qBN.png",n0="/kids-house-game/assets/herb-box-CdRxefnV.svg",s0="/kids-house-game/assets/high-chair-DZCqRJV8.png",o0="/kids-house-game/assets/high-chair-BQtLYlq4.svg",i0="/kids-house-game/assets/ice-cream-CLLMXjn9.png",a0="/kids-house-game/assets/ice-cream-DydSyNXx.svg",r0="/kids-house-game/assets/kettle-DScYOeEK.png",l0="/kids-house-game/assets/kettle-D1nuAiG_.svg",c0="/kids-house-game/assets/kitchen-counter-cZcDRQIw.png",d0="/kids-house-game/assets/kitchen-counter-C8sTAZ-V.svg",g0="/kids-house-game/assets/kitchen-sink-DrP43iga.png",f0="/kids-house-game/assets/kitchen-sink-CYjDcd1n.svg",h0="/kids-house-game/assets/lemon-tree-BwA7W0cM.png",p0="/kids-house-game/assets/lemon-tree-CZz-Vy3P.svg",u0="/kids-house-game/assets/microwave-BJRDd-L-.png",m0="/kids-house-game/assets/microwave-lopm-FCT.svg",y0="/kids-house-game/assets/milk-bottle-D7UB6VD8.png",k0="/kids-house-game/assets/milk-bottle-DxcUA6XT.svg",v0="/kids-house-game/assets/pancakes-CbisCK-C.png",b0="/kids-house-game/assets/pancakes-CLqxnc5R.svg",w0="/kids-house-game/assets/pantry-shelf-DI_CgvVD.png",$0="/kids-house-game/assets/pantry-shelf-Azdxpmzd.svg",_0="/kids-house-game/assets/pendant-lamp-BhZanag5.png",x0="/kids-house-game/assets/pendant-lamp-fZv6y1p0.svg",M0="/kids-house-game/assets/pet-bowl-Oe3KGELz.png",L0="/kids-house-game/assets/pet-bowl-ETL_EOAP.svg",C0="/kids-house-game/assets/rice-cooker-DUTXsBbb.png",B0="/kids-house-game/assets/rice-cooker-JX0L4bi2.svg",S0="/kids-house-game/assets/runner-rug-AYIsQudU.png",W0="/kids-house-game/assets/runner-rug-BbUgZFy4.svg",T0="/kids-house-game/assets/spice-rack-8ll-6Q2f.png",P0="/kids-house-game/assets/spice-rack-D9kAw-vT.svg",U0="/kids-house-game/assets/stand-mixer-CP2fpC-Q.png",H0="/kids-house-game/assets/stand-mixer-CZrLn00l.svg",Q0="/kids-house-game/assets/teapot-iFnJNGiA.png",E0="/kids-house-game/assets/teapot-CtPOJzEm.svg",z0="/kids-house-game/assets/toaster-T2WkZkdo.png",R0="/kids-house-game/assets/toaster-CNk0hJDw.svg",A0="/kids-house-game/assets/utensil-rail-_vjcgBpy.png",D0="/kids-house-game/assets/utensil-rail-B0QkGP3A.svg",O0="/kids-house-game/assets/watermelon-slice-yHBcfKGj.png",I0="/kids-house-game/assets/watermelon-slice-VzvgalD5.svg",q0="/kids-house-game/assets/aquarium-rYRAu69m.png",N0="/kids-house-game/assets/aquarium-BlhJ9UCr.svg",j0="/kids-house-game/assets/arc-floor-lamp-CBq3G9j8.png",Z0="/kids-house-game/assets/arc-floor-lamp-DL5cEVzq.svg",F0="/kids-house-game/assets/bean-bag-CMLYRsbz.png",V0="/kids-house-game/assets/bean-bag-CauyDuZQ.svg",G0="/kids-house-game/assets/bird-cage-qj5P0te2.png",K0="/kids-house-game/assets/bird-cage-xqeVahX7.svg",Y0="/kids-house-game/assets/blanket-basket-5IQiUSS2.png",X0="/kids-house-game/assets/blanket-basket-B4LREUo9.svg",J0="/kids-house-game/assets/building-blocks-CzqAFUNB.png",eu="/kids-house-game/assets/building-blocks-DbtoodPT.svg",tu="/kids-house-game/assets/coffee-table-iKZ20Gpy.png",nu="/kids-house-game/assets/coffee-table-ZYO2ApH6.svg",su="/kids-house-game/assets/comfy-armchair-U_SI3sk9.png",ou="/kids-house-game/assets/comfy-armchair-tjNYbfgO.svg",iu="/kids-house-game/assets/cubby-shelf-B0De91CO.png",au="/kids-house-game/assets/cubby-shelf-CLzTUpiz.svg",ru="/kids-house-game/assets/daisy-rug-BqSOjPlJ.png",lu="/kids-house-game/assets/daisy-rug-CvOlxjsu.svg",cu="/kids-house-game/assets/fiddle-leaf-fig-DnvG8l2j.png",du="/kids-house-game/assets/fiddle-leaf-fig-DiUNW4Q_.svg",gu="/kids-house-game/assets/fireplace-C9azNipx.png",fu="/kids-house-game/assets/fireplace-CqxIMN3Z.svg",hu="/kids-house-game/assets/globe-C-L7vS0t.png",pu="/kids-house-game/assets/globe-DN0sih3W.svg",uu="/kids-house-game/assets/hanging-planter-DGgUXZpP.png",mu="/kids-house-game/assets/hanging-planter-M9IHqztp.svg",yu="/kids-house-game/assets/monstera-plant-BbGZQtOh.png",ku="/kids-house-game/assets/monstera-plant-CLmuB_RM.svg",vu="/kids-house-game/assets/piano-DpS7nvdq.png",bu="/kids-house-game/assets/piano-Y0KQ4rD2.svg",wu="/kids-house-game/assets/popcorn-CFk12JbR.png",$u="/kids-house-game/assets/popcorn-BD2d8sUH.svg",_u="/kids-house-game/assets/pouf-DY0Vcx75.png",xu="/kids-house-game/assets/pouf-as0li8On.svg",Mu="/kids-house-game/assets/rainbow-rug-DwzLb6aY.png",Lu="/kids-house-game/assets/rainbow-rug-C5ZVauOA.svg",Cu="/kids-house-game/assets/rainbow-wall-art--5LLrrQJ.png",Bu="/kids-house-game/assets/rainbow-wall-art-CCXUPPen.svg",Su="/kids-house-game/assets/retro-radio-BIX4GYkL.png",Wu="/kids-house-game/assets/retro-radio-B3T98xMQ.svg",Tu="/kids-house-game/assets/rocking-chair-CDLlJFiP.png",Pu="/kids-house-game/assets/rocking-chair-BgoIQu5H.svg",Uu="/kids-house-game/assets/rocking-horse-Iz-CpscK.png",Hu="/kids-house-game/assets/rocking-horse-1WLLV43R.svg",Qu="/kids-house-game/assets/snake-plant-DgPna4k9.png",Eu="/kids-house-game/assets/snake-plant-BGDwPcMj.svg",zu="/kids-house-game/assets/string-lights-nDUZa5m1.png",Ru="/kids-house-game/assets/string-lights-DGC0Ni2I.svg",Au="/kids-house-game/assets/succulent-trio-VYNH-o5B.png",Du="/kids-house-game/assets/succulent-trio-uPD-ljlL.svg",Ou="/kids-house-game/assets/tassel-rug-BBXtknxh.png",Iu="/kids-house-game/assets/tassel-rug-DolXtxfQ.svg",qu="/kids-house-game/assets/throw-pillow-BjuGXMYA.png",Nu="/kids-house-game/assets/throw-pillow-qWyWQ9cT.svg",ju="/kids-house-game/assets/toy-car-Bwrt0-AT.png",Zu="/kids-house-game/assets/toy-car-CTJy5H4V.svg",Fu="/kids-house-game/assets/tulip-vase-CpQUgXPR.png",Vu="/kids-house-game/assets/tulip-vase-o2vjI1Hg.svg",Gu="/kids-house-game/assets/turtle-Bf8_yRql.png",Ku="/kids-house-game/assets/turtle-B9Y6NDSv.svg",Yu="/kids-house-game/assets/tv-stand-DnwT-hn4.png",Xu="/kids-house-game/assets/tv-stand-CcLHFc1J.svg",Ju="/kids-house-game/assets/wall-shelf-Bs6mROe1.png",em="/kids-house-game/assets/wall-shelf-CCWuZ6Xl.svg",tm="/kids-house-game/assets/cc-bakery-shelf-dMrnZVB3.png",nm="/kids-house-game/assets/cc-bakery-shelf-BxdhLTTC.svg",sm="/kids-house-game/assets/cc-breakfast-table-DwHbMV2p.png",om="/kids-house-game/assets/cc-breakfast-table-DwaO0eFy.svg",im="/kids-house-game/assets/cc-bubble-chair-DuDi-bRz.png",am="/kids-house-game/assets/cc-bubble-chair-DncHA7F-.svg",rm="/kids-house-game/assets/cc-canopy-daybed-CAZpSo2a.png",lm="/kids-house-game/assets/cc-canopy-daybed-CVbt6QDr.svg",cm="/kids-house-game/assets/cc-cloud-beanbag-BYcBLKf9.png",dm="/kids-house-game/assets/cc-cloud-beanbag-SM0m-3qY.svg",gm="/kids-house-game/assets/cc-cloud-lamp-v0UO1VrK.png",fm="/kids-house-game/assets/cc-cloud-lamp-BWwxoCux.svg",hm="/kids-house-game/assets/cc-cottage-aquarium-XYuN1CnR.png",pm="/kids-house-game/assets/cc-cottage-aquarium-iY2D26Vq.svg",um="/kids-house-game/assets/cc-cupcake-stand-jKA3zoCC.png",mm="/kids-house-game/assets/cc-cupcake-stand-B08kdXZL.svg",ym="/kids-house-game/assets/cc-dryer-chair-CP8q6yyq.png",km="/kids-house-game/assets/cc-dryer-chair-DQmosxUz.svg",vm="/kids-house-game/assets/cc-fairy-garland-B4DVLP6L.png",bm="/kids-house-game/assets/cc-fairy-garland-BncKvkRL.svg",wm="/kids-house-game/assets/cc-fairy-shelf-DSmhC08i.png",$m="/kids-house-game/assets/cc-fairy-shelf-CE6x7J1w.svg",_m="/kids-house-game/assets/cc-flower-kettle-DZFkbEk5.png",xm="/kids-house-game/assets/cc-flower-kettle-ZTbAh26L.svg",Mm="/kids-house-game/assets/cc-flower-lamp-hc1e4xxL.png",Lm="/kids-house-game/assets/cc-flower-lamp-CS2T2S89.svg",Cm="/kids-house-game/assets/cc-heart-bed-BtOx4_a4.png",Bm="/kids-house-game/assets/cc-heart-bed-76-z9nJg.svg",Sm="/kids-house-game/assets/cc-heart-clock-CLtzUj8w.png",Wm="/kids-house-game/assets/cc-heart-clock-ByixSFru.svg",Tm="/kids-house-game/assets/cc-heart-pouf-C3vCLnoM.png",Pm="/kids-house-game/assets/cc-heart-pouf-DH5J2s2J.svg",Um="/kids-house-game/assets/cc-heart-rug-CpvyM_wf.png",Hm="/kids-house-game/assets/cc-heart-rug-Jwmh-m0j.svg",Qm="/kids-house-game/assets/cc-jewel-box-DZ6IxYiU.png",Em="/kids-house-game/assets/cc-jewel-box-qMbIQmo4.svg",zm="/kids-house-game/assets/cc-light-vanity-BxKLJiVW.png",Rm="/kids-house-game/assets/cc-light-vanity-DD4uQJ_7.svg",Am="/kids-house-game/assets/cc-macaron-jar-NI43JiPM.png",Dm="/kids-house-game/assets/cc-macaron-jar-A0sT-Lvj.svg",Om="/kids-house-game/assets/cc-macrame-swing-x8sop4y4.png",Im="/kids-house-game/assets/cc-macrame-swing-qIcoPp0o.svg",qm="/kids-house-game/assets/cc-mani-chair-C1J_zCFX.png",Nm="/kids-house-game/assets/cc-mani-chair-7AWb60tv.svg",jm="/kids-house-game/assets/cc-mint-fridge-7zQk2-Kj.png",Zm="/kids-house-game/assets/cc-mint-fridge-Cc87e_gW.svg",Fm="/kids-house-game/assets/cc-mushroom-stool-DeoO7P27.png",Vm="/kids-house-game/assets/cc-mushroom-stool-B9-y9WNf.svg",Gm="/kids-house-game/assets/cc-pastel-range-CXu-Gr6f.png",Km="/kids-house-game/assets/cc-pastel-range-D6cjzJTl.svg",Ym="/kids-house-game/assets/cc-perfume-tray-DkUHaA_i.png",Xm="/kids-house-game/assets/cc-perfume-tray-DN4chcIn.svg",Jm="/kids-house-game/assets/cc-petal-table-DadCDnSy.png",e1="/kids-house-game/assets/cc-petal-table-QrNho7KH.svg",t1="/kids-house-game/assets/cc-plant-wall-CCxqRxsH.png",n1="/kids-house-game/assets/cc-plant-wall-BMii8_kR.svg",s1="/kids-house-game/assets/cc-reading-nook-Eq4Eh0MW.png",o1="/kids-house-game/assets/cc-reading-nook-wiDgasP8.svg",i1="/kids-house-game/assets/cc-record-player-LmfaPaE5.png",a1="/kids-house-game/assets/cc-record-player-BoxZhHLy.svg",r1="/kids-house-game/assets/cc-ribbon-mirror-BEsGok51.png",l1="/kids-house-game/assets/cc-ribbon-mirror-DiCje_iy.svg",c1="/kids-house-game/assets/cc-scallop-curtains-Cvab-FzV.png",d1="/kids-house-game/assets/cc-scallop-curtains-Bzhy2peV.svg",g1="/kids-house-game/assets/cc-scallop-loveseat-CR3Z2O-W.png",f1="/kids-house-game/assets/cc-scallop-loveseat-Dfi7dg3b.svg",h1="/kids-house-game/assets/cc-star-dresser-b15t-WLI.png",p1="/kids-house-game/assets/cc-star-dresser-2wqSnsip.svg",u1="/kids-house-game/assets/cc-teapot-set-ygQBLdbl.png",m1="/kids-house-game/assets/cc-teapot-set-DnZlJvn7.svg",y1="/kids-house-game/assets/cc-window-seat-D-Rfuuwm.png",k1="/kids-house-game/assets/cc-window-seat-BCOise4Z.svg",v1="/kids-house-game/assets/arched-shelf-Dt4oWiBK.png",b1="/kids-house-game/assets/arched-shelf-XtiqRVaT.svg",w1="/kids-house-game/assets/blob-rug-Ckw1kSsa.png",$1="/kids-house-game/assets/blob-rug-Deh5k10s.svg",_1="/kids-house-game/assets/bubbly-plant-CV9ioei6.png",x1="/kids-house-game/assets/bubbly-plant-CFTOJd5Y.svg",M1="/kids-house-game/assets/bud-vase-Bzj5qGgr.png",L1="/kids-house-game/assets/bud-vase-BF-nd69Q.svg",C1="/kids-house-game/assets/comb-brush-CfTGGk1L.png",B1="/kids-house-game/assets/comb-brush-oPJeQv0v.svg",S1="/kids-house-game/assets/cream-jars-dLRXypJR.png",W1="/kids-house-game/assets/cream-jars-D6bxrnJR.svg",T1="/kids-house-game/assets/drop-lamp-DWqiPjZB.png",P1="/kids-house-game/assets/drop-lamp-CJg63ZKz.svg",U1="/kids-house-game/assets/droplet-buddy-DCjbvrlK.png",H1="/kids-house-game/assets/droplet-buddy-DTpHggFh.svg",Q1="/kids-house-game/assets/fancy-sofa-BRlr2j8I.png",E1="/kids-house-game/assets/fancy-sofa-kq2L0ob5.svg",z1="/kids-house-game/assets/flower-cart-C3W7v2RD.png",R1="/kids-house-game/assets/flower-cart-BWgfg0s_.svg",A1="/kids-house-game/assets/foot-spa-HwiSNgdS.png",D1="/kids-house-game/assets/foot-spa-DdA5_fj_.svg",O1="/kids-house-game/assets/globe-pendants-ChKRw_Bp.png",I1="/kids-house-game/assets/globe-pendants-DNV5WnAO.svg",q1="/kids-house-game/assets/glow-mirror-D4P3UibJ.png",N1="/kids-house-game/assets/glow-mirror-C_dTGwQc.svg",j1="/kids-house-game/assets/gold-floor-mirror-CSYqaszS.png",Z1="/kids-house-game/assets/gold-floor-mirror-jfPQepmr.svg",F1="/kids-house-game/assets/hair-dryer-_nFRnXBv.png",V1="/kids-house-game/assets/hair-dryer-CAkhCf7J.svg",G1="/kids-house-game/assets/heart-plant-CN47o4my.png",K1="/kids-house-game/assets/heart-plant-fSU4uLVy.svg",Y1="/kids-house-game/assets/heart-pouf-b76ZFT07.png",X1="/kids-house-game/assets/heart-pouf-BMVPBVKJ.svg",J1="/kids-house-game/assets/lilac-curtain-94MUZIqr.png",e2="/kids-house-game/assets/lilac-curtain-D_mFsZKu.svg",t2="/kids-house-game/assets/lotion-trio-wGXg7qdC.png",n2="/kids-house-game/assets/lotion-trio-D3lKwvho.svg",s2="/kids-house-game/assets/mani-lamp-B6MLP1xK.png",o2="/kids-house-game/assets/mani-lamp-B4SmvhvS.svg",i2="/kids-house-game/assets/nail-table-CP0_pEA8.png",a2="/kids-house-game/assets/nail-table-C3FitmuG.svg",r2="/kids-house-game/assets/pebble-rug-BgHMxQ6Q.png",l2="/kids-house-game/assets/pebble-rug-DHBZUggl.svg",c2="/kids-house-game/assets/perfume-bottle-F_MkREQh.png",d2="/kids-house-game/assets/perfume-bottle-BcNXSWTW.svg",g2="/kids-house-game/assets/pink-fountain-DtB69ljQ.png",f2="/kids-house-game/assets/pink-fountain-DQ3CIetr.svg",h2="/kids-house-game/assets/pink-vanity-CPmOesS7.png",p2="/kids-house-game/assets/pink-vanity-qE3SwdD6.svg",u2="/kids-house-game/assets/polish-bottle-B2f4PsGZ.png",m2="/kids-house-game/assets/polish-bottle-VWed8EQ-.svg",y2="/kids-house-game/assets/polish-rack-ANlncwDe.png",k2="/kids-house-game/assets/polish-rack-8Ph2n2nM.svg",v2="/kids-house-game/assets/reception-desk-DnhqgkHu.png",b2="/kids-house-game/assets/reception-desk-D4Gevx64.svg",w2="/kids-house-game/assets/salon-chair-Bl31ZE_E.png",$2="/kids-house-game/assets/salon-chair-Wj2sOSW8.svg",_2="/kids-house-game/assets/scent-candle-BYUsO9s1.png",x2="/kids-house-game/assets/scent-candle-BEUE-6Uv.svg",M2="/kids-house-game/assets/spray-bottle-DJKZeNmL.png",L2="/kids-house-game/assets/spray-bottle-Bc8iuceJ.svg",C2="/kids-house-game/assets/star-wall-sign-D_9XhB91.png",B2="/kids-house-game/assets/star-wall-sign-DvenTqvU.svg",S2="/kids-house-game/assets/swivel-stool-BGAwWXNX.png",W2="/kids-house-game/assets/swivel-stool-P-Egqq_Z.svg",T2="/kids-house-game/assets/tiered-tray-CGuVyK1K.png",P2="/kids-house-game/assets/tiered-tray-DLnZTsUF.svg",U2="/kids-house-game/assets/towel-cart-5At-syZP.png",H2="/kids-house-game/assets/towel-cart-DJmR97UL.svg",Q2="/kids-house-game/assets/towel-stack-D-pX5koc.png",E2="/kids-house-game/assets/towel-stack-C1qplZ4T.svg",z2="/kids-house-game/assets/vine-planter-mviuZvkw.png",R2="/kids-house-game/assets/vine-planter-Duhx9OMZ.svg",A2="/kids-house-game/assets/waiting-bench-DXbi7ObC.png",D2="/kids-house-game/assets/waiting-bench-BQuoXbE3.svg",O2="/kids-house-game/assets/wash-chair-CJo64U_O.png",I2="/kids-house-game/assets/wash-chair-sdgNnj79.svg",q2="/kids-house-game/assets/arched-mirror-2vakzmQ8.png",N2="/kids-house-game/assets/arched-mirror-ClJgTBd9.svg",j2="/kids-house-game/assets/big-monitor-BRiCdofl.png",Z2="/kids-house-game/assets/big-monitor-jx5PnUa_.svg",F2="/kids-house-game/assets/boba-cup-Dn_S1oAa.png",V2="/kids-house-game/assets/boba-cup-CwUerXNm.svg",G2="/kids-house-game/assets/bubble-bath-D4AZavWB.png",K2="/kids-house-game/assets/bubble-bath-8VwrkImA.svg",Y2="/kids-house-game/assets/cactus-buddy-D_lAS12Y.png",X2="/kids-house-game/assets/cactus-buddy-D3uacuVA.svg",J2="/kids-house-game/assets/caterpillar-plush-vK3r58Ch.png",ey="/kids-house-game/assets/caterpillar-plush-BhR8Pydf.svg",ty="/kids-house-game/assets/checker-bed-DD4Ra6RV.png",ny="/kids-house-game/assets/checker-bed-mtuxfPje.svg",sy="/kids-house-game/assets/checker-rug-C9Gs09p_.png",oy="/kids-house-game/assets/checker-rug-CmSO3Y4j.svg",iy="/kids-house-game/assets/clothes-rail-CJ8Du1xN.png",ay="/kids-house-game/assets/clothes-rail-BY-f9coz.svg",ry="/kids-house-game/assets/cloud-sofa-3eVlcAzs.png",ly="/kids-house-game/assets/cloud-sofa-CZS1Y5s-.svg",cy="/kids-house-game/assets/cube-shelf-DPFNgFhk.png",dy="/kids-house-game/assets/cube-shelf-DoI0tLGL.svg",gy="/kids-house-game/assets/curvy-desk-BxyVtcg3.png",fy="/kids-house-game/assets/curvy-desk-eWCvec1f.svg",hy="/kids-house-game/assets/cute-speaker-Cy7ml0bm.png",py="/kids-house-game/assets/cute-speaker-DrVF9uns.svg",uy="/kids-house-game/assets/desk-lamp-B39R5SBQ.png",my="/kids-house-game/assets/desk-lamp-C-VtrE1V.svg",yy="/kids-house-game/assets/desk-mic-C-4XirP6.png",ky="/kids-house-game/assets/desk-mic-BqYzh6ma.svg",vy="/kids-house-game/assets/flower-lamp-DyDRXGpR.png",by="/kids-house-game/assets/flower-lamp-Dpz6tQ2x.svg",wy="/kids-house-game/assets/frog-plush-NmeU5sHZ.png",$y="/kids-house-game/assets/frog-plush-BhkTrE24.svg",_y="/kids-house-game/assets/game-controller-B6phnmU4.png",xy="/kids-house-game/assets/game-controller-6gvwykQG.svg",My="/kids-house-game/assets/gaming-chair-B7ZnwG2W.png",Ly="/kids-house-game/assets/gaming-chair-BCyGMzy0.svg",Cy="/kids-house-game/assets/hamster-pet-C09aLs5N.png",By="/kids-house-game/assets/hamster-pet-LBcghoJj.svg",Sy="/kids-house-game/assets/headphones-MRHfNh-e.png",Wy="/kids-house-game/assets/headphones-Cjjqt_92.svg",Ty="/kids-house-game/assets/heart-light-B6LXGE4j.png",Py="/kids-house-game/assets/heart-light-DfDwRHju.svg",Uy="/kids-house-game/assets/keyboard-Dvxz1PEW.png",Hy="/kids-house-game/assets/keyboard-Cbtwvtj1.svg",Qy="/kids-house-game/assets/mini-fridge-DgYceOBW.png",Ey="/kids-house-game/assets/mini-fridge-qdNm4NKf.svg",zy="/kids-house-game/assets/pastel-wardrobe-CFIOdtrx.png",Ry="/kids-house-game/assets/pastel-wardrobe-BubkWAN2.svg",Ay="/kids-house-game/assets/phone-stand-CWfRuwT_.png",Dy="/kids-house-game/assets/phone-stand-VLW-DsK-.svg",Oy="/kids-house-game/assets/pothos-plant-mnKAaH_K.png",Iy="/kids-house-game/assets/pothos-plant-C1I15M9a.svg",qy="/kids-house-game/assets/puffy-stool-B5z3sd2l.png",Ny="/kids-house-game/assets/puffy-stool-CwjoblCa.svg",jy="/kids-house-game/assets/ring-light-BoqM9Lks.png",Zy="/kids-house-game/assets/ring-light-CdxNAXA6.svg",Fy="/kids-house-game/assets/side-table-round-x1NbWzDq.png",Vy="/kids-house-game/assets/side-table-round-rCsBU0YO.svg",Gy="/kids-house-game/assets/star-lamp-Bocs3YRP.png",Ky="/kids-house-game/assets/star-lamp-CHKQnzvB.svg",Yy="/kids-house-game/assets/sticker-board-CMn2BF_D.png",Xy="/kids-house-game/assets/sticker-board-LUm1_I_P.svg",Jy="/kids-house-game/assets/sunny-art-372bwMLG.png",ek="/kids-house-game/assets/sunny-art-C25M7k02.svg",tk="/kids-house-game/assets/sv-bean-bag-DlsJBRMG.png",nk="/kids-house-game/assets/sv-bean-bag-DdsCYd4e.svg",sk="/kids-house-game/assets/sv-cloud-rug-Bo5aP_HP.png",ok="/kids-house-game/assets/sv-cloud-rug-BvczSj77.svg",ik="/kids-house-game/assets/sv-wall-shelf-C61Y5OFn.png",ak="/kids-house-game/assets/sv-wall-shelf-BtJLzNMg.svg",rk="/kids-house-game/assets/vlog-camera-DAiD7LSW.png",lk="/kids-house-game/assets/vlog-camera-CBd28A7P.svg",ck="/kids-house-game/assets/wavy-floor-lamp-1BJBLV8q.png",dk="/kids-house-game/assets/wavy-floor-lamp-Iy8llzr8.svg",gk="/kids-house-game/assets/acorn-friend-SMoU5de2.png",fk="/kids-house-game/assets/acorn-friend-BsLiZ2Z_.svg",hk="/kids-house-game/assets/apple-tree-CN7tYao3.png",pk="/kids-house-game/assets/apple-tree-DGIUIjY1.svg",uk="/kids-house-game/assets/big-wardrobe-DcZpROWW.png",mk="/kids-house-game/assets/big-wardrobe-BnfnkPXl.svg",yk="/kids-house-game/assets/box-stack-DBdO-RRV.png",kk="/kids-house-game/assets/box-stack-ji13G2mP.svg",vk="/kids-house-game/assets/brick-fireplace-CxelyhgA.png",bk="/kids-house-game/assets/brick-fireplace-BGCbiSK5.svg",wk="/kids-house-game/assets/bulletin-board-BWUCktvK.png",$k="/kids-house-game/assets/bulletin-board-DqA69wQH.svg",_k="/kids-house-game/assets/cozy-mug-DGMQRJK7.png",xk="/kids-house-game/assets/cozy-mug-CFJEPRKb.svg",Mk="/kids-house-game/assets/cream-sofa-Dzaz9Eg9.png",Lk="/kids-house-game/assets/cream-sofa-CB4EWIDp.svg",Ck="/kids-house-game/assets/fire-pit-FhRYTkJU.png",Bk="/kids-house-game/assets/fire-pit-De3s05T8.svg",Sk="/kids-house-game/assets/glass-cabinet-C1Dud5Om.png",Wk="/kids-house-game/assets/glass-cabinet-BCHExP4F.svg",Tk="/kids-house-game/assets/hanging-lantern-5_A0FrVU.png",Pk="/kids-house-game/assets/hanging-lantern-DZbXB8L1.svg",Uk="/kids-house-game/assets/knit-cushion-CeEpuawZ.png",Hk="/kids-house-game/assets/knit-cushion-DUewI6rR.svg",Qk="/kids-house-game/assets/ladder-shelf-kDBx9ho_.png",Ek="/kids-house-game/assets/ladder-shelf-DXYDmQiE.svg",zk="/kids-house-game/assets/landscape-art-CXy-fkYO.png",Rk="/kids-house-game/assets/landscape-art-CdCqCPL2.svg",Ak="/kids-house-game/assets/lattice-bench-BQ7wYgqI.png",Dk="/kids-house-game/assets/lattice-bench-D3zCZTQp.svg",Ok="/kids-house-game/assets/leaf-wreath-01dJ9WfP.png",Ik="/kids-house-game/assets/leaf-wreath-DUjq1MWh.svg",qk="/kids-house-game/assets/mini-greenhouse-DLsY7-VZ.png",Nk="/kids-house-game/assets/mini-greenhouse-CGE5F9A_.svg",jk="/kids-house-game/assets/moving-box-DszcEI-k.png",Zk="/kids-house-game/assets/moving-box-CZXbXcJO.svg",Fk="/kids-house-game/assets/picnic-basket-CYmGfWoy.png",Vk="/kids-house-game/assets/picnic-basket-D72DCNRY.svg",Gk="/kids-house-game/assets/round-rug-DZTiY9p2.png",Kk="/kids-house-game/assets/round-rug-D8ePosbv.svg",Yk="/kids-house-game/assets/sale-sign-CLwCvavX.png",Xk="/kids-house-game/assets/sale-sign-CXWpgQt5.svg",Jk="/kids-house-game/assets/sprout-pot-BlPwmBjK.png",ev="/kids-house-game/assets/sprout-pot-BbXk09mS.svg",tv="/kids-house-game/assets/stripe-runner-CWfHHL2f.png",nv="/kids-house-game/assets/stripe-runner-ClycKEW5.svg",sv="/kids-house-game/assets/trailing-plant-BBqKhPvp.png",ov="/kids-house-game/assets/trailing-plant-NbG7dy8O.svg",iv="/kids-house-game/assets/wall-clock-ItDQFPVO.png",av="/kids-house-game/assets/wall-clock-CDC1o6eG.svg",rv="/kids-house-game/assets/wh-arc-floor-lamp-Dg8j_uAI.png",lv="/kids-house-game/assets/wh-arc-floor-lamp-BKVes2Fd.svg",cv="/kids-house-game/assets/wh-book-stack-9oDTUUnY.png",dv="/kids-house-game/assets/wh-book-stack-DjDFey2h.svg",gv="/kids-house-game/assets/wh-dresser-DhrzqcZ2.png",fv="/kids-house-game/assets/wh-dresser-Y-jnNt5q.svg",hv="/kids-house-game/assets/wh-fiddle-leaf-fig-Bt0Bc12k.png",pv="/kids-house-game/assets/wh-fiddle-leaf-fig-B0-kGmHI.svg",uv="/kids-house-game/assets/wh-kitchen-counter-BWikwkWo.png",mv="/kids-house-game/assets/wh-kitchen-counter-BtBenu6u.svg",yv="/kids-house-game/assets/wh-nightstand-BXusZ0A4.png",kv="/kids-house-game/assets/wh-nightstand-DPUoV5aO.svg",vv="/kids-house-game/assets/wh-pendant-lamp-DbfSrUho.png",bv="/kids-house-game/assets/wh-pendant-lamp-DBg4p7hi.svg",wv="/kids-house-game/assets/wh-snake-plant-kt_6Tus5.png",$v="/kids-house-game/assets/wh-snake-plant-Cj3bHF25.svg",_v="/kids-house-game/assets/wh-string-lights-CWVP27K_.png",xv="/kids-house-game/assets/wh-string-lights-C3JVBkgW.svg",Mv="/kids-house-game/assets/wh-teapot-BclPHtYN.png",Lv="/kids-house-game/assets/wh-teapot-kevlW5hN.svg",Cv="/kids-house-game/assets/wood-armchair-BoX1llWe.png",Bv="/kids-house-game/assets/wood-armchair-DNVhKBWe.svg",Sv="/kids-house-game/assets/wood-bookshelf-CfgOK-7q.png",Wv="/kids-house-game/assets/wood-bookshelf-CvT7GAuI.svg",Tv="/kids-house-game/assets/wood-coffee-table-DmAJknnU.png",Pv="/kids-house-game/assets/wood-coffee-table-CuAR_7Kr.svg",Uv="/kids-house-game/assets/wood-desk-S1h5jwM2.png",Hv="/kids-house-game/assets/wood-desk-DPCJq_XQ.svg",Qv="/kids-house-game/assets/wood-stool-BWBID67e.png",Ev="/kids-house-game/assets/wood-stool-CV7YeZwC.svg",zv="/kids-house-game/assets/wooden-bed-511IemjK.png",Rv="/kids-house-game/assets/wooden-bed-Qj-sf8yq.svg",Av="/kids-house-game/assets/cc-butter-polka-DGTIwtTO.png",Dv="/kids-house-game/assets/cc-butter-polka-CmiHLPHI.svg",Ov="/kids-house-game/assets/cc-cream-hex-DMlsmhhY.png",Iv="/kids-house-game/assets/cc-cream-hex-Bkf3o84Z.svg",qv="/kids-house-game/assets/cc-lavender-lattice-D6QyuSPi.png",Nv="/kids-house-game/assets/cc-lavender-lattice-DhxILx5n.svg",jv="/kids-house-game/assets/cc-lilac-gingham-C8gKChr3.png",Zv="/kids-house-game/assets/cc-lilac-gingham-C-WPjvD8.svg",Fv="/kids-house-game/assets/cc-mint-checks-Bj1xaUgE.png",Vv="/kids-house-game/assets/cc-mint-checks-BKmyOLlr.svg",Gv="/kids-house-game/assets/cc-mint-florals-DubHlfkl.png",Kv="/kids-house-game/assets/cc-mint-florals-Dz8qRBHw.svg",Yv="/kids-house-game/assets/cc-peach-scallops-3xV_Pu-6.png",Xv="/kids-house-game/assets/cc-peach-scallops-GPn_mXbS.svg",Jv="/kids-house-game/assets/cc-pink-plaid-C9HKdB4f.png",eb="/kids-house-game/assets/cc-pink-plaid-VgppBwax.svg",tb="/kids-house-game/assets/cc-rag-planks-B67vRZlX.png",nb="/kids-house-game/assets/cc-rag-planks-C5Hombhc.svg",sb="/kids-house-game/assets/cc-rose-herringbone-Cmke3vGv.png",ob="/kids-house-game/assets/cc-rose-herringbone-CQRix6_f.svg",ib="/kids-house-game/assets/lilac-stripes-DcsSoVwO.png",ab="/kids-house-game/assets/lilac-stripes-yb9DhjTf.svg",rb="/kids-house-game/assets/lilac-terrazzo-DOghNP_d.png",lb="/kids-house-game/assets/lilac-terrazzo-8CaN2qhK.svg",cb="/kids-house-game/assets/mint-bubbles-DtsYAubK.png",db="/kids-house-game/assets/mint-bubbles-BIQM5a2P.svg",gb="/kids-house-game/assets/pink-check-floor-DjPuYxlq.png",fb="/kids-house-game/assets/pink-check-floor-Cy9k3Fal.svg",hb="/kids-house-game/assets/pink-hearts-DP4TxPV5.png",pb="/kids-house-game/assets/pink-hearts-BpVCT-98.svg",ub="/kids-house-game/assets/cloud-sky-CbZL0zcC.svg",mb="/kids-house-game/assets/pastel-planks-BAcEss7w.svg",yb="/kids-house-game/assets/soft-carpet-BSwTSDW1.svg",kb="/kids-house-game/assets/star-sprinkle-5bH7qjW0.svg",vb="/kids-house-game/assets/tiny-hearts-C-RHlg1h.svg",bb="/kids-house-game/assets/butter-check-floor-yLFbEdi4.png",wb="/kids-house-game/assets/butter-check-floor-C8HdmZ0P.svg",$b="/kids-house-game/assets/mint-checks-7rTweT19.png",_b="/kids-house-game/assets/mint-checks-rWbOdhfH.svg",xb="/kids-house-game/assets/sky-clouds-9-shWk3w.png",Mb="/kids-house-game/assets/sky-clouds-DUJlygwI.svg",Lb="/kids-house-game/assets/sky-tiles-Cu-Ga741.png",Cb="/kids-house-game/assets/sky-tiles-xxuodD5m.svg",Bb="/kids-house-game/assets/sunny-stars-Bc3CbIvZ.png",Sb="/kids-house-game/assets/sunny-stars-C6fsFX70.svg",Wb="/kids-house-game/assets/leafy-cream-Cv5o-u-w.png",Tb="/kids-house-game/assets/leafy-cream-WIcyLI1T.svg",Pb="/kids-house-game/assets/orange-gingham-BjUerG-F.png",Ub="/kids-house-game/assets/orange-gingham-CVNizWBt.svg",Hb="/kids-house-game/assets/terracotta-tiles-dXqpLLce.png",Qb="/kids-house-game/assets/terracotta-tiles-j3yOSRI7.svg",Eb="/kids-house-game/assets/wood-panel-BGEVUu4R.png",zb="/kids-house-game/assets/wood-panel-Dob8WRpW.svg",Rb="/kids-house-game/assets/wood-planks-vE8-OOXo.png",Ab="/kids-house-game/assets/wood-planks-4TUYjAkF.svg",Tr={small:80,medium:150,large:260},Db={"welcome-home":"Welcome Home","sunny-vibes":"Sunny Vibes",glossy:"Glossy",cottage:"Cozy Cottage"},jl=e=>Db[e]??e.replace(/[-_]+/g," ").replace(/\b\w/g,t=>t.toUpperCase()),Ob=Object.assign({"../assets/items/manifest.json":uh,"../assets/patterns/manifest.json":mh}),Pr=Object.assign({"../assets/items/bedroom/alarm-clock.png":yh,"../assets/items/bedroom/alarm-clock.svg":kh,"../assets/items/bedroom/bedtime-snack.png":vh,"../assets/items/bedroom/bedtime-snack.svg":bh,"../assets/items/bedroom/book-stack.png":wh,"../assets/items/bedroom/book-stack.svg":$h,"../assets/items/bedroom/bunk-bed.png":_h,"../assets/items/bedroom/bunk-bed.svg":xh,"../assets/items/bedroom/bunny-slippers.png":Mh,"../assets/items/bedroom/bunny-slippers.svg":Lh,"../assets/items/bedroom/canopy-bed.png":Ch,"../assets/items/bedroom/canopy-bed.svg":Bh,"../assets/items/bedroom/cat-bed.png":Sh,"../assets/items/bedroom/cat-bed.svg":Wh,"../assets/items/bedroom/cloud-rug.png":Th,"../assets/items/bedroom/cloud-rug.svg":Ph,"../assets/items/bedroom/cloud-shelf.png":Uh,"../assets/items/bedroom/cloud-shelf.svg":Hh,"../assets/items/bedroom/cork-board.png":Qh,"../assets/items/bedroom/cork-board.svg":Eh,"../assets/items/bedroom/daisy-pot.png":zh,"../assets/items/bedroom/daisy-pot.svg":Rh,"../assets/items/bedroom/desk.png":Ah,"../assets/items/bedroom/desk.svg":Dh,"../assets/items/bedroom/dino-plush.png":Oh,"../assets/items/bedroom/dino-plush.svg":Ih,"../assets/items/bedroom/doll-house.png":qh,"../assets/items/bedroom/doll-house.svg":Nh,"../assets/items/bedroom/dresser.png":jh,"../assets/items/bedroom/dresser.svg":Zh,"../assets/items/bedroom/egg-chair.png":Fh,"../assets/items/bedroom/egg-chair.svg":Vh,"../assets/items/bedroom/floor-fan.png":Gh,"../assets/items/bedroom/floor-fan.svg":Kh,"../assets/items/bedroom/guinea-pig.png":Yh,"../assets/items/bedroom/guinea-pig.svg":Xh,"../assets/items/bedroom/hamster-cage.png":Jh,"../assets/items/bedroom/hamster-cage.svg":ep,"../assets/items/bedroom/heart-rug.png":tp,"../assets/items/bedroom/heart-rug.svg":np,"../assets/items/bedroom/lava-lamp.png":sp,"../assets/items/bedroom/lava-lamp.svg":op,"../assets/items/bedroom/moon-night-light.png":ip,"../assets/items/bedroom/moon-night-light.svg":ap,"../assets/items/bedroom/nightstand.png":rp,"../assets/items/bedroom/nightstand.svg":lp,"../assets/items/bedroom/paper-lantern.png":cp,"../assets/items/bedroom/paper-lantern.svg":dp,"../assets/items/bedroom/piggy-bank.png":gp,"../assets/items/bedroom/piggy-bank.svg":fp,"../assets/items/bedroom/plant-stand.png":hp,"../assets/items/bedroom/plant-stand.svg":pp,"../assets/items/bedroom/play-tent.png":up,"../assets/items/bedroom/play-tent.svg":mp,"../assets/items/bedroom/star-mobile.png":yp,"../assets/items/bedroom/star-mobile.svg":kp,"../assets/items/bedroom/toy-chest.png":vp,"../assets/items/bedroom/toy-chest.svg":bp,"../assets/items/bedroom/toy-robot.png":wp,"../assets/items/bedroom/toy-robot.svg":$p,"../assets/items/bedroom/toy-train.png":_p,"../assets/items/bedroom/toy-train.svg":xp,"../assets/items/bedroom/unicorn-plush.png":Mp,"../assets/items/bedroom/unicorn-plush.svg":Lp,"../assets/items/bedroom/wardrobe.png":Cp,"../assets/items/bedroom/wardrobe.svg":Bp,"../assets/items/kitchen/bananas.png":Sp,"../assets/items/kitchen/bananas.svg":Wp,"../assets/items/kitchen/bar-stool.png":Tp,"../assets/items/kitchen/bar-stool.svg":Pp,"../assets/items/kitchen/bread-loaf.png":Up,"../assets/items/kitchen/bread-loaf.svg":Hp,"../assets/items/kitchen/chick.png":Qp,"../assets/items/kitchen/chick.svg":Ep,"../assets/items/kitchen/china-hutch.png":zp,"../assets/items/kitchen/china-hutch.svg":Rp,"../assets/items/kitchen/cocoa-mug.png":Ap,"../assets/items/kitchen/cocoa-mug.svg":Dp,"../assets/items/kitchen/cookie-jar.png":Op,"../assets/items/kitchen/cookie-jar.svg":Ip,"../assets/items/kitchen/cooking-pot.png":qp,"../assets/items/kitchen/cooking-pot.svg":Np,"../assets/items/kitchen/cupcake.png":jp,"../assets/items/kitchen/cupcake.svg":Zp,"../assets/items/kitchen/dish-rack.png":Fp,"../assets/items/kitchen/dish-rack.svg":Vp,"../assets/items/kitchen/fruit-bowl.png":Gp,"../assets/items/kitchen/fruit-bowl.svg":Kp,"../assets/items/kitchen/frying-pan.png":Yp,"../assets/items/kitchen/frying-pan.svg":Xp,"../assets/items/kitchen/happy-fridge.png":Jp,"../assets/items/kitchen/happy-fridge.svg":e0,"../assets/items/kitchen/herb-box.png":t0,"../assets/items/kitchen/herb-box.svg":n0,"../assets/items/kitchen/high-chair.png":s0,"../assets/items/kitchen/high-chair.svg":o0,"../assets/items/kitchen/ice-cream.png":i0,"../assets/items/kitchen/ice-cream.svg":a0,"../assets/items/kitchen/kettle.png":r0,"../assets/items/kitchen/kettle.svg":l0,"../assets/items/kitchen/kitchen-counter.png":c0,"../assets/items/kitchen/kitchen-counter.svg":d0,"../assets/items/kitchen/kitchen-sink.png":g0,"../assets/items/kitchen/kitchen-sink.svg":f0,"../assets/items/kitchen/lemon-tree.png":h0,"../assets/items/kitchen/lemon-tree.svg":p0,"../assets/items/kitchen/microwave.png":u0,"../assets/items/kitchen/microwave.svg":m0,"../assets/items/kitchen/milk-bottle.png":y0,"../assets/items/kitchen/milk-bottle.svg":k0,"../assets/items/kitchen/pancakes.png":v0,"../assets/items/kitchen/pancakes.svg":b0,"../assets/items/kitchen/pantry-shelf.png":w0,"../assets/items/kitchen/pantry-shelf.svg":$0,"../assets/items/kitchen/pendant-lamp.png":_0,"../assets/items/kitchen/pendant-lamp.svg":x0,"../assets/items/kitchen/pet-bowl.png":M0,"../assets/items/kitchen/pet-bowl.svg":L0,"../assets/items/kitchen/rice-cooker.png":C0,"../assets/items/kitchen/rice-cooker.svg":B0,"../assets/items/kitchen/runner-rug.png":S0,"../assets/items/kitchen/runner-rug.svg":W0,"../assets/items/kitchen/spice-rack.png":T0,"../assets/items/kitchen/spice-rack.svg":P0,"../assets/items/kitchen/stand-mixer.png":U0,"../assets/items/kitchen/stand-mixer.svg":H0,"../assets/items/kitchen/teapot.png":Q0,"../assets/items/kitchen/teapot.svg":E0,"../assets/items/kitchen/toaster.png":z0,"../assets/items/kitchen/toaster.svg":R0,"../assets/items/kitchen/utensil-rail.png":A0,"../assets/items/kitchen/utensil-rail.svg":D0,"../assets/items/kitchen/watermelon-slice.png":O0,"../assets/items/kitchen/watermelon-slice.svg":I0,"../assets/items/living/aquarium.png":q0,"../assets/items/living/aquarium.svg":N0,"../assets/items/living/arc-floor-lamp.png":j0,"../assets/items/living/arc-floor-lamp.svg":Z0,"../assets/items/living/bean-bag.png":F0,"../assets/items/living/bean-bag.svg":V0,"../assets/items/living/bird-cage.png":G0,"../assets/items/living/bird-cage.svg":K0,"../assets/items/living/blanket-basket.png":Y0,"../assets/items/living/blanket-basket.svg":X0,"../assets/items/living/building-blocks.png":J0,"../assets/items/living/building-blocks.svg":eu,"../assets/items/living/coffee-table.png":tu,"../assets/items/living/coffee-table.svg":nu,"../assets/items/living/comfy-armchair.png":su,"../assets/items/living/comfy-armchair.svg":ou,"../assets/items/living/cubby-shelf.png":iu,"../assets/items/living/cubby-shelf.svg":au,"../assets/items/living/daisy-rug.png":ru,"../assets/items/living/daisy-rug.svg":lu,"../assets/items/living/fiddle-leaf-fig.png":cu,"../assets/items/living/fiddle-leaf-fig.svg":du,"../assets/items/living/fireplace.png":gu,"../assets/items/living/fireplace.svg":fu,"../assets/items/living/globe.png":hu,"../assets/items/living/globe.svg":pu,"../assets/items/living/hanging-planter.png":uu,"../assets/items/living/hanging-planter.svg":mu,"../assets/items/living/monstera-plant.png":yu,"../assets/items/living/monstera-plant.svg":ku,"../assets/items/living/piano.png":vu,"../assets/items/living/piano.svg":bu,"../assets/items/living/popcorn.png":wu,"../assets/items/living/popcorn.svg":$u,"../assets/items/living/pouf.png":_u,"../assets/items/living/pouf.svg":xu,"../assets/items/living/rainbow-rug.png":Mu,"../assets/items/living/rainbow-rug.svg":Lu,"../assets/items/living/rainbow-wall-art.png":Cu,"../assets/items/living/rainbow-wall-art.svg":Bu,"../assets/items/living/retro-radio.png":Su,"../assets/items/living/retro-radio.svg":Wu,"../assets/items/living/rocking-chair.png":Tu,"../assets/items/living/rocking-chair.svg":Pu,"../assets/items/living/rocking-horse.png":Uu,"../assets/items/living/rocking-horse.svg":Hu,"../assets/items/living/snake-plant.png":Qu,"../assets/items/living/snake-plant.svg":Eu,"../assets/items/living/string-lights.png":zu,"../assets/items/living/string-lights.svg":Ru,"../assets/items/living/succulent-trio.png":Au,"../assets/items/living/succulent-trio.svg":Du,"../assets/items/living/tassel-rug.png":Ou,"../assets/items/living/tassel-rug.svg":Iu,"../assets/items/living/throw-pillow.png":qu,"../assets/items/living/throw-pillow.svg":Nu,"../assets/items/living/toy-car.png":ju,"../assets/items/living/toy-car.svg":Zu,"../assets/items/living/tulip-vase.png":Fu,"../assets/items/living/tulip-vase.svg":Vu,"../assets/items/living/turtle.png":Gu,"../assets/items/living/turtle.svg":Ku,"../assets/items/living/tv-stand.png":Yu,"../assets/items/living/tv-stand.svg":Xu,"../assets/items/living/wall-shelf.png":Ju,"../assets/items/living/wall-shelf.svg":em,"../assets/items/packs/cottage/cc-bakery-shelf.png":tm,"../assets/items/packs/cottage/cc-bakery-shelf.svg":nm,"../assets/items/packs/cottage/cc-breakfast-table.png":sm,"../assets/items/packs/cottage/cc-breakfast-table.svg":om,"../assets/items/packs/cottage/cc-bubble-chair.png":im,"../assets/items/packs/cottage/cc-bubble-chair.svg":am,"../assets/items/packs/cottage/cc-canopy-daybed.png":rm,"../assets/items/packs/cottage/cc-canopy-daybed.svg":lm,"../assets/items/packs/cottage/cc-cloud-beanbag.png":cm,"../assets/items/packs/cottage/cc-cloud-beanbag.svg":dm,"../assets/items/packs/cottage/cc-cloud-lamp.png":gm,"../assets/items/packs/cottage/cc-cloud-lamp.svg":fm,"../assets/items/packs/cottage/cc-cottage-aquarium.png":hm,"../assets/items/packs/cottage/cc-cottage-aquarium.svg":pm,"../assets/items/packs/cottage/cc-cupcake-stand.png":um,"../assets/items/packs/cottage/cc-cupcake-stand.svg":mm,"../assets/items/packs/cottage/cc-dryer-chair.png":ym,"../assets/items/packs/cottage/cc-dryer-chair.svg":km,"../assets/items/packs/cottage/cc-fairy-garland.png":vm,"../assets/items/packs/cottage/cc-fairy-garland.svg":bm,"../assets/items/packs/cottage/cc-fairy-shelf.png":wm,"../assets/items/packs/cottage/cc-fairy-shelf.svg":$m,"../assets/items/packs/cottage/cc-flower-kettle.png":_m,"../assets/items/packs/cottage/cc-flower-kettle.svg":xm,"../assets/items/packs/cottage/cc-flower-lamp.png":Mm,"../assets/items/packs/cottage/cc-flower-lamp.svg":Lm,"../assets/items/packs/cottage/cc-heart-bed.png":Cm,"../assets/items/packs/cottage/cc-heart-bed.svg":Bm,"../assets/items/packs/cottage/cc-heart-clock.png":Sm,"../assets/items/packs/cottage/cc-heart-clock.svg":Wm,"../assets/items/packs/cottage/cc-heart-pouf.png":Tm,"../assets/items/packs/cottage/cc-heart-pouf.svg":Pm,"../assets/items/packs/cottage/cc-heart-rug.png":Um,"../assets/items/packs/cottage/cc-heart-rug.svg":Hm,"../assets/items/packs/cottage/cc-jewel-box.png":Qm,"../assets/items/packs/cottage/cc-jewel-box.svg":Em,"../assets/items/packs/cottage/cc-light-vanity.png":zm,"../assets/items/packs/cottage/cc-light-vanity.svg":Rm,"../assets/items/packs/cottage/cc-macaron-jar.png":Am,"../assets/items/packs/cottage/cc-macaron-jar.svg":Dm,"../assets/items/packs/cottage/cc-macrame-swing.png":Om,"../assets/items/packs/cottage/cc-macrame-swing.svg":Im,"../assets/items/packs/cottage/cc-mani-chair.png":qm,"../assets/items/packs/cottage/cc-mani-chair.svg":Nm,"../assets/items/packs/cottage/cc-mint-fridge.png":jm,"../assets/items/packs/cottage/cc-mint-fridge.svg":Zm,"../assets/items/packs/cottage/cc-mushroom-stool.png":Fm,"../assets/items/packs/cottage/cc-mushroom-stool.svg":Vm,"../assets/items/packs/cottage/cc-pastel-range.png":Gm,"../assets/items/packs/cottage/cc-pastel-range.svg":Km,"../assets/items/packs/cottage/cc-perfume-tray.png":Ym,"../assets/items/packs/cottage/cc-perfume-tray.svg":Xm,"../assets/items/packs/cottage/cc-petal-table.png":Jm,"../assets/items/packs/cottage/cc-petal-table.svg":e1,"../assets/items/packs/cottage/cc-plant-wall.png":t1,"../assets/items/packs/cottage/cc-plant-wall.svg":n1,"../assets/items/packs/cottage/cc-reading-nook.png":s1,"../assets/items/packs/cottage/cc-reading-nook.svg":o1,"../assets/items/packs/cottage/cc-record-player.png":i1,"../assets/items/packs/cottage/cc-record-player.svg":a1,"../assets/items/packs/cottage/cc-ribbon-mirror.png":r1,"../assets/items/packs/cottage/cc-ribbon-mirror.svg":l1,"../assets/items/packs/cottage/cc-scallop-curtains.png":c1,"../assets/items/packs/cottage/cc-scallop-curtains.svg":d1,"../assets/items/packs/cottage/cc-scallop-loveseat.png":g1,"../assets/items/packs/cottage/cc-scallop-loveseat.svg":f1,"../assets/items/packs/cottage/cc-star-dresser.png":h1,"../assets/items/packs/cottage/cc-star-dresser.svg":p1,"../assets/items/packs/cottage/cc-teapot-set.png":u1,"../assets/items/packs/cottage/cc-teapot-set.svg":m1,"../assets/items/packs/cottage/cc-window-seat.png":y1,"../assets/items/packs/cottage/cc-window-seat.svg":k1,"../assets/items/packs/glossy/arched-shelf.png":v1,"../assets/items/packs/glossy/arched-shelf.svg":b1,"../assets/items/packs/glossy/blob-rug.png":w1,"../assets/items/packs/glossy/blob-rug.svg":$1,"../assets/items/packs/glossy/bubbly-plant.png":_1,"../assets/items/packs/glossy/bubbly-plant.svg":x1,"../assets/items/packs/glossy/bud-vase.png":M1,"../assets/items/packs/glossy/bud-vase.svg":L1,"../assets/items/packs/glossy/comb-brush.png":C1,"../assets/items/packs/glossy/comb-brush.svg":B1,"../assets/items/packs/glossy/cream-jars.png":S1,"../assets/items/packs/glossy/cream-jars.svg":W1,"../assets/items/packs/glossy/drop-lamp.png":T1,"../assets/items/packs/glossy/drop-lamp.svg":P1,"../assets/items/packs/glossy/droplet-buddy.png":U1,"../assets/items/packs/glossy/droplet-buddy.svg":H1,"../assets/items/packs/glossy/fancy-sofa.png":Q1,"../assets/items/packs/glossy/fancy-sofa.svg":E1,"../assets/items/packs/glossy/flower-cart.png":z1,"../assets/items/packs/glossy/flower-cart.svg":R1,"../assets/items/packs/glossy/foot-spa.png":A1,"../assets/items/packs/glossy/foot-spa.svg":D1,"../assets/items/packs/glossy/globe-pendants.png":O1,"../assets/items/packs/glossy/globe-pendants.svg":I1,"../assets/items/packs/glossy/glow-mirror.png":q1,"../assets/items/packs/glossy/glow-mirror.svg":N1,"../assets/items/packs/glossy/gold-floor-mirror.png":j1,"../assets/items/packs/glossy/gold-floor-mirror.svg":Z1,"../assets/items/packs/glossy/hair-dryer.png":F1,"../assets/items/packs/glossy/hair-dryer.svg":V1,"../assets/items/packs/glossy/heart-plant.png":G1,"../assets/items/packs/glossy/heart-plant.svg":K1,"../assets/items/packs/glossy/heart-pouf.png":Y1,"../assets/items/packs/glossy/heart-pouf.svg":X1,"../assets/items/packs/glossy/lilac-curtain.png":J1,"../assets/items/packs/glossy/lilac-curtain.svg":e2,"../assets/items/packs/glossy/lotion-trio.png":t2,"../assets/items/packs/glossy/lotion-trio.svg":n2,"../assets/items/packs/glossy/mani-lamp.png":s2,"../assets/items/packs/glossy/mani-lamp.svg":o2,"../assets/items/packs/glossy/nail-table.png":i2,"../assets/items/packs/glossy/nail-table.svg":a2,"../assets/items/packs/glossy/pebble-rug.png":r2,"../assets/items/packs/glossy/pebble-rug.svg":l2,"../assets/items/packs/glossy/perfume-bottle.png":c2,"../assets/items/packs/glossy/perfume-bottle.svg":d2,"../assets/items/packs/glossy/pink-fountain.png":g2,"../assets/items/packs/glossy/pink-fountain.svg":f2,"../assets/items/packs/glossy/pink-vanity.png":h2,"../assets/items/packs/glossy/pink-vanity.svg":p2,"../assets/items/packs/glossy/polish-bottle.png":u2,"../assets/items/packs/glossy/polish-bottle.svg":m2,"../assets/items/packs/glossy/polish-rack.png":y2,"../assets/items/packs/glossy/polish-rack.svg":k2,"../assets/items/packs/glossy/reception-desk.png":v2,"../assets/items/packs/glossy/reception-desk.svg":b2,"../assets/items/packs/glossy/salon-chair.png":w2,"../assets/items/packs/glossy/salon-chair.svg":$2,"../assets/items/packs/glossy/scent-candle.png":_2,"../assets/items/packs/glossy/scent-candle.svg":x2,"../assets/items/packs/glossy/spray-bottle.png":M2,"../assets/items/packs/glossy/spray-bottle.svg":L2,"../assets/items/packs/glossy/star-wall-sign.png":C2,"../assets/items/packs/glossy/star-wall-sign.svg":B2,"../assets/items/packs/glossy/swivel-stool.png":S2,"../assets/items/packs/glossy/swivel-stool.svg":W2,"../assets/items/packs/glossy/tiered-tray.png":T2,"../assets/items/packs/glossy/tiered-tray.svg":P2,"../assets/items/packs/glossy/towel-cart.png":U2,"../assets/items/packs/glossy/towel-cart.svg":H2,"../assets/items/packs/glossy/towel-stack.png":Q2,"../assets/items/packs/glossy/towel-stack.svg":E2,"../assets/items/packs/glossy/vine-planter.png":z2,"../assets/items/packs/glossy/vine-planter.svg":R2,"../assets/items/packs/glossy/waiting-bench.png":A2,"../assets/items/packs/glossy/waiting-bench.svg":D2,"../assets/items/packs/glossy/wash-chair.png":O2,"../assets/items/packs/glossy/wash-chair.svg":I2,"../assets/items/packs/sunny-vibes/arched-mirror.png":q2,"../assets/items/packs/sunny-vibes/arched-mirror.svg":N2,"../assets/items/packs/sunny-vibes/big-monitor.png":j2,"../assets/items/packs/sunny-vibes/big-monitor.svg":Z2,"../assets/items/packs/sunny-vibes/boba-cup.png":F2,"../assets/items/packs/sunny-vibes/boba-cup.svg":V2,"../assets/items/packs/sunny-vibes/bubble-bath.png":G2,"../assets/items/packs/sunny-vibes/bubble-bath.svg":K2,"../assets/items/packs/sunny-vibes/cactus-buddy.png":Y2,"../assets/items/packs/sunny-vibes/cactus-buddy.svg":X2,"../assets/items/packs/sunny-vibes/caterpillar-plush.png":J2,"../assets/items/packs/sunny-vibes/caterpillar-plush.svg":ey,"../assets/items/packs/sunny-vibes/checker-bed.png":ty,"../assets/items/packs/sunny-vibes/checker-bed.svg":ny,"../assets/items/packs/sunny-vibes/checker-rug.png":sy,"../assets/items/packs/sunny-vibes/checker-rug.svg":oy,"../assets/items/packs/sunny-vibes/clothes-rail.png":iy,"../assets/items/packs/sunny-vibes/clothes-rail.svg":ay,"../assets/items/packs/sunny-vibes/cloud-sofa.png":ry,"../assets/items/packs/sunny-vibes/cloud-sofa.svg":ly,"../assets/items/packs/sunny-vibes/cube-shelf.png":cy,"../assets/items/packs/sunny-vibes/cube-shelf.svg":dy,"../assets/items/packs/sunny-vibes/curvy-desk.png":gy,"../assets/items/packs/sunny-vibes/curvy-desk.svg":fy,"../assets/items/packs/sunny-vibes/cute-speaker.png":hy,"../assets/items/packs/sunny-vibes/cute-speaker.svg":py,"../assets/items/packs/sunny-vibes/desk-lamp.png":uy,"../assets/items/packs/sunny-vibes/desk-lamp.svg":my,"../assets/items/packs/sunny-vibes/desk-mic.png":yy,"../assets/items/packs/sunny-vibes/desk-mic.svg":ky,"../assets/items/packs/sunny-vibes/flower-lamp.png":vy,"../assets/items/packs/sunny-vibes/flower-lamp.svg":by,"../assets/items/packs/sunny-vibes/frog-plush.png":wy,"../assets/items/packs/sunny-vibes/frog-plush.svg":$y,"../assets/items/packs/sunny-vibes/game-controller.png":_y,"../assets/items/packs/sunny-vibes/game-controller.svg":xy,"../assets/items/packs/sunny-vibes/gaming-chair.png":My,"../assets/items/packs/sunny-vibes/gaming-chair.svg":Ly,"../assets/items/packs/sunny-vibes/hamster-pet.png":Cy,"../assets/items/packs/sunny-vibes/hamster-pet.svg":By,"../assets/items/packs/sunny-vibes/headphones.png":Sy,"../assets/items/packs/sunny-vibes/headphones.svg":Wy,"../assets/items/packs/sunny-vibes/heart-light.png":Ty,"../assets/items/packs/sunny-vibes/heart-light.svg":Py,"../assets/items/packs/sunny-vibes/keyboard.png":Uy,"../assets/items/packs/sunny-vibes/keyboard.svg":Hy,"../assets/items/packs/sunny-vibes/mini-fridge.png":Qy,"../assets/items/packs/sunny-vibes/mini-fridge.svg":Ey,"../assets/items/packs/sunny-vibes/pastel-wardrobe.png":zy,"../assets/items/packs/sunny-vibes/pastel-wardrobe.svg":Ry,"../assets/items/packs/sunny-vibes/phone-stand.png":Ay,"../assets/items/packs/sunny-vibes/phone-stand.svg":Dy,"../assets/items/packs/sunny-vibes/pothos-plant.png":Oy,"../assets/items/packs/sunny-vibes/pothos-plant.svg":Iy,"../assets/items/packs/sunny-vibes/puffy-stool.png":qy,"../assets/items/packs/sunny-vibes/puffy-stool.svg":Ny,"../assets/items/packs/sunny-vibes/ring-light.png":jy,"../assets/items/packs/sunny-vibes/ring-light.svg":Zy,"../assets/items/packs/sunny-vibes/side-table-round.png":Fy,"../assets/items/packs/sunny-vibes/side-table-round.svg":Vy,"../assets/items/packs/sunny-vibes/star-lamp.png":Gy,"../assets/items/packs/sunny-vibes/star-lamp.svg":Ky,"../assets/items/packs/sunny-vibes/sticker-board.png":Yy,"../assets/items/packs/sunny-vibes/sticker-board.svg":Xy,"../assets/items/packs/sunny-vibes/sunny-art.png":Jy,"../assets/items/packs/sunny-vibes/sunny-art.svg":ek,"../assets/items/packs/sunny-vibes/sv-bean-bag.png":tk,"../assets/items/packs/sunny-vibes/sv-bean-bag.svg":nk,"../assets/items/packs/sunny-vibes/sv-cloud-rug.png":sk,"../assets/items/packs/sunny-vibes/sv-cloud-rug.svg":ok,"../assets/items/packs/sunny-vibes/sv-wall-shelf.png":ik,"../assets/items/packs/sunny-vibes/sv-wall-shelf.svg":ak,"../assets/items/packs/sunny-vibes/vlog-camera.png":rk,"../assets/items/packs/sunny-vibes/vlog-camera.svg":lk,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.png":ck,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.svg":dk,"../assets/items/packs/welcome-home/acorn-friend.png":gk,"../assets/items/packs/welcome-home/acorn-friend.svg":fk,"../assets/items/packs/welcome-home/apple-tree.png":hk,"../assets/items/packs/welcome-home/apple-tree.svg":pk,"../assets/items/packs/welcome-home/big-wardrobe.png":uk,"../assets/items/packs/welcome-home/big-wardrobe.svg":mk,"../assets/items/packs/welcome-home/box-stack.png":yk,"../assets/items/packs/welcome-home/box-stack.svg":kk,"../assets/items/packs/welcome-home/brick-fireplace.png":vk,"../assets/items/packs/welcome-home/brick-fireplace.svg":bk,"../assets/items/packs/welcome-home/bulletin-board.png":wk,"../assets/items/packs/welcome-home/bulletin-board.svg":$k,"../assets/items/packs/welcome-home/cozy-mug.png":_k,"../assets/items/packs/welcome-home/cozy-mug.svg":xk,"../assets/items/packs/welcome-home/cream-sofa.png":Mk,"../assets/items/packs/welcome-home/cream-sofa.svg":Lk,"../assets/items/packs/welcome-home/fire-pit.png":Ck,"../assets/items/packs/welcome-home/fire-pit.svg":Bk,"../assets/items/packs/welcome-home/glass-cabinet.png":Sk,"../assets/items/packs/welcome-home/glass-cabinet.svg":Wk,"../assets/items/packs/welcome-home/hanging-lantern.png":Tk,"../assets/items/packs/welcome-home/hanging-lantern.svg":Pk,"../assets/items/packs/welcome-home/knit-cushion.png":Uk,"../assets/items/packs/welcome-home/knit-cushion.svg":Hk,"../assets/items/packs/welcome-home/ladder-shelf.png":Qk,"../assets/items/packs/welcome-home/ladder-shelf.svg":Ek,"../assets/items/packs/welcome-home/landscape-art.png":zk,"../assets/items/packs/welcome-home/landscape-art.svg":Rk,"../assets/items/packs/welcome-home/lattice-bench.png":Ak,"../assets/items/packs/welcome-home/lattice-bench.svg":Dk,"../assets/items/packs/welcome-home/leaf-wreath.png":Ok,"../assets/items/packs/welcome-home/leaf-wreath.svg":Ik,"../assets/items/packs/welcome-home/mini-greenhouse.png":qk,"../assets/items/packs/welcome-home/mini-greenhouse.svg":Nk,"../assets/items/packs/welcome-home/moving-box.png":jk,"../assets/items/packs/welcome-home/moving-box.svg":Zk,"../assets/items/packs/welcome-home/picnic-basket.png":Fk,"../assets/items/packs/welcome-home/picnic-basket.svg":Vk,"../assets/items/packs/welcome-home/round-rug.png":Gk,"../assets/items/packs/welcome-home/round-rug.svg":Kk,"../assets/items/packs/welcome-home/sale-sign.png":Yk,"../assets/items/packs/welcome-home/sale-sign.svg":Xk,"../assets/items/packs/welcome-home/sprout-pot.png":Jk,"../assets/items/packs/welcome-home/sprout-pot.svg":ev,"../assets/items/packs/welcome-home/stripe-runner.png":tv,"../assets/items/packs/welcome-home/stripe-runner.svg":nv,"../assets/items/packs/welcome-home/trailing-plant.png":sv,"../assets/items/packs/welcome-home/trailing-plant.svg":ov,"../assets/items/packs/welcome-home/wall-clock.png":iv,"../assets/items/packs/welcome-home/wall-clock.svg":av,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.png":rv,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.svg":lv,"../assets/items/packs/welcome-home/wh-book-stack.png":cv,"../assets/items/packs/welcome-home/wh-book-stack.svg":dv,"../assets/items/packs/welcome-home/wh-dresser.png":gv,"../assets/items/packs/welcome-home/wh-dresser.svg":fv,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.png":hv,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.svg":pv,"../assets/items/packs/welcome-home/wh-kitchen-counter.png":uv,"../assets/items/packs/welcome-home/wh-kitchen-counter.svg":mv,"../assets/items/packs/welcome-home/wh-nightstand.png":yv,"../assets/items/packs/welcome-home/wh-nightstand.svg":kv,"../assets/items/packs/welcome-home/wh-pendant-lamp.png":vv,"../assets/items/packs/welcome-home/wh-pendant-lamp.svg":bv,"../assets/items/packs/welcome-home/wh-snake-plant.png":wv,"../assets/items/packs/welcome-home/wh-snake-plant.svg":$v,"../assets/items/packs/welcome-home/wh-string-lights.png":_v,"../assets/items/packs/welcome-home/wh-string-lights.svg":xv,"../assets/items/packs/welcome-home/wh-teapot.png":Mv,"../assets/items/packs/welcome-home/wh-teapot.svg":Lv,"../assets/items/packs/welcome-home/wood-armchair.png":Cv,"../assets/items/packs/welcome-home/wood-armchair.svg":Bv,"../assets/items/packs/welcome-home/wood-bookshelf.png":Sv,"../assets/items/packs/welcome-home/wood-bookshelf.svg":Wv,"../assets/items/packs/welcome-home/wood-coffee-table.png":Tv,"../assets/items/packs/welcome-home/wood-coffee-table.svg":Pv,"../assets/items/packs/welcome-home/wood-desk.png":Uv,"../assets/items/packs/welcome-home/wood-desk.svg":Hv,"../assets/items/packs/welcome-home/wood-stool.png":Qv,"../assets/items/packs/welcome-home/wood-stool.svg":Ev,"../assets/items/packs/welcome-home/wooden-bed.png":zv,"../assets/items/packs/welcome-home/wooden-bed.svg":Rv}),Ur=Object.assign({"../assets/patterns/cottage/cc-butter-polka.png":Av,"../assets/patterns/cottage/cc-butter-polka.svg":Dv,"../assets/patterns/cottage/cc-cream-hex.png":Ov,"../assets/patterns/cottage/cc-cream-hex.svg":Iv,"../assets/patterns/cottage/cc-lavender-lattice.png":qv,"../assets/patterns/cottage/cc-lavender-lattice.svg":Nv,"../assets/patterns/cottage/cc-lilac-gingham.png":jv,"../assets/patterns/cottage/cc-lilac-gingham.svg":Zv,"../assets/patterns/cottage/cc-mint-checks.png":Fv,"../assets/patterns/cottage/cc-mint-checks.svg":Vv,"../assets/patterns/cottage/cc-mint-florals.png":Gv,"../assets/patterns/cottage/cc-mint-florals.svg":Kv,"../assets/patterns/cottage/cc-peach-scallops.png":Yv,"../assets/patterns/cottage/cc-peach-scallops.svg":Xv,"../assets/patterns/cottage/cc-pink-plaid.png":Jv,"../assets/patterns/cottage/cc-pink-plaid.svg":eb,"../assets/patterns/cottage/cc-rag-planks.png":tb,"../assets/patterns/cottage/cc-rag-planks.svg":nb,"../assets/patterns/cottage/cc-rose-herringbone.png":sb,"../assets/patterns/cottage/cc-rose-herringbone.svg":ob,"../assets/patterns/glossy/lilac-stripes.png":ib,"../assets/patterns/glossy/lilac-stripes.svg":ab,"../assets/patterns/glossy/lilac-terrazzo.png":rb,"../assets/patterns/glossy/lilac-terrazzo.svg":lb,"../assets/patterns/glossy/mint-bubbles.png":cb,"../assets/patterns/glossy/mint-bubbles.svg":db,"../assets/patterns/glossy/pink-check-floor.png":gb,"../assets/patterns/glossy/pink-check-floor.svg":fb,"../assets/patterns/glossy/pink-hearts.png":hb,"../assets/patterns/glossy/pink-hearts.svg":pb,"../assets/patterns/nursery/cloud-sky.svg":ub,"../assets/patterns/nursery/pastel-planks.svg":mb,"../assets/patterns/nursery/soft-carpet.svg":yb,"../assets/patterns/nursery/star-sprinkle.svg":kb,"../assets/patterns/nursery/tiny-hearts.svg":vb,"../assets/patterns/sunny-vibes/butter-check-floor.png":bb,"../assets/patterns/sunny-vibes/butter-check-floor.svg":wb,"../assets/patterns/sunny-vibes/mint-checks.png":$b,"../assets/patterns/sunny-vibes/mint-checks.svg":_b,"../assets/patterns/sunny-vibes/sky-clouds.png":xb,"../assets/patterns/sunny-vibes/sky-clouds.svg":Mb,"../assets/patterns/sunny-vibes/sky-tiles.png":Lb,"../assets/patterns/sunny-vibes/sky-tiles.svg":Cb,"../assets/patterns/sunny-vibes/sunny-stars.png":Bb,"../assets/patterns/sunny-vibes/sunny-stars.svg":Sb,"../assets/patterns/welcome-home/leafy-cream.png":Wb,"../assets/patterns/welcome-home/leafy-cream.svg":Tb,"../assets/patterns/welcome-home/orange-gingham.png":Pb,"../assets/patterns/welcome-home/orange-gingham.svg":Ub,"../assets/patterns/welcome-home/terracotta-tiles.png":Hb,"../assets/patterns/welcome-home/terracotta-tiles.svg":Qb,"../assets/patterns/welcome-home/wood-panel.png":Eb,"../assets/patterns/welcome-home/wood-panel.svg":zb,"../assets/patterns/welcome-home/wood-planks.png":Rb,"../assets/patterns/welcome-home/wood-planks.svg":Ab});function Ib(e,t){if(!e||!e.trim())return[];try{const n=JSON.parse(e);return(Array.isArray(n)?n:[...Array.isArray(n?.items)?n.items:[],...Array.isArray(n?.patterns)?n.patterns:[]]).filter(o=>o&&typeof o.slug=="string"&&o.slug.trim())}catch(n){return console.warn(`[packs] ${t} is not valid JSON; ignoring`,n),[]}}const Zl=Object.entries(Ob).flatMap(([e,t])=>Ib(t,e)),qb=["svg","png","webp","SVG","PNG","WEBP"];function Fl(e,t,n,s){for(const i of qb){const a=e[`../assets/${t}/${n}/${s}.${i}`];if(a)return a}const o=Object.keys(e).find(i=>i.split("/").pop().replace(/\.\w+$/,"")===s);return o?e[o]:void 0}const Hr={furniture:"furniture",appliance:"furniture",appliances:"furniture",seating:"furniture",storage:"furniture",bed:"furniture",table:"furniture",decor:"decor",rug:"decor",rugs:"decor",lighting:"decor",light:"decor",lamp:"decor",toy:"decor",toys:"decor","wall-art":"decor",art:"decor",beauty:"decor",plant:"plants",plants:"plants",flower:"plants",flowers:"plants",food:"food",drink:"food",drinks:"food",snack:"food",pet:"pets",pets:"pets",animal:"pets",animals:"pets"};function Nb(e){const t=typeof e=="string"?e.trim().toLowerCase():"";return Hr[t]??Hr[t.replace(/s$/,"")]??"decor"}const Nn=(e,t)=>typeof e=="string"&&e.trim()?e.trim().toLowerCase():t,Vl=e=>["wallpaper","floor"].includes(Nn(e.type,"")),Qr=new Set,jb=Zl.filter(e=>!Vl(e)).flatMap(e=>{const t=Nn(e.room,"any"),n=e.slug.trim();if(Qr.has(n))return[];Qr.add(n);const o=[e.svg,e.png].filter(p=>typeof p=="string").map(p=>Pr["../assets/items/"+p.replace(/^\.?\//,"")]).find(Boolean)??Fl(Pr,"items",t,n);if(!o)return console.warn(`[packs] no image for items/${t}/${n}`),[];const i=Nn(e.pack,""),a=Nn(e.size,"medium"),r=Nb(e.category),l=typeof e.gameW=="number"&&e.gameW>20&&e.gameW<800?e.gameW:Tr[a]??Tr.medium,c=typeof e.widthUnits=="number"&&typeof e.heightUnits=="number"&&e.widthUnits>0&&e.heightUnits>0?e.heightUnits/e.widthUnits:1,d=Math.round(l*Math.min(4,Math.max(.2,c))),g=typeof e.holdable=="boolean"?e.holdable:a!=="large"&&r!=="furniture";return[{kind:`pack:${n}`,name:e.name||n,cat:r,rooms:[t],w:l,h:d,wall:e.wall===!0||void 0,svg:"",img:o,pack:i||void 0,holdable:g}]}),ea=Zl.filter(Vl).flatMap(e=>{const t=Nn(e.pack,"extra"),n=e.slug.trim(),o=[e.svg,e.png].filter(i=>typeof i=="string").map(i=>Ur["../assets/patterns/"+i.replace(/^\.?\//,"")]).find(Boolean)??Fl(Ur,"patterns",t,n);return o?[{id:`${t}/${n}`,name:e.name||n,pack:t,kind:Nn(e.type,"wallpaper"),url:o}]:(console.warn(`[packs] no image for patterns/${t}/${n}`),[])}),Er=Object.fromEntries(ea.map(e=>[e.id,e])),Lt="#5a3d5c",C=`stroke="${Lt}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Gl=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="2.4" fill="${Lt}"/><circle cx="${t}" cy="${n}" r="2.4" fill="${Lt}"/><circle cx="${e+.8}" cy="${n-.8}" r=".8" fill="#fff"/><circle cx="${t+.8}" cy="${n-.8}" r=".8" fill="#fff"/>`,Kl=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/><ellipse cx="${t}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/>`,he='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>';function Wi(e,t,n){return`${he}<ellipse cx="50" cy="78" rx="28" ry="16" fill="${t}" ${C}/><path d="M24 62 Q50 48 76 62 V78 Q50 92 24 78 Z" fill="${t}" ${C}/>
    <circle cx="50" cy="40" r="18" fill="${e}" ${C}/>${Gl(43,57,40)}${Kl(38,62,48)}<path d="M46 50 q4 3 8 0" fill="none" ${C}/>
    <path d="M38 26 Q50 16 62 26" fill="${n}" ${C}/><circle cx="50" cy="24" r="3" fill="${n}" ${C}/>`}const Yl=[{kind:"crib",name:"Crib",cat:"furniture",w:260,svg:`${he}<rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${C}/><path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${C}/><rect x="6" y="22" width="88" height="12" rx="6" fill="#9ad7f5" ${C}/><rect x="14" y="48" width="72" height="16" rx="6" fill="#ffe0ec"/><ellipse cx="32" cy="56" rx="8" ry="5" fill="#fff" ${C}/><ellipse cx="50" cy="56" rx="8" ry="5" fill="#c9e7ff" ${C}/>`},{kind:"bassinet",name:"Bassinet",cat:"furniture",w:170,svg:`${he}<path d="M18 78 Q8 78 10 64 L22 36 H78 L90 64 Q92 78 82 78 Z" fill="#fff" ${C}/><ellipse cx="50" cy="36" rx="32" ry="10" fill="#fff" ${C}/><path d="M22 40 Q50 52 78 40" fill="#ffe0ec" ${C}/><ellipse cx="50" cy="44" rx="16" ry="7" fill="#fff"/><path d="M30 78 L22 94 M70 78 L78 94" ${C}/><ellipse cx="50" cy="90" rx="28" ry="4" fill="none" ${C}/><path d="M14 22 Q50 4 86 22" fill="none" stroke="#9ad7f5" stroke-width="6" stroke-linecap="round"/>`},{kind:"rocker",name:"Rocker",cat:"furniture",w:190,svg:`${he}<path d="M16 88 Q50 98 84 88" fill="none" ${C}/><path d="M28 84 Q50 74 72 84" fill="#c9a0dc" ${C}/><rect x="30" y="28" width="40" height="36" rx="12" fill="#e4ccf2" ${C}/><path d="M22 48 Q18 70 30 80 H70 Q82 70 78 48 Z" fill="#f6e6ff" ${C}/><rect x="36" y="58" width="28" height="12" rx="6" fill="#ffc8dd" ${C}/><circle cx="50" cy="40" r="6" fill="#fff" opacity=".7"/>`},{kind:"changing-table",name:"Changing Table",cat:"furniture",w:230,svg:`${he}<rect x="8" y="36" width="84" height="16" rx="8" fill="#fff" ${C}/><rect x="14" y="40" width="72" height="8" rx="4" fill="#ffd6e8"/><rect x="16" y="52" width="28" height="32" rx="6" fill="#bde0fe" ${C}/><rect x="56" y="52" width="28" height="32" rx="6" fill="#c9f0d8" ${C}/><path d="M22 60 H38 M22 68 H38 M62 60 H78 M62 68 H78" ${C}/><rect x="18" y="84" width="8" height="10" rx="2" fill="${Lt}"/><rect x="74" y="84" width="8" height="10" rx="2" fill="${Lt}"/><rect x="34" y="22" width="18" height="12" rx="3" fill="#ffe0ec" ${C}/><rect x="54" y="24" width="16" height="10" rx="3" fill="#fff6d8" ${C}/>`},{kind:"toy-bin",name:"Toy Bin",cat:"furniture",w:150,svg:`${he}<path d="M14 40 H86 L78 90 H22 Z" fill="#ffd166" ${C}/><rect x="10" y="32" width="80" height="14" rx="7" fill="#ffe08a" ${C}/><circle cx="36" cy="58" r="8" fill="#ff8fab" ${C}/><rect x="50" y="50" width="16" height="16" rx="3" fill="#8ecae6" ${C}/><circle cx="62" cy="70" r="6" fill="#90e0a8" ${C}/>`},{kind:"baby-shelf",name:"Bookshelf",cat:"furniture",w:150,svg:`${he}<rect x="14" y="8" width="72" height="84" rx="8" fill="#f3d2b5" ${C}/><path d="M14 36 H86 M14 64 H86" ${C}/><rect x="22" y="14" width="8" height="18" rx="2" fill="#ff8fab" ${C}/><rect x="32" y="18" width="8" height="14" rx="2" fill="#8ecae6" ${C}/><rect x="44" y="14" width="8" height="18" rx="2" fill="#ffd166" ${C}/><rect x="58" y="16" width="8" height="16" rx="2" fill="#90e0a8" ${C}/><circle cx="34" cy="50" r="7" fill="#ffadad" ${C}/><rect x="50" y="44" width="18" height="14" rx="3" fill="#c9a0dc" ${C}/><ellipse cx="40" cy="78" rx="14" ry="8" fill="#fff" ${C}/>`},{kind:"doll-rose",name:"Rose Doll",cat:"decor",w:80,svg:Wi("#f6d3b0","#ffc2d4","#ff8fab")},{kind:"doll-honey",name:"Honey Doll",cat:"decor",w:80,svg:Wi("#e0ac69","#cdeffd","#ffd166")},{kind:"doll-cocoa",name:"Cocoa Doll",cat:"decor",w:80,svg:Wi("#8d5524","#d8f3dc","#c9a0dc")},{kind:"crib-mobile",name:"Crib Mobile",cat:"decor",w:150,wall:!0,svg:`<path d="M50 6 V22" ${C}/><ellipse cx="50" cy="28" rx="28" ry="8" fill="#fff" ${C}/><path d="M28 32 V48 M50 36 V58 M72 32 V48" ${C}/><circle cx="28" cy="56" r="8" fill="#ffd166" ${C}/><circle cx="50" cy="68" r="9" fill="#ff8fab" ${C}/><path d="M72 56 l6 4 -6 4 -6 -4 z" fill="#8ecae6" ${C}/><circle cx="28" cy="54" r="2" fill="#fff"/><circle cx="50" cy="66" r="2" fill="#fff"/>`},{kind:"night-light",name:"Night Light",cat:"decor",w:70,svg:`${he}<circle cx="50" cy="46" r="22" fill="#fff6c8" ${C}/><circle cx="50" cy="46" r="12" fill="#ffe08a"/><path d="M50 18 V10 M30 26 L24 20 M70 26 L76 20 M24 46 H14 M86 46 H76" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><rect x="40" y="70" width="20" height="16" rx="4" fill="#c9a0dc" ${C}/><circle cx="50" cy="78" r="3" fill="#ff8fab"/>`},{kind:"bunny-plush",name:"Bunny Plush",cat:"decor",w:90,svg:`${he}<ellipse cx="34" cy="28" rx="8" ry="18" fill="#fff" ${C}/><ellipse cx="66" cy="28" rx="8" ry="18" fill="#fff" ${C}/><ellipse cx="34" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="66" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="50" cy="74" rx="26" ry="18" fill="#fff" ${C}/><circle cx="50" cy="50" r="20" fill="#fff" ${C}/>${Gl(43,57,50)}<path d="M47 58 l3 3 3 -3" fill="none" ${C}/>${Kl(38,62,58)}`},{kind:"stacking-rings",name:"Stacking Rings",cat:"decor",w:70,svg:`${he}<ellipse cx="50" cy="86" rx="26" ry="7" fill="#ff8fab" ${C}/><ellipse cx="50" cy="74" rx="20" ry="6" fill="#ffd166" ${C}/><ellipse cx="50" cy="64" rx="15" ry="5" fill="#8ecae6" ${C}/><ellipse cx="50" cy="56" rx="10" ry="4" fill="#90e0a8" ${C}/><rect x="46" y="28" width="8" height="40" rx="4" fill="#c9a0dc" ${C}/><circle cx="50" cy="24" r="7" fill="#ffb3c6" ${C}/>`},{kind:"rattle",name:"Rattle",cat:"decor",w:60,svg:`${he}<circle cx="38" cy="40" r="20" fill="#ffd166" ${C}/><circle cx="32" cy="34" r="5" fill="#fff" opacity=".7"/><rect x="50" y="52" width="10" height="28" rx="5" fill="#ff8fab" ${C} transform="rotate(-20 55 66)"/><circle cx="68" cy="82" r="8" fill="#8ecae6" ${C}/>`},{kind:"baby-bottle",name:"Baby Bottle",cat:"food",w:55,svg:`${he}<rect x="36" y="8" width="28" height="12" rx="4" fill="#c9a0dc" ${C}/><rect x="42" y="18" width="16" height="8" fill="#fff" ${C}/><path d="M30 30 H70 L66 88 Q50 96 34 88 Z" fill="#e7f6ff" ${C}/><path d="M32 48 H68 L66 80 Q50 88 34 80 Z" fill="#fff" opacity=".85"/><rect x="34" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="46" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="58" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/>`},{kind:"blocks",name:"Baby Blocks",cat:"decor",w:90,svg:`${he}<rect x="14" y="58" width="28" height="28" rx="4" fill="#ff8fab" ${C}/><rect x="40" y="46" width="28" height="28" rx="4" fill="#ffd166" ${C}/><rect x="28" y="28" width="26" height="26" rx="4" fill="#8ecae6" ${C}/><path d="M20 72 H36 M48 60 H62 M34 42 H48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"rocking-horse",name:"Little Rocking Horse",cat:"decor",w:180,svg:`${he}<path d="M12 86 Q50 98 88 82" fill="none" ${C}/><ellipse cx="48" cy="62" rx="26" ry="14" fill="#e6b88a" ${C}/><path d="M62 58 L84 40 Q92 36 90 48 L74 64 Z" fill="#f0d0b0" ${C}/><circle cx="82" cy="42" r="3" fill="${Lt}"/><path d="M70 36 L76 24 L84 34" fill="#ff8fab" ${C}/><rect x="36" y="48" width="16" height="8" rx="3" fill="#c9a0dc" ${C}/><path d="M30 70 L22 84 M58 72 L66 86" ${C}/>`},{kind:"music-box",name:"Music Box",cat:"decor",w:80,svg:`${he}<rect x="22" y="40" width="56" height="46" rx="8" fill="#f6d6ff" ${C}/><path d="M22 40 L50 22 L78 40" fill="#e4ccf2" ${C}/><circle cx="50" cy="64" r="10" fill="#fff" ${C}/><path d="M50 58 V70 M44 64 H56" ${C}/><circle cx="50" cy="30" r="4" fill="#ffd166" ${C}/>`},{kind:"cloud-rug",name:"Nursery Cloud Rug",cat:"decor",w:340,svg:`<ellipse cx="50" cy="78" rx="46" ry="16" fill="#e7f6ff" ${C}/><circle cx="28" cy="70" r="16" fill="#f4fbff" ${C}/><circle cx="50" cy="62" r="18" fill="#fff" ${C}/><circle cx="72" cy="70" r="16" fill="#f4fbff" ${C}/><ellipse cx="50" cy="78" rx="30" ry="8" fill="#d6f0ff"/>`},{kind:"play-mat",name:"Play Mat",cat:"decor",w:300,svg:`<rect x="6" y="62" width="88" height="30" rx="14" fill="#ffe0ec" ${C}/><path d="M50 70 C42 62 30 64 34 74 C38 82 50 88 50 88 C50 88 62 82 66 74 C70 64 58 62 50 70 Z" fill="#ff8fab" ${C}/><circle cx="22" cy="76" r="5" fill="#ffd166" ${C}/><circle cx="78" cy="76" r="5" fill="#8ecae6" ${C}/>`},{kind:"moon-art",name:"Moon and Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M58 18 A28 28 0 1 0 58 78 A18 18 0 1 1 58 18 Z" fill="#fff3b0" ${C}/><path d="M22 30 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1 z" fill="#ffd166" ${C}/><path d="M78 58 l2 5 5 1 -4 4 1 5 -4 -3 -4 3 1 -5 -4 -4 5 -1 z" fill="#c9e7ff" ${C}/>`},{kind:"nursery-dresser",name:"Nursery Dresser",cat:"furniture",w:170,svg:`${he}<rect x="14" y="22" width="72" height="68" rx="8" fill="#f6e2c4" ${C}/><path d="M14 44 H86 M14 66 H86" ${C}/><circle cx="50" cy="34" r="3" fill="${Lt}"/><circle cx="50" cy="55" r="3" fill="${Lt}"/><circle cx="50" cy="76" r="3" fill="${Lt}"/><rect x="30" y="10" width="18" height="12" rx="3" fill="#ffc2d4" ${C}/><rect x="52" y="12" width="16" height="10" rx="3" fill="#c9e7ff" ${C}/>`},{kind:"nursery-lamp",name:"Nursery Lamp",cat:"decor",w:80,svg:`${he}<path d="M28 42 L36 12 H64 L72 42 Z" fill="#fff6c8" ${C}/><rect x="46" y="42" width="8" height="40" rx="4" fill="#c9a0dc" ${C}/><ellipse cx="50" cy="88" rx="20" ry="6" fill="#b388d6" ${C}/><circle cx="46" cy="24" r="3" fill="#fff" opacity=".85"/><path d="M34 20 q6 -8 4 -2" fill="none" stroke="#ffd166" stroke-width="2"/>`},{kind:"nursery-curtains",name:"Curtains",cat:"decor",w:180,wall:!0,svg:`<rect x="16" y="10" width="68" height="50" rx="6" fill="#cfefff" ${C}/><path d="M50 10 V60 M16 34 H84" ${C}/><path d="M8 8 Q18 28 10 92" fill="#ffd6e8" ${C}/><path d="M92 8 Q82 28 90 92" fill="#ffd6e8" ${C}/><rect x="6" y="6" width="88" height="8" rx="3" fill="#f3d2b5" ${C}/>`}],Xl=new Map;let Jl=!1;function Zb(){return Jl}function Qw(e){Jl=e}function Fb(e){return Xl.get(e)}function Ew(e,t){Xl.set(e,t)}const X="#5a3d5c",k=`stroke="${X}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Qn=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${X}"/><circle cx="${t}" cy="${n}" r="3" fill="${X}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,to=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,Y='<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>',Ht=[{kind:"sofa",name:"Sofa",cat:"furniture",w:260,svg:`${Y}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${k}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${k}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${k}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${k}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${k}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${X}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${X}"/>`},{kind:"armchair",name:"Armchair",cat:"furniture",w:150,svg:`${Y}<rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${k}/><rect x="6" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${k}/><rect x="72" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${k}/><rect x="24" y="58" width="52" height="24" rx="10" fill="#b8e0f2" ${k}/><rect x="20" y="86" width="6" height="10" rx="2" fill="${X}"/><rect x="74" y="86" width="6" height="10" rx="2" fill="${X}"/>`},{kind:"bed",name:"Bed",cat:"furniture",w:300,svg:`${Y}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${k}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${k}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${k}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${k}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${k}/>`},{kind:"table",name:"Table",cat:"furniture",w:200,svg:`${Y}<rect x="4" y="30" width="92" height="14" rx="7" fill="#f4a261" ${k}/><rect x="14" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${k}/><rect x="76" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${k}/><path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".5"/>`},{kind:"chair",name:"Chair",cat:"furniture",w:100,svg:`${Y}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${k}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${k}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${k}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${k}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/>`},{kind:"lamp",name:"Lamp",cat:"furniture",w:90,svg:`${Y}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${k}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${k}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${k}/><circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>`},{kind:"fridge",name:"Fridge",cat:"furniture",w:150,svg:`${Y}<rect x="16" y="4" width="68" height="90" rx="14" fill="#bde0fe" ${k}/><path d="M16 38 H84" ${k}/><rect x="70" y="14" width="5" height="16" rx="2" fill="${X}"/><rect x="70" y="46" width="5" height="22" rx="2" fill="${X}"/><circle cx="32" cy="22" r="5" fill="#ff8fab" ${k}/><rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${k}/>`},{kind:"stove",name:"Stove",cat:"furniture",w:170,svg:`${Y}<rect x="8" y="26" width="84" height="68" rx="12" fill="#ffadad" ${k}/><rect x="8" y="18" width="84" height="14" rx="6" fill="#ffd6a5" ${k}/><rect x="20" y="46" width="60" height="36" rx="8" fill="#5a3d5c" opacity=".85"/><rect x="26" y="52" width="48" height="8" rx="4" fill="#fff" opacity=".25"/><circle cx="22" cy="38" r="3" fill="${X}"/><circle cx="36" cy="38" r="3" fill="${X}"/><circle cx="78" cy="38" r="3" fill="${X}"/>`},{kind:"bookshelf",name:"Shelf",cat:"furniture",w:170,svg:`${Y}<rect x="10" y="4" width="80" height="90" rx="10" fill="#d4a373" ${k}/><path d="M10 34 H90 M10 64 H90" ${k}/><rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${k}/><rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${k}/><rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${k}/><rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${k}/><rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${k}/><circle cx="34" cy="80" r="8" fill="#ffadad" ${k}/>`},{kind:"tub",name:"Bathtub",cat:"furniture",w:240,svg:`${Y}<circle cx="30" cy="40" r="7" fill="#bde0fe" ${k}/><circle cx="44" cy="34" r="9" fill="#e0f2ff" ${k}/><circle cx="60" cy="40" r="7" fill="#bde0fe" ${k}/><path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${k}/><rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${k}/><rect x="22" y="88" width="8" height="8" rx="2" fill="${X}"/><rect x="70" y="88" width="8" height="8" rx="2" fill="${X}"/>`},{kind:"rug",name:"Rug",cat:"decor",w:320,svg:`<ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${k}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${k}/><ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${k}/>`},{kind:"picture",name:"Picture",cat:"decor",w:130,wall:!0,svg:`<rect x="10" y="20" width="80" height="64" rx="8" fill="#ffd166" ${k}/><rect x="18" y="28" width="64" height="48" rx="4" fill="#bde0fe"/><circle cx="66" cy="40" r="7" fill="#fff3b0"/><path d="M18 76 L38 50 L52 64 L62 54 L82 76 Z" fill="#90e0a8" ${k}/>`},{kind:"window",name:"Window",cat:"decor",w:180,wall:!0,svg:`<rect x="12" y="8" width="76" height="76" rx="38" fill="#a2d2ff" ${k}/><path d="M50 8 V84 M12 50 H88" ${k}/><circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/><path d="M4 8 Q20 40 10 90 M96 8 Q80 40 90 90" stroke="#ff8fab" stroke-width="9" fill="none" stroke-linecap="round"/>`},{kind:"clock",name:"Clock",cat:"decor",w:90,wall:!0,svg:`<circle cx="50" cy="50" r="38" fill="#fff" ${k}/><circle cx="50" cy="50" r="30" fill="#fff3b0"/><path d="M50 50 V28 M50 50 L64 58" ${k}/><circle cx="50" cy="50" r="3" fill="${X}"/>${to(30,70,66)}`},{kind:"stars",name:"Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M30 20 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffd166" ${k}/><path d="M70 40 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#ffadad" ${k}/><path d="M40 66 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#a2d2ff" ${k}/>`},{kind:"balloon",name:"Balloons",cat:"decor",w:110,svg:`<path d="M38 52 Q44 74 50 96 M64 46 Q58 72 50 96" stroke="${X}" stroke-width="2" fill="none"/><ellipse cx="36" cy="32" rx="18" ry="22" fill="#ff8fab" ${k}/><ellipse cx="66" cy="28" rx="18" ry="22" fill="#a2d2ff" ${k}/><ellipse cx="30" cy="24" rx="4" ry="7" fill="#fff" opacity=".6"/>`},{kind:"teddy",name:"Teddy",cat:"decor",w:100,svg:`${Y}<circle cx="26" cy="22" r="10" fill="#d4a373" ${k}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${k}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${k}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${k}/>${Qn(40,60,36)}<ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/><circle cx="50" cy="46" r="2.5" fill="${X}"/>${to(32,68,46)}`},{kind:"ball",name:"Ball",cat:"decor",w:70,svg:`${Y}<circle cx="50" cy="58" r="36" fill="#ffd166" ${k}/><path d="M18 46 Q50 66 82 46 M26 82 Q50 60 74 82" stroke="#ff7096" stroke-width="7" fill="none"/>`},{kind:"tv",name:"TV",cat:"decor",w:170,svg:`${Y}<rect x="6" y="14" width="88" height="62" rx="14" fill="#c9a0dc" ${k}/><rect x="16" y="22" width="68" height="46" rx="8" fill="#a2d2ff"/><path d="M30 6 L44 14 M70 6 L56 14" ${k}/><rect x="36" y="78" width="28" height="16" rx="4" fill="#b388d6" ${k}/>${Qn(42,58,42)}<path d="M44 52 q6 5 12 0" ${k} fill="none"/>`},{kind:"plant",name:"Plant",cat:"plants",w:110,svg:`${Y}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${k} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${k} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${k}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${k}/><rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${k}/>`},{kind:"cactus",name:"Cactus",cat:"plants",w:80,svg:`${Y}<rect x="36" y="12" width="28" height="64" rx="14" fill="#80ed99" ${k}/><path d="M36 50 H24 a8 8 0 0 1 -8 -8 V34" fill="none" stroke="${X}" stroke-width="3.5"/><rect x="12" y="26" width="12" height="22" rx="6" fill="#80ed99" ${k}/><circle cx="50" cy="12" r="6" fill="#ff8fab" ${k}/>${Qn(44,56,40)}<path d="M28 74 H72 L66 96 H34 Z" fill="#c9a0dc" ${k}/>`},{kind:"flowers",name:"Flowers",cat:"plants",w:90,svg:`${Y}<path d="M50 70 V30 M50 60 Q30 50 30 30 M50 60 Q70 50 70 30" stroke="#52b788" stroke-width="4" fill="none"/><circle cx="50" cy="26" r="10" fill="#ff8fab" ${k}/><circle cx="30" cy="28" r="9" fill="#ffd166" ${k}/><circle cx="70" cy="28" r="9" fill="#a2d2ff" ${k}/><circle cx="50" cy="26" r="3" fill="#fff"/><path d="M32 66 H68 L62 96 H38 Z" fill="#a2d2ff" ${k}/>`},{kind:"tree",name:"Mini Tree",cat:"plants",w:140,svg:`${Y}<rect x="44" y="54" width="12" height="30" rx="4" fill="#b07d54" ${k}/><circle cx="50" cy="36" r="30" fill="#52b788" ${k}/><circle cx="38" cy="30" r="5" fill="#ff8fab"/><circle cx="62" cy="40" r="5" fill="#ff8fab"/><circle cx="52" cy="22" r="5" fill="#ff8fab"/><path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${k}/>`},{kind:"cake",name:"Cake",cat:"food",w:100,svg:`<rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${k}/><path d="M16 58 q8 10 17 0 q8 10 17 0 q8 10 17 0 q8 10 17 0" fill="#fff" ${k}/><rect x="46" y="28" width="8" height="22" rx="3" fill="#a2d2ff" ${k}/><path d="M50 14 q6 8 0 12 q-6 -4 0 -12" fill="#ffd166" ${k}/><ellipse cx="50" cy="92" rx="40" ry="5" fill="#fff" ${k}/>`},{kind:"apple",name:"Apple",cat:"food",w:60,svg:`<path d="M50 30 C20 18 8 50 22 74 C32 92 44 90 50 86 C56 90 68 92 78 74 C92 50 80 18 50 30 Z" fill="#ff6b6b" ${k}/><path d="M50 30 Q52 16 58 10" ${k} fill="none"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#80ed99" ${k} transform="rotate(-20 64 18)"/><ellipse cx="34" cy="46" rx="5" ry="9" fill="#fff" opacity=".5"/>`},{kind:"donut",name:"Donut",cat:"food",w:70,svg:`<circle cx="50" cy="58" r="36" fill="#e9c46a" ${k}/><path d="M18 52 Q20 26 50 24 Q80 26 82 52 Q76 62 66 56 Q56 66 46 58 Q34 66 24 58 Z" fill="#ff8fab" ${k}/><circle cx="50" cy="52" r="10" fill="#fff" ${k}/><rect x="30" y="36" width="6" height="3" rx="1.5" fill="#a2d2ff" transform="rotate(30 33 37)"/><rect x="64" y="38" width="6" height="3" rx="1.5" fill="#ffd166"/><rect x="56" y="30" width="6" height="3" rx="1.5" fill="#80ed99" transform="rotate(-30 59 31)"/>`},{kind:"pizza",name:"Pizza",cat:"food",w:80,svg:`<path d="M10 20 Q50 6 90 20 L50 94 Z" fill="#ffd166" ${k}/><path d="M10 20 Q50 6 90 20 L86 28 Q50 16 14 28 Z" fill="#e9a96a" ${k}/><circle cx="42" cy="38" r="7" fill="#ff6b6b" ${k}/><circle cx="62" cy="44" r="6" fill="#ff6b6b" ${k}/><circle cx="50" cy="62" r="6" fill="#ff6b6b" ${k}/>`},{kind:"juice",name:"Juice",cat:"food",w:55,svg:`<path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${k}/><path d="M27 44 H73 L70 92 H30 Z" fill="#ffb347"/><path d="M24 26 H76 L70 92 H30 Z" fill="none" ${k}/><path d="M58 30 L66 4" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="60" r="4" fill="#fff" opacity=".6"/>`},{kind:"cat",name:"Toy cat",cat:"pets",w:110,svg:`${Y}<path d="M78 80 Q98 70 90 50" stroke="#ffb347" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="30" ry="20" fill="#ffb347" ${k}/><path d="M22 30 L26 8 L40 22 M78 30 L74 8 L60 22" fill="#ffb347" ${k}/><circle cx="50" cy="42" r="28" fill="#ffc46b" ${k}/>${Qn(40,60,40)}<path d="M46 50 q4 4 8 0" ${k} fill="none"/>${to(32,68,50)}`},{kind:"dog",name:"Puppy",cat:"pets",w:120,svg:`${Y}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#f5ebe0" ${k}/><circle cx="50" cy="42" r="28" fill="#fff" ${k}/><ellipse cx="22" cy="44" rx="10" ry="18" fill="#b07d54" ${k}/><ellipse cx="78" cy="44" rx="10" ry="18" fill="#b07d54" ${k}/><circle cx="60" cy="34" r="8" fill="#e6b88a" opacity=".7"/>${Qn(40,60,40)}<ellipse cx="50" cy="52" rx="5" ry="4" fill="${X}"/><path d="M50 56 v6" ${k}/>`},{kind:"bunny",name:"Bunny",cat:"pets",w:90,svg:`${Y}<ellipse cx="36" cy="22" rx="8" ry="20" fill="#fff" ${k}/><ellipse cx="64" cy="22" rx="8" ry="20" fill="#fff" ${k}/><ellipse cx="36" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="64" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="50" cy="76" rx="28" ry="20" fill="#fff" ${k}/><circle cx="50" cy="52" r="22" fill="#fff" ${k}/>${Qn(42,58,50)}<path d="M47 58 l3 3 3 -3" ${k} fill="none"/>${to(36,64,58)}`},{kind:"fish",name:"Fish Bowl",cat:"pets",w:100,svg:`${Y}<circle cx="50" cy="54" r="40" fill="#cdeffd" ${k}/><path d="M14 46 H86" stroke="#8ecae6" stroke-width="3"/><path d="M60 64 l14 -8 v16 z" fill="#ff9f68" ${k}/><ellipse cx="46" cy="64" rx="16" ry="11" fill="#ffb347" ${k}/><circle cx="40" cy="62" r="2.5" fill="${X}"/><circle cx="32" cy="38" r="3" fill="#fff" opacity=".8"/><rect x="24" y="10" width="52" height="8" rx="4" fill="#cdeffd" ${k}/>`},{kind:"kennel",name:"Dog Kennel",cat:"pets",w:210,h:175,holdable:!1,vb:"0 0 120 100",svg:`<ellipse cx="60" cy="97" rx="48" ry="3.2" fill="#000" opacity=".12"/><path d="M14 50 L60 12 L106 50 Z" fill="#ff8fab" ${k}/><path d="M28 46 L60 22 L92 46 Z" fill="#ffd6e4"/><rect x="20" y="46" width="80" height="50" rx="10" fill="#fff6ea" ${k}/><path d="M20 56 H100" stroke="#ffc2d4" stroke-width="7"/><path d="M34 96 V58 Q60 36 86 58 V96 Z" fill="#f3e4ff" ${k}/><path d="M40 96 V64 Q60 46 80 64 V96 Z" fill="#ffe8c7"/><circle cx="86" cy="64" r="8" fill="#bde0fe" ${k}/><circle cx="84" cy="62" r="2.2" fill="#fff" opacity=".9"/><path d="M28 62 l2.4 2.4 2.4-2.4 2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4z" fill="#ff8fab" ${k}/><circle cx="30" cy="90" r="3.2" fill="#fff" ${k}/><rect x="32" y="88.4" width="14" height="3.4" rx="1.7" fill="#fff" ${k}/><circle cx="48" cy="90" r="3.2" fill="#fff" ${k}/>`},{kind:"cat-tower",name:"Cat Tower",cat:"pets",w:150,h:225,holdable:!1,vb:"0 0 100 150",svg:`<ellipse cx="50" cy="146" rx="36" ry="3.4" fill="#000" opacity=".12"/><rect x="44" y="30" width="12" height="104" rx="6" fill="#c9a0dc" ${k}/><ellipse cx="50" cy="136" rx="34" ry="10" fill="#ffc8dd" ${k}/><ellipse cx="50" cy="132" rx="26" ry="6" fill="#fff6ea"/><ellipse cx="50" cy="102" rx="30" ry="8" fill="#bde0fe" ${k}/><ellipse cx="50" cy="98" rx="22" ry="4" fill="#fff" opacity=".8"/><ellipse cx="50" cy="64" rx="28" ry="8" fill="#ffd166" ${k}/><ellipse cx="50" cy="60" rx="20" ry="4" fill="#fff6d0"/><circle cx="50" cy="22" r="8" fill="#ff8fab" ${k}/><circle cx="47" cy="19" r="2.2" fill="#fff" opacity=".75"/><g class="dangle"><circle cx="22" cy="126" r="8" fill="#ffb3c6" ${k}/><path d="M22 126 q12 5 7 16" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/></g><circle cx="80" cy="92" r="3.4" fill="#ffd166" ${k}/>`},{kind:"vanity",name:"Vanity",cat:"furniture",w:230,svg:`${Y}<ellipse cx="50" cy="26" rx="24" ry="22" fill="#fff" ${k}/><ellipse cx="50" cy="26" rx="18" ry="16" fill="#cdeffd"/><path d="M38 18 l6 -6 M42 26 l10 -10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="12" r="3" fill="#ffd166" ${k}/><circle cx="74" cy="12" r="3" fill="#ffd166" ${k}/><rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${k}/><rect x="10" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${k}/><rect x="62" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${k}/><circle cx="24" cy="75" r="3" fill="${X}"/><circle cx="76" cy="75" r="3" fill="${X}"/><rect x="12" y="90" width="6" height="7" rx="2" fill="${X}"/><rect x="82" y="90" width="6" height="7" rx="2" fill="${X}"/>`},{kind:"stool",name:"Vanity Stool",cat:"furniture",w:90,svg:`${Y}<ellipse cx="50" cy="48" rx="34" ry="14" fill="#c9a0dc" ${k}/><ellipse cx="50" cy="44" rx="28" ry="9" fill="#e4ccf2"/><path d="M28 58 L22 94 M72 58 L78 94 M50 62 V94" ${k}/><ellipse cx="50" cy="78" rx="22" ry="4" fill="none" ${k}/>`},{kind:"perfume",name:"Perfume",cat:"decor",w:50,svg:`<rect x="40" y="8" width="20" height="14" rx="5" fill="#ffd166" ${k}/><rect x="46" y="20" width="8" height="10" fill="#fff" ${k}/><path d="M20 50 Q20 30 50 30 Q80 30 80 50 V80 Q80 94 66 94 H34 Q20 94 20 80 Z" fill="#ff8fab" ${k}/><ellipse cx="36" cy="52" rx="5" ry="10" fill="#fff" opacity=".6"/><path d="M50 56 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#fff" opacity=".8"/>`},{kind:"polish",name:"Nail Polish",cat:"decor",w:40,svg:`<rect x="38" y="4" width="24" height="40" rx="8" fill="${X}"/><path d="M24 54 Q24 42 36 42 H64 Q76 42 76 54 V84 Q76 96 64 96 H36 Q24 96 24 84 Z" fill="#b388d6" ${k}/><ellipse cx="38" cy="62" rx="5" ry="12" fill="#fff" opacity=".55"/>`},{kind:"hairdryer",name:"Hair Dryer",cat:"decor",w:90,svg:`<path d="M60 52 L70 92 Q70 96 64 96 H58 Q52 96 52 90 L46 56 Z" fill="#a2d2ff" ${k}/><rect x="6" y="20" width="62" height="40" rx="20" fill="#bde0fe" ${k}/><ellipse cx="82" cy="40" rx="12" ry="20" fill="#ffc8dd" ${k}/><ellipse cx="82" cy="40" rx="6" ry="11" fill="#fff" ${k}/><circle cx="24" cy="40" r="7" fill="#fff" opacity=".7"/>`},{kind:"mirror",name:"Mirror",cat:"decor",w:120,wall:!0,svg:`<path d="M50 6 C74 6 88 24 88 50 C88 76 72 94 50 94 C28 94 12 76 12 50 C12 24 26 6 50 6 Z" fill="#ffd166" ${k}/><ellipse cx="50" cy="50" rx="30" ry="36" fill="#e0f4ff" ${k}/><path d="M36 34 l10 -10 M36 46 l20 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ff8fab" ${k}/>`}],ec={sofa:["living"],armchair:["living"],lamp:["living","bedroom"],tv:["living"],rug:["living","bedroom"],picture:["living","bedroom"],bookshelf:["living","bedroom"],bed:["bedroom"],teddy:["bedroom"],stars:["bedroom"],tub:["bedroom"],balloon:["any"],clock:["any"],window:["any"],ball:["any"],vanity:["salon"],stool:["salon"],perfume:["salon"],polish:["salon"],hairdryer:["salon"],mirror:["salon","bedroom"],fridge:["kitchen"],stove:["kitchen"],table:["kitchen","living"],chair:["kitchen","living"]};for(const e of Yl)ec[e.kind]=["nursery"];Ht.push(...Yl);for(const e of Ht)e.rooms=ec[e.kind]??(["food"].includes(e.cat)?["kitchen"]:["any"]);const Vb=new Set(["rug","tv","tree"]);for(const e of Ht)e.holdable??=!e.wall&&e.cat!=="furniture"&&e.w<=150&&!Vb.has(e.kind);const Gb=[{kind:"ranch-egg",name:"Fresh Egg",cat:"ranch",w:50,holdable:!0,rooms:["any"],svg:`${Y}<path d="M50 30 C70 30 80 62 80 74 C80 90 66 96 50 96 C34 96 20 90 20 74 C20 62 30 30 50 30 Z" fill="#fff6e6" ${k}/><ellipse cx="40" cy="52" rx="6" ry="9" fill="#fff"/>`},{kind:"ranch-carrot",name:"Garden Carrot",cat:"ranch",w:70,holdable:!0,rooms:["any"],svg:`${Y}<path d="M30 40 L78 34 L40 96 Z" fill="#ff922b" ${k}/><path d="M44 50 l10 -2 M42 64 l8 -2 M44 78 l6 -1" ${k}/><path d="M72 36 Q80 14 92 14 M72 36 Q68 14 76 4 M72 36 Q90 30 96 36" fill="none" stroke="#40c057" stroke-width="7" stroke-linecap="round"/>`},{kind:"ranch-bouquet",name:"Ranch Flowers",cat:"ranch",w:80,holdable:!0,rooms:["any"],svg:`${Y}<path d="M50 94 L40 50 M50 94 L50 44 M50 94 L62 50" stroke="#40c057" stroke-width="5" stroke-linecap="round"/><path d="M36 78 L64 78 L56 96 L44 96 Z" fill="#c9a0dc" ${k}/>${[[38,40,"#ff8fab"],[50,30,"#ffd43b"],[64,40,"#74c0fc"],[44,52,"#ff922b"],[58,52,"#c9a0dc"]].map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="9" fill="${n}" ${k}/><circle cx="${e}" cy="${t}" r="3" fill="#fff3b0"/>`).join("")}`}];Ht.push(...jb,...gh,...Gb);const Se=Object.fromEntries(Ht.map(e=>[e.kind,e])),_s=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),Ge=e=>e.h??e.w,tc=e=>e.img?`<img class="packimg" src="${_s(e.img)}" alt="${_s(e.name)}" draggable="false" />`:`<svg viewBox="${e.vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${e.svg}</svg>`,$n=(e,t=!1)=>{const n=Zb()?Fb(e.kind):void 0;return n?`${t&&!e.wall?'<i class="artshade" aria-hidden="true"></i>':""}<img class="packimg artimg" data-kind="${_s(e.kind)}" src="${_s(n)}" alt="${_s(e.name)}" draggable="false" />`:tc(e)};let zr=!1;function Kb(){zr||typeof window>"u"||(zr=!0,window.addEventListener("error",e=>{const t=e.target;if(!(t instanceof HTMLImageElement)||!t.classList.contains("artimg")||t.dataset.fell==="1")return;const n=Se[t.dataset.kind||""];if(!n)return;t.dataset.fell="1",t.parentElement?.querySelector(".artshade")?.remove();const s=document.createElement("div");s.innerHTML=tc(n);const o=s.firstElementChild;o&&t.replaceWith(o)},!0))}const Rr=new WeakMap;function Yb(e){const t=Rr.get(e);if(t)return t;if(!e.complete||!e.naturalWidth)return null;const n=document.createElement("canvas");n.width=e.naturalWidth,n.height=e.naturalHeight;const s=n.getContext("2d",{willReadFrequently:!0});if(!s)return null;try{s.drawImage(e,0,0)}catch{return null}const o=s.getImageData(0,0,n.width,n.height).data;return Rr.set(e,o),o}function Xb(e,t,n){const s=e.getBoundingClientRect();if(s.width<1||s.height<1||!e.naturalWidth)return null;let o=(t-s.left)/s.width;const i=(n-s.top)/s.height;e.closest(".flipped")&&(o=1-o);const a=e.naturalWidth,r=e.naturalHeight,l=Math.min(s.width/a,s.height/r),c=a*l,d=r*l,g=(s.width-c)*.5,p=s.height-d,m=(o*s.width-g)/l,v=(i*s.height-p)/l;return m<0||v<0||m>=a||v>=r?null:{x:m,y:v}}function za(e,t,n){const s=Yb(e),o=s&&Xb(e,t,n);if(!s||!o)return!s;const i=Math.floor(o.x),r=(Math.floor(o.y)*e.naturalWidth+i)*4+3;return s[r]>24}function Jb(e,t){const n=[];try{for(let s=0;s<12;s++){const o=document.elementFromPoint(e,t);if(!o)return null;const i=o.closest("img.artimg");if(i&&!za(i,e,t)){n.push(i),i.style.pointerEvents="none";continue}return o}return null}finally{for(let s=0;s<n.length;s++)n[s].style.pointerEvents=""}}const e4="var(--line)",t4=1.4,ke='fill="#3a1d3c" opacity=".14"',ta='fill="#3a1d3c" opacity=".22"',pt={l:[72,172],r:[128,172]},yn={l:[50,233],r:[150,233]},n4={l:[88,238],r:[112,238]};function S(e=3){return`stroke="${e4}" stroke-width="${(e*t4).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"`}function y(e){const n=(Math.round(e*10)/10).toFixed(1);return n.endsWith(".0")?n.slice(0,-2):n}function na(e,t,n,s,o){const i=o*Math.PI/180,a=e-n,r=t-s,l=Math.cos(i),c=Math.sin(i);return{x:n+a*l-r*c,y:s+a*c+r*l}}function xs(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=(n>>16&255)*(1-t),i=(n>>8&255)*(1-t),a=(n&255)*(1-t);return"#"+s(o)+s(i)+s(a)}function Ar(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=n>>16&255,i=n>>8&255,a=n&255;return"#"+s(o+(255-o)*t)+s(i+(255-i)*t)+s(a+(255-a)*t)}function sa(e,t,n,s,o=0){const i=e[0],a=e[1],r=e[0]===t[0]&&e[1]===t[1]?t[0]+.01:t[0],l=t[1],c=r-i,d=l-a,g=Math.hypot(c,d)||1,p=-d/g,m=c/g,v=(i+r)/2+p*o,$=(a+l)/2+m*o,x=n/2,f=s/2,h=(x+f)/2*1.04,b=[i+p*x,a+m*x],W=[r+p*f,l+m*f],P=[r-p*f,l-m*f],D=[i-p*x,a-m*x];return`M${y(b[0])} ${y(b[1])} Q${y(v+p*h)} ${y($+m*h)} ${y(W[0])} ${y(W[1])} A${y(f)} ${y(f)} 0 0 1 ${y(P[0])} ${y(P[1])} Q${y(v-p*h)} ${y($-m*h)} ${y(D[0])} ${y(D[1])} A${y(x)} ${y(x)} 0 0 1 ${y(b[0])} ${y(b[1])} Z`}function ci(e,t,n,s,o){const i=[],a=(t-e)/s;for(let r=0;r<s;r++){const l=e+r*a,c=l+a;i.push(`Q${y((l+c)/2)} ${y(n+o)} ${y(c)} ${y(n)}`)}return i.join(" ")}function oa(e,t,n,s,o,i=0){const a=[];for(let r=0;r<s;r++){const l=i+2*Math.PI*r/s,c=i+2*Math.PI*(r+1)/s,d=(l+c)/2,g=e+n*Math.cos(l),p=t+n*Math.sin(l),m=e+n*Math.cos(c),v=t+n*Math.sin(c),$=e+(n+o)*Math.cos(d),x=t+(n+o)*Math.sin(d);r===0&&a.push(`M${y(g)} ${y(p)}`),a.push(`Q${y($)} ${y(x)} ${y(m)} ${y(v)}`)}return a.join(" ")+" Z"}function kn(e,t,n,s){const o=e==="arm"?pt[t]:n4[t],i=e==="arm"?t==="l"?s.armL:s.armR:t==="l"?s.legL:s.legR,a=e==="leg"?t==="l"?s.legLLift:s.legRLift:0,r=i||a?` transform="translate(0 ${y(-a)}) rotate(${y(i)} ${o[0]} ${o[1]})"`:"";return`<g class="${e} ${t}"${r} style="transform-box:view-box;transform-origin:${o[0]}px ${o[1]}px">${n}</g>`}const Gt="var(--line)";function Ct(e,t=.8,n=2.2){return e.map(s=>`<path d="${s}" fill="none" stroke="var(--hair-shade)" stroke-width="${n}" stroke-linecap="round" opacity="${t}"/>`).join("")}function ps(e,t=.32){return e.map(n=>`<path d="${n}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${t}"/>`).join("")}function zt(){return'<path d="M54 72 Q62 44 92 38 Q70 50 63 74 Z" fill="#fff" opacity=".45"/><path d="M60 64 Q70 48 86 42" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".8"/><path d="M104 37 Q130 38 145 58 Q128 46 106 43 Z" fill="#fff" opacity=".3"/><circle cx="72" cy="50" r="2" fill="#fff" opacity=".85"/>'}function Qe(e,t,n){return n?`<path d="${e}" fill="url(#${t}h)"/>`:""}const Dr="M34 112 Q28 28 100 28 Q172 28 166 112 Q164 146 146 156 L54 156 Q36 146 34 112 Z";function Ze(e,t){return`<path d="${Dr}" fill="var(--hair)" ${S(3.2)}/>${Qe(Dr,e,t)}`}function Ti(e,t,n,s,o,i,a=10){const r=oa(e+2,t+3,n,12,7,s+.1),l=oa(e,t,n-1,12,7,s);let c=`<path d="${r}" fill="var(--hair-shade)" ${S(3.2)}/><path d="${l}" fill="var(--hair)" ${S(3.2)}/>${Qe(l,o,i)}`;for(let d=0;d<a;d++){const g=d*2.5+s,p=(n-6)*Math.sqrt((d+.5)/a),m=e+p*Math.cos(g),v=t+p*Math.sin(g);c+=`<path d="M${y(m-4)} ${y(v+1)} q1 -5 4.5 -4.5 q3.5 1 2.5 4.5" fill="none" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>`,v<t-2&&m<e+6&&(c+=`<path d="M${y(m-2.5)} ${y(v-2.5)} q2 -2 3.5 -1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`)}return c+=`<ellipse cx="${y(e-10)}" cy="${y(t-12)}" rx="6" ry="3.4" fill="#fff" opacity=".55" transform="rotate(-35 ${y(e-10)} ${y(t-12)})"/>`,c+=`<path d="M${y(e-16)} ${y(t-6)} Q${y(e-6)} ${y(t-18)} ${y(e+4)} ${y(t-14)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>`,c}function vn(e,t,n,s=6,o=[],i=7){let a=`<path d="M${e} ${t-6} V${n}" stroke="${Gt}" stroke-width="${y(2*s+4.6)}" stroke-linecap="round"/><path d="M${e} ${t-6} V${n}" stroke="var(--hair)" stroke-width="${y(2*s)}" stroke-linecap="round"/>`,r=t,l=0;for(;r<n;){const c=l%2?1:-1;a+=`<path d="M${y(e-c)} ${y(r-4)} Q${y(e+c*s*1.05)} ${y(r-2)} ${y(e+c*s*.55)} ${y(r+4)} Q${y(e)} ${y(r+5.5)} ${y(e-c*1.4)} ${y(r+1)}" fill="none" stroke="var(--hair-shade)" stroke-width="1.7" stroke-linecap="round"/>`,c>0&&(a+=`<path d="M${y(e+1)} ${y(r-2)} q2.2 -.5 3 1.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>`),r+=i,l++}for(let c=0;c<o.length;c++){const d=o[c];a+=`<rect x="${y(e-6.2)}" y="${d-4}" width="12.4" height="8" rx="2.6" fill="var(--acc)" stroke="${Gt}" stroke-width="2"/><rect x="${y(e-4)}" y="${d-2.5}" width="2.6" height="4.5" rx="1" fill="#fff" opacity=".6"/>`}return a+=`<path d="M${e-4} ${n+2} q2 5 4 6 q2 -1 4 -6" fill="var(--hair)" stroke="${Gt}" stroke-width="2"/>`,a}function Ho(e,t,n,s=5.5){let o=`<path d="M${e} ${t} V${n}" stroke="${Gt}" stroke-width="${y(2*s+4)}" stroke-linecap="round"/><path d="M${e} ${t} V${n}" stroke="var(--hair)" stroke-width="${y(2*s)}" stroke-linecap="round"/>`;for(let i=t+8;i<n;i+=16)o+=`<path d="M${y(e-s*.7)} ${i} Q${e} ${i+5} ${y(e+s*.7)} ${i}" fill="none" stroke="var(--hair-shade)" stroke-width="1.6" opacity=".8"/>`;return o+=`<circle cx="${e}" cy="${n+3}" r="${y(s*.55)}" fill="var(--hair)" stroke="${Gt}" stroke-width="2"/>`,o}function Pi(e,t,n,s){return`<path d="${e}" fill="var(--hair)" ${S(3)}/>${Qe(e,t,n)}${Ct(s)}${ps(s.slice(0,2),.45)}`}function En(e,t,n){return`<ellipse cx="${e}" cy="${t}" rx="8" ry="5.5" fill="var(--acc)" ${S(2.4)} transform="rotate(${n} ${e} ${t})"/><ellipse cx="${e-1}" cy="${t-2}" rx="2.4" ry="1.3" fill="#fff" opacity=".6" transform="rotate(${n} ${e-1} ${t-2})"/>`}const Rt='<path d="M42 104 Q44 76 70 66 Q86 74 100 58 Q114 74 130 66 Q156 76 158 104" fill="none" stroke="#3a1d3c" stroke-width="9" opacity=".12"/>';function nc(e){return e==="puffs"||e==="coily"?"puffs":e==="afro"?"afro":e==="braids"?"braids":e==="boxbraids"?"box":e==="locs"?"locs":e==="sidebraid"?"sidebraid":e==="crown"?"crown":e==="pony"?"pony":e==="sidepony"?"sidepony":e==="pigtails"?"pigtails":e==="halfup"?"halfup":e==="buns"?"buns":e==="topbun"?"topbun":e==="lowbun"?"lowbun":e==="long"?"long":e==="wavy"||e==="wavybob"?e==="wavy"?"wavy":"bob":e==="bob"||e==="curlybob"||e==="sidebangs"?"bob":e==="pixie"?"pixie":(e==="bangs"||e==="short")&&e==="bangs"?"bangs":"short"}function s4(e,t,n){const s=nc(e);if(s==="puffs"){const o=e==="coily"?26:30;return Ti(48,52,o,0,t,n,12)+Ti(152,52,o,.3,t,n,12)+`<path d="M42 112 Q38 48 100 44 Q162 48 158 112 Q154 144 100 146 Q46 144 42 112 Z" fill="var(--hair)" ${S(3.2)}/>`+En(66,68,-35)+En(134,68,35)}if(s==="afro")return Ti(100,78,78,.2,t,n,14);if(s==="braids")return Ze(t,n)+vn(34,108,230,5.4,[196])+vn(166,108,230,5.4,[196]);if(s==="box")return Ze(t,n)+vn(30,110,228,5,[200],10)+vn(170,110,228,5,[200],10);if(s==="locs")return Ze(t,n)+Ho(32,112,236)+Ho(168,112,236);if(s==="sidebraid")return Ze(t,n);if(s==="pony"||s==="sidepony"||s==="halfup"){const o=s==="sidepony"?"M118 78 Q150 70 158 120 Q164 160 150 200 Q136 188 138 160 Q132 120 124 96 Z":"M126 40 Q178 28 180 92 Q184 132 168 168 Q160 196 174 220 Q148 212 145 182 Q140 156 152 124 Q160 90 132 64 Z",i=s==="halfup"?70:s==="sidepony"?86:44;return Ze(t,n)+Pi(o,t,n,s==="sidepony"?["M130 96 Q150 120 146 160","M138 110 Q154 140 148 180"]:["M146 56 Q170 88 160 130","M156 66 Q176 100 166 140","M150 150 Q148 180 160 206"])+En(s==="sidepony"?124:128,i,s==="sidepony"?-20:25)}if(s==="pigtails")return Ze(t,n)+Pi("M40 100 Q22 120 28 168 Q34 200 48 214 Q58 196 52 160 Q58 124 56 108 Z",t,n,["M40 120 Q32 150 40 184"])+Pi("M160 100 Q178 120 172 168 Q166 200 152 214 Q142 196 148 160 Q142 124 144 108 Z",t,n,["M160 120 Q168 150 160 184"])+En(52,96,20)+En(148,96,-20);if(s==="buns"){let o="";for(const i of[52,148])o+=`<circle cx="${i}" cy="44" r="24" fill="var(--hair)" ${S(3.2)}/>${n?`<circle cx="${i}" cy="44" r="24" fill="url(#${t}h)"/>`:""}`,o+=Ct([`M${i-14} 48 Q${i-14} 28 ${i} 26 Q${i+16} 30 ${i+14} 48`,`M${i-8} 54 Q${i+8} 56 ${i+12} 48`]),o+=`<path d="M${i-12} 34 Q${i-4} 24 ${i+4} 26" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>`;return o+Ze(t,n)}if(s==="topbun")return`<circle cx="100" cy="30" r="26" fill="var(--hair)" ${S(3.2)}/>${n?`<circle cx="100" cy="30" r="26" fill="url(#${t}h)"/>`:""}<path d="M82 28 Q100 12 118 28" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>${Ct(["M86 36 Q100 24 114 36","M90 42 Q100 34 110 42"])}${Ze(t,n)}`;if(s==="lowbun")return Ze(t,n)+`<circle cx="100" cy="168" r="22" fill="var(--hair)" ${S(3)}/>${n?`<circle cx="100" cy="168" r="22" fill="url(#${t}h)"/>`:""}${En(100,148,0)}`;if(s==="long"||s==="wavy"){const o=s==="wavy"?"M36 108 Q28 160 40 210 Q52 250 46 286 Q70 270 78 230 Q60 180 58 140 Q52 120 48 108 Z M164 108 Q172 160 160 210 Q148 250 154 286 Q130 270 122 230 Q140 180 142 140 Q148 120 152 108 Z":"M38 110 Q30 170 36 240 Q42 280 34 300 L70 292 Q64 240 66 180 Q62 140 56 112 Z M162 110 Q170 170 164 240 Q158 280 166 300 L130 292 Q136 240 134 180 Q138 140 144 112 Z";return`<path d="${o}" fill="var(--hair)" ${S(3)}/>${Qe(o,t,n)}${Ze(t,n)}`}if(s==="bob"){const o=e==="curlybob"?"M30 120 Q24 170 48 196 Q70 210 100 206 Q130 210 152 196 Q176 170 170 120 Q150 150 100 156 Q50 150 30 120 Z":"M32 116 Q26 168 50 190 Q78 204 100 200 Q122 204 150 190 Q174 168 168 116 Q150 148 100 154 Q50 148 32 116 Z";return`<path d="${o}" fill="var(--hair)" ${S(3.2)}/>${Qe(o,t,n)}${Ze(t,n)}`}return Ze(t,n)}function o4(e,t,n){const s=nc(e),o='<path d="M100 34 V56" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>';if(s==="puffs"||s==="braids"||s==="box"||s==="locs"||s==="afro"||s==="bangs"){const a=s==="afro"?"M48 100 Q52 48 100 40 Q148 48 152 100 Q140 78 100 70 Q60 78 48 100 Z":s==="bangs"?"M40 108 Q36 40 100 34 Q164 40 160 108 L150 96 Q130 108 100 100 Q70 108 50 96 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q154 74 130 62 Q112 70 100 52 Q88 70 70 62 Q46 74 40 106 Z";let r=Rt+`<path d="${a}" fill="var(--hair)" ${S(3.2)}/>${Qe(a,t,n)}${o}`;return r+=Ct(["M84 44 Q70 52 60 70","M116 44 Q130 52 140 70","M92 40 Q80 48 74 58","M108 40 Q120 48 126 58","M76 42 Q58 56 52 82","M124 42 Q142 56 148 82"]),r+=ps(["M90 36 Q78 42 70 52","M112 36 Q124 42 132 52"]),s==="puffs"?(r+=`<path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="${Gt}" stroke-width="7" stroke-linecap="round"/><path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`,r+=`<path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="${Gt}" stroke-width="7" stroke-linecap="round"/><path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`):s==="braids"||s==="box"?(r+=vn(48,114,200,5,[156],s==="box"?10:7),r+=vn(152,114,200,5,[156],s==="box"?10:7)):s==="locs"&&(r+=Ho(46,116,210,4.6)+Ho(154,116,210,4.6)),r+zt()}if(s==="sidebraid"){const a="M40 108 Q36 36 100 32 Q164 36 160 100 Q140 78 100 70 Q70 80 40 108 Z";return Rt+`<path d="${a}" fill="var(--hair)" ${S(3.2)}/>${Qe(a,t,n)}${Ct(["M70 46 Q86 60 96 74","M120 44 Q136 58 146 74"])}${vn(150,100,210,5.6,[168],7)}${zt()}`}if(s==="crown"){const a="M40 106 Q36 36 100 32 Q164 36 160 106 Q150 80 100 74 Q50 80 40 106 Z";let r="";for(let l=0;l<7;l++){const c=58+l*14;r+=`<path d="M${c} 58 Q${c+7} 46 ${c+14} 58" fill="none" stroke="var(--hair-shade)" stroke-width="3.2" stroke-linecap="round"/>`}return Rt+`<path d="${a}" fill="var(--hair)" ${S(3.2)}/>${Qe(a,t,n)}${r}${zt()}`}if(s==="pony"||s==="sidepony"||s==="halfup"||s==="pigtails"){const a=s==="sidepony"?"M40 108 Q34 36 100 32 Q166 34 160 108 Q150 86 120 78 Q90 90 60 74 Q48 90 40 108 Z":"M40 108 Q34 34 100 32 Q166 34 160 108 Q156 84 144 72 Q128 86 104 80 Q86 78 72 68 Q60 84 48 84 Q42 94 40 108 Z";let r=Rt+`<path d="${a}" fill="var(--hair)" ${S(3.2)}/>${Qe(a,t,n)}`;return r+=`<path d="M40 104 Q36 120 44 132 Q46 116 50 106 Z" fill="var(--hair)" ${S(2.4)}/><path d="M160 104 Q164 120 156 132 Q154 116 150 106 Z" fill="var(--hair)" ${S(2.4)}/>`,r+=Ct(["M70 46 Q90 60 104 74","M128 46 Q140 60 146 74","M96 40 Q110 56 116 66"]),r+=ps(["M76 42 Q92 52 100 62"]),r+zt()}if(s==="buns"||s==="topbun"||s==="lowbun"){const a=s==="topbun"?"M44 108 Q40 50 100 46 Q160 50 156 108 Q148 82 100 74 Q52 82 44 108 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q152 80 138 70 Q126 80 112 76 Q104 82 100 74 Q96 82 88 76 Q74 80 62 70 Q48 80 40 106 Z";let r=Rt+`<path d="${a}" fill="var(--hair)" ${S(3.2)}/>${Qe(a,t,n)}`;if(r+=Ct(["M80 42 Q72 56 68 68","M120 42 Q128 56 132 68","M100 36 Q98 56 100 70","M90 38 Q84 56 86 72","M110 38 Q116 56 114 72"]),r+=ps(["M86 38 Q80 46 78 54","M114 38 Q120 46 122 54"]),s==="buns")for(const[l,c]of[[42,1],[158,-1]]){const d=`M${l} 100 q${-8*c} 14 ${-2*c} 24 q${5*c} 8 ${-1*c} 14`;r+=`<path d="${d}" fill="none" stroke="${Gt}" stroke-width="7" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`}return r+zt()}if(s==="long"||s==="wavy"||s==="bob"){const a=e==="sidebangs"||e==="wavybob"?"M38 108 Q34 40 70 36 Q100 34 112 48 Q90 70 48 78 Q36 90 38 108 Z M112 48 Q140 36 164 50 Q166 100 150 108 Q130 80 112 70 Z":"M40 108 Q34 36 100 32 Q166 36 160 108 Q152 78 128 68 Q112 78 100 60 Q88 78 72 68 Q48 78 40 108 Z";return Rt+`<path d="${a}" fill="var(--hair)" ${S(3.2)}/>${Qe(a,t,n)}${Ct(["M78 46 Q68 64 64 80","M122 46 Q132 64 136 80","M100 38 V64"])}${ps(["M88 40 Q80 50 76 60"])}${zt()}`}if(s==="pixie"){const a="M48 104 Q44 48 100 40 Q140 46 150 78 Q156 100 140 108 Q120 86 100 90 Q70 84 52 104 Z";return Rt+`<path d="${a}" fill="var(--hair)" ${S(3.2)}/>${Qe(a,t,n)}${Ct(["M70 56 Q86 70 96 84","M118 52 Q132 66 138 82"])}${zt()}`}const i="M46 106 Q42 46 100 38 Q158 46 154 106 Q140 80 100 76 Q60 80 46 106 Z";return Rt+`<path d="${i}" fill="var(--hair)" ${S(3.2)}/>${Qe(i,t,n)}${o}${zt()}`}const Kn="var(--line)";function Ln(e,t,n,s=[]){const o=s.map(i=>`<path d="${i}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`).join("");return(n?`<path d="${e}" fill="url(#${t}c)"/>`:"")+o}function ia(e,t,n){const s=(n+7).toFixed(1);return`<path d="${e}" fill="none" stroke="${Kn}" stroke-width="${s}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function Ra(e,t,n){return kn("arm",e,t,n)}function po(e,t,n=!1){const[s,o]=pt[e],i=e==="l"?-1:1;let a=ia(`M${s} ${o} L${s+7*i} ${o+20}`,"var(--top)",22);return n&&(a+=`<path d="M${s+7*i-12} ${o+17} H${s+7*i+12}" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round" opacity=".9" transform="rotate(${-18*i} ${s+7*i} ${o+17})"/>`),Ra(e,a,t)}function Ms(e,t,n=!0){const[s,o]=pt[e],[i,a]=yn[e],r=e==="l"?-1:1,l=(s+i)/2+6*r;let c=ia(`M${s-2*r} ${o-2} Q${l} ${(o+a)/2-6} ${i-r} ${a-16}`,"var(--top)",21);return n&&(c+=ia(`M${i-3*r} ${a-17} L${i-r} ${a-13}`,"var(--top-trim)",20)),Ra(e,c,t)}function aa(e,t,n=!1){const[s,o]=pt[e],i=e==="l"?-1:1,a=s+4*i,r=o+8;let l=`<path d="${oa(a,r,13,9,3.2)}" fill="var(--top)" ${S(2.8)}/>`;return l+=`<ellipse cx="${a-4*i}" cy="${r-5}" rx="5" ry="3" fill="#fff" opacity=".45"/>`,n&&(l+=`<path d="M${a-11} ${r+13} ${ci(a-11,a+11,r+13,4,3)}" fill="none" stroke="#fff" stroke-width="2.4"/>`),Ra(e,l,t)}function Fe(e,t){return e("l",t)+e("r",t)}const Or="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 228 Q100 236 64 228 Z";function gn(e,t,n,s,o,i,a="",r=[],l=!1){const c=`<path d="${t}" fill="var(--top)" ${S(3)}/>${Ln(t,s,o,r)}${a}`;return`<g class="shirt" data-hem="${i}">${l?c+n:n+c}</g>`}function i4(e,t,n,s,o){if(t.dress)return"";const i=t.top;if(i==="hoodie"){const l="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L139 230 Q100 240 61 230 Z",c=`<path d="M120 162 Q132 164 134 170 L139 230 Q128 233 123 233 Z" ${ke}/><path d="M72 172 Q76 164 86 163" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".38"/><path d="M78 159 Q100 182 122 159 Q120 152 100 152 Q80 152 78 159 Z" fill="var(--top-trim)" ${S(2.8)}/><path d="M92 172 v18 M108 172 v18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="92" cy="191" r="2.6" fill="#fff" ${S(1.8)}/><circle cx="108" cy="191" r="2.6" fill="#fff" ${S(1.8)}/><path d="M78 202 H122 L127 222 H73 Z" fill="var(--top)" ${S(2.6)}/><path d="M78 202 H122 L124 210 H76 Z" ${ke}/><path d="M61 226 Q100 236 139 226 L139 234 Q100 244 61 234 Z" fill="var(--top-trim)" ${S(2.8)}/>`;return gn(e,l,Fe(Ms,e),n,s,o,c,["M74 196 q-2 12 2 22","M126 190 q2 14 0 26"])}if(i==="stripes"||i==="jersey"){const l="M68 168 Q74 158 92 158 H108 Q126 158 132 168 L135 232 Q100 238 65 232 Z",c=`${n}st`,d=i==="jersey"?'<path d="M70 176 H130 L128 188 H72 Z" fill="var(--top-trim)"/><path d="M68 210 H132 L130 222 H70 Z" fill="var(--top-trim)"/>':[166,179,192,205,218,231].map(v=>`<rect x="60" y="${v}" width="80" height="6" fill="var(--top-trim)"/>`).join(""),g=i==="jersey"?'<path d="M86 160 L100 176 L114 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/>':'<path d="M84 159 Q100 172 116 159" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',p=s?`<path d="${l}" fill="url(#${n}c)"/>`:"";return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${c}"><path d="${l}"/></clipPath></defs>${Fe(v=>po(v,e,!0),e)}<path d="${l}" fill="var(--top)"/><g clip-path="url(#${c})">${p}<path d="M118 160 L135 168 L138 236 H120 Z" ${ke}/>${d}</g><path d="${l}" fill="none" ${S(3)}/>${g}<path d="M78 198 q-2 12 1 24" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/><path d="M122 190 q2 14 0 28" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/></g>`}if(i==="sweater"||i==="cardigan"){const l=i==="cardigan"?"M68 168 Q74 158 92 158 H108 Q126 158 132 168 L134 232 H108 L100 210 L92 232 H66 Z":"M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 234 Q100 242 64 234 Z",c=`<path d="M118 166 L134 174 L136 230 Q120 236 112 228 Z" ${ke}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M64 226 Q100 236 136 226" fill="none" stroke="var(--top-trim)" stroke-width="6" stroke-linecap="round"/>`,d=i==="cardigan"?[186,202,218].map(g=>`<circle cx="100" cy="${g}" r="2.4" fill="var(--top-trim)" ${S(1.4)}/>`).join(""):"";return gn(e,l,Fe(Ms,e),n,s,o,c+d,["M80 190 q-2 16 0 28","M120 188 q2 16 0 30"])}if(i==="tank"||i==="bib"){const l=i==="bib"?"M78 168 H122 L126 228 H74 Z":"M78 168 Q86 160 96 164 H104 Q114 160 122 168 L128 226 H72 Z",c=`<path d="M110 172 H126 L128 226 H114 Z" ${ke}/><path d="M82 176 Q84 168 92 166" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".35"/>`,d=i==="bib"?`${c}<path d="M86 150 L78 168 M114 150 L122 168" stroke="${Kn}" stroke-width="8" stroke-linecap="round"/><path d="M86 150 L78 168 M114 150 L122 168" stroke="var(--top)" stroke-width="4.5" stroke-linecap="round"/><rect x="90" y="176" width="20" height="16" rx="3" fill="var(--top-trim)" ${S(1.6)}/>`:`${c}<path d="M84 166 Q100 176 116 166" fill="none" stroke="var(--top-trim)" stroke-width="4"/>`;return gn(e,l,"",n,s,o,d,["M88 190 q2 14 0 24"])}if(i==="puff"||i==="ruffle"){const l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L132 222 H68 Z",c=`<path d="M100 172 l-8 -5 v10 z M100 172 l8 -5 v10 z" fill="var(--top-trim)" ${S(1.8)}/><path d="M97 174 l-4 10 M103 174 l4 10" stroke="var(--top-trim)" stroke-width="2.6" stroke-linecap="round"/>`,d=(i==="ruffle"?`<path d="M68 166 Q74 178 82 166 Q90 180 100 166 Q110 180 118 166 Q126 180 132 166" fill="var(--top-trim)" ${S(2)}/>`:c)+`<path d="M118 162 Q128 164 130 170 L132 222 H120 Z" ${ke}/><path d="M74 176 Q76 168 84 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return gn(e,l,Fe(aa,e),n,s,o,d,["M86 190 q2 10 0 20","M116 188 q-2 12 0 22"],!0)}if(i==="button"){const l=Or,c=[180,196,212].map(g=>`<circle cx="100" cy="${g}" r="2.6" fill="#fff" ${S(1.6)}/>`).join(""),d=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${ke}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M100 164 V226" stroke="#fff" stroke-width="2" opacity=".7"/>${c}<path d="M82 160 Q100 172 118 160" fill="var(--top)" ${S(2.2)}/>`;return gn(e,l,Fe(g=>po(g,e,!1),e),n,s,o,d,["M78 196 q-1 12 2 20"])}if(i==="raincoat"){const l="M62 168 Q70 156 92 156 H108 Q130 156 138 168 L146 240 Q100 252 54 240 Z",c=`<path d="M120 164 L142 176 L146 236 Q124 244 116 232 Z" ${ke}/><path d="M72 176 Q76 166 88 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M70 156 Q100 176 130 156" fill="none" stroke="var(--top-trim)" stroke-width="6"/><circle cx="100" cy="196" r="4" fill="var(--top-trim)" ${S(1.8)}/><path d="M78 214 H122" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round"/>`;return gn(e,l,Fe(Ms,e),n,s,o,c,["M76 190 q-4 18 -2 36","M124 188 q4 18 2 36"])}const a=Or,r=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${ke}/><path d="M84 160 Q100 172 116 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return gn(e,a,Fe(l=>po(l,e,!1),e),n,s,o,r,["M78 196 q-2 12 1 22","M122 194 q2 14 -1 24"])}function Ir(e,t,n,s,o,i=!1,a=16){const r=e==="l"?88:112,l=e==="l"?-1:1,c=`M${r-a/2} 226 Q${r-a/2+l} ${n-20} ${r-a/2+2*l} ${n} H${r+a/2} Q${r+a/2} ${n-30} ${r+a/2-l} 226 Z`;let d=`<path d="${c}" fill="var(--bottom)" ${S(2.8)}/>`;return d+=Ln(c,s,o,[`M${r-4*l} 240 Q${r} ${(226+n)/2} ${r+3*l} ${n-14}`]),e==="r"?d+=`<path d="M${r+1} 230 H${r+a/2} L${r+a/2} ${n} H${r+4} Z" ${ke}/>`:d+=`<path d="M${r-2} 238 Q${r-6} ${(226+n)/2} ${r-2} ${n-10}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".3"/>`,i&&(d+=`<path d="M${r-a/2-1} ${n-8} H${r+a/2+1} V${n+1} H${r-a/2-1} Z" fill="var(--bottom-trim)" ${S(2)}/>`),kn("leg",e,d,t)}function a4(e,t,n,s){if(t.dress)return'<g data-layer="bottom"></g>';const o=t.bottom;if(o==="skirt"){const p="M68 222 H132 L146 262 Q100 274 54 262 Z";return`<g data-layer="bottom"><path class="skirt" d="${p}" fill="var(--bottom)" ${S(3)}/>${Ln(p,n,s,["M82 234 L76 258","M100 232 V266","M118 234 L126 258"])}<path d="M114 224 H132 L146 262 Q130 268 118 266 Z" ${ke}/><path d="M72 228 Q66 246 64 258" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".3"/><path d="M84 236 v10 M116 236 v10" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/></g>`}if(o==="tutu")return'<g data-layer="bottom"></g>';if(o==="overalls"){const p="M66 220 H134 L139 264 H106 L100 254 L94 264 H61 Z";return`<g data-layer="bottom"><g class="leg" style="transform-box:view-box;transform-origin:100px 238px"><path d="${p}" fill="var(--bottom)" ${S(3)}/>${Ln(p,n,s,["M78 232 Q74 248 72 260","M122 230 Q128 248 132 260"])}<path d="M118 222 H134 L139 264 H122 Z" ${ke}/><path d="M64 258 H95 M105 258 H138" stroke="var(--bottom-trim)" stroke-width="4"/></g></g>`}const a=o==="shorts"?256:292,r=o==="joggers"||o==="jeans",l=o==="leggings"?12:o==="shorts"?18:16,c=Ir("l",e,a,n,s,r,l)+Ir("r",e,a,n,s,r,l),d=o==="jeans"?'<path d="M88 232 V286 M112 232 V286" stroke="#c9a24a" stroke-width="1.4" stroke-dasharray="2 3" opacity=".7"/>':"";return`<g data-layer="bottom">${`<path d="M70 220 H130 V230 H70 Z" fill="var(--bottom)" ${S(2.4)}/>`}${c}${d}</g>`}function r4(e,t,n,s){if(t.dress)return'<g data-layer="bottom-over"></g>';const o=t.bottom;if(o==="overalls"){const i="M78 180 H122 L124 228 H76 Z";return`<g data-layer="bottom-over"><path d="M80 176 L72 164 M120 176 L128 164" stroke="${Kn}" stroke-width="12" stroke-linecap="round"/><path d="M80 176 L72 164 M120 176 L128 164" stroke="var(--bottom)" stroke-width="7.5" stroke-linecap="round"/><path d="${i}" fill="var(--bottom)" ${S(3)}/>${Ln(i,n,s,["M86 200 q14 6 28 0"])}<path d="M88 190 H112 V206 Q100 212 88 206 Z" fill="var(--bottom-trim)" ${S(2.4)}/><circle cx="82" cy="186" r="3.6" fill="#fff" ${S(2)}/><circle cx="118" cy="186" r="3.6" fill="#fff" ${S(2)}/><path d="M66 222 H134 L135 230 H65 Z" fill="var(--bottom)" ${S(3)}/><path d="M108 180 H122 L124 228 H110 Z" ${ke}/><path d="M82 182 v12" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/></g>`}if(o==="tutu"){let i="";const a=[[266,50,150,8],[256,56,144,7],[246,64,136,6]];for(let l=0;l<a.length;l++){const[c,d,g,p]=a[l],m=`M${d+8} ${c-22} H${g-8} L${g} ${c} ${ci(g,d,c,6,p)} Z`;i+=`<path class="skirt" d="${m}" fill="var(--bottom)" ${S(2.4)}/>`,i+=`<path d="M${g-20} ${c-16} L${g-6} ${c-2}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".2"/>`}const r="M66 214 H134 V224 H66 Z";return`<g data-layer="bottom-over">${i}<path d="${r}" fill="var(--bottom-trim)" ${S(2.6)}/>${Ln(r,n,s)}</g>`}return'<g data-layer="bottom-over"></g>'}function qr(e,t){return`<path d="M${e} ${t+2} c-3 -5 -9 -1 -5 3 l5 4 l5 -4 c4 -4 -2 -8 -5 -3z" fill="var(--top-trim)" opacity=".85"/>`}function l4(e,t,n,s,o){const i=t.dress;if(!i)return"";const a=`${n}dr`;let r="M72 210 H128 L150 268 Q100 282 50 268 Z",l="M72 168 Q78 158 94 158 H106 Q122 158 128 168 L130 214 H70 Z",c="",d=Fe(v=>aa(v,e,!0),e),g=!0;i==="sundress"?(r="M76 214 H124 L140 266 Q100 276 60 266 Z",c='<path d="M78 166 Q100 180 122 166" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',d="",g=!1):i==="party"?c=[[64,236],[86,228],[108,234],[130,242],[76,254],[100,250],[122,258],[92,188]].map(([$,x])=>qr($,x)).join("")+`<path d="M100 214 l-10 -6 v12 z M100 214 l10 -6 v12 z" fill="var(--top-trim)" ${S(1.8)}/><path d="M52 262 Q100 276 148 262" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="1 5" opacity=".85"/>`:i==="pinafore"?(l="M80 176 H120 L122 214 H78 Z",c='<path d="M86 158 L80 178 M114 158 L120 178" stroke="var(--top)" stroke-width="5" stroke-linecap="round"/>',d="",g=!1,r="M74 212 H126 L142 264 Q100 274 58 264 Z"):i==="jumper"?(c=`<path d="M84 160 Q100 174 116 160" fill="var(--top-trim)" ${S(2)}/>`,d=Fe(v=>po(v,e,!0),e),g=!1):i==="ballet"?(r="M78 214 H122 L132 250 Q100 258 68 250 Z",c=`<path d="M70 248 ${ci(70,130,248,5,5)}" fill="none" stroke="#fff" stroke-width="2"/>`,d=Fe(aa,e)):i==="nightgown"?(r="M80 214 H120 L132 270 Q100 278 68 270 Z",c='<path d="M88 164 Q100 176 112 164" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>',d=Fe(Ms,e),g=!1):i==="raindress"?(r="M70 212 H130 L148 268 Q100 280 52 268 Z",c='<path d="M76 168 Q100 186 124 168" fill="none" stroke="var(--top-trim)" stroke-width="5"/><circle cx="100" cy="198" r="3.4" fill="var(--top-trim)"/>',d=Fe(Ms,e),g=!1):(r="M70 214 H130 L152 266 Q100 280 48 266 Z",l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L131 216 H69 Z",c=[[66,236],[86,228],[110,232],[132,240],[76,254],[100,248],[124,258],[56,260],[144,262],[96,266],[84,182],[114,190],[100,200]].map(([$,x])=>qr($,x)).join("")+`<path d="M112 214 H130 L152 266 Q138 271 128 272 Z" ${ke}/><path d="M118 162 L130 168 L131 216 H120 Z" ${ke}/><path d="M50 262 Q100 276 150 262" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9"/><path d="M60 226 Q56 244 54 258" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/><path d="M68 210 H132 V220 H68 Z" fill="var(--top-trim)" ${S(2.6)}/><path d="M100 215 l-13 -8 v16 z M100 215 l13 -8 v16 z" fill="var(--top-trim)" ${S(2.2)}/><circle cx="100" cy="215" r="3.6" fill="var(--top-trim)" ${S(2)}/><path d="M97 218 l-5 14 M103 218 l5 14" stroke="var(--top-trim)" stroke-width="3" stroke-linecap="round"/><path d="M80 158 Q78 172 94 170 Q99 166 100 162 Q101 166 106 170 Q122 172 120 158 Q100 164 80 158 Z" fill="#fff" ${S(2.4)}/>`);const p=`${r} ${l}`,m=`<path class="skirt" d="${r}" fill="var(--top)" ${S(3)}/><path d="${l}" fill="var(--top)" ${S(3)}/><g clip-path="url(#${a})">${Ln(p,n,s,["M80 226 Q74 248 70 266","M120 226 Q126 248 130 266"])}${c}</g>`;return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${a}"><path d="${p}"/></clipPath></defs>${g?m+d:d+m}</g>`}function c4(e,t,n,s){const o=e==="l"?`<g transform="translate(${2*s} 0) scale(-1 1)">${n}</g>`:n;return kn("leg",e,o,t)}function d4(e,t){const n=t.shoes;let s="";for(const o of["l","r"]){const i=o==="l"?87:113;let a="";if(n==="sneakers"||n==="lightup"){const r=n==="lightup"?`<circle cx="${i-4}" cy="292" r="2.2" fill="#ff8fab"/><circle cx="${i+4}" cy="296" r="2.2" fill="#8ecae6"/><circle cx="${i}" cy="300" r="2" fill="#ffd166"/>`:"";a=`<path d="M${i} 270 V286" fill="none" stroke="var(--sock)" stroke-width="16" stroke-linecap="round"/><path d="M${i-14} 296 Q${i-14} 284 ${i} 284 Q${i+14} 284 ${i+16} 296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+12} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${S(2.8)}/><path d="M${i-12} 304 H${i+18}" stroke="var(--shoe-trim)" stroke-width="3.5" stroke-linecap="round"/><path d="M${i-6} 290 l5 2 M${i-6} 295 l6 2" stroke="${Kn}" stroke-width="1.8" stroke-linecap="round"/>${r}`}else if(n==="boots"||n==="rainboots"){const r=n==="rainboots"?248:258,l=n==="boots"?[[-6,272],[5,268],[-2,284],[7,290],[-8,294]].map(([c,d])=>`<circle cx="${i+c}" cy="${d}" r="2.6" fill="#fff" opacity=".9"/>`).join(""):"";a=`<path d="M${i-14} ${r} H${i+14} V296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+10} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${S(2.8)}/><path d="M${i-16} ${r-4} H${i+16} V${r+8} H${i-16} Z" fill="var(--shoe)" ${S(2.6)}/>`+l+(n==="rainboots"?`<path d="M${i-12} ${r+16} H${i+12}" stroke="var(--shoe-trim)" stroke-width="4" stroke-linecap="round"/>`:`<path d="M${i-6} ${r+14} V292" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".45"/>`)}else n==="maryjanes"?a=`<path d="M${i} 266 V290" fill="none" stroke="var(--sock)" stroke-width="15" stroke-linecap="round"/><path d="M${i-12} 274 ${ci(i-12,i+12,274,4,4)} L${i+12} 268 H${i-12} Z" fill="var(--sock)" ${S(2)}/><path d="M${i-13} 298 Q${i-13} 290 ${i} 290 Q${i+13} 290 ${i+14} 298 Q${i+20} 300 ${i+20} 304 Q${i+20} 309 ${i+8} 309 H${i-12} Q${i-16} 309 ${i-14} 302 Z" fill="var(--shoe)" ${S(2.8)}/><path d="M${i-10} 294 H${i+12}" stroke="${Kn}" stroke-width="2"/><circle cx="${i+8}" cy="294" r="2.2" fill="var(--acc)"/>`:n==="sandals"?a=`<path d="M${i-12} 298 Q${i-12} 286 ${i} 286 Q${i+12} 286 ${i+14} 296 Q${i+18} 298 ${i+18} 302 Q${i+18} 306 ${i+8} 306 H${i-12} Q${i-16} 306 ${i-14} 300 Z" fill="var(--skin)" ${S(2.4)}/><path d="M${i-14} 304 H${i+18}" stroke="var(--shoe)" stroke-width="5" stroke-linecap="round"/><path d="M${i-8} 292 H${i+10} M${i+2} 300 L${i+8} 290" stroke="var(--shoe)" stroke-width="4" stroke-linecap="round"/><circle cx="${i+2}" cy="293" r="3" fill="var(--shoe-trim)" ${S(1.4)}/>`:n==="slippers"?a=`<path d="M${i-14} 292 Q${i-14} 280 ${i} 278 Q${i+16} 280 ${i+18} 294 Q${i+22} 296 ${i+20} 304 H${i-14} Q${i-18} 304 ${i-16} 296 Z" fill="var(--shoe)" ${S(2.8)}/><path d="M${i-6} 286 q6 -4 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`:a=`<ellipse cx="${i+2}" cy="304" rx="16" ry="7" fill="var(--shoe)" ${S(2.6)}/>`;s+=c4(o,e,a,i)}return`<g data-layer="shoes">${s}</g>`}const sc=new Set(["cap","beanie","sunhat"]),g4=new Set(["catears","earmuffs"]);function oc(e){return e==="afro"?28:e==="topbun"?20:e==="puffs"||e==="coily"?16:e==="buns"||e==="curlybob"?12:e==="long"||e==="wavy"||e==="wavybob"?8:0}function ds(e,t,n){if(!sc.has(t)&&!g4.has(t))return n;const s=oc(e);return s?`<g data-hat="${t}" transform="translate(0 ${y(-s)})">${n}</g>`:n}function f4(e,t,n){let s="";for(let l=0;l<n.length;l++)sc.has(n[l])&&(s=n[l]);if(!s)return"";const o=oc(t),i=(s==="beanie"?58:s==="cap"?64:62)-o,a=Math.min(70,i),r=t==="afro"||t==="puffs"||t==="coily"?92:78;return`<mask id="${e}hm" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" data-brim="${y(a)}"><rect x="-30" y="-50" width="260" height="420" fill="#fff"/><rect x="${y(100-r)}" y="-50" width="${y(r*2)}" height="${y(a+50)}" fill="#000"/></mask>`}function Ui(e,t,n){return`<g transform="translate(${e} ${t}) scale(${n})"><path d="M0 0 C-8 -14 -30 -14 -28 0 C-30 14 -8 14 0 0 Z" fill="var(--acc)" ${S(2.6)}/><path d="M0 0 C8 -14 30 -14 28 0 C30 14 8 14 0 0 Z" fill="var(--acc)" ${S(2.6)}/><rect x="-6" y="-7" width="12" height="14" rx="4" fill="var(--acc2)" ${S(2.2)}/></g>`}function h4(e){return`<g data-layer="accessory">${e.acc.map(n=>n==="glasses"?'<circle cx="76" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="124" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="76" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><circle cx="124" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3.2"/><path d="M58 108 L42 104 M142 108 L158 104" stroke="var(--frame)" stroke-width="3.2" stroke-linecap="round"/>':n==="square"?'<rect x="58" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><rect x="108" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><path d="M92 112 H108" stroke="var(--frame)" stroke-width="3.2"/>':n==="sunnies"?'<path d="M56 104 H94 Q96 122 76 122 Q56 122 56 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M106 104 H144 Q146 122 124 122 Q104 122 106 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3"/>':n==="bow"?Ui(100,78,.7):n==="bigbow"?Ui(100,70,1.15):n==="headband"?`<path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="${Kn}" stroke-width="12" stroke-linecap="round"/><path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round"/>${Ui(100,32,.85)}`:n==="flower"?`<g transform="translate(138 78)">${[0,60,120,180,240,300].map(s=>`<ellipse cx="0" cy="-8" rx="5" ry="8" fill="var(--acc)" ${S(1.6)} transform="rotate(${s})"/>`).join("")}<circle r="4.5" fill="var(--acc2)" ${S(1.6)}/></g>`:n==="cap"?ds(e.hair,"cap",`<path d="M54 64 Q56 20 100 16 Q144 20 146 64 Q128 54 100 56 Q72 54 54 64 Z" fill="var(--acc)" ${S(3)}/><path d="M48 56 Q100 66 152 56 L156 62 Q100 70 44 62 Z" fill="var(--acc)" ${S(3)}/><circle cx="100" cy="18" r="4.5" fill="#fff" ${S(2)}/>`):n==="beanie"?ds(e.hair,"beanie",`<path d="M50 66 Q48 14 100 8 Q152 14 150 66 Q128 56 100 58 Q72 56 50 66 Z" fill="var(--acc)" ${S(3)}/><path d="M50 58 H150" stroke="var(--acc2)" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="8" r="7" fill="var(--acc2)" ${S(2.4)}/>`):n==="sunhat"?ds(e.hair,"sunhat",`<path d="M66 56 Q68 22 100 18 Q132 22 134 56 Q118 48 100 50 Q82 48 66 56 Z" fill="var(--acc)" ${S(3)}/><path d="M18 56 Q100 68 182 56 Q170 64 100 66 Q30 64 18 56 Z" fill="var(--acc)" ${S(3)}/><path d="M72 46 Q100 38 128 46" fill="none" stroke="var(--acc2)" stroke-width="4"/>`):n==="catears"?ds(e.hair,"catears",`<path d="M58 62 L70 18 L86 60 Z" fill="var(--acc)" ${S(2.6)}/><path d="M114 60 L130 18 L142 62 Z" fill="var(--acc)" ${S(2.6)}/><path d="M64 54 L72 30 L80 52 Z" fill="var(--acc2)"/><path d="M120 52 L128 30 L136 54 Z" fill="var(--acc2)"/>`):n==="earmuffs"?ds(e.hair,"earmuffs",`<path d="M44 68 Q48 26 100 22 Q152 26 156 68" fill="none" stroke="var(--acc)" stroke-width="6"/><circle cx="34" cy="86" r="14" fill="var(--acc)" ${S(2.8)}/><circle cx="166" cy="86" r="14" fill="var(--acc)" ${S(2.8)}/><circle cx="34" cy="86" r="6" fill="var(--acc2)"/><circle cx="166" cy="86" r="6" fill="var(--acc2)"/>`):"").join("")}</g>`}const p4=[{hip:1.5,head:4,armL:3,armR:-2,legL:0,legR:-3,legLLift:0,legRLift:0},{hip:-2,head:-5,armL:1,armR:-7,legL:4,legR:0,legLLift:2,legRLift:0},{hip:0,head:3,armL:2,armR:-2,legL:0,legR:0,legLLift:0,legRLift:0},{hip:-1.5,head:-4,armL:4,armR:-1,legL:5,legR:0,legLLift:3,legRLift:0}],u4={puffs:0,afro:0,pony:1,sidepony:1,pigtails:1,halfup:1,braids:2,boxbraids:2,locs:2,sidebraid:2,crown:2,buns:3,topbun:3,lowbun:3};function ic(e){const t=e.hair||"buns";let n=u4[t];if(n===void 0){let s=0;for(let o=0;o<t.length;o++)s=(s+t.charCodeAt(o))%4;n=s}return p4[n]}function m4(e){const t=(n,s,o,i,a)=>{const r=na(n,s,o,i,a),l=na(r.x,r.y,100,238,e.hip);return{x:l.x/2,y:l.y/2}};return{left:t(yn.l[0],yn.l[1],pt.l[0],pt.l[1],e.armL),right:t(yn.r[0],yn.r[1],pt.r[0],pt.r[1],e.armR)}}function y4(e){const t=na(100,244,100,238,e.hip);return Math.round(t.y/2*10)/10}function Aa(e){const t=parseInt(e.slice(1),16);return(t>>16&255)+(t>>8&255)+(t&255)}function k4(e){const t=xs(e,.32);return Aa(t)<80?"#5a3a2c":t}function v4(e){return Aa(e)<140?"#3b2340":xs(e,.12)}let Nr=0;function b4(){return Nr+=1,"a"+Nr.toString(36)}function us(e,t){return t.hip?`<g transform="rotate(${y(t.hip)} 100 238)">${e}</g>`:e}function gs(e,t){const n=t.head?`<g transform="rotate(${y(t.head)} 100 158)">${e}</g>`:e;return us(n,t)}function w4(e,t,n){let s=`<defs><radialGradient id="${e}b"><stop offset="0" style="stop-color:var(--blush)" stop-opacity=".62"/><stop offset=".55" style="stop-color:var(--blush)" stop-opacity=".28"/><stop offset="1" style="stop-color:var(--blush)" stop-opacity="0"/></radialGradient>`;return s+=`<radialGradient id="${e}s"><stop offset="0" stop-color="#3a1d3c" stop-opacity=".3"/><stop offset=".6" stop-color="#3a1d3c" stop-opacity=".12"/><stop offset="1" stop-color="#3a1d3c" stop-opacity="0"/></radialGradient>`,s+=`<radialGradient id="${e}k" cx=".42" cy=".36" r=".75"><stop offset=".55" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".16"/></radialGradient>`,t&&(s+=`<linearGradient id="${e}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f1020" stop-opacity=".62"/><stop offset=".5" stop-color="#1f1020" stop-opacity=".05"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`,s+=`<linearGradient id="${e}c" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="146" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".2"/></linearGradient>`,s+=`<radialGradient id="${e}h" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1f1020" stop-opacity=".28"/></radialGradient>`),s+n+"</defs>"}function jr(e){const t=e==="l"?-1:1,n=pt[e][0],s=pt[e][1],o=yn[e][0],i=yn[e][1],a=o-t,r=i-7,l=-t;let c=`<path d="${sa([n,s],[a,r],18,13,-3*t)}" fill="var(--skin)" ${S(3)}/>`;return c+=`<path class="hand" d="M${y(o-8)} ${y(i-4)} Q${y(o-8)} ${y(i-10)} ${y(o)} ${y(i-10)} Q${y(o+8)} ${y(i-10)} ${y(o+8)} ${y(i-3)} Q${y(o+8.5)} ${y(i+9)} ${y(o)} ${y(i+9.5)} Q${y(o-8.5)} ${y(i+9)} ${y(o-8)} ${y(i-4)} Z" fill="var(--skin)" ${S(2.8)}/>`,c+=`<ellipse cx="${y(o+7*l)}" cy="${y(i-1)}" rx="3.4" ry="5" fill="var(--skin)" ${S(2.4)} transform="rotate(${-20*l} ${y(o+7*l)} ${y(i-1)})"/>`,c+=`<path d="M${y(o-3*l)} ${y(i+3)} v4 M${y(o+.5*l)} ${y(i+3.5)} v4" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`,c+=`<ellipse cx="${y(o-3*l)}" cy="${y(i-5)}" rx="3" ry="1.8" fill="#fff" opacity=".35"/>`,c}function Zr(e){const t=e==="l"?-1:1,n=e==="l"?88:112;let s=`<path d="${sa([n,234],[n+t,294],21,15,1.5*t)}" fill="var(--skin)" ${S(3)}/>`;return s+=`<path d="${sa([n+5*t,244],[n+5*t,290],6,4)}" ${ke}/>`,s+=`<ellipse cx="${y(n+.5*t)}" cy="268" rx="4.5" ry="2.6" fill="#3a1d3c" opacity=".12"/>`,s+=`<path d="M${n-4} 265 q4 -2.5 8 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`,s}function Fr(e,t,n,s,o,i){const a=n?-1:1,r=o==="big"||o==="bright"?1.08:o==="soft"?.94:1,l=(f,h)=>`${y(e+f*r)} ${y(t+h*r)}`,c=13.5*r,d=17*r;let g="";if(i&&o!=="soft"){const f=[.35,.95,1.57,2.2,2.8];for(let h=0;h<f.length;h++){const b=f[h];g+=`<path d="M${y(e+5.5*Math.cos(b)*r)} ${y(t+(4+6.5*Math.sin(b))*r)} L${y(e+11.5*Math.cos(b)*r)} ${y(t+(2+14*Math.sin(b))*r)}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>`}}const p=o==="soft"?2:2.6,m=o==="soft"?"":`<path d="M${l(-16*a,-8)} q${y(-6*a*r)} -2 ${y(-9*a*r)} ${y(-9*r)} M${l(-17*a,-2)} q${y(-6*a*r)} ${y(-.5*r)} ${y(-10*a*r)} ${y(-5*r)} M${l(-12*a,-15)} q${y(-3*a*r)} ${y(-4*r)} ${y(-4*a*r)} ${y(-9*r)}" fill="none" stroke="var(--lash)" stroke-width="2.2" stroke-linecap="round"/>`,v=o==="sparkle"||o==="bright"?`<path d="M${l(-9*a,-8)} l.7 1.6 1.6 .7 -1.6 .7 -.7 1.6 -.7 -1.6 -1.6 -.7 1.6 -.7 Z" fill="#fff" opacity=".9"/>`:"",$=i?`<ellipse cx="${e}" cy="${y(t+r)}" rx="${y(c)}" ry="${y(d)}" fill="url(#${s}i)"/>`:"",x=o==="sleepy"?`<path d="M${l(-17,-4)} Q${e} ${y(t+r)} ${l(17,-4)} L${l(18,-16)} Q${e} ${y(t-20*r)} ${l(-18,-16)} Z" fill="var(--skin)"/>`:"";return`<path d="M${l(-16,-2)} Q${l(-16,-20)} ${l(0,-20)} Q${l(16,-20)} ${l(16,-2)} Q${l(16,19)} ${l(0,19)} Q${l(-16,19)} ${l(-16,-2)} Z" fill="#fff"/><path d="M${l(-15,-4)} Q${e} ${y(t-21*r)} ${l(15,-4)} Q${e} ${y(t-14*r)} ${l(-15,-4)} Z" fill="#3a1d3c" opacity=".12"/><ellipse data-iris="1" cx="${e}" cy="${y(t+r)}" rx="${y(c)}" ry="${y(d)}" fill="var(--eye)"/>${$}${g}<ellipse cx="${e}" cy="${y(t+3*r)}" rx="${y(7*r)}" ry="${y(9*r)}" fill="#1f1020" opacity=".8"/><ellipse cx="${e}" cy="${y(t+r)}" rx="${y(11.3*r)}" ry="${y(14.8*r)}" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/><ellipse cx="${e}" cy="${y(t+r)}" rx="${y(c)}" ry="${y(d)}" fill="none" stroke="#1f1020" stroke-width="2" opacity=".55"/><path d="M${l(-9,12)} Q${e} ${y(t+19.5*r)} ${l(9,12)} Q${e} ${y(t+15.5*r)} ${l(-9,12)} Z" fill="#fff" opacity=".5"/><ellipse cx="${y(e-6*a*r)}" cy="${y(t-6*r)}" rx="${y(5.8*r)}" ry="${y(6.8*r)}" fill="#fff" transform="rotate(${-15*a} ${y(e-6*a*r)} ${y(t-6*r)})"/><circle cx="${y(e+6*a*r)}" cy="${y(t+8*r)}" r="${y(2.8*r)}" fill="#fff"/><circle cx="${y(e-4*a*r)}" cy="${y(t+10*r)}" r="${y(1.3*r)}" fill="#fff" opacity=".85"/><path d="M${l(7*a,-10)} l${y(r)} ${y(2.4*r)} ${y(2.4*r)} ${y(r)} ${y(-2.4*r)} ${y(r)} ${y(-r)} ${y(2.4*r)} ${y(-r)} ${y(-2.4*r)} ${y(-2.4*r)} ${y(-r)} ${y(2.4*r)} ${y(-r)} Z" fill="#fff"/>`+v+x+`<path d="M${l(-17,-1)} Q${l(-16,-21)} ${l(0,-21)} Q${l(16,-21)} ${l(17,-3)} Q${l(14.5,-18.6)} ${l(0,-18.8)} Q${l(-14.5,-18.6)} ${l(-15.5,-1)} Z" fill="var(--lash)" stroke="var(--lash)" stroke-width="${p}" stroke-linejoin="round"/>`+m+`<path d="M${l(-11,-23)} Q${e} ${y(t-27*r)} ${l(11,-23)}" fill="none" stroke="var(--line)" stroke-width="1.3" stroke-linecap="round" opacity=".22"/><path d="M${l(-5,20.5)} Q${e} ${y(t+22*r)} ${l(5,20.5)}" fill="none" stroke="var(--lash)" stroke-width="1.3" stroke-linecap="round" opacity=".28"/>`}function $4(e,t,n){const s=e.blush?`<ellipse cx="64" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><ellipse cx="136" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><path d="M60 133 l3 -3 M66 134 l3 -3 M132 133 l3 -3 M138 134 l3 -3" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>`:"";let o="";if(e.freckles){const i=[[58,132],[64,136],[70,131],[130,131],[136,136],[142,132]];for(let a=0;a<i.length;a++)o+=`<circle cx="${i[a][0]}" cy="${i[a][1]}" r="1.5" fill="var(--freckle)" opacity=".7"/>`}return s+o+'<path data-brow="l" d="M64 86 Q74 80 85 84" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/><path data-brow="r" d="M115 84 Q126 80 136 86" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'+Fr(76,112,!1,t,e.eyes,n)+Fr(124,112,!0,t,e.eyes,n)+'<path d="M98 131 q2 1.8 4 0" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" opacity=".55"/><ellipse cx="101.5" cy="128.5" rx="1.6" ry="1" fill="#fff" opacity=".6"/><path d="M92 140 Q100 147.5 108 140" fill="none" stroke="var(--line)" stroke-width="2.8" stroke-linecap="round"/><path d="M96 142.6 Q100 145.4 104 142.6 Q100 144 96 142.6 Z" fill="#ff8fa8"/>'}function _4(e){const t="M40 102 Q38 38 100 38 Q162 38 160 102 Q160 140 132 153 Q116 160 100 160 Q84 160 68 153 Q40 140 40 102 Z";return`<ellipse cx="39" cy="114" rx="9" ry="11" fill="var(--skin)" ${S(3)}/><ellipse cx="161" cy="114" rx="9" ry="11" fill="var(--skin)" ${S(3)}/><ellipse cx="40" cy="115" rx="4" ry="6" ${ta}/><ellipse cx="160" cy="115" rx="4" ry="6" ${ta}/><path d="${t}" fill="var(--skin)" ${S(3.2)}/><path d="${t}" fill="url(#${e}k)"/>`}function x4(){return`<path d="M91 146 h18 v22 q-9 5 -18 0 Z" fill="var(--skin)" ${S(3)}/><path d="M91 150 h18 v9 q-9 6 -18 0 Z" ${ta}/><path d="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z" fill="var(--skin)" ${S(3)}/>`}function M4(e,t){const n=Jn(e),s=ic(n),o=t?.rich!==!1,i=t?.uid??b4(),a=y4(s),r=n.shoesC,l=r.toLowerCase()==="#ffffff"?n.dress?n.dressC:n.topC:Ar(r,.28),c=n.dress?n.dressC:n.topC,d=Aa(c)>700?"#8fdcc0":xs(c,.18),g=["--line:#5a3d5c",`--skin:${n.skin}`,`--hair:${n.hairC}`,`--hair-shade:${k4(n.hairC)}`,`--brow:${v4(n.hairC)}`,`--eye:${n.eyeC}`,"--lash:#3b2340","--blush:#ff6f91",`--freckle:${xs(n.skin,.35)}`,`--top:${c}`,`--top-trim:${d}`,`--bottom:${n.dress?n.dressC:n.bottomC}`,`--bottom-trim:${xs(n.dress?n.dressC:n.bottomC,.16)}`,`--shoe:${r}`,`--shoe-trim:${l}`,"--sock:#ffffff",`--acc:${n.accC}`,`--acc2:${Ar(n.accC,.18)}`,"--frame:#6e4a5e"].join(";"),p=kn("leg","l",Zr("l"),s)+kn("leg","r",Zr("r"),s),m=kn("arm","l",`<g class="hand">${jr("l")}</g>`,s)+kn("arm","r",`<g class="hand">${jr("r")}</g>`,s),v=`<g data-layer="body">${p}${us(x4()+m,s)}${gs(_4(i),s)}</g>`,$=n.dress?l4(s,n,i,o,a):i4(s,n,i,o,a),x=`<g class="shadow"><ellipse cx="100" cy="308" rx="52" ry="9" fill="url(#${i}s)"/><ellipse cx="87" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/><ellipse cx="113" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/></g>`,f=f4(i,n.hair,n.acc),h=f?` mask="url(#${i}hm)"`:"",b=[`<g data-layer="hair-back">${gs(`<g${h}>${s4(n.hair,i,o)}</g>`,s)}</g>`,v,d4(s,n),us(a4(s,n,i,o),s),us($,s),us(r4(s,n,i,o),s),`<g data-layer="face">${gs($4(n,i,o),s)}</g>`,`<g data-layer="hair-front">${gs(`<g${h}>${o4(n.hair,i,o)}</g>`,s)}</g>`,gs(h4(n),s)].join(""),W=n.dress||n.top;return`<svg data-chibi="1" data-hair="${n.hair}" data-top="${W}" viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" style="${g}">${w4(i,o,f)}${x}${b}</svg>`}function Da(){try{return typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("selector(&)")}catch{return!1}}function Is(e,t,n){const s=!!(t&&t.look2);e.classList.toggle("chibi",s);const o=s&&Da();e.classList.toggle("chibi-move",s&&(o||n)),e.classList.toggle("chibi-bob",s&&!o&&!n)}const Ee="#5a3d5c",ye=`stroke="${Ee}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,L4=["little","kid","adult"],qs={little:.78,kid:1,adult:1.28},ms={left:{x:15,y:113},right:{x:85,y:113}};function di(e){return e.look2?m4(ic(e.look2)):ms}function C4(e,t){return e===1?`<path d="M62 16 L76 8 L76 26 Z M62 16 L50 6 L48 24 Z" fill="#ff7aa8" stroke="${Ee}" stroke-width="3" stroke-linejoin="round"/><circle cx="62" cy="16" r="5" fill="#ffd166" stroke="${Ee}" stroke-width="3"/>`:e===2?`<circle cx="40" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${Ee}" stroke-width="3"/><circle cx="60" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${Ee}" stroke-width="3"/><path d="M49 48 h2" stroke="${Ee}" stroke-width="3"/>`:e===3?`<path d="M20 30 Q22 8 50 8 Q78 8 80 30 Z" fill="${t}" stroke="${Ee}" stroke-width="3.5" stroke-linejoin="round"/><path d="M60 28 Q84 26 92 32 Q80 36 60 34 Z" fill="${t}" stroke="${Ee}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="9" r="4" fill="#fff" stroke="${Ee}" stroke-width="3"/>`:""}function Vr(e,t,n){return n?e===1?`<path d="M20 40 Q16 86 30 92 L70 92 Q84 86 80 40 Z" fill="${t}" ${ye}/>`:e===2?`<circle cx="18" cy="34" r="12" fill="${t}" ${ye}/><circle cx="82" cy="34" r="12" fill="${t}" ${ye}/>`:e===3?`<circle cx="50" cy="8" r="13" fill="${t}" ${ye}/>`:"":e===3?`<path d="M22 42 Q20 14 50 12 Q80 14 78 42 Q66 26 50 30 Q34 26 22 42 Z" fill="${t}" ${ye}/>`:`<path d="M21 46 Q18 12 50 12 Q82 12 79 46 Q72 30 58 28 Q50 36 36 30 Q26 34 21 46 Z" fill="${t}" ${ye}/>`}function We(e){return e.look2?M4(e.look2,{rich:Da()}):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${Vr(e.hairStyle,e.hair,!0)}
  <rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${ye}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${ye}/>
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${Ee}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${Ee}"/>
  <rect class="arm" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${ye} transform="rotate(12 22 82)"/>
  <rect class="arm" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${ye} transform="rotate(-12 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${ye}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${ye}/>
  <circle cx="50" cy="44" r="30" fill="${e.skin}" ${ye}/>
  ${Vr(e.hairStyle,e.hair,!1)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${Ee}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${Ee}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${ye} fill="none"/>
  ${C4(e.acc??0,e.shirt)}
  <circle class="hand" cx="${ms.left.x}" cy="${ms.left.y}" r="6" fill="${e.skin}" ${ye}/><circle class="hand" cx="${ms.right.x}" cy="${ms.right.y}" r="6" fill="${e.skin}" ${ye}/>
</svg>`}const B4=[{id:"hair",name:"Hair"},{id:"face",name:"Face"},{id:"clothes",name:"Clothes"},{id:"shoes",name:"Shoes"},{id:"extras",name:"Extras"}],S4={short:"Short",pixie:"Pixie",coily:"Coily",afro:"Afro",bangs:"Bangs",bob:"Bob",wavybob:"Wavy bob",curlybob:"Curly bob",sidebangs:"Side bangs",long:"Long",wavy:"Wavy",braids:"Braids",boxbraids:"Box braids",locs:"Locs",sidebraid:"Side braid",crown:"Crown",pony:"Ponytail",sidepony:"Side pony",pigtails:"Pigtails",halfup:"Half-up",buns:"Buns",puffs:"Puffs",topbun:"Top bun",lowbun:"Low bun"},W4={classic:"Tee",stripes:"Stripes",hoodie:"Hoodie",sweater:"Sweater",tank:"Tank",puff:"Puff",ruffle:"Ruffle",button:"Buttons",jersey:"Jersey",cardigan:"Cardigan",bib:"Bib",raincoat:"Raincoat"},T4={pants:"Pants",jeans:"Jeans",shorts:"Shorts",skirt:"Skirt",tutu:"Tutu",leggings:"Leggings",overalls:"Overalls",joggers:"Joggers"},P4={"":"No dress",twirl:"Twirl",sundress:"Sundress",party:"Party",pinafore:"Pinafore",jumper:"Jumper",ballet:"Ballet",nightgown:"Nightgown",raindress:"Rain"},U4={classic:"Classic",sneakers:"Sneakers",lightup:"Light-up",boots:"Boots",rainboots:"Rain boots",sandals:"Sandals",maryjanes:"Mary Janes",slippers:"Slippers"},H4={round:"Round",big:"Big",sleepy:"Sleepy",sparkle:"Sparkle",soft:"Soft",bright:"Bright"},Q4={glasses:"Glasses",square:"Square",sunnies:"Sunnies",bow:"Bow",bigbow:"Big bow",headband:"Headband",flower:"Flower",cap:"Cap",beanie:"Beanie",sunhat:"Sun hat",catears:"Cat ears",earmuffs:"Earmuffs"},E4={little:"Little",kid:"Kid",adult:"Grown-up"};let An="hair";function $t(e,t,n,s){return`<button type="button" class="avOpt${s?" on":""}" data-act="${e}" data-v="${t}">${n}</button>`}function uo(e,t,n){return`<button type="button" class="avSw${n?" on":""}" style="background:${t}" data-act="${e}" data-v="${t}" aria-label="Color"></button>`}function fn(e){return`<div class="avGrid">${e}</div>`}function fs(e,t){return`<div class="avColors">${Ae.map(n=>uo(e,n,n===t)).join("")}</div>`}function z4(e,t,n,s){const o=Jn(e.look2),i=e.id==="__me",a=An==="hair"?`<h3>Style</h3>${fn(Go.map(c=>$t("av-hair",c,S4[c],o.hair===c)).join(""))}<h3>Color</h3><div class="avColors">${Vo.map(c=>uo("av-hairC",c,o.hairC===c)).join("")}</div>`:An==="face"?`<h3>Skin</h3><div class="avColors">${Fo.map(c=>uo("av-skin",c,o.skin===c)).join("")}</div><h3>Eyes</h3>${fn(ei.map(c=>$t("av-eyes",c,H4[c],o.eyes===c)).join(""))}<h3>Eye color</h3><div class="avColors">${La.map(c=>uo("av-eyeC",c,o.eyeC===c)).join("")}</div><div class="avToggles">${$t("av-freckles",o.freckles?"0":"1","Freckles",o.freckles)}${$t("av-blush",o.blush?"0":"1","Blush",o.blush)}</div>`:An==="clothes"?`<h3>Top</h3>${fn(Ko.map(c=>$t("av-top",c,W4[c],!o.dress&&o.top===c)).join(""))}${fs("av-topC",o.topC)}<h3>Bottom</h3>${fn(Yo.map(c=>$t("av-bottom",c,T4[c],!o.dress&&o.bottom===c)).join(""))}${fs("av-bottomC",o.bottomC)}<h3>Dress</h3>${fn(Xo.map(c=>$t("av-dress",c,P4[c],o.dress===c)).join(""))}${fs("av-dressC",o.dressC)}`:An==="shoes"?`<h3>Shoes</h3>${fn(Jo.map(c=>$t("av-shoes",c,U4[c],o.shoes===c)).join(""))}${fs("av-shoesC",o.shoesC)}`:`<h3>Extras</h3><p class="avHint">Pick up to two</p>${fn(In.map(c=>$t("av-acc",c,Q4[c],o.acc.indexOf(c)>=0)).join(""))}${fs("av-accC",o.accC)}`,r=L4.map(c=>`<button type="button" class="avOpt sz${c===e.size?" on":""}" data-act="size" data-v="${c}">${E4[c]}</button>`).join(""),l=i?'<div class="meNote">This is you!</div>':`<button type="button" class="del${n?" sure":""}" data-act="delc">${s}<span>${n?"Tap again":""}</span></button>`;return`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${t}<div class="dress avLook"><div class="avStageWrap"><div class="avStage chibi-move">${We(e)}</div>${l}<div class="avSizes">${r}</div></div><div class="avSide"><div class="avTabs">${B4.map(c=>`<button type="button" class="avTab${c.id===An?" on":""}" data-act="av-tab" data-v="${c.id}">${c.name}</button>`).join("")}</div><div class="avPane">${a}</div><div class="avBar"><button type="button" class="avSurprise" data-act="av-surprise">🎲 Surprise me</button><button type="button" class="avDone" data-act="close">Done</button></div></div></div>`}function R4(e,t,n){if(t==="av-tab")return(n==="hair"||n==="face"||n==="clothes"||n==="shoes"||n==="extras")&&(An=n),null;const s=Jn(e);if(t==="av-hair"&&Go.indexOf(n)>=0)return{...s,hair:n};if(t==="av-hairC")return{...s,hairC:n};if(t==="av-skin")return{...s,skin:n};if(t==="av-eyes"&&ei.indexOf(n)>=0)return{...s,eyes:n};if(t==="av-eyeC")return{...s,eyeC:n};if(t==="av-freckles")return{...s,freckles:n==="1"};if(t==="av-blush")return{...s,blush:n==="1"};if(t==="av-top"&&Ko.indexOf(n)>=0)return{...s,top:n,dress:""};if(t==="av-topC")return{...s,topC:n};if(t==="av-bottom"&&Yo.indexOf(n)>=0)return{...s,bottom:n,dress:""};if(t==="av-bottomC")return{...s,bottomC:n};if(t==="av-dress"&&Xo.indexOf(n)>=0)return{...s,dress:n};if(t==="av-dressC")return{...s,dressC:n};if(t==="av-shoes"&&Jo.indexOf(n)>=0)return{...s,shoes:n};if(t==="av-shoesC")return{...s,shoesC:n};if(t==="av-accC")return{...s,accC:n};if(t==="av-acc"&&In.indexOf(n)>=0){const o=n,i=s.acc.slice(),a=i.indexOf(o);if(a>=0)i.splice(a,1);else{const r=Lo(o),l=i.filter(c=>Lo(c)!==r);return l.push(o),{...s,acc:l.slice(0,2)}}return{...s,acc:i}}return null}function A4(){try{return typeof navigator<"u"&&navigator.webdriver&&!window.__forceAvatarIntro?!1:localStorage.getItem(wt("avatar-intro"))!=="1"}catch{return!1}}function D4(){try{localStorage.setItem(wt("avatar-intro"),"1")}catch{}}const mo="#5a3d5c";function Hi(e,t,n,s,o){return`<path class="${e}" d="${t}" fill="none" stroke="${mo}" stroke-width="${s}" stroke-linecap="round"/><path class="${e} cloth" d="${t}" fill="none" stroke="${n}" stroke-width="${o}" stroke-linecap="round"/>`}function O4(e){const t=Jn(e),n=t.skin,s=t.dress!=="",o=s||t.bottom==="skirt"||t.bottom==="tutu",i=o?n:t.bottomC,a=t.shoesC,r=s||t.bottom==="skirt"||t.bottom==="tutu";let l="";if(r){const p=s?t.dressC:t.bottomC;l+=`<path class="dress" d="M75 46 L89 46 L91 53 L73 53 Z" fill="${p}" stroke="${mo}" stroke-width="1.1" stroke-linejoin="round"/>`}l+=Hi("thigh","M76 44 Q83 48 88 54",i,6.2,4.8),l+=`<circle class="knee" cx="88" cy="56" r="2.3" fill="${i}" stroke="${mo}" stroke-width="1.1"/>`;const c=t.shoes==="boots"||t.shoes==="rainboots";l+=Hi("shin",c?"M88 58 Q90 64 91 68":"M88 58 Q90 65 91 70",o?n:i,5.8,4.4),!c&&(t.shoes==="sneakers"||t.shoes==="maryjanes"||t.shoes==="lightup")&&(l+=Hi("shin","M90 66 Q90.6 68 91 70","#ffffff",5.4,4));const d=t.shoes==="sandals"?n:a,g=c?66:69;return l+=`<path class="shoe" d="M90 ${g} Q90 ${g-2} 94 ${g-2} Q99 ${g-2} 100 ${g+1} Q100 ${g+5} 95 ${g+5} Q90 ${g+5} 90 ${g+2} Z" fill="${d}" stroke="${mo}" stroke-width="1.1" stroke-linejoin="round"/>`,t.shoes==="sandals"&&(l+=`<path d="M90 ${g+5} L100 ${g+5}" stroke="${a}" stroke-width="1.3" stroke-linecap="round"/>`,l+=`<path d="M93 ${g} L97 ${g+3}" stroke="${a}" stroke-width="1.1" stroke-linecap="round"/>`),`<svg class="rideleg" viewBox="0 0 160 130">${l}</svg>`}let _t=null,ac=!0;const I4=e=>{ac=e};function q(e,t,n="sine",s=0,o=.15){if(ac)try{_t??=new(window.AudioContext||window.webkitAudioContext),_t.state==="suspended"&&_t.resume();const i=_t.createOscillator(),a=_t.createGain(),r=_t.currentTime,l=Math.max(40,e*(.94+Math.random()*.12));i.type=n,i.frequency.setValueAtTime(l,r),s&&i.frequency.exponentialRampToValueAtTime(Math.max(40,l*s),r+t);const c=Math.min(.02,Math.max(.008,t*.22));if(a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(Math.max(2e-4,o),r+c),a.gain.exponentialRampToValueAtTime(.001,r+Math.max(t,c+.02)),n==="square"||n==="sawtooth"){const d=_t.createBiquadFilter();d.type="lowpass",d.frequency.setValueAtTime(1400,r),d.Q.setValueAtTime(.7,r),i.connect(d).connect(a).connect(_t.destination)}else i.connect(a).connect(_t.destination);i.start(r),i.stop(r+t+.02)}catch{}}const M={pick:()=>q(520,.12,"sine",1.6),drop:()=>{q(380,.1,"triangle",.7),setTimeout(()=>q(620,.08,"sine"),60)},pop:()=>q(800,.15,"square",.3,.08),click:()=>q(660,.07,"triangle"),swish:()=>q(300,.25,"sine",2.5,.1),meow:()=>{q(700,.12,"triangle",1.3,.1),setTimeout(()=>q(900,.22,"triangle",.6,.1),110)},purr:()=>[0,90,180,270,360].forEach(e=>setTimeout(()=>q(70,.09,"sawtooth",1,.05),e)),woof:()=>{q(260,.09,"square",.6,.09),setTimeout(()=>q(220,.12,"square",.5,.09),130)},spin:()=>q(400,.35,"sine",2.2,.08),boing:()=>q(200,.3,"sine",3,.1),splash:()=>[0,50,110].forEach((e,t)=>setTimeout(()=>q(900-t*200,.12,"triangle",.4,.06),e)),moo:()=>{q(160,.5,"sawtooth",.8,.07),setTimeout(()=>q(140,.45,"sawtooth",.85,.06),380)},baa:()=>[0,90,180].forEach(e=>setTimeout(()=>q(420,.1,"sawtooth",.95,.05),e)),bleat:()=>[0,70,140,210].forEach(e=>setTimeout(()=>q(520,.07,"square",1.05,.04),e)),oink:()=>{q(300,.12,"square",.6,.07),setTimeout(()=>q(330,.12,"square",.55,.07),160)},peep:()=>[0,120,240].forEach((e,t)=>setTimeout(()=>q(1800+t*150,.07,"sine",1.2,.08),e)),squeak:()=>q(1400,.1,"sine",1.5,.08),neigh:()=>{q(700,.5,"sawtooth",.6,.05),[0,60,120,180,240].forEach(e=>setTimeout(()=>q(620-e,.06,"triangle",1,.04),300+e))},honk:()=>{q(330,.18,"square",1,.07),setTimeout(()=>q(330,.25,"square",1,.07),230)},munch:()=>[0,110,220,330].forEach(e=>setTimeout(()=>q(180+Math.random()*60,.05,"square",.6,.05),e)),cluck:()=>[0,100,180].forEach((e,t)=>setTimeout(()=>q(600+t*80,.06,"square",.8,.05),e)),plant:()=>{q(260,.1,"triangle",.6),setTimeout(()=>q(520,.1,"sine"),90)},water:()=>[0,60,120,180,240].forEach((e,t)=>setTimeout(()=>q(1200-t*120,.08,"sine",.7,.05),e)),pickup:()=>[660,880,990].forEach((e,t)=>setTimeout(()=>q(e,.1,"triangle"),t*60)),sparkle:()=>[880,1100,1320].forEach((e,t)=>setTimeout(()=>q(e,.12),t*70))},q4=/rug|lamp|light|plant|curtain|clock|window|lantern/;function N4(e){if(e.cat==="plants")return!0;const t=`${e.name} ${e.kind??""}`.toLowerCase();return q4.test(t)}const rc=new Set(["pack:ring-light","pack:desk-lamp"]);function j4(e,t){if(t==="nursery"&&e.kind&&rc.has(e.kind))return!1;if(t==="all"||!t)return!0;const n=e.rooms;return!n||n.length===0||n.includes(t)?!0:n.includes("any")?e.cat==="decor"||e.cat==="furniture"?N4(e):!0:!1}function Z4(e,t,n,s,o){return e.secret&&!(o&&o.has(e.secret))||n==="nursery"&&e.kind&&rc.has(e.kind)?!1:t.startsWith("pack:")?e.pack===t.slice(5):e.cat!==t?!1:j4(e,s?"all":n)}function F4(e){const t=e.scale;let n=0;e.overflowR>1&&e.overflowL>1?n=-e.overflowL:e.overflowR>1?n=e.overflowR:e.overflowL>1&&(n=-e.overflowL);const s=e.cam+n/t,o=Math.max(0,Math.min(e.maxCam,s)),i=s-o,a=e.nudgeX&&Math.abs(i)>.5?e.kidX-i:e.kidX;return{cam:o,kidX:a}}function V4(e){const t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[1][0]).toUpperCase():"?"}function G4(e,t=3){const n=[...e].sort((r,l)=>r.x-l.x||r.id.localeCompare(l.id)),s=[],o=[],i=(r,l,c)=>s.some(d=>d.lane===c&&Math.abs(d.x-r)<(d.w+l)/2+8),a=[];for(const r of n){let l=-1;for(let c=0;c<t;c++)if(!i(r.x,r.w,c)){l=c;break}l<0?a.push(r):(s.push({x:r.x,w:r.w,lane:l}),o.push({id:r.id,lane:l,initials:!1}))}for(const r of a){const l=Math.min(r.w,44);let c=0;for(let d=0;d<t;d++)if(!i(r.x,l,d)){c=d;break}s.push({x:r.x,w:l,lane:c}),o.push({id:r.id,lane:c,initials:!0})}return o}let K4=0;function lc(e=document){const t=[...e.querySelectorAll(".nametag")].filter(o=>{const i=o.getBoundingClientRect();return i.width>2&&i.height>2});if(!t.length)return;const n=t.map(o=>{o.dataset.tagId||(o.dataset.tagId="tg"+(++K4).toString(36)),o.dataset.full||(o.dataset.full=(o.textContent||"").trim()),o.classList.contains("is-initials")||(o.dataset.fullW=String(o.getBoundingClientRect().width));const i=o.getBoundingClientRect(),a=Number(o.dataset.fullW)||i.width;return{id:o.dataset.tagId,x:i.left+i.width/2,w:a}}),s=new Map(G4(n).map(o=>[o.id,o]));for(const o of t){const i=s.get(o.dataset.tagId||"");if(!i)continue;const a=o.dataset.full||"",r=i.initials?V4(a):a;o.textContent!==r&&(o.textContent=r),o.classList.toggle("is-initials",i.initials),o.style.setProperty("--tag-lane",String(i.lane))}}function gi(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function Y4(e){!e||gi()||(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),window.setTimeout(()=>e.classList.remove("wiggle"),480))}function X4(){document.addEventListener("pointerup",e=>{if(gi())return;const t=e.target?.closest("button");t&&(t.classList.remove("spring"),t.offsetWidth,t.classList.add("spring"))},!0)}const cc="#5a3d5c",Pe=`stroke="${cc}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,J4={living:"#ff8fab",bedroom:"#c9a0dc",kitchen:"#8fd6a6",salon:"#f0a0d8",nursery:"#9ad7f5",backyard:"#80ed99"};function e6(e){const t=J4[e]??"#ffb3c6";return`<div class="sceneWin builtin-window" aria-hidden="true"><svg viewBox="0 0 160 180">
    <path d="M18 20 H142 V150 H18 Z" fill="#fff6ea" ${Pe}/>
    <path d="M28 30 H132 V118 H28 Z" fill="#b9e3ff" ${Pe}/>
    <path d="M80 30 V118 M28 74 H132" ${Pe} stroke-width="3"/>
    <circle cx="48" cy="52" r="10" fill="#fff" opacity=".85"/>
    <ellipse cx="108" cy="48" rx="16" ry="8" fill="#fff" opacity=".8"/>
    <path d="M40 118 Q58 96 70 118 Q90 100 112 118" fill="#7dce8a" stroke="${cc}" stroke-width="3"/>
    <rect x="96" y="86" width="8" height="32" rx="3" fill="#6b4a32" ${Pe} stroke-width="2"/>
    <circle cx="100" cy="80" r="12" fill="#5cc985" ${Pe} stroke-width="2"/>
    <path d="M8 16 Q6 80 16 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <path d="M152 16 Q154 80 144 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <rect x="46" y="146" width="68" height="12" rx="4" fill="#ffe7c2" ${Pe}/>
  </svg></div>`}function t6(){return`<div class="sceneRug" aria-hidden="true"><svg viewBox="0 0 200 80">
    <ellipse cx="100" cy="48" rx="92" ry="24" fill="#ffc8dd" ${Pe}/>
    <ellipse cx="100" cy="48" rx="64" ry="15" fill="#bde0fe" ${Pe} stroke-width="3"/>
    <ellipse cx="100" cy="48" rx="28" ry="7" fill="#fff6ea"/>
  </svg></div>
  <div class="sceneLamp" aria-hidden="true"><svg viewBox="0 0 80 160">
    <path d="M18 52 L30 8 H50 L62 52 Z" fill="#ffd166" ${Pe}/>
    <rect x="36" y="52" width="8" height="78" rx="4" fill="#c9a0dc" ${Pe}/>
    <ellipse cx="40" cy="136" rx="26" ry="8" fill="#b388d6" ${Pe}/>
    <circle cx="34" cy="28" r="4" fill="#fff" opacity=".8"/>
  </svg></div>
  <div class="scenePlant" aria-hidden="true"><svg viewBox="0 0 90 140">
    <path d="M45 128 C45 90 18 78 20 48 C40 58 44 80 45 128" fill="#5cc985" ${Pe}/>
    <path d="M45 128 C45 92 74 70 78 40 C58 54 50 82 45 128" fill="#80ed99" ${Pe}/>
    <path d="M45 128 C40 96 28 88 22 70" fill="none" stroke="#3d9a62" stroke-width="3"/>
    <path d="M30 132 H62 L56 118 H36 Z" fill="#e07a5f" ${Pe}/>
    <ellipse cx="46" cy="126" rx="16" ry="5" fill="#c4634a"/>
  </svg></div>`}function n6(e){return[{id:e("rug"),kind:"rug",x:1152,y:540,flip:!1,z:0,scale:1},{id:e("lamp"),kind:"lamp",x:804,y:470,flip:!1,z:0,scale:1},{id:e("plant"),kind:"plant",x:1584,y:480,flip:!1,z:0,scale:1}]}let Gr="";function dc(e,t,n){const s=n.length===0,o=n.some(a=>/window|curtain/i.test(a.kind)),i=t+(s?"|e":"")+(o?"|w":"");i===Gr&&e.childElementCount||(Gr=i,e.innerHTML=(o?"":e6(t))+(s?t6():""),e.dataset.room=t)}const te="#5a3d5c",w=(e=4)=>`stroke="${te}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Ns=600,rt=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],ht=(e,t,n=3)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${te}"/><circle cx="${e+1}" cy="${t-1}" r="${n/3}" fill="#fff"/>`,bn=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="5" ry="3" fill="#ff9bb5" opacity=".75"/>`,s6=(e,t,n,s)=>rt.map((o,i)=>`<path d="M${e-n+i*s} ${t} A${n-i*s} ${n-i*s} 0 0 1 ${e+n-i*s} ${t}" fill="none" stroke="${o}" stroke-width="${s}"/>`).join(""),o6=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${w()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${w()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${w()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${w()}/></g>`,St=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-46" y="-50" width="92" height="50" rx="14" fill="#f5d27a" ${w()}/>
  <path d="M-30 -42 V-8 M0 -44 V-6 M30 -42 V-8" stroke="#d9a93f" stroke-width="4" stroke-linecap="round"/><path d="M-46 -26 H46" stroke="#c98a2e" stroke-width="5"/></g>`,i6=(e,t,n)=>{const s=Array.from({length:Math.floor((t-e)/70)+1},(o,i)=>`<rect x="${e+i*70-7}" y="${n-58}" width="14" height="64" rx="5" fill="#fff6e6" ${w(3)}/>`).join("");return`<rect x="${e}" y="${n-46}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${w(3)}/><rect x="${e}" y="${n-22}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${w(3)}/>${s}`};function a6(){const e=Ds;return`<svg class="parkScene ranchScene" viewBox="0 0 ${e} ${Ns}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="rcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7e8ff"/><stop offset="1" stop-color="#fff4fb"/></linearGradient></defs>
  <rect width="${e}" height="440" fill="url(#rcSky)"/>
  <g opacity=".55">${s6(1900,430,620,26)}</g>
  ${[160,820,1500,2300,3e3].map((t,n)=>`<g transform="translate(${t} ${70+n%2*34})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <g transform="translate(${e-200} 92)"><circle r="48" fill="#ffe066" ${w()}/>${ht(-15,-6,4)}${ht(13,-6,4)}<path d="M-14 12 Q0 24 14 12" fill="none" ${w(3)}/>${bn(-26,8)}${bn(26,8)}</g>
  <path d="M-50 370 Q600 230 1300 350 T2600 330 T${e+100} 360 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#a6e3a0"/><path d="M0 410 H${e}" ${w()}/>
  <path d="M0 566 Q900 530 1800 570 T${e} 552 V600 H0 Z" fill="#f2dcb8" opacity=".9"/>
  ${o6(3560,400,.8,"#4fbf7a")}
  <!-- entrance gate with a rainbow arch -->
  <g><rect x="40" y="290" width="24" height="210" rx="6" fill="#c99366" ${w()}/><rect x="196" y="290" width="24" height="210" rx="6" fill="#c99366" ${w()}/>
    <path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${te}" stroke-width="44" stroke-linecap="round"/>
    ${rt.map((t,n)=>`<path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${t}" stroke-width="${36-n*6}" stroke-linecap="round"/>`).join("")}
    <rect x="22" y="250" width="216" height="40" rx="14" fill="#fff6e6" ${w(3)}/><text x="130" y="277" text-anchor="middle" font-size="19" font-weight="900" fill="${te}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  <!-- red barn with rainbow trim and banner -->
  <g transform="translate(270 0)">
    <path d="M0 470 V250 L60 180 H270 L330 250 V470 Z" fill="#ef5b5b" ${w(5)}/>
    <path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${te}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    ${rt.map((t,n)=>`<path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${t}" stroke-width="3" transform="translate(0 ${-7+n*2.8})" stroke-linejoin="round"/>`).join("")}
    <rect x="115" y="215" width="100" height="56" rx="10" fill="#fff6e6" ${w(4)}/><path d="M115 215 L215 271 M215 215 L115 271" stroke="#ef5b5b" stroke-width="6"/>
    <rect x="95" y="330" width="140" height="140" rx="8" fill="#fff6e6" ${w(4)}/><rect x="108" y="342" width="56" height="128" fill="#d94848" ${w(3)}/><rect x="166" y="342" width="56" height="128" fill="#d94848" ${w(3)}/>
    <path d="M108 342 L164 470 M164 342 L108 470 M166 342 L222 470 M222 342 L166 470" stroke="#fff6e6" stroke-width="6"/>
    <g transform="translate(165 300)">${rt.map((t,n)=>`<rect x="${-120+n*40}" y="-16" width="40" height="30" fill="${t}"/>`).join("")}<rect x="-120" y="-16" width="240" height="30" fill="none" ${w(3)}/>
      <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${te}" stroke-width="4" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  </g>
  ${St(640,560,.8)}${St(1950,470,.7)}${St(1880,470,.55)}${St(3115,470,.7)}${St(3115,425,.55)}
  <!-- the petting zoo moved into the barn: a sign by the barn door, sunflowers where the pen was -->
  ${Array.from({length:6},(t,n)=>{const s=1030+n*66,o=70+n%3*18;return`<g transform="translate(${s} 470)"><path d="M0 0 V-${o}" stroke="#40c057" stroke-width="6" stroke-linecap="round"/><ellipse cx="${n%2?9:-9}" cy="-${o/2}" rx="11" ry="5" fill="#69db7c" ${w(2.5)}/>${[0,45,90,135,180,225,270,315].map(i=>`<ellipse cx="${Math.cos(i*Math.PI/180)*14}" cy="${-o+Math.sin(i*Math.PI/180)*14}" rx="8" ry="5" transform="rotate(${i} ${Math.cos(i*Math.PI/180)*14} ${-o+Math.sin(i*Math.PI/180)*14})" fill="#ffd43b" ${w(2)}/>`).join("")}<circle cy="-${o}" r="10" fill="#a0522d" ${w(2.5)}/></g>`}).join("")}
  <!-- pond -->
  <ellipse cx="${Me.x}" cy="${Me.y}" rx="${Me.rx}" ry="${Me.ry}" fill="#8ecae6" ${w()}/><ellipse cx="${Me.x-15}" cy="${Me.y-6}" rx="70" ry="16" fill="#bde6f7"/>
  <!-- paddock fence + HORSES sign are their own depth layer (paddockFenceSVG) -->
  <!-- garden -->
  <rect x="3140" y="520" width="420" height="70" rx="20" fill="#b07d54" ${w()}/>
  <rect x="3260" y="430" width="160" height="40" rx="12" fill="#fff6e6" ${w(3)}/><text x="3340" y="458" text-anchor="middle" font-size="21" font-weight="900" fill="${te}" font-family="Nunito, system-ui, sans-serif">GARDEN</text>
  <path d="M3340 470 V500" ${w(5)}/>
  </svg>`}function r6(){return`<svg class="fenceLayer" viewBox="0 0 ${Ds} ${Ns}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  ${i6(2400,3080,470)}
  <rect x="2640" y="380" width="180" height="40" rx="12" fill="#fff6e6" ${w(3)}/><text x="2730" y="408" text-anchor="middle" font-size="21" font-weight="900" fill="${te}" font-family="Nunito, system-ui, sans-serif">HORSES</text>
  </svg>`}const gc=[{name:"Goat",say:"Meh-eh-eh!",snd:"bleat"},{name:"Sheep",say:"Baa!",snd:"baa"},{name:"Piglet",say:"Oink oink!",snd:"oink"},{name:"Chicks",say:"Peep peep!",snd:"peep"},{name:"Bunny",say:"*wiggle wiggle*",snd:"squeak"},{name:"Cow",say:"Moooo!",snd:"moo"}],no=(e,t,n,s=94)=>e.map((o,i)=>`<rect class="leg ${i%2?"b":"a"}" x="${o}" y="${t}" width="9" height="${s-t}" rx="4" fill="${n}" ${w(3)}/>`).join("");function ra(e){switch(e){case 0:return`<svg viewBox="0 0 120 100">${no([32,44,70,82],60,"#efe6dc")}<path class="tail" d="M24 50 l-8 -10" ${w(5)}/>
      <ellipse cx="58" cy="56" rx="34" ry="17" fill="#f4ede5" ${w()}/><g class="head"><path d="M86 30 l-6 -16 l10 10 Z M96 30 l2 -17 l5 13 Z" fill="#c9b8a8" ${w(3)}/>
      <ellipse cx="94" cy="40" rx="14" ry="16" fill="#f4ede5" ${w()}/><ellipse class="ear" cx="80" cy="36" rx="9" ry="4" fill="#e8d6c4" ${w(3)}/>${ht(98,36)}<path d="M98 56 q2 8 6 0" fill="#e8d6c4" ${w(3)}/>${bn(102,46)}<circle cx="106" cy="44" r="2" fill="${te}"/></g></svg>`;case 1:return`<svg viewBox="0 0 120 100">${no([36,48,70,80],62,"#5a4a5c")}
      ${[[40,50],[56,44],[72,48],[86,56],[70,64],[48,64],[34,60]].map(([t,n])=>`<circle cx="${t}" cy="${n}" r="15" fill="#fff" ${w(3)}/>`).join("")}<ellipse cx="60" cy="55" rx="30" ry="14" fill="#fff"/>
      <g class="head"><ellipse cx="96" cy="46" rx="13" ry="15" fill="#6b5a6e" ${w()}/><circle cx="92" cy="32" r="8" fill="#fff" ${w(3)}/><ellipse class="ear" cx="82" cy="44" rx="8" ry="4" fill="#6b5a6e" ${w(3)}/>
      <circle cx="99" cy="42" r="3.2" fill="#fff"/><circle cx="99.5" cy="42" r="1.8" fill="${te}"/>${bn(102,52)}</g></svg>`;case 2:return`<svg viewBox="0 0 120 100">${no([38,50,66,78],66,"#ffadc6")}<path class="tail" d="M28 54 q-10 -4 -6 -12 q6 0 2 8" fill="none" ${w(3)}/>
      <ellipse cx="58" cy="60" rx="32" ry="20" fill="#ffc2d4" ${w()}/><g class="head"><circle cx="90" cy="52" r="16" fill="#ffc2d4" ${w()}/><path d="M80 38 l2 -12 l9 8 Z" fill="#ffadc6" ${w(3)}/>
      <ellipse cx="104" cy="56" rx="7" ry="8" fill="#ff9bb8" ${w(3)}/><circle cx="102" cy="54" r="1.6" fill="${te}"/><circle cx="106" cy="57" r="1.6" fill="${te}"/>${ht(92,46)}${bn(90,60)}</g></svg>`;case 3:return`<svg viewBox="0 0 120 100">${[[30,72,1],[62,66,1.15],[92,74,.95]].map(([t,n,s])=>`<g transform="translate(${t} ${n}) scale(${s})"><path d="M-4 16 v8 M4 16 v8" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="4" r="14" fill="#ffe066" ${w(3)}/><path d="M-8 2 q-6 4 0 8" fill="#ffd43b" ${w(2)}/><g class="head"><circle cx="5" cy="-8" r="9" fill="#ffe066" ${w(3)}/><path d="M13 -9 l7 2 l-7 3 Z" fill="#ff9f43" ${w(2)}/>${ht(7,-10,2.2)}</g></g>`).join("")}</svg>`;case 4:return`<svg viewBox="0 0 120 100"><circle class="tail" cx="30" cy="68" r="8" fill="#fff" ${w(3)}/><ellipse cx="56" cy="72" rx="28" ry="20" fill="#f6eef9" ${w()}/><ellipse cx="74" cy="90" rx="12" ry="5" fill="#f6eef9" ${w(3)}/>
      <g class="head"><ellipse class="ear" cx="78" cy="26" rx="7" ry="20" fill="#f6eef9" ${w(3)} transform="rotate(-12 78 26)"/><ellipse cx="78" cy="26" rx="3" ry="13" fill="#ffc2d4" transform="rotate(-12 78 26)"/>
      <ellipse cx="90" cy="28" rx="7" ry="20" fill="#f6eef9" ${w(3)} transform="rotate(10 90 28)"/><circle cx="86" cy="56" r="17" fill="#f6eef9" ${w()}/>${ht(92,52)}<circle cx="102" cy="58" r="2.5" fill="#ff8fab"/>${bn(90,63)}</g></svg>`;default:return`<svg viewBox="0 0 120 100">${no([30,42,72,84],62,"#fff")}<path class="tail" d="M20 50 q-6 14 0 26" fill="none" ${w(3)}/>
      <rect x="18" y="38" width="80" height="34" rx="16" fill="#fff" ${w()}/><path d="M30 40 q10 8 4 20 q-10 -2 -10 -14 Z M60 42 q14 2 10 18 q-12 4 -14 -8 Z" fill="${te}"/><ellipse cx="60" cy="74" rx="8" ry="5" fill="#ffadc6" ${w(2)}/>
      <g class="head"><path d="M90 24 l-8 -8 M108 24 l8 -8" stroke="#f5d27a" stroke-width="5" stroke-linecap="round"/><rect x="86" y="22" width="26" height="30" rx="12" fill="#fff" ${w()}/>
      <ellipse cx="100" cy="52" rx="14" ry="10" fill="#ffc2d4" ${w(3)}/><circle cx="95" cy="52" r="1.8" fill="${te}"/><circle cx="105" cy="52" r="1.8" fill="${te}"/>${ht(94,34)}${ht(106,34)}
      <ellipse class="ear" cx="82" cy="30" rx="7" ry="4" fill="#fff" ${w(3)}/></g></svg>`}}const Me={x:2265,y:520,rx:110,ry:34},l6=476,Qo=[{name:"Chestnut",body:"#c97b45",mane:"#7a3f22",sock:"#fff6e6"},{name:"Snowy",body:"#fdf8f3",mane:"#d9cdc4",sock:"#e9ddd2"},{name:"Midnight",body:"#4a3f52",mane:"#2a2230",sock:"#6b5e74"},{name:"Sunny",body:"#f2c96b",mane:"#fff6e0",sock:"#fff6e0"},{name:"Rainbow Pony",body:"#fff0fa",mane:"rainbow",sock:"#ffd6ec"}];function Oa(e,t=!1){const n=Qo[e]??Qo[0],s=n.mane==="rainbow",o=s?rt.map((r,l)=>{const c=124-l*1.6,d=14+l*2.4;return`<path d="M${c.toFixed(1)} ${d.toFixed(1)} q-6.5 2 -4.5 ${6+l*.35}" fill="none" stroke="${r}" stroke-width="5.5" stroke-linecap="round"/>`}).join(""):`<path d="M106 20 q-14 6 -18 30 q8 -6 10 -2 q4 -12 14 -18 Z" fill="${n.mane}" ${w(3)}/>`,i=s?`<g class="tail">${rt.map((r,l)=>`<path d="M30 58 q-18 ${8+l*3} -14 ${36+l}" fill="none" stroke="${r}" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`:`<path class="tail" d="M30 56 q-20 10 -14 44 q10 -10 8 -20 q6 -10 10 -18 Z" fill="${n.mane}" ${w(3)}/>`,a=(r,l)=>`<g class="leg ${l}"><rect x="${r}" y="78" width="12" height="44" rx="5" fill="${n.body}" ${w(3)}/><rect x="${r}" y="110" width="12" height="12" rx="4" fill="${n.sock}" ${w(3)}/></g>`;return`<svg viewBox="0 0 160 130" class="horsesvg">${i}${a(40,"a")}${a(56,"b")}${a(96,"b")}${a(112,"a")}
    <ellipse cx="80" cy="68" rx="50" ry="24" fill="${n.body}" ${w()}/>
    ${t||s?`<path class="saddle" data-top="43" d="M64 46 q16 -6 32 0 l-2 22 q-14 4 -28 0 Z" fill="${s?"#b197fc":"#e8590c"}" ${w(3)}/>`:""}
    <g class="head"><path d="M108 66 L114 30 Q118 16 132 18 L148 36 Q152 46 142 48 L130 46 L128 70 Z" fill="${n.body}" ${w()}/>
    <path d="M114 22 l2 -14 l8 12 Z" fill="${n.body}" ${w(3)}/>${o}
    ${ht(130,30,3.4)}<circle cx="146" cy="42" r="2" fill="${te}"/>${bn(136,40)}
    ${s?`<path d="M120 14 l4 -14 l4 14 Z" fill="#ffd43b" ${w(2)}/>`:""}</g>
    ${s?'<g fill="#fff" opacity=".9"><path d="M60 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M92 74 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/></g>':""}</svg>`}const c6=`<svg viewBox="0 0 180 170"><path d="M10 70 L90 14 L170 70" fill="#ffa94d" ${w(5)}/>
  <rect x="24" y="66" width="132" height="84" rx="8" fill="#fff6e6" ${w()}/>${rt.map((e,t)=>`<rect x="${24+t*22}" y="66" width="22" height="10" fill="${e}"/>`).join("")}
  <rect x="24" y="66" width="132" height="10" fill="none" ${w(3)}/><circle cx="90" cy="108" r="22" fill="#5a3d5c"/>
  <path d="M60 150 l-12 16 M120 150 l12 16" ${w(5)}/>
  <g class="hen"><ellipse cx="90" cy="118" rx="20" ry="14" fill="#fff" ${w(3)}/><circle cx="104" cy="104" r="10" fill="#fff" ${w(3)}/><path d="M100 94 q3 -8 8 0" fill="#ff6b6b" ${w(2)}/>
  <path d="M113 104 l7 2 -7 3 Z" fill="#ffa94d" ${w(2)}/>${ht(106,102,2)}</g>
  <text x="90" y="54" text-anchor="middle" font-size="16" font-weight="900" fill="${te}" font-family="Nunito, system-ui, sans-serif">EGGS</text></svg>`,d6=`<svg viewBox="0 0 170 130"><rect x="80" y="30" width="54" height="50" rx="8" fill="#bde6f7" ${w()}/><rect x="74" y="24" width="66" height="10" rx="4" fill="#ff6b6b" ${w(3)}/>
  <rect x="20" y="62" width="130" height="34" rx="12" fill="#ff6b6b" ${w()}/><rect x="28" y="40" width="10" height="24" rx="3" fill="#868e96" ${w(3)}/>
  <circle cx="122" cy="98" r="28" fill="${te}"/><circle cx="122" cy="98" r="13" fill="#ffd43b" ${w(3)}/><circle cx="44" cy="106" r="18" fill="${te}"/><circle cx="44" cy="106" r="8" fill="#ffd43b" ${w(3)}/>
  <circle cx="26" cy="76" r="5" fill="#fff3b0" ${w(2)}/></svg>`,g6=`<svg viewBox="0 0 240 300"><rect x="104" y="160" width="32" height="140" rx="10" fill="#c99366" ${w()}/>
  <circle cx="120" cy="110" r="90" fill="#5cc985" ${w()}/><circle cx="62" cy="140" r="50" fill="#5cc985" ${w()}/><circle cx="180" cy="140" r="52" fill="#5cc985" ${w()}/>
  ${[[80,90],[150,70],[175,140],[100,150],[130,115],[60,140]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="11" fill="#ff6b6b" ${w(3)}/><path d="M${e} ${t-10} q2 -6 6 -7" fill="none" ${w(2)}/>`).join("")}</svg>`,Kr=[[80,90],[150,70],[175,140],[100,150]],fc=`<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="14" fill="#ff6b6b" ${w(3)}/><path d="M20 10 q2 -6 6 -7" fill="none" ${w(2.5)}/><ellipse cx="27" cy="8" rx="5" ry="3" fill="#5cc985" ${w(2)}/><circle cx="14" cy="18" r="3" fill="#fff" opacity=".6"/></svg>`,fi=`<svg viewBox="0 0 40 40"><path d="M12 14 L32 10 L16 36 Z" fill="#ff922b" ${w(3)}/><path d="M18 18 l5 -1 M17 24 l4 -1" ${w(2)}/><path d="M30 10 q4 -8 8 -6 M30 10 q-2 -8 2 -10 M30 10 q6 -2 8 2" fill="none" stroke="#40c057" stroke-width="4" stroke-linecap="round"/></svg>`,f6=`<svg viewBox="0 0 40 40"><path d="M6 34 Q20 4 34 34 Z" fill="#f5d27a" ${w(3)}/><path d="M14 30 L18 14 M20 32 V10 M26 30 L22 14" stroke="#d9a93f" stroke-width="2.5" stroke-linecap="round"/></svg>`,Us=`<svg viewBox="0 0 40 40"><path d="M20 4 C30 4 34 20 34 26 C34 34 28 38 20 38 C12 38 6 34 6 26 C6 20 10 4 20 4 Z" fill="#fff6e6" ${w(3)}/><circle cx="15" cy="16" r="3" fill="#fff"/></svg>`,Ia=(e="#ff8fab")=>`<svg viewBox="0 0 40 40"><path d="M20 38 V20" stroke="#40c057" stroke-width="4" stroke-linecap="round"/>${[0,72,144,216,288].map(t=>`<circle cx="${20+Math.cos(t*Math.PI/180)*8}" cy="${14+Math.sin(t*Math.PI/180)*8}" r="7" fill="${e}" ${w(2.5)}/>`).join("")}<circle cx="20" cy="14" r="5" fill="#ffd43b" ${w(2)}/></svg>`,hc={carrot:fi,apple:fc,hay:f6},h6=e=>`<svg viewBox="0 0 80 90"><g transform="translate(14 0) scale(1.3)">${hc[e].replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g>
  <path d="M10 40 H70 L62 86 H18 Z" fill="${e==="carrot"?"#74c0fc":e==="apple"?"#ffa8c5":"#b2f2bb"}" ${w(4)}/><path d="M12 52 H68" stroke="#fff" stroke-width="4" opacity=".6"/></svg>`,p6=`<svg viewBox="0 0 60 50"><path d="M12 22 Q30 -6 48 22" fill="none" stroke="${te}" stroke-width="7" stroke-linecap="round"/><path d="M12 22 Q30 -6 48 22" fill="none" stroke="#e0a96d" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 22 H56 L50 46 H10 Z" fill="#e0a96d" ${w(3.5)}/><path d="M12 30 H48 M14 38 H46" stroke="#b5793d" stroke-width="3"/></svg>`,Yr=["#ff8fab","#c9a0dc","#ffd43b","#74c0fc","#ff922b"];function pc(e,t,n){const s=`<ellipse cx="35" cy="76" rx="30" ry="11" fill="${e?.wet?"#7a4b2e":"#9c6b46"}" ${w(3)}/>`;if(!e)return`<svg viewBox="0 0 70 90">${s}<path d="M20 74 q4 -3 8 0 M36 78 q4 -3 8 0" stroke="#b5875f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;const o=Yr[n%Yr.length];let i="";t===0&&(i=`<circle cx="27" cy="72" r="3" fill="#f2dcb8" ${w(1.5)}/><circle cx="36" cy="75" r="3" fill="#f2dcb8" ${w(1.5)}/><circle cx="44" cy="71" r="3" fill="#f2dcb8" ${w(1.5)}/>`),t===1&&(i=`<path d="M35 72 V58" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="57" rx="7" ry="4" fill="#69db7c" ${w(2)}/><ellipse cx="41" cy="55" rx="7" ry="4" fill="#69db7c" ${w(2)}/>`),t===2&&(i=`<path d="M35 72 V40 M35 60 Q22 54 20 42 M35 56 Q48 50 50 38" stroke="#40c057" stroke-width="4" fill="none" stroke-linecap="round"/>${e.seed==="flower"?`<circle cx="35" cy="38" r="7" fill="#b2f2bb" ${w(2)}/>`:""}`),t===3&&(i=e.seed==="carrot"?`<path d="M26 74 L44 72 L35 86 Z" fill="#ff922b" ${w(2.5)}/><path d="M35 72 Q24 50 22 38 M35 72 Q36 48 36 34 M35 72 Q46 50 50 40" stroke="#40c057" stroke-width="5" fill="none" stroke-linecap="round"/>`:`<path d="M35 72 V34" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="54" rx="8" ry="4" fill="#69db7c" ${w(2)}/>${[0,72,144,216,288].map(l=>`<circle cx="${35+Math.cos(l*Math.PI/180)*10}" cy="${28+Math.sin(l*Math.PI/180)*10}" r="8" fill="${o}" ${w(2.5)}/>`).join("")}<circle cx="35" cy="28" r="6" fill="#ffd43b" ${w(2)}/>`);const a=e.wet?"":`<g class="needWater"><path d="M56 18 q6 10 0 14 q-6 -4 0 -14 Z" fill="#74c0fc" ${w(2)}/></g>`,r=t===3?`<g class="ready"><path d="M58 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffd43b" ${w(1.5)}/></g>`:"";return`<svg viewBox="0 0 70 90">${s}${i}${a}${r}</svg>`}const u6=`<svg viewBox="0 0 48 48">${rt.map((e,t)=>`<path d="M${6+t*2.6} 38 A${18-t*2.6} ${18-t*2.6} 0 0 1 ${42-t*2.6} 38" fill="none" stroke="${e}" stroke-width="3"/>`).join("")}<path d="M4 38 H44" ${w(3)}/></svg>`,m6=`<svg viewBox="0 0 48 48"><path d="M10 34 Q24 22 38 34" fill="none" ${w(4)}/><path d="M24 30 V8 M16 16 L24 8 L32 16" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40 H40" ${w(4)}/></svg>`,y6=`<svg viewBox="0 0 200 320"><path d="M70 310 L84 120 H116 L130 310 Z" fill="#fff6e6" ${w(4)}/><path d="M78 200 H122 M74 260 H126" ${w(3)}/><rect x="88" y="262" width="24" height="48" rx="10" fill="#b197fc" ${w(3)}/>
  <path d="M78 124 L100 92 L122 124 Z" fill="#ff8fab" ${w(4)}/>
  <g class="sails" style="transform-origin:100px 110px">${[0,90,180,270].map(e=>`<g transform="rotate(${e} 100 110)"><path d="M100 110 L104 30 L126 30 L118 104 Z" fill="${["#ffd43b","#74c0fc","#ff8fab","#69db7c"][e/90]}" ${w(3)}/><path d="M108 40 H122 M107 58 H121 M106 76 H120" ${w(2)}/></g>`).join("")}<circle cx="100" cy="110" r="10" fill="#ffa94d" ${w(3)}/></g></svg>`,k6=["GOAT","SHEEP","PIGLET","CHICKS","BUNNY","COW"],v6=e=>`<g class="lantern" style="transform-origin:${e}px 146px"><path d="M${e} 146 V178" ${w(3)}/><circle cx="${e}" cy="204" r="34" fill="#fff3b0" opacity=".45"/>
  <path d="M${e-14} 182 H${e+14} L${e+11} 226 H${e-11} Z" fill="#ffe066" ${w(3)}/><rect x="${e-17}" y="176" width="34" height="8" rx="3" fill="#495057" ${w(2.5)}/><rect x="${e-15}" y="224" width="30" height="7" rx="3" fill="#495057" ${w(2.5)}/><ellipse cx="${e}" cy="205" rx="5" ry="9" fill="#ff922b"/></g>`;function b6(){const e=Ca,t=Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64} 146 V440" stroke="#d4895f" stroke-width="3"/>`).join(""),n=Array.from({length:Math.ceil(e/46)},(o,i)=>{const a=i*46,r=160+Math.sin(i/3.1)*8;return`<path d="M${a} ${r} L${a+40} ${r} L${a+20} ${r+30} Z" fill="${rt[i%6]}" ${w(2.5)}/>`}).join(""),s=Ba.map((o,i)=>`<g><rect x="${o-96}" y="318" width="192" height="122" rx="6" fill="#f0c49a" ${w(4)}/>
    <path d="M${o-96} 350 H${o+96} M${o-96} 384 H${o+96} M${o-96} 412 H${o+96}" stroke="#d9a074" stroke-width="3"/><path d="M${o-96} 318 L${o+96} 440 M${o+96} 318 L${o-96} 440" stroke="#e0aa7e" stroke-width="7" opacity=".7"/>
    <rect x="${o-54}" y="284" width="108" height="30" rx="10" fill="#fff6e6" ${w(3)}/><text x="${o}" y="305" text-anchor="middle" font-size="17" font-weight="900" fill="${te}" font-family="Nunito, system-ui, sans-serif">${k6[i]}</text></g>`).join("");return`<svg class="parkScene ranchScene barnScene" viewBox="0 0 ${e} ${Ns}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="440" fill="#e8a87c"/>${t}
  <!-- hay loft -->
  <rect width="${e}" height="128" fill="#c98a5e"/>${Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64+32} 0 V128" stroke="#b5764d" stroke-width="3"/>`).join("")}
  ${[120,260,420,980,1130,1290,1640,1790].map((o,i)=>St(o,126,i%3===1?.72:.85)).join("")}${[190,1060,1720].map(o=>St(o,82,.7)).join("")}
  <rect x="0" y="126" width="${e}" height="24" fill="#a8653a" ${w(4)}/>
  ${[0,1,2,3,4,5,6].map(o=>`<path d="M${120+o*280} 150 L${180+o*280} 210" stroke="#a8653a" stroke-width="12" stroke-linecap="round"/><path d="M${120+o*280} 150 L${180+o*280} 210" ${w(2)}/>`).join("")}
  <!-- ladder up to the loft -->
  <g transform="translate(1840 0)"><path d="M-22 150 L-30 440 M22 150 L30 440" stroke="#c99366" stroke-width="10" stroke-linecap="round"/>${[190,240,290,340,390].map(o=>`<path d="M${-22-(o-150)*.028} ${o} H${22+(o-150)*.028}" stroke="#c99366" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
  <!-- rainbow bunting + big rainbow banner -->
  <path d="M0 160 Q${e/2} 176 ${e} 160" fill="none" ${w(2)}/>${n}
  <g transform="translate(${e/2+60} 236)">${rt.map((o,i)=>`<rect x="${-180+i*60}" y="-26" width="60" height="44" fill="${o}"/>`).join("")}<rect x="-180" y="-26" width="360" height="44" rx="4" fill="none" ${w(4)}/>
    <path d="M-180 -26 L-200 -4 L-180 18 M180 -26 L200 -4 L180 18" fill="#ff8fab" ${w(3)}/>
    <text x="0" y="6" text-anchor="middle" font-size="26" font-weight="900" fill="#fff" stroke="${te}" stroke-width="5" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  <!-- round windows with daylight -->
  ${[440,1720].map(o=>`<circle cx="${o}" cy="236" r="34" fill="#c7e8ff" ${w(4)}/><path d="M${o-34} 236 H${o+34} M${o} 202 V270" ${w(3)}/>`).join("")}
  ${s}
  <!-- the big door (back outside) -->
  <rect x="24" y="200" width="206" height="244" rx="10" fill="#b5703f" ${w(4)}/>
  <rect x="38" y="214" width="178" height="230" fill="#c7e8ff"/><path d="M38 360 Q120 330 216 352 V444 H38 Z" fill="#a6e3a0"/><circle cx="180" cy="250" r="16" fill="#ffe066"/>
  <path d="M38 214 H216 V444 M38 214 V444" fill="none" ${w(4)}/>
  <!-- straw floor -->
  <rect x="0" y="438" width="${e}" height="162" fill="#f2d58a"/><path d="M0 440 H${e}" ${w(4)}/>
  ${Array.from({length:70},(o,i)=>{const a=i*137%e,r=470+i*53%120;return`<path d="M${a} ${r} l${14+i%3*4} ${i%2?-4:4}" stroke="#d9a93f" stroke-width="3" stroke-linecap="round"/>`}).join("")}
  <!-- feed station -->
  <g transform="translate(356 0)"><rect x="-70" y="456" width="140" height="34" rx="12" fill="#fff6e6" ${w(3)}/><text x="0" y="480" text-anchor="middle" font-size="16" font-weight="900" fill="${te}" font-family="Nunito, system-ui, sans-serif">FOOD 🥕🍎🌾</text></g>
  ${St(1790,590,.8)}${St(1700,600,.65)}
  ${[290,660,1330,1590].map(v6).join("")}
  </svg>`}const Eo=600,Ke="#5a3d5c",z=(e=4)=>`stroke="${Ke}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function js(e){const t=Ws[e].seats,n=t<=2?140:t===4?110:100,s=(t-1)/2;return Array.from({length:t},(o,i)=>({x:Ws[e].x+(i-s)*n,y:558-Math.abs(i-s)*8}))}const Xr=["#ff7eb3","#ffd43b","#66d9e8","#d0bfff","#fff"],At=(e,t,n=1,s="#fff")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -9 L2.2 -2.4 L9 -2.2 L3.4 2.2 L5.4 9 L0 4.6 L-5.4 9 L-3.4 2.2 L-9 -2.2 L-2.2 -2.4 Z" fill="${s}" stroke="${Ke}" stroke-width="1.2" stroke-linejoin="round"/>`;function Jr(e,t,n,s){const o=`<path d="M36 ${t} Q ${e/2} ${t+n+8} ${e-36} ${t}" fill="none" stroke="${Ke}" stroke-width="3"/>`,i=Array.from({length:s},(a,r)=>{const l=s===1?.5:r/(s-1),c=48+l*(e-96),d=t+Math.sin(l*Math.PI)*n,g=Xr[r%Xr.length];return`<g class="bulb" style="animation-delay:-${r%8*.22}s"><line x1="${c}" y1="${d-16}" x2="${c}" y2="${d-6}" stroke="${Ke}" stroke-width="2"/><circle cx="${c}" cy="${d}" r="7.5" fill="${g}" ${z(2)}/><circle cx="${c-2}" cy="${d-2}" r="2.2" fill="#fff" opacity=".85"/></g>`}).join("");return o+i}const hs=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">
  <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".12"/>
  <path d="M-40 10 Q-48 -22 -10 -28 Q10 -46 34 -18 Q50 2 34 18 Q8 32 -24 20 Q-42 16 -40 10 Z" fill="${n}" ${z(3)}/>
  <path d="M-18 -6 Q-4 -20 14 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <circle cx="16" cy="6" r="4" fill="#fff" opacity=".35"/>
</g>`,el=(e,t,n)=>`<g transform="translate(${e} ${t})">
  <ellipse cx="0" cy="16" rx="28" ry="9" fill="#000" opacity=".12"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="${n}" ${z(3)}/>
  <ellipse cx="-6" cy="-2" rx="12" ry="7" fill="#fff" opacity=".35"/>
  <path d="M0 -16 V-28" ${z(3)}/><circle cy="-32" r="6" fill="#ffd43b" ${z(2)}/>
</g>`;function so(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-40" y="-52" width="80" height="104" rx="6" fill="#fff" ${z(3.5)}/>
    <rect x="-32" y="-44" width="64" height="72" rx="4" fill="${s}"/>
    ${o}
    <rect x="-10" y="-58" width="20" height="10" rx="2" fill="#ffe8a3" opacity=".85" transform="rotate(-8)"/>
  </g>`}function oo(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-28" y="-34" width="56" height="68" rx="3" fill="#fff" ${z(3)}/>
    <rect x="-22" y="-28" width="44" height="40" fill="${s}"/>
    ${o}
  </g>`}function io(e,t,n,s){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="36" rx="26" ry="8" fill="#000" opacity=".12"/>
    <path d="M-18 36 L-12 -2 H12 L18 36 Z" fill="${n}" ${z(3)}/>
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c9a27a" ${z(2)}/>
    <ellipse cx="-16" cy="-16" rx="16" ry="22" fill="${s}" ${z(3)} transform="rotate(-18)"/>
    <ellipse cx="16" cy="-18" rx="16" ry="22" fill="${s}" ${z(3)} transform="rotate(16)"/>
    <ellipse cx="0" cy="-28" rx="14" ry="20" fill="${s}" ${z(3)}/>
    <circle cx="0" cy="-36" r="6" fill="#ff8ec8" ${z(2)}/>
  </g>`}function w6(e,t){return`<g transform="translate(${e} ${t})">
    <ellipse cx="28" cy="118" rx="32" ry="8" fill="#000" opacity=".12"/>
    <rect width="56" height="118" rx="10" fill="#e7fbff" ${z()}/>
    <rect y="52" width="56" height="8" fill="#d0f4ff" ${z(2)}/>
    <rect x="44" y="18" width="6" height="22" rx="3" fill="#ffd43b" ${z(2)}/>
    <rect x="44" y="70" width="6" height="28" rx="3" fill="#ffd43b" ${z(2)}/>
    <rect x="8" y="12" width="28" height="22" rx="4" fill="#fff" ${z(2)}/>
    <circle cx="16" cy="22" r="4" fill="#ff8ec8"/><circle cx="28" cy="24" r="3" fill="#ffd43b"/>
    <path d="M18 78 C14 72 8 74 12 82 C15 88 18 90 18 90 C18 90 21 88 24 82 C28 74 22 72 18 78 Z" fill="#ff4d94" ${z(1.5)}/>
  </g>`}function $6(e,t,n){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="6" rx="34" ry="9" fill="#000" opacity=".1"/>
    <path d="M-46 -16 C-50 -86 -26 -108 0 -110 C26 -108 50 -86 46 -16 Z" fill="#fff6fb" ${z()}/>
    <path d="M-32 -20 C-34 -74 -16 -90 0 -92 C16 -90 34 -74 32 -20 Z" fill="${n}"/>
    <ellipse cx="0" cy="-10" rx="40" ry="16" fill="${n}" ${z()}/>
    <ellipse cx="-8" cy="-16" rx="14" ry="6" fill="#fff" opacity=".4"/>
    <path d="M-22 -2 L-26 16 M22 -2 L26 16" fill="none" stroke="${Ke}" stroke-width="4" stroke-linecap="round"/>
  </g>`}function _6(e){const t=Ws[e],n=t.game==="four"?"Four":"Slay",s=t.game==="four"?"#7ad7ea":e===0?"#ff8ec8":"#e0b0ff",o=t.game==="four"?"#b8f2ff":e===0?"#ffd0e6":"#ead9ff",i=t.seats>=6?250:t.seats>=4?200:150;return`${js(e).map(r=>$6(r.x,r.y,o)).join("")}
  <g transform="translate(${t.x} 500)">
    <ellipse cx="0" cy="28" rx="${i+18}" ry="20" fill="#000" opacity=".1"/>
    <rect x="-18" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${z(3)}/>
    <rect x="4" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${z(3)}/>
    <ellipse cx="0" cy="-4" rx="${i}" ry="30" fill="${s}" stroke="#ffd43b" stroke-width="6"/>
    <ellipse cx="0" cy="-4" rx="${i-16}" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <ellipse cx="${-i*.25}" cy="-12" rx="${i*.35}" ry="8" fill="#fff" opacity=".28"/>
    <text x="0" y="4" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="${Ke}" stroke-width="4" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${n}</text>
  </g>`}const ao=(e,t,n=1,s="#ff4d94")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 4 C-6 -4 -14 -2 -10 6 C-7 12 0 16 0 16 C0 16 7 12 10 6 C14 -2 6 -4 0 4 Z" fill="${s}" stroke="${Ke}" stroke-width="1.6" stroke-linejoin="round"/>`;function x6(){const e=oi,t=[[120,200],[260,250],[640,210],[900,250],[1180,190],[1560,230],[1860,180],[2100,240],[2420,200],[2520,280]];return`<svg class="grScene" viewBox="0 0 ${e} ${Eo}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="${e}" height="${Eo}" fill="url(#grWall)"/>
  <rect y="390" width="${e}" height="80" fill="#fff6fb" opacity=".45"/>
  ${Array.from({length:8},(n,s)=>`<rect x="${40+s*330}" y="400" width="280" height="62" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`).join("")}
  <rect y="468" width="${e}" height="132" fill="url(#grFloor)"/>
  <rect y="464" width="${e}" height="12" fill="#ffd43b" ${z(3)}/>
  ${[720,1500,2150].map((n,s)=>`<ellipse cx="${n}" cy="548" rx="${s===1?210:280}" ry="42" fill="${s===1?"#d8f6ff":s===0?"#ffe0f0":"#f3e8ff"}" stroke="#fff" stroke-width="4" opacity=".8"/>`).join("")}
  ${Jr(e,28,22,28)}
  ${Jr(e,78,16,18)}
  ${t.map(([n,s],o)=>At(n,s,.7+o%3*.28,o%2?"#fff":"#ffd43b")).join("")}

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

  ${so(250,250,-6,"#ffe0f0",`${ao(0,8,1.4)}${At(-18,-16,.7,"#ffd43b")}${At(18,-10,.55,"#66d9e8")}`)}
  ${so(980,240,5,"#e7fbff",`<ellipse cx="0" cy="6" rx="16" ry="12" fill="#fff" ${z(2)}/><path d="M-6 6 Q0 -8 6 6" fill="none" stroke="${Ke}" stroke-width="2"/><path d="M0 18 V28 M-12 24 H12" ${z(2)}/>`)}
  ${so(1680,255,-4,"#fff3c4",`${At(0,2,1.5,"#ffd43b")}`)}
  ${so(2360,245,6,"#f3e8ff",`${ao(0,4,1.3,"#d0bfff")}`)}
  ${oo(400,300,8,"#fff0f6",ao(0,-4,1.1))}
  ${oo(820,310,-7,"#e7fbff",At(0,-6,1,"#66d9e8"))}
  ${oo(1900,300,9,"#fff6e6",At(0,-6,1,"#ffd43b"))}
  ${oo(2280,320,-8,"#ffe0f0",ao(0,-4,1))}

  <g class="disco" transform="translate(1288 36)">
    <line y1="0" y2="22" stroke="${Ke}" stroke-width="3"/>
    <circle cy="44" r="26" fill="url(#disco)" ${z(3)}/>
    <path d="M-14 36 L0 56 L14 36 M-8 48 H8" fill="none" stroke="#fff" stroke-width="2.5"/>
    ${At(-30,20,.45)}${At(32,28,.4,"#ffd43b")}
  </g>

  <g transform="translate(86 292)">
    <rect width="78" height="168" rx="12" fill="#ff8ec8" ${z()}/>
    <rect x="8" y="10" width="62" height="36" rx="8" fill="#fff6e6" ${z(2)}/>
    <text x="39" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="${Ke}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
    <circle cx="62" cy="96" r="5" fill="#ffd43b" ${z(2)}/>
    <rect x="22" y="118" width="34" height="8" rx="3" fill="#fff" opacity=".45"/>
  </g>

  ${io(40,400,"#ffd43b","#8ce99a")}
  ${io(1080,392,"#ff8ec8","#69db7c")}
  ${io(1600,400,"#d0bfff","#8ce99a")}
  ${io(2520,396,"#66d9e8","#69db7c")}
  ${w6(200,348)}
  <g transform="translate(2420 360)">
    <rect width="130" height="100" rx="14" fill="#fff6fb" ${z()}/>
    <rect y="28" width="130" height="10" fill="#ffd0e6" ${z(2)}/>
    <circle cx="28" cy="64" r="12" fill="#ffd43b" ${z(2)}/><circle cx="64" cy="66" r="10" fill="#ff8ec8" ${z(2)}/><rect x="86" y="52" width="28" height="22" rx="6" fill="#66d9e8" ${z(2)}/>
    <text x="65" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="${Ke}" font-family="Nunito, ui-rounded, system-ui, sans-serif">SNACKS</text>
  </g>

  ${hs(330,455,"#ff8ec8",1.05)}
  ${hs(1120,468,"#d0bfff")}
  ${hs(1360,470,"#8ce4f2",.9)}
  ${hs(1780,462,"#ffd43b")}
  ${el(1480,500,"#ffb3d9")}
  ${el(2e3,505,"#c9b3ff")}
  ${hs(2550,468,"#ff8ec8",.85)}

  ${Ws.map((n,s)=>_6(s)).join("")}
  </svg>`}const M6=`<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${Ke}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`,T="#5a3d5c",L6=`<svg viewBox="0 0 120 100"><rect x="0" y="62" width="120" height="38" rx="14" fill="#9fe0aa" stroke="${T}" stroke-width="3"/>
  <path d="M18 70 L30 22 L42 70 M78 70 L90 22 L102 70" fill="none" stroke="#8ecae6" stroke-width="5" stroke-linecap="round"/><path d="M26 22 H94" stroke="#ff8fab" stroke-width="7" stroke-linecap="round"/>
  <path d="M50 22 V54 M66 22 V54" stroke="${T}" stroke-width="2.5"/><rect x="45" y="52" width="26" height="7" rx="3" fill="#ff9f68" stroke="${T}" stroke-width="2.5"/>
  <circle cx="104" cy="14" r="9" fill="#ffd166" stroke="${T}" stroke-width="3"/></svg>`,uc=`<svg viewBox="0 0 120 100"><path d="M20 50 L60 16 L100 50" fill="#ff8fab" stroke="${T}" stroke-width="4" stroke-linejoin="round"/><rect x="28" y="48" width="64" height="44" rx="6" fill="#fff6e6" stroke="${T}" stroke-width="4"/>
  <rect x="52" y="64" width="16" height="28" rx="4" fill="#c9a0dc" stroke="${T}" stroke-width="3"/><rect x="34" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${T}" stroke-width="3"/><rect x="73" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${T}" stroke-width="3"/></svg>`,qa=`<svg viewBox="0 0 120 100"><path d="M40 18 L24 28 L14 46 L30 52 L34 44 V88 H86 V44 L90 52 L106 46 L96 28 L80 18 Q60 34 40 18 Z" fill="#8ecae6" stroke="${T}" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="58" r="7" fill="#fff3b0" stroke="${T}" stroke-width="3"/></svg>`,K=e=>`<div class="wnArt">${e}</div>`,mc=`<svg viewBox="0 0 120 100"><rect x="16" y="58" width="74" height="24" rx="10" fill="#fff" stroke="${T}" stroke-width="4"/><circle cx="32" cy="70" r="7" fill="#ff8fab" stroke="${T}" stroke-width="3"/><circle cx="52" cy="70" r="7" fill="#ffe066" stroke="${T}" stroke-width="3"/><circle cx="72" cy="70" r="7" fill="#8ecae6" stroke="${T}" stroke-width="3"/><path d="M86 46 l14 -16 8 8 -14 16z" fill="#ffd166" stroke="${T}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="44" width="12" height="24" rx="4" fill="#c9a0dc" stroke="${T}" stroke-width="3"/></svg>`,C6=`<svg viewBox="0 0 120 100">${rt.map((e,t)=>`<path d="M${12+t*6} 84 A${48-t*6} ${48-t*6} 0 0 1 ${108-t*6} 84" fill="none" stroke="${e}" stroke-width="6"/>`).join("")}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${T}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${T}" stroke-width="3"/></svg>`,B6=`<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${Us.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g><g transform="translate(52 22) scale(1.4)">${Us.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g></svg>`,la=(e,t,n,s)=>`<g transform="translate(${t} ${n}) scale(${s})">${e.replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"")}</g>`,S6=`<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${T}" stroke-width="4"/>${la(Ma(We({skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6"})).replace('viewBox="14 2 72 74"','viewBox="0 0 100 160"'),26,12,.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`,W6=`<svg viewBox="0 0 120 100"><rect x="8" y="28" width="104" height="64" rx="16" fill="#fff0f6" stroke="${T}" stroke-width="4"/><path d="M8 40 L60 12 L112 40" fill="#ff6b9a" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 58 C52 48 40 50 46 60 C50 68 60 74 60 74 C60 74 70 68 74 60 C80 50 68 48 60 58 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  ${[18,34,50,66,82,98].map((e,t)=>`<circle cx="${e}" cy="24" r="4" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" stroke="${T}" stroke-width="1.5"/>`).join("")}</svg>`,T6=`<svg viewBox="0 0 120 100"><rect x="28" y="8" width="64" height="84" rx="12" fill="#fff" stroke="${T}" stroke-width="4"/><rect x="28" y="8" width="64" height="84" rx="12" fill="none" stroke="#ff7eb3" stroke-width="6"/><path d="M48 36 L54 24 L60 34 L68 20 L76 34 L82 24 L88 36 Z" fill="#ffd43b" stroke="${T}" stroke-width="2" stroke-linejoin="round"/><text x="60" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#ff4d94" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY</text></svg>`,P6=`<svg viewBox="0 0 120 100"><rect x="10" y="16" width="100" height="72" rx="14" fill="#fff6fb" stroke="${T}" stroke-width="4"/>
  <path d="M36 58 C28 48 18 50 24 60 C28 68 36 74 36 74 C36 74 44 68 48 60 C54 50 44 48 36 58 Z" fill="#ff4d94" stroke="${T}" stroke-width="2"/>
  <path d="M78 28 L82 40 H94 L84 48 L88 60 L78 52 L68 60 L72 48 L62 40 H74 Z" fill="#66d9e8" stroke="${T}" stroke-width="2"/></svg>`,yc=`<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="22" rx="6" fill="#fff" stroke="${T}" stroke-width="3"/><path d="M6 26 H42 M14 18 V40 M22 18 V40 M30 18 V40 M36 18 V40" stroke="${T}" stroke-width="2.4"/><rect x="4" y="12" width="40" height="8" rx="4" fill="#9ad7f5" stroke="${T}" stroke-width="3"/><ellipse cx="20" cy="32" rx="5" ry="3" fill="#ffe0ec"/><ellipse cx="30" cy="32" rx="5" ry="3" fill="#c9e7ff"/></svg>`,U6=`<svg viewBox="0 0 120 100"><ellipse cx="60" cy="72" rx="50" ry="20" fill="#ffc2d4" stroke="${T}" stroke-width="4"/><ellipse cx="60" cy="72" rx="32" ry="11" fill="#fff" stroke="${T}" stroke-width="3"/><path d="M60 58 C50 46 36 48 42 60 C48 70 60 78 60 78 C60 78 72 70 78 60 C84 48 70 46 60 58 Z" fill="#ff4d94" stroke="${T}" stroke-width="3"/><path d="M22 40 Q28 28 36 36" fill="none" stroke="#7dce8a" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="5" fill="#ffd166" stroke="${T}" stroke-width="2"/></svg>`,H6=`<svg viewBox="0 0 120 100"><path d="M16 50 L60 14 L104 50" fill="#ff8fab" stroke="${T}" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="48" width="68" height="40" rx="10" fill="#fff6ea" stroke="${T}" stroke-width="4"/><path d="M42 88 V60 Q60 44 78 60 V88" fill="#ffe8c7" stroke="${T}" stroke-width="3"/><circle cx="82" cy="64" r="7" fill="#bde0fe" stroke="${T}" stroke-width="3"/><circle cx="80" cy="62" r="2" fill="#fff"/></svg>`,Q6=`<svg viewBox="0 0 120 100"><rect x="28" y="38" width="64" height="42" rx="8" fill="#8ecae6" stroke="${T}" stroke-width="4"/><path d="M28 44 L60 68 L92 44" fill="none" stroke="${T}" stroke-width="4"/><path d="M76 30 V16" stroke="${T}" stroke-width="4" stroke-linecap="round"/><path d="M76 16 H96 L90 23 L96 30 H76 Z" fill="#ff6b6b" stroke="${T}" stroke-width="3"/></svg>`,E6=`<svg viewBox="0 0 120 100"><rect x="8" y="32" width="48" height="40" rx="14" fill="#fff3b0" stroke="${T}" stroke-width="4"/><rect x="64" y="32" width="48" height="40" rx="14" fill="#fff" stroke="${T}" stroke-width="4"/><path d="M26 44 L40 52 L26 60 Z" fill="${T}"/><circle cx="88" cy="52" r="6" fill="#ff8fab" stroke="${T}" stroke-width="3"/></svg>`,z6=`<svg viewBox="0 0 120 100"><rect x="16" y="18" width="36" height="58" rx="6" fill="#fff" stroke="${T}" stroke-width="4"/><rect x="62" y="24" width="42" height="52" rx="6" fill="#e7f6ff" stroke="${T}" stroke-width="4"/><circle cx="34" cy="66" r="2.4" fill="${T}"/><circle cx="83" cy="66" r="2.4" fill="${T}"/></svg>`,kc=[{v:8,title:"Make your look!",lines:[{art:K(Q6),text:"Leave a <b>letter</b> in a friend's mailbox!"},{art:K(E6),text:"Tap <b>Play</b> or <b>Decorate</b>!"},{art:K(qa),text:"<b>Make your look!</b> New hair, clothes, and colors."},{art:K(z6),text:"Update every iPad to see the <b>new outfits</b>!"}]},{v:7,title:"New Nursery!",lines:[{art:K(yc),text:"A new <b>Nursery</b> room, with a <b>crib</b> and a rocker!"},{art:K(U6),text:"The <b>Cozy Cottage</b> furniture pack is in your drawer!"},{art:K(H6),text:"A <b>dog kennel</b> and a <b>cat tower</b> for your pets!"}]},{v:6,title:"The clubhouse is open!",lines:[{art:K(W6),text:"A glam <b>clubhouse</b> on the map!"},{art:K(T6),text:"Play <b>Slay</b> with friends at a table!"},{art:K(P6),text:"Line up <b>hearts</b> or <b>stars</b>!"}]},{v:5,title:"Your house looks even cozier!",lines:[{art:K(mc),text:"Wallpaper and floors show their <b>real patterns</b> when you paint!"},{art:K(Gn(0,"sit")),text:"Your cat is <b>big and cozy</b>, just like the toy cat."},{art:K(uc),text:"Tap <b>home</b> to come back from the map, the park, or the ranch."}]},{v:4,title:"A map of our neighborhood!",lines:[{art:K(xa),text:"Tap the <b>map</b> to go anywhere!"},{art:K(S6),text:"Tap a friend's face to <b>find her</b>."},{art:K(ra(0)),text:"The petting zoo is inside the <b>barn</b> now!"}]},{v:3,title:"Rainbow Ranch is open!",lines:[{art:K(C6),text:"Visit <b>Rainbow Ranch</b>!"},{art:K(ra(1)),text:"Pet and feed animals at the <b>petting zoo</b>."},{art:K(`<svg viewBox="0 0 160 130">${la(Oa(4),0,0,1)}</svg>`),text:"Ride <b>horses</b> and the <b>rainbow pony</b>!"},{art:K(B6),text:"Collect <b>eggs</b> from the hens."},{art:K(`<svg viewBox="0 0 70 90">${la(pc({seed:"carrot",wet:1},3,0),0,0,1)}</svg>`),text:"Grow carrots and flowers in the <b>garden</b>."}]},{v:2,title:"What's new!",lines:[{art:K(L6),text:"A new <b>park</b>! Swing, slide and splash with friends."},{art:K(Gn(3,"sit")),text:"Adopt a <b>cat</b>! She lives in your house."},{art:K(Ps(3,"stand")),text:"Adopt a <b>dog</b>! Take it to the park to play fetch."}]}],vc=kc[0].v,bc={v:vc,title:"Welcome to your cozy house!",lines:[{art:K(uc),text:"Drag furniture into your rooms."},{art:K(qa),text:"Dress up your friends."},{art:K(Gn(0,"sit")),text:"Tap the paw to adopt a pet!"}]},wc=wt("cozy-whatsnew"),R6=1;function A6(){try{const e=Number(localStorage.getItem(wc)),t=["cozy-house","cozy-house-v1","cozy-hood"].some(o=>localStorage.getItem(wt(o))!==null);if(!e&&!t)return{kind:"welcome",entries:[bc]};const n=e||R6,s=kc.filter(o=>o.v>n).slice(0,3);return s.length?{kind:"news",entries:s}:{kind:"none",entries:[]}}catch{return{kind:"none",entries:[]}}}function D6(){try{localStorage.setItem(wc,String(vc))}catch{}}function O6(e,t){const n=e==="welcome"?bc.title:t[0].title,s=t.flatMap(o=>o.lines).slice(0,5);return`<div class="wnBadge">${e==="welcome"?Ol:t[0].v>=8?qa:t[0].v>=7?yc:t[0].v>=6?M6:t[0].v>=5?mc:t[0].v>=4?xa:t[0].v>=3?u6:oh}</div>
    <h2 class="wnTitle">${n}</h2>
    <div class="wnList ${s.length>3?"many":""}">${s.map((o,i)=>`<div class="wnLine" style="animation-delay:${.15+i*.18}s">${o.art}<p>${o.text}</p></div>`).join("")}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`}const Dn=[{name:"Pink",fill:"#ff7eb3",ink:"#9d174d"},{name:"Lilac",fill:"#c9b3ff",ink:"#5f3dc4"},{name:"Aqua",fill:"#66d9e8",ink:"#0b7285"},{name:"Gold",fill:"#ffd43b",ink:"#e67700"}],xe="#5a3d5c",Qi=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),tl=e=>typeof e=="number"?e:{skip:10,rev:11,d2:12,wild:13,w4:14}[e]??0,nl=e=>typeof e.v=="number"?String(e.v):e.v==="skip"?"✕":e.v==="rev"?"↻":e.v==="d2"?"+2":e.v==="w4"?"+4":"♛",I6=e=>e.v==="skip"?"Nope":e.v==="rev"?"Flip":e.v==="d2"?"+2":e.v==="wild"||e.v==="w4"?"Crown":"",pn=(e,t,n=1,s="#ffd43b")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -6 L1.4 -1.4 L6 -1 L1.6 1.4 L3 6 L0 3 L-3 6 L-1.6 1.4 L-6 -1 L-1.4 -1.4 Z" fill="${s}" stroke="${xe}" stroke-width="1" stroke-linejoin="round"/>`,yo=(e,t,n=1)=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 1.2 C-2.2 -1.6 -5.2 -0.6 -3.6 2.2 C-2.4 4 0 5.2 0 5.2 C0 5.2 2.4 4 3.6 2.2 C5.2 -0.6 2.2 -1.6 0 1.2 Z" fill="#ff4d94" stroke="${xe}" stroke-width="1"/>`;function q6(e){return e.v==="wild"||e.v==="w4"?`<g transform="translate(14 28)">
      <path d="M4 26 L10 8 L18 16 L24 2 L30 16 L38 8 L44 26 Z" fill="#ffd43b" stroke="${xe}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="4" y="26" width="40" height="8" rx="2" fill="#ffd43b" stroke="${xe}" stroke-width="2.2"/>
      <circle cx="10" cy="8" r="2.4" fill="#ff7eb3"/><circle cx="24" cy="3" r="2.4" fill="#66d9e8"/><circle cx="38" cy="8" r="2.4" fill="#d0bfff"/>
      ${pn(-2,0,.7)}${pn(46,4,.65,"#fff")}${pn(22,-4,.55,"#ff7eb3")}
    </g>${e.v==="w4"?`<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${xe}" font-family="Nunito, ui-rounded, system-ui, sans-serif">+4</text>`:""}`:e.v==="d2"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff" stroke="${xe}" stroke-width="2.4"/>
      ${yo(14,8,1.35)}${yo(32,8,1.35)}
      <path d="M12 26 Q23 34 34 26" fill="none" stroke="${xe}" stroke-width="2.4" stroke-linecap="round"/>
      ${yo(40,22,.8)}
    </g>`:e.v==="rev"?`<g fill="none" stroke="${xe}" stroke-width="3.2" stroke-linecap="round">
      <path d="M16 40 C42 22 54 52 34 60 C16 68 12 46 30 40"/>
      <path d="M14 38 L22 30 L24 42" stroke-linejoin="round"/>
    </g>${pn(48,28,.85)}${pn(20,62,.6,"#ff7eb3")}${pn(50,58,.55,"#66d9e8")}`:e.v==="skip"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff6d8" stroke="${xe}" stroke-width="2.4"/>
      <rect x="8" y="12" width="14" height="9" rx="3" fill="#2b1430"/><rect x="24" y="12" width="14" height="9" rx="3" fill="#2b1430"/>
      <path d="M22 16.5 H24 M5 14 H2 M41 14 H44" stroke="${xe}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 27 Q23 32 34 27" fill="none" stroke="${xe}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`:""}function ca(e){const t=e.c===4,n=t?{fill:"#fff8ee",ink:xe}:Dn[e.c]??Dn[0],s=typeof e.v=="number",o=I6(e),i=t?'<rect x="2" y="2" width="66" height="96" rx="13" fill="#fff8ee" stroke="#ff7eb3" stroke-width="4"/><rect x="5" y="5" width="60" height="90" rx="11" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="7.5" y="7.5" width="55" height="85" rx="9" fill="none" stroke="#66d9e8" stroke-width="1.6"/><rect x="9.5" y="9.5" width="51" height="81" rx="8" fill="none" stroke="#ffd43b" stroke-width="1.6"/>':`<rect x="2" y="2" width="66" height="96" rx="13" fill="${n.fill}" stroke="${xe}" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`,a='<ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/>',r=`fill="${n.ink}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif"`,l=`<text x="8" y="16" font-size="13" font-weight="900" ${r}>${nl(e)}</text>`+(s?`<text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" ${r}>${nl(e)}</text>`:""),c=s?`<text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="${n.ink}" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${e.v}</text>`:`${q6(e)}${o?`<text x="35" y="92" text-anchor="middle" font-size="12" font-weight="900" ${r}>${o}</text>`:""}`;return`<svg viewBox="0 0 70 100">${i}${a}${l}${c}</svg>`}const N6=[[18,28],[40,28],[29,46],[18,64],[40,64],[29,78]].map(([e,t])=>yo(e,t,.9)).join(""),j6=`<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff4d94" stroke="${xe}" stroke-width="3"/>
  <rect x="7" y="7" width="56" height="86" rx="10" fill="none" stroke="#ffd43b" stroke-width="3"/>
  <rect x="11" y="11" width="48" height="78" rx="8" fill="#ff7eb3"/>
  ${N6}
  <circle cx="35" cy="50" r="14" fill="#fff6fb" stroke="${xe}" stroke-width="2.4"/>
  ${pn(35,50,1.15,"#ffd43b")}
</svg>`,$c=(e,t)=>{if(t.turn<0||t.drawn!=null&&e.id!==t.drawn)return!1;const n=t.top;return e.c===4||e.c===t.color||e.v===n.v&&n.c!==4};let da=null,ze=null,zn=-1,sl=-1;function ol(e,t){da=e;const n=t.table,s=n.view;if(!s||!s.top){e.innerHTML="";return}n.tb!==sl&&(ze=null,zn=-1,sl=n.tb);const o=n.you,i=o!==null&&Array.isArray(s.hand)?s.hand.slice():[];ze!==null&&!i.some(h=>h.id===ze)&&(ze=null);const a=s.ev;let r=null;if(a&&a.n!==zn&&zn>=0&&a.k==="play"&&a.card){const h=e.querySelector(`[data-card="${a.card.id}"]`)||e.querySelector(`[data-p="${a.p}"]`);h&&(r=h.getBoundingClientRect())}const c=n.phase==="play"&&s.turn>=0,d=c&&o!==null&&s.turn===o,g=o!==null&&i.length<=2&&i.length>0&&!s.slay?.[o]&&d,p=d&&s.drawn==null&&n.phase==="play",m=d&&s.drawn!=null&&n.phase==="play",v=i.sort((h,b)=>h.c-b.c||tl(h.v)-tl(b.v)),$=c?n.players[s.turn]:"",x=c?d?"Your turn!":`${Qi(t.name($))}'s turn`:"",f=Dn[s.color]??Dn[0];if(e.innerHTML=`<div class="slayFelt">
    ${x?`<div class="whose ${d?"yours":""}" id="whoseTurn">${x}<span class="slayDir" aria-hidden="true">${s.dir===1?"→":"←"}</span></div>`:""}
    <div class="slayOpps">${n.players.map((h,b)=>b===o?"":`<div class="slayOpp ${s.turn===b?"isTurn":""}" data-p="${b}" data-count="${s.counts?.[b]??0}"><span class="chipFace">${t.face(h)}</span><b>${Qi(t.name(h))}</b><span class="cnt">${s.counts?.[b]??0}</span>${t.away(h)?'<i class="awayBadge">away</i>':""}${s.slay?.[b]?"<em>SLAY!</em>":""}</div>`).join("")}</div>
    <div class="slayPile">
      <button type="button" id="slayDeck" class="slayDeck" ${p?"":"disabled"} aria-label="Draw a card">${j6}<span>${s.deck??0}</span></button>
      <div id="slayDiscard" class="slayDiscard" data-top="${s.top.id}">${ca(s.top)}</div>
      <div class="nowColor" data-color="${s.color}" style="background:${f.fill}" aria-label="${f.name}"></div>
    </div>
    ${o===null?'<p class="watching">You are watching</p>':""}
    ${ze!==null?`<div id="crownPick" class="crownPick"><p>Pick a color for your Crown!</p><div class="crownRow">${Dn.map((h,b)=>`<button type="button" data-color="${b}" aria-label="${h.name}" style="background:${h.fill}"><span>${h.name}</span></button>`).join("")}</div></div>`:""}
    <div id="slayHand" class="slayHand ${d?"isTurn":""}">${v.map(h=>{const b=d&&n.phase==="play"&&$c(h,s),W=b?"can":d?"dim":"wait",P=typeof h.v=="number"?Dn[h.c].name+" "+h.v:h.v==="wild"?"Crown":h.v==="w4"?"Crown plus 4":h.v==="d2"?"plus 2":h.v==="rev"?"Flip":"Nope";return`<button type="button" class="slayCard ${W} ${h.id===s.drawn?"justDrew":""} ${h.id===ze?"picked":""}" data-card="${h.id}" data-c="${h.c}" data-v="${h.v}" aria-label="${Qi(P)}" ${b?"":"disabled"}>${ca(h)}</button>`}).join("")}</div>
    ${c&&o!==null?`<button type="button" id="slayCall" class="slayCall ${g?"ready":""}" ${g?"":"disabled"}>SLAY!</button>`:""}
    <button type="button" id="slayPass" class="slayPass ${m?"":"hidden"}" ${m?"":"disabled"}>Pass</button>
  </div>`,a&&a.n!==zn){const h=zn;if(zn=a.n,h>=0){if(a.k==="play"&&a.card){const b=e.querySelector("#slayDiscard");b&&Z6(r,a.card,b.getBoundingClientRect()),a.card.v==="skip"?t.toast("Nope!"):a.card.v==="rev"?t.toast("Flip!"):a.card.v==="d2"?t.toast("+2!"):a.card.v==="w4"&&t.toast("Crown +4!"),t.sfx.swish()}a.vdrew&&t.toast("Forgot to say SLAY! Draw 2"),a.k==="slay"&&t.sfx.sparkle()}}}function Z6(e,t,n){const s=document.createElement("div");s.className="flyCard",s.innerHTML=ca(t);const o=e?.width||70,i=e?.height||100;Object.assign(s.style,{left:(e?.left??innerWidth/2)+"px",top:(e?.top??80)+"px",width:o+"px",height:i+"px"}),document.body.appendChild(s),requestAnimationFrame(()=>{s.style.left=n.left+"px",s.style.top=n.top+"px",s.style.width=Math.max(n.width,70)+"px",s.style.height=Math.max(n.height,96)+"px"}),setTimeout(()=>s.remove(),560)}const F6={id:"slay",render:ol,handle(e,t){const n=t.table.view,s=t.table.you;if(!n||t.table.phase!=="play"||s===null)return!1;const o=n.hand??[];if(e.closest("#slayCall"))return o.length<=2&&o.length>0&&!n.slay?.[s]&&(t.move({k:"slay"}),t.sfx.sparkle()),!0;if(e.closest("#slayDeck"))return n.turn===s&&n.drawn==null&&(ze=null,t.move({k:"draw"}),t.sfx.click()),!0;if(e.closest("#slayPass"))return n.turn===s&&n.drawn!=null&&(ze=null,t.move({k:"pass"}),t.sfx.click()),!0;const i=e.closest("#crownPick [data-color]");if(i&&ze!==null)return t.move({k:"play",id:ze,color:+i.dataset.color}),ze=null,t.sfx.sparkle(),!0;const a=e.closest("#slayHand [data-card]");if(!a||a.hasAttribute("disabled"))return!!a;const r=+a.dataset.card,l=o.find(c=>c.id===r);return!l||n.turn!==s||!$c(l,n)||(l.c===4?(ze=r,t.sfx.pop(),da&&ol(da,t)):(ze=null,t.move({k:"play",id:r}),t.sfx.click())),!0}},_c="#5a3d5c",il=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),V6=`<svg viewBox="0 0 48 48"><path d="M24 42 C8 30 2 22 7 13 C11 6 20 8 24 16 C28 8 37 6 41 13 C46 22 40 30 24 42 Z" fill="#ff4d94" stroke="${_c}" stroke-width="3" stroke-linejoin="round"/><path d="M16 16 Q20 12 22 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`,G6=`<svg viewBox="0 0 48 48"><path d="M24 3 L29 17 H44 L32 26 L37 42 L24 33 L11 42 L16 26 L4 17 H19 Z" fill="#66d9e8" stroke="${_c}" stroke-width="3" stroke-linejoin="round"/><path d="M24 12 L26 18 H22 Z" fill="#fff" opacity=".8"/></svg>`,K6={id:"four",render(e,t){const n=t.table,s=n.view;if(!s||!Array.isArray(s.b)){e.innerHTML="";return}const o=n.you,i=o!==null&&s.turn===o&&n.phase==="play",a=new Set((s.line??[]).map(([$,x])=>$+":"+x)),r=s.last;let l="";for(let $=0;$<7;$++){const x=s.b[$];let f="";for(let b=5;b>=0;b--){const W=b<x.length?x[b]:null,P=a.has($+":"+b)?" hot":"",D=r&&r.col===$&&r.row===b?" just":"";f+=`<span class="fourCell${W===0?" heart":W===1?" star":""}${P}${D}">${W===0?V6:W===1?G6:""}</span>`}const h=i&&x.length<6;l+=`<button type="button" class="fourCol" data-col="${$}" ${h?"":"disabled"} aria-label="Drop in column ${$+1}">${f}<span class="dropHint">${h?"▼":""}</span></button>`}const c=n.phase==="play"&&s.turn>=0,d=c?n.players[s.turn]:"",g=c?i?"Your turn!":`${il(t.name(d))}'s turn`:"",p=o===0?"You are <b>pink hearts</b>":o===1?"You are <b>aqua stars</b>":"Pink hearts and aqua stars",m=$=>$===0?"♥":"★",v=n.players.map(($,x)=>`<div class="playerChip ${s.turn===x?"isTurn":""}"><span class="chipFace">${t.face($)}</span><b>${il(t.name($))} ${m(x)}</b>${t.away($)?'<i class="awayBadge">away</i>':""}</div>`).join("");e.innerHTML=`<div class="fourPlay">
      ${g?`<div class="whose ${i?"yours":""}" id="whoseTurn">${g}</div>`:""}
      <div class="fourChips">${v}</div>
      <p class="fourLegend">${p}</p>
      <div class="fourBoard" id="fourBoard">${l}</div>
    </div>`},handle(e,t){const n=e.closest(".fourCol");if(!n)return!1;const s=t.table.view,o=t.table.you;if(n.hasAttribute("disabled")||!s||o===null||s.turn!==o||t.table.phase!=="play")return!0;const i=+n.dataset.col;return!Number.isInteger(i)||s.b[i].length>=6||(t.move({col:i}),t.sfx.click()),!0}},al={slay:F6,four:K6},ro=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Y6={notHere:"Come into the clubhouse first!",taken:"Someone is sitting there!",playing:"You are already in this game!",playingElsewhere:"Finish your other game first!",notHost:"Waiting for the host…",needMore:"Play with friends on your street",tooMany:"That table is full!",notPlaying:"The game has not started!",notPlayer:"Sit down to play!",illegal:"You can't play that!",notAway:"She is still here!",tooSoon:"Give her a moment!",notSeated:"You are not at this table!",noMove:"No move to play!"};function X6(e){const t=document.getElementById("tableOverlay");let n=null,s="",o=0;const i=f=>f.away==null?0:f.away+Math.max(0,Date.now()-(f.receivedAt??Date.now())),a=()=>{o&&(clearInterval(o),o=0)},r=f=>{const h=!!f&&f.phase==="play"&&f.away!=null&&n!==null;h&&!o&&(o=window.setInterval(()=>g(),1e3)),h||a()},l=()=>e.hood(),c=()=>{const f=l();return!f||n===null?null:f.tables.get(n)??null},d=f=>{const h=l();return{table:f,me:h.pid,name:b=>h.players.get(b)?.nickname??"friend",face:b=>{const W=h.players.get(b)?.look;return W?Ma(We(W)):""},move:b=>h.tbl({op:"move",tb:f.tb,m:b}),away:b=>{if(b===h.pid)return!1;const W=h.players.get(b);if(W&&!W.online)return!0;const P=h.presence.get(b);return!P||P.where!=="gameroom"},toast:e.toast,sfx:e.sfx}};t.addEventListener("click",f=>{const h=f.target;if(h.closest("#tblBack")){m(),e.sfx.swish();return}if(h.closest("#tblLeave")){v();return}if(h.closest("#tblStart")){$();return}if(h.closest("#tblNudge")){x();return}const b=c();b&&al[b.game]?.handle(h,d(b))});function g(){const f=l(),h=c();if(!f||!h){t.classList.add("hidden"),t.innerHTML="",a();return}const b=Ul[h.game],W=f.pid,P=h.seats.includes(W),D=h.seats.filter(Boolean).length,O=h.phase==="play"&&h.you!==null&&h.view&&h.view.turn===h.you,ne=h.view?.winPid??null;let we="";if(h.phase==="over"){const as=ne?f.players.get(ne)?.nickname??"Friend":"";h.game==="slay"?we=ne?ne===W?"You slayed!":`${ro(as)} slayed!`:"It's a tie!":we=h.view?.draw||!ne?"It's a tie!":ne===W?"You got four!":`${ro(as)} got four!`;const mr=h.tb+":"+h.seq;ne===W&&s!==mr&&(s=mr,e.confetti(),e.sfx.sparkle())}const me=i(h),dt=h.phase==="play"&&P&&me>=Qg&&h.you!==null&&!!h.view&&h.view.turn!==h.you&&h.view.turn>=0,je=h.phase!=="play"&&h.host===W&&D>=b.minPlayers&&D<=b.maxPlayers,Wd=P&&h.phase==="lobby"&&h.host!==W&&D>=b.minPlayers,Td=P&&h.phase==="lobby"&&D<b.minPlayers;t.classList.remove("hidden"),t.dataset.tb=String(h.tb),t.dataset.phase=h.phase,t.dataset.game=h.game,t.dataset.you=h.you===null?"":String(h.you),t.innerHTML=`<div class="tblCard ${O?"yourTurn":""} game-${h.game}">
      <div class="tblTop"><h2>${ro(b.name)}</h2><div class="seatDots">${h.seats.map(as=>`<i class="${as?"on":""} ${as===W?"me":""}"></i>`).join("")}</div></div>
      ${we?`<div class="winWrap"><div class="winBanner" id="winBanner">${we}</div></div>`:""}
      <div id="tblStage"></div>
      <div class="tblBar">
        ${je?'<button type="button" id="tblStart">Start</button>':""}
        ${Wd?'<p class="tblWait">Waiting for the host…</p>':""}
        ${dt?'<button type="button" id="tblNudge">Play for her</button>':""}
        <button type="button" id="tblBack">Back to room</button>
        <button type="button" id="tblLeave">Leave table</button>
      </div>
      ${Td?'<p class="tblWait" id="needFriend">Play with friends on your street</p>':""}
    </div>`;const ur=t.querySelector("#tblStage");h.phase==="lobby"||!h.view?ur.innerHTML=p(h,f,W):al[h.game]?.render(ur,d(h)),r(h)}function p(f,h,b){return`<div class="lobby">${f.seats.map((W,P)=>`<div class="lobbySeat ${W?"filled":""} ${W===b?"me":""}">
      <span>${P+1}</span><b>${W?ro(h.players.get(W)?.nickname??"friend"):"Empty"}</b>
      ${W&&W===f.host?"<i>host</i>":""}${W===b?"<i>you</i>":""}
    </div>`).join("")}</div>`}function m(){n=null,a(),t.classList.add("hidden"),t.innerHTML=""}function v(){const f=l(),h=c();f&&h&&h.seats.includes(f.pid)&&f.tbl({op:"leave",tb:h.tb}),e.sfx.click(),m()}function $(){const f=l(),h=c();f&&h&&(f.tbl({op:"start",tb:h.tb}),e.sfx.sparkle())}function x(){const f=l(),h=c();f&&h&&(f.tbl({op:"nudge",tb:h.tb}),e.sfx.click())}return{open(f){n=f,g()},close:m,refresh:g,fail(f,h){e.toast(Y6[h]||"Try that again!"),e.sfx.pop(),n===f&&g()},isOpen:()=>n}}const J6=120,e8=192,t8=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let H=null,Kt=null,Bt=null,rl=!1;const an=()=>(document.getElementById("gameroom")?.clientHeight||600)/Eo,ko=()=>Kt;function ns(){const e=H?.hood();if(!e)return null;for(const[t,n]of e.tables){const s=n.seats.indexOf(e.pid);if(s>=0){const o=js(Number(t))[s];return{tb:Number(t),seat:s,x:o.x,y:o.y}}}return null}function n8(){const e=H?.hood();if(!e)return!1;for(const[t,n]of e.players)if(t!==e.pid&&n.online)return!0;return!1}function s8(e){if(H=e,Kt=X6({hood:e.hood,toast:e.toast,confetti:()=>Nl(),sfx:e.sfx}),rl)return Kt;rl=!0;const t=document.getElementById("grWorld");return t.addEventListener("click",i8),t.addEventListener("pointerdown",n=>{n.target.closest(".grChair, .grTable, .grDoor, .pet")&&n.stopPropagation()}),Kt}function Na(){if(!H)return;const e=an(),t=document.getElementById("grWorld"),n=o=>o*e+"px";t.style.width=oi*e+"px",t.style.height=Eo*e+"px",t.style.setProperty("--sc",String(e));let s=x6();s+=`<button class="grDoor" data-gr="map" aria-label="Back to the map" style="left:${n(78)};top:${n(268)};width:${n(86)};height:${n(170)}"></button>`,Ws.forEach((o,i)=>{const a=o.seats>=6?560:o.seats>=4?440:340;s+=`<button class="grTable" data-tb="${i}" aria-label="${Ul[o.game].name} table" style="left:${n(o.x-a/2)};top:${n(456)};width:${n(a)};height:${n(70)}"></button>`,js(i).forEach((r,l)=>{s+=`<button class="grChair" data-tb="${i}" data-seat="${l}" aria-label="Empty chair" style="left:${n(r.x-38)};top:${n(r.y-16)};width:${n(76)};height:${n(72)}"></button>`})}),s+='<div class="savatars" id="gavatars"></div>',t.innerHTML=s,Ls()}function Ls(){if(!H||H.view()!=="gameroom")return;const e=document.getElementById("gavatars");if(!e)return;const t=an(),n=new Set;for(const i of o8()){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&l8(a));const r=JSON.stringify(i.look)+i.name+(i.away?":away":"");if(a.dataset.look!==r){const p=a.querySelector(".bubble");a.innerHTML=`<div class="inner">${We(i.look)}</div>${i.name?`<div class="nametag">${t8(i.name)}${i.away?'<i class="awayBadge">away</i>':""}</div>`:""}`,p&&a.appendChild(p),a.dataset.look=r}const l=(qs[i.look.size]??1)*t*.95,c=J6*l,d=e8*l,g=i.seated?i.y-8:i.y;a.style.left=i.x*t-c/2+"px",a.style.top=g*t-d+"px",a.style.width=c+"px",a.style.height=d+"px",a.style.zIndex=String(100+Math.round(i.y)),a.classList.toggle("flipped",i.flip),a.classList.toggle("away",i.away),a.classList.toggle("seated",i.seated),Is(a,i.look,i.mine)}e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),H.refreshNear();const s=H.hood();document.querySelectorAll("#grWorld .grChair").forEach(i=>{const a=s?.tables.get(+i.dataset.tb)?.seats[+i.dataset.seat];i.classList.toggle("taken",!!a);const r=a?s.players.get(a)?.nickname:"";i.setAttribute("aria-label",r?r+" is sitting":"Empty chair")});const o=document.getElementById("grSolo");o&&o.classList.toggle("hidden",n8())}function o8(){const e=[],t=H.hood();if(t){const n=new Map;for(const[a,r]of t.tables)r.seats.forEach((l,c)=>{l&&n.set(l,js(Number(a))[c])});const s=[...t.presence.entries()],o=H.myPres();o&&s.push([t.pid,o]);const i=new Set;for(const[a,r]of s){if(r.where!=="gameroom")continue;const l=t.players.get(a);if(!l)continue;i.add(a);const c=n.get(a);e.push({key:a,look:l.look,name:l.nickname,x:c?.x??r.x,y:c?.y??r.y,flip:r.flip,mine:a===t.pid,away:!1,seated:!!c})}for(const[a,r]of n){if(i.has(a))continue;const l=t.players.get(a);l&&e.push({key:a,look:l.look,name:l.nickname,x:r.x,y:r.y,flip:!1,mine:!1,away:!0,seated:!0})}}else{const n=H.solo();if(n?.where==="gameroom"){const s=H.soloLook();e.push({key:"solo",look:s.look,name:"",x:n.x,y:n.y,flip:n.flip,mine:!0,away:!1,seated:!1})}}return e}function i8(e){if(!H||H.view()!=="gameroom")return;const t=e.target,n=t.closest(".savatar");if(n){const c=H.hood(),d=n.dataset.pid;if(c&&d){for(const[g,p]of c.tables)if(p.seats.includes(d)){Kt?.open(Number(g));return}}return}if(t.closest('[data-gr="map"]')){H.goMap();return}const s=t.closest(".grChair");if(s){a8(+s.dataset.tb,+s.dataset.seat);return}const o=t.closest(".grTable");if(o){if(!H.hood()){xc();return}Kt?.open(+o.dataset.tb),H.sfx.click();return}if(t.closest(".pet")||ns())return;const i=document.getElementById("grWorld").getBoundingClientRect(),a=an(),r=(e.clientX-i.left)/a,l=(e.clientY-i.top)/a;l<430||(Bt={x:Math.max(60,Math.min(oi-60,r)),y:Math.max(470,Math.min(590,l))})}function a8(e,t){if(!H)return;const n=H.hood();if(!n){xc();return}const s=n.tables.get(e)?.seats[t];if(s&&s!==n.pid){H.toast((n.players.get(s)?.nickname??"Someone")+" is sitting there!"),H.sfx.pop(),Kt?.open(e);return}Bt=null,n.tbl({op:"sit",tb:e,seat:t});const o=js(e)[t];H.setPres({where:"gameroom",x:o.x,y:Math.max(470,Math.min(590,o.y)),flip:!1}),Kt?.open(e),H.sfx.click()}function xc(){if(!H)return;const e=document.getElementById("grSolo");e&&(e.classList.remove("hidden"),e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),H.toast("Play with friends on your street"),H.sfx.pop()}function r8(e){if(!H||H.view()!=="gameroom"||!Bt)return;if(ns()){Bt=null;return}const t=H.hood()?H.myPres():H.solo();if(!t||t.where!=="gameroom"){Bt=null;return}const n=Bt.x-t.x,s=Bt.y-t.y,o=Math.hypot(n,s);if(o<4){Bt=null;return}const i=Math.min(o,300*e),a={where:"gameroom",x:t.x+n/o*i,y:t.y+s/o*i,flip:Math.abs(n)>2?n<0:t.flip};H.setPres(a);const r=an(),l=document.getElementById("grScroll"),c=a.x*r-l.scrollLeft;(c<l.clientWidth*.22||c>l.clientWidth*.78)&&(l.scrollLeft=a.x*r-l.clientWidth/2)}function l8(e){e.addEventListener("pointerdown",t=>{if(!H||ns())return;const n=H.hood()?H.myPres():H.solo();if(!n||n.where!=="gameroom")return;t.preventDefault(),t.stopPropagation(),Bt=null;const s=an(),o=document.getElementById("grWorld"),i=document.getElementById("grScroll"),a=f=>{const h=o.getBoundingClientRect();return{x:(f.clientX-h.left)/s,y:(f.clientY-h.top)/s}},r=a(t),l={x:n.x-r.x,y:n.y-r.y};let c=t,d=0,g=n.x,p=!1;const m=f=>{const h=H.hood()?H.myPres():H.solo();if(!h||h.where!=="gameroom")return;const b=a(f),W=Math.max(60,Math.min(oi-60,b.x+l.x)),P=Math.max(470,Math.min(590,b.y+l.y));if(!p&&Math.hypot(W-h.x,P-h.y)<6)return;p=!0;const D=Math.abs(W-g)>3?W<g:h.flip;Math.abs(W-g)>3&&(g=W),H.setPres({where:"gameroom",x:W,y:P,flip:D})},v=()=>{const f=i.getBoundingClientRect(),h=c.clientX<f.left+70?-12:c.clientX>f.right-70?12:0;h&&p&&(i.scrollLeft+=h,m(c)),d=requestAnimationFrame(v)};d=requestAnimationFrame(v),e.classList.add("lifted"),H.sfx.pick();const $=f=>{f.pointerId===t.pointerId&&(c=f,m(f))},x=f=>{f.pointerId===t.pointerId&&(cancelAnimationFrame(d),window.removeEventListener("pointermove",$),window.removeEventListener("pointerup",x),e.classList.remove("lifted"),p&&H.sfx.drop())};window.addEventListener("pointermove",$),window.addEventListener("pointerup",x)})}const ys=A6(),F=Tl();let Ie=F;const Mc=[],ll=new WeakSet;function Lc(e){ll.has(e)||(ll.add(e),e.subscribe((t,n)=>{Ie===e&&Mc.forEach(s=>s(t,n))}))}Lc(F);const B={get:()=>Ie.get(),dispatch:e=>Ie.dispatch(e),subscribe:e=>{Mc.push(e)}},le=jt,Ye=ws,hi=390;let ie=1e3;const pi=()=>Math.max(0,le-ie),Cc=375,Bc=(e,t)=>e.wall?Math.min(t,Cc):t,rn=120,kt=192,ja=[{id:"living",name:"Living Room",color:"#ff8fab"},{id:"bedroom",name:"Bedroom",color:"#b388d6"},{id:"kitchen",name:"Kitchen",color:"#5cc985"},{id:"salon",name:"Salon",color:"#f0a0d8"},{id:"nursery",name:"Nursery",color:"#9ad7f5"}],Sc=e=>ja.find(t=>t.id===e)?.color??"#ccc",Yn=[{id:"__people",name:"People",icon:"",kind:"people"},...["furniture","decor","plants","food","pets"].map((e,t)=>({id:e,name:e,icon:["armchair","balloon","flowers","donut","cat"][t],kind:"cat"}))];Yn.push({id:"secrets",name:"Secrets",icon:"egg:chloe-starlamp",kind:"cat"});for(const e of Ht)Yn.some(t=>t.kind==="cat"&&t.id===e.cat)||Yn.push({id:e.cat,name:e.cat,icon:e.kind,kind:"cat"});for(const e of Ht)e.pack&&!Yn.some(t=>t.id==="pack:"+e.pack)&&Yn.push({id:"pack:"+e.pack,name:jl(e.pack),icon:e.kind,kind:"pack"});const Ei=e=>Ht.filter(t=>Z4(t,e,B.get().currentRoom,Za==="all",li())),c8=["#ffd6e0","#d9ccff","#cdf3dc","#cfe8ff","#fff1b8","#ffe0c7","#ffffff","#f6c1ff"],d8=["#e8b98a","#f2d0a4","#c99366","#ffe7a8","#bfe3d0","#d6d6f5","#ffc8dd","#9fb4c7"],ft={paint:'<svg viewBox="0 0 48 48"><path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M28 12 L34 6 L42 14 L36 20" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/></svg>',shirt:'<svg viewBox="0 0 48 48"><path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',soundOn:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 17 Q37 24 32 31 M36 12 Q45 24 36 36" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',soundOff:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ddd" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M33 19 L43 29 M43 19 L33 29" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',flip:'<svg viewBox="0 0 48 48"><path d="M24 6 V42" stroke="#5a3d5c" stroke-width="3" stroke-dasharray="4 4"/><path d="M18 12 L6 36 H18 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M30 12 L42 36 H30 Z" fill="#fff" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',front:'<svg viewBox="0 0 48 48"><rect x="6" y="6" width="22" height="22" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="18" y="18" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',back:'<svg viewBox="0 0 48 48"><rect x="18" y="18" width="24" height="24" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="22" height="22" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',trash:'<svg viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="28" rx="5" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><rect x="8" y="9" width="32" height="7" rx="3.5" fill="#ffadad" stroke="#5a3d5c" stroke-width="3"/><path d="M20 21 V35 M28 21 V35" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>'},g8='<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',Wc='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',f8=document.getElementById("app");f8.innerHTML=`
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round ownOnly" id="btnLock" aria-label="Lock house"></button>
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${Ve.chat}</button>
    <button class="round soloOnly" id="btnHood" aria-label="Friends">${Ve.street}</button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${Ve.home}</button>
    <button class="round streetOnly" id="btnParent" aria-label="Grown-ups">${Ve.shield}</button>
    <button class="round streetOnly" id="btnSolo" aria-label="Play in my own house">${Ve.solo}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${ih}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${m6}</button>
    <button class="round" id="btnPets" aria-label="Pets">${Ol}</button>
    <button class="round" id="btnPaint" aria-label="Colors">${ft.paint}</button>
    <button class="round" id="btnDress" aria-label="Characters">${ft.shirt}</button>
    <button class="round" id="btnSound" aria-label="Sound"></button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${xa}</button>
  </div>
</div>
<div class="stageWrap" id="stageWrap">
  <div class="stage" id="stage">
    <div class="world" id="world">
      <div class="wall" id="wall"></div><div class="floor" id="floor"></div><div class="baseboard"></div>
      <div class="scenery" id="scenery"></div>
      <div class="layer" id="layer"></div>
      <div class="toolbar hidden" id="toolbar">
        <button data-a="flip">${ft.flip}</button><button data-a="front">${ft.front}</button><button data-a="back">${ft.back}</button><button data-a="delete" class="danger">${ft.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <div class="bin" id="bin">${ft.trash}</div>
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
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>`;const _=e=>document.getElementById(e),J=_("stage"),Tc=_("world"),Be=_("layer"),Tt=_("toolbar"),vo=_("bin");let ue=null,de=B.get().characters[0]?.id??null,ot="furniture",Za="",ga="",h8=Date.now()%1e5;const fa=e=>`${e}-${Date.now().toString(36)}${(++h8).toString(36)}${Math.random().toString(36).slice(2,5)}`,Le="__me";let u=null,L="house",re=!1,ge="",zo=new Map,Pc=!1;const nt=Jf(_("modeToggle"),{ownHouse:()=>!u||!ge||ge===u.myHouseId(),onChange:()=>{Pc&&ss()}}),Cs=Zf({send:(e,t,n,s)=>u?.sendMail(e,t,n,s),read:(e,t)=>u?.readMail(e,t),drop:(e,t)=>u?.dropMail(e,t),houseOf:e=>[...u?.players.values()??[]].find(t=>t.pid===e)?.houseId??"",houseName:e=>u?.houses.get(e)?.meta.name??"My House",lettersOf:e=>u?.houses.get(e)?.confirmed.mailbox?.letters??[],mine:e=>!!u&&u.houses.get(e)?.meta.ownerId===u.pid,toast:Q,openOwn:()=>{const e=u?.myHouseId();e&&ed(e)},freeType:()=>!u||Rl(u.settings)});nt.sync(!0);const ks=new Map,Ro={};let Z=es,jn=0;Pc=!0;let Hs=null;const ui=()=>{cancelAnimationFrame(jn),Hs=null},Fa=e=>Math.max(0,Math.min(pi(),e));function Xe(e){Z=Fa(e),Ro[B.get().currentRoom]=Z,Tc.style.transform=`translate3d(${-Z}px,0,0)`,_("nudgeL").classList.toggle("off",Z<=1),_("nudgeR").classList.toggle("off",Z>=pi()-1);const t=_("mmView");t.style.left=Z/le*100+"%",t.style.width=ie/le*100+"%",ue&&Ic(B.get())}function mi(e){cancelAnimationFrame(jn),e=Fa(e),Hs=e;const t=()=>{const n=e-Z;if(Math.abs(n)<.5){Xe(e),Hs=null;return}Xe(Z+n*.18),jn=requestAnimationFrame(t)};jn=requestAnimationFrame(t)}const De=()=>J.getBoundingClientRect().width/ie,p8="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)",Va=window.matchMedia(p8);function u8(){const e=Va.matches;document.body.classList.toggle("phone",e),document.body.classList.toggle("phone-portrait",e&&window.matchMedia("(orientation: portrait)").matches);const t=_("stageWrap");for(const n of[_("nudgeL"),_("nudgeR")]){const s=e?t:J;n.parentElement!==s&&s.appendChild(n)}}function Uc(){const e=document.querySelector(".top");if(!e)return;const t=e.getBoundingClientRect(),n=document.body.classList.contains("phone")?t.bottom:t.height;document.documentElement.style.setProperty("--chrome-h",Math.ceil(n)+"px")}function m8(){const e=document.documentElement,t=document.getElementById("app");if(!(document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait"))){t.style.top="",t.style.height="",t.style.bottom="",e.style.removeProperty("--vvh"),e.style.removeProperty("--vvt");return}const s=window.visualViewport,o=Math.round(s?s.height:window.innerHeight),i=Math.round(s?s.offsetTop:0);e.style.setProperty("--vvh",o+"px"),e.style.setProperty("--vvt",i+"px"),t.style.top=i+"px",t.style.height=o+"px",t.style.bottom="auto"}function ss(){u8(),m8(),Uc();const e=_("stageWrap"),t=document.body.classList.contains("phone"),n=e.clientWidth,s=e.clientHeight;if(t?s>n*.85:s>n+40){const a=n/Math.max(1,s);ie=Math.round(Math.max(480,Math.min(860,Ye*a)))}else if(t){const a=n/Math.max(1,s);ie=Math.round(Math.max(480,Math.min(le,Ye*a)))}else ie=1e3;J.style.width=ie+"px",J.style.height=Ye+"px";const i=Math.min(n/ie,s/Ye);if(J.style.left="",J.style.top="",J.style.transform=`translate(-50%,-50%) scale(${i})`,t&&J.style.setProperty("--fit",String(De())),y8(),Z>pi())Xe(Z);else{const a=_("mmView");a.style.left=Z/le*100+"%",a.style.width=ie/le*100+"%"}be(),!t&&L==="house"&&Zs(!1),_8(),L==="ranch"&&requestAnimationFrame($a),is(),t&&L==="ranch"&&_w(),Hc(),nt.hint()}function y8(){const e=_("stageWrap"),t=document.body.classList.contains("phone")&&L==="house";for(const n of[_("nudgeL"),_("nudgeR")]){if(!t||n.parentElement!==e){n.style.top="",n.style.marginTop="",n.style.left="",n.style.right="";continue}const s=J.getBoundingClientRect(),o=e.getBoundingClientRect(),i=(s.top+s.bottom)/2-o.top;n.style.top=i+"px",n.style.marginTop=-n.offsetHeight/2+"px",n.style.left="",n.style.right=""}}function Hc(){const e=_("secrets"),t=_("stageWrap"),n=document.querySelector(".tools"),s=document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait")&&window.matchMedia("(orientation: landscape) and (max-height: 360px)").matches;if(e.classList.remove("compact"),document.body.classList.remove("secrets-chrome"),e.parentElement!==t&&t.appendChild(e),!s||!n)return;const o=e.getBoundingClientRect().width,i=J.getBoundingClientRect(),a=window.innerWidth-i.right;if(a>=o+2)return;e.classList.add("compact");const r=e.getBoundingClientRect();!(r.left<i.right-.5&&r.right>i.left+.5&&r.top<i.bottom-.5&&r.bottom>i.top+.5)&&a>=44||(document.body.classList.add("secrets-chrome"),e.parentElement!==n&&n.appendChild(e))}function be(e=0){if(!document.body.classList.contains("phone"))return;if(L==="house"){Qc();return}const t=L==="park"?"parkScroll":L==="ranch"?"ranchScroll":L==="gameroom"?"grScroll":"";if(!t)return;const n=document.getElementById(t);if(!n||n.clientWidth<20){e<8&&requestAnimationFrame(()=>be(e+1));return}const s=n.querySelector(".savatar.mine")??n.querySelector(".savatar");if(!s){e<8&&requestAnimationFrame(()=>be(e+1));return}k8(n,[s,...s.querySelectorAll(".nametag")])&&e<8?requestAnimationFrame(()=>be(e+1)):L==="ranch"&&!re&&Bd()}function k8(e,t){const s=e.getBoundingClientRect(),o=Math.min(s.right,window.innerWidth)-8,i=Math.max(s.left,0)+8;let a=0,r=0;for(const c of t){const d=c.getBoundingClientRect();d.width<2||d.height<2||(a=Math.max(a,d.right-o),r=Math.max(r,i-d.left))}if(a<=1&&r<=1)return!1;const l=e.scrollLeft;return a>1&&r>1?e.scrollLeft-=r:a>1?e.scrollLeft+=a:e.scrollLeft-=r,Math.abs(e.scrollLeft-l)>.5}function Qc(){Zs(!1)}function Zs(e){if(L!=="house")return;const t=document.querySelector("#layer .char.avatar.mine")??document.querySelector("#layer .char");if(!t)return;const n=De()||1,s=J.getBoundingClientRect(),o=8;let i=Math.min(s.right,window.innerWidth)-o,a=Math.max(s.left,0)+o;for(const v of["nudgeL","nudgeR"]){const $=_(v);if(!$||$.classList.contains("off")||$.offsetParent===null)continue;const x=$.getBoundingClientRect();x.width<2||x.height<2||(v==="nudgeL"?a=Math.max(a,x.right+6):i=Math.min(i,x.left-6))}i-a<48&&(i=Math.min(s.right,window.innerWidth)-o,a=Math.max(s.left,0)+o);const r=[t,...t.querySelectorAll(".nametag")];let l=0,c=0,d=1/0,g=-1/0;for(const v of r){const $=v.getBoundingClientRect();$.width<2||$.height<2||(l=Math.max(l,$.right-i),c=Math.max(c,a-$.left),d=Math.min(d,$.left),g=Math.max(g,$.right))}if(document.body.classList.contains("phone-portrait")&&d<1/0){const v=(d+g)/2-(a+i)/2;if(Math.abs(v)>3){Xe(Z+v/n);return}}const p=v8(t),m=F4({cam:Z,maxCam:pi(),kidX:p,overflowL:c,overflowR:l,scale:n,nudgeX:e});Math.abs(m.cam-Z)>.5&&Xe(m.cam),e&&Math.abs(m.kidX-p)>.5&&b8(t,m.kidX)}function v8(e){if(e.dataset.pid&&u){const t=e.dataset.pid===u.pid?ae():u.presence.get(e.dataset.pid);if(t&&t.where==="house")return t.x}return B.get().characters.find(t=>t.id===e.dataset.cid)?.x??0}function b8(e,t){if(e.dataset.pid&&u&&e.classList.contains("mine")){const o=ae();if(!o||o.where!=="house")return;Ce({...o,x:t}),sn();return}const n=e.dataset.cid;if(!n)return;const s=B.get().characters.find(o=>o.id===n);s&&B.dispatch({type:"char/move",id:n,room:B.get().currentRoom,x:t,y:s.y})}const w8={living:"Living",bedroom:"Bed",kitchen:"Kitchen",salon:"Salon",nursery:"Nursery"},$8='<svg class="tabIco" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6 L8 1 L15 6 V11 H1 Z" fill="currentColor"/></svg>';function Ec(){return window.matchMedia("(max-width: 900px) and (min-height: 700px)").matches&&!document.body.classList.contains("phone")}function _8(){const e=Ec()?"c":"f";e!==ga&&(ga=e,Oc(B.get()))}window.addEventListener("resize",ss);Va.addEventListener("change",ss);let cl="",zi=!1;function dl(){const e=_("stageWrap"),t=document.querySelector(".top"),n=document.querySelector(".tools"),s=a=>a?a.clientWidth+"x"+a.clientHeight:"0",o=window.visualViewport;return(o?Math.round(o.offsetTop)+"x"+Math.round(o.height)+"x"+Math.round(o.width):"")+" "+s(e)+" "+s(t)+" "+s(n)}function Qs(){if(!(zi||!Va.matches||dl()===cl)){zi=!0;try{ss(),cl=dl()}finally{zi=!1}}}if(typeof ResizeObserver<"u"){const e=new ResizeObserver(()=>Qs()),t=document.querySelector(".top");t&&e.observe(t),e.observe(_("stageWrap"));const n=document.querySelector(".tools");n&&e.observe(n)}window.visualViewport&&(window.visualViewport.addEventListener("resize",()=>Qs()),window.visualViewport.addEventListener("scroll",()=>Qs()));J.addEventListener("scroll",()=>{J.scrollLeft=0,J.scrollTop=0});const vt=(e,t)=>{const n=J.getBoundingClientRect();return{x:(e-n.left)/n.width*ie+Z,y:(t-n.top)/n.height*Ye}},ha=(e,t)=>{const n=J.getBoundingClientRect();return e>n.left&&e<n.right&&t>n.top&&t<n.bottom},gl=(e,t)=>{const n=vo.getBoundingClientRect();return e>n.left-20&&e<n.right+20&&t>n.top-20&&t<n.bottom+20},Fs=e=>qs[e.size]??1;function x8(e,t){const n=Fs(e),s=di(e)[t];let o=s.x;return e.flip&&(o=100-o),{x:e.x+(o-50)/100*rn*n,y:e.y-kt*n+s.y/160*kt*n}}function zc(e){const t=B.get();let n=null;for(const s of t.characters){if(s.room!==t.currentRoom)continue;const o=Fs(s),i=Math.abs(e.x-s.x)<rn*o/2+25&&e.y>s.y-kt*o-25&&e.y<s.y+20;for(const a of["left","right"]){if(s.held[a])continue;const r=x8(s,a),l=Math.hypot(e.x-r.x,e.y-r.y);(i||l<75)&&(!n||l<n.d)&&(n={c:s,hand:a,d:l})}}return n}const Rc=["none","radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)","repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)","linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)"],Ac="repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 125px), linear-gradient(rgba(0,0,0,.06), transparent 50%)",pa=e=>`url('${e.replace(/'/g,"%27")}')`;function Dc(e){const t=e.rooms[e.currentRoom],n=_("wall"),s=_("floor"),o=t.wallTile?Er[t.wallTile]:void 0;n.style.backgroundColor=t.wallpaper,o?(n.style.backgroundImage=pa(o.url),n.style.backgroundSize="220px auto",n.style.backgroundPosition="0 0"):(n.style.backgroundImage=Rc[t.pattern]??"none",n.style.backgroundSize=t.pattern===1?"44px 44px":t.pattern===3?"60px 60px":"auto",n.style.backgroundPosition=t.pattern===3?"0 0, 30px 30px":"0 0");const i=t.floorTile?Er[t.floorTile]:void 0;s.style.backgroundColor=t.floor,s.style.backgroundImage=i?`${pa(i.url)}, linear-gradient(rgba(0,0,0,.06), transparent 50%)`:Ac,s.style.backgroundSize=i?"180px auto, auto":"auto",_("mmWall").style.background=t.wallpaper,_("mmFloor").style.background=t.floor,dc(_("scenery"),e.currentRoom,t.items)}function Ga(e){const n=e.rooms[e.currentRoom].items.filter(o=>Se[o.kind]).map(o=>`<i style="left:${o.x/le*100}%;top:${(o.y-Ge(Se[o.kind])*o.scale/2)/Ye*100}%"></i>`).join(""),s=e.characters.filter(o=>o.room===e.currentRoom).map(o=>`<b style="left:${o.x/le*100}%;top:${(o.y-90)/Ye*100}%;background:${o.shirt}"></b>`).join("");_("mmDots").innerHTML=n+s}function Oc(e){const t=Ec();ga=t?"c":"f",document.body.classList.toggle("tabs-compact",t),_("tabs").innerHTML=ja.map(n=>{const s=t?w8[n.id]??n.name:n.name;return`<button class="tab ${e.currentRoom===n.id?"on":""}" data-room="${n.id}" style="--c:${n.color}" aria-label="${n.name}">${t?$8:""}${s}</button>`}).join("")}function os(e,t,n,s,o){e.style.left=(t-s/2)/le*100+"%",e.style.top=(n-o)/Ye*100+"%",e.style.width=s/le*100+"%",e.style.height=o/Ye*100+"%"}function M8(e,t){let n=e.w*t,s=Ge(e)*t;if((e.kind==="kennel"||e.kind==="cat-tower")&&document.body.classList.contains("phone")){const o=Math.max(.2,De()||1),i=44*le/(Math.max(1,ie)*o),a=44/o;n<i&&(n=i),s<a&&(s=a)}return{w:n,h:s}}function ut(e){const t=e.rooms[e.currentRoom],n=new Set;for(const s of t.items){const o=Se[s.kind];if(!o)continue;n.add(s.id);let i=Be.querySelector(`.item[data-id="${s.id}"]`);i||(i=document.createElement("div"),i.className="item",i.dataset.id=s.id,i.innerHTML=`<div class="inner">${$n(o,!0)}</div>`,Be.appendChild(i),i.addEventListener("pointerdown",r=>S8(i,r))),i.dataset.kind=s.kind;const a=M8(o,s.scale);os(i,s.x,s.y,a.w,a.h),i.style.zIndex=String(1e3+s.z),i.classList.toggle("flipped",s.flip),i.classList.toggle("sel",ue===s.id)}Be.querySelectorAll(".item").forEach(s=>{n.has(s.dataset.id)||s.remove()}),dc(_("scenery"),e.currentRoom,t.items),Ic(e),Ga(e)}const it=new Map;function L8(e){const t=Fs(e),n=rn*t,s=kt*t,o=di(e),i=e.look2?.85:1;return["left","right"].map(a=>{const r=e.held[a],l=r&&Se[r.kind];if(!r||!l)return"";const c=Math.min(.7,120*t/Math.max(l.w,Ge(l))/r.scale)*i,d=l.w*r.scale*c,g=Ge(l)*r.scale*c,p=o[a].x/100*n,m=o[a].y/160*s;return`<div class="held ${r.flip?"flipped":""}" data-hand="${a}" style="left:${(p-d/2)/n*100}%;top:${(m-g*.62)/s*100}%;width:${d/n*100}%;height:${g/s*100}%"><div class="inner">${$n(l)}</div></div>`}).join("")}function Ut(e){const t=e.characters.filter(n=>n.room===e.currentRoom);for(const[n,s]of it)t.some(o=>o.id===n)||(s.remove(),it.delete(n));for(const n of t){let s=it.get(n.id);s||(s=document.createElement("div"),s.className="char",s.dataset.cid=n.id,s.innerHTML='<div class="inner"></div><div class="hands"></div>',Be.appendChild(s),it.set(n.id,s),T8(s));const o=ag(n);s.dataset.look!==o&&(s.querySelector(".inner").innerHTML=We(n),s.dataset.look=o);const i=JSON.stringify([n.held.left?.id,n.held.left?.flip,n.held.right?.id,n.held.right?.flip,n.size]);s.dataset.held!==i&&(s.querySelector(".hands").innerHTML=L8(n),s.dataset.held=i);const a=Fs(n);os(s,n.x,n.y,rn*a,kt*a),s.style.zIndex=String(5e3+Math.round(n.y)),s.classList.toggle("flipped",n.flip),s.classList.toggle("active",n.id===de),Is(s,n,n.id===de);const r=di(n);s.style.setProperty("--hx-l",r.left.x+"%"),s.style.setProperty("--hx-r",r.right.x+"%")}Ga(e)}function Ic(e){const t=ue&&e.rooms[e.currentRoom].items.find(o=>o.id===ue);if(!t||!Se[t.kind]){Tt.classList.add("hidden");return}const n=Se[t.kind],s=t.y-Ge(n)*t.scale-20;Tt.classList.remove("hidden"),Tt.style.left=Math.max(Z+130,Math.min(Z+ie-130,t.x))/le*100+"%",Tt.style.top=Math.max(40,s)/Ye*100+"%"}function qc(e){_("btnSound").innerHTML=e.soundOn?ft.soundOn:ft.soundOff,I4(e.soundOn)}function Cn(){const e=B.get();Be.innerHTML="",it.clear(),Oc(e),Dc(e),ut(e),Ut(e),qc(e);const t=e.characters.find(o=>o.room===e.currentRoom),n=u&&ae(),s=n&&n.where==="house"?n.x:t?.x;ui(),Xe(Ro[e.currentRoom]??Fa(s!==void 0?s-ie/2:es)),sn(),bt(),document.body.classList.contains("phone")&&L==="house"&&requestAnimationFrame(()=>Qc())}B.subscribe((e,t)=>{switch(t.type){case"room/switch":u&&Ie!==F&&E8(t.room),Cn(),qe(),Ld(t.room);break;case"item/add":ut(e),Hw();break;case"game/reset":Cn();break;case"room/wallpaper":case"room/floor":case"room/pattern":case"room/wallTile":case"room/floorTile":Dc(e);break;case"char/update":case"char/move":Ut(e),L==="ranch"?en():L==="park"&&Sn();break;case"char/add":case"char/delete":case"char/hold":case"char/release":ut(e),Ut(e),ot==="__people"&&qe();break;case"settings/sound":qc(e);break;default:ut(e)}});function He(e){if(!e)return;const t=e.querySelector(":scope > .inner")??e;t.classList.remove("bounce"),t.offsetWidth,t.classList.add("bounce")}function Ka(e,t,n=7){const s=_("fx"),o=["#ffd166","#ff8fab","#8ecae6","#80ed99","#c9a0dc"];for(let i=0;i<n;i++){const a=document.createElement("div");a.className="spark";const r=Math.PI*2*i/n+Math.random()*.5,l=40+Math.random()*30;a.style.left=e+"px",a.style.top=t+"px",a.style.background=o[i%o.length],a.style.setProperty("--dx",Math.cos(r)*l+"px"),a.style.setProperty("--dy",Math.sin(r)*l+"px"),s.appendChild(a),setTimeout(()=>a.remove(),650)}}const yi=e=>{const t=e?.getBoundingClientRect();t&&Ka(t.left+t.width/2,t.top+t.height/2)};function Ya(e,t){Ka(e,t,10),M.pop()}function Ao(e){it.forEach((t,n)=>{t.classList.toggle("hold-target",!!e&&e.c.id===n),t.dataset.hand=e&&e.c.id===n?e.hand:""})}function Nc(e,t){B.dispatch({type:"char/hold",id:e.c.id,hand:e.hand,room:e.c.room,itemId:t}),ue=null,ut(B.get());const n=it.get(e.c.id);He(n),yi(n?.querySelector(`.held[data-hand="${e.hand}"]`)),M.sparkle()}const mt=new Map;let lt=!1,Do=0;const Xa=()=>[...mt.values()].reduce((e,t)=>e+t,0)/mt.size;J.addEventListener("pointerdown",e=>{e.pointerType==="touch"&&(mt.set(e.pointerId,e.clientX),mt.size>=2&&(lt=!0,Do=Xa(),ui(),Tt.classList.add("hidden")))},!0);window.addEventListener("pointermove",e=>{if(mt.has(e.pointerId)&&(mt.set(e.pointerId,e.clientX),lt&&mt.size>=2)){const t=Xa();Xe(Z-(t-Do)/De()),Do=t}},!0);const jc=e=>{mt.delete(e.pointerId),mt.size<2&&lt&&(mt.size===0?lt=!1:Do=Xa())};window.addEventListener("pointerup",jc,!0);window.addEventListener("pointercancel",jc,!0);const Rn=80;function C8(e,t){const n=J.getBoundingClientRect();return t<n.top-40||t>n.bottom+10?0:e<n.left+Rn?-Math.min(1,(n.left+Rn-e)/Rn)*16:e>n.right-Rn?Math.min(1,(e-(n.right-Rn))/Rn)*16:0}function Wn(e,t){let n=e,s=0;const o=()=>{const r=lt?0:C8(n.clientX,n.clientY);if(r){const l=Z;Xe(Z+r),Z!==l&&t.onMove(n)}s=requestAnimationFrame(o)};t.edgeScroll!==!1&&(s=requestAnimationFrame(o));const i=r=>{r.pointerId===e.pointerId&&(r.preventDefault(),n=r,lt||t.onMove(r))},a=r=>{r.pointerId===e.pointerId&&(cancelAnimationFrame(s),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",a),t.onUp(r))};window.addEventListener("pointermove",i,{passive:!1}),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a)}function B8(e){return new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,pointerId:e.pointerId,pointerType:e.pointerType,button:e.button,buttons:e.buttons,isPrimary:e.isPrimary})}function S8(e,t){const n=t.target,s=n&&n.closest?n.closest("img.artimg"):null;if(s&&!za(s,t.clientX,t.clientY)){const o=Jb(t.clientX,t.clientY),i=o?.closest(".item"),a=o?.closest(".char");i&&i!==e?(t.stopPropagation(),ua(i,t)):a&&(t.stopPropagation(),a.dispatchEvent(B8(t)));return}ua(e,t)}function ua(e,t,n=!1){if(t.preventDefault(),t.stopPropagation(),lt)return;if(nt.isPlay()){iw(e,e.dataset.id);return}if(!Je()){nn(e);return}const s=B.get(),o=s.currentRoom,i=e.dataset.id,a=s.rooms[o].items.find(p=>p.id===i);if(!a)return;const r=Se[a.kind],l=vt(t.clientX,t.clientY),c={x:a.x-l.x,y:a.y-l.y};let d=n,g=null;ue=i,B.dispatch({type:"item/front",room:o,id:i}),e.classList.add("lifted"),M.pick(),Wn(t,{onMove(p){const m=vt(p.clientX,p.clientY);Math.hypot(m.x-l.x,m.y-l.y)>6&&(d=!0),d&&(Tt.classList.add("hidden"),vo.classList.add("show")),vo.classList.toggle("hot",gl(p.clientX,p.clientY));const v=r.w*a.scale/2;B.dispatch({type:"item/move",room:o,id:i,x:Math.max(v*.6,Math.min(le-v*.6,m.x+c.x)),y:Bc(r,m.y+c.y)}),d&&Tt.classList.add("hidden"),g=d&&r.holdable?zc(m):null,Ao(g)},onUp(p){if(e.classList.remove("lifted"),vo.classList.remove("show","hot"),Ao(null),d&&gl(p.clientX,p.clientY)){ue=null,B.dispatch({type:"item/delete",room:o,id:i}),Ya(p.clientX,p.clientY);return}if(d&&g){Nc(g,i);return}d?(M.drop(),He(e)):(M.click(),dd(i),Y4(e)),ut(B.get())}})}function W8(e,t,n){if(n.preventDefault(),n.stopPropagation(),lt||nt.isPlay())return;const s=e.dataset.cid,o=t.dataset.hand,i=B.get().characters.find(d=>d.id===s),a=i?.held[o];if(!i||!a)return;const r=t.getBoundingClientRect(),l=vt(r.left+r.width/2,r.bottom);B.dispatch({type:"char/release",id:s,hand:o,x:l.x,y:l.y});const c=Be.querySelector(`.item[data-id="${a.id}"]`);c&&ua(c,n,!0)}function T8(e){e.addEventListener("pointerdown",t=>{const n=t.target.closest(".held"),s=n?.querySelector("img.artimg"),o=!!s&&!za(s,t.clientX,t.clientY);if(n&&!o){if(nt.isPlay()){t.preventDefault(),t.stopPropagation();return}if(!Je()){t.stopPropagation(),nn(e);return}return W8(e,n,t)}if(t.preventDefault(),t.stopPropagation(),lt)return;if(!Je()){nn(e);return}ue=null,ut(B.get());const i=e.dataset.cid;de=i;const a=B.get(),r=a.characters.find(p=>p.id===i);if(!r)return;const l=vt(t.clientX,t.clientY),c={x:r.x-l.x,y:r.y-l.y};let d=r.x,g=!1;e.classList.add("lifted"),M.pick(),Ut(B.get()),Wn(t,{onMove(p){const m=vt(p.clientX,p.clientY),v=m.x+c.x;Math.hypot(m.x-l.x,m.y-l.y)>6&&(g=!0);const $=B.get().characters.find(x=>x.id===i);if($){if(Math.abs(v-d)>3){const x=v<d;x!==$.flip&&B.dispatch({type:"char/update",id:i,patch:{flip:x}}),d=v}B.dispatch({type:"char/move",id:i,room:a.currentRoom,x:v,y:Math.max(hi+40,m.y+c.y)}),document.querySelectorAll(".tab").forEach(x=>x.classList.remove("drop")),document.elementFromPoint(p.clientX,p.clientY)?.closest(".tab:not(.on)")?.classList.add("drop")}},onUp(p){e.classList.remove("lifted"),document.querySelectorAll(".tab").forEach($=>$.classList.remove("drop"));const m=document.elementFromPoint(p.clientX,p.clientY)?.closest("[data-room]"),v=B.get().characters.find($=>$.id===i);if(g&&v&&m&&m.dataset.room!==a.currentRoom){const $=m.getBoundingClientRect();Ka($.left+$.width/2,$.top+$.height/2,9),M.swish(),B.dispatch({type:"char/move",id:i,room:m.dataset.room,x:v.x,y:v.y});return}M.drop(),He(e),g&&requestAnimationFrame(()=>Zs(!0))}})})}function P8(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),nt.isPlay()){n.stopPropagation();return}if(!Je()){nn(e);return}const s=document.createElement("div");s.className="ghost",s.innerHTML=$n(t),document.body.appendChild(s);const o=Math.max(1,60/(Math.max(t.w,Ge(t))*De())),i=t.w*De()*o,a=Ge(t)*De()*o;s.style.width=i+"px",s.style.height=a+"px";let r=null;const l=g=>{s.style.left=g.clientX-i/2+"px",s.style.top=g.clientY-a*.8+"px",r=t.holdable&&ha(g.clientX,g.clientY)?zc(vt(g.clientX,g.clientY)):null,Ao(r)};l(n),M.pick(),e.classList.add("pressed");const c=n.clientX,d=n.clientY;Wn(n,{onMove:l,onUp(g){s.remove(),e.classList.remove("pressed"),Ao(null);const p=B.get().currentRoom,m=Math.hypot(g.clientX-c,g.clientY-d)<8;let v,$;if(m)v=Z+380+Math.random()*240,$=t.wall?Math.min(Cc,200+Ge(t)/2):500+Math.random()*40;else if(ha(g.clientX,g.clientY)){const h=vt(g.clientX,g.clientY);v=h.x,$=Bc(t,h.y+Ge(t)*.2)}else return;const x={id:fa(t.kind.replace(/[^a-z0-9-]/gi,"")),kind:t.kind,x:v,y:$,flip:!1,z:0,scale:1};if(B.get().rooms[p].items.length===0){const h=n6(b=>fa(b));for(let b=0;b<h.length;b++)B.dispatch({type:"item/add",room:p,item:h[b]})}if(B.dispatch({type:"item/add",room:p,item:x}),!m&&r){Nc(r,x.id);return}ue=x.id,ut(B.get());const f=Be.querySelector(`.item[data-id="${x.id}"]`);He(f),yi(f),M.sparkle()}})})}function U8(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),nt.isPlay())return;if(!Je()){nn(e);return}const s=B.get().characters.find(p=>p.id===t);if(!s)return;const o=Fs(s),i=rn*o*De(),a=kt*o*De(),r=document.createElement("div");r.className="ghost",r.innerHTML=We(s),r.style.width=i+"px",r.style.height=a+"px",document.body.appendChild(r);const l=p=>{r.style.left=p.clientX-i/2+"px",r.style.top=p.clientY-a*.85+"px"},c=n.clientX,d=n.clientY;let g=!1;r.style.visibility="hidden",Wn(n,{onMove(p){Math.hypot(p.clientX-c,p.clientY-d)>8&&(g=!0,r.style.visibility=""),l(p)},onUp(p){if(r.remove(),!g){M.click(),de=t,Xn("dress");return}if(!ha(p.clientX,p.clientY))return;const m=vt(p.clientX,p.clientY),v=B.get().currentRoom;B.dispatch({type:"char/move",id:t,room:v,x:m.x,y:Math.max(hi+40,m.y+kt*o*.15)}),de=t,Ut(B.get());const $=it.get(t);He($),yi($),M.sparkle()}})})}function Zc(){if(!Je())return nn(null),null;const e=B.get();if(e.characters.length>=ts)return null;const t=fa("c"),n=ni();B.dispatch({type:"char/add",char:tn({id:t,...ti(n),look2:n,room:e.currentRoom,x:Z+300+Math.random()*400,y:520+Math.random()*40})}),de=t,Ut(B.get());const s=it.get(t);return He(s),yi(s),M.sparkle(),t}function H8(){return Za==="all"?"all":B.get().currentRoom}function qe(){const e=B.get().currentRoom,t=H8(),n=ja.find(l=>l.id===e)?.name??"This room",s=t==="all";_("roomFilter").innerHTML=`<button class="rf ${s?"on":""}" data-rf="${s?"room":"all"}">${s?"Just "+n:"All rooms"}</button>`;const o=Ei("secrets").length>0,i=Yn.filter(l=>l.id!=="secrets"&&(l.kind==="people"||l.kind==="pack"||Ei(l.id).length));!(ot==="secrets"&&o)&&!i.some(l=>l.id===ot)&&(ot=i[1]?.id??"__people"),_("cats").innerHTML=i.map(l=>`<button class="cat ${l.kind} ${l.id===ot?"on":""}" data-cat="${l.id}" aria-label="${l.name}" title="${l.name}">${l.kind==="people"?g8:l.kind==="pack"?`<span class="packicon">${$n(Se[l.icon])}</span><span class="packname">${l.name}</span>`:$n(Se[l.icon])}</button>`).join("")+(o?`<button class="cat secretTab ${ot==="secrets"?"on":""}" data-cat="secrets" aria-label="Secrets" title="Secrets">🎁</button>`:"");const a=_("shelf");if(a.innerHTML="",!Je()){a.innerHTML='<div class="empty locked">🔒 This house is look-only right now</div>';return}if(ot==="__people"){const l=B.get(),c=Bn();if(c){const d=document.createElement("button");d.className="thing person me",d.setAttribute("aria-label","Me"),d.innerHTML=`<div class="face">${We(c)}</div><span class="meStar">★</span>`,d.addEventListener("click",()=>{M.click(),de=Le,Xn("dress")}),a.appendChild(d)}for(const d of l.characters){const g=document.createElement("button");g.className="thing person",g.setAttribute("aria-label","Character"),g.innerHTML=`<div class="face">${We(d)}</div><span class="where" style="background:${Sc(d.room)}"></span>`,a.appendChild(g),U8(g,d.id)}if(l.characters.length<ts){const d=document.createElement("button");d.className="thing add",d.setAttribute("aria-label","New character"),d.innerHTML=Wc,d.addEventListener("click",()=>{Zc()&&(qe(),Xn("dress"))}),a.appendChild(d)}return}const r=Ei(ot);r.length||(a.innerHTML='<div class="empty">Nothing here yet!</div>');for(const l of r){const c=document.createElement("button");c.className="thing",c.setAttribute("aria-label",l.name),c.innerHTML=$n(l),a.appendChild(c),P8(c,l)}a.scrollLeft=0,Ja()}function Ja(){const e=document.querySelector(".drawerTop"),t=document.getElementById("drawerBar");!e||!t||t.classList.toggle("more",e.scrollWidth-e.clientWidth-e.scrollLeft>6)}document.querySelector(".drawerTop").addEventListener("scroll",Ja,{passive:!0});window.addEventListener("resize",Ja);function fl(e,t,n){return`<div class="sw">${e.map(s=>`<button class="dot ${s===t?"on":""}" style="background:${s}" data-act="${n}" data-v="${s}"></button>`).join("")}</div>`}let Es=null,On=!1;function Q8(e){if(e===Le){const n=Bn();if(!n||n.look2)return;It(Le,Mo(xo(n)));return}const t=B.get().characters.find(n=>n.id===e);!t||t.look2||It(e,{...Mo(xo(t)),size:t.size})}function Mt(){const e=B.get(),t=_("card");if(Es==="paint"){t.classList.remove("avCard");const n=e.rooms[e.currentRoom],s=ea.filter(a=>a.kind==="wallpaper"),o=ea.filter(a=>a.kind==="floor"),i=(a,r,l,c)=>`<button class="dot pat tile ${a.id===r?"on":""}" data-act="${l}" data-v="${a.id}" title="${a.name} (${jl(a.pack)})" style="background-color:${c};background-image:${pa(a.url)};background-size:48px auto"></button>`;t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${fl(c8,n.wallpaper,"wall")}
      <h3>Wallpaper</h3><div class="sw">${Rc.map((a,r)=>`<button class="dot pat ${!n.wallTile&&r===n.pattern?"on":""}" data-act="pat" data-v="${r}" style="background-color:${n.wallpaper};background-image:${a};background-size:${r===1?"16px 16px":r===3?"20px 20px":"auto"}"></button>`).join("")}${s.map(a=>i(a,n.wallTile,"wtile",n.wallpaper)).join("")}</div>
      <h3>Floor</h3>${fl(d8,n.floor,"floor")}
      ${o.length?`<h3>Floor style</h3><div class="sw"><button class="dot pat ${n.floorTile?"":"on"}" data-act="ftile" data-v="" style="background-color:${n.floor};background-image:${Ac}"></button>${o.map(a=>i(a,n.floorTile,"ftile",n.floor)).join("")}</div>`:""}`}else if(Es==="dress"){t.classList.add("avCard");let n=e,s=Bn(),o=s?tn({id:Le,...s}):null,i=de===Le&&o?o:n.characters.find(r=>r.id===de)??o??n.characters[0];i&&!i.look2&&Q8(i.id),n=B.get(),s=Bn(),o=s?tn({id:Le,...s}):null,i=de===Le&&o?o:n.characters.find(r=>r.id===de)??o??n.characters[0];const a=`<div class="picker">${o?`<button class="pk me ${i?.id===Le?"on":""}" data-act="pickc" data-v="${Le}"><div class="face">${We(o)}</div><span class="meStar">★</span></button>`:""}${n.characters.map(r=>`<button class="pk ${r.id===i?.id?"on":""}" data-act="pickc" data-v="${r.id}"><div class="face">${We(r)}</div><span class="where" style="background:${Sc(r.room)}"></span></button>`).join("")}${n.characters.length<ts?`<button class="pk add" data-act="newc">${Wc}</button>`:""}</div>`;if(!i){t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${a}<div class="dress"><p class="hint">Tap + to make someone new!</p></div>`;return}de=i.id,t.innerHTML=z4(i,a,On,ft.trash)}}function Xn(e){Es=e,On=!1,Mt(),_("sheet").classList.remove("hidden"),M.swish()}_("sheet").addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(e.target===_("sheet")||t?.dataset.act==="close"){_("sheet").classList.add("hidden"),Es=null,M.click(),ot==="__people"&&qe();return}if(!t)return;const n=B.get(),s=n.currentRoom,o=t.dataset.v,i=de??"",a=t.dataset.act;if(a!=="delc"&&(On=!1),a&&a.indexOf("av-")===0){const r=i===Le?Bn():B.get().characters.find(d=>d.id===i);if(a==="av-surprise"){It(i,{...Mo(ni()),size:r?.size??"kid"}),M.sparkle(),Mt(),He(document.querySelector(".avStage"));return}const l=r?.look2??xo(r??{}),c=R4(l,a,o??"");if(!c){M.click(),Mt();return}It(i,{...Mo(c),size:r?.size??"kid"}),M.sparkle(),Mt(),He(document.querySelector(".avStage"));return}switch(a){case"wall":B.dispatch({type:"room/wallpaper",room:s,color:o});break;case"floor":B.dispatch({type:"room/floor",room:s,color:o});break;case"pat":B.dispatch({type:"room/pattern",room:s,pattern:+o});break;case"wtile":B.dispatch({type:"room/wallTile",room:s,tile:o});break;case"ftile":B.dispatch({type:"room/floorTile",room:s,tile:o||null});break;case"skin":case"hair":case"shirt":case"pants":It(i,{[a]:o});break;case"hs":It(i,{hairStyle:+o});break;case"acc":It(i,{acc:+o});break;case"size":{const r=i===Le?Bn():B.get().characters.find(l=>l.id===i);It(i,{size:o,...r?.look2?{look2:r.look2}:{}}),Ut(B.get());break}case"pickc":de=o,Ut(B.get()),M.click(),Mt();return;case"newc":if(!Zc())return;break;case"delc":if(i===Le||!Je())return;if(!On){On=!0,M.click(),Mt();return}On=!1;{const l=it.get(i)?.getBoundingClientRect();B.dispatch({type:"char/delete",id:i}),l?Ya(l.left+l.width/2,l.top+l.height/2):M.pop()}de=B.get().characters[0]?.id??null,Mt();return}M.sparkle(),Mt(),He(document.querySelector(".preview"))});_("tabs").addEventListener("click",e=>{const t=e.target.closest("[data-room]");if(!t)return;const n=t.dataset.room;n!==B.get().currentRoom&&(ue=null,M.swish(),J.classList.remove("swap"),J.offsetWidth,J.classList.add("swap"),B.dispatch({type:"room/switch",room:n}))});_("cats").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");t&&(ot=t.dataset.cat,M.click(),qe())});_("roomFilter").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");if(t){ot=t.dataset.cat,M.click(),qe();return}const n=e.target.closest("[data-rf]");n&&(Za=n.dataset.rf==="all"?"all":"",M.click(),qe())});Tt.addEventListener("pointerdown",e=>e.stopPropagation());Tt.addEventListener("click",e=>{const t=e.target.closest("[data-a]");if(!t||!ue)return;if(!Je()){nn(null);return}const n=B.get().currentRoom,s=ue,o=Be.querySelector(`.item[data-id="${s}"]`);switch(t.dataset.a){case"flip":B.dispatch({type:"item/flip",room:n,id:s}),M.swish(),He(o);break;case"front":B.dispatch({type:"item/front",room:n,id:s}),M.click(),He(o);break;case"back":B.dispatch({type:"item/back",room:n,id:s}),M.click(),He(o);break;case"delete":{const i=o?.getBoundingClientRect();ue=null,B.dispatch({type:"item/delete",room:n,id:s}),i&&Ya(i.left+i.width/2,i.top+i.height/2);break}}});J.addEventListener("pointerdown",e=>{if(e.target.closest(".nudge"))return;ui();const t=e.clientX,n=Z;let s=!1,o=0,i=e.clientX,a=performance.now();Wn(e,{edgeScroll:!1,onMove(r){if(Math.abs(r.clientX-t)>6&&(s=!0),!s)return;const l=performance.now();o=(r.clientX-i)/Math.max(1,l-a),i=r.clientX,a=l,Xe(n-(r.clientX-t)/De())},onUp(){if(!s){ue&&(ue=null,ut(B.get()));return}if(lt)return;let r=-o*16/De();const l=()=>{Math.abs(r)<.3||(Xe(Z+r),r*=.92,jn=requestAnimationFrame(l))};jn=requestAnimationFrame(l)}})});J.addEventListener("wheel",e=>{e.preventDefault(),ui(),Xe(Z+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/De())},{passive:!1});_("nudgeL").addEventListener("pointerdown",e=>{e.stopPropagation(),M.swish(),mi((Hs??Z)-ie*.6)});_("nudgeR").addEventListener("pointerdown",e=>{e.stopPropagation(),M.swish(),mi((Hs??Z)+ie*.6)});const hl=_("minimap");hl.addEventListener("pointerdown",e=>{e.stopPropagation(),e.preventDefault();const t=n=>{const s=hl.getBoundingClientRect();mi((n.clientX-s.left)/s.width*le-ie/2)};t(e),M.click(),Wn(e,{edgeScroll:!1,onMove:t,onUp(){}})});_("btnPaint").addEventListener("click",()=>{if(!Je())return nn(null);Xn("paint")});_("btnDress").addEventListener("click",()=>Xn("dress"));_("btnSound").addEventListener("click",()=>{B.dispatch({type:"settings/sound",on:!B.get().soundOn}),M.click()});document.addEventListener("gesturestart",e=>e.preventDefault());document.addEventListener("contextmenu",e=>e.preventDefault());"serviceWorker"in navigator&&navigator.serviceWorker.register("/kids-house-game/sw.js");window.__store=B;window.__items=Object.fromEntries(Ht.filter(e=>e.img).map(e=>[e.kind,{w:e.w,h:Ge(e),cat:e.cat,holdable:e.holdable,svg:e.img.includes(".svg")}]));window.__cam={get:()=>Z,set:Xe};window.__phoneShowKids=()=>be();window.__avatar={richAvatars:Da,randomLook2:ni,look2FromLegacy:xo,legacyFromLook2:ti,sanitizeLook2:As,handsFor:di};window.__frameHouseKid=()=>Zs(!0);window.__layoutNameTags=()=>lc();const j=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Je(){return!u||Ie===F||u.canEdit(ge)}function nn(e){M.pop();const t=_("houseTag");t.classList.remove("wiggle"),t.offsetWidth,t.classList.add("wiggle"),e&&(e.classList.remove("nope"),e.offsetWidth,e.classList.add("nope")),Q("🔒 Look-only house: ask the owner to unlock it!",1800)}const ae=()=>u?.myPresence()??null,Bn=()=>u?u.players.get(u.pid)?.look??null:null;function It(e,t){if(e===Le){const n=Bn();if(!n||!u)return;u.setLook(Os({...n,...t})),sn(),L==="street"&&Oo(),L==="park"&&Sn(),L==="ranch"&&en();return}B.dispatch({type:"char/update",id:e,patch:t})}function Ce(e){u?.setPresence(e)}function E8(e){const t=ae();t&&t.where==="house"&&Ce({...t,room:e})}function Fc(e){Ie=e,Lc(e),ue=null,setTimeout(()=>Sd.update());for(const t of Object.keys(Ro))delete Ro[t];de=e===F?e.get().characters[0]?.id??null:Le,Cn(),qe()}function er(e,t){return`<div class="inner">${We(e)}</div><div class="nametag">${j(t)}</div>`}function sn(){const e=new Set;if(u&&Ie!==F&&L==="house"){const t=B.get().currentRoom,n=[...u.presence.entries()],s=ae();s&&n.push([u.pid,s]);for(const[o,i]of n){const a=u.players.get(o);if(!a||i.where!=="house"||i.houseId!==ge||i.room!==t)continue;e.add(o);let r=ks.get(o);(!r||!r.isConnected)&&(r=document.createElement("div"),r.className="char avatar "+(o===u.pid?"mine":"other"),r.dataset.pid=o,Be.appendChild(r),ks.set(o,r),o===u.pid&&z8(r));const l=a.look,c=JSON.stringify(l)+a.nickname;if(r.dataset.look!==c){const g=r.querySelector(".bubble");r.innerHTML=er(l,a.nickname),g&&r.appendChild(g),r.dataset.look=c}const d=qs[l.size]??1;os(r,i.x,i.y,rn*d,kt*d),r.style.zIndex=String(5e3+Math.round(i.y)),r.classList.toggle("flipped",i.flip),Is(r,l,o===u.pid)}}for(const[t,n]of ks)(!e.has(t)||!n.isConnected)&&(e.has(t)||n.remove(),ks.delete(t));Tn()}function z8(e){e.addEventListener("pointerdown",t=>{if(t.preventDefault(),t.stopPropagation(),lt||!u)return;const n=ae();if(!n||n.where!=="house")return;const s=vt(t.clientX,t.clientY),o={x:n.x-s.x,y:n.y-s.y};let i=n.x;e.classList.add("lifted"),M.pick(),Wn(t,{onMove(a){const r=vt(a.clientX,a.clientY),l=ae();if(!l||l.where!=="house")return;const c=Math.max(40,Math.min(le-40,r.x+o.x)),d=Math.max(hi+40,Math.min(Ye,r.y+o.y)),g=Math.abs(c-i)>3?c<i:l.flip;Math.abs(c-i)>3&&(i=c),Ce({...l,x:c,y:d,flip:g}),sn(),Ga(B.get())},onUp(){e.classList.remove("lifted"),M.drop(),He(e),requestAnimationFrame(()=>Zs(!0))}})})}function R8(e){return e.kind==="text"?e.v:(e.kind==="phrase"?$s:Hl)[e.v]??""}function is(){const e=document.querySelectorAll(".bubble");if(!document.body.classList.contains("phone")){e.forEach(s=>{(s.style.marginLeft||s.style.marginTop)&&(s.style.marginLeft="",s.style.marginTop="")});return}const t=J.getBoundingClientRect(),n=De()||1;e.forEach(s=>{s.style.marginLeft="0px",s.style.marginTop="0px";const o=s.getBoundingClientRect();let i=0;o.width>=t.width-8||o.left<t.left+4?i=t.left+4-o.left:o.right>t.right-4&&(i=t.right-4-o.right);let a=0;o.top<t.top+4?a=t.top+4-o.top:o.bottom>t.bottom-4&&(a=t.bottom-4-o.bottom),i&&(s.style.marginLeft=i/n+"px"),a&&(s.style.marginTop=a/n+"px")})}function A8(e,t){const n=L==="street"?document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`):L==="park"?document.querySelector(`#pavatars .savatar[data-pid="${e}"]`):L==="ranch"?document.querySelector(`#ravatars .savatar[data-pid="${e}"]`):L==="gameroom"?document.querySelector(`#gavatars .savatar[data-pid="${e}"]`):ks.get(e),s=n?[n]:[];for(const o of s){o.querySelector(".bubble")?.remove();const i=document.createElement("div");i.className="bubble"+(t.kind==="emote"?" emote":""),i.textContent=R8(t),o.appendChild(i),is(),setTimeout(()=>i.classList.add("out"),4600),setTimeout(()=>i.remove(),5e3)}e!==u?.pid&&M.click()}function tr(){const e=ae();if(!u||!e)return 0;let t=0;return u.presence.forEach(n=>{Uf(e,n)&&t++}),t}function Tn(){const e=tr();_("btnChat").classList.toggle("glow",e>0);const t=document.getElementById("chatNear");t&&(t.textContent=e?`${e} friend${e>1?"s":""} nearby can hear you`:"Walk closer to a friend to talk!",_("chatTray").classList.toggle("nobody",!e))}function Vc(){const e=_("chatTray");if(!u)return;e.innerHTML=`<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${Hl.map((n,s)=>`<button data-emote="${s}">${n}</button>`).join("")}</div>
    <div class="phrases">${$s.map((n,s)=>`<button data-phrase="${s}">${j(n)}</button>`).join("")}</div>
    ${u.settings.freeChat?`<form class="typed" id="chatForm"><input id="chatInput" maxlength="${Ha}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>`:'<div class="presetsOnly">Picking from the bubbles above 💬</div>'}`,Tn(),document.getElementById("chatForm")?.addEventListener("submit",n=>{n.preventDefault();const s=_("chatInput"),o=bf(s.value);if(!o.ok){_("chatWarn").textContent=ii[o.reason]??"",M.pop();return}if(!tr()){Q("Walk closer to a friend to talk!");return}u.say({kind:"text",v:o.text}),s.value="",_("chatWarn").textContent="",s.blur()})}_("chatTray").addEventListener("click",e=>{const t=e.target;if(!u)return;if(t.closest('[data-chat="close"]')){_("chatTray").classList.add("hidden");return}const n=t.closest("[data-emote]"),s=t.closest("[data-phrase]");if(!(!n&&!s)){if(!tr()){Q("Walk closer to a friend to talk!");return}u.say(n?{kind:"emote",v:+n.dataset.emote}:{kind:"phrase",v:+s.dataset.phrase}),M.click()}});_("btnChat").addEventListener("click",()=>{_("chatTray").classList.toggle("hidden")||(Vc(),M.swish())});function bt(){const e=document.body.classList,n=!!u&&Ie!==F&&L==="house"?u.houses.get(ge):void 0,s=!!n&&n.meta.ownerId===u.pid;if(e.toggle("mode-hood",!!u),e.toggle("view-street",L!=="house"),e.toggle("view-park",L==="park"),e.toggle("view-ranch",L==="ranch"),e.toggle("view-map",L==="street"),e.toggle("view-gameroom",L==="gameroom"),e.toggle("in-barn",L==="ranch"&&re),e.toggle("mode-play",L==="house"&&nt.isPlay()),pr(),Jc(),e.toggle("own-house",s),e.toggle("locked",!!n&&!Je()),e.toggle("has-hood",!!ai()),n){const o=u.players.get(n.meta.ownerId)?.nickname??"";_("houseTag").innerHTML=`${n.meta.locked?"🔒 ":""}<b>${j(n.meta.name)}</b>${s?" · yours":o?" · "+j(o):""}`,_("btnLock").innerHTML=n.meta.locked?Ve.lockOn:Ve.lockOff,_("btnLock").setAttribute("aria-label",n.meta.locked?"Unlock house":"Lock house")}Tn(),document.body.classList.contains("phone")&&Uc()}_("btnLock").addEventListener("click",()=>{const e=u?.houses.get(ge);!e||e.meta.ownerId!==u.pid||(u.lock(e.meta.id,!e.meta.locked),M.click(),Q(e.meta.locked?"Unlocked: friends can decorate!":"Locked: friends can look but not change things"))});const un=new Map;let pl="",ma=0;function Gc(){const e=_("street");return Math.min(e.clientWidth/Re,e.clientHeight/yt)}function D8(){return u?[...u.houses.values()].map(e=>e.meta).sort((e,t)=>e.slot-t.slot):[]}function wn(e=!1){if(L!=="street")return;const t=Gc(),n=_("mapWorld"),s=D8(),o=t.toFixed(3)+JSON.stringify(s)+(u?s.map(f=>(u.players.get(f.ownerId)?.online?1:0)+(ka(f.id)?"u":"")).join("")+u.pid:"solo");if(!e&&o===pl&&n.querySelector("#mapFaces")){Oo();return}pl=o,n.style.width=Re*t+"px",n.style.height=yt*t+"px",n.style.setProperty("--sc",String(t)),n.innerHTML=Hd();const i=n.querySelector("#mapRoad"),a=i.getTotalLength(),r=Array.from({length:160},(f,h)=>i.getPointAtLength(a*h/159)),l=(f,h)=>r.some(b=>Math.hypot(b.x-f,b.y-h)<50),c=f=>f*t+"px",d=ya();un.clear();const g=u?s.map(f=>({id:f.id,name:f.name,style:f.style,locked:f.locked,mine:f.ownerId===u.pid,lit:!!u.players.get(f.ownerId)?.online})):ma?Array.from({length:ma},(f,h)=>({id:"fake"+h,name:["Reagan","Quinn","Chloe","Sloane","Cada","Emma","Olivia","Charlotte","Amelia","Sophia","Isabella","Mia"][h%12]+"'s House",style:h,locked:h===3,mine:h===0,lit:h%3!==1})):[null],p=g.length,m=p>8?80:94,v=m*300/320;let $="";const x=Kc(i,p,d);g.forEach((f,h)=>{const b=x[h],W=f?`house:${f.id}`:"home",P=f?f.name:"My House";un.set(f?"house:"+f.id:"home",{x:b.x,y:b.y-v/2-4});const D=!!(f&&ka(f.id)),O=34,ne=40,we=Math.max(4,Math.min(Re-O-4,b.x+m*.28)),me=Math.max(4,Math.min(yt-ne-4,b.y+v*.28));$+=`<button class="mapSpot mapHouse ${f?.mine||!f?"mine":""}" data-go="${W}" aria-label="${j(P)}" style="left:${c(b.x-m/2)};top:${c(b.y-v/2)};width:${c(m)};height:${c(v)}">${Ji(f?f.style:0,{lit:f?f.lit:!0})}${f?.locked?'<span class="lockBadge">🔒</span>':""}${f?.mine||!f?'<span class="homeBadge">★</span>':""}</button>
      <button class="mapMail ${D?"up":""}" data-mail="${f?f.id:"home"}" aria-label="${j(P)} mailbox" style="left:${c(we)};top:${c(me)};width:${c(O)};height:${c(ne)}">${If(D)}</button>
      <div class="mapSign ${f?.mine||!f?"mine":""} ${b.x>Re-130?"edgeR":b.x<130?"edgeL":""}" style="left:${c(b.x>Re-130?Re-8:b.x<130?8:b.x)};top:${c(b.y+v/2-2)}">${j(P)}</div>`}),$+=`<button class="mapSpot mapPark" data-go="park" aria-label="The park" style="left:${c(Dt.x-100)};top:${c(Dt.y-85)};width:${c(200)};height:${c(170)}">${Ed}</button><div class="mapSign place" style="left:${c(Dt.x)};top:${c(Dt.y+70)}">Park</div>`,$+=`<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${c(gt.x-110)};top:${c(gt.y-90)};width:${c(220)};height:${c(180)}">${zd}</button><div class="mapSign place" style="left:${c(gt.x)};top:${c(gt.y+78)}">Rainbow Ranch</div>`,$+=`<button class="mapSpot mapClub" data-go="gameroom" aria-label="The clubhouse" style="left:${c(Ot.x-95)};top:${c(Ot.y-78)};width:${c(190)};height:${c(156)}">${Rd}</button><div class="mapSign place" style="left:${c(Ot.x)};top:${c(Ot.y+82)}">Clubhouse</div>`,un.set("park",{x:Dt.x,y:Dt.y-60}),un.set("ranch",{x:gt.x-30,y:gt.y-60}),un.set("barn",{x:gt.x+10,y:gt.y+10}),un.set("gameroom",{x:Ot.x,y:Ot.y-52}),n.insertAdjacentHTML("beforeend",Qd(d,l)+$+'<div class="mapFaces" id="mapFaces"></div>'),Oo()}const ya=()=>[{x:Dt.x,y:Dt.y,r:115},{x:gt.x,y:gt.y,r:125},{x:qt.x,y:qt.y,r:100},{x:Ot.x,y:Ot.y,r:90}];function Kc(e,t,n){const s=e.getTotalLength(),o=[];for(let i=0;i<t;i++){const a=t===1?.2:.05+.75*i/(t-1),r=e.getPointAtLength(s*a),l=e.getPointAtLength(Math.min(s,s*a+3));let c=-(l.y-r.y),d=l.x-r.x;const g=Math.hypot(c,d)||1;c/=g,d/=g;const p=[1,-1].map($=>({x:r.x+c*72*$,y:r.y+d*72*$})).map($=>({...$,score:Math.min(...n.map(x=>Math.hypot(x.x-$.x,x.y-$.y)-x.r),$.x-50,Re-50-$.x,$.y-60,yt-40-$.y)})),m=i%2?p:[p[1],p[0]],v=m[0].score>0||m[0].score>=m[1].score?m[0]:m[1];v.x=Math.max(60,Math.min(Re-60,v.x)),v.y=Math.max(62,Math.min(yt-72,v.y)),n.push({x:v.x,y:v.y,r:70}),o.push({x:v.x,y:v.y})}return o}window.__mapFake=e=>{ma=e,wn(!0)};window.__mapLayout=e=>{const t=document.querySelector("#mapRoad");if(!t)return null;const n=Kc(t,e,ya());let s=1e9,o=1e9,i=!0;return n.forEach((a,r)=>{n.forEach((l,c)=>{c>r&&(s=Math.min(s,Math.hypot(a.x-l.x,a.y-l.y)))}),ya().forEach(l=>{o=Math.min(o,Math.hypot(a.x-l.x,a.y-l.y)-l.r)}),(a.x<55||a.x>Re-55||a.y<60||a.y>yt-70)&&(i=!1)}),{n:e,minHouse:s,minSpot:o,inside:i}};function Yc(e){return e.where==="house"&&e.houseId?{kind:"house",houseId:e.houseId,room:e.room}:e.where==="park"||e.where==="ranch"||e.where==="barn"||e.where==="gameroom"?{kind:e.where}:{kind:"square"}}const O8=e=>e.kind==="house"?"house:"+e.houseId:e.kind;function Oo(){const e=document.getElementById("mapFaces");if(!e||L!=="street")return;const t=Gc(),n=new Set,s=[];if(u){const i=[...u.presence.entries()],a=ae();a&&i.push([u.pid,a]);for(const[r,l]of i){const c=u.players.get(r);c&&s.push({key:r,look:c.look,name:c.nickname,mine:r===u.pid,place:Yc(l)})}}else{const i=F.get().characters[0];i&&s.push({key:"solo",look:Os(i),name:"You",mine:!0,place:{kind:"square"}})}const o=new Map;for(const i of s){const a=O8(i.place);o.has(a)||o.set(a,[]),o.get(a).push(i)}for(const[i,a]of o)a.sort((r,l)=>r.mine?-1:l.mine?1:r.name.localeCompare(l.name)),a.forEach((r,l)=>{let c,d;if(i==="square"){const v=-Math.PI/2+l*(Math.PI*2/Math.max(5,a.length));c=qt.x+Math.cos(v)*50,d=qt.y+Math.sin(v)*50}else{const v=un.get(i)??{x:qt.x,y:qt.y},$=4,x=Math.floor(l/$),f=l%$,h=Math.min($,a.length-x*$);c=v.x+(f-(h-1)/2)*40,d=v.y-x*40}n.add(r.key);let g=e.querySelector(`.mapFace[data-pid="${r.key}"]`);g||(g=document.createElement("button"),g.className="mapFace "+(r.mine?"mine":"other"),g.dataset.pid=r.key,g.setAttribute("aria-label",r.mine?"You":r.name),e.appendChild(g));const p=JSON.stringify(r.look)+r.name;if(g.dataset.look!==p){const v=g.querySelector(".bubble");g.innerHTML=`<span class="face">${Ma(We(r.look))}</span><span class="fname">${j(r.mine?"You":r.name)}</span>`,v&&g.appendChild(v),g.dataset.look=p}g.dataset.place=i;const m=46;g.style.left=(c-m/2)*t+"px",g.style.top=(d-m/2)*t+"px",g.style.width=g.style.height=m*t+"px"});e.querySelectorAll(".mapFace").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),Tn()}function Xc(e,t){const n=_("mapWorld");if(t&&!n.classList.contains("zoomIn")){const s=t.getBoundingClientRect(),o=n.getBoundingClientRect();n.style.transformOrigin=`${s.left+s.width/2-o.left}px ${s.top+s.height/2-o.top}px`,n.classList.remove("mapIn"),n.classList.add("zoomIn"),M.swish(),setTimeout(()=>{n.classList.remove("zoomIn"),ul(e)},360)}else ul(e)}function Vs(e){e.classList.remove("sceneIn"),e.offsetWidth,e.classList.add("sceneIn"),setTimeout(()=>e.classList.remove("sceneIn"),600)}function ul(e){e.kind==="house"?nd(e.houseId,e.room):e.kind==="home"?td():e.kind==="park"?G8():e.kind==="ranch"?Rs(!1):e.kind==="barn"?Rs(!0):e.kind==="gameroom"&&K8()}function I8(e){const t=u?.presence.get(e);if(!u||!t)return;const n=Yc(t),s=u.players.get(e)?.nickname??"your friend";if(n.kind==="square"){Q(`${s} is on the map too! 👋`);return}const o=document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`)??void 0;Xc(n,o),setTimeout(()=>{const i=ae();if(!i||!u)return;const a=t.x+(t.x>300?-110:110);if(n.kind==="house"&&i.where==="house")Ce({...i,x:a,y:t.y}),sn(),mi(a-ie/2);else if((n.kind==="park"||n.kind==="ranch"||n.kind==="barn")&&i.where===n.kind){at({...i,x:a,y:Math.max(_n,Math.min(Pt,t.y)),flip:a>t.x});const r=n.kind==="park"?ln():Ne(),l=_(n.kind==="park"?"parkScroll":"ranchScroll");requestAnimationFrame(()=>{l.scrollLeft=t.x*r-l.clientWidth/2,be()})}else if(n.kind==="gameroom"&&i.where==="gameroom"){const r=ns();r||at({where:"gameroom",x:a,y:Math.max(_n,Math.min(Pt,t.y)),flip:a>t.x});const l=an(),c=_("grScroll"),d=r?.x??t.x;requestAnimationFrame(()=>{c.scrollLeft=d*l-c.clientWidth/2,be()})}Q(`You found ${s}! 💕`)},420)}function ka(e){if(!u)return!1;const t=u.houses.get(e);return!!t&&t.meta.ownerId===u.pid&&$g(t.confirmed.mailbox)>0}function Jc(){const e=!!u&&L==="street"&&ka(u.myHouseId());Cs.syncCue(e)}function ed(e){if(!u||e==="home"||!u.houses.has(e)){Q("Join a street to send letters!");return}const t=u.houses.get(e);Cs.open(e,t.meta.name,t.meta.ownerId===u.pid,t.confirmed.mailbox?.letters??[]),M.click()}_("mapWorld").addEventListener("click",e=>{const t=e.target;if(L!=="street")return;const n=t.closest(".mapMail");if(n){ed(n.dataset.mail||"home");return}const s=t.closest(".mapFace");if(s){s.classList.contains("mine")?(He(s),M.pop(),Q("That's you! Tap a place to go there")):I8(s.dataset.pid);return}const o=t.closest("[data-go]");if(!o)return;const i=o.dataset.go;Xc(i.startsWith("house:")?{kind:"house",houseId:i.slice(6)}:{kind:i},o)});function Pn(){_("street").classList.add("hidden"),_("park").classList.add("hidden"),_("ranch").classList.add("hidden"),_("gameroom").classList.add("hidden"),ko()?.close(),_("chatTray").classList.add("hidden"),_("sheet").classList.add("hidden")}function Zn(){se=null,Ue=[],re=!1,u?Ce({where:"street",x:600,y:540,flip:!1}):Oe=null,Pn(),L="street",_("street").classList.remove("hidden"),_("streetTitle").textContent=u?"Our Neighborhood":"My Map",bt(),wn(!0);const e=_("mapWorld");e.style.transformOrigin="50% 50%",e.classList.remove("zoomIn","mapIn"),e.offsetWidth,e.classList.add("mapIn"),M.swish()}function td(){if(u){const e=u.myHouseId();e&&u.houses.has(e)&&nd(e);return}Pn(),L="house",Oe=null,nt.sync(!0),bt(),Cn(),Vs(_("stageWrap")),M.sparkle(),Qs()}function nd(e,t="living"){if(!u||!u.houses.has(e))return;ge=e,L="house",re=!1,nt.sync(e===u.myHouseId());let n=zo.get(e);n||(n=Ef(u,e,{get:()=>F.get().soundOn,set:s=>F.dispatch({type:"settings/sound",on:s})}),zo.set(e,n)),n.dispatch({type:"room/switch",room:t}),Ce({where:"house",houseId:e,room:t,x:900+Math.random()*300,y:540,flip:!1}),Pn(),Fc(n),Vs(_("stageWrap")),M.sparkle(),Qs()}function nr(){u?.close(),u=null,zo=new Map,L="house",ge="",Oe=null,se=null,Ue=[],re=!1,_("elsewhere").classList.add("hidden"),Pn(),nt.sync(!0),Fc(F),bt()}_("btnMap").addEventListener("click",()=>{if(L==="street"){M.pop();return}Zn()});_("btnHome").addEventListener("click",()=>{if(L==="house"&&(!u||ge===u.myHouseId())){M.pop();return}td()});_("phoneOk").addEventListener("click",()=>{_("phoneNote").classList.add("hidden"),M.click()});_("elsewhereGo").addEventListener("click",()=>{M.click(),u?.connect()});_("btnSolo").addEventListener("click",()=>{nr(),Q("Playing in your own house 🏠")});window.addEventListener("resize",()=>{L==="street"&&wn(!0),L==="park"&&ir(),L==="ranch"&&fr(),L==="gameroom"&&Na(),be()});function sr(e){u=e,zo=new Map,e.on("players",()=>{u===e&&(L==="street"?wn():L==="park"?Sn():L==="ranch"?(en(),pr()):L==="gameroom"?Ls():(sn(),bt()),Es==="dress"&&Mt())}),e.on("houses",()=>{u===e&&(L==="street"?wn():L==="house"&&!e.houses.has(ge)&&(Q("That house is gone now"),Zn()))}),e.on("houseMeta",t=>{u!==e||t!==ge||L!=="house"||(ue=null,bt(),ut(B.get()),qe(),Je()||_("sheet").classList.add("hidden"))}),e.on("pres",()=>{u===e&&(L==="street"?Oo():L==="park"?Sn():L==="ranch"?en():L==="gameroom"?Ls():sn())}),e.on("ranch",()=>{u===e&&L==="ranch"&&_i(!0)}),e.on("ranchFail",t=>{u===e&&ba(t)}),e.on("noride",()=>{if(u!==e)return;const t=ae();if(t?.ride!==void 0){const{ride:n,...s}=t;Ce(s),en()}Q("Someone is riding that horse!")}),e.on("fx",(t,n)=>{u===e&&hw(t,n)}),e.on("bubble",(t,n)=>{u===e&&A8(t,n)}),e.on("sayFail",t=>Q(t==="presetsOnly"?"Typing is turned off: pick a bubble!":ii[t]||"Couldn't send that")),e.on("mailbox",()=>{u===e&&(L==="street"&&wn(!0),Jc(),Cs.refresh())}),e.on("mailFail",t=>{u===e&&Cs.fail(t)}),e.on("settings",()=>{u===e&&(_("chatTray").classList.contains("hidden")||Vc(),Cs.refresh())}),e.on("removed",()=>{Q("A grown-up took this iPad off the street");const t=e.cfg;Wt({url:t.url,code:t.code,id:t.id,parentKey:t.parentKey}),nr()}),e.on("status",t=>{u===e&&(document.body.classList.toggle("reconnecting",t!=="online"&&!e.replaced),(t==="online"||t==="connecting")&&_("elsewhere").classList.add("hidden"))}),e.on("replaced",()=>{u===e&&_("elsewhere").classList.remove("hidden")}),e.on("table",()=>{if(u===e){if(L==="gameroom"){const t=ns(),n=ae();t&&n?.where==="gameroom"&&Math.hypot(n.x-t.x,n.y-t.y)>40&&Ce({where:"gameroom",x:t.x,y:Math.max(_n,Math.min(Pt,t.y)),flip:n.flip}),Ls()}ko()?.refresh()}}),e.on("tblFail",(t,n)=>{u===e&&ko()?.fail(t,n)}),e.on("welcome",()=>{if(u===e)if(L==="street")wn(!0);else if(L==="park"||L==="ranch"){const t=ae();t&&Ce(t),L==="park"?ir():fr(),be()}else if(L==="gameroom"){const t=ae();t&&Ce(t),Na(),be(),ko()?.refresh()}else e.houses.has(ge)?Cn():Zn()}),Zn()}async function q8(){bt();const e=ai(),t=Vn();if(!e||!t?.token||t.url!==e)return;const n=new ri(t),s=await n.connect();s==="ok"?sr(n):(n.close(),s!=="closed"&&Q("Couldn't reach the street. Playing at home!"))}function et(e,t,n=""){const s=document.createElement("div");s.className="sheet hoodSheet "+n,s.innerHTML=`<div class="card">${e}</div>`,document.body.appendChild(s),M.swish();const o=()=>s.remove();return s.addEventListener("click",i=>{const a=i.target;if(a===s||a.closest('[data-m="close"]'))return o();t(a,o,s)}),{root:s,close:o}}const tt='<button class="close" data-m="close">✕</button>';_("btnHood").addEventListener("click",()=>N8());function N8(){const e=ai();if(!e){et(`${tt}<h2>Neighborhood</h2><p class="hint">The street isn't open yet. Ask a grown-up to set it up!</p>`,()=>{});return}const t=Vn()?.url===e?Vn():null;et(`${tt}<h2>Neighborhood</h2><div class="bigBtns">
      ${t?.token?`<button class="big go" data-m="go">${Ve.street}<span>Go to my street</span></button>`:`<button class="big go" data-m="join">${Ve.street}<span>Join a friend's street</span></button>`}
      <button class="big grown" data-m="create">${Ve.shield}<span>${t?.parentKey?"Grown-ups":"Grown-ups: start a street"}</span></button></div>`,async(n,s)=>{const o=n.closest("[data-m]")?.dataset.m;if(o==="go"){s();const i=new ri(t),a=await i.connect();a==="ok"?sr(i):(i.close(),Q(a.startsWith("badtoken")?"Please join again":"Couldn't reach the street"))}o==="join"&&(s(),Bs(e)),o==="create"&&(s(),await Il()&&(t?.parentKey?ki():j8(e)))})}async function j8(e){let t;try{t=await Hf(e)}catch{Q("Couldn't create a street right now");return}Wt({url:e,code:t.code,id:t.id,parentKey:t.parentKey}),et(`${tt}<h2>Your street is ready!</h2><p class="hint">Kids join with this code (you can pick your own on the grown-up screen):</p><div class="code" id="newCode">${t.code}</div>
    <p class="hint small">Grown-up key (keep it private; it opens the grown-up screen on another device):<br><b class="key" id="parentKey">${t.parentKey}</b></p>
    <div class="bigBtns"><button class="big grown" data-m="setup">${Ve.shield}<span>Add kids' names &amp; code</span></button>
    <button class="big go" data-m="joinhere">${Ve.street}<span>Join on this iPad</span></button></div>`,(n,s)=>{n.closest('[data-m="joinhere"]')&&(s(),or(e,t.code)),n.closest('[data-m="setup"]')&&(s(),ki())})}function Bs(e,t=""){const n=et(`${tt}<h2>Join a street</h2><p class="hint">Type the code a grown-up gave you</p>
    <form id="codeForm" class="codeForm"><input id="codeInput" maxlength="${Ua}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="CODE"/><button type="submit" class="go">Next</button></form>
    <p class="err">${j(t)}</p>`,()=>{}),s=n.root.querySelector("#codeInput");setTimeout(()=>s.focus(),50),s.addEventListener("input",()=>{s.value=So(s.value)}),n.root.querySelector("#codeForm").addEventListener("submit",o=>{o.preventDefault();const i=So(s.value);if(!Rg(i)){n.close(),Bs(e,"That code looks wrong. Try again!");return}n.close(),or(e,i)})}async function or(e,t,n=""){let s;try{s=await Qf(e,t)}catch{Bs(e,"Couldn't reach the street. Try again!");return}if("slow"in s){Bs(e,"Too many tries. Ask a grown-up and try again in a few minutes.");return}if(!s.exists){Bs(e,"Hmm, we couldn't find that street.");return}window.__lastLookupId=s.id,Z8(e,t,s.id,s.roster,n)}function Z8(e,t,n,s,o=""){if(s.length){et(`${tt}<h2>Who are you?</h2>${o?`<p class="err">${j(o)}</p>`:'<p class="hint">Tap your name</p>'}<div class="nicks roster">${s.map((i,a)=>`<button data-nick="${a}" ${i.claimed?"disabled":""}>${j(i.name)}${i.claimed?"<small>signed in</small>":""}</button>`).join("")}</div>
      <p class="hint small">Not on the list? Ask a grown-up to add your name.</p>`,(i,a)=>{const r=i.closest("[data-nick]");if(!r||r.disabled)return;a();const l=s[+r.dataset.nick];l.hasHouse?sd(e,t,n,l.name,void 0):ml(e,t,n,l.name)},"wide");return}et(`${tt}<h2>Pick your street name</h2>${o?`<p class="err">${j(o)}</p>`:""}<div class="nicks">${$r.map((i,a)=>`<button data-nick="${a}">${j(i)}</button>`).join("")}</div>`,(i,a)=>{const r=i.closest("[data-nick]");r&&(a(),ml(e,t,n,$r[+r.dataset.nick]))},"wide")}function ml(e,t,n,s){et(`${tt}<h2>Hi, ${j(s)}!</h2><p class="hint">What should your house on the street be?</p>
    <div class="bigBtns"><button class="big go" data-m="bring">${Ji(2)}<span>Bring my house</span></button>
    <button class="big" data-m="fresh">${Ji(5)}<span>Start a new one</span></button></div>`,(o,i)=>{const a=o.closest("[data-m]")?.dataset.m;a&&(i(),sd(e,t,n,s,a==="bring"))})}async function sd(e,t,n,s,o){const i=F.get(),a=i.characters[0],r=Os(a??{});let l;if(o&&(l=i,a)){const{reduce:v}=await _a(async()=>{const{reduce:$}=await Promise.resolve().then(()=>Bg);return{reduce:$}},void 0);l=v(i,{type:"char/delete",id:a.id})}const c=Vn(),d={url:e,code:t,id:n,parentKey:c?.id===n||c?.code===t?c.parentKey:void 0},g=i.dog?{name:i.dog.name,breed:i.dog.breed}:null,p=new ri(d),m=await p.connect({nickname:s,look:r,house:l,dog:g});if(m==="ok"){Wt(p.cfg),sr(p),Q(`Welcome to the street, ${s}!`),A4()&&(D4(),de=Le,Xn("dress"));return}p.close(),m.startsWith("nickname")?or(e,t,m.endsWith("notOnList")?"That name is not on the list anymore.":"That name is already signed in on another iPad. Ask a grown-up!"):Q(m==="full"?"That street is full":"Couldn't join right now")}_("btnParent").addEventListener("click",async()=>{await Il()&&ki()});const F8={codeTaken:"That code is already used by another street. Try adding a number!",badCode:"Codes are 4–16 letters or numbers.",badName:"Use a first name only (letters).",rosterFull:`Up to ${Ag} names.`,nameInUse:"Remove that player first.",codeFixed:"This street's code can't be changed."};async function ki(){const e=Vn();if(!e)return;if(!e.parentKey){const a=et(`${tt}<h2>Grown-up key</h2><p class="hint">Enter the key you got when the street was made</p><form id="keyForm" class="codeForm"><input id="keyInput" autocomplete="off" spellcheck="false"/><button class="go">OK</button></form>`,()=>{});a.root.querySelector("#keyForm").addEventListener("submit",r=>{r.preventDefault(),e.parentKey=a.root.querySelector("#keyInput").value.trim(),Wt(e),u&&(u.cfg.parentKey=e.parentKey),a.close(),ki()});return}let t=u;t||(t=new ri({...e,token:void 0}),await t.connect());const n=t,s=a=>o.root.querySelector(a).value,o=et(`${tt}<h2>Grown-up screen</h2><div id="parentBody"><p class="hint">Loading…</p></div>`,async a=>{const r=a.closest("[data-p]");if(!r)return;const l=r.dataset.p;if(l==="free"&&n.parent({op:"freeChat",on:r.dataset.on!=="1"}),l==="freeMail"&&n.parent({op:"freeMail",on:r.dataset.on!=="1"}),l==="rename"&&n.parent({op:"rename",houseId:r.dataset.hid,name:s(`input[data-hid="${r.dataset.hid}"]`)}),l==="add"&&n.parent({op:"rosterAdd",name:r.dataset.name??s("#rosterInput")}),l==="unname"&&n.parent({op:"rosterRemove",name:r.dataset.name}),l==="unclaim"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again";return}n.parent({op:"unclaim",name:r.dataset.name})}if(l==="setcode"&&n.parent({op:"setCode",code:s("#codeEdit")}),l==="remove"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again to remove";return}n.parent({op:"remove",pid:r.dataset.pid})}if(l==="mailClear"||l==="mailClearAll"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent=l==="mailClearAll"?"Tap again to clear every mailbox":r.dataset.id?"Tap again":"Tap again to clear this mailbox";return}l==="mailClearAll"?n.parent({op:"mailClearAll"}):n.parent({op:"mailClear",houseId:r.dataset.hid,...r.dataset.id?{id:r.dataset.id}:{}})}if(l==="leave"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again: forget this street here";return}Wt(null),o.close(),nr(),Q("This iPad left the street")}},"wide parent");o.root.addEventListener("submit",a=>{a.preventDefault();const r=a.target.id;r==="rosterForm"&&n.parent({op:"rosterAdd",name:s("#rosterInput")}),r==="codeForm2"&&n.parent({op:"setCode",code:s("#codeEdit")})});const i=a=>{const r=new Date(a);return Number.isFinite(r.getTime())?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r.getMonth()]+" "+r.getDate()+", "+r.getFullYear():""};n.on("parentInfo",a=>{const r=o.root.querySelector("#parentBody");if(!r)return;const l=Vn();l&&l.code!==a.code&&(l.code=a.code,Wt(l)),n.cfg.code=a.code;const c=a.roster??[],d=new Set(c.map(f=>f.name.toLowerCase())),g=Dg.filter(f=>!d.has(f.toLowerCase())),p=c[0]?.name??"Reagan",m=Array.isArray(a.mail)?a.mail:[],v=m.some(f=>f.letters&&f.letters.length),$=Rl(a.settings),x=m.map(f=>`<div class="pMailHouse"><div class="pMailName">${j(f.name||"House")}</div>${(f.letters||[]).slice().reverse().map(h=>`<div class="pLetter"><b>${j(h.from)}</b><span class="pWhen">${j(i(h.at))}</span><p>${j(h.text)}</p><button type="button" class="danger" data-p="mailClear" data-hid="${j(f.houseId)}" data-id="${j(h.id)}">Clear</button></div>`).join("")||'<p class="hint">No letters.</p>'}${(f.letters||[]).length?`<button type="button" class="danger" data-p="mailClear" data-hid="${j(f.houseId)}">Clear this mailbox</button>`:""}</div>`).join("");r.innerHTML=`${a.note?`<p class="err" id="pNote">${j(F8[a.note]??a.note)}</p>`:""}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${j(a.code)}</div></div>
        <div><div class="label">Free typing</div><button class="toggle ${a.settings.freeChat?"on":""}" data-p="free" data-on="${a.settings.freeChat?1:0}" id="pFree">${a.settings.freeChat?"On":"Off (presets only)"}</button><p class="hint small">Chat bubbles. Off means preset phrases only.</p></div>
        <div><div class="label">Let kids type their own letters</div><button class="toggle ${$?"on":""}" data-p="freeMail" data-on="${$?1:0}" id="pFreeMail">${$?"On":"Off (presets only)"}</button><p class="hint small">Letters only. Off means preset phrases only.</p></div></div>
      <div class="label">Letters</div><div id="parentMail">${x||'<p class="hint">No letters right now.</p>'}${v?'<button type="button" class="danger" data-p="mailClearAll" id="mailClearAll">Clear every mailbox</button>':""}</div>
      <form class="pAdd" id="codeForm2"><input id="codeEdit" maxlength="${Ua}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="e.g. ${j(So(p))}7"/><button data-p="setcode" type="button">Use this code</button></form>
      <p class="hint small">Tip: a word plus a number (like ${j(So(p))}7) is easy to remember and harder to guess. Not case-sensitive.</p>
      <div class="label">Kids' names (sign-in list)</div>
      <div class="roster">${c.map(f=>`<span class="rName ${f.claimed?"claimed":""}"><b>${j(f.name)}</b>${f.claimed?`<i>signed in</i><button data-p="unclaim" data-name="${j(f.name)}">Reset</button>`:f.hasHouse?"<i>not signed in</i>":`<button class="x" data-p="unname" data-name="${j(f.name)}" aria-label="Remove name">×</button>`}</span>`).join("")||'<p class="hint">No names yet: kids pick a fun nickname instead.</p>'}</div>
      <form class="pAdd" id="rosterForm"><input id="rosterInput" maxlength="20" autocomplete="off" placeholder="First name"/><button data-p="add" type="button">Add</button></form>
      ${g.length?`<div class="sugg">${g.map(f=>`<button data-p="add" data-name="${f}">+ ${f}</button>`).join("")}</div>`:""}
      <div class="label">Houses</div>${a.houses.map(f=>`<div class="pHouse"><input data-hid="${f.id}" value="${j(f.name)}" maxlength="24"/><button data-p="rename" data-hid="${f.id}">Rename</button></div>`).join("")||'<p class="hint">No houses yet.</p>'}
      <div class="label">Players</div>${a.players.map(f=>`<div class="pPlayer"><span class="dot ${f.online?"on":""}"></span>${j(f.nickname)}<button class="danger" data-p="remove" data-pid="${f.pid}">Remove</button></div>`).join("")||'<p class="hint">Nobody has joined yet.</p>'}
      <p class="hint small">Letters stay on the server for up to 30 days. They are filtered, and only a first name is stored. You can clear them here, or turn off “Let kids type their own letters” so new letters use preset phrases. Chat bubbles are only relayed to kids standing nearby and are not saved. No emails or last names. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays).</p>
      <button class="danger wideBtn" data-p="leave">Forget this street on this device</button>`}),n.on("error",a=>{a==="badkey"&&(Q("That grown-up key didn't work"),e.parentKey=void 0,Wt(e),o.close())}),n.parent({op:"info"})}let Oe=null;function ln(){return _("park").clientHeight/Ea}const V8=()=>{const e=F.get();return e.characters.find(t=>t.id===e.dog?.owner)??e.characters[0]},ct=()=>u?ae():Oe;function at(e){u?Ce(e):Oe=e,L==="ranch"?en():L==="gameroom"?Ls():Sn()}function Yt(e="park"){if(u){const n=[],s=[...u.presence.entries()],o=ae();o&&s.push([u.pid,o]);for(const[i,a]of s){const r=u.players.get(i);r&&a.where===e&&n.push({key:i,look:r.look,name:r.nickname,p:a,mine:i===u.pid,dog:r.dog??null})}return n}const t=V8();return Oe&&Oe.where===e?[{key:"solo",look:Os(t??{}),name:"",p:Oe,mine:!0,dog:F.get().dog??null}]:[]}function ir(){const e=ln(),t=_("parkWorld"),n=s=>s*e+"px";t.style.width=Qa*e+"px",t.style.height=Ea*e+"px",t.style.setProperty("--sc",String(e)),t.innerHTML=th()+Vi.map((s,o)=>s.kind==="swing"?`<div class="swing" data-swing="${o}" style="left:${n(s.x-30)};top:${n(st)};width:${n(60)};height:${n(240)}">${nh}</div>`:"").join("")+Vi.map((s,o)=>`<button class="pspot k-${s.kind}" data-spot="${o}" aria-label="${s.kind}" style="left:${n(s.x-50)};top:${n(s.y-(s.kind==="swing"?70:55))};width:${n(100)};height:${n(s.kind==="swing"?90:65)}"></button>`).join("")+`<button class="pspot slide" data-act="slide" aria-label="Slide" style="left:${n(N.ladder-45)};top:${n(N.top.y-30)};width:${n(130)};height:${n(560-N.top.y+30)}"></button><button class="pspot pond" data-act="splash" aria-label="Pond" style="left:${n(1235)};top:${n(462)};width:${n(370)};height:${n(105)}"></button><button class="pspot gate" data-act="exit" aria-label="Back to the street" style="left:${n(25)};top:${n(240)};width:${n(180)};height:${n(260)}"></button><div class="ripples" id="ripples"></div><button class="ball" id="ball" aria-label="Ball">${sh}</button><div class="savatars" id="pavatars"></div>`,Io(),Sn(),be()}const yl=2400;function Sn(){const e=document.getElementById("pavatars");if(!e||L!=="park")return;const t=ln(),n=new Set,s=new Set;for(const o of Yt()){n.add(o.key);let i=e.querySelector(`.savatar[data-pid="${o.key}"]`);i||(i=document.createElement("div"),i.className="savatar "+(o.mine?"mine":"other"),i.dataset.pid=o.key,e.appendChild(i),o.mine&&od(i));const a=JSON.stringify(o.look)+o.name;if(i.dataset.look!==a){const g=i.querySelector(".bubble");i.innerHTML=o.name?er(o.look,o.name):`<div class="inner">${We(o.look)}</div>`,g&&i.appendChild(g),i.dataset.look=a}const r=(qs[o.look.size]??1)*t*.95,l=rn*r,c=kt*r;i.style.left=o.p.x*t-l/2+"px",i.style.top=o.p.y*t-c+"px",i.style.width=l+"px",i.style.height=c+"px",i.style.zIndex=String(100+Math.round(o.p.y)),i.classList.toggle("flipped",o.p.flip),Is(i,o.look,o.mine);const d=o.p.pose??"";i.dataset.pose!==d&&(i.classList.remove("pose-sit","pose-swing","pose-slide"),i.offsetWidth,d==="slide"&&(i.style.setProperty("--sx",(N.top.x-N.bottom.x)*t+"px"),i.style.setProperty("--sy",(N.top.y-N.bottom.y)*t+"px")),d&&i.classList.add("pose-"+d),i.dataset.pose=d),d==="swing"?(i.style.transformOrigin=`50% ${(st-o.p.y)*t+c}px`,i.style.animationDelay=-(Date.now()%yl)/1e3+"s",s.add(o.p.spot??-1)):(i.style.transformOrigin="",i.style.animationDelay="")}e.querySelectorAll(".savatar").forEach(o=>{n.has(o.dataset.pid)||o.remove()}),document.querySelectorAll("#parkWorld .swing").forEach(o=>{const i=s.has(+o.dataset.swing);i&&!o.classList.contains("swinging")&&(o.style.animationDelay=-(Date.now()%yl)/1e3+"s"),o.classList.toggle("swinging",i)}),Tn()}function od(e){e.addEventListener("pointerdown",t=>{t.preventDefault(),t.stopPropagation();const n=ct();if(!n||n.where!=="park"&&n.where!=="ranch"&&n.where!=="barn")return;const s=n.where!=="park",o=n.where;Ue=[];const i=_(s?"ranchScroll":"parkScroll"),a=s?Ne():ln(),r=o==="barn"?Ca:s?Ds:Qa,l=b=>{const W=_(s?"ranchWorld":"parkWorld").getBoundingClientRect();return{x:(b.clientX-W.left)/a,y:(b.clientY-W.top)/a}},c=l(t),d={x:n.x-c.x,y:n.y-c.y};let g=t,p=0,m=n.x,v=!1;const $=b=>{const W=l(b),P=ct();if(!P)return;const D=Math.max(60,Math.min(r-60,W.x+d.x)),O=Math.max(470,Math.min(590,W.y+d.y));if(!v&&Math.hypot(D-P.x,O-P.y)<6)return;v=!0;const ne=Math.abs(D-m)>3?D<m:P.flip;Math.abs(D-m)>3&&(m=D),at(o==="barn"?{where:"barn",x:D,y:O,flip:ne}:s?{where:"ranch",x:D,y:O,flip:ne,...P.ride!==void 0?{ride:P.ride}:{}}:{where:"park",x:D,y:O,flip:ne})},x=()=>{const b=i.getBoundingClientRect(),W=g.clientX<b.left+70?-10:g.clientX>b.right-70?10:0;W&&v&&(i.scrollLeft+=W,$(g)),p=requestAnimationFrame(x)};p=requestAnimationFrame(x),e.classList.add("lifted"),M.pick();const f=b=>{b.pointerId===t.pointerId&&(g=b,$(b))},h=b=>{b.pointerId===t.pointerId&&(cancelAnimationFrame(p),window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",h),e.classList.remove("lifted"),M.drop())};window.addEventListener("pointermove",f),window.addEventListener("pointerup",h)})}_("parkWorld").addEventListener("pointerdown",e=>{e.target.closest(".pspot, .ball, .pet")&&e.stopPropagation()});_("parkWorld").addEventListener("click",e=>{const t=e.target,n=ct();if(!n)return;if(t.closest("#ball")){Y8();return}const s=t.closest("[data-spot]");if(s){const i=+s.dataset.spot,a=Vi[i];if(n.spot===i&&n.pose){at({where:"park",x:a.x,y:Math.min(590,a.y+40),flip:n.flip});return}if(Yt().some(r=>!r.mine&&r.p.spot===i&&r.p.pose)){Q("Someone is already there!");return}at({where:"park",x:a.x,y:a.y,flip:n.flip,pose:a.kind==="swing"?"swing":"sit",spot:i}),a.kind==="swing"?M.boing():M.drop();return}const o=t.closest("[data-act]")?.dataset.act;if(o==="slide"&&(at({where:"park",x:N.bottom.x,y:N.bottom.y,flip:!1,pose:"slide"}),M.swish(),setTimeout(()=>{const i=ct();i?.pose==="slide"&&at({where:"park",x:i.x,y:i.y,flip:i.flip})},1500)),o==="splash"){const i=_("parkWorld").getBoundingClientRect(),a=(e.clientX-i.left)/ln();id(a),u?.fx({k:"splash",x:a})}o==="exit"&&ad()});function id(e){const t=document.getElementById("ripples");if(!t||L!=="park")return;const n=ln();for(let s=0;s<2;s++){const o=document.createElement("div");o.className="ripple";const i=(120+s*70)*n;Object.assign(o.style,{left:e*n-i/2+"px",top:512*n-i*.18+"px",width:i+"px",height:i*.36+"px",animationDelay:s*.15+"s"}),t.appendChild(o),setTimeout(()=>o.remove(),1400)}for(let s=0;s<6;s++){const o=document.createElement("div");o.className="drop",Object.assign(o.style,{left:e*n+"px",top:505*n+"px"}),o.style.setProperty("--dx",(s-2.5)*14+"px"),t.appendChild(o),setTimeout(()=>o.remove(),900)}M.splash()}function G8(){Pn(),Ue=[],re=!1,L="park",_("park").classList.remove("hidden"),Vs(_("park"));const e={where:"park",x:290,y:548,flip:!1};u?Ce(e):Oe=e,_("streetTitle").textContent="The Park",bt(),ir(),requestAnimationFrame(()=>{const t=_("parkScroll");t.scrollLeft=0,be()}),M.sparkle()}function ad(){Zn()}function K8(){Pn(),Ue=[],re=!1,L="gameroom",_("gameroom").classList.remove("hidden");const e=ns(),t=e?{where:"gameroom",x:e.x,y:Math.max(_n,Math.min(Pt,e.y)),flip:!1}:{where:"gameroom",x:280,y:560,flip:!1};u?Ce(t):Oe=t,_("streetTitle").textContent="The Clubhouse",bt(),Na(),requestAnimationFrame(()=>{const n=an(),s=_("grScroll");s.scrollLeft=Math.max(0,(e?.x??520)*n-s.clientWidth/2),be()}),Vs(_("gameroom")),M.sparkle()}_("btnLeavePark").addEventListener("click",()=>{L==="ranch"&&re?Rs(!1):ad()});let Zt={x:2620,y:565},se=null;function Io(e=!1){const t=document.getElementById("ball");if(!t)return;const n=ln(),s=34*n;e||t.classList.remove("flying"),t.style.left=Zt.x*n-s/2+"px",t.style.top=Zt.y*n-s+"px",t.style.width=t.style.height=s+"px"}function Y8(){if(se)return;const e=ve.x0+40+Math.random()*(ve.x1-ve.x0-80),t=ve.y0+25+Math.random()*(ve.y1-ve.y0-35);rd(u?u.pid:"solo",e,t),u?.fx({k:"ball",x:e,y:t})}function rd(e,t,n){if(L!=="park")return;const s=document.getElementById("ball");Zt={x:t,y:n},se={thrower:e,phase:"fly",dog:null,until:performance.now()+12e3},s&&(s.classList.remove("flying"),s.offsetWidth,s.classList.add("flying"),Io(!0)),M.boing(),setTimeout(()=>{se?.phase==="fly"&&(se.phase="chase",document.getElementById("ball")?.classList.remove("flying"),Ft.size||(se=null))},650)}function X8(e){if(!u)return Oe;const t=e===u.pid?ae():u.presence.get(e);return t&&t.where==="park"?t:null}const Ft=new Map,Ri=e=>(t,n,s,o,i)=>{t.style.left=(n-o/2)*e+"px",t.style.top=(s-i)*e+"px",t.style.width=o*e+"px",t.style.height=i*e+"px"};function J8(){const e=[];if(L==="house"){const t=B.get(),n={box:Be,place:os,z:s=>String(4e3+Math.round(s)),scale:1};if(u&&Ie!==F){const s=[...u.presence.entries()],o=ae();o&&s.push([u.pid,o]);for(const[i,a]of s){const r=u.players.get(i)?.dog;r&&a.where==="house"&&a.houseId===ge&&a.room===t.currentRoom&&e.push({key:i,dog:r,x:a.x,y:a.y,flip:a.flip,...n})}}else if(t.dog){const s=t.characters.find(o=>o.id===t.dog.owner)??t.characters[0];s&&s.room===t.currentRoom&&e.push({key:"solo",dog:t.dog,x:s.x,y:s.y,flip:s.flip,...n})}}else if(L==="park"){const t=document.getElementById("pavatars");if(!t)return e;const n=ln();for(const s of Yt())s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Ri(n),z:o=>String(Math.round(o)-200),scale:.95})}else if(L==="ranch"){const t=document.getElementById("ravatars");if(!t)return e;const n=Ne();for(const s of Yt(re?"barn":"ranch"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Ri(n),z:o=>String(100+Math.round(o)),scale:.95,riding:s.p.ride!==void 0})}else if(L==="gameroom"){const t=document.getElementById("gavatars");if(!t)return e;const n=an();for(const s of Yt("gameroom"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Ri(n),z:o=>String(Math.round(o)-200),scale:.95})}return e}let kl=performance.now();function ew(e,t){const n=new Set;for(const s of J8()){if(sw(s.key))continue;n.add(s.key);let o=Ft.get(s.key);const i=s.flip?1:-1,a=s.riding?200:78;let r=s.x+i*a;s.riding&&(r=Math.max(50,Math.min(Ds-50,r)));const l=Math.min(595,s.y+(s.riding?28:6));if(!o||o.box!==s.box||!o.el.isConnected){o?.el.remove();const b=document.createElement("div");b.className="pet pet-dog",b.dataset.dog=s.key,s.box.appendChild(b),tw(b,s.key),o={el:b,box:s.box,x:r,y:l,flip:s.flip,pose:"",look:"",idle:1,trickUntil:0,sitTrick:!1},Ft.set(s.key,o)}let c=r,d=l,g=s.riding?980:320;if(se&&e>se.until&&(se=null,Io()),se&&L==="park"){if(se.phase==="chase")c=Zt.x,d=Zt.y,g=950,Math.hypot(o.x-c,o.y-d)<28&&(se.phase="carry",se.dog=s.key,M.woof());else if(se.phase==="carry"&&se.dog===s.key){const b=X8(se.thrower)??{x:(ve.x0+ve.x1)/2,y:540};c=b.x+60,d=Math.min(590,b.y+6),g=750,Zt={x:o.x+(o.flip?-40:40),y:o.y-30*s.scale},Math.hypot(o.x-c,o.y-d)<26&&(Zt={x:b.x+70,y:Math.min(590,b.y+12)},se=null,bo(o,"♥"),M.sparkle()),Io()}}const p=e<o.trickUntil,m=c-o.x,v=d-o.y,$=Math.hypot(m,v);let x=!1;if($>(se?4:10)&&!p){const b=gi()?$:Math.min($,g*t);o.x+=m/$*b,o.y+=v/$*b,x=!0,Math.abs(m)>1.5&&(o.flip=m<0),o.idle=0}else o.idle+=t,!p&&o.idle>.3&&Math.abs(s.x-o.x)>4&&(o.flip=s.x<o.x);const f=p&&o.sitTrick?"sit":x?"stand":o.idle>.9?"sit":"stand",h=f+s.dog.breed;if(o.pose+o.look!==f+h){const b=[...o.el.querySelectorAll(".bubble, .kennelBtn")];o.el.innerHTML=`<div class="inner">${Ps(s.dog.breed,f)}</div>`;for(const W of b)o.el.appendChild(W);o.pose=f,o.look=h}o.el.dataset.name=s.dog.name,o.el.classList.toggle("walking",x),o.el.classList.toggle("flipped",o.flip),s.place(o.el,o.x,o.y,92*s.scale,71*s.scale),o.el.style.zIndex=s.z(o.y+1),gd(o.el,s.key,!1)}for(const[s,o]of Ft)n.has(s)||(o.el.remove(),Ft.delete(s))}function bo(e,t){e.el.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.el.appendChild(n),is(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const vl=new Map;function ld(e,t){const n=Ft.get(e);if(!n)return;const s=n.el.dataset.name??"";n.trickUntil=performance.now()+1400,n.sitTrick=t===0,n.el.classList.remove("spin","hop"),n.el.offsetWidth,t===0&&(bo(n,`${s} sits! 🐾`),M.pop()),t===1&&(n.el.classList.add("spin"),bo(n,"Wheee! ✨"),M.spin()),t===2&&(n.el.classList.add("hop"),bo(n,"Woof! Woof!"),M.woof())}function tw(e,t){e.addEventListener("pointerdown",n=>{n.stopPropagation(),n.preventDefault()}),e.addEventListener("click",n=>{n.stopPropagation();const s=(vl.get(t)??0)%3;vl.set(t,s+1),ld(t,s),u&&u.fx({k:"trick",owner:t,v:s})})}function vi(e){const t=e?.dogKennel?.item;if(!t||!e)return null;for(const n of Object.values(e.rooms)){const s=n.items.find(o=>o.id===t&&o.kind==="kennel");if(s)return s}return null}function nw(e){if(e==="solo")return F.get();if(!u)return null;const t=u.players.get(e)?.houseId;return t?u.view(t):null}function sw(e){return!!vi(nw(e))}function ar(){if(u){const e=u.myHouseId();return e?u.view(e):null}return F.get()}function cd(){if(L!=="house")return null;const e=B.get(),t=vi(e);if(!t||!e.rooms[e.currentRoom]?.items.some(n=>n.id===t.id))return null;if(u&&Ie!==F){const n=u.houses.get(ge)?.meta.ownerId,s=n?u.players.get(n)?.dog??null:null;return!n||!s?null:{key:n,dog:s,item:t}}return e.dog?{key:"solo",dog:e.dog,item:t}:null}function ow(){const e=ar();if(!e)return null;const t=qo()?B.get().currentRoom:null;let n=null,s=null;for(const[o,i]of Object.entries(e.rooms))for(const a of i.items)a.kind==="kennel"&&((!n||a.z>=n.z)&&(n=a),o===t&&(!s||a.z>=s.z)&&(s=a));return s??n}function lo(e){if(!cr()){Q("Adopt a dog first!");return}bs({type:"dog/kennel",item:e}),e?(M.pop(),Q("Rest well, puppy!")):(M.woof(),Q("Come on, puppy!"))}function rr(e){if(!cr()){Q("Adopt a dog first!");return}const t=vi(ar());if(e===void 0){if(t){lo(null);return}const n=ow();if(!n){Q("Put a dog kennel down first!");return}lo(n.id);return}t?.id===e?lo(null):lo(e)}function dd(e){const t=B.get(),n=t.rooms[t.currentRoom]?.items.find(s=>s.id===e);if(n){if(n.kind==="kennel"){qo()&&rr(n.id);return}n.kind==="cat-tower"&&gw()}}function iw(e,t){const n=B.get(),s=n.rooms[n.currentRoom]?.items.find(i=>i.id===t);if(!s)return;const o=Kf(s.kind);if(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),M.click(),o==="kennel"||o==="tower"){dd(t);return}if(o==="lamp"){e.classList.toggle("lamp-on");return}if(o==="open"){e.classList.toggle("opened");return}o==="sit"&&aw(s)}function aw(e){const t=Math.max(hi+40,e.y-8);if(u&&L==="house"){const o=ae();o&&o.where==="house"&&(Ce({...o,x:e.x,y:t,flip:!1}),sn());return}const n=B.get(),s=n.characters.find(o=>o.id===de&&o.room===n.currentRoom)??n.characters.find(o=>o.room===n.currentRoom);s&&B.dispatch({type:"char/move",id:s.id,room:n.currentRoom,x:e.x,y:t})}function gd(e,t,n){const s=u?t===u.pid:t==="solo";let o=e.querySelector(".kennelBtn");if(!s){o?.remove();return}o||(o=document.createElement("button"),o.type="button",o.className="kennelBtn",o.addEventListener("pointerdown",i=>{i.stopPropagation(),i.preventDefault()}),o.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault(),rr()}),e.appendChild(o)),o.textContent=n?"Out":"Kennel"}function rw(e,t){e.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.appendChild(n),is(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const vs=new Map;function lw(){const e=new Set,t=cd();if(t){e.add(t.key);const n=Df(t.dog.name,Date.now()),s=t.item.y-(n==="peek"?24:2);let o=vs.get(t.key);if(!o||!o.el.isConnected){o?.el.remove();const a=document.createElement("div");a.className="pet pet-dog kenneled",a.dataset.dog="kennel:"+t.key,Be.appendChild(a),a.addEventListener("pointerdown",r=>{r.target.closest(".kennelBtn")||(r.stopPropagation(),r.preventDefault())}),a.addEventListener("click",r=>{r.target.closest(".kennelBtn")||(r.stopPropagation(),rw(a,`${a.dataset.name??"Puppy"} is resting`))}),o={el:a,pose:"",look:"",x:t.item.x,y:s},vs.set(t.key,o)}const i=n==="rest"?"sleep":"sit";if(o.pose!==i||o.look!==n+t.dog.breed){const a=[...o.el.querySelectorAll(".bubble, .kennelBtn")];o.el.innerHTML=`<div class="inner">${Ps(t.dog.breed,i)}</div>${n==="rest"?'<div class="zzz"><b>Zzz</b><i>z</i><i>z</i><i>z</i></div>':""}`;for(const r of a)o.el.appendChild(r);o.pose=i,o.look=n+t.dog.breed}o.el.dataset.name=t.dog.name,o.el.classList.toggle("rest",n==="rest"),o.el.classList.toggle("peek",n==="peek"),o.x=t.item.x,o.y=s,os(o.el,t.item.x,s,100,77),o.el.style.zIndex=String(1e3+t.item.z+1),gd(o.el,t.key,!0)}for(const[n,s]of vs)e.has(n)||(s.el.remove(),vs.delete(n))}let R=null,co="",Ai=0,lr=0,wo={x:0,perch:0,leap:!1};const cw=562;function fd(e){return(e.rooms[e.currentRoom]?.items.filter(n=>n.kind==="cat-tower")??[]).reduce((n,s)=>!n||s.z>=n.z?s:n,null)}function bl(e){return e==="cat-bed"||e==="pet-bed"||e==="dog-bed"||e==="pack:cat-bed"||/(?:^|:)cat-bed$|(?:^|:)pet-bed$/.test(e)}function dw(e){const t=e.rooms[e.currentRoom]?.items??[],n=t.filter(a=>bl(a.kind)),s=t.filter(a=>a.kind==="bed"),o=(n.length?n:s).reduce((a,r)=>!a||r.z>=a.z?r:a,null);if(!o)return null;const i=Se[o.kind];return{x:o.x,y:o.y,h:i?Ge(i)*o.scale:80,pet:bl(o.kind)}}function gw(){const e=B.get();!e.cat||e.cat.room!==e.currentRoom||!fd(e)||(lr=performance.now()+900,M.boing(),u?.fx({k:"leap"}))}function fw(){const e=B.get(),t=L==="house"?e.cat:null;if(!t||t.room!==e.currentRoom){R&&(R.remove(),R=null,co="",Ai=0);return}(!R||!R.isConnected)&&(R=document.createElement("div"),R.className="pet pet-cat",Be.appendChild(R),co="",R.addEventListener("pointerdown",x=>{x.stopPropagation(),x.preventDefault()}),R.addEventListener("click",x=>{x.stopPropagation(),hd(),u&&u.fx({k:"purr"})}));const n=fd(e),s=n?null:dw(e),o=n?Se[n.kind]:void 0,i=n&&o?Ge(o)*n.scale:0,a=Of(t,Date.now(),n?{x:n.x}:null,s?{x:s.x}:null,gi()),r=!!n&&performance.now()<lr,l=r?2:a.perch,c=r&&n?n.x:a.x,d=r?"play":a.mood,g=d==="walk"?"stand":d==="nap"?"nap":"sit",p=g+t.coat+(l?"p":"");if(p!==co){const x=[...R.querySelectorAll(".bubble, .heart")];R.innerHTML=`<div class="inner">${Gn(t.coat,g)}</div>${g==="nap"?'<div class="zzz"><i>z</i><i>z</i><i>z</i></div>':""}`;for(const f of x)R.appendChild(f);co=p}if(l>0&&Ai===0){R.classList.add("hop");const x=R;setTimeout(()=>x.classList.remove("hop"),420)}Ai=l,R.dataset.name=t.name,R.dataset.mood=d,R.dataset.perch=String(l),R.dataset.leap=r?"1":"0",R.dataset.curl=a.curl?"1":"0",R.classList.toggle("walking",d==="walk"),R.classList.toggle("groom",d==="groom"),R.classList.toggle("play",d==="play"&&!r),R.classList.toggle("leap",r),R.classList.toggle("flipped",a.flip),R.classList.toggle("curl",a.curl===1),Be.querySelectorAll(".item.toy-live").forEach(x=>x.classList.remove("toy-live")),n&&d==="play"&&l&&!r&&Be.querySelector(`.item[data-id="${n.id}"]`)?.classList.add("toy-live");const m=window.__pinCat,v=!!(m&&Number.isFinite(m.x)),$=!v&&l&&n?Af(n.y,i,l):!v&&a.curl&&s?s.y-s.h*(s.pet?.38:.2):cw;os(R,v?m.x:c,$,!v&&l?110:150,!v&&l?92:128),R.style.zIndex=String(4e3+Math.round($)),wo={x:v?m.x:c,perch:l,leap:r}}function hd(){if(!R)return;M.purr(),setTimeout(()=>M.meow(),250),R.querySelector(".bubble")?.remove();const e=document.createElement("div");e.className="bubble petBubble",e.textContent=`${R.dataset.name} purrs ♥`,R.appendChild(e),is(),setTimeout(()=>e.classList.add("out"),1500),setTimeout(()=>e.remove(),1900),R.classList.remove("happy"),R.offsetWidth,R.classList.add("happy");for(let t=0;t<5;t++){const n=document.createElement("div");n.className="heart",n.textContent="♥",n.style.left=20+Math.random()*60+"%",n.style.animationDelay=t*.12+"s",n.style.color=["#ff6b9a","#ff8fab","#e879c6"][t%3],R.appendChild(n),setTimeout(()=>n.remove(),1800)}}function hw(e,t){if(t.k==="zoo"||t.k==="apple"||t.k==="honk"||t.k==="hen"){Bw(t);return}t.k==="trick"?ld(t.owner,t.v):t.k==="purr"?L==="house"&&hd():t.k==="leap"?L==="house"&&(lr=performance.now()+900):t.k==="ball"?rd(e,t.x,t.y):t.k==="splash"&&id(t.x)}function pd(e){const t=Math.min(.05,Math.max(0,(e-kl)/1e3));kl=e;try{ew(e,t),lw(),fw(),Ww(e,t),r8(t),lc()}catch{}requestAnimationFrame(pd)}function pw(){return u?u.view(u.myHouseId())?.cat??null:F.get().cat??null}function cr(){return u?u.players.get(u.pid)?.dog??null:F.get().dog??null}function bs(e){if(u){const t=u.myHouseId();t&&u.dispatch(t,e)}else F.dispatch(e)}const qo=()=>L==="house"&&(!u||Ie===F||ge===u.myHouseId());function uw(e="cat"){const t=pw(),n=cr(),s=F.get().characters,o={tab:e,coat:t?.coat??0,catName:t?.name??"",breed:n?.breed??0,dogName:n?.name??"",owner:n?.owner??s[0]?.id,err:"",bye:!1},i=et("",(l,c)=>{const d=m=>l.closest(`[${m}]`)?.getAttribute(m);if(d("data-pt")){o.tab=d("data-pt"),o.err="",o.bye=!1,r();return}if(d("data-coat")!=null){o.coat=+d("data-coat"),M.click(),r();return}if(d("data-breed")!=null){o.breed=+d("data-breed"),M.click(),r();return}if(d("data-cname")){o.catName=d("data-cname"),M.click(),r();return}if(d("data-dname")){o.dogName=d("data-dname"),M.click(),r();return}if(d("data-owner")){o.owner=d("data-owner"),M.click(),r();return}const g=d("data-pa");if(!g)return;const p=(i.root.querySelector("#petName")?.value??"").trim();if(g==="adoptCat"||g==="adoptDog"){const m=p||(g==="adoptCat"?o.catName:o.dogName),v=Wf(m);if(!v){o.err=m?"Hmm, try a different name!":"Pick a name first!",M.pop(),r();return}if(g==="adoptCat"){const $=qo(),x={name:v,coat:o.coat,room:$?B.get().currentRoom:t?.room??"living",x:$?Math.max(200,Math.min(le-200,Z+ie/2)):t?.x??1200};bs({type:"cat/set",cat:x}),M.meow(),c(),Q(t?`${v} looks great! 🐱`:$?`${v} moved in! 🐱`:`${v} is waiting at your house! 🐱`)}else{const $=u?{name:v,breed:o.breed}:{name:v,breed:o.breed,owner:o.owner};u?(u.setDog($),L==="park"&&Sn()):F.dispatch({type:"dog/set",dog:$}),M.woof(),c(),Q(n?`${v} looks great! 🐶`:`${v} is your new best friend! 🐶`)}return}if(g==="callCat"){bs({type:"cat/move",room:B.get().currentRoom,x:Math.max(200,Math.min(le-200,Z+ie/2))}),M.meow(),c();return}if(g==="kennelDog"){rr(),c();return}if(g==="bye"){if(!o.bye){o.bye=!0,r();return}o.tab==="cat"?bs({type:"cat/set",cat:null}):(bs({type:"dog/kennel",item:null}),u?u.setDog(null):F.dispatch({type:"dog/set",dog:null})),c(),Q("They went to live with a kind friend 💛");return}},"wide pets"),a=i.root.querySelector(".card");function r(){const l=o.tab==="cat",c=l?t:n,d=l?Bf:Sf,g=l?o.catName:o.dogName,p=i.root.querySelector("#petName")?.value??"";a.innerHTML=`${tt}<h2>Pets</h2>
      <div class="petTabs"><button data-pt="cat" class="${l?"on":""}">🐱 Cat</button><button data-pt="dog" class="${l?"":"on"}">🐶 Dog</button></div>
      <p class="hint small">${l?u?"Your cat lives in your house. Friends can see her when they visit!":"Your cat lives in your house. She naps, purrs, and plays!":u?"Your dog follows you everywhere: the street, friends' houses, and the park!":"Your dog follows you around the house and to the park!"}</p>
      <div class="petRow"><div class="petPreview">${l?Gn(o.coat,"sit"):Ps(o.breed,"stand")}</div>
        <div class="swatches">${(l?Ki:Yi).map((m,v)=>`<button ${l?"data-coat":"data-breed"}="${v}" class="${v===(l?o.coat:o.breed)?"on":""}"><div>${l?Gn(v,"sit"):Ps(v,"stand")}</div><span>${m.name}</span></button>`).join("")}</div></div>
      <div class="label">Name</div>
      <div class="nameChips">${d.map(m=>`<button ${l?"data-cname":"data-dname"}="${m}" class="${m===g?"on":""}">${m}</button>`).join("")}</div>
      <input id="petName" class="petName" maxlength="14" autocomplete="off" placeholder="…or type a name" value="${j(p)}"/>
      ${o.err?`<p class="err" id="petErr">${j(o.err)}</p>`:""}
      ${!l&&!u&&s.length>1?`<div class="label">Who does your dog follow?</div><div class="walkers">${s.map(m=>`<button data-owner="${m.id}" class="${m.id===o.owner?"on":""}">${We(m)}</button>`).join("")}</div>`:""}
      <div class="petBtns"><button class="go" data-pa="${l?"adoptCat":"adoptDog"}" id="adoptBtn">${c?"Save":"Adopt! 💛"}</button>
        ${l&&t&&qo()?'<button data-pa="callCat" id="callCat">Here, kitty!</button>':""}
        ${!l&&n?`<button data-pa="kennelDog" id="kennelDog">${vi(ar())?"Come, puppy!":"Kennel"}</button>`:""}
        ${c?`<button class="danger" data-pa="bye">${o.bye?"Tap again to say goodbye":"Find a new home"}</button>`:""}</div>`}r()}_("btnPets").addEventListener("click",()=>uw(L==="house"?"cat":"dog"));requestAnimationFrame(pd);window.__pets=()=>{const e=cd(),t=e?vs.get(e.key):void 0;return{dogs:[...Ft.keys()],dogPos:Object.fromEntries([...Ft].map(([n,s])=>[n,{x:Math.round(s.x),y:Math.round(s.y)}])),cat:R?{mood:R.dataset.mood,name:R.dataset.name,perch:wo.perch,x:Math.round(wo.x),leap:wo.leap,curl:R.dataset.curl==="1"}:null,kennel:e&&t?{x:Math.round(t.x),y:Math.round(t.y),pose:t.pose,name:e.dog.name,item:e.item.id}:null,dogKennel:B.get().dogKennel??null,fetch:se?.phase??null,ball:Zt,view:L}};function Ne(){return _("ranch").clientHeight/Ns}let Ue=[];const zs=e=>String(100+Math.round(e)),ud=220,mw=ud*130/160,md=156,yw=md*130/160,kw=.6,vw=3.5,bw=3,va=10,Xt=new Map,$o=new Map;function No(e,t,n=va){const s=(e-Me.x)/(Me.rx+n),o=(t-Me.y)/(Me.ry+n);return s*s+o*o<1}function Di(e,t,n,s){for(let o=0;o<=18;o++){const i=o/18;if(No(e+(n-e)*i,t+(s-t)*i))return!0}return!1}function jo(e,t){return{x:Math.max(70,Math.min(gr()-70,e)),y:Math.max(_n,Math.min(Pt,t))}}function ww(e,t){const n=jo(t.x,t.y);if(No(n.x,n.y,6))return null;if(!Di(e.x,e.y,n.x,n.y))return[n];const s=Me.x-Me.rx-va-28,o=Me.x+Me.rx+va+28;let i=null,a=1/0;for(const r of[_n+1,Pt-2]){const l=[];let c=e.x,d=e.y;const g=(x,f)=>{const h=jo(x,f);l.push(h),c=h.x,d=h.y};Di(c,d,c,r)&&g(c<Me.x?s:o,d),Math.abs(d-r)>3&&g(c,r),Math.abs(c-n.x)>3&&g(n.x,r),l.push(n);let p=!0,m=e.x,v=e.y,$=0;for(const x of l){if(Di(m,v,x.x,x.y)||No(x.x,x.y,4)){p=!1;break}$+=Math.hypot(x.x-m,x.y-v),m=x.x,v=x.y}p&&$<a&&(i=l,a=$)}return i}function yd(e,t){const n=ct();if(!n)return;const s={x:Math.max(60,Math.min(gr()-60,e)),y:Math.max(_n,Math.min(Pt,t))};if(n.ride!==void 0&&n.where==="ranch"){const o=ww(n,s);if(!o){Q("The horse won't splash through the pond!"),M.pop();return}Ue=o}else Ue=[s]}function $w(e){if(e.look2)return O4(e.look2);const t=e.pants,n="#5a3d5c",s=(o,i,a,r)=>`<path class="${o}" d="${i}" fill="none" stroke="${n}" stroke-width="${a}" stroke-linecap="round"/><path class="${o} cloth" d="${i}" fill="none" stroke="${t}" stroke-width="${r}" stroke-linecap="round"/>`;return`<svg class="rideleg" viewBox="0 0 160 130">${s("thigh","M66 56 L102 66",13,8)}${s("shin","M102 68 L106 104",12,7.2)}<circle class="knee" cx="102" cy="67" r="6.2" fill="${t}" stroke="${n}" stroke-width="3.5"/><ellipse class="shoe" cx="116" cy="106" rx="11" ry="5.2" fill="${n}"/></svg>`}function Jt(){return document.body.classList.contains("phone")&&document.body.classList.contains("phone-portrait")&&!re}function bi(){if(!Jt())return Ml.map((t,n)=>n);const e=[0,2,4];for(const t of Yt("ranch")){const n=t.p.ride;n!==void 0&&e.indexOf(n)<0&&e.push(n)}return e}function on(e){if(!Jt())return Ml[e];const t=bi(),n=t.indexOf(e),s=t.length,o=n<0?0:n,i=dr().w/2,a=2400+i+18,r=3080-i-18;return s<=1?Math.round((a+r)/2):Math.round(a+(r-a)*o/(s-1))}function dr(){return Jt()?{w:131,h:106}:{w:150,h:122}}function Zo(e,t,n){const s=Ne(),{w:o,h:i}=dr();e.style.left=(t-o/2)*s+"px",e.style.top=(n-i)*s+"px",e.style.width=o*s+"px",e.style.height=i*s+"px",e.style.zIndex=zs(n)}function _w(){if(L!=="ranch"||re||!document.body.classList.contains("phone"))return;const e=new Set(bi());document.querySelectorAll("#ranchWorld .horse").forEach(t=>{const n=+t.dataset.horse;t.classList.toggle("stallOff",Jt()&&!e.has(n)),!(!e.has(n)||Xt.has(n)||t.classList.contains("away"))&&Zo(t,on(n),xn)})}function xw(e,t,n){if(Xt.has(e)||Math.hypot(t-on(e),n-xn)<26)return;Xt.set(e,{x:t,y:n});const s=document.querySelector(`#ranchWorld .horse[data-horse="${e}"]`);s&&(s.classList.add("trotting"),s.classList.remove("away"),s.classList.toggle("flipped",on(e)<t),Zo(s,t,n))}function Mw(e,t,n){const s=n?-1:1;for(const o of[s*118,-s*118,s*160,-s*78])for(const i of[0,30,-26,48]){const a=jo(e+o,t+i);if(!(Math.hypot(a.x-e,a.y-t)<50)&&!No(a.x,a.y,8))return a}return jo(e,t)}let wl=0,kd=0;const wi=()=>u?u.now():Date.now(),$i=()=>Wa(u?u.ranch.plots:F.get().garden),Gs=()=>Sa(u?u.players.get(u.pid)?.basket:F.get().basket),gr=()=>re?Ca:Ds,vd=()=>re?"barn":"ranch",bd=()=>{const e=new Map;for(const t of Yt("ranch"))t.p.ride!==void 0&&e.set(t.p.ride,t);return e};function ba(e){const t={taken:"A friend just planted there!",wet:"Already watered 💧",notReady:"Still growing! 🌱",full:"Your basket is full!",slow:"The hen is laying… try again!",none:"Your basket has none left",nohouse:"Go home to put it in your room"};t[e]&&(Q(t[e]),M.pop())}function Fn(e){if(u){const o=qi($i(),Gs(),e,wi(),e.op==="egg"?wl:0);return typeof o=="string"?(ba(o),!1):(e.op==="egg"&&(wl=Date.now()),u.ranchOp(e),!0)}const t=F.get(),n=Date.now(),s=qi(Wa(t.garden),Sa(t.basket),e,n,t.lastEgg??0);return typeof s=="string"?(ba(s),!1):(F.dispatch({type:"ranch/op",op:e,now:n}),_i(!0),pr(),!0)}function Rs(e=!1){const t=L==="ranch"&&re&&!e;Pn(),_("ranch").classList.remove("hidden"),se=null,Ue=[],L="ranch",re=e;const n=e?{where:"barn",x:170,y:560,flip:!1}:{where:"ranch",x:t?Ss:130,y:t?520:565,flip:!1};u?Ce(n):Oe=n,_("streetTitle").textContent=e?"The Barn":"Rainbow Ranch",bt(),fr(),requestAnimationFrame(()=>{const s=_("ranchScroll"),o=Ne();s.scrollLeft=t?Math.max(0,Ss*o-s.clientWidth/2):0,$a()}),setTimeout($a,650),Vs(_("ranch")),e?M.swish():M.sparkle()}_("btnHopOff").addEventListener("click",()=>wd());function fr(){const e=Ne(),t=_("ranchWorld"),n=o=>o*e+"px",s=(o,i,a,r)=>`left:${n(o-a/2)};top:${n(i-r)};width:${n(a)};height:${n(r)};z-index:${zs(i)}`;if(t.style.width=gr()*e+"px",t.style.height=Ns*e+"px",t.style.setProperty("--sc",String(e)),re){t.innerHTML=b6()+`<button class="rprop barnExit" data-r="exit" aria-label="Go outside" style="${s(127,444,206,244)}"><span class="exitHint"><span>Outside ☀️</span></span></button>`+mn.map((o,i)=>`<button class="animal" data-animal="${i}" aria-label="${gc[i].name}" style="${s(Ba[i],lg+30,128,107)}">${ra(i)}</button>`).join("")+[300,1244].map(o=>["carrot","apple","hay"].map((i,a)=>`<button class="bucket" data-feed="${i}" aria-label="${i} bucket" style="${s(o+a*56,592,54,62)}">${h6(i)}</button>`).join("")).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',en(),be();return}t.innerHTML=a6()+r6().replace("<svg ",`<svg style="z-index:${zs(l6)}" `)+`<button class="rprop barnDoor" data-r="barn" aria-label="Go into the barn" style="${s(Ss,472,150,150)}"><span class="doorHint"><span>Petting zoo inside! 🐐</span></span></button><button class="rprop windmill" data-r="mill" aria-label="Windmill" style="${s(1540,478,150,240)}">${y6}</button><button class="rprop henHouse" data-r="egg" aria-label="Hen house" style="${s(715,482,180,170)}">${c6}</button><button class="rprop tractor" data-r="honk" aria-label="Tractor" style="${s(900,580,170,130)}">${d6}</button><button class="rprop appleTree" data-r="apple" aria-label="Apple tree" style="${s(2085,482,240,300)}">${g6}</button>`+cg.map((o,i)=>{const a=dr();return`<button class="horse${Jt()&&bi().indexOf(i)<0?" stallOff":""}" data-horse="${i}" aria-label="${Qo[i].name} horse" style="${s(on(i),xn,a.w,a.h)}">${Oa(i)}</button>`}).join("")+Array.from({length:Oi},(o,i)=>`<button class="plot" data-plot="${i}" aria-label="Garden plot" style="${s(gg(i),594,66,86)}"></button>`).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',_i(!0),en(),be()}const go=[];function _i(e=!1){if(L!=="ranch"||re)return;const t=$i(),n=wi();document.querySelectorAll("#ranchWorld .plot").forEach(s=>{const o=+s.dataset.plot,i=t[o]??null,a=si(i,n),r=JSON.stringify(i)+a;!e&&go[o]===r||(go[o]!==void 0&&go[o]!==r&&a>0&&(s.classList.remove("grow"),s.offsetWidth,s.classList.add("grow")),go[o]=r,s.innerHTML=pc(i,a,o),s.dataset.stage=i?String(a):"empty")})}function en(){const e=document.getElementById("ravatars");if(!e||L!=="ranch")return;const t=Ne(),n=new Set,s=new Set;let o=!1;for(const i of Yt(vd())){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&od(a));const r=JSON.stringify(i.look)+i.name;if(a.dataset.look!==r){const m=a.querySelector(".bubble");a.innerHTML=i.name?er(i.look,i.name):`<div class="inner">${We(i.look)}</div>`,m&&a.appendChild(m),a.dataset.look=r,a.dataset.ride=""}const l=i.p.ride,c=(qs[i.look.size]??1)*t*.95*(l!==void 0?kw:1),d=rn*c,g=kt*c;if(a.dataset.ride!==String(l??"")&&(a.querySelector(".mount")?.remove(),l!==void 0&&a.insertAdjacentHTML("afterbegin",`<div class="mount" data-mount="${l}">${Oa(l,!0)}${$w(i.look)}</div>`),a.dataset.ride=String(l??"")),a.classList.toggle("riding",l!==void 0),l!==void 0){s.add(l),i.mine&&(o=!0),$o.set(l,{x:i.p.x,y:i.p.y});const m=Jt()?md:ud,v=Jt()?yw:mw,$=m*t,x=v*t,f=a.querySelector(".mount");f.style.width=$+"px",f.style.height=x+"px",f.style.left=(d-$)/2+"px",f.style.top=g-x+"px";const h=Number(a.querySelector(".shirt")?.getAttribute("data-hem")??126),b=Number(f.querySelector(".saddle")?.getAttribute("data-top")??43),W=(h+vw/2)/160*g,P=g-x+(b-bw/2)/130*x;a.style.setProperty("--lift",W-P+"px");const D=f.querySelector(".rideleg");D&&(D.style.left="0",D.style.top="0",D.style.width="100%",D.style.height="100%")}else a.style.removeProperty("--lift");const p=parseFloat(a.dataset.lx??"NaN");Number.isFinite(p)&&Math.abs(p-i.p.x)>2&&(a.classList.add("moving"),clearTimeout(+(a.dataset.mt??0)),a.dataset.mt=String(window.setTimeout(()=>a.classList.remove("moving"),260))),a.dataset.lx=String(i.p.x),a.style.left=i.p.x*t-d/2+"px",a.style.top=i.p.y*t-g+"px",a.style.width=d+"px",a.style.height=g+"px",a.style.zIndex=zs(i.p.y),a.classList.toggle("flipped",i.p.flip),Is(a,i.look,i.mine)}if(e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),document.body.classList.contains("phone")){const i=new Set(bi());document.querySelectorAll("#ranchWorld .horse").forEach(a=>{a.classList.toggle("stallOff",Jt()&&!i.has(+a.dataset.horse))})}document.querySelectorAll("#ranchWorld .horse").forEach(i=>{const a=+i.dataset.horse;s.has(a)?(i.classList.add("away"),Xt.delete(a)):i.classList.remove("away")});for(const[i,a]of[...$o])s.has(i)||(xw(i,a.x,a.y),$o.delete(i));document.body.classList.toggle("riding",o),Tn()}function Lw(e){const t=ct();if(!t||t.where!=="ranch")return;const n=bd().get(e);if(n&&!n.mine){Q("Someone is riding!"),M.pop();return}if(t.ride!==void 0){if(n?.mine||t.ride===e){wd();return}yd(on(e),Math.min(Pt,xn+8));return}Ue=[],Xt.delete(e),at({where:"ranch",x:on(e),y:Math.min(Pt,xn+8),flip:!1,ride:e}),M.neigh(),Q(`You're riding ${Qo[e].name}! Tap the ground to gallop 🐴`)}function wd(){const e=ct();if(!e||e.ride===void 0)return;const t=e.ride,{ride:n,...s}=e;Ue=[];const o=Mw(s.x,s.y,s.flip);$o.set(t,{x:s.x,y:s.y}),at({...s,x:o.x,y:o.y}),M.drop()}function hr(e,t){const n=e<mn.length?document.querySelector(`#ranchWorld .animal[data-animal="${e}"]`):document.querySelector(`#ranchWorld .horse[data-horse="${e-mn.length}"]:not(.away)`)??document.querySelector(`#ravatars .mount[data-mount="${e-mn.length}"]`);if(!n||L!=="ranch")return;const s=e>=mn.length,o=s?{say:"Neigh! ♥",snd:"neigh"}:gc[e];n.classList.remove("hop","munch"),n.offsetWidth,n.classList.add(t?"munch":"hop"),setTimeout(()=>n.classList.remove("hop","munch"),1400),n.querySelector(".abubble")?.remove();const i=document.createElement("div");i.className="bubble petBubble abubble",i.textContent=t?`Yum! Munch munch ${t===1?"🥕":t===2?"🍎":"🌾"}`:o.say,n.appendChild(i),is(),setTimeout(()=>i.classList.add("out"),1400),setTimeout(()=>i.remove(),1800);for(let a=0;a<(t?6:4);a++){const r=document.createElement("div");r.className="heart",r.textContent="♥",r.style.left=15+Math.random()*70+"%",r.style.animationDelay=a*.12+"s",r.style.color=["#ff6b9a","#ff8fab","#e879c6","#b197fc"][a%4],n.appendChild(r),setTimeout(()=>r.remove(),1900)}M[o.snd]?.(),t&&setTimeout(()=>M.munch(),250)}function $d(){const e=document.querySelector("#ranchWorld .henHouse");e&&(e.classList.remove("lay"),e.offsetWidth,e.classList.add("lay"),M.cluck())}function Cw(){const e=document.querySelector("#ranchWorld .henHouse"),t=_("basketChip");if(!e)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=document.createElement("div");o.className="flyEgg",o.innerHTML=Us,document.body.appendChild(o),Object.assign(o.style,{left:n.left+n.width/2-18+"px",top:n.top+n.height*.6+"px"}),requestAnimationFrame(()=>{o.style.left=s.left+s.width/2-18+"px",o.style.top=s.top+"px",o.style.transform="scale(.6) rotate(200deg)"}),setTimeout(()=>{o.remove(),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")},650)}function _d(e){const t=document.getElementById("rfx");if(!t||L!=="ranch")return;const n=Ne(),[s,o]=Kr[e]??Kr[0],i=1965+s,a=182+o,r=i+(e%2?26:-22),l=575+e*4,c=document.createElement("button");c.className="fallenApple",c.dataset.feed="apple",c.setAttribute("aria-label","Apple"),c.innerHTML=fc;const d=32*n;Object.assign(c.style,{width:d+"px",height:d+"px",left:i*n-d/2+"px",top:a*n-d/2+"px",zIndex:zs(l)}),t.appendChild(c),requestAnimationFrame(()=>{c.style.left=r*n-d/2+"px",c.style.top=l*n-d+"px",c.classList.add("fallen")});const g=document.querySelector("#ranchWorld .appleTree");g?.classList.remove("shake"),g?.offsetWidth,g?.classList.add("shake"),M.boing(),setTimeout(()=>c.remove(),12e3)}function xd(){const e=document.querySelector("#ranchWorld .tractor");e?.classList.remove("bounce"),e?.offsetWidth,e?.classList.add("bounce"),M.honk()}function Bw(e){e.k==="zoo"?hr(e.a,e.f):e.k==="apple"?_d(e.v):e.k==="honk"?xd():e.k==="hen"&&$d()}function $l(e,t){const n=document.elementFromPoint(e,t);if(!n)return null;const s=n.closest("[data-animal]");if(s)return+s.dataset.animal;const o=n.closest(".horse:not(.away)");if(o)return mn.length+ +o.dataset.horse;const i=n.closest(".savatar.riding");return i?.dataset.ride?mn.length+ +i.dataset.ride:null}function wa(e,t,n){e.preventDefault(),e.stopPropagation();const s=document.createElement("div");s.className="feedGhost",s.innerHTML=hc[t],document.body.appendChild(s);const o=v=>{s.style.left=v.clientX-30+"px",s.style.top=v.clientY-50+"px"};o(e),M.pick();let i=0;const a=e.clientX,r=e.clientY;n instanceof HTMLElement&&(n.style.visibility="hidden");let l=e.clientX,c=0;const d=_("ranchScroll"),g=()=>{const v=d.getBoundingClientRect(),$=l<v.left+60?-12:l>v.right-60?12:0;$&&i>12&&L==="ranch"&&(d.scrollLeft+=$),c=requestAnimationFrame(g)};c=requestAnimationFrame(g);const p=v=>{if(v.pointerId!==e.pointerId)return;l=v.clientX,i=Math.max(i,Math.hypot(v.clientX-a,v.clientY-r)),o(v),document.querySelectorAll(".feedHover").forEach(x=>x.classList.remove("feedHover")),$l(v.clientX,v.clientY)!==null&&document.elementFromPoint(v.clientX,v.clientY)?.closest(".animal, .horse, .savatar")?.classList.add("feedHover")},m=v=>{if(v.pointerId!==e.pointerId)return;cancelAnimationFrame(c),window.removeEventListener("pointermove",p),window.removeEventListener("pointerup",m),s.remove(),kd=Date.now(),document.querySelectorAll(".feedHover").forEach(f=>f.classList.remove("feedHover"));const $=$l(v.clientX,v.clientY);if($===null){n instanceof HTMLElement&&(n.style.visibility=""),i<12?Q("Drag the food onto an animal! 🥕"):M.drop();return}if(n==="basket"&&!Fn({op:"use",kind:"carrot"}))return;n instanceof HTMLElement&&n.remove();const x=dg.indexOf(t);hr($,x),u?.fx({k:"zoo",a:$,f:x})};window.addEventListener("pointermove",p),window.addEventListener("pointerup",m)}_("ranchWorld").addEventListener("pointerdown",e=>{const t=e.target,n=t.closest(".bucket");if(n)return wa(e,n.dataset.feed,"bucket");const s=t.closest(".fallenApple");if(s)return wa(e,"apple",s);t.closest(".rprop, .animal, .horse, .plot, .pet")&&e.stopPropagation()});_("ranchWorld").addEventListener("click",e=>{const t=e.target;if(!ct()||L!=="ranch"||Date.now()-kd<400)return;const s=t.closest("[data-animal]");if(s){const g=+s.dataset.animal;hr(g,0),u?.fx({k:"zoo",a:g,f:0});return}const o=t.closest("[data-horse]");if(o){Lw(+o.dataset.horse);return}const i=t.closest("[data-r]")?.dataset.r;if(i==="egg"){$d(),Fn({op:"egg"})&&(Cw(),M.pickup());return}if(i==="honk"){xd(),u?.fx({k:"honk"});return}if(i==="apple"){const g=Math.floor(Math.random()*4);_d(g),u?.fx({k:"apple",v:g});return}if(i==="barn"){Rs(!0);return}if(i==="exit"){Rs(!1);return}if(i==="mill"){const g=t.closest(".windmill");g?.classList.remove("whirl"),g?.offsetWidth,g?.classList.add("whirl"),M.swish();return}const a=t.closest("[data-plot]");if(a){Sw(+a.dataset.plot,a);return}if(t.closest(".bucket, .fallenApple, .savatar, .pet"))return;const r=_("ranchWorld").getBoundingClientRect(),l=Ne(),c=(e.clientX-r.left)/l,d=(e.clientY-r.top)/l;d<400||yd(c,d)});function Sw(e,t){const n=$i()[e]??null,s=si(n,wi());if(document.querySelector(".seedPick")?.remove(),!n){const o=document.createElement("div");o.className="seedPick",o.innerHTML=`<button data-seed="carrot">${fi}<span>Carrot</span></button><button data-seed="flower">${Ia()}<span>Flower</span></button>`,t.parentElement.appendChild(o),o.style.left=t.offsetLeft+t.offsetWidth/2+"px",o.style.top=t.offsetTop-8+"px",o.addEventListener("pointerdown",i=>i.stopPropagation()),o.addEventListener("click",i=>{i.stopPropagation();const a=i.target.closest("[data-seed]")?.dataset.seed;o.remove(),a&&Fn({op:"plant",i:e,seed:a})&&(M.plant(),Q("Planted! Now tap it to water 💧"))}),setTimeout(()=>o.remove(),6e3);return}if(!n.wet){Fn({op:"water",i:e})&&(M.water(),t.classList.remove("watering"),t.offsetWidth,t.classList.add("watering"));return}if(s<3){Q("Still growing! 🌱"),M.pop();return}Fn({op:"pick",i:e})&&(M.pickup(),Q(n.seed==="carrot"?"A carrot for your basket! 🥕":"Pretty flowers for your basket! 🌸"))}let _l=0;function Ww(e,t){if(L!=="ranch")return;const n=Date.now();if(document.querySelectorAll("#ranchWorld .animal").forEach(s=>{const o=+s.dataset.animal,i=Ne(),a=n/5200+o*1.7,r=(re?Ba:rg)[o]+Math.sin(a)*32;s.style.left=(r-s.offsetWidth/i/2)*i+"px",s.classList.toggle("flipped",Math.cos(a)<0),s.classList.toggle("walking",Math.abs(Math.cos(a))>.35)}),e-_l>1e3&&(_l=e,_i()),Ue.length){const s=ct();if(!s||s.where!==vd())Ue=[];else{const o=Ue[0],i=s.ride!==void 0?720:300,a=o.x-s.x,r=o.y-s.y,l=Math.hypot(a,r);if(l<6)Ue.shift();else{const c=Math.min(l,i*t),d={...s,x:s.x+a/l*c,y:s.y+r/l*c,flip:Math.abs(a)>2?a<0:s.flip};at(d);const g=Ne(),p=_("ranchScroll"),m=d.x*g-p.scrollLeft;m>-40&&m<p.clientWidth+40&&(m<p.clientWidth*.2||m>p.clientWidth*.8)&&(p.scrollLeft=d.x*g-p.clientWidth/2)}}}for(const[s,o]of Xt){const i=document.querySelector(`#ranchWorld .horse[data-horse="${s}"]`);if(!i||i.classList.contains("away")){Xt.delete(s);continue}const a=on(s)-o.x,r=xn-o.y,l=Math.hypot(a,r);if(l<8){Xt.delete(s),i.classList.remove("trotting","flipped"),Zo(i,on(s),xn);continue}const c=Math.min(l,460*t);o.x+=a/l*c,o.y+=r/l*c,i.classList.add("trotting"),i.classList.toggle("flipped",a<0),Zo(i,o.x,o.y)}}function pr(){const e=document.getElementById("basketChip");if(!e)return;const t=L==="ranch"||L==="house"&&(!u||Ie===F||ge===u.myHouseId()),n=Gs(),s=n.egg+n.carrot+n.flower>0;e.classList.toggle("hidden",!t||L==="house"&&!s),e.classList.toggle("inHouse",L==="house"),t&&(e.innerHTML=`<span class="bIcon">${p6}</span><span class="bcount" data-kind="egg">${Us}<b>${n.egg}</b></span><span class="bcount" data-kind="carrot">${fi}<b>${n.carrot}</b></span><span class="bcount" data-kind="flower">${Ia()}<b>${n.flower}</b></span>`)}_("basketChip").addEventListener("pointerdown",e=>{e.target.closest('.bcount[data-kind="carrot"]')&&L==="ranch"&&Gs().carrot>0&&wa(e,"carrot","basket")});_("basketChip").addEventListener("click",()=>Tw());function Tw(){const e=L==="house"&&(!u||Ie===F||ge===u.myHouseId()),t={egg:["Eggs",Us],carrot:["Carrots",fi],flower:["Flowers",Ia()]},n=et("",(o,i)=>{const a=o.closest("[data-take]")?.dataset.take;if(!a)return;if(!e){Q("Take it home to put it in your room! 🏠");return}const r="r"+Math.random().toString(36).slice(2,10),l=Math.max(120,Math.min(le-120,Z+ie/2+(Math.random()-.5)*300));Fn({op:"take",kind:a,id:r,room:B.get().currentRoom,x:l})&&(M.drop(),i(),Q("It's in your room! Drag it to a hand to carry it ✋"))},"basketSheet"),s=Gs();n.root.querySelector(".card").innerHTML=`${tt}<h2>My Basket</h2><p class="hint small">${e?"Tap one to put it in your room.":"Collect eggs, carrots and flowers at Rainbow Ranch, then take them home!"}</p>
    <div class="basketRows">${Ll.map(o=>`<button class="bRow" data-take="${o}" ${s[o]?"":"disabled"}>${t[o][1]}<b>${s[o]}</b><span>${t[o][0]}</span></button>`).join("")}</div>`}window.__ranch=()=>({view:L,inBarn:re,plots:$i().map(e=>e?{seed:e.seed,stage:si(e,wi()),wet:!!e.wet}:null),basket:Gs(),me:ct(),ridden:[...bd().keys()]});function Pw(){if(ys.kind==="none")return;D6(),et(O6(ys.kind,ys.entries),(t,n)=>{t.closest("#wnGo")&&(M.sparkle(),n())},"whatsNew "+ys.kind).root.querySelector(".card").insertAdjacentHTML("afterbegin",tt)}setTimeout(Pw,500);window.__whatsnew=ys;window.__hood=()=>u;window.__hood_url=()=>ai();window.__ui=()=>({view:L,currentHouseId:ge,mode:u?"hood":"solo",play:nt.mode()});s8({hood:()=>u,view:()=>L,solo:()=>Oe,myPres:ae,setPres:at,toast:Q,refreshNear:Tn,sfx:M,goMap:Zn,soloLook:()=>{const e=F.get();return{look:Os(e.characters[0]??{}),dog:e.dog??null}}});function Md(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n.items)t.add(s.kind);for(const n of e.characters)n.held.left&&t.add(n.held.left.kind),n.held.right&&t.add(n.held.right.kind);return[...t]}let fo=null;function Ld(e){return fo||(fo=_a(()=>import("./load-ChIqZPr4.js"),[]).then(t=>t.boot(location.search,Md(B.get()))).then(t=>{for(let n=0;n<t.length;n++)if(Se[t[n]]){Cn(),qe();return}}),fo)}function Uw(e){const t=new Set(e),n=B.get();let s=!1;for(const o of n.rooms[n.currentRoom].items){const i=Se[o.kind];if(!t.has(o.kind)||!i)continue;const a=Be.querySelector(`.item[data-id="${o.id}"] .inner`);!a||a.querySelector("img.artimg")||(a.innerHTML=$n(i,!0),s=!0)}s&&(it.forEach(o=>{delete o.dataset.held}),Ut(n),qe())}function Hw(){return _a(()=>import("./load-ChIqZPr4.js"),[]).then(e=>e.boot(location.search,Md(B.get()))).then(e=>{Uw(e.filter(t=>!!Se[t]))})}Kb();X4();Cn();qe();ss();requestAnimationFrame(ss);Ld(B.get().currentRoom);const Cd=()=>{const e=li().size,t=Uo.length,n=_("secrets");n.innerHTML=`<span class="secGift">🎁</span><span class="secWord"> Surprises: </span><span class="secCount">${e}/${t}</span>`,n.setAttribute("aria-label",`Surprises, ${e} of ${t}`),Hc()};function $a(){if(L!=="ranch"||re)return;const e=_("ranchScroll"),t=document.querySelector(".doorHint");if(!t||!e.clientWidth)return;const n=Ne(),s=14,o=e.clientWidth,i=t.offsetWidth,a=Math.max(0,Ss*n+i/2+s-o);if(e.scrollLeft<a){const r=ct(),l=r&&r.where==="ranch"?Math.max(0,r.x*n-60*n-s):a;e.scrollLeft=Math.min(a,l)}be(),Bd()}function Bd(){const e=document.querySelector(".doorHint"),t=document.getElementById("ranchScroll");if(!e||!t)return;const n=Ne(),s=Ss*n-t.scrollLeft,o=e.offsetWidth,i=12,a=s+o/2,r=s-o/2;let l=0;a>innerWidth-i&&(l-=a-(innerWidth-i)),r+l<i&&(l+=i-(r+l)),e.style.transform=`translateX(calc(-50% + ${l}px))`}const Sd=hh({world:Tc,roomW:le,roomH:Ye,currentRoom:()=>B.get().currentRoom,sparkle:()=>M.sparkle(),tap:()=>M.click(),onFound:(e,t)=>{if(Cd(),t){const n=_("secrets");n.classList.remove("pulse"),n.offsetWidth,n.classList.add("pulse"),setTimeout(()=>Q("🎁 A secret surprise appeared in your drawer!"),1400),qe()}}});B.subscribe((e,t)=>{(t.type==="room/switch"||t.type==="game/reset")&&Sd.update()});Cd();window.__eggs=()=>({found:[...li()]});q8();export{_a as _,Ew as r,Qw as s};
