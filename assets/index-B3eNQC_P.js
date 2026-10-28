(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const S0="modulepreload",P0=function(e){return"/kids-house-game/"+e},kf={},h=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(n.map(l=>{if(l=P0(l),l in kf)return;kf[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":S0,c||(f.as="script"),f.crossOrigin="",f.href=l,r&&f.setAttribute("nonce",r),document.head.appendChild(f),c)return new Promise((p,g)=>{f.addEventListener("load",p),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return o.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})},T0=150;function R0(e,t,n){const s=n.gap??T0,o=Math.max(n.minY,Math.min(n.maxY,e.y)),i=r=>Math.max(n.minX,Math.min(n.maxX,r)),a=r=>t.every(l=>Math.abs(l.x-r)>=s||Math.abs(l.y-o)>=s*.6);for(let r=0;r<=12;r++)for(const l of r?[1,-1]:[1]){const c=i(e.x+l*r*s*.6);if(a(c))return{x:c,y:o}}return{x:i(e.x),y:o}}const _i="#5a3d5c",te=(e=4)=>`stroke="${_i}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,gl=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],Bn=1e3,An=700,ul="M 30 660 C 150 640, 200 540, 330 545 S 540 650, 690 600 S 925 470, 850 375 S 640 330, 520 355 S 270 385, 250 285 S 330 145, 480 150 S 700 200, 790 150",Qn={x:115,y:170},cn={x:880,y:120},fn={x:600,y:480},zn={x:400,y:260},bh=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${te(3)}/><circle cx="0" cy="-10" r="20" fill="${s}" ${te(3)}/><circle cx="-12" cy="-2" r="12" fill="${s}" ${te(3)}/><circle cx="12" cy="-3" r="13" fill="${s}" ${te(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`,ws=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})" fill="#fff"><ellipse cx="0" cy="10" rx="46" ry="22"/><ellipse cx="-36" cy="16" rx="28" ry="16"/><ellipse cx="38" cy="14" rx="30" ry="18"/><ellipse cx="10" cy="2" rx="24" ry="18"/></g>`,fi=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">${[0,72,144,216,288].map(o=>`<circle cx="${(Math.cos(o*Math.PI/180)*8).toFixed(1)}" cy="${(Math.sin(o*Math.PI/180)*8).toFixed(1)}" r="6.5" fill="${n}" ${te(2)}/>`).join("")}<circle r="4.5" fill="#ffd43b" ${te(2)}/></g>`,qn=(e,t,n)=>`<g transform="translate(${e} ${t})">${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*4}" cy="${Math.sin(s*Math.PI/180)*4}" r="3.6" fill="${n}"/>`).join("")}<circle r="2.6" fill="#ffd43b"/></g>`;function B0(){return`<svg class="mapBg" viewBox="0 0 ${Bn} ${An}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${Bn}" height="${An}" rx="34" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="160" cy="420" rx="150" ry="90"/><ellipse cx="760" cy="250" rx="170" ry="70"/><ellipse cx="480" cy="640" rx="140" ry="50"/><ellipse cx="930" cy="600" rx="90" ry="110"/></g>
  <g fill="#93d78e" opacity=".7"><ellipse cx="420" cy="260" rx="70" ry="30"/><ellipse cx="80" cy="560" rx="60" ry="26"/><ellipse cx="700" cy="420" rx="50" ry="22"/></g>
  <!-- pond -->
  <ellipse cx="120" cy="470" rx="72" ry="40" fill="#8ecae6" ${te()}/><ellipse cx="108" cy="462" rx="42" ry="16" fill="#bde6f7"/><path d="M150 480 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <!-- side paths to the park and the ranch -->
  <path d="M250 285 Q190 250 150 215" fill="none" stroke="${_i}" stroke-width="30" stroke-linecap="round"/><path d="M250 285 Q190 250 150 215" fill="none" stroke="#f2dcb8" stroke-width="22" stroke-linecap="round"/>
  <!-- the street -->
  <path d="${ul}" fill="none" stroke="${_i}" stroke-width="58" stroke-linecap="round"/>
  <path id="mapRoad" d="${ul}" fill="none" stroke="#f2dcb8" stroke-width="48" stroke-linecap="round"/>
  <path d="${ul}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 16" stroke-linecap="round" opacity=".9"/>
  <!-- town square -->
  <g transform="translate(${fn.x} ${fn.y})"><circle r="74" fill="#f7e6c8" ${te()}/><circle r="74" fill="none" stroke="#e6cfa6" stroke-width="10" stroke-dasharray="10 12" transform="scale(.82)"/>
    <circle r="30" fill="#bde6f7" ${te()}/><circle r="13" fill="#fff6e6" ${te(3)}/><path d="M0 -13 Q-8 -32 -16 -20 M0 -13 Q8 -32 16 -20 M0 -13 V-34" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>
    ${qn(-52,-40,"#ff8fab")}${qn(54,-38,"#b197fc")}${qn(-56,40,"#ffd43b")}${qn(52,44,"#ff8fab")}</g>
  ${[[60,330,"#ff8fab"],[300,470,"#b197fc"],[430,560,"#ffd43b"],[760,520,"#ff8fab"],[950,260,"#b197fc"],[600,260,"#ffd43b"],[380,90,"#ff8fab"],[40,120,"#b197fc"],[960,420,"#ffd43b"],[840,640,"#b197fc"],[210,620,"#ff8fab"]].map(([e,t,n])=>qn(+e,+t,String(n))+qn(+e+14,+t+8,String(n))).join("")}
  </svg>`}function wf(e,t,n=Bn,s=An){const o=[];let i=7;const a=()=>(i=(i*9301+49297)%233280)/233280;for(let r=0;r<260&&o.length<34;r++){const l=30+a()*(n-60),c=40+a()*(s-70);t(l,c)||e.some(d=>Math.hypot(d.x-l,d.y-c)<d.r)||(e.push({x:l,y:c,r:46}),o.push(bh(l,c,.75+a()*.45,["#5cc985","#4fbf7a","#78d39a"][r%3])))}return`<svg class="mapTrees" viewBox="0 0 ${n} ${s}" xmlns="http://www.w3.org/2000/svg">${o.join("")}</svg>`}function A0(e,t){const n=e/2,s=`M ${n} 36 C ${n-36} ${t*.28}, ${n+28} ${t*.48}, ${n-8} ${t*.68} S ${n+18} ${t*.86}, ${n} ${t-28}`;return`<svg class="mapBg" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="${t}" rx="28" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="${e*.22}" cy="${t*.22}" rx="90" ry="48"/><ellipse cx="${e*.78}" cy="${t*.42}" rx="80" ry="40"/><ellipse cx="${e*.3}" cy="${t*.72}" rx="100" ry="46"/></g>
  <ellipse cx="78" cy="${t*.58}" rx="46" ry="28" fill="#8ecae6" ${te()}/><ellipse cx="70" cy="${t*.56}" rx="24" ry="10" fill="#bde6f7"/>
  <path d="${s}" fill="none" stroke="${_i}" stroke-width="44" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#f2dcb8" stroke-width="34" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round" opacity=".9"/>
  ${[[40,250,"#ff8fab"],[500,280,"#b197fc"],[70,520,"#ffd43b"],[490,640,"#ff8fab"],[50,860,"#74c0fc"],[500,980,"#ffd43b"]].map(([o,i,a])=>qn(+o,+i,String(a))+qn(+o+16,+i+10,String(a))).join("")}
  </svg>`}const D0=(e,t,n=1,s="#4fbf7a")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="10" rx="28" ry="8" fill="#000" opacity=".08"/><circle cx="-14" cy="-2" r="16" fill="${s}" ${te(3)}/><circle cx="14" cy="0" r="18" fill="${s}" ${te(3)}/><circle cx="0" cy="-12" r="14" fill="${s}" ${te(3)}/><circle cx="-4" cy="-16" r="4" fill="#fff" opacity=".28"/></g>`,I0=(e,t,n="#ff8fab")=>`<g transform="translate(${e} ${t})"><ellipse cx="-7" cy="-2" rx="8" ry="5" fill="${n}" ${te(2)} transform="rotate(-24)"/><ellipse cx="7" cy="-2" rx="8" ry="5" fill="${n}" ${te(2)} transform="rotate(24)"/><ellipse cx="-6" cy="4" rx="6" ry="4" fill="#b197fc" ${te(1.6)} transform="rotate(18)"/><ellipse cx="6" cy="4" rx="6" ry="4" fill="#b197fc" ${te(1.6)} transform="rotate(-18)"/><path d="M0 -6 V8" ${te(2)}/></g>`;function H0(e,t,n){const s=e/2,o=(f,p,g)=>p>t*.4&&p<t-28&&Math.abs(f-s)>52&&!n.some(b=>Math.hypot(b.x-f,b.y-p)<b.r+g),i=[.07,.15,.22,.78,.85,.93],a=[.46,.54,.62,.7,.78,.86,.93],r=["#ff8fab","#b197fc","#ffd43b","#74c0fc","#69db7c"],l=[];let c=0;a.forEach((f,p)=>{i.forEach((g,b)=>{const m=Math.round(e*g+((p+b)%2?8:-6)),v=Math.round(t*f);if((p+b)%3===0){if(!o(m,v,34))return;l.push(D0(m,v,.85+b%2*.15,["#4fbf7a","#5cc985","#3dae6a"][(p+b)%3]))}else{if(!o(m,v,18))return;const y=r[(p*2+b)%r.length];l.push(fi(m,v,y,.85)),(p+b)%2===0&&o(m+18,v+12,14)&&l.push(fi(m+18,v+12,r[(p+b+2)%r.length],.7))}c++})});const d=[[e*.2,t*.5],[e*.8,t*.66],[e*.18,t*.84]];for(const[f,p]of d)o(f,p,16)&&l.push(I0(Math.round(f),Math.round(p),c%2?"#ffd43b":"#ff8fab"));return`<svg class="mapMeadowFill" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">${l.join("")}</svg>`}const O0=`<svg class="mapSkyArt" viewBox="0 0 900 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
  ${ws(280,28,1.05)}${ws(430,8,.8)}${ws(560,36,.95)}
  ${ws(250,88,.75)}${ws(390,108,1.05)}${ws(540,96,.85)}${ws(640,78,.7)}
  <g fill="none" stroke-linecap="round">
    ${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M300 ${118+t*6} A70 48 0 0 1 430 ${112+t*6}" stroke="${e}" stroke-width="5"/>`).join("")}
  </g>
</svg>`,W0=`<svg class="mapMeadowArt" viewBox="0 0 900 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
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
  ${[[48,188,"#ff8fab",.85],[120,176,"#ffd43b",.7],[200,198,"#b197fc",.9],[280,172,"#ff8fab",.75],[360,204,"#74c0fc",.8],[450,178,"#ffd43b",.85],[530,200,"#ff8fab",.75],[620,174,"#b197fc",.8],[700,196,"#69db7c",.7],[790,180,"#ffd43b",.85]].map(([e,t,n,s])=>fi(+e,+t,String(n),+s)).join("")}
  ${[[80,248,"#ff8fab"],[160,268,"#b197fc"],[250,242,"#ffd43b"],[340,274,"#ff8fab"],[430,250,"#74c0fc"],[520,270,"#b197fc"],[610,246,"#ffd43b"],[700,272,"#ff8fab"],[790,252,"#69db7c"]].map(([e,t,n])=>fi(+e,+t,String(n),1.05)).join("")}
  ${[[110,304,"#ffd43b"],[230,292,"#ff8fab"],[360,308,"#b197fc"],[490,294,"#74c0fc"],[620,306,"#ff8fab"],[750,296,"#ffd43b"]].map(([e,t,n])=>fi(+e,+t,String(n),.9)).join("")}
</svg>`,vf=`<svg viewBox="0 0 200 170"><ellipse class="parkLawn" cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${te()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${te(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${te(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${te(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${te(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${te(2.5)}/>
  ${bh(40,66,1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${te(3)}/><path d="M178 88 V132" ${te(4)}/>
</svg>`,_f=`<svg viewBox="0 0 220 180"><ellipse class="ranchGrass" cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${te()}/>
  ${gl.map((e,t)=>`<path d="M${20+t*7} 120 A${90-t*7} ${84-t*7} 0 0 1 ${200-t*7} 120" fill="none" stroke="${e}" stroke-width="7"/>`).join("")}
  <path d="M60 140 V82 L80 58 H140 L160 82 V140 Z" fill="#ef5b5b" ${te(4)}/>
  <path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${_i}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  ${gl.map((e,t)=>`<path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${e}" stroke-width="1.3" transform="translate(0 ${-3+t*1.2})"/>`).join("")}
  <rect x="88" y="100" width="44" height="40" rx="3" fill="#d94848" ${te(3)}/><path d="M88 100 L132 140 M132 100 L88 140" stroke="#fff6e6" stroke-width="3"/>
  <rect x="94" y="70" width="32" height="18" rx="4" fill="#fff6e6" ${te(3)}/>
  <path d="M10 150 H52 M168 150 H212 M14 140 V158 M30 140 V158 M46 140 V158 M174 140 V158 M190 140 V158 M206 140 V158" stroke="#fff6e6" stroke-width="5" stroke-linecap="round"/><path d="M10 150 H52 M168 150 H212" ${te(1.5)}/>
  <g transform="translate(178 122) scale(.42)"><ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" ${te(5)}/><path d="M24 -8 L40 -34 L54 -26 L36 2 Z" fill="#fff" ${te(5)}/>${gl.slice(0,4).map((e,t)=>`<path d="M38 ${-34+t*5} q-14 4 -20 14" fill="none" stroke="${e}" stroke-width="5" stroke-linecap="round"/>`).join("")}<path d="M-20 14 V34 M20 14 V34" ${te(6)}/></g>
</svg>`,$f=`<svg viewBox="0 0 190 156">
  <ellipse cx="95" cy="118" rx="88" ry="32" fill="#ffd0e6" ${te()}/>
  <path d="M28 108 V62 L95 28 L162 62 V108 Z" fill="#fff0f6" ${te(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="#ff6b9a" ${te(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="none" stroke="#ffd43b" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="78" y="78" width="34" height="30" rx="4" fill="#ff8ec8" ${te(3)}/>
  <path d="M95 86 C90 80 82 82 86 90 C90 96 95 100 95 100 C95 100 100 96 104 90 C108 82 100 80 95 86 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  <rect x="42" y="74" width="22" height="16" rx="3" fill="#66d9e8" ${te(2)}/><rect x="126" y="74" width="22" height="16" rx="3" fill="#d0bfff" ${te(2)}/>
  ${[36,52,68,84,100,116,132,148].map((e,t)=>`<circle class="clubBulb" cx="${e}" cy="58" r="3.2" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" ${te(1.4)}/>`).join("")}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`,Yc=`<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${te(3)}/><path d="M17 8 V35 M31 13 V40" ${te(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${te(2)}/></svg>`,Kc=e=>e.indexOf("data-chibi")>=0?e.replace('viewBox="0 0 200 320"','viewBox="24 0 152 168"'):e.replace('viewBox="0 0 100 160"','viewBox="14 2 72 74"'),kh=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),U0={piano:"keys",keyboard:"keys",stove:"stove","yard-swing":"swing","cc-macrame-swing":"swing","little-slide":"slide",aquarium:"water","cc-cottage-aquarium":"water",fish:"water","pink-fountain":"water","lily-pond":"water",birdbath:"water","doll-house":"dollhouse"};function Xc(e){return U0[kh(e)]??null}const V0=e=>kh(e)==="rubber-ducky",vs={play:110,listen:260,stir:140,swing:70,slide:90,look:200,kneel:120},xf=9e3;function Q0(e,t,n,s,o={}){const i=Xc(e);if(!i)return null;switch(i){case"keys":return o.keysPlaying?.has(t)?!s&&n<=vs.play?{kind:"play",d:n}:n<=vs.listen?{kind:"listen",d:n+40}:null:null;case"stove":return!s&&o.opened?.has(t)&&n<=vs.stir?{kind:"stir",d:n}:null;case"swing":return!s&&n<=vs.swing?{kind:"swing",d:n}:null;case"slide":return!s&&n<=vs.slide?{kind:"slide",d:n}:null;case"water":return n<=vs.look?{kind:"look",d:n+20}:null;case"dollhouse":return!s&&n<=vs.kneel?{kind:"kneel",d:n}:null}}const Cr=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),z0={"cute-speaker":"stereo","cc-record-player":"stereo","retro-radio":"stereo","music-box":"musicbox",tv:"tv",fireplace:"fire","brick-fireplace":"fire","wc-woodstove":"fire",woodstove:"fire","wc-stone-hearth":"fire","fire-pit":"fire"};function Yn(e){return z0[Cr(e)]??null}function wh(e){return Yn(e)!==null}function Jc(e){const t=Cr(e);return t==="ball"||t==="beach-ball"||t==="balloon"?"bounce":t==="teddy"||/plush/.test(t)?"hug":null}const Ro=e=>/(^|-)tub$/.test(Cr(e)),Bo=e=>/fridge$/.test(Cr(e)),q0={stereo:220,musicbox:160,tv:280,fire:230},Kl=70,vh=130,Z0=.4,N0=6,Mf=2e4,Te=900,F0=["stereo","tv","fire","musicbox"];function j0(e,t){let n=2166136261;const s=e+"|"+t;for(let o=0;o<s.length;o++)n^=s.charCodeAt(o),n=Math.imul(n,16777619);return(n>>>0)%1e3/1e3}const ml=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5);function G0(e,t,n={}){const s=new Map,o=[...t].sort((r,l)=>r.id<l.id?-1:r.id>l.id?1:0),i=e.filter(r=>r.on&&Yn(r.kind)&&!(Yn(r.kind)==="musicbox"&&n.musicBoxDone?.has(r.id))),a=[];for(const r of o){if(r.lying)continue;let l=null;for(const c of F0){for(const d of i){if(Yn(d.kind)!==c)continue;const f=ml(r,d);if(f>q0[c]||r.seated&&c!=="tv"&&c!=="musicbox")continue;const p=c==="stereo"?"dance":c==="tv"?"watch":c==="fire"?"warm":"sway";(!l||f<l.d||f===l.d&&d.id<l.it.id)&&(l={c:r,it:d,d:f,kind:p})}if(l)break}if(!l)for(const c of e){const d=Q0(c.kind,c.id,ml(r,c),!!r.seated,{...n,opened:n.opened??n.fridgesOpen});if(d&&(!l||d.d<l.d||d.d===l.d&&c.id<l.it.id)&&(l={c:r,it:c,d:d.d,kind:d.kind}),r.seated)continue;const f=Jc(c.kind);let p=null,g=ml(r,c);f&&g<=Kl?p=f:Bo(c.kind)&&n.fridgesOpen?.has(c.id)&&g<=vh?p="nibble":Ro(c.kind)&&Math.abs(r.x-c.x)<=(c.w??240)*Z0&&Math.abs(r.y-c.y)<=40&&(p="bathe"),p&&(!l||g<l.d||g===l.d&&c.id<l.it.id)&&(l={c:r,it:c,d:g,kind:p})}l&&a.push(l)}a.sort((r,l)=>r.d-l.d||(r.c.id<l.c.id?-1:1));for(const r of a.slice(0,N0))s.set(r.c.id,{kind:r.kind,item:r.it.id,phase:j0(r.it.id,r.c.id),face:r.it.x<r.c.x?-1:1});return s}function Is(e,t,n){return-((n+e*t)%t)}const Y0={},Wt=e=>(Y0?.VITE_STORE_PREFIX??"")+e,K0=400,Sr=["#ffe0c4","#f6d2b5","#f1c27d","#e0ac69","#c9956c","#c68642","#a86b3c","#8d5524","#5c3a1e","#3d2914"],Pr=["#2b1d16","#5b3a29","#a0522d","#f4d58d","#ff8fab","#8ecae6","#b388d6","#ff9f43","#1d1416","#c8602a","#7a4b32","#f7f1e8"],ed=["#5a321c","#3f9b52","#3d7ec4","#c48a3a","#7b4fb8"],Rt=["#ff7aa8","#ffd166","#5aa9e6","#80ed99","#c9a0dc","#ff9f68","#ffffff","#5a3d5c","#ff8f7a","#7ec8c3","#f7f3ee","#f4a3c8","#6b8e4e","#e8d5b5","#ef6b6b","#3d4a6b"],Tr=["short","bob","buns","topbun","pixie","long","wavy","puffs","afro","curlybob","coily","boxbraids","braids","sidebraid","crown","pony","sidepony","pigtails","lowbun","locs","halfup","bangs","sidebangs","wavybob"],Rr=["classic","stripes","hoodie","sweater","tank","puff","ruffle","button","jersey","cardigan","bib","raincoat"],Br=["pants","jeans","shorts","skirt","tutu","leggings","overalls","joggers"],Ar=["","twirl","sundress","party","pinafore","jumper","ballet","nightgown","raindress"],Dr=["classic","sneakers","lightup","boots","rainboots","sandals","maryjanes","slippers"],Ir=["round","big","sleepy","sparkle","soft","bright"],bo=["glasses","square","sunnies","bow","bigbow","headband","flower","cap","beanie","sunhat","catears","earmuffs"],X0=new Set(Tr),J0=new Set(Rr),em=new Set(Br),tm=new Set(Ar),nm=new Set(Dr),sm=new Set(Ir),om=new Set(bo),im=new Set(["short","pixie","coily","afro","bangs"]),am=new Set(["buns","puffs"]),rm=new Set(["topbun","lowbun"]),lm={hair:"buns",hairC:"#5b3a29",skin:"#f1c27d",eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"pants",bottomC:"#5aa9e6",dress:"",dressC:"#ff7aa8",shoes:"classic",shoesC:"#5a3d5c",accC:"#ffd166"};function cm(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ro(e,t){return typeof e=="string"&&t.has(e)}function $n(e,t){if(typeof e!="string")return null;const n=e.trim().toLowerCase();for(let s=0;s<t.length;s++)if(t[s]===n)return t[s];return null}function Vi(e){if(!cm(e))return null;let t=0;try{t=JSON.stringify(e).length}catch{return null}if(t>K0)return null;const n={v:1};ro(e.hair,X0)&&(n.hair=e.hair);const s=$n(e.hairC,Pr);s&&(n.hairC=s);const o=$n(e.skin,Sr);o&&(n.skin=o),ro(e.eyes,sm)&&(n.eyes=e.eyes);const i=$n(e.eyeC,ed);i&&(n.eyeC=i),(e.freckles===!0||e.freckles===!1)&&(n.freckles=e.freckles),(e.blush===!0||e.blush===!1)&&(n.blush=e.blush),ro(e.top,J0)&&(n.top=e.top);const a=$n(e.topC,Rt);a&&(n.topC=a),ro(e.bottom,em)&&(n.bottom=e.bottom);const r=$n(e.bottomC,Rt);r&&(n.bottomC=r),ro(e.dress,tm)&&(n.dress=e.dress);const l=$n(e.dressC,Rt);l&&(n.dressC=l),ro(e.shoes,nm)&&(n.shoes=e.shoes);const c=$n(e.shoesC,Rt);if(c&&(n.shoesC=c),Array.isArray(e.acc)){const f=[];for(let p=0;p<e.acc.length&&f.length<2;p++){const g=e.acc[p];typeof g=="string"&&om.has(g)&&f.indexOf(g)<0&&f.push(g)}n.acc=f}const d=$n(e.accC,Rt);return d&&(n.accC=d),n}function ds(e){const t=lm,n=e??{};return{v:1,hair:n.hair??t.hair,hairC:n.hairC??t.hairC,skin:n.skin??t.skin,eyes:n.eyes??t.eyes,eyeC:n.eyeC??t.eyeC,freckles:n.freckles??t.freckles,blush:n.blush??t.blush,top:n.top??t.top,topC:n.topC??t.topC,bottom:n.bottom??t.bottom,bottomC:n.bottomC??t.bottomC,dress:n.dress??t.dress,dressC:n.dressC??t.dressC,shoes:n.shoes??t.shoes,shoesC:n.shoesC??t.shoesC,acc:n.acc?n.acc.slice():[],accC:n.accC??t.accC}}function Lf(e){const t=/^#([0-9a-f]{6})$/i.exec(e.trim());if(!t){const s=/^#([0-9a-f]{3})$/i.exec(e.trim());return s?[parseInt(s[1][0]+s[1][0],16),parseInt(s[1][1]+s[1][1],16),parseInt(s[1][2]+s[1][2],16)]:null}const n=parseInt(t[1],16);return[n>>16&255,n>>8&255,n&255]}function ea(e,t){const n=$n(e,t);if(n)return n;const s=Lf(e);if(!s)return t[0];let o=t[0],i=1e12;for(let a=0;a<t.length;a++){const r=Lf(t[a]);if(!r)continue;const l=(s[0]-r[0])*(s[0]-r[0])+(s[1]-r[1])*(s[1]-r[1])+(s[2]-r[2])*(s[2]-r[2]);l<i&&(i=l,o=t[a])}return o}function dm(e){return im.has(e)?0:am.has(e)?2:rm.has(e)?3:1}function fm(e){for(let t=0;t<e.length;t++){const n=e[t];if(n==="glasses"||n==="square"||n==="sunnies")return 2}for(let t=0;t<e.length;t++){const n=e[t];if(n==="cap"||n==="beanie"||n==="sunhat")return 3}for(let t=0;t<e.length;t++){const n=e[t];if(n==="bow"||n==="bigbow")return 1}return 0}function Hr(e){const t=ds(e),n=t.dress!=="";return{skin:t.skin,hair:t.hairC,hairStyle:dm(t.hair),shirt:n?t.dressC:t.topC,pants:n?t.dressC:t.bottomC,acc:fm(t.acc)}}const pm=["short","bob","buns","topbun"];function za(e){const t=typeof e.hairStyle=="number"&&e.hairStyle>=0&&e.hairStyle<=3?Math.round(e.hairStyle):0,n=e.acc===1?["bow"]:e.acc===2?["glasses"]:e.acc===3?["cap"]:[],s=ea(String(e.shirt??""),Rt);return{v:1,hair:pm[t],hairC:ea(String(e.hair??""),Pr),skin:ea(String(e.skin??""),Sr),eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:s,bottom:"pants",bottomC:ea(String(e.pants??""),Rt),dress:"",dressC:s,shoes:"classic",shoesC:"#5a3d5c",acc:n,accC:"#ffd166"}}function $i(e){const t=Vi(e)??{},n=ds(t);return{...Hr(n),look2:n}}const hm=new Set(["glasses","square","sunnies"]),gm=new Set(["bow","bigbow","flower","headband"]),um=new Set(["cap","beanie","sunhat","catears","earmuffs"]);function qa(e){return hm.has(e)?"face":gm.has(e)?"bow":um.has(e)?"hat":"other"}function Je(e,t){return t[Math.floor(e()*t.length)]}function Or(e=Math.random){const t=e()<.38,n=e();let s=[];if(n<.22)s=[];else if(n<.68)s=[Je(e,bo)];else{const o=Je(e,bo),i=bo.filter(a=>qa(a)!==qa(o));s=[o,Je(e,i)]}return{v:1,hair:Je(e,Tr),hairC:Je(e,Pr),skin:Je(e,Sr),eyes:Je(e,Ir),eyeC:Je(e,ed),freckles:e()<.4,blush:e()<.85,top:Je(e,Rr),topC:Je(e,Rt),bottom:Je(e,Br),bottomC:Je(e,Rt),dress:t?Je(e,Ar.filter(o=>o!=="")):"",dressC:Je(e,Rt),shoes:Je(e,Dr),shoesC:Je(e,Rt),acc:s,accC:Je(e,Rt)}}function mm(e,t=Math.random){const n=e.characters[0];if(!n)return e;const s=Or(t),o=Hr(s),i=e.characters.slice();return i[0]={...n,...o,look2:s},{...e,characters:i}}function ym(e){const t=[e.skin,e.hair,e.hairStyle,e.shirt,e.pants,e.acc,e.look2?JSON.stringify(e.look2):""].join("|");return e.costume?t+"|cos:"+e.costume:t}const Ef={m:10,d:24},Cf={m:11,d:2},Za={yellow:"#ffd166",denim:"#4f7fb8",rose:"#f28fb0",mint:"#7fd8b8"},bm=["helper-yellow","helper-denim","helper-rose","helper-mint","witch","cat","ghost","skeleton","bat"],km=new Set(bm),Sf={helper:"Yellow Helper",witch:"Witch hat",cat:"Black cat",ghost:"Ghost sheet",skeleton:"Bone PJs",bat:"Bat cape"};function to(e){return typeof e=="string"&&km.has(e)?e:null}function wm(e=new Date){const t=e.getMonth()+1,n=e.getDate();return t===Ef.m?n>=Ef.d:t===Cf.m?n<=Cf.d:!1}function vm(){const e=typeof globalThis<"u"?globalThis:{};if(typeof e.__costumeDate=="string"){const t=new Date(e.__costumeDate+"T12:00:00");if(!isNaN(+t))return t}return new Date}function Wr(){return wm(vm())}function _m(e){if(!e||e.costume==null)return null;const t=to(e.costume);return t&&Wr()?t:null}const Qi=3600,Ws=470,Dn=590,Ts=["goat","sheep","piglet","chicks","bunny","cow"],$m=[1085,1215,1345,1470,1600,1735],xm=520,td=1900,nd=[600,800,1e3,1200,1400,1600],Xl=435,Mm=["Chestnut","Snowy","Midnight","Sunny","Rainbow"],_h=[2470,2600,2730,2860,2990],Us=540,Lm=["pet","carrot","apple","hay"],Jl=6,Em=e=>3175+e*68,Cm=8e4,ec=20,Sm=1500,$h=["egg","carrot","flower"],Pm={egg:"ranch-egg",carrot:"ranch-carrot",flower:"ranch-bouquet"},Tm=()=>({egg:0,carrot:0,flower:0}),Rm=(e,t,n)=>Number.isInteger(e)&&e>=t&&e<=n?e:null;function sd(e){const t=Tm();if(!e||typeof e!="object")return t;for(const n of $h)t[n]=Rm(e[n],0,ec)??0;return t}function od(e){const t=Array(Jl).fill(null);if(Array.isArray(e))for(let n=0;n<Jl;n++){const s=e[n];if(!s||s.seed!=="carrot"&&s.seed!=="flower")continue;const o=Number(s.at),i=Number(s.wet);Number.isFinite(o)&&Number.isFinite(i)&&(t[n]={seed:s.seed,at:o,wet:i})}return t}function Ur(e,t){if(!e||!e.wet)return 0;const n=(t-e.wet)/Cm;return n>=1?3:n>=.4?2:1}function tc(e,t,n,s,o=0){const i=e.slice(),a={...t};switch(n.op){case"plant":return i[n.i]?"taken":(i[n.i]={seed:n.seed,at:s,wet:0},{plots:i,basket:a,garden:!0});case"water":{const r=i[n.i];return r?r.wet?"wet":(i[n.i]={...r,wet:s},{plots:i,basket:a,garden:!0}):"empty"}case"pick":{const r=i[n.i];return r?Ur(r,s)<3?"notReady":a[r.seed]>=ec?"full":(a[r.seed]++,i[n.i]=null,{plots:i,basket:a,garden:!0,got:r.seed}):"empty"}case"egg":return s-o<Sm?"slow":a.egg>=ec?"full":(a.egg++,{plots:i,basket:a,garden:!1,got:"egg"});case"use":return a.carrot<=0?"none":(a.carrot--,{plots:i,basket:a,garden:!1});case"take":return a[n.kind]<=0?"none":(a[n.kind]--,{plots:i,basket:a,garden:!1})}}const Zn=80,Bm=30*24*60*60*1e3,Am=5,xh=6,On=["#ffd6e8","#fff3b0","#d8f5e8","#e6d6ff","#d6efff"],Dm=/^m[A-Za-z0-9]{4,40}$/,Im=/^[A-Za-z0-9:_\/.-]{1,80}$/;function yl(e,t=Date.now()){const n=Math.floor((t-e)/864e5);return n<=0?"today":n===1?"yesterday":n<7?"a few days ago":"a while ago"}function Hm(e,t=Date.now()){const n=e?.letters;if(!Array.isArray(n))return null;const s=[];for(const i of n.slice(-30*2)){if(!i||typeof i!="object")continue;const a=i;if(typeof a.id!="string"||!Dm.test(a.id)||typeof a.from!="string")continue;const r=a.from.normalize("NFC").replace(/\s+/g," ").trim();if(!r||r.length>24||typeof a.fromPid!="string"||!Im.test(a.fromPid)||typeof a.text!="string"||a.text.length>Zn||typeof a.at!="number"||!Number.isFinite(a.at)||t-a.at>Bm||a.at>t+864e5||!Number.isInteger(a.color)||a.color<0||a.color>=Am||!Number.isInteger(a.sticker)||a.sticker<0||a.sticker>=xh)continue;const l=a.text.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(l.length>Zn)continue;const c={id:a.id,from:r,fromPid:a.fromPid,text:l,color:a.color,sticker:a.sticker,at:a.at};a.read===!0&&(c.read=!0),s.push(c)}const o=s.slice(-30);return o.length?{letters:o}:null}function id(e){return e?.letters.filter(t=>!t.read&&t.text).length??0}const Om=/^[A-Za-z0-9:_\/.-]{1,80}$/,Mh=/crib|bassinet|high-?chair|cat-bed|pet-bed|dog-bed|kennel|tulip|flower|toadstool|mobile/,bl={bed:{head:{x:.24,y:.42},pillow:{x:.1,y:.27,w:.22,h:.18},mattress:{x:.36,y:.34,w:.36,h:.16},clip:"starter"},"wooden-bed":{head:{x:.22,y:.53},pillow:{x:.12,y:.36,w:.24,h:.18},mattress:{x:.38,y:.46,w:.32,h:.16},clip:"wooden"},"checker-bed":{head:{x:.16,y:.45},pillow:{x:.08,y:.26,w:.22,h:.22},mattress:{x:.38,y:.4,w:.32,h:.16},clip:"checker"},"bunk-bed":{head:{x:.11,y:.62},pillow:{x:.05,y:.52,w:.18,h:.14},mattress:{x:.22,y:.56,w:.36,h:.14},clip:"bunk"},"canopy-bed":{head:{x:.38,y:.52},pillow:{x:.28,y:.46,w:.24,h:.14},mattress:{x:.48,y:.48,w:.28,h:.16},clip:"canopy"},"cc-heart-bed":{head:{x:.22,y:.67},pillow:{x:.12,y:.58,w:.26,h:.16},mattress:{x:.36,y:.64,w:.36,h:.16},clip:"heart"},"cc-canopy-daybed":{head:{x:.37,y:.58},pillow:{x:.26,y:.5,w:.26,h:.16},mattress:{x:.48,y:.54,w:.3,h:.16},clip:"daybed"},"wc-plaid-bed":{head:{x:.24,y:.26},pillow:{x:.08,y:.14,w:.3,h:.2},mattress:{x:.36,y:.18,w:.3,h:.18},clip:"wooden"}},Wm=["bed","pack:wooden-bed","pack:checker-bed","pack:bunk-bed","pack:canopy-bed","pack:cc-heart-bed","pack:cc-canopy-daybed","pack:wc-plaid-bed"];function Lh(e){return e==="bed"||/bunk/.test(e)||/daybed/.test(e)?!0:/(^|[-_:])bed$/.test(e)}function Um(){return Wm.slice()}function Vr(e){const t=String(e||"").toLowerCase();if(!t||Mh.test(t)||!Lh(t))return null;const n=t.replace(/^pack:/,"");return bl[n]||bl[t]||bl.bed}const Vm={head:{x:55.0733,y:59.7445},chest:{x:60,y:114},hip:{x:60,y:138},classic:{x:60,y:52.8}},Pf=48,Tf=138.24;function Eh(e,t){const n=-90*Math.PI/180,s=Math.cos(n),o=Math.sin(n),i=e-Pf,a=t-Tf,r=Pf+s*i-o*a,l=Tf+o*i+s*a;return{x:r-60,y:l-192}}function Na(e,t){const n=Vm[e],s=Eh(n.x,n.y);return{x:t?-s.x:s.x,y:s.y}}const Rf=120,kl=192,Qm=.26;function zm(e,t,n,s,o=1){const i=o>0?o:1;if(n==="lie"&&s){const r=-t*i+210.24,l=-e*i+186.24;return{x:-Rf*i/2+r,y:-kl*i+l}}if(n==="lie"){const r=Eh(e,t);return{x:r.x*i,y:r.y*i}}const a=n==="sit"?Qm*kl*i:0;return{x:(e-Rf/2)*i,y:(t-kl)*i+a}}function qm(e,t,n,s,o){const i=Vr(e);if(!i||t<1||n<1)return null;const a=Na("head",!1),r=(i.head.x-.5)*t-a.x,l=(i.head.y-1)*n-a.y,c=Na(s,o);return{x:.5+((o?-r:r)+c.x)/t,y:1+(l+c.y)/n}}function no(e){const t=String(e||"").toLowerCase();return!t||Mh.test(t)?null:Lh(t)?{pose:"lie",spots:[{dx:0,dy:0}]}:/sofa|couch|loveseat/.test(t)?{pose:"sit",spots:[{dx:-.18,dy:-.33},{dx:.18,dy:-.33}]}:/armchair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/bench|window-seat/.test(t)?{pose:"sit",spots:[{dx:-.22,dy:-.3},{dx:.22,dy:-.3}]}:/ottoman/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/stool|rocker/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.38}]}:/chair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.48}]}:null}function Ch(e){const t=no(e.kind);if(!t)return[];const n=e.scale||1,s=t.pose==="lie"?Vr(e.kind):null;if(s){const o=e.w*n,i=e.h*n,a=Na("head",!1),r=(s.head.x-.5)*o-a.x,l=(s.head.y-1)*i-a.y;return[{x:e.x+(e.flip?-r:r),y:e.footY+l,pose:"lie",n:0}]}return t.spots.map((o,i)=>{const a=o.dx*e.w*n,r=o.dy*e.h*n,l=i===1?1:0;return{x:e.x+(e.flip?-a:a),y:e.footY+r,pose:t.pose,n:l}})}function xi(e){const t=(r,l)=>({x:r,y:l,seat:null,toast:null,moved:!0});if(e.mode!=="play")return t(e.releaseX,e.releaseY);const n=e.piece;if(!n)return e.via==="drag"?t(e.releaseX,e.releaseY):{x:e.releaseX,y:e.releaseY,seat:null,toast:null,moved:!1};if(e.via==="tap"&&e.alreadyOn===n.id)return t(n.x,n.footY);const s=new Set(e.occupied.filter(r=>r.item===n.id).map(r=>r.n)),o=Ch(n).filter(r=>!s.has(r.n));if(!o.length)return e.via==="tap"?{x:e.releaseX,y:e.releaseY,seat:null,toast:"Someone is already there!",moved:!1}:t(e.releaseX,e.releaseY);let i=o[0],a=1/0;for(const r of o){const l=(r.x-e.releaseX)**2+(r.y-e.releaseY)**2;l<a&&(i=r,a=l)}return{x:i.x,y:i.y,seat:{item:n.id,pose:i.pose,n:i.n},toast:null,moved:!0}}const Zm={sofa:260,armchair:150,bed:300,chair:100,stool:90,rocker:190,"yard-bench":140,"bar-stool":52.8,"bunk-bed":294,"canopy-bed":294,"cc-bubble-chair":142,"cc-canopy-daybed":276,"cc-dryer-chair":164,"cc-heart-bed":236,"cc-mani-chair":188,"cc-mushroom-stool":112,"cc-scallop-loveseat":248,"checker-bed":196,"cloud-sofa":212,"comfy-armchair":161.7,"cream-sofa":234.6,"egg-chair":126,"fancy-sofa":234.6,"gaming-chair":101.4,"lattice-bench":147,"puffy-stool":46.9,"rocking-chair":137.2,"salon-chair":111.8,"swivel-stool":46.2,"waiting-bench":166.6,"wash-chair":186.2,"wood-armchair":127.4,"wood-stool":46.2,"wooden-bed":235.2};function Mi(e){const t=String(e||"").toLowerCase().replace(/^pack:/,"");return Zm[t]??320}const zi=540;function ad(e,t,n,s=2400){const o=Math.max(0,t)/2+70,i=40;let a=n<e-8?-1:1,r=e+a*o;return(r<i||r>s-i)&&(a=-a,r=e+a*o),r<i&&(r=i),r>s-i&&(r=s-i),{x:r,y:zi}}function rd(e){if(!e||typeof e!="object")return null;const t=e;return typeof t.item!="string"||!Om.test(t.item)||t.pose!=="sit"&&t.pose!=="lie"||t.n!==0&&t.n!==1?null:{item:t.item,pose:t.pose,n:t.n}}function nc(e,t){if(!e)return null;const n=rd(e);return!n||!t?.some(s=>s&&s.id===n.item)?null:n}const Hs=["sleepy","hungry","playful","clean"],Nm=1,Fm=4*6e4,jm=2*6e4,Gm=75e3;function Ym(e,t){return e.characters.some(n=>ja(n))?Fm:t===0?Gm:jm}const ld=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),Km=/^(cake|juice|cupcake|cookie|apple|pie|pizza|donut|sandwich|milk|bread|fruit|.*-cake|.*-pie|.*cookies?)$/,Fa=e=>Km.test(ld(e)),Li=e=>!!Jc(e)||ld(e)==="rubber-ducky";function cd(e){if(!e||typeof e!="object")return null;const t={};for(const n of Hs){const s=e[n];if(typeof s!="number"||!Number.isFinite(s))continue;const o=Math.max(0,Math.min(3,Math.round(s)));o<3&&(t[n]=o)}return Object.keys(t).length?t:null}function Vs(e,t){const n=e?.needs?.[t];return typeof n=="number"?Math.max(0,Math.min(3,n)):3}function ja(e){let t=null,n=Nm+1;for(const s of Hs){const o=Vs(e,s);o<n&&(n=o,t=s)}return t}function Sh(e,t){if(t)return{...e,needs:t};if(!("needs"in e))return e;const{needs:n,...s}=e;return s}const wl=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5),Bf=(e,t)=>!!(e.held.left&&t(e.held.left.kind)||e.held.right&&t(e.held.right.kind)),Xm=e=>Mi(e.kind)*(e.scale||1)*(e.size||1);function Ph(e,t,n){const s=e.rooms[t.room]?.items??[];switch(n){case"sleepy":return t.seat?.pose==="lie"&&s.some(o=>o.id===t.seat.item);case"clean":return s.some(o=>Ro(o.kind)&&Math.abs(t.x-o.x)<=Math.max(60,Xm(o)*.45)&&Math.abs(t.y-o.y)<=60);case"hungry":return Bf(t,Fa)||s.some(o=>Bo(o.kind)&&wl(t,o)<=vh+30||Fa(o.kind)&&wl(t,o)<=Kl+40);case"playful":return Bf(t,Li)||s.some(o=>Li(o.kind)&&wl(t,o)<=Kl+40)}}function Jm(e,t){return Hs.filter(n=>Vs(t,n)<3&&Ph(e,t,n))}function e1(e,t,n){const s=e.characters.find(a=>a.id===t);if(!s||Vs(s,n)>=3||!Ph(e,s,n))return e;const o={...s.needs??{}};delete o[n];const i=Sh(s,cd(o));return{...e,characters:e.characters.map(a=>a.id===t?i:a)}}function t1(e,t,n){const s=e.characters.find(a=>a.id===t),o=Vs(s,n);if(!s||o<=0)return e;const i=Sh(s,cd({...s.needs??{},[n]:o-1}));return{...e,characters:e.characters.map(a=>a.id===t?i:a)}}function n1(e,t){const n=Object.values(e.rooms).flatMap(c=>c?.items??[]),s={sleepy:n.some(c=>/bed$|^bed|sofa|couch/.test(ld(c.kind))),hungry:n.some(c=>Bo(c.kind)||Fa(c.kind)),playful:n.some(c=>Li(c.kind)),clean:n.some(c=>Ro(c.kind))},o=c=>c[(t%c.length+c.length)%c.length],i=[];for(const c of[...e.characters].sort((d,f)=>d.id<f.id?-1:1)){const d=!!ja(c);for(const f of Hs)if(s[f]){const p=Vs(c,f);p>0&&i.push({id:c.id,need:f,l:p,wish:d})}}if(!i.length)return null;const a=i.filter(c=>!c.wish);if(a.length){const c=a.filter(f=>f.l<3),d=c.length?o(c):o(a);return{id:d.id,need:d.need}}const r=Math.max(...i.map(c=>c.l)),l=o(i.filter(c=>c.l===r));return{id:l.id,need:l.need}}const sc=45e3,s1=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],Af=/^[A-Za-z0-9:_\/.-]{1,80}$/,o1=/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u,Df=["feed","burp","change","rock"];function Qs(e){const t=String(e||"").toLowerCase();return!t||/mobile/.test(t)?null:/bassinet/.test(t)?"bassinet":t==="crib"||/(^|[-_:])crib$/.test(t)?"crib":null}function i1(e){return e===2?"Cozy":"Happy"}function a1(e){return e+1}function r1(e){return s1.indexOf(e)>=0}function l1(e){const t=typeof e=="number"&&Number.isFinite(e)?Math.round(e):2;return t<=2?2:t>=4?4:3}function Th(e){if(!e||typeof e!="object")return;const t=e,n={};let s=!1;for(let o=0;o<Df.length;o++){const i=Df[o],a=t[i];typeof a=="number"&&Number.isFinite(a)&&(n[i]=a,s=!0)}return s?n:void 0}function sn(e){const t={name:e.name,mood:e.mood,spot:e.spot,x:e.x,y:e.y,room:e.room,since:e.since};(e.spot==="crib"||e.spot==="bassinet")&&e.bed&&(t.bed=e.bed),e.spot==="mat"&&e.seat&&(t.seat=e.seat),e.spot==="arms"&&e.holder&&(t.holder=e.holder);const n=Th(e.at);return n&&(t.at=n),t}function dd(e,t){return JSON.stringify(e)===JSON.stringify(t)}function c1(e,t){if(!e||typeof e!="object")return null;const n=e,s=String(n.name??"").normalize("NFC").replace(/\s+/g," ").trim();if(!o1.test(s)||(s.match(/\d/g)||[]).length>2)return null;let o=n.spot==="crib"||n.spot==="bassinet"||n.spot==="arms"||n.spot==="mat"?n.spot:"mat";const i=r1(n.room)?n.room:"nursery",a=typeof n.x=="number"&&Number.isFinite(n.x)?Math.max(0,Math.min(2400,n.x)):700,r=typeof n.y=="number"&&Number.isFinite(n.y)?Math.max(0,Math.min(600,n.y)):540,l=typeof n.since=="number"&&Number.isFinite(n.since)?n.since:0,c=l1(n.mood);let d=typeof n.bed=="string"&&Af.test(n.bed)?n.bed:void 0,f=rd(n.seat)??void 0,p=typeof n.holder=="string"&&Af.test(n.holder)?n.holder:void 0;if(t){const g=t[i]?.items??[];if(o==="crib"||o==="bassinet"){let b=!1;for(let m=0;m<g.length;m++){const v=g[m];v&&v.id===d&&Qs(String(v.kind||""))===o&&(b=!0)}b||(o="mat",d=void 0)}if(f){let b=!1;for(let m=0;m<g.length;m++)g[m]&&g[m].id===f.item&&(b=!0);b||(f=void 0)}}return o!=="crib"&&o!=="bassinet"&&(d=void 0),o!=="mat"&&(f=void 0),o!=="arms"&&(p=void 0),o==="arms"&&!p&&(o="mat"),sn({name:s,mood:c,spot:o,bed:d,seat:f,holder:p,x:a,y:r,room:i,at:Th(n.at),since:l})}function d1(e,t){const n=e.nursery?.items??[];for(let s=0;s<n.length;s++){const o=n[s];if(!o||!o.id||Qs(String(o.kind||""))!=="crib")continue;const i=typeof o.x=="number"&&Number.isFinite(o.x)?o.x:1170,a=typeof o.y=="number"&&Number.isFinite(o.y)?o.y:480;return sn({name:"Bean",mood:2,spot:"crib",bed:o.id,x:i,y:a,room:"nursery",since:t})}return sn({name:"Bean",mood:2,spot:"mat",x:700,y:540,room:"nursery",since:t})}function f1(e,t,n){const s=Math.min(4,e.mood+1);return sn({...e,mood:s,at:{...e.at||{},[t]:n},since:n})}function p1(e,t){if(!e.since){const i=sn({...e,since:t});return dd(i,e)?null:i}if(e.mood<=2)return null;const n=Math.floor((t-e.since)/sc);if(n<1)return null;const s=Math.min(n,e.mood-2),o=e.mood-s;return sn({...e,mood:o,since:e.since+s*sc})}function oc(e,t,n,s,o){const i=sn(t?{...e,spot:"arms",holder:t,room:n,x:s,y:o,bed:void 0,seat:void 0}:{...e,spot:"mat",room:n,x:s,y:o,bed:void 0,seat:void 0,holder:void 0});return dd(i,e)?e:i}function h1(e,t,n,s){let o=t.spot==="crib"||t.spot==="bassinet"?t.spot:"mat",i,a;if(o==="crib"||o==="bassinet"){let l=!1;for(let c=0;c<n.length;c++){const d=n[c];d&&d.id===t.bed&&Qs(d.kind)===o&&(l=!0)}l&&t.bed?i=t.bed:o="mat"}if(o==="mat"&&t.seat){let l=null;for(let f=0;f<n.length;f++)n[f]&&n[f].id===t.seat.item&&(l=n[f]);const c=l?no(l.kind):null;let d=!1;for(let f=0;f<s.length;f++)s[f].item===t.seat.item&&s[f].n===t.seat.n&&(d=!0);l&&c&&c.pose===t.seat.pose&&!d&&(a=t.seat)}const r=sn({...e,spot:o,room:t.room,x:t.x,y:t.y,bed:i,seat:a,holder:void 0});return dd(r,e)?e:r}function g1(e,t,n,s){const o=e.spot==="mat"&&e.seat?.item===t,i=!!n&&(e.spot==="crib"||e.spot==="bassinet")&&e.bed===t;return!o&&!i?e:sn({...e,spot:"mat",x:s?s.x:e.x,y:s?s.y:zi,bed:void 0,seat:void 0,holder:void 0})}function Rh(e,t){const n=t.scale||1,s=t.w*n,o=t.h*n,i=Qs(e);let a=i==="bassinet"?0:-.02*s;const r=i==="bassinet"?-.52*o:-.46*o;return t.flip&&(a=-a),{x:t.x+a,y:t.footY+r}}function u1(e){const t=(o,i)=>({x:o,y:i,spot:"mat",bed:null,seat:null});if(e.mode!=="play"||!e.piece)return t(e.releaseX,e.releaseY);const n=Qs(e.piece.kind);if(n){const o=Rh(e.piece.kind,e.piece);return{x:o.x,y:o.y,spot:n,bed:e.piece.id,seat:null}}const s=xi({mode:"play",via:"drag",releaseX:e.releaseX,releaseY:e.releaseY,piece:e.piece,occupied:e.occupied});return s.seat?{x:s.x,y:s.y,spot:"mat",bed:null,seat:s.seat}:t(e.releaseX,e.releaseY)}function m1(e,t=2400){const s=t-40>40?t-40:40;let o=e;return o>=40||(o=40),o>s&&(o=s),{x:o,y:zi}}function y1(e,t){return!e||e.spot!=="mat"||!e.seat||e.room!==t?null:{item:e.seat.item,n:e.seat.n}}const Ei=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],Bh=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],$t=2400,Pn=600,Ah=1e3,Ao=($t-Ah)/2,Os=[.75,.875,1,1.25,1.5];function zs(e){if(typeof e!="number"||!Number.isFinite(e))return 1;let t=1,n=1/0;for(const s of Os){const o=Math.abs(e-s);o<n&&(n=o,t=s)}return t}function Ke(e){return(e?.scale||1)*zs(e?.size)}function Dh(e,t){const n=zs(t);if(n===1){if(e.size==null)return e;const{size:s,...o}=e;return o}return e.size===n?e:{...e,size:n}}const Do=8,b1=/^[A-Za-z0-9:_\/.-]{1,80}$/;function fd(e){const t=e?.dogKennel;if(!t||typeof t!="object"||typeof t.item!="string"||!b1.test(t.item))return null;const n=e.rooms;if(!n)return null;for(const s of Object.values(n))if(s?.items?.some(o=>o&&o.id===t.item&&o.kind==="kennel"))return{item:t.item};return null}function k1(e,t){return fd({dogKennel:{item:t},rooms:e.rooms})!==null}const N=(e,t,n,s,o=1)=>({id:e+"-"+s,kind:e,x:t+Ao,y:n,flip:!1,z:s,scale:o});function Kn(){return{version:3,houseId:"local",currentRoom:"living",rooms:{living:{wallpaper:"#ffd6e0",floor:"#e8b98a",pattern:1,items:[N("sofa",470,470,1),N("lamp",230,470,2),N("plant",760,480,3),N("rug",480,530,0),N("picture",470,200,4),N("cat",600,520,5),N("window",-350,230,6),N("armchair",-300,480,7),N("bookshelf",1250,470,8),N("tree",1500,480,9),N("clock",1100,170,10)]},bedroom:{wallpaper:"#d9ccff",floor:"#f2d0a4",pattern:2,items:[N("bed",450,480,1),N("window",750,230,2),N("teddy",330,500,3),N("stars",300,180,4),N("tub",1350,480,5),N("lamp",-250,470,6),N("flowers",-150,500,7)]},salon:{wallpaper:"#ffe0f0",floor:"#f6d6ff",pattern:2,items:[N("rug",470,540,0),N("mirror",470,150,1),N("vanity",470,480,2),N("perfume",400,345,3),N("polish",450,345,4),N("hairdryer",560,340,5),N("stool",470,545,6),N("lamp",200,470,7),N("flowers",780,480,8),N("picture",780,200,9),N("chair",-250,490,10),N("mirror",-250,170,11),N("plant",1300,480,12)]},kitchen:{wallpaper:"#cdf3dc",floor:"#ffe7a8",pattern:3,items:[N("fridge",200,470,1),N("table",520,500,2),N("cake",520,395,3),N("stove",800,470,4),N("chair",380,500,5),N("chair",660,500,6),N("juice",470,395,7),N("plant",-300,480,8),N("fish",1300,480,9)]},nursery:{wallpaper:"#d6f3ff",floor:"#f3ddc4",pattern:1,items:[N("cloud-rug",480,545,0),N("crib",470,480,1),N("crib-mobile",470,155,2),N("rocker",780,490,3)]},bathroom:{wallpaper:"#d4f4fb",floor:"#f7e7d4",pattern:3,items:[N("bath-mat",180,560,0),N("shower-curtain",-40,520,1),N("soaking-tub",160,500,2),N("rubber-ducky",300,545,3),N("bath-toilet",480,500,4),N("sink-vanity",700,500,5),N("bath-mirror",700,175,6),N("towel-bar",940,200,7)]},backyard:{wallpaper:"#c5ecff",floor:"#b6e3a8",pattern:0,items:[{id:"yard-bench-1",kind:"yard-bench",x:1122,y:372,flip:!1,z:1,scale:1},{id:"tulip-bed-2",kind:"tulip-bed",x:946,y:580,flip:!1,z:2,scale:1}]}},characters:[rs({id:"c1",skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6",room:"living",x:330+Ao,y:540})],soundOn:!0,dogKennel:null}}function rs(e){return{skin:"#f1c27d",hair:"#5b3a29",hairStyle:0,shirt:"#ff7aa8",pants:"#5aa9e6",size:"kid",acc:0,room:"living",x:$t/2,y:540,flip:!1,held:{left:null,right:null},...e}}const _s=(e,t,n)=>Math.max(t,Math.min(n,e)),Qo=e=>e.items.reduce((t,n)=>Math.max(t,n.z),0),w1=e=>e.items.reduce((t,n)=>Math.min(t,n.z),0);function ta(e,t,n){return{...e,characters:e.characters.map(s=>s.id===t?n(s):s)}}function v1(e,t,n){const s=e.baby;if(!t||!s||s.spot!=="arms"||s.holder!==t.id||n===s.room)return e;const o=t.room===s.room?t.x:s.x,i=t.room===s.room?t.y:zi,a=oc(s,null,s.room,o,i);return!a||a===s?e:{...e,baby:a}}function Ci(e){if(!e.seat)return e;const{seat:t,...n}=e;return n}let Ga=null;function Ih(){const e=Ga;return Ga=null,e}function na(e,t,n,s){if(!e.baby)return e;const o=s?ad(s.x,Mi(s.kind)*Ke(s),e.baby.x):null,i=g1(e.baby,t,n,o);return i===e.baby?e:{...e,baby:i}}function sa(e,t,n){n&&(Ga={id:t,x:n.x,kind:n.kind,scale:Ke(n)});let s=!1;const o=e.characters.map(i=>{if(i.seat?.item!==t)return i;if(s=!0,!n)return Ci(i);const a=ad(n.x,Mi(n.kind)*Ke(n),i.x),{seat:r,...l}=i;return{...l,x:a.x,y:a.y}});return s?{...e,characters:o}:e}function _1(e,t,n,s){if(!s){const i=nc(e.seat,t);return i?e.seat===i?e:{...e,seat:i}:Ci(e)}const o=nc(n,t);return o?{...e,seat:o}:Ci(e)}function et(e,t,n){const s=e.rooms[t];if(!s)return e;const o=n(s);return o===s?e:{...e,rooms:{...e.rooms,[t]:o}}}function $1(e){const t=new Set;let n=!1;const s=e.map(o=>{if(!t.has(o.id))return t.add(o.id),o;n=!0;const i=String(o.id).replace(/-d\d+$/,"").replace(/[^A-Za-z0-9:_/.-]/g,"").slice(0,72)||"item";let a=2,r=(i+"-d"+a).slice(0,80);for(;t.has(r);)a+=1,r=(i+"-d"+a).slice(0,80);return t.add(r),{...o,id:r}});return n?s:e}function x1(e){let t=!1;const n={...e.rooms};for(const s of Ei){const o=e.rooms[s];if(!o||!Array.isArray(o.items))continue;const i=$1(o.items);i!==o.items&&(n[s]={...o,items:i},t=!0)}return t?{...e,rooms:n}:e}function Hh(e){if(!e||!e.rooms)return e;const t=Kn().rooms,n=e.rooms;let s=!1;for(const i of Ei){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(s=!0)}const o=s?(()=>{const i={...n};for(const a of Ei){const r=n[a];(!r||typeof r!="object"||!Array.isArray(r.items))&&(i[a]=t[a])}return{...e,rooms:i}})():e;return x1(o)}function Ya(e,t){switch(Ga=null,t.type){case"room/switch":return e.rooms[t.room]?{...e,currentRoom:t.room}:e;case"item/add":return et(e,t.room,n=>n.items.length>=80||n.items.some(s=>s.id===t.item.id)?n:{...n,items:[...n.items,{...t.item,z:Qo(n)+1}]});case"item/move":{const n=e.rooms[t.room]?.items.find(o=>o.id===t.id)??null,s=et(e,t.room,o=>({...o,items:o.items.map(i=>i.id===t.id?{...i,x:_s(t.x,0,$t),y:_s(t.y,40,Pn)}:i)}));return t.stand?na(sa(s,t.id,n),t.id,!1,n):s}case"item/flip":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return na(sa(et(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?{...o,flip:!o.flip}:o)})),t.id,n),t.id,!1,n)}case"item/size":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||zs(n.size)===zs(t.size)?e:et(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?Dh(o,t.size):o)}))}case"item/power":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||!wh(n.kind)||!!n.on==!!t.on?e:et(e,t.room,s=>({...s,items:s.items.map(o=>{if(o.id!==t.id)return o;if(t.on)return{...o,on:!0};const{on:i,...a}=o;return a})}))}case"item/front":return et(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:Qo(n)+1}:s)}));case"item/back":return et(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:w1(n)-1}:s)}));case"item/delete":{const n=e.rooms[t.room]?.items.find(a=>a.id===t.id)??null,s=n?.kind==="kennel",o=sa(et(e,t.room,a=>({...a,items:a.items.filter(r=>r.id!==t.id)})),t.id,n),i=s&&e.dogKennel?.item===t.id?{...o,dogKennel:null}:o;return na(i,t.id,!0,n)}case"room/wallpaper":return et(e,t.room,n=>({...n,wallpaper:t.color}));case"room/floor":return et(e,t.room,n=>({...n,floor:t.color}));case"room/pattern":return et(e,t.room,n=>({...n,pattern:t.pattern,wallTile:null}));case"room/wallTile":return et(e,t.room,n=>({...n,wallTile:t.tile}));case"room/floorTile":return et(e,t.room,n=>({...n,floorTile:t.tile}));case"char/add":return e.characters.length>=Do||e.characters.some(n=>n.id===t.char.id)?e:{...e,characters:[...e.characters,t.char]};case"char/update":return ta(e,t.id,n=>{const{look2:s,costume:o,...i}=t.patch,a={...n,...i};if("look2"in t.patch&&(s?a.look2=s:delete a.look2),"costume"in t.patch){const r=to(o);r?a.costume=r:delete a.costume}return a});case"char/move":{if(!e.rooms[t.room])return e;const n=e.characters.find(o=>o.id===t.id),s=ta(e,t.id,o=>{const i={...o,room:t.room,x:_s(t.x,0,$t),y:_s(t.y,60,Pn)};return _1(i,e.rooms[t.room].items,t.seat,"seat"in t)});return v1(s,n,t.room)}case"char/delete":{const n=e.characters.find(o=>o.id===t.id);if(!n)return e;let s={...e,characters:e.characters.filter(o=>o.id!==t.id)};if(["left","right"].forEach((o,i)=>{const a=n.held[o];a&&(s=et(s,n.room,r=>({...r,items:[...r.items,{...a,x:n.x+(i?40:-40),y:n.y,z:Qo(r)+1}]})))}),s.baby?.spot==="arms"&&s.baby.holder===t.id){const o=oc(s.baby,null,s.baby.room,s.baby.x,s.baby.y);o&&o!==s.baby&&(s={...s,baby:o})}return s}case"char/hold":{const n=e.characters.find(r=>r.id===t.id),s=e.rooms[t.room]?.items.find(r=>r.id===t.itemId);if(!n||!s||n.held[t.hand]||n.room!==t.room)return e;const o=sa(et(e,t.room,r=>({...r,items:r.items.filter(l=>l.id!==t.itemId)})),t.itemId,s),i=ta(o,t.id,r=>({...r,held:{...r.held,[t.hand]:s}})),a=s.kind==="kennel"&&e.dogKennel?.item===t.itemId?{...i,dogKennel:null}:i;return na(a,t.itemId,!0,s)}case"char/release":{const n=e.characters.find(i=>i.id===t.id),s=n?.held[t.hand];if(!n||!s)return e;const o=ta(e,t.id,i=>({...i,held:{...i.held,[t.hand]:null}}));return et(o,n.room,i=>({...i,items:[...i.items,{...s,x:_s(t.x,0,$t),y:_s(t.y,40,Pn),z:Qo(i)+1}]}))}case"cat/set":return{...e,cat:t.cat};case"cat/move":return e.cat&&e.rooms[t.room]?{...e,cat:{...e.cat,room:t.room,x:_s(t.x,100,$t-100)}}:e;case"dog/set":return{...e,dog:t.dog};case"dog/kennel":return t.item===null?e.dogKennel?{...e,dogKennel:null}:e:!k1(e,t.item)||e.dogKennel?.item===t.item?e:{...e,dogKennel:{item:t.item}};case"ranch/op":{const n=t.op;if(n.op==="take"){const i=e.rooms[n.room];if(i&&i.items.some(a=>a.id===n.id))return e}const s=tc(od(e.garden),sd(e.basket),t.op,t.now,e.lastEgg??0);if(typeof s=="string")return e;let o={...e,garden:s.plots,basket:s.basket,lastEgg:t.op.op==="egg"?t.now:e.lastEgg};if(t.op.op==="take"&&o.rooms[t.op.room]){const i=t.op;o=et(o,i.room,a=>a.items.length>=80?a:{...a,items:[...a.items,{id:i.id,kind:Pm[i.kind],x:i.x,y:560,flip:!1,z:Qo(a)+1,scale:1}]})}return o}case"settings/sound":return{...e,soundOn:t.on};case"game/reset":return Kn();case"baby/meet":return e.baby?e:{...e,baby:d1(e.rooms,t.now)};case"baby/name":return!e.baby||!t.name||t.name===e.baby.name?e:{...e,baby:sn({...e.baby,name:t.name})};case"baby/care":{if(!e.baby)return e;const n=f1(e.baby,t.care,t.now);return n===e.baby?e:{...e,baby:n}}case"baby/hold":{if(!e.baby)return e;const n=oc(e.baby,t.holder,t.room,t.x,t.y);return!n||n===e.baby?e:{...e,baby:n}}case"baby/place":{if(!e.baby||!e.rooms[t.room])return e;const n=e.characters.filter(o=>o.room===t.room&&o.seat).map(o=>({item:o.seat.item,n:o.seat.n})),s=h1(e.baby,t,e.rooms[t.room].items,n);return s===e.baby?e:{...e,baby:s}}case"baby/ease":{if(!e.baby)return e;const n=p1(e.baby,t.now);return n?{...e,baby:n}:e}case"need/meet":return e1(e,t.id,t.need);case"need/drift":return t1(e,t.id,t.need)}}const If=Wt("cozy-house"),M1=Wt("cozy-house-v1");function pd(e){if(!e||typeof e!="object"||!e.rooms)return Kn();let t=e;if(t.version===1){const f=g=>(Number(g)||0)+Ao,p={};for(const[g,b]of Object.entries(t.rooms))p[g]={...b,items:(b.items??[]).map(m=>({...m,x:f(m.x)}))};t={...t,version:2,rooms:p,character:{...t.character,x:f(t.character?.x)}}}if(t.version===2){const f=t.character??{};t={...t,version:3,characters:[rs({...f,id:"c1",size:"kid",acc:0,held:{left:null,right:null}})]},delete t.character}if(t.version!==3)return Kn();const n=Kn(),s=(Array.isArray(t.characters)?t.characters:[]).slice(0,Do).map((f,p)=>{const g=f?.look2,b=rs({...f,id:String(f.id??"c"+(p+1)),held:{left:f.held?.left??null,right:f.held?.right??null}});if(delete b.look2,g!=null){const v=Vi(g);v&&(b.look2=v)}if("costume"in b){const v=to(b.costume);v?b.costume=v:delete b.costume}delete b.needs;const m=cd(f?.needs);return m&&(b.needs=m),b}),o=Hh({...n,...t,rooms:{...n.rooms,...t.rooms},characters:s}),i=Hf(o),a=fd(i),r=a===o.dogKennel?o:{...o,dogKennel:a},l=Hm(r.mailbox);let c=i===o?r:{...r,characters:i.characters};if(l)c={...c,mailbox:l};else if(c.mailbox){const{mailbox:f,...p}=c;c=p}const d=c1(c.baby,c.rooms);if(d)c={...c,baby:d};else if("baby"in c){const{baby:f,...p}=c;c=p}return Hf(L1(c))}function Hf(e){let t=!1;const n=e.characters.map(s=>{const o=nc(rd(s.seat),e.rooms[s.room]?.items);return o?s.seat?.item===o.item&&s.seat.pose===o.pose&&s.seat.n===o.n?s:{...s,seat:o}:s.seat?(t=!0,Ci(s)):s});return!t&&n.every((s,o)=>s===e.characters[o])?e:{...e,characters:n}}function L1(e){const t=e.currentRoom,n=Bh.includes(t),s=a=>Ei.includes(a);let o=!1;const i=e.characters.map(a=>{const r=a.room;return!s(r)||!n&&r===t?(o=!0,{...a,room:"living"}):a});return n&&!o?e:{...e,currentRoom:n?e.currentRoom:"living",characters:i}}function Oh(){let e,t=!1;try{const o=localStorage.getItem(If)??localStorage.getItem(M1);o?e=pd(JSON.parse(o)):(t=!0,e=Kn(),typeof navigator<"u"&&!navigator.webdriver&&(e=mm(e)))}catch{e=Kn()}const n=[];let s;return{get:()=>e,subscribe(o){n.push(o)},dispatch(o){e=Ya(e,o),n.forEach(i=>i(e,o)),clearTimeout(s),s=window.setTimeout(()=>{try{localStorage.setItem(If,JSON.stringify(e))}catch{}},250)},born:t}}const E1=Object.freeze(Object.defineProperty({__proto__:null,ITEM_SIZE_STEPS:Os,MAX_CHARS:Do,ROOM_H:Pn,ROOM_IDS:Ei,ROOM_W:$t,SCENE_ROOMS:Bh,V1_OFFSET:Ao,V1_ROOM_W:Ah,applyItemSize:Dh,createStore:Oh,drawnScale:Ke,ensureRooms:Hh,initialState:Kn,itemSizeOf:zs,migrate:pd,newCharacter:rs,reduce:Ya,standChar:Ci,takeClearedFurniture:Ih,validKennel:fd},Symbol.toStringTag,{value:"Module"}));function ic(e,t){for(let n=e.length-1;n>0;n--){const s=Math.floor(t()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}const Wh=4,Of=7,C1=30;function S1(){const e=[];let t=0;for(let n=0;n<Wh;n++){e.push({id:t++,c:n,v:0});for(let s=1;s<=9;s++)for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s});for(const s of["skip","rev","d2"])for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s})}for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"wild"});for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"w4"});return e}const ac=e=>e.discard[e.discard.length-1],zo=(e,t)=>t.c===4||t.c===e.color||t.v===ac(e).v&&ac(e).c!==4,Wn=(e,t,n=1)=>{const s=e.hands.length;return((t+e.dir*n)%s+s)%s};function rc(e,t,n,s){const o=[];for(let i=0;i<n&&e.hands[t].length<C1;i++){if(!e.deck.length){const r=e.discard.pop();if(e.deck=ic(e.discard.map(l=>l),s),e.discard=[r],!e.deck.length)break}const a=e.deck.pop();e.hands[t].push(a),o.push(a)}return e.hands[t].length>1&&(e.slay[t]=!1),o}function P1(e,t){if(e.owe!==null&&e.hands[e.owe]?.length===1&&!e.slay[e.owe]){const n=e.owe;return e.owe=null,{victim:n,vdrew:rc(e,n,2,t).length}}return e.owe=null,{}}const Wf=e=>{const t=[0,0,0,0];return e.forEach(n=>{n.c<4&&t[n.c]++}),t.indexOf(Math.max(...t))},T1={id:"slay",name:"Slay",minPlayers:2,maxPlayers:6,setup(e,t){const n=ic(S1(),t),s=Array.from({length:e},()=>n.splice(-Of,Of));let o=n.length-1;for(;typeof n[o].v!="number";)o--;const i=n.splice(o,1)[0];return{deck:n,discard:[i],hands:s,color:i.c,turn:Math.floor(t()*e),dir:1,drawn:null,slay:s.map(()=>!1),owe:null,winner:null,ev:{n:0,p:-1,k:"start",card:i}}},cleanMove(e){return!e||typeof e!="object"?null:e.k==="play"&&Number.isInteger(e.id)&&e.id>=0&&e.id<108?{k:"play",id:e.id,...Number.isInteger(e.color)&&e.color>=0&&e.color<Wh?{color:e.color}:{}}:e.k==="draw"||e.k==="pass"||e.k==="slay"?{k:e.k}:null},legal(e,t,n){if(e.winner!==null)return!1;if(n.k==="slay")return e.hands[t].length<=2&&!e.slay[t];if(t!==e.turn)return!1;if(n.k==="draw")return e.drawn===null;if(n.k==="pass")return e.drawn!==null;const s=e.hands[t].find(o=>o.id===n.id);return!s||e.drawn!==null&&s.id!==e.drawn||s.c===4&&n.color===void 0?!1:zo(e,s)},apply(e,t,n,s){const o=e.ev.n+1;if(n.k==="slay")return e.slay[t]=!0,e.owe===t&&(e.owe=null),e.ev={n:o,p:t,k:"slay"},e;const i=P1(e,s);if(n.k==="draw"){const d=rc(e,t,1,s),f=d[0];if(f&&zo(e,f))e.drawn=f.id,e.ev={n:o,p:t,k:"draw",drew:1,...i};else{if(e.drawn=null,e.ev={n:o,p:t,k:"draw",drew:d.length,...i},e.stuck=d.length?0:(e.stuck??0)+1,(e.stuck??0)>=e.hands.length){const p=Math.min(...e.hands.map(g=>g.length));return e.winner=e.hands.findIndex(g=>g.length===p),e.turn=-1,e}e.turn=Wn(e,t)}return e}if(n.k==="pass")return e.drawn=null,e.turn=Wn(e,t),e.ev={n:o,p:t,k:"pass",...i},e;e.stuck=0;const a=e.hands[t],r=a.splice(a.findIndex(d=>d.id===n.id),1)[0];e.discard.push(r),e.drawn=null,e.color=r.c===4?n.color:r.c;const l={n:o,p:t,k:"play",card:r,color:e.color,...i};if(!a.length)return e.winner=t,e.turn=-1,e.ev=l,e;a.length===1&&!e.slay[t]&&(e.owe=t);const c=e.hands.length===2;if(r.v==="rev")e.dir=e.dir===1?-1:1,e.turn=c?t:Wn(e,t);else if(r.v==="skip")l.skipped=Wn(e,t),e.turn=Wn(e,t,2);else if(r.v==="d2"||r.v==="w4"){const d=Wn(e,t);l.skipped=d;const f=r.v==="d2"?2:4;l.drew=rc(e,d,f,s).length,e.turn=Wn(e,t,2)}else e.turn=Wn(e,t);return e.ev=l,e},turn:e=>e.winner!==null?-1:e.turn,winner:e=>e.winner,view(e,t){return{top:ac(e),color:e.color,turn:e.winner!==null?-1:e.turn,dir:e.dir,deck:e.deck.length,counts:e.hands.map(n=>n.length),slay:e.slay,winner:e.winner,ev:e.ev,...t!==null&&e.hands[t]?{hand:e.hands[t],drawn:t===e.turn?e.drawn:null}:{}}},autoMove(e,t){if(t!==e.turn)return null;if(e.drawn!==null){const s=e.hands[t].find(o=>o.id===e.drawn);return s&&zo(e,s)?{k:"play",id:s.id,...s.c===4?{color:Wf(e.hands[t])}:{}}:{k:"pass"}}const n=e.hands[t].find(s=>zo(e,s)&&s.c!==4)??e.hands[t].find(s=>zo(e,s));return n?{k:"play",id:n.id,...n.c===4?{color:Wf(e.hands[t])}:{}}:{k:"draw"}},removePlayer(e,t,n){if(e.hands.length<=2)return null;const s=e.turn===t;return e.deck.unshift(...e.hands[t]),ic(e.deck,n),e.hands.splice(t,1),e.slay.splice(t,1),e.owe===t?e.owe=null:e.owe!==null&&e.owe>t&&e.owe--,e.turn>t&&e.turn--,s&&(e.drawn=null,e.dir===-1?e.turn=((t-1)%e.hands.length+e.hands.length)%e.hands.length:e.turn=t%e.hands.length),e.ev={n:e.ev.n+1,p:t,k:"left"},e}},lc=7,Ea=6,R1=(e,t,n)=>{const s=e[t][n];for(const[o,i]of[[1,0],[0,1],[1,1],[1,-1]]){const a=[[t,n]];for(const r of[1,-1])for(let l=1;l<4;l++){const c=t+o*l*r,d=n+i*l*r;if(c<0||c>=lc||d<0||d>=Ea||e[c][d]!==s)break;a.push([c,d])}if(a.length>=4)return a}return null},B1={id:"four",name:"Four in a Row",minPlayers:2,maxPlayers:2,setup:(e,t)=>({b:Array.from({length:lc},()=>[]),turn:t()<.5?0:1,winner:null,draw:!1,line:null,last:null,n:0}),cleanMove:e=>e&&Number.isInteger(e.col)&&e.col>=0&&e.col<lc?{col:e.col}:null,legal:(e,t,n)=>e.winner===null&&!e.draw&&t===e.turn&&e.b[n.col].length<Ea,apply(e,t,n){e.b[n.col].push(t);const s=e.b[n.col].length-1;e.last={col:n.col,row:s,p:t},e.n++;const o=R1(e.b,n.col,s);return o?(e.winner=t,e.line=o,e.turn=-1):e.b.every(i=>i.length>=Ea)?(e.draw=!0,e.turn=-1):e.turn=1-t,e},turn:e=>e.turn,winner:e=>e.winner,view:e=>e,autoMove:(e,t)=>{if(t!==e.turn)return null;const s=[3,2,4,1,5,0,6].find(o=>e.b[o].length<Ea);return s===void 0?null:{col:s}},removePlayer:()=>null},Uh={slay:T1,four:B1},qi=2600,qs=[{game:"slay",seats:6,x:720},{game:"four",seats:2,x:1500},{game:"slay",seats:4,x:2150}],A1=2e4,D1="winter",I1="Winter Cheer",H1={[D1]:I1},O1=["pack:wc-holiday-tree","pack:wc-gingerbread","pack:wc-gingerbread-village","pack:wc-bauble-garland","pack:wc-stocking-row","pack:wc-cane-lamp","pack:wc-star-topper","pack:wc-poinsettia","pack:wc-holly","pack:wc-nutcracker","pack:wc-reindeer","pack:wc-sleigh-planter"],W1=["Berry Wreath","Birch Log Basket","Cabin Picture","Cabin Planks","Candy Cane Lamp","Candy Stripe","Cinnamon Roll Tray","Cocoa Cart","Cocoa Pot","Cookie Oven","Cookie Plate","Cozy Red Plaid","Cozy Sock Hamper","Decorated Holiday Tree","Frosted Pine","Frosty Bookcase","Frosty Dots","Fur-Trim Bench","Gingerbread Cottage","Gingerbread Village","Holly Sprig","Ice Skates","Ice-Blue Wardrobe","Knit Pom Rug","Knit Stocking Row","Knit-Blanket Armchair","LED Candle Trio","Lantern","Log Bench","Marshmallow Jar","Mint Pine Sprigs","Mitten Ottoman","Mittens on a Line","Mug Tree Shelf","Mug of Cocoa","Nutcracker Friend","Penguin Plush","Penguin Plush Chair","Peppermint Counter","Peppermint Swirl Rug","Peppermint Tiles","Pinecone Garland","Pinecone Side Table","Plaid Cabin Sofa","Poinsettia Pot","Polar Bear Plush","Red Plaid Quilt Bed","Reindeer Plush","Ribbon Bauble Garland","Sled Coffee Table","Sleigh Planter","Snow Globe","Snow Knit Carpet","Snow-Globe Lamp","Snowflake Mobile","Snowflake Nightstand","Snowflake Sky","Snowman Buddy","Snowshoes","Snowy Window Art","Snowy Window Seat","Star Tree Topper","Stone Hearth Fireplace","Twinkle Light String","Twinkle-Light Floor Lamp","Winter Cheer","Woodstove","Wrapped Present Stack"],Vh="halloween",U1="Spooky Cute",V1={[Vh]:U1},Q1=!1;function z1(e=new Date){const t=e.getMonth(),n=e.getDate();return t===9&&n>=24||t===10&&n<=2}function Qh(e=new Date,t=Q1){return t||z1(e)}const q1=["pack:hw-cauldron","pack:hw-cat-statue","pack:hw-witch-hat"],Z1=["Autumn Leaf Garland","Black Cat Statue","Bubbly Cauldron","Friendly Sheet Ghost","Harvest Hay Bale","Heart and Moon Pumpkin","Moon and Stars Window Cling","Moonbeam Lantern","Spooky Cute","Starry Glow Pumpkin","Starry Witch Hat","Treat Bowl"],N1=["A-Frame Swing","Acorn Friend","Alarm Clock","Apple","Apple Tree","Arc Floor Lamp","Arc Lamp","Arched Mirror","Arched Shelf","Armchair","Autumn Wreath","Baby Blocks","Baby Bottle","Bakery Shelf","Ball","Balloons","Bananas","Bar Stool","Bassinet","Bath Mat","Bath Mirror","Bath Stool","Bathtub","Beach Ball","Bean Bag","Bed","Berry Basket","Big Leaf Plant","Big Monitor","Big Wardrobe","Birdbath","Birdhouse","Birdie","Blanket Basket","Blocks","Boba Buddy","Book Stack","Books","Bookshelf","Box Stack","Bread","Brush & Comb","Bubble Aquarium","Bubble Bath","Bubble Chair","Bubble-Gum Rug","Bubbly Fountain","Bubbly Plant","Bud Vase","Bulletin Board","Bunk Bed","Bunny","Bunny Plush","Bunny Slippers","Butterfly Bush","Cactus","Cactus Buddy","Cada's Mouse","Cake","Candle Jar","Canopy Bed","Canopy Daybed","Cat Bed","Cat Tower","Caterpillar Plush","Chair","Changing Table","Checker Rug","Checkered Bed","Chick","Chloe's Star Lamp","Clock","Clothes Rail","Clothesline","Cloud Beanbag","Cloud Lamp","Cloud Rug","Cloud Shelf","Cocoa Doll","Cocoa Mug","Coffee Table","Comfy Chair","Cookie Jar","Cooking Pot","Cottage Heart Pouf","Cottage Heart Rug","Counter","Cozy Fireplace","Cozy Lights","Cozy Mug","Cozy Nightstand","Cozy Reading Nook","Cozy Snake Plant","Cozy Teapot","Cream Jars","Cream Sofa","Crib","Crib Mobile","Cubby Shelf","Cube Shelf","Cupcake","Cupcake Stand","Curtains","Curvy Yellow Desk","Cute Keyboard","Cute Speaker","Daisy Pot","Daisy Rug","Desk","Desk Lamp","Desk Mic","Dino Plushie","Dish Cabinet","Dish Rack","Dog Kennel","Doll House","Donut","Dresser","Droplet Buddy","Egg Pan","Fairy-Light Garland","Fairy-Light Shelf","Fan","Fancy Sofa","Fiddle-Leaf Fig","Fig Tree","Fire Pit","Fireplace","Fish Bowl","Fish Tank","Floor Cushion","Flower Cart","Flower Floor Lamp","Flower Kettle","Flower Lamp","Flowers","Foot Spa","Fresh Egg","Fridge","Frog Plush","Fruit Bowl","Game Controller","Gaming Chair","Garden Bench","Garden Carrot","Garden Gnome","Glass Cabinet","Globe","Globe Pendants","Glossy Hair Dryer","Glow Mirror","Gold Floor Mirror","Guinea Pig","Hair Dryer","Hair-Dryer Chair","Hair-Wash Chair","Hammock","Hamster House","Hamster Pal","Hanging Lamp","Hanging Lantern","Hanging Plant","Hanging Vine Planter","Happy Fridge","Headphones","Heart Headboard Bed","Heart Pouf","Heart Rug","Heart Wall Clock","Heart Wall Light","Heart-Leaf Plant","Hedge Row","Herb Box","High Chair","Honey Doll","Ice Cream","Jewelry Box","Juice","Kettle","Kitchen Counter","Knit Cushion","Ladder Shelf","Lamp","Landscape Art","Lattice Bench","Laundry Hamper","Lava Lamp","Lemon Tree","Lemonade Cart","Lemonade Cup","Lighted Vanity","Lilac Curtain","Lily Pond","Little Rocking Horse","Little Slide","Little Sprout","Lotion Bottles","Macaron Jar","Macrame Swing Chair","Mani-Pedi Chair","Manicure Table","Microwave","Milk","Milk & Cookies","Mini Fridge","Mini Greenhouse","Mini Tree","Mint Fridge","Mint Pebble Rug","Mirror","Mixer","Moon and Stars","Moon Night-Light","Moving Box","Mushroom Stool","Music Box","Nail Dryer","Nail Polish","Nail Polish Rack","Night Light","Nightstand","Nursery Cloud Rug","Nursery Dresser","Nursery Lamp","Pancakes","Pantry","Paper Lantern","Pastel Range","Pastel Wardrobe","Patio Lights","Patio Umbrella","Pendant Lamp","Perfume","Perfume Bottle","Perfume Tray","Pet Bowl","Petal Coffee Table","Phone on a Stand","Piano","Picket Gate","Picnic Basket","Picnic Blanket","Picnic Table","Picture","Piggy Bank","Pillow","Pin Board","Pink Vanity","Pinwheel","Pizza","Plant","Plant Stand","Plant Wall","Play Mat","Play Tent","Polish Bottle","Popcorn","Pothos Plant","Pouf","Puffy Cloud Sofa","Puffy Stool","Puppy","Quinn's Cookie Pup","Radio","Rain Barrel","Rainbow Art","Rainbow Rug","Ranch Flowers","Rattle","Reagan's Frame","Reception Desk","Record Player","Ribbon Mirror","Ribbon Tray","Rice Cooker","Ring Light","Robot","Rocker","Rocking Chair","Rocking Horse","Rose Doll","Round Breakfast Table","Round Side Table","Round Woven Rug","Rubber Ducky","Rug","Runner Rug","Salon Chair","Sandbox","Scallop Curtains","Scalloped Loveseat","Seesaw","Shelf","Shower Curtain","Sink","Sink Vanity","Sloane's Rainbow Snail","Snake Plant","Soaking Tub","Soap Dish","Sofa","Sparkle Wall Light","Spice Rack","Splash Pool","Spray Bottle","Sprinkler","Stacking Rings","Star Dresser","Star Lamp","Star Mobile","Stars","Stepping Stones","Sticker Board","Story Pillow","Stove","String Lights","Striped Runner","Succulents","Sun Lounger","Sunny Art","Sunny Bean Bag","Sunny Cloud Rug","Sunny Shelf","Swing Chair","Swivel Stool","Table","Tassel Rug","Teapot","Teapot Set","Teddy","Tiered Tray","Toadstool Light","Toaster","Toilet","Towel Bar","Towel Cart","Towel Stack","Toy Bin","Toy Car","Toy cat","Toy Chest","Toy Train","Trailing Plant Shelf","Tulip Bed","Tulip Vase","Turtle","TV","TV Stand","Unicorn Plushie","Utensil Rail","Vanity","Vanity Stool","Vegetable Patch","Vlog Camera","Wagon","Waiting Bench","Wall Shelf","Wardrobe","Water-Drop Lamp","Watermelon","Wavy Floor Lamp","Window","Window Seat","Wood Armchair","Wood Bookshelf","Wood Coffee Table","Wood Desk","Wood Dresser","Wood Stool","Wood Wall Clock","Wooden Bed","Yard Sign",...W1,...Z1],F1=4,hd=16,Ka=e=>String(e??"").toUpperCase().replace(/[^A-Z0-9]/g,""),j1=e=>e.length>=F1&&e.length<=hd&&/^[A-Z0-9]+$/.test(e),G1=12,Y1=["Cada","Chloe","Quinn","Reagan","Sloane"],K1=460,X1=320,Uf=["Sunny Bunny","Bubbly Panda","Sparkle Kitty","Happy Hippo","Cozy Koala","Jolly Jelly","Zippy Fox","Dreamy Deer","Giggly Goose","Peachy Pup","Minty Mouse","Rainbow Duck","Cuddly Cub","Starry Owl","Bouncy Frog","Lucky Lamb","Snuggly Seal","Twinkle Tiger","Berry Bear","Cloudy Llama","Pebble Penguin","Honey Hedgehog","Marshmallow Moose","Cupcake Cat"],pi=["Hi!","Come over!","I love your house!","Let's play!","Follow me!","Look at this!","Want a snack?","Nice!","Yes!","No thanks","Hehe","Be right back","Bye!","Let's decorate!","Wanna race?","So cute!"],zh=["👋","😀","😂","😍","😮","😢","🎉","⭐","❤️","👍","🍕","🐱","🌈","🎶","💤","✨"],gd=60,J1={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t","@":"a",$:"s","!":"i","+":"t"},vl=["fuck","fuk","fck","shit","sht","bitch","btch","bastard","asshole","ass","dick","cock","pussy","cunt","whore","slut","damn","crap","piss","fag","faggot","retard","nigger","nigga","porn","sex","sexy","nude","naked","boob","boobs","penis","vagina","kill","suicide","stupid","idiot","dumb","hate","loser","shutup","wtf","stfu","gtfo","bs"],e2=["zero","oh","one","two","three","four","five","six","seven","eight","nine","ten"],t2=[/\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i,/\bi\s*live\s+(at|on|in)\b/i,/\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,/\b(password|passcode|zip\s*code|postcode)\b/i,/\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i],n2=/(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i,s2=/\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i,o2=/@\w/,i2=/\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;function a2(e,t=gd){if(typeof e!="string")return{ok:!1,reason:"empty"};const n=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(!n)return{ok:!1,reason:"empty"};if(n.length>t)return{ok:!1,reason:"long"};if(n2.test(n))return{ok:!1,reason:"link"};if(s2.test(n)||o2.test(n))return{ok:!1,reason:"contact"};if((n.match(/\d/g)??[]).length>=5||/\d[\d\s().\-]{4,}\d/.test(n)||i2.test(n))return{ok:!1,reason:"contact"};const o=n.toLowerCase().split(/[^a-z]+/).filter(Boolean);let i=0;for(const c of o)if(i=e2.includes(c)?i+1:0,i>=4)return{ok:!1,reason:"contact"};if(t2.some(c=>c.test(n)))return{ok:!1,reason:"personal"};const a=n.toLowerCase().replace(/[0-9@$!+]/g,c=>J1[c]??c),r=a.split(/[^a-z]+/).filter(Boolean),l=a.replace(/[^a-z]/g,"").replace(/(.)\1{2,}/g,"$1$1");return r.some(c=>vl.includes(c)||vl.includes(c.replace(/(.)\1+/g,"$1")))||vl.filter(c=>c.length>=5).some(c=>l.includes(c))?{ok:!1,reason:"words"}:{ok:!0,text:n}}const r2={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t",8:"b","@":"a",$:"s","!":"i","+":"t",v:"u","|":"k","<":"k","#":"h"};function l2(e){return/^f+u+c+k+$/.test(e)||/^f+u+k+$/.test(e)||/^f+c+k+$/.test(e)||/^s+h+i+t+$/.test(e)||/^s+h+t+$/.test(e)||/^b+i+t+c+h+$/.test(e)||/^b+t+c+h+$/.test(e)||/^a+s+h+o+l+e+$/.test(e)||/^d+u+m+b+a+s+$/.test(e)||/^n+i+g{2,}e+r+$/.test(e)||/^n+i+g{2,}a+$/.test(e)||/^f+a+g+$/.test(e)||/^f+a+g+o+t+$/.test(e)||/^r+e+t+a+r+d+$/.test(e)||/^k+y+s+$/.test(e)}function c2(e){return/^c+u+n+t+$/.test(e)||/^a+h+o+l+e+$/.test(e)||/^k+i+k+e+$/.test(e)||/^c+h+i+n+k+$/.test(e)||/^s+p+i+c+$/.test(e)||/^c+o{2,}n+$/.test(e)||/^w+e+t+b+a+c+k+$/.test(e)||/^t+r+a+n+y+$/.test(e)||/^t+r+a+n+i+$/.test(e)||/^d+y+k+e+$/.test(e)||/^b+e+a+n+e+r+$/.test(e)||/^g+o{2,}k+$/.test(e)||/^r+a+g+h+e+a+d+$/.test(e)||/^t+o+w+e+l+h+e+a+d+$/.test(e)||/^h+e+i+l+h+i+t+l+e+r+$/.test(e)}const d2=new Set(["spicy","spices","spicing","spicey","spicier","spiciest","cocky","chinking","spicer","gooky","slutty","twatt"]);function f2(e,t){if(!/^[a-z]+$/.test(e)||t&&d2.has(e))return!1;const n=[e],s=["ing","in","ers","er","ed","es","y","s"];for(let o=0;o<s.length;o++){const i=s[o];e.endsWith(i)&&e.length>i.length+2&&n.push(e.slice(0,-i.length))}for(let o=0;o<n.length;o++)if(l2(n[o])||t&&c2(n[o]))return!0;return!1}function p2(e){if(!e.includes("*"))return[e];const t=e.split("*").length-1,n=e.replace(/\*/g,""),s=n?[n]:[];if(t<1||t>3)return s;const o=e.split(""),i=[];for(let r=0;r<o.length;r++)o[r]==="*"&&i.push(r);const a=r=>{if(r===i.length){s.push(o.join(""));return}for(let l=97;l<=122;l++)o[i[r]]=String.fromCharCode(l),a(r+1)};return a(0),s}const Vf=["mother","sonofa","horse","bull","dip"],Qf=["face","head","you"];function ko(e,t){const n=e.replace(/ph(?=u+c+k)/g,"f").replace(/ph(?=u+k)/g,"f");if(f2(n,t)||/^w+t+f+$/.test(n)||/^s+t+f+u+$/.test(n))return!0;for(let s=0;s<Vf.length;s++){const o=Vf[s];if(n.startsWith(o)&&n.length>o.length+2&&ko(n.slice(o.length),t))return!0}for(let s=0;s<Qf.length;s++){const o=h2(n,Qf[s]);if(o&&ko(o,t))return!0}return!!(n.length>4&&n.endsWith("s")&&!n.endsWith("ss")&&ko(n.slice(0,-1),t))}function h2(e,t){let n=e.length;for(let s=t.length-1;s>=0;s--){const o=t[s];if(n===0||e[n-1]!==o)return null;for(;n>0&&e[n-1]===o;)n--}return n<=2?null:e.slice(0,n)}function Xa(e){let t="";for(let n=0;n<e.length;n++)t+=r2[e[n]]??e[n];return t}const g2={ѕ:"s",һ:"h",с:"c",а:"a",е:"e",о:"o",р:"p",і:"i",х:"x",у:"y",к:"k"};function u2(e){const n=e.replace(/[\u00ad\u0336\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").normalize("NFKC").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase();let s="";for(let o=0;o<n.length;o++)s+=g2[n[o]]??n[o];return s}const m2=new Set(["it","its","it's","is","as","a","i","uh","oh","so","he","she","hi","um","umm","hmm","hm","ah","eh","er","ow","ha","hey","yo","ok","yeah","yes","no","nah","wow","ho","ooh","ahh","uhh","ohh"]);function Si(e){return e>="a"&&e<="z"||e>="0"&&e<="9"||"@$!+*v|#<".includes(e)}function zf(e,t){let n=t;for(;n<e.length&&e[n]==="!";)n++;if(n>=e.length||!Si(e[n])||e[n]==="!")return null;const s=e[n];let o=n+1;for(;o<e.length&&e[o]==="!";)o++;return o<e.length&&Si(e[o])?null:{ch:s,end:o}}function y2(e,t){const n=e.length,s=" .-_~";let o=0;for(;o<n;){if(o>0&&Si(e[o-1])){o++;continue}const i=zf(e,o);if(!i){o++;continue}const a=[i.ch];let r=i.end;for(;r<n&&s.includes(e[r]);){const l=zf(e,r+1);if(!l)break;a.push(l.ch),r=l.end}if(a.length>=2){const l=Xa(a.join("")).replace(/\*/g,"");if(ko(l,t))return!0}o=Math.max(o+1,r)}return!1}function Zs(e){return e.replace(/^!+/,"").replace(/!+$/,"")}function Ja(e){return Xa(Zs(e)).replace(/\*/g,"")}function qh(e){return/[0-9@$!+*|#<]/.test(Zs(e))}function b2(e){return Zs(e).length===1}function k2(e){const t=Zs(e);return t.length<2||qh(e)?!1:/^sh+$/.test(t)||m2.has(t)}function w2(e){let t="space";for(let n=0;n<e.length;n++){const s=e[n];if(!(s===" "||s==="	"||s===`
`||s==="\r")){if(s==="-"){t="hyphen";continue}return"punct"}}return t}function v2(e){const t=[];let n=0,s="";for(;n<e.length;){if(!Si(e[n])){s+=e[n],n++;continue}let o=n+1;for(;o<e.length&&Si(e[o]);)o++;t.push({text:e.slice(n,o),gap:t.length===0?"start":w2(s)}),s="",n=o}return t}function _2(e){const t=[Xa(e)];if(e.charAt(0)==="!"||e.charAt(e.length-1)==="!"){const n=e.replace(/^!+/,"").replace(/!+$/,"");n&&n!==e&&t.push(Xa(n))}return t}function $2(e){for(let t=0;t<e.length;t++){if(!/^k+i+l+$/.test(e[t]))continue;const n=e[t+1]||"",s=e[t+2]||"";if(/^y+o+u+r+s+e+l+f+$/.test(n)||/^u+r+s+e+l+f+$/.test(n)||/^u+r+$/.test(n)&&/^s+e+l+f+$/.test(s))return!0}return!1}function x2(e,t,n){if(Zs(e[n].text)!=="coon")return!1;const s=n>0?t[n-1]:"",o=t[n+1]||"";return s==="maine"||o==="cat"}function M2(e,t,n){return n===t+1&&e[n].gap==="space"&&/^a+$/.test(Ja(e[t].text))&&/^h+o+l+e+$/.test(Ja(e[n].text))}function L2(e,t,n){return Zs(e[n].text)!=="dyke"?!1:n>0&&Zs(e[n-1].text)==="van"}function E2(e){for(let t=0;t<e.length-1;t++)if(/^h+e+i+l+$/.test(e[t])&&/^h+i+t+l+e+r+$/.test(e[t+1]))return!0;return!1}function C2(e,t=!0){const n=u2(e);if(y2(n,t))return!0;const s=v2(n),o=s.map(a=>_2(a.text)),i=s.map(a=>Ja(a.text));if($2(i)||t&&E2(i))return!0;for(let a=0;a<o.length;a++)if(!(t&&(x2(s,i,a)||L2(s,i,a))))for(let r=0;r<o[a].length;r++){const l=p2(o[a][r]);for(let c=0;c<l.length;c++)if(ko(l[c].replace(/\*/g,""),t))return!0}for(let a=0;a<s.length;a++){let r="",l=0,c=!1,d=!1;for(let f=a;f<s.length&&f<a+8;f++){if(f>a){const p=s[f].gap,g=s[f-1].text;if(p==="punct"||p==="start"||g.endsWith("!")||s[f].text.startsWith("!")||p!=="space"&&p!=="hyphen")break}if(r+=Ja(s[f].text),b2(s[f].text)&&l++,k2(s[f].text)&&(c=!0),qh(s[f].text)&&(d=!0),f!==a&&!(c&&l<2&&!d)&&ko(r,t)){if(t&&M2(s,a,f))break;return!0}}}return!1}function Zh(e,t,n,s=!1){if(typeof e!="string")return{ok:!1,reason:"empty"};const o=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return o?o.length>t?{ok:!1,reason:"long"}:C2(o,!s)?{ok:!1,reason:n}:{ok:!0,text:o}:{ok:!1,reason:"empty"}}function S2(e,t=gd){return Zh(e,t,"words")}const Qr={long:"That is a bit long!",link:"No links, please!",contact:"Keep numbers and contact info secret!",personal:"Keep personal info secret!",words:"Let's use kind words!",mail:"Oops, try different words!",empty:""},Nh={};for(const e of["АA","аa","ВB","вb","ЕE","еe","КK","кk","МM","мm","НH","нh","ОO","оo","РP","рp","СC","сc","ТT","тt","УY","уy","ХX","хx","ІI","іi","ЈJ","јj","ЅS","ѕs","ЁE","ёe","ЇI","їi","ΑA","ΕE","ΖZ","ΗH","ΙI","ΚK","ΜM","ΝN","ΟO","ΡP","ΤT","ΥY","ΧX","αa","εe","ζz","ιi","κk","νv","οo","ρp","τt","υu","χx"])Nh[e[0]]=e[1];function P2(e){let t="";for(const n of e)t+=Nh[n]??n;return t}function T2(e){return P2(String(e).normalize("NFKC")).replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\p{M}]/gu,"").replace(/[\p{Extended_Pictographic}\p{S}\p{P}]+/gu,"").replace(/\s+/g," ").trim()}function R2(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(()=>{const e=[...new Set(N1.map(t=>T2(t)).filter(t=>t.length>=2))].sort((t,n)=>n.length-t.length);return new RegExp(`(^|[^A-Za-z])(?:${e.map(R2).join("|")})(?![A-Za-z])`,"gi")})();const qf=(e,t,n)=>typeof e=="number"&&Number.isFinite(e)?Math.max(t,Math.min(n,e)):null,B2=(e,t,n=80)=>typeof e=="string"&&e.length<=n&&t.test(e)?e:null,A2=/^#[0-9a-fA-F]{3,8}$/,D2=["little","kid","adult"];function I2(e){if(!e||typeof e!="object")return null;const t={};for(const n of["skin","hair","shirt","pants"])if(n in e){const s=B2(e[n],A2,9);if(!s)return null;t[n]=s}if("hairStyle"in e){const n=qf(e.hairStyle,0,3);if(n===null)return null;t.hairStyle=Math.round(n)}if("acc"in e){const n=qf(e.acc,0,3);if(n===null)return null;t.acc=Math.round(n)}if("size"in e){if(!D2.includes(e.size))return null;t.size=e.size}if("flip"in e){if(typeof e.flip!="boolean")return null;t.flip=e.flip}return"look2"in e&&(t.look2=Vi(e.look2)??null),"costume"in e&&(t.costume=to(e.costume)),Object.keys(t).length?t:null}function Zi(e){const t=rs({id:"x"}),n=I2({skin:e?.skin,hair:e?.hair,hairStyle:e?.hairStyle,shirt:e?.shirt,pants:e?.pants,size:e?.size,acc:e?.acc})??{},s=i=>n[i]??t[i],o={skin:s("skin"),hair:s("hair"),hairStyle:s("hairStyle"),shirt:s("shirt"),pants:s("pants"),size:s("size"),acc:s("acc")};if(e&&typeof e=="object"&&"look2"in e){const i=Vi(e.look2);i&&(o.look2=i)}if(e&&typeof e=="object"&&"costume"in e){const i=to(e.costume);o.costume=i??""}return o}const Zf=4,H2=["Mittens","Luna","Biscuit","Pumpkin","Whiskers","Mochi","Pepper","Noodle","Ginger","Socks"],O2=["Buddy","Coco","Max","Daisy","Peanut","Rocket","Bella","Waffles","Scout","Honey"];function Fh(e){const t=String(e??"").normalize("NFC").replace(/\s+/g," ").trim();return!/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u.test(t)||(t.match(/\d/g)??[]).length>2?null:a2(t).ok?t:null}function W2(e,t=[]){return Zh(e,Zn,"mail")}function jh(e){return typeof e.freeMail=="boolean"?e.freeMail:e.freeChat}const ud=2900,cc=[{kind:"swing",x:430,y:500},{kind:"swing",x:570,y:500},{kind:"blanket",x:1730,y:548},{kind:"blanket",x:1850,y:548},{kind:"bench",x:2025,y:512},{kind:"bench",x:2105,y:512},{kind:"bench",x:2225,y:512},{kind:"bench",x:2305,y:512}],ge={top:{x:905,y:330},bottom:{x:1110,y:545},ladder:850},dt={x0:2440,x1:2840,y0:470,y1:585},U2=(e,t)=>e.where===t.where&&(e.where!=="house"||e.houseId===t.houseId&&e.room===t.room),V2=(e,t)=>U2(e,t)&&Math.abs(e.x-t.x)<=K1&&Math.abs(e.y-t.y)<=X1;function oa(e){try{return pd(e)}catch{return e}}const dc=Wt("cozy-hood"),Mo=()=>{try{return JSON.parse(localStorage.getItem(dc)??"null")}catch{return null}},Tn=e=>{e?localStorage.setItem(dc,JSON.stringify(e)):localStorage.removeItem(dc)};function zr(){const e=new URLSearchParams(location.search).get("hood");return e?e.replace(/\/$/,""):"https://cozy-hood.andrewmunruh.workers.dev".replace(/\/$/,"")}async function Q2(e){const t=await fetch(e+"/api/create",{method:"POST"});if(!t.ok)throw new Error("create failed "+t.status);return t.json()}async function z2(e,t){const n=await fetch(`${e}/api/hood/${encodeURIComponent(t)}`);if(n.status===429)return{slow:!0};if(!n.ok)throw new Error("lookup failed");return n.json()}const Nf=e=>e.type==="item/move"?"im:"+e.id:e.type==="char/move"?"cm:"+e.id:e.type==="item/size"?"is:"+("id"in e?e.id:""):null;class qr{constructor(t){this.cfg=t,this.ws=null,this.pid="",this.settings={freeChat:!0},this.players=new Map,this.houses=new Map,this.presence=new Map,this.status="offline",this.speaksSit=!1,this.speaksBaby=!1,this.speaksAmb=!1,this.speaksNeeds=!1,this.replaced=!1,this.ranch={plots:[],skew:0},this.tables=new Map,this.handlers=new Map,this.cid=1,this.flushT=0,this.presT=0,this.lastPres=null,this.presDirty=!1,this.closedByUs=!1,this.retry=0,this.retryT=0,this.epoch=0,this.stableT=0,this.outbox=[]}on(t,n){(this.handlers.get(t)??this.handlers.set(t,[]).get(t)).push(n)}emit(t,...n){this.handlers.get(t)?.forEach(s=>s(...n))}send(t){return this.ws?.readyState!==WebSocket.OPEN?!1:(this.ws.send(JSON.stringify(t)),!0)}reliable(t){this.send(t)||(t.t==="lock"?this.outbox=this.outbox.filter(n=>!(n.t==="lock"&&n.houseId===t.houseId)):(t.t==="look"||t.t==="dog")&&(this.outbox=this.outbox.filter(n=>n.t!==t.t)),this.outbox.push(t),this.outbox.length>8&&this.outbox.splice(0,this.outbox.length-8))}flushOutbox(){if(this.ws?.readyState!==WebSocket.OPEN||!this.outbox.length)return;const t=this.outbox;this.outbox=[];for(const n of t)this.send(n)||this.outbox.push(n)}scheduleRetry(){if(this.closedByUs||this.replaced||!this.cfg.token||this.retryT)return;const t=this.epoch,n=Math.min(15e3,400*2**Math.min(this.retry,6));this.retry++,this.retryT=window.setTimeout(()=>{this.retryT=0,!(t!==this.epoch||this.closedByUs||this.replaced||!this.cfg.token)&&this.connect()},n)}armStable(){this.stableT&&clearTimeout(this.stableT),this.stableT=window.setTimeout(()=>{this.stableT=0,this.retry=0},1e4)}clearStable(){this.stableT&&(clearTimeout(this.stableT),this.stableT=0)}connect(t){this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.closedByUs=!1,this.replaced=!1,this.status="connecting",this.emit("status",this.status);const n=this.ws;return new Promise(s=>{let o=!1;const i=r=>{o||(o=!0,s(r))},a=new WebSocket(this.cfg.url.replace(/^http/,"ws")+"/ws/"+encodeURIComponent(this.cfg.id??this.cfg.code));if(this.ws=a,n&&n!==a)try{n.close()}catch{}a.onopen=()=>{t&&!this.cfg.token?this.send({t:"join",...t,v:Zf,pet:1,mail:1,sit:1,fit:1,baby:1,amb:1,halloween:1,cos:1,needs:1}):this.cfg.token?this.send({t:"hello",token:this.cfg.token,v:Zf,pet:1,mail:1,sit:1,fit:1,baby:1,amb:1,halloween:1,cos:1,needs:1}):i("notoken")},a.onmessage=r=>{const l=JSON.parse(r.data);this.handle(l),l.t==="welcome"&&(this.armStable(),i("ok")),l.t==="error"&&i(l.code+(l.msg?":"+l.msg:"")),l.t==="removed"&&i("removed")},a.onclose=r=>{if(this.ws===a){if(this.clearStable(),this.ws=null,this.status="offline",i("closed"),r.code===4e3){this.replaced=!0,this.emit("status",this.status),this.emit("replaced");return}this.emit("status",this.status),this.scheduleRetry()}},a.onerror=()=>{}})}close(){this.closedByUs=!0,this.replaced=!1,this.epoch++,this.outbox=[],this.clearStable(),this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.presT&&(clearTimeout(this.presT),this.presT=0);try{this.ws?.close()}catch{}this.ws=null,this.status="offline",clearInterval(this.flushT)}handle(t){switch(t.t){case"joined":this.cfg.token=t.token,this.cfg.pid=t.pid,Tn(this.cfg);break;case"welcome":this.pid=t.pid,this.settings=t.settings,this.status="online",this.speaksSit=t.sit===1,this.speaksBaby=t.baby===1,this.speaksAmb=t.amb===1,this.speaksNeeds=t.needs===1,this.players=new Map(t.players.map(n=>[n.pid,n]));{const n=this.houses;this.houses=new Map;for(const s of t.houses){const{state:o,...i}=s,a=n.get(s.id);this.houses.set(s.id,{meta:i,confirmed:oa(o),pending:a?a.pending.filter(r=>!r.sent):[],view:null})}}this.presence=new Map(Object.entries(t.presence)),this.presence.delete(this.pid),t.ranch&&(this.ranch={plots:t.ranch.plots,skew:t.ranch.now-Date.now()});{const n=new Map;for(const s of t.tables??[])n.set(s.tb,this.stampTable(s));this.tables=n}clearInterval(this.flushT),this.flushT=window.setInterval(()=>this.flush(),60),this.lastPres&&(this.presDirty=!0),this.flushPres(),this.flushOutbox(),this.emit("welcome"),this.emit("status",this.status);break;case"act":{const n=this.houses.get(t.houseId);if(!n)return;n.confirmed=Ya(oa(n.confirmed),t.action);const s=t.by===this.pid&&n.pending[0]?.cid===t.cid;s&&n.pending.shift(),n.view=null,s||this.emit("act",t.houseId,t.action);break}case"nack":{const n=this.houses.get(t.houseId);if(!n)return;n.pending=n.pending.filter(s=>s.cid!==t.cid),t.state&&(n.confirmed=oa(t.state)),n.view=null,this.emit("reset",t.houseId,t.reason);break}case"pres":t.pid!==this.pid&&(t.p?this.presence.set(t.pid,t.p):this.presence.delete(t.pid),this.emit("pres",t.pid));break;case"players":this.players=new Map(t.players.map(n=>[n.pid,n])),this.emit("players");break;case"house":{const{state:n,...s}=t.house;this.houses.set(s.id,{meta:s,confirmed:oa(n),pending:[],view:null}),this.emit("houses");break}case"houseMeta":{const n=this.houses.get(t.meta.id);n&&(n.meta=t.meta,this.emit("houses"),this.emit("houseMeta",t.meta.id));break}case"houseGone":this.houses.delete(t.houseId),this.emit("houses"),this.emit("houseGone",t.houseId);break;case"settings":this.settings=t.settings,this.emit("settings");break;case"bubble":this.emit("bubble",t.pid,t.b);break;case"fx":this.emit("fx",t.pid,t.fx);break;case"knocked":this.emit("knocked",t.houseId,t.name);break;case"ranch":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch");break;case"ranchFail":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch"),this.emit("ranchFail",t.reason);break;case"noride":this.emit("noride",t.ride);break;case"table":{const n=this.stampTable(t.table);this.tables.set(n.tb,n),this.emit("table",n);break}case"tblFail":this.emit("tblFail",t.tb,t.reason);break;case"sayFail":this.emit("sayFail",t.reason);break;case"mailbox":{const n=this.houses.get(t.houseId);if(!n)return;if(t.mailbox?.letters?.length)n.confirmed={...n.confirmed,mailbox:t.mailbox};else{const{mailbox:s,...o}=n.confirmed;n.confirmed=o}n.view=null,this.emit("mailbox",t.houseId);break}case"mailFail":this.emit("mailFail",t.reason);break;case"parentInfo":this.emit("parentInfo",t);break;case"error":this.emit("error",t.code),t.code==="badtoken"&&(this.cfg.token=void 0,this.cfg.pid=void 0,Tn(this.cfg));break;case"removed":this.closedByUs=!0,this.emit("removed");break}}stampTable(t){const n=this.tables.get(t.tb),s=n&&n.away===t.away&&n.receivedAt?n.receivedAt:Date.now();return{...t,receivedAt:s}}view(t){const n=this.houses.get(t);return n?n.view??=n.pending.reduce((s,o)=>Ya(s,o.action),n.confirmed):null}myHouseId(){return this.players.get(this.pid)?.houseId??""}canEdit(t){const n=this.houses.get(t);return!!n&&(!n.meta.locked||n.meta.ownerId===this.pid)}dispatch(t,n){const s=this.houses.get(t);if(!s)return;const o=Nf(n),i=s.pending[s.pending.length-1];o&&i&&!i.sent&&Nf(i.action)===o?i.action=n:s.pending.push({cid:this.cid++,action:n,sent:!1}),s.view=null}flush(){for(const[t,n]of this.houses)for(const s of n.pending)!s.sent&&this.send({t:"act",houseId:t,cid:s.cid,action:s.action})&&(s.sent=!0);this.flushPres()}setPresence(t){this.lastPres=t,this.presDirty=!0,this.presT||this.flushPres()}flushPres(){if(!(!this.presDirty||!this.lastPres)){if(!this.send({t:"pres",p:this.lastPres})){!this.closedByUs&&!this.presT&&(this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90));return}this.presDirty=!1,this.presT&&clearTimeout(this.presT),this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90)}}myPresence(){return this.lastPres}say(t){this.reliable({t:"say",b:t})}lock(t,n){this.reliable({t:"lock",houseId:t,locked:n})}setLook(t){this.reliable({t:"look",look:t});const n=this.players.get(this.pid);n&&(n.look=t)}setDog(t){this.reliable({t:"dog",dog:t});const n=this.players.get(this.pid);n&&(n.dog=t)}fx(t){this.reliable({t:"fx",fx:t})}knock(t){this.send({t:"knock",houseId:t})}ranchOp(t){this.reliable({t:"ranch",o:t})}tbl(t){this.reliable({t:"tbl",...t})}sendMail(t,n,s,o){this.reliable({t:"mail",op:"send",houseId:t,text:n,color:s,sticker:o})}readMail(t,n){this.reliable({t:"mail",op:"read",houseId:t,id:n})}dropMail(t,n){this.reliable({t:"mail",op:"drop",houseId:t,id:n})}now(){return Date.now()+this.ranch.skew}parent(t){this.cfg.parentKey&&this.reliable({t:"parent",key:this.cfg.parentKey,...t})}}function q2(e,t,n,s="living"){let o=s;const i=[],a=()=>({...e.view(t),currentRoom:o,soundOn:n.get()}),r=l=>{if(e.houses.has(t)){const c=a();i.forEach(d=>d(c,l))}};return e.on("act",(l,c)=>{l===t&&r(c)}),e.on("reset",l=>{l===t&&r({type:"game/reset"})}),{houseId:t,get:a,subscribe(l){i.push(l)},dispatch(l){if(l.type==="room/switch")o=l.room;else if(l.type==="settings/sound")n.set(l.on);else{if(l.type==="game/reset")return;if(!e.canEdit(t)||l.type.startsWith("baby/")&&!e.speaksBaby||l.type==="item/power"&&!e.speaksAmb||l.type.startsWith("need/")&&!e.speaksNeeds)return;e.dispatch(t,l)}r(l)}}}const nt="#5a3d5c",le=`stroke="${nt}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,fc=[{name:"Tabby",body:"#ffb26b",stripe:"#e8893a",belly:"#ffe3c4"},{name:"Smokey",body:"#b9b6c9",stripe:"#8f8ba3",belly:"#ecebf3"},{name:"Tuxedo",body:"#4f4660",stripe:"",belly:"#ffffff"},{name:"Calico",body:"#fff6ec",stripe:"",belly:"#fff6ec"}],pc=[{name:"Pup",body:"#f2d0a4",ear:"#b07d54",snout:"#fbe7cc"},{name:"Poodle",body:"#fff0f6",ear:"#ffc8dd",snout:"#fff7fb"},{name:"Dachshund",body:"#c07a45",ear:"#7d4a26",snout:"#d99a68"},{name:"Golden",body:"#f4b860",ear:"#e09a3e",snout:"#fbd9a0"},{name:"Spotty",body:"#ffffff",ear:"#4a3f52",snout:"#ffffff"}],Z2=(e,t,n,s=!1)=>s?`<path d="M${e-3} ${n} q3 3 6 0 M${t-3} ${n} q3 3 6 0" fill="none" ${le} stroke-width="2.5"/>`:`<circle cx="${e}" cy="${n}" r="2.8" fill="${nt}"/><circle cx="${t}" cy="${n}" r="2.8" fill="${nt}"/><circle cx="${e+.9}" cy="${n-.9}" r=".9" fill="#fff"/><circle cx="${t+.9}" cy="${n-.9}" r=".9" fill="#fff"/>`,hc=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>`;function Lo(e,t="stand"){const n=fc[e]??fc[0],s="#ffb3c6",o=(i,a,r,l)=>`
    <path d="M${i-13} ${a-8} L${i-10} ${a-25} L${i-1} ${a-13} Z" fill="${n.body}" ${le}/><path d="M${i-10.5} ${a-11} L${i-9.5} ${a-20} L${i-4} ${a-13} Z" fill="${s}"/>
    <path d="M${i+1} ${a-13} L${i+11} ${a-26} L${i+13} ${a-7} Z" fill="${e===3?"#f4a259":n.body}" ${le}/><path d="M${i+4} ${a-13} L${i+10} ${a-21} L${i+11} ${a-11} Z" fill="${s}"/>
    <circle cx="${i}" cy="${a}" r="${r}" fill="${n.body}" ${le}/>
    ${e===3?`<path d="M${i+2} ${a-r+1} a${r} ${r} 0 0 1 ${r-3} ${r-2} q-6 2 -${r-3} -${r-3}z" fill="#f4a259"/>`:""}
    ${e===2?`<ellipse cx="${i+2}" cy="${a+7}" rx="9" ry="7" fill="#fff"/>`:""}
    ${n.stripe?`<path d="M${i-4} ${a-r+2} v5 M${i+2} ${a-r+1} v6 M${i+8} ${a-r+3} v4" ${le} stroke="${n.stripe}" stroke-width="2.5"/>`:""}
    ${Z2(i-4,i+7,a,l)}
    <path d="M${i+3} ${a+4} l-2.5 -2 h5 z" fill="#ff8fab"/><path d="M${i+.5} ${a+6} q2.5 2.5 5 0" fill="none" ${le} stroke-width="2"/>
    ${hc(i-8,a+5)}${hc(i+12,a+5)}
    <path d="M${i+r-2} ${a+3} l9 -2 M${i+r-2} ${a+6} l9 2" ${le} stroke-width="1.6"/>`;return t==="nap"?`<svg viewBox="0 0 120 100" class="catsvg nap">
    <g class="breathe"><path class="tail" d="M28 84 Q22 96 64 94" fill="none" stroke="${nt}" stroke-width="11" stroke-linecap="round"/><path d="M28 84 Q22 96 64 94" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="76" rx="36" ry="18" fill="${n.body}" ${le}/>
    ${e===3?'<ellipse cx="44" cy="72" rx="12" ry="8" fill="#f4a259"/><ellipse cx="66" cy="70" rx="9" ry="6" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 62 q3 6 0 12 M56 61 q3 6 0 12 M68 62 q3 6 0 11" fill="none" ${le} stroke="${n.stripe}" stroke-width="3"/>`:""}
    ${o(90,76,15,!0)}</g></svg>`:t==="sit"?`<svg viewBox="0 0 120 100" class="catsvg sit">
    <path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${nt}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="70" rx="20" ry="25" fill="${n.body}" ${le}/>
    <ellipse cx="70" cy="74" rx="10" ry="15" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="54" cy="66" rx="9" ry="12" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M50 60 q5 2 4 8 M49 72 q5 2 4 8" fill="none" ${le} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect x="62" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${le}/><rect x="74" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${le}/>
    ${e===2?'<ellipse cx="66.5" cy="93" rx="4" ry="2.5" fill="#fff"/><ellipse cx="78.5" cy="93" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(72,36,17,!1)}</svg>`:`<svg viewBox="0 0 120 100" class="catsvg stand">
    <path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${nt}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <rect class="leg b" x="34" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${le}/><rect class="leg a" x="74" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${le}/>
    <ellipse cx="58" cy="58" rx="32" ry="17" fill="${n.body}" ${le}/>
    <ellipse cx="64" cy="66" rx="20" ry="7" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="46" cy="52" rx="12" ry="9" fill="#f4a259"/><ellipse cx="68" cy="50" rx="9" ry="7" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 43 q3 6 0 12 M56 42 q3 6 0 12 M68 43 q3 6 0 11" fill="none" ${le} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect class="leg a" x="44" y="64" width="9" height="30" rx="4.5" fill="${n.body}" ${le}/><rect class="leg b" x="84" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${le}/>
    ${e===2?'<ellipse cx="48.5" cy="92" rx="4" ry="2.5" fill="#fff"/><ellipse cx="88.5" cy="92" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(90,40,17,!1)}</svg>`}function Pi(e,t="stand"){const n=pc[e]??pc[0],s=t==="sleep",o=e===2,i=e===1,a=e===3,r=e===4,l=o?66:58,c=o?70:62,d=94-c,f=o?102:92,p=o?50:40,g=(_,S)=>i?`<rect class="leg ${S}" x="${_+2}" y="${c}" width="6" height="${d}" rx="3" fill="${n.body}" ${le}/><circle class="leg ${S}" cx="${_+5}" cy="91" r="6" fill="${n.body}" ${le}/>`:`<rect class="leg ${S}" x="${_}" y="${c}" width="10" height="${d}" rx="5" fill="${n.body}" ${le}/>`,b=i?`<circle cx="44" cy="58" r="15" fill="${n.body}" ${le}/><circle cx="70" cy="56" r="17" fill="${n.body}" ${le}/><ellipse cx="57" cy="58" rx="22" ry="12" fill="${n.body}"/>`:`<ellipse cx="${o?62:58}" cy="${l}" rx="${o?42:32}" ry="${o?13:17}" fill="${n.body}" ${le}/>`,m=r?`<circle cx="46" cy="54" r="5" fill="${nt}"/><circle cx="64" cy="62" r="4" fill="${nt}"/><circle cx="72" cy="50" r="3.5" fill="${nt}"/><circle cx="38" cy="64" r="3" fill="${nt}"/>`:"",v=i?`<g class="tail"><path d="M30 52 L22 38" ${le}/><circle cx="21" cy="34" r="7" fill="${n.body}" ${le}/></g>`:a?`<path class="tail" d="M30 52 Q10 50 14 30 Q20 40 30 46" fill="${n.body}" ${le}/>`:`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${nt}" stroke-width="9" stroke-linecap="round"/>`,y=!i&&!a?`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`:"",u=`
    ${i?`<circle cx="${f-2}" cy="${p-16}" r="10" fill="${n.body}" ${le}/>`:""}
    <circle cx="${f}" cy="${p}" r="17" fill="${n.body}" ${le}/>
    ${r?`<circle cx="${f-6}" cy="${p-8}" r="4" fill="${nt}"/>`:""}
    <ellipse cx="${f+13}" cy="${p+7}" rx="11" ry="8" fill="${n.snout}" ${le}/>
    <circle cx="${f+22}" cy="${p+4}" r="4" fill="${nt}"/>
    <path d="M${f+14} ${p+12} q4 3 8 0" fill="none" ${le} stroke-width="2"/>
    ${s?"":`<path class="tongue" d="M${f+16} ${p+13} q2 7 6 0" fill="#ff8fab" ${le} stroke-width="2"/>`}
    ${s?`<path d="M${f+2} ${p-4} q3 3 6 0" fill="none" ${le} stroke-width="2.4"/>`:`<circle cx="${f+5}" cy="${p-3}" r="3" fill="${nt}"/><circle cx="${f+6}" cy="${p-4}" r="1" fill="#fff"/>`}
    ${hc(f+2,p+8)}
    ${i?`<circle cx="${f-9}" cy="${p+8}" r="9" fill="${n.ear}" ${le}/>`:`<ellipse class="ear" cx="${f-9}" cy="${p+4}" rx="7" ry="${a||o?14:12}" fill="${n.ear}" ${le} transform="rotate(12 ${f-9} ${p+4})"/>`}
    <path d="M${f-12} ${p+14} q10 6 20 2" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/><circle cx="${f-1}" cy="${p+19}" r="3" fill="#ffd166" ${le} stroke-width="1.5"/>`,w=i?`<g class="tail"><path d="M42 86 L28 80" ${le}/><circle cx="25" cy="78" r="7" fill="${n.body}" ${le}/></g>`:`<path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${nt}" stroke-width="9" stroke-linecap="round"/><path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`;return t==="sit"||t==="sleep"?`<svg viewBox="0 0 130 100" class="dogsvg ${s?"sleep":"sit"}">${w}
    <ellipse cx="60" cy="70" rx="22" ry="24" fill="${n.body}" ${le}/>${r?`<circle cx="54" cy="66" r="5" fill="${nt}"/><circle cx="64" cy="80" r="4" fill="${nt}"/>`:""}
    ${g(62,"a")}${g(74,"b")}<g transform="translate(-22 -2)">${u}</g></svg>`:`<svg viewBox="0 0 130 100" class="dogsvg stand">${v}${y}
    ${g(o?30:34,"b")}${g(o?82:72,"a")}
    ${b}${m}
    ${g(o?42:46,"a")}${g(o?94:84,"b")}
    ${u}</svg>`}const Gh=e=>{let t=2166136261;for(const n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0},Ls=(e,t)=>{let n=(e^Math.imul(t,2654435761))>>>0;return n^=n>>>15,n=Math.imul(n,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296},Ff=18,N2={1:.35,2:.6};function F2(e,t,n){return e-t*N2[n]}function j2(e,t){const s=Math.floor(t/1e3/2.8);return Ls(Gh(e||"pup"),s)<.62?"rest":"peek"}function G2(e,t,n,s,o=!1){const i=Gh(e.name+":"+e.coat+":"+e.room+":"+Math.round(e.x)+(n?":t"+Math.round(n.x):"")),a=t/1e3,r=Math.floor(a/Ff),l=a-r*Ff;if(!n){const y=Z=>Math.max(160,Math.min(2240,e.x+(Ls(i,Z)-.5)*760)),u=y(r-1);let w=y(r);const _=Ls(i+7,r),S=_<.45?"nap":_<.75?"sit":"groom",R=!!(s&&S==="nap"&&Ls(i+13,r)<.72);R&&s&&(w=Math.max(160,Math.min(2240,s.x)));const D=Math.abs(w-u),U=Math.min(5,D/110);return l<U&&!o?{x:u+(w-u)*(l/U),mood:"walk",flip:w<u,perch:0,curl:0}:{x:w,mood:S,flip:w<u,perch:0,curl:R?1:0}}const c=Math.max(160,Math.min(2240,n.x)),d=Ls(i+5,r)<.45?2:1,f=Math.max(160,Math.min(2240,c+(Ls(i,r)-.5)*420)),p=Math.abs(c-f),g=Math.min(4.2,Math.max(.6,p/160)),b=c<f;if(l<g&&!o)return{x:f+(c-f)*(l/g),mood:"walk",flip:b,perch:0,curl:0};const m=Ls(i+11,r),v=m<.34?"nap":m<.67?"sit":"play";return{x:c,mood:v,flip:b,perch:d,curl:0}}const er="#5a3d5c",Ie=`stroke="${er}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,qo=[`<svg viewBox="0 0 48 48"><path d="M24 40 C16 32 6 26 10 16 C14 8 24 12 24 20 C24 12 34 8 38 16 C42 26 32 32 24 40 Z" fill="#ff6b9a" ${Ie}/></svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd166" ${Ie}/></svg>`,`<svg viewBox="0 0 48 48"><circle cx="24" cy="22" r="6" fill="#ff8fab" ${Ie}/>${[0,60,120,180,240,300].map(e=>`<circle cx="${24+Math.cos(e*Math.PI/180)*12}" cy="${22+Math.sin(e*Math.PI/180)*12}" r="5" fill="#ffd166" ${Ie}/>`).join("")}<path d="M24 34 V44" ${Ie}/></svg>`,`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="10" fill="#ffb26b" ${Ie}/><circle cx="34" cy="20" r="8" fill="#ffc46b" ${Ie}/><path d="M28 14 L30 6 L36 14" fill="#ffb26b" ${Ie}/><circle cx="32" cy="19" r="1.4" fill="${er}"/><circle cx="37" cy="19" r="1.4" fill="${er}"/></svg>`,`<svg viewBox="0 0 48 48">${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M8 ${30-t*4} Q24 ${10-t*3} 40 ${30-t*4}" fill="none" stroke="${e}" stroke-width="4"/>`).join("")}</svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l3 10 10 1 -8 6 3 10 -8 -5 -8 5 3 -10 -8 -6 10 -1z" fill="#fff3b0" ${Ie}/><circle cx="12" cy="34" r="3" fill="#ff8fab" ${Ie}/><circle cx="36" cy="36" r="2.4" fill="#bde0fe" ${Ie}/></svg>`];function jf(e){const t=e?`<g class="flag"><path d="M30 16 V6" ${Ie}/><path d="M30 6 H42 L38 11 L42 16 H30 Z" fill="#ff6b6b" ${Ie}/></g>`:`<g class="flag"><path d="M18 28 H28" ${Ie}/><path d="M18 22 H28 L25 25 L28 28 H18 Z" fill="#ffd166" ${Ie}/></g>`;return`<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="68" rx="18" ry="3" fill="#000" opacity=".12"/>
    <rect x="30" y="40" width="5" height="26" rx="2" fill="#c99366" ${Ie}/>
    <path d="M8 40 V22 Q8 8 32 8 Q56 8 56 22 V40 Z" fill="#8ecae6" ${Ie}/>
    <path d="M8 28 H56" ${Ie}/>
    <rect x="14" y="32" width="36" height="16" rx="4" fill="#fff6e6" ${Ie}/>
    <circle cx="32" cy="40" r="3" fill="${er}"/>
    ${t}
  </svg>`}function Y2(e,t=[]){const n=W2(e,t);return n.ok?{ok:!0,text:n.text}:{ok:!1,msg:n.reason==="empty"?"Write a little note!":Qr[n.reason]||"Oops, try different words!"}}const K2={...Qr,empty:"Write a little note!",slow:"Let's wait a moment!",full:"This mailbox is full!",notyours:"Only she can open her mail.",nohouse:"That house is not on the street.",gone:"That letter is already gone.",toobig:"The mailbox is too full!",presetsOnly:"Typing is turned off: pick a phrase!",unread:"She still has your letters! Wait until she reads them."};function X2(e){return K2[e]||"Let's try that again!"}function J2(e){let t="",n="",s=!1,o="",i=0,a=0,r=-1,l="",c="";const d=()=>document.getElementById("mailCue");d()?.addEventListener("click",()=>{e.openOwn()});function f(){t="",n="",document.getElementById("mailSheet")?.remove()}function p(){let y=document.getElementById("mailSheet");return y||(y=document.createElement("div"),y.id="mailSheet",y.className="sheet mailSheet",y.innerHTML='<div class="card" id="mailCard"></div>',document.body.appendChild(y),y.addEventListener("click",u=>{const w=u.target;if(w===y||w.closest('[data-m="close"]')){f();return}b(w)}),y.addEventListener("input",u=>{const w=u.target;if(w.id!=="mailText")return;const _=document.getElementById("mailCount");_&&(_.textContent=`${w.value.length}/${Zn}`)})),y}function g(){if(!t)return;const y=p().querySelector("#mailText")?.value??"",u=e.mine(t),w=e.lettersOf(t),_=e.houseName(t),S=p().querySelector("#mailCard");if(n&&u&&!s){const D=w.find(U=>U.id===n);if(D&&D.text){m(D);return}n=""}if(s||!u){const D=e.freeType(),U=o?`Reply to ${e.houseName(o)||"your friend"}`:u?"Leave a letter":`Letter for ${_}`,Z=D?`<textarea id="mailText" class="mailBox" maxlength="${Zn}" placeholder="Hi! Come play!"></textarea>
        <div class="mailCount" id="mailCount">0/${Zn}</div>`:`<h3>Phrase</h3><div class="phrases mailPhrases">${pi.map((G,ee)=>`<button type="button" data-phrase="${ee}" class="${ee===r?"on":""}">${ut(G)}</button>`).join("")}</div>`;S.innerHTML=`<button class="close" data-m="close">✕</button><h2>${ut(U)}</h2>
        <p class="hint">${D?"A short note. Your name goes on it for you.":"Pick a phrase. Your name goes on it for you."}</p>
        ${Z}
        <h3>Paper</h3><div class="mailRow">${On.map((G,ee)=>`<button class="swatch ${ee===i?"on":""}" data-color="${ee}" style="background:${G}" aria-label="Paper ${ee+1}"></button>`).join("")}</div>
        <h3>Sticker</h3><div class="mailRow">${qo.slice(0,xh).map((G,ee)=>`<button class="stick ${ee===a?"on":""}" data-sticker="${ee}" aria-label="Sticker ${ee+1}">${G}</button>`).join("")}</div>
        ${l?`<p class="mailErr" id="mailErr">${ut(l)}</p>`:""}
        <button class="mailSend" id="mailSend" type="button">Send</button>
        ${u&&w.length?'<button class="mailRow" data-act="back" type="button" style="margin-top:8px">Back to my mail</button>':""}`;const ne=p().querySelector("#mailText");if(ne&&y){ne.value=y;const G=document.getElementById("mailCount");G&&(G.textContent=`${y.length}/${Zn}`)}return}const R=w.length?w.slice().reverse().map(D=>D.text?`<button type="button" class="letter ${D.read?"":"fresh"}" data-letter="${ut(D.id)}" style="background:${On[D.color]??On[0]}">
        <span class="sticker">${qo[D.sticker]??qo[0]}</span>
        <span class="who">${ut(D.from)}</span><span class="when">${ut(yl(D.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${Ie}/><path d="M4 8 L40 24 L76 8" fill="${On[D.color]??"#fff"}" ${Ie}/></svg>
      </button>`:`<div class="letter" style="background:${On[D.color]??On[0]}"><span class="who">Your letter</span><span class="when">${ut(yl(D.at))}</span><span class="statusChip ${D.read?"read":""}">${D.read?"Read":"Delivered"}</span></div>`).join(""):'<p class="hint">No letters yet. Your flag pops up when one arrives!</p>';S.innerHTML=`<button class="close" data-m="close">✕</button><h2>${ut(_)} mailbox</h2>${R}
      <div class="mailRow"><button type="button" data-act="write">Write a letter</button></div>
      ${l?`<p class="mailErr">${ut(l)}</p>`:""}`}function b(y){const u=y.closest(".mailPhrases [data-phrase]");if(u){r=+u.dataset.phrase,l="",g();return}const w=y.closest("[data-color]");if(w){i=+w.dataset.color,g();return}const _=y.closest("[data-sticker]");if(_){a=+_.dataset.sticker,g();return}if(y.closest("#mailSend"))return v();const S=y.closest("[data-act]")?.dataset.act;if(S==="write"){s=!0,o="",n="",l="",g();return}if(S==="back"){s=!1,o="",n="",l="",g();return}if(S==="reply"){const ne=e.houseOf(y.closest("[data-from]")?.dataset.from??"");if(!ne){e.toast("They are not on the street anymore.");return}o=ne,s=!0,n="",l="",t=ne,g();return}if(S==="drop"){const ne=y.closest("[data-id]")?.dataset.id??"";if(c!==ne){c=ne,e.toast("Tap again to throw it away");return}c="",e.drop(t,ne);return}const R=y.closest("[data-letter]");if(!R)return;const D=R.dataset.letter,Z=e.lettersOf(t).find(ne=>ne.id===D);Z&&(!e.mine(t)||!Z.text||(Z.read||e.read(t,D),n=D,m(Z)))}function m(y){const u=ey(y.text),w=p().querySelector("#mailCard");w.innerHTML=`<button class="close" data-m="close">✕</button>
      <div class="letter open read" style="background:${On[y.color]??On[0]}" data-id="${ut(y.id)}" data-from="${ut(y.fromPid)}">
        <span class="sticker">${qo[y.sticker]??qo[0]}</span>
        <span class="who">${ut(y.from)}</span><span class="when">${ut(yl(y.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${Ie}/><path class="flap" d="M4 8 L40 24 L76 8" fill="#fff" ${Ie}/></svg>
        <p class="words">${ut(u??"")}</p>
        <span class="mailRow"><button type="button" data-act="reply">Reply</button><button type="button" class="throw" data-act="drop">${c===y.id?"Tap again":"Throw away"}</button></span>
      </div>
      <button type="button" data-act="back">All my mail</button>
      ${l?`<p class="mailErr">${ut(l)}</p>`:""}`}function v(){let y="";if(e.freeType()){const w=p().querySelector("#mailText")?.value??"",_=Y2(w);if(!_.ok){l=_.msg,g();const S=p().querySelector("#mailText");S&&(S.value=w);return}y=_.text}else{if(r<0||r>=pi.length){l="Pick a phrase!",g();return}y=pi[r]}const u=o||t;l="",e.send(u,y,i,a),e.toast("On its way!"),e.mine(u)?(s=!1,o="",t=u,g()):f()}return{open(y,u,w,_){t=y,n="",s=!w,o="",l="",c="",i=0,a=0,r=-1,g()},fail(y){l=X2(y),t?g():e.toast(l)},refresh(){t&&g()},syncCue(y){d()?.classList.toggle("show",y)}}}function ey(e){if(!e)return null;const t=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return!t||t.length>Zn?null:t}function ut(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const Yh=()=>Wt("cozy-play");function ty(){try{return localStorage.getItem(Yh())==="play"?"play":"decorate"}catch{return"decorate"}}function ny(e){try{localStorage.setItem(Yh(),e)}catch{}}function sy(e){return e==="kennel"?"kennel":e==="cat-tower"?"tower":e==="yard-swing"?"swing":e==="lamp"||/(^|:)lamp|starlamp|light/.test(e)?"lamp":e==="fridge"||e==="stove"||e==="vanity"||e==="bookshelf"||e==="window"||e==="mirror"||e==="tv"||/fridge|stove|cabinet|drawer|vanity/.test(e)?"open":no(e)?"sit":"wiggle"}const oy='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M34 8 l1.2 3 3 .4 -2.2 2 .6 3 -2.6-1.6 -2.6 1.6 .6-3 -2.2-2 3-.4z" fill="#ffd166" stroke="#5a3d5c" stroke-width="1.4"/></svg>',iy='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 36 h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M8 14 l2 1 M40 34 l2 2 M8 40 l3 -1" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>';function ay(e,t){let n="decorate";const s=e.querySelector("#modePlay"),o=e.querySelector("#modeDecorate");s.querySelector(".modeIco").innerHTML=oy,o.querySelector(".modeIco").innerHTML=iy;const i=()=>{const c=n==="play";document.body.classList.toggle("mode-play",c),s.classList.toggle("on",c),o.classList.toggle("on",!c),s.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-pressed",c?"false":"true")},a=(c,d)=>{n=c,d&&ny(c),i(),t.onChange?.()};e.addEventListener("pointerdown",c=>c.stopPropagation()),e.addEventListener("click",c=>{const d=c.target.closest("[data-mode]");if(!d)return;const f=d.dataset.mode==="play"?"play":"decorate";a(f,t.ownHouse())}),i();let r=!1;return{mode:()=>n,isPlay:()=>n==="play",sync(c){a(c?ty():"play",!1)},hint:()=>{if(r||!document.body.classList.contains("phone"))return;const c=Wt("cozy-mode-hint");try{if(localStorage.getItem(c)){r=!0;return}}catch{r=!0;return}r=!0;const d=document.createElement("p");d.className="modeHint",d.textContent="Play: tap things! Decorate: move things!",e.appendChild(d);let f=!1;const p=()=>{if(!f){f=!0,d.remove(),window.removeEventListener("pointerdown",p);try{localStorage.setItem(c,"1")}catch{}}};window.setTimeout(p,2800),d.addEventListener("click",p),window.addEventListener("pointerdown",p)}}}const Kh=new Map;let Xh=!1;function Eo(){return Xh}function ry(e){Xh=e}function Ns(e){return Kh.get(e)}function ly(e,t){Kh.set(e,t)}const cy=!0;let ia=null;function dy(e){const t=new URLSearchParams(e.replace(/^\?/,"")).get("art");t==="v1"?ia=!1:t==="v2"?ia=!0:ia=null;const n=ia??cy;return ry(n),n}const tr=Object.assign({"../../assets/art/any/armchair.webp":()=>h(()=>import("./armchair-BAjEKZT-.js"),[]).then(e=>e.default),"../../assets/art/any/ball.webp":()=>h(()=>import("./ball-D1B5vbct.js"),[]).then(e=>e.default),"../../assets/art/any/balloon.webp":()=>h(()=>import("./balloon-5CQ1ji1d.js"),[]).then(e=>e.default),"../../assets/art/any/bookshelf.webp":()=>h(()=>import("./bookshelf-BCCk-QJS.js"),[]).then(e=>e.default),"../../assets/art/any/chair.webp":()=>h(()=>import("./chair-BxTP5f1M.js"),[]).then(e=>e.default),"../../assets/art/any/clock.webp":()=>h(()=>import("./clock-D_q2KVbT.js"),[]).then(e=>e.default),"../../assets/art/any/lamp.webp":()=>h(()=>import("./lamp-BOWZQ_df.js"),[]).then(e=>e.default),"../../assets/art/any/picture.webp":()=>h(()=>import("./picture-DsR0Jovx.js"),[]).then(e=>e.default),"../../assets/art/any/plant.webp":()=>h(()=>import("./plant-xO8tOsUj.js"),[]).then(e=>e.default),"../../assets/art/any/rug.webp":()=>h(()=>Promise.resolve().then(()=>dE),void 0).then(e=>e.default),"../../assets/art/any/sofa.webp":()=>h(()=>import("./sofa-DqtVZLgl.js"),[]).then(e=>e.default),"../../assets/art/any/table.webp":()=>h(()=>import("./table-CaJl95Y4.js"),[]).then(e=>e.default),"../../assets/art/any/tv.webp":()=>h(()=>import("./tv-10oa_PoM.js"),[]).then(e=>e.default),"../../assets/art/any/window.webp":()=>h(()=>import("./window-jtnOMij-.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-mat.webp":()=>h(()=>import("./bath-mat-DLlrRePN.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-mirror.webp":()=>h(()=>import("./bath-mirror-4OfFj8EV.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-stool.webp":()=>h(()=>import("./bath-stool-DqJM8fLh.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-toilet.webp":()=>h(()=>import("./bath-toilet-C2nhunlA.js"),[]).then(e=>e.default),"../../assets/art/bathroom/laundry-hamper.webp":()=>h(()=>import("./laundry-hamper-0OQZcXyH.js"),[]).then(e=>e.default),"../../assets/art/bathroom/rubber-ducky.webp":()=>h(()=>import("./rubber-ducky-pwUm0Pe4.js"),[]).then(e=>e.default),"../../assets/art/bathroom/shower-curtain.webp":()=>h(()=>import("./shower-curtain-UCHNbYT7.js"),[]).then(e=>e.default),"../../assets/art/bathroom/sink-vanity.webp":()=>h(()=>import("./sink-vanity-aUbm9Mix.js"),[]).then(e=>e.default),"../../assets/art/bathroom/soaking-tub.webp":()=>h(()=>import("./soaking-tub-C07Kgt8P.js"),[]).then(e=>e.default),"../../assets/art/bathroom/soap-dish.webp":()=>h(()=>import("./soap-dish-Duoeh42V.js"),[]).then(e=>e.default),"../../assets/art/bathroom/towel-bar.webp":()=>h(()=>import("./towel-bar-fU4SDA3M.js"),[]).then(e=>e.default),"../../assets/art/bedroom/bed.webp":()=>h(()=>import("./bed-CKbzIr1E.js"),[]).then(e=>e.default),"../../assets/art/bedroom/mirror.webp":()=>h(()=>import("./mirror-D5FvkWJA.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~alarm-clock.webp":()=>h(()=>import("./pack~alarm-clock-B1MKtcYc.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bedtime-snack.webp":()=>h(()=>import("./pack~bedtime-snack-CQHBbXTE.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~big-monitor.webp":()=>h(()=>import("./pack~big-monitor-DnY9RO7w.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~big-wardrobe.webp":()=>h(()=>import("./pack~big-wardrobe-DKmYluKF.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~book-stack.webp":()=>h(()=>import("./pack~book-stack-DgPlZ9_3.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bubble-bath.webp":()=>h(()=>import("./pack~bubble-bath-CP64sVml.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bunk-bed.webp":()=>h(()=>import("./pack~bunk-bed-D-NM_ktx.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bunny-slippers.webp":()=>h(()=>import("./pack~bunny-slippers-I8r5WVZt.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~canopy-bed.webp":()=>h(()=>import("./pack~canopy-bed-BpoysMK9.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cat-bed.webp":()=>h(()=>import("./pack~cat-bed-BAS6-rN0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~caterpillar-plush.webp":()=>h(()=>import("./pack~caterpillar-plush-CEbFuatX.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-canopy-daybed.webp":()=>h(()=>import("./pack~cc-canopy-daybed-DoE44IXz.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-cloud-beanbag.webp":()=>h(()=>import("./pack~cc-cloud-beanbag-D0qNEg32.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-cloud-lamp.webp":()=>h(()=>import("./pack~cc-cloud-lamp-DIDpxlMU.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-fairy-garland.webp":()=>h(()=>import("./pack~cc-fairy-garland-CEQT4GTj.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-heart-bed.webp":()=>h(()=>import("./pack~cc-heart-bed-BupJOayJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-jewel-box.webp":()=>h(()=>import("./pack~cc-jewel-box-C-vIsXue.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-reading-nook.webp":()=>h(()=>import("./pack~cc-reading-nook-Ba_6wW4M.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-star-dresser.webp":()=>h(()=>import("./pack~cc-star-dresser-CY3IU_Po.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-window-seat.webp":()=>h(()=>import("./pack~cc-window-seat-CPrwdaeJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~checker-bed.webp":()=>h(()=>import("./pack~checker-bed-Dl1khZwL.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~clothes-rail.webp":()=>h(()=>import("./pack~clothes-rail-DpNxviPS.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cloud-rug.webp":()=>h(()=>import("./pack~cloud-rug-BVi9jYKG.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cloud-shelf.webp":()=>h(()=>import("./pack~cloud-shelf-slqFLmn1.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cork-board.webp":()=>h(()=>import("./pack~cork-board-DWOPEjn8.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~curvy-desk.webp":()=>h(()=>import("./pack~curvy-desk-BDa2yytO.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~daisy-pot.webp":()=>h(()=>import("./pack~daisy-pot-vdUJfXm_.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~desk-mic.webp":()=>h(()=>import("./pack~desk-mic-d9T8n8mE.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~desk.webp":()=>h(()=>import("./pack~desk-C-3AgNRZ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~dino-plush.webp":()=>h(()=>import("./pack~dino-plush-DdqMPHIF.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~doll-house.webp":()=>h(()=>import("./pack~doll-house-CH0M4iJ5.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~dresser.webp":()=>h(()=>import("./pack~dresser-Cws-4Als.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~egg-chair.webp":()=>h(()=>import("./pack~egg-chair-DYGRZPW0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~floor-fan.webp":()=>h(()=>import("./pack~floor-fan-NUw25upr.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~frog-plush.webp":()=>h(()=>import("./pack~frog-plush-Bq4x4dF_.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~game-controller.webp":()=>h(()=>import("./pack~game-controller-CwDKL6zs.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~gaming-chair.webp":()=>h(()=>import("./pack~gaming-chair-Ch-jvTrR.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~guinea-pig.webp":()=>h(()=>import("./pack~guinea-pig-BSQGDcoG.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~hamster-cage.webp":()=>h(()=>import("./pack~hamster-cage-1ZrJIYPk.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~hamster-pet.webp":()=>h(()=>import("./pack~hamster-pet-DO0Nc-ra.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~headphones.webp":()=>h(()=>import("./pack~headphones-BuEyFi9F.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~heart-rug.webp":()=>h(()=>import("./pack~heart-rug-CHsSWFVJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~keyboard.webp":()=>h(()=>import("./pack~keyboard-CpH04NZb.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~lava-lamp.webp":()=>h(()=>import("./pack~lava-lamp-C0yGLXxS.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~moon-night-light.webp":()=>h(()=>import("./pack~moon-night-light-jQgCx363.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~nightstand.webp":()=>h(()=>import("./pack~nightstand-CAZ1Ijk0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~paper-lantern.webp":()=>h(()=>import("./pack~paper-lantern-CBHdnzS2.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~pastel-wardrobe.webp":()=>h(()=>import("./pack~pastel-wardrobe-6p6FbGSg.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~phone-stand.webp":()=>h(()=>import("./pack~phone-stand-DA6FpZ6R.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~piggy-bank.webp":()=>h(()=>import("./pack~piggy-bank-CsgR-O1T.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~plant-stand.webp":()=>h(()=>import("./pack~plant-stand-m1tPlZfP.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~play-tent.webp":()=>h(()=>import("./pack~play-tent-C9Fxa0Rh.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~star-mobile.webp":()=>h(()=>import("./pack~star-mobile-CMLjVRhn.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-chest.webp":()=>h(()=>import("./pack~toy-chest-Bx3rslln.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-robot.webp":()=>h(()=>import("./pack~toy-robot-DuDxaaXx.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-train.webp":()=>h(()=>import("./pack~toy-train-OdPxfMvY.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~unicorn-plush.webp":()=>h(()=>import("./pack~unicorn-plush-1Ml4NpgU.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~vlog-camera.webp":()=>h(()=>import("./pack~vlog-camera-CU7magSa.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wardrobe.webp":()=>h(()=>import("./pack~wardrobe-CnpDMG_i.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wh-dresser.webp":()=>h(()=>import("./pack~wh-dresser-BJJ7U3Ti.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wh-nightstand.webp":()=>h(()=>import("./pack~wh-nightstand-TWRUmwYh.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wood-desk.webp":()=>h(()=>import("./pack~wood-desk-rwE12GqK.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wooden-bed.webp":()=>h(()=>import("./pack~wooden-bed-13S3AiLf.js"),[]).then(e=>e.default),"../../assets/art/bedroom/stars.webp":()=>h(()=>import("./stars-BPD2RlkZ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/story-pillow.webp":()=>h(()=>import("./story-pillow-3KtRY1EI.js"),[]).then(e=>e.default),"../../assets/art/bedroom/teddy.webp":()=>h(()=>import("./teddy-CS3IZCmA.js"),[]).then(e=>e.default),"../../assets/art/bedroom/tub.webp":()=>h(()=>import("./tub-D2ItmFKM.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-bakery-shelf.webp":()=>h(()=>import("./pack~cc-bakery-shelf-C9pglmOD.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-breakfast-table.webp":()=>h(()=>import("./pack~cc-breakfast-table-CqAzN2si.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-bubble-chair.webp":()=>h(()=>import("./pack~cc-bubble-chair-Db6ctGIk.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-cupcake-stand.webp":()=>h(()=>import("./pack~cc-cupcake-stand-ClVhXfMJ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-dryer-chair.webp":()=>h(()=>import("./pack~cc-dryer-chair-BhVjSN-o.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-flower-kettle.webp":()=>h(()=>import("./pack~cc-flower-kettle-T5UeKV0l.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-light-vanity.webp":()=>h(()=>import("./pack~cc-light-vanity-D_F5Ili-.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-macaron-jar.webp":()=>h(()=>import("./pack~cc-macaron-jar-C7OMMZGy.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-mani-chair.webp":()=>h(()=>import("./pack~cc-mani-chair-gE8U4fT9.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-mint-fridge.webp":()=>h(()=>import("./pack~cc-mint-fridge-qv93g_mZ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-pastel-range.webp":()=>h(()=>import("./pack~cc-pastel-range-DEzEnqL9.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-perfume-tray.webp":()=>h(()=>import("./pack~cc-perfume-tray-BOuRtQMQ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-ribbon-mirror.webp":()=>h(()=>import("./pack~cc-ribbon-mirror-DaVelywO.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-teapot-set.webp":()=>h(()=>import("./pack~cc-teapot-set-CYwQRzs2.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~arched-shelf.webp":()=>h(()=>import("./pack~arched-shelf-CKpdbpUV.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~blob-rug.webp":()=>h(()=>import("./pack~blob-rug-DV27jZ4K.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~bubbly-plant.webp":()=>h(()=>import("./pack~bubbly-plant-DaDhjp5G.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~bud-vase.webp":()=>h(()=>import("./pack~bud-vase-BjDwnbex.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~comb-brush.webp":()=>h(()=>import("./pack~comb-brush-2q32lqRM.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~cream-jars.webp":()=>h(()=>import("./pack~cream-jars-DuhIPlDY.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~drop-lamp.webp":()=>h(()=>import("./pack~drop-lamp-CpS9XCXn.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~droplet-buddy.webp":()=>h(()=>import("./pack~droplet-buddy-DgmZ-fU6.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~fancy-sofa.webp":()=>h(()=>import("./pack~fancy-sofa-Cuv4CZ93.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~flower-cart.webp":()=>h(()=>import("./pack~flower-cart-Cpa-qrtx.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~foot-spa.webp":()=>h(()=>import("./pack~foot-spa-CSEQ1rPl.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~globe-pendants.webp":()=>h(()=>import("./pack~globe-pendants-CeBlCiLv.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~glow-mirror.webp":()=>h(()=>import("./pack~glow-mirror-BK53Zp0A.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~gold-floor-mirror.webp":()=>h(()=>import("./pack~gold-floor-mirror-BIgxfU1m.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~hair-dryer.webp":()=>h(()=>import("./pack~hair-dryer-CDTC9I6n.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~heart-plant.webp":()=>h(()=>import("./pack~heart-plant-B-wW-dwX.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~heart-pouf.webp":()=>h(()=>import("./pack~heart-pouf-BbbND0iB.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~lilac-curtain.webp":()=>h(()=>import("./pack~lilac-curtain-CKYxudqA.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~lotion-trio.webp":()=>h(()=>import("./pack~lotion-trio-oJDS-nAk.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~mani-lamp.webp":()=>h(()=>import("./pack~mani-lamp-CIckVWe7.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~nail-table.webp":()=>h(()=>import("./pack~nail-table-DblO1JLs.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pebble-rug.webp":()=>h(()=>import("./pack~pebble-rug-bTJFA8Ur.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~perfume-bottle.webp":()=>h(()=>import("./pack~perfume-bottle-gM_mVBfU.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pink-fountain.webp":()=>h(()=>import("./pack~pink-fountain-Ciur2kZp.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pink-vanity.webp":()=>h(()=>import("./pack~pink-vanity-wGJdTvWK.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~polish-bottle.webp":()=>h(()=>import("./pack~polish-bottle-TyYjJ4KH.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~polish-rack.webp":()=>h(()=>import("./pack~polish-rack-BiHiHzDG.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~reception-desk.webp":()=>h(()=>import("./pack~reception-desk-Bhr61SSS.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~salon-chair.webp":()=>h(()=>import("./pack~salon-chair-B5ARb_Hu.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~scent-candle.webp":()=>h(()=>import("./pack~scent-candle-DhSW37c1.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~spray-bottle.webp":()=>h(()=>import("./pack~spray-bottle-co6Gr0Aw.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~star-wall-sign.webp":()=>h(()=>import("./pack~star-wall-sign-keSh_Cax.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~swivel-stool.webp":()=>h(()=>import("./pack~swivel-stool-gm_rxOWt.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~tiered-tray.webp":()=>h(()=>import("./pack~tiered-tray-CrVkNUF_.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~towel-cart.webp":()=>h(()=>import("./pack~towel-cart-TzS6naxj.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~towel-stack.webp":()=>h(()=>import("./pack~towel-stack-DVE-ZURg.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~vine-planter.webp":()=>h(()=>import("./pack~vine-planter-D6XFbFLe.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~waiting-bench.webp":()=>h(()=>import("./pack~waiting-bench-rf-Lxrnd.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~wash-chair.webp":()=>h(()=>import("./pack~wash-chair-By1PyrJZ.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-candy-bowl.webp":()=>h(()=>import("./pack~hw-candy-bowl-DYzwlwqt.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-cat-statue.webp":()=>h(()=>import("./pack~hw-cat-statue-FQxqUye_.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-cauldron.webp":()=>h(()=>import("./pack~hw-cauldron-CEa-TJHO.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-ghost-sheet.webp":()=>h(()=>import("./pack~hw-ghost-sheet-rc91-ve_.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-hay-bale.webp":()=>h(()=>import("./pack~hw-hay-bale-BbE90YS9.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-heart-pumpkin.webp":()=>h(()=>import("./pack~hw-heart-pumpkin-PfYNpXFo.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-leaf-garland.webp":()=>h(()=>import("./pack~hw-leaf-garland-DpM5QBlC.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-moon-cling.webp":()=>h(()=>import("./pack~hw-moon-cling-CH5pjYPJ.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-moon-lantern.webp":()=>h(()=>import("./pack~hw-moon-lantern-CmD5N0JV.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-star-pumpkin.webp":()=>h(()=>import("./pack~hw-star-pumpkin-WFRvw5za.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-witch-hat.webp":()=>h(()=>import("./pack~hw-witch-hat-q2MY5sg8.js"),[]).then(e=>e.default),"../../assets/art/kitchen/apple.webp":()=>h(()=>import("./apple-CgQUqZtF.js"),[]).then(e=>e.default),"../../assets/art/kitchen/berry-basket.webp":()=>h(()=>import("./berry-basket-D02mck40.js"),[]).then(e=>e.default),"../../assets/art/kitchen/cake.webp":()=>h(()=>import("./cake-D-PUSdV3.js"),[]).then(e=>e.default),"../../assets/art/kitchen/donut.webp":()=>h(()=>import("./donut-D-CyVfCH.js"),[]).then(e=>e.default),"../../assets/art/kitchen/fridge.webp":()=>h(()=>import("./fridge-CPUz39WO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/juice.webp":()=>h(()=>import("./juice-C7d-xViI.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bananas.webp":()=>h(()=>import("./pack~bananas-BaRiiq6m.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bar-stool.webp":()=>h(()=>import("./pack~bar-stool-DoItrBtD.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bread-loaf.webp":()=>h(()=>import("./pack~bread-loaf-DkvGPzQe.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~chick.webp":()=>h(()=>import("./pack~chick-BO9DXErH.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~china-hutch.webp":()=>h(()=>import("./pack~china-hutch-DPrwGSNq.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cocoa-mug.webp":()=>h(()=>import("./pack~cocoa-mug-hzMczJEM.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cookie-jar.webp":()=>h(()=>import("./pack~cookie-jar-DwGPCGTZ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cooking-pot.webp":()=>h(()=>import("./pack~cooking-pot-CfarfMvn.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cupcake.webp":()=>h(()=>import("./pack~cupcake-4s6JCz52.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~dish-rack.webp":()=>h(()=>import("./pack~dish-rack-Dffid-z2.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~fruit-bowl.webp":()=>h(()=>import("./pack~fruit-bowl-S7zdSZud.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~frying-pan.webp":()=>h(()=>import("./pack~frying-pan-BibqhFDJ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~happy-fridge.webp":()=>h(()=>import("./pack~happy-fridge-HnFXofL6.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~herb-box.webp":()=>h(()=>import("./pack~herb-box-DjQ-1q5D.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~high-chair.webp":()=>h(()=>import("./pack~high-chair-24NInnaO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~ice-cream.webp":()=>h(()=>import("./pack~ice-cream-rdopj06A.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kettle.webp":()=>h(()=>import("./pack~kettle-ByDzqkyg.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kitchen-counter.webp":()=>h(()=>import("./pack~kitchen-counter-B7uMIWhT.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kitchen-sink.webp":()=>h(()=>import("./pack~kitchen-sink-DyICEjEC.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~lemon-tree.webp":()=>h(()=>import("./pack~lemon-tree-B8bzBxaO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~microwave.webp":()=>h(()=>import("./pack~microwave-B6anYgBg.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~milk-bottle.webp":()=>h(()=>import("./pack~milk-bottle-CKMei0uX.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pancakes.webp":()=>h(()=>import("./pack~pancakes-BmuT40In.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pantry-shelf.webp":()=>h(()=>import("./pack~pantry-shelf-0EpJaISh.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pendant-lamp.webp":()=>h(()=>import("./pack~pendant-lamp-BRmz1TSb.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pet-bowl.webp":()=>h(()=>import("./pack~pet-bowl-bLDcshyX.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~rice-cooker.webp":()=>h(()=>import("./pack~rice-cooker-j9bjO2OS.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~runner-rug.webp":()=>h(()=>import("./pack~runner-rug-DgsAHdwM.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~spice-rack.webp":()=>h(()=>import("./pack~spice-rack-5CIyihfN.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~stand-mixer.webp":()=>h(()=>import("./pack~stand-mixer-DVs9icnQ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~teapot.webp":()=>h(()=>import("./pack~teapot-Clbuel00.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~toaster.webp":()=>h(()=>import("./pack~toaster-0CdrvAn6.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~utensil-rail.webp":()=>h(()=>import("./pack~utensil-rail-7lJosKxj.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~watermelon-slice.webp":()=>h(()=>import("./pack~watermelon-slice-DDNYgh1a.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pizza.webp":()=>h(()=>import("./pizza-CBn4rlbT.js"),[]).then(e=>e.default),"../../assets/art/kitchen/stove.webp":()=>h(()=>import("./stove-EEI-cSzf.js"),[]).then(e=>e.default),"../../assets/art/living/bunny.webp":()=>h(()=>import("./bunny-PYkx6Ie3.js"),[]).then(e=>e.default),"../../assets/art/living/cactus.webp":()=>h(()=>import("./cactus-CNbOypby.js"),[]).then(e=>e.default),"../../assets/art/living/cat-tower.webp":()=>h(()=>import("./cat-tower-BTX9_pA4.js"),[]).then(e=>e.default),"../../assets/art/living/cat.webp":()=>h(()=>import("./cat-CkF-5Moc.js"),[]).then(e=>e.default),"../../assets/art/living/dog.webp":()=>h(()=>import("./dog-XsW5t_fN.js"),[]).then(e=>e.default),"../../assets/art/living/egg~cada-mouse.webp":()=>h(()=>import("./egg~cada-mouse-CahQlh-m.js"),[]).then(e=>e.default),"../../assets/art/living/egg~chloe-starlamp.webp":()=>h(()=>import("./egg~chloe-starlamp-pq_Iclzu.js"),[]).then(e=>e.default),"../../assets/art/living/egg~quinn-pup.webp":()=>h(()=>import("./egg~quinn-pup-BqdUFpbv.js"),[]).then(e=>e.default),"../../assets/art/living/egg~reagan-frame.webp":()=>h(()=>import("./egg~reagan-frame-BWp9N6ej.js"),[]).then(e=>e.default),"../../assets/art/living/egg~sloane-snail.webp":()=>h(()=>import("./egg~sloane-snail-DsDMZRR7.js"),[]).then(e=>e.default),"../../assets/art/living/fish.webp":()=>h(()=>import("./fish-Cs1FEzIZ.js"),[]).then(e=>e.default),"../../assets/art/living/floor-cushion.webp":()=>h(()=>import("./floor-cushion-D7ewX4dX.js"),[]).then(e=>e.default),"../../assets/art/living/flowers.webp":()=>h(()=>import("./flowers-CHLFwDXa.js"),[]).then(e=>e.default),"../../assets/art/living/kennel.webp":()=>h(()=>import("./kennel-iNvQ28eh.js"),[]).then(e=>e.default),"../../assets/art/living/pack~acorn-friend.webp":()=>h(()=>import("./pack~acorn-friend-Bm4Hk12h.js"),[]).then(e=>e.default),"../../assets/art/living/pack~aquarium.webp":()=>h(()=>import("./pack~aquarium-D0sUglTr.js"),[]).then(e=>e.default),"../../assets/art/living/pack~arc-floor-lamp.webp":()=>h(()=>import("./pack~arc-floor-lamp-7GCaGkDs.js"),[]).then(e=>e.default),"../../assets/art/living/pack~bean-bag.webp":()=>h(()=>Promise.resolve().then(()=>fE),void 0).then(e=>e.default),"../../assets/art/living/pack~bird-cage.webp":()=>h(()=>import("./pack~bird-cage-CLlPQlCF.js"),[]).then(e=>e.default),"../../assets/art/living/pack~blanket-basket.webp":()=>h(()=>import("./pack~blanket-basket-Clw-jcOi.js"),[]).then(e=>e.default),"../../assets/art/living/pack~box-stack.webp":()=>h(()=>import("./pack~box-stack-DV3Ljobv.js"),[]).then(e=>e.default),"../../assets/art/living/pack~brick-fireplace.webp":()=>h(()=>import("./pack~brick-fireplace-CU641OC1.js"),[]).then(e=>e.default),"../../assets/art/living/pack~building-blocks.webp":()=>h(()=>import("./pack~building-blocks-C0yT9TvM.js"),[]).then(e=>e.default),"../../assets/art/living/pack~bulletin-board.webp":()=>h(()=>import("./pack~bulletin-board-BCXiWqVp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cactus-buddy.webp":()=>h(()=>import("./pack~cactus-buddy-2_JfEHKl.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-cottage-aquarium.webp":()=>h(()=>import("./pack~cc-cottage-aquarium-C8NYhmrd.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-fairy-shelf.webp":()=>h(()=>import("./pack~cc-fairy-shelf-CnHOFSRs.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-flower-lamp.webp":()=>h(()=>import("./pack~cc-flower-lamp-wbPhnbQ_.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-clock.webp":()=>h(()=>import("./pack~cc-heart-clock-jr4MzVW9.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-pouf.webp":()=>h(()=>import("./pack~cc-heart-pouf-BPM9YsrB.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-rug.webp":()=>h(()=>import("./pack~cc-heart-rug-BVKJ0cQB.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-macrame-swing.webp":()=>h(()=>import("./pack~cc-macrame-swing-pWIX7Xk-.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-mushroom-stool.webp":()=>h(()=>import("./pack~cc-mushroom-stool-CMlvAjd6.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-petal-table.webp":()=>h(()=>import("./pack~cc-petal-table-7S1s7yzK.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-plant-wall.webp":()=>h(()=>import("./pack~cc-plant-wall-p6D9EEBb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-record-player.webp":()=>h(()=>import("./pack~cc-record-player-BRAifeEK.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-scallop-curtains.webp":()=>h(()=>import("./pack~cc-scallop-curtains-BeV7rdPo.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-scallop-loveseat.webp":()=>h(()=>import("./pack~cc-scallop-loveseat-_AoDnFXb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~checker-rug.webp":()=>h(()=>import("./pack~checker-rug-Cp2IkzoS.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cloud-sofa.webp":()=>h(()=>import("./pack~cloud-sofa-DyBmuzAg.js"),[]).then(e=>e.default),"../../assets/art/living/pack~coffee-table.webp":()=>h(()=>import("./pack~coffee-table-DPuXhspW.js"),[]).then(e=>e.default),"../../assets/art/living/pack~comfy-armchair.webp":()=>h(()=>import("./pack~comfy-armchair-CJDG30Cj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cream-sofa.webp":()=>h(()=>import("./pack~cream-sofa-Ez2miUnO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cubby-shelf.webp":()=>h(()=>import("./pack~cubby-shelf-BUMGU8Jh.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cube-shelf.webp":()=>h(()=>import("./pack~cube-shelf-D5D2Dw5S.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cute-speaker.webp":()=>h(()=>import("./pack~cute-speaker-jTqsaV2I.js"),[]).then(e=>e.default),"../../assets/art/living/pack~daisy-rug.webp":()=>h(()=>import("./pack~daisy-rug-BCUkj5ia.js"),[]).then(e=>e.default),"../../assets/art/living/pack~desk-lamp.webp":()=>h(()=>import("./pack~desk-lamp-DmCKofr2.js"),[]).then(e=>e.default),"../../assets/art/living/pack~fiddle-leaf-fig.webp":()=>h(()=>import("./pack~fiddle-leaf-fig-D7FML9mx.js"),[]).then(e=>e.default),"../../assets/art/living/pack~fireplace.webp":()=>h(()=>import("./pack~fireplace-DYp6BN4M.js"),[]).then(e=>e.default),"../../assets/art/living/pack~flower-lamp.webp":()=>h(()=>import("./pack~flower-lamp-kPf9KBh-.js"),[]).then(e=>e.default),"../../assets/art/living/pack~glass-cabinet.webp":()=>h(()=>import("./pack~glass-cabinet-B9JOaE-O.js"),[]).then(e=>e.default),"../../assets/art/living/pack~globe.webp":()=>h(()=>import("./pack~globe-Df4aJX14.js"),[]).then(e=>e.default),"../../assets/art/living/pack~hanging-lantern.webp":()=>h(()=>import("./pack~hanging-lantern-CSb5_y-t.js"),[]).then(e=>e.default),"../../assets/art/living/pack~hanging-planter.webp":()=>h(()=>import("./pack~hanging-planter-BXNCa3po.js"),[]).then(e=>e.default),"../../assets/art/living/pack~heart-light.webp":()=>h(()=>import("./pack~heart-light-BMZQFtcT.js"),[]).then(e=>e.default),"../../assets/art/living/pack~knit-cushion.webp":()=>h(()=>import("./pack~knit-cushion-DzpDb6hm.js"),[]).then(e=>e.default),"../../assets/art/living/pack~ladder-shelf.webp":()=>h(()=>import("./pack~ladder-shelf-CLOcbyxp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~landscape-art.webp":()=>h(()=>import("./pack~landscape-art-DiJEigPf.js"),[]).then(e=>e.default),"../../assets/art/living/pack~lattice-bench.webp":()=>h(()=>import("./pack~lattice-bench-0G6hKZYj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~leaf-wreath.webp":()=>h(()=>import("./pack~leaf-wreath-WJ1hv4SR.js"),[]).then(e=>e.default),"../../assets/art/living/pack~monstera-plant.webp":()=>h(()=>import("./pack~monstera-plant-BE84EAw8.js"),[]).then(e=>e.default),"../../assets/art/living/pack~moving-box.webp":()=>h(()=>import("./pack~moving-box-CAe2Xeia.js"),[]).then(e=>e.default),"../../assets/art/living/pack~piano.webp":()=>h(()=>import("./pack~piano-C2g19n4Y.js"),[]).then(e=>e.default),"../../assets/art/living/pack~popcorn.webp":()=>h(()=>import("./pack~popcorn-B6n0yaX2.js"),[]).then(e=>e.default),"../../assets/art/living/pack~pothos-plant.webp":()=>h(()=>import("./pack~pothos-plant-CTHDCuIc.js"),[]).then(e=>e.default),"../../assets/art/living/pack~pouf.webp":()=>h(()=>import("./pack~pouf-BJ-teA6I.js"),[]).then(e=>e.default),"../../assets/art/living/pack~puffy-stool.webp":()=>h(()=>import("./pack~puffy-stool-D38tkWnm.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rainbow-rug.webp":()=>h(()=>import("./pack~rainbow-rug-DUV6gUsN.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rainbow-wall-art.webp":()=>h(()=>import("./pack~rainbow-wall-art--boV5icC.js"),[]).then(e=>e.default),"../../assets/art/living/pack~retro-radio.webp":()=>h(()=>import("./pack~retro-radio-CDLK9pHp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~ring-light.webp":()=>h(()=>import("./pack~ring-light-C3E9VDAl.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rocking-chair.webp":()=>h(()=>import("./pack~rocking-chair-B2p2ReQc.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rocking-horse.webp":()=>h(()=>import("./pack~rocking-horse-CswTc134.js"),[]).then(e=>e.default),"../../assets/art/living/pack~round-rug.webp":()=>h(()=>import("./pack~round-rug-CHSVB2Aw.js"),[]).then(e=>e.default),"../../assets/art/living/pack~side-table-round.webp":()=>h(()=>import("./pack~side-table-round-CP96FSiO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~snake-plant.webp":()=>h(()=>import("./pack~snake-plant-DawlmINM.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sprout-pot.webp":()=>h(()=>import("./pack~sprout-pot-Dx8LI8dH.js"),[]).then(e=>e.default),"../../assets/art/living/pack~star-lamp.webp":()=>h(()=>import("./pack~star-lamp-s9PtqFmZ.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sticker-board.webp":()=>h(()=>import("./pack~sticker-board--TDZ7ozq.js"),[]).then(e=>e.default),"../../assets/art/living/pack~string-lights.webp":()=>h(()=>import("./pack~string-lights-HZXr5sUd.js"),[]).then(e=>e.default),"../../assets/art/living/pack~stripe-runner.webp":()=>h(()=>import("./pack~stripe-runner-B0fRj7Re.js"),[]).then(e=>e.default),"../../assets/art/living/pack~succulent-trio.webp":()=>h(()=>import("./pack~succulent-trio-M7abHPiA.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sunny-art.webp":()=>h(()=>import("./pack~sunny-art-D2_v9d4h.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sv-bean-bag.webp":()=>h(()=>Promise.resolve().then(()=>pE),void 0).then(e=>e.default),"../../assets/art/living/pack~sv-cloud-rug.webp":()=>h(()=>import("./pack~sv-cloud-rug-DBeaYhY1.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sv-wall-shelf.webp":()=>h(()=>import("./pack~sv-wall-shelf-CE0YAWvX.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tassel-rug.webp":()=>h(()=>import("./pack~tassel-rug-C3GgXPyZ.js"),[]).then(e=>e.default),"../../assets/art/living/pack~throw-pillow.webp":()=>h(()=>import("./pack~throw-pillow-BUguyBcj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~toy-car.webp":()=>h(()=>import("./pack~toy-car-DZ6BYQDO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~trailing-plant.webp":()=>h(()=>import("./pack~trailing-plant-BJ2rTgvE.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tulip-vase.webp":()=>h(()=>import("./pack~tulip-vase-CmyisqxG.js"),[]).then(e=>e.default),"../../assets/art/living/pack~turtle.webp":()=>h(()=>import("./pack~turtle-FaBzuoqb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tv-stand.webp":()=>h(()=>import("./pack~tv-stand-C8gC4UFW.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wall-clock.webp":()=>h(()=>import("./pack~wall-clock-D7PdTom6.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wall-shelf.webp":()=>h(()=>import("./pack~wall-shelf-C1lRJ7GC.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wavy-floor-lamp.webp":()=>h(()=>import("./pack~wavy-floor-lamp-BL00MuGA.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-arc-floor-lamp.webp":()=>h(()=>import("./pack~wh-arc-floor-lamp-B6QVftZN.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-book-stack.webp":()=>h(()=>import("./pack~wh-book-stack-Dwcz23qo.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-fiddle-leaf-fig.webp":()=>h(()=>import("./pack~wh-fiddle-leaf-fig-COFk3BJw.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-pendant-lamp.webp":()=>h(()=>import("./pack~wh-pendant-lamp-Dd4mFEDS.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-snake-plant.webp":()=>h(()=>import("./pack~wh-snake-plant-D-C6ZJKO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-string-lights.webp":()=>h(()=>import("./pack~wh-string-lights-D0MBhT1M.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-armchair.webp":()=>h(()=>import("./pack~wood-armchair-DHvcj8Mx.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-bookshelf.webp":()=>h(()=>import("./pack~wood-bookshelf-sxaV4CyF.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-coffee-table.webp":()=>h(()=>import("./pack~wood-coffee-table-CrSb-1Xv.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-stool.webp":()=>h(()=>import("./pack~wood-stool-JjUX_8W2.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-bouquet.webp":()=>h(()=>import("./ranch-bouquet-LHbKbTej.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-carrot.webp":()=>h(()=>import("./ranch-carrot-cyry77wX.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-egg.webp":()=>h(()=>import("./ranch-egg-CYsNXUKY.js"),[]).then(e=>e.default),"../../assets/art/living/tree.webp":()=>h(()=>import("./tree-CXYySnAy.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby-bottle.webp":()=>h(()=>import("./baby-bottle-40H4PprS.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby-shelf.webp":()=>h(()=>import("./baby-shelf--dhe-OtF.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby.webp":()=>h(()=>import("./baby-Cjy_lAi1.js"),[]).then(e=>e.default),"../../assets/art/nursery/bassinet.webp":()=>h(()=>import("./bassinet-D1E3rjcm.js"),[]).then(e=>e.default),"../../assets/art/nursery/blocks.webp":()=>h(()=>import("./blocks-CtsB78Ug.js"),[]).then(e=>e.default),"../../assets/art/nursery/bunny-plush.webp":()=>h(()=>import("./bunny-plush-9_hTWSJ0.js"),[]).then(e=>e.default),"../../assets/art/nursery/changing-table.webp":()=>h(()=>import("./changing-table-DKyI_wrV.js"),[]).then(e=>e.default),"../../assets/art/nursery/cloud-rug.webp":()=>h(()=>import("./cloud-rug-BvUUbOnx.js"),[]).then(e=>e.default),"../../assets/art/nursery/crib-mobile.webp":()=>h(()=>import("./crib-mobile-BvlX6u0a.js"),[]).then(e=>e.default),"../../assets/art/nursery/crib.webp":()=>h(()=>import("./crib-Do3izZrw.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-cocoa.webp":()=>h(()=>import("./doll-cocoa-ypqLIm4M.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-honey.webp":()=>h(()=>import("./doll-honey-Dc51Fmwm.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-rose.webp":()=>h(()=>import("./doll-rose-DTSDlFkK.js"),[]).then(e=>e.default),"../../assets/art/nursery/moon-art.webp":()=>h(()=>import("./moon-art-DQbuFa-d.js"),[]).then(e=>e.default),"../../assets/art/nursery/music-box.webp":()=>h(()=>import("./music-box-DKDLmINu.js"),[]).then(e=>e.default),"../../assets/art/nursery/night-light.webp":()=>h(()=>import("./night-light-lryf6NaK.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-curtains.webp":()=>h(()=>import("./nursery-curtains-Ds4ZTC1C.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-dresser.webp":()=>h(()=>import("./nursery-dresser-DbmVYgde.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-lamp.webp":()=>h(()=>import("./nursery-lamp-pqbkf92r.js"),[]).then(e=>e.default),"../../assets/art/nursery/play-mat.webp":()=>h(()=>import("./play-mat-fGBMoW0r.js"),[]).then(e=>e.default),"../../assets/art/nursery/rattle.webp":()=>h(()=>import("./rattle-EzXp43O4.js"),[]).then(e=>e.default),"../../assets/art/nursery/rocker.webp":()=>h(()=>import("./rocker-BieX4wIy.js"),[]).then(e=>e.default),"../../assets/art/nursery/rocking-horse.webp":()=>h(()=>import("./rocking-horse-BK9_A5ep.js"),[]).then(e=>e.default),"../../assets/art/nursery/stacking-rings.webp":()=>h(()=>import("./stacking-rings-8Z2fYLIi.js"),[]).then(e=>e.default),"../../assets/art/nursery/toy-bin.webp":()=>h(()=>import("./toy-bin-CuORRSkX.js"),[]).then(e=>e.default),"../../assets/art/salon/hairdryer.webp":()=>h(()=>import("./hairdryer-BK3-NMh8.js"),[]).then(e=>e.default),"../../assets/art/salon/perfume.webp":()=>h(()=>import("./perfume-CCbV6-cE.js"),[]).then(e=>e.default),"../../assets/art/salon/polish.webp":()=>h(()=>import("./polish-Ch0EUf5y.js"),[]).then(e=>e.default),"../../assets/art/salon/ribbon-tray.webp":()=>h(()=>import("./ribbon-tray-DBUlSLAS.js"),[]).then(e=>e.default),"../../assets/art/salon/stool.webp":()=>h(()=>import("./stool-SBbn3Fq_.js"),[]).then(e=>e.default),"../../assets/art/salon/vanity.webp":()=>h(()=>import("./vanity-COm_EF9W.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~arched-mirror.webp":()=>h(()=>import("./pack~arched-mirror-FzcrWxa4.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~boba-cup.webp":()=>h(()=>import("./pack~boba-cup-DO0lCjCc.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~mini-fridge.webp":()=>h(()=>import("./pack~mini-fridge-DxF_-Si1.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~apple-tree.webp":()=>h(()=>import("./pack~apple-tree-BO7hFW66.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~cozy-mug.webp":()=>h(()=>import("./pack~cozy-mug-CL5TNVre.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~fire-pit.webp":()=>h(()=>import("./pack~fire-pit-CbfQWRzg.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~mini-greenhouse.webp":()=>h(()=>import("./pack~mini-greenhouse-Cgb6BHcc.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~picnic-basket.webp":()=>h(()=>import("./pack~picnic-basket-BZmSi61Z.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~sale-sign.webp":()=>h(()=>import("./pack~sale-sign-CNZEWdis.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~wh-kitchen-counter.webp":()=>h(()=>import("./pack~wh-kitchen-counter-BK3WsTw8.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~wh-teapot.webp":()=>h(()=>import("./pack~wh-teapot-C2xpf3Kz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-bauble-garland.webp":()=>h(()=>import("./pack~wc-bauble-garland-Bsv6snBW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-berry-wreath.webp":()=>h(()=>import("./pack~wc-berry-wreath-DwqWJGm0.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-birch-basket.webp":()=>h(()=>import("./pack~wc-birch-basket-Ck1MjTPW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cabin-picture.webp":()=>h(()=>import("./pack~wc-cabin-picture-Bo_qKFlZ.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-candle-trio.webp":()=>h(()=>import("./pack~wc-candle-trio-33RcvYK5.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cane-lamp.webp":()=>h(()=>import("./pack~wc-cane-lamp-BD2V2gLm.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cinnamon-tray.webp":()=>h(()=>import("./pack~wc-cinnamon-tray-Cy2cPyEY.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-cart.webp":()=>h(()=>import("./pack~wc-cocoa-cart-BwlPCBQR.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-mug.webp":()=>h(()=>import("./pack~wc-cocoa-mug-Cpad5gyz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-pot.webp":()=>h(()=>import("./pack~wc-cocoa-pot-CqjSzuIA.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cookie-oven.webp":()=>h(()=>import("./pack~wc-cookie-oven-AeTBKAqH.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cookie-plate.webp":()=>h(()=>import("./pack~wc-cookie-plate-Db4_27lp.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-frost-bookcase.webp":()=>h(()=>import("./pack~wc-frost-bookcase-ChH_Zc5-.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-frosted-pine.webp":()=>h(()=>import("./pack~wc-frosted-pine-BaL421Eq.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-fur-bench.webp":()=>h(()=>import("./pack~wc-fur-bench-BHy7RvLc.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-gingerbread-village.webp":()=>h(()=>import("./pack~wc-gingerbread-village-CXGNXY4G.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-gingerbread.webp":()=>h(()=>import("./pack~wc-gingerbread-BH26TMqz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-globe-lamp.webp":()=>h(()=>import("./pack~wc-globe-lamp-FQWUqV9q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-holiday-tree.webp":()=>h(()=>import("./pack~wc-holiday-tree-Dc9RLa8q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-holly.webp":()=>h(()=>import("./pack~wc-holly-Ddsa-Msy.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-ice-skates.webp":()=>h(()=>import("./pack~wc-ice-skates-CerfMu-3.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-ice-wardrobe.webp":()=>h(()=>import("./pack~wc-ice-wardrobe-Dk8v_MKI.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-knit-armchair.webp":()=>h(()=>import("./pack~wc-knit-armchair-p4nAzHXW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-lantern.webp":()=>h(()=>import("./pack~wc-lantern-rRWK8g8l.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-log-bench.webp":()=>h(()=>import("./pack~wc-log-bench-Djm76jnh.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-marshmallow-jar.webp":()=>h(()=>import("./pack~wc-marshmallow-jar-BiG_u42k.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mitten-line.webp":()=>h(()=>import("./pack~wc-mitten-line-BbhTynIV.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mitten-ottoman.webp":()=>h(()=>import("./pack~wc-mitten-ottoman-q05Rsc6B.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mug-shelf.webp":()=>h(()=>import("./pack~wc-mug-shelf-CeUbCPsi.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-nutcracker.webp":()=>h(()=>import("./pack~wc-nutcracker-DlEeuUgj.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-penguin-chair.webp":()=>h(()=>import("./pack~wc-penguin-chair-ARRfWJYR.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-penguin-plush.webp":()=>h(()=>import("./pack~wc-penguin-plush-w9LiHlOM.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-peppermint-counter.webp":()=>h(()=>import("./pack~wc-peppermint-counter-Cq5SRRi_.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-peppermint-rug.webp":()=>h(()=>import("./pack~wc-peppermint-rug-DjPM1BL2.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pinecone-garland.webp":()=>h(()=>import("./pack~wc-pinecone-garland-DV4Ijs5E.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pinecone-table.webp":()=>h(()=>import("./pack~wc-pinecone-table-CzULQj_N.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-plaid-bed.webp":()=>h(()=>import("./pack~wc-plaid-bed-ZVDIbe1Y.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-plaid-sofa.webp":()=>h(()=>import("./pack~wc-plaid-sofa-BaoM0h7H.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-poinsettia.webp":()=>h(()=>import("./pack~wc-poinsettia-DNdNw7QZ.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-polar-plush.webp":()=>h(()=>import("./pack~wc-polar-plush-Cz2NxU-X.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pom-rug.webp":()=>h(()=>import("./pack~wc-pom-rug-Zyeq7bwG.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-present-stack.webp":()=>h(()=>import("./pack~wc-present-stack-B09Rx_MO.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-reindeer.webp":()=>h(()=>import("./pack~wc-reindeer-DTWaMJXV.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sled-table.webp":()=>h(()=>import("./pack~wc-sled-table-BNH48Wur.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sleigh-planter.webp":()=>h(()=>import("./pack~wc-sleigh-planter-B3DNwK0i.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-globe.webp":()=>h(()=>import("./pack~wc-snow-globe-C9bft1_W.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-mobile.webp":()=>h(()=>import("./pack~wc-snow-mobile-JM0Q-i3v.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-nightstand.webp":()=>h(()=>import("./pack~wc-snow-nightstand-Bqay9NoW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-window.webp":()=>h(()=>import("./pack~wc-snow-window-DCwNoisx.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snowman.webp":()=>h(()=>import("./pack~wc-snowman-Z8FnDuXK.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snowshoes.webp":()=>h(()=>import("./pack~wc-snowshoes-Bux5zjz7.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sock-hamper.webp":()=>h(()=>import("./pack~wc-sock-hamper-IDMi8Oc3.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-star-topper.webp":()=>h(()=>import("./pack~wc-star-topper-CxhOrJOb.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-stocking-row.webp":()=>h(()=>import("./pack~wc-stocking-row-DRCxX9NW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-stone-hearth.webp":()=>h(()=>import("./pack~wc-stone-hearth-BIaBCxMx.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-twinkle-lamp.webp":()=>h(()=>import("./pack~wc-twinkle-lamp-3aXfb0Du.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-twinkle-string.webp":()=>h(()=>import("./pack~wc-twinkle-string-D1fw8i7q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-window-seat.webp":()=>h(()=>import("./pack~wc-window-seat-bNQT817S.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-woodstove.webp":()=>h(()=>import("./pack~wc-woodstove-BcUTK7y-.js"),[]).then(e=>e.default)});function md(e){const t=e.split("/").pop()||"";if(t.length<6||t.slice(-5).toLowerCase()!==".webp")return null;const n=decodeURIComponent(t.slice(0,-5)).replace(/~/g,":");return!n||n.startsWith("_")?null:n}const Jh=new Set;for(const e in tr){const t=md(e);t&&Jh.add(t)}function fy(e){return Jh.has(e)}const _l=new Map;function py(e){for(const t in tr)if(md(t)===e)return tr[t]}function hy(e){const t=_l.get(e);if(t)return t;const n=py(e);if(!n)return Promise.resolve(null);const s=n().then(o=>(ly(e,o),e)).catch(()=>(_l.delete(e),null));return _l.set(e,s),s}function Zr(e){const t=[...new Set(e)];return Promise.all(t.map(hy)).then(n=>n.filter(s=>s!==null))}function gy(){const e=[];for(const t in tr){const n=md(t);n&&e.push(n)}return Zr(e)}function uy(e,t=[]){return dy(e)?Zr(t):Promise.resolve([])}const yd=Object.freeze(Object.defineProperty({__proto__:null,boot:uy,hasArt:fy,loadAllArt:gy,loadArtKinds:Zr},Symbol.toStringTag,{value:"Module"})),$e="#5a3d5c",qe=`stroke="${$e}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,aa=[{body:"#ffd6e0",roof:"#ff7aa8",door:"#8fd3ff",trim:"#fff6e6"},{body:"#d9f2ff",roof:"#5aa9e6",door:"#ffd166",trim:"#ffffff"},{body:"#e3f9d9",roof:"#5cc985",door:"#ff9f68",trim:"#fffbe6"},{body:"#fff1b8",roof:"#ff9f43",door:"#c9a0dc",trim:"#ffffff"},{body:"#eadcff",roof:"#9b7bd8",door:"#80ed99",trim:"#fff6fb"},{body:"#ffe0c7",roof:"#e07a5f",door:"#5fb0d8",trim:"#fffaf0"},{body:"#d8f5ef",roof:"#2fb3a3",door:"#ff8fab",trim:"#ffffff"},{body:"#fde2f3",roof:"#e879c6",door:"#ffd166",trim:"#fff"}];function nr(e,t={}){const n=aa[(e%aa.length+aa.length)%aa.length],s=e%2===1,o=t.lit?"#fff3b0":"#cfe8ff",i=s?`<path d="M22 138 Q22 36 160 30 Q298 36 298 138 Z" fill="${n.roof}" ${qe}/><path d="M60 110 Q70 60 120 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`:`<path d="M14 140 L160 26 L306 140 Z" fill="${n.roof}" ${qe}/><path d="M70 110 L140 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`;return`<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="294" rx="150" ry="8" fill="#000" opacity=".12"/>
  <rect x="${s?232:220}" y="${s?36:44}" width="30" height="56" rx="6" fill="${n.trim}" ${qe}/>
  <rect x="44" y="124" width="232" height="168" rx="20" fill="${n.body}" ${qe}/>
  ${i}
  <g class="houseWin" fill="${o}"><circle cx="160" cy="${s?92:98}" r="18" ${qe}/><rect x="62" y="160" width="62" height="58" rx="18" ${qe}/><rect x="196" y="160" width="62" height="58" rx="18" ${qe}/></g>
  <path d="M160 ${s?74:80} V${s?110:116} M142 ${s?92:98} H178" ${qe}/>
  <path d="M93 160 V218 M62 189 H124" ${qe}/><path d="M227 160 V218 M196 189 H258" ${qe}/>
  <rect x="56" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${qe}/><rect x="190" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${qe}/>
  <circle cx="72" cy="212" r="7" fill="#ff8fab" ${qe}/><circle cx="92" cy="208" r="7" fill="#ffd166" ${qe}/><circle cx="112" cy="212" r="7" fill="#ff8fab" ${qe}/>
  <circle cx="208" cy="212" r="7" fill="#c9a0dc" ${qe}/><circle cx="228" cy="208" r="7" fill="#80ed99" ${qe}/><circle cx="248" cy="212" r="7" fill="#c9a0dc" ${qe}/>
  <path d="M132 292 V226 Q132 196 160 196 Q188 196 188 226 V292 Z" fill="${n.door}" ${qe}/>
  <circle cx="176" cy="250" r="5" fill="${$e}"/><path d="M146 222 Q160 212 174 222" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>
  <rect x="118" y="286" width="84" height="10" rx="5" fill="${n.trim}" ${qe}/>
</svg>`}const Tt={street:`<svg viewBox="0 0 48 48"><circle cx="16" cy="15" r="7" fill="#ffd166" stroke="${$e}" stroke-width="3"/><circle cx="32" cy="15" r="7" fill="#ff8fab" stroke="${$e}" stroke-width="3"/><circle cx="13.5" cy="14.5" r="1.2" fill="${$e}"/><circle cx="18.5" cy="14.5" r="1.2" fill="${$e}"/><circle cx="29.5" cy="14.5" r="1.2" fill="${$e}"/><circle cx="34.5" cy="14.5" r="1.2" fill="${$e}"/><path d="M13 18 q3 2.2 6 0 M29 18 q3 2.2 6 0" fill="none" stroke="${$e}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 40 Q16 28 24 33 Q32 38 40 28" fill="none" stroke="#5cc985" stroke-width="4" stroke-linecap="round"/><circle cx="16" cy="36" r="2.2" fill="#fff" stroke="${$e}" stroke-width="1.5"/><circle cx="32" cy="32" r="2.2" fill="#fff" stroke="${$e}" stroke-width="1.5"/></svg>`,home:`<svg viewBox="0 0 48 48"><path d="M8 22 L24 8 L40 22 V40 H8 Z" fill="#ffd166" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 V28 H28 V40" fill="#fff" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="20" r="2.4" fill="${$e}"/></svg>`,lockOn:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q33 7 33 16 V22" fill="none" stroke="${$e}" stroke-width="4"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#ffd166" stroke="${$e}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${$e}"/></svg>`,lockOff:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q31 7 32.5 13" fill="none" stroke="${$e}" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#b6f0a8" stroke="${$e}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${$e}"/></svg>`,chat:`<svg viewBox="0 0 48 48"><path d="M8 12 Q8 6 14 6 H34 Q40 6 40 12 V26 Q40 32 34 32 H22 L13 40 V32 Q8 32 8 26 Z" fill="#fff3b0" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><circle cx="17" cy="19" r="2.5" fill="${$e}"/><circle cx="24" cy="19" r="2.5" fill="${$e}"/><circle cx="31" cy="19" r="2.5" fill="${$e}"/></svg>`,shield:`<svg viewBox="0 0 48 48"><path d="M24 5 L39 11 V23 Q39 36 24 43 Q9 36 9 23 V11 Z" fill="#c9a0dc" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><path d="M17 24 L22 29 L31 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,solo:`<svg viewBox="0 0 48 48"><path d="M8 24 L24 9 L40 24 V41 H8 Z" fill="#ffd166" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="28" width="10" height="13" rx="4" fill="#fff" stroke="${$e}" stroke-width="2.5"/><path d="M33 7 l2 4 4 .5 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.5z" fill="#ff8fab" stroke="${$e}" stroke-width="1.5"/></svg>`};function F(e,t=2600){const n=document.createElement("div");n.className="toast",n.textContent=e,(document.getElementById("toastLane")??document.body).appendChild(n),setTimeout(()=>n.classList.add("out"),t),setTimeout(()=>n.remove(),t+400)}function eg(){return new Promise(e=>{let t=0,n=0,s="",o=0;const i=document.createElement("div");i.className="sheet adult",i.innerHTML='<div class="card adultCard"></div>',document.body.appendChild(i);const a=i.firstElementChild,r=()=>{t=6+Math.floor(Math.random()*4),n=3+Math.floor(Math.random()*7),s="",l()},l=()=>{a.innerHTML=`<button class="close" data-k="x">✕</button><h2>Grown-ups only</h2><p class="q" data-q="${t*n}">What is ${t} × ${n}?</p>
        <div class="ans">${s||"&nbsp;"}</div>
        <div class="pad">${[1,2,3,4,5,6,7,8,9,"⌫",0,"OK"].map(d=>`<button data-k="${d}">${d}</button>`).join("")}</div>`},c=d=>{i.remove(),e(d)};a.addEventListener("click",d=>{const f=d.target.closest("[data-k]")?.dataset.k;if(f){if(f==="x")return c(!1);if(f==="⌫")s=s.slice(0,-1);else if(f==="OK"){if(+s===t*n)return c(!0);if(++o>=3)return c(!1);a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400),r();return}else s.length<3&&(s+=f);l()}}),i.addEventListener("click",d=>{d.target===i&&c(!1)}),r()})}let vn=null,bd=!0;const my=e=>{bd=e};function he(e,t,n="sine",s=0,o=.15){if(bd)try{vn??=new(window.AudioContext||window.webkitAudioContext),vn.state==="suspended"&&vn.resume().catch(()=>{});const i=vn.createOscillator(),a=vn.createGain(),r=vn.currentTime,l=Math.max(40,e*(.94+Math.random()*.12));i.type=n,i.frequency.setValueAtTime(l,r),s&&i.frequency.exponentialRampToValueAtTime(Math.max(40,l*s),r+t);const c=Math.min(.02,Math.max(.008,t*.22));if(a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(Math.max(2e-4,o),r+c),a.gain.exponentialRampToValueAtTime(.001,r+Math.max(t,c+.02)),n==="square"||n==="sawtooth"){const d=vn.createBiquadFilter();d.type="lowpass",d.frequency.setValueAtTime(1400,r),d.Q.setValueAtTime(.7,r),i.connect(d).connect(a).connect(vn.destination)}else i.connect(a).connect(vn.destination);i.start(r),i.stop(r+t+.02)}catch{}}const P={pick:()=>he(520,.12,"sine",1.6),drop:()=>{he(380,.1,"triangle",.7),setTimeout(()=>he(620,.08,"sine"),60)},pop:()=>he(800,.15,"square",.3,.08),click:()=>he(660,.07,"triangle"),swish:()=>he(300,.25,"sine",2.5,.1),meow:()=>{he(700,.12,"triangle",1.3,.1),setTimeout(()=>he(900,.22,"triangle",.6,.1),110)},purr:()=>[0,90,180,270,360].forEach(e=>setTimeout(()=>he(70,.09,"sawtooth",1,.05),e)),woof:()=>{he(260,.09,"square",.6,.09),setTimeout(()=>he(220,.12,"square",.5,.09),130)},spin:()=>he(400,.35,"sine",2.2,.08),boing:()=>he(200,.3,"sine",3,.1),splash:()=>[0,50,110].forEach((e,t)=>setTimeout(()=>he(900-t*200,.12,"triangle",.4,.06),e)),moo:()=>{he(160,.5,"sawtooth",.8,.07),setTimeout(()=>he(140,.45,"sawtooth",.85,.06),380)},baa:()=>[0,90,180].forEach(e=>setTimeout(()=>he(420,.1,"sawtooth",.95,.05),e)),bleat:()=>[0,70,140,210].forEach(e=>setTimeout(()=>he(520,.07,"square",1.05,.04),e)),oink:()=>{he(300,.12,"square",.6,.07),setTimeout(()=>he(330,.12,"square",.55,.07),160)},peep:()=>[0,120,240].forEach((e,t)=>setTimeout(()=>he(1800+t*150,.07,"sine",1.2,.08),e)),squeak:()=>he(1400,.1,"sine",1.5,.08),neigh:()=>{he(700,.5,"sawtooth",.6,.05),[0,60,120,180,240].forEach(e=>setTimeout(()=>he(620-e,.06,"triangle",1,.04),300+e))},honk:()=>{he(330,.18,"square",1,.07),setTimeout(()=>he(330,.25,"square",1,.07),230)},munch:()=>[0,110,220,330].forEach(e=>setTimeout(()=>he(180+Math.random()*60,.05,"square",.6,.05),e)),cluck:()=>[0,100,180].forEach((e,t)=>setTimeout(()=>he(600+t*80,.06,"square",.8,.05),e)),plant:()=>{he(260,.1,"triangle",.6),setTimeout(()=>he(520,.1,"sine"),90)},water:()=>[0,60,120,180,240].forEach((e,t)=>setTimeout(()=>he(1200-t*120,.08,"sine",.7,.05),e)),pickup:()=>[660,880,990].forEach((e,t)=>setTimeout(()=>he(e,.1,"triangle"),t*60)),sparkle:()=>[880,1100,1320].forEach((e,t)=>setTimeout(()=>he(e,.12),t*70))},Gf=new Map;function yy(e,t){const n=(e?"s":"o")+(t?"f":"n"),s=Gf.get(n);if(s)return s;const a=`<svg viewBox="0 0 200 260" aria-hidden="true">
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
  </svg>`;return Gf.set(n,a),a}const hi="#5a3d5c";function Nr(e){return e&&/^#[0-9a-fA-F]{6}$/.test(e)?e.toLowerCase():"#f1c27d"}const ra={x:60,y:118,w:56,h:40};function by(e,t,n){return n==="lie"&&e==="over"?null:t&&n==="lie"?{d:"M72 172 C36 200 40 228 88 220",sleeve:"M72 172 C52 186 44 196 42 204",hx:88,hy:220}:t&&n==="sit"?e==="under"?{d:"M72 172 C40 190 46 220 108 228",sleeve:"M72 172 C56 178 46 184 42 188",hx:108,hy:228}:{d:"M128 172 C154 192 150 214 118 208",sleeve:"M128 172 C142 180 148 186 150 190",hx:118,hy:208}:t?e==="under"?{d:"M72 172 C40 196 48 222 112 214",sleeve:"M72 172 C56 178 46 184 42 188",hx:112,hy:214}:{d:"M128 172 C158 180 154 200 124 196",sleeve:"M128 172 C144 178 150 184 154 188",hx:124,hy:196}:n==="lie"?{d:"M22 84 C10 112 14 136 46 130",sleeve:"",hx:46,hy:130}:e==="under"?{d:"M22 84 C14 104 12 128 44 130",sleeve:"",hx:44,hy:130}:{d:"M78 84 C90 98 86 118 64 114",sleeve:"",hx:64,hy:114}}function ky(e,t,n){const s=`M${e-8} ${t-1} Q${e-9} ${t-11} ${e} ${t-11} Q${e+9} ${t-11} ${e+9} ${t} Q${e+9} ${t+9} ${e} ${t+10} Q${e-9} ${t+9} ${e-8} ${t-1} Z`,o=`<ellipse cx="${e+8}" cy="${t-2}" rx="3.2" ry="5" fill="${n}" stroke="${hi}" stroke-width="3.4" transform="rotate(-24 ${e+8} ${t-2})"/>`;return`<path class="cradle-hand" data-cx="${e}" data-cy="${t}" d="${s}" fill="${n}" stroke="${hi}" stroke-width="3.9"/>${o}`}function Ni(e,t,n,s,o){const i=by(e,t,s);if(!i)return"";const a=Nr(n),r=o&&/^#[0-9a-fA-F]{6}$/.test(o)?o.toLowerCase():"",l='fill="none" stroke-linecap="round" stroke-linejoin="round"',c=t?16:12,d=t?20.2:15.5;let f=`<path d="${i.d}" ${l} stroke="${hi}" stroke-width="${d}"/><path d="${i.d}" ${l} stroke="${a}" stroke-width="${c}"/>`;t&&i.sleeve&&r&&(f+=`<path d="${i.sleeve}" ${l} stroke="${hi}" stroke-width="29"/><path d="${i.sleeve}" ${l} stroke="${r}" stroke-width="22"/>`);const p=t?ky(i.hx,i.hy,a):`<circle class="cradle-hand" data-cx="${i.hx}" data-cy="${i.hy}" cx="${i.hx}" cy="${i.hy}" r="7" fill="${a}" stroke="${hi}" stroke-width="3.5"/>`;return`<g class="arm cradle">${f}${p}</g>`}const la=110,Zo=148,Yf=80,Kf=57,wy=60,vy=133,_y=42,$y=30,xy=60,My=129,ca=["feed","burp","change","rock"],$l=["Bean","Pip","Mochi","Bunny","Dot","Sunny"];function Ly(e){let t=null,n=null,s=null,o=!1,i=Number.NaN,a=0,r=0,l=!1,c=!1;const d=typeof navigator<"u"&&!!navigator.webdriver;function f(A,H,Y,Q,z){A.style.left=(H-Q/2)/$t*100+"%",A.style.top=(Y-z)/Pn*100+"%",A.style.width=Q/$t*100+"%",A.style.height=z/Pn*100+"%"}function p(A){const H=A.scale&&A.scale>0?A.scale:1,Y=A.pose==="sit"||A.pose==="lie"?A.pose:null,Q=A.chibi&&A.pose!=="sit"&&A.pose!=="lie",z=Q?ra.x:A.chibi?xy:wy,K=Q?ra.y:A.chibi?My:vy,pe=Q?ra.w:A.chibi?_y:Yf,Le=Q?ra.h:A.chibi?$y:Kf,ye=zm(z,K,Y,!!A.lieFlip,H),Ve=Y==="lie"?ye.x:A.flip?-ye.x:ye.x,O=pe*H,W=Le*H;return{x:A.x+Ve,y:A.y+ye.y+W/2,w:O,h:W}}function g(A,H){let Y=null,Q=0;for(let z=0;z<ca.length;z++){const K=ca[z],pe=A.at?.[K]??0;pe>0&&H-pe>=0&&H-pe<1100&&pe>=Q&&(Y=K,Q=pe)}return Y}function b(A){if(A.mood<=2||!e.canSend()){window.clearTimeout(a),i=Number.NaN;return}if(i===A.since)return;window.clearTimeout(a),i=A.since;const H=Math.max(0,A.since+sc-e.clock());a=window.setTimeout(()=>{i=Number.NaN;const Y=e.get().baby;!Y||Y.mood<=2||!e.canSend()||e.dispatch({type:"baby/ease",now:e.clock()})},H)}function m(A,H){window.clearTimeout(r);let Y=0;for(let Q=0;Q<ca.length;Q++){const z=A.at?.[ca[Q]]??0;H-z>=0&&H-z<1100&&z>Y&&(Y=z)}Y&&(r=window.setTimeout(()=>Ne(),Math.max(0,1100-(H-Y))))}function v(A,H){if(typeof document.elementsFromPoint!="function")return null;const Y=document.elementsFromPoint(A,H),Q=e.get(),z=Q.rooms[Q.currentRoom]?.items??[];for(let K=0;K<Y.length;K++){const pe=Y[K];if(!pe||typeof pe.closest!="function"||pe.closest(".baby, .babyCare, .babyMeet"))continue;const Le=pe.closest(".item");if(!Le)continue;const ye=Le.dataset.id||"";for(let Ve=0;Ve<z.length;Ve++){const O=z[Ve];if(O.id===ye&&(Qs(O.kind)||e.box(O)))return O}}return null}function y(A){A.addEventListener("pointerdown",H=>{if(H.button!==0)return;const Y=e.get().baby;if(!Y)return;if(H.preventDefault(),H.stopPropagation(),Y.spot==="arms"&&Y.holder&&Y.holder!==e.holderId()&&e.holderHere(Y.holder)){F("Someone is cuddling!");return}if(!e.editable()){e.locked();return}if(!e.canSend())return;const Q=e.owner(),z=Q,K=H.clientX,pe=H.clientY,Le=H.pointerId;let ye=!1;const Ve=W=>{if(W.pointerId!==Le||(Math.hypot(W.clientX-K,W.clientY-pe)>6&&(ye=!0),!z||!ye))return;o=!0;const Xe=e.toRoom(W.clientX,W.clientY);f(A,Xe.x,Xe.y,la,Zo)},O=W=>{if(W.pointerId!==Le)return;window.removeEventListener("pointermove",Ve),window.removeEventListener("pointerup",O),window.removeEventListener("pointercancel",O);const Xe=o&&ye&&z;if(o=!1,W.type==="pointercancel"){Ne();return}if(Xe){const gt=document.elementFromPoint(W.clientX,W.clientY)?.closest(".tab[data-room]");if(gt&&gt.dataset.room){const Vo=gt.dataset.room,C0=e.toRoom(W.clientX,W.clientY),bf=m1(C0.x,$t);Vo!==e.get().currentRoom&&e.dispatch({type:"room/switch",room:Vo}),e.dispatch({type:"baby/place",room:Vo,x:bf.x,y:bf.y,spot:"mat",bed:null,seat:null,now:e.clock()}),P.drop();return}const bs=e.toRoom(W.clientX,W.clientY),rn=v(W.clientX,W.clientY),hl=rn?e.box(rn):null,ks=u1({mode:e.play()?"play":"decorate",releaseX:Math.max(0,Math.min($t,bs.x)),releaseY:Math.max(0,Math.min(Pn,bs.y)),piece:hl,occupied:e.occupied()});e.dispatch({type:"baby/place",room:e.get().currentRoom,x:ks.x,y:ks.y,spot:ks.spot,bed:ks.bed,seat:ks.seat,now:e.clock()}),P.drop();return}if(ye){Ne();return}const lt=e.get().baby;if(!lt)return;if(lt.spot==="arms"&&lt.holder===e.holderId()){const gt=e.toRoom(W.clientX,W.clientY);e.dispatch({type:"baby/hold",holder:null,room:e.get().currentRoom,x:Math.max(0,Math.min($t,gt.x)),y:Math.max(40,Math.min(Pn,gt.y)),now:e.clock()}),P.drop();return}const Qe=e.holderSpot(),De=Qe?p(Qe):null,Ee=De?De.x:lt.x,ht=De?Math.max(40,De.y):lt.y;e.dispatch({type:"baby/hold",holder:e.holderId(),room:e.get().currentRoom,x:Ee,y:ht,now:e.clock()}),P.pick()};window.addEventListener("pointermove",Ve),window.addEventListener("pointerup",O),window.addEventListener("pointercancel",O)})}function u(){return t&&t.isConnected||(t=document.createElement("div"),t.className="baby",t.dataset.baby="1",t.innerHTML='<div class="hit"></div><div class="babySpin"><div class="babyRock"><div class="babyInner"></div></div></div><div class="babyZzz" hidden>z z z</div><div class="babyBurp" hidden><i></i></div>',e.layer.appendChild(t),y(t)),t}function w(A,H){const Y=A.querySelector(".babyWord");Y&&(Y.textContent=i1(H));const Q=A.querySelectorAll(".babyBlossom"),z=a1(H);for(let pe=0;pe<Q.length;pe++)Q[pe].classList.toggle("on",pe<z);const K=A.querySelector(".babyMeter");K&&(K.dataset.mood=String(H))}function _(A){const H=Fh(A);if(!H){F("Try another name!");return}const Y=e.get().baby;!Y||Y.name===H||(e.dispatch({type:"baby/name",name:H}),P.click())}function S(A){n=document.createElement("div"),n.className="babyCare",n.dataset.babyCare="1";const H=[];for(let z=0;z<5;z++)H.push('<i class="babyBlossom"></i>');const Y=[];for(let z=0;z<$l.length;z++)Y.push(`<button type="button" data-preset="${$l[z]}">${$l[z]}</button>`);n.innerHTML=`<p class="babyWord"></p><span class="babyMeter"><span class="babyBlossoms">${H.join("")}</span></span>
      <button type="button" data-care="feed">Bottle</button>
      <button type="button" data-care="burp">Burp</button>
      <button type="button" data-care="change">Diaper</button>
      <button type="button" data-care="rock">Rock</button>
      <button type="button" data-baby-name-open>Name</button>
      <div class="babyNames" hidden>
        <input type="text" maxlength="14" autocomplete="off" enterkeyhint="done" aria-label="Baby name" value="">
        ${Y.join("")}
      </div>`,w(n,A.mood),n.addEventListener("pointerdown",z=>z.stopPropagation()),n.addEventListener("click",z=>{const K=z.target,pe=K.closest("[data-care]");if(pe&&pe.dataset.care){if(!e.editable()){e.locked();return}if(!e.canSend())return;const ye=pe.dataset.care;e.dispatch({type:"baby/care",care:ye,now:e.clock()}),ye==="rock"?P.purr():ye==="feed"?P.sparkle():P.click();return}if(K.closest("[data-baby-name-open]")){if(!e.owner())return;c=!c;const ye=n?.querySelector(".babyNames");ye&&(ye.hidden=!c);const Ve=n?.querySelector("input");c&&Ve&&(Ve.value=e.get().baby?.name??"",Ve.focus());return}const Le=K.closest("[data-preset]");if(Le&&e.owner()){_(Le.dataset.preset||"");return}}),n.querySelector("input")?.addEventListener("keydown",z=>{z.key==="Enter"&&(z.preventDefault(),_(z.target.value))}),e.stageWrap.appendChild(n)}function R(A,H){if(!e.play()){D();return}const Y=n&&document.activeElement&&n.contains(document.activeElement);if((!n||!n.isConnected)&&S(A),!n)return;n.hidden=!1,w(n,A.mood);const Q=n.querySelector("[data-baby-name-open]");Q&&(Q.hidden=!H);const z=n.querySelector(".babyNames");z&&(z.hidden=!H||!c);const K=n.querySelector("input");K&&!Y&&(K.value=A.name),U()}function D(){c=!1,n&&(n.remove(),n=null),U()}function U(){const A=!!(n&&n.isConnected&&!n.hidden),H=document.body.classList.contains("baby-card");document.body.classList.toggle("baby-card",A),H!==A&&window.dispatchEvent(new Event("resize"))}function Z(A){if(!A||d){s&&(s.remove(),s=null);return}if(s&&s.isConnected){s.hidden=!1;return}s=document.createElement("button"),s.type="button",s.className="babyMeet",s.textContent="Meet the baby",s.addEventListener("pointerdown",H=>H.stopPropagation()),s.addEventListener("click",()=>{if(!e.editable()){e.locked();return}!e.canSend()||e.get().baby||(e.dispatch({type:"baby/meet",now:e.clock()}),P.sparkle())}),e.stageWrap.appendChild(s)}function ne(){const A=e.get().rooms.nursery?.items??[];for(let H=0;H<A.length;H++)if(Qs(A[H].kind)==="crib")return!0;return!1}function G(A,H){A.classList.remove("baby-lie","baby-lie-r","baby-cradle","cradle-lie","flipped");const Y=e.get().currentRoom;if((H.spot==="crib"||H.spot==="bassinet")&&H.bed){const Q=e.get().rooms[H.room]?.items.find(K=>K.id===H.bed)??null,z=Q?e.box(Q):null;if(Q&&z){const K=Rh(Q.kind,z);f(A,K.x,K.y+Zo/2,la,Zo),A.style.zIndex=String(1e3+Q.z+1),A.classList.add("baby-lie"),Q.flip&&A.classList.add("baby-lie-r");return}}if(H.spot==="arms"){const Q=H.holder?e.holderSpot(H.holder):null,z=Q?p(Q):null,K=z?z.x:H.x,pe=z?z.y:H.y,Le=z?z.w:Yf,ye=z?z.h:Kf;f(A,K,pe,Le,ye),A.style.zIndex=String(5e3+Math.round(Q?Q.y:H.y)+2),A.classList.add("baby-cradle"),A.style.setProperty("--spin-w",(ye/Le*100).toFixed(4)+"%"),A.style.setProperty("--spin-h",(Le/ye*100).toFixed(4)+"%"),Q&&Q.pose==="lie"&&A.classList.add("cradle-lie"),Q&&(Q.pose==="lie"?Q.lieFlip:Q.flip)&&A.classList.add("flipped");return}if(H.spot==="mat"&&H.seat){const Q=e.seatAt(Y,H.seat,H);f(A,Q.x,Q.y,la,Zo);const z=e.get().rooms[Y]?.items.find(K=>K.id===H.seat?.item);A.style.zIndex=String(1e3+(z?.z??0)+1),H.seat.pose==="lie"&&(A.classList.add("baby-lie"),z?.flip&&A.classList.add("baby-lie-r"));return}f(A,H.x,H.y,la,Zo),A.style.zIndex=String(5e3+Math.round(H.y))}function ee(A){if(A.spot!=="arms"||!A.holder)return!1;const H=e.get().characters.find(Y=>Y.id===A.holder);return!!H&&H.room!==A.room}function an(A){o||!ee(A)||!e.canSend()||!e.editable()||e.dispatch({type:"baby/hold",holder:null,room:A.room,x:A.x,y:zi,now:e.clock()})}function Ut(A){if(o||ee(A)||A.spot!=="arms"||A.holder!==e.holderId()||!e.canSend()||!e.editable())return;const H=e.holderSpot();if(!H)return;const Y=e.get().currentRoom;if(A.room===Y)return;const Q=p(H);e.dispatch({type:"baby/hold",holder:A.holder,room:Y,x:Q.x,y:Math.max(40,Q.y),now:e.clock()})}function Ne(){const A=e.get(),H=A.baby,Y=!!H&&H.spot==="arms"&&!!H.holder&&!!e.holderSpot(H.holder),Q=!!H&&H.spot==="arms"&&H.holder===e.holderId()&&!!e.holderSpot(),z=!!(H&&e.inHouse()&&(H.room===A.currentRoom||Y||Q));if(!H||!z){t&&(t.remove(),t=null),o=!1,D(),window.clearTimeout(a),i=Number.NaN;const Ee=!d&&!H&&e.inHouse()&&e.owner()&&e.editable()&&e.canSend()&&A.currentRoom==="nursery"&&ne();Z(Ee);return}Z(!1),Eo()&&!Ns("baby")&&!l&&(l=!0,Zr(["baby"]).then(()=>Ne()));const K=u(),pe=e.clock(),Le=g(H,pe),ye=Le==="rock",Ve=Le==="change",O=!ye&&!Ve&&Eo()?Ns("baby"):"",W=K.querySelector(".babyInner"),Xe=(O||"svg")+(ye?"s":"")+(Ve?"f":"");W&&K.dataset.look!==Xe&&(W.innerHTML=O?`<img class="artimg" alt="" draggable="false" src="${O}">`:yy(ye,Ve),K.dataset.look=Xe),K.dataset.babySpot=H.spot,K.dataset.babyMood=String(H.mood),K.dataset.babyName=H.name,K.classList.toggle("is-feed",Le==="feed"),K.classList.toggle("is-burp",Le==="burp"),K.classList.toggle("is-change",Le==="change"),K.classList.toggle("is-rock",Le==="rock");const lt=K.querySelector(".babyZzz"),Qe=K.querySelector(".babyBurp"),De=(H.spot==="crib"||H.spot==="bassinet")&&!Le;lt&&(lt.hidden=!De),Qe&&(Qe.hidden=Le!=="burp"),o&&K.isConnected||G(K,H),R(H,e.owner()),b(H),m(H,pe),an(H),Ut(H)}return{render:Ne}}const Ey={hip:0,head:3,armL:26,armR:-22,legL:-76,legR:76,legLLift:8,legRLift:8},Cy={hip:0,head:-8,armL:18,armR:-12,legL:-4,legR:6,legLLift:0,legRLift:0};function Fr(e){return e==="sit"?Ey:e==="lie"?Cy:null}const Fe="#5a3d5c",ie=(e=4)=>`stroke="${Fe}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,kd=600,Kt=250,$s=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})">
  <rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${ie()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${ie()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${ie()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${ie()}/>
  <circle cx="-18" cy="-78" r="9" fill="#fff" opacity=".35"/></g>`,Sy=(e,t,n)=>`<g transform="translate(${e} ${t})"><path d="M0 0 V-16" ${ie(3)}/>${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*6}" cy="${-20+Math.sin(s*Math.PI/180)*6}" r="5" fill="${n}" ${ie(2)}/>`).join("")}<circle cx="0" cy="-20" r="4" fill="#ffd166" ${ie(2)}/></g>`,Xf=e=>`<g transform="translate(${e} 0)">
  <rect x="-80" y="452" width="160" height="12" rx="6" fill="#ff9f68" ${ie()}/><rect x="-80" y="470" width="160" height="12" rx="6" fill="#ff9f68" ${ie()}/>
  <rect x="-70" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${ie(3)}/><rect x="60" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${ie(3)}/>
  <rect x="-86" y="490" width="172" height="14" rx="7" fill="#ffb385" ${ie()}/></g>`;function Py(){const e=ud,t=Array.from({length:Math.floor((dt.x1-dt.x0+40)/34)},(n,s)=>`<path d="M${dt.x0-20+s*34} 470 V428 l8 -10 l8 10 V470 Z" fill="#fff6e6" ${ie(3)}/>`).join("");return`<svg class="parkScene" viewBox="0 0 ${e} ${kd}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient>
  <pattern id="pkCheck" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><rect width="15" height="15" fill="#ff8fab"/><rect x="15" y="15" width="15" height="15" fill="#ff8fab"/></pattern></defs>
  <rect width="${e}" height="440" fill="url(#pkSky)"/>
  ${[180,900,1600,2300].map((n,s)=>`<g transform="translate(${n} ${70+s%2*30})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <circle cx="${e-220}" cy="90" r="46" fill="#ffe066" ${ie(4)}/>
  <path d="M-50 360 Q500 220 1100 340 T2300 330 T${e+100} 350 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#9fe0aa"/><path d="M0 410 H${e}" ${ie(4)}/>
  <path d="M0 560 Q700 520 1400 565 T${e} 545 V600 H0 Z" fill="#f6e3c3" opacity=".9"/>
  ${$s(260,390,.9)}${$s(720,380,1.05,"#4fbf7a")}${$s(1230,385,.8)}${$s(1640,380,1,"#4fbf7a")}${$s(1990,388,.85)}${$s(2380,380,.95)}${$s(2860,390,.9,"#4fbf7a")}
  ${[[300,470,"#ff8fab"],[690,455,"#c9a0dc"],[1210,470,"#ffd166"],[1960,450,"#8ecae6"],[2390,470,"#ff8fab"],[1580,590,"#c9a0dc"],[140,585,"#ffd166"]].map(([n,s,o])=>Sy(+n,+s,String(o))).join("")}
  <!-- gate back to the street -->
  <g><rect x="40" y="300" width="22" height="200" rx="6" fill="#c99366" ${ie()}/><rect x="168" y="300" width="22" height="200" rx="6" fill="#c99366" ${ie()}/>
    <path d="M30 312 Q115 240 200 312" fill="none" stroke="${Fe}" stroke-width="16" stroke-linecap="round"/><path d="M30 312 Q115 240 200 312" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
    <rect x="62" y="252" width="106" height="36" rx="12" fill="#fff6e6" ${ie(3)}/><text x="115" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="${Fe}" font-family="Nunito, system-ui, sans-serif">PARK</text></g>
  <!-- swing set (seats are separate so they can swing) -->
  <g><path d="M350 ${Kt} L310 500 M350 ${Kt} L390 500 M650 ${Kt} L610 500 M650 ${Kt} L690 500" stroke="${Fe}" stroke-width="14" stroke-linecap="round"/>
    <path d="M350 ${Kt} L310 500 M350 ${Kt} L390 500 M650 ${Kt} L610 500 M650 ${Kt} L690 500" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/>
    <rect x="330" y="${Kt-10}" width="340" height="20" rx="10" fill="#ff8fab" ${ie()}/></g>
  <!-- slide -->
  <g><path d="M${ge.ladder-20} 560 V${ge.top.y} M${ge.ladder+30} 560 V${ge.top.y}" stroke="${Fe}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${ge.ladder-20} 560 V${ge.top.y} M${ge.ladder+30} 560 V${ge.top.y}" stroke="#c9a0dc" stroke-width="6" stroke-linecap="round"/>
    ${[380,420,460,500,540].map(n=>`<path d="M${ge.ladder-20} ${n} H${ge.ladder+30}" ${ie(5)}/>`).join("")}
    <rect x="${ge.ladder-30}" y="${ge.top.y-14}" width="100" height="18" rx="8" fill="#ffd166" ${ie()}/>
    <path d="M${ge.ladder+60} ${ge.top.y-10} C 1000 ${ge.top.y} 1010 520 ${ge.bottom.x+40} 548 L${ge.bottom.x+40} 572 C 990 548 975 ${ge.top.y+30} ${ge.ladder+60} ${ge.top.y+14} Z" fill="#ffd166" ${ie()}/>
    <path d="M${ge.ladder+70} ${ge.top.y-2} C 990 ${ge.top.y+8} 1000 525 ${ge.bottom.x+30} 552" fill="none" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/></g>
  <!-- splash pond -->
  <g class="pondArt"><ellipse cx="1420" cy="515" rx="185" ry="52" fill="#8ecae6" ${ie()}/><ellipse cx="1420" cy="510" rx="150" ry="36" fill="#b5e3f5"/>
    <ellipse cx="1340" cy="520" rx="24" ry="9" fill="#80ed99" ${ie(3)}/><ellipse cx="1500" cy="505" rx="20" ry="8" fill="#80ed99" ${ie(3)}/>
    <g transform="translate(1440 500)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ffd166" ${ie(3)}/><circle cx="16" cy="-12" r="9" fill="#ffd166" ${ie(3)}/><path d="M24 -12 l8 2 l-8 3 z" fill="#ff9f68" ${ie(2)}/><circle cx="18" cy="-14" r="1.8" fill="${Fe}"/></g></g>
  <!-- picnic blanket -->
  <g><path d="M1670 530 L1910 530 L1940 580 L1640 580 Z" fill="url(#pkCheck)" ${ie()}/>
    <g transform="translate(1915 520)"><rect x="-26" y="-20" width="52" height="32" rx="8" fill="#e6b88a" ${ie(3)}/><path d="M-18 -20 Q0 -46 18 -20" fill="none" ${ie(4)}/><circle cx="-10" cy="-24" r="7" fill="#ff6b6b" ${ie(2)}/></g></g>
  ${Xf(2065)}${Xf(2265)}
  <!-- dog area -->
  <g>${t}<path d="M${dt.x0-20} 440 H${dt.x1+20}" ${ie(3)}/>
    <g transform="translate(${dt.x0+10} 380)"><rect x="-6" y="0" width="12" height="70" fill="#c99366" ${ie(3)}/><rect x="-55" y="-34" width="110" height="38" rx="10" fill="#fff6e6" ${ie(3)}/>
      <text x="0" y="-8" text-anchor="middle" font-size="20" font-weight="900" fill="${Fe}" font-family="Nunito, system-ui, sans-serif">DOGS 🐾</text></g>
    <g transform="translate(${dt.x1-30} 470)"><path d="M-50 0 V-60 L0 -100 L50 -60 V0 Z" fill="#ff8fab" ${ie()}/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="${Fe}" stroke-width="14" stroke-linecap="round"/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="#c9a0dc" stroke-width="8" stroke-linecap="round"/><path d="M-20 0 V-30 a20 20 0 0 1 40 0 V0 Z" fill="#5a3d5c"/></g>
    <g transform="translate(${dt.x0+120} 500)"><rect x="-12" y="-30" width="24" height="34" rx="8" fill="#ff6b6b" ${ie(3)}/><rect x="-18" y="-18" width="36" height="8" rx="4" fill="#ff6b6b" ${ie(3)}/><circle cx="0" cy="-32" r="10" fill="#ff6b6b" ${ie(3)}/></g></g>
  </svg>`}const Ty=`<svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M10 0 V222 M50 0 V222" stroke="${Fe}" stroke-width="4"/><rect x="0" y="216" width="60" height="14" rx="6" fill="#ff9f68" ${ie(3)}/></svg>`,Ry=`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffd166" ${ie(3)}/><path d="M6 16 Q20 24 34 16 M8 27 Q20 19 32 27" fill="none" stroke="#fff" stroke-width="3"/></svg>`,By=`<svg viewBox="0 0 48 48"><rect x="20" y="28" width="8" height="14" rx="3" fill="#c99366" stroke="${Fe}" stroke-width="3"/><circle cx="24" cy="20" r="13" fill="#5cc985" stroke="${Fe}" stroke-width="3"/><circle cx="19" cy="16" r="3" fill="#fff" opacity=".5"/></svg>`,tg=`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8" fill="#ff8fab" stroke="${Fe}" stroke-width="3"/><circle cx="13" cy="20" r="4.5" fill="#ff8fab" stroke="${Fe}" stroke-width="3"/><circle cx="20" cy="13" r="4.5" fill="#ff8fab" stroke="${Fe}" stroke-width="3"/><circle cx="28" cy="13" r="4.5" fill="#ff8fab" stroke="${Fe}" stroke-width="3"/><circle cx="35" cy="20" r="4.5" fill="#ff8fab" stroke="${Fe}" stroke-width="3"/></svg>`,Ay=`<svg viewBox="0 0 48 48"><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="${Fe}" stroke-width="4" stroke-linecap="round"/><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="#ff9f68" stroke-width="2"/><path d="M16 40 V26 M24 40 V22 M32 40 V26" stroke="${Fe}" stroke-width="3" stroke-linecap="round"/></svg>`,vt="#5a3d5c",_e=`stroke="${vt}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,xl=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${vt}"/><circle cx="${t}" cy="${n}" r="3" fill="${vt}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,Ml=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,da='<ellipse cx="50" cy="97" rx="34" ry="3" fill="#000" opacity=".12"/>',Dy=`<svg viewBox="0 0 40 30"><path d="M4 30 V16 Q4 2 20 2 Q36 2 36 16 V30 Z" fill="#3b2a3d" ${_e}/><circle cx="14" cy="18" r="1.6" fill="#fff" opacity=".8"/><circle cx="22" cy="18" r="1.6" fill="#fff" opacity=".8"/></svg>`,Iy=`<svg viewBox="0 0 48 30"><path d="M4 27 Q10 22 22 23 L42 23 Q46 27 42 28 H6 Z" fill="#cdeccf" ${_e}/><circle cx="26" cy="15" r="11" fill="#ffb3c6" ${_e}/><path d="M26 15 m-5 0 a5 5 0 1 1 5 5" fill="none" ${_e}/><path d="M8 23 L5 13 M12 23 L12 13" ${_e}/></svg>`,Hy=`<svg viewBox="0 0 30 30"><path d="M15 2 l3.6 8 8.4 1 -6.3 5.8 1.8 8.4 -7.5 -4.4 -7.5 4.4 1.8 -8.4 L3 11 l8.4 -1z" fill="#fff3b0" ${_e}/></svg>`,Oy=`<svg viewBox="0 0 30 22"><ellipse cx="15" cy="13" rx="13" ry="8" fill="#e6b88a" ${_e}/><circle cx="10" cy="11" r="1.8" fill="${vt}"/><circle cx="18" cy="14" r="1.8" fill="${vt}"/><circle cx="16" cy="9" r="1.5" fill="${vt}"/></svg>`,Wy=`<svg viewBox="0 0 30 28"><path d="M15 26 C3 18 1 10 6 5 C10 1 14 4 15 7 C16 4 20 1 24 5 C29 10 27 18 15 26 Z" fill="#ffc8dd" ${_e}/></svg>`,sr=[{name:"Cada",room:"living",x:150,y:382,w:40,h:30,taps:3,spot:Dy,hello:"Squeak! Hi Cada!",item:{kind:"egg:cada-mouse",name:"Cada's Mouse",cat:"secrets",w:80,holdable:!0,svg:`${da}<path d="M78 74 Q96 68 92 52" stroke="#ff9bb5" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="28" ry="18" fill="#d6d6e8" ${_e}/><circle cx="28" cy="40" r="13" fill="#d6d6e8" ${_e}/><circle cx="62" cy="38" r="13" fill="#d6d6e8" ${_e}/><circle cx="28" cy="40" r="7" fill="#ffc8dd"/><circle cx="62" cy="38" r="7" fill="#ffc8dd"/><circle cx="45" cy="56" r="20" fill="#e4e4f2" ${_e}/>${xl(38,52,54)}<circle cx="45" cy="64" r="3" fill="#ff8fab"/>${Ml(32,58,62)}<text x="50" y="96" font-size="11" font-weight="900" text-anchor="middle" fill="${vt}">C</text>`}},{name:"Sloane",room:"living",x:2290,y:383,w:48,h:30,taps:3,spot:Iy,hello:"Hi Sloane! ✨",item:{kind:"egg:sloane-snail",name:"Sloane's Rainbow Snail",cat:"secrets",w:110,holdable:!0,svg:`${da}<path d="M6 92 Q14 80 36 82 L84 82 Q94 90 84 94 H10 Z" fill="#cdeccf" ${_e}/><circle cx="56" cy="52" r="32" fill="#ff8fab" ${_e}/><circle cx="56" cy="52" r="24" fill="#ffd166"/><circle cx="56" cy="52" r="17" fill="#80ed99"/><circle cx="56" cy="52" r="10" fill="#8ecae6"/><circle cx="56" cy="52" r="4" fill="#c9a0dc"/><circle cx="56" cy="52" r="32" fill="none" ${_e}/><path d="M14 82 L8 60 M24 82 L24 60" ${_e}/><circle cx="8" cy="58" r="4" fill="${vt}"/><circle cx="24" cy="58" r="4" fill="${vt}"/>${Ml(14,30,76)}`}},{name:"Chloe",room:"bedroom",x:2230,y:92,w:30,h:30,taps:5,spot:Hy,item:{kind:"egg:chloe-starlamp",name:"Chloe's Star Lamp",cat:"secrets",w:100,holdable:!0,svg:`${da}<circle cx="50" cy="38" r="34" fill="#fff3b0" opacity=".6"/><path d="M50 6 l8 17 19 2.5 -14 13 4 19 -17 -9.5 -17 9.5 4 -19 -14 -13 19 -2.5z" fill="#ffd166" ${_e}/>${xl(43,57,38)}<path d="M45 46 q5 4 10 0" ${_e} fill="none"/><rect x="46" y="66" width="8" height="22" rx="4" fill="#c9a0dc" ${_e}/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#b388d6" ${_e}/><text x="50" y="93" font-size="8" font-weight="900" text-anchor="middle" fill="#fff">CHLOE</text>`}},{name:"Quinn",room:"kitchen",x:80,y:588,w:30,h:22,taps:4,spot:Oy,hello:"Woof! Hi Quinn!",item:{kind:"egg:quinn-pup",name:"Quinn's Cookie Pup",cat:"secrets",w:110,holdable:!0,svg:`${da}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#e6b88a" ${_e}/><circle cx="50" cy="44" r="27" fill="#f2d0a4" ${_e}/><ellipse cx="24" cy="46" rx="10" ry="17" fill="#b07d54" ${_e}/><ellipse cx="76" cy="46" rx="10" ry="17" fill="#b07d54" ${_e}/>${xl(41,59,42)}<ellipse cx="50" cy="53" rx="5" ry="4" fill="${vt}"/>${Ml(34,66,54)}<circle cx="84" cy="80" r="10" fill="#e6b88a" ${_e}/><circle cx="81" cy="78" r="1.8" fill="${vt}"/><circle cx="87" cy="82" r="1.8" fill="${vt}"/><text x="50" y="30" font-size="10" font-weight="900" text-anchor="middle" fill="${vt}">Q</text>`}},{name:"Reagan",room:"salon",x:2300,y:352,w:30,h:28,taps:5,spot:Wy,item:{kind:"egg:reagan-frame",name:"Reagan's Frame",cat:"secrets",w:120,wall:!0,svg:`<rect x="8" y="10" width="84" height="84" rx="16" fill="#ff8fab" ${_e}/><rect x="18" y="20" width="64" height="64" rx="10" fill="#fff3f7" ${_e}/><text x="50" y="72" font-size="52" font-weight="900" text-anchor="middle" fill="#e879c6" stroke="${vt}" stroke-width="2.5">R</text><circle cx="14" cy="16" r="6" fill="#ffd166" ${_e}/><circle cx="86" cy="88" r="6" fill="#ffd166" ${_e}/><path d="M76 24 l2 4 4 .5 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.5z" fill="#ffd166"/>`}}],Uy=sr.map(e=>({...e.item,rooms:["any"],secret:e.name})),ng=Wt("cozy-secrets"),jr=()=>{try{return new Set(JSON.parse(localStorage.getItem(ng)??"[]"))}catch{return new Set}},Vy=e=>localStorage.setItem(ng,JSON.stringify([...e]));function Qy(e){const t=document.createElement("div");t.className="eggs",e.world.appendChild(t);const n=new Map;for(const o of sr){const i=document.createElement("div");i.className="eggspot",i.dataset.egg=o.name,i.style.left=(o.x-o.w/2)/e.roomW*100+"%",i.style.top=(o.y-o.h)/e.roomH*100+"%",i.style.width=o.w/e.roomW*100+"%",i.style.height=o.h/e.roomH*100+"%",i.innerHTML=o.spot,t.appendChild(i),i.addEventListener("pointerdown",a=>a.stopPropagation()),i.addEventListener("click",a=>{a.stopPropagation();const r=Date.now(),l=n.get(o.name)??{n:0,t:0};if(l.n=r-l.t<1500?l.n+1:1,l.t=r,n.set(o.name,l),i.classList.remove("poke"),i.offsetWidth,i.classList.add("poke"),e.tap(),l.n<o.taps)return;l.n=0;const c=jr(),d=!c.has(o.name);c.add(o.name),Vy(c),zy(o,i),e.sparkle(),e.onFound(o.name,d)})}const s=()=>{const o=e.currentRoom();t.querySelectorAll(".eggspot").forEach(i=>{i.style.display=sr.find(a=>a.name===i.dataset.egg).room===o?"":"none"})};return s(),{update:s}}function zy(e,t){if(e.hello){const s=document.createElement("div");s.className="eggpop",s.innerHTML=`<div class="eggcritter"><svg viewBox="0 0 100 100">${e.item.svg}</svg></div><div class="bubble">${e.hello}</div>`,t.appendChild(s),setTimeout(()=>s.remove(),3200)}const n=document.createElement("div");n.className="eggbanner",n.innerHTML=`<span class="sp">✨</span><span class="nm">${[...e.name].map((s,o)=>`<i style="animation-delay:${o*70}ms">${s}</i>`).join("")}</span><span class="sp">✨</span>`,document.body.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3100),sg()}function sg(e=70){const t=["#ff8fab","#ffd166","#8ecae6","#80ed99","#c9a0dc","#ff9f68"],n=document.createElement("div");n.className="confetti",document.body.appendChild(n);for(let s=0;s<e;s++){const o=document.createElement("i");o.style.left=Math.random()*100+"vw",o.style.background=t[s%t.length],o.style.animationDelay=Math.random()*.5+"s",o.style.animationDuration=1.6+Math.random()*1.2+"s",o.style.setProperty("--r",Math.random()*720-360+"deg"),o.style.setProperty("--dx",Math.random()*160-80+"px"),s%3===0&&(o.style.borderRadius="50%"),n.appendChild(o)}setTimeout(()=>n.remove(),3600)}const qy=`[
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
`,Zy=`[
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
`,Ny="/kids-house-game/assets/alarm-clock-DOVobLzL.png",Fy="/kids-house-game/assets/alarm-clock-BCd1-e86.svg",jy="/kids-house-game/assets/bedtime-snack-COvX4Nqo.png",Gy="/kids-house-game/assets/bedtime-snack-BoNDQqOK.svg",Yy="/kids-house-game/assets/book-stack-BlyqbTA1.png",Ky="/kids-house-game/assets/book-stack-upnp1NwG.svg",Xy="/kids-house-game/assets/bunk-bed-COiQly1s.png",Jy="/kids-house-game/assets/bunk-bed-YZiRWNFR.svg",eb="/kids-house-game/assets/bunny-slippers-DajXa_JK.png",tb="/kids-house-game/assets/bunny-slippers-PNucIc_Q.svg",nb="/kids-house-game/assets/canopy-bed-Db9GIfyT.png",sb="/kids-house-game/assets/canopy-bed-BwWkRhe2.svg",ob="/kids-house-game/assets/cat-bed-ChP4s69B.png",ib="/kids-house-game/assets/cat-bed-B8ULFbHc.svg",ab="/kids-house-game/assets/cloud-rug-Bv3GScgR.png",rb="/kids-house-game/assets/cloud-rug-CFl6aZc5.svg",lb="/kids-house-game/assets/cloud-shelf-BAmU3DSp.png",cb="/kids-house-game/assets/cloud-shelf-DF5b_IoZ.svg",db="/kids-house-game/assets/cork-board-B8yw-MFd.png",fb="/kids-house-game/assets/cork-board-Bj5OuLbv.svg",pb="/kids-house-game/assets/daisy-pot-BQDVlAug.png",hb="/kids-house-game/assets/daisy-pot-Cy8SrSS6.svg",gb="/kids-house-game/assets/desk-UTaBcI2Q.png",ub="/kids-house-game/assets/desk-2rRtV3Vk.svg",mb="/kids-house-game/assets/dino-plush-yhz7rVZD.png",yb="/kids-house-game/assets/dino-plush-Dq_qccf0.svg",bb="/kids-house-game/assets/doll-house-DfYMaHqJ.png",kb="/kids-house-game/assets/doll-house-BrC3RiST.svg",wb="/kids-house-game/assets/dresser-jJcAkDG_.png",vb="/kids-house-game/assets/dresser-__9TGuYc.svg",_b="/kids-house-game/assets/egg-chair-DobnnZdC.png",$b="/kids-house-game/assets/egg-chair-CtiaqWNQ.svg",xb="/kids-house-game/assets/floor-fan-C2R5oDHp.png",Mb="/kids-house-game/assets/floor-fan-Dt9SIAmB.svg",Lb="/kids-house-game/assets/guinea-pig-BzHyXlGo.png",Eb="/kids-house-game/assets/guinea-pig-CwLeNU_S.svg",Cb="/kids-house-game/assets/hamster-cage-zv59jo6b.png",Sb="/kids-house-game/assets/hamster-cage-lQ6r7saV.svg",Pb="/kids-house-game/assets/heart-rug-DYGPCKpT.png",Tb="/kids-house-game/assets/heart-rug-CBDvH6Q6.svg",Rb="/kids-house-game/assets/lava-lamp-Df-lJpLx.png",Bb="/kids-house-game/assets/lava-lamp-DEuHvlco.svg",Ab="/kids-house-game/assets/moon-night-light-JPI5SkUV.png",Db="/kids-house-game/assets/moon-night-light-CAKsjYZv.svg",Ib="/kids-house-game/assets/nightstand-D3WOPlqw.png",Hb="/kids-house-game/assets/nightstand-Bgsh0YUi.svg",Ob="/kids-house-game/assets/paper-lantern-mpw1jXzL.png",Wb="/kids-house-game/assets/paper-lantern-CErOGyrT.svg",Ub="/kids-house-game/assets/piggy-bank-DaSktUUA.png",Vb="/kids-house-game/assets/piggy-bank-DsHrmOcp.svg",Qb="/kids-house-game/assets/plant-stand-BpU338ra.png",zb="/kids-house-game/assets/plant-stand-DDyIDaL0.svg",qb="/kids-house-game/assets/play-tent-ih6xOGXC.png",Zb="/kids-house-game/assets/play-tent-Bsawe52j.svg",Nb="/kids-house-game/assets/star-mobile-Bqyd_ikl.png",Fb="/kids-house-game/assets/star-mobile-DzOGs-Jo.svg",jb="/kids-house-game/assets/toy-chest-DhEoVFj0.png",Gb="/kids-house-game/assets/toy-chest-6iPrDiZH.svg",Yb="/kids-house-game/assets/toy-robot-Bfkjfj_6.png",Kb="/kids-house-game/assets/toy-robot-OaCEwmDT.svg",Xb="/kids-house-game/assets/toy-train-DILjZiya.png",Jb="/kids-house-game/assets/toy-train-D5GqAnpy.svg",ek="/kids-house-game/assets/unicorn-plush-5YQqQjND.png",tk="/kids-house-game/assets/unicorn-plush-C0W1eEs9.svg",nk="/kids-house-game/assets/wardrobe-sJcJSWZ2.png",sk="/kids-house-game/assets/wardrobe-Dn492IK0.svg",ok="/kids-house-game/assets/bananas-D4irRkGy.png",ik="/kids-house-game/assets/bananas-aPQwdEVo.svg",ak="/kids-house-game/assets/bar-stool-xbwaa01H.png",rk="/kids-house-game/assets/bar-stool-DWxhX1Ah.svg",lk="/kids-house-game/assets/bread-loaf-DKmR5wPN.png",ck="/kids-house-game/assets/bread-loaf-C9cEAYcl.svg",dk="/kids-house-game/assets/chick-DCnoMwEt.png",fk="/kids-house-game/assets/chick-BTEVfgqU.svg",pk="/kids-house-game/assets/china-hutch-K3xtlmqi.png",hk="/kids-house-game/assets/china-hutch-BTmMY6rg.svg",gk="/kids-house-game/assets/cocoa-mug-BmqSzNJ6.png",uk="/kids-house-game/assets/cocoa-mug-CraNCc9b.svg",mk="/kids-house-game/assets/cookie-jar-CZsO9PSp.png",yk="/kids-house-game/assets/cookie-jar-ripj0oyT.svg",bk="/kids-house-game/assets/cooking-pot-BSKPlqyT.png",kk="/kids-house-game/assets/cooking-pot-BWtfOm9f.svg",wk="/kids-house-game/assets/cupcake-KO1KLKav.png",vk="/kids-house-game/assets/cupcake-DFCw42xb.svg",_k="/kids-house-game/assets/dish-rack-DICSEn5E.png",$k="/kids-house-game/assets/dish-rack-BpVmmU6k.svg",xk="/kids-house-game/assets/fruit-bowl-BL5EkaC8.png",Mk="/kids-house-game/assets/fruit-bowl-Dw9lsB3B.svg",Lk="/kids-house-game/assets/frying-pan-BocrLcES.png",Ek="/kids-house-game/assets/frying-pan-CTBY6MC_.svg",Ck="/kids-house-game/assets/happy-fridge-BTbpm-W1.png",Sk="/kids-house-game/assets/happy-fridge-D7ENuEJs.svg",Pk="/kids-house-game/assets/herb-box-DFtC2qBN.png",Tk="/kids-house-game/assets/herb-box-CdRxefnV.svg",Rk="/kids-house-game/assets/high-chair-DZCqRJV8.png",Bk="/kids-house-game/assets/high-chair-BQtLYlq4.svg",Ak="/kids-house-game/assets/ice-cream-CLLMXjn9.png",Dk="/kids-house-game/assets/ice-cream-DydSyNXx.svg",Ik="/kids-house-game/assets/kettle-DScYOeEK.png",Hk="/kids-house-game/assets/kettle-D1nuAiG_.svg",Ok="/kids-house-game/assets/kitchen-counter-cZcDRQIw.png",Wk="/kids-house-game/assets/kitchen-counter-C8sTAZ-V.svg",Uk="/kids-house-game/assets/kitchen-sink-DrP43iga.png",Vk="/kids-house-game/assets/kitchen-sink-CYjDcd1n.svg",Qk="/kids-house-game/assets/lemon-tree-BwA7W0cM.png",zk="/kids-house-game/assets/lemon-tree-CZz-Vy3P.svg",qk="/kids-house-game/assets/microwave-BJRDd-L-.png",Zk="/kids-house-game/assets/microwave-lopm-FCT.svg",Nk="/kids-house-game/assets/milk-bottle-D7UB6VD8.png",Fk="/kids-house-game/assets/milk-bottle-DxcUA6XT.svg",jk="/kids-house-game/assets/pancakes-CbisCK-C.png",Gk="/kids-house-game/assets/pancakes-CLqxnc5R.svg",Yk="/kids-house-game/assets/pantry-shelf-DI_CgvVD.png",Kk="/kids-house-game/assets/pantry-shelf-Azdxpmzd.svg",Xk="/kids-house-game/assets/pendant-lamp-BhZanag5.png",Jk="/kids-house-game/assets/pendant-lamp-fZv6y1p0.svg",ew="/kids-house-game/assets/pet-bowl-Oe3KGELz.png",tw="/kids-house-game/assets/pet-bowl-ETL_EOAP.svg",nw="/kids-house-game/assets/rice-cooker-DUTXsBbb.png",sw="/kids-house-game/assets/rice-cooker-JX0L4bi2.svg",ow="/kids-house-game/assets/runner-rug-AYIsQudU.png",iw="/kids-house-game/assets/runner-rug-BbUgZFy4.svg",aw="/kids-house-game/assets/spice-rack-8ll-6Q2f.png",rw="/kids-house-game/assets/spice-rack-D9kAw-vT.svg",lw="/kids-house-game/assets/stand-mixer-CP2fpC-Q.png",cw="/kids-house-game/assets/stand-mixer-CZrLn00l.svg",dw="/kids-house-game/assets/teapot-iFnJNGiA.png",fw="/kids-house-game/assets/teapot-CtPOJzEm.svg",pw="/kids-house-game/assets/toaster-T2WkZkdo.png",hw="/kids-house-game/assets/toaster-CNk0hJDw.svg",gw="/kids-house-game/assets/utensil-rail-_vjcgBpy.png",uw="/kids-house-game/assets/utensil-rail-B0QkGP3A.svg",mw="/kids-house-game/assets/watermelon-slice-yHBcfKGj.png",yw="/kids-house-game/assets/watermelon-slice-VzvgalD5.svg",bw="/kids-house-game/assets/aquarium-rYRAu69m.png",kw="/kids-house-game/assets/aquarium-BlhJ9UCr.svg",ww="/kids-house-game/assets/arc-floor-lamp-CBq3G9j8.png",vw="/kids-house-game/assets/arc-floor-lamp-DL5cEVzq.svg",_w="/kids-house-game/assets/bean-bag-CMLYRsbz.png",$w="/kids-house-game/assets/bean-bag-CauyDuZQ.svg",xw="/kids-house-game/assets/bird-cage-qj5P0te2.png",Mw="/kids-house-game/assets/bird-cage-xqeVahX7.svg",Lw="/kids-house-game/assets/blanket-basket-5IQiUSS2.png",Ew="/kids-house-game/assets/blanket-basket-B4LREUo9.svg",Cw="/kids-house-game/assets/building-blocks-CzqAFUNB.png",Sw="/kids-house-game/assets/building-blocks-DbtoodPT.svg",Pw="/kids-house-game/assets/coffee-table-iKZ20Gpy.png",Tw="/kids-house-game/assets/coffee-table-ZYO2ApH6.svg",Rw="/kids-house-game/assets/comfy-armchair-U_SI3sk9.png",Bw="/kids-house-game/assets/comfy-armchair-tjNYbfgO.svg",Aw="/kids-house-game/assets/cubby-shelf-B0De91CO.png",Dw="/kids-house-game/assets/cubby-shelf-CLzTUpiz.svg",Iw="/kids-house-game/assets/daisy-rug-BqSOjPlJ.png",Hw="/kids-house-game/assets/daisy-rug-CvOlxjsu.svg",Ow="/kids-house-game/assets/fiddle-leaf-fig-DnvG8l2j.png",Ww="/kids-house-game/assets/fiddle-leaf-fig-DiUNW4Q_.svg",Uw="/kids-house-game/assets/fireplace-C9azNipx.png",Vw="/kids-house-game/assets/fireplace-CqxIMN3Z.svg",Qw="/kids-house-game/assets/globe-C-L7vS0t.png",zw="/kids-house-game/assets/globe-DN0sih3W.svg",qw="/kids-house-game/assets/hanging-planter-DGgUXZpP.png",Zw="/kids-house-game/assets/hanging-planter-M9IHqztp.svg",Nw="/kids-house-game/assets/monstera-plant-BbGZQtOh.png",Fw="/kids-house-game/assets/monstera-plant-CLmuB_RM.svg",jw="/kids-house-game/assets/piano-DpS7nvdq.png",Gw="/kids-house-game/assets/piano-Y0KQ4rD2.svg",Yw="/kids-house-game/assets/popcorn-CFk12JbR.png",Kw="/kids-house-game/assets/popcorn-BD2d8sUH.svg",Xw="/kids-house-game/assets/pouf-DY0Vcx75.png",Jw="/kids-house-game/assets/pouf-as0li8On.svg",e4="/kids-house-game/assets/rainbow-rug-DwzLb6aY.png",t4="/kids-house-game/assets/rainbow-rug-C5ZVauOA.svg",n4="/kids-house-game/assets/rainbow-wall-art--5LLrrQJ.png",s4="/kids-house-game/assets/rainbow-wall-art-CCXUPPen.svg",o4="/kids-house-game/assets/retro-radio-BIX4GYkL.png",i4="/kids-house-game/assets/retro-radio-B3T98xMQ.svg",a4="/kids-house-game/assets/rocking-chair-CDLlJFiP.png",r4="/kids-house-game/assets/rocking-chair-BgoIQu5H.svg",l4="/kids-house-game/assets/rocking-horse-Iz-CpscK.png",c4="/kids-house-game/assets/rocking-horse-1WLLV43R.svg",d4="/kids-house-game/assets/snake-plant-DgPna4k9.png",f4="/kids-house-game/assets/snake-plant-BGDwPcMj.svg",p4="/kids-house-game/assets/string-lights-nDUZa5m1.png",h4="/kids-house-game/assets/string-lights-DGC0Ni2I.svg",g4="/kids-house-game/assets/succulent-trio-VYNH-o5B.png",u4="/kids-house-game/assets/succulent-trio-uPD-ljlL.svg",m4="/kids-house-game/assets/tassel-rug-BBXtknxh.png",y4="/kids-house-game/assets/tassel-rug-DolXtxfQ.svg",b4="/kids-house-game/assets/throw-pillow-BjuGXMYA.png",k4="/kids-house-game/assets/throw-pillow-qWyWQ9cT.svg",w4="/kids-house-game/assets/toy-car-Bwrt0-AT.png",v4="/kids-house-game/assets/toy-car-CTJy5H4V.svg",_4="/kids-house-game/assets/tulip-vase-CpQUgXPR.png",$4="/kids-house-game/assets/tulip-vase-o2vjI1Hg.svg",x4="/kids-house-game/assets/turtle-Bf8_yRql.png",M4="/kids-house-game/assets/turtle-B9Y6NDSv.svg",L4="/kids-house-game/assets/tv-stand-DnwT-hn4.png",E4="/kids-house-game/assets/tv-stand-CcLHFc1J.svg",C4="/kids-house-game/assets/wall-shelf-Bs6mROe1.png",S4="/kids-house-game/assets/wall-shelf-CCWuZ6Xl.svg",P4="/kids-house-game/assets/cc-bakery-shelf-dMrnZVB3.png",T4="/kids-house-game/assets/cc-bakery-shelf-BxdhLTTC.svg",R4="/kids-house-game/assets/cc-breakfast-table-DwHbMV2p.png",B4="/kids-house-game/assets/cc-breakfast-table-DwaO0eFy.svg",A4="/kids-house-game/assets/cc-bubble-chair-DuDi-bRz.png",D4="/kids-house-game/assets/cc-bubble-chair-DncHA7F-.svg",I4="/kids-house-game/assets/cc-canopy-daybed-CAZpSo2a.png",H4="/kids-house-game/assets/cc-canopy-daybed-CVbt6QDr.svg",O4="/kids-house-game/assets/cc-cloud-beanbag-BYcBLKf9.png",W4="/kids-house-game/assets/cc-cloud-beanbag-SM0m-3qY.svg",U4="/kids-house-game/assets/cc-cloud-lamp-v0UO1VrK.png",V4="/kids-house-game/assets/cc-cloud-lamp-BWwxoCux.svg",Q4="/kids-house-game/assets/cc-cottage-aquarium-XYuN1CnR.png",z4="/kids-house-game/assets/cc-cottage-aquarium-iY2D26Vq.svg",q4="/kids-house-game/assets/cc-cupcake-stand-jKA3zoCC.png",Z4="/kids-house-game/assets/cc-cupcake-stand-B08kdXZL.svg",N4="/kids-house-game/assets/cc-dryer-chair-CP8q6yyq.png",F4="/kids-house-game/assets/cc-dryer-chair-DQmosxUz.svg",j4="/kids-house-game/assets/cc-fairy-garland-B4DVLP6L.png",G4="/kids-house-game/assets/cc-fairy-garland-BncKvkRL.svg",Y4="/kids-house-game/assets/cc-fairy-shelf-DSmhC08i.png",K4="/kids-house-game/assets/cc-fairy-shelf-CE6x7J1w.svg",X4="/kids-house-game/assets/cc-flower-kettle-DZFkbEk5.png",J4="/kids-house-game/assets/cc-flower-kettle-ZTbAh26L.svg",e6="/kids-house-game/assets/cc-flower-lamp-hc1e4xxL.png",t6="/kids-house-game/assets/cc-flower-lamp-CS2T2S89.svg",n6="/kids-house-game/assets/cc-heart-bed-BtOx4_a4.png",s6="/kids-house-game/assets/cc-heart-bed-76-z9nJg.svg",o6="/kids-house-game/assets/cc-heart-clock-CLtzUj8w.png",i6="/kids-house-game/assets/cc-heart-clock-ByixSFru.svg",a6="/kids-house-game/assets/cc-heart-pouf-C3vCLnoM.png",r6="/kids-house-game/assets/cc-heart-pouf-DH5J2s2J.svg",l6="/kids-house-game/assets/cc-heart-rug-CpvyM_wf.png",c6="/kids-house-game/assets/cc-heart-rug-Jwmh-m0j.svg",d6="/kids-house-game/assets/cc-jewel-box-DZ6IxYiU.png",f6="/kids-house-game/assets/cc-jewel-box-qMbIQmo4.svg",p6="/kids-house-game/assets/cc-light-vanity-BxKLJiVW.png",h6="/kids-house-game/assets/cc-light-vanity-DD4uQJ_7.svg",g6="/kids-house-game/assets/cc-macaron-jar-NI43JiPM.png",u6="/kids-house-game/assets/cc-macaron-jar-A0sT-Lvj.svg",m6="/kids-house-game/assets/cc-macrame-swing-x8sop4y4.png",y6="/kids-house-game/assets/cc-macrame-swing-qIcoPp0o.svg",b6="/kids-house-game/assets/cc-mani-chair-C1J_zCFX.png",k6="/kids-house-game/assets/cc-mani-chair-7AWb60tv.svg",w6="/kids-house-game/assets/cc-mint-fridge-7zQk2-Kj.png",v6="/kids-house-game/assets/cc-mint-fridge-Cc87e_gW.svg",_6="/kids-house-game/assets/cc-mushroom-stool-DeoO7P27.png",$6="/kids-house-game/assets/cc-mushroom-stool-B9-y9WNf.svg",x6="/kids-house-game/assets/cc-pastel-range-CXu-Gr6f.png",M6="/kids-house-game/assets/cc-pastel-range-D6cjzJTl.svg",L6="/kids-house-game/assets/cc-perfume-tray-DkUHaA_i.png",E6="/kids-house-game/assets/cc-perfume-tray-DN4chcIn.svg",C6="/kids-house-game/assets/cc-petal-table-DadCDnSy.png",S6="/kids-house-game/assets/cc-petal-table-QrNho7KH.svg",P6="/kids-house-game/assets/cc-plant-wall-CCxqRxsH.png",T6="/kids-house-game/assets/cc-plant-wall-BMii8_kR.svg",R6="/kids-house-game/assets/cc-reading-nook-Eq4Eh0MW.png",B6="/kids-house-game/assets/cc-reading-nook-wiDgasP8.svg",A6="/kids-house-game/assets/cc-record-player-LmfaPaE5.png",D6="/kids-house-game/assets/cc-record-player-BoxZhHLy.svg",I6="/kids-house-game/assets/cc-ribbon-mirror-BEsGok51.png",H6="/kids-house-game/assets/cc-ribbon-mirror-DiCje_iy.svg",O6="/kids-house-game/assets/cc-scallop-curtains-Cvab-FzV.png",W6="/kids-house-game/assets/cc-scallop-curtains-Bzhy2peV.svg",U6="/kids-house-game/assets/cc-scallop-loveseat-CR3Z2O-W.png",V6="/kids-house-game/assets/cc-scallop-loveseat-Dfi7dg3b.svg",Q6="/kids-house-game/assets/cc-star-dresser-b15t-WLI.png",z6="/kids-house-game/assets/cc-star-dresser-2wqSnsip.svg",q6="/kids-house-game/assets/cc-teapot-set-ygQBLdbl.png",Z6="/kids-house-game/assets/cc-teapot-set-DnZlJvn7.svg",N6="/kids-house-game/assets/cc-window-seat-D-Rfuuwm.png",F6="/kids-house-game/assets/cc-window-seat-BCOise4Z.svg",j6="/kids-house-game/assets/arched-shelf-Dt4oWiBK.png",G6="/kids-house-game/assets/arched-shelf-XtiqRVaT.svg",Y6="/kids-house-game/assets/blob-rug-Ckw1kSsa.png",K6="/kids-house-game/assets/blob-rug-Deh5k10s.svg",X6="/kids-house-game/assets/bubbly-plant-CV9ioei6.png",J6="/kids-house-game/assets/bubbly-plant-CFTOJd5Y.svg",ev="/kids-house-game/assets/bud-vase-Bzj5qGgr.png",tv="/kids-house-game/assets/bud-vase-Dup4WQ5y.svg",nv="/kids-house-game/assets/comb-brush-CfTGGk1L.png",sv="/kids-house-game/assets/comb-brush-oPJeQv0v.svg",ov="/kids-house-game/assets/cream-jars-dLRXypJR.png",iv="/kids-house-game/assets/cream-jars-D6bxrnJR.svg",av="/kids-house-game/assets/drop-lamp-DWqiPjZB.png",rv="/kids-house-game/assets/drop-lamp-CJg63ZKz.svg",lv="/kids-house-game/assets/droplet-buddy-DCjbvrlK.png",cv="/kids-house-game/assets/droplet-buddy-DTpHggFh.svg",dv="/kids-house-game/assets/fancy-sofa-BRlr2j8I.png",fv="/kids-house-game/assets/fancy-sofa-kq2L0ob5.svg",pv="/kids-house-game/assets/flower-cart-C3W7v2RD.png",hv="/kids-house-game/assets/flower-cart-BWgfg0s_.svg",gv="/kids-house-game/assets/foot-spa-HwiSNgdS.png",uv="/kids-house-game/assets/foot-spa-DdA5_fj_.svg",mv="/kids-house-game/assets/globe-pendants-ChKRw_Bp.png",yv="/kids-house-game/assets/globe-pendants-DNV5WnAO.svg",bv="/kids-house-game/assets/glow-mirror-D4P3UibJ.png",kv="/kids-house-game/assets/glow-mirror-C_dTGwQc.svg",wv="/kids-house-game/assets/gold-floor-mirror-CSYqaszS.png",vv="/kids-house-game/assets/gold-floor-mirror-jfPQepmr.svg",_v="/kids-house-game/assets/hair-dryer-_nFRnXBv.png",$v="/kids-house-game/assets/hair-dryer-CAkhCf7J.svg",xv="/kids-house-game/assets/heart-plant-CN47o4my.png",Mv="/kids-house-game/assets/heart-plant-fSU4uLVy.svg",Lv="/kids-house-game/assets/heart-pouf-b76ZFT07.png",Ev="/kids-house-game/assets/heart-pouf-BMVPBVKJ.svg",Cv="/kids-house-game/assets/lilac-curtain-94MUZIqr.png",Sv="/kids-house-game/assets/lilac-curtain-D_mFsZKu.svg",Pv="/kids-house-game/assets/lotion-trio-wGXg7qdC.png",Tv="/kids-house-game/assets/lotion-trio-D3lKwvho.svg",Rv="/kids-house-game/assets/mani-lamp-B6MLP1xK.png",Bv="/kids-house-game/assets/mani-lamp-B4SmvhvS.svg",Av="/kids-house-game/assets/nail-table-CP0_pEA8.png",Dv="/kids-house-game/assets/nail-table-C3FitmuG.svg",Iv="/kids-house-game/assets/pebble-rug-BgHMxQ6Q.png",Hv="/kids-house-game/assets/pebble-rug-DHBZUggl.svg",Ov="/kids-house-game/assets/perfume-bottle-F_MkREQh.png",Wv="/kids-house-game/assets/perfume-bottle-BcNXSWTW.svg",Uv="/kids-house-game/assets/pink-fountain-DtB69ljQ.png",Vv="/kids-house-game/assets/pink-fountain-DQ3CIetr.svg",Qv="/kids-house-game/assets/pink-vanity-CPmOesS7.png",zv="/kids-house-game/assets/pink-vanity-qE3SwdD6.svg",qv="/kids-house-game/assets/polish-bottle-B2f4PsGZ.png",Zv="/kids-house-game/assets/polish-bottle-VWed8EQ-.svg",Nv="/kids-house-game/assets/polish-rack-ANlncwDe.png",Fv="/kids-house-game/assets/polish-rack-8Ph2n2nM.svg",jv="/kids-house-game/assets/reception-desk-DnhqgkHu.png",Gv="/kids-house-game/assets/reception-desk-D4Gevx64.svg",Yv="/kids-house-game/assets/salon-chair-Bl31ZE_E.png",Kv="/kids-house-game/assets/salon-chair-Wj2sOSW8.svg",Xv="/kids-house-game/assets/scent-candle-BYUsO9s1.png",Jv="/kids-house-game/assets/scent-candle-BEUE-6Uv.svg",e_="/kids-house-game/assets/spray-bottle-DJKZeNmL.png",t_="/kids-house-game/assets/spray-bottle-Bc8iuceJ.svg",n_="/kids-house-game/assets/star-wall-sign-D_9XhB91.png",s_="/kids-house-game/assets/star-wall-sign-DvenTqvU.svg",o_="/kids-house-game/assets/swivel-stool-BGAwWXNX.png",i_="/kids-house-game/assets/swivel-stool-P-Egqq_Z.svg",a_="/kids-house-game/assets/tiered-tray-CGuVyK1K.png",r_="/kids-house-game/assets/tiered-tray-DLnZTsUF.svg",l_="/kids-house-game/assets/towel-cart-5At-syZP.png",c_="/kids-house-game/assets/towel-cart-DJmR97UL.svg",d_="/kids-house-game/assets/towel-stack-D-pX5koc.png",f_="/kids-house-game/assets/towel-stack-C1qplZ4T.svg",p_="/kids-house-game/assets/vine-planter-mviuZvkw.png",h_="/kids-house-game/assets/vine-planter-Duhx9OMZ.svg",g_="/kids-house-game/assets/waiting-bench-DXbi7ObC.png",u_="/kids-house-game/assets/waiting-bench-BQuoXbE3.svg",m_="/kids-house-game/assets/wash-chair-CJo64U_O.png",y_="/kids-house-game/assets/wash-chair-sdgNnj79.svg",b_="/kids-house-game/assets/hw-candy-bowl-CD02D5Zj.webp",k_="/kids-house-game/assets/hw-cat-statue-DeCc_3q0.webp",w_="/kids-house-game/assets/hw-cauldron-Dct8_uZ8.webp",v_="/kids-house-game/assets/hw-ghost-sheet-kZF5Oxdt.webp",__="/kids-house-game/assets/hw-hay-bale-BqFYl-D_.webp",$_="/kids-house-game/assets/hw-heart-pumpkin-B-0-0OAK.webp",x_="/kids-house-game/assets/hw-leaf-garland-DN-y_jMP.webp",M_="/kids-house-game/assets/hw-moon-cling-p5ei0N89.webp",L_="/kids-house-game/assets/hw-moon-lantern-ByPteKOL.webp",E_="/kids-house-game/assets/hw-star-pumpkin-Bxq_OX8C.webp",C_="/kids-house-game/assets/hw-witch-hat-BmuOG13B.webp",S_="/kids-house-game/assets/arched-mirror-2vakzmQ8.png",P_="/kids-house-game/assets/arched-mirror-ClJgTBd9.svg",T_="/kids-house-game/assets/big-monitor-BRiCdofl.png",R_="/kids-house-game/assets/big-monitor-jx5PnUa_.svg",B_="/kids-house-game/assets/boba-cup-Dn_S1oAa.png",A_="/kids-house-game/assets/boba-cup-CwUerXNm.svg",D_="/kids-house-game/assets/bubble-bath-D4AZavWB.png",I_="/kids-house-game/assets/bubble-bath-8VwrkImA.svg",H_="/kids-house-game/assets/cactus-buddy-D_lAS12Y.png",O_="/kids-house-game/assets/cactus-buddy-D3uacuVA.svg",W_="/kids-house-game/assets/caterpillar-plush-vK3r58Ch.png",U_="/kids-house-game/assets/caterpillar-plush-BhR8Pydf.svg",V_="/kids-house-game/assets/checker-bed-DD4Ra6RV.png",Q_="/kids-house-game/assets/checker-bed-mtuxfPje.svg",z_="/kids-house-game/assets/checker-rug-C9Gs09p_.png",q_="/kids-house-game/assets/checker-rug-CmSO3Y4j.svg",Z_="/kids-house-game/assets/clothes-rail-CJ8Du1xN.png",N_="/kids-house-game/assets/clothes-rail-BY-f9coz.svg",F_="/kids-house-game/assets/cloud-sofa-3eVlcAzs.png",j_="/kids-house-game/assets/cloud-sofa-CZS1Y5s-.svg",G_="/kids-house-game/assets/cube-shelf-DPFNgFhk.png",Y_="/kids-house-game/assets/cube-shelf-DoI0tLGL.svg",K_="/kids-house-game/assets/curvy-desk-BxyVtcg3.png",X_="/kids-house-game/assets/curvy-desk-eWCvec1f.svg",J_="/kids-house-game/assets/cute-speaker-Cy7ml0bm.png",e8="/kids-house-game/assets/cute-speaker-DrVF9uns.svg",t8="/kids-house-game/assets/desk-lamp-B39R5SBQ.png",n8="/kids-house-game/assets/desk-lamp-C-VtrE1V.svg",s8="/kids-house-game/assets/desk-mic-C-4XirP6.png",o8="/kids-house-game/assets/desk-mic-BqYzh6ma.svg",i8="/kids-house-game/assets/flower-lamp-DyDRXGpR.png",a8="/kids-house-game/assets/flower-lamp-Dpz6tQ2x.svg",r8="/kids-house-game/assets/frog-plush-NmeU5sHZ.png",l8="/kids-house-game/assets/frog-plush-BhkTrE24.svg",c8="/kids-house-game/assets/game-controller-B6phnmU4.png",d8="/kids-house-game/assets/game-controller-6gvwykQG.svg",f8="/kids-house-game/assets/gaming-chair-B7ZnwG2W.png",p8="/kids-house-game/assets/gaming-chair-BCyGMzy0.svg",h8="/kids-house-game/assets/hamster-pet-C09aLs5N.png",g8="/kids-house-game/assets/hamster-pet-LBcghoJj.svg",u8="/kids-house-game/assets/headphones-MRHfNh-e.png",m8="/kids-house-game/assets/headphones-Cjjqt_92.svg",y8="/kids-house-game/assets/heart-light-B6LXGE4j.png",b8="/kids-house-game/assets/heart-light-DfDwRHju.svg",k8="/kids-house-game/assets/keyboard-Dvxz1PEW.png",w8="/kids-house-game/assets/keyboard-Cbtwvtj1.svg",v8="/kids-house-game/assets/mini-fridge-DgYceOBW.png",_8="/kids-house-game/assets/mini-fridge-qdNm4NKf.svg",$8="/kids-house-game/assets/pastel-wardrobe-CFIOdtrx.png",x8="/kids-house-game/assets/pastel-wardrobe-BubkWAN2.svg",M8="/kids-house-game/assets/phone-stand-CWfRuwT_.png",L8="/kids-house-game/assets/phone-stand-VLW-DsK-.svg",E8="/kids-house-game/assets/pothos-plant-mnKAaH_K.png",C8="/kids-house-game/assets/pothos-plant-C1I15M9a.svg",S8="/kids-house-game/assets/puffy-stool-B5z3sd2l.png",P8="/kids-house-game/assets/puffy-stool-CwjoblCa.svg",T8="/kids-house-game/assets/ring-light-BoqM9Lks.png",R8="/kids-house-game/assets/ring-light-CdxNAXA6.svg",B8="/kids-house-game/assets/side-table-round-x1NbWzDq.png",A8="/kids-house-game/assets/side-table-round-rCsBU0YO.svg",D8="/kids-house-game/assets/star-lamp-Bocs3YRP.png",I8="/kids-house-game/assets/star-lamp-CHKQnzvB.svg",H8="/kids-house-game/assets/sticker-board-CMn2BF_D.png",O8="/kids-house-game/assets/sticker-board-LUm1_I_P.svg",W8="/kids-house-game/assets/sunny-art-372bwMLG.png",U8="/kids-house-game/assets/sunny-art-C25M7k02.svg",V8="/kids-house-game/assets/sv-bean-bag-DlsJBRMG.png",Q8="/kids-house-game/assets/sv-bean-bag-DdsCYd4e.svg",z8="/kids-house-game/assets/sv-cloud-rug-Bo5aP_HP.png",q8="/kids-house-game/assets/sv-cloud-rug-BvczSj77.svg",Z8="/kids-house-game/assets/sv-wall-shelf-C61Y5OFn.png",N8="/kids-house-game/assets/sv-wall-shelf-BtJLzNMg.svg",F8="/kids-house-game/assets/vlog-camera-DAiD7LSW.png",j8="/kids-house-game/assets/vlog-camera-CBd28A7P.svg",G8="/kids-house-game/assets/wavy-floor-lamp-1BJBLV8q.png",Y8="/kids-house-game/assets/wavy-floor-lamp-Iy8llzr8.svg",K8="/kids-house-game/assets/acorn-friend-SMoU5de2.png",X8="/kids-house-game/assets/acorn-friend-BsLiZ2Z_.svg",J8="/kids-house-game/assets/apple-tree-CN7tYao3.png",e$="/kids-house-game/assets/apple-tree-DGIUIjY1.svg",t$="/kids-house-game/assets/big-wardrobe-DcZpROWW.png",n$="/kids-house-game/assets/big-wardrobe-BnfnkPXl.svg",s$="/kids-house-game/assets/box-stack-DBdO-RRV.png",o$="/kids-house-game/assets/box-stack-ji13G2mP.svg",i$="/kids-house-game/assets/brick-fireplace-CxelyhgA.png",a$="/kids-house-game/assets/brick-fireplace-BGCbiSK5.svg",r$="/kids-house-game/assets/bulletin-board-BWUCktvK.png",l$="/kids-house-game/assets/bulletin-board-DqA69wQH.svg",c$="/kids-house-game/assets/cozy-mug-DGMQRJK7.png",d$="/kids-house-game/assets/cozy-mug-CFJEPRKb.svg",f$="/kids-house-game/assets/cream-sofa-Dzaz9Eg9.png",p$="/kids-house-game/assets/cream-sofa-CB4EWIDp.svg",h$="/kids-house-game/assets/fire-pit-FhRYTkJU.png",g$="/kids-house-game/assets/fire-pit-DTyRokIj.svg",u$="/kids-house-game/assets/glass-cabinet-C1Dud5Om.png",m$="/kids-house-game/assets/glass-cabinet-BCHExP4F.svg",y$="/kids-house-game/assets/hanging-lantern-5_A0FrVU.png",b$="/kids-house-game/assets/hanging-lantern-DZbXB8L1.svg",k$="/kids-house-game/assets/knit-cushion-CeEpuawZ.png",w$="/kids-house-game/assets/knit-cushion-DUewI6rR.svg",v$="/kids-house-game/assets/ladder-shelf-kDBx9ho_.png",_$="/kids-house-game/assets/ladder-shelf-DXYDmQiE.svg",$$="/kids-house-game/assets/landscape-art-CXy-fkYO.png",x$="/kids-house-game/assets/landscape-art-CdCqCPL2.svg",M$="/kids-house-game/assets/lattice-bench-BQ7wYgqI.png",L$="/kids-house-game/assets/lattice-bench-D3zCZTQp.svg",E$="/kids-house-game/assets/leaf-wreath-01dJ9WfP.png",C$="/kids-house-game/assets/leaf-wreath-DUjq1MWh.svg",S$="/kids-house-game/assets/mini-greenhouse-DLsY7-VZ.png",P$="/kids-house-game/assets/mini-greenhouse-CGE5F9A_.svg",T$="/kids-house-game/assets/moving-box-DszcEI-k.png",R$="/kids-house-game/assets/moving-box-CZXbXcJO.svg",B$="/kids-house-game/assets/picnic-basket-CYmGfWoy.png",A$="/kids-house-game/assets/picnic-basket-D72DCNRY.svg",D$="/kids-house-game/assets/round-rug-DZTiY9p2.png",I$="/kids-house-game/assets/round-rug-D8ePosbv.svg",H$="/kids-house-game/assets/sale-sign-CLwCvavX.png",O$="/kids-house-game/assets/sale-sign-CXWpgQt5.svg",W$="/kids-house-game/assets/sprout-pot-BlPwmBjK.png",U$="/kids-house-game/assets/sprout-pot-BbXk09mS.svg",V$="/kids-house-game/assets/stripe-runner-CWfHHL2f.png",Q$="/kids-house-game/assets/stripe-runner-ClycKEW5.svg",z$="/kids-house-game/assets/trailing-plant-BBqKhPvp.png",q$="/kids-house-game/assets/trailing-plant-NbG7dy8O.svg",Z$="/kids-house-game/assets/wall-clock-ItDQFPVO.png",N$="/kids-house-game/assets/wall-clock-CDC1o6eG.svg",F$="/kids-house-game/assets/wh-arc-floor-lamp-Dg8j_uAI.png",j$="/kids-house-game/assets/wh-arc-floor-lamp-BKVes2Fd.svg",G$="/kids-house-game/assets/wh-book-stack-9oDTUUnY.png",Y$="/kids-house-game/assets/wh-book-stack-DjDFey2h.svg",K$="/kids-house-game/assets/wh-dresser-DhrzqcZ2.png",X$="/kids-house-game/assets/wh-dresser-Y-jnNt5q.svg",J$="/kids-house-game/assets/wh-fiddle-leaf-fig-Bt0Bc12k.png",e3="/kids-house-game/assets/wh-fiddle-leaf-fig-B0-kGmHI.svg",t3="/kids-house-game/assets/wh-kitchen-counter-BWikwkWo.png",n3="/kids-house-game/assets/wh-kitchen-counter-BtBenu6u.svg",s3="/kids-house-game/assets/wh-nightstand-BXusZ0A4.png",o3="/kids-house-game/assets/wh-nightstand-DPUoV5aO.svg",i3="/kids-house-game/assets/wh-pendant-lamp-DbfSrUho.png",a3="/kids-house-game/assets/wh-pendant-lamp-DBg4p7hi.svg",r3="/kids-house-game/assets/wh-snake-plant-kt_6Tus5.png",l3="/kids-house-game/assets/wh-snake-plant-Cj3bHF25.svg",c3="/kids-house-game/assets/wh-string-lights-CWVP27K_.png",d3="/kids-house-game/assets/wh-string-lights-C3JVBkgW.svg",f3="/kids-house-game/assets/wh-teapot-BclPHtYN.png",p3="/kids-house-game/assets/wh-teapot-kevlW5hN.svg",h3="/kids-house-game/assets/wood-armchair-BoX1llWe.png",g3="/kids-house-game/assets/wood-armchair-DNVhKBWe.svg",u3="/kids-house-game/assets/wood-bookshelf-CfgOK-7q.png",m3="/kids-house-game/assets/wood-bookshelf-CvT7GAuI.svg",y3="/kids-house-game/assets/wood-coffee-table-DmAJknnU.png",b3="/kids-house-game/assets/wood-coffee-table-CuAR_7Kr.svg",k3="/kids-house-game/assets/wood-desk-S1h5jwM2.png",w3="/kids-house-game/assets/wood-desk-DPCJq_XQ.svg",v3="/kids-house-game/assets/wood-stool-BWBID67e.png",_3="/kids-house-game/assets/wood-stool-CV7YeZwC.svg",$3="/kids-house-game/assets/wooden-bed-511IemjK.png",x3="/kids-house-game/assets/wooden-bed-Qj-sf8yq.svg",M3="/kids-house-game/assets/wc-bauble-garland-PlBim-j0.webp",L3="/kids-house-game/assets/wc-berry-wreath-BtfH1PGe.webp",E3="/kids-house-game/assets/wc-birch-basket-vRxqyB3J.webp",C3="/kids-house-game/assets/wc-cabin-picture-B-lavF1R.webp",S3="/kids-house-game/assets/wc-candle-trio-CjQ7YYcj.webp",P3="/kids-house-game/assets/wc-cane-lamp-OhwvqNa-.webp",T3="/kids-house-game/assets/wc-cinnamon-tray-CxLrtplK.webp",R3="/kids-house-game/assets/wc-cocoa-cart-BkMzGgs0.webp",B3="/kids-house-game/assets/wc-cocoa-mug-qa2xzTYd.webp",A3="/kids-house-game/assets/wc-cocoa-pot-bLgiaNKD.webp",D3="/kids-house-game/assets/wc-cookie-oven-D2Ud1EPt.webp",I3="/kids-house-game/assets/wc-cookie-plate-RhDZYroJ.webp",H3="/kids-house-game/assets/wc-frost-bookcase-BMd6DAXH.webp",O3="/kids-house-game/assets/wc-frosted-pine-BupMG4GK.webp",W3="/kids-house-game/assets/wc-fur-bench-B1nXjHAR.webp",U3="/kids-house-game/assets/wc-gingerbread-village-8pOXPPCY.webp",V3="/kids-house-game/assets/wc-gingerbread-PGlclkJ_.webp",Q3="/kids-house-game/assets/wc-globe-lamp-DUCVl_3A.webp",z3="/kids-house-game/assets/wc-holiday-tree-CO0SBlqY.webp",q3="/kids-house-game/assets/wc-holly-CD8teo0a.webp",Z3="/kids-house-game/assets/wc-ice-skates-D49y8YK1.webp",N3="/kids-house-game/assets/wc-ice-wardrobe-Dliflqpp.webp",F3="/kids-house-game/assets/wc-knit-armchair-84rhSw_8.webp",j3="/kids-house-game/assets/wc-lantern-81B3e5fN.webp",G3="/kids-house-game/assets/wc-log-bench-qQ1zT34_.webp",Y3="/kids-house-game/assets/wc-marshmallow-jar-DeWRr-zf.webp",K3="/kids-house-game/assets/wc-mitten-line-sg-sweCl.webp",X3="/kids-house-game/assets/wc-mitten-ottoman-H5qkjso6.webp",J3="/kids-house-game/assets/wc-mug-shelf-DlWrwZYo.webp",e5="/kids-house-game/assets/wc-nutcracker-BGZe5tYy.webp",t5="/kids-house-game/assets/wc-penguin-chair-CDM1eIxo.webp",n5="/kids-house-game/assets/wc-penguin-plush-C8B27KcB.webp",s5="/kids-house-game/assets/wc-peppermint-counter-CPl6TA0h.webp",o5="/kids-house-game/assets/wc-peppermint-rug-3nakY_gB.webp",i5="/kids-house-game/assets/wc-pinecone-garland-s7ZWASw2.webp",a5="/kids-house-game/assets/wc-pinecone-table-DlJvjB-2.webp",r5="/kids-house-game/assets/wc-plaid-bed-eAhWKZdO.webp",l5="/kids-house-game/assets/wc-plaid-sofa-kvF30vEn.webp",c5="/kids-house-game/assets/wc-poinsettia-C-S-MDMu.webp",d5="/kids-house-game/assets/wc-polar-plush-BUVRTt7t.webp",f5="/kids-house-game/assets/wc-pom-rug-B-JF-heA.webp",p5="/kids-house-game/assets/wc-present-stack-Do2pEHLF.webp",h5="/kids-house-game/assets/wc-reindeer-CbKEp6CE.webp",g5="/kids-house-game/assets/wc-sled-table-Bd2cST9J.webp",u5="/kids-house-game/assets/wc-sleigh-planter-Bfcxvgbk.webp",m5="/kids-house-game/assets/wc-snow-globe-BcGMsnmh.webp",y5="/kids-house-game/assets/wc-snow-mobile-F06-kuT7.webp",b5="/kids-house-game/assets/wc-snow-nightstand-D6RhLncP.webp",k5="/kids-house-game/assets/wc-snow-window-dOxdYTSk.webp",w5="/kids-house-game/assets/wc-snowman-gxLBKnIO.webp",v5="/kids-house-game/assets/wc-snowshoes-CZcMT0Qx.webp",_5="/kids-house-game/assets/wc-sock-hamper-mesU3CG3.webp",$5="/kids-house-game/assets/wc-star-topper-c4tXfpV6.webp",x5="/kids-house-game/assets/wc-stocking-row-Dz0-4wTi.webp",M5="/kids-house-game/assets/wc-stone-hearth-1blXXfiH.webp",L5="/kids-house-game/assets/wc-twinkle-lamp-CYcQjW3A.webp",E5="/kids-house-game/assets/wc-twinkle-string-Olg29poj.webp",C5="/kids-house-game/assets/wc-window-seat-B7CwlRjl.webp",S5="/kids-house-game/assets/wc-woodstove-Cf0xJFnD.webp",P5="/kids-house-game/assets/cc-butter-polka-DGTIwtTO.png",T5="/kids-house-game/assets/cc-butter-polka-CmiHLPHI.svg",R5="/kids-house-game/assets/cc-cream-hex-DMlsmhhY.png",B5="/kids-house-game/assets/cc-cream-hex-Bkf3o84Z.svg",A5="/kids-house-game/assets/cc-lavender-lattice-D6QyuSPi.png",D5="/kids-house-game/assets/cc-lavender-lattice-DhxILx5n.svg",I5="/kids-house-game/assets/cc-lilac-gingham-C8gKChr3.png",H5="/kids-house-game/assets/cc-lilac-gingham-C-WPjvD8.svg",O5="/kids-house-game/assets/cc-mint-checks-Bj1xaUgE.png",W5="/kids-house-game/assets/cc-mint-checks-BKmyOLlr.svg",U5="/kids-house-game/assets/cc-mint-florals-DubHlfkl.png",V5="/kids-house-game/assets/cc-mint-florals-Dz8qRBHw.svg",Q5="/kids-house-game/assets/cc-peach-scallops-3xV_Pu-6.png",z5="/kids-house-game/assets/cc-peach-scallops-GPn_mXbS.svg",q5="/kids-house-game/assets/cc-pink-plaid-C9HKdB4f.png",Z5="/kids-house-game/assets/cc-pink-plaid-VgppBwax.svg",N5="/kids-house-game/assets/cc-rag-planks-B67vRZlX.png",F5="/kids-house-game/assets/cc-rag-planks-C5Hombhc.svg",j5="/kids-house-game/assets/cc-rose-herringbone-Cmke3vGv.png",G5="/kids-house-game/assets/cc-rose-herringbone-CQRix6_f.svg",Y5="/kids-house-game/assets/lilac-stripes-DcsSoVwO.png",K5="/kids-house-game/assets/lilac-stripes-yb9DhjTf.svg",X5="/kids-house-game/assets/lilac-terrazzo-DOghNP_d.png",J5="/kids-house-game/assets/lilac-terrazzo-8CaN2qhK.svg",ex="/kids-house-game/assets/mint-bubbles-DtsYAubK.png",tx="/kids-house-game/assets/mint-bubbles-BIQM5a2P.svg",nx="/kids-house-game/assets/pink-check-floor-DjPuYxlq.png",sx="/kids-house-game/assets/pink-check-floor-Cy9k3Fal.svg",ox="/kids-house-game/assets/pink-hearts-DP4TxPV5.png",ix="/kids-house-game/assets/pink-hearts-BpVCT-98.svg",ax="/kids-house-game/assets/cloud-sky-CbZL0zcC.svg",rx="/kids-house-game/assets/pastel-planks-BAcEss7w.svg",lx="/kids-house-game/assets/soft-carpet-BSwTSDW1.svg",cx="/kids-house-game/assets/star-sprinkle-5bH7qjW0.svg",dx="/kids-house-game/assets/tiny-hearts-C-RHlg1h.svg",fx="/kids-house-game/assets/butter-check-floor-yLFbEdi4.png",px="/kids-house-game/assets/butter-check-floor-C8HdmZ0P.svg",hx="/kids-house-game/assets/mint-checks-7rTweT19.png",gx="/kids-house-game/assets/mint-checks-rWbOdhfH.svg",ux="/kids-house-game/assets/sky-clouds-9-shWk3w.png",mx="/kids-house-game/assets/sky-clouds-DUJlygwI.svg",yx="/kids-house-game/assets/sky-tiles-Cu-Ga741.png",bx="/kids-house-game/assets/sky-tiles-xxuodD5m.svg",kx="/kids-house-game/assets/sunny-stars-Bc3CbIvZ.png",wx="/kids-house-game/assets/sunny-stars-C6fsFX70.svg",vx="/kids-house-game/assets/leafy-cream-Cv5o-u-w.png",_x="/kids-house-game/assets/leafy-cream-WIcyLI1T.svg",$x="/kids-house-game/assets/orange-gingham-BjUerG-F.png",xx="/kids-house-game/assets/orange-gingham-CVNizWBt.svg",Mx="/kids-house-game/assets/terracotta-tiles-dXqpLLce.png",Lx="/kids-house-game/assets/terracotta-tiles-j3yOSRI7.svg",Ex="/kids-house-game/assets/wood-panel-BGEVUu4R.png",Cx="/kids-house-game/assets/wood-panel-Dob8WRpW.svg",Sx="/kids-house-game/assets/wood-planks-vE8-OOXo.png",Px="/kids-house-game/assets/wood-planks-4TUYjAkF.svg",Tx="/kids-house-game/assets/wc-cabin-planks-Icu9n6YO.webp",Rx="/kids-house-game/assets/wc-candy-stripe-cOBsT1Xj.webp",Bx="/kids-house-game/assets/wc-frosty-dots-DmQgGwJW.webp",Ax="/kids-house-game/assets/wc-mint-pine-5FYK_dVo.webp",Dx="/kids-house-game/assets/wc-peppermint-tiles-ChaNg2gF.webp",Ix="/kids-house-game/assets/wc-red-plaid-CcQ3BMhN.webp",Hx="/kids-house-game/assets/wc-snow-knit-DEFXSv74.webp",Ox="/kids-house-game/assets/wc-snowflake-sky-DrRAdoDP.webp",Jf={small:80,medium:150,large:260},Wx={"welcome-home":"Welcome Home","sunny-vibes":"Sunny Vibes",glossy:"Glossy",cottage:"Cozy Cottage",...H1,...V1},og=e=>Wx[e]??e.replace(/[-_]+/g," ").replace(/\b\w/g,t=>t.toUpperCase()),Ux=Object.assign({"../assets/items/manifest.json":qy,"../assets/patterns/manifest.json":Zy}),ep=Object.assign({"../assets/items/bedroom/alarm-clock.png":Ny,"../assets/items/bedroom/alarm-clock.svg":Fy,"../assets/items/bedroom/bedtime-snack.png":jy,"../assets/items/bedroom/bedtime-snack.svg":Gy,"../assets/items/bedroom/book-stack.png":Yy,"../assets/items/bedroom/book-stack.svg":Ky,"../assets/items/bedroom/bunk-bed.png":Xy,"../assets/items/bedroom/bunk-bed.svg":Jy,"../assets/items/bedroom/bunny-slippers.png":eb,"../assets/items/bedroom/bunny-slippers.svg":tb,"../assets/items/bedroom/canopy-bed.png":nb,"../assets/items/bedroom/canopy-bed.svg":sb,"../assets/items/bedroom/cat-bed.png":ob,"../assets/items/bedroom/cat-bed.svg":ib,"../assets/items/bedroom/cloud-rug.png":ab,"../assets/items/bedroom/cloud-rug.svg":rb,"../assets/items/bedroom/cloud-shelf.png":lb,"../assets/items/bedroom/cloud-shelf.svg":cb,"../assets/items/bedroom/cork-board.png":db,"../assets/items/bedroom/cork-board.svg":fb,"../assets/items/bedroom/daisy-pot.png":pb,"../assets/items/bedroom/daisy-pot.svg":hb,"../assets/items/bedroom/desk.png":gb,"../assets/items/bedroom/desk.svg":ub,"../assets/items/bedroom/dino-plush.png":mb,"../assets/items/bedroom/dino-plush.svg":yb,"../assets/items/bedroom/doll-house.png":bb,"../assets/items/bedroom/doll-house.svg":kb,"../assets/items/bedroom/dresser.png":wb,"../assets/items/bedroom/dresser.svg":vb,"../assets/items/bedroom/egg-chair.png":_b,"../assets/items/bedroom/egg-chair.svg":$b,"../assets/items/bedroom/floor-fan.png":xb,"../assets/items/bedroom/floor-fan.svg":Mb,"../assets/items/bedroom/guinea-pig.png":Lb,"../assets/items/bedroom/guinea-pig.svg":Eb,"../assets/items/bedroom/hamster-cage.png":Cb,"../assets/items/bedroom/hamster-cage.svg":Sb,"../assets/items/bedroom/heart-rug.png":Pb,"../assets/items/bedroom/heart-rug.svg":Tb,"../assets/items/bedroom/lava-lamp.png":Rb,"../assets/items/bedroom/lava-lamp.svg":Bb,"../assets/items/bedroom/moon-night-light.png":Ab,"../assets/items/bedroom/moon-night-light.svg":Db,"../assets/items/bedroom/nightstand.png":Ib,"../assets/items/bedroom/nightstand.svg":Hb,"../assets/items/bedroom/paper-lantern.png":Ob,"../assets/items/bedroom/paper-lantern.svg":Wb,"../assets/items/bedroom/piggy-bank.png":Ub,"../assets/items/bedroom/piggy-bank.svg":Vb,"../assets/items/bedroom/plant-stand.png":Qb,"../assets/items/bedroom/plant-stand.svg":zb,"../assets/items/bedroom/play-tent.png":qb,"../assets/items/bedroom/play-tent.svg":Zb,"../assets/items/bedroom/star-mobile.png":Nb,"../assets/items/bedroom/star-mobile.svg":Fb,"../assets/items/bedroom/toy-chest.png":jb,"../assets/items/bedroom/toy-chest.svg":Gb,"../assets/items/bedroom/toy-robot.png":Yb,"../assets/items/bedroom/toy-robot.svg":Kb,"../assets/items/bedroom/toy-train.png":Xb,"../assets/items/bedroom/toy-train.svg":Jb,"../assets/items/bedroom/unicorn-plush.png":ek,"../assets/items/bedroom/unicorn-plush.svg":tk,"../assets/items/bedroom/wardrobe.png":nk,"../assets/items/bedroom/wardrobe.svg":sk,"../assets/items/kitchen/bananas.png":ok,"../assets/items/kitchen/bananas.svg":ik,"../assets/items/kitchen/bar-stool.png":ak,"../assets/items/kitchen/bar-stool.svg":rk,"../assets/items/kitchen/bread-loaf.png":lk,"../assets/items/kitchen/bread-loaf.svg":ck,"../assets/items/kitchen/chick.png":dk,"../assets/items/kitchen/chick.svg":fk,"../assets/items/kitchen/china-hutch.png":pk,"../assets/items/kitchen/china-hutch.svg":hk,"../assets/items/kitchen/cocoa-mug.png":gk,"../assets/items/kitchen/cocoa-mug.svg":uk,"../assets/items/kitchen/cookie-jar.png":mk,"../assets/items/kitchen/cookie-jar.svg":yk,"../assets/items/kitchen/cooking-pot.png":bk,"../assets/items/kitchen/cooking-pot.svg":kk,"../assets/items/kitchen/cupcake.png":wk,"../assets/items/kitchen/cupcake.svg":vk,"../assets/items/kitchen/dish-rack.png":_k,"../assets/items/kitchen/dish-rack.svg":$k,"../assets/items/kitchen/fruit-bowl.png":xk,"../assets/items/kitchen/fruit-bowl.svg":Mk,"../assets/items/kitchen/frying-pan.png":Lk,"../assets/items/kitchen/frying-pan.svg":Ek,"../assets/items/kitchen/happy-fridge.png":Ck,"../assets/items/kitchen/happy-fridge.svg":Sk,"../assets/items/kitchen/herb-box.png":Pk,"../assets/items/kitchen/herb-box.svg":Tk,"../assets/items/kitchen/high-chair.png":Rk,"../assets/items/kitchen/high-chair.svg":Bk,"../assets/items/kitchen/ice-cream.png":Ak,"../assets/items/kitchen/ice-cream.svg":Dk,"../assets/items/kitchen/kettle.png":Ik,"../assets/items/kitchen/kettle.svg":Hk,"../assets/items/kitchen/kitchen-counter.png":Ok,"../assets/items/kitchen/kitchen-counter.svg":Wk,"../assets/items/kitchen/kitchen-sink.png":Uk,"../assets/items/kitchen/kitchen-sink.svg":Vk,"../assets/items/kitchen/lemon-tree.png":Qk,"../assets/items/kitchen/lemon-tree.svg":zk,"../assets/items/kitchen/microwave.png":qk,"../assets/items/kitchen/microwave.svg":Zk,"../assets/items/kitchen/milk-bottle.png":Nk,"../assets/items/kitchen/milk-bottle.svg":Fk,"../assets/items/kitchen/pancakes.png":jk,"../assets/items/kitchen/pancakes.svg":Gk,"../assets/items/kitchen/pantry-shelf.png":Yk,"../assets/items/kitchen/pantry-shelf.svg":Kk,"../assets/items/kitchen/pendant-lamp.png":Xk,"../assets/items/kitchen/pendant-lamp.svg":Jk,"../assets/items/kitchen/pet-bowl.png":ew,"../assets/items/kitchen/pet-bowl.svg":tw,"../assets/items/kitchen/rice-cooker.png":nw,"../assets/items/kitchen/rice-cooker.svg":sw,"../assets/items/kitchen/runner-rug.png":ow,"../assets/items/kitchen/runner-rug.svg":iw,"../assets/items/kitchen/spice-rack.png":aw,"../assets/items/kitchen/spice-rack.svg":rw,"../assets/items/kitchen/stand-mixer.png":lw,"../assets/items/kitchen/stand-mixer.svg":cw,"../assets/items/kitchen/teapot.png":dw,"../assets/items/kitchen/teapot.svg":fw,"../assets/items/kitchen/toaster.png":pw,"../assets/items/kitchen/toaster.svg":hw,"../assets/items/kitchen/utensil-rail.png":gw,"../assets/items/kitchen/utensil-rail.svg":uw,"../assets/items/kitchen/watermelon-slice.png":mw,"../assets/items/kitchen/watermelon-slice.svg":yw,"../assets/items/living/aquarium.png":bw,"../assets/items/living/aquarium.svg":kw,"../assets/items/living/arc-floor-lamp.png":ww,"../assets/items/living/arc-floor-lamp.svg":vw,"../assets/items/living/bean-bag.png":_w,"../assets/items/living/bean-bag.svg":$w,"../assets/items/living/bird-cage.png":xw,"../assets/items/living/bird-cage.svg":Mw,"../assets/items/living/blanket-basket.png":Lw,"../assets/items/living/blanket-basket.svg":Ew,"../assets/items/living/building-blocks.png":Cw,"../assets/items/living/building-blocks.svg":Sw,"../assets/items/living/coffee-table.png":Pw,"../assets/items/living/coffee-table.svg":Tw,"../assets/items/living/comfy-armchair.png":Rw,"../assets/items/living/comfy-armchair.svg":Bw,"../assets/items/living/cubby-shelf.png":Aw,"../assets/items/living/cubby-shelf.svg":Dw,"../assets/items/living/daisy-rug.png":Iw,"../assets/items/living/daisy-rug.svg":Hw,"../assets/items/living/fiddle-leaf-fig.png":Ow,"../assets/items/living/fiddle-leaf-fig.svg":Ww,"../assets/items/living/fireplace.png":Uw,"../assets/items/living/fireplace.svg":Vw,"../assets/items/living/globe.png":Qw,"../assets/items/living/globe.svg":zw,"../assets/items/living/hanging-planter.png":qw,"../assets/items/living/hanging-planter.svg":Zw,"../assets/items/living/monstera-plant.png":Nw,"../assets/items/living/monstera-plant.svg":Fw,"../assets/items/living/piano.png":jw,"../assets/items/living/piano.svg":Gw,"../assets/items/living/popcorn.png":Yw,"../assets/items/living/popcorn.svg":Kw,"../assets/items/living/pouf.png":Xw,"../assets/items/living/pouf.svg":Jw,"../assets/items/living/rainbow-rug.png":e4,"../assets/items/living/rainbow-rug.svg":t4,"../assets/items/living/rainbow-wall-art.png":n4,"../assets/items/living/rainbow-wall-art.svg":s4,"../assets/items/living/retro-radio.png":o4,"../assets/items/living/retro-radio.svg":i4,"../assets/items/living/rocking-chair.png":a4,"../assets/items/living/rocking-chair.svg":r4,"../assets/items/living/rocking-horse.png":l4,"../assets/items/living/rocking-horse.svg":c4,"../assets/items/living/snake-plant.png":d4,"../assets/items/living/snake-plant.svg":f4,"../assets/items/living/string-lights.png":p4,"../assets/items/living/string-lights.svg":h4,"../assets/items/living/succulent-trio.png":g4,"../assets/items/living/succulent-trio.svg":u4,"../assets/items/living/tassel-rug.png":m4,"../assets/items/living/tassel-rug.svg":y4,"../assets/items/living/throw-pillow.png":b4,"../assets/items/living/throw-pillow.svg":k4,"../assets/items/living/toy-car.png":w4,"../assets/items/living/toy-car.svg":v4,"../assets/items/living/tulip-vase.png":_4,"../assets/items/living/tulip-vase.svg":$4,"../assets/items/living/turtle.png":x4,"../assets/items/living/turtle.svg":M4,"../assets/items/living/tv-stand.png":L4,"../assets/items/living/tv-stand.svg":E4,"../assets/items/living/wall-shelf.png":C4,"../assets/items/living/wall-shelf.svg":S4,"../assets/items/packs/cottage/cc-bakery-shelf.png":P4,"../assets/items/packs/cottage/cc-bakery-shelf.svg":T4,"../assets/items/packs/cottage/cc-breakfast-table.png":R4,"../assets/items/packs/cottage/cc-breakfast-table.svg":B4,"../assets/items/packs/cottage/cc-bubble-chair.png":A4,"../assets/items/packs/cottage/cc-bubble-chair.svg":D4,"../assets/items/packs/cottage/cc-canopy-daybed.png":I4,"../assets/items/packs/cottage/cc-canopy-daybed.svg":H4,"../assets/items/packs/cottage/cc-cloud-beanbag.png":O4,"../assets/items/packs/cottage/cc-cloud-beanbag.svg":W4,"../assets/items/packs/cottage/cc-cloud-lamp.png":U4,"../assets/items/packs/cottage/cc-cloud-lamp.svg":V4,"../assets/items/packs/cottage/cc-cottage-aquarium.png":Q4,"../assets/items/packs/cottage/cc-cottage-aquarium.svg":z4,"../assets/items/packs/cottage/cc-cupcake-stand.png":q4,"../assets/items/packs/cottage/cc-cupcake-stand.svg":Z4,"../assets/items/packs/cottage/cc-dryer-chair.png":N4,"../assets/items/packs/cottage/cc-dryer-chair.svg":F4,"../assets/items/packs/cottage/cc-fairy-garland.png":j4,"../assets/items/packs/cottage/cc-fairy-garland.svg":G4,"../assets/items/packs/cottage/cc-fairy-shelf.png":Y4,"../assets/items/packs/cottage/cc-fairy-shelf.svg":K4,"../assets/items/packs/cottage/cc-flower-kettle.png":X4,"../assets/items/packs/cottage/cc-flower-kettle.svg":J4,"../assets/items/packs/cottage/cc-flower-lamp.png":e6,"../assets/items/packs/cottage/cc-flower-lamp.svg":t6,"../assets/items/packs/cottage/cc-heart-bed.png":n6,"../assets/items/packs/cottage/cc-heart-bed.svg":s6,"../assets/items/packs/cottage/cc-heart-clock.png":o6,"../assets/items/packs/cottage/cc-heart-clock.svg":i6,"../assets/items/packs/cottage/cc-heart-pouf.png":a6,"../assets/items/packs/cottage/cc-heart-pouf.svg":r6,"../assets/items/packs/cottage/cc-heart-rug.png":l6,"../assets/items/packs/cottage/cc-heart-rug.svg":c6,"../assets/items/packs/cottage/cc-jewel-box.png":d6,"../assets/items/packs/cottage/cc-jewel-box.svg":f6,"../assets/items/packs/cottage/cc-light-vanity.png":p6,"../assets/items/packs/cottage/cc-light-vanity.svg":h6,"../assets/items/packs/cottage/cc-macaron-jar.png":g6,"../assets/items/packs/cottage/cc-macaron-jar.svg":u6,"../assets/items/packs/cottage/cc-macrame-swing.png":m6,"../assets/items/packs/cottage/cc-macrame-swing.svg":y6,"../assets/items/packs/cottage/cc-mani-chair.png":b6,"../assets/items/packs/cottage/cc-mani-chair.svg":k6,"../assets/items/packs/cottage/cc-mint-fridge.png":w6,"../assets/items/packs/cottage/cc-mint-fridge.svg":v6,"../assets/items/packs/cottage/cc-mushroom-stool.png":_6,"../assets/items/packs/cottage/cc-mushroom-stool.svg":$6,"../assets/items/packs/cottage/cc-pastel-range.png":x6,"../assets/items/packs/cottage/cc-pastel-range.svg":M6,"../assets/items/packs/cottage/cc-perfume-tray.png":L6,"../assets/items/packs/cottage/cc-perfume-tray.svg":E6,"../assets/items/packs/cottage/cc-petal-table.png":C6,"../assets/items/packs/cottage/cc-petal-table.svg":S6,"../assets/items/packs/cottage/cc-plant-wall.png":P6,"../assets/items/packs/cottage/cc-plant-wall.svg":T6,"../assets/items/packs/cottage/cc-reading-nook.png":R6,"../assets/items/packs/cottage/cc-reading-nook.svg":B6,"../assets/items/packs/cottage/cc-record-player.png":A6,"../assets/items/packs/cottage/cc-record-player.svg":D6,"../assets/items/packs/cottage/cc-ribbon-mirror.png":I6,"../assets/items/packs/cottage/cc-ribbon-mirror.svg":H6,"../assets/items/packs/cottage/cc-scallop-curtains.png":O6,"../assets/items/packs/cottage/cc-scallop-curtains.svg":W6,"../assets/items/packs/cottage/cc-scallop-loveseat.png":U6,"../assets/items/packs/cottage/cc-scallop-loveseat.svg":V6,"../assets/items/packs/cottage/cc-star-dresser.png":Q6,"../assets/items/packs/cottage/cc-star-dresser.svg":z6,"../assets/items/packs/cottage/cc-teapot-set.png":q6,"../assets/items/packs/cottage/cc-teapot-set.svg":Z6,"../assets/items/packs/cottage/cc-window-seat.png":N6,"../assets/items/packs/cottage/cc-window-seat.svg":F6,"../assets/items/packs/glossy/arched-shelf.png":j6,"../assets/items/packs/glossy/arched-shelf.svg":G6,"../assets/items/packs/glossy/blob-rug.png":Y6,"../assets/items/packs/glossy/blob-rug.svg":K6,"../assets/items/packs/glossy/bubbly-plant.png":X6,"../assets/items/packs/glossy/bubbly-plant.svg":J6,"../assets/items/packs/glossy/bud-vase.png":ev,"../assets/items/packs/glossy/bud-vase.svg":tv,"../assets/items/packs/glossy/comb-brush.png":nv,"../assets/items/packs/glossy/comb-brush.svg":sv,"../assets/items/packs/glossy/cream-jars.png":ov,"../assets/items/packs/glossy/cream-jars.svg":iv,"../assets/items/packs/glossy/drop-lamp.png":av,"../assets/items/packs/glossy/drop-lamp.svg":rv,"../assets/items/packs/glossy/droplet-buddy.png":lv,"../assets/items/packs/glossy/droplet-buddy.svg":cv,"../assets/items/packs/glossy/fancy-sofa.png":dv,"../assets/items/packs/glossy/fancy-sofa.svg":fv,"../assets/items/packs/glossy/flower-cart.png":pv,"../assets/items/packs/glossy/flower-cart.svg":hv,"../assets/items/packs/glossy/foot-spa.png":gv,"../assets/items/packs/glossy/foot-spa.svg":uv,"../assets/items/packs/glossy/globe-pendants.png":mv,"../assets/items/packs/glossy/globe-pendants.svg":yv,"../assets/items/packs/glossy/glow-mirror.png":bv,"../assets/items/packs/glossy/glow-mirror.svg":kv,"../assets/items/packs/glossy/gold-floor-mirror.png":wv,"../assets/items/packs/glossy/gold-floor-mirror.svg":vv,"../assets/items/packs/glossy/hair-dryer.png":_v,"../assets/items/packs/glossy/hair-dryer.svg":$v,"../assets/items/packs/glossy/heart-plant.png":xv,"../assets/items/packs/glossy/heart-plant.svg":Mv,"../assets/items/packs/glossy/heart-pouf.png":Lv,"../assets/items/packs/glossy/heart-pouf.svg":Ev,"../assets/items/packs/glossy/lilac-curtain.png":Cv,"../assets/items/packs/glossy/lilac-curtain.svg":Sv,"../assets/items/packs/glossy/lotion-trio.png":Pv,"../assets/items/packs/glossy/lotion-trio.svg":Tv,"../assets/items/packs/glossy/mani-lamp.png":Rv,"../assets/items/packs/glossy/mani-lamp.svg":Bv,"../assets/items/packs/glossy/nail-table.png":Av,"../assets/items/packs/glossy/nail-table.svg":Dv,"../assets/items/packs/glossy/pebble-rug.png":Iv,"../assets/items/packs/glossy/pebble-rug.svg":Hv,"../assets/items/packs/glossy/perfume-bottle.png":Ov,"../assets/items/packs/glossy/perfume-bottle.svg":Wv,"../assets/items/packs/glossy/pink-fountain.png":Uv,"../assets/items/packs/glossy/pink-fountain.svg":Vv,"../assets/items/packs/glossy/pink-vanity.png":Qv,"../assets/items/packs/glossy/pink-vanity.svg":zv,"../assets/items/packs/glossy/polish-bottle.png":qv,"../assets/items/packs/glossy/polish-bottle.svg":Zv,"../assets/items/packs/glossy/polish-rack.png":Nv,"../assets/items/packs/glossy/polish-rack.svg":Fv,"../assets/items/packs/glossy/reception-desk.png":jv,"../assets/items/packs/glossy/reception-desk.svg":Gv,"../assets/items/packs/glossy/salon-chair.png":Yv,"../assets/items/packs/glossy/salon-chair.svg":Kv,"../assets/items/packs/glossy/scent-candle.png":Xv,"../assets/items/packs/glossy/scent-candle.svg":Jv,"../assets/items/packs/glossy/spray-bottle.png":e_,"../assets/items/packs/glossy/spray-bottle.svg":t_,"../assets/items/packs/glossy/star-wall-sign.png":n_,"../assets/items/packs/glossy/star-wall-sign.svg":s_,"../assets/items/packs/glossy/swivel-stool.png":o_,"../assets/items/packs/glossy/swivel-stool.svg":i_,"../assets/items/packs/glossy/tiered-tray.png":a_,"../assets/items/packs/glossy/tiered-tray.svg":r_,"../assets/items/packs/glossy/towel-cart.png":l_,"../assets/items/packs/glossy/towel-cart.svg":c_,"../assets/items/packs/glossy/towel-stack.png":d_,"../assets/items/packs/glossy/towel-stack.svg":f_,"../assets/items/packs/glossy/vine-planter.png":p_,"../assets/items/packs/glossy/vine-planter.svg":h_,"../assets/items/packs/glossy/waiting-bench.png":g_,"../assets/items/packs/glossy/waiting-bench.svg":u_,"../assets/items/packs/glossy/wash-chair.png":m_,"../assets/items/packs/glossy/wash-chair.svg":y_,"../assets/items/packs/halloween/hw-candy-bowl.webp":b_,"../assets/items/packs/halloween/hw-cat-statue.webp":k_,"../assets/items/packs/halloween/hw-cauldron.webp":w_,"../assets/items/packs/halloween/hw-ghost-sheet.webp":v_,"../assets/items/packs/halloween/hw-hay-bale.webp":__,"../assets/items/packs/halloween/hw-heart-pumpkin.webp":$_,"../assets/items/packs/halloween/hw-leaf-garland.webp":x_,"../assets/items/packs/halloween/hw-moon-cling.webp":M_,"../assets/items/packs/halloween/hw-moon-lantern.webp":L_,"../assets/items/packs/halloween/hw-star-pumpkin.webp":E_,"../assets/items/packs/halloween/hw-witch-hat.webp":C_,"../assets/items/packs/sunny-vibes/arched-mirror.png":S_,"../assets/items/packs/sunny-vibes/arched-mirror.svg":P_,"../assets/items/packs/sunny-vibes/big-monitor.png":T_,"../assets/items/packs/sunny-vibes/big-monitor.svg":R_,"../assets/items/packs/sunny-vibes/boba-cup.png":B_,"../assets/items/packs/sunny-vibes/boba-cup.svg":A_,"../assets/items/packs/sunny-vibes/bubble-bath.png":D_,"../assets/items/packs/sunny-vibes/bubble-bath.svg":I_,"../assets/items/packs/sunny-vibes/cactus-buddy.png":H_,"../assets/items/packs/sunny-vibes/cactus-buddy.svg":O_,"../assets/items/packs/sunny-vibes/caterpillar-plush.png":W_,"../assets/items/packs/sunny-vibes/caterpillar-plush.svg":U_,"../assets/items/packs/sunny-vibes/checker-bed.png":V_,"../assets/items/packs/sunny-vibes/checker-bed.svg":Q_,"../assets/items/packs/sunny-vibes/checker-rug.png":z_,"../assets/items/packs/sunny-vibes/checker-rug.svg":q_,"../assets/items/packs/sunny-vibes/clothes-rail.png":Z_,"../assets/items/packs/sunny-vibes/clothes-rail.svg":N_,"../assets/items/packs/sunny-vibes/cloud-sofa.png":F_,"../assets/items/packs/sunny-vibes/cloud-sofa.svg":j_,"../assets/items/packs/sunny-vibes/cube-shelf.png":G_,"../assets/items/packs/sunny-vibes/cube-shelf.svg":Y_,"../assets/items/packs/sunny-vibes/curvy-desk.png":K_,"../assets/items/packs/sunny-vibes/curvy-desk.svg":X_,"../assets/items/packs/sunny-vibes/cute-speaker.png":J_,"../assets/items/packs/sunny-vibes/cute-speaker.svg":e8,"../assets/items/packs/sunny-vibes/desk-lamp.png":t8,"../assets/items/packs/sunny-vibes/desk-lamp.svg":n8,"../assets/items/packs/sunny-vibes/desk-mic.png":s8,"../assets/items/packs/sunny-vibes/desk-mic.svg":o8,"../assets/items/packs/sunny-vibes/flower-lamp.png":i8,"../assets/items/packs/sunny-vibes/flower-lamp.svg":a8,"../assets/items/packs/sunny-vibes/frog-plush.png":r8,"../assets/items/packs/sunny-vibes/frog-plush.svg":l8,"../assets/items/packs/sunny-vibes/game-controller.png":c8,"../assets/items/packs/sunny-vibes/game-controller.svg":d8,"../assets/items/packs/sunny-vibes/gaming-chair.png":f8,"../assets/items/packs/sunny-vibes/gaming-chair.svg":p8,"../assets/items/packs/sunny-vibes/hamster-pet.png":h8,"../assets/items/packs/sunny-vibes/hamster-pet.svg":g8,"../assets/items/packs/sunny-vibes/headphones.png":u8,"../assets/items/packs/sunny-vibes/headphones.svg":m8,"../assets/items/packs/sunny-vibes/heart-light.png":y8,"../assets/items/packs/sunny-vibes/heart-light.svg":b8,"../assets/items/packs/sunny-vibes/keyboard.png":k8,"../assets/items/packs/sunny-vibes/keyboard.svg":w8,"../assets/items/packs/sunny-vibes/mini-fridge.png":v8,"../assets/items/packs/sunny-vibes/mini-fridge.svg":_8,"../assets/items/packs/sunny-vibes/pastel-wardrobe.png":$8,"../assets/items/packs/sunny-vibes/pastel-wardrobe.svg":x8,"../assets/items/packs/sunny-vibes/phone-stand.png":M8,"../assets/items/packs/sunny-vibes/phone-stand.svg":L8,"../assets/items/packs/sunny-vibes/pothos-plant.png":E8,"../assets/items/packs/sunny-vibes/pothos-plant.svg":C8,"../assets/items/packs/sunny-vibes/puffy-stool.png":S8,"../assets/items/packs/sunny-vibes/puffy-stool.svg":P8,"../assets/items/packs/sunny-vibes/ring-light.png":T8,"../assets/items/packs/sunny-vibes/ring-light.svg":R8,"../assets/items/packs/sunny-vibes/side-table-round.png":B8,"../assets/items/packs/sunny-vibes/side-table-round.svg":A8,"../assets/items/packs/sunny-vibes/star-lamp.png":D8,"../assets/items/packs/sunny-vibes/star-lamp.svg":I8,"../assets/items/packs/sunny-vibes/sticker-board.png":H8,"../assets/items/packs/sunny-vibes/sticker-board.svg":O8,"../assets/items/packs/sunny-vibes/sunny-art.png":W8,"../assets/items/packs/sunny-vibes/sunny-art.svg":U8,"../assets/items/packs/sunny-vibes/sv-bean-bag.png":V8,"../assets/items/packs/sunny-vibes/sv-bean-bag.svg":Q8,"../assets/items/packs/sunny-vibes/sv-cloud-rug.png":z8,"../assets/items/packs/sunny-vibes/sv-cloud-rug.svg":q8,"../assets/items/packs/sunny-vibes/sv-wall-shelf.png":Z8,"../assets/items/packs/sunny-vibes/sv-wall-shelf.svg":N8,"../assets/items/packs/sunny-vibes/vlog-camera.png":F8,"../assets/items/packs/sunny-vibes/vlog-camera.svg":j8,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.png":G8,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.svg":Y8,"../assets/items/packs/welcome-home/acorn-friend.png":K8,"../assets/items/packs/welcome-home/acorn-friend.svg":X8,"../assets/items/packs/welcome-home/apple-tree.png":J8,"../assets/items/packs/welcome-home/apple-tree.svg":e$,"../assets/items/packs/welcome-home/big-wardrobe.png":t$,"../assets/items/packs/welcome-home/big-wardrobe.svg":n$,"../assets/items/packs/welcome-home/box-stack.png":s$,"../assets/items/packs/welcome-home/box-stack.svg":o$,"../assets/items/packs/welcome-home/brick-fireplace.png":i$,"../assets/items/packs/welcome-home/brick-fireplace.svg":a$,"../assets/items/packs/welcome-home/bulletin-board.png":r$,"../assets/items/packs/welcome-home/bulletin-board.svg":l$,"../assets/items/packs/welcome-home/cozy-mug.png":c$,"../assets/items/packs/welcome-home/cozy-mug.svg":d$,"../assets/items/packs/welcome-home/cream-sofa.png":f$,"../assets/items/packs/welcome-home/cream-sofa.svg":p$,"../assets/items/packs/welcome-home/fire-pit.png":h$,"../assets/items/packs/welcome-home/fire-pit.svg":g$,"../assets/items/packs/welcome-home/glass-cabinet.png":u$,"../assets/items/packs/welcome-home/glass-cabinet.svg":m$,"../assets/items/packs/welcome-home/hanging-lantern.png":y$,"../assets/items/packs/welcome-home/hanging-lantern.svg":b$,"../assets/items/packs/welcome-home/knit-cushion.png":k$,"../assets/items/packs/welcome-home/knit-cushion.svg":w$,"../assets/items/packs/welcome-home/ladder-shelf.png":v$,"../assets/items/packs/welcome-home/ladder-shelf.svg":_$,"../assets/items/packs/welcome-home/landscape-art.png":$$,"../assets/items/packs/welcome-home/landscape-art.svg":x$,"../assets/items/packs/welcome-home/lattice-bench.png":M$,"../assets/items/packs/welcome-home/lattice-bench.svg":L$,"../assets/items/packs/welcome-home/leaf-wreath.png":E$,"../assets/items/packs/welcome-home/leaf-wreath.svg":C$,"../assets/items/packs/welcome-home/mini-greenhouse.png":S$,"../assets/items/packs/welcome-home/mini-greenhouse.svg":P$,"../assets/items/packs/welcome-home/moving-box.png":T$,"../assets/items/packs/welcome-home/moving-box.svg":R$,"../assets/items/packs/welcome-home/picnic-basket.png":B$,"../assets/items/packs/welcome-home/picnic-basket.svg":A$,"../assets/items/packs/welcome-home/round-rug.png":D$,"../assets/items/packs/welcome-home/round-rug.svg":I$,"../assets/items/packs/welcome-home/sale-sign.png":H$,"../assets/items/packs/welcome-home/sale-sign.svg":O$,"../assets/items/packs/welcome-home/sprout-pot.png":W$,"../assets/items/packs/welcome-home/sprout-pot.svg":U$,"../assets/items/packs/welcome-home/stripe-runner.png":V$,"../assets/items/packs/welcome-home/stripe-runner.svg":Q$,"../assets/items/packs/welcome-home/trailing-plant.png":z$,"../assets/items/packs/welcome-home/trailing-plant.svg":q$,"../assets/items/packs/welcome-home/wall-clock.png":Z$,"../assets/items/packs/welcome-home/wall-clock.svg":N$,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.png":F$,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.svg":j$,"../assets/items/packs/welcome-home/wh-book-stack.png":G$,"../assets/items/packs/welcome-home/wh-book-stack.svg":Y$,"../assets/items/packs/welcome-home/wh-dresser.png":K$,"../assets/items/packs/welcome-home/wh-dresser.svg":X$,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.png":J$,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.svg":e3,"../assets/items/packs/welcome-home/wh-kitchen-counter.png":t3,"../assets/items/packs/welcome-home/wh-kitchen-counter.svg":n3,"../assets/items/packs/welcome-home/wh-nightstand.png":s3,"../assets/items/packs/welcome-home/wh-nightstand.svg":o3,"../assets/items/packs/welcome-home/wh-pendant-lamp.png":i3,"../assets/items/packs/welcome-home/wh-pendant-lamp.svg":a3,"../assets/items/packs/welcome-home/wh-snake-plant.png":r3,"../assets/items/packs/welcome-home/wh-snake-plant.svg":l3,"../assets/items/packs/welcome-home/wh-string-lights.png":c3,"../assets/items/packs/welcome-home/wh-string-lights.svg":d3,"../assets/items/packs/welcome-home/wh-teapot.png":f3,"../assets/items/packs/welcome-home/wh-teapot.svg":p3,"../assets/items/packs/welcome-home/wood-armchair.png":h3,"../assets/items/packs/welcome-home/wood-armchair.svg":g3,"../assets/items/packs/welcome-home/wood-bookshelf.png":u3,"../assets/items/packs/welcome-home/wood-bookshelf.svg":m3,"../assets/items/packs/welcome-home/wood-coffee-table.png":y3,"../assets/items/packs/welcome-home/wood-coffee-table.svg":b3,"../assets/items/packs/welcome-home/wood-desk.png":k3,"../assets/items/packs/welcome-home/wood-desk.svg":w3,"../assets/items/packs/welcome-home/wood-stool.png":v3,"../assets/items/packs/welcome-home/wood-stool.svg":_3,"../assets/items/packs/welcome-home/wooden-bed.png":$3,"../assets/items/packs/welcome-home/wooden-bed.svg":x3,"../assets/items/packs/winter/wc-bauble-garland.webp":M3,"../assets/items/packs/winter/wc-berry-wreath.webp":L3,"../assets/items/packs/winter/wc-birch-basket.webp":E3,"../assets/items/packs/winter/wc-cabin-picture.webp":C3,"../assets/items/packs/winter/wc-candle-trio.webp":S3,"../assets/items/packs/winter/wc-cane-lamp.webp":P3,"../assets/items/packs/winter/wc-cinnamon-tray.webp":T3,"../assets/items/packs/winter/wc-cocoa-cart.webp":R3,"../assets/items/packs/winter/wc-cocoa-mug.webp":B3,"../assets/items/packs/winter/wc-cocoa-pot.webp":A3,"../assets/items/packs/winter/wc-cookie-oven.webp":D3,"../assets/items/packs/winter/wc-cookie-plate.webp":I3,"../assets/items/packs/winter/wc-frost-bookcase.webp":H3,"../assets/items/packs/winter/wc-frosted-pine.webp":O3,"../assets/items/packs/winter/wc-fur-bench.webp":W3,"../assets/items/packs/winter/wc-gingerbread-village.webp":U3,"../assets/items/packs/winter/wc-gingerbread.webp":V3,"../assets/items/packs/winter/wc-globe-lamp.webp":Q3,"../assets/items/packs/winter/wc-holiday-tree.webp":z3,"../assets/items/packs/winter/wc-holly.webp":q3,"../assets/items/packs/winter/wc-ice-skates.webp":Z3,"../assets/items/packs/winter/wc-ice-wardrobe.webp":N3,"../assets/items/packs/winter/wc-knit-armchair.webp":F3,"../assets/items/packs/winter/wc-lantern.webp":j3,"../assets/items/packs/winter/wc-log-bench.webp":G3,"../assets/items/packs/winter/wc-marshmallow-jar.webp":Y3,"../assets/items/packs/winter/wc-mitten-line.webp":K3,"../assets/items/packs/winter/wc-mitten-ottoman.webp":X3,"../assets/items/packs/winter/wc-mug-shelf.webp":J3,"../assets/items/packs/winter/wc-nutcracker.webp":e5,"../assets/items/packs/winter/wc-penguin-chair.webp":t5,"../assets/items/packs/winter/wc-penguin-plush.webp":n5,"../assets/items/packs/winter/wc-peppermint-counter.webp":s5,"../assets/items/packs/winter/wc-peppermint-rug.webp":o5,"../assets/items/packs/winter/wc-pinecone-garland.webp":i5,"../assets/items/packs/winter/wc-pinecone-table.webp":a5,"../assets/items/packs/winter/wc-plaid-bed.webp":r5,"../assets/items/packs/winter/wc-plaid-sofa.webp":l5,"../assets/items/packs/winter/wc-poinsettia.webp":c5,"../assets/items/packs/winter/wc-polar-plush.webp":d5,"../assets/items/packs/winter/wc-pom-rug.webp":f5,"../assets/items/packs/winter/wc-present-stack.webp":p5,"../assets/items/packs/winter/wc-reindeer.webp":h5,"../assets/items/packs/winter/wc-sled-table.webp":g5,"../assets/items/packs/winter/wc-sleigh-planter.webp":u5,"../assets/items/packs/winter/wc-snow-globe.webp":m5,"../assets/items/packs/winter/wc-snow-mobile.webp":y5,"../assets/items/packs/winter/wc-snow-nightstand.webp":b5,"../assets/items/packs/winter/wc-snow-window.webp":k5,"../assets/items/packs/winter/wc-snowman.webp":w5,"../assets/items/packs/winter/wc-snowshoes.webp":v5,"../assets/items/packs/winter/wc-sock-hamper.webp":_5,"../assets/items/packs/winter/wc-star-topper.webp":$5,"../assets/items/packs/winter/wc-stocking-row.webp":x5,"../assets/items/packs/winter/wc-stone-hearth.webp":M5,"../assets/items/packs/winter/wc-twinkle-lamp.webp":L5,"../assets/items/packs/winter/wc-twinkle-string.webp":E5,"../assets/items/packs/winter/wc-window-seat.webp":C5,"../assets/items/packs/winter/wc-woodstove.webp":S5}),tp=Object.assign({"../assets/patterns/cottage/cc-butter-polka.png":P5,"../assets/patterns/cottage/cc-butter-polka.svg":T5,"../assets/patterns/cottage/cc-cream-hex.png":R5,"../assets/patterns/cottage/cc-cream-hex.svg":B5,"../assets/patterns/cottage/cc-lavender-lattice.png":A5,"../assets/patterns/cottage/cc-lavender-lattice.svg":D5,"../assets/patterns/cottage/cc-lilac-gingham.png":I5,"../assets/patterns/cottage/cc-lilac-gingham.svg":H5,"../assets/patterns/cottage/cc-mint-checks.png":O5,"../assets/patterns/cottage/cc-mint-checks.svg":W5,"../assets/patterns/cottage/cc-mint-florals.png":U5,"../assets/patterns/cottage/cc-mint-florals.svg":V5,"../assets/patterns/cottage/cc-peach-scallops.png":Q5,"../assets/patterns/cottage/cc-peach-scallops.svg":z5,"../assets/patterns/cottage/cc-pink-plaid.png":q5,"../assets/patterns/cottage/cc-pink-plaid.svg":Z5,"../assets/patterns/cottage/cc-rag-planks.png":N5,"../assets/patterns/cottage/cc-rag-planks.svg":F5,"../assets/patterns/cottage/cc-rose-herringbone.png":j5,"../assets/patterns/cottage/cc-rose-herringbone.svg":G5,"../assets/patterns/glossy/lilac-stripes.png":Y5,"../assets/patterns/glossy/lilac-stripes.svg":K5,"../assets/patterns/glossy/lilac-terrazzo.png":X5,"../assets/patterns/glossy/lilac-terrazzo.svg":J5,"../assets/patterns/glossy/mint-bubbles.png":ex,"../assets/patterns/glossy/mint-bubbles.svg":tx,"../assets/patterns/glossy/pink-check-floor.png":nx,"../assets/patterns/glossy/pink-check-floor.svg":sx,"../assets/patterns/glossy/pink-hearts.png":ox,"../assets/patterns/glossy/pink-hearts.svg":ix,"../assets/patterns/nursery/cloud-sky.svg":ax,"../assets/patterns/nursery/pastel-planks.svg":rx,"../assets/patterns/nursery/soft-carpet.svg":lx,"../assets/patterns/nursery/star-sprinkle.svg":cx,"../assets/patterns/nursery/tiny-hearts.svg":dx,"../assets/patterns/sunny-vibes/butter-check-floor.png":fx,"../assets/patterns/sunny-vibes/butter-check-floor.svg":px,"../assets/patterns/sunny-vibes/mint-checks.png":hx,"../assets/patterns/sunny-vibes/mint-checks.svg":gx,"../assets/patterns/sunny-vibes/sky-clouds.png":ux,"../assets/patterns/sunny-vibes/sky-clouds.svg":mx,"../assets/patterns/sunny-vibes/sky-tiles.png":yx,"../assets/patterns/sunny-vibes/sky-tiles.svg":bx,"../assets/patterns/sunny-vibes/sunny-stars.png":kx,"../assets/patterns/sunny-vibes/sunny-stars.svg":wx,"../assets/patterns/welcome-home/leafy-cream.png":vx,"../assets/patterns/welcome-home/leafy-cream.svg":_x,"../assets/patterns/welcome-home/orange-gingham.png":$x,"../assets/patterns/welcome-home/orange-gingham.svg":xx,"../assets/patterns/welcome-home/terracotta-tiles.png":Mx,"../assets/patterns/welcome-home/terracotta-tiles.svg":Lx,"../assets/patterns/welcome-home/wood-panel.png":Ex,"../assets/patterns/welcome-home/wood-panel.svg":Cx,"../assets/patterns/welcome-home/wood-planks.png":Sx,"../assets/patterns/welcome-home/wood-planks.svg":Px,"../assets/patterns/winter/wc-cabin-planks.webp":Tx,"../assets/patterns/winter/wc-candy-stripe.webp":Rx,"../assets/patterns/winter/wc-frosty-dots.webp":Bx,"../assets/patterns/winter/wc-mint-pine.webp":Ax,"../assets/patterns/winter/wc-peppermint-tiles.webp":Dx,"../assets/patterns/winter/wc-red-plaid.webp":Ix,"../assets/patterns/winter/wc-snow-knit.webp":Hx,"../assets/patterns/winter/wc-snowflake-sky.webp":Ox});function Vx(e,t){if(!e||!e.trim())return[];try{const n=JSON.parse(e);return(Array.isArray(n)?n:[...Array.isArray(n?.items)?n.items:[],...Array.isArray(n?.patterns)?n.patterns:[]]).filter(o=>o&&typeof o.slug=="string"&&o.slug.trim())}catch(n){return console.warn(`[packs] ${t} is not valid JSON; ignoring`,n),[]}}const ig=Object.entries(Ux).flatMap(([e,t])=>Vx(t,e)),Qx=["svg","png","webp","SVG","PNG","WEBP"];function ag(e,t,n,s){for(const i of Qx){const a=e[`../assets/${t}/${n}/${s}.${i}`];if(a)return a}const o=Object.keys(e).find(i=>i.split("/").pop().replace(/\.\w+$/,"")===s);return o?e[o]:void 0}const np={furniture:"furniture",appliance:"furniture",appliances:"furniture",seating:"furniture",storage:"furniture",bed:"furniture",table:"furniture",decor:"decor",rug:"decor",rugs:"decor",lighting:"decor",light:"decor",lamp:"decor",toy:"decor",toys:"decor","wall-art":"decor",art:"decor",beauty:"decor",plant:"plants",plants:"plants",flower:"plants",flowers:"plants",food:"food",drink:"food",drinks:"food",snack:"food",pet:"pets",pets:"pets",animal:"pets",animals:"pets"};function zx(e){const t=typeof e=="string"?e.trim().toLowerCase():"";return np[t]??np[t.replace(/s$/,"")]??"decor"}const wo=(e,t)=>typeof e=="string"&&e.trim()?e.trim().toLowerCase():t,rg=e=>["wallpaper","floor"].includes(wo(e.type,"")),sp=new Set,qx=ig.filter(e=>!rg(e)).flatMap(e=>{const t=wo(e.room,"any"),n=e.slug.trim();if(sp.has(n))return[];sp.add(n);const o=[e.svg,e.png].filter(g=>typeof g=="string").map(g=>ep["../assets/items/"+g.replace(/^\.?\//,"")]).find(Boolean)??ag(ep,"items",t,n);if(!o)return console.warn(`[packs] no image for items/${t}/${n}`),[];const i=wo(e.pack,""),a=wo(e.size,"medium"),r=zx(e.category),l=typeof e.gameW=="number"&&e.gameW>20&&e.gameW<800?e.gameW:Jf[a]??Jf.medium,c=typeof e.widthUnits=="number"&&typeof e.heightUnits=="number"&&e.widthUnits>0&&e.heightUnits>0?e.heightUnits/e.widthUnits:1,d=Math.round(l*Math.min(4,Math.max(.2,c))),f=typeof e.holdable=="boolean"?e.holdable:a!=="large"&&r!=="furniture",p=e.tag==="lighting"||/lamp|light|lantern|candle/i.test(n);return[{kind:`pack:${n}`,name:e.name||n,cat:r,rooms:[t],w:l,h:d,wall:e.wall===!0||void 0,svg:"",img:o,pack:i||void 0,holdable:f,light:p||void 0}]}),gc=ig.filter(rg).flatMap(e=>{const t=wo(e.pack,"extra"),n=e.slug.trim(),o=[e.svg,e.png].filter(i=>typeof i=="string").map(i=>tp["../assets/patterns/"+i.replace(/^\.?\//,"")]).find(Boolean)??ag(tp,"patterns",t,n);return o?[{id:`${t}/${n}`,name:e.name||n,pack:t,kind:wo(e.type,"wallpaper"),url:o}]:(console.warn(`[packs] no image for patterns/${t}/${n}`),[])}),op=Object.fromEntries(gc.map(e=>[e.id,e])),Ln="#5a3d5c",I=`stroke="${Ln}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,lg=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="2.4" fill="${Ln}"/><circle cx="${t}" cy="${n}" r="2.4" fill="${Ln}"/><circle cx="${e+.8}" cy="${n-.8}" r=".8" fill="#fff"/><circle cx="${t+.8}" cy="${n-.8}" r=".8" fill="#fff"/>`,cg=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/><ellipse cx="${t}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/>`,tt='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>';function Ll(e,t,n){return`${tt}<ellipse cx="50" cy="78" rx="28" ry="16" fill="${t}" ${I}/><path d="M24 62 Q50 48 76 62 V78 Q50 92 24 78 Z" fill="${t}" ${I}/>
    <circle cx="50" cy="40" r="18" fill="${e}" ${I}/>${lg(43,57,40)}${cg(38,62,48)}<path d="M46 50 q4 3 8 0" fill="none" ${I}/>
    <path d="M38 26 Q50 16 62 26" fill="${n}" ${I}/><circle cx="50" cy="24" r="3" fill="${n}" ${I}/>`}const dg=[{kind:"crib",name:"Crib",cat:"furniture",w:260,svg:`${tt}<rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${I}/><path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${I}/><rect x="6" y="22" width="88" height="12" rx="6" fill="#9ad7f5" ${I}/><rect x="14" y="48" width="72" height="16" rx="6" fill="#ffe0ec"/><ellipse cx="32" cy="56" rx="8" ry="5" fill="#fff" ${I}/><ellipse cx="50" cy="56" rx="8" ry="5" fill="#c9e7ff" ${I}/>`},{kind:"bassinet",name:"Bassinet",cat:"furniture",w:170,svg:`${tt}<path d="M18 78 Q8 78 10 64 L22 36 H78 L90 64 Q92 78 82 78 Z" fill="#fff" ${I}/><ellipse cx="50" cy="36" rx="32" ry="10" fill="#fff" ${I}/><path d="M22 40 Q50 52 78 40" fill="#ffe0ec" ${I}/><ellipse cx="50" cy="44" rx="16" ry="7" fill="#fff"/><path d="M30 78 L22 94 M70 78 L78 94" ${I}/><ellipse cx="50" cy="90" rx="28" ry="4" fill="none" ${I}/><path d="M14 22 Q50 4 86 22" fill="none" stroke="#9ad7f5" stroke-width="6" stroke-linecap="round"/>`},{kind:"rocker",name:"Rocker",cat:"furniture",w:190,svg:`${tt}<path d="M16 88 Q50 98 84 88" fill="none" ${I}/><path d="M28 84 Q50 74 72 84" fill="#c9a0dc" ${I}/><rect x="30" y="28" width="40" height="36" rx="12" fill="#e4ccf2" ${I}/><path d="M22 48 Q18 70 30 80 H70 Q82 70 78 48 Z" fill="#f6e6ff" ${I}/><rect x="36" y="58" width="28" height="12" rx="6" fill="#ffc8dd" ${I}/><circle cx="50" cy="40" r="6" fill="#fff" opacity=".7"/>`},{kind:"changing-table",name:"Changing Table",cat:"furniture",w:230,svg:`${tt}<rect x="8" y="36" width="84" height="16" rx="8" fill="#fff" ${I}/><rect x="14" y="40" width="72" height="8" rx="4" fill="#ffd6e8"/><rect x="16" y="52" width="28" height="32" rx="6" fill="#bde0fe" ${I}/><rect x="56" y="52" width="28" height="32" rx="6" fill="#c9f0d8" ${I}/><path d="M22 60 H38 M22 68 H38 M62 60 H78 M62 68 H78" ${I}/><rect x="18" y="84" width="8" height="10" rx="2" fill="${Ln}"/><rect x="74" y="84" width="8" height="10" rx="2" fill="${Ln}"/><rect x="34" y="22" width="18" height="12" rx="3" fill="#ffe0ec" ${I}/><rect x="54" y="24" width="16" height="10" rx="3" fill="#fff6d8" ${I}/>`},{kind:"toy-bin",name:"Toy Bin",cat:"furniture",w:150,svg:`${tt}<path d="M14 40 H86 L78 90 H22 Z" fill="#ffd166" ${I}/><rect x="10" y="32" width="80" height="14" rx="7" fill="#ffe08a" ${I}/><circle cx="36" cy="58" r="8" fill="#ff8fab" ${I}/><rect x="50" y="50" width="16" height="16" rx="3" fill="#8ecae6" ${I}/><circle cx="62" cy="70" r="6" fill="#90e0a8" ${I}/>`},{kind:"baby-shelf",name:"Bookshelf",cat:"furniture",w:150,svg:`${tt}<rect x="14" y="8" width="72" height="84" rx="8" fill="#f3d2b5" ${I}/><path d="M14 36 H86 M14 64 H86" ${I}/><rect x="22" y="14" width="8" height="18" rx="2" fill="#ff8fab" ${I}/><rect x="32" y="18" width="8" height="14" rx="2" fill="#8ecae6" ${I}/><rect x="44" y="14" width="8" height="18" rx="2" fill="#ffd166" ${I}/><rect x="58" y="16" width="8" height="16" rx="2" fill="#90e0a8" ${I}/><circle cx="34" cy="50" r="7" fill="#ffadad" ${I}/><rect x="50" y="44" width="18" height="14" rx="3" fill="#c9a0dc" ${I}/><ellipse cx="40" cy="78" rx="14" ry="8" fill="#fff" ${I}/>`},{kind:"doll-rose",name:"Rose Doll",cat:"decor",w:80,svg:Ll("#f6d3b0","#ffc2d4","#ff8fab")},{kind:"doll-honey",name:"Honey Doll",cat:"decor",w:80,svg:Ll("#e0ac69","#cdeffd","#ffd166")},{kind:"doll-cocoa",name:"Cocoa Doll",cat:"decor",w:80,svg:Ll("#8d5524","#d8f3dc","#c9a0dc")},{kind:"crib-mobile",name:"Crib Mobile",cat:"decor",w:150,wall:!0,svg:`<path d="M50 6 V22" ${I}/><ellipse cx="50" cy="28" rx="28" ry="8" fill="#fff" ${I}/><path d="M28 32 V48 M50 36 V58 M72 32 V48" ${I}/><circle cx="28" cy="56" r="8" fill="#ffd166" ${I}/><circle cx="50" cy="68" r="9" fill="#ff8fab" ${I}/><path d="M72 56 l6 4 -6 4 -6 -4 z" fill="#8ecae6" ${I}/><circle cx="28" cy="54" r="2" fill="#fff"/><circle cx="50" cy="66" r="2" fill="#fff"/>`},{kind:"night-light",name:"Night Light",cat:"decor",w:70,svg:`${tt}<circle cx="50" cy="46" r="22" fill="#fff6c8" ${I}/><circle cx="50" cy="46" r="12" fill="#ffe08a"/><path d="M50 18 V10 M30 26 L24 20 M70 26 L76 20 M24 46 H14 M86 46 H76" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><rect x="40" y="70" width="20" height="16" rx="4" fill="#c9a0dc" ${I}/><circle cx="50" cy="78" r="3" fill="#ff8fab"/>`},{kind:"bunny-plush",name:"Bunny Plush",cat:"decor",w:90,svg:`${tt}<ellipse cx="34" cy="28" rx="8" ry="18" fill="#fff" ${I}/><ellipse cx="66" cy="28" rx="8" ry="18" fill="#fff" ${I}/><ellipse cx="34" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="66" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="50" cy="74" rx="26" ry="18" fill="#fff" ${I}/><circle cx="50" cy="50" r="20" fill="#fff" ${I}/>${lg(43,57,50)}<path d="M47 58 l3 3 3 -3" fill="none" ${I}/>${cg(38,62,58)}`},{kind:"stacking-rings",name:"Stacking Rings",cat:"decor",w:70,svg:`${tt}<ellipse cx="50" cy="86" rx="26" ry="7" fill="#ff8fab" ${I}/><ellipse cx="50" cy="74" rx="20" ry="6" fill="#ffd166" ${I}/><ellipse cx="50" cy="64" rx="15" ry="5" fill="#8ecae6" ${I}/><ellipse cx="50" cy="56" rx="10" ry="4" fill="#90e0a8" ${I}/><rect x="46" y="28" width="8" height="40" rx="4" fill="#c9a0dc" ${I}/><circle cx="50" cy="24" r="7" fill="#ffb3c6" ${I}/>`},{kind:"rattle",name:"Rattle",cat:"decor",w:60,svg:`${tt}<circle cx="38" cy="40" r="20" fill="#ffd166" ${I}/><circle cx="32" cy="34" r="5" fill="#fff" opacity=".7"/><rect x="50" y="52" width="10" height="28" rx="5" fill="#ff8fab" ${I} transform="rotate(-20 55 66)"/><circle cx="68" cy="82" r="8" fill="#8ecae6" ${I}/>`},{kind:"baby-bottle",name:"Baby Bottle",cat:"food",w:55,svg:`${tt}<rect x="36" y="8" width="28" height="12" rx="4" fill="#c9a0dc" ${I}/><rect x="42" y="18" width="16" height="8" fill="#fff" ${I}/><path d="M30 30 H70 L66 88 Q50 96 34 88 Z" fill="#e7f6ff" ${I}/><path d="M32 48 H68 L66 80 Q50 88 34 80 Z" fill="#fff" opacity=".85"/><rect x="34" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="46" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="58" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/>`},{kind:"blocks",name:"Baby Blocks",cat:"decor",w:90,svg:`${tt}<rect x="14" y="58" width="28" height="28" rx="4" fill="#ff8fab" ${I}/><rect x="40" y="46" width="28" height="28" rx="4" fill="#ffd166" ${I}/><rect x="28" y="28" width="26" height="26" rx="4" fill="#8ecae6" ${I}/><path d="M20 72 H36 M48 60 H62 M34 42 H48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"rocking-horse",name:"Little Rocking Horse",cat:"decor",w:180,svg:`${tt}<path d="M12 86 Q50 98 88 82" fill="none" ${I}/><ellipse cx="48" cy="62" rx="26" ry="14" fill="#e6b88a" ${I}/><path d="M62 58 L84 40 Q92 36 90 48 L74 64 Z" fill="#f0d0b0" ${I}/><circle cx="82" cy="42" r="3" fill="${Ln}"/><path d="M70 36 L76 24 L84 34" fill="#ff8fab" ${I}/><rect x="36" y="48" width="16" height="8" rx="3" fill="#c9a0dc" ${I}/><path d="M30 70 L22 84 M58 72 L66 86" ${I}/>`},{kind:"music-box",name:"Music Box",cat:"decor",w:80,svg:`${tt}<rect x="22" y="40" width="56" height="46" rx="8" fill="#f6d6ff" ${I}/><path d="M22 40 L50 22 L78 40" fill="#e4ccf2" ${I}/><circle cx="50" cy="64" r="10" fill="#fff" ${I}/><path d="M50 58 V70 M44 64 H56" ${I}/><circle cx="50" cy="30" r="4" fill="#ffd166" ${I}/>`},{kind:"cloud-rug",name:"Nursery Cloud Rug",cat:"decor",w:340,svg:`<ellipse cx="50" cy="78" rx="46" ry="16" fill="#e7f6ff" ${I}/><circle cx="28" cy="70" r="16" fill="#f4fbff" ${I}/><circle cx="50" cy="62" r="18" fill="#fff" ${I}/><circle cx="72" cy="70" r="16" fill="#f4fbff" ${I}/><ellipse cx="50" cy="78" rx="30" ry="8" fill="#d6f0ff"/>`},{kind:"play-mat",name:"Play Mat",cat:"decor",w:300,svg:`<rect x="6" y="62" width="88" height="30" rx="14" fill="#ffe0ec" ${I}/><path d="M50 70 C42 62 30 64 34 74 C38 82 50 88 50 88 C50 88 62 82 66 74 C70 64 58 62 50 70 Z" fill="#ff8fab" ${I}/><circle cx="22" cy="76" r="5" fill="#ffd166" ${I}/><circle cx="78" cy="76" r="5" fill="#8ecae6" ${I}/>`},{kind:"moon-art",name:"Moon and Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M58 18 A28 28 0 1 0 58 78 A18 18 0 1 1 58 18 Z" fill="#fff3b0" ${I}/><path d="M22 30 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1 z" fill="#ffd166" ${I}/><path d="M78 58 l2 5 5 1 -4 4 1 5 -4 -3 -4 3 1 -5 -4 -4 5 -1 z" fill="#c9e7ff" ${I}/>`},{kind:"nursery-dresser",name:"Nursery Dresser",cat:"furniture",w:170,svg:`${tt}<rect x="14" y="22" width="72" height="68" rx="8" fill="#f6e2c4" ${I}/><path d="M14 44 H86 M14 66 H86" ${I}/><circle cx="50" cy="34" r="3" fill="${Ln}"/><circle cx="50" cy="55" r="3" fill="${Ln}"/><circle cx="50" cy="76" r="3" fill="${Ln}"/><rect x="30" y="10" width="18" height="12" rx="3" fill="#ffc2d4" ${I}/><rect x="52" y="12" width="16" height="10" rx="3" fill="#c9e7ff" ${I}/>`},{kind:"nursery-lamp",name:"Nursery Lamp",cat:"decor",w:80,svg:`${tt}<path d="M28 42 L36 12 H64 L72 42 Z" fill="#fff6c8" ${I}/><rect x="46" y="42" width="8" height="40" rx="4" fill="#c9a0dc" ${I}/><ellipse cx="50" cy="88" rx="20" ry="6" fill="#b388d6" ${I}/><circle cx="46" cy="24" r="3" fill="#fff" opacity=".85"/><path d="M34 20 q6 -8 4 -2" fill="none" stroke="#ffd166" stroke-width="2"/>`},{kind:"nursery-curtains",name:"Curtains",cat:"decor",w:180,wall:!0,svg:`<rect x="16" y="10" width="68" height="50" rx="6" fill="#cfefff" ${I}/><path d="M50 10 V60 M16 34 H84" ${I}/><path d="M8 8 Q18 28 10 92" fill="#ffd6e8" ${I}/><path d="M92 8 Q82 28 90 92" fill="#ffd6e8" ${I}/><rect x="6" y="6" width="88" height="8" rx="3" fill="#f3d2b5" ${I}/>`}],ot="#5a3d5c",$=(e=3.5)=>`stroke="${ot}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function we(e,t,n){const s=Math.round(t*.62);return`<ellipse cx="${e}" cy="${n}" rx="${t}" ry="3.4" fill="${ot}" opacity=".08"/><ellipse cx="${e}" cy="${(n+1.2).toFixed(1)}" rx="${s}" ry="1.55" fill="${ot}" opacity=".12"/>`}function oe(e,t=2.2){return`<path d="${e}" fill="none" stroke="#fff" stroke-width="${t}" stroke-linecap="round" opacity=".75"/>`}function rt(e,t=1.15){return`<path d="${e}" fill="none" stroke="${ot}" stroke-width="${t}" stroke-linecap="round" opacity=".2"/>`}function wd(e,t,n=".7"){return`<radialGradient id="${e}" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="${t}" stop-opacity="${n}"/><stop offset="1" stop-color="${t}" stop-opacity="0"/></radialGradient>`}function vd(e,t,n){return`<linearGradient id="${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t}"/><stop offset="1" stop-color="${n}"/></linearGradient>`}function Zx(){return typeof location>"u"?!1:/(?:^|[?&])yard=1(?:&|$)/.test(location.search)}function uc(){return typeof location>"u"?"":new URLSearchParams(location.search).get("shot")||""}const Nx={v:1,hair:"pigtails",hairC:"#a0522d",skin:"#f6d2b5",eyes:"big",eyeC:"#5a321c",freckles:!0,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"skirt",bottomC:"#c9a0dc",dress:"sundress",dressC:"#ff8fab",shoes:"maryjanes",shoesC:"#ffd166",acc:["bow"],accC:"#ff7aa8"},Fx=()=>$i(Nx),mc=864,yc={x:1084,y:578,flip:!0},Xn={x:1184,y:255},ip={x:1146,y:578},bc={x:940,y:540,flip:!0},or=1160,fg={x:824,y:398,w:96,h:230},pg={x:996,y:372,w:82,h:196},jx=[{kind:"yard-swing",x:1266,y:580,scale:132/280},{kind:"lemonade-cart",x:1254,y:471},{kind:"sandbox",x:940,y:482},{kind:"picnic-blanket",x:939,y:420}];function ve(e){return{kind:e.kind,name:e.name,cat:e.cat,w:e.w,h:e.h,vb:e.vb,wall:e.wall,holdable:e.holdable??!1,rooms:["backyard"],svg:e.svg}}const Gx=ve({kind:"yard-swing",name:"A-Frame Swing",cat:"furniture",w:280,h:215,vb:"0 0 130 100",svg:`${we(65,54,96)}
    <path d="M34 18 L50 18 L20 94 H4 Z" fill="#f3d2aa" ${$()}/>
    <path d="M42 24 L50 18 L18 70 H28 Z" fill="#d4a373"/>
    <path d="M80 18 L96 18 L126 94 H110 Z" fill="#e7c49a" ${$()}/>
    <path d="M108 22 L96 18 L126 94 H118 Z" fill="#c99366"/>
    ${rt("M16 50 l8 28 M112 48 l8 30")}
    <rect x="22" y="6" width="86" height="14" rx="2" fill="#f6e0c4" ${$()}/>
    <rect x="86" y="9" width="18" height="8" rx="1" fill="#d4a373"/>
    <rect x="28" y="16" width="74" height="4" fill="#e7c49a"/>
    ${oe("M28 10 h30")}
    <g class="swingSeat">
      <rect x="48" y="74" width="34" height="7" rx="1" fill="#f3d2aa" ${$(2.2)}/>
      <rect x="72" y="76" width="8" height="4" fill="#d4a373"/>
      <path d="M54 20 V78 M76 20 V78" fill="none" ${$(2.2)}/>
      ${oe("M52 76 h14")}
    </g>`}),Yx=ve({kind:"sandbox",name:"Sandbox",cat:"furniture",w:120,h:54,vb:"0 0 160 72",svg:`${we(80,64,68)}
    <path d="M108 38 L146 26 L146 52 L108 64 Z" fill="#e7c49a" ${$()}/>
    <path d="M126 36 L142 28 L142 48 L126 56 Z" fill="#c99366"/>
    <path d="M12 40 H108 V64 H12 Z" fill="#f3d2aa" ${$()}/>
    <path d="M12 40 L36 18 L146 18 L108 40 Z" fill="#f6e0c4" ${$()}/>
    <path d="M112 20 L142 20 L108 38 L90 38 Z" fill="#d4a373"/>
    <path d="M34 36 L52 24 L122 24 L100 36 Z" fill="#ffe08a" ${$(2.2)}/>
    <path d="M98 26 L118 26 L100 34 L86 34 Z" fill="#f0c36a"/>
    ${rt("M48 30 q8 2 6 5 M68 28 q10 2 8 6 M58 34 h16")}
    <path d="M76 30 L100 36 L94 48 L70 42 Z" fill="#d7e6f2" ${$(2.2)}/>
    <path d="M88 34 L98 38 L94 44 L84 40 Z" fill="#b7c9d6"/>
    <path d="M52 8 L64 4 L90 34 L78 38 Z" fill="#f0d2b0" ${$()}/>
    <path d="M64 8 L72 6 L90 32 L82 34 Z" fill="#d4a373"/>
    <path d="M46 2 H66 V9 H46 Z" fill="#c99366" ${$(2)}/>
    ${oe("M18 44 h26")}
    ${oe("M44 22 h22")}`}),Kx=ve({kind:"little-slide",name:"Little Slide",cat:"furniture",w:150,h:188,vb:"0 0 110 140",svg:`${we(56,44,134)}
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
    ${oe("M12 24 h22")}
    <rect x="12" y="6" width="5" height="16" rx="1" fill="#f0d2b0" ${$(2.2)}/>
    <rect x="40" y="6" width="5" height="16" rx="1" fill="#e7c49a" ${$(2.2)}/>
    <path d="M14 8 H43" fill="none" ${$(2.2)}/>
    <rect x="80" y="116" width="7" height="16" rx="1" fill="#f3d2aa" ${$(2)}/>
    ${oe("M58 42 C74 48 86 66 86 88")}
    ${rt("M80 64 q4 16 2 28")}`}),Xx=ve({kind:"yard-bench",name:"Garden Bench",cat:"furniture",w:140,h:100,vb:"0 0 140 100",svg:`${we(70,58,96)}
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
    ${oe("M22 13 h28")}
    ${oe("M14 48 h16")}
    ${rt("M36 24 h48 M36 34 h44 M34 52 h52 M34 62 h46")}`}),Jx=ve({kind:"lemonade-cart",name:"Lemonade Cart",cat:"furniture",w:108,h:121,vb:"0 0 100 112",svg:`${we(50,40,106)}
    <circle cx="30" cy="96" r="11" fill="${ot}" ${$(2.2)}/><circle cx="30" cy="96" r="4.5" fill="#ffd166"/>
    <circle cx="72" cy="96" r="11" fill="${ot}" ${$(2.2)}/><circle cx="72" cy="96" r="4.5" fill="#ffd166"/>
    <rect x="18" y="92" width="66" height="5" rx="2" fill="#c99366" ${$(2)}/>
    <rect x="16" y="46" width="68" height="46" rx="3" fill="#fff6ea" ${$()}/>
    <rect x="66" y="50" width="14" height="38" fill="#f0d2a4"/>
    ${rt("M28 56 v28 M42 56 v28 M56 56 v28")}
    ${oe("M20 52 v16")}
    <rect x="12" y="38" width="76" height="12" rx="2" fill="#ffe08a" ${$()}/>
    <rect x="66" y="40" width="18" height="8" fill="#f0c45c"/>
    <path d="M14 40 L22 14 H80 L88 40 Z" fill="#ff8fab" ${$()}/>
    <path d="M34 16 L38 40 H50 L46 15 Z" fill="#fff4f7"/>
    <path d="M58 15 L62 40 H74 L70 15 Z" fill="#fff4f7"/>
    <path d="M72 16 H80 L88 40 H76 Z" fill="#e45d88"/>
    ${oe("M26 20 h18")}
    <path d="M28 52 H44 L42 72 H30 Z" fill="#fff" ${$(2)}/>
    <path d="M30 58 H42 L41 72 H31 Z" fill="#ffe566"/>
    <path d="M28 54 L22 58 L28 62 Z" fill="#fff" ${$(2)}/>
    <path d="M44 56 Q52 60 44 70" fill="none" ${$(2)}/>
    <path d="M56 60 H68 L66 72 H58 Z" fill="#fff" ${$(2)}/>
    <path d="M58 64 H66 L65 72 H59 Z" fill="#ffe566"/>
    <circle cx="78" cy="64" r="7" fill="#ffe566" ${$(2)}/>
    <path d="M78 58 v12 M72 64 h12" fill="none" stroke="#e0a83a" stroke-width="1.3"/>`}),e7=ve({kind:"sun-lounger",name:"Sun Lounger",cat:"furniture",w:168,h:86,vb:"0 0 170 90",svg:`${we(86,68,84)}
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
    ${oe("M22 12 L50 40")}
    ${rt("M26 22 L52 46")}`}),t7=ve({kind:"splash-pool",name:"Splash Pool",cat:"furniture",w:176,h:96,vb:"0 0 170 96",svg:`<defs>${vd("ydpoolW","#f3fbff","#7ec8e3")}</defs>
    ${we(85,72,90)}
    <ellipse cx="85" cy="58" rx="74" ry="28" fill="#8ecae6" ${$()}/>
    <path d="M22 52 Q40 34 78 40" fill="none" stroke="#ff8fab" stroke-width="16" stroke-linecap="round"/>
    <path d="M100 36 Q138 38 152 58" fill="none" stroke="#ffd166" stroke-width="14" stroke-linecap="round"/>
    <path d="M18 66 C22 82 50 90 85 90 C120 90 152 82 154 66 C148 78 120 84 85 84 C50 84 24 78 18 66 Z" fill="#5aa9c6"/>
    <ellipse cx="85" cy="54" rx="48" ry="16" fill="url(#ydpoolW)" ${$(2.2)}/>
    ${oe("M36 50 q20 -10 36 0")}
    <circle cx="128" cy="48" r="4" fill="#fff" ${$(1.6)}/>
    <circle cx="128" cy="48" r="1.6" fill="#8ecae6"/>
    <path d="M70 46 q3 -8 1 0 M96 42 q4 -9 1 1" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`}),n7=ve({kind:"picket-gate",name:"Picket Gate",cat:"furniture",w:110,h:150,vb:"0 0 100 136",svg:`${we(50,38,130)}
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
    ${oe("M28 36 v20")}
    <rect x="74" y="60" width="16" height="5" rx="1" fill="#c99366" ${$(2)}/>
    <circle cx="86" cy="62" r="2.6" fill="#ffd166" ${$(1.8)}/>`});function s7(){let e="";for(let t=0;t<6;t++)for(let n=0;n<13;n++)(t+n)%2===0&&(e+=`<rect x="${n*15-6}" y="${t*10}" width="15" height="10" fill="#ff8fab"/>`);return e}const o7=ve({kind:"picnic-blanket",name:"Picnic Blanket",cat:"decor",w:110,h:36,vb:"0 0 180 59",svg:`<defs><clipPath id="ydging"><path d="M22 20 L156 12 L174 44 L36 52 Z"/></clipPath></defs>
    ${we(96,74,54)}
    <path d="M22 20 L156 12 L174 44 L36 52 Z" fill="#fff0f5" ${$()}/>
    <g clip-path="url(#ydging)">${s7()}</g>
    <path d="M148 14 L170 42 L160 46 L138 18 Z" fill="#e45d88"/>
    <path d="M96 30 L128 26 L134 42 L100 46 Z" fill="#f3d2aa" ${$(2)}/>
    <path d="M120 28 L128 26 L134 42 L126 43 Z" fill="#c99366"/>
    <path d="M104 30 Q114 14 126 28" fill="none" ${$(2.2)}/>
    ${rt("M104 34 h22 M104 38 h24",1)}
    ${oe("M34 26 l28 -3")}`});function No(e,t,n,s){return`<path d="M${e-1.5} ${t+16} H${e+1.5} V${t+40} H${e-1.5} Z" fill="#3d9a68"/>
    <path d="M${e} ${t+24} C${e-16} ${t+18} ${e-14} ${t+36} ${e-1} ${t+34}" fill="#74c69d" ${$(1.6)}/>
    <path d="M${e} ${t+22} C${e+16} ${t+16} ${e+12} ${t+36} ${e+1} ${t+32}" fill="#52b788"/>
    <path d="M${e} ${t+18} C${e-10} ${t+8} ${e-8} ${t} ${e} ${t+6} C${e+8} ${t} ${e+10} ${t+8} ${e} ${t+18} Z" fill="${n}" ${$(1.8)}/>
    <path d="M${e+1} ${t+6} C${e+7} ${t+4} ${e+8} ${t+13} ${e+1} ${t+15} Z" fill="${s}"/>`}const i7=ve({kind:"tulip-bed",name:"Tulip Bed",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`${we(70,56,86)}
    <path d="M10 56 H130 L120 82 H20 Z" fill="#f0d2b0" ${$()}/>
    <path d="M96 58 H126 L118 78 H92 Z" fill="#d4a373"/>
    <path d="M16 56 Q70 42 124 56 Q70 64 16 56 Z" fill="#c4a484" ${$(2.2)}/>
    ${oe("M22 60 h24")}
    ${No(32,16,"#ff8fab","#e45d88")}
    ${No(54,8,"#ffd166","#e0a83a")}
    ${No(76,4,"#ff7096","#e04578")}
    ${No(98,12,"#fff","#ffd0e0")}
    ${No(118,18,"#c9a0dc","#b388d6")}`}),a7=ve({kind:"birdbath",name:"Birdbath",cat:"decor",w:84,h:126,vb:"0 0 80 120",svg:`<defs>${vd("ydbathW","#f3fbff","#8ecae6")}</defs>
    ${we(40,28,114)}
    <ellipse cx="40" cy="106" rx="20" ry="7" fill="#e7eef2" ${$()}/>
    <path d="M30 46 H50 C56 70 58 86 52 104 H28 C22 86 24 70 30 46 Z" fill="#f4f7f8" ${$()}/>
    <path d="M42 52 H50 C54 72 54 88 50 100 H44 Z" fill="#c5d0d6"/>
    ${oe("M33 62 v22")}
    <ellipse cx="40" cy="40" rx="32" ry="13" fill="#f7fafb" ${$()}/>
    <path d="M40 28 C66 28 72 38 72 42 C72 52 58 54 40 54 C60 54 68 48 68 42 C68 36 58 32 40 34 Z" fill="#d5dee4"/>
    <ellipse cx="40" cy="38" rx="22" ry="7" fill="url(#ydbathW)" ${$(2.2)}/>
    ${oe("M22 36 q10 -4 18 0")}
    <path d="M48 30 L40 24 L42 34 Z" fill="#f0c45c" ${$(1.6)}/>
    <ellipse cx="56" cy="28" rx="11" ry="6" fill="#ffd166" ${$(1.8)}/>
    <circle cx="66" cy="24" r="4.5" fill="#ffe08a" ${$(1.6)}/>
    <path d="M70 24 L77 26 L70 28 Z" fill="#e07a3f"/>
    <circle cx="67" cy="23" r="1" fill="${ot}"/>
    <path d="M54 32 V40 M60 32 V40" fill="none" stroke="#c99366" stroke-width="1.4" stroke-linecap="round"/>`}),r7=ve({kind:"lily-pond",name:"Lily Pond",cat:"decor",w:170,h:90,vb:"0 0 170 90",svg:`<defs>${vd("ydpondW","#eaf6ff","#5aa9e6")}</defs>
    ${we(85,70,84)}
    <ellipse cx="85" cy="54" rx="74" ry="28" fill="#c4a484" ${$()}/>
    <path d="M85 30 C142 32 158 48 158 56 C158 72 126 82 85 82 C124 80 150 68 150 56 C150 44 126 36 85 36 Z" fill="#a88462"/>
    <ellipse cx="85" cy="52" rx="62" ry="20" fill="url(#ydpondW)" ${$(2.2)}/>
    ${oe("M40 46 q24 -8 42 2")}
    <path fill="#95d5b2" ${$(2)} fill-rule="evenodd" d="M58 54 m-16 0 a16 7 0 1 0 32 0 a16 7 0 1 0 -32 0 M58 50 L72 54 L58 58 Z"/>
    <path d="M66 50 L74 54 L66 56 Z" fill="#3d9a68"/>
    <path fill="#74c69d" ${$(2)} fill-rule="evenodd" d="M112 48 m-18 0 a18 8 0 1 0 36 0 a18 8 0 1 0 -36 0 M112 42 L128 48 L112 54 Z"/>
    <path d="M40 58 q-4 -16 2 -22 q6 8 2 16" fill="#52b788" ${$(1.6)}/>
    <path d="M108 40 l2 -8 l4 6 l4 -7 l2 8 l-4 3 z" fill="#ff8fab" ${$(1.6)}/>
    <path d="M112 36 l3 -6 l2 5 l3 -5 l1 6 z" fill="#fff" ${$(1.4)}/>
    <circle cx="112" cy="40" r="2.4" fill="#ffd166"/>`});function Fo(e,t,n,s,o=10){return`<path d="M${e} ${t-o-8} V${t-o}" fill="none" ${$(2.2)}/>
    <rect x="${e-4}" y="${t-o-2}" width="8" height="5" rx="1" fill="#c99366" ${$(1.8)}/>
    <circle cx="${e}" cy="${t}" r="${o}" fill="${n}" ${$()}/>
    <path d="M${e+1} ${t-o+3} H${e+o-1} V${t+o-3} H${e+2} Z" fill="${s}"/>
    ${oe(`M${e-o+3} ${t-2} q2 -3 4 0`)}`}const l7=ve({kind:"patio-lights",name:"Patio Lights",cat:"decor",w:190,h:70,vb:"0 0 180 70",wall:!0,svg:`<path d="M8 12 Q50 32 90 12 Q130 32 172 14" fill="none" ${$()}/>
    ${Fo(28,40,"#fff6c8","#f0c45c")}
    ${Fo(64,46,"#ffc2d4","#e45d88")}
    ${Fo(100,36,"#fff1c2","#f0c45c")}
    ${Fo(136,46,"#c9f1ff","#7eb4dc")}
    ${Fo(164,34,"#ffd0e8","#e888a8",8)}`}),c7=ve({kind:"toadstool-light",name:"Toadstool Light",cat:"decor",w:70,h:84,vb:"0 0 80 96",svg:`<defs>${wd("ydtoadG","#ffe7a0",".9")}</defs>
    ${we(40,26,90)}
    <ellipse cx="40" cy="70" rx="18" ry="8" fill="url(#ydtoadG)"/>
    <path d="M32 58 H48 L52 84 H28 Z" fill="#fff7f8" ${$()}/>
    <path d="M42 60 H48 L50 82 H43 Z" fill="#f0d8cc"/>
    <path d="M6 58 Q40 8 74 58 Q40 74 6 58 Z" fill="#ff8fab" ${$()}/>
    <path d="M44 22 Q66 16 72 54 Q52 66 44 52 Z" fill="#e45d88"/>
    ${oe("M18 48 q16 -12 26 -2")}
    <circle cx="26" cy="48" r="5" fill="#fff" ${$(2)}/>
    <circle cx="44" cy="40" r="6" fill="#fff" ${$(2)}/>
    <circle cx="36" cy="56" r="3.5" fill="#fff" ${$(2)}/>
    <path d="M22 52 h6 M40 46 h8" fill="none" stroke="#ffd0e0" stroke-width="1.2" stroke-linecap="round"/>`}),d7=ve({kind:"stepping-stones",name:"Stepping Stones",cat:"decor",w:160,h:64,vb:"0 0 160 70",svg:`${we(80,66,64)}
    <path d="M8 40 L24 28 L50 32 L54 50 L30 58 L10 52 Z" fill="#f7f4ef" ${$()}/>
    <path d="M34 36 L50 32 L54 50 L36 54 Z" fill="#d9d3cc"/>
    <path d="M56 44 L78 32 L108 36 L112 56 L80 64 L58 58 Z" fill="#f4f1ec" ${$()}/>
    <path d="M86 40 L108 36 L112 56 L90 58 Z" fill="#d4cdc4"/>
    <path d="M110 30 L128 20 L154 28 L150 48 L124 52 L108 42 Z" fill="#e7e2dc" ${$()}/>
    <path d="M132 26 L152 28 L148 46 L130 44 Z" fill="#d0c9c2"/>
    ${oe("M16 38 q8 -4 14 0")}
    ${rt("M22 44 h12 M72 48 h16 M124 36 h12")}`}),f7=ve({kind:"pinwheel",name:"Pinwheel",cat:"decor",w:56,h:90,vb:"0 0 70 100",holdable:!0,svg:`${we(35,16,96)}
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
    <circle cx="34" cy="40" r="1.8" fill="${ot}"/>`}),p7=ve({kind:"rain-barrel",name:"Rain Barrel",cat:"decor",w:86,h:108,vb:"0 0 80 110",svg:`${we(40,30,104)}
    <path d="M22 30 C12 48 12 78 22 98 H58 C68 78 68 48 58 30 Z" fill="#8ecae6" ${$()}/>
    <path d="M46 34 C58 48 60 76 54 96 H58 C66 76 66 50 56 32 Z" fill="#5aa9c6"/>
    ${rt("M28 40 v48 M36 36 v54 M44 38 v50")}
    ${oe("M24 42 v24")}
    <ellipse cx="40" cy="30" rx="20" ry="8" fill="#bde0fe" ${$()}/>
    <ellipse cx="46" cy="30" rx="10" ry="5" fill="#7eb4dc"/>
    <path d="M16 48 H64" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <path d="M14 74 H66" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <rect x="56" y="78" width="14" height="7" rx="2" fill="#d7ecff" ${$(2)}/>
    <path d="M70 81 h6" fill="none" ${$(2)}/>
    <path d="M34 18 q6 -8 12 0" fill="none" stroke="#7eb4dc" stroke-width="2.2" stroke-linecap="round"/>`}),h7=ve({kind:"butterfly-bush",name:"Butterfly Bush",cat:"plants",w:120,h:130,vb:"0 0 100 120",svg:`${we(50,40,114)}
    <ellipse cx="32" cy="86" rx="22" ry="18" fill="#95d5b2" ${$(2.2)}/>
    <ellipse cx="70" cy="84" rx="24" ry="20" fill="#3d9a68" ${$(2.2)}/>
    <ellipse cx="50" cy="78" rx="36" ry="28" fill="#74c69d" ${$()}/>
    <path d="M18 90 Q50 108 84 88 Q68 100 50 102 Q30 100 18 90 Z" fill="#3d9a68"/>
    ${oe("M24 68 q14 -8 26 2")}
    ${rt("M28 80 q4 6 0 10 M46 72 q5 8 0 12 M66 78 q4 6 0 10")}
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
    <ellipse cx="18" cy="32" rx="2" ry="7" fill="${ot}"/>
    <path d="M16 26 Q12 18 10 14 M20 26 Q24 18 28 14" fill="none" stroke="${ot}" stroke-width="1.3" stroke-linecap="round"/>`}),g7=ve({kind:"hedge-row",name:"Hedge Row",cat:"plants",w:190,h:96,vb:"0 0 180 96",svg:`${we(90,78,90)}
    <path d="M16 84 C28 70 40 62 52 66 C62 52 78 50 90 62 C102 50 118 52 128 66 C140 58 156 64 164 74 L164 86 L16 86 Z" fill="#2f7d52"/>
    <path d="M10 82 L10 60 C10 50 18 46 26 50 C32 34 46 32 54 48 C60 30 76 28 84 46 C92 28 108 28 116 46 C124 30 140 32 148 48 C156 36 166 42 170 54 L170 82 Z" fill="#74c69d" ${$()}/>
    <path d="M148 46 C160 38 170 50 170 70 L170 82 L140 82 L146 58 Z" fill="#52b788"/>
    <path d="M22 64 C40 54 58 58 70 50 C84 60 100 48 116 56 C128 48 146 56 158 64" fill="none" stroke="#95d5b2" stroke-width="6" stroke-linecap="round" opacity=".85"/>
    <path d="M14 68 C48 78 132 76 166 66 L168 82 L12 82 Z" fill="#3d9a68"/>
    ${rt("M28 58 q3 5 0 8 M48 54 q3 6 0 9 M70 52 q3 6 1 9 M94 52 q3 6 0 10 M118 54 q3 6 0 9 M142 56 q3 5 0 8")}
    ${oe("M18 58 q10 -4 16 1")}
    ${oe("M58 42 q12 -4 16 2")}`}),u7=ve({kind:"lemonade-cup",name:"Lemonade Cup",cat:"food",w:52,h:70,vb:"0 0 70 90",holdable:!0,svg:`${we(35,22,84)}
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
    ${oe("M24 38 v14")}`}),m7=ve({kind:"picnic-table",name:"Picnic Table",cat:"furniture",w:180,h:110,vb:"0 0 160 100",svg:`${we(80,68,96)}
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
    ${oe("M28 40 h36")}
    ${rt("M40 42 h50 M34 66 h70")}`}),y7=ve({kind:"seesaw",name:"Seesaw",cat:"furniture",w:200,h:80,vb:"0 0 180 80",svg:`${we(90,74,76)}
    <path d="M78 58 H102 L96 74 H84 Z" fill="#f3d2aa" ${$()}/>
    <path d="M94 60 H100 L96 72 H92 Z" fill="#c99366"/>
    <rect x="10" y="40" width="160" height="12" rx="3" fill="#ffd166" ${$()} transform="rotate(-8 90 46)"/>
    <rect x="130" y="28" width="28" height="8" fill="#e0a83a"/>
    <rect x="16" y="34" width="28" height="10" rx="2" fill="#ff8fab" ${$(2)}/>
    <rect x="136" y="22" width="28" height="10" rx="2" fill="#8ecae6" ${$(2)}/>
    ${oe("M24 44 h40")}`}),b7=ve({kind:"wagon",name:"Wagon",cat:"furniture",w:130,h:90,vb:"0 0 130 90",svg:`${we(64,50,86)}
    <circle cx="36" cy="74" r="12" fill="${ot}" ${$(2)}/><circle cx="36" cy="74" r="5" fill="#ffd166"/>
    <circle cx="96" cy="74" r="12" fill="${ot}" ${$(2)}/><circle cx="96" cy="74" r="5" fill="#ffd166"/>
    <path d="M22 40 H108 L100 68 H30 Z" fill="#e45d88" ${$()}/>
    <path d="M86 42 H106 L100 66 H84 Z" fill="#c93b68"/>
    <rect x="28" y="28" width="76" height="14" rx="3" fill="#ff8fab" ${$()}/>
    <path d="M108 36 H122 L118 58" fill="none" ${$(2.4)}/>
    ${oe("M32 46 h28")}
    ${rt("M40 54 h40")}`}),k7=ve({kind:"birdhouse",name:"Birdhouse",cat:"decor",w:70,h:120,vb:"0 0 80 130",svg:`${we(40,22,124)}
    <rect x="34" y="70" width="12" height="50" rx="2" fill="#d4a373" ${$()}/>
    <rect x="40" y="74" width="5" height="42" fill="#c99366"/>
    <path d="M12 62 L40 28 L68 62 Z" fill="#e45d88" ${$()}/>
    <path d="M40 32 L66 60 H52 Z" fill="#c93b68"/>
    <rect x="18" y="60" width="44" height="36" rx="3" fill="#f6e0c4" ${$()}/>
    <rect x="48" y="64" width="10" height="28" fill="#e7c49a"/>
    <circle cx="40" cy="76" r="7" fill="#5a3d5c"/>
    <rect x="36" y="86" width="14" height="4" rx="1" fill="#d4a373" ${$(1.6)}/>
    ${oe("M22 66 h12")}`}),w7=ve({kind:"sprinkler",name:"Sprinkler",cat:"decor",w:80,h:70,vb:"0 0 100 80",svg:`${we(50,28,76)}
    <ellipse cx="50" cy="66" rx="22" ry="8" fill="#74c69d" ${$()}/>
    <rect x="44" y="40" width="12" height="26" rx="3" fill="#8ecae6" ${$()}/>
    <circle cx="50" cy="36" r="8" fill="#ffd166" ${$()}/>
    <path d="M50 28 C30 16 18 20 12 10" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 28 C70 14 84 18 90 8" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 26 C40 8 58 4 50 2" fill="none" stroke="#c9ecff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="12" cy="10" r="2.2" fill="#c9ecff"/><circle cx="90" cy="8" r="2.2" fill="#c9ecff"/><circle cx="50" cy="2" r="2.2" fill="#fff"/>
    ${oe("M46 44 v10")}`}),v7=ve({kind:"beach-ball",name:"Beach Ball",cat:"decor",w:70,h:70,vb:"0 0 80 80",svg:`${we(40,26,76)}
    <circle cx="40" cy="40" r="28" fill="#fff" ${$()}/>
    <path d="M40 12 A28 28 0 0 1 66 32 L40 40 Z" fill="#ff8fab"/>
    <path d="M66 48 A28 28 0 0 1 40 68 L40 40 Z" fill="#ffd166"/>
    <path d="M24 64 A28 28 0 0 1 14 36 L40 40 Z" fill="#8ecae6"/>
    <path d="M18 28 A28 28 0 0 1 40 12 L40 40 Z" fill="#b7e4c7"/>
    <circle cx="40" cy="40" r="5" fill="#fff" ${$(2)}/>
    ${oe("M28 24 q6 -4 10 2")}`}),_7=ve({kind:"patio-umbrella",name:"Patio Umbrella",cat:"furniture",w:150,h:180,vb:"0 0 120 150",svg:`${we(60,36,144)}
    <path d="M10 58 Q60 18 110 58 L98 64 Q60 32 22 64 Z" fill="#ffb3c6" ${$()}/>
    <path d="M60 22 L108 56 L96 62 Z" fill="#e45d88"/>
    <path d="M28 40 Q44 30 60 36 Q76 28 96 42" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <rect x="56" y="58" width="8" height="78" rx="2" fill="#f3d2aa" ${$()}/>
    <rect x="60" y="62" width="3" height="70" fill="#d4a373"/>
    <rect x="40" y="128" width="40" height="8" rx="2" fill="#e7c49a" ${$(2)}/>
    ${oe("M24 50 q16 -8 24 0")}`}),$7=ve({kind:"veggie-patch",name:"Vegetable Patch",cat:"plants",w:150,h:80,vb:"0 0 150 80",svg:`${we(75,62,76)}
    <rect x="8" y="28" width="134" height="44" rx="4" fill="#c99366" ${$()}/>
    <rect x="16" y="34" width="118" height="32" fill="#8d6e4c"/>
    <path d="M36 48 C36 36 48 34 48 46 C48 34 60 36 58 48 Z" fill="#74c69d" ${$(2)}/>
    <path d="M78 50 C78 38 90 36 90 48 C90 36 102 38 100 50 Z" fill="#52b788" ${$(2)}/>
    <path d="M112 52 L120 30 L128 52 Z" fill="#ff922b" ${$(2)}/>
    <path d="M118 32 Q124 22 130 28" fill="none" stroke="#2f7d52" stroke-width="2" stroke-linecap="round"/>
    ${oe("M18 36 h24")}`}),x7=ve({kind:"hammock",name:"Hammock",cat:"furniture",w:190,h:110,vb:"0 0 170 100",svg:`${we(85,70,96)}
    <rect x="8" y="18" width="10" height="74" rx="2" fill="#d4a373" ${$()}/>
    <rect x="152" y="18" width="10" height="74" rx="2" fill="#c99366" ${$()}/>
    <path d="M18 28 Q85 78 152 28" fill="none" stroke="#5a3d5c" stroke-width="2"/>
    <path d="M18 36 Q85 88 152 36 L152 48 Q85 96 18 48 Z" fill="#8ecae6" ${$()}/>
    <path d="M120 40 Q140 62 150 44 L150 54 Q136 74 112 52 Z" fill="#5fb0d8"/>
    ${oe("M36 46 q24 10 30 4")}
    ${rt("M40 58 q30 16 50 4")}`}),M7=ve({kind:"garden-gnome",name:"Garden Gnome",cat:"decor",w:64,h:100,vb:"0 0 70 110",svg:`${we(35,22,104)}
    <path d="M18 78 H52 L48 100 H22 Z" fill="#3d7ec4" ${$()}/>
    <path d="M40 80 H50 L48 98 H42 Z" fill="#2c5f96"/>
    <circle cx="35" cy="62" r="16" fill="#f6d2b5" ${$()}/>
    <path d="M20 66 Q35 78 50 66 Q46 74 35 76 Q24 74 20 66 Z" fill="#fff"/>
    <circle cx="29" cy="60" r="2" fill="${ot}"/><circle cx="41" cy="60" r="2" fill="${ot}"/>
    <path d="M16 52 L35 18 L54 52 Z" fill="#e45d88" ${$()}/>
    <path d="M35 22 L52 50 H42 Z" fill="#c93b68"/>
    <ellipse cx="35" cy="52" rx="16" ry="4" fill="#ff8fab" ${$(2)}/>
    ${oe("M22 40 l8 -8")}`}),Fi=[Gx,Yx,Kx,Xx,Jx,e7,t7,n7,o7,i7,a7,r7,l7,c7,d7,f7,p7,h7,g7,u7,m7,y7,b7,k7,w7,v7,_7,$7,x7,M7];function L7(e,t){for(const n of Fi)t[n.kind]||(e.push(n),t[n.kind]=n)}function El(e,t,n){return`<g>
    <ellipse cx="${e-22*n}" cy="${t}" rx="${26*n}" ry="${14*n}" fill="#fff"/>
    <ellipse cx="${e+18*n}" cy="${t-2*n}" rx="${30*n}" ry="${16*n}" fill="#fff"/>
    <ellipse cx="${e}" cy="${t+4*n}" rx="${34*n}" ry="${13*n}" fill="#fff"/>
  </g>`}function E7(e,t,n,s,o){const a=l=>`<rect x="${e-2}" y="${l}" width="${t-e+12+4}" height="8" rx="3" fill="#fff" ${$(2.2)}/><rect x="${(t-40).toFixed(1)}" y="${l+1}" width="30" height="6" rx="2" fill="#d5ead8"/>`;let r=a(n+26)+a(s-28);for(let l=e;l<=t;l+=o)r+=`<path d="M${l} ${n+12} L${l+12/2} ${n} L${l+12} ${n+12} V${s} H${l} Z" fill="#f7fff8" ${$(2.2)}/>`,r+=`<path d="M${(l+12*.58).toFixed(1)} ${n+10} H${l+12-1} V${s-4} H${(l+12*.58).toFixed(1)} Z" fill="#d5ead8"/>`,r+=`<path d="M${l+2} ${n+18} v22" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".75" fill="none"/>`;return r}function C7(e,t){const s=150+46*t,o=372-s;return`<g id="yardTree">
    <rect x="${e-14*t}" y="${s}" width="${28*t}" height="${o}" rx="${6*t}" fill="#e7b98a" ${$()}/>
    <rect x="${e+4*t}" y="${s+8*t}" width="${8*t}" height="${o-16*t}" fill="#c99366"/>
    ${rt(`M${e-4*t} ${s+28*t} v${36*t}`)}
    ${oe(`M${e-8*t} ${s+16*t} v${22*t}`)}
    <ellipse cx="${e+8*t}" cy="${150+18*t}" rx="${78*t}" ry="${46*t}" fill="#2f7d52"/>
    <ellipse cx="${e-48*t}" cy="${150+10*t}" rx="${36*t}" ry="${30*t}" fill="#245e3e"/>
    <ellipse cx="${e-34*t}" cy="${150+16*t}" rx="${42*t}" ry="${34*t}" fill="#95d5b2" ${$(2.2)}/>
    <ellipse cx="${e}" cy="150" rx="${68*t}" ry="${50*t}" fill="#74c69d" ${$()}/>
    <ellipse cx="${e+40*t}" cy="${150+8*t}" rx="${40*t}" ry="${36*t}" fill="#3d9a68" ${$(2.2)}/>
    <ellipse cx="${e-8*t}" cy="${150-6*t}" rx="${28*t}" ry="${20*t}" fill="#b7e4c7" opacity=".95"/>
    ${rt(`M${e-20*t} ${150+8*t} q${8*t} ${6*t} 0 ${12*t} M${e+10*t} ${150-4*t} q${8*t} ${6*t} 2 ${12*t} M${e+28*t} ${150+12*t} q${6*t} ${5*t} 0 ${10*t}`)}
    ${oe(`M${e-36*t} ${150-18*t} q${16*t} -8 ${28*t} 2`)}
  </g>`}function S7(){return`<svg class="yardWorld" viewBox="0 0 2400 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ydsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6eb6e8"/>
        <stop offset=".48" stop-color="#c5e6fb"/>
        <stop offset="1" stop-color="#fff3df"/>
      </linearGradient>
      ${wd("ydsun","#ffe566",".55")}
    </defs>
    <rect width="2400" height="430" fill="url(#ydsky)"/>
    <circle id="ydSunGlow" cx="1180" cy="68" r="62" fill="url(#ydsun)"/>
    <circle id="ydSun" cx="1180" cy="68" r="30" fill="#ffe566"/>
    <circle cx="1170" cy="58" r="8" fill="#fff" opacity=".8"/>
    ${El(980,96,1.05)}${El(1320,78,.85)}${El(1500,120,.7)}
    <rect y="360" width="2400" height="240" fill="#c6ef9a"/>
    <rect y="360" width="2400" height="28" fill="#e7f8c8"/>
    <rect y="520" width="2400" height="80" fill="#9ed67a"/>
    <path d="M1040 470 q30 -12 16 -6 M1200 510 q28 -12 14 -4 M1360 548 q24 -10 12 -4" fill="none" stroke="#3d9a68" stroke-width="1.2" stroke-linecap="round" opacity=".22"/>
    ${E7(846,2118,258,372,24)}
    ${C7(1184,.8)}
    <path d="M840 120 H1076 L1054 152 H862 Z" fill="#ffb3c6" ${$()}/>
    <path d="M960 126 H1064 L1046 148 H976 Z" fill="#e45d88"/>
    ${oe("M876 132 h56")}
    <rect x="864" y="150" width="196" height="222" rx="4" fill="#fff6ea" ${$()}/>
    <rect x="1044" y="156" width="12" height="210" fill="#f0dcc4"/>
    ${rt("M880 174 H1000 M880 202 H1000 M880 230 H990 M880 294 H1000 M880 334 H980")}
    <rect x="884" y="180" width="44" height="36" rx="4" fill="#c9ecff" ${$(2.2)}/>
    <rect x="912" y="184" width="12" height="28" fill="#8ecae6"/>
    <path d="M906 180 V216 M884 198 H928" fill="none" ${$(2.2)}/>
    ${oe("M890 188 h12")}
  </svg>`}function P7(e,t,n,s,o){const i=(600-t)/600*100,a=(n/2400*100).toFixed(3),r=(s/600*100).toFixed(3);return o==="right"?`right:${((2400-(e+n/2))/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`:`left:${((e-n/2)/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`}function T7(){return`<svg class="doorArt" viewBox="0 0 100 230">
    <rect x="4" y="2" width="92" height="226" rx="3" fill="#f3d2aa" ${$()}/>
    <rect x="76" y="6" width="16" height="218" fill="#d4a373"/>
    <rect x="14" y="12" width="72" height="206" rx="2" fill="#f6e9ff" ${$(2.2)}/>
    <rect x="70" y="16" width="12" height="198" fill="#d4b4e6"/>
    <rect x="24" y="22" width="52" height="42" rx="3" fill="#c9ecff" ${$(2.2)}/>
    <rect x="60" y="26" width="12" height="34" fill="#8ecae6"/>
    <path d="M50 22 V64 M24 43 H76" fill="none" ${$(2.2)}/>
    ${oe("M28 28 h18")}
    <rect x="24" y="76" width="52" height="56" rx="3" fill="#f7ecff" ${$(2.2)}/>
    <rect x="62" y="80" width="10" height="48" fill="#e0c8f0"/>
    ${oe("M28 84 v22")}
    <rect x="24" y="144" width="52" height="56" rx="3" fill="#f7ecff" ${$(2.2)}/>
    <rect x="62" y="148" width="10" height="48" fill="#e0c8f0"/>
    <circle cx="64" cy="126" r="4.2" fill="#ffd166" ${$(2.2)}/>
    <rect x="10" y="214" width="80" height="10" rx="2" fill="#e7c49a" ${$(2.2)}/>
  </svg>`}function R7(e){const t=e==="living"?fg:pg,n=e==="living"?"backyard":"living",s=e==="living"?"Backyard":"Back inside",o=e==="yard"?"right":"left";return`<button type="button" class="yardDoor" data-yard-go="${n}" aria-label="${s}" style="${P7(t.x,t.y,t.w,t.h,o)}">${T7()}<span class="yardHintLabel"><span>${s}</span></span></button>`}function _d(e,t){const n=e.replace(/[&<>]/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[s]);return`<figure class="ysCard"><div class="ysArt">${t}</div><figcaption>${n}</figcaption></figure>`}function B7(){return`<div class="yardSheet" data-yard-sheet="1"><h1>Backyard pieces</h1><div class="ysGrid">${Fi.map(t=>_d(t.name,mn(t))).join("")}</div></div>`}function A7(e,t){return _d(e,`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${t}</svg>`)}function D7(){const e=(r,l)=>we(r,l,96.4),t=`
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
    <rect x="16" y="84" width="7" height="10" rx="2" fill="${ot}"/>
    <rect x="77" y="84" width="7" height="10" rx="2" fill="${ot}"/>`,n=`
    <defs>${wd("a2lamp-glow","#ffd56a",".95")}</defs>
    ${e(50,22)}
    <path d="M34 8 L42 8 L37 40 L24 40 Z" fill="#fff6d4"/>
    <path d="M42 8 L50 8 L50 40 L37 40 Z" fill="#ffe08a"/>
    <path d="M50 8 L58 8 L63 40 L50 40 Z" fill="#f0c45c"/>
    <path d="M58 8 L66 8 L76 40 L63 40 Z" fill="#e0a83a"/>
    <path d="M24 40 L34 8 H66 L76 40 Z" fill="none" ${$()}/>
    <path d="M42 8 L37 40 M50 8 V40 M58 8 L63 40" fill="none" stroke="${ot}" stroke-width="2" stroke-linecap="round"/>
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
    <path d="M28 62 h14" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>`,o=Object.fromEntries(Fi.map(r=>[r.kind,r])),i=(r,l,c)=>A7(r,l)+_d(o[c].name,mn(o[c]));return`<div class="yardSheet yardCompare" data-yard-compare="1"><h1>House style and the yard</h1><p class="ysNote">Sofa, lamp, and plant are the approved refresh. Swing, cart, and birdbath use the same light.</p><div class="ysPair">${i("Sofa",t,"yard-swing")+i("Lamp",n,"lemonade-cart")+i("Plant",s,"birdbath")}</div></div>`}const si="#5a3d5c",q=`stroke="${si}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Ca='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>',hg=[{kind:"soaking-tub",name:"Soaking Tub",cat:"furniture",w:250,h:200,vb:"0 0 120 96",svg:`<ellipse cx="60" cy="92" rx="48" ry="3.2" fill="#000" opacity=".12"/><rect x="18" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${q}/><rect x="92" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${q}/><path d="M14 58 Q8 58 10 46 L22 28 H98 L110 46 Q112 58 106 58 Z" fill="#fff" ${q}/><ellipse cx="60" cy="30" rx="44" ry="14" fill="#fff" ${q}/><ellipse cx="60" cy="32" rx="34" ry="9" fill="#d7f3ff"/><path d="M28 34 Q60 42 92 34" fill="none" stroke="#b9e6f8" stroke-width="4"/><rect x="96" y="8" width="8" height="22" rx="4" fill="#f7d27a" ${q}/><path d="M100 28 Q112 34 104 44" fill="none" ${q}/><circle cx="104" cy="46" r="3.2" fill="#a8d4ea" ${q}/><ellipse cx="46" cy="30" rx="8" ry="3" fill="#fff" opacity=".7"/>`},{kind:"bath-toilet",name:"Toilet",cat:"furniture",w:120,h:160,vb:"0 0 100 134",svg:`<ellipse cx="50" cy="128" rx="34" ry="4" fill="#000" opacity=".12"/><rect x="28" y="8" width="44" height="36" rx="8" fill="#fff" ${q}/><rect x="34" y="16" width="32" height="16" rx="4" fill="#e7f6ff"/><rect x="46" y="42" width="8" height="10" fill="#f4f7fb" ${q}/><ellipse cx="50" cy="78" rx="36" ry="22" fill="#fff" ${q}/><ellipse cx="50" cy="74" rx="24" ry="14" fill="#d7f3ff" ${q}/><path d="M18 70 Q50 58 82 70" fill="#fff" ${q}/><rect x="40" y="96" width="20" height="24" rx="4" fill="#f7f4ef" ${q}/>`},{kind:"sink-vanity",name:"Sink Vanity",cat:"furniture",w:210,h:190,vb:"0 0 110 100",svg:`<ellipse cx="55" cy="96" rx="46" ry="3.2" fill="#000" opacity=".12"/><rect x="10" y="48" width="90" height="42" rx="8" fill="#f6e2c4" ${q}/><path d="M55 48 V90" ${q}/><circle cx="28" cy="70" r="3" fill="${si}"/><circle cx="82" cy="70" r="3" fill="${si}"/><rect x="16" y="90" width="8" height="6" rx="2" fill="${si}"/><rect x="86" y="90" width="8" height="6" rx="2" fill="${si}"/><ellipse cx="55" cy="44" rx="40" ry="12" fill="#fff" ${q}/><ellipse cx="55" cy="44" rx="26" ry="7" fill="#d7f3ff"/><rect x="50" y="10" width="10" height="28" rx="4" fill="#f7d27a" ${q}/><path d="M55 36 Q70 40 66 48" fill="none" ${q}/><rect x="8" y="40" width="94" height="8" rx="3" fill="#f3d2b5" ${q}/>`},{kind:"bath-mirror",name:"Bath Mirror",cat:"decor",w:120,h:160,wall:!0,vb:"0 0 90 120",svg:`<path d="M45 8 C70 8 82 28 82 58 C82 92 68 112 45 112 C22 112 8 92 8 58 C8 28 20 8 45 8 Z" fill="#f7d27a" ${q}/><ellipse cx="45" cy="60" rx="26" ry="40" fill="#d7f4ff" ${q}/><path d="M30 36 l8 -8 M28 52 l18 -16" stroke="#fff" stroke-width="4" stroke-linecap="round"/><rect x="38" y="2" width="14" height="8" rx="3" fill="#f28fa6" ${q}/>`},{kind:"towel-bar",name:"Towel Bar",cat:"decor",w:170,h:116,wall:!0,vb:"0 0 150 102",svg:`<rect x="10" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${q}/><rect x="130" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${q}/><rect x="14" y="16" width="122" height="8" rx="4" fill="#c98d55" ${q}/><path d="M26 24 H124 V70 Q75 100 26 70 Z" fill="#f7d7e4" ${q}/><path d="M75 24 V88" stroke="#f28fa6" stroke-width="3"/><path d="M40 36 H110" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"bath-mat",name:"Bath Mat",cat:"decor",w:230,h:120,vb:"0 0 160 84",svg:`<ellipse cx="80" cy="78" rx="70" ry="5" fill="#000" opacity=".1"/><rect x="12" y="22" width="136" height="48" rx="18" fill="#f28fa6" ${q}/><rect x="24" y="32" width="112" height="28" rx="12" fill="#f7d7e4"/><path d="M40 46 H120 M40 54 H120" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>`},{kind:"rubber-ducky",name:"Rubber Ducky",cat:"decor",w:80,svg:`${Ca}<ellipse cx="48" cy="68" rx="30" ry="26" fill="#f7d27a" ${q}/><circle cx="68" cy="40" r="18" fill="#ffe9a8" ${q}/><path d="M82 38 H98 Q102 44 92 48 H82 Z" fill="#f28fa6" ${q}/><ellipse cx="36" cy="74" rx="12" ry="8" fill="#f3c15a"/>`},{kind:"shower-curtain",name:"Shower Curtain",cat:"decor",w:150,h:260,holdable:!1,vb:"0 0 90 156",svg:`<rect x="8" y="8" width="74" height="8" rx="3" fill="#c98d55" ${q}/><circle cx="22" cy="16" r="3" fill="#f7d27a" ${q}/><circle cx="40" cy="16" r="3" fill="#f7d27a" ${q}/><circle cx="58" cy="16" r="3" fill="#f7d27a" ${q}/><circle cx="72" cy="16" r="3" fill="#f7d27a" ${q}/><path d="M12 18 Q8 80 16 146 H40 Q30 80 36 18 Z" fill="#d7f4ff" ${q}/><path d="M36 18 Q34 80 46 146 H74 Q84 80 78 18 Z" fill="#f7d7e4" ${q}/><path d="M24 40 Q18 70 26 100 M58 40 Q66 70 58 110" fill="none" stroke="#fff" stroke-width="3" opacity=".65"/>`},{kind:"soap-dish",name:"Soap Dish",cat:"decor",w:90,svg:`${Ca}<ellipse cx="50" cy="78" rx="34" ry="12" fill="#fff" ${q}/><ellipse cx="50" cy="74" rx="26" ry="7" fill="#e7f6ff"/><rect x="28" y="48" width="44" height="22" rx="8" fill="#f7d7e4" ${q}/><path d="M36 56 H64" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"laundry-hamper",name:"Laundry Hamper",cat:"furniture",w:140,h:160,vb:"0 0 100 114",svg:`<ellipse cx="50" cy="108" rx="36" ry="4" fill="#000" opacity=".12"/><path d="M18 40 H82 L74 100 H26 Z" fill="#b9a0dc" ${q}/><path d="M24 58 H76 M26 74 H74" stroke="#fff" stroke-width="3" opacity=".55"/><ellipse cx="50" cy="40" rx="34" ry="10" fill="#c9b6e8" ${q}/><path d="M22 36 Q50 18 78 36" fill="#f7d7e4" ${q}/><path d="M40 28 Q50 40 62 26" fill="none" stroke="#f28fa6" stroke-width="4" stroke-linecap="round"/>`},{kind:"bath-stool",name:"Bath Stool",cat:"furniture",w:110,svg:`${Ca}<ellipse cx="50" cy="58" rx="36" ry="12" fill="#f6e2c4" ${q}/><ellipse cx="50" cy="54" rx="28" ry="7" fill="#fff6ea"/><path d="M22 64 L16 92 M78 64 L84 92 M36 66 L34 92 M64 66 L66 92" ${q}/><path d="M18 90 H34 M66 90 H84" ${q}/>`}],I7=[{kind:"floor-cushion",name:"Floor Cushion",cat:"decor",w:150,h:136,vb:"0 0 130 118",svg:`<ellipse cx="65" cy="112" rx="50" ry="4" fill="#000" opacity=".12"/><ellipse cx="65" cy="68" rx="52" ry="40" fill="#f28fa6" ${q}/><ellipse cx="65" cy="58" rx="40" ry="24" fill="#f7d7e4"/><path d="M38 64 Q65 82 92 64" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"story-pillow",name:"Story Pillow",cat:"decor",w:120,h:100,vb:"0 0 110 92",svg:`<ellipse cx="55" cy="86" rx="40" ry="4" fill="#000" opacity=".12"/><rect x="14" y="28" width="82" height="52" rx="18" fill="#a8d4ea" ${q}/><path d="M55 40 l6 12 13 2 -10 8 2 13 -11 -7 -11 7 2 -13 -10 -8 13 -2 z" fill="#f7d27a" ${q}/>`},{kind:"berry-basket",name:"Berry Basket",cat:"food",w:100,svg:`${Ca}<path d="M22 48 H78 L70 88 H30 Z" fill="#f3d2b5" ${q}/><path d="M30 58 H70 M32 70 H68 M34 80 H66" ${q}/><circle cx="40" cy="40" r="10" fill="#f28fa6" ${q}/><circle cx="58" cy="36" r="10" fill="#c94b6a" ${q}/><circle cx="70" cy="48" r="8" fill="#b9a0dc" ${q}/><path d="M34 36 Q40 28 46 36" fill="none" stroke="#7dce8a" stroke-width="3"/>`},{kind:"ribbon-tray",name:"Ribbon Tray",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`<ellipse cx="70" cy="84" rx="52" ry="4" fill="#000" opacity=".12"/><rect x="16" y="40" width="108" height="36" rx="12" fill="#fff" ${q}/><rect x="22" y="46" width="96" height="22" rx="8" fill="#f7d7e4"/><rect x="36" y="28" width="16" height="22" rx="5" fill="#a8d4ea" ${q}/><rect x="58" y="22" width="14" height="28" rx="5" fill="#f7d27a" ${q}/><path d="M96 24 Q110 16 112 32 Q100 28 104 40 Q92 34 96 24 Z" fill="#f28fa6" ${q}/>`}],Pe="#5a3d5c",L=`stroke="${Pe}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,lo=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${Pe}"/><circle cx="${t}" cy="${n}" r="3" fill="${Pe}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,fa=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,Ce='<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>',wn=[{kind:"sofa",name:"Sofa",cat:"furniture",w:260,svg:`${Ce}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${L}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${L}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${L}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${L}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${L}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${Pe}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${Pe}"/>`},{kind:"armchair",name:"Armchair",cat:"furniture",w:150,svg:`${Ce}<rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${L}/><rect x="6" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${L}/><rect x="72" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${L}/><rect x="24" y="58" width="52" height="24" rx="10" fill="#b8e0f2" ${L}/><rect x="20" y="86" width="6" height="10" rx="2" fill="${Pe}"/><rect x="74" y="86" width="6" height="10" rx="2" fill="${Pe}"/>`},{kind:"bed",name:"Bed",cat:"furniture",w:300,svg:`${Ce}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${L}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${L}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${L}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${L}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${L}/>`},{kind:"table",name:"Table",cat:"furniture",w:200,svg:`${Ce}<rect x="4" y="30" width="92" height="14" rx="7" fill="#f4a261" ${L}/><rect x="14" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${L}/><rect x="76" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${L}/><path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".5"/>`},{kind:"chair",name:"Chair",cat:"furniture",w:100,svg:`${Ce}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${L}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${L}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${L}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${L}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/>`},{kind:"lamp",name:"Lamp",cat:"furniture",w:90,svg:`${Ce}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${L}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${L}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${L}/><circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>`},{kind:"fridge",name:"Fridge",cat:"furniture",w:150,svg:`${Ce}<rect x="16" y="4" width="68" height="90" rx="14" fill="#bde0fe" ${L}/><path d="M16 38 H84" ${L}/><rect x="70" y="14" width="5" height="16" rx="2" fill="${Pe}"/><rect x="70" y="46" width="5" height="22" rx="2" fill="${Pe}"/><circle cx="32" cy="22" r="5" fill="#ff8fab" ${L}/><rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${L}/>`},{kind:"stove",name:"Stove",cat:"furniture",w:170,svg:`${Ce}<rect x="8" y="26" width="84" height="68" rx="12" fill="#ffadad" ${L}/><rect x="8" y="18" width="84" height="14" rx="6" fill="#ffd6a5" ${L}/><rect x="20" y="46" width="60" height="36" rx="8" fill="#5a3d5c" opacity=".85"/><rect x="26" y="52" width="48" height="8" rx="4" fill="#fff" opacity=".25"/><circle cx="22" cy="38" r="3" fill="${Pe}"/><circle cx="36" cy="38" r="3" fill="${Pe}"/><circle cx="78" cy="38" r="3" fill="${Pe}"/>`},{kind:"bookshelf",name:"Shelf",cat:"furniture",w:170,svg:`${Ce}<rect x="10" y="4" width="80" height="90" rx="10" fill="#d4a373" ${L}/><path d="M10 34 H90 M10 64 H90" ${L}/><rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${L}/><rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${L}/><rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${L}/><rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${L}/><rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${L}/><circle cx="34" cy="80" r="8" fill="#ffadad" ${L}/>`},{kind:"tub",name:"Bathtub",cat:"furniture",w:240,svg:`${Ce}<circle cx="30" cy="40" r="7" fill="#bde0fe" ${L}/><circle cx="44" cy="34" r="9" fill="#e0f2ff" ${L}/><circle cx="60" cy="40" r="7" fill="#bde0fe" ${L}/><path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${L}/><rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${L}/><rect x="22" y="88" width="8" height="8" rx="2" fill="${Pe}"/><rect x="70" y="88" width="8" height="8" rx="2" fill="${Pe}"/>`},{kind:"rug",name:"Rug",cat:"decor",w:320,svg:`<ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${L}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${L}/><ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${L}/>`},{kind:"picture",name:"Picture",cat:"decor",w:130,wall:!0,svg:`<rect x="10" y="20" width="80" height="64" rx="8" fill="#ffd166" ${L}/><rect x="18" y="28" width="64" height="48" rx="4" fill="#bde0fe"/><circle cx="66" cy="40" r="7" fill="#fff3b0"/><path d="M18 76 L38 50 L52 64 L62 54 L82 76 Z" fill="#90e0a8" ${L}/>`},{kind:"window",name:"Window",cat:"decor",w:180,wall:!0,svg:`<rect class="winGlass" x="12" y="8" width="76" height="76" rx="38" fill="#a2d2ff" ${L}/><g class="winDay"><circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/></g><g class="winNight"><circle cx="62" cy="28" r="7" fill="#fff6d8"/><circle cx="28" cy="24" r="1.4" fill="#fff"/><circle cx="44" cy="20" r="1.1" fill="#fff"/><circle cx="70" cy="42" r="1.2" fill="#fff"/><circle cx="36" cy="46" r="1" fill="#fff"/></g><path d="M50 8 V84 M12 50 H88" ${L}/><path d="M4 8 Q20 40 10 90 M96 8 Q80 40 90 90" stroke="#ff8fab" stroke-width="9" fill="none" stroke-linecap="round"/>`},{kind:"clock",name:"Clock",cat:"decor",w:90,wall:!0,svg:`<circle cx="50" cy="50" r="38" fill="#fff" ${L}/><circle cx="50" cy="50" r="30" fill="#fff3b0"/><path d="M50 50 V28 M50 50 L64 58" ${L}/><circle cx="50" cy="50" r="3" fill="${Pe}"/>${fa(30,70,66)}`},{kind:"stars",name:"Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M30 20 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffd166" ${L}/><path d="M70 40 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#ffadad" ${L}/><path d="M40 66 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#a2d2ff" ${L}/>`},{kind:"balloon",name:"Balloons",cat:"decor",w:110,svg:`<path d="M38 52 Q44 74 50 96 M64 46 Q58 72 50 96" stroke="${Pe}" stroke-width="2" fill="none"/><ellipse cx="36" cy="32" rx="18" ry="22" fill="#ff8fab" ${L}/><ellipse cx="66" cy="28" rx="18" ry="22" fill="#a2d2ff" ${L}/><ellipse cx="30" cy="24" rx="4" ry="7" fill="#fff" opacity=".6"/>`},{kind:"teddy",name:"Teddy",cat:"decor",w:100,svg:`${Ce}<circle cx="26" cy="22" r="10" fill="#d4a373" ${L}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${L}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${L}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${L}/>${lo(40,60,36)}<ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/><circle cx="50" cy="46" r="2.5" fill="${Pe}"/>${fa(32,68,46)}`},{kind:"ball",name:"Ball",cat:"decor",w:70,svg:`${Ce}<circle cx="50" cy="58" r="36" fill="#ffd166" ${L}/><path d="M18 46 Q50 66 82 46 M26 82 Q50 60 74 82" stroke="#ff7096" stroke-width="7" fill="none"/>`},{kind:"tv",name:"TV",cat:"decor",w:170,svg:`${Ce}<rect x="6" y="14" width="88" height="62" rx="14" fill="#c9a0dc" ${L}/><rect x="16" y="22" width="68" height="46" rx="8" fill="#a2d2ff"/><path d="M30 6 L44 14 M70 6 L56 14" ${L}/><rect x="36" y="78" width="28" height="16" rx="4" fill="#b388d6" ${L}/>${lo(42,58,42)}<path d="M44 52 q6 5 12 0" ${L} fill="none"/>`},{kind:"plant",name:"Plant",cat:"plants",w:110,svg:`${Ce}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${L} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${L} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${L}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${L}/><rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${L}/>`},{kind:"cactus",name:"Cactus",cat:"plants",w:80,svg:`${Ce}<rect x="36" y="12" width="28" height="64" rx="14" fill="#80ed99" ${L}/><path d="M36 50 H24 a8 8 0 0 1 -8 -8 V34" fill="none" stroke="${Pe}" stroke-width="3.5"/><rect x="12" y="26" width="12" height="22" rx="6" fill="#80ed99" ${L}/><circle cx="50" cy="12" r="6" fill="#ff8fab" ${L}/>${lo(44,56,40)}<path d="M28 74 H72 L66 96 H34 Z" fill="#c9a0dc" ${L}/>`},{kind:"flowers",name:"Flowers",cat:"plants",w:90,svg:`${Ce}<path d="M50 70 V30 M50 60 Q30 50 30 30 M50 60 Q70 50 70 30" stroke="#52b788" stroke-width="4" fill="none"/><circle cx="50" cy="26" r="10" fill="#ff8fab" ${L}/><circle cx="30" cy="28" r="9" fill="#ffd166" ${L}/><circle cx="70" cy="28" r="9" fill="#a2d2ff" ${L}/><circle cx="50" cy="26" r="3" fill="#fff"/><path d="M32 66 H68 L62 96 H38 Z" fill="#a2d2ff" ${L}/>`},{kind:"tree",name:"Mini Tree",cat:"plants",w:140,svg:`${Ce}<rect x="44" y="54" width="12" height="30" rx="4" fill="#b07d54" ${L}/><circle cx="50" cy="36" r="30" fill="#52b788" ${L}/><circle cx="38" cy="30" r="5" fill="#ff8fab"/><circle cx="62" cy="40" r="5" fill="#ff8fab"/><circle cx="52" cy="22" r="5" fill="#ff8fab"/><path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${L}/>`},{kind:"cake",name:"Cake",cat:"food",w:100,svg:`<rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${L}/><path d="M16 58 q8 10 17 0 q8 10 17 0 q8 10 17 0 q8 10 17 0" fill="#fff" ${L}/><rect x="46" y="28" width="8" height="22" rx="3" fill="#a2d2ff" ${L}/><path d="M50 14 q6 8 0 12 q-6 -4 0 -12" fill="#ffd166" ${L}/><ellipse cx="50" cy="92" rx="40" ry="5" fill="#fff" ${L}/>`},{kind:"apple",name:"Apple",cat:"food",w:60,svg:`<path d="M50 30 C20 18 8 50 22 74 C32 92 44 90 50 86 C56 90 68 92 78 74 C92 50 80 18 50 30 Z" fill="#ff6b6b" ${L}/><path d="M50 30 Q52 16 58 10" ${L} fill="none"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#80ed99" ${L} transform="rotate(-20 64 18)"/><ellipse cx="34" cy="46" rx="5" ry="9" fill="#fff" opacity=".5"/>`},{kind:"donut",name:"Donut",cat:"food",w:70,svg:`<circle cx="50" cy="58" r="36" fill="#e9c46a" ${L}/><path d="M18 52 Q20 26 50 24 Q80 26 82 52 Q76 62 66 56 Q56 66 46 58 Q34 66 24 58 Z" fill="#ff8fab" ${L}/><circle cx="50" cy="52" r="10" fill="#fff" ${L}/><rect x="30" y="36" width="6" height="3" rx="1.5" fill="#a2d2ff" transform="rotate(30 33 37)"/><rect x="64" y="38" width="6" height="3" rx="1.5" fill="#ffd166"/><rect x="56" y="30" width="6" height="3" rx="1.5" fill="#80ed99" transform="rotate(-30 59 31)"/>`},{kind:"pizza",name:"Pizza",cat:"food",w:80,svg:`<path d="M10 20 Q50 6 90 20 L50 94 Z" fill="#ffd166" ${L}/><path d="M10 20 Q50 6 90 20 L86 28 Q50 16 14 28 Z" fill="#e9a96a" ${L}/><circle cx="42" cy="38" r="7" fill="#ff6b6b" ${L}/><circle cx="62" cy="44" r="6" fill="#ff6b6b" ${L}/><circle cx="50" cy="62" r="6" fill="#ff6b6b" ${L}/>`},{kind:"juice",name:"Juice",cat:"food",w:55,svg:`<path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${L}/><path d="M27 44 H73 L70 92 H30 Z" fill="#ffb347"/><path d="M24 26 H76 L70 92 H30 Z" fill="none" ${L}/><path d="M58 30 L66 4" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="60" r="4" fill="#fff" opacity=".6"/>`},{kind:"cat",name:"Toy cat",cat:"pets",w:110,svg:`${Ce}<path d="M78 80 Q98 70 90 50" stroke="#ffb347" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="30" ry="20" fill="#ffb347" ${L}/><path d="M22 30 L26 8 L40 22 M78 30 L74 8 L60 22" fill="#ffb347" ${L}/><circle cx="50" cy="42" r="28" fill="#ffc46b" ${L}/>${lo(40,60,40)}<path d="M46 50 q4 4 8 0" ${L} fill="none"/>${fa(32,68,50)}`},{kind:"dog",name:"Puppy",cat:"pets",w:120,svg:`${Ce}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#f5ebe0" ${L}/><circle cx="50" cy="42" r="28" fill="#fff" ${L}/><ellipse cx="22" cy="44" rx="10" ry="18" fill="#b07d54" ${L}/><ellipse cx="78" cy="44" rx="10" ry="18" fill="#b07d54" ${L}/><circle cx="60" cy="34" r="8" fill="#e6b88a" opacity=".7"/>${lo(40,60,40)}<ellipse cx="50" cy="52" rx="5" ry="4" fill="${Pe}"/><path d="M50 56 v6" ${L}/>`},{kind:"bunny",name:"Bunny",cat:"pets",w:90,svg:`${Ce}<ellipse cx="36" cy="22" rx="8" ry="20" fill="#fff" ${L}/><ellipse cx="64" cy="22" rx="8" ry="20" fill="#fff" ${L}/><ellipse cx="36" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="64" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="50" cy="76" rx="28" ry="20" fill="#fff" ${L}/><circle cx="50" cy="52" r="22" fill="#fff" ${L}/>${lo(42,58,50)}<path d="M47 58 l3 3 3 -3" ${L} fill="none"/>${fa(36,64,58)}`},{kind:"fish",name:"Fish Bowl",cat:"pets",w:100,svg:`${Ce}<circle cx="50" cy="54" r="40" fill="#cdeffd" ${L}/><path d="M14 46 H86" stroke="#8ecae6" stroke-width="3"/><path d="M60 64 l14 -8 v16 z" fill="#ff9f68" ${L}/><ellipse cx="46" cy="64" rx="16" ry="11" fill="#ffb347" ${L}/><circle cx="40" cy="62" r="2.5" fill="${Pe}"/><circle cx="32" cy="38" r="3" fill="#fff" opacity=".8"/><rect x="24" y="10" width="52" height="8" rx="4" fill="#cdeffd" ${L}/>`},{kind:"kennel",name:"Dog Kennel",cat:"pets",w:210,h:175,holdable:!1,vb:"0 0 120 100",svg:`<ellipse cx="60" cy="97" rx="48" ry="3.2" fill="#000" opacity=".12"/><path d="M14 50 L60 12 L106 50 Z" fill="#ff8fab" ${L}/><path d="M28 46 L60 22 L92 46 Z" fill="#ffd6e4"/><rect x="20" y="46" width="80" height="50" rx="10" fill="#fff6ea" ${L}/><path d="M20 56 H100" stroke="#ffc2d4" stroke-width="7"/><path d="M34 96 V58 Q60 36 86 58 V96 Z" fill="#f3e4ff" ${L}/><path d="M40 96 V64 Q60 46 80 64 V96 Z" fill="#ffe8c7"/><circle cx="86" cy="64" r="8" fill="#bde0fe" ${L}/><circle cx="84" cy="62" r="2.2" fill="#fff" opacity=".9"/><path d="M28 62 l2.4 2.4 2.4-2.4 2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4z" fill="#ff8fab" ${L}/><circle cx="30" cy="90" r="3.2" fill="#fff" ${L}/><rect x="32" y="88.4" width="14" height="3.4" rx="1.7" fill="#fff" ${L}/><circle cx="48" cy="90" r="3.2" fill="#fff" ${L}/>`},{kind:"cat-tower",name:"Cat Tower",cat:"pets",w:150,h:225,holdable:!1,vb:"0 0 100 150",svg:`<ellipse cx="50" cy="146" rx="36" ry="3.4" fill="#000" opacity=".12"/><rect x="44" y="30" width="12" height="104" rx="6" fill="#c9a0dc" ${L}/><ellipse cx="50" cy="136" rx="34" ry="10" fill="#ffc8dd" ${L}/><ellipse cx="50" cy="132" rx="26" ry="6" fill="#fff6ea"/><ellipse cx="50" cy="102" rx="30" ry="8" fill="#bde0fe" ${L}/><ellipse cx="50" cy="98" rx="22" ry="4" fill="#fff" opacity=".8"/><ellipse cx="50" cy="64" rx="28" ry="8" fill="#ffd166" ${L}/><ellipse cx="50" cy="60" rx="20" ry="4" fill="#fff6d0"/><circle cx="50" cy="22" r="8" fill="#ff8fab" ${L}/><circle cx="47" cy="19" r="2.2" fill="#fff" opacity=".75"/><g class="dangle"><circle cx="22" cy="126" r="8" fill="#ffb3c6" ${L}/><path d="M22 126 q12 5 7 16" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/></g><circle cx="80" cy="92" r="3.4" fill="#ffd166" ${L}/>`},{kind:"vanity",name:"Vanity",cat:"furniture",w:230,svg:`${Ce}<ellipse cx="50" cy="26" rx="24" ry="22" fill="#fff" ${L}/><ellipse cx="50" cy="26" rx="18" ry="16" fill="#cdeffd"/><path d="M38 18 l6 -6 M42 26 l10 -10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="12" r="3" fill="#ffd166" ${L}/><circle cx="74" cy="12" r="3" fill="#ffd166" ${L}/><rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${L}/><rect x="10" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${L}/><rect x="62" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${L}/><circle cx="24" cy="75" r="3" fill="${Pe}"/><circle cx="76" cy="75" r="3" fill="${Pe}"/><rect x="12" y="90" width="6" height="7" rx="2" fill="${Pe}"/><rect x="82" y="90" width="6" height="7" rx="2" fill="${Pe}"/>`},{kind:"stool",name:"Vanity Stool",cat:"furniture",w:90,svg:`${Ce}<ellipse cx="50" cy="48" rx="34" ry="14" fill="#c9a0dc" ${L}/><ellipse cx="50" cy="44" rx="28" ry="9" fill="#e4ccf2"/><path d="M28 58 L22 94 M72 58 L78 94 M50 62 V94" ${L}/><ellipse cx="50" cy="78" rx="22" ry="4" fill="none" ${L}/>`},{kind:"perfume",name:"Perfume",cat:"decor",w:50,svg:`<rect x="40" y="8" width="20" height="14" rx="5" fill="#ffd166" ${L}/><rect x="46" y="20" width="8" height="10" fill="#fff" ${L}/><path d="M20 50 Q20 30 50 30 Q80 30 80 50 V80 Q80 94 66 94 H34 Q20 94 20 80 Z" fill="#ff8fab" ${L}/><ellipse cx="36" cy="52" rx="5" ry="10" fill="#fff" opacity=".6"/><path d="M50 56 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#fff" opacity=".8"/>`},{kind:"polish",name:"Nail Polish",cat:"decor",w:40,svg:`<rect x="38" y="4" width="24" height="40" rx="8" fill="${Pe}"/><path d="M24 54 Q24 42 36 42 H64 Q76 42 76 54 V84 Q76 96 64 96 H36 Q24 96 24 84 Z" fill="#b388d6" ${L}/><ellipse cx="38" cy="62" rx="5" ry="12" fill="#fff" opacity=".55"/>`},{kind:"hairdryer",name:"Hair Dryer",cat:"decor",w:90,svg:`<path d="M60 52 L70 92 Q70 96 64 96 H58 Q52 96 52 90 L46 56 Z" fill="#a2d2ff" ${L}/><rect x="6" y="20" width="62" height="40" rx="20" fill="#bde0fe" ${L}/><ellipse cx="82" cy="40" rx="12" ry="20" fill="#ffc8dd" ${L}/><ellipse cx="82" cy="40" rx="6" ry="11" fill="#fff" ${L}/><circle cx="24" cy="40" r="7" fill="#fff" opacity=".7"/>`},{kind:"mirror",name:"Mirror",cat:"decor",w:120,wall:!0,svg:`<path d="M50 6 C74 6 88 24 88 50 C88 76 72 94 50 94 C28 94 12 76 12 50 C12 24 26 6 50 6 Z" fill="#ffd166" ${L}/><ellipse cx="50" cy="50" rx="30" ry="36" fill="#e0f4ff" ${L}/><path d="M36 34 l10 -10 M36 46 l20 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ff8fab" ${L}/>`}],fs={sofa:["living"],armchair:["living"],lamp:["living","bedroom"],tv:["living"],rug:["living","bedroom"],picture:["living","bedroom"],bookshelf:["living","bedroom"],bed:["bedroom"],teddy:["bedroom"],stars:["bedroom"],tub:["bedroom"],balloon:["any"],clock:["any"],window:["any"],ball:["any"],vanity:["salon"],stool:["salon"],perfume:["salon"],polish:["salon"],hairdryer:["salon"],mirror:["salon","bedroom"],fridge:["kitchen"],stove:["kitchen"],table:["kitchen","living"],chair:["kitchen","living"]};for(const e of dg)fs[e.kind]=["nursery"];for(const e of Fi)fs[e.kind]=["backyard"];for(const e of hg)fs[e.kind]=["bathroom"];fs["floor-cushion"]=["living"];fs["story-pillow"]=["bedroom"];fs["berry-basket"]=["kitchen"];fs["ribbon-tray"]=["salon"];wn.push(...dg,...Fi,...hg,...I7);for(const e of wn)e.rooms=fs[e.kind]??(["food"].includes(e.cat)?["kitchen"]:["any"]);const H7=new Set(["rug","tv","tree"]);for(const e of wn)e.holdable??=!e.wall&&e.cat!=="furniture"&&e.w<=150&&!H7.has(e.kind);const O7=[{kind:"ranch-egg",name:"Fresh Egg",cat:"ranch",w:50,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M50 30 C70 30 80 62 80 74 C80 90 66 96 50 96 C34 96 20 90 20 74 C20 62 30 30 50 30 Z" fill="#fff6e6" ${L}/><ellipse cx="40" cy="52" rx="6" ry="9" fill="#fff"/>`},{kind:"ranch-carrot",name:"Garden Carrot",cat:"ranch",w:70,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M30 40 L78 34 L40 96 Z" fill="#ff922b" ${L}/><path d="M44 50 l10 -2 M42 64 l8 -2 M44 78 l6 -1" ${L}/><path d="M72 36 Q80 14 92 14 M72 36 Q68 14 76 4 M72 36 Q90 30 96 36" fill="none" stroke="#40c057" stroke-width="7" stroke-linecap="round"/>`},{kind:"ranch-bouquet",name:"Ranch Flowers",cat:"ranch",w:80,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M50 94 L40 50 M50 94 L50 44 M50 94 L62 50" stroke="#40c057" stroke-width="5" stroke-linecap="round"/><path d="M36 78 L64 78 L56 96 L44 96 Z" fill="#c9a0dc" ${L}/>${[[38,40,"#ff8fab"],[50,30,"#ffd43b"],[64,40,"#74c0fc"],[44,52,"#ff922b"],[58,52,"#c9a0dc"]].map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="9" fill="${n}" ${L}/><circle cx="${e}" cy="${t}" r="3" fill="#fff3b0"/>`).join("")}`}];wn.push(...qx,...Uy,...O7);const Me=Object.fromEntries(wn.map(e=>[e.kind,e])),gi=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),pt=e=>e.h??e.w,$d=e=>e.img?`<img class="packimg" src="${gi(e.img)}" alt="${gi(e.name)}" draggable="false" />`:`<svg viewBox="${e.vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${e.svg}</svg>`,mn=(e,t=!1)=>{const n=Eo()?Ns(e.kind):void 0;if(!n)return $d(e);const s=t&&!e.wall?'<i class="artshade" aria-hidden="true"></i>':"",o=e.kind==="window"?'<i class="artnight" aria-hidden="true"></i>':"";return`${s}${o}<img class="packimg artimg" data-kind="${gi(e.kind)}" src="${gi(n)}" alt="${gi(e.name)}" draggable="false" />`},W7='<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="22" width="56" height="56" rx="14" fill="#fff6ea" stroke="#5a3d5c" stroke-width="4"/></svg>',U7=(e,t)=>e.img&&/\.webp(?:$|\?)/i.test(e.img)?W7:$d(e);let ap=!1;function V7(){ap||typeof window>"u"||(ap=!0,window.addEventListener("error",e=>{const t=e.target;if(!(t instanceof HTMLImageElement)||!t.classList.contains("artimg")||t.dataset.fell==="1")return;const n=Me[t.dataset.kind||""];if(!n)return;t.dataset.fell="1",t.parentElement?.querySelector(".artshade")?.remove(),t.parentElement?.querySelector(".artnight")?.remove();const s=document.createElement("div");s.innerHTML=$d(n);const o=s.firstElementChild;o&&t.replaceWith(o)},!0))}const rp=new WeakMap;function Q7(e){const t=rp.get(e);if(t)return t;if(!e.complete||!e.naturalWidth)return null;const n=document.createElement("canvas");n.width=e.naturalWidth,n.height=e.naturalHeight;const s=n.getContext("2d",{willReadFrequently:!0});if(!s)return null;try{s.drawImage(e,0,0)}catch{return null}const o=s.getImageData(0,0,n.width,n.height).data;return rp.set(e,o),o}function z7(e,t,n){const s=e.getBoundingClientRect();if(s.width<1||s.height<1||!e.naturalWidth)return null;let o=(t-s.left)/s.width;const i=(n-s.top)/s.height;e.closest(".flipped")&&(o=1-o);const a=e.naturalWidth,r=e.naturalHeight,l=Math.min(s.width/a,s.height/r),c=a*l,d=r*l,f=(s.width-c)*.5,p=s.height-d,g=(o*s.width-f)/l,b=(i*s.height-p)/l;return g<0||b<0||g>=a||b>=r?null:{x:g,y:b}}function xd(e,t,n){const s=Q7(e),o=s&&z7(e,t,n);if(!s||!o)return!s;const i=Math.floor(o.x),r=(Math.floor(o.y)*e.naturalWidth+i)*4+3;return s[r]>24}function q7(e,t){const n=[];try{for(let s=0;s<12;s++){const o=document.elementFromPoint(e,t);if(!o)return null;const i=o.closest("img.artimg");if(i&&!xd(i,e,t)){n.push(i),i.style.pointerEvents="none";continue}return o}return null}finally{for(let s=0;s<n.length;s++)n[s].style.pointerEvents=""}}const Z7="var(--line)",N7=1.4,ct='fill="#3a1d3c" opacity=".14"',kc='fill="#3a1d3c" opacity=".22"',qt={l:[72,172],r:[128,172]},hn={l:[50,233],r:[150,233]},F7={l:[88,238],r:[112,238]};function B(e=3){return`stroke="${Z7}" stroke-width="${(e*N7).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"`}function x(e){const n=(Math.round(e*10)/10).toFixed(1);return n.endsWith(".0")?n.slice(0,-2):n}function wc(e,t,n,s,o){const i=o*Math.PI/180,a=e-n,r=t-s,l=Math.cos(i),c=Math.sin(i);return{x:n+a*l-r*c,y:s+a*c+r*l}}function ui(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=(n>>16&255)*(1-t),i=(n>>8&255)*(1-t),a=(n&255)*(1-t);return"#"+s(o)+s(i)+s(a)}function lp(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=n>>16&255,i=n>>8&255,a=n&255;return"#"+s(o+(255-o)*t)+s(i+(255-i)*t)+s(a+(255-a)*t)}function vc(e,t,n,s,o=0){const i=e[0],a=e[1],r=e[0]===t[0]&&e[1]===t[1]?t[0]+.01:t[0],l=t[1],c=r-i,d=l-a,f=Math.hypot(c,d)||1,p=-d/f,g=c/f,b=(i+r)/2+p*o,m=(a+l)/2+g*o,v=n/2,y=s/2,u=(v+y)/2*1.04,w=[i+p*v,a+g*v],_=[r+p*y,l+g*y],S=[r-p*y,l-g*y],R=[i-p*v,a-g*v];return`M${x(w[0])} ${x(w[1])} Q${x(b+p*u)} ${x(m+g*u)} ${x(_[0])} ${x(_[1])} A${x(y)} ${x(y)} 0 0 1 ${x(S[0])} ${x(S[1])} Q${x(b-p*u)} ${x(m-g*u)} ${x(R[0])} ${x(R[1])} A${x(v)} ${x(v)} 0 0 1 ${x(w[0])} ${x(w[1])} Z`}function Gr(e,t,n,s,o){const i=[],a=(t-e)/s;for(let r=0;r<s;r++){const l=e+r*a,c=l+a;i.push(`Q${x((l+c)/2)} ${x(n+o)} ${x(c)} ${x(n)}`)}return i.join(" ")}function _c(e,t,n,s,o,i=0){const a=[];for(let r=0;r<s;r++){const l=i+2*Math.PI*r/s,c=i+2*Math.PI*(r+1)/s,d=(l+c)/2,f=e+n*Math.cos(l),p=t+n*Math.sin(l),g=e+n*Math.cos(c),b=t+n*Math.sin(c),m=e+(n+o)*Math.cos(d),v=t+(n+o)*Math.sin(d);r===0&&a.push(`M${x(f)} ${x(p)}`),a.push(`Q${x(m)} ${x(v)} ${x(g)} ${x(b)}`)}return a.join(" ")+" Z"}function Rn(e,t,n,s){const o=e==="arm"?qt[t]:F7[t],i=e==="arm"?t==="l"?s.armL:s.armR:t==="l"?s.legL:s.legR,a=e==="leg"?t==="l"?s.legLLift:s.legRLift:0,r=i||a?` transform="translate(0 ${x(-a)}) rotate(${x(i)} ${o[0]} ${o[1]})"`:"";return`<g class="${e} ${t}${e==="arm"?" hang":""}"${r} style="transform-box:view-box;transform-origin:${o[0]}px ${o[1]}px">${n}</g>`}const Jn="var(--line)";function En(e,t=.8,n=2.2){return e.map(s=>`<path d="${s}" fill="none" stroke="var(--hair-shade)" stroke-width="${n}" stroke-linecap="round" opacity="${t}"/>`).join("")}function oi(e,t=.32){return e.map(n=>`<path d="${n}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${t}"/>`).join("")}function Un(){return'<path d="M54 72 Q62 44 92 38 Q70 50 63 74 Z" fill="#fff" opacity=".45"/><path d="M60 64 Q70 48 86 42" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".8"/><path d="M104 37 Q130 38 145 58 Q128 46 106 43 Z" fill="#fff" opacity=".3"/><circle cx="72" cy="50" r="2" fill="#fff" opacity=".85"/>'}function Ct(e,t,n){return n?`<path d="${e}" fill="url(#${t}h)"/>`:""}const cp="M34 112 Q28 28 100 28 Q172 28 166 112 Q164 146 146 156 L54 156 Q36 146 34 112 Z";function Vt(e,t){return`<path d="${cp}" fill="var(--hair)" ${B(3.2)}/>${Ct(cp,e,t)}`}function Cl(e,t,n,s,o,i,a=10){const r=_c(e+2,t+3,n,12,7,s+.1),l=_c(e,t,n-1,12,7,s);let c=`<path d="${r}" fill="var(--hair-shade)" ${B(3.2)}/><path d="${l}" fill="var(--hair)" ${B(3.2)}/>${Ct(l,o,i)}`;for(let d=0;d<a;d++){const f=d*2.5+s,p=(n-6)*Math.sqrt((d+.5)/a),g=e+p*Math.cos(f),b=t+p*Math.sin(f);c+=`<path d="M${x(g-4)} ${x(b+1)} q1 -5 4.5 -4.5 q3.5 1 2.5 4.5" fill="none" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>`,b<t-2&&g<e+6&&(c+=`<path d="M${x(g-2.5)} ${x(b-2.5)} q2 -2 3.5 -1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`)}return c+=`<ellipse cx="${x(e-10)}" cy="${x(t-12)}" rx="6" ry="3.4" fill="#fff" opacity=".55" transform="rotate(-35 ${x(e-10)} ${x(t-12)})"/>`,c+=`<path d="M${x(e-16)} ${x(t-6)} Q${x(e-6)} ${x(t-18)} ${x(e+4)} ${x(t-14)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>`,c}function Rs(e,t,n,s=6,o=[],i=7){let a=`<path d="M${e} ${t-6} V${n}" stroke="${Jn}" stroke-width="${x(2*s+4.6)}" stroke-linecap="round"/><path d="M${e} ${t-6} V${n}" stroke="var(--hair)" stroke-width="${x(2*s)}" stroke-linecap="round"/>`,r=t,l=0;for(;r<n;){const c=l%2?1:-1;a+=`<path d="M${x(e-c)} ${x(r-4)} Q${x(e+c*s*1.05)} ${x(r-2)} ${x(e+c*s*.55)} ${x(r+4)} Q${x(e)} ${x(r+5.5)} ${x(e-c*1.4)} ${x(r+1)}" fill="none" stroke="var(--hair-shade)" stroke-width="1.7" stroke-linecap="round"/>`,c>0&&(a+=`<path d="M${x(e+1)} ${x(r-2)} q2.2 -.5 3 1.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>`),r+=i,l++}for(let c=0;c<o.length;c++){const d=o[c];a+=`<rect x="${x(e-6.2)}" y="${d-4}" width="12.4" height="8" rx="2.6" fill="var(--acc)" stroke="${Jn}" stroke-width="2"/><rect x="${x(e-4)}" y="${d-2.5}" width="2.6" height="4.5" rx="1" fill="#fff" opacity=".6"/>`}return a+=`<path d="M${e-4} ${n+2} q2 5 4 6 q2 -1 4 -6" fill="var(--hair)" stroke="${Jn}" stroke-width="2"/>`,a}function ir(e,t,n,s=5.5){let o=`<path d="M${e} ${t} V${n}" stroke="${Jn}" stroke-width="${x(2*s+4)}" stroke-linecap="round"/><path d="M${e} ${t} V${n}" stroke="var(--hair)" stroke-width="${x(2*s)}" stroke-linecap="round"/>`;for(let i=t+8;i<n;i+=16)o+=`<path d="M${x(e-s*.7)} ${i} Q${e} ${i+5} ${x(e+s*.7)} ${i}" fill="none" stroke="var(--hair-shade)" stroke-width="1.6" opacity=".8"/>`;return o+=`<circle cx="${e}" cy="${n+3}" r="${x(s*.55)}" fill="var(--hair)" stroke="${Jn}" stroke-width="2"/>`,o}function Sl(e,t,n,s){return`<path d="${e}" fill="var(--hair)" ${B(3)}/>${Ct(e,t,n)}${En(s)}${oi(s.slice(0,2),.45)}`}function co(e,t,n){return`<ellipse cx="${e}" cy="${t}" rx="8" ry="5.5" fill="var(--acc)" ${B(2.4)} transform="rotate(${n} ${e} ${t})"/><ellipse cx="${e-1}" cy="${t-2}" rx="2.4" ry="1.3" fill="#fff" opacity=".6" transform="rotate(${n} ${e-1} ${t-2})"/>`}const Vn='<path d="M42 104 Q44 76 70 66 Q86 74 100 58 Q114 74 130 66 Q156 76 158 104" fill="none" stroke="#3a1d3c" stroke-width="9" opacity=".12"/>';function gg(e){return e==="puffs"||e==="coily"?"puffs":e==="afro"?"afro":e==="braids"?"braids":e==="boxbraids"?"box":e==="locs"?"locs":e==="sidebraid"?"sidebraid":e==="crown"?"crown":e==="pony"?"pony":e==="sidepony"?"sidepony":e==="pigtails"?"pigtails":e==="halfup"?"halfup":e==="buns"?"buns":e==="topbun"?"topbun":e==="lowbun"?"lowbun":e==="long"?"long":e==="wavy"||e==="wavybob"?e==="wavy"?"wavy":"bob":e==="bob"||e==="curlybob"||e==="sidebangs"?"bob":e==="pixie"?"pixie":(e==="bangs"||e==="short")&&e==="bangs"?"bangs":"short"}function j7(e,t,n){const s=gg(e);if(s==="puffs"){const o=e==="coily"?26:30;return Cl(48,52,o,0,t,n,12)+Cl(152,52,o,.3,t,n,12)+`<path d="M42 112 Q38 48 100 44 Q162 48 158 112 Q154 144 100 146 Q46 144 42 112 Z" fill="var(--hair)" ${B(3.2)}/>`+co(66,68,-35)+co(134,68,35)}if(s==="afro")return Cl(100,78,78,.2,t,n,14);if(s==="braids")return Vt(t,n)+Rs(34,108,230,5.4,[196])+Rs(166,108,230,5.4,[196]);if(s==="box")return Vt(t,n)+Rs(30,110,228,5,[200],10)+Rs(170,110,228,5,[200],10);if(s==="locs")return Vt(t,n)+ir(32,112,236)+ir(168,112,236);if(s==="sidebraid")return Vt(t,n);if(s==="pony"||s==="sidepony"||s==="halfup"){const o=s==="sidepony"?"M118 78 Q150 70 158 120 Q164 160 150 200 Q136 188 138 160 Q132 120 124 96 Z":"M126 40 Q178 28 180 92 Q184 132 168 168 Q160 196 174 220 Q148 212 145 182 Q140 156 152 124 Q160 90 132 64 Z",i=s==="halfup"?70:s==="sidepony"?86:44;return Vt(t,n)+Sl(o,t,n,s==="sidepony"?["M130 96 Q150 120 146 160","M138 110 Q154 140 148 180"]:["M146 56 Q170 88 160 130","M156 66 Q176 100 166 140","M150 150 Q148 180 160 206"])+co(s==="sidepony"?124:128,i,s==="sidepony"?-20:25)}if(s==="pigtails")return Vt(t,n)+Sl("M40 100 Q22 120 28 168 Q34 200 48 214 Q58 196 52 160 Q58 124 56 108 Z",t,n,["M40 120 Q32 150 40 184"])+Sl("M160 100 Q178 120 172 168 Q166 200 152 214 Q142 196 148 160 Q142 124 144 108 Z",t,n,["M160 120 Q168 150 160 184"])+co(52,96,20)+co(148,96,-20);if(s==="buns"){let o="";for(const i of[52,148])o+=`<circle cx="${i}" cy="44" r="24" fill="var(--hair)" ${B(3.2)}/>${n?`<circle cx="${i}" cy="44" r="24" fill="url(#${t}h)"/>`:""}`,o+=En([`M${i-14} 48 Q${i-14} 28 ${i} 26 Q${i+16} 30 ${i+14} 48`,`M${i-8} 54 Q${i+8} 56 ${i+12} 48`]),o+=`<path d="M${i-12} 34 Q${i-4} 24 ${i+4} 26" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>`;return o+Vt(t,n)}if(s==="topbun")return`<circle cx="100" cy="30" r="26" fill="var(--hair)" ${B(3.2)}/>${n?`<circle cx="100" cy="30" r="26" fill="url(#${t}h)"/>`:""}<path d="M82 28 Q100 12 118 28" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>${En(["M86 36 Q100 24 114 36","M90 42 Q100 34 110 42"])}${Vt(t,n)}`;if(s==="lowbun")return Vt(t,n)+`<circle cx="100" cy="168" r="22" fill="var(--hair)" ${B(3)}/>${n?`<circle cx="100" cy="168" r="22" fill="url(#${t}h)"/>`:""}${co(100,148,0)}`;if(s==="long"||s==="wavy"){const o=s==="wavy"?"M36 108 Q28 160 40 210 Q52 250 46 286 Q70 270 78 230 Q60 180 58 140 Q52 120 48 108 Z M164 108 Q172 160 160 210 Q148 250 154 286 Q130 270 122 230 Q140 180 142 140 Q148 120 152 108 Z":"M38 110 Q30 170 36 240 Q42 280 34 300 L70 292 Q64 240 66 180 Q62 140 56 112 Z M162 110 Q170 170 164 240 Q158 280 166 300 L130 292 Q136 240 134 180 Q138 140 144 112 Z";return`<path d="${o}" fill="var(--hair)" ${B(3)}/>${Ct(o,t,n)}${Vt(t,n)}`}if(s==="bob"){const o=e==="curlybob"?"M30 120 Q24 170 48 196 Q70 210 100 206 Q130 210 152 196 Q176 170 170 120 Q150 150 100 156 Q50 150 30 120 Z":"M32 116 Q26 168 50 190 Q78 204 100 200 Q122 204 150 190 Q174 168 168 116 Q150 148 100 154 Q50 148 32 116 Z";return`<path d="${o}" fill="var(--hair)" ${B(3.2)}/>${Ct(o,t,n)}${Vt(t,n)}`}return Vt(t,n)}function G7(e,t,n){const s=gg(e),o='<path d="M100 34 V56" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>';if(s==="puffs"||s==="braids"||s==="box"||s==="locs"||s==="afro"||s==="bangs"){const a=s==="afro"?"M48 100 Q52 48 100 40 Q148 48 152 100 Q140 78 100 70 Q60 78 48 100 Z":s==="bangs"?"M40 108 Q36 40 100 34 Q164 40 160 108 L150 96 Q130 108 100 100 Q70 108 50 96 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q154 74 130 62 Q112 70 100 52 Q88 70 70 62 Q46 74 40 106 Z";let r=Vn+`<path d="${a}" fill="var(--hair)" ${B(3.2)}/>${Ct(a,t,n)}${o}`;return r+=En(["M84 44 Q70 52 60 70","M116 44 Q130 52 140 70","M92 40 Q80 48 74 58","M108 40 Q120 48 126 58","M76 42 Q58 56 52 82","M124 42 Q142 56 148 82"]),r+=oi(["M90 36 Q78 42 70 52","M112 36 Q124 42 132 52"]),s==="puffs"?(r+=`<path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="${Jn}" stroke-width="7" stroke-linecap="round"/><path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`,r+=`<path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="${Jn}" stroke-width="7" stroke-linecap="round"/><path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`):s==="braids"||s==="box"?(r+=Rs(48,114,200,5,[156],s==="box"?10:7),r+=Rs(152,114,200,5,[156],s==="box"?10:7)):s==="locs"&&(r+=ir(46,116,210,4.6)+ir(154,116,210,4.6)),r+Un()}if(s==="sidebraid"){const a="M40 108 Q36 36 100 32 Q164 36 160 100 Q140 78 100 70 Q70 80 40 108 Z";return Vn+`<path d="${a}" fill="var(--hair)" ${B(3.2)}/>${Ct(a,t,n)}${En(["M70 46 Q86 60 96 74","M120 44 Q136 58 146 74"])}${Rs(150,100,210,5.6,[168],7)}${Un()}`}if(s==="crown"){const a="M40 106 Q36 36 100 32 Q164 36 160 106 Q150 80 100 74 Q50 80 40 106 Z";let r="";for(let l=0;l<7;l++){const c=58+l*14;r+=`<path d="M${c} 58 Q${c+7} 46 ${c+14} 58" fill="none" stroke="var(--hair-shade)" stroke-width="3.2" stroke-linecap="round"/>`}return Vn+`<path d="${a}" fill="var(--hair)" ${B(3.2)}/>${Ct(a,t,n)}${r}${Un()}`}if(s==="pony"||s==="sidepony"||s==="halfup"||s==="pigtails"){const a=s==="sidepony"?"M40 108 Q34 36 100 32 Q166 34 160 108 Q150 86 120 78 Q90 90 60 74 Q48 90 40 108 Z":"M40 108 Q34 34 100 32 Q166 34 160 108 Q156 84 144 72 Q128 86 104 80 Q86 78 72 68 Q60 84 48 84 Q42 94 40 108 Z";let r=Vn+`<path d="${a}" fill="var(--hair)" ${B(3.2)}/>${Ct(a,t,n)}`;return r+=`<path d="M40 104 Q36 120 44 132 Q46 116 50 106 Z" fill="var(--hair)" ${B(2.4)}/><path d="M160 104 Q164 120 156 132 Q154 116 150 106 Z" fill="var(--hair)" ${B(2.4)}/>`,r+=En(["M70 46 Q90 60 104 74","M128 46 Q140 60 146 74","M96 40 Q110 56 116 66"]),r+=oi(["M76 42 Q92 52 100 62"]),r+Un()}if(s==="buns"||s==="topbun"||s==="lowbun"){const a=s==="topbun"?"M44 108 Q40 50 100 46 Q160 50 156 108 Q148 82 100 74 Q52 82 44 108 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q152 80 138 70 Q126 80 112 76 Q104 82 100 74 Q96 82 88 76 Q74 80 62 70 Q48 80 40 106 Z";let r=Vn+`<path d="${a}" fill="var(--hair)" ${B(3.2)}/>${Ct(a,t,n)}`;if(r+=En(["M80 42 Q72 56 68 68","M120 42 Q128 56 132 68","M100 36 Q98 56 100 70","M90 38 Q84 56 86 72","M110 38 Q116 56 114 72"]),r+=oi(["M86 38 Q80 46 78 54","M114 38 Q120 46 122 54"]),s==="buns")for(const[l,c]of[[42,1],[158,-1]]){const d=`M${l} 100 q${-8*c} 14 ${-2*c} 24 q${5*c} 8 ${-1*c} 14`;r+=`<path d="${d}" fill="none" stroke="${Jn}" stroke-width="7" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`}return r+Un()}if(s==="long"||s==="wavy"||s==="bob"){const a=e==="sidebangs"||e==="wavybob"?"M38 108 Q34 40 70 36 Q100 34 112 48 Q90 70 48 78 Q36 90 38 108 Z M112 48 Q140 36 164 50 Q166 100 150 108 Q130 80 112 70 Z":"M40 108 Q34 36 100 32 Q166 36 160 108 Q152 78 128 68 Q112 78 100 60 Q88 78 72 68 Q48 78 40 108 Z";return Vn+`<path d="${a}" fill="var(--hair)" ${B(3.2)}/>${Ct(a,t,n)}${En(["M78 46 Q68 64 64 80","M122 46 Q132 64 136 80","M100 38 V64"])}${oi(["M88 40 Q80 50 76 60"])}${Un()}`}if(s==="pixie"){const a="M48 104 Q44 48 100 40 Q140 46 150 78 Q156 100 140 108 Q120 86 100 90 Q70 84 52 104 Z";return Vn+`<path d="${a}" fill="var(--hair)" ${B(3.2)}/>${Ct(a,t,n)}${En(["M70 56 Q86 70 96 84","M118 52 Q132 66 138 82"])}${Un()}`}const i="M46 106 Q42 46 100 38 Q158 46 154 106 Q140 80 100 76 Q60 80 46 106 Z";return Vn+`<path d="${i}" fill="var(--hair)" ${B(3.2)}/>${Ct(i,t,n)}${o}${Un()}`}const Co="var(--line)";function Md(e){return Math.abs(e.legL)>=40||Math.abs(e.legR)>=40}function Fs(e,t,n,s=[]){const o=s.map(i=>`<path d="${i}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`).join("");return(n?`<path d="${e}" fill="url(#${t}c)"/>`:"")+o}function $c(e,t,n){const s=(n+7).toFixed(1);return`<path d="${e}" fill="none" stroke="${Co}" stroke-width="${s}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function Ld(e,t,n){return Rn("arm",e,t,n).replace('class="arm ','class="arm sleeve ')}function Sa(e,t,n=!1){const[s,o]=qt[e],i=e==="l"?-1:1;let a=$c(`M${s} ${o} L${s+7*i} ${o+20}`,"var(--top)",22);return n&&(a+=`<path d="M${s+7*i-12} ${o+17} H${s+7*i+12}" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round" opacity=".9" transform="rotate(${-18*i} ${s+7*i} ${o+17})"/>`),Ld(e,a,t)}function mi(e,t,n=!0){const[s,o]=qt[e],[i,a]=hn[e],r=e==="l"?-1:1,l=(s+i)/2+6*r;let c=$c(`M${s-2*r} ${o-2} Q${l} ${(o+a)/2-6} ${i-r} ${a-16}`,"var(--top)",21);return n&&(c+=$c(`M${i-3*r} ${a-17} L${i-r} ${a-13}`,"var(--top-trim)",20)),Ld(e,c,t)}function xc(e,t,n=!1){const[s,o]=qt[e],i=e==="l"?-1:1,a=s+4*i,r=o+8;let l=`<path d="${_c(a,r,13,9,3.2)}" fill="var(--top)" ${B(2.8)}/>`;return l+=`<ellipse cx="${a-4*i}" cy="${r-5}" rx="5" ry="3" fill="#fff" opacity=".45"/>`,n&&(l+=`<path d="M${a-11} ${r+13} ${Gr(a-11,a+11,r+13,4,3)}" fill="none" stroke="#fff" stroke-width="2.4"/>`),Ld(e,l,t)}function zt(e,t){return e("l",t)+e("r",t)}const dp="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 228 Q100 236 64 228 Z";function xs(e,t,n,s,o,i,a="",r=[],l=!1){const c=`<path d="${t}" fill="var(--top)" ${B(3)}/>${Fs(t,s,o,r)}${a}`;return`<g class="shirt" data-hem="${i}">${l?c+n:n+c}</g>`}function Y7(e,t,n,s,o){if(t.dress)return"";const i=t.top;if(i==="hoodie"){const l="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L139 230 Q100 240 61 230 Z",c=`<path d="M120 162 Q132 164 134 170 L139 230 Q128 233 123 233 Z" ${ct}/><path d="M72 172 Q76 164 86 163" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".38"/><path d="M78 159 Q100 182 122 159 Q120 152 100 152 Q80 152 78 159 Z" fill="var(--top-trim)" ${B(2.8)}/><path d="M92 172 v18 M108 172 v18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="92" cy="191" r="2.6" fill="#fff" ${B(1.8)}/><circle cx="108" cy="191" r="2.6" fill="#fff" ${B(1.8)}/><path d="M78 202 H122 L127 222 H73 Z" fill="var(--top)" ${B(2.6)}/><path d="M78 202 H122 L124 210 H76 Z" ${ct}/><path d="M61 226 Q100 236 139 226 L139 234 Q100 244 61 234 Z" fill="var(--top-trim)" ${B(2.8)}/>`;return xs(e,l,zt(mi,e),n,s,o,c,["M74 196 q-2 12 2 22","M126 190 q2 14 0 26"])}if(i==="stripes"||i==="jersey"){const l="M68 168 Q74 158 92 158 H108 Q126 158 132 168 L135 232 Q100 238 65 232 Z",c=`${n}st`,d=i==="jersey"?'<path d="M70 176 H130 L128 188 H72 Z" fill="var(--top-trim)"/><path d="M68 210 H132 L130 222 H70 Z" fill="var(--top-trim)"/>':[166,179,192,205,218,231].map(b=>`<rect x="60" y="${b}" width="80" height="6" fill="var(--top-trim)"/>`).join(""),f=i==="jersey"?'<path d="M86 160 L100 176 L114 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/>':'<path d="M84 159 Q100 172 116 159" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',p=s?`<path d="${l}" fill="url(#${n}c)"/>`:"";return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${c}"><path d="${l}"/></clipPath></defs>${zt(b=>Sa(b,e,!0),e)}<path d="${l}" fill="var(--top)"/><g clip-path="url(#${c})">${p}<path d="M118 160 L135 168 L138 236 H120 Z" ${ct}/>${d}</g><path d="${l}" fill="none" ${B(3)}/>${f}<path d="M78 198 q-2 12 1 24" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/><path d="M122 190 q2 14 0 28" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/></g>`}if(i==="sweater"||i==="cardigan"){const l=i==="cardigan"?"M68 168 Q74 158 92 158 H108 Q126 158 132 168 L134 232 H108 L100 210 L92 232 H66 Z":"M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 234 Q100 242 64 234 Z",c=`<path d="M118 166 L134 174 L136 230 Q120 236 112 228 Z" ${ct}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M64 226 Q100 236 136 226" fill="none" stroke="var(--top-trim)" stroke-width="6" stroke-linecap="round"/>`,d=i==="cardigan"?[186,202,218].map(f=>`<circle cx="100" cy="${f}" r="2.4" fill="var(--top-trim)" ${B(1.4)}/>`).join(""):"";return xs(e,l,zt(mi,e),n,s,o,c+d,["M80 190 q-2 16 0 28","M120 188 q2 16 0 30"])}if(i==="tank"||i==="bib"){const l=i==="bib"?"M78 168 H122 L126 228 H74 Z":"M78 168 Q86 160 96 164 H104 Q114 160 122 168 L128 226 H72 Z",c=`<path d="M110 172 H126 L128 226 H114 Z" ${ct}/><path d="M82 176 Q84 168 92 166" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".35"/>`,d=i==="bib"?`${c}<path d="M86 150 L78 168 M114 150 L122 168" stroke="${Co}" stroke-width="8" stroke-linecap="round"/><path d="M86 150 L78 168 M114 150 L122 168" stroke="var(--top)" stroke-width="4.5" stroke-linecap="round"/><rect x="90" y="176" width="20" height="16" rx="3" fill="var(--top-trim)" ${B(1.6)}/>`:`${c}<path d="M84 166 Q100 176 116 166" fill="none" stroke="var(--top-trim)" stroke-width="4"/>`;return xs(e,l,"",n,s,o,d,["M88 190 q2 14 0 24"])}if(i==="puff"||i==="ruffle"){const l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L132 222 H68 Z",c=`<path d="M100 172 l-8 -5 v10 z M100 172 l8 -5 v10 z" fill="var(--top-trim)" ${B(1.8)}/><path d="M97 174 l-4 10 M103 174 l4 10" stroke="var(--top-trim)" stroke-width="2.6" stroke-linecap="round"/>`,d=(i==="ruffle"?`<path d="M68 166 Q74 178 82 166 Q90 180 100 166 Q110 180 118 166 Q126 180 132 166" fill="var(--top-trim)" ${B(2)}/>`:c)+`<path d="M118 162 Q128 164 130 170 L132 222 H120 Z" ${ct}/><path d="M74 176 Q76 168 84 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return xs(e,l,zt(xc,e),n,s,o,d,["M86 190 q2 10 0 20","M116 188 q-2 12 0 22"],!0)}if(i==="button"){const l=dp,c=[180,196,212].map(f=>`<circle cx="100" cy="${f}" r="2.6" fill="#fff" ${B(1.6)}/>`).join(""),d=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${ct}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M100 164 V226" stroke="#fff" stroke-width="2" opacity=".7"/>${c}<path d="M82 160 Q100 172 118 160" fill="var(--top)" ${B(2.2)}/>`;return xs(e,l,zt(f=>Sa(f,e,!1),e),n,s,o,d,["M78 196 q-1 12 2 20"])}if(i==="raincoat"){const l="M62 168 Q70 156 92 156 H108 Q130 156 138 168 L146 240 Q100 252 54 240 Z",c=`<path d="M120 164 L142 176 L146 236 Q124 244 116 232 Z" ${ct}/><path d="M72 176 Q76 166 88 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M70 156 Q100 176 130 156" fill="none" stroke="var(--top-trim)" stroke-width="6"/><circle cx="100" cy="196" r="4" fill="var(--top-trim)" ${B(1.8)}/><path d="M78 214 H122" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round"/>`;return xs(e,l,zt(mi,e),n,s,o,c,["M76 190 q-4 18 -2 36","M124 188 q4 18 2 36"])}const a=dp,r=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${ct}/><path d="M84 160 Q100 172 116 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return xs(e,a,zt(l=>Sa(l,e,!1),e),n,s,o,r,["M78 196 q-2 12 1 22","M122 194 q2 14 -1 24"])}function fp(e,t,n,s,o,i=!1,a=16){const r=e==="l"?88:112,l=e==="l"?-1:1,c=`M${r-a/2} 226 Q${r-a/2+l} ${n-20} ${r-a/2+2*l} ${n} H${r+a/2} Q${r+a/2} ${n-30} ${r+a/2-l} 226 Z`;let d=`<path d="${c}" fill="var(--bottom)" ${B(2.8)}/>`;return d+=Fs(c,s,o,[`M${r-4*l} 240 Q${r} ${(226+n)/2} ${r+3*l} ${n-14}`]),e==="r"?d+=`<path d="M${r+1} 230 H${r+a/2} L${r+a/2} ${n} H${r+4} Z" ${ct}/>`:d+=`<path d="M${r-2} 238 Q${r-6} ${(226+n)/2} ${r-2} ${n-10}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".3"/>`,i&&(d+=`<path d="M${r-a/2-1} ${n-8} H${r+a/2+1} V${n+1} H${r-a/2-1} Z" fill="var(--bottom-trim)" ${B(2)}/>`),Rn("leg",e,d,t)}function K7(e,t,n,s){if(t.dress)return'<g data-layer="bottom"></g>';const o=t.bottom;if(Md(e)&&(o==="skirt"||o==="tutu"||o==="overalls"))return`<g data-layer="bottom"><path class="skirt" d="${o==="tutu"?"M52 216 H148 L160 248 Q100 260 40 248 Z":"M62 218 H138 L152 252 Q100 264 48 252 Z"}" fill="var(--bottom)" ${B(3)}/></g>`;if(o==="skirt"){const p="M68 222 H132 L146 262 Q100 274 54 262 Z";return`<g data-layer="bottom"><path class="skirt" d="${p}" fill="var(--bottom)" ${B(3)}/>${Fs(p,n,s,["M82 234 L76 258","M100 232 V266","M118 234 L126 258"])}<path d="M114 224 H132 L146 262 Q130 268 118 266 Z" ${ct}/><path d="M72 228 Q66 246 64 258" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".3"/><path d="M84 236 v10 M116 236 v10" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/></g>`}if(o==="tutu")return'<g data-layer="bottom"></g>';if(o==="overalls"){const p="M66 220 H134 L139 264 H106 L100 254 L94 264 H61 Z";return`<g data-layer="bottom"><g class="leg" style="transform-box:view-box;transform-origin:100px 238px"><path d="${p}" fill="var(--bottom)" ${B(3)}/>${Fs(p,n,s,["M78 232 Q74 248 72 260","M122 230 Q128 248 132 260"])}<path d="M118 222 H134 L139 264 H122 Z" ${ct}/><path d="M64 258 H95 M105 258 H138" stroke="var(--bottom-trim)" stroke-width="4"/></g></g>`}const a=o==="shorts"?256:292,r=o==="joggers"||o==="jeans",l=o==="leggings"?12:o==="shorts"?18:16,c=fp("l",e,a,n,s,r,l)+fp("r",e,a,n,s,r,l),d=o==="jeans"?'<path d="M88 232 V286 M112 232 V286" stroke="#c9a24a" stroke-width="1.4" stroke-dasharray="2 3" opacity=".7"/>':"";return`<g data-layer="bottom">${`<path d="M70 220 H130 V230 H70 Z" fill="var(--bottom)" ${B(2.4)}/>`}${c}${d}</g>`}function X7(e,t,n,s){if(t.dress)return'<g data-layer="bottom-over"></g>';const o=t.bottom;if(o==="overalls"){const i="M78 180 H122 L124 228 H76 Z";return`<g data-layer="bottom-over"><path d="M80 176 L72 164 M120 176 L128 164" stroke="${Co}" stroke-width="12" stroke-linecap="round"/><path d="M80 176 L72 164 M120 176 L128 164" stroke="var(--bottom)" stroke-width="7.5" stroke-linecap="round"/><path d="${i}" fill="var(--bottom)" ${B(3)}/>${Fs(i,n,s,["M86 200 q14 6 28 0"])}<path d="M88 190 H112 V206 Q100 212 88 206 Z" fill="var(--bottom-trim)" ${B(2.4)}/><circle cx="82" cy="186" r="3.6" fill="#fff" ${B(2)}/><circle cx="118" cy="186" r="3.6" fill="#fff" ${B(2)}/><path d="M66 222 H134 L135 230 H65 Z" fill="var(--bottom)" ${B(3)}/><path d="M108 180 H122 L124 228 H110 Z" ${ct}/><path d="M82 182 v12" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/></g>`}if(o==="tutu"){if(Md(e))return`<g data-layer="bottom-over"><path class="skirt" d="M58 220 H142 L154 246 Q100 256 46 246 Z" fill="var(--bottom)" ${B(2.4)}/></g>`;let i="";const a=[[266,50,150,8],[256,56,144,7],[246,64,136,6]];for(let l=0;l<a.length;l++){const[c,d,f,p]=a[l],g=`M${d+8} ${c-22} H${f-8} L${f} ${c} ${Gr(f,d,c,6,p)} Z`;i+=`<path class="skirt" d="${g}" fill="var(--bottom)" ${B(2.4)}/>`,i+=`<path d="M${f-20} ${c-16} L${f-6} ${c-2}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".2"/>`}const r="M66 214 H134 V224 H66 Z";return`<g data-layer="bottom-over">${i}<path d="${r}" fill="var(--bottom-trim)" ${B(2.6)}/>${Fs(r,n,s)}</g>`}return'<g data-layer="bottom-over"></g>'}function pp(e,t){return`<path d="M${e} ${t+2} c-3 -5 -9 -1 -5 3 l5 4 l5 -4 c4 -4 -2 -8 -5 -3z" fill="var(--top-trim)" opacity=".85"/>`}function J7(e,t,n,s,o){const i=t.dress;if(!i)return"";const a=`${n}dr`;let r="M72 210 H128 L150 268 Q100 282 50 268 Z",l="M72 168 Q78 158 94 158 H106 Q122 158 128 168 L130 214 H70 Z",c="",d=zt(b=>xc(b,e,!0),e),f=!0;i==="sundress"?(r="M76 214 H124 L140 266 Q100 276 60 266 Z",c='<path d="M78 166 Q100 180 122 166" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',d="",f=!1):i==="party"?c=[[64,236],[86,228],[108,234],[130,242],[76,254],[100,250],[122,258],[92,188]].map(([m,v])=>pp(m,v)).join("")+`<path d="M100 214 l-10 -6 v12 z M100 214 l10 -6 v12 z" fill="var(--top-trim)" ${B(1.8)}/><path d="M52 262 Q100 276 148 262" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="1 5" opacity=".85"/>`:i==="pinafore"?(l="M80 176 H120 L122 214 H78 Z",c='<path d="M86 158 L80 178 M114 158 L120 178" stroke="var(--top)" stroke-width="5" stroke-linecap="round"/>',d="",f=!1,r="M74 212 H126 L142 264 Q100 274 58 264 Z"):i==="jumper"?(c=`<path d="M84 160 Q100 174 116 160" fill="var(--top-trim)" ${B(2)}/>`,d=zt(b=>Sa(b,e,!0),e),f=!1):i==="ballet"?(r="M78 214 H122 L132 250 Q100 258 68 250 Z",c=`<path d="M70 248 ${Gr(70,130,248,5,5)}" fill="none" stroke="#fff" stroke-width="2"/>`,d=zt(xc,e)):i==="nightgown"?(r="M80 214 H120 L132 270 Q100 278 68 270 Z",c='<path d="M88 164 Q100 176 112 164" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>',d=zt(mi,e),f=!1):i==="raindress"?(r="M70 212 H130 L148 268 Q100 280 52 268 Z",c='<path d="M76 168 Q100 186 124 168" fill="none" stroke="var(--top-trim)" stroke-width="5"/><circle cx="100" cy="198" r="3.4" fill="var(--top-trim)"/>',d=zt(mi,e),f=!1):(r="M70 214 H130 L152 266 Q100 280 48 266 Z",l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L131 216 H69 Z",c=[[66,236],[86,228],[110,232],[132,240],[76,254],[100,248],[124,258],[56,260],[144,262],[96,266],[84,182],[114,190],[100,200]].map(([m,v])=>pp(m,v)).join("")+`<path d="M112 214 H130 L152 266 Q138 271 128 272 Z" ${ct}/><path d="M118 162 L130 168 L131 216 H120 Z" ${ct}/><path d="M50 262 Q100 276 150 262" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9"/><path d="M60 226 Q56 244 54 258" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/><path d="M68 210 H132 V220 H68 Z" fill="var(--top-trim)" ${B(2.6)}/><path d="M100 215 l-13 -8 v16 z M100 215 l13 -8 v16 z" fill="var(--top-trim)" ${B(2.2)}/><circle cx="100" cy="215" r="3.6" fill="var(--top-trim)" ${B(2)}/><path d="M97 218 l-5 14 M103 218 l5 14" stroke="var(--top-trim)" stroke-width="3" stroke-linecap="round"/><path d="M80 158 Q78 172 94 170 Q99 166 100 162 Q101 166 106 170 Q122 172 120 158 Q100 164 80 158 Z" fill="#fff" ${B(2.4)}/>`),Md(e)&&(r="M68 214 H132 L150 250 Q100 262 50 250 Z");const p=`${r} ${l}`,g=`<path class="skirt" d="${r}" fill="var(--top)" ${B(3)}/><path d="${l}" fill="var(--top)" ${B(3)}/><g clip-path="url(#${a})">${Fs(p,n,s,["M80 226 Q74 248 70 266","M120 226 Q126 248 130 266"])}${c}</g>`;return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${a}"><path d="${p}"/></clipPath></defs>${f?g+d:d+g}</g>`}function eM(e,t,n,s){const o=e==="l"?`<g transform="translate(${2*s} 0) scale(-1 1)">${n}</g>`:n;return Rn("leg",e,o,t)}function tM(e,t){const n=t.shoes;let s="";for(const o of["l","r"]){const i=o==="l"?87:113;let a="";if(n==="sneakers"||n==="lightup"){const r=n==="lightup"?`<circle cx="${i-4}" cy="292" r="2.2" fill="#ff8fab"/><circle cx="${i+4}" cy="296" r="2.2" fill="#8ecae6"/><circle cx="${i}" cy="300" r="2" fill="#ffd166"/>`:"";a=`<path d="M${i} 270 V286" fill="none" stroke="var(--sock)" stroke-width="16" stroke-linecap="round"/><path d="M${i-14} 296 Q${i-14} 284 ${i} 284 Q${i+14} 284 ${i+16} 296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+12} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${B(2.8)}/><path d="M${i-12} 304 H${i+18}" stroke="var(--shoe-trim)" stroke-width="3.5" stroke-linecap="round"/><path d="M${i-6} 290 l5 2 M${i-6} 295 l6 2" stroke="${Co}" stroke-width="1.8" stroke-linecap="round"/>${r}`}else if(n==="boots"||n==="rainboots"){const r=n==="rainboots"?248:258,l=n==="boots"?[[-6,272],[5,268],[-2,284],[7,290],[-8,294]].map(([c,d])=>`<circle cx="${i+c}" cy="${d}" r="2.6" fill="#fff" opacity=".9"/>`).join(""):"";a=`<path d="M${i-14} ${r} H${i+14} V296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+10} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${B(2.8)}/><path d="M${i-16} ${r-4} H${i+16} V${r+8} H${i-16} Z" fill="var(--shoe)" ${B(2.6)}/>`+l+(n==="rainboots"?`<path d="M${i-12} ${r+16} H${i+12}" stroke="var(--shoe-trim)" stroke-width="4" stroke-linecap="round"/>`:`<path d="M${i-6} ${r+14} V292" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".45"/>`)}else n==="maryjanes"?a=`<path d="M${i} 266 V290" fill="none" stroke="var(--sock)" stroke-width="15" stroke-linecap="round"/><path d="M${i-12} 274 ${Gr(i-12,i+12,274,4,4)} L${i+12} 268 H${i-12} Z" fill="var(--sock)" ${B(2)}/><path d="M${i-13} 298 Q${i-13} 290 ${i} 290 Q${i+13} 290 ${i+14} 298 Q${i+20} 300 ${i+20} 304 Q${i+20} 309 ${i+8} 309 H${i-12} Q${i-16} 309 ${i-14} 302 Z" fill="var(--shoe)" ${B(2.8)}/><path d="M${i-10} 294 H${i+12}" stroke="${Co}" stroke-width="2"/><circle cx="${i+8}" cy="294" r="2.2" fill="var(--acc)"/>`:n==="sandals"?a=`<path d="M${i-12} 298 Q${i-12} 286 ${i} 286 Q${i+12} 286 ${i+14} 296 Q${i+18} 298 ${i+18} 302 Q${i+18} 306 ${i+8} 306 H${i-12} Q${i-16} 306 ${i-14} 300 Z" fill="var(--skin)" ${B(2.4)}/><path d="M${i-14} 304 H${i+18}" stroke="var(--shoe)" stroke-width="5" stroke-linecap="round"/><path d="M${i-8} 292 H${i+10} M${i+2} 300 L${i+8} 290" stroke="var(--shoe)" stroke-width="4" stroke-linecap="round"/><circle cx="${i+2}" cy="293" r="3" fill="var(--shoe-trim)" ${B(1.4)}/>`:n==="slippers"?a=`<path d="M${i-14} 292 Q${i-14} 280 ${i} 278 Q${i+16} 280 ${i+18} 294 Q${i+22} 296 ${i+20} 304 H${i-14} Q${i-18} 304 ${i-16} 296 Z" fill="var(--shoe)" ${B(2.8)}/><path d="M${i-6} 286 q6 -4 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`:a=`<ellipse cx="${i+2}" cy="304" rx="16" ry="7" fill="var(--shoe)" ${B(2.6)}/>`;s+=eM(o,e,a,i)}return`<g data-layer="shoes">${s}</g>`}const ug=new Set(["cap","beanie","sunhat"]),nM=new Set(["catears","earmuffs"]);function Io(e){return e==="afro"?28:e==="topbun"?20:e==="puffs"||e==="coily"?16:e==="buns"||e==="curlybob"?12:e==="long"||e==="wavy"||e==="wavybob"?8:0}function jo(e,t,n){if(!ug.has(t)&&!nM.has(t))return n;const s=Io(e);return s?`<g data-hat="${t}" transform="translate(0 ${x(-s)})">${n}</g>`:n}function sM(e,t,n){let s="";for(let l=0;l<n.length;l++)ug.has(n[l])&&(s=n[l]);if(!s)return"";const o=Io(t),i=(s==="beanie"?58:s==="cap"?64:62)-o,a=Math.min(70,i),r=t==="afro"||t==="puffs"||t==="coily"?92:78;return`<mask id="${e}hm" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" data-brim="${x(a)}"><rect x="-30" y="-50" width="260" height="420" fill="#fff"/><rect x="${x(100-r)}" y="-50" width="${x(r*2)}" height="${x(a+50)}" fill="#000"/></mask>`}function Pl(e,t,n){return`<g transform="translate(${e} ${t}) scale(${n})"><path d="M0 0 C-8 -14 -30 -14 -28 0 C-30 14 -8 14 0 0 Z" fill="var(--acc)" ${B(2.6)}/><path d="M0 0 C8 -14 30 -14 28 0 C30 14 8 14 0 0 Z" fill="var(--acc)" ${B(2.6)}/><rect x="-6" y="-7" width="12" height="14" rx="4" fill="var(--acc2)" ${B(2.2)}/></g>`}function oM(e){return`<g data-layer="accessory">${e.acc.map(n=>n==="glasses"?'<circle cx="76" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="124" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="76" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><circle cx="124" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3.2"/><path d="M58 108 L42 104 M142 108 L158 104" stroke="var(--frame)" stroke-width="3.2" stroke-linecap="round"/>':n==="square"?'<rect x="58" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><rect x="108" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><path d="M92 112 H108" stroke="var(--frame)" stroke-width="3.2"/>':n==="sunnies"?'<path d="M56 104 H94 Q96 122 76 122 Q56 122 56 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M106 104 H144 Q146 122 124 122 Q104 122 106 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3"/>':n==="bow"?Pl(100,78,.7):n==="bigbow"?Pl(100,70,1.15):n==="headband"?`<path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="${Co}" stroke-width="12" stroke-linecap="round"/><path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round"/>${Pl(100,32,.85)}`:n==="flower"?`<g transform="translate(138 78)">${[0,60,120,180,240,300].map(s=>`<ellipse cx="0" cy="-8" rx="5" ry="8" fill="var(--acc)" ${B(1.6)} transform="rotate(${s})"/>`).join("")}<circle r="4.5" fill="var(--acc2)" ${B(1.6)}/></g>`:n==="cap"?jo(e.hair,"cap",`<path d="M54 64 Q56 20 100 16 Q144 20 146 64 Q128 54 100 56 Q72 54 54 64 Z" fill="var(--acc)" ${B(3)}/><path d="M48 56 Q100 66 152 56 L156 62 Q100 70 44 62 Z" fill="var(--acc)" ${B(3)}/><circle cx="100" cy="18" r="4.5" fill="#fff" ${B(2)}/>`):n==="beanie"?jo(e.hair,"beanie",`<path d="M50 66 Q48 14 100 8 Q152 14 150 66 Q128 56 100 58 Q72 56 50 66 Z" fill="var(--acc)" ${B(3)}/><path d="M50 58 H150" stroke="var(--acc2)" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="8" r="7" fill="var(--acc2)" ${B(2.4)}/>`):n==="sunhat"?jo(e.hair,"sunhat",`<path d="M66 56 Q68 22 100 18 Q132 22 134 56 Q118 48 100 50 Q82 48 66 56 Z" fill="var(--acc)" ${B(3)}/><path d="M18 56 Q100 68 182 56 Q170 64 100 66 Q30 64 18 56 Z" fill="var(--acc)" ${B(3)}/><path d="M72 46 Q100 38 128 46" fill="none" stroke="var(--acc2)" stroke-width="4"/>`):n==="catears"?jo(e.hair,"catears",`<path d="M58 62 L70 18 L86 60 Z" fill="var(--acc)" ${B(2.6)}/><path d="M114 60 L130 18 L142 62 Z" fill="var(--acc)" ${B(2.6)}/><path d="M64 54 L72 30 L80 52 Z" fill="var(--acc2)"/><path d="M120 52 L128 30 L136 54 Z" fill="var(--acc2)"/>`):n==="earmuffs"?jo(e.hair,"earmuffs",`<path d="M44 68 Q48 26 100 22 Q152 26 156 68" fill="none" stroke="var(--acc)" stroke-width="6"/><circle cx="34" cy="86" r="14" fill="var(--acc)" ${B(2.8)}/><circle cx="166" cy="86" r="14" fill="var(--acc)" ${B(2.8)}/><circle cx="34" cy="86" r="6" fill="var(--acc2)"/><circle cx="166" cy="86" r="6" fill="var(--acc2)"/>`):"").join("")}</g>`}const ar="var(--line)",Mc="#f7f3ee",Go="#3d3150",pa="#f7f1e8",Ti="#4a2f5e",yi="#2f2433";function Ed(e,t,n){return`<path d="${e}" fill="none" stroke="${ar}" stroke-width="${x(n+7)}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function iM(e){const[t,n]=qt[e],[s,o]=hn[e],i=e==="l"?-1:1,a=(t+s)/2+6*i;return`M${t-2*i} ${n-2} Q${a} ${(n+o)/2-6} ${s-i} ${o-16}`}function mg(e,t,n){return["l","r"].map(s=>{const o=Ed(iM(s),e,21)+(n?n(s):"");return Rn("arm",s,o,t).replace('class="arm ','class="arm sleeve ')}).join("")}function yg(e,t,n){return["l","r"].map(s=>{const o=s==="l"?-1:1,i=s==="l"?88:112,a=Ed(`M${i} 238 L${i+o} 280`,e,24)+(n?n(s,i):"");return Rn("leg",s,a,t)}).join("")}const bg="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z";function Ho(e,t){return t.hip?`<g transform="rotate(${x(t.hip)} 100 238)">${e}</g>`:e}function aM(e,t){const n="#ffd166",s=`<path d="${bg}" fill="${n}" ${B(3)}/>`,o=`<path d="M78 188 H122 V232 H78 Z" fill="${e}" ${B(2.8)}/><path d="M88 200 H112 V216 Q100 220 88 216 Z" fill="none" stroke="#3a1d3c" stroke-width="2.4" opacity=".3" stroke-linejoin="round"/><path d="M74 166 L82 190 M126 166 L118 190" stroke="${ar}" stroke-width="10" stroke-linecap="round"/><path d="M74 166 L82 190 M126 166 L118 190" stroke="${e}" stroke-width="5.5" stroke-linecap="round"/><circle cx="82" cy="192" r="4" fill="#c9ced6" ${B(1.6)}/><circle cx="118" cy="192" r="4" fill="#c9ced6" ${B(1.6)}/>`,i=`<path d="M66 228 H134 L136 248 Q100 256 64 248 Z" fill="${e}" ${B(3)}/>`,a=mg(n,t,l=>{const[c,d]=hn[l];return`<path d="M${c-9} ${d-12} h18" stroke="#3a1d3c" stroke-width="2" opacity=".25" stroke-linecap="round"/>`});return{back:"",over:yg(e,t,(l,c)=>`<path d="M${c-11} 276 h22" stroke="#3a1d3c" stroke-width="2.4" opacity=".25" stroke-linecap="round"/>`)+Ho(a+s+i+o,t),head:"",sleeve:n}}function rM(e){const t=70-Math.min(10,Io(e)/2),n=`<path d="M38 ${t+10} Q100 ${t-8} 162 ${t+10}" fill="none" stroke="${ar}" stroke-width="13" stroke-linecap="round"/><path d="M38 ${t+10} Q100 ${t-8} 162 ${t+10}" fill="none" stroke="#6b6f7a" stroke-width="7.5" stroke-linecap="round"/>`,s=o=>`<circle cx="${o}" cy="${t}" r="17" fill="#c9ced6" ${B(3)}/><circle cx="${o}" cy="${t}" r="10.5" fill="#bfe3f2" ${B(2)}/><path d="M${o-5} ${t-4} q3 -4 8 -3" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`;return`<g data-costume-part="goggles">${n}${s(80)}${s(120)}<path d="M96 ${t} h8" stroke="${ar}" stroke-width="5" stroke-linecap="round"/></g>`}function lM(e){const t=60-Io(e),n=Math.max(30,Math.min(56,t-4)),s=t-n;return`<g data-costume-part="witch-hat"><path d="M64 ${t-2} Q82 ${t-n*.45} 92 ${s+8} Q98 ${s-2} 114 ${s+4} Q104 ${s+10} 106 ${s+n*.4} L136 ${t-2} Z" fill="${Ti}" ${B(3)}/><path d="M70 ${t-10} Q100 ${t-16} 130 ${t-10} L133 ${t-3} Q100 ${t-9} 67 ${t-3} Z" fill="#ff9f43" ${B(2.2)}/><path d="M24 ${t+2} Q100 ${t-16} 176 ${t+2} Q100 ${t+12} 24 ${t+2} Z" fill="${Ti}" ${B(3)}/><path d="M118 ${t-24} l2.6 5.4 5.8 .8 -4.2 4 1 5.8 -5.2 -2.8 -5.2 2.8 1 -5.8 -4.2 -4 5.8 -.8 Z" fill="#ffd166" ${B(1.4)}/></g>`}function cM(e){const t=Io(e);return`<g data-costume-part="cat-ears" transform="translate(0 ${x(-t)})"><path d="M52 66 L64 20 L90 56 Z" fill="${yi}" ${B(2.8)}/><path d="M110 56 L136 20 L148 66 Z" fill="${yi}" ${B(2.8)}/><path d="M61 56 L66 34 L80 52 Z" fill="#f4a3c8"/><path d="M120 52 L134 34 L139 56 Z" fill="#f4a3c8"/><path d="M50 72 Q100 46 150 72" fill="none" stroke="${yi}" stroke-width="6" stroke-linecap="round"/></g>`}function dM(e){return Ho(`<g data-costume-part="cat-tail">${Ed("M118 232 Q156 240 162 206 Q166 178 182 172",yi,11)}<circle cx="182" cy="172" r="6" fill="${yi}"/></g>`,e)}function fM(e){const t=[30,50,70,90,110,130,150,170];let n="";for(let i=t.length-1;i>0;i--)n+=` Q${t[i]-10} ${i%2?276:266} ${t[i-1]} 262`;const s=`M64 166 Q70 154 100 152 Q130 154 136 166 Q164 196 170 262${n} Q36 196 64 166 Z`;return{back:"",over:Ho(`<g data-costume-part="ghost-sheet"><path d="${s}" fill="${Mc}" ${B(3)}/><path d="M70 190 Q60 230 58 258 M130 190 Q140 230 142 258 M100 190 V250" fill="none" stroke="#3a1d3c" stroke-width="2.4" opacity=".12" stroke-linecap="round"/></g>`,e),head:"",sleeve:Mc}}function pM(e){const n=30-Math.min(16,Io(e));return`<g data-costume-part="ghost-hood"><path d="${`M30 112 Q28 ${n} 100 ${n} Q172 ${n} 170 112 Q172 150 150 170 Q100 182 50 170 Q28 150 30 112 Z`} M54 116 Q54 76 100 74 Q146 76 146 116 Q146 152 100 156 Q54 152 54 116 Z" fill="${Mc}" fill-rule="evenodd" ${B(3)}/><path d="M44 96 Q48 ${n+26} 84 ${n+12}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/></g>`}function hM(e){const t=`<path d="${bg}" fill="${Go}" ${B(3)}/>`,n=`<g data-costume-part="ribs" fill="none" stroke="${pa}" stroke-linecap="round"><path d="M100 172 V226" stroke-width="6"/>`+[184,198,212].map((r,l)=>`<path d="M${80+l*2} ${r} Q90 ${r-5} 100 ${r}  M${120-l*2} ${r} Q110 ${r-5} 100 ${r}" stroke-width="5.5"/>`).join("")+'<path d="M86 232 Q100 224 114 232" stroke-width="6"/></g>',s=(r,l,c,d)=>`<path d="M${x(r)} ${x(l)} L${x(c)} ${x(d)}" stroke="${pa}" stroke-width="5" stroke-linecap="round"/><circle cx="${x(r)}" cy="${x(l)}" r="4" fill="${pa}"/><circle cx="${x(c)}" cy="${x(d)}" r="4" fill="${pa}"/>`,o=mg(Go,e,r=>{const[l,c]=qt[r],[d,f]=hn[r];return s(l+(d-l)*.2,c+(f-c)*.2,l+(d-l)*.72,c+(f-c)*.72)}),i=`<path d="M66 230 H134 L136 248 Q100 256 64 248 Z" fill="${Go}" ${B(3)}/>`;return{back:"",over:yg(Go,e,(r,l)=>s(l,246,l+(r==="l"?-1:1),274))+Ho(o+i+t+n,e),head:"",sleeve:Go}}function gM(e){const t=n=>{const s=o=>x(100+n*o);return`M${s(20)} 166 Q${s(60)} 168 ${s(84)} 186 Q${s(90)} 220 ${s(80)} 256 Q${s(68)} 244 ${s(58)} 256 Q${s(48)} 242 ${s(36)} 254 Q${s(28)} 240 ${s(14)} 250 Z`};return Ho(`<g data-costume-part="bat-cape"><path d="${t(-1)}" fill="${Ti}" ${B(3)}/><path d="${t(1)}" fill="${Ti}" ${B(3)}/><path d="M40 190 Q44 220 52 240 M160 190 Q156 220 148 240" fill="none" stroke="#fff" stroke-width="2.4" opacity=".18" stroke-linecap="round"/></g>`,e)}function uM(e){return Ho(`<g data-costume-part="bat-collar"><path d="M78 164 Q72 152 82 146 L92 160 Z M122 164 Q128 152 118 146 L108 160 Z" fill="${Ti}" ${B(2.4)}/><circle cx="100" cy="166" r="5" fill="#ff9f43" ${B(1.8)}/></g>`,e)}function kg(e,t,n){const s={back:"",over:"",head:"",sleeve:null};if(e.indexOf("helper-")===0){const o=Za[e.slice(7)]??Za.yellow;return{...aM(o,t),head:rM(n)}}return e==="witch"?{...s,head:lM(n)}:e==="cat"?{...s,back:dM(t),head:cM(n)}:e==="ghost"?{...fM(t),head:pM(n)}:e==="skeleton"?hM(t):e==="bat"?{...s,back:gM(t),over:uM(t)}:s}const mM=[{hip:1.5,head:4,armL:3,armR:-2,legL:0,legR:-3,legLLift:0,legRLift:0},{hip:-2,head:-5,armL:1,armR:-7,legL:4,legR:0,legLLift:2,legRLift:0},{hip:0,head:3,armL:2,armR:-2,legL:0,legR:0,legLLift:0,legRLift:0},{hip:-1.5,head:-4,armL:4,armR:-1,legL:5,legR:0,legLLift:3,legRLift:0}],yM={puffs:0,afro:0,pony:1,sidepony:1,pigtails:1,halfup:1,braids:2,boxbraids:2,locs:2,sidebraid:2,crown:2,buns:3,topbun:3,lowbun:3};function Cd(e){const t=e.hair||"buns";let n=yM[t];if(n===void 0){let s=0;for(let o=0;o<t.length;o++)s=(s+t.charCodeAt(o))%4;n=s}return mM[n]}function bM(e){const t=(n,s,o,i,a)=>{const r=wc(n,s,o,i,a),l=wc(r.x,r.y,100,238,e.hip);return{x:l.x/2,y:l.y/2}};return{left:t(hn.l[0],hn.l[1],qt.l[0],qt.l[1],e.armL),right:t(hn.r[0],hn.r[1],qt.r[0],qt.r[1],e.armR)}}function kM(e){const t=wc(100,244,100,238,e.hip);return Math.round(t.y/2*10)/10}function Sd(e){const t=parseInt(e.slice(1),16);return(t>>16&255)+(t>>8&255)+(t&255)}function wM(e){const t=ui(e,.32);return Sd(t)<80?"#5a3a2c":t}function vM(e){return Sd(e)<140?"#3b2340":ui(e,.12)}let hp=0;function _M(){return hp+=1,"a"+hp.toString(36)}function Ss(e,t){return t.hip?`<g transform="rotate(${x(t.hip)} 100 238)">${e}</g>`:e}function fo(e,t,n=!1){const s=t.head?`<g transform="rotate(${x(t.head)} 100 158)">${e}</g>`:e;return Ss(`<g${n?' class="dollhead" data-dollhead="1"':' class="dollhead"'}>${s}</g>`,t)}function $M(e,t,n){let s=`<defs><radialGradient id="${e}b"><stop offset="0" style="stop-color:var(--blush)" stop-opacity=".62"/><stop offset=".55" style="stop-color:var(--blush)" stop-opacity=".28"/><stop offset="1" style="stop-color:var(--blush)" stop-opacity="0"/></radialGradient>`;return s+=`<radialGradient id="${e}s"><stop offset="0" stop-color="#3a1d3c" stop-opacity=".3"/><stop offset=".6" stop-color="#3a1d3c" stop-opacity=".12"/><stop offset="1" stop-color="#3a1d3c" stop-opacity="0"/></radialGradient>`,s+=`<radialGradient id="${e}k" cx=".42" cy=".36" r=".75"><stop offset=".55" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".16"/></radialGradient>`,t&&(s+=`<linearGradient id="${e}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f1020" stop-opacity=".62"/><stop offset=".5" stop-color="#1f1020" stop-opacity=".05"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`,s+=`<linearGradient id="${e}c" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="146" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".2"/></linearGradient>`,s+=`<radialGradient id="${e}h" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1f1020" stop-opacity=".28"/></radialGradient>`),s+n+"</defs>"}function gp(e){const t=e==="l"?-1:1,n=qt[e][0],s=qt[e][1],o=hn[e][0],i=hn[e][1],a=o-t,r=i-7,l=-t;let c=`<path d="${vc([n,s],[a,r],18,13,-3*t)}" fill="var(--skin)" ${B(3)}/>`;return c+=`<path class="hand" d="M${x(o-8)} ${x(i-4)} Q${x(o-8)} ${x(i-10)} ${x(o)} ${x(i-10)} Q${x(o+8)} ${x(i-10)} ${x(o+8)} ${x(i-3)} Q${x(o+8.5)} ${x(i+9)} ${x(o)} ${x(i+9.5)} Q${x(o-8.5)} ${x(i+9)} ${x(o-8)} ${x(i-4)} Z" fill="var(--skin)" ${B(2.8)}/>`,c+=`<ellipse cx="${x(o+7*l)}" cy="${x(i-1)}" rx="3.4" ry="5" fill="var(--skin)" ${B(2.4)} transform="rotate(${-20*l} ${x(o+7*l)} ${x(i-1)})"/>`,c+=`<path d="M${x(o-3*l)} ${x(i+3)} v4 M${x(o+.5*l)} ${x(i+3.5)} v4" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`,c+=`<ellipse cx="${x(o-3*l)}" cy="${x(i-5)}" rx="3" ry="1.8" fill="#fff" opacity=".35"/>`,c}function up(e){const t=e==="l"?-1:1,n=e==="l"?88:112;let s=`<path d="${vc([n,234],[n+t,294],21,15,1.5*t)}" fill="var(--skin)" ${B(3)}/>`;return s+=`<path d="${vc([n+5*t,244],[n+5*t,290],6,4)}" ${ct}/>`,s+=`<ellipse cx="${x(n+.5*t)}" cy="268" rx="4.5" ry="2.6" fill="#3a1d3c" opacity=".12"/>`,s+=`<path d="M${n-4} 265 q4 -2.5 8 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`,s}function mp(e,t,n,s,o,i){const a=n?-1:1,r=o==="big"||o==="bright"?1.08:o==="soft"?.94:1,l=(y,u)=>`${x(e+y*r)} ${x(t+u*r)}`,c=13.5*r,d=17*r;let f="";if(i&&o!=="soft"){const y=[.35,.95,1.57,2.2,2.8];for(let u=0;u<y.length;u++){const w=y[u];f+=`<path d="M${x(e+5.5*Math.cos(w)*r)} ${x(t+(4+6.5*Math.sin(w))*r)} L${x(e+11.5*Math.cos(w)*r)} ${x(t+(2+14*Math.sin(w))*r)}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>`}}const p=o==="soft"?2:2.6,g=o==="soft"?"":`<path d="M${l(-16*a,-8)} q${x(-6*a*r)} -2 ${x(-9*a*r)} ${x(-9*r)} M${l(-17*a,-2)} q${x(-6*a*r)} ${x(-.5*r)} ${x(-10*a*r)} ${x(-5*r)} M${l(-12*a,-15)} q${x(-3*a*r)} ${x(-4*r)} ${x(-4*a*r)} ${x(-9*r)}" fill="none" stroke="var(--lash)" stroke-width="2.2" stroke-linecap="round"/>`,b=o==="sparkle"||o==="bright"?`<path d="M${l(-9*a,-8)} l.7 1.6 1.6 .7 -1.6 .7 -.7 1.6 -.7 -1.6 -1.6 -.7 1.6 -.7 Z" fill="#fff" opacity=".9"/>`:"",m=i?`<ellipse cx="${e}" cy="${x(t+r)}" rx="${x(c)}" ry="${x(d)}" fill="url(#${s}i)"/>`:"",v=o==="sleepy"?`<path d="M${l(-17,-4)} Q${e} ${x(t+r)} ${l(17,-4)} L${l(18,-16)} Q${e} ${x(t-20*r)} ${l(-18,-16)} Z" fill="var(--skin)"/>`:"";return`<path d="M${l(-16,-2)} Q${l(-16,-20)} ${l(0,-20)} Q${l(16,-20)} ${l(16,-2)} Q${l(16,19)} ${l(0,19)} Q${l(-16,19)} ${l(-16,-2)} Z" fill="#fff"/><path d="M${l(-15,-4)} Q${e} ${x(t-21*r)} ${l(15,-4)} Q${e} ${x(t-14*r)} ${l(-15,-4)} Z" fill="#3a1d3c" opacity=".12"/><ellipse data-iris="1" cx="${e}" cy="${x(t+r)}" rx="${x(c)}" ry="${x(d)}" fill="var(--eye)"/>${m}${f}<ellipse cx="${e}" cy="${x(t+3*r)}" rx="${x(7*r)}" ry="${x(9*r)}" fill="#1f1020" opacity=".8"/><ellipse cx="${e}" cy="${x(t+r)}" rx="${x(11.3*r)}" ry="${x(14.8*r)}" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/><ellipse cx="${e}" cy="${x(t+r)}" rx="${x(c)}" ry="${x(d)}" fill="none" stroke="#1f1020" stroke-width="2" opacity=".55"/><path d="M${l(-9,12)} Q${e} ${x(t+19.5*r)} ${l(9,12)} Q${e} ${x(t+15.5*r)} ${l(-9,12)} Z" fill="#fff" opacity=".5"/><ellipse cx="${x(e-6*a*r)}" cy="${x(t-6*r)}" rx="${x(5.8*r)}" ry="${x(6.8*r)}" fill="#fff" transform="rotate(${-15*a} ${x(e-6*a*r)} ${x(t-6*r)})"/><circle cx="${x(e+6*a*r)}" cy="${x(t+8*r)}" r="${x(2.8*r)}" fill="#fff"/><circle cx="${x(e-4*a*r)}" cy="${x(t+10*r)}" r="${x(1.3*r)}" fill="#fff" opacity=".85"/><path d="M${l(7*a,-10)} l${x(r)} ${x(2.4*r)} ${x(2.4*r)} ${x(r)} ${x(-2.4*r)} ${x(r)} ${x(-r)} ${x(2.4*r)} ${x(-r)} ${x(-2.4*r)} ${x(-2.4*r)} ${x(-r)} ${x(2.4*r)} ${x(-r)} Z" fill="#fff"/>`+b+v+`<path d="M${l(-17,-1)} Q${l(-16,-21)} ${l(0,-21)} Q${l(16,-21)} ${l(17,-3)} Q${l(14.5,-18.6)} ${l(0,-18.8)} Q${l(-14.5,-18.6)} ${l(-15.5,-1)} Z" fill="var(--lash)" stroke="var(--lash)" stroke-width="${p}" stroke-linejoin="round"/>`+g+`<path d="M${l(-11,-23)} Q${e} ${x(t-27*r)} ${l(11,-23)}" fill="none" stroke="var(--line)" stroke-width="1.3" stroke-linecap="round" opacity=".22"/><path d="M${l(-5,20.5)} Q${e} ${x(t+22*r)} ${l(5,20.5)}" fill="none" stroke="var(--lash)" stroke-width="1.3" stroke-linecap="round" opacity=".28"/>`}function xM(e,t,n,s=!1){const o=e.blush?`<ellipse cx="64" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><ellipse cx="136" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><path d="M60 133 l3 -3 M66 134 l3 -3 M132 133 l3 -3 M138 134 l3 -3" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>`:"";let i="";if(e.freckles){const a=[[58,132],[64,136],[70,131],[130,131],[136,136],[142,132]];for(let r=0;r<a.length;r++)i+=`<circle cx="${a[r][0]}" cy="${a[r][1]}" r="1.5" fill="var(--freckle)" opacity=".7"/>`}return o+i+'<path data-brow="l" d="M64 86 Q74 80 85 84" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/><path data-brow="r" d="M115 84 Q126 80 136 86" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'+mp(76,112,!1,t,s?"sleepy":e.eyes,n)+mp(124,112,!0,t,s?"sleepy":e.eyes,n)+'<path d="M98 131 q2 1.8 4 0" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" opacity=".55"/><ellipse cx="101.5" cy="128.5" rx="1.6" ry="1" fill="#fff" opacity=".6"/><path d="M92 140 Q100 147.5 108 140" fill="none" stroke="var(--line)" stroke-width="2.8" stroke-linecap="round"/><path d="M96 142.6 Q100 145.4 104 142.6 Q100 144 96 142.6 Z" fill="#ff8fa8"/>'}function MM(e){const t="M40 102 Q38 38 100 38 Q162 38 160 102 Q160 140 132 153 Q116 160 100 160 Q84 160 68 153 Q40 140 40 102 Z";return`<ellipse cx="39" cy="114" rx="9" ry="11" fill="var(--skin)" ${B(3)}/><ellipse cx="161" cy="114" rx="9" ry="11" fill="var(--skin)" ${B(3)}/><ellipse cx="40" cy="115" rx="4" ry="6" ${kc}/><ellipse cx="160" cy="115" rx="4" ry="6" ${kc}/><path d="${t}" fill="var(--skin)" ${B(3.2)}/><path d="${t}" fill="url(#${e}k)"/>`}function LM(){return`<path d="M91 146 h18 v22 q-9 5 -18 0 Z" fill="var(--skin)" ${B(3)}/><path d="M91 150 h18 v9 q-9 6 -18 0 Z" ${kc}/><path d="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z" fill="var(--skin)" ${B(3)}/>`}function Lc(e,t){const n=ds(e),s=t?.pose??Cd(n),o=t?.rich!==!1,i=t?.uid??_M(),a=kM(s),r=n.shoesC,l=r.toLowerCase()==="#ffffff"?n.dress?n.dressC:n.topC:lp(r,.28),c=n.dress?n.dressC:n.topC,d=Sd(c)>700?"#8fdcc0":ui(c,.18),f=["--line:#5a3d5c",`--skin:${n.skin}`,`--hair:${n.hairC}`,`--hair-shade:${wM(n.hairC)}`,`--brow:${vM(n.hairC)}`,`--eye:${n.eyeC}`,"--lash:#3b2340","--blush:#ff6f91",`--freckle:${ui(n.skin,.35)}`,`--top:${c}`,`--top-trim:${d}`,`--bottom:${n.dress?n.dressC:n.bottomC}`,`--bottom-trim:${ui(n.dress?n.dressC:n.bottomC,.16)}`,`--shoe:${r}`,`--shoe-trim:${l}`,"--sock:#ffffff",`--acc:${n.accC}`,`--acc2:${lp(n.accC,.18)}`,"--frame:#6e4a5e"].join(";"),p=Rn("leg","l",up("l"),s)+Rn("leg","r",up("r"),s),g=Rn("arm","l",`<g class="hand">${gp("l")}</g>`,s)+Rn("arm","r",`<g class="hand">${gp("r")}</g>`,s),b=`<g data-layer="body">${p}${Ss(LM()+g,s)}${fo(MM(i),s,!0)}</g>`,m=n.dress?J7(s,n,i,o,a):Y7(s,n,i,o,a),v=`<g class="shadow"><ellipse cx="100" cy="308" rx="52" ry="9" fill="url(#${i}s)"/><ellipse cx="87" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/><ellipse cx="113" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/></g>`,y=sM(i,n.hair,n.acc),u=y?` mask="url(#${i}hm)"`:"",w=[`<g data-layer="hair-back">${fo(`<g${u}>${j7(n.hair,i,o)}</g>`,s)}</g>`,b,tM(s,n),Ss(K7(s,n,i,o),s),Ss(m,s),Ss(X7(s,n,i,o),s),`<g data-layer="face">${fo(xM(n,i,o,t?.poseName==="lie"),s)}</g>`,`<g data-layer="hair-front">${fo(`<g${u}>${G7(n.hair,i,o)}</g>`,s)}</g>`,fo(oM(n),s)],_=t?.poseName==="sit"||t?.poseName==="lie"?t.poseName:null,S=t?.costume?kg(t.costume,s,n.hair):null;t?.holding&&w.splice(6,0,Ss(Ni("under",!0,n.skin,_,S?.sleeve??c),s)),S&&(S.head&&w.push(`<g data-layer="costume-head">${fo(S.head,s)}</g>`),S.over&&w.splice(6,0,`<g data-layer="costume">${S.over}</g>`),S.back&&w.splice(1,0,`<g data-layer="costume-back">${S.back}</g>`));const R=w.join(""),D=n.dress||n.top,U=t?.poseName?` data-pose="${t.poseName}"`:"",Z=t?.costume?` data-costume="${t.costume}"`:"";return`<svg${U}${Z} data-chibi="1" data-hair="${n.hair}" data-top="${D}" viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" style="${f}">${$M(i,o,y)}${v}${R}</svg>`}function yp(e,t,n){const s=ds(e),o=Fr(t)??Cd(s),i=t==="sit"||t==="lie"?t:null,a=(n?kg(n,o,s.hair).sleeve:null)??(s.dress?s.dressC:s.topC);return`<svg viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">${Ss(Ni("over",!0,s.skin,i,a),o)}</svg>`}function rr(){try{return typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("selector(&)")}catch{return!1}}function ji(e,t,n){const s=!!(t&&t.look2);e.classList.toggle("chibi",s);const o=s&&rr();e.classList.toggle("chibi-move",s&&(o||n)),e.classList.toggle("chibi-bob",s&&!o&&!n)}function wg(e){return e.look2?_m(e):null}const st="#5a3d5c",be=`stroke="${st}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,EM=["little","kid","adult"],js={little:.78,kid:1,adult:1.28},ii={left:{x:15,y:113},right:{x:85,y:113}};function Yr(e,t){return e.look2?bM(t??Cd(e.look2)):t?{left:{x:22,y:96},right:{x:78,y:96}}:ii}function vg(e,t){return e===1?`<path d="M62 16 L76 8 L76 26 Z M62 16 L50 6 L48 24 Z" fill="#ff7aa8" stroke="${st}" stroke-width="3" stroke-linejoin="round"/><circle cx="62" cy="16" r="5" fill="#ffd166" stroke="${st}" stroke-width="3"/>`:e===2?`<circle cx="40" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${st}" stroke-width="3"/><circle cx="60" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${st}" stroke-width="3"/><path d="M49 48 h2" stroke="${st}" stroke-width="3"/>`:e===3?`<path d="M20 30 Q22 8 50 8 Q78 8 80 30 Z" fill="${t}" stroke="${st}" stroke-width="3.5" stroke-linejoin="round"/><path d="M60 28 Q84 26 92 32 Q80 36 60 34 Z" fill="${t}" stroke="${st}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="9" r="4" fill="#fff" stroke="${st}" stroke-width="3"/>`:""}function lr(e,t,n){return n?e===1?`<path d="M20 40 Q16 86 30 92 L70 92 Q84 86 80 40 Z" fill="${t}" ${be}/>`:e===2?`<circle cx="18" cy="34" r="12" fill="${t}" ${be}/><circle cx="82" cy="34" r="12" fill="${t}" ${be}/>`:e===3?`<circle cx="50" cy="8" r="13" fill="${t}" ${be}/>`:"":e===3?`<path d="M22 42 Q20 14 50 12 Q80 14 78 42 Q66 26 50 30 Q34 26 22 42 Z" fill="${t}" ${be}/>`:`<path d="M21 46 Q18 12 50 12 Q82 12 79 46 Q72 30 58 28 Q50 36 36 30 Q26 34 21 46 Z" fill="${t}" ${be}/>`}function kt(e,t,n){const s=Fr(t),o=wg(e);return o&&e.look2?Lc(e.look2,{rich:rr(),pose:s??void 0,poseName:t||void 0,holding:n,costume:o}):e.look2?Lc(e.look2,{rich:rr(),pose:s??void 0,poseName:t||void 0,holding:n}):t==="sit"||t==="lie"?CM(e,t,n):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${lr(e.hairStyle,e.hair,!0)}
  <rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${be}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${be}/>
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${st}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${st}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${be} transform="rotate(12 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${be} transform="rotate(-12 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${be}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${be}/>
  <circle cx="50" cy="44" r="30" fill="${e.skin}" ${be}/>
  ${lr(e.hairStyle,e.hair,!1)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${st}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${st}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${be} fill="none"/>
  ${vg(e.acc??0,e.shirt)}
  <circle class="hand hang" cx="${ii.left.x}" cy="${ii.left.y}" r="6" fill="${e.skin}" ${be}/><circle class="hand hang" cx="${ii.right.x}" cy="${ii.right.y}" r="6" fill="${e.skin}" ${be}/>
  ${n?Ni("under",!1,Nr(e.skin),null):""}
</svg>`}function _g(e,t){const n=t==="sit"||t==="lie"?t:null;if(n==="lie")return"";const s=wg(e);return s&&e.look2?yp(e.look2,t,s):e.look2?yp(e.look2,t):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${Ni("over",!1,Nr(e.skin),n)}</svg>`}function CM(e,t,n){const s=t==="sit"?`<rect class="leg" x="34" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${be} transform="rotate(-68 40 112)"/>
  <rect class="leg" x="53" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${be} transform="rotate(68 60 112)"/>`:`<rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${be}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${be}/>`,o=t==="lie"?`<path d="M34 48 Q40 52 46 48" fill="none" ${be}/><path d="M54 48 Q60 52 66 48" fill="none" ${be}/>`:`<ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${st}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${st}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>`,i=`<ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${lr(e.hairStyle,e.hair,!0)}
  ${s}
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${st}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${st}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${be} transform="rotate(28 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${be} transform="rotate(-28 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${be}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${be}/>
  <g class="dollhead">
  <circle class="dollhead" data-dollhead="1" cx="50" cy="44" r="30" fill="${e.skin}" ${be}/>
  ${lr(e.hairStyle,e.hair,!1)}
  ${o}
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${be} fill="none"/>
  ${vg(e.acc??0,e.shirt)}
  </g>
  <circle class="hand hang" cx="22" cy="96" r="6" fill="${e.skin}" ${be}/><circle class="hand hang" cx="78" cy="96" r="6" fill="${e.skin}" ${be}/>
  ${n?Ni("under",!1,Nr(e.skin),t):""}`;return`<svg data-pose="${t}" viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${i}</svg>`}const bp=[{id:"hair",name:"Hair"},{id:"face",name:"Face"},{id:"clothes",name:"Clothes"},{id:"shoes",name:"Shoes"},{id:"extras",name:"Extras"}],SM={id:"costume",name:"🎃 Costumes"};function PM(){return Wr()?[...bp,SM]:bp}function TM(e,t){const n=to(e),s=!!n&&n.startsWith("helper-"),o=ds(t),i=(c,d,f,p)=>`<button type="button" class="avCosTile${f?" on":""}" data-act="av-costume" data-v="${c}" aria-pressed="${f}"><span class="avCosPic">${Lc(o,{uid:"cosT"+(p||"none"),rich:!1,costume:p||null})}</span><span class="avCosName">${d}</span></button>`,a=s?n:"helper-yellow",r=i("","No costume",!n,"")+i(a,Sf.helper,s,a)+["witch","cat","ghost","skeleton","bat"].map(c=>i(c,Sf[c],n===c,c)).join(""),l=Object.keys(Za).map(c=>`<button type="button" class="avSw${n==="helper-"+c?" on":""}" style="background:${Za[c]}" data-act="av-costume" data-v="helper-${c}" aria-label="${c} overalls"></button>`).join("");return`<h3>Costumes</h3><p class="avHint">Halloween dress-up! Tap one. Everyone in the room sees it.</p><div class="avCosGrid">${r}</div><h3>Helper overalls color</h3><div class="avColors avCosColors">${l}</div>`}const RM={short:"Short",pixie:"Pixie",coily:"Coily",afro:"Afro",bangs:"Bangs",bob:"Bob",wavybob:"Wavy bob",curlybob:"Curly bob",sidebangs:"Side bangs",long:"Long",wavy:"Wavy",braids:"Braids",boxbraids:"Box braids",locs:"Locs",sidebraid:"Side braid",crown:"Crown",pony:"Ponytail",sidepony:"Side pony",pigtails:"Pigtails",halfup:"Half-up",buns:"Buns",puffs:"Puffs",topbun:"Top bun",lowbun:"Low bun"},BM={classic:"Tee",stripes:"Stripes",hoodie:"Hoodie",sweater:"Sweater",tank:"Tank",puff:"Puff",ruffle:"Ruffle",button:"Buttons",jersey:"Jersey",cardigan:"Cardigan",bib:"Bib",raincoat:"Raincoat"},AM={pants:"Pants",jeans:"Jeans",shorts:"Shorts",skirt:"Skirt",tutu:"Tutu",leggings:"Leggings",overalls:"Overalls",joggers:"Joggers"},DM={"":"No dress",twirl:"Twirl",sundress:"Sundress",party:"Party",pinafore:"Pinafore",jumper:"Jumper",ballet:"Ballet",nightgown:"Nightgown",raindress:"Rain"},IM={classic:"Classic",sneakers:"Sneakers",lightup:"Light-up",boots:"Boots",rainboots:"Rain boots",sandals:"Sandals",maryjanes:"Mary Janes",slippers:"Slippers"},HM={round:"Round",big:"Big",sleepy:"Sleepy",sparkle:"Sparkle",soft:"Soft",bright:"Bright"},OM={glasses:"Glasses",square:"Square",sunnies:"Sunnies",bow:"Bow",bigbow:"Big bow",headband:"Headband",flower:"Flower",cap:"Cap",beanie:"Beanie",sunhat:"Sun hat",catears:"Cat ears",earmuffs:"Earmuffs"},WM={little:"Little",kid:"Kid",adult:"Grown-up"};let xn="hair";function _n(e,t,n,s){return`<button type="button" class="avOpt${s?" on":""}" data-act="${e}" data-v="${t}">${n}</button>`}function Pa(e,t,n){return`<button type="button" class="avSw${n?" on":""}" style="background:${t}" data-act="${e}" data-v="${t}" aria-label="Color"></button>`}function Ms(e){return`<div class="avGrid">${e}</div>`}function Yo(e,t){return`<div class="avColors">${Rt.map(n=>Pa(e,n,n===t)).join("")}</div>`}function UM(e,t,n,s){const o=ds(e.look2),i=e.id==="__me";xn==="costume"&&!Wr()&&(xn="hair");const a=xn==="costume"?TM(e.costume,e.look2):xn==="hair"?`<h3>Style</h3>${Ms(Tr.map(c=>_n("av-hair",c,RM[c],o.hair===c)).join(""))}<h3>Color</h3><div class="avColors">${Pr.map(c=>Pa("av-hairC",c,o.hairC===c)).join("")}</div>`:xn==="face"?`<h3>Skin</h3><div class="avColors">${Sr.map(c=>Pa("av-skin",c,o.skin===c)).join("")}</div><h3>Eyes</h3>${Ms(Ir.map(c=>_n("av-eyes",c,HM[c],o.eyes===c)).join(""))}<h3>Eye color</h3><div class="avColors">${ed.map(c=>Pa("av-eyeC",c,o.eyeC===c)).join("")}</div><div class="avToggles">${_n("av-freckles",o.freckles?"0":"1","Freckles",o.freckles)}${_n("av-blush",o.blush?"0":"1","Blush",o.blush)}</div>`:xn==="clothes"?`<h3>Top</h3>${Ms(Rr.map(c=>_n("av-top",c,BM[c],!o.dress&&o.top===c)).join(""))}${Yo("av-topC",o.topC)}<h3>Bottom</h3>${Ms(Br.map(c=>_n("av-bottom",c,AM[c],!o.dress&&o.bottom===c)).join(""))}${Yo("av-bottomC",o.bottomC)}<h3>Dress</h3>${Ms(Ar.map(c=>_n("av-dress",c,DM[c],o.dress===c)).join(""))}${Yo("av-dressC",o.dressC)}`:xn==="shoes"?`<h3>Shoes</h3>${Ms(Dr.map(c=>_n("av-shoes",c,IM[c],o.shoes===c)).join(""))}${Yo("av-shoesC",o.shoesC)}`:`<h3>Extras</h3><p class="avHint">Pick up to two</p>${Ms(bo.map(c=>_n("av-acc",c,OM[c],o.acc.indexOf(c)>=0)).join(""))}${Yo("av-accC",o.accC)}`,r=EM.map(c=>`<button type="button" class="avOpt sz${c===e.size?" on":""}" data-act="size" data-v="${c}">${WM[c]}</button>`).join(""),l=i?'<div class="meNote">This is you!</div>':`<button type="button" class="del${n?" sure":""}" data-act="delc">${s}<span>${n?"Tap again":""}</span></button>`;return`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${t}<div class="dress avLook"><div class="avStageWrap"><div class="avStage chibi-move">${kt(e)}</div>${l}<div class="avSizes">${r}</div></div><div class="avSide"><div class="avTabs">${PM().map(c=>`<button type="button" class="avTab${c.id===xn?" on":""}" data-act="av-tab" data-v="${c.id}">${c.name}</button>`).join("")}</div><div class="avPane">${a}</div><div class="avBar"><button type="button" class="avSurprise" data-act="av-surprise">🎲 Surprise me</button><button type="button" class="avDone" data-act="close">Done</button></div></div></div>`}function VM(e,t,n){if(t==="av-tab")return(n==="hair"||n==="face"||n==="clothes"||n==="shoes"||n==="extras"||n==="costume"&&Wr())&&(xn=n),null;const s=ds(e);if(t==="av-hair"&&Tr.indexOf(n)>=0)return{...s,hair:n};if(t==="av-hairC")return{...s,hairC:n};if(t==="av-skin")return{...s,skin:n};if(t==="av-eyes"&&Ir.indexOf(n)>=0)return{...s,eyes:n};if(t==="av-eyeC")return{...s,eyeC:n};if(t==="av-freckles")return{...s,freckles:n==="1"};if(t==="av-blush")return{...s,blush:n==="1"};if(t==="av-top"&&Rr.indexOf(n)>=0)return{...s,top:n,dress:""};if(t==="av-topC")return{...s,topC:n};if(t==="av-bottom"&&Br.indexOf(n)>=0)return{...s,bottom:n,dress:""};if(t==="av-bottomC")return{...s,bottomC:n};if(t==="av-dress"&&Ar.indexOf(n)>=0)return{...s,dress:n};if(t==="av-dressC")return{...s,dressC:n};if(t==="av-shoes"&&Dr.indexOf(n)>=0)return{...s,shoes:n};if(t==="av-shoesC")return{...s,shoesC:n};if(t==="av-accC")return{...s,accC:n};if(t==="av-acc"&&bo.indexOf(n)>=0){const o=n,i=s.acc.slice(),a=i.indexOf(o);if(a>=0)i.splice(a,1);else{const r=qa(o),l=i.filter(c=>qa(c)!==r);return l.push(o),{...s,acc:l.slice(0,2)}}return{...s,acc:i}}return null}function QM(){try{return typeof navigator<"u"&&navigator.webdriver&&!window.__forceAvatarIntro?!1:localStorage.getItem(Wt("avatar-intro"))!=="1"}catch{return!1}}function zM(){try{localStorage.setItem(Wt("avatar-intro"),"1")}catch{}}const Ta="#5a3d5c";function Tl(e,t,n,s,o){return`<path class="${e}" d="${t}" fill="none" stroke="${Ta}" stroke-width="${s}" stroke-linecap="round"/><path class="${e} cloth" d="${t}" fill="none" stroke="${n}" stroke-width="${o}" stroke-linecap="round"/>`}function qM(e){const t=ds(e),n=t.skin,s=t.dress!=="",o=s||t.bottom==="skirt"||t.bottom==="tutu",i=o?n:t.bottomC,a=t.shoesC,r=s||t.bottom==="skirt"||t.bottom==="tutu";let l="";if(r){const p=s?t.dressC:t.bottomC;l+=`<path class="dress" d="M75 46 L89 46 L91 53 L73 53 Z" fill="${p}" stroke="${Ta}" stroke-width="1.1" stroke-linejoin="round"/>`}l+=Tl("thigh","M76 44 Q83 48 88 54",i,6.2,4.8),l+=`<circle class="knee" cx="88" cy="56" r="2.3" fill="${i}" stroke="${Ta}" stroke-width="1.1"/>`;const c=t.shoes==="boots"||t.shoes==="rainboots";l+=Tl("shin",c?"M88 58 Q90 64 91 68":"M88 58 Q90 65 91 70",o?n:i,5.8,4.4),!c&&(t.shoes==="sneakers"||t.shoes==="maryjanes"||t.shoes==="lightup")&&(l+=Tl("shin","M90 66 Q90.6 68 91 70","#ffffff",5.4,4));const d=t.shoes==="sandals"?n:a,f=c?66:69;return l+=`<path class="shoe" d="M90 ${f} Q90 ${f-2} 94 ${f-2} Q99 ${f-2} 100 ${f+1} Q100 ${f+5} 95 ${f+5} Q90 ${f+5} 90 ${f+2} Z" fill="${d}" stroke="${Ta}" stroke-width="1.1" stroke-linejoin="round"/>`,t.shoes==="sandals"&&(l+=`<path d="M90 ${f+5} L100 ${f+5}" stroke="${a}" stroke-width="1.3" stroke-linecap="round"/>`,l+=`<path d="M93 ${f} L97 ${f+3}" stroke="${a}" stroke-width="1.1" stroke-linecap="round"/>`),`<svg class="rideleg" viewBox="0 0 160 130">${l}</svg>`}let ze=null,Xt=null,vo=null,Ko=null,ln=0,Ra=0;const Rl=[261.63,293.66,329.63,392,440,523.25,587.33,659.25,783.99,880],Ec=[[4,-1,5,4,2,-1,3,-1],[2,3,4,-1,3,2,0,-1],[5,-1,7,6,5,-1,4,-1],[3,2,1,-1,2,-1,0,-1]],kp=[130.81,98,110,98];function $g(){try{return ze??=new(window.AudioContext||window.webkitAudioContext),Xt||(Xt=ze.createGain(),Xt.gain.value=.5,Xt.connect(ze.destination)),ze.state==="suspended"&&ze.resume().catch(()=>{}),!0}catch{return!1}}function ha(e,t,n,s,o){if(!ze||!Xt)return;const i=ze.createOscillator(),a=ze.createGain();i.type=s,i.frequency.setValueAtTime(e,t),a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(o,t+.03),a.gain.exponentialRampToValueAtTime(5e-4,t+n),i.connect(a).connect(Xt),i.start(t),i.stop(t+n+.05)}function ZM(){if(!ze||!vo)return;if(!bd||document.hidden){ln=ze.currentTime+.1;return}const e=Te/2e3*(vo==="musicbox"?1.35:1);for(ln<ze.currentTime&&(ln=ze.currentTime+.05);ln<ze.currentTime+.4;){const t=Math.floor(Ra/8)%Ec.length,n=Ra%8,s=Ec[t][n];vo==="musicbox"?s>=0&&ha(Rl[Math.min(Rl.length-1,s+3)]*2,ln,.9,"sine",.05):(s>=0&&ha(Rl[s],ln,.5,"triangle",.045),n===0&&ha(kp[t],ln,1.6,"sine",.06),n===4&&ha(kp[t]*1.5,ln,1,"sine",.035)),Ra++,ln+=e}}function wp(e){if(e!==vo){if(vo=e,!vo){if(Ko&&(clearInterval(Ko),Ko=null),Xt&&ze){const t=Xt.gain;t.cancelScheduledValues(ze.currentTime),t.setValueAtTime(t.value,ze.currentTime),t.linearRampToValueAtTime(1e-4,ze.currentTime+.4)}return}!$g()||!ze||!Xt||(Xt.gain.cancelScheduledValues(ze.currentTime),Xt.gain.setValueAtTime(.5,ze.currentTime+.42),Ra=Math.floor(Date.now()/(Te/2))%(Ec.length*8),ln=ze.currentTime+.45,Ko||(Ko=setInterval(ZM,120)))}}function NM(){$g()}const FM=2,jM=340,GM=380;function YM(e,t){const n=new Map;for(const[a,r]of t){if(r.kind!=="dance")continue;const l=e.find(c=>c.id===r.item);!l||!l.on||Yn(l.kind)!=="stereo"||(n.get(r.item)??n.set(r.item,[]).get(r.item)).push(a)}let s=null;for(const a of[...n].sort((r,l)=>r[0]<l[0]?-1:1))a[1].length>=FM&&(!s||a[1].length>s[1].length)&&(s=a);if(!s)return null;const o=e.find(a=>a.id===s[0]),i=e.filter(a=>a.id!==o.id&&Jc(a.kind)&&Math.hypot(a.x-o.x,(a.y-o.y)*1.5)<=jM).map(a=>a.id).sort();return{stereo:o.id,x:o.x,y:o.y,dancers:s[1].sort(),toys:i}}const KM="http://www.w3.org/1999/xhtml",vp=new Map;function Cc(e){if(e.startsWith("data:"))return Promise.resolve(e);let t=vp.get(e);return t||(t=(async()=>{try{const n=new URL(e,location.href);if(n.origin!==location.origin)return"";const o=await(await fetch(n.href,{credentials:"same-origin"})).blob();return await new Promise(i=>{const a=new FileReader;a.onload=()=>i(String(a.result)),a.onerror=()=>i(""),a.readAsDataURL(o)})}catch{return""}})(),vp.set(e,t)),t}const Sc=/url\((['"]?)([^'")]+)\1\)/g;async function _p(e,t,n){const s=new Map;for(const i of e.matchAll(Sc)){const a=i[2];if(a.startsWith("data:")||a.startsWith("#"))continue;let r=a;try{r=new URL(a,t).href}catch{}s.set(a,r)}const o=new Map;return await Promise.all([...s].map(async([i,a])=>o.set(i,n(a)?await Cc(a):""))),e.replace(Sc,(i,a,r)=>{if(r.startsWith("data:")||r.startsWith("#"))return i;const l=o.get(r);return l?`url("${l}")`:"none"})}const XM=["transform","translate","rotate","scale","opacity","filter"];async function JM(e,t){const n=e.offsetWidth,s=e.offsetHeight,o=new Map;for(const _ of document.getAnimations()){const S=_.effect?.target;if(!S||!(e===S||e.contains(S))||_.effect.pseudoElement)continue;const R=getComputedStyle(S);o.set(S,XM.map(D=>`${D}:${R.getPropertyValue(D)}`).join(";"))}const i=new Set,a=_=>{for(const S of _.matchAll(Sc))try{i.add(new URL(S[2],location.href).href)}catch{}},r=[e,...e.querySelectorAll("*")];for(const _ of r)a(getComputedStyle(_).backgroundImage),a(getComputedStyle(_,"::before").backgroundImage),a(getComputedStyle(_,"::after").backgroundImage);const l=e.cloneNode(!0),c=[l,...l.querySelectorAll("*")],d=[];r.forEach((_,S)=>{const R=c[S];if(!R)return;const D=o.get(_);D&&R.setAttribute("style",(R.getAttribute("style")||"")+";"+D);const U=R.getAttribute("style");if(U&&U.includes("url(")&&d.push(_p(U,location.href,()=>!0).then(Z=>R.setAttribute("style",Z))),_ instanceof HTMLImageElement&&R instanceof HTMLImageElement){const Z=_.currentSrc||_.src;R.removeAttribute("srcset"),R.removeAttribute("loading"),d.push(Cc(Z).then(ne=>{ne?R.src=ne:R.removeAttribute("src")}))}else if(_ instanceof HTMLCanvasElement)try{const Z=document.createElement("img");Z.src=_.toDataURL(),Z.setAttribute("style",getComputedStyle(_).cssText||`width:${_.offsetWidth}px;height:${_.offsetHeight}px`),Z.className=_.className,R.replaceWith(Z)}catch{}else if(_ instanceof SVGImageElement){const Z=_.href.baseVal;Z&&d.push(Cc(Z).then(ne=>{ne&&R.setAttribute("href",ne)}))}_.tagName==="BUTTON"&&_.classList.contains("nudge")&&R.setAttribute("style","display:none")}),l.style.transform="none",l.style.left="0",l.style.top="0",l.style.position="relative",l.style.margin="0";let f="";for(const _ of[...document.styleSheets])try{const S=[..._.cssRules].map(R=>R.cssText).join(`
`);f+=await _p(S,_.href||location.href,R=>i.has(R))}catch{}f=f.replace(/:root\b/g,".pbHtml")+`
*,*::before,*::after{animation:none!important;transition:none!important}`,await Promise.all(d);const p=document.documentElement,g=document.body,b=new XMLSerializer,m=`<div xmlns="${KM}" class="pbHtml ${p.className}" style="${$p(p.getAttribute("style")||"")};width:${n}px;height:${s}px;overflow:hidden"><style>${f.replace(/<\/style/gi,"<\\/style")}</style><body class="${$p(g.className)}" style="margin:0;width:${n}px;height:${s}px;overflow:hidden;background:transparent"><div id="app"><div class="stageWrap" style="position:relative;margin:0;padding:0;width:${n}px;height:${s}px;inset:auto;transform:none">`+b.serializeToString(l)+"</div></div></body></div>",v=`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${s}" viewBox="0 0 ${n} ${s}"><foreignObject x="0" y="0" width="${n}" height="${s}">${m}</foreignObject></svg>`,y="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(v),u=document.createElement("canvas");u.width=Math.round(n*t),u.height=Math.round(s*t);const w=u.getContext("2d");try{const _=new Image;_.decoding="sync",_.src=y,await _.decode().catch(()=>new Promise(S=>{_.onload=S,_.onerror=S})),w.drawImage(_,0,0,u.width,u.height),await new Promise(S=>setTimeout(S,60)),w.clearRect(0,0,u.width,u.height),w.drawImage(_,0,0,u.width,u.height)}finally{}return u}const $p=e=>e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");function eL(e,t=new Date,n=0){const s=e.width/600,o=Math.round(26*s),i=Math.round(64*s),a=document.createElement("canvas");a.width=e.width+o*2,a.height=e.height+o+i;const r=a.getContext("2d"),l=r.createLinearGradient(0,0,a.width,a.height);l.addColorStop(0,"#ffd6e8"),l.addColorStop(.5,"#fff1c9"),l.addColorStop(1,"#d9ecff"),r.fillStyle=l,Bl(r,0,0,a.width,a.height,30*s),r.fill(),r.lineWidth=5*s,r.strokeStyle="#5a3d5c",Bl(r,2.5*s,2.5*s,a.width-5*s,a.height-5*s,28*s),r.stroke(),r.save(),n>0&&(Bl(r,o,o,e.width,e.height,n),r.clip()),r.drawImage(e,o,o),r.restore();const c=["#ff7aa8","#ffd166","#7ec8ff","#b48cff","#8ee08e"];for(let d=0;d<26;d++){const p=d/26*a.width,g=d%2?o/2:a.height-i/2+(d%4-1.5)*8*s;r.fillStyle=c[d%5],r.beginPath(),r.arc(p+10*s,(d%2,g),4*s,0,Math.PI*2),r.fill()}return tL(r,o*1.2,a.height-i/2,14*s,"#ffd166"),nL(r,a.width-o*1.3,a.height-i/2,13*s,"#ff7aa8"),r.fillStyle="#5a3d5c",r.textAlign="center",r.textBaseline="middle",r.font=`800 ${Math.round(24*s)}px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif`,r.fillText("Our cozy house · "+t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),a.width/2,a.height-i/2),a}function Bl(e,t,n,s,o,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+s,n,t+s,n+o,i),e.arcTo(t+s,n+o,t,n+o,i),e.arcTo(t,n+o,t,n,i),e.arcTo(t,n,t+s,n,i),e.closePath()}function tL(e,t,n,s,o){e.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?s*.45:s;e.lineTo(t+Math.cos(a)*r,n+Math.sin(a)*r)}e.closePath(),e.fillStyle=o,e.fill(),e.lineWidth=s/5,e.strokeStyle="#5a3d5c",e.stroke()}function nL(e,t,n,s,o){e.beginPath(),e.moveTo(t,n+s*.9),e.bezierCurveTo(t-s*1.6,n-s*.2,t-s*.6,n-s*1.3,t,n-s*.4),e.bezierCurveTo(t+s*.6,n-s*1.3,t+s*1.6,n-s*.2,t,n+s*.9),e.fillStyle=o,e.fill(),e.lineWidth=s/5,e.strokeStyle="#5a3d5c",e.stroke()}function sL(e,t){const n=t.getBoundingClientRect(),s=t.parentElement?.getBoundingClientRect(),o=(g,b)=>g?(parseFloat(getComputedStyle(g).borderTopRightRadius)||0)*b:0,i=e.width/(n.width||1),a=e.height/(n.height||1),r=e.width/Math.max(1,t.offsetWidth);if(!s||!n.width)return{c:e,radius:o(t,r)};const l=Math.max(n.left,s.left,0),c=Math.max(n.top,s.top,0),d=Math.min(n.right,s.right,innerWidth),f=Math.min(n.bottom,s.bottom,innerHeight);if(d-l>=n.width-2&&f-c>=n.height-2)return{c:e,radius:o(t,r)};if(d<=l||f<=c)return{c:e,radius:o(t,r)};const p=document.createElement("canvas");return p.width=Math.round((d-l)*i),p.height=Math.round((f-c)*a),p.getContext("2d").drawImage(e,(l-n.left)*i,(c-n.top)*a,p.width,p.height,0,0,p.width,p.height),{c:p,radius:o(t.parentElement,i)}}const oL=()=>typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let Al=!1;async function iL(e,t){if(!Al){Al=!0;try{const n=Math.min(2,Math.max(1,window.devicePixelRatio||1),1600/Math.max(1,e.offsetWidth)),s=JM(e,n),o=document.createElement("div");o.className="pbFlash"+(oL()?" soft":""),document.body.appendChild(o),t?.(),setTimeout(()=>o.remove(),700);const i=sL(await s,e),a=eL(i.c,new Date,i.radius),r=await new Promise(l=>a.toBlob(l,"image/png"));if(!r)return;aL(r)}catch(n){console.warn("photo booth",n)}finally{Al=!1}}}function aL(e){document.querySelector(".pbCard")?.remove();const t=URL.createObjectURL(e),n="cozy-house-"+new Date().toISOString().slice(0,10)+".png",s=typeof File=="function"?new File([e],n,{type:"image/png"}):null,o=document.createElement("div");o.className="pbCard",o.setAttribute("role","dialog"),o.setAttribute("aria-label","Your photo"),o.innerHTML=`<div class="pbInner"><img class="pbImg" alt="Your photo" src="${t}"/><div class="pbBtns"><button type="button" class="pbSave">💾 Save</button><button type="button" class="pbClose">Close</button></div></div>`,document.body.appendChild(o);const i=()=>{o.remove(),setTimeout(()=>URL.revokeObjectURL(t),1e3)};o.querySelector(".pbClose").addEventListener("click",i),o.addEventListener("click",a=>{a.target===o&&i()}),o.querySelector(".pbSave").addEventListener("click",async()=>{const a=navigator;if(s&&a.share&&a.canShare?.({files:[s]}))try{await a.share({files:[s]});return}catch(l){if(l?.name==="AbortError")return}const r=document.createElement("a");r.href=t,r.download=n,document.body.appendChild(r),r.click(),r.remove()})}const rL=/rug|lamp|light|plant|curtain|clock|window|lantern/;function lL(e){if(e.cat==="plants")return!0;const t=`${e.name} ${e.kind??""}`.toLowerCase();return rL.test(t)}const xg=new Set(["pack:ring-light","pack:desk-lamp",...O1,...q1]);function Mg(e,t=new Date){return e.pack===Vh&&!Qh(t)}function Lg(e){const t=e.rooms??[];return t.includes("backyard")&&!t.includes("any")}function cL(e,t){if(t==="nursery"&&e.kind&&xg.has(e.kind))return!1;if(t==="backyard")return Lg(e);if(t==="all"||!t)return!0;const n=e.rooms;return!n||n.length===0||n.includes(t)?!0:n.includes("any")?e.cat==="decor"||e.cat==="furniture"?lL(e):!0:!1}function dL(e,t,n,s,o){return e.secret&&!(o&&o.has(e.secret))||Mg(e)||!s&&n==="backyard"&&!Lg(e)||n==="nursery"&&e.kind&&xg.has(e.kind)?!1:t.startsWith("pack:")?e.pack===t.slice(5):e.cat!==t?!1:cL(e,s?"all":n)}const Eg="cozy-candy",xp=["🍬","🍭","🍫","🍪","🧁","🍎"];function Cg(e){try{const t=Number(e?.getItem(Eg)??0);return Number.isFinite(t)&&t>0?Math.min(9999,Math.floor(t)):0}catch{return 0}}function fL(e,t=Math.random()){const n=Math.min(9999,Cg(e)+1);try{e?.setItem(Eg,String(n))}catch{}return{count:n,treat:xp[Math.floor(Math.max(0,Math.min(.999,t))*xp.length)]}}function Sg(e=new Date,t=typeof location<"u"?location.search:""){return/[?&]halloween=0\b/.test(t)?!1:/[?&]halloween=1\b/.test(t)||Qh(e)}function pL(e){return`${String(e??"").replace(/[^\p{L}' -]/gu,"").replace(/\s+/g," ").trim().slice(0,30)||"A friend"} came trick-or-treating!`}const hL=200,gL=170,uL=210,mL=420,yL=70,cr=12e3,bL=4200,kL=3,Dl=["wave","hop","heart"];function Ri(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return(t>>>0)%1e4/1e4}const Il=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5),wL=(e,t)=>e.id<t.id?-1:e.id>t.id?1:0;function vL(e,t,n,s){const o=Ri(e+"|"+t+"|"+n)*cr;return(s+o)%cr<bL}function _L(e,t,n,s){const o=Ri(e+"|"+t+"|"+n)*cr,i=Math.floor((s+o)/cr);return Dl[Math.floor(Ri(e+t+n+i)*Dl.length)%Dl.length]}function $L(e,t,n,s,o){const i={pair:new Map,duet:new Map,nearBaby:new Map,babyCoo:!1,pets:new Map},a=[...t].sort(wL),r=new Set;for(const p of a){if(!p.dancingAt||r.has(p.id))continue;let g=null,b=1/0;for(const m of a){if(m===p||r.has(m.id)||m.dancingAt!==p.dancingAt)continue;const v=Il(p,m);v<=gL&&v<b&&(b=v,g=m)}if(g){const m=Ri(e+p.id+g.id);i.duet.set(p.id,{with:g.id,face:g.x<p.x?-1:1,phase:m}),i.duet.set(g.id,{with:p.id,face:p.x<g.x?-1:1,phase:m}),r.add(p.id),r.add(g.id)}}const l=a.filter(p=>!p.busy&&!p.lying),c=[];for(let p=0;p<l.length;p++)for(let g=p+1;g<l.length;g++){const b=Il(l[p],l[g]);b<=hL&&c.push({a:l[p],b:l[g],d:b})}c.sort((p,g)=>p.d-g.d||(p.a.id+p.b.id<g.a.id+g.b.id?-1:1));const d=new Set;for(const{a:p,b:g}of c){if(i.pair.size>=kL*2)break;if(d.has(p.id)||d.has(g.id)||(d.add(p.id),d.add(g.id),!vL(e,p.id,g.id,o)))continue;let b=_L(e,p.id,g.id,o);b==="hop"&&(p.seated||g.seated)&&(b="wave");const m=Ri(e+p.id+g.id);i.pair.set(p.id,{kind:b,with:g.id,face:g.x<p.x?-1:1,phase:m}),i.pair.set(g.id,{kind:b,with:p.id,face:p.x<g.x?-1:1,phase:(m+.18)%1})}if(s)for(const p of a)!p.lying&&Il(p,s)<=uL&&(i.nearBaby.set(p.id,s.x<p.x?-1:1),i.babyCoo=!0);const f=a.filter(p=>p.seated||p.lying);for(const p of[...n].sort((g,b)=>g.key<b.key?-1:1)){let g=null,b=1/0;for(const u of f){const w=Math.abs(u.x-p.x);w<=mL&&w<b&&(b=w,g=u)}if(!g)continue;const m=p.x<=g.x?-1:1,v=[...i.pets.values()].some(u=>u.toward===g.id),y=g.x+m*yL*(v?1.9:1);i.pets.set(p.key,{toward:g.id,dx:Math.round(y-p.x)})}return i}const xL={play:Te,listen:Te*4,stir:Te*2,swing:Te*3,slide:Te*4,look:Te*5,kneel:Te*3},ML={play:"<span>♪</span><span>♩</span>",listen:"<span>♪</span>"},LL={keys:"<span>♪</span><span>♫</span><span>♩</span>",stove:'<span class="steam"></span><span class="steam"></span><span class="steam"></span>',water:'<span class="bub"></span><span class="bub"></span><span class="ripple"></span>',ducky:""},bi=new Map;let Xo=null;function EL(e){try{Xo??=new(window.AudioContext||window.webkitAudioContext);const t=Xo.currentTime+.02,n=[523.25,587.33,659.25,783.99,880,1046.5];for(let s=0;s<6;s++){const o=Xo.createOscillator(),i=Xo.createGain();o.type="triangle",o.frequency.value=n[(e+s*(s%2?2:3))%n.length];const a=t+s*.28;i.gain.setValueAtTime(0,a),i.gain.linearRampToValueAtTime(.06,a+.02),i.gain.exponentialRampToValueAtTime(8e-4,a+.6),o.connect(i).connect(Xo.destination),o.start(a),o.stop(a+.65)}}catch{}}function CL(e,t,n,s){if(Xc(e)!=="keys")return!1;const o=Date.now();return(bi.get(t)??0)>o?bi.delete(t):(bi.set(t,o+xf),n&&EL(o%6),setTimeout(s,xf+60)),s(),!0}function SL(e=Date.now()){const t=new Set;return bi.forEach((n,s)=>{n>e?t.add(s):bi.delete(s)}),t}function PL(e,t,n,s,o,i){const a=Xc(e);if(a==="keys")return s.has(t)?"keys":null;if(a==="stove")return o.has(t)?"stove":null;if(a==="water"){for(const r of n.values())if(r.item===t&&r.kind==="look")return"water";return null}return V0(e)&&i?"ducky":null}const Mp=["soc-wave","soc-hop","soc-heart","soc-l","soc-r","soc-duet","soc-baby"];let Lp=new Map,Hl=new Set;const Ep=new Map;function TL(e,t){return{x:(e.offsetLeft+e.offsetWidth/2)/t,y:(e.offsetTop+e.offsetHeight)/t}}function RL(e,t){const n=e.layer.offsetWidth/e.roomW||1,s=[],o=new Map;e.layer.querySelectorAll(":scope > .pet").forEach((c,d)=>{if(c.classList.contains("lifted")||c.classList.contains("kenneled"))return;const f=c.classList.contains("pet-cat")?"cat":c.dataset.dog||"pet"+d;s.push({key:f,...TL(c,n)}),o.set(f,c)});const i=[];for(const[c,{d}]of e.dolls){const f=t.get(c);i.push({...d,id:c,busy:!!f,dancingAt:f?.kind==="dance"?f.item:void 0})}const a=$L(e.seed,i,s,e.baby,e.now),r=new Map;for(const c of i)for(const d of i)c!==d&&Math.hypot(c.x-d.x,(c.y-d.y)*1.5)<=200&&(r.get(c.id)??r.set(c.id,new Set).get(c.id)).add(d.id);for(const[c,d]of r)for(const f of d)!Lp.get(c)?.has(f)&&Hl.has(c)&&Hl.has(f)&&Ep.set(c,e.now+1800);Lp=r,Hl=new Set(i.map(c=>c.id));for(const[c,{el:d}]of e.dolls){const f=t.get(c),p=a.pair.get(c),g=a.duet.get(c),b=a.nearBaby.get(c),m=(Ep.get(c)??0)>e.now;let v="",y=0,u=0;if(g&&f)v="soc-duet",y=g.face,u=g.phase;else if(!f&&m){v="soc-wave";const S=[...r.get(c)??[]][0],R=S?e.dolls.get(S)?.d:void 0;y=R?R.x<e.dolls.get(c).d.x?-1:1:0}else!f&&p?(v="soc-"+p.kind,y=p.face,u=p.phase):!f&&b&&(v="soc-baby",y=b);const w=v+y;if(d.dataset.soc===w)continue;if(d.classList.remove(...Mp),!v){delete d.dataset.soc;continue}d.dataset.soc=w,d.classList.add(v),y&&d.classList.add(y<0?"soc-l":"soc-r");const _=Te*2;d.style.setProperty("--soc-delay",Is(u,_,e.now)+"ms"),v==="soc-duet"&&d.style.setProperty("--amb-delay",Is(u,Te*2,e.now)+"ms")}for(const c of e.layer.querySelectorAll("[data-soc]"))c.dataset.id||c.dataset.pid,[...e.dolls.values()].some(d=>d.el===c)||(c.classList.remove(...Mp),delete c.dataset.soc);for(const[c,d]of o){const f=a.pets.get(c),p=f&&!e.reduced||f?f.dx*n:0,g=parseFloat(d.dataset.socDx||"0");Math.abs(p-g)<1||(d.dataset.socDx=String(p),d.classList.toggle("soc-trot",Math.abs(p-g)>12&&!e.reduced),d.classList.toggle("soc-snug",!!f),d.style.translate=p?`${p.toFixed(1)}px 0`:"",Math.abs(p-g)>12&&setTimeout(()=>d.classList.remove("soc-trot"),1300))}const l=e.layer.querySelector(":scope > .baby");l&&l.classList.toggle("soc-coo",a.babyCoo)}function ps(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function BL(e){!e||ps()||(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),window.setTimeout(()=>e.classList.remove("wiggle"),480))}const AL=".round, .thing";function DL(){let e=null;const t=()=>{e?.classList.remove("pressing"),e=null};document.addEventListener("pointerdown",n=>{t();const s=n.target?.closest?.(AL);s&&(s.classList.add("pressing"),e=s)},{capture:!0,passive:!0});for(const n of["pointerup","pointercancel","dragstart","blur"])window.addEventListener(n,t,{capture:!0,passive:!0});document.addEventListener("pointerup",n=>{if(ps())return;const s=n.target?.closest("button");s&&(s.classList.remove("spring"),s.offsetWidth,s.classList.add("spring"))},!0)}const Pg=Wt("khg.showWishes"),Ol=()=>{try{return localStorage.getItem(Pg)!=="0"}catch{return!0}},IL={sleepy:'<svg viewBox="0 0 40 40"><rect x="5" y="20" width="30" height="10" rx="3" fill="#8fb8ff" stroke="#5b3d5c" stroke-width="2.5"/><rect x="7" y="15" width="10" height="7" rx="3" fill="#fff" stroke="#5b3d5c" stroke-width="2.5"/><path d="M6 30 V34 M34 30 V34" stroke="#5b3d5c" stroke-width="2.5" stroke-linecap="round"/><path d="M24 6 H31 L24 13 H31" fill="none" stroke="#5b3d5c" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/></svg>',hungry:'<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="12" fill="#ff6b6b" stroke="#5b3d5c" stroke-width="2.5"/><path d="M20 11 V6" stroke="#5b3d5c" stroke-width="2.5" stroke-linecap="round"/><path d="M21 9 Q28 4 31 9 Q26 13 21 9 Z" fill="#7bd389" stroke="#5b3d5c" stroke-width="2"/></svg>',playful:'<svg viewBox="0 0 40 40"><ellipse cx="20" cy="16" rx="10" ry="12" fill="#ffd166" stroke="#5b3d5c" stroke-width="2.5"/><path d="M18 28 L22 28 L20 31 Z" fill="#ffd166" stroke="#5b3d5c" stroke-width="2"/><path d="M20 31 Q16 34 20 37" fill="none" stroke="#5b3d5c" stroke-width="2" stroke-linecap="round"/></svg>',clean:'<svg viewBox="0 0 40 40"><circle cx="15" cy="23" r="9" fill="#bfe9ff" stroke="#5b3d5c" stroke-width="2.5"/><circle cx="27" cy="14" r="6" fill="#bfe9ff" stroke="#5b3d5c" stroke-width="2.5"/><circle cx="29" cy="29" r="4" fill="#bfe9ff" stroke="#5b3d5c" stroke-width="2"/><path d="M11 19 Q13 17 15 17" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>'},HL={sleepy:"wants a nap",hungry:"wants a snack",playful:"wants to play",clean:"wants a bath"},OL='<svg viewBox="0 0 48 48"><path d="M6 28 Q24 8 42 28" fill="none" stroke="#5b3d5c" stroke-width="3" stroke-linecap="round"/><ellipse cx="24" cy="30" rx="14" ry="11" fill="#fff" stroke="#5b3d5c" stroke-width="3"/><circle cx="20" cy="30" r="5" fill="#ffd166" stroke="#5b3d5c" stroke-width="2.5"/><circle cx="31" cy="24" r="3" fill="#fff" stroke="#5b3d5c" stroke-width="2"/></svg>',WL='<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="11" fill="#eee" stroke="#5b3d5c" stroke-width="3"/><path d="M10 40 L38 18" stroke="#5b3d5c" stroke-width="3" stroke-linecap="round"/></svg>',UL=(e,t)=>e==="sleepy"?/(^|-|:)bed$|bunk-bed|canopy-bed/.test(t):e==="hungry"?Bo(t):e==="clean"?Ro(t):Li(t);function VL(e,t,n){const s=e.rooms[t.room]?.items??[],o=r=>n==="sleepy"?/bed|crib|cot/.test(r):n==="hungry"?Bo(r)||Fa(r):n==="clean"?Ro(r):Li(r);let i=null,a=1/0;for(const r of s)if(o(r.kind)){const l=Math.abs(r.x-t.x);l<a&&(a=l,i=r.x)}return i}function QL(e){const t=new Map,n=new Map;let s=0,o=performance.now(),i=0,a=0;const r=document.createElement("button");r.type="button",r.className="menuRow",r.id="btnWishes",r.innerHTML='<span class="mIco" id="wishIco"></span><span class="mLabel">Wishes</span>';const l=()=>{const m=Ol();r.querySelector("#wishIco").innerHTML=m?OL:WL,r.setAttribute("aria-label",m?"Wishes on":"Wishes off"),r.setAttribute("aria-pressed",String(m))};r.addEventListener("click",()=>{try{localStorage.setItem(Pg,Ol()?"0":"1")}catch{}l(),P.click(),p()}),e.menuAfter?.insertAdjacentElement("afterend",r),l();function c(m){if(ps()){m.classList.add("need-glow"),setTimeout(()=>m.classList.remove("need-glow"),900);return}const v=document.createElement("div");v.className="need-burst",v.setAttribute("aria-hidden","true");for(let u=0;u<7;u++){const w=document.createElement("i");w.className=u%2?"nb-heart":"nb-spark",w.style.setProperty("--a",u/7*360+15+"deg"),w.style.setProperty("--dl",u*40+"ms"),v.appendChild(w)}m.appendChild(v),setTimeout(()=>v.remove(),1400);const y=m.querySelector(":scope > .inner");y?.classList.remove("need-hop"),y?.offsetWidth,y?.classList.add("need-hop")}function d(m,v,y){const u=m.offsetWidth?m.getBoundingClientRect().width/m.offsetWidth:1;if(u>0&&Number.isFinite(u)&&v.style.setProperty("--nbs",u.toFixed(3)),!y){v.style.left="",v.style.bottom="";return}const w=m.querySelector(".inner svg .dollhead");if(!w)return;const _=m.getBoundingClientRect(),S=w.getBoundingClientRect();!_.width||!_.height||!S.width||(v.style.left=((S.left+S.width/2-_.left)/_.width*100).toFixed(1)+"%",v.style.bottom=((_.bottom-S.top)/_.height*100+4).toFixed(1)+"%")}function f(m){const v=m.querySelector(".inner svg .dollhead");if(!v)return;const y=m.getBoundingClientRect(),u=v.getBoundingClientRect();!y.width||!y.height||!u.width||(m.style.setProperty("--zx",((u.left+u.width*.7-y.left)/y.width*100).toFixed(1)+"%"),m.style.setProperty("--zy",((u.top-y.top)/y.height*100-14).toFixed(1)+"%"))}function p(){const m=e.get(),v=Ol();for(const u of e.layer.querySelectorAll(".char[data-cid]")){const w=m.characters.find(ee=>ee.id===u.dataset.cid);if(!w)continue;const _={sleepy:3,hungry:3,playful:3,clean:3};for(const ee of Hs)_[ee]=Vs(w,ee);const S=t.get(w.id);S&&Hs.some(ee=>_[ee]>S[ee])&&(c(u),P.sparkle()),t.set(w.id,_);const R=ja(w),D=!!w.seat&&w.seat.pose==="lie";u.classList.toggle("need-snooze",D),D?requestAnimationFrame(()=>f(u)):(u.style.removeProperty("--zx"),u.style.removeProperty("--zy")),u.classList.toggle("need-sleepy",R==="sleepy"&&!D);let U=u.querySelector(":scope > .need-bubble");if(!R||!v){if(U){U.classList.remove("show");const ee=U;setTimeout(()=>{ee.classList.contains("show")||ee.remove()},450)}continue}U||(U=document.createElement("div"),U.className="need-bubble",U.innerHTML='<i class="nb-dot1"></i><i class="nb-dot2"></i><span class="nb-cloud"></span>',u.appendChild(U)),U.dataset.need!==R&&(U.dataset.need=R,U.querySelector(".nb-cloud").innerHTML=IL[R],U.setAttribute("role","img"),U.setAttribute("aria-label",HL[R]));const Z=VL(m,w,R),ne=Z==null?0:Math.max(-1,Math.min(1,(Z-w.x)/300));U.style.setProperty("--lean",String(Math.round(ne*100)/100));const G=U;requestAnimationFrame(()=>{d(u,G,D),G.classList.add("show")})}for(const u of t.keys())m.characters.some(w=>w.id===u)||t.delete(u);const y=new Set;if(v){for(const u of m.characters)if(u.room===m.currentRoom&&ja(u)){for(const w of Hs)if(Vs(u,w)<=1)for(const _ of m.rooms[m.currentRoom]?.items??[])UL(w,_.kind)&&y.add(_.id)}}for(const u of e.layer.querySelectorAll(".item[data-id]"))u.classList.toggle("need-hint",y.has(u.dataset.id))}function g(){if(!e.speaks())return;const m=e.get(),v=Date.now();for(const y of m.characters)if(y.room===m.currentRoom)for(const u of Jm(m,y)){const w=y.id+"|"+u;v-(n.get(w)??0)<2500||(n.set(w,v),e.dispatch({type:"need/meet",id:y.id,need:u}))}}function b(m){const v=performance.now(),y=m??Math.min(v-o,5e3);if(o=v,m==null&&document.visibilityState!=="visible")return;if(!e.canDrift()||!e.speaks()){s=0;return}if(s+=y,s<Ym(e.get(),a))return;s=0,a++;const u=n1(e.get(),i++);u&&e.dispatch({type:"need/drift",id:u.id,need:u.need})}e.subscribe(()=>{p(),setTimeout(g,0)}),e.layer.addEventListener("pointerup",m=>{m.target.closest?.(".char[data-cid]")&&(n.clear(),g())}),setInterval(()=>{b(),p()},1e3),document.addEventListener("visibilitychange",()=>{o=performance.now()}),p(),new URLSearchParams(location.search).has("needsqa")&&(window.__needs={tick:m=>b(m),visible:()=>s,paint:p,care:g})}function zL(e){const t=e.scale;let n=0;e.overflowR>1&&e.overflowL>1?n=-e.overflowL:e.overflowR>1?n=e.overflowR:e.overflowL>1&&(n=-e.overflowL);const s=e.cam+n/t,o=Math.max(0,Math.min(e.maxCam,s)),i=s-o,a=e.nudgeX&&Math.abs(i)>.5?e.kidX-i:e.kidX;return{cam:o,kidX:a}}function qL(e){const t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[1][0]).toUpperCase():"?"}function ZL(e,t=3){const n=[...e].sort((r,l)=>r.x-l.x||r.id.localeCompare(l.id)),s=[],o=[],i=(r,l,c)=>s.some(d=>d.lane===c&&Math.abs(d.x-r)<(d.w+l)/2+8),a=[];for(const r of n){let l=-1;for(let c=0;c<t;c++)if(!i(r.x,r.w,c)){l=c;break}l<0?a.push(r):(s.push({x:r.x,w:r.w,lane:l}),o.push({id:r.id,lane:l,initials:!1}))}for(const r of a){const l=Math.min(r.w,44);let c=0;for(let d=0;d<t;d++)if(!i(r.x,l,d)){c=d;break}s.push({x:r.x,w:l,lane:c}),o.push({id:r.id,lane:c,initials:!0})}return o}let NL=0;function Tg(e=document){const t=[...e.querySelectorAll(".nametag")].filter(o=>{const i=o.getBoundingClientRect();return i.width>2&&i.height>2});if(!t.length)return;const n=t.map(o=>{o.dataset.tagId||(o.dataset.tagId="tg"+(++NL).toString(36)),o.dataset.full||(o.dataset.full=(o.textContent||"").trim()),o.classList.contains("is-initials")||(o.dataset.fullW=String(o.getBoundingClientRect().width));const i=o.getBoundingClientRect(),a=Number(o.dataset.fullW)||i.width;return{id:o.dataset.tagId,x:i.left+i.width/2,w:a}}),s=new Map(ZL(n).map(o=>[o.id,o]));for(const o of t){const i=s.get(o.dataset.tagId||"");if(!i)continue;const a=o.dataset.full||"",r=i.initials?qL(a):a;o.textContent!==r&&(o.textContent=r),o.classList.toggle("is-initials",i.initials),o.style.setProperty("--tag-lane",String(i.lane))}}const Rg="#5a3d5c",_t=`stroke="${Rg}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,FL={living:"#ff8fab",bedroom:"#c9a0dc",kitchen:"#8fd6a6",salon:"#f0a0d8",nursery:"#9ad7f5",bathroom:"#7ec8d6",backyard:"#80ed99"};function jL(e){const t=FL[e]??"#ffb3c6";return`<div class="sceneWin builtin-window" aria-hidden="true"><svg viewBox="0 0 160 180">
    <path d="M18 20 H142 V150 H18 Z" fill="#fff6ea" ${_t}/>
    <path d="M28 30 H132 V118 H28 Z" fill="#b9e3ff" ${_t}/>
    <path d="M80 30 V118 M28 74 H132" ${_t} stroke-width="3"/>
    <circle cx="48" cy="52" r="10" fill="#fff" opacity=".85"/>
    <ellipse cx="108" cy="48" rx="16" ry="8" fill="#fff" opacity=".8"/>
    <path d="M40 118 Q58 96 70 118 Q90 100 112 118" fill="#7dce8a" stroke="${Rg}" stroke-width="3"/>
    <rect x="96" y="86" width="8" height="32" rx="3" fill="#6b4a32" ${_t} stroke-width="2"/>
    <circle cx="100" cy="80" r="12" fill="#5cc985" ${_t} stroke-width="2"/>
    <path d="M8 16 Q6 80 16 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <path d="M152 16 Q154 80 144 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <rect x="46" y="146" width="68" height="12" rx="4" fill="#ffe7c2" ${_t}/>
  </svg></div>`}function GL(){return`<div class="sceneRug" aria-hidden="true"><svg viewBox="0 0 200 80">
    <ellipse cx="100" cy="48" rx="92" ry="24" fill="#ffc8dd" ${_t}/>
    <ellipse cx="100" cy="48" rx="64" ry="15" fill="#bde0fe" ${_t} stroke-width="3"/>
    <ellipse cx="100" cy="48" rx="28" ry="7" fill="#fff6ea"/>
  </svg></div>
  <div class="sceneLamp" aria-hidden="true"><svg viewBox="0 0 80 160">
    <path d="M18 52 L30 8 H50 L62 52 Z" fill="#ffd166" ${_t}/>
    <rect x="36" y="52" width="8" height="78" rx="4" fill="#c9a0dc" ${_t}/>
    <ellipse cx="40" cy="136" rx="26" ry="8" fill="#b388d6" ${_t}/>
    <circle cx="34" cy="28" r="4" fill="#fff" opacity=".8"/>
  </svg></div>
  <div class="scenePlant" aria-hidden="true"><svg viewBox="0 0 90 140">
    <path d="M45 128 C45 90 18 78 20 48 C40 58 44 80 45 128" fill="#5cc985" ${_t}/>
    <path d="M45 128 C45 92 74 70 78 40 C58 54 50 82 45 128" fill="#80ed99" ${_t}/>
    <path d="M45 128 C40 96 28 88 22 70" fill="none" stroke="#3d9a62" stroke-width="3"/>
    <path d="M30 132 H62 L56 118 H36 Z" fill="#e07a5f" ${_t}/>
    <ellipse cx="46" cy="126" rx="16" ry="5" fill="#c4634a"/>
  </svg></div>`}function YL(e,t){return t==="backyard"?[]:[{id:e("rug"),kind:"rug",x:1152,y:540,flip:!1,z:0,scale:1},{id:e("lamp"),kind:"lamp",x:804,y:470,flip:!1,z:0,scale:1},{id:e("plant"),kind:"plant",x:1584,y:480,flip:!1,z:0,scale:1}]}let Es="",Bg=null;function KL(e){Bg=e,Es=""}function XL(e,t,n){const s=Bg?.(t,n);if(s!=null){const r="custom|"+t;if(r===Es&&e.childElementCount)return;Es=r,e.innerHTML=s,e.dataset.room=t;return}if(t==="backyard"){const r="yard|"+t;if(r===Es&&e.childElementCount)return;Es=r,e.innerHTML="",e.dataset.room=t;return}const o=n.length===0,i=n.some(r=>/window|curtain/i.test(r.kind)),a=t+(o?"|e":"")+(i?"|w":"");a===Es&&e.childElementCount||(Es=a,e.innerHTML=(i?"":jL(t))+(o?GL():""),e.dataset.room=t)}const He="#5a3d5c",C=(e=4)=>`stroke="${He}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Gi=600,nn=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],pn=(e,t,n=3)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${He}"/><circle cx="${e+1}" cy="${t-1}" r="${n/3}" fill="#fff"/>`,Bs=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="5" ry="3" fill="#ff9bb5" opacity=".75"/>`,JL=(e,t,n,s)=>nn.map((o,i)=>`<path d="M${e-n+i*s} ${t} A${n-i*s} ${n-i*s} 0 0 1 ${e+n-i*s} ${t}" fill="none" stroke="${o}" stroke-width="${s}"/>`).join(""),e9=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${C()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${C()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${C()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${C()}/></g>`,Sn=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-46" y="-50" width="92" height="50" rx="14" fill="#f5d27a" ${C()}/>
  <path d="M-30 -42 V-8 M0 -44 V-6 M30 -42 V-8" stroke="#d9a93f" stroke-width="4" stroke-linecap="round"/><path d="M-46 -26 H46" stroke="#c98a2e" stroke-width="5"/></g>`,t9=(e,t,n)=>{const s=Array.from({length:Math.floor((t-e)/70)+1},(o,i)=>`<rect x="${e+i*70-7}" y="${n-58}" width="14" height="64" rx="5" fill="#fff6e6" ${C(3)}/>`).join("");return`<rect x="${e}" y="${n-46}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${C(3)}/><rect x="${e}" y="${n-22}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${C(3)}/>${s}`};function n9(){const e=Qi;return`<svg class="parkScene ranchScene" viewBox="0 0 ${e} ${Gi}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="rcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7e8ff"/><stop offset="1" stop-color="#fff4fb"/></linearGradient></defs>
  <rect width="${e}" height="440" fill="url(#rcSky)"/>
  <g opacity=".55">${JL(1900,430,620,26)}</g>
  ${[160,820,1500,2300,3e3].map((t,n)=>`<g transform="translate(${t} ${70+n%2*34})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <g transform="translate(${e-200} 92)"><circle r="48" fill="#ffe066" ${C()}/>${pn(-15,-6,4)}${pn(13,-6,4)}<path d="M-14 12 Q0 24 14 12" fill="none" ${C(3)}/>${Bs(-26,8)}${Bs(26,8)}</g>
  <path d="M-50 370 Q600 230 1300 350 T2600 330 T${e+100} 360 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#a6e3a0"/><path d="M0 410 H${e}" ${C()}/>
  <path d="M0 566 Q900 530 1800 570 T${e} 552 V600 H0 Z" fill="#f2dcb8" opacity=".9"/>
  ${e9(3560,400,.8,"#4fbf7a")}
  <!-- entrance gate with a rainbow arch -->
  <g class="ranchSign"><g class="ranchSignArt"><rect x="40" y="290" width="24" height="210" rx="6" fill="#c99366" ${C()}/><rect x="196" y="290" width="24" height="210" rx="6" fill="#c99366" ${C()}/>
    <path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${He}" stroke-width="44" stroke-linecap="round"/>
    ${nn.map((t,n)=>`<path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${t}" stroke-width="${36-n*6}" stroke-linecap="round"/>`).join("")}
    <rect x="22" y="250" width="216" height="40" rx="14" fill="#fff6e6" ${C(3)}/><text x="130" y="277" text-anchor="middle" font-size="19" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  <!-- red barn with rainbow trim and banner -->
  <g transform="translate(270 0)">
    <path d="M0 470 V250 L60 180 H270 L330 250 V470 Z" fill="#ef5b5b" ${C(5)}/>
    <path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${He}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    ${nn.map((t,n)=>`<path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${t}" stroke-width="3" transform="translate(0 ${-7+n*2.8})" stroke-linejoin="round"/>`).join("")}
    <rect x="115" y="215" width="100" height="56" rx="10" fill="#fff6e6" ${C(4)}/><path d="M115 215 L215 271 M215 215 L115 271" stroke="#ef5b5b" stroke-width="6"/>
    <rect x="95" y="330" width="140" height="140" rx="8" fill="#fff6e6" ${C(4)}/><rect x="108" y="342" width="56" height="128" fill="#d94848" ${C(3)}/><rect x="166" y="342" width="56" height="128" fill="#d94848" ${C(3)}/>
    <path d="M108 342 L164 470 M164 342 L108 470 M166 342 L222 470 M222 342 L166 470" stroke="#fff6e6" stroke-width="6"/>
    <g class="barnBanner" transform="translate(165 300)"><g class="ranchSignArt">${nn.map((t,n)=>`<rect x="${-120+n*40}" y="-16" width="40" height="30" fill="${t}"/>`).join("")}<rect x="-120" y="-16" width="240" height="30" fill="none" ${C(3)}/>
      <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${He}" stroke-width="4" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  </g>
  ${Sn(640,560,.8)}${Sn(1950,470,.7)}${Sn(1880,470,.55)}${Sn(3115,470,.7)}${Sn(3115,425,.55)}
  <!-- the petting zoo moved into the barn: a sign by the barn door, sunflowers where the pen was -->
  ${Array.from({length:6},(t,n)=>{const s=1030+n*66,o=70+n%3*18;return`<g transform="translate(${s} 470)"><path d="M0 0 V-${o}" stroke="#40c057" stroke-width="6" stroke-linecap="round"/><ellipse cx="${n%2?9:-9}" cy="-${o/2}" rx="11" ry="5" fill="#69db7c" ${C(2.5)}/>${[0,45,90,135,180,225,270,315].map(i=>`<ellipse cx="${Math.cos(i*Math.PI/180)*14}" cy="${-o+Math.sin(i*Math.PI/180)*14}" rx="8" ry="5" transform="rotate(${i} ${Math.cos(i*Math.PI/180)*14} ${-o+Math.sin(i*Math.PI/180)*14})" fill="#ffd43b" ${C(2)}/>`).join("")}<circle cy="-${o}" r="10" fill="#a0522d" ${C(2.5)}/></g>`}).join("")}
  <!-- pond -->
  <ellipse cx="${yt.x}" cy="${yt.y}" rx="${yt.rx}" ry="${yt.ry}" fill="#8ecae6" ${C()}/><ellipse cx="${yt.x-15}" cy="${yt.y-6}" rx="70" ry="16" fill="#bde6f7"/>
  <!-- paddock fence + HORSES sign are their own depth layer (paddockFenceSVG) -->
  <!-- garden -->
  <rect x="3140" y="520" width="420" height="70" rx="20" fill="#b07d54" ${C()}/>
  <rect x="3260" y="430" width="160" height="40" rx="12" fill="#fff6e6" ${C(3)}/><text x="3340" y="458" text-anchor="middle" font-size="21" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">GARDEN</text>
  <path d="M3340 470 V500" ${C(5)}/>
  </svg>`}function s9(){return`<svg class="fenceLayer" viewBox="0 0 ${Qi} ${Gi}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  ${t9(2400,3080,470)}
  <rect x="2640" y="380" width="180" height="40" rx="12" fill="#fff6e6" ${C(3)}/><text x="2730" y="408" text-anchor="middle" font-size="21" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">HORSES</text>
  </svg>`}const Ag=[{name:"Goat",say:"Meh-eh-eh!",snd:"bleat"},{name:"Sheep",say:"Baa!",snd:"baa"},{name:"Piglet",say:"Oink oink!",snd:"oink"},{name:"Chicks",say:"Peep peep!",snd:"peep"},{name:"Bunny",say:"*wiggle wiggle*",snd:"squeak"},{name:"Cow",say:"Moooo!",snd:"moo"}],ga=(e,t,n,s=94)=>e.map((o,i)=>`<rect class="leg ${i%2?"b":"a"}" x="${o}" y="${t}" width="9" height="${s-t}" rx="4" fill="${n}" ${C(3)}/>`).join("");function Pc(e){switch(e){case 0:return`<svg viewBox="0 0 120 100">${ga([32,44,70,82],60,"#efe6dc")}<path class="tail" d="M24 50 l-8 -10" ${C(5)}/>
      <ellipse cx="58" cy="56" rx="34" ry="17" fill="#f4ede5" ${C()}/><g class="head"><path d="M86 30 l-6 -16 l10 10 Z M96 30 l2 -17 l5 13 Z" fill="#c9b8a8" ${C(3)}/>
      <ellipse cx="94" cy="40" rx="14" ry="16" fill="#f4ede5" ${C()}/><ellipse class="ear" cx="80" cy="36" rx="9" ry="4" fill="#e8d6c4" ${C(3)}/>${pn(98,36)}<path d="M98 56 q2 8 6 0" fill="#e8d6c4" ${C(3)}/>${Bs(102,46)}<circle cx="106" cy="44" r="2" fill="${He}"/></g></svg>`;case 1:return`<svg viewBox="0 0 120 100">${ga([36,48,70,80],62,"#5a4a5c")}
      ${[[40,50],[56,44],[72,48],[86,56],[70,64],[48,64],[34,60]].map(([t,n])=>`<circle cx="${t}" cy="${n}" r="15" fill="#fff" ${C(3)}/>`).join("")}<ellipse cx="60" cy="55" rx="30" ry="14" fill="#fff"/>
      <g class="head"><ellipse cx="96" cy="46" rx="13" ry="15" fill="#6b5a6e" ${C()}/><circle cx="92" cy="32" r="8" fill="#fff" ${C(3)}/><ellipse class="ear" cx="82" cy="44" rx="8" ry="4" fill="#6b5a6e" ${C(3)}/>
      <circle cx="99" cy="42" r="3.2" fill="#fff"/><circle cx="99.5" cy="42" r="1.8" fill="${He}"/>${Bs(102,52)}</g></svg>`;case 2:return`<svg viewBox="0 0 120 100">${ga([38,50,66,78],66,"#ffadc6")}<path class="tail" d="M28 54 q-10 -4 -6 -12 q6 0 2 8" fill="none" ${C(3)}/>
      <ellipse cx="58" cy="60" rx="32" ry="20" fill="#ffc2d4" ${C()}/><g class="head"><circle cx="90" cy="52" r="16" fill="#ffc2d4" ${C()}/><path d="M80 38 l2 -12 l9 8 Z" fill="#ffadc6" ${C(3)}/>
      <ellipse cx="104" cy="56" rx="7" ry="8" fill="#ff9bb8" ${C(3)}/><circle cx="102" cy="54" r="1.6" fill="${He}"/><circle cx="106" cy="57" r="1.6" fill="${He}"/>${pn(92,46)}${Bs(90,60)}</g></svg>`;case 3:return`<svg viewBox="0 0 120 100">${[[30,72,1],[62,66,1.15],[92,74,.95]].map(([t,n,s])=>`<g transform="translate(${t} ${n}) scale(${s})"><path d="M-4 16 v8 M4 16 v8" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="4" r="14" fill="#ffe066" ${C(3)}/><path d="M-8 2 q-6 4 0 8" fill="#ffd43b" ${C(2)}/><g class="head"><circle cx="5" cy="-8" r="9" fill="#ffe066" ${C(3)}/><path d="M13 -9 l7 2 l-7 3 Z" fill="#ff9f43" ${C(2)}/>${pn(7,-10,2.2)}</g></g>`).join("")}</svg>`;case 4:return`<svg viewBox="0 0 120 100"><circle class="tail" cx="30" cy="68" r="8" fill="#fff" ${C(3)}/><ellipse cx="56" cy="72" rx="28" ry="20" fill="#f6eef9" ${C()}/><ellipse cx="74" cy="90" rx="12" ry="5" fill="#f6eef9" ${C(3)}/>
      <g class="head"><ellipse class="ear" cx="78" cy="26" rx="7" ry="20" fill="#f6eef9" ${C(3)} transform="rotate(-12 78 26)"/><ellipse cx="78" cy="26" rx="3" ry="13" fill="#ffc2d4" transform="rotate(-12 78 26)"/>
      <ellipse cx="90" cy="28" rx="7" ry="20" fill="#f6eef9" ${C(3)} transform="rotate(10 90 28)"/><circle cx="86" cy="56" r="17" fill="#f6eef9" ${C()}/>${pn(92,52)}<circle cx="102" cy="58" r="2.5" fill="#ff8fab"/>${Bs(90,63)}</g></svg>`;default:return`<svg viewBox="0 0 120 100">${ga([30,42,72,84],62,"#fff")}<path class="tail" d="M20 50 q-6 14 0 26" fill="none" ${C(3)}/>
      <rect x="18" y="38" width="80" height="34" rx="16" fill="#fff" ${C()}/><path d="M30 40 q10 8 4 20 q-10 -2 -10 -14 Z M60 42 q14 2 10 18 q-12 4 -14 -8 Z" fill="${He}"/><ellipse cx="60" cy="74" rx="8" ry="5" fill="#ffadc6" ${C(2)}/>
      <g class="head"><path d="M90 24 l-8 -8 M108 24 l8 -8" stroke="#f5d27a" stroke-width="5" stroke-linecap="round"/><rect x="86" y="22" width="26" height="30" rx="12" fill="#fff" ${C()}/>
      <ellipse cx="100" cy="52" rx="14" ry="10" fill="#ffc2d4" ${C(3)}/><circle cx="95" cy="52" r="1.8" fill="${He}"/><circle cx="105" cy="52" r="1.8" fill="${He}"/>${pn(94,34)}${pn(106,34)}
      <ellipse class="ear" cx="82" cy="30" rx="7" ry="4" fill="#fff" ${C(3)}/></g></svg>`}}const yt={x:2265,y:520,rx:110,ry:34},o9=476,dr=[{name:"Chestnut",body:"#c97b45",mane:"#7a3f22",sock:"#fff6e6"},{name:"Snowy",body:"#fdf8f3",mane:"#d9cdc4",sock:"#e9ddd2"},{name:"Midnight",body:"#4a3f52",mane:"#2a2230",sock:"#6b5e74"},{name:"Sunny",body:"#f2c96b",mane:"#fff6e0",sock:"#fff6e0"},{name:"Rainbow Pony",body:"#fff0fa",mane:"rainbow",sock:"#ffd6ec"}];function Pd(e,t=!1){const n=dr[e]??dr[0],s=n.mane==="rainbow",o=s?nn.map((r,l)=>{const c=124-l*1.6,d=14+l*2.4;return`<path d="M${c.toFixed(1)} ${d.toFixed(1)} q-6.5 2 -4.5 ${6+l*.35}" fill="none" stroke="${r}" stroke-width="5.5" stroke-linecap="round"/>`}).join(""):`<path d="M106 20 q-14 6 -18 30 q8 -6 10 -2 q4 -12 14 -18 Z" fill="${n.mane}" ${C(3)}/>`,i=s?`<g class="tail">${nn.map((r,l)=>`<path d="M30 58 q-18 ${8+l*3} -14 ${36+l}" fill="none" stroke="${r}" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`:`<path class="tail" d="M30 56 q-20 10 -14 44 q10 -10 8 -20 q6 -10 10 -18 Z" fill="${n.mane}" ${C(3)}/>`,a=(r,l)=>`<g class="leg ${l}"><rect x="${r}" y="78" width="12" height="44" rx="5" fill="${n.body}" ${C(3)}/><rect x="${r}" y="110" width="12" height="12" rx="4" fill="${n.sock}" ${C(3)}/></g>`;return`<svg viewBox="0 0 160 130" class="horsesvg">${i}${a(40,"a")}${a(56,"b")}${a(96,"b")}${a(112,"a")}
    <ellipse cx="80" cy="68" rx="50" ry="24" fill="${n.body}" ${C()}/>
    ${t||s?`<path class="saddle" data-top="43" d="M64 46 q16 -6 32 0 l-2 22 q-14 4 -28 0 Z" fill="${s?"#b197fc":"#e8590c"}" ${C(3)}/>`:""}
    <g class="head"><path d="M108 66 L114 30 Q118 16 132 18 L148 36 Q152 46 142 48 L130 46 L128 70 Z" fill="${n.body}" ${C()}/>
    <path d="M114 22 l2 -14 l8 12 Z" fill="${n.body}" ${C(3)}/>${o}
    ${pn(130,30,3.4)}<circle cx="146" cy="42" r="2" fill="${He}"/>${Bs(136,40)}
    ${s?`<path d="M120 14 l4 -14 l4 14 Z" fill="#ffd43b" ${C(2)}/>`:""}</g>
    ${s?'<g fill="#fff" opacity=".9"><path d="M60 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M92 74 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/></g>':""}</svg>`}const i9=`<svg viewBox="0 0 180 170"><path d="M10 70 L90 14 L170 70" fill="#ffa94d" ${C(5)}/>
  <rect x="24" y="66" width="132" height="84" rx="8" fill="#fff6e6" ${C()}/>${nn.map((e,t)=>`<rect x="${24+t*22}" y="66" width="22" height="10" fill="${e}"/>`).join("")}
  <rect x="24" y="66" width="132" height="10" fill="none" ${C(3)}/><circle cx="90" cy="108" r="22" fill="#5a3d5c"/>
  <path d="M60 150 l-12 16 M120 150 l12 16" ${C(5)}/>
  <g class="hen"><ellipse cx="90" cy="118" rx="20" ry="14" fill="#fff" ${C(3)}/><circle cx="104" cy="104" r="10" fill="#fff" ${C(3)}/><path d="M100 94 q3 -8 8 0" fill="#ff6b6b" ${C(2)}/>
  <path d="M113 104 l7 2 -7 3 Z" fill="#ffa94d" ${C(2)}/>${pn(106,102,2)}</g>
  <text x="90" y="54" text-anchor="middle" font-size="16" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">EGGS</text></svg>`,a9=`<svg viewBox="0 0 170 130"><rect x="80" y="30" width="54" height="50" rx="8" fill="#bde6f7" ${C()}/><rect x="74" y="24" width="66" height="10" rx="4" fill="#ff6b6b" ${C(3)}/>
  <rect x="20" y="62" width="130" height="34" rx="12" fill="#ff6b6b" ${C()}/><rect x="28" y="40" width="10" height="24" rx="3" fill="#868e96" ${C(3)}/>
  <circle cx="122" cy="98" r="28" fill="${He}"/><circle cx="122" cy="98" r="13" fill="#ffd43b" ${C(3)}/><circle cx="44" cy="106" r="18" fill="${He}"/><circle cx="44" cy="106" r="8" fill="#ffd43b" ${C(3)}/>
  <circle cx="26" cy="76" r="5" fill="#fff3b0" ${C(2)}/></svg>`,r9=`<svg viewBox="0 0 240 300"><rect x="104" y="160" width="32" height="140" rx="10" fill="#c99366" ${C()}/>
  <circle cx="120" cy="110" r="90" fill="#5cc985" ${C()}/><circle cx="62" cy="140" r="50" fill="#5cc985" ${C()}/><circle cx="180" cy="140" r="52" fill="#5cc985" ${C()}/>
  ${[[80,90],[150,70],[175,140],[100,150],[130,115],[60,140]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="11" fill="#ff6b6b" ${C(3)}/><path d="M${e} ${t-10} q2 -6 6 -7" fill="none" ${C(2)}/>`).join("")}</svg>`,Cp=[[80,90],[150,70],[175,140],[100,150]],Dg=`<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="14" fill="#ff6b6b" ${C(3)}/><path d="M20 10 q2 -6 6 -7" fill="none" ${C(2.5)}/><ellipse cx="27" cy="8" rx="5" ry="3" fill="#5cc985" ${C(2)}/><circle cx="14" cy="18" r="3" fill="#fff" opacity=".6"/></svg>`,Kr=`<svg viewBox="0 0 40 40"><path d="M12 14 L32 10 L16 36 Z" fill="#ff922b" ${C(3)}/><path d="M18 18 l5 -1 M17 24 l4 -1" ${C(2)}/><path d="M30 10 q4 -8 8 -6 M30 10 q-2 -8 2 -10 M30 10 q6 -2 8 2" fill="none" stroke="#40c057" stroke-width="4" stroke-linecap="round"/></svg>`,l9=`<svg viewBox="0 0 40 40"><path d="M6 34 Q20 4 34 34 Z" fill="#f5d27a" ${C(3)}/><path d="M14 30 L18 14 M20 32 V10 M26 30 L22 14" stroke="#d9a93f" stroke-width="2.5" stroke-linecap="round"/></svg>`,Bi=`<svg viewBox="0 0 40 40"><path d="M20 4 C30 4 34 20 34 26 C34 34 28 38 20 38 C12 38 6 34 6 26 C6 20 10 4 20 4 Z" fill="#fff6e6" ${C(3)}/><circle cx="15" cy="16" r="3" fill="#fff"/></svg>`,Td=(e="#ff8fab")=>`<svg viewBox="0 0 40 40"><path d="M20 38 V20" stroke="#40c057" stroke-width="4" stroke-linecap="round"/>${[0,72,144,216,288].map(t=>`<circle cx="${20+Math.cos(t*Math.PI/180)*8}" cy="${14+Math.sin(t*Math.PI/180)*8}" r="7" fill="${e}" ${C(2.5)}/>`).join("")}<circle cx="20" cy="14" r="5" fill="#ffd43b" ${C(2)}/></svg>`,Ig={carrot:Kr,apple:Dg,hay:l9},c9=e=>`<svg viewBox="0 0 80 90"><g transform="translate(14 0) scale(1.3)">${Ig[e].replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g>
  <path d="M10 40 H70 L62 86 H18 Z" fill="${e==="carrot"?"#74c0fc":e==="apple"?"#ffa8c5":"#b2f2bb"}" ${C(4)}/><path d="M12 52 H68" stroke="#fff" stroke-width="4" opacity=".6"/></svg>`,d9=`<svg viewBox="0 0 60 50"><path d="M12 22 Q30 -6 48 22" fill="none" stroke="${He}" stroke-width="7" stroke-linecap="round"/><path d="M12 22 Q30 -6 48 22" fill="none" stroke="#e0a96d" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 22 H56 L50 46 H10 Z" fill="#e0a96d" ${C(3.5)}/><path d="M12 30 H48 M14 38 H46" stroke="#b5793d" stroke-width="3"/></svg>`,Sp=["#ff8fab","#c9a0dc","#ffd43b","#74c0fc","#ff922b"];function Hg(e,t,n){const s=`<ellipse cx="35" cy="76" rx="30" ry="11" fill="${e?.wet?"#7a4b2e":"#9c6b46"}" ${C(3)}/>`;if(!e)return`<svg viewBox="0 0 70 90">${s}<path d="M20 74 q4 -3 8 0 M36 78 q4 -3 8 0" stroke="#b5875f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;const o=Sp[n%Sp.length];let i="";t===0&&(i=`<circle cx="27" cy="72" r="3" fill="#f2dcb8" ${C(1.5)}/><circle cx="36" cy="75" r="3" fill="#f2dcb8" ${C(1.5)}/><circle cx="44" cy="71" r="3" fill="#f2dcb8" ${C(1.5)}/>`),t===1&&(i=`<path d="M35 72 V58" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="57" rx="7" ry="4" fill="#69db7c" ${C(2)}/><ellipse cx="41" cy="55" rx="7" ry="4" fill="#69db7c" ${C(2)}/>`),t===2&&(i=`<path d="M35 72 V40 M35 60 Q22 54 20 42 M35 56 Q48 50 50 38" stroke="#40c057" stroke-width="4" fill="none" stroke-linecap="round"/>${e.seed==="flower"?`<circle cx="35" cy="38" r="7" fill="#b2f2bb" ${C(2)}/>`:""}`),t===3&&(i=e.seed==="carrot"?`<path d="M26 74 L44 72 L35 86 Z" fill="#ff922b" ${C(2.5)}/><path d="M35 72 Q24 50 22 38 M35 72 Q36 48 36 34 M35 72 Q46 50 50 40" stroke="#40c057" stroke-width="5" fill="none" stroke-linecap="round"/>`:`<path d="M35 72 V34" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="54" rx="8" ry="4" fill="#69db7c" ${C(2)}/>${[0,72,144,216,288].map(l=>`<circle cx="${35+Math.cos(l*Math.PI/180)*10}" cy="${28+Math.sin(l*Math.PI/180)*10}" r="8" fill="${o}" ${C(2.5)}/>`).join("")}<circle cx="35" cy="28" r="6" fill="#ffd43b" ${C(2)}/>`);const a=e.wet?"":`<g class="needWater"><path d="M56 18 q6 10 0 14 q-6 -4 0 -14 Z" fill="#74c0fc" ${C(2)}/></g>`,r=t===3?`<g class="ready"><path d="M58 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffd43b" ${C(1.5)}/></g>`:"";return`<svg viewBox="0 0 70 90">${s}${i}${a}${r}</svg>`}const f9=`<svg viewBox="0 0 48 48">${nn.map((e,t)=>`<path d="M${6+t*2.6} 38 A${18-t*2.6} ${18-t*2.6} 0 0 1 ${42-t*2.6} 38" fill="none" stroke="${e}" stroke-width="3"/>`).join("")}<path d="M4 38 H44" ${C(3)}/></svg>`,p9=`<svg viewBox="0 0 48 48"><path d="M10 34 Q24 22 38 34" fill="none" ${C(4)}/><path d="M24 30 V8 M16 16 L24 8 L32 16" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40 H40" ${C(4)}/></svg>`,h9=`<svg viewBox="0 0 200 320"><path d="M70 310 L84 120 H116 L130 310 Z" fill="#fff6e6" ${C(4)}/><path d="M78 200 H122 M74 260 H126" ${C(3)}/><rect x="88" y="262" width="24" height="48" rx="10" fill="#b197fc" ${C(3)}/>
  <path d="M78 124 L100 92 L122 124 Z" fill="#ff8fab" ${C(4)}/>
  <g class="sails" style="transform-origin:100px 110px">${[0,90,180,270].map(e=>`<g transform="rotate(${e} 100 110)"><path d="M100 110 L104 30 L126 30 L118 104 Z" fill="${["#ffd43b","#74c0fc","#ff8fab","#69db7c"][e/90]}" ${C(3)}/><path d="M108 40 H122 M107 58 H121 M106 76 H120" ${C(2)}/></g>`).join("")}<circle cx="100" cy="110" r="10" fill="#ffa94d" ${C(3)}/></g></svg>`,g9=["GOAT","SHEEP","PIGLET","CHICKS","BUNNY","COW"],u9=e=>`<g class="lantern" style="transform-origin:${e}px 146px"><path d="M${e} 146 V178" ${C(3)}/><circle cx="${e}" cy="204" r="34" fill="#fff3b0" opacity=".45"/>
  <path d="M${e-14} 182 H${e+14} L${e+11} 226 H${e-11} Z" fill="#ffe066" ${C(3)}/><rect x="${e-17}" y="176" width="34" height="8" rx="3" fill="#495057" ${C(2.5)}/><rect x="${e-15}" y="224" width="30" height="7" rx="3" fill="#495057" ${C(2.5)}/><ellipse cx="${e}" cy="205" rx="5" ry="9" fill="#ff922b"/></g>`;function m9(){const e=td,t=Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64} 146 V440" stroke="#d4895f" stroke-width="3"/>`).join(""),n=Array.from({length:Math.ceil(e/46)},(o,i)=>{const a=i*46,r=160+Math.sin(i/3.1)*8;return`<path d="M${a} ${r} L${a+40} ${r} L${a+20} ${r+30} Z" fill="${nn[i%6]}" ${C(2.5)}/>`}).join(""),s=nd.map((o,i)=>`<g><rect x="${o-96}" y="318" width="192" height="122" rx="6" fill="#f0c49a" ${C(4)}/>
    <path d="M${o-96} 350 H${o+96} M${o-96} 384 H${o+96} M${o-96} 412 H${o+96}" stroke="#d9a074" stroke-width="3"/><path d="M${o-96} 318 L${o+96} 440 M${o+96} 318 L${o-96} 440" stroke="#e0aa7e" stroke-width="7" opacity=".7"/>
    <rect x="${o-54}" y="284" width="108" height="30" rx="10" fill="#fff6e6" ${C(3)}/><text x="${o}" y="305" text-anchor="middle" font-size="17" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">${g9[i]}</text></g>`).join("");return`<svg class="parkScene ranchScene barnScene" viewBox="0 0 ${e} ${Gi}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="440" fill="#e8a87c"/>${t}
  <!-- hay loft -->
  <rect width="${e}" height="128" fill="#c98a5e"/>${Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64+32} 0 V128" stroke="#b5764d" stroke-width="3"/>`).join("")}
  ${[120,260,420,980,1130,1290,1640,1790].map((o,i)=>Sn(o,126,i%3===1?.72:.85)).join("")}${[190,1060,1720].map(o=>Sn(o,82,.7)).join("")}
  <rect x="0" y="126" width="${e}" height="24" fill="#a8653a" ${C(4)}/>
  ${[0,1,2,3,4,5,6].map(o=>`<path d="M${120+o*280} 150 L${180+o*280} 210" stroke="#a8653a" stroke-width="12" stroke-linecap="round"/><path d="M${120+o*280} 150 L${180+o*280} 210" ${C(2)}/>`).join("")}
  <!-- ladder up to the loft -->
  <g transform="translate(1840 0)"><path d="M-22 150 L-30 440 M22 150 L30 440" stroke="#c99366" stroke-width="10" stroke-linecap="round"/>${[190,240,290,340,390].map(o=>`<path d="M${-22-(o-150)*.028} ${o} H${22+(o-150)*.028}" stroke="#c99366" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
  <!-- rainbow bunting + big rainbow banner -->
  <path d="M0 160 Q${e/2} 176 ${e} 160" fill="none" ${C(2)}/>${n}
  <g transform="translate(${e/2+60} 236)">${nn.map((o,i)=>`<rect x="${-180+i*60}" y="-26" width="60" height="44" fill="${o}"/>`).join("")}<rect x="-180" y="-26" width="360" height="44" rx="4" fill="none" ${C(4)}/>
    <path d="M-180 -26 L-200 -4 L-180 18 M180 -26 L200 -4 L180 18" fill="#ff8fab" ${C(3)}/>
    <text x="0" y="6" text-anchor="middle" font-size="26" font-weight="900" fill="#fff" stroke="${He}" stroke-width="5" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  <!-- round windows with daylight -->
  ${[440,1720].map(o=>`<circle cx="${o}" cy="236" r="34" fill="#c7e8ff" ${C(4)}/><path d="M${o-34} 236 H${o+34} M${o} 202 V270" ${C(3)}/>`).join("")}
  ${s}
  <!-- the big door (back outside) -->
  <rect x="24" y="200" width="206" height="244" rx="10" fill="#b5703f" ${C(4)}/>
  <rect x="38" y="214" width="178" height="230" fill="#c7e8ff"/><path d="M38 360 Q120 330 216 352 V444 H38 Z" fill="#a6e3a0"/><circle cx="180" cy="250" r="16" fill="#ffe066"/>
  <path d="M38 214 H216 V444 M38 214 V444" fill="none" ${C(4)}/>
  <!-- straw floor -->
  <rect x="0" y="438" width="${e}" height="162" fill="#f2d58a"/><path d="M0 440 H${e}" ${C(4)}/>
  ${Array.from({length:70},(o,i)=>{const a=i*137%e,r=470+i*53%120;return`<path d="M${a} ${r} l${14+i%3*4} ${i%2?-4:4}" stroke="#d9a93f" stroke-width="3" stroke-linecap="round"/>`}).join("")}
  <!-- feed station -->
  <g transform="translate(356 0)"><rect x="-70" y="456" width="140" height="34" rx="12" fill="#fff6e6" ${C(3)}/><text x="0" y="480" text-anchor="middle" font-size="16" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">FOOD 🥕🍎🌾</text></g>
  ${Sn(1790,590,.8)}${Sn(1700,600,.65)}
  ${[290,660,1330,1590].map(u9).join("")}
  </svg>`}const So=600,Zt="#5a3d5c",ae=(e=4)=>`stroke="${Zt}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function Yi(e){const t=qs[e].seats,n=t<=2?140:t===4?110:100,s=(t-1)/2;return Array.from({length:t},(o,i)=>({x:qs[e].x+(i-s)*n,y:558-Math.abs(i-s)*8}))}const Pp=["#ff7eb3","#ffd43b","#66d9e8","#d0bfff","#fff"],Yt=(e,t,n=1,s="#fff")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -9 L2.2 -2.4 L9 -2.2 L3.4 2.2 L5.4 9 L0 4.6 L-5.4 9 L-3.4 2.2 L-9 -2.2 L-2.2 -2.4 Z" fill="${s}" stroke="${Zt}" stroke-width="1.2" stroke-linejoin="round"/>`;function Tc(e,t,n,s){const o=`<path d="M36 ${t} Q ${e/2} ${t+n+8} ${e-36} ${t}" fill="none" stroke="${Zt}" stroke-width="3"/>`,i=Array.from({length:s},(a,r)=>{const l=s===1?.5:r/(s-1),c=48+l*(e-96),d=t+Math.sin(l*Math.PI)*n,f=Pp[r%Pp.length];return`<g class="bulb" style="animation-delay:-${r%8*.22}s"><line x1="${c}" y1="${d-16}" x2="${c}" y2="${d-6}" stroke="${Zt}" stroke-width="2"/><circle cx="${c}" cy="${d}" r="7.5" fill="${f}" ${ae(2)}/><circle cx="${c-2}" cy="${d-2}" r="2.2" fill="#fff" opacity=".85"/></g>`}).join("");return o+i}const Jo=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">
  <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".12"/>
  <path d="M-40 10 Q-48 -22 -10 -28 Q10 -46 34 -18 Q50 2 34 18 Q8 32 -24 20 Q-42 16 -40 10 Z" fill="${n}" ${ae(3)}/>
  <path d="M-18 -6 Q-4 -20 14 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <circle cx="16" cy="6" r="4" fill="#fff" opacity=".35"/>
</g>`,Tp=(e,t,n)=>`<g transform="translate(${e} ${t})">
  <ellipse cx="0" cy="16" rx="28" ry="9" fill="#000" opacity=".12"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="${n}" ${ae(3)}/>
  <ellipse cx="-6" cy="-2" rx="12" ry="7" fill="#fff" opacity=".35"/>
  <path d="M0 -16 V-28" ${ae(3)}/><circle cy="-32" r="6" fill="#ffd43b" ${ae(2)}/>
</g>`;function ei(e,t,n,s,o,i=""){return`<g class="photoFrame${i}" transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-40" y="-52" width="80" height="104" rx="6" fill="#fff" ${ae(3.5)}/>
    <rect x="-32" y="-44" width="64" height="72" rx="4" fill="${s}"/>
    ${o}
    <rect x="-10" y="-58" width="20" height="10" rx="2" fill="#ffe8a3" opacity=".85" transform="rotate(-8)"/>
  </g>`}function ua(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-28" y="-34" width="56" height="68" rx="3" fill="#fff" ${ae(3)}/>
    <rect x="-22" y="-28" width="44" height="40" fill="${s}"/>
    ${o}
  </g>`}function ma(e,t,n,s){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="36" rx="26" ry="8" fill="#000" opacity=".12"/>
    <path d="M-18 36 L-12 -2 H12 L18 36 Z" fill="${n}" ${ae(3)}/>
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c9a27a" ${ae(2)}/>
    <ellipse cx="-16" cy="-16" rx="16" ry="22" fill="${s}" ${ae(3)} transform="rotate(-18)"/>
    <ellipse cx="16" cy="-18" rx="16" ry="22" fill="${s}" ${ae(3)} transform="rotate(16)"/>
    <ellipse cx="0" cy="-28" rx="14" ry="20" fill="${s}" ${ae(3)}/>
    <circle cx="0" cy="-36" r="6" fill="#ff8ec8" ${ae(2)}/>
  </g>`}function y9(e,t){return`<g transform="translate(${e} ${t})">
    <ellipse cx="28" cy="118" rx="32" ry="8" fill="#000" opacity=".12"/>
    <rect width="56" height="118" rx="10" fill="#e7fbff" ${ae()}/>
    <rect y="52" width="56" height="8" fill="#d0f4ff" ${ae(2)}/>
    <rect x="44" y="18" width="6" height="22" rx="3" fill="#ffd43b" ${ae(2)}/>
    <rect x="44" y="70" width="6" height="28" rx="3" fill="#ffd43b" ${ae(2)}/>
    <rect x="8" y="12" width="28" height="22" rx="4" fill="#fff" ${ae(2)}/>
    <circle cx="16" cy="22" r="4" fill="#ff8ec8"/><circle cx="28" cy="24" r="3" fill="#ffd43b"/>
    <path d="M18 78 C14 72 8 74 12 82 C15 88 18 90 18 90 C18 90 21 88 24 82 C28 74 22 72 18 78 Z" fill="#ff4d94" ${ae(1.5)}/>
  </g>`}function b9(e,t,n){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="6" rx="34" ry="9" fill="#000" opacity=".1"/>
    <path d="M-46 -16 C-50 -86 -26 -108 0 -110 C26 -108 50 -86 46 -16 Z" fill="#fff6fb" ${ae()}/>
    <path d="M-32 -20 C-34 -74 -16 -90 0 -92 C16 -90 34 -74 32 -20 Z" fill="${n}"/>
    <ellipse cx="0" cy="-10" rx="40" ry="16" fill="${n}" ${ae()}/>
    <ellipse cx="-8" cy="-16" rx="14" ry="6" fill="#fff" opacity=".4"/>
    <path d="M-22 -2 L-26 16 M22 -2 L26 16" fill="none" stroke="${Zt}" stroke-width="4" stroke-linecap="round"/>
  </g>`}function k9(e){const t=qs[e],n=t.game==="four"?"Four":"Slay",s=t.game==="four"?"#7ad7ea":e===0?"#ff8ec8":"#e0b0ff",o=t.game==="four"?"#b8f2ff":e===0?"#ffd0e6":"#ead9ff",i=t.seats>=6?250:t.seats>=4?200:150;return`${Yi(e).map(r=>b9(r.x,r.y,o)).join("")}
  <g transform="translate(${t.x} 500)">
    <ellipse cx="0" cy="28" rx="${i+18}" ry="20" fill="#000" opacity=".1"/>
    <rect x="-18" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${ae(3)}/>
    <rect x="4" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${ae(3)}/>
    <ellipse cx="0" cy="-4" rx="${i}" ry="30" fill="${s}" stroke="#ffd43b" stroke-width="6"/>
    <ellipse cx="0" cy="-4" rx="${i-16}" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <ellipse cx="${-i*.25}" cy="-12" rx="${i*.35}" ry="8" fill="#fff" opacity=".28"/>
    <text x="0" y="4" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="${Zt}" stroke-width="4" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${n}</text>
  </g>`}const ti=(e,t,n=1,s="#ff4d94")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 4 C-6 -4 -14 -2 -10 6 C-7 12 0 16 0 16 C0 16 7 12 10 6 C14 -2 6 -4 0 4 Z" fill="${s}" stroke="${Zt}" stroke-width="1.6" stroke-linejoin="round"/>`;function Rp(e,t){const n=qi,s=Math.max(1,Math.ceil(t));let o="";if(e==="top"){o=`<rect width="${n}" height="${s}" fill="#ffe0f2"/>`;for(let i=s-70,a=0;i>24;i-=150,a++)o+=Tc(n,i,a%2?22:16,a%2?26:20);for(let i=0;i<14;i++){const a=90+i*397%(n-180),r=20+i*131%Math.max(20,s-70);o+=Yt(a,r,.55+i%3*.2,i%2?"#fff":"#ffd43b")}}else{o=`<defs><linearGradient id="grFloorExt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e089ab"/><stop offset="1" stop-color="#d27399"/></linearGradient></defs>
  <rect width="${n}" height="${s}" fill="url(#grFloorExt)"/>`;for(let i=46;i<s;i+=64)o+=`<rect y="${i}" width="${n}" height="3" fill="#fff" opacity=".18"/>`}return`<svg class="grExt grExt-${e}" viewBox="0 0 ${n} ${s}" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${o}</svg>`}function w9(){const e=qi,t=[[120,200],[260,250],[640,210],[900,250],[1180,190],[1560,230],[1860,180],[2100,240],[2420,200],[2520,280]];return`<svg class="grScene" viewBox="0 0 ${e} ${So}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="${e}" height="${So}" fill="url(#grWall)"/>
  <rect y="390" width="${e}" height="80" fill="#fff6fb" opacity=".45"/>
  ${Array.from({length:8},(n,s)=>`<rect x="${40+s*330}" y="400" width="280" height="62" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`).join("")}
  <rect y="468" width="${e}" height="132" fill="url(#grFloor)"/>
  <rect y="464" width="${e}" height="12" fill="#ffd43b" ${ae(3)}/>
  ${[720,1500,2150].map((n,s)=>`<ellipse cx="${n}" cy="548" rx="${s===1?210:280}" ry="42" fill="${s===1?"#d8f6ff":s===0?"#ffe0f0":"#f3e8ff"}" stroke="#fff" stroke-width="4" opacity=".8"/>`).join("")}
  ${Tc(e,28,22,28)}
  ${Tc(e,78,16,18)}
  ${t.map(([n,s],o)=>Yt(n,s,.7+o%3*.28,o%2?"#fff":"#ffd43b")).join("")}

  <g transform="translate(1180 70)">
    <rect x="20" y="20" width="220" height="150" rx="16" fill="url(#grSky)" ${ae()}/>
    <path d="M20 70 H240 M130 20 V170" ${ae(3)}/>
    <circle cx="78" cy="48" r="14" fill="#ffd43b" ${ae(2)}/>
    <path d="M8 36 Q20 90 8 150" fill="#ff8ec8" ${ae(3)}/><path d="M252 36 Q240 90 252 150" fill="#d0bfff" ${ae(3)}/>
  </g>

  <g class="neonSign" transform="translate(560 168)">
    <g class="neonSignArt">
    <rect x="-228" y="-58" width="456" height="108" rx="28" fill="#2b1430" ${ae(5)}/>
    <rect class="neonRing" x="-214" y="-44" width="428" height="80" rx="22" fill="none" stroke="#ff4d94" stroke-width="4"/>
    <path d="M-150 8 C-162 -14 -186 -8 -174 12 C-166 26 -150 36 -150 36 C-150 36 -134 26 -126 12 C-114 -8 -138 -14 -150 8 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="2"/>
    <text x="6" y="16" text-anchor="middle" font-size="40" font-weight="900" fill="#ff7eb3" stroke="#fff6fb" stroke-width="2" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY CLUB</text>
    </g>
  </g>

  ${ei(500,340,-6,"#ffe0f0",`${ti(0,8,1.4)}${Yt(-18,-16,.7,"#ffd43b")}${Yt(18,-10,.55,"#66d9e8")}`," frameAtHead")}
  ${ei(270,196,-8,"#ffe0f0",`${ti(0,8,1.4)}${Yt(-18,-16,.7,"#ffd43b")}${Yt(18,-10,.55,"#66d9e8")}`," framePhone")}
  ${ei(980,240,5,"#e7fbff",`<ellipse cx="0" cy="6" rx="16" ry="12" fill="#fff" ${ae(2)}/><path d="M-6 6 Q0 -8 6 6" fill="none" stroke="${Zt}" stroke-width="2"/><path d="M0 18 V28 M-12 24 H12" ${ae(2)}/>`)}
  ${ei(1680,255,-4,"#fff3c4",`${Yt(0,2,1.5,"#ffd43b")}`)}
  ${ei(2360,245,6,"#f3e8ff",`${ti(0,4,1.3,"#d0bfff")}`)}
  ${ua(400,300,8,"#fff0f6",ti(0,-4,1.1))}
  ${ua(820,310,-7,"#e7fbff",Yt(0,-6,1,"#66d9e8"))}
  ${ua(1900,300,9,"#fff6e6",Yt(0,-6,1,"#ffd43b"))}
  ${ua(2280,320,-8,"#ffe0f0",ti(0,-4,1))}

  <g class="disco" transform="translate(1288 36)">
    <line y1="0" y2="22" stroke="${Zt}" stroke-width="3"/>
    <circle cy="44" r="26" fill="url(#disco)" ${ae(3)}/>
    <path d="M-14 36 L0 56 L14 36 M-8 48 H8" fill="none" stroke="#fff" stroke-width="2.5"/>
    ${Yt(-30,20,.45)}${Yt(32,28,.4,"#ffd43b")}
  </g>

  <g transform="translate(86 292)">
    <rect width="78" height="168" rx="12" fill="#ff8ec8" ${ae()}/>
    <rect x="8" y="10" width="62" height="36" rx="8" fill="#fff6e6" ${ae(2)}/>
    <text x="39" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="${Zt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
    <circle cx="62" cy="96" r="5" fill="#ffd43b" ${ae(2)}/>
    <rect x="22" y="118" width="34" height="8" rx="3" fill="#fff" opacity=".45"/>
  </g>

  ${ma(40,400,"#ffd43b","#8ce99a")}
  ${ma(1080,392,"#ff8ec8","#69db7c")}
  ${ma(1600,400,"#d0bfff","#8ce99a")}
  ${ma(2520,396,"#66d9e8","#69db7c")}
  ${y9(200,348)}
  <g transform="translate(2420 360)">
    <rect width="130" height="100" rx="14" fill="#fff6fb" ${ae()}/>
    <rect y="28" width="130" height="10" fill="#ffd0e6" ${ae(2)}/>
    <circle cx="28" cy="64" r="12" fill="#ffd43b" ${ae(2)}/><circle cx="64" cy="66" r="10" fill="#ff8ec8" ${ae(2)}/><rect x="86" y="52" width="28" height="22" rx="6" fill="#66d9e8" ${ae(2)}/>
    <text x="65" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="${Zt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">SNACKS</text>
  </g>

  ${Jo(330,455,"#ff8ec8",1.05)}
  ${Jo(1120,468,"#d0bfff")}
  ${Jo(1360,470,"#8ce4f2",.9)}
  ${Jo(1780,462,"#ffd43b")}
  ${Tp(1480,500,"#ffb3d9")}
  ${Tp(2e3,505,"#c9b3ff")}
  ${Jo(2550,468,"#ff8ec8",.85)}

  ${qs.map((n,s)=>k9(s)).join("")}
  </svg>`}const v9=`<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${Zt}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`,V="#5a3d5c",_9=`<svg viewBox="0 0 120 100"><rect x="0" y="62" width="120" height="38" rx="14" fill="#9fe0aa" stroke="${V}" stroke-width="3"/>
  <path d="M18 70 L30 22 L42 70 M78 70 L90 22 L102 70" fill="none" stroke="#8ecae6" stroke-width="5" stroke-linecap="round"/><path d="M26 22 H94" stroke="#ff8fab" stroke-width="7" stroke-linecap="round"/>
  <path d="M50 22 V54 M66 22 V54" stroke="${V}" stroke-width="2.5"/><rect x="45" y="52" width="26" height="7" rx="3" fill="#ff9f68" stroke="${V}" stroke-width="2.5"/>
  <circle cx="104" cy="14" r="9" fill="#ffd166" stroke="${V}" stroke-width="3"/></svg>`,Og=`<svg viewBox="0 0 120 100"><path d="M20 50 L60 16 L100 50" fill="#ff8fab" stroke="${V}" stroke-width="4" stroke-linejoin="round"/><rect x="28" y="48" width="64" height="44" rx="6" fill="#fff6e6" stroke="${V}" stroke-width="4"/>
  <rect x="52" y="64" width="16" height="28" rx="4" fill="#c9a0dc" stroke="${V}" stroke-width="3"/><rect x="34" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${V}" stroke-width="3"/><rect x="73" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${V}" stroke-width="3"/></svg>`,Rd=`<svg viewBox="0 0 120 100"><path d="M40 18 L24 28 L14 46 L30 52 L34 44 V88 H86 V44 L90 52 L106 46 L96 28 L80 18 Q60 34 40 18 Z" fill="#8ecae6" stroke="${V}" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="58" r="7" fill="#fff3b0" stroke="${V}" stroke-width="3"/></svg>`,me=e=>`<div class="wnArt">${e}</div>`,Wg=`<svg viewBox="0 0 120 100"><rect x="16" y="58" width="74" height="24" rx="10" fill="#fff" stroke="${V}" stroke-width="4"/><circle cx="32" cy="70" r="7" fill="#ff8fab" stroke="${V}" stroke-width="3"/><circle cx="52" cy="70" r="7" fill="#ffe066" stroke="${V}" stroke-width="3"/><circle cx="72" cy="70" r="7" fill="#8ecae6" stroke="${V}" stroke-width="3"/><path d="M86 46 l14 -16 8 8 -14 16z" fill="#ffd166" stroke="${V}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="44" width="12" height="24" rx="4" fill="#c9a0dc" stroke="${V}" stroke-width="3"/></svg>`,$9=`<svg viewBox="0 0 120 100">${nn.map((e,t)=>`<path d="M${12+t*6} 84 A${48-t*6} ${48-t*6} 0 0 1 ${108-t*6} 84" fill="none" stroke="${e}" stroke-width="6"/>`).join("")}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${V}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${V}" stroke-width="3"/></svg>`,x9=`<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${Bi.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g><g transform="translate(52 22) scale(1.4)">${Bi.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g></svg>`,Rc=(e,t,n,s)=>`<g transform="translate(${t} ${n}) scale(${s})">${e.replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"")}</g>`,M9=`<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${V}" stroke-width="4"/>${Rc(Kc(kt({skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6"})).replace('viewBox="14 2 72 74"','viewBox="0 0 100 160"'),26,12,.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`,L9=`<svg viewBox="0 0 120 100"><rect x="8" y="28" width="104" height="64" rx="16" fill="#fff0f6" stroke="${V}" stroke-width="4"/><path d="M8 40 L60 12 L112 40" fill="#ff6b9a" stroke="${V}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 58 C52 48 40 50 46 60 C50 68 60 74 60 74 C60 74 70 68 74 60 C80 50 68 48 60 58 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  ${[18,34,50,66,82,98].map((e,t)=>`<circle cx="${e}" cy="24" r="4" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" stroke="${V}" stroke-width="1.5"/>`).join("")}</svg>`,E9=`<svg viewBox="0 0 120 100"><rect x="28" y="8" width="64" height="84" rx="12" fill="#fff" stroke="${V}" stroke-width="4"/><rect x="28" y="8" width="64" height="84" rx="12" fill="none" stroke="#ff7eb3" stroke-width="6"/><path d="M48 36 L54 24 L60 34 L68 20 L76 34 L82 24 L88 36 Z" fill="#ffd43b" stroke="${V}" stroke-width="2" stroke-linejoin="round"/><text x="60" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#ff4d94" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY</text></svg>`,C9=`<svg viewBox="0 0 120 100"><rect x="10" y="16" width="100" height="72" rx="14" fill="#fff6fb" stroke="${V}" stroke-width="4"/>
  <path d="M36 58 C28 48 18 50 24 60 C28 68 36 74 36 74 C36 74 44 68 48 60 C54 50 44 48 36 58 Z" fill="#ff4d94" stroke="${V}" stroke-width="2"/>
  <path d="M78 28 L82 40 H94 L84 48 L88 60 L78 52 L68 60 L72 48 L62 40 H74 Z" fill="#66d9e8" stroke="${V}" stroke-width="2"/></svg>`,Ug=`<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="22" rx="6" fill="#fff" stroke="${V}" stroke-width="3"/><path d="M6 26 H42 M14 18 V40 M22 18 V40 M30 18 V40 M36 18 V40" stroke="${V}" stroke-width="2.4"/><rect x="4" y="12" width="40" height="8" rx="4" fill="#9ad7f5" stroke="${V}" stroke-width="3"/><ellipse cx="20" cy="32" rx="5" ry="3" fill="#ffe0ec"/><ellipse cx="30" cy="32" rx="5" ry="3" fill="#c9e7ff"/></svg>`,S9=`<svg viewBox="0 0 120 100"><ellipse cx="60" cy="72" rx="50" ry="20" fill="#ffc2d4" stroke="${V}" stroke-width="4"/><ellipse cx="60" cy="72" rx="32" ry="11" fill="#fff" stroke="${V}" stroke-width="3"/><path d="M60 58 C50 46 36 48 42 60 C48 70 60 78 60 78 C60 78 72 70 78 60 C84 48 70 46 60 58 Z" fill="#ff4d94" stroke="${V}" stroke-width="3"/><path d="M22 40 Q28 28 36 36" fill="none" stroke="#7dce8a" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="5" fill="#ffd166" stroke="${V}" stroke-width="2"/></svg>`,P9=`<svg viewBox="0 0 120 100"><path d="M16 50 L60 14 L104 50" fill="#ff8fab" stroke="${V}" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="48" width="68" height="40" rx="10" fill="#fff6ea" stroke="${V}" stroke-width="4"/><path d="M42 88 V60 Q60 44 78 60 V88" fill="#ffe8c7" stroke="${V}" stroke-width="3"/><circle cx="82" cy="64" r="7" fill="#bde0fe" stroke="${V}" stroke-width="3"/><circle cx="80" cy="62" r="2" fill="#fff"/></svg>`,T9=`<svg viewBox="0 0 120 100"><rect x="28" y="38" width="64" height="42" rx="8" fill="#8ecae6" stroke="${V}" stroke-width="4"/><path d="M28 44 L60 68 L92 44" fill="none" stroke="${V}" stroke-width="4"/><path d="M76 30 V16" stroke="${V}" stroke-width="4" stroke-linecap="round"/><path d="M76 16 H96 L90 23 L96 30 H76 Z" fill="#ff6b6b" stroke="${V}" stroke-width="3"/></svg>`,R9=`<svg viewBox="0 0 120 100"><rect x="8" y="32" width="48" height="40" rx="14" fill="#fff3b0" stroke="${V}" stroke-width="4"/><rect x="64" y="32" width="48" height="40" rx="14" fill="#fff" stroke="${V}" stroke-width="4"/><path d="M26 44 L40 52 L26 60 Z" fill="${V}"/><circle cx="88" cy="52" r="6" fill="#ff8fab" stroke="${V}" stroke-width="3"/></svg>`,B9=`<svg viewBox="0 0 120 100"><rect x="16" y="18" width="36" height="58" rx="6" fill="#fff" stroke="${V}" stroke-width="4"/><rect x="62" y="24" width="42" height="52" rx="6" fill="#e7f6ff" stroke="${V}" stroke-width="4"/><circle cx="34" cy="66" r="2.4" fill="${V}"/><circle cx="83" cy="66" r="2.4" fill="${V}"/></svg>`,Vg=`<svg viewBox="0 0 120 100"><rect x="28" y="16" width="64" height="72" rx="16" fill="#fff" stroke="${V}" stroke-width="4"/><path d="M40 36 H80 M40 52 H80 M40 68 H80" fill="none" stroke="${V}" stroke-width="5" stroke-linecap="round"/><circle cx="92" cy="24" r="12" fill="#ff6b9a" stroke="${V}" stroke-width="3"/><text x="92" y="29" text-anchor="middle" font-size="14" font-weight="900" fill="#fff" font-family="Nunito, ui-rounded, system-ui, sans-serif">1</text></svg>`,A9=`<svg viewBox="0 0 120 100"><rect x="6" y="10" width="108" height="80" rx="18" fill="#2a2158" stroke="${V}" stroke-width="4"/><circle cx="34" cy="42" r="14" fill="#ffd166" stroke="${V}" stroke-width="3"/><path d="M78 28 a16 16 0 1 0 0 32 a12 12 0 1 1 0 -32z" fill="#fff6e4" stroke="${V}" stroke-width="3"/><circle cx="92" cy="30" r="2" fill="#fff"/><circle cx="70" cy="24" r="1.6" fill="#fff"/><circle cx="100" cy="48" r="1.6" fill="#fff"/></svg>`,D9=`<svg viewBox="0 0 120 100"><circle cx="60" cy="52" r="34" fill="#fff6e4" stroke="${V}" stroke-width="4"/><path d="M60 52 V32 M60 52 L76 60" stroke="${V}" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="52" r="3" fill="${V}"/><path d="M28 22 l4 6 M92 22 l-4 6" stroke="#ffb15c" stroke-width="4" stroke-linecap="round"/></svg>`,Qg=`<svg viewBox="0 0 120 100"><path d="M60 18 L72 46 H96 L78 62 L84 90 L60 74 L36 90 L42 62 L24 46 H48 Z" fill="#ffd166" stroke="${V}" stroke-width="4" stroke-linejoin="round"/><path d="M60 48 L28 92 H92 Z" fill="#2f6b4f" stroke="${V}" stroke-width="4" stroke-linejoin="round"/><rect x="52" y="88" width="16" height="8" rx="2" fill="#c44558" stroke="${V}" stroke-width="3"/></svg>`,zg=[{v:10,title:"Winter Cheer!",lines:[{art:me(Qg),text:"The <b>Winter Cheer</b> pack is in your drawer!"}]},{v:9,title:"Everything's tidied into the Menu!",lines:[{art:me(Vg),text:"Everything's tidied into the <b>Menu</b>!"},{art:me(A9),text:"The world follows the <b>clock</b>: morning, day, golden evening, and night."},{art:me(D9),text:"Tap the <b>sun</b> and the <b>moon</b>. <b>Auto</b> follows the clock."}]},{v:8,title:"Make your look!",lines:[{art:me(T9),text:"Leave a <b>letter</b> in a friend's mailbox!"},{art:me(R9),text:"Tap <b>Play</b> or <b>Decorate</b>!"},{art:me(Rd),text:"<b>Make your look!</b> New hair, clothes, and colors."},{art:me(B9),text:"Update every iPad to see the <b>new outfits</b>!"}]},{v:7,title:"New Nursery!",lines:[{art:me(Ug),text:"A new <b>Nursery</b> room, with a <b>crib</b> and a rocker!"},{art:me(S9),text:"The <b>Cozy Cottage</b> furniture pack is in your drawer!"},{art:me(P9),text:"A <b>dog kennel</b> and a <b>cat tower</b> for your pets!"}]},{v:6,title:"The clubhouse is open!",lines:[{art:me(L9),text:"A glam <b>clubhouse</b> on the map!"},{art:me(E9),text:"Play <b>Slay</b> with friends at a table!"},{art:me(C9),text:"Line up <b>hearts</b> or <b>stars</b>!"}]},{v:5,title:"Your house looks even cozier!",lines:[{art:me(Wg),text:"Wallpaper and floors show their <b>real patterns</b> when you paint!"},{art:me(Lo(0,"sit")),text:"Your cat is <b>big and cozy</b>, just like the toy cat."},{art:me(Og),text:"Tap <b>home</b> to come back from the map, the park, or the ranch."}]},{v:4,title:"A map of our neighborhood!",lines:[{art:me(Yc),text:"Tap the <b>map</b> to go anywhere!"},{art:me(M9),text:"Tap a friend's face to <b>find her</b>."},{art:me(Pc(0)),text:"The petting zoo is inside the <b>barn</b> now!"}]},{v:3,title:"Rainbow Ranch is open!",lines:[{art:me($9),text:"Visit <b>Rainbow Ranch</b>!"},{art:me(Pc(1)),text:"Pet and feed animals at the <b>petting zoo</b>."},{art:me(`<svg viewBox="0 0 160 130">${Rc(Pd(4),0,0,1)}</svg>`),text:"Ride <b>horses</b> and the <b>rainbow pony</b>!"},{art:me(x9),text:"Collect <b>eggs</b> from the hens."},{art:me(`<svg viewBox="0 0 70 90">${Rc(Hg({seed:"carrot",wet:1},3,0),0,0,1)}</svg>`),text:"Grow carrots and flowers in the <b>garden</b>."}]},{v:2,title:"What's new!",lines:[{art:me(_9),text:"A new <b>park</b>! Swing, slide and splash with friends."},{art:me(Lo(3,"sit")),text:"Adopt a <b>cat</b>! She lives in your house."},{art:me(Pi(3,"stand")),text:"Adopt a <b>dog</b>! Take it to the park to play fetch."}]}],qg=zg[0].v,Zg={v:qg,title:"Welcome to your cozy house!",lines:[{art:me(Og),text:"Drag furniture into your rooms."},{art:me(Rd),text:"Dress up your friends."},{art:me(Lo(0,"sit")),text:"Adopt a pet from the Menu ☰!"}]},Ng=Wt("cozy-whatsnew"),I9=1;function H9(){try{const e=Number(localStorage.getItem(Ng)),t=["cozy-house","cozy-house-v1","cozy-hood"].some(o=>localStorage.getItem(Wt(o))!==null);if(!e&&!t)return{kind:"welcome",entries:[Zg]};const n=e||I9,s=zg.filter(o=>o.v>n).slice(0,3);return s.length?{kind:"news",entries:s}:{kind:"none",entries:[]}}catch{return{kind:"none",entries:[]}}}function O9(){try{localStorage.setItem(Ng,String(qg))}catch{}}function W9(e,t){const n=e==="welcome"?Zg.title:t[0].title,s=t.flatMap(o=>o.lines).slice(0,5);return`<div class="wnBadge">${e==="welcome"?tg:t[0].v>=10?Qg:t[0].v>=9?Vg:t[0].v>=8?Rd:t[0].v>=7?Ug:t[0].v>=6?v9:t[0].v>=5?Wg:t[0].v>=4?Yc:t[0].v>=3?f9:By}</div>
    <h2 class="wnTitle">${n}</h2>
    <div class="wnList ${s.length>3?"many":""}">${s.map((o,i)=>`<div class="wnLine" style="animation-delay:${.15+i*.18}s">${o.art}<p>${o.text}</p></div>`).join("")}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`}const Fg="cozy-sky",Bc={tint:"#fff6e4",body:"#ffe9f0",pageA:"#ffe0ec",pageB:"#e6ddff",spot:"#fff6fa",fieldA:"#c9f2c7",fieldB:"#8fd18a",win:"#a2d2ff",win2:"#b9e3ff",house:"#fff3b0",mapTint:"#ffffff"},Bp={tint:"#e7b4cc",body:"#f6dce8",pageA:"#ffd0e6",pageB:"#e6d2f8",spot:"#fff0f6",fieldA:"#f6d0e2",fieldB:"#dcc8f0",win:"#f6c6de",win2:"#e4d0f8",house:"#ffe0ee",mapTint:"#f3c4dc"},Ap={tint:"#ffb38a",body:"#ffe4dc",pageA:"#ffe0d6",pageB:"#f0d8ea",spot:"#fff6ee",fieldA:"#d4eec4",fieldB:"#a3cb8a",win:"#ffc48a",win2:"#ffd4b0",house:"#ffc56a",mapTint:"#ffb38a"},go={tint:"#2a2350",body:"#14182c",pageA:"#1c1748",pageB:"#101832",spot:"#2c2458",fieldA:"#1a2458",fieldB:"#0c1028",win:"#1a245c",win2:"#12183a",house:"#ffe9a0",mapTint:"#102044"},ya=[{m:0,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...go},{m:5*60,opacity:.7,map:.78,glow:.95,stars:.95,glass:1,phase:"night",...go},{m:5*60+35,opacity:.42,map:.34,glow:.55,stars:.42,glass:.8,phase:"dawn",...Bp},{m:6*60+25,opacity:.14,map:.16,glow:.28,stars:.08,glass:.9,phase:"dawn",...Bp},{m:7*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...Bc},{m:16*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...Bc},{m:17*60+5,opacity:.08,map:.1,glow:.4,stars:.02,glass:.55,phase:"golden",...Ap},{m:18*60+10,opacity:.18,map:.2,glow:.62,stars:.06,glass:.82,phase:"golden",...Ap},{m:19*60+5,opacity:.52,map:.68,glow:.9,stars:.55,glass:1,phase:"night",...go},{m:20*60+10,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...go},{m:24*60,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...go}],U9={phase:"day",opacity:0,map:0,glow:0,stars:0,glass:0,...Bc},V9={phase:"night",opacity:.7,map:.78,glow:1,stars:1,glass:1,...go};function Dp(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function Gt(e,t,n){const s=Dp(e),o=Dp(t),i=a=>Math.round(s[a]+(o[a]-s[a])*n).toString(16).padStart(2,"0");return"#"+i(0)+i(1)+i(2)}const ni=(e,t,n)=>e+(t-e)*n;function Q9(e){const t=e.getHours()*60+e.getMinutes()+e.getSeconds()/60;let n=0;for(;n<ya.length-2&&t>=ya[n+1].m;)n++;const s=ya[n],o=ya[n+1],i=Math.max(1,o.m-s.m),a=Math.max(0,Math.min(1,(t-s.m)/i));return{phase:a<.5?s.phase:o.phase,opacity:ni(s.opacity,o.opacity,a),map:ni(s.map,o.map,a),glow:ni(s.glow,o.glow,a),stars:ni(s.stars,o.stars,a),glass:ni(s.glass,o.glass,a),tint:Gt(s.tint,o.tint,a),body:Gt(s.body,o.body,a),pageA:Gt(s.pageA,o.pageA,a),pageB:Gt(s.pageB,o.pageB,a),spot:Gt(s.spot,o.spot,a),fieldA:Gt(s.fieldA,o.fieldA,a),fieldB:Gt(s.fieldB,o.fieldB,a),win:Gt(s.win,o.win,a),win2:Gt(s.win2,o.win2,a),house:Gt(s.house,o.house,a),mapTint:Gt(s.mapTint,o.mapTint,a)}}function Ip(e,t){return t==="day"?U9:t==="night"?V9:Q9(e)}function z9(e){return e==="day"||e==="night"||e==="auto"}function q9(e,t=!1){return t?!0:e==="lamp"||e==="window"||e==="stars"||e==="tv"||/lamp|light|lantern|candle|string-lights|night-light/i.test(e)}function Hp(){try{if(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches)return!0}catch{}if(typeof navigator>"u")return!1;const e=navigator.hardwareConcurrency;if(typeof e=="number"&&e>0&&e<=2)return!0;const t=navigator.deviceMemory;return typeof t=="number"&&t>0&&t<=2}const Op={day:"night",night:"auto",auto:"day"},Wp={day:"Day",night:"Night",auto:"Auto"},jg='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><g fill="none" stroke="#ffb15c" stroke-width="3" stroke-linecap="round"><path d="M24 7 V13 M24 35 V41 M7 24 H13 M35 24 H41 M12 12 L16 16 M32 32 L36 36 M36 12 L32 16 M16 32 L12 36"/></g></svg>',Z9='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 8 a14 14 0 1 0 0 32 a11 11 0 1 1 0 -32z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="3"/><circle cx="14" cy="16" r="1.7" fill="#ffd166"/><circle cx="18" cy="28" r="1.2" fill="#fff"/><circle cx="11" cy="24" r="1" fill="#fff"/></svg>',N9='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="28" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M34 8 a9 9 0 1 0 0 18 a7 7 0 1 1 0 -18z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="14" cy="16" r="1.3" fill="#ffd166"/></svg>',F9={day:jg,night:Z9,auto:N9},j9="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)";function G9(){if(document.getElementById("skyInk"))return;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.id="skyInk",e.setAttribute("aria-hidden","true"),e.setAttribute("width","0"),e.setAttribute("height","0"),e.style.cssText="position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none",e.innerHTML=`
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
  `,document.head.appendChild(t)}function Y9(e){G9();const t=Hp();let n=X9(),s=null,o=Ip(new Date,n),i=0;e.innerHTML=`<button type="button" class="skyBtn" aria-label="Day. Tap for night.">${jg}</button>`;const a=e.querySelector("button"),r=g=>{o=g;const b=document.documentElement,m=Math.max(0,Math.min(1,g.glow));b.style.setProperty("--sky-opacity",g.opacity.toFixed(3)),b.style.setProperty("--sky-map-opacity",g.map.toFixed(3)),b.style.setProperty("--sky-glow",m.toFixed(3)),b.style.setProperty("--sky-stars",g.stars.toFixed(3)),b.style.setProperty("--sky-glass",g.glass.toFixed(3)),b.style.setProperty("--sky-tint",g.tint),b.style.setProperty("--sky-body",g.body),b.style.setProperty("--sky-page-a",g.pageA),b.style.setProperty("--sky-page-b",g.pageB),b.style.setProperty("--sky-spot",g.spot),b.style.setProperty("--sky-field-a",g.fieldA),b.style.setProperty("--sky-field-b",g.fieldB),b.style.setProperty("--sky-win",g.win),b.style.setProperty("--sky-win-2",g.win2),b.style.setProperty("--sky-house-win",g.house),b.style.setProperty("--sky-map-tint",g.mapTint),b.style.setProperty("--sky-glow-soft",`rgba(255, 186, 80, ${(m*.72).toFixed(3)})`),b.style.setProperty("--sky-glow-hot",`rgba(255, 220, 120, ${(m*.96).toFixed(3)})`),b.style.setProperty("--sky-glow-clear","rgba(255, 186, 80, 0)"),b.style.setProperty("--sky-glow-wash",`rgba(255, 170, 70, ${(m*.55).toFixed(3)})`),b.style.setProperty("--sky-glow-map",`rgba(255, 196, 110, ${(m*.7).toFixed(3)})`);const v=g.phase==="golden"?.24:g.phase==="dawn"?.22:0,y=g.phase==="golden"?"186, 110, 52":"140, 62, 18";b.style.setProperty("--sky-shadow",`rgba(${y}, ${v.toFixed(3)})`);const u=g.phase==="night"?.55:g.phase==="golden"?.08:g.phase==="dawn"?.16:0;b.style.setProperty("--sky-vig",`rgba(12, 10, 32, ${u.toFixed(3)})`);const w=g.phase==="golden"?"255, 196, 80":g.phase==="dawn"?"255, 214, 230":"255, 246, 214";b.style.setProperty("--sky-orb",`rgba(${w}, ${Math.min(1,g.glass).toFixed(3)})`),b.dataset.sky=g.phase,b.dataset.skyChoice=n,b.classList.toggle("sky-static",t),b.classList.toggle("sky-live",!t),a.innerHTML=F9[n],a.setAttribute("aria-label",`${Wp[n]}. Tap for ${Wp[Op[n]].toLowerCase()}.`)},l=()=>Ip(s??new Date,n),c=()=>r(l()),d=()=>{i&&clearInterval(i),i=window.setInterval(()=>{s||c()},t?6e4:1e3)},f=g=>{n=g;try{localStorage.setItem(Wt(Fg),n)}catch{}c()};a.addEventListener("click",()=>f(Op[n])),document.documentElement.classList.toggle("sky-static",t),c(),d();const p=document.getElementById("mapWorld");p&&K9(p);try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change",()=>{const b=Hp();document.documentElement.classList.toggle("sky-static",b),document.documentElement.classList.toggle("sky-live",!b)})}catch{}try{matchMedia(j9).addEventListener?.("change",()=>Ba())}catch{}return window.addEventListener("resize",()=>Ba()),new MutationObserver(()=>Ba()).observe(document.body,{attributes:!0,attributeFilter:["class"]}),{choice:()=>n,look:()=>o,setChoice(g){f(g)},freeze(g){s=g,c()}}}function Ba(){const e=document.getElementById("skyMount"),t=document.getElementById("menuDaySlot");e&&t&&e.parentElement!==t&&t.appendChild(e),t&&(t.hidden=!1),e&&(e.style.left="",e.style.top="")}function K9(e){const t=document.createElement("div");t.className="skyTint",t.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="skyLamps",n.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="skyBits",s.setAttribute("aria-hidden","true"),s.innerHTML='<i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i>';const o=()=>{e.contains(t)||e.appendChild(t),e.contains(n)||e.appendChild(n),e.contains(s)||e.appendChild(s)};o(),new MutationObserver(o).observe(e,{childList:!0})}function X9(){try{const e=localStorage.getItem(Wt(Fg));if(z9(e))return e}catch{}return"auto"}const uo=[{name:"Pink",fill:"#ff7eb3",ink:"#9d174d"},{name:"Lilac",fill:"#c9b3ff",ink:"#5f3dc4"},{name:"Aqua",fill:"#66d9e8",ink:"#0b7285"},{name:"Gold",fill:"#ffd43b",ink:"#e67700"}],mt="#5a3d5c",Wl=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Up=e=>typeof e=="number"?e:{skip:10,rev:11,d2:12,wild:13,w4:14}[e]??0,Vp=e=>typeof e.v=="number"?String(e.v):e.v==="skip"?"✕":e.v==="rev"?"↻":e.v==="d2"?"+2":e.v==="w4"?"+4":"♛",J9=e=>e.v==="skip"?"Nope":e.v==="rev"?"Flip":e.v==="d2"?"+2":e.v==="wild"||e.v==="w4"?"Crown":"",Cs=(e,t,n=1,s="#ffd43b")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -6 L1.4 -1.4 L6 -1 L1.6 1.4 L3 6 L0 3 L-3 6 L-1.6 1.4 L-6 -1 L-1.4 -1.4 Z" fill="${s}" stroke="${mt}" stroke-width="1" stroke-linejoin="round"/>`,Aa=(e,t,n=1)=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 1.2 C-2.2 -1.6 -5.2 -0.6 -3.6 2.2 C-2.4 4 0 5.2 0 5.2 C0 5.2 2.4 4 3.6 2.2 C5.2 -0.6 2.2 -1.6 0 1.2 Z" fill="#ff4d94" stroke="${mt}" stroke-width="1"/>`;function eE(e){return e.v==="wild"||e.v==="w4"?`<g transform="translate(14 28)">
      <path d="M4 26 L10 8 L18 16 L24 2 L30 16 L38 8 L44 26 Z" fill="#ffd43b" stroke="${mt}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="4" y="26" width="40" height="8" rx="2" fill="#ffd43b" stroke="${mt}" stroke-width="2.2"/>
      <circle cx="10" cy="8" r="2.4" fill="#ff7eb3"/><circle cx="24" cy="3" r="2.4" fill="#66d9e8"/><circle cx="38" cy="8" r="2.4" fill="#d0bfff"/>
      ${Cs(-2,0,.7)}${Cs(46,4,.65,"#fff")}${Cs(22,-4,.55,"#ff7eb3")}
    </g>${e.v==="w4"?`<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${mt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">+4</text>`:""}`:e.v==="d2"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff" stroke="${mt}" stroke-width="2.4"/>
      ${Aa(14,8,1.35)}${Aa(32,8,1.35)}
      <path d="M12 26 Q23 34 34 26" fill="none" stroke="${mt}" stroke-width="2.4" stroke-linecap="round"/>
      ${Aa(40,22,.8)}
    </g>`:e.v==="rev"?`<g fill="none" stroke="${mt}" stroke-width="3.2" stroke-linecap="round">
      <path d="M16 40 C42 22 54 52 34 60 C16 68 12 46 30 40"/>
      <path d="M14 38 L22 30 L24 42" stroke-linejoin="round"/>
    </g>${Cs(48,28,.85)}${Cs(20,62,.6,"#ff7eb3")}${Cs(50,58,.55,"#66d9e8")}`:e.v==="skip"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff6d8" stroke="${mt}" stroke-width="2.4"/>
      <rect x="8" y="12" width="14" height="9" rx="3" fill="#2b1430"/><rect x="24" y="12" width="14" height="9" rx="3" fill="#2b1430"/>
      <path d="M22 16.5 H24 M5 14 H2 M41 14 H44" stroke="${mt}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 27 Q23 32 34 27" fill="none" stroke="${mt}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`:""}function Ac(e){const t=e.c===4,n=t?{fill:"#fff8ee",ink:mt}:uo[e.c]??uo[0],s=typeof e.v=="number",o=J9(e),i=t?'<rect x="2" y="2" width="66" height="96" rx="13" fill="#fff8ee" stroke="#ff7eb3" stroke-width="4"/><rect x="5" y="5" width="60" height="90" rx="11" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="7.5" y="7.5" width="55" height="85" rx="9" fill="none" stroke="#66d9e8" stroke-width="1.6"/><rect x="9.5" y="9.5" width="51" height="81" rx="8" fill="none" stroke="#ffd43b" stroke-width="1.6"/>':`<rect x="2" y="2" width="66" height="96" rx="13" fill="${n.fill}" stroke="${mt}" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`,a='<ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/>',r=`fill="${n.ink}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif"`,l=`<text x="8" y="16" font-size="13" font-weight="900" ${r}>${Vp(e)}</text>`+(s?`<text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" ${r}>${Vp(e)}</text>`:""),c=s?`<text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="${n.ink}" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${e.v}</text>`:`${eE(e)}${o?`<text x="35" y="92" text-anchor="middle" font-size="12" font-weight="900" ${r}>${o}</text>`:""}`;return`<svg viewBox="0 0 70 100">${i}${a}${l}${c}</svg>`}const tE=[[18,28],[40,28],[29,46],[18,64],[40,64],[29,78]].map(([e,t])=>Aa(e,t,.9)).join(""),nE=`<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff4d94" stroke="${mt}" stroke-width="3"/>
  <rect x="7" y="7" width="56" height="86" rx="10" fill="none" stroke="#ffd43b" stroke-width="3"/>
  <rect x="11" y="11" width="48" height="78" rx="8" fill="#ff7eb3"/>
  ${tE}
  <circle cx="35" cy="50" r="14" fill="#fff6fb" stroke="${mt}" stroke-width="2.4"/>
  ${Cs(35,50,1.15,"#ffd43b")}
</svg>`,Gg=(e,t)=>{if(t.turn<0||t.drawn!=null&&e.id!==t.drawn)return!1;const n=t.top;return e.c===4||e.c===t.color||e.v===n.v&&n.c!==4};let Dc=null,St=null,po=-1,Qp=-1;function zp(e,t){Dc=e;const n=t.table,s=n.view;if(!s||!s.top){e.innerHTML="";return}n.tb!==Qp&&(St=null,po=-1,Qp=n.tb);const o=n.you,i=o!==null&&Array.isArray(s.hand)?s.hand.slice():[];St!==null&&!i.some(u=>u.id===St)&&(St=null);const a=s.ev;let r=null;if(a&&a.n!==po&&po>=0&&a.k==="play"&&a.card){const u=e.querySelector(`[data-card="${a.card.id}"]`)||e.querySelector(`[data-p="${a.p}"]`);u&&(r=u.getBoundingClientRect())}const c=n.phase==="play"&&s.turn>=0,d=c&&o!==null&&s.turn===o,f=o!==null&&i.length<=2&&i.length>0&&!s.slay?.[o]&&d,p=d&&s.drawn==null&&n.phase==="play",g=d&&s.drawn!=null&&n.phase==="play",b=i.sort((u,w)=>u.c-w.c||Up(u.v)-Up(w.v)),m=c?n.players[s.turn]:"",v=c?d?"Your turn!":`${Wl(t.name(m))}'s turn`:"",y=uo[s.color]??uo[0];if(e.innerHTML=`<div class="slayFelt">
    ${v?`<div class="whose ${d?"yours":""}" id="whoseTurn">${v}<span class="slayDir" aria-hidden="true">${s.dir===1?"→":"←"}</span></div>`:""}
    <div class="slayOpps">${n.players.map((u,w)=>w===o?"":`<div class="slayOpp ${s.turn===w?"isTurn":""}" data-p="${w}" data-count="${s.counts?.[w]??0}"><span class="chipFace">${t.face(u)}</span><b>${Wl(t.name(u))}</b><span class="cnt">${s.counts?.[w]??0}</span>${t.away(u)?'<i class="awayBadge">away</i>':""}${s.slay?.[w]?"<em>SLAY!</em>":""}</div>`).join("")}</div>
    <div class="slayPile">
      <button type="button" id="slayDeck" class="slayDeck" ${p?"":"disabled"} aria-label="Draw a card">${nE}<span>${s.deck??0}</span></button>
      <div id="slayDiscard" class="slayDiscard" data-top="${s.top.id}">${Ac(s.top)}</div>
      <div class="nowColor" data-color="${s.color}" style="background:${y.fill}" aria-label="${y.name}"></div>
    </div>
    ${o===null?'<p class="watching">You are watching</p>':""}
    ${St!==null?`<div id="crownPick" class="crownPick"><p>Pick a color for your Crown!</p><div class="crownRow">${uo.map((u,w)=>`<button type="button" data-color="${w}" aria-label="${u.name}" style="background:${u.fill}"><span>${u.name}</span></button>`).join("")}</div></div>`:""}
    <div id="slayHand" class="slayHand ${d?"isTurn":""}">${b.map(u=>{const w=d&&n.phase==="play"&&Gg(u,s),_=w?"can":d?"dim":"wait",S=typeof u.v=="number"?uo[u.c].name+" "+u.v:u.v==="wild"?"Crown":u.v==="w4"?"Crown plus 4":u.v==="d2"?"plus 2":u.v==="rev"?"Flip":"Nope";return`<button type="button" class="slayCard ${_} ${u.id===s.drawn?"justDrew":""} ${u.id===St?"picked":""}" data-card="${u.id}" data-c="${u.c}" data-v="${u.v}" aria-label="${Wl(S)}" ${w?"":"disabled"}>${Ac(u)}</button>`}).join("")}</div>
    ${c&&o!==null?`<button type="button" id="slayCall" class="slayCall ${f?"ready":""}" ${f?"":"disabled"}>SLAY!</button>`:""}
    <button type="button" id="slayPass" class="slayPass ${g?"":"hidden"}" ${g?"":"disabled"}>Pass</button>
  </div>`,a&&a.n!==po){const u=po;if(po=a.n,u>=0){if(a.k==="play"&&a.card){const w=e.querySelector("#slayDiscard");w&&sE(r,a.card,w.getBoundingClientRect()),a.card.v==="skip"?t.toast("Nope!"):a.card.v==="rev"?t.toast("Flip!"):a.card.v==="d2"?t.toast("+2!"):a.card.v==="w4"&&t.toast("Crown +4!"),t.sfx.swish()}a.vdrew&&t.toast("Forgot to say SLAY! Draw 2"),a.k==="slay"&&t.sfx.sparkle()}}}function sE(e,t,n){const s=document.createElement("div");s.className="flyCard",s.innerHTML=Ac(t);const o=e?.width||70,i=e?.height||100;Object.assign(s.style,{left:(e?.left??innerWidth/2)+"px",top:(e?.top??80)+"px",width:o+"px",height:i+"px"}),document.body.appendChild(s),requestAnimationFrame(()=>{s.style.left=n.left+"px",s.style.top=n.top+"px",s.style.width=Math.max(n.width,70)+"px",s.style.height=Math.max(n.height,96)+"px"}),setTimeout(()=>s.remove(),560)}const oE={id:"slay",render:zp,handle(e,t){const n=t.table.view,s=t.table.you;if(!n||t.table.phase!=="play"||s===null)return!1;const o=n.hand??[];if(e.closest("#slayCall"))return o.length<=2&&o.length>0&&!n.slay?.[s]&&(t.move({k:"slay"}),t.sfx.sparkle()),!0;if(e.closest("#slayDeck"))return n.turn===s&&n.drawn==null&&(St=null,t.move({k:"draw"}),t.sfx.click()),!0;if(e.closest("#slayPass"))return n.turn===s&&n.drawn!=null&&(St=null,t.move({k:"pass"}),t.sfx.click()),!0;const i=e.closest("#crownPick [data-color]");if(i&&St!==null)return t.move({k:"play",id:St,color:+i.dataset.color}),St=null,t.sfx.sparkle(),!0;const a=e.closest("#slayHand [data-card]");if(!a||a.hasAttribute("disabled"))return!!a;const r=+a.dataset.card,l=o.find(c=>c.id===r);return!l||n.turn!==s||!Gg(l,n)||(l.c===4?(St=r,t.sfx.pop(),Dc&&zp(Dc,t)):(St=null,t.move({k:"play",id:r}),t.sfx.click())),!0}},Yg="#5a3d5c",qp=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),iE=`<svg viewBox="0 0 48 48"><path d="M24 42 C8 30 2 22 7 13 C11 6 20 8 24 16 C28 8 37 6 41 13 C46 22 40 30 24 42 Z" fill="#ff4d94" stroke="${Yg}" stroke-width="3" stroke-linejoin="round"/><path d="M16 16 Q20 12 22 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`,aE=`<svg viewBox="0 0 48 48"><path d="M24 3 L29 17 H44 L32 26 L37 42 L24 33 L11 42 L16 26 L4 17 H19 Z" fill="#66d9e8" stroke="${Yg}" stroke-width="3" stroke-linejoin="round"/><path d="M24 12 L26 18 H22 Z" fill="#fff" opacity=".8"/></svg>`,rE={id:"four",render(e,t){const n=t.table,s=n.view;if(!s||!Array.isArray(s.b)){e.innerHTML="";return}const o=n.you,i=o!==null&&s.turn===o&&n.phase==="play",a=new Set((s.line??[]).map(([m,v])=>m+":"+v)),r=s.last;let l="";for(let m=0;m<7;m++){const v=s.b[m];let y="";for(let w=5;w>=0;w--){const _=w<v.length?v[w]:null,S=a.has(m+":"+w)?" hot":"",R=r&&r.col===m&&r.row===w?" just":"";y+=`<span class="fourCell${_===0?" heart":_===1?" star":""}${S}${R}">${_===0?iE:_===1?aE:""}</span>`}const u=i&&v.length<6;l+=`<button type="button" class="fourCol" data-col="${m}" ${u?"":"disabled"} aria-label="Drop in column ${m+1}">${y}<span class="dropHint">${u?"▼":""}</span></button>`}const c=n.phase==="play"&&s.turn>=0,d=c?n.players[s.turn]:"",f=c?i?"Your turn!":`${qp(t.name(d))}'s turn`:"",p=o===0?"You are <b>pink hearts</b>":o===1?"You are <b>aqua stars</b>":"Pink hearts and aqua stars",g=m=>m===0?"♥":"★",b=n.players.map((m,v)=>`<div class="playerChip ${s.turn===v?"isTurn":""}"><span class="chipFace">${t.face(m)}</span><b>${qp(t.name(m))} ${g(v)}</b>${t.away(m)?'<i class="awayBadge">away</i>':""}</div>`).join("");e.innerHTML=`<div class="fourPlay">
      ${f?`<div class="whose ${i?"yours":""}" id="whoseTurn">${f}</div>`:""}
      <div class="fourChips">${b}</div>
      <p class="fourLegend">${p}</p>
      <div class="fourBoard" id="fourBoard">${l}</div>
    </div>`},handle(e,t){const n=e.closest(".fourCol");if(!n)return!1;const s=t.table.view,o=t.table.you;if(n.hasAttribute("disabled")||!s||o===null||s.turn!==o||t.table.phase!=="play")return!0;const i=+n.dataset.col;return!Number.isInteger(i)||s.b[i].length>=6||(t.move({col:i}),t.sfx.click()),!0}},Zp={slay:oE,four:rE},ba=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),lE={notHere:"Come into the clubhouse first!",taken:"Someone is sitting there!",playing:"You are already in this game!",playingElsewhere:"Finish your other game first!",notHost:"Waiting for the host…",needMore:"Play with friends on your street",tooMany:"That table is full!",notPlaying:"The game has not started!",notPlayer:"Sit down to play!",illegal:"You can't play that!",notAway:"She is still here!",tooSoon:"Give her a moment!",notSeated:"You are not at this table!",noMove:"No move to play!"};function cE(e){const t=document.getElementById("tableOverlay");let n=null,s="",o=0;const i=y=>y.away==null?0:y.away+Math.max(0,Date.now()-(y.receivedAt??Date.now())),a=()=>{o&&(clearInterval(o),o=0)},r=y=>{const u=!!y&&y.phase==="play"&&y.away!=null&&n!==null;u&&!o&&(o=window.setInterval(()=>f(),1e3)),u||a()},l=()=>e.hood(),c=()=>{const y=l();return!y||n===null?null:y.tables.get(n)??null},d=y=>{const u=l();return{table:y,me:u.pid,name:w=>u.players.get(w)?.nickname??"friend",face:w=>{const _=u.players.get(w)?.look;return _?Kc(kt(_)):""},move:w=>u.tbl({op:"move",tb:y.tb,m:w}),away:w=>{if(w===u.pid)return!1;const _=u.players.get(w);if(_&&!_.online)return!0;const S=u.presence.get(w);return!S||S.where!=="gameroom"},toast:e.toast,sfx:e.sfx}};t.addEventListener("click",y=>{const u=y.target;if(u.closest("#tblBack")){g(),e.sfx.swish();return}if(u.closest("#tblLeave")){b();return}if(u.closest("#tblStart")){m();return}if(u.closest("#tblNudge")){v();return}const w=c();w&&Zp[w.game]?.handle(u,d(w))});function f(){const y=l(),u=c();if(!y||!u){t.classList.add("hidden"),t.innerHTML="",a();return}const w=Uh[u.game],_=y.pid,S=u.seats.includes(_),R=u.seats.filter(Boolean).length,D=u.phase==="play"&&u.you!==null&&u.view&&u.view.turn===u.you,U=u.view?.winPid??null;let Z="";if(u.phase==="over"){const A=U?y.players.get(U)?.nickname??"Friend":"";u.game==="slay"?Z=U?U===_?"You slayed!":`${ba(A)} slayed!`:"It's a tie!":Z=u.view?.draw||!U?"It's a tie!":U===_?"You got four!":`${ba(A)} got four!`;const H=u.tb+":"+u.seq;U===_&&s!==H&&(s=H,e.confetti(),e.sfx.sparkle())}const ne=i(u),G=u.phase==="play"&&S&&ne>=A1&&u.you!==null&&!!u.view&&u.view.turn!==u.you&&u.view.turn>=0,ee=u.phase!=="play"&&u.host===_&&R>=w.minPlayers&&R<=w.maxPlayers,an=S&&u.phase==="lobby"&&u.host!==_&&R>=w.minPlayers,Ut=S&&u.phase==="lobby"&&R<w.minPlayers;t.classList.remove("hidden"),t.dataset.tb=String(u.tb),t.dataset.phase=u.phase,t.dataset.game=u.game,t.dataset.you=u.you===null?"":String(u.you),t.innerHTML=`<div class="tblCard ${D?"yourTurn":""} game-${u.game}">
      <div class="tblTop"><h2>${ba(w.name)}</h2><div class="seatDots">${u.seats.map(A=>`<i class="${A?"on":""} ${A===_?"me":""}"></i>`).join("")}</div></div>
      ${Z?`<div class="winWrap"><div class="winBanner" id="winBanner">${Z}</div></div>`:""}
      <div id="tblStage"></div>
      <div class="tblBar">
        ${ee?'<button type="button" id="tblStart">Start</button>':""}
        ${an?'<p class="tblWait">Waiting for the host…</p>':""}
        ${G?'<button type="button" id="tblNudge">Play for her</button>':""}
        <button type="button" id="tblBack">Back to room</button>
        <button type="button" id="tblLeave">Leave table</button>
      </div>
      ${Ut?'<p class="tblWait" id="needFriend">Play with friends on your street</p>':""}
    </div>`;const Ne=t.querySelector("#tblStage");u.phase==="lobby"||!u.view?Ne.innerHTML=p(u,y,_):Zp[u.game]?.render(Ne,d(u)),r(u)}function p(y,u,w){return`<div class="lobby">${y.seats.map((_,S)=>`<div class="lobbySeat ${_?"filled":""} ${_===w?"me":""}">
      <span>${S+1}</span><b>${_?ba(u.players.get(_)?.nickname??"friend"):"Empty"}</b>
      ${_&&_===y.host?"<i>host</i>":""}${_===w?"<i>you</i>":""}
    </div>`).join("")}</div>`}function g(){n=null,a(),t.classList.add("hidden"),t.innerHTML=""}function b(){const y=l(),u=c();y&&u&&u.seats.includes(y.pid)&&y.tbl({op:"leave",tb:u.tb}),e.sfx.click(),g()}function m(){const y=l(),u=c();y&&u&&(y.tbl({op:"start",tb:u.tb}),e.sfx.sparkle())}function v(){const y=l(),u=c();y&&u&&(y.tbl({op:"nudge",tb:u.tb}),e.sfx.click())}return{open(y){n=y,f()},close:g,refresh:f,fail(y,u){e.toast(lE[u]||"Try that again!"),e.sfx.pop(),n===y&&f()},isOpen:()=>n}}const Kg="/kids-house-game/assets/rug-zTS04c1f.webp",dE=Object.freeze(Object.defineProperty({__proto__:null,default:Kg},Symbol.toStringTag,{value:"Module"})),Xg="/kids-house-game/assets/pack~bean-bag-m3eBc9mA.webp",fE=Object.freeze(Object.defineProperty({__proto__:null,default:Xg},Symbol.toStringTag,{value:"Module"})),Jg="/kids-house-game/assets/pack~sv-bean-bag-TrtltuSt.webp",pE=Object.freeze(Object.defineProperty({__proto__:null,default:Jg},Symbol.toStringTag,{value:"Module"})),hE=120,gE=192,uE=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let se=null,es=null,Cn=null,Np=!1;const eu=960,mE=e=>!!e&&!document.body.classList.contains("phone")&&e.clientHeight>e.clientWidth+40,hs=()=>{const e=document.getElementById("gameroom"),t=e?.clientHeight||600;return mE(e)?Math.min(t/So,e.clientWidth/eu):t/So},Da=()=>es;function Oo(){const e=se?.hood();if(!e)return null;for(const[t,n]of e.tables){const s=n.seats.indexOf(e.pid);if(s>=0){const o=Yi(Number(t))[s];return{tb:Number(t),seat:s,x:o.x,y:o.y}}}return null}function yE(){const e=se?.hood();if(!e)return!1;for(const[t,n]of e.players)if(t!==e.pid&&n.online)return!0;return!1}function bE(e){if(se=e,es=cE({hood:e.hood,toast:e.toast,confetti:()=>sg(),sfx:e.sfx}),Np)return es;Np=!0;const t=document.getElementById("grWorld");return t.addEventListener("click",wE),t.addEventListener("pointerdown",n=>{n.target.closest(".grChair, .grTable, .grDoor, .pet")&&n.stopPropagation()}),es}function Bd(){if(!se)return;const e=hs(),t=document.getElementById("grWorld"),n=l=>l*e+"px";t.style.width=qi*e+"px",t.style.height=So*e+"px",t.style.setProperty("--sc",String(e));const s=document.getElementById("gameroom"),o=(s?.clientHeight||0)-6-So*e,i=o>1?Math.round(o*.55):0,a=o>1?Math.ceil(o-i)+6:0;t.style.marginTop=i?i+"px":"";let r=w9();i&&(r+=`<div class="grExtWrap" style="top:${-i}px;height:${i}px">${Rp("top",i/e)}</div>`),s&&(s.style.background=i?"linear-gradient(180deg, #ffe0f2 0 50%, #d27399 50%)":""),a&&(r+=`<div class="grExtWrap" style="top:100%;height:${a}px">${Rp("bottom",a/e)}${xE(e,a,s?.clientWidth||0)}</div>`),r+=`<button class="grDoor" data-gr="map" aria-label="Back to the map" style="left:${n(78)};top:${n(268)};width:${n(86)};height:${n(170)}"></button>`,qs.forEach((l,c)=>{const d=l.seats>=6?560:l.seats>=4?440:340;r+=`<button class="grTable" data-tb="${c}" aria-label="${Uh[l.game].name} table" style="left:${n(l.x-d/2)};top:${n(456)};width:${n(d)};height:${n(70)}"></button>`,Yi(c).forEach((f,p)=>{const g=76*e,b=72*e,m=Math.max(g,44),v=Math.max(b,44),y=(f.x-38)*e-(m-g)/2,u=(f.y-16)*e-(v-b)/2;r+=`<button class="grChair" data-tb="${c}" data-seat="${p}" aria-label="Empty chair" style="left:${y}px;top:${u}px;width:${m}px;height:${v}px"></button>`})}),r+='<div class="savatars" id="gavatars"></div>',t.innerHTML=r,ki()}function ki(){if(!se||se.view()!=="gameroom")return;const e=document.getElementById("gavatars");if(!e)return;const t=hs(),n=new Set;for(const i of kE()){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&$E(a));const r=JSON.stringify(i.look)+i.name+(i.away?":away":"");if(a.dataset.look!==r){const p=a.querySelector(".bubble");a.innerHTML=`<div class="inner">${kt(i.look)}</div>${i.name?`<div class="nametag">${uE(i.name)}${i.away?'<i class="awayBadge">away</i>':""}</div>`:""}`,p&&a.appendChild(p),a.dataset.look=r}const l=(js[i.look.size]??1)*t*.95,c=hE*l,d=gE*l,f=i.seated?i.y-8:i.y;a.style.left=i.x*t-c/2+"px",a.style.top=f*t-d+"px",a.style.width=c+"px",a.style.height=d+"px",a.style.zIndex=String(100+Math.round(i.y)),a.classList.toggle("flipped",i.flip),a.classList.toggle("away",i.away),a.classList.toggle("seated",i.seated),ji(a,i.look,i.mine)}e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),se.refreshNear();const s=se.hood();document.querySelectorAll("#grWorld .grChair").forEach(i=>{const a=s?.tables.get(+i.dataset.tb)?.seats[+i.dataset.seat];i.classList.toggle("taken",!!a);const r=a?s.players.get(a)?.nickname:"";i.setAttribute("aria-label",r?r+" is sitting":"Empty chair")});const o=document.getElementById("grSolo");o&&o.classList.toggle("hidden",yE())}function kE(){const e=[],t=se.hood();if(t){const n=new Map;for(const[a,r]of t.tables)r.seats.forEach((l,c)=>{l&&n.set(l,Yi(Number(a))[c])});const s=[...t.presence.entries()],o=se.myPres();o&&s.push([t.pid,o]);const i=new Set;for(const[a,r]of s){if(r.where!=="gameroom")continue;const l=t.players.get(a);if(!l)continue;i.add(a);const c=n.get(a);e.push({key:a,look:l.look,name:l.nickname,x:c?.x??r.x,y:c?.y??r.y,flip:r.flip,mine:a===t.pid,away:!1,seated:!!c})}for(const[a,r]of n){if(i.has(a))continue;const l=t.players.get(a);l&&e.push({key:a,look:l.look,name:l.nickname,x:r.x,y:r.y,flip:!1,mine:!1,away:!0,seated:!0})}}else{const n=se.solo();if(n?.where==="gameroom"){const s=se.soloLook();e.push({key:"solo",look:s.look,name:"",x:n.x,y:n.y,flip:n.flip,mine:!0,away:!1,seated:!1})}}return e}function wE(e){if(!se||se.view()!=="gameroom")return;const t=e.target,n=t.closest(".savatar");if(n){const c=se.hood(),d=n.dataset.pid;if(c&&d){for(const[f,p]of c.tables)if(p.seats.includes(d)){es?.open(Number(f));return}}return}if(t.closest('[data-gr="map"]')){se.goMap();return}const s=t.closest(".grChair");if(s){vE(+s.dataset.tb,+s.dataset.seat);return}const o=t.closest(".grTable");if(o){if(!se.hood()){tu();return}es?.open(+o.dataset.tb),se.sfx.click();return}if(t.closest(".pet")||Oo())return;const i=document.getElementById("grWorld").getBoundingClientRect(),a=hs(),r=(e.clientX-i.left)/a,l=(e.clientY-i.top)/a;l<430||(Cn={x:Math.max(60,Math.min(qi-60,r)),y:Math.max(470,Math.min(590,l))})}function vE(e,t){if(!se)return;const n=se.hood();if(!n){tu();return}const s=n.tables.get(e)?.seats[t];if(s&&s!==n.pid){se.toast((n.players.get(s)?.nickname??"Someone")+" is sitting there!"),se.sfx.pop(),es?.open(e);return}Cn=null,n.tbl({op:"sit",tb:e,seat:t});const o=Yi(e)[t];se.setPres({where:"gameroom",x:o.x,y:Math.max(470,Math.min(590,o.y)),flip:!1}),es?.open(e),se.sfx.click()}function tu(){if(!se)return;const e=document.getElementById("grSolo");e&&(e.classList.remove("hidden"),e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),se.toast("Play with friends on your street"),se.sfx.pop()}function _E(e){if(!se||se.view()!=="gameroom"||!Cn)return;if(Oo()){Cn=null;return}const t=se.hood()?se.myPres():se.solo();if(!t||t.where!=="gameroom"){Cn=null;return}const n=Cn.x-t.x,s=Cn.y-t.y,o=Math.hypot(n,s);if(o<4){Cn=null;return}const i=Math.min(o,300*e),a={where:"gameroom",x:t.x+n/o*i,y:t.y+s/o*i,flip:Math.abs(n)>2?n<0:t.flip};se.setPres(a);const r=hs(),l=document.getElementById("grScroll"),c=a.x*r-l.scrollLeft;(c<l.clientWidth*.22||c>l.clientWidth*.78)&&(l.scrollLeft=a.x*r-l.clientWidth/2)}function $E(e){e.addEventListener("pointerdown",t=>{if(!se||Oo())return;const n=se.hood()?se.myPres():se.solo();if(!n||n.where!=="gameroom")return;t.preventDefault(),t.stopPropagation(),Cn=null;const s=hs(),o=document.getElementById("grWorld"),i=document.getElementById("grScroll"),a=y=>{const u=o.getBoundingClientRect();return{x:(y.clientX-u.left)/s,y:(y.clientY-u.top)/s}},r=a(t),l={x:n.x-r.x,y:n.y-r.y};let c=t,d=0,f=n.x,p=!1;const g=y=>{const u=se.hood()?se.myPres():se.solo();if(!u||u.where!=="gameroom")return;const w=a(y),_=Math.max(60,Math.min(qi-60,w.x+l.x)),S=Math.max(470,Math.min(590,w.y+l.y));if(!p&&Math.hypot(_-u.x,S-u.y)<6)return;p=!0;const R=Math.abs(_-f)>3?_<f:u.flip;Math.abs(_-f)>3&&(f=_),se.setPres({where:"gameroom",x:_,y:S,flip:R})},b=()=>{const y=i.getBoundingClientRect(),u=c.clientX<y.left+70?-12:c.clientX>y.right-70?12:0;u&&p&&(i.scrollLeft+=u,g(c)),d=requestAnimationFrame(b)};d=requestAnimationFrame(b),e.classList.add("lifted"),se.sfx.pick();const m=y=>{y.pointerId===t.pointerId&&(c=y,g(y))},v=y=>{y.pointerId===t.pointerId&&(cancelAnimationFrame(d),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",v),e.classList.remove("lifted"),p&&se.sfx.drop())};window.addEventListener("pointermove",m),window.addEventListener("pointerup",v)})}function xE(e,t,n){if(t<120)return"";const s=n?Math.min(qs[0].x*e,n/2):qs[0].x*e,o=Math.min(560*e*1.2,t*1.7),i=o*306/960,a=Math.max(8,(t-i)*.45),r=o*.26,l=r*.78,c=(d,f,p,g,b=!1)=>`<img class="grDecor" src="${d}" alt="" aria-hidden="true" draggable="false" style="left:${f}px;top:${p}px;width:${g}px${b?";transform:scaleX(-1)":""}">`;return`<div class="grDecor grRug" aria-hidden="true" style="left:${s-o/2}px;top:${a}px;width:${o}px;height:${i}px"><img src="${Kg}" alt="" draggable="false" style="width:${o}px;margin-top:${-o*634/960}px"></div>`+c(Xg,s-o/2-r*.35,a+i*.45-l*.6,r)+c(Jg,s+o/2-r*.65,a+i*.45-l*.6,r*1.02,!0)}const ai=H9(),J=Oh();J.born&&typeof navigator<"u"&&!navigator.webdriver&&!J.get().baby&&J.dispatch({type:"baby/meet",now:Date.now()});let Re=J;const nu=[],Fp=new WeakSet;function su(e){Fp.has(e)||(Fp.add(e),e.subscribe((t,n)=>{Re===e&&nu.forEach(s=>s(t,n))}))}su(J);const E={get:()=>Re.get(),dispatch(e){Re.dispatch(e)},subscribe:e=>{nu.push(e)}},ue=$t,We=Pn,Gs=390;let de=1e3;const Ys=()=>Math.max(0,ue-de),ou=375,iu=(e,t)=>e.wall?Math.min(t,ou):t,au=12,so=(e,t)=>e.wall?t:Math.min(t,We-au),gs=120,yn=192,Ad=[{id:"living",name:"Living Room",color:"#ff8fab"},{id:"bedroom",name:"Bedroom",color:"#b388d6"},{id:"kitchen",name:"Kitchen",color:"#5cc985"},{id:"salon",name:"Salon",color:"#f0a0d8"},{id:"nursery",name:"Nursery",color:"#9ad7f5"},{id:"bathroom",name:"Bathroom",color:"#7ec8d6"}],ru=e=>Ad.find(t=>t.id===e)?.color??"#ccc",Dd=Zx();L7(wn,Me);const Po=[{id:"__people",name:"People",icon:"",kind:"people"},...["furniture","decor","plants","food","pets"].map((e,t)=>({id:e,name:e,icon:["armchair","balloon","flowers","donut","cat"][t],kind:"cat"}))];Po.push({id:"secrets",name:"Secrets",icon:"egg:chloe-starlamp",kind:"cat"});for(const e of wn)Po.some(t=>t.kind==="cat"&&t.id===e.cat)||Po.push({id:e.cat,name:e.cat,icon:e.kind,kind:"cat"});for(const e of wn)e.pack&&!Mg(e)&&!Po.some(t=>t.id==="pack:"+e.pack)&&Po.push({id:"pack:"+e.pack,name:og(e.pack),icon:e.kind,kind:"pack"});const Ul=e=>wn.filter(t=>dL(t,e,E.get().currentRoom,Hd==="all",jr())),ME=["#ffd6e0","#d9ccff","#cdf3dc","#cfe8ff","#fff1b8","#ffe0c7","#ffffff","#f6c1ff"],LE=["#e8b98a","#f2d0a4","#c99366","#ffe7a8","#bfe3d0","#d6d6f5","#ffc8dd","#9fb4c7"],Qt={paint:'<svg viewBox="0 0 48 48"><path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M28 12 L34 6 L42 14 L36 20" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/></svg>',shirt:'<svg viewBox="0 0 48 48"><path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',soundOn:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 17 Q37 24 32 31 M36 12 Q45 24 36 36" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',soundOff:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ddd" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M33 19 L43 29 M43 19 L33 29" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',flip:'<svg viewBox="0 0 48 48"><path d="M24 6 V42" stroke="#5a3d5c" stroke-width="3" stroke-dasharray="4 4"/><path d="M18 12 L6 36 H18 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M30 12 L42 36 H30 Z" fill="#fff" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',front:'<svg viewBox="0 0 48 48"><rect x="6" y="6" width="22" height="22" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="18" y="18" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',back:'<svg viewBox="0 0 48 48"><rect x="18" y="18" width="24" height="24" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="22" height="22" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',trash:'<svg viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="28" rx="5" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><rect x="8" y="9" width="32" height="7" rx="3.5" fill="#ffadad" stroke="#5a3d5c" stroke-width="3"/><path d="M20 21 V35 M28 21 V35" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',smaller:'<svg viewBox="0 0 48 48"><rect x="16" y="16" width="16" height="16" rx="4" fill="#bde0fe" stroke="#5a3d5c" stroke-width="3"/><path d="M8 24 H14 M34 24 H40" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',bigger:'<svg viewBox="0 0 48 48"><rect x="12" y="12" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M24 6 V11 M24 37 V42 M6 24 H11 M37 24 H42" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>'},EE='<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',CE='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 15 H37 M11 24 H37 M11 33 H37" fill="none" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',SE='<svg class="mailGlyph" viewBox="0 0 48 48" aria-hidden="true"><g transform="translate(0 2)"><rect x="6" y="14" width="36" height="24" rx="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/><path d="M6 16 L24 30 L42 16" fill="none" stroke="#5a3d5c" stroke-width="3"/><path d="M34 12 V6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M34 6 H44 L40 10 L44 14 H34 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2"/></g></svg>',lu='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',PE=document.getElementById("app");PE.innerHTML=`
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${Tt.chat}<span class="badge" id="chatBadge"></span></button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${Tt.home}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${Ay}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${p9}</button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${Yc}<span class="badge" id="mapBadge"></span></button>
    <button class="round" id="btnMenu" aria-label="Menu" aria-expanded="false">${CE}<span class="badge" id="menuBadge"></span></button>
  </div>
</div>
<div class="menuPop hidden" id="menuPop">
  <div class="menuCard" role="dialog" aria-label="Menu">
    <button type="button" class="close" id="menuClose" aria-label="Close">✕</button>
    <p class="menuGroup">My stuff</p>
    <button type="button" class="menuRow photoRow" id="btnPhoto" aria-label="Take a photo"><span class="mIco">📸</span><span class="mLabel">Take a photo</span></button>
    <button type="button" class="menuRow" id="btnPets" aria-label="Pets"><span class="mIco">${tg}</span><span class="mLabel">Pets</span></button>
    <button type="button" class="menuRow" id="btnDress" aria-label="Characters"><span class="mIco">${Qt.shirt}</span><span class="mLabel">Characters</span></button>
    <button type="button" class="menuRow" id="btnPaint" aria-label="Colors"><span class="mIco">${Qt.paint}</span><span class="mLabel">Wall &amp; floor colors</span></button>
    <button type="button" class="menuRow" id="secrets" aria-label="Surprises, 0 of 5"><span class="mIco secGift">🎁</span><span class="mLabel"><span class="secWord">Surprises </span><span class="secCount">0/5</span></span></button>
    <p class="menuGroup houseGroup">House</p>
    <button type="button" class="menuRow lockRow" id="btnLock" aria-label="Lock house"><span class="mIco" id="lockIco">${Tt.lockOff}</span><span class="mLabel" id="lockLabel">Lock my house</span></button>
    <button type="button" class="menuRow mailRow" id="btnMail" aria-label="Mailbox"><span class="mIco">${SE}</span><span class="mLabel">Mailbox</span><span class="menuNew" id="mailNew"></span></button>
    <!-- Day / Night / Auto. The clock stays on Auto until she taps. -->
    <div id="menuDaySlot" class="menuSlot" hidden></div>
    <p class="menuGroup streetGroup">Street</p>
    <button type="button" class="menuRow grownRow" id="btnParent" aria-label="Grown-ups"><span class="mIco">${Tt.shield}</span><span class="mLabel">Grown-ups</span></button>
    <button type="button" class="menuRow soloLeave" id="btnSolo" aria-label="Play in my own house"><span class="mIco">${Tt.solo}</span><span class="mLabel">Play in my own house</span></button>
    <button type="button" class="menuRow friendRow" id="btnHood" aria-label="Friends"><span class="mIco">${Tt.street}</span><span class="mLabel">Friends</span></button>
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
      <div class="toolbar hidden" id="toolbar">
        <button data-a="smaller" aria-label="Smaller">${Qt.smaller}</button><button data-a="bigger" aria-label="Bigger">${Qt.bigger}</button><button data-a="flip" aria-label="Flip">${Qt.flip}</button><button data-a="front" aria-label="Bring forward">${Qt.front}</button><button data-a="back" aria-label="Send back">${Qt.back}</button><button data-a="delete" class="danger" aria-label="Put away">${Qt.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
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
<div class="street mapView hidden" id="street"><div class="mapSky">${O0}</div><div class="mapMeadow">${W0}</div><button class="mailCue" id="mailCue" type="button">You've got mail!</button><div class="mapWorld" id="mapWorld"></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>
<div id="toastLane"></div>
<div class="phoneNote" id="phoneNote"><div class="card"><h2>Turn sideways</h2><p>Turn your phone sideways for more room to play!</p><button class="phoneOk" id="phoneOk" type="button">OK!</button></div></div>
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>
<div id="skyMount"></div>`;const M=e=>document.getElementById(e),j=M("stage"),Id=M("world"),X=M("layer"),xe=M("toolbar"),Ia=M("bin");let it=null,Be=E.get().characters[0]?.id??null,Pt="furniture",Hd="",Ic="",TE=Date.now()%1e5;const Hc=e=>`${e}-${Date.now().toString(36)}${(++TE).toString(36)}${Math.random().toString(36).slice(2,5)}`,ft="__me";let k=null,T="house",Ue=!1,Se="",fr=new Map,cu=!1,du=()=>{};const Ae=ay(M("modeToggle"),{ownHouse:()=>!k||!Se||Se===k.myHouseId(),onChange:()=>{cu&&(Wo.matches?ls():us()),du()}}),Ha=J2({send:(e,t,n,s)=>k?.sendMail(e,t,n,s),read:(e,t)=>k?.readMail(e,t),drop:(e,t)=>k?.dropMail(e,t),houseOf:e=>[...k?.players.values()??[]].find(t=>t.pid===e)?.houseId??"",houseName:e=>k?.houses.get(e)?.meta.name??"My House",lettersOf:e=>k?.houses.get(e)?.confirmed.mailbox?.letters??[],mine:e=>!!k&&k.houses.get(e)?.meta.ownerId===k.pid,toast:F,openOwn:()=>{const e=k?.myHouseId();e&&tf(e)},freeType:()=>!k||jh(k.settings)});Ae.sync(!0);const As=new Map,pr={};let ce=Ao,_o=0;cu=!0;let Ai=null;const Xr=()=>{cancelAnimationFrame(_o),Ai=null},Od=e=>Math.max(0,Math.min(Ys(),e));function je(e){ce=Od(e),pr[E.get().currentRoom]=ce,Id.style.transform=`translate3d(${-ce}px,0,0)`,M("nudgeL").classList.toggle("off",ce<=1),M("nudgeR").classList.toggle("off",ce>=Ys()-1);const t=M("mmView");t.style.left=ce/ue*100+"%",t.style.width=de/ue*100+"%",it&&Pu(E.get())}function Jr(e){cancelAnimationFrame(_o),e=Od(e),Ai=e;const t=()=>{const n=e-ce;if(Math.abs(n)<.5){je(e),Ai=null;return}je(ce+n*.18),_o=requestAnimationFrame(t)};_o=requestAnimationFrame(t)}const bt=()=>j.getBoundingClientRect().width/de,RE="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)",Wo=window.matchMedia(RE);function BE(){const e=Wo.matches;document.body.classList.toggle("phone",e),document.body.classList.toggle("phone-portrait",e&&window.matchMedia("(orientation: portrait)").matches);const t=M("stageWrap");for(const n of[M("nudgeL"),M("nudgeR")]){const s=e?t:j;n.parentElement!==s&&s.appendChild(n)}}function fu(){const e=document.querySelector(".top");if(!e)return;const t=e.getBoundingClientRect(),n=document.body.classList.contains("phone")?t.bottom:t.height;document.documentElement.style.setProperty("--chrome-h",Math.ceil(n)+"px"),pu()}function pu(){const e=document.querySelector(".top");if(!e)return;const t=Math.ceil(e.getBoundingClientRect().bottom+16)+"px",n=document.getElementById("mailCue");n&&(n.style.top=t);const s=document.getElementById("toastLane");s&&(s.style.top=t)}function AE(){const e=document.documentElement,t=document.getElementById("app");if(!(document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait"))){t.style.top="",t.style.height="",t.style.bottom="",e.style.removeProperty("--vvh"),e.style.removeProperty("--vvt");return}const s=window.visualViewport,o=Math.round(s?s.height:window.innerHeight),i=Math.round(s?s.offsetTop:0);e.style.setProperty("--vvh",o+"px"),e.style.setProperty("--vvt",i+"px"),t.style.top=i+"px",t.style.height=o+"px",t.style.bottom="auto"}function us(){BE(),AE(),fu();const e=M("stageWrap"),t=document.body.classList.contains("phone"),n=e.clientWidth,s=e.clientHeight,o=Math.max(1,s-Vd());if(t?s>n*.85:s>n+40){const r=n/Math.max(1,s);de=Math.round(Math.max(480,Math.min(860,We*r)))}else if(t){const r=n/Math.max(1,o);de=Math.round(Math.max(480,Math.min(ue,We*r)))}else de=1e3;de=Wd(de),j.style.width=de+"px",j.style.height=We+"px";const a=Math.min(n/de,o/We);if(bu(a),j.style.setProperty("--yard-sc",String(a||1)),t&&j.style.setProperty("--fit",String(bt())),hu(),ce>Ys())je(ce);else{const r=M("mmView");r.style.left=ce/ue*100+"%",r.style.width=de/ue*100+"%"}at(),!t&&T==="house"&&Ks(!1),qE(),T==="ranch"&&requestAnimationFrame(Gc),T==="gameroom"&&requestAnimationFrame(M0),Uo(),t&&T==="ranch"&&yS(),gu(),Ae.hint(),fl(),Gn()}function hu(){const e=M("stageWrap"),t=document.body.classList.contains("phone")&&T==="house";for(const n of[M("nudgeL"),M("nudgeR")]){if(!t||n.parentElement!==e){n.style.marginTop="",n.style.left="",n.style.right="",n.style.top="";continue}const s=j.getBoundingClientRect(),o=e.getBoundingClientRect(),i=(s.top+s.bottom)/2-o.top;n.style.top=i+"px",n.style.marginTop=-n.offsetHeight/2+"px",n.style.left="",n.style.right=""}}function gu(){document.body.classList.remove("secrets-chrome"),M("secrets")?.classList.remove("compact")}function at(e=0){if(!document.body.classList.contains("phone"))return;if(T==="house"){uu();return}const t=T==="park"?"parkScroll":T==="ranch"?"ranchScroll":T==="gameroom"?"grScroll":"";if(!t)return;const n=document.getElementById(t);if(!n||n.clientWidth<20){e<8&&requestAnimationFrame(()=>at(e+1));return}const s=n.querySelector(".savatar.mine")??n.querySelector(".savatar");if(!s){e<8&&requestAnimationFrame(()=>at(e+1));return}IE(n,[s,...s.querySelectorAll(".nametag")])&&e<8?requestAnimationFrame(()=>at(e+1)):DE()}function DE(){pl()&&(T==="gameroom"&&x0([...document.querySelectorAll(".neonSignArt")],document.getElementById("grScroll")),T==="ranch"&&!Ue&&(L0(),yf()))}function IE(e,t){const s=e.getBoundingClientRect(),o=Math.min(s.right,window.innerWidth)-8,i=Math.max(s.left,0)+8;let a=0,r=0;for(const c of t){const d=c.getBoundingClientRect();d.width<2||d.height<2||(a=Math.max(a,d.right-o),r=Math.max(r,i-d.left))}if(a<=1&&r<=1)return!1;const l=e.scrollLeft;return a>1&&r>1?e.scrollLeft-=r:a>1?e.scrollLeft+=a:e.scrollLeft-=r,Math.abs(e.scrollLeft-l)>.5}function uu(){Ks(!1)}function jp(e){let t=0;for(const n of e){const s=Me[n.kind];!s||s.wall||(t=Math.max(t,s.w*Ke(n)))}return t}function HE(){if(T!=="house"||!Ae.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return 0;const e=E.get().rooms,t=E.get().currentRoom;let n=jp(e[t]?.items??[]);if(t==="backyard")for(const o of Object.keys(e))o!=="backyard"&&(n=Math.max(n,jp(e[o].items)));if(n<40)return 0;const s=document.body.classList.contains("phone-portrait")?.7:.55;return Math.min(ue,Math.ceil(n/s))}function Wd(e){const t=HE();return t&&e<t?t:e}function OE(){const e=Wd(de);if(e<=de+.5)return;de=e,j.style.width=de+"px";const t=M("stageWrap"),n=Math.max(1,t.clientHeight-Vd()),s=Math.min(t.clientWidth/de,n/We);if(bu(s),document.body.classList.contains("phone")&&j.style.setProperty("--fit",String(s)),ce>Ys())je(ce);else{const o=M("mmView");o.style.left=ce/ue*100+"%",o.style.width=de/ue*100+"%"}}let Di=null,Ii=!1;function WE(){if(T!=="house"||!Ae.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return null;const e=E.get();if(e.currentRoom==="backyard")return null;let t=null,n=Di;if(k&&Re!==J){const a=ke();a&&a.where==="house"&&a.room===e.currentRoom&&(t=Mt(e.currentRoom,In(k.pid,a),a).x,n||(n=In(k.pid,a)?.item??null))}if(t===null){const a=e.characters.find(r=>r.id===Be&&r.room===e.currentRoom)??e.characters.find(r=>r.room===e.currentRoom);if(!a)return null;t=Mt(e.currentRoom,Et(a),a).x,n||(n=Et(a)?.item??null)}if(!n)return null;const s=e.rooms[e.currentRoom].items.find(a=>a.id===n),o=s&&Me[s.kind];if(!s||!o)return null;const i=o.w*Ke(s)/2;return{minX:Math.min(t-100,s.x-i),maxX:Math.max(t+100,s.x+i)}}function Ks(e){if(T!=="house"||Xs)return;if(E.get().currentRoom==="backyard"){Math.abs(ce-mc)>.5&&je(mc),Gn();return}if(Ii)return;const t=WE();if(t){const v=t.maxX-t.minX;let y=ce;v+20*2>de?y=t.minX-20:(t.minX-20<y&&(y=t.minX-20),t.maxX+20>y+de&&(y=t.maxX+20-de)),y=Math.max(0,Math.min(Ys(),y)),Math.abs(y-ce)>.5&&je(y),Gn();return}const n=document.querySelector("#layer .char.avatar.mine")??document.querySelector("#layer .char");if(!n)return;const s=bt()||1,o=j.getBoundingClientRect(),i=8;let a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i;for(const m of["nudgeL","nudgeR"]){const v=M(m);if(!v||v.classList.contains("off")||v.offsetParent===null)continue;const y=v.getBoundingClientRect();y.width<2||y.height<2||(m==="nudgeL"?r=Math.max(r,y.right+6):a=Math.min(a,y.left-6))}a-r<48&&(a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i);const l=[n,...n.querySelectorAll(".nametag")];let c=0,d=0,f=1/0,p=-1/0;for(const m of l){const v=m.getBoundingClientRect();v.width<2||v.height<2||(c=Math.max(c,v.right-a),d=Math.max(d,r-v.left),f=Math.min(f,v.left),p=Math.max(p,v.right))}if(document.body.classList.contains("phone-portrait")&&f<1/0){const m=(f+p)/2-(r+a)/2;if(Math.abs(m)>3){je(ce+m/s),Gn();return}}const g=UE(n),b=zL({cam:ce,maxCam:Ys(),kidX:g,overflowL:d,overflowR:c,scale:s,nudgeX:e});Math.abs(b.cam-ce)>.5&&je(b.cam),e&&Math.abs(b.kidX-g)>.5&&VE(n,b.kidX),Gn()}function UE(e){if(e.dataset.pid&&k){const t=e.dataset.pid===k.pid?ke():k.presence.get(e.dataset.pid);if(t&&t.where==="house")return t.x}return E.get().characters.find(t=>t.id===e.dataset.cid)?.x??0}function VE(e,t){if(e.dataset.pid&&k&&e.classList.contains("mine")){const o=ke();if(!o||o.where!=="house")return;Ye({...o,x:t}),Lt();return}const n=e.dataset.cid;if(!n)return;const s=E.get().characters.find(o=>o.id===n);s&&E.dispatch({type:"char/move",id:n,room:E.get().currentRoom,x:t,y:s.y})}const QE={living:"Living",bedroom:"Bed",kitchen:"Kitchen",salon:"Salon",nursery:"Nursery",bathroom:"Bath"};function mu(){const e=T==="house",t=document.body.classList.contains("phone-portrait"),n=e&&!Ae.isPlay(),s=e&&de+1<ue,o=e&&(t?n:n||s);document.body.classList.toggle("show-minimap",o)}const zE='<svg class="tabIco" width="14" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6 L8 1 L15 6 V11 H1 Z" fill="currentColor"/></svg>';function yu(){return document.body.classList.contains("phone")}function qE(){const e=yu()?"c":"f";mu(),e!==Ic&&(Ic=e,Mu(E.get()))}function Ud(){Wo.matches?ls():us()}window.addEventListener("resize",Ud);window.addEventListener("resize",()=>requestAnimationFrame(zd));M("tabs").addEventListener("scroll",zd,{passive:!0});Wo.addEventListener("change",Ud);let Gp="",Vl=!1;function Yp(){const e=M("stageWrap"),t=document.querySelector(".top"),n=document.querySelector(".tools"),s=r=>r?r.clientWidth+"x"+r.clientHeight:"0",o=window.visualViewport,i=o?Math.round(o.offsetTop)+"x"+Math.round(o.height)+"x"+Math.round(o.width):"",a=document.body.classList.contains("baby-card")?"c":"";return i+" "+s(e)+" "+s(t)+" "+s(n)+a}function Vd(){const e=document.body;if(!e.classList.contains("baby-card")||!e.classList.contains("phone")||e.classList.contains("phone-portrait"))return 0;const t=document.querySelector(".babyCare"),n=t&&!t.hidden?t.getBoundingClientRect().height:0;return Math.ceil(8+(n>8?n:72)+8)}function bu(e){const t=Vd(),n=M("stageWrap").clientHeight;j.style.left="",t>0?j.style.top=t+Math.max(0,n-t)/2+"px":j.style.top="",j.style.transform=`translate(-50%,-50%) scale(${e})`}function ku(){const e=M("modeToggle"),t=document.querySelector(".tools"),n=document.getElementById("modeDock"),s=document.querySelector(".drawerTop"),o=document.getElementById("roomFilter");if(!e||!t||!n||!s||!o)return!1;const i=document.body.classList.contains("phone"),a=i&&!document.body.classList.contains("phone-portrait"),r=!i&&window.matchMedia("(min-width: 900px)").matches,l=a?t:i||r?n:s;n.hidden=!(i&&!a)&&!r,n.classList.toggle("wideDock",r);let c=!1;const d=r?n:s;return o.parentElement!==d&&(r?n.appendChild(o):s.insertBefore(o,s.firstChild),c=!0),(e.parentElement!==l||r&&n.firstChild!==e)&&(a?t.insertBefore(e,t.firstChild):i||r?n.insertBefore(e,n.firstChild):s.insertBefore(e,s.firstChild),c=!0),c}function ZE(){if(E.get().currentRoom==="backyard"||!document.body.classList.contains("phone-portrait")||!document.body.classList.contains("mode-play")||T!=="house")return;const e=M("stageWrap"),t=e.clientWidth,n=e.clientHeight;if(t<20||n<20||!(n>t*.85))return;const s=Math.min(ue,Wd(Math.max(280,Math.min(860,Math.round(We*t/n)))));if(Math.abs(s-de)<2)return;de=s,j.style.width=de+"px",j.style.height=We+"px";const o=Math.min(t/de,n/We);if(j.style.transform=`translate(-50%,-50%) scale(${o})`,j.style.setProperty("--fit",String(bt())),ce>Ys())je(ce);else{const i=M("mmView");i.style.left=ce/ue*100+"%",i.style.width=de/ue*100+"%"}hu(),mu()}function ls(){if(Vl||!Wo.matches)return;const e=ku(),t=Yp()+(document.body.classList.contains("mode-play")?"p":"d");if(!(!e&&t===Gp)){Vl=!0;try{us(),ZE(),at(),Gp=Yp()+(document.body.classList.contains("mode-play")?"p":"d")}finally{Vl=!1}}}if(typeof ResizeObserver<"u"){const e=new ResizeObserver(()=>ls()),t=document.querySelector(".top");t&&e.observe(t),e.observe(M("stageWrap"));const n=document.querySelector(".tools");n&&e.observe(n)}window.visualViewport&&(window.visualViewport.addEventListener("resize",()=>ls()),window.visualViewport.addEventListener("scroll",()=>ls()));j.addEventListener("scroll",()=>{j.scrollLeft=0,j.scrollTop=0});const Dt=(e,t)=>{const n=j.getBoundingClientRect();return{x:(e-n.left)/n.width*de+ce,y:(t-n.top)/n.height*We}},Oc=(e,t)=>{const n=j.getBoundingClientRect();return e>n.left&&e<n.right&&t>n.top&&t<n.bottom},Kp=(e,t)=>{const n=Ia.getBoundingClientRect();return e>n.left-20&&e<n.right+20&&t>n.top-20&&t<n.bottom+20},Ki=e=>js[e.size]??1,gn=new Map;function Qd(){return!k||Re===J?!0:k.houses.get(Se)?.meta.ownerId===k.pid}function el(e){const t=Me[e.kind];return!t||!no(e.kind)?null:{id:e.id,kind:e.kind,x:e.x,footY:so(t,e.y),flip:!!e.flip,scale:Ke(e),w:t.w,h:pt(t)}}function Mt(e,t,n){if(!t)return n;const s=E.get().rooms[e]?.items.find(a=>a.id===t.item),o=s&&el(s);if(!o)return n;const i=Ch(o).find(a=>a.n===t.n);return i?{x:i.x,y:i.y}:n}function Hi(e,t,n=!1){const s=E.get(),o=[];for(const i of s.characters){if(i.id===e||i.room!==s.currentRoom)continue;const a=Et(i);a&&o.push({item:a.item,n:a.n})}if(!n){const i=y1(s.baby,s.currentRoom);i&&o.push(i)}if(k&&T==="house"){const i=(r,l)=>{if(r===t||l.where!=="house"||l.houseId!==Se||l.room!==s.currentRoom)return;const c=In(r,l);c&&o.push({item:c.item,n:c.n})};k.presence.forEach((r,l)=>i(l,r));const a=ke();a&&k.pid!==t&&i(k.pid,a)}return o}function wu(e,t){t?gn.set(e,t):gn.delete(e)}function ri(e,t,n,s,o){const a=!k||Re===J||!!k?.speaksSit;a?gn.delete("c:"+e):wu("c:"+e,o),a?E.dispatch({type:"char/move",id:e,room:t,x:n,y:s,seat:o}):E.dispatch({type:"char/move",id:e,room:t,x:n,y:s})}function Oa(e,t,n,s,o){const{seat:i,...a}=e;if(k&&!k.speaksSit){wu("p:"+k.pid,o?{item:o.id,pose:o.pose,n:o.n}:null),Ye({...a,x:t,y:n,flip:s});return}k&&gn.delete("p:"+k.pid),Ye(o?{...a,x:t,y:n,flip:s,seat:o}:{...a,x:t,y:n,flip:s})}function Et(e){return e.seat?e.seat:gn.get("c:"+e.id)??null}function In(e,t){return t.seat?{item:t.seat.id,pose:t.seat.pose,n:t.seat.n}:gn.get("p:"+e)??null}function hr(e,t){const n=E.get(),s=document.elementsFromPoint(e,t),o=new Set;for(let i=0;i<s.length;i++){const a=s[i];if(!a||!a.closest)continue;const r=a.closest(".item");if(!r)continue;const l=r.dataset.id;if(!l||o.has(l))continue;o.add(l);const c=n.rooms[n.currentRoom].items.find(d=>d.id===l);if(c&&no(c.kind))return c}return null}function NE(e){const t=Vr(e);if(t)return"k-bed k-bed-"+t.clip;const n=e.toLowerCase();return/sofa|couch|loveseat/.test(n)?"k-sofa":/bench/.test(n)?"k-bench":/chair|stool|rocker/.test(n)?"k-chair":""}function FE(){const e=E.get(),t=new Map,n=(s,o)=>{const i=t.get(s);t.set(s,i===void 0?o:Math.max(i,o))};for(const s of e.characters){const o=s.room===e.currentRoom?Et(s):null;o&&n(o.item,o.n)}if(k&&T==="house"){const s=(i,a)=>{const r=a.where==="house"&&a.houseId===Se&&a.room===e.currentRoom?In(i,a):null;r&&n(r.item,r.n)};k.presence.forEach((i,a)=>s(a,i));const o=ke();o&&s(k.pid,o)}return t}function jE(e,t){const n=Ki(e),s=Yr(e,Fr(Et(e)?.pose))[t];let o=s.x;e.flip&&(o=100-o);const i=Mt(e.room,Et(e),e);return{x:i.x+(o-50)/100*gs*n,y:i.y-yn*n+s.y/160*yn*n}}function vu(e){const t=E.get();let n=null;for(const s of t.characters){if(s.room!==t.currentRoom)continue;const o=Ki(s),i=Mt(s.room,Et(s),s),a=Math.abs(e.x-i.x)<gs*o/2+25&&e.y>i.y-yn*o-25&&e.y<i.y+20;for(const r of["left","right"]){if(s.held[r])continue;const l=jE(s,r),c=Math.hypot(e.x-l.x,e.y-l.y);(a||c<75)&&(!n||c<n.d)&&(n={c:s,hand:r,d:c})}}return n}const _u=["none","radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)","repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)","linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)"],$u="repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 125px), linear-gradient(rgba(0,0,0,.06), transparent 50%)",Wc=e=>`url('${e.replace(/'/g,"%27")}')`;function xu(e){const t=e.rooms[e.currentRoom],n=M("wall"),s=M("floor"),o=t.wallTile?op[t.wallTile]:void 0;n.style.backgroundColor=t.wallpaper,o?(n.style.backgroundImage=Wc(o.url),n.style.backgroundSize="220px auto",n.style.backgroundPosition="0 0"):(n.style.backgroundImage=_u[t.pattern]??"none",n.style.backgroundSize=t.pattern===1?"44px 44px":t.pattern===3?"60px 60px":"auto",n.style.backgroundPosition=t.pattern===3?"0 0, 30px 30px":"0 0");const i=t.floorTile?op[t.floorTile]:void 0;s.style.backgroundColor=t.floor,s.style.backgroundImage=i?`${Wc(i.url)}, linear-gradient(rgba(0,0,0,.06), transparent 50%)`:$u,s.style.backgroundSize=i?"180px auto, auto":"auto",M("mmWall").style.background=t.wallpaper,M("mmFloor").style.background=t.floor,Lu(e)}function gr(e){const n=e.rooms[e.currentRoom].items.filter(o=>Me[o.kind]).map(o=>{const i=Me[o.kind];return`<i style="left:${o.x/ue*100}%;top:${(so(i,o.y)-pt(i)*Ke(o)/2)/We*100}%"></i>`}).join(""),s=e.characters.filter(o=>o.room===e.currentRoom).map(o=>{const i=Mt(e.currentRoom,Et(o),o);return`<b style="left:${i.x/ue*100}%;top:${(i.y-90)/We*100}%;background:${o.shirt}"></b>`}).join("");M("mmDots").innerHTML=n+s}function Mu(e){const t=yu();Ic=t?"c":"f",document.body.classList.toggle("tabs-compact",t),M("tabs").innerHTML=Ad.map(n=>{const s=t?QE[n.id]??n.name:n.name;return`<button class="tab ${e.currentRoom===n.id||e.currentRoom==="backyard"&&n.id==="living"?"on":""}" data-room="${n.id}" style="--c:${n.color}" aria-label="${n.name}">${t?zE:""}${s}</button>`}).join(""),requestAnimationFrame(()=>{GE(),zd()})}function zd(){const e=document.getElementById("tabs");if(!e)return;const t=e.scrollWidth-e.clientWidth;e.classList.toggle("fadeL",t>2&&e.scrollLeft>2),e.classList.toggle("fadeR",t>2&&e.scrollLeft<t-2)}function GE(){const e=document.getElementById("tabs"),t=e?.querySelector(".tab.on");if(!e||!t||e.scrollWidth<=e.clientWidth+2)return;const n=t.offsetLeft-e.offsetLeft,s=n+t.offsetWidth;n<e.scrollLeft+24?e.scrollLeft=Math.max(0,n-24):s>e.scrollLeft+e.clientWidth-24&&(e.scrollLeft=s-e.clientWidth+24)}function oo(e,t,n,s,o){e.style.left=(t-s/2)/ue*100+"%",e.style.top=(n-o)/We*100+"%",e.style.width=s/ue*100+"%",e.style.height=o/We*100+"%"}function qd(e,t){let n=e.w*t,s=pt(e)*t;if((e.kind==="kennel"||e.kind==="cat-tower")&&document.body.classList.contains("phone")){const o=Math.max(.2,bt()||1),i=44*ue/(Math.max(1,de)*o),a=44/o;n<i&&(n=i),s<a&&(s=a)}return{w:n,h:s}}function Jt(e){const t=e.rooms[e.currentRoom],n=new Set;for(const s of t.items){const o=Me[s.kind];if(!o)continue;n.add(s.id);let i=X.querySelector(`.item[data-id="${s.id}"]`);i||(i=document.createElement("div"),i.className="item",i.dataset.id=s.id,i.innerHTML=`<div class="inner">${mn(o,!0)}</div>`,X.appendChild(i),i.addEventListener("pointerdown",l=>cC(i,l))),i.dataset.kind=s.kind,i.classList.toggle("is-light",q9(s.kind,!!o.light));const a=qd(o,Ke(s));oo(i,s.x,so(o,s.y),a.w,a.h);const r=1e3+s.z;i.style.zIndex=String(r),i.style.setProperty("--iz",String(r)),i.classList.toggle("flipped",s.flip),i.classList.toggle("sel",it===s.id)}X.querySelectorAll(".item").forEach(s=>{n.has(s.dataset.id)||s.remove()}),Lu(e),eC(),Zd(),Pu(e),gr(e),ss()}function Zd(){const e=E.get(),t=FE(),n=new Set;t.forEach((s,o)=>{const i=e.rooms[e.currentRoom]?.items.find(p=>p.id===o),a=i&&Me[i.kind],r=i&&NE(i.kind);if(!i||!a||!r)return;n.add(o);let l=X.querySelector(`.seatFront[data-id="${o}"]`);l||(l=document.createElement("div"),l.className="seatFront",l.dataset.id=o,X.appendChild(l));const c=X.querySelector(`.item[data-id="${o}"] .inner`),d=l.querySelector(".inner");(!d||c&&d.innerHTML!==c.innerHTML)&&(l.innerHTML=`<div class="inner">${c?c.innerHTML:mn(a,!0)}</div>`),l.className="seatFront "+r+(i.flip?" flipped":"");const f=qd(a,Ke(i));oo(l,i.x,so(a,i.y),f.w,f.h),l.style.zIndex=String(1e3+i.z+3)}),X.querySelectorAll(".seatFront").forEach(s=>{n.has(s.dataset.id||"")||s.remove()})}let Xs=!1,Xp=0;function Nd(e){performance.now()-Xp<80||(Xp=performance.now(),TS(e))}function YE(e,t){const n=j.querySelector(".yardDoor");if(!n)return null;const s=o=>{if(!o)return!1;const i=o.getBoundingClientRect();return i.width>2&&i.height>2&&e>=i.left&&e<=i.right&&t>=i.top&&t<=i.bottom};return s(n.querySelector(".yardHintLabel"))||s(n.querySelector(".doorArt"))||s(n)?n:null}function KE(e){e.addEventListener("pointerdown",t=>{if(t.button!==0)return;t.stopPropagation();const n=e.dataset.yardGo==="backyard"?"backyard":"living",s=t.clientX,o=t.clientY,i=t.pointerId;Xs=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),Xs=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),Nd(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)})}j.addEventListener("pointerdown",e=>{if(e.button!==0)return;const t=YE(e.clientX,e.clientY);if(!t||e.target instanceof Node&&t.contains(e.target))return;e.stopPropagation(),e.preventDefault();const n=t.dataset.yardGo==="backyard"?"backyard":"living",s=e.clientX,o=e.clientY,i=e.pointerId;Xs=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),Xs=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),Nd(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)},!0);function XE(e,t){return e.width>2&&t.width>2&&e.left<t.right-1&&e.right>t.left+1&&e.top<t.bottom-1&&e.bottom>t.top+1}function Jp(e){const t=e.getBoundingClientRect();let n=0;X.querySelectorAll(".item").forEach(s=>{if(s.classList.contains("is-light"))return;const o=Me[s.dataset.kind||""];if(!o||o.wall||!XE(s.getBoundingClientRect(),t))return;const i=parseInt(s.style.zIndex||"0",10)||0;i>n&&(n=i)}),e.style.zIndex=n?String(n+2):"2"}function Lu(e){const t=e.rooms[e.currentRoom];XL(M("scenery"),e.currentRoom,t.items),M("scenery").querySelectorAll(".yardDoor").forEach(o=>o.remove());const n=e.currentRoom==="living"?"backyard":e.currentRoom==="backyard"?"living":"",s=X.querySelector(".yardDoor");if(!n)X.querySelectorAll(".yardDoor").forEach(o=>o.remove());else if(!s||s.dataset.yardGo!==n){X.querySelectorAll(".yardDoor").forEach(i=>i.remove()),X.insertAdjacentHTML("beforeend",R7(n==="backyard"?"living":"yard"));const o=X.querySelector(".yardDoor");o&&KE(o)}j.classList.toggle("room-yard",e.currentRoom==="backyard"),$r(),Xs||Gn()}const Bt=new Map;function JE(e){const t=Ki(e),n=gs*t,s=yn*t,o=Yr(e,Fr(Et(e)?.pose)),i=e.look2?.85:1;return["left","right"].map(a=>{const r=e.held[a],l=r&&Me[r.kind];if(!r||!l)return"";const c=Ke(r),d=Math.min(.7,120*t/Math.max(l.w,pt(l))/c)*i,f=l.w*c*d,p=pt(l)*c*d,g=o[a].x/100*n,b=o[a].y/160*s;return`<div class="held ${r.flip?"flipped":""}" data-hand="${a}" style="left:${(g-f/2)/n*100}%;top:${(b-p*.62)/s*100}%;width:${f/n*100}%;height:${p/s*100}%"><div class="inner">${mn(l)}</div></div>`}).join("")}function eC(){let e=X.querySelector("#skyPuddles");e||(e=document.createElement("div"),e.id="skyPuddles",e.className="skyPuddles"),X.appendChild(e);const t=[...X.querySelectorAll(".item.is-light")];for(;e.children.length>t.length;)e.lastElementChild.remove();for(;e.children.length<t.length;)e.appendChild(document.createElement("i"));t.forEach((n,s)=>{const o=e.children[s],i=parseFloat(n.style.left),a=parseFloat(n.style.top),r=parseFloat(n.style.width),l=parseFloat(n.style.height),c=n.dataset.kind==="window"||n.dataset.kind==="tv";o.style.left=i-.6*r+"%",o.style.top=a-(c?.38:.5)*l+"%",o.style.width=2.2*r+"%",o.style.height=2*l+"%",o.style.zIndex=String(parseInt(n.style.zIndex||"1000",10))})}let tl=()=>{};function wi(e){const t=e.baby;return t&&t.spot==="arms"&&t.holder?t.holder:""}const Nn=new Map;function Eu(e){for(const[t,n]of Nn)t.indexOf(e+":")===0&&(n.remove(),Nn.delete(t))}function Cu(e,t){const n=e+":"+t,s=Nn.get(n);s&&(s.remove(),Nn.delete(n))}function Su(e,t,n,s,o){const i=e+":"+t;for(const[r,l]of Nn)r.indexOf(e+":")===0&&r!==i&&(l.remove(),Nn.delete(r));let a=Nn.get(i);if((!a||!a.isConnected)&&(a=document.createElement("div"),a.className="cradle-front",a.dataset.for=t,a.innerHTML='<div class="inner"></div>',X.appendChild(a),Nn.set(i,a)),a.dataset.arm!==s){const r=a.querySelector(".inner");r&&(r.innerHTML=s),a.dataset.arm=s}a.style.left=n.style.left,a.style.top=n.style.top,a.style.width=n.style.width,a.style.height=n.style.height,a.style.zIndex=String(5e3+Math.round(o)+4),a.classList.toggle("flipped",n.classList.contains("flipped")),a.classList.toggle("pose-sit",n.classList.contains("pose-sit")),a.classList.toggle("pose-lie",n.classList.contains("pose-lie")),a.classList.toggle("pose-lie-r",n.classList.contains("pose-lie-r"))}function en(e){const t=e.characters.filter(n=>n.room===e.currentRoom);for(const[n,s]of Bt)t.some(o=>o.id===n)||(s.remove(),Bt.delete(n));for(const n of t){let s=Bt.get(n.id);s||(s=document.createElement("div"),s.className="char",s.dataset.cid=n.id,s.innerHTML='<div class="inner"></div><div class="hands"></div>',X.appendChild(s),Bt.set(n.id,s),pC(s));const o=Et(n),i=o?.pose??null,a=wi(e)===n.id,r=ym(n)+(i||"")+(a?"h":"");s.dataset.look!==r&&(s.querySelector(".inner").innerHTML=kt(n,i,a),s.dataset.look=r),s.classList.toggle("holding",a);const l=JSON.stringify([n.held.left?.id,n.held.left?.flip,n.held.right?.id,n.held.right?.flip,n.size,i]);s.dataset.held!==l&&(s.querySelector(".hands").innerHTML=JE(n),s.dataset.held=l);const c=Ki(n),d=Mt(e.currentRoom,o,n);if(oo(s,d.x,d.y,gs*c,yn*c),s.style.zIndex=String(o?1e3+(e.rooms[e.currentRoom].items.find(p=>p.id===o.item)?.z??0)+1+o.n:5e3+Math.round(n.y)),s.classList.toggle("flipped",n.flip),s.classList.toggle("pose-sit",i==="sit"),s.classList.toggle("pose-lie",i==="lie"),s.classList.toggle("pose-lie-r",i==="lie"&&!!e.rooms[e.currentRoom].items.find(p=>p.id===o?.item)?.flip),s.classList.toggle("active",n.id===Be),ji(s,n,n.id===Be),s.classList.toggle("pose-swing",At?.id===n.id),a){const p=_g(n,i);p?Su("doll",n.id,s,p,d.y):Cu("doll",n.id)}const f=Yr(n);s.style.setProperty("--hx-l",f.left.x+"%"),s.style.setProperty("--hx-r",f.right.x+"%")}(wi(e)===""||!t.some(n=>n.id===wi(e)))&&Eu("doll"),ss(),gr(e),tl()}function ka(){const e=j.getBoundingClientRect(),t=e.width/Math.max(1,de),n=6,o=document.body.classList.contains("phone")?1/Math.max(.2,t):1,i=xe.offsetWidth,a=xe.offsetHeight,r=parseFloat(xe.style.left)/100*ue,l=parseFloat(xe.style.top)/100*We,c=xe.classList.contains("below"),d=r,f=c?l+a/2:l-a/2,p=o*i/2,g=o*a/2,b=_=>e.left+(n+_-ce)*t,m=_=>e.top+(n+_)*t,v=b(d-p),y=b(d+p),u=m(f-g),w=m(f+g);return{left:v,right:y,top:u,bottom:w,width:y-v,height:w-u}}function tC(){const e=j.getBoundingClientRect(),t=4;let n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t,o=Math.max(e.top,0)+t,i=Math.min(e.bottom,window.innerHeight)-t;for(const a of["nudgeL","nudgeR"]){const r=M(a);if(!r||r.classList.contains("off")||r.offsetParent===null)continue;const l=r.getBoundingClientRect();l.width<2||l.height<2||(a==="nudgeL"?n=Math.max(n,l.right+4):s=Math.min(s,l.left-4))}return s-n<48&&(n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t),{left:n,right:s,top:o,bottom:i}}function wa(e,t){xe.style.left=e/ue*100+"%",xe.style.top=t/We*100+"%"}function Pu(e){const t=it&&e.rooms[e.currentRoom].items.find(m=>m.id===it);if(Ae.isPlay()||!t||!Me[t.kind]){xe.classList.add("hidden"),xe.classList.remove("below"),xe.style.maxWidth="";return}const n=Me[t.kind],s=so(n,t.y),o=s-pt(n)*Ke(t),i=12;xe.classList.remove("hidden"),xe.style.maxWidth="",xe.classList.remove("below"),wa(t.x,o-i);const a=tC();ka().top<a.top&&(xe.classList.add("below"),wa(t.x,s+i));let r=ka();const l=a.right-a.left;if(r.width>l-2&&l>60){const m=xe.offsetWidth*((l-8)/Math.max(1,r.width));xe.style.maxWidth=Math.max(76,m)+"px",!xe.classList.contains("below")&&ka().top<a.top&&(xe.classList.add("below"),wa(t.x,s+i)),r=ka()}let c=0,d=0;if(r.left<a.left&&(c=a.left-r.left),r.right+c>a.right&&(c=a.right-r.right),r.width>a.right-a.left&&(c=(a.left+a.right)/2-(r.left+r.right)/2),r.top<a.top&&(d=a.top-r.top),r.bottom+d>a.bottom&&(d=a.bottom-r.bottom),Math.abs(c)>=.5||Math.abs(d)>=.5){const m=j.getBoundingClientRect().width/Math.max(1,de)||1,v=parseFloat(xe.style.left)/100*ue+c/m,y=parseFloat(xe.style.top)/100*We+d/m;wa(v,y)}const f=zs(t.size),p=Os.indexOf(f),g=xe.querySelector('[data-a="smaller"]'),b=xe.querySelector('[data-a="bigger"]');g&&(g.disabled=p<=0),b&&(b.disabled=p>=Os.length-1)}function Tu(e){const t=M("soundIco");t&&(t.innerHTML=e.soundOn?Qt.soundOn:Qt.soundOff),M("btnSound").setAttribute("aria-label",e.soundOn?"Sound on":"Sound off"),my(e.soundOn)}function Js(){const e=E.get();X.innerHTML="",Bt.clear(),Mu(e),xu(e),Jt(e),en(e),Tu(e);const t=e.characters.find(o=>o.room===e.currentRoom),n=k&&ke(),s=n&&n.where==="house"?n.x:t?.x;Xr(),je(pr[e.currentRoom]??Od(s!==void 0?s-de/2:Ao)),Lt(),bn(),document.body.classList.contains("phone")&&T==="house"&&requestAnimationFrame(()=>uu())}const eh=200,nC=2,ur=[];let Uc=0,Wa=!1,Ql=0;const Ru=new Map;function Vc(e){const t=document.getElementById("shelf");if(!t)return!1;const n=t.getBoundingClientRect();if(n.width<2||n.height<2)return!1;const s=e.getBoundingClientRect();return s.right>n.left-eh&&s.left<n.right+eh&&s.bottom>n.top-8&&s.top<n.bottom+8}const sC=3,mr=new Map;function Qc(e,t){const n=(mr.get(t)||0)+1;if(mr.set(t,n),delete e.dataset.shelfq,n>=sC){delete e.dataset.artq;return}setTimeout(Fd,300*n)}function mo(){Uc--,!Wa&&Bu()}function th(e,t){const n=document.createElement("div");n.innerHTML=mn(t);const s=n.querySelector("img.artimg");if(!s){delete e.dataset.artq,mo();return}const o=mr.get(t.kind)||0;if(o>0){const l=s.getAttribute("src")||"";s.setAttribute("src",l+(l.indexOf("?")>=0?"&":"?")+"retry="+o)}let i=!1;const a=l=>{if(!i){if(i=!0,l){const c=Array.prototype.slice.call(n.childNodes);if(Ru.set(t.kind,c),mr.delete(t.kind),e.isConnected&&e.dataset.artq==="1"){delete e.dataset.artq,e.innerHTML="";for(let d=0;d<c.length;d++)e.appendChild(c[d])}else{const d=document.querySelector(`#shelf button.thing[data-artq="1"][data-kind="${CSS.escape(t.kind)}"]`);if(d){delete d.dataset.artq,d.innerHTML="";for(let f=0;f<c.length;f++)d.appendChild(c[f])}}}else e.isConnected&&e.dataset.artq==="1"&&Qc(e,t.kind);mo()}},r=()=>{typeof s.decode=="function"?s.decode().then(()=>a(!0),()=>a(!0)):a(!0)};s.onload=r,s.onerror=()=>a(!1),s.complete&&s.naturalWidth>0&&r()}function Bu(){if(!Wa){for(Wa=!0;Uc<nC&&ur.length;){const e=ur.shift();if(!e||!e.isConnected||e.dataset.artq!=="1")continue;if(!Vc(e)){delete e.dataset.shelfq;continue}const t=e.dataset.kind||"",n=Me[t];if(!n){delete e.dataset.artq;continue}if(Uc++,Ns(t)){th(e,n);continue}h(()=>Promise.resolve().then(()=>yd),void 0).then(s=>s.loadArtKinds([t])).then(()=>{if(!e.isConnected||e.dataset.artq!=="1"){mo();return}if(!Ns(t)){Qc(e,t),mo();return}if(!Vc(e)){delete e.dataset.shelfq,mo();return}th(e,n)},()=>{e.isConnected&&e.dataset.artq==="1"&&Qc(e,t),mo()})}Wa=!1}}function oC(){const e=document.getElementById("shelf");if(!e||!Eo())return;const t=e.querySelectorAll('button.thing[data-artq="1"]');for(let n=0;n<t.length;n++){const s=t[n];s.dataset.shelfq!=="1"&&Vc(s)&&(s.dataset.shelfq="1",ur.push(s))}Bu()}function Fd(){Ql||(Ql=requestAnimationFrame(()=>{Ql=0,oC()}))}function iC(){const e=document.getElementById("shelf");!e||e.dataset.artscroll==="1"||(e.dataset.artscroll="1",e.addEventListener("scroll",Fd,{passive:!0}))}function Au(){const e=document.getElementById("shelf");if(!e||!Eo())return;const t=e.querySelectorAll("button.thing[data-kind]");for(let n=0;n<t.length;n++){const s=t[n],o=s.dataset.kind||"";s.querySelector("img.artimg")||!(mf(o)||Ns(o))||(s.dataset.artq="1")}Fd()}function Du(){if(Pt==="__people"){Ht();return}Au()}function aC(e){const t=Ih();if(!k)return;const n=ke();if(!n||n.where!=="house"||!n.seat)return;let s="";if(e.type==="item/flip"||e.type==="item/delete")s=e.id;else if(e.type==="item/move"&&e.stand)s=e.id;else if(e.type==="char/hold")s=e.itemId;else return;if(!s||n.seat.id!==s||e.room!==n.room)return;const o=t&&t.id===s?t:null,i=o?Mi(o.kind)*(o.scale||1):Mi("bed"),a=ad(o?o.x:n.x,i,n.x);gn.delete("p:"+k.pid);const{seat:r,...l}=n;Ye({...l,x:a.x,y:a.y})}E.subscribe((e,t)=>{switch(aC(t),t.type){case"room/switch":{const n=j.classList.contains("room-yard");k&&Re!==J&&mC(t.room),Js(),Ht(),(t.room==="backyard"||n||Ae.isPlay()&&Math.min(window.innerWidth,window.innerHeight)<500)&&us(),_0(t.room);break}case"item/add":Jt(e),OE(),CS();break;case"game/reset":Js();break;case"room/wallpaper":case"room/floor":case"room/pattern":case"room/wallTile":case"room/floorTile":xu(e);break;case"char/update":case"char/move":t.type==="char/move"&&At&&!li&&t.id===At.id&&(At=null),en(e),Zd(),$r(),T==="ranch"?as():T==="park"&&eo();break;case"char/add":case"char/delete":case"char/hold":case"char/release":Jt(e),en(e),Lt(),Pt==="__people"&&Ht();break;case"item/move":case"item/flip":case"item/delete":case"item/size":Jt(e),en(e),Lt();break;case"baby/meet":case"baby/name":case"baby/care":case"baby/hold":case"baby/place":case"baby/ease":en(e),Lt();break;case"settings/sound":Tu(e);break;default:Jt(e)}});function Ge(e){if(!e)return;const t=e.querySelector(":scope > .inner")??e;t.classList.remove("bounce"),t.offsetWidth,t.classList.add("bounce")}function jd(e,t,n=7){const s=M("fx"),o=["#ffd166","#ff8fab","#8ecae6","#80ed99","#c9a0dc"];for(let i=0;i<n;i++){const a=document.createElement("div");a.className="spark";const r=Math.PI*2*i/n+Math.random()*.5,l=40+Math.random()*30;a.style.left=e+"px",a.style.top=t+"px",a.style.background=o[i%o.length],a.style.setProperty("--dx",Math.cos(r)*l+"px"),a.style.setProperty("--dy",Math.sin(r)*l+"px"),s.appendChild(a),setTimeout(()=>a.remove(),650)}}const nl=e=>{const t=e?.getBoundingClientRect();t&&jd(t.left+t.width/2,t.top+t.height/2)};function Gd(e,t){jd(e,t,10),P.pop()}function yr(e){Bt.forEach((t,n)=>{t.classList.toggle("hold-target",!!e&&e.c.id===n),t.dataset.hand=e&&e.c.id===n?e.hand:""})}function Iu(e,t){E.dispatch({type:"char/hold",id:e.c.id,hand:e.hand,room:e.c.room,itemId:t}),it=null,Jt(E.get());const n=Bt.get(e.c.id);Ge(n),nl(n?.querySelector(`.held[data-hand="${e.hand}"]`)),P.sparkle()}const un=new Map;let Nt=!1,br=0;const Yd=()=>[...un.values()].reduce((e,t)=>e+t,0)/un.size;j.addEventListener("pointerdown",e=>{e.pointerType==="touch"&&(un.set(e.pointerId,e.clientX),un.size>=2&&(Nt=!0,br=Yd(),Xr(),xe.classList.add("hidden")))},!0);window.addEventListener("pointermove",e=>{if(un.has(e.pointerId)&&(un.set(e.pointerId,e.clientX),Nt&&un.size>=2)){const t=Yd();je(ce-(t-br)/bt()),br=t}},!0);const Hu=e=>{un.delete(e.pointerId),un.size<2&&Nt&&(un.size===0?Nt=!1:br=Yd())};window.addEventListener("pointerup",Hu,!0);window.addEventListener("pointercancel",Hu,!0);const ho=80;function rC(e,t){const n=j.getBoundingClientRect();return t<n.top-40||t>n.bottom+10?0:e<n.left+ho?-Math.min(1,(n.left+ho-e)/ho)*16:e>n.right-ho?Math.min(1,(e-(n.right-ho))/ho)*16:0}function ms(e,t){let n=e,s=0;const o=()=>{const r=Nt?0:rC(n.clientX,n.clientY);if(r){const l=ce;je(ce+r),ce!==l&&t.onMove(n)}s=requestAnimationFrame(o)};t.edgeScroll!==!1&&(s=requestAnimationFrame(o));const i=r=>{r.pointerId===e.pointerId&&(r.preventDefault(),n=r,Nt||t.onMove(r))},a=r=>{r.pointerId===e.pointerId&&(cancelAnimationFrame(s),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",a),t.onUp(r))};window.addEventListener("pointermove",i,{passive:!1}),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a)}function lC(e){return new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,pointerId:e.pointerId,pointerType:e.pointerType,button:e.button,buttons:e.buttons,isPrimary:e.isPrimary})}function cC(e,t){const n=t.target,s=n&&n.closest?n.closest("img.artimg"):null;if(s&&!xd(s,t.clientX,t.clientY)){const o=q7(t.clientX,t.clientY),i=o?.closest(".item"),a=o?.closest(".char");i&&i!==e?(t.stopPropagation(),zc(i,t)):a&&(t.stopPropagation(),a.dispatchEvent(lC(t)));return}zc(e,t)}function dC(e,t){if(t.preventDefault(),t.stopPropagation(),Nt)return;const n=e.dataset.id,s=t.clientX,o=t.clientY;ms(t,{edgeScroll:!1,onMove(){},onUp(i){Math.hypot(i.clientX-s,i.clientY-o)>6||jC(e,n)}})}function zc(e,t,n=!1){if(t.preventDefault(),t.stopPropagation(),Nt)return;if(Ae.isPlay()){dC(e,t);return}if(!Ot()){Hn(e);return}const s=E.get(),o=s.currentRoom,i=e.dataset.id,a=s.rooms[o].items.find(p=>p.id===i);if(!a)return;const r=Me[a.kind],l=Dt(t.clientX,t.clientY),c={x:a.x-l.x,y:a.y-l.y};let d=n,f=null;it=i,E.dispatch({type:"item/front",room:o,id:i}),e.classList.add("lifted"),P.pick(),ms(t,{onMove(p){const g=Dt(p.clientX,p.clientY);Math.hypot(g.x-l.x,g.y-l.y)>6&&(d=!0),d&&(xe.classList.add("hidden"),Ia.classList.add("show")),Ia.classList.toggle("hot",Kp(p.clientX,p.clientY));const b=r.w*Ke(a)/2;E.dispatch({type:"item/move",room:o,id:i,x:Math.max(b*.6,Math.min(ue-b*.6,g.x+c.x)),y:iu(r,g.y+c.y),...d?{stand:!0}:{}}),d&&xe.classList.add("hidden"),f=d&&r.holdable?vu(g):null,yr(f)},onUp(p){if(e.classList.remove("lifted"),Ia.classList.remove("show","hot"),yr(null),d&&Kp(p.clientX,p.clientY)){it=null,E.dispatch({type:"item/delete",room:o,id:i}),Gd(p.clientX,p.clientY);return}if(d&&f){Iu(f,i);return}d?(P.drop(),Ge(e)):(P.click(),o0(i),BL(e)),Jt(E.get())}})}function fC(e,t,n){if(n.preventDefault(),n.stopPropagation(),Nt||Ae.isPlay())return;const s=e.dataset.cid,o=t.dataset.hand,i=E.get().characters.find(d=>d.id===s),a=i?.held[o];if(!i||!a)return;const r=t.getBoundingClientRect(),l=Dt(r.left+r.width/2,r.bottom);E.dispatch({type:"char/release",id:s,hand:o,x:l.x,y:l.y});const c=X.querySelector(`.item[data-id="${a.id}"]`);c&&zc(c,n,!0)}function pC(e){e.addEventListener("pointerdown",t=>{const n=t.target.closest(".held"),s=n?.querySelector("img.artimg"),o=!!s&&!xd(s,t.clientX,t.clientY);if(n&&!o){if(Ae.isPlay()){t.preventDefault(),t.stopPropagation();return}if(!Ot()){t.stopPropagation(),Hn(e);return}return fC(e,n,t)}if(t.preventDefault(),t.stopPropagation(),Nt||Ae.isPlay()&&!Qd())return;if(!Ot()){Hn(e);return}it=null,Jt(E.get());const i=e.dataset.cid;Be=i;const a=E.get(),r=a.characters.find(g=>g.id===i);if(!r)return;const l=Dt(t.clientX,t.clientY),c=Mt(a.currentRoom,Et(r),r),d={x:c.x-l.x,y:c.y-l.y};let f=c.x,p=!1;e.classList.add("lifted"),P.pick(),en(E.get()),Ii=!0,ms(t,{onMove(g){const b=Dt(g.clientX,g.clientY),m=b.x+d.x;if(Math.hypot(b.x-l.x,b.y-l.y)>6&&(p=!0),!p)return;const v=E.get().characters.find(u=>u.id===i);if(!v)return;if(Math.abs(m-f)>3){const u=m<f;u!==v.flip&&E.dispatch({type:"char/update",id:i,patch:{flip:u}}),f=m}const y=Math.max(Gs+40,b.y+d.y);ri(i,a.currentRoom,m,y,null),Ae.isPlay()&&(Di=hr(g.clientX,g.clientY)?.id??null),document.querySelectorAll(".tab").forEach(u=>u.classList.remove("drop")),document.elementFromPoint(g.clientX,g.clientY)?.closest(".tab:not(.on)")?.classList.add("drop")},onUp(g){Ii=!1,Di=null,e.classList.remove("lifted"),document.querySelectorAll(".tab").forEach(w=>w.classList.remove("drop"));const b=document.elementFromPoint(g.clientX,g.clientY)?.closest("[data-room]"),m=E.get().characters.find(w=>w.id===i);if(!p||!m){P.click();return}if(b&&b.dataset.room!==a.currentRoom){const w=b.getBoundingClientRect();jd(w.left+w.width/2,w.top+w.height/2,9),P.swish(),ri(i,b.dataset.room,m.x,m.y,null);return}const v=Dt(g.clientX,g.clientY),y=v.x+d.x,u=Math.max(Gs+40,v.y+d.y);if(Ae.isPlay()){const w=hr(g.clientX,g.clientY),_=xi({mode:"play",via:"drag",releaseX:y,releaseY:u,piece:w?el(w):null,occupied:Hi(i)});ri(i,a.currentRoom,_.x,_.y,_.seat)}else ri(i,a.currentRoom,y,u,null);P.drop(),Ge(e),requestAnimationFrame(()=>Ks(!0))}})})}function hC(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Ae.isPlay()){n.stopPropagation();return}if(!Ot()){Hn(e);return}const s=document.createElement("div");s.className="ghost",s.innerHTML=mn(t),document.body.appendChild(s);const o=Math.max(1,60/(Math.max(t.w,pt(t))*bt())),i=t.w*bt()*o,a=pt(t)*bt()*o;s.style.width=i+"px",s.style.height=a+"px";let r=null;const l=f=>{s.style.left=f.clientX-i/2+"px",s.style.top=f.clientY-a*.8+"px",r=t.holdable&&Oc(f.clientX,f.clientY)?vu(Dt(f.clientX,f.clientY)):null,yr(r)};l(n),P.pick(),e.classList.add("pressed");const c=n.clientX,d=n.clientY;ms(n,{onMove:l,onUp(f){s.remove(),e.classList.remove("pressed"),yr(null);const p=E.get().currentRoom,g=Math.hypot(f.clientX-c,f.clientY-d)<8;let b,m;if(g)b=ce+380+Math.random()*240,m=t.wall?Math.min(ou,200+pt(t)/2):500+Math.random()*40;else if(Oc(f.clientX,f.clientY)){const u=Dt(f.clientX,f.clientY);b=u.x,m=iu(t,u.y+pt(t)*.2)}else return;const v={id:Hc(t.kind.replace(/[^a-z0-9-]/gi,"")),kind:t.kind,x:b,y:m,flip:!1,z:0,scale:1};if(p!=="backyard"&&E.get().rooms[p].items.length===0){const u=YL(w=>Hc(w),p);for(let w=0;w<u.length;w++)E.dispatch({type:"item/add",room:p,item:u[w]})}if(E.dispatch({type:"item/add",room:p,item:v}),!g&&r){Iu(r,v.id);return}it=v.id,Jt(E.get());const y=X.querySelector(`.item[data-id="${v.id}"]`);Ge(y),nl(y),P.sparkle()}})})}function gC(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Ae.isPlay())return;if(!Ot()){Hn(e);return}const s=E.get().characters.find(p=>p.id===t);if(!s)return;const o=Ki(s),i=gs*o*bt(),a=yn*o*bt(),r=document.createElement("div");r.className="ghost",r.innerHTML=kt(s),r.style.width=i+"px",r.style.height=a+"px",document.body.appendChild(r);const l=p=>{r.style.left=p.clientX-i/2+"px",r.style.top=p.clientY-a*.85+"px"},c=n.clientX,d=n.clientY;let f=!1;r.style.visibility="hidden",ms(n,{onMove(p){Math.hypot(p.clientX-c,p.clientY-d)>8&&(f=!0,r.style.visibility=""),l(p)},onUp(p){if(r.remove(),!f){P.click(),Be=t,To("dress");return}if(!Oc(p.clientX,p.clientY))return;const g=Dt(p.clientX,p.clientY),b=E.get().currentRoom;E.dispatch({type:"char/move",id:t,room:b,x:g.x,y:Math.max(Gs+40,g.y+yn*o*.15)}),Be=t,en(E.get());const m=Bt.get(t);Ge(m),nl(m),P.sparkle()}})})}function Ou(){if(!Ot())return Hn(null),null;const e=E.get();if(e.characters.length>=Do)return null;const t=Hc("c"),n=Or();E.dispatch({type:"char/add",char:rs({id:t,...Hr(n),look2:n,room:e.currentRoom,x:ce+300+Math.random()*400,y:520+Math.random()*40})}),Be=t,en(E.get());const s=Bt.get(t);return Ge(s),nl(s),P.sparkle(),t}function uC(){return Hd==="all"?"all":E.get().currentRoom}function Ht(){const e=E.get().currentRoom,t=uC(),n=Ad.find(l=>l.id===e)?.name??"This room",s=t==="all";M("roomFilter").innerHTML=`<button class="rf ${s?"on":""}" data-rf="${s?"room":"all"}">${s?"Just "+n:"All rooms"}</button>`;const o=Ul("secrets").length>0,i=Po.filter(l=>l.id!=="secrets"&&(l.kind==="people"||l.kind==="pack"&&e!=="backyard"||Ul(l.id).length));!(Pt==="secrets"&&o)&&!i.some(l=>l.id===Pt)&&(Pt=i[1]?.id??"__people"),M("cats").innerHTML=i.map(l=>`<button class="cat ${l.kind} ${l.id===Pt?"on":""}" data-cat="${l.id}" aria-label="${l.name}" title="${l.name}">${l.kind==="people"?EE:l.kind==="pack"?`<span class="packicon">${mn(Me[l.icon])}</span><span class="packname">${l.name}</span>`:mn(Me[l.icon])}</button>`).join("")+(o?`<button class="cat secretTab ${Pt==="secrets"?"on":""}" data-cat="secrets" aria-label="Secrets" title="Secrets">🎁</button>`:"");const a=M("shelf");if(ur.length=0,a.innerHTML="",!Ot()){a.innerHTML='<div class="empty locked">🔒 This house is look-only right now</div>';return}if(Pt==="__people"){const l=E.get(),c=ts();if(c){const d=document.createElement("button");d.className="thing person me",d.setAttribute("aria-label","Me"),d.innerHTML=`<div class="face">${kt(c)}</div><span class="meStar">★</span>`,d.addEventListener("click",()=>{P.click(),Be=ft,To("dress")}),a.appendChild(d)}for(const d of l.characters){const f=document.createElement("button");f.className="thing person",f.setAttribute("aria-label","Character"),f.innerHTML=`<div class="face">${kt(d)}</div><span class="where" style="background:${ru(d.room)}"></span>`,a.appendChild(f),gC(f,d.id)}if(l.characters.length<Do){const d=document.createElement("button");d.className="thing add",d.setAttribute("aria-label","New character"),d.innerHTML=lu,d.addEventListener("click",()=>{Ou()&&(Ht(),To("dress"))}),a.appendChild(d)}return}const r=Ul(Pt);r.length||(a.innerHTML='<div class="empty">Nothing here yet!</div>');for(const l of r){const c=document.createElement("button");c.className="thing",c.setAttribute("aria-label",l.name),c.dataset.kind=l.kind;const d=Eo()&&Ns(l.kind)?Ru.get(l.kind):void 0;if(d)for(let f=0;f<d.length;f++)c.appendChild(d[f]);else c.innerHTML=U7(l,mf(l.kind));a.appendChild(c),hC(c,l)}a.scrollLeft=0,Kd(),iC(),Au()}function Kd(){const e=document.querySelector(".drawerTop"),t=document.getElementById("drawerBar");!e||!t||(t.classList.toggle("more",e.scrollWidth-e.clientWidth-e.scrollLeft>6),t.classList.toggle("back",e.scrollLeft>6))}document.querySelector(".drawerTop").addEventListener("scroll",Kd,{passive:!0});window.addEventListener("resize",Kd);function nh(e,t,n){return`<div class="sw">${e.map(s=>`<button class="dot ${s===t?"on":""}" style="background:${s}" data-act="${n}" data-v="${s}"></button>`).join("")}</div>`}let Oi=null,yo=!1;function Wu(e){if(e===ft){const n=ts();if(!n||n.look2)return;Mn(ft,$i(za(n)));return}const t=E.get().characters.find(n=>n.id===e);!t||t.look2||Mn(e,{...$i(za(t)),size:t.size})}function dn(){const e=E.get(),t=M("card");if(Oi==="paint"){t.classList.remove("avCard");const n=e.rooms[e.currentRoom],s=gc.filter(a=>a.kind==="wallpaper"),o=gc.filter(a=>a.kind==="floor"),i=(a,r,l,c)=>`<button class="dot pat tile ${a.id===r?"on":""}" data-act="${l}" data-v="${a.id}" title="${a.name} (${og(a.pack)})" style="background-color:${c};background-image:${Wc(a.url)};background-size:48px auto"></button>`;t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${nh(ME,n.wallpaper,"wall")}
      <h3>Wallpaper</h3><div class="sw">${_u.map((a,r)=>`<button class="dot pat ${!n.wallTile&&r===n.pattern?"on":""}" data-act="pat" data-v="${r}" style="background-color:${n.wallpaper};background-image:${a};background-size:${r===1?"16px 16px":r===3?"20px 20px":"auto"}"></button>`).join("")}${s.map(a=>i(a,n.wallTile,"wtile",n.wallpaper)).join("")}</div>
      <h3>Floor</h3>${nh(LE,n.floor,"floor")}
      ${o.length?`<h3>Floor style</h3><div class="sw"><button class="dot pat ${n.floorTile?"":"on"}" data-act="ftile" data-v="" style="background-color:${n.floor};background-image:${$u}"></button>${o.map(a=>i(a,n.floorTile,"ftile",n.floor)).join("")}</div>`:""}`}else if(Oi==="dress"){t.classList.add("avCard");let n=e,s=ts(),o=s?rs({id:ft,...s}):null,i=Be===ft&&o?o:n.characters.find(r=>r.id===Be)??o??n.characters[0];i&&!i.look2&&Wu(i.id),n=E.get(),s=ts(),o=s?rs({id:ft,...s}):null,i=Be===ft&&o?o:n.characters.find(r=>r.id===Be)??o??n.characters[0];const a=`<div class="picker">${o?`<button class="pk me ${i?.id===ft?"on":""}" data-act="pickc" data-v="${ft}"><div class="face">${kt(o)}</div><span class="meStar">★</span></button>`:""}${n.characters.map(r=>`<button class="pk ${r.id===i?.id?"on":""}" data-act="pickc" data-v="${r.id}"><div class="face">${kt(r)}</div><span class="where" style="background:${ru(r.room)}"></span></button>`).join("")}${n.characters.length<Do?`<button class="pk add" data-act="newc">${lu}</button>`:""}</div>`;if(!i){t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${a}<div class="dress"><p class="hint">Tap + to make someone new!</p></div>`;return}Be=i.id,t.innerHTML=UM(i,a,yo,Qt.trash)}}function To(e){Oi=e,yo=!1,dn(),M("sheet").classList.remove("hidden"),P.swish()}M("sheet").addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(e.target===M("sheet")||t?.dataset.act==="close"){M("sheet").classList.add("hidden"),Oi=null,P.click(),Pt==="__people"&&Ht();return}if(!t)return;const n=E.get(),s=n.currentRoom,o=t.dataset.v,i=Be??"",a=t.dataset.act;if(a!=="delc"&&(yo=!1),a&&a.indexOf("av-")===0){const r=i===ft?ts():E.get().characters.find(d=>d.id===i);if(a==="av-costume"){r&&!r.look2&&Wu(i);const d=i===ft?ts():E.get().characters.find(f=>f.id===i);Mn(i,{costume:to(o)??null,...d?.look2?{look2:d.look2}:{},size:d?.size??"kid"}),P.sparkle(),dn(),Ge(document.querySelector(".avStage"));return}if(a==="av-surprise"){Mn(i,{...$i(Or()),size:r?.size??"kid"}),P.sparkle(),dn(),Ge(document.querySelector(".avStage"));return}const l=r?.look2??za(r??{}),c=VM(l,a,o??"");if(!c){P.click(),dn();return}Mn(i,{...$i(c),size:r?.size??"kid"}),P.sparkle(),dn(),Ge(document.querySelector(".avStage"));return}switch(a){case"wall":E.dispatch({type:"room/wallpaper",room:s,color:o});break;case"floor":E.dispatch({type:"room/floor",room:s,color:o});break;case"pat":E.dispatch({type:"room/pattern",room:s,pattern:+o});break;case"wtile":E.dispatch({type:"room/wallTile",room:s,tile:o});break;case"ftile":E.dispatch({type:"room/floorTile",room:s,tile:o||null});break;case"skin":case"hair":case"shirt":case"pants":Mn(i,{[a]:o});break;case"hs":Mn(i,{hairStyle:+o});break;case"acc":Mn(i,{acc:+o});break;case"size":{const r=i===ft?ts():E.get().characters.find(l=>l.id===i);Mn(i,{size:o,...r?.look2?{look2:r.look2}:{}}),en(E.get());break}case"pickc":Be=o,en(E.get()),P.click(),dn();return;case"newc":if(!Ou())return;break;case"delc":if(i===ft||!Ot())return;if(!yo){yo=!0,P.click(),dn();return}yo=!1;{const l=Bt.get(i)?.getBoundingClientRect();E.dispatch({type:"char/delete",id:i}),l?Gd(l.left+l.width/2,l.top+l.height/2):P.pop()}Be=E.get().characters[0]?.id??null,dn();return}P.sparkle(),dn(),Ge(document.querySelector(".preview"))});M("tabs").addEventListener("click",e=>{const t=e.target.closest("[data-room]");if(!t)return;const n=t.dataset.room;n!==E.get().currentRoom&&(it=null,P.swish(),j.classList.remove("swap"),j.offsetWidth,j.classList.add("swap"),E.dispatch({type:"room/switch",room:n}))});M("cats").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");t&&(Pt=t.dataset.cat,P.click(),Ht())});M("roomFilter").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");if(t){Pt=t.dataset.cat,P.click(),Ht();return}const n=e.target.closest("[data-rf]");n&&(Hd=n.dataset.rf==="all"?"all":"",P.click(),Ht())});xe.addEventListener("pointerdown",e=>e.stopPropagation());xe.addEventListener("click",e=>{const t=e.target.closest("[data-a]");if(!t||!it)return;if(!Ot()){Hn(null);return}const n=E.get().currentRoom,s=it,o=X.querySelector(`.item[data-id="${s}"]`);switch(t.dataset.a){case"smaller":case"bigger":{const i=E.get().rooms[n].items.find(l=>l.id===s);if(!i)break;const a=Os.indexOf(zs(i.size)),r=t.dataset.a==="smaller"?a-1:a+1;if(r<0||r>=Os.length)break;E.dispatch({type:"item/size",room:n,id:s,size:Os[r]}),P.click(),Ge(o);break}case"flip":E.dispatch({type:"item/flip",room:n,id:s}),P.swish(),Ge(o);break;case"front":E.dispatch({type:"item/front",room:n,id:s}),P.click(),Ge(o);break;case"back":E.dispatch({type:"item/back",room:n,id:s}),P.click(),Ge(o);break;case"delete":{const i=o?.getBoundingClientRect();it=null,E.dispatch({type:"item/delete",room:n,id:s}),i&&Gd(i.left+i.width/2,i.top+i.height/2);break}}});j.addEventListener("pointerdown",e=>{if(e.target.closest(".nudge"))return;Xr();const t=e.clientX,n=ce;let s=!1,o=0,i=e.clientX,a=performance.now();ms(e,{edgeScroll:!1,onMove(r){if(Math.abs(r.clientX-t)>6&&(s=!0),!s)return;const l=performance.now();o=(r.clientX-i)/Math.max(1,l-a),i=r.clientX,a=l,je(n-(r.clientX-t)/bt())},onUp(){if(!s){it&&(it=null,Jt(E.get()));return}if(Nt)return;let r=-o*16/bt();const l=()=>{Math.abs(r)<.3||(je(ce+r),r*=.92,_o=requestAnimationFrame(l))};_o=requestAnimationFrame(l)}})});j.addEventListener("wheel",e=>{e.preventDefault(),Xr(),je(ce+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/bt())},{passive:!1});M("nudgeL").addEventListener("pointerdown",e=>{e.stopPropagation(),P.swish(),Jr((Ai??ce)-de*.6)});M("nudgeR").addEventListener("pointerdown",e=>{e.stopPropagation(),P.swish(),Jr((Ai??ce)+de*.6)});const sh=M("minimap");sh.addEventListener("pointerdown",e=>{e.stopPropagation(),e.preventDefault();const t=n=>{const s=sh.getBoundingClientRect();Jr((n.clientX-s.left)/s.width*ue-de/2)};t(e),P.click(),ms(e,{edgeScroll:!1,onMove:t,onUp(){}})});M("btnPaint").addEventListener("click",()=>{if(!Ot())return Hn(null);To("paint")});M("btnDress").addEventListener("click",()=>To("dress"));M("btnSound").addEventListener("click",()=>{E.dispatch({type:"settings/sound",on:!E.get().soundOn}),P.click()});document.addEventListener("gesturestart",e=>e.preventDefault());document.addEventListener("contextmenu",e=>e.preventDefault());"serviceWorker"in navigator&&navigator.serviceWorker.register("/kids-house-game/sw.js");window.__store=E;QL({get:()=>E.get(),dispatch:e=>E.dispatch(e),subscribe:e=>E.subscribe(e),canDrift:()=>T==="house"&&Qd(),speaks:()=>!k||Re===J||k.speaksNeeds,layer:X,menuAfter:M("btnSound")});window.__items=Object.fromEntries(wn.filter(e=>e.img).map(e=>[e.kind,{w:e.w,h:pt(e),cat:e.cat,holdable:e.holdable,svg:e.img.includes(".svg")}]));window.__cam={get:()=>ce,set:je};window.__phoneShowKids=()=>at();window.__avatar={richAvatars:rr,randomLook2:Or,look2FromLegacy:za,legacyFromLook2:Hr,sanitizeLook2:Vi,handsFor:Yr};window.__frameHouseKid=()=>Ks(!0);window.__layoutNameTags=()=>Tg();window.__lie={bedArt:Vr,lieBedKinds:Um,lieOffset:Na,lieSpot:qm,box(e){const t=Me[e];return t?{w:t.w,h:pt(t)}:null}};window.__paint=()=>{Lt()};const fe=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Ot(){return!k||Re===J||k.canEdit(Se)}function Hn(e){P.pop();const t=M("houseTag");t.classList.add("show"),t.classList.remove("wiggle"),t.offsetWidth,t.classList.add("wiggle"),window.clearTimeout(kr),kr=window.setTimeout(()=>{T==="house"&&k&&!document.body.classList.contains("own-house")||t.classList.remove("show")},2e3),e&&(e.classList.remove("nope"),e.offsetWidth,e.classList.add("nope")),F("🔒 Look-only house: ask the owner to unlock it!",1800)}const ke=()=>k?.myPresence()??null,ts=()=>k?k.players.get(k.pid)?.look??null:null;function Mn(e,t){if(e===ft){const n=ts();if(!n||!k)return;k.setLook(Zi({...n,...t})),Lt(),T==="street"&&wr(),T==="park"&&eo(),T==="ranch"&&as();return}E.dispatch({type:"char/update",id:e,patch:t})}function Ye(e){k?.setPresence(e)}function Xd(e,t,n){const s=[];return k?.presence.forEach((o,i)=>{i!==k.pid&&o.where==="house"&&o.houseId===e&&o.room===t&&s.push(o)}),R0(n,s,{minX:80,maxX:ue-80,minY:Gs+60,maxY:We-20})}function mC(e){const t=ke();if(t&&t.where==="house"){const n=t.houseId?Xd(t.houseId,e,t):t;Ye({...t,room:e,x:n.x,y:n.y})}}function Uu(e){Re=e,su(e),it=null,setTimeout(()=>E0.update());for(const t of Object.keys(pr))delete pr[t];Be=e===J?e.get().characters[0]?.id??null:ft,Js(),Ht()}function Jd(e,t,n,s){return`<div class="inner">${kt(e,n,s)}</div><div class="nametag">${fe(t)}</div>`}function Lt(){const e=new Set;if(k&&Re!==J&&T==="house"){const n=E.get().currentRoom,s=[...k.presence.entries()],o=ke();o&&s.push([k.pid,o]);for(const[i,a]of s){const r=k.players.get(i);if(!r||a.where!=="house"||a.houseId!==Se||a.room!==n)continue;e.add(i);let l=As.get(i);(!l||!l.isConnected)&&(l=document.createElement("div"),l.className="char avatar "+(i===k.pid?"mine":"other"),l.dataset.pid=i,X.appendChild(l),As.set(i,l),i===k.pid?yC(l):l.addEventListener("pointerdown",y=>{y.preventDefault(),y.stopPropagation()}));const c=r.look,d=In(i,a),f=d?.pose??null,p=wi(E.get())===i,g=JSON.stringify(c)+r.nickname+(f||"")+(p?"h":"");if(l.dataset.look!==g){const y=l.querySelector(".bubble");l.innerHTML=Jd(c,r.nickname,f,p),y&&l.appendChild(y),l.dataset.look=g}l.classList.toggle("holding",p);const b=js[c.size]??1,m=Mt(n,d,a);oo(l,m.x,m.y,gs*b,yn*b);const v=d&&E.get().rooms[n].items.find(y=>y.id===d.item);if(l.style.zIndex=String(v?1e3+v.z+1+d.n:5e3+Math.round(a.y)),l.classList.toggle("flipped",a.flip),l.classList.toggle("pose-sit",f==="sit"),l.classList.toggle("pose-lie",f==="lie"),l.classList.toggle("pose-lie-r",f==="lie"&&!!v?.flip),ji(l,c,i===k.pid),p){const y=_g(c,f);y?Su("avatar",i,l,y,m.y):Cu("avatar",i)}}}const t=wi(E.get());k&&T==="house"&&t&&e.has(t)||Eu("avatar");for(const[n,s]of As)(!e.has(n)||!s.isConnected)&&(e.has(n)||s.remove(),As.delete(n));Zd(),io(),tl(),ss()}function yC(e){e.addEventListener("pointerdown",t=>{if(t.preventDefault(),t.stopPropagation(),Nt||!k)return;const n=ke();if(!n||n.where!=="house")return;const s=Dt(t.clientX,t.clientY),o=Mt(E.get().currentRoom,In(k.pid,n),n),i={x:o.x-s.x,y:o.y-s.y};let a=o.x,r=!1;e.classList.add("lifted"),P.pick(),Ii=!0,ms(t,{onMove(l){const c=Dt(l.clientX,l.clientY),d=ke();if(!d||d.where!=="house"||(Math.hypot(c.x-s.x,c.y-s.y)>6&&(r=!0),!r))return;const f=Math.max(40,Math.min(ue-40,c.x+i.x)),p=Math.max(Gs+40,Math.min(We,c.y+i.y)),g=Math.abs(f-a)>3?f<a:d.flip;Math.abs(f-a)>3&&(a=f),Oa(d,f,p,g,null),Lt(),gr(E.get()),Ae.isPlay()&&(Di=hr(l.clientX,l.clientY)?.id??null)},onUp(l){Ii=!1,Di=null,e.classList.remove("lifted");const c=ke();if(!r||!c||c.where!=="house"){P.click();return}const d=Dt(l.clientX,l.clientY),f=Math.max(40,Math.min(ue-40,d.x+i.x)),p=Math.max(Gs+40,Math.min(We,d.y+i.y));if(Ae.isPlay()){const g=hr(l.clientX,l.clientY),b=xi({mode:"play",via:"drag",releaseX:f,releaseY:p,piece:g?el(g):null,occupied:Hi(void 0,k.pid)}),m=b.seat?{id:b.seat.item,pose:b.seat.pose,n:b.seat.n}:null;Oa(c,b.x,b.y,c.flip,m)}else Oa(c,f,p,c.flip,null);Lt(),gr(E.get()),P.drop(),Ge(e),requestAnimationFrame(()=>Ks(!0))}})})}function bC(e){return e.kind==="text"?e.v:(e.kind==="phrase"?pi:zh)[e.v]??""}function Uo(){const e=document.querySelectorAll(".bubble");if(!document.body.classList.contains("phone")){e.forEach(s=>{(s.style.marginLeft||s.style.marginTop)&&(s.style.marginLeft="",s.style.marginTop="")});return}const t=j.getBoundingClientRect(),n=bt()||1;e.forEach(s=>{s.style.marginLeft="0px",s.style.marginTop="0px";const o=s.getBoundingClientRect();let i=0;o.width>=t.width-8||o.left<t.left+4?i=t.left+4-o.left:o.right>t.right-4&&(i=t.right-4-o.right);let a=0;o.top<t.top+4?a=t.top+4-o.top:o.bottom>t.bottom-4&&(a=t.bottom-4-o.bottom),i&&(s.style.marginLeft=i/n+"px"),a&&(s.style.marginTop=a/n+"px")})}function kC(e,t){const n=T==="street"?document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`):T==="park"?document.querySelector(`#pavatars .savatar[data-pid="${e}"]`):T==="ranch"?document.querySelector(`#ravatars .savatar[data-pid="${e}"]`):T==="gameroom"?document.querySelector(`#gavatars .savatar[data-pid="${e}"]`):As.get(e),s=n?[n]:[];for(const o of s){o.querySelector(".bubble")?.remove();const i=document.createElement("div");i.className="bubble"+(t.kind==="emote"?" emote":""),i.textContent=bC(t),o.appendChild(i),Uo(),setTimeout(()=>i.classList.add("out"),4600),setTimeout(()=>i.remove(),5e3)}e!==k?.pid&&P.click()}function sl(){const e=ke();if(!k||!e)return 0;let t=0;return k.presence.forEach(n=>{V2(e,n)&&t++}),t}function io(){const e=sl();M("btnChat").classList.toggle("glow",e>0),ol();const t=document.getElementById("chatNear");t&&(t.textContent=e?`${e} friend${e>1?"s":""} nearby can hear you`:"Walk closer to a friend to talk!",M("chatTray").classList.toggle("nobody",!e))}function Vu(){const e=M("chatTray");if(!k)return;const t=document.body.classList.contains("phone"),n=`<div class="phrases">${pi.map((a,r)=>`<button data-phrase="${r}">${fe(a)}</button>`).join("")}</div>`,s=k.settings.freeChat?`<form class="typed" id="chatForm"><input id="chatInput" maxlength="${gd}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>`:'<div class="presetsOnly">Picking from the bubbles above 💬</div>',o=t?'<button type="button" class="chatMore" data-chat="more">more</button>':"";e.innerHTML=`<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${zh.map((a,r)=>`<button data-emote="${r}">${a}</button>`).join("")}</div>
    ${o}
    <div class="chatExtra${t?" hidden":""}">${n}${s}</div>`,io(),document.getElementById("chatForm")?.addEventListener("submit",a=>{a.preventDefault();const r=M("chatInput"),l=S2(r.value);if(!l.ok){M("chatWarn").textContent=Qr[l.reason]??"",P.pop();return}if(!sl()){F("Walk closer to a friend to talk!");return}k.say({kind:"text",v:l.text}),r.value="",M("chatWarn").textContent="",r.blur()})}M("chatTray").addEventListener("click",e=>{const t=e.target;if(!k)return;if(t.closest('[data-chat="close"]')){M("chatTray").classList.add("hidden");return}const n=t.closest('[data-chat="more"]');if(n){const i=M("chatTray").querySelector(".chatExtra");i?.classList.toggle("hidden"),n.textContent=i&&!i.classList.contains("hidden")?"less":"more";return}const s=t.closest("[data-emote]"),o=t.closest("[data-phrase]");if(!(!s&&!o)){if(!sl()){F("Walk closer to a friend to talk!");return}k.say(s?{kind:"emote",v:+s.dataset.emote}:{kind:"phrase",v:+o.dataset.phrase}),P.click()}});M("btnChat").addEventListener("click",()=>{M("chatTray").classList.toggle("hidden")||(Vu(),P.swish())});function bn(){const e=document.body.classList,n=!!k&&Re!==J&&T==="house"?k.houses.get(Se):void 0,s=!!n&&n.meta.ownerId===k.pid;if(e.toggle("mode-hood",!!k),e.toggle("view-street",T!=="house"),e.toggle("view-park",T==="park"),e.toggle("view-ranch",T==="ranch"),e.toggle("view-map",T==="street"),e.toggle("view-gameroom",T==="gameroom"),e.toggle("in-barn",T==="ranch"&&Ue),e.toggle("mode-play",T==="house"&&Ae.isPlay()),uf(),ju(),e.toggle("own-house",s),e.toggle("locked",!!n&&!Ot()),e.toggle("has-hood",!!zr()),ol(),n){const o=k.players.get(n.meta.ownerId)?.nickname??"";M("houseTag").innerHTML=`${n.meta.locked?"🔒 ":""}<b>${fe(n.meta.name)}</b>${s?" · yours":o?" · "+fe(o):""}`;const i=M("lockIco");i&&(i.innerHTML=n.meta.locked?Tt.lockOn:Tt.lockOff);const a=n.meta.locked?"Unlock my house":"Lock my house";M("btnLock").setAttribute("aria-label",n.meta.locked?"Unlock house":"Lock house");const r=M("lockLabel");r&&(r.textContent=a)}io(),wC(),document.body.classList.contains("phone")&&fu()}let zl="",kr=0;function wC(){const e=M("houseTag"),t=!!k&&T==="house"&&!document.body.classList.contains("own-house");if(T!=="house"||!k){zl="",e.classList.remove("show");return}if(t){e.classList.add("show");return}const n=Se||"solo";zl!==n&&(zl=n,e.classList.add("show"),window.clearTimeout(kr),kr=window.setTimeout(()=>e.classList.remove("show"),2e3))}M("btnLock").addEventListener("click",()=>{const e=k?.houses.get(Se);!e||e.meta.ownerId!==k.pid||(k.lock(e.meta.id,!e.meta.locked),P.click(),F(e.meta.locked?"Unlocked: friends can decorate!":"Locked: friends can look but not change things"))});const wt=new Map;let oh="",qc=0,Ze={w:Bn,h:An,portrait:!1};function vC(){return document.body.classList.contains("phone-portrait")?!0:document.body.classList.contains("phone")?!1:window.innerHeight>=window.innerWidth*1.25}function Qu(){const e=M("street"),t=Ze.portrait&&!document.body.classList.contains("phone")?24:0,n=Math.max(1,e.clientWidth-t),s=Math.max(1,e.clientHeight-t);return Math.min(n/Ze.w,s/Ze.h)}function _C(e){const t=M("street"),n=M("mapWorld"),s=Ze.w*e,o=Ze.h*e;n.style.marginLeft=Math.max(0,Math.floor((t.clientWidth-s)/2))+"px",n.style.marginTop=Math.max(0,Math.floor((t.clientHeight-o)/2))+"px",t.scrollLeft=0,t.scrollTop=0,zu()}function zu(){const e=M("street"),t=M("mapWorld"),n=4,s=e.clientWidth-n,o=e.clientHeight-n,i=t.offsetLeft,a=t.offsetTop;t.querySelectorAll(".mapSign").forEach(r=>{r.style.transform="translateX(-50%)";const l=r.offsetWidth,c=r.offsetHeight,d=i+r.offsetLeft-l/2,f=a+r.offsetTop;let p=0,g=0;d<n&&(p=n-d),d+l+p>s&&(p-=d+l+p-s),f<n&&(g=n-f),f+c+g>o&&(g-=f+c+g-o),$C(r,p,g,i,a,n,s,o)})}function $C(e,t,n,s,o,i,a,r){const l=[...e.parentElement.querySelectorAll(".mapMail")],c=()=>{const f=e.offsetWidth,p=e.offsetHeight,g=s+e.offsetLeft-f/2+t,b=o+e.offsetTop+n;return{left:g,top:b,right:g+f,bottom:b+p,width:f,height:p}};for(let f=0;f<6;f++){const p=c(),g=l.find(_=>{const S=s+_.offsetLeft,R=o+_.offsetTop,D=S+_.offsetWidth,U=R+_.offsetHeight;return p.right>S+2&&p.left<D-2&&p.bottom>R+2&&p.top<U-2});if(!g)break;const b=s+g.offsetLeft,m=o+g.offsetTop,v=m+g.offsetHeight,y=c(),u=v+4-y.top,w=y.bottom-(m-4);y.top+u+y.height<=r?n+=u:y.top-w>=i?n-=w:t-=Math.min(y.right,b+g.offsetWidth)-Math.max(y.left,b)+6}const d=c();d.left<i&&(t+=i-d.left),d.right>a&&(t-=d.right-a),d.top<i&&(n+=i-d.top),d.bottom>r&&(n-=d.bottom-r),e.style.transform=Math.abs(t)>.5||Math.abs(n)>.5?`translate(calc(-50% + ${t.toFixed(1)}px), ${n.toFixed(1)}px)`:"translateX(-50%)"}document.fonts?.ready.then(()=>{T==="street"&&zu()});function xC(){return k?[...k.houses.values()].map(e=>e.meta).sort((e,t)=>e.slot-t.slot):[]}function MC(e){const s=Math.round(97.5),o=Math.max(1,Math.ceil(e/(e===1?1:2))),i=158,a=318,l=a+(o-1)*i+s/2+108,c=Math.max(1020,l+78),d=Math.max(l,Math.min(c-88,Math.round(c*.74))),f=e===1?[280]:[150,410],p=e===1?1:2,g=Array.from({length:e},(b,m)=>({x:f[m%p],y:a+Math.floor(m/p)*i}));return{w:560,h:c,hw:104,hh:s,houses:g,square:{x:280,y:d},park:{x:96,y:122},club:{x:280,y:116},ranch:{x:458,y:120}}}function ih(e,t,n,s){return!e||e.mine||!Sg()?"":`<button class="mapKnock" data-knock="${e.id}" aria-label="Knock at ${fe(e.name)} for a treat" style="left:${s(t)};top:${s(n)}"><span>🎃</span></button>`}const ah=new Map;function qu(){const e=M("street");let t=document.getElementById("candyBucket");if(!Sg()){t?.remove();return}t||(t=document.createElement("div"),t.id="candyBucket",t.className="candyBucket",t.setAttribute("aria-live","polite"),e.appendChild(t));const n=Cg(localStorage);t.innerHTML=`<span class="pail">🎃</span><b>${n}</b>`,t.setAttribute("aria-label",`${n} treats in your bucket`)}function LC(e){const{treat:t}=fL(localStorage);qu(),Ge(e),P.pop();const n=document.createElement("span");n.className="treatPop",n.textContent=t,e.appendChild(n),setTimeout(()=>n.remove(),900);const s=document.getElementById("candyBucket");s&&Ge(s),k&&k.knock(e.dataset.knock)}function Ds(e=!1){if(T!=="street")return;const t=M("mapWorld"),n=xC(),s=k?n.map(p=>({id:p.id,name:p.name,style:p.style,locked:p.locked,mine:p.ownerId===k.pid,lit:!!k.players.get(p.ownerId)?.online})):qc?Array.from({length:qc},(p,g)=>({id:"fake"+g,name:["Reagan","Quinn","Chloe","Sloane","Cada","Emma","Olivia","Charlotte","Amelia","Sophia","Isabella","Mia"][g%12]+"'s House",style:g,locked:g===3,mine:g===0,lit:g%3!==1})):[null],o=vC()?MC(Math.max(1,s.length)):null;Ze=o?{w:o.w,h:o.h,portrait:!0}:{w:Bn,h:An,portrait:!1},document.body.classList.toggle("map-tall",!!o&&!document.body.classList.contains("phone"));const i=Qu(),a=(Ze.portrait?"P":"L")+Ze.w+"x"+Ze.h+":"+i.toFixed(3)+JSON.stringify(n)+(k?n.map(p=>(k.players.get(p.ownerId)?.online?1:0)+(ql(p.id)?"u":"")).join("")+k.pid:"solo");if(!e&&a===oh&&t.querySelector("#mapFaces")){wr();return}oh=a,t.style.width=Ze.w*i+"px",t.style.height=Ze.h*i+"px",t.style.setProperty("--sc",String(i)),t.innerHTML=`<div class="mapClip">${o?A0(o.w,o.h):B0()}</div>`;const r=t.querySelector(".mapClip"),l=p=>p*i+"px";wt.clear();const c=s.length;let d="",f="";if(o){const{hw:p,hh:g}=o,b=34,m=40;s.forEach((w,_)=>{const S=o.houses[_]??o.houses[0],R=w?`house:${w.id}`:"home",D=w?w.name:"My House";wt.set(w?"house:"+w.id:"home",{x:S.x,y:S.y-g/2-8});const U=!!(w&&ql(w.id)),Z=S.x<o.w/2,ne=Z?Math.max(4,S.x-p/2-b-8):Math.min(o.w-b-4,S.x+p/2+8),G=Math.max(4,Math.min(o.h-m-4,S.y-g*.42));d+=`<button class="mapSpot mapHouse ${w?.mine||!w?"mine":""}" data-go="${R}" aria-label="${fe(D)}" style="left:${l(S.x-p/2)};top:${l(S.y-g/2)};width:${l(p)};height:${l(g)}">${nr(w?w.style:0,{lit:w?w.lit:!0})}${w?.locked?'<span class="lockBadge">🔒</span>':""}${w?.mine||!w?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${U?"up":""}" data-mail="${w?w.id:"home"}" aria-label="${fe(D)} mailbox" style="left:${l(ne)};top:${l(G)};width:${l(b)};height:${l(m)}">${jf(U)}</button>${ih(w,Z?S.x+p/2-30:S.x-p/2-10,S.y+g*.12,l)}`,f+=`<div class="mapSign ${w?.mine||!w?"mine":""}" style="left:${l(S.x)};top:${l(S.y+g/2+2)}">${fe(D)}</div>`});const v=(w,_,S,R,D,U,Z,ne,G)=>{d+=`<button class="mapSpot ${w}" data-go="${_}" aria-label="${S}" style="left:${l(D-Z/2)};top:${l(U-ne/2)};width:${l(Z)};height:${l(ne)}">${R}</button>`,f+=`<div class="mapSign place" style="left:${l(D)};top:${l(U+G)}">${S==="The park"?"Park":S==="Rainbow Ranch"?"Rainbow Ranch":"Clubhouse"}</div>`};v("mapPark","park","The park",vf,o.park.x,o.park.y,148,126,68),v("mapRanch","ranch","Rainbow Ranch",_f,o.ranch.x,o.ranch.y,156,128,72),v("mapClub","gameroom","The clubhouse",$f,o.club.x,o.club.y,146,120,68),wt.set("park",{x:o.park.x,y:o.park.y-78}),wt.set("ranch",{x:o.ranch.x,y:o.ranch.y-80}),wt.set("barn",{x:o.ranch.x,y:o.ranch.y+8}),wt.set("gameroom",{x:o.club.x,y:o.club.y-74}),wt.set("square",o.square);const y=[{x:o.park.x,y:o.park.y,r:90},{x:o.ranch.x,y:o.ranch.y,r:96},{x:o.club.x,y:o.club.y,r:88},{x:o.square.x,y:o.square.y,r:70},...o.houses.map(w=>({x:w.x,y:w.y,r:78}))],u=o.w/2;r.insertAdjacentHTML("beforeend",wf(y,(w,_)=>Math.abs(w-u)<34,o.w,o.h)+H0(o.w,o.h,y)+d+'<div class="mapFaces" id="mapFaces"></div>')}else{const p=t.querySelector("#mapRoad"),g=p.getTotalLength(),b=Array.from({length:160},(_,S)=>p.getPointAtLength(g*S/159)),m=(_,S)=>b.some(R=>Math.hypot(R.x-_,R.y-S)<50),v=Zc(),y=c>8?80:94,u=y*300/320,w=Zu(p,c,v);s.forEach((_,S)=>{const R=w[S],D=_?`house:${_.id}`:"home",U=_?_.name:"My House";wt.set(_?"house:"+_.id:"home",{x:R.x,y:R.y-u/2-4});const Z=!!(_&&ql(_.id)),ne=34,G=40,ee=14/i,an=Math.max(4,Math.min(Bn-ne-4,R.x+y/2+ee)),Ut=Math.max(4,Math.min(An-G-4,R.y-u*.22));d+=`<button class="mapSpot mapHouse ${_?.mine||!_?"mine":""}" data-go="${D}" aria-label="${fe(U)}" style="left:${l(R.x-y/2)};top:${l(R.y-u/2)};width:${l(y)};height:${l(u)}">${nr(_?_.style:0,{lit:_?_.lit:!0})}${_?.locked?'<span class="lockBadge">🔒</span>':""}${_?.mine||!_?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${Z?"up":""}" data-mail="${_?_.id:"home"}" aria-label="${fe(U)} mailbox" style="left:${l(an)};top:${l(Ut)};width:${l(ne)};height:${l(G)}">${jf(Z)}</button>${ih(_,Math.max(4,R.x-y/2-40/i),R.y-u*.05,l)}`,f+=`<div class="mapSign ${_?.mine||!_?"mine":""}" style="left:${l(R.x)};top:${l(R.y+u/2-2)}">${fe(U)}</div>`}),d+=`<button class="mapSpot mapPark" data-go="park" aria-label="The park" style="left:${l(Qn.x-100)};top:${l(Qn.y-85)};width:${l(200)};height:${l(170)}">${vf}</button>`,f+=`<div class="mapSign place" style="left:${l(Qn.x)};top:${l(Qn.y+70)}">Park</div>`,d+=`<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${l(cn.x-110)};top:${l(cn.y-90)};width:${l(220)};height:${l(180)}">${_f}</button>`,f+=`<div class="mapSign place" style="left:${l(cn.x)};top:${l(cn.y+78)}">Rainbow Ranch</div>`,d+=`<button class="mapSpot mapClub" data-go="gameroom" aria-label="The clubhouse" style="left:${l(zn.x-95)};top:${l(zn.y-78)};width:${l(190)};height:${l(156)}">${$f}</button>`,f+=`<div class="mapSign place" style="left:${l(zn.x)};top:${l(zn.y+82)}">Clubhouse</div>`,wt.set("park",{x:Qn.x,y:Qn.y-60}),wt.set("ranch",{x:cn.x-30,y:cn.y-60}),wt.set("barn",{x:cn.x+10,y:cn.y+10}),wt.set("gameroom",{x:zn.x,y:zn.y-52}),r.insertAdjacentHTML("beforeend",wf(v,m)+d+'<div class="mapFaces" id="mapFaces"></div>')}t.insertAdjacentHTML("beforeend",f),qu(),wr(),_C(i)}const Zc=()=>[{x:Qn.x,y:Qn.y,r:115},{x:cn.x,y:cn.y,r:125},{x:fn.x,y:fn.y,r:100},{x:zn.x,y:zn.y,r:90}];function Zu(e,t,n){const s=e.getTotalLength(),o=[];for(let i=0;i<t;i++){const a=t===1?.2:.05+.75*i/(t-1),r=e.getPointAtLength(s*a),l=e.getPointAtLength(Math.min(s,s*a+3));let c=-(l.y-r.y),d=l.x-r.x;const f=Math.hypot(c,d)||1;c/=f,d/=f;const p=[1,-1].map(m=>({x:r.x+c*72*m,y:r.y+d*72*m})).map(m=>({...m,score:Math.min(...n.map(v=>Math.hypot(v.x-m.x,v.y-m.y)-v.r),m.x-50,Bn-50-m.x,m.y-60,An-40-m.y)})),g=i%2?p:[p[1],p[0]],b=g[0].score>0||g[0].score>=g[1].score?g[0]:g[1];b.x=Math.max(60,Math.min(Bn-60,b.x)),b.y=Math.max(62,Math.min(An-72,b.y)),n.push({x:b.x,y:b.y,r:70}),o.push({x:b.x,y:b.y})}return o}window.__mapFake=e=>{qc=e,Ds(!0)};window.__mapLayout=e=>{const t=document.querySelector("#mapRoad");if(!t)return null;const n=Zu(t,e,Zc());let s=1e9,o=1e9,i=!0;return n.forEach((a,r)=>{n.forEach((l,c)=>{c>r&&(s=Math.min(s,Math.hypot(a.x-l.x,a.y-l.y)))}),Zc().forEach(l=>{o=Math.min(o,Math.hypot(a.x-l.x,a.y-l.y)-l.r)}),(a.x<55||a.x>Bn-55||a.y<60||a.y>An-70)&&(i=!1)}),{n:e,minHouse:s,minSpot:o,inside:i}};function Nu(e){return e.where==="house"&&e.houseId?{kind:"house",houseId:e.houseId,room:e.room}:e.where==="park"||e.where==="ranch"||e.where==="barn"||e.where==="gameroom"?{kind:e.where}:{kind:"square"}}const EC=e=>e.kind==="house"?"house:"+e.houseId:e.kind;function wr(){const e=document.getElementById("mapFaces");if(!e||T!=="street")return;const t=Qu(),n=new Set,s=[];if(k){const i=[...k.presence.entries()],a=ke();a&&i.push([k.pid,a]);for(const[r,l]of i){const c=k.players.get(r);c&&s.push({key:r,look:c.look,name:c.nickname,mine:r===k.pid,place:Nu(l)})}}else{const i=J.get().characters[0];i&&s.push({key:"solo",look:Zi(i),name:"You",mine:!0,place:{kind:"square"}})}const o=new Map;for(const i of s){const a=EC(i.place);o.has(a)||o.set(a,[]),o.get(a).push(i)}for(const[i,a]of o)a.sort((r,l)=>r.mine?-1:l.mine?1:r.name.localeCompare(l.name)),a.forEach((r,l)=>{let c,d;const f=wt.get("square")??{x:fn.x,y:fn.y};if(i==="square")if(Ze.portrait){const y=Math.floor(l/3),u=l%3,w=Math.min(3,a.length-y*3);c=f.x+(u-(w-1)/2)*176,d=f.y+y*112}else if(a.length===1)c=fn.x,d=fn.y;else{const m=-Math.PI/2+l*(Math.PI*2/a.length);c=fn.x+Math.cos(m)*78,d=fn.y+Math.sin(m)*78}else{const m=wt.get(i)??f,v=Ze.portrait?2:3,y=Ze.portrait?150:64,u=Math.floor(l/v),w=l%v,_=Math.min(v,a.length-u*v);c=m.x+(w-(_-1)/2)*y,d=m.y-u*(Ze.portrait?108:64)}Ze.portrait&&(c=Math.max(100,Math.min(Ze.w-100,c)),d=Math.max(48,Math.min(Ze.h-84,d))),n.add(r.key);let p=e.querySelector(`.mapFace[data-pid="${r.key}"]`);p||(p=document.createElement("button"),p.className="mapFace "+(r.mine?"mine":"other"),p.dataset.pid=r.key,p.setAttribute("aria-label",r.mine?"You":r.name),e.appendChild(p));const g=JSON.stringify(r.look)+r.name;if(p.dataset.look!==g){const m=p.querySelector(".bubble");p.innerHTML=`<span class="face">${Kc(kt(r.look))}</span><span class="fname">${fe(r.mine?"You":r.name)}</span>`,m&&p.appendChild(m),p.dataset.look=g}p.dataset.place=i;const b=Ze.portrait?62:46;p.style.left=(c-b/2)*t+"px",p.style.top=(d-b/2)*t+"px",p.style.width=p.style.height=b*t+"px"});e.querySelectorAll(".mapFace").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),io()}function ef(){M("mapWorld").classList.remove("zoomIn")}function Fu(e,t){ef(),P.swish(),CC(e)}function Xi(e){ps()||(e.classList.remove("sceneIn"),e.offsetWidth,e.classList.add("sceneIn"),setTimeout(()=>e.classList.remove("sceneIn"),260))}function CC(e){e.kind==="house"?Yu(e.houseId,e.room):e.kind==="home"?Gu():e.kind==="park"?HC():e.kind==="ranch"?Ui(!1):e.kind==="barn"?Ui(!0):e.kind==="gameroom"&&WC()}function SC(e){const t=k?.presence.get(e);if(!k||!t)return;const n=Nu(t),s=k.players.get(e)?.nickname??"your friend";if(n.kind==="square"){F(`${s} is on the map too! 👋`),P.pop();return}document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`),Fu(n),setTimeout(()=>{const o=ke();if(!o||!k)return;const i=t.x+(t.x>300?-110:110);if(n.kind==="house"&&o.where==="house")Ye({...o,x:i,y:t.y}),Lt(),Jr(i-de/2);else if((n.kind==="park"||n.kind==="ranch"||n.kind==="barn")&&o.where===n.kind){tn({...o,x:i,y:Math.max(Ws,Math.min(Dn,t.y)),flip:i>t.x});const a=n.kind==="park"?ys():on(),r=M(n.kind==="park"?"parkScroll":"ranchScroll");requestAnimationFrame(()=>{r.scrollLeft=t.x*a-r.clientWidth/2,at()})}else if(n.kind==="gameroom"&&o.where==="gameroom"){const a=Oo();a||tn({where:"gameroom",x:i,y:Math.max(Ws,Math.min(Dn,t.y)),flip:i>t.x});const r=hs(),l=M("grScroll"),c=a?.x??t.x;requestAnimationFrame(()=>{l.scrollLeft=c*r-l.clientWidth/2,at()})}F(`You found ${s}! 💕`)},420)}function ql(e){if(!k)return!1;const t=k.houses.get(e);return!!t&&t.meta.ownerId===k.pid&&id(t.confirmed.mailbox)>0}let va=0;function ju(){pu();const e=document.getElementById("mailCue"),t=k?.myHouseId()??"",n=k&&t?id(k.houses.get(t)?.confirmed.mailbox):0;if(!k||T!=="street"||n<=0){n<=0&&(va=0),e?.classList.remove("show");return}va!==n&&(va=n,e?.classList.add("show"),window.setTimeout(()=>{va===n&&e?.classList.remove("show")},8e3))}function ol(){const e=k?.myHouseId()??"",t=k&&e?id(k.houses.get(e)?.confirmed.mailbox):0,n=M("menuBadge");n.textContent=t>9?"9+":String(t),n.classList.toggle("on",t>0);const s=document.getElementById("mailNew");s&&(s.textContent=t>0?t===1?"1 new":t+" new":"",s.classList.toggle("on",t>0));const o=k?k.presence.size:0,i=M("mapBadge");i.textContent=o>9?"9+":String(o),i.classList.toggle("on",o>0),M("btnMap").setAttribute("aria-label",o>0?`Map, ${o} friends online`:"Map");const a=sl(),r=M("chatBadge");r.textContent=a>9?"9+":String(a),r.classList.toggle("on",a>0)}function vr(e){e&&document.querySelectorAll(".toast").forEach(t=>t.remove()),M("menuPop").classList.toggle("hidden",!e),M("btnMenu").setAttribute("aria-expanded",e?"true":"false"),M("btnPhoto").classList.toggle("ok",T==="house"),e&&ol(),PC()}M("btnPhoto").addEventListener("click",()=>{vr(!1),requestAnimationFrame(()=>requestAnimationFrame(()=>{iL(j,()=>P.click())}))});function PC(){const e=M("houseTag");if(e.style.top="",!e.classList.contains("show")||M("menuPop").classList.contains("hidden"))return;const t=document.querySelector(".menuCard");if(!t)return;const n=M("stageWrap").getBoundingClientRect(),s=t.getBoundingClientRect(),o=e.getBoundingClientRect();if(!(o.top<s.bottom-2&&o.bottom>s.top+2&&o.left<s.right-2&&o.right>s.left+2))return;const a=s.bottom-n.top+8;a+o.height<n.height-8?e.style.top=a+"px":e.style.top=Math.max(8,n.height-o.height-10)+"px"}M("btnMenu").addEventListener("click",()=>{vr(M("menuPop").classList.contains("hidden")),P.click()});M("menuPop").addEventListener("click",e=>{const t=e.target;if(t.id==="menuPop"||t.closest("#menuClose")){vr(!1);return}t.closest(".menuRow")&&vr(!1)});M("btnMail").addEventListener("click",()=>{const e=k?.myHouseId();e?tf(e):F("Join a street to send letters!")});M("secrets").addEventListener("click",()=>{if(T!=="house"){F("Surprises are hiding in your house!");return}Ae.isPlay()&&M("modeDecorate").click(),Pt="secrets",Ht(),F("Surprises are in your drawer!")});function tf(e){if(!k||e==="home"||!k.houses.has(e)){F("Join a street to send letters!");return}const t=k.houses.get(e);Ha.open(e,t.meta.name,t.meta.ownerId===k.pid,t.confirmed.mailbox?.letters??[]),P.click()}M("mapWorld").addEventListener("click",e=>{const t=e.target;if(T!=="street")return;const n=t.closest(".mapKnock");if(n){LC(n);return}const s=t.closest(".mapMail");if(s){tf(s.dataset.mail||"home");return}const o=t.closest(".mapFace");if(o){o.classList.contains("mine")?(Ge(o),P.pop(),F("That's you! Tap a place to go there")):SC(o.dataset.pid);return}const i=t.closest("[data-go]");if(!i)return;const a=i.dataset.go;Fu(a.startsWith("house:")?{kind:"house",houseId:a.slice(6)}:{kind:a})});function ao(){ef(),M("street").classList.add("hidden"),M("park").classList.add("hidden"),M("ranch").classList.add("hidden"),M("gameroom").classList.add("hidden"),Da()?.close(),M("chatTray").classList.add("hidden"),M("sheet").classList.add("hidden")}function $o(){ef(),Oe=null,xt=[],Ue=!1,k?Ye({where:"street",x:600,y:540,flip:!1}):It=null,ao(),T="street",M("street").classList.remove("hidden"),M("streetTitle").textContent=k?"Our Neighborhood":"My Map",bn(),Ds(!0);const e=M("mapWorld");e.style.transformOrigin="50% 50%",e.classList.remove("zoomIn","mapIn"),ps()||(e.offsetWidth,e.classList.add("mapIn")),P.swish()}function Gu(){if(k){const e=k.myHouseId();e&&k.houses.has(e)&&Yu(e);return}ao(),T="house",It=null,Ae.sync(!0),bn(),Js(),Xi(M("stageWrap")),P.sparkle(),ls()}function Yu(e,t="living"){if(!k||!k.houses.has(e))return;Se=e,T="house",Ue=!1,Ae.sync(e===k.myHouseId());let n=fr.get(e);n||(n=q2(k,e,{get:()=>J.get().soundOn,set:s=>J.dispatch({type:"settings/sound",on:s})}),fr.set(e,n)),n.dispatch({type:"room/switch",room:t});{const s=Xd(e,t,{x:900+Math.random()*300,y:540});Ye({where:"house",houseId:e,room:t,x:s.x,y:s.y,flip:!1})}ao(),Uu(n),Xi(M("stageWrap")),P.sparkle(),ls()}function nf(){k?.close(),k=null,fr=new Map,T="house",Se="",It=null,Oe=null,xt=[],Ue=!1,M("elsewhere").classList.add("hidden"),ao(),Ae.sync(!0),Uu(J),bn()}M("btnMap").addEventListener("click",()=>{if(T==="street"){P.pop();return}$o()});M("btnHome").addEventListener("click",()=>{if(T==="house"&&(!k||Se===k.myHouseId())){P.pop();return}Gu()});M("phoneOk").addEventListener("click",()=>{M("phoneNote").classList.add("hidden"),P.click()});M("elsewhereGo").addEventListener("click",()=>{P.click(),k?.connect()});M("btnSolo").addEventListener("click",()=>{nf(),F("Playing in your own house 🏠")});window.addEventListener("resize",()=>{T==="street"&&Ds(!0),T==="park"&&af(),T==="ranch"&&hf(),T==="gameroom"&&Bd(),at()});function sf(e){k=e,fr=new Map,e.on("players",()=>{k===e&&(T==="street"?Ds():T==="park"?eo():T==="ranch"?(as(),uf()):T==="gameroom"?ki():(Lt(),bn()),Oi==="dress"&&dn())}),e.on("houses",()=>{k===e&&(T==="street"?Ds():T==="house"&&!e.houses.has(Se)&&(F("That house is gone now"),$o()))}),e.on("houseMeta",t=>{k!==e||t!==Se||T!=="house"||(it=null,bn(),Jt(E.get()),Ht(),Ot()||M("sheet").classList.add("hidden"))}),e.on("pres",()=>{k===e&&(T==="street"?wr():T==="park"?eo():T==="ranch"?as():T==="gameroom"?ki():Lt())}),e.on("ranch",()=>{k===e&&T==="ranch"&&dl(!0)}),e.on("ranchFail",t=>{k===e&&Fc(t)}),e.on("noride",()=>{if(k!==e)return;const t=ke();if(t?.ride!==void 0){const{ride:n,...s}=t;Ye(s),as()}F("Someone is riding that horse!")}),e.on("fx",(t,n)=>{k===e&&rS(t,n)}),e.on("bubble",(t,n)=>{k===e&&kC(t,n)}),e.on("knocked",(t,n)=>{if(k!==e)return;const s=Date.now();(ah.get(n)??0)>s-2e4||(ah.set(n,s),F(pL(n)))}),e.on("sayFail",t=>F(t==="presetsOnly"?"Typing is turned off: pick a bubble!":Qr[t]||"Couldn't send that")),e.on("mailbox",()=>{k===e&&(T==="street"&&Ds(!0),ju(),Ha.refresh(),ol())}),e.on("mailFail",t=>{k===e&&Ha.fail(t)}),e.on("settings",()=>{k===e&&(M("chatTray").classList.contains("hidden")||Vu(),Ha.refresh())}),e.on("removed",()=>{F("A grown-up took this iPad off the street");const t=e.cfg;Tn({url:t.url,code:t.code,id:t.id,parentKey:t.parentKey}),nf()}),e.on("status",t=>{k===e&&(document.body.classList.toggle("reconnecting",t!=="online"&&!e.replaced),(t==="online"||t==="connecting")&&M("elsewhere").classList.add("hidden"))}),e.on("replaced",()=>{k===e&&M("elsewhere").classList.remove("hidden")}),e.on("table",()=>{if(k===e){if(T==="gameroom"){const t=Oo(),n=ke();t&&n?.where==="gameroom"&&Math.hypot(n.x-t.x,n.y-t.y)>40&&Ye({where:"gameroom",x:t.x,y:Math.max(Ws,Math.min(Dn,t.y)),flip:n.flip}),ki()}Da()?.refresh()}}),e.on("tblFail",(t,n)=>{k===e&&Da()?.fail(t,n)}),e.on("welcome",()=>{if(k===e)if(T==="street")Ds(!0);else if(T==="park"||T==="ranch"){const t=ke();t&&Ye(t),T==="park"?af():hf(),at()}else if(T==="gameroom"){const t=ke();t&&Ye(t),Bd(),at(),Da()?.refresh()}else e.houses.has(Se)?Js():$o()}),e.on("reset",(t,n)=>{k===e&&n==="cuddling"&&F("Someone is cuddling!")}),$o()}async function TC(){bn();const e=zr(),t=Mo();if(!e||!t?.token||t.url!==e)return;const n=new qr(t),s=await n.connect();s==="ok"?sf(n):(n.close(),s!=="closed"&&F("Couldn't reach the street. Playing at home!"))}function Ft(e,t,n=""){const s=document.createElement("div");s.className="sheet hoodSheet "+n,s.innerHTML=`<div class="card">${e}</div>`,document.body.appendChild(s),P.swish();const o=()=>s.remove();return s.addEventListener("click",i=>{const a=i.target;if(a===s||a.closest('[data-m="close"]'))return o();t(a,o,s)}),{root:s,close:o}}const jt='<button class="close" data-m="close">✕</button>';M("btnHood").addEventListener("click",()=>RC());function RC(){const e=zr();if(!e){Ft(`${jt}<h2>Neighborhood</h2><p class="hint">The street isn't open yet. Ask a grown-up to set it up!</p>`,()=>{});return}const t=Mo()?.url===e?Mo():null;Ft(`${jt}<h2>Neighborhood</h2><div class="bigBtns">
      ${t?.token?`<button class="big go" data-m="go">${Tt.street}<span>Go to my street</span></button>`:`<button class="big go" data-m="join">${Tt.street}<span>Join a friend's street</span></button>`}
      <button class="big grown" data-m="create">${Tt.shield}<span>${t?.parentKey?"Grown-ups":"Grown-ups: start a street"}</span></button></div>`,async(n,s)=>{const o=n.closest("[data-m]")?.dataset.m;if(o==="go"){s();const i=new qr(t),a=await i.connect();a==="ok"?sf(i):(i.close(),F(a.startsWith("badtoken")?"Please join again":"Couldn't reach the street"))}o==="join"&&(s(),vi(e)),o==="create"&&(s(),await eg()&&(t?.parentKey?il():BC(e)))})}async function BC(e){let t;try{t=await Q2(e)}catch{F("Couldn't create a street right now");return}Tn({url:e,code:t.code,id:t.id,parentKey:t.parentKey}),Ft(`${jt}<h2>Your street is ready!</h2><p class="hint">Kids join with this code (you can pick your own on the grown-up screen):</p><div class="code" id="newCode">${t.code}</div>
    <p class="hint small">Grown-up key (keep it private; it opens the grown-up screen on another device):<br><b class="key" id="parentKey">${t.parentKey}</b></p>
    <div class="bigBtns"><button class="big grown" data-m="setup">${Tt.shield}<span>Add kids' names &amp; code</span></button>
    <button class="big go" data-m="joinhere">${Tt.street}<span>Join on this iPad</span></button></div>`,(n,s)=>{n.closest('[data-m="joinhere"]')&&(s(),of(e,t.code)),n.closest('[data-m="setup"]')&&(s(),il())})}function vi(e,t=""){const n=Ft(`${jt}<h2>Join a street</h2><p class="hint">Type the code a grown-up gave you</p>
    <form id="codeForm" class="codeForm"><input id="codeInput" maxlength="${hd}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="CODE"/><button type="submit" class="go">Next</button></form>
    <p class="err">${fe(t)}</p>`,()=>{}),s=n.root.querySelector("#codeInput");setTimeout(()=>s.focus(),50),s.addEventListener("input",()=>{s.value=Ka(s.value)}),n.root.querySelector("#codeForm").addEventListener("submit",o=>{o.preventDefault();const i=Ka(s.value);if(!j1(i)){n.close(),vi(e,"That code looks wrong. Try again!");return}n.close(),of(e,i)})}async function of(e,t,n=""){let s;try{s=await z2(e,t)}catch{vi(e,"Couldn't reach the street. Try again!");return}if("slow"in s){vi(e,"Too many tries. Ask a grown-up and try again in a few minutes.");return}if(!s.exists){vi(e,"Hmm, we couldn't find that street.");return}window.__lastLookupId=s.id,AC(e,t,s.id,s.roster,n)}function AC(e,t,n,s,o=""){if(s.length){Ft(`${jt}<h2>Who are you?</h2>${o?`<p class="err">${fe(o)}</p>`:'<p class="hint">Tap your name</p>'}<div class="nicks roster">${s.map((i,a)=>`<button data-nick="${a}" ${i.claimed?"disabled":""}>${fe(i.name)}${i.claimed?"<small>signed in</small>":""}</button>`).join("")}</div>
      <p class="hint small">Not on the list? Ask a grown-up to add your name.</p>`,(i,a)=>{const r=i.closest("[data-nick]");if(!r||r.disabled)return;a();const l=s[+r.dataset.nick];l.hasHouse?Ku(e,t,n,l.name,void 0):rh(e,t,n,l.name)},"wide");return}Ft(`${jt}<h2>Pick your street name</h2>${o?`<p class="err">${fe(o)}</p>`:""}<div class="nicks">${Uf.map((i,a)=>`<button data-nick="${a}">${fe(i)}</button>`).join("")}</div>`,(i,a)=>{const r=i.closest("[data-nick]");r&&(a(),rh(e,t,n,Uf[+r.dataset.nick]))},"wide")}function rh(e,t,n,s){Ft(`${jt}<h2>Hi, ${fe(s)}!</h2><p class="hint">What should your house on the street be?</p>
    <div class="bigBtns"><button class="big go" data-m="bring">${nr(2)}<span>Bring my house</span></button>
    <button class="big" data-m="fresh">${nr(5)}<span>Start a new one</span></button></div>`,(o,i)=>{const a=o.closest("[data-m]")?.dataset.m;a&&(i(),Ku(e,t,n,s,a==="bring"))})}async function Ku(e,t,n,s,o){const i=J.get(),a=i.characters[0],r=Zi(a??{});let l;if(o&&(l=i,a)){const{reduce:b}=await h(async()=>{const{reduce:m}=await Promise.resolve().then(()=>E1);return{reduce:m}},void 0);l=b(i,{type:"char/delete",id:a.id})}const c=Mo(),d={url:e,code:t,id:n,parentKey:c?.id===n||c?.code===t?c.parentKey:void 0},f=i.dog?{name:i.dog.name,breed:i.dog.breed}:null,p=new qr(d),g=await p.connect({nickname:s,look:r,house:l,dog:f});if(g==="ok"){Tn(p.cfg),sf(p),F(`Welcome to the street, ${s}!`),QM()&&(zM(),Be=ft,To("dress"));return}p.close(),g.startsWith("nickname")?of(e,t,g.endsWith("notOnList")?"That name is not on the list anymore.":"That name is already signed in on another iPad. Ask a grown-up!"):F(g==="full"?"That street is full":"Couldn't join right now")}M("btnParent").addEventListener("click",async()=>{await eg()&&il()});const DC={codeTaken:"That code is already used by another street. Try adding a number!",badCode:"Codes are 4–16 letters or numbers.",badName:"Use a first name only (letters).",rosterFull:`Up to ${G1} names.`,nameInUse:"Remove that player first.",codeFixed:"This street's code can't be changed."};async function il(){const e=Mo();if(!e)return;if(!e.parentKey){const a=Ft(`${jt}<h2>Grown-up key</h2><p class="hint">Enter the key you got when the street was made</p><form id="keyForm" class="codeForm"><input id="keyInput" autocomplete="off" spellcheck="false"/><button class="go">OK</button></form>`,()=>{});a.root.querySelector("#keyForm").addEventListener("submit",r=>{r.preventDefault(),e.parentKey=a.root.querySelector("#keyInput").value.trim(),Tn(e),k&&(k.cfg.parentKey=e.parentKey),a.close(),il()});return}let t=k;t||(t=new qr({...e,token:void 0}),await t.connect());const n=t,s=a=>o.root.querySelector(a).value,o=Ft(`${jt}<h2>Grown-up screen</h2><div id="parentBody"><p class="hint">Loading…</p></div>`,async a=>{const r=a.closest("[data-p]");if(!r)return;const l=r.dataset.p;if(l==="free"&&n.parent({op:"freeChat",on:r.dataset.on!=="1"}),l==="freeMail"&&n.parent({op:"freeMail",on:r.dataset.on!=="1"}),l==="rename"&&n.parent({op:"rename",houseId:r.dataset.hid,name:s(`input[data-hid="${r.dataset.hid}"]`)}),l==="add"&&n.parent({op:"rosterAdd",name:r.dataset.name??s("#rosterInput")}),l==="unname"&&n.parent({op:"rosterRemove",name:r.dataset.name}),l==="unclaim"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again";return}n.parent({op:"unclaim",name:r.dataset.name})}if(l==="setcode"&&n.parent({op:"setCode",code:s("#codeEdit")}),l==="remove"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again to remove";return}n.parent({op:"remove",pid:r.dataset.pid})}if(l==="mailClear"||l==="mailClearAll"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent=l==="mailClearAll"?"Tap again to clear every mailbox":r.dataset.id?"Tap again":"Tap again to clear this mailbox";return}l==="mailClearAll"?n.parent({op:"mailClearAll"}):n.parent({op:"mailClear",houseId:r.dataset.hid,...r.dataset.id?{id:r.dataset.id}:{}})}if(l==="leave"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again: forget this street here";return}Tn(null),o.close(),nf(),F("This iPad left the street")}},"wide parent");o.root.addEventListener("submit",a=>{a.preventDefault();const r=a.target.id;r==="rosterForm"&&n.parent({op:"rosterAdd",name:s("#rosterInput")}),r==="codeForm2"&&n.parent({op:"setCode",code:s("#codeEdit")})});const i=a=>{const r=new Date(a);return Number.isFinite(r.getTime())?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r.getMonth()]+" "+r.getDate()+", "+r.getFullYear():""};n.on("parentInfo",a=>{const r=o.root.querySelector("#parentBody");if(!r)return;const l=Mo();l&&l.code!==a.code&&(l.code=a.code,Tn(l)),n.cfg.code=a.code;const c=a.roster??[],d=new Set(c.map(y=>y.name.toLowerCase())),f=Y1.filter(y=>!d.has(y.toLowerCase())),p=c[0]?.name??"Reagan",g=Array.isArray(a.mail)?a.mail:[],b=g.some(y=>y.letters&&y.letters.length),m=jh(a.settings),v=g.map(y=>`<div class="pMailHouse"><div class="pMailName">${fe(y.name||"House")}</div>${(y.letters||[]).slice().reverse().map(u=>`<div class="pLetter"><b>${fe(u.from)}</b><span class="pWhen">${fe(i(u.at))}</span><p>${fe(u.text)}</p><button type="button" class="danger" data-p="mailClear" data-hid="${fe(y.houseId)}" data-id="${fe(u.id)}">Clear</button></div>`).join("")||'<p class="hint">No letters.</p>'}${(y.letters||[]).length?`<button type="button" class="danger" data-p="mailClear" data-hid="${fe(y.houseId)}">Clear this mailbox</button>`:""}</div>`).join("");r.innerHTML=`${a.note?`<p class="err" id="pNote">${fe(DC[a.note]??a.note)}</p>`:""}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${fe(a.code)}</div></div>
        <div><div class="label">Free typing</div><button class="toggle ${a.settings.freeChat?"on":""}" data-p="free" data-on="${a.settings.freeChat?1:0}" id="pFree">${a.settings.freeChat?"On":"Off (presets only)"}</button><p class="hint small">Chat bubbles. Off means preset phrases only.</p></div>
        <div><div class="label">Let kids type their own letters</div><button class="toggle ${m?"on":""}" data-p="freeMail" data-on="${m?1:0}" id="pFreeMail">${m?"On":"Off (presets only)"}</button><p class="hint small">Letters only. Off means preset phrases only.</p></div></div>
      <div class="label">Letters</div><div id="parentMail">${v||'<p class="hint">No letters right now.</p>'}${b?'<button type="button" class="danger" data-p="mailClearAll" id="mailClearAll">Clear every mailbox</button>':""}</div>
      <form class="pAdd" id="codeForm2"><input id="codeEdit" maxlength="${hd}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="e.g. ${fe(Ka(p))}7"/><button data-p="setcode" type="button">Use this code</button></form>
      <p class="hint small">Tip: a word plus a number (like ${fe(Ka(p))}7) is easy to remember and harder to guess. Not case-sensitive.</p>
      <div class="label">Kids' names (sign-in list)</div>
      <div class="roster">${c.map(y=>`<span class="rName ${y.claimed?"claimed":""}"><b>${fe(y.name)}</b>${y.claimed?`<i>signed in</i><button data-p="unclaim" data-name="${fe(y.name)}">Reset</button>`:y.hasHouse?"<i>not signed in</i>":`<button class="x" data-p="unname" data-name="${fe(y.name)}" aria-label="Remove name">×</button>`}</span>`).join("")||'<p class="hint">No names yet: kids pick a fun nickname instead.</p>'}</div>
      <form class="pAdd" id="rosterForm"><input id="rosterInput" maxlength="20" autocomplete="off" placeholder="First name"/><button data-p="add" type="button">Add</button></form>
      ${f.length?`<div class="sugg">${f.map(y=>`<button data-p="add" data-name="${y}">+ ${y}</button>`).join("")}</div>`:""}
      <div class="label">Houses</div>${a.houses.map(y=>`<div class="pHouse"><input data-hid="${y.id}" value="${fe(y.name)}" maxlength="24"/><button data-p="rename" data-hid="${y.id}">Rename</button></div>`).join("")||'<p class="hint">No houses yet.</p>'}
      <div class="label">Players</div>${a.players.map(y=>`<div class="pPlayer"><span class="dot ${y.online?"on":""}"></span>${fe(y.nickname)}<button class="danger" data-p="remove" data-pid="${y.pid}">Remove</button></div>`).join("")||'<p class="hint">Nobody has joined yet.</p>'}
      <p class="hint small">Letters stay on the server for up to 30 days. They are filtered, and only a first name is stored. You can clear them here, or turn off “Let kids type their own letters” so new letters use preset phrases. Chat bubbles are only relayed to kids standing nearby and are not saved. No emails or last names. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays).</p>
      <button class="danger wideBtn" data-p="leave">Forget this street on this device</button>`}),n.on("error",a=>{a==="badkey"&&(F("That grown-up key didn't work"),e.parentKey=void 0,Tn(e),o.close())}),n.parent({op:"info"})}let It=null;function ys(){return M("park").clientHeight/kd}const IC=()=>{const e=J.get();return e.characters.find(t=>t.id===e.dog?.owner)??e.characters[0]},kn=()=>k?ke():It;function tn(e){k?Ye(e):It=e,T==="ranch"?as():T==="gameroom"?ki():eo()}function ns(e="park"){if(k){const n=[],s=[...k.presence.entries()],o=ke();o&&s.push([k.pid,o]);for(const[i,a]of s){const r=k.players.get(i);r&&a.where===e&&n.push({key:i,look:r.look,name:r.nickname,p:a,mine:i===k.pid,dog:r.dog??null})}return n}const t=IC();return It&&It.where===e?[{key:"solo",look:Zi(t??{}),name:"",p:It,mine:!0,dog:J.get().dog??null}]:[]}function af(){const e=ys(),t=M("parkWorld"),n=s=>s*e+"px";t.style.width=ud*e+"px",t.style.height=kd*e+"px",t.style.setProperty("--sc",String(e)),t.innerHTML=Py()+cc.map((s,o)=>s.kind==="swing"?`<div class="swing" data-swing="${o}" style="left:${n(s.x-30)};top:${n(Kt)};width:${n(60)};height:${n(240)}">${Ty}</div>`:"").join("")+cc.map((s,o)=>`<button class="pspot k-${s.kind}" data-spot="${o}" aria-label="${s.kind}" style="left:${n(s.x-50)};top:${n(s.y-(s.kind==="swing"?70:55))};width:${n(100)};height:${n(s.kind==="swing"?90:65)}"></button>`).join("")+`<button class="pspot slide" data-act="slide" aria-label="Slide" style="left:${n(ge.ladder-45)};top:${n(ge.top.y-30)};width:${n(130)};height:${n(560-ge.top.y+30)}"></button><button class="pspot pond" data-act="splash" aria-label="Pond" style="left:${n(1235)};top:${n(462)};width:${n(370)};height:${n(105)}"></button><button class="pspot gate" data-act="exit" aria-label="Back to the street" style="left:${n(25)};top:${n(240)};width:${n(180)};height:${n(260)}"></button><div class="ripples" id="ripples"></div><button class="ball" id="ball" aria-label="Ball">${Ry}</button><div class="savatars" id="pavatars"></div>`,_r(),eo(),at()}const lh=2400;function eo(){const e=document.getElementById("pavatars");if(!e||T!=="park")return;const t=ys(),n=new Set,s=new Set;for(const o of ns()){n.add(o.key);let i=e.querySelector(`.savatar[data-pid="${o.key}"]`);i||(i=document.createElement("div"),i.className="savatar "+(o.mine?"mine":"other"),i.dataset.pid=o.key,e.appendChild(i),o.mine&&Xu(i));const a=JSON.stringify(o.look)+o.name;if(i.dataset.look!==a){const f=i.querySelector(".bubble");i.innerHTML=o.name?Jd(o.look,o.name):`<div class="inner">${kt(o.look)}</div>`,f&&i.appendChild(f),i.dataset.look=a}const r=(js[o.look.size]??1)*t*.95,l=gs*r,c=yn*r;i.style.left=o.p.x*t-l/2+"px",i.style.top=o.p.y*t-c+"px",i.style.width=l+"px",i.style.height=c+"px",i.style.zIndex=String(100+Math.round(o.p.y)),i.classList.toggle("flipped",o.p.flip),ji(i,o.look,o.mine);const d=o.p.pose??"";i.dataset.pose!==d&&(i.classList.remove("pose-sit","pose-swing","pose-slide"),i.offsetWidth,d==="slide"&&(i.style.setProperty("--sx",(ge.top.x-ge.bottom.x)*t+"px"),i.style.setProperty("--sy",(ge.top.y-ge.bottom.y)*t+"px")),d&&i.classList.add("pose-"+d),i.dataset.pose=d),d==="swing"?(i.style.transformOrigin=`50% ${(Kt-o.p.y)*t+c}px`,i.style.animationDelay=-(Date.now()%lh)/1e3+"s",s.add(o.p.spot??-1)):(i.style.transformOrigin="",i.style.animationDelay="")}e.querySelectorAll(".savatar").forEach(o=>{n.has(o.dataset.pid)||o.remove()}),document.querySelectorAll("#parkWorld .swing").forEach(o=>{const i=s.has(+o.dataset.swing);i&&!o.classList.contains("swinging")&&(o.style.animationDelay=-(Date.now()%lh)/1e3+"s"),o.classList.toggle("swinging",i)}),io()}function Xu(e){e.addEventListener("pointerdown",t=>{t.preventDefault(),t.stopPropagation();const n=kn();if(!n||n.where!=="park"&&n.where!=="ranch"&&n.where!=="barn")return;const s=n.where!=="park",o=n.where;xt=[];const i=M(s?"ranchScroll":"parkScroll"),a=s?on():ys(),r=o==="barn"?td:s?Qi:ud,l=w=>{const _=M(s?"ranchWorld":"parkWorld").getBoundingClientRect();return{x:(w.clientX-_.left)/a,y:(w.clientY-_.top)/a}},c=l(t),d={x:n.x-c.x,y:n.y-c.y};let f=t,p=0,g=n.x,b=!1;const m=w=>{const _=l(w),S=kn();if(!S)return;const R=Math.max(60,Math.min(r-60,_.x+d.x)),D=Math.max(470,Math.min(590,_.y+d.y));if(!b&&Math.hypot(R-S.x,D-S.y)<6)return;b=!0;const U=Math.abs(R-g)>3?R<g:S.flip;Math.abs(R-g)>3&&(g=R),tn(o==="barn"?{where:"barn",x:R,y:D,flip:U}:s?{where:"ranch",x:R,y:D,flip:U,...S.ride!==void 0?{ride:S.ride}:{}}:{where:"park",x:R,y:D,flip:U})},v=()=>{const w=i.getBoundingClientRect(),_=f.clientX<w.left+70?-10:f.clientX>w.right-70?10:0;_&&b&&(i.scrollLeft+=_,m(f)),p=requestAnimationFrame(v)};p=requestAnimationFrame(v),e.classList.add("lifted"),P.pick();const y=w=>{w.pointerId===t.pointerId&&(f=w,m(w))},u=w=>{w.pointerId===t.pointerId&&(cancelAnimationFrame(p),window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",u),e.classList.remove("lifted"),P.drop())};window.addEventListener("pointermove",y),window.addEventListener("pointerup",u)})}M("parkWorld").addEventListener("pointerdown",e=>{e.target.closest(".pspot, .ball, .pet")&&e.stopPropagation()});M("parkWorld").addEventListener("click",e=>{const t=e.target,n=kn();if(!n)return;if(t.closest("#ball")){Oe||P.boing(),UC();return}const s=t.closest("[data-spot]");if(s){const i=+s.dataset.spot,a=cc[i];if(n.spot===i&&n.pose){tn({where:"park",x:a.x,y:Math.min(590,a.y+40),flip:n.flip}),P.drop();return}if(ns().some(r=>!r.mine&&r.p.spot===i&&r.p.pose)){F("Someone is already there!"),P.pop();return}tn({where:"park",x:a.x,y:a.y,flip:n.flip,pose:a.kind==="swing"?"swing":"sit",spot:i}),a.kind==="swing"?P.boing():P.drop();return}const o=t.closest("[data-act]")?.dataset.act;if(o==="slide"&&(tn({where:"park",x:ge.bottom.x,y:ge.bottom.y,flip:!1,pose:"slide"}),P.swish(),setTimeout(()=>{const i=kn();i?.pose==="slide"&&tn({where:"park",x:i.x,y:i.y,flip:i.flip})},1500)),o==="splash"){const i=M("parkWorld").getBoundingClientRect(),a=(e.clientX-i.left)/ys();Ju(a),k?.fx({k:"splash",x:a})}o==="exit"&&e0()});function Ju(e){const t=document.getElementById("ripples");if(!t||T!=="park")return;const n=ys();for(let s=0;s<2;s++){const o=document.createElement("div");o.className="ripple";const i=(120+s*70)*n;Object.assign(o.style,{left:e*n-i/2+"px",top:512*n-i*.18+"px",width:i+"px",height:i*.36+"px",animationDelay:s*.15+"s"}),t.appendChild(o),setTimeout(()=>o.remove(),1400)}for(let s=0;s<6;s++){const o=document.createElement("div");o.className="drop",Object.assign(o.style,{left:e*n+"px",top:505*n+"px"}),o.style.setProperty("--dx",(s-2.5)*14+"px"),t.appendChild(o),setTimeout(()=>o.remove(),900)}P.splash()}function HC(){ao(),xt=[],Ue=!1,T="park",M("park").classList.remove("hidden"),Xi(M("park"));const e={where:"park",x:290,y:548,flip:!1};k?Ye(e):It=e,M("streetTitle").textContent="The Park",bn(),af(),requestAnimationFrame(()=>{const t=M("parkScroll");t.scrollLeft=0,at()}),P.sparkle()}function e0(){$o()}function OC(){return pl()&&!document.body.classList.contains("phone")}function ch(){return pl()?520:280}function WC(){ao(),xt=[],Ue=!1,T="gameroom",M("gameroom").classList.remove("hidden");const e=Oo(),t=e?{where:"gameroom",x:e.x,y:Math.max(Ws,Math.min(Dn,e.y)),flip:!1}:{where:"gameroom",x:ch(),y:560,flip:!1};k?Ye(t):It=t,M("streetTitle").textContent="The Clubhouse",bn(),Bd(),requestAnimationFrame(()=>{const n=hs(),s=M("grScroll"),o=e?.x??(OC()?60+eu/2:ch());s.scrollLeft=Math.max(0,o*n-s.clientWidth/2),at(),M0()}),Xi(M("gameroom")),P.sparkle()}M("btnLeavePark").addEventListener("click",()=>{T==="ranch"&&Ue?Ui(!1):e0()});let Fn={x:2620,y:565},Oe=null;function _r(e=!1){const t=document.getElementById("ball");if(!t)return;const n=ys(),s=34*n;e||t.classList.remove("flying"),t.style.left=Fn.x*n-s/2+"px",t.style.top=Fn.y*n-s+"px",t.style.width=t.style.height=s+"px"}function UC(){if(Oe)return;const e=dt.x0+40+Math.random()*(dt.x1-dt.x0-80),t=dt.y0+25+Math.random()*(dt.y1-dt.y0-35);t0(k?k.pid:"solo",e,t),k?.fx({k:"ball",x:e,y:t})}function t0(e,t,n){if(T!=="park")return;const s=document.getElementById("ball");Fn={x:t,y:n},Oe={thrower:e,phase:"fly",dog:null,until:performance.now()+12e3},s&&(s.classList.remove("flying"),s.offsetWidth,s.classList.add("flying"),_r(!0)),P.boing(),setTimeout(()=>{Oe?.phase==="fly"&&(Oe.phase="chase",document.getElementById("ball")?.classList.remove("flying"),jn.size||(Oe=null))},650)}function VC(e){if(!k)return It;const t=e===k.pid?ke():k.presence.get(e);return t&&t.where==="park"?t:null}const jn=new Map,Zl=e=>(t,n,s,o,i)=>{t.style.left=(n-o/2)*e+"px",t.style.top=(s-i)*e+"px",t.style.width=o*e+"px",t.style.height=i*e+"px"};function QC(){const e=[];if(T==="house"){const t=E.get(),n={box:X,place:oo,z:s=>String(4e3+Math.round(s)),scale:1};if(k&&Re!==J){const s=[...k.presence.entries()],o=ke();o&&s.push([k.pid,o]);for(const[i,a]of s){const r=k.players.get(i)?.dog;if(r&&a.where==="house"&&a.houseId===Se&&a.room===t.currentRoom){const l=Mt(t.currentRoom,In(i,a),a);e.push({key:i,dog:r,x:l.x,y:l.y,flip:a.flip,...n})}}}else if(t.dog){const s=t.characters.find(o=>o.id===t.dog.owner)??t.characters[0];if(s&&s.room===t.currentRoom){const o=Mt(s.room,Et(s),s);e.push({key:"solo",dog:t.dog,x:o.x,y:o.y,flip:s.flip,...n})}}}else if(T==="park"){const t=document.getElementById("pavatars");if(!t)return e;const n=ys();for(const s of ns())s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Zl(n),z:o=>String(Math.round(o)-200),scale:.95})}else if(T==="ranch"){const t=document.getElementById("ravatars");if(!t)return e;const n=on();for(const s of ns(Ue?"barn":"ranch"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Zl(n),z:o=>String(100+Math.round(o)),scale:.95,riding:s.p.ride!==void 0})}else if(T==="gameroom"){const t=document.getElementById("gavatars");if(!t)return e;const n=hs();for(const s of ns("gameroom"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Zl(n),z:o=>String(Math.round(o)-200),scale:.95})}return e}let dh=performance.now();function zC(e,t){const n=new Set;for(const s of QC()){if(NC(s.key))continue;n.add(s.key);let o=jn.get(s.key);const i=s.flip?1:-1,a=!s.riding&&T==="house"&&E.get().currentRoom==="backyard",r=s.riding?200:78;let l=a?ip.x:s.x+i*r;s.riding?l=Math.max(50,Math.min(Qi-50,l)):T==="house"&&!a&&(l=l0(l,46));const c=a?ip.y:Math.min(595,s.y+(s.riding?28:6));if(!o||o.box!==s.box||!o.el.isConnected){o?.el.remove();const _=document.createElement("div");_.className="pet pet-dog",_.dataset.dog=s.key,s.box.appendChild(_),qC(_,s.key),o={el:_,box:s.box,x:l,y:c,flip:s.flip,pose:"",look:"",idle:1,trickUntil:0,sitTrick:!1},jn.set(s.key,o)}let d=l,f=c,p=s.riding?980:320;if(Oe&&e>Oe.until&&(Oe=null,_r()),Oe&&T==="park"){if(Oe.phase==="chase")d=Fn.x,f=Fn.y,p=950,Math.hypot(o.x-d,o.y-f)<28&&(Oe.phase="carry",Oe.dog=s.key,P.woof());else if(Oe.phase==="carry"&&Oe.dog===s.key){const _=VC(Oe.thrower)??{x:(dt.x0+dt.x1)/2,y:540};d=_.x+60,f=Math.min(590,_.y+6),p=750,Fn={x:o.x+(o.flip?-40:40),y:o.y-30*s.scale},Math.hypot(o.x-d,o.y-f)<26&&(Fn={x:_.x+70,y:Math.min(590,_.y+12)},Oe=null,Ua(o,"♥"),P.sparkle()),_r()}}const g=e<o.trickUntil,b=d-o.x,m=f-o.y,v=Math.hypot(b,m);let y=!1;if(v>(Oe?4:10)&&!g){const _=ps()?v:Math.min(v,p*t);o.x+=b/v*_,o.y+=m/v*_,y=!0,Math.abs(b)>1.5&&(o.flip=b<0),o.idle=0}else o.idle+=t,!g&&o.idle>.3&&Math.abs(s.x-o.x)>4&&(o.flip=s.x<o.x);const u=g&&o.sitTrick?"sit":y?"stand":o.idle>.9?"sit":"stand",w=u+s.dog.breed;if(o.pose+o.look!==u+w){for(const _ of[...o.el.children])_.matches(".bubble, .kennelBtn")||_.remove();o.el.insertAdjacentHTML("afterbegin",`<div class="inner">${Pi(s.dog.breed,u)}</div>`),o.pose=u,o.look=w}o.el.dataset.name=s.dog.name,o.el.classList.toggle("walking",y),o.el.classList.toggle("flipped",o.flip),s.place(o.el,o.x,o.y,92*s.scale,71*s.scale),o.el.style.zIndex=s.z(o.y+1),a0(o.el,s.key,!1)}for(const[s,o]of jn)n.has(s)||(o.el.remove(),jn.delete(s))}function Ua(e,t){e.el.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.el.appendChild(n),Uo(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const fh=new Map;function n0(e,t){const n=jn.get(e);if(!n)return;const s=n.el.dataset.name??"";n.trickUntil=performance.now()+1400,n.sitTrick=t===0,n.el.classList.remove("spin","hop"),n.el.offsetWidth,t===0&&(Ua(n,`${s} sits! 🐾`),P.pop()),t===1&&(n.el.classList.add("spin"),Ua(n,"Wheee! ✨"),P.spin()),t===2&&(n.el.classList.add("hop"),Ua(n,"Woof! Woof!"),P.woof())}function qC(e,t){e.addEventListener("pointerdown",n=>{n.stopPropagation(),n.preventDefault()}),e.addEventListener("click",n=>{n.stopPropagation();const s=(fh.get(t)??0)%3;fh.set(t,s+1),n0(t,s),k&&k.fx({k:"trick",owner:t,v:s})})}function al(e){const t=e?.dogKennel?.item;if(!t||!e)return null;for(const n of Object.values(e.rooms)){const s=n.items.find(o=>o.id===t&&o.kind==="kennel");if(s)return s}return null}function ZC(e){if(e==="solo")return J.get();if(!k)return null;const t=k.players.get(e)?.houseId;return t?k.view(t):null}function NC(e){return!!al(ZC(e))}function rf(){if(k){const e=k.myHouseId();return e?k.view(e):null}return J.get()}function s0(){if(T!=="house")return null;const e=E.get(),t=al(e);if(!t||!e.rooms[e.currentRoom]?.items.some(n=>n.id===t.id))return null;if(k&&Re!==J){const n=k.houses.get(Se)?.meta.ownerId,s=n?k.players.get(n)?.dog??null:null;return!n||!s?null:{key:n,dog:s,item:t}}return e.dog?{key:"solo",dog:e.dog,item:t}:null}function FC(){const e=rf();if(!e)return null;const t=xr()?E.get().currentRoom:null;let n=null,s=null;for(const[o,i]of Object.entries(e.rooms))for(const a of i.items)a.kind==="kennel"&&((!n||a.z>=n.z)&&(n=a),o===t&&(!s||a.z>=s.z)&&(s=a));return s??n}function _a(e){if(!df()){F("Adopt a dog first!");return}di({type:"dog/kennel",item:e}),e?(P.pop(),F("Rest well, puppy!")):(P.woof(),F("Come on, puppy!"))}function lf(e){if(!df()){F("Adopt a dog first!");return}const t=al(rf());if(e===void 0){if(t){_a(null);return}const n=FC();if(!n){F("Put a dog kennel down first!");return}_a(n.id);return}t?.id===e?_a(null):_a(e)}function o0(e){const t=E.get(),n=t.rooms[t.currentRoom]?.items.find(s=>s.id===e);if(n){if(n.kind==="kennel"){xr()&&lf(n.id);return}n.kind==="cat-tower"&&iS()}}function jC(e,t){const n=E.get(),s=n.rooms[n.currentRoom]?.items.find(i=>i.id===t);if(!s)return;const o=sy(s.kind);if(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),P.click(),o==="kennel"||o==="tower"){o0(t);return}if(wh(s.kind)){NM();const i=!s.on;E.dispatch({type:"item/power",room:n.currentRoom,id:t,on:i}),i&&Yn(s.kind)==="tv"&&XC(s),ss();return}if(!CL(s.kind,t,n.soundOn,ss)){if(o==="open"){e.classList.toggle("opened"),ss();return}if(o==="lamp"){e.classList.toggle("lamp-on");return}o==="sit"&&i0(s),o==="swing"&&JC(s)}}const ph={dance:Te*2,sway:Te*4,watch:Te*5,warm:Te*3,hug:Te*2,bounce:Te,bathe:Te*3,nibble:Te,...xL},GC={dance:"<span>♪</span><span>♫</span>",sway:"<span>♪</span>",hug:"<span>♥</span>",bathe:'<span class="bub"></span><span class="bub"></span><span class="bub"></span>',nibble:"<span>✦</span>",...ML},$a={stereo:"<span>♪</span><span>♫</span><span>♪</span>",musicbox:"<span>♪</span><span>♩</span>",tv:'<span class="glow"></span>',fire:'<span class="glow"></span><span class="ember"></span><span class="ember"></span>',tub:'<span class="bub"></span><span class="bub"></span><span class="bub"></span><span class="bub"></span>',fridge:'<span class="food">🍓</span><span class="food">🧁</span>',...LL},Nl=new Map;let Fl=0;setInterval(()=>ss(),1e3);function ss(){Fl||(Fl=requestAnimationFrame(()=>{Fl=0,YC()}))}function Ps(e,t,n){let s=e.querySelector(":scope > .ambFx");if(!t){s?.remove();return}s||(s=document.createElement("i"),s.className="ambFx",s.setAttribute("aria-hidden","true"),e.appendChild(s)),s.dataset.k!==n&&(s.innerHTML=t,s.dataset.k=n,s.className="ambFx fx-"+n)}function hh(e,t,n){const s=t?t.kind+"|"+t.item:"",o=e.dataset.amb||"";if(o!==s){if(o&&e.classList.remove("amb-"+o.split("|")[0],"amb-l","amb-r"),o.startsWith("bathe|")&&!t&&(e.classList.add("amb-sparkle"),setTimeout(()=>e.classList.remove("amb-sparkle"),1200)),!t){delete e.dataset.amb,Ps(e,null,"");return}e.dataset.amb=s,e.style.setProperty("--amb-delay",Is(t.phase,ph[t.kind],n)+"ms"),e.style.setProperty("--amb-period",ph[t.kind]+"ms"),e.classList.add("amb-"+t.kind,t.face<0?"amb-l":"amb-r"),Ps(e,GC[t.kind]??null,t.kind)}}function YC(){const e=E.get(),t=e.rooms[e.currentRoom];if(T!=="house"||!t){wp(null);return}const n=Date.now(),s=new Set;for(const m of t.items){if(Yn(m.kind)!=="musicbox")continue;if(!m.on){Nl.delete(m.id);continue}const v=Nl.get(m.id)??(Nl.set(m.id,n),setTimeout(ss,Mf+60),n);n-v>=Mf&&s.add(m.id)}const o=new Set;X.querySelectorAll(".item.opened").forEach(m=>{m.dataset.id&&o.add(m.dataset.id)});const i=t.items.map(m=>{const v=Me[m.kind];return{id:m.id,kind:m.kind,x:m.x,y:m.y,on:!!m.on,w:v?qd(v,Ke(m)).w:200}}),a=[],r=new Map;for(const m of e.characters){const v=Bt.get(m.id);if(m.room!==e.currentRoom||!v||v.classList.contains("lifted"))continue;const y=Et(m)?.pose;a.push({id:m.id,x:m.x,y:m.y,seated:y==="sit",lying:y==="lie"}),r.set(m.id,v)}if(k&&Re!==J){const m=[...k.presence.entries()],v=ke();v&&m.push([k.pid,v]);for(const[y,u]of m){const w=As.get(y);if(!w||!w.isConnected||u.where!=="house"||u.houseId!==Se||u.room!==e.currentRoom||w.classList.contains("lifted"))continue;const _=In(y,u)?.pose;a.push({id:"p:"+y,x:u.x,y:u.y,seated:_==="sit",lying:_==="lie"}),r.set("p:"+y,w)}}const l=SL(n),c=G0(i,a,{fridgesOpen:o,musicBoxDone:s,keysPlaying:l}),d=YM(i,c);if(d)for(const m of d.dancers){const v=c.get(m);v&&c.set(m,{...v,phase:0,face:v.face})}for(const m of[...Bt.values(),...As.values()])[...r.values()].includes(m)||hh(m,void 0,n);r.forEach((m,v)=>hh(m,c.get(v),n));const f=new Set([...c.values()].filter(m=>m.kind==="bathe").map(m=>m.item));let p=null;for(const m of t.items){const v=X.querySelector(`.item[data-id="${m.id}"]`);if(!v)continue;const y=Yn(m.kind),u=!!m.on&&!!y&&!s.has(m.id);if(v.classList.toggle("amb-on",u),u)v.dataset.amb=y,v.style.getPropertyValue("--amb-delay")||v.style.setProperty("--amb-delay",Is(0,Te,n)+"ms"),y==="stereo"?p="stereo":y==="musicbox"&&!p&&(p="musicbox"),Ps(v,$a[y],y);else if(Ro(m.kind)&&f.has(m.id))Ps(v,$a.tub,"tub");else if(Bo(m.kind)&&o.has(m.id))Ps(v,$a.fridge,"fridge");else{const w=PL(m.kind,m.id,c,l,o,f.size>0);v.classList.toggle("soc-ducky",w==="ducky"),w?Ps(v,$a[w]||null,w):(delete v.dataset.amb,Ps(v,null,""))}}KC(d,n),wp(p);const g=new Map;for(const m of a)g.set(m.id,{el:r.get(m.id),d:m});const b=e.baby&&e.baby.room===e.currentRoom&&!e.baby.holder?{x:e.baby.x,y:e.baby.y}:null;RL({layer:X,roomW:$t,seed:Se||"local",now:n,reduced:ps(),dolls:g,baby:b},c)}let jl="";function KC(e,t){const n=M("partyFx"),s=!!e&&T==="house";document.body.classList.toggle("party-on",s),n.classList.toggle("on",s),s?(n.style.setProperty("--px",e.x/ue*100+"%"),jl!==e.stereo&&(n.style.setProperty("--amb-delay",Is(0,Te,t)+"ms"),jl=e.stereo)):jl="";const o=new Set(s?e.toys:[]);X.querySelectorAll(".item").forEach(c=>{const d=o.has(c.dataset.id||"");d!==c.classList.contains("party-bounce")&&(c.classList.toggle("party-bounce",d),d&&c.style.setProperty("--amb-delay",Is(0,Te,t)+"ms"))});const i=s?X.querySelector(`.item[data-id="${e.stereo}"]`):null,a=Id.getBoundingClientRect(),r=a.width?ue/a.width:1,l=i?.getBoundingClientRect();X.querySelectorAll(".pet").forEach(c=>{let d=!1;if(l){const f=c.getBoundingClientRect();d=Math.hypot((f.left+f.width/2-l.left-l.width/2)*r,(f.bottom-l.bottom)*r*1.5)<=GM&&!c.classList.contains("leap")&&!c.classList.contains("curl")}d!==c.classList.contains("party-hop")&&(c.classList.toggle("party-hop",d),d&&c.style.setProperty("--amb-delay",Is(.5,Te*2,t)+"ms"))})}function XC(e){const t=E.get();if(k&&T==="house"){const s=ke();if(!s||s.where!=="house"||s.seat)return}else{const s=t.characters.find(o=>o.id===Be&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(!s||s.seat)return}const n=t.rooms[t.currentRoom].items.filter(s=>no(s.kind)?.pose==="sit"&&Math.abs(s.x-e.x)<520).sort((s,o)=>Math.abs(s.x-e.x)-Math.abs(o.x-e.x))[0];n&&i0(n)}let At=null,li=!1;function $r(){X.querySelectorAll(".item.swinging").forEach(e=>{(!At||e.dataset.id!==At.item)&&e.classList.remove("swinging")}),At&&X.querySelector(`.item[data-id="${At.item}"]`)?.classList.add("swinging")}function JC(e){const t=E.get(),n=t.characters.find(i=>i.id===Be&&i.room===t.currentRoom)??t.characters.find(i=>i.room===t.currentRoom);if(!n)return;if(At?.id===n.id&&At.item===e.id){At=null,li=!0,E.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x+70,y:Math.max(e.y,520)}),li=!1,$r();return}const s=Me[e.kind],o=e.y-(s?pt(s)*Ke(e)*.26:40);At={id:n.id,item:e.id},li=!0,E.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x,y:o}),li=!1,$r()}function i0(e){const t=el(e);if(!t)return;if(k&&T==="house"){const i=ke();if(!i||i.where!=="house")return;if(!k.speaksSit){const r="p:"+k.pid,l=gn.get(r)?.item===e.id,c=Math.max(Gs+40,t.footY-8);l?gn.delete(r):gn.set(r,{item:e.id,pose:t&&no(e.kind).pose,n:0});const{seat:d,...f}=i;Ye({...f,x:e.x,y:c,flip:!1}),Lt();return}const a=xi({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:Hi(void 0,k.pid),alreadyOn:i.seat?.id===e.id?e.id:null});if(a.toast){F(a.toast),P.pop();return}if(!a.moved)return;Oa(i,a.x,a.y,!1,a.seat?{id:a.seat.item,pose:a.seat.pose,n:a.seat.n}:null),Lt(),Ks(!1);return}const n=E.get(),s=n.characters.find(i=>i.id===Be&&i.room===n.currentRoom)??n.characters.find(i=>i.room===n.currentRoom);if(!s)return;const o=xi({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:Hi(s.id),alreadyOn:s.seat?.item===e.id?e.id:null});if(o.toast){F(o.toast),P.pop();return}o.moved&&(ri(s.id,n.currentRoom,o.x,o.y,o.seat),Ks(!1))}function a0(e,t,n){const s=k?t===k.pid:t==="solo";let o=e.querySelector(".kennelBtn");if(!s){o?.remove();return}o||(o=document.createElement("button"),o.type="button",o.className="kennelBtn",o.addEventListener("pointerdown",i=>{i.stopPropagation(),i.preventDefault()}),o.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault(),lf()}),e.appendChild(o)),o.textContent=n?"Out":"Kennel",eS(o)}function eS(e){if(T!=="house"){e.style.left=e.style.right=e.style.top=e.style.bottom=e.style.transform="";return}const t=e.parentElement;if(!t)return;const n=j.getBoundingClientRect().width/j.offsetWidth||1,s=j.getBoundingClientRect(),o=4,i={l:s.left+o,t:s.top+o,r:s.right-o,b:s.bottom-o},a=X.querySelector(".char")?.getBoundingClientRect(),r=X.querySelector('.item[data-kind="sofa"]')?.getBoundingClientRect(),l=[...X.querySelectorAll(".pet-cat, .item")].map(O=>O.getBoundingClientRect()).filter(O=>O.width>2&&O.height>2),c=(O,W)=>!!W&&O.left<W.right-1&&O.right>W.left+1&&O.top<W.bottom-1&&O.bottom>W.top+1,d=(O,W)=>c(O,W)?Math.max(0,Math.min(O.right,W.right)-Math.max(O.left,W.left))*Math.max(0,Math.min(O.bottom,W.bottom)-Math.max(O.top,W.top)):0,f=O=>{let W=0;O.left<i.l&&(W+=(i.l-O.left)*8),O.right>i.r&&(W+=(O.right-i.r)*8),O.top<i.t&&(W+=(i.t-O.top)*8),O.bottom>i.b&&(W+=(O.bottom-i.b)*8),W+=d(O,a)*4,W+=d(O,r)*4;for(const Xe of l)W+=d(O,Xe)*4;return W},p=t.getBoundingClientRect(),g=!a||p.left+p.width/2<=a.left+a.width/2,b=O=>({left:O?"0px":"auto",right:O?"auto":"0px",top:"46%",bottom:"auto",transform:O?"translate(-108%, -50%)":"translate(108%, -50%)"}),m=[b(g),b(!g),{left:"50%",right:"auto",top:"0px",bottom:"auto",transform:"translate(-50%, -115%)"}];let v=m[0],y=1/0;for(const O of m){Object.assign(e.style,O);const W=f(e.getBoundingClientRect());W<y&&(y=W,v=O)}Object.assign(e.style,v);let u=e.getBoundingClientRect(),w=0,_=0;u.left<i.l&&(w+=i.l-u.left),u.right>i.r&&(w-=u.right-i.r),u.top<i.t&&(_+=i.t-u.top),u.bottom>i.b&&(_-=u.bottom-i.b);const S=O=>{if(!O)return;const W=()=>new DOMRect(u.left+w,u.top+_,u.width,u.height);if(!c(W(),O))return;const Xe=Math.min(W().bottom,O.bottom)-Math.max(W().top,O.top),lt=O.bottom+4-W().top,Qe=O.top-4-W().bottom,De=rn=>W().top+rn>=i.t&&W().bottom+rn<=i.b;if(Xe<u.height*.5&&De(lt)){_+=lt;return}if(Xe<u.height*.5&&De(Qe)){_+=Qe;return}const Ee=O.left-i.l,ht=i.r-O.right,gt=O===r?a:r,bs=(rn,hl)=>{if(!gt)return!1;const ks=hl?rn-u.width:rn,Vo=new DOMRect(ks,W().top,u.width,u.height);return c(Vo,gt)};ht>=u.width+4&&!bs(O.right+4,!1)?w+=O.right+4-W().left:Ee>=u.width+4&&!bs(O.left-4,!0)?w+=O.left-4-W().right:De(lt)?_+=lt:De(Qe)&&(_+=Qe)};S(a),S(r);const R=t.querySelector(".inner")?.getBoundingClientRect(),D=R&&R.width>2?R:p,U=X.querySelector(".pet-cat")?.getBoundingClientRect(),Z=X.querySelector('.item[data-kind="sandbox"]')?.getBoundingClientRect(),ne=X.querySelector('.item[data-kind="yard-bench"]')?.getBoundingClientRect(),G=[...X.querySelectorAll('.item[data-kind="yard-swing"], .item[data-kind="picnic-blanket"], .item[data-kind="lemonade-cart"], .item[data-kind="tulip-bed"]')].map(O=>O.getBoundingClientRect()),ee=j.querySelector(".yardDoor"),an=ee?[ee,ee.querySelector(".yardHintLabel"),ee.querySelector(".doorArt")].map(O=>O?.getBoundingClientRect()):[],Ut=document.getElementById("secrets"),Ne=Ut&&Ut.offsetParent?Ut.getBoundingClientRect():void 0,A=Ne&&Ne.width>2&&Ne.left<i.r&&Ne.right>i.l&&Ne.top<i.b&&Ne.bottom>i.t?Ne:void 0,H=A?new DOMRect(A.left-8,A.top-8,A.width+16,A.height+16):void 0,Y=[a,r,U,Z,ne,H,...G,...an].filter(O=>!!O&&O.width>2&&O.height>2),Q=new DOMRect(u.left+w,u.top+_,u.width,u.height),z=D.left+D.width/2,K=D.top+D.height/2,pe=O=>Math.hypot(O.left+O.width/2-z,O.top+O.height/2-K),Le=O=>{const W=Math.min(O.right,D.right)-Math.max(O.left,D.left),Xe=Math.min(O.bottom,D.bottom)-Math.max(O.top,D.top);return W>1&&Xe>1},ye=O=>O.left>=i.l-.5&&O.right<=i.r+.5&&O.top>=i.t-.5&&O.bottom<=i.b+.5&&Y.every(W=>!c(O,W))&&!Le(O);let Ve=Q;if(!ye(Q)||pe(Q)>150){const O=[],W=(Qe,De)=>{let Ee=Qe,ht=De;Ee<i.l&&(Ee=i.l),ht<i.t&&(ht=i.t),Ee+u.width>i.r&&(Ee=Math.max(i.l,i.r-u.width)),ht+u.height>i.b&&(ht=Math.max(i.t,i.b-u.height)),O.push(new DOMRect(Ee,ht,u.width,u.height))};W(D.left+(D.width-u.width)/2,D.top-u.height-8),W(D.right-u.width,D.top-u.height-6),W(D.left,D.top-u.height-6),a&&W(a.right+6,D.top-u.height-8),ne&&W(ne.left-u.width-6,ne.top-u.height-6),a&&ne&&W(a.right+6,ne.top-u.height-6),a&&(W(a.left-12,a.top-u.height-8),W(i.l,a.top-u.height-10),W(a.left+(a.width-u.width)/2,a.top-u.height-8)),W(i.r-u.width,D.top-u.height-6),W(D.right+8,D.top+(D.height-u.height)/2),W(D.left-u.width-8,D.top+(D.height-u.height)/2),W(Q.left,Q.top);for(const Qe of[u.width*.65,u.width*1.05,88,120,155])for(let De=0;De<8;De++){const Ee=De*Math.PI/4;W(z+Math.cos(Ee)*Qe-u.width/2,K+Math.sin(Ee)*Qe-u.height/2)}const Xe=Qe=>{let De=1/0,Ee=null;for(const ht of O){if(!ye(ht)||pe(ht)>Qe)continue;const gt=pe(ht);gt<De&&(De=gt,Ee=ht)}return Ee},lt=Xe(170)??Xe(360);if(lt)Ve=lt;else if(!ye(Q)){let Qe=null,De=1/0;for(const Ee of O){if(Ee.left<i.l-.5||Ee.right>i.r+.5||Ee.top<i.t-.5||Ee.bottom>i.b+.5)continue;const gt=(Le(Ee)?1e4:0)+Y.reduce((bs,rn)=>bs+d(Ee,rn),0)+pe(Ee);gt<De&&(De=gt,Qe=Ee)}Qe&&(Ve=Qe)}}w+=Ve.left-Q.left,_+=Ve.top-Q.top,(w||_)&&(e.style.transform=`${e.style.transform} translate(${(w/n).toFixed(1)}px, ${(_/n).toFixed(1)}px)`)}function tS(e,t){e.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.appendChild(n),Uo(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const ci=new Map;function nS(){const e=new Set,t=s0();if(t){e.add(t.key);const n=j2(t.dog.name,Date.now()),s=Me[t.item.kind],i=(s?so(s,t.item.y):Math.min(t.item.y,We-au))-(n==="peek"?24:2);let a=ci.get(t.key);if(!a||!a.el.isConnected){a?.el.remove();const l=document.createElement("div");l.className="pet pet-dog kenneled",l.dataset.dog="kennel:"+t.key,X.appendChild(l),l.addEventListener("pointerdown",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),c.preventDefault())}),l.addEventListener("click",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),tS(l,`${l.dataset.name??"Puppy"} is resting`))}),a={el:l,pose:"",look:"",x:t.item.x,y:i},ci.set(t.key,a)}const r=n==="rest"?"sleep":"sit";if(a.pose!==r||a.look!==n+t.dog.breed){for(const l of[...a.el.children])l.matches(".bubble, .kennelBtn")||l.remove();a.el.insertAdjacentHTML("afterbegin",`<div class="inner">${Pi(t.dog.breed,r)}</div>${n==="rest"?'<div class="zzz"><b>Zzz</b><i>z</i><i>z</i><i>z</i></div>':""}`),a.pose=r,a.look=n+t.dog.breed}a.el.dataset.name=t.dog.name,a.el.classList.toggle("rest",n==="rest"),a.el.classList.toggle("peek",n==="peek"),a.x=t.item.x,a.y=i,oo(a.el,t.item.x,i,100,77),a.el.style.zIndex=String(1e3+t.item.z+1),a0(a.el,t.key,!0)}for(const[n,s]of ci)e.has(n)||(s.el.remove(),ci.delete(n))}let re=null,xa="",Gl=0,cf=0,Va={x:0,perch:0,leap:!1};const sS=562;function r0(e){return(e.rooms[e.currentRoom]?.items.filter(n=>n.kind==="cat-tower")??[]).reduce((n,s)=>!n||s.z>=n.z?s:n,null)}function gh(e){return e==="cat-bed"||e==="pet-bed"||e==="dog-bed"||e==="pack:cat-bed"||/(?:^|:)cat-bed$|(?:^|:)pet-bed$/.test(e)}function oS(e){const t=e.rooms[e.currentRoom]?.items??[],n=t.filter(a=>gh(a.kind)),s=t.filter(a=>a.kind==="bed"),o=(n.length?n:s).reduce((a,r)=>!a||r.z>=a.z?r:a,null);if(!o)return null;const i=Me[o.kind];return{x:o.x,y:o.y,h:i?pt(i)*Ke(o):80,pet:gh(o.kind)}}function iS(){const e=E.get();!e.cat||e.cat.room!==e.currentRoom||!r0(e)||(cf=performance.now()+900,P.boing(),k?.fx({k:"leap"}))}function aS(){const e=E.get(),t=T==="house"?e.cat:null;if(!t||t.room!==e.currentRoom){re&&(re.remove(),re=null,xa="",Gl=0);return}(!re||!re.isConnected)&&(re=document.createElement("div"),re.className="pet pet-cat",X.appendChild(re),xa="",re.addEventListener("pointerdown",R=>{R.stopPropagation(),R.preventDefault()}),re.addEventListener("click",R=>{R.stopPropagation(),c0(),k&&k.fx({k:"purr"})}));const n=r0(e),s=n?null:oS(e),o=n?Me[n.kind]:void 0,i=n&&o?pt(o)*Ke(n):0,a=G2(t,Date.now(),n?{x:n.x}:null,s?{x:s.x}:null,ps()),r=!!n&&performance.now()<cf,l=r?2:a.perch,c=r&&n?n.x:a.x,d=r?"play":a.mood,f=d==="walk"?"stand":d==="nap"?"nap":"sit",p=f+t.coat+(l?"p":"");if(p!==xa){const R=[...re.querySelectorAll(".bubble, .heart")];re.innerHTML=`<div class="inner">${Lo(t.coat,f)}</div>${f==="nap"?'<div class="zzz"><i>z</i><i>z</i><i>z</i></div>':""}`;for(const D of R)re.appendChild(D);xa=p}if(l>0&&Gl===0){re.classList.add("hop");const R=re;setTimeout(()=>R.classList.remove("hop"),420)}Gl=l,re.dataset.name=t.name,re.dataset.mood=d,re.dataset.perch=String(l),re.dataset.leap=r?"1":"0",re.dataset.curl=a.curl?"1":"0",re.classList.toggle("walking",d==="walk"),re.classList.toggle("groom",d==="groom"),re.classList.toggle("play",d==="play"&&!r),re.classList.toggle("leap",r),re.classList.toggle("flipped",a.flip),re.classList.toggle("curl",a.curl===1),X.querySelectorAll(".item.toy-live").forEach(R=>R.classList.remove("toy-live")),n&&d==="play"&&l&&!r&&X.querySelector(`.item[data-id="${n.id}"]`)?.classList.add("toy-live");const g=window.__pinCat,b=!!(g&&Number.isFinite(g.x)),m=b&&Number.isFinite(g.y)?g.y:sS,v=!b&&l&&n?F2(n.y,i,l):!b&&a.curl&&s?s.y-s.h*(s.pet?.38:.2):m,y=e.currentRoom==="backyard"&&!l,u=!b&&l?92:y?115:128,w=!b&&l?110:y?135:150,_=b?g.x:e.currentRoom==="backyard"?Xn.x:l0(c,w/2),S=!b&&e.currentRoom==="backyard"&&!l?Xn.y:v;oo(re,_,S,w,u),re.style.zIndex=String(4e3+Math.round(S)),Va={x:_,perch:l,leap:r}}function l0(e,t){const n=E.get().currentRoom,s=n==="backyard"?pg:n==="living"?fg:null;if(!s)return e;const o=s.x-s.w/2-t-16,i=s.x+s.w/2+t+16;return e<=o||e>=i?e:e<s.x?o:i}function c0(){if(!re)return;P.purr(),setTimeout(()=>P.meow(),250),re.querySelector(".bubble")?.remove();const e=document.createElement("div");e.className="bubble petBubble",e.textContent=`${re.dataset.name} purrs ♥`,re.appendChild(e),Uo(),setTimeout(()=>e.classList.add("out"),1500),setTimeout(()=>e.remove(),1900),re.classList.remove("happy"),re.offsetWidth,re.classList.add("happy");for(let t=0;t<5;t++){const n=document.createElement("div");n.className="heart",n.textContent="♥",n.style.left=20+Math.random()*60+"%",n.style.animationDelay=t*.12+"s",n.style.color=["#ff6b9a","#ff8fab","#e879c6"][t%3],re.appendChild(n),setTimeout(()=>n.remove(),1800)}}function rS(e,t){if(t.k==="zoo"||t.k==="apple"||t.k==="honk"||t.k==="hen"){_S(t);return}t.k==="trick"?n0(t.owner,t.v):t.k==="purr"?T==="house"&&c0():t.k==="leap"?T==="house"&&(cf=performance.now()+900):t.k==="ball"?t0(e,t.x,t.y):t.k==="splash"&&Ju(t.x)}function d0(e){const t=Math.min(.05,Math.max(0,(e-dh)/1e3));dh=e;try{zC(e,t),nS(),aS(),xS(e,t),_E(t),Tg()}catch{}requestAnimationFrame(d0)}function lS(){return k?k.view(k.myHouseId())?.cat??null:J.get().cat??null}function df(){return k?k.players.get(k.pid)?.dog??null:J.get().dog??null}function di(e){if(k){const t=k.myHouseId();t&&k.dispatch(t,e)}else J.dispatch(e)}const xr=()=>T==="house"&&(!k||Re===J||Se===k.myHouseId());function cS(e="cat"){const t=lS(),n=df(),s=J.get().characters,o={tab:e,coat:t?.coat??0,catName:t?.name??"",breed:n?.breed??0,dogName:n?.name??"",owner:n?.owner??s[0]?.id,err:"",bye:!1},i=Ft("",(l,c)=>{const d=g=>l.closest(`[${g}]`)?.getAttribute(g);if(d("data-pt")){o.tab=d("data-pt"),o.err="",o.bye=!1,r();return}if(d("data-coat")!=null){o.coat=+d("data-coat"),P.click(),r();return}if(d("data-breed")!=null){o.breed=+d("data-breed"),P.click(),r();return}if(d("data-cname")){o.catName=d("data-cname"),P.click(),r();return}if(d("data-dname")){o.dogName=d("data-dname"),P.click(),r();return}if(d("data-owner")){o.owner=d("data-owner"),P.click(),r();return}const f=d("data-pa");if(!f)return;const p=(i.root.querySelector("#petName")?.value??"").trim();if(f==="adoptCat"||f==="adoptDog"){const g=p||(f==="adoptCat"?o.catName:o.dogName),b=Fh(g);if(!b){o.err=g?"Hmm, try a different name!":"Pick a name first!",P.pop(),r();return}if(f==="adoptCat"){const m=xr(),v={name:b,coat:o.coat,room:m?E.get().currentRoom:t?.room??"living",x:m?Math.max(200,Math.min(ue-200,ce+de/2)):t?.x??1200};di({type:"cat/set",cat:v}),P.meow(),c(),F(t?`${b} looks great! 🐱`:m?`${b} moved in! 🐱`:`${b} is waiting at your house! 🐱`)}else{const m=k?{name:b,breed:o.breed}:{name:b,breed:o.breed,owner:o.owner};k?(k.setDog(m),T==="park"&&eo()):J.dispatch({type:"dog/set",dog:m}),P.woof(),c(),F(n?`${b} looks great! 🐶`:`${b} is your new best friend! 🐶`)}return}if(f==="callCat"){di({type:"cat/move",room:E.get().currentRoom,x:Math.max(200,Math.min(ue-200,ce+de/2))}),P.meow(),c();return}if(f==="kennelDog"){lf(),c();return}if(f==="bye"){if(!o.bye){o.bye=!0,r();return}o.tab==="cat"?di({type:"cat/set",cat:null}):(di({type:"dog/kennel",item:null}),k?k.setDog(null):J.dispatch({type:"dog/set",dog:null})),c(),F("They went to live with a kind friend 💛");return}},"wide pets"),a=i.root.querySelector(".card");function r(){const l=o.tab==="cat",c=l?t:n,d=l?H2:O2,f=l?o.catName:o.dogName,p=i.root.querySelector("#petName")?.value??"";a.innerHTML=`${jt}<h2>Pets</h2>
      <div class="petTabs"><button data-pt="cat" class="${l?"on":""}">🐱 Cat</button><button data-pt="dog" class="${l?"":"on"}">🐶 Dog</button></div>
      <p class="hint small">${l?k?"Your cat lives in your house. Friends can see her when they visit!":"Your cat lives in your house. She naps, purrs, and plays!":k?"Your dog follows you everywhere: the street, friends' houses, and the park!":"Your dog follows you around the house and to the park!"}</p>
      <div class="petRow"><div class="petPreview">${l?Lo(o.coat,"sit"):Pi(o.breed,"stand")}</div>
        <div class="swatches">${(l?fc:pc).map((g,b)=>`<button ${l?"data-coat":"data-breed"}="${b}" class="${b===(l?o.coat:o.breed)?"on":""}"><div>${l?Lo(b,"sit"):Pi(b,"stand")}</div><span>${g.name}</span></button>`).join("")}</div></div>
      <div class="label">Name</div>
      <div class="nameChips">${d.map(g=>`<button ${l?"data-cname":"data-dname"}="${g}" class="${g===f?"on":""}">${g}</button>`).join("")}</div>
      <input id="petName" class="petName" maxlength="14" autocomplete="off" placeholder="…or type a name" value="${fe(p)}"/>
      ${o.err?`<p class="err" id="petErr">${fe(o.err)}</p>`:""}
      ${!l&&!k&&s.length>1?`<div class="label">Who does your dog follow?</div><div class="walkers">${s.map(g=>`<button data-owner="${g.id}" class="${g.id===o.owner?"on":""}">${kt(g)}</button>`).join("")}</div>`:""}
      <div class="petBtns"><button class="go" data-pa="${l?"adoptCat":"adoptDog"}" id="adoptBtn">${c?"Save":"Adopt! 💛"}</button>
        ${l&&t&&xr()?'<button data-pa="callCat" id="callCat">Here, kitty!</button>':""}
        ${!l&&n?`<button data-pa="kennelDog" id="kennelDog">${al(rf())?"Come, puppy!":"Kennel"}</button>`:""}
        ${c?`<button class="danger" data-pa="bye">${o.bye?"Tap again to say goodbye":"Find a new home"}</button>`:""}</div>`}r()}M("btnPets").addEventListener("click",()=>cS(T==="house"?"cat":"dog"));requestAnimationFrame(d0);window.__pets=()=>{const e=s0(),t=e?ci.get(e.key):void 0;return{dogs:[...jn.keys()],dogPos:Object.fromEntries([...jn].map(([n,s])=>[n,{x:Math.round(s.x),y:Math.round(s.y)}])),cat:re?{mood:re.dataset.mood,name:re.dataset.name,perch:Va.perch,x:Math.round(Va.x),leap:Va.leap,curl:re.dataset.curl==="1"}:null,kennel:e&&t?{x:Math.round(t.x),y:Math.round(t.y),pose:t.pose,name:e.dog.name,item:e.item.id}:null,dogKennel:E.get().dogKennel??null,fetch:Oe?.phase??null,ball:Fn,view:T}};function on(){return M("ranch").clientHeight/Gi}let xt=[];const Wi=e=>String(100+Math.round(e)),f0=220,dS=f0*130/160,p0=156,fS=p0*130/160,pS=.6,hS=3.5,gS=3,Nc=10,os=new Map,Qa=new Map;function Mr(e,t,n=Nc){const s=(e-yt.x)/(yt.rx+n),o=(t-yt.y)/(yt.ry+n);return s*s+o*o<1}function Yl(e,t,n,s){for(let o=0;o<=18;o++){const i=o/18;if(Mr(e+(n-e)*i,t+(s-t)*i))return!0}return!1}function Lr(e,t){return{x:Math.max(70,Math.min(pf()-70,e)),y:Math.max(Ws,Math.min(Dn,t))}}function uS(e,t){const n=Lr(t.x,t.y);if(Mr(n.x,n.y,6))return null;if(!Yl(e.x,e.y,n.x,n.y))return[n];const s=yt.x-yt.rx-Nc-28,o=yt.x+yt.rx+Nc+28;let i=null,a=1/0;for(const r of[Ws+1,Dn-2]){const l=[];let c=e.x,d=e.y;const f=(v,y)=>{const u=Lr(v,y);l.push(u),c=u.x,d=u.y};Yl(c,d,c,r)&&f(c<yt.x?s:o,d),Math.abs(d-r)>3&&f(c,r),Math.abs(c-n.x)>3&&f(n.x,r),l.push(n);let p=!0,g=e.x,b=e.y,m=0;for(const v of l){if(Yl(g,b,v.x,v.y)||Mr(v.x,v.y,4)){p=!1;break}m+=Math.hypot(v.x-g,v.y-b),g=v.x,b=v.y}p&&m<a&&(i=l,a=m)}return i}function h0(e,t){const n=kn();if(!n)return;const s={x:Math.max(60,Math.min(pf()-60,e)),y:Math.max(Ws,Math.min(Dn,t))};if(n.ride!==void 0&&n.where==="ranch"){const o=uS(n,s);if(!o){F("The horse won't splash through the pond!"),P.pop();return}xt=o}else xt=[s]}function mS(e){if(e.look2)return qM(e.look2);const t=e.pants,n="#5a3d5c",s=(o,i,a,r)=>`<path class="${o}" d="${i}" fill="none" stroke="${n}" stroke-width="${a}" stroke-linecap="round"/><path class="${o} cloth" d="${i}" fill="none" stroke="${t}" stroke-width="${r}" stroke-linecap="round"/>`;return`<svg class="rideleg" viewBox="0 0 160 130">${s("thigh","M66 56 L102 66",13,8)}${s("shin","M102 68 L106 104",12,7.2)}<circle class="knee" cx="102" cy="67" r="6.2" fill="${t}" stroke="${n}" stroke-width="3.5"/><ellipse class="shoe" cx="116" cy="106" rx="11" ry="5.2" fill="${n}"/></svg>`}function is(){return document.body.classList.contains("phone")&&document.body.classList.contains("phone-portrait")&&!Ue}function rl(){if(!is())return _h.map((t,n)=>n);const e=[0,2,4];for(const t of ns("ranch")){const n=t.p.ride;n!==void 0&&e.indexOf(n)<0&&e.push(n)}return e}function cs(e){if(!is())return _h[e];const t=rl(),n=t.indexOf(e),s=t.length,o=n<0?0:n,i=ff().w/2,a=2400+i+18,r=3080-i-18;return s<=1?Math.round((a+r)/2):Math.round(a+(r-a)*o/(s-1))}function ff(){return is()?{w:131,h:106}:{w:150,h:122}}function Er(e,t,n){const s=on(),{w:o,h:i}=ff();e.style.left=(t-o/2)*s+"px",e.style.top=(n-i)*s+"px",e.style.width=o*s+"px",e.style.height=i*s+"px",e.style.zIndex=Wi(n)}function yS(){if(T!=="ranch"||Ue||!document.body.classList.contains("phone"))return;const e=new Set(rl());document.querySelectorAll("#ranchWorld .horse").forEach(t=>{const n=+t.dataset.horse;t.classList.toggle("stallOff",is()&&!e.has(n)),!(!e.has(n)||os.has(n)||t.classList.contains("away"))&&Er(t,cs(n),Us)})}function bS(e,t,n){if(os.has(e)||Math.hypot(t-cs(e),n-Us)<26)return;os.set(e,{x:t,y:n});const s=document.querySelector(`#ranchWorld .horse[data-horse="${e}"]`);s&&(s.classList.add("trotting"),s.classList.remove("away"),s.classList.toggle("flipped",cs(e)<t),Er(s,t,n))}function kS(e,t,n){const s=n?-1:1;for(const o of[s*118,-s*118,s*160,-s*78])for(const i of[0,30,-26,48]){const a=Lr(e+o,t+i);if(!(Math.hypot(a.x-e,a.y-t)<50)&&!Mr(a.x,a.y,8))return a}return Lr(e,t)}let uh=0,g0=0;const ll=()=>k?k.now():Date.now(),cl=()=>od(k?k.ranch.plots:J.get().garden),Ji=()=>sd(k?k.players.get(k.pid)?.basket:J.get().basket),pf=()=>Ue?td:Qi,u0=()=>Ue?"barn":"ranch",m0=()=>{const e=new Map;for(const t of ns("ranch"))t.p.ride!==void 0&&e.set(t.p.ride,t);return e};function Fc(e){const t={taken:"A friend just planted there!",wet:"Already watered 💧",notReady:"Still growing! 🌱",full:"Your basket is full!",slow:"The hen is laying… try again!",none:"Your basket has none left",nohouse:"Go home to put it in your room"};t[e]&&(F(t[e]),P.pop())}function xo(e){if(k){const o=tc(cl(),Ji(),e,ll(),e.op==="egg"?uh:0);return typeof o=="string"?(Fc(o),!1):(e.op==="egg"&&(uh=Date.now()),k.ranchOp(e),!0)}const t=J.get(),n=Date.now(),s=tc(od(t.garden),sd(t.basket),e,n,t.lastEgg??0);return typeof s=="string"?(Fc(s),!1):(J.dispatch({type:"ranch/op",op:e,now:n}),dl(!0),uf(),!0)}function Ui(e=!1){const t=T==="ranch"&&Ue&&!e;ao(),M("ranch").classList.remove("hidden"),Oe=null,xt=[],T="ranch",Ue=e;const n=e?{where:"barn",x:170,y:560,flip:!1}:{where:"ranch",x:t?Xl:130,y:t?520:565,flip:!1};k?Ye(n):It=n,M("streetTitle").textContent=e?"The Barn":"Rainbow Ranch",bn(),hf(),requestAnimationFrame(()=>{const s=M("ranchScroll"),o=on();s.scrollLeft=t?Math.max(0,Xl*o-s.clientWidth/2):0,Gc()}),setTimeout(Gc,650),Xi(M("ranch")),e?P.swish():P.sparkle()}M("btnHopOff").addEventListener("click",()=>y0());function hf(){const e=on(),t=M("ranchWorld"),n=o=>o*e+"px",s=(o,i,a,r)=>`left:${n(o-a/2)};top:${n(i-r)};width:${n(a)};height:${n(r)};z-index:${Wi(i)}`;if(t.style.width=pf()*e+"px",t.style.height=Gi*e+"px",t.style.setProperty("--sc",String(e)),Ue){t.innerHTML=m9()+`<button class="rprop barnExit" data-r="exit" aria-label="Go outside" style="${s(127,444,206,244)}"><span class="exitHint"><span>Outside ☀️</span></span></button>`+Ts.map((o,i)=>`<button class="animal" data-animal="${i}" aria-label="${Ag[i].name}" style="${s(nd[i],xm+30,128,107)}">${Pc(i)}</button>`).join("")+[300,1244].map(o=>["carrot","apple","hay"].map((i,a)=>`<button class="bucket" data-feed="${i}" aria-label="${i} bucket" style="${s(o+a*56,592,54,62)}">${c9(i)}</button>`).join("")).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',as(),at();return}t.innerHTML=n9()+s9().replace("<svg ",`<svg style="z-index:${Wi(o9)}" `)+`<button class="rprop barnDoor" data-r="barn" aria-label="Go into the barn" style="${s(Xl,472,150,150)}"><span class="doorHint"><span>Petting zoo inside! 🐐</span></span></button><button class="rprop windmill" data-r="mill" aria-label="Windmill" style="${s(1540,478,150,240)}">${h9}</button><button class="rprop henHouse" data-r="egg" aria-label="Hen house" style="${s(715,482,180,170)}">${i9}</button><button class="rprop tractor" data-r="honk" aria-label="Tractor" style="${s(900,580,170,130)}">${a9}</button><button class="rprop appleTree" data-r="apple" aria-label="Apple tree" style="${s(2085,482,240,300)}">${r9}</button>`+Mm.map((o,i)=>{const a=ff();return`<button class="horse${is()&&rl().indexOf(i)<0?" stallOff":""}" data-horse="${i}" aria-label="${dr[i].name} horse" style="${s(cs(i),Us,a.w,a.h)}">${Pd(i)}</button>`}).join("")+Array.from({length:Jl},(o,i)=>`<button class="plot" data-plot="${i}" aria-label="Garden plot" style="${s(Em(i),594,66,86)}"></button>`).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',dl(!0),as(),at()}const Ma=[];function dl(e=!1){if(T!=="ranch"||Ue)return;const t=cl(),n=ll();document.querySelectorAll("#ranchWorld .plot").forEach(s=>{const o=+s.dataset.plot,i=t[o]??null,a=Ur(i,n),r=JSON.stringify(i)+a;!e&&Ma[o]===r||(Ma[o]!==void 0&&Ma[o]!==r&&a>0&&(s.classList.remove("grow"),s.offsetWidth,s.classList.add("grow")),Ma[o]=r,s.innerHTML=Hg(i,a,o),s.dataset.stage=i?String(a):"empty")})}function as(){const e=document.getElementById("ravatars");if(!e||T!=="ranch")return;const t=on(),n=new Set,s=new Set;let o=!1;for(const i of ns(u0())){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&Xu(a));const r=JSON.stringify(i.look)+i.name;if(a.dataset.look!==r){const g=a.querySelector(".bubble");a.innerHTML=i.name?Jd(i.look,i.name):`<div class="inner">${kt(i.look)}</div>`,g&&a.appendChild(g),a.dataset.look=r,a.dataset.ride=""}const l=i.p.ride,c=(js[i.look.size]??1)*t*.95*(l!==void 0?pS:1),d=gs*c,f=yn*c;if(a.dataset.ride!==String(l??"")&&(a.querySelector(".mount")?.remove(),l!==void 0&&a.insertAdjacentHTML("afterbegin",`<div class="mount" data-mount="${l}">${Pd(l,!0)}${mS(i.look)}</div>`),a.dataset.ride=String(l??"")),a.classList.toggle("riding",l!==void 0),l!==void 0){s.add(l),i.mine&&(o=!0),Qa.set(l,{x:i.p.x,y:i.p.y});const g=is()?p0:f0,b=is()?fS:dS,m=g*t,v=b*t,y=a.querySelector(".mount");y.style.width=m+"px",y.style.height=v+"px",y.style.left=(d-m)/2+"px",y.style.top=f-v+"px";const u=Number(a.querySelector(".shirt")?.getAttribute("data-hem")??126),w=Number(y.querySelector(".saddle")?.getAttribute("data-top")??43),_=(u+hS/2)/160*f,S=f-v+(w-gS/2)/130*v;a.style.setProperty("--lift",_-S+"px");const R=y.querySelector(".rideleg");R&&(R.style.left="0",R.style.top="0",R.style.width="100%",R.style.height="100%")}else a.style.removeProperty("--lift");const p=parseFloat(a.dataset.lx??"NaN");Number.isFinite(p)&&Math.abs(p-i.p.x)>2&&(a.classList.add("moving"),clearTimeout(+(a.dataset.mt??0)),a.dataset.mt=String(window.setTimeout(()=>a.classList.remove("moving"),260))),a.dataset.lx=String(i.p.x),a.style.left=i.p.x*t-d/2+"px",a.style.top=i.p.y*t-f+"px",a.style.width=d+"px",a.style.height=f+"px",a.style.zIndex=Wi(i.p.y),a.classList.toggle("flipped",i.p.flip),ji(a,i.look,i.mine)}if(e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),document.body.classList.contains("phone")){const i=new Set(rl());document.querySelectorAll("#ranchWorld .horse").forEach(a=>{a.classList.toggle("stallOff",is()&&!i.has(+a.dataset.horse))})}document.querySelectorAll("#ranchWorld .horse").forEach(i=>{const a=+i.dataset.horse;s.has(a)?(i.classList.add("away"),os.delete(a)):i.classList.remove("away")});for(const[i,a]of[...Qa])s.has(i)||(bS(i,a.x,a.y),Qa.delete(i));document.body.classList.toggle("riding",o),io()}function wS(e){const t=kn();if(!t||t.where!=="ranch")return;const n=m0().get(e);if(n&&!n.mine){F("Someone is riding!"),P.pop();return}if(t.ride!==void 0){if(n?.mine||t.ride===e){y0();return}h0(cs(e),Math.min(Dn,Us+8));return}xt=[],os.delete(e),tn({where:"ranch",x:cs(e),y:Math.min(Dn,Us+8),flip:!1,ride:e}),P.neigh(),F(`You're riding ${dr[e].name}! Tap the ground to gallop 🐴`)}function y0(){const e=kn();if(!e||e.ride===void 0)return;const t=e.ride,{ride:n,...s}=e;xt=[];const o=kS(s.x,s.y,s.flip);Qa.set(t,{x:s.x,y:s.y}),tn({...s,x:o.x,y:o.y}),P.drop()}function gf(e,t){const n=e<Ts.length?document.querySelector(`#ranchWorld .animal[data-animal="${e}"]`):document.querySelector(`#ranchWorld .horse[data-horse="${e-Ts.length}"]:not(.away)`)??document.querySelector(`#ravatars .mount[data-mount="${e-Ts.length}"]`);if(!n||T!=="ranch")return;const s=e>=Ts.length,o=s?{say:"Neigh! ♥",snd:"neigh"}:Ag[e];n.classList.remove("hop","munch"),n.offsetWidth,n.classList.add(t?"munch":"hop"),setTimeout(()=>n.classList.remove("hop","munch"),1400),n.querySelector(".abubble")?.remove();const i=document.createElement("div");i.className="bubble petBubble abubble",i.textContent=t?`Yum! Munch munch ${t===1?"🥕":t===2?"🍎":"🌾"}`:o.say,n.appendChild(i),Uo(),setTimeout(()=>i.classList.add("out"),1400),setTimeout(()=>i.remove(),1800);for(let a=0;a<(t?6:4);a++){const r=document.createElement("div");r.className="heart",r.textContent="♥",r.style.left=15+Math.random()*70+"%",r.style.animationDelay=a*.12+"s",r.style.color=["#ff6b9a","#ff8fab","#e879c6","#b197fc"][a%4],n.appendChild(r),setTimeout(()=>r.remove(),1900)}P[o.snd]?.(),t&&setTimeout(()=>P.munch(),250)}function b0(){const e=document.querySelector("#ranchWorld .henHouse");e&&(e.classList.remove("lay"),e.offsetWidth,e.classList.add("lay"),P.cluck())}function vS(){const e=document.querySelector("#ranchWorld .henHouse"),t=M("basketChip");if(!e)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=document.createElement("div");o.className="flyEgg",o.innerHTML=Bi,document.body.appendChild(o),Object.assign(o.style,{left:n.left+n.width/2-18+"px",top:n.top+n.height*.6+"px"}),requestAnimationFrame(()=>{o.style.left=s.left+s.width/2-18+"px",o.style.top=s.top+"px",o.style.transform="scale(.6) rotate(200deg)"}),setTimeout(()=>{o.remove(),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")},650)}function k0(e){const t=document.getElementById("rfx");if(!t||T!=="ranch")return;const n=on(),[s,o]=Cp[e]??Cp[0],i=1965+s,a=182+o,r=i+(e%2?26:-22),l=575+e*4,c=document.createElement("button");c.className="fallenApple",c.dataset.feed="apple",c.setAttribute("aria-label","Apple"),c.innerHTML=Dg;const d=32*n;Object.assign(c.style,{width:d+"px",height:d+"px",left:i*n-d/2+"px",top:a*n-d/2+"px",zIndex:Wi(l)}),t.appendChild(c),requestAnimationFrame(()=>{c.style.left=r*n-d/2+"px",c.style.top=l*n-d+"px",c.classList.add("fallen")});const f=document.querySelector("#ranchWorld .appleTree");f?.classList.remove("shake"),f?.offsetWidth,f?.classList.add("shake"),P.boing(),setTimeout(()=>c.remove(),12e3)}function w0(){const e=document.querySelector("#ranchWorld .tractor");e?.classList.remove("bounce"),e?.offsetWidth,e?.classList.add("bounce"),P.honk()}function _S(e){e.k==="zoo"?gf(e.a,e.f):e.k==="apple"?k0(e.v):e.k==="honk"?w0():e.k==="hen"&&b0()}function mh(e,t){const n=document.elementFromPoint(e,t);if(!n)return null;const s=n.closest("[data-animal]");if(s)return+s.dataset.animal;const o=n.closest(".horse:not(.away)");if(o)return Ts.length+ +o.dataset.horse;const i=n.closest(".savatar.riding");return i?.dataset.ride?Ts.length+ +i.dataset.ride:null}function jc(e,t,n){e.preventDefault(),e.stopPropagation();const s=document.createElement("div");s.className="feedGhost",s.innerHTML=Ig[t],document.body.appendChild(s);const o=b=>{s.style.left=b.clientX-30+"px",s.style.top=b.clientY-50+"px"};o(e),P.pick();let i=0;const a=e.clientX,r=e.clientY;n instanceof HTMLElement&&(n.style.visibility="hidden");let l=e.clientX,c=0;const d=M("ranchScroll"),f=()=>{const b=d.getBoundingClientRect(),m=l<b.left+60?-12:l>b.right-60?12:0;m&&i>12&&T==="ranch"&&(d.scrollLeft+=m),c=requestAnimationFrame(f)};c=requestAnimationFrame(f);const p=b=>{if(b.pointerId!==e.pointerId)return;l=b.clientX,i=Math.max(i,Math.hypot(b.clientX-a,b.clientY-r)),o(b),document.querySelectorAll(".feedHover").forEach(v=>v.classList.remove("feedHover")),mh(b.clientX,b.clientY)!==null&&document.elementFromPoint(b.clientX,b.clientY)?.closest(".animal, .horse, .savatar")?.classList.add("feedHover")},g=b=>{if(b.pointerId!==e.pointerId)return;cancelAnimationFrame(c),window.removeEventListener("pointermove",p),window.removeEventListener("pointerup",g),s.remove(),g0=Date.now(),document.querySelectorAll(".feedHover").forEach(y=>y.classList.remove("feedHover"));const m=mh(b.clientX,b.clientY);if(m===null){n instanceof HTMLElement&&(n.style.visibility=""),i<12?F("Drag the food onto an animal! 🥕"):P.drop();return}if(n==="basket"&&!xo({op:"use",kind:"carrot"}))return;n instanceof HTMLElement&&n.remove();const v=Lm.indexOf(t);gf(m,v),k?.fx({k:"zoo",a:m,f:v})};window.addEventListener("pointermove",p),window.addEventListener("pointerup",g)}M("ranchWorld").addEventListener("pointerdown",e=>{const t=e.target,n=t.closest(".bucket");if(n)return jc(e,n.dataset.feed,"bucket");const s=t.closest(".fallenApple");if(s)return jc(e,"apple",s);t.closest(".rprop, .animal, .horse, .plot, .pet")&&e.stopPropagation()});M("ranchWorld").addEventListener("click",e=>{const t=e.target;if(!kn()||T!=="ranch"||Date.now()-g0<400)return;const s=t.closest("[data-animal]");if(s){const f=+s.dataset.animal;gf(f,0),k?.fx({k:"zoo",a:f,f:0});return}const o=t.closest("[data-horse]");if(o){wS(+o.dataset.horse);return}const i=t.closest("[data-r]")?.dataset.r;if(i==="egg"){b0(),xo({op:"egg"})&&(vS(),P.pickup());return}if(i==="honk"){w0(),k?.fx({k:"honk"});return}if(i==="apple"){const f=Math.floor(Math.random()*4);k0(f),k?.fx({k:"apple",v:f});return}if(i==="barn"){Ui(!0);return}if(i==="exit"){Ui(!1);return}if(i==="mill"){const f=t.closest(".windmill");f?.classList.remove("whirl"),f?.offsetWidth,f?.classList.add("whirl"),P.swish();return}const a=t.closest("[data-plot]");if(a){$S(+a.dataset.plot,a);return}if(t.closest(".bucket, .fallenApple, .savatar, .pet"))return;const r=M("ranchWorld").getBoundingClientRect(),l=on(),c=(e.clientX-r.left)/l,d=(e.clientY-r.top)/l;d<400||h0(c,d)});function $S(e,t){const n=cl()[e]??null,s=Ur(n,ll());if(document.querySelector(".seedPick")?.remove(),!n){const o=document.createElement("div");o.className="seedPick",o.innerHTML=`<button data-seed="carrot">${Kr}<span>Carrot</span></button><button data-seed="flower">${Td()}<span>Flower</span></button>`,t.parentElement.appendChild(o),o.style.left=t.offsetLeft+t.offsetWidth/2+"px",o.style.top=t.offsetTop-8+"px",o.addEventListener("pointerdown",i=>i.stopPropagation()),o.addEventListener("click",i=>{i.stopPropagation();const a=i.target.closest("[data-seed]")?.dataset.seed;o.remove(),a&&xo({op:"plant",i:e,seed:a})&&(P.plant(),F("Planted! Now tap it to water 💧"))}),setTimeout(()=>o.remove(),6e3);return}if(!n.wet){xo({op:"water",i:e})&&(P.water(),t.classList.remove("watering"),t.offsetWidth,t.classList.add("watering"));return}if(s<3){F("Still growing! 🌱"),P.pop();return}xo({op:"pick",i:e})&&(P.pickup(),F(n.seed==="carrot"?"A carrot for your basket! 🥕":"Pretty flowers for your basket! 🌸"))}let yh=0;function xS(e,t){if(T!=="ranch")return;const n=Date.now();if(document.querySelectorAll("#ranchWorld .animal").forEach(s=>{const o=+s.dataset.animal,i=on(),a=n/5200+o*1.7,r=(Ue?nd:$m)[o]+Math.sin(a)*32;s.style.left=(r-s.offsetWidth/i/2)*i+"px",s.classList.toggle("flipped",Math.cos(a)<0),s.classList.toggle("walking",Math.abs(Math.cos(a))>.35)}),e-yh>1e3&&(yh=e,dl()),xt.length){const s=kn();if(!s||s.where!==u0())xt=[];else{const o=xt[0],i=s.ride!==void 0?720:300,a=o.x-s.x,r=o.y-s.y,l=Math.hypot(a,r);if(l<6)xt.shift();else{const c=Math.min(l,i*t),d={...s,x:s.x+a/l*c,y:s.y+r/l*c,flip:Math.abs(a)>2?a<0:s.flip};tn(d);const f=on(),p=M("ranchScroll"),g=d.x*f-p.scrollLeft;g>-40&&g<p.clientWidth+40&&(g<p.clientWidth*.2||g>p.clientWidth*.8)&&(p.scrollLeft=d.x*f-p.clientWidth/2)}}}for(const[s,o]of os){const i=document.querySelector(`#ranchWorld .horse[data-horse="${s}"]`);if(!i||i.classList.contains("away")){os.delete(s);continue}const a=cs(s)-o.x,r=Us-o.y,l=Math.hypot(a,r);if(l<8){os.delete(s),i.classList.remove("trotting","flipped"),Er(i,cs(s),Us);continue}const c=Math.min(l,460*t);o.x+=a/l*c,o.y+=r/l*c,i.classList.add("trotting"),i.classList.toggle("flipped",a<0),Er(i,o.x,o.y)}}function uf(){const e=document.getElementById("basketChip");if(!e)return;const t=T==="house"&&(!k||Re===J||Se===k.myHouseId()),n=Ji(),o=n.egg+n.carrot+n.flower>0&&(T==="ranch"||t);e.classList.toggle("hidden",!o),e.classList.toggle("inHouse",T==="house"),o&&(e.innerHTML=`<span class="bIcon">${d9}</span><span class="bcount" data-kind="egg">${Bi}<b>${n.egg}</b></span><span class="bcount" data-kind="carrot">${Kr}<b>${n.carrot}</b></span><span class="bcount" data-kind="flower">${Td()}<b>${n.flower}</b></span>`)}M("basketChip").addEventListener("pointerdown",e=>{e.target.closest('.bcount[data-kind="carrot"]')&&T==="ranch"&&Ji().carrot>0&&jc(e,"carrot","basket")});M("basketChip").addEventListener("click",()=>MS());function MS(){const e=T==="house"&&(!k||Re===J||Se===k.myHouseId()),t={egg:["Eggs",Bi],carrot:["Carrots",Kr],flower:["Flowers",Td()]},n=Ft("",(o,i)=>{const a=o.closest("[data-take]")?.dataset.take;if(!a)return;if(!e){F("Take it home to put it in your room! 🏠");return}const r="r"+Math.random().toString(36).slice(2,10),l=Math.max(120,Math.min(ue-120,ce+de/2+(Math.random()-.5)*300));xo({op:"take",kind:a,id:r,room:E.get().currentRoom,x:l})&&(P.drop(),i(),F("It's in your room! Drag it to a hand to carry it ✋"))},"basketSheet"),s=Ji();n.root.querySelector(".card").innerHTML=`${jt}<h2>My Basket</h2><p class="hint small">${e?"Tap one to put it in your room.":"Collect eggs, carrots and flowers at Rainbow Ranch, then take them home!"}</p>
    <div class="basketRows">${$h.map(o=>`<button class="bRow" data-take="${o}" ${s[o]?"":"disabled"}>${t[o][1]}<b>${s[o]}</b><span>${t[o][0]}</span></button>`).join("")}</div>`}window.__ranch=()=>({view:T,inBarn:Ue,plots:cl().map(e=>e?{seed:e.seed,stage:Ur(e,ll()),wet:!!e.wet}:null),basket:Ji(),me:kn(),ridden:[...m0().keys()]});function LS(){if(ai.kind==="none")return;O9(),Ft(W9(ai.kind,ai.entries),(t,n)=>{t.closest("#wnGo")&&(P.sparkle(),n())},"whatsNew "+ai.kind).root.querySelector(".card").insertAdjacentHTML("afterbegin",jt)}setTimeout(LS,500);window.__whatsnew=ai;window.__hood=()=>k;window.__hood_url=()=>zr();window.__ui=()=>({view:T,currentHouseId:Se,mode:k?"hood":"solo",play:Ae.mode()});bE({hood:()=>k,view:()=>T,solo:()=>It,myPres:ke,setPres:tn,toast:F,refreshNear:io,sfx:P,goMap:$o,soloLook:()=>{const e=J.get();return{look:Zi(e.characters[0]??{}),dog:e.dog??null}}});function v0(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n.items)t.add(s.kind);for(const n of e.characters)n.held.left&&t.add(n.held.left.kind),n.held.right&&t.add(n.held.right.kind);return e.baby&&t.add("baby"),[...t]}let La=null,mf=()=>!1;function _0(e){return La||(La=h(()=>Promise.resolve().then(()=>yd),void 0).then(t=>(mf=t.hasArt,t.boot(location.search,v0(E.get())))).then(t=>{for(let n=0;n<t.length;n++)if(Me[t[n]]){Js();break}Du()}),La)}function ES(e){const t=new Set(e),n=E.get();let s=!1;for(const o of n.rooms[n.currentRoom].items){const i=Me[o.kind];if(!t.has(o.kind)||!i)continue;const a=X.querySelector(`.item[data-id="${o.id}"] .inner`);!a||a.querySelector("img.artimg")||(a.innerHTML=mn(i,!0),s=!0)}s&&(Bt.forEach(o=>{delete o.dataset.held}),en(n),Du())}function CS(){return h(()=>Promise.resolve().then(()=>yd),void 0).then(e=>e.boot(location.search,v0(E.get()))).then(e=>{ES(e.filter(t=>!!Me[t]))})}V7();DL();KL(e=>e==="backyard"?S7():null);M("scenery").addEventListener("click",e=>{const t=e.target.closest("[data-yard-go]");t&&Nd(t.dataset.yardGo==="backyard"?"backyard":"living")});const SS=Y9(M("skyMount"));window.__sky=SS;tl=Ly({layer:X,stageWrap:M("stageWrap"),get:()=>E.get(),dispatch:e=>E.dispatch(e),clock:()=>k&&Re!==J?k.now():Date.now(),canSend:()=>!k||Re===J||!!k.speaksBaby,owner:()=>Qd(),inHouse:()=>T==="house",play:()=>Ae.isPlay(),editable:()=>Ot(),toRoom:Dt,box:e=>{const t=Me[e.kind];return t?{id:e.id,kind:e.kind,x:e.x,footY:so(t,e.y),flip:!!e.flip,scale:Ke(e),w:t.w,h:pt(t),z:e.z}:null},holderId:()=>k&&Re!==J&&k.pid?k.pid:Be||E.get().characters[0]?.id||"c1",holderSpot:e=>{const t=E.get(),n=k&&Re!==J&&k.pid?k.pid:Be||t.characters[0]?.id||"",s=e||n,o=(a,r,l,c,d,f)=>{const p=c?.pose==="sit"||c?.pose==="lie"?c.pose:null,g=p==="lie"?t.rooms[t.currentRoom]?.items.find(m=>m.id===c?.item):void 0,b=d&&/^#[0-9a-fA-F]{6}$/.test(d)?d:"#f1c27d";return{x:a.x,y:a.y,flip:r,scale:l>0?l:1,pose:p,lieFlip:!!(p==="lie"&&g?.flip),skin:b,chibi:!!f}},i=t.characters.find(a=>a.id===s&&a.room===t.currentRoom);if(i){const a=Et(i);return o(Mt(t.currentRoom,a,i),i.flip,js[i.size]??1,a,i.look2&&i.look2.skin||i.skin,!!i.look2)}if(k&&T==="house"){const a=s===k.pid?ke():k.presence.get(s);if(a&&a.where==="house"&&a.houseId===Se&&a.room===t.currentRoom){const r=In(s,a),l=k.players.get(s)?.look,c=l?.size??"kid";return o(Mt(t.currentRoom,r,a),a.flip,js[c]??1,r,l?.look2&&l.look2.skin||l?.skin||"#f1c27d",!!l?.look2)}}return null},holderHere:e=>{if(!e)return!1;if(E.get().characters.some(s=>s.id===e))return!0;if(!k||Re===J)return!1;const n=e===k.pid?ke():k.presence.get(e);return!!(n&&n.where==="house"&&n.houseId===Se)},occupied:()=>Hi(void 0,k?.pid,!0),locked:()=>Hn(null),seatAt:(e,t,n)=>Mt(e,t,n)}).render;du=()=>tl();Js();Ht();us();PS();us();fl();ku();Ba();Wo.matches?ls():us();requestAnimationFrame(()=>{us(),fl(),Ud()});function PS(){if(!Dd)return;const e=uc(),t=E.get().characters[0];if(!t)return;const n=e==="door";if(E.dispatch({type:"char/update",id:t.id,patch:{...Fx(),flip:n?bc.flip:yc.flip}}),E.dispatch({type:"cat/set",cat:{name:"Clover",coat:3,room:n?"living":"backyard",x:n?or:Xn.x}}),E.dispatch({type:"dog/set",dog:{name:"Sunny",breed:3,owner:t.id}}),!E.get().rooms.backyard.items.some(s=>s.kind==="yard-swing"))for(const s of jx)E.dispatch({type:"item/add",room:"backyard",item:{id:"yp-"+s.kind,kind:s.kind,x:s.x,y:s.y,flip:!1,z:1,scale:s.scale??1}});if(e!=="sheet"){const s=n?bc:yc;E.dispatch({type:"char/move",id:t.id,room:n?"living":"backyard",x:s.x,y:s.y}),E.dispatch({type:"room/switch",room:n?"living":"backyard"})}window.__pinCat=n?{x:or}:{x:Xn.x,y:Xn.y},e==="play"?M("modePlay").click():(e==="decorate"||e==="door")&&M("modeDecorate").click(),e==="sheet"&&document.body.insertAdjacentHTML("beforeend",B7()),e==="compare"&&document.body.insertAdjacentHTML("beforeend",D7()),document.body.dataset.yard="ready"}function TS(e){const t=E.get(),n=e==="backyard"?yc:bc;At=null;const s=t.characters.find(o=>o.id===Be&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(s&&(E.dispatch({type:"char/update",id:s.id,patch:{flip:n.flip}}),E.dispatch({type:"char/move",id:s.id,room:e,x:n.x,y:n.y})),Dd&&t.cat&&(E.dispatch({type:"cat/move",room:e,x:e==="backyard"?Xn.x:or}),window.__pinCat=e==="backyard"?{x:Xn.x,y:Xn.y}:{x:or}),E.dispatch({type:"room/switch",room:e}),k&&Re!==J){const o=ke();if(o&&o.where==="house"){const i=o.houseId?Xd(o.houseId,e,n):n;Ye({...o,room:e,x:i.x,y:i.y,flip:n.flip})}}requestAnimationFrame(()=>fl())}function fl(){if(E.get().currentRoom==="backyard"){je(mc),Gn();return}if(!Dd||uc()==="sheet"||uc()==="compare")return;const e=E.get().characters.find(t=>t.room===E.get().currentRoom);e&&je(e.x-de/2),Gn()}function Gn(){if(Xs||j.getBoundingClientRect().width<20)return;const t=bt()||parseFloat(j.style.getPropertyValue("--yard-sc"))||1;j.style.setProperty("--yard-sc",String(t));const n=[...j.querySelectorAll(".yardDoor")];for(const b of n){b.style.minWidth="",b.style.transform="";const m=b.querySelector(".yardHintLabel");if(!m)continue;m.style.transform="",m.style.translate="";const v=m.querySelector("span");v&&(v.style.transform="");const y=Math.max(13,16/t);m.style.fontSize=y+"px",m.style.lineHeight="1";const u=38/t;m.style.height=u+"px";const w=3/t,_=Math.max(0,(u-w*2-y)/2);m.style.padding=`${_.toFixed(2)}px ${(14/t).toFixed(2)}px`}const s=n[0];if(!s)return;const o=s.querySelector(".doorArt"),i=s.querySelector(".yardHintLabel"),a=6,r=()=>{const b=j.getBoundingClientRect(),m=s.getBoundingClientRect(),v=o?.getBoundingClientRect(),y=i?.getBoundingClientRect(),u=[m,v,y].filter(D=>!!D&&D.width>2&&D.height>2),w=Math.min(...u.map(D=>D.top)),_=Math.max(...u.map(D=>D.bottom));let S=b.left+a,R=b.right-a;for(const D of["nudgeL","nudgeR"]){const U=M(D);if(!U||U.classList.contains("off")||U.offsetParent===null)continue;const Z=U.getBoundingClientRect();if(Z.width<2||Z.height<2)continue;const ne=ee=>ee.top<Z.bottom-1&&ee.bottom>Z.top+1,G=[m,v].some(ee=>ee&&ee.width>2&&ne(ee));!G&&(w>=Z.bottom-1||_<=Z.top+1)||(D==="nudgeL"&&G?S=Math.max(S,Z.right+8):D==="nudgeR"&&G&&(R=Math.min(R,Z.left-8)))}return{leftLimit:S,rightLimit:R,doorR:m,artR:v,hintR:y}};let l=0,c=0;for(;l++<4;){const{leftLimit:b,rightLimit:m,doorR:v,artR:y}=r();let u=0;const w=Math.min(v.left,y&&y.width>2?y.left:v.left),_=Math.max(v.right,y&&y.width>2?y.right:v.right);if(w<b&&(u+=b-w),_+u>m&&(u-=_+u-m),Math.abs(u)<.5)break;c+=u,s.style.transform=`translate(${(c/t).toFixed(1)}px, 0)`}if(!i){Jp(s);return}const d=i.querySelector("span");if(d){const b=document.createRange();b.selectNodeContents(d);const m=b.getBoundingClientRect(),v=i.getBoundingClientRect(),y=(v.top+v.bottom-(m.top+m.bottom))/2,u=d;m.height>2&&Math.abs(y)>=.1?u.style.transform=`translateY(${(y/t).toFixed(2)}px)`:u.style.transform=""}const f=i.getBoundingClientRect(),p=j.getBoundingClientRect();let g=0;if(E.get().currentRoom==="backyard"&&o){const b=o.getBoundingClientRect();b.width>2&&(g+=(b.left+b.right)/2-(f.left+f.right)/2)}f.left+g<p.left+a?g+=p.left+a-(f.left+g):f.right+g>p.right-a&&(g-=f.right+g-(p.right-a)),Math.abs(g)>.5?i.style.translate=`calc(-50% + ${(g/t).toFixed(1)}px) 0`:i.style.translate="",Jp(s)}_0(E.get().currentRoom);const $0=()=>{const e=jr().size,t=sr.length,n=M("secrets"),s=n.querySelector(".secCount");s&&(s.textContent=`${e}/${t}`),n.setAttribute("aria-label",`Surprises, ${e} of ${t}`),gu()};function pl(){return window.innerHeight>window.innerWidth+40}function x0(e,t){for(const G of e)G.style.transform="";if(!pl()||!e.length)return;const n=t&&t.clientWidth>20?t.getBoundingClientRect():{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth};if(n.width<20)return;const s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,window.innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,window.innerHeight)-s,l=Math.max(40,i-o),c=Math.max(40,r-a),f=e.map(G=>G.getBoundingClientRect()).filter(G=>G.width>2&&G.height>2);if(!f.length)return;const p=Math.min(...f.map(G=>G.left)),g=Math.max(...f.map(G=>G.right)),b=Math.min(...f.map(G=>G.top)),m=Math.max(...f.map(G=>G.bottom)),v=Math.max(1,g-p),y=Math.max(1,m-b),u=Math.min(1,l/v,c/y);if(u>.995&&p>=o-1&&g<=i+1&&b>=a-1&&m<=r+1)return;const _=e[0].getScreenCTM(),S=_&&Math.hypot(_.a,_.b)||1,R=(p+g)/2,D=(b+m)/2,U=y*u,Z=(o+i)/2,ne=b>=a&&m<=r?D:Math.min(Math.max(D,a+U/2),r-U/2);for(const G of e){const ee=G.getBoundingClientRect(),an=(ee.left+ee.right)/2,Ut=(ee.top+ee.bottom)/2,Ne=Z+(an-R)*u,A=ne+(Ut-D)*u;G.style.transformBox="fill-box",G.style.transformOrigin="center",G.style.transform=`translate(${((Ne-an)/S).toFixed(2)}px, ${((A-Ut)/S).toFixed(2)}px) scale(${u.toFixed(3)})`}}function M0(){if(T!=="gameroom")return;const e=document.getElementById("grScroll");x0([...document.querySelectorAll(".neonSignArt")],e)}function Gc(){T!=="ranch"||Ue||(document.querySelectorAll(".ranchSignArt").forEach(e=>{e.style.transform=""}),at(),L0(),yf())}function yf(){if(T!=="ranch"||Ue)return;const e=document.getElementById("ranchScroll");if(!e)return;const t=e.getBoundingClientRect();document.querySelectorAll(".ranchSignArt").forEach(n=>{const s=n.getBoundingClientRect(),o=Math.min(t.right,innerWidth),i=Math.max(0,t.left-s.left)+Math.max(0,s.right-o);n.style.visibility=s.width>20&&i<8?"visible":"hidden"})}M("ranchScroll").addEventListener("scroll",()=>{T==="ranch"&&!Ue&&yf()},{passive:!0});function L0(){const e=document.querySelector(".doorHint"),t=document.getElementById("ranchScroll");if(!e||!t)return;e.style.transform="translateX(-50%)";const n=t.getBoundingClientRect(),s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,innerHeight)-s,l=e.getBoundingClientRect();let c=0;l.right>i&&(c-=l.right-i),l.left+c<o&&(c+=o-(l.left+c));let d=0;const f=t.querySelector(".savatar");if(f){const p=f.getBoundingClientRect(),b=f.querySelector(".nametag")?.getBoundingClientRect(),m=!!(b&&b.width>4&&b.height>4),v=m?Math.min(p.top,b.top):p.top,y=m?Math.min(p.left,b.left):p.left,u=m?Math.max(p.right,b.right):p.right,w=l.left+c;l.right+c>y-6&&w<u+6&&l.bottom+d>v-6&&l.top<p.top+p.height*.72&&(d+=v-48-(l.bottom+d))}if(l.top+d<a&&(d+=a-(l.top+d)),document.body.classList.contains("phone-portrait")){const p=document.querySelector(".ranchSign .ranchSignArt");if(p){const g=p.getBoundingClientRect(),b=l.left+c,m=l.right+c,v=l.top+d,y=l.bottom+d;if(g.width>20&&g.height>g.width*.7&&m>g.left+4&&b<g.right-4&&y>g.top+4&&v<g.bottom-4){let w=g.top-16-y;v+w<a&&(w+=a-(v+w));const S=f?.querySelector(".nametag")?.getBoundingClientRect(),R=y+w;!(S&&S.width>4&&S.height>4&&R>S.top-12&&m>S.left-6&&b<S.right+6)&&R<=r&&(d+=w)}}}(c||d)&&(e.style.transform=`translate(calc(-50% + ${c.toFixed(1)}px), ${d.toFixed(1)}px)`)}const E0=Qy({world:Id,roomW:ue,roomH:We,currentRoom:()=>E.get().currentRoom,sparkle:()=>P.sparkle(),tap:()=>P.click(),onFound:(e,t)=>{if($0(),t){const n=M("secrets");n.classList.remove("pulse"),n.offsetWidth,n.classList.add("pulse"),setTimeout(()=>F("🎁 A secret surprise appeared in your drawer!"),1400),Ht()}}});E.subscribe((e,t)=>{(t.type==="room/switch"||t.type==="game/reset")&&E0.update()});$0();window.__eggs=()=>({found:[...jr()]});TC();
