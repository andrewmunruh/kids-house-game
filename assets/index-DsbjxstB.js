(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const gm="modulepreload",um=function(e){return"/kids-house-game/"+e},Uf={},h=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(n.map(l=>{if(l=um(l),l in Uf)return;Uf[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":gm,c||(f.as="script"),f.crossOrigin="",f.href=l,r&&f.setAttribute("nonce",r),document.head.appendChild(f),c)return new Promise((p,g)=>{f.addEventListener("load",p),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return o.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})},mm=150;function ym(e,t,n){const s=n.gap??mm,o=Math.max(n.minY,Math.min(n.maxY,e.y)),i=r=>Math.max(n.minX,Math.min(n.maxX,r)),a=r=>t.every(l=>Math.abs(l.x-r)>=s||Math.abs(l.y-o)>=s*.6);for(let r=0;r<=12;r++)for(const l of r?[1,-1]:[1]){const c=i(e.x+l*r*s*.6);if(a(c))return{x:c,y:o}}return{x:i(e.x),y:o}}const Pi="#5a3d5c",se=(e=4)=>`stroke="${Pi}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Ml=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],An=1e3,In=700,Ll="M 30 660 C 150 640, 200 540, 330 545 S 540 650, 690 600 S 925 470, 850 375 S 640 330, 520 355 S 270 385, 250 285 S 330 145, 480 150 S 700 200, 790 150",Nn={x:115,y:170},cn={x:880,y:120},fn={x:600,y:480},Zn={x:400,y:260},Zh=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${se(3)}/><circle cx="0" cy="-10" r="20" fill="${s}" ${se(3)}/><circle cx="-12" cy="-2" r="12" fill="${s}" ${se(3)}/><circle cx="12" cy="-3" r="13" fill="${s}" ${se(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`,xs=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})" fill="#fff"><ellipse cx="0" cy="10" rx="46" ry="22"/><ellipse cx="-36" cy="16" rx="28" ry="16"/><ellipse cx="38" cy="14" rx="30" ry="18"/><ellipse cx="10" cy="2" rx="24" ry="18"/></g>`,bi=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">${[0,72,144,216,288].map(o=>`<circle cx="${(Math.cos(o*Math.PI/180)*8).toFixed(1)}" cy="${(Math.sin(o*Math.PI/180)*8).toFixed(1)}" r="6.5" fill="${n}" ${se(2)}/>`).join("")}<circle r="4.5" fill="#ffd43b" ${se(2)}/></g>`,Fn=(e,t,n)=>`<g transform="translate(${e} ${t})">${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*4}" cy="${Math.sin(s*Math.PI/180)*4}" r="3.6" fill="${n}"/>`).join("")}<circle r="2.6" fill="#ffd43b"/></g>`;function bm(){return`<svg class="mapBg" viewBox="0 0 ${An} ${In}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${An}" height="${In}" rx="34" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="160" cy="420" rx="150" ry="90"/><ellipse cx="760" cy="250" rx="170" ry="70"/><ellipse cx="480" cy="640" rx="140" ry="50"/><ellipse cx="930" cy="600" rx="90" ry="110"/></g>
  <g fill="#93d78e" opacity=".7"><ellipse cx="420" cy="260" rx="70" ry="30"/><ellipse cx="80" cy="560" rx="60" ry="26"/><ellipse cx="700" cy="420" rx="50" ry="22"/></g>
  <!-- pond -->
  <ellipse cx="120" cy="470" rx="72" ry="40" fill="#8ecae6" ${se()}/><ellipse cx="108" cy="462" rx="42" ry="16" fill="#bde6f7"/><path d="M150 480 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <!-- side paths to the park and the ranch -->
  <path d="M250 285 Q190 250 150 215" fill="none" stroke="${Pi}" stroke-width="30" stroke-linecap="round"/><path d="M250 285 Q190 250 150 215" fill="none" stroke="#f2dcb8" stroke-width="22" stroke-linecap="round"/>
  <!-- the street -->
  <path d="${Ll}" fill="none" stroke="${Pi}" stroke-width="58" stroke-linecap="round"/>
  <path id="mapRoad" d="${Ll}" fill="none" stroke="#f2dcb8" stroke-width="48" stroke-linecap="round"/>
  <path d="${Ll}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 16" stroke-linecap="round" opacity=".9"/>
  <!-- town square -->
  <g transform="translate(${fn.x} ${fn.y})"><circle r="74" fill="#f7e6c8" ${se()}/><circle r="74" fill="none" stroke="#e6cfa6" stroke-width="10" stroke-dasharray="10 12" transform="scale(.82)"/>
    <circle r="30" fill="#bde6f7" ${se()}/><circle r="13" fill="#fff6e6" ${se(3)}/><path d="M0 -13 Q-8 -32 -16 -20 M0 -13 Q8 -32 16 -20 M0 -13 V-34" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>
    ${Fn(-52,-40,"#ff8fab")}${Fn(54,-38,"#b197fc")}${Fn(-56,40,"#ffd43b")}${Fn(52,44,"#ff8fab")}</g>
  ${[[60,330,"#ff8fab"],[300,470,"#b197fc"],[430,560,"#ffd43b"],[760,520,"#ff8fab"],[950,260,"#b197fc"],[600,260,"#ffd43b"],[380,90,"#ff8fab"],[40,120,"#b197fc"],[960,420,"#ffd43b"],[840,640,"#b197fc"],[210,620,"#ff8fab"]].map(([e,t,n])=>Fn(+e,+t,String(n))+Fn(+e+14,+t+8,String(n))).join("")}
  </svg>`}function Vf(e,t,n=An,s=In){const o=[];let i=7;const a=()=>(i=(i*9301+49297)%233280)/233280;for(let r=0;r<260&&o.length<34;r++){const l=30+a()*(n-60),c=40+a()*(s-70);t(l,c)||e.some(d=>Math.hypot(d.x-l,d.y-c)<d.r)||(e.push({x:l,y:c,r:46}),o.push(Zh(l,c,.75+a()*.45,["#5cc985","#4fbf7a","#78d39a"][r%3])))}return`<svg class="mapTrees" viewBox="0 0 ${n} ${s}" xmlns="http://www.w3.org/2000/svg">${o.join("")}</svg>`}function km(e,t){const n=e/2,s=`M ${n} 36 C ${n-36} ${t*.28}, ${n+28} ${t*.48}, ${n-8} ${t*.68} S ${n+18} ${t*.86}, ${n} ${t-28}`;return`<svg class="mapBg" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="${t}" rx="28" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="${e*.22}" cy="${t*.22}" rx="90" ry="48"/><ellipse cx="${e*.78}" cy="${t*.42}" rx="80" ry="40"/><ellipse cx="${e*.3}" cy="${t*.72}" rx="100" ry="46"/></g>
  <ellipse cx="78" cy="${t*.58}" rx="46" ry="28" fill="#8ecae6" ${se()}/><ellipse cx="70" cy="${t*.56}" rx="24" ry="10" fill="#bde6f7"/>
  <path d="${s}" fill="none" stroke="${Pi}" stroke-width="44" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#f2dcb8" stroke-width="34" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round" opacity=".9"/>
  ${[[40,250,"#ff8fab"],[500,280,"#b197fc"],[70,520,"#ffd43b"],[490,640,"#ff8fab"],[50,860,"#74c0fc"],[500,980,"#ffd43b"]].map(([o,i,a])=>Fn(+o,+i,String(a))+Fn(+o+16,+i+10,String(a))).join("")}
  </svg>`}const wm=(e,t,n=1,s="#4fbf7a")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="10" rx="28" ry="8" fill="#000" opacity=".08"/><circle cx="-14" cy="-2" r="16" fill="${s}" ${se(3)}/><circle cx="14" cy="0" r="18" fill="${s}" ${se(3)}/><circle cx="0" cy="-12" r="14" fill="${s}" ${se(3)}/><circle cx="-4" cy="-16" r="4" fill="#fff" opacity=".28"/></g>`,vm=(e,t,n="#ff8fab")=>`<g transform="translate(${e} ${t})"><ellipse cx="-7" cy="-2" rx="8" ry="5" fill="${n}" ${se(2)} transform="rotate(-24)"/><ellipse cx="7" cy="-2" rx="8" ry="5" fill="${n}" ${se(2)} transform="rotate(24)"/><ellipse cx="-6" cy="4" rx="6" ry="4" fill="#b197fc" ${se(1.6)} transform="rotate(18)"/><ellipse cx="6" cy="4" rx="6" ry="4" fill="#b197fc" ${se(1.6)} transform="rotate(-18)"/><path d="M0 -6 V8" ${se(2)}/></g>`;function _m(e,t,n){const s=e/2,o=(f,p,g)=>p>t*.4&&p<t-28&&Math.abs(f-s)>52&&!n.some(b=>Math.hypot(b.x-f,b.y-p)<b.r+g),i=[.07,.15,.22,.78,.85,.93],a=[.46,.54,.62,.7,.78,.86,.93],r=["#ff8fab","#b197fc","#ffd43b","#74c0fc","#69db7c"],l=[];let c=0;a.forEach((f,p)=>{i.forEach((g,b)=>{const m=Math.round(e*g+((p+b)%2?8:-6)),k=Math.round(t*f);if((p+b)%3===0){if(!o(m,k,34))return;l.push(wm(m,k,.85+b%2*.15,["#4fbf7a","#5cc985","#3dae6a"][(p+b)%3]))}else{if(!o(m,k,18))return;const y=r[(p*2+b)%r.length];l.push(bi(m,k,y,.85)),(p+b)%2===0&&o(m+18,k+12,14)&&l.push(bi(m+18,k+12,r[(p+b+2)%r.length],.7))}c++})});const d=[[e*.2,t*.5],[e*.8,t*.66],[e*.18,t*.84]];for(const[f,p]of d)o(f,p,16)&&l.push(vm(Math.round(f),Math.round(p),c%2?"#ffd43b":"#ff8fab"));return`<svg class="mapMeadowFill" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">${l.join("")}</svg>`}const $m=`<svg class="mapSkyArt" viewBox="0 0 900 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
  ${xs(280,28,1.05)}${xs(430,8,.8)}${xs(560,36,.95)}
  ${xs(250,88,.75)}${xs(390,108,1.05)}${xs(540,96,.85)}${xs(640,78,.7)}
  <g fill="none" stroke-linecap="round">
    ${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M300 ${118+t*6} A70 48 0 0 1 430 ${112+t*6}" stroke="${e}" stroke-width="5"/>`).join("")}
  </g>
</svg>`,xm=`<svg class="mapMeadowArt" viewBox="0 0 900 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <path d="M0 108 C 90 62 170 118 280 84 C 390 50 470 112 590 78 C 700 48 790 100 900 72 V 220 H0 Z" fill="#c9f2c4"/>
  <path d="M0 148 C 130 108 250 168 400 132 C 540 100 680 168 900 128 V 260 H0 Z" fill="#9be39a"/>
  <path d="M0 200 C 160 168 320 230 500 196 C 660 168 780 220 900 190 V 320 H0 Z" fill="#7dce78"/>
  <g stroke="#c99366" stroke-width="7" stroke-linecap="round">
    <path d="M16 168 H884"/><path d="M16 194 H884"/>
    ${Array.from({length:17},(e,t)=>`<path d="M${28+t*52} 146 V218"/>`).join("")}
  </g>
  <g stroke="#fff6e6" stroke-width="3" stroke-linecap="round" opacity=".9">
    <path d="M16 164 H884"/><path d="M16 190 H884"/>
  </g>
  ${[[48,188,"#ff8fab",.85],[120,176,"#ffd43b",.7],[200,198,"#b197fc",.9],[280,172,"#ff8fab",.75],[360,204,"#74c0fc",.8],[450,178,"#ffd43b",.85],[530,200,"#ff8fab",.75],[620,174,"#b197fc",.8],[700,196,"#69db7c",.7],[790,180,"#ffd43b",.85]].map(([e,t,n,s])=>bi(+e,+t,String(n),+s)).join("")}
  ${[[80,248,"#ff8fab"],[160,268,"#b197fc"],[250,242,"#ffd43b"],[340,274,"#ff8fab"],[430,250,"#74c0fc"],[520,270,"#b197fc"],[610,246,"#ffd43b"],[700,272,"#ff8fab"],[790,252,"#69db7c"]].map(([e,t,n])=>bi(+e,+t,String(n),1.05)).join("")}
  ${[[110,304,"#ffd43b"],[230,292,"#ff8fab"],[360,308,"#b197fc"],[490,294,"#74c0fc"],[620,306,"#ff8fab"],[750,296,"#ffd43b"]].map(([e,t,n])=>bi(+e,+t,String(n),.9)).join("")}
</svg>`,zf=`<svg viewBox="0 0 200 170"><ellipse class="parkLawn" cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${se()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${se(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${se(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${se(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${se(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${se(2.5)}/>
  ${Zh(40,66,1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${se(3)}/><path d="M178 88 V132" ${se(4)}/>
</svg>`,Qf=`<svg viewBox="0 0 220 180"><ellipse class="ranchGrass" cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${se()}/>
  ${Ml.map((e,t)=>`<path d="M${20+t*7} 120 A${90-t*7} ${84-t*7} 0 0 1 ${200-t*7} 120" fill="none" stroke="${e}" stroke-width="7"/>`).join("")}
  <path d="M60 140 V82 L80 58 H140 L160 82 V140 Z" fill="#ef5b5b" ${se(4)}/>
  <path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${Pi}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  ${Ml.map((e,t)=>`<path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${e}" stroke-width="1.3" transform="translate(0 ${-3+t*1.2})"/>`).join("")}
  <rect x="88" y="100" width="44" height="40" rx="3" fill="#d94848" ${se(3)}/><path d="M88 100 L132 140 M132 100 L88 140" stroke="#fff6e6" stroke-width="3"/>
  <rect x="94" y="70" width="32" height="18" rx="4" fill="#fff6e6" ${se(3)}/>
  <path d="M10 150 H52 M168 150 H212 M14 140 V158 M30 140 V158 M46 140 V158 M174 140 V158 M190 140 V158 M206 140 V158" stroke="#fff6e6" stroke-width="5" stroke-linecap="round"/><path d="M10 150 H52 M168 150 H212" ${se(1.5)}/>
  <g transform="translate(178 122) scale(.42)"><ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" ${se(5)}/><path d="M24 -8 L40 -34 L54 -26 L36 2 Z" fill="#fff" ${se(5)}/>${Ml.slice(0,4).map((e,t)=>`<path d="M38 ${-34+t*5} q-14 4 -20 14" fill="none" stroke="${e}" stroke-width="5" stroke-linecap="round"/>`).join("")}<path d="M-20 14 V34 M20 14 V34" ${se(6)}/></g>
</svg>`,qf=`<svg viewBox="0 0 190 156">
  <ellipse cx="95" cy="118" rx="88" ry="32" fill="#ffd0e6" ${se()}/>
  <path d="M28 108 V62 L95 28 L162 62 V108 Z" fill="#fff0f6" ${se(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="#ff6b9a" ${se(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="none" stroke="#ffd43b" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="78" y="78" width="34" height="30" rx="4" fill="#ff8ec8" ${se(3)}/>
  <path d="M95 86 C90 80 82 82 86 90 C90 96 95 100 95 100 C95 100 100 96 104 90 C108 82 100 80 95 86 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  <rect x="42" y="74" width="22" height="16" rx="3" fill="#66d9e8" ${se(2)}/><rect x="126" y="74" width="22" height="16" rx="3" fill="#d0bfff" ${se(2)}/>
  ${[36,52,68,84,100,116,132,148].map((e,t)=>`<circle class="clubBulb" cx="${e}" cy="58" r="3.2" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" ${se(1.4)}/>`).join("")}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`,ud=`<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${se(3)}/><path d="M17 8 V35 M31 13 V40" ${se(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${se(2)}/></svg>`,md=e=>e.indexOf("data-chibi")>=0?e.replace('viewBox="0 0 200 320"','viewBox="24 0 152 168"'):e.replace('viewBox="0 0 100 160"','viewBox="14 2 72 74"'),Fh=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),Mm={piano:"keys",keyboard:"keys",stove:"stove","yard-swing":"swing","cc-macrame-swing":"swing","little-slide":"slide",aquarium:"water","cc-cottage-aquarium":"water",fish:"water","pink-fountain":"water","lily-pond":"water",birdbath:"water","doll-house":"dollhouse"};function yd(e){return Mm[Fh(e)]??null}const Lm=e=>Fh(e)==="rubber-ducky",Ms={play:110,listen:260,stir:140,swing:70,slide:90,look:200,kneel:120},Nf=9e3;function Em(e,t,n,s,o={}){const i=yd(e);if(!i)return null;switch(i){case"keys":return o.keysPlaying?.has(t)?!s&&n<=Ms.play?{kind:"play",d:n}:n<=Ms.listen?{kind:"listen",d:n+40}:null:null;case"stove":return!s&&o.opened?.has(t)&&n<=Ms.stir?{kind:"stir",d:n}:null;case"swing":return!s&&n<=Ms.swing?{kind:"swing",d:n}:null;case"slide":return!s&&n<=Ms.slide?{kind:"slide",d:n}:null;case"water":return n<=Ms.look?{kind:"look",d:n+20}:null;case"dollhouse":return!s&&n<=Ms.kneel?{kind:"kneel",d:n}:null}}const Ur=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),Sm={"cute-speaker":"stereo","cc-record-player":"stereo","retro-radio":"stereo","music-box":"musicbox",tv:"tv",fireplace:"fire","brick-fireplace":"fire","wc-woodstove":"fire",woodstove:"fire","wc-stone-hearth":"fire","fire-pit":"fire"};function Jn(e){return Sm[Ur(e)]??null}function jh(e){return Jn(e)!==null}function bd(e){const t=Ur(e);return t==="ball"||t==="beach-ball"||t==="balloon"?"bounce":t==="teddy"||/plush/.test(t)?"hug":null}const Ho=e=>/(^|-)tub$/.test(Ur(e)),Wo=e=>/fridge$/.test(Ur(e)),Cm={stereo:220,musicbox:160,tv:280,fire:230},hc=70,Gh=130,Pm=.4,Tm=6,Zf=2e4,Ae=900,Rm=["stereo","tv","fire","musicbox"];function Bm(e,t){let n=2166136261;const s=e+"|"+t;for(let o=0;o<s.length;o++)n^=s.charCodeAt(o),n=Math.imul(n,16777619);return(n>>>0)%1e3/1e3}const El=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5);function Am(e,t,n={}){const s=new Map,o=[...t].sort((r,l)=>r.id<l.id?-1:r.id>l.id?1:0),i=e.filter(r=>r.on&&Jn(r.kind)&&!(Jn(r.kind)==="musicbox"&&n.musicBoxDone?.has(r.id))),a=[];for(const r of o){if(r.lying)continue;let l=null;for(const c of Rm){for(const d of i){if(Jn(d.kind)!==c)continue;const f=El(r,d);if(f>Cm[c]||r.seated&&c!=="tv"&&c!=="musicbox")continue;const p=c==="stereo"?"dance":c==="tv"?"watch":c==="fire"?"warm":"sway";(!l||f<l.d||f===l.d&&d.id<l.it.id)&&(l={c:r,it:d,d:f,kind:p})}if(l)break}if(!l)for(const c of e){const d=Em(c.kind,c.id,El(r,c),!!r.seated,{...n,opened:n.opened??n.fridgesOpen});if(d&&(!l||d.d<l.d||d.d===l.d&&c.id<l.it.id)&&(l={c:r,it:c,d:d.d,kind:d.kind}),r.seated)continue;const f=bd(c.kind);let p=null,g=El(r,c);f&&g<=hc?p=f:Wo(c.kind)&&n.fridgesOpen?.has(c.id)&&g<=Gh?p="nibble":Ho(c.kind)&&Math.abs(r.x-c.x)<=(c.w??240)*Pm&&Math.abs(r.y-c.y)<=40&&(p="bathe"),p&&(!l||g<l.d||g===l.d&&c.id<l.it.id)&&(l={c:r,it:c,d:g,kind:p})}l&&a.push(l)}a.sort((r,l)=>r.d-l.d||(r.c.id<l.c.id?-1:1));for(const r of a.slice(0,Tm))s.set(r.c.id,{kind:r.kind,item:r.it.id,phase:Bm(r.it.id,r.c.id),face:r.it.x<r.c.x?-1:1});return s}function Vs(e,t,n){return-((n+e*t)%t)}const Im={},Tt=e=>(Im?.VITE_STORE_PREFIX??"")+e,Dm=400,Vr=["#ffe0c4","#f6d2b5","#f1c27d","#e0ac69","#c9956c","#c68642","#a86b3c","#8d5524","#5c3a1e","#3d2914"],zr=["#2b1d16","#5b3a29","#a0522d","#f4d58d","#ff8fab","#8ecae6","#b388d6","#ff9f43","#1d1416","#c8602a","#7a4b32","#f7f1e8"],kd=["#5a321c","#3f9b52","#3d7ec4","#c48a3a","#7b4fb8"],Dt=["#ff7aa8","#ffd166","#5aa9e6","#80ed99","#c9a0dc","#ff9f68","#ffffff","#5a3d5c","#ff8f7a","#7ec8c3","#f7f3ee","#f4a3c8","#6b8e4e","#e8d5b5","#ef6b6b","#3d4a6b"],Qr=["short","bob","buns","topbun","pixie","long","wavy","puffs","afro","curlybob","coily","boxbraids","braids","sidebraid","crown","pony","sidepony","pigtails","lowbun","locs","halfup","bangs","sidebangs","wavybob"],qr=["classic","stripes","hoodie","sweater","tank","puff","ruffle","button","jersey","cardigan","bib","raincoat"],Nr=["pants","jeans","shorts","skirt","tutu","leggings","overalls","joggers"],Zr=["","twirl","sundress","party","pinafore","jumper","ballet","nightgown","raindress"],Fr=["classic","sneakers","lightup","boots","rainboots","sandals","maryjanes","slippers"],jr=["round","big","sleepy","sparkle","soft","bright"],xo=["glasses","square","sunnies","bow","bigbow","headband","flower","cap","beanie","sunhat","catears","earmuffs"],Om=new Set(Qr),Hm=new Set(qr),Wm=new Set(Nr),Um=new Set(Zr),Vm=new Set(Fr),zm=new Set(jr),Qm=new Set(xo),qm=new Set(["short","pixie","coily","afro","bangs"]),Nm=new Set(["buns","puffs"]),Zm=new Set(["topbun","lowbun"]),Fm={hair:"buns",hairC:"#5b3a29",skin:"#f1c27d",eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"pants",bottomC:"#5aa9e6",dress:"",dressC:"#ff7aa8",shoes:"classic",shoesC:"#5a3d5c",accC:"#ffd166"};function jm(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function po(e,t){return typeof e=="string"&&t.has(e)}function $n(e,t){if(typeof e!="string")return null;const n=e.trim().toLowerCase();for(let s=0;s<t.length;s++)if(t[s]===n)return t[s];return null}function Gi(e){if(!jm(e))return null;let t=0;try{t=JSON.stringify(e).length}catch{return null}if(t>Dm)return null;const n={v:1};po(e.hair,Om)&&(n.hair=e.hair);const s=$n(e.hairC,zr);s&&(n.hairC=s);const o=$n(e.skin,Vr);o&&(n.skin=o),po(e.eyes,zm)&&(n.eyes=e.eyes);const i=$n(e.eyeC,kd);i&&(n.eyeC=i),(e.freckles===!0||e.freckles===!1)&&(n.freckles=e.freckles),(e.blush===!0||e.blush===!1)&&(n.blush=e.blush),po(e.top,Hm)&&(n.top=e.top);const a=$n(e.topC,Dt);a&&(n.topC=a),po(e.bottom,Wm)&&(n.bottom=e.bottom);const r=$n(e.bottomC,Dt);r&&(n.bottomC=r),po(e.dress,Um)&&(n.dress=e.dress);const l=$n(e.dressC,Dt);l&&(n.dressC=l),po(e.shoes,Vm)&&(n.shoes=e.shoes);const c=$n(e.shoesC,Dt);if(c&&(n.shoesC=c),Array.isArray(e.acc)){const f=[];for(let p=0;p<e.acc.length&&f.length<2;p++){const g=e.acc[p];typeof g=="string"&&Qm.has(g)&&f.indexOf(g)<0&&f.push(g)}n.acc=f}const d=$n(e.accC,Dt);return d&&(n.accC=d),n}function us(e){const t=Fm,n=e??{};return{v:1,hair:n.hair??t.hair,hairC:n.hairC??t.hairC,skin:n.skin??t.skin,eyes:n.eyes??t.eyes,eyeC:n.eyeC??t.eyeC,freckles:n.freckles??t.freckles,blush:n.blush??t.blush,top:n.top??t.top,topC:n.topC??t.topC,bottom:n.bottom??t.bottom,bottomC:n.bottomC??t.bottomC,dress:n.dress??t.dress,dressC:n.dressC??t.dressC,shoes:n.shoes??t.shoes,shoesC:n.shoesC??t.shoesC,acc:n.acc?n.acc.slice():[],accC:n.accC??t.accC}}function Ff(e){const t=/^#([0-9a-f]{6})$/i.exec(e.trim());if(!t){const s=/^#([0-9a-f]{3})$/i.exec(e.trim());return s?[parseInt(s[1][0]+s[1][0],16),parseInt(s[1][1]+s[1][1],16),parseInt(s[1][2]+s[1][2],16)]:null}const n=parseInt(t[1],16);return[n>>16&255,n>>8&255,n&255]}function da(e,t){const n=$n(e,t);if(n)return n;const s=Ff(e);if(!s)return t[0];let o=t[0],i=1e12;for(let a=0;a<t.length;a++){const r=Ff(t[a]);if(!r)continue;const l=(s[0]-r[0])*(s[0]-r[0])+(s[1]-r[1])*(s[1]-r[1])+(s[2]-r[2])*(s[2]-r[2]);l<i&&(i=l,o=t[a])}return o}function Gm(e){return qm.has(e)?0:Nm.has(e)?2:Zm.has(e)?3:1}function Ym(e){for(let t=0;t<e.length;t++){const n=e[t];if(n==="glasses"||n==="square"||n==="sunnies")return 2}for(let t=0;t<e.length;t++){const n=e[t];if(n==="cap"||n==="beanie"||n==="sunhat")return 3}for(let t=0;t<e.length;t++){const n=e[t];if(n==="bow"||n==="bigbow")return 1}return 0}function Gr(e){const t=us(e),n=t.dress!=="";return{skin:t.skin,hair:t.hairC,hairStyle:Gm(t.hair),shirt:n?t.dressC:t.topC,pants:n?t.dressC:t.bottomC,acc:Ym(t.acc)}}const Km=["short","bob","buns","topbun"];function Ja(e){const t=typeof e.hairStyle=="number"&&e.hairStyle>=0&&e.hairStyle<=3?Math.round(e.hairStyle):0,n=e.acc===1?["bow"]:e.acc===2?["glasses"]:e.acc===3?["cap"]:[],s=da(String(e.shirt??""),Dt);return{v:1,hair:Km[t],hairC:da(String(e.hair??""),zr),skin:da(String(e.skin??""),Vr),eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:s,bottom:"pants",bottomC:da(String(e.pants??""),Dt),dress:"",dressC:s,shoes:"classic",shoesC:"#5a3d5c",acc:n,accC:"#ffd166"}}function Ti(e){const t=Gi(e)??{},n=us(t);return{...Gr(n),look2:n}}const Xm=new Set(["glasses","square","sunnies"]),Jm=new Set(["bow","bigbow","flower","headband"]),e1=new Set(["cap","beanie","sunhat","catears","earmuffs"]);function er(e){return Xm.has(e)?"face":Jm.has(e)?"bow":e1.has(e)?"hat":"other"}function nt(e,t){return t[Math.floor(e()*t.length)]}function Yr(e=Math.random){const t=e()<.38,n=e();let s=[];if(n<.22)s=[];else if(n<.68)s=[nt(e,xo)];else{const o=nt(e,xo),i=xo.filter(a=>er(a)!==er(o));s=[o,nt(e,i)]}return{v:1,hair:nt(e,Qr),hairC:nt(e,zr),skin:nt(e,Vr),eyes:nt(e,jr),eyeC:nt(e,kd),freckles:e()<.4,blush:e()<.85,top:nt(e,qr),topC:nt(e,Dt),bottom:nt(e,Nr),bottomC:nt(e,Dt),dress:t?nt(e,Zr.filter(o=>o!=="")):"",dressC:nt(e,Dt),shoes:nt(e,Fr),shoesC:nt(e,Dt),acc:s,accC:nt(e,Dt)}}function t1(e,t=Math.random){const n=e.characters[0];if(!n)return e;const s=Yr(t),o=Gr(s),i=e.characters.slice();return i[0]={...n,...o,look2:s},{...e,characters:i}}function n1(e){const t=[e.skin,e.hair,e.hairStyle,e.shirt,e.pants,e.acc,e.look2?JSON.stringify(e.look2):""].join("|");return e.costume?t+"|cos:"+e.costume:t}const jf={m:10,d:24},Gf={m:11,d:2},tr={yellow:"#ffd166",denim:"#4f7fb8",rose:"#f28fb0",mint:"#7fd8b8"},s1=["helper-yellow","helper-denim","helper-rose","helper-mint","witch","cat","ghost","skeleton","bat"],o1=new Set(s1),Yf={helper:"Yellow Helper",witch:"Witch hat",cat:"Black cat",ghost:"Ghost sheet",skeleton:"Bone PJs",bat:"Bat cape"};function io(e){return typeof e=="string"&&o1.has(e)?e:null}function i1(e=new Date){const t=e.getMonth()+1,n=e.getDate();return t===jf.m?n>=jf.d:t===Gf.m?n<=Gf.d:!1}function a1(){const e=typeof globalThis<"u"?globalThis:{};if(typeof e.__costumeDate=="string"){const t=new Date(e.__costumeDate+"T12:00:00");if(!isNaN(+t))return t}return new Date}function Kr(){return i1(a1())}function r1(e){if(!e||e.costume==null)return null;const t=io(e.costume);return t&&Kr()?t:null}const Yi=3600,Qs=470,Dn=590,Ds=["goat","sheep","piglet","chicks","bunny","cow"],l1=[1085,1215,1345,1470,1600,1735],c1=520,wd=1900,vd=[600,800,1e3,1200,1400,1600],gc=435,d1=["Chestnut","Snowy","Midnight","Sunny","Rainbow"],Yh=[2470,2600,2730,2860,2990],qs=540,f1=["pet","carrot","apple","hay"],uc=6,p1=e=>3175+e*68,h1=8e4,mc=20,g1=1500,Kh=["egg","carrot","flower"],u1={egg:"ranch-egg",carrot:"ranch-carrot",flower:"ranch-bouquet"},m1=()=>({egg:0,carrot:0,flower:0}),y1=(e,t,n)=>Number.isInteger(e)&&e>=t&&e<=n?e:null;function _d(e){const t=m1();if(!e||typeof e!="object")return t;for(const n of Kh)t[n]=y1(e[n],0,mc)??0;return t}function $d(e){const t=Array(uc).fill(null);if(Array.isArray(e))for(let n=0;n<uc;n++){const s=e[n];if(!s||s.seed!=="carrot"&&s.seed!=="flower")continue;const o=Number(s.at),i=Number(s.wet);Number.isFinite(o)&&Number.isFinite(i)&&(t[n]={seed:s.seed,at:o,wet:i})}return t}function Xr(e,t){if(!e||!e.wet)return 0;const n=(t-e.wet)/h1;return n>=1?3:n>=.4?2:1}function yc(e,t,n,s,o=0){const i=e.slice(),a={...t};switch(n.op){case"plant":return i[n.i]?"taken":(i[n.i]={seed:n.seed,at:s,wet:0},{plots:i,basket:a,garden:!0});case"water":{const r=i[n.i];return r?r.wet?"wet":(i[n.i]={...r,wet:s},{plots:i,basket:a,garden:!0}):"empty"}case"pick":{const r=i[n.i];return r?Xr(r,s)<3?"notReady":a[r.seed]>=mc?"full":(a[r.seed]++,i[n.i]=null,{plots:i,basket:a,garden:!0,got:r.seed}):"empty"}case"egg":return s-o<g1?"slow":a.egg>=mc?"full":(a.egg++,{plots:i,basket:a,garden:!1,got:"egg"});case"use":return a.carrot<=0?"none":(a.carrot--,{plots:i,basket:a,garden:!1});case"take":return a[n.kind]<=0?"none":(a[n.kind]--,{plots:i,basket:a,garden:!1})}}const jn=80,b1=30*24*60*60*1e3,k1=5,Xh=6,Vn=["#ffd6e8","#fff3b0","#d8f5e8","#e6d6ff","#d6efff"],w1=/^m[A-Za-z0-9]{4,40}$/,v1=/^[A-Za-z0-9:_\/.-]{1,80}$/;function Sl(e,t=Date.now()){const n=Math.floor((t-e)/864e5);return n<=0?"today":n===1?"yesterday":n<7?"a few days ago":"a while ago"}function _1(e,t=Date.now()){const n=e?.letters;if(!Array.isArray(n))return null;const s=[];for(const i of n.slice(-30*2)){if(!i||typeof i!="object")continue;const a=i;if(typeof a.id!="string"||!w1.test(a.id)||typeof a.from!="string")continue;const r=a.from.normalize("NFC").replace(/\s+/g," ").trim();if(!r||r.length>24||typeof a.fromPid!="string"||!v1.test(a.fromPid)||typeof a.text!="string"||a.text.length>jn||typeof a.at!="number"||!Number.isFinite(a.at)||t-a.at>b1||a.at>t+864e5||!Number.isInteger(a.color)||a.color<0||a.color>=k1||!Number.isInteger(a.sticker)||a.sticker<0||a.sticker>=Xh)continue;const l=a.text.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(l.length>jn)continue;const c={id:a.id,from:r,fromPid:a.fromPid,text:l,color:a.color,sticker:a.sticker,at:a.at};a.read===!0&&(c.read=!0),s.push(c)}const o=s.slice(-30);return o.length?{letters:o}:null}function xd(e){return e?.letters.filter(t=>!t.read&&t.text).length??0}const $1=/^[A-Za-z0-9:_\/.-]{1,80}$/,Jh=/crib|bassinet|high-?chair|cat-bed|pet-bed|dog-bed|kennel|tulip|flower|toadstool|mobile/,Cl={bed:{head:{x:.24,y:.42},pillow:{x:.1,y:.27,w:.22,h:.18},mattress:{x:.36,y:.34,w:.36,h:.16},clip:"starter"},"wooden-bed":{head:{x:.22,y:.53},pillow:{x:.12,y:.36,w:.24,h:.18},mattress:{x:.38,y:.46,w:.32,h:.16},clip:"wooden"},"checker-bed":{head:{x:.16,y:.45},pillow:{x:.08,y:.26,w:.22,h:.22},mattress:{x:.38,y:.4,w:.32,h:.16},clip:"checker"},"bunk-bed":{head:{x:.11,y:.62},pillow:{x:.05,y:.52,w:.18,h:.14},mattress:{x:.22,y:.56,w:.36,h:.14},clip:"bunk"},"canopy-bed":{head:{x:.38,y:.52},pillow:{x:.28,y:.46,w:.24,h:.14},mattress:{x:.48,y:.48,w:.28,h:.16},clip:"canopy"},"cc-heart-bed":{head:{x:.22,y:.67},pillow:{x:.12,y:.58,w:.26,h:.16},mattress:{x:.36,y:.64,w:.36,h:.16},clip:"heart"},"cc-canopy-daybed":{head:{x:.37,y:.58},pillow:{x:.26,y:.5,w:.26,h:.16},mattress:{x:.48,y:.54,w:.3,h:.16},clip:"daybed"},"wc-plaid-bed":{head:{x:.24,y:.26},pillow:{x:.08,y:.14,w:.3,h:.2},mattress:{x:.36,y:.18,w:.3,h:.18},clip:"wooden"}},x1=["bed","pack:wooden-bed","pack:checker-bed","pack:bunk-bed","pack:canopy-bed","pack:cc-heart-bed","pack:cc-canopy-daybed","pack:wc-plaid-bed"];function eg(e){return e==="bed"||/bunk/.test(e)||/daybed/.test(e)?!0:/(^|[-_:])bed$/.test(e)}function M1(){return x1.slice()}function Jr(e){const t=String(e||"").toLowerCase();if(!t||Jh.test(t)||!eg(t))return null;const n=t.replace(/^pack:/,"");return Cl[n]||Cl[t]||Cl.bed}const L1={head:{x:55.0733,y:59.7445},chest:{x:60,y:114},hip:{x:60,y:138},classic:{x:60,y:52.8}},Kf=48,Xf=138.24;function tg(e,t){const n=-90*Math.PI/180,s=Math.cos(n),o=Math.sin(n),i=e-Kf,a=t-Xf,r=Kf+s*i-o*a,l=Xf+o*i+s*a;return{x:r-60,y:l-192}}function nr(e,t){const n=L1[e],s=tg(n.x,n.y);return{x:t?-s.x:s.x,y:s.y}}const Jf=120,Pl=192,E1=.26;function S1(e,t,n,s,o=1){const i=o>0?o:1;if(n==="lie"&&s){const r=-t*i+210.24,l=-e*i+186.24;return{x:-Jf*i/2+r,y:-Pl*i+l}}if(n==="lie"){const r=tg(e,t);return{x:r.x*i,y:r.y*i}}const a=n==="sit"?E1*Pl*i:0;return{x:(e-Jf/2)*i,y:(t-Pl)*i+a}}function C1(e,t,n,s,o){const i=Jr(e);if(!i||t<1||n<1)return null;const a=nr("head",!1),r=(i.head.x-.5)*t-a.x,l=(i.head.y-1)*n-a.y,c=nr(s,o);return{x:.5+((o?-r:r)+c.x)/t,y:1+(l+c.y)/n}}function ao(e){const t=String(e||"").toLowerCase();return!t||Jh.test(t)?null:eg(t)?{pose:"lie",spots:[{dx:0,dy:0}]}:/sofa|couch|loveseat/.test(t)?{pose:"sit",spots:[{dx:-.18,dy:-.33},{dx:.18,dy:-.33}]}:/armchair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/bench|window-seat/.test(t)?{pose:"sit",spots:[{dx:-.22,dy:-.3},{dx:.22,dy:-.3}]}:/ottoman/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/stool|rocker/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.38}]}:/chair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.48}]}:null}function ng(e){const t=ao(e.kind);if(!t)return[];const n=e.scale||1,s=t.pose==="lie"?Jr(e.kind):null;if(s){const o=e.w*n,i=e.h*n,a=nr("head",!1),r=(s.head.x-.5)*o-a.x,l=(s.head.y-1)*i-a.y;return[{x:e.x+(e.flip?-r:r),y:e.footY+l,pose:"lie",n:0}]}return t.spots.map((o,i)=>{const a=o.dx*e.w*n,r=o.dy*e.h*n,l=i===1?1:0;return{x:e.x+(e.flip?-a:a),y:e.footY+r,pose:t.pose,n:l}})}function Ri(e){const t=(r,l)=>({x:r,y:l,seat:null,toast:null,moved:!0});if(e.mode!=="play")return t(e.releaseX,e.releaseY);const n=e.piece;if(!n)return e.via==="drag"?t(e.releaseX,e.releaseY):{x:e.releaseX,y:e.releaseY,seat:null,toast:null,moved:!1};if(e.via==="tap"&&e.alreadyOn===n.id)return t(n.x,n.footY);const s=new Set(e.occupied.filter(r=>r.item===n.id).map(r=>r.n)),o=ng(n).filter(r=>!s.has(r.n));if(!o.length)return e.via==="tap"?{x:e.releaseX,y:e.releaseY,seat:null,toast:"Someone is already there!",moved:!1}:t(e.releaseX,e.releaseY);let i=o[0],a=1/0;for(const r of o){const l=(r.x-e.releaseX)**2+(r.y-e.releaseY)**2;l<a&&(i=r,a=l)}return{x:i.x,y:i.y,seat:{item:n.id,pose:i.pose,n:i.n},toast:null,moved:!0}}const P1={sofa:260,armchair:150,bed:300,chair:100,stool:90,rocker:190,"yard-bench":140,"bar-stool":52.8,"bunk-bed":294,"canopy-bed":294,"cc-bubble-chair":142,"cc-canopy-daybed":276,"cc-dryer-chair":164,"cc-heart-bed":236,"cc-mani-chair":188,"cc-mushroom-stool":112,"cc-scallop-loveseat":248,"checker-bed":196,"cloud-sofa":212,"comfy-armchair":161.7,"cream-sofa":234.6,"egg-chair":126,"fancy-sofa":234.6,"gaming-chair":101.4,"lattice-bench":147,"puffy-stool":46.9,"rocking-chair":137.2,"salon-chair":111.8,"swivel-stool":46.2,"waiting-bench":166.6,"wash-chair":186.2,"wood-armchair":127.4,"wood-stool":46.2,"wooden-bed":235.2};function Bi(e){const t=String(e||"").toLowerCase().replace(/^pack:/,"");return P1[t]??320}const Ki=540;function Md(e,t,n,s=2400){const o=Math.max(0,t)/2+70,i=40;let a=n<e-8?-1:1,r=e+a*o;return(r<i||r>s-i)&&(a=-a,r=e+a*o),r<i&&(r=i),r>s-i&&(r=s-i),{x:r,y:Ki}}function Ld(e){if(!e||typeof e!="object")return null;const t=e;return typeof t.item!="string"||!$1.test(t.item)||t.pose!=="sit"&&t.pose!=="lie"||t.n!==0&&t.n!==1?null:{item:t.item,pose:t.pose,n:t.n}}function bc(e,t){if(!e)return null;const n=Ld(e);return!n||!t?.some(s=>s&&s.id===n.item)?null:n}const zs=["sleepy","hungry","playful","clean"],T1=1,R1=4*6e4,B1=2*6e4,A1=75e3;function I1(e,t){return e.characters.some(n=>or(n))?R1:t===0?A1:B1}const Ed=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),D1=/^(cake|juice|cupcake|cookie|apple|pie|pizza|donut|sandwich|milk|bread|fruit|.*-cake|.*-pie|.*cookies?)$/,sr=e=>D1.test(Ed(e)),Ai=e=>!!bd(e)||Ed(e)==="rubber-ducky";function Sd(e){if(!e||typeof e!="object")return null;const t={};for(const n of zs){const s=e[n];if(typeof s!="number"||!Number.isFinite(s))continue;const o=Math.max(0,Math.min(3,Math.round(s)));o<3&&(t[n]=o)}return Object.keys(t).length?t:null}function Ns(e,t){const n=e?.needs?.[t];return typeof n=="number"?Math.max(0,Math.min(3,n)):3}function or(e){let t=null,n=T1+1;for(const s of zs){const o=Ns(e,s);o<n&&(n=o,t=s)}return t}function sg(e,t){if(t)return{...e,needs:t};if(!("needs"in e))return e;const{needs:n,...s}=e;return s}const Tl=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5),ep=(e,t)=>!!(e.held.left&&t(e.held.left.kind)||e.held.right&&t(e.held.right.kind)),O1=e=>Bi(e.kind)*(e.scale||1)*(e.size||1);function og(e,t,n){const s=e.rooms[t.room]?.items??[];switch(n){case"sleepy":return t.seat?.pose==="lie"&&s.some(o=>o.id===t.seat.item);case"clean":return s.some(o=>Ho(o.kind)&&Math.abs(t.x-o.x)<=Math.max(60,O1(o)*.45)&&Math.abs(t.y-o.y)<=60);case"hungry":return ep(t,sr)||s.some(o=>Wo(o.kind)&&Tl(t,o)<=Gh+30||sr(o.kind)&&Tl(t,o)<=hc+40);case"playful":return ep(t,Ai)||s.some(o=>Ai(o.kind)&&Tl(t,o)<=hc+40)}}function H1(e,t){return zs.filter(n=>Ns(t,n)<3&&og(e,t,n))}function W1(e,t,n){const s=e.characters.find(a=>a.id===t);if(!s||Ns(s,n)>=3||!og(e,s,n))return e;const o={...s.needs??{}};delete o[n];const i=sg(s,Sd(o));return{...e,characters:e.characters.map(a=>a.id===t?i:a)}}function U1(e,t,n){const s=e.characters.find(a=>a.id===t),o=Ns(s,n);if(!s||o<=0)return e;const i=sg(s,Sd({...s.needs??{},[n]:o-1}));return{...e,characters:e.characters.map(a=>a.id===t?i:a)}}function V1(e,t){const n=Object.values(e.rooms).flatMap(c=>c?.items??[]),s={sleepy:n.some(c=>/bed$|^bed|sofa|couch/.test(Ed(c.kind))),hungry:n.some(c=>Wo(c.kind)||sr(c.kind)),playful:n.some(c=>Ai(c.kind)),clean:n.some(c=>Ho(c.kind))},o=c=>c[(t%c.length+c.length)%c.length],i=[];for(const c of[...e.characters].sort((d,f)=>d.id<f.id?-1:1)){const d=!!or(c);for(const f of zs)if(s[f]){const p=Ns(c,f);p>0&&i.push({id:c.id,need:f,l:p,wish:d})}}if(!i.length)return null;const a=i.filter(c=>!c.wish);if(a.length){const c=a.filter(f=>f.l<3),d=c.length?o(c):o(a);return{id:d.id,need:d.need}}const r=Math.max(...i.map(c=>c.l)),l=o(i.filter(c=>c.l===r));return{id:l.id,need:l.need}}const kc=45e3,z1=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],tp=/^[A-Za-z0-9:_\/.-]{1,80}$/,Q1=/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u,np=["feed","burp","change","rock"];function Zs(e){const t=String(e||"").toLowerCase();return!t||/mobile/.test(t)?null:/bassinet/.test(t)?"bassinet":t==="crib"||/(^|[-_:])crib$/.test(t)?"crib":null}function q1(e){return e===2?"Cozy":"Happy"}function N1(e){return e+1}function Z1(e){return z1.indexOf(e)>=0}function F1(e){const t=typeof e=="number"&&Number.isFinite(e)?Math.round(e):2;return t<=2?2:t>=4?4:3}function ig(e){if(!e||typeof e!="object")return;const t=e,n={};let s=!1;for(let o=0;o<np.length;o++){const i=np[o],a=t[i];typeof a=="number"&&Number.isFinite(a)&&(n[i]=a,s=!0)}return s?n:void 0}function sn(e){const t={name:e.name,mood:e.mood,spot:e.spot,x:e.x,y:e.y,room:e.room,since:e.since};(e.spot==="crib"||e.spot==="bassinet")&&e.bed&&(t.bed=e.bed),e.spot==="mat"&&e.seat&&(t.seat=e.seat),e.spot==="arms"&&e.holder&&(t.holder=e.holder);const n=ig(e.at);return n&&(t.at=n),t}function Cd(e,t){return JSON.stringify(e)===JSON.stringify(t)}function j1(e,t){if(!e||typeof e!="object")return null;const n=e,s=String(n.name??"").normalize("NFC").replace(/\s+/g," ").trim();if(!Q1.test(s)||(s.match(/\d/g)||[]).length>2)return null;let o=n.spot==="crib"||n.spot==="bassinet"||n.spot==="arms"||n.spot==="mat"?n.spot:"mat";const i=Z1(n.room)?n.room:"nursery",a=typeof n.x=="number"&&Number.isFinite(n.x)?Math.max(0,Math.min(2400,n.x)):700,r=typeof n.y=="number"&&Number.isFinite(n.y)?Math.max(0,Math.min(600,n.y)):540,l=typeof n.since=="number"&&Number.isFinite(n.since)?n.since:0,c=F1(n.mood);let d=typeof n.bed=="string"&&tp.test(n.bed)?n.bed:void 0,f=Ld(n.seat)??void 0,p=typeof n.holder=="string"&&tp.test(n.holder)?n.holder:void 0;if(t){const g=t[i]?.items??[];if(o==="crib"||o==="bassinet"){let b=!1;for(let m=0;m<g.length;m++){const k=g[m];k&&k.id===d&&Zs(String(k.kind||""))===o&&(b=!0)}b||(o="mat",d=void 0)}if(f){let b=!1;for(let m=0;m<g.length;m++)g[m]&&g[m].id===f.item&&(b=!0);b||(f=void 0)}}return o!=="crib"&&o!=="bassinet"&&(d=void 0),o!=="mat"&&(f=void 0),o!=="arms"&&(p=void 0),o==="arms"&&!p&&(o="mat"),sn({name:s,mood:c,spot:o,bed:d,seat:f,holder:p,x:a,y:r,room:i,at:ig(n.at),since:l})}function G1(e,t){const n=e.nursery?.items??[];for(let s=0;s<n.length;s++){const o=n[s];if(!o||!o.id||Zs(String(o.kind||""))!=="crib")continue;const i=typeof o.x=="number"&&Number.isFinite(o.x)?o.x:1170,a=typeof o.y=="number"&&Number.isFinite(o.y)?o.y:480;return sn({name:"Bean",mood:2,spot:"crib",bed:o.id,x:i,y:a,room:"nursery",since:t})}return sn({name:"Bean",mood:2,spot:"mat",x:700,y:540,room:"nursery",since:t})}function Y1(e,t,n){const s=Math.min(4,e.mood+1);return sn({...e,mood:s,at:{...e.at||{},[t]:n},since:n})}function K1(e,t){if(!e.since){const i=sn({...e,since:t});return Cd(i,e)?null:i}if(e.mood<=2)return null;const n=Math.floor((t-e.since)/kc);if(n<1)return null;const s=Math.min(n,e.mood-2),o=e.mood-s;return sn({...e,mood:o,since:e.since+s*kc})}function wc(e,t,n,s,o){const i=sn(t?{...e,spot:"arms",holder:t,room:n,x:s,y:o,bed:void 0,seat:void 0}:{...e,spot:"mat",room:n,x:s,y:o,bed:void 0,seat:void 0,holder:void 0});return Cd(i,e)?e:i}function X1(e,t,n,s){let o=t.spot==="crib"||t.spot==="bassinet"?t.spot:"mat",i,a;if(o==="crib"||o==="bassinet"){let l=!1;for(let c=0;c<n.length;c++){const d=n[c];d&&d.id===t.bed&&Zs(d.kind)===o&&(l=!0)}l&&t.bed?i=t.bed:o="mat"}if(o==="mat"&&t.seat){let l=null;for(let f=0;f<n.length;f++)n[f]&&n[f].id===t.seat.item&&(l=n[f]);const c=l?ao(l.kind):null;let d=!1;for(let f=0;f<s.length;f++)s[f].item===t.seat.item&&s[f].n===t.seat.n&&(d=!0);l&&c&&c.pose===t.seat.pose&&!d&&(a=t.seat)}const r=sn({...e,spot:o,room:t.room,x:t.x,y:t.y,bed:i,seat:a,holder:void 0});return Cd(r,e)?e:r}function J1(e,t,n,s){const o=e.spot==="mat"&&e.seat?.item===t,i=!!n&&(e.spot==="crib"||e.spot==="bassinet")&&e.bed===t;return!o&&!i?e:sn({...e,spot:"mat",x:s?s.x:e.x,y:s?s.y:Ki,bed:void 0,seat:void 0,holder:void 0})}function ag(e,t){const n=t.scale||1,s=t.w*n,o=t.h*n,i=Zs(e);let a=i==="bassinet"?0:-.02*s;const r=i==="bassinet"?-.52*o:-.46*o;return t.flip&&(a=-a),{x:t.x+a,y:t.footY+r}}function e2(e){const t=(o,i)=>({x:o,y:i,spot:"mat",bed:null,seat:null});if(e.mode!=="play"||!e.piece)return t(e.releaseX,e.releaseY);const n=Zs(e.piece.kind);if(n){const o=ag(e.piece.kind,e.piece);return{x:o.x,y:o.y,spot:n,bed:e.piece.id,seat:null}}const s=Ri({mode:"play",via:"drag",releaseX:e.releaseX,releaseY:e.releaseY,piece:e.piece,occupied:e.occupied});return s.seat?{x:s.x,y:s.y,spot:"mat",bed:null,seat:s.seat}:t(e.releaseX,e.releaseY)}function t2(e,t=2400){const s=t-40>40?t-40:40;let o=e;return o>=40||(o=40),o>s&&(o=s),{x:o,y:Ki}}function n2(e,t){return!e||e.spot!=="mat"||!e.seat||e.room!==t?null:{item:e.seat.item,n:e.seat.n}}const Ii=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],rg=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],Mt=2400,Pn=600,lg=1e3,Uo=(Mt-lg)/2,Bn=[.75,.875,1,1.25,1.5];function On(e){if(typeof e!="number"||!Number.isFinite(e))return 1;let t=1,n=1/0;for(const s of Bn){const o=Math.abs(e-s);o<n&&(n=o,t=s)}return t}function Ye(e){return(e?.scale||1)*On(e?.size)}function cg(e,t){const n=On(t);if(n===1){if(e.size==null)return e;const{size:s,...o}=e;return o}return e.size===n?e:{...e,size:n}}const Vo=8,s2=/^[A-Za-z0-9:_\/.-]{1,80}$/;function Pd(e){const t=e?.dogKennel;if(!t||typeof t!="object"||typeof t.item!="string"||!s2.test(t.item))return null;const n=e.rooms;if(!n)return null;for(const s of Object.values(n))if(s?.items?.some(o=>o&&o.id===t.item&&o.kind==="kennel"))return{item:t.item};return null}function o2(e,t){return Pd({dogKennel:{item:t},rooms:e.rooms})!==null}const G=(e,t,n,s,o=1)=>({id:e+"-"+s,kind:e,x:t+Uo,y:n,flip:!1,z:s,scale:o});function es(){return{version:3,houseId:"local",currentRoom:"living",rooms:{living:{wallpaper:"#ffd6e0",floor:"#e8b98a",pattern:1,items:[G("sofa",470,470,1),G("lamp",230,470,2),G("plant",760,480,3),G("rug",480,530,0),G("picture",470,200,4),G("cat",600,520,5),G("window",-350,230,6),G("armchair",-300,480,7),G("bookshelf",1250,470,8),G("tree",1500,480,9),G("clock",1100,170,10)]},bedroom:{wallpaper:"#d9ccff",floor:"#f2d0a4",pattern:2,items:[G("bed",450,480,1),G("window",750,230,2),G("teddy",330,500,3),G("stars",300,180,4),G("tub",1350,480,5),G("lamp",-250,470,6),G("flowers",-150,500,7)]},salon:{wallpaper:"#ffe0f0",floor:"#f6d6ff",pattern:2,items:[G("rug",470,540,0),G("mirror",470,150,1),G("vanity",470,480,2),G("perfume",400,345,3),G("polish",450,345,4),G("hairdryer",560,340,5),G("stool",470,545,6),G("lamp",200,470,7),G("flowers",780,480,8),G("picture",780,200,9),G("chair",-250,490,10),G("mirror",-250,170,11),G("plant",1300,480,12)]},kitchen:{wallpaper:"#cdf3dc",floor:"#ffe7a8",pattern:3,items:[G("fridge",200,470,1),G("table",520,500,2),G("cake",520,395,3),G("stove",800,470,4),G("chair",380,500,5),G("chair",660,500,6),G("juice",470,395,7),G("plant",-300,480,8),G("fish",1300,480,9)]},nursery:{wallpaper:"#d6f3ff",floor:"#f3ddc4",pattern:1,items:[G("cloud-rug",480,545,0),G("crib",470,480,1),G("crib-mobile",470,155,2),G("rocker",780,490,3)]},bathroom:{wallpaper:"#d4f4fb",floor:"#f7e7d4",pattern:3,items:[G("bath-mat",180,560,0),G("shower-curtain",-40,520,1),G("soaking-tub",160,500,2),G("rubber-ducky",300,545,3),G("bath-toilet",480,500,4),G("sink-vanity",700,500,5),G("bath-mirror",700,175,6),G("towel-bar",940,200,7)]},backyard:{wallpaper:"#c5ecff",floor:"#b6e3a8",pattern:0,items:[{id:"yard-bench-1",kind:"yard-bench",x:1122,y:372,flip:!1,z:1,scale:1},{id:"tulip-bed-2",kind:"tulip-bed",x:946,y:580,flip:!1,z:2,scale:1}]}},characters:[ps({id:"c1",skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6",room:"living",x:330+Uo,y:540})],soundOn:!0,dogKennel:null}}function ps(e){return{skin:"#f1c27d",hair:"#5b3a29",hairStyle:0,shirt:"#ff7aa8",pants:"#5aa9e6",size:"kid",acc:0,room:"living",x:Mt/2,y:540,flip:!1,held:{left:null,right:null},...e}}const Ls=(e,t,n)=>Math.max(t,Math.min(n,e)),jo=e=>e.items.reduce((t,n)=>Math.max(t,n.z),0),i2=e=>e.items.reduce((t,n)=>Math.min(t,n.z),0);function fa(e,t,n){return{...e,characters:e.characters.map(s=>s.id===t?n(s):s)}}function a2(e,t,n){const s=e.baby;if(!t||!s||s.spot!=="arms"||s.holder!==t.id||n===s.room)return e;const o=t.room===s.room?t.x:s.x,i=t.room===s.room?t.y:Ki,a=wc(s,null,s.room,o,i);return!a||a===s?e:{...e,baby:a}}function Di(e){if(!e.seat)return e;const{seat:t,...n}=e;return n}let ir=null;function dg(){const e=ir;return ir=null,e}function pa(e,t,n,s){if(!e.baby)return e;const o=s?Md(s.x,Bi(s.kind)*Ye(s),e.baby.x):null,i=J1(e.baby,t,n,o);return i===e.baby?e:{...e,baby:i}}function ha(e,t,n){n&&(ir={id:t,x:n.x,kind:n.kind,scale:Ye(n)});let s=!1;const o=e.characters.map(i=>{if(i.seat?.item!==t)return i;if(s=!0,!n)return Di(i);const a=Md(n.x,Bi(n.kind)*Ye(n),i.x),{seat:r,...l}=i;return{...l,x:a.x,y:a.y}});return s?{...e,characters:o}:e}function r2(e,t,n,s){if(!s){const i=bc(e.seat,t);return i?e.seat===i?e:{...e,seat:i}:Di(e)}const o=bc(n,t);return o?{...e,seat:o}:Di(e)}function st(e,t,n){const s=e.rooms[t];if(!s)return e;const o=n(s);return o===s?e:{...e,rooms:{...e.rooms,[t]:o}}}function l2(e){const t=new Set;let n=!1;const s=e.map(o=>{if(!t.has(o.id))return t.add(o.id),o;n=!0;const i=String(o.id).replace(/-d\d+$/,"").replace(/[^A-Za-z0-9:_/.-]/g,"").slice(0,72)||"item";let a=2,r=(i+"-d"+a).slice(0,80);for(;t.has(r);)a+=1,r=(i+"-d"+a).slice(0,80);return t.add(r),{...o,id:r}});return n?s:e}function c2(e){let t=!1;const n={...e.rooms};for(const s of Ii){const o=e.rooms[s];if(!o||!Array.isArray(o.items))continue;const i=l2(o.items);i!==o.items&&(n[s]={...o,items:i},t=!0)}return t?{...e,rooms:n}:e}function fg(e){if(!e||!e.rooms)return e;const t=es().rooms,n=e.rooms;let s=!1;for(const i of Ii){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(s=!0)}const o=s?(()=>{const i={...n};for(const a of Ii){const r=n[a];(!r||typeof r!="object"||!Array.isArray(r.items))&&(i[a]=t[a])}return{...e,rooms:i}})():e;return c2(o)}function ar(e,t){switch(ir=null,t.type){case"room/switch":return e.rooms[t.room]?{...e,currentRoom:t.room}:e;case"item/add":return st(e,t.room,n=>n.items.length>=80||n.items.some(s=>s.id===t.item.id)?n:{...n,items:[...n.items,{...t.item,z:jo(n)+1}]});case"item/move":{const n=e.rooms[t.room]?.items.find(o=>o.id===t.id)??null,s=st(e,t.room,o=>({...o,items:o.items.map(i=>i.id===t.id?{...i,x:Ls(t.x,0,Mt),y:Ls(t.y,40,Pn)}:i)}));return t.stand?pa(ha(s,t.id,n),t.id,!1,n):s}case"item/flip":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return pa(ha(st(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?{...o,flip:!o.flip}:o)})),t.id,n),t.id,!1,n)}case"item/size":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||On(n.size)===On(t.size)?e:st(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?cg(o,t.size):o)}))}case"item/power":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||!jh(n.kind)||!!n.on==!!t.on?e:st(e,t.room,s=>({...s,items:s.items.map(o=>{if(o.id!==t.id)return o;if(t.on)return{...o,on:!0};const{on:i,...a}=o;return a})}))}case"item/front":return st(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:jo(n)+1}:s)}));case"item/back":return st(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:i2(n)-1}:s)}));case"item/delete":{const n=e.rooms[t.room]?.items.find(a=>a.id===t.id)??null,s=n?.kind==="kennel",o=ha(st(e,t.room,a=>({...a,items:a.items.filter(r=>r.id!==t.id)})),t.id,n),i=s&&e.dogKennel?.item===t.id?{...o,dogKennel:null}:o;return pa(i,t.id,!0,n)}case"room/wallpaper":return st(e,t.room,n=>({...n,wallpaper:t.color}));case"room/floor":return st(e,t.room,n=>({...n,floor:t.color}));case"room/pattern":return st(e,t.room,n=>({...n,pattern:t.pattern,wallTile:null}));case"room/wallTile":return st(e,t.room,n=>({...n,wallTile:t.tile}));case"room/floorTile":return st(e,t.room,n=>({...n,floorTile:t.tile}));case"char/add":return e.characters.length>=Vo||e.characters.some(n=>n.id===t.char.id)?e:{...e,characters:[...e.characters,t.char]};case"char/update":return fa(e,t.id,n=>{const{look2:s,costume:o,...i}=t.patch,a={...n,...i};if("look2"in t.patch&&(s?a.look2=s:delete a.look2),"costume"in t.patch){const r=io(o);r?a.costume=r:delete a.costume}return a});case"char/move":{if(!e.rooms[t.room])return e;const n=e.characters.find(o=>o.id===t.id),s=fa(e,t.id,o=>{const i={...o,room:t.room,x:Ls(t.x,0,Mt),y:Ls(t.y,60,Pn)};return r2(i,e.rooms[t.room].items,t.seat,"seat"in t)});return a2(s,n,t.room)}case"char/delete":{const n=e.characters.find(o=>o.id===t.id);if(!n)return e;let s={...e,characters:e.characters.filter(o=>o.id!==t.id)};if(["left","right"].forEach((o,i)=>{const a=n.held[o];a&&(s=st(s,n.room,r=>({...r,items:[...r.items,{...a,x:n.x+(i?40:-40),y:n.y,z:jo(r)+1}]})))}),s.baby?.spot==="arms"&&s.baby.holder===t.id){const o=wc(s.baby,null,s.baby.room,s.baby.x,s.baby.y);o&&o!==s.baby&&(s={...s,baby:o})}return s}case"char/hold":{const n=e.characters.find(r=>r.id===t.id),s=e.rooms[t.room]?.items.find(r=>r.id===t.itemId);if(!n||!s||n.held[t.hand]||n.room!==t.room)return e;const o=ha(st(e,t.room,r=>({...r,items:r.items.filter(l=>l.id!==t.itemId)})),t.itemId,s),i=fa(o,t.id,r=>({...r,held:{...r.held,[t.hand]:s}})),a=s.kind==="kennel"&&e.dogKennel?.item===t.itemId?{...i,dogKennel:null}:i;return pa(a,t.itemId,!0,s)}case"char/release":{const n=e.characters.find(i=>i.id===t.id),s=n?.held[t.hand];if(!n||!s)return e;const o=fa(e,t.id,i=>({...i,held:{...i.held,[t.hand]:null}}));return st(o,n.room,i=>({...i,items:[...i.items,{...s,x:Ls(t.x,0,Mt),y:Ls(t.y,40,Pn),z:jo(i)+1}]}))}case"cat/set":return{...e,cat:t.cat};case"cat/move":return e.cat&&e.rooms[t.room]?{...e,cat:{...e.cat,room:t.room,x:Ls(t.x,100,Mt-100)}}:e;case"dog/set":return{...e,dog:t.dog};case"dog/kennel":return t.item===null?e.dogKennel?{...e,dogKennel:null}:e:!o2(e,t.item)||e.dogKennel?.item===t.item?e:{...e,dogKennel:{item:t.item}};case"ranch/op":{const n=t.op;if(n.op==="take"){const i=e.rooms[n.room];if(i&&i.items.some(a=>a.id===n.id))return e}const s=yc($d(e.garden),_d(e.basket),t.op,t.now,e.lastEgg??0);if(typeof s=="string")return e;let o={...e,garden:s.plots,basket:s.basket,lastEgg:t.op.op==="egg"?t.now:e.lastEgg};if(t.op.op==="take"&&o.rooms[t.op.room]){const i=t.op;o=st(o,i.room,a=>a.items.length>=80?a:{...a,items:[...a.items,{id:i.id,kind:u1[i.kind],x:i.x,y:560,flip:!1,z:jo(a)+1,scale:1}]})}return o}case"settings/sound":return{...e,soundOn:t.on};case"game/reset":return es();case"baby/meet":return e.baby?e:{...e,baby:G1(e.rooms,t.now)};case"baby/name":return!e.baby||!t.name||t.name===e.baby.name?e:{...e,baby:sn({...e.baby,name:t.name})};case"baby/care":{if(!e.baby)return e;const n=Y1(e.baby,t.care,t.now);return n===e.baby?e:{...e,baby:n}}case"baby/hold":{if(!e.baby)return e;const n=wc(e.baby,t.holder,t.room,t.x,t.y);return!n||n===e.baby?e:{...e,baby:n}}case"baby/place":{if(!e.baby||!e.rooms[t.room])return e;const n=e.characters.filter(o=>o.room===t.room&&o.seat).map(o=>({item:o.seat.item,n:o.seat.n})),s=X1(e.baby,t,e.rooms[t.room].items,n);return s===e.baby?e:{...e,baby:s}}case"baby/ease":{if(!e.baby)return e;const n=K1(e.baby,t.now);return n?{...e,baby:n}:e}case"need/meet":return W1(e,t.id,t.need);case"need/drift":return U1(e,t.id,t.need)}}const sp=Tt("cozy-house"),d2=Tt("cozy-house-v1");function Td(e){if(!e||typeof e!="object"||!e.rooms)return es();let t=e;if(t.version===1){const f=g=>(Number(g)||0)+Uo,p={};for(const[g,b]of Object.entries(t.rooms))p[g]={...b,items:(b.items??[]).map(m=>({...m,x:f(m.x)}))};t={...t,version:2,rooms:p,character:{...t.character,x:f(t.character?.x)}}}if(t.version===2){const f=t.character??{};t={...t,version:3,characters:[ps({...f,id:"c1",size:"kid",acc:0,held:{left:null,right:null}})]},delete t.character}if(t.version!==3)return es();const n=es(),s=(Array.isArray(t.characters)?t.characters:[]).slice(0,Vo).map((f,p)=>{const g=f?.look2,b=ps({...f,id:String(f.id??"c"+(p+1)),held:{left:f.held?.left??null,right:f.held?.right??null}});if(delete b.look2,g!=null){const k=Gi(g);k&&(b.look2=k)}if("costume"in b){const k=io(b.costume);k?b.costume=k:delete b.costume}delete b.needs;const m=Sd(f?.needs);return m&&(b.needs=m),b}),o=fg({...n,...t,rooms:{...n.rooms,...t.rooms},characters:s}),i=op(o),a=Pd(i),r=a===o.dogKennel?o:{...o,dogKennel:a},l=_1(r.mailbox);let c=i===o?r:{...r,characters:i.characters};if(l)c={...c,mailbox:l};else if(c.mailbox){const{mailbox:f,...p}=c;c=p}const d=j1(c.baby,c.rooms);if(d)c={...c,baby:d};else if("baby"in c){const{baby:f,...p}=c;c=p}return op(f2(c))}function op(e){let t=!1;const n=e.characters.map(s=>{const o=bc(Ld(s.seat),e.rooms[s.room]?.items);return o?s.seat?.item===o.item&&s.seat.pose===o.pose&&s.seat.n===o.n?s:{...s,seat:o}:s.seat?(t=!0,Di(s)):s});return!t&&n.every((s,o)=>s===e.characters[o])?e:{...e,characters:n}}function f2(e){const t=e.currentRoom,n=rg.includes(t),s=a=>Ii.includes(a);let o=!1;const i=e.characters.map(a=>{const r=a.room;return!s(r)||!n&&r===t?(o=!0,{...a,room:"living"}):a});return n&&!o?e:{...e,currentRoom:n?e.currentRoom:"living",characters:i}}function pg(){let e,t=!1;try{const o=localStorage.getItem(sp)??localStorage.getItem(d2);o?e=Td(JSON.parse(o)):(t=!0,e=es(),typeof navigator<"u"&&!navigator.webdriver&&(e=t1(e)))}catch{e=es()}const n=[];let s;return{get:()=>e,subscribe(o){n.push(o)},dispatch(o){e=ar(e,o),n.forEach(i=>i(e,o)),clearTimeout(s),s=window.setTimeout(()=>{try{localStorage.setItem(sp,JSON.stringify(e))}catch{}},250)},born:t}}const p2=Object.freeze(Object.defineProperty({__proto__:null,ITEM_SIZE_STEPS:Bn,MAX_CHARS:Vo,ROOM_H:Pn,ROOM_IDS:Ii,ROOM_W:Mt,SCENE_ROOMS:rg,V1_OFFSET:Uo,V1_ROOM_W:lg,applyItemSize:cg,createStore:pg,drawnScale:Ye,ensureRooms:fg,initialState:es,itemSizeOf:On,migrate:Td,newCharacter:ps,reduce:ar,standChar:Di,takeClearedFurniture:dg,validKennel:Pd},Symbol.toStringTag,{value:"Module"})),ts=256,ns=192,Rd=["#ffffff","#5a3d5c","#ff6b6b","#ff8fab","#ffa94d","#ffd43b","#69db7c","#2f9e44","#4dabf7","#1c5fb8","#b388d6","#7048b6","#c9905a","#7a4b2a","#ced4da","#212529"],vc=8e3,ki=12,hg=["wood","plum","gold","rainbow"],h2=/^a[0-9a-z]{6,24}$/,g2=/^P1[A-Za-z0-9+/]+={0,2}$/;function Bd(e){return typeof e!="string"||e.length<4||e.length>vc||!g2.test(e)||(e.length-2)%4!==0?null:e}function gg(e){return typeof e=="string"&&h2.test(e)?e:null}function u2(e){const t=[];let n=0;for(;n<e.length;){const s=e[n]&15;let o=1;for(;n+o<e.length&&(e[n+o]&15)===s&&o<2056;)o++;if(o<=8)t.push(o-1<<4|s);else{const i=o-9;t.push(128|i>>8<<4|s,i&255)}n+=o}return Uint8Array.from(t)}function m2(e,t=ts*ns){const n=new Uint8Array(t);let s=0;for(let o=0;o<e.length&&s<t;o++){const i=e[o];let a;if(i<128)a=(i>>4)+1;else{if(o+1>=e.length)break;a=((i>>4&7)<<8|e[++o])+9}const r=Math.min(t,s+a);n.fill(i&15,s,r),s=r}return n}const ci="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function y2(e){let t="";for(let n=0;n<e.length;n+=3){const s=e[n],o=e[n+1],i=e[n+2];t+=ci[s>>2]+ci[(s&3)<<4|(o??0)>>4]+(o===void 0?"=":ci[(o&15)<<2|(i??0)>>6])+(i===void 0?"=":ci[i&63])}return t}function b2(e){const t=e.replace(/=+$/,""),n=[];let s=0,o=0;for(const i of t){const a=ci.indexOf(i);if(a<0)break;s=s<<6|a,o+=6,o>=8&&(o-=8,n.push(s>>o&255))}return Uint8Array.from(n)}const Rl=e=>"P1"+y2(u2(e));function ug(e){return!e||!Bd(e)?new Uint8Array(ts*ns):m2(b2(e.slice(2)))}function _c(e,t){for(let n=e.length-1;n>0;n--){const s=Math.floor(t()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}const mg=4,ip=7,k2=30;function w2(){const e=[];let t=0;for(let n=0;n<mg;n++){e.push({id:t++,c:n,v:0});for(let s=1;s<=9;s++)for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s});for(const s of["skip","rev","d2"])for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s})}for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"wild"});for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"w4"});return e}const $c=e=>e.discard[e.discard.length-1],Go=(e,t)=>t.c===4||t.c===e.color||t.v===$c(e).v&&$c(e).c!==4,zn=(e,t,n=1)=>{const s=e.hands.length;return((t+e.dir*n)%s+s)%s};function xc(e,t,n,s){const o=[];for(let i=0;i<n&&e.hands[t].length<k2;i++){if(!e.deck.length){const r=e.discard.pop();if(e.deck=_c(e.discard.map(l=>l),s),e.discard=[r],!e.deck.length)break}const a=e.deck.pop();e.hands[t].push(a),o.push(a)}return e.hands[t].length>1&&(e.slay[t]=!1),o}function v2(e,t){if(e.owe!==null&&e.hands[e.owe]?.length===1&&!e.slay[e.owe]){const n=e.owe;return e.owe=null,{victim:n,vdrew:xc(e,n,2,t).length}}return e.owe=null,{}}const ap=e=>{const t=[0,0,0,0];return e.forEach(n=>{n.c<4&&t[n.c]++}),t.indexOf(Math.max(...t))},_2={id:"slay",name:"Slay",minPlayers:2,maxPlayers:6,setup(e,t){const n=_c(w2(),t),s=Array.from({length:e},()=>n.splice(-ip,ip));let o=n.length-1;for(;typeof n[o].v!="number";)o--;const i=n.splice(o,1)[0];return{deck:n,discard:[i],hands:s,color:i.c,turn:Math.floor(t()*e),dir:1,drawn:null,slay:s.map(()=>!1),owe:null,winner:null,ev:{n:0,p:-1,k:"start",card:i}}},cleanMove(e){return!e||typeof e!="object"?null:e.k==="play"&&Number.isInteger(e.id)&&e.id>=0&&e.id<108?{k:"play",id:e.id,...Number.isInteger(e.color)&&e.color>=0&&e.color<mg?{color:e.color}:{}}:e.k==="draw"||e.k==="pass"||e.k==="slay"?{k:e.k}:null},legal(e,t,n){if(e.winner!==null)return!1;if(n.k==="slay")return e.hands[t].length<=2&&!e.slay[t];if(t!==e.turn)return!1;if(n.k==="draw")return e.drawn===null;if(n.k==="pass")return e.drawn!==null;const s=e.hands[t].find(o=>o.id===n.id);return!s||e.drawn!==null&&s.id!==e.drawn||s.c===4&&n.color===void 0?!1:Go(e,s)},apply(e,t,n,s){const o=e.ev.n+1;if(n.k==="slay")return e.slay[t]=!0,e.owe===t&&(e.owe=null),e.ev={n:o,p:t,k:"slay"},e;const i=v2(e,s);if(n.k==="draw"){const d=xc(e,t,1,s),f=d[0];if(f&&Go(e,f))e.drawn=f.id,e.ev={n:o,p:t,k:"draw",drew:1,...i};else{if(e.drawn=null,e.ev={n:o,p:t,k:"draw",drew:d.length,...i},e.stuck=d.length?0:(e.stuck??0)+1,(e.stuck??0)>=e.hands.length){const p=Math.min(...e.hands.map(g=>g.length));return e.winner=e.hands.findIndex(g=>g.length===p),e.turn=-1,e}e.turn=zn(e,t)}return e}if(n.k==="pass")return e.drawn=null,e.turn=zn(e,t),e.ev={n:o,p:t,k:"pass",...i},e;e.stuck=0;const a=e.hands[t],r=a.splice(a.findIndex(d=>d.id===n.id),1)[0];e.discard.push(r),e.drawn=null,e.color=r.c===4?n.color:r.c;const l={n:o,p:t,k:"play",card:r,color:e.color,...i};if(!a.length)return e.winner=t,e.turn=-1,e.ev=l,e;a.length===1&&!e.slay[t]&&(e.owe=t);const c=e.hands.length===2;if(r.v==="rev")e.dir=e.dir===1?-1:1,e.turn=c?t:zn(e,t);else if(r.v==="skip")l.skipped=zn(e,t),e.turn=zn(e,t,2);else if(r.v==="d2"||r.v==="w4"){const d=zn(e,t);l.skipped=d;const f=r.v==="d2"?2:4;l.drew=xc(e,d,f,s).length,e.turn=zn(e,t,2)}else e.turn=zn(e,t);return e.ev=l,e},turn:e=>e.winner!==null?-1:e.turn,winner:e=>e.winner,view(e,t){return{top:$c(e),color:e.color,turn:e.winner!==null?-1:e.turn,dir:e.dir,deck:e.deck.length,counts:e.hands.map(n=>n.length),slay:e.slay,winner:e.winner,ev:e.ev,...t!==null&&e.hands[t]?{hand:e.hands[t],drawn:t===e.turn?e.drawn:null}:{}}},autoMove(e,t){if(t!==e.turn)return null;if(e.drawn!==null){const s=e.hands[t].find(o=>o.id===e.drawn);return s&&Go(e,s)?{k:"play",id:s.id,...s.c===4?{color:ap(e.hands[t])}:{}}:{k:"pass"}}const n=e.hands[t].find(s=>Go(e,s)&&s.c!==4)??e.hands[t].find(s=>Go(e,s));return n?{k:"play",id:n.id,...n.c===4?{color:ap(e.hands[t])}:{}}:{k:"draw"}},removePlayer(e,t,n){if(e.hands.length<=2)return null;const s=e.turn===t;return e.deck.unshift(...e.hands[t]),_c(e.deck,n),e.hands.splice(t,1),e.slay.splice(t,1),e.owe===t?e.owe=null:e.owe!==null&&e.owe>t&&e.owe--,e.turn>t&&e.turn--,s&&(e.drawn=null,e.dir===-1?e.turn=((t-1)%e.hands.length+e.hands.length)%e.hands.length:e.turn=t%e.hands.length),e.ev={n:e.ev.n+1,p:t,k:"left"},e}},Mc=7,Da=6,$2=(e,t,n)=>{const s=e[t][n];for(const[o,i]of[[1,0],[0,1],[1,1],[1,-1]]){const a=[[t,n]];for(const r of[1,-1])for(let l=1;l<4;l++){const c=t+o*l*r,d=n+i*l*r;if(c<0||c>=Mc||d<0||d>=Da||e[c][d]!==s)break;a.push([c,d])}if(a.length>=4)return a}return null},x2={id:"four",name:"Four in a Row",minPlayers:2,maxPlayers:2,setup:(e,t)=>({b:Array.from({length:Mc},()=>[]),turn:t()<.5?0:1,winner:null,draw:!1,line:null,last:null,n:0}),cleanMove:e=>e&&Number.isInteger(e.col)&&e.col>=0&&e.col<Mc?{col:e.col}:null,legal:(e,t,n)=>e.winner===null&&!e.draw&&t===e.turn&&e.b[n.col].length<Da,apply(e,t,n){e.b[n.col].push(t);const s=e.b[n.col].length-1;e.last={col:n.col,row:s,p:t},e.n++;const o=$2(e.b,n.col,s);return o?(e.winner=t,e.line=o,e.turn=-1):e.b.every(i=>i.length>=Da)?(e.draw=!0,e.turn=-1):e.turn=1-t,e},turn:e=>e.turn,winner:e=>e.winner,view:e=>e,autoMove:(e,t)=>{if(t!==e.turn)return null;const s=[3,2,4,1,5,0,6].find(o=>e.b[o].length<Da);return s===void 0?null:{col:s}},removePlayer:()=>null},yg={slay:_2,four:x2},Xi=2600,Fs=[{game:"slay",seats:6,x:720},{game:"four",seats:2,x:1500},{game:"slay",seats:4,x:2150}],M2=2e4,L2="winter",E2="Winter Cheer",S2={[L2]:E2},C2=["pack:wc-holiday-tree","pack:wc-gingerbread","pack:wc-gingerbread-village","pack:wc-bauble-garland","pack:wc-stocking-row","pack:wc-cane-lamp","pack:wc-star-topper","pack:wc-poinsettia","pack:wc-holly","pack:wc-nutcracker","pack:wc-reindeer","pack:wc-sleigh-planter"],P2=["Berry Wreath","Birch Log Basket","Cabin Picture","Cabin Planks","Candy Cane Lamp","Candy Stripe","Cinnamon Roll Tray","Cocoa Cart","Cocoa Pot","Cookie Oven","Cookie Plate","Cozy Red Plaid","Cozy Sock Hamper","Decorated Holiday Tree","Frosted Pine","Frosty Bookcase","Frosty Dots","Fur-Trim Bench","Gingerbread Cottage","Gingerbread Village","Holly Sprig","Ice Skates","Ice-Blue Wardrobe","Knit Pom Rug","Knit Stocking Row","Knit-Blanket Armchair","LED Candle Trio","Lantern","Log Bench","Marshmallow Jar","Mint Pine Sprigs","Mitten Ottoman","Mittens on a Line","Mug Tree Shelf","Mug of Cocoa","Nutcracker Friend","Penguin Plush","Penguin Plush Chair","Peppermint Counter","Peppermint Swirl Rug","Peppermint Tiles","Pinecone Garland","Pinecone Side Table","Plaid Cabin Sofa","Poinsettia Pot","Polar Bear Plush","Red Plaid Quilt Bed","Reindeer Plush","Ribbon Bauble Garland","Sled Coffee Table","Sleigh Planter","Snow Globe","Snow Knit Carpet","Snow-Globe Lamp","Snowflake Mobile","Snowflake Nightstand","Snowflake Sky","Snowman Buddy","Snowshoes","Snowy Window Art","Snowy Window Seat","Star Tree Topper","Stone Hearth Fireplace","Twinkle Light String","Twinkle-Light Floor Lamp","Winter Cheer","Woodstove","Wrapped Present Stack"],bg="halloween",T2="Spooky Cute",R2={[bg]:T2},B2=!1;function A2(e=new Date){const t=e.getMonth(),n=e.getDate();return t===9&&n>=24||t===10&&n<=2}function kg(e=new Date,t=B2){return t||A2(e)}const I2=["pack:hw-cauldron","pack:hw-cat-statue","pack:hw-witch-hat"],D2=["Autumn Leaf Garland","Black Cat Statue","Bubbly Cauldron","Friendly Sheet Ghost","Harvest Hay Bale","Heart and Moon Pumpkin","Moon and Stars Window Cling","Moonbeam Lantern","Spooky Cute","Starry Glow Pumpkin","Starry Witch Hat","Treat Bowl"],O2=["A-Frame Swing","Acorn Friend","Alarm Clock","Apple","Apple Tree","Arc Floor Lamp","Arc Lamp","Arched Mirror","Arched Shelf","Armchair","Autumn Wreath","Baby Blocks","Baby Bottle","Bakery Shelf","Ball","Balloons","Bananas","Bar Stool","Bassinet","Bath Mat","Bath Mirror","Bath Stool","Bathtub","Beach Ball","Bean Bag","Bed","Berry Basket","Big Leaf Plant","Big Monitor","Big Wardrobe","Birdbath","Birdhouse","Birdie","Blanket Basket","Blocks","Boba Buddy","Book Stack","Books","Bookshelf","Box Stack","Bread","Brush & Comb","Bubble Aquarium","Bubble Bath","Bubble Chair","Bubble-Gum Rug","Bubbly Fountain","Bubbly Plant","Bud Vase","Bulletin Board","Bunk Bed","Bunny","Bunny Plush","Bunny Slippers","Butterfly Bush","Cactus","Cactus Buddy","Cada's Mouse","Cake","Candle Jar","Canopy Bed","Canopy Daybed","Cat Bed","Cat Tower","Caterpillar Plush","Chair","Changing Table","Checker Rug","Checkered Bed","Chick","Chloe's Star Lamp","Clock","Clothes Rail","Clothesline","Cloud Beanbag","Cloud Lamp","Cloud Rug","Cloud Shelf","Cocoa Doll","Cocoa Mug","Coffee Table","Comfy Chair","Cookie Jar","Cooking Pot","Cottage Heart Pouf","Cottage Heart Rug","Counter","Cozy Fireplace","Cozy Lights","Cozy Mug","Cozy Nightstand","Cozy Reading Nook","Cozy Snake Plant","Cozy Teapot","Cream Jars","Cream Sofa","Crib","Crib Mobile","Cubby Shelf","Cube Shelf","Cupcake","Cupcake Stand","Curtains","Curvy Yellow Desk","Cute Keyboard","Cute Speaker","Daisy Pot","Daisy Rug","Desk","Desk Lamp","Desk Mic","Dino Plushie","Dish Cabinet","Dish Rack","Dog Kennel","Doll House","Donut","Dresser","Droplet Buddy","Egg Pan","Fairy-Light Garland","Fairy-Light Shelf","Fan","Fancy Sofa","Fiddle-Leaf Fig","Fig Tree","Fire Pit","Fireplace","Fish Bowl","Fish Tank","Floor Cushion","Flower Cart","Flower Floor Lamp","Flower Kettle","Flower Lamp","Flowers","Foot Spa","Fresh Egg","Fridge","Frog Plush","Fruit Bowl","Game Controller","Gaming Chair","Garden Bench","Garden Carrot","Garden Gnome","Glass Cabinet","Globe","Globe Pendants","Glossy Hair Dryer","Glow Mirror","Gold Floor Mirror","Guinea Pig","Hair Dryer","Hair-Dryer Chair","Hair-Wash Chair","Hammock","Hamster House","Hamster Pal","Hanging Lamp","Hanging Lantern","Hanging Plant","Hanging Vine Planter","Happy Fridge","Headphones","Heart Headboard Bed","Heart Pouf","Heart Rug","Heart Wall Clock","Heart Wall Light","Heart-Leaf Plant","Hedge Row","Herb Box","High Chair","Honey Doll","Ice Cream","Jewelry Box","Juice","Kettle","Kitchen Counter","Knit Cushion","Ladder Shelf","Lamp","Landscape Art","Lattice Bench","Laundry Hamper","Lava Lamp","Lemon Tree","Lemonade Cart","Lemonade Cup","Lighted Vanity","Lilac Curtain","Lily Pond","Little Rocking Horse","Little Slide","Little Sprout","Lotion Bottles","Macaron Jar","Macrame Swing Chair","Mani-Pedi Chair","Manicure Table","Microwave","Milk","Milk & Cookies","Mini Fridge","Mini Greenhouse","Mini Tree","Mint Fridge","Mint Pebble Rug","Mirror","Mixer","Moon and Stars","Moon Night-Light","Moving Box","Mushroom Stool","Music Box","Nail Dryer","Nail Polish","Nail Polish Rack","Night Light","Nightstand","Nursery Cloud Rug","Nursery Dresser","Nursery Lamp","Pancakes","Pantry","Paper Lantern","Pastel Range","Pastel Wardrobe","Patio Lights","Patio Umbrella","Pendant Lamp","Perfume","Perfume Bottle","Perfume Tray","Pet Bowl","Petal Coffee Table","Phone on a Stand","Piano","Picket Gate","Picnic Basket","Picnic Blanket","Picnic Table","Picture","Piggy Bank","Pillow","Pin Board","Pink Vanity","Pinwheel","Pizza","Plant","Plant Stand","Plant Wall","Play Mat","Play Tent","Polish Bottle","Popcorn","Pothos Plant","Pouf","Puffy Cloud Sofa","Puffy Stool","Puppy","Quinn's Cookie Pup","Radio","Rain Barrel","Rainbow Art","Rainbow Rug","Ranch Flowers","Rattle","Reagan's Frame","Reception Desk","Record Player","Ribbon Mirror","Ribbon Tray","Rice Cooker","Ring Light","Robot","Rocker","Rocking Chair","Rocking Horse","Rose Doll","Round Breakfast Table","Round Side Table","Round Woven Rug","Rubber Ducky","Rug","Runner Rug","Salon Chair","Sandbox","Scallop Curtains","Scalloped Loveseat","Seesaw","Shelf","Shower Curtain","Sink","Sink Vanity","Sloane's Rainbow Snail","Snake Plant","Soaking Tub","Soap Dish","Sofa","Sparkle Wall Light","Spice Rack","Splash Pool","Spray Bottle","Sprinkler","Stacking Rings","Star Dresser","Star Lamp","Star Mobile","Stars","Stepping Stones","Sticker Board","Story Pillow","Stove","String Lights","Striped Runner","Succulents","Sun Lounger","Sunny Art","Sunny Bean Bag","Sunny Cloud Rug","Sunny Shelf","Swing Chair","Swivel Stool","Table","Tassel Rug","Teapot","Teapot Set","Teddy","Tiered Tray","Toadstool Light","Toaster","Toilet","Towel Bar","Towel Cart","Towel Stack","Toy Bin","Toy Car","Toy cat","Toy Chest","Toy Train","Trailing Plant Shelf","Tulip Bed","Tulip Vase","Turtle","TV","TV Stand","Unicorn Plushie","Utensil Rail","Vanity","Vanity Stool","Vegetable Patch","Vlog Camera","Wagon","Waiting Bench","Wall Shelf","Wardrobe","Water-Drop Lamp","Watermelon","Wavy Floor Lamp","Window","Window Seat","Wood Armchair","Wood Bookshelf","Wood Coffee Table","Wood Desk","Wood Dresser","Wood Stool","Wood Wall Clock","Wooden Bed","Yard Sign",...P2,...D2],H2=4,Ad=16,rr=e=>String(e??"").toUpperCase().replace(/[^A-Z0-9]/g,""),W2=e=>e.length>=H2&&e.length<=Ad&&/^[A-Z0-9]+$/.test(e),U2=12,V2=["Cada","Chloe","Quinn","Reagan","Sloane"],z2=460,Q2=320,rp=["Sunny Bunny","Bubbly Panda","Sparkle Kitty","Happy Hippo","Cozy Koala","Jolly Jelly","Zippy Fox","Dreamy Deer","Giggly Goose","Peachy Pup","Minty Mouse","Rainbow Duck","Cuddly Cub","Starry Owl","Bouncy Frog","Lucky Lamb","Snuggly Seal","Twinkle Tiger","Berry Bear","Cloudy Llama","Pebble Penguin","Honey Hedgehog","Marshmallow Moose","Cupcake Cat"],wi=["Hi!","Come over!","I love your house!","Let's play!","Follow me!","Look at this!","Want a snack?","Nice!","Yes!","No thanks","Hehe","Be right back","Bye!","Let's decorate!","Wanna race?","So cute!"],wg=["👋","😀","😂","😍","😮","😢","🎉","⭐","❤️","👍","🍕","🐱","🌈","🎶","💤","✨"],Id=60,q2={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t","@":"a",$:"s","!":"i","+":"t"},Bl=["fuck","fuk","fck","shit","sht","bitch","btch","bastard","asshole","ass","dick","cock","pussy","cunt","whore","slut","damn","crap","piss","fag","faggot","retard","nigger","nigga","porn","sex","sexy","nude","naked","boob","boobs","penis","vagina","kill","suicide","stupid","idiot","dumb","hate","loser","shutup","wtf","stfu","gtfo","bs"],N2=["zero","oh","one","two","three","four","five","six","seven","eight","nine","ten"],Z2=[/\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i,/\bi\s*live\s+(at|on|in)\b/i,/\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,/\b(password|passcode|zip\s*code|postcode)\b/i,/\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i],F2=/(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i,j2=/\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i,G2=/@\w/,Y2=/\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;function K2(e,t=Id){if(typeof e!="string")return{ok:!1,reason:"empty"};const n=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(!n)return{ok:!1,reason:"empty"};if(n.length>t)return{ok:!1,reason:"long"};if(F2.test(n))return{ok:!1,reason:"link"};if(j2.test(n)||G2.test(n))return{ok:!1,reason:"contact"};if((n.match(/\d/g)??[]).length>=5||/\d[\d\s().\-]{4,}\d/.test(n)||Y2.test(n))return{ok:!1,reason:"contact"};const o=n.toLowerCase().split(/[^a-z]+/).filter(Boolean);let i=0;for(const c of o)if(i=N2.includes(c)?i+1:0,i>=4)return{ok:!1,reason:"contact"};if(Z2.some(c=>c.test(n)))return{ok:!1,reason:"personal"};const a=n.toLowerCase().replace(/[0-9@$!+]/g,c=>q2[c]??c),r=a.split(/[^a-z]+/).filter(Boolean),l=a.replace(/[^a-z]/g,"").replace(/(.)\1{2,}/g,"$1$1");return r.some(c=>Bl.includes(c)||Bl.includes(c.replace(/(.)\1+/g,"$1")))||Bl.filter(c=>c.length>=5).some(c=>l.includes(c))?{ok:!1,reason:"words"}:{ok:!0,text:n}}const X2={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t",8:"b","@":"a",$:"s","!":"i","+":"t",v:"u","|":"k","<":"k","#":"h"};function J2(e){return/^f+u+c+k+$/.test(e)||/^f+u+k+$/.test(e)||/^f+c+k+$/.test(e)||/^s+h+i+t+$/.test(e)||/^s+h+t+$/.test(e)||/^b+i+t+c+h+$/.test(e)||/^b+t+c+h+$/.test(e)||/^a+s+h+o+l+e+$/.test(e)||/^d+u+m+b+a+s+$/.test(e)||/^n+i+g{2,}e+r+$/.test(e)||/^n+i+g{2,}a+$/.test(e)||/^f+a+g+$/.test(e)||/^f+a+g+o+t+$/.test(e)||/^r+e+t+a+r+d+$/.test(e)||/^k+y+s+$/.test(e)}function ey(e){return/^c+u+n+t+$/.test(e)||/^a+h+o+l+e+$/.test(e)||/^k+i+k+e+$/.test(e)||/^c+h+i+n+k+$/.test(e)||/^s+p+i+c+$/.test(e)||/^c+o{2,}n+$/.test(e)||/^w+e+t+b+a+c+k+$/.test(e)||/^t+r+a+n+y+$/.test(e)||/^t+r+a+n+i+$/.test(e)||/^d+y+k+e+$/.test(e)||/^b+e+a+n+e+r+$/.test(e)||/^g+o{2,}k+$/.test(e)||/^r+a+g+h+e+a+d+$/.test(e)||/^t+o+w+e+l+h+e+a+d+$/.test(e)||/^h+e+i+l+h+i+t+l+e+r+$/.test(e)}const ty=new Set(["spicy","spices","spicing","spicey","spicier","spiciest","cocky","chinking","spicer","gooky","slutty","twatt"]);function ny(e,t){if(!/^[a-z]+$/.test(e)||t&&ty.has(e))return!1;const n=[e],s=["ing","in","ers","er","ed","es","y","s"];for(let o=0;o<s.length;o++){const i=s[o];e.endsWith(i)&&e.length>i.length+2&&n.push(e.slice(0,-i.length))}for(let o=0;o<n.length;o++)if(J2(n[o])||t&&ey(n[o]))return!0;return!1}function sy(e){if(!e.includes("*"))return[e];const t=e.split("*").length-1,n=e.replace(/\*/g,""),s=n?[n]:[];if(t<1||t>3)return s;const o=e.split(""),i=[];for(let r=0;r<o.length;r++)o[r]==="*"&&i.push(r);const a=r=>{if(r===i.length){s.push(o.join(""));return}for(let l=97;l<=122;l++)o[i[r]]=String.fromCharCode(l),a(r+1)};return a(0),s}const lp=["mother","sonofa","horse","bull","dip"],cp=["face","head","you"];function Mo(e,t){const n=e.replace(/ph(?=u+c+k)/g,"f").replace(/ph(?=u+k)/g,"f");if(ny(n,t)||/^w+t+f+$/.test(n)||/^s+t+f+u+$/.test(n))return!0;for(let s=0;s<lp.length;s++){const o=lp[s];if(n.startsWith(o)&&n.length>o.length+2&&Mo(n.slice(o.length),t))return!0}for(let s=0;s<cp.length;s++){const o=oy(n,cp[s]);if(o&&Mo(o,t))return!0}return!!(n.length>4&&n.endsWith("s")&&!n.endsWith("ss")&&Mo(n.slice(0,-1),t))}function oy(e,t){let n=e.length;for(let s=t.length-1;s>=0;s--){const o=t[s];if(n===0||e[n-1]!==o)return null;for(;n>0&&e[n-1]===o;)n--}return n<=2?null:e.slice(0,n)}function lr(e){let t="";for(let n=0;n<e.length;n++)t+=X2[e[n]]??e[n];return t}const iy={ѕ:"s",һ:"h",с:"c",а:"a",е:"e",о:"o",р:"p",і:"i",х:"x",у:"y",к:"k"};function ay(e){const n=e.replace(/[\u00ad\u0336\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").normalize("NFKC").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase();let s="";for(let o=0;o<n.length;o++)s+=iy[n[o]]??n[o];return s}const ry=new Set(["it","its","it's","is","as","a","i","uh","oh","so","he","she","hi","um","umm","hmm","hm","ah","eh","er","ow","ha","hey","yo","ok","yeah","yes","no","nah","wow","ho","ooh","ahh","uhh","ohh"]);function Oi(e){return e>="a"&&e<="z"||e>="0"&&e<="9"||"@$!+*v|#<".includes(e)}function dp(e,t){let n=t;for(;n<e.length&&e[n]==="!";)n++;if(n>=e.length||!Oi(e[n])||e[n]==="!")return null;const s=e[n];let o=n+1;for(;o<e.length&&e[o]==="!";)o++;return o<e.length&&Oi(e[o])?null:{ch:s,end:o}}function ly(e,t){const n=e.length,s=" .-_~";let o=0;for(;o<n;){if(o>0&&Oi(e[o-1])){o++;continue}const i=dp(e,o);if(!i){o++;continue}const a=[i.ch];let r=i.end;for(;r<n&&s.includes(e[r]);){const l=dp(e,r+1);if(!l)break;a.push(l.ch),r=l.end}if(a.length>=2){const l=lr(a.join("")).replace(/\*/g,"");if(Mo(l,t))return!0}o=Math.max(o+1,r)}return!1}function js(e){return e.replace(/^!+/,"").replace(/!+$/,"")}function cr(e){return lr(js(e)).replace(/\*/g,"")}function vg(e){return/[0-9@$!+*|#<]/.test(js(e))}function cy(e){return js(e).length===1}function dy(e){const t=js(e);return t.length<2||vg(e)?!1:/^sh+$/.test(t)||ry.has(t)}function fy(e){let t="space";for(let n=0;n<e.length;n++){const s=e[n];if(!(s===" "||s==="	"||s===`
`||s==="\r")){if(s==="-"){t="hyphen";continue}return"punct"}}return t}function py(e){const t=[];let n=0,s="";for(;n<e.length;){if(!Oi(e[n])){s+=e[n],n++;continue}let o=n+1;for(;o<e.length&&Oi(e[o]);)o++;t.push({text:e.slice(n,o),gap:t.length===0?"start":fy(s)}),s="",n=o}return t}function hy(e){const t=[lr(e)];if(e.charAt(0)==="!"||e.charAt(e.length-1)==="!"){const n=e.replace(/^!+/,"").replace(/!+$/,"");n&&n!==e&&t.push(lr(n))}return t}function gy(e){for(let t=0;t<e.length;t++){if(!/^k+i+l+$/.test(e[t]))continue;const n=e[t+1]||"",s=e[t+2]||"";if(/^y+o+u+r+s+e+l+f+$/.test(n)||/^u+r+s+e+l+f+$/.test(n)||/^u+r+$/.test(n)&&/^s+e+l+f+$/.test(s))return!0}return!1}function uy(e,t,n){if(js(e[n].text)!=="coon")return!1;const s=n>0?t[n-1]:"",o=t[n+1]||"";return s==="maine"||o==="cat"}function my(e,t,n){return n===t+1&&e[n].gap==="space"&&/^a+$/.test(cr(e[t].text))&&/^h+o+l+e+$/.test(cr(e[n].text))}function yy(e,t,n){return js(e[n].text)!=="dyke"?!1:n>0&&js(e[n-1].text)==="van"}function by(e){for(let t=0;t<e.length-1;t++)if(/^h+e+i+l+$/.test(e[t])&&/^h+i+t+l+e+r+$/.test(e[t+1]))return!0;return!1}function ky(e,t=!0){const n=ay(e);if(ly(n,t))return!0;const s=py(n),o=s.map(a=>hy(a.text)),i=s.map(a=>cr(a.text));if(gy(i)||t&&by(i))return!0;for(let a=0;a<o.length;a++)if(!(t&&(uy(s,i,a)||yy(s,i,a))))for(let r=0;r<o[a].length;r++){const l=sy(o[a][r]);for(let c=0;c<l.length;c++)if(Mo(l[c].replace(/\*/g,""),t))return!0}for(let a=0;a<s.length;a++){let r="",l=0,c=!1,d=!1;for(let f=a;f<s.length&&f<a+8;f++){if(f>a){const p=s[f].gap,g=s[f-1].text;if(p==="punct"||p==="start"||g.endsWith("!")||s[f].text.startsWith("!")||p!=="space"&&p!=="hyphen")break}if(r+=cr(s[f].text),cy(s[f].text)&&l++,dy(s[f].text)&&(c=!0),vg(s[f].text)&&(d=!0),f!==a&&!(c&&l<2&&!d)&&Mo(r,t)){if(t&&my(s,a,f))break;return!0}}}return!1}function _g(e,t,n,s=!1){if(typeof e!="string")return{ok:!1,reason:"empty"};const o=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return o?o.length>t?{ok:!1,reason:"long"}:ky(o,!s)?{ok:!1,reason:n}:{ok:!0,text:o}:{ok:!1,reason:"empty"}}function wy(e,t=Id){return _g(e,t,"words")}const el={long:"That is a bit long!",link:"No links, please!",contact:"Keep numbers and contact info secret!",personal:"Keep personal info secret!",words:"Let's use kind words!",mail:"Oops, try different words!",empty:""},$g={};for(const e of["АA","аa","ВB","вb","ЕE","еe","КK","кk","МM","мm","НH","нh","ОO","оo","РP","рp","СC","сc","ТT","тt","УY","уy","ХX","хx","ІI","іi","ЈJ","јj","ЅS","ѕs","ЁE","ёe","ЇI","їi","ΑA","ΕE","ΖZ","ΗH","ΙI","ΚK","ΜM","ΝN","ΟO","ΡP","ΤT","ΥY","ΧX","αa","εe","ζz","ιi","κk","νv","οo","ρp","τt","υu","χx"])$g[e[0]]=e[1];function vy(e){let t="";for(const n of e)t+=$g[n]??n;return t}function _y(e){return vy(String(e).normalize("NFKC")).replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\p{M}]/gu,"").replace(/[\p{Extended_Pictographic}\p{S}\p{P}]+/gu,"").replace(/\s+/g," ").trim()}function $y(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(()=>{const e=[...new Set(O2.map(t=>_y(t)).filter(t=>t.length>=2))].sort((t,n)=>n.length-t.length);return new RegExp(`(^|[^A-Za-z])(?:${e.map($y).join("|")})(?![A-Za-z])`,"gi")})();const fp=(e,t,n)=>typeof e=="number"&&Number.isFinite(e)?Math.max(t,Math.min(n,e)):null,xy=(e,t,n=80)=>typeof e=="string"&&e.length<=n&&t.test(e)?e:null,My=/^#[0-9a-fA-F]{3,8}$/,Ly=["little","kid","adult"];function Ey(e){if(!e||typeof e!="object")return null;const t={};for(const n of["skin","hair","shirt","pants"])if(n in e){const s=xy(e[n],My,9);if(!s)return null;t[n]=s}if("hairStyle"in e){const n=fp(e.hairStyle,0,3);if(n===null)return null;t.hairStyle=Math.round(n)}if("acc"in e){const n=fp(e.acc,0,3);if(n===null)return null;t.acc=Math.round(n)}if("size"in e){if(!Ly.includes(e.size))return null;t.size=e.size}if("flip"in e){if(typeof e.flip!="boolean")return null;t.flip=e.flip}return"look2"in e&&(t.look2=Gi(e.look2)??null),"costume"in e&&(t.costume=io(e.costume)),Object.keys(t).length?t:null}function Ji(e){const t=ps({id:"x"}),n=Ey({skin:e?.skin,hair:e?.hair,hairStyle:e?.hairStyle,shirt:e?.shirt,pants:e?.pants,size:e?.size,acc:e?.acc})??{},s=i=>n[i]??t[i],o={skin:s("skin"),hair:s("hair"),hairStyle:s("hairStyle"),shirt:s("shirt"),pants:s("pants"),size:s("size"),acc:s("acc")};if(e&&typeof e=="object"&&"look2"in e){const i=Gi(e.look2);i&&(o.look2=i)}if(e&&typeof e=="object"&&"costume"in e){const i=io(e.costume);o.costume=i??""}return o}const pp=4,Sy=["Mittens","Luna","Biscuit","Pumpkin","Whiskers","Mochi","Pepper","Noodle","Ginger","Socks"],Cy=["Buddy","Coco","Max","Daisy","Peanut","Rocket","Bella","Waffles","Scout","Honey"];function xg(e){const t=String(e??"").normalize("NFC").replace(/\s+/g," ").trim();return!/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u.test(t)||(t.match(/\d/g)??[]).length>2?null:K2(t).ok?t:null}function Py(e,t=[]){return _g(e,jn,"mail")}function Mg(e){return typeof e.freeMail=="boolean"?e.freeMail:e.freeChat}const Dd=2900,Lc=[{kind:"swing",x:430,y:500},{kind:"swing",x:570,y:500},{kind:"blanket",x:1730,y:548},{kind:"blanket",x:1850,y:548},{kind:"bench",x:2025,y:512},{kind:"bench",x:2105,y:512},{kind:"bench",x:2225,y:512},{kind:"bench",x:2305,y:512}],ye={top:{x:905,y:330},bottom:{x:1110,y:545},ladder:850},ht={x0:2440,x1:2840,y0:470,y1:585},Ty=(e,t)=>e.where===t.where&&(e.where!=="house"||e.houseId===t.houseId&&e.room===t.room),Ry=(e,t)=>Ty(e,t)&&Math.abs(e.x-t.x)<=z2&&Math.abs(e.y-t.y)<=Q2;function ga(e){try{return Td(e)}catch{return e}}const Ec=Tt("cozy-hood"),To=()=>{try{return JSON.parse(localStorage.getItem(Ec)??"null")}catch{return null}},Tn=e=>{e?localStorage.setItem(Ec,JSON.stringify(e)):localStorage.removeItem(Ec)};function tl(){const e=new URLSearchParams(location.search).get("hood");return e?e.replace(/\/$/,""):"https://cozy-hood.andrewmunruh.workers.dev".replace(/\/$/,"")}async function By(e){const t=await fetch(e+"/api/create",{method:"POST"});if(!t.ok)throw new Error("create failed "+t.status);return t.json()}async function Ay(e,t){const n=await fetch(`${e}/api/hood/${encodeURIComponent(t)}`);if(n.status===429)return{slow:!0};if(!n.ok)throw new Error("lookup failed");return n.json()}const hp=e=>e.type==="item/move"?"im:"+e.id:e.type==="char/move"?"cm:"+e.id:e.type==="item/size"?"is:"+("id"in e?e.id:""):null;class nl{constructor(t){this.cfg=t,this.ws=null,this.pid="",this.settings={freeChat:!0},this.players=new Map,this.houses=new Map,this.presence=new Map,this.status="offline",this.speaksSit=!1,this.speaksBaby=!1,this.speaksAmb=!1,this.speaksArt=!1,this.speaksNeeds=!1,this.replaced=!1,this.ranch={plots:[],skew:0},this.tables=new Map,this.handlers=new Map,this.cid=1,this.flushT=0,this.presT=0,this.lastPres=null,this.presDirty=!1,this.closedByUs=!1,this.retry=0,this.retryT=0,this.epoch=0,this.stableT=0,this.outbox=[]}on(t,n){(this.handlers.get(t)??this.handlers.set(t,[]).get(t)).push(n)}emit(t,...n){this.handlers.get(t)?.forEach(s=>s(...n))}send(t){return this.ws?.readyState!==WebSocket.OPEN?!1:(this.ws.send(JSON.stringify(t)),!0)}reliable(t){this.send(t)||(t.t==="lock"?this.outbox=this.outbox.filter(n=>!(n.t==="lock"&&n.houseId===t.houseId)):(t.t==="look"||t.t==="dog")&&(this.outbox=this.outbox.filter(n=>n.t!==t.t)),this.outbox.push(t),this.outbox.length>8&&this.outbox.splice(0,this.outbox.length-8))}flushOutbox(){if(this.ws?.readyState!==WebSocket.OPEN||!this.outbox.length)return;const t=this.outbox;this.outbox=[];for(const n of t)this.send(n)||this.outbox.push(n)}scheduleRetry(){if(this.closedByUs||this.replaced||!this.cfg.token||this.retryT)return;const t=this.epoch,n=Math.min(15e3,400*2**Math.min(this.retry,6));this.retry++,this.retryT=window.setTimeout(()=>{this.retryT=0,!(t!==this.epoch||this.closedByUs||this.replaced||!this.cfg.token)&&this.connect()},n)}armStable(){this.stableT&&clearTimeout(this.stableT),this.stableT=window.setTimeout(()=>{this.stableT=0,this.retry=0},1e4)}clearStable(){this.stableT&&(clearTimeout(this.stableT),this.stableT=0)}connect(t){this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.closedByUs=!1,this.replaced=!1,this.status="connecting",this.emit("status",this.status);const n=this.ws;return new Promise(s=>{let o=!1;const i=r=>{o||(o=!0,s(r))},a=new WebSocket(this.cfg.url.replace(/^http/,"ws")+"/ws/"+encodeURIComponent(this.cfg.id??this.cfg.code));if(this.ws=a,n&&n!==a)try{n.close()}catch{}a.onopen=()=>{t&&!this.cfg.token?this.send({t:"join",...t,v:pp,pet:1,mail:1,sit:1,fit:1,baby:1,amb:1,halloween:1,cos:1,needs:1,art:1}):this.cfg.token?this.send({t:"hello",token:this.cfg.token,v:pp,pet:1,mail:1,sit:1,fit:1,baby:1,amb:1,halloween:1,cos:1,needs:1,art:1}):i("notoken")},a.onmessage=r=>{const l=JSON.parse(r.data);this.handle(l),l.t==="welcome"&&(this.armStable(),i("ok")),l.t==="error"&&i(l.code+(l.msg?":"+l.msg:"")),l.t==="removed"&&i("removed")},a.onclose=r=>{if(this.ws===a){if(this.clearStable(),this.ws=null,this.status="offline",i("closed"),r.code===4e3){this.replaced=!0,this.emit("status",this.status),this.emit("replaced");return}this.emit("status",this.status),this.scheduleRetry()}},a.onerror=()=>{}})}close(){this.closedByUs=!0,this.replaced=!1,this.epoch++,this.outbox=[],this.clearStable(),this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.presT&&(clearTimeout(this.presT),this.presT=0);try{this.ws?.close()}catch{}this.ws=null,this.status="offline",clearInterval(this.flushT)}handle(t){switch(t.t){case"joined":this.cfg.token=t.token,this.cfg.pid=t.pid,Tn(this.cfg);break;case"welcome":this.pid=t.pid,this.settings=t.settings,this.status="online",this.speaksSit=t.sit===1,this.speaksBaby=t.baby===1,this.speaksAmb=t.amb===1,this.speaksArt=t.art===1,this.speaksNeeds=t.needs===1,this.players=new Map(t.players.map(n=>[n.pid,n]));{const n=this.houses;this.houses=new Map;for(const s of t.houses){const{state:o,...i}=s,a=n.get(s.id);this.houses.set(s.id,{meta:i,confirmed:ga(o),pending:a?a.pending.filter(r=>!r.sent):[],view:null})}}this.presence=new Map(Object.entries(t.presence)),this.presence.delete(this.pid),t.ranch&&(this.ranch={plots:t.ranch.plots,skew:t.ranch.now-Date.now()});{const n=new Map;for(const s of t.tables??[])n.set(s.tb,this.stampTable(s));this.tables=n}clearInterval(this.flushT),this.flushT=window.setInterval(()=>this.flush(),60),this.lastPres&&(this.presDirty=!0),this.flushPres(),this.flushOutbox(),this.emit("welcome"),this.emit("status",this.status);break;case"act":{const n=this.houses.get(t.houseId);if(!n)return;n.confirmed=ar(ga(n.confirmed),t.action);const s=t.by===this.pid&&n.pending[0]?.cid===t.cid;s&&n.pending.shift(),n.view=null,s||this.emit("act",t.houseId,t.action);break}case"nack":{const n=this.houses.get(t.houseId);if(!n)return;n.pending=n.pending.filter(s=>s.cid!==t.cid),t.state&&(n.confirmed=ga(t.state)),n.view=null,this.emit("reset",t.houseId,t.reason);break}case"pres":t.pid!==this.pid&&(t.p?this.presence.set(t.pid,t.p):this.presence.delete(t.pid),this.emit("pres",t.pid));break;case"players":this.players=new Map(t.players.map(n=>[n.pid,n])),this.emit("players");break;case"house":{const{state:n,...s}=t.house;this.houses.set(s.id,{meta:s,confirmed:ga(n),pending:[],view:null}),this.emit("houses");break}case"houseMeta":{const n=this.houses.get(t.meta.id);n&&(n.meta=t.meta,this.emit("houses"),this.emit("houseMeta",t.meta.id));break}case"houseGone":this.houses.delete(t.houseId),this.emit("houses"),this.emit("houseGone",t.houseId);break;case"settings":this.settings=t.settings,this.emit("settings");break;case"bubble":this.emit("bubble",t.pid,t.b);break;case"fx":this.emit("fx",t.pid,t.fx);break;case"knocked":this.emit("knocked",t.houseId,t.name);break;case"ranch":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch");break;case"ranchFail":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch"),this.emit("ranchFail",t.reason);break;case"noride":this.emit("noride",t.ride);break;case"table":{const n=this.stampTable(t.table);this.tables.set(n.tb,n),this.emit("table",n);break}case"tblFail":this.emit("tblFail",t.tb,t.reason);break;case"sayFail":this.emit("sayFail",t.reason);break;case"mailbox":{const n=this.houses.get(t.houseId);if(!n)return;if(t.mailbox?.letters?.length)n.confirmed={...n.confirmed,mailbox:t.mailbox};else{const{mailbox:s,...o}=n.confirmed;n.confirmed=o}n.view=null,this.emit("mailbox",t.houseId);break}case"mailFail":this.emit("mailFail",t.reason);break;case"art":this.emit("art",t.houseId,t.arts);break;case"artFail":this.emit("artFail",t.houseId,t.id,t.reason);break;case"parentInfo":this.emit("parentInfo",t);break;case"error":this.emit("error",t.code),t.code==="badtoken"&&(this.cfg.token=void 0,this.cfg.pid=void 0,Tn(this.cfg));break;case"removed":this.closedByUs=!0,this.emit("removed");break}}stampTable(t){const n=this.tables.get(t.tb),s=n&&n.away===t.away&&n.receivedAt?n.receivedAt:Date.now();return{...t,receivedAt:s}}view(t){const n=this.houses.get(t);return n?n.view??=n.pending.reduce((s,o)=>ar(s,o.action),n.confirmed):null}myHouseId(){return this.players.get(this.pid)?.houseId??""}canEdit(t){const n=this.houses.get(t);return!!n&&(!n.meta.locked||n.meta.ownerId===this.pid)}dispatch(t,n){const s=this.houses.get(t);if(!s)return;const o=hp(n),i=s.pending[s.pending.length-1];o&&i&&!i.sent&&hp(i.action)===o?i.action=n:s.pending.push({cid:this.cid++,action:n,sent:!1}),s.view=null}flush(){for(const[t,n]of this.houses)for(const s of n.pending)!s.sent&&this.send({t:"act",houseId:t,cid:s.cid,action:s.action})&&(s.sent=!0);this.flushPres()}setPresence(t){this.lastPres=t,this.presDirty=!0,this.presT||this.flushPres()}flushPres(){if(!(!this.presDirty||!this.lastPres)){if(!this.send({t:"pres",p:this.lastPres})){!this.closedByUs&&!this.presT&&(this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90));return}this.presDirty=!1,this.presT&&clearTimeout(this.presT),this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90)}}myPresence(){return this.lastPres}say(t){this.reliable({t:"say",b:t})}lock(t,n){this.reliable({t:"lock",houseId:t,locked:n})}setLook(t){this.reliable({t:"look",look:t});const n=this.players.get(this.pid);n&&(n.look=t)}setDog(t){this.reliable({t:"dog",dog:t});const n=this.players.get(this.pid);n&&(n.dog=t)}fx(t){this.reliable({t:"fx",fx:t})}knock(t){this.send({t:"knock",houseId:t})}ranchOp(t){this.reliable({t:"ranch",o:t})}tbl(t){this.reliable({t:"tbl",...t})}saveArt(t,n,s){return this.send({t:"art",op:"save",houseId:t,id:n,data:s})}getArt(t,n){return this.send({t:"art",op:"get",houseId:t,ids:n})}sendMail(t,n,s,o){this.reliable({t:"mail",op:"send",houseId:t,text:n,color:s,sticker:o})}readMail(t,n){this.reliable({t:"mail",op:"read",houseId:t,id:n})}dropMail(t,n){this.reliable({t:"mail",op:"drop",houseId:t,id:n})}now(){return Date.now()+this.ranch.skew}parent(t){this.cfg.parentKey&&this.reliable({t:"parent",key:this.cfg.parentKey,...t})}}function Iy(e,t,n,s="living"){let o=s;const i=[],a=()=>({...e.view(t),currentRoom:o,soundOn:n.get()}),r=l=>{if(e.houses.has(t)){const c=a();i.forEach(d=>d(c,l))}};return e.on("act",(l,c)=>{l===t&&r(c)}),e.on("reset",l=>{l===t&&r({type:"game/reset"})}),{houseId:t,get:a,subscribe(l){i.push(l)},dispatch(l){if(l.type==="room/switch")o=l.room;else if(l.type==="settings/sound")n.set(l.on);else{if(l.type==="game/reset")return;if(!e.canEdit(t)||l.type.startsWith("baby/")&&!e.speaksBaby||l.type==="item/power"&&!e.speaksAmb||l.type.startsWith("need/")&&!e.speaksNeeds)return;e.dispatch(t,l)}r(l)}}}const it="#5a3d5c",fe=`stroke="${it}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,Sc=[{name:"Tabby",body:"#ffb26b",stripe:"#e8893a",belly:"#ffe3c4"},{name:"Smokey",body:"#b9b6c9",stripe:"#8f8ba3",belly:"#ecebf3"},{name:"Tuxedo",body:"#4f4660",stripe:"",belly:"#ffffff"},{name:"Calico",body:"#fff6ec",stripe:"",belly:"#fff6ec"}],Cc=[{name:"Pup",body:"#f2d0a4",ear:"#b07d54",snout:"#fbe7cc"},{name:"Poodle",body:"#fff0f6",ear:"#ffc8dd",snout:"#fff7fb"},{name:"Dachshund",body:"#c07a45",ear:"#7d4a26",snout:"#d99a68"},{name:"Golden",body:"#f4b860",ear:"#e09a3e",snout:"#fbd9a0"},{name:"Spotty",body:"#ffffff",ear:"#4a3f52",snout:"#ffffff"}],Dy=(e,t,n,s=!1)=>s?`<path d="M${e-3} ${n} q3 3 6 0 M${t-3} ${n} q3 3 6 0" fill="none" ${fe} stroke-width="2.5"/>`:`<circle cx="${e}" cy="${n}" r="2.8" fill="${it}"/><circle cx="${t}" cy="${n}" r="2.8" fill="${it}"/><circle cx="${e+.9}" cy="${n-.9}" r=".9" fill="#fff"/><circle cx="${t+.9}" cy="${n-.9}" r=".9" fill="#fff"/>`,Pc=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>`;function Ro(e,t="stand"){const n=Sc[e]??Sc[0],s="#ffb3c6",o=(i,a,r,l)=>`
    <path d="M${i-13} ${a-8} L${i-10} ${a-25} L${i-1} ${a-13} Z" fill="${n.body}" ${fe}/><path d="M${i-10.5} ${a-11} L${i-9.5} ${a-20} L${i-4} ${a-13} Z" fill="${s}"/>
    <path d="M${i+1} ${a-13} L${i+11} ${a-26} L${i+13} ${a-7} Z" fill="${e===3?"#f4a259":n.body}" ${fe}/><path d="M${i+4} ${a-13} L${i+10} ${a-21} L${i+11} ${a-11} Z" fill="${s}"/>
    <circle cx="${i}" cy="${a}" r="${r}" fill="${n.body}" ${fe}/>
    ${e===3?`<path d="M${i+2} ${a-r+1} a${r} ${r} 0 0 1 ${r-3} ${r-2} q-6 2 -${r-3} -${r-3}z" fill="#f4a259"/>`:""}
    ${e===2?`<ellipse cx="${i+2}" cy="${a+7}" rx="9" ry="7" fill="#fff"/>`:""}
    ${n.stripe?`<path d="M${i-4} ${a-r+2} v5 M${i+2} ${a-r+1} v6 M${i+8} ${a-r+3} v4" ${fe} stroke="${n.stripe}" stroke-width="2.5"/>`:""}
    ${Dy(i-4,i+7,a,l)}
    <path d="M${i+3} ${a+4} l-2.5 -2 h5 z" fill="#ff8fab"/><path d="M${i+.5} ${a+6} q2.5 2.5 5 0" fill="none" ${fe} stroke-width="2"/>
    ${Pc(i-8,a+5)}${Pc(i+12,a+5)}
    <path d="M${i+r-2} ${a+3} l9 -2 M${i+r-2} ${a+6} l9 2" ${fe} stroke-width="1.6"/>`;return t==="nap"?`<svg viewBox="0 0 120 100" class="catsvg nap">
    <g class="breathe"><path class="tail" d="M28 84 Q22 96 64 94" fill="none" stroke="${it}" stroke-width="11" stroke-linecap="round"/><path d="M28 84 Q22 96 64 94" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="76" rx="36" ry="18" fill="${n.body}" ${fe}/>
    ${e===3?'<ellipse cx="44" cy="72" rx="12" ry="8" fill="#f4a259"/><ellipse cx="66" cy="70" rx="9" ry="6" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 62 q3 6 0 12 M56 61 q3 6 0 12 M68 62 q3 6 0 11" fill="none" ${fe} stroke="${n.stripe}" stroke-width="3"/>`:""}
    ${o(90,76,15,!0)}</g></svg>`:t==="sit"?`<svg viewBox="0 0 120 100" class="catsvg sit">
    <path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${it}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="70" rx="20" ry="25" fill="${n.body}" ${fe}/>
    <ellipse cx="70" cy="74" rx="10" ry="15" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="54" cy="66" rx="9" ry="12" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M50 60 q5 2 4 8 M49 72 q5 2 4 8" fill="none" ${fe} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect x="62" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${fe}/><rect x="74" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${fe}/>
    ${e===2?'<ellipse cx="66.5" cy="93" rx="4" ry="2.5" fill="#fff"/><ellipse cx="78.5" cy="93" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(72,36,17,!1)}</svg>`:`<svg viewBox="0 0 120 100" class="catsvg stand">
    <path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${it}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <rect class="leg b" x="34" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${fe}/><rect class="leg a" x="74" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${fe}/>
    <ellipse cx="58" cy="58" rx="32" ry="17" fill="${n.body}" ${fe}/>
    <ellipse cx="64" cy="66" rx="20" ry="7" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="46" cy="52" rx="12" ry="9" fill="#f4a259"/><ellipse cx="68" cy="50" rx="9" ry="7" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 43 q3 6 0 12 M56 42 q3 6 0 12 M68 43 q3 6 0 11" fill="none" ${fe} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect class="leg a" x="44" y="64" width="9" height="30" rx="4.5" fill="${n.body}" ${fe}/><rect class="leg b" x="84" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${fe}/>
    ${e===2?'<ellipse cx="48.5" cy="92" rx="4" ry="2.5" fill="#fff"/><ellipse cx="88.5" cy="92" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(90,40,17,!1)}</svg>`}function Hi(e,t="stand"){const n=Cc[e]??Cc[0],s=t==="sleep",o=e===2,i=e===1,a=e===3,r=e===4,l=o?66:58,c=o?70:62,d=94-c,f=o?102:92,p=o?50:40,g=(_,P)=>i?`<rect class="leg ${P}" x="${_+2}" y="${c}" width="6" height="${d}" rx="3" fill="${n.body}" ${fe}/><circle class="leg ${P}" cx="${_+5}" cy="91" r="6" fill="${n.body}" ${fe}/>`:`<rect class="leg ${P}" x="${_}" y="${c}" width="10" height="${d}" rx="5" fill="${n.body}" ${fe}/>`,b=i?`<circle cx="44" cy="58" r="15" fill="${n.body}" ${fe}/><circle cx="70" cy="56" r="17" fill="${n.body}" ${fe}/><ellipse cx="57" cy="58" rx="22" ry="12" fill="${n.body}"/>`:`<ellipse cx="${o?62:58}" cy="${l}" rx="${o?42:32}" ry="${o?13:17}" fill="${n.body}" ${fe}/>`,m=r?`<circle cx="46" cy="54" r="5" fill="${it}"/><circle cx="64" cy="62" r="4" fill="${it}"/><circle cx="72" cy="50" r="3.5" fill="${it}"/><circle cx="38" cy="64" r="3" fill="${it}"/>`:"",k=i?`<g class="tail"><path d="M30 52 L22 38" ${fe}/><circle cx="21" cy="34" r="7" fill="${n.body}" ${fe}/></g>`:a?`<path class="tail" d="M30 52 Q10 50 14 30 Q20 40 30 46" fill="${n.body}" ${fe}/>`:`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${it}" stroke-width="9" stroke-linecap="round"/>`,y=!i&&!a?`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`:"",u=`
    ${i?`<circle cx="${f-2}" cy="${p-16}" r="10" fill="${n.body}" ${fe}/>`:""}
    <circle cx="${f}" cy="${p}" r="17" fill="${n.body}" ${fe}/>
    ${r?`<circle cx="${f-6}" cy="${p-8}" r="4" fill="${it}"/>`:""}
    <ellipse cx="${f+13}" cy="${p+7}" rx="11" ry="8" fill="${n.snout}" ${fe}/>
    <circle cx="${f+22}" cy="${p+4}" r="4" fill="${it}"/>
    <path d="M${f+14} ${p+12} q4 3 8 0" fill="none" ${fe} stroke-width="2"/>
    ${s?"":`<path class="tongue" d="M${f+16} ${p+13} q2 7 6 0" fill="#ff8fab" ${fe} stroke-width="2"/>`}
    ${s?`<path d="M${f+2} ${p-4} q3 3 6 0" fill="none" ${fe} stroke-width="2.4"/>`:`<circle cx="${f+5}" cy="${p-3}" r="3" fill="${it}"/><circle cx="${f+6}" cy="${p-4}" r="1" fill="#fff"/>`}
    ${Pc(f+2,p+8)}
    ${i?`<circle cx="${f-9}" cy="${p+8}" r="9" fill="${n.ear}" ${fe}/>`:`<ellipse class="ear" cx="${f-9}" cy="${p+4}" rx="7" ry="${a||o?14:12}" fill="${n.ear}" ${fe} transform="rotate(12 ${f-9} ${p+4})"/>`}
    <path d="M${f-12} ${p+14} q10 6 20 2" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/><circle cx="${f-1}" cy="${p+19}" r="3" fill="#ffd166" ${fe} stroke-width="1.5"/>`,w=i?`<g class="tail"><path d="M42 86 L28 80" ${fe}/><circle cx="25" cy="78" r="7" fill="${n.body}" ${fe}/></g>`:`<path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${it}" stroke-width="9" stroke-linecap="round"/><path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`;return t==="sit"||t==="sleep"?`<svg viewBox="0 0 130 100" class="dogsvg ${s?"sleep":"sit"}">${w}
    <ellipse cx="60" cy="70" rx="22" ry="24" fill="${n.body}" ${fe}/>${r?`<circle cx="54" cy="66" r="5" fill="${it}"/><circle cx="64" cy="80" r="4" fill="${it}"/>`:""}
    ${g(62,"a")}${g(74,"b")}<g transform="translate(-22 -2)">${u}</g></svg>`:`<svg viewBox="0 0 130 100" class="dogsvg stand">${k}${y}
    ${g(o?30:34,"b")}${g(o?82:72,"a")}
    ${b}${m}
    ${g(o?42:46,"a")}${g(o?94:84,"b")}
    ${u}</svg>`}const Lg=e=>{let t=2166136261;for(const n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0},Ts=(e,t)=>{let n=(e^Math.imul(t,2654435761))>>>0;return n^=n>>>15,n=Math.imul(n,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296},gp=18,Oy={1:.35,2:.6};function Hy(e,t,n){return e-t*Oy[n]}function Wy(e,t){const s=Math.floor(t/1e3/2.8);return Ts(Lg(e||"pup"),s)<.62?"rest":"peek"}function Uy(e,t,n,s,o=!1){const i=Lg(e.name+":"+e.coat+":"+e.room+":"+Math.round(e.x)+(n?":t"+Math.round(n.x):"")),a=t/1e3,r=Math.floor(a/gp),l=a-r*gp;if(!n){const y=V=>Math.max(160,Math.min(2240,e.x+(Ts(i,V)-.5)*760)),u=y(r-1);let w=y(r);const _=Ts(i+7,r),P=_<.45?"nap":_<.75?"sit":"groom",x=!!(s&&P==="nap"&&Ts(i+13,r)<.72);x&&s&&(w=Math.max(160,Math.min(2240,s.x)));const E=Math.abs(w-u),W=Math.min(5,E/110);return l<W&&!o?{x:u+(w-u)*(l/W),mood:"walk",flip:w<u,perch:0,curl:0}:{x:w,mood:P,flip:w<u,perch:0,curl:x?1:0}}const c=Math.max(160,Math.min(2240,n.x)),d=Ts(i+5,r)<.45?2:1,f=Math.max(160,Math.min(2240,c+(Ts(i,r)-.5)*420)),p=Math.abs(c-f),g=Math.min(4.2,Math.max(.6,p/160)),b=c<f;if(l<g&&!o)return{x:f+(c-f)*(l/g),mood:"walk",flip:b,perch:0,curl:0};const m=Ts(i+11,r),k=m<.34?"nap":m<.67?"sit":"play";return{x:c,mood:k,flip:b,perch:d,curl:0}}const dr="#5a3d5c",Oe=`stroke="${dr}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,ko=[`<svg viewBox="0 0 48 48"><path d="M24 40 C16 32 6 26 10 16 C14 8 24 12 24 20 C24 12 34 8 38 16 C42 26 32 32 24 40 Z" fill="#ff6b9a" ${Oe}/></svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd166" ${Oe}/></svg>`,`<svg viewBox="0 0 48 48"><circle cx="24" cy="22" r="6" fill="#ff8fab" ${Oe}/>${[0,60,120,180,240,300].map(e=>`<circle cx="${24+Math.cos(e*Math.PI/180)*12}" cy="${22+Math.sin(e*Math.PI/180)*12}" r="5" fill="#ffd166" ${Oe}/>`).join("")}<path d="M24 34 V44" ${Oe}/></svg>`,`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="10" fill="#ffb26b" ${Oe}/><circle cx="34" cy="20" r="8" fill="#ffc46b" ${Oe}/><path d="M28 14 L30 6 L36 14" fill="#ffb26b" ${Oe}/><circle cx="32" cy="19" r="1.4" fill="${dr}"/><circle cx="37" cy="19" r="1.4" fill="${dr}"/></svg>`,`<svg viewBox="0 0 48 48">${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M8 ${30-t*4} Q24 ${10-t*3} 40 ${30-t*4}" fill="none" stroke="${e}" stroke-width="4"/>`).join("")}</svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l3 10 10 1 -8 6 3 10 -8 -5 -8 5 3 -10 -8 -6 10 -1z" fill="#fff3b0" ${Oe}/><circle cx="12" cy="34" r="3" fill="#ff8fab" ${Oe}/><circle cx="36" cy="36" r="2.4" fill="#bde0fe" ${Oe}/></svg>`];function up(e){const t=e?`<g class="flag"><path d="M30 16 V6" ${Oe}/><path d="M30 6 H42 L38 11 L42 16 H30 Z" fill="#ff6b6b" ${Oe}/></g>`:`<g class="flag"><path d="M18 28 H28" ${Oe}/><path d="M18 22 H28 L25 25 L28 28 H18 Z" fill="#ffd166" ${Oe}/></g>`;return`<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="68" rx="18" ry="3" fill="#000" opacity=".12"/>
    <rect x="30" y="40" width="5" height="26" rx="2" fill="#c99366" ${Oe}/>
    <path d="M8 40 V22 Q8 8 32 8 Q56 8 56 22 V40 Z" fill="#8ecae6" ${Oe}/>
    <path d="M8 28 H56" ${Oe}/>
    <rect x="14" y="32" width="36" height="16" rx="4" fill="#fff6e6" ${Oe}/>
    <circle cx="32" cy="40" r="3" fill="${dr}"/>
    ${t}
  </svg>`}function Vy(e,t=[]){const n=Py(e,t);return n.ok?{ok:!0,text:n.text}:{ok:!1,msg:n.reason==="empty"?"Write a little note!":el[n.reason]||"Oops, try different words!"}}const zy={...el,empty:"Write a little note!",slow:"Let's wait a moment!",full:"This mailbox is full!",notyours:"Only she can open her mail.",nohouse:"That house is not on the street.",gone:"That letter is already gone.",toobig:"The mailbox is too full!",presetsOnly:"Typing is turned off: pick a phrase!",unread:"She still has your letters! Wait until she reads them."};function Qy(e){return zy[e]||"Let's try that again!"}function qy(e){let t="",n="",s=!1,o="",i=0,a=0,r=-1,l="",c="";const d=()=>document.getElementById("mailCue");d()?.addEventListener("click",()=>{e.openOwn()});function f(){t="",n="",document.getElementById("mailSheet")?.remove()}function p(){let y=document.getElementById("mailSheet");return y||(y=document.createElement("div"),y.id="mailSheet",y.className="sheet mailSheet",y.innerHTML='<div class="card" id="mailCard"></div>',document.body.appendChild(y),y.addEventListener("click",u=>{const w=u.target;if(w===y||w.closest('[data-m="close"]')){f();return}b(w)}),y.addEventListener("input",u=>{const w=u.target;if(w.id!=="mailText")return;const _=document.getElementById("mailCount");_&&(_.textContent=`${w.value.length}/${jn}`)})),y}function g(){if(!t)return;const y=p().querySelector("#mailText")?.value??"",u=e.mine(t),w=e.lettersOf(t),_=e.houseName(t),P=p().querySelector("#mailCard");if(n&&u&&!s){const E=w.find(W=>W.id===n);if(E&&E.text){m(E);return}n=""}if(s||!u){const E=e.freeType(),W=o?`Reply to ${e.houseName(o)||"your friend"}`:u?"Leave a letter":`Letter for ${_}`,V=E?`<textarea id="mailText" class="mailBox" maxlength="${jn}" placeholder="Hi! Come play!"></textarea>
        <div class="mailCount" id="mailCount">0/${jn}</div>`:`<h3>Phrase</h3><div class="phrases mailPhrases">${wi.map((Y,K)=>`<button type="button" data-phrase="${K}" class="${K===r?"on":""}">${yt(Y)}</button>`).join("")}</div>`;P.innerHTML=`<button class="close" data-m="close">✕</button><h2>${yt(W)}</h2>
        <p class="hint">${E?"A short note. Your name goes on it for you.":"Pick a phrase. Your name goes on it for you."}</p>
        ${V}
        <h3>Paper</h3><div class="mailRow">${Vn.map((Y,K)=>`<button class="swatch ${K===i?"on":""}" data-color="${K}" style="background:${Y}" aria-label="Paper ${K+1}"></button>`).join("")}</div>
        <h3>Sticker</h3><div class="mailRow">${ko.slice(0,Xh).map((Y,K)=>`<button class="stick ${K===a?"on":""}" data-sticker="${K}" aria-label="Sticker ${K+1}">${Y}</button>`).join("")}</div>
        ${l?`<p class="mailErr" id="mailErr">${yt(l)}</p>`:""}
        <button class="mailSend" id="mailSend" type="button">Send</button>
        ${u&&w.length?'<button class="mailRow" data-act="back" type="button" style="margin-top:8px">Back to my mail</button>':""}`;const ne=p().querySelector("#mailText");if(ne&&y){ne.value=y;const Y=document.getElementById("mailCount");Y&&(Y.textContent=`${y.length}/${jn}`)}return}const x=w.length?w.slice().reverse().map(E=>E.text?`<button type="button" class="letter ${E.read?"":"fresh"}" data-letter="${yt(E.id)}" style="background:${Vn[E.color]??Vn[0]}">
        <span class="sticker">${ko[E.sticker]??ko[0]}</span>
        <span class="who">${yt(E.from)}</span><span class="when">${yt(Sl(E.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${Oe}/><path d="M4 8 L40 24 L76 8" fill="${Vn[E.color]??"#fff"}" ${Oe}/></svg>
      </button>`:`<div class="letter" style="background:${Vn[E.color]??Vn[0]}"><span class="who">Your letter</span><span class="when">${yt(Sl(E.at))}</span><span class="statusChip ${E.read?"read":""}">${E.read?"Read":"Delivered"}</span></div>`).join(""):'<p class="hint">No letters yet. Your flag pops up when one arrives!</p>';P.innerHTML=`<button class="close" data-m="close">✕</button><h2>${yt(_)} mailbox</h2>${x}
      <div class="mailRow"><button type="button" data-act="write">Write a letter</button></div>
      ${l?`<p class="mailErr">${yt(l)}</p>`:""}`}function b(y){const u=y.closest(".mailPhrases [data-phrase]");if(u){r=+u.dataset.phrase,l="",g();return}const w=y.closest("[data-color]");if(w){i=+w.dataset.color,g();return}const _=y.closest("[data-sticker]");if(_){a=+_.dataset.sticker,g();return}if(y.closest("#mailSend"))return k();const P=y.closest("[data-act]")?.dataset.act;if(P==="write"){s=!0,o="",n="",l="",g();return}if(P==="back"){s=!1,o="",n="",l="",g();return}if(P==="reply"){const ne=e.houseOf(y.closest("[data-from]")?.dataset.from??"");if(!ne){e.toast("They are not on the street anymore.");return}o=ne,s=!0,n="",l="",t=ne,g();return}if(P==="drop"){const ne=y.closest("[data-id]")?.dataset.id??"";if(c!==ne){c=ne,e.toast("Tap again to throw it away");return}c="",e.drop(t,ne);return}const x=y.closest("[data-letter]");if(!x)return;const E=x.dataset.letter,V=e.lettersOf(t).find(ne=>ne.id===E);V&&(!e.mine(t)||!V.text||(V.read||e.read(t,E),n=E,m(V)))}function m(y){const u=Ny(y.text),w=p().querySelector("#mailCard");w.innerHTML=`<button class="close" data-m="close">✕</button>
      <div class="letter open read" style="background:${Vn[y.color]??Vn[0]}" data-id="${yt(y.id)}" data-from="${yt(y.fromPid)}">
        <span class="sticker">${ko[y.sticker]??ko[0]}</span>
        <span class="who">${yt(y.from)}</span><span class="when">${yt(Sl(y.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${Oe}/><path class="flap" d="M4 8 L40 24 L76 8" fill="#fff" ${Oe}/></svg>
        <p class="words">${yt(u??"")}</p>
        <span class="mailRow"><button type="button" data-act="reply">Reply</button><button type="button" class="throw" data-act="drop">${c===y.id?"Tap again":"Throw away"}</button></span>
      </div>
      <button type="button" data-act="back">All my mail</button>
      ${l?`<p class="mailErr">${yt(l)}</p>`:""}`}function k(){let y="";if(e.freeType()){const w=p().querySelector("#mailText")?.value??"",_=Vy(w);if(!_.ok){l=_.msg,g();const P=p().querySelector("#mailText");P&&(P.value=w);return}y=_.text}else{if(r<0||r>=wi.length){l="Pick a phrase!",g();return}y=wi[r]}const u=o||t;l="",e.send(u,y,i,a),e.toast("On its way!"),e.mine(u)?(s=!1,o="",t=u,g()):f()}return{open(y,u,w,_){t=y,n="",s=!w,o="",l="",c="",i=0,a=0,r=-1,g()},fail(y){l=Qy(y),t?g():e.toast(l)},refresh(){t&&g()},syncCue(y){d()?.classList.toggle("show",y)}}}function Ny(e){if(!e)return null;const t=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return!t||t.length>jn?null:t}function yt(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const Eg=()=>Tt("cozy-play");function Zy(){try{return localStorage.getItem(Eg())==="play"?"play":"decorate"}catch{return"decorate"}}function Fy(e){try{localStorage.setItem(Eg(),e)}catch{}}function jy(e){return e==="kennel"?"kennel":e==="cat-tower"?"tower":e==="yard-swing"?"swing":e==="lamp"||/(^|:)lamp|starlamp|light/.test(e)?"lamp":e==="fridge"||e==="stove"||e==="vanity"||e==="bookshelf"||e==="window"||e==="mirror"||e==="tv"||/fridge|stove|cabinet|drawer|vanity/.test(e)?"open":ao(e)?"sit":"wiggle"}const Gy='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M34 8 l1.2 3 3 .4 -2.2 2 .6 3 -2.6-1.6 -2.6 1.6 .6-3 -2.2-2 3-.4z" fill="#ffd166" stroke="#5a3d5c" stroke-width="1.4"/></svg>',Yy='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 36 h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M8 14 l2 1 M40 34 l2 2 M8 40 l3 -1" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>';function Ky(e,t){let n="decorate";const s=e.querySelector("#modePlay"),o=e.querySelector("#modeDecorate");s.querySelector(".modeIco").innerHTML=Gy,o.querySelector(".modeIco").innerHTML=Yy;const i=()=>{const c=n==="play";document.body.classList.toggle("mode-play",c),s.classList.toggle("on",c),o.classList.toggle("on",!c),s.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-pressed",c?"false":"true")},a=(c,d)=>{n=c,d&&Fy(c),i(),t.onChange?.()};e.addEventListener("pointerdown",c=>c.stopPropagation()),e.addEventListener("click",c=>{const d=c.target.closest("[data-mode]");if(!d)return;const f=d.dataset.mode==="play"?"play":"decorate";a(f,t.ownHouse())}),i();let r=!1;return{mode:()=>n,isPlay:()=>n==="play",sync(c){a(c?Zy():"play",!1)},hint:()=>{if(r||!document.body.classList.contains("phone"))return;const c=Tt("cozy-mode-hint");try{if(localStorage.getItem(c)){r=!0;return}}catch{r=!0;return}r=!0;const d=document.createElement("p");d.className="modeHint",d.textContent="Play: tap things! Decorate: move things!",e.appendChild(d);let f=!1;const p=()=>{if(!f){f=!0,d.remove(),window.removeEventListener("pointerdown",p);try{localStorage.setItem(c,"1")}catch{}}};window.setTimeout(p,2800),d.addEventListener("click",p),window.addEventListener("pointerdown",p)}}}const Sg=new Map;let Cg=!1;function Bo(){return Cg}function Xy(e){Cg=e}function Gs(e){return Sg.get(e)}function Jy(e,t){Sg.set(e,t)}const eb=!0;let ua=null;function tb(e){const t=new URLSearchParams(e.replace(/^\?/,"")).get("art");t==="v1"?ua=!1:t==="v2"?ua=!0:ua=null;const n=ua??eb;return Xy(n),n}const fr=Object.assign({"../../assets/art/any/armchair.webp":()=>h(()=>import("./armchair-BAjEKZT-.js"),[]).then(e=>e.default),"../../assets/art/any/ball.webp":()=>h(()=>import("./ball-D1B5vbct.js"),[]).then(e=>e.default),"../../assets/art/any/balloon.webp":()=>h(()=>import("./balloon-5CQ1ji1d.js"),[]).then(e=>e.default),"../../assets/art/any/bookshelf.webp":()=>h(()=>import("./bookshelf-BCCk-QJS.js"),[]).then(e=>e.default),"../../assets/art/any/chair.webp":()=>h(()=>import("./chair-BxTP5f1M.js"),[]).then(e=>e.default),"../../assets/art/any/clock.webp":()=>h(()=>import("./clock-D_q2KVbT.js"),[]).then(e=>e.default),"../../assets/art/any/lamp.webp":()=>h(()=>import("./lamp-BOWZQ_df.js"),[]).then(e=>e.default),"../../assets/art/any/picture.webp":()=>h(()=>import("./picture-DsR0Jovx.js"),[]).then(e=>e.default),"../../assets/art/any/plant.webp":()=>h(()=>import("./plant-xO8tOsUj.js"),[]).then(e=>e.default),"../../assets/art/any/rug.webp":()=>h(()=>Promise.resolve().then(()=>yS),void 0).then(e=>e.default),"../../assets/art/any/sofa.webp":()=>h(()=>import("./sofa-DqtVZLgl.js"),[]).then(e=>e.default),"../../assets/art/any/table.webp":()=>h(()=>import("./table-CaJl95Y4.js"),[]).then(e=>e.default),"../../assets/art/any/tv.webp":()=>h(()=>import("./tv-10oa_PoM.js"),[]).then(e=>e.default),"../../assets/art/any/window.webp":()=>h(()=>import("./window-jtnOMij-.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-mat.webp":()=>h(()=>import("./bath-mat-DLlrRePN.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-mirror.webp":()=>h(()=>import("./bath-mirror-4OfFj8EV.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-stool.webp":()=>h(()=>import("./bath-stool-DqJM8fLh.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-toilet.webp":()=>h(()=>import("./bath-toilet-C2nhunlA.js"),[]).then(e=>e.default),"../../assets/art/bathroom/laundry-hamper.webp":()=>h(()=>import("./laundry-hamper-0OQZcXyH.js"),[]).then(e=>e.default),"../../assets/art/bathroom/rubber-ducky.webp":()=>h(()=>import("./rubber-ducky-pwUm0Pe4.js"),[]).then(e=>e.default),"../../assets/art/bathroom/shower-curtain.webp":()=>h(()=>import("./shower-curtain-UCHNbYT7.js"),[]).then(e=>e.default),"../../assets/art/bathroom/sink-vanity.webp":()=>h(()=>import("./sink-vanity-aUbm9Mix.js"),[]).then(e=>e.default),"../../assets/art/bathroom/soaking-tub.webp":()=>h(()=>import("./soaking-tub-C07Kgt8P.js"),[]).then(e=>e.default),"../../assets/art/bathroom/soap-dish.webp":()=>h(()=>import("./soap-dish-Duoeh42V.js"),[]).then(e=>e.default),"../../assets/art/bathroom/towel-bar.webp":()=>h(()=>import("./towel-bar-fU4SDA3M.js"),[]).then(e=>e.default),"../../assets/art/bedroom/bed.webp":()=>h(()=>import("./bed-CKbzIr1E.js"),[]).then(e=>e.default),"../../assets/art/bedroom/mirror.webp":()=>h(()=>import("./mirror-D5FvkWJA.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~alarm-clock.webp":()=>h(()=>import("./pack~alarm-clock-B1MKtcYc.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bedtime-snack.webp":()=>h(()=>import("./pack~bedtime-snack-CQHBbXTE.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~big-monitor.webp":()=>h(()=>import("./pack~big-monitor-DnY9RO7w.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~big-wardrobe.webp":()=>h(()=>import("./pack~big-wardrobe-DKmYluKF.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~book-stack.webp":()=>h(()=>import("./pack~book-stack-DgPlZ9_3.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bubble-bath.webp":()=>h(()=>import("./pack~bubble-bath-CP64sVml.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bunk-bed.webp":()=>h(()=>import("./pack~bunk-bed-D-NM_ktx.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bunny-slippers.webp":()=>h(()=>import("./pack~bunny-slippers-I8r5WVZt.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~canopy-bed.webp":()=>h(()=>import("./pack~canopy-bed-BpoysMK9.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cat-bed.webp":()=>h(()=>import("./pack~cat-bed-BAS6-rN0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~caterpillar-plush.webp":()=>h(()=>import("./pack~caterpillar-plush-CEbFuatX.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-canopy-daybed.webp":()=>h(()=>import("./pack~cc-canopy-daybed-DoE44IXz.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-cloud-beanbag.webp":()=>h(()=>import("./pack~cc-cloud-beanbag-D0qNEg32.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-cloud-lamp.webp":()=>h(()=>import("./pack~cc-cloud-lamp-DIDpxlMU.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-fairy-garland.webp":()=>h(()=>import("./pack~cc-fairy-garland-CEQT4GTj.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-heart-bed.webp":()=>h(()=>import("./pack~cc-heart-bed-BupJOayJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-jewel-box.webp":()=>h(()=>import("./pack~cc-jewel-box-C-vIsXue.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-reading-nook.webp":()=>h(()=>import("./pack~cc-reading-nook-Ba_6wW4M.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-star-dresser.webp":()=>h(()=>import("./pack~cc-star-dresser-CY3IU_Po.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-window-seat.webp":()=>h(()=>import("./pack~cc-window-seat-CPrwdaeJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~checker-bed.webp":()=>h(()=>import("./pack~checker-bed-Dl1khZwL.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~clothes-rail.webp":()=>h(()=>import("./pack~clothes-rail-DpNxviPS.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cloud-rug.webp":()=>h(()=>import("./pack~cloud-rug-BVi9jYKG.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cloud-shelf.webp":()=>h(()=>import("./pack~cloud-shelf-slqFLmn1.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cork-board.webp":()=>h(()=>import("./pack~cork-board-DWOPEjn8.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~curvy-desk.webp":()=>h(()=>import("./pack~curvy-desk-BDa2yytO.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~daisy-pot.webp":()=>h(()=>import("./pack~daisy-pot-vdUJfXm_.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~desk-mic.webp":()=>h(()=>import("./pack~desk-mic-d9T8n8mE.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~desk.webp":()=>h(()=>import("./pack~desk-C-3AgNRZ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~dino-plush.webp":()=>h(()=>import("./pack~dino-plush-DdqMPHIF.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~doll-house.webp":()=>h(()=>import("./pack~doll-house-CH0M4iJ5.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~dresser.webp":()=>h(()=>import("./pack~dresser-Cws-4Als.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~egg-chair.webp":()=>h(()=>import("./pack~egg-chair-DYGRZPW0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~floor-fan.webp":()=>h(()=>import("./pack~floor-fan-NUw25upr.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~frog-plush.webp":()=>h(()=>import("./pack~frog-plush-Bq4x4dF_.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~game-controller.webp":()=>h(()=>import("./pack~game-controller-CwDKL6zs.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~gaming-chair.webp":()=>h(()=>import("./pack~gaming-chair-Ch-jvTrR.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~guinea-pig.webp":()=>h(()=>import("./pack~guinea-pig-BSQGDcoG.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~hamster-cage.webp":()=>h(()=>import("./pack~hamster-cage-1ZrJIYPk.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~hamster-pet.webp":()=>h(()=>import("./pack~hamster-pet-DO0Nc-ra.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~headphones.webp":()=>h(()=>import("./pack~headphones-BuEyFi9F.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~heart-rug.webp":()=>h(()=>import("./pack~heart-rug-CHsSWFVJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~keyboard.webp":()=>h(()=>import("./pack~keyboard-CpH04NZb.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~lava-lamp.webp":()=>h(()=>import("./pack~lava-lamp-C0yGLXxS.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~moon-night-light.webp":()=>h(()=>import("./pack~moon-night-light-jQgCx363.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~nightstand.webp":()=>h(()=>import("./pack~nightstand-CAZ1Ijk0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~paper-lantern.webp":()=>h(()=>import("./pack~paper-lantern-CBHdnzS2.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~pastel-wardrobe.webp":()=>h(()=>import("./pack~pastel-wardrobe-6p6FbGSg.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~phone-stand.webp":()=>h(()=>import("./pack~phone-stand-DA6FpZ6R.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~piggy-bank.webp":()=>h(()=>import("./pack~piggy-bank-CsgR-O1T.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~plant-stand.webp":()=>h(()=>import("./pack~plant-stand-m1tPlZfP.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~play-tent.webp":()=>h(()=>import("./pack~play-tent-C9Fxa0Rh.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~star-mobile.webp":()=>h(()=>import("./pack~star-mobile-CMLjVRhn.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-chest.webp":()=>h(()=>import("./pack~toy-chest-Bx3rslln.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-robot.webp":()=>h(()=>import("./pack~toy-robot-DuDxaaXx.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-train.webp":()=>h(()=>import("./pack~toy-train-OdPxfMvY.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~unicorn-plush.webp":()=>h(()=>import("./pack~unicorn-plush-1Ml4NpgU.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~vlog-camera.webp":()=>h(()=>import("./pack~vlog-camera-CU7magSa.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wardrobe.webp":()=>h(()=>import("./pack~wardrobe-CnpDMG_i.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wh-dresser.webp":()=>h(()=>import("./pack~wh-dresser-BJJ7U3Ti.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wh-nightstand.webp":()=>h(()=>import("./pack~wh-nightstand-TWRUmwYh.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wood-desk.webp":()=>h(()=>import("./pack~wood-desk-rwE12GqK.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wooden-bed.webp":()=>h(()=>import("./pack~wooden-bed-13S3AiLf.js"),[]).then(e=>e.default),"../../assets/art/bedroom/stars.webp":()=>h(()=>import("./stars-BPD2RlkZ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/story-pillow.webp":()=>h(()=>import("./story-pillow-3KtRY1EI.js"),[]).then(e=>e.default),"../../assets/art/bedroom/teddy.webp":()=>h(()=>import("./teddy-CS3IZCmA.js"),[]).then(e=>e.default),"../../assets/art/bedroom/tub.webp":()=>h(()=>import("./tub-D2ItmFKM.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-bakery-shelf.webp":()=>h(()=>import("./pack~cc-bakery-shelf-C9pglmOD.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-breakfast-table.webp":()=>h(()=>import("./pack~cc-breakfast-table-CqAzN2si.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-bubble-chair.webp":()=>h(()=>import("./pack~cc-bubble-chair-Db6ctGIk.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-cupcake-stand.webp":()=>h(()=>import("./pack~cc-cupcake-stand-ClVhXfMJ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-dryer-chair.webp":()=>h(()=>import("./pack~cc-dryer-chair-BhVjSN-o.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-flower-kettle.webp":()=>h(()=>import("./pack~cc-flower-kettle-T5UeKV0l.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-light-vanity.webp":()=>h(()=>import("./pack~cc-light-vanity-D_F5Ili-.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-macaron-jar.webp":()=>h(()=>import("./pack~cc-macaron-jar-C7OMMZGy.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-mani-chair.webp":()=>h(()=>import("./pack~cc-mani-chair-gE8U4fT9.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-mint-fridge.webp":()=>h(()=>import("./pack~cc-mint-fridge-qv93g_mZ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-pastel-range.webp":()=>h(()=>import("./pack~cc-pastel-range-DEzEnqL9.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-perfume-tray.webp":()=>h(()=>import("./pack~cc-perfume-tray-BOuRtQMQ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-ribbon-mirror.webp":()=>h(()=>import("./pack~cc-ribbon-mirror-DaVelywO.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-teapot-set.webp":()=>h(()=>import("./pack~cc-teapot-set-CYwQRzs2.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~arched-shelf.webp":()=>h(()=>import("./pack~arched-shelf-CKpdbpUV.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~blob-rug.webp":()=>h(()=>import("./pack~blob-rug-DV27jZ4K.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~bubbly-plant.webp":()=>h(()=>import("./pack~bubbly-plant-DaDhjp5G.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~bud-vase.webp":()=>h(()=>import("./pack~bud-vase-BjDwnbex.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~comb-brush.webp":()=>h(()=>import("./pack~comb-brush-2q32lqRM.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~cream-jars.webp":()=>h(()=>import("./pack~cream-jars-DuhIPlDY.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~drop-lamp.webp":()=>h(()=>import("./pack~drop-lamp-CpS9XCXn.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~droplet-buddy.webp":()=>h(()=>import("./pack~droplet-buddy-DgmZ-fU6.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~fancy-sofa.webp":()=>h(()=>import("./pack~fancy-sofa-Cuv4CZ93.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~flower-cart.webp":()=>h(()=>import("./pack~flower-cart-Cpa-qrtx.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~foot-spa.webp":()=>h(()=>import("./pack~foot-spa-CSEQ1rPl.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~globe-pendants.webp":()=>h(()=>import("./pack~globe-pendants-CeBlCiLv.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~glow-mirror.webp":()=>h(()=>import("./pack~glow-mirror-BK53Zp0A.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~gold-floor-mirror.webp":()=>h(()=>import("./pack~gold-floor-mirror-BIgxfU1m.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~hair-dryer.webp":()=>h(()=>import("./pack~hair-dryer-CDTC9I6n.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~heart-plant.webp":()=>h(()=>import("./pack~heart-plant-B-wW-dwX.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~heart-pouf.webp":()=>h(()=>import("./pack~heart-pouf-BbbND0iB.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~lilac-curtain.webp":()=>h(()=>import("./pack~lilac-curtain-CKYxudqA.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~lotion-trio.webp":()=>h(()=>import("./pack~lotion-trio-oJDS-nAk.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~mani-lamp.webp":()=>h(()=>import("./pack~mani-lamp-CIckVWe7.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~nail-table.webp":()=>h(()=>import("./pack~nail-table-DblO1JLs.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pebble-rug.webp":()=>h(()=>import("./pack~pebble-rug-bTJFA8Ur.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~perfume-bottle.webp":()=>h(()=>import("./pack~perfume-bottle-gM_mVBfU.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pink-fountain.webp":()=>h(()=>import("./pack~pink-fountain-Ciur2kZp.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pink-vanity.webp":()=>h(()=>import("./pack~pink-vanity-wGJdTvWK.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~polish-bottle.webp":()=>h(()=>import("./pack~polish-bottle-TyYjJ4KH.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~polish-rack.webp":()=>h(()=>import("./pack~polish-rack-BiHiHzDG.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~reception-desk.webp":()=>h(()=>import("./pack~reception-desk-Bhr61SSS.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~salon-chair.webp":()=>h(()=>import("./pack~salon-chair-B5ARb_Hu.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~scent-candle.webp":()=>h(()=>import("./pack~scent-candle-DhSW37c1.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~spray-bottle.webp":()=>h(()=>import("./pack~spray-bottle-co6Gr0Aw.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~star-wall-sign.webp":()=>h(()=>import("./pack~star-wall-sign-keSh_Cax.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~swivel-stool.webp":()=>h(()=>import("./pack~swivel-stool-gm_rxOWt.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~tiered-tray.webp":()=>h(()=>import("./pack~tiered-tray-CrVkNUF_.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~towel-cart.webp":()=>h(()=>import("./pack~towel-cart-TzS6naxj.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~towel-stack.webp":()=>h(()=>import("./pack~towel-stack-DVE-ZURg.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~vine-planter.webp":()=>h(()=>import("./pack~vine-planter-D6XFbFLe.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~waiting-bench.webp":()=>h(()=>import("./pack~waiting-bench-rf-Lxrnd.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~wash-chair.webp":()=>h(()=>import("./pack~wash-chair-By1PyrJZ.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-candy-bowl.webp":()=>h(()=>import("./pack~hw-candy-bowl-DYzwlwqt.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-cat-statue.webp":()=>h(()=>import("./pack~hw-cat-statue-FQxqUye_.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-cauldron.webp":()=>h(()=>import("./pack~hw-cauldron-CEa-TJHO.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-ghost-sheet.webp":()=>h(()=>import("./pack~hw-ghost-sheet-rc91-ve_.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-hay-bale.webp":()=>h(()=>import("./pack~hw-hay-bale-BbE90YS9.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-heart-pumpkin.webp":()=>h(()=>import("./pack~hw-heart-pumpkin-PfYNpXFo.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-leaf-garland.webp":()=>h(()=>import("./pack~hw-leaf-garland-DpM5QBlC.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-moon-cling.webp":()=>h(()=>import("./pack~hw-moon-cling-CH5pjYPJ.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-moon-lantern.webp":()=>h(()=>import("./pack~hw-moon-lantern-CmD5N0JV.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-star-pumpkin.webp":()=>h(()=>import("./pack~hw-star-pumpkin-WFRvw5za.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-witch-hat.webp":()=>h(()=>import("./pack~hw-witch-hat-q2MY5sg8.js"),[]).then(e=>e.default),"../../assets/art/kitchen/apple.webp":()=>h(()=>import("./apple-CgQUqZtF.js"),[]).then(e=>e.default),"../../assets/art/kitchen/berry-basket.webp":()=>h(()=>import("./berry-basket-D02mck40.js"),[]).then(e=>e.default),"../../assets/art/kitchen/cake.webp":()=>h(()=>import("./cake-D-PUSdV3.js"),[]).then(e=>e.default),"../../assets/art/kitchen/donut.webp":()=>h(()=>import("./donut-D-CyVfCH.js"),[]).then(e=>e.default),"../../assets/art/kitchen/fridge.webp":()=>h(()=>import("./fridge-CPUz39WO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/juice.webp":()=>h(()=>import("./juice-C7d-xViI.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bananas.webp":()=>h(()=>import("./pack~bananas-BaRiiq6m.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bar-stool.webp":()=>h(()=>import("./pack~bar-stool-DoItrBtD.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bread-loaf.webp":()=>h(()=>import("./pack~bread-loaf-DkvGPzQe.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~chick.webp":()=>h(()=>import("./pack~chick-BO9DXErH.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~china-hutch.webp":()=>h(()=>import("./pack~china-hutch-DPrwGSNq.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cocoa-mug.webp":()=>h(()=>import("./pack~cocoa-mug-hzMczJEM.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cookie-jar.webp":()=>h(()=>import("./pack~cookie-jar-DwGPCGTZ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cooking-pot.webp":()=>h(()=>import("./pack~cooking-pot-CfarfMvn.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cupcake.webp":()=>h(()=>import("./pack~cupcake-4s6JCz52.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~dish-rack.webp":()=>h(()=>import("./pack~dish-rack-Dffid-z2.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~fruit-bowl.webp":()=>h(()=>import("./pack~fruit-bowl-S7zdSZud.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~frying-pan.webp":()=>h(()=>import("./pack~frying-pan-BibqhFDJ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~happy-fridge.webp":()=>h(()=>import("./pack~happy-fridge-HnFXofL6.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~herb-box.webp":()=>h(()=>import("./pack~herb-box-DjQ-1q5D.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~high-chair.webp":()=>h(()=>import("./pack~high-chair-24NInnaO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~ice-cream.webp":()=>h(()=>import("./pack~ice-cream-rdopj06A.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kettle.webp":()=>h(()=>import("./pack~kettle-ByDzqkyg.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kitchen-counter.webp":()=>h(()=>import("./pack~kitchen-counter-B7uMIWhT.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kitchen-sink.webp":()=>h(()=>import("./pack~kitchen-sink-DyICEjEC.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~lemon-tree.webp":()=>h(()=>import("./pack~lemon-tree-B8bzBxaO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~microwave.webp":()=>h(()=>import("./pack~microwave-B6anYgBg.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~milk-bottle.webp":()=>h(()=>import("./pack~milk-bottle-CKMei0uX.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pancakes.webp":()=>h(()=>import("./pack~pancakes-BmuT40In.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pantry-shelf.webp":()=>h(()=>import("./pack~pantry-shelf-0EpJaISh.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pendant-lamp.webp":()=>h(()=>import("./pack~pendant-lamp-BRmz1TSb.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pet-bowl.webp":()=>h(()=>import("./pack~pet-bowl-bLDcshyX.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~rice-cooker.webp":()=>h(()=>import("./pack~rice-cooker-j9bjO2OS.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~runner-rug.webp":()=>h(()=>import("./pack~runner-rug-DgsAHdwM.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~spice-rack.webp":()=>h(()=>import("./pack~spice-rack-5CIyihfN.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~stand-mixer.webp":()=>h(()=>import("./pack~stand-mixer-DVs9icnQ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~teapot.webp":()=>h(()=>import("./pack~teapot-Clbuel00.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~toaster.webp":()=>h(()=>import("./pack~toaster-0CdrvAn6.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~utensil-rail.webp":()=>h(()=>import("./pack~utensil-rail-7lJosKxj.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~watermelon-slice.webp":()=>h(()=>import("./pack~watermelon-slice-DDNYgh1a.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pizza.webp":()=>h(()=>import("./pizza-CBn4rlbT.js"),[]).then(e=>e.default),"../../assets/art/kitchen/stove.webp":()=>h(()=>import("./stove-EEI-cSzf.js"),[]).then(e=>e.default),"../../assets/art/living/bunny.webp":()=>h(()=>import("./bunny-PYkx6Ie3.js"),[]).then(e=>e.default),"../../assets/art/living/cactus.webp":()=>h(()=>import("./cactus-CNbOypby.js"),[]).then(e=>e.default),"../../assets/art/living/cat-tower.webp":()=>h(()=>import("./cat-tower-BTX9_pA4.js"),[]).then(e=>e.default),"../../assets/art/living/cat.webp":()=>h(()=>import("./cat-CkF-5Moc.js"),[]).then(e=>e.default),"../../assets/art/living/dog.webp":()=>h(()=>import("./dog-XsW5t_fN.js"),[]).then(e=>e.default),"../../assets/art/living/egg~cada-mouse.webp":()=>h(()=>import("./egg~cada-mouse-CahQlh-m.js"),[]).then(e=>e.default),"../../assets/art/living/egg~chloe-starlamp.webp":()=>h(()=>import("./egg~chloe-starlamp-pq_Iclzu.js"),[]).then(e=>e.default),"../../assets/art/living/egg~quinn-pup.webp":()=>h(()=>import("./egg~quinn-pup-BqdUFpbv.js"),[]).then(e=>e.default),"../../assets/art/living/egg~reagan-frame.webp":()=>h(()=>import("./egg~reagan-frame-BWp9N6ej.js"),[]).then(e=>e.default),"../../assets/art/living/egg~sloane-snail.webp":()=>h(()=>import("./egg~sloane-snail-DsDMZRR7.js"),[]).then(e=>e.default),"../../assets/art/living/fish.webp":()=>h(()=>import("./fish-Cs1FEzIZ.js"),[]).then(e=>e.default),"../../assets/art/living/floor-cushion.webp":()=>h(()=>import("./floor-cushion-D7ewX4dX.js"),[]).then(e=>e.default),"../../assets/art/living/flowers.webp":()=>h(()=>import("./flowers-CHLFwDXa.js"),[]).then(e=>e.default),"../../assets/art/living/kennel.webp":()=>h(()=>import("./kennel-iNvQ28eh.js"),[]).then(e=>e.default),"../../assets/art/living/pack~acorn-friend.webp":()=>h(()=>import("./pack~acorn-friend-Bm4Hk12h.js"),[]).then(e=>e.default),"../../assets/art/living/pack~aquarium.webp":()=>h(()=>import("./pack~aquarium-D0sUglTr.js"),[]).then(e=>e.default),"../../assets/art/living/pack~arc-floor-lamp.webp":()=>h(()=>import("./pack~arc-floor-lamp-7GCaGkDs.js"),[]).then(e=>e.default),"../../assets/art/living/pack~bean-bag.webp":()=>h(()=>Promise.resolve().then(()=>bS),void 0).then(e=>e.default),"../../assets/art/living/pack~bird-cage.webp":()=>h(()=>import("./pack~bird-cage-CLlPQlCF.js"),[]).then(e=>e.default),"../../assets/art/living/pack~blanket-basket.webp":()=>h(()=>import("./pack~blanket-basket-Clw-jcOi.js"),[]).then(e=>e.default),"../../assets/art/living/pack~box-stack.webp":()=>h(()=>import("./pack~box-stack-DV3Ljobv.js"),[]).then(e=>e.default),"../../assets/art/living/pack~brick-fireplace.webp":()=>h(()=>import("./pack~brick-fireplace-CU641OC1.js"),[]).then(e=>e.default),"../../assets/art/living/pack~building-blocks.webp":()=>h(()=>import("./pack~building-blocks-C0yT9TvM.js"),[]).then(e=>e.default),"../../assets/art/living/pack~bulletin-board.webp":()=>h(()=>import("./pack~bulletin-board-BCXiWqVp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cactus-buddy.webp":()=>h(()=>import("./pack~cactus-buddy-2_JfEHKl.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-cottage-aquarium.webp":()=>h(()=>import("./pack~cc-cottage-aquarium-C8NYhmrd.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-fairy-shelf.webp":()=>h(()=>import("./pack~cc-fairy-shelf-CnHOFSRs.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-flower-lamp.webp":()=>h(()=>import("./pack~cc-flower-lamp-wbPhnbQ_.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-clock.webp":()=>h(()=>import("./pack~cc-heart-clock-jr4MzVW9.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-pouf.webp":()=>h(()=>import("./pack~cc-heart-pouf-BPM9YsrB.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-rug.webp":()=>h(()=>import("./pack~cc-heart-rug-BVKJ0cQB.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-macrame-swing.webp":()=>h(()=>import("./pack~cc-macrame-swing-pWIX7Xk-.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-mushroom-stool.webp":()=>h(()=>import("./pack~cc-mushroom-stool-CMlvAjd6.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-petal-table.webp":()=>h(()=>import("./pack~cc-petal-table-7S1s7yzK.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-plant-wall.webp":()=>h(()=>import("./pack~cc-plant-wall-p6D9EEBb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-record-player.webp":()=>h(()=>import("./pack~cc-record-player-BRAifeEK.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-scallop-curtains.webp":()=>h(()=>import("./pack~cc-scallop-curtains-BeV7rdPo.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-scallop-loveseat.webp":()=>h(()=>import("./pack~cc-scallop-loveseat-_AoDnFXb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~checker-rug.webp":()=>h(()=>import("./pack~checker-rug-Cp2IkzoS.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cloud-sofa.webp":()=>h(()=>import("./pack~cloud-sofa-DyBmuzAg.js"),[]).then(e=>e.default),"../../assets/art/living/pack~coffee-table.webp":()=>h(()=>import("./pack~coffee-table-DPuXhspW.js"),[]).then(e=>e.default),"../../assets/art/living/pack~comfy-armchair.webp":()=>h(()=>import("./pack~comfy-armchair-CJDG30Cj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cream-sofa.webp":()=>h(()=>import("./pack~cream-sofa-Ez2miUnO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cubby-shelf.webp":()=>h(()=>import("./pack~cubby-shelf-BUMGU8Jh.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cube-shelf.webp":()=>h(()=>import("./pack~cube-shelf-D5D2Dw5S.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cute-speaker.webp":()=>h(()=>import("./pack~cute-speaker-jTqsaV2I.js"),[]).then(e=>e.default),"../../assets/art/living/pack~daisy-rug.webp":()=>h(()=>import("./pack~daisy-rug-BCUkj5ia.js"),[]).then(e=>e.default),"../../assets/art/living/pack~desk-lamp.webp":()=>h(()=>import("./pack~desk-lamp-DmCKofr2.js"),[]).then(e=>e.default),"../../assets/art/living/pack~fiddle-leaf-fig.webp":()=>h(()=>import("./pack~fiddle-leaf-fig-D7FML9mx.js"),[]).then(e=>e.default),"../../assets/art/living/pack~fireplace.webp":()=>h(()=>import("./pack~fireplace-DYp6BN4M.js"),[]).then(e=>e.default),"../../assets/art/living/pack~flower-lamp.webp":()=>h(()=>import("./pack~flower-lamp-kPf9KBh-.js"),[]).then(e=>e.default),"../../assets/art/living/pack~glass-cabinet.webp":()=>h(()=>import("./pack~glass-cabinet-B9JOaE-O.js"),[]).then(e=>e.default),"../../assets/art/living/pack~globe.webp":()=>h(()=>import("./pack~globe-Df4aJX14.js"),[]).then(e=>e.default),"../../assets/art/living/pack~hanging-lantern.webp":()=>h(()=>import("./pack~hanging-lantern-CSb5_y-t.js"),[]).then(e=>e.default),"../../assets/art/living/pack~hanging-planter.webp":()=>h(()=>import("./pack~hanging-planter-BXNCa3po.js"),[]).then(e=>e.default),"../../assets/art/living/pack~heart-light.webp":()=>h(()=>import("./pack~heart-light-BMZQFtcT.js"),[]).then(e=>e.default),"../../assets/art/living/pack~knit-cushion.webp":()=>h(()=>import("./pack~knit-cushion-DzpDb6hm.js"),[]).then(e=>e.default),"../../assets/art/living/pack~ladder-shelf.webp":()=>h(()=>import("./pack~ladder-shelf-CLOcbyxp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~landscape-art.webp":()=>h(()=>import("./pack~landscape-art-DiJEigPf.js"),[]).then(e=>e.default),"../../assets/art/living/pack~lattice-bench.webp":()=>h(()=>import("./pack~lattice-bench-0G6hKZYj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~leaf-wreath.webp":()=>h(()=>import("./pack~leaf-wreath-WJ1hv4SR.js"),[]).then(e=>e.default),"../../assets/art/living/pack~monstera-plant.webp":()=>h(()=>import("./pack~monstera-plant-BE84EAw8.js"),[]).then(e=>e.default),"../../assets/art/living/pack~moving-box.webp":()=>h(()=>import("./pack~moving-box-CAe2Xeia.js"),[]).then(e=>e.default),"../../assets/art/living/pack~piano.webp":()=>h(()=>import("./pack~piano-C2g19n4Y.js"),[]).then(e=>e.default),"../../assets/art/living/pack~popcorn.webp":()=>h(()=>import("./pack~popcorn-B6n0yaX2.js"),[]).then(e=>e.default),"../../assets/art/living/pack~pothos-plant.webp":()=>h(()=>import("./pack~pothos-plant-CTHDCuIc.js"),[]).then(e=>e.default),"../../assets/art/living/pack~pouf.webp":()=>h(()=>import("./pack~pouf-BJ-teA6I.js"),[]).then(e=>e.default),"../../assets/art/living/pack~puffy-stool.webp":()=>h(()=>import("./pack~puffy-stool-D38tkWnm.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rainbow-rug.webp":()=>h(()=>import("./pack~rainbow-rug-DUV6gUsN.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rainbow-wall-art.webp":()=>h(()=>import("./pack~rainbow-wall-art--boV5icC.js"),[]).then(e=>e.default),"../../assets/art/living/pack~retro-radio.webp":()=>h(()=>import("./pack~retro-radio-CDLK9pHp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~ring-light.webp":()=>h(()=>import("./pack~ring-light-C3E9VDAl.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rocking-chair.webp":()=>h(()=>import("./pack~rocking-chair-B2p2ReQc.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rocking-horse.webp":()=>h(()=>import("./pack~rocking-horse-CswTc134.js"),[]).then(e=>e.default),"../../assets/art/living/pack~round-rug.webp":()=>h(()=>import("./pack~round-rug-CHSVB2Aw.js"),[]).then(e=>e.default),"../../assets/art/living/pack~side-table-round.webp":()=>h(()=>import("./pack~side-table-round-CP96FSiO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~snake-plant.webp":()=>h(()=>import("./pack~snake-plant-DawlmINM.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sprout-pot.webp":()=>h(()=>import("./pack~sprout-pot-Dx8LI8dH.js"),[]).then(e=>e.default),"../../assets/art/living/pack~star-lamp.webp":()=>h(()=>import("./pack~star-lamp-s9PtqFmZ.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sticker-board.webp":()=>h(()=>import("./pack~sticker-board--TDZ7ozq.js"),[]).then(e=>e.default),"../../assets/art/living/pack~string-lights.webp":()=>h(()=>import("./pack~string-lights-HZXr5sUd.js"),[]).then(e=>e.default),"../../assets/art/living/pack~stripe-runner.webp":()=>h(()=>import("./pack~stripe-runner-B0fRj7Re.js"),[]).then(e=>e.default),"../../assets/art/living/pack~succulent-trio.webp":()=>h(()=>import("./pack~succulent-trio-M7abHPiA.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sunny-art.webp":()=>h(()=>import("./pack~sunny-art-D2_v9d4h.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sv-bean-bag.webp":()=>h(()=>Promise.resolve().then(()=>kS),void 0).then(e=>e.default),"../../assets/art/living/pack~sv-cloud-rug.webp":()=>h(()=>import("./pack~sv-cloud-rug-DBeaYhY1.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sv-wall-shelf.webp":()=>h(()=>import("./pack~sv-wall-shelf-CE0YAWvX.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tassel-rug.webp":()=>h(()=>import("./pack~tassel-rug-C3GgXPyZ.js"),[]).then(e=>e.default),"../../assets/art/living/pack~throw-pillow.webp":()=>h(()=>import("./pack~throw-pillow-BUguyBcj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~toy-car.webp":()=>h(()=>import("./pack~toy-car-DZ6BYQDO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~trailing-plant.webp":()=>h(()=>import("./pack~trailing-plant-BJ2rTgvE.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tulip-vase.webp":()=>h(()=>import("./pack~tulip-vase-CmyisqxG.js"),[]).then(e=>e.default),"../../assets/art/living/pack~turtle.webp":()=>h(()=>import("./pack~turtle-FaBzuoqb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tv-stand.webp":()=>h(()=>import("./pack~tv-stand-C8gC4UFW.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wall-clock.webp":()=>h(()=>import("./pack~wall-clock-D7PdTom6.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wall-shelf.webp":()=>h(()=>import("./pack~wall-shelf-C1lRJ7GC.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wavy-floor-lamp.webp":()=>h(()=>import("./pack~wavy-floor-lamp-BL00MuGA.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-arc-floor-lamp.webp":()=>h(()=>import("./pack~wh-arc-floor-lamp-B6QVftZN.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-book-stack.webp":()=>h(()=>import("./pack~wh-book-stack-Dwcz23qo.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-fiddle-leaf-fig.webp":()=>h(()=>import("./pack~wh-fiddle-leaf-fig-COFk3BJw.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-pendant-lamp.webp":()=>h(()=>import("./pack~wh-pendant-lamp-Dd4mFEDS.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-snake-plant.webp":()=>h(()=>import("./pack~wh-snake-plant-D-C6ZJKO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-string-lights.webp":()=>h(()=>import("./pack~wh-string-lights-D0MBhT1M.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-armchair.webp":()=>h(()=>import("./pack~wood-armchair-DHvcj8Mx.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-bookshelf.webp":()=>h(()=>import("./pack~wood-bookshelf-sxaV4CyF.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-coffee-table.webp":()=>h(()=>import("./pack~wood-coffee-table-CrSb-1Xv.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-stool.webp":()=>h(()=>import("./pack~wood-stool-JjUX_8W2.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-bouquet.webp":()=>h(()=>import("./ranch-bouquet-LHbKbTej.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-carrot.webp":()=>h(()=>import("./ranch-carrot-cyry77wX.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-egg.webp":()=>h(()=>import("./ranch-egg-CYsNXUKY.js"),[]).then(e=>e.default),"../../assets/art/living/tree.webp":()=>h(()=>import("./tree-CXYySnAy.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby-bottle.webp":()=>h(()=>import("./baby-bottle-40H4PprS.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby-shelf.webp":()=>h(()=>import("./baby-shelf--dhe-OtF.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby.webp":()=>h(()=>import("./baby-Cjy_lAi1.js"),[]).then(e=>e.default),"../../assets/art/nursery/bassinet.webp":()=>h(()=>import("./bassinet-D1E3rjcm.js"),[]).then(e=>e.default),"../../assets/art/nursery/blocks.webp":()=>h(()=>import("./blocks-CtsB78Ug.js"),[]).then(e=>e.default),"../../assets/art/nursery/bunny-plush.webp":()=>h(()=>import("./bunny-plush-9_hTWSJ0.js"),[]).then(e=>e.default),"../../assets/art/nursery/changing-table.webp":()=>h(()=>import("./changing-table-DKyI_wrV.js"),[]).then(e=>e.default),"../../assets/art/nursery/cloud-rug.webp":()=>h(()=>import("./cloud-rug-BvUUbOnx.js"),[]).then(e=>e.default),"../../assets/art/nursery/crib-mobile.webp":()=>h(()=>import("./crib-mobile-BvlX6u0a.js"),[]).then(e=>e.default),"../../assets/art/nursery/crib.webp":()=>h(()=>import("./crib-Do3izZrw.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-cocoa.webp":()=>h(()=>import("./doll-cocoa-ypqLIm4M.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-honey.webp":()=>h(()=>import("./doll-honey-Dc51Fmwm.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-rose.webp":()=>h(()=>import("./doll-rose-DTSDlFkK.js"),[]).then(e=>e.default),"../../assets/art/nursery/moon-art.webp":()=>h(()=>import("./moon-art-DQbuFa-d.js"),[]).then(e=>e.default),"../../assets/art/nursery/music-box.webp":()=>h(()=>import("./music-box-DKDLmINu.js"),[]).then(e=>e.default),"../../assets/art/nursery/night-light.webp":()=>h(()=>import("./night-light-lryf6NaK.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-curtains.webp":()=>h(()=>import("./nursery-curtains-Ds4ZTC1C.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-dresser.webp":()=>h(()=>import("./nursery-dresser-DbmVYgde.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-lamp.webp":()=>h(()=>import("./nursery-lamp-pqbkf92r.js"),[]).then(e=>e.default),"../../assets/art/nursery/play-mat.webp":()=>h(()=>import("./play-mat-fGBMoW0r.js"),[]).then(e=>e.default),"../../assets/art/nursery/rattle.webp":()=>h(()=>import("./rattle-EzXp43O4.js"),[]).then(e=>e.default),"../../assets/art/nursery/rocker.webp":()=>h(()=>import("./rocker-BieX4wIy.js"),[]).then(e=>e.default),"../../assets/art/nursery/rocking-horse.webp":()=>h(()=>import("./rocking-horse-BK9_A5ep.js"),[]).then(e=>e.default),"../../assets/art/nursery/stacking-rings.webp":()=>h(()=>import("./stacking-rings-8Z2fYLIi.js"),[]).then(e=>e.default),"../../assets/art/nursery/toy-bin.webp":()=>h(()=>import("./toy-bin-CuORRSkX.js"),[]).then(e=>e.default),"../../assets/art/salon/hairdryer.webp":()=>h(()=>import("./hairdryer-BK3-NMh8.js"),[]).then(e=>e.default),"../../assets/art/salon/perfume.webp":()=>h(()=>import("./perfume-CCbV6-cE.js"),[]).then(e=>e.default),"../../assets/art/salon/polish.webp":()=>h(()=>import("./polish-Ch0EUf5y.js"),[]).then(e=>e.default),"../../assets/art/salon/ribbon-tray.webp":()=>h(()=>import("./ribbon-tray-DBUlSLAS.js"),[]).then(e=>e.default),"../../assets/art/salon/stool.webp":()=>h(()=>import("./stool-SBbn3Fq_.js"),[]).then(e=>e.default),"../../assets/art/salon/vanity.webp":()=>h(()=>import("./vanity-COm_EF9W.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~arched-mirror.webp":()=>h(()=>import("./pack~arched-mirror-FzcrWxa4.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~boba-cup.webp":()=>h(()=>import("./pack~boba-cup-DO0lCjCc.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~mini-fridge.webp":()=>h(()=>import("./pack~mini-fridge-DxF_-Si1.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~apple-tree.webp":()=>h(()=>import("./pack~apple-tree-BO7hFW66.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~cozy-mug.webp":()=>h(()=>import("./pack~cozy-mug-CL5TNVre.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~fire-pit.webp":()=>h(()=>import("./pack~fire-pit-CbfQWRzg.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~mini-greenhouse.webp":()=>h(()=>import("./pack~mini-greenhouse-Cgb6BHcc.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~picnic-basket.webp":()=>h(()=>import("./pack~picnic-basket-BZmSi61Z.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~sale-sign.webp":()=>h(()=>import("./pack~sale-sign-CNZEWdis.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~wh-kitchen-counter.webp":()=>h(()=>import("./pack~wh-kitchen-counter-BK3WsTw8.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~wh-teapot.webp":()=>h(()=>import("./pack~wh-teapot-C2xpf3Kz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-bauble-garland.webp":()=>h(()=>import("./pack~wc-bauble-garland-Bsv6snBW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-berry-wreath.webp":()=>h(()=>import("./pack~wc-berry-wreath-DwqWJGm0.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-birch-basket.webp":()=>h(()=>import("./pack~wc-birch-basket-Ck1MjTPW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cabin-picture.webp":()=>h(()=>import("./pack~wc-cabin-picture-Bo_qKFlZ.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-candle-trio.webp":()=>h(()=>import("./pack~wc-candle-trio-33RcvYK5.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cane-lamp.webp":()=>h(()=>import("./pack~wc-cane-lamp-BD2V2gLm.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cinnamon-tray.webp":()=>h(()=>import("./pack~wc-cinnamon-tray-Cy2cPyEY.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-cart.webp":()=>h(()=>import("./pack~wc-cocoa-cart-BwlPCBQR.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-mug.webp":()=>h(()=>import("./pack~wc-cocoa-mug-Cpad5gyz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-pot.webp":()=>h(()=>import("./pack~wc-cocoa-pot-CqjSzuIA.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cookie-oven.webp":()=>h(()=>import("./pack~wc-cookie-oven-AeTBKAqH.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cookie-plate.webp":()=>h(()=>import("./pack~wc-cookie-plate-Db4_27lp.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-frost-bookcase.webp":()=>h(()=>import("./pack~wc-frost-bookcase-ChH_Zc5-.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-frosted-pine.webp":()=>h(()=>import("./pack~wc-frosted-pine-BaL421Eq.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-fur-bench.webp":()=>h(()=>import("./pack~wc-fur-bench-BHy7RvLc.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-gingerbread-village.webp":()=>h(()=>import("./pack~wc-gingerbread-village-CXGNXY4G.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-gingerbread.webp":()=>h(()=>import("./pack~wc-gingerbread-BH26TMqz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-globe-lamp.webp":()=>h(()=>import("./pack~wc-globe-lamp-FQWUqV9q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-holiday-tree.webp":()=>h(()=>import("./pack~wc-holiday-tree-Dc9RLa8q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-holly.webp":()=>h(()=>import("./pack~wc-holly-Ddsa-Msy.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-ice-skates.webp":()=>h(()=>import("./pack~wc-ice-skates-CerfMu-3.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-ice-wardrobe.webp":()=>h(()=>import("./pack~wc-ice-wardrobe-Dk8v_MKI.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-knit-armchair.webp":()=>h(()=>import("./pack~wc-knit-armchair-p4nAzHXW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-lantern.webp":()=>h(()=>import("./pack~wc-lantern-rRWK8g8l.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-log-bench.webp":()=>h(()=>import("./pack~wc-log-bench-Djm76jnh.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-marshmallow-jar.webp":()=>h(()=>import("./pack~wc-marshmallow-jar-BiG_u42k.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mitten-line.webp":()=>h(()=>import("./pack~wc-mitten-line-BbhTynIV.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mitten-ottoman.webp":()=>h(()=>import("./pack~wc-mitten-ottoman-q05Rsc6B.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mug-shelf.webp":()=>h(()=>import("./pack~wc-mug-shelf-CeUbCPsi.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-nutcracker.webp":()=>h(()=>import("./pack~wc-nutcracker-DlEeuUgj.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-penguin-chair.webp":()=>h(()=>import("./pack~wc-penguin-chair-ARRfWJYR.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-penguin-plush.webp":()=>h(()=>import("./pack~wc-penguin-plush-w9LiHlOM.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-peppermint-counter.webp":()=>h(()=>import("./pack~wc-peppermint-counter-Cq5SRRi_.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-peppermint-rug.webp":()=>h(()=>import("./pack~wc-peppermint-rug-DjPM1BL2.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pinecone-garland.webp":()=>h(()=>import("./pack~wc-pinecone-garland-DV4Ijs5E.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pinecone-table.webp":()=>h(()=>import("./pack~wc-pinecone-table-CzULQj_N.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-plaid-bed.webp":()=>h(()=>import("./pack~wc-plaid-bed-ZVDIbe1Y.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-plaid-sofa.webp":()=>h(()=>import("./pack~wc-plaid-sofa-BaoM0h7H.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-poinsettia.webp":()=>h(()=>import("./pack~wc-poinsettia-DNdNw7QZ.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-polar-plush.webp":()=>h(()=>import("./pack~wc-polar-plush-Cz2NxU-X.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pom-rug.webp":()=>h(()=>import("./pack~wc-pom-rug-Zyeq7bwG.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-present-stack.webp":()=>h(()=>import("./pack~wc-present-stack-B09Rx_MO.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-reindeer.webp":()=>h(()=>import("./pack~wc-reindeer-DTWaMJXV.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sled-table.webp":()=>h(()=>import("./pack~wc-sled-table-BNH48Wur.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sleigh-planter.webp":()=>h(()=>import("./pack~wc-sleigh-planter-B3DNwK0i.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-globe.webp":()=>h(()=>import("./pack~wc-snow-globe-C9bft1_W.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-mobile.webp":()=>h(()=>import("./pack~wc-snow-mobile-JM0Q-i3v.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-nightstand.webp":()=>h(()=>import("./pack~wc-snow-nightstand-Bqay9NoW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-window.webp":()=>h(()=>import("./pack~wc-snow-window-DCwNoisx.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snowman.webp":()=>h(()=>import("./pack~wc-snowman-Z8FnDuXK.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snowshoes.webp":()=>h(()=>import("./pack~wc-snowshoes-Bux5zjz7.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sock-hamper.webp":()=>h(()=>import("./pack~wc-sock-hamper-IDMi8Oc3.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-star-topper.webp":()=>h(()=>import("./pack~wc-star-topper-CxhOrJOb.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-stocking-row.webp":()=>h(()=>import("./pack~wc-stocking-row-DRCxX9NW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-stone-hearth.webp":()=>h(()=>import("./pack~wc-stone-hearth-BIaBCxMx.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-twinkle-lamp.webp":()=>h(()=>import("./pack~wc-twinkle-lamp-3aXfb0Du.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-twinkle-string.webp":()=>h(()=>import("./pack~wc-twinkle-string-D1fw8i7q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-window-seat.webp":()=>h(()=>import("./pack~wc-window-seat-bNQT817S.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-woodstove.webp":()=>h(()=>import("./pack~wc-woodstove-BcUTK7y-.js"),[]).then(e=>e.default)});function Od(e){const t=e.split("/").pop()||"";if(t.length<6||t.slice(-5).toLowerCase()!==".webp")return null;const n=decodeURIComponent(t.slice(0,-5)).replace(/~/g,":");return!n||n.startsWith("_")?null:n}const Pg=new Set;for(const e in fr){const t=Od(e);t&&Pg.add(t)}function nb(e){return Pg.has(e)}const Al=new Map;function sb(e){for(const t in fr)if(Od(t)===e)return fr[t]}function ob(e){const t=Al.get(e);if(t)return t;const n=sb(e);if(!n)return Promise.resolve(null);const s=n().then(o=>(Jy(e,o),e)).catch(()=>(Al.delete(e),null));return Al.set(e,s),s}function sl(e){const t=[...new Set(e)];return Promise.all(t.map(ob)).then(n=>n.filter(s=>s!==null))}function ib(){const e=[];for(const t in fr){const n=Od(t);n&&e.push(n)}return sl(e)}function ab(e,t=[]){return tb(e)?sl(t):Promise.resolve([])}const Hd=Object.freeze(Object.defineProperty({__proto__:null,boot:ab,hasArt:nb,loadAllArt:ib,loadArtKinds:sl},Symbol.toStringTag,{value:"Module"})),Le="#5a3d5c",Ze=`stroke="${Le}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,ma=[{body:"#ffd6e0",roof:"#ff7aa8",door:"#8fd3ff",trim:"#fff6e6"},{body:"#d9f2ff",roof:"#5aa9e6",door:"#ffd166",trim:"#ffffff"},{body:"#e3f9d9",roof:"#5cc985",door:"#ff9f68",trim:"#fffbe6"},{body:"#fff1b8",roof:"#ff9f43",door:"#c9a0dc",trim:"#ffffff"},{body:"#eadcff",roof:"#9b7bd8",door:"#80ed99",trim:"#fff6fb"},{body:"#ffe0c7",roof:"#e07a5f",door:"#5fb0d8",trim:"#fffaf0"},{body:"#d8f5ef",roof:"#2fb3a3",door:"#ff8fab",trim:"#ffffff"},{body:"#fde2f3",roof:"#e879c6",door:"#ffd166",trim:"#fff"}];function pr(e,t={}){const n=ma[(e%ma.length+ma.length)%ma.length],s=e%2===1,o=t.lit?"#fff3b0":"#cfe8ff",i=s?`<path d="M22 138 Q22 36 160 30 Q298 36 298 138 Z" fill="${n.roof}" ${Ze}/><path d="M60 110 Q70 60 120 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`:`<path d="M14 140 L160 26 L306 140 Z" fill="${n.roof}" ${Ze}/><path d="M70 110 L140 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`;return`<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="294" rx="150" ry="8" fill="#000" opacity=".12"/>
  <rect x="${s?232:220}" y="${s?36:44}" width="30" height="56" rx="6" fill="${n.trim}" ${Ze}/>
  <rect x="44" y="124" width="232" height="168" rx="20" fill="${n.body}" ${Ze}/>
  ${i}
  <g class="houseWin" fill="${o}"><circle cx="160" cy="${s?92:98}" r="18" ${Ze}/><rect x="62" y="160" width="62" height="58" rx="18" ${Ze}/><rect x="196" y="160" width="62" height="58" rx="18" ${Ze}/></g>
  <path d="M160 ${s?74:80} V${s?110:116} M142 ${s?92:98} H178" ${Ze}/>
  <path d="M93 160 V218 M62 189 H124" ${Ze}/><path d="M227 160 V218 M196 189 H258" ${Ze}/>
  <rect x="56" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${Ze}/><rect x="190" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${Ze}/>
  <circle cx="72" cy="212" r="7" fill="#ff8fab" ${Ze}/><circle cx="92" cy="208" r="7" fill="#ffd166" ${Ze}/><circle cx="112" cy="212" r="7" fill="#ff8fab" ${Ze}/>
  <circle cx="208" cy="212" r="7" fill="#c9a0dc" ${Ze}/><circle cx="228" cy="208" r="7" fill="#80ed99" ${Ze}/><circle cx="248" cy="212" r="7" fill="#c9a0dc" ${Ze}/>
  <path d="M132 292 V226 Q132 196 160 196 Q188 196 188 226 V292 Z" fill="${n.door}" ${Ze}/>
  <circle cx="176" cy="250" r="5" fill="${Le}"/><path d="M146 222 Q160 212 174 222" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>
  <rect x="118" y="286" width="84" height="10" rx="5" fill="${n.trim}" ${Ze}/>
</svg>`}const It={street:`<svg viewBox="0 0 48 48"><circle cx="16" cy="15" r="7" fill="#ffd166" stroke="${Le}" stroke-width="3"/><circle cx="32" cy="15" r="7" fill="#ff8fab" stroke="${Le}" stroke-width="3"/><circle cx="13.5" cy="14.5" r="1.2" fill="${Le}"/><circle cx="18.5" cy="14.5" r="1.2" fill="${Le}"/><circle cx="29.5" cy="14.5" r="1.2" fill="${Le}"/><circle cx="34.5" cy="14.5" r="1.2" fill="${Le}"/><path d="M13 18 q3 2.2 6 0 M29 18 q3 2.2 6 0" fill="none" stroke="${Le}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 40 Q16 28 24 33 Q32 38 40 28" fill="none" stroke="#5cc985" stroke-width="4" stroke-linecap="round"/><circle cx="16" cy="36" r="2.2" fill="#fff" stroke="${Le}" stroke-width="1.5"/><circle cx="32" cy="32" r="2.2" fill="#fff" stroke="${Le}" stroke-width="1.5"/></svg>`,home:`<svg viewBox="0 0 48 48"><path d="M8 22 L24 8 L40 22 V40 H8 Z" fill="#ffd166" stroke="${Le}" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 V28 H28 V40" fill="#fff" stroke="${Le}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="20" r="2.4" fill="${Le}"/></svg>`,lockOn:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q33 7 33 16 V22" fill="none" stroke="${Le}" stroke-width="4"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#ffd166" stroke="${Le}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${Le}"/></svg>`,lockOff:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q31 7 32.5 13" fill="none" stroke="${Le}" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#b6f0a8" stroke="${Le}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${Le}"/></svg>`,chat:`<svg viewBox="0 0 48 48"><path d="M8 12 Q8 6 14 6 H34 Q40 6 40 12 V26 Q40 32 34 32 H22 L13 40 V32 Q8 32 8 26 Z" fill="#fff3b0" stroke="${Le}" stroke-width="3" stroke-linejoin="round"/><circle cx="17" cy="19" r="2.5" fill="${Le}"/><circle cx="24" cy="19" r="2.5" fill="${Le}"/><circle cx="31" cy="19" r="2.5" fill="${Le}"/></svg>`,shield:`<svg viewBox="0 0 48 48"><path d="M24 5 L39 11 V23 Q39 36 24 43 Q9 36 9 23 V11 Z" fill="#c9a0dc" stroke="${Le}" stroke-width="3" stroke-linejoin="round"/><path d="M17 24 L22 29 L31 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,solo:`<svg viewBox="0 0 48 48"><path d="M8 24 L24 9 L40 24 V41 H8 Z" fill="#ffd166" stroke="${Le}" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="28" width="10" height="13" rx="4" fill="#fff" stroke="${Le}" stroke-width="2.5"/><path d="M33 7 l2 4 4 .5 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.5z" fill="#ff8fab" stroke="${Le}" stroke-width="1.5"/></svg>`};function N(e,t=2600){const n=document.createElement("div");n.className="toast",n.textContent=e,(document.getElementById("toastLane")??document.body).appendChild(n),setTimeout(()=>n.classList.add("out"),t),setTimeout(()=>n.remove(),t+400)}function Tg(){return new Promise(e=>{let t=0,n=0,s="",o=0;const i=document.createElement("div");i.className="sheet adult",i.innerHTML='<div class="card adultCard"></div>',document.body.appendChild(i);const a=i.firstElementChild,r=()=>{t=6+Math.floor(Math.random()*4),n=3+Math.floor(Math.random()*7),s="",l()},l=()=>{a.innerHTML=`<button class="close" data-k="x">✕</button><h2>Grown-ups only</h2><p class="q" data-q="${t*n}">What is ${t} × ${n}?</p>
        <div class="ans">${s||"&nbsp;"}</div>
        <div class="pad">${[1,2,3,4,5,6,7,8,9,"⌫",0,"OK"].map(d=>`<button data-k="${d}">${d}</button>`).join("")}</div>`},c=d=>{i.remove(),e(d)};a.addEventListener("click",d=>{const f=d.target.closest("[data-k]")?.dataset.k;if(f){if(f==="x")return c(!1);if(f==="⌫")s=s.slice(0,-1);else if(f==="OK"){if(+s===t*n)return c(!0);if(++o>=3)return c(!1);a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400),r();return}else s.length<3&&(s+=f);l()}}),i.addEventListener("click",d=>{d.target===i&&c(!1)}),r()})}let vn=null,Wd=!0;const rb=e=>{Wd=e};function me(e,t,n="sine",s=0,o=.15){if(Wd)try{vn??=new(window.AudioContext||window.webkitAudioContext),vn.state==="suspended"&&vn.resume().catch(()=>{});const i=vn.createOscillator(),a=vn.createGain(),r=vn.currentTime,l=Math.max(40,e*(.94+Math.random()*.12));i.type=n,i.frequency.setValueAtTime(l,r),s&&i.frequency.exponentialRampToValueAtTime(Math.max(40,l*s),r+t);const c=Math.min(.02,Math.max(.008,t*.22));if(a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(Math.max(2e-4,o),r+c),a.gain.exponentialRampToValueAtTime(.001,r+Math.max(t,c+.02)),n==="square"||n==="sawtooth"){const d=vn.createBiquadFilter();d.type="lowpass",d.frequency.setValueAtTime(1400,r),d.Q.setValueAtTime(.7,r),i.connect(d).connect(a).connect(vn.destination)}else i.connect(a).connect(vn.destination);i.start(r),i.stop(r+t+.02)}catch{}}const R={pick:()=>me(520,.12,"sine",1.6),drop:()=>{me(380,.1,"triangle",.7),setTimeout(()=>me(620,.08,"sine"),60)},pop:()=>me(800,.15,"square",.3,.08),click:()=>me(660,.07,"triangle"),swish:()=>me(300,.25,"sine",2.5,.1),meow:()=>{me(700,.12,"triangle",1.3,.1),setTimeout(()=>me(900,.22,"triangle",.6,.1),110)},purr:()=>[0,90,180,270,360].forEach(e=>setTimeout(()=>me(70,.09,"sawtooth",1,.05),e)),woof:()=>{me(260,.09,"square",.6,.09),setTimeout(()=>me(220,.12,"square",.5,.09),130)},spin:()=>me(400,.35,"sine",2.2,.08),boing:()=>me(200,.3,"sine",3,.1),splash:()=>[0,50,110].forEach((e,t)=>setTimeout(()=>me(900-t*200,.12,"triangle",.4,.06),e)),moo:()=>{me(160,.5,"sawtooth",.8,.07),setTimeout(()=>me(140,.45,"sawtooth",.85,.06),380)},baa:()=>[0,90,180].forEach(e=>setTimeout(()=>me(420,.1,"sawtooth",.95,.05),e)),bleat:()=>[0,70,140,210].forEach(e=>setTimeout(()=>me(520,.07,"square",1.05,.04),e)),oink:()=>{me(300,.12,"square",.6,.07),setTimeout(()=>me(330,.12,"square",.55,.07),160)},peep:()=>[0,120,240].forEach((e,t)=>setTimeout(()=>me(1800+t*150,.07,"sine",1.2,.08),e)),squeak:()=>me(1400,.1,"sine",1.5,.08),neigh:()=>{me(700,.5,"sawtooth",.6,.05),[0,60,120,180,240].forEach(e=>setTimeout(()=>me(620-e,.06,"triangle",1,.04),300+e))},honk:()=>{me(330,.18,"square",1,.07),setTimeout(()=>me(330,.25,"square",1,.07),230)},munch:()=>[0,110,220,330].forEach(e=>setTimeout(()=>me(180+Math.random()*60,.05,"square",.6,.05),e)),cluck:()=>[0,100,180].forEach((e,t)=>setTimeout(()=>me(600+t*80,.06,"square",.8,.05),e)),plant:()=>{me(260,.1,"triangle",.6),setTimeout(()=>me(520,.1,"sine"),90)},water:()=>[0,60,120,180,240].forEach((e,t)=>setTimeout(()=>me(1200-t*120,.08,"sine",.7,.05),e)),pickup:()=>[660,880,990].forEach((e,t)=>setTimeout(()=>me(e,.1,"triangle"),t*60)),sparkle:()=>[880,1100,1320].forEach((e,t)=>setTimeout(()=>me(e,.12),t*70))},mp=new Map;function lb(e,t){const n=(e?"s":"o")+(t?"f":"n"),s=mp.get(n);if(s)return s;const a=`<svg viewBox="0 0 200 260" aria-hidden="true">
    <ellipse cx="100" cy="248" rx="70" ry="8" fill="#000" opacity=".12"/>
    <path d="M40 148 Q26 228 100 238 Q174 228 160 148 Q146 190 100 200 Q54 190 40 148 Z" fill="${t?"#fff6fb":"#ffc2d4"}" stroke="#5a3d5c" stroke-width="6" stroke-linejoin="round"/>
    <path d="M52 178 Q100 198 148 178" fill="none" stroke="#9ad7f5" stroke-width="12" stroke-linecap="round"/>
    <circle cx="100" cy="92" r="58" fill="#f3c7a0" stroke="#5a3d5c" stroke-width="6"/>
    <path d="M76 50 Q66 16 100 38 Q114 8 130 46 Q112 28 100 40 Q88 30 76 50 Z" fill="#8d5524" stroke="#5a3d5c" stroke-width="6" stroke-linejoin="round"/>
    ${e?'<path d="M72 96 Q84 90 96 96" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round"/><path d="M104 96 Q116 90 128 96" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round"/>':'<circle cx="82" cy="96" r="7" fill="#5a3d5c"/><circle cx="118" cy="96" r="7" fill="#5a3d5c"/><circle cx="84" cy="93" r="2.4" fill="#fff"/><circle cx="120" cy="93" r="2.4" fill="#fff"/>'}
    <path d="M86 118 Q100 130 114 118" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="64" cy="112" rx="12" ry="7" fill="#ff9bb5" opacity=".8"/>
    <ellipse cx="136" cy="112" rx="12" ry="7" fill="#ff9bb5" opacity=".8"/>
    <circle cx="152" cy="168" r="12" fill="#f3c7a0" stroke="#5a3d5c" stroke-width="5"/>
  </svg>`;return mp.set(n,a),a}const vi="#5a3d5c";function ol(e){return e&&/^#[0-9a-fA-F]{6}$/.test(e)?e.toLowerCase():"#f1c27d"}const ya={x:60,y:118,w:56,h:40};function cb(e,t,n){return n==="lie"&&e==="over"?null:t&&n==="lie"?{d:"M72 172 C36 200 40 228 88 220",sleeve:"M72 172 C52 186 44 196 42 204",hx:88,hy:220}:t&&n==="sit"?e==="under"?{d:"M72 172 C40 190 46 220 108 228",sleeve:"M72 172 C56 178 46 184 42 188",hx:108,hy:228}:{d:"M128 172 C154 192 150 214 118 208",sleeve:"M128 172 C142 180 148 186 150 190",hx:118,hy:208}:t?e==="under"?{d:"M72 172 C40 196 48 222 112 214",sleeve:"M72 172 C56 178 46 184 42 188",hx:112,hy:214}:{d:"M128 172 C158 180 154 200 124 196",sleeve:"M128 172 C144 178 150 184 154 188",hx:124,hy:196}:n==="lie"?{d:"M22 84 C10 112 14 136 46 130",sleeve:"",hx:46,hy:130}:e==="under"?{d:"M22 84 C14 104 12 128 44 130",sleeve:"",hx:44,hy:130}:{d:"M78 84 C90 98 86 118 64 114",sleeve:"",hx:64,hy:114}}function db(e,t,n){const s=`M${e-8} ${t-1} Q${e-9} ${t-11} ${e} ${t-11} Q${e+9} ${t-11} ${e+9} ${t} Q${e+9} ${t+9} ${e} ${t+10} Q${e-9} ${t+9} ${e-8} ${t-1} Z`,o=`<ellipse cx="${e+8}" cy="${t-2}" rx="3.2" ry="5" fill="${n}" stroke="${vi}" stroke-width="3.4" transform="rotate(-24 ${e+8} ${t-2})"/>`;return`<path class="cradle-hand" data-cx="${e}" data-cy="${t}" d="${s}" fill="${n}" stroke="${vi}" stroke-width="3.9"/>${o}`}function ea(e,t,n,s,o){const i=cb(e,t,s);if(!i)return"";const a=ol(n),r=o&&/^#[0-9a-fA-F]{6}$/.test(o)?o.toLowerCase():"",l='fill="none" stroke-linecap="round" stroke-linejoin="round"',c=t?16:12,d=t?20.2:15.5;let f=`<path d="${i.d}" ${l} stroke="${vi}" stroke-width="${d}"/><path d="${i.d}" ${l} stroke="${a}" stroke-width="${c}"/>`;t&&i.sleeve&&r&&(f+=`<path d="${i.sleeve}" ${l} stroke="${vi}" stroke-width="29"/><path d="${i.sleeve}" ${l} stroke="${r}" stroke-width="22"/>`);const p=t?db(i.hx,i.hy,a):`<circle class="cradle-hand" data-cx="${i.hx}" data-cy="${i.hy}" cx="${i.hx}" cy="${i.hy}" r="7" fill="${a}" stroke="${vi}" stroke-width="3.5"/>`;return`<g class="arm cradle">${f}${p}</g>`}const ba=110,Yo=148,yp=80,bp=57,fb=60,pb=133,hb=42,gb=30,ub=60,mb=129,ka=["feed","burp","change","rock"],Il=["Bean","Pip","Mochi","Bunny","Dot","Sunny"];function yb(e){let t=null,n=null,s=null,o=!1,i=Number.NaN,a=0,r=0,l=!1,c=!1;const d=typeof navigator<"u"&&!!navigator.webdriver;function f(I,O,X,Q,q){I.style.left=(O-Q/2)/Mt*100+"%",I.style.top=(X-q)/Pn*100+"%",I.style.width=Q/Mt*100+"%",I.style.height=q/Pn*100+"%"}function p(I){const O=I.scale&&I.scale>0?I.scale:1,X=I.pose==="sit"||I.pose==="lie"?I.pose:null,Q=I.chibi&&I.pose!=="sit"&&I.pose!=="lie",q=Q?ya.x:I.chibi?ub:fb,ee=Q?ya.y:I.chibi?mb:pb,ue=Q?ya.w:I.chibi?hb:yp,Ee=Q?ya.h:I.chibi?gb:bp,we=S1(q,ee,X,!!I.lieFlip,O),Qe=X==="lie"?we.x:I.flip?-we.x:we.x,H=ue*O,U=Ee*O;return{x:I.x+Qe,y:I.y+we.y+U/2,w:H,h:U}}function g(I,O){let X=null,Q=0;for(let q=0;q<ka.length;q++){const ee=ka[q],ue=I.at?.[ee]??0;ue>0&&O-ue>=0&&O-ue<1100&&ue>=Q&&(X=ee,Q=ue)}return X}function b(I){if(I.mood<=2||!e.canSend()){window.clearTimeout(a),i=Number.NaN;return}if(i===I.since)return;window.clearTimeout(a),i=I.since;const O=Math.max(0,I.since+kc-e.clock());a=window.setTimeout(()=>{i=Number.NaN;const X=e.get().baby;!X||X.mood<=2||!e.canSend()||e.dispatch({type:"baby/ease",now:e.clock()})},O)}function m(I,O){window.clearTimeout(r);let X=0;for(let Q=0;Q<ka.length;Q++){const q=I.at?.[ka[Q]]??0;O-q>=0&&O-q<1100&&q>X&&(X=q)}X&&(r=window.setTimeout(()=>Ke(),Math.max(0,1100-(O-X))))}function k(I,O){if(typeof document.elementsFromPoint!="function")return null;const X=document.elementsFromPoint(I,O),Q=e.get(),q=Q.rooms[Q.currentRoom]?.items??[];for(let ee=0;ee<X.length;ee++){const ue=X[ee];if(!ue||typeof ue.closest!="function"||ue.closest(".baby, .babyCare, .babyMeet"))continue;const Ee=ue.closest(".item");if(!Ee)continue;const we=Ee.dataset.id||"";for(let Qe=0;Qe<q.length;Qe++){const H=q[Qe];if(H.id===we&&(Zs(H.kind)||e.box(H)))return H}}return null}function y(I){I.addEventListener("pointerdown",O=>{if(O.button!==0)return;const X=e.get().baby;if(!X)return;if(O.preventDefault(),O.stopPropagation(),X.spot==="arms"&&X.holder&&X.holder!==e.holderId()&&e.holderHere(X.holder)){N("Someone is cuddling!");return}if(!e.editable()){e.locked();return}if(!e.canSend())return;const Q=e.owner(),q=Q,ee=O.clientX,ue=O.clientY,Ee=O.pointerId;let we=!1;const Qe=U=>{if(U.pointerId!==Ee||(Math.hypot(U.clientX-ee,U.clientY-ue)>6&&(we=!0),!q||!we))return;o=!0;const tt=e.toRoom(U.clientX,U.clientY);f(I,tt.x,tt.y,ba,Yo)},H=U=>{if(U.pointerId!==Ee)return;window.removeEventListener("pointermove",Qe),window.removeEventListener("pointerup",H),window.removeEventListener("pointercancel",H);const tt=o&&we&&q;if(o=!1,U.type==="pointercancel"){Ke();return}if(tt){const mt=document.elementFromPoint(U.clientX,U.clientY)?.closest(".tab[data-room]");if(mt&&mt.dataset.room){const Fo=mt.dataset.room,hm=e.toRoom(U.clientX,U.clientY),Wf=t2(hm.x,Mt);Fo!==e.get().currentRoom&&e.dispatch({type:"room/switch",room:Fo}),e.dispatch({type:"baby/place",room:Fo,x:Wf.x,y:Wf.y,spot:"mat",bed:null,seat:null,now:e.clock()}),R.drop();return}const _s=e.toRoom(U.clientX,U.clientY),rn=k(U.clientX,U.clientY),xl=rn?e.box(rn):null,$s=e2({mode:e.play()?"play":"decorate",releaseX:Math.max(0,Math.min(Mt,_s.x)),releaseY:Math.max(0,Math.min(Pn,_s.y)),piece:xl,occupied:e.occupied()});e.dispatch({type:"baby/place",room:e.get().currentRoom,x:$s.x,y:$s.y,spot:$s.spot,bed:$s.bed,seat:$s.seat,now:e.clock()}),R.drop();return}if(we){Ke();return}const ft=e.get().baby;if(!ft)return;if(ft.spot==="arms"&&ft.holder===e.holderId()){const mt=e.toRoom(U.clientX,U.clientY);e.dispatch({type:"baby/hold",holder:null,room:e.get().currentRoom,x:Math.max(0,Math.min(Mt,mt.x)),y:Math.max(40,Math.min(Pn,mt.y)),now:e.clock()}),R.drop();return}const qe=e.holderSpot(),De=qe?p(qe):null,Se=De?De.x:ft.x,ut=De?Math.max(40,De.y):ft.y;e.dispatch({type:"baby/hold",holder:e.holderId(),room:e.get().currentRoom,x:Se,y:ut,now:e.clock()}),R.pick()};window.addEventListener("pointermove",Qe),window.addEventListener("pointerup",H),window.addEventListener("pointercancel",H)})}function u(){return t&&t.isConnected||(t=document.createElement("div"),t.className="baby",t.dataset.baby="1",t.innerHTML='<div class="hit"></div><div class="babySpin"><div class="babyRock"><div class="babyInner"></div></div></div><div class="babyZzz" hidden>z z z</div><div class="babyBurp" hidden><i></i></div>',e.layer.appendChild(t),y(t)),t}function w(I,O){const X=I.querySelector(".babyWord");X&&(X.textContent=q1(O));const Q=I.querySelectorAll(".babyBlossom"),q=N1(O);for(let ue=0;ue<Q.length;ue++)Q[ue].classList.toggle("on",ue<q);const ee=I.querySelector(".babyMeter");ee&&(ee.dataset.mood=String(O))}function _(I){const O=xg(I);if(!O){N("Try another name!");return}const X=e.get().baby;!X||X.name===O||(e.dispatch({type:"baby/name",name:O}),R.click())}function P(I){n=document.createElement("div"),n.className="babyCare",n.dataset.babyCare="1";const O=[];for(let q=0;q<5;q++)O.push('<i class="babyBlossom"></i>');const X=[];for(let q=0;q<Il.length;q++)X.push(`<button type="button" data-preset="${Il[q]}">${Il[q]}</button>`);n.innerHTML=`<p class="babyWord"></p><span class="babyMeter"><span class="babyBlossoms">${O.join("")}</span></span>
      <button type="button" data-care="feed">Bottle</button>
      <button type="button" data-care="burp">Burp</button>
      <button type="button" data-care="change">Diaper</button>
      <button type="button" data-care="rock">Rock</button>
      <button type="button" data-baby-name-open>Name</button>
      <div class="babyNames" hidden>
        <input type="text" maxlength="14" autocomplete="off" enterkeyhint="done" aria-label="Baby name" value="">
        ${X.join("")}
      </div>`,w(n,I.mood),n.addEventListener("pointerdown",q=>q.stopPropagation()),n.addEventListener("click",q=>{const ee=q.target,ue=ee.closest("[data-care]");if(ue&&ue.dataset.care){if(!e.editable()){e.locked();return}if(!e.canSend())return;const we=ue.dataset.care;e.dispatch({type:"baby/care",care:we,now:e.clock()}),we==="rock"?R.purr():we==="feed"?R.sparkle():R.click();return}if(ee.closest("[data-baby-name-open]")){if(!e.owner())return;c=!c;const we=n?.querySelector(".babyNames");we&&(we.hidden=!c);const Qe=n?.querySelector("input");c&&Qe&&(Qe.value=e.get().baby?.name??"",Qe.focus());return}const Ee=ee.closest("[data-preset]");if(Ee&&e.owner()){_(Ee.dataset.preset||"");return}}),n.querySelector("input")?.addEventListener("keydown",q=>{q.key==="Enter"&&(q.preventDefault(),_(q.target.value))}),e.stageWrap.appendChild(n)}function x(I,O){if(!e.play()){E();return}const X=n&&document.activeElement&&n.contains(document.activeElement);if((!n||!n.isConnected)&&P(I),!n)return;n.hidden=!1,w(n,I.mood);const Q=n.querySelector("[data-baby-name-open]");Q&&(Q.hidden=!O);const q=n.querySelector(".babyNames");q&&(q.hidden=!O||!c);const ee=n.querySelector("input");ee&&!X&&(ee.value=I.name),W()}function E(){c=!1,n&&(n.remove(),n=null),W()}function W(){const I=!!(n&&n.isConnected&&!n.hidden),O=document.body.classList.contains("baby-card");document.body.classList.toggle("baby-card",I),O!==I&&window.dispatchEvent(new Event("resize"))}function V(I){if(!I||d){s&&(s.remove(),s=null);return}if(s&&s.isConnected){s.hidden=!1;return}s=document.createElement("button"),s.type="button",s.className="babyMeet",s.textContent="Meet the baby",s.addEventListener("pointerdown",O=>O.stopPropagation()),s.addEventListener("click",()=>{if(!e.editable()){e.locked();return}!e.canSend()||e.get().baby||(e.dispatch({type:"baby/meet",now:e.clock()}),R.sparkle())}),e.stageWrap.appendChild(s)}function ne(){const I=e.get().rooms.nursery?.items??[];for(let O=0;O<I.length;O++)if(Zs(I[O].kind)==="crib")return!0;return!1}function Y(I,O){I.classList.remove("baby-lie","baby-lie-r","baby-cradle","cradle-lie","flipped");const X=e.get().currentRoom;if((O.spot==="crib"||O.spot==="bassinet")&&O.bed){const Q=e.get().rooms[O.room]?.items.find(ee=>ee.id===O.bed)??null,q=Q?e.box(Q):null;if(Q&&q){const ee=ag(Q.kind,q);f(I,ee.x,ee.y+Yo/2,ba,Yo),I.style.zIndex=String(1e3+Q.z+1),I.classList.add("baby-lie"),Q.flip&&I.classList.add("baby-lie-r");return}}if(O.spot==="arms"){const Q=O.holder?e.holderSpot(O.holder):null,q=Q?p(Q):null,ee=q?q.x:O.x,ue=q?q.y:O.y,Ee=q?q.w:yp,we=q?q.h:bp;f(I,ee,ue,Ee,we),I.style.zIndex=String(5e3+Math.round(Q?Q.y:O.y)+2),I.classList.add("baby-cradle"),I.style.setProperty("--spin-w",(we/Ee*100).toFixed(4)+"%"),I.style.setProperty("--spin-h",(Ee/we*100).toFixed(4)+"%"),Q&&Q.pose==="lie"&&I.classList.add("cradle-lie"),Q&&(Q.pose==="lie"?Q.lieFlip:Q.flip)&&I.classList.add("flipped");return}if(O.spot==="mat"&&O.seat){const Q=e.seatAt(X,O.seat,O);f(I,Q.x,Q.y,ba,Yo);const q=e.get().rooms[X]?.items.find(ee=>ee.id===O.seat?.item);I.style.zIndex=String(1e3+(q?.z??0)+1),O.seat.pose==="lie"&&(I.classList.add("baby-lie"),q?.flip&&I.classList.add("baby-lie-r"));return}f(I,O.x,O.y,ba,Yo),I.style.zIndex=String(5e3+Math.round(O.y))}function K(I){if(I.spot!=="arms"||!I.holder)return!1;const O=e.get().characters.find(X=>X.id===I.holder);return!!O&&O.room!==I.room}function an(I){o||!K(I)||!e.canSend()||!e.editable()||e.dispatch({type:"baby/hold",holder:null,room:I.room,x:I.x,y:Ki,now:e.clock()})}function Vt(I){if(o||K(I)||I.spot!=="arms"||I.holder!==e.holderId()||!e.canSend()||!e.editable())return;const O=e.holderSpot();if(!O)return;const X=e.get().currentRoom;if(I.room===X)return;const Q=p(O);e.dispatch({type:"baby/hold",holder:I.holder,room:X,x:Q.x,y:Math.max(40,Q.y),now:e.clock()})}function Ke(){const I=e.get(),O=I.baby,X=!!O&&O.spot==="arms"&&!!O.holder&&!!e.holderSpot(O.holder),Q=!!O&&O.spot==="arms"&&O.holder===e.holderId()&&!!e.holderSpot(),q=!!(O&&e.inHouse()&&(O.room===I.currentRoom||X||Q));if(!O||!q){t&&(t.remove(),t=null),o=!1,E(),window.clearTimeout(a),i=Number.NaN;const Se=!d&&!O&&e.inHouse()&&e.owner()&&e.editable()&&e.canSend()&&I.currentRoom==="nursery"&&ne();V(Se);return}V(!1),Bo()&&!Gs("baby")&&!l&&(l=!0,sl(["baby"]).then(()=>Ke()));const ee=u(),ue=e.clock(),Ee=g(O,ue),we=Ee==="rock",Qe=Ee==="change",H=!we&&!Qe&&Bo()?Gs("baby"):"",U=ee.querySelector(".babyInner"),tt=(H||"svg")+(we?"s":"")+(Qe?"f":"");U&&ee.dataset.look!==tt&&(U.innerHTML=H?`<img class="artimg" alt="" draggable="false" src="${H}">`:lb(we,Qe),ee.dataset.look=tt),ee.dataset.babySpot=O.spot,ee.dataset.babyMood=String(O.mood),ee.dataset.babyName=O.name,ee.classList.toggle("is-feed",Ee==="feed"),ee.classList.toggle("is-burp",Ee==="burp"),ee.classList.toggle("is-change",Ee==="change"),ee.classList.toggle("is-rock",Ee==="rock");const ft=ee.querySelector(".babyZzz"),qe=ee.querySelector(".babyBurp"),De=(O.spot==="crib"||O.spot==="bassinet")&&!Ee;ft&&(ft.hidden=!De),qe&&(qe.hidden=Ee!=="burp"),o&&ee.isConnected||Y(ee,O),x(O,e.owner()),b(O),m(O,ue),an(O),Vt(O)}return{render:Ke}}const bb={hip:0,head:3,armL:26,armR:-22,legL:-76,legR:76,legLLift:8,legRLift:8},kb={hip:0,head:-8,armL:18,armR:-12,legL:-4,legR:6,legLLift:0,legRLift:0};function il(e){return e==="sit"?bb:e==="lie"?kb:null}const Xe="#5a3d5c",re=(e=4)=>`stroke="${Xe}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Ud=600,Xt=250,Es=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})">
  <rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${re()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${re()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${re()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${re()}/>
  <circle cx="-18" cy="-78" r="9" fill="#fff" opacity=".35"/></g>`,wb=(e,t,n)=>`<g transform="translate(${e} ${t})"><path d="M0 0 V-16" ${re(3)}/>${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*6}" cy="${-20+Math.sin(s*Math.PI/180)*6}" r="5" fill="${n}" ${re(2)}/>`).join("")}<circle cx="0" cy="-20" r="4" fill="#ffd166" ${re(2)}/></g>`,kp=e=>`<g transform="translate(${e} 0)">
  <rect x="-80" y="452" width="160" height="12" rx="6" fill="#ff9f68" ${re()}/><rect x="-80" y="470" width="160" height="12" rx="6" fill="#ff9f68" ${re()}/>
  <rect x="-70" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${re(3)}/><rect x="60" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${re(3)}/>
  <rect x="-86" y="490" width="172" height="14" rx="7" fill="#ffb385" ${re()}/></g>`;function vb(){const e=Dd,t=Array.from({length:Math.floor((ht.x1-ht.x0+40)/34)},(n,s)=>`<path d="M${ht.x0-20+s*34} 470 V428 l8 -10 l8 10 V470 Z" fill="#fff6e6" ${re(3)}/>`).join("");return`<svg class="parkScene" viewBox="0 0 ${e} ${Ud}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient>
  <pattern id="pkCheck" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><rect width="15" height="15" fill="#ff8fab"/><rect x="15" y="15" width="15" height="15" fill="#ff8fab"/></pattern></defs>
  <rect width="${e}" height="440" fill="url(#pkSky)"/>
  ${[180,900,1600,2300].map((n,s)=>`<g transform="translate(${n} ${70+s%2*30})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <circle cx="${e-220}" cy="90" r="46" fill="#ffe066" ${re(4)}/>
  <path d="M-50 360 Q500 220 1100 340 T2300 330 T${e+100} 350 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#9fe0aa"/><path d="M0 410 H${e}" ${re(4)}/>
  <path d="M0 560 Q700 520 1400 565 T${e} 545 V600 H0 Z" fill="#f6e3c3" opacity=".9"/>
  ${Es(260,390,.9)}${Es(720,380,1.05,"#4fbf7a")}${Es(1230,385,.8)}${Es(1640,380,1,"#4fbf7a")}${Es(1990,388,.85)}${Es(2380,380,.95)}${Es(2860,390,.9,"#4fbf7a")}
  ${[[300,470,"#ff8fab"],[690,455,"#c9a0dc"],[1210,470,"#ffd166"],[1960,450,"#8ecae6"],[2390,470,"#ff8fab"],[1580,590,"#c9a0dc"],[140,585,"#ffd166"]].map(([n,s,o])=>wb(+n,+s,String(o))).join("")}
  <!-- gate back to the street -->
  <g><rect x="40" y="300" width="22" height="200" rx="6" fill="#c99366" ${re()}/><rect x="168" y="300" width="22" height="200" rx="6" fill="#c99366" ${re()}/>
    <path d="M30 312 Q115 240 200 312" fill="none" stroke="${Xe}" stroke-width="16" stroke-linecap="round"/><path d="M30 312 Q115 240 200 312" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
    <rect x="62" y="252" width="106" height="36" rx="12" fill="#fff6e6" ${re(3)}/><text x="115" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="${Xe}" font-family="Nunito, system-ui, sans-serif">PARK</text></g>
  <!-- swing set (seats are separate so they can swing) -->
  <g><path d="M350 ${Xt} L310 500 M350 ${Xt} L390 500 M650 ${Xt} L610 500 M650 ${Xt} L690 500" stroke="${Xe}" stroke-width="14" stroke-linecap="round"/>
    <path d="M350 ${Xt} L310 500 M350 ${Xt} L390 500 M650 ${Xt} L610 500 M650 ${Xt} L690 500" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/>
    <rect x="330" y="${Xt-10}" width="340" height="20" rx="10" fill="#ff8fab" ${re()}/></g>
  <!-- slide -->
  <g><path d="M${ye.ladder-20} 560 V${ye.top.y} M${ye.ladder+30} 560 V${ye.top.y}" stroke="${Xe}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${ye.ladder-20} 560 V${ye.top.y} M${ye.ladder+30} 560 V${ye.top.y}" stroke="#c9a0dc" stroke-width="6" stroke-linecap="round"/>
    ${[380,420,460,500,540].map(n=>`<path d="M${ye.ladder-20} ${n} H${ye.ladder+30}" ${re(5)}/>`).join("")}
    <rect x="${ye.ladder-30}" y="${ye.top.y-14}" width="100" height="18" rx="8" fill="#ffd166" ${re()}/>
    <path d="M${ye.ladder+60} ${ye.top.y-10} C 1000 ${ye.top.y} 1010 520 ${ye.bottom.x+40} 548 L${ye.bottom.x+40} 572 C 990 548 975 ${ye.top.y+30} ${ye.ladder+60} ${ye.top.y+14} Z" fill="#ffd166" ${re()}/>
    <path d="M${ye.ladder+70} ${ye.top.y-2} C 990 ${ye.top.y+8} 1000 525 ${ye.bottom.x+30} 552" fill="none" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/></g>
  <!-- splash pond -->
  <g class="pondArt"><ellipse cx="1420" cy="515" rx="185" ry="52" fill="#8ecae6" ${re()}/><ellipse cx="1420" cy="510" rx="150" ry="36" fill="#b5e3f5"/>
    <ellipse cx="1340" cy="520" rx="24" ry="9" fill="#80ed99" ${re(3)}/><ellipse cx="1500" cy="505" rx="20" ry="8" fill="#80ed99" ${re(3)}/>
    <g transform="translate(1440 500)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ffd166" ${re(3)}/><circle cx="16" cy="-12" r="9" fill="#ffd166" ${re(3)}/><path d="M24 -12 l8 2 l-8 3 z" fill="#ff9f68" ${re(2)}/><circle cx="18" cy="-14" r="1.8" fill="${Xe}"/></g></g>
  <!-- picnic blanket -->
  <g><path d="M1670 530 L1910 530 L1940 580 L1640 580 Z" fill="url(#pkCheck)" ${re()}/>
    <g transform="translate(1915 520)"><rect x="-26" y="-20" width="52" height="32" rx="8" fill="#e6b88a" ${re(3)}/><path d="M-18 -20 Q0 -46 18 -20" fill="none" ${re(4)}/><circle cx="-10" cy="-24" r="7" fill="#ff6b6b" ${re(2)}/></g></g>
  ${kp(2065)}${kp(2265)}
  <!-- dog area -->
  <g>${t}<path d="M${ht.x0-20} 440 H${ht.x1+20}" ${re(3)}/>
    <g transform="translate(${ht.x0+10} 380)"><rect x="-6" y="0" width="12" height="70" fill="#c99366" ${re(3)}/><rect x="-55" y="-34" width="110" height="38" rx="10" fill="#fff6e6" ${re(3)}/>
      <text x="0" y="-8" text-anchor="middle" font-size="20" font-weight="900" fill="${Xe}" font-family="Nunito, system-ui, sans-serif">DOGS 🐾</text></g>
    <g transform="translate(${ht.x1-30} 470)"><path d="M-50 0 V-60 L0 -100 L50 -60 V0 Z" fill="#ff8fab" ${re()}/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="${Xe}" stroke-width="14" stroke-linecap="round"/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="#c9a0dc" stroke-width="8" stroke-linecap="round"/><path d="M-20 0 V-30 a20 20 0 0 1 40 0 V0 Z" fill="#5a3d5c"/></g>
    <g transform="translate(${ht.x0+120} 500)"><rect x="-12" y="-30" width="24" height="34" rx="8" fill="#ff6b6b" ${re(3)}/><rect x="-18" y="-18" width="36" height="8" rx="4" fill="#ff6b6b" ${re(3)}/><circle cx="0" cy="-32" r="10" fill="#ff6b6b" ${re(3)}/></g></g>
  </svg>`}const _b=`<svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M10 0 V222 M50 0 V222" stroke="${Xe}" stroke-width="4"/><rect x="0" y="216" width="60" height="14" rx="6" fill="#ff9f68" ${re(3)}/></svg>`,$b=`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffd166" ${re(3)}/><path d="M6 16 Q20 24 34 16 M8 27 Q20 19 32 27" fill="none" stroke="#fff" stroke-width="3"/></svg>`,xb=`<svg viewBox="0 0 48 48"><rect x="20" y="28" width="8" height="14" rx="3" fill="#c99366" stroke="${Xe}" stroke-width="3"/><circle cx="24" cy="20" r="13" fill="#5cc985" stroke="${Xe}" stroke-width="3"/><circle cx="19" cy="16" r="3" fill="#fff" opacity=".5"/></svg>`,Rg=`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8" fill="#ff8fab" stroke="${Xe}" stroke-width="3"/><circle cx="13" cy="20" r="4.5" fill="#ff8fab" stroke="${Xe}" stroke-width="3"/><circle cx="20" cy="13" r="4.5" fill="#ff8fab" stroke="${Xe}" stroke-width="3"/><circle cx="28" cy="13" r="4.5" fill="#ff8fab" stroke="${Xe}" stroke-width="3"/><circle cx="35" cy="20" r="4.5" fill="#ff8fab" stroke="${Xe}" stroke-width="3"/></svg>`,Mb=`<svg viewBox="0 0 48 48"><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="${Xe}" stroke-width="4" stroke-linecap="round"/><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="#ff9f68" stroke-width="2"/><path d="M16 40 V26 M24 40 V22 M32 40 V26" stroke="${Xe}" stroke-width="3" stroke-linecap="round"/></svg>`,$t="#5a3d5c",Me=`stroke="${$t}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Dl=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${$t}"/><circle cx="${t}" cy="${n}" r="3" fill="${$t}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,Ol=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,wa='<ellipse cx="50" cy="97" rx="34" ry="3" fill="#000" opacity=".12"/>',Lb=`<svg viewBox="0 0 40 30"><path d="M4 30 V16 Q4 2 20 2 Q36 2 36 16 V30 Z" fill="#3b2a3d" ${Me}/><circle cx="14" cy="18" r="1.6" fill="#fff" opacity=".8"/><circle cx="22" cy="18" r="1.6" fill="#fff" opacity=".8"/></svg>`,Eb=`<svg viewBox="0 0 48 30"><path d="M4 27 Q10 22 22 23 L42 23 Q46 27 42 28 H6 Z" fill="#cdeccf" ${Me}/><circle cx="26" cy="15" r="11" fill="#ffb3c6" ${Me}/><path d="M26 15 m-5 0 a5 5 0 1 1 5 5" fill="none" ${Me}/><path d="M8 23 L5 13 M12 23 L12 13" ${Me}/></svg>`,Sb=`<svg viewBox="0 0 30 30"><path d="M15 2 l3.6 8 8.4 1 -6.3 5.8 1.8 8.4 -7.5 -4.4 -7.5 4.4 1.8 -8.4 L3 11 l8.4 -1z" fill="#fff3b0" ${Me}/></svg>`,Cb=`<svg viewBox="0 0 30 22"><ellipse cx="15" cy="13" rx="13" ry="8" fill="#e6b88a" ${Me}/><circle cx="10" cy="11" r="1.8" fill="${$t}"/><circle cx="18" cy="14" r="1.8" fill="${$t}"/><circle cx="16" cy="9" r="1.5" fill="${$t}"/></svg>`,Pb=`<svg viewBox="0 0 30 28"><path d="M15 26 C3 18 1 10 6 5 C10 1 14 4 15 7 C16 4 20 1 24 5 C29 10 27 18 15 26 Z" fill="#ffc8dd" ${Me}/></svg>`,hr=[{name:"Cada",room:"living",x:150,y:382,w:40,h:30,taps:3,spot:Lb,hello:"Squeak! Hi Cada!",item:{kind:"egg:cada-mouse",name:"Cada's Mouse",cat:"secrets",w:80,holdable:!0,svg:`${wa}<path d="M78 74 Q96 68 92 52" stroke="#ff9bb5" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="28" ry="18" fill="#d6d6e8" ${Me}/><circle cx="28" cy="40" r="13" fill="#d6d6e8" ${Me}/><circle cx="62" cy="38" r="13" fill="#d6d6e8" ${Me}/><circle cx="28" cy="40" r="7" fill="#ffc8dd"/><circle cx="62" cy="38" r="7" fill="#ffc8dd"/><circle cx="45" cy="56" r="20" fill="#e4e4f2" ${Me}/>${Dl(38,52,54)}<circle cx="45" cy="64" r="3" fill="#ff8fab"/>${Ol(32,58,62)}<text x="50" y="96" font-size="11" font-weight="900" text-anchor="middle" fill="${$t}">C</text>`}},{name:"Sloane",room:"living",x:2290,y:383,w:48,h:30,taps:3,spot:Eb,hello:"Hi Sloane! ✨",item:{kind:"egg:sloane-snail",name:"Sloane's Rainbow Snail",cat:"secrets",w:110,holdable:!0,svg:`${wa}<path d="M6 92 Q14 80 36 82 L84 82 Q94 90 84 94 H10 Z" fill="#cdeccf" ${Me}/><circle cx="56" cy="52" r="32" fill="#ff8fab" ${Me}/><circle cx="56" cy="52" r="24" fill="#ffd166"/><circle cx="56" cy="52" r="17" fill="#80ed99"/><circle cx="56" cy="52" r="10" fill="#8ecae6"/><circle cx="56" cy="52" r="4" fill="#c9a0dc"/><circle cx="56" cy="52" r="32" fill="none" ${Me}/><path d="M14 82 L8 60 M24 82 L24 60" ${Me}/><circle cx="8" cy="58" r="4" fill="${$t}"/><circle cx="24" cy="58" r="4" fill="${$t}"/>${Ol(14,30,76)}`}},{name:"Chloe",room:"bedroom",x:2230,y:92,w:30,h:30,taps:5,spot:Sb,item:{kind:"egg:chloe-starlamp",name:"Chloe's Star Lamp",cat:"secrets",w:100,holdable:!0,svg:`${wa}<circle cx="50" cy="38" r="34" fill="#fff3b0" opacity=".6"/><path d="M50 6 l8 17 19 2.5 -14 13 4 19 -17 -9.5 -17 9.5 4 -19 -14 -13 19 -2.5z" fill="#ffd166" ${Me}/>${Dl(43,57,38)}<path d="M45 46 q5 4 10 0" ${Me} fill="none"/><rect x="46" y="66" width="8" height="22" rx="4" fill="#c9a0dc" ${Me}/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#b388d6" ${Me}/><text x="50" y="93" font-size="8" font-weight="900" text-anchor="middle" fill="#fff">CHLOE</text>`}},{name:"Quinn",room:"kitchen",x:80,y:588,w:30,h:22,taps:4,spot:Cb,hello:"Woof! Hi Quinn!",item:{kind:"egg:quinn-pup",name:"Quinn's Cookie Pup",cat:"secrets",w:110,holdable:!0,svg:`${wa}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#e6b88a" ${Me}/><circle cx="50" cy="44" r="27" fill="#f2d0a4" ${Me}/><ellipse cx="24" cy="46" rx="10" ry="17" fill="#b07d54" ${Me}/><ellipse cx="76" cy="46" rx="10" ry="17" fill="#b07d54" ${Me}/>${Dl(41,59,42)}<ellipse cx="50" cy="53" rx="5" ry="4" fill="${$t}"/>${Ol(34,66,54)}<circle cx="84" cy="80" r="10" fill="#e6b88a" ${Me}/><circle cx="81" cy="78" r="1.8" fill="${$t}"/><circle cx="87" cy="82" r="1.8" fill="${$t}"/><text x="50" y="30" font-size="10" font-weight="900" text-anchor="middle" fill="${$t}">Q</text>`}},{name:"Reagan",room:"salon",x:2300,y:352,w:30,h:28,taps:5,spot:Pb,item:{kind:"egg:reagan-frame",name:"Reagan's Frame",cat:"secrets",w:120,wall:!0,svg:`<rect x="8" y="10" width="84" height="84" rx="16" fill="#ff8fab" ${Me}/><rect x="18" y="20" width="64" height="64" rx="10" fill="#fff3f7" ${Me}/><text x="50" y="72" font-size="52" font-weight="900" text-anchor="middle" fill="#e879c6" stroke="${$t}" stroke-width="2.5">R</text><circle cx="14" cy="16" r="6" fill="#ffd166" ${Me}/><circle cx="86" cy="88" r="6" fill="#ffd166" ${Me}/><path d="M76 24 l2 4 4 .5 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.5z" fill="#ffd166"/>`}}],Tb=hr.map(e=>({...e.item,rooms:["any"],secret:e.name})),Bg=Tt("cozy-secrets"),al=()=>{try{return new Set(JSON.parse(localStorage.getItem(Bg)??"[]"))}catch{return new Set}},Rb=e=>localStorage.setItem(Bg,JSON.stringify([...e]));function Bb(e){const t=document.createElement("div");t.className="eggs",e.world.appendChild(t);const n=new Map;for(const o of hr){const i=document.createElement("div");i.className="eggspot",i.dataset.egg=o.name,i.style.left=(o.x-o.w/2)/e.roomW*100+"%",i.style.top=(o.y-o.h)/e.roomH*100+"%",i.style.width=o.w/e.roomW*100+"%",i.style.height=o.h/e.roomH*100+"%",i.innerHTML=o.spot,t.appendChild(i),i.addEventListener("pointerdown",a=>a.stopPropagation()),i.addEventListener("click",a=>{a.stopPropagation();const r=Date.now(),l=n.get(o.name)??{n:0,t:0};if(l.n=r-l.t<1500?l.n+1:1,l.t=r,n.set(o.name,l),i.classList.remove("poke"),i.offsetWidth,i.classList.add("poke"),e.tap(),l.n<o.taps)return;l.n=0;const c=al(),d=!c.has(o.name);c.add(o.name),Rb(c),Ab(o,i),e.sparkle(),e.onFound(o.name,d)})}const s=()=>{const o=e.currentRoom();t.querySelectorAll(".eggspot").forEach(i=>{i.style.display=hr.find(a=>a.name===i.dataset.egg).room===o?"":"none"})};return s(),{update:s}}function Ab(e,t){if(e.hello){const s=document.createElement("div");s.className="eggpop",s.innerHTML=`<div class="eggcritter"><svg viewBox="0 0 100 100">${e.item.svg}</svg></div><div class="bubble">${e.hello}</div>`,t.appendChild(s),setTimeout(()=>s.remove(),3200)}const n=document.createElement("div");n.className="eggbanner",n.innerHTML=`<span class="sp">✨</span><span class="nm">${[...e.name].map((s,o)=>`<i style="animation-delay:${o*70}ms">${s}</i>`).join("")}</span><span class="sp">✨</span>`,document.body.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3100),Ag()}function Ag(e=70){const t=["#ff8fab","#ffd166","#8ecae6","#80ed99","#c9a0dc","#ff9f68"],n=document.createElement("div");n.className="confetti",document.body.appendChild(n);for(let s=0;s<e;s++){const o=document.createElement("i");o.style.left=Math.random()*100+"vw",o.style.background=t[s%t.length],o.style.animationDelay=Math.random()*.5+"s",o.style.animationDuration=1.6+Math.random()*1.2+"s",o.style.setProperty("--r",Math.random()*720-360+"deg"),o.style.setProperty("--dx",Math.random()*160-80+"px"),s%3===0&&(o.style.borderRadius="50%"),n.appendChild(o)}setTimeout(()=>n.remove(),3600)}const Ib=`[
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
  },
  {
    "type": "item",
    "slug": "wc-knit-armchair",
    "name": "Knit-Blanket Armchair",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-knit-armchair.webp",
    "widthUnits": 720,
    "heightUnits": 667,
    "gameW": 156,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-plaid-sofa",
    "name": "Plaid Cabin Sofa",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-plaid-sofa.webp",
    "widthUnits": 720,
    "heightUnits": 313,
    "gameW": 235,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-stone-hearth",
    "name": "Stone Hearth Fireplace",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-stone-hearth.webp",
    "widthUnits": 720,
    "heightUnits": 624,
    "gameW": 204,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-woodstove",
    "name": "Woodstove",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-woodstove.webp",
    "widthUnits": 359,
    "heightUnits": 720,
    "gameW": 140,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-sled-table",
    "name": "Sled Coffee Table",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-sled-table.webp",
    "widthUnits": 693,
    "heightUnits": 351,
    "gameW": 210,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-log-bench",
    "name": "Log Bench",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-log-bench.webp",
    "widthUnits": 720,
    "heightUnits": 268,
    "gameW": 210,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-window-seat",
    "name": "Snowy Window Seat",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-window-seat.webp",
    "widthUnits": 564,
    "heightUnits": 628,
    "gameW": 214,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-pinecone-table",
    "name": "Pinecone Side Table",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-pinecone-table.webp",
    "widthUnits": 536,
    "heightUnits": 720,
    "gameW": 108,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-mitten-ottoman",
    "name": "Mitten Ottoman",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-mitten-ottoman.webp",
    "widthUnits": 643,
    "heightUnits": 720,
    "gameW": 130,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-birch-basket",
    "name": "Birch Log Basket",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-birch-basket.webp",
    "widthUnits": 596,
    "heightUnits": 720,
    "gameW": 140,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-frosted-pine",
    "name": "Frosted Pine",
    "room": "living",
    "category": "plants",
    "tag": "plant",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-frosted-pine.webp",
    "widthUnits": 419,
    "heightUnits": 720,
    "gameW": 150,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-twinkle-lamp",
    "name": "Twinkle-Light Floor Lamp",
    "room": "living",
    "category": "furniture",
    "tag": "lighting",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-twinkle-lamp.webp",
    "widthUnits": 263,
    "heightUnits": 720,
    "gameW": 96,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-holiday-tree",
    "name": "Decorated Holiday Tree",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-holiday-tree.webp",
    "widthUnits": 470,
    "heightUnits": 720,
    "gameW": 180,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-plaid-bed",
    "name": "Red Plaid Quilt Bed",
    "room": "bedroom",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-plaid-bed.webp",
    "widthUnits": 720,
    "heightUnits": 570,
    "gameW": 290,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-ice-wardrobe",
    "name": "Ice-Blue Wardrobe",
    "room": "bedroom",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-ice-wardrobe.webp",
    "widthUnits": 449,
    "heightUnits": 720,
    "gameW": 168,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-snow-nightstand",
    "name": "Snowflake Nightstand",
    "room": "bedroom",
    "category": "furniture",
    "tag": "furniture",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-snow-nightstand.webp",
    "widthUnits": 720,
    "heightUnits": 607,
    "gameW": 112,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-fur-bench",
    "name": "Fur-Trim Bench",
    "room": "bedroom",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-fur-bench.webp",
    "widthUnits": 720,
    "heightUnits": 258,
    "gameW": 190,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-frost-bookcase",
    "name": "Frosty Bookcase",
    "room": "bedroom",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-frost-bookcase.webp",
    "widthUnits": 533,
    "heightUnits": 720,
    "gameW": 170,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-globe-lamp",
    "name": "Snow-Globe Lamp",
    "room": "bedroom",
    "category": "furniture",
    "tag": "lighting",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-globe-lamp.webp",
    "widthUnits": 438,
    "heightUnits": 720,
    "gameW": 96,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-penguin-chair",
    "name": "Penguin Plush Chair",
    "room": "bedroom",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-penguin-chair.webp",
    "widthUnits": 662,
    "heightUnits": 720,
    "gameW": 140,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-sock-hamper",
    "name": "Cozy Sock Hamper",
    "room": "bedroom",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-sock-hamper.webp",
    "widthUnits": 500,
    "heightUnits": 720,
    "gameW": 130,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-cocoa-cart",
    "name": "Cocoa Cart",
    "room": "kitchen",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-cocoa-cart.webp",
    "widthUnits": 720,
    "heightUnits": 670,
    "gameW": 170,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-peppermint-counter",
    "name": "Peppermint Counter",
    "room": "kitchen",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-peppermint-counter.webp",
    "widthUnits": 720,
    "heightUnits": 293,
    "gameW": 250,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-cookie-oven",
    "name": "Cookie Oven",
    "room": "kitchen",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-cookie-oven.webp",
    "widthUnits": 627,
    "heightUnits": 720,
    "gameW": 168,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-mug-shelf",
    "name": "Mug Tree Shelf",
    "room": "kitchen",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-mug-shelf.webp",
    "widthUnits": 720,
    "heightUnits": 283,
    "gameW": 150,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-gingerbread",
    "name": "Gingerbread Cottage",
    "room": "kitchen",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-gingerbread.webp",
    "widthUnits": 693,
    "heightUnits": 720,
    "gameW": 160,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-cookie-plate",
    "name": "Cookie Plate",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-cookie-plate.webp",
    "widthUnits": 720,
    "heightUnits": 528,
    "gameW": 120,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-marshmallow-jar",
    "name": "Marshmallow Jar",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-marshmallow-jar.webp",
    "widthUnits": 478,
    "heightUnits": 720,
    "gameW": 86,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-cocoa-pot",
    "name": "Cocoa Pot",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-cocoa-pot.webp",
    "widthUnits": 676,
    "heightUnits": 720,
    "gameW": 100,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-cinnamon-tray",
    "name": "Cinnamon Roll Tray",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-cinnamon-tray.webp",
    "widthUnits": 150,
    "heightUnits": 45,
    "gameW": 150,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-snowman",
    "name": "Snowman Buddy",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-snowman.webp",
    "widthUnits": 474,
    "heightUnits": 720,
    "gameW": 100,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-snow-globe",
    "name": "Snow Globe",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-snow-globe.webp",
    "widthUnits": 549,
    "heightUnits": 720,
    "gameW": 110,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-cocoa-mug",
    "name": "Mug of Cocoa",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-cocoa-mug.webp",
    "widthUnits": 720,
    "heightUnits": 675,
    "gameW": 78,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-mitten-line",
    "name": "Mittens on a Line",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-mitten-line.webp",
    "widthUnits": 720,
    "heightUnits": 406,
    "gameW": 170,
    "holdable": false,
    "wall": true
  },
  {
    "type": "item",
    "slug": "wc-ice-skates",
    "name": "Ice Skates",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-ice-skates.webp",
    "widthUnits": 100,
    "heightUnits": 100,
    "gameW": 100,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-snowshoes",
    "name": "Snowshoes",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-snowshoes.webp",
    "widthUnits": 453,
    "heightUnits": 720,
    "gameW": 110,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-pinecone-garland",
    "name": "Pinecone Garland",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-pinecone-garland.webp",
    "widthUnits": 720,
    "heightUnits": 192,
    "gameW": 180,
    "holdable": false,
    "wall": true
  },
  {
    "type": "item",
    "slug": "wc-berry-wreath",
    "name": "Berry Wreath",
    "room": "any",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-berry-wreath.webp",
    "widthUnits": 676,
    "heightUnits": 720,
    "gameW": 96,
    "holdable": false,
    "wall": true
  },
  {
    "type": "item",
    "slug": "wc-twinkle-string",
    "name": "Twinkle Light String",
    "room": "any",
    "category": "decor",
    "tag": "lighting",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-twinkle-string.webp",
    "widthUnits": 720,
    "heightUnits": 144,
    "gameW": 180,
    "holdable": false,
    "wall": true
  },
  {
    "type": "item",
    "slug": "wc-lantern",
    "name": "Lantern",
    "room": "any",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-lantern.webp",
    "widthUnits": 327,
    "heightUnits": 720,
    "gameW": 84,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-candle-trio",
    "name": "LED Candle Trio",
    "room": "living",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-candle-trio.webp",
    "widthUnits": 700,
    "heightUnits": 648,
    "gameW": 100,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-snow-mobile",
    "name": "Snowflake Mobile",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-snow-mobile.webp",
    "widthUnits": 441,
    "heightUnits": 720,
    "gameW": 120,
    "holdable": false,
    "wall": true
  },
  {
    "type": "item",
    "slug": "wc-polar-plush",
    "name": "Polar Bear Plush",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-polar-plush.webp",
    "widthUnits": 570,
    "heightUnits": 720,
    "gameW": 96,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-penguin-plush",
    "name": "Penguin Plush",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-penguin-plush.webp",
    "widthUnits": 508,
    "heightUnits": 720,
    "gameW": 90,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-peppermint-rug",
    "name": "Peppermint Swirl Rug",
    "room": "any",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-peppermint-rug.webp",
    "widthUnits": 720,
    "heightUnits": 492,
    "gameW": 250,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-pom-rug",
    "name": "Knit Pom Rug",
    "room": "any",
    "category": "decor",
    "tag": "rug",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-pom-rug.webp",
    "widthUnits": 720,
    "heightUnits": 399,
    "gameW": 240,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-cabin-picture",
    "name": "Cabin Picture",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-cabin-picture.webp",
    "widthUnits": 720,
    "heightUnits": 615,
    "gameW": 110,
    "holdable": false,
    "wall": true
  },
  {
    "type": "item",
    "slug": "wc-snow-window",
    "name": "Snowy Window Art",
    "room": "any",
    "category": "decor",
    "tag": "lighting",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-snow-window.webp",
    "widthUnits": 657,
    "heightUnits": 720,
    "gameW": 140,
    "holdable": false,
    "wall": true
  },
  {
    "type": "item",
    "slug": "wc-present-stack",
    "name": "Wrapped Present Stack",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-present-stack.webp",
    "widthUnits": 492,
    "heightUnits": 720,
    "gameW": 110,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-bauble-garland",
    "name": "Ribbon Bauble Garland",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-bauble-garland.webp",
    "widthUnits": 720,
    "heightUnits": 204,
    "gameW": 180,
    "holdable": false,
    "wall": true
  },
  {
    "type": "item",
    "slug": "wc-stocking-row",
    "name": "Knit Stocking Row",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "large",
    "pack": "winter",
    "png": "packs/winter/wc-stocking-row.webp",
    "widthUnits": 720,
    "heightUnits": 538,
    "gameW": 170,
    "holdable": false,
    "wall": true
  },
  {
    "type": "item",
    "slug": "wc-cane-lamp",
    "name": "Candy Cane Lamp",
    "room": "any",
    "category": "decor",
    "tag": "lighting",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-cane-lamp.webp",
    "widthUnits": 90,
    "heightUnits": 234,
    "gameW": 90,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-star-topper",
    "name": "Star Tree Topper",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-star-topper.webp",
    "widthUnits": 545,
    "heightUnits": 720,
    "gameW": 80,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-poinsettia",
    "name": "Poinsettia Pot",
    "room": "any",
    "category": "plants",
    "tag": "plant",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-poinsettia.webp",
    "widthUnits": 626,
    "heightUnits": 720,
    "gameW": 110,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-holly",
    "name": "Holly Sprig",
    "room": "any",
    "category": "plants",
    "tag": "plant",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-holly.webp",
    "widthUnits": 720,
    "heightUnits": 719,
    "gameW": 100,
    "holdable": false,
    "wall": true
  },
  {
    "type": "item",
    "slug": "wc-nutcracker",
    "name": "Nutcracker Friend",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "winter",
    "png": "packs/winter/wc-nutcracker.webp",
    "widthUnits": 222,
    "heightUnits": 720,
    "gameW": 80,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-reindeer",
    "name": "Reindeer Plush",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-reindeer.webp",
    "widthUnits": 427,
    "heightUnits": 720,
    "gameW": 96,
    "holdable": true
  },
  {
    "type": "item",
    "slug": "wc-sleigh-planter",
    "name": "Sleigh Planter",
    "room": "any",
    "category": "plants",
    "tag": "plant",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-sleigh-planter.webp",
    "widthUnits": 720,
    "heightUnits": 612,
    "gameW": 160,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "wc-gingerbread-village",
    "name": "Gingerbread Village",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "winter",
    "png": "packs/winter/wc-gingerbread-village.webp",
    "widthUnits": 720,
    "heightUnits": 298,
    "gameW": 156,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "hw-star-pumpkin",
    "name": "Starry Glow Pumpkin",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "halloween",
    "png": "packs/halloween/hw-star-pumpkin.webp",
    "widthUnits": 680,
    "heightUnits": 720,
    "gameW": 54,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "hw-heart-pumpkin",
    "name": "Heart and Moon Pumpkin",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "halloween",
    "png": "packs/halloween/hw-heart-pumpkin.webp",
    "widthUnits": 720,
    "heightUnits": 714,
    "gameW": 54,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "hw-moon-lantern",
    "name": "Moonbeam Lantern",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "halloween",
    "png": "packs/halloween/hw-moon-lantern.webp",
    "widthUnits": 357,
    "heightUnits": 720,
    "gameW": 44,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "hw-witch-hat",
    "name": "Starry Witch Hat",
    "room": "bedroom",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "halloween",
    "png": "packs/halloween/hw-witch-hat.webp",
    "widthUnits": 720,
    "heightUnits": 703,
    "gameW": 56,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "hw-cauldron",
    "name": "Bubbly Cauldron",
    "room": "kitchen",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "halloween",
    "png": "packs/halloween/hw-cauldron.webp",
    "widthUnits": 675,
    "heightUnits": 720,
    "gameW": 70,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "hw-hay-bale",
    "name": "Harvest Hay Bale",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "medium",
    "pack": "halloween",
    "png": "packs/halloween/hw-hay-bale.webp",
    "widthUnits": 720,
    "heightUnits": 627,
    "gameW": 96,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "hw-ghost-sheet",
    "name": "Friendly Sheet Ghost",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "halloween",
    "png": "packs/halloween/hw-ghost-sheet.webp",
    "widthUnits": 564,
    "heightUnits": 720,
    "gameW": 54,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "hw-cat-statue",
    "name": "Black Cat Statue",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "halloween",
    "png": "packs/halloween/hw-cat-statue.webp",
    "widthUnits": 336,
    "heightUnits": 720,
    "gameW": 44,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "hw-candy-bowl",
    "name": "Treat Bowl",
    "room": "kitchen",
    "category": "food",
    "tag": "food",
    "size": "small",
    "pack": "halloween",
    "png": "packs/halloween/hw-candy-bowl.webp",
    "widthUnits": 720,
    "heightUnits": 641,
    "gameW": 56,
    "holdable": false
  },
  {
    "type": "item",
    "slug": "hw-leaf-garland",
    "name": "Autumn Leaf Garland",
    "room": "living",
    "category": "decor",
    "tag": "decor",
    "size": "medium",
    "pack": "halloween",
    "png": "packs/halloween/hw-leaf-garland.webp",
    "widthUnits": 720,
    "heightUnits": 221,
    "gameW": 150,
    "holdable": false,
    "wall": true
  },
  {
    "type": "item",
    "slug": "hw-moon-cling",
    "name": "Moon and Stars Window Cling",
    "room": "bedroom",
    "category": "decor",
    "tag": "decor",
    "size": "small",
    "pack": "halloween",
    "png": "packs/halloween/hw-moon-cling.webp",
    "widthUnits": 678,
    "heightUnits": 720,
    "gameW": 60,
    "holdable": false,
    "wall": true
  }
]
`,Db=`[
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
  },
  {
    "slug": "wc-snowflake-sky",
    "name": "Snowflake Sky",
    "type": "wallpaper",
    "pack": "winter",
    "png": "winter/wc-snowflake-sky.webp"
  },
  {
    "slug": "wc-mint-pine",
    "name": "Mint Pine Sprigs",
    "type": "wallpaper",
    "pack": "winter",
    "png": "winter/wc-mint-pine.webp"
  },
  {
    "slug": "wc-candy-stripe",
    "name": "Candy Stripe",
    "type": "wallpaper",
    "pack": "winter",
    "png": "winter/wc-candy-stripe.webp"
  },
  {
    "slug": "wc-red-plaid",
    "name": "Cozy Red Plaid",
    "type": "wallpaper",
    "pack": "winter",
    "png": "winter/wc-red-plaid.webp"
  },
  {
    "slug": "wc-frosty-dots",
    "name": "Frosty Dots",
    "type": "wallpaper",
    "pack": "winter",
    "png": "winter/wc-frosty-dots.webp"
  },
  {
    "slug": "wc-cabin-planks",
    "name": "Cabin Planks",
    "type": "floor",
    "pack": "winter",
    "png": "winter/wc-cabin-planks.webp"
  },
  {
    "slug": "wc-snow-knit",
    "name": "Snow Knit Carpet",
    "type": "floor",
    "pack": "winter",
    "png": "winter/wc-snow-knit.webp"
  },
  {
    "slug": "wc-peppermint-tiles",
    "name": "Peppermint Tiles",
    "type": "floor",
    "pack": "winter",
    "png": "winter/wc-peppermint-tiles.webp"
  }
]
`,Ob="/kids-house-game/assets/alarm-clock-DOVobLzL.png",Hb="/kids-house-game/assets/alarm-clock-BCd1-e86.svg",Wb="/kids-house-game/assets/bedtime-snack-COvX4Nqo.png",Ub="/kids-house-game/assets/bedtime-snack-BoNDQqOK.svg",Vb="/kids-house-game/assets/book-stack-BlyqbTA1.png",zb="/kids-house-game/assets/book-stack-upnp1NwG.svg",Qb="/kids-house-game/assets/bunk-bed-COiQly1s.png",qb="/kids-house-game/assets/bunk-bed-YZiRWNFR.svg",Nb="/kids-house-game/assets/bunny-slippers-DajXa_JK.png",Zb="/kids-house-game/assets/bunny-slippers-PNucIc_Q.svg",Fb="/kids-house-game/assets/canopy-bed-Db9GIfyT.png",jb="/kids-house-game/assets/canopy-bed-BwWkRhe2.svg",Gb="/kids-house-game/assets/cat-bed-ChP4s69B.png",Yb="/kids-house-game/assets/cat-bed-B8ULFbHc.svg",Kb="/kids-house-game/assets/cloud-rug-Bv3GScgR.png",Xb="/kids-house-game/assets/cloud-rug-CFl6aZc5.svg",Jb="/kids-house-game/assets/cloud-shelf-BAmU3DSp.png",ek="/kids-house-game/assets/cloud-shelf-DF5b_IoZ.svg",tk="/kids-house-game/assets/cork-board-B8yw-MFd.png",nk="/kids-house-game/assets/cork-board-Bj5OuLbv.svg",sk="/kids-house-game/assets/daisy-pot-BQDVlAug.png",ok="/kids-house-game/assets/daisy-pot-Cy8SrSS6.svg",ik="/kids-house-game/assets/desk-UTaBcI2Q.png",ak="/kids-house-game/assets/desk-2rRtV3Vk.svg",rk="/kids-house-game/assets/dino-plush-yhz7rVZD.png",lk="/kids-house-game/assets/dino-plush-Dq_qccf0.svg",ck="/kids-house-game/assets/doll-house-DfYMaHqJ.png",dk="/kids-house-game/assets/doll-house-BrC3RiST.svg",fk="/kids-house-game/assets/dresser-jJcAkDG_.png",pk="/kids-house-game/assets/dresser-__9TGuYc.svg",hk="/kids-house-game/assets/egg-chair-DobnnZdC.png",gk="/kids-house-game/assets/egg-chair-CtiaqWNQ.svg",uk="/kids-house-game/assets/floor-fan-C2R5oDHp.png",mk="/kids-house-game/assets/floor-fan-Dt9SIAmB.svg",yk="/kids-house-game/assets/guinea-pig-BzHyXlGo.png",bk="/kids-house-game/assets/guinea-pig-CwLeNU_S.svg",kk="/kids-house-game/assets/hamster-cage-zv59jo6b.png",wk="/kids-house-game/assets/hamster-cage-lQ6r7saV.svg",vk="/kids-house-game/assets/heart-rug-DYGPCKpT.png",_k="/kids-house-game/assets/heart-rug-CBDvH6Q6.svg",$k="/kids-house-game/assets/lava-lamp-Df-lJpLx.png",xk="/kids-house-game/assets/lava-lamp-DEuHvlco.svg",Mk="/kids-house-game/assets/moon-night-light-JPI5SkUV.png",Lk="/kids-house-game/assets/moon-night-light-CAKsjYZv.svg",Ek="/kids-house-game/assets/nightstand-D3WOPlqw.png",Sk="/kids-house-game/assets/nightstand-Bgsh0YUi.svg",Ck="/kids-house-game/assets/paper-lantern-mpw1jXzL.png",Pk="/kids-house-game/assets/paper-lantern-CErOGyrT.svg",Tk="/kids-house-game/assets/piggy-bank-DaSktUUA.png",Rk="/kids-house-game/assets/piggy-bank-DsHrmOcp.svg",Bk="/kids-house-game/assets/plant-stand-BpU338ra.png",Ak="/kids-house-game/assets/plant-stand-DDyIDaL0.svg",Ik="/kids-house-game/assets/play-tent-ih6xOGXC.png",Dk="/kids-house-game/assets/play-tent-Bsawe52j.svg",Ok="/kids-house-game/assets/star-mobile-Bqyd_ikl.png",Hk="/kids-house-game/assets/star-mobile-DzOGs-Jo.svg",Wk="/kids-house-game/assets/toy-chest-DhEoVFj0.png",Uk="/kids-house-game/assets/toy-chest-6iPrDiZH.svg",Vk="/kids-house-game/assets/toy-robot-Bfkjfj_6.png",zk="/kids-house-game/assets/toy-robot-OaCEwmDT.svg",Qk="/kids-house-game/assets/toy-train-DILjZiya.png",qk="/kids-house-game/assets/toy-train-D5GqAnpy.svg",Nk="/kids-house-game/assets/unicorn-plush-5YQqQjND.png",Zk="/kids-house-game/assets/unicorn-plush-C0W1eEs9.svg",Fk="/kids-house-game/assets/wardrobe-sJcJSWZ2.png",jk="/kids-house-game/assets/wardrobe-Dn492IK0.svg",Gk="/kids-house-game/assets/bananas-D4irRkGy.png",Yk="/kids-house-game/assets/bananas-aPQwdEVo.svg",Kk="/kids-house-game/assets/bar-stool-xbwaa01H.png",Xk="/kids-house-game/assets/bar-stool-DWxhX1Ah.svg",Jk="/kids-house-game/assets/bread-loaf-DKmR5wPN.png",ew="/kids-house-game/assets/bread-loaf-C9cEAYcl.svg",tw="/kids-house-game/assets/chick-DCnoMwEt.png",nw="/kids-house-game/assets/chick-BTEVfgqU.svg",sw="/kids-house-game/assets/china-hutch-K3xtlmqi.png",ow="/kids-house-game/assets/china-hutch-BTmMY6rg.svg",iw="/kids-house-game/assets/cocoa-mug-BmqSzNJ6.png",aw="/kids-house-game/assets/cocoa-mug-CraNCc9b.svg",rw="/kids-house-game/assets/cookie-jar-CZsO9PSp.png",lw="/kids-house-game/assets/cookie-jar-ripj0oyT.svg",cw="/kids-house-game/assets/cooking-pot-BSKPlqyT.png",dw="/kids-house-game/assets/cooking-pot-BWtfOm9f.svg",fw="/kids-house-game/assets/cupcake-KO1KLKav.png",pw="/kids-house-game/assets/cupcake-DFCw42xb.svg",hw="/kids-house-game/assets/dish-rack-DICSEn5E.png",gw="/kids-house-game/assets/dish-rack-BpVmmU6k.svg",uw="/kids-house-game/assets/fruit-bowl-BL5EkaC8.png",mw="/kids-house-game/assets/fruit-bowl-Dw9lsB3B.svg",yw="/kids-house-game/assets/frying-pan-BocrLcES.png",bw="/kids-house-game/assets/frying-pan-CTBY6MC_.svg",kw="/kids-house-game/assets/happy-fridge-BTbpm-W1.png",ww="/kids-house-game/assets/happy-fridge-D7ENuEJs.svg",vw="/kids-house-game/assets/herb-box-DFtC2qBN.png",_w="/kids-house-game/assets/herb-box-CdRxefnV.svg",$w="/kids-house-game/assets/high-chair-DZCqRJV8.png",xw="/kids-house-game/assets/high-chair-BQtLYlq4.svg",Mw="/kids-house-game/assets/ice-cream-CLLMXjn9.png",Lw="/kids-house-game/assets/ice-cream-DydSyNXx.svg",Ew="/kids-house-game/assets/kettle-DScYOeEK.png",Sw="/kids-house-game/assets/kettle-D1nuAiG_.svg",Cw="/kids-house-game/assets/kitchen-counter-cZcDRQIw.png",Pw="/kids-house-game/assets/kitchen-counter-C8sTAZ-V.svg",Tw="/kids-house-game/assets/kitchen-sink-DrP43iga.png",Rw="/kids-house-game/assets/kitchen-sink-CYjDcd1n.svg",Bw="/kids-house-game/assets/lemon-tree-BwA7W0cM.png",Aw="/kids-house-game/assets/lemon-tree-CZz-Vy3P.svg",Iw="/kids-house-game/assets/microwave-BJRDd-L-.png",Dw="/kids-house-game/assets/microwave-lopm-FCT.svg",Ow="/kids-house-game/assets/milk-bottle-D7UB6VD8.png",Hw="/kids-house-game/assets/milk-bottle-DxcUA6XT.svg",Ww="/kids-house-game/assets/pancakes-CbisCK-C.png",Uw="/kids-house-game/assets/pancakes-CLqxnc5R.svg",Vw="/kids-house-game/assets/pantry-shelf-DI_CgvVD.png",zw="/kids-house-game/assets/pantry-shelf-Azdxpmzd.svg",Qw="/kids-house-game/assets/pendant-lamp-BhZanag5.png",qw="/kids-house-game/assets/pendant-lamp-fZv6y1p0.svg",Nw="/kids-house-game/assets/pet-bowl-Oe3KGELz.png",Zw="/kids-house-game/assets/pet-bowl-ETL_EOAP.svg",Fw="/kids-house-game/assets/rice-cooker-DUTXsBbb.png",jw="/kids-house-game/assets/rice-cooker-JX0L4bi2.svg",Gw="/kids-house-game/assets/runner-rug-AYIsQudU.png",Yw="/kids-house-game/assets/runner-rug-BbUgZFy4.svg",Kw="/kids-house-game/assets/spice-rack-8ll-6Q2f.png",Xw="/kids-house-game/assets/spice-rack-D9kAw-vT.svg",Jw="/kids-house-game/assets/stand-mixer-CP2fpC-Q.png",e4="/kids-house-game/assets/stand-mixer-CZrLn00l.svg",t4="/kids-house-game/assets/teapot-iFnJNGiA.png",n4="/kids-house-game/assets/teapot-CtPOJzEm.svg",s4="/kids-house-game/assets/toaster-T2WkZkdo.png",o4="/kids-house-game/assets/toaster-CNk0hJDw.svg",i4="/kids-house-game/assets/utensil-rail-_vjcgBpy.png",a4="/kids-house-game/assets/utensil-rail-B0QkGP3A.svg",r4="/kids-house-game/assets/watermelon-slice-yHBcfKGj.png",l4="/kids-house-game/assets/watermelon-slice-VzvgalD5.svg",c4="/kids-house-game/assets/aquarium-rYRAu69m.png",d4="/kids-house-game/assets/aquarium-BlhJ9UCr.svg",f4="/kids-house-game/assets/arc-floor-lamp-CBq3G9j8.png",p4="/kids-house-game/assets/arc-floor-lamp-DL5cEVzq.svg",h4="/kids-house-game/assets/bean-bag-CMLYRsbz.png",g4="/kids-house-game/assets/bean-bag-CauyDuZQ.svg",u4="/kids-house-game/assets/bird-cage-qj5P0te2.png",m4="/kids-house-game/assets/bird-cage-xqeVahX7.svg",y4="/kids-house-game/assets/blanket-basket-5IQiUSS2.png",b4="/kids-house-game/assets/blanket-basket-B4LREUo9.svg",k4="/kids-house-game/assets/building-blocks-CzqAFUNB.png",w4="/kids-house-game/assets/building-blocks-DbtoodPT.svg",v4="/kids-house-game/assets/coffee-table-iKZ20Gpy.png",_4="/kids-house-game/assets/coffee-table-ZYO2ApH6.svg",$4="/kids-house-game/assets/comfy-armchair-U_SI3sk9.png",x4="/kids-house-game/assets/comfy-armchair-tjNYbfgO.svg",M4="/kids-house-game/assets/cubby-shelf-B0De91CO.png",L4="/kids-house-game/assets/cubby-shelf-CLzTUpiz.svg",E4="/kids-house-game/assets/daisy-rug-BqSOjPlJ.png",S4="/kids-house-game/assets/daisy-rug-CvOlxjsu.svg",C4="/kids-house-game/assets/fiddle-leaf-fig-DnvG8l2j.png",P4="/kids-house-game/assets/fiddle-leaf-fig-DiUNW4Q_.svg",T4="/kids-house-game/assets/fireplace-C9azNipx.png",R4="/kids-house-game/assets/fireplace-CqxIMN3Z.svg",B4="/kids-house-game/assets/globe-C-L7vS0t.png",A4="/kids-house-game/assets/globe-DN0sih3W.svg",I4="/kids-house-game/assets/hanging-planter-DGgUXZpP.png",D4="/kids-house-game/assets/hanging-planter-M9IHqztp.svg",O4="/kids-house-game/assets/monstera-plant-BbGZQtOh.png",H4="/kids-house-game/assets/monstera-plant-CLmuB_RM.svg",W4="/kids-house-game/assets/piano-DpS7nvdq.png",U4="/kids-house-game/assets/piano-Y0KQ4rD2.svg",V4="/kids-house-game/assets/popcorn-CFk12JbR.png",z4="/kids-house-game/assets/popcorn-BD2d8sUH.svg",Q4="/kids-house-game/assets/pouf-DY0Vcx75.png",q4="/kids-house-game/assets/pouf-as0li8On.svg",N4="/kids-house-game/assets/rainbow-rug-DwzLb6aY.png",Z4="/kids-house-game/assets/rainbow-rug-C5ZVauOA.svg",F4="/kids-house-game/assets/rainbow-wall-art--5LLrrQJ.png",j4="/kids-house-game/assets/rainbow-wall-art-CCXUPPen.svg",G4="/kids-house-game/assets/retro-radio-BIX4GYkL.png",Y4="/kids-house-game/assets/retro-radio-B3T98xMQ.svg",K4="/kids-house-game/assets/rocking-chair-CDLlJFiP.png",X4="/kids-house-game/assets/rocking-chair-BgoIQu5H.svg",J4="/kids-house-game/assets/rocking-horse-Iz-CpscK.png",e6="/kids-house-game/assets/rocking-horse-1WLLV43R.svg",t6="/kids-house-game/assets/snake-plant-DgPna4k9.png",n6="/kids-house-game/assets/snake-plant-BGDwPcMj.svg",s6="/kids-house-game/assets/string-lights-nDUZa5m1.png",o6="/kids-house-game/assets/string-lights-DGC0Ni2I.svg",i6="/kids-house-game/assets/succulent-trio-VYNH-o5B.png",a6="/kids-house-game/assets/succulent-trio-uPD-ljlL.svg",r6="/kids-house-game/assets/tassel-rug-BBXtknxh.png",l6="/kids-house-game/assets/tassel-rug-DolXtxfQ.svg",c6="/kids-house-game/assets/throw-pillow-BjuGXMYA.png",d6="/kids-house-game/assets/throw-pillow-qWyWQ9cT.svg",f6="/kids-house-game/assets/toy-car-Bwrt0-AT.png",p6="/kids-house-game/assets/toy-car-CTJy5H4V.svg",h6="/kids-house-game/assets/tulip-vase-CpQUgXPR.png",g6="/kids-house-game/assets/tulip-vase-o2vjI1Hg.svg",u6="/kids-house-game/assets/turtle-Bf8_yRql.png",m6="/kids-house-game/assets/turtle-B9Y6NDSv.svg",y6="/kids-house-game/assets/tv-stand-DnwT-hn4.png",b6="/kids-house-game/assets/tv-stand-CcLHFc1J.svg",k6="/kids-house-game/assets/wall-shelf-Bs6mROe1.png",w6="/kids-house-game/assets/wall-shelf-CCWuZ6Xl.svg",v6="/kids-house-game/assets/cc-bakery-shelf-dMrnZVB3.png",_6="/kids-house-game/assets/cc-bakery-shelf-BxdhLTTC.svg",$6="/kids-house-game/assets/cc-breakfast-table-DwHbMV2p.png",x6="/kids-house-game/assets/cc-breakfast-table-DwaO0eFy.svg",M6="/kids-house-game/assets/cc-bubble-chair-DuDi-bRz.png",L6="/kids-house-game/assets/cc-bubble-chair-DncHA7F-.svg",E6="/kids-house-game/assets/cc-canopy-daybed-CAZpSo2a.png",S6="/kids-house-game/assets/cc-canopy-daybed-CVbt6QDr.svg",C6="/kids-house-game/assets/cc-cloud-beanbag-BYcBLKf9.png",P6="/kids-house-game/assets/cc-cloud-beanbag-SM0m-3qY.svg",T6="/kids-house-game/assets/cc-cloud-lamp-v0UO1VrK.png",R6="/kids-house-game/assets/cc-cloud-lamp-BWwxoCux.svg",B6="/kids-house-game/assets/cc-cottage-aquarium-XYuN1CnR.png",A6="/kids-house-game/assets/cc-cottage-aquarium-iY2D26Vq.svg",I6="/kids-house-game/assets/cc-cupcake-stand-jKA3zoCC.png",D6="/kids-house-game/assets/cc-cupcake-stand-B08kdXZL.svg",O6="/kids-house-game/assets/cc-dryer-chair-CP8q6yyq.png",H6="/kids-house-game/assets/cc-dryer-chair-DQmosxUz.svg",W6="/kids-house-game/assets/cc-fairy-garland-B4DVLP6L.png",U6="/kids-house-game/assets/cc-fairy-garland-BncKvkRL.svg",V6="/kids-house-game/assets/cc-fairy-shelf-DSmhC08i.png",z6="/kids-house-game/assets/cc-fairy-shelf-CE6x7J1w.svg",Q6="/kids-house-game/assets/cc-flower-kettle-DZFkbEk5.png",q6="/kids-house-game/assets/cc-flower-kettle-ZTbAh26L.svg",N6="/kids-house-game/assets/cc-flower-lamp-hc1e4xxL.png",Z6="/kids-house-game/assets/cc-flower-lamp-CS2T2S89.svg",F6="/kids-house-game/assets/cc-heart-bed-BtOx4_a4.png",j6="/kids-house-game/assets/cc-heart-bed-76-z9nJg.svg",G6="/kids-house-game/assets/cc-heart-clock-CLtzUj8w.png",Y6="/kids-house-game/assets/cc-heart-clock-ByixSFru.svg",K6="/kids-house-game/assets/cc-heart-pouf-C3vCLnoM.png",X6="/kids-house-game/assets/cc-heart-pouf-DH5J2s2J.svg",J6="/kids-house-game/assets/cc-heart-rug-CpvyM_wf.png",ev="/kids-house-game/assets/cc-heart-rug-Jwmh-m0j.svg",tv="/kids-house-game/assets/cc-jewel-box-DZ6IxYiU.png",nv="/kids-house-game/assets/cc-jewel-box-qMbIQmo4.svg",sv="/kids-house-game/assets/cc-light-vanity-BxKLJiVW.png",ov="/kids-house-game/assets/cc-light-vanity-DD4uQJ_7.svg",iv="/kids-house-game/assets/cc-macaron-jar-NI43JiPM.png",av="/kids-house-game/assets/cc-macaron-jar-A0sT-Lvj.svg",rv="/kids-house-game/assets/cc-macrame-swing-x8sop4y4.png",lv="/kids-house-game/assets/cc-macrame-swing-qIcoPp0o.svg",cv="/kids-house-game/assets/cc-mani-chair-C1J_zCFX.png",dv="/kids-house-game/assets/cc-mani-chair-7AWb60tv.svg",fv="/kids-house-game/assets/cc-mint-fridge-7zQk2-Kj.png",pv="/kids-house-game/assets/cc-mint-fridge-Cc87e_gW.svg",hv="/kids-house-game/assets/cc-mushroom-stool-DeoO7P27.png",gv="/kids-house-game/assets/cc-mushroom-stool-B9-y9WNf.svg",uv="/kids-house-game/assets/cc-pastel-range-CXu-Gr6f.png",mv="/kids-house-game/assets/cc-pastel-range-D6cjzJTl.svg",yv="/kids-house-game/assets/cc-perfume-tray-DkUHaA_i.png",bv="/kids-house-game/assets/cc-perfume-tray-DN4chcIn.svg",kv="/kids-house-game/assets/cc-petal-table-DadCDnSy.png",wv="/kids-house-game/assets/cc-petal-table-QrNho7KH.svg",vv="/kids-house-game/assets/cc-plant-wall-CCxqRxsH.png",_v="/kids-house-game/assets/cc-plant-wall-BMii8_kR.svg",$v="/kids-house-game/assets/cc-reading-nook-Eq4Eh0MW.png",xv="/kids-house-game/assets/cc-reading-nook-wiDgasP8.svg",Mv="/kids-house-game/assets/cc-record-player-LmfaPaE5.png",Lv="/kids-house-game/assets/cc-record-player-BoxZhHLy.svg",Ev="/kids-house-game/assets/cc-ribbon-mirror-BEsGok51.png",Sv="/kids-house-game/assets/cc-ribbon-mirror-DiCje_iy.svg",Cv="/kids-house-game/assets/cc-scallop-curtains-Cvab-FzV.png",Pv="/kids-house-game/assets/cc-scallop-curtains-Bzhy2peV.svg",Tv="/kids-house-game/assets/cc-scallop-loveseat-CR3Z2O-W.png",Rv="/kids-house-game/assets/cc-scallop-loveseat-Dfi7dg3b.svg",Bv="/kids-house-game/assets/cc-star-dresser-b15t-WLI.png",Av="/kids-house-game/assets/cc-star-dresser-2wqSnsip.svg",Iv="/kids-house-game/assets/cc-teapot-set-ygQBLdbl.png",Dv="/kids-house-game/assets/cc-teapot-set-DnZlJvn7.svg",Ov="/kids-house-game/assets/cc-window-seat-D-Rfuuwm.png",Hv="/kids-house-game/assets/cc-window-seat-BCOise4Z.svg",Wv="/kids-house-game/assets/arched-shelf-Dt4oWiBK.png",Uv="/kids-house-game/assets/arched-shelf-XtiqRVaT.svg",Vv="/kids-house-game/assets/blob-rug-Ckw1kSsa.png",zv="/kids-house-game/assets/blob-rug-Deh5k10s.svg",Qv="/kids-house-game/assets/bubbly-plant-CV9ioei6.png",qv="/kids-house-game/assets/bubbly-plant-CFTOJd5Y.svg",Nv="/kids-house-game/assets/bud-vase-Bzj5qGgr.png",Zv="/kids-house-game/assets/bud-vase-Dup4WQ5y.svg",Fv="/kids-house-game/assets/comb-brush-CfTGGk1L.png",jv="/kids-house-game/assets/comb-brush-oPJeQv0v.svg",Gv="/kids-house-game/assets/cream-jars-dLRXypJR.png",Yv="/kids-house-game/assets/cream-jars-D6bxrnJR.svg",Kv="/kids-house-game/assets/drop-lamp-DWqiPjZB.png",Xv="/kids-house-game/assets/drop-lamp-CJg63ZKz.svg",Jv="/kids-house-game/assets/droplet-buddy-DCjbvrlK.png",e_="/kids-house-game/assets/droplet-buddy-DTpHggFh.svg",t_="/kids-house-game/assets/fancy-sofa-BRlr2j8I.png",n_="/kids-house-game/assets/fancy-sofa-kq2L0ob5.svg",s_="/kids-house-game/assets/flower-cart-C3W7v2RD.png",o_="/kids-house-game/assets/flower-cart-BWgfg0s_.svg",i_="/kids-house-game/assets/foot-spa-HwiSNgdS.png",a_="/kids-house-game/assets/foot-spa-DdA5_fj_.svg",r_="/kids-house-game/assets/globe-pendants-ChKRw_Bp.png",l_="/kids-house-game/assets/globe-pendants-DNV5WnAO.svg",c_="/kids-house-game/assets/glow-mirror-D4P3UibJ.png",d_="/kids-house-game/assets/glow-mirror-C_dTGwQc.svg",f_="/kids-house-game/assets/gold-floor-mirror-CSYqaszS.png",p_="/kids-house-game/assets/gold-floor-mirror-jfPQepmr.svg",h_="/kids-house-game/assets/hair-dryer-_nFRnXBv.png",g_="/kids-house-game/assets/hair-dryer-CAkhCf7J.svg",u_="/kids-house-game/assets/heart-plant-CN47o4my.png",m_="/kids-house-game/assets/heart-plant-fSU4uLVy.svg",y_="/kids-house-game/assets/heart-pouf-b76ZFT07.png",b_="/kids-house-game/assets/heart-pouf-BMVPBVKJ.svg",k_="/kids-house-game/assets/lilac-curtain-94MUZIqr.png",w_="/kids-house-game/assets/lilac-curtain-D_mFsZKu.svg",v_="/kids-house-game/assets/lotion-trio-wGXg7qdC.png",__="/kids-house-game/assets/lotion-trio-D3lKwvho.svg",$_="/kids-house-game/assets/mani-lamp-B6MLP1xK.png",x_="/kids-house-game/assets/mani-lamp-B4SmvhvS.svg",M_="/kids-house-game/assets/nail-table-CP0_pEA8.png",L_="/kids-house-game/assets/nail-table-C3FitmuG.svg",E_="/kids-house-game/assets/pebble-rug-BgHMxQ6Q.png",S_="/kids-house-game/assets/pebble-rug-DHBZUggl.svg",C_="/kids-house-game/assets/perfume-bottle-F_MkREQh.png",P_="/kids-house-game/assets/perfume-bottle-BcNXSWTW.svg",T_="/kids-house-game/assets/pink-fountain-DtB69ljQ.png",R_="/kids-house-game/assets/pink-fountain-DQ3CIetr.svg",B_="/kids-house-game/assets/pink-vanity-CPmOesS7.png",A_="/kids-house-game/assets/pink-vanity-qE3SwdD6.svg",I_="/kids-house-game/assets/polish-bottle-B2f4PsGZ.png",D_="/kids-house-game/assets/polish-bottle-VWed8EQ-.svg",O_="/kids-house-game/assets/polish-rack-ANlncwDe.png",H_="/kids-house-game/assets/polish-rack-8Ph2n2nM.svg",W_="/kids-house-game/assets/reception-desk-DnhqgkHu.png",U_="/kids-house-game/assets/reception-desk-D4Gevx64.svg",V_="/kids-house-game/assets/salon-chair-Bl31ZE_E.png",z_="/kids-house-game/assets/salon-chair-Wj2sOSW8.svg",Q_="/kids-house-game/assets/scent-candle-BYUsO9s1.png",q_="/kids-house-game/assets/scent-candle-BEUE-6Uv.svg",N_="/kids-house-game/assets/spray-bottle-DJKZeNmL.png",Z_="/kids-house-game/assets/spray-bottle-Bc8iuceJ.svg",F_="/kids-house-game/assets/star-wall-sign-D_9XhB91.png",j_="/kids-house-game/assets/star-wall-sign-DvenTqvU.svg",G_="/kids-house-game/assets/swivel-stool-BGAwWXNX.png",Y_="/kids-house-game/assets/swivel-stool-P-Egqq_Z.svg",K_="/kids-house-game/assets/tiered-tray-CGuVyK1K.png",X_="/kids-house-game/assets/tiered-tray-DLnZTsUF.svg",J_="/kids-house-game/assets/towel-cart-5At-syZP.png",e8="/kids-house-game/assets/towel-cart-DJmR97UL.svg",t8="/kids-house-game/assets/towel-stack-D-pX5koc.png",n8="/kids-house-game/assets/towel-stack-C1qplZ4T.svg",s8="/kids-house-game/assets/vine-planter-mviuZvkw.png",o8="/kids-house-game/assets/vine-planter-Duhx9OMZ.svg",i8="/kids-house-game/assets/waiting-bench-DXbi7ObC.png",a8="/kids-house-game/assets/waiting-bench-BQuoXbE3.svg",r8="/kids-house-game/assets/wash-chair-CJo64U_O.png",l8="/kids-house-game/assets/wash-chair-sdgNnj79.svg",c8="/kids-house-game/assets/hw-candy-bowl-CD02D5Zj.webp",d8="/kids-house-game/assets/hw-cat-statue-DeCc_3q0.webp",f8="/kids-house-game/assets/hw-cauldron-Dct8_uZ8.webp",p8="/kids-house-game/assets/hw-ghost-sheet-kZF5Oxdt.webp",h8="/kids-house-game/assets/hw-hay-bale-BqFYl-D_.webp",g8="/kids-house-game/assets/hw-heart-pumpkin-B-0-0OAK.webp",u8="/kids-house-game/assets/hw-leaf-garland-DN-y_jMP.webp",m8="/kids-house-game/assets/hw-moon-cling-p5ei0N89.webp",y8="/kids-house-game/assets/hw-moon-lantern-ByPteKOL.webp",b8="/kids-house-game/assets/hw-star-pumpkin-Bxq_OX8C.webp",k8="/kids-house-game/assets/hw-witch-hat-BmuOG13B.webp",w8="/kids-house-game/assets/arched-mirror-2vakzmQ8.png",v8="/kids-house-game/assets/arched-mirror-ClJgTBd9.svg",_8="/kids-house-game/assets/big-monitor-BRiCdofl.png",$8="/kids-house-game/assets/big-monitor-jx5PnUa_.svg",x8="/kids-house-game/assets/boba-cup-Dn_S1oAa.png",M8="/kids-house-game/assets/boba-cup-CwUerXNm.svg",L8="/kids-house-game/assets/bubble-bath-D4AZavWB.png",E8="/kids-house-game/assets/bubble-bath-8VwrkImA.svg",S8="/kids-house-game/assets/cactus-buddy-D_lAS12Y.png",C8="/kids-house-game/assets/cactus-buddy-D3uacuVA.svg",P8="/kids-house-game/assets/caterpillar-plush-vK3r58Ch.png",T8="/kids-house-game/assets/caterpillar-plush-BhR8Pydf.svg",R8="/kids-house-game/assets/checker-bed-DD4Ra6RV.png",B8="/kids-house-game/assets/checker-bed-mtuxfPje.svg",A8="/kids-house-game/assets/checker-rug-C9Gs09p_.png",I8="/kids-house-game/assets/checker-rug-CmSO3Y4j.svg",D8="/kids-house-game/assets/clothes-rail-CJ8Du1xN.png",O8="/kids-house-game/assets/clothes-rail-BY-f9coz.svg",H8="/kids-house-game/assets/cloud-sofa-3eVlcAzs.png",W8="/kids-house-game/assets/cloud-sofa-CZS1Y5s-.svg",U8="/kids-house-game/assets/cube-shelf-DPFNgFhk.png",V8="/kids-house-game/assets/cube-shelf-DoI0tLGL.svg",z8="/kids-house-game/assets/curvy-desk-BxyVtcg3.png",Q8="/kids-house-game/assets/curvy-desk-eWCvec1f.svg",q8="/kids-house-game/assets/cute-speaker-Cy7ml0bm.png",N8="/kids-house-game/assets/cute-speaker-DrVF9uns.svg",Z8="/kids-house-game/assets/desk-lamp-B39R5SBQ.png",F8="/kids-house-game/assets/desk-lamp-C-VtrE1V.svg",j8="/kids-house-game/assets/desk-mic-C-4XirP6.png",G8="/kids-house-game/assets/desk-mic-BqYzh6ma.svg",Y8="/kids-house-game/assets/flower-lamp-DyDRXGpR.png",K8="/kids-house-game/assets/flower-lamp-Dpz6tQ2x.svg",X8="/kids-house-game/assets/frog-plush-NmeU5sHZ.png",J8="/kids-house-game/assets/frog-plush-BhkTrE24.svg",e$="/kids-house-game/assets/game-controller-B6phnmU4.png",t$="/kids-house-game/assets/game-controller-6gvwykQG.svg",n$="/kids-house-game/assets/gaming-chair-B7ZnwG2W.png",s$="/kids-house-game/assets/gaming-chair-BCyGMzy0.svg",o$="/kids-house-game/assets/hamster-pet-C09aLs5N.png",i$="/kids-house-game/assets/hamster-pet-LBcghoJj.svg",a$="/kids-house-game/assets/headphones-MRHfNh-e.png",r$="/kids-house-game/assets/headphones-Cjjqt_92.svg",l$="/kids-house-game/assets/heart-light-B6LXGE4j.png",c$="/kids-house-game/assets/heart-light-DfDwRHju.svg",d$="/kids-house-game/assets/keyboard-Dvxz1PEW.png",f$="/kids-house-game/assets/keyboard-Cbtwvtj1.svg",p$="/kids-house-game/assets/mini-fridge-DgYceOBW.png",h$="/kids-house-game/assets/mini-fridge-qdNm4NKf.svg",g$="/kids-house-game/assets/pastel-wardrobe-CFIOdtrx.png",u$="/kids-house-game/assets/pastel-wardrobe-BubkWAN2.svg",m$="/kids-house-game/assets/phone-stand-CWfRuwT_.png",y$="/kids-house-game/assets/phone-stand-VLW-DsK-.svg",b$="/kids-house-game/assets/pothos-plant-mnKAaH_K.png",k$="/kids-house-game/assets/pothos-plant-C1I15M9a.svg",w$="/kids-house-game/assets/puffy-stool-B5z3sd2l.png",v$="/kids-house-game/assets/puffy-stool-CwjoblCa.svg",_$="/kids-house-game/assets/ring-light-BoqM9Lks.png",$$="/kids-house-game/assets/ring-light-CdxNAXA6.svg",x$="/kids-house-game/assets/side-table-round-x1NbWzDq.png",M$="/kids-house-game/assets/side-table-round-rCsBU0YO.svg",L$="/kids-house-game/assets/star-lamp-Bocs3YRP.png",E$="/kids-house-game/assets/star-lamp-CHKQnzvB.svg",S$="/kids-house-game/assets/sticker-board-CMn2BF_D.png",C$="/kids-house-game/assets/sticker-board-LUm1_I_P.svg",P$="/kids-house-game/assets/sunny-art-372bwMLG.png",T$="/kids-house-game/assets/sunny-art-C25M7k02.svg",R$="/kids-house-game/assets/sv-bean-bag-DlsJBRMG.png",B$="/kids-house-game/assets/sv-bean-bag-DdsCYd4e.svg",A$="/kids-house-game/assets/sv-cloud-rug-Bo5aP_HP.png",I$="/kids-house-game/assets/sv-cloud-rug-BvczSj77.svg",D$="/kids-house-game/assets/sv-wall-shelf-C61Y5OFn.png",O$="/kids-house-game/assets/sv-wall-shelf-BtJLzNMg.svg",H$="/kids-house-game/assets/vlog-camera-DAiD7LSW.png",W$="/kids-house-game/assets/vlog-camera-CBd28A7P.svg",U$="/kids-house-game/assets/wavy-floor-lamp-1BJBLV8q.png",V$="/kids-house-game/assets/wavy-floor-lamp-Iy8llzr8.svg",z$="/kids-house-game/assets/acorn-friend-SMoU5de2.png",Q$="/kids-house-game/assets/acorn-friend-BsLiZ2Z_.svg",q$="/kids-house-game/assets/apple-tree-CN7tYao3.png",N$="/kids-house-game/assets/apple-tree-DGIUIjY1.svg",Z$="/kids-house-game/assets/big-wardrobe-DcZpROWW.png",F$="/kids-house-game/assets/big-wardrobe-BnfnkPXl.svg",j$="/kids-house-game/assets/box-stack-DBdO-RRV.png",G$="/kids-house-game/assets/box-stack-ji13G2mP.svg",Y$="/kids-house-game/assets/brick-fireplace-CxelyhgA.png",K$="/kids-house-game/assets/brick-fireplace-BGCbiSK5.svg",X$="/kids-house-game/assets/bulletin-board-BWUCktvK.png",J$="/kids-house-game/assets/bulletin-board-DqA69wQH.svg",e3="/kids-house-game/assets/cozy-mug-DGMQRJK7.png",t3="/kids-house-game/assets/cozy-mug-CFJEPRKb.svg",n3="/kids-house-game/assets/cream-sofa-Dzaz9Eg9.png",s3="/kids-house-game/assets/cream-sofa-CB4EWIDp.svg",o3="/kids-house-game/assets/fire-pit-FhRYTkJU.png",i3="/kids-house-game/assets/fire-pit-DTyRokIj.svg",a3="/kids-house-game/assets/glass-cabinet-C1Dud5Om.png",r3="/kids-house-game/assets/glass-cabinet-BCHExP4F.svg",l3="/kids-house-game/assets/hanging-lantern-5_A0FrVU.png",c3="/kids-house-game/assets/hanging-lantern-DZbXB8L1.svg",d3="/kids-house-game/assets/knit-cushion-CeEpuawZ.png",f3="/kids-house-game/assets/knit-cushion-DUewI6rR.svg",p3="/kids-house-game/assets/ladder-shelf-kDBx9ho_.png",h3="/kids-house-game/assets/ladder-shelf-DXYDmQiE.svg",g3="/kids-house-game/assets/landscape-art-CXy-fkYO.png",u3="/kids-house-game/assets/landscape-art-CdCqCPL2.svg",m3="/kids-house-game/assets/lattice-bench-BQ7wYgqI.png",y3="/kids-house-game/assets/lattice-bench-D3zCZTQp.svg",b3="/kids-house-game/assets/leaf-wreath-01dJ9WfP.png",k3="/kids-house-game/assets/leaf-wreath-DUjq1MWh.svg",w3="/kids-house-game/assets/mini-greenhouse-DLsY7-VZ.png",v3="/kids-house-game/assets/mini-greenhouse-CGE5F9A_.svg",_3="/kids-house-game/assets/moving-box-DszcEI-k.png",$3="/kids-house-game/assets/moving-box-CZXbXcJO.svg",x3="/kids-house-game/assets/picnic-basket-CYmGfWoy.png",M3="/kids-house-game/assets/picnic-basket-D72DCNRY.svg",L3="/kids-house-game/assets/round-rug-DZTiY9p2.png",E3="/kids-house-game/assets/round-rug-D8ePosbv.svg",S3="/kids-house-game/assets/sale-sign-CLwCvavX.png",C3="/kids-house-game/assets/sale-sign-CXWpgQt5.svg",P3="/kids-house-game/assets/sprout-pot-BlPwmBjK.png",T3="/kids-house-game/assets/sprout-pot-BbXk09mS.svg",R3="/kids-house-game/assets/stripe-runner-CWfHHL2f.png",B3="/kids-house-game/assets/stripe-runner-ClycKEW5.svg",A3="/kids-house-game/assets/trailing-plant-BBqKhPvp.png",I3="/kids-house-game/assets/trailing-plant-NbG7dy8O.svg",D3="/kids-house-game/assets/wall-clock-ItDQFPVO.png",O3="/kids-house-game/assets/wall-clock-CDC1o6eG.svg",H3="/kids-house-game/assets/wh-arc-floor-lamp-Dg8j_uAI.png",W3="/kids-house-game/assets/wh-arc-floor-lamp-BKVes2Fd.svg",U3="/kids-house-game/assets/wh-book-stack-9oDTUUnY.png",V3="/kids-house-game/assets/wh-book-stack-DjDFey2h.svg",z3="/kids-house-game/assets/wh-dresser-DhrzqcZ2.png",Q3="/kids-house-game/assets/wh-dresser-Y-jnNt5q.svg",q3="/kids-house-game/assets/wh-fiddle-leaf-fig-Bt0Bc12k.png",N3="/kids-house-game/assets/wh-fiddle-leaf-fig-B0-kGmHI.svg",Z3="/kids-house-game/assets/wh-kitchen-counter-BWikwkWo.png",F3="/kids-house-game/assets/wh-kitchen-counter-BtBenu6u.svg",j3="/kids-house-game/assets/wh-nightstand-BXusZ0A4.png",G3="/kids-house-game/assets/wh-nightstand-DPUoV5aO.svg",Y3="/kids-house-game/assets/wh-pendant-lamp-DbfSrUho.png",K3="/kids-house-game/assets/wh-pendant-lamp-DBg4p7hi.svg",X3="/kids-house-game/assets/wh-snake-plant-kt_6Tus5.png",J3="/kids-house-game/assets/wh-snake-plant-Cj3bHF25.svg",e5="/kids-house-game/assets/wh-string-lights-CWVP27K_.png",t5="/kids-house-game/assets/wh-string-lights-C3JVBkgW.svg",n5="/kids-house-game/assets/wh-teapot-BclPHtYN.png",s5="/kids-house-game/assets/wh-teapot-kevlW5hN.svg",o5="/kids-house-game/assets/wood-armchair-BoX1llWe.png",i5="/kids-house-game/assets/wood-armchair-DNVhKBWe.svg",a5="/kids-house-game/assets/wood-bookshelf-CfgOK-7q.png",r5="/kids-house-game/assets/wood-bookshelf-CvT7GAuI.svg",l5="/kids-house-game/assets/wood-coffee-table-DmAJknnU.png",c5="/kids-house-game/assets/wood-coffee-table-CuAR_7Kr.svg",d5="/kids-house-game/assets/wood-desk-S1h5jwM2.png",f5="/kids-house-game/assets/wood-desk-DPCJq_XQ.svg",p5="/kids-house-game/assets/wood-stool-BWBID67e.png",h5="/kids-house-game/assets/wood-stool-CV7YeZwC.svg",g5="/kids-house-game/assets/wooden-bed-511IemjK.png",u5="/kids-house-game/assets/wooden-bed-Qj-sf8yq.svg",m5="/kids-house-game/assets/wc-bauble-garland-PlBim-j0.webp",y5="/kids-house-game/assets/wc-berry-wreath-BtfH1PGe.webp",b5="/kids-house-game/assets/wc-birch-basket-vRxqyB3J.webp",k5="/kids-house-game/assets/wc-cabin-picture-B-lavF1R.webp",w5="/kids-house-game/assets/wc-candle-trio-CjQ7YYcj.webp",v5="/kids-house-game/assets/wc-cane-lamp-OhwvqNa-.webp",_5="/kids-house-game/assets/wc-cinnamon-tray-CxLrtplK.webp",$5="/kids-house-game/assets/wc-cocoa-cart-BkMzGgs0.webp",x5="/kids-house-game/assets/wc-cocoa-mug-qa2xzTYd.webp",M5="/kids-house-game/assets/wc-cocoa-pot-bLgiaNKD.webp",L5="/kids-house-game/assets/wc-cookie-oven-D2Ud1EPt.webp",E5="/kids-house-game/assets/wc-cookie-plate-RhDZYroJ.webp",S5="/kids-house-game/assets/wc-frost-bookcase-BMd6DAXH.webp",C5="/kids-house-game/assets/wc-frosted-pine-BupMG4GK.webp",P5="/kids-house-game/assets/wc-fur-bench-B1nXjHAR.webp",T5="/kids-house-game/assets/wc-gingerbread-village-8pOXPPCY.webp",R5="/kids-house-game/assets/wc-gingerbread-PGlclkJ_.webp",B5="/kids-house-game/assets/wc-globe-lamp-DUCVl_3A.webp",A5="/kids-house-game/assets/wc-holiday-tree-CO0SBlqY.webp",I5="/kids-house-game/assets/wc-holly-CD8teo0a.webp",D5="/kids-house-game/assets/wc-ice-skates-D49y8YK1.webp",O5="/kids-house-game/assets/wc-ice-wardrobe-Dliflqpp.webp",H5="/kids-house-game/assets/wc-knit-armchair-84rhSw_8.webp",W5="/kids-house-game/assets/wc-lantern-81B3e5fN.webp",U5="/kids-house-game/assets/wc-log-bench-qQ1zT34_.webp",V5="/kids-house-game/assets/wc-marshmallow-jar-DeWRr-zf.webp",z5="/kids-house-game/assets/wc-mitten-line-sg-sweCl.webp",Q5="/kids-house-game/assets/wc-mitten-ottoman-H5qkjso6.webp",q5="/kids-house-game/assets/wc-mug-shelf-DlWrwZYo.webp",N5="/kids-house-game/assets/wc-nutcracker-BGZe5tYy.webp",Z5="/kids-house-game/assets/wc-penguin-chair-CDM1eIxo.webp",F5="/kids-house-game/assets/wc-penguin-plush-C8B27KcB.webp",j5="/kids-house-game/assets/wc-peppermint-counter-CPl6TA0h.webp",G5="/kids-house-game/assets/wc-peppermint-rug-3nakY_gB.webp",Y5="/kids-house-game/assets/wc-pinecone-garland-s7ZWASw2.webp",K5="/kids-house-game/assets/wc-pinecone-table-DlJvjB-2.webp",X5="/kids-house-game/assets/wc-plaid-bed-eAhWKZdO.webp",J5="/kids-house-game/assets/wc-plaid-sofa-kvF30vEn.webp",ex="/kids-house-game/assets/wc-poinsettia-C-S-MDMu.webp",tx="/kids-house-game/assets/wc-polar-plush-BUVRTt7t.webp",nx="/kids-house-game/assets/wc-pom-rug-B-JF-heA.webp",sx="/kids-house-game/assets/wc-present-stack-Do2pEHLF.webp",ox="/kids-house-game/assets/wc-reindeer-CbKEp6CE.webp",ix="/kids-house-game/assets/wc-sled-table-Bd2cST9J.webp",ax="/kids-house-game/assets/wc-sleigh-planter-Bfcxvgbk.webp",rx="/kids-house-game/assets/wc-snow-globe-BcGMsnmh.webp",lx="/kids-house-game/assets/wc-snow-mobile-F06-kuT7.webp",cx="/kids-house-game/assets/wc-snow-nightstand-D6RhLncP.webp",dx="/kids-house-game/assets/wc-snow-window-dOxdYTSk.webp",fx="/kids-house-game/assets/wc-snowman-gxLBKnIO.webp",px="/kids-house-game/assets/wc-snowshoes-CZcMT0Qx.webp",hx="/kids-house-game/assets/wc-sock-hamper-mesU3CG3.webp",gx="/kids-house-game/assets/wc-star-topper-c4tXfpV6.webp",ux="/kids-house-game/assets/wc-stocking-row-Dz0-4wTi.webp",mx="/kids-house-game/assets/wc-stone-hearth-1blXXfiH.webp",yx="/kids-house-game/assets/wc-twinkle-lamp-CYcQjW3A.webp",bx="/kids-house-game/assets/wc-twinkle-string-Olg29poj.webp",kx="/kids-house-game/assets/wc-window-seat-B7CwlRjl.webp",wx="/kids-house-game/assets/wc-woodstove-Cf0xJFnD.webp",vx="/kids-house-game/assets/cc-butter-polka-DGTIwtTO.png",_x="/kids-house-game/assets/cc-butter-polka-CmiHLPHI.svg",$x="/kids-house-game/assets/cc-cream-hex-DMlsmhhY.png",xx="/kids-house-game/assets/cc-cream-hex-Bkf3o84Z.svg",Mx="/kids-house-game/assets/cc-lavender-lattice-D6QyuSPi.png",Lx="/kids-house-game/assets/cc-lavender-lattice-DhxILx5n.svg",Ex="/kids-house-game/assets/cc-lilac-gingham-C8gKChr3.png",Sx="/kids-house-game/assets/cc-lilac-gingham-C-WPjvD8.svg",Cx="/kids-house-game/assets/cc-mint-checks-Bj1xaUgE.png",Px="/kids-house-game/assets/cc-mint-checks-BKmyOLlr.svg",Tx="/kids-house-game/assets/cc-mint-florals-DubHlfkl.png",Rx="/kids-house-game/assets/cc-mint-florals-Dz8qRBHw.svg",Bx="/kids-house-game/assets/cc-peach-scallops-3xV_Pu-6.png",Ax="/kids-house-game/assets/cc-peach-scallops-GPn_mXbS.svg",Ix="/kids-house-game/assets/cc-pink-plaid-C9HKdB4f.png",Dx="/kids-house-game/assets/cc-pink-plaid-VgppBwax.svg",Ox="/kids-house-game/assets/cc-rag-planks-B67vRZlX.png",Hx="/kids-house-game/assets/cc-rag-planks-C5Hombhc.svg",Wx="/kids-house-game/assets/cc-rose-herringbone-Cmke3vGv.png",Ux="/kids-house-game/assets/cc-rose-herringbone-CQRix6_f.svg",Vx="/kids-house-game/assets/lilac-stripes-DcsSoVwO.png",zx="/kids-house-game/assets/lilac-stripes-yb9DhjTf.svg",Qx="/kids-house-game/assets/lilac-terrazzo-DOghNP_d.png",qx="/kids-house-game/assets/lilac-terrazzo-8CaN2qhK.svg",Nx="/kids-house-game/assets/mint-bubbles-DtsYAubK.png",Zx="/kids-house-game/assets/mint-bubbles-BIQM5a2P.svg",Fx="/kids-house-game/assets/pink-check-floor-DjPuYxlq.png",jx="/kids-house-game/assets/pink-check-floor-Cy9k3Fal.svg",Gx="/kids-house-game/assets/pink-hearts-DP4TxPV5.png",Yx="/kids-house-game/assets/pink-hearts-BpVCT-98.svg",Kx="/kids-house-game/assets/cloud-sky-CbZL0zcC.svg",Xx="/kids-house-game/assets/pastel-planks-BAcEss7w.svg",Jx="/kids-house-game/assets/soft-carpet-BSwTSDW1.svg",e7="/kids-house-game/assets/star-sprinkle-5bH7qjW0.svg",t7="/kids-house-game/assets/tiny-hearts-C-RHlg1h.svg",n7="/kids-house-game/assets/butter-check-floor-yLFbEdi4.png",s7="/kids-house-game/assets/butter-check-floor-C8HdmZ0P.svg",o7="/kids-house-game/assets/mint-checks-7rTweT19.png",i7="/kids-house-game/assets/mint-checks-rWbOdhfH.svg",a7="/kids-house-game/assets/sky-clouds-9-shWk3w.png",r7="/kids-house-game/assets/sky-clouds-DUJlygwI.svg",l7="/kids-house-game/assets/sky-tiles-Cu-Ga741.png",c7="/kids-house-game/assets/sky-tiles-xxuodD5m.svg",d7="/kids-house-game/assets/sunny-stars-Bc3CbIvZ.png",f7="/kids-house-game/assets/sunny-stars-C6fsFX70.svg",p7="/kids-house-game/assets/leafy-cream-Cv5o-u-w.png",h7="/kids-house-game/assets/leafy-cream-WIcyLI1T.svg",g7="/kids-house-game/assets/orange-gingham-BjUerG-F.png",u7="/kids-house-game/assets/orange-gingham-CVNizWBt.svg",m7="/kids-house-game/assets/terracotta-tiles-dXqpLLce.png",y7="/kids-house-game/assets/terracotta-tiles-j3yOSRI7.svg",b7="/kids-house-game/assets/wood-panel-BGEVUu4R.png",k7="/kids-house-game/assets/wood-panel-Dob8WRpW.svg",w7="/kids-house-game/assets/wood-planks-vE8-OOXo.png",v7="/kids-house-game/assets/wood-planks-4TUYjAkF.svg",_7="/kids-house-game/assets/wc-cabin-planks-Icu9n6YO.webp",$7="/kids-house-game/assets/wc-candy-stripe-cOBsT1Xj.webp",x7="/kids-house-game/assets/wc-frosty-dots-DmQgGwJW.webp",M7="/kids-house-game/assets/wc-mint-pine-5FYK_dVo.webp",L7="/kids-house-game/assets/wc-peppermint-tiles-ChaNg2gF.webp",E7="/kids-house-game/assets/wc-red-plaid-CcQ3BMhN.webp",S7="/kids-house-game/assets/wc-snow-knit-DEFXSv74.webp",C7="/kids-house-game/assets/wc-snowflake-sky-DrRAdoDP.webp",wp={small:80,medium:150,large:260},P7={"welcome-home":"Welcome Home","sunny-vibes":"Sunny Vibes",glossy:"Glossy",cottage:"Cozy Cottage",...S2,...R2},Ig=e=>P7[e]??e.replace(/[-_]+/g," ").replace(/\b\w/g,t=>t.toUpperCase()),T7=Object.assign({"../assets/items/manifest.json":Ib,"../assets/patterns/manifest.json":Db}),vp=Object.assign({"../assets/items/bedroom/alarm-clock.png":Ob,"../assets/items/bedroom/alarm-clock.svg":Hb,"../assets/items/bedroom/bedtime-snack.png":Wb,"../assets/items/bedroom/bedtime-snack.svg":Ub,"../assets/items/bedroom/book-stack.png":Vb,"../assets/items/bedroom/book-stack.svg":zb,"../assets/items/bedroom/bunk-bed.png":Qb,"../assets/items/bedroom/bunk-bed.svg":qb,"../assets/items/bedroom/bunny-slippers.png":Nb,"../assets/items/bedroom/bunny-slippers.svg":Zb,"../assets/items/bedroom/canopy-bed.png":Fb,"../assets/items/bedroom/canopy-bed.svg":jb,"../assets/items/bedroom/cat-bed.png":Gb,"../assets/items/bedroom/cat-bed.svg":Yb,"../assets/items/bedroom/cloud-rug.png":Kb,"../assets/items/bedroom/cloud-rug.svg":Xb,"../assets/items/bedroom/cloud-shelf.png":Jb,"../assets/items/bedroom/cloud-shelf.svg":ek,"../assets/items/bedroom/cork-board.png":tk,"../assets/items/bedroom/cork-board.svg":nk,"../assets/items/bedroom/daisy-pot.png":sk,"../assets/items/bedroom/daisy-pot.svg":ok,"../assets/items/bedroom/desk.png":ik,"../assets/items/bedroom/desk.svg":ak,"../assets/items/bedroom/dino-plush.png":rk,"../assets/items/bedroom/dino-plush.svg":lk,"../assets/items/bedroom/doll-house.png":ck,"../assets/items/bedroom/doll-house.svg":dk,"../assets/items/bedroom/dresser.png":fk,"../assets/items/bedroom/dresser.svg":pk,"../assets/items/bedroom/egg-chair.png":hk,"../assets/items/bedroom/egg-chair.svg":gk,"../assets/items/bedroom/floor-fan.png":uk,"../assets/items/bedroom/floor-fan.svg":mk,"../assets/items/bedroom/guinea-pig.png":yk,"../assets/items/bedroom/guinea-pig.svg":bk,"../assets/items/bedroom/hamster-cage.png":kk,"../assets/items/bedroom/hamster-cage.svg":wk,"../assets/items/bedroom/heart-rug.png":vk,"../assets/items/bedroom/heart-rug.svg":_k,"../assets/items/bedroom/lava-lamp.png":$k,"../assets/items/bedroom/lava-lamp.svg":xk,"../assets/items/bedroom/moon-night-light.png":Mk,"../assets/items/bedroom/moon-night-light.svg":Lk,"../assets/items/bedroom/nightstand.png":Ek,"../assets/items/bedroom/nightstand.svg":Sk,"../assets/items/bedroom/paper-lantern.png":Ck,"../assets/items/bedroom/paper-lantern.svg":Pk,"../assets/items/bedroom/piggy-bank.png":Tk,"../assets/items/bedroom/piggy-bank.svg":Rk,"../assets/items/bedroom/plant-stand.png":Bk,"../assets/items/bedroom/plant-stand.svg":Ak,"../assets/items/bedroom/play-tent.png":Ik,"../assets/items/bedroom/play-tent.svg":Dk,"../assets/items/bedroom/star-mobile.png":Ok,"../assets/items/bedroom/star-mobile.svg":Hk,"../assets/items/bedroom/toy-chest.png":Wk,"../assets/items/bedroom/toy-chest.svg":Uk,"../assets/items/bedroom/toy-robot.png":Vk,"../assets/items/bedroom/toy-robot.svg":zk,"../assets/items/bedroom/toy-train.png":Qk,"../assets/items/bedroom/toy-train.svg":qk,"../assets/items/bedroom/unicorn-plush.png":Nk,"../assets/items/bedroom/unicorn-plush.svg":Zk,"../assets/items/bedroom/wardrobe.png":Fk,"../assets/items/bedroom/wardrobe.svg":jk,"../assets/items/kitchen/bananas.png":Gk,"../assets/items/kitchen/bananas.svg":Yk,"../assets/items/kitchen/bar-stool.png":Kk,"../assets/items/kitchen/bar-stool.svg":Xk,"../assets/items/kitchen/bread-loaf.png":Jk,"../assets/items/kitchen/bread-loaf.svg":ew,"../assets/items/kitchen/chick.png":tw,"../assets/items/kitchen/chick.svg":nw,"../assets/items/kitchen/china-hutch.png":sw,"../assets/items/kitchen/china-hutch.svg":ow,"../assets/items/kitchen/cocoa-mug.png":iw,"../assets/items/kitchen/cocoa-mug.svg":aw,"../assets/items/kitchen/cookie-jar.png":rw,"../assets/items/kitchen/cookie-jar.svg":lw,"../assets/items/kitchen/cooking-pot.png":cw,"../assets/items/kitchen/cooking-pot.svg":dw,"../assets/items/kitchen/cupcake.png":fw,"../assets/items/kitchen/cupcake.svg":pw,"../assets/items/kitchen/dish-rack.png":hw,"../assets/items/kitchen/dish-rack.svg":gw,"../assets/items/kitchen/fruit-bowl.png":uw,"../assets/items/kitchen/fruit-bowl.svg":mw,"../assets/items/kitchen/frying-pan.png":yw,"../assets/items/kitchen/frying-pan.svg":bw,"../assets/items/kitchen/happy-fridge.png":kw,"../assets/items/kitchen/happy-fridge.svg":ww,"../assets/items/kitchen/herb-box.png":vw,"../assets/items/kitchen/herb-box.svg":_w,"../assets/items/kitchen/high-chair.png":$w,"../assets/items/kitchen/high-chair.svg":xw,"../assets/items/kitchen/ice-cream.png":Mw,"../assets/items/kitchen/ice-cream.svg":Lw,"../assets/items/kitchen/kettle.png":Ew,"../assets/items/kitchen/kettle.svg":Sw,"../assets/items/kitchen/kitchen-counter.png":Cw,"../assets/items/kitchen/kitchen-counter.svg":Pw,"../assets/items/kitchen/kitchen-sink.png":Tw,"../assets/items/kitchen/kitchen-sink.svg":Rw,"../assets/items/kitchen/lemon-tree.png":Bw,"../assets/items/kitchen/lemon-tree.svg":Aw,"../assets/items/kitchen/microwave.png":Iw,"../assets/items/kitchen/microwave.svg":Dw,"../assets/items/kitchen/milk-bottle.png":Ow,"../assets/items/kitchen/milk-bottle.svg":Hw,"../assets/items/kitchen/pancakes.png":Ww,"../assets/items/kitchen/pancakes.svg":Uw,"../assets/items/kitchen/pantry-shelf.png":Vw,"../assets/items/kitchen/pantry-shelf.svg":zw,"../assets/items/kitchen/pendant-lamp.png":Qw,"../assets/items/kitchen/pendant-lamp.svg":qw,"../assets/items/kitchen/pet-bowl.png":Nw,"../assets/items/kitchen/pet-bowl.svg":Zw,"../assets/items/kitchen/rice-cooker.png":Fw,"../assets/items/kitchen/rice-cooker.svg":jw,"../assets/items/kitchen/runner-rug.png":Gw,"../assets/items/kitchen/runner-rug.svg":Yw,"../assets/items/kitchen/spice-rack.png":Kw,"../assets/items/kitchen/spice-rack.svg":Xw,"../assets/items/kitchen/stand-mixer.png":Jw,"../assets/items/kitchen/stand-mixer.svg":e4,"../assets/items/kitchen/teapot.png":t4,"../assets/items/kitchen/teapot.svg":n4,"../assets/items/kitchen/toaster.png":s4,"../assets/items/kitchen/toaster.svg":o4,"../assets/items/kitchen/utensil-rail.png":i4,"../assets/items/kitchen/utensil-rail.svg":a4,"../assets/items/kitchen/watermelon-slice.png":r4,"../assets/items/kitchen/watermelon-slice.svg":l4,"../assets/items/living/aquarium.png":c4,"../assets/items/living/aquarium.svg":d4,"../assets/items/living/arc-floor-lamp.png":f4,"../assets/items/living/arc-floor-lamp.svg":p4,"../assets/items/living/bean-bag.png":h4,"../assets/items/living/bean-bag.svg":g4,"../assets/items/living/bird-cage.png":u4,"../assets/items/living/bird-cage.svg":m4,"../assets/items/living/blanket-basket.png":y4,"../assets/items/living/blanket-basket.svg":b4,"../assets/items/living/building-blocks.png":k4,"../assets/items/living/building-blocks.svg":w4,"../assets/items/living/coffee-table.png":v4,"../assets/items/living/coffee-table.svg":_4,"../assets/items/living/comfy-armchair.png":$4,"../assets/items/living/comfy-armchair.svg":x4,"../assets/items/living/cubby-shelf.png":M4,"../assets/items/living/cubby-shelf.svg":L4,"../assets/items/living/daisy-rug.png":E4,"../assets/items/living/daisy-rug.svg":S4,"../assets/items/living/fiddle-leaf-fig.png":C4,"../assets/items/living/fiddle-leaf-fig.svg":P4,"../assets/items/living/fireplace.png":T4,"../assets/items/living/fireplace.svg":R4,"../assets/items/living/globe.png":B4,"../assets/items/living/globe.svg":A4,"../assets/items/living/hanging-planter.png":I4,"../assets/items/living/hanging-planter.svg":D4,"../assets/items/living/monstera-plant.png":O4,"../assets/items/living/monstera-plant.svg":H4,"../assets/items/living/piano.png":W4,"../assets/items/living/piano.svg":U4,"../assets/items/living/popcorn.png":V4,"../assets/items/living/popcorn.svg":z4,"../assets/items/living/pouf.png":Q4,"../assets/items/living/pouf.svg":q4,"../assets/items/living/rainbow-rug.png":N4,"../assets/items/living/rainbow-rug.svg":Z4,"../assets/items/living/rainbow-wall-art.png":F4,"../assets/items/living/rainbow-wall-art.svg":j4,"../assets/items/living/retro-radio.png":G4,"../assets/items/living/retro-radio.svg":Y4,"../assets/items/living/rocking-chair.png":K4,"../assets/items/living/rocking-chair.svg":X4,"../assets/items/living/rocking-horse.png":J4,"../assets/items/living/rocking-horse.svg":e6,"../assets/items/living/snake-plant.png":t6,"../assets/items/living/snake-plant.svg":n6,"../assets/items/living/string-lights.png":s6,"../assets/items/living/string-lights.svg":o6,"../assets/items/living/succulent-trio.png":i6,"../assets/items/living/succulent-trio.svg":a6,"../assets/items/living/tassel-rug.png":r6,"../assets/items/living/tassel-rug.svg":l6,"../assets/items/living/throw-pillow.png":c6,"../assets/items/living/throw-pillow.svg":d6,"../assets/items/living/toy-car.png":f6,"../assets/items/living/toy-car.svg":p6,"../assets/items/living/tulip-vase.png":h6,"../assets/items/living/tulip-vase.svg":g6,"../assets/items/living/turtle.png":u6,"../assets/items/living/turtle.svg":m6,"../assets/items/living/tv-stand.png":y6,"../assets/items/living/tv-stand.svg":b6,"../assets/items/living/wall-shelf.png":k6,"../assets/items/living/wall-shelf.svg":w6,"../assets/items/packs/cottage/cc-bakery-shelf.png":v6,"../assets/items/packs/cottage/cc-bakery-shelf.svg":_6,"../assets/items/packs/cottage/cc-breakfast-table.png":$6,"../assets/items/packs/cottage/cc-breakfast-table.svg":x6,"../assets/items/packs/cottage/cc-bubble-chair.png":M6,"../assets/items/packs/cottage/cc-bubble-chair.svg":L6,"../assets/items/packs/cottage/cc-canopy-daybed.png":E6,"../assets/items/packs/cottage/cc-canopy-daybed.svg":S6,"../assets/items/packs/cottage/cc-cloud-beanbag.png":C6,"../assets/items/packs/cottage/cc-cloud-beanbag.svg":P6,"../assets/items/packs/cottage/cc-cloud-lamp.png":T6,"../assets/items/packs/cottage/cc-cloud-lamp.svg":R6,"../assets/items/packs/cottage/cc-cottage-aquarium.png":B6,"../assets/items/packs/cottage/cc-cottage-aquarium.svg":A6,"../assets/items/packs/cottage/cc-cupcake-stand.png":I6,"../assets/items/packs/cottage/cc-cupcake-stand.svg":D6,"../assets/items/packs/cottage/cc-dryer-chair.png":O6,"../assets/items/packs/cottage/cc-dryer-chair.svg":H6,"../assets/items/packs/cottage/cc-fairy-garland.png":W6,"../assets/items/packs/cottage/cc-fairy-garland.svg":U6,"../assets/items/packs/cottage/cc-fairy-shelf.png":V6,"../assets/items/packs/cottage/cc-fairy-shelf.svg":z6,"../assets/items/packs/cottage/cc-flower-kettle.png":Q6,"../assets/items/packs/cottage/cc-flower-kettle.svg":q6,"../assets/items/packs/cottage/cc-flower-lamp.png":N6,"../assets/items/packs/cottage/cc-flower-lamp.svg":Z6,"../assets/items/packs/cottage/cc-heart-bed.png":F6,"../assets/items/packs/cottage/cc-heart-bed.svg":j6,"../assets/items/packs/cottage/cc-heart-clock.png":G6,"../assets/items/packs/cottage/cc-heart-clock.svg":Y6,"../assets/items/packs/cottage/cc-heart-pouf.png":K6,"../assets/items/packs/cottage/cc-heart-pouf.svg":X6,"../assets/items/packs/cottage/cc-heart-rug.png":J6,"../assets/items/packs/cottage/cc-heart-rug.svg":ev,"../assets/items/packs/cottage/cc-jewel-box.png":tv,"../assets/items/packs/cottage/cc-jewel-box.svg":nv,"../assets/items/packs/cottage/cc-light-vanity.png":sv,"../assets/items/packs/cottage/cc-light-vanity.svg":ov,"../assets/items/packs/cottage/cc-macaron-jar.png":iv,"../assets/items/packs/cottage/cc-macaron-jar.svg":av,"../assets/items/packs/cottage/cc-macrame-swing.png":rv,"../assets/items/packs/cottage/cc-macrame-swing.svg":lv,"../assets/items/packs/cottage/cc-mani-chair.png":cv,"../assets/items/packs/cottage/cc-mani-chair.svg":dv,"../assets/items/packs/cottage/cc-mint-fridge.png":fv,"../assets/items/packs/cottage/cc-mint-fridge.svg":pv,"../assets/items/packs/cottage/cc-mushroom-stool.png":hv,"../assets/items/packs/cottage/cc-mushroom-stool.svg":gv,"../assets/items/packs/cottage/cc-pastel-range.png":uv,"../assets/items/packs/cottage/cc-pastel-range.svg":mv,"../assets/items/packs/cottage/cc-perfume-tray.png":yv,"../assets/items/packs/cottage/cc-perfume-tray.svg":bv,"../assets/items/packs/cottage/cc-petal-table.png":kv,"../assets/items/packs/cottage/cc-petal-table.svg":wv,"../assets/items/packs/cottage/cc-plant-wall.png":vv,"../assets/items/packs/cottage/cc-plant-wall.svg":_v,"../assets/items/packs/cottage/cc-reading-nook.png":$v,"../assets/items/packs/cottage/cc-reading-nook.svg":xv,"../assets/items/packs/cottage/cc-record-player.png":Mv,"../assets/items/packs/cottage/cc-record-player.svg":Lv,"../assets/items/packs/cottage/cc-ribbon-mirror.png":Ev,"../assets/items/packs/cottage/cc-ribbon-mirror.svg":Sv,"../assets/items/packs/cottage/cc-scallop-curtains.png":Cv,"../assets/items/packs/cottage/cc-scallop-curtains.svg":Pv,"../assets/items/packs/cottage/cc-scallop-loveseat.png":Tv,"../assets/items/packs/cottage/cc-scallop-loveseat.svg":Rv,"../assets/items/packs/cottage/cc-star-dresser.png":Bv,"../assets/items/packs/cottage/cc-star-dresser.svg":Av,"../assets/items/packs/cottage/cc-teapot-set.png":Iv,"../assets/items/packs/cottage/cc-teapot-set.svg":Dv,"../assets/items/packs/cottage/cc-window-seat.png":Ov,"../assets/items/packs/cottage/cc-window-seat.svg":Hv,"../assets/items/packs/glossy/arched-shelf.png":Wv,"../assets/items/packs/glossy/arched-shelf.svg":Uv,"../assets/items/packs/glossy/blob-rug.png":Vv,"../assets/items/packs/glossy/blob-rug.svg":zv,"../assets/items/packs/glossy/bubbly-plant.png":Qv,"../assets/items/packs/glossy/bubbly-plant.svg":qv,"../assets/items/packs/glossy/bud-vase.png":Nv,"../assets/items/packs/glossy/bud-vase.svg":Zv,"../assets/items/packs/glossy/comb-brush.png":Fv,"../assets/items/packs/glossy/comb-brush.svg":jv,"../assets/items/packs/glossy/cream-jars.png":Gv,"../assets/items/packs/glossy/cream-jars.svg":Yv,"../assets/items/packs/glossy/drop-lamp.png":Kv,"../assets/items/packs/glossy/drop-lamp.svg":Xv,"../assets/items/packs/glossy/droplet-buddy.png":Jv,"../assets/items/packs/glossy/droplet-buddy.svg":e_,"../assets/items/packs/glossy/fancy-sofa.png":t_,"../assets/items/packs/glossy/fancy-sofa.svg":n_,"../assets/items/packs/glossy/flower-cart.png":s_,"../assets/items/packs/glossy/flower-cart.svg":o_,"../assets/items/packs/glossy/foot-spa.png":i_,"../assets/items/packs/glossy/foot-spa.svg":a_,"../assets/items/packs/glossy/globe-pendants.png":r_,"../assets/items/packs/glossy/globe-pendants.svg":l_,"../assets/items/packs/glossy/glow-mirror.png":c_,"../assets/items/packs/glossy/glow-mirror.svg":d_,"../assets/items/packs/glossy/gold-floor-mirror.png":f_,"../assets/items/packs/glossy/gold-floor-mirror.svg":p_,"../assets/items/packs/glossy/hair-dryer.png":h_,"../assets/items/packs/glossy/hair-dryer.svg":g_,"../assets/items/packs/glossy/heart-plant.png":u_,"../assets/items/packs/glossy/heart-plant.svg":m_,"../assets/items/packs/glossy/heart-pouf.png":y_,"../assets/items/packs/glossy/heart-pouf.svg":b_,"../assets/items/packs/glossy/lilac-curtain.png":k_,"../assets/items/packs/glossy/lilac-curtain.svg":w_,"../assets/items/packs/glossy/lotion-trio.png":v_,"../assets/items/packs/glossy/lotion-trio.svg":__,"../assets/items/packs/glossy/mani-lamp.png":$_,"../assets/items/packs/glossy/mani-lamp.svg":x_,"../assets/items/packs/glossy/nail-table.png":M_,"../assets/items/packs/glossy/nail-table.svg":L_,"../assets/items/packs/glossy/pebble-rug.png":E_,"../assets/items/packs/glossy/pebble-rug.svg":S_,"../assets/items/packs/glossy/perfume-bottle.png":C_,"../assets/items/packs/glossy/perfume-bottle.svg":P_,"../assets/items/packs/glossy/pink-fountain.png":T_,"../assets/items/packs/glossy/pink-fountain.svg":R_,"../assets/items/packs/glossy/pink-vanity.png":B_,"../assets/items/packs/glossy/pink-vanity.svg":A_,"../assets/items/packs/glossy/polish-bottle.png":I_,"../assets/items/packs/glossy/polish-bottle.svg":D_,"../assets/items/packs/glossy/polish-rack.png":O_,"../assets/items/packs/glossy/polish-rack.svg":H_,"../assets/items/packs/glossy/reception-desk.png":W_,"../assets/items/packs/glossy/reception-desk.svg":U_,"../assets/items/packs/glossy/salon-chair.png":V_,"../assets/items/packs/glossy/salon-chair.svg":z_,"../assets/items/packs/glossy/scent-candle.png":Q_,"../assets/items/packs/glossy/scent-candle.svg":q_,"../assets/items/packs/glossy/spray-bottle.png":N_,"../assets/items/packs/glossy/spray-bottle.svg":Z_,"../assets/items/packs/glossy/star-wall-sign.png":F_,"../assets/items/packs/glossy/star-wall-sign.svg":j_,"../assets/items/packs/glossy/swivel-stool.png":G_,"../assets/items/packs/glossy/swivel-stool.svg":Y_,"../assets/items/packs/glossy/tiered-tray.png":K_,"../assets/items/packs/glossy/tiered-tray.svg":X_,"../assets/items/packs/glossy/towel-cart.png":J_,"../assets/items/packs/glossy/towel-cart.svg":e8,"../assets/items/packs/glossy/towel-stack.png":t8,"../assets/items/packs/glossy/towel-stack.svg":n8,"../assets/items/packs/glossy/vine-planter.png":s8,"../assets/items/packs/glossy/vine-planter.svg":o8,"../assets/items/packs/glossy/waiting-bench.png":i8,"../assets/items/packs/glossy/waiting-bench.svg":a8,"../assets/items/packs/glossy/wash-chair.png":r8,"../assets/items/packs/glossy/wash-chair.svg":l8,"../assets/items/packs/halloween/hw-candy-bowl.webp":c8,"../assets/items/packs/halloween/hw-cat-statue.webp":d8,"../assets/items/packs/halloween/hw-cauldron.webp":f8,"../assets/items/packs/halloween/hw-ghost-sheet.webp":p8,"../assets/items/packs/halloween/hw-hay-bale.webp":h8,"../assets/items/packs/halloween/hw-heart-pumpkin.webp":g8,"../assets/items/packs/halloween/hw-leaf-garland.webp":u8,"../assets/items/packs/halloween/hw-moon-cling.webp":m8,"../assets/items/packs/halloween/hw-moon-lantern.webp":y8,"../assets/items/packs/halloween/hw-star-pumpkin.webp":b8,"../assets/items/packs/halloween/hw-witch-hat.webp":k8,"../assets/items/packs/sunny-vibes/arched-mirror.png":w8,"../assets/items/packs/sunny-vibes/arched-mirror.svg":v8,"../assets/items/packs/sunny-vibes/big-monitor.png":_8,"../assets/items/packs/sunny-vibes/big-monitor.svg":$8,"../assets/items/packs/sunny-vibes/boba-cup.png":x8,"../assets/items/packs/sunny-vibes/boba-cup.svg":M8,"../assets/items/packs/sunny-vibes/bubble-bath.png":L8,"../assets/items/packs/sunny-vibes/bubble-bath.svg":E8,"../assets/items/packs/sunny-vibes/cactus-buddy.png":S8,"../assets/items/packs/sunny-vibes/cactus-buddy.svg":C8,"../assets/items/packs/sunny-vibes/caterpillar-plush.png":P8,"../assets/items/packs/sunny-vibes/caterpillar-plush.svg":T8,"../assets/items/packs/sunny-vibes/checker-bed.png":R8,"../assets/items/packs/sunny-vibes/checker-bed.svg":B8,"../assets/items/packs/sunny-vibes/checker-rug.png":A8,"../assets/items/packs/sunny-vibes/checker-rug.svg":I8,"../assets/items/packs/sunny-vibes/clothes-rail.png":D8,"../assets/items/packs/sunny-vibes/clothes-rail.svg":O8,"../assets/items/packs/sunny-vibes/cloud-sofa.png":H8,"../assets/items/packs/sunny-vibes/cloud-sofa.svg":W8,"../assets/items/packs/sunny-vibes/cube-shelf.png":U8,"../assets/items/packs/sunny-vibes/cube-shelf.svg":V8,"../assets/items/packs/sunny-vibes/curvy-desk.png":z8,"../assets/items/packs/sunny-vibes/curvy-desk.svg":Q8,"../assets/items/packs/sunny-vibes/cute-speaker.png":q8,"../assets/items/packs/sunny-vibes/cute-speaker.svg":N8,"../assets/items/packs/sunny-vibes/desk-lamp.png":Z8,"../assets/items/packs/sunny-vibes/desk-lamp.svg":F8,"../assets/items/packs/sunny-vibes/desk-mic.png":j8,"../assets/items/packs/sunny-vibes/desk-mic.svg":G8,"../assets/items/packs/sunny-vibes/flower-lamp.png":Y8,"../assets/items/packs/sunny-vibes/flower-lamp.svg":K8,"../assets/items/packs/sunny-vibes/frog-plush.png":X8,"../assets/items/packs/sunny-vibes/frog-plush.svg":J8,"../assets/items/packs/sunny-vibes/game-controller.png":e$,"../assets/items/packs/sunny-vibes/game-controller.svg":t$,"../assets/items/packs/sunny-vibes/gaming-chair.png":n$,"../assets/items/packs/sunny-vibes/gaming-chair.svg":s$,"../assets/items/packs/sunny-vibes/hamster-pet.png":o$,"../assets/items/packs/sunny-vibes/hamster-pet.svg":i$,"../assets/items/packs/sunny-vibes/headphones.png":a$,"../assets/items/packs/sunny-vibes/headphones.svg":r$,"../assets/items/packs/sunny-vibes/heart-light.png":l$,"../assets/items/packs/sunny-vibes/heart-light.svg":c$,"../assets/items/packs/sunny-vibes/keyboard.png":d$,"../assets/items/packs/sunny-vibes/keyboard.svg":f$,"../assets/items/packs/sunny-vibes/mini-fridge.png":p$,"../assets/items/packs/sunny-vibes/mini-fridge.svg":h$,"../assets/items/packs/sunny-vibes/pastel-wardrobe.png":g$,"../assets/items/packs/sunny-vibes/pastel-wardrobe.svg":u$,"../assets/items/packs/sunny-vibes/phone-stand.png":m$,"../assets/items/packs/sunny-vibes/phone-stand.svg":y$,"../assets/items/packs/sunny-vibes/pothos-plant.png":b$,"../assets/items/packs/sunny-vibes/pothos-plant.svg":k$,"../assets/items/packs/sunny-vibes/puffy-stool.png":w$,"../assets/items/packs/sunny-vibes/puffy-stool.svg":v$,"../assets/items/packs/sunny-vibes/ring-light.png":_$,"../assets/items/packs/sunny-vibes/ring-light.svg":$$,"../assets/items/packs/sunny-vibes/side-table-round.png":x$,"../assets/items/packs/sunny-vibes/side-table-round.svg":M$,"../assets/items/packs/sunny-vibes/star-lamp.png":L$,"../assets/items/packs/sunny-vibes/star-lamp.svg":E$,"../assets/items/packs/sunny-vibes/sticker-board.png":S$,"../assets/items/packs/sunny-vibes/sticker-board.svg":C$,"../assets/items/packs/sunny-vibes/sunny-art.png":P$,"../assets/items/packs/sunny-vibes/sunny-art.svg":T$,"../assets/items/packs/sunny-vibes/sv-bean-bag.png":R$,"../assets/items/packs/sunny-vibes/sv-bean-bag.svg":B$,"../assets/items/packs/sunny-vibes/sv-cloud-rug.png":A$,"../assets/items/packs/sunny-vibes/sv-cloud-rug.svg":I$,"../assets/items/packs/sunny-vibes/sv-wall-shelf.png":D$,"../assets/items/packs/sunny-vibes/sv-wall-shelf.svg":O$,"../assets/items/packs/sunny-vibes/vlog-camera.png":H$,"../assets/items/packs/sunny-vibes/vlog-camera.svg":W$,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.png":U$,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.svg":V$,"../assets/items/packs/welcome-home/acorn-friend.png":z$,"../assets/items/packs/welcome-home/acorn-friend.svg":Q$,"../assets/items/packs/welcome-home/apple-tree.png":q$,"../assets/items/packs/welcome-home/apple-tree.svg":N$,"../assets/items/packs/welcome-home/big-wardrobe.png":Z$,"../assets/items/packs/welcome-home/big-wardrobe.svg":F$,"../assets/items/packs/welcome-home/box-stack.png":j$,"../assets/items/packs/welcome-home/box-stack.svg":G$,"../assets/items/packs/welcome-home/brick-fireplace.png":Y$,"../assets/items/packs/welcome-home/brick-fireplace.svg":K$,"../assets/items/packs/welcome-home/bulletin-board.png":X$,"../assets/items/packs/welcome-home/bulletin-board.svg":J$,"../assets/items/packs/welcome-home/cozy-mug.png":e3,"../assets/items/packs/welcome-home/cozy-mug.svg":t3,"../assets/items/packs/welcome-home/cream-sofa.png":n3,"../assets/items/packs/welcome-home/cream-sofa.svg":s3,"../assets/items/packs/welcome-home/fire-pit.png":o3,"../assets/items/packs/welcome-home/fire-pit.svg":i3,"../assets/items/packs/welcome-home/glass-cabinet.png":a3,"../assets/items/packs/welcome-home/glass-cabinet.svg":r3,"../assets/items/packs/welcome-home/hanging-lantern.png":l3,"../assets/items/packs/welcome-home/hanging-lantern.svg":c3,"../assets/items/packs/welcome-home/knit-cushion.png":d3,"../assets/items/packs/welcome-home/knit-cushion.svg":f3,"../assets/items/packs/welcome-home/ladder-shelf.png":p3,"../assets/items/packs/welcome-home/ladder-shelf.svg":h3,"../assets/items/packs/welcome-home/landscape-art.png":g3,"../assets/items/packs/welcome-home/landscape-art.svg":u3,"../assets/items/packs/welcome-home/lattice-bench.png":m3,"../assets/items/packs/welcome-home/lattice-bench.svg":y3,"../assets/items/packs/welcome-home/leaf-wreath.png":b3,"../assets/items/packs/welcome-home/leaf-wreath.svg":k3,"../assets/items/packs/welcome-home/mini-greenhouse.png":w3,"../assets/items/packs/welcome-home/mini-greenhouse.svg":v3,"../assets/items/packs/welcome-home/moving-box.png":_3,"../assets/items/packs/welcome-home/moving-box.svg":$3,"../assets/items/packs/welcome-home/picnic-basket.png":x3,"../assets/items/packs/welcome-home/picnic-basket.svg":M3,"../assets/items/packs/welcome-home/round-rug.png":L3,"../assets/items/packs/welcome-home/round-rug.svg":E3,"../assets/items/packs/welcome-home/sale-sign.png":S3,"../assets/items/packs/welcome-home/sale-sign.svg":C3,"../assets/items/packs/welcome-home/sprout-pot.png":P3,"../assets/items/packs/welcome-home/sprout-pot.svg":T3,"../assets/items/packs/welcome-home/stripe-runner.png":R3,"../assets/items/packs/welcome-home/stripe-runner.svg":B3,"../assets/items/packs/welcome-home/trailing-plant.png":A3,"../assets/items/packs/welcome-home/trailing-plant.svg":I3,"../assets/items/packs/welcome-home/wall-clock.png":D3,"../assets/items/packs/welcome-home/wall-clock.svg":O3,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.png":H3,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.svg":W3,"../assets/items/packs/welcome-home/wh-book-stack.png":U3,"../assets/items/packs/welcome-home/wh-book-stack.svg":V3,"../assets/items/packs/welcome-home/wh-dresser.png":z3,"../assets/items/packs/welcome-home/wh-dresser.svg":Q3,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.png":q3,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.svg":N3,"../assets/items/packs/welcome-home/wh-kitchen-counter.png":Z3,"../assets/items/packs/welcome-home/wh-kitchen-counter.svg":F3,"../assets/items/packs/welcome-home/wh-nightstand.png":j3,"../assets/items/packs/welcome-home/wh-nightstand.svg":G3,"../assets/items/packs/welcome-home/wh-pendant-lamp.png":Y3,"../assets/items/packs/welcome-home/wh-pendant-lamp.svg":K3,"../assets/items/packs/welcome-home/wh-snake-plant.png":X3,"../assets/items/packs/welcome-home/wh-snake-plant.svg":J3,"../assets/items/packs/welcome-home/wh-string-lights.png":e5,"../assets/items/packs/welcome-home/wh-string-lights.svg":t5,"../assets/items/packs/welcome-home/wh-teapot.png":n5,"../assets/items/packs/welcome-home/wh-teapot.svg":s5,"../assets/items/packs/welcome-home/wood-armchair.png":o5,"../assets/items/packs/welcome-home/wood-armchair.svg":i5,"../assets/items/packs/welcome-home/wood-bookshelf.png":a5,"../assets/items/packs/welcome-home/wood-bookshelf.svg":r5,"../assets/items/packs/welcome-home/wood-coffee-table.png":l5,"../assets/items/packs/welcome-home/wood-coffee-table.svg":c5,"../assets/items/packs/welcome-home/wood-desk.png":d5,"../assets/items/packs/welcome-home/wood-desk.svg":f5,"../assets/items/packs/welcome-home/wood-stool.png":p5,"../assets/items/packs/welcome-home/wood-stool.svg":h5,"../assets/items/packs/welcome-home/wooden-bed.png":g5,"../assets/items/packs/welcome-home/wooden-bed.svg":u5,"../assets/items/packs/winter/wc-bauble-garland.webp":m5,"../assets/items/packs/winter/wc-berry-wreath.webp":y5,"../assets/items/packs/winter/wc-birch-basket.webp":b5,"../assets/items/packs/winter/wc-cabin-picture.webp":k5,"../assets/items/packs/winter/wc-candle-trio.webp":w5,"../assets/items/packs/winter/wc-cane-lamp.webp":v5,"../assets/items/packs/winter/wc-cinnamon-tray.webp":_5,"../assets/items/packs/winter/wc-cocoa-cart.webp":$5,"../assets/items/packs/winter/wc-cocoa-mug.webp":x5,"../assets/items/packs/winter/wc-cocoa-pot.webp":M5,"../assets/items/packs/winter/wc-cookie-oven.webp":L5,"../assets/items/packs/winter/wc-cookie-plate.webp":E5,"../assets/items/packs/winter/wc-frost-bookcase.webp":S5,"../assets/items/packs/winter/wc-frosted-pine.webp":C5,"../assets/items/packs/winter/wc-fur-bench.webp":P5,"../assets/items/packs/winter/wc-gingerbread-village.webp":T5,"../assets/items/packs/winter/wc-gingerbread.webp":R5,"../assets/items/packs/winter/wc-globe-lamp.webp":B5,"../assets/items/packs/winter/wc-holiday-tree.webp":A5,"../assets/items/packs/winter/wc-holly.webp":I5,"../assets/items/packs/winter/wc-ice-skates.webp":D5,"../assets/items/packs/winter/wc-ice-wardrobe.webp":O5,"../assets/items/packs/winter/wc-knit-armchair.webp":H5,"../assets/items/packs/winter/wc-lantern.webp":W5,"../assets/items/packs/winter/wc-log-bench.webp":U5,"../assets/items/packs/winter/wc-marshmallow-jar.webp":V5,"../assets/items/packs/winter/wc-mitten-line.webp":z5,"../assets/items/packs/winter/wc-mitten-ottoman.webp":Q5,"../assets/items/packs/winter/wc-mug-shelf.webp":q5,"../assets/items/packs/winter/wc-nutcracker.webp":N5,"../assets/items/packs/winter/wc-penguin-chair.webp":Z5,"../assets/items/packs/winter/wc-penguin-plush.webp":F5,"../assets/items/packs/winter/wc-peppermint-counter.webp":j5,"../assets/items/packs/winter/wc-peppermint-rug.webp":G5,"../assets/items/packs/winter/wc-pinecone-garland.webp":Y5,"../assets/items/packs/winter/wc-pinecone-table.webp":K5,"../assets/items/packs/winter/wc-plaid-bed.webp":X5,"../assets/items/packs/winter/wc-plaid-sofa.webp":J5,"../assets/items/packs/winter/wc-poinsettia.webp":ex,"../assets/items/packs/winter/wc-polar-plush.webp":tx,"../assets/items/packs/winter/wc-pom-rug.webp":nx,"../assets/items/packs/winter/wc-present-stack.webp":sx,"../assets/items/packs/winter/wc-reindeer.webp":ox,"../assets/items/packs/winter/wc-sled-table.webp":ix,"../assets/items/packs/winter/wc-sleigh-planter.webp":ax,"../assets/items/packs/winter/wc-snow-globe.webp":rx,"../assets/items/packs/winter/wc-snow-mobile.webp":lx,"../assets/items/packs/winter/wc-snow-nightstand.webp":cx,"../assets/items/packs/winter/wc-snow-window.webp":dx,"../assets/items/packs/winter/wc-snowman.webp":fx,"../assets/items/packs/winter/wc-snowshoes.webp":px,"../assets/items/packs/winter/wc-sock-hamper.webp":hx,"../assets/items/packs/winter/wc-star-topper.webp":gx,"../assets/items/packs/winter/wc-stocking-row.webp":ux,"../assets/items/packs/winter/wc-stone-hearth.webp":mx,"../assets/items/packs/winter/wc-twinkle-lamp.webp":yx,"../assets/items/packs/winter/wc-twinkle-string.webp":bx,"../assets/items/packs/winter/wc-window-seat.webp":kx,"../assets/items/packs/winter/wc-woodstove.webp":wx}),_p=Object.assign({"../assets/patterns/cottage/cc-butter-polka.png":vx,"../assets/patterns/cottage/cc-butter-polka.svg":_x,"../assets/patterns/cottage/cc-cream-hex.png":$x,"../assets/patterns/cottage/cc-cream-hex.svg":xx,"../assets/patterns/cottage/cc-lavender-lattice.png":Mx,"../assets/patterns/cottage/cc-lavender-lattice.svg":Lx,"../assets/patterns/cottage/cc-lilac-gingham.png":Ex,"../assets/patterns/cottage/cc-lilac-gingham.svg":Sx,"../assets/patterns/cottage/cc-mint-checks.png":Cx,"../assets/patterns/cottage/cc-mint-checks.svg":Px,"../assets/patterns/cottage/cc-mint-florals.png":Tx,"../assets/patterns/cottage/cc-mint-florals.svg":Rx,"../assets/patterns/cottage/cc-peach-scallops.png":Bx,"../assets/patterns/cottage/cc-peach-scallops.svg":Ax,"../assets/patterns/cottage/cc-pink-plaid.png":Ix,"../assets/patterns/cottage/cc-pink-plaid.svg":Dx,"../assets/patterns/cottage/cc-rag-planks.png":Ox,"../assets/patterns/cottage/cc-rag-planks.svg":Hx,"../assets/patterns/cottage/cc-rose-herringbone.png":Wx,"../assets/patterns/cottage/cc-rose-herringbone.svg":Ux,"../assets/patterns/glossy/lilac-stripes.png":Vx,"../assets/patterns/glossy/lilac-stripes.svg":zx,"../assets/patterns/glossy/lilac-terrazzo.png":Qx,"../assets/patterns/glossy/lilac-terrazzo.svg":qx,"../assets/patterns/glossy/mint-bubbles.png":Nx,"../assets/patterns/glossy/mint-bubbles.svg":Zx,"../assets/patterns/glossy/pink-check-floor.png":Fx,"../assets/patterns/glossy/pink-check-floor.svg":jx,"../assets/patterns/glossy/pink-hearts.png":Gx,"../assets/patterns/glossy/pink-hearts.svg":Yx,"../assets/patterns/nursery/cloud-sky.svg":Kx,"../assets/patterns/nursery/pastel-planks.svg":Xx,"../assets/patterns/nursery/soft-carpet.svg":Jx,"../assets/patterns/nursery/star-sprinkle.svg":e7,"../assets/patterns/nursery/tiny-hearts.svg":t7,"../assets/patterns/sunny-vibes/butter-check-floor.png":n7,"../assets/patterns/sunny-vibes/butter-check-floor.svg":s7,"../assets/patterns/sunny-vibes/mint-checks.png":o7,"../assets/patterns/sunny-vibes/mint-checks.svg":i7,"../assets/patterns/sunny-vibes/sky-clouds.png":a7,"../assets/patterns/sunny-vibes/sky-clouds.svg":r7,"../assets/patterns/sunny-vibes/sky-tiles.png":l7,"../assets/patterns/sunny-vibes/sky-tiles.svg":c7,"../assets/patterns/sunny-vibes/sunny-stars.png":d7,"../assets/patterns/sunny-vibes/sunny-stars.svg":f7,"../assets/patterns/welcome-home/leafy-cream.png":p7,"../assets/patterns/welcome-home/leafy-cream.svg":h7,"../assets/patterns/welcome-home/orange-gingham.png":g7,"../assets/patterns/welcome-home/orange-gingham.svg":u7,"../assets/patterns/welcome-home/terracotta-tiles.png":m7,"../assets/patterns/welcome-home/terracotta-tiles.svg":y7,"../assets/patterns/welcome-home/wood-panel.png":b7,"../assets/patterns/welcome-home/wood-panel.svg":k7,"../assets/patterns/welcome-home/wood-planks.png":w7,"../assets/patterns/welcome-home/wood-planks.svg":v7,"../assets/patterns/winter/wc-cabin-planks.webp":_7,"../assets/patterns/winter/wc-candy-stripe.webp":$7,"../assets/patterns/winter/wc-frosty-dots.webp":x7,"../assets/patterns/winter/wc-mint-pine.webp":M7,"../assets/patterns/winter/wc-peppermint-tiles.webp":L7,"../assets/patterns/winter/wc-red-plaid.webp":E7,"../assets/patterns/winter/wc-snow-knit.webp":S7,"../assets/patterns/winter/wc-snowflake-sky.webp":C7});function R7(e,t){if(!e||!e.trim())return[];try{const n=JSON.parse(e);return(Array.isArray(n)?n:[...Array.isArray(n?.items)?n.items:[],...Array.isArray(n?.patterns)?n.patterns:[]]).filter(o=>o&&typeof o.slug=="string"&&o.slug.trim())}catch(n){return console.warn(`[packs] ${t} is not valid JSON; ignoring`,n),[]}}const Dg=Object.entries(T7).flatMap(([e,t])=>R7(t,e)),B7=["svg","png","webp","SVG","PNG","WEBP"];function Og(e,t,n,s){for(const i of B7){const a=e[`../assets/${t}/${n}/${s}.${i}`];if(a)return a}const o=Object.keys(e).find(i=>i.split("/").pop().replace(/\.\w+$/,"")===s);return o?e[o]:void 0}const $p={furniture:"furniture",appliance:"furniture",appliances:"furniture",seating:"furniture",storage:"furniture",bed:"furniture",table:"furniture",decor:"decor",rug:"decor",rugs:"decor",lighting:"decor",light:"decor",lamp:"decor",toy:"decor",toys:"decor","wall-art":"decor",art:"decor",beauty:"decor",plant:"plants",plants:"plants",flower:"plants",flowers:"plants",food:"food",drink:"food",drinks:"food",snack:"food",pet:"pets",pets:"pets",animal:"pets",animals:"pets"};function A7(e){const t=typeof e=="string"?e.trim().toLowerCase():"";return $p[t]??$p[t.replace(/s$/,"")]??"decor"}const Lo=(e,t)=>typeof e=="string"&&e.trim()?e.trim().toLowerCase():t,Hg=e=>["wallpaper","floor"].includes(Lo(e.type,"")),xp=new Set,I7=Dg.filter(e=>!Hg(e)).flatMap(e=>{const t=Lo(e.room,"any"),n=e.slug.trim();if(xp.has(n))return[];xp.add(n);const o=[e.svg,e.png].filter(g=>typeof g=="string").map(g=>vp["../assets/items/"+g.replace(/^\.?\//,"")]).find(Boolean)??Og(vp,"items",t,n);if(!o)return console.warn(`[packs] no image for items/${t}/${n}`),[];const i=Lo(e.pack,""),a=Lo(e.size,"medium"),r=A7(e.category),l=typeof e.gameW=="number"&&e.gameW>20&&e.gameW<800?e.gameW:wp[a]??wp.medium,c=typeof e.widthUnits=="number"&&typeof e.heightUnits=="number"&&e.widthUnits>0&&e.heightUnits>0?e.heightUnits/e.widthUnits:1,d=Math.round(l*Math.min(4,Math.max(.2,c))),f=typeof e.holdable=="boolean"?e.holdable:a!=="large"&&r!=="furniture",p=e.tag==="lighting"||/lamp|light|lantern|candle/i.test(n);return[{kind:`pack:${n}`,name:e.name||n,cat:r,rooms:[t],w:l,h:d,wall:e.wall===!0||void 0,svg:"",img:o,pack:i||void 0,holdable:f,light:p||void 0}]}),Tc=Dg.filter(Hg).flatMap(e=>{const t=Lo(e.pack,"extra"),n=e.slug.trim(),o=[e.svg,e.png].filter(i=>typeof i=="string").map(i=>_p["../assets/patterns/"+i.replace(/^\.?\//,"")]).find(Boolean)??Og(_p,"patterns",t,n);return o?[{id:`${t}/${n}`,name:e.name||n,pack:t,kind:Lo(e.type,"wallpaper"),url:o}]:(console.warn(`[packs] no image for patterns/${t}/${n}`),[])}),Mp=Object.fromEntries(Tc.map(e=>[e.id,e])),Ln="#5a3d5c",D=`stroke="${Ln}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Wg=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="2.4" fill="${Ln}"/><circle cx="${t}" cy="${n}" r="2.4" fill="${Ln}"/><circle cx="${e+.8}" cy="${n-.8}" r=".8" fill="#fff"/><circle cx="${t+.8}" cy="${n-.8}" r=".8" fill="#fff"/>`,Ug=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/><ellipse cx="${t}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/>`,ot='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>';function Hl(e,t,n){return`${ot}<ellipse cx="50" cy="78" rx="28" ry="16" fill="${t}" ${D}/><path d="M24 62 Q50 48 76 62 V78 Q50 92 24 78 Z" fill="${t}" ${D}/>
    <circle cx="50" cy="40" r="18" fill="${e}" ${D}/>${Wg(43,57,40)}${Ug(38,62,48)}<path d="M46 50 q4 3 8 0" fill="none" ${D}/>
    <path d="M38 26 Q50 16 62 26" fill="${n}" ${D}/><circle cx="50" cy="24" r="3" fill="${n}" ${D}/>`}const Vg=[{kind:"crib",name:"Crib",cat:"furniture",w:260,svg:`${ot}<rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${D}/><path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${D}/><rect x="6" y="22" width="88" height="12" rx="6" fill="#9ad7f5" ${D}/><rect x="14" y="48" width="72" height="16" rx="6" fill="#ffe0ec"/><ellipse cx="32" cy="56" rx="8" ry="5" fill="#fff" ${D}/><ellipse cx="50" cy="56" rx="8" ry="5" fill="#c9e7ff" ${D}/>`},{kind:"bassinet",name:"Bassinet",cat:"furniture",w:170,svg:`${ot}<path d="M18 78 Q8 78 10 64 L22 36 H78 L90 64 Q92 78 82 78 Z" fill="#fff" ${D}/><ellipse cx="50" cy="36" rx="32" ry="10" fill="#fff" ${D}/><path d="M22 40 Q50 52 78 40" fill="#ffe0ec" ${D}/><ellipse cx="50" cy="44" rx="16" ry="7" fill="#fff"/><path d="M30 78 L22 94 M70 78 L78 94" ${D}/><ellipse cx="50" cy="90" rx="28" ry="4" fill="none" ${D}/><path d="M14 22 Q50 4 86 22" fill="none" stroke="#9ad7f5" stroke-width="6" stroke-linecap="round"/>`},{kind:"rocker",name:"Rocker",cat:"furniture",w:190,svg:`${ot}<path d="M16 88 Q50 98 84 88" fill="none" ${D}/><path d="M28 84 Q50 74 72 84" fill="#c9a0dc" ${D}/><rect x="30" y="28" width="40" height="36" rx="12" fill="#e4ccf2" ${D}/><path d="M22 48 Q18 70 30 80 H70 Q82 70 78 48 Z" fill="#f6e6ff" ${D}/><rect x="36" y="58" width="28" height="12" rx="6" fill="#ffc8dd" ${D}/><circle cx="50" cy="40" r="6" fill="#fff" opacity=".7"/>`},{kind:"changing-table",name:"Changing Table",cat:"furniture",w:230,svg:`${ot}<rect x="8" y="36" width="84" height="16" rx="8" fill="#fff" ${D}/><rect x="14" y="40" width="72" height="8" rx="4" fill="#ffd6e8"/><rect x="16" y="52" width="28" height="32" rx="6" fill="#bde0fe" ${D}/><rect x="56" y="52" width="28" height="32" rx="6" fill="#c9f0d8" ${D}/><path d="M22 60 H38 M22 68 H38 M62 60 H78 M62 68 H78" ${D}/><rect x="18" y="84" width="8" height="10" rx="2" fill="${Ln}"/><rect x="74" y="84" width="8" height="10" rx="2" fill="${Ln}"/><rect x="34" y="22" width="18" height="12" rx="3" fill="#ffe0ec" ${D}/><rect x="54" y="24" width="16" height="10" rx="3" fill="#fff6d8" ${D}/>`},{kind:"toy-bin",name:"Toy Bin",cat:"furniture",w:150,svg:`${ot}<path d="M14 40 H86 L78 90 H22 Z" fill="#ffd166" ${D}/><rect x="10" y="32" width="80" height="14" rx="7" fill="#ffe08a" ${D}/><circle cx="36" cy="58" r="8" fill="#ff8fab" ${D}/><rect x="50" y="50" width="16" height="16" rx="3" fill="#8ecae6" ${D}/><circle cx="62" cy="70" r="6" fill="#90e0a8" ${D}/>`},{kind:"baby-shelf",name:"Bookshelf",cat:"furniture",w:150,svg:`${ot}<rect x="14" y="8" width="72" height="84" rx="8" fill="#f3d2b5" ${D}/><path d="M14 36 H86 M14 64 H86" ${D}/><rect x="22" y="14" width="8" height="18" rx="2" fill="#ff8fab" ${D}/><rect x="32" y="18" width="8" height="14" rx="2" fill="#8ecae6" ${D}/><rect x="44" y="14" width="8" height="18" rx="2" fill="#ffd166" ${D}/><rect x="58" y="16" width="8" height="16" rx="2" fill="#90e0a8" ${D}/><circle cx="34" cy="50" r="7" fill="#ffadad" ${D}/><rect x="50" y="44" width="18" height="14" rx="3" fill="#c9a0dc" ${D}/><ellipse cx="40" cy="78" rx="14" ry="8" fill="#fff" ${D}/>`},{kind:"doll-rose",name:"Rose Doll",cat:"decor",w:80,svg:Hl("#f6d3b0","#ffc2d4","#ff8fab")},{kind:"doll-honey",name:"Honey Doll",cat:"decor",w:80,svg:Hl("#e0ac69","#cdeffd","#ffd166")},{kind:"doll-cocoa",name:"Cocoa Doll",cat:"decor",w:80,svg:Hl("#8d5524","#d8f3dc","#c9a0dc")},{kind:"crib-mobile",name:"Crib Mobile",cat:"decor",w:150,wall:!0,svg:`<path d="M50 6 V22" ${D}/><ellipse cx="50" cy="28" rx="28" ry="8" fill="#fff" ${D}/><path d="M28 32 V48 M50 36 V58 M72 32 V48" ${D}/><circle cx="28" cy="56" r="8" fill="#ffd166" ${D}/><circle cx="50" cy="68" r="9" fill="#ff8fab" ${D}/><path d="M72 56 l6 4 -6 4 -6 -4 z" fill="#8ecae6" ${D}/><circle cx="28" cy="54" r="2" fill="#fff"/><circle cx="50" cy="66" r="2" fill="#fff"/>`},{kind:"night-light",name:"Night Light",cat:"decor",w:70,svg:`${ot}<circle cx="50" cy="46" r="22" fill="#fff6c8" ${D}/><circle cx="50" cy="46" r="12" fill="#ffe08a"/><path d="M50 18 V10 M30 26 L24 20 M70 26 L76 20 M24 46 H14 M86 46 H76" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><rect x="40" y="70" width="20" height="16" rx="4" fill="#c9a0dc" ${D}/><circle cx="50" cy="78" r="3" fill="#ff8fab"/>`},{kind:"bunny-plush",name:"Bunny Plush",cat:"decor",w:90,svg:`${ot}<ellipse cx="34" cy="28" rx="8" ry="18" fill="#fff" ${D}/><ellipse cx="66" cy="28" rx="8" ry="18" fill="#fff" ${D}/><ellipse cx="34" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="66" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="50" cy="74" rx="26" ry="18" fill="#fff" ${D}/><circle cx="50" cy="50" r="20" fill="#fff" ${D}/>${Wg(43,57,50)}<path d="M47 58 l3 3 3 -3" fill="none" ${D}/>${Ug(38,62,58)}`},{kind:"stacking-rings",name:"Stacking Rings",cat:"decor",w:70,svg:`${ot}<ellipse cx="50" cy="86" rx="26" ry="7" fill="#ff8fab" ${D}/><ellipse cx="50" cy="74" rx="20" ry="6" fill="#ffd166" ${D}/><ellipse cx="50" cy="64" rx="15" ry="5" fill="#8ecae6" ${D}/><ellipse cx="50" cy="56" rx="10" ry="4" fill="#90e0a8" ${D}/><rect x="46" y="28" width="8" height="40" rx="4" fill="#c9a0dc" ${D}/><circle cx="50" cy="24" r="7" fill="#ffb3c6" ${D}/>`},{kind:"rattle",name:"Rattle",cat:"decor",w:60,svg:`${ot}<circle cx="38" cy="40" r="20" fill="#ffd166" ${D}/><circle cx="32" cy="34" r="5" fill="#fff" opacity=".7"/><rect x="50" y="52" width="10" height="28" rx="5" fill="#ff8fab" ${D} transform="rotate(-20 55 66)"/><circle cx="68" cy="82" r="8" fill="#8ecae6" ${D}/>`},{kind:"baby-bottle",name:"Baby Bottle",cat:"food",w:55,svg:`${ot}<rect x="36" y="8" width="28" height="12" rx="4" fill="#c9a0dc" ${D}/><rect x="42" y="18" width="16" height="8" fill="#fff" ${D}/><path d="M30 30 H70 L66 88 Q50 96 34 88 Z" fill="#e7f6ff" ${D}/><path d="M32 48 H68 L66 80 Q50 88 34 80 Z" fill="#fff" opacity=".85"/><rect x="34" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="46" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="58" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/>`},{kind:"blocks",name:"Baby Blocks",cat:"decor",w:90,svg:`${ot}<rect x="14" y="58" width="28" height="28" rx="4" fill="#ff8fab" ${D}/><rect x="40" y="46" width="28" height="28" rx="4" fill="#ffd166" ${D}/><rect x="28" y="28" width="26" height="26" rx="4" fill="#8ecae6" ${D}/><path d="M20 72 H36 M48 60 H62 M34 42 H48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"rocking-horse",name:"Little Rocking Horse",cat:"decor",w:180,svg:`${ot}<path d="M12 86 Q50 98 88 82" fill="none" ${D}/><ellipse cx="48" cy="62" rx="26" ry="14" fill="#e6b88a" ${D}/><path d="M62 58 L84 40 Q92 36 90 48 L74 64 Z" fill="#f0d0b0" ${D}/><circle cx="82" cy="42" r="3" fill="${Ln}"/><path d="M70 36 L76 24 L84 34" fill="#ff8fab" ${D}/><rect x="36" y="48" width="16" height="8" rx="3" fill="#c9a0dc" ${D}/><path d="M30 70 L22 84 M58 72 L66 86" ${D}/>`},{kind:"music-box",name:"Music Box",cat:"decor",w:80,svg:`${ot}<rect x="22" y="40" width="56" height="46" rx="8" fill="#f6d6ff" ${D}/><path d="M22 40 L50 22 L78 40" fill="#e4ccf2" ${D}/><circle cx="50" cy="64" r="10" fill="#fff" ${D}/><path d="M50 58 V70 M44 64 H56" ${D}/><circle cx="50" cy="30" r="4" fill="#ffd166" ${D}/>`},{kind:"cloud-rug",name:"Nursery Cloud Rug",cat:"decor",w:340,svg:`<ellipse cx="50" cy="78" rx="46" ry="16" fill="#e7f6ff" ${D}/><circle cx="28" cy="70" r="16" fill="#f4fbff" ${D}/><circle cx="50" cy="62" r="18" fill="#fff" ${D}/><circle cx="72" cy="70" r="16" fill="#f4fbff" ${D}/><ellipse cx="50" cy="78" rx="30" ry="8" fill="#d6f0ff"/>`},{kind:"play-mat",name:"Play Mat",cat:"decor",w:300,svg:`<rect x="6" y="62" width="88" height="30" rx="14" fill="#ffe0ec" ${D}/><path d="M50 70 C42 62 30 64 34 74 C38 82 50 88 50 88 C50 88 62 82 66 74 C70 64 58 62 50 70 Z" fill="#ff8fab" ${D}/><circle cx="22" cy="76" r="5" fill="#ffd166" ${D}/><circle cx="78" cy="76" r="5" fill="#8ecae6" ${D}/>`},{kind:"moon-art",name:"Moon and Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M58 18 A28 28 0 1 0 58 78 A18 18 0 1 1 58 18 Z" fill="#fff3b0" ${D}/><path d="M22 30 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1 z" fill="#ffd166" ${D}/><path d="M78 58 l2 5 5 1 -4 4 1 5 -4 -3 -4 3 1 -5 -4 -4 5 -1 z" fill="#c9e7ff" ${D}/>`},{kind:"nursery-dresser",name:"Nursery Dresser",cat:"furniture",w:170,svg:`${ot}<rect x="14" y="22" width="72" height="68" rx="8" fill="#f6e2c4" ${D}/><path d="M14 44 H86 M14 66 H86" ${D}/><circle cx="50" cy="34" r="3" fill="${Ln}"/><circle cx="50" cy="55" r="3" fill="${Ln}"/><circle cx="50" cy="76" r="3" fill="${Ln}"/><rect x="30" y="10" width="18" height="12" rx="3" fill="#ffc2d4" ${D}/><rect x="52" y="12" width="16" height="10" rx="3" fill="#c9e7ff" ${D}/>`},{kind:"nursery-lamp",name:"Nursery Lamp",cat:"decor",w:80,svg:`${ot}<path d="M28 42 L36 12 H64 L72 42 Z" fill="#fff6c8" ${D}/><rect x="46" y="42" width="8" height="40" rx="4" fill="#c9a0dc" ${D}/><ellipse cx="50" cy="88" rx="20" ry="6" fill="#b388d6" ${D}/><circle cx="46" cy="24" r="3" fill="#fff" opacity=".85"/><path d="M34 20 q6 -8 4 -2" fill="none" stroke="#ffd166" stroke-width="2"/>`},{kind:"nursery-curtains",name:"Curtains",cat:"decor",w:180,wall:!0,svg:`<rect x="16" y="10" width="68" height="50" rx="6" fill="#cfefff" ${D}/><path d="M50 10 V60 M16 34 H84" ${D}/><path d="M8 8 Q18 28 10 92" fill="#ffd6e8" ${D}/><path d="M92 8 Q82 28 90 92" fill="#ffd6e8" ${D}/><rect x="6" y="6" width="88" height="8" rx="3" fill="#f3d2b5" ${D}/>`}],rt="#5a3d5c",$=(e=3.5)=>`stroke="${rt}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function $e(e,t,n){const s=Math.round(t*.62);return`<ellipse cx="${e}" cy="${n}" rx="${t}" ry="3.4" fill="${rt}" opacity=".08"/><ellipse cx="${e}" cy="${(n+1.2).toFixed(1)}" rx="${s}" ry="1.55" fill="${rt}" opacity=".12"/>`}function ie(e,t=2.2){return`<path d="${e}" fill="none" stroke="#fff" stroke-width="${t}" stroke-linecap="round" opacity=".75"/>`}function ct(e,t=1.15){return`<path d="${e}" fill="none" stroke="${rt}" stroke-width="${t}" stroke-linecap="round" opacity=".2"/>`}function Vd(e,t,n=".7"){return`<radialGradient id="${e}" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="${t}" stop-opacity="${n}"/><stop offset="1" stop-color="${t}" stop-opacity="0"/></radialGradient>`}function zd(e,t,n){return`<linearGradient id="${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t}"/><stop offset="1" stop-color="${n}"/></linearGradient>`}function D7(){return typeof location>"u"?!1:/(?:^|[?&])yard=1(?:&|$)/.test(location.search)}function Rc(){return typeof location>"u"?"":new URLSearchParams(location.search).get("shot")||""}const O7={v:1,hair:"pigtails",hairC:"#a0522d",skin:"#f6d2b5",eyes:"big",eyeC:"#5a321c",freckles:!0,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"skirt",bottomC:"#c9a0dc",dress:"sundress",dressC:"#ff8fab",shoes:"maryjanes",shoesC:"#ffd166",acc:["bow"],accC:"#ff7aa8"},H7=()=>Ti(O7),Bc=864,Ac={x:1084,y:578,flip:!0},ss={x:1184,y:255},Lp={x:1146,y:578},Ic={x:940,y:540,flip:!0},gr=1160,zg={x:824,y:398,w:96,h:230},Qg={x:996,y:372,w:82,h:196},W7=[{kind:"yard-swing",x:1266,y:580,scale:132/280},{kind:"lemonade-cart",x:1254,y:471},{kind:"sandbox",x:940,y:482},{kind:"picnic-blanket",x:939,y:420}];function xe(e){return{kind:e.kind,name:e.name,cat:e.cat,w:e.w,h:e.h,vb:e.vb,wall:e.wall,holdable:e.holdable??!1,rooms:["backyard"],svg:e.svg}}const U7=xe({kind:"yard-swing",name:"A-Frame Swing",cat:"furniture",w:280,h:215,vb:"0 0 130 100",svg:`${$e(65,54,96)}
    <path d="M34 18 L50 18 L20 94 H4 Z" fill="#f3d2aa" ${$()}/>
    <path d="M42 24 L50 18 L18 70 H28 Z" fill="#d4a373"/>
    <path d="M80 18 L96 18 L126 94 H110 Z" fill="#e7c49a" ${$()}/>
    <path d="M108 22 L96 18 L126 94 H118 Z" fill="#c99366"/>
    ${ct("M16 50 l8 28 M112 48 l8 30")}
    <rect x="22" y="6" width="86" height="14" rx="2" fill="#f6e0c4" ${$()}/>
    <rect x="86" y="9" width="18" height="8" rx="1" fill="#d4a373"/>
    <rect x="28" y="16" width="74" height="4" fill="#e7c49a"/>
    ${ie("M28 10 h30")}
    <g class="swingSeat">
      <rect x="48" y="74" width="34" height="7" rx="1" fill="#f3d2aa" ${$(2.2)}/>
      <rect x="72" y="76" width="8" height="4" fill="#d4a373"/>
      <path d="M54 20 V78 M76 20 V78" fill="none" ${$(2.2)}/>
      ${ie("M52 76 h14")}
    </g>`}),V7=xe({kind:"sandbox",name:"Sandbox",cat:"furniture",w:120,h:54,vb:"0 0 160 72",svg:`${$e(80,64,68)}
    <path d="M108 38 L146 26 L146 52 L108 64 Z" fill="#e7c49a" ${$()}/>
    <path d="M126 36 L142 28 L142 48 L126 56 Z" fill="#c99366"/>
    <path d="M12 40 H108 V64 H12 Z" fill="#f3d2aa" ${$()}/>
    <path d="M12 40 L36 18 L146 18 L108 40 Z" fill="#f6e0c4" ${$()}/>
    <path d="M112 20 L142 20 L108 38 L90 38 Z" fill="#d4a373"/>
    <path d="M34 36 L52 24 L122 24 L100 36 Z" fill="#ffe08a" ${$(2.2)}/>
    <path d="M98 26 L118 26 L100 34 L86 34 Z" fill="#f0c36a"/>
    ${ct("M48 30 q8 2 6 5 M68 28 q10 2 8 6 M58 34 h16")}
    <path d="M76 30 L100 36 L94 48 L70 42 Z" fill="#d7e6f2" ${$(2.2)}/>
    <path d="M88 34 L98 38 L94 44 L84 40 Z" fill="#b7c9d6"/>
    <path d="M52 8 L64 4 L90 34 L78 38 Z" fill="#f0d2b0" ${$()}/>
    <path d="M64 8 L72 6 L90 32 L82 34 Z" fill="#d4a373"/>
    <path d="M46 2 H66 V9 H46 Z" fill="#c99366" ${$(2)}/>
    ${ie("M18 44 h26")}
    ${ie("M44 22 h22")}`}),z7=xe({kind:"little-slide",name:"Little Slide",cat:"furniture",w:150,h:188,vb:"0 0 110 140",svg:`${$e(56,44,134)}
    <path d="M50 34 H72 C94 36 102 56 98 82 L92 122 H70 L76 84 C78 60 72 46 52 44 Z" fill="#ffb3c6" ${$()}/>
    <path d="M72 38 C94 42 104 62 100 86 L94 122 H86 L92 86 C94 64 86 48 72 46 Z" fill="#e45d88"/>
    <rect x="14" y="34" width="8" height="96" rx="2" fill="#f3d2aa" ${$()}/>
    <rect x="36" y="34" width="8" height="96" rx="2" fill="#e7c49a" ${$()}/>
    <rect x="40" y="40" width="3" height="84" fill="#c99366"/>
    <rect x="14" y="52" width="30" height="5" rx="1" fill="#f6e0c4" ${$(2.2)}/>
    <rect x="14" y="70" width="30" height="5" rx="1" fill="#f6e0c4" ${$(2.2)}/>
    <rect x="14" y="88" width="30" height="5" rx="1" fill="#f6e0c4" ${$(2.2)}/>
    <rect x="14" y="106" width="30" height="5" rx="1" fill="#f6e0c4" ${$(2.2)}/>
    <rect x="6" y="18" width="56" height="22" rx="3" fill="#f3d2aa" ${$()}/>
    <rect x="6" y="34" width="56" height="6" fill="#d4a373"/>
    <path d="M48 20 H62 V40 H48 Z" fill="#c99366"/>
    ${ie("M12 24 h22")}
    <rect x="12" y="6" width="5" height="16" rx="1" fill="#f0d2b0" ${$(2.2)}/>
    <rect x="40" y="6" width="5" height="16" rx="1" fill="#e7c49a" ${$(2.2)}/>
    <path d="M14 8 H43" fill="none" ${$(2.2)}/>
    <rect x="80" y="116" width="7" height="16" rx="1" fill="#f3d2aa" ${$(2)}/>
    ${ie("M58 42 C74 48 86 66 86 88")}
    ${ct("M80 64 q4 16 2 28")}`}),Q7=xe({kind:"yard-bench",name:"Garden Bench",cat:"furniture",w:140,h:100,vb:"0 0 140 100",svg:`${$e(70,58,96)}
    <rect x="10" y="8" width="12" height="86" rx="2" fill="#f3d2aa" ${$()}/>
    <rect x="118" y="8" width="12" height="86" rx="2" fill="#e7c49a" ${$()}/>
    <rect x="124" y="12" width="5" height="76" fill="#c99366"/>
    <rect x="28" y="52" width="10" height="42" rx="2" fill="#f0d2b0" ${$()}/>
    <rect x="102" y="52" width="10" height="42" rx="2" fill="#d4a373" ${$()}/>
    <rect x="108" y="56" width="3" height="32" fill="#c99366"/>
    <rect x="18" y="10" width="104" height="8" rx="1" fill="#f6e0c4" ${$(2.2)}/>
    <rect x="18" y="20" width="104" height="8" rx="1" fill="#f3d2aa" ${$(2.2)}/>
    <rect x="18" y="30" width="104" height="8" rx="1" fill="#f3d2aa" ${$(2.2)}/>
    <rect x="18" y="40" width="104" height="8" rx="1" fill="#e7c49a" ${$(2.2)}/>
    <rect x="18" y="48" width="104" height="7" rx="1" fill="#f6e0c4" ${$(2.2)}/>
    <rect x="18" y="57" width="104" height="7" rx="1" fill="#f3d2aa" ${$(2.2)}/>
    <rect x="18" y="66" width="104" height="7" rx="1" fill="#e7c49a" ${$(2.2)}/>
    <rect x="108" y="12" width="10" height="5" fill="#d4a373"/>
    <rect x="108" y="22" width="10" height="5" fill="#c99366"/>
    <rect x="108" y="50" width="10" height="4" fill="#d4a373"/>
    <rect x="108" y="68" width="10" height="4" fill="#c99366"/>
    <path d="M10 46 H40 V56 H10 Z" fill="#f6e0c4" ${$()}/>
    <path d="M100 46 H130 V56 H100 Z" fill="#e7c49a" ${$()}/>
    <path d="M116 48 H128 V54 H116 Z" fill="#c99366"/>
    ${ie("M22 13 h28")}
    ${ie("M14 48 h16")}
    ${ct("M36 24 h48 M36 34 h44 M34 52 h52 M34 62 h46")}`}),q7=xe({kind:"lemonade-cart",name:"Lemonade Cart",cat:"furniture",w:108,h:121,vb:"0 0 100 112",svg:`${$e(50,40,106)}
    <circle cx="30" cy="96" r="11" fill="${rt}" ${$(2.2)}/><circle cx="30" cy="96" r="4.5" fill="#ffd166"/>
    <circle cx="72" cy="96" r="11" fill="${rt}" ${$(2.2)}/><circle cx="72" cy="96" r="4.5" fill="#ffd166"/>
    <rect x="18" y="92" width="66" height="5" rx="2" fill="#c99366" ${$(2)}/>
    <rect x="16" y="46" width="68" height="46" rx="3" fill="#fff6ea" ${$()}/>
    <rect x="66" y="50" width="14" height="38" fill="#f0d2a4"/>
    ${ct("M28 56 v28 M42 56 v28 M56 56 v28")}
    ${ie("M20 52 v16")}
    <rect x="12" y="38" width="76" height="12" rx="2" fill="#ffe08a" ${$()}/>
    <rect x="66" y="40" width="18" height="8" fill="#f0c45c"/>
    <path d="M14 40 L22 14 H80 L88 40 Z" fill="#ff8fab" ${$()}/>
    <path d="M34 16 L38 40 H50 L46 15 Z" fill="#fff4f7"/>
    <path d="M58 15 L62 40 H74 L70 15 Z" fill="#fff4f7"/>
    <path d="M72 16 H80 L88 40 H76 Z" fill="#e45d88"/>
    ${ie("M26 20 h18")}
    <path d="M28 52 H44 L42 72 H30 Z" fill="#fff" ${$(2)}/>
    <path d="M30 58 H42 L41 72 H31 Z" fill="#ffe566"/>
    <path d="M28 54 L22 58 L28 62 Z" fill="#fff" ${$(2)}/>
    <path d="M44 56 Q52 60 44 70" fill="none" ${$(2)}/>
    <path d="M56 60 H68 L66 72 H58 Z" fill="#fff" ${$(2)}/>
    <path d="M58 64 H66 L65 72 H59 Z" fill="#ffe566"/>
    <circle cx="78" cy="64" r="7" fill="#ffe566" ${$(2)}/>
    <path d="M78 58 v12 M72 64 h12" fill="none" stroke="#e0a83a" stroke-width="1.3"/>`}),N7=xe({kind:"sun-lounger",name:"Sun Lounger",cat:"furniture",w:168,h:86,vb:"0 0 170 90",svg:`${$e(86,68,84)}
    <path d="M16 66 H28 L32 82 H12 Z" fill="#f3d2aa" ${$()}/>
    <path d="M126 64 H140 L146 82 H120 Z" fill="#d4a373" ${$()}/>
    <path d="M136 68 H142 L146 80 H138 Z" fill="#c99366"/>
    <path d="M12 52 H156 V64 H12 Z" fill="#f3d2aa" ${$()}/>
    <path d="M122 54 H154 V62 H122 Z" fill="#d4a373"/>
    <path d="M28 34 H36 L42 52 H32 Z" fill="#e7c49a" ${$()}/>
    <path d="M50 44 H150 L154 58 H54 Z" fill="#ffd4e2" ${$()}/>
    <path d="M128 48 H150 L154 58 H132 Z" fill="#e888a8"/>
    <path d="M18 6 L60 48 L48 58 L8 16 Z" fill="#ffb3c6" ${$()}/>
    <path d="M38 34 L54 48 L48 56 L30 42 Z" fill="#e45d88"/>
    <ellipse cx="22" cy="14" rx="11" ry="7" fill="#fff" ${$(2.2)}/>
    <path d="M22 8 H30 A7 7 0 0 1 30 20 H22 Z" fill="#ffd0e0"/>
    ${ie("M22 12 L50 40")}
    ${ct("M26 22 L52 46")}`}),Z7=xe({kind:"splash-pool",name:"Splash Pool",cat:"furniture",w:176,h:96,vb:"0 0 170 96",svg:`<defs>${zd("ydpoolW","#f3fbff","#7ec8e3")}</defs>
    ${$e(85,72,90)}
    <ellipse cx="85" cy="58" rx="74" ry="28" fill="#8ecae6" ${$()}/>
    <path d="M22 52 Q40 34 78 40" fill="none" stroke="#ff8fab" stroke-width="16" stroke-linecap="round"/>
    <path d="M100 36 Q138 38 152 58" fill="none" stroke="#ffd166" stroke-width="14" stroke-linecap="round"/>
    <path d="M18 66 C22 82 50 90 85 90 C120 90 152 82 154 66 C148 78 120 84 85 84 C50 84 24 78 18 66 Z" fill="#5aa9c6"/>
    <ellipse cx="85" cy="54" rx="48" ry="16" fill="url(#ydpoolW)" ${$(2.2)}/>
    ${ie("M36 50 q20 -10 36 0")}
    <circle cx="128" cy="48" r="4" fill="#fff" ${$(1.6)}/>
    <circle cx="128" cy="48" r="1.6" fill="#8ecae6"/>
    <path d="M70 46 q3 -8 1 0 M96 42 q4 -9 1 1" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`}),F7=xe({kind:"picket-gate",name:"Picket Gate",cat:"furniture",w:110,h:150,vb:"0 0 100 136",svg:`${$e(50,38,130)}
    <rect x="6" y="16" width="12" height="110" rx="2" fill="#f7fff8" ${$()}/>
    <rect x="82" y="16" width="12" height="110" rx="2" fill="#e7f6ea" ${$()}/>
    <rect x="88" y="20" width="5" height="100" fill="#c5e0c8"/>
    <rect x="4" y="40" width="16" height="6" rx="1" fill="#c99366" ${$(2)}/>
    <rect x="4" y="96" width="16" height="6" rx="1" fill="#c99366" ${$(2)}/>
    <rect x="16" y="38" width="68" height="8" rx="2" fill="#fff" ${$(2.2)}/>
    <rect x="16" y="86" width="68" height="8" rx="2" fill="#fff" ${$(2.2)}/>
    <path d="M20 90 L28 98 L80 46 L72 38 Z" fill="#f7fff8" ${$(2.2)}/>
    <path d="M26 30 L32 14 L38 30 V112 H26 Z" fill="#fff" ${$(2.2)}/>
    <path d="M44 30 L50 14 L56 30 V112 H44 Z" fill="#f7fff8" ${$(2.2)}/>
    <path d="M62 30 L68 14 L74 30 V112 H62 Z" fill="#e7f6ea" ${$(2.2)}/>
    <path d="M68 22 L74 16 L74 108 H68 Z" fill="#c5e0c8"/>
    ${ie("M28 36 v20")}
    <rect x="74" y="60" width="16" height="5" rx="1" fill="#c99366" ${$(2)}/>
    <circle cx="86" cy="62" r="2.6" fill="#ffd166" ${$(1.8)}/>`});function j7(){let e="";for(let t=0;t<6;t++)for(let n=0;n<13;n++)(t+n)%2===0&&(e+=`<rect x="${n*15-6}" y="${t*10}" width="15" height="10" fill="#ff8fab"/>`);return e}const G7=xe({kind:"picnic-blanket",name:"Picnic Blanket",cat:"decor",w:110,h:36,vb:"0 0 180 59",svg:`<defs><clipPath id="ydging"><path d="M22 20 L156 12 L174 44 L36 52 Z"/></clipPath></defs>
    ${$e(96,74,54)}
    <path d="M22 20 L156 12 L174 44 L36 52 Z" fill="#fff0f5" ${$()}/>
    <g clip-path="url(#ydging)">${j7()}</g>
    <path d="M148 14 L170 42 L160 46 L138 18 Z" fill="#e45d88"/>
    <path d="M96 30 L128 26 L134 42 L100 46 Z" fill="#f3d2aa" ${$(2)}/>
    <path d="M120 28 L128 26 L134 42 L126 43 Z" fill="#c99366"/>
    <path d="M104 30 Q114 14 126 28" fill="none" ${$(2.2)}/>
    ${ct("M104 34 h22 M104 38 h24",1)}
    ${ie("M34 26 l28 -3")}`});function Ko(e,t,n,s){return`<path d="M${e-1.5} ${t+16} H${e+1.5} V${t+40} H${e-1.5} Z" fill="#3d9a68"/>
    <path d="M${e} ${t+24} C${e-16} ${t+18} ${e-14} ${t+36} ${e-1} ${t+34}" fill="#74c69d" ${$(1.6)}/>
    <path d="M${e} ${t+22} C${e+16} ${t+16} ${e+12} ${t+36} ${e+1} ${t+32}" fill="#52b788"/>
    <path d="M${e} ${t+18} C${e-10} ${t+8} ${e-8} ${t} ${e} ${t+6} C${e+8} ${t} ${e+10} ${t+8} ${e} ${t+18} Z" fill="${n}" ${$(1.8)}/>
    <path d="M${e+1} ${t+6} C${e+7} ${t+4} ${e+8} ${t+13} ${e+1} ${t+15} Z" fill="${s}"/>`}const Y7=xe({kind:"tulip-bed",name:"Tulip Bed",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`${$e(70,56,86)}
    <path d="M10 56 H130 L120 82 H20 Z" fill="#f0d2b0" ${$()}/>
    <path d="M96 58 H126 L118 78 H92 Z" fill="#d4a373"/>
    <path d="M16 56 Q70 42 124 56 Q70 64 16 56 Z" fill="#c4a484" ${$(2.2)}/>
    ${ie("M22 60 h24")}
    ${Ko(32,16,"#ff8fab","#e45d88")}
    ${Ko(54,8,"#ffd166","#e0a83a")}
    ${Ko(76,4,"#ff7096","#e04578")}
    ${Ko(98,12,"#fff","#ffd0e0")}
    ${Ko(118,18,"#c9a0dc","#b388d6")}`}),K7=xe({kind:"birdbath",name:"Birdbath",cat:"decor",w:84,h:126,vb:"0 0 80 120",svg:`<defs>${zd("ydbathW","#f3fbff","#8ecae6")}</defs>
    ${$e(40,28,114)}
    <ellipse cx="40" cy="106" rx="20" ry="7" fill="#e7eef2" ${$()}/>
    <path d="M30 46 H50 C56 70 58 86 52 104 H28 C22 86 24 70 30 46 Z" fill="#f4f7f8" ${$()}/>
    <path d="M42 52 H50 C54 72 54 88 50 100 H44 Z" fill="#c5d0d6"/>
    ${ie("M33 62 v22")}
    <ellipse cx="40" cy="40" rx="32" ry="13" fill="#f7fafb" ${$()}/>
    <path d="M40 28 C66 28 72 38 72 42 C72 52 58 54 40 54 C60 54 68 48 68 42 C68 36 58 32 40 34 Z" fill="#d5dee4"/>
    <ellipse cx="40" cy="38" rx="22" ry="7" fill="url(#ydbathW)" ${$(2.2)}/>
    ${ie("M22 36 q10 -4 18 0")}
    <path d="M48 30 L40 24 L42 34 Z" fill="#f0c45c" ${$(1.6)}/>
    <ellipse cx="56" cy="28" rx="11" ry="6" fill="#ffd166" ${$(1.8)}/>
    <circle cx="66" cy="24" r="4.5" fill="#ffe08a" ${$(1.6)}/>
    <path d="M70 24 L77 26 L70 28 Z" fill="#e07a3f"/>
    <circle cx="67" cy="23" r="1" fill="${rt}"/>
    <path d="M54 32 V40 M60 32 V40" fill="none" stroke="#c99366" stroke-width="1.4" stroke-linecap="round"/>`}),X7=xe({kind:"lily-pond",name:"Lily Pond",cat:"decor",w:170,h:90,vb:"0 0 170 90",svg:`<defs>${zd("ydpondW","#eaf6ff","#5aa9e6")}</defs>
    ${$e(85,70,84)}
    <ellipse cx="85" cy="54" rx="74" ry="28" fill="#c4a484" ${$()}/>
    <path d="M85 30 C142 32 158 48 158 56 C158 72 126 82 85 82 C124 80 150 68 150 56 C150 44 126 36 85 36 Z" fill="#a88462"/>
    <ellipse cx="85" cy="52" rx="62" ry="20" fill="url(#ydpondW)" ${$(2.2)}/>
    ${ie("M40 46 q24 -8 42 2")}
    <path fill="#95d5b2" ${$(2)} fill-rule="evenodd" d="M58 54 m-16 0 a16 7 0 1 0 32 0 a16 7 0 1 0 -32 0 M58 50 L72 54 L58 58 Z"/>
    <path d="M66 50 L74 54 L66 56 Z" fill="#3d9a68"/>
    <path fill="#74c69d" ${$(2)} fill-rule="evenodd" d="M112 48 m-18 0 a18 8 0 1 0 36 0 a18 8 0 1 0 -36 0 M112 42 L128 48 L112 54 Z"/>
    <path d="M40 58 q-4 -16 2 -22 q6 8 2 16" fill="#52b788" ${$(1.6)}/>
    <path d="M108 40 l2 -8 l4 6 l4 -7 l2 8 l-4 3 z" fill="#ff8fab" ${$(1.6)}/>
    <path d="M112 36 l3 -6 l2 5 l3 -5 l1 6 z" fill="#fff" ${$(1.4)}/>
    <circle cx="112" cy="40" r="2.4" fill="#ffd166"/>`});function Xo(e,t,n,s,o=10){return`<path d="M${e} ${t-o-8} V${t-o}" fill="none" ${$(2.2)}/>
    <rect x="${e-4}" y="${t-o-2}" width="8" height="5" rx="1" fill="#c99366" ${$(1.8)}/>
    <circle cx="${e}" cy="${t}" r="${o}" fill="${n}" ${$()}/>
    <path d="M${e+1} ${t-o+3} H${e+o-1} V${t+o-3} H${e+2} Z" fill="${s}"/>
    ${ie(`M${e-o+3} ${t-2} q2 -3 4 0`)}`}const J7=xe({kind:"patio-lights",name:"Patio Lights",cat:"decor",w:190,h:70,vb:"0 0 180 70",wall:!0,svg:`<path d="M8 12 Q50 32 90 12 Q130 32 172 14" fill="none" ${$()}/>
    ${Xo(28,40,"#fff6c8","#f0c45c")}
    ${Xo(64,46,"#ffc2d4","#e45d88")}
    ${Xo(100,36,"#fff1c2","#f0c45c")}
    ${Xo(136,46,"#c9f1ff","#7eb4dc")}
    ${Xo(164,34,"#ffd0e8","#e888a8",8)}`}),eM=xe({kind:"toadstool-light",name:"Toadstool Light",cat:"decor",w:70,h:84,vb:"0 0 80 96",svg:`<defs>${Vd("ydtoadG","#ffe7a0",".9")}</defs>
    ${$e(40,26,90)}
    <ellipse cx="40" cy="70" rx="18" ry="8" fill="url(#ydtoadG)"/>
    <path d="M32 58 H48 L52 84 H28 Z" fill="#fff7f8" ${$()}/>
    <path d="M42 60 H48 L50 82 H43 Z" fill="#f0d8cc"/>
    <path d="M6 58 Q40 8 74 58 Q40 74 6 58 Z" fill="#ff8fab" ${$()}/>
    <path d="M44 22 Q66 16 72 54 Q52 66 44 52 Z" fill="#e45d88"/>
    ${ie("M18 48 q16 -12 26 -2")}
    <circle cx="26" cy="48" r="5" fill="#fff" ${$(2)}/>
    <circle cx="44" cy="40" r="6" fill="#fff" ${$(2)}/>
    <circle cx="36" cy="56" r="3.5" fill="#fff" ${$(2)}/>
    <path d="M22 52 h6 M40 46 h8" fill="none" stroke="#ffd0e0" stroke-width="1.2" stroke-linecap="round"/>`}),tM=xe({kind:"stepping-stones",name:"Stepping Stones",cat:"decor",w:160,h:64,vb:"0 0 160 70",svg:`${$e(80,66,64)}
    <path d="M8 40 L24 28 L50 32 L54 50 L30 58 L10 52 Z" fill="#f7f4ef" ${$()}/>
    <path d="M34 36 L50 32 L54 50 L36 54 Z" fill="#d9d3cc"/>
    <path d="M56 44 L78 32 L108 36 L112 56 L80 64 L58 58 Z" fill="#f4f1ec" ${$()}/>
    <path d="M86 40 L108 36 L112 56 L90 58 Z" fill="#d4cdc4"/>
    <path d="M110 30 L128 20 L154 28 L150 48 L124 52 L108 42 Z" fill="#e7e2dc" ${$()}/>
    <path d="M132 26 L152 28 L148 46 L130 44 Z" fill="#d0c9c2"/>
    ${ie("M16 38 q8 -4 14 0")}
    ${ct("M22 44 h12 M72 48 h16 M124 36 h12")}`}),nM=xe({kind:"pinwheel",name:"Pinwheel",cat:"decor",w:56,h:90,vb:"0 0 70 100",holdable:!0,svg:`${$e(35,16,96)}
    <rect x="31" y="44" width="6" height="50" rx="2" fill="#c99366" ${$()}/>
    <rect x="34" y="48" width="3" height="42" fill="#c99366"/>
    <path d="M34 40 L34 8 Q54 16 48 36 Z" fill="#ff8fab" ${$(2.2)}/>
    <path d="M42 18 Q50 28 36 34 Z" fill="#e45d88"/>
    <path d="M34 40 L62 32 Q58 54 40 50 Z" fill="#ffd166" ${$(2.2)}/>
    <path d="M54 38 Q58 48 42 46 Z" fill="#e0a83a"/>
    <path d="M34 40 L34 72 Q14 64 20 44 Z" fill="#8ecae6" ${$(2.2)}/>
    <path d="M26 58 Q16 50 32 46 Z" fill="#5aa9d6"/>
    <path d="M34 40 L6 48 Q12 26 28 30 Z" fill="#c9a0dc" ${$(2.2)}/>
    <path d="M16 36 Q14 28 28 34 Z" fill="#b388d6"/>
    <circle cx="34" cy="40" r="5" fill="#fff" ${$(2.2)}/>
    <circle cx="34" cy="40" r="1.8" fill="${rt}"/>`}),sM=xe({kind:"rain-barrel",name:"Rain Barrel",cat:"decor",w:86,h:108,vb:"0 0 80 110",svg:`${$e(40,30,104)}
    <path d="M22 30 C12 48 12 78 22 98 H58 C68 78 68 48 58 30 Z" fill="#8ecae6" ${$()}/>
    <path d="M46 34 C58 48 60 76 54 96 H58 C66 76 66 50 56 32 Z" fill="#5aa9c6"/>
    ${ct("M28 40 v48 M36 36 v54 M44 38 v50")}
    ${ie("M24 42 v24")}
    <ellipse cx="40" cy="30" rx="20" ry="8" fill="#bde0fe" ${$()}/>
    <ellipse cx="46" cy="30" rx="10" ry="5" fill="#7eb4dc"/>
    <path d="M16 48 H64" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <path d="M14 74 H66" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <rect x="56" y="78" width="14" height="7" rx="2" fill="#d7ecff" ${$(2)}/>
    <path d="M70 81 h6" fill="none" ${$(2)}/>
    <path d="M34 18 q6 -8 12 0" fill="none" stroke="#7eb4dc" stroke-width="2.2" stroke-linecap="round"/>`}),oM=xe({kind:"butterfly-bush",name:"Butterfly Bush",cat:"plants",w:120,h:130,vb:"0 0 100 120",svg:`${$e(50,40,114)}
    <ellipse cx="32" cy="86" rx="22" ry="18" fill="#95d5b2" ${$(2.2)}/>
    <ellipse cx="70" cy="84" rx="24" ry="20" fill="#3d9a68" ${$(2.2)}/>
    <ellipse cx="50" cy="78" rx="36" ry="28" fill="#74c69d" ${$()}/>
    <path d="M18 90 Q50 108 84 88 Q68 100 50 102 Q30 100 18 90 Z" fill="#3d9a68"/>
    ${ie("M24 68 q14 -8 26 2")}
    ${ct("M28 80 q4 6 0 10 M46 72 q5 8 0 12 M66 78 q4 6 0 10")}
    <path d="M30 62 C28 44 32 26 35 24 C39 28 40 46 38 62 Z" fill="#c9a0dc" ${$(1.8)}/>
    <circle cx="33" cy="36" r="2.2" fill="#f7ecff"/><circle cx="36" cy="46" r="2.2" fill="#b388d6"/><circle cx="33" cy="54" r="2" fill="#f7ecff"/>
    <path d="M46 58 C44 36 50 14 53 12 C57 16 58 40 54 58 Z" fill="#b388d6" ${$(1.8)}/>
    <circle cx="50" cy="28" r="2.4" fill="#f7ecff"/><circle cx="53" cy="40" r="2.4" fill="#c9a0dc"/><circle cx="50" cy="50" r="2.2" fill="#f7ecff"/>
    <path d="M62 60 C62 42 68 28 71 26 C75 30 76 46 72 60 Z" fill="#a78bfa" ${$(1.8)}/>
    <circle cx="67" cy="38" r="2.2" fill="#f7ecff"/><circle cx="70" cy="48" r="2" fill="#c9a0dc"/>
    <path d="M14 26 C4 14 2 24 10 32 C14 36 18 32 18 28 Z" fill="#ff8fab" ${$(1.6)}/>
    <path d="M20 24 C30 12 34 24 26 34 C22 38 20 30 20 26 Z" fill="#c9a0dc" ${$(1.6)}/>
    <path d="M12 30 C6 36 6 46 14 46 C18 44 20 36 18 30 Z" fill="#ffd166" ${$(1.6)}/>
    <path d="M22 30 C30 36 32 46 24 48 C20 44 18 36 20 30 Z" fill="#8ecae6" ${$(1.6)}/>
    <ellipse cx="18" cy="32" rx="2" ry="7" fill="${rt}"/>
    <path d="M16 26 Q12 18 10 14 M20 26 Q24 18 28 14" fill="none" stroke="${rt}" stroke-width="1.3" stroke-linecap="round"/>`}),iM=xe({kind:"hedge-row",name:"Hedge Row",cat:"plants",w:190,h:96,vb:"0 0 180 96",svg:`${$e(90,78,90)}
    <path d="M16 84 C28 70 40 62 52 66 C62 52 78 50 90 62 C102 50 118 52 128 66 C140 58 156 64 164 74 L164 86 L16 86 Z" fill="#2f7d52"/>
    <path d="M10 82 L10 60 C10 50 18 46 26 50 C32 34 46 32 54 48 C60 30 76 28 84 46 C92 28 108 28 116 46 C124 30 140 32 148 48 C156 36 166 42 170 54 L170 82 Z" fill="#74c69d" ${$()}/>
    <path d="M148 46 C160 38 170 50 170 70 L170 82 L140 82 L146 58 Z" fill="#52b788"/>
    <path d="M22 64 C40 54 58 58 70 50 C84 60 100 48 116 56 C128 48 146 56 158 64" fill="none" stroke="#95d5b2" stroke-width="6" stroke-linecap="round" opacity=".85"/>
    <path d="M14 68 C48 78 132 76 166 66 L168 82 L12 82 Z" fill="#3d9a68"/>
    ${ct("M28 58 q3 5 0 8 M48 54 q3 6 0 9 M70 52 q3 6 1 9 M94 52 q3 6 0 10 M118 54 q3 6 0 9 M142 56 q3 5 0 8")}
    ${ie("M18 58 q10 -4 16 1")}
    ${ie("M58 42 q12 -4 16 2")}`}),aM=xe({kind:"lemonade-cup",name:"Lemonade Cup",cat:"food",w:52,h:70,vb:"0 0 70 90",holdable:!0,svg:`${$e(35,22,84)}
    <path d="M18 32 H52 L46 76 H24 Z" fill="#fff" ${$()}/>
    <path d="M40 34 H50 L46 74 H40 Z" fill="#f0e6d8"/>
    <path d="M20 44 H50 L46 76 H24 Z" fill="#ffe566"/>
    <path d="M40 46 H48 L46 74 H40 Z" fill="#f0c45c"/>
    <ellipse cx="35" cy="44" rx="15" ry="6" fill="#fff3a0" ${$(2)}/>
    <ellipse cx="35" cy="32" rx="17" ry="7" fill="#fff" ${$()}/>
    <path d="M40 42 L48 16 H58" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="20" cy="30" r="8" fill="#ffe566" ${$(1.8)}/>
    <path d="M20 23 v14 M14 30 h12" fill="none" stroke="#fff" stroke-width="1.4"/>
    <path d="M16 26 q4 4 8 0 M16 34 q4 -4 8 0" fill="none" stroke="#e0a83a" stroke-width="1.2"/>
    ${ie("M24 38 v14")}`}),rM=xe({kind:"picnic-table",name:"Picnic Table",cat:"furniture",w:180,h:110,vb:"0 0 160 100",svg:`${$e(80,68,96)}
    <rect x="18" y="62" width="124" height="10" rx="2" fill="#e7c49a" ${$()}/>
    <rect x="118" y="64" width="20" height="7" fill="#c99366"/>
    <rect x="28" y="70" width="8" height="24" rx="1" fill="#f3d2aa" ${$(2)}/>
    <rect x="124" y="70" width="8" height="24" rx="1" fill="#d4a373" ${$(2)}/>
    <rect x="8" y="78" width="40" height="8" rx="2" fill="#f6e0c4" ${$(2)}/>
    <rect x="112" y="78" width="40" height="8" rx="2" fill="#e7c49a" ${$(2)}/>
    <rect x="22" y="36" width="116" height="14" rx="2" fill="#f6e0c4" ${$()}/>
    <rect x="110" y="38" width="24" height="10" fill="#d4a373"/>
    <rect x="36" y="48" width="8" height="18" fill="#f3d2aa" ${$(2)}/>
    <rect x="116" y="48" width="8" height="18" fill="#d4a373" ${$(2)}/>
    ${ie("M28 40 h36")}
    ${ct("M40 42 h50 M34 66 h70")}`}),lM=xe({kind:"seesaw",name:"Seesaw",cat:"furniture",w:200,h:80,vb:"0 0 180 80",svg:`${$e(90,74,76)}
    <path d="M78 58 H102 L96 74 H84 Z" fill="#f3d2aa" ${$()}/>
    <path d="M94 60 H100 L96 72 H92 Z" fill="#c99366"/>
    <rect x="10" y="40" width="160" height="12" rx="3" fill="#ffd166" ${$()} transform="rotate(-8 90 46)"/>
    <rect x="130" y="28" width="28" height="8" fill="#e0a83a"/>
    <rect x="16" y="34" width="28" height="10" rx="2" fill="#ff8fab" ${$(2)}/>
    <rect x="136" y="22" width="28" height="10" rx="2" fill="#8ecae6" ${$(2)}/>
    ${ie("M24 44 h40")}`}),cM=xe({kind:"wagon",name:"Wagon",cat:"furniture",w:130,h:90,vb:"0 0 130 90",svg:`${$e(64,50,86)}
    <circle cx="36" cy="74" r="12" fill="${rt}" ${$(2)}/><circle cx="36" cy="74" r="5" fill="#ffd166"/>
    <circle cx="96" cy="74" r="12" fill="${rt}" ${$(2)}/><circle cx="96" cy="74" r="5" fill="#ffd166"/>
    <path d="M22 40 H108 L100 68 H30 Z" fill="#e45d88" ${$()}/>
    <path d="M86 42 H106 L100 66 H84 Z" fill="#c93b68"/>
    <rect x="28" y="28" width="76" height="14" rx="3" fill="#ff8fab" ${$()}/>
    <path d="M108 36 H122 L118 58" fill="none" ${$(2.4)}/>
    ${ie("M32 46 h28")}
    ${ct("M40 54 h40")}`}),dM=xe({kind:"birdhouse",name:"Birdhouse",cat:"decor",w:70,h:120,vb:"0 0 80 130",svg:`${$e(40,22,124)}
    <rect x="34" y="70" width="12" height="50" rx="2" fill="#d4a373" ${$()}/>
    <rect x="40" y="74" width="5" height="42" fill="#c99366"/>
    <path d="M12 62 L40 28 L68 62 Z" fill="#e45d88" ${$()}/>
    <path d="M40 32 L66 60 H52 Z" fill="#c93b68"/>
    <rect x="18" y="60" width="44" height="36" rx="3" fill="#f6e0c4" ${$()}/>
    <rect x="48" y="64" width="10" height="28" fill="#e7c49a"/>
    <circle cx="40" cy="76" r="7" fill="#5a3d5c"/>
    <rect x="36" y="86" width="14" height="4" rx="1" fill="#d4a373" ${$(1.6)}/>
    ${ie("M22 66 h12")}`}),fM=xe({kind:"sprinkler",name:"Sprinkler",cat:"decor",w:80,h:70,vb:"0 0 100 80",svg:`${$e(50,28,76)}
    <ellipse cx="50" cy="66" rx="22" ry="8" fill="#74c69d" ${$()}/>
    <rect x="44" y="40" width="12" height="26" rx="3" fill="#8ecae6" ${$()}/>
    <circle cx="50" cy="36" r="8" fill="#ffd166" ${$()}/>
    <path d="M50 28 C30 16 18 20 12 10" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 28 C70 14 84 18 90 8" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 26 C40 8 58 4 50 2" fill="none" stroke="#c9ecff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="12" cy="10" r="2.2" fill="#c9ecff"/><circle cx="90" cy="8" r="2.2" fill="#c9ecff"/><circle cx="50" cy="2" r="2.2" fill="#fff"/>
    ${ie("M46 44 v10")}`}),pM=xe({kind:"beach-ball",name:"Beach Ball",cat:"decor",w:70,h:70,vb:"0 0 80 80",svg:`${$e(40,26,76)}
    <circle cx="40" cy="40" r="28" fill="#fff" ${$()}/>
    <path d="M40 12 A28 28 0 0 1 66 32 L40 40 Z" fill="#ff8fab"/>
    <path d="M66 48 A28 28 0 0 1 40 68 L40 40 Z" fill="#ffd166"/>
    <path d="M24 64 A28 28 0 0 1 14 36 L40 40 Z" fill="#8ecae6"/>
    <path d="M18 28 A28 28 0 0 1 40 12 L40 40 Z" fill="#b7e4c7"/>
    <circle cx="40" cy="40" r="5" fill="#fff" ${$(2)}/>
    ${ie("M28 24 q6 -4 10 2")}`}),hM=xe({kind:"patio-umbrella",name:"Patio Umbrella",cat:"furniture",w:150,h:180,vb:"0 0 120 150",svg:`${$e(60,36,144)}
    <path d="M10 58 Q60 18 110 58 L98 64 Q60 32 22 64 Z" fill="#ffb3c6" ${$()}/>
    <path d="M60 22 L108 56 L96 62 Z" fill="#e45d88"/>
    <path d="M28 40 Q44 30 60 36 Q76 28 96 42" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <rect x="56" y="58" width="8" height="78" rx="2" fill="#f3d2aa" ${$()}/>
    <rect x="60" y="62" width="3" height="70" fill="#d4a373"/>
    <rect x="40" y="128" width="40" height="8" rx="2" fill="#e7c49a" ${$(2)}/>
    ${ie("M24 50 q16 -8 24 0")}`}),gM=xe({kind:"veggie-patch",name:"Vegetable Patch",cat:"plants",w:150,h:80,vb:"0 0 150 80",svg:`${$e(75,62,76)}
    <rect x="8" y="28" width="134" height="44" rx="4" fill="#c99366" ${$()}/>
    <rect x="16" y="34" width="118" height="32" fill="#8d6e4c"/>
    <path d="M36 48 C36 36 48 34 48 46 C48 34 60 36 58 48 Z" fill="#74c69d" ${$(2)}/>
    <path d="M78 50 C78 38 90 36 90 48 C90 36 102 38 100 50 Z" fill="#52b788" ${$(2)}/>
    <path d="M112 52 L120 30 L128 52 Z" fill="#ff922b" ${$(2)}/>
    <path d="M118 32 Q124 22 130 28" fill="none" stroke="#2f7d52" stroke-width="2" stroke-linecap="round"/>
    ${ie("M18 36 h24")}`}),uM=xe({kind:"hammock",name:"Hammock",cat:"furniture",w:190,h:110,vb:"0 0 170 100",svg:`${$e(85,70,96)}
    <rect x="8" y="18" width="10" height="74" rx="2" fill="#d4a373" ${$()}/>
    <rect x="152" y="18" width="10" height="74" rx="2" fill="#c99366" ${$()}/>
    <path d="M18 28 Q85 78 152 28" fill="none" stroke="#5a3d5c" stroke-width="2"/>
    <path d="M18 36 Q85 88 152 36 L152 48 Q85 96 18 48 Z" fill="#8ecae6" ${$()}/>
    <path d="M120 40 Q140 62 150 44 L150 54 Q136 74 112 52 Z" fill="#5fb0d8"/>
    ${ie("M36 46 q24 10 30 4")}
    ${ct("M40 58 q30 16 50 4")}`}),mM=xe({kind:"garden-gnome",name:"Garden Gnome",cat:"decor",w:64,h:100,vb:"0 0 70 110",svg:`${$e(35,22,104)}
    <path d="M18 78 H52 L48 100 H22 Z" fill="#3d7ec4" ${$()}/>
    <path d="M40 80 H50 L48 98 H42 Z" fill="#2c5f96"/>
    <circle cx="35" cy="62" r="16" fill="#f6d2b5" ${$()}/>
    <path d="M20 66 Q35 78 50 66 Q46 74 35 76 Q24 74 20 66 Z" fill="#fff"/>
    <circle cx="29" cy="60" r="2" fill="${rt}"/><circle cx="41" cy="60" r="2" fill="${rt}"/>
    <path d="M16 52 L35 18 L54 52 Z" fill="#e45d88" ${$()}/>
    <path d="M35 22 L52 50 H42 Z" fill="#c93b68"/>
    <ellipse cx="35" cy="52" rx="16" ry="4" fill="#ff8fab" ${$(2)}/>
    ${ie("M22 40 l8 -8")}`}),ta=[U7,V7,z7,Q7,q7,N7,Z7,F7,G7,Y7,K7,X7,J7,eM,tM,nM,sM,oM,iM,aM,rM,lM,cM,dM,fM,pM,hM,gM,uM,mM];function yM(e,t){for(const n of ta)t[n.kind]||(e.push(n),t[n.kind]=n)}function Wl(e,t,n){return`<g>
    <ellipse cx="${e-22*n}" cy="${t}" rx="${26*n}" ry="${14*n}" fill="#fff"/>
    <ellipse cx="${e+18*n}" cy="${t-2*n}" rx="${30*n}" ry="${16*n}" fill="#fff"/>
    <ellipse cx="${e}" cy="${t+4*n}" rx="${34*n}" ry="${13*n}" fill="#fff"/>
  </g>`}function bM(e,t,n,s,o){const a=l=>`<rect x="${e-2}" y="${l}" width="${t-e+12+4}" height="8" rx="3" fill="#fff" ${$(2.2)}/><rect x="${(t-40).toFixed(1)}" y="${l+1}" width="30" height="6" rx="2" fill="#d5ead8"/>`;let r=a(n+26)+a(s-28);for(let l=e;l<=t;l+=o)r+=`<path d="M${l} ${n+12} L${l+12/2} ${n} L${l+12} ${n+12} V${s} H${l} Z" fill="#f7fff8" ${$(2.2)}/>`,r+=`<path d="M${(l+12*.58).toFixed(1)} ${n+10} H${l+12-1} V${s-4} H${(l+12*.58).toFixed(1)} Z" fill="#d5ead8"/>`,r+=`<path d="M${l+2} ${n+18} v22" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".75" fill="none"/>`;return r}function kM(e,t){const s=150+46*t,o=372-s;return`<g id="yardTree">
    <rect x="${e-14*t}" y="${s}" width="${28*t}" height="${o}" rx="${6*t}" fill="#e7b98a" ${$()}/>
    <rect x="${e+4*t}" y="${s+8*t}" width="${8*t}" height="${o-16*t}" fill="#c99366"/>
    ${ct(`M${e-4*t} ${s+28*t} v${36*t}`)}
    ${ie(`M${e-8*t} ${s+16*t} v${22*t}`)}
    <ellipse cx="${e+8*t}" cy="${150+18*t}" rx="${78*t}" ry="${46*t}" fill="#2f7d52"/>
    <ellipse cx="${e-48*t}" cy="${150+10*t}" rx="${36*t}" ry="${30*t}" fill="#245e3e"/>
    <ellipse cx="${e-34*t}" cy="${150+16*t}" rx="${42*t}" ry="${34*t}" fill="#95d5b2" ${$(2.2)}/>
    <ellipse cx="${e}" cy="150" rx="${68*t}" ry="${50*t}" fill="#74c69d" ${$()}/>
    <ellipse cx="${e+40*t}" cy="${150+8*t}" rx="${40*t}" ry="${36*t}" fill="#3d9a68" ${$(2.2)}/>
    <ellipse cx="${e-8*t}" cy="${150-6*t}" rx="${28*t}" ry="${20*t}" fill="#b7e4c7" opacity=".95"/>
    ${ct(`M${e-20*t} ${150+8*t} q${8*t} ${6*t} 0 ${12*t} M${e+10*t} ${150-4*t} q${8*t} ${6*t} 2 ${12*t} M${e+28*t} ${150+12*t} q${6*t} ${5*t} 0 ${10*t}`)}
    ${ie(`M${e-36*t} ${150-18*t} q${16*t} -8 ${28*t} 2`)}
  </g>`}function wM(){return`<svg class="yardWorld" viewBox="0 0 2400 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ydsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6eb6e8"/>
        <stop offset=".48" stop-color="#c5e6fb"/>
        <stop offset="1" stop-color="#fff3df"/>
      </linearGradient>
      ${Vd("ydsun","#ffe566",".55")}
    </defs>
    <rect width="2400" height="430" fill="url(#ydsky)"/>
    <circle id="ydSunGlow" cx="1180" cy="68" r="62" fill="url(#ydsun)"/>
    <circle id="ydSun" cx="1180" cy="68" r="30" fill="#ffe566"/>
    <circle cx="1170" cy="58" r="8" fill="#fff" opacity=".8"/>
    ${Wl(980,96,1.05)}${Wl(1320,78,.85)}${Wl(1500,120,.7)}
    <rect y="360" width="2400" height="240" fill="#c6ef9a"/>
    <rect y="360" width="2400" height="28" fill="#e7f8c8"/>
    <rect y="520" width="2400" height="80" fill="#9ed67a"/>
    <path d="M1040 470 q30 -12 16 -6 M1200 510 q28 -12 14 -4 M1360 548 q24 -10 12 -4" fill="none" stroke="#3d9a68" stroke-width="1.2" stroke-linecap="round" opacity=".22"/>
    ${bM(846,2118,258,372,24)}
    ${kM(1184,.8)}
    <path d="M840 120 H1076 L1054 152 H862 Z" fill="#ffb3c6" ${$()}/>
    <path d="M960 126 H1064 L1046 148 H976 Z" fill="#e45d88"/>
    ${ie("M876 132 h56")}
    <rect x="864" y="150" width="196" height="222" rx="4" fill="#fff6ea" ${$()}/>
    <rect x="1044" y="156" width="12" height="210" fill="#f0dcc4"/>
    ${ct("M880 174 H1000 M880 202 H1000 M880 230 H990 M880 294 H1000 M880 334 H980")}
    <rect x="884" y="180" width="44" height="36" rx="4" fill="#c9ecff" ${$(2.2)}/>
    <rect x="912" y="184" width="12" height="28" fill="#8ecae6"/>
    <path d="M906 180 V216 M884 198 H928" fill="none" ${$(2.2)}/>
    ${ie("M890 188 h12")}
  </svg>`}function vM(e,t,n,s,o){const i=(600-t)/600*100,a=(n/2400*100).toFixed(3),r=(s/600*100).toFixed(3);return o==="right"?`right:${((2400-(e+n/2))/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`:`left:${((e-n/2)/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`}function _M(){return`<svg class="doorArt" viewBox="0 0 100 230">
    <rect x="4" y="2" width="92" height="226" rx="3" fill="#f3d2aa" ${$()}/>
    <rect x="76" y="6" width="16" height="218" fill="#d4a373"/>
    <rect x="14" y="12" width="72" height="206" rx="2" fill="#f6e9ff" ${$(2.2)}/>
    <rect x="70" y="16" width="12" height="198" fill="#d4b4e6"/>
    <rect x="24" y="22" width="52" height="42" rx="3" fill="#c9ecff" ${$(2.2)}/>
    <rect x="60" y="26" width="12" height="34" fill="#8ecae6"/>
    <path d="M50 22 V64 M24 43 H76" fill="none" ${$(2.2)}/>
    ${ie("M28 28 h18")}
    <rect x="24" y="76" width="52" height="56" rx="3" fill="#f7ecff" ${$(2.2)}/>
    <rect x="62" y="80" width="10" height="48" fill="#e0c8f0"/>
    ${ie("M28 84 v22")}
    <rect x="24" y="144" width="52" height="56" rx="3" fill="#f7ecff" ${$(2.2)}/>
    <rect x="62" y="148" width="10" height="48" fill="#e0c8f0"/>
    <circle cx="64" cy="126" r="4.2" fill="#ffd166" ${$(2.2)}/>
    <rect x="10" y="214" width="80" height="10" rx="2" fill="#e7c49a" ${$(2.2)}/>
  </svg>`}function $M(e){const t=e==="living"?zg:Qg,n=e==="living"?"backyard":"living",s=e==="living"?"Backyard":"Back inside",o=e==="yard"?"right":"left";return`<button type="button" class="yardDoor" data-yard-go="${n}" aria-label="${s}" style="${vM(t.x,t.y,t.w,t.h,o)}">${_M()}<span class="yardHintLabel"><span>${s}</span></span></button>`}function Qd(e,t){const n=e.replace(/[&<>]/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[s]);return`<figure class="ysCard"><div class="ysArt">${t}</div><figcaption>${n}</figcaption></figure>`}function xM(){return`<div class="yardSheet" data-yard-sheet="1"><h1>Backyard pieces</h1><div class="ysGrid">${ta.map(t=>Qd(t.name,mn(t))).join("")}</div></div>`}function MM(e,t){return Qd(e,`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${t}</svg>`)}function LM(){const e=(r,l)=>$e(r,l,96.4),t=`
    ${e(50,40)}
    <path d="M18 58 V30 Q18 18 32 18 H68 Q82 18 82 30 V58 Z" fill="#ffb7cc" ${$()}/>
    <path d="M56 24 H76 Q80 24 80 32 V52 H56 Z" fill="#e888a8"/>
    <circle cx="34" cy="38" r="3.4" fill="#ff8fab" ${$(2)}/><circle cx="33" cy="37" r="1.1" fill="#fff"/>
    <circle cx="50" cy="36" r="3.4" fill="#ff8fab" ${$(2)}/><circle cx="49" cy="35" r="1.1" fill="#fff"/>
    <circle cx="66" cy="38" r="3.4" fill="#e45d88" ${$(2)}/><circle cx="65" cy="37" r="1.1" fill="#fff"/>
    <rect x="4" y="44" width="20" height="38" rx="10" fill="#ff7096" ${$()}/>
    <ellipse cx="14" cy="44" rx="12" ry="9" fill="#ff9ab6" ${$()}/>
    <ellipse cx="9" cy="41" rx="4" ry="2.4" fill="#fff" opacity=".7"/>
    <rect x="76" y="44" width="20" height="38" rx="10" fill="#e04878" ${$()}/>
    <ellipse cx="86" cy="44" rx="12" ry="9" fill="#e45d88" ${$()}/>
    <rect x="20" y="64" width="60" height="16" rx="6" fill="#ff8fab" ${$()}/>
    <rect x="22" y="56" width="28" height="22" rx="7" fill="#ffe0ea" ${$(2.4)}/>
    <rect x="50" y="56" width="28" height="22" rx="7" fill="#ffc2d4" ${$(2.4)}/>
    <rect x="66" y="58" width="10" height="18" rx="4" fill="#e888a8"/>
    <path d="M26 60 h20 M54 60 h16 M26 74 h20 M54 74 h16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M50 58 v18" fill="none" stroke="#e45d88" stroke-width="2.2" stroke-linecap="round"/>
    <rect x="26" y="46" width="20" height="16" rx="5" fill="#fff" ${$(2.2)}/>
    <path d="M33 52 c-2.2 -3.2 -6.4 -.4 -3.4 2.6 c1 1.2 3.4 2.6 3.4 2.6 c0 0 2.4 -1.4 3.4 -2.6 c3 -3 -1.2 -5.8 -3.4 -2.6 z" fill="#ff8fab"/>
    <path d="M41 56 c-1.4 -2 -4.2 0 -2.2 1.8 c.7 .8 2.2 1.6 2.2 1.6 c0 0 1.5 -.8 2.2 -1.6 c2 -1.8 -.8 -3.8 -2.2 -1.8 z" fill="#7eb4dc"/>
    <rect x="16" y="84" width="7" height="10" rx="2" fill="${rt}"/>
    <rect x="77" y="84" width="7" height="10" rx="2" fill="${rt}"/>`,n=`
    <defs>${Vd("a2lamp-glow","#ffd56a",".95")}</defs>
    ${e(50,22)}
    <path d="M34 8 L42 8 L37 40 L24 40 Z" fill="#fff6d4"/>
    <path d="M42 8 L50 8 L50 40 L37 40 Z" fill="#ffe08a"/>
    <path d="M50 8 L58 8 L63 40 L50 40 Z" fill="#f0c45c"/>
    <path d="M58 8 L66 8 L76 40 L63 40 Z" fill="#e0a83a"/>
    <path d="M24 40 L34 8 H66 L76 40 Z" fill="none" ${$()}/>
    <path d="M42 8 L37 40 M50 8 V40 M58 8 L63 40" fill="none" stroke="${rt}" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="50" cy="36" rx="20" ry="10" fill="url(#a2lamp-glow)"/>
    <rect x="46" y="40" width="8" height="42" rx="3" fill="#e4ccf2" ${$()}/>
    <rect x="50" y="44" width="4" height="34" rx="2" fill="#c49ad4"/>
    <ellipse cx="50" cy="88" rx="20" ry="6" fill="#d4b4e6" ${$()}/>
    <ellipse cx="60" cy="90" rx="8" ry="3" fill="#b888c8"/>
    <ellipse cx="42" cy="86" rx="6" ry="2" fill="#fff" opacity=".55"/>`,s=`
    ${e(50,30)}
    <ellipse cx="30" cy="40" rx="14" ry="22" fill="#b7ebc8" ${$()} transform="rotate(-30 30 40)"/>
    <path d="M34 28 C30 40 32 52 44 58" fill="#52b078"/>
    <ellipse cx="72" cy="42" rx="13" ry="20" fill="#3d9a68" ${$()} transform="rotate(26 72 42)"/>
    <path d="M50 66 C40 44 42 18 50 6 C58 18 60 44 50 66 Z" fill="#d8f6e4" ${$()}/>
    <path d="M54 18 C60 32 58 48 50 58 C56 44 58 28 54 18 Z" fill="#52b078"/>
    <path d="M50 14 V52" fill="none" stroke="#2f7a52" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
    <path d="M40 60 C34 50 24 48 22 38 C32 44 38 54 42 64 Z" fill="#74c69d" ${$(2.2)}/>
    <path d="M28 64 H74 L68 94 H34 Z" fill="#e8845a" ${$()}/>
    <path d="M58 66 H72 L68 92 H60 Z" fill="#c45c38"/>
    <rect x="22" y="58" width="58" height="10" rx="4" fill="#f0a078" ${$()}/>
    <rect x="56" y="60" width="20" height="6" rx="3" fill="#d47848"/>
    <ellipse cx="50" cy="65" rx="20" ry="3" fill="#a86a42" opacity=".4"/>
    <path d="M28 62 h14" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>`,o=Object.fromEntries(ta.map(r=>[r.kind,r])),i=(r,l,c)=>MM(r,l)+Qd(o[c].name,mn(o[c]));return`<div class="yardSheet yardCompare" data-yard-compare="1"><h1>House style and the yard</h1><p class="ysNote">Sofa, lamp, and plant are the approved refresh. Swing, cart, and birdbath use the same light.</p><div class="ysPair">${i("Sofa",t,"yard-swing")+i("Lamp",n,"lemonade-cart")+i("Plant",s,"birdbath")}</div></div>`}const di="#5a3d5c",Z=`stroke="${di}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Oa='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>',qg=[{kind:"soaking-tub",name:"Soaking Tub",cat:"furniture",w:250,h:200,vb:"0 0 120 96",svg:`<ellipse cx="60" cy="92" rx="48" ry="3.2" fill="#000" opacity=".12"/><rect x="18" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${Z}/><rect x="92" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${Z}/><path d="M14 58 Q8 58 10 46 L22 28 H98 L110 46 Q112 58 106 58 Z" fill="#fff" ${Z}/><ellipse cx="60" cy="30" rx="44" ry="14" fill="#fff" ${Z}/><ellipse cx="60" cy="32" rx="34" ry="9" fill="#d7f3ff"/><path d="M28 34 Q60 42 92 34" fill="none" stroke="#b9e6f8" stroke-width="4"/><rect x="96" y="8" width="8" height="22" rx="4" fill="#f7d27a" ${Z}/><path d="M100 28 Q112 34 104 44" fill="none" ${Z}/><circle cx="104" cy="46" r="3.2" fill="#a8d4ea" ${Z}/><ellipse cx="46" cy="30" rx="8" ry="3" fill="#fff" opacity=".7"/>`},{kind:"bath-toilet",name:"Toilet",cat:"furniture",w:120,h:160,vb:"0 0 100 134",svg:`<ellipse cx="50" cy="128" rx="34" ry="4" fill="#000" opacity=".12"/><rect x="28" y="8" width="44" height="36" rx="8" fill="#fff" ${Z}/><rect x="34" y="16" width="32" height="16" rx="4" fill="#e7f6ff"/><rect x="46" y="42" width="8" height="10" fill="#f4f7fb" ${Z}/><ellipse cx="50" cy="78" rx="36" ry="22" fill="#fff" ${Z}/><ellipse cx="50" cy="74" rx="24" ry="14" fill="#d7f3ff" ${Z}/><path d="M18 70 Q50 58 82 70" fill="#fff" ${Z}/><rect x="40" y="96" width="20" height="24" rx="4" fill="#f7f4ef" ${Z}/>`},{kind:"sink-vanity",name:"Sink Vanity",cat:"furniture",w:210,h:190,vb:"0 0 110 100",svg:`<ellipse cx="55" cy="96" rx="46" ry="3.2" fill="#000" opacity=".12"/><rect x="10" y="48" width="90" height="42" rx="8" fill="#f6e2c4" ${Z}/><path d="M55 48 V90" ${Z}/><circle cx="28" cy="70" r="3" fill="${di}"/><circle cx="82" cy="70" r="3" fill="${di}"/><rect x="16" y="90" width="8" height="6" rx="2" fill="${di}"/><rect x="86" y="90" width="8" height="6" rx="2" fill="${di}"/><ellipse cx="55" cy="44" rx="40" ry="12" fill="#fff" ${Z}/><ellipse cx="55" cy="44" rx="26" ry="7" fill="#d7f3ff"/><rect x="50" y="10" width="10" height="28" rx="4" fill="#f7d27a" ${Z}/><path d="M55 36 Q70 40 66 48" fill="none" ${Z}/><rect x="8" y="40" width="94" height="8" rx="3" fill="#f3d2b5" ${Z}/>`},{kind:"bath-mirror",name:"Bath Mirror",cat:"decor",w:120,h:160,wall:!0,vb:"0 0 90 120",svg:`<path d="M45 8 C70 8 82 28 82 58 C82 92 68 112 45 112 C22 112 8 92 8 58 C8 28 20 8 45 8 Z" fill="#f7d27a" ${Z}/><ellipse cx="45" cy="60" rx="26" ry="40" fill="#d7f4ff" ${Z}/><path d="M30 36 l8 -8 M28 52 l18 -16" stroke="#fff" stroke-width="4" stroke-linecap="round"/><rect x="38" y="2" width="14" height="8" rx="3" fill="#f28fa6" ${Z}/>`},{kind:"towel-bar",name:"Towel Bar",cat:"decor",w:170,h:116,wall:!0,vb:"0 0 150 102",svg:`<rect x="10" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${Z}/><rect x="130" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${Z}/><rect x="14" y="16" width="122" height="8" rx="4" fill="#c98d55" ${Z}/><path d="M26 24 H124 V70 Q75 100 26 70 Z" fill="#f7d7e4" ${Z}/><path d="M75 24 V88" stroke="#f28fa6" stroke-width="3"/><path d="M40 36 H110" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"bath-mat",name:"Bath Mat",cat:"decor",w:230,h:120,vb:"0 0 160 84",svg:`<ellipse cx="80" cy="78" rx="70" ry="5" fill="#000" opacity=".1"/><rect x="12" y="22" width="136" height="48" rx="18" fill="#f28fa6" ${Z}/><rect x="24" y="32" width="112" height="28" rx="12" fill="#f7d7e4"/><path d="M40 46 H120 M40 54 H120" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>`},{kind:"rubber-ducky",name:"Rubber Ducky",cat:"decor",w:80,svg:`${Oa}<ellipse cx="48" cy="68" rx="30" ry="26" fill="#f7d27a" ${Z}/><circle cx="68" cy="40" r="18" fill="#ffe9a8" ${Z}/><path d="M82 38 H98 Q102 44 92 48 H82 Z" fill="#f28fa6" ${Z}/><ellipse cx="36" cy="74" rx="12" ry="8" fill="#f3c15a"/>`},{kind:"shower-curtain",name:"Shower Curtain",cat:"decor",w:150,h:260,holdable:!1,vb:"0 0 90 156",svg:`<rect x="8" y="8" width="74" height="8" rx="3" fill="#c98d55" ${Z}/><circle cx="22" cy="16" r="3" fill="#f7d27a" ${Z}/><circle cx="40" cy="16" r="3" fill="#f7d27a" ${Z}/><circle cx="58" cy="16" r="3" fill="#f7d27a" ${Z}/><circle cx="72" cy="16" r="3" fill="#f7d27a" ${Z}/><path d="M12 18 Q8 80 16 146 H40 Q30 80 36 18 Z" fill="#d7f4ff" ${Z}/><path d="M36 18 Q34 80 46 146 H74 Q84 80 78 18 Z" fill="#f7d7e4" ${Z}/><path d="M24 40 Q18 70 26 100 M58 40 Q66 70 58 110" fill="none" stroke="#fff" stroke-width="3" opacity=".65"/>`},{kind:"soap-dish",name:"Soap Dish",cat:"decor",w:90,svg:`${Oa}<ellipse cx="50" cy="78" rx="34" ry="12" fill="#fff" ${Z}/><ellipse cx="50" cy="74" rx="26" ry="7" fill="#e7f6ff"/><rect x="28" y="48" width="44" height="22" rx="8" fill="#f7d7e4" ${Z}/><path d="M36 56 H64" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"laundry-hamper",name:"Laundry Hamper",cat:"furniture",w:140,h:160,vb:"0 0 100 114",svg:`<ellipse cx="50" cy="108" rx="36" ry="4" fill="#000" opacity=".12"/><path d="M18 40 H82 L74 100 H26 Z" fill="#b9a0dc" ${Z}/><path d="M24 58 H76 M26 74 H74" stroke="#fff" stroke-width="3" opacity=".55"/><ellipse cx="50" cy="40" rx="34" ry="10" fill="#c9b6e8" ${Z}/><path d="M22 36 Q50 18 78 36" fill="#f7d7e4" ${Z}/><path d="M40 28 Q50 40 62 26" fill="none" stroke="#f28fa6" stroke-width="4" stroke-linecap="round"/>`},{kind:"bath-stool",name:"Bath Stool",cat:"furniture",w:110,svg:`${Oa}<ellipse cx="50" cy="58" rx="36" ry="12" fill="#f6e2c4" ${Z}/><ellipse cx="50" cy="54" rx="28" ry="7" fill="#fff6ea"/><path d="M22 64 L16 92 M78 64 L84 92 M36 66 L34 92 M64 66 L66 92" ${Z}/><path d="M18 90 H34 M66 90 H84" ${Z}/>`}],EM=[{kind:"floor-cushion",name:"Floor Cushion",cat:"decor",w:150,h:136,vb:"0 0 130 118",svg:`<ellipse cx="65" cy="112" rx="50" ry="4" fill="#000" opacity=".12"/><ellipse cx="65" cy="68" rx="52" ry="40" fill="#f28fa6" ${Z}/><ellipse cx="65" cy="58" rx="40" ry="24" fill="#f7d7e4"/><path d="M38 64 Q65 82 92 64" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"story-pillow",name:"Story Pillow",cat:"decor",w:120,h:100,vb:"0 0 110 92",svg:`<ellipse cx="55" cy="86" rx="40" ry="4" fill="#000" opacity=".12"/><rect x="14" y="28" width="82" height="52" rx="18" fill="#a8d4ea" ${Z}/><path d="M55 40 l6 12 13 2 -10 8 2 13 -11 -7 -11 7 2 -13 -10 -8 13 -2 z" fill="#f7d27a" ${Z}/>`},{kind:"berry-basket",name:"Berry Basket",cat:"food",w:100,svg:`${Oa}<path d="M22 48 H78 L70 88 H30 Z" fill="#f3d2b5" ${Z}/><path d="M30 58 H70 M32 70 H68 M34 80 H66" ${Z}/><circle cx="40" cy="40" r="10" fill="#f28fa6" ${Z}/><circle cx="58" cy="36" r="10" fill="#c94b6a" ${Z}/><circle cx="70" cy="48" r="8" fill="#b9a0dc" ${Z}/><path d="M34 36 Q40 28 46 36" fill="none" stroke="#7dce8a" stroke-width="3"/>`},{kind:"ribbon-tray",name:"Ribbon Tray",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`<ellipse cx="70" cy="84" rx="52" ry="4" fill="#000" opacity=".12"/><rect x="16" y="40" width="108" height="36" rx="12" fill="#fff" ${Z}/><rect x="22" y="46" width="96" height="22" rx="8" fill="#f7d7e4"/><rect x="36" y="28" width="16" height="22" rx="5" fill="#a8d4ea" ${Z}/><rect x="58" y="22" width="14" height="28" rx="5" fill="#f7d27a" ${Z}/><path d="M96 24 Q110 16 112 32 Q100 28 104 40 Q92 34 96 24 Z" fill="#f28fa6" ${Z}/>`}],Te="#5a3d5c",S=`stroke="${Te}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,ho=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${Te}"/><circle cx="${t}" cy="${n}" r="3" fill="${Te}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,va=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,Ce='<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>',wn=[{kind:"sofa",name:"Sofa",cat:"furniture",w:260,svg:`${Ce}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${S}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${S}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${S}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${S}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${S}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${Te}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${Te}"/>`},{kind:"armchair",name:"Armchair",cat:"furniture",w:150,svg:`${Ce}<rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${S}/><rect x="6" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${S}/><rect x="72" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${S}/><rect x="24" y="58" width="52" height="24" rx="10" fill="#b8e0f2" ${S}/><rect x="20" y="86" width="6" height="10" rx="2" fill="${Te}"/><rect x="74" y="86" width="6" height="10" rx="2" fill="${Te}"/>`},{kind:"bed",name:"Bed",cat:"furniture",w:300,svg:`${Ce}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${S}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${S}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${S}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${S}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${S}/>`},{kind:"table",name:"Table",cat:"furniture",w:200,svg:`${Ce}<rect x="4" y="30" width="92" height="14" rx="7" fill="#f4a261" ${S}/><rect x="14" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${S}/><rect x="76" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${S}/><path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".5"/>`},{kind:"chair",name:"Chair",cat:"furniture",w:100,svg:`${Ce}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${S}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${S}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${S}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${S}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/>`},{kind:"lamp",name:"Lamp",cat:"furniture",w:90,svg:`${Ce}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${S}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${S}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${S}/><circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>`},{kind:"fridge",name:"Fridge",cat:"furniture",w:150,svg:`${Ce}<rect x="16" y="4" width="68" height="90" rx="14" fill="#bde0fe" ${S}/><path d="M16 38 H84" ${S}/><rect x="70" y="14" width="5" height="16" rx="2" fill="${Te}"/><rect x="70" y="46" width="5" height="22" rx="2" fill="${Te}"/><circle cx="32" cy="22" r="5" fill="#ff8fab" ${S}/><rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${S}/>`},{kind:"stove",name:"Stove",cat:"furniture",w:170,svg:`${Ce}<rect x="8" y="26" width="84" height="68" rx="12" fill="#ffadad" ${S}/><rect x="8" y="18" width="84" height="14" rx="6" fill="#ffd6a5" ${S}/><rect x="20" y="46" width="60" height="36" rx="8" fill="#5a3d5c" opacity=".85"/><rect x="26" y="52" width="48" height="8" rx="4" fill="#fff" opacity=".25"/><circle cx="22" cy="38" r="3" fill="${Te}"/><circle cx="36" cy="38" r="3" fill="${Te}"/><circle cx="78" cy="38" r="3" fill="${Te}"/>`},{kind:"bookshelf",name:"Shelf",cat:"furniture",w:170,svg:`${Ce}<rect x="10" y="4" width="80" height="90" rx="10" fill="#d4a373" ${S}/><path d="M10 34 H90 M10 64 H90" ${S}/><rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${S}/><rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${S}/><rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${S}/><rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${S}/><rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${S}/><circle cx="34" cy="80" r="8" fill="#ffadad" ${S}/>`},{kind:"tub",name:"Bathtub",cat:"furniture",w:240,svg:`${Ce}<circle cx="30" cy="40" r="7" fill="#bde0fe" ${S}/><circle cx="44" cy="34" r="9" fill="#e0f2ff" ${S}/><circle cx="60" cy="40" r="7" fill="#bde0fe" ${S}/><path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${S}/><rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${S}/><rect x="22" y="88" width="8" height="8" rx="2" fill="${Te}"/><rect x="70" y="88" width="8" height="8" rx="2" fill="${Te}"/>`},{kind:"rug",name:"Rug",cat:"decor",w:320,svg:`<ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${S}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${S}/><ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${S}/>`},{kind:"picture",name:"Picture",cat:"decor",w:130,wall:!0,svg:`<rect x="10" y="20" width="80" height="64" rx="8" fill="#ffd166" ${S}/><rect x="18" y="28" width="64" height="48" rx="4" fill="#bde0fe"/><circle cx="66" cy="40" r="7" fill="#fff3b0"/><path d="M18 76 L38 50 L52 64 L62 54 L82 76 Z" fill="#90e0a8" ${S}/>`},{kind:"window",name:"Window",cat:"decor",w:180,wall:!0,svg:`<rect class="winGlass" x="12" y="8" width="76" height="76" rx="38" fill="#a2d2ff" ${S}/><g class="winDay"><circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/></g><g class="winNight"><circle cx="62" cy="28" r="7" fill="#fff6d8"/><circle cx="28" cy="24" r="1.4" fill="#fff"/><circle cx="44" cy="20" r="1.1" fill="#fff"/><circle cx="70" cy="42" r="1.2" fill="#fff"/><circle cx="36" cy="46" r="1" fill="#fff"/></g><path d="M50 8 V84 M12 50 H88" ${S}/><path d="M4 8 Q20 40 10 90 M96 8 Q80 40 90 90" stroke="#ff8fab" stroke-width="9" fill="none" stroke-linecap="round"/>`},{kind:"clock",name:"Clock",cat:"decor",w:90,wall:!0,svg:`<circle cx="50" cy="50" r="38" fill="#fff" ${S}/><circle cx="50" cy="50" r="30" fill="#fff3b0"/><path d="M50 50 V28 M50 50 L64 58" ${S}/><circle cx="50" cy="50" r="3" fill="${Te}"/>${va(30,70,66)}`},{kind:"stars",name:"Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M30 20 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffd166" ${S}/><path d="M70 40 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#ffadad" ${S}/><path d="M40 66 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#a2d2ff" ${S}/>`},{kind:"balloon",name:"Balloons",cat:"decor",w:110,svg:`<path d="M38 52 Q44 74 50 96 M64 46 Q58 72 50 96" stroke="${Te}" stroke-width="2" fill="none"/><ellipse cx="36" cy="32" rx="18" ry="22" fill="#ff8fab" ${S}/><ellipse cx="66" cy="28" rx="18" ry="22" fill="#a2d2ff" ${S}/><ellipse cx="30" cy="24" rx="4" ry="7" fill="#fff" opacity=".6"/>`},{kind:"teddy",name:"Teddy",cat:"decor",w:100,svg:`${Ce}<circle cx="26" cy="22" r="10" fill="#d4a373" ${S}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${S}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${S}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${S}/>${ho(40,60,36)}<ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/><circle cx="50" cy="46" r="2.5" fill="${Te}"/>${va(32,68,46)}`},{kind:"ball",name:"Ball",cat:"decor",w:70,svg:`${Ce}<circle cx="50" cy="58" r="36" fill="#ffd166" ${S}/><path d="M18 46 Q50 66 82 46 M26 82 Q50 60 74 82" stroke="#ff7096" stroke-width="7" fill="none"/>`},{kind:"tv",name:"TV",cat:"decor",w:170,svg:`${Ce}<rect x="6" y="14" width="88" height="62" rx="14" fill="#c9a0dc" ${S}/><rect x="16" y="22" width="68" height="46" rx="8" fill="#a2d2ff"/><path d="M30 6 L44 14 M70 6 L56 14" ${S}/><rect x="36" y="78" width="28" height="16" rx="4" fill="#b388d6" ${S}/>${ho(42,58,42)}<path d="M44 52 q6 5 12 0" ${S} fill="none"/>`},{kind:"plant",name:"Plant",cat:"plants",w:110,svg:`${Ce}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${S} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${S} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${S}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${S}/><rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${S}/>`},{kind:"cactus",name:"Cactus",cat:"plants",w:80,svg:`${Ce}<rect x="36" y="12" width="28" height="64" rx="14" fill="#80ed99" ${S}/><path d="M36 50 H24 a8 8 0 0 1 -8 -8 V34" fill="none" stroke="${Te}" stroke-width="3.5"/><rect x="12" y="26" width="12" height="22" rx="6" fill="#80ed99" ${S}/><circle cx="50" cy="12" r="6" fill="#ff8fab" ${S}/>${ho(44,56,40)}<path d="M28 74 H72 L66 96 H34 Z" fill="#c9a0dc" ${S}/>`},{kind:"flowers",name:"Flowers",cat:"plants",w:90,svg:`${Ce}<path d="M50 70 V30 M50 60 Q30 50 30 30 M50 60 Q70 50 70 30" stroke="#52b788" stroke-width="4" fill="none"/><circle cx="50" cy="26" r="10" fill="#ff8fab" ${S}/><circle cx="30" cy="28" r="9" fill="#ffd166" ${S}/><circle cx="70" cy="28" r="9" fill="#a2d2ff" ${S}/><circle cx="50" cy="26" r="3" fill="#fff"/><path d="M32 66 H68 L62 96 H38 Z" fill="#a2d2ff" ${S}/>`},{kind:"tree",name:"Mini Tree",cat:"plants",w:140,svg:`${Ce}<rect x="44" y="54" width="12" height="30" rx="4" fill="#b07d54" ${S}/><circle cx="50" cy="36" r="30" fill="#52b788" ${S}/><circle cx="38" cy="30" r="5" fill="#ff8fab"/><circle cx="62" cy="40" r="5" fill="#ff8fab"/><circle cx="52" cy="22" r="5" fill="#ff8fab"/><path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${S}/>`},{kind:"cake",name:"Cake",cat:"food",w:100,svg:`<rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${S}/><path d="M16 58 q8 10 17 0 q8 10 17 0 q8 10 17 0 q8 10 17 0" fill="#fff" ${S}/><rect x="46" y="28" width="8" height="22" rx="3" fill="#a2d2ff" ${S}/><path d="M50 14 q6 8 0 12 q-6 -4 0 -12" fill="#ffd166" ${S}/><ellipse cx="50" cy="92" rx="40" ry="5" fill="#fff" ${S}/>`},{kind:"apple",name:"Apple",cat:"food",w:60,svg:`<path d="M50 30 C20 18 8 50 22 74 C32 92 44 90 50 86 C56 90 68 92 78 74 C92 50 80 18 50 30 Z" fill="#ff6b6b" ${S}/><path d="M50 30 Q52 16 58 10" ${S} fill="none"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#80ed99" ${S} transform="rotate(-20 64 18)"/><ellipse cx="34" cy="46" rx="5" ry="9" fill="#fff" opacity=".5"/>`},{kind:"donut",name:"Donut",cat:"food",w:70,svg:`<circle cx="50" cy="58" r="36" fill="#e9c46a" ${S}/><path d="M18 52 Q20 26 50 24 Q80 26 82 52 Q76 62 66 56 Q56 66 46 58 Q34 66 24 58 Z" fill="#ff8fab" ${S}/><circle cx="50" cy="52" r="10" fill="#fff" ${S}/><rect x="30" y="36" width="6" height="3" rx="1.5" fill="#a2d2ff" transform="rotate(30 33 37)"/><rect x="64" y="38" width="6" height="3" rx="1.5" fill="#ffd166"/><rect x="56" y="30" width="6" height="3" rx="1.5" fill="#80ed99" transform="rotate(-30 59 31)"/>`},{kind:"pizza",name:"Pizza",cat:"food",w:80,svg:`<path d="M10 20 Q50 6 90 20 L50 94 Z" fill="#ffd166" ${S}/><path d="M10 20 Q50 6 90 20 L86 28 Q50 16 14 28 Z" fill="#e9a96a" ${S}/><circle cx="42" cy="38" r="7" fill="#ff6b6b" ${S}/><circle cx="62" cy="44" r="6" fill="#ff6b6b" ${S}/><circle cx="50" cy="62" r="6" fill="#ff6b6b" ${S}/>`},{kind:"juice",name:"Juice",cat:"food",w:55,svg:`<path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${S}/><path d="M27 44 H73 L70 92 H30 Z" fill="#ffb347"/><path d="M24 26 H76 L70 92 H30 Z" fill="none" ${S}/><path d="M58 30 L66 4" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="60" r="4" fill="#fff" opacity=".6"/>`},{kind:"cat",name:"Toy cat",cat:"pets",w:110,svg:`${Ce}<path d="M78 80 Q98 70 90 50" stroke="#ffb347" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="30" ry="20" fill="#ffb347" ${S}/><path d="M22 30 L26 8 L40 22 M78 30 L74 8 L60 22" fill="#ffb347" ${S}/><circle cx="50" cy="42" r="28" fill="#ffc46b" ${S}/>${ho(40,60,40)}<path d="M46 50 q4 4 8 0" ${S} fill="none"/>${va(32,68,50)}`},{kind:"dog",name:"Puppy",cat:"pets",w:120,svg:`${Ce}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#f5ebe0" ${S}/><circle cx="50" cy="42" r="28" fill="#fff" ${S}/><ellipse cx="22" cy="44" rx="10" ry="18" fill="#b07d54" ${S}/><ellipse cx="78" cy="44" rx="10" ry="18" fill="#b07d54" ${S}/><circle cx="60" cy="34" r="8" fill="#e6b88a" opacity=".7"/>${ho(40,60,40)}<ellipse cx="50" cy="52" rx="5" ry="4" fill="${Te}"/><path d="M50 56 v6" ${S}/>`},{kind:"bunny",name:"Bunny",cat:"pets",w:90,svg:`${Ce}<ellipse cx="36" cy="22" rx="8" ry="20" fill="#fff" ${S}/><ellipse cx="64" cy="22" rx="8" ry="20" fill="#fff" ${S}/><ellipse cx="36" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="64" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="50" cy="76" rx="28" ry="20" fill="#fff" ${S}/><circle cx="50" cy="52" r="22" fill="#fff" ${S}/>${ho(42,58,50)}<path d="M47 58 l3 3 3 -3" ${S} fill="none"/>${va(36,64,58)}`},{kind:"fish",name:"Fish Bowl",cat:"pets",w:100,svg:`${Ce}<circle cx="50" cy="54" r="40" fill="#cdeffd" ${S}/><path d="M14 46 H86" stroke="#8ecae6" stroke-width="3"/><path d="M60 64 l14 -8 v16 z" fill="#ff9f68" ${S}/><ellipse cx="46" cy="64" rx="16" ry="11" fill="#ffb347" ${S}/><circle cx="40" cy="62" r="2.5" fill="${Te}"/><circle cx="32" cy="38" r="3" fill="#fff" opacity=".8"/><rect x="24" y="10" width="52" height="8" rx="4" fill="#cdeffd" ${S}/>`},{kind:"kennel",name:"Dog Kennel",cat:"pets",w:210,h:175,holdable:!1,vb:"0 0 120 100",svg:`<ellipse cx="60" cy="97" rx="48" ry="3.2" fill="#000" opacity=".12"/><path d="M14 50 L60 12 L106 50 Z" fill="#ff8fab" ${S}/><path d="M28 46 L60 22 L92 46 Z" fill="#ffd6e4"/><rect x="20" y="46" width="80" height="50" rx="10" fill="#fff6ea" ${S}/><path d="M20 56 H100" stroke="#ffc2d4" stroke-width="7"/><path d="M34 96 V58 Q60 36 86 58 V96 Z" fill="#f3e4ff" ${S}/><path d="M40 96 V64 Q60 46 80 64 V96 Z" fill="#ffe8c7"/><circle cx="86" cy="64" r="8" fill="#bde0fe" ${S}/><circle cx="84" cy="62" r="2.2" fill="#fff" opacity=".9"/><path d="M28 62 l2.4 2.4 2.4-2.4 2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4z" fill="#ff8fab" ${S}/><circle cx="30" cy="90" r="3.2" fill="#fff" ${S}/><rect x="32" y="88.4" width="14" height="3.4" rx="1.7" fill="#fff" ${S}/><circle cx="48" cy="90" r="3.2" fill="#fff" ${S}/>`},{kind:"cat-tower",name:"Cat Tower",cat:"pets",w:150,h:225,holdable:!1,vb:"0 0 100 150",svg:`<ellipse cx="50" cy="146" rx="36" ry="3.4" fill="#000" opacity=".12"/><rect x="44" y="30" width="12" height="104" rx="6" fill="#c9a0dc" ${S}/><ellipse cx="50" cy="136" rx="34" ry="10" fill="#ffc8dd" ${S}/><ellipse cx="50" cy="132" rx="26" ry="6" fill="#fff6ea"/><ellipse cx="50" cy="102" rx="30" ry="8" fill="#bde0fe" ${S}/><ellipse cx="50" cy="98" rx="22" ry="4" fill="#fff" opacity=".8"/><ellipse cx="50" cy="64" rx="28" ry="8" fill="#ffd166" ${S}/><ellipse cx="50" cy="60" rx="20" ry="4" fill="#fff6d0"/><circle cx="50" cy="22" r="8" fill="#ff8fab" ${S}/><circle cx="47" cy="19" r="2.2" fill="#fff" opacity=".75"/><g class="dangle"><circle cx="22" cy="126" r="8" fill="#ffb3c6" ${S}/><path d="M22 126 q12 5 7 16" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/></g><circle cx="80" cy="92" r="3.4" fill="#ffd166" ${S}/>`},{kind:"vanity",name:"Vanity",cat:"furniture",w:230,svg:`${Ce}<ellipse cx="50" cy="26" rx="24" ry="22" fill="#fff" ${S}/><ellipse cx="50" cy="26" rx="18" ry="16" fill="#cdeffd"/><path d="M38 18 l6 -6 M42 26 l10 -10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="12" r="3" fill="#ffd166" ${S}/><circle cx="74" cy="12" r="3" fill="#ffd166" ${S}/><rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${S}/><rect x="10" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${S}/><rect x="62" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${S}/><circle cx="24" cy="75" r="3" fill="${Te}"/><circle cx="76" cy="75" r="3" fill="${Te}"/><rect x="12" y="90" width="6" height="7" rx="2" fill="${Te}"/><rect x="82" y="90" width="6" height="7" rx="2" fill="${Te}"/>`},{kind:"stool",name:"Vanity Stool",cat:"furniture",w:90,svg:`${Ce}<ellipse cx="50" cy="48" rx="34" ry="14" fill="#c9a0dc" ${S}/><ellipse cx="50" cy="44" rx="28" ry="9" fill="#e4ccf2"/><path d="M28 58 L22 94 M72 58 L78 94 M50 62 V94" ${S}/><ellipse cx="50" cy="78" rx="22" ry="4" fill="none" ${S}/>`},{kind:"perfume",name:"Perfume",cat:"decor",w:50,svg:`<rect x="40" y="8" width="20" height="14" rx="5" fill="#ffd166" ${S}/><rect x="46" y="20" width="8" height="10" fill="#fff" ${S}/><path d="M20 50 Q20 30 50 30 Q80 30 80 50 V80 Q80 94 66 94 H34 Q20 94 20 80 Z" fill="#ff8fab" ${S}/><ellipse cx="36" cy="52" rx="5" ry="10" fill="#fff" opacity=".6"/><path d="M50 56 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#fff" opacity=".8"/>`},{kind:"polish",name:"Nail Polish",cat:"decor",w:40,svg:`<rect x="38" y="4" width="24" height="40" rx="8" fill="${Te}"/><path d="M24 54 Q24 42 36 42 H64 Q76 42 76 54 V84 Q76 96 64 96 H36 Q24 96 24 84 Z" fill="#b388d6" ${S}/><ellipse cx="38" cy="62" rx="5" ry="12" fill="#fff" opacity=".55"/>`},{kind:"hairdryer",name:"Hair Dryer",cat:"decor",w:90,svg:`<path d="M60 52 L70 92 Q70 96 64 96 H58 Q52 96 52 90 L46 56 Z" fill="#a2d2ff" ${S}/><rect x="6" y="20" width="62" height="40" rx="20" fill="#bde0fe" ${S}/><ellipse cx="82" cy="40" rx="12" ry="20" fill="#ffc8dd" ${S}/><ellipse cx="82" cy="40" rx="6" ry="11" fill="#fff" ${S}/><circle cx="24" cy="40" r="7" fill="#fff" opacity=".7"/>`},{kind:"mirror",name:"Mirror",cat:"decor",w:120,wall:!0,svg:`<path d="M50 6 C74 6 88 24 88 50 C88 76 72 94 50 94 C28 94 12 76 12 50 C12 24 26 6 50 6 Z" fill="#ffd166" ${S}/><ellipse cx="50" cy="50" rx="30" ry="36" fill="#e0f4ff" ${S}/><path d="M36 34 l10 -10 M36 46 l20 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ff8fab" ${S}/>`}],ms={sofa:["living"],armchair:["living"],lamp:["living","bedroom"],tv:["living"],rug:["living","bedroom"],picture:["living","bedroom"],bookshelf:["living","bedroom"],bed:["bedroom"],teddy:["bedroom"],stars:["bedroom"],tub:["bedroom"],balloon:["any"],clock:["any"],window:["any"],ball:["any"],vanity:["salon"],stool:["salon"],perfume:["salon"],polish:["salon"],hairdryer:["salon"],mirror:["salon","bedroom"],fridge:["kitchen"],stove:["kitchen"],table:["kitchen","living"],chair:["kitchen","living"]};for(const e of Vg)ms[e.kind]=["nursery"];for(const e of ta)ms[e.kind]=["backyard"];for(const e of qg)ms[e.kind]=["bathroom"];ms["floor-cushion"]=["living"];ms["story-pillow"]=["bedroom"];ms["berry-basket"]=["kitchen"];ms["ribbon-tray"]=["salon"];wn.push(...Vg,...ta,...qg,...EM);for(const e of wn)e.rooms=ms[e.kind]??(["food"].includes(e.cat)?["kitchen"]:["any"]);const SM=new Set(["rug","tv","tree"]);for(const e of wn)e.holdable??=!e.wall&&e.cat!=="furniture"&&e.w<=150&&!SM.has(e.kind);const CM=[{kind:"ranch-egg",name:"Fresh Egg",cat:"ranch",w:50,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M50 30 C70 30 80 62 80 74 C80 90 66 96 50 96 C34 96 20 90 20 74 C20 62 30 30 50 30 Z" fill="#fff6e6" ${S}/><ellipse cx="40" cy="52" rx="6" ry="9" fill="#fff"/>`},{kind:"ranch-carrot",name:"Garden Carrot",cat:"ranch",w:70,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M30 40 L78 34 L40 96 Z" fill="#ff922b" ${S}/><path d="M44 50 l10 -2 M42 64 l8 -2 M44 78 l6 -1" ${S}/><path d="M72 36 Q80 14 92 14 M72 36 Q68 14 76 4 M72 36 Q90 30 96 36" fill="none" stroke="#40c057" stroke-width="7" stroke-linecap="round"/>`},{kind:"ranch-bouquet",name:"Ranch Flowers",cat:"ranch",w:80,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M50 94 L40 50 M50 94 L50 44 M50 94 L62 50" stroke="#40c057" stroke-width="5" stroke-linecap="round"/><path d="M36 78 L64 78 L56 96 L44 96 Z" fill="#c9a0dc" ${S}/>${[[38,40,"#ff8fab"],[50,30,"#ffd43b"],[64,40,"#74c0fc"],[44,52,"#ff922b"],[58,52,"#c9a0dc"]].map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="9" fill="${n}" ${S}/><circle cx="${e}" cy="${t}" r="3" fill="#fff3b0"/>`).join("")}`}];wn.push(...I7,...Tb,...CM);const ge=Object.fromEntries(wn.map(e=>[e.kind,e])),_i=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),je=e=>e.h??e.w,qd=e=>e.img?`<img class="packimg" src="${_i(e.img)}" alt="${_i(e.name)}" draggable="false" />`:`<svg viewBox="${e.vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${e.svg}</svg>`,mn=(e,t=!1)=>{const n=Bo()?Gs(e.kind):void 0;if(!n)return qd(e);const s=t&&!e.wall?'<i class="artshade" aria-hidden="true"></i>':"",o=e.kind==="window"?'<i class="artnight" aria-hidden="true"></i>':"";return`${s}${o}<img class="packimg artimg" data-kind="${_i(e.kind)}" src="${_i(n)}" alt="${_i(e.name)}" draggable="false" />`},PM='<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="22" width="56" height="56" rx="14" fill="#fff6ea" stroke="#5a3d5c" stroke-width="4"/></svg>',TM=(e,t)=>e.img&&/\.webp(?:$|\?)/i.test(e.img)?PM:qd(e);let Ep=!1;function RM(){Ep||typeof window>"u"||(Ep=!0,window.addEventListener("error",e=>{const t=e.target;if(!(t instanceof HTMLImageElement)||!t.classList.contains("artimg")||t.dataset.fell==="1")return;const n=ge[t.dataset.kind||""];if(!n)return;t.dataset.fell="1",t.parentElement?.querySelector(".artshade")?.remove(),t.parentElement?.querySelector(".artnight")?.remove();const s=document.createElement("div");s.innerHTML=qd(n);const o=s.firstElementChild;o&&t.replaceWith(o)},!0))}const Sp=new WeakMap;function BM(e){const t=Sp.get(e);if(t)return t;if(!e.complete||!e.naturalWidth)return null;const n=document.createElement("canvas");n.width=e.naturalWidth,n.height=e.naturalHeight;const s=n.getContext("2d",{willReadFrequently:!0});if(!s)return null;try{s.drawImage(e,0,0)}catch{return null}const o=s.getImageData(0,0,n.width,n.height).data;return Sp.set(e,o),o}function AM(e,t,n){const s=e.getBoundingClientRect();if(s.width<1||s.height<1||!e.naturalWidth)return null;let o=(t-s.left)/s.width;const i=(n-s.top)/s.height;e.closest(".flipped")&&(o=1-o);const a=e.naturalWidth,r=e.naturalHeight,l=Math.min(s.width/a,s.height/r),c=a*l,d=r*l,f=(s.width-c)*.5,p=s.height-d,g=(o*s.width-f)/l,b=(i*s.height-p)/l;return g<0||b<0||g>=a||b>=r?null:{x:g,y:b}}function Nd(e,t,n){const s=BM(e),o=s&&AM(e,t,n);if(!s||!o)return!s;const i=Math.floor(o.x),r=(Math.floor(o.y)*e.naturalWidth+i)*4+3;return s[r]>24}function IM(e,t){const n=[];try{for(let s=0;s<12;s++){const o=document.elementFromPoint(e,t);if(!o)return null;const i=o.closest("img.artimg");if(i&&!Nd(i,e,t)){n.push(i),i.style.pointerEvents="none";continue}return o}return null}finally{for(let s=0;s<n.length;s++)n[s].style.pointerEvents=""}}const DM="var(--line)",OM=1.4,pt='fill="#3a1d3c" opacity=".14"',Dc='fill="#3a1d3c" opacity=".22"',Nt={l:[72,172],r:[128,172]},hn={l:[50,233],r:[150,233]},HM={l:[88,238],r:[112,238]};function A(e=3){return`stroke="${DM}" stroke-width="${(e*OM).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"`}function L(e){const n=(Math.round(e*10)/10).toFixed(1);return n.endsWith(".0")?n.slice(0,-2):n}function Oc(e,t,n,s,o){const i=o*Math.PI/180,a=e-n,r=t-s,l=Math.cos(i),c=Math.sin(i);return{x:n+a*l-r*c,y:s+a*c+r*l}}function $i(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=(n>>16&255)*(1-t),i=(n>>8&255)*(1-t),a=(n&255)*(1-t);return"#"+s(o)+s(i)+s(a)}function Cp(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=n>>16&255,i=n>>8&255,a=n&255;return"#"+s(o+(255-o)*t)+s(i+(255-i)*t)+s(a+(255-a)*t)}function Hc(e,t,n,s,o=0){const i=e[0],a=e[1],r=e[0]===t[0]&&e[1]===t[1]?t[0]+.01:t[0],l=t[1],c=r-i,d=l-a,f=Math.hypot(c,d)||1,p=-d/f,g=c/f,b=(i+r)/2+p*o,m=(a+l)/2+g*o,k=n/2,y=s/2,u=(k+y)/2*1.04,w=[i+p*k,a+g*k],_=[r+p*y,l+g*y],P=[r-p*y,l-g*y],x=[i-p*k,a-g*k];return`M${L(w[0])} ${L(w[1])} Q${L(b+p*u)} ${L(m+g*u)} ${L(_[0])} ${L(_[1])} A${L(y)} ${L(y)} 0 0 1 ${L(P[0])} ${L(P[1])} Q${L(b-p*u)} ${L(m-g*u)} ${L(x[0])} ${L(x[1])} A${L(k)} ${L(k)} 0 0 1 ${L(w[0])} ${L(w[1])} Z`}function rl(e,t,n,s,o){const i=[],a=(t-e)/s;for(let r=0;r<s;r++){const l=e+r*a,c=l+a;i.push(`Q${L((l+c)/2)} ${L(n+o)} ${L(c)} ${L(n)}`)}return i.join(" ")}function Wc(e,t,n,s,o,i=0){const a=[];for(let r=0;r<s;r++){const l=i+2*Math.PI*r/s,c=i+2*Math.PI*(r+1)/s,d=(l+c)/2,f=e+n*Math.cos(l),p=t+n*Math.sin(l),g=e+n*Math.cos(c),b=t+n*Math.sin(c),m=e+(n+o)*Math.cos(d),k=t+(n+o)*Math.sin(d);r===0&&a.push(`M${L(f)} ${L(p)}`),a.push(`Q${L(m)} ${L(k)} ${L(g)} ${L(b)}`)}return a.join(" ")+" Z"}function Rn(e,t,n,s){const o=e==="arm"?Nt[t]:HM[t],i=e==="arm"?t==="l"?s.armL:s.armR:t==="l"?s.legL:s.legR,a=e==="leg"?t==="l"?s.legLLift:s.legRLift:0,r=i||a?` transform="translate(0 ${L(-a)}) rotate(${L(i)} ${o[0]} ${o[1]})"`:"";return`<g class="${e} ${t}${e==="arm"?" hang":""}"${r} style="transform-box:view-box;transform-origin:${o[0]}px ${o[1]}px">${n}</g>`}const os="var(--line)";function En(e,t=.8,n=2.2){return e.map(s=>`<path d="${s}" fill="none" stroke="var(--hair-shade)" stroke-width="${n}" stroke-linecap="round" opacity="${t}"/>`).join("")}function fi(e,t=.32){return e.map(n=>`<path d="${n}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${t}"/>`).join("")}function Qn(){return'<path d="M54 72 Q62 44 92 38 Q70 50 63 74 Z" fill="#fff" opacity=".45"/><path d="M60 64 Q70 48 86 42" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".8"/><path d="M104 37 Q130 38 145 58 Q128 46 106 43 Z" fill="#fff" opacity=".3"/><circle cx="72" cy="50" r="2" fill="#fff" opacity=".85"/>'}function Rt(e,t,n){return n?`<path d="${e}" fill="url(#${t}h)"/>`:""}const Pp="M34 112 Q28 28 100 28 Q172 28 166 112 Q164 146 146 156 L54 156 Q36 146 34 112 Z";function zt(e,t){return`<path d="${Pp}" fill="var(--hair)" ${A(3.2)}/>${Rt(Pp,e,t)}`}function Ul(e,t,n,s,o,i,a=10){const r=Wc(e+2,t+3,n,12,7,s+.1),l=Wc(e,t,n-1,12,7,s);let c=`<path d="${r}" fill="var(--hair-shade)" ${A(3.2)}/><path d="${l}" fill="var(--hair)" ${A(3.2)}/>${Rt(l,o,i)}`;for(let d=0;d<a;d++){const f=d*2.5+s,p=(n-6)*Math.sqrt((d+.5)/a),g=e+p*Math.cos(f),b=t+p*Math.sin(f);c+=`<path d="M${L(g-4)} ${L(b+1)} q1 -5 4.5 -4.5 q3.5 1 2.5 4.5" fill="none" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>`,b<t-2&&g<e+6&&(c+=`<path d="M${L(g-2.5)} ${L(b-2.5)} q2 -2 3.5 -1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`)}return c+=`<ellipse cx="${L(e-10)}" cy="${L(t-12)}" rx="6" ry="3.4" fill="#fff" opacity=".55" transform="rotate(-35 ${L(e-10)} ${L(t-12)})"/>`,c+=`<path d="M${L(e-16)} ${L(t-6)} Q${L(e-6)} ${L(t-18)} ${L(e+4)} ${L(t-14)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>`,c}function Os(e,t,n,s=6,o=[],i=7){let a=`<path d="M${e} ${t-6} V${n}" stroke="${os}" stroke-width="${L(2*s+4.6)}" stroke-linecap="round"/><path d="M${e} ${t-6} V${n}" stroke="var(--hair)" stroke-width="${L(2*s)}" stroke-linecap="round"/>`,r=t,l=0;for(;r<n;){const c=l%2?1:-1;a+=`<path d="M${L(e-c)} ${L(r-4)} Q${L(e+c*s*1.05)} ${L(r-2)} ${L(e+c*s*.55)} ${L(r+4)} Q${L(e)} ${L(r+5.5)} ${L(e-c*1.4)} ${L(r+1)}" fill="none" stroke="var(--hair-shade)" stroke-width="1.7" stroke-linecap="round"/>`,c>0&&(a+=`<path d="M${L(e+1)} ${L(r-2)} q2.2 -.5 3 1.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>`),r+=i,l++}for(let c=0;c<o.length;c++){const d=o[c];a+=`<rect x="${L(e-6.2)}" y="${d-4}" width="12.4" height="8" rx="2.6" fill="var(--acc)" stroke="${os}" stroke-width="2"/><rect x="${L(e-4)}" y="${d-2.5}" width="2.6" height="4.5" rx="1" fill="#fff" opacity=".6"/>`}return a+=`<path d="M${e-4} ${n+2} q2 5 4 6 q2 -1 4 -6" fill="var(--hair)" stroke="${os}" stroke-width="2"/>`,a}function ur(e,t,n,s=5.5){let o=`<path d="M${e} ${t} V${n}" stroke="${os}" stroke-width="${L(2*s+4)}" stroke-linecap="round"/><path d="M${e} ${t} V${n}" stroke="var(--hair)" stroke-width="${L(2*s)}" stroke-linecap="round"/>`;for(let i=t+8;i<n;i+=16)o+=`<path d="M${L(e-s*.7)} ${i} Q${e} ${i+5} ${L(e+s*.7)} ${i}" fill="none" stroke="var(--hair-shade)" stroke-width="1.6" opacity=".8"/>`;return o+=`<circle cx="${e}" cy="${n+3}" r="${L(s*.55)}" fill="var(--hair)" stroke="${os}" stroke-width="2"/>`,o}function Vl(e,t,n,s){return`<path d="${e}" fill="var(--hair)" ${A(3)}/>${Rt(e,t,n)}${En(s)}${fi(s.slice(0,2),.45)}`}function go(e,t,n){return`<ellipse cx="${e}" cy="${t}" rx="8" ry="5.5" fill="var(--acc)" ${A(2.4)} transform="rotate(${n} ${e} ${t})"/><ellipse cx="${e-1}" cy="${t-2}" rx="2.4" ry="1.3" fill="#fff" opacity=".6" transform="rotate(${n} ${e-1} ${t-2})"/>`}const qn='<path d="M42 104 Q44 76 70 66 Q86 74 100 58 Q114 74 130 66 Q156 76 158 104" fill="none" stroke="#3a1d3c" stroke-width="9" opacity=".12"/>';function Ng(e){return e==="puffs"||e==="coily"?"puffs":e==="afro"?"afro":e==="braids"?"braids":e==="boxbraids"?"box":e==="locs"?"locs":e==="sidebraid"?"sidebraid":e==="crown"?"crown":e==="pony"?"pony":e==="sidepony"?"sidepony":e==="pigtails"?"pigtails":e==="halfup"?"halfup":e==="buns"?"buns":e==="topbun"?"topbun":e==="lowbun"?"lowbun":e==="long"?"long":e==="wavy"||e==="wavybob"?e==="wavy"?"wavy":"bob":e==="bob"||e==="curlybob"||e==="sidebangs"?"bob":e==="pixie"?"pixie":(e==="bangs"||e==="short")&&e==="bangs"?"bangs":"short"}function WM(e,t,n){const s=Ng(e);if(s==="puffs"){const o=e==="coily"?26:30;return Ul(48,52,o,0,t,n,12)+Ul(152,52,o,.3,t,n,12)+`<path d="M42 112 Q38 48 100 44 Q162 48 158 112 Q154 144 100 146 Q46 144 42 112 Z" fill="var(--hair)" ${A(3.2)}/>`+go(66,68,-35)+go(134,68,35)}if(s==="afro")return Ul(100,78,78,.2,t,n,14);if(s==="braids")return zt(t,n)+Os(34,108,230,5.4,[196])+Os(166,108,230,5.4,[196]);if(s==="box")return zt(t,n)+Os(30,110,228,5,[200],10)+Os(170,110,228,5,[200],10);if(s==="locs")return zt(t,n)+ur(32,112,236)+ur(168,112,236);if(s==="sidebraid")return zt(t,n);if(s==="pony"||s==="sidepony"||s==="halfup"){const o=s==="sidepony"?"M118 78 Q150 70 158 120 Q164 160 150 200 Q136 188 138 160 Q132 120 124 96 Z":"M126 40 Q178 28 180 92 Q184 132 168 168 Q160 196 174 220 Q148 212 145 182 Q140 156 152 124 Q160 90 132 64 Z",i=s==="halfup"?70:s==="sidepony"?86:44;return zt(t,n)+Vl(o,t,n,s==="sidepony"?["M130 96 Q150 120 146 160","M138 110 Q154 140 148 180"]:["M146 56 Q170 88 160 130","M156 66 Q176 100 166 140","M150 150 Q148 180 160 206"])+go(s==="sidepony"?124:128,i,s==="sidepony"?-20:25)}if(s==="pigtails")return zt(t,n)+Vl("M40 100 Q22 120 28 168 Q34 200 48 214 Q58 196 52 160 Q58 124 56 108 Z",t,n,["M40 120 Q32 150 40 184"])+Vl("M160 100 Q178 120 172 168 Q166 200 152 214 Q142 196 148 160 Q142 124 144 108 Z",t,n,["M160 120 Q168 150 160 184"])+go(52,96,20)+go(148,96,-20);if(s==="buns"){let o="";for(const i of[52,148])o+=`<circle cx="${i}" cy="44" r="24" fill="var(--hair)" ${A(3.2)}/>${n?`<circle cx="${i}" cy="44" r="24" fill="url(#${t}h)"/>`:""}`,o+=En([`M${i-14} 48 Q${i-14} 28 ${i} 26 Q${i+16} 30 ${i+14} 48`,`M${i-8} 54 Q${i+8} 56 ${i+12} 48`]),o+=`<path d="M${i-12} 34 Q${i-4} 24 ${i+4} 26" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>`;return o+zt(t,n)}if(s==="topbun")return`<circle cx="100" cy="30" r="26" fill="var(--hair)" ${A(3.2)}/>${n?`<circle cx="100" cy="30" r="26" fill="url(#${t}h)"/>`:""}<path d="M82 28 Q100 12 118 28" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>${En(["M86 36 Q100 24 114 36","M90 42 Q100 34 110 42"])}${zt(t,n)}`;if(s==="lowbun")return zt(t,n)+`<circle cx="100" cy="168" r="22" fill="var(--hair)" ${A(3)}/>${n?`<circle cx="100" cy="168" r="22" fill="url(#${t}h)"/>`:""}${go(100,148,0)}`;if(s==="long"||s==="wavy"){const o=s==="wavy"?"M36 108 Q28 160 40 210 Q52 250 46 286 Q70 270 78 230 Q60 180 58 140 Q52 120 48 108 Z M164 108 Q172 160 160 210 Q148 250 154 286 Q130 270 122 230 Q140 180 142 140 Q148 120 152 108 Z":"M38 110 Q30 170 36 240 Q42 280 34 300 L70 292 Q64 240 66 180 Q62 140 56 112 Z M162 110 Q170 170 164 240 Q158 280 166 300 L130 292 Q136 240 134 180 Q138 140 144 112 Z";return`<path d="${o}" fill="var(--hair)" ${A(3)}/>${Rt(o,t,n)}${zt(t,n)}`}if(s==="bob"){const o=e==="curlybob"?"M30 120 Q24 170 48 196 Q70 210 100 206 Q130 210 152 196 Q176 170 170 120 Q150 150 100 156 Q50 150 30 120 Z":"M32 116 Q26 168 50 190 Q78 204 100 200 Q122 204 150 190 Q174 168 168 116 Q150 148 100 154 Q50 148 32 116 Z";return`<path d="${o}" fill="var(--hair)" ${A(3.2)}/>${Rt(o,t,n)}${zt(t,n)}`}return zt(t,n)}function UM(e,t,n){const s=Ng(e),o='<path d="M100 34 V56" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>';if(s==="puffs"||s==="braids"||s==="box"||s==="locs"||s==="afro"||s==="bangs"){const a=s==="afro"?"M48 100 Q52 48 100 40 Q148 48 152 100 Q140 78 100 70 Q60 78 48 100 Z":s==="bangs"?"M40 108 Q36 40 100 34 Q164 40 160 108 L150 96 Q130 108 100 100 Q70 108 50 96 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q154 74 130 62 Q112 70 100 52 Q88 70 70 62 Q46 74 40 106 Z";let r=qn+`<path d="${a}" fill="var(--hair)" ${A(3.2)}/>${Rt(a,t,n)}${o}`;return r+=En(["M84 44 Q70 52 60 70","M116 44 Q130 52 140 70","M92 40 Q80 48 74 58","M108 40 Q120 48 126 58","M76 42 Q58 56 52 82","M124 42 Q142 56 148 82"]),r+=fi(["M90 36 Q78 42 70 52","M112 36 Q124 42 132 52"]),s==="puffs"?(r+=`<path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="${os}" stroke-width="7" stroke-linecap="round"/><path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`,r+=`<path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="${os}" stroke-width="7" stroke-linecap="round"/><path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`):s==="braids"||s==="box"?(r+=Os(48,114,200,5,[156],s==="box"?10:7),r+=Os(152,114,200,5,[156],s==="box"?10:7)):s==="locs"&&(r+=ur(46,116,210,4.6)+ur(154,116,210,4.6)),r+Qn()}if(s==="sidebraid"){const a="M40 108 Q36 36 100 32 Q164 36 160 100 Q140 78 100 70 Q70 80 40 108 Z";return qn+`<path d="${a}" fill="var(--hair)" ${A(3.2)}/>${Rt(a,t,n)}${En(["M70 46 Q86 60 96 74","M120 44 Q136 58 146 74"])}${Os(150,100,210,5.6,[168],7)}${Qn()}`}if(s==="crown"){const a="M40 106 Q36 36 100 32 Q164 36 160 106 Q150 80 100 74 Q50 80 40 106 Z";let r="";for(let l=0;l<7;l++){const c=58+l*14;r+=`<path d="M${c} 58 Q${c+7} 46 ${c+14} 58" fill="none" stroke="var(--hair-shade)" stroke-width="3.2" stroke-linecap="round"/>`}return qn+`<path d="${a}" fill="var(--hair)" ${A(3.2)}/>${Rt(a,t,n)}${r}${Qn()}`}if(s==="pony"||s==="sidepony"||s==="halfup"||s==="pigtails"){const a=s==="sidepony"?"M40 108 Q34 36 100 32 Q166 34 160 108 Q150 86 120 78 Q90 90 60 74 Q48 90 40 108 Z":"M40 108 Q34 34 100 32 Q166 34 160 108 Q156 84 144 72 Q128 86 104 80 Q86 78 72 68 Q60 84 48 84 Q42 94 40 108 Z";let r=qn+`<path d="${a}" fill="var(--hair)" ${A(3.2)}/>${Rt(a,t,n)}`;return r+=`<path d="M40 104 Q36 120 44 132 Q46 116 50 106 Z" fill="var(--hair)" ${A(2.4)}/><path d="M160 104 Q164 120 156 132 Q154 116 150 106 Z" fill="var(--hair)" ${A(2.4)}/>`,r+=En(["M70 46 Q90 60 104 74","M128 46 Q140 60 146 74","M96 40 Q110 56 116 66"]),r+=fi(["M76 42 Q92 52 100 62"]),r+Qn()}if(s==="buns"||s==="topbun"||s==="lowbun"){const a=s==="topbun"?"M44 108 Q40 50 100 46 Q160 50 156 108 Q148 82 100 74 Q52 82 44 108 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q152 80 138 70 Q126 80 112 76 Q104 82 100 74 Q96 82 88 76 Q74 80 62 70 Q48 80 40 106 Z";let r=qn+`<path d="${a}" fill="var(--hair)" ${A(3.2)}/>${Rt(a,t,n)}`;if(r+=En(["M80 42 Q72 56 68 68","M120 42 Q128 56 132 68","M100 36 Q98 56 100 70","M90 38 Q84 56 86 72","M110 38 Q116 56 114 72"]),r+=fi(["M86 38 Q80 46 78 54","M114 38 Q120 46 122 54"]),s==="buns")for(const[l,c]of[[42,1],[158,-1]]){const d=`M${l} 100 q${-8*c} 14 ${-2*c} 24 q${5*c} 8 ${-1*c} 14`;r+=`<path d="${d}" fill="none" stroke="${os}" stroke-width="7" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`}return r+Qn()}if(s==="long"||s==="wavy"||s==="bob"){const a=e==="sidebangs"||e==="wavybob"?"M38 108 Q34 40 70 36 Q100 34 112 48 Q90 70 48 78 Q36 90 38 108 Z M112 48 Q140 36 164 50 Q166 100 150 108 Q130 80 112 70 Z":"M40 108 Q34 36 100 32 Q166 36 160 108 Q152 78 128 68 Q112 78 100 60 Q88 78 72 68 Q48 78 40 108 Z";return qn+`<path d="${a}" fill="var(--hair)" ${A(3.2)}/>${Rt(a,t,n)}${En(["M78 46 Q68 64 64 80","M122 46 Q132 64 136 80","M100 38 V64"])}${fi(["M88 40 Q80 50 76 60"])}${Qn()}`}if(s==="pixie"){const a="M48 104 Q44 48 100 40 Q140 46 150 78 Q156 100 140 108 Q120 86 100 90 Q70 84 52 104 Z";return qn+`<path d="${a}" fill="var(--hair)" ${A(3.2)}/>${Rt(a,t,n)}${En(["M70 56 Q86 70 96 84","M118 52 Q132 66 138 82"])}${Qn()}`}const i="M46 106 Q42 46 100 38 Q158 46 154 106 Q140 80 100 76 Q60 80 46 106 Z";return qn+`<path d="${i}" fill="var(--hair)" ${A(3.2)}/>${Rt(i,t,n)}${o}${Qn()}`}const Ao="var(--line)";function Zd(e){return Math.abs(e.legL)>=40||Math.abs(e.legR)>=40}function Ys(e,t,n,s=[]){const o=s.map(i=>`<path d="${i}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`).join("");return(n?`<path d="${e}" fill="url(#${t}c)"/>`:"")+o}function Uc(e,t,n){const s=(n+7).toFixed(1);return`<path d="${e}" fill="none" stroke="${Ao}" stroke-width="${s}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function Fd(e,t,n){return Rn("arm",e,t,n).replace('class="arm ','class="arm sleeve ')}function Ha(e,t,n=!1){const[s,o]=Nt[e],i=e==="l"?-1:1;let a=Uc(`M${s} ${o} L${s+7*i} ${o+20}`,"var(--top)",22);return n&&(a+=`<path d="M${s+7*i-12} ${o+17} H${s+7*i+12}" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round" opacity=".9" transform="rotate(${-18*i} ${s+7*i} ${o+17})"/>`),Fd(e,a,t)}function xi(e,t,n=!0){const[s,o]=Nt[e],[i,a]=hn[e],r=e==="l"?-1:1,l=(s+i)/2+6*r;let c=Uc(`M${s-2*r} ${o-2} Q${l} ${(o+a)/2-6} ${i-r} ${a-16}`,"var(--top)",21);return n&&(c+=Uc(`M${i-3*r} ${a-17} L${i-r} ${a-13}`,"var(--top-trim)",20)),Fd(e,c,t)}function Vc(e,t,n=!1){const[s,o]=Nt[e],i=e==="l"?-1:1,a=s+4*i,r=o+8;let l=`<path d="${Wc(a,r,13,9,3.2)}" fill="var(--top)" ${A(2.8)}/>`;return l+=`<ellipse cx="${a-4*i}" cy="${r-5}" rx="5" ry="3" fill="#fff" opacity=".45"/>`,n&&(l+=`<path d="M${a-11} ${r+13} ${rl(a-11,a+11,r+13,4,3)}" fill="none" stroke="#fff" stroke-width="2.4"/>`),Fd(e,l,t)}function qt(e,t){return e("l",t)+e("r",t)}const Tp="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 228 Q100 236 64 228 Z";function Ss(e,t,n,s,o,i,a="",r=[],l=!1){const c=`<path d="${t}" fill="var(--top)" ${A(3)}/>${Ys(t,s,o,r)}${a}`;return`<g class="shirt" data-hem="${i}">${l?c+n:n+c}</g>`}function VM(e,t,n,s,o){if(t.dress)return"";const i=t.top;if(i==="hoodie"){const l="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L139 230 Q100 240 61 230 Z",c=`<path d="M120 162 Q132 164 134 170 L139 230 Q128 233 123 233 Z" ${pt}/><path d="M72 172 Q76 164 86 163" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".38"/><path d="M78 159 Q100 182 122 159 Q120 152 100 152 Q80 152 78 159 Z" fill="var(--top-trim)" ${A(2.8)}/><path d="M92 172 v18 M108 172 v18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="92" cy="191" r="2.6" fill="#fff" ${A(1.8)}/><circle cx="108" cy="191" r="2.6" fill="#fff" ${A(1.8)}/><path d="M78 202 H122 L127 222 H73 Z" fill="var(--top)" ${A(2.6)}/><path d="M78 202 H122 L124 210 H76 Z" ${pt}/><path d="M61 226 Q100 236 139 226 L139 234 Q100 244 61 234 Z" fill="var(--top-trim)" ${A(2.8)}/>`;return Ss(e,l,qt(xi,e),n,s,o,c,["M74 196 q-2 12 2 22","M126 190 q2 14 0 26"])}if(i==="stripes"||i==="jersey"){const l="M68 168 Q74 158 92 158 H108 Q126 158 132 168 L135 232 Q100 238 65 232 Z",c=`${n}st`,d=i==="jersey"?'<path d="M70 176 H130 L128 188 H72 Z" fill="var(--top-trim)"/><path d="M68 210 H132 L130 222 H70 Z" fill="var(--top-trim)"/>':[166,179,192,205,218,231].map(b=>`<rect x="60" y="${b}" width="80" height="6" fill="var(--top-trim)"/>`).join(""),f=i==="jersey"?'<path d="M86 160 L100 176 L114 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/>':'<path d="M84 159 Q100 172 116 159" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',p=s?`<path d="${l}" fill="url(#${n}c)"/>`:"";return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${c}"><path d="${l}"/></clipPath></defs>${qt(b=>Ha(b,e,!0),e)}<path d="${l}" fill="var(--top)"/><g clip-path="url(#${c})">${p}<path d="M118 160 L135 168 L138 236 H120 Z" ${pt}/>${d}</g><path d="${l}" fill="none" ${A(3)}/>${f}<path d="M78 198 q-2 12 1 24" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/><path d="M122 190 q2 14 0 28" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/></g>`}if(i==="sweater"||i==="cardigan"){const l=i==="cardigan"?"M68 168 Q74 158 92 158 H108 Q126 158 132 168 L134 232 H108 L100 210 L92 232 H66 Z":"M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 234 Q100 242 64 234 Z",c=`<path d="M118 166 L134 174 L136 230 Q120 236 112 228 Z" ${pt}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M64 226 Q100 236 136 226" fill="none" stroke="var(--top-trim)" stroke-width="6" stroke-linecap="round"/>`,d=i==="cardigan"?[186,202,218].map(f=>`<circle cx="100" cy="${f}" r="2.4" fill="var(--top-trim)" ${A(1.4)}/>`).join(""):"";return Ss(e,l,qt(xi,e),n,s,o,c+d,["M80 190 q-2 16 0 28","M120 188 q2 16 0 30"])}if(i==="tank"||i==="bib"){const l=i==="bib"?"M78 168 H122 L126 228 H74 Z":"M78 168 Q86 160 96 164 H104 Q114 160 122 168 L128 226 H72 Z",c=`<path d="M110 172 H126 L128 226 H114 Z" ${pt}/><path d="M82 176 Q84 168 92 166" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".35"/>`,d=i==="bib"?`${c}<path d="M86 150 L78 168 M114 150 L122 168" stroke="${Ao}" stroke-width="8" stroke-linecap="round"/><path d="M86 150 L78 168 M114 150 L122 168" stroke="var(--top)" stroke-width="4.5" stroke-linecap="round"/><rect x="90" y="176" width="20" height="16" rx="3" fill="var(--top-trim)" ${A(1.6)}/>`:`${c}<path d="M84 166 Q100 176 116 166" fill="none" stroke="var(--top-trim)" stroke-width="4"/>`;return Ss(e,l,"",n,s,o,d,["M88 190 q2 14 0 24"])}if(i==="puff"||i==="ruffle"){const l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L132 222 H68 Z",c=`<path d="M100 172 l-8 -5 v10 z M100 172 l8 -5 v10 z" fill="var(--top-trim)" ${A(1.8)}/><path d="M97 174 l-4 10 M103 174 l4 10" stroke="var(--top-trim)" stroke-width="2.6" stroke-linecap="round"/>`,d=(i==="ruffle"?`<path d="M68 166 Q74 178 82 166 Q90 180 100 166 Q110 180 118 166 Q126 180 132 166" fill="var(--top-trim)" ${A(2)}/>`:c)+`<path d="M118 162 Q128 164 130 170 L132 222 H120 Z" ${pt}/><path d="M74 176 Q76 168 84 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return Ss(e,l,qt(Vc,e),n,s,o,d,["M86 190 q2 10 0 20","M116 188 q-2 12 0 22"],!0)}if(i==="button"){const l=Tp,c=[180,196,212].map(f=>`<circle cx="100" cy="${f}" r="2.6" fill="#fff" ${A(1.6)}/>`).join(""),d=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${pt}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M100 164 V226" stroke="#fff" stroke-width="2" opacity=".7"/>${c}<path d="M82 160 Q100 172 118 160" fill="var(--top)" ${A(2.2)}/>`;return Ss(e,l,qt(f=>Ha(f,e,!1),e),n,s,o,d,["M78 196 q-1 12 2 20"])}if(i==="raincoat"){const l="M62 168 Q70 156 92 156 H108 Q130 156 138 168 L146 240 Q100 252 54 240 Z",c=`<path d="M120 164 L142 176 L146 236 Q124 244 116 232 Z" ${pt}/><path d="M72 176 Q76 166 88 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M70 156 Q100 176 130 156" fill="none" stroke="var(--top-trim)" stroke-width="6"/><circle cx="100" cy="196" r="4" fill="var(--top-trim)" ${A(1.8)}/><path d="M78 214 H122" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round"/>`;return Ss(e,l,qt(xi,e),n,s,o,c,["M76 190 q-4 18 -2 36","M124 188 q4 18 2 36"])}const a=Tp,r=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${pt}/><path d="M84 160 Q100 172 116 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return Ss(e,a,qt(l=>Ha(l,e,!1),e),n,s,o,r,["M78 196 q-2 12 1 22","M122 194 q2 14 -1 24"])}function Rp(e,t,n,s,o,i=!1,a=16){const r=e==="l"?88:112,l=e==="l"?-1:1,c=`M${r-a/2} 226 Q${r-a/2+l} ${n-20} ${r-a/2+2*l} ${n} H${r+a/2} Q${r+a/2} ${n-30} ${r+a/2-l} 226 Z`;let d=`<path d="${c}" fill="var(--bottom)" ${A(2.8)}/>`;return d+=Ys(c,s,o,[`M${r-4*l} 240 Q${r} ${(226+n)/2} ${r+3*l} ${n-14}`]),e==="r"?d+=`<path d="M${r+1} 230 H${r+a/2} L${r+a/2} ${n} H${r+4} Z" ${pt}/>`:d+=`<path d="M${r-2} 238 Q${r-6} ${(226+n)/2} ${r-2} ${n-10}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".3"/>`,i&&(d+=`<path d="M${r-a/2-1} ${n-8} H${r+a/2+1} V${n+1} H${r-a/2-1} Z" fill="var(--bottom-trim)" ${A(2)}/>`),Rn("leg",e,d,t)}function zM(e,t,n,s){if(t.dress)return'<g data-layer="bottom"></g>';const o=t.bottom;if(Zd(e)&&(o==="skirt"||o==="tutu"||o==="overalls"))return`<g data-layer="bottom"><path class="skirt" d="${o==="tutu"?"M52 216 H148 L160 248 Q100 260 40 248 Z":"M62 218 H138 L152 252 Q100 264 48 252 Z"}" fill="var(--bottom)" ${A(3)}/></g>`;if(o==="skirt"){const p="M68 222 H132 L146 262 Q100 274 54 262 Z";return`<g data-layer="bottom"><path class="skirt" d="${p}" fill="var(--bottom)" ${A(3)}/>${Ys(p,n,s,["M82 234 L76 258","M100 232 V266","M118 234 L126 258"])}<path d="M114 224 H132 L146 262 Q130 268 118 266 Z" ${pt}/><path d="M72 228 Q66 246 64 258" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".3"/><path d="M84 236 v10 M116 236 v10" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/></g>`}if(o==="tutu")return'<g data-layer="bottom"></g>';if(o==="overalls"){const p="M66 220 H134 L139 264 H106 L100 254 L94 264 H61 Z";return`<g data-layer="bottom"><g class="leg" style="transform-box:view-box;transform-origin:100px 238px"><path d="${p}" fill="var(--bottom)" ${A(3)}/>${Ys(p,n,s,["M78 232 Q74 248 72 260","M122 230 Q128 248 132 260"])}<path d="M118 222 H134 L139 264 H122 Z" ${pt}/><path d="M64 258 H95 M105 258 H138" stroke="var(--bottom-trim)" stroke-width="4"/></g></g>`}const a=o==="shorts"?256:292,r=o==="joggers"||o==="jeans",l=o==="leggings"?12:o==="shorts"?18:16,c=Rp("l",e,a,n,s,r,l)+Rp("r",e,a,n,s,r,l),d=o==="jeans"?'<path d="M88 232 V286 M112 232 V286" stroke="#c9a24a" stroke-width="1.4" stroke-dasharray="2 3" opacity=".7"/>':"";return`<g data-layer="bottom">${`<path d="M70 220 H130 V230 H70 Z" fill="var(--bottom)" ${A(2.4)}/>`}${c}${d}</g>`}function QM(e,t,n,s){if(t.dress)return'<g data-layer="bottom-over"></g>';const o=t.bottom;if(o==="overalls"){const i="M78 180 H122 L124 228 H76 Z";return`<g data-layer="bottom-over"><path d="M80 176 L72 164 M120 176 L128 164" stroke="${Ao}" stroke-width="12" stroke-linecap="round"/><path d="M80 176 L72 164 M120 176 L128 164" stroke="var(--bottom)" stroke-width="7.5" stroke-linecap="round"/><path d="${i}" fill="var(--bottom)" ${A(3)}/>${Ys(i,n,s,["M86 200 q14 6 28 0"])}<path d="M88 190 H112 V206 Q100 212 88 206 Z" fill="var(--bottom-trim)" ${A(2.4)}/><circle cx="82" cy="186" r="3.6" fill="#fff" ${A(2)}/><circle cx="118" cy="186" r="3.6" fill="#fff" ${A(2)}/><path d="M66 222 H134 L135 230 H65 Z" fill="var(--bottom)" ${A(3)}/><path d="M108 180 H122 L124 228 H110 Z" ${pt}/><path d="M82 182 v12" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/></g>`}if(o==="tutu"){if(Zd(e))return`<g data-layer="bottom-over"><path class="skirt" d="M58 220 H142 L154 246 Q100 256 46 246 Z" fill="var(--bottom)" ${A(2.4)}/></g>`;let i="";const a=[[266,50,150,8],[256,56,144,7],[246,64,136,6]];for(let l=0;l<a.length;l++){const[c,d,f,p]=a[l],g=`M${d+8} ${c-22} H${f-8} L${f} ${c} ${rl(f,d,c,6,p)} Z`;i+=`<path class="skirt" d="${g}" fill="var(--bottom)" ${A(2.4)}/>`,i+=`<path d="M${f-20} ${c-16} L${f-6} ${c-2}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".2"/>`}const r="M66 214 H134 V224 H66 Z";return`<g data-layer="bottom-over">${i}<path d="${r}" fill="var(--bottom-trim)" ${A(2.6)}/>${Ys(r,n,s)}</g>`}return'<g data-layer="bottom-over"></g>'}function Bp(e,t){return`<path d="M${e} ${t+2} c-3 -5 -9 -1 -5 3 l5 4 l5 -4 c4 -4 -2 -8 -5 -3z" fill="var(--top-trim)" opacity=".85"/>`}function qM(e,t,n,s,o){const i=t.dress;if(!i)return"";const a=`${n}dr`;let r="M72 210 H128 L150 268 Q100 282 50 268 Z",l="M72 168 Q78 158 94 158 H106 Q122 158 128 168 L130 214 H70 Z",c="",d=qt(b=>Vc(b,e,!0),e),f=!0;i==="sundress"?(r="M76 214 H124 L140 266 Q100 276 60 266 Z",c='<path d="M78 166 Q100 180 122 166" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',d="",f=!1):i==="party"?c=[[64,236],[86,228],[108,234],[130,242],[76,254],[100,250],[122,258],[92,188]].map(([m,k])=>Bp(m,k)).join("")+`<path d="M100 214 l-10 -6 v12 z M100 214 l10 -6 v12 z" fill="var(--top-trim)" ${A(1.8)}/><path d="M52 262 Q100 276 148 262" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="1 5" opacity=".85"/>`:i==="pinafore"?(l="M80 176 H120 L122 214 H78 Z",c='<path d="M86 158 L80 178 M114 158 L120 178" stroke="var(--top)" stroke-width="5" stroke-linecap="round"/>',d="",f=!1,r="M74 212 H126 L142 264 Q100 274 58 264 Z"):i==="jumper"?(c=`<path d="M84 160 Q100 174 116 160" fill="var(--top-trim)" ${A(2)}/>`,d=qt(b=>Ha(b,e,!0),e),f=!1):i==="ballet"?(r="M78 214 H122 L132 250 Q100 258 68 250 Z",c=`<path d="M70 248 ${rl(70,130,248,5,5)}" fill="none" stroke="#fff" stroke-width="2"/>`,d=qt(Vc,e)):i==="nightgown"?(r="M80 214 H120 L132 270 Q100 278 68 270 Z",c='<path d="M88 164 Q100 176 112 164" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>',d=qt(xi,e),f=!1):i==="raindress"?(r="M70 212 H130 L148 268 Q100 280 52 268 Z",c='<path d="M76 168 Q100 186 124 168" fill="none" stroke="var(--top-trim)" stroke-width="5"/><circle cx="100" cy="198" r="3.4" fill="var(--top-trim)"/>',d=qt(xi,e),f=!1):(r="M70 214 H130 L152 266 Q100 280 48 266 Z",l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L131 216 H69 Z",c=[[66,236],[86,228],[110,232],[132,240],[76,254],[100,248],[124,258],[56,260],[144,262],[96,266],[84,182],[114,190],[100,200]].map(([m,k])=>Bp(m,k)).join("")+`<path d="M112 214 H130 L152 266 Q138 271 128 272 Z" ${pt}/><path d="M118 162 L130 168 L131 216 H120 Z" ${pt}/><path d="M50 262 Q100 276 150 262" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9"/><path d="M60 226 Q56 244 54 258" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/><path d="M68 210 H132 V220 H68 Z" fill="var(--top-trim)" ${A(2.6)}/><path d="M100 215 l-13 -8 v16 z M100 215 l13 -8 v16 z" fill="var(--top-trim)" ${A(2.2)}/><circle cx="100" cy="215" r="3.6" fill="var(--top-trim)" ${A(2)}/><path d="M97 218 l-5 14 M103 218 l5 14" stroke="var(--top-trim)" stroke-width="3" stroke-linecap="round"/><path d="M80 158 Q78 172 94 170 Q99 166 100 162 Q101 166 106 170 Q122 172 120 158 Q100 164 80 158 Z" fill="#fff" ${A(2.4)}/>`),Zd(e)&&(r="M68 214 H132 L150 250 Q100 262 50 250 Z");const p=`${r} ${l}`,g=`<path class="skirt" d="${r}" fill="var(--top)" ${A(3)}/><path d="${l}" fill="var(--top)" ${A(3)}/><g clip-path="url(#${a})">${Ys(p,n,s,["M80 226 Q74 248 70 266","M120 226 Q126 248 130 266"])}${c}</g>`;return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${a}"><path d="${p}"/></clipPath></defs>${f?g+d:d+g}</g>`}function NM(e,t,n,s){const o=e==="l"?`<g transform="translate(${2*s} 0) scale(-1 1)">${n}</g>`:n;return Rn("leg",e,o,t)}function ZM(e,t){const n=t.shoes;let s="";for(const o of["l","r"]){const i=o==="l"?87:113;let a="";if(n==="sneakers"||n==="lightup"){const r=n==="lightup"?`<circle cx="${i-4}" cy="292" r="2.2" fill="#ff8fab"/><circle cx="${i+4}" cy="296" r="2.2" fill="#8ecae6"/><circle cx="${i}" cy="300" r="2" fill="#ffd166"/>`:"";a=`<path d="M${i} 270 V286" fill="none" stroke="var(--sock)" stroke-width="16" stroke-linecap="round"/><path d="M${i-14} 296 Q${i-14} 284 ${i} 284 Q${i+14} 284 ${i+16} 296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+12} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${A(2.8)}/><path d="M${i-12} 304 H${i+18}" stroke="var(--shoe-trim)" stroke-width="3.5" stroke-linecap="round"/><path d="M${i-6} 290 l5 2 M${i-6} 295 l6 2" stroke="${Ao}" stroke-width="1.8" stroke-linecap="round"/>${r}`}else if(n==="boots"||n==="rainboots"){const r=n==="rainboots"?248:258,l=n==="boots"?[[-6,272],[5,268],[-2,284],[7,290],[-8,294]].map(([c,d])=>`<circle cx="${i+c}" cy="${d}" r="2.6" fill="#fff" opacity=".9"/>`).join(""):"";a=`<path d="M${i-14} ${r} H${i+14} V296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+10} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${A(2.8)}/><path d="M${i-16} ${r-4} H${i+16} V${r+8} H${i-16} Z" fill="var(--shoe)" ${A(2.6)}/>`+l+(n==="rainboots"?`<path d="M${i-12} ${r+16} H${i+12}" stroke="var(--shoe-trim)" stroke-width="4" stroke-linecap="round"/>`:`<path d="M${i-6} ${r+14} V292" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".45"/>`)}else n==="maryjanes"?a=`<path d="M${i} 266 V290" fill="none" stroke="var(--sock)" stroke-width="15" stroke-linecap="round"/><path d="M${i-12} 274 ${rl(i-12,i+12,274,4,4)} L${i+12} 268 H${i-12} Z" fill="var(--sock)" ${A(2)}/><path d="M${i-13} 298 Q${i-13} 290 ${i} 290 Q${i+13} 290 ${i+14} 298 Q${i+20} 300 ${i+20} 304 Q${i+20} 309 ${i+8} 309 H${i-12} Q${i-16} 309 ${i-14} 302 Z" fill="var(--shoe)" ${A(2.8)}/><path d="M${i-10} 294 H${i+12}" stroke="${Ao}" stroke-width="2"/><circle cx="${i+8}" cy="294" r="2.2" fill="var(--acc)"/>`:n==="sandals"?a=`<path d="M${i-12} 298 Q${i-12} 286 ${i} 286 Q${i+12} 286 ${i+14} 296 Q${i+18} 298 ${i+18} 302 Q${i+18} 306 ${i+8} 306 H${i-12} Q${i-16} 306 ${i-14} 300 Z" fill="var(--skin)" ${A(2.4)}/><path d="M${i-14} 304 H${i+18}" stroke="var(--shoe)" stroke-width="5" stroke-linecap="round"/><path d="M${i-8} 292 H${i+10} M${i+2} 300 L${i+8} 290" stroke="var(--shoe)" stroke-width="4" stroke-linecap="round"/><circle cx="${i+2}" cy="293" r="3" fill="var(--shoe-trim)" ${A(1.4)}/>`:n==="slippers"?a=`<path d="M${i-14} 292 Q${i-14} 280 ${i} 278 Q${i+16} 280 ${i+18} 294 Q${i+22} 296 ${i+20} 304 H${i-14} Q${i-18} 304 ${i-16} 296 Z" fill="var(--shoe)" ${A(2.8)}/><path d="M${i-6} 286 q6 -4 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`:a=`<ellipse cx="${i+2}" cy="304" rx="16" ry="7" fill="var(--shoe)" ${A(2.6)}/>`;s+=NM(o,e,a,i)}return`<g data-layer="shoes">${s}</g>`}const Zg=new Set(["cap","beanie","sunhat"]),FM=new Set(["catears","earmuffs"]);function zo(e){return e==="afro"?28:e==="topbun"?20:e==="puffs"||e==="coily"?16:e==="buns"||e==="curlybob"?12:e==="long"||e==="wavy"||e==="wavybob"?8:0}function Jo(e,t,n){if(!Zg.has(t)&&!FM.has(t))return n;const s=zo(e);return s?`<g data-hat="${t}" transform="translate(0 ${L(-s)})">${n}</g>`:n}function jM(e,t,n){let s="";for(let l=0;l<n.length;l++)Zg.has(n[l])&&(s=n[l]);if(!s)return"";const o=zo(t),i=(s==="beanie"?58:s==="cap"?64:62)-o,a=Math.min(70,i),r=t==="afro"||t==="puffs"||t==="coily"?92:78;return`<mask id="${e}hm" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" data-brim="${L(a)}"><rect x="-30" y="-50" width="260" height="420" fill="#fff"/><rect x="${L(100-r)}" y="-50" width="${L(r*2)}" height="${L(a+50)}" fill="#000"/></mask>`}function zl(e,t,n){return`<g transform="translate(${e} ${t}) scale(${n})"><path d="M0 0 C-8 -14 -30 -14 -28 0 C-30 14 -8 14 0 0 Z" fill="var(--acc)" ${A(2.6)}/><path d="M0 0 C8 -14 30 -14 28 0 C30 14 8 14 0 0 Z" fill="var(--acc)" ${A(2.6)}/><rect x="-6" y="-7" width="12" height="14" rx="4" fill="var(--acc2)" ${A(2.2)}/></g>`}function GM(e){return`<g data-layer="accessory">${e.acc.map(n=>n==="glasses"?'<circle cx="76" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="124" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="76" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><circle cx="124" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3.2"/><path d="M58 108 L42 104 M142 108 L158 104" stroke="var(--frame)" stroke-width="3.2" stroke-linecap="round"/>':n==="square"?'<rect x="58" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><rect x="108" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><path d="M92 112 H108" stroke="var(--frame)" stroke-width="3.2"/>':n==="sunnies"?'<path d="M56 104 H94 Q96 122 76 122 Q56 122 56 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M106 104 H144 Q146 122 124 122 Q104 122 106 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3"/>':n==="bow"?zl(100,78,.7):n==="bigbow"?zl(100,70,1.15):n==="headband"?`<path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="${Ao}" stroke-width="12" stroke-linecap="round"/><path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round"/>${zl(100,32,.85)}`:n==="flower"?`<g transform="translate(138 78)">${[0,60,120,180,240,300].map(s=>`<ellipse cx="0" cy="-8" rx="5" ry="8" fill="var(--acc)" ${A(1.6)} transform="rotate(${s})"/>`).join("")}<circle r="4.5" fill="var(--acc2)" ${A(1.6)}/></g>`:n==="cap"?Jo(e.hair,"cap",`<path d="M54 64 Q56 20 100 16 Q144 20 146 64 Q128 54 100 56 Q72 54 54 64 Z" fill="var(--acc)" ${A(3)}/><path d="M48 56 Q100 66 152 56 L156 62 Q100 70 44 62 Z" fill="var(--acc)" ${A(3)}/><circle cx="100" cy="18" r="4.5" fill="#fff" ${A(2)}/>`):n==="beanie"?Jo(e.hair,"beanie",`<path d="M50 66 Q48 14 100 8 Q152 14 150 66 Q128 56 100 58 Q72 56 50 66 Z" fill="var(--acc)" ${A(3)}/><path d="M50 58 H150" stroke="var(--acc2)" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="8" r="7" fill="var(--acc2)" ${A(2.4)}/>`):n==="sunhat"?Jo(e.hair,"sunhat",`<path d="M66 56 Q68 22 100 18 Q132 22 134 56 Q118 48 100 50 Q82 48 66 56 Z" fill="var(--acc)" ${A(3)}/><path d="M18 56 Q100 68 182 56 Q170 64 100 66 Q30 64 18 56 Z" fill="var(--acc)" ${A(3)}/><path d="M72 46 Q100 38 128 46" fill="none" stroke="var(--acc2)" stroke-width="4"/>`):n==="catears"?Jo(e.hair,"catears",`<path d="M58 62 L70 18 L86 60 Z" fill="var(--acc)" ${A(2.6)}/><path d="M114 60 L130 18 L142 62 Z" fill="var(--acc)" ${A(2.6)}/><path d="M64 54 L72 30 L80 52 Z" fill="var(--acc2)"/><path d="M120 52 L128 30 L136 54 Z" fill="var(--acc2)"/>`):n==="earmuffs"?Jo(e.hair,"earmuffs",`<path d="M44 68 Q48 26 100 22 Q152 26 156 68" fill="none" stroke="var(--acc)" stroke-width="6"/><circle cx="34" cy="86" r="14" fill="var(--acc)" ${A(2.8)}/><circle cx="166" cy="86" r="14" fill="var(--acc)" ${A(2.8)}/><circle cx="34" cy="86" r="6" fill="var(--acc2)"/><circle cx="166" cy="86" r="6" fill="var(--acc2)"/>`):"").join("")}</g>`}const mr="var(--line)",zc="#f7f3ee",ei="#3d3150",_a="#f7f1e8",Wi="#4a2f5e",Mi="#2f2433";function jd(e,t,n){return`<path d="${e}" fill="none" stroke="${mr}" stroke-width="${L(n+7)}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function YM(e){const[t,n]=Nt[e],[s,o]=hn[e],i=e==="l"?-1:1,a=(t+s)/2+6*i;return`M${t-2*i} ${n-2} Q${a} ${(n+o)/2-6} ${s-i} ${o-16}`}function Fg(e,t,n){return["l","r"].map(s=>{const o=jd(YM(s),e,21)+(n?n(s):"");return Rn("arm",s,o,t).replace('class="arm ','class="arm sleeve ')}).join("")}function jg(e,t,n){return["l","r"].map(s=>{const o=s==="l"?-1:1,i=s==="l"?88:112,a=jd(`M${i} 238 L${i+o} 280`,e,24)+(n?n(s,i):"");return Rn("leg",s,a,t)}).join("")}const Gg="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z";function Qo(e,t){return t.hip?`<g transform="rotate(${L(t.hip)} 100 238)">${e}</g>`:e}function KM(e,t){const n="#ffd166",s=`<path d="${Gg}" fill="${n}" ${A(3)}/>`,o=`<path d="M78 188 H122 V232 H78 Z" fill="${e}" ${A(2.8)}/><path d="M88 200 H112 V216 Q100 220 88 216 Z" fill="none" stroke="#3a1d3c" stroke-width="2.4" opacity=".3" stroke-linejoin="round"/><path d="M74 166 L82 190 M126 166 L118 190" stroke="${mr}" stroke-width="10" stroke-linecap="round"/><path d="M74 166 L82 190 M126 166 L118 190" stroke="${e}" stroke-width="5.5" stroke-linecap="round"/><circle cx="82" cy="192" r="4" fill="#c9ced6" ${A(1.6)}/><circle cx="118" cy="192" r="4" fill="#c9ced6" ${A(1.6)}/>`,i=`<path d="M66 228 H134 L136 248 Q100 256 64 248 Z" fill="${e}" ${A(3)}/>`,a=Fg(n,t,l=>{const[c,d]=hn[l];return`<path d="M${c-9} ${d-12} h18" stroke="#3a1d3c" stroke-width="2" opacity=".25" stroke-linecap="round"/>`});return{back:"",over:jg(e,t,(l,c)=>`<path d="M${c-11} 276 h22" stroke="#3a1d3c" stroke-width="2.4" opacity=".25" stroke-linecap="round"/>`)+Qo(a+s+i+o,t),head:"",sleeve:n}}function XM(e){const t=70-Math.min(10,zo(e)/2),n=`<path d="M38 ${t+10} Q100 ${t-8} 162 ${t+10}" fill="none" stroke="${mr}" stroke-width="13" stroke-linecap="round"/><path d="M38 ${t+10} Q100 ${t-8} 162 ${t+10}" fill="none" stroke="#6b6f7a" stroke-width="7.5" stroke-linecap="round"/>`,s=o=>`<circle cx="${o}" cy="${t}" r="17" fill="#c9ced6" ${A(3)}/><circle cx="${o}" cy="${t}" r="10.5" fill="#bfe3f2" ${A(2)}/><path d="M${o-5} ${t-4} q3 -4 8 -3" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`;return`<g data-costume-part="goggles">${n}${s(80)}${s(120)}<path d="M96 ${t} h8" stroke="${mr}" stroke-width="5" stroke-linecap="round"/></g>`}function JM(e){const t=60-zo(e),n=Math.max(30,Math.min(56,t-4)),s=t-n;return`<g data-costume-part="witch-hat"><path d="M64 ${t-2} Q82 ${t-n*.45} 92 ${s+8} Q98 ${s-2} 114 ${s+4} Q104 ${s+10} 106 ${s+n*.4} L136 ${t-2} Z" fill="${Wi}" ${A(3)}/><path d="M70 ${t-10} Q100 ${t-16} 130 ${t-10} L133 ${t-3} Q100 ${t-9} 67 ${t-3} Z" fill="#ff9f43" ${A(2.2)}/><path d="M24 ${t+2} Q100 ${t-16} 176 ${t+2} Q100 ${t+12} 24 ${t+2} Z" fill="${Wi}" ${A(3)}/><path d="M118 ${t-24} l2.6 5.4 5.8 .8 -4.2 4 1 5.8 -5.2 -2.8 -5.2 2.8 1 -5.8 -4.2 -4 5.8 -.8 Z" fill="#ffd166" ${A(1.4)}/></g>`}function eL(e){const t=zo(e);return`<g data-costume-part="cat-ears" transform="translate(0 ${L(-t)})"><path d="M52 66 L64 20 L90 56 Z" fill="${Mi}" ${A(2.8)}/><path d="M110 56 L136 20 L148 66 Z" fill="${Mi}" ${A(2.8)}/><path d="M61 56 L66 34 L80 52 Z" fill="#f4a3c8"/><path d="M120 52 L134 34 L139 56 Z" fill="#f4a3c8"/><path d="M50 72 Q100 46 150 72" fill="none" stroke="${Mi}" stroke-width="6" stroke-linecap="round"/></g>`}function tL(e){return Qo(`<g data-costume-part="cat-tail">${jd("M118 232 Q156 240 162 206 Q166 178 182 172",Mi,11)}<circle cx="182" cy="172" r="6" fill="${Mi}"/></g>`,e)}function nL(e){const t=[30,50,70,90,110,130,150,170];let n="";for(let i=t.length-1;i>0;i--)n+=` Q${t[i]-10} ${i%2?276:266} ${t[i-1]} 262`;const s=`M64 166 Q70 154 100 152 Q130 154 136 166 Q164 196 170 262${n} Q36 196 64 166 Z`;return{back:"",over:Qo(`<g data-costume-part="ghost-sheet"><path d="${s}" fill="${zc}" ${A(3)}/><path d="M70 190 Q60 230 58 258 M130 190 Q140 230 142 258 M100 190 V250" fill="none" stroke="#3a1d3c" stroke-width="2.4" opacity=".12" stroke-linecap="round"/></g>`,e),head:"",sleeve:zc}}function sL(e){const n=30-Math.min(16,zo(e));return`<g data-costume-part="ghost-hood"><path d="${`M30 112 Q28 ${n} 100 ${n} Q172 ${n} 170 112 Q172 150 150 170 Q100 182 50 170 Q28 150 30 112 Z`} M54 116 Q54 76 100 74 Q146 76 146 116 Q146 152 100 156 Q54 152 54 116 Z" fill="${zc}" fill-rule="evenodd" ${A(3)}/><path d="M44 96 Q48 ${n+26} 84 ${n+12}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/></g>`}function oL(e){const t=`<path d="${Gg}" fill="${ei}" ${A(3)}/>`,n=`<g data-costume-part="ribs" fill="none" stroke="${_a}" stroke-linecap="round"><path d="M100 172 V226" stroke-width="6"/>`+[184,198,212].map((r,l)=>`<path d="M${80+l*2} ${r} Q90 ${r-5} 100 ${r}  M${120-l*2} ${r} Q110 ${r-5} 100 ${r}" stroke-width="5.5"/>`).join("")+'<path d="M86 232 Q100 224 114 232" stroke-width="6"/></g>',s=(r,l,c,d)=>`<path d="M${L(r)} ${L(l)} L${L(c)} ${L(d)}" stroke="${_a}" stroke-width="5" stroke-linecap="round"/><circle cx="${L(r)}" cy="${L(l)}" r="4" fill="${_a}"/><circle cx="${L(c)}" cy="${L(d)}" r="4" fill="${_a}"/>`,o=Fg(ei,e,r=>{const[l,c]=Nt[r],[d,f]=hn[r];return s(l+(d-l)*.2,c+(f-c)*.2,l+(d-l)*.72,c+(f-c)*.72)}),i=`<path d="M66 230 H134 L136 248 Q100 256 64 248 Z" fill="${ei}" ${A(3)}/>`;return{back:"",over:jg(ei,e,(r,l)=>s(l,246,l+(r==="l"?-1:1),274))+Qo(o+i+t+n,e),head:"",sleeve:ei}}function iL(e){const t=n=>{const s=o=>L(100+n*o);return`M${s(20)} 166 Q${s(60)} 168 ${s(84)} 186 Q${s(90)} 220 ${s(80)} 256 Q${s(68)} 244 ${s(58)} 256 Q${s(48)} 242 ${s(36)} 254 Q${s(28)} 240 ${s(14)} 250 Z`};return Qo(`<g data-costume-part="bat-cape"><path d="${t(-1)}" fill="${Wi}" ${A(3)}/><path d="${t(1)}" fill="${Wi}" ${A(3)}/><path d="M40 190 Q44 220 52 240 M160 190 Q156 220 148 240" fill="none" stroke="#fff" stroke-width="2.4" opacity=".18" stroke-linecap="round"/></g>`,e)}function aL(e){return Qo(`<g data-costume-part="bat-collar"><path d="M78 164 Q72 152 82 146 L92 160 Z M122 164 Q128 152 118 146 L108 160 Z" fill="${Wi}" ${A(2.4)}/><circle cx="100" cy="166" r="5" fill="#ff9f43" ${A(1.8)}/></g>`,e)}function Yg(e,t,n){const s={back:"",over:"",head:"",sleeve:null};if(e.indexOf("helper-")===0){const o=tr[e.slice(7)]??tr.yellow;return{...KM(o,t),head:XM(n)}}return e==="witch"?{...s,head:JM(n)}:e==="cat"?{...s,back:tL(t),head:eL(n)}:e==="ghost"?{...nL(t),head:sL(n)}:e==="skeleton"?oL(t):e==="bat"?{...s,back:iL(t),over:aL(t)}:s}const rL=[{hip:1.5,head:4,armL:3,armR:-2,legL:0,legR:-3,legLLift:0,legRLift:0},{hip:-2,head:-5,armL:1,armR:-7,legL:4,legR:0,legLLift:2,legRLift:0},{hip:0,head:3,armL:2,armR:-2,legL:0,legR:0,legLLift:0,legRLift:0},{hip:-1.5,head:-4,armL:4,armR:-1,legL:5,legR:0,legLLift:3,legRLift:0}],lL={puffs:0,afro:0,pony:1,sidepony:1,pigtails:1,halfup:1,braids:2,boxbraids:2,locs:2,sidebraid:2,crown:2,buns:3,topbun:3,lowbun:3};function Gd(e){const t=e.hair||"buns";let n=lL[t];if(n===void 0){let s=0;for(let o=0;o<t.length;o++)s=(s+t.charCodeAt(o))%4;n=s}return rL[n]}function cL(e){const t=(n,s,o,i,a)=>{const r=Oc(n,s,o,i,a),l=Oc(r.x,r.y,100,238,e.hip);return{x:l.x/2,y:l.y/2}};return{left:t(hn.l[0],hn.l[1],Nt.l[0],Nt.l[1],e.armL),right:t(hn.r[0],hn.r[1],Nt.r[0],Nt.r[1],e.armR)}}function dL(e){const t=Oc(100,244,100,238,e.hip);return Math.round(t.y/2*10)/10}function Yd(e){const t=parseInt(e.slice(1),16);return(t>>16&255)+(t>>8&255)+(t&255)}function fL(e){const t=$i(e,.32);return Yd(t)<80?"#5a3a2c":t}function pL(e){return Yd(e)<140?"#3b2340":$i(e,.12)}let Ap=0;function hL(){return Ap+=1,"a"+Ap.toString(36)}function As(e,t){return t.hip?`<g transform="rotate(${L(t.hip)} 100 238)">${e}</g>`:e}function uo(e,t,n=!1){const s=t.head?`<g transform="rotate(${L(t.head)} 100 158)">${e}</g>`:e;return As(`<g${n?' class="dollhead" data-dollhead="1"':' class="dollhead"'}>${s}</g>`,t)}function gL(e,t,n){let s=`<defs><radialGradient id="${e}b"><stop offset="0" style="stop-color:var(--blush)" stop-opacity=".62"/><stop offset=".55" style="stop-color:var(--blush)" stop-opacity=".28"/><stop offset="1" style="stop-color:var(--blush)" stop-opacity="0"/></radialGradient>`;return s+=`<radialGradient id="${e}s"><stop offset="0" stop-color="#3a1d3c" stop-opacity=".3"/><stop offset=".6" stop-color="#3a1d3c" stop-opacity=".12"/><stop offset="1" stop-color="#3a1d3c" stop-opacity="0"/></radialGradient>`,s+=`<radialGradient id="${e}k" cx=".42" cy=".36" r=".75"><stop offset=".55" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".16"/></radialGradient>`,t&&(s+=`<linearGradient id="${e}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f1020" stop-opacity=".62"/><stop offset=".5" stop-color="#1f1020" stop-opacity=".05"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`,s+=`<linearGradient id="${e}c" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="146" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".2"/></linearGradient>`,s+=`<radialGradient id="${e}h" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1f1020" stop-opacity=".28"/></radialGradient>`),s+n+"</defs>"}function Ip(e){const t=e==="l"?-1:1,n=Nt[e][0],s=Nt[e][1],o=hn[e][0],i=hn[e][1],a=o-t,r=i-7,l=-t;let c=`<path d="${Hc([n,s],[a,r],18,13,-3*t)}" fill="var(--skin)" ${A(3)}/>`;return c+=`<path class="hand" d="M${L(o-8)} ${L(i-4)} Q${L(o-8)} ${L(i-10)} ${L(o)} ${L(i-10)} Q${L(o+8)} ${L(i-10)} ${L(o+8)} ${L(i-3)} Q${L(o+8.5)} ${L(i+9)} ${L(o)} ${L(i+9.5)} Q${L(o-8.5)} ${L(i+9)} ${L(o-8)} ${L(i-4)} Z" fill="var(--skin)" ${A(2.8)}/>`,c+=`<ellipse cx="${L(o+7*l)}" cy="${L(i-1)}" rx="3.4" ry="5" fill="var(--skin)" ${A(2.4)} transform="rotate(${-20*l} ${L(o+7*l)} ${L(i-1)})"/>`,c+=`<path d="M${L(o-3*l)} ${L(i+3)} v4 M${L(o+.5*l)} ${L(i+3.5)} v4" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`,c+=`<ellipse cx="${L(o-3*l)}" cy="${L(i-5)}" rx="3" ry="1.8" fill="#fff" opacity=".35"/>`,c}function Dp(e){const t=e==="l"?-1:1,n=e==="l"?88:112;let s=`<path d="${Hc([n,234],[n+t,294],21,15,1.5*t)}" fill="var(--skin)" ${A(3)}/>`;return s+=`<path d="${Hc([n+5*t,244],[n+5*t,290],6,4)}" ${pt}/>`,s+=`<ellipse cx="${L(n+.5*t)}" cy="268" rx="4.5" ry="2.6" fill="#3a1d3c" opacity=".12"/>`,s+=`<path d="M${n-4} 265 q4 -2.5 8 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`,s}function Op(e,t,n,s,o,i){const a=n?-1:1,r=o==="big"||o==="bright"?1.08:o==="soft"?.94:1,l=(y,u)=>`${L(e+y*r)} ${L(t+u*r)}`,c=13.5*r,d=17*r;let f="";if(i&&o!=="soft"){const y=[.35,.95,1.57,2.2,2.8];for(let u=0;u<y.length;u++){const w=y[u];f+=`<path d="M${L(e+5.5*Math.cos(w)*r)} ${L(t+(4+6.5*Math.sin(w))*r)} L${L(e+11.5*Math.cos(w)*r)} ${L(t+(2+14*Math.sin(w))*r)}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>`}}const p=o==="soft"?2:2.6,g=o==="soft"?"":`<path d="M${l(-16*a,-8)} q${L(-6*a*r)} -2 ${L(-9*a*r)} ${L(-9*r)} M${l(-17*a,-2)} q${L(-6*a*r)} ${L(-.5*r)} ${L(-10*a*r)} ${L(-5*r)} M${l(-12*a,-15)} q${L(-3*a*r)} ${L(-4*r)} ${L(-4*a*r)} ${L(-9*r)}" fill="none" stroke="var(--lash)" stroke-width="2.2" stroke-linecap="round"/>`,b=o==="sparkle"||o==="bright"?`<path d="M${l(-9*a,-8)} l.7 1.6 1.6 .7 -1.6 .7 -.7 1.6 -.7 -1.6 -1.6 -.7 1.6 -.7 Z" fill="#fff" opacity=".9"/>`:"",m=i?`<ellipse cx="${e}" cy="${L(t+r)}" rx="${L(c)}" ry="${L(d)}" fill="url(#${s}i)"/>`:"",k=o==="sleepy"?`<path d="M${l(-17,-4)} Q${e} ${L(t+r)} ${l(17,-4)} L${l(18,-16)} Q${e} ${L(t-20*r)} ${l(-18,-16)} Z" fill="var(--skin)"/>`:"";return`<path d="M${l(-16,-2)} Q${l(-16,-20)} ${l(0,-20)} Q${l(16,-20)} ${l(16,-2)} Q${l(16,19)} ${l(0,19)} Q${l(-16,19)} ${l(-16,-2)} Z" fill="#fff"/><path d="M${l(-15,-4)} Q${e} ${L(t-21*r)} ${l(15,-4)} Q${e} ${L(t-14*r)} ${l(-15,-4)} Z" fill="#3a1d3c" opacity=".12"/><ellipse data-iris="1" cx="${e}" cy="${L(t+r)}" rx="${L(c)}" ry="${L(d)}" fill="var(--eye)"/>${m}${f}<ellipse cx="${e}" cy="${L(t+3*r)}" rx="${L(7*r)}" ry="${L(9*r)}" fill="#1f1020" opacity=".8"/><ellipse cx="${e}" cy="${L(t+r)}" rx="${L(11.3*r)}" ry="${L(14.8*r)}" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/><ellipse cx="${e}" cy="${L(t+r)}" rx="${L(c)}" ry="${L(d)}" fill="none" stroke="#1f1020" stroke-width="2" opacity=".55"/><path d="M${l(-9,12)} Q${e} ${L(t+19.5*r)} ${l(9,12)} Q${e} ${L(t+15.5*r)} ${l(-9,12)} Z" fill="#fff" opacity=".5"/><ellipse cx="${L(e-6*a*r)}" cy="${L(t-6*r)}" rx="${L(5.8*r)}" ry="${L(6.8*r)}" fill="#fff" transform="rotate(${-15*a} ${L(e-6*a*r)} ${L(t-6*r)})"/><circle cx="${L(e+6*a*r)}" cy="${L(t+8*r)}" r="${L(2.8*r)}" fill="#fff"/><circle cx="${L(e-4*a*r)}" cy="${L(t+10*r)}" r="${L(1.3*r)}" fill="#fff" opacity=".85"/><path d="M${l(7*a,-10)} l${L(r)} ${L(2.4*r)} ${L(2.4*r)} ${L(r)} ${L(-2.4*r)} ${L(r)} ${L(-r)} ${L(2.4*r)} ${L(-r)} ${L(-2.4*r)} ${L(-2.4*r)} ${L(-r)} ${L(2.4*r)} ${L(-r)} Z" fill="#fff"/>`+b+k+`<path d="M${l(-17,-1)} Q${l(-16,-21)} ${l(0,-21)} Q${l(16,-21)} ${l(17,-3)} Q${l(14.5,-18.6)} ${l(0,-18.8)} Q${l(-14.5,-18.6)} ${l(-15.5,-1)} Z" fill="var(--lash)" stroke="var(--lash)" stroke-width="${p}" stroke-linejoin="round"/>`+g+`<path d="M${l(-11,-23)} Q${e} ${L(t-27*r)} ${l(11,-23)}" fill="none" stroke="var(--line)" stroke-width="1.3" stroke-linecap="round" opacity=".22"/><path d="M${l(-5,20.5)} Q${e} ${L(t+22*r)} ${l(5,20.5)}" fill="none" stroke="var(--lash)" stroke-width="1.3" stroke-linecap="round" opacity=".28"/>`}function uL(e,t,n,s=!1){const o=e.blush?`<ellipse cx="64" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><ellipse cx="136" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><path d="M60 133 l3 -3 M66 134 l3 -3 M132 133 l3 -3 M138 134 l3 -3" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>`:"";let i="";if(e.freckles){const a=[[58,132],[64,136],[70,131],[130,131],[136,136],[142,132]];for(let r=0;r<a.length;r++)i+=`<circle cx="${a[r][0]}" cy="${a[r][1]}" r="1.5" fill="var(--freckle)" opacity=".7"/>`}return o+i+'<path data-brow="l" d="M64 86 Q74 80 85 84" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/><path data-brow="r" d="M115 84 Q126 80 136 86" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'+Op(76,112,!1,t,s?"sleepy":e.eyes,n)+Op(124,112,!0,t,s?"sleepy":e.eyes,n)+'<path d="M98 131 q2 1.8 4 0" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" opacity=".55"/><ellipse cx="101.5" cy="128.5" rx="1.6" ry="1" fill="#fff" opacity=".6"/><path d="M92 140 Q100 147.5 108 140" fill="none" stroke="var(--line)" stroke-width="2.8" stroke-linecap="round"/><path d="M96 142.6 Q100 145.4 104 142.6 Q100 144 96 142.6 Z" fill="#ff8fa8"/>'}function mL(e){const t="M40 102 Q38 38 100 38 Q162 38 160 102 Q160 140 132 153 Q116 160 100 160 Q84 160 68 153 Q40 140 40 102 Z";return`<ellipse cx="39" cy="114" rx="9" ry="11" fill="var(--skin)" ${A(3)}/><ellipse cx="161" cy="114" rx="9" ry="11" fill="var(--skin)" ${A(3)}/><ellipse cx="40" cy="115" rx="4" ry="6" ${Dc}/><ellipse cx="160" cy="115" rx="4" ry="6" ${Dc}/><path d="${t}" fill="var(--skin)" ${A(3.2)}/><path d="${t}" fill="url(#${e}k)"/>`}function yL(){return`<path d="M91 146 h18 v22 q-9 5 -18 0 Z" fill="var(--skin)" ${A(3)}/><path d="M91 150 h18 v9 q-9 6 -18 0 Z" ${Dc}/><path d="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z" fill="var(--skin)" ${A(3)}/>`}function Qc(e,t){const n=us(e),s=t?.pose??Gd(n),o=t?.rich!==!1,i=t?.uid??hL(),a=dL(s),r=n.shoesC,l=r.toLowerCase()==="#ffffff"?n.dress?n.dressC:n.topC:Cp(r,.28),c=n.dress?n.dressC:n.topC,d=Yd(c)>700?"#8fdcc0":$i(c,.18),f=["--line:#5a3d5c",`--skin:${n.skin}`,`--hair:${n.hairC}`,`--hair-shade:${fL(n.hairC)}`,`--brow:${pL(n.hairC)}`,`--eye:${n.eyeC}`,"--lash:#3b2340","--blush:#ff6f91",`--freckle:${$i(n.skin,.35)}`,`--top:${c}`,`--top-trim:${d}`,`--bottom:${n.dress?n.dressC:n.bottomC}`,`--bottom-trim:${$i(n.dress?n.dressC:n.bottomC,.16)}`,`--shoe:${r}`,`--shoe-trim:${l}`,"--sock:#ffffff",`--acc:${n.accC}`,`--acc2:${Cp(n.accC,.18)}`,"--frame:#6e4a5e"].join(";"),p=Rn("leg","l",Dp("l"),s)+Rn("leg","r",Dp("r"),s),g=Rn("arm","l",`<g class="hand">${Ip("l")}</g>`,s)+Rn("arm","r",`<g class="hand">${Ip("r")}</g>`,s),b=`<g data-layer="body">${p}${As(yL()+g,s)}${uo(mL(i),s,!0)}</g>`,m=n.dress?qM(s,n,i,o,a):VM(s,n,i,o,a),k=`<g class="shadow"><ellipse cx="100" cy="308" rx="52" ry="9" fill="url(#${i}s)"/><ellipse cx="87" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/><ellipse cx="113" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/></g>`,y=jM(i,n.hair,n.acc),u=y?` mask="url(#${i}hm)"`:"",w=[`<g data-layer="hair-back">${uo(`<g${u}>${WM(n.hair,i,o)}</g>`,s)}</g>`,b,ZM(s,n),As(zM(s,n,i,o),s),As(m,s),As(QM(s,n,i,o),s),`<g data-layer="face">${uo(uL(n,i,o,t?.poseName==="lie"),s)}</g>`,`<g data-layer="hair-front">${uo(`<g${u}>${UM(n.hair,i,o)}</g>`,s)}</g>`,uo(GM(n),s)],_=t?.poseName==="sit"||t?.poseName==="lie"?t.poseName:null,P=t?.costume?Yg(t.costume,s,n.hair):null;t?.holding&&w.splice(6,0,As(ea("under",!0,n.skin,_,P?.sleeve??c),s)),P&&(P.head&&w.push(`<g data-layer="costume-head">${uo(P.head,s)}</g>`),P.over&&w.splice(6,0,`<g data-layer="costume">${P.over}</g>`),P.back&&w.splice(1,0,`<g data-layer="costume-back">${P.back}</g>`));const x=w.join(""),E=n.dress||n.top,W=t?.poseName?` data-pose="${t.poseName}"`:"",V=t?.costume?` data-costume="${t.costume}"`:"";return`<svg${W}${V} data-chibi="1" data-hair="${n.hair}" data-top="${E}" viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" style="${f}">${gL(i,o,y)}${k}${x}</svg>`}function Hp(e,t,n){const s=us(e),o=il(t)??Gd(s),i=t==="sit"||t==="lie"?t:null,a=(n?Yg(n,o,s.hair).sleeve:null)??(s.dress?s.dressC:s.topC);return`<svg viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">${As(ea("over",!0,s.skin,i,a),o)}</svg>`}function yr(){try{return typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("selector(&)")}catch{return!1}}function na(e,t,n){const s=!!(t&&t.look2);e.classList.toggle("chibi",s);const o=s&&yr();e.classList.toggle("chibi-move",s&&(o||n)),e.classList.toggle("chibi-bob",s&&!o&&!n)}function Kg(e){return e.look2?r1(e):null}const at="#5a3d5c",ve=`stroke="${at}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,bL=["little","kid","adult"],Ks={little:.78,kid:1,adult:1.28},pi={left:{x:15,y:113},right:{x:85,y:113}};function ll(e,t){return e.look2?cL(t??Gd(e.look2)):t?{left:{x:22,y:96},right:{x:78,y:96}}:pi}function Xg(e,t){return e===1?`<path d="M62 16 L76 8 L76 26 Z M62 16 L50 6 L48 24 Z" fill="#ff7aa8" stroke="${at}" stroke-width="3" stroke-linejoin="round"/><circle cx="62" cy="16" r="5" fill="#ffd166" stroke="${at}" stroke-width="3"/>`:e===2?`<circle cx="40" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${at}" stroke-width="3"/><circle cx="60" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${at}" stroke-width="3"/><path d="M49 48 h2" stroke="${at}" stroke-width="3"/>`:e===3?`<path d="M20 30 Q22 8 50 8 Q78 8 80 30 Z" fill="${t}" stroke="${at}" stroke-width="3.5" stroke-linejoin="round"/><path d="M60 28 Q84 26 92 32 Q80 36 60 34 Z" fill="${t}" stroke="${at}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="9" r="4" fill="#fff" stroke="${at}" stroke-width="3"/>`:""}function br(e,t,n){return n?e===1?`<path d="M20 40 Q16 86 30 92 L70 92 Q84 86 80 40 Z" fill="${t}" ${ve}/>`:e===2?`<circle cx="18" cy="34" r="12" fill="${t}" ${ve}/><circle cx="82" cy="34" r="12" fill="${t}" ${ve}/>`:e===3?`<circle cx="50" cy="8" r="13" fill="${t}" ${ve}/>`:"":e===3?`<path d="M22 42 Q20 14 50 12 Q80 14 78 42 Q66 26 50 30 Q34 26 22 42 Z" fill="${t}" ${ve}/>`:`<path d="M21 46 Q18 12 50 12 Q82 12 79 46 Q72 30 58 28 Q50 36 36 30 Q26 34 21 46 Z" fill="${t}" ${ve}/>`}function vt(e,t,n){const s=il(t),o=Kg(e);return o&&e.look2?Qc(e.look2,{rich:yr(),pose:s??void 0,poseName:t||void 0,holding:n,costume:o}):e.look2?Qc(e.look2,{rich:yr(),pose:s??void 0,poseName:t||void 0,holding:n}):t==="sit"||t==="lie"?kL(e,t,n):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${br(e.hairStyle,e.hair,!0)}
  <rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${ve}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${ve}/>
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${at}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${at}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${ve} transform="rotate(12 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${ve} transform="rotate(-12 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${ve}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${ve}/>
  <circle cx="50" cy="44" r="30" fill="${e.skin}" ${ve}/>
  ${br(e.hairStyle,e.hair,!1)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${at}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${at}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${ve} fill="none"/>
  ${Xg(e.acc??0,e.shirt)}
  <circle class="hand hang" cx="${pi.left.x}" cy="${pi.left.y}" r="6" fill="${e.skin}" ${ve}/><circle class="hand hang" cx="${pi.right.x}" cy="${pi.right.y}" r="6" fill="${e.skin}" ${ve}/>
  ${n?ea("under",!1,ol(e.skin),null):""}
</svg>`}function Jg(e,t){const n=t==="sit"||t==="lie"?t:null;if(n==="lie")return"";const s=Kg(e);return s&&e.look2?Hp(e.look2,t,s):e.look2?Hp(e.look2,t):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${ea("over",!1,ol(e.skin),n)}</svg>`}function kL(e,t,n){const s=t==="sit"?`<rect class="leg" x="34" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${ve} transform="rotate(-68 40 112)"/>
  <rect class="leg" x="53" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${ve} transform="rotate(68 60 112)"/>`:`<rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${ve}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${ve}/>`,o=t==="lie"?`<path d="M34 48 Q40 52 46 48" fill="none" ${ve}/><path d="M54 48 Q60 52 66 48" fill="none" ${ve}/>`:`<ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${at}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${at}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>`,i=`<ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${br(e.hairStyle,e.hair,!0)}
  ${s}
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${at}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${at}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${ve} transform="rotate(28 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${ve} transform="rotate(-28 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${ve}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${ve}/>
  <g class="dollhead">
  <circle class="dollhead" data-dollhead="1" cx="50" cy="44" r="30" fill="${e.skin}" ${ve}/>
  ${br(e.hairStyle,e.hair,!1)}
  ${o}
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${ve} fill="none"/>
  ${Xg(e.acc??0,e.shirt)}
  </g>
  <circle class="hand hang" cx="22" cy="96" r="6" fill="${e.skin}" ${ve}/><circle class="hand hang" cx="78" cy="96" r="6" fill="${e.skin}" ${ve}/>
  ${n?ea("under",!1,ol(e.skin),t):""}`;return`<svg data-pose="${t}" viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${i}</svg>`}const Wp=[{id:"hair",name:"Hair"},{id:"face",name:"Face"},{id:"clothes",name:"Clothes"},{id:"shoes",name:"Shoes"},{id:"extras",name:"Extras"}],wL={id:"costume",name:"🎃 Costumes"};function vL(){return Kr()?[...Wp,wL]:Wp}function _L(e,t){const n=io(e),s=!!n&&n.startsWith("helper-"),o=us(t),i=(c,d,f,p)=>`<button type="button" class="avCosTile${f?" on":""}" data-act="av-costume" data-v="${c}" aria-pressed="${f}"><span class="avCosPic">${Qc(o,{uid:"cosT"+(p||"none"),rich:!1,costume:p||null})}</span><span class="avCosName">${d}</span></button>`,a=s?n:"helper-yellow",r=i("","No costume",!n,"")+i(a,Yf.helper,s,a)+["witch","cat","ghost","skeleton","bat"].map(c=>i(c,Yf[c],n===c,c)).join(""),l=Object.keys(tr).map(c=>`<button type="button" class="avSw${n==="helper-"+c?" on":""}" style="background:${tr[c]}" data-act="av-costume" data-v="helper-${c}" aria-label="${c} overalls"></button>`).join("");return`<h3>Costumes</h3><p class="avHint">Halloween dress-up! Tap one. Everyone in the room sees it.</p><div class="avCosGrid">${r}</div><h3>Helper overalls color</h3><div class="avColors avCosColors">${l}</div>`}const $L={short:"Short",pixie:"Pixie",coily:"Coily",afro:"Afro",bangs:"Bangs",bob:"Bob",wavybob:"Wavy bob",curlybob:"Curly bob",sidebangs:"Side bangs",long:"Long",wavy:"Wavy",braids:"Braids",boxbraids:"Box braids",locs:"Locs",sidebraid:"Side braid",crown:"Crown",pony:"Ponytail",sidepony:"Side pony",pigtails:"Pigtails",halfup:"Half-up",buns:"Buns",puffs:"Puffs",topbun:"Top bun",lowbun:"Low bun"},xL={classic:"Tee",stripes:"Stripes",hoodie:"Hoodie",sweater:"Sweater",tank:"Tank",puff:"Puff",ruffle:"Ruffle",button:"Buttons",jersey:"Jersey",cardigan:"Cardigan",bib:"Bib",raincoat:"Raincoat"},ML={pants:"Pants",jeans:"Jeans",shorts:"Shorts",skirt:"Skirt",tutu:"Tutu",leggings:"Leggings",overalls:"Overalls",joggers:"Joggers"},LL={"":"No dress",twirl:"Twirl",sundress:"Sundress",party:"Party",pinafore:"Pinafore",jumper:"Jumper",ballet:"Ballet",nightgown:"Nightgown",raindress:"Rain"},EL={classic:"Classic",sneakers:"Sneakers",lightup:"Light-up",boots:"Boots",rainboots:"Rain boots",sandals:"Sandals",maryjanes:"Mary Janes",slippers:"Slippers"},SL={round:"Round",big:"Big",sleepy:"Sleepy",sparkle:"Sparkle",soft:"Soft",bright:"Bright"},CL={glasses:"Glasses",square:"Square",sunnies:"Sunnies",bow:"Bow",bigbow:"Big bow",headband:"Headband",flower:"Flower",cap:"Cap",beanie:"Beanie",sunhat:"Sun hat",catears:"Cat ears",earmuffs:"Earmuffs"},PL={little:"Little",kid:"Kid",adult:"Grown-up"};let xn="hair";function _n(e,t,n,s){return`<button type="button" class="avOpt${s?" on":""}" data-act="${e}" data-v="${t}">${n}</button>`}function Wa(e,t,n){return`<button type="button" class="avSw${n?" on":""}" style="background:${t}" data-act="${e}" data-v="${t}" aria-label="Color"></button>`}function Cs(e){return`<div class="avGrid">${e}</div>`}function ti(e,t){return`<div class="avColors">${Dt.map(n=>Wa(e,n,n===t)).join("")}</div>`}function TL(e,t,n,s){const o=us(e.look2),i=e.id==="__me";xn==="costume"&&!Kr()&&(xn="hair");const a=xn==="costume"?_L(e.costume,e.look2):xn==="hair"?`<h3>Style</h3>${Cs(Qr.map(c=>_n("av-hair",c,$L[c],o.hair===c)).join(""))}<h3>Color</h3><div class="avColors">${zr.map(c=>Wa("av-hairC",c,o.hairC===c)).join("")}</div>`:xn==="face"?`<h3>Skin</h3><div class="avColors">${Vr.map(c=>Wa("av-skin",c,o.skin===c)).join("")}</div><h3>Eyes</h3>${Cs(jr.map(c=>_n("av-eyes",c,SL[c],o.eyes===c)).join(""))}<h3>Eye color</h3><div class="avColors">${kd.map(c=>Wa("av-eyeC",c,o.eyeC===c)).join("")}</div><div class="avToggles">${_n("av-freckles",o.freckles?"0":"1","Freckles",o.freckles)}${_n("av-blush",o.blush?"0":"1","Blush",o.blush)}</div>`:xn==="clothes"?`<h3>Top</h3>${Cs(qr.map(c=>_n("av-top",c,xL[c],!o.dress&&o.top===c)).join(""))}${ti("av-topC",o.topC)}<h3>Bottom</h3>${Cs(Nr.map(c=>_n("av-bottom",c,ML[c],!o.dress&&o.bottom===c)).join(""))}${ti("av-bottomC",o.bottomC)}<h3>Dress</h3>${Cs(Zr.map(c=>_n("av-dress",c,LL[c],o.dress===c)).join(""))}${ti("av-dressC",o.dressC)}`:xn==="shoes"?`<h3>Shoes</h3>${Cs(Fr.map(c=>_n("av-shoes",c,EL[c],o.shoes===c)).join(""))}${ti("av-shoesC",o.shoesC)}`:`<h3>Extras</h3><p class="avHint">Pick up to two</p>${Cs(xo.map(c=>_n("av-acc",c,CL[c],o.acc.indexOf(c)>=0)).join(""))}${ti("av-accC",o.accC)}`,r=bL.map(c=>`<button type="button" class="avOpt sz${c===e.size?" on":""}" data-act="size" data-v="${c}">${PL[c]}</button>`).join(""),l=i?'<div class="meNote">This is you!</div>':`<button type="button" class="del${n?" sure":""}" data-act="delc">${s}<span>${n?"Tap again":""}</span></button>`;return`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${t}<div class="dress avLook"><div class="avStageWrap"><div class="avStage chibi-move">${vt(e)}</div>${l}<div class="avSizes">${r}</div></div><div class="avSide"><div class="avTabs">${vL().map(c=>`<button type="button" class="avTab${c.id===xn?" on":""}" data-act="av-tab" data-v="${c.id}">${c.name}</button>`).join("")}</div><div class="avPane">${a}</div><div class="avBar"><button type="button" class="avSurprise" data-act="av-surprise">🎲 Surprise me</button><button type="button" class="avDone" data-act="close">Done</button></div></div></div>`}function RL(e,t,n){if(t==="av-tab")return(n==="hair"||n==="face"||n==="clothes"||n==="shoes"||n==="extras"||n==="costume"&&Kr())&&(xn=n),null;const s=us(e);if(t==="av-hair"&&Qr.indexOf(n)>=0)return{...s,hair:n};if(t==="av-hairC")return{...s,hairC:n};if(t==="av-skin")return{...s,skin:n};if(t==="av-eyes"&&jr.indexOf(n)>=0)return{...s,eyes:n};if(t==="av-eyeC")return{...s,eyeC:n};if(t==="av-freckles")return{...s,freckles:n==="1"};if(t==="av-blush")return{...s,blush:n==="1"};if(t==="av-top"&&qr.indexOf(n)>=0)return{...s,top:n,dress:""};if(t==="av-topC")return{...s,topC:n};if(t==="av-bottom"&&Nr.indexOf(n)>=0)return{...s,bottom:n,dress:""};if(t==="av-bottomC")return{...s,bottomC:n};if(t==="av-dress"&&Zr.indexOf(n)>=0)return{...s,dress:n};if(t==="av-dressC")return{...s,dressC:n};if(t==="av-shoes"&&Fr.indexOf(n)>=0)return{...s,shoes:n};if(t==="av-shoesC")return{...s,shoesC:n};if(t==="av-accC")return{...s,accC:n};if(t==="av-acc"&&xo.indexOf(n)>=0){const o=n,i=s.acc.slice(),a=i.indexOf(o);if(a>=0)i.splice(a,1);else{const r=er(o),l=i.filter(c=>er(c)!==r);return l.push(o),{...s,acc:l.slice(0,2)}}return{...s,acc:i}}return null}function BL(){try{return typeof navigator<"u"&&navigator.webdriver&&!window.__forceAvatarIntro?!1:localStorage.getItem(Tt("avatar-intro"))!=="1"}catch{return!1}}function AL(){try{localStorage.setItem(Tt("avatar-intro"),"1")}catch{}}const Ua="#5a3d5c";function Ql(e,t,n,s,o){return`<path class="${e}" d="${t}" fill="none" stroke="${Ua}" stroke-width="${s}" stroke-linecap="round"/><path class="${e} cloth" d="${t}" fill="none" stroke="${n}" stroke-width="${o}" stroke-linecap="round"/>`}function IL(e){const t=us(e),n=t.skin,s=t.dress!=="",o=s||t.bottom==="skirt"||t.bottom==="tutu",i=o?n:t.bottomC,a=t.shoesC,r=s||t.bottom==="skirt"||t.bottom==="tutu";let l="";if(r){const p=s?t.dressC:t.bottomC;l+=`<path class="dress" d="M75 46 L89 46 L91 53 L73 53 Z" fill="${p}" stroke="${Ua}" stroke-width="1.1" stroke-linejoin="round"/>`}l+=Ql("thigh","M76 44 Q83 48 88 54",i,6.2,4.8),l+=`<circle class="knee" cx="88" cy="56" r="2.3" fill="${i}" stroke="${Ua}" stroke-width="1.1"/>`;const c=t.shoes==="boots"||t.shoes==="rainboots";l+=Ql("shin",c?"M88 58 Q90 64 91 68":"M88 58 Q90 65 91 70",o?n:i,5.8,4.4),!c&&(t.shoes==="sneakers"||t.shoes==="maryjanes"||t.shoes==="lightup")&&(l+=Ql("shin","M90 66 Q90.6 68 91 70","#ffffff",5.4,4));const d=t.shoes==="sandals"?n:a,f=c?66:69;return l+=`<path class="shoe" d="M90 ${f} Q90 ${f-2} 94 ${f-2} Q99 ${f-2} 100 ${f+1} Q100 ${f+5} 95 ${f+5} Q90 ${f+5} 90 ${f+2} Z" fill="${d}" stroke="${Ua}" stroke-width="1.1" stroke-linejoin="round"/>`,t.shoes==="sandals"&&(l+=`<path d="M90 ${f+5} L100 ${f+5}" stroke="${a}" stroke-width="1.3" stroke-linecap="round"/>`,l+=`<path d="M93 ${f} L97 ${f+3}" stroke="${a}" stroke-width="1.1" stroke-linecap="round"/>`),`<svg class="rideleg" viewBox="0 0 160 130">${l}</svg>`}let Ne=null,Jt=null,Eo=null,ni=null,ln=0,Va=0;const ql=[261.63,293.66,329.63,392,440,523.25,587.33,659.25,783.99,880],qc=[[4,-1,5,4,2,-1,3,-1],[2,3,4,-1,3,2,0,-1],[5,-1,7,6,5,-1,4,-1],[3,2,1,-1,2,-1,0,-1]],Up=[130.81,98,110,98];function eu(){try{return Ne??=new(window.AudioContext||window.webkitAudioContext),Jt||(Jt=Ne.createGain(),Jt.gain.value=.5,Jt.connect(Ne.destination)),Ne.state==="suspended"&&Ne.resume().catch(()=>{}),!0}catch{return!1}}function $a(e,t,n,s,o){if(!Ne||!Jt)return;const i=Ne.createOscillator(),a=Ne.createGain();i.type=s,i.frequency.setValueAtTime(e,t),a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(o,t+.03),a.gain.exponentialRampToValueAtTime(5e-4,t+n),i.connect(a).connect(Jt),i.start(t),i.stop(t+n+.05)}function DL(){if(!Ne||!Eo)return;if(!Wd||document.hidden){ln=Ne.currentTime+.1;return}const e=Ae/2e3*(Eo==="musicbox"?1.35:1);for(ln<Ne.currentTime&&(ln=Ne.currentTime+.05);ln<Ne.currentTime+.4;){const t=Math.floor(Va/8)%qc.length,n=Va%8,s=qc[t][n];Eo==="musicbox"?s>=0&&$a(ql[Math.min(ql.length-1,s+3)]*2,ln,.9,"sine",.05):(s>=0&&$a(ql[s],ln,.5,"triangle",.045),n===0&&$a(Up[t],ln,1.6,"sine",.06),n===4&&$a(Up[t]*1.5,ln,1,"sine",.035)),Va++,ln+=e}}function Vp(e){if(e!==Eo){if(Eo=e,!Eo){if(ni&&(clearInterval(ni),ni=null),Jt&&Ne){const t=Jt.gain;t.cancelScheduledValues(Ne.currentTime),t.setValueAtTime(t.value,Ne.currentTime),t.linearRampToValueAtTime(1e-4,Ne.currentTime+.4)}return}!eu()||!Ne||!Jt||(Jt.gain.cancelScheduledValues(Ne.currentTime),Jt.gain.setValueAtTime(.5,Ne.currentTime+.42),Va=Math.floor(Date.now()/(Ae/2))%(qc.length*8),ln=Ne.currentTime+.45,ni||(ni=setInterval(DL,120)))}}function OL(){eu()}const HL=2,WL=340,UL=380;function VL(e,t){const n=new Map;for(const[a,r]of t){if(r.kind!=="dance")continue;const l=e.find(c=>c.id===r.item);!l||!l.on||Jn(l.kind)!=="stereo"||(n.get(r.item)??n.set(r.item,[]).get(r.item)).push(a)}let s=null;for(const a of[...n].sort((r,l)=>r[0]<l[0]?-1:1))a[1].length>=HL&&(!s||a[1].length>s[1].length)&&(s=a);if(!s)return null;const o=e.find(a=>a.id===s[0]),i=e.filter(a=>a.id!==o.id&&bd(a.kind)&&Math.hypot(a.x-o.x,(a.y-o.y)*1.5)<=WL).map(a=>a.id).sort();return{stereo:o.id,x:o.x,y:o.y,dancers:s[1].sort(),toys:i}}const zL="http://www.w3.org/1999/xhtml",zp=new Map;function Nc(e){if(e.startsWith("data:"))return Promise.resolve(e);let t=zp.get(e);return t||(t=(async()=>{try{const n=new URL(e,location.href);if(n.origin!==location.origin)return"";const o=await(await fetch(n.href,{credentials:"same-origin"})).blob();return await new Promise(i=>{const a=new FileReader;a.onload=()=>i(String(a.result)),a.onerror=()=>i(""),a.readAsDataURL(o)})}catch{return""}})(),zp.set(e,t)),t}const Zc=/url\((['"]?)([^'")]+)\1\)/g;async function Qp(e,t,n){const s=new Map;for(const i of e.matchAll(Zc)){const a=i[2];if(a.startsWith("data:")||a.startsWith("#"))continue;let r=a;try{r=new URL(a,t).href}catch{}s.set(a,r)}const o=new Map;return await Promise.all([...s].map(async([i,a])=>o.set(i,n(a)?await Nc(a):""))),e.replace(Zc,(i,a,r)=>{if(r.startsWith("data:")||r.startsWith("#"))return i;const l=o.get(r);return l?`url("${l}")`:"none"})}const QL=["transform","translate","rotate","scale","opacity","filter"];async function qL(e,t){const n=e.offsetWidth,s=e.offsetHeight,o=new Map;for(const _ of document.getAnimations()){const P=_.effect?.target;if(!P||!(e===P||e.contains(P))||_.effect.pseudoElement)continue;const x=getComputedStyle(P);o.set(P,QL.map(E=>`${E}:${x.getPropertyValue(E)}`).join(";"))}const i=new Set,a=_=>{for(const P of _.matchAll(Zc))try{i.add(new URL(P[2],location.href).href)}catch{}},r=[e,...e.querySelectorAll("*")];for(const _ of r)a(getComputedStyle(_).backgroundImage),a(getComputedStyle(_,"::before").backgroundImage),a(getComputedStyle(_,"::after").backgroundImage);const l=e.cloneNode(!0),c=[l,...l.querySelectorAll("*")],d=[];r.forEach((_,P)=>{const x=c[P];if(!x)return;const E=o.get(_);E&&x.setAttribute("style",(x.getAttribute("style")||"")+";"+E);const W=x.getAttribute("style");if(W&&W.includes("url(")&&d.push(Qp(W,location.href,()=>!0).then(V=>x.setAttribute("style",V))),_ instanceof HTMLImageElement&&x instanceof HTMLImageElement){const V=_.currentSrc||_.src;x.removeAttribute("srcset"),x.removeAttribute("loading"),d.push(Nc(V).then(ne=>{ne?x.src=ne:x.removeAttribute("src")}))}else if(_ instanceof HTMLCanvasElement)try{const V=document.createElement("img");V.src=_.toDataURL(),V.setAttribute("style",getComputedStyle(_).cssText||`width:${_.offsetWidth}px;height:${_.offsetHeight}px`),V.className=_.className,x.replaceWith(V)}catch{}else if(_ instanceof SVGImageElement){const V=_.href.baseVal;V&&d.push(Nc(V).then(ne=>{ne&&x.setAttribute("href",ne)}))}_.tagName==="BUTTON"&&_.classList.contains("nudge")&&x.setAttribute("style","display:none")}),l.style.transform="none",l.style.left="0",l.style.top="0",l.style.position="relative",l.style.margin="0";let f="";for(const _ of[...document.styleSheets])try{const P=[..._.cssRules].map(x=>x.cssText).join(`
`);f+=await Qp(P,_.href||location.href,x=>i.has(x))}catch{}f=f.replace(/:root\b/g,".pbHtml")+`
*,*::before,*::after{animation:none!important;transition:none!important}`,await Promise.all(d);const p=document.documentElement,g=document.body,b=new XMLSerializer,m=`<div xmlns="${zL}" class="pbHtml ${p.className}" style="${qp(p.getAttribute("style")||"")};width:${n}px;height:${s}px;overflow:hidden"><style>${f.replace(/<\/style/gi,"<\\/style")}</style><body class="${qp(g.className)}" style="margin:0;width:${n}px;height:${s}px;overflow:hidden;background:transparent"><div id="app"><div class="stageWrap" style="position:relative;margin:0;padding:0;width:${n}px;height:${s}px;inset:auto;transform:none">`+b.serializeToString(l)+"</div></div></body></div>",k=`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${s}" viewBox="0 0 ${n} ${s}"><foreignObject x="0" y="0" width="${n}" height="${s}">${m}</foreignObject></svg>`,y="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(k),u=document.createElement("canvas");u.width=Math.round(n*t),u.height=Math.round(s*t);const w=u.getContext("2d");try{const _=new Image;_.decoding="sync",_.src=y,await _.decode().catch(()=>new Promise(P=>{_.onload=P,_.onerror=P})),w.drawImage(_,0,0,u.width,u.height),await new Promise(P=>setTimeout(P,60)),w.clearRect(0,0,u.width,u.height),w.drawImage(_,0,0,u.width,u.height)}finally{}return u}const qp=e=>e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");function NL(e,t=new Date,n=0){const s=e.width/600,o=Math.round(26*s),i=Math.round(64*s),a=document.createElement("canvas");a.width=e.width+o*2,a.height=e.height+o+i;const r=a.getContext("2d"),l=r.createLinearGradient(0,0,a.width,a.height);l.addColorStop(0,"#ffd6e8"),l.addColorStop(.5,"#fff1c9"),l.addColorStop(1,"#d9ecff"),r.fillStyle=l,Nl(r,0,0,a.width,a.height,30*s),r.fill(),r.lineWidth=5*s,r.strokeStyle="#5a3d5c",Nl(r,2.5*s,2.5*s,a.width-5*s,a.height-5*s,28*s),r.stroke(),r.save(),n>0&&(Nl(r,o,o,e.width,e.height,n),r.clip()),r.drawImage(e,o,o),r.restore();const c=["#ff7aa8","#ffd166","#7ec8ff","#b48cff","#8ee08e"];for(let d=0;d<26;d++){const p=d/26*a.width,g=d%2?o/2:a.height-i/2+(d%4-1.5)*8*s;r.fillStyle=c[d%5],r.beginPath(),r.arc(p+10*s,(d%2,g),4*s,0,Math.PI*2),r.fill()}return ZL(r,o*1.2,a.height-i/2,14*s,"#ffd166"),FL(r,a.width-o*1.3,a.height-i/2,13*s,"#ff7aa8"),r.fillStyle="#5a3d5c",r.textAlign="center",r.textBaseline="middle",r.font=`800 ${Math.round(24*s)}px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif`,r.fillText("Our cozy house · "+t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),a.width/2,a.height-i/2),a}function Nl(e,t,n,s,o,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+s,n,t+s,n+o,i),e.arcTo(t+s,n+o,t,n+o,i),e.arcTo(t,n+o,t,n,i),e.arcTo(t,n,t+s,n,i),e.closePath()}function ZL(e,t,n,s,o){e.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?s*.45:s;e.lineTo(t+Math.cos(a)*r,n+Math.sin(a)*r)}e.closePath(),e.fillStyle=o,e.fill(),e.lineWidth=s/5,e.strokeStyle="#5a3d5c",e.stroke()}function FL(e,t,n,s,o){e.beginPath(),e.moveTo(t,n+s*.9),e.bezierCurveTo(t-s*1.6,n-s*.2,t-s*.6,n-s*1.3,t,n-s*.4),e.bezierCurveTo(t+s*.6,n-s*1.3,t+s*1.6,n-s*.2,t,n+s*.9),e.fillStyle=o,e.fill(),e.lineWidth=s/5,e.strokeStyle="#5a3d5c",e.stroke()}function jL(e,t){const n=t.getBoundingClientRect(),s=t.parentElement?.getBoundingClientRect(),o=(g,b)=>g?(parseFloat(getComputedStyle(g).borderTopRightRadius)||0)*b:0,i=e.width/(n.width||1),a=e.height/(n.height||1),r=e.width/Math.max(1,t.offsetWidth);if(!s||!n.width)return{c:e,radius:o(t,r)};const l=Math.max(n.left,s.left,0),c=Math.max(n.top,s.top,0),d=Math.min(n.right,s.right,innerWidth),f=Math.min(n.bottom,s.bottom,innerHeight);if(d-l>=n.width-2&&f-c>=n.height-2)return{c:e,radius:o(t,r)};if(d<=l||f<=c)return{c:e,radius:o(t,r)};const p=document.createElement("canvas");return p.width=Math.round((d-l)*i),p.height=Math.round((f-c)*a),p.getContext("2d").drawImage(e,(l-n.left)*i,(c-n.top)*a,p.width,p.height,0,0,p.width,p.height),{c:p,radius:o(t.parentElement,i)}}const GL=()=>typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let Zl=!1;async function YL(e,t){if(!Zl){Zl=!0;try{const n=Math.min(2,Math.max(1,window.devicePixelRatio||1),1600/Math.max(1,e.offsetWidth)),s=qL(e,n),o=document.createElement("div");o.className="pbFlash"+(GL()?" soft":""),document.body.appendChild(o),t?.(),setTimeout(()=>o.remove(),700);const i=jL(await s,e),a=NL(i.c,new Date,i.radius),r=await new Promise(l=>a.toBlob(l,"image/png"));if(!r)return;KL(r)}catch(n){console.warn("photo booth",n)}finally{Zl=!1}}}function KL(e){document.querySelector(".pbCard")?.remove();const t=URL.createObjectURL(e),n="cozy-house-"+new Date().toISOString().slice(0,10)+".png",s=typeof File=="function"?new File([e],n,{type:"image/png"}):null,o=document.createElement("div");o.className="pbCard",o.setAttribute("role","dialog"),o.setAttribute("aria-label","Your photo"),o.innerHTML=`<div class="pbInner"><img class="pbImg" alt="Your photo" src="${t}"/><div class="pbBtns"><button type="button" class="pbSave">💾 Save</button><button type="button" class="pbClose">Close</button></div></div>`,document.body.appendChild(o);const i=()=>{o.remove(),setTimeout(()=>URL.revokeObjectURL(t),1e3)};o.querySelector(".pbClose").addEventListener("click",i),o.addEventListener("click",a=>{a.target===o&&i()}),o.querySelector(".pbSave").addEventListener("click",async()=>{const a=navigator;if(s&&a.share&&a.canShare?.({files:[s]}))try{await a.share({files:[s]});return}catch(l){if(l?.name==="AbortError")return}const r=document.createElement("a");r.href=t,r.download=n,document.body.appendChild(r),r.click(),r.remove()})}const XL=/rug|lamp|light|plant|curtain|clock|window|lantern/;function JL(e){if(e.cat==="plants")return!0;const t=`${e.name} ${e.kind??""}`.toLowerCase();return XL.test(t)}const tu=new Set(["pack:ring-light","pack:desk-lamp",...C2,...I2]);function nu(e,t=new Date){return e.pack===bg&&!kg(t)}function su(e){const t=e.rooms??[];return t.includes("backyard")&&!t.includes("any")}function e9(e,t){if(t==="nursery"&&e.kind&&tu.has(e.kind))return!1;if(t==="backyard")return su(e);if(t==="all"||!t)return!0;const n=e.rooms;return!n||n.length===0||n.includes(t)?!0:n.includes("any")?e.cat==="decor"||e.cat==="furniture"?JL(e):!0:!1}function t9(e,t,n,s,o){return e.secret&&!(o&&o.has(e.secret))||nu(e)||!s&&n==="backyard"&&!su(e)||n==="nursery"&&e.kind&&tu.has(e.kind)?!1:t.startsWith("pack:")?e.pack===t.slice(5):e.cat!==t?!1:e9(e,s?"all":n)}const ou="cozy-candy",Np=["🍬","🍭","🍫","🍪","🧁","🍎"];function iu(e){try{const t=Number(e?.getItem(ou)??0);return Number.isFinite(t)&&t>0?Math.min(9999,Math.floor(t)):0}catch{return 0}}function n9(e,t=Math.random()){const n=Math.min(9999,iu(e)+1);try{e?.setItem(ou,String(n))}catch{}return{count:n,treat:Np[Math.floor(Math.max(0,Math.min(.999,t))*Np.length)]}}function au(e=new Date,t=typeof location<"u"?location.search:""){return/[?&]halloween=0\b/.test(t)?!1:/[?&]halloween=1\b/.test(t)||kg(e)}function s9(e){return`${String(e??"").replace(/[^\p{L}' -]/gu,"").replace(/\s+/g," ").trim().slice(0,30)||"A friend"} came trick-or-treating!`}const o9=200,i9=170,a9=210,r9=420,l9=70,kr=12e3,c9=4200,d9=3,Fl=["wave","hop","heart"];function Ui(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return(t>>>0)%1e4/1e4}const jl=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5),f9=(e,t)=>e.id<t.id?-1:e.id>t.id?1:0;function p9(e,t,n,s){const o=Ui(e+"|"+t+"|"+n)*kr;return(s+o)%kr<c9}function h9(e,t,n,s){const o=Ui(e+"|"+t+"|"+n)*kr,i=Math.floor((s+o)/kr);return Fl[Math.floor(Ui(e+t+n+i)*Fl.length)%Fl.length]}function g9(e,t,n,s,o){const i={pair:new Map,duet:new Map,nearBaby:new Map,babyCoo:!1,pets:new Map},a=[...t].sort(f9),r=new Set;for(const p of a){if(!p.dancingAt||r.has(p.id))continue;let g=null,b=1/0;for(const m of a){if(m===p||r.has(m.id)||m.dancingAt!==p.dancingAt)continue;const k=jl(p,m);k<=i9&&k<b&&(b=k,g=m)}if(g){const m=Ui(e+p.id+g.id);i.duet.set(p.id,{with:g.id,face:g.x<p.x?-1:1,phase:m}),i.duet.set(g.id,{with:p.id,face:p.x<g.x?-1:1,phase:m}),r.add(p.id),r.add(g.id)}}const l=a.filter(p=>!p.busy&&!p.lying),c=[];for(let p=0;p<l.length;p++)for(let g=p+1;g<l.length;g++){const b=jl(l[p],l[g]);b<=o9&&c.push({a:l[p],b:l[g],d:b})}c.sort((p,g)=>p.d-g.d||(p.a.id+p.b.id<g.a.id+g.b.id?-1:1));const d=new Set;for(const{a:p,b:g}of c){if(i.pair.size>=d9*2)break;if(d.has(p.id)||d.has(g.id)||(d.add(p.id),d.add(g.id),!p9(e,p.id,g.id,o)))continue;let b=h9(e,p.id,g.id,o);b==="hop"&&(p.seated||g.seated)&&(b="wave");const m=Ui(e+p.id+g.id);i.pair.set(p.id,{kind:b,with:g.id,face:g.x<p.x?-1:1,phase:m}),i.pair.set(g.id,{kind:b,with:p.id,face:p.x<g.x?-1:1,phase:(m+.18)%1})}if(s)for(const p of a)!p.lying&&jl(p,s)<=a9&&(i.nearBaby.set(p.id,s.x<p.x?-1:1),i.babyCoo=!0);const f=a.filter(p=>p.seated||p.lying);for(const p of[...n].sort((g,b)=>g.key<b.key?-1:1)){let g=null,b=1/0;for(const u of f){const w=Math.abs(u.x-p.x);w<=r9&&w<b&&(b=w,g=u)}if(!g)continue;const m=p.x<=g.x?-1:1,k=[...i.pets.values()].some(u=>u.toward===g.id),y=g.x+m*l9*(k?1.9:1);i.pets.set(p.key,{toward:g.id,dx:Math.round(y-p.x)})}return i}const u9={play:Ae,listen:Ae*4,stir:Ae*2,swing:Ae*3,slide:Ae*4,look:Ae*5,kneel:Ae*3},m9={play:"<span>♪</span><span>♩</span>",listen:"<span>♪</span>"},y9={keys:"<span>♪</span><span>♫</span><span>♩</span>",stove:'<span class="steam"></span><span class="steam"></span><span class="steam"></span>',water:'<span class="bub"></span><span class="bub"></span><span class="ripple"></span>',ducky:""},Li=new Map;let si=null;function b9(e){try{si??=new(window.AudioContext||window.webkitAudioContext);const t=si.currentTime+.02,n=[523.25,587.33,659.25,783.99,880,1046.5];for(let s=0;s<6;s++){const o=si.createOscillator(),i=si.createGain();o.type="triangle",o.frequency.value=n[(e+s*(s%2?2:3))%n.length];const a=t+s*.28;i.gain.setValueAtTime(0,a),i.gain.linearRampToValueAtTime(.06,a+.02),i.gain.exponentialRampToValueAtTime(8e-4,a+.6),o.connect(i).connect(si.destination),o.start(a),o.stop(a+.65)}}catch{}}function k9(e,t,n,s){if(yd(e)!=="keys")return!1;const o=Date.now();return(Li.get(t)??0)>o?Li.delete(t):(Li.set(t,o+Nf),n&&b9(o%6),setTimeout(s,Nf+60)),s(),!0}function w9(e=Date.now()){const t=new Set;return Li.forEach((n,s)=>{n>e?t.add(s):Li.delete(s)}),t}function v9(e,t,n,s,o,i){const a=yd(e);if(a==="keys")return s.has(t)?"keys":null;if(a==="stove")return o.has(t)?"stove":null;if(a==="water"){for(const r of n.values())if(r.item===t&&r.kind==="look")return"water";return null}return Lm(e)&&i?"ducky":null}const Zp=["soc-wave","soc-hop","soc-heart","soc-l","soc-r","soc-duet","soc-baby"];let Fp=new Map,Gl=new Set;const jp=new Map;function _9(e,t){return{x:(e.offsetLeft+e.offsetWidth/2)/t,y:(e.offsetTop+e.offsetHeight)/t}}function $9(e,t){const n=e.layer.offsetWidth/e.roomW||1,s=[],o=new Map;e.layer.querySelectorAll(":scope > .pet").forEach((c,d)=>{if(c.classList.contains("lifted")||c.classList.contains("kenneled"))return;const f=c.classList.contains("pet-cat")?"cat":c.dataset.dog||"pet"+d;s.push({key:f,..._9(c,n)}),o.set(f,c)});const i=[];for(const[c,{d}]of e.dolls){const f=t.get(c);i.push({...d,id:c,busy:!!f,dancingAt:f?.kind==="dance"?f.item:void 0})}const a=g9(e.seed,i,s,e.baby,e.now),r=new Map;for(const c of i)for(const d of i)c!==d&&Math.hypot(c.x-d.x,(c.y-d.y)*1.5)<=200&&(r.get(c.id)??r.set(c.id,new Set).get(c.id)).add(d.id);for(const[c,d]of r)for(const f of d)!Fp.get(c)?.has(f)&&Gl.has(c)&&Gl.has(f)&&jp.set(c,e.now+1800);Fp=r,Gl=new Set(i.map(c=>c.id));for(const[c,{el:d}]of e.dolls){const f=t.get(c),p=a.pair.get(c),g=a.duet.get(c),b=a.nearBaby.get(c),m=(jp.get(c)??0)>e.now;let k="",y=0,u=0;if(g&&f)k="soc-duet",y=g.face,u=g.phase;else if(!f&&m){k="soc-wave";const P=[...r.get(c)??[]][0],x=P?e.dolls.get(P)?.d:void 0;y=x?x.x<e.dolls.get(c).d.x?-1:1:0}else!f&&p?(k="soc-"+p.kind,y=p.face,u=p.phase):!f&&b&&(k="soc-baby",y=b);const w=k+y;if(d.dataset.soc===w)continue;if(d.classList.remove(...Zp),!k){delete d.dataset.soc;continue}d.dataset.soc=w,d.classList.add(k),y&&d.classList.add(y<0?"soc-l":"soc-r");const _=Ae*2;d.style.setProperty("--soc-delay",Vs(u,_,e.now)+"ms"),k==="soc-duet"&&d.style.setProperty("--amb-delay",Vs(u,Ae*2,e.now)+"ms")}for(const c of e.layer.querySelectorAll("[data-soc]"))c.dataset.id||c.dataset.pid,[...e.dolls.values()].some(d=>d.el===c)||(c.classList.remove(...Zp),delete c.dataset.soc);for(const[c,d]of o){const f=a.pets.get(c),p=f&&!e.reduced||f?f.dx*n:0,g=parseFloat(d.dataset.socDx||"0");Math.abs(p-g)<1||(d.dataset.socDx=String(p),d.classList.toggle("soc-trot",Math.abs(p-g)>12&&!e.reduced),d.classList.toggle("soc-snug",!!f),d.style.translate=p?`${p.toFixed(1)}px 0`:"",Math.abs(p-g)>12&&setTimeout(()=>d.classList.remove("soc-trot"),1300))}const l=e.layer.querySelector(":scope > .baby");l&&l.classList.toggle("soc-coo",a.babyCoo)}function ys(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function x9(e){!e||ys()||(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),window.setTimeout(()=>e.classList.remove("wiggle"),480))}const M9=".round, .thing";function L9(){let e=null;const t=()=>{e?.classList.remove("pressing"),e=null};document.addEventListener("pointerdown",n=>{t();const s=n.target?.closest?.(M9);s&&(s.classList.add("pressing"),e=s)},{capture:!0,passive:!0});for(const n of["pointerup","pointercancel","dragstart","blur"])window.addEventListener(n,t,{capture:!0,passive:!0});document.addEventListener("pointerup",n=>{if(ys())return;const s=n.target?.closest("button");s&&(s.classList.remove("spring"),s.offsetWidth,s.classList.add("spring"))},!0)}const ru=Tt("khg.showWishes"),Yl=()=>{try{return localStorage.getItem(ru)!=="0"}catch{return!0}},E9={sleepy:'<svg viewBox="0 0 40 40"><rect x="5" y="20" width="30" height="10" rx="3" fill="#8fb8ff" stroke="#5b3d5c" stroke-width="2.5"/><rect x="7" y="15" width="10" height="7" rx="3" fill="#fff" stroke="#5b3d5c" stroke-width="2.5"/><path d="M6 30 V34 M34 30 V34" stroke="#5b3d5c" stroke-width="2.5" stroke-linecap="round"/><path d="M24 6 H31 L24 13 H31" fill="none" stroke="#5b3d5c" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/></svg>',hungry:'<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="12" fill="#ff6b6b" stroke="#5b3d5c" stroke-width="2.5"/><path d="M20 11 V6" stroke="#5b3d5c" stroke-width="2.5" stroke-linecap="round"/><path d="M21 9 Q28 4 31 9 Q26 13 21 9 Z" fill="#7bd389" stroke="#5b3d5c" stroke-width="2"/></svg>',playful:'<svg viewBox="0 0 40 40"><ellipse cx="20" cy="16" rx="10" ry="12" fill="#ffd166" stroke="#5b3d5c" stroke-width="2.5"/><path d="M18 28 L22 28 L20 31 Z" fill="#ffd166" stroke="#5b3d5c" stroke-width="2"/><path d="M20 31 Q16 34 20 37" fill="none" stroke="#5b3d5c" stroke-width="2" stroke-linecap="round"/></svg>',clean:'<svg viewBox="0 0 40 40"><circle cx="15" cy="23" r="9" fill="#bfe9ff" stroke="#5b3d5c" stroke-width="2.5"/><circle cx="27" cy="14" r="6" fill="#bfe9ff" stroke="#5b3d5c" stroke-width="2.5"/><circle cx="29" cy="29" r="4" fill="#bfe9ff" stroke="#5b3d5c" stroke-width="2"/><path d="M11 19 Q13 17 15 17" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>'},S9={sleepy:"wants a nap",hungry:"wants a snack",playful:"wants to play",clean:"wants a bath"},C9='<svg viewBox="0 0 48 48"><path d="M6 28 Q24 8 42 28" fill="none" stroke="#5b3d5c" stroke-width="3" stroke-linecap="round"/><ellipse cx="24" cy="30" rx="14" ry="11" fill="#fff" stroke="#5b3d5c" stroke-width="3"/><circle cx="20" cy="30" r="5" fill="#ffd166" stroke="#5b3d5c" stroke-width="2.5"/><circle cx="31" cy="24" r="3" fill="#fff" stroke="#5b3d5c" stroke-width="2"/></svg>',P9='<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="11" fill="#eee" stroke="#5b3d5c" stroke-width="3"/><path d="M10 40 L38 18" stroke="#5b3d5c" stroke-width="3" stroke-linecap="round"/></svg>',T9=(e,t)=>e==="sleepy"?/(^|-|:)bed$|bunk-bed|canopy-bed/.test(t):e==="hungry"?Wo(t):e==="clean"?Ho(t):Ai(t);function R9(e,t,n){const s=e.rooms[t.room]?.items??[],o=r=>n==="sleepy"?/bed|crib|cot/.test(r):n==="hungry"?Wo(r)||sr(r):n==="clean"?Ho(r):Ai(r);let i=null,a=1/0;for(const r of s)if(o(r.kind)){const l=Math.abs(r.x-t.x);l<a&&(a=l,i=r.x)}return i}function B9(e){const t=new Map,n=new Map;let s=0,o=performance.now(),i=0,a=0;const r=document.createElement("button");r.type="button",r.className="menuRow",r.id="btnWishes",r.innerHTML='<span class="mIco" id="wishIco"></span><span class="mLabel">Wishes</span>';const l=()=>{const m=Yl();r.querySelector("#wishIco").innerHTML=m?C9:P9,r.setAttribute("aria-label",m?"Wishes on":"Wishes off"),r.setAttribute("aria-pressed",String(m))};r.addEventListener("click",()=>{try{localStorage.setItem(ru,Yl()?"0":"1")}catch{}l(),R.click(),p()}),e.menuAfter?.insertAdjacentElement("afterend",r),l();function c(m){if(ys()){m.classList.add("need-glow"),setTimeout(()=>m.classList.remove("need-glow"),900);return}const k=document.createElement("div");k.className="need-burst",k.setAttribute("aria-hidden","true");for(let u=0;u<7;u++){const w=document.createElement("i");w.className=u%2?"nb-heart":"nb-spark",w.style.setProperty("--a",u/7*360+15+"deg"),w.style.setProperty("--dl",u*40+"ms"),k.appendChild(w)}m.appendChild(k),setTimeout(()=>k.remove(),1400);const y=m.querySelector(":scope > .inner");y?.classList.remove("need-hop"),y?.offsetWidth,y?.classList.add("need-hop")}function d(m,k,y){const u=m.offsetWidth?m.getBoundingClientRect().width/m.offsetWidth:1;if(u>0&&Number.isFinite(u)&&k.style.setProperty("--nbs",u.toFixed(3)),!y){k.style.left="",k.style.bottom="";return}const w=m.querySelector(".inner svg .dollhead");if(!w)return;const _=m.getBoundingClientRect(),P=w.getBoundingClientRect();!_.width||!_.height||!P.width||(k.style.left=((P.left+P.width/2-_.left)/_.width*100).toFixed(1)+"%",k.style.bottom=((_.bottom-P.top)/_.height*100+4).toFixed(1)+"%")}function f(m){const k=m.querySelector(".inner svg .dollhead");if(!k)return;const y=m.getBoundingClientRect(),u=k.getBoundingClientRect();!y.width||!y.height||!u.width||(m.style.setProperty("--zx",((u.left+u.width*.7-y.left)/y.width*100).toFixed(1)+"%"),m.style.setProperty("--zy",((u.top-y.top)/y.height*100-14).toFixed(1)+"%"))}function p(){const m=e.get(),k=Yl();for(const u of e.layer.querySelectorAll(".char[data-cid]")){const w=m.characters.find(K=>K.id===u.dataset.cid);if(!w)continue;const _={sleepy:3,hungry:3,playful:3,clean:3};for(const K of zs)_[K]=Ns(w,K);const P=t.get(w.id);P&&zs.some(K=>_[K]>P[K])&&(c(u),R.sparkle()),t.set(w.id,_);const x=or(w),E=!!w.seat&&w.seat.pose==="lie";u.classList.toggle("need-snooze",E),E?requestAnimationFrame(()=>f(u)):(u.style.removeProperty("--zx"),u.style.removeProperty("--zy")),u.classList.toggle("need-sleepy",x==="sleepy"&&!E);let W=u.querySelector(":scope > .need-bubble");if(!x||!k){if(W){W.classList.remove("show");const K=W;setTimeout(()=>{K.classList.contains("show")||K.remove()},450)}continue}W||(W=document.createElement("div"),W.className="need-bubble",W.innerHTML='<i class="nb-dot1"></i><i class="nb-dot2"></i><span class="nb-cloud"></span>',u.appendChild(W)),W.dataset.need!==x&&(W.dataset.need=x,W.querySelector(".nb-cloud").innerHTML=E9[x],W.setAttribute("role","img"),W.setAttribute("aria-label",S9[x]));const V=R9(m,w,x),ne=V==null?0:Math.max(-1,Math.min(1,(V-w.x)/300));W.style.setProperty("--lean",String(Math.round(ne*100)/100));const Y=W;requestAnimationFrame(()=>{d(u,Y,E),Y.classList.add("show")})}for(const u of t.keys())m.characters.some(w=>w.id===u)||t.delete(u);const y=new Set;if(k){for(const u of m.characters)if(u.room===m.currentRoom&&or(u)){for(const w of zs)if(Ns(u,w)<=1)for(const _ of m.rooms[m.currentRoom]?.items??[])T9(w,_.kind)&&y.add(_.id)}}for(const u of e.layer.querySelectorAll(".item[data-id]"))u.classList.toggle("need-hint",y.has(u.dataset.id))}function g(){if(!e.speaks())return;const m=e.get(),k=Date.now();for(const y of m.characters)if(y.room===m.currentRoom)for(const u of H1(m,y)){const w=y.id+"|"+u;k-(n.get(w)??0)<2500||(n.set(w,k),e.dispatch({type:"need/meet",id:y.id,need:u}))}}function b(m){const k=performance.now(),y=m??Math.min(k-o,5e3);if(o=k,m==null&&document.visibilityState!=="visible")return;if(!e.canDrift()||!e.speaks()){s=0;return}if(s+=y,s<I1(e.get(),a))return;s=0,a++;const u=V1(e.get(),i++);u&&e.dispatch({type:"need/drift",id:u.id,need:u.need})}e.subscribe(()=>{p(),setTimeout(g,0)}),e.layer.addEventListener("pointerup",m=>{m.target.closest?.(".char[data-cid]")&&(n.clear(),g())}),setInterval(()=>{b(),p()},1e3),document.addEventListener("visibilitychange",()=>{o=performance.now()}),p(),new URLSearchParams(location.search).has("needsqa")&&(window.__needs={tick:m=>b(m),visible:()=>s,paint:p,care:g})}function A9(e){const t=e.scale;let n=0;e.overflowR>1&&e.overflowL>1?n=-e.overflowL:e.overflowR>1?n=e.overflowR:e.overflowL>1&&(n=-e.overflowL);const s=e.cam+n/t,o=Math.max(0,Math.min(e.maxCam,s)),i=s-o,a=e.nudgeX&&Math.abs(i)>.5?e.kidX-i:e.kidX;return{cam:o,kidX:a}}function I9(e){const t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[1][0]).toUpperCase():"?"}function D9(e,t=3){const n=[...e].sort((r,l)=>r.x-l.x||r.id.localeCompare(l.id)),s=[],o=[],i=(r,l,c)=>s.some(d=>d.lane===c&&Math.abs(d.x-r)<(d.w+l)/2+8),a=[];for(const r of n){let l=-1;for(let c=0;c<t;c++)if(!i(r.x,r.w,c)){l=c;break}l<0?a.push(r):(s.push({x:r.x,w:r.w,lane:l}),o.push({id:r.id,lane:l,initials:!1}))}for(const r of a){const l=Math.min(r.w,44);let c=0;for(let d=0;d<t;d++)if(!i(r.x,l,d)){c=d;break}s.push({x:r.x,w:l,lane:c}),o.push({id:r.id,lane:c,initials:!0})}return o}let O9=0;function lu(e=document){const t=[...e.querySelectorAll(".nametag")].filter(o=>{const i=o.getBoundingClientRect();return i.width>2&&i.height>2});if(!t.length)return;const n=t.map(o=>{o.dataset.tagId||(o.dataset.tagId="tg"+(++O9).toString(36)),o.dataset.full||(o.dataset.full=(o.textContent||"").trim()),o.classList.contains("is-initials")||(o.dataset.fullW=String(o.getBoundingClientRect().width));const i=o.getBoundingClientRect(),a=Number(o.dataset.fullW)||i.width;return{id:o.dataset.tagId,x:i.left+i.width/2,w:a}}),s=new Map(D9(n).map(o=>[o.id,o]));for(const o of t){const i=s.get(o.dataset.tagId||"");if(!i)continue;const a=o.dataset.full||"",r=i.initials?I9(a):a;o.textContent!==r&&(o.textContent=r),o.classList.toggle("is-initials",i.initials),o.style.setProperty("--tag-lane",String(i.lane))}}const cu="#5a3d5c",xt=`stroke="${cu}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,H9={living:"#ff8fab",bedroom:"#c9a0dc",kitchen:"#8fd6a6",salon:"#f0a0d8",nursery:"#9ad7f5",bathroom:"#7ec8d6",backyard:"#80ed99"};function W9(e){const t=H9[e]??"#ffb3c6";return`<div class="sceneWin builtin-window" aria-hidden="true"><svg viewBox="0 0 160 180">
    <path d="M18 20 H142 V150 H18 Z" fill="#fff6ea" ${xt}/>
    <path d="M28 30 H132 V118 H28 Z" fill="#b9e3ff" ${xt}/>
    <path d="M80 30 V118 M28 74 H132" ${xt} stroke-width="3"/>
    <circle cx="48" cy="52" r="10" fill="#fff" opacity=".85"/>
    <ellipse cx="108" cy="48" rx="16" ry="8" fill="#fff" opacity=".8"/>
    <path d="M40 118 Q58 96 70 118 Q90 100 112 118" fill="#7dce8a" stroke="${cu}" stroke-width="3"/>
    <rect x="96" y="86" width="8" height="32" rx="3" fill="#6b4a32" ${xt} stroke-width="2"/>
    <circle cx="100" cy="80" r="12" fill="#5cc985" ${xt} stroke-width="2"/>
    <path d="M8 16 Q6 80 16 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <path d="M152 16 Q154 80 144 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <rect x="46" y="146" width="68" height="12" rx="4" fill="#ffe7c2" ${xt}/>
  </svg></div>`}function U9(){return`<div class="sceneRug" aria-hidden="true"><svg viewBox="0 0 200 80">
    <ellipse cx="100" cy="48" rx="92" ry="24" fill="#ffc8dd" ${xt}/>
    <ellipse cx="100" cy="48" rx="64" ry="15" fill="#bde0fe" ${xt} stroke-width="3"/>
    <ellipse cx="100" cy="48" rx="28" ry="7" fill="#fff6ea"/>
  </svg></div>
  <div class="sceneLamp" aria-hidden="true"><svg viewBox="0 0 80 160">
    <path d="M18 52 L30 8 H50 L62 52 Z" fill="#ffd166" ${xt}/>
    <rect x="36" y="52" width="8" height="78" rx="4" fill="#c9a0dc" ${xt}/>
    <ellipse cx="40" cy="136" rx="26" ry="8" fill="#b388d6" ${xt}/>
    <circle cx="34" cy="28" r="4" fill="#fff" opacity=".8"/>
  </svg></div>
  <div class="scenePlant" aria-hidden="true"><svg viewBox="0 0 90 140">
    <path d="M45 128 C45 90 18 78 20 48 C40 58 44 80 45 128" fill="#5cc985" ${xt}/>
    <path d="M45 128 C45 92 74 70 78 40 C58 54 50 82 45 128" fill="#80ed99" ${xt}/>
    <path d="M45 128 C40 96 28 88 22 70" fill="none" stroke="#3d9a62" stroke-width="3"/>
    <path d="M30 132 H62 L56 118 H36 Z" fill="#e07a5f" ${xt}/>
    <ellipse cx="46" cy="126" rx="16" ry="5" fill="#c4634a"/>
  </svg></div>`}function V9(e,t){return t==="backyard"?[]:[{id:e("rug"),kind:"rug",x:1152,y:540,flip:!1,z:0,scale:1},{id:e("lamp"),kind:"lamp",x:804,y:470,flip:!1,z:0,scale:1},{id:e("plant"),kind:"plant",x:1584,y:480,flip:!1,z:0,scale:1}]}let Rs="",du=null;function z9(e){du=e,Rs=""}function Q9(e,t,n){const s=du?.(t,n);if(s!=null){const r="custom|"+t;if(r===Rs&&e.childElementCount)return;Rs=r,e.innerHTML=s,e.dataset.room=t;return}if(t==="backyard"){const r="yard|"+t;if(r===Rs&&e.childElementCount)return;Rs=r,e.innerHTML="",e.dataset.room=t;return}const o=n.length===0,i=n.some(r=>/window|curtain/i.test(r.kind)),a=t+(o?"|e":"")+(i?"|w":"");a===Rs&&e.childElementCount||(Rs=a,e.innerHTML=(i?"":W9(t))+(o?U9():""),e.dataset.room=t)}const He="#5a3d5c",T=(e=4)=>`stroke="${He}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,sa=600,nn=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],pn=(e,t,n=3)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${He}"/><circle cx="${e+1}" cy="${t-1}" r="${n/3}" fill="#fff"/>`,Hs=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="5" ry="3" fill="#ff9bb5" opacity=".75"/>`,q9=(e,t,n,s)=>nn.map((o,i)=>`<path d="M${e-n+i*s} ${t} A${n-i*s} ${n-i*s} 0 0 1 ${e+n-i*s} ${t}" fill="none" stroke="${o}" stroke-width="${s}"/>`).join(""),N9=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${T()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${T()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${T()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${T()}/></g>`,Cn=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-46" y="-50" width="92" height="50" rx="14" fill="#f5d27a" ${T()}/>
  <path d="M-30 -42 V-8 M0 -44 V-6 M30 -42 V-8" stroke="#d9a93f" stroke-width="4" stroke-linecap="round"/><path d="M-46 -26 H46" stroke="#c98a2e" stroke-width="5"/></g>`,Z9=(e,t,n)=>{const s=Array.from({length:Math.floor((t-e)/70)+1},(o,i)=>`<rect x="${e+i*70-7}" y="${n-58}" width="14" height="64" rx="5" fill="#fff6e6" ${T(3)}/>`).join("");return`<rect x="${e}" y="${n-46}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${T(3)}/><rect x="${e}" y="${n-22}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${T(3)}/>${s}`};function F9(){const e=Yi;return`<svg class="parkScene ranchScene" viewBox="0 0 ${e} ${sa}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="rcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7e8ff"/><stop offset="1" stop-color="#fff4fb"/></linearGradient></defs>
  <rect width="${e}" height="440" fill="url(#rcSky)"/>
  <g opacity=".55">${q9(1900,430,620,26)}</g>
  ${[160,820,1500,2300,3e3].map((t,n)=>`<g transform="translate(${t} ${70+n%2*34})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <g transform="translate(${e-200} 92)"><circle r="48" fill="#ffe066" ${T()}/>${pn(-15,-6,4)}${pn(13,-6,4)}<path d="M-14 12 Q0 24 14 12" fill="none" ${T(3)}/>${Hs(-26,8)}${Hs(26,8)}</g>
  <path d="M-50 370 Q600 230 1300 350 T2600 330 T${e+100} 360 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#a6e3a0"/><path d="M0 410 H${e}" ${T()}/>
  <path d="M0 566 Q900 530 1800 570 T${e} 552 V600 H0 Z" fill="#f2dcb8" opacity=".9"/>
  ${N9(3560,400,.8,"#4fbf7a")}
  <!-- entrance gate with a rainbow arch -->
  <g class="ranchSign"><g class="ranchSignArt"><rect x="40" y="290" width="24" height="210" rx="6" fill="#c99366" ${T()}/><rect x="196" y="290" width="24" height="210" rx="6" fill="#c99366" ${T()}/>
    <path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${He}" stroke-width="44" stroke-linecap="round"/>
    ${nn.map((t,n)=>`<path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${t}" stroke-width="${36-n*6}" stroke-linecap="round"/>`).join("")}
    <rect x="22" y="250" width="216" height="40" rx="14" fill="#fff6e6" ${T(3)}/><text x="130" y="277" text-anchor="middle" font-size="19" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  <!-- red barn with rainbow trim and banner -->
  <g transform="translate(270 0)">
    <path d="M0 470 V250 L60 180 H270 L330 250 V470 Z" fill="#ef5b5b" ${T(5)}/>
    <path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${He}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    ${nn.map((t,n)=>`<path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${t}" stroke-width="3" transform="translate(0 ${-7+n*2.8})" stroke-linejoin="round"/>`).join("")}
    <rect x="115" y="215" width="100" height="56" rx="10" fill="#fff6e6" ${T(4)}/><path d="M115 215 L215 271 M215 215 L115 271" stroke="#ef5b5b" stroke-width="6"/>
    <rect x="95" y="330" width="140" height="140" rx="8" fill="#fff6e6" ${T(4)}/><rect x="108" y="342" width="56" height="128" fill="#d94848" ${T(3)}/><rect x="166" y="342" width="56" height="128" fill="#d94848" ${T(3)}/>
    <path d="M108 342 L164 470 M164 342 L108 470 M166 342 L222 470 M222 342 L166 470" stroke="#fff6e6" stroke-width="6"/>
    <g class="barnBanner" transform="translate(165 300)"><g class="ranchSignArt">${nn.map((t,n)=>`<rect x="${-120+n*40}" y="-16" width="40" height="30" fill="${t}"/>`).join("")}<rect x="-120" y="-16" width="240" height="30" fill="none" ${T(3)}/>
      <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${He}" stroke-width="4" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  </g>
  ${Cn(640,560,.8)}${Cn(1950,470,.7)}${Cn(1880,470,.55)}${Cn(3115,470,.7)}${Cn(3115,425,.55)}
  <!-- the petting zoo moved into the barn: a sign by the barn door, sunflowers where the pen was -->
  ${Array.from({length:6},(t,n)=>{const s=1030+n*66,o=70+n%3*18;return`<g transform="translate(${s} 470)"><path d="M0 0 V-${o}" stroke="#40c057" stroke-width="6" stroke-linecap="round"/><ellipse cx="${n%2?9:-9}" cy="-${o/2}" rx="11" ry="5" fill="#69db7c" ${T(2.5)}/>${[0,45,90,135,180,225,270,315].map(i=>`<ellipse cx="${Math.cos(i*Math.PI/180)*14}" cy="${-o+Math.sin(i*Math.PI/180)*14}" rx="8" ry="5" transform="rotate(${i} ${Math.cos(i*Math.PI/180)*14} ${-o+Math.sin(i*Math.PI/180)*14})" fill="#ffd43b" ${T(2)}/>`).join("")}<circle cy="-${o}" r="10" fill="#a0522d" ${T(2.5)}/></g>`}).join("")}
  <!-- pond -->
  <ellipse cx="${kt.x}" cy="${kt.y}" rx="${kt.rx}" ry="${kt.ry}" fill="#8ecae6" ${T()}/><ellipse cx="${kt.x-15}" cy="${kt.y-6}" rx="70" ry="16" fill="#bde6f7"/>
  <!-- paddock fence + HORSES sign are their own depth layer (paddockFenceSVG) -->
  <!-- garden -->
  <rect x="3140" y="520" width="420" height="70" rx="20" fill="#b07d54" ${T()}/>
  <rect x="3260" y="430" width="160" height="40" rx="12" fill="#fff6e6" ${T(3)}/><text x="3340" y="458" text-anchor="middle" font-size="21" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">GARDEN</text>
  <path d="M3340 470 V500" ${T(5)}/>
  </svg>`}function j9(){return`<svg class="fenceLayer" viewBox="0 0 ${Yi} ${sa}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  ${Z9(2400,3080,470)}
  <rect x="2640" y="380" width="180" height="40" rx="12" fill="#fff6e6" ${T(3)}/><text x="2730" y="408" text-anchor="middle" font-size="21" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">HORSES</text>
  </svg>`}const fu=[{name:"Goat",say:"Meh-eh-eh!",snd:"bleat"},{name:"Sheep",say:"Baa!",snd:"baa"},{name:"Piglet",say:"Oink oink!",snd:"oink"},{name:"Chicks",say:"Peep peep!",snd:"peep"},{name:"Bunny",say:"*wiggle wiggle*",snd:"squeak"},{name:"Cow",say:"Moooo!",snd:"moo"}],xa=(e,t,n,s=94)=>e.map((o,i)=>`<rect class="leg ${i%2?"b":"a"}" x="${o}" y="${t}" width="9" height="${s-t}" rx="4" fill="${n}" ${T(3)}/>`).join("");function Fc(e){switch(e){case 0:return`<svg viewBox="0 0 120 100">${xa([32,44,70,82],60,"#efe6dc")}<path class="tail" d="M24 50 l-8 -10" ${T(5)}/>
      <ellipse cx="58" cy="56" rx="34" ry="17" fill="#f4ede5" ${T()}/><g class="head"><path d="M86 30 l-6 -16 l10 10 Z M96 30 l2 -17 l5 13 Z" fill="#c9b8a8" ${T(3)}/>
      <ellipse cx="94" cy="40" rx="14" ry="16" fill="#f4ede5" ${T()}/><ellipse class="ear" cx="80" cy="36" rx="9" ry="4" fill="#e8d6c4" ${T(3)}/>${pn(98,36)}<path d="M98 56 q2 8 6 0" fill="#e8d6c4" ${T(3)}/>${Hs(102,46)}<circle cx="106" cy="44" r="2" fill="${He}"/></g></svg>`;case 1:return`<svg viewBox="0 0 120 100">${xa([36,48,70,80],62,"#5a4a5c")}
      ${[[40,50],[56,44],[72,48],[86,56],[70,64],[48,64],[34,60]].map(([t,n])=>`<circle cx="${t}" cy="${n}" r="15" fill="#fff" ${T(3)}/>`).join("")}<ellipse cx="60" cy="55" rx="30" ry="14" fill="#fff"/>
      <g class="head"><ellipse cx="96" cy="46" rx="13" ry="15" fill="#6b5a6e" ${T()}/><circle cx="92" cy="32" r="8" fill="#fff" ${T(3)}/><ellipse class="ear" cx="82" cy="44" rx="8" ry="4" fill="#6b5a6e" ${T(3)}/>
      <circle cx="99" cy="42" r="3.2" fill="#fff"/><circle cx="99.5" cy="42" r="1.8" fill="${He}"/>${Hs(102,52)}</g></svg>`;case 2:return`<svg viewBox="0 0 120 100">${xa([38,50,66,78],66,"#ffadc6")}<path class="tail" d="M28 54 q-10 -4 -6 -12 q6 0 2 8" fill="none" ${T(3)}/>
      <ellipse cx="58" cy="60" rx="32" ry="20" fill="#ffc2d4" ${T()}/><g class="head"><circle cx="90" cy="52" r="16" fill="#ffc2d4" ${T()}/><path d="M80 38 l2 -12 l9 8 Z" fill="#ffadc6" ${T(3)}/>
      <ellipse cx="104" cy="56" rx="7" ry="8" fill="#ff9bb8" ${T(3)}/><circle cx="102" cy="54" r="1.6" fill="${He}"/><circle cx="106" cy="57" r="1.6" fill="${He}"/>${pn(92,46)}${Hs(90,60)}</g></svg>`;case 3:return`<svg viewBox="0 0 120 100">${[[30,72,1],[62,66,1.15],[92,74,.95]].map(([t,n,s])=>`<g transform="translate(${t} ${n}) scale(${s})"><path d="M-4 16 v8 M4 16 v8" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="4" r="14" fill="#ffe066" ${T(3)}/><path d="M-8 2 q-6 4 0 8" fill="#ffd43b" ${T(2)}/><g class="head"><circle cx="5" cy="-8" r="9" fill="#ffe066" ${T(3)}/><path d="M13 -9 l7 2 l-7 3 Z" fill="#ff9f43" ${T(2)}/>${pn(7,-10,2.2)}</g></g>`).join("")}</svg>`;case 4:return`<svg viewBox="0 0 120 100"><circle class="tail" cx="30" cy="68" r="8" fill="#fff" ${T(3)}/><ellipse cx="56" cy="72" rx="28" ry="20" fill="#f6eef9" ${T()}/><ellipse cx="74" cy="90" rx="12" ry="5" fill="#f6eef9" ${T(3)}/>
      <g class="head"><ellipse class="ear" cx="78" cy="26" rx="7" ry="20" fill="#f6eef9" ${T(3)} transform="rotate(-12 78 26)"/><ellipse cx="78" cy="26" rx="3" ry="13" fill="#ffc2d4" transform="rotate(-12 78 26)"/>
      <ellipse cx="90" cy="28" rx="7" ry="20" fill="#f6eef9" ${T(3)} transform="rotate(10 90 28)"/><circle cx="86" cy="56" r="17" fill="#f6eef9" ${T()}/>${pn(92,52)}<circle cx="102" cy="58" r="2.5" fill="#ff8fab"/>${Hs(90,63)}</g></svg>`;default:return`<svg viewBox="0 0 120 100">${xa([30,42,72,84],62,"#fff")}<path class="tail" d="M20 50 q-6 14 0 26" fill="none" ${T(3)}/>
      <rect x="18" y="38" width="80" height="34" rx="16" fill="#fff" ${T()}/><path d="M30 40 q10 8 4 20 q-10 -2 -10 -14 Z M60 42 q14 2 10 18 q-12 4 -14 -8 Z" fill="${He}"/><ellipse cx="60" cy="74" rx="8" ry="5" fill="#ffadc6" ${T(2)}/>
      <g class="head"><path d="M90 24 l-8 -8 M108 24 l8 -8" stroke="#f5d27a" stroke-width="5" stroke-linecap="round"/><rect x="86" y="22" width="26" height="30" rx="12" fill="#fff" ${T()}/>
      <ellipse cx="100" cy="52" rx="14" ry="10" fill="#ffc2d4" ${T(3)}/><circle cx="95" cy="52" r="1.8" fill="${He}"/><circle cx="105" cy="52" r="1.8" fill="${He}"/>${pn(94,34)}${pn(106,34)}
      <ellipse class="ear" cx="82" cy="30" rx="7" ry="4" fill="#fff" ${T(3)}/></g></svg>`}}const kt={x:2265,y:520,rx:110,ry:34},G9=476,wr=[{name:"Chestnut",body:"#c97b45",mane:"#7a3f22",sock:"#fff6e6"},{name:"Snowy",body:"#fdf8f3",mane:"#d9cdc4",sock:"#e9ddd2"},{name:"Midnight",body:"#4a3f52",mane:"#2a2230",sock:"#6b5e74"},{name:"Sunny",body:"#f2c96b",mane:"#fff6e0",sock:"#fff6e0"},{name:"Rainbow Pony",body:"#fff0fa",mane:"rainbow",sock:"#ffd6ec"}];function Kd(e,t=!1){const n=wr[e]??wr[0],s=n.mane==="rainbow",o=s?nn.map((r,l)=>{const c=124-l*1.6,d=14+l*2.4;return`<path d="M${c.toFixed(1)} ${d.toFixed(1)} q-6.5 2 -4.5 ${6+l*.35}" fill="none" stroke="${r}" stroke-width="5.5" stroke-linecap="round"/>`}).join(""):`<path d="M106 20 q-14 6 -18 30 q8 -6 10 -2 q4 -12 14 -18 Z" fill="${n.mane}" ${T(3)}/>`,i=s?`<g class="tail">${nn.map((r,l)=>`<path d="M30 58 q-18 ${8+l*3} -14 ${36+l}" fill="none" stroke="${r}" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`:`<path class="tail" d="M30 56 q-20 10 -14 44 q10 -10 8 -20 q6 -10 10 -18 Z" fill="${n.mane}" ${T(3)}/>`,a=(r,l)=>`<g class="leg ${l}"><rect x="${r}" y="78" width="12" height="44" rx="5" fill="${n.body}" ${T(3)}/><rect x="${r}" y="110" width="12" height="12" rx="4" fill="${n.sock}" ${T(3)}/></g>`;return`<svg viewBox="0 0 160 130" class="horsesvg">${i}${a(40,"a")}${a(56,"b")}${a(96,"b")}${a(112,"a")}
    <ellipse cx="80" cy="68" rx="50" ry="24" fill="${n.body}" ${T()}/>
    ${t||s?`<path class="saddle" data-top="43" d="M64 46 q16 -6 32 0 l-2 22 q-14 4 -28 0 Z" fill="${s?"#b197fc":"#e8590c"}" ${T(3)}/>`:""}
    <g class="head"><path d="M108 66 L114 30 Q118 16 132 18 L148 36 Q152 46 142 48 L130 46 L128 70 Z" fill="${n.body}" ${T()}/>
    <path d="M114 22 l2 -14 l8 12 Z" fill="${n.body}" ${T(3)}/>${o}
    ${pn(130,30,3.4)}<circle cx="146" cy="42" r="2" fill="${He}"/>${Hs(136,40)}
    ${s?`<path d="M120 14 l4 -14 l4 14 Z" fill="#ffd43b" ${T(2)}/>`:""}</g>
    ${s?'<g fill="#fff" opacity=".9"><path d="M60 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M92 74 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/></g>':""}</svg>`}const Y9=`<svg viewBox="0 0 180 170"><path d="M10 70 L90 14 L170 70" fill="#ffa94d" ${T(5)}/>
  <rect x="24" y="66" width="132" height="84" rx="8" fill="#fff6e6" ${T()}/>${nn.map((e,t)=>`<rect x="${24+t*22}" y="66" width="22" height="10" fill="${e}"/>`).join("")}
  <rect x="24" y="66" width="132" height="10" fill="none" ${T(3)}/><circle cx="90" cy="108" r="22" fill="#5a3d5c"/>
  <path d="M60 150 l-12 16 M120 150 l12 16" ${T(5)}/>
  <g class="hen"><ellipse cx="90" cy="118" rx="20" ry="14" fill="#fff" ${T(3)}/><circle cx="104" cy="104" r="10" fill="#fff" ${T(3)}/><path d="M100 94 q3 -8 8 0" fill="#ff6b6b" ${T(2)}/>
  <path d="M113 104 l7 2 -7 3 Z" fill="#ffa94d" ${T(2)}/>${pn(106,102,2)}</g>
  <text x="90" y="54" text-anchor="middle" font-size="16" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">EGGS</text></svg>`,K9=`<svg viewBox="0 0 170 130"><rect x="80" y="30" width="54" height="50" rx="8" fill="#bde6f7" ${T()}/><rect x="74" y="24" width="66" height="10" rx="4" fill="#ff6b6b" ${T(3)}/>
  <rect x="20" y="62" width="130" height="34" rx="12" fill="#ff6b6b" ${T()}/><rect x="28" y="40" width="10" height="24" rx="3" fill="#868e96" ${T(3)}/>
  <circle cx="122" cy="98" r="28" fill="${He}"/><circle cx="122" cy="98" r="13" fill="#ffd43b" ${T(3)}/><circle cx="44" cy="106" r="18" fill="${He}"/><circle cx="44" cy="106" r="8" fill="#ffd43b" ${T(3)}/>
  <circle cx="26" cy="76" r="5" fill="#fff3b0" ${T(2)}/></svg>`,X9=`<svg viewBox="0 0 240 300"><rect x="104" y="160" width="32" height="140" rx="10" fill="#c99366" ${T()}/>
  <circle cx="120" cy="110" r="90" fill="#5cc985" ${T()}/><circle cx="62" cy="140" r="50" fill="#5cc985" ${T()}/><circle cx="180" cy="140" r="52" fill="#5cc985" ${T()}/>
  ${[[80,90],[150,70],[175,140],[100,150],[130,115],[60,140]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="11" fill="#ff6b6b" ${T(3)}/><path d="M${e} ${t-10} q2 -6 6 -7" fill="none" ${T(2)}/>`).join("")}</svg>`,Gp=[[80,90],[150,70],[175,140],[100,150]],pu=`<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="14" fill="#ff6b6b" ${T(3)}/><path d="M20 10 q2 -6 6 -7" fill="none" ${T(2.5)}/><ellipse cx="27" cy="8" rx="5" ry="3" fill="#5cc985" ${T(2)}/><circle cx="14" cy="18" r="3" fill="#fff" opacity=".6"/></svg>`,cl=`<svg viewBox="0 0 40 40"><path d="M12 14 L32 10 L16 36 Z" fill="#ff922b" ${T(3)}/><path d="M18 18 l5 -1 M17 24 l4 -1" ${T(2)}/><path d="M30 10 q4 -8 8 -6 M30 10 q-2 -8 2 -10 M30 10 q6 -2 8 2" fill="none" stroke="#40c057" stroke-width="4" stroke-linecap="round"/></svg>`,J9=`<svg viewBox="0 0 40 40"><path d="M6 34 Q20 4 34 34 Z" fill="#f5d27a" ${T(3)}/><path d="M14 30 L18 14 M20 32 V10 M26 30 L22 14" stroke="#d9a93f" stroke-width="2.5" stroke-linecap="round"/></svg>`,Vi=`<svg viewBox="0 0 40 40"><path d="M20 4 C30 4 34 20 34 26 C34 34 28 38 20 38 C12 38 6 34 6 26 C6 20 10 4 20 4 Z" fill="#fff6e6" ${T(3)}/><circle cx="15" cy="16" r="3" fill="#fff"/></svg>`,Xd=(e="#ff8fab")=>`<svg viewBox="0 0 40 40"><path d="M20 38 V20" stroke="#40c057" stroke-width="4" stroke-linecap="round"/>${[0,72,144,216,288].map(t=>`<circle cx="${20+Math.cos(t*Math.PI/180)*8}" cy="${14+Math.sin(t*Math.PI/180)*8}" r="7" fill="${e}" ${T(2.5)}/>`).join("")}<circle cx="20" cy="14" r="5" fill="#ffd43b" ${T(2)}/></svg>`,hu={carrot:cl,apple:pu,hay:J9},eE=e=>`<svg viewBox="0 0 80 90"><g transform="translate(14 0) scale(1.3)">${hu[e].replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g>
  <path d="M10 40 H70 L62 86 H18 Z" fill="${e==="carrot"?"#74c0fc":e==="apple"?"#ffa8c5":"#b2f2bb"}" ${T(4)}/><path d="M12 52 H68" stroke="#fff" stroke-width="4" opacity=".6"/></svg>`,tE=`<svg viewBox="0 0 60 50"><path d="M12 22 Q30 -6 48 22" fill="none" stroke="${He}" stroke-width="7" stroke-linecap="round"/><path d="M12 22 Q30 -6 48 22" fill="none" stroke="#e0a96d" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 22 H56 L50 46 H10 Z" fill="#e0a96d" ${T(3.5)}/><path d="M12 30 H48 M14 38 H46" stroke="#b5793d" stroke-width="3"/></svg>`,Yp=["#ff8fab","#c9a0dc","#ffd43b","#74c0fc","#ff922b"];function gu(e,t,n){const s=`<ellipse cx="35" cy="76" rx="30" ry="11" fill="${e?.wet?"#7a4b2e":"#9c6b46"}" ${T(3)}/>`;if(!e)return`<svg viewBox="0 0 70 90">${s}<path d="M20 74 q4 -3 8 0 M36 78 q4 -3 8 0" stroke="#b5875f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;const o=Yp[n%Yp.length];let i="";t===0&&(i=`<circle cx="27" cy="72" r="3" fill="#f2dcb8" ${T(1.5)}/><circle cx="36" cy="75" r="3" fill="#f2dcb8" ${T(1.5)}/><circle cx="44" cy="71" r="3" fill="#f2dcb8" ${T(1.5)}/>`),t===1&&(i=`<path d="M35 72 V58" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="57" rx="7" ry="4" fill="#69db7c" ${T(2)}/><ellipse cx="41" cy="55" rx="7" ry="4" fill="#69db7c" ${T(2)}/>`),t===2&&(i=`<path d="M35 72 V40 M35 60 Q22 54 20 42 M35 56 Q48 50 50 38" stroke="#40c057" stroke-width="4" fill="none" stroke-linecap="round"/>${e.seed==="flower"?`<circle cx="35" cy="38" r="7" fill="#b2f2bb" ${T(2)}/>`:""}`),t===3&&(i=e.seed==="carrot"?`<path d="M26 74 L44 72 L35 86 Z" fill="#ff922b" ${T(2.5)}/><path d="M35 72 Q24 50 22 38 M35 72 Q36 48 36 34 M35 72 Q46 50 50 40" stroke="#40c057" stroke-width="5" fill="none" stroke-linecap="round"/>`:`<path d="M35 72 V34" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="54" rx="8" ry="4" fill="#69db7c" ${T(2)}/>${[0,72,144,216,288].map(l=>`<circle cx="${35+Math.cos(l*Math.PI/180)*10}" cy="${28+Math.sin(l*Math.PI/180)*10}" r="8" fill="${o}" ${T(2.5)}/>`).join("")}<circle cx="35" cy="28" r="6" fill="#ffd43b" ${T(2)}/>`);const a=e.wet?"":`<g class="needWater"><path d="M56 18 q6 10 0 14 q-6 -4 0 -14 Z" fill="#74c0fc" ${T(2)}/></g>`,r=t===3?`<g class="ready"><path d="M58 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffd43b" ${T(1.5)}/></g>`:"";return`<svg viewBox="0 0 70 90">${s}${i}${a}${r}</svg>`}const nE=`<svg viewBox="0 0 48 48">${nn.map((e,t)=>`<path d="M${6+t*2.6} 38 A${18-t*2.6} ${18-t*2.6} 0 0 1 ${42-t*2.6} 38" fill="none" stroke="${e}" stroke-width="3"/>`).join("")}<path d="M4 38 H44" ${T(3)}/></svg>`,sE=`<svg viewBox="0 0 48 48"><path d="M10 34 Q24 22 38 34" fill="none" ${T(4)}/><path d="M24 30 V8 M16 16 L24 8 L32 16" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40 H40" ${T(4)}/></svg>`,oE=`<svg viewBox="0 0 200 320"><path d="M70 310 L84 120 H116 L130 310 Z" fill="#fff6e6" ${T(4)}/><path d="M78 200 H122 M74 260 H126" ${T(3)}/><rect x="88" y="262" width="24" height="48" rx="10" fill="#b197fc" ${T(3)}/>
  <path d="M78 124 L100 92 L122 124 Z" fill="#ff8fab" ${T(4)}/>
  <g class="sails" style="transform-origin:100px 110px">${[0,90,180,270].map(e=>`<g transform="rotate(${e} 100 110)"><path d="M100 110 L104 30 L126 30 L118 104 Z" fill="${["#ffd43b","#74c0fc","#ff8fab","#69db7c"][e/90]}" ${T(3)}/><path d="M108 40 H122 M107 58 H121 M106 76 H120" ${T(2)}/></g>`).join("")}<circle cx="100" cy="110" r="10" fill="#ffa94d" ${T(3)}/></g></svg>`,iE=["GOAT","SHEEP","PIGLET","CHICKS","BUNNY","COW"],aE=e=>`<g class="lantern" style="transform-origin:${e}px 146px"><path d="M${e} 146 V178" ${T(3)}/><circle cx="${e}" cy="204" r="34" fill="#fff3b0" opacity=".45"/>
  <path d="M${e-14} 182 H${e+14} L${e+11} 226 H${e-11} Z" fill="#ffe066" ${T(3)}/><rect x="${e-17}" y="176" width="34" height="8" rx="3" fill="#495057" ${T(2.5)}/><rect x="${e-15}" y="224" width="30" height="7" rx="3" fill="#495057" ${T(2.5)}/><ellipse cx="${e}" cy="205" rx="5" ry="9" fill="#ff922b"/></g>`;function rE(){const e=wd,t=Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64} 146 V440" stroke="#d4895f" stroke-width="3"/>`).join(""),n=Array.from({length:Math.ceil(e/46)},(o,i)=>{const a=i*46,r=160+Math.sin(i/3.1)*8;return`<path d="M${a} ${r} L${a+40} ${r} L${a+20} ${r+30} Z" fill="${nn[i%6]}" ${T(2.5)}/>`}).join(""),s=vd.map((o,i)=>`<g><rect x="${o-96}" y="318" width="192" height="122" rx="6" fill="#f0c49a" ${T(4)}/>
    <path d="M${o-96} 350 H${o+96} M${o-96} 384 H${o+96} M${o-96} 412 H${o+96}" stroke="#d9a074" stroke-width="3"/><path d="M${o-96} 318 L${o+96} 440 M${o+96} 318 L${o-96} 440" stroke="#e0aa7e" stroke-width="7" opacity=".7"/>
    <rect x="${o-54}" y="284" width="108" height="30" rx="10" fill="#fff6e6" ${T(3)}/><text x="${o}" y="305" text-anchor="middle" font-size="17" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">${iE[i]}</text></g>`).join("");return`<svg class="parkScene ranchScene barnScene" viewBox="0 0 ${e} ${sa}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="440" fill="#e8a87c"/>${t}
  <!-- hay loft -->
  <rect width="${e}" height="128" fill="#c98a5e"/>${Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64+32} 0 V128" stroke="#b5764d" stroke-width="3"/>`).join("")}
  ${[120,260,420,980,1130,1290,1640,1790].map((o,i)=>Cn(o,126,i%3===1?.72:.85)).join("")}${[190,1060,1720].map(o=>Cn(o,82,.7)).join("")}
  <rect x="0" y="126" width="${e}" height="24" fill="#a8653a" ${T(4)}/>
  ${[0,1,2,3,4,5,6].map(o=>`<path d="M${120+o*280} 150 L${180+o*280} 210" stroke="#a8653a" stroke-width="12" stroke-linecap="round"/><path d="M${120+o*280} 150 L${180+o*280} 210" ${T(2)}/>`).join("")}
  <!-- ladder up to the loft -->
  <g transform="translate(1840 0)"><path d="M-22 150 L-30 440 M22 150 L30 440" stroke="#c99366" stroke-width="10" stroke-linecap="round"/>${[190,240,290,340,390].map(o=>`<path d="M${-22-(o-150)*.028} ${o} H${22+(o-150)*.028}" stroke="#c99366" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
  <!-- rainbow bunting + big rainbow banner -->
  <path d="M0 160 Q${e/2} 176 ${e} 160" fill="none" ${T(2)}/>${n}
  <g transform="translate(${e/2+60} 236)">${nn.map((o,i)=>`<rect x="${-180+i*60}" y="-26" width="60" height="44" fill="${o}"/>`).join("")}<rect x="-180" y="-26" width="360" height="44" rx="4" fill="none" ${T(4)}/>
    <path d="M-180 -26 L-200 -4 L-180 18 M180 -26 L200 -4 L180 18" fill="#ff8fab" ${T(3)}/>
    <text x="0" y="6" text-anchor="middle" font-size="26" font-weight="900" fill="#fff" stroke="${He}" stroke-width="5" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  <!-- round windows with daylight -->
  ${[440,1720].map(o=>`<circle cx="${o}" cy="236" r="34" fill="#c7e8ff" ${T(4)}/><path d="M${o-34} 236 H${o+34} M${o} 202 V270" ${T(3)}/>`).join("")}
  ${s}
  <!-- the big door (back outside) -->
  <rect x="24" y="200" width="206" height="244" rx="10" fill="#b5703f" ${T(4)}/>
  <rect x="38" y="214" width="178" height="230" fill="#c7e8ff"/><path d="M38 360 Q120 330 216 352 V444 H38 Z" fill="#a6e3a0"/><circle cx="180" cy="250" r="16" fill="#ffe066"/>
  <path d="M38 214 H216 V444 M38 214 V444" fill="none" ${T(4)}/>
  <!-- straw floor -->
  <rect x="0" y="438" width="${e}" height="162" fill="#f2d58a"/><path d="M0 440 H${e}" ${T(4)}/>
  ${Array.from({length:70},(o,i)=>{const a=i*137%e,r=470+i*53%120;return`<path d="M${a} ${r} l${14+i%3*4} ${i%2?-4:4}" stroke="#d9a93f" stroke-width="3" stroke-linecap="round"/>`}).join("")}
  <!-- feed station -->
  <g transform="translate(356 0)"><rect x="-70" y="456" width="140" height="34" rx="12" fill="#fff6e6" ${T(3)}/><text x="0" y="480" text-anchor="middle" font-size="16" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">FOOD 🥕🍎🌾</text></g>
  ${Cn(1790,590,.8)}${Cn(1700,600,.65)}
  ${[290,660,1330,1590].map(aE).join("")}
  </svg>`}const Io=600,Zt="#5a3d5c",le=(e=4)=>`stroke="${Zt}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function oa(e){const t=Fs[e].seats,n=t<=2?140:t===4?110:100,s=(t-1)/2;return Array.from({length:t},(o,i)=>({x:Fs[e].x+(i-s)*n,y:558-Math.abs(i-s)*8}))}const Kp=["#ff7eb3","#ffd43b","#66d9e8","#d0bfff","#fff"],Kt=(e,t,n=1,s="#fff")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -9 L2.2 -2.4 L9 -2.2 L3.4 2.2 L5.4 9 L0 4.6 L-5.4 9 L-3.4 2.2 L-9 -2.2 L-2.2 -2.4 Z" fill="${s}" stroke="${Zt}" stroke-width="1.2" stroke-linejoin="round"/>`;function jc(e,t,n,s){const o=`<path d="M36 ${t} Q ${e/2} ${t+n+8} ${e-36} ${t}" fill="none" stroke="${Zt}" stroke-width="3"/>`,i=Array.from({length:s},(a,r)=>{const l=s===1?.5:r/(s-1),c=48+l*(e-96),d=t+Math.sin(l*Math.PI)*n,f=Kp[r%Kp.length];return`<g class="bulb" style="animation-delay:-${r%8*.22}s"><line x1="${c}" y1="${d-16}" x2="${c}" y2="${d-6}" stroke="${Zt}" stroke-width="2"/><circle cx="${c}" cy="${d}" r="7.5" fill="${f}" ${le(2)}/><circle cx="${c-2}" cy="${d-2}" r="2.2" fill="#fff" opacity=".85"/></g>`}).join("");return o+i}const oi=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">
  <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".12"/>
  <path d="M-40 10 Q-48 -22 -10 -28 Q10 -46 34 -18 Q50 2 34 18 Q8 32 -24 20 Q-42 16 -40 10 Z" fill="${n}" ${le(3)}/>
  <path d="M-18 -6 Q-4 -20 14 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <circle cx="16" cy="6" r="4" fill="#fff" opacity=".35"/>
</g>`,Xp=(e,t,n)=>`<g transform="translate(${e} ${t})">
  <ellipse cx="0" cy="16" rx="28" ry="9" fill="#000" opacity=".12"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="${n}" ${le(3)}/>
  <ellipse cx="-6" cy="-2" rx="12" ry="7" fill="#fff" opacity=".35"/>
  <path d="M0 -16 V-28" ${le(3)}/><circle cy="-32" r="6" fill="#ffd43b" ${le(2)}/>
</g>`;function ii(e,t,n,s,o,i=""){return`<g class="photoFrame${i}" transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-40" y="-52" width="80" height="104" rx="6" fill="#fff" ${le(3.5)}/>
    <rect x="-32" y="-44" width="64" height="72" rx="4" fill="${s}"/>
    ${o}
    <rect x="-10" y="-58" width="20" height="10" rx="2" fill="#ffe8a3" opacity=".85" transform="rotate(-8)"/>
  </g>`}function Ma(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-28" y="-34" width="56" height="68" rx="3" fill="#fff" ${le(3)}/>
    <rect x="-22" y="-28" width="44" height="40" fill="${s}"/>
    ${o}
  </g>`}function La(e,t,n,s){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="36" rx="26" ry="8" fill="#000" opacity=".12"/>
    <path d="M-18 36 L-12 -2 H12 L18 36 Z" fill="${n}" ${le(3)}/>
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c9a27a" ${le(2)}/>
    <ellipse cx="-16" cy="-16" rx="16" ry="22" fill="${s}" ${le(3)} transform="rotate(-18)"/>
    <ellipse cx="16" cy="-18" rx="16" ry="22" fill="${s}" ${le(3)} transform="rotate(16)"/>
    <ellipse cx="0" cy="-28" rx="14" ry="20" fill="${s}" ${le(3)}/>
    <circle cx="0" cy="-36" r="6" fill="#ff8ec8" ${le(2)}/>
  </g>`}function lE(e,t){return`<g transform="translate(${e} ${t})">
    <ellipse cx="28" cy="118" rx="32" ry="8" fill="#000" opacity=".12"/>
    <rect width="56" height="118" rx="10" fill="#e7fbff" ${le()}/>
    <rect y="52" width="56" height="8" fill="#d0f4ff" ${le(2)}/>
    <rect x="44" y="18" width="6" height="22" rx="3" fill="#ffd43b" ${le(2)}/>
    <rect x="44" y="70" width="6" height="28" rx="3" fill="#ffd43b" ${le(2)}/>
    <rect x="8" y="12" width="28" height="22" rx="4" fill="#fff" ${le(2)}/>
    <circle cx="16" cy="22" r="4" fill="#ff8ec8"/><circle cx="28" cy="24" r="3" fill="#ffd43b"/>
    <path d="M18 78 C14 72 8 74 12 82 C15 88 18 90 18 90 C18 90 21 88 24 82 C28 74 22 72 18 78 Z" fill="#ff4d94" ${le(1.5)}/>
  </g>`}function cE(e,t,n){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="6" rx="34" ry="9" fill="#000" opacity=".1"/>
    <path d="M-46 -16 C-50 -86 -26 -108 0 -110 C26 -108 50 -86 46 -16 Z" fill="#fff6fb" ${le()}/>
    <path d="M-32 -20 C-34 -74 -16 -90 0 -92 C16 -90 34 -74 32 -20 Z" fill="${n}"/>
    <ellipse cx="0" cy="-10" rx="40" ry="16" fill="${n}" ${le()}/>
    <ellipse cx="-8" cy="-16" rx="14" ry="6" fill="#fff" opacity=".4"/>
    <path d="M-22 -2 L-26 16 M22 -2 L26 16" fill="none" stroke="${Zt}" stroke-width="4" stroke-linecap="round"/>
  </g>`}function dE(e){const t=Fs[e],n=t.game==="four"?"Four":"Slay",s=t.game==="four"?"#7ad7ea":e===0?"#ff8ec8":"#e0b0ff",o=t.game==="four"?"#b8f2ff":e===0?"#ffd0e6":"#ead9ff",i=t.seats>=6?250:t.seats>=4?200:150;return`${oa(e).map(r=>cE(r.x,r.y,o)).join("")}
  <g transform="translate(${t.x} 500)">
    <ellipse cx="0" cy="28" rx="${i+18}" ry="20" fill="#000" opacity=".1"/>
    <rect x="-18" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${le(3)}/>
    <rect x="4" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${le(3)}/>
    <ellipse cx="0" cy="-4" rx="${i}" ry="30" fill="${s}" stroke="#ffd43b" stroke-width="6"/>
    <ellipse cx="0" cy="-4" rx="${i-16}" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <ellipse cx="${-i*.25}" cy="-12" rx="${i*.35}" ry="8" fill="#fff" opacity=".28"/>
    <text x="0" y="4" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="${Zt}" stroke-width="4" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${n}</text>
  </g>`}const ai=(e,t,n=1,s="#ff4d94")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 4 C-6 -4 -14 -2 -10 6 C-7 12 0 16 0 16 C0 16 7 12 10 6 C14 -2 6 -4 0 4 Z" fill="${s}" stroke="${Zt}" stroke-width="1.6" stroke-linejoin="round"/>`;function Jp(e,t){const n=Xi,s=Math.max(1,Math.ceil(t));let o="";if(e==="top"){o=`<rect width="${n}" height="${s}" fill="#ffe0f2"/>`;for(let i=s-70,a=0;i>24;i-=150,a++)o+=jc(n,i,a%2?22:16,a%2?26:20);for(let i=0;i<14;i++){const a=90+i*397%(n-180),r=20+i*131%Math.max(20,s-70);o+=Kt(a,r,.55+i%3*.2,i%2?"#fff":"#ffd43b")}}else{o=`<defs><linearGradient id="grFloorExt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e089ab"/><stop offset="1" stop-color="#d27399"/></linearGradient></defs>
  <rect width="${n}" height="${s}" fill="url(#grFloorExt)"/>`;for(let i=46;i<s;i+=64)o+=`<rect y="${i}" width="${n}" height="3" fill="#fff" opacity=".18"/>`}return`<svg class="grExt grExt-${e}" viewBox="0 0 ${n} ${s}" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${o}</svg>`}function fE(){const e=Xi,t=[[120,200],[260,250],[640,210],[900,250],[1180,190],[1560,230],[1860,180],[2100,240],[2420,200],[2520,280]];return`<svg class="grScene" viewBox="0 0 ${e} ${Io}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="${e}" height="${Io}" fill="url(#grWall)"/>
  <rect y="390" width="${e}" height="80" fill="#fff6fb" opacity=".45"/>
  ${Array.from({length:8},(n,s)=>`<rect x="${40+s*330}" y="400" width="280" height="62" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`).join("")}
  <rect y="468" width="${e}" height="132" fill="url(#grFloor)"/>
  <rect y="464" width="${e}" height="12" fill="#ffd43b" ${le(3)}/>
  ${[720,1500,2150].map((n,s)=>`<ellipse cx="${n}" cy="548" rx="${s===1?210:280}" ry="42" fill="${s===1?"#d8f6ff":s===0?"#ffe0f0":"#f3e8ff"}" stroke="#fff" stroke-width="4" opacity=".8"/>`).join("")}
  ${jc(e,28,22,28)}
  ${jc(e,78,16,18)}
  ${t.map(([n,s],o)=>Kt(n,s,.7+o%3*.28,o%2?"#fff":"#ffd43b")).join("")}

  <g transform="translate(1180 70)">
    <rect x="20" y="20" width="220" height="150" rx="16" fill="url(#grSky)" ${le()}/>
    <path d="M20 70 H240 M130 20 V170" ${le(3)}/>
    <circle cx="78" cy="48" r="14" fill="#ffd43b" ${le(2)}/>
    <path d="M8 36 Q20 90 8 150" fill="#ff8ec8" ${le(3)}/><path d="M252 36 Q240 90 252 150" fill="#d0bfff" ${le(3)}/>
  </g>

  <g class="neonSign" transform="translate(560 168)">
    <g class="neonSignArt">
    <rect x="-228" y="-58" width="456" height="108" rx="28" fill="#2b1430" ${le(5)}/>
    <rect class="neonRing" x="-214" y="-44" width="428" height="80" rx="22" fill="none" stroke="#ff4d94" stroke-width="4"/>
    <path d="M-150 8 C-162 -14 -186 -8 -174 12 C-166 26 -150 36 -150 36 C-150 36 -134 26 -126 12 C-114 -8 -138 -14 -150 8 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="2"/>
    <text x="6" y="16" text-anchor="middle" font-size="40" font-weight="900" fill="#ff7eb3" stroke="#fff6fb" stroke-width="2" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY CLUB</text>
    </g>
  </g>

  ${ii(500,340,-6,"#ffe0f0",`${ai(0,8,1.4)}${Kt(-18,-16,.7,"#ffd43b")}${Kt(18,-10,.55,"#66d9e8")}`," frameAtHead")}
  ${ii(270,196,-8,"#ffe0f0",`${ai(0,8,1.4)}${Kt(-18,-16,.7,"#ffd43b")}${Kt(18,-10,.55,"#66d9e8")}`," framePhone")}
  ${ii(980,240,5,"#e7fbff",`<ellipse cx="0" cy="6" rx="16" ry="12" fill="#fff" ${le(2)}/><path d="M-6 6 Q0 -8 6 6" fill="none" stroke="${Zt}" stroke-width="2"/><path d="M0 18 V28 M-12 24 H12" ${le(2)}/>`)}
  ${ii(1680,255,-4,"#fff3c4",`${Kt(0,2,1.5,"#ffd43b")}`)}
  ${ii(2360,245,6,"#f3e8ff",`${ai(0,4,1.3,"#d0bfff")}`)}
  ${Ma(400,300,8,"#fff0f6",ai(0,-4,1.1))}
  ${Ma(820,310,-7,"#e7fbff",Kt(0,-6,1,"#66d9e8"))}
  ${Ma(1900,300,9,"#fff6e6",Kt(0,-6,1,"#ffd43b"))}
  ${Ma(2280,320,-8,"#ffe0f0",ai(0,-4,1))}

  <g class="disco" transform="translate(1288 36)">
    <line y1="0" y2="22" stroke="${Zt}" stroke-width="3"/>
    <circle cy="44" r="26" fill="url(#disco)" ${le(3)}/>
    <path d="M-14 36 L0 56 L14 36 M-8 48 H8" fill="none" stroke="#fff" stroke-width="2.5"/>
    ${Kt(-30,20,.45)}${Kt(32,28,.4,"#ffd43b")}
  </g>

  <g transform="translate(86 292)">
    <rect width="78" height="168" rx="12" fill="#ff8ec8" ${le()}/>
    <rect x="8" y="10" width="62" height="36" rx="8" fill="#fff6e6" ${le(2)}/>
    <text x="39" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="${Zt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
    <circle cx="62" cy="96" r="5" fill="#ffd43b" ${le(2)}/>
    <rect x="22" y="118" width="34" height="8" rx="3" fill="#fff" opacity=".45"/>
  </g>

  ${La(40,400,"#ffd43b","#8ce99a")}
  ${La(1080,392,"#ff8ec8","#69db7c")}
  ${La(1600,400,"#d0bfff","#8ce99a")}
  ${La(2520,396,"#66d9e8","#69db7c")}
  ${lE(200,348)}
  <g transform="translate(2420 360)">
    <rect width="130" height="100" rx="14" fill="#fff6fb" ${le()}/>
    <rect y="28" width="130" height="10" fill="#ffd0e6" ${le(2)}/>
    <circle cx="28" cy="64" r="12" fill="#ffd43b" ${le(2)}/><circle cx="64" cy="66" r="10" fill="#ff8ec8" ${le(2)}/><rect x="86" y="52" width="28" height="22" rx="6" fill="#66d9e8" ${le(2)}/>
    <text x="65" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="${Zt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">SNACKS</text>
  </g>

  ${oi(330,455,"#ff8ec8",1.05)}
  ${oi(1120,468,"#d0bfff")}
  ${oi(1360,470,"#8ce4f2",.9)}
  ${oi(1780,462,"#ffd43b")}
  ${Xp(1480,500,"#ffb3d9")}
  ${Xp(2e3,505,"#c9b3ff")}
  ${oi(2550,468,"#ff8ec8",.85)}

  ${Fs.map((n,s)=>dE(s)).join("")}
  </svg>`}const pE=`<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${Zt}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`,z="#5a3d5c",hE=`<svg viewBox="0 0 120 100"><rect x="0" y="62" width="120" height="38" rx="14" fill="#9fe0aa" stroke="${z}" stroke-width="3"/>
  <path d="M18 70 L30 22 L42 70 M78 70 L90 22 L102 70" fill="none" stroke="#8ecae6" stroke-width="5" stroke-linecap="round"/><path d="M26 22 H94" stroke="#ff8fab" stroke-width="7" stroke-linecap="round"/>
  <path d="M50 22 V54 M66 22 V54" stroke="${z}" stroke-width="2.5"/><rect x="45" y="52" width="26" height="7" rx="3" fill="#ff9f68" stroke="${z}" stroke-width="2.5"/>
  <circle cx="104" cy="14" r="9" fill="#ffd166" stroke="${z}" stroke-width="3"/></svg>`,uu=`<svg viewBox="0 0 120 100"><path d="M20 50 L60 16 L100 50" fill="#ff8fab" stroke="${z}" stroke-width="4" stroke-linejoin="round"/><rect x="28" y="48" width="64" height="44" rx="6" fill="#fff6e6" stroke="${z}" stroke-width="4"/>
  <rect x="52" y="64" width="16" height="28" rx="4" fill="#c9a0dc" stroke="${z}" stroke-width="3"/><rect x="34" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${z}" stroke-width="3"/><rect x="73" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${z}" stroke-width="3"/></svg>`,Jd=`<svg viewBox="0 0 120 100"><path d="M40 18 L24 28 L14 46 L30 52 L34 44 V88 H86 V44 L90 52 L106 46 L96 28 L80 18 Q60 34 40 18 Z" fill="#8ecae6" stroke="${z}" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="58" r="7" fill="#fff3b0" stroke="${z}" stroke-width="3"/></svg>`,ke=e=>`<div class="wnArt">${e}</div>`,mu=`<svg viewBox="0 0 120 100"><rect x="16" y="58" width="74" height="24" rx="10" fill="#fff" stroke="${z}" stroke-width="4"/><circle cx="32" cy="70" r="7" fill="#ff8fab" stroke="${z}" stroke-width="3"/><circle cx="52" cy="70" r="7" fill="#ffe066" stroke="${z}" stroke-width="3"/><circle cx="72" cy="70" r="7" fill="#8ecae6" stroke="${z}" stroke-width="3"/><path d="M86 46 l14 -16 8 8 -14 16z" fill="#ffd166" stroke="${z}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="44" width="12" height="24" rx="4" fill="#c9a0dc" stroke="${z}" stroke-width="3"/></svg>`,gE=`<svg viewBox="0 0 120 100">${nn.map((e,t)=>`<path d="M${12+t*6} 84 A${48-t*6} ${48-t*6} 0 0 1 ${108-t*6} 84" fill="none" stroke="${e}" stroke-width="6"/>`).join("")}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${z}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${z}" stroke-width="3"/></svg>`,uE=`<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${Vi.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g><g transform="translate(52 22) scale(1.4)">${Vi.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g></svg>`,Gc=(e,t,n,s)=>`<g transform="translate(${t} ${n}) scale(${s})">${e.replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"")}</g>`,mE=`<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${z}" stroke-width="4"/>${Gc(md(vt({skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6"})).replace('viewBox="14 2 72 74"','viewBox="0 0 100 160"'),26,12,.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`,yE=`<svg viewBox="0 0 120 100"><rect x="8" y="28" width="104" height="64" rx="16" fill="#fff0f6" stroke="${z}" stroke-width="4"/><path d="M8 40 L60 12 L112 40" fill="#ff6b9a" stroke="${z}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 58 C52 48 40 50 46 60 C50 68 60 74 60 74 C60 74 70 68 74 60 C80 50 68 48 60 58 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  ${[18,34,50,66,82,98].map((e,t)=>`<circle cx="${e}" cy="24" r="4" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" stroke="${z}" stroke-width="1.5"/>`).join("")}</svg>`,bE=`<svg viewBox="0 0 120 100"><rect x="28" y="8" width="64" height="84" rx="12" fill="#fff" stroke="${z}" stroke-width="4"/><rect x="28" y="8" width="64" height="84" rx="12" fill="none" stroke="#ff7eb3" stroke-width="6"/><path d="M48 36 L54 24 L60 34 L68 20 L76 34 L82 24 L88 36 Z" fill="#ffd43b" stroke="${z}" stroke-width="2" stroke-linejoin="round"/><text x="60" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#ff4d94" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY</text></svg>`,kE=`<svg viewBox="0 0 120 100"><rect x="10" y="16" width="100" height="72" rx="14" fill="#fff6fb" stroke="${z}" stroke-width="4"/>
  <path d="M36 58 C28 48 18 50 24 60 C28 68 36 74 36 74 C36 74 44 68 48 60 C54 50 44 48 36 58 Z" fill="#ff4d94" stroke="${z}" stroke-width="2"/>
  <path d="M78 28 L82 40 H94 L84 48 L88 60 L78 52 L68 60 L72 48 L62 40 H74 Z" fill="#66d9e8" stroke="${z}" stroke-width="2"/></svg>`,yu=`<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="22" rx="6" fill="#fff" stroke="${z}" stroke-width="3"/><path d="M6 26 H42 M14 18 V40 M22 18 V40 M30 18 V40 M36 18 V40" stroke="${z}" stroke-width="2.4"/><rect x="4" y="12" width="40" height="8" rx="4" fill="#9ad7f5" stroke="${z}" stroke-width="3"/><ellipse cx="20" cy="32" rx="5" ry="3" fill="#ffe0ec"/><ellipse cx="30" cy="32" rx="5" ry="3" fill="#c9e7ff"/></svg>`,wE=`<svg viewBox="0 0 120 100"><ellipse cx="60" cy="72" rx="50" ry="20" fill="#ffc2d4" stroke="${z}" stroke-width="4"/><ellipse cx="60" cy="72" rx="32" ry="11" fill="#fff" stroke="${z}" stroke-width="3"/><path d="M60 58 C50 46 36 48 42 60 C48 70 60 78 60 78 C60 78 72 70 78 60 C84 48 70 46 60 58 Z" fill="#ff4d94" stroke="${z}" stroke-width="3"/><path d="M22 40 Q28 28 36 36" fill="none" stroke="#7dce8a" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="5" fill="#ffd166" stroke="${z}" stroke-width="2"/></svg>`,vE=`<svg viewBox="0 0 120 100"><path d="M16 50 L60 14 L104 50" fill="#ff8fab" stroke="${z}" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="48" width="68" height="40" rx="10" fill="#fff6ea" stroke="${z}" stroke-width="4"/><path d="M42 88 V60 Q60 44 78 60 V88" fill="#ffe8c7" stroke="${z}" stroke-width="3"/><circle cx="82" cy="64" r="7" fill="#bde0fe" stroke="${z}" stroke-width="3"/><circle cx="80" cy="62" r="2" fill="#fff"/></svg>`,_E=`<svg viewBox="0 0 120 100"><rect x="28" y="38" width="64" height="42" rx="8" fill="#8ecae6" stroke="${z}" stroke-width="4"/><path d="M28 44 L60 68 L92 44" fill="none" stroke="${z}" stroke-width="4"/><path d="M76 30 V16" stroke="${z}" stroke-width="4" stroke-linecap="round"/><path d="M76 16 H96 L90 23 L96 30 H76 Z" fill="#ff6b6b" stroke="${z}" stroke-width="3"/></svg>`,$E=`<svg viewBox="0 0 120 100"><rect x="8" y="32" width="48" height="40" rx="14" fill="#fff3b0" stroke="${z}" stroke-width="4"/><rect x="64" y="32" width="48" height="40" rx="14" fill="#fff" stroke="${z}" stroke-width="4"/><path d="M26 44 L40 52 L26 60 Z" fill="${z}"/><circle cx="88" cy="52" r="6" fill="#ff8fab" stroke="${z}" stroke-width="3"/></svg>`,xE=`<svg viewBox="0 0 120 100"><rect x="16" y="18" width="36" height="58" rx="6" fill="#fff" stroke="${z}" stroke-width="4"/><rect x="62" y="24" width="42" height="52" rx="6" fill="#e7f6ff" stroke="${z}" stroke-width="4"/><circle cx="34" cy="66" r="2.4" fill="${z}"/><circle cx="83" cy="66" r="2.4" fill="${z}"/></svg>`,bu=`<svg viewBox="0 0 120 100"><rect x="28" y="16" width="64" height="72" rx="16" fill="#fff" stroke="${z}" stroke-width="4"/><path d="M40 36 H80 M40 52 H80 M40 68 H80" fill="none" stroke="${z}" stroke-width="5" stroke-linecap="round"/><circle cx="92" cy="24" r="12" fill="#ff6b9a" stroke="${z}" stroke-width="3"/><text x="92" y="29" text-anchor="middle" font-size="14" font-weight="900" fill="#fff" font-family="Nunito, ui-rounded, system-ui, sans-serif">1</text></svg>`,ME=`<svg viewBox="0 0 120 100"><rect x="6" y="10" width="108" height="80" rx="18" fill="#2a2158" stroke="${z}" stroke-width="4"/><circle cx="34" cy="42" r="14" fill="#ffd166" stroke="${z}" stroke-width="3"/><path d="M78 28 a16 16 0 1 0 0 32 a12 12 0 1 1 0 -32z" fill="#fff6e4" stroke="${z}" stroke-width="3"/><circle cx="92" cy="30" r="2" fill="#fff"/><circle cx="70" cy="24" r="1.6" fill="#fff"/><circle cx="100" cy="48" r="1.6" fill="#fff"/></svg>`,LE=`<svg viewBox="0 0 120 100"><circle cx="60" cy="52" r="34" fill="#fff6e4" stroke="${z}" stroke-width="4"/><path d="M60 52 V32 M60 52 L76 60" stroke="${z}" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="52" r="3" fill="${z}"/><path d="M28 22 l4 6 M92 22 l-4 6" stroke="#ffb15c" stroke-width="4" stroke-linecap="round"/></svg>`,ku=`<svg viewBox="0 0 120 100"><path d="M60 18 L72 46 H96 L78 62 L84 90 L60 74 L36 90 L42 62 L24 46 H48 Z" fill="#ffd166" stroke="${z}" stroke-width="4" stroke-linejoin="round"/><path d="M60 48 L28 92 H92 Z" fill="#2f6b4f" stroke="${z}" stroke-width="4" stroke-linejoin="round"/><rect x="52" y="88" width="16" height="8" rx="2" fill="#c44558" stroke="${z}" stroke-width="3"/></svg>`,wu=[{v:10,title:"Winter Cheer!",lines:[{art:ke(ku),text:"The <b>Winter Cheer</b> pack is in your drawer!"}]},{v:9,title:"Everything's tidied into the Menu!",lines:[{art:ke(bu),text:"Everything's tidied into the <b>Menu</b>!"},{art:ke(ME),text:"The world follows the <b>clock</b>: morning, day, golden evening, and night."},{art:ke(LE),text:"Tap the <b>sun</b> and the <b>moon</b>. <b>Auto</b> follows the clock."}]},{v:8,title:"Make your look!",lines:[{art:ke(_E),text:"Leave a <b>letter</b> in a friend's mailbox!"},{art:ke($E),text:"Tap <b>Play</b> or <b>Decorate</b>!"},{art:ke(Jd),text:"<b>Make your look!</b> New hair, clothes, and colors."},{art:ke(xE),text:"Update every iPad to see the <b>new outfits</b>!"}]},{v:7,title:"New Nursery!",lines:[{art:ke(yu),text:"A new <b>Nursery</b> room, with a <b>crib</b> and a rocker!"},{art:ke(wE),text:"The <b>Cozy Cottage</b> furniture pack is in your drawer!"},{art:ke(vE),text:"A <b>dog kennel</b> and a <b>cat tower</b> for your pets!"}]},{v:6,title:"The clubhouse is open!",lines:[{art:ke(yE),text:"A glam <b>clubhouse</b> on the map!"},{art:ke(bE),text:"Play <b>Slay</b> with friends at a table!"},{art:ke(kE),text:"Line up <b>hearts</b> or <b>stars</b>!"}]},{v:5,title:"Your house looks even cozier!",lines:[{art:ke(mu),text:"Wallpaper and floors show their <b>real patterns</b> when you paint!"},{art:ke(Ro(0,"sit")),text:"Your cat is <b>big and cozy</b>, just like the toy cat."},{art:ke(uu),text:"Tap <b>home</b> to come back from the map, the park, or the ranch."}]},{v:4,title:"A map of our neighborhood!",lines:[{art:ke(ud),text:"Tap the <b>map</b> to go anywhere!"},{art:ke(mE),text:"Tap a friend's face to <b>find her</b>."},{art:ke(Fc(0)),text:"The petting zoo is inside the <b>barn</b> now!"}]},{v:3,title:"Rainbow Ranch is open!",lines:[{art:ke(gE),text:"Visit <b>Rainbow Ranch</b>!"},{art:ke(Fc(1)),text:"Pet and feed animals at the <b>petting zoo</b>."},{art:ke(`<svg viewBox="0 0 160 130">${Gc(Kd(4),0,0,1)}</svg>`),text:"Ride <b>horses</b> and the <b>rainbow pony</b>!"},{art:ke(uE),text:"Collect <b>eggs</b> from the hens."},{art:ke(`<svg viewBox="0 0 70 90">${Gc(gu({seed:"carrot",wet:1},3,0),0,0,1)}</svg>`),text:"Grow carrots and flowers in the <b>garden</b>."}]},{v:2,title:"What's new!",lines:[{art:ke(hE),text:"A new <b>park</b>! Swing, slide and splash with friends."},{art:ke(Ro(3,"sit")),text:"Adopt a <b>cat</b>! She lives in your house."},{art:ke(Hi(3,"stand")),text:"Adopt a <b>dog</b>! Take it to the park to play fetch."}]}],vu=wu[0].v,_u={v:vu,title:"Welcome to your cozy house!",lines:[{art:ke(uu),text:"Drag furniture into your rooms."},{art:ke(Jd),text:"Dress up your friends."},{art:ke(Ro(0,"sit")),text:"Adopt a pet from the Menu ☰!"}]},$u=Tt("cozy-whatsnew"),EE=1;function SE(){try{const e=Number(localStorage.getItem($u)),t=["cozy-house","cozy-house-v1","cozy-hood"].some(o=>localStorage.getItem(Tt(o))!==null);if(!e&&!t)return{kind:"welcome",entries:[_u]};const n=e||EE,s=wu.filter(o=>o.v>n).slice(0,3);return s.length?{kind:"news",entries:s}:{kind:"none",entries:[]}}catch{return{kind:"none",entries:[]}}}function CE(){try{localStorage.setItem($u,String(vu))}catch{}}function PE(e,t){const n=e==="welcome"?_u.title:t[0].title,s=t.flatMap(o=>o.lines).slice(0,5);return`<div class="wnBadge">${e==="welcome"?Rg:t[0].v>=10?ku:t[0].v>=9?bu:t[0].v>=8?Jd:t[0].v>=7?yu:t[0].v>=6?pE:t[0].v>=5?mu:t[0].v>=4?ud:t[0].v>=3?nE:xb}</div>
    <h2 class="wnTitle">${n}</h2>
    <div class="wnList ${s.length>3?"many":""}">${s.map((o,i)=>`<div class="wnLine" style="animation-delay:${.15+i*.18}s">${o.art}<p>${o.text}</p></div>`).join("")}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`}const xu="cozy-sky",Yc={tint:"#fff6e4",body:"#ffe9f0",pageA:"#ffe0ec",pageB:"#e6ddff",spot:"#fff6fa",fieldA:"#c9f2c7",fieldB:"#8fd18a",win:"#a2d2ff",win2:"#b9e3ff",house:"#fff3b0",mapTint:"#ffffff"},eh={tint:"#e7b4cc",body:"#f6dce8",pageA:"#ffd0e6",pageB:"#e6d2f8",spot:"#fff0f6",fieldA:"#f6d0e2",fieldB:"#dcc8f0",win:"#f6c6de",win2:"#e4d0f8",house:"#ffe0ee",mapTint:"#f3c4dc"},th={tint:"#ffb38a",body:"#ffe4dc",pageA:"#ffe0d6",pageB:"#f0d8ea",spot:"#fff6ee",fieldA:"#d4eec4",fieldB:"#a3cb8a",win:"#ffc48a",win2:"#ffd4b0",house:"#ffc56a",mapTint:"#ffb38a"},wo={tint:"#2a2350",body:"#14182c",pageA:"#1c1748",pageB:"#101832",spot:"#2c2458",fieldA:"#1a2458",fieldB:"#0c1028",win:"#1a245c",win2:"#12183a",house:"#ffe9a0",mapTint:"#102044"},Ea=[{m:0,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...wo},{m:5*60,opacity:.7,map:.78,glow:.95,stars:.95,glass:1,phase:"night",...wo},{m:5*60+35,opacity:.42,map:.34,glow:.55,stars:.42,glass:.8,phase:"dawn",...eh},{m:6*60+25,opacity:.14,map:.16,glow:.28,stars:.08,glass:.9,phase:"dawn",...eh},{m:7*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...Yc},{m:16*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...Yc},{m:17*60+5,opacity:.08,map:.1,glow:.4,stars:.02,glass:.55,phase:"golden",...th},{m:18*60+10,opacity:.18,map:.2,glow:.62,stars:.06,glass:.82,phase:"golden",...th},{m:19*60+5,opacity:.52,map:.68,glow:.9,stars:.55,glass:1,phase:"night",...wo},{m:20*60+10,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...wo},{m:24*60,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...wo}],TE={phase:"day",opacity:0,map:0,glow:0,stars:0,glass:0,...Yc},RE={phase:"night",opacity:.7,map:.78,glow:1,stars:1,glass:1,...wo};function nh(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function Yt(e,t,n){const s=nh(e),o=nh(t),i=a=>Math.round(s[a]+(o[a]-s[a])*n).toString(16).padStart(2,"0");return"#"+i(0)+i(1)+i(2)}const ri=(e,t,n)=>e+(t-e)*n;function BE(e){const t=e.getHours()*60+e.getMinutes()+e.getSeconds()/60;let n=0;for(;n<Ea.length-2&&t>=Ea[n+1].m;)n++;const s=Ea[n],o=Ea[n+1],i=Math.max(1,o.m-s.m),a=Math.max(0,Math.min(1,(t-s.m)/i));return{phase:a<.5?s.phase:o.phase,opacity:ri(s.opacity,o.opacity,a),map:ri(s.map,o.map,a),glow:ri(s.glow,o.glow,a),stars:ri(s.stars,o.stars,a),glass:ri(s.glass,o.glass,a),tint:Yt(s.tint,o.tint,a),body:Yt(s.body,o.body,a),pageA:Yt(s.pageA,o.pageA,a),pageB:Yt(s.pageB,o.pageB,a),spot:Yt(s.spot,o.spot,a),fieldA:Yt(s.fieldA,o.fieldA,a),fieldB:Yt(s.fieldB,o.fieldB,a),win:Yt(s.win,o.win,a),win2:Yt(s.win2,o.win2,a),house:Yt(s.house,o.house,a),mapTint:Yt(s.mapTint,o.mapTint,a)}}function sh(e,t){return t==="day"?TE:t==="night"?RE:BE(e)}function AE(e){return e==="day"||e==="night"||e==="auto"}function IE(e,t=!1){return t?!0:e==="lamp"||e==="window"||e==="stars"||e==="tv"||/lamp|light|lantern|candle|string-lights|night-light/i.test(e)}function oh(){try{if(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches)return!0}catch{}if(typeof navigator>"u")return!1;const e=navigator.hardwareConcurrency;if(typeof e=="number"&&e>0&&e<=2)return!0;const t=navigator.deviceMemory;return typeof t=="number"&&t>0&&t<=2}const ih={day:"night",night:"auto",auto:"day"},ah={day:"Day",night:"Night",auto:"Auto"},Mu='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><g fill="none" stroke="#ffb15c" stroke-width="3" stroke-linecap="round"><path d="M24 7 V13 M24 35 V41 M7 24 H13 M35 24 H41 M12 12 L16 16 M32 32 L36 36 M36 12 L32 16 M16 32 L12 36"/></g></svg>',DE='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 8 a14 14 0 1 0 0 32 a11 11 0 1 1 0 -32z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="3"/><circle cx="14" cy="16" r="1.7" fill="#ffd166"/><circle cx="18" cy="28" r="1.2" fill="#fff"/><circle cx="11" cy="24" r="1" fill="#fff"/></svg>',OE='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="28" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M34 8 a9 9 0 1 0 0 18 a7 7 0 1 1 0 -18z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="14" cy="16" r="1.3" fill="#ffd166"/></svg>',HE={day:Mu,night:DE,auto:OE},WE="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)";function UE(){if(document.getElementById("skyInk"))return;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.id="skyInk",e.setAttribute("aria-hidden","true"),e.setAttribute("width","0"),e.setAttribute("height","0"),e.style.cssText="position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none",e.innerHTML=`
    <filter id="skyNightInk" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.72 0 0 0 0.046  0 0.72 0 0 0.038  0 0 0.72 0 0.088  0 0 0 1 0"/></filter>
    <filter id="skyNightKid" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.84 0 0 0 0.026  0 0.84 0 0 0.022  0 0 0.84 0 0.050  0 0 0 1 0"/></filter>
    <filter id="skyGoldInk" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.82 0 0 0 0.180  0 0.82 0 0 0.126  0 0 0.82 0 0.097  0 0 0 1 0"/></filter>
    <filter id="skyGoldKid" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.88 0 0 0 0.120  0 0.88 0 0 0.084  0 0 0.88 0 0.065  0 0 0 1 0"/></filter>`,document.body.appendChild(e);const t=document.createElement("style");t.id="skyInkCss",t.textContent=`
    html[data-sky="night"] #layer > .item:not(.is-light) > .inner,
    html[data-sky="night"] #layer > .pet > .inner,
    html[data-sky="night"] .scenery .sceneRug svg,
    html[data-sky="night"] .scenery .scenePlant svg,
    html[data-sky="night"] .scenery .sceneWin svg { filter: url("#skyNightInk"); }
    html[data-sky="night"] #layer > .char > .inner,
    html[data-sky="night"] #layer > .char > .hands { filter: url("#skyNightKid"); }
    html[data-sky="night"] #layer > .item.sel:not(.is-light) > .inner { filter: url("#skyNightInk") drop-shadow(0 0 0 #fff) drop-shadow(0 0 6px #fff) drop-shadow(0 0 3px #ffd166); }
    html[data-sky="night"] #layer > .item.lifted:not(.is-light) > .inner { filter: url("#skyNightInk") drop-shadow(0 14px 8px rgba(0,0,0,.18)); }
    html[data-sky="night"] #layer > .char.active > .inner { filter: url("#skyNightKid") drop-shadow(0 0 4px #fff) drop-shadow(0 0 2px #ffd166); }
    html[data-sky="night"] #layer > .char.hold-target > .inner { filter: url("#skyNightKid") drop-shadow(0 0 6px #fff) drop-shadow(0 0 8px #80ed99); }
    html[data-sky="golden"] #layer > .item:not(.is-light) > .inner,
    html[data-sky="golden"] #layer > .pet > .inner,
    html[data-sky="golden"] .scenery .sceneRug svg,
    html[data-sky="golden"] .scenery .scenePlant svg,
    html[data-sky="golden"] .scenery .sceneWin svg { filter: url("#skyGoldInk"); }
    html[data-sky="golden"] #layer > .char > .inner,
    html[data-sky="golden"] #layer > .char > .hands { filter: url("#skyGoldKid"); }
    html[data-sky="golden"] #layer > .item.sel:not(.is-light) > .inner { filter: url("#skyGoldInk") drop-shadow(0 0 0 #fff) drop-shadow(0 0 6px #fff) drop-shadow(0 0 3px #ffd166); }
    html[data-sky="golden"] #layer > .item.lifted:not(.is-light) > .inner { filter: url("#skyGoldInk") drop-shadow(0 14px 8px rgba(0,0,0,.18)); }
    html[data-sky="golden"] #layer > .char.active > .inner { filter: url("#skyGoldKid") drop-shadow(0 0 4px #fff) drop-shadow(0 0 2px #ffd166); }
    html[data-sky="golden"] #layer > .char.hold-target > .inner { filter: url("#skyGoldKid") drop-shadow(0 0 6px #fff) drop-shadow(0 0 8px #80ed99); }
  `,document.head.appendChild(t)}function VE(e){UE();const t=oh();let n=QE(),s=null,o=sh(new Date,n),i=0;e.innerHTML=`<button type="button" class="skyBtn" aria-label="Day. Tap for night.">${Mu}</button>`;const a=e.querySelector("button"),r=g=>{o=g;const b=document.documentElement,m=Math.max(0,Math.min(1,g.glow));b.style.setProperty("--sky-opacity",g.opacity.toFixed(3)),b.style.setProperty("--sky-map-opacity",g.map.toFixed(3)),b.style.setProperty("--sky-glow",m.toFixed(3)),b.style.setProperty("--sky-stars",g.stars.toFixed(3)),b.style.setProperty("--sky-glass",g.glass.toFixed(3)),b.style.setProperty("--sky-tint",g.tint),b.style.setProperty("--sky-body",g.body),b.style.setProperty("--sky-page-a",g.pageA),b.style.setProperty("--sky-page-b",g.pageB),b.style.setProperty("--sky-spot",g.spot),b.style.setProperty("--sky-field-a",g.fieldA),b.style.setProperty("--sky-field-b",g.fieldB),b.style.setProperty("--sky-win",g.win),b.style.setProperty("--sky-win-2",g.win2),b.style.setProperty("--sky-house-win",g.house),b.style.setProperty("--sky-map-tint",g.mapTint),b.style.setProperty("--sky-glow-soft",`rgba(255, 186, 80, ${(m*.72).toFixed(3)})`),b.style.setProperty("--sky-glow-hot",`rgba(255, 220, 120, ${(m*.96).toFixed(3)})`),b.style.setProperty("--sky-glow-clear","rgba(255, 186, 80, 0)"),b.style.setProperty("--sky-glow-wash",`rgba(255, 170, 70, ${(m*.55).toFixed(3)})`),b.style.setProperty("--sky-glow-map",`rgba(255, 196, 110, ${(m*.7).toFixed(3)})`);const k=g.phase==="golden"?.24:g.phase==="dawn"?.22:0,y=g.phase==="golden"?"186, 110, 52":"140, 62, 18";b.style.setProperty("--sky-shadow",`rgba(${y}, ${k.toFixed(3)})`);const u=g.phase==="night"?.55:g.phase==="golden"?.08:g.phase==="dawn"?.16:0;b.style.setProperty("--sky-vig",`rgba(12, 10, 32, ${u.toFixed(3)})`);const w=g.phase==="golden"?"255, 196, 80":g.phase==="dawn"?"255, 214, 230":"255, 246, 214";b.style.setProperty("--sky-orb",`rgba(${w}, ${Math.min(1,g.glass).toFixed(3)})`),b.dataset.sky=g.phase,b.dataset.skyChoice=n,b.classList.toggle("sky-static",t),b.classList.toggle("sky-live",!t),a.innerHTML=HE[n],a.setAttribute("aria-label",`${ah[n]}. Tap for ${ah[ih[n]].toLowerCase()}.`)},l=()=>sh(s??new Date,n),c=()=>r(l()),d=()=>{i&&clearInterval(i),i=window.setInterval(()=>{s||c()},t?6e4:1e3)},f=g=>{n=g;try{localStorage.setItem(Tt(xu),n)}catch{}c()};a.addEventListener("click",()=>f(ih[n])),document.documentElement.classList.toggle("sky-static",t),c(),d();const p=document.getElementById("mapWorld");p&&zE(p);try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change",()=>{const b=oh();document.documentElement.classList.toggle("sky-static",b),document.documentElement.classList.toggle("sky-live",!b)})}catch{}try{matchMedia(WE).addEventListener?.("change",()=>za())}catch{}return window.addEventListener("resize",()=>za()),new MutationObserver(()=>za()).observe(document.body,{attributes:!0,attributeFilter:["class"]}),{choice:()=>n,look:()=>o,setChoice(g){f(g)},freeze(g){s=g,c()}}}function za(){const e=document.getElementById("skyMount"),t=document.getElementById("menuDaySlot");e&&t&&e.parentElement!==t&&t.appendChild(e),t&&(t.hidden=!1),e&&(e.style.left="",e.style.top="")}function zE(e){const t=document.createElement("div");t.className="skyTint",t.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="skyLamps",n.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="skyBits",s.setAttribute("aria-hidden","true"),s.innerHTML='<i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i>';const o=()=>{e.contains(t)||e.appendChild(t),e.contains(n)||e.appendChild(n),e.contains(s)||e.appendChild(s)};o(),new MutationObserver(o).observe(e,{childList:!0})}function QE(){try{const e=localStorage.getItem(Tt(xu));if(AE(e))return e}catch{}return"auto"}const Lu=255,qE=12;class NE{constructor(t){this.w=ts,this.h=ns,this.undo=[],this.px=ug(t??null)}checkpoint(){this.undo.push(this.px.slice()),this.undo.length>qE&&this.undo.shift()}canUndo(){return this.undo.length>0}undoStep(){const t=this.undo.pop();return t?(this.px=t,!0):!1}apply(t){switch(t.k){case"line":this.line(t.x0,t.y0,t.x1,t.y1,t.r,t.c);break;case"fill":this.fill(t.x,t.y,t.c);break;case"stamp":this.stamp(t.mask,t.x,t.y);break;case"clear":this.px.fill(0);break}}dot(t,n,s,o){const i=Math.max(.5,s),a=i*i,r=Math.max(0,Math.floor(t-i)),l=Math.min(this.w-1,Math.ceil(t+i)),c=Math.max(0,Math.floor(n-i)),d=Math.min(this.h-1,Math.ceil(n+i));for(let f=c;f<=d;f++)for(let p=r;p<=l;p++){const g=p+.5-t,b=f+.5-n;g*g+b*b<=a&&(this.px[f*this.w+p]=o)}}line(t,n,s,o,i,a){const r=Math.hypot(s-t,o-n),l=Math.max(.5,i/2),c=Math.max(1,Math.ceil(r/l));for(let d=0;d<=c;d++)this.dot(t+(s-t)*d/c,n+(o-n)*d/c,i,a)}fill(t,n,s){const o=Math.floor(t),i=Math.floor(n);if(o<0||i<0||o>=this.w||i>=this.h)return;const{w:a,h:r,px:l}=this,c=l[i*a+o];if(c===s)return;const d=[o,i];for(;d.length;){const f=d.pop(),p=d.pop();let g=p;for(;g>0&&l[f*a+g-1]===c;)g--;let b=p;for(;b<a-1&&l[f*a+b+1]===c;)b++;for(let m=g;m<=b;m++)l[f*a+m]=s,f>0&&l[(f-1)*a+m]===c&&(m===g||l[(f-1)*a+m-1]!==c)&&d.push(m,f-1),f<r-1&&l[(f+1)*a+m]===c&&(m===g||l[(f+1)*a+m-1]!==c)&&d.push(m,f+1)}}stamp(t,n,s){const o=Math.round(n-t.w/2),i=Math.round(s-t.h/2);for(let a=0;a<t.h;a++)for(let r=0;r<t.w;r++){const l=t.px[a*t.w+r];if(l===Lu)continue;const c=o+r,d=i+a;c>=0&&d>=0&&c<this.w&&d<this.h&&(this.px[d*this.w+c]=l)}}save(){let t=Rl(this.px),n=this.px;for(let s=0;t.length>vc&&s<6;s++)n=ZE(n,this.w,this.h,1<<s),t=Rl(n);return t.length>vc&&(t=Rl(FE(n,this.w,this.h,8))),t}}function ZE(e,t,n,s){const o=e.slice();for(let i=0;i<n;i++){let a=0;for(;a<t;){const r=o[i*t+a];let l=1;for(;a+l<t&&o[i*t+a+l]===r;)l++;l<=s&&a>0&&o.fill(o[i*t+a-1],i*t+a,i*t+a+l),a+=l}}return o}function FE(e,t,n,s){const o=new Uint8Array(e.length);for(let i=0;i<n;i++)for(let a=0;a<t;a++)o[i*t+a]=e[Math.floor(i/s)*s*t+Math.floor(a/s)*s];return o}function jE(e,t,n,s){let o=0,i=1/0;return s.forEach((a,r)=>{const l=parseInt(a.slice(1,3),16),c=parseInt(a.slice(3,5),16),d=parseInt(a.slice(5,7),16),f=(l-e)**2*2+(c-t)**2*4+(d-n)**2*3;f<i&&(i=f,o=r)}),o}const Sa="#5a3d5c",Xs=new Map,Kc=new Map,Xc=Tt("cozy-art");function GE(){try{const e=JSON.parse(localStorage.getItem(Xc)??"{}");if(e&&typeof e=="object")for(const[t,n]of Object.entries(e))gg(t)&&Bd(n)&&Xs.set(t,n)}catch{}}function YE(e,t,n){Xs.set(e,t);let s={};try{s=JSON.parse(localStorage.getItem(Xc)??"{}")||{}}catch{s={}}s[e]=t;const o=Object.keys(s);if(o.length>ki)for(const i of o)i!==e&&!n.has(i)&&Object.keys(s).length>ki&&delete s[i];try{localStorage.setItem(Xc,JSON.stringify(s))}catch{}}function KE(e){return Xs.has(e)}function Eu(e,t){!gg(e)||!Bd(t)||Xs.get(e)!==t&&(Xs.set(e,t),Kc.delete(e))}function XE(e){return Xs.get(e)??null}const JE=Rd.map(e=>[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)]);function Su(e,t){const n=t.data;for(let s=0;s<e.length;s++){const o=JE[e[s]&15];n[s*4]=o[0],n[s*4+1]=o[1],n[s*4+2]=o[2],n[s*4+3]=255}}function Cu(e){const t=Kc.get(e);if(t)return t;const n=Xs.get(e);if(!n)return null;const s=document.createElement("canvas");s.width=ts,s.height=ns;const o=s.getContext("2d");if(!o)return null;const i=o.createImageData(ts,ns);Su(ug(n),i),o.putImageData(i,0,0);const a=s.toDataURL("image/png");return Kc.set(e,a),a}function vr(e,t,n=!0){const s=hg[e]??"wood",o=`stroke="${Sa}" stroke-width="3" stroke-linejoin="round"`;let i="";s==="wood"?i=`<rect x="6" y="18" width="88" height="70" rx="6" fill="#c9905a" ${o}/><path d="M10 24 H90 M10 82 H90" stroke="#a86f3e" stroke-width="1.6" opacity=".7"/>`:s==="plum"?i=`<rect x="6" y="18" width="88" height="70" rx="8" fill="#9a6fc0" ${o}/><rect x="9" y="21" width="82" height="64" rx="6" fill="none" stroke="#d7c0ef" stroke-width="1.6"/>`:s==="gold"?i=`<rect x="6" y="18" width="88" height="70" rx="5" fill="#f2c14e" ${o}/>${[14,32,50,68,86].map(l=>`<circle cx="${l}" cy="21.5" r="1.6" fill="#fff3b0"/><circle cx="${l}" cy="84.5" r="1.6" fill="#fff3b0"/>`).join("")}`:i=`<rect x="6" y="18" width="88" height="70" rx="7" fill="#ff6b6b" ${o}/>${["#ffa94d","#ffd43b","#69db7c","#4dabf7","#b388d6"].map((l,c)=>`<rect x="${7.5+c*1.1}" y="${19.5+c*1.1}" width="${85-c*2.2}" height="${67-c*2.2}" rx="6" fill="none" stroke="${l}" stroke-width="1.3"/>`).join("")}`;const a=t?`<image href="${t}" x="13" y="25" width="74" height="55.5" preserveAspectRatio="none"/>`:'<rect x="13" y="25" width="74" height="55.5" fill="#fff6ea"/><circle cx="40" cy="50" r="5" fill="#ffc8dd"/><circle cx="55" cy="56" r="4" fill="#bde0fe"/><circle cx="62" cy="44" r="3.5" fill="#fff3b0"/>',r=n?`<path d="M38 18 L50 7 L62 18" fill="none" stroke="${Sa}" stroke-width="2"/><circle cx="50" cy="7" r="2.4" fill="${Sa}"/>`:"";return`<svg viewBox="${n?"0 0 100 100":"4 16 92 74"}" xmlns="http://www.w3.org/2000/svg">${r}${i}${a}<rect x="13" y="25" width="74" height="55.5" fill="none" stroke="${Sa}" stroke-width="1.6"/></svg>`}const Kl=[2,4,8,14],rh=[24,34,46,60],lh={brush:'<svg viewBox="0 0 40 40"><path d="M26 6 L34 14 L18 30 L10 22 Z" fill="#ffd43b" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 22 L18 30 Q12 36 5 35 Q4 28 10 22 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/></svg>',fill:'<svg viewBox="0 0 40 40"><path d="M7 15 L21 9 L27 23 L13 29 Z" fill="#fff" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/><path d="M7 15 Q14 19 21 9" fill="#4dabf7" stroke="#5a3d5c" stroke-width="2"/><path d="M8 16 Q3 24 6 34 Q12 34 11 27 Q10 22 8 16 Z" fill="#4dabf7" stroke="#5a3d5c" stroke-width="2" stroke-linejoin="round"/><path d="M27 23 Q31 14 21 9" fill="none" stroke="#5a3d5c" stroke-width="2"/></svg>',eraser:'<svg viewBox="0 0 40 40"><g transform="rotate(-35 20 20)"><rect x="6" y="13" width="28" height="14" rx="3" fill="#ffc8dd" stroke="#5a3d5c" stroke-width="2.5"/><rect x="6" y="13" width="10" height="14" rx="3" fill="#fff" stroke="#5a3d5c" stroke-width="2.5"/></g><path d="M7 35 h4 M15 36 h3 M22 35 h2" stroke="#5a3d5c" stroke-width="2.5" stroke-linecap="round"/></svg>',stamp:'<svg viewBox="0 0 40 40"><path d="M20 33 C13 27 5 22 8 14 C11 7 20 10 20 16 C20 10 29 7 32 14 C35 22 27 27 20 33 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="2.5"/></svg>'},eS='<svg viewBox="0 0 40 40"><path d="M14 10 L6 18 L14 26" fill="none" stroke="#5a3d5c" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 18 H24 Q34 18 34 26 Q34 33 24 33 H18" fill="none" stroke="#5a3d5c" stroke-width="3.5" stroke-linecap="round"/></svg>',ch={brush:"Brush",fill:"Fill",eraser:"Eraser",stamp:"Stamps"},tS=["White","Plum","Red","Pink","Orange","Yellow","Green","Dark green","Blue","Dark blue","Lilac","Purple","Tan","Brown","Gray","Black"],nS={wood:"Wood",plum:"Plum",gold:"Gold",rainbow:"Rainbow"},sS='<svg viewBox="0 0 40 40"><rect x="7" y="7" width="26" height="26" rx="5" fill="#fff" stroke="#5a3d5c" stroke-width="2.5"/><path d="M12 28 L28 12" stroke="#ff8fab" stroke-width="3" stroke-linecap="round"/><circle cx="31" cy="9" r="3" fill="#ffd43b"/></svg>',dh=new Map;async function fh(e,t){const n=e.name+":"+t,s=dh.get(n);if(s)return s;const o=e.svg.includes("xmlns")?e.svg:e.svg.replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" '),i=new Image;i.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(o);try{await i.decode()}catch{return null}const a=document.createElement("canvas");a.width=t,a.height=t;const r=a.getContext("2d",{willReadFrequently:!0});if(!r)return null;r.drawImage(i,0,0,t,t);const l=r.getImageData(0,0,t,t).data,c=new Uint8Array(t*t);for(let f=0;f<c.length;f++)c[f]=l[f*4+3]<140?Lu:jE(l[f*4],l[f*4+1],l[f*4+2],Rd);const d={w:t,h:t,px:c};return dh.set(n,d),d}let li=null;function oS(e){if(li)return;const t=new NE;let n="brush",s=2,o=1,i=0,a=0;const r=document.createElement("div");r.className="studio",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Art Studio"),r.innerHTML=`<div class="stuCard">
    <div class="stuHead"><h2>Art Studio</h2><button type="button" class="stuX" aria-label="Close">✕</button></div>
    <div class="stuBody">
      <div class="stuPaper"><canvas width="${ts}" height="${ns}" aria-label="Drawing paper"></canvas></div>
      <div class="stuSide">
        <div class="stuTools">${Object.keys(lh).map(x=>`<button type="button" class="stuTool" data-tool="${x}" aria-label="${ch[x]}" aria-pressed="false">${lh[x]}<span>${ch[x]}</span></button>`).join("")}
          <button type="button" class="stuTool stuUndo" aria-label="Undo">${eS}<span>Undo</span></button><button type="button" class="stuTool stuClear" aria-label="Clear">${sS}<span>Clear</span></button></div>
        <div class="stuGroup stuSizeGroup"><b>Size</b><div class="stuRow stuSizes">${Kl.map((x,E)=>`<button type="button" class="stuSize" data-size="${E}" aria-label="Size ${E+1}" aria-pressed="false"><i style="width:${8+x*2}px;height:${8+x*2}px"></i></button>`).join("")}</div></div>
        <div class="stuGroup stuColorGroup"><b>Colors</b><div class="stuColors">${Rd.map((x,E)=>`<button type="button" class="stuColor" data-color="${E}" aria-label="${tS[E]??"Color "+(E+1)}" aria-pressed="false" style="background:${x}"></button>`).join("")}</div></div>
        <div class="stuGroup stuStampGroup"><b>Stamps</b><div class="stuStamps">${e.stamps.map((x,E)=>`<button type="button" class="stuStamp" data-stamp="${E}" aria-label="${x.name}" aria-pressed="false">${x.svg}</button>`).join("")}</div></div>
        <div class="stuGroup stuFrameGroup"><b>Frame</b><div class="stuRow stuFrames">${hg.map((x,E)=>`<button type="button" class="stuFrame" data-frame="${E}" aria-label="${nS[x]??x} frame" aria-pressed="false">${vr(E,null,!1)}</button>`).join("")}</div></div>
        <button type="button" class="stuHang">Hang it up!</button>
      </div>
    </div></div>
    <div class="stuAsk hidden" role="alertdialog" aria-label="Start over?"><div class="stuAskCard"><p>Start a new picture?</p><div class="stuAskRow"><button type="button" class="stuAskNo" aria-label="Keep my picture">Keep it</button><button type="button" class="stuAskYes" aria-label="Yes, clear it">Clear it</button></div></div></div>`,document.body.appendChild(r),li=r;const l=r.querySelector("canvas"),c=l.getContext("2d"),d=c.createImageData(ts,ns),f=()=>{Su(t.px,d),c.putImageData(d,0,0)},p=()=>{r.querySelectorAll(".stuTool[data-tool]").forEach(x=>x.classList.toggle("on",x.dataset.tool===n)),r.querySelectorAll(".stuSize").forEach(x=>x.classList.toggle("on",Number(x.dataset.size)===o)),r.querySelectorAll(".stuColor").forEach(x=>x.classList.toggle("on",Number(x.dataset.color)===s)),r.querySelectorAll(".stuStamp").forEach(x=>x.classList.toggle("on",Number(x.dataset.stamp)===i)),r.querySelectorAll(".stuFrame").forEach(x=>x.classList.toggle("on",Number(x.dataset.frame)===a)),r.querySelectorAll("[aria-pressed]").forEach(x=>x.setAttribute("aria-pressed",String(x.classList.contains("on")))),r.classList.toggle("stamping",n==="stamp"),t.canUndo()!==g&&m(),r.querySelector(".stuUndo").disabled=!t.canUndo()};let g=!1,b=0;function m(){g=t.canUndo(),clearTimeout(b),b=window.setTimeout(()=>{if(!li)return;const x=t.canUndo()?l.toDataURL():null;r.querySelectorAll(".stuFrame").forEach(E=>{E.innerHTML=vr(Number(E.dataset.frame),x,!1)})},60)}const k=r.querySelector(".stuAsk");f(),p();const y=()=>{r.remove(),li=null,e.onClose?.()};r.addEventListener("click",x=>{const E=x.target.closest("button");if(E){if(e.sfx?.click(),E.classList.contains("stuX")){y();return}if(E.classList.contains("stuAskNo")){k.classList.add("hidden");return}if(E.classList.contains("stuAskYes")){k.classList.add("hidden"),t.checkpoint(),t.apply({k:"clear"}),f(),p(),m();return}if(E.dataset.tool)n=E.dataset.tool;else if(E.dataset.size)o=Number(E.dataset.size);else if(E.dataset.color)s=Number(E.dataset.color),(n==="eraser"||n==="stamp")&&(n="brush");else if(E.dataset.stamp)i=Number(E.dataset.stamp),n="stamp";else if(E.dataset.frame)a=Number(E.dataset.frame);else if(E.classList.contains("stuUndo"))t.undoStep()&&(f(),m());else if(E.classList.contains("stuClear"))k.classList.remove("hidden"),k.querySelector(".stuAskNo").focus();else if(E.classList.contains("stuHang")){const W=t.save();y(),e.onSave(W,a);return}p()}});let u=-1,w=null;const _=x=>{const E=l.getBoundingClientRect();return{x:(x.clientX-E.left)*ts/E.width,y:(x.clientY-E.top)*ns/E.height}};l.addEventListener("pointerdown",x=>{if(x.preventDefault(),u!==-1)return;const E=_(x);if(n==="fill"){t.checkpoint(),t.apply({k:"fill",x:E.x,y:E.y,c:s}),f(),p(),m(),e.sfx?.pop?.();return}if(n==="stamp"){const W=e.stamps[i];if(!W)return;fh(W,rh[o]).then(V=>{!V||!li||(t.checkpoint(),t.apply({k:"stamp",mask:V,x:E.x,y:E.y}),f(),p(),m(),e.sfx?.pop?.())});return}u=x.pointerId;try{l.setPointerCapture(x.pointerId)}catch{}t.checkpoint(),w=E,t.apply({k:"line",x0:E.x,y0:E.y,x1:E.x,y1:E.y,r:Kl[o],c:n==="eraser"?0:s}),f()}),l.addEventListener("pointermove",x=>{if(x.pointerId!==u||!w)return;const E=typeof x.getCoalescedEvents=="function"?x.getCoalescedEvents():[];for(const W of E.length?E:[x]){const V=_(W);t.apply({k:"line",x0:w.x,y0:w.y,x1:V.x,y1:V.y,r:Kl[o],c:n==="eraser"?0:s}),w=V}f()});const P=x=>{x.pointerId===u&&(u=-1,w=null,p(),m())};l.addEventListener("pointerup",P),l.addEventListener("pointercancel",P),e.stamps.slice(0,3).forEach(x=>void fh(x,rh[1]))}function iS(e){const t=document.createElement("div");t.className="paintZoom",t.setAttribute("role","dialog"),t.setAttribute("aria-label","Painting"),t.innerHTML=`<div class="pzInner">${e}</div>`,t.addEventListener("pointerup",()=>t.remove()),document.body.appendChild(t)}const vo=[{name:"Pink",fill:"#ff7eb3",ink:"#9d174d"},{name:"Lilac",fill:"#c9b3ff",ink:"#5f3dc4"},{name:"Aqua",fill:"#66d9e8",ink:"#0b7285"},{name:"Gold",fill:"#ffd43b",ink:"#e67700"}],bt="#5a3d5c",Xl=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),ph=e=>typeof e=="number"?e:{skip:10,rev:11,d2:12,wild:13,w4:14}[e]??0,hh=e=>typeof e.v=="number"?String(e.v):e.v==="skip"?"✕":e.v==="rev"?"↻":e.v==="d2"?"+2":e.v==="w4"?"+4":"♛",aS=e=>e.v==="skip"?"Nope":e.v==="rev"?"Flip":e.v==="d2"?"+2":e.v==="wild"||e.v==="w4"?"Crown":"",Bs=(e,t,n=1,s="#ffd43b")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -6 L1.4 -1.4 L6 -1 L1.6 1.4 L3 6 L0 3 L-3 6 L-1.6 1.4 L-6 -1 L-1.4 -1.4 Z" fill="${s}" stroke="${bt}" stroke-width="1" stroke-linejoin="round"/>`,Qa=(e,t,n=1)=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 1.2 C-2.2 -1.6 -5.2 -0.6 -3.6 2.2 C-2.4 4 0 5.2 0 5.2 C0 5.2 2.4 4 3.6 2.2 C5.2 -0.6 2.2 -1.6 0 1.2 Z" fill="#ff4d94" stroke="${bt}" stroke-width="1"/>`;function rS(e){return e.v==="wild"||e.v==="w4"?`<g transform="translate(14 28)">
      <path d="M4 26 L10 8 L18 16 L24 2 L30 16 L38 8 L44 26 Z" fill="#ffd43b" stroke="${bt}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="4" y="26" width="40" height="8" rx="2" fill="#ffd43b" stroke="${bt}" stroke-width="2.2"/>
      <circle cx="10" cy="8" r="2.4" fill="#ff7eb3"/><circle cx="24" cy="3" r="2.4" fill="#66d9e8"/><circle cx="38" cy="8" r="2.4" fill="#d0bfff"/>
      ${Bs(-2,0,.7)}${Bs(46,4,.65,"#fff")}${Bs(22,-4,.55,"#ff7eb3")}
    </g>${e.v==="w4"?`<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${bt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">+4</text>`:""}`:e.v==="d2"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff" stroke="${bt}" stroke-width="2.4"/>
      ${Qa(14,8,1.35)}${Qa(32,8,1.35)}
      <path d="M12 26 Q23 34 34 26" fill="none" stroke="${bt}" stroke-width="2.4" stroke-linecap="round"/>
      ${Qa(40,22,.8)}
    </g>`:e.v==="rev"?`<g fill="none" stroke="${bt}" stroke-width="3.2" stroke-linecap="round">
      <path d="M16 40 C42 22 54 52 34 60 C16 68 12 46 30 40"/>
      <path d="M14 38 L22 30 L24 42" stroke-linejoin="round"/>
    </g>${Bs(48,28,.85)}${Bs(20,62,.6,"#ff7eb3")}${Bs(50,58,.55,"#66d9e8")}`:e.v==="skip"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff6d8" stroke="${bt}" stroke-width="2.4"/>
      <rect x="8" y="12" width="14" height="9" rx="3" fill="#2b1430"/><rect x="24" y="12" width="14" height="9" rx="3" fill="#2b1430"/>
      <path d="M22 16.5 H24 M5 14 H2 M41 14 H44" stroke="${bt}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 27 Q23 32 34 27" fill="none" stroke="${bt}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`:""}function Jc(e){const t=e.c===4,n=t?{fill:"#fff8ee",ink:bt}:vo[e.c]??vo[0],s=typeof e.v=="number",o=aS(e),i=t?'<rect x="2" y="2" width="66" height="96" rx="13" fill="#fff8ee" stroke="#ff7eb3" stroke-width="4"/><rect x="5" y="5" width="60" height="90" rx="11" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="7.5" y="7.5" width="55" height="85" rx="9" fill="none" stroke="#66d9e8" stroke-width="1.6"/><rect x="9.5" y="9.5" width="51" height="81" rx="8" fill="none" stroke="#ffd43b" stroke-width="1.6"/>':`<rect x="2" y="2" width="66" height="96" rx="13" fill="${n.fill}" stroke="${bt}" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`,a='<ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/>',r=`fill="${n.ink}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif"`,l=`<text x="8" y="16" font-size="13" font-weight="900" ${r}>${hh(e)}</text>`+(s?`<text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" ${r}>${hh(e)}</text>`:""),c=s?`<text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="${n.ink}" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${e.v}</text>`:`${rS(e)}${o?`<text x="35" y="92" text-anchor="middle" font-size="12" font-weight="900" ${r}>${o}</text>`:""}`;return`<svg viewBox="0 0 70 100">${i}${a}${l}${c}</svg>`}const lS=[[18,28],[40,28],[29,46],[18,64],[40,64],[29,78]].map(([e,t])=>Qa(e,t,.9)).join(""),cS=`<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff4d94" stroke="${bt}" stroke-width="3"/>
  <rect x="7" y="7" width="56" height="86" rx="10" fill="none" stroke="#ffd43b" stroke-width="3"/>
  <rect x="11" y="11" width="48" height="78" rx="8" fill="#ff7eb3"/>
  ${lS}
  <circle cx="35" cy="50" r="14" fill="#fff6fb" stroke="${bt}" stroke-width="2.4"/>
  ${Bs(35,50,1.15,"#ffd43b")}
</svg>`,Pu=(e,t)=>{if(t.turn<0||t.drawn!=null&&e.id!==t.drawn)return!1;const n=t.top;return e.c===4||e.c===t.color||e.v===n.v&&n.c!==4};let ed=null,Bt=null,mo=-1,gh=-1;function uh(e,t){ed=e;const n=t.table,s=n.view;if(!s||!s.top){e.innerHTML="";return}n.tb!==gh&&(Bt=null,mo=-1,gh=n.tb);const o=n.you,i=o!==null&&Array.isArray(s.hand)?s.hand.slice():[];Bt!==null&&!i.some(u=>u.id===Bt)&&(Bt=null);const a=s.ev;let r=null;if(a&&a.n!==mo&&mo>=0&&a.k==="play"&&a.card){const u=e.querySelector(`[data-card="${a.card.id}"]`)||e.querySelector(`[data-p="${a.p}"]`);u&&(r=u.getBoundingClientRect())}const c=n.phase==="play"&&s.turn>=0,d=c&&o!==null&&s.turn===o,f=o!==null&&i.length<=2&&i.length>0&&!s.slay?.[o]&&d,p=d&&s.drawn==null&&n.phase==="play",g=d&&s.drawn!=null&&n.phase==="play",b=i.sort((u,w)=>u.c-w.c||ph(u.v)-ph(w.v)),m=c?n.players[s.turn]:"",k=c?d?"Your turn!":`${Xl(t.name(m))}'s turn`:"",y=vo[s.color]??vo[0];if(e.innerHTML=`<div class="slayFelt">
    ${k?`<div class="whose ${d?"yours":""}" id="whoseTurn">${k}<span class="slayDir" aria-hidden="true">${s.dir===1?"→":"←"}</span></div>`:""}
    <div class="slayOpps">${n.players.map((u,w)=>w===o?"":`<div class="slayOpp ${s.turn===w?"isTurn":""}" data-p="${w}" data-count="${s.counts?.[w]??0}"><span class="chipFace">${t.face(u)}</span><b>${Xl(t.name(u))}</b><span class="cnt">${s.counts?.[w]??0}</span>${t.away(u)?'<i class="awayBadge">away</i>':""}${s.slay?.[w]?"<em>SLAY!</em>":""}</div>`).join("")}</div>
    <div class="slayPile">
      <button type="button" id="slayDeck" class="slayDeck" ${p?"":"disabled"} aria-label="Draw a card">${cS}<span>${s.deck??0}</span></button>
      <div id="slayDiscard" class="slayDiscard" data-top="${s.top.id}">${Jc(s.top)}</div>
      <div class="nowColor" data-color="${s.color}" style="background:${y.fill}" aria-label="${y.name}"></div>
    </div>
    ${o===null?'<p class="watching">You are watching</p>':""}
    ${Bt!==null?`<div id="crownPick" class="crownPick"><p>Pick a color for your Crown!</p><div class="crownRow">${vo.map((u,w)=>`<button type="button" data-color="${w}" aria-label="${u.name}" style="background:${u.fill}"><span>${u.name}</span></button>`).join("")}</div></div>`:""}
    <div id="slayHand" class="slayHand ${d?"isTurn":""}">${b.map(u=>{const w=d&&n.phase==="play"&&Pu(u,s),_=w?"can":d?"dim":"wait",P=typeof u.v=="number"?vo[u.c].name+" "+u.v:u.v==="wild"?"Crown":u.v==="w4"?"Crown plus 4":u.v==="d2"?"plus 2":u.v==="rev"?"Flip":"Nope";return`<button type="button" class="slayCard ${_} ${u.id===s.drawn?"justDrew":""} ${u.id===Bt?"picked":""}" data-card="${u.id}" data-c="${u.c}" data-v="${u.v}" aria-label="${Xl(P)}" ${w?"":"disabled"}>${Jc(u)}</button>`}).join("")}</div>
    ${c&&o!==null?`<button type="button" id="slayCall" class="slayCall ${f?"ready":""}" ${f?"":"disabled"}>SLAY!</button>`:""}
    <button type="button" id="slayPass" class="slayPass ${g?"":"hidden"}" ${g?"":"disabled"}>Pass</button>
  </div>`,a&&a.n!==mo){const u=mo;if(mo=a.n,u>=0){if(a.k==="play"&&a.card){const w=e.querySelector("#slayDiscard");w&&dS(r,a.card,w.getBoundingClientRect()),a.card.v==="skip"?t.toast("Nope!"):a.card.v==="rev"?t.toast("Flip!"):a.card.v==="d2"?t.toast("+2!"):a.card.v==="w4"&&t.toast("Crown +4!"),t.sfx.swish()}a.vdrew&&t.toast("Forgot to say SLAY! Draw 2"),a.k==="slay"&&t.sfx.sparkle()}}}function dS(e,t,n){const s=document.createElement("div");s.className="flyCard",s.innerHTML=Jc(t);const o=e?.width||70,i=e?.height||100;Object.assign(s.style,{left:(e?.left??innerWidth/2)+"px",top:(e?.top??80)+"px",width:o+"px",height:i+"px"}),document.body.appendChild(s),requestAnimationFrame(()=>{s.style.left=n.left+"px",s.style.top=n.top+"px",s.style.width=Math.max(n.width,70)+"px",s.style.height=Math.max(n.height,96)+"px"}),setTimeout(()=>s.remove(),560)}const fS={id:"slay",render:uh,handle(e,t){const n=t.table.view,s=t.table.you;if(!n||t.table.phase!=="play"||s===null)return!1;const o=n.hand??[];if(e.closest("#slayCall"))return o.length<=2&&o.length>0&&!n.slay?.[s]&&(t.move({k:"slay"}),t.sfx.sparkle()),!0;if(e.closest("#slayDeck"))return n.turn===s&&n.drawn==null&&(Bt=null,t.move({k:"draw"}),t.sfx.click()),!0;if(e.closest("#slayPass"))return n.turn===s&&n.drawn!=null&&(Bt=null,t.move({k:"pass"}),t.sfx.click()),!0;const i=e.closest("#crownPick [data-color]");if(i&&Bt!==null)return t.move({k:"play",id:Bt,color:+i.dataset.color}),Bt=null,t.sfx.sparkle(),!0;const a=e.closest("#slayHand [data-card]");if(!a||a.hasAttribute("disabled"))return!!a;const r=+a.dataset.card,l=o.find(c=>c.id===r);return!l||n.turn!==s||!Pu(l,n)||(l.c===4?(Bt=r,t.sfx.pop(),ed&&uh(ed,t)):(Bt=null,t.move({k:"play",id:r}),t.sfx.click())),!0}},Tu="#5a3d5c",mh=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),pS=`<svg viewBox="0 0 48 48"><path d="M24 42 C8 30 2 22 7 13 C11 6 20 8 24 16 C28 8 37 6 41 13 C46 22 40 30 24 42 Z" fill="#ff4d94" stroke="${Tu}" stroke-width="3" stroke-linejoin="round"/><path d="M16 16 Q20 12 22 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`,hS=`<svg viewBox="0 0 48 48"><path d="M24 3 L29 17 H44 L32 26 L37 42 L24 33 L11 42 L16 26 L4 17 H19 Z" fill="#66d9e8" stroke="${Tu}" stroke-width="3" stroke-linejoin="round"/><path d="M24 12 L26 18 H22 Z" fill="#fff" opacity=".8"/></svg>`,gS={id:"four",render(e,t){const n=t.table,s=n.view;if(!s||!Array.isArray(s.b)){e.innerHTML="";return}const o=n.you,i=o!==null&&s.turn===o&&n.phase==="play",a=new Set((s.line??[]).map(([m,k])=>m+":"+k)),r=s.last;let l="";for(let m=0;m<7;m++){const k=s.b[m];let y="";for(let w=5;w>=0;w--){const _=w<k.length?k[w]:null,P=a.has(m+":"+w)?" hot":"",x=r&&r.col===m&&r.row===w?" just":"";y+=`<span class="fourCell${_===0?" heart":_===1?" star":""}${P}${x}">${_===0?pS:_===1?hS:""}</span>`}const u=i&&k.length<6;l+=`<button type="button" class="fourCol" data-col="${m}" ${u?"":"disabled"} aria-label="Drop in column ${m+1}">${y}<span class="dropHint">${u?"▼":""}</span></button>`}const c=n.phase==="play"&&s.turn>=0,d=c?n.players[s.turn]:"",f=c?i?"Your turn!":`${mh(t.name(d))}'s turn`:"",p=o===0?"You are <b>pink hearts</b>":o===1?"You are <b>aqua stars</b>":"Pink hearts and aqua stars",g=m=>m===0?"♥":"★",b=n.players.map((m,k)=>`<div class="playerChip ${s.turn===k?"isTurn":""}"><span class="chipFace">${t.face(m)}</span><b>${mh(t.name(m))} ${g(k)}</b>${t.away(m)?'<i class="awayBadge">away</i>':""}</div>`).join("");e.innerHTML=`<div class="fourPlay">
      ${f?`<div class="whose ${i?"yours":""}" id="whoseTurn">${f}</div>`:""}
      <div class="fourChips">${b}</div>
      <p class="fourLegend">${p}</p>
      <div class="fourBoard" id="fourBoard">${l}</div>
    </div>`},handle(e,t){const n=e.closest(".fourCol");if(!n)return!1;const s=t.table.view,o=t.table.you;if(n.hasAttribute("disabled")||!s||o===null||s.turn!==o||t.table.phase!=="play")return!0;const i=+n.dataset.col;return!Number.isInteger(i)||s.b[i].length>=6||(t.move({col:i}),t.sfx.click()),!0}},yh={slay:fS,four:gS},Ca=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),uS={notHere:"Come into the clubhouse first!",taken:"Someone is sitting there!",playing:"You are already in this game!",playingElsewhere:"Finish your other game first!",notHost:"Waiting for the host…",needMore:"Play with friends on your street",tooMany:"That table is full!",notPlaying:"The game has not started!",notPlayer:"Sit down to play!",illegal:"You can't play that!",notAway:"She is still here!",tooSoon:"Give her a moment!",notSeated:"You are not at this table!",noMove:"No move to play!"};function mS(e){const t=document.getElementById("tableOverlay");let n=null,s="",o=0;const i=y=>y.away==null?0:y.away+Math.max(0,Date.now()-(y.receivedAt??Date.now())),a=()=>{o&&(clearInterval(o),o=0)},r=y=>{const u=!!y&&y.phase==="play"&&y.away!=null&&n!==null;u&&!o&&(o=window.setInterval(()=>f(),1e3)),u||a()},l=()=>e.hood(),c=()=>{const y=l();return!y||n===null?null:y.tables.get(n)??null},d=y=>{const u=l();return{table:y,me:u.pid,name:w=>u.players.get(w)?.nickname??"friend",face:w=>{const _=u.players.get(w)?.look;return _?md(vt(_)):""},move:w=>u.tbl({op:"move",tb:y.tb,m:w}),away:w=>{if(w===u.pid)return!1;const _=u.players.get(w);if(_&&!_.online)return!0;const P=u.presence.get(w);return!P||P.where!=="gameroom"},toast:e.toast,sfx:e.sfx}};t.addEventListener("click",y=>{const u=y.target;if(u.closest("#tblBack")){g(),e.sfx.swish();return}if(u.closest("#tblLeave")){b();return}if(u.closest("#tblStart")){m();return}if(u.closest("#tblNudge")){k();return}const w=c();w&&yh[w.game]?.handle(u,d(w))});function f(){const y=l(),u=c();if(!y||!u){t.classList.add("hidden"),t.innerHTML="",a();return}const w=yg[u.game],_=y.pid,P=u.seats.includes(_),x=u.seats.filter(Boolean).length,E=u.phase==="play"&&u.you!==null&&u.view&&u.view.turn===u.you,W=u.view?.winPid??null;let V="";if(u.phase==="over"){const I=W?y.players.get(W)?.nickname??"Friend":"";u.game==="slay"?V=W?W===_?"You slayed!":`${Ca(I)} slayed!`:"It's a tie!":V=u.view?.draw||!W?"It's a tie!":W===_?"You got four!":`${Ca(I)} got four!`;const O=u.tb+":"+u.seq;W===_&&s!==O&&(s=O,e.confetti(),e.sfx.sparkle())}const ne=i(u),Y=u.phase==="play"&&P&&ne>=M2&&u.you!==null&&!!u.view&&u.view.turn!==u.you&&u.view.turn>=0,K=u.phase!=="play"&&u.host===_&&x>=w.minPlayers&&x<=w.maxPlayers,an=P&&u.phase==="lobby"&&u.host!==_&&x>=w.minPlayers,Vt=P&&u.phase==="lobby"&&x<w.minPlayers;t.classList.remove("hidden"),t.dataset.tb=String(u.tb),t.dataset.phase=u.phase,t.dataset.game=u.game,t.dataset.you=u.you===null?"":String(u.you),t.innerHTML=`<div class="tblCard ${E?"yourTurn":""} game-${u.game}">
      <div class="tblTop"><h2>${Ca(w.name)}</h2><div class="seatDots">${u.seats.map(I=>`<i class="${I?"on":""} ${I===_?"me":""}"></i>`).join("")}</div></div>
      ${V?`<div class="winWrap"><div class="winBanner" id="winBanner">${V}</div></div>`:""}
      <div id="tblStage"></div>
      <div class="tblBar">
        ${K?'<button type="button" id="tblStart">Start</button>':""}
        ${an?'<p class="tblWait">Waiting for the host…</p>':""}
        ${Y?'<button type="button" id="tblNudge">Play for her</button>':""}
        <button type="button" id="tblBack">Back to room</button>
        <button type="button" id="tblLeave">Leave table</button>
      </div>
      ${Vt?'<p class="tblWait" id="needFriend">Play with friends on your street</p>':""}
    </div>`;const Ke=t.querySelector("#tblStage");u.phase==="lobby"||!u.view?Ke.innerHTML=p(u,y,_):yh[u.game]?.render(Ke,d(u)),r(u)}function p(y,u,w){return`<div class="lobby">${y.seats.map((_,P)=>`<div class="lobbySeat ${_?"filled":""} ${_===w?"me":""}">
      <span>${P+1}</span><b>${_?Ca(u.players.get(_)?.nickname??"friend"):"Empty"}</b>
      ${_&&_===y.host?"<i>host</i>":""}${_===w?"<i>you</i>":""}
    </div>`).join("")}</div>`}function g(){n=null,a(),t.classList.add("hidden"),t.innerHTML=""}function b(){const y=l(),u=c();y&&u&&u.seats.includes(y.pid)&&y.tbl({op:"leave",tb:u.tb}),e.sfx.click(),g()}function m(){const y=l(),u=c();y&&u&&(y.tbl({op:"start",tb:u.tb}),e.sfx.sparkle())}function k(){const y=l(),u=c();y&&u&&(y.tbl({op:"nudge",tb:u.tb}),e.sfx.click())}return{open(y){n=y,f()},close:g,refresh:f,fail(y,u){e.toast(uS[u]||"Try that again!"),e.sfx.pop(),n===y&&f()},isOpen:()=>n}}const Ru="/kids-house-game/assets/rug-zTS04c1f.webp",yS=Object.freeze(Object.defineProperty({__proto__:null,default:Ru},Symbol.toStringTag,{value:"Module"})),Bu="/kids-house-game/assets/pack~bean-bag-m3eBc9mA.webp",bS=Object.freeze(Object.defineProperty({__proto__:null,default:Bu},Symbol.toStringTag,{value:"Module"})),Au="/kids-house-game/assets/pack~sv-bean-bag-TrtltuSt.webp",kS=Object.freeze(Object.defineProperty({__proto__:null,default:Au},Symbol.toStringTag,{value:"Module"})),wS=120,vS=192,_S=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let oe=null,is=null,Sn=null,bh=!1;const Iu=960,$S=e=>!!e&&!document.body.classList.contains("phone")&&e.clientHeight>e.clientWidth+40,bs=()=>{const e=document.getElementById("gameroom"),t=e?.clientHeight||600;return $S(e)?Math.min(t/Io,e.clientWidth/Iu):t/Io},qa=()=>is;function qo(){const e=oe?.hood();if(!e)return null;for(const[t,n]of e.tables){const s=n.seats.indexOf(e.pid);if(s>=0){const o=oa(Number(t))[s];return{tb:Number(t),seat:s,x:o.x,y:o.y}}}return null}function xS(){const e=oe?.hood();if(!e)return!1;for(const[t,n]of e.players)if(t!==e.pid&&n.online)return!0;return!1}function MS(e){if(oe=e,is=mS({hood:e.hood,toast:e.toast,confetti:()=>Ag(),sfx:e.sfx}),bh)return is;bh=!0;const t=document.getElementById("grWorld");return t.addEventListener("click",ES),t.addEventListener("pointerdown",n=>{n.target.closest(".grChair, .grTable, .grDoor, .pet")&&n.stopPropagation()}),is}function ef(){if(!oe)return;const e=bs(),t=document.getElementById("grWorld"),n=l=>l*e+"px";t.style.width=Xi*e+"px",t.style.height=Io*e+"px",t.style.setProperty("--sc",String(e));const s=document.getElementById("gameroom"),o=(s?.clientHeight||0)-6-Io*e,i=o>1?Math.round(o*.55):0,a=o>1?Math.ceil(o-i)+6:0;t.style.marginTop=i?i+"px":"";let r=fE();i&&(r+=`<div class="grExtWrap" style="top:${-i}px;height:${i}px">${Jp("top",i/e)}</div>`),s&&(s.style.background=i?"linear-gradient(180deg, #ffe0f2 0 50%, #d27399 50%)":""),a&&(r+=`<div class="grExtWrap" style="top:100%;height:${a}px">${Jp("bottom",a/e)}${TS(e,a,s?.clientWidth||0)}</div>`),r+=`<button class="grDoor" data-gr="map" aria-label="Back to the map" style="left:${n(78)};top:${n(268)};width:${n(86)};height:${n(170)}"></button>`,Fs.forEach((l,c)=>{const d=l.seats>=6?560:l.seats>=4?440:340;r+=`<button class="grTable" data-tb="${c}" aria-label="${yg[l.game].name} table" style="left:${n(l.x-d/2)};top:${n(456)};width:${n(d)};height:${n(70)}"></button>`,oa(c).forEach((f,p)=>{const g=76*e,b=72*e,m=Math.max(g,44),k=Math.max(b,44),y=(f.x-38)*e-(m-g)/2,u=(f.y-16)*e-(k-b)/2;r+=`<button class="grChair" data-tb="${c}" data-seat="${p}" aria-label="Empty chair" style="left:${y}px;top:${u}px;width:${m}px;height:${k}px"></button>`})}),r+='<div class="savatars" id="gavatars"></div>',t.innerHTML=r,Ei()}function Ei(){if(!oe||oe.view()!=="gameroom")return;const e=document.getElementById("gavatars");if(!e)return;const t=bs(),n=new Set;for(const i of LS()){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&PS(a));const r=JSON.stringify(i.look)+i.name+(i.away?":away":"");if(a.dataset.look!==r){const p=a.querySelector(".bubble");a.innerHTML=`<div class="inner">${vt(i.look)}</div>${i.name?`<div class="nametag">${_S(i.name)}${i.away?'<i class="awayBadge">away</i>':""}</div>`:""}`,p&&a.appendChild(p),a.dataset.look=r}const l=(Ks[i.look.size]??1)*t*.95,c=wS*l,d=vS*l,f=i.seated?i.y-8:i.y;a.style.left=i.x*t-c/2+"px",a.style.top=f*t-d+"px",a.style.width=c+"px",a.style.height=d+"px",a.style.zIndex=String(100+Math.round(i.y)),a.classList.toggle("flipped",i.flip),a.classList.toggle("away",i.away),a.classList.toggle("seated",i.seated),na(a,i.look,i.mine)}e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),oe.refreshNear();const s=oe.hood();document.querySelectorAll("#grWorld .grChair").forEach(i=>{const a=s?.tables.get(+i.dataset.tb)?.seats[+i.dataset.seat];i.classList.toggle("taken",!!a);const r=a?s.players.get(a)?.nickname:"";i.setAttribute("aria-label",r?r+" is sitting":"Empty chair")});const o=document.getElementById("grSolo");o&&o.classList.toggle("hidden",xS())}function LS(){const e=[],t=oe.hood();if(t){const n=new Map;for(const[a,r]of t.tables)r.seats.forEach((l,c)=>{l&&n.set(l,oa(Number(a))[c])});const s=[...t.presence.entries()],o=oe.myPres();o&&s.push([t.pid,o]);const i=new Set;for(const[a,r]of s){if(r.where!=="gameroom")continue;const l=t.players.get(a);if(!l)continue;i.add(a);const c=n.get(a);e.push({key:a,look:l.look,name:l.nickname,x:c?.x??r.x,y:c?.y??r.y,flip:r.flip,mine:a===t.pid,away:!1,seated:!!c})}for(const[a,r]of n){if(i.has(a))continue;const l=t.players.get(a);l&&e.push({key:a,look:l.look,name:l.nickname,x:r.x,y:r.y,flip:!1,mine:!1,away:!0,seated:!0})}}else{const n=oe.solo();if(n?.where==="gameroom"){const s=oe.soloLook();e.push({key:"solo",look:s.look,name:"",x:n.x,y:n.y,flip:n.flip,mine:!0,away:!1,seated:!1})}}return e}function ES(e){if(!oe||oe.view()!=="gameroom")return;const t=e.target,n=t.closest(".savatar");if(n){const c=oe.hood(),d=n.dataset.pid;if(c&&d){for(const[f,p]of c.tables)if(p.seats.includes(d)){is?.open(Number(f));return}}return}if(t.closest('[data-gr="map"]')){oe.goMap();return}const s=t.closest(".grChair");if(s){SS(+s.dataset.tb,+s.dataset.seat);return}const o=t.closest(".grTable");if(o){if(!oe.hood()){Du();return}is?.open(+o.dataset.tb),oe.sfx.click();return}if(t.closest(".pet")||qo())return;const i=document.getElementById("grWorld").getBoundingClientRect(),a=bs(),r=(e.clientX-i.left)/a,l=(e.clientY-i.top)/a;l<430||(Sn={x:Math.max(60,Math.min(Xi-60,r)),y:Math.max(470,Math.min(590,l))})}function SS(e,t){if(!oe)return;const n=oe.hood();if(!n){Du();return}const s=n.tables.get(e)?.seats[t];if(s&&s!==n.pid){oe.toast((n.players.get(s)?.nickname??"Someone")+" is sitting there!"),oe.sfx.pop(),is?.open(e);return}Sn=null,n.tbl({op:"sit",tb:e,seat:t});const o=oa(e)[t];oe.setPres({where:"gameroom",x:o.x,y:Math.max(470,Math.min(590,o.y)),flip:!1}),is?.open(e),oe.sfx.click()}function Du(){if(!oe)return;const e=document.getElementById("grSolo");e&&(e.classList.remove("hidden"),e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),oe.toast("Play with friends on your street"),oe.sfx.pop()}function CS(e){if(!oe||oe.view()!=="gameroom"||!Sn)return;if(qo()){Sn=null;return}const t=oe.hood()?oe.myPres():oe.solo();if(!t||t.where!=="gameroom"){Sn=null;return}const n=Sn.x-t.x,s=Sn.y-t.y,o=Math.hypot(n,s);if(o<4){Sn=null;return}const i=Math.min(o,300*e),a={where:"gameroom",x:t.x+n/o*i,y:t.y+s/o*i,flip:Math.abs(n)>2?n<0:t.flip};oe.setPres(a);const r=bs(),l=document.getElementById("grScroll"),c=a.x*r-l.scrollLeft;(c<l.clientWidth*.22||c>l.clientWidth*.78)&&(l.scrollLeft=a.x*r-l.clientWidth/2)}function PS(e){e.addEventListener("pointerdown",t=>{if(!oe||qo())return;const n=oe.hood()?oe.myPres():oe.solo();if(!n||n.where!=="gameroom")return;t.preventDefault(),t.stopPropagation(),Sn=null;const s=bs(),o=document.getElementById("grWorld"),i=document.getElementById("grScroll"),a=y=>{const u=o.getBoundingClientRect();return{x:(y.clientX-u.left)/s,y:(y.clientY-u.top)/s}},r=a(t),l={x:n.x-r.x,y:n.y-r.y};let c=t,d=0,f=n.x,p=!1;const g=y=>{const u=oe.hood()?oe.myPres():oe.solo();if(!u||u.where!=="gameroom")return;const w=a(y),_=Math.max(60,Math.min(Xi-60,w.x+l.x)),P=Math.max(470,Math.min(590,w.y+l.y));if(!p&&Math.hypot(_-u.x,P-u.y)<6)return;p=!0;const x=Math.abs(_-f)>3?_<f:u.flip;Math.abs(_-f)>3&&(f=_),oe.setPres({where:"gameroom",x:_,y:P,flip:x})},b=()=>{const y=i.getBoundingClientRect(),u=c.clientX<y.left+70?-12:c.clientX>y.right-70?12:0;u&&p&&(i.scrollLeft+=u,g(c)),d=requestAnimationFrame(b)};d=requestAnimationFrame(b),e.classList.add("lifted"),oe.sfx.pick();const m=y=>{y.pointerId===t.pointerId&&(c=y,g(y))},k=y=>{y.pointerId===t.pointerId&&(cancelAnimationFrame(d),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",k),e.classList.remove("lifted"),p&&oe.sfx.drop())};window.addEventListener("pointermove",m),window.addEventListener("pointerup",k)})}function TS(e,t,n){if(t<120)return"";const s=n?Math.min(Fs[0].x*e,n/2):Fs[0].x*e,o=Math.min(560*e*1.2,t*1.7),i=o*306/960,a=Math.max(8,(t-i)*.45),r=o*.26,l=r*.78,c=(d,f,p,g,b=!1)=>`<img class="grDecor" src="${d}" alt="" aria-hidden="true" draggable="false" style="left:${f}px;top:${p}px;width:${g}px${b?";transform:scaleX(-1)":""}">`;return`<div class="grDecor grRug" aria-hidden="true" style="left:${s-o/2}px;top:${a}px;width:${o}px;height:${i}px"><img src="${Ru}" alt="" draggable="false" style="width:${o}px;margin-top:${-o*634/960}px"></div>`+c(Bu,s-o/2-r*.35,a+i*.45-l*.6,r)+c(Au,s+o/2-r*.65,a+i*.45-l*.6,r*1.02,!0)}const hi=SE(),J=pg();J.born&&typeof navigator<"u"&&!navigator.webdriver&&!J.get().baby&&J.dispatch({type:"baby/meet",now:Date.now()});let Pe=J;const Ou=[],kh=new WeakSet;function Hu(e){kh.has(e)||(kh.add(e),e.subscribe((t,n)=>{Pe===e&&Ou.forEach(s=>s(t,n))}))}Hu(J);const C={get:()=>Pe.get(),dispatch(e){Pe.dispatch(e)},subscribe:e=>{Ou.push(e)}},pe=Mt,Re=Pn,Js=390;let te=1e3;const eo=()=>Math.max(0,pe-te),ia=375,Wu=(e,t)=>e.wall?Math.min(t,ia):t,Uu=12,ro=(e,t)=>e.wall?t:Math.min(t,Re-Uu),ks=120,yn=192,tf=[{id:"living",name:"Living Room",color:"#ff8fab"},{id:"bedroom",name:"Bedroom",color:"#b388d6"},{id:"kitchen",name:"Kitchen",color:"#5cc985"},{id:"salon",name:"Salon",color:"#f0a0d8"},{id:"nursery",name:"Nursery",color:"#9ad7f5"},{id:"bathroom",name:"Bathroom",color:"#7ec8d6"}],Vu=e=>tf.find(t=>t.id===e)?.color??"#ccc",nf=D7();yM(wn,ge);const Do=[{id:"__people",name:"People",icon:"",kind:"people"},...["furniture","decor","plants","food","pets"].map((e,t)=>({id:e,name:e,icon:["armchair","balloon","flowers","donut","cat"][t],kind:"cat"}))];Do.push({id:"secrets",name:"Secrets",icon:"egg:chloe-starlamp",kind:"cat"});for(const e of wn)Do.some(t=>t.kind==="cat"&&t.id===e.cat)||Do.push({id:e.cat,name:e.cat,icon:e.kind,kind:"cat"});for(const e of wn)e.pack&&!nu(e)&&!Do.some(t=>t.id==="pack:"+e.pack)&&Do.push({id:"pack:"+e.pack,name:Ig(e.pack),icon:e.kind,kind:"pack"});const Jl=e=>wn.filter(t=>t9(t,e,C.get().currentRoom,of==="all",al())),RS=["#ffd6e0","#d9ccff","#cdf3dc","#cfe8ff","#fff1b8","#ffe0c7","#ffffff","#f6c1ff"],BS=["#e8b98a","#f2d0a4","#c99366","#ffe7a8","#bfe3d0","#d6d6f5","#ffc8dd","#9fb4c7"],Qt={paint:'<svg viewBox="0 0 48 48"><path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M28 12 L34 6 L42 14 L36 20" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/></svg>',shirt:'<svg viewBox="0 0 48 48"><path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',soundOn:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 17 Q37 24 32 31 M36 12 Q45 24 36 36" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',soundOff:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ddd" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M33 19 L43 29 M43 19 L33 29" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',flip:'<svg viewBox="0 0 48 48"><path d="M24 6 V42" stroke="#5a3d5c" stroke-width="3" stroke-dasharray="4 4"/><path d="M18 12 L6 36 H18 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M30 12 L42 36 H30 Z" fill="#fff" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',front:'<svg viewBox="0 0 48 48"><rect x="6" y="6" width="22" height="22" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="18" y="18" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',back:'<svg viewBox="0 0 48 48"><rect x="18" y="18" width="24" height="24" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="22" height="22" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',trash:'<svg viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="28" rx="5" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><rect x="8" y="9" width="32" height="7" rx="3.5" fill="#ffadad" stroke="#5a3d5c" stroke-width="3"/><path d="M20 21 V35 M28 21 V35" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',smaller:'<svg viewBox="0 0 48 48"><rect x="16" y="16" width="16" height="16" rx="4" fill="#bde0fe" stroke="#5a3d5c" stroke-width="3"/><path d="M8 24 H14 M34 24 H40" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',bigger:'<svg viewBox="0 0 48 48"><rect x="12" y="12" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M24 6 V11 M24 37 V42 M6 24 H11 M37 24 H42" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>'},AS='<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',IS='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 15 H37 M11 24 H37 M11 33 H37" fill="none" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',DS='<svg class="mailGlyph" viewBox="0 0 48 48" aria-hidden="true"><g transform="translate(0 2)"><rect x="6" y="14" width="36" height="24" rx="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/><path d="M6 16 L24 30 L42 16" fill="none" stroke="#5a3d5c" stroke-width="3"/><path d="M34 12 V6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M34 6 H44 L40 10 L44 14 H34 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2"/></g></svg>',zu='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',wh='<svg viewBox="0 0 40 40" width="28" height="28"><path d="M12 36 L18 8 M28 36 L22 8 M20 30 V38" stroke="#a86f3e" stroke-width="3" stroke-linecap="round"/><rect x="8" y="8" width="24" height="18" rx="3" fill="#fff" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="16" cy="16" r="3" fill="#ff8fab"/><path d="M12 24 L20 17 L28 24" fill="#69db7c" stroke="#5a3d5c" stroke-width="1.5" stroke-linejoin="round"/></svg>',OS=document.getElementById("app");OS.innerHTML=`
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${It.chat}<span class="badge" id="chatBadge"></span></button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${It.home}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${Mb}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${sE}</button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${ud}<span class="badge" id="mapBadge"></span></button>
    <button class="round" id="btnMenu" aria-label="Menu" aria-expanded="false">${IS}<span class="badge" id="menuBadge"></span></button>
  </div>
</div>
<div class="menuPop hidden" id="menuPop">
  <div class="menuCard" role="dialog" aria-label="Menu">
    <button type="button" class="close" id="menuClose" aria-label="Close">✕</button>
    <p class="menuGroup">My stuff</p>
    <button type="button" class="menuRow photoRow" id="btnPhoto" aria-label="Take a photo"><span class="mIco">📸</span><span class="mLabel">Take a photo</span></button>
    <button type="button" class="menuRow" id="btnPets" aria-label="Pets"><span class="mIco">${Rg}</span><span class="mLabel">Pets</span></button>
    <button type="button" class="menuRow" id="btnDress" aria-label="Characters"><span class="mIco">${Qt.shirt}</span><span class="mLabel">Characters</span></button>
    <button type="button" class="menuRow" id="btnStudio" aria-label="Art Studio"><span class="mIco">${wh}</span><span class="mLabel">Art Studio</span></button>
    <button type="button" class="menuRow" id="btnPaint" aria-label="Colors"><span class="mIco">${Qt.paint}</span><span class="mLabel">Wall &amp; floor colors</span></button>
    <button type="button" class="menuRow" id="secrets" aria-label="Surprises, 0 of 5"><span class="mIco secGift">🎁</span><span class="mLabel"><span class="secWord">Surprises </span><span class="secCount">0/5</span></span></button>
    <p class="menuGroup houseGroup">House</p>
    <button type="button" class="menuRow lockRow" id="btnLock" aria-label="Lock house"><span class="mIco" id="lockIco">${It.lockOff}</span><span class="mLabel" id="lockLabel">Lock my house</span></button>
    <button type="button" class="menuRow mailRow" id="btnMail" aria-label="Mailbox"><span class="mIco">${DS}</span><span class="mLabel">Mailbox</span><span class="menuNew" id="mailNew"></span></button>
    <!-- Day / Night / Auto. The clock stays on Auto until she taps. -->
    <div id="menuDaySlot" class="menuSlot" hidden></div>
    <p class="menuGroup streetGroup">Street</p>
    <button type="button" class="menuRow grownRow" id="btnParent" aria-label="Grown-ups"><span class="mIco">${It.shield}</span><span class="mLabel">Grown-ups</span></button>
    <button type="button" class="menuRow soloLeave" id="btnSolo" aria-label="Play in my own house"><span class="mIco">${It.solo}</span><span class="mLabel">Play in my own house</span></button>
    <button type="button" class="menuRow friendRow" id="btnHood" aria-label="Friends"><span class="mIco">${It.street}</span><span class="mLabel">Friends</span></button>
    <p class="menuGroup">Settings</p>
    <button type="button" class="menuRow" id="btnSound" aria-label="Sound"><span class="mIco" id="soundIco"></span><span class="mLabel">Sound</span></button>
  </div>
</div>
<div class="stageWrap" id="stageWrap">
  <div class="stage" id="stage">
    <div class="world" id="world">
      <div class="wall" id="wall"></div><div class="floor" id="floor"></div><div class="baseboard"></div>
      <div class="scenery" id="scenery"></div>
      <div class="partyFx" id="partyFx" aria-hidden="true"><i class="pl pl1"></i><i class="pl pl2"></i><i class="pl pl3"></i><i class="sp s1"></i><i class="sp s2"></i><i class="sp s3"></i><i class="sp s4"></i><i class="sp s5"></i><i class="sp s6"></i><i class="sp s7"></i><i class="sp s8"></i></div>
      <div class="layer" id="layer"></div>
      <div class="artGrip hidden" id="artGrip" role="button" aria-label="Drag to make the painting bigger or smaller"><span class="artGripDot"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M11 29 L29 11" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/><path d="M9 19 L9 31 L21 31 Z M31 21 L31 9 L19 9 Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></span></div>
      <div class="toolbar hidden" id="toolbar">
        <button data-a="smaller" aria-label="Smaller">${Qt.smaller}</button><button data-a="bigger" aria-label="Bigger">${Qt.bigger}</button><button data-a="flip" aria-label="Flip">${Qt.flip}</button><button data-a="front" aria-label="Bring forward">${Qt.front}</button><button data-a="back" aria-label="Send back">${Qt.back}</button><button data-a="delete" class="danger" aria-label="Put away">${Qt.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <button type="button" class="artFab" id="artFab" aria-label="Art Studio: paint a picture">${wh}<span>Paint</span></button>
  <div class="bin" id="bin">${Qt.trash}</div>
  <div class="houseTag" id="houseTag"></div>
</div>
<div class="drawer">
  <div class="drawerBar" id="drawerBar">
    <div class="modeDock" id="modeDock">
      <div class="modeToggle" id="modeToggle">
        <button type="button" id="modePlay" data-mode="play" aria-label="Play" aria-pressed="false"><span class="modeIco"></span><span class="modeWord">Play</span></button>
        <button type="button" id="modeDecorate" data-mode="decorate" aria-label="Decorate" aria-pressed="true"><span class="modeIco"></span><span class="modeWord">Decorate</span></button>
      </div>
    </div>
    <div class="drawerTop">
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
<div class="street mapView hidden" id="street"><div class="mapSky">${$m}</div><div class="mapMeadow">${xm}</div><button class="mailCue" id="mailCue" type="button">You've got mail!</button><div class="mapWorld" id="mapWorld"></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>
<div id="toastLane"></div>
<div class="phoneNote" id="phoneNote"><div class="card"><h2>Turn sideways</h2><p>Turn your phone sideways for more room to play!</p><button class="phoneOk" id="phoneOk" type="button">OK!</button></div></div>
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>
<div id="skyMount"></div>`;const M=e=>document.getElementById(e),F=M("stage"),sf=M("world"),j=M("layer"),ae=M("toolbar"),Na=M("bin");let Ve=null,Ie=C.get().characters[0]?.id??null,At="furniture",of="",td="",HS=Date.now()%1e5;const _r=e=>`${e}-${Date.now().toString(36)}${(++HS).toString(36)}${Math.random().toString(36).slice(2,5)}`,gt="__me";let v=null,B="house",ze=!1,be="",$r=new Map,Qu=!1,qu=()=>{};const Be=Ky(M("modeToggle"),{ownHouse:()=>!v||!be||be===v.myHouseId(),onChange:()=>{Qu&&(No.matches?hs():ws()),qu()}}),Za=qy({send:(e,t,n,s)=>v?.sendMail(e,t,n,s),read:(e,t)=>v?.readMail(e,t),drop:(e,t)=>v?.dropMail(e,t),houseOf:e=>[...v?.players.values()??[]].find(t=>t.pid===e)?.houseId??"",houseName:e=>v?.houses.get(e)?.meta.name??"My House",lettersOf:e=>v?.houses.get(e)?.confirmed.mailbox?.letters??[],mine:e=>!!v&&v.houses.get(e)?.meta.ownerId===v.pid,toast:N,openOwn:()=>{const e=v?.myHouseId();e&&$f(e)},freeType:()=>!v||Mg(v.settings)});Be.sync(!0);const Ws=new Map,xr={};let ce=Uo,So=0;Qu=!0;let zi=null;const dl=()=>{cancelAnimationFrame(So),zi=null},af=e=>Math.max(0,Math.min(eo(),e));function Je(e){ce=af(e),xr[C.get().currentRoom]=ce,sf.style.transform=`translate3d(${-ce}px,0,0)`,M("nudgeL").classList.toggle("off",ce<=1),M("nudgeR").classList.toggle("off",ce>=eo()-1);const t=M("mmView");t.style.left=ce/pe*100+"%",t.style.width=te/pe*100+"%",Ve&&u0(C.get())}function fl(e){cancelAnimationFrame(So),e=af(e),zi=e;const t=()=>{const n=e-ce;if(Math.abs(n)<.5){Je(e),zi=null;return}Je(ce+n*.18),So=requestAnimationFrame(t)};So=requestAnimationFrame(t)}const wt=()=>F.getBoundingClientRect().width/te,WS="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)",No=window.matchMedia(WS);function US(){const e=No.matches;document.body.classList.toggle("phone",e),document.body.classList.toggle("phone-portrait",e&&window.matchMedia("(orientation: portrait)").matches);const t=M("stageWrap");for(const n of[M("nudgeL"),M("nudgeR")]){const s=e?t:F;n.parentElement!==s&&s.appendChild(n)}}function Nu(){const e=document.querySelector(".top");if(!e)return;const t=e.getBoundingClientRect(),n=document.body.classList.contains("phone")?t.bottom:t.height;document.documentElement.style.setProperty("--chrome-h",Math.ceil(n)+"px"),Zu()}function Zu(){const e=document.querySelector(".top");if(!e)return;const t=Math.ceil(e.getBoundingClientRect().bottom+16)+"px",n=document.getElementById("mailCue");n&&(n.style.top=t);const s=document.getElementById("toastLane");s&&(s.style.top=t)}function VS(){const e=document.documentElement,t=document.getElementById("app");if(!(document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait"))){t.style.top="",t.style.height="",t.style.bottom="",e.style.removeProperty("--vvh"),e.style.removeProperty("--vvt");return}const s=window.visualViewport,o=Math.round(s?s.height:window.innerHeight),i=Math.round(s?s.offsetTop:0);e.style.setProperty("--vvh",o+"px"),e.style.setProperty("--vvt",i+"px"),t.style.top=i+"px",t.style.height=o+"px",t.style.bottom="auto"}function ws(){US(),VS(),Nu();const e=M("stageWrap"),t=document.body.classList.contains("phone"),n=e.clientWidth,s=e.clientHeight,o=Math.max(1,s-cf());if(t?s>n*.85:s>n+40){const r=n/Math.max(1,s);te=Math.round(Math.max(480,Math.min(860,Re*r)))}else if(t){const r=n/Math.max(1,o);te=Math.round(Math.max(480,Math.min(pe,Re*r)))}else te=1e3;te=rf(te),F.style.width=te+"px",F.style.height=Re+"px";const a=Math.min(n/te,o/Re);if(Xu(a),F.style.setProperty("--yard-sc",String(a||1)),t&&F.style.setProperty("--fit",String(wt())),Fu(),ce>eo())Je(ce);else{const r=M("mmView");r.style.left=ce/pe*100+"%",r.style.width=te/pe*100+"%"}lt(),!t&&B==="house"&&to(!1),KS(),B==="ranch"&&requestAnimationFrame(gd),B==="gameroom"&&requestAnimationFrame(dm),Zo(),t&&B==="ranch"&&TP(),ju(),Be.hint(),_l(),Xn()}function Fu(){const e=M("stageWrap"),t=document.body.classList.contains("phone")&&B==="house";for(const n of[M("nudgeL"),M("nudgeR")]){if(!t||n.parentElement!==e){n.style.marginTop="",n.style.left="",n.style.right="",n.style.top="";continue}const s=F.getBoundingClientRect(),o=e.getBoundingClientRect(),i=(s.top+s.bottom)/2-o.top;n.style.top=i+"px",n.style.marginTop=-n.offsetHeight/2+"px",n.style.left="",n.style.right=""}}function ju(){document.body.classList.remove("secrets-chrome"),M("secrets")?.classList.remove("compact")}function lt(e=0){if(!document.body.classList.contains("phone"))return;if(B==="house"){Gu();return}const t=B==="park"?"parkScroll":B==="ranch"?"ranchScroll":B==="gameroom"?"grScroll":"";if(!t)return;const n=document.getElementById(t);if(!n||n.clientWidth<20){e<8&&requestAnimationFrame(()=>lt(e+1));return}const s=n.querySelector(".savatar.mine")??n.querySelector(".savatar");if(!s){e<8&&requestAnimationFrame(()=>lt(e+1));return}QS(n,[s,...s.querySelectorAll(".nametag")])&&e<8?requestAnimationFrame(()=>lt(e+1)):zS()}function zS(){$l()&&(B==="gameroom"&&cm([...document.querySelectorAll(".neonSignArt")],document.getElementById("grScroll")),B==="ranch"&&!ze&&(fm(),Hf()))}function QS(e,t){const s=e.getBoundingClientRect(),o=Math.min(s.right,window.innerWidth)-8,i=Math.max(s.left,0)+8;let a=0,r=0;for(const c of t){const d=c.getBoundingClientRect();d.width<2||d.height<2||(a=Math.max(a,d.right-o),r=Math.max(r,i-d.left))}if(a<=1&&r<=1)return!1;const l=e.scrollLeft;return a>1&&r>1?e.scrollLeft-=r:a>1?e.scrollLeft+=a:e.scrollLeft-=r,Math.abs(e.scrollLeft-l)>.5}function Gu(){to(!1)}function vh(e){let t=0;for(const n of e){const s=ge[n.kind];!s||s.wall||(t=Math.max(t,s.w*Ye(n)))}return t}function qS(){if(B!=="house"||!Be.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return 0;const e=C.get().rooms,t=C.get().currentRoom;let n=vh(e[t]?.items??[]);if(t==="backyard")for(const o of Object.keys(e))o!=="backyard"&&(n=Math.max(n,vh(e[o].items)));if(n<40)return 0;const s=document.body.classList.contains("phone-portrait")?.7:.55;return Math.min(pe,Math.ceil(n/s))}function rf(e){const t=qS();return t&&e<t?t:e}function NS(){const e=rf(te);if(e<=te+.5)return;te=e,F.style.width=te+"px";const t=M("stageWrap"),n=Math.max(1,t.clientHeight-cf()),s=Math.min(t.clientWidth/te,n/Re);if(Xu(s),document.body.classList.contains("phone")&&F.style.setProperty("--fit",String(s)),ce>eo())Je(ce);else{const o=M("mmView");o.style.left=ce/pe*100+"%",o.style.width=te/pe*100+"%"}}let Qi=null,qi=!1;function ZS(){if(B!=="house"||!Be.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return null;const e=C.get();if(e.currentRoom==="backyard")return null;let t=null,n=Qi;if(v&&Pe!==J){const a=_e();a&&a.where==="house"&&a.room===e.currentRoom&&(t=St(e.currentRoom,Hn(v.pid,a),a).x,n||(n=Hn(v.pid,a)?.item??null))}if(t===null){const a=e.characters.find(r=>r.id===Ie&&r.room===e.currentRoom)??e.characters.find(r=>r.room===e.currentRoom);if(!a)return null;t=St(e.currentRoom,Pt(a),a).x,n||(n=Pt(a)?.item??null)}if(!n)return null;const s=e.rooms[e.currentRoom].items.find(a=>a.id===n),o=s&&ge[s.kind];if(!s||!o)return null;const i=o.w*Ye(s)/2;return{minX:Math.min(t-100,s.x-i),maxX:Math.max(t+100,s.x+i)}}function to(e){if(B!=="house"||no)return;if(C.get().currentRoom==="backyard"){Math.abs(ce-Bc)>.5&&Je(Bc),Xn();return}if(qi)return;const t=ZS();if(t){const k=t.maxX-t.minX;let y=ce;k+20*2>te?y=t.minX-20:(t.minX-20<y&&(y=t.minX-20),t.maxX+20>y+te&&(y=t.maxX+20-te)),y=Math.max(0,Math.min(eo(),y)),Math.abs(y-ce)>.5&&Je(y),Xn();return}const n=document.querySelector("#layer .char.avatar.mine")??document.querySelector("#layer .char");if(!n)return;const s=wt()||1,o=F.getBoundingClientRect(),i=8;let a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i;for(const m of["nudgeL","nudgeR"]){const k=M(m);if(!k||k.classList.contains("off")||k.offsetParent===null)continue;const y=k.getBoundingClientRect();y.width<2||y.height<2||(m==="nudgeL"?r=Math.max(r,y.right+6):a=Math.min(a,y.left-6))}a-r<48&&(a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i);const l=[n,...n.querySelectorAll(".nametag")];let c=0,d=0,f=1/0,p=-1/0;for(const m of l){const k=m.getBoundingClientRect();k.width<2||k.height<2||(c=Math.max(c,k.right-a),d=Math.max(d,r-k.left),f=Math.min(f,k.left),p=Math.max(p,k.right))}if(document.body.classList.contains("phone-portrait")&&f<1/0){const m=(f+p)/2-(r+a)/2;if(Math.abs(m)>3){Je(ce+m/s),Xn();return}}const g=FS(n),b=A9({cam:ce,maxCam:eo(),kidX:g,overflowL:d,overflowR:c,scale:s,nudgeX:e});Math.abs(b.cam-ce)>.5&&Je(b.cam),e&&Math.abs(b.kidX-g)>.5&&jS(n,b.kidX),Xn()}function FS(e){if(e.dataset.pid&&v){const t=e.dataset.pid===v.pid?_e():v.presence.get(e.dataset.pid);if(t&&t.where==="house")return t.x}return C.get().characters.find(t=>t.id===e.dataset.cid)?.x??0}function jS(e,t){if(e.dataset.pid&&v&&e.classList.contains("mine")){const o=_e();if(!o||o.where!=="house")return;et({...o,x:t}),Ct();return}const n=e.dataset.cid;if(!n)return;const s=C.get().characters.find(o=>o.id===n);s&&C.dispatch({type:"char/move",id:n,room:C.get().currentRoom,x:t,y:s.y})}const GS={living:"Living",bedroom:"Bed",kitchen:"Kitchen",salon:"Salon",nursery:"Nursery",bathroom:"Bath"};function Yu(){const e=B==="house",t=document.body.classList.contains("phone-portrait"),n=e&&!Be.isPlay(),s=e&&te+1<pe,o=e&&(t?n:n||s);document.body.classList.toggle("show-minimap",o)}const YS='<svg class="tabIco" width="14" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6 L8 1 L15 6 V11 H1 Z" fill="currentColor"/></svg>';function Ku(){return document.body.classList.contains("phone")}function KS(){const e=Ku()?"c":"f";Yu(),e!==td&&(td=e,i0(C.get()))}function lf(){No.matches?hs():ws()}window.addEventListener("resize",lf);window.addEventListener("resize",()=>requestAnimationFrame(ff));M("tabs").addEventListener("scroll",ff,{passive:!0});No.addEventListener("change",lf);let _h="",ec=!1;function $h(){const e=M("stageWrap"),t=document.querySelector(".top"),n=document.querySelector(".tools"),s=r=>r?r.clientWidth+"x"+r.clientHeight:"0",o=window.visualViewport,i=o?Math.round(o.offsetTop)+"x"+Math.round(o.height)+"x"+Math.round(o.width):"",a=document.body.classList.contains("baby-card")?"c":"";return i+" "+s(e)+" "+s(t)+" "+s(n)+a}function cf(){const e=document.body;if(!e.classList.contains("baby-card")||!e.classList.contains("phone")||e.classList.contains("phone-portrait"))return 0;const t=document.querySelector(".babyCare"),n=t&&!t.hidden?t.getBoundingClientRect().height:0;return Math.ceil(8+(n>8?n:72)+8)}function Xu(e){const t=cf(),n=M("stageWrap").clientHeight;F.style.left="",t>0?F.style.top=t+Math.max(0,n-t)/2+"px":F.style.top="",F.style.transform=`translate(-50%,-50%) scale(${e})`}function Ju(){const e=M("modeToggle"),t=document.querySelector(".tools"),n=document.getElementById("modeDock"),s=document.querySelector(".drawerTop"),o=document.getElementById("roomFilter");if(!e||!t||!n||!s||!o)return!1;const i=document.body.classList.contains("phone"),a=i&&!document.body.classList.contains("phone-portrait"),r=!i&&window.matchMedia("(min-width: 900px)").matches,l=a?t:i||r?n:s;n.hidden=!(i&&!a)&&!r,n.classList.toggle("wideDock",r);let c=!1;const d=r?n:s;return o.parentElement!==d&&(r?n.appendChild(o):s.insertBefore(o,s.firstChild),c=!0),(e.parentElement!==l||r&&n.firstChild!==e)&&(a?t.insertBefore(e,t.firstChild):i||r?n.insertBefore(e,n.firstChild):s.insertBefore(e,s.firstChild),c=!0),c}function XS(){if(C.get().currentRoom==="backyard"||!document.body.classList.contains("phone-portrait")||!document.body.classList.contains("mode-play")||B!=="house")return;const e=M("stageWrap"),t=e.clientWidth,n=e.clientHeight;if(t<20||n<20||!(n>t*.85))return;const s=Math.min(pe,rf(Math.max(280,Math.min(860,Math.round(Re*t/n)))));if(Math.abs(s-te)<2)return;te=s,F.style.width=te+"px",F.style.height=Re+"px";const o=Math.min(t/te,n/Re);if(F.style.transform=`translate(-50%,-50%) scale(${o})`,F.style.setProperty("--fit",String(wt())),ce>eo())Je(ce);else{const i=M("mmView");i.style.left=ce/pe*100+"%",i.style.width=te/pe*100+"%"}Fu(),Yu()}function hs(){if(ec||!No.matches)return;const e=Ju(),t=$h()+(document.body.classList.contains("mode-play")?"p":"d");if(!(!e&&t===_h)){ec=!0;try{ws(),XS(),lt(),_h=$h()+(document.body.classList.contains("mode-play")?"p":"d")}finally{ec=!1}}}if(typeof ResizeObserver<"u"){const e=new ResizeObserver(()=>hs()),t=document.querySelector(".top");t&&e.observe(t),e.observe(M("stageWrap"));const n=document.querySelector(".tools");n&&e.observe(n)}window.visualViewport&&(window.visualViewport.addEventListener("resize",()=>hs()),window.visualViewport.addEventListener("scroll",()=>hs()));F.addEventListener("scroll",()=>{F.scrollLeft=0,F.scrollTop=0});const Ue=(e,t)=>{const n=F.getBoundingClientRect();return{x:(e-n.left)/n.width*te+ce,y:(t-n.top)/n.height*Re}},nd=(e,t)=>{const n=F.getBoundingClientRect();return e>n.left&&e<n.right&&t>n.top&&t<n.bottom},xh=(e,t)=>{const n=Na.getBoundingClientRect();return e>n.left-20&&e<n.right+20&&t>n.top-20&&t<n.bottom+20},aa=e=>Ks[e.size]??1,gn=new Map;function df(){return!v||Pe===J?!0:v.houses.get(be)?.meta.ownerId===v.pid}function pl(e){const t=ge[e.kind];return!t||!ao(e.kind)?null:{id:e.id,kind:e.kind,x:e.x,footY:ro(t,e.y),flip:!!e.flip,scale:Ye(e),w:t.w,h:je(t)}}function St(e,t,n){if(!t)return n;const s=C.get().rooms[e]?.items.find(a=>a.id===t.item),o=s&&pl(s);if(!o)return n;const i=ng(o).find(a=>a.n===t.n);return i?{x:i.x,y:i.y}:n}function Ni(e,t,n=!1){const s=C.get(),o=[];for(const i of s.characters){if(i.id===e||i.room!==s.currentRoom)continue;const a=Pt(i);a&&o.push({item:a.item,n:a.n})}if(!n){const i=n2(s.baby,s.currentRoom);i&&o.push(i)}if(v&&B==="house"){const i=(r,l)=>{if(r===t||l.where!=="house"||l.houseId!==be||l.room!==s.currentRoom)return;const c=Hn(r,l);c&&o.push({item:c.item,n:c.n})};v.presence.forEach((r,l)=>i(l,r));const a=_e();a&&v.pid!==t&&i(v.pid,a)}return o}function e0(e,t){t?gn.set(e,t):gn.delete(e)}function gi(e,t,n,s,o){const a=!v||Pe===J||!!v?.speaksSit;a?gn.delete("c:"+e):e0("c:"+e,o),a?C.dispatch({type:"char/move",id:e,room:t,x:n,y:s,seat:o}):C.dispatch({type:"char/move",id:e,room:t,x:n,y:s})}function Fa(e,t,n,s,o){const{seat:i,...a}=e;if(v&&!v.speaksSit){e0("p:"+v.pid,o?{item:o.id,pose:o.pose,n:o.n}:null),et({...a,x:t,y:n,flip:s});return}v&&gn.delete("p:"+v.pid),et(o?{...a,x:t,y:n,flip:s,seat:o}:{...a,x:t,y:n,flip:s})}function Pt(e){return e.seat?e.seat:gn.get("c:"+e.id)??null}function Hn(e,t){return t.seat?{item:t.seat.id,pose:t.seat.pose,n:t.seat.n}:gn.get("p:"+e)??null}function Mr(e,t){const n=C.get(),s=document.elementsFromPoint(e,t),o=new Set;for(let i=0;i<s.length;i++){const a=s[i];if(!a||!a.closest)continue;const r=a.closest(".item");if(!r)continue;const l=r.dataset.id;if(!l||o.has(l))continue;o.add(l);const c=n.rooms[n.currentRoom].items.find(d=>d.id===l);if(c&&ao(c.kind))return c}return null}function JS(e){const t=Jr(e);if(t)return"k-bed k-bed-"+t.clip;const n=e.toLowerCase();return/sofa|couch|loveseat/.test(n)?"k-sofa":/bench/.test(n)?"k-bench":/chair|stool|rocker/.test(n)?"k-chair":""}function eC(){const e=C.get(),t=new Map,n=(s,o)=>{const i=t.get(s);t.set(s,i===void 0?o:Math.max(i,o))};for(const s of e.characters){const o=s.room===e.currentRoom?Pt(s):null;o&&n(o.item,o.n)}if(v&&B==="house"){const s=(i,a)=>{const r=a.where==="house"&&a.houseId===be&&a.room===e.currentRoom?Hn(i,a):null;r&&n(r.item,r.n)};v.presence.forEach((i,a)=>s(a,i));const o=_e();o&&s(v.pid,o)}return t}function tC(e,t){const n=aa(e),s=ll(e,il(Pt(e)?.pose))[t];let o=s.x;e.flip&&(o=100-o);const i=St(e.room,Pt(e),e);return{x:i.x+(o-50)/100*ks*n,y:i.y-yn*n+s.y/160*yn*n}}function t0(e){const t=C.get();let n=null;for(const s of t.characters){if(s.room!==t.currentRoom)continue;const o=aa(s),i=St(s.room,Pt(s),s),a=Math.abs(e.x-i.x)<ks*o/2+25&&e.y>i.y-yn*o-25&&e.y<i.y+20;for(const r of["left","right"]){if(s.held[r])continue;const l=tC(s,r),c=Math.hypot(e.x-l.x,e.y-l.y);(a||c<75)&&(!n||c<n.d)&&(n={c:s,hand:r,d:c})}}return n}const n0=["none","radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)","repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)","linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)"],s0="repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 125px), linear-gradient(rgba(0,0,0,.06), transparent 50%)",sd=e=>`url('${e.replace(/'/g,"%27")}')`;function o0(e){const t=e.rooms[e.currentRoom],n=M("wall"),s=M("floor"),o=t.wallTile?Mp[t.wallTile]:void 0;n.style.backgroundColor=t.wallpaper,o?(n.style.backgroundImage=sd(o.url),n.style.backgroundSize="220px auto",n.style.backgroundPosition="0 0"):(n.style.backgroundImage=n0[t.pattern]??"none",n.style.backgroundSize=t.pattern===1?"44px 44px":t.pattern===3?"60px 60px":"auto",n.style.backgroundPosition=t.pattern===3?"0 0, 30px 30px":"0 0");const i=t.floorTile?Mp[t.floorTile]:void 0;s.style.backgroundColor=t.floor,s.style.backgroundImage=i?`${sd(i.url)}, linear-gradient(rgba(0,0,0,.06), transparent 50%)`:s0,s.style.backgroundSize=i?"180px auto, auto":"auto",M("mmWall").style.background=t.wallpaper,M("mmFloor").style.background=t.floor,f0(e)}function Lr(e){const n=e.rooms[e.currentRoom].items.filter(o=>ge[o.kind]).map(o=>{const i=ge[o.kind];return`<i style="left:${o.x/pe*100}%;top:${(ro(i,o.y)-je(i)*Ye(o)/2)/Re*100}%"></i>`}).join(""),s=e.characters.filter(o=>o.room===e.currentRoom).map(o=>{const i=St(e.currentRoom,Pt(o),o);return`<b style="left:${i.x/pe*100}%;top:${(i.y-90)/Re*100}%;background:${o.shirt}"></b>`}).join("");M("mmDots").innerHTML=n+s}function i0(e){const t=Ku();td=t?"c":"f",document.body.classList.toggle("tabs-compact",t),M("tabs").innerHTML=tf.map(n=>{const s=t?GS[n.id]??n.name:n.name;return`<button class="tab ${e.currentRoom===n.id||e.currentRoom==="backyard"&&n.id==="living"?"on":""}" data-room="${n.id}" style="--c:${n.color}" aria-label="${n.name}">${t?YS:""}${s}</button>`}).join(""),requestAnimationFrame(()=>{nC(),ff()})}function ff(){const e=document.getElementById("tabs");if(!e)return;const t=e.scrollWidth-e.clientWidth;e.classList.toggle("fadeL",t>2&&e.scrollLeft>2),e.classList.toggle("fadeR",t>2&&e.scrollLeft<t-2)}function nC(){const e=document.getElementById("tabs"),t=e?.querySelector(".tab.on");if(!e||!t||e.scrollWidth<=e.clientWidth+2)return;const n=t.offsetLeft-e.offsetLeft,s=n+t.offsetWidth;n<e.scrollLeft+24?e.scrollLeft=Math.max(0,n-24):s>e.scrollLeft+e.clientWidth-24&&(e.scrollLeft=s-e.clientWidth+24)}function lo(e,t,n,s,o){e.style.left=(t-s/2)/pe*100+"%",e.style.top=(n-o)/Re*100+"%",e.style.width=s/pe*100+"%",e.style.height=o/Re*100+"%"}function pf(e,t){let n=e.w*t,s=je(e)*t;if((e.kind==="kennel"||e.kind==="cat-tower")&&document.body.classList.contains("phone")){const o=Math.max(.2,wt()||1),i=44*pe/(Math.max(1,te)*o),a=44/o;n<i&&(n=i),s<a&&(s=a)}return{w:n,h:s}}function sC(e,t,n){const s=Cu(t),o=t+":"+n+":"+(s?1:0);e.dataset.sig!==o&&(e.dataset.sig=o,e.innerHTML=`<div class="inner">${vr(n,s)}</div>`,s||oC(t))}const tc=new Set;let nc=0;const sc=new Set;function oC(e){!v||Pe===J||tc.has(e)||KE(e)||(tc.add(e),sc.add(e),nc||(nc=window.setTimeout(()=>{nc=0;const t=[...sc];sc.clear(),v&&be&&v.getArt(be,t),t.forEach(n=>setTimeout(()=>tc.delete(n),8e3))},60)))}function a0(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n?.items??[])s.art&&t.add(s.art);return t}const iC=[...["Heart","Star","Flower","Kitty","Rainbow","Sparkle"].map((e,t)=>({name:e,svg:ko[t]})),...["dog","bunny","fish","flowers","balloon","cake"].filter(e=>ge[e]).map(e=>({name:ge[e].name,svg:`<svg viewBox="${ge[e].vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${ge[e].svg}</svg>`}))];function r0(){if(B!=="house"){N("The Art Studio is at home. Pop inside to paint!");return}if(!dt()){N("Paint at home, or in a friend's open house!");return}oS({stamps:iC,sfx:R,onSave:(e,t)=>cC(e,t)})}const Mh=new Set;function aC(e){const t=M("artGrip"),n=Ve?e.rooms[e.currentRoom].items.find(l=>l.id===Ve):void 0,s=n&&j.querySelector(`.item[data-id="${n.id}"]`);if(Be.isPlay()||!n||n.kind!=="picture"||!n.art||!s||!dt()){t.classList.add("hidden");return}const o=s.getBoundingClientRect(),i=Math.min(o.width,o.height)>=120?14:0,a=Ue(o.right-i,o.bottom-i),r=F.getBoundingClientRect().width/Math.max(1,te)||1;t.style.left=a.x/pe*100+"%",t.style.top=a.y/Re*100+"%",t.style.width=t.style.height=64/r+"px",(t.classList.contains("hidden")||t.dataset.for!==n.id)&&(t.dataset.for=n.id,Mh.has(n.id)||(Mh.add(n.id),t.classList.remove("pulse"),t.offsetWidth,t.classList.add("pulse"))),t.classList.remove("hidden")}M("artGrip").addEventListener("pointerdown",e=>{if(e.preventDefault(),e.stopPropagation(),!dt()||!Ve)return;const t=C.get().currentRoom,n=Ve,s=C.get().rooms[t].items.find(k=>k.id===n),o=j.querySelector(`.item[data-id="${n}"]`);if(!s||!o)return;const i=o.getBoundingClientRect(),a=i.left+i.width/2,r=i.top+i.height/2,l=i.width/2,c=i.height/2,d=Math.max(1,Math.hypot(l,c)),f=l/d,p=c/d,g=(k,y)=>(k-a)*f+(y-r)*p,b=Math.max(20,g(e.clientX,e.clientY)),m=On(s.size);M("artGrip").classList.remove("pulse"),M("artGrip").classList.add("active"),ae.classList.add("hidden"),Un(e,{edgeScroll:!1,onMove(k){const y=m*Math.max(0,g(k.clientX,k.clientY))/b;let u=Bn[0];for(const _ of Bn)Math.abs(_-y)<Math.abs(u-y)&&(u=_);const w=C.get().rooms[t].items.find(_=>_.id===n);w&&On(w.size)!==u&&(C.dispatch({type:"item/size",room:t,id:n,size:u}),R.click())},onUp(){M("artGrip").classList.remove("active"),c0(t,n),Lt(C.get())}})});M("artFab").addEventListener("click",()=>{R.click(),r0()});function rC(){M("artFab").classList.toggle("hidden",B!=="house"||!dt())}const ja=new Map;function l0(e){const t=F.getBoundingClientRect(),n=M("nudgeL").getBoundingClientRect(),s=M("nudgeR").getBoundingClientRect(),o=(c,d)=>c.width>0&&!d.classList.contains("off")&&getComputedStyle(d).visibility!=="hidden"&&getComputedStyle(d).display!=="none"&&+getComputedStyle(d).opacity>.05,i=o(n,M("nudgeL"))?n.right+10:t.left+6,a=o(s,M("nudgeR"))?s.left-10:t.right-6;let r=Ue(i,0).x+e,l=Ue(a,0).x-e;if(r=Math.max(e,r),l=Math.min(pe-e,l),l<r){const c=(r+l)/2;r=l=Math.max(e,Math.min(pe-e,c))}return{lo:r,hi:l}}function lC(){const e=ge.picture,t=e.w/2,n=je(e),s=Math.min(ia,200+n/2),o=s-n;let{lo:i,hi:a}=l0(t);const r=[];for(const f of document.querySelectorAll("#layer > :not(.char), #scenery > *")){const p=f.getBoundingClientRect();if(!p.width)continue;const g=Ue(p.left,p.top),b=Ue(p.right,p.bottom),m=f.classList.contains("yardDoor")?50:1;r.push({l:g.x,r:b.x,t:g.y,b:b.y,k:m})}const l=ce+te/2;i=Math.min(Math.max(i,l-te*.3),a),a=Math.max(Math.min(a,l+te*.3),i);let c=Math.max(i,Math.min(a,l)),d=1/0;for(let f=i;f<=a+.1;f+=Math.max(4,(a-i)/60)){let p=0;for(const b of r)p+=b.k*Math.max(0,Math.min(f+t+12,b.r)-Math.max(f-t-12,b.l))*Math.max(0,Math.min(s+12,b.b)-Math.max(o-12,b.t));const g=p*10+Math.abs(f-l);g<d&&(d=g,c=f)}return c}function c0(e,t){const n=C.get().rooms[e].items.find(p=>p.id===t);if(!n||n.kind!=="picture"||!n.art)return;const s=ge.picture,o=Ye(n),i=s.w*o/2,a=je(s)*o,r=F.getBoundingClientRect(),l=Ue(r.left,0).x,c=Ue(r.right,0).x;let d=n.x,f=Math.min(ia,Math.max(a+16,n.y));if(d+i>l&&d-i<c){const{lo:p,hi:g}=l0(i);d=Math.max(p,Math.min(g,d));const b=j.querySelector(".yardDoor"),m=b?.getBoundingClientRect();if(m&&m.width){const k=Ue(m.left,m.top),y=Ue(m.right,m.bottom);if(d+i>k.x-8&&d-i<y.x+8&&f>k.y&&f-a<y.y){const u=k.x-8-i,w=y.x+8+i,_=x=>x>=p-.5&&x<=g+.5,P=[u,w].filter(_).sort((x,E)=>Math.abs(x-d)-Math.abs(E-d));P.length&&(d=P[0])}}}(Math.abs(d-n.x)>.5||Math.abs(f-n.y)>.5)&&C.dispatch({type:"item/move",room:e,id:t,x:d,y:f})}function cC(e,t){const n="a"+Date.now().toString(36)+Math.random().toString(36).slice(2,8),s=C.get(),o=s.currentRoom;Eu(n,e);const i=lC();if(v&&Pe!==J&&be){ja.set(n,{houseId:be,room:o,frame:t,x:i}),v.saveArt(be,n,e);return}YE(n,e,a0(s)),d0(o,n,t,i)}function d0(e,t,n,s){const o=ge.picture,i={id:_r("picture"),kind:"picture",x:s,y:Math.min(ia,200+je(o)/2),flip:!1,z:0,scale:1,art:t,...n?{frame:n}:{}};C.dispatch({type:"item/add",room:e,item:i}),Ve=i.id,Lt(C.get());const a=j.querySelector(`.item[data-id="${i.id}"]`);Ge(a),ra(a),R.sparkle()}function Lt(e){const t=e.rooms[e.currentRoom],n=new Set;for(const s of t.items){const o=ge[s.kind];if(!o)continue;n.add(s.id);let i=j.querySelector(`.item[data-id="${s.id}"]`);i||(i=document.createElement("div"),i.className="item",i.dataset.id=s.id,i.innerHTML=`<div class="inner">${mn(o,!0)}</div>`,j.appendChild(i),i.addEventListener("pointerdown",l=>_C(i,l))),i.dataset.kind=s.kind,s.art&&sC(i,s.art,s.frame??0),i.classList.toggle("is-light",IE(s.kind,!!o.light));const a=pf(o,Ye(s));lo(i,s.x,ro(o,s.y),a.w,a.h);const r=1e3+s.z;if(i.style.zIndex=String(r),i.style.setProperty("--iz",String(r)),s.art){const l=j.querySelector(".yardDoor");l&&od(i.getBoundingClientRect(),l.getBoundingClientRect())&&(i.style.zIndex=String(Math.max(r,(parseInt(l.style.zIndex||"2",10)||2)+1)))}i.classList.toggle("flipped",s.flip),i.classList.toggle("sel",Ve===s.id)}j.querySelectorAll(".item").forEach(s=>{n.has(s.dataset.id)||s.remove()}),f0(e),hC(),hf(),u0(e),Lr(e),rC(),ls()}function hf(){const e=C.get(),t=eC(),n=new Set;t.forEach((s,o)=>{const i=e.rooms[e.currentRoom]?.items.find(p=>p.id===o),a=i&&ge[i.kind],r=i&&JS(i.kind);if(!i||!a||!r)return;n.add(o);let l=j.querySelector(`.seatFront[data-id="${o}"]`);l||(l=document.createElement("div"),l.className="seatFront",l.dataset.id=o,j.appendChild(l));const c=j.querySelector(`.item[data-id="${o}"] .inner`),d=l.querySelector(".inner");(!d||c&&d.innerHTML!==c.innerHTML)&&(l.innerHTML=`<div class="inner">${c?c.innerHTML:mn(a,!0)}</div>`),l.className="seatFront "+r+(i.flip?" flipped":"");const f=pf(a,Ye(i));lo(l,i.x,ro(a,i.y),f.w,f.h),l.style.zIndex=String(1e3+i.z+3)}),j.querySelectorAll(".seatFront").forEach(s=>{n.has(s.dataset.id||"")||s.remove()})}let no=!1,Lh=0;function gf(e){performance.now()-Lh<80||(Lh=performance.now(),NP(e))}function dC(e,t){const n=F.querySelector(".yardDoor");if(!n)return null;const s=o=>{if(!o)return!1;const i=o.getBoundingClientRect();return i.width>2&&i.height>2&&e>=i.left&&e<=i.right&&t>=i.top&&t<=i.bottom};return s(n.querySelector(".yardHintLabel"))||s(n.querySelector(".doorArt"))||s(n)?n:null}function fC(e){e.addEventListener("pointerdown",t=>{if(t.button!==0)return;t.stopPropagation();const n=e.dataset.yardGo==="backyard"?"backyard":"living",s=t.clientX,o=t.clientY,i=t.pointerId;no=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),no=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),gf(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)})}F.addEventListener("pointerdown",e=>{if(e.button!==0)return;const t=dC(e.clientX,e.clientY);if(!t||e.target instanceof Node&&t.contains(e.target)||e.target instanceof Element&&e.target.closest("#artGrip, #toolbar")||e.target instanceof Element&&e.target.closest('.item[data-kind="picture"][data-sig]'))return;e.stopPropagation(),e.preventDefault();const n=t.dataset.yardGo==="backyard"?"backyard":"living",s=e.clientX,o=e.clientY,i=e.pointerId;no=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),no=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),gf(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)},!0);function od(e,t){return e.width>2&&t.width>2&&e.left<t.right-1&&e.right>t.left+1&&e.top<t.bottom-1&&e.bottom>t.top+1}function Eh(e){const t=e.getBoundingClientRect();let n=0;j.querySelectorAll(".item").forEach(s=>{if(s.classList.contains("is-light"))return;const o=ge[s.dataset.kind||""];if(!o||o.wall||!od(s.getBoundingClientRect(),t))return;const i=parseInt(s.style.zIndex||"0",10)||0;i>n&&(n=i)}),e.style.zIndex=n?String(n+2):"2",j.querySelectorAll(".item[data-sig]").forEach(s=>{od(s.getBoundingClientRect(),t)&&(s.style.zIndex=String(Math.max(parseInt(s.style.zIndex||"0",10)||0,parseInt(e.style.zIndex,10)+1)))})}function f0(e){const t=e.rooms[e.currentRoom];Q9(M("scenery"),e.currentRoom,t.items),M("scenery").querySelectorAll(".yardDoor").forEach(o=>o.remove());const n=e.currentRoom==="living"?"backyard":e.currentRoom==="backyard"?"living":"",s=j.querySelector(".yardDoor");if(!n)j.querySelectorAll(".yardDoor").forEach(o=>o.remove());else if(!s||s.dataset.yardGo!==n){j.querySelectorAll(".yardDoor").forEach(i=>i.remove()),j.insertAdjacentHTML("beforeend",$M(n==="backyard"?"living":"yard"));const o=j.querySelector(".yardDoor");o&&fC(o)}F.classList.toggle("room-yard",e.currentRoom==="backyard"),Ir(),no||Xn()}const Ot=new Map;function pC(e){const t=aa(e),n=ks*t,s=yn*t,o=ll(e,il(Pt(e)?.pose)),i=e.look2?.85:1;return["left","right"].map(a=>{const r=e.held[a],l=r&&ge[r.kind];if(!r||!l)return"";const c=Ye(r),d=Math.min(.7,120*t/Math.max(l.w,je(l))/c)*i,f=l.w*c*d,p=je(l)*c*d,g=o[a].x/100*n,b=o[a].y/160*s;return`<div class="held ${r.flip?"flipped":""}" data-hand="${a}" style="left:${(g-f/2)/n*100}%;top:${(b-p*.62)/s*100}%;width:${f/n*100}%;height:${p/s*100}%"><div class="inner">${mn(l)}</div></div>`}).join("")}function hC(){let e=j.querySelector("#skyPuddles");e||(e=document.createElement("div"),e.id="skyPuddles",e.className="skyPuddles"),j.appendChild(e);const t=[...j.querySelectorAll(".item.is-light")];for(;e.children.length>t.length;)e.lastElementChild.remove();for(;e.children.length<t.length;)e.appendChild(document.createElement("i"));t.forEach((n,s)=>{const o=e.children[s],i=parseFloat(n.style.left),a=parseFloat(n.style.top),r=parseFloat(n.style.width),l=parseFloat(n.style.height),c=n.dataset.kind==="window"||n.dataset.kind==="tv";o.style.left=i-.6*r+"%",o.style.top=a-(c?.38:.5)*l+"%",o.style.width=2.2*r+"%",o.style.height=2*l+"%",o.style.zIndex=String(parseInt(n.style.zIndex||"1000",10))})}let hl=()=>{};function Si(e){const t=e.baby;return t&&t.spot==="arms"&&t.holder?t.holder:""}const Gn=new Map;function p0(e){for(const[t,n]of Gn)t.indexOf(e+":")===0&&(n.remove(),Gn.delete(t))}function h0(e,t){const n=e+":"+t,s=Gn.get(n);s&&(s.remove(),Gn.delete(n))}function g0(e,t,n,s,o){const i=e+":"+t;for(const[r,l]of Gn)r.indexOf(e+":")===0&&r!==i&&(l.remove(),Gn.delete(r));let a=Gn.get(i);if((!a||!a.isConnected)&&(a=document.createElement("div"),a.className="cradle-front",a.dataset.for=t,a.innerHTML='<div class="inner"></div>',j.appendChild(a),Gn.set(i,a)),a.dataset.arm!==s){const r=a.querySelector(".inner");r&&(r.innerHTML=s),a.dataset.arm=s}a.style.left=n.style.left,a.style.top=n.style.top,a.style.width=n.style.width,a.style.height=n.style.height,a.style.zIndex=String(5e3+Math.round(o)+4),a.classList.toggle("flipped",n.classList.contains("flipped")),a.classList.toggle("pose-sit",n.classList.contains("pose-sit")),a.classList.toggle("pose-lie",n.classList.contains("pose-lie")),a.classList.toggle("pose-lie-r",n.classList.contains("pose-lie-r"))}function en(e){const t=e.characters.filter(n=>n.room===e.currentRoom);for(const[n,s]of Ot)t.some(o=>o.id===n)||(s.remove(),Ot.delete(n));for(const n of t){let s=Ot.get(n.id);s||(s=document.createElement("div"),s.className="char",s.dataset.cid=n.id,s.innerHTML='<div class="inner"></div><div class="hands"></div>',j.appendChild(s),Ot.set(n.id,s),MC(s));const o=Pt(n),i=o?.pose??null,a=Si(e)===n.id,r=n1(n)+(i||"")+(a?"h":"");s.dataset.look!==r&&(s.querySelector(".inner").innerHTML=vt(n,i,a),s.dataset.look=r),s.classList.toggle("holding",a);const l=JSON.stringify([n.held.left?.id,n.held.left?.flip,n.held.right?.id,n.held.right?.flip,n.size,i]);s.dataset.held!==l&&(s.querySelector(".hands").innerHTML=pC(n),s.dataset.held=l);const c=aa(n),d=St(e.currentRoom,o,n);if(lo(s,d.x,d.y,ks*c,yn*c),s.style.zIndex=String(o?1e3+(e.rooms[e.currentRoom].items.find(p=>p.id===o.item)?.z??0)+1+o.n:5e3+Math.round(n.y)),s.classList.toggle("flipped",n.flip),s.classList.toggle("pose-sit",i==="sit"),s.classList.toggle("pose-lie",i==="lie"),s.classList.toggle("pose-lie-r",i==="lie"&&!!e.rooms[e.currentRoom].items.find(p=>p.id===o?.item)?.flip),s.classList.toggle("active",n.id===Ie),na(s,n,n.id===Ie),s.classList.toggle("pose-swing",Ht?.id===n.id),a){const p=Jg(n,i);p?g0("doll",n.id,s,p,d.y):h0("doll",n.id)}const f=ll(n);s.style.setProperty("--hx-l",f.left.x+"%"),s.style.setProperty("--hx-r",f.right.x+"%")}(Si(e)===""||!t.some(n=>n.id===Si(e)))&&p0("doll"),ls(),Lr(e),hl()}function yo(){const e=F.getBoundingClientRect(),t=e.width/Math.max(1,te),n=6,o=document.body.classList.contains("phone")?1/Math.max(.2,t):1,i=ae.offsetWidth,a=ae.offsetHeight,r=parseFloat(ae.style.left)/100*pe,l=parseFloat(ae.style.top)/100*Re,c=ae.classList.contains("below"),d=r,f=c?l+a/2:l-a/2,p=o*i/2,g=o*a/2,b=_=>e.left+(n+_-ce)*t,m=_=>e.top+(n+_)*t,k=b(d-p),y=b(d+p),u=m(f-g),w=m(f+g);return{left:k,right:y,top:u,bottom:w,width:y-k,height:w-u}}function gC(){const e=F.getBoundingClientRect(),t=4;let n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t,o=Math.max(e.top,0)+t,i=Math.min(e.bottom,window.innerHeight)-t;for(const a of["nudgeL","nudgeR"]){const r=M(a);if(!r||r.classList.contains("off")||r.offsetParent===null)continue;const l=r.getBoundingClientRect();l.width<2||l.height<2||(a==="nudgeL"?n=Math.max(n,l.right+4):s=Math.min(s,l.left-4))}return s-n<48&&(n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t),{left:n,right:s,top:o,bottom:i}}function Ps(e,t){ae.style.left=e/pe*100+"%",ae.style.top=t/Re*100+"%"}function u0(e){aC(e);const t=Ve&&e.rooms[e.currentRoom].items.find(m=>m.id===Ve);if(Be.isPlay()||!t||!ge[t.kind]){ae.classList.add("hidden"),ae.classList.remove("below"),ae.style.maxWidth="",M("artFab").classList.remove("tucked");return}M("artFab").classList.add("tucked");const n=ge[t.kind],s=ro(n,t.y),o=s-je(n)*Ye(t),i=t.kind==="picture"&&t.art?12+64/(F.getBoundingClientRect().width/Math.max(1,te)||1):12;ae.classList.remove("hidden"),ae.style.maxWidth="",ae.classList.remove("below"),Ps(t.x,o-i);const a=gC();yo().top<a.top&&(ae.classList.add("below"),Ps(t.x,s+i));let r=yo();const l=a.right-a.left;if(r.width>l-2&&l>60){const m=ae.offsetWidth*((l-8)/Math.max(1,r.width));ae.style.maxWidth=Math.max(76,m)+"px",!ae.classList.contains("below")&&yo().top<a.top&&(ae.classList.add("below"),Ps(t.x,s+i)),r=yo()}let c=0,d=0;if(r.left<a.left&&(c=a.left-r.left),r.right+c>a.right&&(c=a.right-r.right),r.width>a.right-a.left&&(c=(a.left+a.right)/2-(r.left+r.right)/2),r.top<a.top&&(d=a.top-r.top),r.bottom+d>a.bottom&&(d=a.bottom-r.bottom),Math.abs(c)>=.5||Math.abs(d)>=.5){const m=F.getBoundingClientRect().width/Math.max(1,te)||1,k=parseFloat(ae.style.left)/100*pe+c/m,y=parseFloat(ae.style.top)/100*Re+d/m;Ps(k,y)}if(t.kind==="picture"&&t.art){const m=j.querySelector(`.item[data-id="${t.id}"]`),k=M("artGrip"),y=(P,x)=>Math.max(0,Math.min(P.right,x.right)-Math.max(P.left,x.left))*Math.max(0,Math.min(P.bottom,x.bottom)-Math.max(P.top,x.top)),u=()=>k.classList.contains("hidden")?0:y(k.getBoundingClientRect(),ae.getBoundingClientRect()),w=()=>m?y(m.getBoundingClientRect(),ae.getBoundingClientRect())+8*u():0,_=w();if(_>0){const P={l:ae.style.left,t:ae.style.top,below:ae.classList.contains("below")};ae.classList.toggle("below",!P.below),Ps(t.x,P.below?o-i:s+i);const x=yo(),E=F.getBoundingClientRect().width/Math.max(1,te)||1;let W=0,V=0;x.left<a.left&&(W=a.left-x.left),x.right+W>a.right&&(W=a.right-x.right),x.top<a.top&&(V=a.top-x.top),x.bottom+V>a.bottom&&(V=a.bottom-x.bottom),(W||V)&&Ps(parseFloat(ae.style.left)/100*pe+W/E,parseFloat(ae.style.top)/100*Re+V/E),w()>=_&&(ae.style.left=P.l,ae.style.top=P.t,ae.classList.toggle("below",P.below))}if(u()>0){const P=k.getBoundingClientRect(),x=yo(),E=F.getBoundingClientRect().width/Math.max(1,te)||1,W=P.left-6-x.right,V=P.right+6-x.left,ne=x.left+W>=a.left,Y=x.right+V<=a.right,K=ne&&(!Y||-W<=V)?W:Y?V:0;K&&Ps(parseFloat(ae.style.left)/100*pe+K/E,parseFloat(ae.style.top)/100*Re)}}const f=On(t.size),p=Bn.indexOf(f),g=ae.querySelector('[data-a="smaller"]'),b=ae.querySelector('[data-a="bigger"]');g&&(g.disabled=p<=0),b&&(b.disabled=p>=Bn.length-1)}function m0(e){const t=M("soundIco");t&&(t.innerHTML=e.soundOn?Qt.soundOn:Qt.soundOff),M("btnSound").setAttribute("aria-label",e.soundOn?"Sound on":"Sound off"),rb(e.soundOn)}function so(){const e=C.get();j.innerHTML="",Ot.clear(),i0(e),o0(e),Lt(e),en(e),m0(e);const t=e.characters.find(o=>o.room===e.currentRoom),n=v&&_e(),s=n&&n.where==="house"?n.x:t?.x;dl(),Je(xr[e.currentRoom]??af(s!==void 0?s-te/2:Uo)),Ct(),bn(),document.body.classList.contains("phone")&&B==="house"&&requestAnimationFrame(()=>Gu())}const Sh=200,uC=2,Er=[];let id=0,Ga=!1,oc=0;const y0=new Map;function ad(e){const t=document.getElementById("shelf");if(!t)return!1;const n=t.getBoundingClientRect();if(n.width<2||n.height<2)return!1;const s=e.getBoundingClientRect();return s.right>n.left-Sh&&s.left<n.right+Sh&&s.bottom>n.top-8&&s.top<n.bottom+8}const mC=3,Sr=new Map;function rd(e,t){const n=(Sr.get(t)||0)+1;if(Sr.set(t,n),delete e.dataset.shelfq,n>=mC){delete e.dataset.artq;return}setTimeout(uf,300*n)}function _o(){id--,!Ga&&b0()}function Ch(e,t){const n=document.createElement("div");n.innerHTML=mn(t);const s=n.querySelector("img.artimg");if(!s){delete e.dataset.artq,_o();return}const o=Sr.get(t.kind)||0;if(o>0){const l=s.getAttribute("src")||"";s.setAttribute("src",l+(l.indexOf("?")>=0?"&":"?")+"retry="+o)}let i=!1;const a=l=>{if(!i){if(i=!0,l){const c=Array.prototype.slice.call(n.childNodes);if(y0.set(t.kind,c),Sr.delete(t.kind),e.isConnected&&e.dataset.artq==="1"){delete e.dataset.artq,e.innerHTML="";for(let d=0;d<c.length;d++)e.appendChild(c[d])}else{const d=document.querySelector(`#shelf button.thing[data-artq="1"][data-kind="${CSS.escape(t.kind)}"]`);if(d){delete d.dataset.artq,d.innerHTML="";for(let f=0;f<c.length;f++)d.appendChild(c[f])}}}else e.isConnected&&e.dataset.artq==="1"&&rd(e,t.kind);_o()}},r=()=>{typeof s.decode=="function"?s.decode().then(()=>a(!0),()=>a(!0)):a(!0)};s.onload=r,s.onerror=()=>a(!1),s.complete&&s.naturalWidth>0&&r()}function b0(){if(!Ga){for(Ga=!0;id<uC&&Er.length;){const e=Er.shift();if(!e||!e.isConnected||e.dataset.artq!=="1")continue;if(!ad(e)){delete e.dataset.shelfq;continue}const t=e.dataset.kind||"",n=ge[t];if(!n){delete e.dataset.artq;continue}if(id++,Gs(t)){Ch(e,n);continue}h(()=>Promise.resolve().then(()=>Hd),void 0).then(s=>s.loadArtKinds([t])).then(()=>{if(!e.isConnected||e.dataset.artq!=="1"){_o();return}if(!Gs(t)){rd(e,t),_o();return}if(!ad(e)){delete e.dataset.shelfq,_o();return}Ch(e,n)},()=>{e.isConnected&&e.dataset.artq==="1"&&rd(e,t),_o()})}Ga=!1}}function yC(){const e=document.getElementById("shelf");if(!e||!Bo())return;const t=e.querySelectorAll('button.thing[data-artq="1"]');for(let n=0;n<t.length;n++){const s=t[n];s.dataset.shelfq!=="1"&&ad(s)&&(s.dataset.shelfq="1",Er.push(s))}b0()}function uf(){oc||(oc=requestAnimationFrame(()=>{oc=0,yC()}))}function bC(){const e=document.getElementById("shelf");!e||e.dataset.artscroll==="1"||(e.dataset.artscroll="1",e.addEventListener("scroll",uf,{passive:!0}))}function k0(){const e=document.getElementById("shelf");if(!e||!Bo())return;const t=e.querySelectorAll("button.thing[data-kind]");for(let n=0;n<t.length;n++){const s=t[n],o=s.dataset.kind||"";s.querySelector("img.artimg")||!(Of(o)||Gs(o))||(s.dataset.artq="1")}uf()}function w0(){if(At==="__people"){Ut();return}k0()}function kC(e){const t=dg();if(!v)return;const n=_e();if(!n||n.where!=="house"||!n.seat)return;let s="";if(e.type==="item/flip"||e.type==="item/delete")s=e.id;else if(e.type==="item/move"&&e.stand)s=e.id;else if(e.type==="char/hold")s=e.itemId;else return;if(!s||n.seat.id!==s||e.room!==n.room)return;const o=t&&t.id===s?t:null,i=o?Bi(o.kind)*(o.scale||1):Bi("bed"),a=Md(o?o.x:n.x,i,n.x);gn.delete("p:"+v.pid);const{seat:r,...l}=n;et({...l,x:a.x,y:a.y})}C.subscribe((e,t)=>{switch(kC(t),t.type){case"room/switch":{const n=F.classList.contains("room-yard");v&&Pe!==J&&CC(t.room),so(),Ut(),(t.room==="backyard"||n||Be.isPlay()&&Math.min(window.innerWidth,window.innerHeight)<500)&&ws(),rm(t.room);break}case"item/add":Lt(e),NS(),zP();break;case"game/reset":so();break;case"room/wallpaper":case"room/floor":case"room/pattern":case"room/wallTile":case"room/floorTile":o0(e);break;case"char/update":case"char/move":t.type==="char/move"&&Ht&&!ui&&t.id===Ht.id&&(Ht=null),en(e),hf(),Ir(),B==="ranch"?fs():B==="park"&&oo();break;case"char/add":case"char/delete":case"char/hold":case"char/release":Lt(e),en(e),Ct(),At==="__people"&&Ut();break;case"item/move":case"item/flip":case"item/delete":case"item/size":Lt(e),en(e),Ct();break;case"baby/meet":case"baby/name":case"baby/care":case"baby/hold":case"baby/place":case"baby/ease":en(e),Ct();break;case"settings/sound":m0(e);break;default:Lt(e)}});function Ge(e){if(!e)return;const t=e.querySelector(":scope > .inner")??e;t.classList.remove("bounce"),t.offsetWidth,t.classList.add("bounce")}function mf(e,t,n=7){const s=M("fx"),o=["#ffd166","#ff8fab","#8ecae6","#80ed99","#c9a0dc"];for(let i=0;i<n;i++){const a=document.createElement("div");a.className="spark";const r=Math.PI*2*i/n+Math.random()*.5,l=40+Math.random()*30;a.style.left=e+"px",a.style.top=t+"px",a.style.background=o[i%o.length],a.style.setProperty("--dx",Math.cos(r)*l+"px"),a.style.setProperty("--dy",Math.sin(r)*l+"px"),s.appendChild(a),setTimeout(()=>a.remove(),650)}}const ra=e=>{const t=e?.getBoundingClientRect();t&&mf(t.left+t.width/2,t.top+t.height/2)};function yf(e,t){mf(e,t,10),R.pop()}function Cr(e){Ot.forEach((t,n)=>{t.classList.toggle("hold-target",!!e&&e.c.id===n),t.dataset.hand=e&&e.c.id===n?e.hand:""})}function v0(e,t){C.dispatch({type:"char/hold",id:e.c.id,hand:e.hand,room:e.c.room,itemId:t}),Ve=null,Lt(C.get());const n=Ot.get(e.c.id);Ge(n),ra(n?.querySelector(`.held[data-hand="${e.hand}"]`)),R.sparkle()}const un=new Map;let Ft=!1,Pr=0;const bf=()=>[...un.values()].reduce((e,t)=>e+t,0)/un.size;F.addEventListener("pointerdown",e=>{e.pointerType==="touch"&&(un.set(e.pointerId,e.clientX),un.size>=2&&(Ft=!0,Pr=bf(),dl(),ae.classList.add("hidden")))},!0);window.addEventListener("pointermove",e=>{if(un.has(e.pointerId)&&(un.set(e.pointerId,e.clientX),Ft&&un.size>=2)){const t=bf();Je(ce-(t-Pr)/wt()),Pr=t}},!0);const _0=e=>{un.delete(e.pointerId),un.size<2&&Ft&&(un.size===0?Ft=!1:Pr=bf())};window.addEventListener("pointerup",_0,!0);window.addEventListener("pointercancel",_0,!0);const bo=80;function wC(e,t){const n=F.getBoundingClientRect();return t<n.top-40||t>n.bottom+10?0:e<n.left+bo?-Math.min(1,(n.left+bo-e)/bo)*16:e>n.right-bo?Math.min(1,(e-(n.right-bo))/bo)*16:0}function Un(e,t){let n=e,s=0;const o=()=>{const r=Ft?0:wC(n.clientX,n.clientY);if(r){const l=ce;Je(ce+r),ce!==l&&t.onMove(n)}s=requestAnimationFrame(o)};t.edgeScroll!==!1&&(s=requestAnimationFrame(o));const i=r=>{r.pointerId===e.pointerId&&(r.preventDefault(),n=r,Ft||t.onMove(r))},a=r=>{r.pointerId===e.pointerId&&(cancelAnimationFrame(s),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",a),t.onUp(r))};window.addEventListener("pointermove",i,{passive:!1}),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a)}function vC(e){return new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,pointerId:e.pointerId,pointerType:e.pointerType,button:e.button,buttons:e.buttons,isPrimary:e.isPrimary})}function _C(e,t){const n=t.target,s=n&&n.closest?n.closest("img.artimg"):null,o=C.get(),i=!!o.rooms[o.currentRoom]?.items.find(a=>a.id===e.dataset.id)?.art;if(s&&!i&&!Nd(s,t.clientX,t.clientY)){const a=IM(t.clientX,t.clientY),r=a?.closest(".item"),l=a?.closest(".char");r&&r!==e?(t.stopPropagation(),ld(r,t)):l&&(t.stopPropagation(),l.dispatchEvent(vC(t)));return}ld(e,t)}function $C(e,t){if(t.preventDefault(),t.stopPropagation(),Ft)return;const n=e.dataset.id,s=t.clientX,o=t.clientY;Un(t,{edgeScroll:!1,onMove(){},onUp(i){Math.hypot(i.clientX-s,i.clientY-o)>6||lP(e,n)}})}function ld(e,t,n=!1){if(t.preventDefault(),t.stopPropagation(),Ft)return;if(Be.isPlay()){$C(e,t);return}if(!dt()){Wn(e);return}const s=C.get(),o=s.currentRoom,i=e.dataset.id,a=s.rooms[o].items.find(p=>p.id===i);if(!a)return;const r=ge[a.kind],l=Ue(t.clientX,t.clientY),c={x:a.x-l.x,y:a.y-l.y};let d=n,f=null;Ve=i,C.dispatch({type:"item/front",room:o,id:i}),e.classList.add("lifted"),R.pick(),Un(t,{onMove(p){const g=Ue(p.clientX,p.clientY);Math.hypot(g.x-l.x,g.y-l.y)>6&&(d=!0),d&&(ae.classList.add("hidden"),Na.classList.add("show")),Na.classList.toggle("hot",xh(p.clientX,p.clientY));const b=r.w*Ye(a)/2;C.dispatch({type:"item/move",room:o,id:i,x:Math.max(b*.6,Math.min(pe-b*.6,g.x+c.x)),y:Wu(r,g.y+c.y),...d?{stand:!0}:{}}),d&&ae.classList.add("hidden"),f=d&&r.holdable?t0(g):null,Cr(f)},onUp(p){if(e.classList.remove("lifted"),Na.classList.remove("show","hot"),Cr(null),d&&xh(p.clientX,p.clientY)){Ve=null,C.dispatch({type:"item/delete",room:o,id:i}),yf(p.clientX,p.clientY);return}if(d&&f){v0(f,i);return}d?(c0(o,i),R.drop(),Ge(e)):(R.click(),Q0(i),x9(e)),Lt(C.get())}})}function xC(e,t,n){if(n.preventDefault(),n.stopPropagation(),Ft||Be.isPlay())return;const s=e.dataset.cid,o=t.dataset.hand,i=C.get().characters.find(d=>d.id===s),a=i?.held[o];if(!i||!a)return;const r=t.getBoundingClientRect(),l=Ue(r.left+r.width/2,r.bottom);C.dispatch({type:"char/release",id:s,hand:o,x:l.x,y:l.y});const c=j.querySelector(`.item[data-id="${a.id}"]`);c&&ld(c,n,!0)}function MC(e){e.addEventListener("pointerdown",t=>{const n=t.target.closest(".held"),s=n?.querySelector("img.artimg"),o=!!s&&!Nd(s,t.clientX,t.clientY);if(n&&!o){if(Be.isPlay()){t.preventDefault(),t.stopPropagation();return}if(!dt()){t.stopPropagation(),Wn(e);return}return xC(e,n,t)}if(t.preventDefault(),t.stopPropagation(),Ft||Be.isPlay()&&!df())return;if(!dt()){Wn(e);return}Ve=null,Lt(C.get());const i=e.dataset.cid;Ie=i;const a=C.get(),r=a.characters.find(g=>g.id===i);if(!r)return;const l=Ue(t.clientX,t.clientY),c=St(a.currentRoom,Pt(r),r),d={x:c.x-l.x,y:c.y-l.y};let f=c.x,p=!1;e.classList.add("lifted"),R.pick(),en(C.get()),qi=!0,Un(t,{onMove(g){const b=Ue(g.clientX,g.clientY),m=b.x+d.x;if(Math.hypot(b.x-l.x,b.y-l.y)>6&&(p=!0),!p)return;const k=C.get().characters.find(u=>u.id===i);if(!k)return;if(Math.abs(m-f)>3){const u=m<f;u!==k.flip&&C.dispatch({type:"char/update",id:i,patch:{flip:u}}),f=m}const y=Math.max(Js+40,b.y+d.y);gi(i,a.currentRoom,m,y,null),Be.isPlay()&&(Qi=Mr(g.clientX,g.clientY)?.id??null),document.querySelectorAll(".tab").forEach(u=>u.classList.remove("drop")),document.elementFromPoint(g.clientX,g.clientY)?.closest(".tab:not(.on)")?.classList.add("drop")},onUp(g){qi=!1,Qi=null,e.classList.remove("lifted"),document.querySelectorAll(".tab").forEach(w=>w.classList.remove("drop"));const b=document.elementFromPoint(g.clientX,g.clientY)?.closest("[data-room]"),m=C.get().characters.find(w=>w.id===i);if(!p||!m){R.click();return}if(b&&b.dataset.room!==a.currentRoom){const w=b.getBoundingClientRect();mf(w.left+w.width/2,w.top+w.height/2,9),R.swish(),gi(i,b.dataset.room,m.x,m.y,null);return}const k=Ue(g.clientX,g.clientY),y=k.x+d.x,u=Math.max(Js+40,k.y+d.y);if(Be.isPlay()){const w=Mr(g.clientX,g.clientY),_=Ri({mode:"play",via:"drag",releaseX:y,releaseY:u,piece:w?pl(w):null,occupied:Ni(i)});gi(i,a.currentRoom,_.x,_.y,_.seat)}else gi(i,a.currentRoom,y,u,null);R.drop(),Ge(e),requestAnimationFrame(()=>to(!0))}})})}function LC(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Be.isPlay()){n.stopPropagation();return}if(!dt()){Wn(e);return}const s=document.createElement("div");s.className="ghost",s.innerHTML=mn(t),document.body.appendChild(s);const o=Math.max(1,60/(Math.max(t.w,je(t))*wt())),i=t.w*wt()*o,a=je(t)*wt()*o;s.style.width=i+"px",s.style.height=a+"px";let r=null;const l=f=>{s.style.left=f.clientX-i/2+"px",s.style.top=f.clientY-a*.8+"px",r=t.holdable&&nd(f.clientX,f.clientY)?t0(Ue(f.clientX,f.clientY)):null,Cr(r)};l(n),R.pick(),e.classList.add("pressed");const c=n.clientX,d=n.clientY;Un(n,{onMove:l,onUp(f){s.remove(),e.classList.remove("pressed"),Cr(null);const p=C.get().currentRoom,g=Math.hypot(f.clientX-c,f.clientY-d)<8;let b,m;if(g)b=ce+380+Math.random()*240,m=t.wall?Math.min(ia,200+je(t)/2):500+Math.random()*40;else if(nd(f.clientX,f.clientY)){const u=Ue(f.clientX,f.clientY);b=u.x,m=Wu(t,u.y+je(t)*.2)}else return;const k={id:_r(t.kind.replace(/[^a-z0-9-]/gi,"")),kind:t.kind,x:b,y:m,flip:!1,z:0,scale:1};if(p!=="backyard"&&C.get().rooms[p].items.length===0){const u=V9(w=>_r(w),p);for(let w=0;w<u.length;w++)C.dispatch({type:"item/add",room:p,item:u[w]})}if(C.dispatch({type:"item/add",room:p,item:k}),!g&&r){v0(r,k.id);return}Ve=k.id,Lt(C.get());const y=j.querySelector(`.item[data-id="${k.id}"]`);Ge(y),ra(y),R.sparkle()}})})}function EC(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Be.isPlay())return;if(!dt()){Wn(e);return}const s=C.get().characters.find(p=>p.id===t);if(!s)return;const o=aa(s),i=ks*o*wt(),a=yn*o*wt(),r=document.createElement("div");r.className="ghost",r.innerHTML=vt(s),r.style.width=i+"px",r.style.height=a+"px",document.body.appendChild(r);const l=p=>{r.style.left=p.clientX-i/2+"px",r.style.top=p.clientY-a*.85+"px"},c=n.clientX,d=n.clientY;let f=!1;r.style.visibility="hidden",Un(n,{onMove(p){Math.hypot(p.clientX-c,p.clientY-d)>8&&(f=!0,r.style.visibility=""),l(p)},onUp(p){if(r.remove(),!f){R.click(),Ie=t,Oo("dress");return}if(!nd(p.clientX,p.clientY))return;const g=Ue(p.clientX,p.clientY),b=C.get().currentRoom;C.dispatch({type:"char/move",id:t,room:b,x:g.x,y:Math.max(Js+40,g.y+yn*o*.15)}),Ie=t,en(C.get());const m=Ot.get(t);Ge(m),ra(m),R.sparkle()}})})}function $0(){if(!dt())return Wn(null),null;const e=C.get();if(e.characters.length>=Vo)return null;const t=_r("c"),n=Yr();C.dispatch({type:"char/add",char:ps({id:t,...Gr(n),look2:n,room:e.currentRoom,x:ce+300+Math.random()*400,y:520+Math.random()*40})}),Ie=t,en(C.get());const s=Ot.get(t);return Ge(s),ra(s),R.sparkle(),t}function SC(){return of==="all"?"all":C.get().currentRoom}function Ut(){const e=C.get().currentRoom,t=SC(),n=tf.find(l=>l.id===e)?.name??"This room",s=t==="all";M("roomFilter").innerHTML=`<button class="rf ${s?"on":""}" data-rf="${s?"room":"all"}">${s?"Just "+n:"All rooms"}</button>`;const o=Jl("secrets").length>0,i=Do.filter(l=>l.id!=="secrets"&&(l.kind==="people"||l.kind==="pack"&&e!=="backyard"||Jl(l.id).length));!(At==="secrets"&&o)&&!i.some(l=>l.id===At)&&(At=i[1]?.id??"__people"),M("cats").innerHTML=i.map(l=>`<button class="cat ${l.kind} ${l.id===At?"on":""}" data-cat="${l.id}" aria-label="${l.name}" title="${l.name}">${l.kind==="people"?AS:l.kind==="pack"?`<span class="packicon">${mn(ge[l.icon])}</span><span class="packname">${l.name}</span>`:mn(ge[l.icon])}</button>`).join("")+(o?`<button class="cat secretTab ${At==="secrets"?"on":""}" data-cat="secrets" aria-label="Secrets" title="Secrets">🎁</button>`:"");const a=M("shelf");if(Er.length=0,a.innerHTML="",!dt()){a.innerHTML='<div class="empty locked">🔒 This house is look-only right now</div>';return}if(At==="__people"){const l=C.get(),c=as();if(c){const d=document.createElement("button");d.className="thing person me",d.setAttribute("aria-label","Me"),d.innerHTML=`<div class="face">${vt(c)}</div><span class="meStar">★</span>`,d.addEventListener("click",()=>{R.click(),Ie=gt,Oo("dress")}),a.appendChild(d)}for(const d of l.characters){const f=document.createElement("button");f.className="thing person",f.setAttribute("aria-label","Character"),f.innerHTML=`<div class="face">${vt(d)}</div><span class="where" style="background:${Vu(d.room)}"></span>`,a.appendChild(f),EC(f,d.id)}if(l.characters.length<Vo){const d=document.createElement("button");d.className="thing add",d.setAttribute("aria-label","New character"),d.innerHTML=zu,d.addEventListener("click",()=>{$0()&&(Ut(),Oo("dress"))}),a.appendChild(d)}return}const r=Jl(At);r.length||(a.innerHTML='<div class="empty">Nothing here yet!</div>');for(const l of r){const c=document.createElement("button");c.className="thing",c.setAttribute("aria-label",l.name),c.dataset.kind=l.kind;const d=Bo()&&Gs(l.kind)?y0.get(l.kind):void 0;if(d)for(let f=0;f<d.length;f++)c.appendChild(d[f]);else c.innerHTML=TM(l,Of(l.kind));a.appendChild(c),LC(c,l)}a.scrollLeft=0,kf(),bC(),k0()}function kf(){const e=document.querySelector(".drawerTop"),t=document.getElementById("drawerBar");!e||!t||(t.classList.toggle("more",e.scrollWidth-e.clientWidth-e.scrollLeft>6),t.classList.toggle("back",e.scrollLeft>6))}document.querySelector(".drawerTop").addEventListener("scroll",kf,{passive:!0});window.addEventListener("resize",kf);function Ph(e,t,n){return`<div class="sw">${e.map(s=>`<button class="dot ${s===t?"on":""}" style="background:${s}" data-act="${n}" data-v="${s}"></button>`).join("")}</div>`}let Zi=null,$o=!1;function x0(e){if(e===gt){const n=as();if(!n||n.look2)return;Mn(gt,Ti(Ja(n)));return}const t=C.get().characters.find(n=>n.id===e);!t||t.look2||Mn(e,{...Ti(Ja(t)),size:t.size})}function dn(){const e=C.get(),t=M("card");if(Zi==="paint"){t.classList.remove("avCard");const n=e.rooms[e.currentRoom],s=Tc.filter(a=>a.kind==="wallpaper"),o=Tc.filter(a=>a.kind==="floor"),i=(a,r,l,c)=>`<button class="dot pat tile ${a.id===r?"on":""}" data-act="${l}" data-v="${a.id}" title="${a.name} (${Ig(a.pack)})" style="background-color:${c};background-image:${sd(a.url)};background-size:48px auto"></button>`;t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${Ph(RS,n.wallpaper,"wall")}
      <h3>Wallpaper</h3><div class="sw">${n0.map((a,r)=>`<button class="dot pat ${!n.wallTile&&r===n.pattern?"on":""}" data-act="pat" data-v="${r}" style="background-color:${n.wallpaper};background-image:${a};background-size:${r===1?"16px 16px":r===3?"20px 20px":"auto"}"></button>`).join("")}${s.map(a=>i(a,n.wallTile,"wtile",n.wallpaper)).join("")}</div>
      <h3>Floor</h3>${Ph(BS,n.floor,"floor")}
      ${o.length?`<h3>Floor style</h3><div class="sw"><button class="dot pat ${n.floorTile?"":"on"}" data-act="ftile" data-v="" style="background-color:${n.floor};background-image:${s0}"></button>${o.map(a=>i(a,n.floorTile,"ftile",n.floor)).join("")}</div>`:""}`}else if(Zi==="dress"){t.classList.add("avCard");let n=e,s=as(),o=s?ps({id:gt,...s}):null,i=Ie===gt&&o?o:n.characters.find(r=>r.id===Ie)??o??n.characters[0];i&&!i.look2&&x0(i.id),n=C.get(),s=as(),o=s?ps({id:gt,...s}):null,i=Ie===gt&&o?o:n.characters.find(r=>r.id===Ie)??o??n.characters[0];const a=`<div class="picker">${o?`<button class="pk me ${i?.id===gt?"on":""}" data-act="pickc" data-v="${gt}"><div class="face">${vt(o)}</div><span class="meStar">★</span></button>`:""}${n.characters.map(r=>`<button class="pk ${r.id===i?.id?"on":""}" data-act="pickc" data-v="${r.id}"><div class="face">${vt(r)}</div><span class="where" style="background:${Vu(r.room)}"></span></button>`).join("")}${n.characters.length<Vo?`<button class="pk add" data-act="newc">${zu}</button>`:""}</div>`;if(!i){t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${a}<div class="dress"><p class="hint">Tap + to make someone new!</p></div>`;return}Ie=i.id,t.innerHTML=TL(i,a,$o,Qt.trash)}}function Oo(e){Zi=e,$o=!1,dn(),M("sheet").classList.remove("hidden"),R.swish()}M("sheet").addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(e.target===M("sheet")||t?.dataset.act==="close"){M("sheet").classList.add("hidden"),Zi=null,R.click(),At==="__people"&&Ut();return}if(!t)return;const n=C.get(),s=n.currentRoom,o=t.dataset.v,i=Ie??"",a=t.dataset.act;if(a!=="delc"&&($o=!1),a&&a.indexOf("av-")===0){const r=i===gt?as():C.get().characters.find(d=>d.id===i);if(a==="av-costume"){r&&!r.look2&&x0(i);const d=i===gt?as():C.get().characters.find(f=>f.id===i);Mn(i,{costume:io(o)??null,...d?.look2?{look2:d.look2}:{},size:d?.size??"kid"}),R.sparkle(),dn(),Ge(document.querySelector(".avStage"));return}if(a==="av-surprise"){Mn(i,{...Ti(Yr()),size:r?.size??"kid"}),R.sparkle(),dn(),Ge(document.querySelector(".avStage"));return}const l=r?.look2??Ja(r??{}),c=RL(l,a,o??"");if(!c){R.click(),dn();return}Mn(i,{...Ti(c),size:r?.size??"kid"}),R.sparkle(),dn(),Ge(document.querySelector(".avStage"));return}switch(a){case"wall":C.dispatch({type:"room/wallpaper",room:s,color:o});break;case"floor":C.dispatch({type:"room/floor",room:s,color:o});break;case"pat":C.dispatch({type:"room/pattern",room:s,pattern:+o});break;case"wtile":C.dispatch({type:"room/wallTile",room:s,tile:o});break;case"ftile":C.dispatch({type:"room/floorTile",room:s,tile:o||null});break;case"skin":case"hair":case"shirt":case"pants":Mn(i,{[a]:o});break;case"hs":Mn(i,{hairStyle:+o});break;case"acc":Mn(i,{acc:+o});break;case"size":{const r=i===gt?as():C.get().characters.find(l=>l.id===i);Mn(i,{size:o,...r?.look2?{look2:r.look2}:{}}),en(C.get());break}case"pickc":Ie=o,en(C.get()),R.click(),dn();return;case"newc":if(!$0())return;break;case"delc":if(i===gt||!dt())return;if(!$o){$o=!0,R.click(),dn();return}$o=!1;{const l=Ot.get(i)?.getBoundingClientRect();C.dispatch({type:"char/delete",id:i}),l?yf(l.left+l.width/2,l.top+l.height/2):R.pop()}Ie=C.get().characters[0]?.id??null,dn();return}R.sparkle(),dn(),Ge(document.querySelector(".preview"))});M("tabs").addEventListener("click",e=>{const t=e.target.closest("[data-room]");if(!t)return;const n=t.dataset.room;n!==C.get().currentRoom&&(Ve=null,R.swish(),F.classList.remove("swap"),F.offsetWidth,F.classList.add("swap"),C.dispatch({type:"room/switch",room:n}))});M("cats").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");t&&(At=t.dataset.cat,R.click(),Ut())});M("roomFilter").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");if(t){At=t.dataset.cat,R.click(),Ut();return}const n=e.target.closest("[data-rf]");n&&(of=n.dataset.rf==="all"?"all":"",R.click(),Ut())});ae.addEventListener("pointerdown",e=>e.stopPropagation());ae.addEventListener("click",e=>{const t=e.target.closest("[data-a]");if(!t||!Ve)return;if(!dt()){Wn(null);return}const n=C.get().currentRoom,s=Ve,o=j.querySelector(`.item[data-id="${s}"]`);switch(t.dataset.a){case"smaller":case"bigger":{const i=C.get().rooms[n].items.find(l=>l.id===s);if(!i)break;const a=Bn.indexOf(On(i.size)),r=t.dataset.a==="smaller"?a-1:a+1;if(r<0||r>=Bn.length)break;C.dispatch({type:"item/size",room:n,id:s,size:Bn[r]}),R.click(),Ge(o);break}case"flip":C.dispatch({type:"item/flip",room:n,id:s}),R.swish(),Ge(o);break;case"front":C.dispatch({type:"item/front",room:n,id:s}),R.click(),Ge(o);break;case"back":C.dispatch({type:"item/back",room:n,id:s}),R.click(),Ge(o);break;case"delete":{const i=o?.getBoundingClientRect();Ve=null,C.dispatch({type:"item/delete",room:n,id:s}),i&&yf(i.left+i.width/2,i.top+i.height/2);break}}});F.addEventListener("pointerdown",e=>{if(e.target.closest(".nudge"))return;dl();const t=e.clientX,n=ce;let s=!1,o=0,i=e.clientX,a=performance.now();Un(e,{edgeScroll:!1,onMove(r){if(Math.abs(r.clientX-t)>6&&(s=!0),!s)return;const l=performance.now();o=(r.clientX-i)/Math.max(1,l-a),i=r.clientX,a=l,Je(n-(r.clientX-t)/wt())},onUp(){if(!s){Ve&&(Ve=null,Lt(C.get()));return}if(Ft)return;let r=-o*16/wt();const l=()=>{Math.abs(r)<.3||(Je(ce+r),r*=.92,So=requestAnimationFrame(l))};So=requestAnimationFrame(l)}})});F.addEventListener("wheel",e=>{e.preventDefault(),dl(),Je(ce+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/wt())},{passive:!1});M("nudgeL").addEventListener("pointerdown",e=>{e.stopPropagation(),R.swish(),fl((zi??ce)-te*.6)});M("nudgeR").addEventListener("pointerdown",e=>{e.stopPropagation(),R.swish(),fl((zi??ce)+te*.6)});const Th=M("minimap");Th.addEventListener("pointerdown",e=>{e.stopPropagation(),e.preventDefault();const t=n=>{const s=Th.getBoundingClientRect();fl((n.clientX-s.left)/s.width*pe-te/2)};t(e),R.click(),Un(e,{edgeScroll:!1,onMove:t,onUp(){}})});M("btnPaint").addEventListener("click",()=>{if(!dt())return Wn(null);Oo("paint")});M("btnDress").addEventListener("click",()=>Oo("dress"));M("btnSound").addEventListener("click",()=>{C.dispatch({type:"settings/sound",on:!C.get().soundOn}),R.click()});document.addEventListener("gesturestart",e=>e.preventDefault());document.addEventListener("contextmenu",e=>e.preventDefault());"serviceWorker"in navigator&&navigator.serviceWorker.register("/kids-house-game/sw.js");window.__store=C;B9({get:()=>C.get(),dispatch:e=>C.dispatch(e),subscribe:e=>C.subscribe(e),canDrift:()=>B==="house"&&df(),speaks:()=>!v||Pe===J||v.speaksNeeds,layer:j,menuAfter:M("btnSound")});window.__items=Object.fromEntries(wn.filter(e=>e.img).map(e=>[e.kind,{w:e.w,h:je(e),cat:e.cat,holdable:e.holdable,svg:e.img.includes(".svg")}]));window.__cam={get:()=>ce,set:Je};window.__phoneShowKids=()=>lt();window.__avatar={richAvatars:yr,randomLook2:Yr,look2FromLegacy:Ja,legacyFromLook2:Gr,sanitizeLook2:Gi,handsFor:ll};window.__frameHouseKid=()=>to(!0);window.__layoutNameTags=()=>lu();window.__lie={bedArt:Jr,lieBedKinds:M1,lieOffset:nr,lieSpot:C1,box(e){const t=ge[e];return t?{w:t.w,h:je(t)}:null}};window.__paint=()=>{Ct()};const he=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function dt(){return!v||Pe===J||v.canEdit(be)}function Wn(e){R.pop();const t=M("houseTag");t.classList.add("show"),t.classList.remove("wiggle"),t.offsetWidth,t.classList.add("wiggle"),window.clearTimeout(Tr),Tr=window.setTimeout(()=>{B==="house"&&v&&!document.body.classList.contains("own-house")||t.classList.remove("show")},2e3),e&&(e.classList.remove("nope"),e.offsetWidth,e.classList.add("nope")),N("🔒 Look-only house: ask the owner to unlock it!",1800)}const _e=()=>v?.myPresence()??null,as=()=>v?v.players.get(v.pid)?.look??null:null;function Mn(e,t){if(e===gt){const n=as();if(!n||!v)return;v.setLook(Ji({...n,...t})),Ct(),B==="street"&&Rr(),B==="park"&&oo(),B==="ranch"&&fs();return}C.dispatch({type:"char/update",id:e,patch:t})}function et(e){v?.setPresence(e)}function wf(e,t,n){const s=[];return v?.presence.forEach((o,i)=>{i!==v.pid&&o.where==="house"&&o.houseId===e&&o.room===t&&s.push(o)}),ym(n,s,{minX:80,maxX:pe-80,minY:Js+60,maxY:Re-20})}function CC(e){const t=_e();if(t&&t.where==="house"){const n=t.houseId?wf(t.houseId,e,t):t;et({...t,room:e,x:n.x,y:n.y})}}function M0(e){Pe=e,Hu(e),Ve=null,setTimeout(()=>pm.update());for(const t of Object.keys(xr))delete xr[t];Ie=e===J?e.get().characters[0]?.id??null:gt,so(),Ut()}function vf(e,t,n,s){return`<div class="inner">${vt(e,n,s)}</div><div class="nametag">${he(t)}</div>`}function Ct(){const e=new Set;if(v&&Pe!==J&&B==="house"){const n=C.get().currentRoom,s=[...v.presence.entries()],o=_e();o&&s.push([v.pid,o]);for(const[i,a]of s){const r=v.players.get(i);if(!r||a.where!=="house"||a.houseId!==be||a.room!==n)continue;e.add(i);let l=Ws.get(i);(!l||!l.isConnected)&&(l=document.createElement("div"),l.className="char avatar "+(i===v.pid?"mine":"other"),l.dataset.pid=i,j.appendChild(l),Ws.set(i,l),i===v.pid?PC(l):l.addEventListener("pointerdown",y=>{y.preventDefault(),y.stopPropagation()}));const c=r.look,d=Hn(i,a),f=d?.pose??null,p=Si(C.get())===i,g=JSON.stringify(c)+r.nickname+(f||"")+(p?"h":"");if(l.dataset.look!==g){const y=l.querySelector(".bubble");l.innerHTML=vf(c,r.nickname,f,p),y&&l.appendChild(y),l.dataset.look=g}l.classList.toggle("holding",p);const b=Ks[c.size]??1,m=St(n,d,a);lo(l,m.x,m.y,ks*b,yn*b);const k=d&&C.get().rooms[n].items.find(y=>y.id===d.item);if(l.style.zIndex=String(k?1e3+k.z+1+d.n:5e3+Math.round(a.y)),l.classList.toggle("flipped",a.flip),l.classList.toggle("pose-sit",f==="sit"),l.classList.toggle("pose-lie",f==="lie"),l.classList.toggle("pose-lie-r",f==="lie"&&!!k?.flip),na(l,c,i===v.pid),p){const y=Jg(c,f);y?g0("avatar",i,l,y,m.y):h0("avatar",i)}}}const t=Si(C.get());v&&B==="house"&&t&&e.has(t)||p0("avatar");for(const[n,s]of Ws)(!e.has(n)||!s.isConnected)&&(e.has(n)||s.remove(),Ws.delete(n));hf(),co(),hl(),ls()}function PC(e){e.addEventListener("pointerdown",t=>{if(t.preventDefault(),t.stopPropagation(),Ft||!v)return;const n=_e();if(!n||n.where!=="house")return;const s=Ue(t.clientX,t.clientY),o=St(C.get().currentRoom,Hn(v.pid,n),n),i={x:o.x-s.x,y:o.y-s.y};let a=o.x,r=!1;e.classList.add("lifted"),R.pick(),qi=!0,Un(t,{onMove(l){const c=Ue(l.clientX,l.clientY),d=_e();if(!d||d.where!=="house"||(Math.hypot(c.x-s.x,c.y-s.y)>6&&(r=!0),!r))return;const f=Math.max(40,Math.min(pe-40,c.x+i.x)),p=Math.max(Js+40,Math.min(Re,c.y+i.y)),g=Math.abs(f-a)>3?f<a:d.flip;Math.abs(f-a)>3&&(a=f),Fa(d,f,p,g,null),Ct(),Lr(C.get()),Be.isPlay()&&(Qi=Mr(l.clientX,l.clientY)?.id??null)},onUp(l){qi=!1,Qi=null,e.classList.remove("lifted");const c=_e();if(!r||!c||c.where!=="house"){R.click();return}const d=Ue(l.clientX,l.clientY),f=Math.max(40,Math.min(pe-40,d.x+i.x)),p=Math.max(Js+40,Math.min(Re,d.y+i.y));if(Be.isPlay()){const g=Mr(l.clientX,l.clientY),b=Ri({mode:"play",via:"drag",releaseX:f,releaseY:p,piece:g?pl(g):null,occupied:Ni(void 0,v.pid)}),m=b.seat?{id:b.seat.item,pose:b.seat.pose,n:b.seat.n}:null;Fa(c,b.x,b.y,c.flip,m)}else Fa(c,f,p,c.flip,null);Ct(),Lr(C.get()),R.drop(),Ge(e),requestAnimationFrame(()=>to(!0))}})})}function TC(e){return e.kind==="text"?e.v:(e.kind==="phrase"?wi:wg)[e.v]??""}function Zo(){const e=document.querySelectorAll(".bubble");if(!document.body.classList.contains("phone")){e.forEach(s=>{(s.style.marginLeft||s.style.marginTop)&&(s.style.marginLeft="",s.style.marginTop="")});return}const t=F.getBoundingClientRect(),n=wt()||1;e.forEach(s=>{s.style.marginLeft="0px",s.style.marginTop="0px";const o=s.getBoundingClientRect();let i=0;o.width>=t.width-8||o.left<t.left+4?i=t.left+4-o.left:o.right>t.right-4&&(i=t.right-4-o.right);let a=0;o.top<t.top+4?a=t.top+4-o.top:o.bottom>t.bottom-4&&(a=t.bottom-4-o.bottom),i&&(s.style.marginLeft=i/n+"px"),a&&(s.style.marginTop=a/n+"px")})}function RC(e,t){const n=B==="street"?document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`):B==="park"?document.querySelector(`#pavatars .savatar[data-pid="${e}"]`):B==="ranch"?document.querySelector(`#ravatars .savatar[data-pid="${e}"]`):B==="gameroom"?document.querySelector(`#gavatars .savatar[data-pid="${e}"]`):Ws.get(e),s=n?[n]:[];for(const o of s){o.querySelector(".bubble")?.remove();const i=document.createElement("div");i.className="bubble"+(t.kind==="emote"?" emote":""),i.textContent=TC(t),o.appendChild(i),Zo(),setTimeout(()=>i.classList.add("out"),4600),setTimeout(()=>i.remove(),5e3)}e!==v?.pid&&R.click()}function gl(){const e=_e();if(!v||!e)return 0;let t=0;return v.presence.forEach(n=>{Ry(e,n)&&t++}),t}function co(){const e=gl();M("btnChat").classList.toggle("glow",e>0),ul();const t=document.getElementById("chatNear");t&&(t.textContent=e?`${e} friend${e>1?"s":""} nearby can hear you`:"Walk closer to a friend to talk!",M("chatTray").classList.toggle("nobody",!e))}function L0(){const e=M("chatTray");if(!v)return;const t=document.body.classList.contains("phone"),n=`<div class="phrases">${wi.map((a,r)=>`<button data-phrase="${r}">${he(a)}</button>`).join("")}</div>`,s=v.settings.freeChat?`<form class="typed" id="chatForm"><input id="chatInput" maxlength="${Id}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>`:'<div class="presetsOnly">Picking from the bubbles above 💬</div>',o=t?'<button type="button" class="chatMore" data-chat="more">more</button>':"";e.innerHTML=`<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${wg.map((a,r)=>`<button data-emote="${r}">${a}</button>`).join("")}</div>
    ${o}
    <div class="chatExtra${t?" hidden":""}">${n}${s}</div>`,co(),document.getElementById("chatForm")?.addEventListener("submit",a=>{a.preventDefault();const r=M("chatInput"),l=wy(r.value);if(!l.ok){M("chatWarn").textContent=el[l.reason]??"",R.pop();return}if(!gl()){N("Walk closer to a friend to talk!");return}v.say({kind:"text",v:l.text}),r.value="",M("chatWarn").textContent="",r.blur()})}M("chatTray").addEventListener("click",e=>{const t=e.target;if(!v)return;if(t.closest('[data-chat="close"]')){M("chatTray").classList.add("hidden");return}const n=t.closest('[data-chat="more"]');if(n){const i=M("chatTray").querySelector(".chatExtra");i?.classList.toggle("hidden"),n.textContent=i&&!i.classList.contains("hidden")?"less":"more";return}const s=t.closest("[data-emote]"),o=t.closest("[data-phrase]");if(!(!s&&!o)){if(!gl()){N("Walk closer to a friend to talk!");return}v.say(s?{kind:"emote",v:+s.dataset.emote}:{kind:"phrase",v:+o.dataset.phrase}),R.click()}});M("btnChat").addEventListener("click",()=>{M("chatTray").classList.toggle("hidden")||(L0(),R.swish())});function bn(){const e=document.body.classList,n=!!v&&Pe!==J&&B==="house"?v.houses.get(be):void 0,s=!!n&&n.meta.ownerId===v.pid;if(e.toggle("mode-hood",!!v),e.toggle("view-street",B!=="house"),e.toggle("view-park",B==="park"),e.toggle("view-ranch",B==="ranch"),e.toggle("view-map",B==="street"),e.toggle("view-gameroom",B==="gameroom"),e.toggle("in-barn",B==="ranch"&&ze),e.toggle("mode-play",B==="house"&&Be.isPlay()),Df(),B0(),e.toggle("own-house",s),e.toggle("locked",!!n&&!dt()),e.toggle("has-hood",!!tl()),ul(),n){const o=v.players.get(n.meta.ownerId)?.nickname??"";M("houseTag").innerHTML=`${n.meta.locked?"🔒 ":""}<b>${he(n.meta.name)}</b>${s?" · yours":o?" · "+he(o):""}`;const i=M("lockIco");i&&(i.innerHTML=n.meta.locked?It.lockOn:It.lockOff);const a=n.meta.locked?"Unlock my house":"Lock my house";M("btnLock").setAttribute("aria-label",n.meta.locked?"Unlock house":"Lock house");const r=M("lockLabel");r&&(r.textContent=a)}co(),BC(),document.body.classList.contains("phone")&&Nu()}let ic="",Tr=0;function BC(){const e=M("houseTag"),t=!!v&&B==="house"&&!document.body.classList.contains("own-house");if(B!=="house"||!v){ic="",e.classList.remove("show");return}if(t){e.classList.add("show");return}const n=be||"solo";ic!==n&&(ic=n,e.classList.add("show"),window.clearTimeout(Tr),Tr=window.setTimeout(()=>e.classList.remove("show"),2e3))}M("btnLock").addEventListener("click",()=>{const e=v?.houses.get(be);!e||e.meta.ownerId!==v.pid||(v.lock(e.meta.id,!e.meta.locked),R.click(),N(e.meta.locked?"Unlocked: friends can decorate!":"Locked: friends can look but not change things"))});const _t=new Map;let Rh="",cd=0,Fe={w:An,h:In,portrait:!1};function AC(){return document.body.classList.contains("phone-portrait")?!0:document.body.classList.contains("phone")?!1:window.innerHeight>=window.innerWidth*1.25}function E0(){const e=M("street"),t=Fe.portrait&&!document.body.classList.contains("phone")?24:0,n=Math.max(1,e.clientWidth-t),s=Math.max(1,e.clientHeight-t);return Math.min(n/Fe.w,s/Fe.h)}function IC(e){const t=M("street"),n=M("mapWorld"),s=Fe.w*e,o=Fe.h*e;n.style.marginLeft=Math.max(0,Math.floor((t.clientWidth-s)/2))+"px",n.style.marginTop=Math.max(0,Math.floor((t.clientHeight-o)/2))+"px",t.scrollLeft=0,t.scrollTop=0,S0()}function S0(){const e=M("street"),t=M("mapWorld"),n=4,s=e.clientWidth-n,o=e.clientHeight-n,i=t.offsetLeft,a=t.offsetTop;t.querySelectorAll(".mapSign").forEach(r=>{r.style.transform="translateX(-50%)";const l=r.offsetWidth,c=r.offsetHeight,d=i+r.offsetLeft-l/2,f=a+r.offsetTop;let p=0,g=0;d<n&&(p=n-d),d+l+p>s&&(p-=d+l+p-s),f<n&&(g=n-f),f+c+g>o&&(g-=f+c+g-o),DC(r,p,g,i,a,n,s,o)})}function DC(e,t,n,s,o,i,a,r){const l=[...e.parentElement.querySelectorAll(".mapMail")],c=()=>{const f=e.offsetWidth,p=e.offsetHeight,g=s+e.offsetLeft-f/2+t,b=o+e.offsetTop+n;return{left:g,top:b,right:g+f,bottom:b+p,width:f,height:p}};for(let f=0;f<6;f++){const p=c(),g=l.find(_=>{const P=s+_.offsetLeft,x=o+_.offsetTop,E=P+_.offsetWidth,W=x+_.offsetHeight;return p.right>P+2&&p.left<E-2&&p.bottom>x+2&&p.top<W-2});if(!g)break;const b=s+g.offsetLeft,m=o+g.offsetTop,k=m+g.offsetHeight,y=c(),u=k+4-y.top,w=y.bottom-(m-4);y.top+u+y.height<=r?n+=u:y.top-w>=i?n-=w:t-=Math.min(y.right,b+g.offsetWidth)-Math.max(y.left,b)+6}const d=c();d.left<i&&(t+=i-d.left),d.right>a&&(t-=d.right-a),d.top<i&&(n+=i-d.top),d.bottom>r&&(n-=d.bottom-r),e.style.transform=Math.abs(t)>.5||Math.abs(n)>.5?`translate(calc(-50% + ${t.toFixed(1)}px), ${n.toFixed(1)}px)`:"translateX(-50%)"}document.fonts?.ready.then(()=>{B==="street"&&S0()});function OC(){return v?[...v.houses.values()].map(e=>e.meta).sort((e,t)=>e.slot-t.slot):[]}function HC(e){const s=Math.round(97.5),o=Math.max(1,Math.ceil(e/(e===1?1:2))),i=158,a=318,l=a+(o-1)*i+s/2+108,c=Math.max(1020,l+78),d=Math.max(l,Math.min(c-88,Math.round(c*.74))),f=e===1?[280]:[150,410],p=e===1?1:2,g=Array.from({length:e},(b,m)=>({x:f[m%p],y:a+Math.floor(m/p)*i}));return{w:560,h:c,hw:104,hh:s,houses:g,square:{x:280,y:d},park:{x:96,y:122},club:{x:280,y:116},ranch:{x:458,y:120}}}function Bh(e,t,n,s){return!e||e.mine||!au()?"":`<button class="mapKnock" data-knock="${e.id}" aria-label="Knock at ${he(e.name)} for a treat" style="left:${s(t)};top:${s(n)}"><span>🎃</span></button>`}const Ah=new Map;function C0(){const e=M("street");let t=document.getElementById("candyBucket");if(!au()){t?.remove();return}t||(t=document.createElement("div"),t.id="candyBucket",t.className="candyBucket",t.setAttribute("aria-live","polite"),e.appendChild(t));const n=iu(localStorage);t.innerHTML=`<span class="pail">🎃</span><b>${n}</b>`,t.setAttribute("aria-label",`${n} treats in your bucket`)}function WC(e){const{treat:t}=n9(localStorage);C0(),Ge(e),R.pop();const n=document.createElement("span");n.className="treatPop",n.textContent=t,e.appendChild(n),setTimeout(()=>n.remove(),900);const s=document.getElementById("candyBucket");s&&Ge(s),v&&v.knock(e.dataset.knock)}function Us(e=!1){if(B!=="street")return;const t=M("mapWorld"),n=OC(),s=v?n.map(p=>({id:p.id,name:p.name,style:p.style,locked:p.locked,mine:p.ownerId===v.pid,lit:!!v.players.get(p.ownerId)?.online})):cd?Array.from({length:cd},(p,g)=>({id:"fake"+g,name:["Reagan","Quinn","Chloe","Sloane","Cada","Emma","Olivia","Charlotte","Amelia","Sophia","Isabella","Mia"][g%12]+"'s House",style:g,locked:g===3,mine:g===0,lit:g%3!==1})):[null],o=AC()?HC(Math.max(1,s.length)):null;Fe=o?{w:o.w,h:o.h,portrait:!0}:{w:An,h:In,portrait:!1},document.body.classList.toggle("map-tall",!!o&&!document.body.classList.contains("phone"));const i=E0(),a=(Fe.portrait?"P":"L")+Fe.w+"x"+Fe.h+":"+i.toFixed(3)+JSON.stringify(n)+(v?n.map(p=>(v.players.get(p.ownerId)?.online?1:0)+(ac(p.id)?"u":"")).join("")+v.pid:"solo");if(!e&&a===Rh&&t.querySelector("#mapFaces")){Rr();return}Rh=a,t.style.width=Fe.w*i+"px",t.style.height=Fe.h*i+"px",t.style.setProperty("--sc",String(i)),t.innerHTML=`<div class="mapClip">${o?km(o.w,o.h):bm()}</div>`;const r=t.querySelector(".mapClip"),l=p=>p*i+"px";_t.clear();const c=s.length;let d="",f="";if(o){const{hw:p,hh:g}=o,b=34,m=40;s.forEach((w,_)=>{const P=o.houses[_]??o.houses[0],x=w?`house:${w.id}`:"home",E=w?w.name:"My House";_t.set(w?"house:"+w.id:"home",{x:P.x,y:P.y-g/2-8});const W=!!(w&&ac(w.id)),V=P.x<o.w/2,ne=V?Math.max(4,P.x-p/2-b-8):Math.min(o.w-b-4,P.x+p/2+8),Y=Math.max(4,Math.min(o.h-m-4,P.y-g*.42));d+=`<button class="mapSpot mapHouse ${w?.mine||!w?"mine":""}" data-go="${x}" aria-label="${he(E)}" style="left:${l(P.x-p/2)};top:${l(P.y-g/2)};width:${l(p)};height:${l(g)}">${pr(w?w.style:0,{lit:w?w.lit:!0})}${w?.locked?'<span class="lockBadge">🔒</span>':""}${w?.mine||!w?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${W?"up":""}" data-mail="${w?w.id:"home"}" aria-label="${he(E)} mailbox" style="left:${l(ne)};top:${l(Y)};width:${l(b)};height:${l(m)}">${up(W)}</button>${Bh(w,V?P.x+p/2-30:P.x-p/2-10,P.y+g*.12,l)}`,f+=`<div class="mapSign ${w?.mine||!w?"mine":""}" style="left:${l(P.x)};top:${l(P.y+g/2+2)}">${he(E)}</div>`});const k=(w,_,P,x,E,W,V,ne,Y)=>{d+=`<button class="mapSpot ${w}" data-go="${_}" aria-label="${P}" style="left:${l(E-V/2)};top:${l(W-ne/2)};width:${l(V)};height:${l(ne)}">${x}</button>`,f+=`<div class="mapSign place" style="left:${l(E)};top:${l(W+Y)}">${P==="The park"?"Park":P==="Rainbow Ranch"?"Rainbow Ranch":"Clubhouse"}</div>`};k("mapPark","park","The park",zf,o.park.x,o.park.y,148,126,68),k("mapRanch","ranch","Rainbow Ranch",Qf,o.ranch.x,o.ranch.y,156,128,72),k("mapClub","gameroom","The clubhouse",qf,o.club.x,o.club.y,146,120,68),_t.set("park",{x:o.park.x,y:o.park.y-78}),_t.set("ranch",{x:o.ranch.x,y:o.ranch.y-80}),_t.set("barn",{x:o.ranch.x,y:o.ranch.y+8}),_t.set("gameroom",{x:o.club.x,y:o.club.y-74}),_t.set("square",o.square);const y=[{x:o.park.x,y:o.park.y,r:90},{x:o.ranch.x,y:o.ranch.y,r:96},{x:o.club.x,y:o.club.y,r:88},{x:o.square.x,y:o.square.y,r:70},...o.houses.map(w=>({x:w.x,y:w.y,r:78}))],u=o.w/2;r.insertAdjacentHTML("beforeend",Vf(y,(w,_)=>Math.abs(w-u)<34,o.w,o.h)+_m(o.w,o.h,y)+d+'<div class="mapFaces" id="mapFaces"></div>')}else{const p=t.querySelector("#mapRoad"),g=p.getTotalLength(),b=Array.from({length:160},(_,P)=>p.getPointAtLength(g*P/159)),m=(_,P)=>b.some(x=>Math.hypot(x.x-_,x.y-P)<50),k=dd(),y=c>8?80:94,u=y*300/320,w=P0(p,c,k);s.forEach((_,P)=>{const x=w[P],E=_?`house:${_.id}`:"home",W=_?_.name:"My House";_t.set(_?"house:"+_.id:"home",{x:x.x,y:x.y-u/2-4});const V=!!(_&&ac(_.id)),ne=34,Y=40,K=14/i,an=Math.max(4,Math.min(An-ne-4,x.x+y/2+K)),Vt=Math.max(4,Math.min(In-Y-4,x.y-u*.22));d+=`<button class="mapSpot mapHouse ${_?.mine||!_?"mine":""}" data-go="${E}" aria-label="${he(W)}" style="left:${l(x.x-y/2)};top:${l(x.y-u/2)};width:${l(y)};height:${l(u)}">${pr(_?_.style:0,{lit:_?_.lit:!0})}${_?.locked?'<span class="lockBadge">🔒</span>':""}${_?.mine||!_?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${V?"up":""}" data-mail="${_?_.id:"home"}" aria-label="${he(W)} mailbox" style="left:${l(an)};top:${l(Vt)};width:${l(ne)};height:${l(Y)}">${up(V)}</button>${Bh(_,Math.max(4,x.x-y/2-40/i),x.y-u*.05,l)}`,f+=`<div class="mapSign ${_?.mine||!_?"mine":""}" style="left:${l(x.x)};top:${l(x.y+u/2-2)}">${he(W)}</div>`}),d+=`<button class="mapSpot mapPark" data-go="park" aria-label="The park" style="left:${l(Nn.x-100)};top:${l(Nn.y-85)};width:${l(200)};height:${l(170)}">${zf}</button>`,f+=`<div class="mapSign place" style="left:${l(Nn.x)};top:${l(Nn.y+70)}">Park</div>`,d+=`<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${l(cn.x-110)};top:${l(cn.y-90)};width:${l(220)};height:${l(180)}">${Qf}</button>`,f+=`<div class="mapSign place" style="left:${l(cn.x)};top:${l(cn.y+78)}">Rainbow Ranch</div>`,d+=`<button class="mapSpot mapClub" data-go="gameroom" aria-label="The clubhouse" style="left:${l(Zn.x-95)};top:${l(Zn.y-78)};width:${l(190)};height:${l(156)}">${qf}</button>`,f+=`<div class="mapSign place" style="left:${l(Zn.x)};top:${l(Zn.y+82)}">Clubhouse</div>`,_t.set("park",{x:Nn.x,y:Nn.y-60}),_t.set("ranch",{x:cn.x-30,y:cn.y-60}),_t.set("barn",{x:cn.x+10,y:cn.y+10}),_t.set("gameroom",{x:Zn.x,y:Zn.y-52}),r.insertAdjacentHTML("beforeend",Vf(k,m)+d+'<div class="mapFaces" id="mapFaces"></div>')}t.insertAdjacentHTML("beforeend",f),C0(),Rr(),IC(i)}const dd=()=>[{x:Nn.x,y:Nn.y,r:115},{x:cn.x,y:cn.y,r:125},{x:fn.x,y:fn.y,r:100},{x:Zn.x,y:Zn.y,r:90}];function P0(e,t,n){const s=e.getTotalLength(),o=[];for(let i=0;i<t;i++){const a=t===1?.2:.05+.75*i/(t-1),r=e.getPointAtLength(s*a),l=e.getPointAtLength(Math.min(s,s*a+3));let c=-(l.y-r.y),d=l.x-r.x;const f=Math.hypot(c,d)||1;c/=f,d/=f;const p=[1,-1].map(m=>({x:r.x+c*72*m,y:r.y+d*72*m})).map(m=>({...m,score:Math.min(...n.map(k=>Math.hypot(k.x-m.x,k.y-m.y)-k.r),m.x-50,An-50-m.x,m.y-60,In-40-m.y)})),g=i%2?p:[p[1],p[0]],b=g[0].score>0||g[0].score>=g[1].score?g[0]:g[1];b.x=Math.max(60,Math.min(An-60,b.x)),b.y=Math.max(62,Math.min(In-72,b.y)),n.push({x:b.x,y:b.y,r:70}),o.push({x:b.x,y:b.y})}return o}window.__mapFake=e=>{cd=e,Us(!0)};window.__mapLayout=e=>{const t=document.querySelector("#mapRoad");if(!t)return null;const n=P0(t,e,dd());let s=1e9,o=1e9,i=!0;return n.forEach((a,r)=>{n.forEach((l,c)=>{c>r&&(s=Math.min(s,Math.hypot(a.x-l.x,a.y-l.y)))}),dd().forEach(l=>{o=Math.min(o,Math.hypot(a.x-l.x,a.y-l.y)-l.r)}),(a.x<55||a.x>An-55||a.y<60||a.y>In-70)&&(i=!1)}),{n:e,minHouse:s,minSpot:o,inside:i}};function T0(e){return e.where==="house"&&e.houseId?{kind:"house",houseId:e.houseId,room:e.room}:e.where==="park"||e.where==="ranch"||e.where==="barn"||e.where==="gameroom"?{kind:e.where}:{kind:"square"}}const UC=e=>e.kind==="house"?"house:"+e.houseId:e.kind;function Rr(){const e=document.getElementById("mapFaces");if(!e||B!=="street")return;const t=E0(),n=new Set,s=[];if(v){const i=[...v.presence.entries()],a=_e();a&&i.push([v.pid,a]);for(const[r,l]of i){const c=v.players.get(r);c&&s.push({key:r,look:c.look,name:c.nickname,mine:r===v.pid,place:T0(l)})}}else{const i=J.get().characters[0];i&&s.push({key:"solo",look:Ji(i),name:"You",mine:!0,place:{kind:"square"}})}const o=new Map;for(const i of s){const a=UC(i.place);o.has(a)||o.set(a,[]),o.get(a).push(i)}for(const[i,a]of o)a.sort((r,l)=>r.mine?-1:l.mine?1:r.name.localeCompare(l.name)),a.forEach((r,l)=>{let c,d;const f=_t.get("square")??{x:fn.x,y:fn.y};if(i==="square")if(Fe.portrait){const y=Math.floor(l/3),u=l%3,w=Math.min(3,a.length-y*3);c=f.x+(u-(w-1)/2)*176,d=f.y+y*112}else if(a.length===1)c=fn.x,d=fn.y;else{const m=-Math.PI/2+l*(Math.PI*2/a.length);c=fn.x+Math.cos(m)*78,d=fn.y+Math.sin(m)*78}else{const m=_t.get(i)??f,k=Fe.portrait?2:3,y=Fe.portrait?150:64,u=Math.floor(l/k),w=l%k,_=Math.min(k,a.length-u*k);c=m.x+(w-(_-1)/2)*y,d=m.y-u*(Fe.portrait?108:64)}Fe.portrait&&(c=Math.max(100,Math.min(Fe.w-100,c)),d=Math.max(48,Math.min(Fe.h-84,d))),n.add(r.key);let p=e.querySelector(`.mapFace[data-pid="${r.key}"]`);p||(p=document.createElement("button"),p.className="mapFace "+(r.mine?"mine":"other"),p.dataset.pid=r.key,p.setAttribute("aria-label",r.mine?"You":r.name),e.appendChild(p));const g=JSON.stringify(r.look)+r.name;if(p.dataset.look!==g){const m=p.querySelector(".bubble");p.innerHTML=`<span class="face">${md(vt(r.look))}</span><span class="fname">${he(r.mine?"You":r.name)}</span>`,m&&p.appendChild(m),p.dataset.look=g}p.dataset.place=i;const b=Fe.portrait?62:46;p.style.left=(c-b/2)*t+"px",p.style.top=(d-b/2)*t+"px",p.style.width=p.style.height=b*t+"px"});e.querySelectorAll(".mapFace").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),co()}function _f(){M("mapWorld").classList.remove("zoomIn")}function R0(e,t){_f(),R.swish(),VC(e)}function la(e){ys()||(e.classList.remove("sceneIn"),e.offsetWidth,e.classList.add("sceneIn"),setTimeout(()=>e.classList.remove("sceneIn"),260))}function VC(e){e.kind==="house"?I0(e.houseId,e.room):e.kind==="home"?A0():e.kind==="park"?KC():e.kind==="ranch"?ji(!1):e.kind==="barn"?ji(!0):e.kind==="gameroom"&&JC()}function zC(e){const t=v?.presence.get(e);if(!v||!t)return;const n=T0(t),s=v.players.get(e)?.nickname??"your friend";if(n.kind==="square"){N(`${s} is on the map too! 👋`),R.pop();return}document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`),R0(n),setTimeout(()=>{const o=_e();if(!o||!v)return;const i=t.x+(t.x>300?-110:110);if(n.kind==="house"&&o.where==="house")et({...o,x:i,y:t.y}),Ct(),fl(i-te/2);else if((n.kind==="park"||n.kind==="ranch"||n.kind==="barn")&&o.where===n.kind){tn({...o,x:i,y:Math.max(Qs,Math.min(Dn,t.y)),flip:i>t.x});const a=n.kind==="park"?vs():on(),r=M(n.kind==="park"?"parkScroll":"ranchScroll");requestAnimationFrame(()=>{r.scrollLeft=t.x*a-r.clientWidth/2,lt()})}else if(n.kind==="gameroom"&&o.where==="gameroom"){const a=qo();a||tn({where:"gameroom",x:i,y:Math.max(Qs,Math.min(Dn,t.y)),flip:i>t.x});const r=bs(),l=M("grScroll"),c=a?.x??t.x;requestAnimationFrame(()=>{l.scrollLeft=c*r-l.clientWidth/2,lt()})}N(`You found ${s}! 💕`)},420)}function ac(e){if(!v)return!1;const t=v.houses.get(e);return!!t&&t.meta.ownerId===v.pid&&xd(t.confirmed.mailbox)>0}let Pa=0;function B0(){Zu();const e=document.getElementById("mailCue"),t=v?.myHouseId()??"",n=v&&t?xd(v.houses.get(t)?.confirmed.mailbox):0;if(!v||B!=="street"||n<=0){n<=0&&(Pa=0),e?.classList.remove("show");return}Pa!==n&&(Pa=n,e?.classList.add("show"),window.setTimeout(()=>{Pa===n&&e?.classList.remove("show")},8e3))}function ul(){const e=v?.myHouseId()??"",t=v&&e?xd(v.houses.get(e)?.confirmed.mailbox):0,n=M("menuBadge");n.textContent=t>9?"9+":String(t),n.classList.toggle("on",t>0);const s=document.getElementById("mailNew");s&&(s.textContent=t>0?t===1?"1 new":t+" new":"",s.classList.toggle("on",t>0));const o=v?v.presence.size:0,i=M("mapBadge");i.textContent=o>9?"9+":String(o),i.classList.toggle("on",o>0),M("btnMap").setAttribute("aria-label",o>0?`Map, ${o} friends online`:"Map");const a=gl(),r=M("chatBadge");r.textContent=a>9?"9+":String(a),r.classList.toggle("on",a>0)}function Br(e){e&&document.querySelectorAll(".toast").forEach(t=>t.remove()),M("menuPop").classList.toggle("hidden",!e),M("btnMenu").setAttribute("aria-expanded",e?"true":"false"),M("btnPhoto").classList.toggle("ok",B==="house"),e&&ul(),QC()}M("btnPhoto").addEventListener("click",()=>{Br(!1),requestAnimationFrame(()=>requestAnimationFrame(()=>{YL(F,()=>R.click())}))});function QC(){const e=M("houseTag");if(e.style.top="",!e.classList.contains("show")||M("menuPop").classList.contains("hidden"))return;const t=document.querySelector(".menuCard");if(!t)return;const n=M("stageWrap").getBoundingClientRect(),s=t.getBoundingClientRect(),o=e.getBoundingClientRect();if(!(o.top<s.bottom-2&&o.bottom>s.top+2&&o.left<s.right-2&&o.right>s.left+2))return;const a=s.bottom-n.top+8;a+o.height<n.height-8?e.style.top=a+"px":e.style.top=Math.max(8,n.height-o.height-10)+"px"}M("btnMenu").addEventListener("click",()=>{Br(M("menuPop").classList.contains("hidden")),R.click()});M("menuPop").addEventListener("click",e=>{const t=e.target;if(t.id==="menuPop"||t.closest("#menuClose")){Br(!1);return}t.closest(".menuRow")&&Br(!1)});M("btnStudio").addEventListener("click",()=>r0());M("btnMail").addEventListener("click",()=>{const e=v?.myHouseId();e?$f(e):N("Join a street to send letters!")});M("secrets").addEventListener("click",()=>{if(B!=="house"){N("Surprises are hiding in your house!");return}Be.isPlay()&&M("modeDecorate").click(),At="secrets",Ut(),N("Surprises are in your drawer!")});function $f(e){if(!v||e==="home"||!v.houses.has(e)){N("Join a street to send letters!");return}const t=v.houses.get(e);Za.open(e,t.meta.name,t.meta.ownerId===v.pid,t.confirmed.mailbox?.letters??[]),R.click()}M("mapWorld").addEventListener("click",e=>{const t=e.target;if(B!=="street")return;const n=t.closest(".mapKnock");if(n){WC(n);return}const s=t.closest(".mapMail");if(s){$f(s.dataset.mail||"home");return}const o=t.closest(".mapFace");if(o){o.classList.contains("mine")?(Ge(o),R.pop(),N("That's you! Tap a place to go there")):zC(o.dataset.pid);return}const i=t.closest("[data-go]");if(!i)return;const a=i.dataset.go;R0(a.startsWith("house:")?{kind:"house",houseId:a.slice(6)}:{kind:a})});function fo(){_f(),M("street").classList.add("hidden"),M("park").classList.add("hidden"),M("ranch").classList.add("hidden"),M("gameroom").classList.add("hidden"),qa()?.close(),M("chatTray").classList.add("hidden"),M("sheet").classList.add("hidden")}function Co(){_f(),We=null,Et=[],ze=!1,v?et({where:"street",x:600,y:540,flip:!1}):Wt=null,fo(),B="street",M("street").classList.remove("hidden"),M("streetTitle").textContent=v?"Our Neighborhood":"My Map",bn(),Us(!0);const e=M("mapWorld");e.style.transformOrigin="50% 50%",e.classList.remove("zoomIn","mapIn"),ys()||(e.offsetWidth,e.classList.add("mapIn")),R.swish()}function A0(){if(v){const e=v.myHouseId();e&&v.houses.has(e)&&I0(e);return}fo(),B="house",Wt=null,Be.sync(!0),bn(),so(),la(M("stageWrap")),R.sparkle(),hs()}function I0(e,t="living"){if(!v||!v.houses.has(e))return;be=e,B="house",ze=!1,Be.sync(e===v.myHouseId());let n=$r.get(e);n||(n=Iy(v,e,{get:()=>J.get().soundOn,set:s=>J.dispatch({type:"settings/sound",on:s})}),$r.set(e,n)),n.dispatch({type:"room/switch",room:t});{const s=wf(e,t,{x:900+Math.random()*300,y:540});et({where:"house",houseId:e,room:t,x:s.x,y:s.y,flip:!1})}fo(),M0(n),la(M("stageWrap")),R.sparkle(),hs()}function xf(){v?.close(),v=null,$r=new Map,B="house",be="",Wt=null,We=null,Et=[],ze=!1,M("elsewhere").classList.add("hidden"),fo(),Be.sync(!0),M0(J),bn()}M("btnMap").addEventListener("click",()=>{if(B==="street"){R.pop();return}Co()});M("btnHome").addEventListener("click",()=>{if(B==="house"&&(!v||be===v.myHouseId())){R.pop();return}A0()});M("phoneOk").addEventListener("click",()=>{M("phoneNote").classList.add("hidden"),R.click()});M("elsewhereGo").addEventListener("click",()=>{R.click(),v?.connect()});M("btnSolo").addEventListener("click",()=>{xf(),N("Playing in your own house 🏠")});window.addEventListener("resize",()=>{B==="street"&&Us(!0),B==="park"&&Ef(),B==="ranch"&&Af(),B==="gameroom"&&ef(),lt()});function Mf(e){v=e,$r=new Map,e.on("players",()=>{v===e&&(B==="street"?Us():B==="park"?oo():B==="ranch"?(fs(),Df()):B==="gameroom"?Ei():(Ct(),bn()),Zi==="dress"&&dn())}),e.on("houses",()=>{v===e&&(B==="street"?Us():B==="house"&&!e.houses.has(be)&&(N("That house is gone now"),Co()))}),e.on("houseMeta",t=>{v!==e||t!==be||B!=="house"||(Ve=null,bn(),Lt(C.get()),Ut(),dt()||M("sheet").classList.add("hidden"))}),e.on("pres",()=>{v===e&&(B==="street"?Rr():B==="park"?oo():B==="ranch"?fs():B==="gameroom"?Ei():Ct())}),e.on("art",(t,n)=>{if(!(v!==e||!n||typeof n!="object")){for(const[s,o]of Object.entries(n)){Eu(s,o);const i=ja.get(s);i&&(ja.delete(s),B==="house"&&i.houseId===be&&d0(i.room,s,i.frame,i.x))}B==="house"&&t===be&&Lt(C.get())}}),e.on("artFail",(t,n,s)=>{v===e&&(ja.delete(n),s==="full"?N("Your walls are full of art! Take one down to hang a new one."):s==="streetfull"?N("The street is full of art! Take one down to hang a new one."):s==="slow"?N("So much art! Wait a moment, then hang it again."):s==="locked"&&N("This house is closed right now. Paint at home!"))}),e.on("ranch",()=>{v===e&&B==="ranch"&&vl(!0)}),e.on("ranchFail",t=>{v===e&&pd(t)}),e.on("noride",()=>{if(v!==e)return;const t=_e();if(t?.ride!==void 0){const{ride:n,...s}=t;et(s),fs()}N("Someone is riding that horse!")}),e.on("fx",(t,n)=>{v===e&&vP(t,n)}),e.on("bubble",(t,n)=>{v===e&&RC(t,n)}),e.on("knocked",(t,n)=>{if(v!==e)return;const s=Date.now();(Ah.get(n)??0)>s-2e4||(Ah.set(n,s),N(s9(n)))}),e.on("sayFail",t=>N(t==="presetsOnly"?"Typing is turned off: pick a bubble!":el[t]||"Couldn't send that")),e.on("mailbox",()=>{v===e&&(B==="street"&&Us(!0),B0(),Za.refresh(),ul())}),e.on("mailFail",t=>{v===e&&Za.fail(t)}),e.on("settings",()=>{v===e&&(M("chatTray").classList.contains("hidden")||L0(),Za.refresh())}),e.on("removed",()=>{N("A grown-up took this iPad off the street");const t=e.cfg;Tn({url:t.url,code:t.code,id:t.id,parentKey:t.parentKey}),xf()}),e.on("status",t=>{v===e&&(document.body.classList.toggle("reconnecting",t!=="online"&&!e.replaced),(t==="online"||t==="connecting")&&M("elsewhere").classList.add("hidden"))}),e.on("replaced",()=>{v===e&&M("elsewhere").classList.remove("hidden")}),e.on("table",()=>{if(v===e){if(B==="gameroom"){const t=qo(),n=_e();t&&n?.where==="gameroom"&&Math.hypot(n.x-t.x,n.y-t.y)>40&&et({where:"gameroom",x:t.x,y:Math.max(Qs,Math.min(Dn,t.y)),flip:n.flip}),Ei()}qa()?.refresh()}}),e.on("tblFail",(t,n)=>{v===e&&qa()?.fail(t,n)}),e.on("welcome",()=>{if(v===e)if(B==="street")Us(!0);else if(B==="park"||B==="ranch"){const t=_e();t&&et(t),B==="park"?Ef():Af(),lt()}else if(B==="gameroom"){const t=_e();t&&et(t),ef(),lt(),qa()?.refresh()}else e.houses.has(be)?so():Co()}),e.on("reset",(t,n)=>{v===e&&n==="cuddling"&&N("Someone is cuddling!")}),Co()}async function qC(){bn();const e=tl(),t=To();if(!e||!t?.token||t.url!==e)return;const n=new nl(t),s=await n.connect();s==="ok"?Mf(n):(n.close(),s!=="closed"&&N("Couldn't reach the street. Playing at home!"))}function jt(e,t,n=""){const s=document.createElement("div");s.className="sheet hoodSheet "+n,s.innerHTML=`<div class="card">${e}</div>`,document.body.appendChild(s),R.swish();const o=()=>s.remove();return s.addEventListener("click",i=>{const a=i.target;if(a===s||a.closest('[data-m="close"]'))return o();t(a,o,s)}),{root:s,close:o}}const Gt='<button class="close" data-m="close">✕</button>';M("btnHood").addEventListener("click",()=>NC());function NC(){const e=tl();if(!e){jt(`${Gt}<h2>Neighborhood</h2><p class="hint">The street isn't open yet. Ask a grown-up to set it up!</p>`,()=>{});return}const t=To()?.url===e?To():null;jt(`${Gt}<h2>Neighborhood</h2><div class="bigBtns">
      ${t?.token?`<button class="big go" data-m="go">${It.street}<span>Go to my street</span></button>`:`<button class="big go" data-m="join">${It.street}<span>Join a friend's street</span></button>`}
      <button class="big grown" data-m="create">${It.shield}<span>${t?.parentKey?"Grown-ups":"Grown-ups: start a street"}</span></button></div>`,async(n,s)=>{const o=n.closest("[data-m]")?.dataset.m;if(o==="go"){s();const i=new nl(t),a=await i.connect();a==="ok"?Mf(i):(i.close(),N(a.startsWith("badtoken")?"Please join again":"Couldn't reach the street"))}o==="join"&&(s(),Ci(e)),o==="create"&&(s(),await Tg()&&(t?.parentKey?ml():ZC(e)))})}async function ZC(e){let t;try{t=await By(e)}catch{N("Couldn't create a street right now");return}Tn({url:e,code:t.code,id:t.id,parentKey:t.parentKey}),jt(`${Gt}<h2>Your street is ready!</h2><p class="hint">Kids join with this code (you can pick your own on the grown-up screen):</p><div class="code" id="newCode">${t.code}</div>
    <p class="hint small">Grown-up key (keep it private; it opens the grown-up screen on another device):<br><b class="key" id="parentKey">${t.parentKey}</b></p>
    <div class="bigBtns"><button class="big grown" data-m="setup">${It.shield}<span>Add kids' names &amp; code</span></button>
    <button class="big go" data-m="joinhere">${It.street}<span>Join on this iPad</span></button></div>`,(n,s)=>{n.closest('[data-m="joinhere"]')&&(s(),Lf(e,t.code)),n.closest('[data-m="setup"]')&&(s(),ml())})}function Ci(e,t=""){const n=jt(`${Gt}<h2>Join a street</h2><p class="hint">Type the code a grown-up gave you</p>
    <form id="codeForm" class="codeForm"><input id="codeInput" maxlength="${Ad}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="CODE"/><button type="submit" class="go">Next</button></form>
    <p class="err">${he(t)}</p>`,()=>{}),s=n.root.querySelector("#codeInput");setTimeout(()=>s.focus(),50),s.addEventListener("input",()=>{s.value=rr(s.value)}),n.root.querySelector("#codeForm").addEventListener("submit",o=>{o.preventDefault();const i=rr(s.value);if(!W2(i)){n.close(),Ci(e,"That code looks wrong. Try again!");return}n.close(),Lf(e,i)})}async function Lf(e,t,n=""){let s;try{s=await Ay(e,t)}catch{Ci(e,"Couldn't reach the street. Try again!");return}if("slow"in s){Ci(e,"Too many tries. Ask a grown-up and try again in a few minutes.");return}if(!s.exists){Ci(e,"Hmm, we couldn't find that street.");return}window.__lastLookupId=s.id,FC(e,t,s.id,s.roster,n)}function FC(e,t,n,s,o=""){if(s.length){jt(`${Gt}<h2>Who are you?</h2>${o?`<p class="err">${he(o)}</p>`:'<p class="hint">Tap your name</p>'}<div class="nicks roster">${s.map((i,a)=>`<button data-nick="${a}" ${i.claimed?"disabled":""}>${he(i.name)}${i.claimed?"<small>signed in</small>":""}</button>`).join("")}</div>
      <p class="hint small">Not on the list? Ask a grown-up to add your name.</p>`,(i,a)=>{const r=i.closest("[data-nick]");if(!r||r.disabled)return;a();const l=s[+r.dataset.nick];l.hasHouse?D0(e,t,n,l.name,void 0):Ih(e,t,n,l.name)},"wide");return}jt(`${Gt}<h2>Pick your street name</h2>${o?`<p class="err">${he(o)}</p>`:""}<div class="nicks">${rp.map((i,a)=>`<button data-nick="${a}">${he(i)}</button>`).join("")}</div>`,(i,a)=>{const r=i.closest("[data-nick]");r&&(a(),Ih(e,t,n,rp[+r.dataset.nick]))},"wide")}function Ih(e,t,n,s){jt(`${Gt}<h2>Hi, ${he(s)}!</h2><p class="hint">What should your house on the street be?</p>
    <div class="bigBtns"><button class="big go" data-m="bring">${pr(2)}<span>Bring my house</span></button>
    <button class="big" data-m="fresh">${pr(5)}<span>Start a new one</span></button></div>`,(o,i)=>{const a=o.closest("[data-m]")?.dataset.m;a&&(i(),D0(e,t,n,s,a==="bring"))})}function jC(e,t){const n=e.myHouseId();if(!n)return;let s=0;for(const o of a0(t)){const i=XE(o);i&&s++<ki&&e.saveArt(n,o,i)}s>ki&&N(`Your first ${ki} paintings came along. The rest stay safe on this iPad!`)}async function D0(e,t,n,s,o){const i=J.get(),a=i.characters[0],r=Ji(a??{});let l;if(o&&(l=i,a)){const{reduce:b}=await h(async()=>{const{reduce:m}=await Promise.resolve().then(()=>p2);return{reduce:m}},void 0);l=b(i,{type:"char/delete",id:a.id})}const c=To(),d={url:e,code:t,id:n,parentKey:c?.id===n||c?.code===t?c.parentKey:void 0},f=i.dog?{name:i.dog.name,breed:i.dog.breed}:null,p=new nl(d),g=await p.connect({nickname:s,look:r,house:l,dog:f});if(g==="ok"){Tn(p.cfg),Mf(p),N(`Welcome to the street, ${s}!`),l&&jC(p,l),BL()&&(AL(),Ie=gt,Oo("dress"));return}p.close(),g.startsWith("nickname")?Lf(e,t,g.endsWith("notOnList")?"That name is not on the list anymore.":"That name is already signed in on another iPad. Ask a grown-up!"):N(g==="full"?"That street is full":"Couldn't join right now")}M("btnParent").addEventListener("click",async()=>{await Tg()&&ml()});const GC={codeTaken:"That code is already used by another street. Try adding a number!",badCode:"Codes are 4–16 letters or numbers.",badName:"Use a first name only (letters).",rosterFull:`Up to ${U2} names.`,nameInUse:"Remove that player first.",codeFixed:"This street's code can't be changed."};async function ml(){const e=To();if(!e)return;if(!e.parentKey){const a=jt(`${Gt}<h2>Grown-up key</h2><p class="hint">Enter the key you got when the street was made</p><form id="keyForm" class="codeForm"><input id="keyInput" autocomplete="off" spellcheck="false"/><button class="go">OK</button></form>`,()=>{});a.root.querySelector("#keyForm").addEventListener("submit",r=>{r.preventDefault(),e.parentKey=a.root.querySelector("#keyInput").value.trim(),Tn(e),v&&(v.cfg.parentKey=e.parentKey),a.close(),ml()});return}let t=v;t||(t=new nl({...e,token:void 0}),await t.connect());const n=t,s=a=>o.root.querySelector(a).value,o=jt(`${Gt}<h2>Grown-up screen</h2><div id="parentBody"><p class="hint">Loading…</p></div>`,async a=>{const r=a.closest("[data-p]");if(!r)return;const l=r.dataset.p;if(l==="free"&&n.parent({op:"freeChat",on:r.dataset.on!=="1"}),l==="freeMail"&&n.parent({op:"freeMail",on:r.dataset.on!=="1"}),l==="rename"&&n.parent({op:"rename",houseId:r.dataset.hid,name:s(`input[data-hid="${r.dataset.hid}"]`)}),l==="add"&&n.parent({op:"rosterAdd",name:r.dataset.name??s("#rosterInput")}),l==="unname"&&n.parent({op:"rosterRemove",name:r.dataset.name}),l==="unclaim"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again";return}n.parent({op:"unclaim",name:r.dataset.name})}if(l==="setcode"&&n.parent({op:"setCode",code:s("#codeEdit")}),l==="remove"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again to remove";return}n.parent({op:"remove",pid:r.dataset.pid})}if(l==="mailClear"||l==="mailClearAll"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent=l==="mailClearAll"?"Tap again to clear every mailbox":r.dataset.id?"Tap again":"Tap again to clear this mailbox";return}l==="mailClearAll"?n.parent({op:"mailClearAll"}):n.parent({op:"mailClear",houseId:r.dataset.hid,...r.dataset.id?{id:r.dataset.id}:{}})}if(l==="leave"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again: forget this street here";return}Tn(null),o.close(),xf(),N("This iPad left the street")}},"wide parent");o.root.addEventListener("submit",a=>{a.preventDefault();const r=a.target.id;r==="rosterForm"&&n.parent({op:"rosterAdd",name:s("#rosterInput")}),r==="codeForm2"&&n.parent({op:"setCode",code:s("#codeEdit")})});const i=a=>{const r=new Date(a);return Number.isFinite(r.getTime())?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r.getMonth()]+" "+r.getDate()+", "+r.getFullYear():""};n.on("parentInfo",a=>{const r=o.root.querySelector("#parentBody");if(!r)return;const l=To();l&&l.code!==a.code&&(l.code=a.code,Tn(l)),n.cfg.code=a.code;const c=a.roster??[],d=new Set(c.map(y=>y.name.toLowerCase())),f=V2.filter(y=>!d.has(y.toLowerCase())),p=c[0]?.name??"Reagan",g=Array.isArray(a.mail)?a.mail:[],b=g.some(y=>y.letters&&y.letters.length),m=Mg(a.settings),k=g.map(y=>`<div class="pMailHouse"><div class="pMailName">${he(y.name||"House")}</div>${(y.letters||[]).slice().reverse().map(u=>`<div class="pLetter"><b>${he(u.from)}</b><span class="pWhen">${he(i(u.at))}</span><p>${he(u.text)}</p><button type="button" class="danger" data-p="mailClear" data-hid="${he(y.houseId)}" data-id="${he(u.id)}">Clear</button></div>`).join("")||'<p class="hint">No letters.</p>'}${(y.letters||[]).length?`<button type="button" class="danger" data-p="mailClear" data-hid="${he(y.houseId)}">Clear this mailbox</button>`:""}</div>`).join("");r.innerHTML=`${a.note?`<p class="err" id="pNote">${he(GC[a.note]??a.note)}</p>`:""}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${he(a.code)}</div></div>
        <div><div class="label">Free typing</div><button class="toggle ${a.settings.freeChat?"on":""}" data-p="free" data-on="${a.settings.freeChat?1:0}" id="pFree">${a.settings.freeChat?"On":"Off (presets only)"}</button><p class="hint small">Chat bubbles. Off means preset phrases only.</p></div>
        <div><div class="label">Let kids type their own letters</div><button class="toggle ${m?"on":""}" data-p="freeMail" data-on="${m?1:0}" id="pFreeMail">${m?"On":"Off (presets only)"}</button><p class="hint small">Letters only. Off means preset phrases only.</p></div></div>
      <div class="label">Letters</div><div id="parentMail">${k||'<p class="hint">No letters right now.</p>'}${b?'<button type="button" class="danger" data-p="mailClearAll" id="mailClearAll">Clear every mailbox</button>':""}</div>
      <form class="pAdd" id="codeForm2"><input id="codeEdit" maxlength="${Ad}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="e.g. ${he(rr(p))}7"/><button data-p="setcode" type="button">Use this code</button></form>
      <p class="hint small">Tip: a word plus a number (like ${he(rr(p))}7) is easy to remember and harder to guess. Not case-sensitive.</p>
      <div class="label">Kids' names (sign-in list)</div>
      <div class="roster">${c.map(y=>`<span class="rName ${y.claimed?"claimed":""}"><b>${he(y.name)}</b>${y.claimed?`<i>signed in</i><button data-p="unclaim" data-name="${he(y.name)}">Reset</button>`:y.hasHouse?"<i>not signed in</i>":`<button class="x" data-p="unname" data-name="${he(y.name)}" aria-label="Remove name">×</button>`}</span>`).join("")||'<p class="hint">No names yet: kids pick a fun nickname instead.</p>'}</div>
      <form class="pAdd" id="rosterForm"><input id="rosterInput" maxlength="20" autocomplete="off" placeholder="First name"/><button data-p="add" type="button">Add</button></form>
      ${f.length?`<div class="sugg">${f.map(y=>`<button data-p="add" data-name="${y}">+ ${y}</button>`).join("")}</div>`:""}
      <div class="label">Houses</div>${a.houses.map(y=>`<div class="pHouse"><input data-hid="${y.id}" value="${he(y.name)}" maxlength="24"/><button data-p="rename" data-hid="${y.id}">Rename</button></div>`).join("")||'<p class="hint">No houses yet.</p>'}
      <div class="label">Players</div>${a.players.map(y=>`<div class="pPlayer"><span class="dot ${y.online?"on":""}"></span>${he(y.nickname)}<button class="danger" data-p="remove" data-pid="${y.pid}">Remove</button></div>`).join("")||'<p class="hint">Nobody has joined yet.</p>'}
      <p class="hint small">Letters stay on the server for up to 30 days. They are filtered, and only a first name is stored. You can clear them here, or turn off “Let kids type their own letters” so new letters use preset phrases. Chat bubbles are only relayed to kids standing nearby and are not saved. No emails or last names. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays).</p>
      <button class="danger wideBtn" data-p="leave">Forget this street on this device</button>`}),n.on("error",a=>{a==="badkey"&&(N("That grown-up key didn't work"),e.parentKey=void 0,Tn(e),o.close())}),n.parent({op:"info"})}let Wt=null;function vs(){return M("park").clientHeight/Ud}const YC=()=>{const e=J.get();return e.characters.find(t=>t.id===e.dog?.owner)??e.characters[0]},kn=()=>v?_e():Wt;function tn(e){v?et(e):Wt=e,B==="ranch"?fs():B==="gameroom"?Ei():oo()}function rs(e="park"){if(v){const n=[],s=[...v.presence.entries()],o=_e();o&&s.push([v.pid,o]);for(const[i,a]of s){const r=v.players.get(i);r&&a.where===e&&n.push({key:i,look:r.look,name:r.nickname,p:a,mine:i===v.pid,dog:r.dog??null})}return n}const t=YC();return Wt&&Wt.where===e?[{key:"solo",look:Ji(t??{}),name:"",p:Wt,mine:!0,dog:J.get().dog??null}]:[]}function Ef(){const e=vs(),t=M("parkWorld"),n=s=>s*e+"px";t.style.width=Dd*e+"px",t.style.height=Ud*e+"px",t.style.setProperty("--sc",String(e)),t.innerHTML=vb()+Lc.map((s,o)=>s.kind==="swing"?`<div class="swing" data-swing="${o}" style="left:${n(s.x-30)};top:${n(Xt)};width:${n(60)};height:${n(240)}">${_b}</div>`:"").join("")+Lc.map((s,o)=>`<button class="pspot k-${s.kind}" data-spot="${o}" aria-label="${s.kind}" style="left:${n(s.x-50)};top:${n(s.y-(s.kind==="swing"?70:55))};width:${n(100)};height:${n(s.kind==="swing"?90:65)}"></button>`).join("")+`<button class="pspot slide" data-act="slide" aria-label="Slide" style="left:${n(ye.ladder-45)};top:${n(ye.top.y-30)};width:${n(130)};height:${n(560-ye.top.y+30)}"></button><button class="pspot pond" data-act="splash" aria-label="Pond" style="left:${n(1235)};top:${n(462)};width:${n(370)};height:${n(105)}"></button><button class="pspot gate" data-act="exit" aria-label="Back to the street" style="left:${n(25)};top:${n(240)};width:${n(180)};height:${n(260)}"></button><div class="ripples" id="ripples"></div><button class="ball" id="ball" aria-label="Ball">${$b}</button><div class="savatars" id="pavatars"></div>`,Ar(),oo(),lt()}const Dh=2400;function oo(){const e=document.getElementById("pavatars");if(!e||B!=="park")return;const t=vs(),n=new Set,s=new Set;for(const o of rs()){n.add(o.key);let i=e.querySelector(`.savatar[data-pid="${o.key}"]`);i||(i=document.createElement("div"),i.className="savatar "+(o.mine?"mine":"other"),i.dataset.pid=o.key,e.appendChild(i),o.mine&&O0(i));const a=JSON.stringify(o.look)+o.name;if(i.dataset.look!==a){const f=i.querySelector(".bubble");i.innerHTML=o.name?vf(o.look,o.name):`<div class="inner">${vt(o.look)}</div>`,f&&i.appendChild(f),i.dataset.look=a}const r=(Ks[o.look.size]??1)*t*.95,l=ks*r,c=yn*r;i.style.left=o.p.x*t-l/2+"px",i.style.top=o.p.y*t-c+"px",i.style.width=l+"px",i.style.height=c+"px",i.style.zIndex=String(100+Math.round(o.p.y)),i.classList.toggle("flipped",o.p.flip),na(i,o.look,o.mine);const d=o.p.pose??"";i.dataset.pose!==d&&(i.classList.remove("pose-sit","pose-swing","pose-slide"),i.offsetWidth,d==="slide"&&(i.style.setProperty("--sx",(ye.top.x-ye.bottom.x)*t+"px"),i.style.setProperty("--sy",(ye.top.y-ye.bottom.y)*t+"px")),d&&i.classList.add("pose-"+d),i.dataset.pose=d),d==="swing"?(i.style.transformOrigin=`50% ${(Xt-o.p.y)*t+c}px`,i.style.animationDelay=-(Date.now()%Dh)/1e3+"s",s.add(o.p.spot??-1)):(i.style.transformOrigin="",i.style.animationDelay="")}e.querySelectorAll(".savatar").forEach(o=>{n.has(o.dataset.pid)||o.remove()}),document.querySelectorAll("#parkWorld .swing").forEach(o=>{const i=s.has(+o.dataset.swing);i&&!o.classList.contains("swinging")&&(o.style.animationDelay=-(Date.now()%Dh)/1e3+"s"),o.classList.toggle("swinging",i)}),co()}function O0(e){e.addEventListener("pointerdown",t=>{t.preventDefault(),t.stopPropagation();const n=kn();if(!n||n.where!=="park"&&n.where!=="ranch"&&n.where!=="barn")return;const s=n.where!=="park",o=n.where;Et=[];const i=M(s?"ranchScroll":"parkScroll"),a=s?on():vs(),r=o==="barn"?wd:s?Yi:Dd,l=w=>{const _=M(s?"ranchWorld":"parkWorld").getBoundingClientRect();return{x:(w.clientX-_.left)/a,y:(w.clientY-_.top)/a}},c=l(t),d={x:n.x-c.x,y:n.y-c.y};let f=t,p=0,g=n.x,b=!1;const m=w=>{const _=l(w),P=kn();if(!P)return;const x=Math.max(60,Math.min(r-60,_.x+d.x)),E=Math.max(470,Math.min(590,_.y+d.y));if(!b&&Math.hypot(x-P.x,E-P.y)<6)return;b=!0;const W=Math.abs(x-g)>3?x<g:P.flip;Math.abs(x-g)>3&&(g=x),tn(o==="barn"?{where:"barn",x,y:E,flip:W}:s?{where:"ranch",x,y:E,flip:W,...P.ride!==void 0?{ride:P.ride}:{}}:{where:"park",x,y:E,flip:W})},k=()=>{const w=i.getBoundingClientRect(),_=f.clientX<w.left+70?-10:f.clientX>w.right-70?10:0;_&&b&&(i.scrollLeft+=_,m(f)),p=requestAnimationFrame(k)};p=requestAnimationFrame(k),e.classList.add("lifted"),R.pick();const y=w=>{w.pointerId===t.pointerId&&(f=w,m(w))},u=w=>{w.pointerId===t.pointerId&&(cancelAnimationFrame(p),window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",u),e.classList.remove("lifted"),R.drop())};window.addEventListener("pointermove",y),window.addEventListener("pointerup",u)})}M("parkWorld").addEventListener("pointerdown",e=>{e.target.closest(".pspot, .ball, .pet")&&e.stopPropagation()});M("parkWorld").addEventListener("click",e=>{const t=e.target,n=kn();if(!n)return;if(t.closest("#ball")){We||R.boing(),eP();return}const s=t.closest("[data-spot]");if(s){const i=+s.dataset.spot,a=Lc[i];if(n.spot===i&&n.pose){tn({where:"park",x:a.x,y:Math.min(590,a.y+40),flip:n.flip}),R.drop();return}if(rs().some(r=>!r.mine&&r.p.spot===i&&r.p.pose)){N("Someone is already there!"),R.pop();return}tn({where:"park",x:a.x,y:a.y,flip:n.flip,pose:a.kind==="swing"?"swing":"sit",spot:i}),a.kind==="swing"?R.boing():R.drop();return}const o=t.closest("[data-act]")?.dataset.act;if(o==="slide"&&(tn({where:"park",x:ye.bottom.x,y:ye.bottom.y,flip:!1,pose:"slide"}),R.swish(),setTimeout(()=>{const i=kn();i?.pose==="slide"&&tn({where:"park",x:i.x,y:i.y,flip:i.flip})},1500)),o==="splash"){const i=M("parkWorld").getBoundingClientRect(),a=(e.clientX-i.left)/vs();H0(a),v?.fx({k:"splash",x:a})}o==="exit"&&W0()});function H0(e){const t=document.getElementById("ripples");if(!t||B!=="park")return;const n=vs();for(let s=0;s<2;s++){const o=document.createElement("div");o.className="ripple";const i=(120+s*70)*n;Object.assign(o.style,{left:e*n-i/2+"px",top:512*n-i*.18+"px",width:i+"px",height:i*.36+"px",animationDelay:s*.15+"s"}),t.appendChild(o),setTimeout(()=>o.remove(),1400)}for(let s=0;s<6;s++){const o=document.createElement("div");o.className="drop",Object.assign(o.style,{left:e*n+"px",top:505*n+"px"}),o.style.setProperty("--dx",(s-2.5)*14+"px"),t.appendChild(o),setTimeout(()=>o.remove(),900)}R.splash()}function KC(){fo(),Et=[],ze=!1,B="park",M("park").classList.remove("hidden"),la(M("park"));const e={where:"park",x:290,y:548,flip:!1};v?et(e):Wt=e,M("streetTitle").textContent="The Park",bn(),Ef(),requestAnimationFrame(()=>{const t=M("parkScroll");t.scrollLeft=0,lt()}),R.sparkle()}function W0(){Co()}function XC(){return $l()&&!document.body.classList.contains("phone")}function Oh(){return $l()?520:280}function JC(){fo(),Et=[],ze=!1,B="gameroom",M("gameroom").classList.remove("hidden");const e=qo(),t=e?{where:"gameroom",x:e.x,y:Math.max(Qs,Math.min(Dn,e.y)),flip:!1}:{where:"gameroom",x:Oh(),y:560,flip:!1};v?et(t):Wt=t,M("streetTitle").textContent="The Clubhouse",bn(),ef(),requestAnimationFrame(()=>{const n=bs(),s=M("grScroll"),o=e?.x??(XC()?60+Iu/2:Oh());s.scrollLeft=Math.max(0,o*n-s.clientWidth/2),lt(),dm()}),la(M("gameroom")),R.sparkle()}M("btnLeavePark").addEventListener("click",()=>{B==="ranch"&&ze?ji(!1):W0()});let Yn={x:2620,y:565},We=null;function Ar(e=!1){const t=document.getElementById("ball");if(!t)return;const n=vs(),s=34*n;e||t.classList.remove("flying"),t.style.left=Yn.x*n-s/2+"px",t.style.top=Yn.y*n-s+"px",t.style.width=t.style.height=s+"px"}function eP(){if(We)return;const e=ht.x0+40+Math.random()*(ht.x1-ht.x0-80),t=ht.y0+25+Math.random()*(ht.y1-ht.y0-35);U0(v?v.pid:"solo",e,t),v?.fx({k:"ball",x:e,y:t})}function U0(e,t,n){if(B!=="park")return;const s=document.getElementById("ball");Yn={x:t,y:n},We={thrower:e,phase:"fly",dog:null,until:performance.now()+12e3},s&&(s.classList.remove("flying"),s.offsetWidth,s.classList.add("flying"),Ar(!0)),R.boing(),setTimeout(()=>{We?.phase==="fly"&&(We.phase="chase",document.getElementById("ball")?.classList.remove("flying"),Kn.size||(We=null))},650)}function tP(e){if(!v)return Wt;const t=e===v.pid?_e():v.presence.get(e);return t&&t.where==="park"?t:null}const Kn=new Map,rc=e=>(t,n,s,o,i)=>{t.style.left=(n-o/2)*e+"px",t.style.top=(s-i)*e+"px",t.style.width=o*e+"px",t.style.height=i*e+"px"};function nP(){const e=[];if(B==="house"){const t=C.get(),n={box:j,place:lo,z:s=>String(4e3+Math.round(s)),scale:1};if(v&&Pe!==J){const s=[...v.presence.entries()],o=_e();o&&s.push([v.pid,o]);for(const[i,a]of s){const r=v.players.get(i)?.dog;if(r&&a.where==="house"&&a.houseId===be&&a.room===t.currentRoom){const l=St(t.currentRoom,Hn(i,a),a);e.push({key:i,dog:r,x:l.x,y:l.y,flip:a.flip,...n})}}}else if(t.dog){const s=t.characters.find(o=>o.id===t.dog.owner)??t.characters[0];if(s&&s.room===t.currentRoom){const o=St(s.room,Pt(s),s);e.push({key:"solo",dog:t.dog,x:o.x,y:o.y,flip:s.flip,...n})}}}else if(B==="park"){const t=document.getElementById("pavatars");if(!t)return e;const n=vs();for(const s of rs())s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:rc(n),z:o=>String(Math.round(o)-200),scale:.95})}else if(B==="ranch"){const t=document.getElementById("ravatars");if(!t)return e;const n=on();for(const s of rs(ze?"barn":"ranch"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:rc(n),z:o=>String(100+Math.round(o)),scale:.95,riding:s.p.ride!==void 0})}else if(B==="gameroom"){const t=document.getElementById("gavatars");if(!t)return e;const n=bs();for(const s of rs("gameroom"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:rc(n),z:o=>String(Math.round(o)-200),scale:.95})}return e}let Hh=performance.now();function sP(e,t){const n=new Set;for(const s of nP()){if(aP(s.key))continue;n.add(s.key);let o=Kn.get(s.key);const i=s.flip?1:-1,a=!s.riding&&B==="house"&&C.get().currentRoom==="backyard",r=s.riding?200:78;let l=a?Lp.x:s.x+i*r;s.riding?l=Math.max(50,Math.min(Yi-50,l)):B==="house"&&!a&&(l=F0(l,46));const c=a?Lp.y:Math.min(595,s.y+(s.riding?28:6));if(!o||o.box!==s.box||!o.el.isConnected){o?.el.remove();const _=document.createElement("div");_.className="pet pet-dog",_.dataset.dog=s.key,s.box.appendChild(_),oP(_,s.key),o={el:_,box:s.box,x:l,y:c,flip:s.flip,pose:"",look:"",idle:1,trickUntil:0,sitTrick:!1},Kn.set(s.key,o)}let d=l,f=c,p=s.riding?980:320;if(We&&e>We.until&&(We=null,Ar()),We&&B==="park"){if(We.phase==="chase")d=Yn.x,f=Yn.y,p=950,Math.hypot(o.x-d,o.y-f)<28&&(We.phase="carry",We.dog=s.key,R.woof());else if(We.phase==="carry"&&We.dog===s.key){const _=tP(We.thrower)??{x:(ht.x0+ht.x1)/2,y:540};d=_.x+60,f=Math.min(590,_.y+6),p=750,Yn={x:o.x+(o.flip?-40:40),y:o.y-30*s.scale},Math.hypot(o.x-d,o.y-f)<26&&(Yn={x:_.x+70,y:Math.min(590,_.y+12)},We=null,Ya(o,"♥"),R.sparkle()),Ar()}}const g=e<o.trickUntil,b=d-o.x,m=f-o.y,k=Math.hypot(b,m);let y=!1;if(k>(We?4:10)&&!g){const _=ys()?k:Math.min(k,p*t);o.x+=b/k*_,o.y+=m/k*_,y=!0,Math.abs(b)>1.5&&(o.flip=b<0),o.idle=0}else o.idle+=t,!g&&o.idle>.3&&Math.abs(s.x-o.x)>4&&(o.flip=s.x<o.x);const u=g&&o.sitTrick?"sit":y?"stand":o.idle>.9?"sit":"stand",w=u+s.dog.breed;if(o.pose+o.look!==u+w){for(const _ of[...o.el.children])_.matches(".bubble, .kennelBtn")||_.remove();o.el.insertAdjacentHTML("afterbegin",`<div class="inner">${Hi(s.dog.breed,u)}</div>`),o.pose=u,o.look=w}o.el.dataset.name=s.dog.name,o.el.classList.toggle("walking",y),o.el.classList.toggle("flipped",o.flip),s.place(o.el,o.x,o.y,92*s.scale,71*s.scale),o.el.style.zIndex=s.z(o.y+1),N0(o.el,s.key,!1)}for(const[s,o]of Kn)n.has(s)||(o.el.remove(),Kn.delete(s))}function Ya(e,t){e.el.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.el.appendChild(n),Zo(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const Wh=new Map;function V0(e,t){const n=Kn.get(e);if(!n)return;const s=n.el.dataset.name??"";n.trickUntil=performance.now()+1400,n.sitTrick=t===0,n.el.classList.remove("spin","hop"),n.el.offsetWidth,t===0&&(Ya(n,`${s} sits! 🐾`),R.pop()),t===1&&(n.el.classList.add("spin"),Ya(n,"Wheee! ✨"),R.spin()),t===2&&(n.el.classList.add("hop"),Ya(n,"Woof! Woof!"),R.woof())}function oP(e,t){e.addEventListener("pointerdown",n=>{n.stopPropagation(),n.preventDefault()}),e.addEventListener("click",n=>{n.stopPropagation();const s=(Wh.get(t)??0)%3;Wh.set(t,s+1),V0(t,s),v&&v.fx({k:"trick",owner:t,v:s})})}function yl(e){const t=e?.dogKennel?.item;if(!t||!e)return null;for(const n of Object.values(e.rooms)){const s=n.items.find(o=>o.id===t&&o.kind==="kennel");if(s)return s}return null}function iP(e){if(e==="solo")return J.get();if(!v)return null;const t=v.players.get(e)?.houseId;return t?v.view(t):null}function aP(e){return!!yl(iP(e))}function Sf(){if(v){const e=v.myHouseId();return e?v.view(e):null}return J.get()}function z0(){if(B!=="house")return null;const e=C.get(),t=yl(e);if(!t||!e.rooms[e.currentRoom]?.items.some(n=>n.id===t.id))return null;if(v&&Pe!==J){const n=v.houses.get(be)?.meta.ownerId,s=n?v.players.get(n)?.dog??null:null;return!n||!s?null:{key:n,dog:s,item:t}}return e.dog?{key:"solo",dog:e.dog,item:t}:null}function rP(){const e=Sf();if(!e)return null;const t=Dr()?C.get().currentRoom:null;let n=null,s=null;for(const[o,i]of Object.entries(e.rooms))for(const a of i.items)a.kind==="kennel"&&((!n||a.z>=n.z)&&(n=a),o===t&&(!s||a.z>=s.z)&&(s=a));return s??n}function Ta(e){if(!Tf()){N("Adopt a dog first!");return}yi({type:"dog/kennel",item:e}),e?(R.pop(),N("Rest well, puppy!")):(R.woof(),N("Come on, puppy!"))}function Cf(e){if(!Tf()){N("Adopt a dog first!");return}const t=yl(Sf());if(e===void 0){if(t){Ta(null);return}const n=rP();if(!n){N("Put a dog kennel down first!");return}Ta(n.id);return}t?.id===e?Ta(null):Ta(e)}function Q0(e){const t=C.get(),n=t.rooms[t.currentRoom]?.items.find(s=>s.id===e);if(n){if(n.kind==="kennel"){Dr()&&Cf(n.id);return}n.kind==="cat-tower"&&kP()}}function lP(e,t){const n=C.get(),s=n.rooms[n.currentRoom]?.items.find(i=>i.id===t);if(!s)return;if(s.art){R.click(),iS(vr(s.frame??0,Cu(s.art),!1));return}const o=jy(s.kind);if(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),R.click(),o==="kennel"||o==="tower"){Q0(t);return}if(jh(s.kind)){OL();const i=!s.on;C.dispatch({type:"item/power",room:n.currentRoom,id:t,on:i}),i&&Jn(s.kind)==="tv"&&pP(s),ls();return}if(!k9(s.kind,t,n.soundOn,ls)){if(o==="open"){e.classList.toggle("opened"),ls();return}if(o==="lamp"){e.classList.toggle("lamp-on");return}o==="sit"&&q0(s),o==="swing"&&hP(s)}}const Uh={dance:Ae*2,sway:Ae*4,watch:Ae*5,warm:Ae*3,hug:Ae*2,bounce:Ae,bathe:Ae*3,nibble:Ae,...u9},cP={dance:"<span>♪</span><span>♫</span>",sway:"<span>♪</span>",hug:"<span>♥</span>",bathe:'<span class="bub"></span><span class="bub"></span><span class="bub"></span>',nibble:"<span>✦</span>",...m9},Ra={stereo:"<span>♪</span><span>♫</span><span>♪</span>",musicbox:"<span>♪</span><span>♩</span>",tv:'<span class="glow"></span>',fire:'<span class="glow"></span><span class="ember"></span><span class="ember"></span>',tub:'<span class="bub"></span><span class="bub"></span><span class="bub"></span><span class="bub"></span>',fridge:'<span class="food">🍓</span><span class="food">🧁</span>',...y9},lc=new Map;let cc=0;setInterval(()=>ls(),1e3);function ls(){cc||(cc=requestAnimationFrame(()=>{cc=0,dP()}))}function Is(e,t,n){let s=e.querySelector(":scope > .ambFx");if(!t){s?.remove();return}s||(s=document.createElement("i"),s.className="ambFx",s.setAttribute("aria-hidden","true"),e.appendChild(s)),s.dataset.k!==n&&(s.innerHTML=t,s.dataset.k=n,s.className="ambFx fx-"+n)}function Vh(e,t,n){const s=t?t.kind+"|"+t.item:"",o=e.dataset.amb||"";if(o!==s){if(o&&e.classList.remove("amb-"+o.split("|")[0],"amb-l","amb-r"),o.startsWith("bathe|")&&!t&&(e.classList.add("amb-sparkle"),setTimeout(()=>e.classList.remove("amb-sparkle"),1200)),!t){delete e.dataset.amb,Is(e,null,"");return}e.dataset.amb=s,e.style.setProperty("--amb-delay",Vs(t.phase,Uh[t.kind],n)+"ms"),e.style.setProperty("--amb-period",Uh[t.kind]+"ms"),e.classList.add("amb-"+t.kind,t.face<0?"amb-l":"amb-r"),Is(e,cP[t.kind]??null,t.kind)}}function dP(){const e=C.get(),t=e.rooms[e.currentRoom];if(B!=="house"||!t){Vp(null);return}const n=Date.now(),s=new Set;for(const m of t.items){if(Jn(m.kind)!=="musicbox")continue;if(!m.on){lc.delete(m.id);continue}const k=lc.get(m.id)??(lc.set(m.id,n),setTimeout(ls,Zf+60),n);n-k>=Zf&&s.add(m.id)}const o=new Set;j.querySelectorAll(".item.opened").forEach(m=>{m.dataset.id&&o.add(m.dataset.id)});const i=t.items.map(m=>{const k=ge[m.kind];return{id:m.id,kind:m.kind,x:m.x,y:m.y,on:!!m.on,w:k?pf(k,Ye(m)).w:200}}),a=[],r=new Map;for(const m of e.characters){const k=Ot.get(m.id);if(m.room!==e.currentRoom||!k||k.classList.contains("lifted"))continue;const y=Pt(m)?.pose;a.push({id:m.id,x:m.x,y:m.y,seated:y==="sit",lying:y==="lie"}),r.set(m.id,k)}if(v&&Pe!==J){const m=[...v.presence.entries()],k=_e();k&&m.push([v.pid,k]);for(const[y,u]of m){const w=Ws.get(y);if(!w||!w.isConnected||u.where!=="house"||u.houseId!==be||u.room!==e.currentRoom||w.classList.contains("lifted"))continue;const _=Hn(y,u)?.pose;a.push({id:"p:"+y,x:u.x,y:u.y,seated:_==="sit",lying:_==="lie"}),r.set("p:"+y,w)}}const l=w9(n),c=Am(i,a,{fridgesOpen:o,musicBoxDone:s,keysPlaying:l}),d=VL(i,c);if(d)for(const m of d.dancers){const k=c.get(m);k&&c.set(m,{...k,phase:0,face:k.face})}for(const m of[...Ot.values(),...Ws.values()])[...r.values()].includes(m)||Vh(m,void 0,n);r.forEach((m,k)=>Vh(m,c.get(k),n));const f=new Set([...c.values()].filter(m=>m.kind==="bathe").map(m=>m.item));let p=null;for(const m of t.items){const k=j.querySelector(`.item[data-id="${m.id}"]`);if(!k)continue;const y=Jn(m.kind),u=!!m.on&&!!y&&!s.has(m.id);if(k.classList.toggle("amb-on",u),u)k.dataset.amb=y,k.style.getPropertyValue("--amb-delay")||k.style.setProperty("--amb-delay",Vs(0,Ae,n)+"ms"),y==="stereo"?p="stereo":y==="musicbox"&&!p&&(p="musicbox"),Is(k,Ra[y],y);else if(Ho(m.kind)&&f.has(m.id))Is(k,Ra.tub,"tub");else if(Wo(m.kind)&&o.has(m.id))Is(k,Ra.fridge,"fridge");else{const w=v9(m.kind,m.id,c,l,o,f.size>0);k.classList.toggle("soc-ducky",w==="ducky"),w?Is(k,Ra[w]||null,w):(delete k.dataset.amb,Is(k,null,""))}}fP(d,n),Vp(p);const g=new Map;for(const m of a)g.set(m.id,{el:r.get(m.id),d:m});const b=e.baby&&e.baby.room===e.currentRoom&&!e.baby.holder?{x:e.baby.x,y:e.baby.y}:null;$9({layer:j,roomW:Mt,seed:be||"local",now:n,reduced:ys(),dolls:g,baby:b},c)}let dc="";function fP(e,t){const n=M("partyFx"),s=!!e&&B==="house";document.body.classList.toggle("party-on",s),n.classList.toggle("on",s),s?(n.style.setProperty("--px",e.x/pe*100+"%"),dc!==e.stereo&&(n.style.setProperty("--amb-delay",Vs(0,Ae,t)+"ms"),dc=e.stereo)):dc="";const o=new Set(s?e.toys:[]);j.querySelectorAll(".item").forEach(c=>{const d=o.has(c.dataset.id||"");d!==c.classList.contains("party-bounce")&&(c.classList.toggle("party-bounce",d),d&&c.style.setProperty("--amb-delay",Vs(0,Ae,t)+"ms"))});const i=s?j.querySelector(`.item[data-id="${e.stereo}"]`):null,a=sf.getBoundingClientRect(),r=a.width?pe/a.width:1,l=i?.getBoundingClientRect();j.querySelectorAll(".pet").forEach(c=>{let d=!1;if(l){const f=c.getBoundingClientRect();d=Math.hypot((f.left+f.width/2-l.left-l.width/2)*r,(f.bottom-l.bottom)*r*1.5)<=UL&&!c.classList.contains("leap")&&!c.classList.contains("curl")}d!==c.classList.contains("party-hop")&&(c.classList.toggle("party-hop",d),d&&c.style.setProperty("--amb-delay",Vs(.5,Ae*2,t)+"ms"))})}function pP(e){const t=C.get();if(v&&B==="house"){const s=_e();if(!s||s.where!=="house"||s.seat)return}else{const s=t.characters.find(o=>o.id===Ie&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(!s||s.seat)return}const n=t.rooms[t.currentRoom].items.filter(s=>ao(s.kind)?.pose==="sit"&&Math.abs(s.x-e.x)<520).sort((s,o)=>Math.abs(s.x-e.x)-Math.abs(o.x-e.x))[0];n&&q0(n)}let Ht=null,ui=!1;function Ir(){j.querySelectorAll(".item.swinging").forEach(e=>{(!Ht||e.dataset.id!==Ht.item)&&e.classList.remove("swinging")}),Ht&&j.querySelector(`.item[data-id="${Ht.item}"]`)?.classList.add("swinging")}function hP(e){const t=C.get(),n=t.characters.find(i=>i.id===Ie&&i.room===t.currentRoom)??t.characters.find(i=>i.room===t.currentRoom);if(!n)return;if(Ht?.id===n.id&&Ht.item===e.id){Ht=null,ui=!0,C.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x+70,y:Math.max(e.y,520)}),ui=!1,Ir();return}const s=ge[e.kind],o=e.y-(s?je(s)*Ye(e)*.26:40);Ht={id:n.id,item:e.id},ui=!0,C.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x,y:o}),ui=!1,Ir()}function q0(e){const t=pl(e);if(!t)return;if(v&&B==="house"){const i=_e();if(!i||i.where!=="house")return;if(!v.speaksSit){const r="p:"+v.pid,l=gn.get(r)?.item===e.id,c=Math.max(Js+40,t.footY-8);l?gn.delete(r):gn.set(r,{item:e.id,pose:t&&ao(e.kind).pose,n:0});const{seat:d,...f}=i;et({...f,x:e.x,y:c,flip:!1}),Ct();return}const a=Ri({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:Ni(void 0,v.pid),alreadyOn:i.seat?.id===e.id?e.id:null});if(a.toast){N(a.toast),R.pop();return}if(!a.moved)return;Fa(i,a.x,a.y,!1,a.seat?{id:a.seat.item,pose:a.seat.pose,n:a.seat.n}:null),Ct(),to(!1);return}const n=C.get(),s=n.characters.find(i=>i.id===Ie&&i.room===n.currentRoom)??n.characters.find(i=>i.room===n.currentRoom);if(!s)return;const o=Ri({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:Ni(s.id),alreadyOn:s.seat?.item===e.id?e.id:null});if(o.toast){N(o.toast),R.pop();return}o.moved&&(gi(s.id,n.currentRoom,o.x,o.y,o.seat),to(!1))}function N0(e,t,n){const s=v?t===v.pid:t==="solo";let o=e.querySelector(".kennelBtn");if(!s){o?.remove();return}o||(o=document.createElement("button"),o.type="button",o.className="kennelBtn",o.addEventListener("pointerdown",i=>{i.stopPropagation(),i.preventDefault()}),o.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault(),Cf()}),e.appendChild(o)),o.textContent=n?"Out":"Kennel",gP(o)}function gP(e){if(B!=="house"){e.style.left=e.style.right=e.style.top=e.style.bottom=e.style.transform="";return}const t=e.parentElement;if(!t)return;const n=F.getBoundingClientRect().width/F.offsetWidth||1,s=F.getBoundingClientRect(),o=4,i={l:s.left+o,t:s.top+o,r:s.right-o,b:s.bottom-o},a=j.querySelector(".char")?.getBoundingClientRect(),r=j.querySelector('.item[data-kind="sofa"]')?.getBoundingClientRect(),l=[...j.querySelectorAll(".pet-cat, .item")].map(H=>H.getBoundingClientRect()).filter(H=>H.width>2&&H.height>2),c=(H,U)=>!!U&&H.left<U.right-1&&H.right>U.left+1&&H.top<U.bottom-1&&H.bottom>U.top+1,d=(H,U)=>c(H,U)?Math.max(0,Math.min(H.right,U.right)-Math.max(H.left,U.left))*Math.max(0,Math.min(H.bottom,U.bottom)-Math.max(H.top,U.top)):0,f=H=>{let U=0;H.left<i.l&&(U+=(i.l-H.left)*8),H.right>i.r&&(U+=(H.right-i.r)*8),H.top<i.t&&(U+=(i.t-H.top)*8),H.bottom>i.b&&(U+=(H.bottom-i.b)*8),U+=d(H,a)*4,U+=d(H,r)*4;for(const tt of l)U+=d(H,tt)*4;return U},p=t.getBoundingClientRect(),g=!a||p.left+p.width/2<=a.left+a.width/2,b=H=>({left:H?"0px":"auto",right:H?"auto":"0px",top:"46%",bottom:"auto",transform:H?"translate(-108%, -50%)":"translate(108%, -50%)"}),m=[b(g),b(!g),{left:"50%",right:"auto",top:"0px",bottom:"auto",transform:"translate(-50%, -115%)"}];let k=m[0],y=1/0;for(const H of m){Object.assign(e.style,H);const U=f(e.getBoundingClientRect());U<y&&(y=U,k=H)}Object.assign(e.style,k);let u=e.getBoundingClientRect(),w=0,_=0;u.left<i.l&&(w+=i.l-u.left),u.right>i.r&&(w-=u.right-i.r),u.top<i.t&&(_+=i.t-u.top),u.bottom>i.b&&(_-=u.bottom-i.b);const P=H=>{if(!H)return;const U=()=>new DOMRect(u.left+w,u.top+_,u.width,u.height);if(!c(U(),H))return;const tt=Math.min(U().bottom,H.bottom)-Math.max(U().top,H.top),ft=H.bottom+4-U().top,qe=H.top-4-U().bottom,De=rn=>U().top+rn>=i.t&&U().bottom+rn<=i.b;if(tt<u.height*.5&&De(ft)){_+=ft;return}if(tt<u.height*.5&&De(qe)){_+=qe;return}const Se=H.left-i.l,ut=i.r-H.right,mt=H===r?a:r,_s=(rn,xl)=>{if(!mt)return!1;const $s=xl?rn-u.width:rn,Fo=new DOMRect($s,U().top,u.width,u.height);return c(Fo,mt)};ut>=u.width+4&&!_s(H.right+4,!1)?w+=H.right+4-U().left:Se>=u.width+4&&!_s(H.left-4,!0)?w+=H.left-4-U().right:De(ft)?_+=ft:De(qe)&&(_+=qe)};P(a),P(r);const x=t.querySelector(".inner")?.getBoundingClientRect(),E=x&&x.width>2?x:p,W=j.querySelector(".pet-cat")?.getBoundingClientRect(),V=j.querySelector('.item[data-kind="sandbox"]')?.getBoundingClientRect(),ne=j.querySelector('.item[data-kind="yard-bench"]')?.getBoundingClientRect(),Y=[...j.querySelectorAll('.item[data-kind="yard-swing"], .item[data-kind="picnic-blanket"], .item[data-kind="lemonade-cart"], .item[data-kind="tulip-bed"]')].map(H=>H.getBoundingClientRect()),K=F.querySelector(".yardDoor"),an=K?[K,K.querySelector(".yardHintLabel"),K.querySelector(".doorArt")].map(H=>H?.getBoundingClientRect()):[],Vt=document.getElementById("secrets"),Ke=Vt&&Vt.offsetParent?Vt.getBoundingClientRect():void 0,I=Ke&&Ke.width>2&&Ke.left<i.r&&Ke.right>i.l&&Ke.top<i.b&&Ke.bottom>i.t?Ke:void 0,O=I?new DOMRect(I.left-8,I.top-8,I.width+16,I.height+16):void 0,X=[a,r,W,V,ne,O,...Y,...an].filter(H=>!!H&&H.width>2&&H.height>2),Q=new DOMRect(u.left+w,u.top+_,u.width,u.height),q=E.left+E.width/2,ee=E.top+E.height/2,ue=H=>Math.hypot(H.left+H.width/2-q,H.top+H.height/2-ee),Ee=H=>{const U=Math.min(H.right,E.right)-Math.max(H.left,E.left),tt=Math.min(H.bottom,E.bottom)-Math.max(H.top,E.top);return U>1&&tt>1},we=H=>H.left>=i.l-.5&&H.right<=i.r+.5&&H.top>=i.t-.5&&H.bottom<=i.b+.5&&X.every(U=>!c(H,U))&&!Ee(H);let Qe=Q;if(!we(Q)||ue(Q)>150){const H=[],U=(qe,De)=>{let Se=qe,ut=De;Se<i.l&&(Se=i.l),ut<i.t&&(ut=i.t),Se+u.width>i.r&&(Se=Math.max(i.l,i.r-u.width)),ut+u.height>i.b&&(ut=Math.max(i.t,i.b-u.height)),H.push(new DOMRect(Se,ut,u.width,u.height))};U(E.left+(E.width-u.width)/2,E.top-u.height-8),U(E.right-u.width,E.top-u.height-6),U(E.left,E.top-u.height-6),a&&U(a.right+6,E.top-u.height-8),ne&&U(ne.left-u.width-6,ne.top-u.height-6),a&&ne&&U(a.right+6,ne.top-u.height-6),a&&(U(a.left-12,a.top-u.height-8),U(i.l,a.top-u.height-10),U(a.left+(a.width-u.width)/2,a.top-u.height-8)),U(i.r-u.width,E.top-u.height-6),U(E.right+8,E.top+(E.height-u.height)/2),U(E.left-u.width-8,E.top+(E.height-u.height)/2),U(Q.left,Q.top);for(const qe of[u.width*.65,u.width*1.05,88,120,155])for(let De=0;De<8;De++){const Se=De*Math.PI/4;U(q+Math.cos(Se)*qe-u.width/2,ee+Math.sin(Se)*qe-u.height/2)}const tt=qe=>{let De=1/0,Se=null;for(const ut of H){if(!we(ut)||ue(ut)>qe)continue;const mt=ue(ut);mt<De&&(De=mt,Se=ut)}return Se},ft=tt(170)??tt(360);if(ft)Qe=ft;else if(!we(Q)){let qe=null,De=1/0;for(const Se of H){if(Se.left<i.l-.5||Se.right>i.r+.5||Se.top<i.t-.5||Se.bottom>i.b+.5)continue;const mt=(Ee(Se)?1e4:0)+X.reduce((_s,rn)=>_s+d(Se,rn),0)+ue(Se);mt<De&&(De=mt,qe=Se)}qe&&(Qe=qe)}}w+=Qe.left-Q.left,_+=Qe.top-Q.top,(w||_)&&(e.style.transform=`${e.style.transform} translate(${(w/n).toFixed(1)}px, ${(_/n).toFixed(1)}px)`)}function uP(e,t){e.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.appendChild(n),Zo(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const mi=new Map;function mP(){const e=new Set,t=z0();if(t){e.add(t.key);const n=Wy(t.dog.name,Date.now()),s=ge[t.item.kind],i=(s?ro(s,t.item.y):Math.min(t.item.y,Re-Uu))-(n==="peek"?24:2);let a=mi.get(t.key);if(!a||!a.el.isConnected){a?.el.remove();const l=document.createElement("div");l.className="pet pet-dog kenneled",l.dataset.dog="kennel:"+t.key,j.appendChild(l),l.addEventListener("pointerdown",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),c.preventDefault())}),l.addEventListener("click",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),uP(l,`${l.dataset.name??"Puppy"} is resting`))}),a={el:l,pose:"",look:"",x:t.item.x,y:i},mi.set(t.key,a)}const r=n==="rest"?"sleep":"sit";if(a.pose!==r||a.look!==n+t.dog.breed){for(const l of[...a.el.children])l.matches(".bubble, .kennelBtn")||l.remove();a.el.insertAdjacentHTML("afterbegin",`<div class="inner">${Hi(t.dog.breed,r)}</div>${n==="rest"?'<div class="zzz"><b>Zzz</b><i>z</i><i>z</i><i>z</i></div>':""}`),a.pose=r,a.look=n+t.dog.breed}a.el.dataset.name=t.dog.name,a.el.classList.toggle("rest",n==="rest"),a.el.classList.toggle("peek",n==="peek"),a.x=t.item.x,a.y=i,lo(a.el,t.item.x,i,100,77),a.el.style.zIndex=String(1e3+t.item.z+1),N0(a.el,t.key,!0)}for(const[n,s]of mi)e.has(n)||(s.el.remove(),mi.delete(n))}let de=null,Ba="",fc=0,Pf=0,Ka={x:0,perch:0,leap:!1};const yP=562;function Z0(e){return(e.rooms[e.currentRoom]?.items.filter(n=>n.kind==="cat-tower")??[]).reduce((n,s)=>!n||s.z>=n.z?s:n,null)}function zh(e){return e==="cat-bed"||e==="pet-bed"||e==="dog-bed"||e==="pack:cat-bed"||/(?:^|:)cat-bed$|(?:^|:)pet-bed$/.test(e)}function bP(e){const t=e.rooms[e.currentRoom]?.items??[],n=t.filter(a=>zh(a.kind)),s=t.filter(a=>a.kind==="bed"),o=(n.length?n:s).reduce((a,r)=>!a||r.z>=a.z?r:a,null);if(!o)return null;const i=ge[o.kind];return{x:o.x,y:o.y,h:i?je(i)*Ye(o):80,pet:zh(o.kind)}}function kP(){const e=C.get();!e.cat||e.cat.room!==e.currentRoom||!Z0(e)||(Pf=performance.now()+900,R.boing(),v?.fx({k:"leap"}))}function wP(){const e=C.get(),t=B==="house"?e.cat:null;if(!t||t.room!==e.currentRoom){de&&(de.remove(),de=null,Ba="",fc=0);return}(!de||!de.isConnected)&&(de=document.createElement("div"),de.className="pet pet-cat",j.appendChild(de),Ba="",de.addEventListener("pointerdown",x=>{x.stopPropagation(),x.preventDefault()}),de.addEventListener("click",x=>{x.stopPropagation(),j0(),v&&v.fx({k:"purr"})}));const n=Z0(e),s=n?null:bP(e),o=n?ge[n.kind]:void 0,i=n&&o?je(o)*Ye(n):0,a=Uy(t,Date.now(),n?{x:n.x}:null,s?{x:s.x}:null,ys()),r=!!n&&performance.now()<Pf,l=r?2:a.perch,c=r&&n?n.x:a.x,d=r?"play":a.mood,f=d==="walk"?"stand":d==="nap"?"nap":"sit",p=f+t.coat+(l?"p":"");if(p!==Ba){const x=[...de.querySelectorAll(".bubble, .heart")];de.innerHTML=`<div class="inner">${Ro(t.coat,f)}</div>${f==="nap"?'<div class="zzz"><i>z</i><i>z</i><i>z</i></div>':""}`;for(const E of x)de.appendChild(E);Ba=p}if(l>0&&fc===0){de.classList.add("hop");const x=de;setTimeout(()=>x.classList.remove("hop"),420)}fc=l,de.dataset.name=t.name,de.dataset.mood=d,de.dataset.perch=String(l),de.dataset.leap=r?"1":"0",de.dataset.curl=a.curl?"1":"0",de.classList.toggle("walking",d==="walk"),de.classList.toggle("groom",d==="groom"),de.classList.toggle("play",d==="play"&&!r),de.classList.toggle("leap",r),de.classList.toggle("flipped",a.flip),de.classList.toggle("curl",a.curl===1),j.querySelectorAll(".item.toy-live").forEach(x=>x.classList.remove("toy-live")),n&&d==="play"&&l&&!r&&j.querySelector(`.item[data-id="${n.id}"]`)?.classList.add("toy-live");const g=window.__pinCat,b=!!(g&&Number.isFinite(g.x)),m=b&&Number.isFinite(g.y)?g.y:yP,k=!b&&l&&n?Hy(n.y,i,l):!b&&a.curl&&s?s.y-s.h*(s.pet?.38:.2):m,y=e.currentRoom==="backyard"&&!l,u=!b&&l?92:y?115:128,w=!b&&l?110:y?135:150,_=b?g.x:e.currentRoom==="backyard"?ss.x:F0(c,w/2),P=!b&&e.currentRoom==="backyard"&&!l?ss.y:k;lo(de,_,P,w,u),de.style.zIndex=String(4e3+Math.round(P)),Ka={x:_,perch:l,leap:r}}function F0(e,t){const n=C.get().currentRoom,s=n==="backyard"?Qg:n==="living"?zg:null;if(!s)return e;const o=s.x-s.w/2-t-16,i=s.x+s.w/2+t+16;return e<=o||e>=i?e:e<s.x?o:i}function j0(){if(!de)return;R.purr(),setTimeout(()=>R.meow(),250),de.querySelector(".bubble")?.remove();const e=document.createElement("div");e.className="bubble petBubble",e.textContent=`${de.dataset.name} purrs ♥`,de.appendChild(e),Zo(),setTimeout(()=>e.classList.add("out"),1500),setTimeout(()=>e.remove(),1900),de.classList.remove("happy"),de.offsetWidth,de.classList.add("happy");for(let t=0;t<5;t++){const n=document.createElement("div");n.className="heart",n.textContent="♥",n.style.left=20+Math.random()*60+"%",n.style.animationDelay=t*.12+"s",n.style.color=["#ff6b9a","#ff8fab","#e879c6"][t%3],de.appendChild(n),setTimeout(()=>n.remove(),1800)}}function vP(e,t){if(t.k==="zoo"||t.k==="apple"||t.k==="honk"||t.k==="hen"){DP(t);return}t.k==="trick"?V0(t.owner,t.v):t.k==="purr"?B==="house"&&j0():t.k==="leap"?B==="house"&&(Pf=performance.now()+900):t.k==="ball"?U0(e,t.x,t.y):t.k==="splash"&&H0(t.x)}function G0(e){const t=Math.min(.05,Math.max(0,(e-Hh)/1e3));Hh=e;try{sP(e,t),mP(),wP(),HP(e,t),CS(t),lu()}catch{}requestAnimationFrame(G0)}function _P(){return v?v.view(v.myHouseId())?.cat??null:J.get().cat??null}function Tf(){return v?v.players.get(v.pid)?.dog??null:J.get().dog??null}function yi(e){if(v){const t=v.myHouseId();t&&v.dispatch(t,e)}else J.dispatch(e)}const Dr=()=>B==="house"&&(!v||Pe===J||be===v.myHouseId());function $P(e="cat"){const t=_P(),n=Tf(),s=J.get().characters,o={tab:e,coat:t?.coat??0,catName:t?.name??"",breed:n?.breed??0,dogName:n?.name??"",owner:n?.owner??s[0]?.id,err:"",bye:!1},i=jt("",(l,c)=>{const d=g=>l.closest(`[${g}]`)?.getAttribute(g);if(d("data-pt")){o.tab=d("data-pt"),o.err="",o.bye=!1,r();return}if(d("data-coat")!=null){o.coat=+d("data-coat"),R.click(),r();return}if(d("data-breed")!=null){o.breed=+d("data-breed"),R.click(),r();return}if(d("data-cname")){o.catName=d("data-cname"),R.click(),r();return}if(d("data-dname")){o.dogName=d("data-dname"),R.click(),r();return}if(d("data-owner")){o.owner=d("data-owner"),R.click(),r();return}const f=d("data-pa");if(!f)return;const p=(i.root.querySelector("#petName")?.value??"").trim();if(f==="adoptCat"||f==="adoptDog"){const g=p||(f==="adoptCat"?o.catName:o.dogName),b=xg(g);if(!b){o.err=g?"Hmm, try a different name!":"Pick a name first!",R.pop(),r();return}if(f==="adoptCat"){const m=Dr(),k={name:b,coat:o.coat,room:m?C.get().currentRoom:t?.room??"living",x:m?Math.max(200,Math.min(pe-200,ce+te/2)):t?.x??1200};yi({type:"cat/set",cat:k}),R.meow(),c(),N(t?`${b} looks great! 🐱`:m?`${b} moved in! 🐱`:`${b} is waiting at your house! 🐱`)}else{const m=v?{name:b,breed:o.breed}:{name:b,breed:o.breed,owner:o.owner};v?(v.setDog(m),B==="park"&&oo()):J.dispatch({type:"dog/set",dog:m}),R.woof(),c(),N(n?`${b} looks great! 🐶`:`${b} is your new best friend! 🐶`)}return}if(f==="callCat"){yi({type:"cat/move",room:C.get().currentRoom,x:Math.max(200,Math.min(pe-200,ce+te/2))}),R.meow(),c();return}if(f==="kennelDog"){Cf(),c();return}if(f==="bye"){if(!o.bye){o.bye=!0,r();return}o.tab==="cat"?yi({type:"cat/set",cat:null}):(yi({type:"dog/kennel",item:null}),v?v.setDog(null):J.dispatch({type:"dog/set",dog:null})),c(),N("They went to live with a kind friend 💛");return}},"wide pets"),a=i.root.querySelector(".card");function r(){const l=o.tab==="cat",c=l?t:n,d=l?Sy:Cy,f=l?o.catName:o.dogName,p=i.root.querySelector("#petName")?.value??"";a.innerHTML=`${Gt}<h2>Pets</h2>
      <div class="petTabs"><button data-pt="cat" class="${l?"on":""}">🐱 Cat</button><button data-pt="dog" class="${l?"":"on"}">🐶 Dog</button></div>
      <p class="hint small">${l?v?"Your cat lives in your house. Friends can see her when they visit!":"Your cat lives in your house. She naps, purrs, and plays!":v?"Your dog follows you everywhere: the street, friends' houses, and the park!":"Your dog follows you around the house and to the park!"}</p>
      <div class="petRow"><div class="petPreview">${l?Ro(o.coat,"sit"):Hi(o.breed,"stand")}</div>
        <div class="swatches">${(l?Sc:Cc).map((g,b)=>`<button ${l?"data-coat":"data-breed"}="${b}" class="${b===(l?o.coat:o.breed)?"on":""}"><div>${l?Ro(b,"sit"):Hi(b,"stand")}</div><span>${g.name}</span></button>`).join("")}</div></div>
      <div class="label">Name</div>
      <div class="nameChips">${d.map(g=>`<button ${l?"data-cname":"data-dname"}="${g}" class="${g===f?"on":""}">${g}</button>`).join("")}</div>
      <input id="petName" class="petName" maxlength="14" autocomplete="off" placeholder="…or type a name" value="${he(p)}"/>
      ${o.err?`<p class="err" id="petErr">${he(o.err)}</p>`:""}
      ${!l&&!v&&s.length>1?`<div class="label">Who does your dog follow?</div><div class="walkers">${s.map(g=>`<button data-owner="${g.id}" class="${g.id===o.owner?"on":""}">${vt(g)}</button>`).join("")}</div>`:""}
      <div class="petBtns"><button class="go" data-pa="${l?"adoptCat":"adoptDog"}" id="adoptBtn">${c?"Save":"Adopt! 💛"}</button>
        ${l&&t&&Dr()?'<button data-pa="callCat" id="callCat">Here, kitty!</button>':""}
        ${!l&&n?`<button data-pa="kennelDog" id="kennelDog">${yl(Sf())?"Come, puppy!":"Kennel"}</button>`:""}
        ${c?`<button class="danger" data-pa="bye">${o.bye?"Tap again to say goodbye":"Find a new home"}</button>`:""}</div>`}r()}M("btnPets").addEventListener("click",()=>$P(B==="house"?"cat":"dog"));requestAnimationFrame(G0);window.__pets=()=>{const e=z0(),t=e?mi.get(e.key):void 0;return{dogs:[...Kn.keys()],dogPos:Object.fromEntries([...Kn].map(([n,s])=>[n,{x:Math.round(s.x),y:Math.round(s.y)}])),cat:de?{mood:de.dataset.mood,name:de.dataset.name,perch:Ka.perch,x:Math.round(Ka.x),leap:Ka.leap,curl:de.dataset.curl==="1"}:null,kennel:e&&t?{x:Math.round(t.x),y:Math.round(t.y),pose:t.pose,name:e.dog.name,item:e.item.id}:null,dogKennel:C.get().dogKennel??null,fetch:We?.phase??null,ball:Yn,view:B}};function on(){return M("ranch").clientHeight/sa}let Et=[];const Fi=e=>String(100+Math.round(e)),Y0=220,xP=Y0*130/160,K0=156,MP=K0*130/160,LP=.6,EP=3.5,SP=3,fd=10,cs=new Map,Xa=new Map;function Or(e,t,n=fd){const s=(e-kt.x)/(kt.rx+n),o=(t-kt.y)/(kt.ry+n);return s*s+o*o<1}function pc(e,t,n,s){for(let o=0;o<=18;o++){const i=o/18;if(Or(e+(n-e)*i,t+(s-t)*i))return!0}return!1}function Hr(e,t){return{x:Math.max(70,Math.min(Bf()-70,e)),y:Math.max(Qs,Math.min(Dn,t))}}function CP(e,t){const n=Hr(t.x,t.y);if(Or(n.x,n.y,6))return null;if(!pc(e.x,e.y,n.x,n.y))return[n];const s=kt.x-kt.rx-fd-28,o=kt.x+kt.rx+fd+28;let i=null,a=1/0;for(const r of[Qs+1,Dn-2]){const l=[];let c=e.x,d=e.y;const f=(k,y)=>{const u=Hr(k,y);l.push(u),c=u.x,d=u.y};pc(c,d,c,r)&&f(c<kt.x?s:o,d),Math.abs(d-r)>3&&f(c,r),Math.abs(c-n.x)>3&&f(n.x,r),l.push(n);let p=!0,g=e.x,b=e.y,m=0;for(const k of l){if(pc(g,b,k.x,k.y)||Or(k.x,k.y,4)){p=!1;break}m+=Math.hypot(k.x-g,k.y-b),g=k.x,b=k.y}p&&m<a&&(i=l,a=m)}return i}function X0(e,t){const n=kn();if(!n)return;const s={x:Math.max(60,Math.min(Bf()-60,e)),y:Math.max(Qs,Math.min(Dn,t))};if(n.ride!==void 0&&n.where==="ranch"){const o=CP(n,s);if(!o){N("The horse won't splash through the pond!"),R.pop();return}Et=o}else Et=[s]}function PP(e){if(e.look2)return IL(e.look2);const t=e.pants,n="#5a3d5c",s=(o,i,a,r)=>`<path class="${o}" d="${i}" fill="none" stroke="${n}" stroke-width="${a}" stroke-linecap="round"/><path class="${o} cloth" d="${i}" fill="none" stroke="${t}" stroke-width="${r}" stroke-linecap="round"/>`;return`<svg class="rideleg" viewBox="0 0 160 130">${s("thigh","M66 56 L102 66",13,8)}${s("shin","M102 68 L106 104",12,7.2)}<circle class="knee" cx="102" cy="67" r="6.2" fill="${t}" stroke="${n}" stroke-width="3.5"/><ellipse class="shoe" cx="116" cy="106" rx="11" ry="5.2" fill="${n}"/></svg>`}function ds(){return document.body.classList.contains("phone")&&document.body.classList.contains("phone-portrait")&&!ze}function bl(){if(!ds())return Yh.map((t,n)=>n);const e=[0,2,4];for(const t of rs("ranch")){const n=t.p.ride;n!==void 0&&e.indexOf(n)<0&&e.push(n)}return e}function gs(e){if(!ds())return Yh[e];const t=bl(),n=t.indexOf(e),s=t.length,o=n<0?0:n,i=Rf().w/2,a=2400+i+18,r=3080-i-18;return s<=1?Math.round((a+r)/2):Math.round(a+(r-a)*o/(s-1))}function Rf(){return ds()?{w:131,h:106}:{w:150,h:122}}function Wr(e,t,n){const s=on(),{w:o,h:i}=Rf();e.style.left=(t-o/2)*s+"px",e.style.top=(n-i)*s+"px",e.style.width=o*s+"px",e.style.height=i*s+"px",e.style.zIndex=Fi(n)}function TP(){if(B!=="ranch"||ze||!document.body.classList.contains("phone"))return;const e=new Set(bl());document.querySelectorAll("#ranchWorld .horse").forEach(t=>{const n=+t.dataset.horse;t.classList.toggle("stallOff",ds()&&!e.has(n)),!(!e.has(n)||cs.has(n)||t.classList.contains("away"))&&Wr(t,gs(n),qs)})}function RP(e,t,n){if(cs.has(e)||Math.hypot(t-gs(e),n-qs)<26)return;cs.set(e,{x:t,y:n});const s=document.querySelector(`#ranchWorld .horse[data-horse="${e}"]`);s&&(s.classList.add("trotting"),s.classList.remove("away"),s.classList.toggle("flipped",gs(e)<t),Wr(s,t,n))}function BP(e,t,n){const s=n?-1:1;for(const o of[s*118,-s*118,s*160,-s*78])for(const i of[0,30,-26,48]){const a=Hr(e+o,t+i);if(!(Math.hypot(a.x-e,a.y-t)<50)&&!Or(a.x,a.y,8))return a}return Hr(e,t)}let Qh=0,J0=0;const kl=()=>v?v.now():Date.now(),wl=()=>$d(v?v.ranch.plots:J.get().garden),ca=()=>_d(v?v.players.get(v.pid)?.basket:J.get().basket),Bf=()=>ze?wd:Yi,em=()=>ze?"barn":"ranch",tm=()=>{const e=new Map;for(const t of rs("ranch"))t.p.ride!==void 0&&e.set(t.p.ride,t);return e};function pd(e){const t={taken:"A friend just planted there!",wet:"Already watered 💧",notReady:"Still growing! 🌱",full:"Your basket is full!",slow:"The hen is laying… try again!",none:"Your basket has none left",nohouse:"Go home to put it in your room"};t[e]&&(N(t[e]),R.pop())}function Po(e){if(v){const o=yc(wl(),ca(),e,kl(),e.op==="egg"?Qh:0);return typeof o=="string"?(pd(o),!1):(e.op==="egg"&&(Qh=Date.now()),v.ranchOp(e),!0)}const t=J.get(),n=Date.now(),s=yc($d(t.garden),_d(t.basket),e,n,t.lastEgg??0);return typeof s=="string"?(pd(s),!1):(J.dispatch({type:"ranch/op",op:e,now:n}),vl(!0),Df(),!0)}function ji(e=!1){const t=B==="ranch"&&ze&&!e;fo(),M("ranch").classList.remove("hidden"),We=null,Et=[],B="ranch",ze=e;const n=e?{where:"barn",x:170,y:560,flip:!1}:{where:"ranch",x:t?gc:130,y:t?520:565,flip:!1};v?et(n):Wt=n,M("streetTitle").textContent=e?"The Barn":"Rainbow Ranch",bn(),Af(),requestAnimationFrame(()=>{const s=M("ranchScroll"),o=on();s.scrollLeft=t?Math.max(0,gc*o-s.clientWidth/2):0,gd()}),setTimeout(gd,650),la(M("ranch")),e?R.swish():R.sparkle()}M("btnHopOff").addEventListener("click",()=>nm());function Af(){const e=on(),t=M("ranchWorld"),n=o=>o*e+"px",s=(o,i,a,r)=>`left:${n(o-a/2)};top:${n(i-r)};width:${n(a)};height:${n(r)};z-index:${Fi(i)}`;if(t.style.width=Bf()*e+"px",t.style.height=sa*e+"px",t.style.setProperty("--sc",String(e)),ze){t.innerHTML=rE()+`<button class="rprop barnExit" data-r="exit" aria-label="Go outside" style="${s(127,444,206,244)}"><span class="exitHint"><span>Outside ☀️</span></span></button>`+Ds.map((o,i)=>`<button class="animal" data-animal="${i}" aria-label="${fu[i].name}" style="${s(vd[i],c1+30,128,107)}">${Fc(i)}</button>`).join("")+[300,1244].map(o=>["carrot","apple","hay"].map((i,a)=>`<button class="bucket" data-feed="${i}" aria-label="${i} bucket" style="${s(o+a*56,592,54,62)}">${eE(i)}</button>`).join("")).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',fs(),lt();return}t.innerHTML=F9()+j9().replace("<svg ",`<svg style="z-index:${Fi(G9)}" `)+`<button class="rprop barnDoor" data-r="barn" aria-label="Go into the barn" style="${s(gc,472,150,150)}"><span class="doorHint"><span>Petting zoo inside! 🐐</span></span></button><button class="rprop windmill" data-r="mill" aria-label="Windmill" style="${s(1540,478,150,240)}">${oE}</button><button class="rprop henHouse" data-r="egg" aria-label="Hen house" style="${s(715,482,180,170)}">${Y9}</button><button class="rprop tractor" data-r="honk" aria-label="Tractor" style="${s(900,580,170,130)}">${K9}</button><button class="rprop appleTree" data-r="apple" aria-label="Apple tree" style="${s(2085,482,240,300)}">${X9}</button>`+d1.map((o,i)=>{const a=Rf();return`<button class="horse${ds()&&bl().indexOf(i)<0?" stallOff":""}" data-horse="${i}" aria-label="${wr[i].name} horse" style="${s(gs(i),qs,a.w,a.h)}">${Kd(i)}</button>`}).join("")+Array.from({length:uc},(o,i)=>`<button class="plot" data-plot="${i}" aria-label="Garden plot" style="${s(p1(i),594,66,86)}"></button>`).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',vl(!0),fs(),lt()}const Aa=[];function vl(e=!1){if(B!=="ranch"||ze)return;const t=wl(),n=kl();document.querySelectorAll("#ranchWorld .plot").forEach(s=>{const o=+s.dataset.plot,i=t[o]??null,a=Xr(i,n),r=JSON.stringify(i)+a;!e&&Aa[o]===r||(Aa[o]!==void 0&&Aa[o]!==r&&a>0&&(s.classList.remove("grow"),s.offsetWidth,s.classList.add("grow")),Aa[o]=r,s.innerHTML=gu(i,a,o),s.dataset.stage=i?String(a):"empty")})}function fs(){const e=document.getElementById("ravatars");if(!e||B!=="ranch")return;const t=on(),n=new Set,s=new Set;let o=!1;for(const i of rs(em())){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&O0(a));const r=JSON.stringify(i.look)+i.name;if(a.dataset.look!==r){const g=a.querySelector(".bubble");a.innerHTML=i.name?vf(i.look,i.name):`<div class="inner">${vt(i.look)}</div>`,g&&a.appendChild(g),a.dataset.look=r,a.dataset.ride=""}const l=i.p.ride,c=(Ks[i.look.size]??1)*t*.95*(l!==void 0?LP:1),d=ks*c,f=yn*c;if(a.dataset.ride!==String(l??"")&&(a.querySelector(".mount")?.remove(),l!==void 0&&a.insertAdjacentHTML("afterbegin",`<div class="mount" data-mount="${l}">${Kd(l,!0)}${PP(i.look)}</div>`),a.dataset.ride=String(l??"")),a.classList.toggle("riding",l!==void 0),l!==void 0){s.add(l),i.mine&&(o=!0),Xa.set(l,{x:i.p.x,y:i.p.y});const g=ds()?K0:Y0,b=ds()?MP:xP,m=g*t,k=b*t,y=a.querySelector(".mount");y.style.width=m+"px",y.style.height=k+"px",y.style.left=(d-m)/2+"px",y.style.top=f-k+"px";const u=Number(a.querySelector(".shirt")?.getAttribute("data-hem")??126),w=Number(y.querySelector(".saddle")?.getAttribute("data-top")??43),_=(u+EP/2)/160*f,P=f-k+(w-SP/2)/130*k;a.style.setProperty("--lift",_-P+"px");const x=y.querySelector(".rideleg");x&&(x.style.left="0",x.style.top="0",x.style.width="100%",x.style.height="100%")}else a.style.removeProperty("--lift");const p=parseFloat(a.dataset.lx??"NaN");Number.isFinite(p)&&Math.abs(p-i.p.x)>2&&(a.classList.add("moving"),clearTimeout(+(a.dataset.mt??0)),a.dataset.mt=String(window.setTimeout(()=>a.classList.remove("moving"),260))),a.dataset.lx=String(i.p.x),a.style.left=i.p.x*t-d/2+"px",a.style.top=i.p.y*t-f+"px",a.style.width=d+"px",a.style.height=f+"px",a.style.zIndex=Fi(i.p.y),a.classList.toggle("flipped",i.p.flip),na(a,i.look,i.mine)}if(e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),document.body.classList.contains("phone")){const i=new Set(bl());document.querySelectorAll("#ranchWorld .horse").forEach(a=>{a.classList.toggle("stallOff",ds()&&!i.has(+a.dataset.horse))})}document.querySelectorAll("#ranchWorld .horse").forEach(i=>{const a=+i.dataset.horse;s.has(a)?(i.classList.add("away"),cs.delete(a)):i.classList.remove("away")});for(const[i,a]of[...Xa])s.has(i)||(RP(i,a.x,a.y),Xa.delete(i));document.body.classList.toggle("riding",o),co()}function AP(e){const t=kn();if(!t||t.where!=="ranch")return;const n=tm().get(e);if(n&&!n.mine){N("Someone is riding!"),R.pop();return}if(t.ride!==void 0){if(n?.mine||t.ride===e){nm();return}X0(gs(e),Math.min(Dn,qs+8));return}Et=[],cs.delete(e),tn({where:"ranch",x:gs(e),y:Math.min(Dn,qs+8),flip:!1,ride:e}),R.neigh(),N(`You're riding ${wr[e].name}! Tap the ground to gallop 🐴`)}function nm(){const e=kn();if(!e||e.ride===void 0)return;const t=e.ride,{ride:n,...s}=e;Et=[];const o=BP(s.x,s.y,s.flip);Xa.set(t,{x:s.x,y:s.y}),tn({...s,x:o.x,y:o.y}),R.drop()}function If(e,t){const n=e<Ds.length?document.querySelector(`#ranchWorld .animal[data-animal="${e}"]`):document.querySelector(`#ranchWorld .horse[data-horse="${e-Ds.length}"]:not(.away)`)??document.querySelector(`#ravatars .mount[data-mount="${e-Ds.length}"]`);if(!n||B!=="ranch")return;const s=e>=Ds.length,o=s?{say:"Neigh! ♥",snd:"neigh"}:fu[e];n.classList.remove("hop","munch"),n.offsetWidth,n.classList.add(t?"munch":"hop"),setTimeout(()=>n.classList.remove("hop","munch"),1400),n.querySelector(".abubble")?.remove();const i=document.createElement("div");i.className="bubble petBubble abubble",i.textContent=t?`Yum! Munch munch ${t===1?"🥕":t===2?"🍎":"🌾"}`:o.say,n.appendChild(i),Zo(),setTimeout(()=>i.classList.add("out"),1400),setTimeout(()=>i.remove(),1800);for(let a=0;a<(t?6:4);a++){const r=document.createElement("div");r.className="heart",r.textContent="♥",r.style.left=15+Math.random()*70+"%",r.style.animationDelay=a*.12+"s",r.style.color=["#ff6b9a","#ff8fab","#e879c6","#b197fc"][a%4],n.appendChild(r),setTimeout(()=>r.remove(),1900)}R[o.snd]?.(),t&&setTimeout(()=>R.munch(),250)}function sm(){const e=document.querySelector("#ranchWorld .henHouse");e&&(e.classList.remove("lay"),e.offsetWidth,e.classList.add("lay"),R.cluck())}function IP(){const e=document.querySelector("#ranchWorld .henHouse"),t=M("basketChip");if(!e)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=document.createElement("div");o.className="flyEgg",o.innerHTML=Vi,document.body.appendChild(o),Object.assign(o.style,{left:n.left+n.width/2-18+"px",top:n.top+n.height*.6+"px"}),requestAnimationFrame(()=>{o.style.left=s.left+s.width/2-18+"px",o.style.top=s.top+"px",o.style.transform="scale(.6) rotate(200deg)"}),setTimeout(()=>{o.remove(),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")},650)}function om(e){const t=document.getElementById("rfx");if(!t||B!=="ranch")return;const n=on(),[s,o]=Gp[e]??Gp[0],i=1965+s,a=182+o,r=i+(e%2?26:-22),l=575+e*4,c=document.createElement("button");c.className="fallenApple",c.dataset.feed="apple",c.setAttribute("aria-label","Apple"),c.innerHTML=pu;const d=32*n;Object.assign(c.style,{width:d+"px",height:d+"px",left:i*n-d/2+"px",top:a*n-d/2+"px",zIndex:Fi(l)}),t.appendChild(c),requestAnimationFrame(()=>{c.style.left=r*n-d/2+"px",c.style.top=l*n-d+"px",c.classList.add("fallen")});const f=document.querySelector("#ranchWorld .appleTree");f?.classList.remove("shake"),f?.offsetWidth,f?.classList.add("shake"),R.boing(),setTimeout(()=>c.remove(),12e3)}function im(){const e=document.querySelector("#ranchWorld .tractor");e?.classList.remove("bounce"),e?.offsetWidth,e?.classList.add("bounce"),R.honk()}function DP(e){e.k==="zoo"?If(e.a,e.f):e.k==="apple"?om(e.v):e.k==="honk"?im():e.k==="hen"&&sm()}function qh(e,t){const n=document.elementFromPoint(e,t);if(!n)return null;const s=n.closest("[data-animal]");if(s)return+s.dataset.animal;const o=n.closest(".horse:not(.away)");if(o)return Ds.length+ +o.dataset.horse;const i=n.closest(".savatar.riding");return i?.dataset.ride?Ds.length+ +i.dataset.ride:null}function hd(e,t,n){e.preventDefault(),e.stopPropagation();const s=document.createElement("div");s.className="feedGhost",s.innerHTML=hu[t],document.body.appendChild(s);const o=b=>{s.style.left=b.clientX-30+"px",s.style.top=b.clientY-50+"px"};o(e),R.pick();let i=0;const a=e.clientX,r=e.clientY;n instanceof HTMLElement&&(n.style.visibility="hidden");let l=e.clientX,c=0;const d=M("ranchScroll"),f=()=>{const b=d.getBoundingClientRect(),m=l<b.left+60?-12:l>b.right-60?12:0;m&&i>12&&B==="ranch"&&(d.scrollLeft+=m),c=requestAnimationFrame(f)};c=requestAnimationFrame(f);const p=b=>{if(b.pointerId!==e.pointerId)return;l=b.clientX,i=Math.max(i,Math.hypot(b.clientX-a,b.clientY-r)),o(b),document.querySelectorAll(".feedHover").forEach(k=>k.classList.remove("feedHover")),qh(b.clientX,b.clientY)!==null&&document.elementFromPoint(b.clientX,b.clientY)?.closest(".animal, .horse, .savatar")?.classList.add("feedHover")},g=b=>{if(b.pointerId!==e.pointerId)return;cancelAnimationFrame(c),window.removeEventListener("pointermove",p),window.removeEventListener("pointerup",g),s.remove(),J0=Date.now(),document.querySelectorAll(".feedHover").forEach(y=>y.classList.remove("feedHover"));const m=qh(b.clientX,b.clientY);if(m===null){n instanceof HTMLElement&&(n.style.visibility=""),i<12?N("Drag the food onto an animal! 🥕"):R.drop();return}if(n==="basket"&&!Po({op:"use",kind:"carrot"}))return;n instanceof HTMLElement&&n.remove();const k=f1.indexOf(t);If(m,k),v?.fx({k:"zoo",a:m,f:k})};window.addEventListener("pointermove",p),window.addEventListener("pointerup",g)}M("ranchWorld").addEventListener("pointerdown",e=>{const t=e.target,n=t.closest(".bucket");if(n)return hd(e,n.dataset.feed,"bucket");const s=t.closest(".fallenApple");if(s)return hd(e,"apple",s);t.closest(".rprop, .animal, .horse, .plot, .pet")&&e.stopPropagation()});M("ranchWorld").addEventListener("click",e=>{const t=e.target;if(!kn()||B!=="ranch"||Date.now()-J0<400)return;const s=t.closest("[data-animal]");if(s){const f=+s.dataset.animal;If(f,0),v?.fx({k:"zoo",a:f,f:0});return}const o=t.closest("[data-horse]");if(o){AP(+o.dataset.horse);return}const i=t.closest("[data-r]")?.dataset.r;if(i==="egg"){sm(),Po({op:"egg"})&&(IP(),R.pickup());return}if(i==="honk"){im(),v?.fx({k:"honk"});return}if(i==="apple"){const f=Math.floor(Math.random()*4);om(f),v?.fx({k:"apple",v:f});return}if(i==="barn"){ji(!0);return}if(i==="exit"){ji(!1);return}if(i==="mill"){const f=t.closest(".windmill");f?.classList.remove("whirl"),f?.offsetWidth,f?.classList.add("whirl"),R.swish();return}const a=t.closest("[data-plot]");if(a){OP(+a.dataset.plot,a);return}if(t.closest(".bucket, .fallenApple, .savatar, .pet"))return;const r=M("ranchWorld").getBoundingClientRect(),l=on(),c=(e.clientX-r.left)/l,d=(e.clientY-r.top)/l;d<400||X0(c,d)});function OP(e,t){const n=wl()[e]??null,s=Xr(n,kl());if(document.querySelector(".seedPick")?.remove(),!n){const o=document.createElement("div");o.className="seedPick",o.innerHTML=`<button data-seed="carrot">${cl}<span>Carrot</span></button><button data-seed="flower">${Xd()}<span>Flower</span></button>`,t.parentElement.appendChild(o),o.style.left=t.offsetLeft+t.offsetWidth/2+"px",o.style.top=t.offsetTop-8+"px",o.addEventListener("pointerdown",i=>i.stopPropagation()),o.addEventListener("click",i=>{i.stopPropagation();const a=i.target.closest("[data-seed]")?.dataset.seed;o.remove(),a&&Po({op:"plant",i:e,seed:a})&&(R.plant(),N("Planted! Now tap it to water 💧"))}),setTimeout(()=>o.remove(),6e3);return}if(!n.wet){Po({op:"water",i:e})&&(R.water(),t.classList.remove("watering"),t.offsetWidth,t.classList.add("watering"));return}if(s<3){N("Still growing! 🌱"),R.pop();return}Po({op:"pick",i:e})&&(R.pickup(),N(n.seed==="carrot"?"A carrot for your basket! 🥕":"Pretty flowers for your basket! 🌸"))}let Nh=0;function HP(e,t){if(B!=="ranch")return;const n=Date.now();if(document.querySelectorAll("#ranchWorld .animal").forEach(s=>{const o=+s.dataset.animal,i=on(),a=n/5200+o*1.7,r=(ze?vd:l1)[o]+Math.sin(a)*32;s.style.left=(r-s.offsetWidth/i/2)*i+"px",s.classList.toggle("flipped",Math.cos(a)<0),s.classList.toggle("walking",Math.abs(Math.cos(a))>.35)}),e-Nh>1e3&&(Nh=e,vl()),Et.length){const s=kn();if(!s||s.where!==em())Et=[];else{const o=Et[0],i=s.ride!==void 0?720:300,a=o.x-s.x,r=o.y-s.y,l=Math.hypot(a,r);if(l<6)Et.shift();else{const c=Math.min(l,i*t),d={...s,x:s.x+a/l*c,y:s.y+r/l*c,flip:Math.abs(a)>2?a<0:s.flip};tn(d);const f=on(),p=M("ranchScroll"),g=d.x*f-p.scrollLeft;g>-40&&g<p.clientWidth+40&&(g<p.clientWidth*.2||g>p.clientWidth*.8)&&(p.scrollLeft=d.x*f-p.clientWidth/2)}}}for(const[s,o]of cs){const i=document.querySelector(`#ranchWorld .horse[data-horse="${s}"]`);if(!i||i.classList.contains("away")){cs.delete(s);continue}const a=gs(s)-o.x,r=qs-o.y,l=Math.hypot(a,r);if(l<8){cs.delete(s),i.classList.remove("trotting","flipped"),Wr(i,gs(s),qs);continue}const c=Math.min(l,460*t);o.x+=a/l*c,o.y+=r/l*c,i.classList.add("trotting"),i.classList.toggle("flipped",a<0),Wr(i,o.x,o.y)}}function Df(){const e=document.getElementById("basketChip");if(!e)return;const t=B==="house"&&(!v||Pe===J||be===v.myHouseId()),n=ca(),o=n.egg+n.carrot+n.flower>0&&(B==="ranch"||t);e.classList.toggle("hidden",!o),e.classList.toggle("inHouse",B==="house"),o&&(e.innerHTML=`<span class="bIcon">${tE}</span><span class="bcount" data-kind="egg">${Vi}<b>${n.egg}</b></span><span class="bcount" data-kind="carrot">${cl}<b>${n.carrot}</b></span><span class="bcount" data-kind="flower">${Xd()}<b>${n.flower}</b></span>`)}M("basketChip").addEventListener("pointerdown",e=>{e.target.closest('.bcount[data-kind="carrot"]')&&B==="ranch"&&ca().carrot>0&&hd(e,"carrot","basket")});M("basketChip").addEventListener("click",()=>WP());function WP(){const e=B==="house"&&(!v||Pe===J||be===v.myHouseId()),t={egg:["Eggs",Vi],carrot:["Carrots",cl],flower:["Flowers",Xd()]},n=jt("",(o,i)=>{const a=o.closest("[data-take]")?.dataset.take;if(!a)return;if(!e){N("Take it home to put it in your room! 🏠");return}const r="r"+Math.random().toString(36).slice(2,10),l=Math.max(120,Math.min(pe-120,ce+te/2+(Math.random()-.5)*300));Po({op:"take",kind:a,id:r,room:C.get().currentRoom,x:l})&&(R.drop(),i(),N("It's in your room! Drag it to a hand to carry it ✋"))},"basketSheet"),s=ca();n.root.querySelector(".card").innerHTML=`${Gt}<h2>My Basket</h2><p class="hint small">${e?"Tap one to put it in your room.":"Collect eggs, carrots and flowers at Rainbow Ranch, then take them home!"}</p>
    <div class="basketRows">${Kh.map(o=>`<button class="bRow" data-take="${o}" ${s[o]?"":"disabled"}>${t[o][1]}<b>${s[o]}</b><span>${t[o][0]}</span></button>`).join("")}</div>`}window.__ranch=()=>({view:B,inBarn:ze,plots:wl().map(e=>e?{seed:e.seed,stage:Xr(e,kl()),wet:!!e.wet}:null),basket:ca(),me:kn(),ridden:[...tm().keys()]});function UP(){if(hi.kind==="none")return;CE(),jt(PE(hi.kind,hi.entries),(t,n)=>{t.closest("#wnGo")&&(R.sparkle(),n())},"whatsNew "+hi.kind).root.querySelector(".card").insertAdjacentHTML("afterbegin",Gt)}setTimeout(UP,500);window.__whatsnew=hi;window.__hood=()=>v;window.__hood_url=()=>tl();window.__ui=()=>({view:B,currentHouseId:be,mode:v?"hood":"solo",play:Be.mode()});MS({hood:()=>v,view:()=>B,solo:()=>Wt,myPres:_e,setPres:tn,toast:N,refreshNear:co,sfx:R,goMap:Co,soloLook:()=>{const e=J.get();return{look:Ji(e.characters[0]??{}),dog:e.dog??null}}});function am(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n.items)t.add(s.kind);for(const n of e.characters)n.held.left&&t.add(n.held.left.kind),n.held.right&&t.add(n.held.right.kind);return e.baby&&t.add("baby"),[...t]}let Ia=null,Of=()=>!1;function rm(e){return Ia||(Ia=h(()=>Promise.resolve().then(()=>Hd),void 0).then(t=>(Of=t.hasArt,t.boot(location.search,am(C.get())))).then(t=>{for(let n=0;n<t.length;n++)if(ge[t[n]]){so();break}w0()}),Ia)}function VP(e){const t=new Set(e),n=C.get();let s=!1;for(const o of n.rooms[n.currentRoom].items){const i=ge[o.kind];if(!t.has(o.kind)||!i||o.art)continue;const a=j.querySelector(`.item[data-id="${o.id}"] .inner`);!a||a.querySelector("img.artimg")||(a.innerHTML=mn(i,!0),s=!0)}s&&(Ot.forEach(o=>{delete o.dataset.held}),en(n),w0())}function zP(){return h(()=>Promise.resolve().then(()=>Hd),void 0).then(e=>e.boot(location.search,am(C.get()))).then(e=>{VP(e.filter(t=>!!ge[t]))})}RM();GE();L9();z9(e=>e==="backyard"?wM():null);M("scenery").addEventListener("click",e=>{const t=e.target.closest("[data-yard-go]");t&&gf(t.dataset.yardGo==="backyard"?"backyard":"living")});const QP=VE(M("skyMount"));window.__sky=QP;hl=yb({layer:j,stageWrap:M("stageWrap"),get:()=>C.get(),dispatch:e=>C.dispatch(e),clock:()=>v&&Pe!==J?v.now():Date.now(),canSend:()=>!v||Pe===J||!!v.speaksBaby,owner:()=>df(),inHouse:()=>B==="house",play:()=>Be.isPlay(),editable:()=>dt(),toRoom:Ue,box:e=>{const t=ge[e.kind];return t?{id:e.id,kind:e.kind,x:e.x,footY:ro(t,e.y),flip:!!e.flip,scale:Ye(e),w:t.w,h:je(t),z:e.z}:null},holderId:()=>v&&Pe!==J&&v.pid?v.pid:Ie||C.get().characters[0]?.id||"c1",holderSpot:e=>{const t=C.get(),n=v&&Pe!==J&&v.pid?v.pid:Ie||t.characters[0]?.id||"",s=e||n,o=(a,r,l,c,d,f)=>{const p=c?.pose==="sit"||c?.pose==="lie"?c.pose:null,g=p==="lie"?t.rooms[t.currentRoom]?.items.find(m=>m.id===c?.item):void 0,b=d&&/^#[0-9a-fA-F]{6}$/.test(d)?d:"#f1c27d";return{x:a.x,y:a.y,flip:r,scale:l>0?l:1,pose:p,lieFlip:!!(p==="lie"&&g?.flip),skin:b,chibi:!!f}},i=t.characters.find(a=>a.id===s&&a.room===t.currentRoom);if(i){const a=Pt(i);return o(St(t.currentRoom,a,i),i.flip,Ks[i.size]??1,a,i.look2&&i.look2.skin||i.skin,!!i.look2)}if(v&&B==="house"){const a=s===v.pid?_e():v.presence.get(s);if(a&&a.where==="house"&&a.houseId===be&&a.room===t.currentRoom){const r=Hn(s,a),l=v.players.get(s)?.look,c=l?.size??"kid";return o(St(t.currentRoom,r,a),a.flip,Ks[c]??1,r,l?.look2&&l.look2.skin||l?.skin||"#f1c27d",!!l?.look2)}}return null},holderHere:e=>{if(!e)return!1;if(C.get().characters.some(s=>s.id===e))return!0;if(!v||Pe===J)return!1;const n=e===v.pid?_e():v.presence.get(e);return!!(n&&n.where==="house"&&n.houseId===be)},occupied:()=>Ni(void 0,v?.pid,!0),locked:()=>Wn(null),seatAt:(e,t,n)=>St(e,t,n)}).render;qu=()=>hl();so();Ut();ws();qP();ws();_l();Ju();za();No.matches?hs():ws();requestAnimationFrame(()=>{ws(),_l(),lf()});function qP(){if(!nf)return;const e=Rc(),t=C.get().characters[0];if(!t)return;const n=e==="door";if(C.dispatch({type:"char/update",id:t.id,patch:{...H7(),flip:n?Ic.flip:Ac.flip}}),C.dispatch({type:"cat/set",cat:{name:"Clover",coat:3,room:n?"living":"backyard",x:n?gr:ss.x}}),C.dispatch({type:"dog/set",dog:{name:"Sunny",breed:3,owner:t.id}}),!C.get().rooms.backyard.items.some(s=>s.kind==="yard-swing"))for(const s of W7)C.dispatch({type:"item/add",room:"backyard",item:{id:"yp-"+s.kind,kind:s.kind,x:s.x,y:s.y,flip:!1,z:1,scale:s.scale??1}});if(e!=="sheet"){const s=n?Ic:Ac;C.dispatch({type:"char/move",id:t.id,room:n?"living":"backyard",x:s.x,y:s.y}),C.dispatch({type:"room/switch",room:n?"living":"backyard"})}window.__pinCat=n?{x:gr}:{x:ss.x,y:ss.y},e==="play"?M("modePlay").click():(e==="decorate"||e==="door")&&M("modeDecorate").click(),e==="sheet"&&document.body.insertAdjacentHTML("beforeend",xM()),e==="compare"&&document.body.insertAdjacentHTML("beforeend",LM()),document.body.dataset.yard="ready"}function NP(e){const t=C.get(),n=e==="backyard"?Ac:Ic;Ht=null;const s=t.characters.find(o=>o.id===Ie&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(s&&(C.dispatch({type:"char/update",id:s.id,patch:{flip:n.flip}}),C.dispatch({type:"char/move",id:s.id,room:e,x:n.x,y:n.y})),nf&&t.cat&&(C.dispatch({type:"cat/move",room:e,x:e==="backyard"?ss.x:gr}),window.__pinCat=e==="backyard"?{x:ss.x,y:ss.y}:{x:gr}),C.dispatch({type:"room/switch",room:e}),v&&Pe!==J){const o=_e();if(o&&o.where==="house"){const i=o.houseId?wf(o.houseId,e,n):n;et({...o,room:e,x:i.x,y:i.y,flip:n.flip})}}requestAnimationFrame(()=>_l())}function _l(){if(C.get().currentRoom==="backyard"){Je(Bc),Xn();return}if(!nf||Rc()==="sheet"||Rc()==="compare")return;const e=C.get().characters.find(t=>t.room===C.get().currentRoom);e&&Je(e.x-te/2),Xn()}function Xn(){if(no||F.getBoundingClientRect().width<20)return;const t=wt()||parseFloat(F.style.getPropertyValue("--yard-sc"))||1;F.style.setProperty("--yard-sc",String(t));const n=[...F.querySelectorAll(".yardDoor")];for(const b of n){b.style.minWidth="",b.style.transform="";const m=b.querySelector(".yardHintLabel");if(!m)continue;m.style.transform="",m.style.translate="";const k=m.querySelector("span");k&&(k.style.transform="");const y=Math.max(13,16/t);m.style.fontSize=y+"px",m.style.lineHeight="1";const u=38/t;m.style.height=u+"px";const w=3/t,_=Math.max(0,(u-w*2-y)/2);m.style.padding=`${_.toFixed(2)}px ${(14/t).toFixed(2)}px`}const s=n[0];if(!s)return;const o=s.querySelector(".doorArt"),i=s.querySelector(".yardHintLabel"),a=6,r=()=>{const b=F.getBoundingClientRect(),m=s.getBoundingClientRect(),k=o?.getBoundingClientRect(),y=i?.getBoundingClientRect(),u=[m,k,y].filter(E=>!!E&&E.width>2&&E.height>2),w=Math.min(...u.map(E=>E.top)),_=Math.max(...u.map(E=>E.bottom));let P=b.left+a,x=b.right-a;for(const E of["nudgeL","nudgeR"]){const W=M(E);if(!W||W.classList.contains("off")||W.offsetParent===null)continue;const V=W.getBoundingClientRect();if(V.width<2||V.height<2)continue;const ne=K=>K.top<V.bottom-1&&K.bottom>V.top+1,Y=[m,k].some(K=>K&&K.width>2&&ne(K));!Y&&(w>=V.bottom-1||_<=V.top+1)||(E==="nudgeL"&&Y?P=Math.max(P,V.right+8):E==="nudgeR"&&Y&&(x=Math.min(x,V.left-8)))}return{leftLimit:P,rightLimit:x,doorR:m,artR:k,hintR:y}};let l=0,c=0;for(;l++<4;){const{leftLimit:b,rightLimit:m,doorR:k,artR:y}=r();let u=0;const w=Math.min(k.left,y&&y.width>2?y.left:k.left),_=Math.max(k.right,y&&y.width>2?y.right:k.right);if(w<b&&(u+=b-w),_+u>m&&(u-=_+u-m),Math.abs(u)<.5)break;c+=u,s.style.transform=`translate(${(c/t).toFixed(1)}px, 0)`}if(!i){Eh(s);return}const d=i.querySelector("span");if(d){const b=document.createRange();b.selectNodeContents(d);const m=b.getBoundingClientRect(),k=i.getBoundingClientRect(),y=(k.top+k.bottom-(m.top+m.bottom))/2,u=d;m.height>2&&Math.abs(y)>=.1?u.style.transform=`translateY(${(y/t).toFixed(2)}px)`:u.style.transform=""}const f=i.getBoundingClientRect(),p=F.getBoundingClientRect();let g=0;if(C.get().currentRoom==="backyard"&&o){const b=o.getBoundingClientRect();b.width>2&&(g+=(b.left+b.right)/2-(f.left+f.right)/2)}f.left+g<p.left+a?g+=p.left+a-(f.left+g):f.right+g>p.right-a&&(g-=f.right+g-(p.right-a)),Math.abs(g)>.5?i.style.translate=`calc(-50% + ${(g/t).toFixed(1)}px) 0`:i.style.translate="",Eh(s)}rm(C.get().currentRoom);const lm=()=>{const e=al().size,t=hr.length,n=M("secrets"),s=n.querySelector(".secCount");s&&(s.textContent=`${e}/${t}`),n.setAttribute("aria-label",`Surprises, ${e} of ${t}`),ju()};function $l(){return window.innerHeight>window.innerWidth+40}function cm(e,t){for(const Y of e)Y.style.transform="";if(!$l()||!e.length)return;const n=t&&t.clientWidth>20?t.getBoundingClientRect():{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth};if(n.width<20)return;const s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,window.innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,window.innerHeight)-s,l=Math.max(40,i-o),c=Math.max(40,r-a),f=e.map(Y=>Y.getBoundingClientRect()).filter(Y=>Y.width>2&&Y.height>2);if(!f.length)return;const p=Math.min(...f.map(Y=>Y.left)),g=Math.max(...f.map(Y=>Y.right)),b=Math.min(...f.map(Y=>Y.top)),m=Math.max(...f.map(Y=>Y.bottom)),k=Math.max(1,g-p),y=Math.max(1,m-b),u=Math.min(1,l/k,c/y);if(u>.995&&p>=o-1&&g<=i+1&&b>=a-1&&m<=r+1)return;const _=e[0].getScreenCTM(),P=_&&Math.hypot(_.a,_.b)||1,x=(p+g)/2,E=(b+m)/2,W=y*u,V=(o+i)/2,ne=b>=a&&m<=r?E:Math.min(Math.max(E,a+W/2),r-W/2);for(const Y of e){const K=Y.getBoundingClientRect(),an=(K.left+K.right)/2,Vt=(K.top+K.bottom)/2,Ke=V+(an-x)*u,I=ne+(Vt-E)*u;Y.style.transformBox="fill-box",Y.style.transformOrigin="center",Y.style.transform=`translate(${((Ke-an)/P).toFixed(2)}px, ${((I-Vt)/P).toFixed(2)}px) scale(${u.toFixed(3)})`}}function dm(){if(B!=="gameroom")return;const e=document.getElementById("grScroll");cm([...document.querySelectorAll(".neonSignArt")],e)}function gd(){B!=="ranch"||ze||(document.querySelectorAll(".ranchSignArt").forEach(e=>{e.style.transform=""}),lt(),fm(),Hf())}function Hf(){if(B!=="ranch"||ze)return;const e=document.getElementById("ranchScroll");if(!e)return;const t=e.getBoundingClientRect();document.querySelectorAll(".ranchSignArt").forEach(n=>{const s=n.getBoundingClientRect(),o=Math.min(t.right,innerWidth),i=Math.max(0,t.left-s.left)+Math.max(0,s.right-o);n.style.visibility=s.width>20&&i<8?"visible":"hidden"})}M("ranchScroll").addEventListener("scroll",()=>{B==="ranch"&&!ze&&Hf()},{passive:!0});function fm(){const e=document.querySelector(".doorHint"),t=document.getElementById("ranchScroll");if(!e||!t)return;e.style.transform="translateX(-50%)";const n=t.getBoundingClientRect(),s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,innerHeight)-s,l=e.getBoundingClientRect();let c=0;l.right>i&&(c-=l.right-i),l.left+c<o&&(c+=o-(l.left+c));let d=0;const f=t.querySelector(".savatar");if(f){const p=f.getBoundingClientRect(),b=f.querySelector(".nametag")?.getBoundingClientRect(),m=!!(b&&b.width>4&&b.height>4),k=m?Math.min(p.top,b.top):p.top,y=m?Math.min(p.left,b.left):p.left,u=m?Math.max(p.right,b.right):p.right,w=l.left+c;l.right+c>y-6&&w<u+6&&l.bottom+d>k-6&&l.top<p.top+p.height*.72&&(d+=k-48-(l.bottom+d))}if(l.top+d<a&&(d+=a-(l.top+d)),document.body.classList.contains("phone-portrait")){const p=document.querySelector(".ranchSign .ranchSignArt");if(p){const g=p.getBoundingClientRect(),b=l.left+c,m=l.right+c,k=l.top+d,y=l.bottom+d;if(g.width>20&&g.height>g.width*.7&&m>g.left+4&&b<g.right-4&&y>g.top+4&&k<g.bottom-4){let w=g.top-16-y;k+w<a&&(w+=a-(k+w));const P=f?.querySelector(".nametag")?.getBoundingClientRect(),x=y+w;!(P&&P.width>4&&P.height>4&&x>P.top-12&&m>P.left-6&&b<P.right+6)&&x<=r&&(d+=w)}}}(c||d)&&(e.style.transform=`translate(calc(-50% + ${c.toFixed(1)}px), ${d.toFixed(1)}px)`)}const pm=Bb({world:sf,roomW:pe,roomH:Re,currentRoom:()=>C.get().currentRoom,sparkle:()=>R.sparkle(),tap:()=>R.click(),onFound:(e,t)=>{if(lm(),t){const n=M("secrets");n.classList.remove("pulse"),n.offsetWidth,n.classList.add("pulse"),setTimeout(()=>N("🎁 A secret surprise appeared in your drawer!"),1400),Ut()}}});C.subscribe((e,t)=>{(t.type==="room/switch"||t.type==="game/reset")&&pm.update()});lm();window.__eggs=()=>({found:[...al()]});qC();
