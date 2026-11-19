(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const Sy="modulepreload",Ty=function(e){return"/kids-house-game/"+e},eu={},h=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(n.map(l=>{if(l=Ty(l),l in eu)return;eu[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":Sy,c||(f.as="script"),f.crossOrigin="",f.href=l,r&&f.setAttribute("nonce",r),document.head.appendChild(f),c)return new Promise((u,p)=>{f.addEventListener("load",u),f.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return o.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})},Py="dae7cc6e5c4b",yc="cozy-sw-killed";let tu=!1;async function Ay(e){try{const t=new AbortController,n=setTimeout(()=>t.abort(),4e3),s=await fetch(e+"sw-switch.json?t="+Date.now(),{cache:"no-store",signal:t.signal});if(clearTimeout(n),!s.ok)return!1;const o=await s.json();return!!o&&o.sw==="off"}catch{return!1}}async function Ry(e){const t=location.origin+e,n=e==="/kids-house-game/";try{for(const s of await navigator.serviceWorker.getRegistrations())(s.scope===t||s.scope.startsWith(t))&&await s.unregister()}catch{}try{if("caches"in self)for(const s of await caches.keys())(n&&s==="cozy-v1"||s.startsWith("cozy:"+e+":"))&&await caches.delete(s)}catch{}}async function Cy(e){if(!("serviceWorker"in navigator))return;const t=navigator.serviceWorker;if(await Ay(e.base)){await Ry(e.base);let o=!1;try{o=sessionStorage.getItem(yc)==="1",sessionStorage.setItem(yc,"1")}catch{o=!0}t.controller&&!o&&location.reload();return}try{sessionStorage.removeItem(yc)}catch{}t.addEventListener("message",o=>{const i=o.data;i&&i.type==="cozy-sw"&&typeof i.build=="string"&&!i.build.startsWith("__")&&i.build!==Py&&!tu&&(tu=!0,Iy(e))}),t.addEventListener("controllerchange",()=>{try{t.controller?.postMessage({type:"cozy-build?"})}catch{}});let n;try{n=await t.register(e.base+"sw.js")}catch{return}try{t.controller?.postMessage({type:"cozy-build?"})}catch{}let s=Date.now();document.addEventListener("visibilitychange",()=>{document.visibilityState!=="visible"||Date.now()-s<10*6e4||(s=Date.now(),n?.update().catch(()=>{}))})}function Iy(e){const t=()=>location.reload(),n=()=>{if(e.safeNow&&!e.safeNow()){setTimeout(n,2e3);return}(e.showNote??By)(t)};n()}function By(e){if(document.querySelector(".updateNote"))return;const t=document.createElement("div");t.className="toast grownNotice updateNote",t.setAttribute("role","status"),t.innerHTML='<span>New stuff! Tap to refresh</span><button type="button">Refresh</button>',t.addEventListener("click",e),(document.getElementById("toastLane")??document.body).appendChild(t)}const Oy=150;function Dy(e,t,n){const s=n.gap??Oy,o=Math.max(n.minY,Math.min(n.maxY,e.y)),i=r=>Math.max(n.minX,Math.min(n.maxX,r)),a=r=>t.every(l=>Math.abs(l.x-r)>=s||Math.abs(l.y-o)>=s*.6);for(let r=0;r<=12;r++)for(const l of r?[1,-1]:[1]){const c=i(e.x+l*r*s*.6);if(a(c))return{x:c,y:o}}return{x:i(e.x),y:o}}const la="#5a3d5c",ie=(e=4)=>`stroke="${la}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,bc=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],jn=1e3,Zn=700,wc="M 30 660 C 150 640, 200 540, 330 545 S 540 650, 690 600 S 925 470, 850 375 S 640 330, 520 355 S 270 385, 250 285 S 330 145, 480 150 S 700 200, 790 150",as={x:115,y:170},yn={x:880,y:120},wn={x:600,y:480},rs={x:400,y:260},R0=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${ie(3)}/><circle cx="0" cy="-10" r="20" fill="${s}" ${ie(3)}/><circle cx="-12" cy="-2" r="12" fill="${s}" ${ie(3)}/><circle cx="12" cy="-3" r="13" fill="${s}" ${ie(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`,Fs=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})" fill="#fff"><ellipse cx="0" cy="10" rx="46" ry="22"/><ellipse cx="-36" cy="16" rx="28" ry="16"/><ellipse cx="38" cy="14" rx="30" ry="18"/><ellipse cx="10" cy="2" rx="24" ry="18"/></g>`,Ni=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">${[0,72,144,216,288].map(o=>`<circle cx="${(Math.cos(o*Math.PI/180)*8).toFixed(1)}" cy="${(Math.sin(o*Math.PI/180)*8).toFixed(1)}" r="6.5" fill="${n}" ${ie(2)}/>`).join("")}<circle r="4.5" fill="#ffd43b" ${ie(2)}/></g>`,ls=(e,t,n)=>`<g transform="translate(${e} ${t})">${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*4}" cy="${Math.sin(s*Math.PI/180)*4}" r="3.6" fill="${n}"/>`).join("")}<circle r="2.6" fill="#ffd43b"/></g>`;function Hy(){return`<svg class="mapBg" viewBox="0 0 ${jn} ${Zn}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${jn}" height="${Zn}" rx="34" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="160" cy="420" rx="150" ry="90"/><ellipse cx="760" cy="250" rx="170" ry="70"/><ellipse cx="480" cy="640" rx="140" ry="50"/><ellipse cx="930" cy="600" rx="90" ry="110"/></g>
  <g fill="#93d78e" opacity=".7"><ellipse cx="420" cy="260" rx="70" ry="30"/><ellipse cx="80" cy="560" rx="60" ry="26"/><ellipse cx="700" cy="420" rx="50" ry="22"/></g>
  <!-- pond -->
  <ellipse cx="120" cy="470" rx="72" ry="40" fill="#8ecae6" ${ie()}/><ellipse cx="108" cy="462" rx="42" ry="16" fill="#bde6f7"/><path d="M150 480 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <!-- side paths to the park and the ranch -->
  <path d="M250 285 Q190 250 150 215" fill="none" stroke="${la}" stroke-width="30" stroke-linecap="round"/><path d="M250 285 Q190 250 150 215" fill="none" stroke="#f2dcb8" stroke-width="22" stroke-linecap="round"/>
  <!-- the street -->
  <path d="${wc}" fill="none" stroke="${la}" stroke-width="58" stroke-linecap="round"/>
  <path id="mapRoad" d="${wc}" fill="none" stroke="#f2dcb8" stroke-width="48" stroke-linecap="round"/>
  <path d="${wc}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 16" stroke-linecap="round" opacity=".9"/>
  <!-- town square -->
  <g transform="translate(${wn.x} ${wn.y})"><circle r="74" fill="#f7e6c8" ${ie()}/><circle r="74" fill="none" stroke="#e6cfa6" stroke-width="10" stroke-dasharray="10 12" transform="scale(.82)"/>
    <circle r="30" fill="#bde6f7" ${ie()}/><circle r="13" fill="#fff6e6" ${ie(3)}/><path d="M0 -13 Q-8 -32 -16 -20 M0 -13 Q8 -32 16 -20 M0 -13 V-34" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>
    ${ls(-52,-40,"#ff8fab")}${ls(54,-38,"#b197fc")}${ls(-56,40,"#ffd43b")}${ls(52,44,"#ff8fab")}</g>
  ${[[60,330,"#ff8fab"],[300,470,"#b197fc"],[430,560,"#ffd43b"],[760,520,"#ff8fab"],[950,260,"#b197fc"],[600,260,"#ffd43b"],[380,90,"#ff8fab"],[40,120,"#b197fc"],[960,420,"#ffd43b"],[840,640,"#b197fc"],[210,620,"#ff8fab"]].map(([e,t,n])=>ls(+e,+t,String(n))+ls(+e+14,+t+8,String(n))).join("")}
  </svg>`}function nu(e,t,n=jn,s=Zn){const o=[];let i=7;const a=()=>(i=(i*9301+49297)%233280)/233280;for(let r=0;r<260&&o.length<34;r++){const l=30+a()*(n-60),c=40+a()*(s-70);t(l,c)||e.some(d=>Math.hypot(d.x-l,d.y-c)<d.r)||(e.push({x:l,y:c,r:46}),o.push(R0(l,c,.75+a()*.45,["#5cc985","#4fbf7a","#78d39a"][r%3])))}return`<svg class="mapTrees" viewBox="0 0 ${n} ${s}" xmlns="http://www.w3.org/2000/svg">${o.join("")}</svg>`}function Wy(e,t){const n=e/2,s=`M ${n} 36 C ${n-36} ${t*.28}, ${n+28} ${t*.48}, ${n-8} ${t*.68} S ${n+18} ${t*.86}, ${n} ${t-28}`;return`<svg class="mapBg" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="${t}" rx="28" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="${e*.22}" cy="${t*.22}" rx="90" ry="48"/><ellipse cx="${e*.78}" cy="${t*.42}" rx="80" ry="40"/><ellipse cx="${e*.3}" cy="${t*.72}" rx="100" ry="46"/></g>
  <ellipse cx="78" cy="${t*.58}" rx="46" ry="28" fill="#8ecae6" ${ie()}/><ellipse cx="70" cy="${t*.56}" rx="24" ry="10" fill="#bde6f7"/>
  <path d="${s}" fill="none" stroke="${la}" stroke-width="44" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#f2dcb8" stroke-width="34" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round" opacity=".9"/>
  ${[[40,250,"#ff8fab"],[500,280,"#b197fc"],[70,520,"#ffd43b"],[490,640,"#ff8fab"],[50,860,"#74c0fc"],[500,980,"#ffd43b"]].map(([o,i,a])=>ls(+o,+i,String(a))+ls(+o+16,+i+10,String(a))).join("")}
  </svg>`}const Vy=(e,t,n=1,s="#4fbf7a")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="10" rx="28" ry="8" fill="#000" opacity=".08"/><circle cx="-14" cy="-2" r="16" fill="${s}" ${ie(3)}/><circle cx="14" cy="0" r="18" fill="${s}" ${ie(3)}/><circle cx="0" cy="-12" r="14" fill="${s}" ${ie(3)}/><circle cx="-4" cy="-16" r="4" fill="#fff" opacity=".28"/></g>`,Uy=(e,t,n="#ff8fab")=>`<g transform="translate(${e} ${t})"><ellipse cx="-7" cy="-2" rx="8" ry="5" fill="${n}" ${ie(2)} transform="rotate(-24)"/><ellipse cx="7" cy="-2" rx="8" ry="5" fill="${n}" ${ie(2)} transform="rotate(24)"/><ellipse cx="-6" cy="4" rx="6" ry="4" fill="#b197fc" ${ie(1.6)} transform="rotate(18)"/><ellipse cx="6" cy="4" rx="6" ry="4" fill="#b197fc" ${ie(1.6)} transform="rotate(-18)"/><path d="M0 -6 V8" ${ie(2)}/></g>`;function zy(e,t,n){const s=e/2,o=(f,u,p)=>u>t*.4&&u<t-28&&Math.abs(f-s)>52&&!n.some(m=>Math.hypot(m.x-f,m.y-u)<m.r+p),i=[.07,.15,.22,.78,.85,.93],a=[.46,.54,.62,.7,.78,.86,.93],r=["#ff8fab","#b197fc","#ffd43b","#74c0fc","#69db7c"],l=[];let c=0;a.forEach((f,u)=>{i.forEach((p,m)=>{const k=Math.round(e*p+((u+m)%2?8:-6)),w=Math.round(t*f);if((u+m)%3===0){if(!o(k,w,34))return;l.push(Vy(k,w,.85+m%2*.15,["#4fbf7a","#5cc985","#3dae6a"][(u+m)%3]))}else{if(!o(k,w,18))return;const b=r[(u*2+m)%r.length];l.push(Ni(k,w,b,.85)),(u+m)%2===0&&o(k+18,w+12,14)&&l.push(Ni(k+18,w+12,r[(u+m+2)%r.length],.7))}c++})});const d=[[e*.2,t*.5],[e*.8,t*.66],[e*.18,t*.84]];for(const[f,u]of d)o(f,u,16)&&l.push(Uy(Math.round(f),Math.round(u),c%2?"#ffd43b":"#ff8fab"));return`<svg class="mapMeadowFill" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">${l.join("")}</svg>`}const Qy=`<svg class="mapSkyArt" viewBox="0 0 900 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
  ${Fs(280,28,1.05)}${Fs(430,8,.8)}${Fs(560,36,.95)}
  ${Fs(250,88,.75)}${Fs(390,108,1.05)}${Fs(540,96,.85)}${Fs(640,78,.7)}
  <g fill="none" stroke-linecap="round">
    ${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M300 ${118+t*6} A70 48 0 0 1 430 ${112+t*6}" stroke="${e}" stroke-width="5"/>`).join("")}
  </g>
</svg>`,Ny=`<svg class="mapMeadowArt" viewBox="0 0 900 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
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
  ${[[48,188,"#ff8fab",.85],[120,176,"#ffd43b",.7],[200,198,"#b197fc",.9],[280,172,"#ff8fab",.75],[360,204,"#74c0fc",.8],[450,178,"#ffd43b",.85],[530,200,"#ff8fab",.75],[620,174,"#b197fc",.8],[700,196,"#69db7c",.7],[790,180,"#ffd43b",.85]].map(([e,t,n,s])=>Ni(+e,+t,String(n),+s)).join("")}
  ${[[80,248,"#ff8fab"],[160,268,"#b197fc"],[250,242,"#ffd43b"],[340,274,"#ff8fab"],[430,250,"#74c0fc"],[520,270,"#b197fc"],[610,246,"#ffd43b"],[700,272,"#ff8fab"],[790,252,"#69db7c"]].map(([e,t,n])=>Ni(+e,+t,String(n),1.05)).join("")}
  ${[[110,304,"#ffd43b"],[230,292,"#ff8fab"],[360,308,"#b197fc"],[490,294,"#74c0fc"],[620,306,"#ff8fab"],[750,296,"#ffd43b"]].map(([e,t,n])=>Ni(+e,+t,String(n),.9)).join("")}
</svg>`,su=`<svg viewBox="0 0 200 170"><ellipse class="parkLawn" cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${ie()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${ie(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${ie(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${ie(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${ie(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${ie(2.5)}/>
  ${R0(40,66,1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${ie(3)}/><path d="M178 88 V132" ${ie(4)}/>
</svg>`,ou=`<svg viewBox="0 0 220 180"><ellipse class="ranchGrass" cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${ie()}/>
  ${bc.map((e,t)=>`<path d="M${20+t*7} 120 A${90-t*7} ${84-t*7} 0 0 1 ${200-t*7} 120" fill="none" stroke="${e}" stroke-width="7"/>`).join("")}
  <path d="M60 140 V82 L80 58 H140 L160 82 V140 Z" fill="#ef5b5b" ${ie(4)}/>
  <path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${la}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  ${bc.map((e,t)=>`<path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${e}" stroke-width="1.3" transform="translate(0 ${-3+t*1.2})"/>`).join("")}
  <rect x="88" y="100" width="44" height="40" rx="3" fill="#d94848" ${ie(3)}/><path d="M88 100 L132 140 M132 100 L88 140" stroke="#fff6e6" stroke-width="3"/>
  <rect x="94" y="70" width="32" height="18" rx="4" fill="#fff6e6" ${ie(3)}/>
  <path d="M10 150 H52 M168 150 H212 M14 140 V158 M30 140 V158 M46 140 V158 M174 140 V158 M190 140 V158 M206 140 V158" stroke="#fff6e6" stroke-width="5" stroke-linecap="round"/><path d="M10 150 H52 M168 150 H212" ${ie(1.5)}/>
  <g transform="translate(178 122) scale(.42)"><ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" ${ie(5)}/><path d="M24 -8 L40 -34 L54 -26 L36 2 Z" fill="#fff" ${ie(5)}/>${bc.slice(0,4).map((e,t)=>`<path d="M38 ${-34+t*5} q-14 4 -20 14" fill="none" stroke="${e}" stroke-width="5" stroke-linecap="round"/>`).join("")}<path d="M-20 14 V34 M20 14 V34" ${ie(6)}/></g>
</svg>`,iu=`<svg viewBox="0 0 190 156">
  <ellipse cx="95" cy="118" rx="88" ry="32" fill="#ffd0e6" ${ie()}/>
  <path d="M28 108 V62 L95 28 L162 62 V108 Z" fill="#fff0f6" ${ie(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="#ff6b9a" ${ie(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="none" stroke="#ffd43b" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="78" y="78" width="34" height="30" rx="4" fill="#ff8ec8" ${ie(3)}/>
  <path d="M95 86 C90 80 82 82 86 90 C90 96 95 100 95 100 C95 100 100 96 104 90 C108 82 100 80 95 86 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  <rect x="42" y="74" width="22" height="16" rx="3" fill="#66d9e8" ${ie(2)}/><rect x="126" y="74" width="22" height="16" rx="3" fill="#d0bfff" ${ie(2)}/>
  ${[36,52,68,84,100,116,132,148].map((e,t)=>`<circle class="clubBulb" cx="${e}" cy="58" r="3.2" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" ${ie(1.4)}/>`).join("")}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`,bf=`<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${ie(3)}/><path d="M17 8 V35 M31 13 V40" ${ie(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${ie(2)}/></svg>`,wf=e=>e.indexOf("data-chibi")>=0?e.replace('viewBox="0 0 200 320"','viewBox="24 0 152 168"'):e.replace('viewBox="0 0 100 160"','viewBox="14 2 72 74"'),C0=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),qy={piano:"keys",keyboard:"keys",stove:"stove","yard-swing":"swing","cc-macrame-swing":"swing","little-slide":"slide",aquarium:"water","cc-cottage-aquarium":"water",fish:"water","pink-fountain":"water","lily-pond":"water",birdbath:"water","doll-house":"dollhouse"};function kf(e){return qy[C0(e)]??null}const Fy=e=>C0(e)==="rubber-ducky",js={play:110,listen:260,stir:140,swing:70,slide:90,look:200,kneel:120},au=9e3;function jy(e,t,n,s,o={}){const i=kf(e);if(!i)return null;switch(i){case"keys":return o.keysPlaying?.has(t)?!s&&n<=js.play?{kind:"play",d:n}:n<=js.listen?{kind:"listen",d:n+40}:null:null;case"stove":return!s&&o.opened?.has(t)&&n<=js.stir?{kind:"stir",d:n}:null;case"swing":return!s&&n<=js.swing?{kind:"swing",d:n}:null;case"slide":return!s&&n<=js.slide?{kind:"slide",d:n}:null;case"water":return n<=js.look?{kind:"look",d:n+20}:null;case"dollhouse":return!s&&n<=js.kneel?{kind:"kneel",d:n}:null}}const Ml=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),Zy={"cute-speaker":"stereo","cc-record-player":"stereo","retro-radio":"stereo","music-box":"musicbox",tv:"tv",fireplace:"fire","brick-fireplace":"fire","wc-woodstove":"fire",woodstove:"fire","wc-stone-hearth":"fire","fire-pit":"fire"};function gs(e){return Zy[Ml(e)]??null}function I0(e){return gs(e)!==null}function vf(e){const t=Ml(e);return t==="ball"||t==="beach-ball"||t==="balloon"?"bounce":t==="teddy"||/plush/.test(t)?"hug":null}const Gn=e=>/(^|-)tub$/.test(Ml(e)),Es=e=>/fridge$/.test(Ml(e)),Gy={stereo:220,musicbox:160,tv:280,fire:230},cd=70,_f=130,Yy=.4,Ky=6,ru=2e4,Oe=900,Xy=["stereo","tv","fire","musicbox"];function B0(e,t){let n=2166136261;const s=e+"|"+t;for(let o=0;o<s.length;o++)n^=s.charCodeAt(o),n=Math.imul(n,16777619);return(n>>>0)%1e3/1e3}const kc=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5);function Jy(e,t,n={}){const s=new Map,o=[...t].sort((r,l)=>r.id<l.id?-1:r.id>l.id?1:0),i=e.filter(r=>r.on&&gs(r.kind)&&!(gs(r.kind)==="musicbox"&&n.musicBoxDone?.has(r.id))),a=[];for(const r of o){if(r.lying)continue;let l=null;for(const c of Xy){for(const d of i){if(gs(d.kind)!==c)continue;const f=kc(r,d);if(f>Gy[c]||r.seated&&c!=="tv"&&c!=="musicbox")continue;const u=c==="stereo"?"dance":c==="tv"?"watch":c==="fire"?"warm":"sway";(!l||f<l.d||f===l.d&&d.id<l.it.id)&&(l={c:r,it:d,d:f,kind:u})}if(l)break}if(!l)for(const c of e){const d=jy(c.kind,c.id,kc(r,c),!!r.seated,{...n,opened:n.opened??n.fridgesOpen});if(d&&(!l||d.d<l.d||d.d===l.d&&c.id<l.it.id)&&(l={c:r,it:c,d:d.d,kind:d.kind}),r.seated)continue;const f=vf(c.kind);let u=null,p=kc(r,c);f&&p<=cd?u=f:Es(c.kind)&&n.fridgesOpen?.has(c.id)&&p<=_f?u="nibble":Gn(c.kind)&&Math.abs(r.x-c.x)<=(c.w??240)*Yy&&Math.abs(r.y-c.y)<=40&&(u="bathe"),u&&(!l||p<l.d||p===l.d&&c.id<l.it.id)&&(l={c:r,it:c,d:p,kind:u})}l&&a.push(l)}a.sort((r,l)=>r.d-l.d||(r.c.id<l.c.id?-1:1));for(const r of a.slice(0,Ky))s.set(r.c.id,{kind:r.kind,item:r.it.id,phase:B0(r.it.id,r.c.id),face:r.it.x<r.c.x?-1:1});return s}function lo(e,t,n){return-((n+e*t)%t)}const eb={},vt=e=>(eb?.VITE_STORE_PREFIX??"")+e,tb=400,Ll=["#ffe0c4","#f6d2b5","#f1c27d","#e0ac69","#c9956c","#c68642","#a86b3c","#8d5524","#5c3a1e","#3d2914"],El=["#2b1d16","#5b3a29","#a0522d","#f4d58d","#ff8fab","#8ecae6","#b388d6","#ff9f43","#1d1416","#c8602a","#7a4b32","#f7f1e8"],$f=["#5a321c","#3f9b52","#3d7ec4","#c48a3a","#7b4fb8"],Ut=["#ff7aa8","#ffd166","#5aa9e6","#80ed99","#c9a0dc","#ff9f68","#ffffff","#5a3d5c","#ff8f7a","#7ec8c3","#f7f3ee","#f4a3c8","#6b8e4e","#e8d5b5","#ef6b6b","#3d4a6b"],Sl=["short","bob","buns","topbun","pixie","long","wavy","puffs","afro","curlybob","coily","boxbraids","braids","sidebraid","crown","pony","sidepony","pigtails","lowbun","locs","halfup","bangs","sidebangs","wavybob"],Tl=["classic","stripes","hoodie","sweater","tank","puff","ruffle","button","jersey","cardigan","bib","raincoat"],Pl=["pants","jeans","shorts","skirt","tutu","leggings","overalls","joggers"],Al=["","twirl","sundress","party","pinafore","jumper","ballet","nightgown","raindress"],Rl=["classic","sneakers","lightup","boots","rainboots","sandals","maryjanes","slippers"],Cl=["round","big","sleepy","sparkle","soft","bright"],Qo=["glasses","square","sunnies","bow","bigbow","headband","flower","cap","beanie","sunhat","catears","earmuffs"],nb=new Set(Sl),sb=new Set(Tl),ob=new Set(Pl),ib=new Set(Al),ab=new Set(Rl),rb=new Set(Cl),lb=new Set(Qo),cb=new Set(["short","pixie","coily","afro","bangs"]),db=new Set(["buns","puffs"]),fb=new Set(["topbun","lowbun"]),hb={hair:"buns",hairC:"#5b3a29",skin:"#f1c27d",eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"pants",bottomC:"#5aa9e6",dress:"",dressC:"#ff7aa8",shoes:"classic",shoesC:"#5a3d5c",accC:"#ffd166"};function ub(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ao(e,t){return typeof e=="string"&&t.has(e)}function Cn(e,t){if(typeof e!="string")return null;const n=e.trim().toLowerCase();for(let s=0;s<t.length;s++)if(t[s]===n)return t[s];return null}function Ea(e){if(!ub(e))return null;let t=0;try{t=JSON.stringify(e).length}catch{return null}if(t>tb)return null;const n={v:1};Ao(e.hair,nb)&&(n.hair=e.hair);const s=Cn(e.hairC,El);s&&(n.hairC=s);const o=Cn(e.skin,Ll);o&&(n.skin=o),Ao(e.eyes,rb)&&(n.eyes=e.eyes);const i=Cn(e.eyeC,$f);i&&(n.eyeC=i),(e.freckles===!0||e.freckles===!1)&&(n.freckles=e.freckles),(e.blush===!0||e.blush===!1)&&(n.blush=e.blush),Ao(e.top,sb)&&(n.top=e.top);const a=Cn(e.topC,Ut);a&&(n.topC=a),Ao(e.bottom,ob)&&(n.bottom=e.bottom);const r=Cn(e.bottomC,Ut);r&&(n.bottomC=r),Ao(e.dress,ib)&&(n.dress=e.dress);const l=Cn(e.dressC,Ut);l&&(n.dressC=l),Ao(e.shoes,ab)&&(n.shoes=e.shoes);const c=Cn(e.shoesC,Ut);if(c&&(n.shoesC=c),Array.isArray(e.acc)){const f=[];for(let u=0;u<e.acc.length&&f.length<2;u++){const p=e.acc[u];typeof p=="string"&&lb.has(p)&&f.indexOf(p)<0&&f.push(p)}n.acc=f}const d=Cn(e.accC,Ut);return d&&(n.accC=d),n}function Bs(e){const t=hb,n=e??{};return{v:1,hair:n.hair??t.hair,hairC:n.hairC??t.hairC,skin:n.skin??t.skin,eyes:n.eyes??t.eyes,eyeC:n.eyeC??t.eyeC,freckles:n.freckles??t.freckles,blush:n.blush??t.blush,top:n.top??t.top,topC:n.topC??t.topC,bottom:n.bottom??t.bottom,bottomC:n.bottomC??t.bottomC,dress:n.dress??t.dress,dressC:n.dressC??t.dressC,shoes:n.shoes??t.shoes,shoesC:n.shoesC??t.shoesC,acc:n.acc?n.acc.slice():[],accC:n.accC??t.accC}}function lu(e){const t=/^#([0-9a-f]{6})$/i.exec(e.trim());if(!t){const s=/^#([0-9a-f]{3})$/i.exec(e.trim());return s?[parseInt(s[1][0]+s[1][0],16),parseInt(s[1][1]+s[1][1],16),parseInt(s[1][2]+s[1][2],16)]:null}const n=parseInt(t[1],16);return[n>>16&255,n>>8&255,n&255]}function Fa(e,t){const n=Cn(e,t);if(n)return n;const s=lu(e);if(!s)return t[0];let o=t[0],i=1e12;for(let a=0;a<t.length;a++){const r=lu(t[a]);if(!r)continue;const l=(s[0]-r[0])*(s[0]-r[0])+(s[1]-r[1])*(s[1]-r[1])+(s[2]-r[2])*(s[2]-r[2]);l<i&&(i=l,o=t[a])}return o}function pb(e){return cb.has(e)?0:db.has(e)?2:fb.has(e)?3:1}function gb(e){for(let t=0;t<e.length;t++){const n=e[t];if(n==="glasses"||n==="square"||n==="sunnies")return 2}for(let t=0;t<e.length;t++){const n=e[t];if(n==="cap"||n==="beanie"||n==="sunhat")return 3}for(let t=0;t<e.length;t++){const n=e[t];if(n==="bow"||n==="bigbow")return 1}return 0}function Il(e){const t=Bs(e),n=t.dress!=="";return{skin:t.skin,hair:t.hairC,hairStyle:pb(t.hair),shirt:n?t.dressC:t.topC,pants:n?t.dressC:t.bottomC,acc:gb(t.acc)}}const mb=["short","bob","buns","topbun"];function ca(e){const t=typeof e.hairStyle=="number"&&e.hairStyle>=0&&e.hairStyle<=3?Math.round(e.hairStyle):0,n=e.acc===1?["bow"]:e.acc===2?["glasses"]:e.acc===3?["cap"]:[],s=Fa(String(e.shirt??""),Ut);return{v:1,hair:mb[t],hairC:Fa(String(e.hair??""),El),skin:Fa(String(e.skin??""),Ll),eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:s,bottom:"pants",bottomC:Fa(String(e.pants??""),Ut),dress:"",dressC:s,shoes:"classic",shoesC:"#5a3d5c",acc:n,accC:"#ffd166"}}function da(e){const t=Ea(e)??{},n=Bs(t);return{...Il(n),look2:n}}const yb=new Set(["glasses","square","sunnies"]),bb=new Set(["bow","bigbow","flower","headband"]),wb=new Set(["cap","beanie","sunhat","catears","earmuffs"]);function Ur(e){return yb.has(e)?"face":bb.has(e)?"bow":wb.has(e)?"hat":"other"}function st(e,t){return t[Math.floor(e()*t.length)]}function Bl(e=Math.random){const t=e()<.38,n=e();let s=[];if(n<.22)s=[];else if(n<.68)s=[st(e,Qo)];else{const o=st(e,Qo),i=Qo.filter(a=>Ur(a)!==Ur(o));s=[o,st(e,i)]}return{v:1,hair:st(e,Sl),hairC:st(e,El),skin:st(e,Ll),eyes:st(e,Cl),eyeC:st(e,$f),freckles:e()<.4,blush:e()<.85,top:st(e,Tl),topC:st(e,Ut),bottom:st(e,Pl),bottomC:st(e,Ut),dress:t?st(e,Al.filter(o=>o!=="")):"",dressC:st(e,Ut),shoes:st(e,Rl),shoesC:st(e,Ut),acc:s,accC:st(e,Ut)}}function kb(e,t=Math.random){const n=e.characters[0];if(!n)return e;const s=Bl(t),o=Il(s),i=e.characters.slice();return i[0]={...n,...o,look2:s},{...e,characters:i}}function O0(e){const t=e.characters[0];if(!t||t.look2)return e;const n=e.characters.slice();return n[0]={...t,look2:{...ca(t),eyes:"sparkle"}},{...e,characters:n}}function vb(e){const t=[e.skin,e.hair,e.hairStyle,e.shirt,e.pants,e.acc,e.look2?JSON.stringify(e.look2):""].join("|");return e.costume?t+"|cos:"+e.costume:t}const cu={m:10,d:24},du={m:11,d:2},zr={yellow:"#ffd166",denim:"#4f7fb8",rose:"#f28fb0",mint:"#7fd8b8"},_b=["helper-yellow","helper-denim","helper-rose","helper-mint","witch","cat","ghost","skeleton","bat"],$b=new Set(_b),fu={helper:"Yellow Helper",witch:"Witch hat",cat:"Black cat",ghost:"Ghost sheet",skeleton:"Bone PJs",bat:"Bat cape"};function So(e){return typeof e=="string"&&$b.has(e)?e:null}function xb(e=new Date){const t=e.getMonth()+1,n=e.getDate();return t===cu.m?n>=cu.d:t===du.m?n<=du.d:!1}function Mb(){const e=typeof globalThis<"u"?globalThis:{};if(typeof e.__costumeDate=="string"){const t=new Date(e.__costumeDate+"T12:00:00");if(!isNaN(+t))return t}return new Date}function Ol(){return xb(Mb())}function Lb(e){if(!e||e.costume==null)return null;const t=So(e.costume);return t&&Ol()?t:null}const Sa=3600,fo=470,Yn=590,oo=["goat","sheep","piglet","chicks","bunny","cow"],Eb=[1085,1215,1345,1470,1600,1735],Sb=520,xf=1900,Mf=[600,800,1e3,1200,1400,1600],dd=435,Tb=["Chestnut","Snowy","Midnight","Sunny","Rainbow"],D0=[2470,2600,2730,2860,2990],ho=540,Pb=["pet","carrot","apple","hay"],fd=6,Ab=e=>3175+e*68,Rb=8e4,hd=20,Cb=1500,H0=["egg","carrot","flower"],Ib={egg:"ranch-egg",carrot:"ranch-carrot",flower:"ranch-bouquet"},Bb=()=>({egg:0,carrot:0,flower:0}),Ob=(e,t,n)=>Number.isInteger(e)&&e>=t&&e<=n?e:null;function Lf(e){const t=Bb();if(!e||typeof e!="object")return t;for(const n of H0)t[n]=Ob(e[n],0,hd)??0;return t}function Ef(e){const t=Array(fd).fill(null);if(Array.isArray(e))for(let n=0;n<fd;n++){const s=e[n];if(!s||s.seed!=="carrot"&&s.seed!=="flower")continue;const o=Number(s.at),i=Number(s.wet);Number.isFinite(o)&&Number.isFinite(i)&&(t[n]={seed:s.seed,at:o,wet:i})}return t}function Dl(e,t){if(!e||!e.wet)return 0;const n=(t-e.wet)/Rb;return n>=1?3:n>=.4?2:1}function ud(e,t,n,s,o=0){const i=e.slice(),a={...t};switch(n.op){case"plant":return i[n.i]?"taken":(i[n.i]={seed:n.seed,at:s,wet:0},{plots:i,basket:a,garden:!0});case"water":{const r=i[n.i];return r?r.wet?"wet":(i[n.i]={...r,wet:s},{plots:i,basket:a,garden:!0}):"empty"}case"pick":{const r=i[n.i];return r?Dl(r,s)<3?"notReady":a[r.seed]>=hd?"full":(a[r.seed]++,i[n.i]=null,{plots:i,basket:a,garden:!0,got:r.seed}):"empty"}case"egg":return s-o<Cb?"slow":a.egg>=hd?"full":(a.egg++,{plots:i,basket:a,garden:!1,got:"egg"});case"use":return a.carrot<=0?"none":(a.carrot--,{plots:i,basket:a,garden:!1});case"take":return a[n.kind]<=0?"none":(a[n.kind]--,{plots:i,basket:a,garden:!1})}}const ds=80,Db=30*24*60*60*1e3,Hb=5,W0=6,ns=["#ffd6e8","#fff3b0","#d8f5e8","#e6d6ff","#d6efff"],Wb=/^m[A-Za-z0-9]{4,40}$/,Vb=/^[A-Za-z0-9:_\/.-]{1,80}$/;function vc(e,t=Date.now()){const n=Math.floor((t-e)/864e5);return n<=0?"today":n===1?"yesterday":n<7?"a few days ago":"a while ago"}function Ub(e,t=Date.now()){const n=e?.letters;if(!Array.isArray(n))return null;const s=[];for(const i of n.slice(-30*2)){if(!i||typeof i!="object")continue;const a=i;if(typeof a.id!="string"||!Wb.test(a.id)||typeof a.from!="string")continue;const r=a.from.normalize("NFC").replace(/\s+/g," ").trim();if(!r||r.length>24||typeof a.fromPid!="string"||!Vb.test(a.fromPid)||typeof a.text!="string"||a.text.length>ds||typeof a.at!="number"||!Number.isFinite(a.at)||t-a.at>Db||a.at>t+864e5||!Number.isInteger(a.color)||a.color<0||a.color>=Hb||!Number.isInteger(a.sticker)||a.sticker<0||a.sticker>=W0)continue;const l=a.text.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(l.length>ds)continue;const c={id:a.id,from:r,fromPid:a.fromPid,text:l,color:a.color,sticker:a.sticker,at:a.at};a.read===!0&&(c.read=!0),s.push(c)}const o=s.slice(-30);return o.length?{letters:o}:null}function Sf(e){return e?.letters.filter(t=>!t.read&&t.text).length??0}const zb=/^[A-Za-z0-9:_\/.-]{1,80}$/,V0=/crib|bassinet|high-?chair|cat-bed|pet-bed|dog-bed|kennel|tulip|flower|toadstool|mobile/,_c={bed:{head:{x:.24,y:.42},pillow:{x:.1,y:.27,w:.22,h:.18},mattress:{x:.36,y:.34,w:.36,h:.16},clip:"starter"},"wooden-bed":{head:{x:.22,y:.53},pillow:{x:.12,y:.36,w:.24,h:.18},mattress:{x:.38,y:.46,w:.32,h:.16},clip:"wooden"},"checker-bed":{head:{x:.23,y:.34},pillow:{x:.09,y:.16,w:.25,h:.22},mattress:{x:.38,y:.28,w:.32,h:.18},clip:"checker"},"bunk-bed":{head:{x:.2,y:.51},pillow:{x:.1,y:.43,w:.26,h:.14},mattress:{x:.3,y:.47,w:.36,h:.14},clip:"bunk"},"canopy-bed":{head:{x:.38,y:.52},pillow:{x:.28,y:.46,w:.24,h:.14},mattress:{x:.48,y:.48,w:.28,h:.16},clip:"canopy"},"cc-heart-bed":{head:{x:.22,y:.67},pillow:{x:.12,y:.58,w:.26,h:.16},mattress:{x:.36,y:.64,w:.36,h:.16},clip:"heart"},"cc-canopy-daybed":{head:{x:.35,y:.6},pillow:{x:.26,y:.5,w:.26,h:.16},mattress:{x:.48,y:.54,w:.3,h:.16},clip:"daybed"},"wc-plaid-bed":{head:{x:.25,y:.29},pillow:{x:.08,y:.14,w:.3,h:.2},mattress:{x:.36,y:.18,w:.3,h:.18},clip:"wooden"}},Qb=["bed","pack:wooden-bed","pack:checker-bed","pack:bunk-bed","pack:canopy-bed","pack:cc-heart-bed","pack:cc-canopy-daybed","pack:wc-plaid-bed"];function U0(e){return e==="bed"||/bunk/.test(e)||/daybed/.test(e)?!0:/(^|[-_:])bed$/.test(e)}function z0(){return Qb.slice()}function Hl(e){const t=String(e||"").toLowerCase();if(!t||V0.test(t)||!U0(t))return null;const n=t.replace(/^pack:/,"");return _c[n]||_c[t]||_c.bed}const Nb={head:{x:55.0733,y:59.7445},chest:{x:60,y:114},hip:{x:60,y:138},classic:{x:60,y:52.8}},hu=48,uu=138.24;function Q0(e,t){const n=-90*Math.PI/180,s=Math.cos(n),o=Math.sin(n),i=e-hu,a=t-uu,r=hu+s*i-o*a,l=uu+o*i+s*a;return{x:r-60,y:l-192}}function Qr(e,t){const n=Nb[e],s=Q0(n.x,n.y);return{x:t?-s.x:s.x,y:s.y}}const pu=120,$c=192,qb=.26;function Fb(e,t,n,s,o=1){const i=o>0?o:1;if(n==="lie"&&s){const r=-t*i+210.24,l=-e*i+186.24;return{x:-pu*i/2+r,y:-$c*i+l}}if(n==="lie"){const r=Q0(e,t);return{x:r.x*i,y:r.y*i}}const a=n==="sit"?qb*$c*i:0;return{x:(e-pu/2)*i,y:(t-$c)*i+a}}function jb(e,t,n,s,o){const i=Hl(e);if(!i||t<1||n<1)return null;const a=Qr("head",!1),r=(i.head.x-.5)*t-a.x,l=(i.head.y-1)*n-a.y,c=Qr(s,o);return{x:.5+((o?-r:r)+c.x)/t,y:1+(l+c.y)/n}}const Zb={"picnic-table":{pose:"sit",spots:[{dx:-.33,dy:-.22},{dx:.33,dy:-.22}]},"cc-window-seat":{pose:"sit",spots:[{dx:-.28,dy:-.26},{dx:.28,dy:-.26}]}},gu=.24,mu=.22,Gb=-.3;function ai(e){const t=String(e||"").toLowerCase();if(!t||V0.test(t))return null;if(U0(t))return{pose:"lie",spots:[{dx:0,dy:0}]};const n=Zb[t.replace(/^pack:/,"")];return n?{pose:n.pose,spots:n.spots.map(s=>({...s}))}:/sofa|couch|loveseat/.test(t)?{pose:"sit",spots:[{dx:-gu,dy:-.33},{dx:gu,dy:-.33}]}:/armchair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/bench|window-seat/.test(t)?{pose:"sit",spots:[{dx:-mu,dy:-.3},{dx:mu,dy:-.3}]}:/ottoman/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/stool/.test(t)?{pose:"sit",spots:[{dx:0,dy:Gb}]}:/rocker/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.38}]}:/chair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.48}]}:null}function Yb(e){const t=Hl(e);if(t)return"k-bed k-bed-"+t.clip;const n=String(e||"").toLowerCase();return/sofa|couch|loveseat/.test(n)?"k-sofa":/window-seat/.test(n)?"k-window":/bench/.test(n)?"k-bench":/picnic-table/.test(n)?"k-picnic":/ottoman/.test(n)?"k-ottoman":/stool/.test(n)?"k-stool":/chair|rocker/.test(n)?"k-chair":""}function N0(e){const t=ai(e.kind);if(!t)return[];const n=e.scale||1,s=t.pose==="lie"?Hl(e.kind):null;if(s){const o=e.w*n,i=e.h*n,a=Qr("head",!1),r=(s.head.x-.5)*o-a.x,l=(s.head.y-1)*i-a.y;return[{x:e.x+(e.flip?-r:r),y:e.footY+l,pose:"lie",n:0}]}return t.spots.map((o,i)=>{const a=o.dx*e.w*n,r=o.dy*e.h*n,l=i===1?1:0;return{x:e.x+(e.flip?-a:a),y:e.footY+r,pose:t.pose,n:l}})}function No(e){const t=(r,l)=>({x:r,y:l,seat:null,toast:null,moved:!0});if(e.mode!=="play")return t(e.releaseX,e.releaseY);const n=e.piece;if(!n)return e.via==="drag"?t(e.releaseX,e.releaseY):{x:e.releaseX,y:e.releaseY,seat:null,toast:null,moved:!1};if(e.via==="tap"&&e.alreadyOn===n.id)return t(n.x,n.footY);const s=new Set(e.occupied.filter(r=>r.item===n.id).map(r=>r.n)),o=N0(n).filter(r=>!s.has(r.n));if(!o.length)return e.via==="tap"?{x:e.releaseX,y:e.releaseY,seat:null,toast:"Someone is already there!",moved:!1}:t(e.releaseX,e.releaseY);let i=o[0],a=1/0;for(const r of o){const l=(r.x-e.releaseX)**2+(r.y-e.releaseY)**2;l<a&&(i=r,a=l)}return{x:i.x,y:i.y,seat:{item:n.id,pose:i.pose,n:i.n},toast:null,moved:!0}}const Kb={sofa:260,armchair:150,bed:300,chair:100,stool:90,rocker:190,"yard-bench":308,"bar-stool":52.8,"bunk-bed":294,"canopy-bed":294,"cc-bubble-chair":142,"cc-canopy-daybed":276,"cc-dryer-chair":164,"cc-heart-bed":236,"cc-mani-chair":188,"cc-mushroom-stool":112,"cc-scallop-loveseat":248,"checker-bed":196,"cloud-sofa":212,"comfy-armchair":161.7,"cream-sofa":234.6,"egg-chair":126,"fancy-sofa":234.6,"gaming-chair":101.4,"lattice-bench":147,"puffy-stool":46.9,"rocking-chair":137.2,"salon-chair":111.8,"swivel-stool":46.2,"waiting-bench":166.6,"wash-chair":186.2,"wood-armchair":127.4,"wood-stool":46.2,"wooden-bed":235.2};function hn(e){const t=String(e||"").toLowerCase().replace(/^pack:/,"");return Kb[t]??320}const ri=540;function uo(e,t,n,s=2400){const o=Math.max(0,t)/2+70,i=40;let a=n<e-8?-1:1,r=e+a*o;return(r<i||r>s-i)&&(a=-a,r=e+a*o),r<i&&(r=i),r>s-i&&(r=s-i),{x:r,y:ri}}function Tf(e){if(!e||typeof e!="object")return null;const t=e;return typeof t.item!="string"||!zb.test(t.item)||t.pose!=="sit"&&t.pose!=="lie"||t.n!==0&&t.n!==1?null:{item:t.item,pose:t.pose,n:t.n}}function pd(e,t){if(!e)return null;const n=Tf(e);return!n||!t?.some(s=>s&&s.id===n.item)?null:n}const po=["sleepy","hungry","playful","clean"],Xb=1,Jb=4*6e4,ew=2*6e4,tw=75e3;function nw(e,t){return e.characters.some(n=>Rf(n))?Jb:t===0?tw:ew}const Pf=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),sw=/^(cake|juice|cupcake|cookie|apple|pie|pizza|donut|sandwich|milk|bread|fruit|.*-cake|.*-pie|.*cookies?)$/,Et=e=>sw.test(Pf(e)),Yo=e=>!!vf(e)||Pf(e)==="rubber-ducky";function Af(e){if(!e||typeof e!="object")return null;const t={};for(const n of po){const s=e[n];if(typeof s!="number"||!Number.isFinite(s))continue;const o=Math.max(0,Math.min(3,Math.round(s)));o<3&&(t[n]=o)}return Object.keys(t).length?t:null}function go(e,t){const n=e?.needs?.[t];return typeof n=="number"?Math.max(0,Math.min(3,n)):3}function Rf(e){let t=null,n=Xb+1;for(const s of po){const o=go(e,s);o<n&&(n=o,t=s)}return t}function q0(e,t){if(t)return{...e,needs:t};if(!("needs"in e))return e;const{needs:n,...s}=e;return s}const xc=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5),yu=(e,t)=>!!(e.held.left&&t(e.held.left.kind)||e.held.right&&t(e.held.right.kind)),ow=e=>hn(e.kind)*(e.scale||1)*(e.size||1);function Cf(e,t,n){const s=e.rooms[t.room]?.items??[];switch(n){case"sleepy":return t.seat?.pose==="lie"&&s.some(o=>o.id===t.seat.item);case"clean":return s.some(o=>Gn(o.kind)&&Math.abs(t.x-o.x)<=Math.max(60,ow(o)*.45)&&Math.abs(t.y-o.y)<=60);case"hungry":return yu(t,Et)||s.some(o=>Es(o.kind)&&xc(t,o)<=_f+30||Et(o.kind)&&xc(t,o)<=cd+40);case"playful":return yu(t,Yo)||s.some(o=>Yo(o.kind)&&xc(t,o)<=cd+40)}}function iw(e,t){return po.filter(n=>go(t,n)<3&&Cf(e,t,n))}function aw(e,t,n){const s=e.characters.find(a=>a.id===t);if(!s||go(s,n)>=3||!Cf(e,s,n))return e;const o={...s.needs??{}};delete o[n];const i=q0(s,Af(o));return{...e,characters:e.characters.map(a=>a.id===t?i:a)}}function rw(e,t,n){const s=e.characters.find(a=>a.id===t),o=go(s,n);if(!s||o<=0)return e;const i=q0(s,Af({...s.needs??{},[n]:o-1}));return{...e,characters:e.characters.map(a=>a.id===t?i:a)}}function lw(e,t){const n=Object.values(e.rooms).flatMap(c=>c?.items??[]),s={sleepy:n.some(c=>/bed$|^bed|sofa|couch/.test(Pf(c.kind))),hungry:n.some(c=>Es(c.kind)||Et(c.kind)),playful:n.some(c=>Yo(c.kind)),clean:n.some(c=>Gn(c.kind))},o=c=>c[(t%c.length+c.length)%c.length],i=[];for(const c of[...e.characters].sort((d,f)=>d.id<f.id?-1:1)){const d=!!Rf(c);for(const f of po)if(s[f]){const u=go(c,f);u>0&&i.push({id:c.id,need:f,l:u,wish:d})}}if(!i.length)return null;const a=i.filter(c=>!c.wish);if(a.length){const c=a.filter(f=>f.l<3),d=c.length?o(c):o(a);return{id:d.id,need:d.need}}const r=Math.max(...i.map(c=>c.l)),l=o(i.filter(c=>c.l===r));return{id:l.id,need:l.need}}const gd=45e3,cw=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],bu=/^[A-Za-z0-9:_\/.-]{1,80}$/,dw=/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u,wu=["feed","burp","change","rock"];function mo(e){const t=String(e||"").toLowerCase();return!t||/mobile/.test(t)?null:/bassinet/.test(t)?"bassinet":t==="crib"||/(^|[-_:])crib$/.test(t)?"crib":null}function fw(e){return e===2?"Cozy":"Happy"}function hw(e){return e+1}function uw(e){return cw.indexOf(e)>=0}function pw(e){const t=typeof e=="number"&&Number.isFinite(e)?Math.round(e):2;return t<=2?2:t>=4?4:3}function F0(e){if(!e||typeof e!="object")return;const t=e,n={};let s=!1;for(let o=0;o<wu.length;o++){const i=wu[o],a=t[i];typeof a=="number"&&Number.isFinite(a)&&(n[i]=a,s=!0)}return s?n:void 0}function un(e){const t={name:e.name,mood:e.mood,spot:e.spot,x:e.x,y:e.y,room:e.room,since:e.since};(e.spot==="crib"||e.spot==="bassinet")&&e.bed&&(t.bed=e.bed),e.spot==="mat"&&e.seat&&(t.seat=e.seat),e.spot==="arms"&&e.holder&&(t.holder=e.holder);const n=F0(e.at);return n&&(t.at=n),t}function If(e,t){return JSON.stringify(e)===JSON.stringify(t)}function gw(e,t){if(!e||typeof e!="object")return null;const n=e,s=String(n.name??"").normalize("NFC").replace(/\s+/g," ").trim();if(!dw.test(s)||(s.match(/\d/g)||[]).length>2)return null;let o=n.spot==="crib"||n.spot==="bassinet"||n.spot==="arms"||n.spot==="mat"?n.spot:"mat";const i=uw(n.room)?n.room:"nursery",a=typeof n.x=="number"&&Number.isFinite(n.x)?Math.max(0,Math.min(2400,n.x)):700,r=typeof n.y=="number"&&Number.isFinite(n.y)?Math.max(0,Math.min(600,n.y)):540,l=typeof n.since=="number"&&Number.isFinite(n.since)?n.since:0,c=pw(n.mood);let d=typeof n.bed=="string"&&bu.test(n.bed)?n.bed:void 0,f=Tf(n.seat)??void 0,u=typeof n.holder=="string"&&bu.test(n.holder)?n.holder:void 0;if(t){const p=t[i]?.items??[];if(o==="crib"||o==="bassinet"){let m=!1;for(let k=0;k<p.length;k++){const w=p[k];w&&w.id===d&&mo(String(w.kind||""))===o&&(m=!0)}m||(o="mat",d=void 0)}if(f){let m=!1;for(let k=0;k<p.length;k++)p[k]&&p[k].id===f.item&&(m=!0);m||(f=void 0)}}return o!=="crib"&&o!=="bassinet"&&(d=void 0),o!=="mat"&&(f=void 0),o!=="arms"&&(u=void 0),o==="arms"&&!u&&(o="mat"),un({name:s,mood:c,spot:o,bed:d,seat:f,holder:u,x:a,y:r,room:i,at:F0(n.at),since:l})}function mw(e,t){const n=e.nursery?.items??[];for(let s=0;s<n.length;s++){const o=n[s];if(!o||!o.id||mo(String(o.kind||""))!=="crib")continue;const i=typeof o.x=="number"&&Number.isFinite(o.x)?o.x:1170,a=typeof o.y=="number"&&Number.isFinite(o.y)?o.y:480;return un({name:"Bean",mood:2,spot:"crib",bed:o.id,x:i,y:a,room:"nursery",since:t})}return un({name:"Bean",mood:2,spot:"mat",x:700,y:540,room:"nursery",since:t})}function yw(e,t,n){const s=Math.min(4,e.mood+1);return un({...e,mood:s,at:{...e.at||{},[t]:n},since:n})}function bw(e,t){if(!e.since){const i=un({...e,since:t});return If(i,e)?null:i}if(e.mood<=2)return null;const n=Math.floor((t-e.since)/gd);if(n<1)return null;const s=Math.min(n,e.mood-2),o=e.mood-s;return un({...e,mood:o,since:e.since+s*gd})}function md(e,t,n,s,o){const i=un(t?{...e,spot:"arms",holder:t,room:n,x:s,y:o,bed:void 0,seat:void 0}:{...e,spot:"mat",room:n,x:s,y:o,bed:void 0,seat:void 0,holder:void 0});return If(i,e)?e:i}function ww(e,t,n,s){let o=t.spot==="crib"||t.spot==="bassinet"?t.spot:"mat",i,a;if(o==="crib"||o==="bassinet"){let l=!1;for(let c=0;c<n.length;c++){const d=n[c];d&&d.id===t.bed&&mo(d.kind)===o&&(l=!0)}l&&t.bed?i=t.bed:o="mat"}if(o==="mat"&&t.seat){let l=null;for(let f=0;f<n.length;f++)n[f]&&n[f].id===t.seat.item&&(l=n[f]);const c=l?ai(l.kind):null;let d=!1;for(let f=0;f<s.length;f++)s[f].item===t.seat.item&&s[f].n===t.seat.n&&(d=!0);l&&c&&c.pose===t.seat.pose&&!d&&(a=t.seat)}const r=un({...e,spot:o,room:t.room,x:t.x,y:t.y,bed:i,seat:a,holder:void 0});return If(r,e)?e:r}function kw(e,t,n,s){const o=e.spot==="mat"&&e.seat?.item===t,i=!!n&&(e.spot==="crib"||e.spot==="bassinet")&&e.bed===t;return!o&&!i?e:un({...e,spot:"mat",x:s?s.x:e.x,y:s?s.y:ri,bed:void 0,seat:void 0,holder:void 0})}function j0(e,t){const n=t.scale||1,s=t.w*n,o=t.h*n,i=mo(e);let a=i==="bassinet"?0:-.02*s;const r=i==="bassinet"?-.52*o:-.46*o;return t.flip&&(a=-a),{x:t.x+a,y:t.footY+r}}function vw(e){const t=(o,i)=>({x:o,y:i,spot:"mat",bed:null,seat:null});if(e.mode!=="play"||!e.piece)return t(e.releaseX,e.releaseY);const n=mo(e.piece.kind);if(n){const o=j0(e.piece.kind,e.piece);return{x:o.x,y:o.y,spot:n,bed:e.piece.id,seat:null}}const s=No({mode:"play",via:"drag",releaseX:e.releaseX,releaseY:e.releaseY,piece:e.piece,occupied:e.occupied});return s.seat?{x:s.x,y:s.y,spot:"mat",bed:null,seat:s.seat}:t(e.releaseX,e.releaseY)}function _w(e,t=2400){const s=t-40>40?t-40:40;let o=e;return o>=40||(o=40),o>s&&(o=s),{x:o,y:ri}}function $w(e,t){return!e||e.spot!=="mat"||!e.seat||e.room!==t?null:{item:e.seat.item,n:e.seat.n}}const fa=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],xw=["living","bedroom","kitchen","salon","nursery","bathroom"],Z0=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],Rt=2400,zn=600,G0=1e3,li=(Rt-G0)/2,qn=[.75,.875,1,1.25,1.5];function Kn(e){if(typeof e!="number"||!Number.isFinite(e))return 1;let t=1,n=1/0;for(const s of qn){const o=Math.abs(e-s);o<n&&(n=o,t=s)}return t}function Fe(e){return(e?.scale||1)*Kn(e?.size)}function Y0(e,t){const n=Kn(t);if(n===1){if(e.size==null)return e;const{size:s,...o}=e;return o}return e.size===n?e:{...e,size:n}}const ci=8,Mw=4,Lw=5,Ew=/^[A-Za-z0-9:_\/.-]{1,80}$/;function Bf(e){const t=e?.dogKennel;if(!t||typeof t!="object"||typeof t.item!="string"||!Ew.test(t.item))return null;const n=e.rooms;if(!n)return null;for(const s of Object.values(n))if(s?.items?.some(o=>o&&o.id===t.item&&o.kind==="kennel"))return{item:t.item};return null}function Sw(e,t){return Bf({dogKennel:{item:t},rooms:e.rooms})!==null}const ee=(e,t,n,s,o=1)=>({id:e+"-"+s,kind:e,x:t+li,y:n,flip:!1,z:s,scale:o});function Fn(){return{version:3,houseId:"local",currentRoom:"living",rooms:{living:{wallpaper:"#ffd6e0",floor:"#e8b98a",pattern:1,items:[ee("sofa",470,470,1),ee("lamp",230,470,2),ee("plant",760,480,3),ee("rug",480,530,0),ee("picture",470,200,4),ee("cat",600,520,5),ee("window",-350,230,6),ee("armchair",-300,480,7),ee("bookshelf",1250,470,8),ee("tree",1500,480,9),ee("clock",1100,170,10)]},bedroom:{wallpaper:"#d9ccff",floor:"#f2d0a4",pattern:2,items:[ee("bed",450,480,1),ee("window",750,230,2),ee("teddy",330,500,3),ee("stars",300,180,4),ee("tub",1350,480,5),ee("lamp",-250,470,6),ee("flowers",-150,500,7)]},salon:{wallpaper:"#ffe0f0",floor:"#f6d6ff",pattern:2,items:[ee("rug",470,540,0),ee("mirror",470,150,1),ee("vanity",470,480,2),ee("perfume",400,345,3),ee("polish",450,345,4),ee("hairdryer",560,340,5),ee("stool",470,545,6),ee("lamp",200,470,7),ee("flowers",780,480,8),ee("picture",780,200,9),ee("chair",-250,490,10),ee("mirror",-250,170,11),ee("plant",1300,480,12)]},kitchen:{wallpaper:"#cdf3dc",floor:"#ffe7a8",pattern:3,items:[ee("fridge",200,470,1),ee("table",520,500,2),ee("cake",520,395,3),ee("stove",800,470,4),ee("chair",380,500,5),ee("chair",660,500,6),ee("juice",470,395,7),ee("plant",-300,480,8),ee("fish",1300,480,9)]},nursery:{wallpaper:"#d6f3ff",floor:"#f3ddc4",pattern:1,items:[ee("cloud-rug",480,545,0),ee("crib",470,480,1),ee("crib-mobile",470,155,2),ee("rocker",780,490,3)]},bathroom:{wallpaper:"#d4f4fb",floor:"#f7e7d4",pattern:3,items:[ee("bath-mat",180,560,0),ee("shower-curtain",-40,520,1),ee("soaking-tub",160,500,2),ee("rubber-ducky",300,545,3),ee("bath-toilet",480,500,4),ee("sink-vanity",700,500,5),ee("bath-mirror",700,175,6),ee("towel-bar",940,200,7)]},backyard:{wallpaper:"#c5ecff",floor:"#b6e3a8",pattern:0,items:[{id:"yard-bench-1",kind:"yard-bench",x:1420,y:372,flip:!1,z:1,scale:1},{id:"tulip-bed-2",kind:"tulip-bed",x:946,y:580,flip:!1,z:2,scale:1}]}},characters:[Ss({id:"c1",skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6",room:"living",x:330+li,y:540})],soundOn:!0,dogKennel:null,yardBenchRefit:1}}function Ss(e){return{skin:"#f1c27d",hair:"#5b3a29",hairStyle:0,shirt:"#ff7aa8",pants:"#5aa9e6",size:"kid",acc:0,room:"living",x:Rt/2,y:540,flip:!1,held:{left:null,right:null},...e}}const Zs=(e,t,n)=>Math.max(t,Math.min(n,e)),bi=e=>e.items.reduce((t,n)=>Math.max(t,n.z),0),Tw=e=>e.items.reduce((t,n)=>Math.min(t,n.z),0);function ja(e,t,n){return{...e,characters:e.characters.map(s=>s.id===t?n(s):s)}}function Pw(e,t,n){const s=e.baby;if(!t||!s||s.spot!=="arms"||s.holder!==t.id||n===s.room)return e;const o=t.room===s.room?t.x:s.x,i=t.room===s.room?t.y:ri,a=md(s,null,s.room,o,i);return!a||a===s?e:{...e,baby:a}}function ha(e){if(!e.seat)return e;const{seat:t,...n}=e;return n}let Nr=null;function K0(){const e=Nr;return Nr=null,e}function Za(e,t,n,s){if(!e.baby)return e;const o=s?uo(s.x,hn(s.kind)*Fe(s),e.baby.x):null,i=kw(e.baby,t,n,o);return i===e.baby?e:{...e,baby:i}}function Ga(e,t,n){n&&(Nr={id:t,x:n.x,kind:n.kind,scale:Fe(n)});let s=!1;const o=e.characters.map(i=>{if(i.seat?.item!==t)return i;if(s=!0,!n)return ha(i);const a=uo(n.x,hn(n.kind)*Fe(n),i.x),{seat:r,...l}=i;return{...l,x:a.x,y:a.y}});return s?{...e,characters:o}:e}function Aw(e,t,n,s){if(!s){const i=pd(e.seat,t);return i?e.seat===i?e:{...e,seat:i}:ha(e)}const o=pd(n,t);return o?{...e,seat:o}:ha(e)}function ot(e,t,n){const s=e.rooms[t];if(!s)return e;const o=n(s);return o===s?e:{...e,rooms:{...e.rooms,[t]:o}}}function Rw(e){const t=new Set;let n=!1;const s=e.map(o=>{if(!t.has(o.id))return t.add(o.id),o;n=!0;const i=String(o.id).replace(/-d\d+$/,"").replace(/[^A-Za-z0-9:_/.-]/g,"").slice(0,72)||"item";let a=2,r=(i+"-d"+a).slice(0,80);for(;t.has(r);)a+=1,r=(i+"-d"+a).slice(0,80);return t.add(r),{...o,id:r}});return n?s:e}function Cw(e){let t=!1;const n={...e.rooms};for(const s of fa){const o=e.rooms[s];if(!o||!Array.isArray(o.items))continue;const i=Rw(o.items);i!==o.items&&(n[s]={...o,items:i},t=!0)}return t?{...e,rooms:n}:e}function X0(e){if(!e||!e.rooms)return e;const t=Fn().rooms,n=e.rooms;let s=!1;for(const i of fa){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(s=!0)}const o=s?(()=>{const i={...n};for(const a of fa){const r=n[a];(!r||typeof r!="object"||!Array.isArray(r.items))&&(i[a]=t[a])}return{...e,rooms:i}})():e;return Cw(o)}function qi(e,t){switch(Nr=null,t.type){case"room/switch":return e.rooms[t.room]?{...e,currentRoom:t.room}:e;case"item/add":return ot(e,t.room,n=>n.items.length>=80||n.items.some(s=>s.id===t.item.id)?n:{...n,items:[...n.items,{...t.item,z:bi(n)+1}]});case"item/move":{const n=e.rooms[t.room]?.items.find(o=>o.id===t.id)??null,s=ot(e,t.room,o=>({...o,items:o.items.map(i=>i.id===t.id?{...i,x:Zs(t.x,0,Rt),y:Zs(t.y,40,zn)}:i)}));return t.stand?Za(Ga(s,t.id,n),t.id,!1,n):s}case"item/flip":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return Za(Ga(ot(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?{...o,flip:!o.flip}:o)})),t.id,n),t.id,!1,n)}case"item/size":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||Kn(n.size)===Kn(t.size)?e:ot(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?Y0(o,t.size):o)}))}case"item/power":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||!I0(n.kind)||!!n.on==!!t.on?e:ot(e,t.room,s=>({...s,items:s.items.map(o=>{if(o.id!==t.id)return o;if(t.on)return{...o,on:!0};const{on:i,...a}=o;return a})}))}case"item/front":return ot(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:bi(n)+1}:s)}));case"item/back":return ot(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:Tw(n)-1}:s)}));case"item/delete":{const n=e.rooms[t.room]?.items.find(a=>a.id===t.id)??null,s=n?.kind==="kennel",o=Ga(ot(e,t.room,a=>({...a,items:a.items.filter(r=>r.id!==t.id)})),t.id,n),i=s&&e.dogKennel?.item===t.id?{...o,dogKennel:null}:o;return Za(i,t.id,!0,n)}case"room/wallpaper":return ot(e,t.room,n=>({...n,wallpaper:t.color}));case"room/floor":return ot(e,t.room,n=>({...n,floor:t.color}));case"room/pattern":return ot(e,t.room,n=>({...n,pattern:t.pattern,wallTile:null}));case"room/wallTile":return ot(e,t.room,n=>({...n,wallTile:t.tile}));case"room/floorTile":return ot(e,t.room,n=>({...n,floorTile:t.tile}));case"char/add":return e.characters.length>=ci||e.characters.some(n=>n.id===t.char.id)?e:{...e,characters:[...e.characters,t.char]};case"char/update":return ja(e,t.id,n=>{const{look2:s,costume:o,...i}=t.patch,a={...n,...i};if("look2"in t.patch&&(s?a.look2=s:delete a.look2),"costume"in t.patch){const r=So(o);r?a.costume=r:delete a.costume}return a});case"char/move":{if(!e.rooms[t.room])return e;const n=e.characters.find(o=>o.id===t.id),s=ja(e,t.id,o=>{const i={...o,room:t.room,x:Zs(t.x,0,Rt),y:Zs(t.y,60,zn)};return Aw(i,e.rooms[t.room].items,t.seat,"seat"in t)});return Pw(s,n,t.room)}case"char/delete":{const n=e.characters.find(o=>o.id===t.id);if(!n)return e;let s={...e,characters:e.characters.filter(o=>o.id!==t.id)};if(["left","right"].forEach((o,i)=>{const a=n.held[o];a&&(s=ot(s,n.room,r=>({...r,items:[...r.items,{...a,x:n.x+(i?40:-40),y:n.y,z:bi(r)+1}]})))}),s.baby?.spot==="arms"&&s.baby.holder===t.id){const o=md(s.baby,null,s.baby.room,s.baby.x,s.baby.y);o&&o!==s.baby&&(s={...s,baby:o})}return s}case"char/hold":{const n=e.characters.find(r=>r.id===t.id),s=e.rooms[t.room]?.items.find(r=>r.id===t.itemId);if(!n||!s||n.held[t.hand]||n.room!==t.room)return e;const o=Ga(ot(e,t.room,r=>({...r,items:r.items.filter(l=>l.id!==t.itemId)})),t.itemId,s),i=ja(o,t.id,r=>({...r,held:{...r.held,[t.hand]:s}})),a=s.kind==="kennel"&&e.dogKennel?.item===t.itemId?{...i,dogKennel:null}:i;return Za(a,t.itemId,!0,s)}case"char/release":{const n=e.characters.find(i=>i.id===t.id),s=n?.held[t.hand];if(!n||!s)return e;const o=ja(e,t.id,i=>({...i,held:{...i.held,[t.hand]:null}}));return ot(o,n.room,i=>({...i,items:[...i.items,{...s,x:Zs(t.x,0,Rt),y:Zs(t.y,40,zn),z:bi(i)+1}]}))}case"cat/set":return{...e,cat:t.cat};case"cat/move":return e.cat&&e.rooms[t.room]?{...e,cat:{...e.cat,room:t.room,x:Zs(t.x,100,Rt-100)}}:e;case"dog/set":return{...e,dog:t.dog};case"dog/kennel":return t.item===null?e.dogKennel?{...e,dogKennel:null}:e:!Sw(e,t.item)||e.dogKennel?.item===t.item?e:{...e,dogKennel:{item:t.item}};case"ranch/op":{const n=t.op;if(n.op==="take"){const i=e.rooms[n.room];if(i&&i.items.some(a=>a.id===n.id))return e}const s=ud(Ef(e.garden),Lf(e.basket),t.op,t.now,e.lastEgg??0);if(typeof s=="string")return e;let o={...e,garden:s.plots,basket:s.basket,lastEgg:t.op.op==="egg"?t.now:e.lastEgg};if(t.op.op==="take"&&o.rooms[t.op.room]){const i=t.op;o=ot(o,i.room,a=>a.items.length>=80?a:{...a,items:[...a.items,{id:i.id,kind:Ib[i.kind],x:i.x,y:560,flip:!1,z:bi(a)+1,scale:1}]})}return o}case"settings/sound":return{...e,soundOn:t.on};case"game/reset":return O0(Fn());case"baby/meet":return e.baby?e:{...e,baby:mw(e.rooms,t.now)};case"baby/name":return!e.baby||!t.name||t.name===e.baby.name?e:{...e,baby:un({...e.baby,name:t.name})};case"baby/care":{if(!e.baby)return e;const n=yw(e.baby,t.care,t.now);return n===e.baby?e:{...e,baby:n}}case"baby/hold":{if(!e.baby)return e;const n=md(e.baby,t.holder,t.room,t.x,t.y);return!n||n===e.baby?e:{...e,baby:n}}case"baby/place":{if(!e.baby||!e.rooms[t.room])return e;const n=e.characters.filter(o=>o.room===t.room&&o.seat).map(o=>({item:o.seat.item,n:o.seat.n})),s=ww(e.baby,t,e.rooms[t.room].items,n);return s===e.baby?e:{...e,baby:s}}case"baby/ease":{if(!e.baby)return e;const n=bw(e.baby,t.now);return n?{...e,baby:n}:e}case"need/meet":return aw(e,t.id,t.need);case"need/drift":return rw(e,t.id,t.need)}}const wi=vt("cozy-house"),Iw=vt("cozy-house-v1"),J0=1122,eg=372,Of=1420,Df=372;function Hf(e){return!!e&&e.kind==="yard-bench"&&e.x===J0&&e.y===eg&&e.flip===!1&&(e.scale==null||e.scale===1)&&(e.size==null||e.size===1)}function tg(e,t){if(t===1)return e.yardBenchRefit===1?e:{...e,yardBenchRefit:1};const n=e.rooms?.backyard;let s=!1,o=n?.items;if(o){const a=o.map(r=>Hf(r)?(s=!0,{...r,x:Of,y:Df}):r);s&&(o=a)}if(!s&&e.yardBenchRefit===1)return e;const i=s&&n?{...e.rooms,backyard:{...n,items:o}}:e.rooms;return{...e,rooms:i,yardBenchRefit:1}}function ng(e){if(!e||typeof e!="object"||e.yardBenchRefit===1)return null;const t=e.rooms?.backyard;let n=e.rooms;if(t&&Array.isArray(t.items)){let s=!1;const o=t.items.map(i=>Hf(i)?(s=!0,{...i,x:Of,y:Df}):i);s&&(n={...e.rooms,backyard:{...t,items:o}})}return{...e,rooms:n,yardBenchRefit:1}}function Wf(e){if(!e||typeof e!="object"||!e.rooms)return Fn();let t=e;if(t.version===1){const f=p=>(Number(p)||0)+li,u={};for(const[p,m]of Object.entries(t.rooms))u[p]={...m,items:(m.items??[]).map(k=>({...k,x:f(k.x)}))};t={...t,version:2,rooms:u,character:{...t.character,x:f(t.character?.x)}}}if(t.version===2){const f=t.character??{};t={...t,version:3,characters:[Ss({...f,id:"c1",size:"kid",acc:0,held:{left:null,right:null}})]},delete t.character}if(t.version!==3)return Fn();const n=Fn(),s=(Array.isArray(t.characters)?t.characters:[]).slice(0,ci).map((f,u)=>{const p=f?.look2,m=Ss({...f,id:String(f.id??"c"+(u+1)),held:{left:f.held?.left??null,right:f.held?.right??null}});if(delete m.look2,p!=null){const w=Ea(p);w&&(m.look2=w)}if("costume"in m){const w=So(m.costume);w?m.costume=w:delete m.costume}delete m.needs;const k=Af(f?.needs);return k&&(m.needs=k),m}),o=X0({...n,...t,rooms:{...n.rooms,...t.rooms},characters:s}),i=ku(o),a=Bf(i),r=a===o.dogKennel?o:{...o,dogKennel:a},l=Ub(r.mailbox);let c=i===o?r:{...r,characters:i.characters};if(l)c={...c,mailbox:l};else if(c.mailbox){const{mailbox:f,...u}=c;c=u}const d=gw(c.baby,c.rooms);if(d)c={...c,baby:d};else if("baby"in c){const{baby:f,...u}=c;c=u}return tg(ku(Bw(c)),e?.yardBenchRefit)}function ku(e){let t=!1;const n=e.characters.map(s=>{const o=pd(Tf(s.seat),e.rooms[s.room]?.items);return o?s.seat?.item===o.item&&s.seat.pose===o.pose&&s.seat.n===o.n?s:{...s,seat:o}:s.seat?(t=!0,ha(s)):s});return!t&&n.every((s,o)=>s===e.characters[o])?e:{...e,characters:n}}function Bw(e){const t=e.currentRoom,n=Z0.includes(t),s=a=>fa.includes(a);let o=!1;const i=e.characters.map(a=>{const r=a.room;return!s(r)||!n&&r===t?(o=!0,{...a,room:"living"}):a});return n&&!o?e:{...e,currentRoom:n?e.currentRoom:"living",characters:i}}const Gs=vt("cozy-house-bak"),ki=vt("cozy-house-corrupt-"),Ow=20,Dw=2,Hw=5;function Ya(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.rooms&&(t.version===1||t.version===2||t.version===3)?Wf(t):null}catch{return null}}const vu=e=>!!e&&(e.name==="QuotaExceededError"||e.name==="NS_ERROR_DOM_QUOTA_REACHED"||e.code===22||e.code===1014);function sg(){let e,t=!1,n=null,s=!1,o=null;try{o=localStorage.getItem(wi)??localStorage.getItem(Iw)}catch{o=null}let i=!1,a=()=>{i=!0},r=!1;const l=()=>{if(!r)return!0;try{for(let x=0;x<localStorage.length;x++){const $=localStorage.key(x);if($&&$.startsWith(ki)&&localStorage.getItem($)===o)return r=!1,!0}localStorage.setItem(ki+Date.now(),o),r=!1;try{const x=[];for(let $=0;$<localStorage.length;$++){const I=localStorage.key($);I&&I.startsWith(ki)&&x.push(I)}x.sort(($,I)=>Number($.slice(ki.length))-Number(I.slice(ki.length))),x.slice(0,Math.max(0,x.length-Dw)).forEach($=>localStorage.removeItem($))}catch{}return!0}catch(x){return vu(x)&&a(),!1}},c=o!==null?Ya(o):null;if(o!==null&&c){e=c,s=!0;try{localStorage.getItem(Gs)!==o&&localStorage.setItem(Gs,o)}catch{}try{const x=ng(JSON.parse(o));x&&localStorage.setItem(wi,JSON.stringify(x))}catch{}}else if(o!==null){r=o.trim()!=="",l();let x=null;try{x=localStorage.getItem(Gs)}catch{}const $=x?Ya(x):null;if($){if(e=$,s=!0,n="restored",l())try{localStorage.setItem(wi,x)}catch{}}else e=Fn(),n="unreadable"}else if((()=>{try{return localStorage.getItem(Gs)}catch{return null}})()!==null&&Ya(localStorage.getItem(Gs))){const x=localStorage.getItem(Gs);e=Ya(x),s=!0,n="restored";try{localStorage.setItem(wi,x)}catch{}}else t=!0,e=Fn(),typeof navigator<"u"&&(e=navigator.webdriver?O0(e):kb(e));const d=[],f=[],u=x=>{n=x,f.forEach($=>$(x))};let p,m,k=!1,w=0,b=0;a=()=>{i||(i=!0,u("full"))};const g=()=>{if(clearTimeout(p),p=void 0,!!k){if(!l()){_();return}try{const x=JSON.stringify(e);if(localStorage.setItem(wi,x),k=!1,clearTimeout(m),m=void 0,b=0,s&&++w%Ow===0)try{localStorage.setItem(Gs,x)}catch{}}catch(x){vu(x)&&a(),_()}}},y=()=>{k&&g()};function _(){clearTimeout(m),m=void 0,!(++b>Hw)&&(m=window.setTimeout(()=>{m=void 0,g()},5e3))}const T=()=>{b=0,y()};return typeof window<"u"&&(document.addEventListener("visibilitychange",T),window.addEventListener("pagehide",y),window.addEventListener("beforeunload",y)),{get:()=>e,subscribe(x){d.push(x)},dispatch(x){e=qi(e,x),d.forEach($=>$(e,x)),k=!0,b=0,clearTimeout(p),p=window.setTimeout(g,250)},flush:y,trouble:()=>n,fullAtStart:i,onTrouble(x){f.push(x)},born:t}}const Ww=Object.freeze(Object.defineProperty({__proto__:null,CAT_COATS:Mw,DOG_BREEDS:Lw,ITEM_SIZE_STEPS:qn,MAX_CHARS:ci,ROOM_H:zn,ROOM_IDS:fa,ROOM_W:Rt,SCENE_ROOMS:Z0,TAB_ROOMS:xw,V1_OFFSET:li,V1_ROOM_W:G0,YARD_BENCH_REFIT_X:Of,YARD_BENCH_REFIT_Y:Df,YARD_BENCH_SEED_X:J0,YARD_BENCH_SEED_Y:eg,applyItemSize:Y0,applyYardBenchRefit:tg,createStore:sg,drawnScale:Fe,ensureRooms:X0,initialState:Fn,isSeedYardBench:Hf,itemSizeOf:Kn,migrate:Wf,newCharacter:Ss,patchSavedYardBenchRefit:ng,reduce:qi,standChar:ha,takeClearedFurniture:K0,validKennel:Bf},Symbol.toStringTag,{value:"Module"})),ms=256,ys=192,Vf=["#ffffff","#5a3d5c","#ff6b6b","#ff8fab","#ffa94d","#ffd43b","#69db7c","#2f9e44","#4dabf7","#1c5fb8","#b388d6","#7048b6","#c9905a","#7a4b2a","#ced4da","#212529"],yd=8e3,Fi=12,og=["wood","plum","gold","rainbow"],Vw=/^a[0-9a-z]{6,24}$/,Uw=/^P1[A-Za-z0-9+/]+={0,2}$/;function Uf(e){return typeof e!="string"||e.length<4||e.length>yd||!Uw.test(e)||(e.length-2)%4!==0?null:e}function ig(e){return typeof e=="string"&&Vw.test(e)?e:null}function zw(e){const t=[];let n=0;for(;n<e.length;){const s=e[n]&15;let o=1;for(;n+o<e.length&&(e[n+o]&15)===s&&o<2056;)o++;if(o<=8)t.push(o-1<<4|s);else{const i=o-9;t.push(128|i>>8<<4|s,i&255)}n+=o}return Uint8Array.from(t)}function Qw(e,t=ms*ys){const n=new Uint8Array(t);let s=0;for(let o=0;o<e.length&&s<t;o++){const i=e[o];let a;if(i<128)a=(i>>4)+1;else{if(o+1>=e.length)break;a=((i>>4&7)<<8|e[++o])+9}const r=Math.min(t,s+a);n.fill(i&15,s,r),s=r}return n}const Ii="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function Nw(e){let t="";for(let n=0;n<e.length;n+=3){const s=e[n],o=e[n+1],i=e[n+2];t+=Ii[s>>2]+Ii[(s&3)<<4|(o??0)>>4]+(o===void 0?"=":Ii[(o&15)<<2|(i??0)>>6])+(i===void 0?"=":Ii[i&63])}return t}function qw(e){const t=e.replace(/=+$/,""),n=[];let s=0,o=0;for(const i of t){const a=Ii.indexOf(i);if(a<0)break;s=s<<6|a,o+=6,o>=8&&(o-=8,n.push(s>>o&255))}return Uint8Array.from(n)}const Mc=e=>"P1"+Nw(zw(e));function ag(e){return!e||!Uf(e)?new Uint8Array(ms*ys):Qw(qw(e.slice(2)))}function bd(e,t){for(let n=e.length-1;n>0;n--){const s=Math.floor(t()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}const rg=4,_u=7,Fw=30;function jw(){const e=[];let t=0;for(let n=0;n<rg;n++){e.push({id:t++,c:n,v:0});for(let s=1;s<=9;s++)for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s});for(const s of["skip","rev","d2"])for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s})}for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"wild"});for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"w4"});return e}const wd=e=>e.discard[e.discard.length-1],vi=(e,t)=>t.c===4||t.c===e.color||t.v===wd(e).v&&wd(e).c!==4,ss=(e,t,n=1)=>{const s=e.hands.length;return((t+e.dir*n)%s+s)%s};function kd(e,t,n,s){const o=[];for(let i=0;i<n&&e.hands[t].length<Fw;i++){if(!e.deck.length){const r=e.discard.pop();if(e.deck=bd(e.discard.map(l=>l),s),e.discard=[r],!e.deck.length)break}const a=e.deck.pop();e.hands[t].push(a),o.push(a)}return e.hands[t].length>1&&(e.slay[t]=!1),o}function Zw(e,t){if(e.owe!==null&&e.hands[e.owe]?.length===1&&!e.slay[e.owe]){const n=e.owe;return e.owe=null,{victim:n,vdrew:kd(e,n,2,t).length}}return e.owe=null,{}}const $u=e=>{const t=[0,0,0,0];return e.forEach(n=>{n.c<4&&t[n.c]++}),t.indexOf(Math.max(...t))},Gw={id:"slay",name:"Slay",minPlayers:2,maxPlayers:6,setup(e,t){const n=bd(jw(),t),s=Array.from({length:e},()=>n.splice(-_u,_u));let o=n.length-1;for(;typeof n[o].v!="number";)o--;const i=n.splice(o,1)[0];return{deck:n,discard:[i],hands:s,color:i.c,turn:Math.floor(t()*e),dir:1,drawn:null,slay:s.map(()=>!1),owe:null,winner:null,ev:{n:0,p:-1,k:"start",card:i}}},cleanMove(e){return!e||typeof e!="object"?null:e.k==="play"&&Number.isInteger(e.id)&&e.id>=0&&e.id<108?{k:"play",id:e.id,...Number.isInteger(e.color)&&e.color>=0&&e.color<rg?{color:e.color}:{}}:e.k==="draw"||e.k==="pass"||e.k==="slay"?{k:e.k}:null},legal(e,t,n){if(e.winner!==null)return!1;if(n.k==="slay")return e.hands[t].length<=2&&!e.slay[t];if(t!==e.turn)return!1;if(n.k==="draw")return e.drawn===null;if(n.k==="pass")return e.drawn!==null;const s=e.hands[t].find(o=>o.id===n.id);return!s||e.drawn!==null&&s.id!==e.drawn||s.c===4&&n.color===void 0?!1:vi(e,s)},apply(e,t,n,s){const o=e.ev.n+1;if(n.k==="slay")return e.slay[t]=!0,e.owe===t&&(e.owe=null),e.ev={n:o,p:t,k:"slay"},e;const i=Zw(e,s);if(n.k==="draw"){const d=kd(e,t,1,s),f=d[0];if(f&&vi(e,f))e.drawn=f.id,e.ev={n:o,p:t,k:"draw",drew:1,...i};else{if(e.drawn=null,e.ev={n:o,p:t,k:"draw",drew:d.length,...i},e.stuck=d.length?0:(e.stuck??0)+1,(e.stuck??0)>=e.hands.length){const u=Math.min(...e.hands.map(p=>p.length));return e.winner=e.hands.findIndex(p=>p.length===u),e.turn=-1,e}e.turn=ss(e,t)}return e}if(n.k==="pass")return e.drawn=null,e.turn=ss(e,t),e.ev={n:o,p:t,k:"pass",...i},e;e.stuck=0;const a=e.hands[t],r=a.splice(a.findIndex(d=>d.id===n.id),1)[0];e.discard.push(r),e.drawn=null,e.color=r.c===4?n.color:r.c;const l={n:o,p:t,k:"play",card:r,color:e.color,...i};if(!a.length)return e.winner=t,e.turn=-1,e.ev=l,e;a.length===1&&!e.slay[t]&&(e.owe=t);const c=e.hands.length===2;if(r.v==="rev")e.dir=e.dir===1?-1:1,e.turn=c?t:ss(e,t);else if(r.v==="skip")l.skipped=ss(e,t),e.turn=ss(e,t,2);else if(r.v==="d2"||r.v==="w4"){const d=ss(e,t);l.skipped=d;const f=r.v==="d2"?2:4;l.drew=kd(e,d,f,s).length,e.turn=ss(e,t,2)}else e.turn=ss(e,t);return e.ev=l,e},turn:e=>e.winner!==null?-1:e.turn,winner:e=>e.winner,view(e,t){return{top:wd(e),color:e.color,turn:e.winner!==null?-1:e.turn,dir:e.dir,deck:e.deck.length,counts:e.hands.map(n=>n.length),slay:e.slay,winner:e.winner,ev:e.ev,...t!==null&&e.hands[t]?{hand:e.hands[t],drawn:t===e.turn?e.drawn:null}:{}}},autoMove(e,t){if(t!==e.turn)return null;if(e.drawn!==null){const s=e.hands[t].find(o=>o.id===e.drawn);return s&&vi(e,s)?{k:"play",id:s.id,...s.c===4?{color:$u(e.hands[t])}:{}}:{k:"pass"}}const n=e.hands[t].find(s=>vi(e,s)&&s.c!==4)??e.hands[t].find(s=>vi(e,s));return n?{k:"play",id:n.id,...n.c===4?{color:$u(e.hands[t])}:{}}:{k:"draw"}},removePlayer(e,t,n){if(e.hands.length<=2)return null;const s=e.turn===t;return e.deck.unshift(...e.hands[t]),bd(e.deck,n),e.hands.splice(t,1),e.slay.splice(t,1),e.owe===t?e.owe=null:e.owe!==null&&e.owe>t&&e.owe--,e.turn>t&&e.turn--,s&&(e.drawn=null,e.dir===-1?e.turn=((t-1)%e.hands.length+e.hands.length)%e.hands.length:e.turn=t%e.hands.length),e.ev={n:e.ev.n+1,p:t,k:"left"},e}},vd=7,$r=6,Yw=(e,t,n)=>{const s=e[t][n];for(const[o,i]of[[1,0],[0,1],[1,1],[1,-1]]){const a=[[t,n]];for(const r of[1,-1])for(let l=1;l<4;l++){const c=t+o*l*r,d=n+i*l*r;if(c<0||c>=vd||d<0||d>=$r||e[c][d]!==s)break;a.push([c,d])}if(a.length>=4)return a}return null},Kw={id:"four",name:"Four in a Row",minPlayers:2,maxPlayers:2,setup:(e,t)=>({b:Array.from({length:vd},()=>[]),turn:t()<.5?0:1,winner:null,draw:!1,line:null,last:null,n:0}),cleanMove:e=>e&&Number.isInteger(e.col)&&e.col>=0&&e.col<vd?{col:e.col}:null,legal:(e,t,n)=>e.winner===null&&!e.draw&&t===e.turn&&e.b[n.col].length<$r,apply(e,t,n){e.b[n.col].push(t);const s=e.b[n.col].length-1;e.last={col:n.col,row:s,p:t},e.n++;const o=Yw(e.b,n.col,s);return o?(e.winner=t,e.line=o,e.turn=-1):e.b.every(i=>i.length>=$r)?(e.draw=!0,e.turn=-1):e.turn=1-t,e},turn:e=>e.turn,winner:e=>e.winner,view:e=>e,autoMove:(e,t)=>{if(t!==e.turn)return null;const s=[3,2,4,1,5,0,6].find(o=>e.b[o].length<$r);return s===void 0?null:{col:s}},removePlayer:()=>null},lg={slay:Gw,four:Kw},Ta=2600,yo=[{game:"slay",seats:6,x:720},{game:"four",seats:2,x:1500},{game:"slay",seats:4,x:2150}],Xw=2e4,Jw="winter",ek="Winter Cheer",tk={[Jw]:ek},nk=["pack:wc-holiday-tree","pack:wc-gingerbread","pack:wc-gingerbread-village","pack:wc-bauble-garland","pack:wc-stocking-row","pack:wc-cane-lamp","pack:wc-star-topper","pack:wc-poinsettia","pack:wc-holly","pack:wc-nutcracker","pack:wc-reindeer","pack:wc-sleigh-planter"],sk=["Berry Wreath","Birch Log Basket","Cabin Picture","Cabin Planks","Candy Cane Lamp","Candy Stripe","Cinnamon Roll Tray","Cocoa Cart","Cocoa Pot","Cookie Oven","Cookie Plate","Cozy Red Plaid","Cozy Sock Hamper","Decorated Holiday Tree","Frosted Pine","Frosty Bookcase","Frosty Dots","Fur-Trim Bench","Gingerbread Cottage","Gingerbread Village","Holly Sprig","Ice Skates","Ice-Blue Wardrobe","Knit Pom Rug","Knit Stocking Row","Knit-Blanket Armchair","LED Candle Trio","Lantern","Log Bench","Marshmallow Jar","Mint Pine Sprigs","Mitten Ottoman","Mittens on a Line","Mug Tree Shelf","Mug of Cocoa","Nutcracker Friend","Penguin Plush","Penguin Plush Chair","Peppermint Counter","Peppermint Swirl Rug","Peppermint Tiles","Pinecone Garland","Pinecone Side Table","Plaid Cabin Sofa","Poinsettia Pot","Polar Bear Plush","Red Plaid Quilt Bed","Reindeer Plush","Ribbon Bauble Garland","Sled Coffee Table","Sleigh Planter","Snow Globe","Snow Knit Carpet","Snow-Globe Lamp","Snowflake Mobile","Snowflake Nightstand","Snowflake Sky","Snowman Buddy","Snowshoes","Snowy Window Art","Snowy Window Seat","Star Tree Topper","Stone Hearth Fireplace","Twinkle Light String","Twinkle-Light Floor Lamp","Winter Cheer","Woodstove","Wrapped Present Stack"],cg="halloween",ok="Spooky Cute",ik={[cg]:ok},ak=!1;function rk(e=new Date){const t=e.getMonth(),n=e.getDate();return t===9&&n>=24||t===10&&n<=2}function dg(e=new Date,t=ak){return t||rk(e)}const lk=["pack:hw-cauldron","pack:hw-cat-statue","pack:hw-witch-hat"],ck=["Autumn Leaf Garland","Black Cat Statue","Bubbly Cauldron","Friendly Sheet Ghost","Harvest Hay Bale","Heart and Moon Pumpkin","Moon and Stars Window Cling","Moonbeam Lantern","Spooky Cute","Starry Glow Pumpkin","Starry Witch Hat","Treat Bowl"],dk=["A-Frame Swing","Acorn Friend","Alarm Clock","Apple","Apple Tree","Arc Floor Lamp","Arc Lamp","Arched Mirror","Arched Shelf","Armchair","Autumn Wreath","Baby Blocks","Baby Bottle","Bakery Shelf","Ball","Balloons","Bananas","Bar Stool","Bassinet","Bath Mat","Bath Mirror","Bath Stool","Bathtub","Beach Ball","Bean Bag","Bed","Berry Basket","Big Leaf Plant","Big Monitor","Big Wardrobe","Birdbath","Birdhouse","Birdie","Blanket Basket","Blocks","Boba Buddy","Book Stack","Books","Bookshelf","Box Stack","Bread","Brush & Comb","Bubble Aquarium","Bubble Bath","Bubble Chair","Bubble-Gum Rug","Bubbly Fountain","Bubbly Plant","Bud Vase","Bulletin Board","Bunk Bed","Bunny","Bunny Plush","Bunny Slippers","Butterfly Bush","Cactus","Cactus Buddy","Cada's Mouse","Cake","Candle Jar","Canopy Bed","Canopy Daybed","Cat Bed","Cat Tower","Caterpillar Plush","Chair","Changing Table","Checker Rug","Checkered Bed","Chick","Chloe's Star Lamp","Clock","Clothes Rail","Clothesline","Cloud Beanbag","Cloud Lamp","Cloud Rug","Cloud Shelf","Cocoa Doll","Cocoa Mug","Coffee Table","Comfy Chair","Cookie Jar","Cooking Pot","Cottage Heart Pouf","Cottage Heart Rug","Counter","Cozy Fireplace","Cozy Lights","Cozy Mug","Cozy Nightstand","Cozy Reading Nook","Cozy Snake Plant","Cozy Teapot","Cream Jars","Cream Sofa","Crib","Crib Mobile","Cubby Shelf","Cube Shelf","Cupcake","Cupcake Stand","Curtains","Curvy Yellow Desk","Cute Keyboard","Cute Speaker","Daisy Pot","Daisy Rug","Desk","Desk Lamp","Desk Mic","Dino Plushie","Dish Cabinet","Dish Rack","Dog Kennel","Doll House","Donut","Dresser","Droplet Buddy","Egg Pan","Fairy-Light Garland","Fairy-Light Shelf","Fan","Fancy Sofa","Fiddle-Leaf Fig","Fig Tree","Fire Pit","Fireplace","Fish Bowl","Fish Tank","Floor Cushion","Flower Cart","Flower Floor Lamp","Flower Kettle","Flower Lamp","Flowers","Foot Spa","Fresh Egg","Fridge","Frog Plush","Fruit Bowl","Game Controller","Gaming Chair","Garden Bench","Garden Carrot","Garden Gnome","Glass Cabinet","Globe","Globe Pendants","Glossy Hair Dryer","Glow Mirror","Gold Floor Mirror","Guinea Pig","Hair Dryer","Hair-Dryer Chair","Hair-Wash Chair","Hammock","Hamster House","Hamster Pal","Hanging Lamp","Hanging Lantern","Hanging Plant","Hanging Vine Planter","Happy Fridge","Headphones","Heart Headboard Bed","Heart Pouf","Heart Rug","Heart Wall Clock","Heart Wall Light","Heart-Leaf Plant","Hedge Row","Herb Box","High Chair","Honey Doll","Ice Cream","Jewelry Box","Juice","Kettle","Kitchen Counter","Knit Cushion","Ladder Shelf","Lamp","Landscape Art","Lattice Bench","Laundry Hamper","Lava Lamp","Lemon Tree","Lemonade Cart","Lemonade Cup","Lighted Vanity","Lilac Curtain","Lily Pond","Little Rocking Horse","Little Slide","Little Sprout","Lotion Bottles","Macaron Jar","Macrame Swing Chair","Mani-Pedi Chair","Manicure Table","Microwave","Milk","Milk & Cookies","Mini Fridge","Mini Greenhouse","Mini Tree","Mint Fridge","Mint Pebble Rug","Mirror","Mixer","Moon and Stars","Moon Night-Light","Moving Box","Mushroom Stool","Music Box","Nail Dryer","Nail Polish","Nail Polish Rack","Night Light","Nightstand","Nursery Cloud Rug","Nursery Dresser","Nursery Lamp","Pancakes","Pantry","Paper Lantern","Pastel Range","Pastel Wardrobe","Patio Lights","Patio Umbrella","Pendant Lamp","Perfume","Perfume Bottle","Perfume Tray","Pet Bowl","Petal Coffee Table","Phone on a Stand","Piano","Picket Gate","Picnic Basket","Picnic Blanket","Picnic Table","Picture","Piggy Bank","Pillow","Pin Board","Pink Vanity","Pinwheel","Pizza","Plant","Plant Stand","Plant Wall","Play Mat","Play Tent","Polish Bottle","Popcorn","Pothos Plant","Pouf","Puffy Cloud Sofa","Puffy Stool","Puppy","Quinn's Cookie Pup","Radio","Rain Barrel","Rainbow Art","Rainbow Rug","Ranch Flowers","Rattle","Reagan's Frame","Reception Desk","Record Player","Ribbon Mirror","Ribbon Tray","Rice Cooker","Ring Light","Robot","Rocker","Rocking Chair","Rocking Horse","Rose Doll","Round Breakfast Table","Round Side Table","Round Woven Rug","Rubber Ducky","Rug","Runner Rug","Salon Chair","Sandbox","Scallop Curtains","Scalloped Loveseat","Seesaw","Shelf","Shower Curtain","Sink","Sink Vanity","Sloane's Rainbow Snail","Snake Plant","Soaking Tub","Soap Dish","Sofa","Sparkle Wall Light","Spice Rack","Splash Pool","Spray Bottle","Sprinkler","Stacking Rings","Star Dresser","Star Lamp","Star Mobile","Stars","Stepping Stones","Sticker Board","Story Pillow","Stove","String Lights","Striped Runner","Succulents","Sun Lounger","Sunny Art","Sunny Bean Bag","Sunny Cloud Rug","Sunny Shelf","Swing Chair","Swivel Stool","Table","Tassel Rug","Teapot","Teapot Set","Teddy","Tiered Tray","Toadstool Light","Toaster","Toilet","Towel Bar","Towel Cart","Towel Stack","Toy Bin","Toy Car","Toy cat","Toy Chest","Toy Train","Trailing Plant Shelf","Tulip Bed","Tulip Vase","Turtle","TV","TV Stand","Unicorn Plushie","Utensil Rail","Vanity","Vanity Stool","Vegetable Patch","Vlog Camera","Wagon","Waiting Bench","Wall Shelf","Wardrobe","Water-Drop Lamp","Watermelon","Wavy Floor Lamp","Window","Window Seat","Wood Armchair","Wood Bookshelf","Wood Coffee Table","Wood Desk","Wood Dresser","Wood Stool","Wood Wall Clock","Wooden Bed","Yard Sign",...sk,...ck],fk=4,zf=16,qr=e=>String(e??"").toUpperCase().replace(/[^A-Z0-9]/g,""),hk=e=>e.length>=fk&&e.length<=zf&&/^[A-Z0-9]+$/.test(e),uk=12,pk=["Cada","Chloe","Quinn","Reagan","Sloane"],gk=460,mk=320,xu=["Sunny Bunny","Bubbly Panda","Sparkle Kitty","Happy Hippo","Cozy Koala","Jolly Jelly","Zippy Fox","Dreamy Deer","Giggly Goose","Peachy Pup","Minty Mouse","Rainbow Duck","Cuddly Cub","Starry Owl","Bouncy Frog","Lucky Lamb","Snuggly Seal","Twinkle Tiger","Berry Bear","Cloudy Llama","Pebble Penguin","Honey Hedgehog","Marshmallow Moose","Cupcake Cat"],ji=["Hi!","Come over!","I love your house!","Let's play!","Follow me!","Look at this!","Want a snack?","Nice!","Yes!","No thanks","Hehe","Be right back","Bye!","Let's decorate!","Wanna race?","So cute!"],fg=["👋","😀","😂","😍","😮","😢","🎉","⭐","❤️","👍","🍕","🐱","🌈","🎶","💤","✨"],Qf=60,yk={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t","@":"a",$:"s","!":"i","+":"t"},Lc=["fuck","fuk","fck","shit","sht","bitch","btch","bastard","asshole","ass","dick","cock","pussy","cunt","whore","slut","damn","crap","piss","fag","faggot","retard","nigger","nigga","porn","sex","sexy","nude","naked","boob","boobs","penis","vagina","kill","suicide","stupid","idiot","dumb","hate","loser","shutup","wtf","stfu","gtfo","bs"],bk=["zero","oh","one","two","three","four","five","six","seven","eight","nine","ten"],wk=[/\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i,/\bi\s*live\s+(at|on|in)\b/i,/\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,/\b(password|passcode|zip\s*code|postcode)\b/i,/\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i],kk=/(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i,vk=/\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i,_k=/@\w/,$k=/\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;function xk(e,t=Qf){if(typeof e!="string")return{ok:!1,reason:"empty"};const n=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(!n)return{ok:!1,reason:"empty"};if(n.length>t)return{ok:!1,reason:"long"};if(kk.test(n))return{ok:!1,reason:"link"};if(vk.test(n)||_k.test(n))return{ok:!1,reason:"contact"};if((n.match(/\d/g)??[]).length>=5||/\d[\d\s().\-]{4,}\d/.test(n)||$k.test(n))return{ok:!1,reason:"contact"};const o=n.toLowerCase().split(/[^a-z]+/).filter(Boolean);let i=0;for(const c of o)if(i=bk.includes(c)?i+1:0,i>=4)return{ok:!1,reason:"contact"};if(wk.some(c=>c.test(n)))return{ok:!1,reason:"personal"};const a=n.toLowerCase().replace(/[0-9@$!+]/g,c=>yk[c]??c),r=a.split(/[^a-z]+/).filter(Boolean),l=a.replace(/[^a-z]/g,"").replace(/(.)\1{2,}/g,"$1$1");return r.some(c=>Lc.includes(c)||Lc.includes(c.replace(/(.)\1+/g,"$1")))||Lc.filter(c=>c.length>=5).some(c=>l.includes(c))?{ok:!1,reason:"words"}:{ok:!0,text:n}}const Mk={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t",8:"b","@":"a",$:"s","!":"i","+":"t",v:"u","|":"k","<":"k","#":"h"};function Lk(e){return/^f+u+c+k+$/.test(e)||/^f+u+k+$/.test(e)||/^f+c+k+$/.test(e)||/^s+h+i+t+$/.test(e)||/^s+h+t+$/.test(e)||/^b+i+t+c+h+$/.test(e)||/^b+t+c+h+$/.test(e)||/^a+s+h+o+l+e+$/.test(e)||/^d+u+m+b+a+s+$/.test(e)||/^n+i+g{2,}e+r+$/.test(e)||/^n+i+g{2,}a+$/.test(e)||/^f+a+g+$/.test(e)||/^f+a+g+o+t+$/.test(e)||/^r+e+t+a+r+d+$/.test(e)||/^k+y+s+$/.test(e)}function Ek(e){return/^c+u+n+t+$/.test(e)||/^a+h+o+l+e+$/.test(e)||/^k+i+k+e+$/.test(e)||/^c+h+i+n+k+$/.test(e)||/^s+p+i+c+$/.test(e)||/^c+o{2,}n+$/.test(e)||/^w+e+t+b+a+c+k+$/.test(e)||/^t+r+a+n+y+$/.test(e)||/^t+r+a+n+i+$/.test(e)||/^d+y+k+e+$/.test(e)||/^b+e+a+n+e+r+$/.test(e)||/^g+o{2,}k+$/.test(e)||/^r+a+g+h+e+a+d+$/.test(e)||/^t+o+w+e+l+h+e+a+d+$/.test(e)||/^h+e+i+l+h+i+t+l+e+r+$/.test(e)}const Sk=new Set(["spicy","spices","spicing","spicey","spicier","spiciest","cocky","chinking","spicer","gooky","slutty","twatt"]);function Tk(e,t){if(!/^[a-z]+$/.test(e)||t&&Sk.has(e))return!1;const n=[e],s=["ing","in","ers","er","ed","es","y","s"];for(let o=0;o<s.length;o++){const i=s[o];e.endsWith(i)&&e.length>i.length+2&&n.push(e.slice(0,-i.length))}for(let o=0;o<n.length;o++)if(Lk(n[o])||t&&Ek(n[o]))return!0;return!1}function Pk(e){if(!e.includes("*"))return[e];const t=e.split("*").length-1,n=e.replace(/\*/g,""),s=n?[n]:[];if(t<1||t>3)return s;const o=e.split(""),i=[];for(let r=0;r<o.length;r++)o[r]==="*"&&i.push(r);const a=r=>{if(r===i.length){s.push(o.join(""));return}for(let l=97;l<=122;l++)o[i[r]]=String.fromCharCode(l),a(r+1)};return a(0),s}const Mu=["mother","sonofa","horse","bull","dip"],Lu=["face","head","you"];function qo(e,t){const n=e.replace(/ph(?=u+c+k)/g,"f").replace(/ph(?=u+k)/g,"f");if(Tk(n,t)||/^w+t+f+$/.test(n)||/^s+t+f+u+$/.test(n))return!0;for(let s=0;s<Mu.length;s++){const o=Mu[s];if(n.startsWith(o)&&n.length>o.length+2&&qo(n.slice(o.length),t))return!0}for(let s=0;s<Lu.length;s++){const o=Ak(n,Lu[s]);if(o&&qo(o,t))return!0}return!!(n.length>4&&n.endsWith("s")&&!n.endsWith("ss")&&qo(n.slice(0,-1),t))}function Ak(e,t){let n=e.length;for(let s=t.length-1;s>=0;s--){const o=t[s];if(n===0||e[n-1]!==o)return null;for(;n>0&&e[n-1]===o;)n--}return n<=2?null:e.slice(0,n)}function Fr(e){let t="";for(let n=0;n<e.length;n++)t+=Mk[e[n]]??e[n];return t}const Rk={ѕ:"s",һ:"h",с:"c",а:"a",е:"e",о:"o",р:"p",і:"i",х:"x",у:"y",к:"k"};function Ck(e){const n=e.replace(/[\u00ad\u0336\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").normalize("NFKC").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase();let s="";for(let o=0;o<n.length;o++)s+=Rk[n[o]]??n[o];return s}const Ik=new Set(["it","its","it's","is","as","a","i","uh","oh","so","he","she","hi","um","umm","hmm","hm","ah","eh","er","ow","ha","hey","yo","ok","yeah","yes","no","nah","wow","ho","ooh","ahh","uhh","ohh"]);function ua(e){return e>="a"&&e<="z"||e>="0"&&e<="9"||"@$!+*v|#<".includes(e)}function Eu(e,t){let n=t;for(;n<e.length&&e[n]==="!";)n++;if(n>=e.length||!ua(e[n])||e[n]==="!")return null;const s=e[n];let o=n+1;for(;o<e.length&&e[o]==="!";)o++;return o<e.length&&ua(e[o])?null:{ch:s,end:o}}function Bk(e,t){const n=e.length,s=" .-_~";let o=0;for(;o<n;){if(o>0&&ua(e[o-1])){o++;continue}const i=Eu(e,o);if(!i){o++;continue}const a=[i.ch];let r=i.end;for(;r<n&&s.includes(e[r]);){const l=Eu(e,r+1);if(!l)break;a.push(l.ch),r=l.end}if(a.length>=2){const l=Fr(a.join("")).replace(/\*/g,"");if(qo(l,t))return!0}o=Math.max(o+1,r)}return!1}function bo(e){return e.replace(/^!+/,"").replace(/!+$/,"")}function jr(e){return Fr(bo(e)).replace(/\*/g,"")}function hg(e){return/[0-9@$!+*|#<]/.test(bo(e))}function Ok(e){return bo(e).length===1}function Dk(e){const t=bo(e);return t.length<2||hg(e)?!1:/^sh+$/.test(t)||Ik.has(t)}function Hk(e){let t="space";for(let n=0;n<e.length;n++){const s=e[n];if(!(s===" "||s==="	"||s===`
`||s==="\r")){if(s==="-"){t="hyphen";continue}return"punct"}}return t}function Wk(e){const t=[];let n=0,s="";for(;n<e.length;){if(!ua(e[n])){s+=e[n],n++;continue}let o=n+1;for(;o<e.length&&ua(e[o]);)o++;t.push({text:e.slice(n,o),gap:t.length===0?"start":Hk(s)}),s="",n=o}return t}function Vk(e){const t=[Fr(e)];if(e.charAt(0)==="!"||e.charAt(e.length-1)==="!"){const n=e.replace(/^!+/,"").replace(/!+$/,"");n&&n!==e&&t.push(Fr(n))}return t}function Uk(e){for(let t=0;t<e.length;t++){if(!/^k+i+l+$/.test(e[t]))continue;const n=e[t+1]||"",s=e[t+2]||"";if(/^y+o+u+r+s+e+l+f+$/.test(n)||/^u+r+s+e+l+f+$/.test(n)||/^u+r+$/.test(n)&&/^s+e+l+f+$/.test(s))return!0}return!1}function zk(e,t,n){if(bo(e[n].text)!=="coon")return!1;const s=n>0?t[n-1]:"",o=t[n+1]||"";return s==="maine"||o==="cat"}function Qk(e,t,n){return n===t+1&&e[n].gap==="space"&&/^a+$/.test(jr(e[t].text))&&/^h+o+l+e+$/.test(jr(e[n].text))}function Nk(e,t,n){return bo(e[n].text)!=="dyke"?!1:n>0&&bo(e[n-1].text)==="van"}function qk(e){for(let t=0;t<e.length-1;t++)if(/^h+e+i+l+$/.test(e[t])&&/^h+i+t+l+e+r+$/.test(e[t+1]))return!0;return!1}function Fk(e,t=!0){const n=Ck(e);if(Bk(n,t))return!0;const s=Wk(n),o=s.map(a=>Vk(a.text)),i=s.map(a=>jr(a.text));if(Uk(i)||t&&qk(i))return!0;for(let a=0;a<o.length;a++)if(!(t&&(zk(s,i,a)||Nk(s,i,a))))for(let r=0;r<o[a].length;r++){const l=Pk(o[a][r]);for(let c=0;c<l.length;c++)if(qo(l[c].replace(/\*/g,""),t))return!0}for(let a=0;a<s.length;a++){let r="",l=0,c=!1,d=!1;for(let f=a;f<s.length&&f<a+8;f++){if(f>a){const u=s[f].gap,p=s[f-1].text;if(u==="punct"||u==="start"||p.endsWith("!")||s[f].text.startsWith("!")||u!=="space"&&u!=="hyphen")break}if(r+=jr(s[f].text),Ok(s[f].text)&&l++,Dk(s[f].text)&&(c=!0),hg(s[f].text)&&(d=!0),f!==a&&!(c&&l<2&&!d)&&qo(r,t)){if(t&&Qk(s,a,f))break;return!0}}}return!1}function ug(e,t,n,s=!1){if(typeof e!="string")return{ok:!1,reason:"empty"};const o=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return o?o.length>t?{ok:!1,reason:"long"}:Fk(o,!s)?{ok:!1,reason:n}:{ok:!0,text:o}:{ok:!1,reason:"empty"}}function jk(e,t=Qf){return ug(e,t,"words")}const Wl={long:"That is a bit long!",link:"No links, please!",contact:"Keep numbers and contact info secret!",personal:"Keep personal info secret!",words:"Let's use kind words!",mail:"Oops, try different words!",empty:""},pg={};for(const e of["АA","аa","ВB","вb","ЕE","еe","КK","кk","МM","мm","НH","нh","ОO","оo","РP","рp","СC","сc","ТT","тt","УY","уy","ХX","хx","ІI","іi","ЈJ","јj","ЅS","ѕs","ЁE","ёe","ЇI","їi","ΑA","ΕE","ΖZ","ΗH","ΙI","ΚK","ΜM","ΝN","ΟO","ΡP","ΤT","ΥY","ΧX","αa","εe","ζz","ιi","κk","νv","οo","ρp","τt","υu","χx"])pg[e[0]]=e[1];function Zk(e){let t="";for(const n of e)t+=pg[n]??n;return t}function Gk(e){return Zk(String(e).normalize("NFKC")).replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\p{M}]/gu,"").replace(/[\p{Extended_Pictographic}\p{S}\p{P}]+/gu,"").replace(/\s+/g," ").trim()}function Yk(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(()=>{const e=[...new Set(dk.map(t=>Gk(t)).filter(t=>t.length>=2))].sort((t,n)=>n.length-t.length);return new RegExp(`(^|[^A-Za-z])(?:${e.map(Yk).join("|")})(?![A-Za-z])`,"gi")})();const Su=(e,t,n)=>typeof e=="number"&&Number.isFinite(e)?Math.max(t,Math.min(n,e)):null,Kk=(e,t,n=80)=>typeof e=="string"&&e.length<=n&&t.test(e)?e:null,Xk=/^#[0-9a-fA-F]{3,8}$/,Jk=["little","kid","adult"];function ev(e){if(!e||typeof e!="object")return null;const t={};for(const n of["skin","hair","shirt","pants"])if(n in e){const s=Kk(e[n],Xk,9);if(!s)return null;t[n]=s}if("hairStyle"in e){const n=Su(e.hairStyle,0,3);if(n===null)return null;t.hairStyle=Math.round(n)}if("acc"in e){const n=Su(e.acc,0,3);if(n===null)return null;t.acc=Math.round(n)}if("size"in e){if(!Jk.includes(e.size))return null;t.size=e.size}if("flip"in e){if(typeof e.flip!="boolean")return null;t.flip=e.flip}return"look2"in e&&(t.look2=Ea(e.look2)??null),"costume"in e&&(t.costume=So(e.costume)),Object.keys(t).length?t:null}function Pa(e){const t=Ss({id:"x"}),n=ev({skin:e?.skin,hair:e?.hair,hairStyle:e?.hairStyle,shirt:e?.shirt,pants:e?.pants,size:e?.size,acc:e?.acc})??{},s=i=>n[i]??t[i],o={skin:s("skin"),hair:s("hair"),hairStyle:s("hairStyle"),shirt:s("shirt"),pants:s("pants"),size:s("size"),acc:s("acc")};if(e&&typeof e=="object"&&"look2"in e){const i=Ea(e.look2);i&&(o.look2=i)}if(e&&typeof e=="object"&&"costume"in e){const i=So(e.costume);o.costume=i??""}return o}const Tu=4,tv=["Mittens","Luna","Biscuit","Pumpkin","Whiskers","Mochi","Pepper","Noodle","Ginger","Socks"],nv=["Buddy","Coco","Max","Daisy","Peanut","Rocket","Bella","Waffles","Scout","Honey"];function gg(e){const t=String(e??"").normalize("NFC").replace(/\s+/g," ").trim();return!/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u.test(t)||(t.match(/\d/g)??[]).length>2?null:xk(t).ok?t:null}function sv(e,t=[]){return ug(e,ds,"mail")}function mg(e){return typeof e.freeMail=="boolean"?e.freeMail:e.freeChat}const Nf=2900,_d=[{kind:"swing",x:430,y:500},{kind:"swing",x:570,y:500},{kind:"blanket",x:1730,y:548},{kind:"blanket",x:1850,y:548},{kind:"bench",x:2025,y:512},{kind:"bench",x:2105,y:512},{kind:"bench",x:2225,y:512},{kind:"bench",x:2305,y:512}],ke={top:{x:905,y:330},bottom:{x:1110,y:545},ladder:850},yt={x0:2440,x1:2840,y0:470,y1:585},ov=(e,t)=>e.where===t.where&&(e.where!=="house"||e.houseId===t.houseId&&e.room===t.room),iv=(e,t)=>ov(e,t)&&Math.abs(e.x-t.x)<=gk&&Math.abs(e.y-t.y)<=mk;function Ka(e){try{return Wf(e)}catch{return e}}const $d=vt("cozy-hood"),Ko=()=>{try{return JSON.parse(localStorage.getItem($d)??"null")}catch{return null}},Qn=e=>{try{e?localStorage.setItem($d,JSON.stringify(e)):localStorage.removeItem($d)}catch{}};function Vl(){const e=new URLSearchParams(location.search).get("hood");return e?e.replace(/\/$/,""):"https://cozy-hood.andrewmunruh.workers.dev".replace(/\/$/,"")}async function av(e){const t=await fetch(e+"/api/create",{method:"POST"});if(!t.ok)throw new Error("create failed "+t.status);return t.json()}async function rv(e,t){const n=await fetch(`${e}/api/hood/${encodeURIComponent(t)}`);if(n.status===429)return{slow:!0};if(!n.ok)throw new Error("lookup failed");return n.json()}const _i=e=>e===void 0?"u":JSON.stringify(e,(t,n)=>n&&typeof n=="object"&&!Array.isArray(n)?Object.fromEntries(Object.keys(n).sort().map(s=>[s,n[s]])):n);function Pu(e,t){if(t.type.startsWith("item/")&&t.type!=="item/add"&&"id"in t&&"room"in t)return _i(e.rooms[t.room]?.items.find(n=>n.id===t.id)??null);if(t.type.startsWith("room/")&&t.type!=="room/switch"&&"room"in t){const n=e.rooms[t.room];return _i(n?[n.wallpaper,n.floor,n.pattern,n.wallTile??null,n.floorTile??null]:null)}if(t.type==="cat/move"||t.type==="cat/set")return _i(e.cat??null);if(t.type==="dog/set")return _i(e.dog??null);if((t.type==="char/update"||t.type==="char/move"||t.type==="char/delete"||t.type==="char/hold"||t.type==="char/release")&&"id"in t)return _i(e.characters.find(n=>n.id===t.id)??null)}const lv=new Set(["dog/kennel","baby/meet","baby/name"]),cv=1e4,dv=1e4,fv=5e3,hv=3e3,Au=e=>e.type==="item/move"?"im:"+e.id:e.type==="char/move"?"cm:"+e.id:e.type==="item/size"?"is:"+("id"in e?e.id:""):null;class Ul{constructor(t){this.cfg=t,this.ws=null,this.pid="",this.settings={freeChat:!0},this.players=new Map,this.houses=new Map,this.presence=new Map,this.status="offline",this.speaksSit=!1,this.speaksBaby=!1,this.speaksAmb=!1,this.speaksArt=!1,this.speaksNeeds=!1,this.replaced=!1,this.ranch={plots:[],skew:0},this.tables=new Map,this.handlers=new Map,this.cid=1,this.flushT=0,this.presT=0,this.lastPres=null,this.presDirty=!1,this.closedByUs=!1,this.retry=0,this.retryT=0,this.epoch=0,this.stableT=0,this.outbox=[],this.saidAt=new WeakMap,this.speaksHb=!1,this.lastRx=0,this.hbT=0,this.hbWaitT=0,this.hbMissed=0,this.hiddenAt=0,this.wakeOn=!1,this.resent={again:0,dropped:0},this.wake=n=>{if(n.type==="visibilitychange"&&document.visibilityState==="hidden"){this.hiddenAt=Date.now();return}if(this.closedByUs||this.replaced||!this.cfg.token)return;const s=this.hiddenAt?Date.now()-this.hiddenAt:0;if(this.hiddenAt=0,this.status==="offline"){this.retry=0,this.connect();return}if(this.status==="online"){if(this.speaksHb){this.hbWaitT&&(clearTimeout(this.hbWaitT),this.hbWaitT=0),this.probe(hv);return}(n.type==="online"||n.type==="pageshow"&&n.persisted||s>3e3)&&this.dropDead()}}}on(t,n){(this.handlers.get(t)??this.handlers.set(t,[]).get(t)).push(n)}emit(t,...n){this.handlers.get(t)?.forEach(s=>s(...n))}send(t){return this.ws?.readyState!==WebSocket.OPEN?!1:(this.ws.send(JSON.stringify(t)),!0)}reliable(t){this.send(t)||(t.t==="lock"?this.outbox=this.outbox.filter(n=>!(n.t==="lock"&&n.houseId===t.houseId)):(t.t==="look"||t.t==="dog")&&(this.outbox=this.outbox.filter(n=>n.t!==t.t)),(t.t==="say"||t.t==="fx")&&this.saidAt.set(t,Date.now()),this.outbox.push(t),this.outbox.length>8&&this.outbox.splice(0,this.outbox.length-8))}flushOutbox(){if(this.ws?.readyState!==WebSocket.OPEN||!this.outbox.length)return;const t=this.outbox;this.outbox=[];const n=Date.now();for(const s of t){const o=this.saidAt.get(s);o!==void 0&&n-o>cv||this.send(s)||this.outbox.push(s)}}scheduleRetry(){if(this.closedByUs||this.replaced||!this.cfg.token||this.retryT)return;const t=this.epoch,n=Math.min(15e3,400*2**Math.min(this.retry,6));this.retry++,this.retryT=window.setTimeout(()=>{this.retryT=0,!(t!==this.epoch||this.closedByUs||this.replaced||!this.cfg.token)&&this.connect()},n)}armStable(){this.stableT&&clearTimeout(this.stableT),this.stableT=window.setTimeout(()=>{this.stableT=0,this.retry=0},1e4)}clearStable(){this.stableT&&(clearTimeout(this.stableT),this.stableT=0)}stopHb(){clearInterval(this.hbT),this.hbT=0,this.hbMissed=0,this.hbWaitT&&(clearTimeout(this.hbWaitT),this.hbWaitT=0)}startHb(){this.stopHb(),this.speaksHb&&(this.hbT=window.setInterval(()=>this.probe(fv),dv))}probe(t){if(!this.speaksHb||this.status!=="online"||this.hbWaitT)return;const n=Date.now();this.send({t:"ping"})&&(this.hbWaitT=window.setTimeout(()=>{if(this.hbWaitT=0,this.status==="online"){if(this.lastRx>=n){this.hbMissed=0;return}++this.hbMissed>=2?(this.hbMissed=0,this.dropDead()):this.probe(t)}},t))}dropDead(){const t=this.ws;if(t){t.onclose=null,t.onmessage=null,t.onopen=null;try{t.close()}catch{}this.ws=null,this.clearStable(),this.stopHb(),this.status="offline",this.emit("status",this.status),this.retry=0,this.scheduleRetry()}}listenWake(t){if(t===this.wakeOn||typeof document>"u")return;this.wakeOn=t;const n=t?"addEventListener":"removeEventListener";document[n]("visibilitychange",this.wake),window[n]("pageshow",this.wake),window[n]("online",this.wake)}connect(t){this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.closedByUs=!1,this.replaced=!1,this.status="connecting",this.emit("status",this.status),this.stopHb(),this.listenWake(!0);const n=this.ws;return new Promise(s=>{let o=!1;const i=r=>{o||(o=!0,s(r))},a=new WebSocket(this.cfg.url.replace(/^http/,"ws")+"/ws/"+encodeURIComponent(this.cfg.id??this.cfg.code));if(this.ws=a,n&&n!==a)try{n.close()}catch{}a.onopen=()=>{t&&!this.cfg.token?this.send({t:"join",...t,v:Tu,pet:1,mail:1,sit:1,fit:1,baby:1,amb:1,halloween:1,cos:1,needs:1,art:1,hb:1}):this.cfg.token?this.send({t:"hello",token:this.cfg.token,v:Tu,pet:1,mail:1,sit:1,fit:1,baby:1,amb:1,halloween:1,cos:1,needs:1,art:1,hb:1}):i("notoken")},a.onmessage=r=>{this.lastRx=Date.now(),this.hbMissed=0;const l=JSON.parse(r.data);this.handle(l),l.t==="welcome"&&(this.armStable(),i("ok")),l.t==="error"&&i(l.code+(l.msg?":"+l.msg:"")),l.t==="removed"&&i("removed")},a.onclose=r=>{if(this.ws===a){if(this.clearStable(),this.ws=null,this.status="offline",this.stopHb(),i("closed"),r.code===4e3){this.replaced=!0,this.emit("status",this.status),this.emit("replaced");return}this.emit("status",this.status),this.scheduleRetry()}},a.onerror=()=>{}})}close(){this.closedByUs=!0,this.replaced=!1,this.epoch++,this.outbox=[],this.clearStable(),this.stopHb(),this.listenWake(!1),this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.presT&&(clearTimeout(this.presT),this.presT=0);try{this.ws?.close()}catch{}this.ws=null,this.status="offline",clearInterval(this.flushT)}handle(t){switch(t.t){case"joined":this.cfg.token=t.token,this.cfg.pid=t.pid,Qn(this.cfg);break;case"welcome":this.pid=t.pid,this.settings=t.settings,this.status="online",this.speaksSit=t.sit===1,this.speaksBaby=t.baby===1,this.speaksAmb=t.amb===1,this.speaksArt=t.art===1,this.speaksNeeds=t.needs===1,this.speaksHb=t.hb===1,this.players=new Map(t.players.map(n=>[n.pid,n]));{const n=this.houses;this.houses=new Map;for(const s of t.houses){const{state:o,...i}=s,a=n.get(s.id),r=Ka(o);this.houses.set(s.id,{meta:i,confirmed:r,pending:a?this.carry(r,a.pending):[],view:null})}}this.presence=new Map(Object.entries(t.presence)),this.presence.delete(this.pid),t.ranch&&(this.ranch={plots:t.ranch.plots,skew:t.ranch.now-Date.now()});{const n=new Map;for(const s of t.tables??[])n.set(s.tb,this.stampTable(s));this.tables=n}clearInterval(this.flushT),this.flushT=window.setInterval(()=>this.flush(),60),this.lastPres&&(this.presDirty=!0),this.flushPres(),this.flushOutbox(),this.startHb(),this.emit("welcome"),this.emit("status",this.status);break;case"act":{const n=this.houses.get(t.houseId);if(!n)return;const s=t.action,o=s.id&&s.room?n.confirmed.rooms[s.room]?.items.find(a=>a.id===s.id):void 0;n.confirmed=qi(Ka(n.confirmed),t.action);const i=t.by===this.pid&&n.pending[0]?.cid===t.cid;i&&n.pending.shift(),n.view=null,i||this.emit("act",t.houseId,t.action,t.by,o?.kind??"");break}case"nack":{const n=this.houses.get(t.houseId);if(!n)return;const s=n.pending.find(o=>o.cid===t.cid)?.action??null;n.pending=n.pending.filter(o=>o.cid!==t.cid),t.state&&(n.confirmed=Ka(t.state)),n.view=null,this.emit("reset",t.houseId,t.reason,s);break}case"pres":t.pid!==this.pid&&(t.p?this.presence.set(t.pid,t.p):this.presence.delete(t.pid),this.emit("pres",t.pid));break;case"players":this.players=new Map(t.players.map(n=>[n.pid,n])),this.emit("players");break;case"house":{const{state:n,...s}=t.house;this.houses.set(s.id,{meta:s,confirmed:Ka(n),pending:[],view:null}),this.emit("houses");break}case"houseMeta":{const n=this.houses.get(t.meta.id);n&&(n.meta=t.meta,this.emit("houses"),this.emit("houseMeta",t.meta.id));break}case"houseGone":this.houses.delete(t.houseId),this.emit("houses"),this.emit("houseGone",t.houseId);break;case"settings":this.settings=t.settings,this.emit("settings");break;case"bubble":this.emit("bubble",t.pid,t.b);break;case"fx":this.emit("fx",t.pid,t.fx);break;case"knocked":this.emit("knocked",t.houseId,t.name);break;case"ranch":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch");break;case"ranchFail":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch"),this.emit("ranchFail",t.reason);break;case"noride":this.emit("noride",t.ride);break;case"table":{const n=this.stampTable(t.table);this.tables.set(n.tb,n),this.emit("table",n);break}case"tblFail":this.emit("tblFail",t.tb,t.reason);break;case"sayFail":this.emit("sayFail",t.reason);break;case"mailbox":{const n=this.houses.get(t.houseId);if(!n)return;if(t.mailbox?.letters?.length)n.confirmed={...n.confirmed,mailbox:t.mailbox};else{const{mailbox:s,...o}=n.confirmed;n.confirmed=o}n.view=null,this.emit("mailbox",t.houseId);break}case"mailFail":this.emit("mailFail",t.reason);break;case"art":this.emit("art",t.houseId,t.arts);break;case"artFail":this.emit("artFail",t.houseId,t.id,t.reason);break;case"parentInfo":this.emit("parentInfo",t);break;case"error":this.emit("error",t.code),t.code==="badtoken"&&(this.cfg.token=void 0,this.cfg.pid=void 0,Qn(this.cfg));break;case"pong":break;case"removed":this.closedByUs=!0,this.emit("removed");break}}stampTable(t){const n=this.tables.get(t.tb),s=n&&n.away===t.away&&n.receivedAt?n.receivedAt:Date.now();return{...t,receivedAt:s}}carry(t,n){const s=[];let o=t;for(const i of n){const a=Pu(o,i.action);let r;if(a!==void 0&&i.base!==void 0&&i.base!==null?r=a===i.base:r=!i.sent||lv.has(i.action.type),i.sent&&(r?this.resent.again++:this.resent.dropped++),!!r){s.push({cid:this.cid++,action:i.action,sent:!1,base:i.base});try{o=qi(o,i.action)}catch{}}}return s}view(t){const n=this.houses.get(t);return n?n.view??=n.pending.reduce((s,o)=>qi(s,o.action),n.confirmed):null}myHouseId(){return this.players.get(this.pid)?.houseId??""}canEdit(t){const n=this.houses.get(t);return!!n&&(!n.meta.locked||n.meta.ownerId===this.pid)}dispatch(t,n){const s=this.houses.get(t);if(!s)return;const o=Au(n),i=s.pending[s.pending.length-1];if(o&&i&&!i.sent&&Au(i.action)===o)i.action=n;else{const a=this.view(t);s.pending.push({cid:this.cid++,action:n,sent:!1,base:a?Pu(a,n)??null:null})}s.view=null}flush(){for(const[t,n]of this.houses)for(const s of n.pending)!s.sent&&this.send({t:"act",houseId:t,cid:s.cid,action:s.action})&&(s.sent=!0);this.flushPres()}setPresence(t){this.lastPres=t,this.presDirty=!0,this.presT||this.flushPres()}flushPres(){if(!(!this.presDirty||!this.lastPres)){if(!this.send({t:"pres",p:this.lastPres})){!this.closedByUs&&!this.presT&&(this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90));return}this.presDirty=!1,this.presT&&clearTimeout(this.presT),this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90)}}myPresence(){return this.lastPres}say(t){this.reliable({t:"say",b:t})}lock(t,n){this.reliable({t:"lock",houseId:t,locked:n})}setLook(t){this.reliable({t:"look",look:t});const n=this.players.get(this.pid);n&&(n.look=t)}setDog(t){this.reliable({t:"dog",dog:t});const n=this.players.get(this.pid);n&&(n.dog=t)}fx(t){this.reliable({t:"fx",fx:t})}knock(t){this.send({t:"knock",houseId:t})}ranchOp(t){this.reliable({t:"ranch",o:t})}tbl(t){this.reliable({t:"tbl",...t})}saveArt(t,n,s){return this.send({t:"art",op:"save",houseId:t,id:n,data:s})}getArt(t,n){return this.send({t:"art",op:"get",houseId:t,ids:n})}sendMail(t,n,s,o){this.reliable({t:"mail",op:"send",houseId:t,text:n,color:s,sticker:o})}readMail(t,n){this.reliable({t:"mail",op:"read",houseId:t,id:n})}dropMail(t,n){this.reliable({t:"mail",op:"drop",houseId:t,id:n})}now(){return Date.now()+this.ranch.skew}parent(t){this.cfg.parentKey&&this.reliable({t:"parent",key:this.cfg.parentKey,...t})}}function uv(e,t,n,s="living"){let o=s;const i=[],a=()=>({...e.view(t),currentRoom:o,soundOn:n.get()}),r=l=>{if(e.houses.has(t)){const c=a();i.forEach(d=>d(c,l))}};return e.on("act",(l,c)=>{l===t&&r(c)}),e.on("reset",l=>{l===t&&r({type:"game/reset"})}),{houseId:t,get:a,subscribe(l){i.push(l)},dispatch(l){if(l.type==="room/switch")o=l.room;else if(l.type==="settings/sound")n.set(l.on);else{if(l.type==="game/reset")return;if(!e.canEdit(t)||l.type.startsWith("baby/")&&!e.speaksBaby||l.type==="item/power"&&!e.speaksAmb||l.type.startsWith("need/")&&!e.speaksNeeds)return;e.dispatch(t,l)}r(l)}}}const at="#5a3d5c",ue=`stroke="${at}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,xd=[{name:"Tabby",body:"#ffb26b",stripe:"#e8893a",belly:"#ffe3c4"},{name:"Smokey",body:"#b9b6c9",stripe:"#8f8ba3",belly:"#ecebf3"},{name:"Tuxedo",body:"#4f4660",stripe:"",belly:"#ffffff"},{name:"Calico",body:"#fff6ec",stripe:"",belly:"#fff6ec"}],Md=[{name:"Pup",body:"#f2d0a4",ear:"#b07d54",snout:"#fbe7cc"},{name:"Poodle",body:"#fff0f6",ear:"#ffc8dd",snout:"#fff7fb"},{name:"Dachshund",body:"#c07a45",ear:"#7d4a26",snout:"#d99a68"},{name:"Golden",body:"#f4b860",ear:"#e09a3e",snout:"#fbd9a0"},{name:"Spotty",body:"#ffffff",ear:"#4a3f52",snout:"#ffffff"}],pv=(e,t,n,s=!1)=>s?`<path d="M${e-3} ${n} q3 3 6 0 M${t-3} ${n} q3 3 6 0" fill="none" ${ue} stroke-width="2.5"/>`:`<circle cx="${e}" cy="${n}" r="2.8" fill="${at}"/><circle cx="${t}" cy="${n}" r="2.8" fill="${at}"/><circle cx="${e+.9}" cy="${n-.9}" r=".9" fill="#fff"/><circle cx="${t+.9}" cy="${n-.9}" r=".9" fill="#fff"/>`,Ld=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>`;function Xo(e,t="stand"){const n=xd[e]??xd[0],s="#ffb3c6",o=(i,a,r,l)=>`
    <path d="M${i-13} ${a-8} L${i-10} ${a-25} L${i-1} ${a-13} Z" fill="${n.body}" ${ue}/><path d="M${i-10.5} ${a-11} L${i-9.5} ${a-20} L${i-4} ${a-13} Z" fill="${s}"/>
    <path d="M${i+1} ${a-13} L${i+11} ${a-26} L${i+13} ${a-7} Z" fill="${e===3?"#f4a259":n.body}" ${ue}/><path d="M${i+4} ${a-13} L${i+10} ${a-21} L${i+11} ${a-11} Z" fill="${s}"/>
    <circle cx="${i}" cy="${a}" r="${r}" fill="${n.body}" ${ue}/>
    ${e===3?`<path d="M${i+2} ${a-r+1} a${r} ${r} 0 0 1 ${r-3} ${r-2} q-6 2 -${r-3} -${r-3}z" fill="#f4a259"/>`:""}
    ${e===2?`<ellipse cx="${i+2}" cy="${a+7}" rx="9" ry="7" fill="#fff"/>`:""}
    ${n.stripe?`<path d="M${i-4} ${a-r+2} v5 M${i+2} ${a-r+1} v6 M${i+8} ${a-r+3} v4" ${ue} stroke="${n.stripe}" stroke-width="2.5"/>`:""}
    ${pv(i-4,i+7,a,l)}
    <path d="M${i+3} ${a+4} l-2.5 -2 h5 z" fill="#ff8fab"/><path d="M${i+.5} ${a+6} q2.5 2.5 5 0" fill="none" ${ue} stroke-width="2"/>
    ${Ld(i-8,a+5)}${Ld(i+12,a+5)}
    <path d="M${i+r-2} ${a+3} l9 -2 M${i+r-2} ${a+6} l9 2" ${ue} stroke-width="1.6"/>`;return t==="nap"?`<svg viewBox="0 0 120 100" class="catsvg nap">
    <g class="breathe"><path class="tail" d="M28 84 Q22 96 64 94" fill="none" stroke="${at}" stroke-width="11" stroke-linecap="round"/><path d="M28 84 Q22 96 64 94" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="76" rx="36" ry="18" fill="${n.body}" ${ue}/>
    ${e===3?'<ellipse cx="44" cy="72" rx="12" ry="8" fill="#f4a259"/><ellipse cx="66" cy="70" rx="9" ry="6" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 62 q3 6 0 12 M56 61 q3 6 0 12 M68 62 q3 6 0 11" fill="none" ${ue} stroke="${n.stripe}" stroke-width="3"/>`:""}
    ${o(90,76,15,!0)}</g></svg>`:t==="sit"?`<svg viewBox="0 0 120 100" class="catsvg sit">
    <path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${at}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="70" rx="20" ry="25" fill="${n.body}" ${ue}/>
    <ellipse cx="70" cy="74" rx="10" ry="15" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="54" cy="66" rx="9" ry="12" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M50 60 q5 2 4 8 M49 72 q5 2 4 8" fill="none" ${ue} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect x="62" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${ue}/><rect x="74" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${ue}/>
    ${e===2?'<ellipse cx="66.5" cy="93" rx="4" ry="2.5" fill="#fff"/><ellipse cx="78.5" cy="93" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(72,36,17,!1)}</svg>`:`<svg viewBox="0 0 120 100" class="catsvg stand">
    <path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${at}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <rect class="leg b" x="34" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${ue}/><rect class="leg a" x="74" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${ue}/>
    <ellipse cx="58" cy="58" rx="32" ry="17" fill="${n.body}" ${ue}/>
    <ellipse cx="64" cy="66" rx="20" ry="7" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="46" cy="52" rx="12" ry="9" fill="#f4a259"/><ellipse cx="68" cy="50" rx="9" ry="7" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 43 q3 6 0 12 M56 42 q3 6 0 12 M68 43 q3 6 0 11" fill="none" ${ue} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect class="leg a" x="44" y="64" width="9" height="30" rx="4.5" fill="${n.body}" ${ue}/><rect class="leg b" x="84" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${ue}/>
    ${e===2?'<ellipse cx="48.5" cy="92" rx="4" ry="2.5" fill="#fff"/><ellipse cx="88.5" cy="92" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(90,40,17,!1)}</svg>`}function pa(e,t="stand"){const n=Md[e]??Md[0],s=t==="sleep",o=e===2,i=e===1,a=e===3,r=e===4,l=o?66:58,c=o?70:62,d=94-c,f=o?102:92,u=o?50:40,p=(_,T)=>i?`<rect class="leg ${T}" x="${_+2}" y="${c}" width="6" height="${d}" rx="3" fill="${n.body}" ${ue}/><circle class="leg ${T}" cx="${_+5}" cy="91" r="6" fill="${n.body}" ${ue}/>`:`<rect class="leg ${T}" x="${_}" y="${c}" width="10" height="${d}" rx="5" fill="${n.body}" ${ue}/>`,m=i?`<circle cx="44" cy="58" r="15" fill="${n.body}" ${ue}/><circle cx="70" cy="56" r="17" fill="${n.body}" ${ue}/><ellipse cx="57" cy="58" rx="22" ry="12" fill="${n.body}"/>`:`<ellipse cx="${o?62:58}" cy="${l}" rx="${o?42:32}" ry="${o?13:17}" fill="${n.body}" ${ue}/>`,k=r?`<circle cx="46" cy="54" r="5" fill="${at}"/><circle cx="64" cy="62" r="4" fill="${at}"/><circle cx="72" cy="50" r="3.5" fill="${at}"/><circle cx="38" cy="64" r="3" fill="${at}"/>`:"",w=i?`<g class="tail"><path d="M30 52 L22 38" ${ue}/><circle cx="21" cy="34" r="7" fill="${n.body}" ${ue}/></g>`:a?`<path class="tail" d="M30 52 Q10 50 14 30 Q20 40 30 46" fill="${n.body}" ${ue}/>`:`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${at}" stroke-width="9" stroke-linecap="round"/>`,b=!i&&!a?`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`:"",g=`
    ${i?`<circle cx="${f-2}" cy="${u-16}" r="10" fill="${n.body}" ${ue}/>`:""}
    <circle cx="${f}" cy="${u}" r="17" fill="${n.body}" ${ue}/>
    ${r?`<circle cx="${f-6}" cy="${u-8}" r="4" fill="${at}"/>`:""}
    <ellipse cx="${f+13}" cy="${u+7}" rx="11" ry="8" fill="${n.snout}" ${ue}/>
    <circle cx="${f+22}" cy="${u+4}" r="4" fill="${at}"/>
    <path d="M${f+14} ${u+12} q4 3 8 0" fill="none" ${ue} stroke-width="2"/>
    ${s?"":`<path class="tongue" d="M${f+16} ${u+13} q2 7 6 0" fill="#ff8fab" ${ue} stroke-width="2"/>`}
    ${s?`<path d="M${f+2} ${u-4} q3 3 6 0" fill="none" ${ue} stroke-width="2.4"/>`:`<circle cx="${f+5}" cy="${u-3}" r="3" fill="${at}"/><circle cx="${f+6}" cy="${u-4}" r="1" fill="#fff"/>`}
    ${Ld(f+2,u+8)}
    ${i?`<circle cx="${f-9}" cy="${u+8}" r="9" fill="${n.ear}" ${ue}/>`:`<ellipse class="ear" cx="${f-9}" cy="${u+4}" rx="7" ry="${a||o?14:12}" fill="${n.ear}" ${ue} transform="rotate(12 ${f-9} ${u+4})"/>`}
    <path d="M${f-12} ${u+14} q10 6 20 2" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/><circle cx="${f-1}" cy="${u+19}" r="3" fill="#ffd166" ${ue} stroke-width="1.5"/>`,y=i?`<g class="tail"><path d="M42 86 L28 80" ${ue}/><circle cx="25" cy="78" r="7" fill="${n.body}" ${ue}/></g>`:`<path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${at}" stroke-width="9" stroke-linecap="round"/><path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`;return t==="sit"||t==="sleep"?`<svg viewBox="0 0 130 100" class="dogsvg ${s?"sleep":"sit"}">${y}
    <ellipse cx="60" cy="70" rx="22" ry="24" fill="${n.body}" ${ue}/>${r?`<circle cx="54" cy="66" r="5" fill="${at}"/><circle cx="64" cy="80" r="4" fill="${at}"/>`:""}
    ${p(62,"a")}${p(74,"b")}<g transform="translate(-22 -2)">${g}</g></svg>`:`<svg viewBox="0 0 130 100" class="dogsvg stand">${w}${b}
    ${p(o?30:34,"b")}${p(o?82:72,"a")}
    ${m}${k}
    ${p(o?42:46,"a")}${p(o?94:84,"b")}
    ${g}</svg>`}const yg=e=>{let t=2166136261;for(const n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0},eo=(e,t)=>{let n=(e^Math.imul(t,2654435761))>>>0;return n^=n>>>15,n=Math.imul(n,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296},Ru=18,gv={1:.35,2:.6};function mv(e,t,n){return e-t*gv[n]}function yv(e,t){const s=Math.floor(t/1e3/2.8);return eo(yg(e||"pup"),s)<.62?"rest":"peek"}function bv(e,t,n,s,o=!1){const i=yg(e.name+":"+e.coat+":"+e.room+":"+Math.round(e.x)+(n?":t"+Math.round(n.x):"")),a=t/1e3,r=Math.floor(a/Ru),l=a-r*Ru;if(!n){const b=N=>Math.max(160,Math.min(2240,e.x+(eo(i,N)-.5)*760)),g=b(r-1);let y=b(r);const _=eo(i+7,r),T=_<.45?"nap":_<.75?"sit":"groom",x=!!(s&&T==="nap"&&eo(i+13,r)<.72);x&&s&&(y=Math.max(160,Math.min(2240,s.x)));const $=Math.abs(y-g),I=Math.min(5,$/110);return l<I&&!o?{x:g+(y-g)*(l/I),mood:"walk",flip:y<g,perch:0,curl:0}:{x:y,mood:T,flip:y<g,perch:0,curl:x?1:0}}const c=Math.max(160,Math.min(2240,n.x)),d=eo(i+5,r)<.45?2:1,f=Math.max(160,Math.min(2240,c+(eo(i,r)-.5)*420)),u=Math.abs(c-f),p=Math.min(4.2,Math.max(.6,u/160)),m=c<f;if(l<p&&!o)return{x:f+(c-f)*(l/p),mood:"walk",flip:m,perch:0,curl:0};const k=eo(i+11,r),w=k<.34?"nap":k<.67?"sit":"play";return{x:c,mood:w,flip:m,perch:d,curl:0}}const Zr="#5a3d5c",We=`stroke="${Zr}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,Do=[`<svg viewBox="0 0 48 48"><path d="M24 40 C16 32 6 26 10 16 C14 8 24 12 24 20 C24 12 34 8 38 16 C42 26 32 32 24 40 Z" fill="#ff6b9a" ${We}/></svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd166" ${We}/></svg>`,`<svg viewBox="0 0 48 48"><circle cx="24" cy="22" r="6" fill="#ff8fab" ${We}/>${[0,60,120,180,240,300].map(e=>`<circle cx="${24+Math.cos(e*Math.PI/180)*12}" cy="${22+Math.sin(e*Math.PI/180)*12}" r="5" fill="#ffd166" ${We}/>`).join("")}<path d="M24 34 V44" ${We}/></svg>`,`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="10" fill="#ffb26b" ${We}/><circle cx="34" cy="20" r="8" fill="#ffc46b" ${We}/><path d="M28 14 L30 6 L36 14" fill="#ffb26b" ${We}/><circle cx="32" cy="19" r="1.4" fill="${Zr}"/><circle cx="37" cy="19" r="1.4" fill="${Zr}"/></svg>`,`<svg viewBox="0 0 48 48">${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M8 ${30-t*4} Q24 ${10-t*3} 40 ${30-t*4}" fill="none" stroke="${e}" stroke-width="4"/>`).join("")}</svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l3 10 10 1 -8 6 3 10 -8 -5 -8 5 3 -10 -8 -6 10 -1z" fill="#fff3b0" ${We}/><circle cx="12" cy="34" r="3" fill="#ff8fab" ${We}/><circle cx="36" cy="36" r="2.4" fill="#bde0fe" ${We}/></svg>`];function Cu(e){const t=e?`<g class="flag"><path d="M30 16 V6" ${We}/><path d="M30 6 H42 L38 11 L42 16 H30 Z" fill="#ff6b6b" ${We}/></g>`:`<g class="flag"><path d="M18 28 H28" ${We}/><path d="M18 22 H28 L25 25 L28 28 H18 Z" fill="#ffd166" ${We}/></g>`;return`<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="68" rx="18" ry="3" fill="#000" opacity=".12"/>
    <rect x="30" y="40" width="5" height="26" rx="2" fill="#c99366" ${We}/>
    <path d="M8 40 V22 Q8 8 32 8 Q56 8 56 22 V40 Z" fill="#8ecae6" ${We}/>
    <path d="M8 28 H56" ${We}/>
    <rect x="14" y="32" width="36" height="16" rx="4" fill="#fff6e6" ${We}/>
    <circle cx="32" cy="40" r="3" fill="${Zr}"/>
    ${t}
  </svg>`}function wv(e,t=[]){const n=sv(e,t);return n.ok?{ok:!0,text:n.text}:{ok:!1,msg:n.reason==="empty"?"Write a little note!":Wl[n.reason]||"Oops, try different words!"}}const kv={...Wl,empty:"Write a little note!",slow:"Let's wait a moment!",full:"This mailbox is full!",notyours:"That's her mailbox. Only she can open it 💌",nohouse:"That house is not on the street.",gone:"That letter is already gone.",toobig:"The mailbox is too full!",presetsOnly:"Typing is off. Pick a phrase!",unread:"She still has your letters! Wait until she reads them."};function vv(e){return kv[e]||"Let's try that again!"}function _v(e){let t="",n="",s=!1,o="",i=0,a=0,r=-1,l="",c="";const d=()=>document.getElementById("mailCue");d()?.addEventListener("click",()=>{e.openOwn()});function f(){t="",n="",document.getElementById("mailSheet")?.remove()}function u(){let b=document.getElementById("mailSheet");return b||(b=document.createElement("div"),b.id="mailSheet",b.className="sheet mailSheet",b.innerHTML='<div class="card" id="mailCard"></div>',document.body.appendChild(b),b.addEventListener("click",g=>{const y=g.target;if(y===b||y.closest('[data-m="close"]')){f();return}m(y)}),b.addEventListener("input",g=>{const y=g.target;if(y.id!=="mailText")return;const _=document.getElementById("mailCount");_&&(_.textContent=`${y.value.length}/${ds}`)})),b}function p(){if(!t)return;const b=u().querySelector("#mailText")?.value??"",g=e.mine(t),y=e.lettersOf(t),_=e.houseName(t),T=u().querySelector("#mailCard");if(n&&g&&!s){const $=y.find(I=>I.id===n);if($&&$.text){k($);return}n=""}if(s||!g){const $=e.freeType(),I=o?`Reply to ${e.houseName(o)||"your friend"}`:g?"Leave a letter":`Letter for ${_}`,N=$?`<textarea id="mailText" class="mailBox" maxlength="${ds}" placeholder="Hi! Come play!"></textarea>
        <div class="mailCount" id="mailCount">0/${ds}</div>`:`<h3>Phrase</h3><div class="phrases mailPhrases">${ji.map((F,oe)=>`<button type="button" data-phrase="${oe}" class="${oe===r?"on":""}">${xt(F)}</button>`).join("")}</div>`;T.innerHTML=`<button class="close" data-m="close">✕</button><h2>${xt(I)}</h2>
        <p class="hint">${$?"A short note. Your name goes on it for you.":"Pick a phrase. Your name goes on it for you."}</p>
        ${N}
        <h3>Paper</h3><div class="mailRow">${ns.map((F,oe)=>`<button class="swatch ${oe===i?"on":""}" data-color="${oe}" style="background:${F}" aria-label="Paper ${oe+1}"></button>`).join("")}</div>
        <h3>Sticker</h3><div class="mailRow">${Do.slice(0,W0).map((F,oe)=>`<button class="stick ${oe===a?"on":""}" data-sticker="${oe}" aria-label="Sticker ${oe+1}">${F}</button>`).join("")}</div>
        ${l?`<p class="mailErr" id="mailErr">${xt(l)}</p>`:""}
        <button class="mailSend" id="mailSend" type="button">Send</button>
        ${g&&y.length?'<button class="mailRow" data-act="back" type="button" style="margin-top:8px">Back to my mail</button>':""}`;const U=u().querySelector("#mailText");if(U&&b){U.value=b;const F=document.getElementById("mailCount");F&&(F.textContent=`${b.length}/${ds}`)}return}const x=y.length?y.slice().reverse().map($=>$.text?`<button type="button" class="letter ${$.read?"":"fresh"}" data-letter="${xt($.id)}" style="background:${ns[$.color]??ns[0]}">
        <span class="sticker">${Do[$.sticker]??Do[0]}</span>
        <span class="who">${xt($.from)}</span><span class="when">${xt(vc($.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${We}/><path d="M4 8 L40 24 L76 8" fill="${ns[$.color]??"#fff"}" ${We}/></svg>
      </button>`:`<div class="letter" style="background:${ns[$.color]??ns[0]}"><span class="who">Your letter</span><span class="when">${xt(vc($.at))}</span><span class="statusChip ${$.read?"read":""}">${$.read?"Read":"Delivered"}</span></div>`).join(""):'<p class="hint">No letters yet. Your flag pops up when one arrives!</p>';T.innerHTML=`<button class="close" data-m="close">✕</button><h2>${xt(_)} mailbox</h2>${x}
      <div class="mailRow"><button type="button" data-act="write">Write a letter</button></div>
      ${l?`<p class="mailErr">${xt(l)}</p>`:""}`}function m(b){const g=b.closest(".mailPhrases [data-phrase]");if(g){r=+g.dataset.phrase,l="",p();return}const y=b.closest("[data-color]");if(y){i=+y.dataset.color,p();return}const _=b.closest("[data-sticker]");if(_){a=+_.dataset.sticker,p();return}if(b.closest("#mailSend"))return w();const T=b.closest("[data-act]")?.dataset.act;if(T==="write"){s=!0,o="",n="",l="",p();return}if(T==="back"){s=!1,o="",n="",l="",p();return}if(T==="reply"){const U=e.houseOf(b.closest("[data-from]")?.dataset.from??"");if(!U){e.toast("They are not on the street anymore.");return}o=U,s=!0,n="",l="",t=U,p();return}if(T==="drop"){const U=b.closest("[data-id]")?.dataset.id??"";if(c!==U){c=U,e.toast("Tap again to throw it away");return}c="",e.drop(t,U);return}const x=b.closest("[data-letter]");if(!x)return;const $=x.dataset.letter,N=e.lettersOf(t).find(U=>U.id===$);N&&(!e.mine(t)||!N.text||(N.read||e.read(t,$),n=$,k(N)))}function k(b){const g=$v(b.text),y=u().querySelector("#mailCard");y.innerHTML=`<button class="close" data-m="close">✕</button>
      <div class="letter open read" style="background:${ns[b.color]??ns[0]}" data-id="${xt(b.id)}" data-from="${xt(b.fromPid)}">
        <span class="sticker">${Do[b.sticker]??Do[0]}</span>
        <span class="who">${xt(b.from)}</span><span class="when">${xt(vc(b.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${We}/><path class="flap" d="M4 8 L40 24 L76 8" fill="#fff" ${We}/></svg>
        <p class="words">${xt(g??"")}</p>
        <span class="mailRow"><button type="button" data-act="reply">Reply</button><button type="button" class="throw" data-act="drop">${c===b.id?"Tap again":"Throw away"}</button></span>
      </div>
      <button type="button" data-act="back">All my mail</button>
      ${l?`<p class="mailErr">${xt(l)}</p>`:""}`}function w(){let b="";if(e.freeType()){const y=u().querySelector("#mailText")?.value??"",_=wv(y);if(!_.ok){l=_.msg,p();const T=u().querySelector("#mailText");T&&(T.value=y);return}b=_.text}else{if(r<0||r>=ji.length){l="Pick a phrase!",p();return}b=ji[r]}const g=o||t;l="",e.send(g,b,i,a),e.toast("On its way!"),e.mine(g)?(s=!1,o="",t=g,p()):f()}return{open(b,g,y,_){t=b,n="",s=!y,o="",l="",c="",i=0,a=0,r=-1,p()},fail(b){l=vv(b),t?p():e.toast(l)},refresh(){t&&p()},syncCue(b){d()?.classList.toggle("show",b)}}}function $v(e){if(!e)return null;const t=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return!t||t.length>ds?null:t}function xt(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const bg=()=>vt("cozy-play");function xv(){try{return localStorage.getItem(bg())==="play"?"play":"decorate"}catch{return"decorate"}}function Mv(e){try{localStorage.setItem(bg(),e)}catch{}}function Lv(e){return e==="kennel"?"kennel":e==="cat-tower"?"tower":e==="yard-swing"?"swing":e==="lamp"||/(^|:)lamp|starlamp|light/.test(e)?"lamp":e==="fridge"||e==="stove"||e==="vanity"||e==="bookshelf"||e==="window"||e==="mirror"||e==="tv"||/fridge|stove|cabinet|drawer|vanity/.test(e)?"open":ai(e)?"sit":"wiggle"}const Ev='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M34 8 l1.2 3 3 .4 -2.2 2 .6 3 -2.6-1.6 -2.6 1.6 .6-3 -2.2-2 3-.4z" fill="#ffd166" stroke="#5a3d5c" stroke-width="1.4"/></svg>',Sv='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 36 h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M8 14 l2 1 M40 34 l2 2 M8 40 l3 -1" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>';function Tv(e,t){let n="decorate";const s=e.querySelector("#modePlay"),o=e.querySelector("#modeDecorate");s.querySelector(".modeIco").innerHTML=Ev,o.querySelector(".modeIco").innerHTML=Sv;const i=()=>{const c=n==="play";document.body.classList.toggle("mode-play",c),s.classList.toggle("on",c),o.classList.toggle("on",!c),s.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-pressed",c?"false":"true")},a=(c,d)=>{n=c,d&&Mv(c),i(),t.onChange?.()};e.addEventListener("pointerdown",c=>c.stopPropagation()),e.addEventListener("click",c=>{const d=c.target.closest("[data-mode]");if(!d)return;const f=d.dataset.mode==="play"?"play":"decorate";a(f,t.ownHouse())}),i();let r=!1;return{mode:()=>n,isPlay:()=>n==="play",sync(c){a(c?xv():"play",!1)},hint:()=>{if(r||!document.body.classList.contains("phone"))return;const c=vt("cozy-mode-hint");try{if(localStorage.getItem(c)){r=!0;return}}catch{r=!0;return}r=!0;const d=document.createElement("p");d.className="modeHint",d.textContent="Play: tap things! Decorate: move things!",e.appendChild(d);let f=!1;const u=()=>{if(!f){f=!0,d.remove(),window.removeEventListener("pointerdown",u);try{localStorage.setItem(c,"1")}catch{}}};window.setTimeout(u,2800),d.addEventListener("click",u),window.addEventListener("pointerdown",u)}}}const wg=e=>String(e||"").replace(/^pack:/,"").toLowerCase();function Jo(e){return/(^|-)table$/.test(wg(e))}function Iu(e){const t=ai(e);return!t||t.pose!=="sit"?!1:/chair|stool/.test(wg(e))}const Pv=320,Av=180,Ed=(e,t)=>Math.hypot(e.x-t.x,e.y-t.y);function Rv(e,t,n,s){if(s&&Jo(s.kind))return s;const o=e.filter(c=>Jo(c.kind));let i=null,a=1/0;const r=s&&Et(s.kind)?s:{x:t,y:n},l=s&&Et(s.kind)?Av:0;for(const c of o){const d=Math.max(l,hn(c.kind)*.55+40),f=Ed(r,c);f<=d&&f<a&&(i=c,a=f)}return i}function Cv(e,t,n,s){if(s&&Gn(s.kind))return s;for(const o of e){if(!Gn(o.kind))continue;const i=hn(o.kind);if(Math.abs(t-o.x)<=Math.max(60,i*.45)&&Math.abs(n-o.y)<=80)return o}return null}function Iv(e,t,n,s){const o=hn(e.kind),i=uo(e.x,o,t,s),a=[i];if(n>1){const r=uo(e.x,o,e.x+(e.x-i.x),s);a.push({x:r.x,y:r.y})}return a}function zl(e){const t=e.roomW??2400,{releaseX:n,releaseY:s,hit:o,items:i,occupied:a,held:r,seatPiece:l}=e,c=r.filter(b=>Et(b.kind));if(o&&Iu(o.kind)){const b=l(o);if(b){const g=No({mode:"play",via:"drag",releaseX:n,releaseY:s,piece:b,occupied:a});if(g.seat)return{x:g.x,y:g.y,seat:g.seat,releases:[]}}}const d=Cv(i,n,s,o),f=Rv(i,n,s,o),u=!!(o&&ai(o.kind)?.pose==="lie"),p=d||(u?o:null),m=[];if(p&&c.length){const b=Iv(p,n,c.length,t);for(let g=0;g<c.length;g++){const y=b[Math.min(g,b.length-1)];m.push({hand:c[g].hand,x:y.x,y:y.y||ri})}}if(d)return{x:d.x,y:d.y+8,seat:null,releases:m};if(f){let b=null,g=1/0;for(const _ of i){if(!Iu(_.kind)||Ed(_,f)>Pv)continue;const T=l(_);if(!T)continue;const x=No({mode:"play",via:"drag",releaseX:n,releaseY:s,piece:T,occupied:a});if(!x.seat)continue;const $=Ed(_,{x:n,y:s});$<g&&(g=$,b={x:x.x,y:x.y,seat:x.seat})}if(b)return{...b,releases:m};const y=uo(f.x,hn(f.kind),n,t);return{x:y.x,y:y.y,seat:null,releases:m}}const k=o?l(o):null,w=No({mode:"play",via:"drag",releaseX:n,releaseY:s,piece:k,occupied:a});return{x:w.x,y:w.y,seat:w.seat,releases:m}}const Bv=200,Ov=120;function Dv(e,t){return t.some(n=>Math.hypot(n.x-e.x,n.y-e.y)<=_f)}function Hv(e,t){const n=new Set;for(const s of e)Es(s.kind)&&Dv(s,t)&&n.add(s.id);return n}function Wv(e){return e?.held?[e.held.left,e.held.right].some(t=>!!t&&Et(t.kind)):!1}function kg(e,t){return e.rooms[t]?.items??[]}function Vv(e,t){if(t.seat?.pose==="lie")return null;const n=kg(e,t.room),s=n.filter(c=>Jo(c.kind));if(!s.length)return null;let o=null,i=1/0;for(const c of s){const d=Math.hypot(c.x-t.x,c.y-t.y);d<=Bv&&d<i&&(i=d,o=c)}if(!o)return null;const a=t.seat?.pose==="sit",r=Wv(t);if(!a&&!r)return null;const l=n.some(c=>Et(c.kind)&&Math.hypot(c.x-o.x,c.y-o.y)<=Ov);return!r&&!l?null:{item:o.id}}function Uv(e,t,n){const s=new Map(e.characters.map(o=>[o.id,o]));for(const o of t){if(n.has(o.id))continue;const i=s.get(o.id);if(!i)continue;const a=Vv(e,i);a&&n.set(o.id,{kind:"nibble",item:a.item,phase:B0(a.item,o.id),face:i.x>=(kg(e,i.room).find(r=>r.id===a.item)?.x??i.x)?-1:1})}return n}const zv=200;function qf(e){return["left","right"]}function Qv(e){for(const t of qf()){const n=e.held[t];if(n&&Et(n.kind))return{hand:t,itemId:n.id,kind:n.kind}}return null}function Nv(e){for(const t of qf())if(!e.held[t])return t;return null}function Bu(e,t){return!e||e.startsWith("p:")?!0:t?(t instanceof Set?t:new Set(t)).has(e):!1}function Sd(e){const{state:t,fromId:n,toId:s}=e;if(!s||s===n)return{ok:!1,reason:"no-target"};if(Bu(s,e.playerIds)||Bu(n,e.playerIds))return{ok:!1,reason:"notyours"};const o=t.characters.find(c=>c.id===n),i=t.characters.find(c=>c.id===s);if(!o)return{ok:!1,reason:"no-snack"};if(!i)return{ok:!1,reason:"notyours"};const a=Qv(o);if(!a)return{ok:!1,reason:"no-snack"};if(o.room!==i.room)return{ok:!1,reason:"too-far"};if(Math.hypot(o.x-i.x,o.y-i.y)>zv)return{ok:!1,reason:"too-far"};const l=Nv(i);return l?{ok:!0,fromId:n,toId:s,fromHand:a.hand,toHand:l,itemId:a.itemId,kind:a.kind,room:o.room,x:i.x,y:i.y}:{ok:!1,reason:"hands-full"}}function Td(e){return[{type:"char/release",id:e.fromId,hand:e.fromHand,x:e.x,y:e.y},{type:"char/hold",id:e.toId,hand:e.toHand,room:e.room,itemId:e.itemId}]}function xr(e,t){let n=null,s=null,o=0;for(const i of e.characters)for(const a of qf())i.held[a]?.id===t&&(n=i.id,s=a,o++);for(const i of Object.values(e.rooms))for(const a of i.items)a.id===t&&o++;return{holder:n,hand:s,itemId:t,copies:o}}function Pd(e,t){const n=xr(e,t.itemId);if(n.copies!==1||n.holder===t.toId||n.holder===t.fromId||n.holder)return null;const s=e.characters.find(o=>o.id===t.fromId);return!s||s.held[t.fromHand]?null:{type:"char/hold",id:t.fromId,hand:t.fromHand,room:s.room,itemId:t.itemId}}const vg=new Map;let _g=!1;function Xn(){return _g}function qv(e){_g=e}function Jn(e){return vg.get(e)}function Fv(e,t){vg.set(e,t)}const $g=!0;let Bi=null;function Ff(){return Bi??$g}function jv(e){const t=new URLSearchParams(e.replace(/^\?/,"")).get("art");t==="v1"?Bi=!1:t==="v2"?Bi=!0:Bi=null;const n=Bi??$g;return qv(n),n}const Ts=[600,1800,4500],Zv=e=>new Promise(t=>setTimeout(t,e));async function xg(e,t=Ts){let n;for(let s=0;;s++){try{return await e()}catch(o){n=o}if(s>=t.length)break;await Zv(t[s])}throw n}function Gv(e,t=Ts){const n=Number(e.dataset.tries||"0");if(n>=t.length)return!1;const s=e.getAttribute("src");return s?(e.dataset.tries=String(n+1),setTimeout(()=>{!e.isConnected||e.getAttribute("src")!==s||(e.removeAttribute("src"),e.setAttribute("src",s))},t[n]),!0):!1}async function Os(e,t=Ts){try{return await xg(e,t)}catch(n){throw Kv(),n}}let Ou=!1,Du=!1;function Yv(){Ou||typeof window>"u"||(Ou=!0,window.addEventListener("vite:preloadError",e=>{}))}function Kv(){if(Du||typeof document>"u"||(Du=!0,document.getElementById("artRetryNote")))return;const e=document.createElement("div");e.id="artRetryNote",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.textContent="Some pictures could not load. You can still play!";const t=document.createElement("button");t.type="button",t.className="artRetryNoteOk",t.textContent="OK",t.addEventListener("click",()=>e.remove()),e.appendChild(t);const n=()=>{(document.body||document.documentElement).appendChild(e)};document.body?n():document.addEventListener("DOMContentLoaded",n,{once:!0})}const Gr=Object.assign({"../../assets/art/any/armchair.webp":()=>h(()=>import("./armchair-BAjEKZT-.js"),[]).then(e=>e.default),"../../assets/art/any/ball.webp":()=>h(()=>import("./ball-D1B5vbct.js"),[]).then(e=>e.default),"../../assets/art/any/balloon.webp":()=>h(()=>import("./balloon-5CQ1ji1d.js"),[]).then(e=>e.default),"../../assets/art/any/bookshelf.webp":()=>h(()=>import("./bookshelf-BCCk-QJS.js"),[]).then(e=>e.default),"../../assets/art/any/chair.webp":()=>h(()=>import("./chair-BxTP5f1M.js"),[]).then(e=>e.default),"../../assets/art/any/clock.webp":()=>h(()=>import("./clock-D_q2KVbT.js"),[]).then(e=>e.default),"../../assets/art/any/lamp.webp":()=>h(()=>import("./lamp-BOWZQ_df.js"),[]).then(e=>e.default),"../../assets/art/any/picture.webp":()=>h(()=>import("./picture-DsR0Jovx.js"),[]).then(e=>e.default),"../../assets/art/any/plant.webp":()=>h(()=>import("./plant-xO8tOsUj.js"),[]).then(e=>e.default),"../../assets/art/any/rug.webp":()=>h(()=>Promise.resolve().then(()=>VS),void 0).then(e=>e.default),"../../assets/art/any/sofa.webp":()=>h(()=>import("./sofa-DqtVZLgl.js"),[]).then(e=>e.default),"../../assets/art/any/table.webp":()=>h(()=>import("./table-CaJl95Y4.js"),[]).then(e=>e.default),"../../assets/art/any/tv.webp":()=>h(()=>import("./tv-10oa_PoM.js"),[]).then(e=>e.default),"../../assets/art/any/window.webp":()=>h(()=>Promise.resolve().then(()=>Y9),void 0).then(e=>e.default),"../../assets/art/backyard/beach-ball.webp":()=>h(()=>import("./beach-ball-BGSUwHpb.js"),[]).then(e=>e.default),"../../assets/art/backyard/birdbath.webp":()=>h(()=>import("./birdbath-Cxq6uhaA.js"),[]).then(e=>e.default),"../../assets/art/backyard/birdhouse.webp":()=>h(()=>import("./birdhouse-BZjankMZ.js"),[]).then(e=>e.default),"../../assets/art/backyard/butterfly-bush.webp":()=>h(()=>import("./butterfly-bush-DyFmTTis.js"),[]).then(e=>e.default),"../../assets/art/backyard/garden-gnome.webp":()=>h(()=>import("./garden-gnome-BdIogyb0.js"),[]).then(e=>e.default),"../../assets/art/backyard/hammock.webp":()=>h(()=>import("./hammock-D6n3oWJ0.js"),[]).then(e=>e.default),"../../assets/art/backyard/hedge-row.webp":()=>h(()=>import("./hedge-row-Box4JkqY.js"),[]).then(e=>e.default),"../../assets/art/backyard/lemonade-cart.webp":()=>h(()=>import("./lemonade-cart-D5_QECrJ.js"),[]).then(e=>e.default),"../../assets/art/backyard/lemonade-cup.webp":()=>h(()=>import("./lemonade-cup-Deu_4A_L.js"),[]).then(e=>e.default),"../../assets/art/backyard/lily-pond.webp":()=>h(()=>import("./lily-pond-DdWM66PF.js"),[]).then(e=>e.default),"../../assets/art/backyard/little-slide.webp":()=>h(()=>import("./little-slide-BmFzgQVg.js"),[]).then(e=>e.default),"../../assets/art/backyard/patio-lights.webp":()=>h(()=>import("./patio-lights-CG-X-NR-.js"),[]).then(e=>e.default),"../../assets/art/backyard/patio-umbrella.webp":()=>h(()=>import("./patio-umbrella-CBfWeK2o.js"),[]).then(e=>e.default),"../../assets/art/backyard/picket-gate.webp":()=>h(()=>import("./picket-gate-DdopcGK9.js"),[]).then(e=>e.default),"../../assets/art/backyard/picnic-blanket.webp":()=>h(()=>import("./picnic-blanket-DEHPBD-8.js"),[]).then(e=>e.default),"../../assets/art/backyard/picnic-table.webp":()=>h(()=>import("./picnic-table-Beke1hZj.js"),[]).then(e=>e.default),"../../assets/art/backyard/pinwheel.webp":()=>h(()=>import("./pinwheel-BYWuiGc6.js"),[]).then(e=>e.default),"../../assets/art/backyard/rain-barrel.webp":()=>h(()=>import("./rain-barrel-DuOSk5bU.js"),[]).then(e=>e.default),"../../assets/art/backyard/sandbox.webp":()=>h(()=>import("./sandbox-BNfGpBrd.js"),[]).then(e=>e.default),"../../assets/art/backyard/seesaw.webp":()=>h(()=>import("./seesaw-Bb88ZDIz.js"),[]).then(e=>e.default),"../../assets/art/backyard/splash-pool.webp":()=>h(()=>import("./splash-pool-C2vvqkle.js"),[]).then(e=>e.default),"../../assets/art/backyard/sprinkler.webp":()=>h(()=>import("./sprinkler-GPjPfQrr.js"),[]).then(e=>e.default),"../../assets/art/backyard/stepping-stones.webp":()=>h(()=>import("./stepping-stones-ByiG5frJ.js"),[]).then(e=>e.default),"../../assets/art/backyard/sun-lounger.webp":()=>h(()=>import("./sun-lounger-CJ0PUVv5.js"),[]).then(e=>e.default),"../../assets/art/backyard/toadstool-light.webp":()=>h(()=>import("./toadstool-light-CIg2fdg_.js"),[]).then(e=>e.default),"../../assets/art/backyard/tulip-bed.webp":()=>h(()=>import("./tulip-bed-VZSHoKAo.js"),[]).then(e=>e.default),"../../assets/art/backyard/veggie-patch.webp":()=>h(()=>import("./veggie-patch-DLXqFE6L.js"),[]).then(e=>e.default),"../../assets/art/backyard/wagon.webp":()=>h(()=>import("./wagon-CbnJhW-K.js"),[]).then(e=>e.default),"../../assets/art/backyard/yard-bench.webp":()=>h(()=>import("./yard-bench-Bp6oh0wx.js"),[]).then(e=>e.default),"../../assets/art/backyard/yard-swing.webp":()=>h(()=>import("./yard-swing-CpKUWWCT.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-mat.webp":()=>h(()=>import("./bath-mat-DLlrRePN.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-mirror.webp":()=>h(()=>import("./bath-mirror-4OfFj8EV.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-stool.webp":()=>h(()=>import("./bath-stool-DqJM8fLh.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-toilet.webp":()=>h(()=>import("./bath-toilet-C2nhunlA.js"),[]).then(e=>e.default),"../../assets/art/bathroom/laundry-hamper.webp":()=>h(()=>import("./laundry-hamper-0OQZcXyH.js"),[]).then(e=>e.default),"../../assets/art/bathroom/rubber-ducky.webp":()=>h(()=>import("./rubber-ducky-pwUm0Pe4.js"),[]).then(e=>e.default),"../../assets/art/bathroom/shower-curtain.webp":()=>h(()=>import("./shower-curtain-UCHNbYT7.js"),[]).then(e=>e.default),"../../assets/art/bathroom/sink-vanity.webp":()=>h(()=>import("./sink-vanity-aUbm9Mix.js"),[]).then(e=>e.default),"../../assets/art/bathroom/soaking-tub.webp":()=>h(()=>import("./soaking-tub-C07Kgt8P.js"),[]).then(e=>e.default),"../../assets/art/bathroom/soap-dish.webp":()=>h(()=>import("./soap-dish-Duoeh42V.js"),[]).then(e=>e.default),"../../assets/art/bathroom/towel-bar.webp":()=>h(()=>import("./towel-bar-fU4SDA3M.js"),[]).then(e=>e.default),"../../assets/art/bedroom/bed.webp":()=>h(()=>import("./bed-CKbzIr1E.js"),[]).then(e=>e.default),"../../assets/art/bedroom/mirror.webp":()=>h(()=>import("./mirror-D5FvkWJA.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~alarm-clock.webp":()=>h(()=>import("./pack~alarm-clock-B1MKtcYc.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bedtime-snack.webp":()=>h(()=>import("./pack~bedtime-snack-CQHBbXTE.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~big-monitor.webp":()=>h(()=>import("./pack~big-monitor-DnY9RO7w.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~big-wardrobe.webp":()=>h(()=>import("./pack~big-wardrobe-DKmYluKF.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~book-stack.webp":()=>h(()=>import("./pack~book-stack-DgPlZ9_3.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bubble-bath.webp":()=>h(()=>import("./pack~bubble-bath-CP64sVml.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bunk-bed.webp":()=>h(()=>import("./pack~bunk-bed-D-NM_ktx.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bunny-slippers.webp":()=>h(()=>import("./pack~bunny-slippers-I8r5WVZt.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~canopy-bed.webp":()=>h(()=>import("./pack~canopy-bed-BpoysMK9.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cat-bed.webp":()=>h(()=>import("./pack~cat-bed-BAS6-rN0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~caterpillar-plush.webp":()=>h(()=>import("./pack~caterpillar-plush-CEbFuatX.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-canopy-daybed.webp":()=>h(()=>import("./pack~cc-canopy-daybed-DoE44IXz.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-cloud-beanbag.webp":()=>h(()=>import("./pack~cc-cloud-beanbag-D0qNEg32.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-cloud-lamp.webp":()=>h(()=>import("./pack~cc-cloud-lamp-DIDpxlMU.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-fairy-garland.webp":()=>h(()=>import("./pack~cc-fairy-garland-CEQT4GTj.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-heart-bed.webp":()=>h(()=>import("./pack~cc-heart-bed-BupJOayJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-jewel-box.webp":()=>h(()=>import("./pack~cc-jewel-box-C-vIsXue.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-reading-nook.webp":()=>h(()=>import("./pack~cc-reading-nook-Ba_6wW4M.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-star-dresser.webp":()=>h(()=>import("./pack~cc-star-dresser-CY3IU_Po.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-window-seat.webp":()=>h(()=>import("./pack~cc-window-seat-CPrwdaeJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~checker-bed.webp":()=>h(()=>import("./pack~checker-bed-Dl1khZwL.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~clothes-rail.webp":()=>h(()=>import("./pack~clothes-rail-DpNxviPS.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cloud-rug.webp":()=>h(()=>import("./pack~cloud-rug-BVi9jYKG.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cloud-shelf.webp":()=>h(()=>import("./pack~cloud-shelf-slqFLmn1.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cork-board.webp":()=>h(()=>import("./pack~cork-board-DWOPEjn8.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~curvy-desk.webp":()=>h(()=>import("./pack~curvy-desk-BDa2yytO.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~daisy-pot.webp":()=>h(()=>import("./pack~daisy-pot-vdUJfXm_.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~desk-mic.webp":()=>h(()=>import("./pack~desk-mic-d9T8n8mE.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~desk.webp":()=>h(()=>import("./pack~desk-C-3AgNRZ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~dino-plush.webp":()=>h(()=>import("./pack~dino-plush-DdqMPHIF.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~doll-house.webp":()=>h(()=>import("./pack~doll-house-CH0M4iJ5.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~dresser.webp":()=>h(()=>import("./pack~dresser-Cws-4Als.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~egg-chair.webp":()=>h(()=>import("./pack~egg-chair-DYGRZPW0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~floor-fan.webp":()=>h(()=>import("./pack~floor-fan-NUw25upr.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~frog-plush.webp":()=>h(()=>import("./pack~frog-plush-Bq4x4dF_.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~game-controller.webp":()=>h(()=>import("./pack~game-controller-CwDKL6zs.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~gaming-chair.webp":()=>h(()=>import("./pack~gaming-chair-Ch-jvTrR.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~guinea-pig.webp":()=>h(()=>import("./pack~guinea-pig-BSQGDcoG.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~hamster-cage.webp":()=>h(()=>import("./pack~hamster-cage-1ZrJIYPk.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~hamster-pet.webp":()=>h(()=>import("./pack~hamster-pet-DO0Nc-ra.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~headphones.webp":()=>h(()=>import("./pack~headphones-BuEyFi9F.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~heart-rug.webp":()=>h(()=>import("./pack~heart-rug-CHsSWFVJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~keyboard.webp":()=>h(()=>import("./pack~keyboard-CpH04NZb.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~lava-lamp.webp":()=>h(()=>import("./pack~lava-lamp-C0yGLXxS.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~moon-night-light.webp":()=>h(()=>import("./pack~moon-night-light-jQgCx363.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~nightstand.webp":()=>h(()=>import("./pack~nightstand-CAZ1Ijk0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~paper-lantern.webp":()=>h(()=>import("./pack~paper-lantern-CBHdnzS2.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~pastel-wardrobe.webp":()=>h(()=>import("./pack~pastel-wardrobe-6p6FbGSg.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~phone-stand.webp":()=>h(()=>import("./pack~phone-stand-DA6FpZ6R.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~piggy-bank.webp":()=>h(()=>import("./pack~piggy-bank-CsgR-O1T.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~plant-stand.webp":()=>h(()=>import("./pack~plant-stand-m1tPlZfP.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~play-tent.webp":()=>h(()=>import("./pack~play-tent-C9Fxa0Rh.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~star-mobile.webp":()=>h(()=>import("./pack~star-mobile-CMLjVRhn.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-chest.webp":()=>h(()=>import("./pack~toy-chest-Bx3rslln.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-robot.webp":()=>h(()=>import("./pack~toy-robot-DuDxaaXx.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-train.webp":()=>h(()=>import("./pack~toy-train-OdPxfMvY.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~unicorn-plush.webp":()=>h(()=>import("./pack~unicorn-plush-1Ml4NpgU.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~vlog-camera.webp":()=>h(()=>import("./pack~vlog-camera-CU7magSa.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wardrobe.webp":()=>h(()=>import("./pack~wardrobe-CnpDMG_i.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wh-dresser.webp":()=>h(()=>import("./pack~wh-dresser-BJJ7U3Ti.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wh-nightstand.webp":()=>h(()=>import("./pack~wh-nightstand-TWRUmwYh.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wood-desk.webp":()=>h(()=>import("./pack~wood-desk-rwE12GqK.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wooden-bed.webp":()=>h(()=>import("./pack~wooden-bed-13S3AiLf.js"),[]).then(e=>e.default),"../../assets/art/bedroom/stars.webp":()=>h(()=>import("./stars-BPD2RlkZ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/story-pillow.webp":()=>h(()=>import("./story-pillow-3KtRY1EI.js"),[]).then(e=>e.default),"../../assets/art/bedroom/teddy.webp":()=>h(()=>import("./teddy-CS3IZCmA.js"),[]).then(e=>e.default),"../../assets/art/bedroom/tub.webp":()=>h(()=>import("./tub-D2ItmFKM.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-bakery-shelf.webp":()=>h(()=>import("./pack~cc-bakery-shelf-C9pglmOD.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-breakfast-table.webp":()=>h(()=>import("./pack~cc-breakfast-table-CqAzN2si.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-bubble-chair.webp":()=>h(()=>import("./pack~cc-bubble-chair-Db6ctGIk.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-cupcake-stand.webp":()=>h(()=>import("./pack~cc-cupcake-stand-ClVhXfMJ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-dryer-chair.webp":()=>h(()=>import("./pack~cc-dryer-chair-BhVjSN-o.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-flower-kettle.webp":()=>h(()=>import("./pack~cc-flower-kettle-T5UeKV0l.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-light-vanity.webp":()=>h(()=>import("./pack~cc-light-vanity-D_F5Ili-.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-macaron-jar.webp":()=>h(()=>import("./pack~cc-macaron-jar-C7OMMZGy.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-mani-chair.webp":()=>h(()=>import("./pack~cc-mani-chair-gE8U4fT9.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-mint-fridge.webp":()=>h(()=>import("./pack~cc-mint-fridge-qv93g_mZ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-pastel-range.webp":()=>h(()=>import("./pack~cc-pastel-range-DEzEnqL9.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-perfume-tray.webp":()=>h(()=>import("./pack~cc-perfume-tray-BOuRtQMQ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-ribbon-mirror.webp":()=>h(()=>import("./pack~cc-ribbon-mirror-DaVelywO.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-teapot-set.webp":()=>h(()=>import("./pack~cc-teapot-set-CYwQRzs2.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~arched-shelf.webp":()=>h(()=>import("./pack~arched-shelf-CKpdbpUV.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~blob-rug.webp":()=>h(()=>import("./pack~blob-rug-DV27jZ4K.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~bubbly-plant.webp":()=>h(()=>import("./pack~bubbly-plant-DaDhjp5G.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~bud-vase.webp":()=>h(()=>import("./pack~bud-vase-BjDwnbex.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~comb-brush.webp":()=>h(()=>import("./pack~comb-brush-2q32lqRM.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~cream-jars.webp":()=>h(()=>import("./pack~cream-jars-DuhIPlDY.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~drop-lamp.webp":()=>h(()=>import("./pack~drop-lamp-CpS9XCXn.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~droplet-buddy.webp":()=>h(()=>import("./pack~droplet-buddy-DgmZ-fU6.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~fancy-sofa.webp":()=>h(()=>import("./pack~fancy-sofa-Cuv4CZ93.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~flower-cart.webp":()=>h(()=>import("./pack~flower-cart-Cpa-qrtx.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~foot-spa.webp":()=>h(()=>import("./pack~foot-spa-CSEQ1rPl.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~globe-pendants.webp":()=>h(()=>import("./pack~globe-pendants-CeBlCiLv.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~glow-mirror.webp":()=>h(()=>import("./pack~glow-mirror-BK53Zp0A.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~gold-floor-mirror.webp":()=>h(()=>import("./pack~gold-floor-mirror-BIgxfU1m.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~hair-dryer.webp":()=>h(()=>import("./pack~hair-dryer-CDTC9I6n.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~heart-plant.webp":()=>h(()=>import("./pack~heart-plant-B-wW-dwX.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~heart-pouf.webp":()=>h(()=>import("./pack~heart-pouf-BbbND0iB.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~lilac-curtain.webp":()=>h(()=>import("./pack~lilac-curtain-CKYxudqA.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~lotion-trio.webp":()=>h(()=>import("./pack~lotion-trio-oJDS-nAk.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~mani-lamp.webp":()=>h(()=>import("./pack~mani-lamp-CIckVWe7.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~nail-table.webp":()=>h(()=>import("./pack~nail-table-DblO1JLs.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pebble-rug.webp":()=>h(()=>import("./pack~pebble-rug-bTJFA8Ur.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~perfume-bottle.webp":()=>h(()=>import("./pack~perfume-bottle-gM_mVBfU.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pink-fountain.webp":()=>h(()=>import("./pack~pink-fountain-Ciur2kZp.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pink-vanity.webp":()=>h(()=>import("./pack~pink-vanity-wGJdTvWK.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~polish-bottle.webp":()=>h(()=>import("./pack~polish-bottle-TyYjJ4KH.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~polish-rack.webp":()=>h(()=>import("./pack~polish-rack-BiHiHzDG.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~reception-desk.webp":()=>h(()=>import("./pack~reception-desk-Bhr61SSS.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~salon-chair.webp":()=>h(()=>import("./pack~salon-chair-B5ARb_Hu.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~scent-candle.webp":()=>h(()=>import("./pack~scent-candle-DhSW37c1.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~spray-bottle.webp":()=>h(()=>import("./pack~spray-bottle-co6Gr0Aw.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~star-wall-sign.webp":()=>h(()=>import("./pack~star-wall-sign-keSh_Cax.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~swivel-stool.webp":()=>h(()=>import("./pack~swivel-stool-gm_rxOWt.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~tiered-tray.webp":()=>h(()=>import("./pack~tiered-tray-CrVkNUF_.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~towel-cart.webp":()=>h(()=>import("./pack~towel-cart-TzS6naxj.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~towel-stack.webp":()=>h(()=>import("./pack~towel-stack-DVE-ZURg.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~vine-planter.webp":()=>h(()=>import("./pack~vine-planter-D6XFbFLe.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~waiting-bench.webp":()=>h(()=>import("./pack~waiting-bench-rf-Lxrnd.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~wash-chair.webp":()=>h(()=>import("./pack~wash-chair-By1PyrJZ.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-candy-bowl.webp":()=>h(()=>import("./pack~hw-candy-bowl-DYzwlwqt.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-cat-statue.webp":()=>h(()=>import("./pack~hw-cat-statue-FQxqUye_.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-cauldron.webp":()=>h(()=>import("./pack~hw-cauldron-CEa-TJHO.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-ghost-sheet.webp":()=>h(()=>import("./pack~hw-ghost-sheet-rc91-ve_.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-hay-bale.webp":()=>h(()=>import("./pack~hw-hay-bale-BbE90YS9.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-heart-pumpkin.webp":()=>h(()=>import("./pack~hw-heart-pumpkin-PfYNpXFo.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-leaf-garland.webp":()=>h(()=>import("./pack~hw-leaf-garland-DpM5QBlC.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-moon-cling.webp":()=>h(()=>import("./pack~hw-moon-cling-CH5pjYPJ.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-moon-lantern.webp":()=>h(()=>import("./pack~hw-moon-lantern-CmD5N0JV.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-star-pumpkin.webp":()=>h(()=>import("./pack~hw-star-pumpkin-WFRvw5za.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-witch-hat.webp":()=>h(()=>import("./pack~hw-witch-hat-q2MY5sg8.js"),[]).then(e=>e.default),"../../assets/art/kitchen/apple.webp":()=>h(()=>import("./apple-CgQUqZtF.js"),[]).then(e=>e.default),"../../assets/art/kitchen/berry-basket.webp":()=>h(()=>import("./berry-basket-D02mck40.js"),[]).then(e=>e.default),"../../assets/art/kitchen/cake.webp":()=>h(()=>import("./cake-D-PUSdV3.js"),[]).then(e=>e.default),"../../assets/art/kitchen/donut.webp":()=>h(()=>import("./donut-D-CyVfCH.js"),[]).then(e=>e.default),"../../assets/art/kitchen/fridge.webp":()=>h(()=>import("./fridge-CPUz39WO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/juice.webp":()=>h(()=>import("./juice-C7d-xViI.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bananas.webp":()=>h(()=>import("./pack~bananas-BaRiiq6m.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bar-stool.webp":()=>h(()=>import("./pack~bar-stool-DoItrBtD.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bread-loaf.webp":()=>h(()=>import("./pack~bread-loaf-DkvGPzQe.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~chick.webp":()=>h(()=>import("./pack~chick-BO9DXErH.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~china-hutch.webp":()=>h(()=>import("./pack~china-hutch-DPrwGSNq.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cocoa-mug.webp":()=>h(()=>import("./pack~cocoa-mug-hzMczJEM.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cookie-jar.webp":()=>h(()=>import("./pack~cookie-jar-DwGPCGTZ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cooking-pot.webp":()=>h(()=>import("./pack~cooking-pot-CfarfMvn.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cupcake.webp":()=>h(()=>import("./pack~cupcake-4s6JCz52.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~dish-rack.webp":()=>h(()=>import("./pack~dish-rack-Dffid-z2.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~fruit-bowl.webp":()=>h(()=>import("./pack~fruit-bowl-S7zdSZud.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~frying-pan.webp":()=>h(()=>import("./pack~frying-pan-BibqhFDJ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~happy-fridge.webp":()=>h(()=>import("./pack~happy-fridge-HnFXofL6.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~herb-box.webp":()=>h(()=>import("./pack~herb-box-DjQ-1q5D.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~high-chair.webp":()=>h(()=>import("./pack~high-chair-24NInnaO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~ice-cream.webp":()=>h(()=>import("./pack~ice-cream-rdopj06A.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kettle.webp":()=>h(()=>import("./pack~kettle-ByDzqkyg.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kitchen-counter.webp":()=>h(()=>import("./pack~kitchen-counter-B7uMIWhT.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kitchen-sink.webp":()=>h(()=>import("./pack~kitchen-sink-DyICEjEC.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~lemon-tree.webp":()=>h(()=>import("./pack~lemon-tree-B8bzBxaO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~microwave.webp":()=>h(()=>import("./pack~microwave-B6anYgBg.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~milk-bottle.webp":()=>h(()=>import("./pack~milk-bottle-CKMei0uX.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pancakes.webp":()=>h(()=>import("./pack~pancakes-BmuT40In.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pantry-shelf.webp":()=>h(()=>import("./pack~pantry-shelf-0EpJaISh.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pendant-lamp.webp":()=>h(()=>import("./pack~pendant-lamp-BRmz1TSb.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pet-bowl.webp":()=>h(()=>import("./pack~pet-bowl-bLDcshyX.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~rice-cooker.webp":()=>h(()=>import("./pack~rice-cooker-j9bjO2OS.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~runner-rug.webp":()=>h(()=>import("./pack~runner-rug-DgsAHdwM.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~spice-rack.webp":()=>h(()=>import("./pack~spice-rack-5CIyihfN.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~stand-mixer.webp":()=>h(()=>import("./pack~stand-mixer-DVs9icnQ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~teapot.webp":()=>h(()=>import("./pack~teapot-Clbuel00.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~toaster.webp":()=>h(()=>import("./pack~toaster-0CdrvAn6.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~utensil-rail.webp":()=>h(()=>import("./pack~utensil-rail-7lJosKxj.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~watermelon-slice.webp":()=>h(()=>import("./pack~watermelon-slice-DDNYgh1a.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pizza.webp":()=>h(()=>import("./pizza-CBn4rlbT.js"),[]).then(e=>e.default),"../../assets/art/kitchen/stove.webp":()=>h(()=>import("./stove-EEI-cSzf.js"),[]).then(e=>e.default),"../../assets/art/living/_pop~cada-mouse.webp":()=>h(()=>Promise.resolve().then(()=>$4),void 0).then(e=>e.default),"../../assets/art/living/_pop~quinn-pup.webp":()=>h(()=>Promise.resolve().then(()=>x4),void 0).then(e=>e.default),"../../assets/art/living/_pop~sloane-snail.webp":()=>h(()=>Promise.resolve().then(()=>M4),void 0).then(e=>e.default),"../../assets/art/living/bunny.webp":()=>h(()=>import("./bunny-PYkx6Ie3.js"),[]).then(e=>e.default),"../../assets/art/living/cactus.webp":()=>h(()=>import("./cactus-CNbOypby.js"),[]).then(e=>e.default),"../../assets/art/living/cat-tower.webp":()=>h(()=>import("./cat-tower-BTX9_pA4.js"),[]).then(e=>e.default),"../../assets/art/living/cat.webp":()=>h(()=>import("./cat-CkF-5Moc.js"),[]).then(e=>e.default),"../../assets/art/living/dog.webp":()=>h(()=>import("./dog-XsW5t_fN.js"),[]).then(e=>e.default),"../../assets/art/living/egg~cada-mouse.webp":()=>h(()=>import("./egg~cada-mouse-CahQlh-m.js"),[]).then(e=>e.default),"../../assets/art/living/egg~chloe-starlamp.webp":()=>h(()=>import("./egg~chloe-starlamp-pq_Iclzu.js"),[]).then(e=>e.default),"../../assets/art/living/egg~quinn-pup.webp":()=>h(()=>import("./egg~quinn-pup-BqdUFpbv.js"),[]).then(e=>e.default),"../../assets/art/living/egg~reagan-frame.webp":()=>h(()=>import("./egg~reagan-frame-BWp9N6ej.js"),[]).then(e=>e.default),"../../assets/art/living/egg~sloane-snail.webp":()=>h(()=>import("./egg~sloane-snail-DsDMZRR7.js"),[]).then(e=>e.default),"../../assets/art/living/fish.webp":()=>h(()=>import("./fish-Cs1FEzIZ.js"),[]).then(e=>e.default),"../../assets/art/living/floor-cushion.webp":()=>h(()=>import("./floor-cushion-D7ewX4dX.js"),[]).then(e=>e.default),"../../assets/art/living/flowers.webp":()=>h(()=>import("./flowers-CHLFwDXa.js"),[]).then(e=>e.default),"../../assets/art/living/kennel.webp":()=>h(()=>import("./kennel-iNvQ28eh.js"),[]).then(e=>e.default),"../../assets/art/living/pack~acorn-friend.webp":()=>h(()=>import("./pack~acorn-friend-Bm4Hk12h.js"),[]).then(e=>e.default),"../../assets/art/living/pack~aquarium.webp":()=>h(()=>import("./pack~aquarium-D0sUglTr.js"),[]).then(e=>e.default),"../../assets/art/living/pack~arc-floor-lamp.webp":()=>h(()=>import("./pack~arc-floor-lamp-7GCaGkDs.js"),[]).then(e=>e.default),"../../assets/art/living/pack~bean-bag.webp":()=>h(()=>Promise.resolve().then(()=>US),void 0).then(e=>e.default),"../../assets/art/living/pack~bird-cage.webp":()=>h(()=>import("./pack~bird-cage-CLlPQlCF.js"),[]).then(e=>e.default),"../../assets/art/living/pack~blanket-basket.webp":()=>h(()=>import("./pack~blanket-basket-Clw-jcOi.js"),[]).then(e=>e.default),"../../assets/art/living/pack~box-stack.webp":()=>h(()=>import("./pack~box-stack-DV3Ljobv.js"),[]).then(e=>e.default),"../../assets/art/living/pack~brick-fireplace.webp":()=>h(()=>import("./pack~brick-fireplace-CU641OC1.js"),[]).then(e=>e.default),"../../assets/art/living/pack~building-blocks.webp":()=>h(()=>import("./pack~building-blocks-C0yT9TvM.js"),[]).then(e=>e.default),"../../assets/art/living/pack~bulletin-board.webp":()=>h(()=>import("./pack~bulletin-board-BCXiWqVp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cactus-buddy.webp":()=>h(()=>import("./pack~cactus-buddy-2_JfEHKl.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-cottage-aquarium.webp":()=>h(()=>import("./pack~cc-cottage-aquarium-C8NYhmrd.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-fairy-shelf.webp":()=>h(()=>import("./pack~cc-fairy-shelf-CnHOFSRs.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-flower-lamp.webp":()=>h(()=>import("./pack~cc-flower-lamp-wbPhnbQ_.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-clock.webp":()=>h(()=>import("./pack~cc-heart-clock-jr4MzVW9.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-pouf.webp":()=>h(()=>import("./pack~cc-heart-pouf-BPM9YsrB.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-rug.webp":()=>h(()=>import("./pack~cc-heart-rug-BVKJ0cQB.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-macrame-swing.webp":()=>h(()=>import("./pack~cc-macrame-swing-pWIX7Xk-.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-mushroom-stool.webp":()=>h(()=>import("./pack~cc-mushroom-stool-CMlvAjd6.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-petal-table.webp":()=>h(()=>import("./pack~cc-petal-table-7S1s7yzK.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-plant-wall.webp":()=>h(()=>import("./pack~cc-plant-wall-p6D9EEBb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-record-player.webp":()=>h(()=>import("./pack~cc-record-player-BRAifeEK.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-scallop-curtains.webp":()=>h(()=>import("./pack~cc-scallop-curtains-BeV7rdPo.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-scallop-loveseat.webp":()=>h(()=>import("./pack~cc-scallop-loveseat-_AoDnFXb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~checker-rug.webp":()=>h(()=>import("./pack~checker-rug-Cp2IkzoS.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cloud-sofa.webp":()=>h(()=>import("./pack~cloud-sofa-DyBmuzAg.js"),[]).then(e=>e.default),"../../assets/art/living/pack~coffee-table.webp":()=>h(()=>import("./pack~coffee-table-DPuXhspW.js"),[]).then(e=>e.default),"../../assets/art/living/pack~comfy-armchair.webp":()=>h(()=>import("./pack~comfy-armchair-CJDG30Cj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cream-sofa.webp":()=>h(()=>import("./pack~cream-sofa-Ez2miUnO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cubby-shelf.webp":()=>h(()=>import("./pack~cubby-shelf-BUMGU8Jh.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cube-shelf.webp":()=>h(()=>import("./pack~cube-shelf-D5D2Dw5S.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cute-speaker.webp":()=>h(()=>import("./pack~cute-speaker-jTqsaV2I.js"),[]).then(e=>e.default),"../../assets/art/living/pack~daisy-rug.webp":()=>h(()=>import("./pack~daisy-rug-BCUkj5ia.js"),[]).then(e=>e.default),"../../assets/art/living/pack~desk-lamp.webp":()=>h(()=>import("./pack~desk-lamp-DmCKofr2.js"),[]).then(e=>e.default),"../../assets/art/living/pack~fiddle-leaf-fig.webp":()=>h(()=>import("./pack~fiddle-leaf-fig-D7FML9mx.js"),[]).then(e=>e.default),"../../assets/art/living/pack~fireplace.webp":()=>h(()=>import("./pack~fireplace-DYp6BN4M.js"),[]).then(e=>e.default),"../../assets/art/living/pack~flower-lamp.webp":()=>h(()=>import("./pack~flower-lamp-kPf9KBh-.js"),[]).then(e=>e.default),"../../assets/art/living/pack~glass-cabinet.webp":()=>h(()=>import("./pack~glass-cabinet-B9JOaE-O.js"),[]).then(e=>e.default),"../../assets/art/living/pack~globe.webp":()=>h(()=>import("./pack~globe-Df4aJX14.js"),[]).then(e=>e.default),"../../assets/art/living/pack~hanging-lantern.webp":()=>h(()=>import("./pack~hanging-lantern-CSb5_y-t.js"),[]).then(e=>e.default),"../../assets/art/living/pack~hanging-planter.webp":()=>h(()=>import("./pack~hanging-planter-BXNCa3po.js"),[]).then(e=>e.default),"../../assets/art/living/pack~heart-light.webp":()=>h(()=>import("./pack~heart-light-BMZQFtcT.js"),[]).then(e=>e.default),"../../assets/art/living/pack~knit-cushion.webp":()=>h(()=>import("./pack~knit-cushion-DzpDb6hm.js"),[]).then(e=>e.default),"../../assets/art/living/pack~ladder-shelf.webp":()=>h(()=>import("./pack~ladder-shelf-CLOcbyxp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~landscape-art.webp":()=>h(()=>import("./pack~landscape-art-DiJEigPf.js"),[]).then(e=>e.default),"../../assets/art/living/pack~lattice-bench.webp":()=>h(()=>import("./pack~lattice-bench-0G6hKZYj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~leaf-wreath.webp":()=>h(()=>import("./pack~leaf-wreath-WJ1hv4SR.js"),[]).then(e=>e.default),"../../assets/art/living/pack~monstera-plant.webp":()=>h(()=>import("./pack~monstera-plant-BE84EAw8.js"),[]).then(e=>e.default),"../../assets/art/living/pack~moving-box.webp":()=>h(()=>import("./pack~moving-box-CAe2Xeia.js"),[]).then(e=>e.default),"../../assets/art/living/pack~piano.webp":()=>h(()=>import("./pack~piano-C2g19n4Y.js"),[]).then(e=>e.default),"../../assets/art/living/pack~popcorn.webp":()=>h(()=>import("./pack~popcorn-B6n0yaX2.js"),[]).then(e=>e.default),"../../assets/art/living/pack~pothos-plant.webp":()=>h(()=>import("./pack~pothos-plant-CTHDCuIc.js"),[]).then(e=>e.default),"../../assets/art/living/pack~pouf.webp":()=>h(()=>import("./pack~pouf-BJ-teA6I.js"),[]).then(e=>e.default),"../../assets/art/living/pack~puffy-stool.webp":()=>h(()=>import("./pack~puffy-stool-D38tkWnm.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rainbow-rug.webp":()=>h(()=>import("./pack~rainbow-rug-DUV6gUsN.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rainbow-wall-art.webp":()=>h(()=>import("./pack~rainbow-wall-art--boV5icC.js"),[]).then(e=>e.default),"../../assets/art/living/pack~retro-radio.webp":()=>h(()=>import("./pack~retro-radio-CDLK9pHp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~ring-light.webp":()=>h(()=>import("./pack~ring-light-C3E9VDAl.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rocking-chair.webp":()=>h(()=>import("./pack~rocking-chair-B2p2ReQc.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rocking-horse.webp":()=>h(()=>import("./pack~rocking-horse-CswTc134.js"),[]).then(e=>e.default),"../../assets/art/living/pack~round-rug.webp":()=>h(()=>import("./pack~round-rug-CHSVB2Aw.js"),[]).then(e=>e.default),"../../assets/art/living/pack~side-table-round.webp":()=>h(()=>import("./pack~side-table-round-CP96FSiO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~snake-plant.webp":()=>h(()=>import("./pack~snake-plant-DawlmINM.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sprout-pot.webp":()=>h(()=>import("./pack~sprout-pot-Dx8LI8dH.js"),[]).then(e=>e.default),"../../assets/art/living/pack~star-lamp.webp":()=>h(()=>import("./pack~star-lamp-s9PtqFmZ.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sticker-board.webp":()=>h(()=>import("./pack~sticker-board--TDZ7ozq.js"),[]).then(e=>e.default),"../../assets/art/living/pack~string-lights.webp":()=>h(()=>import("./pack~string-lights-HZXr5sUd.js"),[]).then(e=>e.default),"../../assets/art/living/pack~stripe-runner.webp":()=>h(()=>import("./pack~stripe-runner-B0fRj7Re.js"),[]).then(e=>e.default),"../../assets/art/living/pack~succulent-trio.webp":()=>h(()=>import("./pack~succulent-trio-M7abHPiA.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sunny-art.webp":()=>h(()=>import("./pack~sunny-art-D2_v9d4h.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sv-bean-bag.webp":()=>h(()=>Promise.resolve().then(()=>zS),void 0).then(e=>e.default),"../../assets/art/living/pack~sv-cloud-rug.webp":()=>h(()=>import("./pack~sv-cloud-rug-DBeaYhY1.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sv-wall-shelf.webp":()=>h(()=>import("./pack~sv-wall-shelf-CE0YAWvX.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tassel-rug.webp":()=>h(()=>import("./pack~tassel-rug-C3GgXPyZ.js"),[]).then(e=>e.default),"../../assets/art/living/pack~throw-pillow.webp":()=>h(()=>import("./pack~throw-pillow-BUguyBcj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~toy-car.webp":()=>h(()=>import("./pack~toy-car-DZ6BYQDO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~trailing-plant.webp":()=>h(()=>import("./pack~trailing-plant-BJ2rTgvE.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tulip-vase.webp":()=>h(()=>import("./pack~tulip-vase-CmyisqxG.js"),[]).then(e=>e.default),"../../assets/art/living/pack~turtle.webp":()=>h(()=>import("./pack~turtle-FaBzuoqb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tv-stand.webp":()=>h(()=>import("./pack~tv-stand-C8gC4UFW.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wall-clock.webp":()=>h(()=>import("./pack~wall-clock-D7PdTom6.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wall-shelf.webp":()=>h(()=>import("./pack~wall-shelf-C1lRJ7GC.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wavy-floor-lamp.webp":()=>h(()=>import("./pack~wavy-floor-lamp-BL00MuGA.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-arc-floor-lamp.webp":()=>h(()=>import("./pack~wh-arc-floor-lamp-B6QVftZN.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-book-stack.webp":()=>h(()=>import("./pack~wh-book-stack-Dwcz23qo.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-fiddle-leaf-fig.webp":()=>h(()=>import("./pack~wh-fiddle-leaf-fig-COFk3BJw.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-pendant-lamp.webp":()=>h(()=>import("./pack~wh-pendant-lamp-Dd4mFEDS.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-snake-plant.webp":()=>h(()=>import("./pack~wh-snake-plant-D-C6ZJKO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-string-lights.webp":()=>h(()=>import("./pack~wh-string-lights-D0MBhT1M.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-armchair.webp":()=>h(()=>import("./pack~wood-armchair-DHvcj8Mx.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-bookshelf.webp":()=>h(()=>import("./pack~wood-bookshelf-sxaV4CyF.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-coffee-table.webp":()=>h(()=>import("./pack~wood-coffee-table-CrSb-1Xv.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-stool.webp":()=>h(()=>import("./pack~wood-stool-JjUX_8W2.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-bouquet.webp":()=>h(()=>import("./ranch-bouquet-LHbKbTej.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-carrot.webp":()=>h(()=>import("./ranch-carrot-cyry77wX.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-egg.webp":()=>h(()=>import("./ranch-egg-CYsNXUKY.js"),[]).then(e=>e.default),"../../assets/art/living/tree.webp":()=>h(()=>import("./tree-CXYySnAy.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby-bottle.webp":()=>h(()=>import("./baby-bottle-40H4PprS.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby-shelf.webp":()=>h(()=>import("./baby-shelf--dhe-OtF.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby.webp":()=>h(()=>import("./baby-Cjy_lAi1.js"),[]).then(e=>e.default),"../../assets/art/nursery/bassinet.webp":()=>h(()=>import("./bassinet-D1E3rjcm.js"),[]).then(e=>e.default),"../../assets/art/nursery/blocks.webp":()=>h(()=>import("./blocks-CtsB78Ug.js"),[]).then(e=>e.default),"../../assets/art/nursery/bunny-plush.webp":()=>h(()=>import("./bunny-plush-9_hTWSJ0.js"),[]).then(e=>e.default),"../../assets/art/nursery/changing-table.webp":()=>h(()=>import("./changing-table-DKyI_wrV.js"),[]).then(e=>e.default),"../../assets/art/nursery/cloud-rug.webp":()=>h(()=>import("./cloud-rug-BvUUbOnx.js"),[]).then(e=>e.default),"../../assets/art/nursery/crib-mobile.webp":()=>h(()=>import("./crib-mobile-BvlX6u0a.js"),[]).then(e=>e.default),"../../assets/art/nursery/crib.webp":()=>h(()=>import("./crib-Do3izZrw.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-cocoa.webp":()=>h(()=>import("./doll-cocoa-ypqLIm4M.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-honey.webp":()=>h(()=>import("./doll-honey-Dc51Fmwm.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-rose.webp":()=>h(()=>import("./doll-rose-DTSDlFkK.js"),[]).then(e=>e.default),"../../assets/art/nursery/moon-art.webp":()=>h(()=>import("./moon-art-DQbuFa-d.js"),[]).then(e=>e.default),"../../assets/art/nursery/music-box.webp":()=>h(()=>import("./music-box-DKDLmINu.js"),[]).then(e=>e.default),"../../assets/art/nursery/night-light.webp":()=>h(()=>import("./night-light-lryf6NaK.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-curtains.webp":()=>h(()=>import("./nursery-curtains-Ds4ZTC1C.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-dresser.webp":()=>h(()=>import("./nursery-dresser-DbmVYgde.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-lamp.webp":()=>h(()=>import("./nursery-lamp-pqbkf92r.js"),[]).then(e=>e.default),"../../assets/art/nursery/play-mat.webp":()=>h(()=>import("./play-mat-fGBMoW0r.js"),[]).then(e=>e.default),"../../assets/art/nursery/rattle.webp":()=>h(()=>import("./rattle-EzXp43O4.js"),[]).then(e=>e.default),"../../assets/art/nursery/rocker.webp":()=>h(()=>import("./rocker-BieX4wIy.js"),[]).then(e=>e.default),"../../assets/art/nursery/rocking-horse.webp":()=>h(()=>import("./rocking-horse-BK9_A5ep.js"),[]).then(e=>e.default),"../../assets/art/nursery/stacking-rings.webp":()=>h(()=>import("./stacking-rings-8Z2fYLIi.js"),[]).then(e=>e.default),"../../assets/art/nursery/toy-bin.webp":()=>h(()=>import("./toy-bin-CuORRSkX.js"),[]).then(e=>e.default),"../../assets/art/pets/cat-calico-nap.webp":()=>h(()=>Promise.resolve().then(()=>EM),void 0).then(e=>e.default),"../../assets/art/pets/cat-calico-sit.webp":()=>h(()=>Promise.resolve().then(()=>SM),void 0).then(e=>e.default),"../../assets/art/pets/cat-calico-stand.webp":()=>h(()=>Promise.resolve().then(()=>TM),void 0).then(e=>e.default),"../../assets/art/pets/cat-smokey-nap.webp":()=>h(()=>Promise.resolve().then(()=>PM),void 0).then(e=>e.default),"../../assets/art/pets/cat-smokey-sit.webp":()=>h(()=>Promise.resolve().then(()=>AM),void 0).then(e=>e.default),"../../assets/art/pets/cat-smokey-stand.webp":()=>h(()=>Promise.resolve().then(()=>RM),void 0).then(e=>e.default),"../../assets/art/pets/cat-tabby-nap.webp":()=>h(()=>Promise.resolve().then(()=>CM),void 0).then(e=>e.default),"../../assets/art/pets/cat-tabby-sit.webp":()=>h(()=>Promise.resolve().then(()=>IM),void 0).then(e=>e.default),"../../assets/art/pets/cat-tabby-stand.webp":()=>h(()=>Promise.resolve().then(()=>BM),void 0).then(e=>e.default),"../../assets/art/pets/cat-tuxedo-nap.webp":()=>h(()=>Promise.resolve().then(()=>OM),void 0).then(e=>e.default),"../../assets/art/pets/cat-tuxedo-sit.webp":()=>h(()=>Promise.resolve().then(()=>DM),void 0).then(e=>e.default),"../../assets/art/pets/cat-tuxedo-stand.webp":()=>h(()=>Promise.resolve().then(()=>HM),void 0).then(e=>e.default),"../../assets/art/pets/dog-dachshund-sit.webp":()=>h(()=>Promise.resolve().then(()=>WM),void 0).then(e=>e.default),"../../assets/art/pets/dog-dachshund-sleep.webp":()=>h(()=>Promise.resolve().then(()=>VM),void 0).then(e=>e.default),"../../assets/art/pets/dog-dachshund-stand.webp":()=>h(()=>Promise.resolve().then(()=>UM),void 0).then(e=>e.default),"../../assets/art/pets/dog-golden-sit.webp":()=>h(()=>Promise.resolve().then(()=>zM),void 0).then(e=>e.default),"../../assets/art/pets/dog-golden-sleep.webp":()=>h(()=>Promise.resolve().then(()=>QM),void 0).then(e=>e.default),"../../assets/art/pets/dog-golden-stand.webp":()=>h(()=>Promise.resolve().then(()=>NM),void 0).then(e=>e.default),"../../assets/art/pets/dog-poodle-sit.webp":()=>h(()=>Promise.resolve().then(()=>qM),void 0).then(e=>e.default),"../../assets/art/pets/dog-poodle-sleep.webp":()=>h(()=>Promise.resolve().then(()=>FM),void 0).then(e=>e.default),"../../assets/art/pets/dog-poodle-stand.webp":()=>h(()=>Promise.resolve().then(()=>jM),void 0).then(e=>e.default),"../../assets/art/pets/dog-pup-sit.webp":()=>h(()=>Promise.resolve().then(()=>ZM),void 0).then(e=>e.default),"../../assets/art/pets/dog-pup-sleep.webp":()=>h(()=>Promise.resolve().then(()=>GM),void 0).then(e=>e.default),"../../assets/art/pets/dog-pup-stand.webp":()=>h(()=>Promise.resolve().then(()=>YM),void 0).then(e=>e.default),"../../assets/art/pets/dog-spotty-sit.webp":()=>h(()=>Promise.resolve().then(()=>KM),void 0).then(e=>e.default),"../../assets/art/pets/dog-spotty-sleep.webp":()=>h(()=>Promise.resolve().then(()=>XM),void 0).then(e=>e.default),"../../assets/art/pets/dog-spotty-stand.webp":()=>h(()=>Promise.resolve().then(()=>JM),void 0).then(e=>e.default),"../../assets/art/ranch/animal-bunny.webp":()=>h(()=>Promise.resolve().then(()=>eL),void 0).then(e=>e.default),"../../assets/art/ranch/animal-cow.webp":()=>h(()=>Promise.resolve().then(()=>tL),void 0).then(e=>e.default),"../../assets/art/ranch/animal-goat.webp":()=>h(()=>Promise.resolve().then(()=>nL),void 0).then(e=>e.default),"../../assets/art/ranch/animal-piglet.webp":()=>h(()=>Promise.resolve().then(()=>sL),void 0).then(e=>e.default),"../../assets/art/ranch/animal-sheep.webp":()=>h(()=>Promise.resolve().then(()=>oL),void 0).then(e=>e.default),"../../assets/art/ranch/apple-tree.webp":()=>h(()=>Promise.resolve().then(()=>iL),void 0).then(e=>e.default),"../../assets/art/ranch/basket.webp":()=>h(()=>Promise.resolve().then(()=>aL),void 0).then(e=>e.default),"../../assets/art/ranch/hen-house.webp":()=>h(()=>Promise.resolve().then(()=>rL),void 0).then(e=>e.default),"../../assets/art/ranch/horse-chestnut-bare.webp":()=>h(()=>Promise.resolve().then(()=>lL),void 0).then(e=>e.default),"../../assets/art/ranch/horse-chestnut-saddle.webp":()=>h(()=>Promise.resolve().then(()=>cL),void 0).then(e=>e.default),"../../assets/art/ranch/horse-midnight-bare.webp":()=>h(()=>Promise.resolve().then(()=>dL),void 0).then(e=>e.default),"../../assets/art/ranch/horse-midnight-saddle.webp":()=>h(()=>Promise.resolve().then(()=>fL),void 0).then(e=>e.default),"../../assets/art/ranch/horse-rainbow-bare.webp":()=>h(()=>Promise.resolve().then(()=>hL),void 0).then(e=>e.default),"../../assets/art/ranch/horse-rainbow-saddle.webp":()=>h(()=>Promise.resolve().then(()=>uL),void 0).then(e=>e.default),"../../assets/art/ranch/horse-snowy-bare.webp":()=>h(()=>Promise.resolve().then(()=>pL),void 0).then(e=>e.default),"../../assets/art/ranch/horse-snowy-saddle.webp":()=>h(()=>Promise.resolve().then(()=>gL),void 0).then(e=>e.default),"../../assets/art/ranch/horse-sunny-bare.webp":()=>h(()=>Promise.resolve().then(()=>mL),void 0).then(e=>e.default),"../../assets/art/ranch/horse-sunny-saddle.webp":()=>h(()=>Promise.resolve().then(()=>yL),void 0).then(e=>e.default),"../../assets/art/ranch/tractor.webp":()=>h(()=>Promise.resolve().then(()=>bL),void 0).then(e=>e.default),"../../assets/art/salon/hairdryer.webp":()=>h(()=>import("./hairdryer-BK3-NMh8.js"),[]).then(e=>e.default),"../../assets/art/salon/perfume.webp":()=>h(()=>import("./perfume-CCbV6-cE.js"),[]).then(e=>e.default),"../../assets/art/salon/polish.webp":()=>h(()=>import("./polish-Ch0EUf5y.js"),[]).then(e=>e.default),"../../assets/art/salon/ribbon-tray.webp":()=>h(()=>import("./ribbon-tray-DBUlSLAS.js"),[]).then(e=>e.default),"../../assets/art/salon/stool.webp":()=>h(()=>import("./stool-SBbn3Fq_.js"),[]).then(e=>e.default),"../../assets/art/salon/vanity.webp":()=>h(()=>import("./vanity-COm_EF9W.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~arched-mirror.webp":()=>h(()=>import("./pack~arched-mirror-FzcrWxa4.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~boba-cup.webp":()=>h(()=>import("./pack~boba-cup-DO0lCjCc.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~mini-fridge.webp":()=>h(()=>import("./pack~mini-fridge-DxF_-Si1.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~apple-tree.webp":()=>h(()=>import("./pack~apple-tree-BO7hFW66.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~cozy-mug.webp":()=>h(()=>import("./pack~cozy-mug-CL5TNVre.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~fire-pit.webp":()=>h(()=>import("./pack~fire-pit-CbfQWRzg.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~mini-greenhouse.webp":()=>h(()=>import("./pack~mini-greenhouse-Cgb6BHcc.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~picnic-basket.webp":()=>h(()=>import("./pack~picnic-basket-BZmSi61Z.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~sale-sign.webp":()=>h(()=>import("./pack~sale-sign-CNZEWdis.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~wh-kitchen-counter.webp":()=>h(()=>import("./pack~wh-kitchen-counter-BK3WsTw8.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~wh-teapot.webp":()=>h(()=>import("./pack~wh-teapot-C2xpf3Kz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-bauble-garland.webp":()=>h(()=>import("./pack~wc-bauble-garland-Bsv6snBW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-berry-wreath.webp":()=>h(()=>import("./pack~wc-berry-wreath-DwqWJGm0.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-birch-basket.webp":()=>h(()=>import("./pack~wc-birch-basket-Ck1MjTPW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cabin-picture.webp":()=>h(()=>import("./pack~wc-cabin-picture-Bo_qKFlZ.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-candle-trio.webp":()=>h(()=>import("./pack~wc-candle-trio-33RcvYK5.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cane-lamp.webp":()=>h(()=>import("./pack~wc-cane-lamp-BD2V2gLm.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cinnamon-tray.webp":()=>h(()=>import("./pack~wc-cinnamon-tray-Cy2cPyEY.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-cart.webp":()=>h(()=>import("./pack~wc-cocoa-cart-BwlPCBQR.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-mug.webp":()=>h(()=>import("./pack~wc-cocoa-mug-Cpad5gyz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-pot.webp":()=>h(()=>import("./pack~wc-cocoa-pot-CqjSzuIA.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cookie-oven.webp":()=>h(()=>import("./pack~wc-cookie-oven-AeTBKAqH.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cookie-plate.webp":()=>h(()=>import("./pack~wc-cookie-plate-Db4_27lp.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-frost-bookcase.webp":()=>h(()=>import("./pack~wc-frost-bookcase-ChH_Zc5-.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-frosted-pine.webp":()=>h(()=>import("./pack~wc-frosted-pine-BaL421Eq.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-fur-bench.webp":()=>h(()=>import("./pack~wc-fur-bench-BHy7RvLc.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-gingerbread-village.webp":()=>h(()=>import("./pack~wc-gingerbread-village-CXGNXY4G.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-gingerbread.webp":()=>h(()=>import("./pack~wc-gingerbread-BH26TMqz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-globe-lamp.webp":()=>h(()=>import("./pack~wc-globe-lamp-FQWUqV9q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-holiday-tree.webp":()=>h(()=>import("./pack~wc-holiday-tree-Dc9RLa8q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-holly.webp":()=>h(()=>import("./pack~wc-holly-Ddsa-Msy.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-ice-skates.webp":()=>h(()=>import("./pack~wc-ice-skates-CerfMu-3.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-ice-wardrobe.webp":()=>h(()=>import("./pack~wc-ice-wardrobe-Dk8v_MKI.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-knit-armchair.webp":()=>h(()=>import("./pack~wc-knit-armchair-p4nAzHXW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-lantern.webp":()=>h(()=>import("./pack~wc-lantern-rRWK8g8l.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-log-bench.webp":()=>h(()=>import("./pack~wc-log-bench-Djm76jnh.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-marshmallow-jar.webp":()=>h(()=>import("./pack~wc-marshmallow-jar-BiG_u42k.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mitten-line.webp":()=>h(()=>import("./pack~wc-mitten-line-BbhTynIV.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mitten-ottoman.webp":()=>h(()=>import("./pack~wc-mitten-ottoman-q05Rsc6B.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mug-shelf.webp":()=>h(()=>import("./pack~wc-mug-shelf-CeUbCPsi.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-nutcracker.webp":()=>h(()=>import("./pack~wc-nutcracker-DlEeuUgj.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-penguin-chair.webp":()=>h(()=>import("./pack~wc-penguin-chair-ARRfWJYR.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-penguin-plush.webp":()=>h(()=>import("./pack~wc-penguin-plush-w9LiHlOM.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-peppermint-counter.webp":()=>h(()=>import("./pack~wc-peppermint-counter-Cq5SRRi_.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-peppermint-rug.webp":()=>h(()=>import("./pack~wc-peppermint-rug-DjPM1BL2.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pinecone-garland.webp":()=>h(()=>import("./pack~wc-pinecone-garland-DV4Ijs5E.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pinecone-table.webp":()=>h(()=>import("./pack~wc-pinecone-table-CzULQj_N.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-plaid-bed.webp":()=>h(()=>import("./pack~wc-plaid-bed-ZVDIbe1Y.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-plaid-sofa.webp":()=>h(()=>import("./pack~wc-plaid-sofa-BaoM0h7H.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-poinsettia.webp":()=>h(()=>import("./pack~wc-poinsettia-DNdNw7QZ.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-polar-plush.webp":()=>h(()=>import("./pack~wc-polar-plush-Cz2NxU-X.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pom-rug.webp":()=>h(()=>import("./pack~wc-pom-rug-Zyeq7bwG.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-present-stack.webp":()=>h(()=>import("./pack~wc-present-stack-B09Rx_MO.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-reindeer.webp":()=>h(()=>import("./pack~wc-reindeer-DTWaMJXV.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sled-table.webp":()=>h(()=>import("./pack~wc-sled-table-BNH48Wur.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sleigh-planter.webp":()=>h(()=>import("./pack~wc-sleigh-planter-B3DNwK0i.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-globe.webp":()=>h(()=>import("./pack~wc-snow-globe-C9bft1_W.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-mobile.webp":()=>h(()=>import("./pack~wc-snow-mobile-JM0Q-i3v.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-nightstand.webp":()=>h(()=>import("./pack~wc-snow-nightstand-Bqay9NoW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-window.webp":()=>h(()=>import("./pack~wc-snow-window-DCwNoisx.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snowman.webp":()=>h(()=>import("./pack~wc-snowman-Z8FnDuXK.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snowshoes.webp":()=>h(()=>import("./pack~wc-snowshoes-Bux5zjz7.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sock-hamper.webp":()=>h(()=>import("./pack~wc-sock-hamper-IDMi8Oc3.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-star-topper.webp":()=>h(()=>import("./pack~wc-star-topper-CxhOrJOb.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-stocking-row.webp":()=>h(()=>import("./pack~wc-stocking-row-DRCxX9NW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-stone-hearth.webp":()=>h(()=>import("./pack~wc-stone-hearth-BIaBCxMx.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-twinkle-lamp.webp":()=>h(()=>import("./pack~wc-twinkle-lamp-3aXfb0Du.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-twinkle-string.webp":()=>h(()=>import("./pack~wc-twinkle-string-D1fw8i7q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-window-seat.webp":()=>h(()=>import("./pack~wc-window-seat-bNQT817S.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-woodstove.webp":()=>h(()=>import("./pack~wc-woodstove-BcUTK7y-.js"),[]).then(e=>e.default)});function jf(e){const t=e.split("/").pop()||"";if(t.length<6||t.slice(-5).toLowerCase()!==".webp")return null;const n=decodeURIComponent(t.slice(0,-5)).replace(/~/g,":");return!n||n.startsWith("_")?null:n}const Mg=new Set;for(const e in Gr){const t=jf(e);t&&Mg.add(t)}function Xv(e){return Mg.has(e)}const Ec=new Map;function Jv(e){for(const t in Gr)if(jf(t)===e)return Gr[t]}const e4=6e4,Sc=new Map;function t4(e){const t=Ec.get(e);if(t)return t;const n=Sc.get(e);if(n!==void 0&&Date.now()-n<e4)return Promise.resolve(null);const s=Jv(e);if(!s)return Promise.resolve(null);const o=Os(s).then(i=>(Sc.delete(e),Fv(e,i),e)).catch(()=>(Ec.delete(e),Sc.set(e,Date.now()),null));return Ec.set(e,o),o}function Ql(e){const t=[...new Set(e)];return Promise.all(t.map(t4)).then(n=>n.filter(s=>s!==null))}function n4(){const e=[];for(const t in Gr){const n=jf(t);n&&e.push(n)}return Ql(e)}function s4(e,t=[]){return jv(e)?Ql(t):Promise.resolve([])}const Nl=Object.freeze(Object.defineProperty({__proto__:null,boot:s4,hasArt:Xv,loadAllArt:n4,loadArtKinds:Ql},Symbol.toStringTag,{value:"Module"})),Se="#5a3d5c",Xe=`stroke="${Se}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,Xa=[{body:"#ffd6e0",roof:"#ff7aa8",door:"#8fd3ff",trim:"#fff6e6"},{body:"#d9f2ff",roof:"#5aa9e6",door:"#ffd166",trim:"#ffffff"},{body:"#e3f9d9",roof:"#5cc985",door:"#ff9f68",trim:"#fffbe6"},{body:"#fff1b8",roof:"#ff9f43",door:"#c9a0dc",trim:"#ffffff"},{body:"#eadcff",roof:"#9b7bd8",door:"#80ed99",trim:"#fff6fb"},{body:"#ffe0c7",roof:"#e07a5f",door:"#5fb0d8",trim:"#fffaf0"},{body:"#d8f5ef",roof:"#2fb3a3",door:"#ff8fab",trim:"#ffffff"},{body:"#fde2f3",roof:"#e879c6",door:"#ffd166",trim:"#fff"}];function Yr(e,t={}){const n=Xa[(e%Xa.length+Xa.length)%Xa.length],s=e%2===1,o=t.lit?"#fff3b0":"#cfe8ff",i=s?`<path d="M22 138 Q22 36 160 30 Q298 36 298 138 Z" fill="${n.roof}" ${Xe}/><path d="M60 110 Q70 60 120 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`:`<path d="M14 140 L160 26 L306 140 Z" fill="${n.roof}" ${Xe}/><path d="M70 110 L140 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`;return`<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="294" rx="150" ry="8" fill="#000" opacity=".12"/>
  <rect x="${s?232:220}" y="${s?36:44}" width="30" height="56" rx="6" fill="${n.trim}" ${Xe}/>
  <rect x="44" y="124" width="232" height="168" rx="20" fill="${n.body}" ${Xe}/>
  ${i}
  <g class="houseWin" fill="${o}"><circle cx="160" cy="${s?92:98}" r="18" ${Xe}/><rect x="62" y="160" width="62" height="58" rx="18" ${Xe}/><rect x="196" y="160" width="62" height="58" rx="18" ${Xe}/></g>
  <path d="M160 ${s?74:80} V${s?110:116} M142 ${s?92:98} H178" ${Xe}/>
  <path d="M93 160 V218 M62 189 H124" ${Xe}/><path d="M227 160 V218 M196 189 H258" ${Xe}/>
  <rect x="56" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${Xe}/><rect x="190" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${Xe}/>
  <circle cx="72" cy="212" r="7" fill="#ff8fab" ${Xe}/><circle cx="92" cy="208" r="7" fill="#ffd166" ${Xe}/><circle cx="112" cy="212" r="7" fill="#ff8fab" ${Xe}/>
  <circle cx="208" cy="212" r="7" fill="#c9a0dc" ${Xe}/><circle cx="228" cy="208" r="7" fill="#80ed99" ${Xe}/><circle cx="248" cy="212" r="7" fill="#c9a0dc" ${Xe}/>
  <path d="M132 292 V226 Q132 196 160 196 Q188 196 188 226 V292 Z" fill="${n.door}" ${Xe}/>
  <circle cx="176" cy="250" r="5" fill="${Se}"/><path d="M146 222 Q160 212 174 222" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>
  <rect x="118" y="286" width="84" height="10" rx="5" fill="${n.trim}" ${Xe}/>
</svg>`}const Vt={street:`<svg viewBox="0 0 48 48"><circle cx="16" cy="15" r="7" fill="#ffd166" stroke="${Se}" stroke-width="3"/><circle cx="32" cy="15" r="7" fill="#ff8fab" stroke="${Se}" stroke-width="3"/><circle cx="13.5" cy="14.5" r="1.2" fill="${Se}"/><circle cx="18.5" cy="14.5" r="1.2" fill="${Se}"/><circle cx="29.5" cy="14.5" r="1.2" fill="${Se}"/><circle cx="34.5" cy="14.5" r="1.2" fill="${Se}"/><path d="M13 18 q3 2.2 6 0 M29 18 q3 2.2 6 0" fill="none" stroke="${Se}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 40 Q16 28 24 33 Q32 38 40 28" fill="none" stroke="#5cc985" stroke-width="4" stroke-linecap="round"/><circle cx="16" cy="36" r="2.2" fill="#fff" stroke="${Se}" stroke-width="1.5"/><circle cx="32" cy="32" r="2.2" fill="#fff" stroke="${Se}" stroke-width="1.5"/></svg>`,home:`<svg viewBox="0 0 48 48"><path d="M8 22 L24 8 L40 22 V40 H8 Z" fill="#ffd166" stroke="${Se}" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 V28 H28 V40" fill="#fff" stroke="${Se}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="20" r="2.4" fill="${Se}"/></svg>`,lockOn:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q33 7 33 16 V22" fill="none" stroke="${Se}" stroke-width="4"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#ffd166" stroke="${Se}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${Se}"/></svg>`,lockOff:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q31 7 32.5 13" fill="none" stroke="${Se}" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#b6f0a8" stroke="${Se}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${Se}"/></svg>`,chat:`<svg viewBox="0 0 48 48"><path d="M8 12 Q8 6 14 6 H34 Q40 6 40 12 V26 Q40 32 34 32 H22 L13 40 V32 Q8 32 8 26 Z" fill="#fff3b0" stroke="${Se}" stroke-width="3" stroke-linejoin="round"/><circle cx="17" cy="19" r="2.5" fill="${Se}"/><circle cx="24" cy="19" r="2.5" fill="${Se}"/><circle cx="31" cy="19" r="2.5" fill="${Se}"/></svg>`,shield:`<svg viewBox="0 0 48 48"><path d="M24 5 L39 11 V23 Q39 36 24 43 Q9 36 9 23 V11 Z" fill="#c9a0dc" stroke="${Se}" stroke-width="3" stroke-linejoin="round"/><path d="M17 24 L22 29 L31 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,solo:`<svg viewBox="0 0 48 48"><path d="M8 24 L24 9 L40 24 V41 H8 Z" fill="#ffd166" stroke="${Se}" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="28" width="10" height="13" rx="4" fill="#fff" stroke="${Se}" stroke-width="2.5"/><path d="M33 7 l2 4 4 .5 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.5z" fill="#ff8fab" stroke="${Se}" stroke-width="1.5"/></svg>`};function Z(e,t=2600){const n=document.createElement("div");n.className="toast",n.textContent=e,(document.getElementById("toastLane")??document.body).appendChild(n),setTimeout(()=>n.classList.add("out"),t),setTimeout(()=>n.remove(),t+400)}function Lg(e){document.querySelector(".grownNotice")?.remove();const t=document.createElement("div");t.className="toast grownNotice",t.setAttribute("role","status"),t.innerHTML='<b>For grown-ups</b><span></span><button type="button">OK</button>',t.querySelector("span").textContent=e,t.querySelector("button").addEventListener("click",()=>{t.classList.add("out"),setTimeout(()=>t.remove(),400)}),(document.getElementById("toastLane")??document.body).appendChild(t)}function Eg(){return new Promise(e=>{let t=0,n=0,s="",o=0;const i=document.createElement("div");i.className="sheet adult",i.innerHTML='<div class="card adultCard"></div>',document.body.appendChild(i);const a=i.firstElementChild,r=()=>{t=6+Math.floor(Math.random()*4),n=3+Math.floor(Math.random()*7),s="",l()},l=()=>{a.innerHTML=`<button class="close" data-k="x">✕</button><h2>Grown-ups only</h2><p class="q" data-q="${t*n}">What is ${t} × ${n}?</p>
        <div class="ans">${s||"&nbsp;"}</div>
        <div class="pad">${[1,2,3,4,5,6,7,8,9,"⌫",0,"OK"].map(d=>`<button data-k="${d}">${d}</button>`).join("")}</div>`},c=d=>{i.remove(),e(d)};a.addEventListener("click",d=>{const f=d.target.closest("[data-k]")?.dataset.k;if(f){if(f==="x")return c(!1);if(f==="⌫")s=s.slice(0,-1);else if(f==="OK"){if(+s===t*n)return c(!0);if(++o>=3)return c(!1);a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400),r();return}else s.length<3&&(s+=f);l()}}),i.addEventListener("click",d=>{d.target===i&&c(!1)}),r()})}const Sg=new Set,Tc=new Set,Tg=[];let Hu=!1;function Pg(){Hu||typeof document>"u"||(Hu=!0,document.addEventListener("visibilitychange",()=>{if(document.hidden)for(const e of Sg)e.state==="running"&&(Tc.add(e),e.suspend().catch(()=>{}));else{for(const e of Tc)e.resume().catch(()=>{});Tc.clear();for(const e of Tg)try{e()}catch{}}}))}function Zf(e){return Pg(),Sg.add(e),e}function Ag(e){Pg(),Tg.push(e)}let Pn=null,Gf=!0;const o4=e=>{Gf=e};function we(e,t,n="sine",s=0,o=.15){if(Gf)try{Pn??=Zf(new(window.AudioContext||window.webkitAudioContext)),Pn.state==="suspended"&&Pn.resume().catch(()=>{});const i=Pn.createOscillator(),a=Pn.createGain(),r=Pn.currentTime,l=Math.max(40,e*(.94+Math.random()*.12));i.type=n,i.frequency.setValueAtTime(l,r),s&&i.frequency.exponentialRampToValueAtTime(Math.max(40,l*s),r+t);const c=Math.min(.02,Math.max(.008,t*.22));if(a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(Math.max(2e-4,o),r+c),a.gain.exponentialRampToValueAtTime(.001,r+Math.max(t,c+.02)),n==="square"||n==="sawtooth"){const d=Pn.createBiquadFilter();d.type="lowpass",d.frequency.setValueAtTime(1400,r),d.Q.setValueAtTime(.7,r),i.connect(d).connect(a).connect(Pn.destination)}else i.connect(a).connect(Pn.destination);i.start(r),i.stop(r+t+.02)}catch{}}const C={pick:()=>we(520,.12,"sine",1.6),drop:()=>{we(380,.1,"triangle",.7),setTimeout(()=>we(620,.08,"sine"),60)},pop:()=>we(800,.15,"square",.3,.08),click:()=>we(660,.07,"triangle"),swish:()=>we(300,.25,"sine",2.5,.1),meow:()=>{we(700,.12,"triangle",1.3,.1),setTimeout(()=>we(900,.22,"triangle",.6,.1),110)},purr:()=>[0,90,180,270,360].forEach(e=>setTimeout(()=>we(70,.09,"sawtooth",1,.05),e)),woof:()=>{we(260,.09,"square",.6,.09),setTimeout(()=>we(220,.12,"square",.5,.09),130)},spin:()=>we(400,.35,"sine",2.2,.08),boing:()=>we(200,.3,"sine",3,.1),splash:()=>[0,50,110].forEach((e,t)=>setTimeout(()=>we(900-t*200,.12,"triangle",.4,.06),e)),moo:()=>{we(160,.5,"sawtooth",.8,.07),setTimeout(()=>we(140,.45,"sawtooth",.85,.06),380)},baa:()=>[0,90,180].forEach(e=>setTimeout(()=>we(420,.1,"sawtooth",.95,.05),e)),bleat:()=>[0,70,140,210].forEach(e=>setTimeout(()=>we(520,.07,"square",1.05,.04),e)),oink:()=>{we(300,.12,"square",.6,.07),setTimeout(()=>we(330,.12,"square",.55,.07),160)},peep:()=>[0,120,240].forEach((e,t)=>setTimeout(()=>we(1800+t*150,.07,"sine",1.2,.08),e)),squeak:()=>we(1400,.1,"sine",1.5,.08),neigh:()=>{we(700,.5,"sawtooth",.6,.05),[0,60,120,180,240].forEach(e=>setTimeout(()=>we(620-e,.06,"triangle",1,.04),300+e))},honk:()=>{we(330,.18,"square",1,.07),setTimeout(()=>we(330,.25,"square",1,.07),230)},munch:()=>[0,110,220,330].forEach(e=>setTimeout(()=>we(180+Math.random()*60,.05,"square",.6,.05),e)),cluck:()=>[0,100,180].forEach((e,t)=>setTimeout(()=>we(600+t*80,.06,"square",.8,.05),e)),plant:()=>{we(260,.1,"triangle",.6),setTimeout(()=>we(520,.1,"sine"),90)},water:()=>[0,60,120,180,240].forEach((e,t)=>setTimeout(()=>we(1200-t*120,.08,"sine",.7,.05),e)),pickup:()=>[660,880,990].forEach((e,t)=>setTimeout(()=>we(e,.1,"triangle"),t*60)),sparkle:()=>[880,1100,1320].forEach((e,t)=>setTimeout(()=>we(e,.12),t*70))},Wu=new Map;function i4(e,t){const n=(e?"s":"o")+(t?"f":"n"),s=Wu.get(n);if(s)return s;const a=`<svg viewBox="0 0 200 260" aria-hidden="true">
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
  </svg>`;return Wu.set(n,a),a}const Zi="#5a3d5c";function ql(e){return e&&/^#[0-9a-fA-F]{6}$/.test(e)?e.toLowerCase():"#f1c27d"}const Ja={x:60,y:118,w:56,h:40};function a4(e,t,n){return n==="lie"&&e==="over"?null:t&&n==="lie"?{d:"M72 172 C36 200 40 228 88 220",sleeve:"M72 172 C52 186 44 196 42 204",hx:88,hy:220}:t&&n==="sit"?e==="under"?{d:"M72 172 C40 190 46 220 108 228",sleeve:"M72 172 C56 178 46 184 42 188",hx:108,hy:228}:{d:"M128 172 C154 192 150 214 118 208",sleeve:"M128 172 C142 180 148 186 150 190",hx:118,hy:208}:t?e==="under"?{d:"M72 172 C40 196 48 222 112 214",sleeve:"M72 172 C56 178 46 184 42 188",hx:112,hy:214}:{d:"M128 172 C158 180 154 200 124 196",sleeve:"M128 172 C144 178 150 184 154 188",hx:124,hy:196}:n==="lie"?{d:"M22 84 C10 112 14 136 46 130",sleeve:"",hx:46,hy:130}:e==="under"?{d:"M22 84 C14 104 12 128 44 130",sleeve:"",hx:44,hy:130}:{d:"M78 84 C90 98 86 118 64 114",sleeve:"",hx:64,hy:114}}function r4(e,t,n){const s=`M${e-8} ${t-1} Q${e-9} ${t-11} ${e} ${t-11} Q${e+9} ${t-11} ${e+9} ${t} Q${e+9} ${t+9} ${e} ${t+10} Q${e-9} ${t+9} ${e-8} ${t-1} Z`,o=`<ellipse cx="${e+8}" cy="${t-2}" rx="3.2" ry="5" fill="${n}" stroke="${Zi}" stroke-width="3.4" transform="rotate(-24 ${e+8} ${t-2})"/>`;return`<path class="cradle-hand" data-cx="${e}" data-cy="${t}" d="${s}" fill="${n}" stroke="${Zi}" stroke-width="3.9"/>${o}`}function Aa(e,t,n,s,o){const i=a4(e,t,s);if(!i)return"";const a=ql(n),r=o&&/^#[0-9a-fA-F]{6}$/.test(o)?o.toLowerCase():"",l='fill="none" stroke-linecap="round" stroke-linejoin="round"',c=t?16:12,d=t?20.2:15.5;let f=`<path d="${i.d}" ${l} stroke="${Zi}" stroke-width="${d}"/><path d="${i.d}" ${l} stroke="${a}" stroke-width="${c}"/>`;t&&i.sleeve&&r&&(f+=`<path d="${i.sleeve}" ${l} stroke="${Zi}" stroke-width="29"/><path d="${i.sleeve}" ${l} stroke="${r}" stroke-width="22"/>`);const u=t?r4(i.hx,i.hy,a):`<circle class="cradle-hand" data-cx="${i.hx}" data-cy="${i.hy}" cx="${i.hx}" cy="${i.hy}" r="7" fill="${a}" stroke="${Zi}" stroke-width="3.5"/>`;return`<g class="arm cradle">${f}${u}</g>`}const er=110,$i=148,Vu=80,Uu=57,l4=60,c4=133,d4=42,f4=30,h4=60,u4=129,tr=["feed","burp","change","rock"],Pc=["Bean","Pip","Mochi","Bunny","Dot","Sunny"];function p4(e){let t=null,n=null,s=null,o=!1,i=Number.NaN,a=0,r=0,l=!1,c=!1;const d=typeof navigator<"u"&&!!navigator.webdriver;function f(O,B,J,V,Q){O.style.left=(B-V/2)/Rt*100+"%",O.style.top=(J-Q)/zn*100+"%",O.style.width=V/Rt*100+"%",O.style.height=Q/zn*100+"%"}function u(O){const B=O.scale&&O.scale>0?O.scale:1,J=O.pose==="sit"||O.pose==="lie"?O.pose:null,V=O.chibi&&O.pose!=="sit"&&O.pose!=="lie",Q=V?Ja.x:O.chibi?h4:l4,q=V?Ja.y:O.chibi?u4:c4,se=V?Ja.w:O.chibi?d4:Vu,Le=V?Ja.h:O.chibi?f4:Uu,_e=Fb(Q,q,J,!!O.lieFlip,B),Ze=J==="lie"?_e.x:O.flip?-_e.x:_e.x,W=se*B,z=Le*B;return{x:O.x+Ze,y:O.y+_e.y+z/2,w:W,h:z}}function p(O,B){let J=null,V=0;for(let Q=0;Q<tr.length;Q++){const q=tr[Q],se=O.at?.[q]??0;se>0&&B-se>=0&&B-se<1100&&se>=V&&(J=q,V=se)}return J}function m(O){if(O.mood<=2||!e.canSend()){window.clearTimeout(a),i=Number.NaN;return}if(i===O.since)return;window.clearTimeout(a),i=O.since;const B=Math.max(0,O.since+gd-e.clock());a=window.setTimeout(()=>{i=Number.NaN;const J=e.get().baby;!J||J.mood<=2||!e.canSend()||e.dispatch({type:"baby/ease",now:e.clock()})},B)}function k(O,B){window.clearTimeout(r);let J=0;for(let V=0;V<tr.length;V++){const Q=O.at?.[tr[V]]??0;B-Q>=0&&B-Q<1100&&Q>J&&(J=Q)}J&&(r=window.setTimeout(()=>be(),Math.max(0,1100-(B-J))))}function w(O,B){if(typeof document.elementsFromPoint!="function")return null;const J=document.elementsFromPoint(O,B),V=e.get(),Q=V.rooms[V.currentRoom]?.items??[];for(let q=0;q<J.length;q++){const se=J[q];if(!se||typeof se.closest!="function"||se.closest(".baby, .babyCare, .babyMeet"))continue;const Le=se.closest(".item");if(!Le)continue;const _e=Le.dataset.id||"";for(let Ze=0;Ze<Q.length;Ze++){const W=Q[Ze];if(W.id===_e&&(mo(W.kind)||e.box(W)))return W}}return null}function b(O){O.addEventListener("pointerdown",B=>{if(B.button!==0)return;const J=e.get().baby;if(!J)return;if(B.preventDefault(),B.stopPropagation(),J.spot==="arms"&&J.holder&&J.holder!==e.holderId()&&e.holderHere(J.holder)){Z("Someone is cuddling!");return}if(!e.editable()){e.locked();return}if(!e.canSend())return;const V=e.owner(),Q=V,q=B.clientX,se=B.clientY,Le=B.pointerId;let _e=!1;const Ze=z=>{if(z.pointerId!==Le||(Math.hypot(z.clientX-q,z.clientY-se)>6&&(_e=!0),!Q||!_e))return;o=!0;const nt=e.toRoom(z.clientX,z.clientY);f(O,nt.x,nt.y,er,$i)},W=z=>{if(z.pointerId!==Le)return;window.removeEventListener("pointermove",Ze),window.removeEventListener("pointerup",W),window.removeEventListener("pointercancel",W);const nt=o&&_e&&Q;if(o=!1,z.type==="pointercancel"){be();return}if(nt){const $t=document.elementFromPoint(z.clientX,z.clientY)?.closest(".tab[data-room]");if($t&&$t.dataset.room){const yi=$t.dataset.room,Ey=e.toRoom(z.clientX,z.clientY),Jh=_w(Ey.x,Rt);yi!==e.get().currentRoom&&e.dispatch({type:"room/switch",room:yi}),e.dispatch({type:"baby/place",room:yi,x:Jh.x,y:Jh.y,spot:"mat",bed:null,seat:null,now:e.clock()}),C.drop();return}const Ns=e.toRoom(z.clientX,z.clientY),gn=w(z.clientX,z.clientY),mc=gn?e.box(gn):null,qs=vw({mode:e.play()?"play":"decorate",releaseX:Math.max(0,Math.min(Rt,Ns.x)),releaseY:Math.max(0,Math.min(zn,Ns.y)),piece:mc,occupied:e.occupied()});e.dispatch({type:"baby/place",room:e.get().currentRoom,x:qs.x,y:qs.y,spot:qs.spot,bed:qs.bed,seat:qs.seat,now:e.clock()}),C.drop();return}if(_e){be();return}const gt=e.get().baby;if(!gt)return;if(gt.spot==="arms"&&gt.holder===e.holderId()){const $t=e.toRoom(z.clientX,z.clientY);e.dispatch({type:"baby/hold",holder:null,room:e.get().currentRoom,x:Math.max(0,Math.min(Rt,$t.x)),y:Math.max(40,Math.min(zn,$t.y)),now:e.clock()}),C.drop();return}const Ge=e.holderSpot(),He=Ge?u(Ge):null,Re=He?He.x:gt.x,_t=He?Math.max(40,He.y):gt.y;e.dispatch({type:"baby/hold",holder:e.holderId(),room:e.get().currentRoom,x:Re,y:_t,now:e.clock()}),C.pick()};window.addEventListener("pointermove",Ze),window.addEventListener("pointerup",W),window.addEventListener("pointercancel",W)})}function g(){return t&&t.isConnected||(t=document.createElement("div"),t.className="baby",t.dataset.baby="1",t.innerHTML='<div class="hit"></div><div class="babySpin"><div class="babyRock"><div class="babyInner"></div></div></div><div class="babyZzz" hidden>z z z</div><div class="babyBurp" hidden><i></i></div>',e.layer.appendChild(t),b(t)),t}function y(O,B){const J=O.querySelector(".babyWord");J&&(J.textContent=fw(B));const V=O.querySelectorAll(".babyBlossom"),Q=hw(B);for(let se=0;se<V.length;se++)V[se].classList.toggle("on",se<Q);const q=O.querySelector(".babyMeter");q&&(q.dataset.mood=String(B))}function _(O){const B=gg(O);if(!B){Z("Try another name!");return}const J=e.get().baby;!J||J.name===B||(e.dispatch({type:"baby/name",name:B}),C.click())}function T(O){n=document.createElement("div"),n.className="babyCare",n.dataset.babyCare="1";const B=[];for(let Q=0;Q<5;Q++)B.push('<i class="babyBlossom"></i>');const J=[];for(let Q=0;Q<Pc.length;Q++)J.push(`<button type="button" data-preset="${Pc[Q]}">${Pc[Q]}</button>`);n.innerHTML=`<p class="babyWord"></p><span class="babyMeter"><span class="babyBlossoms">${B.join("")}</span></span>
      <button type="button" data-care="feed">Bottle</button>
      <button type="button" data-care="burp">Burp</button>
      <button type="button" data-care="change">Diaper</button>
      <button type="button" data-care="rock">Rock</button>
      <button type="button" data-baby-name-open>Name</button>
      <div class="babyNames" hidden>
        <input type="text" maxlength="14" autocomplete="off" enterkeyhint="done" aria-label="Baby name" value="">
        ${J.join("")}
      </div>`,y(n,O.mood),n.addEventListener("pointerdown",Q=>Q.stopPropagation()),n.addEventListener("click",Q=>{const q=Q.target,se=q.closest("[data-care]");if(se&&se.dataset.care){if(!e.editable()){e.locked();return}if(!e.canSend())return;const _e=se.dataset.care;e.dispatch({type:"baby/care",care:_e,now:e.clock()}),_e==="rock"?C.purr():_e==="feed"?C.sparkle():C.click();return}if(q.closest("[data-baby-name-open]")){if(!e.owner())return;c=!c;const _e=n?.querySelector(".babyNames");_e&&(_e.hidden=!c);const Ze=n?.querySelector("input");c&&Ze&&(Ze.value=e.get().baby?.name??"",Ze.focus());return}const Le=q.closest("[data-preset]");if(Le&&e.owner()){_(Le.dataset.preset||"");return}}),n.querySelector("input")?.addEventListener("keydown",Q=>{Q.key==="Enter"&&(Q.preventDefault(),_(Q.target.value))}),e.stageWrap.appendChild(n)}function x(O,B){if(!e.play()){$();return}const J=n&&document.activeElement&&n.contains(document.activeElement);if((!n||!n.isConnected)&&T(O),!n)return;n.hidden=!1,y(n,O.mood);const V=n.querySelector("[data-baby-name-open]");V&&(V.hidden=!B);const Q=n.querySelector(".babyNames");Q&&(Q.hidden=!B||!c);const q=n.querySelector("input");q&&!J&&(q.value=O.name),I()}function $(){c=!1,n&&(n.remove(),n=null),I()}function I(){const O=!!(n&&n.isConnected&&!n.hidden),B=document.body.classList.contains("baby-card");document.body.classList.toggle("baby-card",O),B!==O&&window.dispatchEvent(new Event("resize"))}function N(O){if(!O||d){s&&(s.remove(),s=null);return}if(s&&s.isConnected){s.hidden=!1;return}s=document.createElement("button"),s.type="button",s.className="babyMeet",s.textContent="Meet the baby",s.addEventListener("pointerdown",B=>B.stopPropagation()),s.addEventListener("click",()=>{if(!e.editable()){e.locked();return}!e.canSend()||e.get().baby||(e.dispatch({type:"baby/meet",now:e.clock()}),C.sparkle())}),e.stageWrap.appendChild(s)}function U(){const O=e.get().rooms.nursery?.items??[];for(let B=0;B<O.length;B++)if(mo(O[B].kind)==="crib")return!0;return!1}function F(O,B){O.classList.remove("baby-lie","baby-lie-r","baby-cradle","cradle-lie","flipped");const J=e.get().currentRoom;if((B.spot==="crib"||B.spot==="bassinet")&&B.bed){const V=e.get().rooms[B.room]?.items.find(q=>q.id===B.bed)??null,Q=V?e.box(V):null;if(V&&Q){const q=j0(V.kind,Q);f(O,q.x,q.y+$i/2,er,$i),O.style.zIndex=String(1e3+V.z+1),O.classList.add("baby-lie"),V.flip&&O.classList.add("baby-lie-r");return}}if(B.spot==="arms"){const V=B.holder?e.holderSpot(B.holder):null,Q=V?u(V):null,q=Q?Q.x:B.x,se=Q?Q.y:B.y,Le=Q?Q.w:Vu,_e=Q?Q.h:Uu;f(O,q,se,Le,_e),O.style.zIndex=String(5e3+Math.round(V?V.y:B.y)+2),O.classList.add("baby-cradle"),O.style.setProperty("--spin-w",(_e/Le*100).toFixed(4)+"%"),O.style.setProperty("--spin-h",(Le/_e*100).toFixed(4)+"%"),V&&V.pose==="lie"&&O.classList.add("cradle-lie"),V&&(V.pose==="lie"?V.lieFlip:V.flip)&&O.classList.add("flipped");return}if(B.spot==="mat"&&B.seat){const V=e.seatAt(J,B.seat,B);f(O,V.x,V.y,er,$i);const Q=e.get().rooms[J]?.items.find(q=>q.id===B.seat?.item);O.style.zIndex=String(1e3+(Q?.z??0)+1),B.seat.pose==="lie"&&(O.classList.add("baby-lie"),Q?.flip&&O.classList.add("baby-lie-r"));return}f(O,B.x,B.y,er,$i),O.style.zIndex=String(5e3+Math.round(B.y))}function oe(O){if(O.spot!=="arms"||!O.holder)return!1;const B=e.get().characters.find(J=>J.id===O.holder);return!!B&&B.room!==O.room}function Ee(O){o||!oe(O)||!e.canSend()||!e.editable()||e.dispatch({type:"baby/hold",holder:null,room:O.room,x:O.x,y:ri,now:e.clock()})}function ze(O){if(o||oe(O)||O.spot!=="arms"||O.holder!==e.holderId()||!e.canSend()||!e.editable())return;const B=e.holderSpot();if(!B)return;const J=e.get().currentRoom;if(O.room===J)return;const V=u(B);e.dispatch({type:"baby/hold",holder:O.holder,room:J,x:V.x,y:Math.max(40,V.y),now:e.clock()})}function be(){const O=e.get(),B=O.baby,J=!!B&&B.spot==="arms"&&!!B.holder&&!!e.holderSpot(B.holder),V=!!B&&B.spot==="arms"&&B.holder===e.holderId()&&!!e.holderSpot(),Q=!!(B&&e.inHouse()&&(B.room===O.currentRoom||J||V));if(!B||!Q){t&&(t.remove(),t=null),o=!1,$(),window.clearTimeout(a),i=Number.NaN;const Re=!d&&!B&&e.inHouse()&&e.owner()&&e.editable()&&e.canSend()&&O.currentRoom==="nursery"&&U();N(Re);return}N(!1),Xn()&&!Jn("baby")&&!l&&(l=!0,Ql(["baby"]).then(()=>be()));const q=g(),se=e.clock(),Le=p(B,se),_e=Le==="rock",Ze=Le==="change",W=!_e&&!Ze&&Xn()?Jn("baby"):"",z=q.querySelector(".babyInner"),nt=(W||"svg")+(_e?"s":"")+(Ze?"f":"");z&&q.dataset.look!==nt&&(z.innerHTML=W?`<img class="artimg" alt="" draggable="false" src="${W}">`:i4(_e,Ze),q.dataset.look=nt),q.dataset.babySpot=B.spot,q.dataset.babyMood=String(B.mood),q.dataset.babyName=B.name,q.classList.toggle("is-feed",Le==="feed"),q.classList.toggle("is-burp",Le==="burp"),q.classList.toggle("is-change",Le==="change"),q.classList.toggle("is-rock",Le==="rock");const gt=q.querySelector(".babyZzz"),Ge=q.querySelector(".babyBurp"),He=(B.spot==="crib"||B.spot==="bassinet")&&!Le;gt&&(gt.hidden=!He),Ge&&(Ge.hidden=Le!=="burp"),o&&q.isConnected||F(q,B),x(B,e.owner()),m(B),k(B,se),Ee(B),ze(B)}return{render:be}}const g4={hip:0,head:3,armL:26,armR:-22,legL:-76,legR:76,legLLift:8,legRLift:8},m4={hip:0,head:-8,armL:18,armR:-12,legL:-4,legR:6,legLLift:0,legRLift:0};function Fl(e){return e==="sit"?g4:e==="lie"?m4:null}const et="#5a3d5c",fe=(e=4)=>`stroke="${et}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Yf=600,on=250,Ys=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})">
  <rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${fe()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${fe()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${fe()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${fe()}/>
  <circle cx="-18" cy="-78" r="9" fill="#fff" opacity=".35"/></g>`,y4=(e,t,n)=>`<g transform="translate(${e} ${t})"><path d="M0 0 V-16" ${fe(3)}/>${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*6}" cy="${-20+Math.sin(s*Math.PI/180)*6}" r="5" fill="${n}" ${fe(2)}/>`).join("")}<circle cx="0" cy="-20" r="4" fill="#ffd166" ${fe(2)}/></g>`,zu=e=>`<g transform="translate(${e} 0)">
  <rect x="-80" y="452" width="160" height="12" rx="6" fill="#ff9f68" ${fe()}/><rect x="-80" y="470" width="160" height="12" rx="6" fill="#ff9f68" ${fe()}/>
  <rect x="-70" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${fe(3)}/><rect x="60" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${fe(3)}/>
  <rect x="-86" y="490" width="172" height="14" rx="7" fill="#ffb385" ${fe()}/></g>`;function b4(){const e=Nf,t=Array.from({length:Math.floor((yt.x1-yt.x0+40)/34)},(n,s)=>`<path d="M${yt.x0-20+s*34} 470 V428 l8 -10 l8 10 V470 Z" fill="#fff6e6" ${fe(3)}/>`).join("");return`<svg class="parkScene" viewBox="0 0 ${e} ${Yf}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient>
  <pattern id="pkCheck" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><rect width="15" height="15" fill="#ff8fab"/><rect x="15" y="15" width="15" height="15" fill="#ff8fab"/></pattern></defs>
  <rect width="${e}" height="440" fill="url(#pkSky)"/>
  ${[180,900,1600,2300].map((n,s)=>`<g transform="translate(${n} ${70+s%2*30})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <circle cx="${e-220}" cy="90" r="46" fill="#ffe066" ${fe(4)}/>
  <path d="M-50 360 Q500 220 1100 340 T2300 330 T${e+100} 350 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#9fe0aa"/><path d="M0 410 H${e}" ${fe(4)}/>
  <path d="M0 560 Q700 520 1400 565 T${e} 545 V600 H0 Z" fill="#f6e3c3" opacity=".9"/>
  ${Ys(260,390,.9)}${Ys(720,380,1.05,"#4fbf7a")}${Ys(1230,385,.8)}${Ys(1640,380,1,"#4fbf7a")}${Ys(1990,388,.85)}${Ys(2380,380,.95)}${Ys(2860,390,.9,"#4fbf7a")}
  ${[[300,470,"#ff8fab"],[690,455,"#c9a0dc"],[1210,470,"#ffd166"],[1960,450,"#8ecae6"],[2390,470,"#ff8fab"],[1580,590,"#c9a0dc"],[140,585,"#ffd166"]].map(([n,s,o])=>y4(+n,+s,String(o))).join("")}
  <!-- gate back to the street -->
  <g><rect x="40" y="300" width="22" height="200" rx="6" fill="#c99366" ${fe()}/><rect x="168" y="300" width="22" height="200" rx="6" fill="#c99366" ${fe()}/>
    <path d="M30 312 Q115 240 200 312" fill="none" stroke="${et}" stroke-width="16" stroke-linecap="round"/><path d="M30 312 Q115 240 200 312" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
    <rect x="62" y="252" width="106" height="36" rx="12" fill="#fff6e6" ${fe(3)}/><text x="115" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="${et}" font-family="Nunito, system-ui, sans-serif">PARK</text></g>
  <!-- swing set (seats are separate so they can swing) -->
  <g><path d="M350 ${on} L310 500 M350 ${on} L390 500 M650 ${on} L610 500 M650 ${on} L690 500" stroke="${et}" stroke-width="14" stroke-linecap="round"/>
    <path d="M350 ${on} L310 500 M350 ${on} L390 500 M650 ${on} L610 500 M650 ${on} L690 500" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/>
    <rect x="330" y="${on-10}" width="340" height="20" rx="10" fill="#ff8fab" ${fe()}/></g>
  <!-- slide -->
  <g><path d="M${ke.ladder-20} 560 V${ke.top.y} M${ke.ladder+30} 560 V${ke.top.y}" stroke="${et}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${ke.ladder-20} 560 V${ke.top.y} M${ke.ladder+30} 560 V${ke.top.y}" stroke="#c9a0dc" stroke-width="6" stroke-linecap="round"/>
    ${[380,420,460,500,540].map(n=>`<path d="M${ke.ladder-20} ${n} H${ke.ladder+30}" ${fe(5)}/>`).join("")}
    <rect x="${ke.ladder-30}" y="${ke.top.y-14}" width="100" height="18" rx="8" fill="#ffd166" ${fe()}/>
    <path d="M${ke.ladder+60} ${ke.top.y-10} C 1000 ${ke.top.y} 1010 520 ${ke.bottom.x+40} 548 L${ke.bottom.x+40} 572 C 990 548 975 ${ke.top.y+30} ${ke.ladder+60} ${ke.top.y+14} Z" fill="#ffd166" ${fe()}/>
    <path d="M${ke.ladder+70} ${ke.top.y-2} C 990 ${ke.top.y+8} 1000 525 ${ke.bottom.x+30} 552" fill="none" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/></g>
  <!-- splash pond -->
  <g class="pondArt"><ellipse cx="1420" cy="515" rx="185" ry="52" fill="#8ecae6" ${fe()}/><ellipse cx="1420" cy="510" rx="150" ry="36" fill="#b5e3f5"/>
    <ellipse cx="1340" cy="520" rx="24" ry="9" fill="#80ed99" ${fe(3)}/><ellipse cx="1500" cy="505" rx="20" ry="8" fill="#80ed99" ${fe(3)}/>
    <g transform="translate(1440 500)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ffd166" ${fe(3)}/><circle cx="16" cy="-12" r="9" fill="#ffd166" ${fe(3)}/><path d="M24 -12 l8 2 l-8 3 z" fill="#ff9f68" ${fe(2)}/><circle cx="18" cy="-14" r="1.8" fill="${et}"/></g></g>
  <!-- picnic blanket -->
  <g><path d="M1670 530 L1910 530 L1940 580 L1640 580 Z" fill="url(#pkCheck)" ${fe()}/>
    <g transform="translate(1915 520)"><rect x="-26" y="-20" width="52" height="32" rx="8" fill="#e6b88a" ${fe(3)}/><path d="M-18 -20 Q0 -46 18 -20" fill="none" ${fe(4)}/><circle cx="-10" cy="-24" r="7" fill="#ff6b6b" ${fe(2)}/></g></g>
  ${zu(2065)}${zu(2265)}
  <!-- dog area -->
  <g>${t}<path d="M${yt.x0-20} 440 H${yt.x1+20}" ${fe(3)}/>
    <g transform="translate(${yt.x0+10} 380)"><rect x="-6" y="0" width="12" height="70" fill="#c99366" ${fe(3)}/><rect x="-55" y="-34" width="110" height="38" rx="10" fill="#fff6e6" ${fe(3)}/>
      <text x="0" y="-8" text-anchor="middle" font-size="20" font-weight="900" fill="${et}" font-family="Nunito, system-ui, sans-serif">DOGS 🐾</text></g>
    <g transform="translate(${yt.x1-30} 470)"><path d="M-50 0 V-60 L0 -100 L50 -60 V0 Z" fill="#ff8fab" ${fe()}/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="${et}" stroke-width="14" stroke-linecap="round"/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="#c9a0dc" stroke-width="8" stroke-linecap="round"/><path d="M-20 0 V-30 a20 20 0 0 1 40 0 V0 Z" fill="#5a3d5c"/></g>
    <g transform="translate(${yt.x0+120} 500)"><rect x="-12" y="-30" width="24" height="34" rx="8" fill="#ff6b6b" ${fe(3)}/><rect x="-18" y="-18" width="36" height="8" rx="4" fill="#ff6b6b" ${fe(3)}/><circle cx="0" cy="-32" r="10" fill="#ff6b6b" ${fe(3)}/></g></g>
  </svg>`}const w4=`<svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M10 0 V222 M50 0 V222" stroke="${et}" stroke-width="4"/><rect x="0" y="216" width="60" height="14" rx="6" fill="#ff9f68" ${fe(3)}/></svg>`,k4=`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffd166" ${fe(3)}/><path d="M6 16 Q20 24 34 16 M8 27 Q20 19 32 27" fill="none" stroke="#fff" stroke-width="3"/></svg>`,v4=`<svg viewBox="0 0 48 48"><rect x="20" y="28" width="8" height="14" rx="3" fill="#c99366" stroke="${et}" stroke-width="3"/><circle cx="24" cy="20" r="13" fill="#5cc985" stroke="${et}" stroke-width="3"/><circle cx="19" cy="16" r="3" fill="#fff" opacity=".5"/></svg>`,Rg=`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8" fill="#ff8fab" stroke="${et}" stroke-width="3"/><circle cx="13" cy="20" r="4.5" fill="#ff8fab" stroke="${et}" stroke-width="3"/><circle cx="20" cy="13" r="4.5" fill="#ff8fab" stroke="${et}" stroke-width="3"/><circle cx="28" cy="13" r="4.5" fill="#ff8fab" stroke="${et}" stroke-width="3"/><circle cx="35" cy="20" r="4.5" fill="#ff8fab" stroke="${et}" stroke-width="3"/></svg>`,_4=`<svg viewBox="0 0 48 48"><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="${et}" stroke-width="4" stroke-linecap="round"/><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="#ff9f68" stroke-width="2"/><path d="M16 40 V26 M24 40 V22 M32 40 V26" stroke="${et}" stroke-width="3" stroke-linecap="round"/></svg>`,Cg="/kids-house-game/assets/_pop~cada-mouse-DI1-rdPA.webp",$4=Object.freeze(Object.defineProperty({__proto__:null,default:Cg},Symbol.toStringTag,{value:"Module"})),Ig="/kids-house-game/assets/_pop~quinn-pup-BNjRkBlA.webp",x4=Object.freeze(Object.defineProperty({__proto__:null,default:Ig},Symbol.toStringTag,{value:"Module"})),Bg="/kids-house-game/assets/_pop~sloane-snail-B9PsYK5P.webp",M4=Object.freeze(Object.defineProperty({__proto__:null,default:Bg},Symbol.toStringTag,{value:"Module"})),rn="#5a3d5c",Te=`stroke="${rn}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,nr='<ellipse cx="50" cy="97" rx="34" ry="3" fill="#000" opacity=".12"/>',L4=`<svg viewBox="0 0 40 30"><path d="M4 30 V16 Q4 2 20 2 Q36 2 36 16 V30 Z" fill="#3b2a3d" ${Te}/><circle cx="14" cy="18" r="1.6" fill="#fff" opacity=".8"/><circle cx="22" cy="18" r="1.6" fill="#fff" opacity=".8"/></svg>`,E4=`<svg viewBox="0 0 48 30"><path d="M4 27 Q10 22 22 23 L42 23 Q46 27 42 28 H6 Z" fill="#cdeccf" ${Te}/><circle cx="26" cy="15" r="11" fill="#ffb3c6" ${Te}/><path d="M26 15 m-5 0 a5 5 0 1 1 5 5" fill="none" ${Te}/><path d="M8 23 L5 13 M12 23 L12 13" ${Te}/></svg>`,S4=`<svg viewBox="0 0 30 30"><path d="M15 2 l3.6 8 8.4 1 -6.3 5.8 1.8 8.4 -7.5 -4.4 -7.5 4.4 1.8 -8.4 L3 11 l8.4 -1z" fill="#fff3b0" ${Te}/></svg>`,T4=`<svg viewBox="0 0 30 22"><ellipse cx="15" cy="13" rx="13" ry="8" fill="#e6b88a" ${Te}/><circle cx="10" cy="11" r="1.8" fill="${rn}"/><circle cx="18" cy="14" r="1.8" fill="${rn}"/><circle cx="16" cy="9" r="1.5" fill="${rn}"/></svg>`,P4=`<svg viewBox="0 0 30 28"><path d="M15 26 C3 18 1 10 6 5 C10 1 14 4 15 7 C16 4 20 1 24 5 C29 10 27 18 15 26 Z" fill="#ffc8dd" ${Te}/></svg>`,Kr=[{name:"Cada",room:"living",x:150,y:382,w:40,h:30,taps:3,spot:L4,hello:"Squeak! Hi Cada!",item:{kind:"egg:cada-mouse",name:"Cada's Mouse",cat:"secrets",w:80,holdable:!0,svg:`${nr}<path d="M78 74 Q96 68 92 52" stroke="#ff9bb5" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="28" ry="18" fill="#d6d6e8" ${Te}/><circle cx="28" cy="40" r="13" fill="#d6d6e8" ${Te}/><circle cx="62" cy="38" r="13" fill="#d6d6e8" ${Te}/><circle cx="28" cy="40" r="7" fill="#ffc8dd"/><circle cx="62" cy="38" r="7" fill="#ffc8dd"/><circle cx="45" cy="56" r="20" fill="#e4e4f2" ${Te}/><text x="50" y="96" font-size="11" font-weight="900" text-anchor="middle" fill="${rn}">C</text>`}},{name:"Sloane",room:"living",x:2290,y:383,w:48,h:30,taps:3,spot:E4,hello:"Hi Sloane! ✨",item:{kind:"egg:sloane-snail",name:"Sloane's Rainbow Snail",cat:"secrets",w:110,holdable:!0,svg:`${nr}<path d="M6 92 Q14 80 36 82 L84 82 Q94 90 84 94 H10 Z" fill="#cdeccf" ${Te}/><circle cx="56" cy="52" r="32" fill="#ff8fab" ${Te}/><circle cx="56" cy="52" r="24" fill="#ffd166"/><circle cx="56" cy="52" r="17" fill="#80ed99"/><circle cx="56" cy="52" r="10" fill="#8ecae6"/><circle cx="56" cy="52" r="4" fill="#c9a0dc"/><circle cx="56" cy="52" r="32" fill="none" ${Te}/><path d="M14 82 L8 60 M24 82 L24 60" ${Te}/><circle cx="8" cy="58" r="4" fill="${rn}"/><circle cx="24" cy="58" r="4" fill="${rn}"/>`}},{name:"Chloe",room:"bedroom",x:2230,y:92,w:30,h:30,taps:5,spot:S4,item:{kind:"egg:chloe-starlamp",name:"Chloe's Star Lamp",cat:"secrets",w:100,holdable:!0,svg:`${nr}<circle cx="50" cy="38" r="34" fill="#fff3b0" opacity=".6"/><path d="M50 6 l8 17 19 2.5 -14 13 4 19 -17 -9.5 -17 9.5 4 -19 -14 -13 19 -2.5z" fill="#ffd166" ${Te}/><rect x="46" y="66" width="8" height="22" rx="4" fill="#c9a0dc" ${Te}/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#b388d6" ${Te}/><text x="50" y="93" font-size="8" font-weight="900" text-anchor="middle" fill="#fff">CHLOE</text>`}},{name:"Quinn",room:"kitchen",x:80,y:588,w:30,h:22,taps:4,spot:T4,hello:"Woof! Hi Quinn!",item:{kind:"egg:quinn-pup",name:"Quinn's Cookie Pup",cat:"secrets",w:110,holdable:!0,svg:`${nr}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#e6b88a" ${Te}/><circle cx="50" cy="44" r="27" fill="#f2d0a4" ${Te}/><ellipse cx="24" cy="46" rx="10" ry="17" fill="#b07d54" ${Te}/><ellipse cx="76" cy="46" rx="10" ry="17" fill="#b07d54" ${Te}/><circle cx="84" cy="80" r="10" fill="#e6b88a" ${Te}/><circle cx="81" cy="78" r="1.8" fill="${rn}"/><circle cx="87" cy="82" r="1.8" fill="${rn}"/><text x="50" y="30" font-size="10" font-weight="900" text-anchor="middle" fill="${rn}">Q</text>`}},{name:"Reagan",room:"salon",x:2300,y:352,w:30,h:28,taps:5,spot:P4,item:{kind:"egg:reagan-frame",name:"Reagan's Frame",cat:"secrets",w:120,wall:!0,svg:`<rect x="8" y="10" width="84" height="84" rx="16" fill="#ff8fab" ${Te}/><rect x="18" y="20" width="64" height="64" rx="10" fill="#fff3f7" ${Te}/><text x="50" y="72" font-size="52" font-weight="900" text-anchor="middle" fill="#e879c6" stroke="${rn}" stroke-width="2.5">R</text><circle cx="14" cy="16" r="6" fill="#ffd166" ${Te}/><circle cx="86" cy="88" r="6" fill="#ffd166" ${Te}/><path d="M76 24 l2 4 4 .5 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.5z" fill="#ffd166"/>`}}],A4=Kr.map(e=>({...e.item,rooms:["any"],secret:e.name})),Og=vt("cozy-secrets"),jl=()=>{try{return new Set(JSON.parse(localStorage.getItem(Og)??"[]"))}catch{return new Set}},R4=e=>{try{localStorage.setItem(Og,JSON.stringify([...e]))}catch{}};function C4(e){const t=document.createElement("div");t.className="eggs",e.world.appendChild(t);const n=new Map;for(const o of Kr){const i=document.createElement("div");i.className="eggspot",i.dataset.egg=o.name,i.style.left=(o.x-o.w/2)/e.roomW*100+"%",i.style.top=(o.y-o.h)/e.roomH*100+"%",i.style.width=o.w/e.roomW*100+"%",i.style.height=o.h/e.roomH*100+"%",i.innerHTML=o.spot,t.appendChild(i),i.addEventListener("pointerdown",a=>a.stopPropagation()),i.addEventListener("click",a=>{a.stopPropagation();const r=Date.now(),l=n.get(o.name)??{n:0,t:0};if(l.n=r-l.t<1500?l.n+1:1,l.t=r,n.set(o.name,l),i.classList.remove("poke"),i.offsetWidth,i.classList.add("poke"),e.tap(),l.n<o.taps)return;l.n=0;const c=jl(),d=!c.has(o.name);c.add(o.name),R4(c),I4(o,i),e.sparkle(),e.onFound(o.name,d)})}const s=()=>{const o=e.currentRoom();t.querySelectorAll(".eggspot").forEach(i=>{i.style.display=Kr.find(a=>a.name===i.dataset.egg).room===o?"":"none"})};return s(),{update:s}}const Qu=Object.assign({"../assets/art/living/_pop~cada-mouse.webp":Cg,"../assets/art/living/_pop~quinn-pup.webp":Ig,"../assets/art/living/_pop~sloane-snail.webp":Bg}),Dg={};for(const e in Qu)Dg["egg:"+e.split("_pop~").pop().slice(0,-5)]=Qu[e];function I4(e,t){if(e.hello){const s=document.createElement("div");s.className="eggpop";const o=Ff()?Dg[e.item.kind]:void 0;if(s.innerHTML=`<div class="eggcritter"><svg viewBox="0 0 100 100">${e.item.svg}</svg></div><div class="bubble">${e.hello}</div>`,o){const i=s.querySelector(".eggcritter"),a=i.innerHTML,r=new Image;r.alt="",r.className="eggpic",r.onerror=()=>{i.innerHTML=a},r.src=o,i.replaceChildren(r)}t.appendChild(s),setTimeout(()=>s.remove(),3200)}const n=document.createElement("div");n.className="eggbanner",n.innerHTML=`<span class="sp">✨</span><span class="nm">${[...e.name].map((s,o)=>`<i style="animation-delay:${o*70}ms">${s}</i>`).join("")}</span><span class="sp">✨</span>`,document.body.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3100),Hg()}function Hg(e=70){const t=["#ff8fab","#ffd166","#8ecae6","#80ed99","#c9a0dc","#ff9f68"],n=document.createElement("div");n.className="confetti",document.body.appendChild(n);for(let s=0;s<e;s++){const o=document.createElement("i");o.style.left=Math.random()*100+"vw",o.style.background=t[s%t.length],o.style.animationDelay=Math.random()*.5+"s",o.style.animationDuration=1.6+Math.random()*1.2+"s",o.style.setProperty("--r",Math.random()*720-360+"deg"),o.style.setProperty("--dx",Math.random()*160-80+"px"),s%3===0&&(o.style.borderRadius="50%"),n.appendChild(o)}setTimeout(()=>n.remove(),3600)}const B4=`[
  {
    "type": "item",
    "slug": "comfy-armchair",
    "name": "Comfy Chair",
    "room": "living",
    "category": "furniture",
    "tag": "furniture",
    "size": "large",
    "svg": "living/comfy-armchair.svg",
    "widthUnits": 161.7,
    "heightUnits": 162.5,
    "gameW": 161.7,
    "viewBox": [
      1.0,
      2.5,
      98.0,
      98.5
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
    "widthUnits": 306.0,
    "heightUnits": 108.0,
    "gameW": 306.0,
    "viewBox": [
      -1.0,
      64.0,
      102.0,
      36.0
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
    "widthUnits": 158.2,
    "heightUnits": 145.6,
    "gameW": 158.2,
    "viewBox": [
      -6.5,
      -3.0,
      113.0,
      104.0
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
    "widthUnits": 294.0,
    "heightUnits": 294.0,
    "gameW": 294.0,
    "viewBox": [
      1.0,
      3.0,
      98.0,
      98.0
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
    "widthUnits": 112.8,
    "heightUnits": 91.2,
    "gameW": 112.8,
    "viewBox": [
      3.0,
      25.0,
      94.0,
      76.0
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
    "widthUnits": 57.7,
    "heightUnits": 70.0,
    "gameW": 57.7,
    "holdable": true,
    "viewBox": [
      7.0,
      1.0,
      82.5,
      100.0
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
    "widthUnits": 78.3,
    "heightUnits": 90.9,
    "gameW": 78.3,
    "holdable": true,
    "viewBox": [
      11.0,
      0.0,
      87.0,
      101.0
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
    "widthUnits": 132.6,
    "heightUnits": 170.0,
    "gameW": 132.6,
    "viewBox": [
      11.0,
      1.0,
      78.0,
      100.0
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
    "widthUnits": 70.4,
    "heightUnits": 73.6,
    "gameW": 70.4,
    "holdable": true,
    "viewBox": [
      9.0,
      9.0,
      88.0,
      92.0
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
    "widthUnits": 75.2,
    "heightUnits": 70.0,
    "gameW": 75.2,
    "holdable": true,
    "viewBox": [
      3.0,
      13.5,
      94.0,
      87.5
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
    "widthUnits": 159.8,
    "heightUnits": 102.0,
    "gameW": 159.8,
    "viewBox": [
      3.0,
      41.0,
      94.0,
      60.0
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
    "widthUnits": 112.8,
    "heightUnits": 87.6,
    "gameW": 112.8,
    "viewBox": [
      3.0,
      28.0,
      94.0,
      73.0
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
    "widthUnits": 62.4,
    "heightUnits": 52.0,
    "gameW": 62.4,
    "viewBox": [
      11.0,
      36.0,
      78.0,
      65.0
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
    "widthUnits": 137.2,
    "heightUnits": 136.5,
    "gameW": 137.2,
    "viewBox": [
      1.0,
      3.5,
      98.0,
      97.5
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
    "widthUnits": 159.8,
    "heightUnits": 125.8,
    "gameW": 159.8,
    "viewBox": [
      3.0,
      27.0,
      94.0,
      74.0
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
    "widthUnits": 186.2,
    "heightUnits": 174.8,
    "gameW": 186.2,
    "viewBox": [
      1.0,
      9.0,
      98.0,
      92.0
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
    "widthUnits": 204.0,
    "heightUnits": 180.0,
    "gameW": 204.0,
    "viewBox": [
      -1.0,
      11.0,
      102.0,
      90.0
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
    "widthUnits": 176.4,
    "heightUnits": 90.0,
    "gameW": 176.4,
    "viewBox": [
      1.0,
      51.0,
      98.0,
      50.0
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
    "widthUnits": 135.0,
    "heightUnits": 146.2,
    "gameW": 135.0,
    "viewBox": [
      3.0,
      3.5,
      90.0,
      97.5
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
    "widthUnits": 262.6,
    "heightUnits": 68.9,
    "gameW": 262.6,
    "wall": true,
    "viewBox": [
      -0.5,
      17.5,
      101.0,
      26.5
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
    "widthUnits": 294.0,
    "heightUnits": 100.5,
    "gameW": 294.0,
    "viewBox": [
      1.0,
      67.0,
      98.0,
      33.5
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
    "widthUnits": 254.8,
    "heightUnits": 66.3,
    "gameW": 254.8,
    "viewBox": [
      1.0,
      68.5,
      98.0,
      25.5
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
    "widthUnits": 130.2,
    "heightUnits": 67.2,
    "gameW": 130.2,
    "wall": true,
    "viewBox": [
      -3.5,
      27.0,
      108.5,
      56.0
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
    "widthUnits": 156.8,
    "heightUnits": 100.0,
    "gameW": 156.8,
    "wall": true,
    "viewBox": [
      1.0,
      14.5,
      98.0,
      62.5
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
    "widthUnits": 49.7,
    "heightUnits": 63.7,
    "gameW": 49.7,
    "holdable": true,
    "viewBox": [
      9.0,
      10.0,
      71.0,
      91.0
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
    "widthUnits": 44.8,
    "heightUnits": 76.4,
    "gameW": 44.8,
    "holdable": true,
    "viewBox": [
      22.0,
      5.5,
      56.0,
      95.5
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
    "widthUnits": 118.8,
    "heightUnits": 195.7,
    "gameW": 118.8,
    "viewBox": [
      18.5,
      -2.0,
      62.5,
      103.0
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
    "widthUnits": 67.0,
    "heightUnits": 98.0,
    "gameW": 67.0,
    "wall": true,
    "viewBox": [
      17.0,
      -2.5,
      67.0,
      98.0
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
    "widthUnits": 68.2,
    "heightUnits": 103.4,
    "gameW": 68.2,
    "viewBox": [
      19.0,
      7.0,
      62.0,
      94.0
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
    "widthUnits": 81.0,
    "heightUnits": 66.2,
    "gameW": 81.0,
    "holdable": true,
    "viewBox": [
      5.0,
      27.5,
      90.0,
      73.5
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
    "widthUnits": 53.4,
    "heightUnits": 52.2,
    "gameW": 53.4,
    "holdable": true,
    "viewBox": [
      5.5,
      14.0,
      89.0,
      87.0
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
    "widthUnits": 77.4,
    "heightUnits": 72.9,
    "gameW": 77.4,
    "viewBox": [
      7.0,
      20.0,
      86.0,
      81.0
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
    "widthUnits": 69.0,
    "heightUnits": 63.0,
    "gameW": 69.0,
    "holdable": true,
    "viewBox": [
      5.0,
      17.0,
      92.0,
      84.0
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
    "widthUnits": 65.8,
    "heightUnits": 54.6,
    "gameW": 65.8,
    "holdable": true,
    "viewBox": [
      3.0,
      23.0,
      94.0,
      78.0
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
    "widthUnits": 128.7,
    "heightUnits": 127.4,
    "gameW": 128.7,
    "viewBox": [
      0.5,
      3.0,
      99.0,
      98.0
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
    "widthUnits": 41.8,
    "heightUnits": 50.9,
    "gameW": 41.8,
    "holdable": true,
    "viewBox": [
      12.0,
      8.5,
      76.0,
      92.5
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
    "widthUnits": 99.0,
    "heightUnits": 111.7,
    "gameW": 99.0,
    "viewBox": [
      5.0,
      -0.5,
      90.0,
      101.5
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
    "widthUnits": 67.9,
    "heightUnits": 46.2,
    "gameW": 67.9,
    "holdable": true,
    "viewBox": [
      1.0,
      35.0,
      97.0,
      66.0
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
    "widthUnits": 163.2,
    "heightUnits": 134.4,
    "gameW": 163.2,
    "viewBox": [
      -1.0,
      17.0,
      102.0,
      84.0
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
    "widthUnits": 294.0,
    "heightUnits": 300.0,
    "gameW": 294.0,
    "viewBox": [
      1.0,
      1.0,
      98.0,
      100.0
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
    "widthUnits": 141.0,
    "heightUnits": 126.0,
    "gameW": 141.0,
    "viewBox": [
      3.0,
      17.0,
      94.0,
      84.0
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
    "widthUnits": 69.7,
    "heightUnits": 59.5,
    "gameW": 69.7,
    "viewBox": [
      9.0,
      31.0,
      82.0,
      70.0
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
    "widthUnits": 150.5,
    "heightUnits": 178.5,
    "gameW": 150.5,
    "viewBox": [
      7.0,
      -1.0,
      86.0,
      102.0
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
    "widthUnits": 166.6,
    "heightUnits": 166.6,
    "gameW": 166.6,
    "viewBox": [
      1.0,
      3.0,
      98.0,
      98.0
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
    "widthUnits": 126.0,
    "heightUnits": 114.8,
    "gameW": 126.0,
    "viewBox": [
      5.0,
      19.0,
      90.0,
      82.0
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
    "widthUnits": 180.0,
    "heightUnits": 200.0,
    "gameW": 180.0,
    "viewBox": [
      5.0,
      1.0,
      90.0,
      100.0
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
    "widthUnits": 126.0,
    "heightUnits": 154.5,
    "gameW": 126.0,
    "viewBox": [
      9.0,
      -2.0,
      84.0,
      103.0
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
    "widthUnits": 40.7,
    "heightUnits": 51.2,
    "gameW": 40.7,
    "holdable": true,
    "viewBox": [
      13.0,
      8.0,
      74.0,
      93.0
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
    "widthUnits": 33.0,
    "heightUnits": 50.0,
    "gameW": 33.0,
    "holdable": true,
    "viewBox": [
      17.0,
      1.0,
      66.0,
      100.0
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
    "widthUnits": 91.8,
    "heightUnits": 98.5,
    "gameW": 91.8,
    "wall": true,
    "viewBox": [
      -1.0,
      -2.5,
      102.0,
      109.5
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
    "widthUnits": 217.8,
    "heightUnits": 77.0,
    "gameW": 217.8,
    "viewBox": [
      0.5,
      65.0,
      99.0,
      35.0
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
    "widthUnits": 258.7,
    "heightUnits": 98.8,
    "gameW": 258.7,
    "viewBox": [
      1.5,
      63.0,
      99.5,
      38.0
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
    "widthUnits": 118.2,
    "heightUnits": 60.6,
    "gameW": 118.2,
    "wall": true,
    "viewBox": [
      0.5,
      20.5,
      98.5,
      50.5
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
    "widthUnits": 102.3,
    "heightUnits": 105.1,
    "gameW": 102.3,
    "wall": true,
    "viewBox": [
      3.5,
      -2.5,
      93.0,
      95.5
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
    "widthUnits": 127.4,
    "heightUnits": 98.8,
    "gameW": 127.4,
    "wall": true,
    "viewBox": [
      1.0,
      11.0,
      98.0,
      76.0
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
    "widthUnits": 54.0,
    "heightUnits": 45.6,
    "gameW": 54.0,
    "holdable": true,
    "viewBox": [
      5.0,
      25.0,
      90.0,
      76.0
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
    "widthUnits": 47.3,
    "heightUnits": 38.5,
    "gameW": 47.3,
    "holdable": true,
    "viewBox": [
      7.0,
      31.0,
      86.0,
      70.0
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
    "widthUnits": 52.8,
    "heightUnits": 51.6,
    "gameW": 52.8,
    "holdable": true,
    "viewBox": [
      9.0,
      15.0,
      88.0,
      86.0
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
    "widthUnits": 109.2,
    "heightUnits": 131.6,
    "gameW": 109.2,
    "viewBox": [
      11.0,
      7.0,
      78.0,
      94.0
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
    "widthUnits": 60.2,
    "heightUnits": 72.4,
    "gameW": 60.2,
    "holdable": true,
    "viewBox": [
      7.0,
      -2.5,
      86.0,
      103.5
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
    "widthUnits": 66.3,
    "heightUnits": 90.1,
    "gameW": 66.3,
    "holdable": true,
    "viewBox": [
      11.0,
      -5.0,
      78.0,
      106.0
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
    "widthUnits": 114.4,
    "heightUnits": 115.0,
    "gameW": 114.4,
    "viewBox": [
      1.0,
      -3.5,
      104.0,
      104.5
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
    "widthUnits": 78.1,
    "heightUnits": 107.8,
    "gameW": 78.1,
    "viewBox": [
      14.5,
      3.0,
      71.0,
      98.0
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
    "widthUnits": 37.7,
    "heightUnits": 57.2,
    "gameW": 37.7,
    "holdable": true,
    "viewBox": [
      21.0,
      13.0,
      58.0,
      88.0
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
    "widthUnits": 112.8,
    "heightUnits": 119.4,
    "gameW": 112.8,
    "viewBox": [
      3.0,
      1.5,
      94.0,
      99.5
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
    "widthUnits": 51.6,
    "heightUnits": 41.7,
    "gameW": 51.6,
    "holdable": true,
    "viewBox": [
      9.0,
      31.5,
      86.0,
      69.5
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
    "widthUnits": 166.6,
    "heightUnits": 146.2,
    "gameW": 166.6,
    "viewBox": [
      1.0,
      15.0,
      98.0,
      86.0
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
    "widthUnits": 166.6,
    "heightUnits": 162.3,
    "gameW": 166.6,
    "viewBox": [
      1.0,
      5.5,
      98.0,
      95.5
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
    "widthUnits": 52.8,
    "heightUnits": 68.8,
    "gameW": 52.8,
    "viewBox": [
      17.0,
      15.0,
      66.0,
      86.0
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
    "widthUnits": 88.0,
    "heightUnits": 99.0,
    "gameW": 88.0,
    "viewBox": [
      7.0,
      11.0,
      80.0,
      90.0
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
    "widthUnits": 164.5,
    "heightUnits": 171.5,
    "gameW": 164.5,
    "viewBox": [
      3.0,
      3.0,
      94.0,
      98.0
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
    "widthUnits": 137.6,
    "heightUnits": 153.6,
    "gameW": 137.6,
    "viewBox": [
      7.0,
      5.0,
      86.0,
      96.0
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
    "widthUnits": 89.3,
    "heightUnits": 70.3,
    "gameW": 89.3,
    "viewBox": [
      3.0,
      27.0,
      94.0,
      74.0
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
    "widthUnits": 49.2,
    "heightUnits": 56.4,
    "gameW": 49.2,
    "holdable": true,
    "viewBox": [
      15.0,
      7.0,
      82.0,
      94.0
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
    "widthUnits": 55.9,
    "heightUnits": 53.0,
    "gameW": 55.9,
    "holdable": true,
    "viewBox": [
      7.0,
      19.5,
      86.0,
      81.5
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
    "widthUnits": 64.5,
    "heightUnits": 67.5,
    "gameW": 64.5,
    "viewBox": [
      7.0,
      11.0,
      86.0,
      90.0
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
    "widthUnits": 78.0,
    "heightUnits": 103.5,
    "gameW": 78.0,
    "wall": true,
    "viewBox": [
      11.0,
      -2.5,
      78.0,
      103.5
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
    "widthUnits": 207.2,
    "heightUnits": 105.0,
    "gameW": 207.2,
    "viewBox": [
      13.0,
      63.0,
      74.0,
      37.5
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
    "widthUnits": 127.4,
    "heightUnits": 94.2,
    "gameW": 127.4,
    "wall": true,
    "viewBox": [
      1.0,
      7.0,
      98.0,
      72.5
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
    "widthUnits": 107.8,
    "heightUnits": 56.7,
    "gameW": 107.8,
    "wall": true,
    "viewBox": [
      1.0,
      25.5,
      98.0,
      51.5
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
    "widthUnits": 43.8,
    "heightUnits": 54.0,
    "gameW": 43.8,
    "holdable": true,
    "viewBox": [
      13.5,
      11.0,
      73.0,
      90.0
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
    "widthUnits": 55.5,
    "heightUnits": 43.8,
    "gameW": 55.5,
    "holdable": true,
    "viewBox": [
      5.0,
      28.0,
      92.5,
      73.0
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
    "widthUnits": 33.8,
    "heightUnits": 36.6,
    "gameW": 33.8,
    "holdable": true,
    "viewBox": [
      15.0,
      9.5,
      84.5,
      91.5
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
    "widthUnits": 73.5,
    "heightUnits": 66.0,
    "gameW": 73.5,
    "holdable": true,
    "viewBox": [
      1.0,
      13.0,
      98.0,
      88.0
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
    "widthUnits": 80.4,
    "heightUnits": 40.4,
    "gameW": 80.4,
    "holdable": true,
    "viewBox": [
      3.0,
      50.5,
      100.5,
      50.5
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
    "widthUnits": 110.0,
    "heightUnits": 83.6,
    "gameW": 110.0,
    "viewBox": [
      0.0,
      25.0,
      100.0,
      76.0
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
    "widthUnits": 79.8,
    "heightUnits": 120.0,
    "gameW": 79.8,
    "viewBox": [
      18.0,
      1.0,
      66.5,
      100.0
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
    "widthUnits": 44.5,
    "heightUnits": 42.5,
    "gameW": 44.5,
    "holdable": true,
    "viewBox": [
      14.0,
      17.0,
      89.0,
      85.0
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
    "widthUnits": 45.0,
    "heightUnits": 34.0,
    "gameW": 45.0,
    "holdable": true,
    "viewBox": [
      5.0,
      33.0,
      90.0,
      68.0
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
    "widthUnits": 56.4,
    "heightUnits": 47.1,
    "gameW": 56.4,
    "holdable": true,
    "viewBox": [
      3.0,
      22.5,
      94.0,
      78.5
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
    "widthUnits": 18.4,
    "heightUnits": 39.8,
    "gameW": 18.4,
    "holdable": true,
    "viewBox": [
      27.0,
      -0.5,
      46.0,
      99.5
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
    "widthUnits": 23.2,
    "heightUnits": 37.6,
    "gameW": 23.2,
    "holdable": true,
    "viewBox": [
      21.0,
      7.0,
      58.0,
      94.0
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
    "widthUnits": 48.4,
    "heightUnits": 44.0,
    "gameW": 48.4,
    "holdable": true,
    "viewBox": [
      6.0,
      21.0,
      88.0,
      80.0
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
    "widthUnits": 32.9,
    "heightUnits": 44.8,
    "gameW": 32.9,
    "holdable": true,
    "viewBox": [
      13.5,
      1.5,
      73.0,
      99.5
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
    "widthUnits": 76.5,
    "heightUnits": 67.6,
    "gameW": 76.5,
    "viewBox": [
      5.0,
      21.5,
      90.0,
      79.5
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
    "widthUnits": 49.5,
    "heightUnits": 34.4,
    "gameW": 49.5,
    "holdable": true,
    "viewBox": [
      5.0,
      38.5,
      90.0,
      62.5
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
    "widthUnits": 37.4,
    "heightUnits": 37.6,
    "gameW": 37.4,
    "holdable": true,
    "viewBox": [
      8.5,
      17.5,
      83.0,
      83.5
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
    "widthUnits": 63.0,
    "heightUnits": 70.0,
    "gameW": 63.0,
    "holdable": true,
    "viewBox": [
      5.0,
      1.0,
      90.0,
      100.0
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
    "widthUnits": 52.8,
    "heightUnits": 78.4,
    "gameW": 52.8,
    "viewBox": [
      17.0,
      3.0,
      66.0,
      98.0
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
    "widthUnits": 56.4,
    "heightUnits": 44.4,
    "gameW": 56.4,
    "holdable": true,
    "viewBox": [
      3.0,
      27.0,
      94.0,
      74.0
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
    "svg": "packs/welcome-home/wood-bookshelf.svg"
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
    "svg": "packs/welcome-home/lattice-bench.svg"
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
    "svg": "packs/welcome-home/wood-coffee-table.svg"
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
    "svg": "packs/welcome-home/wood-desk.svg"
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
    "svg": "packs/welcome-home/big-wardrobe.svg"
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
    "svg": "packs/welcome-home/glass-cabinet.svg"
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
    "svg": "packs/welcome-home/ladder-shelf.svg"
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
    "svg": "packs/welcome-home/box-stack.svg"
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
    "svg": "packs/welcome-home/wh-fiddle-leaf-fig.svg"
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
    "svg": "packs/welcome-home/apple-tree.svg"
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
    "svg": "packs/welcome-home/mini-greenhouse.svg"
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
    "svg": "packs/welcome-home/brick-fireplace.svg"
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
    "svg": "packs/welcome-home/wh-pendant-lamp.svg"
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
    "svg": "packs/welcome-home/wh-arc-floor-lamp.svg"
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
    "svg": "packs/welcome-home/cream-sofa.svg"
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
    "svg": "packs/welcome-home/wooden-bed.svg"
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
    "svg": "packs/welcome-home/sale-sign.svg"
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
    "svg": "packs/welcome-home/fire-pit.svg"
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
    "svg": "packs/welcome-home/hanging-lantern.svg"
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
    "svg": "packs/welcome-home/round-rug.svg"
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
    "svg": "packs/welcome-home/stripe-runner.svg"
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
    "svg": "packs/welcome-home/wood-armchair.svg"
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
    "svg": "packs/welcome-home/wh-nightstand.svg"
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
    "svg": "packs/welcome-home/wh-kitchen-counter.svg"
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
    "svg": "packs/welcome-home/wood-stool.svg"
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
    "svg": "packs/welcome-home/wh-dresser.svg"
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
    "svg": "packs/welcome-home/wh-snake-plant.svg"
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
    "svg": "packs/welcome-home/leaf-wreath.svg"
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
    "svg": "packs/sunny-vibes/ring-light.svg"
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
    "svg": "packs/sunny-vibes/gaming-chair.svg"
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
    "svg": "packs/sunny-vibes/curvy-desk.svg"
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
    "svg": "packs/sunny-vibes/cloud-sofa.svg"
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
    "svg": "packs/sunny-vibes/arched-mirror.svg"
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
    "svg": "packs/sunny-vibes/clothes-rail.svg"
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
    "svg": "packs/sunny-vibes/cube-shelf.svg"
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
    "svg": "packs/sunny-vibes/big-monitor.svg"
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
    "svg": "packs/sunny-vibes/star-lamp.svg"
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
    "svg": "packs/sunny-vibes/flower-lamp.svg"
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
    "svg": "packs/sunny-vibes/mini-fridge.svg"
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
    "svg": "packs/sunny-vibes/bubble-bath.svg"
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
    "svg": "packs/sunny-vibes/checker-rug.svg"
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
    "svg": "packs/sunny-vibes/sv-cloud-rug.svg"
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
    "svg": "packs/sunny-vibes/pothos-plant.svg"
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
    "svg": "packs/sunny-vibes/checker-bed.svg"
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
    "svg": "packs/sunny-vibes/puffy-stool.svg"
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
    "svg": "packs/sunny-vibes/sv-wall-shelf.svg"
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
    "svg": "packs/sunny-vibes/heart-light.svg"
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
    "svg": "packs/sunny-vibes/sv-bean-bag.svg"
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
    "svg": "packs/sunny-vibes/wavy-floor-lamp.svg"
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
    "svg": "packs/sunny-vibes/pastel-wardrobe.svg"
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
    "svg": "packs/sunny-vibes/side-table-round.svg"
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
    "svg": "packs/glossy/salon-chair.svg"
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
    "svg": "packs/glossy/wash-chair.svg"
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
    "svg": "packs/glossy/glow-mirror.svg"
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
    "svg": "packs/glossy/pink-vanity.svg"
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
    "svg": "packs/glossy/polish-rack.svg"
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
    "svg": "packs/glossy/lotion-trio.svg"
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
    "svg": "packs/glossy/towel-cart.svg"
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
    "svg": "packs/glossy/nail-table.svg"
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
    "svg": "packs/glossy/arched-shelf.svg"
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
    "svg": "packs/glossy/pink-fountain.svg"
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
    "svg": "packs/glossy/fancy-sofa.svg"
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
    "svg": "packs/glossy/lilac-curtain.svg"
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
    "svg": "packs/glossy/reception-desk.svg"
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
    "svg": "packs/glossy/bubbly-plant.svg"
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
    "svg": "packs/glossy/vine-planter.svg"
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
    "svg": "packs/glossy/flower-cart.svg"
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
    "svg": "packs/glossy/globe-pendants.svg"
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
    "svg": "packs/glossy/drop-lamp.svg"
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
    "svg": "packs/glossy/gold-floor-mirror.svg"
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
    "svg": "packs/glossy/heart-pouf.svg"
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
    "svg": "packs/glossy/swivel-stool.svg"
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
    "svg": "packs/glossy/blob-rug.svg"
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
    "svg": "packs/glossy/pebble-rug.svg"
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
    "svg": "packs/glossy/foot-spa.svg"
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
    "svg": "packs/glossy/star-wall-sign.svg"
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
    "svg": "packs/glossy/waiting-bench.svg"
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
`,O4=`[
  {
    "slug": "leafy-cream",
    "name": "Leafy Cream",
    "type": "wallpaper",
    "pack": "welcome-home",
    "svg": "welcome-home/leafy-cream.svg"
  },
  {
    "slug": "orange-gingham",
    "name": "Orange Gingham",
    "type": "wallpaper",
    "pack": "welcome-home",
    "svg": "welcome-home/orange-gingham.svg"
  },
  {
    "slug": "wood-panel",
    "name": "Wood Panel",
    "type": "wallpaper",
    "pack": "welcome-home",
    "svg": "welcome-home/wood-panel.svg"
  },
  {
    "slug": "wood-planks",
    "name": "Wood Planks",
    "type": "floor",
    "pack": "welcome-home",
    "svg": "welcome-home/wood-planks.svg"
  },
  {
    "slug": "terracotta-tiles",
    "name": "Terracotta Tiles",
    "type": "floor",
    "pack": "welcome-home",
    "svg": "welcome-home/terracotta-tiles.svg"
  },
  {
    "slug": "sunny-stars",
    "name": "Sunny Stars",
    "type": "wallpaper",
    "pack": "sunny-vibes",
    "svg": "sunny-vibes/sunny-stars.svg"
  },
  {
    "slug": "mint-checks",
    "name": "Mint Checks",
    "type": "wallpaper",
    "pack": "sunny-vibes",
    "svg": "sunny-vibes/mint-checks.svg"
  },
  {
    "slug": "sky-clouds",
    "name": "Sky Clouds",
    "type": "wallpaper",
    "pack": "sunny-vibes",
    "svg": "sunny-vibes/sky-clouds.svg"
  },
  {
    "slug": "butter-check-floor",
    "name": "Butter Check Floor",
    "type": "floor",
    "pack": "sunny-vibes",
    "svg": "sunny-vibes/butter-check-floor.svg"
  },
  {
    "slug": "sky-tiles",
    "name": "Sky Tiles",
    "type": "floor",
    "pack": "sunny-vibes",
    "svg": "sunny-vibes/sky-tiles.svg"
  },
  {
    "slug": "pink-hearts",
    "name": "Pink Hearts",
    "type": "wallpaper",
    "pack": "glossy",
    "svg": "glossy/pink-hearts.svg"
  },
  {
    "slug": "lilac-stripes",
    "name": "Lilac Stripes",
    "type": "wallpaper",
    "pack": "glossy",
    "svg": "glossy/lilac-stripes.svg"
  },
  {
    "slug": "mint-bubbles",
    "name": "Mint Bubbles",
    "type": "wallpaper",
    "pack": "glossy",
    "svg": "glossy/mint-bubbles.svg"
  },
  {
    "slug": "pink-check-floor",
    "name": "Pink Check Floor",
    "type": "floor",
    "pack": "glossy",
    "svg": "glossy/pink-check-floor.svg"
  },
  {
    "slug": "lilac-terrazzo",
    "name": "Lilac Terrazzo",
    "type": "floor",
    "pack": "glossy",
    "svg": "glossy/lilac-terrazzo.svg"
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
    "svg": "cottage/cc-lilac-gingham.svg"
  },
  {
    "slug": "cc-peach-scallops",
    "name": "Peach Scallops",
    "type": "wallpaper",
    "pack": "cottage",
    "svg": "cottage/cc-peach-scallops.svg"
  },
  {
    "slug": "cc-mint-florals",
    "name": "Mint Florals",
    "type": "wallpaper",
    "pack": "cottage",
    "svg": "cottage/cc-mint-florals.svg"
  },
  {
    "slug": "cc-pink-plaid",
    "name": "Pink Plaid",
    "type": "wallpaper",
    "pack": "cottage",
    "svg": "cottage/cc-pink-plaid.svg"
  },
  {
    "slug": "cc-butter-polka",
    "name": "Butter Polka",
    "type": "wallpaper",
    "pack": "cottage",
    "svg": "cottage/cc-butter-polka.svg"
  },
  {
    "slug": "cc-lavender-lattice",
    "name": "Lavender Lattice",
    "type": "wallpaper",
    "pack": "cottage",
    "svg": "cottage/cc-lavender-lattice.svg"
  },
  {
    "slug": "cc-rose-herringbone",
    "name": "Rose Herringbone",
    "type": "floor",
    "pack": "cottage",
    "svg": "cottage/cc-rose-herringbone.svg"
  },
  {
    "slug": "cc-cream-hex",
    "name": "Cream Hex Tiles",
    "type": "floor",
    "pack": "cottage",
    "svg": "cottage/cc-cream-hex.svg"
  },
  {
    "slug": "cc-rag-planks",
    "name": "Pastel Rag Rug",
    "type": "floor",
    "pack": "cottage",
    "svg": "cottage/cc-rag-planks.svg"
  },
  {
    "slug": "cc-mint-checks",
    "name": "Mint Gingham Floor",
    "type": "floor",
    "pack": "cottage",
    "svg": "cottage/cc-mint-checks.svg"
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
`,D4="/kids-house-game/assets/alarm-clock-BCd1-e86.svg",H4="/kids-house-game/assets/bedtime-snack-BoNDQqOK.svg",W4="/kids-house-game/assets/book-stack-upnp1NwG.svg",V4="/kids-house-game/assets/bunk-bed-YZiRWNFR.svg",U4="/kids-house-game/assets/bunny-slippers-PNucIc_Q.svg",z4="/kids-house-game/assets/canopy-bed-BwWkRhe2.svg",Q4="/kids-house-game/assets/cat-bed-B8ULFbHc.svg",N4="/kids-house-game/assets/cloud-rug-CFl6aZc5.svg",q4="/kids-house-game/assets/cloud-shelf-DF5b_IoZ.svg",F4="/kids-house-game/assets/cork-board-Bj5OuLbv.svg",j4="/kids-house-game/assets/daisy-pot-Cy8SrSS6.svg",Z4="/kids-house-game/assets/desk-2rRtV3Vk.svg",G4="/kids-house-game/assets/dino-plush-Dq_qccf0.svg",Y4="/kids-house-game/assets/doll-house-BrC3RiST.svg",K4="/kids-house-game/assets/dresser-__9TGuYc.svg",X4="/kids-house-game/assets/egg-chair-CtiaqWNQ.svg",J4="/kids-house-game/assets/floor-fan-Dt9SIAmB.svg",e6="/kids-house-game/assets/guinea-pig-CwLeNU_S.svg",t6="/kids-house-game/assets/hamster-cage-lQ6r7saV.svg",n6="/kids-house-game/assets/heart-rug-CBDvH6Q6.svg",s6="/kids-house-game/assets/lava-lamp-DEuHvlco.svg",o6="/kids-house-game/assets/moon-night-light-CAKsjYZv.svg",i6="/kids-house-game/assets/nightstand-Bgsh0YUi.svg",a6="/kids-house-game/assets/paper-lantern-CErOGyrT.svg",r6="/kids-house-game/assets/piggy-bank-DsHrmOcp.svg",l6="/kids-house-game/assets/plant-stand-DDyIDaL0.svg",c6="/kids-house-game/assets/play-tent-Bsawe52j.svg",d6="/kids-house-game/assets/star-mobile-DzOGs-Jo.svg",f6="/kids-house-game/assets/toy-chest-6iPrDiZH.svg",h6="/kids-house-game/assets/toy-robot-OaCEwmDT.svg",u6="/kids-house-game/assets/toy-train-D5GqAnpy.svg",p6="/kids-house-game/assets/unicorn-plush-C0W1eEs9.svg",g6="/kids-house-game/assets/wardrobe-Dn492IK0.svg",m6="/kids-house-game/assets/bananas-aPQwdEVo.svg",y6="/kids-house-game/assets/bar-stool-DWxhX1Ah.svg",b6="/kids-house-game/assets/bread-loaf-C9cEAYcl.svg",w6="/kids-house-game/assets/chick-BTEVfgqU.svg",k6="/kids-house-game/assets/china-hutch-BTmMY6rg.svg",v6="/kids-house-game/assets/cocoa-mug-CraNCc9b.svg",_6="/kids-house-game/assets/cookie-jar-ripj0oyT.svg",$6="/kids-house-game/assets/cooking-pot-BWtfOm9f.svg",x6="/kids-house-game/assets/cupcake-DFCw42xb.svg",M6="/kids-house-game/assets/dish-rack-BpVmmU6k.svg",L6="/kids-house-game/assets/fruit-bowl-Dw9lsB3B.svg",E6="/kids-house-game/assets/frying-pan-CTBY6MC_.svg",S6="/kids-house-game/assets/happy-fridge-D7ENuEJs.svg",T6="/kids-house-game/assets/herb-box-CdRxefnV.svg",P6="/kids-house-game/assets/high-chair-BQtLYlq4.svg",A6="/kids-house-game/assets/ice-cream-DydSyNXx.svg",R6="/kids-house-game/assets/kettle-D1nuAiG_.svg",C6="/kids-house-game/assets/kitchen-counter-C8sTAZ-V.svg",I6="/kids-house-game/assets/kitchen-sink-CYjDcd1n.svg",B6="/kids-house-game/assets/lemon-tree-CZz-Vy3P.svg",O6="/kids-house-game/assets/microwave-lopm-FCT.svg",D6="/kids-house-game/assets/milk-bottle-DxcUA6XT.svg",H6="/kids-house-game/assets/pancakes-CLqxnc5R.svg",W6="/kids-house-game/assets/pantry-shelf-Azdxpmzd.svg",V6="/kids-house-game/assets/pendant-lamp-fZv6y1p0.svg",U6="/kids-house-game/assets/pet-bowl-ETL_EOAP.svg",z6="/kids-house-game/assets/rice-cooker-JX0L4bi2.svg",Q6="/kids-house-game/assets/runner-rug-BbUgZFy4.svg",N6="/kids-house-game/assets/spice-rack-D9kAw-vT.svg",q6="/kids-house-game/assets/stand-mixer-CZrLn00l.svg",F6="/kids-house-game/assets/teapot-CtPOJzEm.svg",j6="/kids-house-game/assets/toaster-CNk0hJDw.svg",Z6="/kids-house-game/assets/utensil-rail-B0QkGP3A.svg",G6="/kids-house-game/assets/watermelon-slice-VzvgalD5.svg",Y6="/kids-house-game/assets/aquarium-BlhJ9UCr.svg",K6="/kids-house-game/assets/arc-floor-lamp-DL5cEVzq.svg",X6="/kids-house-game/assets/bean-bag-CauyDuZQ.svg",J6="/kids-house-game/assets/bird-cage-xqeVahX7.svg",e_="/kids-house-game/assets/blanket-basket-B4LREUo9.svg",t_="/kids-house-game/assets/building-blocks-DbtoodPT.svg",n_="/kids-house-game/assets/coffee-table-ZYO2ApH6.svg",s_="/kids-house-game/assets/comfy-armchair-tjNYbfgO.svg",o_="/kids-house-game/assets/cubby-shelf-CLzTUpiz.svg",i_="/kids-house-game/assets/daisy-rug-CvOlxjsu.svg",a_="/kids-house-game/assets/fiddle-leaf-fig-DiUNW4Q_.svg",r_="/kids-house-game/assets/fireplace-CqxIMN3Z.svg",l_="/kids-house-game/assets/globe-DN0sih3W.svg",c_="/kids-house-game/assets/hanging-planter-M9IHqztp.svg",d_="/kids-house-game/assets/monstera-plant-CLmuB_RM.svg",f_="/kids-house-game/assets/piano-Y0KQ4rD2.svg",h_="/kids-house-game/assets/popcorn-BD2d8sUH.svg",u_="/kids-house-game/assets/pouf-as0li8On.svg",p_="/kids-house-game/assets/rainbow-rug-C5ZVauOA.svg",g_="/kids-house-game/assets/rainbow-wall-art-CCXUPPen.svg",m_="/kids-house-game/assets/retro-radio-B3T98xMQ.svg",y_="/kids-house-game/assets/rocking-chair-BgoIQu5H.svg",b_="/kids-house-game/assets/rocking-horse-1WLLV43R.svg",w_="/kids-house-game/assets/snake-plant-BGDwPcMj.svg",k_="/kids-house-game/assets/string-lights-DGC0Ni2I.svg",v_="/kids-house-game/assets/succulent-trio-uPD-ljlL.svg",__="/kids-house-game/assets/tassel-rug-DolXtxfQ.svg",$_="/kids-house-game/assets/throw-pillow-qWyWQ9cT.svg",x_="/kids-house-game/assets/toy-car-CTJy5H4V.svg",M_="/kids-house-game/assets/tulip-vase-o2vjI1Hg.svg",L_="/kids-house-game/assets/turtle-B9Y6NDSv.svg",E_="/kids-house-game/assets/tv-stand-CcLHFc1J.svg",S_="/kids-house-game/assets/wall-shelf-CCWuZ6Xl.svg",T_="/kids-house-game/assets/cc-bakery-shelf-BxdhLTTC.svg",P_="/kids-house-game/assets/cc-breakfast-table-DwaO0eFy.svg",A_="/kids-house-game/assets/cc-bubble-chair-DncHA7F-.svg",R_="/kids-house-game/assets/cc-canopy-daybed-CVbt6QDr.svg",C_="/kids-house-game/assets/cc-cloud-beanbag-SM0m-3qY.svg",I_="/kids-house-game/assets/cc-cloud-lamp-BWwxoCux.svg",B_="/kids-house-game/assets/cc-cottage-aquarium-iY2D26Vq.svg",O_="/kids-house-game/assets/cc-cupcake-stand-B08kdXZL.svg",D_="/kids-house-game/assets/cc-dryer-chair-DQmosxUz.svg",H_="/kids-house-game/assets/cc-fairy-garland-BncKvkRL.svg",W_="/kids-house-game/assets/cc-fairy-shelf-CE6x7J1w.svg",V_="/kids-house-game/assets/cc-flower-kettle-ZTbAh26L.svg",U_="/kids-house-game/assets/cc-flower-lamp-CS2T2S89.svg",z_="/kids-house-game/assets/cc-heart-bed-76-z9nJg.svg",Q_="/kids-house-game/assets/cc-heart-clock-ByixSFru.svg",N_="/kids-house-game/assets/cc-heart-pouf-DH5J2s2J.svg",q_="/kids-house-game/assets/cc-heart-rug-Jwmh-m0j.svg",F_="/kids-house-game/assets/cc-jewel-box-qMbIQmo4.svg",j_="/kids-house-game/assets/cc-light-vanity-DD4uQJ_7.svg",Z_="/kids-house-game/assets/cc-macaron-jar-A0sT-Lvj.svg",G_="/kids-house-game/assets/cc-macrame-swing-qIcoPp0o.svg",Y_="/kids-house-game/assets/cc-mani-chair-7AWb60tv.svg",K_="/kids-house-game/assets/cc-mint-fridge-Cc87e_gW.svg",X_="/kids-house-game/assets/cc-mushroom-stool-B9-y9WNf.svg",J_="/kids-house-game/assets/cc-pastel-range-D6cjzJTl.svg",e8="/kids-house-game/assets/cc-perfume-tray-DN4chcIn.svg",t8="/kids-house-game/assets/cc-petal-table-QrNho7KH.svg",n8="/kids-house-game/assets/cc-plant-wall-BMii8_kR.svg",s8="/kids-house-game/assets/cc-reading-nook-wiDgasP8.svg",o8="/kids-house-game/assets/cc-record-player-BoxZhHLy.svg",i8="/kids-house-game/assets/cc-ribbon-mirror-DiCje_iy.svg",a8="/kids-house-game/assets/cc-scallop-curtains-Bzhy2peV.svg",r8="/kids-house-game/assets/cc-scallop-loveseat-Dfi7dg3b.svg",l8="/kids-house-game/assets/cc-star-dresser-2wqSnsip.svg",c8="/kids-house-game/assets/cc-teapot-set-DnZlJvn7.svg",d8="/kids-house-game/assets/cc-window-seat-BCOise4Z.svg",f8="/kids-house-game/assets/arched-shelf-XtiqRVaT.svg",h8="/kids-house-game/assets/blob-rug-Deh5k10s.svg",u8="/kids-house-game/assets/bubbly-plant-CFTOJd5Y.svg",p8="/kids-house-game/assets/bud-vase-Dup4WQ5y.svg",g8="/kids-house-game/assets/comb-brush-oPJeQv0v.svg",m8="/kids-house-game/assets/cream-jars-D6bxrnJR.svg",y8="/kids-house-game/assets/drop-lamp-CJg63ZKz.svg",b8="/kids-house-game/assets/droplet-buddy-DTpHggFh.svg",w8="/kids-house-game/assets/fancy-sofa-kq2L0ob5.svg",k8="/kids-house-game/assets/flower-cart-BWgfg0s_.svg",v8="/kids-house-game/assets/foot-spa-DdA5_fj_.svg",_8="/kids-house-game/assets/globe-pendants-DNV5WnAO.svg",$8="/kids-house-game/assets/glow-mirror-C_dTGwQc.svg",x8="/kids-house-game/assets/gold-floor-mirror-jfPQepmr.svg",M8="/kids-house-game/assets/hair-dryer-CAkhCf7J.svg",L8="/kids-house-game/assets/heart-plant-fSU4uLVy.svg",E8="/kids-house-game/assets/heart-pouf-BMVPBVKJ.svg",S8="/kids-house-game/assets/lilac-curtain-D_mFsZKu.svg",T8="/kids-house-game/assets/lotion-trio-D3lKwvho.svg",P8="/kids-house-game/assets/mani-lamp-B4SmvhvS.svg",A8="/kids-house-game/assets/nail-table-C3FitmuG.svg",R8="/kids-house-game/assets/pebble-rug-DHBZUggl.svg",C8="/kids-house-game/assets/perfume-bottle-BcNXSWTW.svg",I8="/kids-house-game/assets/pink-fountain-DQ3CIetr.svg",B8="/kids-house-game/assets/pink-vanity-qE3SwdD6.svg",O8="/kids-house-game/assets/polish-bottle-VWed8EQ-.svg",D8="/kids-house-game/assets/polish-rack-8Ph2n2nM.svg",H8="/kids-house-game/assets/reception-desk-D4Gevx64.svg",W8="/kids-house-game/assets/salon-chair-Wj2sOSW8.svg",V8="/kids-house-game/assets/scent-candle-BEUE-6Uv.svg",U8="/kids-house-game/assets/spray-bottle-Bc8iuceJ.svg",z8="/kids-house-game/assets/star-wall-sign-DvenTqvU.svg",Q8="/kids-house-game/assets/swivel-stool-P-Egqq_Z.svg",N8="/kids-house-game/assets/tiered-tray-DLnZTsUF.svg",q8="/kids-house-game/assets/towel-cart-DJmR97UL.svg",F8="/kids-house-game/assets/towel-stack-C1qplZ4T.svg",j8="/kids-house-game/assets/vine-planter-Duhx9OMZ.svg",Z8="/kids-house-game/assets/waiting-bench-BQuoXbE3.svg",G8="/kids-house-game/assets/wash-chair-sdgNnj79.svg",Y8="/kids-house-game/assets/hw-candy-bowl-CD02D5Zj.webp",K8="/kids-house-game/assets/hw-cat-statue-DeCc_3q0.webp",X8="/kids-house-game/assets/hw-cauldron-Dct8_uZ8.webp",J8="/kids-house-game/assets/hw-ghost-sheet-kZF5Oxdt.webp",e$="/kids-house-game/assets/hw-hay-bale-BqFYl-D_.webp",t$="/kids-house-game/assets/hw-heart-pumpkin-B-0-0OAK.webp",n$="/kids-house-game/assets/hw-leaf-garland-DN-y_jMP.webp",s$="/kids-house-game/assets/hw-moon-cling-p5ei0N89.webp",o$="/kids-house-game/assets/hw-moon-lantern-ByPteKOL.webp",i$="/kids-house-game/assets/hw-star-pumpkin-Bxq_OX8C.webp",a$="/kids-house-game/assets/hw-witch-hat-BmuOG13B.webp",r$="/kids-house-game/assets/arched-mirror-ClJgTBd9.svg",l$="/kids-house-game/assets/big-monitor-jx5PnUa_.svg",c$="/kids-house-game/assets/boba-cup-CwUerXNm.svg",d$="/kids-house-game/assets/bubble-bath-8VwrkImA.svg",f$="/kids-house-game/assets/cactus-buddy-D3uacuVA.svg",h$="/kids-house-game/assets/caterpillar-plush-BhR8Pydf.svg",u$="/kids-house-game/assets/checker-bed-mtuxfPje.svg",p$="/kids-house-game/assets/checker-rug-CmSO3Y4j.svg",g$="/kids-house-game/assets/clothes-rail-BY-f9coz.svg",m$="/kids-house-game/assets/cloud-sofa-CZS1Y5s-.svg",y$="/kids-house-game/assets/cube-shelf-DoI0tLGL.svg",b$="/kids-house-game/assets/curvy-desk-eWCvec1f.svg",w$="/kids-house-game/assets/cute-speaker-DrVF9uns.svg",k$="/kids-house-game/assets/desk-lamp-C-VtrE1V.svg",v$="/kids-house-game/assets/desk-mic-BqYzh6ma.svg",_$="/kids-house-game/assets/flower-lamp-Dpz6tQ2x.svg",$$="/kids-house-game/assets/frog-plush-BhkTrE24.svg",x$="/kids-house-game/assets/game-controller-6gvwykQG.svg",M$="/kids-house-game/assets/gaming-chair-BCyGMzy0.svg",L$="/kids-house-game/assets/hamster-pet-LBcghoJj.svg",E$="/kids-house-game/assets/headphones-Cjjqt_92.svg",S$="/kids-house-game/assets/heart-light-DfDwRHju.svg",T$="/kids-house-game/assets/keyboard-Cbtwvtj1.svg",P$="/kids-house-game/assets/mini-fridge-qdNm4NKf.svg",A$="/kids-house-game/assets/pastel-wardrobe-BubkWAN2.svg",R$="/kids-house-game/assets/phone-stand-VLW-DsK-.svg",C$="/kids-house-game/assets/pothos-plant-C1I15M9a.svg",I$="/kids-house-game/assets/puffy-stool-CwjoblCa.svg",B$="/kids-house-game/assets/ring-light-CdxNAXA6.svg",O$="/kids-house-game/assets/side-table-round-rCsBU0YO.svg",D$="/kids-house-game/assets/star-lamp-CHKQnzvB.svg",H$="/kids-house-game/assets/sticker-board-LUm1_I_P.svg",W$="/kids-house-game/assets/sunny-art-C25M7k02.svg",V$="/kids-house-game/assets/sv-bean-bag-DdsCYd4e.svg",U$="/kids-house-game/assets/sv-cloud-rug-BvczSj77.svg",z$="/kids-house-game/assets/sv-wall-shelf-BtJLzNMg.svg",Q$="/kids-house-game/assets/vlog-camera-CBd28A7P.svg",N$="/kids-house-game/assets/wavy-floor-lamp-Iy8llzr8.svg",q$="/kids-house-game/assets/acorn-friend-BsLiZ2Z_.svg",F$="/kids-house-game/assets/apple-tree-DGIUIjY1.svg",j$="/kids-house-game/assets/big-wardrobe-BnfnkPXl.svg",Z$="/kids-house-game/assets/box-stack-ji13G2mP.svg",G$="/kids-house-game/assets/brick-fireplace-BGCbiSK5.svg",Y$="/kids-house-game/assets/bulletin-board-DqA69wQH.svg",K$="/kids-house-game/assets/cozy-mug-CFJEPRKb.svg",X$="/kids-house-game/assets/cream-sofa-CB4EWIDp.svg",J$="/kids-house-game/assets/fire-pit-DTyRokIj.svg",e3="/kids-house-game/assets/glass-cabinet-BCHExP4F.svg",t3="/kids-house-game/assets/hanging-lantern-DZbXB8L1.svg",n3="/kids-house-game/assets/knit-cushion-DUewI6rR.svg",s3="/kids-house-game/assets/ladder-shelf-DXYDmQiE.svg",o3="/kids-house-game/assets/landscape-art-CdCqCPL2.svg",i3="/kids-house-game/assets/lattice-bench-D3zCZTQp.svg",a3="/kids-house-game/assets/leaf-wreath-DUjq1MWh.svg",r3="/kids-house-game/assets/mini-greenhouse-CGE5F9A_.svg",l3="/kids-house-game/assets/moving-box-CZXbXcJO.svg",c3="/kids-house-game/assets/picnic-basket-D72DCNRY.svg",d3="/kids-house-game/assets/round-rug-D8ePosbv.svg",f3="/kids-house-game/assets/sale-sign-CXWpgQt5.svg",h3="/kids-house-game/assets/sprout-pot-BbXk09mS.svg",u3="/kids-house-game/assets/stripe-runner-ClycKEW5.svg",p3="/kids-house-game/assets/trailing-plant-NbG7dy8O.svg",g3="/kids-house-game/assets/wall-clock-CDC1o6eG.svg",m3="/kids-house-game/assets/wh-arc-floor-lamp-BKVes2Fd.svg",y3="/kids-house-game/assets/wh-book-stack-DjDFey2h.svg",b3="/kids-house-game/assets/wh-dresser-Y-jnNt5q.svg",w3="/kids-house-game/assets/wh-fiddle-leaf-fig-B0-kGmHI.svg",k3="/kids-house-game/assets/wh-kitchen-counter-BtBenu6u.svg",v3="/kids-house-game/assets/wh-nightstand-DPUoV5aO.svg",_3="/kids-house-game/assets/wh-pendant-lamp-DBg4p7hi.svg",$3="/kids-house-game/assets/wh-snake-plant-Cj3bHF25.svg",x3="/kids-house-game/assets/wh-string-lights-C3JVBkgW.svg",M3="/kids-house-game/assets/wh-teapot-kevlW5hN.svg",L3="/kids-house-game/assets/wood-armchair-DNVhKBWe.svg",E3="/kids-house-game/assets/wood-bookshelf-CvT7GAuI.svg",S3="/kids-house-game/assets/wood-coffee-table-CuAR_7Kr.svg",T3="/kids-house-game/assets/wood-desk-DPCJq_XQ.svg",P3="/kids-house-game/assets/wood-stool-CV7YeZwC.svg",A3="/kids-house-game/assets/wooden-bed-Qj-sf8yq.svg",R3="/kids-house-game/assets/wc-bauble-garland-PlBim-j0.webp",C3="/kids-house-game/assets/wc-berry-wreath-BtfH1PGe.webp",I3="/kids-house-game/assets/wc-birch-basket-vRxqyB3J.webp",B3="/kids-house-game/assets/wc-cabin-picture-B-lavF1R.webp",O3="/kids-house-game/assets/wc-candle-trio-CjQ7YYcj.webp",D3="/kids-house-game/assets/wc-cane-lamp-OhwvqNa-.webp",H3="/kids-house-game/assets/wc-cinnamon-tray-CxLrtplK.webp",W3="/kids-house-game/assets/wc-cocoa-cart-BkMzGgs0.webp",V3="/kids-house-game/assets/wc-cocoa-mug-qa2xzTYd.webp",U3="/kids-house-game/assets/wc-cocoa-pot-bLgiaNKD.webp",z3="/kids-house-game/assets/wc-cookie-oven-D2Ud1EPt.webp",Q3="/kids-house-game/assets/wc-cookie-plate-RhDZYroJ.webp",N3="/kids-house-game/assets/wc-frost-bookcase-BMd6DAXH.webp",q3="/kids-house-game/assets/wc-frosted-pine-BupMG4GK.webp",F3="/kids-house-game/assets/wc-fur-bench-B1nXjHAR.webp",j3="/kids-house-game/assets/wc-gingerbread-village-8pOXPPCY.webp",Z3="/kids-house-game/assets/wc-gingerbread-PGlclkJ_.webp",G3="/kids-house-game/assets/wc-globe-lamp-DUCVl_3A.webp",Y3="/kids-house-game/assets/wc-holiday-tree-CO0SBlqY.webp",K3="/kids-house-game/assets/wc-holly-CD8teo0a.webp",X3="/kids-house-game/assets/wc-ice-skates-D49y8YK1.webp",J3="/kids-house-game/assets/wc-ice-wardrobe-Dliflqpp.webp",ex="/kids-house-game/assets/wc-knit-armchair-84rhSw_8.webp",tx="/kids-house-game/assets/wc-lantern-81B3e5fN.webp",nx="/kids-house-game/assets/wc-log-bench-qQ1zT34_.webp",sx="/kids-house-game/assets/wc-marshmallow-jar-DeWRr-zf.webp",ox="/kids-house-game/assets/wc-mitten-line-sg-sweCl.webp",ix="/kids-house-game/assets/wc-mitten-ottoman-H5qkjso6.webp",ax="/kids-house-game/assets/wc-mug-shelf-DlWrwZYo.webp",rx="/kids-house-game/assets/wc-nutcracker-BGZe5tYy.webp",lx="/kids-house-game/assets/wc-penguin-chair-CDM1eIxo.webp",cx="/kids-house-game/assets/wc-penguin-plush-C8B27KcB.webp",dx="/kids-house-game/assets/wc-peppermint-counter-CPl6TA0h.webp",fx="/kids-house-game/assets/wc-peppermint-rug-3nakY_gB.webp",hx="/kids-house-game/assets/wc-pinecone-garland-s7ZWASw2.webp",ux="/kids-house-game/assets/wc-pinecone-table-DlJvjB-2.webp",px="/kids-house-game/assets/wc-plaid-bed-eAhWKZdO.webp",gx="/kids-house-game/assets/wc-plaid-sofa-kvF30vEn.webp",mx="/kids-house-game/assets/wc-poinsettia-C-S-MDMu.webp",yx="/kids-house-game/assets/wc-polar-plush-BUVRTt7t.webp",bx="/kids-house-game/assets/wc-pom-rug-B-JF-heA.webp",wx="/kids-house-game/assets/wc-present-stack-Do2pEHLF.webp",kx="/kids-house-game/assets/wc-reindeer-CbKEp6CE.webp",vx="/kids-house-game/assets/wc-sled-table-Bd2cST9J.webp",_x="/kids-house-game/assets/wc-sleigh-planter-Bfcxvgbk.webp",$x="/kids-house-game/assets/wc-snow-globe-BcGMsnmh.webp",xx="/kids-house-game/assets/wc-snow-mobile-F06-kuT7.webp",Mx="/kids-house-game/assets/wc-snow-nightstand-D6RhLncP.webp",Lx="/kids-house-game/assets/wc-snow-window-dOxdYTSk.webp",Ex="/kids-house-game/assets/wc-snowman-gxLBKnIO.webp",Sx="/kids-house-game/assets/wc-snowshoes-CZcMT0Qx.webp",Tx="/kids-house-game/assets/wc-sock-hamper-mesU3CG3.webp",Px="/kids-house-game/assets/wc-star-topper-c4tXfpV6.webp",Ax="/kids-house-game/assets/wc-stocking-row-Dz0-4wTi.webp",Rx="/kids-house-game/assets/wc-stone-hearth-1blXXfiH.webp",Cx="/kids-house-game/assets/wc-twinkle-lamp-CYcQjW3A.webp",Ix="/kids-house-game/assets/wc-twinkle-string-Olg29poj.webp",Bx="/kids-house-game/assets/wc-window-seat-B7CwlRjl.webp",Ox="/kids-house-game/assets/wc-woodstove-Cf0xJFnD.webp",Dx="/kids-house-game/assets/cc-butter-polka-CmiHLPHI.svg",Hx="/kids-house-game/assets/cc-cream-hex-Bkf3o84Z.svg",Wx="/kids-house-game/assets/cc-lavender-lattice-DhxILx5n.svg",Vx="/kids-house-game/assets/cc-lilac-gingham-C-WPjvD8.svg",Ux="/kids-house-game/assets/cc-mint-checks-BKmyOLlr.svg",zx="/kids-house-game/assets/cc-mint-florals-Dz8qRBHw.svg",Qx="/kids-house-game/assets/cc-peach-scallops-GPn_mXbS.svg",Nx="/kids-house-game/assets/cc-pink-plaid-VgppBwax.svg",qx="/kids-house-game/assets/cc-rag-planks-C5Hombhc.svg",Fx="/kids-house-game/assets/cc-rose-herringbone-CQRix6_f.svg",jx="/kids-house-game/assets/lilac-stripes-yb9DhjTf.svg",Zx="/kids-house-game/assets/lilac-terrazzo-8CaN2qhK.svg",Gx="/kids-house-game/assets/mint-bubbles-BIQM5a2P.svg",Yx="/kids-house-game/assets/pink-check-floor-Cy9k3Fal.svg",Kx="/kids-house-game/assets/pink-hearts-BpVCT-98.svg",Xx="/kids-house-game/assets/cloud-sky-CbZL0zcC.svg",Jx="/kids-house-game/assets/pastel-planks-BAcEss7w.svg",e5="/kids-house-game/assets/soft-carpet-BSwTSDW1.svg",t5="/kids-house-game/assets/star-sprinkle-5bH7qjW0.svg",n5="/kids-house-game/assets/tiny-hearts-C-RHlg1h.svg",s5="/kids-house-game/assets/butter-check-floor-C8HdmZ0P.svg",o5="/kids-house-game/assets/mint-checks-rWbOdhfH.svg",i5="/kids-house-game/assets/sky-clouds-DUJlygwI.svg",a5="/kids-house-game/assets/sky-tiles-xxuodD5m.svg",r5="/kids-house-game/assets/sunny-stars-C6fsFX70.svg",l5="/kids-house-game/assets/leafy-cream-WIcyLI1T.svg",c5="/kids-house-game/assets/orange-gingham-CVNizWBt.svg",d5="/kids-house-game/assets/terracotta-tiles-j3yOSRI7.svg",f5="/kids-house-game/assets/wood-panel-Dob8WRpW.svg",h5="/kids-house-game/assets/wood-planks-4TUYjAkF.svg",u5="/kids-house-game/assets/wc-cabin-planks-Icu9n6YO.webp",p5="/kids-house-game/assets/wc-candy-stripe-cOBsT1Xj.webp",g5="/kids-house-game/assets/wc-frosty-dots-DmQgGwJW.webp",m5="/kids-house-game/assets/wc-mint-pine-5FYK_dVo.webp",y5="/kids-house-game/assets/wc-peppermint-tiles-ChaNg2gF.webp",b5="/kids-house-game/assets/wc-red-plaid-CcQ3BMhN.webp",w5="/kids-house-game/assets/wc-snow-knit-DEFXSv74.webp",k5="/kids-house-game/assets/wc-snowflake-sky-DrRAdoDP.webp",Nu={small:80,medium:150,large:260},v5={"welcome-home":"Welcome Home","sunny-vibes":"Sunny Vibes",glossy:"Glossy",cottage:"Cozy Cottage",...tk,...ik},Wg=e=>v5[e]??e.replace(/[-_]+/g," ").replace(/\b\w/g,t=>t.toUpperCase()),_5=Object.assign({"../assets/items/manifest.json":B4,"../assets/patterns/manifest.json":O4}),qu=Object.assign({"../assets/items/bedroom/alarm-clock.svg":D4,"../assets/items/bedroom/bedtime-snack.svg":H4,"../assets/items/bedroom/book-stack.svg":W4,"../assets/items/bedroom/bunk-bed.svg":V4,"../assets/items/bedroom/bunny-slippers.svg":U4,"../assets/items/bedroom/canopy-bed.svg":z4,"../assets/items/bedroom/cat-bed.svg":Q4,"../assets/items/bedroom/cloud-rug.svg":N4,"../assets/items/bedroom/cloud-shelf.svg":q4,"../assets/items/bedroom/cork-board.svg":F4,"../assets/items/bedroom/daisy-pot.svg":j4,"../assets/items/bedroom/desk.svg":Z4,"../assets/items/bedroom/dino-plush.svg":G4,"../assets/items/bedroom/doll-house.svg":Y4,"../assets/items/bedroom/dresser.svg":K4,"../assets/items/bedroom/egg-chair.svg":X4,"../assets/items/bedroom/floor-fan.svg":J4,"../assets/items/bedroom/guinea-pig.svg":e6,"../assets/items/bedroom/hamster-cage.svg":t6,"../assets/items/bedroom/heart-rug.svg":n6,"../assets/items/bedroom/lava-lamp.svg":s6,"../assets/items/bedroom/moon-night-light.svg":o6,"../assets/items/bedroom/nightstand.svg":i6,"../assets/items/bedroom/paper-lantern.svg":a6,"../assets/items/bedroom/piggy-bank.svg":r6,"../assets/items/bedroom/plant-stand.svg":l6,"../assets/items/bedroom/play-tent.svg":c6,"../assets/items/bedroom/star-mobile.svg":d6,"../assets/items/bedroom/toy-chest.svg":f6,"../assets/items/bedroom/toy-robot.svg":h6,"../assets/items/bedroom/toy-train.svg":u6,"../assets/items/bedroom/unicorn-plush.svg":p6,"../assets/items/bedroom/wardrobe.svg":g6,"../assets/items/kitchen/bananas.svg":m6,"../assets/items/kitchen/bar-stool.svg":y6,"../assets/items/kitchen/bread-loaf.svg":b6,"../assets/items/kitchen/chick.svg":w6,"../assets/items/kitchen/china-hutch.svg":k6,"../assets/items/kitchen/cocoa-mug.svg":v6,"../assets/items/kitchen/cookie-jar.svg":_6,"../assets/items/kitchen/cooking-pot.svg":$6,"../assets/items/kitchen/cupcake.svg":x6,"../assets/items/kitchen/dish-rack.svg":M6,"../assets/items/kitchen/fruit-bowl.svg":L6,"../assets/items/kitchen/frying-pan.svg":E6,"../assets/items/kitchen/happy-fridge.svg":S6,"../assets/items/kitchen/herb-box.svg":T6,"../assets/items/kitchen/high-chair.svg":P6,"../assets/items/kitchen/ice-cream.svg":A6,"../assets/items/kitchen/kettle.svg":R6,"../assets/items/kitchen/kitchen-counter.svg":C6,"../assets/items/kitchen/kitchen-sink.svg":I6,"../assets/items/kitchen/lemon-tree.svg":B6,"../assets/items/kitchen/microwave.svg":O6,"../assets/items/kitchen/milk-bottle.svg":D6,"../assets/items/kitchen/pancakes.svg":H6,"../assets/items/kitchen/pantry-shelf.svg":W6,"../assets/items/kitchen/pendant-lamp.svg":V6,"../assets/items/kitchen/pet-bowl.svg":U6,"../assets/items/kitchen/rice-cooker.svg":z6,"../assets/items/kitchen/runner-rug.svg":Q6,"../assets/items/kitchen/spice-rack.svg":N6,"../assets/items/kitchen/stand-mixer.svg":q6,"../assets/items/kitchen/teapot.svg":F6,"../assets/items/kitchen/toaster.svg":j6,"../assets/items/kitchen/utensil-rail.svg":Z6,"../assets/items/kitchen/watermelon-slice.svg":G6,"../assets/items/living/aquarium.svg":Y6,"../assets/items/living/arc-floor-lamp.svg":K6,"../assets/items/living/bean-bag.svg":X6,"../assets/items/living/bird-cage.svg":J6,"../assets/items/living/blanket-basket.svg":e_,"../assets/items/living/building-blocks.svg":t_,"../assets/items/living/coffee-table.svg":n_,"../assets/items/living/comfy-armchair.svg":s_,"../assets/items/living/cubby-shelf.svg":o_,"../assets/items/living/daisy-rug.svg":i_,"../assets/items/living/fiddle-leaf-fig.svg":a_,"../assets/items/living/fireplace.svg":r_,"../assets/items/living/globe.svg":l_,"../assets/items/living/hanging-planter.svg":c_,"../assets/items/living/monstera-plant.svg":d_,"../assets/items/living/piano.svg":f_,"../assets/items/living/popcorn.svg":h_,"../assets/items/living/pouf.svg":u_,"../assets/items/living/rainbow-rug.svg":p_,"../assets/items/living/rainbow-wall-art.svg":g_,"../assets/items/living/retro-radio.svg":m_,"../assets/items/living/rocking-chair.svg":y_,"../assets/items/living/rocking-horse.svg":b_,"../assets/items/living/snake-plant.svg":w_,"../assets/items/living/string-lights.svg":k_,"../assets/items/living/succulent-trio.svg":v_,"../assets/items/living/tassel-rug.svg":__,"../assets/items/living/throw-pillow.svg":$_,"../assets/items/living/toy-car.svg":x_,"../assets/items/living/tulip-vase.svg":M_,"../assets/items/living/turtle.svg":L_,"../assets/items/living/tv-stand.svg":E_,"../assets/items/living/wall-shelf.svg":S_,"../assets/items/packs/cottage/cc-bakery-shelf.svg":T_,"../assets/items/packs/cottage/cc-breakfast-table.svg":P_,"../assets/items/packs/cottage/cc-bubble-chair.svg":A_,"../assets/items/packs/cottage/cc-canopy-daybed.svg":R_,"../assets/items/packs/cottage/cc-cloud-beanbag.svg":C_,"../assets/items/packs/cottage/cc-cloud-lamp.svg":I_,"../assets/items/packs/cottage/cc-cottage-aquarium.svg":B_,"../assets/items/packs/cottage/cc-cupcake-stand.svg":O_,"../assets/items/packs/cottage/cc-dryer-chair.svg":D_,"../assets/items/packs/cottage/cc-fairy-garland.svg":H_,"../assets/items/packs/cottage/cc-fairy-shelf.svg":W_,"../assets/items/packs/cottage/cc-flower-kettle.svg":V_,"../assets/items/packs/cottage/cc-flower-lamp.svg":U_,"../assets/items/packs/cottage/cc-heart-bed.svg":z_,"../assets/items/packs/cottage/cc-heart-clock.svg":Q_,"../assets/items/packs/cottage/cc-heart-pouf.svg":N_,"../assets/items/packs/cottage/cc-heart-rug.svg":q_,"../assets/items/packs/cottage/cc-jewel-box.svg":F_,"../assets/items/packs/cottage/cc-light-vanity.svg":j_,"../assets/items/packs/cottage/cc-macaron-jar.svg":Z_,"../assets/items/packs/cottage/cc-macrame-swing.svg":G_,"../assets/items/packs/cottage/cc-mani-chair.svg":Y_,"../assets/items/packs/cottage/cc-mint-fridge.svg":K_,"../assets/items/packs/cottage/cc-mushroom-stool.svg":X_,"../assets/items/packs/cottage/cc-pastel-range.svg":J_,"../assets/items/packs/cottage/cc-perfume-tray.svg":e8,"../assets/items/packs/cottage/cc-petal-table.svg":t8,"../assets/items/packs/cottage/cc-plant-wall.svg":n8,"../assets/items/packs/cottage/cc-reading-nook.svg":s8,"../assets/items/packs/cottage/cc-record-player.svg":o8,"../assets/items/packs/cottage/cc-ribbon-mirror.svg":i8,"../assets/items/packs/cottage/cc-scallop-curtains.svg":a8,"../assets/items/packs/cottage/cc-scallop-loveseat.svg":r8,"../assets/items/packs/cottage/cc-star-dresser.svg":l8,"../assets/items/packs/cottage/cc-teapot-set.svg":c8,"../assets/items/packs/cottage/cc-window-seat.svg":d8,"../assets/items/packs/glossy/arched-shelf.svg":f8,"../assets/items/packs/glossy/blob-rug.svg":h8,"../assets/items/packs/glossy/bubbly-plant.svg":u8,"../assets/items/packs/glossy/bud-vase.svg":p8,"../assets/items/packs/glossy/comb-brush.svg":g8,"../assets/items/packs/glossy/cream-jars.svg":m8,"../assets/items/packs/glossy/drop-lamp.svg":y8,"../assets/items/packs/glossy/droplet-buddy.svg":b8,"../assets/items/packs/glossy/fancy-sofa.svg":w8,"../assets/items/packs/glossy/flower-cart.svg":k8,"../assets/items/packs/glossy/foot-spa.svg":v8,"../assets/items/packs/glossy/globe-pendants.svg":_8,"../assets/items/packs/glossy/glow-mirror.svg":$8,"../assets/items/packs/glossy/gold-floor-mirror.svg":x8,"../assets/items/packs/glossy/hair-dryer.svg":M8,"../assets/items/packs/glossy/heart-plant.svg":L8,"../assets/items/packs/glossy/heart-pouf.svg":E8,"../assets/items/packs/glossy/lilac-curtain.svg":S8,"../assets/items/packs/glossy/lotion-trio.svg":T8,"../assets/items/packs/glossy/mani-lamp.svg":P8,"../assets/items/packs/glossy/nail-table.svg":A8,"../assets/items/packs/glossy/pebble-rug.svg":R8,"../assets/items/packs/glossy/perfume-bottle.svg":C8,"../assets/items/packs/glossy/pink-fountain.svg":I8,"../assets/items/packs/glossy/pink-vanity.svg":B8,"../assets/items/packs/glossy/polish-bottle.svg":O8,"../assets/items/packs/glossy/polish-rack.svg":D8,"../assets/items/packs/glossy/reception-desk.svg":H8,"../assets/items/packs/glossy/salon-chair.svg":W8,"../assets/items/packs/glossy/scent-candle.svg":V8,"../assets/items/packs/glossy/spray-bottle.svg":U8,"../assets/items/packs/glossy/star-wall-sign.svg":z8,"../assets/items/packs/glossy/swivel-stool.svg":Q8,"../assets/items/packs/glossy/tiered-tray.svg":N8,"../assets/items/packs/glossy/towel-cart.svg":q8,"../assets/items/packs/glossy/towel-stack.svg":F8,"../assets/items/packs/glossy/vine-planter.svg":j8,"../assets/items/packs/glossy/waiting-bench.svg":Z8,"../assets/items/packs/glossy/wash-chair.svg":G8,"../assets/items/packs/halloween/hw-candy-bowl.webp":Y8,"../assets/items/packs/halloween/hw-cat-statue.webp":K8,"../assets/items/packs/halloween/hw-cauldron.webp":X8,"../assets/items/packs/halloween/hw-ghost-sheet.webp":J8,"../assets/items/packs/halloween/hw-hay-bale.webp":e$,"../assets/items/packs/halloween/hw-heart-pumpkin.webp":t$,"../assets/items/packs/halloween/hw-leaf-garland.webp":n$,"../assets/items/packs/halloween/hw-moon-cling.webp":s$,"../assets/items/packs/halloween/hw-moon-lantern.webp":o$,"../assets/items/packs/halloween/hw-star-pumpkin.webp":i$,"../assets/items/packs/halloween/hw-witch-hat.webp":a$,"../assets/items/packs/sunny-vibes/arched-mirror.svg":r$,"../assets/items/packs/sunny-vibes/big-monitor.svg":l$,"../assets/items/packs/sunny-vibes/boba-cup.svg":c$,"../assets/items/packs/sunny-vibes/bubble-bath.svg":d$,"../assets/items/packs/sunny-vibes/cactus-buddy.svg":f$,"../assets/items/packs/sunny-vibes/caterpillar-plush.svg":h$,"../assets/items/packs/sunny-vibes/checker-bed.svg":u$,"../assets/items/packs/sunny-vibes/checker-rug.svg":p$,"../assets/items/packs/sunny-vibes/clothes-rail.svg":g$,"../assets/items/packs/sunny-vibes/cloud-sofa.svg":m$,"../assets/items/packs/sunny-vibes/cube-shelf.svg":y$,"../assets/items/packs/sunny-vibes/curvy-desk.svg":b$,"../assets/items/packs/sunny-vibes/cute-speaker.svg":w$,"../assets/items/packs/sunny-vibes/desk-lamp.svg":k$,"../assets/items/packs/sunny-vibes/desk-mic.svg":v$,"../assets/items/packs/sunny-vibes/flower-lamp.svg":_$,"../assets/items/packs/sunny-vibes/frog-plush.svg":$$,"../assets/items/packs/sunny-vibes/game-controller.svg":x$,"../assets/items/packs/sunny-vibes/gaming-chair.svg":M$,"../assets/items/packs/sunny-vibes/hamster-pet.svg":L$,"../assets/items/packs/sunny-vibes/headphones.svg":E$,"../assets/items/packs/sunny-vibes/heart-light.svg":S$,"../assets/items/packs/sunny-vibes/keyboard.svg":T$,"../assets/items/packs/sunny-vibes/mini-fridge.svg":P$,"../assets/items/packs/sunny-vibes/pastel-wardrobe.svg":A$,"../assets/items/packs/sunny-vibes/phone-stand.svg":R$,"../assets/items/packs/sunny-vibes/pothos-plant.svg":C$,"../assets/items/packs/sunny-vibes/puffy-stool.svg":I$,"../assets/items/packs/sunny-vibes/ring-light.svg":B$,"../assets/items/packs/sunny-vibes/side-table-round.svg":O$,"../assets/items/packs/sunny-vibes/star-lamp.svg":D$,"../assets/items/packs/sunny-vibes/sticker-board.svg":H$,"../assets/items/packs/sunny-vibes/sunny-art.svg":W$,"../assets/items/packs/sunny-vibes/sv-bean-bag.svg":V$,"../assets/items/packs/sunny-vibes/sv-cloud-rug.svg":U$,"../assets/items/packs/sunny-vibes/sv-wall-shelf.svg":z$,"../assets/items/packs/sunny-vibes/vlog-camera.svg":Q$,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.svg":N$,"../assets/items/packs/welcome-home/acorn-friend.svg":q$,"../assets/items/packs/welcome-home/apple-tree.svg":F$,"../assets/items/packs/welcome-home/big-wardrobe.svg":j$,"../assets/items/packs/welcome-home/box-stack.svg":Z$,"../assets/items/packs/welcome-home/brick-fireplace.svg":G$,"../assets/items/packs/welcome-home/bulletin-board.svg":Y$,"../assets/items/packs/welcome-home/cozy-mug.svg":K$,"../assets/items/packs/welcome-home/cream-sofa.svg":X$,"../assets/items/packs/welcome-home/fire-pit.svg":J$,"../assets/items/packs/welcome-home/glass-cabinet.svg":e3,"../assets/items/packs/welcome-home/hanging-lantern.svg":t3,"../assets/items/packs/welcome-home/knit-cushion.svg":n3,"../assets/items/packs/welcome-home/ladder-shelf.svg":s3,"../assets/items/packs/welcome-home/landscape-art.svg":o3,"../assets/items/packs/welcome-home/lattice-bench.svg":i3,"../assets/items/packs/welcome-home/leaf-wreath.svg":a3,"../assets/items/packs/welcome-home/mini-greenhouse.svg":r3,"../assets/items/packs/welcome-home/moving-box.svg":l3,"../assets/items/packs/welcome-home/picnic-basket.svg":c3,"../assets/items/packs/welcome-home/round-rug.svg":d3,"../assets/items/packs/welcome-home/sale-sign.svg":f3,"../assets/items/packs/welcome-home/sprout-pot.svg":h3,"../assets/items/packs/welcome-home/stripe-runner.svg":u3,"../assets/items/packs/welcome-home/trailing-plant.svg":p3,"../assets/items/packs/welcome-home/wall-clock.svg":g3,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.svg":m3,"../assets/items/packs/welcome-home/wh-book-stack.svg":y3,"../assets/items/packs/welcome-home/wh-dresser.svg":b3,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.svg":w3,"../assets/items/packs/welcome-home/wh-kitchen-counter.svg":k3,"../assets/items/packs/welcome-home/wh-nightstand.svg":v3,"../assets/items/packs/welcome-home/wh-pendant-lamp.svg":_3,"../assets/items/packs/welcome-home/wh-snake-plant.svg":$3,"../assets/items/packs/welcome-home/wh-string-lights.svg":x3,"../assets/items/packs/welcome-home/wh-teapot.svg":M3,"../assets/items/packs/welcome-home/wood-armchair.svg":L3,"../assets/items/packs/welcome-home/wood-bookshelf.svg":E3,"../assets/items/packs/welcome-home/wood-coffee-table.svg":S3,"../assets/items/packs/welcome-home/wood-desk.svg":T3,"../assets/items/packs/welcome-home/wood-stool.svg":P3,"../assets/items/packs/welcome-home/wooden-bed.svg":A3,"../assets/items/packs/winter/wc-bauble-garland.webp":R3,"../assets/items/packs/winter/wc-berry-wreath.webp":C3,"../assets/items/packs/winter/wc-birch-basket.webp":I3,"../assets/items/packs/winter/wc-cabin-picture.webp":B3,"../assets/items/packs/winter/wc-candle-trio.webp":O3,"../assets/items/packs/winter/wc-cane-lamp.webp":D3,"../assets/items/packs/winter/wc-cinnamon-tray.webp":H3,"../assets/items/packs/winter/wc-cocoa-cart.webp":W3,"../assets/items/packs/winter/wc-cocoa-mug.webp":V3,"../assets/items/packs/winter/wc-cocoa-pot.webp":U3,"../assets/items/packs/winter/wc-cookie-oven.webp":z3,"../assets/items/packs/winter/wc-cookie-plate.webp":Q3,"../assets/items/packs/winter/wc-frost-bookcase.webp":N3,"../assets/items/packs/winter/wc-frosted-pine.webp":q3,"../assets/items/packs/winter/wc-fur-bench.webp":F3,"../assets/items/packs/winter/wc-gingerbread-village.webp":j3,"../assets/items/packs/winter/wc-gingerbread.webp":Z3,"../assets/items/packs/winter/wc-globe-lamp.webp":G3,"../assets/items/packs/winter/wc-holiday-tree.webp":Y3,"../assets/items/packs/winter/wc-holly.webp":K3,"../assets/items/packs/winter/wc-ice-skates.webp":X3,"../assets/items/packs/winter/wc-ice-wardrobe.webp":J3,"../assets/items/packs/winter/wc-knit-armchair.webp":ex,"../assets/items/packs/winter/wc-lantern.webp":tx,"../assets/items/packs/winter/wc-log-bench.webp":nx,"../assets/items/packs/winter/wc-marshmallow-jar.webp":sx,"../assets/items/packs/winter/wc-mitten-line.webp":ox,"../assets/items/packs/winter/wc-mitten-ottoman.webp":ix,"../assets/items/packs/winter/wc-mug-shelf.webp":ax,"../assets/items/packs/winter/wc-nutcracker.webp":rx,"../assets/items/packs/winter/wc-penguin-chair.webp":lx,"../assets/items/packs/winter/wc-penguin-plush.webp":cx,"../assets/items/packs/winter/wc-peppermint-counter.webp":dx,"../assets/items/packs/winter/wc-peppermint-rug.webp":fx,"../assets/items/packs/winter/wc-pinecone-garland.webp":hx,"../assets/items/packs/winter/wc-pinecone-table.webp":ux,"../assets/items/packs/winter/wc-plaid-bed.webp":px,"../assets/items/packs/winter/wc-plaid-sofa.webp":gx,"../assets/items/packs/winter/wc-poinsettia.webp":mx,"../assets/items/packs/winter/wc-polar-plush.webp":yx,"../assets/items/packs/winter/wc-pom-rug.webp":bx,"../assets/items/packs/winter/wc-present-stack.webp":wx,"../assets/items/packs/winter/wc-reindeer.webp":kx,"../assets/items/packs/winter/wc-sled-table.webp":vx,"../assets/items/packs/winter/wc-sleigh-planter.webp":_x,"../assets/items/packs/winter/wc-snow-globe.webp":$x,"../assets/items/packs/winter/wc-snow-mobile.webp":xx,"../assets/items/packs/winter/wc-snow-nightstand.webp":Mx,"../assets/items/packs/winter/wc-snow-window.webp":Lx,"../assets/items/packs/winter/wc-snowman.webp":Ex,"../assets/items/packs/winter/wc-snowshoes.webp":Sx,"../assets/items/packs/winter/wc-sock-hamper.webp":Tx,"../assets/items/packs/winter/wc-star-topper.webp":Px,"../assets/items/packs/winter/wc-stocking-row.webp":Ax,"../assets/items/packs/winter/wc-stone-hearth.webp":Rx,"../assets/items/packs/winter/wc-twinkle-lamp.webp":Cx,"../assets/items/packs/winter/wc-twinkle-string.webp":Ix,"../assets/items/packs/winter/wc-window-seat.webp":Bx,"../assets/items/packs/winter/wc-woodstove.webp":Ox}),Fu=Object.assign({"../assets/patterns/cottage/cc-butter-polka.svg":Dx,"../assets/patterns/cottage/cc-cream-hex.svg":Hx,"../assets/patterns/cottage/cc-lavender-lattice.svg":Wx,"../assets/patterns/cottage/cc-lilac-gingham.svg":Vx,"../assets/patterns/cottage/cc-mint-checks.svg":Ux,"../assets/patterns/cottage/cc-mint-florals.svg":zx,"../assets/patterns/cottage/cc-peach-scallops.svg":Qx,"../assets/patterns/cottage/cc-pink-plaid.svg":Nx,"../assets/patterns/cottage/cc-rag-planks.svg":qx,"../assets/patterns/cottage/cc-rose-herringbone.svg":Fx,"../assets/patterns/glossy/lilac-stripes.svg":jx,"../assets/patterns/glossy/lilac-terrazzo.svg":Zx,"../assets/patterns/glossy/mint-bubbles.svg":Gx,"../assets/patterns/glossy/pink-check-floor.svg":Yx,"../assets/patterns/glossy/pink-hearts.svg":Kx,"../assets/patterns/nursery/cloud-sky.svg":Xx,"../assets/patterns/nursery/pastel-planks.svg":Jx,"../assets/patterns/nursery/soft-carpet.svg":e5,"../assets/patterns/nursery/star-sprinkle.svg":t5,"../assets/patterns/nursery/tiny-hearts.svg":n5,"../assets/patterns/sunny-vibes/butter-check-floor.svg":s5,"../assets/patterns/sunny-vibes/mint-checks.svg":o5,"../assets/patterns/sunny-vibes/sky-clouds.svg":i5,"../assets/patterns/sunny-vibes/sky-tiles.svg":a5,"../assets/patterns/sunny-vibes/sunny-stars.svg":r5,"../assets/patterns/welcome-home/leafy-cream.svg":l5,"../assets/patterns/welcome-home/orange-gingham.svg":c5,"../assets/patterns/welcome-home/terracotta-tiles.svg":d5,"../assets/patterns/welcome-home/wood-panel.svg":f5,"../assets/patterns/welcome-home/wood-planks.svg":h5,"../assets/patterns/winter/wc-cabin-planks.webp":u5,"../assets/patterns/winter/wc-candy-stripe.webp":p5,"../assets/patterns/winter/wc-frosty-dots.webp":g5,"../assets/patterns/winter/wc-mint-pine.webp":m5,"../assets/patterns/winter/wc-peppermint-tiles.webp":y5,"../assets/patterns/winter/wc-red-plaid.webp":b5,"../assets/patterns/winter/wc-snow-knit.webp":w5,"../assets/patterns/winter/wc-snowflake-sky.webp":k5});function $5(e,t){if(!e||!e.trim())return[];try{const n=JSON.parse(e);return(Array.isArray(n)?n:[...Array.isArray(n?.items)?n.items:[],...Array.isArray(n?.patterns)?n.patterns:[]]).filter(o=>o&&typeof o.slug=="string"&&o.slug.trim())}catch(n){return console.warn(`[packs] ${t} is not valid JSON; ignoring`,n),[]}}const Vg=Object.entries(_5).flatMap(([e,t])=>$5(t,e)),x5=["svg","png","webp","SVG","PNG","WEBP"];function Ug(e,t,n,s){for(const i of x5){const a=e[`../assets/${t}/${n}/${s}.${i}`];if(a)return a}const o=Object.keys(e).find(i=>i.split("/").pop().replace(/\.\w+$/,"")===s);return o?e[o]:void 0}const ju={furniture:"furniture",appliance:"furniture",appliances:"furniture",seating:"furniture",storage:"furniture",bed:"furniture",table:"furniture",decor:"decor",rug:"decor",rugs:"decor",lighting:"decor",light:"decor",lamp:"decor",toy:"decor",toys:"decor","wall-art":"decor",art:"decor",beauty:"decor",plant:"plants",plants:"plants",flower:"plants",flowers:"plants",food:"food",drink:"food",drinks:"food",snack:"food",pet:"pets",pets:"pets",animal:"pets",animals:"pets"};function M5(e){const t=typeof e=="string"?e.trim().toLowerCase():"";return ju[t]??ju[t.replace(/s$/,"")]??"decor"}const Fo=(e,t)=>typeof e=="string"&&e.trim()?e.trim().toLowerCase():t,zg=e=>["wallpaper","floor"].includes(Fo(e.type,"")),Zu=new Set,L5=Vg.filter(e=>!zg(e)).flatMap(e=>{const t=Fo(e.room,"any"),n=e.slug.trim();if(Zu.has(n))return[];Zu.add(n);const o=[e.svg,e.png].filter(p=>typeof p=="string").map(p=>qu["../assets/items/"+p.replace(/^\.?\//,"")]).find(Boolean)??Ug(qu,"items",t,n);if(!o)return console.warn(`[packs] no image for items/${t}/${n}`),[];const i=Fo(e.pack,""),a=Fo(e.size,"medium"),r=M5(e.category),l=typeof e.gameW=="number"&&e.gameW>20&&e.gameW<800?e.gameW:Nu[a]??Nu.medium,c=typeof e.widthUnits=="number"&&typeof e.heightUnits=="number"&&e.widthUnits>0&&e.heightUnits>0?e.heightUnits/e.widthUnits:1,d=Math.round(l*Math.min(4,Math.max(.2,c))),f=typeof e.holdable=="boolean"?e.holdable:a!=="large"&&r!=="furniture",u=e.tag==="lighting"||/lamp|light|lantern|candle/i.test(n);return[{kind:`pack:${n}`,name:e.name||n,cat:r,rooms:[t],w:l,h:d,wall:e.wall===!0||void 0,svg:"",img:o,pack:i||void 0,holdable:f,light:u||void 0}]}),Ad=Vg.filter(zg).flatMap(e=>{const t=Fo(e.pack,"extra"),n=e.slug.trim(),o=[e.svg,e.png].filter(i=>typeof i=="string").map(i=>Fu["../assets/patterns/"+i.replace(/^\.?\//,"")]).find(Boolean)??Ug(Fu,"patterns",t,n);return o?[{id:`${t}/${n}`,name:e.name||n,pack:t,kind:Fo(e.type,"wallpaper"),url:o}]:(console.warn(`[packs] no image for patterns/${t}/${n}`),[])}),Gu=Object.fromEntries(Ad.map(e=>[e.id,e])),Dn="#5a3d5c",H=`stroke="${Dn}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Qg=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="2.4" fill="${Dn}"/><circle cx="${t}" cy="${n}" r="2.4" fill="${Dn}"/><circle cx="${e+.8}" cy="${n-.8}" r=".8" fill="#fff"/><circle cx="${t+.8}" cy="${n-.8}" r=".8" fill="#fff"/>`,Ng=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/><ellipse cx="${t}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/>`,it='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>';function Ac(e,t,n){return`${it}<ellipse cx="50" cy="78" rx="28" ry="16" fill="${t}" ${H}/><path d="M24 62 Q50 48 76 62 V78 Q50 92 24 78 Z" fill="${t}" ${H}/>
    <circle cx="50" cy="40" r="18" fill="${e}" ${H}/>${Qg(43,57,40)}${Ng(38,62,48)}<path d="M46 50 q4 3 8 0" fill="none" ${H}/>
    <path d="M38 26 Q50 16 62 26" fill="${n}" ${H}/><circle cx="50" cy="24" r="3" fill="${n}" ${H}/>`}const qg=[{kind:"crib",name:"Crib",cat:"furniture",w:260,svg:`${it}<rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${H}/><path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${H}/><rect x="6" y="22" width="88" height="12" rx="6" fill="#9ad7f5" ${H}/><rect x="14" y="48" width="72" height="16" rx="6" fill="#ffe0ec"/><ellipse cx="32" cy="56" rx="8" ry="5" fill="#fff" ${H}/><ellipse cx="50" cy="56" rx="8" ry="5" fill="#c9e7ff" ${H}/>`},{kind:"bassinet",name:"Bassinet",cat:"furniture",w:170,svg:`${it}<path d="M18 78 Q8 78 10 64 L22 36 H78 L90 64 Q92 78 82 78 Z" fill="#fff" ${H}/><ellipse cx="50" cy="36" rx="32" ry="10" fill="#fff" ${H}/><path d="M22 40 Q50 52 78 40" fill="#ffe0ec" ${H}/><ellipse cx="50" cy="44" rx="16" ry="7" fill="#fff"/><path d="M30 78 L22 94 M70 78 L78 94" ${H}/><ellipse cx="50" cy="90" rx="28" ry="4" fill="none" ${H}/><path d="M14 22 Q50 4 86 22" fill="none" stroke="#9ad7f5" stroke-width="6" stroke-linecap="round"/>`},{kind:"rocker",name:"Rocker",cat:"furniture",w:190,svg:`${it}<path d="M16 88 Q50 98 84 88" fill="none" ${H}/><path d="M28 84 Q50 74 72 84" fill="#c9a0dc" ${H}/><rect x="30" y="28" width="40" height="36" rx="12" fill="#e4ccf2" ${H}/><path d="M22 48 Q18 70 30 80 H70 Q82 70 78 48 Z" fill="#f6e6ff" ${H}/><rect x="36" y="58" width="28" height="12" rx="6" fill="#ffc8dd" ${H}/><circle cx="50" cy="40" r="6" fill="#fff" opacity=".7"/>`},{kind:"changing-table",name:"Changing Table",cat:"furniture",w:230,svg:`${it}<rect x="8" y="36" width="84" height="16" rx="8" fill="#fff" ${H}/><rect x="14" y="40" width="72" height="8" rx="4" fill="#ffd6e8"/><rect x="16" y="52" width="28" height="32" rx="6" fill="#bde0fe" ${H}/><rect x="56" y="52" width="28" height="32" rx="6" fill="#c9f0d8" ${H}/><path d="M22 60 H38 M22 68 H38 M62 60 H78 M62 68 H78" ${H}/><rect x="18" y="84" width="8" height="10" rx="2" fill="${Dn}"/><rect x="74" y="84" width="8" height="10" rx="2" fill="${Dn}"/><rect x="34" y="22" width="18" height="12" rx="3" fill="#ffe0ec" ${H}/><rect x="54" y="24" width="16" height="10" rx="3" fill="#fff6d8" ${H}/>`},{kind:"toy-bin",name:"Toy Bin",cat:"furniture",w:150,svg:`${it}<path d="M14 40 H86 L78 90 H22 Z" fill="#ffd166" ${H}/><rect x="10" y="32" width="80" height="14" rx="7" fill="#ffe08a" ${H}/><circle cx="36" cy="58" r="8" fill="#ff8fab" ${H}/><rect x="50" y="50" width="16" height="16" rx="3" fill="#8ecae6" ${H}/><circle cx="62" cy="70" r="6" fill="#90e0a8" ${H}/>`},{kind:"baby-shelf",name:"Bookshelf",cat:"furniture",w:150,svg:`${it}<rect x="14" y="8" width="72" height="84" rx="8" fill="#f3d2b5" ${H}/><path d="M14 36 H86 M14 64 H86" ${H}/><rect x="22" y="14" width="8" height="18" rx="2" fill="#ff8fab" ${H}/><rect x="32" y="18" width="8" height="14" rx="2" fill="#8ecae6" ${H}/><rect x="44" y="14" width="8" height="18" rx="2" fill="#ffd166" ${H}/><rect x="58" y="16" width="8" height="16" rx="2" fill="#90e0a8" ${H}/><circle cx="34" cy="50" r="7" fill="#ffadad" ${H}/><rect x="50" y="44" width="18" height="14" rx="3" fill="#c9a0dc" ${H}/><ellipse cx="40" cy="78" rx="14" ry="8" fill="#fff" ${H}/>`},{kind:"doll-rose",name:"Rose Doll",cat:"decor",w:80,svg:Ac("#f6d3b0","#ffc2d4","#ff8fab")},{kind:"doll-honey",name:"Honey Doll",cat:"decor",w:80,svg:Ac("#e0ac69","#cdeffd","#ffd166")},{kind:"doll-cocoa",name:"Cocoa Doll",cat:"decor",w:80,svg:Ac("#8d5524","#d8f3dc","#c9a0dc")},{kind:"crib-mobile",name:"Crib Mobile",cat:"decor",w:150,wall:!0,svg:`<path d="M50 6 V22" ${H}/><ellipse cx="50" cy="28" rx="28" ry="8" fill="#fff" ${H}/><path d="M28 32 V48 M50 36 V58 M72 32 V48" ${H}/><circle cx="28" cy="56" r="8" fill="#ffd166" ${H}/><circle cx="50" cy="68" r="9" fill="#ff8fab" ${H}/><path d="M72 56 l6 4 -6 4 -6 -4 z" fill="#8ecae6" ${H}/><circle cx="28" cy="54" r="2" fill="#fff"/><circle cx="50" cy="66" r="2" fill="#fff"/>`},{kind:"night-light",name:"Night Light",cat:"decor",w:70,svg:`${it}<circle cx="50" cy="46" r="22" fill="#fff6c8" ${H}/><circle cx="50" cy="46" r="12" fill="#ffe08a"/><path d="M50 18 V10 M30 26 L24 20 M70 26 L76 20 M24 46 H14 M86 46 H76" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><rect x="40" y="70" width="20" height="16" rx="4" fill="#c9a0dc" ${H}/><circle cx="50" cy="78" r="3" fill="#ff8fab"/>`},{kind:"bunny-plush",name:"Bunny Plush",cat:"decor",w:90,svg:`${it}<ellipse cx="34" cy="28" rx="8" ry="18" fill="#fff" ${H}/><ellipse cx="66" cy="28" rx="8" ry="18" fill="#fff" ${H}/><ellipse cx="34" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="66" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="50" cy="74" rx="26" ry="18" fill="#fff" ${H}/><circle cx="50" cy="50" r="20" fill="#fff" ${H}/>${Qg(43,57,50)}<path d="M47 58 l3 3 3 -3" fill="none" ${H}/>${Ng(38,62,58)}`},{kind:"stacking-rings",name:"Stacking Rings",cat:"decor",w:70,svg:`${it}<ellipse cx="50" cy="86" rx="26" ry="7" fill="#ff8fab" ${H}/><ellipse cx="50" cy="74" rx="20" ry="6" fill="#ffd166" ${H}/><ellipse cx="50" cy="64" rx="15" ry="5" fill="#8ecae6" ${H}/><ellipse cx="50" cy="56" rx="10" ry="4" fill="#90e0a8" ${H}/><rect x="46" y="28" width="8" height="40" rx="4" fill="#c9a0dc" ${H}/><circle cx="50" cy="24" r="7" fill="#ffb3c6" ${H}/>`},{kind:"rattle",name:"Rattle",cat:"decor",w:60,svg:`${it}<circle cx="38" cy="40" r="20" fill="#ffd166" ${H}/><circle cx="32" cy="34" r="5" fill="#fff" opacity=".7"/><rect x="50" y="52" width="10" height="28" rx="5" fill="#ff8fab" ${H} transform="rotate(-20 55 66)"/><circle cx="68" cy="82" r="8" fill="#8ecae6" ${H}/>`},{kind:"baby-bottle",name:"Baby Bottle",cat:"food",w:55,svg:`${it}<rect x="36" y="8" width="28" height="12" rx="4" fill="#c9a0dc" ${H}/><rect x="42" y="18" width="16" height="8" fill="#fff" ${H}/><path d="M30 30 H70 L66 88 Q50 96 34 88 Z" fill="#e7f6ff" ${H}/><path d="M32 48 H68 L66 80 Q50 88 34 80 Z" fill="#fff" opacity=".85"/><rect x="34" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="46" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="58" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/>`},{kind:"blocks",name:"Baby Blocks",cat:"decor",w:90,svg:`${it}<rect x="14" y="58" width="28" height="28" rx="4" fill="#ff8fab" ${H}/><rect x="40" y="46" width="28" height="28" rx="4" fill="#ffd166" ${H}/><rect x="28" y="28" width="26" height="26" rx="4" fill="#8ecae6" ${H}/><path d="M20 72 H36 M48 60 H62 M34 42 H48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"rocking-horse",name:"Little Rocking Horse",cat:"decor",w:180,svg:`${it}<path d="M12 86 Q50 98 88 82" fill="none" ${H}/><ellipse cx="48" cy="62" rx="26" ry="14" fill="#e6b88a" ${H}/><path d="M62 58 L84 40 Q92 36 90 48 L74 64 Z" fill="#f0d0b0" ${H}/><circle cx="82" cy="42" r="3" fill="${Dn}"/><path d="M70 36 L76 24 L84 34" fill="#ff8fab" ${H}/><rect x="36" y="48" width="16" height="8" rx="3" fill="#c9a0dc" ${H}/><path d="M30 70 L22 84 M58 72 L66 86" ${H}/>`},{kind:"music-box",name:"Music Box",cat:"decor",w:80,svg:`${it}<rect x="22" y="40" width="56" height="46" rx="8" fill="#f6d6ff" ${H}/><path d="M22 40 L50 22 L78 40" fill="#e4ccf2" ${H}/><circle cx="50" cy="64" r="10" fill="#fff" ${H}/><path d="M50 58 V70 M44 64 H56" ${H}/><circle cx="50" cy="30" r="4" fill="#ffd166" ${H}/>`},{kind:"cloud-rug",name:"Nursery Cloud Rug",cat:"decor",w:340,svg:`<ellipse cx="50" cy="78" rx="46" ry="16" fill="#e7f6ff" ${H}/><circle cx="28" cy="70" r="16" fill="#f4fbff" ${H}/><circle cx="50" cy="62" r="18" fill="#fff" ${H}/><circle cx="72" cy="70" r="16" fill="#f4fbff" ${H}/><ellipse cx="50" cy="78" rx="30" ry="8" fill="#d6f0ff"/>`},{kind:"play-mat",name:"Play Mat",cat:"decor",w:300,svg:`<rect x="6" y="62" width="88" height="30" rx="14" fill="#ffe0ec" ${H}/><path d="M50 70 C42 62 30 64 34 74 C38 82 50 88 50 88 C50 88 62 82 66 74 C70 64 58 62 50 70 Z" fill="#ff8fab" ${H}/><circle cx="22" cy="76" r="5" fill="#ffd166" ${H}/><circle cx="78" cy="76" r="5" fill="#8ecae6" ${H}/>`},{kind:"moon-art",name:"Moon and Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M58 18 A28 28 0 1 0 58 78 A18 18 0 1 1 58 18 Z" fill="#fff3b0" ${H}/><path d="M22 30 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1 z" fill="#ffd166" ${H}/><path d="M78 58 l2 5 5 1 -4 4 1 5 -4 -3 -4 3 1 -5 -4 -4 5 -1 z" fill="#c9e7ff" ${H}/>`},{kind:"nursery-dresser",name:"Nursery Dresser",cat:"furniture",w:170,svg:`${it}<rect x="14" y="22" width="72" height="68" rx="8" fill="#f6e2c4" ${H}/><path d="M14 44 H86 M14 66 H86" ${H}/><circle cx="50" cy="34" r="3" fill="${Dn}"/><circle cx="50" cy="55" r="3" fill="${Dn}"/><circle cx="50" cy="76" r="3" fill="${Dn}"/><rect x="30" y="10" width="18" height="12" rx="3" fill="#ffc2d4" ${H}/><rect x="52" y="12" width="16" height="10" rx="3" fill="#c9e7ff" ${H}/>`},{kind:"nursery-lamp",name:"Nursery Lamp",cat:"decor",w:80,svg:`${it}<path d="M28 42 L36 12 H64 L72 42 Z" fill="#fff6c8" ${H}/><rect x="46" y="42" width="8" height="40" rx="4" fill="#c9a0dc" ${H}/><ellipse cx="50" cy="88" rx="20" ry="6" fill="#b388d6" ${H}/><circle cx="46" cy="24" r="3" fill="#fff" opacity=".85"/><path d="M34 20 q6 -8 4 -2" fill="none" stroke="#ffd166" stroke-width="2"/>`},{kind:"nursery-curtains",name:"Curtains",cat:"decor",w:180,wall:!0,svg:`<rect x="16" y="10" width="68" height="50" rx="6" fill="#cfefff" ${H}/><path d="M50 10 V60 M16 34 H84" ${H}/><path d="M8 8 Q18 28 10 92" fill="#ffd6e8" ${H}/><path d="M92 8 Q82 28 90 92" fill="#ffd6e8" ${H}/><rect x="6" y="6" width="88" height="8" rx="3" fill="#f3d2b5" ${H}/>`}],lt="#5a3d5c",M=(e=3.5)=>`stroke="${lt}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function xe(e,t,n){const s=Math.round(t*.62);return`<ellipse cx="${e}" cy="${n}" rx="${t}" ry="3.4" fill="${lt}" opacity=".08"/><ellipse cx="${e}" cy="${(n+1.2).toFixed(1)}" rx="${s}" ry="1.55" fill="${lt}" opacity=".12"/>`}function ce(e,t=2.2){return`<path d="${e}" fill="none" stroke="#fff" stroke-width="${t}" stroke-linecap="round" opacity=".75"/>`}function ht(e,t=1.15){return`<path d="${e}" fill="none" stroke="${lt}" stroke-width="${t}" stroke-linecap="round" opacity=".2"/>`}function Kf(e,t,n=".7"){return`<radialGradient id="${e}" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="${t}" stop-opacity="${n}"/><stop offset="1" stop-color="${t}" stop-opacity="0"/></radialGradient>`}function Xf(e,t,n){return`<linearGradient id="${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t}"/><stop offset="1" stop-color="${n}"/></linearGradient>`}function E5(){return typeof location>"u"?!1:/(?:^|[?&])yard=1(?:&|$)/.test(location.search)}function Rd(){return typeof location>"u"?"":new URLSearchParams(location.search).get("shot")||""}const S5={v:1,hair:"pigtails",hairC:"#a0522d",skin:"#f6d2b5",eyes:"big",eyeC:"#5a321c",freckles:!0,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"skirt",bottomC:"#c9a0dc",dress:"sundress",dressC:"#ff8fab",shoes:"maryjanes",shoesC:"#ffd166",acc:["bow"],accC:"#ff7aa8"},T5=()=>da(S5),Cd={x:1084,y:578,flip:!0},bs={x:1184,y:255},Yu={x:1146,y:578},Id={x:940,y:540,flip:!0},Xr=1160,Fg={x:824,y:398,w:96,h:230},jg={x:996,y:372,w:82,h:196},P5=[{kind:"yard-swing",x:1266,y:580,scale:132/280},{kind:"lemonade-cart",x:1254,y:471},{kind:"sandbox",x:940,y:482},{kind:"picnic-blanket",x:939,y:420}];function Me(e){return{kind:e.kind,name:e.name,cat:e.cat,w:e.w,h:e.h,vb:e.vb,wall:e.wall,holdable:e.holdable??!1,rooms:["backyard"],svg:e.svg}}const A5=Me({kind:"yard-swing",name:"A-Frame Swing",cat:"furniture",w:280,h:215,vb:"0 0 130 100",svg:`${xe(65,54,96)}
    <path d="M34 18 L50 18 L20 94 H4 Z" fill="#f3d2aa" ${M()}/>
    <path d="M42 24 L50 18 L18 70 H28 Z" fill="#d4a373"/>
    <path d="M80 18 L96 18 L126 94 H110 Z" fill="#e7c49a" ${M()}/>
    <path d="M108 22 L96 18 L126 94 H118 Z" fill="#c99366"/>
    ${ht("M16 50 l8 28 M112 48 l8 30")}
    <rect x="22" y="6" width="86" height="14" rx="2" fill="#f6e0c4" ${M()}/>
    <rect x="86" y="9" width="18" height="8" rx="1" fill="#d4a373"/>
    <rect x="28" y="16" width="74" height="4" fill="#e7c49a"/>
    ${ce("M28 10 h30")}
    <g class="swingSeat">
      <rect x="48" y="74" width="34" height="7" rx="1" fill="#f3d2aa" ${M(2.2)}/>
      <rect x="72" y="76" width="8" height="4" fill="#d4a373"/>
      <path d="M54 20 V78 M76 20 V78" fill="none" ${M(2.2)}/>
      ${ce("M52 76 h14")}
    </g>`}),R5=Me({kind:"sandbox",name:"Sandbox",cat:"furniture",w:120,h:54,vb:"0 0 160 72",svg:`${xe(80,64,68)}
    <path d="M108 38 L146 26 L146 52 L108 64 Z" fill="#e7c49a" ${M()}/>
    <path d="M126 36 L142 28 L142 48 L126 56 Z" fill="#c99366"/>
    <path d="M12 40 H108 V64 H12 Z" fill="#f3d2aa" ${M()}/>
    <path d="M12 40 L36 18 L146 18 L108 40 Z" fill="#f6e0c4" ${M()}/>
    <path d="M112 20 L142 20 L108 38 L90 38 Z" fill="#d4a373"/>
    <path d="M34 36 L52 24 L122 24 L100 36 Z" fill="#ffe08a" ${M(2.2)}/>
    <path d="M98 26 L118 26 L100 34 L86 34 Z" fill="#f0c36a"/>
    ${ht("M48 30 q8 2 6 5 M68 28 q10 2 8 6 M58 34 h16")}
    <path d="M76 30 L100 36 L94 48 L70 42 Z" fill="#d7e6f2" ${M(2.2)}/>
    <path d="M88 34 L98 38 L94 44 L84 40 Z" fill="#b7c9d6"/>
    <path d="M52 8 L64 4 L90 34 L78 38 Z" fill="#f0d2b0" ${M()}/>
    <path d="M64 8 L72 6 L90 32 L82 34 Z" fill="#d4a373"/>
    <path d="M46 2 H66 V9 H46 Z" fill="#c99366" ${M(2)}/>
    ${ce("M18 44 h26")}
    ${ce("M44 22 h22")}`}),C5=Me({kind:"little-slide",name:"Little Slide",cat:"furniture",w:150,h:188,vb:"0 0 110 140",svg:`${xe(56,44,134)}
    <path d="M50 34 H72 C94 36 102 56 98 82 L92 122 H70 L76 84 C78 60 72 46 52 44 Z" fill="#ffb3c6" ${M()}/>
    <path d="M72 38 C94 42 104 62 100 86 L94 122 H86 L92 86 C94 64 86 48 72 46 Z" fill="#e45d88"/>
    <rect x="14" y="34" width="8" height="96" rx="2" fill="#f3d2aa" ${M()}/>
    <rect x="36" y="34" width="8" height="96" rx="2" fill="#e7c49a" ${M()}/>
    <rect x="40" y="40" width="3" height="84" fill="#c99366"/>
    <rect x="14" y="52" width="30" height="5" rx="1" fill="#f6e0c4" ${M(2.2)}/>
    <rect x="14" y="70" width="30" height="5" rx="1" fill="#f6e0c4" ${M(2.2)}/>
    <rect x="14" y="88" width="30" height="5" rx="1" fill="#f6e0c4" ${M(2.2)}/>
    <rect x="14" y="106" width="30" height="5" rx="1" fill="#f6e0c4" ${M(2.2)}/>
    <rect x="6" y="18" width="56" height="22" rx="3" fill="#f3d2aa" ${M()}/>
    <rect x="6" y="34" width="56" height="6" fill="#d4a373"/>
    <path d="M48 20 H62 V40 H48 Z" fill="#c99366"/>
    ${ce("M12 24 h22")}
    <rect x="12" y="6" width="5" height="16" rx="1" fill="#f0d2b0" ${M(2.2)}/>
    <rect x="40" y="6" width="5" height="16" rx="1" fill="#e7c49a" ${M(2.2)}/>
    <path d="M14 8 H43" fill="none" ${M(2.2)}/>
    <rect x="80" y="116" width="7" height="16" rx="1" fill="#f3d2aa" ${M(2)}/>
    ${ce("M58 42 C74 48 86 66 86 88")}
    ${ht("M80 64 q4 16 2 28")}`}),I5=Me({kind:"yard-bench",name:"Garden Bench",cat:"furniture",w:308,h:220,vb:"0 0 140 100",svg:`${xe(70,58,96)}
    <rect x="10" y="8" width="12" height="86" rx="2" fill="#f3d2aa" ${M()}/>
    <rect x="118" y="8" width="12" height="86" rx="2" fill="#e7c49a" ${M()}/>
    <rect x="124" y="12" width="5" height="76" fill="#c99366"/>
    <rect x="28" y="52" width="10" height="42" rx="2" fill="#f0d2b0" ${M()}/>
    <rect x="102" y="52" width="10" height="42" rx="2" fill="#d4a373" ${M()}/>
    <rect x="108" y="56" width="3" height="32" fill="#c99366"/>
    <rect x="18" y="10" width="104" height="8" rx="1" fill="#f6e0c4" ${M(2.2)}/>
    <rect x="18" y="20" width="104" height="8" rx="1" fill="#f3d2aa" ${M(2.2)}/>
    <rect x="18" y="30" width="104" height="8" rx="1" fill="#f3d2aa" ${M(2.2)}/>
    <rect x="18" y="40" width="104" height="8" rx="1" fill="#e7c49a" ${M(2.2)}/>
    <rect x="18" y="48" width="104" height="7" rx="1" fill="#f6e0c4" ${M(2.2)}/>
    <rect x="18" y="57" width="104" height="7" rx="1" fill="#f3d2aa" ${M(2.2)}/>
    <rect x="18" y="66" width="104" height="7" rx="1" fill="#e7c49a" ${M(2.2)}/>
    <rect x="108" y="12" width="10" height="5" fill="#d4a373"/>
    <rect x="108" y="22" width="10" height="5" fill="#c99366"/>
    <rect x="108" y="50" width="10" height="4" fill="#d4a373"/>
    <rect x="108" y="68" width="10" height="4" fill="#c99366"/>
    <path d="M10 46 H40 V56 H10 Z" fill="#f6e0c4" ${M()}/>
    <path d="M100 46 H130 V56 H100 Z" fill="#e7c49a" ${M()}/>
    <path d="M116 48 H128 V54 H116 Z" fill="#c99366"/>
    ${ce("M22 13 h28")}
    ${ce("M14 48 h16")}
    ${ht("M36 24 h48 M36 34 h44 M34 52 h52 M34 62 h46")}`}),B5=Me({kind:"lemonade-cart",name:"Lemonade Cart",cat:"furniture",w:108,h:121,vb:"0 0 100 112",svg:`${xe(50,40,106)}
    <circle cx="30" cy="96" r="11" fill="${lt}" ${M(2.2)}/><circle cx="30" cy="96" r="4.5" fill="#ffd166"/>
    <circle cx="72" cy="96" r="11" fill="${lt}" ${M(2.2)}/><circle cx="72" cy="96" r="4.5" fill="#ffd166"/>
    <rect x="18" y="92" width="66" height="5" rx="2" fill="#c99366" ${M(2)}/>
    <rect x="16" y="46" width="68" height="46" rx="3" fill="#fff6ea" ${M()}/>
    <rect x="66" y="50" width="14" height="38" fill="#f0d2a4"/>
    ${ht("M28 56 v28 M42 56 v28 M56 56 v28")}
    ${ce("M20 52 v16")}
    <rect x="12" y="38" width="76" height="12" rx="2" fill="#ffe08a" ${M()}/>
    <rect x="66" y="40" width="18" height="8" fill="#f0c45c"/>
    <path d="M14 40 L22 14 H80 L88 40 Z" fill="#ff8fab" ${M()}/>
    <path d="M34 16 L38 40 H50 L46 15 Z" fill="#fff4f7"/>
    <path d="M58 15 L62 40 H74 L70 15 Z" fill="#fff4f7"/>
    <path d="M72 16 H80 L88 40 H76 Z" fill="#e45d88"/>
    ${ce("M26 20 h18")}
    <path d="M28 52 H44 L42 72 H30 Z" fill="#fff" ${M(2)}/>
    <path d="M30 58 H42 L41 72 H31 Z" fill="#ffe566"/>
    <path d="M28 54 L22 58 L28 62 Z" fill="#fff" ${M(2)}/>
    <path d="M44 56 Q52 60 44 70" fill="none" ${M(2)}/>
    <path d="M56 60 H68 L66 72 H58 Z" fill="#fff" ${M(2)}/>
    <path d="M58 64 H66 L65 72 H59 Z" fill="#ffe566"/>
    <circle cx="78" cy="64" r="7" fill="#ffe566" ${M(2)}/>
    <path d="M78 58 v12 M72 64 h12" fill="none" stroke="#e0a83a" stroke-width="1.3"/>`}),O5=Me({kind:"sun-lounger",name:"Sun Lounger",cat:"furniture",w:168,h:86,vb:"0 0 170 90",svg:`${xe(86,68,84)}
    <path d="M16 66 H28 L32 82 H12 Z" fill="#f3d2aa" ${M()}/>
    <path d="M126 64 H140 L146 82 H120 Z" fill="#d4a373" ${M()}/>
    <path d="M136 68 H142 L146 80 H138 Z" fill="#c99366"/>
    <path d="M12 52 H156 V64 H12 Z" fill="#f3d2aa" ${M()}/>
    <path d="M122 54 H154 V62 H122 Z" fill="#d4a373"/>
    <path d="M28 34 H36 L42 52 H32 Z" fill="#e7c49a" ${M()}/>
    <path d="M50 44 H150 L154 58 H54 Z" fill="#ffd4e2" ${M()}/>
    <path d="M128 48 H150 L154 58 H132 Z" fill="#e888a8"/>
    <path d="M18 6 L60 48 L48 58 L8 16 Z" fill="#ffb3c6" ${M()}/>
    <path d="M38 34 L54 48 L48 56 L30 42 Z" fill="#e45d88"/>
    <ellipse cx="22" cy="14" rx="11" ry="7" fill="#fff" ${M(2.2)}/>
    <path d="M22 8 H30 A7 7 0 0 1 30 20 H22 Z" fill="#ffd0e0"/>
    ${ce("M22 12 L50 40")}
    ${ht("M26 22 L52 46")}`}),D5=Me({kind:"splash-pool",name:"Splash Pool",cat:"furniture",w:176,h:96,vb:"0 0 170 96",svg:`<defs>${Xf("ydpoolW","#f3fbff","#7ec8e3")}</defs>
    ${xe(85,72,90)}
    <ellipse cx="85" cy="58" rx="74" ry="28" fill="#8ecae6" ${M()}/>
    <path d="M22 52 Q40 34 78 40" fill="none" stroke="#ff8fab" stroke-width="16" stroke-linecap="round"/>
    <path d="M100 36 Q138 38 152 58" fill="none" stroke="#ffd166" stroke-width="14" stroke-linecap="round"/>
    <path d="M18 66 C22 82 50 90 85 90 C120 90 152 82 154 66 C148 78 120 84 85 84 C50 84 24 78 18 66 Z" fill="#5aa9c6"/>
    <ellipse cx="85" cy="54" rx="48" ry="16" fill="url(#ydpoolW)" ${M(2.2)}/>
    ${ce("M36 50 q20 -10 36 0")}
    <circle cx="128" cy="48" r="4" fill="#fff" ${M(1.6)}/>
    <circle cx="128" cy="48" r="1.6" fill="#8ecae6"/>
    <path d="M70 46 q3 -8 1 0 M96 42 q4 -9 1 1" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`}),H5=Me({kind:"picket-gate",name:"Picket Gate",cat:"furniture",w:110,h:150,vb:"0 0 100 136",svg:`${xe(50,38,130)}
    <rect x="6" y="16" width="12" height="110" rx="2" fill="#f7fff8" ${M()}/>
    <rect x="82" y="16" width="12" height="110" rx="2" fill="#e7f6ea" ${M()}/>
    <rect x="88" y="20" width="5" height="100" fill="#c5e0c8"/>
    <rect x="4" y="40" width="16" height="6" rx="1" fill="#c99366" ${M(2)}/>
    <rect x="4" y="96" width="16" height="6" rx="1" fill="#c99366" ${M(2)}/>
    <rect x="16" y="38" width="68" height="8" rx="2" fill="#fff" ${M(2.2)}/>
    <rect x="16" y="86" width="68" height="8" rx="2" fill="#fff" ${M(2.2)}/>
    <path d="M20 90 L28 98 L80 46 L72 38 Z" fill="#f7fff8" ${M(2.2)}/>
    <path d="M26 30 L32 14 L38 30 V112 H26 Z" fill="#fff" ${M(2.2)}/>
    <path d="M44 30 L50 14 L56 30 V112 H44 Z" fill="#f7fff8" ${M(2.2)}/>
    <path d="M62 30 L68 14 L74 30 V112 H62 Z" fill="#e7f6ea" ${M(2.2)}/>
    <path d="M68 22 L74 16 L74 108 H68 Z" fill="#c5e0c8"/>
    ${ce("M28 36 v20")}
    <rect x="74" y="60" width="16" height="5" rx="1" fill="#c99366" ${M(2)}/>
    <circle cx="86" cy="62" r="2.6" fill="#ffd166" ${M(1.8)}/>`});function W5(){let e="";for(let t=0;t<6;t++)for(let n=0;n<13;n++)(t+n)%2===0&&(e+=`<rect x="${n*15-6}" y="${t*10}" width="15" height="10" fill="#ff8fab"/>`);return e}const V5=Me({kind:"picnic-blanket",name:"Picnic Blanket",cat:"decor",w:110,h:36,vb:"0 0 180 59",svg:`<defs><clipPath id="ydging"><path d="M22 20 L156 12 L174 44 L36 52 Z"/></clipPath></defs>
    ${xe(96,74,54)}
    <path d="M22 20 L156 12 L174 44 L36 52 Z" fill="#fff0f5" ${M()}/>
    <g clip-path="url(#ydging)">${W5()}</g>
    <path d="M148 14 L170 42 L160 46 L138 18 Z" fill="#e45d88"/>
    <path d="M96 30 L128 26 L134 42 L100 46 Z" fill="#f3d2aa" ${M(2)}/>
    <path d="M120 28 L128 26 L134 42 L126 43 Z" fill="#c99366"/>
    <path d="M104 30 Q114 14 126 28" fill="none" ${M(2.2)}/>
    ${ht("M104 34 h22 M104 38 h24",1)}
    ${ce("M34 26 l28 -3")}`});function xi(e,t,n,s){return`<path d="M${e-1.5} ${t+16} H${e+1.5} V${t+40} H${e-1.5} Z" fill="#3d9a68"/>
    <path d="M${e} ${t+24} C${e-16} ${t+18} ${e-14} ${t+36} ${e-1} ${t+34}" fill="#74c69d" ${M(1.6)}/>
    <path d="M${e} ${t+22} C${e+16} ${t+16} ${e+12} ${t+36} ${e+1} ${t+32}" fill="#52b788"/>
    <path d="M${e} ${t+18} C${e-10} ${t+8} ${e-8} ${t} ${e} ${t+6} C${e+8} ${t} ${e+10} ${t+8} ${e} ${t+18} Z" fill="${n}" ${M(1.8)}/>
    <path d="M${e+1} ${t+6} C${e+7} ${t+4} ${e+8} ${t+13} ${e+1} ${t+15} Z" fill="${s}"/>`}const U5=Me({kind:"tulip-bed",name:"Tulip Bed",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`${xe(70,56,86)}
    <path d="M10 56 H130 L120 82 H20 Z" fill="#f0d2b0" ${M()}/>
    <path d="M96 58 H126 L118 78 H92 Z" fill="#d4a373"/>
    <path d="M16 56 Q70 42 124 56 Q70 64 16 56 Z" fill="#c4a484" ${M(2.2)}/>
    ${ce("M22 60 h24")}
    ${xi(32,16,"#ff8fab","#e45d88")}
    ${xi(54,8,"#ffd166","#e0a83a")}
    ${xi(76,4,"#ff7096","#e04578")}
    ${xi(98,12,"#fff","#ffd0e0")}
    ${xi(118,18,"#c9a0dc","#b388d6")}`}),z5=Me({kind:"birdbath",name:"Birdbath",cat:"decor",w:84,h:126,vb:"0 0 80 120",svg:`<defs>${Xf("ydbathW","#f3fbff","#8ecae6")}</defs>
    ${xe(40,28,114)}
    <ellipse cx="40" cy="106" rx="20" ry="7" fill="#e7eef2" ${M()}/>
    <path d="M30 46 H50 C56 70 58 86 52 104 H28 C22 86 24 70 30 46 Z" fill="#f4f7f8" ${M()}/>
    <path d="M42 52 H50 C54 72 54 88 50 100 H44 Z" fill="#c5d0d6"/>
    ${ce("M33 62 v22")}
    <ellipse cx="40" cy="40" rx="32" ry="13" fill="#f7fafb" ${M()}/>
    <path d="M40 28 C66 28 72 38 72 42 C72 52 58 54 40 54 C60 54 68 48 68 42 C68 36 58 32 40 34 Z" fill="#d5dee4"/>
    <ellipse cx="40" cy="38" rx="22" ry="7" fill="url(#ydbathW)" ${M(2.2)}/>
    ${ce("M22 36 q10 -4 18 0")}
    <path d="M48 30 L40 24 L42 34 Z" fill="#f0c45c" ${M(1.6)}/>
    <ellipse cx="56" cy="28" rx="11" ry="6" fill="#ffd166" ${M(1.8)}/>
    <circle cx="66" cy="24" r="4.5" fill="#ffe08a" ${M(1.6)}/>
    <path d="M70 24 L77 26 L70 28 Z" fill="#e07a3f"/>
    <circle cx="67" cy="23" r="1" fill="${lt}"/>
    <path d="M54 32 V40 M60 32 V40" fill="none" stroke="#c99366" stroke-width="1.4" stroke-linecap="round"/>`}),Q5=Me({kind:"lily-pond",name:"Lily Pond",cat:"decor",w:170,h:90,vb:"0 0 170 90",svg:`<defs>${Xf("ydpondW","#eaf6ff","#5aa9e6")}</defs>
    ${xe(85,70,84)}
    <ellipse cx="85" cy="54" rx="74" ry="28" fill="#c4a484" ${M()}/>
    <path d="M85 30 C142 32 158 48 158 56 C158 72 126 82 85 82 C124 80 150 68 150 56 C150 44 126 36 85 36 Z" fill="#a88462"/>
    <ellipse cx="85" cy="52" rx="62" ry="20" fill="url(#ydpondW)" ${M(2.2)}/>
    ${ce("M40 46 q24 -8 42 2")}
    <path fill="#95d5b2" ${M(2)} fill-rule="evenodd" d="M58 54 m-16 0 a16 7 0 1 0 32 0 a16 7 0 1 0 -32 0 M58 50 L72 54 L58 58 Z"/>
    <path d="M66 50 L74 54 L66 56 Z" fill="#3d9a68"/>
    <path fill="#74c69d" ${M(2)} fill-rule="evenodd" d="M112 48 m-18 0 a18 8 0 1 0 36 0 a18 8 0 1 0 -36 0 M112 42 L128 48 L112 54 Z"/>
    <path d="M40 58 q-4 -16 2 -22 q6 8 2 16" fill="#52b788" ${M(1.6)}/>
    <path d="M108 40 l2 -8 l4 6 l4 -7 l2 8 l-4 3 z" fill="#ff8fab" ${M(1.6)}/>
    <path d="M112 36 l3 -6 l2 5 l3 -5 l1 6 z" fill="#fff" ${M(1.4)}/>
    <circle cx="112" cy="40" r="2.4" fill="#ffd166"/>`});function Mi(e,t,n,s,o=10){return`<path d="M${e} ${t-o-8} V${t-o}" fill="none" ${M(2.2)}/>
    <rect x="${e-4}" y="${t-o-2}" width="8" height="5" rx="1" fill="#c99366" ${M(1.8)}/>
    <circle cx="${e}" cy="${t}" r="${o}" fill="${n}" ${M()}/>
    <path d="M${e+1} ${t-o+3} H${e+o-1} V${t+o-3} H${e+2} Z" fill="${s}"/>
    ${ce(`M${e-o+3} ${t-2} q2 -3 4 0`)}`}const N5=Me({kind:"patio-lights",name:"Patio Lights",cat:"decor",w:190,h:70,vb:"0 0 180 70",wall:!0,svg:`<path d="M8 12 Q50 32 90 12 Q130 32 172 14" fill="none" ${M()}/>
    ${Mi(28,40,"#fff6c8","#f0c45c")}
    ${Mi(64,46,"#ffc2d4","#e45d88")}
    ${Mi(100,36,"#fff1c2","#f0c45c")}
    ${Mi(136,46,"#c9f1ff","#7eb4dc")}
    ${Mi(164,34,"#ffd0e8","#e888a8",8)}`}),q5=Me({kind:"toadstool-light",name:"Toadstool Light",cat:"decor",w:70,h:84,vb:"0 0 80 96",svg:`<defs>${Kf("ydtoadG","#ffe7a0",".9")}</defs>
    ${xe(40,26,90)}
    <ellipse cx="40" cy="70" rx="18" ry="8" fill="url(#ydtoadG)"/>
    <path d="M32 58 H48 L52 84 H28 Z" fill="#fff7f8" ${M()}/>
    <path d="M42 60 H48 L50 82 H43 Z" fill="#f0d8cc"/>
    <path d="M6 58 Q40 8 74 58 Q40 74 6 58 Z" fill="#ff8fab" ${M()}/>
    <path d="M44 22 Q66 16 72 54 Q52 66 44 52 Z" fill="#e45d88"/>
    ${ce("M18 48 q16 -12 26 -2")}
    <circle cx="26" cy="48" r="5" fill="#fff" ${M(2)}/>
    <circle cx="44" cy="40" r="6" fill="#fff" ${M(2)}/>
    <circle cx="36" cy="56" r="3.5" fill="#fff" ${M(2)}/>
    <path d="M22 52 h6 M40 46 h8" fill="none" stroke="#ffd0e0" stroke-width="1.2" stroke-linecap="round"/>`}),F5=Me({kind:"stepping-stones",name:"Stepping Stones",cat:"decor",w:160,h:64,vb:"0 0 160 70",svg:`${xe(80,66,64)}
    <path d="M8 40 L24 28 L50 32 L54 50 L30 58 L10 52 Z" fill="#f7f4ef" ${M()}/>
    <path d="M34 36 L50 32 L54 50 L36 54 Z" fill="#d9d3cc"/>
    <path d="M56 44 L78 32 L108 36 L112 56 L80 64 L58 58 Z" fill="#f4f1ec" ${M()}/>
    <path d="M86 40 L108 36 L112 56 L90 58 Z" fill="#d4cdc4"/>
    <path d="M110 30 L128 20 L154 28 L150 48 L124 52 L108 42 Z" fill="#e7e2dc" ${M()}/>
    <path d="M132 26 L152 28 L148 46 L130 44 Z" fill="#d0c9c2"/>
    ${ce("M16 38 q8 -4 14 0")}
    ${ht("M22 44 h12 M72 48 h16 M124 36 h12")}`}),j5=Me({kind:"pinwheel",name:"Pinwheel",cat:"decor",w:56,h:90,vb:"0 0 70 100",holdable:!0,svg:`${xe(35,16,96)}
    <rect x="31" y="44" width="6" height="50" rx="2" fill="#c99366" ${M()}/>
    <rect x="34" y="48" width="3" height="42" fill="#c99366"/>
    <path d="M34 40 L34 8 Q54 16 48 36 Z" fill="#ff8fab" ${M(2.2)}/>
    <path d="M42 18 Q50 28 36 34 Z" fill="#e45d88"/>
    <path d="M34 40 L62 32 Q58 54 40 50 Z" fill="#ffd166" ${M(2.2)}/>
    <path d="M54 38 Q58 48 42 46 Z" fill="#e0a83a"/>
    <path d="M34 40 L34 72 Q14 64 20 44 Z" fill="#8ecae6" ${M(2.2)}/>
    <path d="M26 58 Q16 50 32 46 Z" fill="#5aa9d6"/>
    <path d="M34 40 L6 48 Q12 26 28 30 Z" fill="#c9a0dc" ${M(2.2)}/>
    <path d="M16 36 Q14 28 28 34 Z" fill="#b388d6"/>
    <circle cx="34" cy="40" r="5" fill="#fff" ${M(2.2)}/>
    <circle cx="34" cy="40" r="1.8" fill="${lt}"/>`}),Z5=Me({kind:"rain-barrel",name:"Rain Barrel",cat:"decor",w:86,h:108,vb:"0 0 80 110",svg:`${xe(40,30,104)}
    <path d="M22 30 C12 48 12 78 22 98 H58 C68 78 68 48 58 30 Z" fill="#8ecae6" ${M()}/>
    <path d="M46 34 C58 48 60 76 54 96 H58 C66 76 66 50 56 32 Z" fill="#5aa9c6"/>
    ${ht("M28 40 v48 M36 36 v54 M44 38 v50")}
    ${ce("M24 42 v24")}
    <ellipse cx="40" cy="30" rx="20" ry="8" fill="#bde0fe" ${M()}/>
    <ellipse cx="46" cy="30" rx="10" ry="5" fill="#7eb4dc"/>
    <path d="M16 48 H64" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <path d="M14 74 H66" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <rect x="56" y="78" width="14" height="7" rx="2" fill="#d7ecff" ${M(2)}/>
    <path d="M70 81 h6" fill="none" ${M(2)}/>
    <path d="M34 18 q6 -8 12 0" fill="none" stroke="#7eb4dc" stroke-width="2.2" stroke-linecap="round"/>`}),G5=Me({kind:"butterfly-bush",name:"Butterfly Bush",cat:"plants",w:120,h:130,vb:"0 0 100 120",svg:`${xe(50,40,114)}
    <ellipse cx="32" cy="86" rx="22" ry="18" fill="#95d5b2" ${M(2.2)}/>
    <ellipse cx="70" cy="84" rx="24" ry="20" fill="#3d9a68" ${M(2.2)}/>
    <ellipse cx="50" cy="78" rx="36" ry="28" fill="#74c69d" ${M()}/>
    <path d="M18 90 Q50 108 84 88 Q68 100 50 102 Q30 100 18 90 Z" fill="#3d9a68"/>
    ${ce("M24 68 q14 -8 26 2")}
    ${ht("M28 80 q4 6 0 10 M46 72 q5 8 0 12 M66 78 q4 6 0 10")}
    <path d="M30 62 C28 44 32 26 35 24 C39 28 40 46 38 62 Z" fill="#c9a0dc" ${M(1.8)}/>
    <circle cx="33" cy="36" r="2.2" fill="#f7ecff"/><circle cx="36" cy="46" r="2.2" fill="#b388d6"/><circle cx="33" cy="54" r="2" fill="#f7ecff"/>
    <path d="M46 58 C44 36 50 14 53 12 C57 16 58 40 54 58 Z" fill="#b388d6" ${M(1.8)}/>
    <circle cx="50" cy="28" r="2.4" fill="#f7ecff"/><circle cx="53" cy="40" r="2.4" fill="#c9a0dc"/><circle cx="50" cy="50" r="2.2" fill="#f7ecff"/>
    <path d="M62 60 C62 42 68 28 71 26 C75 30 76 46 72 60 Z" fill="#a78bfa" ${M(1.8)}/>
    <circle cx="67" cy="38" r="2.2" fill="#f7ecff"/><circle cx="70" cy="48" r="2" fill="#c9a0dc"/>
    <path d="M14 26 C4 14 2 24 10 32 C14 36 18 32 18 28 Z" fill="#ff8fab" ${M(1.6)}/>
    <path d="M20 24 C30 12 34 24 26 34 C22 38 20 30 20 26 Z" fill="#c9a0dc" ${M(1.6)}/>
    <path d="M12 30 C6 36 6 46 14 46 C18 44 20 36 18 30 Z" fill="#ffd166" ${M(1.6)}/>
    <path d="M22 30 C30 36 32 46 24 48 C20 44 18 36 20 30 Z" fill="#8ecae6" ${M(1.6)}/>
    <ellipse cx="18" cy="32" rx="2" ry="7" fill="${lt}"/>
    <path d="M16 26 Q12 18 10 14 M20 26 Q24 18 28 14" fill="none" stroke="${lt}" stroke-width="1.3" stroke-linecap="round"/>`}),Y5=Me({kind:"hedge-row",name:"Hedge Row",cat:"plants",w:190,h:96,vb:"0 0 180 96",svg:`${xe(90,78,90)}
    <path d="M16 84 C28 70 40 62 52 66 C62 52 78 50 90 62 C102 50 118 52 128 66 C140 58 156 64 164 74 L164 86 L16 86 Z" fill="#2f7d52"/>
    <path d="M10 82 L10 60 C10 50 18 46 26 50 C32 34 46 32 54 48 C60 30 76 28 84 46 C92 28 108 28 116 46 C124 30 140 32 148 48 C156 36 166 42 170 54 L170 82 Z" fill="#74c69d" ${M()}/>
    <path d="M148 46 C160 38 170 50 170 70 L170 82 L140 82 L146 58 Z" fill="#52b788"/>
    <path d="M22 64 C40 54 58 58 70 50 C84 60 100 48 116 56 C128 48 146 56 158 64" fill="none" stroke="#95d5b2" stroke-width="6" stroke-linecap="round" opacity=".85"/>
    <path d="M14 68 C48 78 132 76 166 66 L168 82 L12 82 Z" fill="#3d9a68"/>
    ${ht("M28 58 q3 5 0 8 M48 54 q3 6 0 9 M70 52 q3 6 1 9 M94 52 q3 6 0 10 M118 54 q3 6 0 9 M142 56 q3 5 0 8")}
    ${ce("M18 58 q10 -4 16 1")}
    ${ce("M58 42 q12 -4 16 2")}`}),K5=Me({kind:"lemonade-cup",name:"Lemonade Cup",cat:"food",w:52,h:70,vb:"0 0 70 90",holdable:!0,svg:`${xe(35,22,84)}
    <path d="M18 32 H52 L46 76 H24 Z" fill="#fff" ${M()}/>
    <path d="M40 34 H50 L46 74 H40 Z" fill="#f0e6d8"/>
    <path d="M20 44 H50 L46 76 H24 Z" fill="#ffe566"/>
    <path d="M40 46 H48 L46 74 H40 Z" fill="#f0c45c"/>
    <ellipse cx="35" cy="44" rx="15" ry="6" fill="#fff3a0" ${M(2)}/>
    <ellipse cx="35" cy="32" rx="17" ry="7" fill="#fff" ${M()}/>
    <path d="M40 42 L48 16 H58" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="20" cy="30" r="8" fill="#ffe566" ${M(1.8)}/>
    <path d="M20 23 v14 M14 30 h12" fill="none" stroke="#fff" stroke-width="1.4"/>
    <path d="M16 26 q4 4 8 0 M16 34 q4 -4 8 0" fill="none" stroke="#e0a83a" stroke-width="1.2"/>
    ${ce("M24 38 v14")}`}),Zg=520,X5=Me({kind:"picnic-table",name:"Picnic Table",cat:"furniture",w:360,h:220,vb:"0 0 160 100",svg:`${xe(80,68,96)}
    <rect x="18" y="62" width="124" height="10" rx="2" fill="#e7c49a" ${M()}/>
    <rect x="118" y="64" width="20" height="7" fill="#c99366"/>
    <rect x="28" y="70" width="8" height="24" rx="1" fill="#f3d2aa" ${M(2)}/>
    <rect x="124" y="70" width="8" height="24" rx="1" fill="#d4a373" ${M(2)}/>
    <rect x="8" y="78" width="40" height="8" rx="2" fill="#f6e0c4" ${M(2)}/>
    <rect x="112" y="78" width="40" height="8" rx="2" fill="#e7c49a" ${M(2)}/>
    <rect x="22" y="36" width="116" height="14" rx="2" fill="#f6e0c4" ${M()}/>
    <rect x="110" y="38" width="24" height="10" fill="#d4a373"/>
    <rect x="36" y="48" width="8" height="18" fill="#f3d2aa" ${M(2)}/>
    <rect x="116" y="48" width="8" height="18" fill="#d4a373" ${M(2)}/>
    ${ce("M28 40 h36")}
    ${ht("M40 42 h50 M34 66 h70")}`}),J5=Me({kind:"seesaw",name:"Seesaw",cat:"furniture",w:200,h:80,vb:"0 0 180 80",svg:`${xe(90,74,76)}
    <path d="M78 58 H102 L96 74 H84 Z" fill="#f3d2aa" ${M()}/>
    <path d="M94 60 H100 L96 72 H92 Z" fill="#c99366"/>
    <rect x="10" y="40" width="160" height="12" rx="3" fill="#ffd166" ${M()} transform="rotate(-8 90 46)"/>
    <rect x="130" y="28" width="28" height="8" fill="#e0a83a"/>
    <rect x="16" y="34" width="28" height="10" rx="2" fill="#ff8fab" ${M(2)}/>
    <rect x="136" y="22" width="28" height="10" rx="2" fill="#8ecae6" ${M(2)}/>
    ${ce("M24 44 h40")}`}),eM=Me({kind:"wagon",name:"Wagon",cat:"furniture",w:130,h:90,vb:"0 0 130 90",svg:`${xe(64,50,86)}
    <circle cx="36" cy="74" r="12" fill="${lt}" ${M(2)}/><circle cx="36" cy="74" r="5" fill="#ffd166"/>
    <circle cx="96" cy="74" r="12" fill="${lt}" ${M(2)}/><circle cx="96" cy="74" r="5" fill="#ffd166"/>
    <path d="M22 40 H108 L100 68 H30 Z" fill="#e45d88" ${M()}/>
    <path d="M86 42 H106 L100 66 H84 Z" fill="#c93b68"/>
    <rect x="28" y="28" width="76" height="14" rx="3" fill="#ff8fab" ${M()}/>
    <path d="M108 36 H122 L118 58" fill="none" ${M(2.4)}/>
    ${ce("M32 46 h28")}
    ${ht("M40 54 h40")}`}),tM=Me({kind:"birdhouse",name:"Birdhouse",cat:"decor",w:70,h:120,vb:"0 0 80 130",svg:`${xe(40,22,124)}
    <rect x="34" y="70" width="12" height="50" rx="2" fill="#d4a373" ${M()}/>
    <rect x="40" y="74" width="5" height="42" fill="#c99366"/>
    <path d="M12 62 L40 28 L68 62 Z" fill="#e45d88" ${M()}/>
    <path d="M40 32 L66 60 H52 Z" fill="#c93b68"/>
    <rect x="18" y="60" width="44" height="36" rx="3" fill="#f6e0c4" ${M()}/>
    <rect x="48" y="64" width="10" height="28" fill="#e7c49a"/>
    <circle cx="40" cy="76" r="7" fill="#5a3d5c"/>
    <rect x="36" y="86" width="14" height="4" rx="1" fill="#d4a373" ${M(1.6)}/>
    ${ce("M22 66 h12")}`}),nM=Me({kind:"sprinkler",name:"Sprinkler",cat:"decor",w:80,h:70,vb:"0 0 100 80",svg:`${xe(50,28,76)}
    <ellipse cx="50" cy="66" rx="22" ry="8" fill="#74c69d" ${M()}/>
    <rect x="44" y="40" width="12" height="26" rx="3" fill="#8ecae6" ${M()}/>
    <circle cx="50" cy="36" r="8" fill="#ffd166" ${M()}/>
    <path d="M50 28 C30 16 18 20 12 10" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 28 C70 14 84 18 90 8" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 26 C40 8 58 4 50 2" fill="none" stroke="#c9ecff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="12" cy="10" r="2.2" fill="#c9ecff"/><circle cx="90" cy="8" r="2.2" fill="#c9ecff"/><circle cx="50" cy="2" r="2.2" fill="#fff"/>
    ${ce("M46 44 v10")}`}),sM=Me({kind:"beach-ball",name:"Beach Ball",cat:"decor",w:70,h:70,vb:"0 0 80 80",svg:`${xe(40,26,76)}
    <circle cx="40" cy="40" r="28" fill="#fff" ${M()}/>
    <path d="M40 12 A28 28 0 0 1 66 32 L40 40 Z" fill="#ff8fab"/>
    <path d="M66 48 A28 28 0 0 1 40 68 L40 40 Z" fill="#ffd166"/>
    <path d="M24 64 A28 28 0 0 1 14 36 L40 40 Z" fill="#8ecae6"/>
    <path d="M18 28 A28 28 0 0 1 40 12 L40 40 Z" fill="#b7e4c7"/>
    <circle cx="40" cy="40" r="5" fill="#fff" ${M(2)}/>
    ${ce("M28 24 q6 -4 10 2")}`}),oM=Me({kind:"patio-umbrella",name:"Patio Umbrella",cat:"furniture",w:150,h:180,vb:"0 0 120 150",svg:`${xe(60,36,144)}
    <path d="M10 58 Q60 18 110 58 L98 64 Q60 32 22 64 Z" fill="#ffb3c6" ${M()}/>
    <path d="M60 22 L108 56 L96 62 Z" fill="#e45d88"/>
    <path d="M28 40 Q44 30 60 36 Q76 28 96 42" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <rect x="56" y="58" width="8" height="78" rx="2" fill="#f3d2aa" ${M()}/>
    <rect x="60" y="62" width="3" height="70" fill="#d4a373"/>
    <rect x="40" y="128" width="40" height="8" rx="2" fill="#e7c49a" ${M(2)}/>
    ${ce("M24 50 q16 -8 24 0")}`}),iM=Me({kind:"veggie-patch",name:"Vegetable Patch",cat:"plants",w:150,h:80,vb:"0 0 150 80",svg:`${xe(75,62,76)}
    <rect x="8" y="28" width="134" height="44" rx="4" fill="#c99366" ${M()}/>
    <rect x="16" y="34" width="118" height="32" fill="#8d6e4c"/>
    <path d="M36 48 C36 36 48 34 48 46 C48 34 60 36 58 48 Z" fill="#74c69d" ${M(2)}/>
    <path d="M78 50 C78 38 90 36 90 48 C90 36 102 38 100 50 Z" fill="#52b788" ${M(2)}/>
    <path d="M112 52 L120 30 L128 52 Z" fill="#ff922b" ${M(2)}/>
    <path d="M118 32 Q124 22 130 28" fill="none" stroke="#2f7d52" stroke-width="2" stroke-linecap="round"/>
    ${ce("M18 36 h24")}`}),aM=Me({kind:"hammock",name:"Hammock",cat:"furniture",w:190,h:110,vb:"0 0 170 100",svg:`${xe(85,70,96)}
    <rect x="8" y="18" width="10" height="74" rx="2" fill="#d4a373" ${M()}/>
    <rect x="152" y="18" width="10" height="74" rx="2" fill="#c99366" ${M()}/>
    <path d="M18 28 Q85 78 152 28" fill="none" stroke="#5a3d5c" stroke-width="2"/>
    <path d="M18 36 Q85 88 152 36 L152 48 Q85 96 18 48 Z" fill="#8ecae6" ${M()}/>
    <path d="M120 40 Q140 62 150 44 L150 54 Q136 74 112 52 Z" fill="#5fb0d8"/>
    ${ce("M36 46 q24 10 30 4")}
    ${ht("M40 58 q30 16 50 4")}`}),rM=Me({kind:"garden-gnome",name:"Garden Gnome",cat:"decor",w:64,h:100,vb:"0 0 70 110",svg:`${xe(35,22,104)}
    <path d="M18 78 H52 L48 100 H22 Z" fill="#3d7ec4" ${M()}/>
    <path d="M40 80 H50 L48 98 H42 Z" fill="#2c5f96"/>
    <circle cx="35" cy="62" r="16" fill="#f6d2b5" ${M()}/>
    <path d="M20 66 Q35 78 50 66 Q46 74 35 76 Q24 74 20 66 Z" fill="#fff"/>
    <circle cx="29" cy="60" r="2" fill="${lt}"/><circle cx="41" cy="60" r="2" fill="${lt}"/>
    <path d="M16 52 L35 18 L54 52 Z" fill="#e45d88" ${M()}/>
    <path d="M35 22 L52 50 H42 Z" fill="#c93b68"/>
    <ellipse cx="35" cy="52" rx="16" ry="4" fill="#ff8fab" ${M(2)}/>
    ${ce("M22 40 l8 -8")}`}),Ra=[A5,R5,C5,I5,B5,O5,D5,H5,V5,U5,z5,Q5,N5,q5,F5,j5,Z5,G5,Y5,K5,X5,J5,eM,tM,nM,sM,oM,iM,aM,rM];function lM(e,t){for(const n of Ra)t[n.kind]||(e.push(n),t[n.kind]=n)}function Rc(e,t,n){return`<g>
    <ellipse cx="${e-22*n}" cy="${t}" rx="${26*n}" ry="${14*n}" fill="#fff"/>
    <ellipse cx="${e+18*n}" cy="${t-2*n}" rx="${30*n}" ry="${16*n}" fill="#fff"/>
    <ellipse cx="${e}" cy="${t+4*n}" rx="${34*n}" ry="${13*n}" fill="#fff"/>
  </g>`}function cM(e,t,n,s,o){const a=l=>`<rect x="${e-2}" y="${l}" width="${t-e+12+4}" height="8" rx="3" fill="#fff" ${M(2.2)}/><rect x="${(t-40).toFixed(1)}" y="${l+1}" width="30" height="6" rx="2" fill="#d5ead8"/>`;let r=a(n+26)+a(s-28);for(let l=e;l<=t;l+=o)r+=`<path d="M${l} ${n+12} L${l+12/2} ${n} L${l+12} ${n+12} V${s} H${l} Z" fill="#f7fff8" ${M(2.2)}/>`,r+=`<path d="M${(l+12*.58).toFixed(1)} ${n+10} H${l+12-1} V${s-4} H${(l+12*.58).toFixed(1)} Z" fill="#d5ead8"/>`,r+=`<path d="M${l+2} ${n+18} v22" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".75" fill="none"/>`;return r}function dM(e,t){const s=150+46*t,o=372-s;return`<g id="yardTree">
    <rect x="${e-14*t}" y="${s}" width="${28*t}" height="${o}" rx="${6*t}" fill="#e7b98a" ${M()}/>
    <rect x="${e+4*t}" y="${s+8*t}" width="${8*t}" height="${o-16*t}" fill="#c99366"/>
    ${ht(`M${e-4*t} ${s+28*t} v${36*t}`)}
    ${ce(`M${e-8*t} ${s+16*t} v${22*t}`)}
    <ellipse cx="${e+8*t}" cy="${150+18*t}" rx="${78*t}" ry="${46*t}" fill="#2f7d52"/>
    <ellipse cx="${e-48*t}" cy="${150+10*t}" rx="${36*t}" ry="${30*t}" fill="#245e3e"/>
    <ellipse cx="${e-34*t}" cy="${150+16*t}" rx="${42*t}" ry="${34*t}" fill="#95d5b2" ${M(2.2)}/>
    <ellipse cx="${e}" cy="150" rx="${68*t}" ry="${50*t}" fill="#74c69d" ${M()}/>
    <ellipse cx="${e+40*t}" cy="${150+8*t}" rx="${40*t}" ry="${36*t}" fill="#3d9a68" ${M(2.2)}/>
    <ellipse cx="${e-8*t}" cy="${150-6*t}" rx="${28*t}" ry="${20*t}" fill="#b7e4c7" opacity=".95"/>
    ${ht(`M${e-20*t} ${150+8*t} q${8*t} ${6*t} 0 ${12*t} M${e+10*t} ${150-4*t} q${8*t} ${6*t} 2 ${12*t} M${e+28*t} ${150+12*t} q${6*t} ${5*t} 0 ${10*t}`)}
    ${ce(`M${e-36*t} ${150-18*t} q${16*t} -8 ${28*t} 2`)}
  </g>`}function fM(){return`<svg class="yardWorld" viewBox="0 0 2400 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ydsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6eb6e8"/>
        <stop offset=".48" stop-color="#c5e6fb"/>
        <stop offset="1" stop-color="#fff3df"/>
      </linearGradient>
      ${Kf("ydsun","#ffe566",".55")}
    </defs>
    <rect width="2400" height="430" fill="url(#ydsky)"/>
    <circle id="ydSunGlow" cx="1180" cy="68" r="62" fill="url(#ydsun)"/>
    <circle id="ydSun" cx="1180" cy="68" r="30" fill="#ffe566"/>
    <circle cx="1170" cy="58" r="8" fill="#fff" opacity=".8"/>
    ${Rc(980,96,1.05)}${Rc(1320,78,.85)}${Rc(1500,120,.7)}
    <rect y="360" width="2400" height="240" fill="#c6ef9a"/>
    <rect y="360" width="2400" height="28" fill="#e7f8c8"/>
    <rect y="520" width="2400" height="80" fill="#9ed67a"/>
    <path d="M1040 470 q30 -12 16 -6 M1200 510 q28 -12 14 -4 M1360 548 q24 -10 12 -4" fill="none" stroke="#3d9a68" stroke-width="1.2" stroke-linecap="round" opacity=".22"/>
    ${cM(846,2118,258,372,24)}
    ${dM(1184,.8)}
    <path d="M840 120 H1076 L1054 152 H862 Z" fill="#ffb3c6" ${M()}/>
    <path d="M960 126 H1064 L1046 148 H976 Z" fill="#e45d88"/>
    ${ce("M876 132 h56")}
    <rect x="864" y="150" width="196" height="222" rx="4" fill="#fff6ea" ${M()}/>
    <rect x="1044" y="156" width="12" height="210" fill="#f0dcc4"/>
    ${ht("M880 174 H1000 M880 202 H1000 M880 230 H990 M880 294 H1000 M880 334 H980")}
    <rect x="884" y="180" width="44" height="36" rx="4" fill="#c9ecff" ${M(2.2)}/>
    <rect x="912" y="184" width="12" height="28" fill="#8ecae6"/>
    <path d="M906 180 V216 M884 198 H928" fill="none" ${M(2.2)}/>
    ${ce("M890 188 h12")}
  </svg>`}function hM(e,t,n,s,o){const i=(600-t)/600*100,a=(n/2400*100).toFixed(3),r=(s/600*100).toFixed(3);return o==="right"?`right:${((2400-(e+n/2))/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`:`left:${((e-n/2)/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`}function uM(){return`<svg class="doorArt" viewBox="0 0 100 230">
    <rect x="4" y="2" width="92" height="226" rx="3" fill="#f3d2aa" ${M()}/>
    <rect x="76" y="6" width="16" height="218" fill="#d4a373"/>
    <rect x="14" y="12" width="72" height="206" rx="2" fill="#f6e9ff" ${M(2.2)}/>
    <rect x="70" y="16" width="12" height="198" fill="#d4b4e6"/>
    <rect x="24" y="22" width="52" height="42" rx="3" fill="#c9ecff" ${M(2.2)}/>
    <rect x="60" y="26" width="12" height="34" fill="#8ecae6"/>
    <path d="M50 22 V64 M24 43 H76" fill="none" ${M(2.2)}/>
    ${ce("M28 28 h18")}
    <rect x="24" y="76" width="52" height="56" rx="3" fill="#f7ecff" ${M(2.2)}/>
    <rect x="62" y="80" width="10" height="48" fill="#e0c8f0"/>
    ${ce("M28 84 v22")}
    <rect x="24" y="144" width="52" height="56" rx="3" fill="#f7ecff" ${M(2.2)}/>
    <rect x="62" y="148" width="10" height="48" fill="#e0c8f0"/>
    <circle cx="64" cy="126" r="4.2" fill="#ffd166" ${M(2.2)}/>
    <rect x="10" y="214" width="80" height="10" rx="2" fill="#e7c49a" ${M(2.2)}/>
  </svg>`}function pM(e){const t=e==="living"?Fg:jg,n=e==="living"?"backyard":"living",s=e==="living"?"Backyard":"Back inside",o=e==="yard"?"right":"left";return`<button type="button" class="yardDoor" data-yard-go="${n}" aria-label="${s}" style="${hM(t.x,t.y,t.w,t.h,o)}">${uM()}<span class="yardHintLabel"><span>${s}</span></span></button>`}function Jf(e,t){const n=e.replace(/[&<>]/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[s]);return`<figure class="ysCard"><div class="ysArt">${t}</div><figcaption>${n}</figcaption></figure>`}function gM(){return`<div class="yardSheet" data-yard-sheet="1"><h1>Backyard pieces</h1><div class="ysGrid">${Ra.map(t=>Jf(t.name,Nt(t))).join("")}</div></div>`}function mM(e,t){return Jf(e,`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${t}</svg>`)}function yM(){const e=(r,l)=>xe(r,l,96.4),t=`
    ${e(50,40)}
    <path d="M18 58 V30 Q18 18 32 18 H68 Q82 18 82 30 V58 Z" fill="#ffb7cc" ${M()}/>
    <path d="M56 24 H76 Q80 24 80 32 V52 H56 Z" fill="#e888a8"/>
    <circle cx="34" cy="38" r="3.4" fill="#ff8fab" ${M(2)}/><circle cx="33" cy="37" r="1.1" fill="#fff"/>
    <circle cx="50" cy="36" r="3.4" fill="#ff8fab" ${M(2)}/><circle cx="49" cy="35" r="1.1" fill="#fff"/>
    <circle cx="66" cy="38" r="3.4" fill="#e45d88" ${M(2)}/><circle cx="65" cy="37" r="1.1" fill="#fff"/>
    <rect x="4" y="44" width="20" height="38" rx="10" fill="#ff7096" ${M()}/>
    <ellipse cx="14" cy="44" rx="12" ry="9" fill="#ff9ab6" ${M()}/>
    <ellipse cx="9" cy="41" rx="4" ry="2.4" fill="#fff" opacity=".7"/>
    <rect x="76" y="44" width="20" height="38" rx="10" fill="#e04878" ${M()}/>
    <ellipse cx="86" cy="44" rx="12" ry="9" fill="#e45d88" ${M()}/>
    <rect x="20" y="64" width="60" height="16" rx="6" fill="#ff8fab" ${M()}/>
    <rect x="22" y="56" width="28" height="22" rx="7" fill="#ffe0ea" ${M(2.4)}/>
    <rect x="50" y="56" width="28" height="22" rx="7" fill="#ffc2d4" ${M(2.4)}/>
    <rect x="66" y="58" width="10" height="18" rx="4" fill="#e888a8"/>
    <path d="M26 60 h20 M54 60 h16 M26 74 h20 M54 74 h16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M50 58 v18" fill="none" stroke="#e45d88" stroke-width="2.2" stroke-linecap="round"/>
    <rect x="26" y="46" width="20" height="16" rx="5" fill="#fff" ${M(2.2)}/>
    <path d="M33 52 c-2.2 -3.2 -6.4 -.4 -3.4 2.6 c1 1.2 3.4 2.6 3.4 2.6 c0 0 2.4 -1.4 3.4 -2.6 c3 -3 -1.2 -5.8 -3.4 -2.6 z" fill="#ff8fab"/>
    <path d="M41 56 c-1.4 -2 -4.2 0 -2.2 1.8 c.7 .8 2.2 1.6 2.2 1.6 c0 0 1.5 -.8 2.2 -1.6 c2 -1.8 -.8 -3.8 -2.2 -1.8 z" fill="#7eb4dc"/>
    <rect x="16" y="84" width="7" height="10" rx="2" fill="${lt}"/>
    <rect x="77" y="84" width="7" height="10" rx="2" fill="${lt}"/>`,n=`
    <defs>${Kf("a2lamp-glow","#ffd56a",".95")}</defs>
    ${e(50,22)}
    <path d="M34 8 L42 8 L37 40 L24 40 Z" fill="#fff6d4"/>
    <path d="M42 8 L50 8 L50 40 L37 40 Z" fill="#ffe08a"/>
    <path d="M50 8 L58 8 L63 40 L50 40 Z" fill="#f0c45c"/>
    <path d="M58 8 L66 8 L76 40 L63 40 Z" fill="#e0a83a"/>
    <path d="M24 40 L34 8 H66 L76 40 Z" fill="none" ${M()}/>
    <path d="M42 8 L37 40 M50 8 V40 M58 8 L63 40" fill="none" stroke="${lt}" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="50" cy="36" rx="20" ry="10" fill="url(#a2lamp-glow)"/>
    <rect x="46" y="40" width="8" height="42" rx="3" fill="#e4ccf2" ${M()}/>
    <rect x="50" y="44" width="4" height="34" rx="2" fill="#c49ad4"/>
    <ellipse cx="50" cy="88" rx="20" ry="6" fill="#d4b4e6" ${M()}/>
    <ellipse cx="60" cy="90" rx="8" ry="3" fill="#b888c8"/>
    <ellipse cx="42" cy="86" rx="6" ry="2" fill="#fff" opacity=".55"/>`,s=`
    ${e(50,30)}
    <ellipse cx="30" cy="40" rx="14" ry="22" fill="#b7ebc8" ${M()} transform="rotate(-30 30 40)"/>
    <path d="M34 28 C30 40 32 52 44 58" fill="#52b078"/>
    <ellipse cx="72" cy="42" rx="13" ry="20" fill="#3d9a68" ${M()} transform="rotate(26 72 42)"/>
    <path d="M50 66 C40 44 42 18 50 6 C58 18 60 44 50 66 Z" fill="#d8f6e4" ${M()}/>
    <path d="M54 18 C60 32 58 48 50 58 C56 44 58 28 54 18 Z" fill="#52b078"/>
    <path d="M50 14 V52" fill="none" stroke="#2f7a52" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
    <path d="M40 60 C34 50 24 48 22 38 C32 44 38 54 42 64 Z" fill="#74c69d" ${M(2.2)}/>
    <path d="M28 64 H74 L68 94 H34 Z" fill="#e8845a" ${M()}/>
    <path d="M58 66 H72 L68 92 H60 Z" fill="#c45c38"/>
    <rect x="22" y="58" width="58" height="10" rx="4" fill="#f0a078" ${M()}/>
    <rect x="56" y="60" width="20" height="6" rx="3" fill="#d47848"/>
    <ellipse cx="50" cy="65" rx="20" ry="3" fill="#a86a42" opacity=".4"/>
    <path d="M28 62 h14" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>`,o=Object.fromEntries(Ra.map(r=>[r.kind,r])),i=(r,l,c)=>mM(r,l)+Jf(o[c].name,Nt(o[c]));return`<div class="yardSheet yardCompare" data-yard-compare="1"><h1>House style and the yard</h1><p class="ysNote">Sofa, lamp, and plant are the approved refresh. Swing, cart, and birdbath use the same light.</p><div class="ysPair">${i("Sofa",t,"yard-swing")+i("Lamp",n,"lemonade-cart")+i("Plant",s,"birdbath")}</div></div>`}const Oi="#5a3d5c",X=`stroke="${Oi}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Mr='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>',Gg=[{kind:"soaking-tub",name:"Soaking Tub",cat:"furniture",w:250,h:200,vb:"0 0 120 96",svg:`<ellipse cx="60" cy="92" rx="48" ry="3.2" fill="#000" opacity=".12"/><rect x="18" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${X}/><rect x="92" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${X}/><path d="M14 58 Q8 58 10 46 L22 28 H98 L110 46 Q112 58 106 58 Z" fill="#fff" ${X}/><ellipse cx="60" cy="30" rx="44" ry="14" fill="#fff" ${X}/><ellipse cx="60" cy="32" rx="34" ry="9" fill="#d7f3ff"/><path d="M28 34 Q60 42 92 34" fill="none" stroke="#b9e6f8" stroke-width="4"/><rect x="96" y="8" width="8" height="22" rx="4" fill="#f7d27a" ${X}/><path d="M100 28 Q112 34 104 44" fill="none" ${X}/><circle cx="104" cy="46" r="3.2" fill="#a8d4ea" ${X}/><ellipse cx="46" cy="30" rx="8" ry="3" fill="#fff" opacity=".7"/>`},{kind:"bath-toilet",name:"Toilet",cat:"furniture",w:120,h:160,vb:"0 0 100 134",svg:`<ellipse cx="50" cy="128" rx="34" ry="4" fill="#000" opacity=".12"/><rect x="28" y="8" width="44" height="36" rx="8" fill="#fff" ${X}/><rect x="34" y="16" width="32" height="16" rx="4" fill="#e7f6ff"/><rect x="46" y="42" width="8" height="10" fill="#f4f7fb" ${X}/><ellipse cx="50" cy="78" rx="36" ry="22" fill="#fff" ${X}/><ellipse cx="50" cy="74" rx="24" ry="14" fill="#d7f3ff" ${X}/><path d="M18 70 Q50 58 82 70" fill="#fff" ${X}/><rect x="40" y="96" width="20" height="24" rx="4" fill="#f7f4ef" ${X}/>`},{kind:"sink-vanity",name:"Sink Vanity",cat:"furniture",w:210,h:190,vb:"0 0 110 100",svg:`<ellipse cx="55" cy="96" rx="46" ry="3.2" fill="#000" opacity=".12"/><rect x="10" y="48" width="90" height="42" rx="8" fill="#f6e2c4" ${X}/><path d="M55 48 V90" ${X}/><circle cx="28" cy="70" r="3" fill="${Oi}"/><circle cx="82" cy="70" r="3" fill="${Oi}"/><rect x="16" y="90" width="8" height="6" rx="2" fill="${Oi}"/><rect x="86" y="90" width="8" height="6" rx="2" fill="${Oi}"/><ellipse cx="55" cy="44" rx="40" ry="12" fill="#fff" ${X}/><ellipse cx="55" cy="44" rx="26" ry="7" fill="#d7f3ff"/><rect x="50" y="10" width="10" height="28" rx="4" fill="#f7d27a" ${X}/><path d="M55 36 Q70 40 66 48" fill="none" ${X}/><rect x="8" y="40" width="94" height="8" rx="3" fill="#f3d2b5" ${X}/>`},{kind:"bath-mirror",name:"Bath Mirror",cat:"decor",w:120,h:160,wall:!0,vb:"0 0 90 120",svg:`<path d="M45 8 C70 8 82 28 82 58 C82 92 68 112 45 112 C22 112 8 92 8 58 C8 28 20 8 45 8 Z" fill="#f7d27a" ${X}/><ellipse cx="45" cy="60" rx="26" ry="40" fill="#d7f4ff" ${X}/><path d="M30 36 l8 -8 M28 52 l18 -16" stroke="#fff" stroke-width="4" stroke-linecap="round"/><rect x="38" y="2" width="14" height="8" rx="3" fill="#f28fa6" ${X}/>`},{kind:"towel-bar",name:"Towel Bar",cat:"decor",w:170,h:116,wall:!0,vb:"0 0 150 102",svg:`<rect x="10" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${X}/><rect x="130" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${X}/><rect x="14" y="16" width="122" height="8" rx="4" fill="#c98d55" ${X}/><path d="M26 24 H124 V70 Q75 100 26 70 Z" fill="#f7d7e4" ${X}/><path d="M75 24 V88" stroke="#f28fa6" stroke-width="3"/><path d="M40 36 H110" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"bath-mat",name:"Bath Mat",cat:"decor",w:230,h:120,vb:"0 0 160 84",svg:`<ellipse cx="80" cy="78" rx="70" ry="5" fill="#000" opacity=".1"/><rect x="12" y="22" width="136" height="48" rx="18" fill="#f28fa6" ${X}/><rect x="24" y="32" width="112" height="28" rx="12" fill="#f7d7e4"/><path d="M40 46 H120 M40 54 H120" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>`},{kind:"rubber-ducky",name:"Rubber Ducky",cat:"decor",w:80,svg:`${Mr}<ellipse cx="48" cy="68" rx="30" ry="26" fill="#f7d27a" ${X}/><circle cx="68" cy="40" r="18" fill="#ffe9a8" ${X}/><path d="M82 38 H98 Q102 44 92 48 H82 Z" fill="#f28fa6" ${X}/><ellipse cx="36" cy="74" rx="12" ry="8" fill="#f3c15a"/>`},{kind:"shower-curtain",name:"Shower Curtain",cat:"decor",w:150,h:260,holdable:!1,vb:"0 0 90 156",svg:`<rect x="8" y="8" width="74" height="8" rx="3" fill="#c98d55" ${X}/><circle cx="22" cy="16" r="3" fill="#f7d27a" ${X}/><circle cx="40" cy="16" r="3" fill="#f7d27a" ${X}/><circle cx="58" cy="16" r="3" fill="#f7d27a" ${X}/><circle cx="72" cy="16" r="3" fill="#f7d27a" ${X}/><path d="M12 18 Q8 80 16 146 H40 Q30 80 36 18 Z" fill="#d7f4ff" ${X}/><path d="M36 18 Q34 80 46 146 H74 Q84 80 78 18 Z" fill="#f7d7e4" ${X}/><path d="M24 40 Q18 70 26 100 M58 40 Q66 70 58 110" fill="none" stroke="#fff" stroke-width="3" opacity=".65"/>`},{kind:"soap-dish",name:"Soap Dish",cat:"decor",w:90,svg:`${Mr}<ellipse cx="50" cy="78" rx="34" ry="12" fill="#fff" ${X}/><ellipse cx="50" cy="74" rx="26" ry="7" fill="#e7f6ff"/><rect x="28" y="48" width="44" height="22" rx="8" fill="#f7d7e4" ${X}/><path d="M36 56 H64" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"laundry-hamper",name:"Laundry Hamper",cat:"furniture",w:140,h:160,vb:"0 0 100 114",svg:`<ellipse cx="50" cy="108" rx="36" ry="4" fill="#000" opacity=".12"/><path d="M18 40 H82 L74 100 H26 Z" fill="#b9a0dc" ${X}/><path d="M24 58 H76 M26 74 H74" stroke="#fff" stroke-width="3" opacity=".55"/><ellipse cx="50" cy="40" rx="34" ry="10" fill="#c9b6e8" ${X}/><path d="M22 36 Q50 18 78 36" fill="#f7d7e4" ${X}/><path d="M40 28 Q50 40 62 26" fill="none" stroke="#f28fa6" stroke-width="4" stroke-linecap="round"/>`},{kind:"bath-stool",name:"Bath Stool",cat:"furniture",w:110,svg:`${Mr}<ellipse cx="50" cy="58" rx="36" ry="12" fill="#f6e2c4" ${X}/><ellipse cx="50" cy="54" rx="28" ry="7" fill="#fff6ea"/><path d="M22 64 L16 92 M78 64 L84 92 M36 66 L34 92 M64 66 L66 92" ${X}/><path d="M18 90 H34 M66 90 H84" ${X}/>`}],bM=[{kind:"floor-cushion",name:"Floor Cushion",cat:"decor",w:150,h:136,vb:"0 0 130 118",svg:`<ellipse cx="65" cy="112" rx="50" ry="4" fill="#000" opacity=".12"/><ellipse cx="65" cy="68" rx="52" ry="40" fill="#f28fa6" ${X}/><ellipse cx="65" cy="58" rx="40" ry="24" fill="#f7d7e4"/><path d="M38 64 Q65 82 92 64" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"story-pillow",name:"Story Pillow",cat:"decor",w:120,h:100,vb:"0 0 110 92",svg:`<ellipse cx="55" cy="86" rx="40" ry="4" fill="#000" opacity=".12"/><rect x="14" y="28" width="82" height="52" rx="18" fill="#a8d4ea" ${X}/><path d="M55 40 l6 12 13 2 -10 8 2 13 -11 -7 -11 7 2 -13 -10 -8 13 -2 z" fill="#f7d27a" ${X}/>`},{kind:"berry-basket",name:"Berry Basket",cat:"food",w:100,svg:`${Mr}<path d="M22 48 H78 L70 88 H30 Z" fill="#f3d2b5" ${X}/><path d="M30 58 H70 M32 70 H68 M34 80 H66" ${X}/><circle cx="40" cy="40" r="10" fill="#f28fa6" ${X}/><circle cx="58" cy="36" r="10" fill="#c94b6a" ${X}/><circle cx="70" cy="48" r="8" fill="#b9a0dc" ${X}/><path d="M34 36 Q40 28 46 36" fill="none" stroke="#7dce8a" stroke-width="3"/>`},{kind:"ribbon-tray",name:"Ribbon Tray",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`<ellipse cx="70" cy="84" rx="52" ry="4" fill="#000" opacity=".12"/><rect x="16" y="40" width="108" height="36" rx="12" fill="#fff" ${X}/><rect x="22" y="46" width="96" height="22" rx="8" fill="#f7d7e4"/><rect x="36" y="28" width="16" height="22" rx="5" fill="#a8d4ea" ${X}/><rect x="58" y="22" width="14" height="28" rx="5" fill="#f7d27a" ${X}/><path d="M96 24 Q110 16 112 32 Q100 28 104 40 Q92 34 96 24 Z" fill="#f28fa6" ${X}/>`}],Be="#5a3d5c",P=`stroke="${Be}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Ro=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${Be}"/><circle cx="${t}" cy="${n}" r="3" fill="${Be}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,sr=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,Ce='<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>',Sn=[{kind:"sofa",name:"Sofa",cat:"furniture",w:260,svg:`${Ce}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${P}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${P}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${P}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${P}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${P}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${Be}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${Be}"/>`},{kind:"armchair",name:"Armchair",cat:"furniture",w:150,svg:`${Ce}<rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${P}/><rect x="6" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${P}/><rect x="72" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${P}/><rect x="24" y="58" width="52" height="24" rx="10" fill="#b8e0f2" ${P}/><rect x="20" y="86" width="6" height="10" rx="2" fill="${Be}"/><rect x="74" y="86" width="6" height="10" rx="2" fill="${Be}"/>`},{kind:"bed",name:"Bed",cat:"furniture",w:300,svg:`${Ce}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${P}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${P}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${P}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${P}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${P}/>`},{kind:"table",name:"Table",cat:"furniture",w:200,svg:`${Ce}<rect x="4" y="30" width="92" height="14" rx="7" fill="#f4a261" ${P}/><rect x="14" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${P}/><rect x="76" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${P}/><path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".5"/>`},{kind:"chair",name:"Chair",cat:"furniture",w:100,svg:`${Ce}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${P}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${P}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${P}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${P}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/>`},{kind:"lamp",name:"Lamp",cat:"furniture",w:90,svg:`${Ce}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${P}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${P}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${P}/><circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>`},{kind:"fridge",name:"Fridge",cat:"furniture",w:150,svg:`${Ce}<rect x="16" y="4" width="68" height="90" rx="14" fill="#bde0fe" ${P}/><path d="M16 38 H84" ${P}/><rect x="70" y="14" width="5" height="16" rx="2" fill="${Be}"/><rect x="70" y="46" width="5" height="22" rx="2" fill="${Be}"/><circle cx="32" cy="22" r="5" fill="#ff8fab" ${P}/><rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${P}/>`},{kind:"stove",name:"Stove",cat:"furniture",w:170,svg:`${Ce}<rect x="8" y="26" width="84" height="68" rx="12" fill="#ffadad" ${P}/><rect x="8" y="18" width="84" height="14" rx="6" fill="#ffd6a5" ${P}/><rect x="20" y="46" width="60" height="36" rx="8" fill="#5a3d5c" opacity=".85"/><rect x="26" y="52" width="48" height="8" rx="4" fill="#fff" opacity=".25"/><circle cx="22" cy="38" r="3" fill="${Be}"/><circle cx="36" cy="38" r="3" fill="${Be}"/><circle cx="78" cy="38" r="3" fill="${Be}"/>`},{kind:"bookshelf",name:"Shelf",cat:"furniture",w:170,svg:`${Ce}<rect x="10" y="4" width="80" height="90" rx="10" fill="#d4a373" ${P}/><path d="M10 34 H90 M10 64 H90" ${P}/><rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${P}/><rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${P}/><rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${P}/><rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${P}/><rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${P}/><circle cx="34" cy="80" r="8" fill="#ffadad" ${P}/>`},{kind:"tub",name:"Bathtub",cat:"furniture",w:240,svg:`${Ce}<circle cx="30" cy="40" r="7" fill="#bde0fe" ${P}/><circle cx="44" cy="34" r="9" fill="#e0f2ff" ${P}/><circle cx="60" cy="40" r="7" fill="#bde0fe" ${P}/><path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${P}/><rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${P}/><rect x="22" y="88" width="8" height="8" rx="2" fill="${Be}"/><rect x="70" y="88" width="8" height="8" rx="2" fill="${Be}"/>`},{kind:"rug",name:"Rug",cat:"decor",w:320,svg:`<ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${P}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${P}/><ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${P}/>`},{kind:"picture",name:"Picture",cat:"decor",w:130,wall:!0,svg:`<rect x="10" y="20" width="80" height="64" rx="8" fill="#ffd166" ${P}/><rect x="18" y="28" width="64" height="48" rx="4" fill="#bde0fe"/><circle cx="66" cy="40" r="7" fill="#fff3b0"/><path d="M18 76 L38 50 L52 64 L62 54 L82 76 Z" fill="#90e0a8" ${P}/>`},{kind:"window",name:"Window",cat:"decor",w:180,wall:!0,svg:`<rect class="winGlass" x="12" y="8" width="76" height="76" rx="38" fill="#a2d2ff" ${P}/><g class="winDay"><circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/></g><g class="winNight"><circle cx="62" cy="28" r="7" fill="#fff6d8"/><circle cx="28" cy="24" r="1.4" fill="#fff"/><circle cx="44" cy="20" r="1.1" fill="#fff"/><circle cx="70" cy="42" r="1.2" fill="#fff"/><circle cx="36" cy="46" r="1" fill="#fff"/></g><path d="M50 8 V84 M12 50 H88" ${P}/><path d="M4 8 Q20 40 10 90 M96 8 Q80 40 90 90" stroke="#ff8fab" stroke-width="9" fill="none" stroke-linecap="round"/>`},{kind:"clock",name:"Clock",cat:"decor",w:90,wall:!0,svg:`<circle cx="50" cy="50" r="38" fill="#fff" ${P}/><circle cx="50" cy="50" r="30" fill="#fff3b0"/><path d="M50 50 V28 M50 50 L64 58" ${P}/><circle cx="50" cy="50" r="3" fill="${Be}"/>${sr(30,70,66)}`},{kind:"stars",name:"Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M30 20 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffd166" ${P}/><path d="M70 40 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#ffadad" ${P}/><path d="M40 66 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#a2d2ff" ${P}/>`},{kind:"balloon",name:"Balloons",cat:"decor",w:110,svg:`<path d="M38 52 Q44 74 50 96 M64 46 Q58 72 50 96" stroke="${Be}" stroke-width="2" fill="none"/><ellipse cx="36" cy="32" rx="18" ry="22" fill="#ff8fab" ${P}/><ellipse cx="66" cy="28" rx="18" ry="22" fill="#a2d2ff" ${P}/><ellipse cx="30" cy="24" rx="4" ry="7" fill="#fff" opacity=".6"/>`},{kind:"teddy",name:"Teddy",cat:"decor",w:100,svg:`${Ce}<circle cx="26" cy="22" r="10" fill="#d4a373" ${P}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${P}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${P}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${P}/>${Ro(40,60,36)}<ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/><circle cx="50" cy="46" r="2.5" fill="${Be}"/>${sr(32,68,46)}`},{kind:"ball",name:"Ball",cat:"decor",w:70,svg:`${Ce}<circle cx="50" cy="58" r="36" fill="#ffd166" ${P}/><path d="M18 46 Q50 66 82 46 M26 82 Q50 60 74 82" stroke="#ff7096" stroke-width="7" fill="none"/>`},{kind:"tv",name:"TV",cat:"decor",w:170,svg:`${Ce}<rect x="6" y="14" width="88" height="62" rx="14" fill="#c9a0dc" ${P}/><rect x="16" y="22" width="68" height="46" rx="8" fill="#a2d2ff"/><path d="M30 6 L44 14 M70 6 L56 14" ${P}/><rect x="36" y="78" width="28" height="16" rx="4" fill="#b388d6" ${P}/>${Ro(42,58,42)}<path d="M44 52 q6 5 12 0" ${P} fill="none"/>`},{kind:"plant",name:"Plant",cat:"plants",w:110,svg:`${Ce}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${P} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${P} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${P}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${P}/><rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${P}/>`},{kind:"cactus",name:"Cactus",cat:"plants",w:80,svg:`${Ce}<rect x="36" y="12" width="28" height="64" rx="14" fill="#80ed99" ${P}/><path d="M36 50 H24 a8 8 0 0 1 -8 -8 V34" fill="none" stroke="${Be}" stroke-width="3.5"/><rect x="12" y="26" width="12" height="22" rx="6" fill="#80ed99" ${P}/><circle cx="50" cy="12" r="6" fill="#ff8fab" ${P}/>${Ro(44,56,40)}<path d="M28 74 H72 L66 96 H34 Z" fill="#c9a0dc" ${P}/>`},{kind:"flowers",name:"Flowers",cat:"plants",w:90,svg:`${Ce}<path d="M50 70 V30 M50 60 Q30 50 30 30 M50 60 Q70 50 70 30" stroke="#52b788" stroke-width="4" fill="none"/><circle cx="50" cy="26" r="10" fill="#ff8fab" ${P}/><circle cx="30" cy="28" r="9" fill="#ffd166" ${P}/><circle cx="70" cy="28" r="9" fill="#a2d2ff" ${P}/><circle cx="50" cy="26" r="3" fill="#fff"/><path d="M32 66 H68 L62 96 H38 Z" fill="#a2d2ff" ${P}/>`},{kind:"tree",name:"Mini Tree",cat:"plants",w:140,svg:`${Ce}<rect x="44" y="54" width="12" height="30" rx="4" fill="#b07d54" ${P}/><circle cx="50" cy="36" r="30" fill="#52b788" ${P}/><circle cx="38" cy="30" r="5" fill="#ff8fab"/><circle cx="62" cy="40" r="5" fill="#ff8fab"/><circle cx="52" cy="22" r="5" fill="#ff8fab"/><path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${P}/>`},{kind:"cake",name:"Cake",cat:"food",w:100,svg:`<rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${P}/><path d="M16 58 q8 10 17 0 q8 10 17 0 q8 10 17 0 q8 10 17 0" fill="#fff" ${P}/><rect x="46" y="28" width="8" height="22" rx="3" fill="#a2d2ff" ${P}/><path d="M50 14 q6 8 0 12 q-6 -4 0 -12" fill="#ffd166" ${P}/><ellipse cx="50" cy="92" rx="40" ry="5" fill="#fff" ${P}/>`},{kind:"apple",name:"Apple",cat:"food",w:60,svg:`<path d="M50 30 C20 18 8 50 22 74 C32 92 44 90 50 86 C56 90 68 92 78 74 C92 50 80 18 50 30 Z" fill="#ff6b6b" ${P}/><path d="M50 30 Q52 16 58 10" ${P} fill="none"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#80ed99" ${P} transform="rotate(-20 64 18)"/><ellipse cx="34" cy="46" rx="5" ry="9" fill="#fff" opacity=".5"/>`},{kind:"donut",name:"Donut",cat:"food",w:70,svg:`<circle cx="50" cy="58" r="36" fill="#e9c46a" ${P}/><path d="M18 52 Q20 26 50 24 Q80 26 82 52 Q76 62 66 56 Q56 66 46 58 Q34 66 24 58 Z" fill="#ff8fab" ${P}/><circle cx="50" cy="52" r="10" fill="#fff" ${P}/><rect x="30" y="36" width="6" height="3" rx="1.5" fill="#a2d2ff" transform="rotate(30 33 37)"/><rect x="64" y="38" width="6" height="3" rx="1.5" fill="#ffd166"/><rect x="56" y="30" width="6" height="3" rx="1.5" fill="#80ed99" transform="rotate(-30 59 31)"/>`},{kind:"pizza",name:"Pizza",cat:"food",w:80,svg:`<path d="M10 20 Q50 6 90 20 L50 94 Z" fill="#ffd166" ${P}/><path d="M10 20 Q50 6 90 20 L86 28 Q50 16 14 28 Z" fill="#e9a96a" ${P}/><circle cx="42" cy="38" r="7" fill="#ff6b6b" ${P}/><circle cx="62" cy="44" r="6" fill="#ff6b6b" ${P}/><circle cx="50" cy="62" r="6" fill="#ff6b6b" ${P}/>`},{kind:"juice",name:"Juice",cat:"food",w:55,svg:`<path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${P}/><path d="M27 44 H73 L70 92 H30 Z" fill="#ffb347"/><path d="M24 26 H76 L70 92 H30 Z" fill="none" ${P}/><path d="M58 30 L66 4" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="60" r="4" fill="#fff" opacity=".6"/>`},{kind:"cat",name:"Toy cat",cat:"pets",w:110,svg:`${Ce}<path d="M78 80 Q98 70 90 50" stroke="#ffb347" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="30" ry="20" fill="#ffb347" ${P}/><path d="M22 30 L26 8 L40 22 M78 30 L74 8 L60 22" fill="#ffb347" ${P}/><circle cx="50" cy="42" r="28" fill="#ffc46b" ${P}/>${Ro(40,60,40)}<path d="M46 50 q4 4 8 0" ${P} fill="none"/>${sr(32,68,50)}`},{kind:"dog",name:"Puppy",cat:"pets",w:120,svg:`${Ce}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#f5ebe0" ${P}/><circle cx="50" cy="42" r="28" fill="#fff" ${P}/><ellipse cx="22" cy="44" rx="10" ry="18" fill="#b07d54" ${P}/><ellipse cx="78" cy="44" rx="10" ry="18" fill="#b07d54" ${P}/><circle cx="60" cy="34" r="8" fill="#e6b88a" opacity=".7"/>${Ro(40,60,40)}<ellipse cx="50" cy="52" rx="5" ry="4" fill="${Be}"/><path d="M50 56 v6" ${P}/>`},{kind:"bunny",name:"Bunny",cat:"pets",w:90,svg:`${Ce}<ellipse cx="36" cy="22" rx="8" ry="20" fill="#fff" ${P}/><ellipse cx="64" cy="22" rx="8" ry="20" fill="#fff" ${P}/><ellipse cx="36" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="64" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="50" cy="76" rx="28" ry="20" fill="#fff" ${P}/><circle cx="50" cy="52" r="22" fill="#fff" ${P}/>${Ro(42,58,50)}<path d="M47 58 l3 3 3 -3" ${P} fill="none"/>${sr(36,64,58)}`},{kind:"fish",name:"Fish Bowl",cat:"pets",w:100,svg:`${Ce}<circle cx="50" cy="54" r="40" fill="#cdeffd" ${P}/><path d="M14 46 H86" stroke="#8ecae6" stroke-width="3"/><path d="M60 64 l14 -8 v16 z" fill="#ff9f68" ${P}/><ellipse cx="46" cy="64" rx="16" ry="11" fill="#ffb347" ${P}/><circle cx="40" cy="62" r="2.5" fill="${Be}"/><circle cx="32" cy="38" r="3" fill="#fff" opacity=".8"/><rect x="24" y="10" width="52" height="8" rx="4" fill="#cdeffd" ${P}/>`},{kind:"kennel",name:"Dog Kennel",cat:"pets",w:210,h:175,holdable:!1,vb:"0 0 120 100",svg:`<ellipse cx="60" cy="97" rx="48" ry="3.2" fill="#000" opacity=".12"/><path d="M14 50 L60 12 L106 50 Z" fill="#ff8fab" ${P}/><path d="M28 46 L60 22 L92 46 Z" fill="#ffd6e4"/><rect x="20" y="46" width="80" height="50" rx="10" fill="#fff6ea" ${P}/><path d="M20 56 H100" stroke="#ffc2d4" stroke-width="7"/><path d="M34 96 V58 Q60 36 86 58 V96 Z" fill="#f3e4ff" ${P}/><path d="M40 96 V64 Q60 46 80 64 V96 Z" fill="#ffe8c7"/><circle cx="86" cy="64" r="8" fill="#bde0fe" ${P}/><circle cx="84" cy="62" r="2.2" fill="#fff" opacity=".9"/><path d="M28 62 l2.4 2.4 2.4-2.4 2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4z" fill="#ff8fab" ${P}/><circle cx="30" cy="90" r="3.2" fill="#fff" ${P}/><rect x="32" y="88.4" width="14" height="3.4" rx="1.7" fill="#fff" ${P}/><circle cx="48" cy="90" r="3.2" fill="#fff" ${P}/>`},{kind:"cat-tower",name:"Cat Tower",cat:"pets",w:150,h:225,holdable:!1,vb:"0 0 100 150",svg:`<ellipse cx="50" cy="146" rx="36" ry="3.4" fill="#000" opacity=".12"/><rect x="44" y="30" width="12" height="104" rx="6" fill="#c9a0dc" ${P}/><ellipse cx="50" cy="136" rx="34" ry="10" fill="#ffc8dd" ${P}/><ellipse cx="50" cy="132" rx="26" ry="6" fill="#fff6ea"/><ellipse cx="50" cy="102" rx="30" ry="8" fill="#bde0fe" ${P}/><ellipse cx="50" cy="98" rx="22" ry="4" fill="#fff" opacity=".8"/><ellipse cx="50" cy="64" rx="28" ry="8" fill="#ffd166" ${P}/><ellipse cx="50" cy="60" rx="20" ry="4" fill="#fff6d0"/><circle cx="50" cy="22" r="8" fill="#ff8fab" ${P}/><circle cx="47" cy="19" r="2.2" fill="#fff" opacity=".75"/><g class="dangle"><circle cx="22" cy="126" r="8" fill="#ffb3c6" ${P}/><path d="M22 126 q12 5 7 16" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/></g><circle cx="80" cy="92" r="3.4" fill="#ffd166" ${P}/>`},{kind:"vanity",name:"Vanity",cat:"furniture",w:230,svg:`${Ce}<ellipse cx="50" cy="26" rx="24" ry="22" fill="#fff" ${P}/><ellipse cx="50" cy="26" rx="18" ry="16" fill="#cdeffd"/><path d="M38 18 l6 -6 M42 26 l10 -10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="12" r="3" fill="#ffd166" ${P}/><circle cx="74" cy="12" r="3" fill="#ffd166" ${P}/><rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${P}/><rect x="10" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${P}/><rect x="62" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${P}/><circle cx="24" cy="75" r="3" fill="${Be}"/><circle cx="76" cy="75" r="3" fill="${Be}"/><rect x="12" y="90" width="6" height="7" rx="2" fill="${Be}"/><rect x="82" y="90" width="6" height="7" rx="2" fill="${Be}"/>`},{kind:"stool",name:"Vanity Stool",cat:"furniture",w:90,svg:`${Ce}<ellipse cx="50" cy="48" rx="34" ry="14" fill="#c9a0dc" ${P}/><ellipse cx="50" cy="44" rx="28" ry="9" fill="#e4ccf2"/><path d="M28 58 L22 94 M72 58 L78 94 M50 62 V94" ${P}/><ellipse cx="50" cy="78" rx="22" ry="4" fill="none" ${P}/>`},{kind:"perfume",name:"Perfume",cat:"decor",w:50,svg:`<rect x="40" y="8" width="20" height="14" rx="5" fill="#ffd166" ${P}/><rect x="46" y="20" width="8" height="10" fill="#fff" ${P}/><path d="M20 50 Q20 30 50 30 Q80 30 80 50 V80 Q80 94 66 94 H34 Q20 94 20 80 Z" fill="#ff8fab" ${P}/><ellipse cx="36" cy="52" rx="5" ry="10" fill="#fff" opacity=".6"/><path d="M50 56 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#fff" opacity=".8"/>`},{kind:"polish",name:"Nail Polish",cat:"decor",w:40,svg:`<rect x="38" y="4" width="24" height="40" rx="8" fill="${Be}"/><path d="M24 54 Q24 42 36 42 H64 Q76 42 76 54 V84 Q76 96 64 96 H36 Q24 96 24 84 Z" fill="#b388d6" ${P}/><ellipse cx="38" cy="62" rx="5" ry="12" fill="#fff" opacity=".55"/>`},{kind:"hairdryer",name:"Hair Dryer",cat:"decor",w:90,svg:`<path d="M60 52 L70 92 Q70 96 64 96 H58 Q52 96 52 90 L46 56 Z" fill="#a2d2ff" ${P}/><rect x="6" y="20" width="62" height="40" rx="20" fill="#bde0fe" ${P}/><ellipse cx="82" cy="40" rx="12" ry="20" fill="#ffc8dd" ${P}/><ellipse cx="82" cy="40" rx="6" ry="11" fill="#fff" ${P}/><circle cx="24" cy="40" r="7" fill="#fff" opacity=".7"/>`},{kind:"mirror",name:"Mirror",cat:"decor",w:120,wall:!0,svg:`<path d="M50 6 C74 6 88 24 88 50 C88 76 72 94 50 94 C28 94 12 76 12 50 C12 24 26 6 50 6 Z" fill="#ffd166" ${P}/><ellipse cx="50" cy="50" rx="30" ry="36" fill="#e0f4ff" ${P}/><path d="M36 34 l10 -10 M36 46 l20 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ff8fab" ${P}/>`}],Ds={sofa:["living"],armchair:["living"],lamp:["living","bedroom"],tv:["living"],rug:["living","bedroom"],picture:["living","bedroom"],bookshelf:["living","bedroom"],bed:["bedroom"],teddy:["bedroom"],stars:["bedroom"],tub:["bedroom"],balloon:["any"],clock:["any"],window:["any"],ball:["any"],vanity:["salon"],stool:["salon"],perfume:["salon"],polish:["salon"],hairdryer:["salon"],mirror:["salon","bedroom"],fridge:["kitchen"],stove:["kitchen"],table:["kitchen","living"],chair:["kitchen","living"]};for(const e of qg)Ds[e.kind]=["nursery"];for(const e of Ra)Ds[e.kind]=["backyard"];for(const e of Gg)Ds[e.kind]=["bathroom"];Ds["floor-cushion"]=["living"];Ds["story-pillow"]=["bedroom"];Ds["berry-basket"]=["kitchen"];Ds["ribbon-tray"]=["salon"];Sn.push(...qg,...Ra,...Gg,...bM);for(const e of Sn)e.rooms=Ds[e.kind]??(["food"].includes(e.cat)?["kitchen"]:["any"]);const wM=new Set(["rug","tv","tree"]);for(const e of Sn)e.holdable??=!e.wall&&e.cat!=="furniture"&&e.w<=150&&!wM.has(e.kind);const kM=[{kind:"ranch-egg",name:"Fresh Egg",cat:"ranch",w:50,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M50 30 C70 30 80 62 80 74 C80 90 66 96 50 96 C34 96 20 90 20 74 C20 62 30 30 50 30 Z" fill="#fff6e6" ${P}/><ellipse cx="40" cy="52" rx="6" ry="9" fill="#fff"/>`},{kind:"ranch-carrot",name:"Garden Carrot",cat:"ranch",w:70,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M30 40 L78 34 L40 96 Z" fill="#ff922b" ${P}/><path d="M44 50 l10 -2 M42 64 l8 -2 M44 78 l6 -1" ${P}/><path d="M72 36 Q80 14 92 14 M72 36 Q68 14 76 4 M72 36 Q90 30 96 36" fill="none" stroke="#40c057" stroke-width="7" stroke-linecap="round"/>`},{kind:"ranch-bouquet",name:"Ranch Flowers",cat:"ranch",w:80,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M50 94 L40 50 M50 94 L50 44 M50 94 L62 50" stroke="#40c057" stroke-width="5" stroke-linecap="round"/><path d="M36 78 L64 78 L56 96 L44 96 Z" fill="#c9a0dc" ${P}/>${[[38,40,"#ff8fab"],[50,30,"#ffd43b"],[64,40,"#74c0fc"],[44,52,"#ff922b"],[58,52,"#c9a0dc"]].map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="9" fill="${n}" ${P}/><circle cx="${e}" cy="${t}" r="3" fill="#fff3b0"/>`).join("")}`}];Sn.push(...L5,...A4,...kM);const le=Object.fromEntries(Sn.map(e=>[e.kind,e])),Gi=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),Je=e=>e.h??e.w,eh=e=>e.img?`<img class="packimg" src="${Gi(e.img)}" alt="${Gi(e.name)}" draggable="false" />`:`<svg viewBox="${e.vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${e.svg}</svg>`,Nt=(e,t=!1)=>{const n=Xn()?Jn(e.kind):void 0;if(!n)return eh(e);const s=t&&!e.wall?'<i class="artshade" aria-hidden="true"></i>':"",o=e.kind==="window"?'<i class="artnight" aria-hidden="true"></i>':"";return`${s}${o}<img class="packimg artimg" data-kind="${Gi(e.kind)}" src="${Gi(n)}" alt="${Gi(e.name)}" draggable="false" />`},vM='<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="22" width="56" height="56" rx="14" fill="#fff6ea" stroke="#5a3d5c" stroke-width="4"/></svg>',_M=(e,t)=>e.img&&/\.webp(?:$|\?)/i.test(e.img)?vM:eh(e);let Ku=!1;const $M='<svg class="imgmiss" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="20" y="20" width="60" height="60" rx="16" fill="#fff6ea" stroke="#5a3d5c" stroke-width="4" stroke-dasharray="9 7" opacity=".55"/></svg>',xM=e=>new Promise((t,n)=>{const s=new Image;s.onload=()=>t(),s.onerror=()=>n(new Error("image failed")),s.src=e});function MM(e,t,n,s){const[o,...i]=Ts;new Promise(a=>setTimeout(a,o)).then(()=>xg(()=>xM(n),i)).then(()=>{if(!e.isConnected||!Xn()||Jn(t.kind)!==n)return;const a=document.createElement("div");a.innerHTML=Nt(t,s),e.replaceWith(...Array.from(a.childNodes))},()=>{})}function LM(){Ku||typeof window>"u"||(Ku=!0,document.addEventListener("load",e=>{const t=e.target;t instanceof HTMLImageElement&&t.classList.contains("imgwait")&&t.classList.remove("imgwait")},!0),window.addEventListener("error",e=>{const t=e.target;if(!(t instanceof HTMLImageElement)||t.dataset.fell==="1")return;if(t.classList.contains("artimg")){const o=le[t.dataset.kind||""];if(!o)return;t.dataset.fell="1";const i=t.getAttribute("src")||"",a=!!t.parentElement?.querySelector(".artshade");t.parentElement?.querySelector(".artshade")?.remove(),t.parentElement?.querySelector(".artnight")?.remove();const r=document.createElement("div");r.innerHTML=eh(o);const l=r.firstElementChild;l&&(t.replaceWith(l),i&&MM(l,o,i,a));return}if(!t.classList.contains("packimg"))return;if(Gv(t)){t.classList.add("imgwait");return}t.dataset.fell="1";const n=document.createElement("div");n.innerHTML=$M;const s=n.firstElementChild;s&&t.replaceWith(s)},!0))}const Yg="/kids-house-game/assets/cat-calico-nap-YtfdpbDg.webp",EM=Object.freeze(Object.defineProperty({__proto__:null,default:Yg},Symbol.toStringTag,{value:"Module"})),Kg="/kids-house-game/assets/cat-calico-sit-D1667wmu.webp",SM=Object.freeze(Object.defineProperty({__proto__:null,default:Kg},Symbol.toStringTag,{value:"Module"})),Xg="/kids-house-game/assets/cat-calico-stand-3uEzEb3G.webp",TM=Object.freeze(Object.defineProperty({__proto__:null,default:Xg},Symbol.toStringTag,{value:"Module"})),Jg="/kids-house-game/assets/cat-smokey-nap-lOaTkxI0.webp",PM=Object.freeze(Object.defineProperty({__proto__:null,default:Jg},Symbol.toStringTag,{value:"Module"})),em="/kids-house-game/assets/cat-smokey-sit-_C3gdGqG.webp",AM=Object.freeze(Object.defineProperty({__proto__:null,default:em},Symbol.toStringTag,{value:"Module"})),tm="/kids-house-game/assets/cat-smokey-stand-Cdf8P9_H.webp",RM=Object.freeze(Object.defineProperty({__proto__:null,default:tm},Symbol.toStringTag,{value:"Module"})),nm="/kids-house-game/assets/cat-tabby-nap-B93Gst5Y.webp",CM=Object.freeze(Object.defineProperty({__proto__:null,default:nm},Symbol.toStringTag,{value:"Module"})),sm="/kids-house-game/assets/cat-tabby-sit-Ww7lKHQz.webp",IM=Object.freeze(Object.defineProperty({__proto__:null,default:sm},Symbol.toStringTag,{value:"Module"})),om="/kids-house-game/assets/cat-tabby-stand-DRgSjSXE.webp",BM=Object.freeze(Object.defineProperty({__proto__:null,default:om},Symbol.toStringTag,{value:"Module"})),im="/kids-house-game/assets/cat-tuxedo-nap-BVE8WH2l.webp",OM=Object.freeze(Object.defineProperty({__proto__:null,default:im},Symbol.toStringTag,{value:"Module"})),am="/kids-house-game/assets/cat-tuxedo-sit-CDRf8L3Y.webp",DM=Object.freeze(Object.defineProperty({__proto__:null,default:am},Symbol.toStringTag,{value:"Module"})),rm="/kids-house-game/assets/cat-tuxedo-stand-D1hHQgPJ.webp",HM=Object.freeze(Object.defineProperty({__proto__:null,default:rm},Symbol.toStringTag,{value:"Module"})),lm="/kids-house-game/assets/dog-dachshund-sit-CSdaeXeM.webp",WM=Object.freeze(Object.defineProperty({__proto__:null,default:lm},Symbol.toStringTag,{value:"Module"})),cm="/kids-house-game/assets/dog-dachshund-sleep-D51MuT-5.webp",VM=Object.freeze(Object.defineProperty({__proto__:null,default:cm},Symbol.toStringTag,{value:"Module"})),dm="/kids-house-game/assets/dog-dachshund-stand-CTaAEwG4.webp",UM=Object.freeze(Object.defineProperty({__proto__:null,default:dm},Symbol.toStringTag,{value:"Module"})),fm="/kids-house-game/assets/dog-golden-sit-DFrpj82v.webp",zM=Object.freeze(Object.defineProperty({__proto__:null,default:fm},Symbol.toStringTag,{value:"Module"})),hm="/kids-house-game/assets/dog-golden-sleep-CNdabQUH.webp",QM=Object.freeze(Object.defineProperty({__proto__:null,default:hm},Symbol.toStringTag,{value:"Module"})),um="/kids-house-game/assets/dog-golden-stand-4x9IvGBb.webp",NM=Object.freeze(Object.defineProperty({__proto__:null,default:um},Symbol.toStringTag,{value:"Module"})),pm="/kids-house-game/assets/dog-poodle-sit-C6jNzYen.webp",qM=Object.freeze(Object.defineProperty({__proto__:null,default:pm},Symbol.toStringTag,{value:"Module"})),gm="/kids-house-game/assets/dog-poodle-sleep-BQs2iX06.webp",FM=Object.freeze(Object.defineProperty({__proto__:null,default:gm},Symbol.toStringTag,{value:"Module"})),mm="/kids-house-game/assets/dog-poodle-stand-CLU8S245.webp",jM=Object.freeze(Object.defineProperty({__proto__:null,default:mm},Symbol.toStringTag,{value:"Module"})),ym="/kids-house-game/assets/dog-pup-sit-Mv9ktTAi.webp",ZM=Object.freeze(Object.defineProperty({__proto__:null,default:ym},Symbol.toStringTag,{value:"Module"})),bm="/kids-house-game/assets/dog-pup-sleep-M8R5iFqC.webp",GM=Object.freeze(Object.defineProperty({__proto__:null,default:bm},Symbol.toStringTag,{value:"Module"})),wm="/kids-house-game/assets/dog-pup-stand-0TcMABgh.webp",YM=Object.freeze(Object.defineProperty({__proto__:null,default:wm},Symbol.toStringTag,{value:"Module"})),km="/kids-house-game/assets/dog-spotty-sit-ogWfm1-x.webp",KM=Object.freeze(Object.defineProperty({__proto__:null,default:km},Symbol.toStringTag,{value:"Module"})),vm="/kids-house-game/assets/dog-spotty-sleep-d8a6Ckq3.webp",XM=Object.freeze(Object.defineProperty({__proto__:null,default:vm},Symbol.toStringTag,{value:"Module"})),_m="/kids-house-game/assets/dog-spotty-stand-BR88_RXw.webp",JM=Object.freeze(Object.defineProperty({__proto__:null,default:_m},Symbol.toStringTag,{value:"Module"})),$m="/kids-house-game/assets/animal-bunny-C8IjPVne.webp",eL=Object.freeze(Object.defineProperty({__proto__:null,default:$m},Symbol.toStringTag,{value:"Module"})),xm="/kids-house-game/assets/animal-cow-BNE4y3fn.webp",tL=Object.freeze(Object.defineProperty({__proto__:null,default:xm},Symbol.toStringTag,{value:"Module"})),Mm="/kids-house-game/assets/animal-goat-BEXFo23D.webp",nL=Object.freeze(Object.defineProperty({__proto__:null,default:Mm},Symbol.toStringTag,{value:"Module"})),Lm="/kids-house-game/assets/animal-piglet-CITF8sJ9.webp",sL=Object.freeze(Object.defineProperty({__proto__:null,default:Lm},Symbol.toStringTag,{value:"Module"})),Em="/kids-house-game/assets/animal-sheep-DxcQ96U2.webp",oL=Object.freeze(Object.defineProperty({__proto__:null,default:Em},Symbol.toStringTag,{value:"Module"})),Sm="/kids-house-game/assets/apple-tree-ztWRqXgk.webp",iL=Object.freeze(Object.defineProperty({__proto__:null,default:Sm},Symbol.toStringTag,{value:"Module"})),Tm="/kids-house-game/assets/basket-D0ZYb-9_.webp",aL=Object.freeze(Object.defineProperty({__proto__:null,default:Tm},Symbol.toStringTag,{value:"Module"})),Pm="/kids-house-game/assets/hen-house-BMb6vLOg.webp",rL=Object.freeze(Object.defineProperty({__proto__:null,default:Pm},Symbol.toStringTag,{value:"Module"})),Am="/kids-house-game/assets/horse-chestnut-bare-ClpQBHmC.webp",lL=Object.freeze(Object.defineProperty({__proto__:null,default:Am},Symbol.toStringTag,{value:"Module"})),Rm="/kids-house-game/assets/horse-chestnut-saddle-DjGl6zGL.webp",cL=Object.freeze(Object.defineProperty({__proto__:null,default:Rm},Symbol.toStringTag,{value:"Module"})),Cm="/kids-house-game/assets/horse-midnight-bare-CN96wJg8.webp",dL=Object.freeze(Object.defineProperty({__proto__:null,default:Cm},Symbol.toStringTag,{value:"Module"})),Im="/kids-house-game/assets/horse-midnight-saddle-Zoz0ZHm8.webp",fL=Object.freeze(Object.defineProperty({__proto__:null,default:Im},Symbol.toStringTag,{value:"Module"})),Bm="/kids-house-game/assets/horse-rainbow-bare-oUM2b_lJ.webp",hL=Object.freeze(Object.defineProperty({__proto__:null,default:Bm},Symbol.toStringTag,{value:"Module"})),Om="/kids-house-game/assets/horse-rainbow-saddle-B6LiByBH.webp",uL=Object.freeze(Object.defineProperty({__proto__:null,default:Om},Symbol.toStringTag,{value:"Module"})),Dm="/kids-house-game/assets/horse-snowy-bare-DvYLjfaE.webp",pL=Object.freeze(Object.defineProperty({__proto__:null,default:Dm},Symbol.toStringTag,{value:"Module"})),Hm="/kids-house-game/assets/horse-snowy-saddle-K4Sm_Hpq.webp",gL=Object.freeze(Object.defineProperty({__proto__:null,default:Hm},Symbol.toStringTag,{value:"Module"})),Wm="/kids-house-game/assets/horse-sunny-bare-zPTIKgZH.webp",mL=Object.freeze(Object.defineProperty({__proto__:null,default:Wm},Symbol.toStringTag,{value:"Module"})),Vm="/kids-house-game/assets/horse-sunny-saddle-M4nhkGvO.webp",yL=Object.freeze(Object.defineProperty({__proto__:null,default:Vm},Symbol.toStringTag,{value:"Module"})),Um="/kids-house-game/assets/tractor-DSDXT0Gz.webp",bL=Object.freeze(Object.defineProperty({__proto__:null,default:Um},Symbol.toStringTag,{value:"Module"})),wL={"cat-calico-stand":[1.018,1.009],"cat-smokey-sit":[1.063,1.063],"cat-smokey-stand":[1.032,1.009],"cat-tabby-stand":[1.027,1.009]},kL=wL;function zm(e){const t=kL[e];return t?` style="--fx:${t[0]};--fy:${t[1]}"`:""}const vL=Object.assign({"../../assets/art/pets/cat-calico-nap.webp":Yg,"../../assets/art/pets/cat-calico-sit.webp":Kg,"../../assets/art/pets/cat-calico-stand.webp":Xg,"../../assets/art/pets/cat-smokey-nap.webp":Jg,"../../assets/art/pets/cat-smokey-sit.webp":em,"../../assets/art/pets/cat-smokey-stand.webp":tm,"../../assets/art/pets/cat-tabby-nap.webp":nm,"../../assets/art/pets/cat-tabby-sit.webp":sm,"../../assets/art/pets/cat-tabby-stand.webp":om,"../../assets/art/pets/cat-tuxedo-nap.webp":im,"../../assets/art/pets/cat-tuxedo-sit.webp":am,"../../assets/art/pets/cat-tuxedo-stand.webp":rm,"../../assets/art/pets/dog-dachshund-sit.webp":lm,"../../assets/art/pets/dog-dachshund-sleep.webp":cm,"../../assets/art/pets/dog-dachshund-stand.webp":dm,"../../assets/art/pets/dog-golden-sit.webp":fm,"../../assets/art/pets/dog-golden-sleep.webp":hm,"../../assets/art/pets/dog-golden-stand.webp":um,"../../assets/art/pets/dog-poodle-sit.webp":pm,"../../assets/art/pets/dog-poodle-sleep.webp":gm,"../../assets/art/pets/dog-poodle-stand.webp":mm,"../../assets/art/pets/dog-pup-sit.webp":ym,"../../assets/art/pets/dog-pup-sleep.webp":bm,"../../assets/art/pets/dog-pup-stand.webp":wm,"../../assets/art/pets/dog-spotty-sit.webp":km,"../../assets/art/pets/dog-spotty-sleep.webp":vm,"../../assets/art/pets/dog-spotty-stand.webp":_m}),_L=Object.assign({"../../assets/art/ranch/animal-bunny.webp":$m,"../../assets/art/ranch/animal-cow.webp":xm,"../../assets/art/ranch/animal-goat.webp":Mm,"../../assets/art/ranch/animal-piglet.webp":Lm,"../../assets/art/ranch/animal-sheep.webp":Em,"../../assets/art/ranch/apple-tree.webp":Sm,"../../assets/art/ranch/basket.webp":Tm,"../../assets/art/ranch/hen-house.webp":Pm,"../../assets/art/ranch/horse-chestnut-bare.webp":Am,"../../assets/art/ranch/horse-chestnut-saddle.webp":Rm,"../../assets/art/ranch/horse-midnight-bare.webp":Cm,"../../assets/art/ranch/horse-midnight-saddle.webp":Im,"../../assets/art/ranch/horse-rainbow-bare.webp":Bm,"../../assets/art/ranch/horse-rainbow-saddle.webp":Om,"../../assets/art/ranch/horse-snowy-bare.webp":Dm,"../../assets/art/ranch/horse-snowy-saddle.webp":Hm,"../../assets/art/ranch/horse-sunny-bare.webp":Wm,"../../assets/art/ranch/horse-sunny-saddle.webp":Vm,"../../assets/art/ranch/tractor.webp":Um}),th=new Map;for(const[e,t]of Object.entries(vL)){const n=e.split("/").pop().replace(/\.webp$/i,"");th.set(n,t)}for(const[e,t]of Object.entries(_L)){const n=e.split("/").pop().replace(/\.webp$/i,"");th.set(n,t)}const Xu=["tabby","smokey","tuxedo","calico"],Ju=["pup","poodle","dachshund","golden","spotty"],ep=["goat","sheep","piglet","chicks","bunny","cow"],$L=new Set(["chicks"]),tp=["chestnut","snowy","midnight","sunny","rainbow"];function Ca(e){return Ff()?th.get(e)??null:null}function Ia(e,t="artimg sprite",n=""){return`<img class="${t}" alt="" draggable="false"${n} src="${e}">`}function ei(e,t,n){const o=`cat-${Xu[e]??Xu[0]}-${t}`,i=Ca(o);return i?Ia(i,"artimg sprite petsprite",zm(o)):n}function ga(e,t,n){const o=`dog-${Ju[e]??Ju[0]}-${t}`,i=Ca(o);return i?Ia(i,"artimg sprite petsprite",zm(o)):n}function Bd(e,t){const n=ep[e]??ep[0];if($L.has(n))return t;const s=Ca(`animal-${n}`);return s?Ia(s,"artimg sprite ranchsprite"):t}function nh(e,t,n){const s=tp[e]??tp[0],o=Ca(`horse-${s}-${t?"saddle":"bare"}`);return o?Ia(o,"artimg sprite ranchsprite horsesprite"):n}function Yi(e,t){const n=Ca(e);return n?Ia(n,"artimg sprite ranchsprite"):t}const np=new WeakMap;function xL(e){const t=np.get(e);if(t)return t;if(!e.complete||!e.naturalWidth)return null;const n=document.createElement("canvas");n.width=e.naturalWidth,n.height=e.naturalHeight;const s=n.getContext("2d",{willReadFrequently:!0});if(!s)return null;try{s.drawImage(e,0,0)}catch{return null}const o=s.getImageData(0,0,n.width,n.height).data;return np.set(e,o),o}function ML(e,t,n){const s=e.getBoundingClientRect();if(s.width<1||s.height<1||!e.naturalWidth)return null;let o=(t-s.left)/s.width;const i=(n-s.top)/s.height;e.closest(".flipped")&&(o=1-o);const a=e.naturalWidth,r=e.naturalHeight,l=Math.min(s.width/a,s.height/r),c=a*l,d=r*l,f=(s.width-c)*.5,u=s.height-d,p=(o*s.width-f)/l,m=(i*s.height-u)/l;return p<0||m<0||p>=a||m>=r?null:{x:p,y:m}}function sh(e,t,n){const s=xL(e),o=s&&ML(e,t,n);if(!s||!o)return!s;const i=Math.floor(o.x),r=(Math.floor(o.y)*e.naturalWidth+i)*4+3;return s[r]>24}function LL(e,t){const n=[];try{for(let s=0;s<12;s++){const o=document.elementFromPoint(e,t);if(!o)return null;const i=o.closest("img.artimg");if(i&&!sh(i,e,t)){n.push(i),i.style.pointerEvents="none";continue}return o}return null}finally{for(let s=0;s<n.length;s++)n[s].style.pointerEvents=""}}const EL="var(--line)",SL=1.4,mt='fill="#3a1d3c" opacity=".14"',Od='fill="#3a1d3c" opacity=".22"',Yt={l:[72,172],r:[128,172]},_n={l:[50,233],r:[150,233]},TL={l:[88,238],r:[112,238]};function D(e=3){return`stroke="${EL}" stroke-width="${(e*SL).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"`}function S(e){const n=(Math.round(e*10)/10).toFixed(1);return n.endsWith(".0")?n.slice(0,-2):n}function Dd(e,t,n,s,o){const i=o*Math.PI/180,a=e-n,r=t-s,l=Math.cos(i),c=Math.sin(i);return{x:n+a*l-r*c,y:s+a*c+r*l}}function Ki(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=(n>>16&255)*(1-t),i=(n>>8&255)*(1-t),a=(n&255)*(1-t);return"#"+s(o)+s(i)+s(a)}function sp(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=n>>16&255,i=n>>8&255,a=n&255;return"#"+s(o+(255-o)*t)+s(i+(255-i)*t)+s(a+(255-a)*t)}function Hd(e,t,n,s,o=0){const i=e[0],a=e[1],r=e[0]===t[0]&&e[1]===t[1]?t[0]+.01:t[0],l=t[1],c=r-i,d=l-a,f=Math.hypot(c,d)||1,u=-d/f,p=c/f,m=(i+r)/2+u*o,k=(a+l)/2+p*o,w=n/2,b=s/2,g=(w+b)/2*1.04,y=[i+u*w,a+p*w],_=[r+u*b,l+p*b],T=[r-u*b,l-p*b],x=[i-u*w,a-p*w];return`M${S(y[0])} ${S(y[1])} Q${S(m+u*g)} ${S(k+p*g)} ${S(_[0])} ${S(_[1])} A${S(b)} ${S(b)} 0 0 1 ${S(T[0])} ${S(T[1])} Q${S(m-u*g)} ${S(k-p*g)} ${S(x[0])} ${S(x[1])} A${S(w)} ${S(w)} 0 0 1 ${S(y[0])} ${S(y[1])} Z`}function Zl(e,t,n,s,o){const i=[],a=(t-e)/s;for(let r=0;r<s;r++){const l=e+r*a,c=l+a;i.push(`Q${S((l+c)/2)} ${S(n+o)} ${S(c)} ${S(n)}`)}return i.join(" ")}function Wd(e,t,n,s,o,i=0){const a=[];for(let r=0;r<s;r++){const l=i+2*Math.PI*r/s,c=i+2*Math.PI*(r+1)/s,d=(l+c)/2,f=e+n*Math.cos(l),u=t+n*Math.sin(l),p=e+n*Math.cos(c),m=t+n*Math.sin(c),k=e+(n+o)*Math.cos(d),w=t+(n+o)*Math.sin(d);r===0&&a.push(`M${S(f)} ${S(u)}`),a.push(`Q${S(k)} ${S(w)} ${S(p)} ${S(m)}`)}return a.join(" ")+" Z"}function Ps(e,t,n,s){const o=e==="arm"?Yt[t]:TL[t],i=e==="arm"?t==="l"?s.armL:s.armR:t==="l"?s.legL:s.legR,a=e==="leg"?t==="l"?s.legLLift:s.legRLift:0,r=i||a?` transform="translate(0 ${S(-a)}) rotate(${S(i)} ${o[0]} ${o[1]})"`:"",c=`<g class="${e} ${t}${e==="arm"?" hang":""}" style="transform-box:view-box;transform-origin:${o[0]}px ${o[1]}px">${n}</g>`;return r?`<g${r}>${c}</g>`:c}const ws="var(--line)";function Hn(e,t=.8,n=2.2){return e.map(s=>`<path d="${s}" fill="none" stroke="var(--hair-shade)" stroke-width="${n}" stroke-linecap="round" opacity="${t}"/>`).join("")}function Di(e,t=.32){return e.map(n=>`<path d="${n}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${t}"/>`).join("")}function os(){return'<path d="M54 72 Q62 44 92 38 Q70 50 63 74 Z" fill="#fff" opacity=".45"/><path d="M60 64 Q70 48 86 42" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".8"/><path d="M104 37 Q130 38 145 58 Q128 46 106 43 Z" fill="#fff" opacity=".3"/><circle cx="72" cy="50" r="2" fill="#fff" opacity=".85"/>'}function Dt(e,t,n){return n?`<path d="${e}" fill="url(#${t}h)"/>`:""}const op="M34 112 Q28 28 100 28 Q172 28 166 112 Q164 146 146 156 L54 156 Q36 146 34 112 Z";function jt(e,t){return`<path d="${op}" fill="var(--hair)" ${D(3.2)}/>${Dt(op,e,t)}`}function Cc(e,t,n,s,o,i,a=10){const r=Wd(e+2,t+3,n,12,7,s+.1),l=Wd(e,t,n-1,12,7,s);let c=`<path d="${r}" fill="var(--hair-shade)" ${D(3.2)}/><path d="${l}" fill="var(--hair)" ${D(3.2)}/>${Dt(l,o,i)}`;for(let d=0;d<a;d++){const f=d*2.5+s,u=(n-6)*Math.sqrt((d+.5)/a),p=e+u*Math.cos(f),m=t+u*Math.sin(f);c+=`<path d="M${S(p-4)} ${S(m+1)} q1 -5 4.5 -4.5 q3.5 1 2.5 4.5" fill="none" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>`,m<t-2&&p<e+6&&(c+=`<path d="M${S(p-2.5)} ${S(m-2.5)} q2 -2 3.5 -1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`)}return c+=`<ellipse cx="${S(e-10)}" cy="${S(t-12)}" rx="6" ry="3.4" fill="#fff" opacity=".55" transform="rotate(-35 ${S(e-10)} ${S(t-12)})"/>`,c+=`<path d="M${S(e-16)} ${S(t-6)} Q${S(e-6)} ${S(t-18)} ${S(e+4)} ${S(t-14)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>`,c}function io(e,t,n,s=6,o=[],i=7){let a=`<path d="M${e} ${t-6} V${n}" stroke="${ws}" stroke-width="${S(2*s+4.6)}" stroke-linecap="round"/><path d="M${e} ${t-6} V${n}" stroke="var(--hair)" stroke-width="${S(2*s)}" stroke-linecap="round"/>`,r=t,l=0;for(;r<n;){const c=l%2?1:-1;a+=`<path d="M${S(e-c)} ${S(r-4)} Q${S(e+c*s*1.05)} ${S(r-2)} ${S(e+c*s*.55)} ${S(r+4)} Q${S(e)} ${S(r+5.5)} ${S(e-c*1.4)} ${S(r+1)}" fill="none" stroke="var(--hair-shade)" stroke-width="1.7" stroke-linecap="round"/>`,c>0&&(a+=`<path d="M${S(e+1)} ${S(r-2)} q2.2 -.5 3 1.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>`),r+=i,l++}for(let c=0;c<o.length;c++){const d=o[c];a+=`<rect x="${S(e-6.2)}" y="${d-4}" width="12.4" height="8" rx="2.6" fill="var(--acc)" stroke="${ws}" stroke-width="2"/><rect x="${S(e-4)}" y="${d-2.5}" width="2.6" height="4.5" rx="1" fill="#fff" opacity=".6"/>`}return a+=`<path d="M${e-4} ${n+2} q2 5 4 6 q2 -1 4 -6" fill="var(--hair)" stroke="${ws}" stroke-width="2"/>`,a}function Jr(e,t,n,s=5.5){let o=`<path d="M${e} ${t} V${n}" stroke="${ws}" stroke-width="${S(2*s+4)}" stroke-linecap="round"/><path d="M${e} ${t} V${n}" stroke="var(--hair)" stroke-width="${S(2*s)}" stroke-linecap="round"/>`;for(let i=t+8;i<n;i+=16)o+=`<path d="M${S(e-s*.7)} ${i} Q${e} ${i+5} ${S(e+s*.7)} ${i}" fill="none" stroke="var(--hair-shade)" stroke-width="1.6" opacity=".8"/>`;return o+=`<circle cx="${e}" cy="${n+3}" r="${S(s*.55)}" fill="var(--hair)" stroke="${ws}" stroke-width="2"/>`,o}function Ic(e,t,n,s){return`<path d="${e}" fill="var(--hair)" ${D(3)}/>${Dt(e,t,n)}${Hn(s)}${Di(s.slice(0,2),.45)}`}function Co(e,t,n){return`<ellipse cx="${e}" cy="${t}" rx="8" ry="5.5" fill="var(--acc)" ${D(2.4)} transform="rotate(${n} ${e} ${t})"/><ellipse cx="${e-1}" cy="${t-2}" rx="2.4" ry="1.3" fill="#fff" opacity=".6" transform="rotate(${n} ${e-1} ${t-2})"/>`}const is='<path d="M42 104 Q44 76 70 66 Q86 74 100 58 Q114 74 130 66 Q156 76 158 104" fill="none" stroke="#3a1d3c" stroke-width="9" opacity=".12"/>';function Qm(e){return e==="puffs"||e==="coily"?"puffs":e==="afro"?"afro":e==="braids"?"braids":e==="boxbraids"?"box":e==="locs"?"locs":e==="sidebraid"?"sidebraid":e==="crown"?"crown":e==="pony"?"pony":e==="sidepony"?"sidepony":e==="pigtails"?"pigtails":e==="halfup"?"halfup":e==="buns"?"buns":e==="topbun"?"topbun":e==="lowbun"?"lowbun":e==="long"?"long":e==="wavy"||e==="wavybob"?e==="wavy"?"wavy":"bob":e==="bob"||e==="curlybob"||e==="sidebangs"?"bob":e==="pixie"?"pixie":(e==="bangs"||e==="short")&&e==="bangs"?"bangs":"short"}function PL(e,t,n){const s=Qm(e);if(s==="puffs"){const o=e==="coily"?26:30;return Cc(48,52,o,0,t,n,12)+Cc(152,52,o,.3,t,n,12)+`<path d="M42 112 Q38 48 100 44 Q162 48 158 112 Q154 144 100 146 Q46 144 42 112 Z" fill="var(--hair)" ${D(3.2)}/>`+Co(66,68,-35)+Co(134,68,35)}if(s==="afro")return Cc(100,78,78,.2,t,n,14);if(s==="braids")return jt(t,n)+io(34,108,230,5.4,[196])+io(166,108,230,5.4,[196]);if(s==="box")return jt(t,n)+io(30,110,228,5,[200],10)+io(170,110,228,5,[200],10);if(s==="locs")return jt(t,n)+Jr(32,112,236)+Jr(168,112,236);if(s==="sidebraid")return jt(t,n);if(s==="pony"||s==="sidepony"||s==="halfup"){const o=s==="sidepony"?"M118 78 Q150 70 158 120 Q164 160 150 200 Q136 188 138 160 Q132 120 124 96 Z":"M126 40 Q178 28 180 92 Q184 132 168 168 Q160 196 174 220 Q148 212 145 182 Q140 156 152 124 Q160 90 132 64 Z",i=s==="halfup"?70:s==="sidepony"?86:44;return jt(t,n)+Ic(o,t,n,s==="sidepony"?["M130 96 Q150 120 146 160","M138 110 Q154 140 148 180"]:["M146 56 Q170 88 160 130","M156 66 Q176 100 166 140","M150 150 Q148 180 160 206"])+Co(s==="sidepony"?124:128,i,s==="sidepony"?-20:25)}if(s==="pigtails")return jt(t,n)+Ic("M40 100 Q22 120 28 168 Q34 200 48 214 Q58 196 52 160 Q58 124 56 108 Z",t,n,["M40 120 Q32 150 40 184"])+Ic("M160 100 Q178 120 172 168 Q166 200 152 214 Q142 196 148 160 Q142 124 144 108 Z",t,n,["M160 120 Q168 150 160 184"])+Co(52,96,20)+Co(148,96,-20);if(s==="buns"){let o="";for(const i of[52,148])o+=`<circle cx="${i}" cy="44" r="24" fill="var(--hair)" ${D(3.2)}/>${n?`<circle cx="${i}" cy="44" r="24" fill="url(#${t}h)"/>`:""}`,o+=Hn([`M${i-14} 48 Q${i-14} 28 ${i} 26 Q${i+16} 30 ${i+14} 48`,`M${i-8} 54 Q${i+8} 56 ${i+12} 48`]),o+=`<path d="M${i-12} 34 Q${i-4} 24 ${i+4} 26" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>`;return o+jt(t,n)}if(s==="topbun")return`<circle cx="100" cy="30" r="26" fill="var(--hair)" ${D(3.2)}/>${n?`<circle cx="100" cy="30" r="26" fill="url(#${t}h)"/>`:""}<path d="M82 28 Q100 12 118 28" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>${Hn(["M86 36 Q100 24 114 36","M90 42 Q100 34 110 42"])}${jt(t,n)}`;if(s==="lowbun")return jt(t,n)+`<circle cx="100" cy="168" r="22" fill="var(--hair)" ${D(3)}/>${n?`<circle cx="100" cy="168" r="22" fill="url(#${t}h)"/>`:""}${Co(100,148,0)}`;if(s==="long"||s==="wavy"){const o=s==="wavy"?"M36 108 Q28 160 40 210 Q52 250 46 286 Q70 270 78 230 Q60 180 58 140 Q52 120 48 108 Z M164 108 Q172 160 160 210 Q148 250 154 286 Q130 270 122 230 Q140 180 142 140 Q148 120 152 108 Z":"M38 110 Q30 170 36 240 Q42 280 34 300 L70 292 Q64 240 66 180 Q62 140 56 112 Z M162 110 Q170 170 164 240 Q158 280 166 300 L130 292 Q136 240 134 180 Q138 140 144 112 Z";return`<path d="${o}" fill="var(--hair)" ${D(3)}/>${Dt(o,t,n)}${jt(t,n)}`}if(s==="bob"){const o=e==="curlybob"?"M30 120 Q24 170 48 196 Q70 210 100 206 Q130 210 152 196 Q176 170 170 120 Q150 150 100 156 Q50 150 30 120 Z":"M32 116 Q26 168 50 190 Q78 204 100 200 Q122 204 150 190 Q174 168 168 116 Q150 148 100 154 Q50 148 32 116 Z";return`<path d="${o}" fill="var(--hair)" ${D(3.2)}/>${Dt(o,t,n)}${jt(t,n)}`}return jt(t,n)}function AL(e,t,n){const s=Qm(e),o='<path d="M100 34 V56" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>';if(s==="puffs"||s==="braids"||s==="box"||s==="locs"||s==="afro"||s==="bangs"){const a=s==="afro"?"M48 100 Q52 48 100 40 Q148 48 152 100 Q140 78 100 70 Q60 78 48 100 Z":s==="bangs"?"M40 108 Q36 40 100 34 Q164 40 160 108 L150 96 Q130 108 100 100 Q70 108 50 96 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q154 74 130 62 Q112 70 100 52 Q88 70 70 62 Q46 74 40 106 Z";let r=is+`<path d="${a}" fill="var(--hair)" ${D(3.2)}/>${Dt(a,t,n)}${o}`;return r+=Hn(["M84 44 Q70 52 60 70","M116 44 Q130 52 140 70","M92 40 Q80 48 74 58","M108 40 Q120 48 126 58","M76 42 Q58 56 52 82","M124 42 Q142 56 148 82"]),r+=Di(["M90 36 Q78 42 70 52","M112 36 Q124 42 132 52"]),s==="puffs"?(r+=`<path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="${ws}" stroke-width="7" stroke-linecap="round"/><path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`,r+=`<path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="${ws}" stroke-width="7" stroke-linecap="round"/><path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`):s==="braids"||s==="box"?(r+=io(48,114,200,5,[156],s==="box"?10:7),r+=io(152,114,200,5,[156],s==="box"?10:7)):s==="locs"&&(r+=Jr(46,116,210,4.6)+Jr(154,116,210,4.6)),r+os()}if(s==="sidebraid"){const a="M40 108 Q36 36 100 32 Q164 36 160 100 Q140 78 100 70 Q70 80 40 108 Z";return is+`<path d="${a}" fill="var(--hair)" ${D(3.2)}/>${Dt(a,t,n)}${Hn(["M70 46 Q86 60 96 74","M120 44 Q136 58 146 74"])}${io(150,100,210,5.6,[168],7)}${os()}`}if(s==="crown"){const a="M40 106 Q36 36 100 32 Q164 36 160 106 Q150 80 100 74 Q50 80 40 106 Z";let r="";for(let l=0;l<7;l++){const c=58+l*14;r+=`<path d="M${c} 58 Q${c+7} 46 ${c+14} 58" fill="none" stroke="var(--hair-shade)" stroke-width="3.2" stroke-linecap="round"/>`}return is+`<path d="${a}" fill="var(--hair)" ${D(3.2)}/>${Dt(a,t,n)}${r}${os()}`}if(s==="pony"||s==="sidepony"||s==="halfup"||s==="pigtails"){const a=s==="sidepony"?"M40 108 Q34 36 100 32 Q166 34 160 108 Q150 86 120 78 Q90 90 60 74 Q48 90 40 108 Z":"M40 108 Q34 34 100 32 Q166 34 160 108 Q156 84 144 72 Q128 86 104 80 Q86 78 72 68 Q60 84 48 84 Q42 94 40 108 Z";let r=is+`<path d="${a}" fill="var(--hair)" ${D(3.2)}/>${Dt(a,t,n)}`;return r+=`<path d="M40 104 Q36 120 44 132 Q46 116 50 106 Z" fill="var(--hair)" ${D(2.4)}/><path d="M160 104 Q164 120 156 132 Q154 116 150 106 Z" fill="var(--hair)" ${D(2.4)}/>`,r+=Hn(["M70 46 Q90 60 104 74","M128 46 Q140 60 146 74","M96 40 Q110 56 116 66"]),r+=Di(["M76 42 Q92 52 100 62"]),r+os()}if(s==="buns"||s==="topbun"||s==="lowbun"){const a=s==="topbun"?"M44 108 Q40 50 100 46 Q160 50 156 108 Q148 82 100 74 Q52 82 44 108 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q152 80 138 70 Q126 80 112 76 Q104 82 100 74 Q96 82 88 76 Q74 80 62 70 Q48 80 40 106 Z";let r=is+`<path d="${a}" fill="var(--hair)" ${D(3.2)}/>${Dt(a,t,n)}`;if(r+=Hn(["M80 42 Q72 56 68 68","M120 42 Q128 56 132 68","M100 36 Q98 56 100 70","M90 38 Q84 56 86 72","M110 38 Q116 56 114 72"]),r+=Di(["M86 38 Q80 46 78 54","M114 38 Q120 46 122 54"]),s==="buns")for(const[l,c]of[[42,1],[158,-1]]){const d=`M${l} 100 q${-8*c} 14 ${-2*c} 24 q${5*c} 8 ${-1*c} 14`;r+=`<path d="${d}" fill="none" stroke="${ws}" stroke-width="7" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`}return r+os()}if(s==="long"||s==="wavy"||s==="bob"){const a=e==="sidebangs"||e==="wavybob"?"M38 108 Q34 40 70 36 Q100 34 112 48 Q90 70 48 78 Q36 90 38 108 Z M112 48 Q140 36 164 50 Q166 100 150 108 Q130 80 112 70 Z":"M40 108 Q34 36 100 32 Q166 36 160 108 Q152 78 128 68 Q112 78 100 60 Q88 78 72 68 Q48 78 40 108 Z";return is+`<path d="${a}" fill="var(--hair)" ${D(3.2)}/>${Dt(a,t,n)}${Hn(["M78 46 Q68 64 64 80","M122 46 Q132 64 136 80","M100 38 V64"])}${Di(["M88 40 Q80 50 76 60"])}${os()}`}if(s==="pixie"){const a="M48 104 Q44 48 100 40 Q140 46 150 78 Q156 100 140 108 Q120 86 100 90 Q70 84 52 104 Z";return is+`<path d="${a}" fill="var(--hair)" ${D(3.2)}/>${Dt(a,t,n)}${Hn(["M70 56 Q86 70 96 84","M118 52 Q132 66 138 82"])}${os()}`}const i="M46 106 Q42 46 100 38 Q158 46 154 106 Q140 80 100 76 Q60 80 46 106 Z";return is+`<path d="${i}" fill="var(--hair)" ${D(3.2)}/>${Dt(i,t,n)}${o}${os()}`}const ti="var(--line)";function oh(e){return Math.abs(e.legL)>=40||Math.abs(e.legR)>=40}function wo(e,t,n,s=[]){const o=s.map(i=>`<path d="${i}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`).join("");return(n?`<path d="${e}" fill="url(#${t}c)"/>`:"")+o}function Vd(e,t,n){const s=(n+7).toFixed(1);return`<path d="${e}" fill="none" stroke="${ti}" stroke-width="${s}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function ih(e,t,n){return Ps("arm",e,t,n).replace('class="arm ','class="arm sleeve ')}function Lr(e,t,n=!1){const[s,o]=Yt[e],i=e==="l"?-1:1;let a=Vd(`M${s} ${o} L${s+7*i} ${o+20}`,"var(--top)",22);return n&&(a+=`<path d="M${s+7*i-12} ${o+17} H${s+7*i+12}" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round" opacity=".9" transform="rotate(${-18*i} ${s+7*i} ${o+17})"/>`),ih(e,a,t)}function Xi(e,t,n=!0){const[s,o]=Yt[e],[i,a]=_n[e],r=e==="l"?-1:1,l=(s+i)/2+6*r;let c=Vd(`M${s-2*r} ${o-2} Q${l} ${(o+a)/2-6} ${i-r} ${a-16}`,"var(--top)",21);return n&&(c+=Vd(`M${i-3*r} ${a-17} L${i-r} ${a-13}`,"var(--top-trim)",20)),ih(e,c,t)}function Ud(e,t,n=!1){const[s,o]=Yt[e],i=e==="l"?-1:1,a=s+4*i,r=o+8;let l=`<path d="${Wd(a,r,13,9,3.2)}" fill="var(--top)" ${D(2.8)}/>`;return l+=`<ellipse cx="${a-4*i}" cy="${r-5}" rx="5" ry="3" fill="#fff" opacity=".45"/>`,n&&(l+=`<path d="M${a-11} ${r+13} ${Zl(a-11,a+11,r+13,4,3)}" fill="none" stroke="#fff" stroke-width="2.4"/>`),ih(e,l,t)}function Gt(e,t){return e("l",t)+e("r",t)}const ip="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 228 Q100 236 64 228 Z";function Ks(e,t,n,s,o,i,a="",r=[],l=!1){const c=`<path d="${t}" fill="var(--top)" ${D(3)}/>${wo(t,s,o,r)}${a}`;return`<g class="shirt" data-hem="${i}">${l?c+n:n+c}</g>`}function RL(e,t,n,s,o){if(t.dress)return"";const i=t.top;if(i==="hoodie"){const l="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L139 230 Q100 240 61 230 Z",c=`<path d="M120 162 Q132 164 134 170 L139 230 Q128 233 123 233 Z" ${mt}/><path d="M72 172 Q76 164 86 163" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".38"/><path d="M78 159 Q100 182 122 159 Q120 152 100 152 Q80 152 78 159 Z" fill="var(--top-trim)" ${D(2.8)}/><path d="M92 172 v18 M108 172 v18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="92" cy="191" r="2.6" fill="#fff" ${D(1.8)}/><circle cx="108" cy="191" r="2.6" fill="#fff" ${D(1.8)}/><path d="M78 202 H122 L127 222 H73 Z" fill="var(--top)" ${D(2.6)}/><path d="M78 202 H122 L124 210 H76 Z" ${mt}/><path d="M61 226 Q100 236 139 226 L139 234 Q100 244 61 234 Z" fill="var(--top-trim)" ${D(2.8)}/>`;return Ks(e,l,Gt(Xi,e),n,s,o,c,["M74 196 q-2 12 2 22","M126 190 q2 14 0 26"])}if(i==="stripes"||i==="jersey"){const l="M68 168 Q74 158 92 158 H108 Q126 158 132 168 L135 232 Q100 238 65 232 Z",c=`${n}st`,d=i==="jersey"?'<path d="M70 176 H130 L128 188 H72 Z" fill="var(--top-trim)"/><path d="M68 210 H132 L130 222 H70 Z" fill="var(--top-trim)"/>':[166,179,192,205,218,231].map(m=>`<rect x="60" y="${m}" width="80" height="6" fill="var(--top-trim)"/>`).join(""),f=i==="jersey"?'<path d="M86 160 L100 176 L114 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/>':'<path d="M84 159 Q100 172 116 159" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',u=s?`<path d="${l}" fill="url(#${n}c)"/>`:"";return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${c}"><path d="${l}"/></clipPath></defs>${Gt(m=>Lr(m,e,!0),e)}<path d="${l}" fill="var(--top)"/><g clip-path="url(#${c})">${u}<path d="M118 160 L135 168 L138 236 H120 Z" ${mt}/>${d}</g><path d="${l}" fill="none" ${D(3)}/>${f}<path d="M78 198 q-2 12 1 24" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/><path d="M122 190 q2 14 0 28" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/></g>`}if(i==="sweater"||i==="cardigan"){const l=i==="cardigan"?"M68 168 Q74 158 92 158 H108 Q126 158 132 168 L134 232 H108 L100 210 L92 232 H66 Z":"M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 234 Q100 242 64 234 Z",c=`<path d="M118 166 L134 174 L136 230 Q120 236 112 228 Z" ${mt}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M64 226 Q100 236 136 226" fill="none" stroke="var(--top-trim)" stroke-width="6" stroke-linecap="round"/>`,d=i==="cardigan"?[186,202,218].map(f=>`<circle cx="100" cy="${f}" r="2.4" fill="var(--top-trim)" ${D(1.4)}/>`).join(""):"";return Ks(e,l,Gt(Xi,e),n,s,o,c+d,["M80 190 q-2 16 0 28","M120 188 q2 16 0 30"])}if(i==="tank"||i==="bib"){const l=i==="bib"?"M78 168 H122 L126 228 H74 Z":"M78 168 Q86 160 96 164 H104 Q114 160 122 168 L128 226 H72 Z",c=`<path d="M110 172 H126 L128 226 H114 Z" ${mt}/><path d="M82 176 Q84 168 92 166" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".35"/>`,d=i==="bib"?`${c}<path d="M86 150 L78 168 M114 150 L122 168" stroke="${ti}" stroke-width="8" stroke-linecap="round"/><path d="M86 150 L78 168 M114 150 L122 168" stroke="var(--top)" stroke-width="4.5" stroke-linecap="round"/><rect x="90" y="176" width="20" height="16" rx="3" fill="var(--top-trim)" ${D(1.6)}/>`:`${c}<path d="M84 166 Q100 176 116 166" fill="none" stroke="var(--top-trim)" stroke-width="4"/>`;return Ks(e,l,"",n,s,o,d,["M88 190 q2 14 0 24"])}if(i==="puff"||i==="ruffle"){const l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L132 222 H68 Z",c=`<path d="M100 172 l-8 -5 v10 z M100 172 l8 -5 v10 z" fill="var(--top-trim)" ${D(1.8)}/><path d="M97 174 l-4 10 M103 174 l4 10" stroke="var(--top-trim)" stroke-width="2.6" stroke-linecap="round"/>`,d=(i==="ruffle"?`<path d="M68 166 Q74 178 82 166 Q90 180 100 166 Q110 180 118 166 Q126 180 132 166" fill="var(--top-trim)" ${D(2)}/>`:c)+`<path d="M118 162 Q128 164 130 170 L132 222 H120 Z" ${mt}/><path d="M74 176 Q76 168 84 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return Ks(e,l,Gt(Ud,e),n,s,o,d,["M86 190 q2 10 0 20","M116 188 q-2 12 0 22"],!0)}if(i==="button"){const l=ip,c=[180,196,212].map(f=>`<circle cx="100" cy="${f}" r="2.6" fill="#fff" ${D(1.6)}/>`).join(""),d=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${mt}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M100 164 V226" stroke="#fff" stroke-width="2" opacity=".7"/>${c}<path d="M82 160 Q100 172 118 160" fill="var(--top)" ${D(2.2)}/>`;return Ks(e,l,Gt(f=>Lr(f,e,!1),e),n,s,o,d,["M78 196 q-1 12 2 20"])}if(i==="raincoat"){const l="M62 168 Q70 156 92 156 H108 Q130 156 138 168 L146 240 Q100 252 54 240 Z",c=`<path d="M120 164 L142 176 L146 236 Q124 244 116 232 Z" ${mt}/><path d="M72 176 Q76 166 88 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M70 156 Q100 176 130 156" fill="none" stroke="var(--top-trim)" stroke-width="6"/><circle cx="100" cy="196" r="4" fill="var(--top-trim)" ${D(1.8)}/><path d="M78 214 H122" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round"/>`;return Ks(e,l,Gt(Xi,e),n,s,o,c,["M76 190 q-4 18 -2 36","M124 188 q4 18 2 36"])}const a=ip,r=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${mt}/><path d="M84 160 Q100 172 116 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return Ks(e,a,Gt(l=>Lr(l,e,!1),e),n,s,o,r,["M78 196 q-2 12 1 22","M122 194 q2 14 -1 24"])}function ap(e,t,n,s,o,i=!1,a=16){const r=e==="l"?88:112,l=e==="l"?-1:1,c=`M${r-a/2} 226 Q${r-a/2+l} ${n-20} ${r-a/2+2*l} ${n} H${r+a/2} Q${r+a/2} ${n-30} ${r+a/2-l} 226 Z`;let d=`<path d="${c}" fill="var(--bottom)" ${D(2.8)}/>`;return d+=wo(c,s,o,[`M${r-4*l} 240 Q${r} ${(226+n)/2} ${r+3*l} ${n-14}`]),e==="r"?d+=`<path d="M${r+1} 230 H${r+a/2} L${r+a/2} ${n} H${r+4} Z" ${mt}/>`:d+=`<path d="M${r-2} 238 Q${r-6} ${(226+n)/2} ${r-2} ${n-10}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".3"/>`,i&&(d+=`<path d="M${r-a/2-1} ${n-8} H${r+a/2+1} V${n+1} H${r-a/2-1} Z" fill="var(--bottom-trim)" ${D(2)}/>`),Ps("leg",e,d,t)}function CL(e,t,n,s){if(t.dress)return'<g data-layer="bottom"></g>';const o=t.bottom;if(oh(e)&&(o==="skirt"||o==="tutu"||o==="overalls"))return`<g data-layer="bottom"><path class="skirt" d="${o==="tutu"?"M52 216 H148 L160 248 Q100 260 40 248 Z":"M62 218 H138 L152 252 Q100 264 48 252 Z"}" fill="var(--bottom)" ${D(3)}/></g>`;if(o==="skirt"){const u="M68 222 H132 L146 262 Q100 274 54 262 Z";return`<g data-layer="bottom"><path class="skirt" d="${u}" fill="var(--bottom)" ${D(3)}/>${wo(u,n,s,["M82 234 L76 258","M100 232 V266","M118 234 L126 258"])}<path d="M114 224 H132 L146 262 Q130 268 118 266 Z" ${mt}/><path d="M72 228 Q66 246 64 258" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".3"/><path d="M84 236 v10 M116 236 v10" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/></g>`}if(o==="tutu")return'<g data-layer="bottom"></g>';if(o==="overalls"){const u="M66 220 H134 L139 264 H106 L100 254 L94 264 H61 Z";return`<g data-layer="bottom"><g class="leg" style="transform-box:view-box;transform-origin:100px 238px"><path d="${u}" fill="var(--bottom)" ${D(3)}/>${wo(u,n,s,["M78 232 Q74 248 72 260","M122 230 Q128 248 132 260"])}<path d="M118 222 H134 L139 264 H122 Z" ${mt}/><path d="M64 258 H95 M105 258 H138" stroke="var(--bottom-trim)" stroke-width="4"/></g></g>`}const a=o==="shorts"?256:292,r=o==="joggers"||o==="jeans",l=o==="leggings"?12:o==="shorts"?18:16,c=ap("l",e,a,n,s,r,l)+ap("r",e,a,n,s,r,l),d=o==="jeans"?'<path d="M88 232 V286 M112 232 V286" stroke="#c9a24a" stroke-width="1.4" stroke-dasharray="2 3" opacity=".7"/>':"";return`<g data-layer="bottom">${`<path d="M70 220 H130 V230 H70 Z" fill="var(--bottom)" ${D(2.4)}/>`}${c}${d}</g>`}function IL(e,t,n,s){if(t.dress)return'<g data-layer="bottom-over"></g>';const o=t.bottom;if(o==="overalls"){const i="M78 180 H122 L124 228 H76 Z";return`<g data-layer="bottom-over"><path d="M80 176 L72 164 M120 176 L128 164" stroke="${ti}" stroke-width="12" stroke-linecap="round"/><path d="M80 176 L72 164 M120 176 L128 164" stroke="var(--bottom)" stroke-width="7.5" stroke-linecap="round"/><path d="${i}" fill="var(--bottom)" ${D(3)}/>${wo(i,n,s,["M86 200 q14 6 28 0"])}<path d="M88 190 H112 V206 Q100 212 88 206 Z" fill="var(--bottom-trim)" ${D(2.4)}/><circle cx="82" cy="186" r="3.6" fill="#fff" ${D(2)}/><circle cx="118" cy="186" r="3.6" fill="#fff" ${D(2)}/><path d="M66 222 H134 L135 230 H65 Z" fill="var(--bottom)" ${D(3)}/><path d="M108 180 H122 L124 228 H110 Z" ${mt}/><path d="M82 182 v12" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/></g>`}if(o==="tutu"){if(oh(e))return`<g data-layer="bottom-over"><path class="skirt" d="M58 220 H142 L154 246 Q100 256 46 246 Z" fill="var(--bottom)" ${D(2.4)}/></g>`;let i="";const a=[[266,50,150,8],[256,56,144,7],[246,64,136,6]];for(let l=0;l<a.length;l++){const[c,d,f,u]=a[l],p=`M${d+8} ${c-22} H${f-8} L${f} ${c} ${Zl(f,d,c,6,u)} Z`;i+=`<path class="skirt" d="${p}" fill="var(--bottom)" ${D(2.4)}/>`,i+=`<path d="M${f-20} ${c-16} L${f-6} ${c-2}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".2"/>`}const r="M66 214 H134 V224 H66 Z";return`<g data-layer="bottom-over">${i}<path d="${r}" fill="var(--bottom-trim)" ${D(2.6)}/>${wo(r,n,s)}</g>`}return'<g data-layer="bottom-over"></g>'}function rp(e,t){return`<path d="M${e} ${t+2} c-3 -5 -9 -1 -5 3 l5 4 l5 -4 c4 -4 -2 -8 -5 -3z" fill="var(--top-trim)" opacity=".85"/>`}function BL(e,t,n,s,o){const i=t.dress;if(!i)return"";const a=`${n}dr`;let r="M72 210 H128 L150 268 Q100 282 50 268 Z",l="M72 168 Q78 158 94 158 H106 Q122 158 128 168 L130 214 H70 Z",c="",d=Gt(m=>Ud(m,e,!0),e),f=!0;i==="sundress"?(r="M76 214 H124 L140 266 Q100 276 60 266 Z",c='<path d="M78 166 Q100 180 122 166" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',d="",f=!1):i==="party"?c=[[64,236],[86,228],[108,234],[130,242],[76,254],[100,250],[122,258],[92,188]].map(([k,w])=>rp(k,w)).join("")+`<path d="M100 214 l-10 -6 v12 z M100 214 l10 -6 v12 z" fill="var(--top-trim)" ${D(1.8)}/><path d="M52 262 Q100 276 148 262" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="1 5" opacity=".85"/>`:i==="pinafore"?(l="M80 176 H120 L122 214 H78 Z",c='<path d="M86 158 L80 178 M114 158 L120 178" stroke="var(--top)" stroke-width="5" stroke-linecap="round"/>',d="",f=!1,r="M74 212 H126 L142 264 Q100 274 58 264 Z"):i==="jumper"?(c=`<path d="M84 160 Q100 174 116 160" fill="var(--top-trim)" ${D(2)}/>`,d=Gt(m=>Lr(m,e,!0),e),f=!1):i==="ballet"?(r="M78 214 H122 L132 250 Q100 258 68 250 Z",c=`<path d="M70 248 ${Zl(70,130,248,5,5)}" fill="none" stroke="#fff" stroke-width="2"/>`,d=Gt(Ud,e)):i==="nightgown"?(r="M80 214 H120 L132 270 Q100 278 68 270 Z",c='<path d="M88 164 Q100 176 112 164" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>',d=Gt(Xi,e),f=!1):i==="raindress"?(r="M70 212 H130 L148 268 Q100 280 52 268 Z",c='<path d="M76 168 Q100 186 124 168" fill="none" stroke="var(--top-trim)" stroke-width="5"/><circle cx="100" cy="198" r="3.4" fill="var(--top-trim)"/>',d=Gt(Xi,e),f=!1):(r="M70 214 H130 L152 266 Q100 280 48 266 Z",l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L131 216 H69 Z",c=[[66,236],[86,228],[110,232],[132,240],[76,254],[100,248],[124,258],[56,260],[144,262],[96,266],[84,182],[114,190],[100,200]].map(([k,w])=>rp(k,w)).join("")+`<path d="M112 214 H130 L152 266 Q138 271 128 272 Z" ${mt}/><path d="M118 162 L130 168 L131 216 H120 Z" ${mt}/><path d="M50 262 Q100 276 150 262" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9"/><path d="M60 226 Q56 244 54 258" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/><path d="M68 210 H132 V220 H68 Z" fill="var(--top-trim)" ${D(2.6)}/><path d="M100 215 l-13 -8 v16 z M100 215 l13 -8 v16 z" fill="var(--top-trim)" ${D(2.2)}/><circle cx="100" cy="215" r="3.6" fill="var(--top-trim)" ${D(2)}/><path d="M97 218 l-5 14 M103 218 l5 14" stroke="var(--top-trim)" stroke-width="3" stroke-linecap="round"/><path d="M80 158 Q78 172 94 170 Q99 166 100 162 Q101 166 106 170 Q122 172 120 158 Q100 164 80 158 Z" fill="#fff" ${D(2.4)}/>`),oh(e)&&(r="M68 214 H132 L150 250 Q100 262 50 250 Z");const u=`${r} ${l}`,p=`<path class="skirt" d="${r}" fill="var(--top)" ${D(3)}/><path d="${l}" fill="var(--top)" ${D(3)}/><g clip-path="url(#${a})">${wo(u,n,s,["M80 226 Q74 248 70 266","M120 226 Q126 248 130 266"])}${c}</g>`;return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${a}"><path d="${u}"/></clipPath></defs>${f?p+d:d+p}</g>`}function OL(e,t,n,s){const o=e==="l"?`<g transform="translate(${2*s} 0) scale(-1 1)">${n}</g>`:n;return Ps("leg",e,o,t)}function DL(e,t){const n=t.shoes;let s="";for(const o of["l","r"]){const i=o==="l"?87:113;let a="";if(n==="sneakers"||n==="lightup"){const r=n==="lightup"?`<circle cx="${i-4}" cy="292" r="2.2" fill="#ff8fab"/><circle cx="${i+4}" cy="296" r="2.2" fill="#8ecae6"/><circle cx="${i}" cy="300" r="2" fill="#ffd166"/>`:"";a=`<path d="M${i} 270 V286" fill="none" stroke="var(--sock)" stroke-width="16" stroke-linecap="round"/><path d="M${i-14} 296 Q${i-14} 284 ${i} 284 Q${i+14} 284 ${i+16} 296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+12} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${D(2.8)}/><path d="M${i-12} 304 H${i+18}" stroke="var(--shoe-trim)" stroke-width="3.5" stroke-linecap="round"/><path d="M${i-6} 290 l5 2 M${i-6} 295 l6 2" stroke="${ti}" stroke-width="1.8" stroke-linecap="round"/>${r}`}else if(n==="boots"||n==="rainboots"){const r=n==="rainboots"?248:258,l=n==="boots"?[[-6,272],[5,268],[-2,284],[7,290],[-8,294]].map(([c,d])=>`<circle cx="${i+c}" cy="${d}" r="2.6" fill="#fff" opacity=".9"/>`).join(""):"";a=`<path d="M${i-14} ${r} H${i+14} V296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+10} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${D(2.8)}/><path d="M${i-16} ${r-4} H${i+16} V${r+8} H${i-16} Z" fill="var(--shoe)" ${D(2.6)}/>`+l+(n==="rainboots"?`<path d="M${i-12} ${r+16} H${i+12}" stroke="var(--shoe-trim)" stroke-width="4" stroke-linecap="round"/>`:`<path d="M${i-6} ${r+14} V292" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".45"/>`)}else n==="maryjanes"?a=`<path d="M${i} 266 V290" fill="none" stroke="var(--sock)" stroke-width="15" stroke-linecap="round"/><path d="M${i-12} 274 ${Zl(i-12,i+12,274,4,4)} L${i+12} 268 H${i-12} Z" fill="var(--sock)" ${D(2)}/><path d="M${i-13} 298 Q${i-13} 290 ${i} 290 Q${i+13} 290 ${i+14} 298 Q${i+20} 300 ${i+20} 304 Q${i+20} 309 ${i+8} 309 H${i-12} Q${i-16} 309 ${i-14} 302 Z" fill="var(--shoe)" ${D(2.8)}/><path d="M${i-10} 294 H${i+12}" stroke="${ti}" stroke-width="2"/><circle cx="${i+8}" cy="294" r="2.2" fill="var(--acc)"/>`:n==="sandals"?a=`<path d="M${i-12} 298 Q${i-12} 286 ${i} 286 Q${i+12} 286 ${i+14} 296 Q${i+18} 298 ${i+18} 302 Q${i+18} 306 ${i+8} 306 H${i-12} Q${i-16} 306 ${i-14} 300 Z" fill="var(--skin)" ${D(2.4)}/><path d="M${i-14} 304 H${i+18}" stroke="var(--shoe)" stroke-width="5" stroke-linecap="round"/><path d="M${i-8} 292 H${i+10} M${i+2} 300 L${i+8} 290" stroke="var(--shoe)" stroke-width="4" stroke-linecap="round"/><circle cx="${i+2}" cy="293" r="3" fill="var(--shoe-trim)" ${D(1.4)}/>`:n==="slippers"?a=`<path d="M${i-14} 292 Q${i-14} 280 ${i} 278 Q${i+16} 280 ${i+18} 294 Q${i+22} 296 ${i+20} 304 H${i-14} Q${i-18} 304 ${i-16} 296 Z" fill="var(--shoe)" ${D(2.8)}/><path d="M${i-6} 286 q6 -4 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`:a=`<ellipse cx="${i+2}" cy="304" rx="16" ry="7" fill="var(--shoe)" ${D(2.6)}/>`;s+=OL(o,e,a,i)}return`<g data-layer="shoes">${s}</g>`}const Nm=new Set(["cap","beanie","sunhat"]),HL=new Set(["catears","earmuffs"]);function di(e){return e==="afro"?28:e==="topbun"?20:e==="puffs"||e==="coily"?16:e==="buns"||e==="curlybob"?12:e==="long"||e==="wavy"||e==="wavybob"?8:0}function Li(e,t,n){if(!Nm.has(t)&&!HL.has(t))return n;const s=di(e);return s?`<g data-hat="${t}" transform="translate(0 ${S(-s)})">${n}</g>`:n}function WL(e,t,n){let s="";for(let l=0;l<n.length;l++)Nm.has(n[l])&&(s=n[l]);if(!s)return"";const o=di(t),i=(s==="beanie"?58:s==="cap"?64:62)-o,a=Math.min(70,i),r=t==="afro"||t==="puffs"||t==="coily"?92:78;return`<mask id="${e}hm" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" data-brim="${S(a)}"><rect x="-30" y="-50" width="260" height="420" fill="#fff"/><rect x="${S(100-r)}" y="-50" width="${S(r*2)}" height="${S(a+50)}" fill="#000"/></mask>`}function Bc(e,t,n){return`<g transform="translate(${e} ${t}) scale(${n})"><path d="M0 0 C-8 -14 -30 -14 -28 0 C-30 14 -8 14 0 0 Z" fill="var(--acc)" ${D(2.6)}/><path d="M0 0 C8 -14 30 -14 28 0 C30 14 8 14 0 0 Z" fill="var(--acc)" ${D(2.6)}/><rect x="-6" y="-7" width="12" height="14" rx="4" fill="var(--acc2)" ${D(2.2)}/></g>`}function VL(e){return`<g data-layer="accessory">${e.acc.map(n=>n==="glasses"?'<circle cx="76" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="124" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="76" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><circle cx="124" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3.2"/><path d="M58 108 L42 104 M142 108 L158 104" stroke="var(--frame)" stroke-width="3.2" stroke-linecap="round"/>':n==="square"?'<rect x="58" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><rect x="108" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><path d="M92 112 H108" stroke="var(--frame)" stroke-width="3.2"/>':n==="sunnies"?'<path d="M56 104 H94 Q96 122 76 122 Q56 122 56 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M106 104 H144 Q146 122 124 122 Q104 122 106 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3"/>':n==="bow"?Bc(100,78,.7):n==="bigbow"?Bc(100,70,1.15):n==="headband"?`<path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="${ti}" stroke-width="12" stroke-linecap="round"/><path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round"/>${Bc(100,32,.85)}`:n==="flower"?`<g transform="translate(138 78)">${[0,60,120,180,240,300].map(s=>`<ellipse cx="0" cy="-8" rx="5" ry="8" fill="var(--acc)" ${D(1.6)} transform="rotate(${s})"/>`).join("")}<circle r="4.5" fill="var(--acc2)" ${D(1.6)}/></g>`:n==="cap"?Li(e.hair,"cap",`<path d="M54 64 Q56 20 100 16 Q144 20 146 64 Q128 54 100 56 Q72 54 54 64 Z" fill="var(--acc)" ${D(3)}/><path d="M48 56 Q100 66 152 56 L156 62 Q100 70 44 62 Z" fill="var(--acc)" ${D(3)}/><circle cx="100" cy="18" r="4.5" fill="#fff" ${D(2)}/>`):n==="beanie"?Li(e.hair,"beanie",`<path d="M50 66 Q48 14 100 8 Q152 14 150 66 Q128 56 100 58 Q72 56 50 66 Z" fill="var(--acc)" ${D(3)}/><path d="M50 58 H150" stroke="var(--acc2)" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="8" r="7" fill="var(--acc2)" ${D(2.4)}/>`):n==="sunhat"?Li(e.hair,"sunhat",`<path d="M66 56 Q68 22 100 18 Q132 22 134 56 Q118 48 100 50 Q82 48 66 56 Z" fill="var(--acc)" ${D(3)}/><path d="M18 56 Q100 68 182 56 Q170 64 100 66 Q30 64 18 56 Z" fill="var(--acc)" ${D(3)}/><path d="M72 46 Q100 38 128 46" fill="none" stroke="var(--acc2)" stroke-width="4"/>`):n==="catears"?Li(e.hair,"catears",`<path d="M58 62 L70 18 L86 60 Z" fill="var(--acc)" ${D(2.6)}/><path d="M114 60 L130 18 L142 62 Z" fill="var(--acc)" ${D(2.6)}/><path d="M64 54 L72 30 L80 52 Z" fill="var(--acc2)"/><path d="M120 52 L128 30 L136 54 Z" fill="var(--acc2)"/>`):n==="earmuffs"?Li(e.hair,"earmuffs",`<path d="M44 68 Q48 26 100 22 Q152 26 156 68" fill="none" stroke="var(--acc)" stroke-width="6"/><circle cx="34" cy="86" r="14" fill="var(--acc)" ${D(2.8)}/><circle cx="166" cy="86" r="14" fill="var(--acc)" ${D(2.8)}/><circle cx="34" cy="86" r="6" fill="var(--acc2)"/><circle cx="166" cy="86" r="6" fill="var(--acc2)"/>`):"").join("")}</g>`}const el="var(--line)",zd="#f7f3ee",Ei="#3d3150",or="#f7f1e8",ma="#4a2f5e",Ji="#2f2433";function ah(e,t,n){return`<path d="${e}" fill="none" stroke="${el}" stroke-width="${S(n+7)}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function UL(e){const[t,n]=Yt[e],[s,o]=_n[e],i=e==="l"?-1:1,a=(t+s)/2+6*i;return`M${t-2*i} ${n-2} Q${a} ${(n+o)/2-6} ${s-i} ${o-16}`}function qm(e,t,n){return["l","r"].map(s=>{const o=ah(UL(s),e,21)+(n?n(s):"");return Ps("arm",s,o,t).replace('class="arm ','class="arm sleeve ')}).join("")}function Fm(e,t,n){return["l","r"].map(s=>{const o=s==="l"?-1:1,i=s==="l"?88:112,a=ah(`M${i} 238 L${i+o} 280`,e,24)+(n?n(s,i):"");return Ps("leg",s,a,t)}).join("")}const jm="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z";function fi(e,t){return t.hip?`<g transform="rotate(${S(t.hip)} 100 238)">${e}</g>`:e}function zL(e,t){const n="#ffd166",s=`<path d="${jm}" fill="${n}" ${D(3)}/>`,o=`<path d="M78 188 H122 V232 H78 Z" fill="${e}" ${D(2.8)}/><path d="M88 200 H112 V216 Q100 220 88 216 Z" fill="none" stroke="#3a1d3c" stroke-width="2.4" opacity=".3" stroke-linejoin="round"/><path d="M74 166 L82 190 M126 166 L118 190" stroke="${el}" stroke-width="10" stroke-linecap="round"/><path d="M74 166 L82 190 M126 166 L118 190" stroke="${e}" stroke-width="5.5" stroke-linecap="round"/><circle cx="82" cy="192" r="4" fill="#c9ced6" ${D(1.6)}/><circle cx="118" cy="192" r="4" fill="#c9ced6" ${D(1.6)}/>`,i=`<path d="M66 228 H134 L136 248 Q100 256 64 248 Z" fill="${e}" ${D(3)}/>`,a=qm(n,t,l=>{const[c,d]=_n[l];return`<path d="M${c-9} ${d-12} h18" stroke="#3a1d3c" stroke-width="2" opacity=".25" stroke-linecap="round"/>`});return{back:"",over:Fm(e,t,(l,c)=>`<path d="M${c-11} 276 h22" stroke="#3a1d3c" stroke-width="2.4" opacity=".25" stroke-linecap="round"/>`)+fi(a+s+i+o,t),head:"",sleeve:n}}function QL(e){const t=70-Math.min(10,di(e)/2),n=`<path d="M38 ${t+10} Q100 ${t-8} 162 ${t+10}" fill="none" stroke="${el}" stroke-width="13" stroke-linecap="round"/><path d="M38 ${t+10} Q100 ${t-8} 162 ${t+10}" fill="none" stroke="#6b6f7a" stroke-width="7.5" stroke-linecap="round"/>`,s=o=>`<circle cx="${o}" cy="${t}" r="17" fill="#c9ced6" ${D(3)}/><circle cx="${o}" cy="${t}" r="10.5" fill="#bfe3f2" ${D(2)}/><path d="M${o-5} ${t-4} q3 -4 8 -3" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`;return`<g data-costume-part="goggles">${n}${s(80)}${s(120)}<path d="M96 ${t} h8" stroke="${el}" stroke-width="5" stroke-linecap="round"/></g>`}function NL(e){const t=60-di(e),n=Math.max(30,Math.min(56,t-4)),s=t-n;return`<g data-costume-part="witch-hat"><path d="M64 ${t-2} Q82 ${t-n*.45} 92 ${s+8} Q98 ${s-2} 114 ${s+4} Q104 ${s+10} 106 ${s+n*.4} L136 ${t-2} Z" fill="${ma}" ${D(3)}/><path d="M70 ${t-10} Q100 ${t-16} 130 ${t-10} L133 ${t-3} Q100 ${t-9} 67 ${t-3} Z" fill="#ff9f43" ${D(2.2)}/><path d="M24 ${t+2} Q100 ${t-16} 176 ${t+2} Q100 ${t+12} 24 ${t+2} Z" fill="${ma}" ${D(3)}/><path d="M118 ${t-24} l2.6 5.4 5.8 .8 -4.2 4 1 5.8 -5.2 -2.8 -5.2 2.8 1 -5.8 -4.2 -4 5.8 -.8 Z" fill="#ffd166" ${D(1.4)}/></g>`}function qL(e){const t=di(e);return`<g data-costume-part="cat-ears" transform="translate(0 ${S(-t)})"><path d="M52 66 L64 20 L90 56 Z" fill="${Ji}" ${D(2.8)}/><path d="M110 56 L136 20 L148 66 Z" fill="${Ji}" ${D(2.8)}/><path d="M61 56 L66 34 L80 52 Z" fill="#f4a3c8"/><path d="M120 52 L134 34 L139 56 Z" fill="#f4a3c8"/><path d="M50 72 Q100 46 150 72" fill="none" stroke="${Ji}" stroke-width="6" stroke-linecap="round"/></g>`}function FL(e){return fi(`<g data-costume-part="cat-tail">${ah("M118 232 Q156 240 162 206 Q166 178 182 172",Ji,11)}<circle cx="182" cy="172" r="6" fill="${Ji}"/></g>`,e)}function jL(e){const t=[30,50,70,90,110,130,150,170];let n="";for(let i=t.length-1;i>0;i--)n+=` Q${t[i]-10} ${i%2?276:266} ${t[i-1]} 262`;const s=`M64 166 Q70 154 100 152 Q130 154 136 166 Q164 196 170 262${n} Q36 196 64 166 Z`;return{back:"",over:fi(`<g data-costume-part="ghost-sheet"><path d="${s}" fill="${zd}" ${D(3)}/><path d="M70 190 Q60 230 58 258 M130 190 Q140 230 142 258 M100 190 V250" fill="none" stroke="#3a1d3c" stroke-width="2.4" opacity=".12" stroke-linecap="round"/></g>`,e),head:"",sleeve:zd,coversArms:!0}}function ZL(e){const n=30-Math.min(16,di(e));return`<g data-costume-part="ghost-hood"><path d="${`M30 112 Q28 ${n} 100 ${n} Q172 ${n} 170 112 Q172 150 150 170 Q100 182 50 170 Q28 150 30 112 Z`} M54 116 Q54 76 100 74 Q146 76 146 116 Q146 152 100 156 Q54 152 54 116 Z" fill="${zd}" fill-rule="evenodd" ${D(3)}/><path d="M44 96 Q48 ${n+26} 84 ${n+12}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/></g>`}function GL(e){const t=`<path d="${jm}" fill="${Ei}" ${D(3)}/>`,n=`<g data-costume-part="ribs" fill="none" stroke="${or}" stroke-linecap="round"><path d="M100 172 V226" stroke-width="6"/>`+[184,198,212].map((r,l)=>`<path d="M${80+l*2} ${r} Q90 ${r-5} 100 ${r}  M${120-l*2} ${r} Q110 ${r-5} 100 ${r}" stroke-width="5.5"/>`).join("")+'<path d="M86 232 Q100 224 114 232" stroke-width="6"/></g>',s=(r,l,c,d)=>`<path d="M${S(r)} ${S(l)} L${S(c)} ${S(d)}" stroke="${or}" stroke-width="5" stroke-linecap="round"/><circle cx="${S(r)}" cy="${S(l)}" r="4" fill="${or}"/><circle cx="${S(c)}" cy="${S(d)}" r="4" fill="${or}"/>`,o=qm(Ei,e,r=>{const[l,c]=Yt[r],[d,f]=_n[r];return s(l+(d-l)*.2,c+(f-c)*.2,l+(d-l)*.72,c+(f-c)*.72)}),i=`<path d="M66 230 H134 L136 248 Q100 256 64 248 Z" fill="${Ei}" ${D(3)}/>`;return{back:"",over:Fm(Ei,e,(r,l)=>s(l,246,l+(r==="l"?-1:1),274))+fi(o+i+t+n,e),head:"",sleeve:Ei}}function YL(e){const t=n=>{const s=o=>S(100+n*o);return`M${s(20)} 166 Q${s(60)} 168 ${s(84)} 186 Q${s(90)} 220 ${s(80)} 256 Q${s(68)} 244 ${s(58)} 256 Q${s(48)} 242 ${s(36)} 254 Q${s(28)} 240 ${s(14)} 250 Z`};return fi(`<g data-costume-part="bat-cape"><path d="${t(-1)}" fill="${ma}" ${D(3)}/><path d="${t(1)}" fill="${ma}" ${D(3)}/><path d="M40 190 Q44 220 52 240 M160 190 Q156 220 148 240" fill="none" stroke="#fff" stroke-width="2.4" opacity=".18" stroke-linecap="round"/></g>`,e)}function KL(e){return fi(`<g data-costume-part="bat-collar"><path d="M78 164 Q72 152 82 146 L92 160 Z M122 164 Q128 152 118 146 L108 160 Z" fill="${ma}" ${D(2.4)}/><circle cx="100" cy="166" r="5" fill="#ff9f43" ${D(1.8)}/></g>`,e)}function Zm(e,t,n){const s={back:"",over:"",head:"",sleeve:null};if(e.indexOf("helper-")===0){const o=zr[e.slice(7)]??zr.yellow;return{...zL(o,t),head:QL(n)}}return e==="witch"?{...s,head:NL(n)}:e==="cat"?{...s,back:FL(t),head:qL(n)}:e==="ghost"?{...jL(t),head:ZL(n)}:e==="skeleton"?GL(t):e==="bat"?{...s,back:YL(t),over:KL(t)}:s}const XL=[{hip:1.5,head:4,armL:3,armR:-2,legL:0,legR:-3,legLLift:0,legRLift:0},{hip:-2,head:-5,armL:1,armR:-7,legL:4,legR:0,legLLift:2,legRLift:0},{hip:0,head:3,armL:2,armR:-2,legL:0,legR:0,legLLift:0,legRLift:0},{hip:-1.5,head:-4,armL:4,armR:-1,legL:5,legR:0,legLLift:3,legRLift:0}],JL={puffs:0,afro:0,pony:1,sidepony:1,pigtails:1,halfup:1,braids:2,boxbraids:2,locs:2,sidebraid:2,crown:2,buns:3,topbun:3,lowbun:3};function rh(e){const t=e.hair||"buns";let n=JL[t];if(n===void 0){let s=0;for(let o=0;o<t.length;o++)s=(s+t.charCodeAt(o))%4;n=s}return XL[n]}function e7(e){const t=(n,s,o,i,a)=>{const r=Dd(n,s,o,i,a),l=Dd(r.x,r.y,100,238,e.hip);return{x:l.x/2,y:l.y/2}};return{left:t(_n.l[0],_n.l[1],Yt.l[0],Yt.l[1],e.armL),right:t(_n.r[0],_n.r[1],Yt.r[0],Yt.r[1],e.armR)}}function t7(e){const t=Dd(100,244,100,238,e.hip);return Math.round(t.y/2*10)/10}function lh(e){const t=parseInt(e.slice(1),16);return(t>>16&255)+(t>>8&255)+(t&255)}function n7(e){const t=Ki(e,.32);return lh(t)<80?"#5a3a2c":t}function s7(e){return lh(e)<140?"#3b2340":Ki(e,.12)}let lp=0;function o7(){return lp+=1,"a"+lp.toString(36)}function cs(e,t){return t.hip?`<g transform="rotate(${S(t.hip)} 100 238)">${e}</g>`:e}function Io(e,t,n=!1){const s=t.head?`<g transform="rotate(${S(t.head)} 100 158)">${e}</g>`:e;return cs(`<g${n?' class="dollhead" data-dollhead="1"':' class="dollhead"'}>${s}</g>`,t)}function i7(e,t,n){let s=`<defs><radialGradient id="${e}b"><stop offset="0" style="stop-color:var(--blush)" stop-opacity=".62"/><stop offset=".55" style="stop-color:var(--blush)" stop-opacity=".28"/><stop offset="1" style="stop-color:var(--blush)" stop-opacity="0"/></radialGradient>`;return s+=`<radialGradient id="${e}s"><stop offset="0" stop-color="#3a1d3c" stop-opacity=".3"/><stop offset=".6" stop-color="#3a1d3c" stop-opacity=".12"/><stop offset="1" stop-color="#3a1d3c" stop-opacity="0"/></radialGradient>`,s+=`<radialGradient id="${e}k" cx=".42" cy=".36" r=".75"><stop offset=".55" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".16"/></radialGradient>`,t&&(s+=`<linearGradient id="${e}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f1020" stop-opacity=".62"/><stop offset=".5" stop-color="#1f1020" stop-opacity=".05"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`,s+=`<linearGradient id="${e}c" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="146" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".2"/></linearGradient>`,s+=`<radialGradient id="${e}h" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1f1020" stop-opacity=".28"/></radialGradient>`),s+n+"</defs>"}function a7(e){const t=e==="l"?-1:1,n=Yt[e][0],s=Yt[e][1],o=_n[e][0],i=_n[e][1],a=o-t,r=i-7,l=-t;let c=`<path d="${Hd([n,s],[a,r],18,13,-3*t)}" fill="var(--skin)" ${D(3)}/>`;return c+=`<path class="hand" d="M${S(o-8)} ${S(i-4)} Q${S(o-8)} ${S(i-10)} ${S(o)} ${S(i-10)} Q${S(o+8)} ${S(i-10)} ${S(o+8)} ${S(i-3)} Q${S(o+8.5)} ${S(i+9)} ${S(o)} ${S(i+9.5)} Q${S(o-8.5)} ${S(i+9)} ${S(o-8)} ${S(i-4)} Z" fill="var(--skin)" ${D(2.8)}/>`,c+=`<ellipse cx="${S(o+7*l)}" cy="${S(i-1)}" rx="3.4" ry="5" fill="var(--skin)" ${D(2.4)} transform="rotate(${-20*l} ${S(o+7*l)} ${S(i-1)})"/>`,c+=`<path d="M${S(o-3*l)} ${S(i+3)} v4 M${S(o+.5*l)} ${S(i+3.5)} v4" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`,c+=`<ellipse cx="${S(o-3*l)}" cy="${S(i-5)}" rx="3" ry="1.8" fill="#fff" opacity=".35"/>`,c}function cp(e){const t={rest:"",l:"",r:""},n=/<g class="arm sleeve (l|r) hang"[^>]*>/g,s=/<g[\s>]|<\/g>/g;let o=0,i;for(;i=n.exec(e);){const a=i[1];let r=1,l=-1,c;for(s.lastIndex=i.index+i[0].length;c=s.exec(e);)if(r+=c[0]==="</g>"?-1:1,r===0){l=c.index;break}if(l<0)break;t.rest+=e.slice(o,i.index),t[a]+=e.slice(i.index+i[0].length,l),o=l+4,n.lastIndex=o}return t.rest+=e.slice(o),t}function dp(e,t,n){const s=t?`<g class="arm sleeve ${e} hang">${t}</g>`:"";return Ps("arm",e,`<g class="hand">${a7(e)}</g>${s}`,n)}function fp(e){const t=e==="l"?-1:1,n=e==="l"?88:112;let s=`<path d="${Hd([n,234],[n+t,294],21,15,1.5*t)}" fill="var(--skin)" ${D(3)}/>`;return s+=`<path d="${Hd([n+5*t,244],[n+5*t,290],6,4)}" ${mt}/>`,s+=`<ellipse cx="${S(n+.5*t)}" cy="268" rx="4.5" ry="2.6" fill="#3a1d3c" opacity=".12"/>`,s+=`<path d="M${n-4} 265 q4 -2.5 8 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`,s}function hp(e,t,n,s,o,i){const a=n?-1:1,r=o==="big"||o==="bright"?1.08:o==="soft"?.94:1,l=(b,g)=>`${S(e+b*r)} ${S(t+g*r)}`,c=13.5*r,d=17*r;let f="";if(i&&o!=="soft"){const b=[.35,.95,1.57,2.2,2.8];for(let g=0;g<b.length;g++){const y=b[g];f+=`<path d="M${S(e+5.5*Math.cos(y)*r)} ${S(t+(4+6.5*Math.sin(y))*r)} L${S(e+11.5*Math.cos(y)*r)} ${S(t+(2+14*Math.sin(y))*r)}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>`}}const u=o==="soft"?2:2.6,p=o==="soft"?"":`<path d="M${l(-16*a,-8)} q${S(-6*a*r)} -2 ${S(-9*a*r)} ${S(-9*r)} M${l(-17*a,-2)} q${S(-6*a*r)} ${S(-.5*r)} ${S(-10*a*r)} ${S(-5*r)} M${l(-12*a,-15)} q${S(-3*a*r)} ${S(-4*r)} ${S(-4*a*r)} ${S(-9*r)}" fill="none" stroke="var(--lash)" stroke-width="2.2" stroke-linecap="round"/>`,m=o==="sparkle"||o==="bright"?`<path d="M${l(-9*a,-8)} l.7 1.6 1.6 .7 -1.6 .7 -.7 1.6 -.7 -1.6 -1.6 -.7 1.6 -.7 Z" fill="#fff" opacity=".9"/>`:"",k=i?`<ellipse cx="${e}" cy="${S(t+r)}" rx="${S(c)}" ry="${S(d)}" fill="url(#${s}i)"/>`:"",w=o==="sleepy"?`<path d="M${l(-17,-4)} Q${e} ${S(t+r)} ${l(17,-4)} L${l(18,-16)} Q${e} ${S(t-20*r)} ${l(-18,-16)} Z" fill="var(--skin)"/>`:"";return`<path d="M${l(-16,-2)} Q${l(-16,-20)} ${l(0,-20)} Q${l(16,-20)} ${l(16,-2)} Q${l(16,19)} ${l(0,19)} Q${l(-16,19)} ${l(-16,-2)} Z" fill="#fff"/><path d="M${l(-15,-4)} Q${e} ${S(t-21*r)} ${l(15,-4)} Q${e} ${S(t-14*r)} ${l(-15,-4)} Z" fill="#3a1d3c" opacity=".12"/><ellipse data-iris="1" cx="${e}" cy="${S(t+r)}" rx="${S(c)}" ry="${S(d)}" fill="var(--eye)"/>${k}${f}<ellipse cx="${e}" cy="${S(t+3*r)}" rx="${S(7*r)}" ry="${S(9*r)}" fill="#1f1020" opacity=".8"/><ellipse cx="${e}" cy="${S(t+r)}" rx="${S(11.3*r)}" ry="${S(14.8*r)}" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/><ellipse cx="${e}" cy="${S(t+r)}" rx="${S(c)}" ry="${S(d)}" fill="none" stroke="#1f1020" stroke-width="2" opacity=".55"/><path d="M${l(-9,12)} Q${e} ${S(t+19.5*r)} ${l(9,12)} Q${e} ${S(t+15.5*r)} ${l(-9,12)} Z" fill="#fff" opacity=".5"/><ellipse cx="${S(e-6*a*r)}" cy="${S(t-6*r)}" rx="${S(5.8*r)}" ry="${S(6.8*r)}" fill="#fff" transform="rotate(${-15*a} ${S(e-6*a*r)} ${S(t-6*r)})"/><circle cx="${S(e+6*a*r)}" cy="${S(t+8*r)}" r="${S(2.8*r)}" fill="#fff"/><circle cx="${S(e-4*a*r)}" cy="${S(t+10*r)}" r="${S(1.3*r)}" fill="#fff" opacity=".85"/><path d="M${l(7*a,-10)} l${S(r)} ${S(2.4*r)} ${S(2.4*r)} ${S(r)} ${S(-2.4*r)} ${S(r)} ${S(-r)} ${S(2.4*r)} ${S(-r)} ${S(-2.4*r)} ${S(-2.4*r)} ${S(-r)} ${S(2.4*r)} ${S(-r)} Z" fill="#fff"/>`+m+w+`<path d="M${l(-17,-1)} Q${l(-16,-21)} ${l(0,-21)} Q${l(16,-21)} ${l(17,-3)} Q${l(14.5,-18.6)} ${l(0,-18.8)} Q${l(-14.5,-18.6)} ${l(-15.5,-1)} Z" fill="var(--lash)" stroke="var(--lash)" stroke-width="${u}" stroke-linejoin="round"/>`+p+`<path d="M${l(-11,-23)} Q${e} ${S(t-27*r)} ${l(11,-23)}" fill="none" stroke="var(--line)" stroke-width="1.3" stroke-linecap="round" opacity=".22"/><path d="M${l(-5,20.5)} Q${e} ${S(t+22*r)} ${l(5,20.5)}" fill="none" stroke="var(--lash)" stroke-width="1.3" stroke-linecap="round" opacity=".28"/>`}function r7(e,t,n,s=!1){const o=e.blush?`<ellipse cx="64" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><ellipse cx="136" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><path d="M60 133 l3 -3 M66 134 l3 -3 M132 133 l3 -3 M138 134 l3 -3" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>`:"";let i="";if(e.freckles){const a=[[58,132],[64,136],[70,131],[130,131],[136,136],[142,132]];for(let r=0;r<a.length;r++)i+=`<circle cx="${a[r][0]}" cy="${a[r][1]}" r="1.5" fill="var(--freckle)" opacity=".7"/>`}return o+i+'<path data-brow="l" d="M64 86 Q74 80 85 84" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/><path data-brow="r" d="M115 84 Q126 80 136 86" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'+hp(76,112,!1,t,s?"sleepy":e.eyes,n)+hp(124,112,!0,t,s?"sleepy":e.eyes,n)+'<path d="M98 131 q2 1.8 4 0" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" opacity=".55"/><ellipse cx="101.5" cy="128.5" rx="1.6" ry="1" fill="#fff" opacity=".6"/><path d="M92 140 Q100 147.5 108 140" fill="none" stroke="var(--line)" stroke-width="2.8" stroke-linecap="round"/><path d="M96 142.6 Q100 145.4 104 142.6 Q100 144 96 142.6 Z" fill="#ff8fa8"/>'}function l7(e){const t="M40 102 Q38 38 100 38 Q162 38 160 102 Q160 140 132 153 Q116 160 100 160 Q84 160 68 153 Q40 140 40 102 Z";return`<ellipse cx="39" cy="114" rx="9" ry="11" fill="var(--skin)" ${D(3)}/><ellipse cx="161" cy="114" rx="9" ry="11" fill="var(--skin)" ${D(3)}/><ellipse cx="40" cy="115" rx="4" ry="6" ${Od}/><ellipse cx="160" cy="115" rx="4" ry="6" ${Od}/><path d="${t}" fill="var(--skin)" ${D(3.2)}/><path d="${t}" fill="url(#${e}k)"/>`}function c7(){return`<path d="M91 146 h18 v22 q-9 5 -18 0 Z" fill="var(--skin)" ${D(3)}/><path d="M91 150 h18 v9 q-9 6 -18 0 Z" ${Od}/><path d="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z" fill="var(--skin)" ${D(3)}/>`}function Qd(e,t){const n=Bs(e),s=t?.pose??rh(n),o=t?.rich!==!1,i=t?.uid??o7(),a=t7(s),r=n.shoesC,l=r.toLowerCase()==="#ffffff"?n.dress?n.dressC:n.topC:sp(r,.28),c=n.dress?n.dressC:n.topC,d=lh(c)>700?"#8fdcc0":Ki(c,.18),f=["--line:#5a3d5c",`--skin:${n.skin}`,`--hair:${n.hairC}`,`--hair-shade:${n7(n.hairC)}`,`--brow:${s7(n.hairC)}`,`--eye:${n.eyeC}`,"--lash:#3b2340","--blush:#ff6f91",`--freckle:${Ki(n.skin,.35)}`,`--top:${c}`,`--top-trim:${d}`,`--bottom:${n.dress?n.dressC:n.bottomC}`,`--bottom-trim:${Ki(n.dress?n.dressC:n.bottomC,.16)}`,`--shoe:${r}`,`--shoe-trim:${l}`,"--sock:#ffffff",`--acc:${n.accC}`,`--acc2:${sp(n.accC,.18)}`,"--frame:#6e4a5e"].join(";"),u=Ps("leg","l",fp("l"),s)+Ps("leg","r",fp("r"),s),p=t?.poseName==="sit"||t?.poseName==="lie"?t.poseName:null,m=t?.costume?Zm(t.costume,s,n.hair):null,k=n.dress?BL(s,n,i,o,a):RL(s,n,i,o,a),w=cp(k),b=m&&!m.coversArms?cp(m.over):null,g=!!b&&(b.l||b.r),y=g?b:w,_=dp("l",y.l,s)+dp("r",y.r,s),T=!!m?.coversArms,x=`<g data-layer="body">${u}${cs(c7()+(T?_:""),s)}${Io(l7(i),s,!0)}</g>`,$=w.rest,I=T?"":`<g data-layer="arms">${cs(_,s)}</g>`,N=`<g class="shadow"><ellipse cx="100" cy="308" rx="52" ry="9" fill="url(#${i}s)"/><ellipse cx="87" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/><ellipse cx="113" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/></g>`,U=WL(i,n.hair,n.acc),F=U?` mask="url(#${i}hm)"`:"",oe=[`<g data-layer="hair-back">${Io(`<g${F}>${PL(n.hair,i,o)}</g>`,s)}</g>`,x,DL(s,n),cs(CL(s,n,i,o),s),cs($,s),cs(IL(s,n,i,o),s),`<g data-layer="costume">${m?g?b.rest:m.over:""}</g>`,I,`<g data-layer="face">${Io(r7(n,i,o,t?.poseName==="lie"),s)}</g>`,`<g data-layer="hair-front">${Io(`<g${F}>${AL(n.hair,i,o)}</g>`,s)}</g>`,Io(VL(n),s)];t?.holding&&oe.splice(oe.findIndex(B=>B.indexOf('data-layer="face"')>=0),0,cs(Aa("under",!0,n.skin,p,m?.sleeve??c),s)),m&&(m.head&&oe.push(`<g data-layer="costume-head">${Io(m.head,s)}</g>`),m.back&&oe.splice(1,0,`<g data-layer="costume-back">${m.back}</g>`));const Ee=oe.filter(B=>B&&B!=='<g data-layer="costume"></g>').join(""),ze=n.dress||n.top,be=t?.poseName?` data-pose="${t.poseName}"`:"",O=t?.costume?` data-costume="${t.costume}"`:"";return`<svg${be}${O} data-chibi="1" data-hair="${n.hair}" data-top="${ze}" viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" style="${f}">${i7(i,o,U)}${N}${Ee}</svg>`}function up(e,t,n){const s=Bs(e),o=Fl(t)??rh(s),i=t==="sit"||t==="lie"?t:null,a=(n?Zm(n,o,s.hair).sleeve:null)??(s.dress?s.dressC:s.topC);return`<svg viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">${cs(Aa("over",!0,s.skin,i,a),o)}</svg>`}function tl(){try{return typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("selector(&)")}catch{return!1}}function Ba(e,t,n){const s=!!(t&&t.look2);e.classList.toggle("chibi",s);const o=s&&tl();e.classList.toggle("chibi-move",s&&(o||n)),e.classList.toggle("chibi-bob",s&&!o&&!n)}function Gm(e){return e.look2?Lb(e):null}const rt="#5a3d5c",$e=`stroke="${rt}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,d7=["little","kid","adult"],As={little:.78,kid:1,adult:1.28},Hi={left:{x:15,y:113},right:{x:85,y:113}};function Gl(e,t){return e.look2?e7(t??rh(e.look2)):t?{left:{x:22,y:96},right:{x:78,y:96}}:Hi}function Ym(e,t){return e===1?`<path d="M62 16 L76 8 L76 26 Z M62 16 L50 6 L48 24 Z" fill="#ff7aa8" stroke="${rt}" stroke-width="3" stroke-linejoin="round"/><circle cx="62" cy="16" r="5" fill="#ffd166" stroke="${rt}" stroke-width="3"/>`:e===2?`<circle cx="40" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${rt}" stroke-width="3"/><circle cx="60" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${rt}" stroke-width="3"/><path d="M49 48 h2" stroke="${rt}" stroke-width="3"/>`:e===3?`<path d="M20 30 Q22 8 50 8 Q78 8 80 30 Z" fill="${t}" stroke="${rt}" stroke-width="3.5" stroke-linejoin="round"/><path d="M60 28 Q84 26 92 32 Q80 36 60 34 Z" fill="${t}" stroke="${rt}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="9" r="4" fill="#fff" stroke="${rt}" stroke-width="3"/>`:""}function nl(e,t,n){return n?e===1?`<path d="M20 40 Q16 86 30 92 L70 92 Q84 86 80 40 Z" fill="${t}" ${$e}/>`:e===2?`<circle cx="18" cy="34" r="12" fill="${t}" ${$e}/><circle cx="82" cy="34" r="12" fill="${t}" ${$e}/>`:e===3?`<circle cx="50" cy="8" r="13" fill="${t}" ${$e}/>`:"":e===3?`<path d="M22 42 Q20 14 50 12 Q80 14 78 42 Q66 26 50 30 Q34 26 22 42 Z" fill="${t}" ${$e}/>`:`<path d="M21 46 Q18 12 50 12 Q82 12 79 46 Q72 30 58 28 Q50 36 36 30 Q26 34 21 46 Z" fill="${t}" ${$e}/>`}function St(e,t,n){const s=Fl(t),o=Gm(e);return o&&e.look2?Qd(e.look2,{rich:tl(),pose:s??void 0,poseName:t||void 0,holding:n,costume:o}):e.look2?Qd(e.look2,{rich:tl(),pose:s??void 0,poseName:t||void 0,holding:n}):t==="sit"||t==="lie"?f7(e,t,n):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${nl(e.hairStyle,e.hair,!0)}
  <rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${$e}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${$e}/>
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${rt}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${rt}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${$e} transform="rotate(12 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${$e} transform="rotate(-12 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${$e}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${$e}/>
  <circle cx="50" cy="44" r="30" fill="${e.skin}" ${$e}/>
  ${nl(e.hairStyle,e.hair,!1)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${rt}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${rt}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${$e} fill="none"/>
  ${Ym(e.acc??0,e.shirt)}
  <circle class="hand hang" cx="${Hi.left.x}" cy="${Hi.left.y}" r="6" fill="${e.skin}" ${$e}/><circle class="hand hang" cx="${Hi.right.x}" cy="${Hi.right.y}" r="6" fill="${e.skin}" ${$e}/>
  ${n?Aa("under",!1,ql(e.skin),null):""}
</svg>`}function Km(e,t){const n=t==="sit"||t==="lie"?t:null;if(n==="lie")return"";const s=Gm(e);return s&&e.look2?up(e.look2,t,s):e.look2?up(e.look2,t):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${Aa("over",!1,ql(e.skin),n)}</svg>`}function f7(e,t,n){const s=t==="sit"?`<rect class="leg" x="34" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${$e} transform="rotate(-68 40 112)"/>
  <rect class="leg" x="53" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${$e} transform="rotate(68 60 112)"/>`:`<rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${$e}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${$e}/>`,o=t==="lie"?`<path d="M34 48 Q40 52 46 48" fill="none" ${$e}/><path d="M54 48 Q60 52 66 48" fill="none" ${$e}/>`:`<ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${rt}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${rt}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>`,i=`<ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${nl(e.hairStyle,e.hair,!0)}
  ${s}
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${rt}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${rt}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${$e} transform="rotate(28 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${$e} transform="rotate(-28 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${$e}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${$e}/>
  <g class="dollhead">
  <circle class="dollhead" data-dollhead="1" cx="50" cy="44" r="30" fill="${e.skin}" ${$e}/>
  ${nl(e.hairStyle,e.hair,!1)}
  ${o}
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${$e} fill="none"/>
  ${Ym(e.acc??0,e.shirt)}
  </g>
  <circle class="hand hang" cx="22" cy="96" r="6" fill="${e.skin}" ${$e}/><circle class="hand hang" cx="78" cy="96" r="6" fill="${e.skin}" ${$e}/>
  ${n?Aa("under",!1,ql(e.skin),t):""}`;return`<svg data-pose="${t}" viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${i}</svg>`}const pp=[{id:"hair",name:"Hair"},{id:"face",name:"Face"},{id:"clothes",name:"Clothes"},{id:"shoes",name:"Shoes"},{id:"extras",name:"Extras"}],h7={id:"costume",name:"🎃 Costumes"};function u7(){return Ol()?[...pp,h7]:pp}function p7(e,t){const n=So(e),s=!!n&&n.startsWith("helper-"),o=Bs(t),i=(c,d,f,u)=>`<button type="button" class="avCosTile${f?" on":""}" data-act="av-costume" data-v="${c}" aria-pressed="${f}"><span class="avCosPic">${Qd(o,{uid:"cosT"+(u||"none"),rich:!1,costume:u||null})}</span><span class="avCosName">${d}</span></button>`,a=s?n:"helper-yellow",r=i("","No costume",!n,"")+i(a,fu.helper,s,a)+["witch","cat","ghost","skeleton","bat"].map(c=>i(c,fu[c],n===c,c)).join(""),l=Object.keys(zr).map(c=>`<button type="button" class="avSw${n==="helper-"+c?" on":""}" style="background:${zr[c]}" data-act="av-costume" data-v="helper-${c}" aria-label="${c} overalls"></button>`).join("");return`<h3>Costumes</h3><p class="avHint">Halloween dress-up! Tap one. Everyone in the room sees it.</p><div class="avCosGrid">${r}</div><h3>Helper overalls color</h3><div class="avColors avCosColors">${l}</div>`}const g7={short:"Short",pixie:"Pixie",coily:"Coily",afro:"Afro",bangs:"Bangs",bob:"Bob",wavybob:"Wavy bob",curlybob:"Curly bob",sidebangs:"Side bangs",long:"Long",wavy:"Wavy",braids:"Braids",boxbraids:"Box braids",locs:"Locs",sidebraid:"Side braid",crown:"Crown",pony:"Ponytail",sidepony:"Side pony",pigtails:"Pigtails",halfup:"Half-up",buns:"Buns",puffs:"Puffs",topbun:"Top bun",lowbun:"Low bun"},m7={classic:"Tee",stripes:"Stripes",hoodie:"Hoodie",sweater:"Sweater",tank:"Tank",puff:"Puff",ruffle:"Ruffle",button:"Buttons",jersey:"Jersey",cardigan:"Cardigan",bib:"Bib",raincoat:"Raincoat"},y7={pants:"Pants",jeans:"Jeans",shorts:"Shorts",skirt:"Skirt",tutu:"Tutu",leggings:"Leggings",overalls:"Overalls",joggers:"Joggers"},b7={"":"No dress",twirl:"Twirl",sundress:"Sundress",party:"Party",pinafore:"Pinafore",jumper:"Jumper",ballet:"Ballet",nightgown:"Nightgown",raindress:"Rain"},w7={classic:"Classic",sneakers:"Sneakers",lightup:"Light-up",boots:"Boots",rainboots:"Rain boots",sandals:"Sandals",maryjanes:"Mary Janes",slippers:"Slippers"},k7={round:"Round",big:"Big",sleepy:"Sleepy",sparkle:"Sparkle",soft:"Soft",bright:"Bright"},v7={glasses:"Glasses",square:"Square",sunnies:"Sunnies",bow:"Bow",bigbow:"Big bow",headband:"Headband",flower:"Flower",cap:"Cap",beanie:"Beanie",sunhat:"Sun hat",catears:"Cat ears",earmuffs:"Earmuffs"},_7={little:"Little",kid:"Kid",adult:"Grown-up"};let In="hair";function An(e,t,n,s){return`<button type="button" class="avOpt${s?" on":""}" data-act="${e}" data-v="${t}">${n}</button>`}function Er(e,t,n){return`<button type="button" class="avSw${n?" on":""}" style="background:${t}" data-act="${e}" data-v="${t}" aria-label="Color"></button>`}function Xs(e){return`<div class="avGrid">${e}</div>`}function Si(e,t){return`<div class="avColors">${Ut.map(n=>Er(e,n,n===t)).join("")}</div>`}function $7(e,t,n,s){const o=Bs(e.look2),i=e.id==="__me";In==="costume"&&!Ol()&&(In="hair");const a=In==="costume"?p7(e.costume,e.look2):In==="hair"?`<h3>Style</h3>${Xs(Sl.map(c=>An("av-hair",c,g7[c],o.hair===c)).join(""))}<h3>Color</h3><div class="avColors">${El.map(c=>Er("av-hairC",c,o.hairC===c)).join("")}</div>`:In==="face"?`<h3>Skin</h3><div class="avColors">${Ll.map(c=>Er("av-skin",c,o.skin===c)).join("")}</div><h3>Eyes</h3>${Xs(Cl.map(c=>An("av-eyes",c,k7[c],o.eyes===c)).join(""))}<h3>Eye color</h3><div class="avColors">${$f.map(c=>Er("av-eyeC",c,o.eyeC===c)).join("")}</div><div class="avToggles">${An("av-freckles",o.freckles?"0":"1","Freckles",o.freckles)}${An("av-blush",o.blush?"0":"1","Blush",o.blush)}</div>`:In==="clothes"?`<h3>Top</h3>${Xs(Tl.map(c=>An("av-top",c,m7[c],!o.dress&&o.top===c)).join(""))}${Si("av-topC",o.topC)}<h3>Bottom</h3>${Xs(Pl.map(c=>An("av-bottom",c,y7[c],!o.dress&&o.bottom===c)).join(""))}${Si("av-bottomC",o.bottomC)}<h3>Dress</h3>${Xs(Al.map(c=>An("av-dress",c,b7[c],o.dress===c)).join(""))}${Si("av-dressC",o.dressC)}`:In==="shoes"?`<h3>Shoes</h3>${Xs(Rl.map(c=>An("av-shoes",c,w7[c],o.shoes===c)).join(""))}${Si("av-shoesC",o.shoesC)}`:`<h3>Extras</h3><p class="avHint">Pick up to two</p>${Xs(Qo.map(c=>An("av-acc",c,v7[c],o.acc.indexOf(c)>=0)).join(""))}${Si("av-accC",o.accC)}`,r=d7.map(c=>`<button type="button" class="avOpt sz${c===e.size?" on":""}" data-act="size" data-v="${c}">${_7[c]}</button>`).join(""),l=i?'<div class="meNote">This is you!</div>':`<button type="button" class="del${n?" sure":""}" data-act="delc">${s}<span>${n?"Tap again":""}</span></button>`;return`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${t}<div class="dress avLook"><div class="avStageWrap"><div class="avStage chibi-move">${St(e)}</div>${l}<div class="avSizes">${r}</div></div><div class="avSide"><div class="avTabs">${u7().map(c=>`<button type="button" class="avTab${c.id===In?" on":""}" data-act="av-tab" data-v="${c.id}">${c.name}</button>`).join("")}</div><div class="avPane">${a}</div><div class="avBar"><button type="button" class="avSurprise" data-act="av-surprise">🎲 Surprise me</button><button type="button" class="avDone" data-act="close">Done</button></div></div></div>`}function x7(e,t,n){if(t==="av-tab")return(n==="hair"||n==="face"||n==="clothes"||n==="shoes"||n==="extras"||n==="costume"&&Ol())&&(In=n),null;const s=Bs(e);if(t==="av-hair"&&Sl.indexOf(n)>=0)return{...s,hair:n};if(t==="av-hairC")return{...s,hairC:n};if(t==="av-skin")return{...s,skin:n};if(t==="av-eyes"&&Cl.indexOf(n)>=0)return{...s,eyes:n};if(t==="av-eyeC")return{...s,eyeC:n};if(t==="av-freckles")return{...s,freckles:n==="1"};if(t==="av-blush")return{...s,blush:n==="1"};if(t==="av-top"&&Tl.indexOf(n)>=0)return{...s,top:n,dress:""};if(t==="av-topC")return{...s,topC:n};if(t==="av-bottom"&&Pl.indexOf(n)>=0)return{...s,bottom:n,dress:""};if(t==="av-bottomC")return{...s,bottomC:n};if(t==="av-dress"&&Al.indexOf(n)>=0)return{...s,dress:n};if(t==="av-dressC")return{...s,dressC:n};if(t==="av-shoes"&&Rl.indexOf(n)>=0)return{...s,shoes:n};if(t==="av-shoesC")return{...s,shoesC:n};if(t==="av-accC")return{...s,accC:n};if(t==="av-acc"&&Qo.indexOf(n)>=0){const o=n,i=s.acc.slice(),a=i.indexOf(o);if(a>=0)i.splice(a,1);else{const r=Ur(o),l=i.filter(c=>Ur(c)!==r);return l.push(o),{...s,acc:l.slice(0,2)}}return{...s,acc:i}}return null}function M7(){try{return typeof navigator<"u"&&navigator.webdriver&&!window.__forceAvatarIntro?!1:localStorage.getItem(vt("avatar-intro"))!=="1"}catch{return!1}}function L7(){try{localStorage.setItem(vt("avatar-intro"),"1")}catch{}}const Sr="#5a3d5c";function Oc(e,t,n,s,o){return`<path class="${e}" d="${t}" fill="none" stroke="${Sr}" stroke-width="${s}" stroke-linecap="round"/><path class="${e} cloth" d="${t}" fill="none" stroke="${n}" stroke-width="${o}" stroke-linecap="round"/>`}function E7(e){const t=Bs(e),n=t.skin,s=t.dress!=="",o=s||t.bottom==="skirt"||t.bottom==="tutu",i=o?n:t.bottomC,a=t.shoesC,r=s||t.bottom==="skirt"||t.bottom==="tutu";let l="";if(r){const u=s?t.dressC:t.bottomC;l+=`<path class="dress" d="M75 46 L89 46 L91 53 L73 53 Z" fill="${u}" stroke="${Sr}" stroke-width="1.1" stroke-linejoin="round"/>`}l+=Oc("thigh","M76 44 Q83 48 88 54",i,6.2,4.8),l+=`<circle class="knee" cx="88" cy="56" r="2.3" fill="${i}" stroke="${Sr}" stroke-width="1.1"/>`;const c=t.shoes==="boots"||t.shoes==="rainboots";l+=Oc("shin",c?"M88 58 Q90 64 91 68":"M88 58 Q90 65 91 70",o?n:i,5.8,4.4),!c&&(t.shoes==="sneakers"||t.shoes==="maryjanes"||t.shoes==="lightup")&&(l+=Oc("shin","M90 66 Q90.6 68 91 70","#ffffff",5.4,4));const d=t.shoes==="sandals"?n:a,f=c?66:69;return l+=`<path class="shoe" d="M90 ${f} Q90 ${f-2} 94 ${f-2} Q99 ${f-2} 100 ${f+1} Q100 ${f+5} 95 ${f+5} Q90 ${f+5} 90 ${f+2} Z" fill="${d}" stroke="${Sr}" stroke-width="1.1" stroke-linejoin="round"/>`,t.shoes==="sandals"&&(l+=`<path d="M90 ${f+5} L100 ${f+5}" stroke="${a}" stroke-width="1.3" stroke-linecap="round"/>`,l+=`<path d="M93 ${f} L97 ${f+3}" stroke="${a}" stroke-width="1.1" stroke-linecap="round"/>`),`<svg class="rideleg" viewBox="0 0 160 130">${l}</svg>`}let Ve=null,ln=null,co=null,vn=null,an=0,ea=0;const Dc=[261.63,293.66,329.63,392,440,523.25,587.33,659.25,783.99,880],sl=[[4,-1,5,4,2,-1,3,-1],[2,3,4,-1,3,2,0,-1],[5,-1,7,6,5,-1,4,-1],[3,2,1,-1,2,-1,0,-1]],gp=[130.81,98,110,98];function Xm(){try{return Ve??=Zf(new(window.AudioContext||window.webkitAudioContext)),ln||(ln=Ve.createGain(),ln.gain.value=.5,ln.connect(Ve.destination)),Ve.state==="suspended"&&Ve.resume().catch(()=>{}),!0}catch{return!1}}function ir(e,t,n,s,o){if(!Ve||!ln)return;const i=Ve.createOscillator(),a=Ve.createGain();i.type=s,i.frequency.setValueAtTime(e,t),a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(o,t+.03),a.gain.exponentialRampToValueAtTime(5e-4,t+n),i.connect(a).connect(ln),i.start(t),i.stop(t+n+.05)}function Jm(){if(!Ve||!co)return;if(document.hidden&&vn){clearInterval(vn),vn=null;return}if(!Gf||document.hidden){an=Ve.currentTime+.1;return}const e=Oe/2e3*(co==="musicbox"?1.35:1);for(an<Ve.currentTime&&(an=Ve.currentTime+.05);an<Ve.currentTime+.4;){const t=Math.floor(ea/8)%sl.length,n=ea%8,s=sl[t][n];co==="musicbox"?s>=0&&ir(Dc[Math.min(Dc.length-1,s+3)]*2,an,.9,"sine",.05):(s>=0&&ir(Dc[s],an,.5,"triangle",.045),n===0&&ir(gp[t],an,1.6,"sine",.06),n===4&&ir(gp[t]*1.5,an,1,"sine",.035)),ea++,an+=e}}function mp(e){if(e!==co){if(co=e,!co){if(vn&&(clearInterval(vn),vn=null),ln&&Ve){const t=ln.gain;t.cancelScheduledValues(Ve.currentTime),t.setValueAtTime(t.value,Ve.currentTime),t.linearRampToValueAtTime(1e-4,Ve.currentTime+.4)}return}!Xm()||!Ve||!ln||(ln.gain.cancelScheduledValues(Ve.currentTime),ln.gain.setValueAtTime(.5,Ve.currentTime+.42),ea=Math.floor(Date.now()/(Oe/2))%(sl.length*8),an=Ve.currentTime+.45,vn||(vn=setInterval(Jm,120)))}}function S7(){Xm()}Ag(()=>{co&&Ve&&!vn&&(ea=Math.floor(Date.now()/(Oe/2))%(sl.length*8),an=Ve.currentTime+.1,vn=setInterval(Jm,120))});const T7=2,P7=340,A7=380;function R7(e,t){const n=new Map;for(const[a,r]of t){if(r.kind!=="dance")continue;const l=e.find(c=>c.id===r.item);!l||!l.on||gs(l.kind)!=="stereo"||(n.get(r.item)??n.set(r.item,[]).get(r.item)).push(a)}let s=null;for(const a of[...n].sort((r,l)=>r[0]<l[0]?-1:1))a[1].length>=T7&&(!s||a[1].length>s[1].length)&&(s=a);if(!s)return null;const o=e.find(a=>a.id===s[0]),i=e.filter(a=>a.id!==o.id&&vf(a.kind)&&Math.hypot(a.x-o.x,(a.y-o.y)*1.5)<=P7).map(a=>a.id).sort();return{stereo:o.id,x:o.x,y:o.y,dancers:s[1].sort(),toys:i}}const C7="http://www.w3.org/1999/xhtml",yp=new Map;function Nd(e){if(e.startsWith("data:"))return Promise.resolve(e);let t=yp.get(e);return t||(t=(async()=>{try{const n=new URL(e,location.href);if(n.origin!==location.origin)return"";const o=await(await fetch(n.href,{credentials:"same-origin"})).blob();return await new Promise(i=>{const a=new FileReader;a.onload=()=>i(String(a.result)),a.onerror=()=>i(""),a.readAsDataURL(o)})}catch{return""}})(),yp.set(e,t)),t}const qd=/url\((['"]?)([^'")]+)\1\)/g;async function bp(e,t,n){const s=new Map;for(const i of e.matchAll(qd)){const a=i[2];if(a.startsWith("data:")||a.startsWith("#"))continue;let r=a;try{r=new URL(a,t).href}catch{}s.set(a,r)}const o=new Map;return await Promise.all([...s].map(async([i,a])=>o.set(i,n(a)?await Nd(a):""))),e.replace(qd,(i,a,r)=>{if(r.startsWith("data:")||r.startsWith("#"))return i;const l=o.get(r);return l?`url("${l}")`:"none"})}const I7=["transform","translate","rotate","scale","opacity","filter"];async function B7(e,t){const n=e.offsetWidth,s=e.offsetHeight,o=new Map;for(const _ of document.getAnimations()){const T=_.effect?.target;if(!T||!(e===T||e.contains(T))||_.effect.pseudoElement)continue;const x=getComputedStyle(T);o.set(T,I7.map($=>`${$}:${x.getPropertyValue($)}`).join(";"))}const i=new Set,a=_=>{for(const T of _.matchAll(qd))try{i.add(new URL(T[2],location.href).href)}catch{}},r=[e,...e.querySelectorAll("*")];for(const _ of r)a(getComputedStyle(_).backgroundImage),a(getComputedStyle(_,"::before").backgroundImage),a(getComputedStyle(_,"::after").backgroundImage);const l=e.cloneNode(!0),c=[l,...l.querySelectorAll("*")],d=[];r.forEach((_,T)=>{const x=c[T];if(!x)return;const $=o.get(_);$&&x.setAttribute("style",(x.getAttribute("style")||"")+";"+$);const I=x.getAttribute("style");if(I&&I.includes("url(")&&d.push(bp(I,location.href,()=>!0).then(N=>x.setAttribute("style",N))),_ instanceof HTMLImageElement&&x instanceof HTMLImageElement){const N=_.currentSrc||_.src;x.removeAttribute("srcset"),x.removeAttribute("loading"),d.push(Nd(N).then(U=>{U?x.src=U:x.removeAttribute("src")}))}else if(_ instanceof HTMLCanvasElement)try{const N=document.createElement("img");N.src=_.toDataURL(),N.setAttribute("style",getComputedStyle(_).cssText||`width:${_.offsetWidth}px;height:${_.offsetHeight}px`),N.className=_.className,x.replaceWith(N)}catch{}else if(_ instanceof SVGImageElement){const N=_.href.baseVal;N&&d.push(Nd(N).then(U=>{U&&x.setAttribute("href",U)}))}_.tagName==="BUTTON"&&_.classList.contains("nudge")&&x.setAttribute("style","display:none")}),l.style.transform="none",l.style.left="0",l.style.top="0",l.style.position="relative",l.style.margin="0";let f="";for(const _ of[...document.styleSheets])try{const T=[..._.cssRules].map(x=>x.cssText).join(`
`);f+=await bp(T,_.href||location.href,x=>i.has(x))}catch{}f=f.replace(/:root\b/g,".pbHtml")+`
*,*::before,*::after{animation:none!important;transition:none!important}`,await Promise.all(d);const u=document.documentElement,p=document.body,m=new XMLSerializer,k=`<div xmlns="${C7}" class="pbHtml ${u.className}" style="${wp(u.getAttribute("style")||"")};width:${n}px;height:${s}px;overflow:hidden"><style>${f.replace(/<\/style/gi,"<\\/style")}</style><body class="${wp(p.className)}" style="margin:0;width:${n}px;height:${s}px;overflow:hidden;background:transparent"><div id="app"><div class="stageWrap" style="position:relative;margin:0;padding:0;width:${n}px;height:${s}px;inset:auto;transform:none">`+m.serializeToString(l)+"</div></div></body></div>",w=`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${s}" viewBox="0 0 ${n} ${s}"><foreignObject x="0" y="0" width="${n}" height="${s}">${k}</foreignObject></svg>`,b="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(w),g=document.createElement("canvas");g.width=Math.round(n*t),g.height=Math.round(s*t);const y=g.getContext("2d");try{const _=new Image;_.decoding="sync",_.src=b,await _.decode().catch(()=>new Promise(T=>{_.onload=T,_.onerror=T})),y.drawImage(_,0,0,g.width,g.height),await new Promise(T=>setTimeout(T,60)),y.clearRect(0,0,g.width,g.height),y.drawImage(_,0,0,g.width,g.height)}finally{}return g}const wp=e=>e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");function O7(e,t=new Date,n=0){const s=e.width/600,o=Math.round(26*s),i=Math.round(64*s),a=document.createElement("canvas");a.width=e.width+o*2,a.height=e.height+o+i;const r=a.getContext("2d"),l=r.createLinearGradient(0,0,a.width,a.height);l.addColorStop(0,"#ffd6e8"),l.addColorStop(.5,"#fff1c9"),l.addColorStop(1,"#d9ecff"),r.fillStyle=l,Hc(r,0,0,a.width,a.height,30*s),r.fill(),r.lineWidth=5*s,r.strokeStyle="#5a3d5c",Hc(r,2.5*s,2.5*s,a.width-5*s,a.height-5*s,28*s),r.stroke(),r.save(),n>0&&(Hc(r,o,o,e.width,e.height,n),r.clip()),r.drawImage(e,o,o),r.restore();const c=["#ff7aa8","#ffd166","#7ec8ff","#b48cff","#8ee08e"];for(let d=0;d<26;d++){const u=d/26*a.width,p=d%2?o/2:a.height-i/2+(d%4-1.5)*8*s;r.fillStyle=c[d%5],r.beginPath(),r.arc(u+10*s,(d%2,p),4*s,0,Math.PI*2),r.fill()}return D7(r,o*1.2,a.height-i/2,14*s,"#ffd166"),H7(r,a.width-o*1.3,a.height-i/2,13*s,"#ff7aa8"),r.fillStyle="#5a3d5c",r.textAlign="center",r.textBaseline="middle",r.font=`800 ${Math.round(24*s)}px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif`,r.fillText("Our cozy house · "+t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),a.width/2,a.height-i/2),a}function Hc(e,t,n,s,o,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+s,n,t+s,n+o,i),e.arcTo(t+s,n+o,t,n+o,i),e.arcTo(t,n+o,t,n,i),e.arcTo(t,n,t+s,n,i),e.closePath()}function D7(e,t,n,s,o){e.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?s*.45:s;e.lineTo(t+Math.cos(a)*r,n+Math.sin(a)*r)}e.closePath(),e.fillStyle=o,e.fill(),e.lineWidth=s/5,e.strokeStyle="#5a3d5c",e.stroke()}function H7(e,t,n,s,o){e.beginPath(),e.moveTo(t,n+s*.9),e.bezierCurveTo(t-s*1.6,n-s*.2,t-s*.6,n-s*1.3,t,n-s*.4),e.bezierCurveTo(t+s*.6,n-s*1.3,t+s*1.6,n-s*.2,t,n+s*.9),e.fillStyle=o,e.fill(),e.lineWidth=s/5,e.strokeStyle="#5a3d5c",e.stroke()}function W7(e,t){const n=t.getBoundingClientRect(),s=t.parentElement?.getBoundingClientRect(),o=(p,m)=>p?(parseFloat(getComputedStyle(p).borderTopRightRadius)||0)*m:0,i=e.width/(n.width||1),a=e.height/(n.height||1),r=e.width/Math.max(1,t.offsetWidth);if(!s||!n.width)return{c:e,radius:o(t,r)};const l=Math.max(n.left,s.left,0),c=Math.max(n.top,s.top,0),d=Math.min(n.right,s.right,innerWidth),f=Math.min(n.bottom,s.bottom,innerHeight);if(d-l>=n.width-2&&f-c>=n.height-2)return{c:e,radius:o(t,r)};if(d<=l||f<=c)return{c:e,radius:o(t,r)};const u=document.createElement("canvas");return u.width=Math.round((d-l)*i),u.height=Math.round((f-c)*a),u.getContext("2d").drawImage(e,(l-n.left)*i,(c-n.top)*a,u.width,u.height,0,0,u.width,u.height),{c:u,radius:o(t.parentElement,i)}}const V7=()=>typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let Wc=!1;async function U7(e,t){if(!Wc){Wc=!0;try{const n=Math.min(2,Math.max(1,window.devicePixelRatio||1),1600/Math.max(1,e.offsetWidth)),s=B7(e,n),o=document.createElement("div");o.className="pbFlash"+(V7()?" soft":""),document.body.appendChild(o),t?.(),setTimeout(()=>o.remove(),700);const i=W7(await s,e),a=O7(i.c,new Date,i.radius),r=await new Promise(l=>a.toBlob(l,"image/png"));if(!r)return;z7(r)}catch(n){console.warn("photo booth",n)}finally{Wc=!1}}}function z7(e){document.querySelector(".pbCard")?.remove();const t=URL.createObjectURL(e),n="cozy-house-"+new Date().toISOString().slice(0,10)+".png",s=typeof File=="function"?new File([e],n,{type:"image/png"}):null,o=document.createElement("div");o.className="pbCard",o.setAttribute("role","dialog"),o.setAttribute("aria-label","Your photo"),o.innerHTML=`<div class="pbInner"><img class="pbImg" alt="Your photo" src="${t}"/><div class="pbBtns"><button type="button" class="pbSave">💾 Save</button><button type="button" class="pbClose">Close</button></div></div>`,document.body.appendChild(o);const i=()=>{o.remove(),setTimeout(()=>URL.revokeObjectURL(t),1e3)};o.querySelector(".pbClose").addEventListener("click",i),o.addEventListener("click",a=>{a.target===o&&i()}),o.querySelector(".pbSave").addEventListener("click",async()=>{const a=navigator;if(s&&a.share&&a.canShare?.({files:[s]}))try{await a.share({files:[s]});return}catch(l){if(l?.name==="AbortError")return}const r=document.createElement("a");r.href=t,r.download=n,document.body.appendChild(r),r.click(),r.remove()})}const Q7=/rug|lamp|light|plant|curtain|clock|window|lantern/;function N7(e){if(e.cat==="plants")return!0;const t=`${e.name} ${e.kind??""}`.toLowerCase();return Q7.test(t)}const e1=new Set(["pack:ring-light","pack:desk-lamp",...nk,...lk]);function t1(e,t=new Date){return e.pack===cg&&!dg(t)}function n1(e){const t=e.rooms??[];return t.includes("backyard")&&!t.includes("any")}function q7(e,t){if(t==="nursery"&&e.kind&&e1.has(e.kind))return!1;if(t==="backyard")return n1(e);if(t==="all"||!t)return!0;const n=e.rooms;return!n||n.length===0||n.includes(t)?!0:n.includes("any")?e.cat==="decor"||e.cat==="furniture"?N7(e):!0:!1}function F7(e,t,n,s,o){return e.secret&&!(o&&o.has(e.secret))||t1(e)||!s&&n==="backyard"&&!n1(e)||n==="nursery"&&e.kind&&e1.has(e.kind)?!1:t.startsWith("pack:")?e.pack===t.slice(5):e.cat!==t?!1:q7(e,s?"all":n)}const s1="cozy-candy",kp=["🍬","🍭","🍫","🍪","🧁","🍎"];function o1(e){try{const t=Number(e?.getItem(s1)??0);return Number.isFinite(t)&&t>0?Math.min(9999,Math.floor(t)):0}catch{return 0}}function j7(e,t=Math.random()){const n=Math.min(9999,o1(e)+1);try{e?.setItem(s1,String(n))}catch{}return{count:n,treat:kp[Math.floor(Math.max(0,Math.min(.999,t))*kp.length)]}}function i1(e=new Date,t=typeof location<"u"?location.search:""){return/[?&]halloween=0\b/.test(t)?!1:/[?&]halloween=1\b/.test(t)||dg(e)}function Z7(e){return`${String(e??"").replace(/[^\p{L}' -]/gu,"").replace(/\s+/g," ").trim().slice(0,30)||"A friend"} came trick-or-treating!`}const G7=200,Y7=170,K7=210,X7=420,J7=70,ol=12e3,e9=4200,t9=3,Vc=["wave","hop","heart"];function ya(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return(t>>>0)%1e4/1e4}const Uc=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5),n9=(e,t)=>e.id<t.id?-1:e.id>t.id?1:0;function s9(e,t,n,s){const o=ya(e+"|"+t+"|"+n)*ol;return(s+o)%ol<e9}function o9(e,t,n,s){const o=ya(e+"|"+t+"|"+n)*ol,i=Math.floor((s+o)/ol);return Vc[Math.floor(ya(e+t+n+i)*Vc.length)%Vc.length]}function i9(e,t,n,s,o){const i={pair:new Map,duet:new Map,nearBaby:new Map,babyCoo:!1,pets:new Map},a=[...t].sort(n9),r=new Set;for(const u of a){if(!u.dancingAt||r.has(u.id))continue;let p=null,m=1/0;for(const k of a){if(k===u||r.has(k.id)||k.dancingAt!==u.dancingAt)continue;const w=Uc(u,k);w<=Y7&&w<m&&(m=w,p=k)}if(p){const k=ya(e+u.id+p.id);i.duet.set(u.id,{with:p.id,face:p.x<u.x?-1:1,phase:k}),i.duet.set(p.id,{with:u.id,face:u.x<p.x?-1:1,phase:k}),r.add(u.id),r.add(p.id)}}const l=a.filter(u=>!u.busy&&!u.lying),c=[];for(let u=0;u<l.length;u++)for(let p=u+1;p<l.length;p++){const m=Uc(l[u],l[p]);m<=G7&&c.push({a:l[u],b:l[p],d:m})}c.sort((u,p)=>u.d-p.d||(u.a.id+u.b.id<p.a.id+p.b.id?-1:1));const d=new Set;for(const{a:u,b:p}of c){if(i.pair.size>=t9*2)break;if(d.has(u.id)||d.has(p.id)||(d.add(u.id),d.add(p.id),!s9(e,u.id,p.id,o)))continue;let m=o9(e,u.id,p.id,o);m==="hop"&&(u.seated||p.seated)&&(m="wave");const k=ya(e+u.id+p.id);i.pair.set(u.id,{kind:m,with:p.id,face:p.x<u.x?-1:1,phase:k}),i.pair.set(p.id,{kind:m,with:u.id,face:u.x<p.x?-1:1,phase:(k+.18)%1})}if(s)for(const u of a)!u.lying&&Uc(u,s)<=K7&&(i.nearBaby.set(u.id,s.x<u.x?-1:1),i.babyCoo=!0);const f=a.filter(u=>u.seated||u.lying);for(const u of[...n].sort((p,m)=>p.key<m.key?-1:1)){let p=null,m=1/0;for(const g of f){const y=Math.abs(g.x-u.x);y<=X7&&y<m&&(m=y,p=g)}if(!p)continue;const k=u.x<=p.x?-1:1,w=[...i.pets.values()].some(g=>g.toward===p.id),b=p.x+k*J7*(w?1.9:1);i.pets.set(u.key,{toward:p.id,dx:Math.round(b-u.x)})}return i}const vp=new Set(z0());function a1(e){const t=String(e||"").toLowerCase();return t?vp.has(t)||vp.has(t.startsWith("pack:")?t:"pack:"+t):!1}const a9={x:.28,y:.52,w:.5,h:.26};function r9(e){if(!a1(e.kind))return null;const t=e.scale??1,n=hn(e.kind)*t,s=e.h??n*.7,o=e.x-n/2,i=e.y-s,a=a9;let r=o+a.x*n,l=o+(a.x+a.w)*n;const c=i+a.y*s,d=i+(a.y+a.h)*s;if(e.flip){const f=e.x-(l-e.x),u=e.x-(r-e.x);r=f,l=u}return{l:r,t:c,r:l,b:d}}function l9(e){const t=r9(e);if(!t)return null;const n=e.flip?-1:1,o=(t.l+t.r)/2+n*((t.r-t.l)*.2+8),i=t.t+(t.b-t.t)*.72;return{x:o,y:i,away:n}}const zc=[{x:-28,y:26},{x:-102,y:26}];function c9(e,t){const n=[...t].sort(),s=new Map;for(let o=0;o<n.length;o++){const i=zc[o]??{x:zc[1].x-(o-1)*50,y:zc[1].y};s.set(n[o],{x:e.x+e.away*i.x,y:e.y+i.y})}return s}const _p=420;function d9(e,t,n){if(!e.length||!t.length||!n.length)return null;let s=null,o=1/0;for(const l of n)for(const c of t){const d=l9(c);if(!d)continue;const f=Math.hypot(l.x-c.x,l.y-c.y);f<o&&(o=f,s=d)}if(!s||o>380)return null;const i=e.filter(l=>n.some(c=>Math.hypot(l.x-c.x,l.y-c.y)<_p)||Math.hypot(l.x-s.x,l.y-s.y)<_p);if(!i.length)return null;const a=c9(s,i.map(l=>l.key)),r=new Map;for(const l of i){const c=a.get(l.key);c&&r.set(l.key,{dx:c.x-l.x,dy:c.y-l.y})}return r}const f9={play:Oe,listen:Oe*4,stir:Oe*2,swing:Oe*3,slide:Oe*4,look:Oe*5,kneel:Oe*3},h9={play:"<span>♪</span><span>♩</span>",listen:"<span>♪</span>"},u9={keys:"<span>♪</span><span>♫</span><span>♩</span>",stove:'<span class="steam"></span><span class="steam"></span><span class="steam"></span>',water:'<span class="bub"></span><span class="bub"></span><span class="ripple"></span>',ducky:""},ta=new Map;let Js=null;function p9(e){try{Js??=Zf(new(window.AudioContext||window.webkitAudioContext)),Js.state==="suspended"&&Js.resume().catch(()=>{});const t=Js.currentTime+.02,n=[523.25,587.33,659.25,783.99,880,1046.5];for(let s=0;s<6;s++){const o=Js.createOscillator(),i=Js.createGain();o.type="triangle",o.frequency.value=n[(e+s*(s%2?2:3))%n.length];const a=t+s*.28;i.gain.setValueAtTime(0,a),i.gain.linearRampToValueAtTime(.06,a+.02),i.gain.exponentialRampToValueAtTime(8e-4,a+.6),o.connect(i).connect(Js.destination),o.start(a),o.stop(a+.65)}}catch{}}function g9(e,t,n,s){if(kf(e)!=="keys")return!1;const o=Date.now();return(ta.get(t)??0)>o?ta.delete(t):(ta.set(t,o+au),n&&p9(o%6),setTimeout(s,au+60)),s(),!0}function m9(e=Date.now()){const t=new Set;return ta.forEach((n,s)=>{n>e?t.add(s):ta.delete(s)}),t}function y9(e,t,n,s,o,i){const a=kf(e);if(a==="keys")return s.has(t)?"keys":null;if(a==="stove")return o.has(t)?"stove":null;if(a==="water"){for(const r of n.values())if(r.item===t&&r.kind==="look")return"water";return null}return Fy(e)&&i?"ducky":null}const $p=["soc-wave","soc-hop","soc-heart","soc-l","soc-r","soc-duet","soc-baby"];let xp=new Map,Qc=new Set;const Mp=new Map;function Lp(e,t){return{x:(e.offsetLeft+e.offsetWidth/2)/t,y:(e.offsetTop+e.offsetHeight)/t}}function b9(e,t){const n=e.layer.offsetWidth/e.roomW||1,s=[],o=new Map;e.layer.querySelectorAll(":scope > .pet").forEach((f,u)=>{if(f.classList.contains("lifted")||f.classList.contains("kenneled"))return;const p=f.classList.contains("pet-cat")?"cat":f.dataset.dog||"pet"+u;s.push({key:p,...Lp(f,n)}),o.set(p,f)});const i=[];for(const[f,{d:u}]of e.dolls){const p=t.get(f);i.push({...u,id:f,busy:!!p,dancingAt:p?.kind==="dance"?p.item:void 0})}const a=i9(e.seed,i,s,e.baby,e.now),r=new Map;for(const f of i)for(const u of i)f!==u&&Math.hypot(f.x-u.x,(f.y-u.y)*1.5)<=200&&(r.get(f.id)??r.set(f.id,new Set).get(f.id)).add(u.id);for(const[f,u]of r)for(const p of u)!xp.get(f)?.has(p)&&Qc.has(f)&&Qc.has(p)&&Mp.set(f,e.now+1800);xp=r,Qc=new Set(i.map(f=>f.id));for(const[f,{el:u}]of e.dolls){const p=t.get(f),m=a.pair.get(f),k=a.duet.get(f),w=a.nearBaby.get(f),b=(Mp.get(f)??0)>e.now;let g="",y=0,_=0;if(k&&p)g="soc-duet",y=k.face,_=k.phase;else if(!p&&b){g="soc-wave";const $=[...r.get(f)??[]][0],I=$?e.dolls.get($)?.d:void 0;y=I?I.x<e.dolls.get(f).d.x?-1:1:0}else!p&&m?(g="soc-"+m.kind,y=m.face,_=m.phase):!p&&w&&(g="soc-baby",y=w);const T=g+y;if(u.dataset.soc===T)continue;if(u.classList.remove(...$p),!g){delete u.dataset.soc;continue}u.dataset.soc=T,u.classList.add(g),y&&u.classList.add(y<0?"soc-l":"soc-r");const x=Oe*2;u.style.setProperty("--soc-delay",lo(_,x,e.now)+"ms"),g==="soc-duet"&&u.style.setProperty("--amb-delay",lo(_,Oe*2,e.now)+"ms")}for(const f of e.layer.querySelectorAll("[data-soc]"))f.dataset.id||f.dataset.pid,[...e.dolls.values()].some(u=>u.el===f)||(f.classList.remove(...$p),delete f.dataset.soc);const l=[...e.dolls.values()].filter(f=>f.d.lying).map(f=>f.d),c=d9([...o.entries()].map(([f,u])=>({key:f,...Lp(u,n)})),e.beds??[],l);for(const[f,u]of o){const p=c?.get(f);if(p){const g=p.dx*n,y=p.dy*n,_=parseFloat(u.dataset.socDx||"0"),T=parseFloat(u.dataset.socDy||"0");if(Math.abs(g-_)<1&&Math.abs(y-T)<1)continue;u.dataset.socDx=String(g),u.dataset.socDy=String(y),u.classList.toggle("soc-trot",(Math.abs(g-_)>12||Math.abs(y-T)>12)&&!e.reduced),u.classList.add("soc-snug","soc-foot"),u.style.translate=`${g.toFixed(1)}px ${y.toFixed(1)}px`,(Math.abs(g-_)>12||Math.abs(y-T)>12)&&setTimeout(()=>u.classList.remove("soc-trot"),1300);continue}const m=a.pets.get(f),k=m?m.dx*n:0,w=u.classList.contains("soc-foot")||u.dataset.socDy;w&&(delete u.dataset.socDy,u.classList.remove("soc-foot"));const b=parseFloat(u.dataset.socDx||"0");!w&&Math.abs(k-b)<1||(u.dataset.socDx=String(k),u.classList.toggle("soc-trot",Math.abs(k-b)>12&&!e.reduced),u.classList.toggle("soc-snug",!!m),u.style.translate=k?`${k.toFixed(1)}px 0`:"",Math.abs(k-b)>12&&setTimeout(()=>u.classList.remove("soc-trot"),1300))}const d=e.layer.querySelector(":scope > .baby");d&&d.classList.toggle("soc-coo",a.babyCoo)}function w9(e){return!!(e.held?.left&&Et(e.held.left.kind))||!!(e.held?.right&&Et(e.held.right.kind))}function ar(e,t){const n=Rf(t);return!n||t.seat?.pose==="lie"||Cf(e,t,"clean")||w9(t)?null:n}function Mn(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function k9(e){!e||Mn()||(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),window.setTimeout(()=>e.classList.remove("wiggle"),480))}const v9=".round, .thing";function _9(){let e=null;const t=()=>{e?.classList.remove("pressing"),e=null};document.addEventListener("pointerdown",n=>{t();const s=n.target?.closest?.(v9);s&&(s.classList.add("pressing"),e=s)},{capture:!0,passive:!0});for(const n of["pointerup","pointercancel","dragstart","blur"])window.addEventListener(n,t,{capture:!0,passive:!0});document.addEventListener("pointerup",n=>{if(Mn())return;const s=n.target?.closest("button");s&&(s.classList.remove("spring"),s.offsetWidth,s.classList.add("spring"))},!0)}const Wo=1500;function $9(e,t){return!e||!t?[]:po.filter(n=>(t[n]??0)>(e[n]??0))}function x9(e,t){return e.length?t&&e.includes(t)?t:e[0]??null:null}function r1(){return{playing:null,until:0,pending:null}}function M9(e,t,n){return!e.playing||n>=e.until?{q:{playing:t,until:n+Wo,pending:null},start:t}:{q:{...e,pending:t},start:null}}function L9(e,t){return e.playing&&t>=e.until?e.pending?{q:{playing:e.pending,until:t+Wo,pending:null},start:e.pending}:{q:r1(),start:null}:{q:e,start:null}}const E9=[{cls:"nb-star",a:-56,dl:0},{cls:"nb-heart",a:-28,dl:40},{cls:"nb-star",a:0,dl:20},{cls:"nb-heart",a:28,dl:50},{cls:"nb-star",a:56,dl:10},{cls:"nb-spark",a:-78,dl:30},{cls:"nb-spark",a:78,dl:60}];function S9(e){const t=e==="hungry"?"nb-crumb":e==="sleepy"?"nb-z":e==="clean"?"nb-bubble":"nb-spark",n=E9.map(s=>s.cls==="nb-heart"?`<i class="nb-heart" style="--a:${s.a}deg;--dl:${s.dl}ms">♥</i>`:`<i class="${s.cls}" style="--a:${s.a}deg;--dl:${s.dl}ms"></i>`);return n.push(t==="nb-z"?'<i class="nb-z" style="--a:12deg;--dl:35ms">z</i>':`<i class="${t}" style="--a:12deg;--dl:35ms"></i>`),`<div class="need-burst need-burst-${e}" data-need-cele="${e}" aria-hidden="true"><span class="nb-aura"></span>${n.join("")}</div>`}const l1=vt("khg.showWishes"),rr=()=>{try{return localStorage.getItem(l1)!=="0"}catch{return!0}},T9={sleepy:'<svg viewBox="0 0 40 40"><rect x="5" y="20" width="30" height="10" rx="3" fill="#8fb8ff" stroke="#5b3d5c" stroke-width="2.5"/><rect x="7" y="15" width="10" height="7" rx="3" fill="#fff" stroke="#5b3d5c" stroke-width="2.5"/><path d="M6 30 V34 M34 30 V34" stroke="#5b3d5c" stroke-width="2.5" stroke-linecap="round"/><path d="M24 6 H31 L24 13 H31" fill="none" stroke="#5b3d5c" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/></svg>',hungry:'<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="12" fill="#ff6b6b" stroke="#5b3d5c" stroke-width="2.5"/><path d="M20 11 V6" stroke="#5b3d5c" stroke-width="2.5" stroke-linecap="round"/><path d="M21 9 Q28 4 31 9 Q26 13 21 9 Z" fill="#7bd389" stroke="#5b3d5c" stroke-width="2"/></svg>',playful:'<svg viewBox="0 0 40 40"><ellipse cx="20" cy="16" rx="10" ry="12" fill="#ffd166" stroke="#5b3d5c" stroke-width="2.5"/><path d="M18 28 L22 28 L20 31 Z" fill="#ffd166" stroke="#5b3d5c" stroke-width="2"/><path d="M20 31 Q16 34 20 37" fill="none" stroke="#5b3d5c" stroke-width="2" stroke-linecap="round"/></svg>',clean:'<svg viewBox="0 0 40 40"><circle cx="15" cy="23" r="9" fill="#bfe9ff" stroke="#5b3d5c" stroke-width="2.5"/><circle cx="27" cy="14" r="6" fill="#bfe9ff" stroke="#5b3d5c" stroke-width="2.5"/><circle cx="29" cy="29" r="4" fill="#bfe9ff" stroke="#5b3d5c" stroke-width="2"/><path d="M11 19 Q13 17 15 17" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>'},P9={sleepy:"wants a nap",hungry:"wants a snack",playful:"wants to play",clean:"wants a bath"},A9='<svg viewBox="0 0 48 48"><path d="M6 28 Q24 8 42 28" fill="none" stroke="#5b3d5c" stroke-width="3" stroke-linecap="round"/><ellipse cx="24" cy="30" rx="14" ry="11" fill="#fff" stroke="#5b3d5c" stroke-width="3"/><circle cx="20" cy="30" r="5" fill="#ffd166" stroke="#5b3d5c" stroke-width="2.5"/><circle cx="31" cy="24" r="3" fill="#fff" stroke="#5b3d5c" stroke-width="2"/></svg>',R9='<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="11" fill="#eee" stroke="#5b3d5c" stroke-width="3"/><path d="M10 40 L38 18" stroke="#5b3d5c" stroke-width="3" stroke-linecap="round"/></svg>',c1=(e,t)=>e==="sleepy"?/(^|-|:)bed$|bunk-bed|canopy-bed/.test(t):e==="hungry"?Es(t):e==="clean"?Gn(t):Yo(t);function C9(e,t,n){const s=e.rooms[t.room]?.items??[],o=r=>n==="sleepy"?/bed|crib|cot/.test(r):n==="hungry"?Es(r)||Et(r):n==="clean"?Gn(r):Yo(r);let i=null,a=1/0;for(const r of s)if(o(r.kind)){const l=Math.abs(r.x-t.x);l<a&&(a=l,i=r.x)}return i}function I9(e,t){const n=o=>c1(t,o);if((e.rooms[e.currentRoom]?.items??[]).some(o=>n(o.kind)))return null;const s=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"];for(const o of s){if(o===e.currentRoom)continue;if((e.rooms[o]?.items??[]).some(a=>n(a.kind)))return o}return null}function B9(e){const t=new Map,n=new Map,s=new Map;let o=0,i=performance.now(),a=0,r=0;const l=document.createElement("button");l.type="button",l.className="menuRow",l.id="btnWishes",l.innerHTML='<span class="mIco" id="wishIco"></span><span class="mLabel">Show wishes</span>';const c=()=>{const g=rr();l.querySelector("#wishIco").innerHTML=g?A9:R9,l.setAttribute("aria-label",g?"Wishes on":"Wishes off"),l.setAttribute("aria-pressed",String(g))};l.addEventListener("click",()=>{try{localStorage.setItem(l1,rr()?"0":"1")}catch{}c(),C.click(),k(),Z(rr()?"Wishes on":"Wishes off",1400)}),e.menuAfter?.insertAdjacentElement("afterend",l),c();function d(g,y){if(g.querySelector(":scope > .need-burst")?.remove(),g.classList.add("need-glow"),g.dataset.needCele=y,Mn()){setTimeout(()=>{g.classList.remove("need-glow"),g.dataset.needCele===y&&delete g.dataset.needCele},Wo);return}g.insertAdjacentHTML("beforeend",S9(y));const _=g.querySelector(":scope > .need-burst");_&&u(g,_),requestAnimationFrame(()=>{_&&_.isConnected&&u(g,_)});const T=g.querySelector(":scope > .inner");T?.classList.remove("need-hop"),T?.offsetWidth,T?.classList.add("need-hop"),setTimeout(()=>{g.querySelector(":scope > .need-burst")?.remove(),T?.classList.remove("need-hop"),g.classList.remove("need-glow"),g.dataset.needCele===y&&delete g.dataset.needCele},Wo)}function f(g){g.querySelector(":scope > .need-friend-heart")||Mn()||(g.insertAdjacentHTML("beforeend",'<div class="need-friend-heart" aria-hidden="true"></div>'),setTimeout(()=>g.querySelector(":scope > .need-friend-heart")?.remove(),Wo))}function u(g,y){const _=g.offsetWidth?g.getBoundingClientRect().width/g.offsetWidth:1;_>0&&Number.isFinite(_)&&y.style.setProperty("--nbs",_.toFixed(3));const T=g.querySelector(".inner svg .dollhead")||g.querySelector(".dollhead"),x=g.getBoundingClientRect();if(!x.width||!x.height)return;if(!T){y.style.left="50%",y.style.top="10%";return}const $=T.getBoundingClientRect();if(!$.width){y.style.left="50%",y.style.top="10%";return}y.style.left=(($.left+$.width/2-x.left)/x.width*100).toFixed(1)+"%",y.style.top=(($.top-x.top)/x.height*100-10).toFixed(1)+"%"}function p(g,y,_){const T=g.offsetWidth?g.getBoundingClientRect().width/g.offsetWidth:1;if(T>0&&Number.isFinite(T)&&y.style.setProperty("--nbs",T.toFixed(3)),!_){y.style.left="",y.style.bottom="";return}const x=g.querySelector(".inner svg .dollhead");if(!x)return;const $=g.getBoundingClientRect(),I=x.getBoundingClientRect();!$.width||!$.height||!I.width||(y.style.left=((I.left+I.width/2-$.left)/$.width*100).toFixed(1)+"%",y.style.bottom=(($.bottom-I.top)/$.height*100+4).toFixed(1)+"%")}function m(g){const y=g.querySelector(".inner svg .dollhead");if(!y)return;const _=g.getBoundingClientRect(),T=y.getBoundingClientRect();!_.width||!_.height||!T.width||(g.style.setProperty("--zx",((T.left+T.width*.7-_.left)/_.width*100).toFixed(1)+"%"),g.style.setProperty("--zy",((T.top-_.top)/_.height*100-14).toFixed(1)+"%"))}function k(){const g=e.get(),y=rr();for(const x of e.layer.querySelectorAll(".char[data-cid]")){const $=g.characters.find(q=>q.id===x.dataset.cid);if(!$)continue;const I={sleepy:3,hungry:3,playful:3,clean:3};for(const q of po)I[q]=go($,q);const N=t.get($.id),U=Date.now();let F=n.get($.id)??r1();const oe=L9(F,U);F=oe.q;let Ee=oe.start;const ze=$9(N,I);if(ze.length){const q=x9(ze,ar(g,$));if(q){const se=M9(F,q,U);F=se.q,se.start&&(Ee=se.start)}}if(n.set($.id,F),Ee){d(x,Ee),C.sparkle();const q=g.characters.filter(se=>se.id!==$.id&&se.room===$.room&&Math.hypot(se.x-$.x,se.y-$.y)<260);for(const se of q){const Le=e.layer.querySelector(`.char[data-cid="${CSS.escape(se.id)}"]`);Le&&f(Le)}}t.set($.id,I);const be=ar(g,$),O=!!$.seat&&$.seat.pose==="lie";x.classList.toggle("need-snooze",O),O?requestAnimationFrame(()=>m(x)):(x.style.removeProperty("--zx"),x.style.removeProperty("--zy")),x.classList.toggle("need-sleepy",be==="sleepy"&&!O);let B=x.querySelector(":scope > .need-bubble");if(!be||!y){if(B){B.classList.remove("show");const q=B;setTimeout(()=>{q.classList.contains("show")||q.remove()},450)}continue}B||(B=document.createElement("div"),B.className="need-bubble",B.innerHTML='<i class="nb-dot1"></i><i class="nb-dot2"></i><span class="nb-cloud"></span>',x.appendChild(B)),B.dataset.need!==be&&(B.dataset.need=be,B.querySelector(".nb-cloud").innerHTML=T9[be],B.setAttribute("role","img"),B.setAttribute("aria-label",P9[be]));const J=C9(g,$,be),V=J==null?0:Math.max(-1,Math.min(1,(J-$.x)/300));B.style.setProperty("--lean",String(Math.round(V*100)/100));const Q=B;requestAnimationFrame(()=>{p(x,Q,O),Q.classList.add("show")})}for(const x of t.keys())g.characters.some($=>$.id===x)||(t.delete(x),n.delete(x));const _=new Set;if(y){for(const x of g.characters)if(x.room===g.currentRoom&&ar(g,x)){for(const $ of po)if(go(x,$)<=1)for(const I of g.rooms[g.currentRoom]?.items??[])c1($,I.kind)&&_.add(I.id)}}for(const x of e.layer.querySelectorAll(".item[data-id]"))x.classList.toggle("need-hint",_.has(x.dataset.id));const T=document.getElementById("tabs");if(T){const x=document.body.classList.contains("mode-play");let $=null;if(y&&x)for(const I of g.characters){if(I.room!==g.currentRoom)continue;const N=ar(g,I);if(N&&($=I9(g,N),$))break}for(const I of T.querySelectorAll("[data-room]"))I.classList.toggle("need-elsewhere",!!$&&I.dataset.room===$)}e.afterPaint?.()}function w(){if(!e.speaks())return;const g=e.get(),y=Date.now();for(const _ of g.characters)if(_.room===g.currentRoom)for(const T of iw(g,_)){const x=_.id+"|"+T;y-(s.get(x)??0)<2500||(s.set(x,y),e.dispatch({type:"need/meet",id:_.id,need:T}))}}function b(g){const y=performance.now(),_=g??Math.min(y-i,5e3);if(i=y,g==null&&document.visibilityState!=="visible")return;if(!e.canDrift()||!e.speaks()){o=0;return}if(o+=_,o<nw(e.get(),r))return;o=0,r++;const T=lw(e.get(),a++);T&&e.dispatch({type:"need/drift",id:T.id,need:T.need})}e.subscribe(()=>{k(),setTimeout(w,0)}),e.layer.addEventListener("pointerup",g=>{g.target.closest?.(".char[data-cid]")&&(s.clear(),w())}),setInterval(()=>{document.hidden||(b(),k())},1e3),document.addEventListener("visibilitychange",()=>{i=performance.now()}),k(),new URLSearchParams(location.search).has("needsqa")&&(window.__needs={tick:g=>b(g),visible:()=>o,paint:k,care:w,CELEBRATE_MS:Wo})}function O9(e){const t=e.scale;let n=0;e.overflowR>1&&e.overflowL>1?n=-e.overflowL:e.overflowR>1?n=e.overflowR:e.overflowL>1&&(n=-e.overflowL);const s=e.cam+n/t,o=Math.max(0,Math.min(e.maxCam,s)),i=s-o,a=e.nudgeX&&Math.abs(i)>.5?e.kidX-i:e.kidX;return{cam:o,kidX:a}}function D9(e){const t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[1][0]).toUpperCase():"?"}function H9(e,t=3){const n=[...e].sort((l,c)=>l.x-c.x||l.id.localeCompare(c.id)),s=[],o=[],i=(l,c,d,f)=>d===void 0||f===void 0||l.y===void 0||l.h===void 0?l.lane===c:Math.abs(d-c*f-(l.y-l.lane*l.h))<(f+l.h)/2,a=(l,c,d,f,u)=>s.some(p=>i(p,d,f,u)&&Math.abs(p.x-l)<(p.w+c)/2+8),r=[];for(const l of n){let c=-1;for(let d=0;d<t;d++)if(!a(l.x,l.w,d,l.y,l.h)){c=d;break}c<0?r.push(l):(s.push({x:l.x,w:l.w,lane:c,y:l.y,h:l.h}),o.push({id:l.id,lane:c,initials:!1}))}for(const l of r){const c=Math.min(l.w,44);let d=0;for(let f=0;f<t;f++)if(!a(l.x,c,f,l.y,l.h)){d=f;break}s.push({x:l.x,w:c,lane:d,y:l.y,h:l.h}),o.push({id:l.id,lane:d,initials:!0})}return o}let W9=0;function d1(e=document){const t=[...e.querySelectorAll(".nametag")].filter(o=>{const i=o.getBoundingClientRect();return i.width>2&&i.height>2});if(!t.length)return;const n=t.map(o=>{o.dataset.tagId||(o.dataset.tagId="tg"+(++W9).toString(36)),o.dataset.full||(o.dataset.full=(o.textContent||"").trim()),o.classList.contains("is-initials")||(o.dataset.fullW=String(o.getBoundingClientRect().width));const i=o.getBoundingClientRect(),a=Number(o.dataset.fullW)||i.width,r=(parseFloat(getComputedStyle(o).fontSize)||16)*1.35,l=Number(o.style.getPropertyValue("--tag-lane"))||0;return{id:o.dataset.tagId,x:i.left+i.width/2,w:a,y:i.bottom+l*r,h:Math.max(r,i.height)}}),s=new Map(H9(n).map(o=>[o.id,o]));for(const o of t){const i=s.get(o.dataset.tagId||"");if(!i)continue;const a=o.dataset.full||"",r=i.initials?D9(a):a;o.textContent!==r&&(o.textContent=r),o.classList.toggle("is-initials",i.initials),o.style.setProperty("--tag-lane",String(i.lane))}}const Fd=120,V9=300,U9=.25,z9=500;function Q9(e){return!Number.isFinite(e)||e<=0?Fd:Math.round(Math.min(V9,Math.max(Fd,e)))}function N9(e){return e.reduced||e.first||e.sinceResizeMs<z9||!(e.jumpFrac<=U9)?0:Q9(e.avgGapMs*1.15)}let f1=-1/0;if(typeof window<"u"){const e=()=>{f1=performance.now()};window.addEventListener("resize",e),window.addEventListener("orientationchange",e)}function Ep(e,t,n){if(!e)return NaN;const s=parseFloat(e),o=parseFloat(t);return!Number.isFinite(s)||!Number.isFinite(o)?NaN:e.endsWith("%")&&t.endsWith("%")?Math.abs(o-s)/100:e.endsWith("px")&&t.endsWith("px")&&n>0?Math.abs(o-s)/n:NaN}function Yl(e,t,n,s=performance.now()){if(!(e.style.left===t&&e.style.top===n)){if(e.classList.contains("other")){const o=Number(e.dataset.glideAt||0);e.dataset.glideAt=String(s);const i=o?Math.min(s-o,600):Fd,r=(Number(e.dataset.glideGap||0)||i)*.5+i*.5;e.dataset.glideGap=String(r);const l=e.parentElement,c=Math.max(Ep(e.style.left,t,l?.clientWidth??0),Ep(e.style.top,n,l?.clientHeight??0)),d=N9({first:!o||!e.style.left,jumpFrac:c,sinceResizeMs:s-f1,reduced:Mn(),avgGapMs:r});e.style.transitionDuration=d+"ms",e.dataset.glideMs=String(d)}e.style.left=t,e.style.top=n}}function h1(e,t,n=t+"s"){return`${e} ${e===1?t:n}`}function q9(e,t){const n=t?.type??"";switch(e){case"locked":return"This house is locked 🔒 You can look around!";case"notyours":return n==="char/move"||n.startsWith("item/")?"That's hers to move 💛":"Only she can do that one 💛";case"cuddling":return"Someone is cuddling!";case"nohouse":return"That house isn't on the street anymore.";case"toobig":return"This house is super full! Put something away first.";default:return""}}function F9(e,t,n){const s=n?"the "+n.toLowerCase():"something";return e?t.type==="item/move"?`${e} moved ${s}`:t.type==="item/delete"?`${e} put ${s} away`:"":""}function j9(e=5e3){const t=new Map;return(n,s=Date.now())=>{const o=t.get(n)??-1/0;if(s-o<e)return!1;if(t.set(n,s),t.size>64)for(const[i,a]of t)s-a>e&&t.delete(i);return!0}}const Z9="Everyone's already playing! Ask a grown-up to add your name.",G9=e=>`${e} is already on the list 💛`,u1="/kids-house-game/assets/window-CIKRGJz0.webp",Y9=Object.freeze(Object.defineProperty({__proto__:null,default:u1},Symbol.toStringTag,{value:"Module"})),p1="#5a3d5c",Pt=`stroke="${p1}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,K9={living:"#ff8fab",bedroom:"#c9a0dc",kitchen:"#8fd6a6",salon:"#f0a0d8",nursery:"#9ad7f5",bathroom:"#7ec8d6",backyard:"#80ed99"};function g1(e){return e==="living"&&Xn()}function X9(e){if(g1(e))return`<div class="sceneWin builtin-window painted" aria-hidden="true"><div class="pwin"><img class="artimg" alt="" draggable="false" src="${u1}"><i class="artnight" aria-hidden="true"></i></div></div>`;const t=K9[e]??"#ffb3c6";return`<div class="sceneWin builtin-window" aria-hidden="true"><svg viewBox="0 0 160 180">
    <path d="M18 20 H142 V150 H18 Z" fill="#fff6ea" ${Pt}/>
    <path d="M28 30 H132 V118 H28 Z" fill="#b9e3ff" ${Pt}/>
    <path d="M80 30 V118 M28 74 H132" ${Pt} stroke-width="3"/>
    <circle cx="48" cy="52" r="10" fill="#fff" opacity=".85"/>
    <ellipse cx="108" cy="48" rx="16" ry="8" fill="#fff" opacity=".8"/>
    <path d="M40 118 Q58 96 70 118 Q90 100 112 118" fill="#7dce8a" stroke="${p1}" stroke-width="3"/>
    <rect x="96" y="86" width="8" height="32" rx="3" fill="#6b4a32" ${Pt} stroke-width="2"/>
    <circle cx="100" cy="80" r="12" fill="#5cc985" ${Pt} stroke-width="2"/>
    <path d="M8 16 Q6 80 16 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <path d="M152 16 Q154 80 144 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <rect x="46" y="146" width="68" height="12" rx="4" fill="#ffe7c2" ${Pt}/>
  </svg></div>`}function J9(){return`<div class="sceneRug" aria-hidden="true"><svg viewBox="0 0 200 80">
    <ellipse cx="100" cy="48" rx="92" ry="24" fill="#ffc8dd" ${Pt}/>
    <ellipse cx="100" cy="48" rx="64" ry="15" fill="#bde0fe" ${Pt} stroke-width="3"/>
    <ellipse cx="100" cy="48" rx="28" ry="7" fill="#fff6ea"/>
  </svg></div>
  <div class="sceneLamp" aria-hidden="true"><svg viewBox="0 0 80 160">
    <path d="M18 52 L30 8 H50 L62 52 Z" fill="#ffd166" ${Pt}/>
    <rect x="36" y="52" width="8" height="78" rx="4" fill="#c9a0dc" ${Pt}/>
    <ellipse cx="40" cy="136" rx="26" ry="8" fill="#b388d6" ${Pt}/>
    <circle cx="34" cy="28" r="4" fill="#fff" opacity=".8"/>
  </svg></div>
  <div class="scenePlant" aria-hidden="true"><svg viewBox="0 0 90 140">
    <path d="M45 128 C45 90 18 78 20 48 C40 58 44 80 45 128" fill="#5cc985" ${Pt}/>
    <path d="M45 128 C45 92 74 70 78 40 C58 54 50 82 45 128" fill="#80ed99" ${Pt}/>
    <path d="M45 128 C40 96 28 88 22 70" fill="none" stroke="#3d9a62" stroke-width="3"/>
    <path d="M30 132 H62 L56 118 H36 Z" fill="#e07a5f" ${Pt}/>
    <ellipse cx="46" cy="126" rx="16" ry="5" fill="#c4634a"/>
  </svg></div>`}function eE(e,t){return t==="backyard"?[]:[{id:e("rug"),kind:"rug",x:1152,y:540,flip:!1,z:0,scale:1},{id:e("lamp"),kind:"lamp",x:804,y:470,flip:!1,z:0,scale:1},{id:e("plant"),kind:"plant",x:1584,y:480,flip:!1,z:0,scale:1}]}let to="",m1=null;function tE(e){m1=e,to=""}function nE(e,t,n){const s=m1?.(t,n);if(s!=null){const r="custom|"+t;if(r===to&&e.childElementCount)return;to=r,e.innerHTML=s,e.dataset.room=t;return}if(t==="backyard"){const r="yard|"+t;if(r===to&&e.childElementCount)return;to=r,e.innerHTML="",e.dataset.room=t;return}const o=n.length===0,i=n.some(r=>/window|curtain/i.test(r.kind)),a=t+(o?"|e":"")+(i?"|w":"")+(g1(t)?"|p":"");a===to&&e.childElementCount||(to=a,e.innerHTML=(i?"":X9(t))+(o?J9():""),e.dataset.room=t)}let Sp=null;function sE(e,t){if(e==="backyard")return"backyard";Sp??=Fn().rooms;const n=Sp[e];return!n||t.wallTile||t.floorTile||t.wallpaper.toLowerCase()!==n.wallpaper.toLowerCase()||t.floor.toLowerCase()!==n.floor.toLowerCase()||t.pattern!==n.pattern?null:"room-"+e}const oE={backyard:{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]},barn:{w:3800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,200]]},clubhouse:{w:5200,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200],[4800,400]]},park:{w:5800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200],[4800,1e3]]},ranch:{w:7200,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200],[4800,1200],[6e3,1200]]},"room-bathroom":{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]},"room-bedroom":{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]},"room-kitchen":{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]},"room-living":{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]},"room-nursery":{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]},"room-salon":{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]}},Tp=Object.assign({"../../assets/art/scene/backyard.webp":()=>h(()=>import("./backyard-C4n7jd31.js"),[]).then(e=>e.default),"../../assets/art/scene/barn.webp":()=>h(()=>import("./barn-DG-07NaG.js"),[]).then(e=>e.default),"../../assets/art/scene/clubhouse.webp":()=>h(()=>import("./clubhouse-CAzySw31.js"),[]).then(e=>e.default),"../../assets/art/scene/map-portrait.webp":()=>h(()=>import("./map-portrait-CTGs9sOW.js"),[]).then(e=>e.default),"../../assets/art/scene/map.webp":()=>h(()=>import("./map-BUJvl7XC.js"),[]).then(e=>e.default),"../../assets/art/scene/park.webp":()=>h(()=>import("./park-DL8kzHI3.js"),[]).then(e=>e.default),"../../assets/art/scene/ranch.webp":()=>h(()=>import("./ranch-CFAzH2IJ.js"),[]).then(e=>e.default),"../../assets/art/scene/room-bathroom.webp":()=>h(()=>import("./room-bathroom-EqYrBEhG.js"),[]).then(e=>e.default),"../../assets/art/scene/room-bedroom.webp":()=>h(()=>import("./room-bedroom-DX4Ycex-.js"),[]).then(e=>e.default),"../../assets/art/scene/room-kitchen.webp":()=>h(()=>import("./room-kitchen-WWNenRTM.js"),[]).then(e=>e.default),"../../assets/art/scene/room-living.webp":()=>h(()=>import("./room-living-PFJvgqHk.js"),[]).then(e=>e.default),"../../assets/art/scene/room-nursery.webp":()=>h(()=>import("./room-nursery-iz54eiRz.js"),[]).then(e=>e.default),"../../assets/art/scene/room-salon.webp":()=>h(()=>import("./room-salon-Dr5fy97s.js"),[]).then(e=>e.default)}),Kl=new Map;for(const e in Tp){const t=(e.split("/").pop()||"").replace(/\.webp$/i,"");t&&!t.startsWith("_")&&Kl.set(t,Tp[e])}const iE=Object.assign({"../../assets/art/scene-tiles/backyard/backyard.0.webp":()=>h(()=>import("./backyard.0-CSXsjQOi.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/backyard/backyard.1.webp":()=>h(()=>import("./backyard.1-DntyGX-Y.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/backyard/backyard.2.webp":()=>h(()=>import("./backyard.2-Pqupz3up.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/backyard/backyard.3.webp":()=>h(()=>import("./backyard.3-DO1YkYIm.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/barn/barn.0.webp":()=>h(()=>import("./barn.0-CqKqneXa.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/barn/barn.1.webp":()=>h(()=>import("./barn.1-BsUACQ_P.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/barn/barn.2.webp":()=>h(()=>import("./barn.2-B4LSWJJ1.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/barn/barn.3.webp":()=>h(()=>import("./barn.3-BHvngjn9.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/clubhouse/clubhouse.0.webp":()=>h(()=>import("./clubhouse.0-DuxNTKDT.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/clubhouse/clubhouse.1.webp":()=>h(()=>import("./clubhouse.1-D3VoUYtM.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/clubhouse/clubhouse.2.webp":()=>h(()=>import("./clubhouse.2-DTTWw483.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/clubhouse/clubhouse.3.webp":()=>h(()=>import("./clubhouse.3-BPiGPMmj.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/clubhouse/clubhouse.4.webp":()=>h(()=>import("./clubhouse.4-IQdup0W1.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/park/park.0.webp":()=>h(()=>import("./park.0-D3-rHkFV.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/park/park.1.webp":()=>h(()=>import("./park.1-BvSUGWCo.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/park/park.2.webp":()=>h(()=>import("./park.2-ChzxTPXW.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/park/park.3.webp":()=>h(()=>import("./park.3-DcxKKz-Y.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/park/park.4.webp":()=>h(()=>import("./park.4-DDqsVuYv.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/ranch/ranch.0.webp":()=>h(()=>import("./ranch.0-Dg3AIHmC.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/ranch/ranch.1.webp":()=>h(()=>import("./ranch.1-WjRmcitr.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/ranch/ranch.2.webp":()=>h(()=>import("./ranch.2-4YmZatX8.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/ranch/ranch.3.webp":()=>h(()=>import("./ranch.3-DFQSKZ7m.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/ranch/ranch.4.webp":()=>h(()=>import("./ranch.4-D0etOqRY.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/ranch/ranch.5.webp":()=>h(()=>import("./ranch.5-Dc-gYJ_b.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bathroom/room-bathroom.0.webp":()=>h(()=>import("./room-bathroom.0-DD0DxkZ1.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bathroom/room-bathroom.1.webp":()=>h(()=>import("./room-bathroom.1-DyqYEJCK.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bathroom/room-bathroom.2.webp":()=>h(()=>import("./room-bathroom.2-BFDlgQ81.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bathroom/room-bathroom.3.webp":()=>h(()=>import("./room-bathroom.3-6YMMRwFB.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bedroom/room-bedroom.0.webp":()=>h(()=>import("./room-bedroom.0-C-wmAMf-.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bedroom/room-bedroom.1.webp":()=>h(()=>import("./room-bedroom.1-nLadp7_P.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bedroom/room-bedroom.2.webp":()=>h(()=>import("./room-bedroom.2-D4LdGWHR.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bedroom/room-bedroom.3.webp":()=>h(()=>import("./room-bedroom.3-De_n6kQm.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-kitchen/room-kitchen.0.webp":()=>h(()=>import("./room-kitchen.0-CIdVA1M6.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-kitchen/room-kitchen.1.webp":()=>h(()=>import("./room-kitchen.1-Dex09a2m.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-kitchen/room-kitchen.2.webp":()=>h(()=>import("./room-kitchen.2-B-4_QV89.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-kitchen/room-kitchen.3.webp":()=>h(()=>import("./room-kitchen.3-D-2XSjXx.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-living/room-living.0.webp":()=>h(()=>import("./room-living.0-Dcz4Y0yz.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-living/room-living.1.webp":()=>h(()=>import("./room-living.1-Cj0aYrda.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-living/room-living.2.webp":()=>h(()=>import("./room-living.2-dZeYCDDc.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-living/room-living.3.webp":()=>h(()=>import("./room-living.3-DdtyoRJF.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-nursery/room-nursery.0.webp":()=>h(()=>import("./room-nursery.0-BfldSb4z.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-nursery/room-nursery.1.webp":()=>h(()=>import("./room-nursery.1-BlQGSOIs.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-nursery/room-nursery.2.webp":()=>h(()=>import("./room-nursery.2-Dm3pl06d.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-nursery/room-nursery.3.webp":()=>h(()=>import("./room-nursery.3-UONUAIUj.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-salon/room-salon.0.webp":()=>h(()=>import("./room-salon.0-KNSg0ty4.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-salon/room-salon.1.webp":()=>h(()=>import("./room-salon.1-DqvqPc1O.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-salon/room-salon.2.webp":()=>h(()=>import("./room-salon.2-DXkU0KlN.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-salon/room-salon.3.webp":()=>h(()=>import("./room-salon.3-Dv1qX-Oc.js"),[]).then(e=>e.default)}),ni=new Map;for(const[e,t]of Object.entries(oE)){const n=t.tiles.map(([s,o],i)=>({x:s,w:o,get:iE[`../../assets/art/scene-tiles/${e}/${e}.${i}.webp`]}));Kl.has(e)&&n.length&&n.every(s=>!!s.get)&&ni.set(e,{w:t.w,parts:n})}const Pp=!1;function aE(){try{const e=new URLSearchParams(location.search).get("tiles");return e==="1"?!1:e==="0"?!0:!Pp}catch{return!Pp}}function rE(){try{if(new URLSearchParams(location.search).get("art")==="v1")return!0}catch{}return!Ff()}const Bn=new Map,lE=24;function cE(e){let t=Bn.get(e);if(t)return t;const n=Kl.get(e),s={state:"loading",p:null};for(s.p=Os(n).then(o=>(s.state="ok",s.url=o,o)).catch(()=>(s.state="failed",Bn.get(e)===s&&Bn.delete(e),null)),Bn.set(e,s);Bn.size>lE;)Bn.delete(Bn.keys().next().value);return s}const Xl=new Set;function Wi(e,t){e.querySelectorAll(":scope > img.sceneArt").forEach(s=>{s.removeAttribute("src"),s.remove()}),Xl.delete(e),At.delete(e),At.size||b1();const n=t??e.__sceneMark;n&&(n.classList.remove("sceneArtOn"),delete n.dataset.sceneArt)}function y1(e){for(const t of[...Xl])t!==e&&(t.dataset.sceneWant="",Wi(t,null))}function ko(e,t,n=e){const s=t&&Kl.has(t)&&!rE()?t:null;if(e.dataset.sceneWant=s??"",e.__sceneMark=n,!s){Wi(e,n);return}if(y1(e),ni.has(s)&&!aE()){fE(e,s,n);return}At.has(e)&&Wi(e,n);const o=cE(s),i=l=>{if(e.dataset.sceneWant!==s)return;let c=e.querySelector(":scope > img.sceneArt");if(c&&c.getAttribute("src")===l&&!c.hidden){n.classList.add("sceneArtOn"),n.dataset.sceneArt=s;return}c||(c=document.createElement("img"),c.className="sceneArt",c.alt="",c.setAttribute("aria-hidden","true"),c.draggable=!1,c.decoding="async",e.prepend(c)),Xl.add(e);const d=c;if(d.getAttribute("src")===l){a(d);return}d.hidden=!0,n.classList.remove("sceneArtOn"),delete n.dataset.sceneArt,d.src=l,d.decode().then(()=>{e.dataset.sceneWant===s&&d.isConnected&&d.getAttribute("src")===l&&a(d)},()=>{const f=Number(d.dataset.tries||"0");if(f<Ts.length&&e.dataset.sceneWant===s&&d.isConnected){d.dataset.tries=String(f+1),setTimeout(()=>{e.dataset.sceneWant===s&&d.isConnected&&d.getAttribute("src")===l&&(d.removeAttribute("src"),i(l))},Ts[f]);return}o.state="failed",Bn.get(s)===o&&Bn.delete(s),e.dataset.sceneWant===s&&Wi(e,n)})},a=l=>{l.hidden=!1,n.classList.add("sceneArtOn"),n.dataset.sceneArt=s};if(o.state==="ok"){i(o.url);return}if(o.state==="failed"){Wi(e,n);return}n.classList.remove("sceneArtOn"),delete n.dataset.sceneArt;const r=e.querySelector(":scope > img.sceneArt");r&&(r.hidden=!0),o.p.then(l=>{l&&i(l)})}const At=new Map,Ap=new Map;let na=0;function b1(){na&&(clearInterval(na),na=0)}function dE(){na||(na=window.setInterval(()=>{if(!document.hidden)for(const e of At.keys())ch(e)},200))}function fE(e,t,n){const s=ni.get(t);let o=At.get(e);if(!o||o.scene!==t){e.querySelectorAll(":scope > img.sceneArt").forEach(a=>{a.removeAttribute("src"),a.remove()}),n.classList.remove("sceneArtOn"),delete n.dataset.sceneArt;const i=s.parts.map((a,r)=>{const l=document.createElement("img");return l.className="sceneArt sceneTile",l.alt="",l.setAttribute("aria-hidden","true"),l.draggable=!1,l.decoding="async",l.dataset.tile=String(r),l.hidden=!0,l.style.left=a.x/s.w*100+"%",l.style.width=a.w/s.w*100+"%",l});e.prepend(...i),o={scene:t,mark:n,imgs:i,shown:!1},At.set(e,o)}Xl.add(e),dE(),ch(e)}function ch(e){const t=At.get(e);if(!t||e.dataset.sceneWant!==t.scene)return;const n=ni.get(t.scene),s=e.getBoundingClientRect();if(s.width<2)return;const o=innerWidth,i=o*.25,a=[];t.imgs.forEach((r,l)=>{const c=n.parts[l],d=s.left+c.x/n.w*s.width,f=d+c.w/n.w*s.width,u=f>-i&&d<o+i;f>0&&d<o&&a.push(r),u&&!r.dataset.state&&hE(e,t,r,l)}),!t.shown&&a.length&&a.every(r=>r.dataset.state==="ok")&&(t.shown=!0,t.mark.classList.add("sceneArtOn"),t.mark.dataset.sceneArt=t.scene)}function hE(e,t,n,s){n.dataset.state="loading";const o=t.scene+"."+s,i=Ap.get(o),a=i?Promise.resolve(i):Os(()=>ni.get(t.scene).parts[s].get()).then(c=>(Ap.set(o,c),c)),r=(c,d=0)=>{At.get(e)!==t||!n.isConnected||(n.src=c,n.decode().then(()=>{At.get(e)!==t||!n.isConnected||n.dataset.state==="loading"&&(n.hidden=!1,n.dataset.state="ok",ch(e))},()=>{if(!(At.get(e)!==t||!n.isConnected)){if(d<Ts.length){setTimeout(()=>{At.get(e)===t&&n.isConnected&&n.dataset.state==="loading"&&(n.removeAttribute("src"),r(c,d+1))},Ts[d]);return}l()}}))},l=()=>{At.get(e)===t&&(At.delete(e),At.size||b1(),e.querySelectorAll(":scope > img.sceneTile").forEach(c=>{c.removeAttribute("src"),c.remove()}),ni.delete(t.scene),ko(e,t.scene,t.mark))};a.then(c=>r(c),()=>l())}const Ue="#5a3d5c",R=(e=4)=>`stroke="${Ue}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Oa=600,fn=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],kn=(e,t,n=3)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${Ue}"/><circle cx="${e+1}" cy="${t-1}" r="${n/3}" fill="#fff"/>`,ao=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="5" ry="3" fill="#ff9bb5" opacity=".75"/>`,uE=(e,t,n,s)=>fn.map((o,i)=>`<path d="M${e-n+i*s} ${t} A${n-i*s} ${n-i*s} 0 0 1 ${e+n-i*s} ${t}" fill="none" stroke="${o}" stroke-width="${s}"/>`).join(""),pE=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${R()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${R()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${R()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${R()}/></g>`,Vn=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-46" y="-50" width="92" height="50" rx="14" fill="#f5d27a" ${R()}/>
  <path d="M-30 -42 V-8 M0 -44 V-6 M30 -42 V-8" stroke="#d9a93f" stroke-width="4" stroke-linecap="round"/><path d="M-46 -26 H46" stroke="#c98a2e" stroke-width="5"/></g>`,gE=(e,t,n)=>{const s=Array.from({length:Math.floor((t-e)/70)+1},(o,i)=>`<rect x="${e+i*70-7}" y="${n-58}" width="14" height="64" rx="5" fill="#fff6e6" ${R(3)}/>`).join("");return`<rect x="${e}" y="${n-46}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${R(3)}/><rect x="${e}" y="${n-22}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${R(3)}/>${s}`};function mE(){const e=Sa;return`<svg class="parkScene ranchScene" viewBox="0 0 ${e} ${Oa}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="rcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7e8ff"/><stop offset="1" stop-color="#fff4fb"/></linearGradient></defs>
  <rect width="${e}" height="440" fill="url(#rcSky)"/>
  <g opacity=".55">${uE(1900,430,620,26)}</g>
  ${[160,820,1500,2300,3e3].map((t,n)=>`<g transform="translate(${t} ${70+n%2*34})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <g transform="translate(${e-200} 92)"><circle r="48" fill="#ffe066" ${R()}/>${kn(-15,-6,4)}${kn(13,-6,4)}<path d="M-14 12 Q0 24 14 12" fill="none" ${R(3)}/>${ao(-26,8)}${ao(26,8)}</g>
  <path d="M-50 370 Q600 230 1300 350 T2600 330 T${e+100} 360 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#a6e3a0"/><path d="M0 410 H${e}" ${R()}/>
  <path d="M0 566 Q900 530 1800 570 T${e} 552 V600 H0 Z" fill="#f2dcb8" opacity=".9"/>
  ${pE(3560,400,.8,"#4fbf7a")}
  <!-- entrance gate with a rainbow arch -->
  <g class="ranchSign"><g class="ranchSignArt"><rect x="40" y="290" width="24" height="210" rx="6" fill="#c99366" ${R()}/><rect x="196" y="290" width="24" height="210" rx="6" fill="#c99366" ${R()}/>
    <path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${Ue}" stroke-width="44" stroke-linecap="round"/>
    ${fn.map((t,n)=>`<path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${t}" stroke-width="${36-n*6}" stroke-linecap="round"/>`).join("")}
    <rect x="22" y="250" width="216" height="40" rx="14" fill="#fff6e6" ${R(3)}/><text x="130" y="277" text-anchor="middle" font-size="19" font-weight="900" fill="${Ue}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  <!-- red barn with rainbow trim and banner -->
  <g transform="translate(270 0)">
    <path d="M0 470 V250 L60 180 H270 L330 250 V470 Z" fill="#ef5b5b" ${R(5)}/>
    <path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${Ue}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    ${fn.map((t,n)=>`<path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${t}" stroke-width="3" transform="translate(0 ${-7+n*2.8})" stroke-linejoin="round"/>`).join("")}
    <rect x="115" y="215" width="100" height="56" rx="10" fill="#fff6e6" ${R(4)}/><path d="M115 215 L215 271 M215 215 L115 271" stroke="#ef5b5b" stroke-width="6"/>
    <rect x="95" y="330" width="140" height="140" rx="8" fill="#fff6e6" ${R(4)}/><rect x="108" y="342" width="56" height="128" fill="#d94848" ${R(3)}/><rect x="166" y="342" width="56" height="128" fill="#d94848" ${R(3)}/>
    <path d="M108 342 L164 470 M164 342 L108 470 M166 342 L222 470 M222 342 L166 470" stroke="#fff6e6" stroke-width="6"/>
    <g class="barnBanner" transform="translate(165 300)"><g class="ranchSignArt">${fn.map((t,n)=>`<rect x="${-120+n*40}" y="-16" width="40" height="30" fill="${t}"/>`).join("")}<rect x="-120" y="-16" width="240" height="30" fill="none" ${R(3)}/>
      <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${Ue}" stroke-width="4" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  </g>
  ${Vn(640,560,.8)}${Vn(1950,470,.7)}${Vn(1880,470,.55)}${Vn(3115,470,.7)}${Vn(3115,425,.55)}
  <!-- the petting zoo moved into the barn: a sign by the barn door, sunflowers where the pen was -->
  ${Array.from({length:6},(t,n)=>{const s=1030+n*66,o=70+n%3*18;return`<g transform="translate(${s} 470)"><path d="M0 0 V-${o}" stroke="#40c057" stroke-width="6" stroke-linecap="round"/><ellipse cx="${n%2?9:-9}" cy="-${o/2}" rx="11" ry="5" fill="#69db7c" ${R(2.5)}/>${[0,45,90,135,180,225,270,315].map(i=>`<ellipse cx="${Math.cos(i*Math.PI/180)*14}" cy="${-o+Math.sin(i*Math.PI/180)*14}" rx="8" ry="5" transform="rotate(${i} ${Math.cos(i*Math.PI/180)*14} ${-o+Math.sin(i*Math.PI/180)*14})" fill="#ffd43b" ${R(2)}/>`).join("")}<circle cy="-${o}" r="10" fill="#a0522d" ${R(2.5)}/></g>`}).join("")}
  <!-- pond -->
  <ellipse cx="${Lt.x}" cy="${Lt.y}" rx="${Lt.rx}" ry="${Lt.ry}" fill="#8ecae6" ${R()}/><ellipse cx="${Lt.x-15}" cy="${Lt.y-6}" rx="70" ry="16" fill="#bde6f7"/>
  <!-- paddock fence + HORSES sign are their own depth layer (paddockFenceSVG) -->
  <!-- garden -->
  <rect x="3140" y="520" width="420" height="70" rx="20" fill="#b07d54" ${R()}/>
  <rect x="3260" y="430" width="160" height="40" rx="12" fill="#fff6e6" ${R(3)}/><text x="3340" y="458" text-anchor="middle" font-size="21" font-weight="900" fill="${Ue}" font-family="Nunito, system-ui, sans-serif">GARDEN</text>
  <path d="M3340 470 V500" ${R(5)}/>
  </svg>`}function yE(){return`<svg class="fenceLayer" viewBox="0 0 ${Sa} ${Oa}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  ${gE(2400,3080,470)}
  <rect x="2640" y="380" width="180" height="40" rx="12" fill="#fff6e6" ${R(3)}/><text x="2730" y="408" text-anchor="middle" font-size="21" font-weight="900" fill="${Ue}" font-family="Nunito, system-ui, sans-serif">HORSES</text>
  </svg>`}const w1=[{name:"Goat",say:"Meh-eh-eh!",snd:"bleat"},{name:"Sheep",say:"Baa!",snd:"baa"},{name:"Piglet",say:"Oink oink!",snd:"oink"},{name:"Chicks",say:"Peep peep!",snd:"peep"},{name:"Bunny",say:"*wiggle wiggle*",snd:"squeak"},{name:"Cow",say:"Moooo!",snd:"moo"}],lr=(e,t,n,s=94)=>e.map((o,i)=>`<rect class="leg ${i%2?"b":"a"}" x="${o}" y="${t}" width="9" height="${s-t}" rx="4" fill="${n}" ${R(3)}/>`).join("");function jd(e){switch(e){case 0:return`<svg viewBox="0 0 120 100">${lr([32,44,70,82],60,"#efe6dc")}<path class="tail" d="M24 50 l-8 -10" ${R(5)}/>
      <ellipse cx="58" cy="56" rx="34" ry="17" fill="#f4ede5" ${R()}/><g class="head"><path d="M86 30 l-6 -16 l10 10 Z M96 30 l2 -17 l5 13 Z" fill="#c9b8a8" ${R(3)}/>
      <ellipse cx="94" cy="40" rx="14" ry="16" fill="#f4ede5" ${R()}/><ellipse class="ear" cx="80" cy="36" rx="9" ry="4" fill="#e8d6c4" ${R(3)}/>${kn(98,36)}<path d="M98 56 q2 8 6 0" fill="#e8d6c4" ${R(3)}/>${ao(102,46)}<circle cx="106" cy="44" r="2" fill="${Ue}"/></g></svg>`;case 1:return`<svg viewBox="0 0 120 100">${lr([36,48,70,80],62,"#5a4a5c")}
      ${[[40,50],[56,44],[72,48],[86,56],[70,64],[48,64],[34,60]].map(([t,n])=>`<circle cx="${t}" cy="${n}" r="15" fill="#fff" ${R(3)}/>`).join("")}<ellipse cx="60" cy="55" rx="30" ry="14" fill="#fff"/>
      <g class="head"><ellipse cx="96" cy="46" rx="13" ry="15" fill="#6b5a6e" ${R()}/><circle cx="92" cy="32" r="8" fill="#fff" ${R(3)}/><ellipse class="ear" cx="82" cy="44" rx="8" ry="4" fill="#6b5a6e" ${R(3)}/>
      <circle cx="99" cy="42" r="3.2" fill="#fff"/><circle cx="99.5" cy="42" r="1.8" fill="${Ue}"/>${ao(102,52)}</g></svg>`;case 2:return`<svg viewBox="0 0 120 100">${lr([38,50,66,78],66,"#ffadc6")}<path class="tail" d="M28 54 q-10 -4 -6 -12 q6 0 2 8" fill="none" ${R(3)}/>
      <ellipse cx="58" cy="60" rx="32" ry="20" fill="#ffc2d4" ${R()}/><g class="head"><circle cx="90" cy="52" r="16" fill="#ffc2d4" ${R()}/><path d="M80 38 l2 -12 l9 8 Z" fill="#ffadc6" ${R(3)}/>
      <ellipse cx="104" cy="56" rx="7" ry="8" fill="#ff9bb8" ${R(3)}/><circle cx="102" cy="54" r="1.6" fill="${Ue}"/><circle cx="106" cy="57" r="1.6" fill="${Ue}"/>${kn(92,46)}${ao(90,60)}</g></svg>`;case 3:return`<svg viewBox="0 0 120 100">${[[30,72,1],[62,66,1.15],[92,74,.95]].map(([t,n,s])=>`<g transform="translate(${t} ${n}) scale(${s})"><path d="M-4 16 v8 M4 16 v8" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="4" r="14" fill="#ffe066" ${R(3)}/><path d="M-8 2 q-6 4 0 8" fill="#ffd43b" ${R(2)}/><g class="head"><circle cx="5" cy="-8" r="9" fill="#ffe066" ${R(3)}/><path d="M13 -9 l7 2 l-7 3 Z" fill="#ff9f43" ${R(2)}/>${kn(7,-10,2.2)}</g></g>`).join("")}</svg>`;case 4:return`<svg viewBox="0 0 120 100"><circle class="tail" cx="30" cy="68" r="8" fill="#fff" ${R(3)}/><ellipse cx="56" cy="72" rx="28" ry="20" fill="#f6eef9" ${R()}/><ellipse cx="74" cy="90" rx="12" ry="5" fill="#f6eef9" ${R(3)}/>
      <g class="head"><ellipse class="ear" cx="78" cy="26" rx="7" ry="20" fill="#f6eef9" ${R(3)} transform="rotate(-12 78 26)"/><ellipse cx="78" cy="26" rx="3" ry="13" fill="#ffc2d4" transform="rotate(-12 78 26)"/>
      <ellipse cx="90" cy="28" rx="7" ry="20" fill="#f6eef9" ${R(3)} transform="rotate(10 90 28)"/><circle cx="86" cy="56" r="17" fill="#f6eef9" ${R()}/>${kn(92,52)}<circle cx="102" cy="58" r="2.5" fill="#ff8fab"/>${ao(90,63)}</g></svg>`;default:return`<svg viewBox="0 0 120 100">${lr([30,42,72,84],62,"#fff")}<path class="tail" d="M20 50 q-6 14 0 26" fill="none" ${R(3)}/>
      <rect x="18" y="38" width="80" height="34" rx="16" fill="#fff" ${R()}/><path d="M30 40 q10 8 4 20 q-10 -2 -10 -14 Z M60 42 q14 2 10 18 q-12 4 -14 -8 Z" fill="${Ue}"/><ellipse cx="60" cy="74" rx="8" ry="5" fill="#ffadc6" ${R(2)}/>
      <g class="head"><path d="M90 24 l-8 -8 M108 24 l8 -8" stroke="#f5d27a" stroke-width="5" stroke-linecap="round"/><rect x="86" y="22" width="26" height="30" rx="12" fill="#fff" ${R()}/>
      <ellipse cx="100" cy="52" rx="14" ry="10" fill="#ffc2d4" ${R(3)}/><circle cx="95" cy="52" r="1.8" fill="${Ue}"/><circle cx="105" cy="52" r="1.8" fill="${Ue}"/>${kn(94,34)}${kn(106,34)}
      <ellipse class="ear" cx="82" cy="30" rx="7" ry="4" fill="#fff" ${R(3)}/></g></svg>`}}const Lt={x:2265,y:520,rx:110,ry:34},bE=476,il=[{name:"Chestnut",body:"#c97b45",mane:"#7a3f22",sock:"#fff6e6"},{name:"Snowy",body:"#fdf8f3",mane:"#d9cdc4",sock:"#e9ddd2"},{name:"Midnight",body:"#4a3f52",mane:"#2a2230",sock:"#6b5e74"},{name:"Sunny",body:"#f2c96b",mane:"#fff6e0",sock:"#fff6e0"},{name:"Rainbow Pony",body:"#fff0fa",mane:"rainbow",sock:"#ffd6ec"}];function dh(e,t=!1){const n=il[e]??il[0],s=n.mane==="rainbow",o=s?fn.map((r,l)=>{const c=124-l*1.6,d=14+l*2.4;return`<path d="M${c.toFixed(1)} ${d.toFixed(1)} q-6.5 2 -4.5 ${6+l*.35}" fill="none" stroke="${r}" stroke-width="5.5" stroke-linecap="round"/>`}).join(""):`<path d="M106 20 q-14 6 -18 30 q8 -6 10 -2 q4 -12 14 -18 Z" fill="${n.mane}" ${R(3)}/>`,i=s?`<g class="tail">${fn.map((r,l)=>`<path d="M30 58 q-18 ${8+l*3} -14 ${36+l}" fill="none" stroke="${r}" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`:`<path class="tail" d="M30 56 q-20 10 -14 44 q10 -10 8 -20 q6 -10 10 -18 Z" fill="${n.mane}" ${R(3)}/>`,a=(r,l)=>`<g class="leg ${l}"><rect x="${r}" y="78" width="12" height="44" rx="5" fill="${n.body}" ${R(3)}/><rect x="${r}" y="110" width="12" height="12" rx="4" fill="${n.sock}" ${R(3)}/></g>`;return`<svg viewBox="0 0 160 130" class="horsesvg">${i}${a(40,"a")}${a(56,"b")}${a(96,"b")}${a(112,"a")}
    <ellipse cx="80" cy="68" rx="50" ry="24" fill="${n.body}" ${R()}/>
    ${t||s?`<path class="saddle" data-top="43" d="M64 46 q16 -6 32 0 l-2 22 q-14 4 -28 0 Z" fill="${s?"#b197fc":"#e8590c"}" ${R(3)}/>`:""}
    <g class="head"><path d="M108 66 L114 30 Q118 16 132 18 L148 36 Q152 46 142 48 L130 46 L128 70 Z" fill="${n.body}" ${R()}/>
    <path d="M114 22 l2 -14 l8 12 Z" fill="${n.body}" ${R(3)}/>${o}
    ${kn(130,30,3.4)}<circle cx="146" cy="42" r="2" fill="${Ue}"/>${ao(136,40)}
    ${s?`<path d="M120 14 l4 -14 l4 14 Z" fill="#ffd43b" ${R(2)}/>`:""}</g>
    ${s?'<g fill="#fff" opacity=".9"><path d="M60 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M92 74 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/></g>':""}</svg>`}const wE=`<svg viewBox="0 0 180 170"><path d="M10 70 L90 14 L170 70" fill="#ffa94d" ${R(5)}/>
  <rect x="24" y="66" width="132" height="84" rx="8" fill="#fff6e6" ${R()}/>${fn.map((e,t)=>`<rect x="${24+t*22}" y="66" width="22" height="10" fill="${e}"/>`).join("")}
  <rect x="24" y="66" width="132" height="10" fill="none" ${R(3)}/><circle cx="90" cy="108" r="22" fill="#5a3d5c"/>
  <path d="M60 150 l-12 16 M120 150 l12 16" ${R(5)}/>
  <g class="hen"><ellipse cx="90" cy="118" rx="20" ry="14" fill="#fff" ${R(3)}/><circle cx="104" cy="104" r="10" fill="#fff" ${R(3)}/><path d="M100 94 q3 -8 8 0" fill="#ff6b6b" ${R(2)}/>
  <path d="M113 104 l7 2 -7 3 Z" fill="#ffa94d" ${R(2)}/>${kn(106,102,2)}</g>
  <text x="90" y="54" text-anchor="middle" font-size="16" font-weight="900" fill="${Ue}" font-family="Nunito, system-ui, sans-serif">EGGS</text></svg>`,kE=`<svg viewBox="0 0 170 130"><rect x="80" y="30" width="54" height="50" rx="8" fill="#bde6f7" ${R()}/><rect x="74" y="24" width="66" height="10" rx="4" fill="#ff6b6b" ${R(3)}/>
  <rect x="20" y="62" width="130" height="34" rx="12" fill="#ff6b6b" ${R()}/><rect x="28" y="40" width="10" height="24" rx="3" fill="#868e96" ${R(3)}/>
  <circle cx="122" cy="98" r="28" fill="${Ue}"/><circle cx="122" cy="98" r="13" fill="#ffd43b" ${R(3)}/><circle cx="44" cy="106" r="18" fill="${Ue}"/><circle cx="44" cy="106" r="8" fill="#ffd43b" ${R(3)}/>
  <circle cx="26" cy="76" r="5" fill="#fff3b0" ${R(2)}/></svg>`,vE=`<svg viewBox="0 0 240 300"><rect x="104" y="160" width="32" height="140" rx="10" fill="#c99366" ${R()}/>
  <circle cx="120" cy="110" r="90" fill="#5cc985" ${R()}/><circle cx="62" cy="140" r="50" fill="#5cc985" ${R()}/><circle cx="180" cy="140" r="52" fill="#5cc985" ${R()}/>
  ${[[80,90],[150,70],[175,140],[100,150],[130,115],[60,140]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="11" fill="#ff6b6b" ${R(3)}/><path d="M${e} ${t-10} q2 -6 6 -7" fill="none" ${R(2)}/>`).join("")}</svg>`,Rp=[[80,90],[150,70],[175,140],[100,150]],k1=`<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="14" fill="#ff6b6b" ${R(3)}/><path d="M20 10 q2 -6 6 -7" fill="none" ${R(2.5)}/><ellipse cx="27" cy="8" rx="5" ry="3" fill="#5cc985" ${R(2)}/><circle cx="14" cy="18" r="3" fill="#fff" opacity=".6"/></svg>`,Jl=`<svg viewBox="0 0 40 40"><path d="M12 14 L32 10 L16 36 Z" fill="#ff922b" ${R(3)}/><path d="M18 18 l5 -1 M17 24 l4 -1" ${R(2)}/><path d="M30 10 q4 -8 8 -6 M30 10 q-2 -8 2 -10 M30 10 q6 -2 8 2" fill="none" stroke="#40c057" stroke-width="4" stroke-linecap="round"/></svg>`,_E=`<svg viewBox="0 0 40 40"><path d="M6 34 Q20 4 34 34 Z" fill="#f5d27a" ${R(3)}/><path d="M14 30 L18 14 M20 32 V10 M26 30 L22 14" stroke="#d9a93f" stroke-width="2.5" stroke-linecap="round"/></svg>`,ba=`<svg viewBox="0 0 40 40"><path d="M20 4 C30 4 34 20 34 26 C34 34 28 38 20 38 C12 38 6 34 6 26 C6 20 10 4 20 4 Z" fill="#fff6e6" ${R(3)}/><circle cx="15" cy="16" r="3" fill="#fff"/></svg>`,fh=(e="#ff8fab")=>`<svg viewBox="0 0 40 40"><path d="M20 38 V20" stroke="#40c057" stroke-width="4" stroke-linecap="round"/>${[0,72,144,216,288].map(t=>`<circle cx="${20+Math.cos(t*Math.PI/180)*8}" cy="${14+Math.sin(t*Math.PI/180)*8}" r="7" fill="${e}" ${R(2.5)}/>`).join("")}<circle cx="20" cy="14" r="5" fill="#ffd43b" ${R(2)}/></svg>`,v1={carrot:Jl,apple:k1,hay:_E},$E=e=>`<svg viewBox="0 0 80 90"><g transform="translate(14 0) scale(1.3)">${v1[e].replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g>
  <path d="M10 40 H70 L62 86 H18 Z" fill="${e==="carrot"?"#74c0fc":e==="apple"?"#ffa8c5":"#b2f2bb"}" ${R(4)}/><path d="M12 52 H68" stroke="#fff" stroke-width="4" opacity=".6"/></svg>`,xE=`<svg viewBox="0 0 60 50"><path d="M12 22 Q30 -6 48 22" fill="none" stroke="${Ue}" stroke-width="7" stroke-linecap="round"/><path d="M12 22 Q30 -6 48 22" fill="none" stroke="#e0a96d" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 22 H56 L50 46 H10 Z" fill="#e0a96d" ${R(3.5)}/><path d="M12 30 H48 M14 38 H46" stroke="#b5793d" stroke-width="3"/></svg>`,Cp=["#ff8fab","#c9a0dc","#ffd43b","#74c0fc","#ff922b"];function _1(e,t,n){const s=`<ellipse cx="35" cy="76" rx="30" ry="11" fill="${e?.wet?"#7a4b2e":"#9c6b46"}" ${R(3)}/>`;if(!e)return`<svg viewBox="0 0 70 90">${s}<path d="M20 74 q4 -3 8 0 M36 78 q4 -3 8 0" stroke="#b5875f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;const o=Cp[n%Cp.length];let i="";t===0&&(i=`<circle cx="27" cy="72" r="3" fill="#f2dcb8" ${R(1.5)}/><circle cx="36" cy="75" r="3" fill="#f2dcb8" ${R(1.5)}/><circle cx="44" cy="71" r="3" fill="#f2dcb8" ${R(1.5)}/>`),t===1&&(i=`<path d="M35 72 V58" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="57" rx="7" ry="4" fill="#69db7c" ${R(2)}/><ellipse cx="41" cy="55" rx="7" ry="4" fill="#69db7c" ${R(2)}/>`),t===2&&(i=`<path d="M35 72 V40 M35 60 Q22 54 20 42 M35 56 Q48 50 50 38" stroke="#40c057" stroke-width="4" fill="none" stroke-linecap="round"/>${e.seed==="flower"?`<circle cx="35" cy="38" r="7" fill="#b2f2bb" ${R(2)}/>`:""}`),t===3&&(i=e.seed==="carrot"?`<path d="M26 74 L44 72 L35 86 Z" fill="#ff922b" ${R(2.5)}/><path d="M35 72 Q24 50 22 38 M35 72 Q36 48 36 34 M35 72 Q46 50 50 40" stroke="#40c057" stroke-width="5" fill="none" stroke-linecap="round"/>`:`<path d="M35 72 V34" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="54" rx="8" ry="4" fill="#69db7c" ${R(2)}/>${[0,72,144,216,288].map(l=>`<circle cx="${35+Math.cos(l*Math.PI/180)*10}" cy="${28+Math.sin(l*Math.PI/180)*10}" r="8" fill="${o}" ${R(2.5)}/>`).join("")}<circle cx="35" cy="28" r="6" fill="#ffd43b" ${R(2)}/>`);const a=e.wet?"":`<g class="needWater"><path d="M56 18 q6 10 0 14 q-6 -4 0 -14 Z" fill="#74c0fc" ${R(2)}/></g>`,r=t===3?`<g class="ready"><path d="M58 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffd43b" ${R(1.5)}/></g>`:"";return`<svg viewBox="0 0 70 90">${s}${i}${a}${r}</svg>`}const ME=`<svg viewBox="0 0 48 48">${fn.map((e,t)=>`<path d="M${6+t*2.6} 38 A${18-t*2.6} ${18-t*2.6} 0 0 1 ${42-t*2.6} 38" fill="none" stroke="${e}" stroke-width="3"/>`).join("")}<path d="M4 38 H44" ${R(3)}/></svg>`,LE=`<svg viewBox="0 0 48 48"><path d="M10 34 Q24 22 38 34" fill="none" ${R(4)}/><path d="M24 30 V8 M16 16 L24 8 L32 16" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40 H40" ${R(4)}/></svg>`,EE=`<svg viewBox="0 0 200 320"><path d="M70 310 L84 120 H116 L130 310 Z" fill="#fff6e6" ${R(4)}/><path d="M78 200 H122 M74 260 H126" ${R(3)}/><rect x="88" y="262" width="24" height="48" rx="10" fill="#b197fc" ${R(3)}/>
  <path d="M78 124 L100 92 L122 124 Z" fill="#ff8fab" ${R(4)}/>
  <g class="sails" style="transform-origin:100px 110px">${[0,90,180,270].map(e=>`<g transform="rotate(${e} 100 110)"><path d="M100 110 L104 30 L126 30 L118 104 Z" fill="${["#ffd43b","#74c0fc","#ff8fab","#69db7c"][e/90]}" ${R(3)}/><path d="M108 40 H122 M107 58 H121 M106 76 H120" ${R(2)}/></g>`).join("")}<circle cx="100" cy="110" r="10" fill="#ffa94d" ${R(3)}/></g></svg>`,SE=["GOAT","SHEEP","PIGLET","CHICKS","BUNNY","COW"],TE=e=>`<g class="lantern" style="transform-origin:${e}px 146px"><path d="M${e} 146 V178" ${R(3)}/><circle cx="${e}" cy="204" r="34" fill="#fff3b0" opacity=".45"/>
  <path d="M${e-14} 182 H${e+14} L${e+11} 226 H${e-11} Z" fill="#ffe066" ${R(3)}/><rect x="${e-17}" y="176" width="34" height="8" rx="3" fill="#495057" ${R(2.5)}/><rect x="${e-15}" y="224" width="30" height="7" rx="3" fill="#495057" ${R(2.5)}/><ellipse cx="${e}" cy="205" rx="5" ry="9" fill="#ff922b"/></g>`;function PE(){const e=xf,t=Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64} 146 V440" stroke="#d4895f" stroke-width="3"/>`).join(""),n=Array.from({length:Math.ceil(e/46)},(o,i)=>{const a=i*46,r=160+Math.sin(i/3.1)*8;return`<path d="M${a} ${r} L${a+40} ${r} L${a+20} ${r+30} Z" fill="${fn[i%6]}" ${R(2.5)}/>`}).join(""),s=Mf.map((o,i)=>`<g><rect x="${o-96}" y="318" width="192" height="122" rx="6" fill="#f0c49a" ${R(4)}/>
    <path d="M${o-96} 350 H${o+96} M${o-96} 384 H${o+96} M${o-96} 412 H${o+96}" stroke="#d9a074" stroke-width="3"/><path d="M${o-96} 318 L${o+96} 440 M${o+96} 318 L${o-96} 440" stroke="#e0aa7e" stroke-width="7" opacity=".7"/>
    <rect x="${o-54}" y="284" width="108" height="30" rx="10" fill="#fff6e6" ${R(3)}/><text x="${o}" y="305" text-anchor="middle" font-size="17" font-weight="900" fill="${Ue}" font-family="Nunito, system-ui, sans-serif">${SE[i]}</text></g>`).join("");return`<svg class="parkScene ranchScene barnScene" viewBox="0 0 ${e} ${Oa}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="440" fill="#e8a87c"/>${t}
  <!-- hay loft -->
  <rect width="${e}" height="128" fill="#c98a5e"/>${Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64+32} 0 V128" stroke="#b5764d" stroke-width="3"/>`).join("")}
  ${[120,260,420,980,1130,1290,1640,1790].map((o,i)=>Vn(o,126,i%3===1?.72:.85)).join("")}${[190,1060,1720].map(o=>Vn(o,82,.7)).join("")}
  <rect x="0" y="126" width="${e}" height="24" fill="#a8653a" ${R(4)}/>
  ${[0,1,2,3,4,5,6].map(o=>`<path d="M${120+o*280} 150 L${180+o*280} 210" stroke="#a8653a" stroke-width="12" stroke-linecap="round"/><path d="M${120+o*280} 150 L${180+o*280} 210" ${R(2)}/>`).join("")}
  <!-- ladder up to the loft -->
  <g transform="translate(1840 0)"><path d="M-22 150 L-30 440 M22 150 L30 440" stroke="#c99366" stroke-width="10" stroke-linecap="round"/>${[190,240,290,340,390].map(o=>`<path d="M${-22-(o-150)*.028} ${o} H${22+(o-150)*.028}" stroke="#c99366" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
  <!-- rainbow bunting + big rainbow banner -->
  <path d="M0 160 Q${e/2} 176 ${e} 160" fill="none" ${R(2)}/>${n}
  <g transform="translate(${e/2+60} 236)">${fn.map((o,i)=>`<rect x="${-180+i*60}" y="-26" width="60" height="44" fill="${o}"/>`).join("")}<rect x="-180" y="-26" width="360" height="44" rx="4" fill="none" ${R(4)}/>
    <path d="M-180 -26 L-200 -4 L-180 18 M180 -26 L200 -4 L180 18" fill="#ff8fab" ${R(3)}/>
    <text x="0" y="6" text-anchor="middle" font-size="26" font-weight="900" fill="#fff" stroke="${Ue}" stroke-width="5" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  <!-- round windows with daylight -->
  ${[440,1720].map(o=>`<circle cx="${o}" cy="236" r="34" fill="#c7e8ff" ${R(4)}/><path d="M${o-34} 236 H${o+34} M${o} 202 V270" ${R(3)}/>`).join("")}
  ${s}
  <!-- the big door (back outside) -->
  <rect x="24" y="200" width="206" height="244" rx="10" fill="#b5703f" ${R(4)}/>
  <rect x="38" y="214" width="178" height="230" fill="#c7e8ff"/><path d="M38 360 Q120 330 216 352 V444 H38 Z" fill="#a6e3a0"/><circle cx="180" cy="250" r="16" fill="#ffe066"/>
  <path d="M38 214 H216 V444 M38 214 V444" fill="none" ${R(4)}/>
  <!-- straw floor -->
  <rect x="0" y="438" width="${e}" height="162" fill="#f2d58a"/><path d="M0 440 H${e}" ${R(4)}/>
  ${Array.from({length:70},(o,i)=>{const a=i*137%e,r=470+i*53%120;return`<path d="M${a} ${r} l${14+i%3*4} ${i%2?-4:4}" stroke="#d9a93f" stroke-width="3" stroke-linecap="round"/>`}).join("")}
  <!-- feed station -->
  <g transform="translate(356 0)"><rect x="-70" y="456" width="140" height="34" rx="12" fill="#fff6e6" ${R(3)}/><text x="0" y="480" text-anchor="middle" font-size="16" font-weight="900" fill="${Ue}" font-family="Nunito, system-ui, sans-serif">FOOD 🥕🍎🌾</text></g>
  ${Vn(1790,590,.8)}${Vn(1700,600,.65)}
  ${[290,660,1330,1590].map(TE).join("")}
  </svg>`}const wa=600,Kt="#5a3d5c",he=(e=4)=>`stroke="${Kt}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function Da(e){const t=yo[e].seats,n=t<=2?140:t===4?110:100,s=(t-1)/2;return Array.from({length:t},(o,i)=>({x:yo[e].x+(i-s)*n,y:558-Math.abs(i-s)*8}))}const Ip=["#ff7eb3","#ffd43b","#66d9e8","#d0bfff","#fff"],sn=(e,t,n=1,s="#fff")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -9 L2.2 -2.4 L9 -2.2 L3.4 2.2 L5.4 9 L0 4.6 L-5.4 9 L-3.4 2.2 L-9 -2.2 L-2.2 -2.4 Z" fill="${s}" stroke="${Kt}" stroke-width="1.2" stroke-linejoin="round"/>`;function Zd(e,t,n,s){const o=`<path d="M36 ${t} Q ${e/2} ${t+n+8} ${e-36} ${t}" fill="none" stroke="${Kt}" stroke-width="3"/>`,i=Array.from({length:s},(a,r)=>{const l=s===1?.5:r/(s-1),c=48+l*(e-96),d=t+Math.sin(l*Math.PI)*n,f=Ip[r%Ip.length];return`<g class="bulb" style="animation-delay:-${r%8*.22}s"><line x1="${c}" y1="${d-16}" x2="${c}" y2="${d-6}" stroke="${Kt}" stroke-width="2"/><circle cx="${c}" cy="${d}" r="7.5" fill="${f}" ${he(2)}/><circle cx="${c-2}" cy="${d-2}" r="2.2" fill="#fff" opacity=".85"/></g>`}).join("");return o+i}const Ti=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">
  <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".12"/>
  <path d="M-40 10 Q-48 -22 -10 -28 Q10 -46 34 -18 Q50 2 34 18 Q8 32 -24 20 Q-42 16 -40 10 Z" fill="${n}" ${he(3)}/>
  <path d="M-18 -6 Q-4 -20 14 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <circle cx="16" cy="6" r="4" fill="#fff" opacity=".35"/>
</g>`,Bp=(e,t,n)=>`<g transform="translate(${e} ${t})">
  <ellipse cx="0" cy="16" rx="28" ry="9" fill="#000" opacity=".12"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="${n}" ${he(3)}/>
  <ellipse cx="-6" cy="-2" rx="12" ry="7" fill="#fff" opacity=".35"/>
  <path d="M0 -16 V-28" ${he(3)}/><circle cy="-32" r="6" fill="#ffd43b" ${he(2)}/>
</g>`;function Pi(e,t,n,s,o,i=""){return`<g class="photoFrame${i}" transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-40" y="-52" width="80" height="104" rx="6" fill="#fff" ${he(3.5)}/>
    <rect x="-32" y="-44" width="64" height="72" rx="4" fill="${s}"/>
    ${o}
    <rect x="-10" y="-58" width="20" height="10" rx="2" fill="#ffe8a3" opacity=".85" transform="rotate(-8)"/>
  </g>`}function cr(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-28" y="-34" width="56" height="68" rx="3" fill="#fff" ${he(3)}/>
    <rect x="-22" y="-28" width="44" height="40" fill="${s}"/>
    ${o}
  </g>`}function dr(e,t,n,s){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="36" rx="26" ry="8" fill="#000" opacity=".12"/>
    <path d="M-18 36 L-12 -2 H12 L18 36 Z" fill="${n}" ${he(3)}/>
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c9a27a" ${he(2)}/>
    <ellipse cx="-16" cy="-16" rx="16" ry="22" fill="${s}" ${he(3)} transform="rotate(-18)"/>
    <ellipse cx="16" cy="-18" rx="16" ry="22" fill="${s}" ${he(3)} transform="rotate(16)"/>
    <ellipse cx="0" cy="-28" rx="14" ry="20" fill="${s}" ${he(3)}/>
    <circle cx="0" cy="-36" r="6" fill="#ff8ec8" ${he(2)}/>
  </g>`}function AE(e,t){return`<g transform="translate(${e} ${t})">
    <ellipse cx="28" cy="118" rx="32" ry="8" fill="#000" opacity=".12"/>
    <rect width="56" height="118" rx="10" fill="#e7fbff" ${he()}/>
    <rect y="52" width="56" height="8" fill="#d0f4ff" ${he(2)}/>
    <rect x="44" y="18" width="6" height="22" rx="3" fill="#ffd43b" ${he(2)}/>
    <rect x="44" y="70" width="6" height="28" rx="3" fill="#ffd43b" ${he(2)}/>
    <rect x="8" y="12" width="28" height="22" rx="4" fill="#fff" ${he(2)}/>
    <circle cx="16" cy="22" r="4" fill="#ff8ec8"/><circle cx="28" cy="24" r="3" fill="#ffd43b"/>
    <path d="M18 78 C14 72 8 74 12 82 C15 88 18 90 18 90 C18 90 21 88 24 82 C28 74 22 72 18 78 Z" fill="#ff4d94" ${he(1.5)}/>
  </g>`}function RE(e,t,n){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="6" rx="34" ry="9" fill="#000" opacity=".1"/>
    <path d="M-46 -16 C-50 -86 -26 -108 0 -110 C26 -108 50 -86 46 -16 Z" fill="#fff6fb" ${he()}/>
    <path d="M-32 -20 C-34 -74 -16 -90 0 -92 C16 -90 34 -74 32 -20 Z" fill="${n}"/>
    <ellipse cx="0" cy="-10" rx="40" ry="16" fill="${n}" ${he()}/>
    <ellipse cx="-8" cy="-16" rx="14" ry="6" fill="#fff" opacity=".4"/>
    <path d="M-22 -2 L-26 16 M22 -2 L26 16" fill="none" stroke="${Kt}" stroke-width="4" stroke-linecap="round"/>
  </g>`}function CE(e){const t=yo[e],n=t.game==="four"?"Four":"Slay",s=t.game==="four"?"#7ad7ea":e===0?"#ff8ec8":"#e0b0ff",o=t.game==="four"?"#b8f2ff":e===0?"#ffd0e6":"#ead9ff",i=t.seats>=6?250:t.seats>=4?200:150;return`${Da(e).map(r=>RE(r.x,r.y,o)).join("")}
  <g transform="translate(${t.x} 500)">
    <ellipse cx="0" cy="28" rx="${i+18}" ry="20" fill="#000" opacity=".1"/>
    <rect x="-18" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${he(3)}/>
    <rect x="4" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${he(3)}/>
    <ellipse cx="0" cy="-4" rx="${i}" ry="30" fill="${s}" stroke="#ffd43b" stroke-width="6"/>
    <ellipse cx="0" cy="-4" rx="${i-16}" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <ellipse cx="${-i*.25}" cy="-12" rx="${i*.35}" ry="8" fill="#fff" opacity=".28"/>
    <text x="0" y="4" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="${Kt}" stroke-width="4" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${n}</text>
  </g>`}const Ai=(e,t,n=1,s="#ff4d94")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 4 C-6 -4 -14 -2 -10 6 C-7 12 0 16 0 16 C0 16 7 12 10 6 C14 -2 6 -4 0 4 Z" fill="${s}" stroke="${Kt}" stroke-width="1.6" stroke-linejoin="round"/>`;function Op(e,t){const n=Ta,s=Math.max(1,Math.ceil(t));let o="";if(e==="top"){o=`<rect width="${n}" height="${s}" fill="#ffe0f2"/>`;for(let i=s-70,a=0;i>24;i-=150,a++)o+=Zd(n,i,a%2?22:16,a%2?26:20);for(let i=0;i<14;i++){const a=90+i*397%(n-180),r=20+i*131%Math.max(20,s-70);o+=sn(a,r,.55+i%3*.2,i%2?"#fff":"#ffd43b")}}else{o=`<defs><linearGradient id="grFloorExt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e089ab"/><stop offset="1" stop-color="#d27399"/></linearGradient></defs>
  <rect width="${n}" height="${s}" fill="url(#grFloorExt)"/>`;for(let i=46;i<s;i+=64)o+=`<rect y="${i}" width="${n}" height="3" fill="#fff" opacity=".18"/>`}return`<svg class="grExt grExt-${e}" viewBox="0 0 ${n} ${s}" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${o}</svg>`}function IE(){const e=Ta,t=[[120,200],[260,250],[640,210],[900,250],[1180,190],[1560,230],[1860,180],[2100,240],[2420,200],[2520,280]];return`<svg class="grScene" viewBox="0 0 ${e} ${wa}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="${e}" height="${wa}" fill="url(#grWall)"/>
  <rect y="390" width="${e}" height="80" fill="#fff6fb" opacity=".45"/>
  ${Array.from({length:8},(n,s)=>`<rect x="${40+s*330}" y="400" width="280" height="62" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`).join("")}
  <rect y="468" width="${e}" height="132" fill="url(#grFloor)"/>
  <rect y="464" width="${e}" height="12" fill="#ffd43b" ${he(3)}/>
  ${[720,1500,2150].map((n,s)=>`<ellipse cx="${n}" cy="548" rx="${s===1?210:280}" ry="42" fill="${s===1?"#d8f6ff":s===0?"#ffe0f0":"#f3e8ff"}" stroke="#fff" stroke-width="4" opacity=".8"/>`).join("")}
  ${Zd(e,28,22,28)}
  ${Zd(e,78,16,18)}
  ${t.map(([n,s],o)=>sn(n,s,.7+o%3*.28,o%2?"#fff":"#ffd43b")).join("")}

  <g transform="translate(1180 70)">
    <rect x="20" y="20" width="220" height="150" rx="16" fill="url(#grSky)" ${he()}/>
    <path d="M20 70 H240 M130 20 V170" ${he(3)}/>
    <circle cx="78" cy="48" r="14" fill="#ffd43b" ${he(2)}/>
    <path d="M8 36 Q20 90 8 150" fill="#ff8ec8" ${he(3)}/><path d="M252 36 Q240 90 252 150" fill="#d0bfff" ${he(3)}/>
  </g>

  <g class="neonSign" transform="translate(560 168)">
    <g class="neonSignArt">
    <rect x="-228" y="-58" width="456" height="108" rx="28" fill="#2b1430" ${he(5)}/>
    <rect class="neonRing" x="-214" y="-44" width="428" height="80" rx="22" fill="none" stroke="#ff4d94" stroke-width="4"/>
    <path d="M-150 8 C-162 -14 -186 -8 -174 12 C-166 26 -150 36 -150 36 C-150 36 -134 26 -126 12 C-114 -8 -138 -14 -150 8 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="2"/>
    <text x="6" y="16" text-anchor="middle" font-size="40" font-weight="900" fill="#ff7eb3" stroke="#fff6fb" stroke-width="2" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY CLUB</text>
    </g>
  </g>

  ${Pi(500,340,-6,"#ffe0f0",`${Ai(0,8,1.4)}${sn(-18,-16,.7,"#ffd43b")}${sn(18,-10,.55,"#66d9e8")}`," frameAtHead")}
  ${Pi(270,196,-8,"#ffe0f0",`${Ai(0,8,1.4)}${sn(-18,-16,.7,"#ffd43b")}${sn(18,-10,.55,"#66d9e8")}`," framePhone")}
  ${Pi(980,240,5,"#e7fbff",`<ellipse cx="0" cy="6" rx="16" ry="12" fill="#fff" ${he(2)}/><path d="M-6 6 Q0 -8 6 6" fill="none" stroke="${Kt}" stroke-width="2"/><path d="M0 18 V28 M-12 24 H12" ${he(2)}/>`)}
  ${Pi(1680,255,-4,"#fff3c4",`${sn(0,2,1.5,"#ffd43b")}`)}
  ${Pi(2360,245,6,"#f3e8ff",`${Ai(0,4,1.3,"#d0bfff")}`)}
  ${cr(400,300,8,"#fff0f6",Ai(0,-4,1.1))}
  ${cr(820,310,-7,"#e7fbff",sn(0,-6,1,"#66d9e8"))}
  ${cr(1900,300,9,"#fff6e6",sn(0,-6,1,"#ffd43b"))}
  ${cr(2280,320,-8,"#ffe0f0",Ai(0,-4,1))}

  <g class="disco" transform="translate(1288 36)">
    <line y1="0" y2="22" stroke="${Kt}" stroke-width="3"/>
    <circle cy="44" r="26" fill="url(#disco)" ${he(3)}/>
    <path d="M-14 36 L0 56 L14 36 M-8 48 H8" fill="none" stroke="#fff" stroke-width="2.5"/>
    ${sn(-30,20,.45)}${sn(32,28,.4,"#ffd43b")}
  </g>

  <g transform="translate(86 292)">
    <rect width="78" height="168" rx="12" fill="#ff8ec8" ${he()}/>
    <rect x="8" y="10" width="62" height="36" rx="8" fill="#fff6e6" ${he(2)}/>
    <text x="39" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="${Kt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
    <circle cx="62" cy="96" r="5" fill="#ffd43b" ${he(2)}/>
    <rect x="22" y="118" width="34" height="8" rx="3" fill="#fff" opacity=".45"/>
  </g>

  ${dr(40,400,"#ffd43b","#8ce99a")}
  ${dr(1080,392,"#ff8ec8","#69db7c")}
  ${dr(1600,400,"#d0bfff","#8ce99a")}
  ${dr(2520,396,"#66d9e8","#69db7c")}
  ${AE(200,348)}
  <g transform="translate(2420 360)">
    <rect width="130" height="100" rx="14" fill="#fff6fb" ${he()}/>
    <rect y="28" width="130" height="10" fill="#ffd0e6" ${he(2)}/>
    <circle cx="28" cy="64" r="12" fill="#ffd43b" ${he(2)}/><circle cx="64" cy="66" r="10" fill="#ff8ec8" ${he(2)}/><rect x="86" y="52" width="28" height="22" rx="6" fill="#66d9e8" ${he(2)}/>
    <text x="65" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="${Kt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">SNACKS</text>
  </g>

  ${Ti(330,455,"#ff8ec8",1.05)}
  ${Ti(1120,468,"#d0bfff")}
  ${Ti(1360,470,"#8ce4f2",.9)}
  ${Ti(1780,462,"#ffd43b")}
  ${Bp(1480,500,"#ffb3d9")}
  ${Bp(2e3,505,"#c9b3ff")}
  ${Ti(2550,468,"#ff8ec8",.85)}

  ${yo.map((n,s)=>CE(s)).join("")}
  </svg>`}const BE=`<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${Kt}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`,j="#5a3d5c",OE=`<svg viewBox="0 0 120 100"><rect x="0" y="62" width="120" height="38" rx="14" fill="#9fe0aa" stroke="${j}" stroke-width="3"/>
  <path d="M18 70 L30 22 L42 70 M78 70 L90 22 L102 70" fill="none" stroke="#8ecae6" stroke-width="5" stroke-linecap="round"/><path d="M26 22 H94" stroke="#ff8fab" stroke-width="7" stroke-linecap="round"/>
  <path d="M50 22 V54 M66 22 V54" stroke="${j}" stroke-width="2.5"/><rect x="45" y="52" width="26" height="7" rx="3" fill="#ff9f68" stroke="${j}" stroke-width="2.5"/>
  <circle cx="104" cy="14" r="9" fill="#ffd166" stroke="${j}" stroke-width="3"/></svg>`,$1=`<svg viewBox="0 0 120 100"><path d="M20 50 L60 16 L100 50" fill="#ff8fab" stroke="${j}" stroke-width="4" stroke-linejoin="round"/><rect x="28" y="48" width="64" height="44" rx="6" fill="#fff6e6" stroke="${j}" stroke-width="4"/>
  <rect x="52" y="64" width="16" height="28" rx="4" fill="#c9a0dc" stroke="${j}" stroke-width="3"/><rect x="34" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${j}" stroke-width="3"/><rect x="73" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${j}" stroke-width="3"/></svg>`,hh=`<svg viewBox="0 0 120 100"><path d="M40 18 L24 28 L14 46 L30 52 L34 44 V88 H86 V44 L90 52 L106 46 L96 28 L80 18 Q60 34 40 18 Z" fill="#8ecae6" stroke="${j}" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="58" r="7" fill="#fff3b0" stroke="${j}" stroke-width="3"/></svg>`,ve=e=>`<div class="wnArt">${e}</div>`,x1=`<svg viewBox="0 0 120 100"><rect x="16" y="58" width="74" height="24" rx="10" fill="#fff" stroke="${j}" stroke-width="4"/><circle cx="32" cy="70" r="7" fill="#ff8fab" stroke="${j}" stroke-width="3"/><circle cx="52" cy="70" r="7" fill="#ffe066" stroke="${j}" stroke-width="3"/><circle cx="72" cy="70" r="7" fill="#8ecae6" stroke="${j}" stroke-width="3"/><path d="M86 46 l14 -16 8 8 -14 16z" fill="#ffd166" stroke="${j}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="44" width="12" height="24" rx="4" fill="#c9a0dc" stroke="${j}" stroke-width="3"/></svg>`,DE=`<svg viewBox="0 0 120 100">${fn.map((e,t)=>`<path d="M${12+t*6} 84 A${48-t*6} ${48-t*6} 0 0 1 ${108-t*6} 84" fill="none" stroke="${e}" stroke-width="6"/>`).join("")}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${j}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${j}" stroke-width="3"/></svg>`,HE=`<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${ba.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g><g transform="translate(52 22) scale(1.4)">${ba.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g></svg>`,M1=(e,t,n,s)=>`<g transform="translate(${t} ${n}) scale(${s})">${e.replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"")}</g>`,WE=`<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${j}" stroke-width="4"/>${M1(wf(St({skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6"})).replace('viewBox="14 2 72 74"','viewBox="0 0 100 160"'),26,12,.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`,VE=`<svg viewBox="0 0 120 100"><rect x="8" y="28" width="104" height="64" rx="16" fill="#fff0f6" stroke="${j}" stroke-width="4"/><path d="M8 40 L60 12 L112 40" fill="#ff6b9a" stroke="${j}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 58 C52 48 40 50 46 60 C50 68 60 74 60 74 C60 74 70 68 74 60 C80 50 68 48 60 58 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  ${[18,34,50,66,82,98].map((e,t)=>`<circle cx="${e}" cy="24" r="4" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" stroke="${j}" stroke-width="1.5"/>`).join("")}</svg>`,UE=`<svg viewBox="0 0 120 100"><rect x="28" y="8" width="64" height="84" rx="12" fill="#fff" stroke="${j}" stroke-width="4"/><rect x="28" y="8" width="64" height="84" rx="12" fill="none" stroke="#ff7eb3" stroke-width="6"/><path d="M48 36 L54 24 L60 34 L68 20 L76 34 L82 24 L88 36 Z" fill="#ffd43b" stroke="${j}" stroke-width="2" stroke-linejoin="round"/><text x="60" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#ff4d94" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY</text></svg>`,zE=`<svg viewBox="0 0 120 100"><rect x="10" y="16" width="100" height="72" rx="14" fill="#fff6fb" stroke="${j}" stroke-width="4"/>
  <path d="M36 58 C28 48 18 50 24 60 C28 68 36 74 36 74 C36 74 44 68 48 60 C54 50 44 48 36 58 Z" fill="#ff4d94" stroke="${j}" stroke-width="2"/>
  <path d="M78 28 L82 40 H94 L84 48 L88 60 L78 52 L68 60 L72 48 L62 40 H74 Z" fill="#66d9e8" stroke="${j}" stroke-width="2"/></svg>`,L1=`<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="22" rx="6" fill="#fff" stroke="${j}" stroke-width="3"/><path d="M6 26 H42 M14 18 V40 M22 18 V40 M30 18 V40 M36 18 V40" stroke="${j}" stroke-width="2.4"/><rect x="4" y="12" width="40" height="8" rx="4" fill="#9ad7f5" stroke="${j}" stroke-width="3"/><ellipse cx="20" cy="32" rx="5" ry="3" fill="#ffe0ec"/><ellipse cx="30" cy="32" rx="5" ry="3" fill="#c9e7ff"/></svg>`,QE=`<svg viewBox="0 0 120 100"><ellipse cx="60" cy="72" rx="50" ry="20" fill="#ffc2d4" stroke="${j}" stroke-width="4"/><ellipse cx="60" cy="72" rx="32" ry="11" fill="#fff" stroke="${j}" stroke-width="3"/><path d="M60 58 C50 46 36 48 42 60 C48 70 60 78 60 78 C60 78 72 70 78 60 C84 48 70 46 60 58 Z" fill="#ff4d94" stroke="${j}" stroke-width="3"/><path d="M22 40 Q28 28 36 36" fill="none" stroke="#7dce8a" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="5" fill="#ffd166" stroke="${j}" stroke-width="2"/></svg>`,NE=`<svg viewBox="0 0 120 100"><path d="M16 50 L60 14 L104 50" fill="#ff8fab" stroke="${j}" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="48" width="68" height="40" rx="10" fill="#fff6ea" stroke="${j}" stroke-width="4"/><path d="M42 88 V60 Q60 44 78 60 V88" fill="#ffe8c7" stroke="${j}" stroke-width="3"/><circle cx="82" cy="64" r="7" fill="#bde0fe" stroke="${j}" stroke-width="3"/><circle cx="80" cy="62" r="2" fill="#fff"/></svg>`,qE=`<svg viewBox="0 0 120 100"><rect x="28" y="38" width="64" height="42" rx="8" fill="#8ecae6" stroke="${j}" stroke-width="4"/><path d="M28 44 L60 68 L92 44" fill="none" stroke="${j}" stroke-width="4"/><path d="M76 30 V16" stroke="${j}" stroke-width="4" stroke-linecap="round"/><path d="M76 16 H96 L90 23 L96 30 H76 Z" fill="#ff6b6b" stroke="${j}" stroke-width="3"/></svg>`,FE=`<svg viewBox="0 0 120 100"><rect x="8" y="32" width="48" height="40" rx="14" fill="#fff3b0" stroke="${j}" stroke-width="4"/><rect x="64" y="32" width="48" height="40" rx="14" fill="#fff" stroke="${j}" stroke-width="4"/><path d="M26 44 L40 52 L26 60 Z" fill="${j}"/><circle cx="88" cy="52" r="6" fill="#ff8fab" stroke="${j}" stroke-width="3"/></svg>`,jE=`<svg viewBox="0 0 120 100"><rect x="16" y="18" width="36" height="58" rx="6" fill="#fff" stroke="${j}" stroke-width="4"/><rect x="62" y="24" width="42" height="52" rx="6" fill="#e7f6ff" stroke="${j}" stroke-width="4"/><circle cx="34" cy="66" r="2.4" fill="${j}"/><circle cx="83" cy="66" r="2.4" fill="${j}"/></svg>`,E1=`<svg viewBox="0 0 120 100"><rect x="28" y="16" width="64" height="72" rx="16" fill="#fff" stroke="${j}" stroke-width="4"/><path d="M40 36 H80 M40 52 H80 M40 68 H80" fill="none" stroke="${j}" stroke-width="5" stroke-linecap="round"/><circle cx="92" cy="24" r="12" fill="#ff6b9a" stroke="${j}" stroke-width="3"/><text x="92" y="29" text-anchor="middle" font-size="14" font-weight="900" fill="#fff" font-family="Nunito, ui-rounded, system-ui, sans-serif">1</text></svg>`,ZE=`<svg viewBox="0 0 120 100"><rect x="6" y="10" width="108" height="80" rx="18" fill="#2a2158" stroke="${j}" stroke-width="4"/><circle cx="34" cy="42" r="14" fill="#ffd166" stroke="${j}" stroke-width="3"/><path d="M78 28 a16 16 0 1 0 0 32 a12 12 0 1 1 0 -32z" fill="#fff6e4" stroke="${j}" stroke-width="3"/><circle cx="92" cy="30" r="2" fill="#fff"/><circle cx="70" cy="24" r="1.6" fill="#fff"/><circle cx="100" cy="48" r="1.6" fill="#fff"/></svg>`,GE=`<svg viewBox="0 0 120 100"><circle cx="60" cy="52" r="34" fill="#fff6e4" stroke="${j}" stroke-width="4"/><path d="M60 52 V32 M60 52 L76 60" stroke="${j}" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="52" r="3" fill="${j}"/><path d="M28 22 l4 6 M92 22 l-4 6" stroke="#ffb15c" stroke-width="4" stroke-linecap="round"/></svg>`,S1=`<svg viewBox="0 0 120 100"><path d="M60 18 L72 46 H96 L78 62 L84 90 L60 74 L36 90 L42 62 L24 46 H48 Z" fill="#ffd166" stroke="${j}" stroke-width="4" stroke-linejoin="round"/><path d="M60 48 L28 92 H92 Z" fill="#2f6b4f" stroke="${j}" stroke-width="4" stroke-linejoin="round"/><rect x="52" y="88" width="16" height="8" rx="2" fill="#c44558" stroke="${j}" stroke-width="3"/></svg>`,T1=[{v:10,title:"Winter Cheer!",lines:[{art:ve(S1),text:"The <b>Winter Cheer</b> pack is in your drawer!"}]},{v:9,title:"Everything's tidied into the Menu!",lines:[{art:ve(E1),text:"Everything's tidied into the <b>Menu</b>!"},{art:ve(ZE),text:"The world follows the <b>clock</b>: morning, day, golden evening, and night."},{art:ve(GE),text:"Tap the <b>sun</b> and the <b>moon</b>. <b>Auto</b> follows the clock."}]},{v:8,title:"Make your look!",lines:[{art:ve(qE),text:"Leave a <b>letter</b> in a friend's mailbox!"},{art:ve(FE),text:"Tap <b>Play</b> or <b>Decorate</b>!"},{art:ve(hh),text:"<b>Make your look!</b> New hair, clothes, and colors."},{art:ve(jE),text:"Update every iPad to see the <b>new outfits</b>!"}]},{v:7,title:"New Nursery!",lines:[{art:ve(L1),text:"A new <b>Nursery</b> room, with a <b>crib</b> and a rocker!"},{art:ve(QE),text:"The <b>Cozy Cottage</b> furniture pack is in your drawer!"},{art:ve(NE),text:"A <b>dog kennel</b> and a <b>cat tower</b> for your pets!"}]},{v:6,title:"The clubhouse is open!",lines:[{art:ve(VE),text:"A glam <b>clubhouse</b> on the map!"},{art:ve(UE),text:"Play <b>Slay</b> with friends at a table!"},{art:ve(zE),text:"Line up <b>hearts</b> or <b>stars</b>!"}]},{v:5,title:"Your house looks even cozier!",lines:[{art:ve(x1),text:"Wallpaper and floors show their <b>real patterns</b> when you paint!"},{art:ve(ei(0,"sit",Xo(0,"sit"))),text:"Your cat is <b>big and cozy</b>, just like the toy cat."},{art:ve($1),text:"Tap <b>home</b> to come back from the map, the park, or the ranch."}]},{v:4,title:"A map of our neighborhood!",lines:[{art:ve(bf),text:"Tap the <b>map</b> to go anywhere!"},{art:ve(WE),text:"Tap a friend's face to <b>find her</b>."},{art:ve(Bd(0,jd(0))),text:"The petting zoo is inside the <b>barn</b> now!"}]},{v:3,title:"Rainbow Ranch is open!",lines:[{art:ve(DE),text:"Visit <b>Rainbow Ranch</b>!"},{art:ve(Bd(1,jd(1))),text:"Pet and feed animals at the <b>petting zoo</b>."},{art:ve(nh(4,!1,dh(4))),text:"Ride <b>horses</b> and the <b>rainbow pony</b>!"},{art:ve(Yi("basket",HE)),text:"Collect <b>eggs</b> from the hens."},{art:ve(`<svg viewBox="0 0 70 90">${M1(_1({seed:"carrot",wet:1},3,0),0,0,1)}</svg>`),text:"Grow carrots and flowers in the <b>garden</b>."}]},{v:2,title:"What's new!",lines:[{art:ve(OE),text:"A new <b>park</b>! Swing, slide and splash with friends."},{art:ve(ei(3,"sit",Xo(3,"sit"))),text:"Adopt a <b>cat</b>! She lives in your house."},{art:ve(ga(3,"stand",pa(3,"stand"))),text:"Adopt a <b>dog</b>! Take it to the park to play fetch."}]}],P1=T1[0].v,A1={v:P1,title:"Welcome to your cozy house!",lines:[{art:ve($1),text:"Drag furniture into your rooms."},{art:ve(hh),text:"Dress up your friends."},{art:ve(ei(0,"sit",Xo(0,"sit"))),text:"Adopt a pet from the Menu ☰!"}]},R1=vt("cozy-whatsnew"),YE=1;function KE(){try{const e=Number(localStorage.getItem(R1)),t=["cozy-house","cozy-house-v1","cozy-hood"].some(o=>localStorage.getItem(vt(o))!==null);if(!e&&!t)return{kind:"welcome",entries:[A1]};const n=e||YE,s=T1.filter(o=>o.v>n).slice(0,3);return s.length?{kind:"news",entries:s}:{kind:"none",entries:[]}}catch{return{kind:"none",entries:[]}}}function XE(){try{localStorage.setItem(R1,String(P1))}catch{}}function JE(e,t){const n=e==="welcome"?A1.title:t[0].title,s=t.flatMap(o=>o.lines).slice(0,5);return`<div class="wnBadge">${e==="welcome"?Rg:t[0].v>=10?S1:t[0].v>=9?E1:t[0].v>=8?hh:t[0].v>=7?L1:t[0].v>=6?BE:t[0].v>=5?x1:t[0].v>=4?bf:t[0].v>=3?ME:v4}</div>
    <h2 class="wnTitle">${n}</h2>
    <div class="wnList ${s.length>3?"many":""}">${s.map((o,i)=>`<div class="wnLine" style="animation-delay:${.15+i*.18}s">${o.art}<p>${o.text}</p></div>`).join("")}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`}const C1="cozy-sky",Gd={tint:"#fff6e4",body:"#ffe9f0",pageA:"#ffe0ec",pageB:"#e6ddff",spot:"#fff6fa",fieldA:"#c9f2c7",fieldB:"#8fd18a",win:"#a2d2ff",win2:"#b9e3ff",house:"#fff3b0",mapTint:"#ffffff"},Dp={tint:"#e7b4cc",body:"#f6dce8",pageA:"#ffd0e6",pageB:"#e6d2f8",spot:"#fff0f6",fieldA:"#f6d0e2",fieldB:"#dcc8f0",win:"#f6c6de",win2:"#e4d0f8",house:"#ffe0ee",mapTint:"#f3c4dc"},Hp={tint:"#ffb38a",body:"#ffe4dc",pageA:"#ffe0d6",pageB:"#f0d8ea",spot:"#fff6ee",fieldA:"#d4eec4",fieldB:"#a3cb8a",win:"#ffc48a",win2:"#ffd4b0",house:"#ffc56a",mapTint:"#ffb38a"},Ho={tint:"#2a2350",body:"#14182c",pageA:"#1c1748",pageB:"#101832",spot:"#2c2458",fieldA:"#1a2458",fieldB:"#0c1028",win:"#1a245c",win2:"#12183a",house:"#ffe9a0",mapTint:"#102044"},fr=[{m:0,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...Ho},{m:5*60,opacity:.7,map:.78,glow:.95,stars:.95,glass:1,phase:"night",...Ho},{m:5*60+35,opacity:.42,map:.34,glow:.55,stars:.42,glass:.8,phase:"dawn",...Dp},{m:6*60+25,opacity:.14,map:.16,glow:.28,stars:.08,glass:.9,phase:"dawn",...Dp},{m:7*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...Gd},{m:16*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...Gd},{m:17*60+5,opacity:.08,map:.1,glow:.4,stars:.02,glass:.55,phase:"golden",...Hp},{m:18*60+10,opacity:.18,map:.2,glow:.62,stars:.06,glass:.82,phase:"golden",...Hp},{m:19*60+5,opacity:.52,map:.68,glow:.9,stars:.55,glass:1,phase:"night",...Ho},{m:20*60+10,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...Ho},{m:24*60,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...Ho}],eS={phase:"day",opacity:0,map:0,glow:0,stars:0,glass:0,...Gd},tS={phase:"night",opacity:.7,map:.78,glow:1,stars:1,glass:1,...Ho};function Wp(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function nn(e,t,n){const s=Wp(e),o=Wp(t),i=a=>Math.round(s[a]+(o[a]-s[a])*n).toString(16).padStart(2,"0");return"#"+i(0)+i(1)+i(2)}const Ri=(e,t,n)=>e+(t-e)*n;function nS(e){const t=e.getHours()*60+e.getMinutes()+e.getSeconds()/60;let n=0;for(;n<fr.length-2&&t>=fr[n+1].m;)n++;const s=fr[n],o=fr[n+1],i=Math.max(1,o.m-s.m),a=Math.max(0,Math.min(1,(t-s.m)/i));return{phase:a<.5?s.phase:o.phase,opacity:Ri(s.opacity,o.opacity,a),map:Ri(s.map,o.map,a),glow:Ri(s.glow,o.glow,a),stars:Ri(s.stars,o.stars,a),glass:Ri(s.glass,o.glass,a),tint:nn(s.tint,o.tint,a),body:nn(s.body,o.body,a),pageA:nn(s.pageA,o.pageA,a),pageB:nn(s.pageB,o.pageB,a),spot:nn(s.spot,o.spot,a),fieldA:nn(s.fieldA,o.fieldA,a),fieldB:nn(s.fieldB,o.fieldB,a),win:nn(s.win,o.win,a),win2:nn(s.win2,o.win2,a),house:nn(s.house,o.house,a),mapTint:nn(s.mapTint,o.mapTint,a)}}function Vp(e,t){return t==="day"?eS:t==="night"?tS:nS(e)}function sS(e){return e==="day"||e==="night"||e==="auto"}function oS(e,t=!1){return t?!0:e==="lamp"||e==="window"||e==="stars"||e==="tv"||/lamp|light|lantern|candle|string-lights|night-light/i.test(e)}function Up(){try{if(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches)return!0}catch{}if(typeof navigator>"u")return!1;const e=navigator.hardwareConcurrency;if(typeof e=="number"&&e>0&&e<=2)return!0;const t=navigator.deviceMemory;return typeof t=="number"&&t>0&&t<=2}const zp={day:"night",night:"auto",auto:"day"},Qp={day:"Day",night:"Night",auto:"Auto"},I1='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><g fill="none" stroke="#ffb15c" stroke-width="3" stroke-linecap="round"><path d="M24 7 V13 M24 35 V41 M7 24 H13 M35 24 H41 M12 12 L16 16 M32 32 L36 36 M36 12 L32 16 M16 32 L12 36"/></g></svg>',iS='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 8 a14 14 0 1 0 0 32 a11 11 0 1 1 0 -32z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="3"/><circle cx="14" cy="16" r="1.7" fill="#ffd166"/><circle cx="18" cy="28" r="1.2" fill="#fff"/><circle cx="11" cy="24" r="1" fill="#fff"/></svg>',aS='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="28" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M34 8 a9 9 0 1 0 0 18 a7 7 0 1 1 0 -18z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="14" cy="16" r="1.3" fill="#ffd166"/></svg>',rS={day:I1,night:iS,auto:aS},lS="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)";function cS(){if(document.getElementById("skyInk"))return;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.id="skyInk",e.setAttribute("aria-hidden","true"),e.setAttribute("width","0"),e.setAttribute("height","0"),e.style.cssText="position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none",e.innerHTML=`
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
  `,document.head.appendChild(t)}function dS(e){cS();const t=Up();let n=hS(),s=null,o=Vp(new Date,n),i=0;e.innerHTML=`<button type="button" class="skyBtn" aria-label="Day. Tap for night.">${I1}</button>`;const a=e.querySelector("button"),r=p=>{o=p;const m=document.documentElement,k=Math.max(0,Math.min(1,p.glow));m.style.setProperty("--sky-opacity",p.opacity.toFixed(3)),m.style.setProperty("--sky-map-opacity",p.map.toFixed(3)),m.style.setProperty("--sky-glow",k.toFixed(3)),m.style.setProperty("--sky-stars",p.stars.toFixed(3)),m.style.setProperty("--sky-glass",p.glass.toFixed(3)),m.style.setProperty("--sky-tint",p.tint),m.style.setProperty("--sky-body",p.body),m.style.setProperty("--sky-page-a",p.pageA),m.style.setProperty("--sky-page-b",p.pageB),m.style.setProperty("--sky-spot",p.spot),m.style.setProperty("--sky-field-a",p.fieldA),m.style.setProperty("--sky-field-b",p.fieldB),m.style.setProperty("--sky-win",p.win),m.style.setProperty("--sky-win-2",p.win2),m.style.setProperty("--sky-house-win",p.house),m.style.setProperty("--sky-map-tint",p.mapTint),m.style.setProperty("--sky-glow-soft",`rgba(255, 186, 80, ${(k*.72).toFixed(3)})`),m.style.setProperty("--sky-glow-hot",`rgba(255, 220, 120, ${(k*.96).toFixed(3)})`),m.style.setProperty("--sky-glow-clear","rgba(255, 186, 80, 0)"),m.style.setProperty("--sky-glow-wash",`rgba(255, 170, 70, ${(k*.55).toFixed(3)})`),m.style.setProperty("--sky-glow-map",`rgba(255, 196, 110, ${(k*.7).toFixed(3)})`);const w=p.phase==="golden"?.24:p.phase==="dawn"?.22:0,b=p.phase==="golden"?"186, 110, 52":"140, 62, 18";m.style.setProperty("--sky-shadow",`rgba(${b}, ${w.toFixed(3)})`);const g=p.phase==="night"?.55:p.phase==="golden"?.08:p.phase==="dawn"?.16:0;m.style.setProperty("--sky-vig",`rgba(12, 10, 32, ${g.toFixed(3)})`);const y=p.phase==="golden"?"255, 196, 80":p.phase==="dawn"?"255, 214, 230":"255, 246, 214";m.style.setProperty("--sky-orb",`rgba(${y}, ${Math.min(1,p.glass).toFixed(3)})`),m.dataset.sky=p.phase,m.dataset.skyChoice=n,m.classList.toggle("sky-static",t),m.classList.toggle("sky-live",!t),a.innerHTML=rS[n],a.setAttribute("aria-label",`${Qp[n]}. Tap for ${Qp[zp[n]].toLowerCase()}.`)},l=()=>Vp(s??new Date,n),c=()=>r(l()),d=()=>{i&&clearInterval(i),i=window.setInterval(()=>{!s&&!document.hidden&&c()},t?6e4:1e3)},f=p=>{n=p;try{localStorage.setItem(vt(C1),n)}catch{}c()};a.addEventListener("click",()=>f(zp[n])),document.documentElement.classList.toggle("sky-static",t),c(),d(),Ag(()=>{s||c()});const u=document.getElementById("mapWorld");u&&fS(u);try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change",()=>{const m=Up();document.documentElement.classList.toggle("sky-static",m),document.documentElement.classList.toggle("sky-live",!m)})}catch{}try{matchMedia(lS).addEventListener?.("change",()=>Tr())}catch{}return window.addEventListener("resize",()=>Tr()),new MutationObserver(()=>Tr()).observe(document.body,{attributes:!0,attributeFilter:["class"]}),{choice:()=>n,look:()=>o,setChoice(p){f(p)},freeze(p){s=p,c()}}}function Tr(){const e=document.getElementById("skyMount"),t=document.getElementById("menuDaySlot");e&&t&&e.parentElement!==t&&t.appendChild(e),t&&(t.hidden=!1),e&&(e.style.left="",e.style.top="")}function fS(e){const t=document.createElement("div");t.className="skyTint",t.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="skyLamps",n.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="skyBits",s.setAttribute("aria-hidden","true"),s.innerHTML='<i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i>';const o=()=>{e.contains(t)||e.appendChild(t),e.contains(n)||e.appendChild(n),e.contains(s)||e.appendChild(s)};o(),new MutationObserver(o).observe(e,{childList:!0})}function hS(){try{const e=localStorage.getItem(vt(C1));if(sS(e))return e}catch{}return"auto"}const B1=255,uS=12;class pS{constructor(t){this.w=ms,this.h=ys,this.undo=[],this.px=ag(t??null)}checkpoint(){this.undo.push(this.px.slice()),this.undo.length>uS&&this.undo.shift()}canUndo(){return this.undo.length>0}undoStep(){const t=this.undo.pop();return t?(this.px=t,!0):!1}apply(t){switch(t.k){case"line":this.line(t.x0,t.y0,t.x1,t.y1,t.r,t.c);break;case"fill":this.fill(t.x,t.y,t.c);break;case"stamp":this.stamp(t.mask,t.x,t.y);break;case"clear":this.px.fill(0);break}}dot(t,n,s,o){const i=Math.max(.5,s),a=i*i,r=Math.max(0,Math.floor(t-i)),l=Math.min(this.w-1,Math.ceil(t+i)),c=Math.max(0,Math.floor(n-i)),d=Math.min(this.h-1,Math.ceil(n+i));for(let f=c;f<=d;f++)for(let u=r;u<=l;u++){const p=u+.5-t,m=f+.5-n;p*p+m*m<=a&&(this.px[f*this.w+u]=o)}}line(t,n,s,o,i,a){const r=Math.hypot(s-t,o-n),l=Math.max(.5,i/2),c=Math.max(1,Math.ceil(r/l));for(let d=0;d<=c;d++)this.dot(t+(s-t)*d/c,n+(o-n)*d/c,i,a)}fill(t,n,s){const o=Math.floor(t),i=Math.floor(n);if(o<0||i<0||o>=this.w||i>=this.h)return;const{w:a,h:r,px:l}=this,c=l[i*a+o];if(c===s)return;const d=[o,i];for(;d.length;){const f=d.pop(),u=d.pop();let p=u;for(;p>0&&l[f*a+p-1]===c;)p--;let m=u;for(;m<a-1&&l[f*a+m+1]===c;)m++;for(let k=p;k<=m;k++)l[f*a+k]=s,f>0&&l[(f-1)*a+k]===c&&(k===p||l[(f-1)*a+k-1]!==c)&&d.push(k,f-1),f<r-1&&l[(f+1)*a+k]===c&&(k===p||l[(f+1)*a+k-1]!==c)&&d.push(k,f+1)}}stamp(t,n,s){const o=Math.round(n-t.w/2),i=Math.round(s-t.h/2);for(let a=0;a<t.h;a++)for(let r=0;r<t.w;r++){const l=t.px[a*t.w+r];if(l===B1)continue;const c=o+r,d=i+a;c>=0&&d>=0&&c<this.w&&d<this.h&&(this.px[d*this.w+c]=l)}}save(){let t=Mc(this.px),n=this.px;for(let s=0;t.length>yd&&s<6;s++)n=gS(n,this.w,this.h,1<<s),t=Mc(n);return t.length>yd&&(t=Mc(mS(n,this.w,this.h,8))),t}}function gS(e,t,n,s){const o=e.slice();for(let i=0;i<n;i++){let a=0;for(;a<t;){const r=o[i*t+a];let l=1;for(;a+l<t&&o[i*t+a+l]===r;)l++;l<=s&&a>0&&o.fill(o[i*t+a-1],i*t+a,i*t+a+l),a+=l}}return o}function mS(e,t,n,s){const o=new Uint8Array(e.length);for(let i=0;i<n;i++)for(let a=0;a<t;a++)o[i*t+a]=e[Math.floor(i/s)*s*t+Math.floor(a/s)*s];return o}function yS(e,t,n,s){let o=0,i=1/0;return s.forEach((a,r)=>{const l=parseInt(a.slice(1,3),16),c=parseInt(a.slice(3,5),16),d=parseInt(a.slice(5,7),16),f=(l-e)**2*2+(c-t)**2*4+(d-n)**2*3;f<i&&(i=f,o=r)}),o}const hr="#5a3d5c",vo=new Map,Yd=new Map,Kd=vt("cozy-art");function bS(){try{const e=JSON.parse(localStorage.getItem(Kd)??"{}");if(e&&typeof e=="object")for(const[t,n]of Object.entries(e))ig(t)&&Uf(n)&&vo.set(t,n)}catch{}}function wS(e,t,n){vo.set(e,t);let s={};try{s=JSON.parse(localStorage.getItem(Kd)??"{}")||{}}catch{s={}}s[e]=t;const o=Object.keys(s);if(o.length>Fi)for(const i of o)i!==e&&!n.has(i)&&Object.keys(s).length>Fi&&delete s[i];try{localStorage.setItem(Kd,JSON.stringify(s))}catch{}}function kS(e){return vo.has(e)}function O1(e,t){!ig(e)||!Uf(t)||vo.get(e)!==t&&(vo.set(e,t),Yd.delete(e))}function vS(e){return vo.get(e)??null}const _S=Vf.map(e=>[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)]);function D1(e,t){const n=t.data;for(let s=0;s<e.length;s++){const o=_S[e[s]&15];n[s*4]=o[0],n[s*4+1]=o[1],n[s*4+2]=o[2],n[s*4+3]=255}}function H1(e){const t=Yd.get(e);if(t)return t;const n=vo.get(e);if(!n)return null;const s=document.createElement("canvas");s.width=ms,s.height=ys;const o=s.getContext("2d");if(!o)return null;const i=o.createImageData(ms,ys);D1(ag(n),i),o.putImageData(i,0,0);const a=s.toDataURL("image/png");return Yd.set(e,a),a}function al(e,t,n=!0){const s=og[e]??"wood",o=`stroke="${hr}" stroke-width="3" stroke-linejoin="round"`;let i="";s==="wood"?i=`<rect x="6" y="18" width="88" height="70" rx="6" fill="#c9905a" ${o}/><path d="M10 24 H90 M10 82 H90" stroke="#a86f3e" stroke-width="1.6" opacity=".7"/>`:s==="plum"?i=`<rect x="6" y="18" width="88" height="70" rx="8" fill="#9a6fc0" ${o}/><rect x="9" y="21" width="82" height="64" rx="6" fill="none" stroke="#d7c0ef" stroke-width="1.6"/>`:s==="gold"?i=`<rect x="6" y="18" width="88" height="70" rx="5" fill="#f2c14e" ${o}/>${[14,32,50,68,86].map(l=>`<circle cx="${l}" cy="21.5" r="1.6" fill="#fff3b0"/><circle cx="${l}" cy="84.5" r="1.6" fill="#fff3b0"/>`).join("")}`:i=`<rect x="6" y="18" width="88" height="70" rx="7" fill="#ff6b6b" ${o}/>${["#ffa94d","#ffd43b","#69db7c","#4dabf7","#b388d6"].map((l,c)=>`<rect x="${7.5+c*1.1}" y="${19.5+c*1.1}" width="${85-c*2.2}" height="${67-c*2.2}" rx="6" fill="none" stroke="${l}" stroke-width="1.3"/>`).join("")}`;const a=t?`<image href="${t}" x="13" y="25" width="74" height="55.5" preserveAspectRatio="none"/>`:'<rect x="13" y="25" width="74" height="55.5" fill="#fff6ea"/><circle cx="40" cy="50" r="5" fill="#ffc8dd"/><circle cx="55" cy="56" r="4" fill="#bde0fe"/><circle cx="62" cy="44" r="3.5" fill="#fff3b0"/>',r=n?`<path d="M38 18 L50 7 L62 18" fill="none" stroke="${hr}" stroke-width="2"/><circle cx="50" cy="7" r="2.4" fill="${hr}"/>`:"";return`<svg viewBox="${n?"0 0 100 100":"4 16 92 74"}" xmlns="http://www.w3.org/2000/svg">${r}${i}${a}<rect x="13" y="25" width="74" height="55.5" fill="none" stroke="${hr}" stroke-width="1.6"/></svg>`}const Nc=[2,4,8,14],Np=[24,34,46,60],qp={brush:'<svg viewBox="0 0 40 40"><path d="M26 6 L34 14 L18 30 L10 22 Z" fill="#ffd43b" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 22 L18 30 Q12 36 5 35 Q4 28 10 22 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/></svg>',fill:'<svg viewBox="0 0 40 40"><path d="M7 15 L21 9 L27 23 L13 29 Z" fill="#fff" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/><path d="M7 15 Q14 19 21 9" fill="#4dabf7" stroke="#5a3d5c" stroke-width="2"/><path d="M8 16 Q3 24 6 34 Q12 34 11 27 Q10 22 8 16 Z" fill="#4dabf7" stroke="#5a3d5c" stroke-width="2" stroke-linejoin="round"/><path d="M27 23 Q31 14 21 9" fill="none" stroke="#5a3d5c" stroke-width="2"/></svg>',eraser:'<svg viewBox="0 0 40 40"><g transform="rotate(-35 20 20)"><rect x="6" y="13" width="28" height="14" rx="3" fill="#ffc8dd" stroke="#5a3d5c" stroke-width="2.5"/><rect x="6" y="13" width="10" height="14" rx="3" fill="#fff" stroke="#5a3d5c" stroke-width="2.5"/></g><path d="M7 35 h4 M15 36 h3 M22 35 h2" stroke="#5a3d5c" stroke-width="2.5" stroke-linecap="round"/></svg>',stamp:'<svg viewBox="0 0 40 40"><path d="M20 33 C13 27 5 22 8 14 C11 7 20 10 20 16 C20 10 29 7 32 14 C35 22 27 27 20 33 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="2.5"/></svg>'},$S='<svg viewBox="0 0 40 40"><path d="M14 10 L6 18 L14 26" fill="none" stroke="#5a3d5c" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 18 H24 Q34 18 34 26 Q34 33 24 33 H18" fill="none" stroke="#5a3d5c" stroke-width="3.5" stroke-linecap="round"/></svg>',Fp={brush:"Brush",fill:"Fill",eraser:"Eraser",stamp:"Stamps"},xS=["White","Plum","Red","Pink","Orange","Yellow","Green","Dark green","Blue","Dark blue","Lilac","Purple","Tan","Brown","Gray","Black"],MS={wood:"Wood",plum:"Plum",gold:"Gold",rainbow:"Rainbow"},LS='<svg viewBox="0 0 40 40"><rect x="7" y="7" width="26" height="26" rx="5" fill="#fff" stroke="#5a3d5c" stroke-width="2.5"/><path d="M12 28 L28 12" stroke="#ff8fab" stroke-width="3" stroke-linecap="round"/><circle cx="31" cy="9" r="3" fill="#ffd43b"/></svg>',jp=new Map;async function Zp(e,t){const n=e.name+":"+t,s=jp.get(n);if(s)return s;const o=e.svg.includes("xmlns")?e.svg:e.svg.replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" '),i=new Image;i.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(o);try{await i.decode()}catch{return null}const a=document.createElement("canvas");a.width=t,a.height=t;const r=a.getContext("2d",{willReadFrequently:!0});if(!r)return null;r.drawImage(i,0,0,t,t);const l=r.getImageData(0,0,t,t).data,c=new Uint8Array(t*t);for(let f=0;f<c.length;f++)c[f]=l[f*4+3]<140?B1:yS(l[f*4],l[f*4+1],l[f*4+2],Vf);const d={w:t,h:t,px:c};return jp.set(n,d),d}let Ci=null;function ES(e){if(Ci)return;const t=new pS;let n="brush",s=2,o=1,i=0,a=0;const r=document.createElement("div");r.className="studio",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Art Studio"),r.innerHTML=`<div class="stuCard">
    <div class="stuHead"><h2>Art Studio</h2><button type="button" class="stuX" aria-label="Close">✕</button></div>
    <div class="stuBody">
      <div class="stuPaper"><canvas width="${ms}" height="${ys}" aria-label="Drawing paper"></canvas></div>
      <div class="stuSide">
        <div class="stuTools">${Object.keys(qp).map(x=>`<button type="button" class="stuTool" data-tool="${x}" aria-label="${Fp[x]}" aria-pressed="false">${qp[x]}<span>${Fp[x]}</span></button>`).join("")}
          <button type="button" class="stuTool stuUndo" aria-label="Undo">${$S}<span>Undo</span></button><button type="button" class="stuTool stuClear" aria-label="Clear">${LS}<span>Clear</span></button></div>
        <div class="stuGroup stuSizeGroup"><b>Size</b><div class="stuRow stuSizes">${Nc.map((x,$)=>`<button type="button" class="stuSize" data-size="${$}" aria-label="Size ${$+1}" aria-pressed="false"><i style="width:${8+x*2}px;height:${8+x*2}px"></i></button>`).join("")}</div></div>
        <div class="stuGroup stuColorGroup"><b>Colors</b><div class="stuColors">${Vf.map((x,$)=>`<button type="button" class="stuColor" data-color="${$}" aria-label="${xS[$]??"Color "+($+1)}" aria-pressed="false" style="background:${x}"></button>`).join("")}</div></div>
        <div class="stuGroup stuStampGroup"><b>Stamps</b><div class="stuStamps">${e.stamps.map((x,$)=>`<button type="button" class="stuStamp" data-stamp="${$}" aria-label="${x.name}" aria-pressed="false">${x.svg}</button>`).join("")}</div></div>
        <div class="stuGroup stuFrameGroup"><b>Frame</b><div class="stuRow stuFrames">${og.map((x,$)=>`<button type="button" class="stuFrame" data-frame="${$}" aria-label="${MS[x]??x} frame" aria-pressed="false">${al($,null,!1)}</button>`).join("")}</div></div>
        <button type="button" class="stuHang">Hang it up!</button>
      </div>
    </div></div>
    <div class="stuAsk hidden" role="alertdialog" aria-label="Start over?"><div class="stuAskCard"><p>Start a new picture?</p><div class="stuAskRow"><button type="button" class="stuAskNo" aria-label="Keep my picture">Keep it</button><button type="button" class="stuAskYes" aria-label="Yes, clear it">Clear it</button></div></div></div>`,document.body.appendChild(r),Ci=r;const l=r.querySelector("canvas"),c=l.getContext("2d"),d=c.createImageData(ms,ys),f=()=>{D1(t.px,d),c.putImageData(d,0,0)},u=()=>{r.querySelectorAll(".stuTool[data-tool]").forEach(x=>x.classList.toggle("on",x.dataset.tool===n)),r.querySelectorAll(".stuSize").forEach(x=>x.classList.toggle("on",Number(x.dataset.size)===o)),r.querySelectorAll(".stuColor").forEach(x=>x.classList.toggle("on",Number(x.dataset.color)===s)),r.querySelectorAll(".stuStamp").forEach(x=>x.classList.toggle("on",Number(x.dataset.stamp)===i)),r.querySelectorAll(".stuFrame").forEach(x=>x.classList.toggle("on",Number(x.dataset.frame)===a)),r.querySelectorAll("[aria-pressed]").forEach(x=>x.setAttribute("aria-pressed",String(x.classList.contains("on")))),r.classList.toggle("stamping",n==="stamp"),t.canUndo()!==p&&k(),r.querySelector(".stuUndo").disabled=!t.canUndo()};let p=!1,m=0;function k(){p=t.canUndo(),clearTimeout(m),m=window.setTimeout(()=>{if(!Ci)return;const x=t.canUndo()?l.toDataURL():null;r.querySelectorAll(".stuFrame").forEach($=>{$.innerHTML=al(Number($.dataset.frame),x,!1)})},60)}const w=r.querySelector(".stuAsk");f(),u();const b=()=>{r.remove(),Ci=null,e.onClose?.()};r.addEventListener("click",x=>{const $=x.target.closest("button");if($){if(e.sfx?.click(),$.classList.contains("stuX")){b();return}if($.classList.contains("stuAskNo")){w.classList.add("hidden");return}if($.classList.contains("stuAskYes")){w.classList.add("hidden"),t.checkpoint(),t.apply({k:"clear"}),f(),u(),k();return}if($.dataset.tool)n=$.dataset.tool;else if($.dataset.size)o=Number($.dataset.size);else if($.dataset.color)s=Number($.dataset.color),(n==="eraser"||n==="stamp")&&(n="brush");else if($.dataset.stamp)i=Number($.dataset.stamp),n="stamp";else if($.dataset.frame)a=Number($.dataset.frame);else if($.classList.contains("stuUndo"))t.undoStep()&&(f(),k());else if($.classList.contains("stuClear"))w.classList.remove("hidden"),w.querySelector(".stuAskNo").focus();else if($.classList.contains("stuHang")){const I=t.save();b(),e.onSave(I,a);return}u()}});let g=-1,y=null;const _=x=>{const $=l.getBoundingClientRect();return{x:(x.clientX-$.left)*ms/$.width,y:(x.clientY-$.top)*ys/$.height}};l.addEventListener("pointerdown",x=>{if(x.preventDefault(),g!==-1)return;const $=_(x);if(n==="fill"){t.checkpoint(),t.apply({k:"fill",x:$.x,y:$.y,c:s}),f(),u(),k(),e.sfx?.pop?.();return}if(n==="stamp"){const I=e.stamps[i];if(!I)return;Zp(I,Np[o]).then(N=>{!N||!Ci||(t.checkpoint(),t.apply({k:"stamp",mask:N,x:$.x,y:$.y}),f(),u(),k(),e.sfx?.pop?.())});return}g=x.pointerId;try{l.setPointerCapture(x.pointerId)}catch{}t.checkpoint(),y=$,t.apply({k:"line",x0:$.x,y0:$.y,x1:$.x,y1:$.y,r:Nc[o],c:n==="eraser"?0:s}),f()}),l.addEventListener("pointermove",x=>{if(x.pointerId!==g||!y)return;const $=typeof x.getCoalescedEvents=="function"?x.getCoalescedEvents():[];for(const I of $.length?$:[x]){const N=_(I);t.apply({k:"line",x0:y.x,y0:y.y,x1:N.x,y1:N.y,r:Nc[o],c:n==="eraser"?0:s}),y=N}f()});const T=x=>{x.pointerId===g&&(g=-1,y=null,u(),k())};l.addEventListener("pointerup",T),l.addEventListener("pointercancel",T),e.stamps.slice(0,3).forEach(x=>void Zp(x,Np[1]))}function SS(e){const t=document.createElement("div");t.className="paintZoom",t.setAttribute("role","dialog"),t.setAttribute("aria-label","Painting"),t.innerHTML=`<div class="pzInner">${e}</div>`,t.addEventListener("pointerup",()=>t.remove()),document.body.appendChild(t)}const Vo=[{name:"Pink",fill:"#ff7eb3",ink:"#9d174d"},{name:"Lilac",fill:"#c9b3ff",ink:"#5f3dc4"},{name:"Aqua",fill:"#66d9e8",ink:"#0b7285"},{name:"Gold",fill:"#ffd43b",ink:"#e67700"}],Mt="#5a3d5c",qc=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Gp=e=>typeof e=="number"?e:{skip:10,rev:11,d2:12,wild:13,w4:14}[e]??0,Yp=e=>typeof e.v=="number"?String(e.v):e.v==="skip"?"✕":e.v==="rev"?"↻":e.v==="d2"?"+2":e.v==="w4"?"+4":"♛",TS=e=>e.v==="skip"?"Nope":e.v==="rev"?"Flip":e.v==="d2"?"+2":e.v==="wild"||e.v==="w4"?"Crown":"",no=(e,t,n=1,s="#ffd43b")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -6 L1.4 -1.4 L6 -1 L1.6 1.4 L3 6 L0 3 L-3 6 L-1.6 1.4 L-6 -1 L-1.4 -1.4 Z" fill="${s}" stroke="${Mt}" stroke-width="1" stroke-linejoin="round"/>`,Pr=(e,t,n=1)=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 1.2 C-2.2 -1.6 -5.2 -0.6 -3.6 2.2 C-2.4 4 0 5.2 0 5.2 C0 5.2 2.4 4 3.6 2.2 C5.2 -0.6 2.2 -1.6 0 1.2 Z" fill="#ff4d94" stroke="${Mt}" stroke-width="1"/>`;function PS(e){return e.v==="wild"||e.v==="w4"?`<g transform="translate(14 28)">
      <path d="M4 26 L10 8 L18 16 L24 2 L30 16 L38 8 L44 26 Z" fill="#ffd43b" stroke="${Mt}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="4" y="26" width="40" height="8" rx="2" fill="#ffd43b" stroke="${Mt}" stroke-width="2.2"/>
      <circle cx="10" cy="8" r="2.4" fill="#ff7eb3"/><circle cx="24" cy="3" r="2.4" fill="#66d9e8"/><circle cx="38" cy="8" r="2.4" fill="#d0bfff"/>
      ${no(-2,0,.7)}${no(46,4,.65,"#fff")}${no(22,-4,.55,"#ff7eb3")}
    </g>${e.v==="w4"?`<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${Mt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">+4</text>`:""}`:e.v==="d2"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff" stroke="${Mt}" stroke-width="2.4"/>
      ${Pr(14,8,1.35)}${Pr(32,8,1.35)}
      <path d="M12 26 Q23 34 34 26" fill="none" stroke="${Mt}" stroke-width="2.4" stroke-linecap="round"/>
      ${Pr(40,22,.8)}
    </g>`:e.v==="rev"?`<g fill="none" stroke="${Mt}" stroke-width="3.2" stroke-linecap="round">
      <path d="M16 40 C42 22 54 52 34 60 C16 68 12 46 30 40"/>
      <path d="M14 38 L22 30 L24 42" stroke-linejoin="round"/>
    </g>${no(48,28,.85)}${no(20,62,.6,"#ff7eb3")}${no(50,58,.55,"#66d9e8")}`:e.v==="skip"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff6d8" stroke="${Mt}" stroke-width="2.4"/>
      <rect x="8" y="12" width="14" height="9" rx="3" fill="#2b1430"/><rect x="24" y="12" width="14" height="9" rx="3" fill="#2b1430"/>
      <path d="M22 16.5 H24 M5 14 H2 M41 14 H44" stroke="${Mt}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 27 Q23 32 34 27" fill="none" stroke="${Mt}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`:""}function Xd(e){const t=e.c===4,n=t?{fill:"#fff8ee",ink:Mt}:Vo[e.c]??Vo[0],s=typeof e.v=="number",o=TS(e),i=t?'<rect x="2" y="2" width="66" height="96" rx="13" fill="#fff8ee" stroke="#ff7eb3" stroke-width="4"/><rect x="5" y="5" width="60" height="90" rx="11" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="7.5" y="7.5" width="55" height="85" rx="9" fill="none" stroke="#66d9e8" stroke-width="1.6"/><rect x="9.5" y="9.5" width="51" height="81" rx="8" fill="none" stroke="#ffd43b" stroke-width="1.6"/>':`<rect x="2" y="2" width="66" height="96" rx="13" fill="${n.fill}" stroke="${Mt}" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`,a='<ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/>',r=`fill="${n.ink}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif"`,l=`<text x="8" y="16" font-size="13" font-weight="900" ${r}>${Yp(e)}</text>`+(s?`<text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" ${r}>${Yp(e)}</text>`:""),c=s?`<text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="${n.ink}" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${e.v}</text>`:`${PS(e)}${o?`<text x="35" y="92" text-anchor="middle" font-size="12" font-weight="900" ${r}>${o}</text>`:""}`;return`<svg viewBox="0 0 70 100">${i}${a}${l}${c}</svg>`}const AS=[[18,28],[40,28],[29,46],[18,64],[40,64],[29,78]].map(([e,t])=>Pr(e,t,.9)).join(""),RS=`<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff4d94" stroke="${Mt}" stroke-width="3"/>
  <rect x="7" y="7" width="56" height="86" rx="10" fill="none" stroke="#ffd43b" stroke-width="3"/>
  <rect x="11" y="11" width="48" height="78" rx="8" fill="#ff7eb3"/>
  ${AS}
  <circle cx="35" cy="50" r="14" fill="#fff6fb" stroke="${Mt}" stroke-width="2.4"/>
  ${no(35,50,1.15,"#ffd43b")}
</svg>`,W1=(e,t)=>{if(t.turn<0||t.drawn!=null&&e.id!==t.drawn)return!1;const n=t.top;return e.c===4||e.c===t.color||e.v===n.v&&n.c!==4};let Jd=null,Ht=null,Bo=-1,Kp=-1;function Xp(e,t){Jd=e;const n=t.table,s=n.view;if(!s||!s.top){e.innerHTML="";return}n.tb!==Kp&&(Ht=null,Bo=-1,Kp=n.tb);const o=n.you,i=o!==null&&Array.isArray(s.hand)?s.hand.slice():[];Ht!==null&&!i.some(g=>g.id===Ht)&&(Ht=null);const a=s.ev;let r=null;if(a&&a.n!==Bo&&Bo>=0&&a.k==="play"&&a.card){const g=e.querySelector(`[data-card="${a.card.id}"]`)||e.querySelector(`[data-p="${a.p}"]`);g&&(r=g.getBoundingClientRect())}const c=n.phase==="play"&&s.turn>=0,d=c&&o!==null&&s.turn===o,f=o!==null&&i.length<=2&&i.length>0&&!s.slay?.[o]&&d,u=d&&s.drawn==null&&n.phase==="play",p=d&&s.drawn!=null&&n.phase==="play",m=i.sort((g,y)=>g.c-y.c||Gp(g.v)-Gp(y.v)),k=c?n.players[s.turn]:"",w=c?d?"Your turn!":`${qc(t.name(k))}'s turn`:"",b=Vo[s.color]??Vo[0];if(e.innerHTML=`<div class="slayFelt">
    ${w?`<div class="whose ${d?"yours":""}" id="whoseTurn">${w}<span class="slayDir" aria-hidden="true">${s.dir===1?"→":"←"}</span></div>`:""}
    <div class="slayOpps">${n.players.map((g,y)=>y===o?"":`<div class="slayOpp ${s.turn===y?"isTurn":""}" data-p="${y}" data-count="${s.counts?.[y]??0}"><span class="chipFace">${t.face(g)}</span><b>${qc(t.name(g))}</b><span class="cnt">${s.counts?.[y]??0}</span>${t.away(g)?'<i class="awayBadge">away</i>':""}${s.slay?.[y]?"<em>SLAY!</em>":""}</div>`).join("")}</div>
    <div class="slayPile">
      <button type="button" id="slayDeck" class="slayDeck" ${u?"":"disabled"} aria-label="Draw a card">${RS}<span>${s.deck??0}</span></button>
      <div id="slayDiscard" class="slayDiscard" data-top="${s.top.id}">${Xd(s.top)}</div>
      <div class="nowColor" data-color="${s.color}" style="background:${b.fill}" aria-label="${b.name}"></div>
    </div>
    ${o===null?'<p class="watching">You are watching</p>':""}
    ${Ht!==null?`<div id="crownPick" class="crownPick"><p>Pick a color for your Crown!</p><div class="crownRow">${Vo.map((g,y)=>`<button type="button" data-color="${y}" aria-label="${g.name}" style="background:${g.fill}"><span>${g.name}</span></button>`).join("")}</div></div>`:""}
    <div id="slayHand" class="slayHand ${d?"isTurn":""}">${m.map(g=>{const y=d&&n.phase==="play"&&W1(g,s),_=y?"can":d?"dim":"wait",T=typeof g.v=="number"?Vo[g.c].name+" "+g.v:g.v==="wild"?"Crown":g.v==="w4"?"Crown plus 4":g.v==="d2"?"plus 2":g.v==="rev"?"Flip":"Nope";return`<button type="button" class="slayCard ${_} ${g.id===s.drawn?"justDrew":""} ${g.id===Ht?"picked":""}" data-card="${g.id}" data-c="${g.c}" data-v="${g.v}" aria-label="${qc(T)}" ${y?"":"disabled"}>${Xd(g)}</button>`}).join("")}</div>
    ${c&&o!==null?`<button type="button" id="slayCall" class="slayCall ${f?"ready":""}" ${f?"":"disabled"}>SLAY!</button>`:""}
    <button type="button" id="slayPass" class="slayPass ${p?"":"hidden"}" ${p?"":"disabled"}>Pass</button>
  </div>`,a&&a.n!==Bo){const g=Bo;if(Bo=a.n,g>=0){if(a.k==="play"&&a.card){const y=e.querySelector("#slayDiscard");y&&CS(r,a.card,y.getBoundingClientRect()),a.card.v==="skip"?t.toast("Nope!"):a.card.v==="rev"?t.toast("Flip!"):a.card.v==="d2"?t.toast("+2!"):a.card.v==="w4"&&t.toast("Crown +4!"),t.sfx.swish()}a.vdrew&&t.toast("Forgot to say SLAY! Draw 2"),a.k==="slay"&&t.sfx.sparkle()}}}function CS(e,t,n){const s=document.createElement("div");s.className="flyCard",s.innerHTML=Xd(t);const o=e?.width||70,i=e?.height||100;Object.assign(s.style,{left:(e?.left??innerWidth/2)+"px",top:(e?.top??80)+"px",width:o+"px",height:i+"px"}),document.body.appendChild(s),requestAnimationFrame(()=>{s.style.left=n.left+"px",s.style.top=n.top+"px",s.style.width=Math.max(n.width,70)+"px",s.style.height=Math.max(n.height,96)+"px"}),setTimeout(()=>s.remove(),560)}const IS={id:"slay",render:Xp,handle(e,t){const n=t.table.view,s=t.table.you;if(!n||t.table.phase!=="play"||s===null)return!1;const o=n.hand??[];if(e.closest("#slayCall"))return o.length<=2&&o.length>0&&!n.slay?.[s]&&(t.move({k:"slay"}),t.sfx.sparkle()),!0;if(e.closest("#slayDeck"))return n.turn===s&&n.drawn==null&&(Ht=null,t.move({k:"draw"}),t.sfx.click()),!0;if(e.closest("#slayPass"))return n.turn===s&&n.drawn!=null&&(Ht=null,t.move({k:"pass"}),t.sfx.click()),!0;const i=e.closest("#crownPick [data-color]");if(i&&Ht!==null)return t.move({k:"play",id:Ht,color:+i.dataset.color}),Ht=null,t.sfx.sparkle(),!0;const a=e.closest("#slayHand [data-card]");if(!a||a.hasAttribute("disabled"))return!!a;const r=+a.dataset.card,l=o.find(c=>c.id===r);return!l||n.turn!==s||!W1(l,n)||(l.c===4?(Ht=r,t.sfx.pop(),Jd&&Xp(Jd,t)):(Ht=null,t.move({k:"play",id:r}),t.sfx.click())),!0}},V1="#5a3d5c",Jp=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),BS=`<svg viewBox="0 0 48 48"><path d="M24 42 C8 30 2 22 7 13 C11 6 20 8 24 16 C28 8 37 6 41 13 C46 22 40 30 24 42 Z" fill="#ff4d94" stroke="${V1}" stroke-width="3" stroke-linejoin="round"/><path d="M16 16 Q20 12 22 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`,OS=`<svg viewBox="0 0 48 48"><path d="M24 3 L29 17 H44 L32 26 L37 42 L24 33 L11 42 L16 26 L4 17 H19 Z" fill="#66d9e8" stroke="${V1}" stroke-width="3" stroke-linejoin="round"/><path d="M24 12 L26 18 H22 Z" fill="#fff" opacity=".8"/></svg>`,DS={id:"four",render(e,t){const n=t.table,s=n.view;if(!s||!Array.isArray(s.b)){e.innerHTML="";return}const o=n.you,i=o!==null&&s.turn===o&&n.phase==="play",a=new Set((s.line??[]).map(([k,w])=>k+":"+w)),r=s.last;let l="";for(let k=0;k<7;k++){const w=s.b[k];let b="";for(let y=5;y>=0;y--){const _=y<w.length?w[y]:null,T=a.has(k+":"+y)?" hot":"",x=r&&r.col===k&&r.row===y?" just":"";b+=`<span class="fourCell${_===0?" heart":_===1?" star":""}${T}${x}">${_===0?BS:_===1?OS:""}</span>`}const g=i&&w.length<6;l+=`<button type="button" class="fourCol" data-col="${k}" ${g?"":"disabled"} aria-label="Drop in column ${k+1}">${b}<span class="dropHint">${g?"▼":""}</span></button>`}const c=n.phase==="play"&&s.turn>=0,d=c?n.players[s.turn]:"",f=c?i?"Your turn!":`${Jp(t.name(d))}'s turn`:"",u=o===0?"You are <b>pink hearts</b>":o===1?"You are <b>aqua stars</b>":"Pink hearts and aqua stars",p=k=>k===0?"♥":"★",m=n.players.map((k,w)=>`<div class="playerChip ${s.turn===w?"isTurn":""}"><span class="chipFace">${t.face(k)}</span><b>${Jp(t.name(k))} ${p(w)}</b>${t.away(k)?'<i class="awayBadge">away</i>':""}</div>`).join("");e.innerHTML=`<div class="fourPlay">
      ${f?`<div class="whose ${i?"yours":""}" id="whoseTurn">${f}</div>`:""}
      <div class="fourChips">${m}</div>
      <p class="fourLegend">${u}</p>
      <div class="fourBoard" id="fourBoard">${l}</div>
    </div>`},handle(e,t){const n=e.closest(".fourCol");if(!n)return!1;const s=t.table.view,o=t.table.you;if(n.hasAttribute("disabled")||!s||o===null||s.turn!==o||t.table.phase!=="play")return!0;const i=+n.dataset.col;return!Number.isInteger(i)||s.b[i].length>=6||(t.move({col:i}),t.sfx.click()),!0}},e0={slay:IS,four:DS},ur=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),HS={notHere:"Come into the clubhouse first!",taken:"Someone is sitting there!",playing:"You are already in this game!",playingElsewhere:"Finish your other game first!",notHost:"Waiting for the host…",needMore:"Play with friends on your street",tooMany:"That table is full!",notPlaying:"The game has not started!",notPlayer:"Sit down to play!",illegal:"You can't play that!",notAway:"She is still here!",tooSoon:"Give her a moment!",notSeated:"You are not at this table!",noMove:"No move to play!"};function WS(e){const t=document.getElementById("tableOverlay");let n=null,s="",o=0;const i=b=>b.away==null?0:b.away+Math.max(0,Date.now()-(b.receivedAt??Date.now())),a=()=>{o&&(clearInterval(o),o=0)},r=b=>{const g=!!b&&b.phase==="play"&&b.away!=null&&n!==null;g&&!o&&(o=window.setInterval(()=>f(),1e3)),g||a()},l=()=>e.hood(),c=()=>{const b=l();return!b||n===null?null:b.tables.get(n)??null},d=b=>{const g=l();return{table:b,me:g.pid,name:y=>g.players.get(y)?.nickname??"friend",face:y=>{const _=g.players.get(y)?.look;return _?wf(St(_)):""},move:y=>g.tbl({op:"move",tb:b.tb,m:y}),away:y=>{if(y===g.pid)return!1;const _=g.players.get(y);if(_&&!_.online)return!0;const T=g.presence.get(y);return!T||T.where!=="gameroom"},toast:e.toast,sfx:e.sfx}};t.addEventListener("click",b=>{const g=b.target;if(g.closest("#tblBack")){p(),e.sfx.swish();return}if(g.closest("#tblLeave")){m();return}if(g.closest("#tblStart")){k();return}if(g.closest("#tblNudge")){w();return}const y=c();y&&e0[y.game]?.handle(g,d(y))});function f(){const b=l(),g=c();if(!b||!g){t.classList.add("hidden"),t.innerHTML="",a();return}const y=lg[g.game],_=b.pid,T=g.seats.includes(_),x=g.seats.filter(Boolean).length,$=g.phase==="play"&&g.you!==null&&g.view&&g.view.turn===g.you,I=g.view?.winPid??null;let N="";if(g.phase==="over"){const O=I?b.players.get(I)?.nickname??"Friend":"";g.game==="slay"?N=I?I===_?"You slayed!":`${ur(O)} slayed!`:"It's a tie!":N=g.view?.draw||!I?"It's a tie!":I===_?"You got four!":`${ur(O)} got four!`;const B=g.tb+":"+g.seq;I===_&&s!==B&&(s=B,e.confetti(),e.sfx.sparkle())}const U=i(g),F=g.phase==="play"&&T&&U>=Xw&&g.you!==null&&!!g.view&&g.view.turn!==g.you&&g.view.turn>=0,oe=g.phase!=="play"&&g.host===_&&x>=y.minPlayers&&x<=y.maxPlayers,Ee=T&&g.phase==="lobby"&&g.host!==_&&x>=y.minPlayers,ze=T&&g.phase==="lobby"&&x<y.minPlayers;t.classList.remove("hidden"),t.dataset.tb=String(g.tb),t.dataset.phase=g.phase,t.dataset.game=g.game,t.dataset.you=g.you===null?"":String(g.you),t.innerHTML=`<div class="tblCard ${$?"yourTurn":""} game-${g.game}">
      <div class="tblTop"><h2>${ur(y.name)}</h2><div class="seatDots">${g.seats.map(O=>`<i class="${O?"on":""} ${O===_?"me":""}"></i>`).join("")}</div></div>
      ${N?`<div class="winWrap"><div class="winBanner" id="winBanner">${N}</div></div>`:""}
      <div id="tblStage"></div>
      <div class="tblBar">
        ${oe?'<button type="button" id="tblStart">Start</button>':""}
        ${Ee?'<p class="tblWait">Waiting for the host…</p>':""}
        ${F?'<button type="button" id="tblNudge">Play for her</button>':""}
        <button type="button" id="tblBack">Back to room</button>
        <button type="button" id="tblLeave">Leave table</button>
      </div>
      ${ze?'<p class="tblWait" id="needFriend">Play with friends on your street</p>':""}
    </div>`;const be=t.querySelector("#tblStage");g.phase==="lobby"||!g.view?be.innerHTML=u(g,b,_):e0[g.game]?.render(be,d(g)),r(g)}function u(b,g,y){return`<div class="lobby">${b.seats.map((_,T)=>`<div class="lobbySeat ${_?"filled":""} ${_===y?"me":""}">
      <span>${T+1}</span><b>${_?ur(g.players.get(_)?.nickname??"friend"):"Empty"}</b>
      ${_&&_===b.host?"<i>host</i>":""}${_===y?"<i>you</i>":""}
    </div>`).join("")}</div>`}function p(){n=null,a(),t.classList.add("hidden"),t.innerHTML=""}function m(){const b=l(),g=c();b&&g&&g.seats.includes(b.pid)&&b.tbl({op:"leave",tb:g.tb}),e.sfx.click(),p()}function k(){const b=l(),g=c();b&&g&&(b.tbl({op:"start",tb:g.tb}),e.sfx.sparkle())}function w(){const b=l(),g=c();b&&g&&(b.tbl({op:"nudge",tb:g.tb}),e.sfx.click())}return{open(b){n=b,f()},close:p,refresh:f,fail(b,g){e.toast(HS[g]||"Try that again!"),e.sfx.pop(),n===b&&f()},isOpen:()=>n}}const U1="/kids-house-game/assets/rug-zTS04c1f.webp",VS=Object.freeze(Object.defineProperty({__proto__:null,default:U1},Symbol.toStringTag,{value:"Module"})),z1="/kids-house-game/assets/pack~bean-bag-m3eBc9mA.webp",US=Object.freeze(Object.defineProperty({__proto__:null,default:z1},Symbol.toStringTag,{value:"Module"})),Q1="/kids-house-game/assets/pack~sv-bean-bag-TrtltuSt.webp",zS=Object.freeze(Object.defineProperty({__proto__:null,default:Q1},Symbol.toStringTag,{value:"Module"})),QS=120,NS=192,qS=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let re=null,ks=null,Wn=null,t0=!1;const N1=1200,Hs=()=>{const e=document.getElementById("gameroom"),t=e?.clientHeight||600,n=e?.clientWidth||1e3;return Math.min(t/wa,n/N1)},Ar=()=>ks;function hi(){const e=re?.hood();if(!e)return null;for(const[t,n]of e.tables){const s=n.seats.indexOf(e.pid);if(s>=0){const o=Da(Number(t))[s];return{tb:Number(t),seat:s,x:o.x,y:o.y}}}return null}function FS(){const e=re?.hood();if(!e)return!1;for(const[t,n]of e.players)if(t!==e.pid&&n.online)return!0;return!1}function jS(e){if(re=e,ks=WS({hood:e.hood,toast:e.toast,confetti:()=>Hg(),sfx:e.sfx}),t0)return ks;t0=!0;const t=document.getElementById("grWorld");return t.addEventListener("click",GS),t.addEventListener("pointerdown",n=>{n.target.closest(".grChair, .grTable, .grDoor, .pet")&&n.stopPropagation()}),ks}function uh(){if(!re)return;const e=Hs(),t=document.getElementById("grWorld"),n=l=>l*e+"px";t.style.width=Ta*e+"px",t.style.height=wa*e+"px",t.style.setProperty("--sc",String(e));const s=document.getElementById("gameroom"),o=(s?.clientHeight||0)-6-wa*e,i=o>1?Math.round(o*.55):0,a=o>1?Math.ceil(o-i)+6:0;t.style.marginTop=i?i+"px":"";let r='<div class="sceneArtHost" id="grSceneArt"></div>'+IE();i&&(r+=`<div class="grExtWrap" style="top:${-i}px;height:${i}px">${Op("top",i/e)}</div>`),s&&(s.style.background=i?"linear-gradient(180deg, #ffe0f2 0 50%, #d27399 50%)":""),a&&(r+=`<div class="grExtWrap" style="top:100%;height:${a}px">${Op("bottom",a/e)}${JS(e,a,s?.clientWidth||0)}</div>`),r+=`<button class="grDoor" data-gr="map" aria-label="Back to the map" style="left:${n(78)};top:${n(268)};width:${n(86)};height:${n(170)}"></button>`,yo.forEach((l,c)=>{const d=l.seats>=6?560:l.seats>=4?440:340;r+=`<button class="grTable" data-tb="${c}" aria-label="${lg[l.game].name} table" style="left:${n(l.x-d/2)};top:${n(456)};width:${n(d)};height:${n(70)}"></button>`,Da(c).forEach((f,u)=>{const p=76*e,m=72*e,k=Math.max(p,44),w=Math.max(m,44),b=(f.x-38)*e-(k-p)/2,g=(f.y-16)*e-(w-m)/2;r+=`<button class="grChair" data-tb="${c}" data-seat="${u}" aria-label="Empty chair" style="left:${b}px;top:${g}px;width:${k}px;height:${w}px"></button>`})}),r+='<div class="savatars" id="gavatars"></div>',t.innerHTML=r,ko(document.getElementById("grSceneArt"),"clubhouse",t),sa()}function sa(){if(!re||re.view()!=="gameroom")return;const e=document.getElementById("gavatars");if(!e)return;const t=Hs(),n=new Set;for(const i of ZS()){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&XS(a));const r=JSON.stringify(i.look)+i.name+(i.away?":away":"");if(a.dataset.look!==r){const u=a.querySelector(".bubble");a.innerHTML=`<div class="inner">${St(i.look)}</div>${i.name?`<div class="nametag">${qS(i.name)}${i.away?'<i class="awayBadge">away</i>':""}</div>`:""}`,u&&a.appendChild(u),a.dataset.look=r}const l=(As[i.look.size]??1)*t*.95,c=QS*l,d=NS*l,f=i.seated?i.y-8:i.y;Yl(a,i.x*t-c/2+"px",f*t-d+"px"),a.style.width=c+"px",a.style.height=d+"px",a.style.zIndex=String(100+Math.round(i.y)),a.classList.toggle("flipped",i.flip),a.classList.toggle("away",i.away),a.classList.toggle("seated",i.seated),Ba(a,i.look,i.mine)}e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),re.refreshNear();const s=re.hood();document.querySelectorAll("#grWorld .grChair").forEach(i=>{const a=s?.tables.get(+i.dataset.tb)?.seats[+i.dataset.seat];i.classList.toggle("taken",!!a);const r=a?s.players.get(a)?.nickname:"";i.setAttribute("aria-label",r?r+" is sitting":"Empty chair")});const o=document.getElementById("grSolo");o&&o.classList.toggle("hidden",FS())}function ZS(){const e=[],t=re.hood();if(t){const n=new Map;for(const[a,r]of t.tables)r.seats.forEach((l,c)=>{l&&n.set(l,Da(Number(a))[c])});const s=[...t.presence.entries()],o=re.myPres();o&&s.push([t.pid,o]);const i=new Set;for(const[a,r]of s){if(r.where!=="gameroom")continue;const l=t.players.get(a);if(!l)continue;i.add(a);const c=n.get(a);e.push({key:a,look:l.look,name:l.nickname,x:c?.x??r.x,y:c?.y??r.y,flip:r.flip,mine:a===t.pid,away:!1,seated:!!c})}for(const[a,r]of n){if(i.has(a))continue;const l=t.players.get(a);l&&e.push({key:a,look:l.look,name:l.nickname,x:r.x,y:r.y,flip:!1,mine:!1,away:!0,seated:!0})}}else{const n=re.solo();if(n?.where==="gameroom"){const s=re.soloLook();e.push({key:"solo",look:s.look,name:"",x:n.x,y:n.y,flip:n.flip,mine:!0,away:!1,seated:!1})}}return e}function GS(e){if(!re||re.view()!=="gameroom")return;const t=e.target,n=t.closest(".savatar");if(n){const c=re.hood(),d=n.dataset.pid;if(c&&d){for(const[f,u]of c.tables)if(u.seats.includes(d)){ks?.open(Number(f));return}}return}if(t.closest('[data-gr="map"]')){re.goMap();return}const s=t.closest(".grChair");if(s){YS(+s.dataset.tb,+s.dataset.seat);return}const o=t.closest(".grTable");if(o){if(!re.hood()){q1();return}ks?.open(+o.dataset.tb),re.sfx.click();return}if(t.closest(".pet")||hi())return;const i=document.getElementById("grWorld").getBoundingClientRect(),a=Hs(),r=(e.clientX-i.left)/a,l=(e.clientY-i.top)/a;l<430||(Wn={x:Math.max(60,Math.min(Ta-60,r)),y:Math.max(470,Math.min(590,l))})}function YS(e,t){if(!re)return;const n=re.hood();if(!n){q1();return}const s=n.tables.get(e)?.seats[t];if(s&&s!==n.pid){re.toast((n.players.get(s)?.nickname??"Someone")+" is sitting there!"),re.sfx.pop(),ks?.open(e);return}Wn=null,n.tbl({op:"sit",tb:e,seat:t});const o=Da(e)[t];re.setPres({where:"gameroom",x:o.x,y:Math.max(470,Math.min(590,o.y)),flip:!1}),ks?.open(e),re.sfx.click()}function q1(){if(!re)return;const e=document.getElementById("grSolo");e&&(e.classList.remove("hidden"),e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),re.toast("Play with friends on your street"),re.sfx.pop()}function KS(e){if(!re||re.view()!=="gameroom"||!Wn)return;if(hi()){Wn=null;return}const t=re.hood()?re.myPres():re.solo();if(!t||t.where!=="gameroom"){Wn=null;return}const n=Wn.x-t.x,s=Wn.y-t.y,o=Math.hypot(n,s);if(o<4){Wn=null;return}const i=Math.min(o,300*e),a={where:"gameroom",x:t.x+n/o*i,y:t.y+s/o*i,flip:Math.abs(n)>2?n<0:t.flip};re.setPres(a);const r=Hs(),l=document.getElementById("grScroll"),c=a.x*r-l.scrollLeft;(c<l.clientWidth*.22||c>l.clientWidth*.78)&&(l.scrollLeft=a.x*r-l.clientWidth/2)}function XS(e){e.addEventListener("pointerdown",t=>{if(!re||hi())return;const n=re.hood()?re.myPres():re.solo();if(!n||n.where!=="gameroom")return;t.preventDefault(),t.stopPropagation(),Wn=null;const s=Hs(),o=document.getElementById("grWorld"),i=document.getElementById("grScroll"),a=b=>{const g=o.getBoundingClientRect();return{x:(b.clientX-g.left)/s,y:(b.clientY-g.top)/s}},r=a(t),l={x:n.x-r.x,y:n.y-r.y};let c=t,d=0,f=n.x,u=!1;const p=b=>{const g=re.hood()?re.myPres():re.solo();if(!g||g.where!=="gameroom")return;const y=a(b),_=Math.max(60,Math.min(Ta-60,y.x+l.x)),T=Math.max(470,Math.min(590,y.y+l.y));if(!u&&Math.hypot(_-g.x,T-g.y)<6)return;u=!0;const x=Math.abs(_-f)>3?_<f:g.flip;Math.abs(_-f)>3&&(f=_),re.setPres({where:"gameroom",x:_,y:T,flip:x})},m=()=>{const b=i.getBoundingClientRect(),g=c.clientX<b.left+70?-12:c.clientX>b.right-70?12:0;g&&u&&(i.scrollLeft+=g,p(c)),d=requestAnimationFrame(m)};d=requestAnimationFrame(m),e.classList.add("lifted"),re.sfx.pick();const k=b=>{b.pointerId===t.pointerId&&(c=b,p(b))},w=b=>{b.pointerId===t.pointerId&&(cancelAnimationFrame(d),window.removeEventListener("pointermove",k),window.removeEventListener("pointerup",w),e.classList.remove("lifted"),u&&re.sfx.drop())};window.addEventListener("pointermove",k),window.addEventListener("pointerup",w)})}function JS(e,t,n){if(t<120)return"";const s=n?Math.min(yo[0].x*e,n/2):yo[0].x*e,o=Math.min(560*e*1.2,t*1.7),i=o*306/960,a=Math.max(8,(t-i)*.45),r=o*.26,l=r*.78,c=(d,f,u,p,m=!1)=>`<img class="grDecor" src="${d}" alt="" aria-hidden="true" draggable="false" style="left:${f}px;top:${u}px;width:${p}px${m?";transform:scaleX(-1)":""}">`;return`<div class="grDecor grRug" aria-hidden="true" style="left:${s-o/2}px;top:${a}px;width:${o}px;height:${i}px"><img src="${U1}" alt="" draggable="false" style="width:${o}px;margin-top:${-o*634/960}px"></div>`+c(z1,s-o/2-r*.35,a+i*.45-l*.6,r)+c(Q1,s+o/2-r*.65,a+i*.45-l*.6,r*1.02,!0)}let Rr=!1;const Vi=KE(),te=sg();te.born&&typeof navigator<"u"&&!navigator.webdriver&&!te.get().baby&&te.dispatch({type:"baby/meet",now:Date.now()});let Ae=te;const F1=[],n0=new WeakSet;function j1(e){n0.has(e)||(n0.add(e),e.subscribe((t,n)=>{Ae===e&&F1.forEach(s=>s(t,n))}))}j1(te);const E={get:()=>Ae.get(),dispatch(e){Ae.dispatch(e)},subscribe:e=>{F1.push(e)}},pe=Rt,Ie=zn,_o=390;let K=1e3;const $o=()=>Math.max(0,pe-K),Ha=375,ef=(e,t)=>e.wall?Math.min(t,Ha):e.kind==="picnic-table"?Math.min(t,Zg):t,Z1=12,Ws=(e,t)=>{if(e.wall)return t;let n=Math.min(t,Ie-Z1);return e.kind==="picnic-table"&&(n=Math.min(n,Zg)),n},Xt=120,Ot=192,ph=[{id:"living",name:"Living Room",color:"#ff8fab"},{id:"bedroom",name:"Bedroom",color:"#b388d6"},{id:"kitchen",name:"Kitchen",color:"#5cc985"},{id:"salon",name:"Salon",color:"#f0a0d8"},{id:"nursery",name:"Nursery",color:"#9ad7f5"},{id:"bathroom",name:"Bathroom",color:"#7ec8d6"}],G1=e=>ph.find(t=>t.id===e)?.color??"#ccc",gh=E5();lM(Sn,le);const Rs=[{id:"__people",name:"People",icon:"",kind:"people"},...["furniture","decor","plants","food","pets"].map((e,t)=>({id:e,name:e,icon:["armchair","balloon","flowers","donut","cat"][t],kind:"cat"}))];Rs.push({id:"secrets",name:"Secrets",icon:"egg:chloe-starlamp",kind:"cat"});for(const e of Sn)Rs.some(t=>t.kind==="cat"&&t.id===e.cat)||Rs.push({id:e.cat,name:e.cat,icon:e.kind,kind:"cat"});for(const e of Sn)e.pack&&!t1(e)&&!Rs.some(t=>t.id==="pack:"+e.pack)&&Rs.push({id:"pack:"+e.pack,name:Wg(e.pack),icon:e.kind,kind:"pack"});const Fc=e=>Sn.filter(t=>F7(t,e,E.get().currentRoom,yh==="all",jl())),eT=["#ffd6e0","#d9ccff","#cdf3dc","#cfe8ff","#fff1b8","#ffe0c7","#ffffff","#f6c1ff"],tT=["#e8b98a","#f2d0a4","#c99366","#ffe7a8","#bfe3d0","#d6d6f5","#ffc8dd","#9fb4c7"],Zt={paint:'<svg viewBox="0 0 48 48"><path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M28 12 L34 6 L42 14 L36 20" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/></svg>',shirt:'<svg viewBox="0 0 48 48"><path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',soundOn:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 17 Q37 24 32 31 M36 12 Q45 24 36 36" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',soundOff:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ddd" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M33 19 L43 29 M43 19 L33 29" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',flip:'<svg viewBox="0 0 48 48"><path d="M24 6 V42" stroke="#5a3d5c" stroke-width="3" stroke-dasharray="4 4"/><path d="M18 12 L6 36 H18 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M30 12 L42 36 H30 Z" fill="#fff" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',front:'<svg viewBox="0 0 48 48"><rect x="6" y="6" width="22" height="22" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="18" y="18" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',back:'<svg viewBox="0 0 48 48"><rect x="18" y="18" width="24" height="24" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="22" height="22" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',trash:'<svg viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="28" rx="5" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><rect x="8" y="9" width="32" height="7" rx="3.5" fill="#ffadad" stroke="#5a3d5c" stroke-width="3"/><path d="M20 21 V35 M28 21 V35" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',smaller:'<svg viewBox="0 0 48 48"><rect x="16" y="16" width="16" height="16" rx="4" fill="#bde0fe" stroke="#5a3d5c" stroke-width="3"/><path d="M8 24 H14 M34 24 H40" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',bigger:'<svg viewBox="0 0 48 48"><rect x="12" y="12" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M24 6 V11 M24 37 V42 M6 24 H11 M37 24 H42" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>'},nT='<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5b3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5b3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5b3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5b3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',sT='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 15 H37 M11 24 H37 M11 33 H37" fill="none" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',oT='<svg class="mailGlyph" viewBox="0 0 48 48" aria-hidden="true"><g transform="translate(0 2)"><rect x="6" y="14" width="36" height="24" rx="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/><path d="M6 16 L24 30 L42 16" fill="none" stroke="#5a3d5c" stroke-width="3"/><path d="M34 12 V6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M34 6 H44 L40 10 L44 14 H34 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2"/></g></svg>',Y1='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',s0='<svg viewBox="0 0 40 40" width="28" height="28"><path d="M12 36 L18 8 M28 36 L22 8 M20 30 V38" stroke="#a86f3e" stroke-width="3" stroke-linecap="round"/><rect x="8" y="8" width="24" height="18" rx="3" fill="#fff" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="16" cy="16" r="3" fill="#ff8fab"/><path d="M12 24 L20 17 L28 24" fill="#69db7c" stroke="#5a3d5c" stroke-width="1.5" stroke-linejoin="round"/></svg>',iT=document.getElementById("app");iT.innerHTML=`
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${Vt.chat}<span class="badge" id="chatBadge"></span></button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${Vt.home}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${_4}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${LE}</button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${bf}<span class="badge" id="mapBadge"></span></button>
    <button class="round" id="btnMenu" aria-label="Menu" aria-expanded="false">${sT}<span class="badge" id="menuBadge"></span></button>
  </div>
</div>
<div class="menuPop hidden" id="menuPop">
  <div class="menuCard" role="dialog" aria-label="Menu">
    <button type="button" class="close" id="menuClose" aria-label="Close">✕</button>
    <p class="menuGroup">My stuff</p>
    <button type="button" class="menuRow photoRow" id="btnPhoto" aria-label="Take a photo"><span class="mIco">📸</span><span class="mLabel">Take a photo</span></button>
    <button type="button" class="menuRow" id="btnPets" aria-label="Pets"><span class="mIco">${Rg}</span><span class="mLabel">Pets</span></button>
    <button type="button" class="menuRow" id="btnDress" aria-label="Characters"><span class="mIco">${Zt.shirt}</span><span class="mLabel">Characters</span></button>
    <button type="button" class="menuRow" id="btnStudio" aria-label="Art Studio"><span class="mIco">${s0}</span><span class="mLabel">Art Studio</span></button>
    <button type="button" class="menuRow" id="btnPaint" aria-label="Colors"><span class="mIco">${Zt.paint}</span><span class="mLabel">Wall &amp; floor colors</span></button>
    <button type="button" class="menuRow" id="secrets" aria-label="Surprises, 0 of 5"><span class="mIco secGift">🎁</span><span class="mLabel"><span class="secWord">Surprises </span><span class="secCount">0/5</span></span></button>
    <p class="menuGroup houseGroup">House</p>
    <button type="button" class="menuRow lockRow" id="btnLock" aria-label="Lock my house"><span class="mIco" id="lockIco">${Vt.lockOff}</span><span class="mLabel" id="lockLabel">Lock my house</span></button>
    <button type="button" class="menuRow mailRow" id="btnMail" aria-label="Mailbox"><span class="mIco">${oT}</span><span class="mLabel">Mailbox</span><span class="menuNew" id="mailNew"></span></button>
    <!-- Day / Night / Auto. The clock stays on Auto until she taps. -->
    <div id="menuDaySlot" class="menuSlot" hidden></div>
    <p class="menuGroup streetGroup">Street</p>
    <button type="button" class="menuRow grownRow" id="btnParent" aria-label="Grown-ups"><span class="mIco">${Vt.shield}</span><span class="mLabel">Grown-ups</span></button>
    <button type="button" class="menuRow soloLeave" id="btnSolo" aria-label="Play in my own house"><span class="mIco">${Vt.solo}</span><span class="mLabel">Play in my own house</span></button>
    <button type="button" class="menuRow friendRow" id="btnHood" aria-label="Friends"><span class="mIco">${Vt.street}</span><span class="mLabel">Friends</span></button>
    <p class="menuGroup">Settings</p>
    <button type="button" class="menuRow" id="btnSound" aria-label="Sound"><span class="mIco" id="soundIco"></span><span class="mLabel">Sound</span></button>
  </div>
</div>
<div class="stageWrap" id="stageWrap">
  <div class="stage" id="stage">
    <div class="world" id="world">
      <div class="wall" id="wall"></div><div class="floor" id="floor"></div><div class="baseboard"></div>
      <div class="sceneArtHost" id="sceneArt"></div>
      <div class="scenery" id="scenery"></div>
      <div class="partyFx" id="partyFx" aria-hidden="true"><i class="pl pl1"></i><i class="pl pl2"></i><i class="pl pl3"></i><i class="sp s1"></i><i class="sp s2"></i><i class="sp s3"></i><i class="sp s4"></i><i class="sp s5"></i><i class="sp s6"></i><i class="sp s7"></i><i class="sp s8"></i></div>
      <div class="layer" id="layer"></div>
      <div class="artGrip hidden" id="artGrip" role="button" aria-label="Drag to make the painting bigger or smaller"><span class="artGripDot"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M11 29 L29 11" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/><path d="M9 19 L9 31 L21 31 Z M31 21 L31 9 L19 9 Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></span></div>
      <div class="toolbar hidden" id="toolbar">
        <button data-a="smaller" aria-label="Smaller">${Zt.smaller}</button><button data-a="bigger" aria-label="Bigger">${Zt.bigger}</button><button data-a="flip" aria-label="Flip">${Zt.flip}</button><button data-a="front" aria-label="Bring forward">${Zt.front}</button><button data-a="back" aria-label="Send back">${Zt.back}</button><button data-a="delete" class="danger" aria-label="Put away">${Zt.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <button type="button" class="artFab" id="artFab" aria-label="Art Studio: paint a picture">${s0}<span>Paint</span></button>
  <div class="bin" id="bin">${Zt.trash}</div>
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
<div class="street mapView hidden" id="street"><div class="mapSky">${Qy}</div><div class="mapMeadow">${Ny}</div><button class="mailCue" id="mailCue" type="button">You've got mail!</button><div class="mapWorld" id="mapWorld"></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>
<div id="toastLane"></div>
<div class="phoneNote" id="phoneNote"><div class="card"><h2>Turn sideways</h2><p>Turn your phone sideways for more room to play!</p><button class="phoneOk" id="phoneOk" type="button">OK!</button></div></div>
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>
<div id="skyMount"></div>`;const L=e=>document.getElementById(e),G=L("stage"),mh=L("world"),Y=L("layer"),ne=L("toolbar"),Cr=L("bin");let qe=null,De=E.get().characters[0]?.id??null,Wt="furniture",yh="",tf="",aT=Date.now()%1e5;const rl=e=>`${e}-${Date.now().toString(36)}${(++aT).toString(36)}${Math.random().toString(36).slice(2,5)}`,bt="__me";let v=null,A="house",je=!1,ge="",ll=new Map,K1=!1,X1=()=>{};const Pe=Tv(L("modeToggle"),{ownHouse:()=>!v||!ge||ge===v.myHouseId(),onChange:()=>{K1&&(ui.matches?Cs():Us()),X1()}}),Ir=_v({send:(e,t,n,s)=>v?.sendMail(e,t,n,s),read:(e,t)=>v?.readMail(e,t),drop:(e,t)=>v?.dropMail(e,t),houseOf:e=>[...v?.players.values()??[]].find(t=>t.pid===e)?.houseId??"",houseName:e=>v?.houses.get(e)?.meta.name??"My House",lettersOf:e=>v?.houses.get(e)?.confirmed.mailbox?.letters??[],mine:e=>!!v&&v.houses.get(e)?.meta.ownerId===v.pid,toast:Z,openOwn:()=>{const e=v?.myHouseId();e&&Oh(e)},freeType:()=>!v||mg(v.settings)});Pe.sync(!0);const fs=new Map,si={};let ae=li,jo=0;const bh=new Set,Wa=()=>!bh.has(E.get().currentRoom),Vs=()=>{bh.add(E.get().currentRoom)};function rT(e){bh.delete(e),delete si[e]}K1=!0;let ka=null;const ec=()=>{cancelAnimationFrame(jo),ka=null},oi=e=>Math.max(0,Math.min($o(),e));function ct(e){ae=oi(e),si[E.get().currentRoom]=ae,mh.style.transform=`translate3d(${-ae}px,0,0)`,L("nudgeL").classList.toggle("off",ae<=1),L("nudgeR").classList.toggle("off",ae>=$o()-1);const t=L("mmView");t.style.left=ae/pe*100+"%",t.style.width=K/pe*100+"%",qe&&E2(E.get()),Qa(),za(),Nn(),m2(),Ua()}function tc(e){cancelAnimationFrame(jo),e=oi(e),ka=e;const t=()=>{const n=e-ae;if(Math.abs(n)<.5){ct(e),ka=null;return}ct(ae+n*.18),jo=requestAnimationFrame(t)};jo=requestAnimationFrame(t)}const dt=()=>G.getBoundingClientRect().width/K,lT="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)",ui=window.matchMedia(lT);function cT(){const e=ui.matches;document.body.classList.toggle("phone",e),document.body.classList.toggle("phone-portrait",e&&window.matchMedia("(orientation: portrait)").matches);const t=L("stageWrap");for(const n of[L("nudgeL"),L("nudgeR")]){const s=e?t:G;n.parentElement!==s&&s.appendChild(n)}}function J1(){const e=document.querySelector(".top");if(!e)return;const t=e.getBoundingClientRect(),n=document.body.classList.contains("phone")?t.bottom:t.height;document.documentElement.style.setProperty("--chrome-h",Math.ceil(n)+"px"),e2()}function e2(){const e=document.querySelector(".top");if(!e)return;const t=Math.ceil(e.getBoundingClientRect().bottom+16)+"px",n=document.getElementById("mailCue");n&&(n.style.top=t);const s=document.getElementById("toastLane");s&&(s.style.top=t)}function dT(){const e=document.documentElement,t=document.getElementById("app");if(!(document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait"))){t.style.top="",t.style.height="",t.style.bottom="",e.style.removeProperty("--vvh"),e.style.removeProperty("--vvt");return}const s=window.visualViewport,o=Math.round(s?s.height:window.innerHeight),i=Math.round(s?s.offsetTop:0);e.style.setProperty("--vvh",o+"px"),e.style.setProperty("--vvt",i+"px"),t.style.top=i+"px",t.style.height=o+"px",t.style.bottom="auto"}function Us(){cT(),dT(),J1();const e=L("stageWrap"),t=document.body.classList.contains("phone"),n=e.clientWidth,s=e.clientHeight,o=Math.max(1,s-kh());if(t?s>n*.85:s>n*.95){const r=n/Math.max(1,s);K=Math.round(Math.max(480,Math.min(860,Ie*r)))}else if(t){const r=n/Math.max(1,o);K=Math.round(Math.max(480,Math.min(pe,Ie*r)))}else K=1e3;K=wh(K),G.style.width=K+"px",G.style.height=Ie+"px";const a=Math.min(n/K,o/Ie);if(a2(a),G.style.setProperty("--yard-sc",String(a||1)),t&&G.style.setProperty("--fit",String(dt())),t2(),ae>$o())ct(ae);else{const r=L("mmView");r.style.left=ae/pe*100+"%",r.style.width=K/pe*100+"%"}ft(),!t&&A==="house"&&Wa()&&Kh(),!t&&A==="house"&&es(!1),kT(),A==="ranch"&&requestAnimationFrame(mf),A==="gameroom"&&requestAnimationFrame(xy),mi(),t&&A==="ranch"&&bA(),n2(),Rr&&Pe.hint(),pc(),Nn()}function t2(){const e=L("stageWrap"),t=document.body.classList.contains("phone")&&A==="house";for(const n of[L("nudgeL"),L("nudgeR")]){if(!t||n.parentElement!==e){n.style.marginTop="",n.style.left="",n.style.right="",n.style.top="";continue}const s=G.getBoundingClientRect(),o=e.getBoundingClientRect(),i=(s.top+s.bottom)/2-o.top;n.style.top=i+"px",n.style.marginTop=-n.offsetHeight/2+"px",n.style.left="",n.style.right=""}}function n2(){document.body.classList.remove("secrets-chrome"),L("secrets")?.classList.remove("compact")}function ft(e=0){if(!document.body.classList.contains("phone"))return;if(A==="house"){s2();return}const t=A==="park"?"parkScroll":A==="ranch"?"ranchScroll":A==="gameroom"?"grScroll":"";if(!t)return;const n=document.getElementById(t);if(!n||n.clientWidth<20){e<8&&requestAnimationFrame(()=>ft(e+1));return}const s=n.querySelector(".savatar.mine")??n.querySelector(".savatar");if(!s){e<8&&requestAnimationFrame(()=>ft(e+1));return}hT(n,[s,...s.querySelectorAll(".nametag")])&&e<8?requestAnimationFrame(()=>ft(e+1)):fT()}function fT(){gc()&&(A==="gameroom"&&$y([...document.querySelectorAll(".neonSignArt")],document.getElementById("grScroll")),A==="ranch"&&!je&&(My(),Xh()))}function hT(e,t){const s=e.getBoundingClientRect(),o=Math.min(s.right,window.innerWidth)-12,i=Math.max(s.left,0)+12;let a=0,r=0;for(const c of t){const d=c.getBoundingClientRect();d.width<2||d.height<2||(a=Math.max(a,d.right-o),r=Math.max(r,i-d.left))}if(a<=1&&r<=1)return!1;const l=e.scrollLeft;return a>1&&r>1?e.scrollLeft-=r:a>1?e.scrollLeft+=a:e.scrollLeft-=r,Math.abs(e.scrollLeft-l)>.5}function s2(){es(!1)}function o0(e){let t=0;for(const n of e){const s=le[n.kind];!s||s.wall||(t=Math.max(t,s.w*Fe(n)))}return t}function uT(){if(A!=="house"||!Pe.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return 0;const e=E.get().rooms,t=E.get().currentRoom;let n=o0(e[t]?.items??[]);if(t==="backyard")for(const o of Object.keys(e))o!=="backyard"&&(n=Math.max(n,o0(e[o].items)));if(n<40)return 0;const s=document.body.classList.contains("phone-portrait")?1:.55;return Math.min(pe,Math.ceil(n/s))}function wh(e){const t=uT();return t&&e<t?t:e}function pT(){const e=wh(K);if(e<=K+.5)return;K=e,G.style.width=K+"px";const t=L("stageWrap"),n=Math.max(1,t.clientHeight-kh()),s=Math.min(t.clientWidth/K,n/Ie);if(a2(s),document.body.classList.contains("phone")&&G.style.setProperty("--fit",String(s)),ae>$o())ct(ae);else{const o=L("mmView");o.style.left=ae/pe*100+"%",o.style.width=K/pe*100+"%"}Wa()&&A==="house"&&!document.body.classList.contains("phone")&&Kh()}let va=null,_a=!1;function gT(){if(A!=="house"||!Pe.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return null;const e=E.get();if(e.currentRoom==="backyard")return null;let t=null,n=va;if(v&&Ae!==te){const a=ye();a&&a.where==="house"&&a.room===e.currentRoom&&(t=wt(e.currentRoom,qt(v.pid,a),a).x,n||(n=qt(v.pid,a)?.item??null))}if(t===null){const a=e.characters.find(r=>r.id===De&&r.room===e.currentRoom)??e.characters.find(r=>r.room===e.currentRoom);if(!a)return null;t=wt(e.currentRoom,ut(a),a).x,n||(n=ut(a)?.item??null)}if(!n)return null;const s=e.rooms[e.currentRoom].items.find(a=>a.id===n),o=s&&le[s.kind];if(!s||!o)return null;const i=o.w*Fe(s)/2;return{minX:Math.min(t-100,s.x-i),maxX:Math.max(t+100,s.x+i)}}function es(e){if(A!=="house"||Mo)return;if(E.get().currentRoom==="backyard"&&!Wa()){Nn();return}if(_a)return;const t=gT();if(t){const w=t.maxX-t.minX;let b=ae;w+20*2>K?b=t.minX-20:(t.minX-20<b&&(b=t.minX-20),t.maxX+20>b+K&&(b=t.maxX+20-K)),b=Math.max(0,Math.min($o(),b)),Math.abs(b-ae)>.5&&ct(b),Nn();return}const n=document.querySelector("#layer .char.avatar.mine")??document.querySelector("#layer .char");if(!n)return;const s=dt()||1,o=G.getBoundingClientRect(),i=8;let a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i;for(const k of["nudgeL","nudgeR"]){const w=L(k);if(!w||w.classList.contains("off")||w.offsetParent===null)continue;const b=w.getBoundingClientRect();b.width<2||b.height<2||(k==="nudgeL"?r=Math.max(r,b.right+6):a=Math.min(a,b.left-6))}a-r<48&&(a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i);const l=[n,...n.querySelectorAll(".nametag")];let c=0,d=0,f=1/0,u=-1/0;for(const k of l){const w=k.getBoundingClientRect();w.width<2||w.height<2||(c=Math.max(c,w.right-a),d=Math.max(d,r-w.left),f=Math.min(f,w.left),u=Math.max(u,w.right))}if(document.body.classList.contains("phone-portrait")&&f<1/0){const k=(f+u)/2-(r+a)/2;if(Math.abs(k)>3){ct(ae+k/s),Nn();return}}const p=mT(n),m=O9({cam:ae,maxCam:$o(),kidX:p,overflowL:d,overflowR:c,scale:s,nudgeX:e});Math.abs(m.cam-ae)>.5&&ct(m.cam),e&&Math.abs(m.kidX-p)>.5&&yT(n,m.kidX),Nn()}function mT(e){if(e.dataset.pid&&v){const t=e.dataset.pid===v.pid?ye():v.presence.get(e.dataset.pid);if(t&&t.where==="house")return t.x}return E.get().characters.find(t=>t.id===e.dataset.cid)?.x??0}function yT(e,t){if(e.dataset.pid&&v&&e.classList.contains("mine")){const o=ye();if(!o||o.where!=="house")return;tt({...o,x:t}),kt();return}const n=e.dataset.cid;if(!n)return;const s=E.get().characters.find(o=>o.id===n);s&&E.dispatch({type:"char/move",id:n,room:E.get().currentRoom,x:t,y:s.y})}const bT={living:"Living",bedroom:"Bed",kitchen:"Kitchen",salon:"Salon",nursery:"Nursery",bathroom:"Bath"};function o2(){const e=A==="house",t=document.body.classList.contains("phone-portrait"),n=e&&!Pe.isPlay(),s=e&&K+1<pe,o=e&&(t?n:n||s);document.body.classList.toggle("show-minimap",o)}const wT='<svg class="tabIco" width="14" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M1.6 6 L8 1.4 L14.4 6 V10.8 H1.6 Z" fill="currentColor" stroke="#5b3d5c" stroke-width="1.4" stroke-linejoin="round"/><rect x="6.6" y="7" width="2.8" height="3.8" rx=".8" fill="#fff6ea" stroke="#5b3d5c" stroke-width="1"/></svg>';function i2(){return document.body.classList.contains("phone")}function kT(){const e=i2()?"c":"f";o2(),e!==tf&&(tf=e,p2(E.get()))}function nc(){ui.matches?Cs():Us()}window.addEventListener("resize",nc);window.addEventListener("resize",()=>requestAnimationFrame(xh));L("tabs").addEventListener("scroll",xh,{passive:!0});ui.addEventListener("change",nc);if(typeof ResizeObserver<"u"){let e="";new ResizeObserver(()=>{const t=L("stageWrap"),n=t.clientWidth+"x"+t.clientHeight;n!==e&&(e=n,nc())}).observe(L("stageWrap"))}let i0="",jc=!1;function a0(){const e=L("stageWrap"),t=document.querySelector(".top"),n=document.querySelector(".tools"),s=r=>r?r.clientWidth+"x"+r.clientHeight:"0",o=window.visualViewport,i=o?Math.round(o.offsetTop)+"x"+Math.round(o.height)+"x"+Math.round(o.width):"",a=document.body.classList.contains("baby-card")?"c":"";return i+" "+s(e)+" "+s(t)+" "+s(n)+a}function kh(){const e=document.body;if(!e.classList.contains("baby-card")||!e.classList.contains("phone")||e.classList.contains("phone-portrait"))return 0;const t=document.querySelector(".babyCare"),n=t&&!t.hidden?t.getBoundingClientRect().height:0;return Math.ceil(8+(n>8?n:72)+8)}function a2(e){const t=kh(),n=L("stageWrap").clientHeight;G.style.left="",t>0?G.style.top=t+Math.max(0,n-t)/2+"px":G.style.top="",G.style.transform=`translate(-50%,-50%) scale(${e})`}function r2(){const e=L("modeToggle"),t=document.querySelector(".tools"),n=document.getElementById("modeDock"),s=document.querySelector(".drawerTop"),o=document.getElementById("roomFilter");if(!e||!t||!n||!s||!o)return!1;const i=document.body.classList.contains("phone"),a=i&&!document.body.classList.contains("phone-portrait"),r=!i&&window.matchMedia("(min-width: 900px)").matches,l=a?t:i||r?n:s;n.hidden=!(i&&!a)&&!r,n.classList.toggle("wideDock",r);let c=!1;const d=r?n:s;return o.parentElement!==d&&(r?n.appendChild(o):s.insertBefore(o,s.firstChild),c=!0),(e.parentElement!==l||r&&n.firstChild!==e)&&(a?t.insertBefore(e,t.firstChild):i||r?n.insertBefore(e,n.firstChild):s.insertBefore(e,s.firstChild),c=!0),c}function vT(){if(E.get().currentRoom==="backyard"||!document.body.classList.contains("phone-portrait")||!document.body.classList.contains("mode-play")||A!=="house")return;const e=L("stageWrap"),t=e.clientWidth,n=e.clientHeight;if(t<20||n<20||!(n>t*.85))return;const s=Math.min(pe,wh(Math.max(280,Math.min(860,Math.round(Ie*t/n)))));if(Math.abs(s-K)<2)return;K=s,G.style.width=K+"px",G.style.height=Ie+"px";const o=Math.min(t/K,n/Ie);if(G.style.transform=`translate(-50%,-50%) scale(${o})`,G.style.setProperty("--fit",String(dt())),ae>$o())ct(ae);else{const i=L("mmView");i.style.left=ae/pe*100+"%",i.style.width=K/pe*100+"%"}t2(),o2()}function Cs(){if(jc||!ui.matches)return;const e=r2(),t=a0()+(document.body.classList.contains("mode-play")?"p":"d");if(!(!e&&t===i0)){jc=!0;try{Us(),vT(),ft(),i0=a0()+(document.body.classList.contains("mode-play")?"p":"d")}finally{jc=!1}}}if(typeof ResizeObserver<"u"){const e=new ResizeObserver(()=>Cs()),t=document.querySelector(".top");t&&e.observe(t),e.observe(L("stageWrap"));const n=document.querySelector(".tools");n&&e.observe(n)}window.visualViewport&&(window.visualViewport.addEventListener("resize",()=>Cs()),window.visualViewport.addEventListener("scroll",()=>Cs()));G.addEventListener("scroll",()=>{G.scrollLeft=0,G.scrollTop=0});const Ne=(e,t)=>{const n=G.getBoundingClientRect();return{x:(e-n.left)/n.width*K+ae,y:(t-n.top)/n.height*Ie}},nf=(e,t)=>{const n=G.getBoundingClientRect();return e>n.left&&e<n.right&&t>n.top&&t<n.bottom},r0=(e,t)=>{const n=Cr.getBoundingClientRect();return e>n.left-20&&e<n.right+20&&t>n.top-20&&t<n.bottom+20},pi=e=>As[e.size]??1,$n=new Map;function vh(){return!v||Ae===te?!0:v.houses.get(ge)?.meta.ownerId===v.pid}function sc(e){return String(e||"").toLowerCase().replace(/^pack:/,"")==="picnic-table"?null:ai(e)}function Va(e){const t=le[e.kind];return!t||!sc(e.kind)?null:{id:e.id,kind:e.kind,x:e.x,footY:Ws(t,e.y),flip:!!e.flip,scale:Fe(e),w:t.w,h:Je(t)}}function wt(e,t,n){if(!t)return n;const s=E.get().rooms[e]?.items.find(a=>a.id===t.item),o=s&&Va(s);if(!o)return n;const i=N0(o).find(a=>a.n===t.n);return i?{x:i.x,y:i.y}:n}function xo(e,t,n=!1){const s=E.get(),o=[];for(const i of s.characters){if(i.id===e||i.room!==s.currentRoom)continue;const a=ut(i);a&&o.push({item:a.item,n:a.n})}if(!n){const i=$w(s.baby,s.currentRoom);i&&o.push(i)}if(v&&A==="house"){const i=(r,l)=>{if(r===t||l.where!=="house"||l.houseId!==ge||l.room!==s.currentRoom)return;const c=qt(r,l);c&&o.push({item:c.item,n:c.n})};v.presence.forEach((r,l)=>i(l,r));const a=ye();a&&v.pid!==t&&i(v.pid,a)}return o}function l2(e,t){t?$n.set(e,t):$n.delete(e)}function oa(e,t,n,s,o){o&&Vs();const a=!v||Ae===te||!!v?.speaksSit;a?$n.delete("c:"+e):l2("c:"+e,o),a?E.dispatch({type:"char/move",id:e,room:t,x:n,y:s,seat:o}):E.dispatch({type:"char/move",id:e,room:t,x:n,y:s})}function $a(e,t,n,s,o){o&&Vs();const{seat:i,...a}=e;if(v&&!v.speaksSit){l2("p:"+v.pid,o?{item:o.id,pose:o.pose,n:o.n}:null),tt({...a,x:t,y:n,flip:s});return}v&&$n.delete("p:"+v.pid),tt(o?{...a,x:t,y:n,flip:s,seat:o}:{...a,x:t,y:n,flip:s})}function ut(e){return e.seat?e.seat:$n.get("c:"+e.id)??null}function qt(e,t){return t.seat?{item:t.seat.id,pose:t.seat.pose,n:t.seat.n}:$n.get("p:"+e)??null}function cl(e,t){const n=E.get(),s=document.elementsFromPoint(e,t),o=new Set;for(let i=0;i<s.length;i++){const a=s[i];if(!a||!a.closest)continue;const r=a.closest(".item");if(!r)continue;const l=r.dataset.id;if(!l||o.has(l))continue;o.add(l);const c=n.rooms[n.currentRoom].items.find(d=>d.id===l);if(c&&sc(c.kind))return c}return null}function c2(e,t){const n=E.get(),s=document.elementsFromPoint(e,t),o=new Set;for(let i=0;i<s.length;i++){const a=s[i];if(!a||!a.closest)continue;const r=a.closest(".item");if(!r)continue;const l=r.dataset.id;if(!l||o.has(l))continue;o.add(l);const c=n.rooms[n.currentRoom].items.find(d=>d.id===l);if(c)return c}return null}function _T(e){const t=[];for(const n of["left","right"]){const s=e.held[n];s&&Et(s.kind)&&t.push({hand:n,kind:s.kind})}return t}function _h(e,t,n,s){const o=E.get(),i=o.characters.find(r=>r.id===e);if(!i)return;const a=zl({releaseX:t,releaseY:n,hit:s,items:o.rooms[o.currentRoom].items,occupied:xo(e),held:_T(i),seatPiece:r=>Va(r)});for(const r of a.releases)E.dispatch({type:"char/release",id:e,hand:r.hand,x:r.x,y:r.y});oa(e,o.currentRoom,a.x,a.y,a.seat)}function $h(e,t,n){const s=ye();if(!s||!v||s.where!=="house")return;const o=E.get(),i=zl({releaseX:e,releaseY:t,hit:n,items:o.rooms[o.currentRoom].items,occupied:xo(void 0,v.pid),held:[],seatPiece:r=>Va(r)}),a=i.seat?{id:i.seat.item,pose:i.seat.pose,n:i.seat.n}:null;$a(s,i.x,i.y,s.flip,a)}function l0(e){return Yb(e)}const Br=new Set,dl=e=>!(e&&e.look2);function $T(){const e=E.get(),t=new Map;Br.clear();const n=(s,o)=>{const i=t.get(s);t.set(s,i===void 0?o:Math.max(i,o))};for(const s of e.characters){const o=s.room===e.currentRoom?ut(s):null;o&&(n(o.item,o.n),dl(s)&&Br.add(o.item))}if(v&&A==="house"){const s=(i,a)=>{const r=a.where==="house"&&a.houseId===ge&&a.room===e.currentRoom?qt(i,a):null;r&&(n(r.item,r.n),dl(v?.players.get(i)?.look)&&Br.add(r.item))};v.presence.forEach((i,a)=>s(a,i));const o=ye();o&&s(v.pid,o)}return t}function xT(e,t){const n=pi(e),s=Gl(e,Fl(ut(e)?.pose))[t];let o=s.x;e.flip&&(o=100-o);const i=wt(e.room,ut(e),e);return{x:i.x+(o-50)/100*Xt*n,y:i.y-Ot*n+s.y/160*Ot*n}}function d2(e){const t=E.get();let n=null;for(const s of t.characters){if(s.room!==t.currentRoom)continue;const o=pi(s),i=wt(s.room,ut(s),s),a=Math.abs(e.x-i.x)<Xt*o/2+25&&e.y>i.y-Ot*o-25&&e.y<i.y+20;for(const r of["left","right"]){if(s.held[r])continue;const l=xT(s,r),c=Math.hypot(e.x-l.x,e.y-l.y);(a||c<75)&&(!n||c<n.d)&&(n={c:s,hand:r,d:c})}}return n}const f2=["none","radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)","repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)","linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)"],h2="repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 125px), linear-gradient(rgba(0,0,0,.06), transparent 50%)",sf=e=>`url('${e.replace(/'/g,"%27")}')`;function u2(e){const t=e.rooms[e.currentRoom],n=L("wall"),s=L("floor"),o=t.wallTile?Gu[t.wallTile]:void 0;n.style.backgroundColor=t.wallpaper,o?(n.style.backgroundImage=sf(o.url),n.style.backgroundSize="220px auto",n.style.backgroundPosition="0 0"):(n.style.backgroundImage=f2[t.pattern]??"none",n.style.backgroundSize=t.pattern===1?"44px 44px":t.pattern===3?"60px 60px":"auto",n.style.backgroundPosition=t.pattern===3?"0 0, 30px 30px":"0 0");const i=t.floorTile?Gu[t.floorTile]:void 0;s.style.backgroundColor=t.floor,s.style.backgroundImage=i?`${sf(i.url)}, linear-gradient(rgba(0,0,0,.06), transparent 50%)`:h2,s.style.backgroundSize=i?"180px auto, auto":"auto",L("mmWall").style.background=t.wallpaper,L("mmFloor").style.background=t.floor,ko(L("sceneArt"),A==="house"?sE(e.currentRoom,t):null,G),$2(e)}function fl(e){const n=e.rooms[e.currentRoom].items.filter(o=>le[o.kind]).map(o=>{const i=le[o.kind];return`<i style="left:${o.x/pe*100}%;top:${(Ws(i,o.y)-Je(i)*Fe(o)/2)/Ie*100}%"></i>`}).join(""),s=e.characters.filter(o=>o.room===e.currentRoom).map(o=>{const i=wt(e.currentRoom,ut(o),o);return`<b style="left:${i.x/pe*100}%;top:${(i.y-90)/Ie*100}%;background:${o.shirt}"></b>`}).join("");L("mmDots").innerHTML=n+s}function p2(e){const t=i2();tf=t?"c":"f",document.body.classList.toggle("tabs-compact",t),L("tabs").innerHTML=ph.map(n=>{const s=t?bT[n.id]??n.name:n.name;return`<button class="tab ${e.currentRoom===n.id?"on":""}" data-room="${n.id}" style="--c:${n.color}" aria-label="${n.name}">${t?wT:""}${s}</button>`}).join(""),requestAnimationFrame(()=>{MT(),xh()})}function xh(){const e=document.getElementById("tabs");if(!e)return;const t=e.scrollWidth-e.clientWidth;e.classList.toggle("fadeL",t>2&&e.scrollLeft>2),e.classList.toggle("fadeR",t>2&&e.scrollLeft<t-2)}function MT(){const e=document.getElementById("tabs"),t=e?.querySelector(".tab.on");if(!e||!t||e.scrollWidth<=e.clientWidth+2)return;const n=t.offsetLeft-e.offsetLeft,s=n+t.offsetWidth;n<e.scrollLeft+24?e.scrollLeft=Math.max(0,n-24):s>e.scrollLeft+e.clientWidth-24&&(e.scrollLeft=s-e.clientWidth+24)}function zs(e,t,n,s,o){Yl(e,(t-s/2)/pe*100+"%",(n-o)/Ie*100+"%"),e.style.width=s/pe*100+"%",e.style.height=o/Ie*100+"%"}const LT=10;function ET(e){const n=[e,...e.querySelectorAll("svg, img, canvas, .inner")].map(r=>r.getBoundingClientRect()).filter(r=>r.width>2&&r.height>2);if(!n.length)return e.getBoundingClientRect();const s=Math.min(...n.map(r=>r.left)),o=Math.max(...n.map(r=>r.right)),i=Math.min(...n.map(r=>r.top)),a=Math.max(...n.map(r=>r.bottom));return{left:s,right:o,top:i,bottom:a}}let pr=0,of=!1,gr=null;function ST(){return[...document.querySelectorAll("#layer .char.pose-sit, #layer .char.pose-lie, #layer .avatar.pose-sit, #layer .avatar.pose-lie")].map(e=>{const t=e.getBoundingClientRect();return`${t.left.toFixed(1)},${t.right.toFixed(1)}`}).join("|")}function TT(){const e=[...document.querySelectorAll("#layer .char img, #layer .avatar img")].filter(t=>!t.complete);return e.length?Promise.all(e.map(t=>new Promise(n=>{t.addEventListener("load",()=>n(),{once:!0}),t.addEventListener("error",()=>n(),{once:!0})}))).then(()=>{}):Promise.resolve()}function g2(e){e.querySelectorAll("img").forEach(t=>{t.complete||t.addEventListener("load",()=>Ua(),{once:!0})})}function Ua(){const e=++pr,t=()=>{if(e!==pr)return;let s="",o=0,i=0;const a=()=>{if(e!==pr)return;m2();const r=ST();o++,r===s?i++:(i=0,s=r),!(i>=2)&&(o>40||requestAnimationFrame(a))};requestAnimationFrame(a)};(document.fonts?.ready??Promise.resolve()).then(()=>TT()).then(()=>{e===pr&&requestAnimationFrame(()=>requestAnimationFrame(t))})}function PT(){if(gr)return;const e=()=>{of||Ua()};document.fonts?.ready?.then(e),window.addEventListener("resize",e),window.addEventListener("load",e),gr=new ResizeObserver(()=>e());try{gr.observe(G),Y&&gr.observe(Y)}catch{}}function m2(){of=!0;try{AT()}finally{of=!1}}function AT(){const e=E.get(),t=e.currentRoom;for(const n of e.characters){if(n.room!==t)continue;const s=It.get(n.id),o=ut(n),i=o?.pose??null;if(!s||!i)continue;const a=pi(n);hl(s,wt(t,o,n),Xt*a,Ot*a)}if(v&&Ae!==te&&A==="house"){const n=[...v.presence.entries()],s=ye();s&&n.push([v.pid,s]);for(const[o,i]of n){if(i.where!=="house"||i.houseId!==ge||i.room!==t)continue;const a=fs.get(o),r=qt(o,i),l=r?.pose??null,c=v.players.get(o);if(!a||!l||!c)continue;const d=As[c.look.size]??1;hl(a,wt(t,r,i),Xt*d,Ot*d)}}}function hl(e,t,n,s){const o=G.getBoundingClientRect();if(o.width<20)return;const i=dt()||1,a=LT,r=o.left+(0-ae)*i,l=o.left+(pe-ae)*i,c=o.top,d=o.bottom;let f=t.x,u=t.y;for(let p=0;p<3;p++){const m=ET(e);let k=0,w=0;if(m.left<r+a&&(k+=r+a-m.left),m.right>l-a&&(k-=m.right-(l-a)),m.top<c+a&&(w+=c+a-m.top),m.bottom>d-a&&(w-=m.bottom-(d-a)),!k&&!w)return;f+=k/i,u+=w/i,zs(e,f,u,n,s)}}function Mh(e,t){let n=e.w*t,s=Je(e)*t;if((e.kind==="kennel"||e.kind==="cat-tower")&&document.body.classList.contains("phone")){const o=Math.max(.2,dt()||1),i=44*pe/(Math.max(1,K)*o),a=44/o;n<i&&(n=i),s<a&&(s=a)}return{w:n,h:s}}function RT(e,t,n){const s=H1(t),o=t+":"+n+":"+(s?1:0);e.dataset.sig!==o&&(e.dataset.sig=o,e.innerHTML=`<div class="inner">${al(n,s)}</div>`,s||CT(t))}const Zc=new Set;let Gc=0;const Yc=new Set;function CT(e){!v||Ae===te||Zc.has(e)||kS(e)||(Zc.add(e),Yc.add(e),Gc||(Gc=window.setTimeout(()=>{Gc=0;const t=[...Yc];Yc.clear(),v&&ge&&v.getArt(ge,t),t.forEach(n=>setTimeout(()=>Zc.delete(n),8e3))},60)))}function y2(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n?.items??[])s.art&&t.add(s.art);return t}const IT=[...["Heart","Star","Flower","Kitty","Rainbow","Sparkle"].map((e,t)=>({name:e,svg:Do[t]})),...["dog","bunny","fish","flowers","balloon","cake"].filter(e=>le[e]).map(e=>({name:le[e].name,svg:`<svg viewBox="${le[e].vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${le[e].svg}</svg>`}))];function b2(){if(A!=="house"){Z("The Art Studio is at home. Pop inside to paint!");return}if(!pt()){Z("Paint at home, or in a friend's open house!");return}ES({stamps:IT,sfx:C,onSave:(e,t)=>DT(e,t)})}const c0=new Set;function BT(e){const t=L("artGrip"),n=qe?e.rooms[e.currentRoom].items.find(l=>l.id===qe):void 0,s=n&&Y.querySelector(`.item[data-id="${n.id}"]`);if(Pe.isPlay()||!n||n.kind!=="picture"||!n.art||!s||!pt()){t.classList.add("hidden");return}const o=s.getBoundingClientRect(),i=Math.min(o.width,o.height)>=120?14:0,a=Ne(o.right-i,o.bottom-i),r=G.getBoundingClientRect().width/Math.max(1,K)||1;t.style.left=a.x/pe*100+"%",t.style.top=a.y/Ie*100+"%",t.style.width=t.style.height=64/r+"px",(t.classList.contains("hidden")||t.dataset.for!==n.id)&&(t.dataset.for=n.id,c0.has(n.id)||(c0.add(n.id),t.classList.remove("pulse"),t.offsetWidth,t.classList.add("pulse"))),t.classList.remove("hidden")}L("artGrip").addEventListener("pointerdown",e=>{if(e.preventDefault(),e.stopPropagation(),!pt()||!qe)return;const t=E.get().currentRoom,n=qe,s=E.get().rooms[t].items.find(w=>w.id===n),o=Y.querySelector(`.item[data-id="${n}"]`);if(!s||!o)return;const i=o.getBoundingClientRect(),a=i.left+i.width/2,r=i.top+i.height/2,l=i.width/2,c=i.height/2,d=Math.max(1,Math.hypot(l,c)),f=l/d,u=c/d,p=(w,b)=>(w-a)*f+(b-r)*u,m=Math.max(20,p(e.clientX,e.clientY)),k=Kn(s.size);L("artGrip").classList.remove("pulse"),L("artGrip").classList.add("active"),ne.classList.add("hidden"),Tn(e,{edgeScroll:!1,onMove(w){const b=k*Math.max(0,p(w.clientX,w.clientY))/m;let g=qn[0];for(const _ of qn)Math.abs(_-b)<Math.abs(g-b)&&(g=_);const y=E.get().rooms[t].items.find(_=>_.id===n);y&&Kn(y.size)!==g&&(E.dispatch({type:"item/size",room:t,id:n,size:g}),C.click())},onUp(){L("artGrip").classList.remove("active"),v2(t,n),Ct(E.get())}})});L("artFab").addEventListener("click",()=>{C.click(),b2()});function w2(){L("artFab").classList.toggle("hidden",A!=="house"||!pt())}const Or=new Map;function k2(e){const t=G.getBoundingClientRect(),n=L("nudgeL").getBoundingClientRect(),s=L("nudgeR").getBoundingClientRect(),o=(c,d)=>c.width>0&&!d.classList.contains("off")&&getComputedStyle(d).visibility!=="hidden"&&getComputedStyle(d).display!=="none"&&+getComputedStyle(d).opacity>.05,i=o(n,L("nudgeL"))?n.right+10:t.left+6,a=o(s,L("nudgeR"))?s.left-10:t.right-6;let r=Ne(i,0).x+e,l=Ne(a,0).x-e;if(r=Math.max(e,r),l=Math.min(pe-e,l),l<r){const c=(r+l)/2;r=l=Math.max(e,Math.min(pe-e,c))}return{lo:r,hi:l}}function OT(){const e=le.picture,t=e.w/2,n=Je(e),s=Math.min(Ha,200+n/2),o=s-n;let{lo:i,hi:a}=k2(t);const r=[];for(const f of document.querySelectorAll("#layer > :not(.char), #scenery > *")){const u=f.getBoundingClientRect();if(!u.width)continue;const p=Ne(u.left,u.top),m=Ne(u.right,u.bottom),k=f.classList.contains("yardDoor")?50:1;r.push({l:p.x,r:m.x,t:p.y,b:m.y,k})}const l=ae+K/2;i=Math.min(Math.max(i,l-K*.3),a),a=Math.max(Math.min(a,l+K*.3),i);let c=Math.max(i,Math.min(a,l)),d=1/0;for(let f=i;f<=a+.1;f+=Math.max(4,(a-i)/60)){let u=0;for(const m of r)u+=m.k*Math.max(0,Math.min(f+t+12,m.r)-Math.max(f-t-12,m.l))*Math.max(0,Math.min(s+12,m.b)-Math.max(o-12,m.t));const p=u*10+Math.abs(f-l);p<d&&(d=p,c=f)}return c}function v2(e,t){const n=E.get().rooms[e].items.find(u=>u.id===t);if(!n||n.kind!=="picture"||!n.art)return;const s=le.picture,o=Fe(n),i=s.w*o/2,a=Je(s)*o,r=G.getBoundingClientRect(),l=Ne(r.left,0).x,c=Ne(r.right,0).x;let d=n.x,f=Math.min(Ha,Math.max(a+16,n.y));if(d+i>l&&d-i<c){const{lo:u,hi:p}=k2(i);d=Math.max(u,Math.min(p,d));const m=Y.querySelector(".yardDoor"),k=m?.getBoundingClientRect();if(k&&k.width){const w=Ne(k.left,k.top),b=Ne(k.right,k.bottom);if(d+i>w.x-8&&d-i<b.x+8&&f>w.y&&f-a<b.y){const g=w.x-8-i,y=b.x+8+i,_=x=>x>=u-.5&&x<=p+.5,T=[g,y].filter(_).sort((x,$)=>Math.abs(x-d)-Math.abs($-d));T.length&&(d=T[0])}}}(Math.abs(d-n.x)>.5||Math.abs(f-n.y)>.5)&&E.dispatch({type:"item/move",room:e,id:t,x:d,y:f})}function DT(e,t){const n="a"+Date.now().toString(36)+Math.random().toString(36).slice(2,8),s=E.get(),o=s.currentRoom;O1(n,e);const i=OT();if(v&&Ae!==te&&ge){Or.set(n,{houseId:ge,room:o,frame:t,x:i}),v.saveArt(ge,n,e);return}wS(n,e,y2(s)),_2(o,n,t,i)}function _2(e,t,n,s){const o=le.picture,i={id:rl("picture"),kind:"picture",x:s,y:Math.min(Ha,200+Je(o)/2),flip:!1,z:0,scale:1,art:t,...n?{frame:n}:{}};E.dispatch({type:"item/add",room:e,item:i}),qe=i.id,Ct(E.get());const a=Y.querySelector(`.item[data-id="${i.id}"]`);Ke(a),gi(a),C.sparkle()}function Ct(e){const t=e.rooms[e.currentRoom],n=new Set;for(const s of t.items){const o=le[s.kind];if(!o)continue;n.add(s.id);let i=Y.querySelector(`.item[data-id="${s.id}"]`);i||(i=document.createElement("div"),i.className="item",i.dataset.id=s.id,i.innerHTML=`<div class="inner">${Nt(o,!0)}</div>`,Y.appendChild(i),i.addEventListener("pointerdown",l=>JT(i,l))),i.dataset.kind=s.kind,s.art&&RT(i,s.art,s.frame??0),i.classList.toggle("is-light",oS(s.kind,!!o.light));const a=Mh(o,Fe(s));zs(i,s.x,Ws(o,s.y),a.w,a.h);const r=1e3+s.z;if(i.style.zIndex=String(r),i.style.setProperty("--iz",String(r)),s.art){const l=Y.querySelector(".yardDoor");l&&af(i.getBoundingClientRect(),l.getBoundingClientRect())&&(i.style.zIndex=String(Math.max(r,(parseInt(l.style.zIndex||"2",10)||2)+1)))}i.classList.toggle("flipped",s.flip),i.classList.toggle("sel",qe===s.id)}Y.querySelectorAll(".item").forEach(s=>{n.has(s.dataset.id)||s.remove()}),$2(e),UT(),oc(),E2(e),fl(e),w2(),$s()}function oc(){const e=E.get(),t=$T(),n=new Set;t.forEach((i,a)=>{const r=e.rooms[e.currentRoom]?.items.find(m=>m.id===a),l=r&&le[r.kind],c=r&&l0(r.kind);if(!r||!l||!c||c==="k-picnic"&&Br.has(a))return;n.add(a);let d=Y.querySelector(`.seatFront[data-id="${a}"]`);d||(d=document.createElement("div"),d.className="seatFront",d.dataset.id=a,Y.appendChild(d));const f=Y.querySelector(`.item[data-id="${a}"] .inner`),u=d.querySelector(".inner");(!u||f&&u.innerHTML!==f.innerHTML)&&(d.innerHTML=`<div class="inner">${f?f.innerHTML:Nt(l,!0)}</div>`),d.className="seatFront "+c+(r.flip?" flipped":"");const p=Mh(l,Fe(r));zs(d,r.x,Ws(l,r.y),p.w,p.h),d.style.zIndex=String(1e3+r.z+3)}),Y.querySelectorAll(".seatFront").forEach(i=>{n.has(i.dataset.id||"")||i.remove()});const s=e.rooms[e.currentRoom],o=i=>!!i&&!!s&&s.items.some(a=>a.id===i&&l0(a.kind)==="k-picnic");for(const i of e.characters){const a=Y.querySelector(`.char[data-cid="${i.id}"]`);a&&a.classList.toggle("classic-picnic",i.room===e.currentRoom&&dl(i)&&o(ut(i)?.item))}v&&A==="house"&&v.presence.forEach((i,a)=>{const r=Y.querySelector(`.char.avatar[data-pid="${a}"]`);r&&r.classList.toggle("classic-picnic",dl(v?.players.get(a)?.look)&&o(qt(a,i)?.item))})}let Mo=!1,d0=0;function Lh(e){performance.now()-d0<80||(d0=performance.now(),CA(e))}function HT(e,t){const n=G.querySelector(".yardDoor");if(!n)return null;const s=o=>{if(!o)return!1;const i=o.getBoundingClientRect();return i.width>2&&i.height>2&&e>=i.left&&e<=i.right&&t>=i.top&&t<=i.bottom};return s(n.querySelector(".yardHintLabel"))||s(n.querySelector(".doorArt"))||s(n)?n:null}function WT(e){e.addEventListener("pointerdown",t=>{if(t.button!==0)return;t.stopPropagation();const n=e.dataset.yardGo==="backyard"?"backyard":"living",s=t.clientX,o=t.clientY,i=t.pointerId;Mo=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),Mo=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),Lh(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)})}G.addEventListener("pointerdown",e=>{if(e.button!==0)return;const t=HT(e.clientX,e.clientY);if(!t||e.target instanceof Node&&t.contains(e.target)||e.target instanceof Element&&e.target.closest("#artGrip, #toolbar")||e.target instanceof Element&&e.target.closest('.item[data-kind="picture"][data-sig]'))return;e.stopPropagation(),e.preventDefault();const n=t.dataset.yardGo==="backyard"?"backyard":"living",s=e.clientX,o=e.clientY,i=e.pointerId;Mo=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),Mo=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),Lh(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)},!0);function af(e,t){return e.width>2&&t.width>2&&e.left<t.right-1&&e.right>t.left+1&&e.top<t.bottom-1&&e.bottom>t.top+1}function Kc(e){const t=e.getBoundingClientRect();let n=0;Y.querySelectorAll(".item").forEach(s=>{if(s.classList.contains("is-light"))return;const o=le[s.dataset.kind||""];if(!o||o.wall||!af(s.getBoundingClientRect(),t))return;const i=parseInt(s.style.zIndex||"0",10)||0;i>n&&(n=i)}),e.style.zIndex=n?String(n+2):"2",Y.querySelectorAll(".item[data-sig]").forEach(s=>{af(s.getBoundingClientRect(),t)&&(s.style.zIndex=String(Math.max(parseInt(s.style.zIndex||"0",10)||0,parseInt(e.style.zIndex,10)+1)))})}function $2(e){const t=e.rooms[e.currentRoom];nE(L("scenery"),e.currentRoom,t.items),L("scenery").querySelectorAll(".yardDoor").forEach(o=>o.remove());const n=e.currentRoom==="living"?"backyard":e.currentRoom==="backyard"?"living":"",s=Y.querySelector(".yardDoor");if(!n)Y.querySelectorAll(".yardDoor").forEach(o=>o.remove());else if(!s||s.dataset.yardGo!==n){Y.querySelectorAll(".yardDoor").forEach(i=>i.remove()),Y.insertAdjacentHTML("beforeend",pM(n==="backyard"?"living":"yard"));const o=Y.querySelector(".yardDoor");o&&WT(o)}G.classList.toggle("room-yard",e.currentRoom==="backyard"),kl(),Mo||Nn()}const It=new Map;function VT(e){const t=pi(e),n=Xt*t,s=Ot*t,o=Gl(e,Fl(ut(e)?.pose)),i=e.look2?.85:1;return["left","right"].map(a=>{const r=e.held[a],l=r&&le[r.kind];if(!r||!l)return"";const c=Fe(r),d=Math.min(.7,120*t/Math.max(l.w,Je(l))/c)*i,f=l.w*c*d,u=Je(l)*c*d,p=o[a].x/100*n,m=o[a].y/160*s,k=Yo(r.kind)&&e.size!=="little"?.7:.62;return`<div class="held ${r.flip?"flipped":""}" data-hand="${a}" style="left:${(p-f/2)/n*100}%;top:${(m-u*k)/s*100}%;width:${f/n*100}%;height:${u/s*100}%"><div class="inner">${Nt(l)}</div></div>`}).join("")}function UT(){let e=Y.querySelector("#skyPuddles");e||(e=document.createElement("div"),e.id="skyPuddles",e.className="skyPuddles"),Y.appendChild(e);const t=[...Y.querySelectorAll(".item.is-light")];for(;e.children.length>t.length;)e.lastElementChild.remove();for(;e.children.length<t.length;)e.appendChild(document.createElement("i"));t.forEach((n,s)=>{const o=e.children[s],i=parseFloat(n.style.left),a=parseFloat(n.style.top),r=parseFloat(n.style.width),l=parseFloat(n.style.height),c=n.dataset.kind==="window"||n.dataset.kind==="tv";o.style.left=i-.6*r+"%",o.style.top=a-(c?.38:.5)*l+"%",o.style.width=2.2*r+"%",o.style.height=2*l+"%",o.style.zIndex=String(parseInt(n.style.zIndex||"1000",10))})}let ic=()=>{};function ia(e){const t=e.baby;return t&&t.spot==="arms"&&t.holder?t.holder:""}const hs=new Map;function x2(e){for(const[t,n]of hs)t.indexOf(e+":")===0&&(n.remove(),hs.delete(t))}function M2(e,t){const n=e+":"+t,s=hs.get(n);s&&(s.remove(),hs.delete(n))}function L2(e,t,n,s,o){const i=e+":"+t;for(const[r,l]of hs)r.indexOf(e+":")===0&&r!==i&&(l.remove(),hs.delete(r));let a=hs.get(i);if((!a||!a.isConnected)&&(a=document.createElement("div"),a.className="cradle-front",a.dataset.for=t,a.innerHTML='<div class="inner"></div>',Y.appendChild(a),hs.set(i,a)),a.dataset.arm!==s){const r=a.querySelector(".inner");r&&(r.innerHTML=s),a.dataset.arm=s}a.style.left=n.style.left,a.style.top=n.style.top,a.style.width=n.style.width,a.style.height=n.style.height,a.style.zIndex=String(5e3+Math.round(o)+4),a.classList.toggle("flipped",n.classList.contains("flipped")),a.classList.toggle("pose-sit",n.classList.contains("pose-sit")),a.classList.toggle("pose-lie",n.classList.contains("pose-lie")),a.classList.toggle("pose-lie-r",n.classList.contains("pose-lie-r"))}function cn(e){const t=e.characters.filter(n=>n.room===e.currentRoom);for(const[n,s]of It)t.some(o=>o.id===n)||(s.remove(),It.delete(n));for(const n of t){let s=It.get(n.id);s||(s=document.createElement("div"),s.className="char",s.dataset.cid=n.id,s.innerHTML='<div class="inner"></div><div class="hands"></div>',Y.appendChild(s),It.set(n.id,s),sP(s));const o=ut(n),i=o?.pose??null,a=ia(e)===n.id,r=vb(n)+(i||"")+(a?"h":"");s.dataset.look!==r&&(s.querySelector(".inner").innerHTML=St(n,i,a),s.dataset.look=r),s.classList.toggle("holding",a);const l=VT(n);s.dataset.held!==l&&(s.querySelector(".hands").innerHTML=l,s.dataset.held=l);const c=pi(n),d=wt(e.currentRoom,o,n);if(s.classList.toggle("flipped",n.flip),s.classList.toggle("pose-sit",i==="sit"),s.classList.toggle("pose-lie",i==="lie"),s.classList.toggle("pose-lie-r",i==="lie"&&!!e.rooms[e.currentRoom].items.find(u=>u.id===o?.item)?.flip),zs(s,d.x,d.y,Xt*c,Ot*c),i&&(hl(s,d,Xt*c,Ot*c),g2(s)),s.style.zIndex=String(o?1e3+(e.rooms[e.currentRoom].items.find(u=>u.id===o.item)?.z??0)+1+o.n:5e3+Math.round(n.y)),s.classList.toggle("active",n.id===De),Ba(s,n,n.id===De),s.classList.toggle("pose-swing",zt?.id===n.id),a){const u=Km(n,i);u?L2("doll",n.id,s,u,d.y):M2("doll",n.id)}const f=Gl(n);s.style.setProperty("--hx-l",f.left.x+"%"),s.style.setProperty("--hx-r",f.right.x+"%")}t.some(n=>ut(n)?.pose)&&Ua(),(ia(e)===""||!t.some(n=>n.id===ia(e)))&&x2("doll"),$s(),fl(e),ic(),Qa(),za()}function mn(){const e=G.getBoundingClientRect(),t=e.width/Math.max(1,K),n=6,o=document.body.classList.contains("phone")?1/Math.max(.2,t):1,i=ne.offsetWidth,a=ne.offsetHeight,r=parseFloat(ne.style.left)/100*pe,l=parseFloat(ne.style.top)/100*Ie,c=ne.classList.contains("below"),d=r,f=c?l+a/2:l-a/2,u=o*i/2,p=o*a/2,m=_=>e.left+(n+_-ae)*t,k=_=>e.top+(n+_)*t,w=m(d-u),b=m(d+u),g=k(f-p),y=k(f+p);return{left:w,right:b,top:g,bottom:y,width:b-w,height:y-g}}function zT(){const e=G.getBoundingClientRect(),t=4;let n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t,o=Math.max(e.top,0)+t,i=Math.min(e.bottom,window.innerHeight)-t;for(const a of["nudgeL","nudgeR"]){const r=L(a);if(!r||r.classList.contains("off")||r.offsetParent===null)continue;const l=r.getBoundingClientRect();l.width<2||l.height<2||(a==="nudgeL"?n=Math.max(n,l.right+4):s=Math.min(s,l.left-4))}return s-n<48&&(n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t),{left:n,right:s,top:o,bottom:i}}function Rn(e,t){ne.style.left=e/pe*100+"%",ne.style.top=t/Ie*100+"%"}function E2(e){BT(e);const t=qe&&e.rooms[e.currentRoom].items.find(k=>k.id===qe);if(Pe.isPlay()||!t||!le[t.kind]){ne.classList.add("hidden"),ne.classList.remove("below"),ne.style.maxWidth="",L("artFab").classList.remove("tucked");return}L("artFab").classList.add("tucked");const n=le[t.kind],s=Ws(n,t.y),o=s-Je(n)*Fe(t),i=t.kind==="picture"&&t.art?12+64/(G.getBoundingClientRect().width/Math.max(1,K)||1):12;ne.classList.remove("hidden"),ne.style.maxWidth="",ne.classList.remove("below"),Rn(t.x,o-i);const a=zT();mn().top<a.top&&(ne.classList.add("below"),Rn(t.x,s+i));let r=mn();const l=a.right-a.left;if(r.width>l-2&&l>60){const k=ne.offsetWidth*((l-8)/Math.max(1,r.width));ne.style.maxWidth=Math.max(76,k)+"px",!ne.classList.contains("below")&&mn().top<a.top&&(ne.classList.add("below"),Rn(t.x,s+i)),r=mn()}let c=0,d=0;if(r.left<a.left&&(c=a.left-r.left),r.right+c>a.right&&(c=a.right-r.right),r.width>a.right-a.left&&(c=(a.left+a.right)/2-(r.left+r.right)/2),r.top<a.top&&(d=a.top-r.top),r.bottom+d>a.bottom&&(d=a.bottom-r.bottom),Math.abs(c)>=.5||Math.abs(d)>=.5){const k=G.getBoundingClientRect().width/Math.max(1,K)||1,w=parseFloat(ne.style.left)/100*pe+c/k,b=parseFloat(ne.style.top)/100*Ie+d/k;Rn(w,b)}if(t.kind==="picture"&&t.art){const k=Y.querySelector(`.item[data-id="${t.id}"]`),w=L("artGrip"),b=($,I)=>Math.max(0,Math.min($.right,I.right)-Math.max($.left,I.left))*Math.max(0,Math.min($.bottom,I.bottom)-Math.max($.top,I.top)),g=()=>w.classList.contains("hidden")?0:b(w.getBoundingClientRect(),ne.getBoundingClientRect()),y=()=>k?b(k.getBoundingClientRect(),ne.getBoundingClientRect())+8*g():0,_=y();if(_>0){const $={l:ne.style.left,t:ne.style.top,below:ne.classList.contains("below")};ne.classList.toggle("below",!$.below),Rn(t.x,$.below?o-i:s+i);const I=mn(),N=G.getBoundingClientRect().width/Math.max(1,K)||1;let U=0,F=0;I.left<a.left&&(U=a.left-I.left),I.right+U>a.right&&(U=a.right-I.right),I.top<a.top&&(F=a.top-I.top),I.bottom+F>a.bottom&&(F=a.bottom-I.bottom),(U||F)&&Rn(parseFloat(ne.style.left)/100*pe+U/N,parseFloat(ne.style.top)/100*Ie+F/N),y()>=_&&(ne.style.left=$.l,ne.style.top=$.t,ne.classList.toggle("below",$.below))}if(g()>0){const $=w.getBoundingClientRect(),I=mn(),N=G.getBoundingClientRect().width/Math.max(1,K)||1,U=$.left-6-I.right,F=$.right+6-I.left,oe=I.left+U>=a.left,Ee=I.right+F<=a.right,ze=oe&&(!Ee||-U<=F)?U:Ee?F:0;ze&&Rn(parseFloat(ne.style.left)/100*pe+ze/N,parseFloat(ne.style.top)/100*Ie)}const T=()=>[...Y.querySelectorAll(".char")].map($=>{const I=$.getBoundingClientRect();return new DOMRect(I.left,I.top,I.width,I.height*.42)}),x=()=>{const $=mn(),I=new DOMRect($.left,$.top,$.width,$.height);return T().reduce((N,U)=>N+b(U,I),0)};if(x()>0){const $=G.getBoundingClientRect().width/Math.max(1,K)||1,I=()=>{const V=mn();return new DOMRect(V.left,V.top,V.width,V.height)},N=()=>w.classList.contains("hidden")?0:b(w.getBoundingClientRect(),I()),U=()=>k?b(k.getBoundingClientRect(),I()):0,F=()=>(N()>0?1e9:0)+x()*20+U(),oe=()=>({l:ne.style.left,t:ne.style.top,below:ne.classList.contains("below")}),Ee=V=>{ne.style.left=V.l,ne.style.top=V.t,ne.classList.toggle("below",V.below)},ze=()=>{const V=mn();let Q=0,q=0;V.left<a.left&&(Q=a.left-V.left),V.right+Q>a.right&&(Q=a.right-V.right),V.top<a.top&&(q=a.top-V.top),V.bottom+q>a.bottom&&(q=a.bottom-V.bottom),(Q||q)&&Rn(parseFloat(ne.style.left)/100*pe+Q/$,parseFloat(ne.style.top)/100*Ie+q/$)};let be=oe(),O=F();const B=(V,Q)=>{ne.classList.toggle("below",V),Rn(t.x+Q/$,V?s+i:o-i),ze();const q=F();q<O-.5&&(O=q,be=oe())},J=mn();for(const V of[!be.below,be.below]){B(V,0);const Q=G.getBoundingClientRect().left+(6+t.x-ae)*$,q=J.width/2;for(const se of T())B(V,se.left-8-q-Q),B(V,se.right+8+q-Q)}Ee(be)}}const f=Kn(t.size),u=qn.indexOf(f),p=ne.querySelector('[data-a="smaller"]'),m=ne.querySelector('[data-a="bigger"]');p&&(p.disabled=u<=0),m&&(m.disabled=u>=qn.length-1)}function S2(e){const t=L("soundIco");t&&(t.innerHTML=e.soundOn?Zt.soundOn:Zt.soundOff),L("btnSound").setAttribute("aria-label",e.soundOn?"Sound on":"Sound off"),o4(e.soundOn)}function Lo(){const e=E.get();Y.innerHTML="",It.clear(),p2(e),u2(e),Ct(e),cn(e),S2(e);const t=e.characters.find(o=>o.room===e.currentRoom),n=v&&ye(),s=n&&n.where==="house"?n.x:t?.x;ec(),ct(si[e.currentRoom]??oi(s!==void 0?vy(e,s,s-K/2):li)),si[e.currentRoom]!==void 0&&Wa()&&A==="house"&&!document.body.classList.contains("phone")&&Kh(),kt(),Ln(),document.body.classList.contains("phone")&&A==="house"&&requestAnimationFrame(()=>s2())}const f0=200,QT=2,ul=[];let rf=0,Dr=!1,Xc=0;const Un=new Map,NT=60;function qT(e,t){for(Un.delete(e),Un.set(e,t);Un.size>NT;)Un.delete(Un.keys().next().value)}function FT(e){const t=Un.get(e);return t&&(Un.delete(e),Un.set(e,t)),t}function lf(e){const t=document.getElementById("shelf");if(!t)return!1;const n=t.getBoundingClientRect();if(n.width<2||n.height<2)return!1;const s=e.getBoundingClientRect();return s.right>n.left-f0&&s.left<n.right+f0&&s.bottom>n.top-8&&s.top<n.bottom+8}const jT=3,pl=new Map;function cf(e,t){const n=(pl.get(t)||0)+1;if(pl.set(t,n),delete e.dataset.shelfq,n>=jT){delete e.dataset.artq;return}setTimeout(Eh,300*n)}function Uo(){rf--,!Dr&&T2()}function h0(e,t){const n=document.createElement("div");n.innerHTML=Nt(t);const s=n.querySelector("img.artimg");if(!s){delete e.dataset.artq,Uo();return}const o=pl.get(t.kind)||0;if(o>0){const l=s.getAttribute("src")||"";s.setAttribute("src",l+(l.indexOf("?")>=0?"&":"?")+"retry="+o)}let i=!1;const a=l=>{if(!i){if(i=!0,l){const c=Array.prototype.slice.call(n.childNodes);if(qT(t.kind,c),pl.delete(t.kind),e.isConnected&&e.dataset.artq==="1"){delete e.dataset.artq,e.innerHTML="";for(let d=0;d<c.length;d++)e.appendChild(c[d])}else{const d=document.querySelector(`#shelf button.thing[data-artq="1"][data-kind="${CSS.escape(t.kind)}"]`);if(d){delete d.dataset.artq,d.innerHTML="";for(let f=0;f<c.length;f++)d.appendChild(c[f])}}}else e.isConnected&&e.dataset.artq==="1"&&cf(e,t.kind);Uo()}},r=()=>{typeof s.decode=="function"?s.decode().then(()=>a(!0),()=>a(!0)):a(!0)};s.onload=r,s.onerror=()=>a(!1),s.complete&&s.naturalWidth>0&&r()}function T2(){if(!Dr){for(Dr=!0;rf<QT&&ul.length;){const e=ul.shift();if(!e||!e.isConnected||e.dataset.artq!=="1")continue;if(!lf(e)){delete e.dataset.shelfq;continue}const t=e.dataset.kind||"",n=le[t];if(!n){delete e.dataset.artq;continue}if(rf++,Jn(t)){h0(e,n);continue}Os(()=>h(()=>Promise.resolve().then(()=>Nl),void 0)).then(s=>s.loadArtKinds([t])).then(()=>{if(!e.isConnected||e.dataset.artq!=="1"){Uo();return}if(!Jn(t)){cf(e,t),Uo();return}if(!lf(e)){delete e.dataset.shelfq,Uo();return}h0(e,n)},()=>{e.isConnected&&e.dataset.artq==="1"&&cf(e,t),Uo()})}Dr=!1}}function ZT(){const e=document.getElementById("shelf");if(!e||!Xn())return;const t=e.querySelectorAll('button.thing[data-artq="1"]');for(let n=0;n<t.length;n++){const s=t[n];s.dataset.shelfq!=="1"&&lf(s)&&(s.dataset.shelfq="1",ul.push(s))}T2()}function Eh(){Xc||(Xc=requestAnimationFrame(()=>{Xc=0,ZT()}))}function GT(){const e=document.getElementById("shelf");!e||e.dataset.artscroll==="1"||(e.dataset.artscroll="1",e.addEventListener("scroll",Eh,{passive:!0}))}function P2(){const e=document.getElementById("shelf");if(!e||!Xn())return;const t=e.querySelectorAll("button.thing[data-kind]");for(let n=0;n<t.length;n++){const s=t[n],o=s.dataset.kind||"";s.querySelector("img.artimg")||!(Yh(o)||Jn(o))||(s.dataset.artq="1")}Eh()}function A2(){if(Wt==="__people"){Ft();return}P2(),C2()}const R2=()=>le["egg:chloe-starlamp"]?Nt(le["egg:chloe-starlamp"]):"🎁";function C2(){document.querySelectorAll("#cats .cat[data-cat]").forEach(e=>{if(e.querySelector("img.artimg"))return;const t=e.dataset.cat,n=Rs.find(i=>i.id===t);if(t==="secrets"){e.innerHTML=R2();return}const s=n&&n.kind!=="people"?le[n.icon]:void 0;if(!s||!Xn()||!Jn(s.kind))return;const o=n.kind==="pack"?e.querySelector(".packicon"):e;o&&(o.innerHTML=Nt(s))})}function YT(e){const t=K0();if(!v)return;const n=ye();if(!n||n.where!=="house"||!n.seat)return;let s="";if(e.type==="item/flip"||e.type==="item/delete")s=e.id;else if(e.type==="item/move"&&e.stand)s=e.id;else if(e.type==="char/hold")s=e.itemId;else return;if(!s||n.seat.id!==s||e.room!==n.room)return;const o=t&&t.id===s?t:null,i=o?hn(o.kind)*(o.scale||1):hn("bed"),a=uo(o?o.x:n.x,i,n.x);$n.delete("p:"+v.pid);const{seat:r,...l}=n;tt({...l,x:a.x,y:a.y})}E.subscribe((e,t)=>{switch(YT(t),t.type){case"room/switch":{const n=G.classList.contains("room-yard");rT(t.room),v&&Ae!==te&&lP(t.room),Lo(),Ft(),(t.room==="backyard"||n||Pe.isPlay()&&Math.min(window.innerWidth,window.innerHeight)<500)&&Us(),ky(t.room);break}case"item/add":Ct(e),pT(),PA();break;case"game/reset":Lo();break;case"room/wallpaper":case"room/floor":case"room/pattern":case"room/wallTile":case"room/floorTile":u2(e);break;case"char/update":case"char/move":t.type==="char/move"&&zt&&!Ui&&t.id===zt.id&&(zt=null),cn(e),oc(),kl(),A==="ranch"?Ls():A==="park"&&Eo();break;case"char/add":case"char/delete":case"char/hold":case"char/release":Ct(e),cn(e),kt(),Wt==="__people"&&Ft();break;case"item/move":case"item/flip":case"item/delete":case"item/size":Ct(e),cn(e),kt();break;case"baby/meet":case"baby/name":case"baby/care":case"baby/hold":case"baby/place":case"baby/ease":cn(e),kt();break;case"settings/sound":S2(e);break;default:Ct(e)}});function Ke(e){if(!e)return;const t=e.querySelector(":scope > .inner")??e;t.classList.remove("bounce"),t.offsetWidth,t.classList.add("bounce")}function Sh(e,t,n=7){const s=L("fx"),o=["#ffd166","#ff8fab","#8ecae6","#80ed99","#c9a0dc"];for(let i=0;i<n;i++){const a=document.createElement("div");a.className="spark";const r=Math.PI*2*i/n+Math.random()*.5,l=40+Math.random()*30;a.style.left=e+"px",a.style.top=t+"px",a.style.background=o[i%o.length],a.style.setProperty("--dx",Math.cos(r)*l+"px"),a.style.setProperty("--dy",Math.sin(r)*l+"px"),s.appendChild(a),setTimeout(()=>a.remove(),650)}}const gi=e=>{const t=e?.getBoundingClientRect();t&&Sh(t.left+t.width/2,t.top+t.height/2)};function Th(e,t){Sh(e,t,10),C.pop()}function gl(e){It.forEach((t,n)=>{t.classList.toggle("hold-target",!!e&&e.c.id===n),t.dataset.hand=e&&e.c.id===n?e.hand:""})}function I2(e,t){E.dispatch({type:"char/hold",id:e.c.id,hand:e.hand,room:e.c.room,itemId:t}),qe=null,Ct(E.get());const n=It.get(e.c.id);Ke(n),gi(n?.querySelector(`.held[data-hand="${e.hand}"]`)),C.sparkle()}const xn=new Map;let Jt=!1,ml=0;const Ph=()=>[...xn.values()].reduce((e,t)=>e+t,0)/xn.size;G.addEventListener("pointerdown",e=>{e.pointerType==="touch"&&(xn.set(e.pointerId,e.clientX),xn.size>=2&&(Jt=!0,ml=Ph(),ec(),ne.classList.add("hidden")))},!0);window.addEventListener("pointermove",e=>{if(xn.has(e.pointerId)&&(xn.set(e.pointerId,e.clientX),Jt&&xn.size>=2)){Vs();const t=Ph();ct(ae-(t-ml)/dt()),ml=t}},!0);const B2=e=>{xn.delete(e.pointerId),xn.size<2&&Jt&&(xn.size===0?Jt=!1:ml=Ph())};window.addEventListener("pointerup",B2,!0);window.addEventListener("pointercancel",B2,!0);const Oo=80;function KT(e,t){const n=G.getBoundingClientRect();return t<n.top-40||t>n.bottom+10?0:e<n.left+Oo?-Math.min(1,(n.left+Oo-e)/Oo)*16:e>n.right-Oo?Math.min(1,(e-(n.right-Oo))/Oo)*16:0}function Tn(e,t){let n=e,s=0;const o=()=>{const r=Jt?0:KT(n.clientX,n.clientY);if(r){const l=ae;ct(ae+r),ae!==l&&t.onMove(n)}s=requestAnimationFrame(o)};t.edgeScroll!==!1&&(s=requestAnimationFrame(o));const i=r=>{r.pointerId===e.pointerId&&(r.preventDefault(),n=r,Jt||t.onMove(r))},a=r=>{r.pointerId===e.pointerId&&(cancelAnimationFrame(s),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",a),t.onUp(r))};window.addEventListener("pointermove",i,{passive:!1}),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a)}function XT(e){return new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,pointerId:e.pointerId,pointerType:e.pointerType,button:e.button,buttons:e.buttons,isPrimary:e.isPrimary})}function JT(e,t){const n=t.target,s=n&&n.closest?n.closest("img.artimg"):null,o=E.get(),i=!!o.rooms[o.currentRoom]?.items.find(a=>a.id===e.dataset.id)?.art;if(s&&!i&&!sh(s,t.clientX,t.clientY)){const a=LL(t.clientX,t.clientY),r=a?.closest(".item"),l=a?.closest(".char");r&&r!==e?(t.stopPropagation(),df(r,t)):l&&(t.stopPropagation(),l.dispatchEvent(XT(t)));return}df(e,t)}function eP(e,t){if(t.preventDefault(),t.stopPropagation(),Jt)return;const n=e.dataset.id,s=t.clientX,o=t.clientY;Tn(t,{edgeScroll:!1,onMove(){},onUp(i){Math.hypot(i.clientX-s,i.clientY-o)>6||FP(e,n)}})}function df(e,t,n=!1){if(t.preventDefault(),t.stopPropagation(),Jt)return;if(Pe.isPlay()){eP(e,t);return}if(!pt()){ts(e);return}const s=E.get(),o=s.currentRoom,i=e.dataset.id,a=s.rooms[o].items.find(u=>u.id===i);if(!a)return;const r=le[a.kind],l=Ne(t.clientX,t.clientY),c={x:a.x-l.x,y:Ws(r,a.y)-l.y};let d=n,f=null;qe=i,E.dispatch({type:"item/front",room:o,id:i}),e.classList.add("lifted"),C.pick(),Tn(t,{onMove(u){const p=Ne(u.clientX,u.clientY);Math.hypot(p.x-l.x,p.y-l.y)>6&&(d=!0),d&&(ne.classList.add("hidden"),Cr.classList.add("show")),Cr.classList.toggle("hot",r0(u.clientX,u.clientY));const m=r.w*Fe(a)/2;E.dispatch({type:"item/move",room:o,id:i,x:Math.max(m*.6,Math.min(pe-m*.6,p.x+c.x)),y:ef(r,p.y+c.y),...d?{stand:!0}:{}}),d&&ne.classList.add("hidden"),f=d&&r.holdable?d2(p):null,gl(f)},onUp(u){if(e.classList.remove("lifted"),Cr.classList.remove("show","hot"),gl(null),d&&r0(u.clientX,u.clientY)){qe=null,E.dispatch({type:"item/delete",room:o,id:i}),Th(u.clientX,u.clientY);return}if(d&&f){I2(f,i);return}d?(v2(o,i),C.drop(),Ke(e)):(C.click(),ny(i),k9(e)),Ct(E.get())}})}function tP(e,t,n){const s=e.dataset.cid,o=t.dataset.hand,i=E.get().characters.find(r=>r.id===s),a=i?.held[o];!i||!a||!Et(a.kind)||(t.classList.add("lifted"),Tn(n,{edgeScroll:!1,onMove(r){const l=document.elementFromPoint(r.clientX,r.clientY)?.closest(".char[data-cid], .avatar"),c=l&&(l.dataset.cid&&l.dataset.cid!==s?l.dataset.cid:l.dataset.pid);Y.querySelectorAll(".char, .avatar").forEach(d=>d.classList.toggle("hold-target",!!(c&&(d.getAttribute("data-cid")===c||d.getAttribute("data-pid")===c))))},onUp(r){t.classList.remove("lifted"),Y.querySelectorAll(".char, .avatar").forEach(m=>m.classList.remove("hold-target"));const l=document.elementFromPoint(r.clientX,r.clientY)?.closest(".char[data-cid], .avatar"),c=l?.dataset.cid||l?.dataset.pid||"";if(!c||c===s)return;const d=[];if(v){d.push(v.pid);for(const m of v.presence.keys())d.push(m)}const f=Sd({state:E.get(),fromId:s,toId:c,playerIds:d});if(!f.ok){Ke(e);return}for(const m of Td(f))E.dispatch(m);const u=Pd(E.get(),f);u&&E.dispatch(u);const p=It.get(f.toId);Ke(p),gi(p),C.sparkle()}}))}function nP(e,t,n){if(n.preventDefault(),n.stopPropagation(),Jt||Pe.isPlay())return;const s=e.dataset.cid,o=t.dataset.hand,i=E.get().characters.find(d=>d.id===s),a=i?.held[o];if(!i||!a)return;const r=t.getBoundingClientRect(),l=Ne(r.left+r.width/2,r.bottom);E.dispatch({type:"char/release",id:s,hand:o,x:l.x,y:l.y});const c=Y.querySelector(`.item[data-id="${a.id}"]`);c&&df(c,n,!0)}function sP(e){e.addEventListener("pointerdown",t=>{const n=t.target.closest(".held"),s=n?.querySelector("img.artimg"),o=!!s&&!sh(s,t.clientX,t.clientY);if(n&&!o){if(Pe.isPlay())return t.preventDefault(),t.stopPropagation(),tP(e,n,t);if(!pt()){t.stopPropagation(),ts(e);return}return nP(e,n,t)}if(t.preventDefault(),t.stopPropagation(),Jt||Pe.isPlay()&&!vh())return;if(!pt()){ts(e);return}qe=null,Ct(E.get());const i=e.dataset.cid;De=i;const a=E.get(),r=a.characters.find(p=>p.id===i);if(!r)return;const l=Ne(t.clientX,t.clientY),c=wt(a.currentRoom,ut(r),r),d={x:c.x-l.x,y:c.y-l.y};let f=c.x,u=!1;e.classList.add("lifted"),C.pick(),cn(E.get()),_a=!0,Tn(t,{onMove(p){const m=Ne(p.clientX,p.clientY),k=m.x+d.x;if(Math.hypot(m.x-l.x,m.y-l.y)>6&&(u=!0),!u)return;const w=E.get().characters.find(g=>g.id===i);if(!w)return;if(Math.abs(k-f)>3){const g=k<f;g!==w.flip&&E.dispatch({type:"char/update",id:i,patch:{flip:g}}),f=k}const b=Math.max(_o+40,m.y+d.y);oa(i,a.currentRoom,k,b,null),Pe.isPlay()&&(va=cl(p.clientX,p.clientY)?.id??null),document.querySelectorAll(".tab").forEach(g=>g.classList.remove("drop")),document.elementFromPoint(p.clientX,p.clientY)?.closest(".tab:not(.on)")?.classList.add("drop")},onUp(p){_a=!1,va=null,e.classList.remove("lifted"),document.querySelectorAll(".tab").forEach(y=>y.classList.remove("drop"));const m=document.elementFromPoint(p.clientX,p.clientY)?.closest("[data-room]"),k=E.get().characters.find(y=>y.id===i);if(!u||!k){C.click();return}if(m&&m.dataset.room!==a.currentRoom){const y=m.getBoundingClientRect();Sh(y.left+y.width/2,y.top+y.height/2,9),C.swish(),oa(i,m.dataset.room,k.x,k.y,null);return}const w=Ne(p.clientX,p.clientY),b=w.x+d.x,g=Math.max(_o+40,w.y+d.y);if(Pe.isPlay()){const y=c2(p.clientX,p.clientY)??cl(p.clientX,p.clientY);_h(i,b,g,y)}else oa(i,a.currentRoom,b,g,null);C.drop(),Ke(e),requestAnimationFrame(()=>es(!0))}})})}function oP(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Pe.isPlay()){n.stopPropagation();return}if(!pt()){ts(e);return}const s=document.createElement("div");s.className="ghost",s.innerHTML=Nt(t),document.body.appendChild(s);const o=Math.max(1,60/(Math.max(t.w,Je(t))*dt())),i=t.w*dt()*o,a=Je(t)*dt()*o;s.style.width=i+"px",s.style.height=a+"px";let r=null;const l=f=>{s.style.left=f.clientX-i/2+"px",s.style.top=f.clientY-a*.8+"px",r=t.holdable&&nf(f.clientX,f.clientY)?d2(Ne(f.clientX,f.clientY)):null,gl(r)};l(n),C.pick(),e.classList.add("pressed");const c=n.clientX,d=n.clientY;Tn(n,{onMove:l,onUp(f){s.remove(),e.classList.remove("pressed"),gl(null);const u=E.get().currentRoom,p=Math.hypot(f.clientX-c,f.clientY-d)<8;let m,k;if(p)m=ae+380+Math.random()*240,k=t.wall?Math.min(Ha,200+Je(t)/2):ef(t,500+Math.random()*40);else if(nf(f.clientX,f.clientY)){const g=Ne(f.clientX,f.clientY);m=g.x,k=ef(t,g.y+Je(t)*.2)}else return;const w={id:rl(t.kind.replace(/[^a-z0-9-]/gi,"")),kind:t.kind,x:m,y:k,flip:!1,z:0,scale:1};if(u!=="backyard"&&E.get().rooms[u].items.length===0){const g=eE(y=>rl(y),u);for(let y=0;y<g.length;y++)E.dispatch({type:"item/add",room:u,item:g[y]})}if(E.dispatch({type:"item/add",room:u,item:w}),!p&&r){I2(r,w.id);return}qe=w.id,Ct(E.get());const b=Y.querySelector(`.item[data-id="${w.id}"]`);Ke(b),gi(b),C.sparkle()}})})}function iP(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Pe.isPlay())return;if(!pt()){ts(e);return}const s=E.get().characters.find(u=>u.id===t);if(!s)return;const o=pi(s),i=Xt*o*dt(),a=Ot*o*dt(),r=document.createElement("div");r.className="ghost",r.innerHTML=St(s),r.style.width=i+"px",r.style.height=a+"px",document.body.appendChild(r);const l=u=>{r.style.left=u.clientX-i/2+"px",r.style.top=u.clientY-a*.85+"px"},c=n.clientX,d=n.clientY;let f=!1;r.style.visibility="hidden",Tn(n,{onMove(u){Math.hypot(u.clientX-c,u.clientY-d)>8&&(f=!0,r.style.visibility=""),l(u)},onUp(u){if(r.remove(),!f){C.click(),De=t,ii("dress");return}if(!nf(u.clientX,u.clientY))return;const p=Ne(u.clientX,u.clientY),m=E.get().currentRoom;E.dispatch({type:"char/move",id:t,room:m,x:p.x,y:Math.max(_o+40,p.y+Ot*o*.15)}),De=t,cn(E.get());const k=It.get(t);Ke(k),gi(k),C.sparkle()}})})}function O2(){if(!pt())return ts(null),null;const e=E.get();if(e.characters.length>=ci)return null;const t=rl("c"),n=Bl();E.dispatch({type:"char/add",char:Ss({id:t,...Il(n),look2:n,room:e.currentRoom,x:ae+300+Math.random()*400,y:520+Math.random()*40})}),De=t,cn(E.get());const s=It.get(t);return Ke(s),gi(s),C.sparkle(),t}function aP(){return yh==="all"?"all":E.get().currentRoom}function Ft(){const e=E.get().currentRoom,t=aP(),n=ph.find(l=>l.id===e)?.name??"This room",s=t==="all";L("roomFilter").innerHTML=`<button class="rf ${s?"on":""}" data-rf="${s?"room":"all"}">${s?"Just "+n:"All rooms"}</button>`;const o=Fc("secrets").length>0,i=Rs.filter(l=>l.id!=="secrets"&&(l.kind==="people"||l.kind==="pack"&&e!=="backyard"||Fc(l.id).length));!(Wt==="secrets"&&o)&&!i.some(l=>l.id===Wt)&&(Wt=i[1]?.id??"__people"),L("cats").innerHTML=i.map(l=>`<button class="cat ${l.kind} ${l.id===Wt?"on":""}" data-cat="${l.id}" aria-label="${l.name}" title="${l.name}">${l.kind==="people"?nT:l.kind==="pack"?`<span class="packicon">${Nt(le[l.icon])}</span><span class="packname">${l.name}</span>`:Nt(le[l.icon])}</button>`).join("")+(o?`<button class="cat secretTab ${Wt==="secrets"?"on":""}" data-cat="secrets" aria-label="Secrets" title="Secrets">${R2()}</button>`:"");const a=L("shelf");if(ul.length=0,a.innerHTML="",!pt()){a.innerHTML='<div class="empty locked">🔒 This house is look-only right now</div>';return}if(Wt==="__people"){const l=E.get(),c=vs();if(c){const d=document.createElement("button");d.className="thing person me",d.setAttribute("aria-label","Me"),d.innerHTML=`<div class="face">${St(c)}</div><span class="meStar">★</span>`,d.addEventListener("click",()=>{C.click(),De=bt,ii("dress")}),a.appendChild(d)}for(const d of l.characters){const f=document.createElement("button");f.className="thing person",f.setAttribute("aria-label","Character"),f.innerHTML=`<div class="face">${St(d)}</div><span class="where" style="background:${G1(d.room)}"></span>`,a.appendChild(f),iP(f,d.id)}if(l.characters.length<ci){const d=document.createElement("button");d.className="thing add",d.setAttribute("aria-label","New character"),d.innerHTML=Y1,d.addEventListener("click",()=>{O2()&&(Ft(),ii("dress"))}),a.appendChild(d)}return}const r=Fc(Wt);r.length||(a.innerHTML='<div class="empty">Nothing here yet!</div>');for(const l of r){const c=document.createElement("button");c.className="thing",c.setAttribute("aria-label",l.name),c.dataset.kind=l.kind;const d=Xn()&&Jn(l.kind)?FT(l.kind):void 0;if(d)for(let f=0;f<d.length;f++)c.appendChild(d[f]);else c.innerHTML=_M(l,Yh(l.kind));a.appendChild(c),oP(c,l)}a.scrollLeft=0,Ah(),GT(),P2()}function Ah(){const e=document.querySelector(".drawerTop"),t=document.getElementById("drawerBar");!e||!t||(t.classList.toggle("more",e.scrollWidth-e.clientWidth-e.scrollLeft>6),t.classList.toggle("back",e.scrollLeft>6))}document.querySelector(".drawerTop").addEventListener("scroll",Ah,{passive:!0});window.addEventListener("resize",Ah);PT();function rP(){const e=document.querySelector(".drawerTop");if(!e||e.dataset.packPan)return;e.dataset.packPan="1";let t=0,n=0,s=!1,o=-1;e.addEventListener("pointerdown",a=>{a.pointerType==="mouse"&&a.button!==0||(o=a.pointerId,t=a.clientX,n=e.scrollLeft,s=!1)}),e.addEventListener("pointermove",a=>{a.pointerId===o&&(Math.abs(a.clientX-t)>8||Math.abs(e.scrollLeft-n)>2)&&(s=!0)});const i=a=>{a.pointerId===o&&(o=-1,s||(e.scrollLeft=n))};e.addEventListener("pointerup",i),e.addEventListener("pointercancel",i),e.addEventListener("click",a=>{s&&(a.preventDefault(),a.stopPropagation()),s=!1},!0)}rP();function u0(e,t,n){return`<div class="sw">${e.map(s=>`<button class="dot ${s===t?"on":""}" style="background:${s}" data-act="${n}" data-v="${s}"></button>`).join("")}</div>`}let xa=null,zo=!1;function D2(e){if(e===bt){const n=vs();if(!n||n.look2)return;On(bt,da(ca(n)));return}const t=E.get().characters.find(n=>n.id===e);!t||t.look2||On(e,{...da(ca(t)),size:t.size})}function bn(){const e=E.get(),t=L("card");if(xa==="paint"){t.classList.remove("avCard");const n=e.rooms[e.currentRoom],s=Ad.filter(a=>a.kind==="wallpaper"),o=Ad.filter(a=>a.kind==="floor"),i=(a,r,l,c)=>`<button class="dot pat tile ${a.id===r?"on":""}" data-act="${l}" data-v="${a.id}" title="${a.name} (${Wg(a.pack)})" style="background-color:${c};background-image:${sf(a.url)};background-size:48px auto"></button>`;t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${u0(eT,n.wallpaper,"wall")}
      <h3>Wallpaper</h3><div class="sw">${f2.map((a,r)=>`<button class="dot pat ${!n.wallTile&&r===n.pattern?"on":""}" data-act="pat" data-v="${r}" style="background-color:${n.wallpaper};background-image:${a};background-size:${r===1?"16px 16px":r===3?"20px 20px":"auto"}"></button>`).join("")}${s.map(a=>i(a,n.wallTile,"wtile",n.wallpaper)).join("")}</div>
      <h3>Floor</h3>${u0(tT,n.floor,"floor")}
      ${o.length?`<h3>Floor style</h3><div class="sw"><button class="dot pat ${n.floorTile?"":"on"}" data-act="ftile" data-v="" style="background-color:${n.floor};background-image:${h2}"></button>${o.map(a=>i(a,n.floorTile,"ftile",n.floor)).join("")}</div>`:""}`}else if(xa==="dress"){t.classList.add("avCard");let n=e,s=vs(),o=s?Ss({id:bt,...s}):null,i=De===bt&&o?o:n.characters.find(r=>r.id===De)??o??n.characters[0];i&&!i.look2&&D2(i.id),n=E.get(),s=vs(),o=s?Ss({id:bt,...s}):null,i=De===bt&&o?o:n.characters.find(r=>r.id===De)??o??n.characters[0];const a=`<div class="picker">${o?`<button class="pk me ${i?.id===bt?"on":""}" data-act="pickc" data-v="${bt}"><div class="face">${St(o)}</div><span class="meStar">★</span></button>`:""}${n.characters.map(r=>`<button class="pk ${r.id===i?.id?"on":""}" data-act="pickc" data-v="${r.id}"><div class="face">${St(r)}</div><span class="where" style="background:${G1(r.room)}"></span></button>`).join("")}${n.characters.length<ci?`<button class="pk add" data-act="newc">${Y1}</button>`:""}</div>`;if(!i){t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${a}<div class="dress"><p class="hint">Tap + to make someone new!</p></div>`;return}De=i.id,t.innerHTML=$7(i,a,zo,Zt.trash)}}function ii(e){xa=e,zo=!1,bn(),L("sheet").classList.remove("hidden"),C.swish()}L("sheet").addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(e.target===L("sheet")||t?.dataset.act==="close"){L("sheet").classList.add("hidden"),xa=null,C.click(),Wt==="__people"&&Ft();return}if(!t)return;const n=E.get(),s=n.currentRoom,o=t.dataset.v,i=De??"",a=t.dataset.act;if(a!=="delc"&&(zo=!1),a&&a.indexOf("av-")===0){const r=i===bt?vs():E.get().characters.find(d=>d.id===i);if(a==="av-costume"){r&&!r.look2&&D2(i);const d=i===bt?vs():E.get().characters.find(f=>f.id===i);On(i,{costume:So(o)??null,...d?.look2?{look2:d.look2}:{},size:d?.size??"kid"}),C.sparkle(),bn(),Ke(document.querySelector(".avStage"));return}if(a==="av-surprise"){On(i,{...da(Bl()),size:r?.size??"kid"}),C.sparkle(),bn(),Ke(document.querySelector(".avStage"));return}const l=r?.look2??ca(r??{}),c=x7(l,a,o??"");if(!c){C.click(),bn();return}On(i,{...da(c),size:r?.size??"kid"}),C.sparkle(),bn(),Ke(document.querySelector(".avStage"));return}switch(a){case"wall":E.dispatch({type:"room/wallpaper",room:s,color:o});break;case"floor":E.dispatch({type:"room/floor",room:s,color:o});break;case"pat":E.dispatch({type:"room/pattern",room:s,pattern:+o});break;case"wtile":E.dispatch({type:"room/wallTile",room:s,tile:o});break;case"ftile":E.dispatch({type:"room/floorTile",room:s,tile:o||null});break;case"skin":case"hair":case"shirt":case"pants":On(i,{[a]:o});break;case"hs":On(i,{hairStyle:+o});break;case"acc":On(i,{acc:+o});break;case"size":{const r=i===bt?vs():E.get().characters.find(l=>l.id===i);On(i,{size:o,...r?.look2?{look2:r.look2}:{}}),cn(E.get());break}case"pickc":De=o,cn(E.get()),C.click(),bn();return;case"newc":if(!O2())return;break;case"delc":if(i===bt||!pt())return;if(!zo){zo=!0,C.click(),bn();return}zo=!1;{const l=It.get(i)?.getBoundingClientRect();E.dispatch({type:"char/delete",id:i}),l?Th(l.left+l.width/2,l.top+l.height/2):C.pop()}De=E.get().characters[0]?.id??null,bn();return}C.sparkle(),bn(),Ke(document.querySelector(".preview"))});L("tabs").addEventListener("click",e=>{const t=e.target.closest("[data-room]");if(!t)return;const n=t.dataset.room;n!==E.get().currentRoom&&(qe=null,C.swish(),G.classList.remove("swap"),G.offsetWidth,G.classList.add("swap"),E.dispatch({type:"room/switch",room:n}))});L("cats").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");t&&(Wt=t.dataset.cat,C.click(),Ft())});L("roomFilter").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");if(t){Wt=t.dataset.cat,C.click(),Ft();return}const n=e.target.closest("[data-rf]");n&&(yh=n.dataset.rf==="all"?"all":"",C.click(),Ft())});ne.addEventListener("pointerdown",e=>e.stopPropagation());ne.addEventListener("click",e=>{const t=e.target.closest("[data-a]");if(!t||!qe)return;if(!pt()){ts(null);return}const n=E.get().currentRoom,s=qe,o=Y.querySelector(`.item[data-id="${s}"]`);switch(t.dataset.a){case"smaller":case"bigger":{const i=E.get().rooms[n].items.find(l=>l.id===s);if(!i)break;const a=qn.indexOf(Kn(i.size)),r=t.dataset.a==="smaller"?a-1:a+1;if(r<0||r>=qn.length)break;E.dispatch({type:"item/size",room:n,id:s,size:qn[r]}),C.click(),Ke(o);break}case"flip":E.dispatch({type:"item/flip",room:n,id:s}),C.swish(),Ke(o);break;case"front":E.dispatch({type:"item/front",room:n,id:s}),C.click(),Ke(o);break;case"back":E.dispatch({type:"item/back",room:n,id:s}),C.click(),Ke(o);break;case"delete":{const i=o?.getBoundingClientRect();qe=null,E.dispatch({type:"item/delete",room:n,id:s}),i&&Th(i.left+i.width/2,i.top+i.height/2);break}}});G.addEventListener("pointerdown",e=>{if(e.target.closest(".nudge"))return;ec();const t=e.clientX,n=ae;let s=!1,o=0,i=e.clientX,a=performance.now();Tn(e,{edgeScroll:!1,onMove(r){if(Math.abs(r.clientX-t)>6&&(s=!0),!s)return;const l=performance.now();o=(r.clientX-i)/Math.max(1,l-a),i=r.clientX,a=l,Vs(),ct(n-(r.clientX-t)/dt())},onUp(){if(!s){qe&&(qe=null,Ct(E.get()));return}if(Jt)return;let r=-o*16/dt();const l=()=>{Math.abs(r)<.3||(ct(ae+r),r*=.92,jo=requestAnimationFrame(l))};jo=requestAnimationFrame(l)}})});G.addEventListener("wheel",e=>{e.preventDefault(),ec(),Vs(),ct(ae+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/dt())},{passive:!1});L("nudgeL").addEventListener("pointerdown",e=>{e.stopPropagation(),C.swish(),Vs(),tc((ka??ae)-K*.6)});L("nudgeR").addEventListener("pointerdown",e=>{e.stopPropagation(),C.swish(),Vs(),tc((ka??ae)+K*.6)});const p0=L("minimap");p0.addEventListener("pointerdown",e=>{e.stopPropagation(),e.preventDefault();const t=n=>{Vs();const s=p0.getBoundingClientRect();tc((n.clientX-s.left)/s.width*pe-K/2)};t(e),C.click(),Tn(e,{edgeScroll:!1,onMove:t,onUp(){}})});L("btnPaint").addEventListener("click",()=>{if(!pt())return ts(null);ii("paint")});L("btnDress").addEventListener("click",()=>ii("dress"));L("btnSound").addEventListener("click",()=>{E.dispatch({type:"settings/sound",on:!E.get().soundOn}),C.click()});document.addEventListener("gesturestart",e=>e.preventDefault());document.addEventListener("contextmenu",e=>e.preventDefault());const Rh=new Set;document.addEventListener("pointerdown",e=>{Rh.add(e.pointerId)},!0);for(const e of["pointerup","pointercancel"])document.addEventListener(e,t=>{Rh.delete(t.pointerId)},!0);Cy({base:"/kids-house-game/",safeNow:()=>Rh.size===0});window.__store=E;window.__shelfCache=()=>Un.size;B9({get:()=>E.get(),dispatch:e=>E.dispatch(e),subscribe:e=>E.subscribe(e),canDrift:()=>A==="house"&&vh(),speaks:()=>!v||Ae===te||v.speaksNeeds,layer:Y,menuAfter:L("btnSound"),afterPaint:()=>{Qa(),za()}});window.__items=Object.fromEntries(Sn.filter(e=>e.img).map(e=>[e.kind,{w:e.w,h:Je(e),cat:e.cat,holdable:e.holdable,svg:e.img.includes(".svg")}]));window.__cam={get:()=>ae,set:ct};window.__yieldNudges=Qa;window.__myPres=()=>ye();window.__playDropPolish=zl;window.__takenSeats=xo;window.__applyPlayDrop=(e,t,n,s)=>{const o=E.get(),i=s?o.rooms[o.currentRoom].items.find(a=>a.id===s)??null:null;_h(e,t,n,i)};window.__applyAvatarPlayDrop=(e,t,n)=>{const s=E.get(),o=n?s.rooms[s.currentRoom].items.find(i=>i.id===n)??null:null;$h(e,t,o),kt()};window.__phoneShowKids=()=>ft();window.__avatar={richAvatars:tl,randomLook2:Bl,look2FromLegacy:ca,legacyFromLook2:Il,sanitizeLook2:Ea,handsFor:Gl};window.__frameHouseKid=()=>es(!0);window.__layoutNameTags=()=>d1();window.__lie={bedArt:Hl,lieBedKinds:z0,lieOffset:Qr,lieSpot:jb,box(e){const t=le[e];return t?{w:t.w,h:Je(t)}:null}};window.__paint=()=>{kt()};const me=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function pt(){return!v||Ae===te||v.canEdit(ge)}function ts(e){C.pop();const t=L("houseTag");t.classList.add("show"),t.classList.remove("wiggle"),t.offsetWidth,t.classList.add("wiggle"),window.clearTimeout(yl),yl=window.setTimeout(()=>{A==="house"&&v&&!document.body.classList.contains("own-house")||t.classList.remove("show")},2e3),e&&(e.classList.remove("nope"),e.offsetWidth,e.classList.add("nope")),Z("🔒 Look-only house: ask the owner to unlock it!",1800)}const ye=()=>v?.myPresence()??null,vs=()=>v?v.players.get(v.pid)?.look??null:null;function On(e,t){if(e===bt){const n=vs();if(!n||!v)return;v.setLook(Pa({...n,...t})),kt(),A==="street"&&aa(),A==="park"&&Eo(),A==="ranch"&&Ls();return}E.dispatch({type:"char/update",id:e,patch:t})}function tt(e){v?.setPresence(e)}function Ch(e,t,n){const s=[];return v?.presence.forEach((o,i)=>{i!==v.pid&&o.where==="house"&&o.houseId===e&&o.room===t&&s.push(o)}),Dy(n,s,{minX:80,maxX:pe-80,minY:_o+60,maxY:Ie-20})}function lP(e){const t=ye();if(t&&t.where==="house"){const n=t.houseId?Ch(t.houseId,e,t):t;tt({...t,room:e,x:n.x,y:n.y})}}function H2(e){Ae=e,j1(e),qe=null,setTimeout(()=>Ly.update());for(const t of Object.keys(si))delete si[t];De=e===te?e.get().characters[0]?.id??null:bt,Lo(),Ft()}function Ih(e,t,n,s){return`<div class="inner">${St(e,n,s)}</div><div class="nametag">${me(t)}</div>`}let Jc=!1;function cP(){if(Jc||!v||A!=="house")return;const e=v,t=ye();if(!t||t.where!=="house"||t.houseId!==ge)return;const n=qt(e.pid,t);if(!n)return;let s=!1;if(e.presence.forEach((l,c)=>{if(c===e.pid||l.where!=="house"||l.houseId!==ge||l.room!==t.room)return;const d=qt(c,l);d&&d.item===n.item&&d.n===n.n&&(s=!0)}),!s)return;const o=t.room&&E.get().rooms[t.room]?t.room:E.get().currentRoom,i=E.get().rooms[o]?.items??[],a=i.find(l=>Jo(l.kind)&&Math.hypot(l.x-t.x,l.y-t.y)<420)??i.find(l=>Jo(l.kind))??i.find(l=>l.id===n.item)??null,r=[...xo(void 0,e.pid),{item:n.item,n:n.n}];Jc=!0;try{const l=zl({releaseX:t.x,releaseY:t.y,hit:a,items:i,occupied:r,held:[],seatPiece:u=>Va(u)});let c=l.seat&&!(l.seat.item===n.item&&l.seat.n===n.n)?{id:l.seat.item,pose:l.seat.pose,n:l.seat.n}:null,d=l.x,f=l.y;if(!c){const u=i.find(m=>m.id===n.item),p=uo(u?.x??t.x,hn(u?.kind??"chair")*(u?.scale||1),t.x);d=p.x,f=p.y}$a(t,d,f,t.flip,c),kt()}finally{Jc=!1}}function kt(){const e=new Set;if(v&&Ae!==te&&A==="house"){const n=E.get().currentRoom,s=[...v.presence.entries()],o=ye();o&&s.push([v.pid,o]);for(const[i,a]of s){const r=v.players.get(i);if(!r||a.where!=="house"||a.houseId!==ge||a.room!==n)continue;e.add(i);let l=fs.get(i);(!l||!l.isConnected)&&(l=document.createElement("div"),l.className="char avatar "+(i===v.pid?"mine":"other"),l.dataset.pid=i,Y.appendChild(l),fs.set(i,l),i===v.pid?dP(l):l.addEventListener("pointerdown",b=>{b.preventDefault(),b.stopPropagation()}));const c=r.look,d=qt(i,a),f=d?.pose??null,u=ia(E.get())===i,p=JSON.stringify(c)+r.nickname+(f||"")+(u?"h":"");if(l.dataset.look!==p){const b=l.querySelector(".bubble");l.innerHTML=Ih(c,r.nickname,f,u),b&&l.appendChild(b),l.dataset.look=p}l.classList.toggle("holding",u);const m=As[c.size]??1,k=wt(n,d,a),w=d&&E.get().rooms[n].items.find(b=>b.id===d.item);if(l.classList.toggle("flipped",a.flip),l.classList.toggle("pose-sit",f==="sit"),l.classList.toggle("pose-lie",f==="lie"),l.classList.toggle("pose-lie-r",f==="lie"&&!!w?.flip),zs(l,k.x,k.y,Xt*m,Ot*m),f&&(hl(l,k,Xt*m,Ot*m),g2(l)),l.style.zIndex=String(w?1e3+w.z+1+d.n:5e3+Math.round(a.y)),Ba(l,c,i===v.pid),u){const b=Km(c,f);b?L2("avatar",i,l,b,k.y):M2("avatar",i)}}}const t=ia(E.get());v&&A==="house"&&t&&e.has(t)||x2("avatar");for(const[n,s]of fs)(!e.has(n)||!s.isConnected)&&(e.has(n)||s.remove(),fs.delete(n));oc(),To(),ic(),$s(),cP(),Qa(),za(),Ua()}function dP(e){e.addEventListener("pointerdown",t=>{if(t.preventDefault(),t.stopPropagation(),Jt||!v)return;const n=ye();if(!n||n.where!=="house")return;const s=Ne(t.clientX,t.clientY),o=wt(E.get().currentRoom,qt(v.pid,n),n),i={x:o.x-s.x,y:o.y-s.y};let a=o.x,r=!1;e.classList.add("lifted"),C.pick(),_a=!0,Tn(t,{onMove(l){const c=Ne(l.clientX,l.clientY),d=ye();if(!d||d.where!=="house"||(Math.hypot(c.x-s.x,c.y-s.y)>6&&(r=!0),!r))return;const f=Math.max(40,Math.min(pe-40,c.x+i.x)),u=Math.max(_o+40,Math.min(Ie,c.y+i.y)),p=Math.abs(f-a)>3?f<a:d.flip;Math.abs(f-a)>3&&(a=f),$a(d,f,u,p,null),kt(),fl(E.get()),Pe.isPlay()&&(va=cl(l.clientX,l.clientY)?.id??null)},onUp(l){_a=!1,va=null,e.classList.remove("lifted");const c=ye();if(!r||!c||c.where!=="house"){C.click();return}const d=Ne(l.clientX,l.clientY),f=Math.max(40,Math.min(pe-40,d.x+i.x)),u=Math.max(_o+40,Math.min(Ie,d.y+i.y));if(Pe.isPlay()){const p=c2(l.clientX,l.clientY)??cl(l.clientX,l.clientY);$h(f,u,p)}else $a(c,f,u,c.flip,null);kt(),fl(E.get()),C.drop(),Ke(e),requestAnimationFrame(()=>es(!0))}})})}function fP(e){return e.kind==="text"?e.v:(e.kind==="phrase"?ji:fg)[e.v]??""}function za(){const e=document.body.classList.contains("phone")?".bubble":".bubble, .nametag, .need-bubble.show",t=document.querySelectorAll(e),n=G.getBoundingClientRect();if(!n.width)return;const s=dt()||1,o=4;t.forEach(i=>{i.style.marginLeft="0px",i.style.marginTop="0px";const a=i.getBoundingClientRect();if(!a.width||!a.height)return;let r=0,l=0;a.width>=n.width-o*2||a.left<n.left+o?r=n.left+o-a.left:a.right>n.right-o&&(r=n.right-o-a.right),a.top<n.top+o?l=n.top+o-a.top:a.bottom>n.bottom-o&&(l=n.bottom-o-a.bottom),r&&(i.style.marginLeft=r/s+"px"),l&&(i.style.marginTop=l/s+"px")})}const mi=za,hP=230,uP=88;function mr(){if(document.body.classList.contains("phone")){L("nudgeL")?.classList.remove("yield"),L("nudgeR")?.classList.remove("yield");return}const e=dt()||1,t=L("layer")||Y;for(const n of["nudgeL","nudgeR"]){const s=L(n);if(!s||s.classList.contains("off")||s.offsetParent===null){s?.classList.remove("yield");continue}const o=s.getBoundingClientRect(),i=s.classList.contains("yield")?(hP-uP)*e:0,a=o.top+i,r=o.bottom+i;let l=!1;for(const c of t.querySelectorAll(".char .inner, .need-bubble.show")){const d=c.getBoundingClientRect();if(!(d.width<2||d.height<2)&&d.left<o.right-2&&d.right>o.left+2&&d.top<r-2&&d.bottom>a+2){l=!0;break}}s.classList.toggle("yield",l)}}function Qa(){mr(),requestAnimationFrame(()=>{mr(),requestAnimationFrame(mr)}),window.setTimeout(mr,50)}function pP(e,t){const n=A==="street"?document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`):A==="park"?document.querySelector(`#pavatars .savatar[data-pid="${e}"]`):A==="ranch"?document.querySelector(`#ravatars .savatar[data-pid="${e}"]`):A==="gameroom"?document.querySelector(`#gavatars .savatar[data-pid="${e}"]`):fs.get(e),s=n?[n]:[];for(const o of s){o.querySelector(".bubble")?.remove();const i=document.createElement("div");i.className="bubble"+(t.kind==="emote"?" emote":""),i.textContent=fP(t),o.appendChild(i),mi(),setTimeout(()=>i.classList.add("out"),4600),setTimeout(()=>i.remove(),5e3)}e!==v?.pid&&C.click()}function ac(){const e=ye();if(!v||!e)return 0;let t=0;return v.presence.forEach(n=>{iv(e,n)&&t++}),t}function To(){const e=ac();L("btnChat").classList.toggle("glow",e>0),rc();const t=document.getElementById("chatNear");t&&(t.textContent=e?`${e} friend${e>1?"s":""} nearby can hear you`:"Walk closer to a friend to talk!",L("chatTray").classList.toggle("nobody",!e))}function W2(){const e=L("chatTray");if(!v)return;const t=document.body.classList.contains("phone"),n=`<div class="phrases">${ji.map((a,r)=>`<button data-phrase="${r}">${me(a)}</button>`).join("")}</div>`,s=v.settings.freeChat?`<form class="typed" id="chatForm"><input id="chatInput" maxlength="${Qf}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>`:'<div class="presetsOnly">Picking from the bubbles above 💬</div>',o=t?'<button type="button" class="chatMore" data-chat="more">more</button>':"";e.innerHTML=`<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${fg.map((a,r)=>`<button data-emote="${r}">${a}</button>`).join("")}</div>
    ${o}
    <div class="chatExtra${t?" hidden":""}">${n}${s}</div>`,To(),document.getElementById("chatForm")?.addEventListener("submit",a=>{a.preventDefault();const r=L("chatInput"),l=jk(r.value);if(!l.ok){L("chatWarn").textContent=Wl[l.reason]??"",C.pop();return}if(!ac()){Z("Walk closer to a friend to talk!");return}v.say({kind:"text",v:l.text}),r.value="",L("chatWarn").textContent="",r.blur()})}L("chatTray").addEventListener("click",e=>{const t=e.target;if(!v)return;if(t.closest('[data-chat="close"]')){L("chatTray").classList.add("hidden");return}const n=t.closest('[data-chat="more"]');if(n){const i=L("chatTray").querySelector(".chatExtra");i?.classList.toggle("hidden"),n.textContent=i&&!i.classList.contains("hidden")?"less":"more";return}const s=t.closest("[data-emote]"),o=t.closest("[data-phrase]");if(!(!s&&!o)){if(!ac()){Z("Walk closer to a friend to talk!");return}v.say(s?{kind:"emote",v:+s.dataset.emote}:{kind:"phrase",v:+o.dataset.phrase}),C.click()}});L("btnChat").addEventListener("click",()=>{L("chatTray").classList.toggle("hidden")||(W2(),C.swish())});function Ln(){const e=document.body.classList,n=!!v&&Ae!==te&&A==="house"?v.houses.get(ge):void 0,s=!!n&&n.meta.ownerId===v.pid;if(e.toggle("mode-hood",!!v),e.toggle("view-street",A!=="house"),e.toggle("view-park",A==="park"),e.toggle("view-ranch",A==="ranch"),e.toggle("view-map",A==="street"),e.toggle("view-gameroom",A==="gameroom"),e.toggle("in-barn",A==="ranch"&&je),e.toggle("mode-play",A==="house"&&Pe.isPlay()),w2(),Gh(),F2(),e.toggle("own-house",s),e.toggle("locked",!!n&&!pt()),e.toggle("has-hood",!!Vl()),rc(),n){const o=v.players.get(n.meta.ownerId)?.nickname??"";L("houseTag").innerHTML=`${n.meta.locked?"🔒 ":""}<b>${me(n.meta.name)}</b>${s?" · yours":o?" · "+me(o):""}`;const i=L("lockIco");i&&(i.innerHTML=n.meta.locked?Vt.lockOn:Vt.lockOff);const a=n.meta.locked?"Unlock my house":"Lock my house";L("btnLock").setAttribute("aria-label",n.meta.locked?"Unlock my house":"Lock my house");const r=L("lockLabel");r&&(r.textContent=a)}To(),gP(),document.body.classList.contains("phone")&&J1()}let ed="",yl=0;function gP(){const e=L("houseTag"),t=!!v&&A==="house"&&!document.body.classList.contains("own-house");if(A!=="house"||!v){ed="",e.classList.remove("show");return}if(t){e.classList.add("show");return}const n=ge||"solo";ed!==n&&(ed=n,e.classList.add("show"),window.clearTimeout(yl),yl=window.setTimeout(()=>e.classList.remove("show"),2e3))}L("btnLock").addEventListener("click",()=>{const e=v?.houses.get(ge);!e||e.meta.ownerId!==v.pid||(v.lock(e.meta.id,!e.meta.locked),C.click(),Z(e.meta.locked?"Unlocked: friends can decorate!":"Locked: friends can look but not change things"))});const Tt=new Map;let g0="",ff=0,Ye={w:jn,h:Zn,portrait:!1};function mP(){return document.body.classList.contains("phone-portrait")?!0:document.body.classList.contains("phone")?!1:window.innerHeight>=window.innerWidth*1.25}function V2(){const e=L("street"),t=Ye.portrait&&!document.body.classList.contains("phone")?24:0,n=Math.max(1,e.clientWidth-t),s=Math.max(1,e.clientHeight-t);return Math.min(n/Ye.w,s/Ye.h)}function yP(e){const t=L("street"),n=L("mapWorld"),s=Ye.w*e,o=Ye.h*e;n.style.marginLeft=Math.max(0,Math.floor((t.clientWidth-s)/2))+"px",n.style.marginTop=Math.max(0,Math.floor((t.clientHeight-o)/2))+"px",t.scrollLeft=0,t.scrollTop=0,U2()}function U2(){const e=L("street"),t=L("mapWorld"),n=4,s=e.clientWidth-n,o=e.clientHeight-n,i=t.offsetLeft,a=t.offsetTop;t.querySelectorAll(".mapSign").forEach(r=>{r.style.transform="translateX(-50%)";const l=r.offsetWidth,c=r.offsetHeight,d=i+r.offsetLeft-l/2,f=a+r.offsetTop;let u=0,p=0;d<n&&(u=n-d),d+l+u>s&&(u-=d+l+u-s),f<n&&(p=n-f),f+c+p>o&&(p-=f+c+p-o),bP(r,u,p,i,a,n,s,o)})}function bP(e,t,n,s,o,i,a,r){const l=[...e.parentElement.querySelectorAll(".mapMail")],c=()=>{const f=e.offsetWidth,u=e.offsetHeight,p=s+e.offsetLeft-f/2+t,m=o+e.offsetTop+n;return{left:p,top:m,right:p+f,bottom:m+u,width:f,height:u}};for(let f=0;f<6;f++){const u=c(),p=l.find(_=>{const T=s+_.offsetLeft,x=o+_.offsetTop,$=T+_.offsetWidth,I=x+_.offsetHeight;return u.right>T+2&&u.left<$-2&&u.bottom>x+2&&u.top<I-2});if(!p)break;const m=s+p.offsetLeft,k=o+p.offsetTop,w=k+p.offsetHeight,b=c(),g=w+4-b.top,y=b.bottom-(k-4);b.top+g+b.height<=r?n+=g:b.top-y>=i?n-=y:t-=Math.min(b.right,m+p.offsetWidth)-Math.max(b.left,m)+6}const d=c();d.left<i&&(t+=i-d.left),d.right>a&&(t-=d.right-a),d.top<i&&(n+=i-d.top),d.bottom>r&&(n-=d.bottom-r),e.style.transform=Math.abs(t)>.5||Math.abs(n)>.5?`translate(calc(-50% + ${t.toFixed(1)}px), ${n.toFixed(1)}px)`:"translateX(-50%)"}document.fonts?.ready.then(()=>{A==="street"&&U2()});function wP(){return v?[...v.houses.values()].map(e=>e.meta).sort((e,t)=>e.slot-t.slot):[]}function kP(e){const s=Math.round(97.5),o=Math.max(1,Math.ceil(e/(e===1?1:2))),i=158,a=318,l=a+(o-1)*i+s/2+108,c=Math.max(1020,l+78),d=Math.max(l,Math.min(c-88,Math.round(c*.74))),f=e===1?[280]:[150,410],u=e===1?1:2,p=Array.from({length:e},(m,k)=>({x:f[k%u],y:a+Math.floor(k/u)*i}));return{w:560,h:c,hw:104,hh:s,houses:p,square:{x:280,y:d},park:{x:96,y:122},club:{x:280,y:116},ranch:{x:458,y:120}}}function m0(e,t,n,s){return!e||e.mine||!i1()?"":`<button class="mapKnock" data-knock="${e.id}" aria-label="Knock at ${me(e.name)} for a treat" style="left:${s(t)};top:${s(n)}"><span>🎃</span></button>`}const y0=new Map;function z2(){const e=L("street");let t=document.getElementById("candyBucket");if(!i1()){t?.remove();return}t||(t=document.createElement("div"),t.id="candyBucket",t.className="candyBucket",t.setAttribute("aria-live","polite"),e.appendChild(t));const n=o1(localStorage);t.innerHTML=`<span class="pail">🎃</span><b>${n}</b>`,t.setAttribute("aria-label",`${h1(n,"treat")} in your bucket`)}function vP(e){const{treat:t}=j7(localStorage);z2(),Ke(e),C.pop();const n=document.createElement("span");n.className="treatPop",n.textContent=t,e.appendChild(n),setTimeout(()=>n.remove(),900);const s=document.getElementById("candyBucket");s&&Ke(s),v&&v.knock(e.dataset.knock)}function ro(e=!1){if(A!=="street")return;const t=L("mapWorld"),n=wP(),s=v?n.map(u=>({id:u.id,name:u.name,style:u.style,locked:u.locked,mine:u.ownerId===v.pid,lit:!!v.players.get(u.ownerId)?.online})):ff?Array.from({length:ff},(u,p)=>({id:"fake"+p,name:["Reagan","Quinn","Chloe","Sloane","Cada","Emma","Olivia","Charlotte","Amelia","Sophia","Isabella","Mia"][p%12]+"'s House",style:p,locked:p===3,mine:p===0,lit:p%3!==1})):[null],o=mP()?kP(Math.max(1,s.length)):null;Ye=o?{w:o.w,h:o.h,portrait:!0}:{w:jn,h:Zn,portrait:!1},document.body.classList.toggle("map-tall",!!o&&!document.body.classList.contains("phone"));const i=V2(),a=(Ye.portrait?"P":"L")+Ye.w+"x"+Ye.h+":"+i.toFixed(3)+JSON.stringify(n)+(v?n.map(u=>(v.players.get(u.ownerId)?.online?1:0)+(td(u.id)?"u":"")).join("")+v.pid:"solo");if(!e&&a===g0&&t.querySelector("#mapFaces")){aa();return}g0=a,t.style.width=Ye.w*i+"px",t.style.height=Ye.h*i+"px",t.style.setProperty("--sc",String(i)),t.innerHTML=`<div class="mapClip">${o?Wy(o.w,o.h):Hy()}</div>`;const r=t.querySelector(".mapClip");ko(r,o?"map-portrait":"map");const l=u=>u*i+"px";Tt.clear();const c=s.length;let d="",f="";if(o){const{hw:u,hh:p}=o,m=34,k=40;s.forEach((y,_)=>{const T=o.houses[_]??o.houses[0],x=y?`house:${y.id}`:"home",$=y?y.name:"My House";Tt.set(y?"house:"+y.id:"home",{x:T.x,y:T.y-p/2-8});const I=!!(y&&td(y.id)),N=T.x<o.w/2,U=N?Math.max(4,T.x-u/2-m-8):Math.min(o.w-m-4,T.x+u/2+8),F=Math.max(4,Math.min(o.h-k-4,T.y-p*.42));d+=`<button class="mapSpot mapHouse ${y?.mine||!y?"mine":""}" data-go="${x}" aria-label="${me($)}" style="left:${l(T.x-u/2)};top:${l(T.y-p/2)};width:${l(u)};height:${l(p)}">${Yr(y?y.style:0,{lit:y?y.lit:!0})}${y?.locked?'<span class="lockBadge">🔒</span>':""}${y?.mine||!y?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${I?"up":""}" data-mail="${y?y.id:"home"}" aria-label="${me($)} mailbox" style="left:${l(U)};top:${l(F)};width:${l(m)};height:${l(k)}">${Cu(I)}</button>${m0(y,N?T.x+u/2-30:T.x-u/2-10,T.y+p*.12,l)}`,f+=`<div class="mapSign ${y?.mine||!y?"mine":""}" style="left:${l(T.x)};top:${l(T.y+p/2+2)}">${me($)}</div>`});const w=(y,_,T,x,$,I,N,U,F)=>{d+=`<button class="mapSpot ${y}" data-go="${_}" aria-label="${T}" style="left:${l($-N/2)};top:${l(I-U/2)};width:${l(N)};height:${l(U)}">${x}</button>`,f+=`<div class="mapSign place" style="left:${l($)};top:${l(I+F)}">${T==="The Park"?"Park":T==="Rainbow Ranch"?"Rainbow Ranch":"Clubhouse"}</div>`};w("mapPark","park","The Park",su,o.park.x,o.park.y,148,126,68),w("mapRanch","ranch","Rainbow Ranch",ou,o.ranch.x,o.ranch.y,156,128,72),w("mapClub","gameroom","The Clubhouse",iu,o.club.x,o.club.y,146,120,68),Tt.set("park",{x:o.park.x,y:o.park.y-78}),Tt.set("ranch",{x:o.ranch.x,y:o.ranch.y-80}),Tt.set("barn",{x:o.ranch.x,y:o.ranch.y+8}),Tt.set("gameroom",{x:o.club.x,y:o.club.y-74}),Tt.set("square",o.square);const b=[{x:o.park.x,y:o.park.y,r:90},{x:o.ranch.x,y:o.ranch.y,r:96},{x:o.club.x,y:o.club.y,r:88},{x:o.square.x,y:o.square.y,r:70},...o.houses.map(y=>({x:y.x,y:y.y,r:78}))],g=o.w/2;r.insertAdjacentHTML("beforeend",nu(b,(y,_)=>Math.abs(y-g)<34,o.w,o.h)+zy(o.w,o.h,b)+d+'<div class="mapFaces" id="mapFaces"></div>')}else{const u=t.querySelector("#mapRoad"),p=u.getTotalLength(),m=Array.from({length:160},(_,T)=>u.getPointAtLength(p*T/159)),k=(_,T)=>m.some(x=>Math.hypot(x.x-_,x.y-T)<50),w=hf(),b=c>8?80:94,g=b*300/320,y=Q2(u,c,w);s.forEach((_,T)=>{const x=y[T],$=_?`house:${_.id}`:"home",I=_?_.name:"My House";Tt.set(_?"house:"+_.id:"home",{x:x.x,y:x.y-g/2-4});const N=!!(_&&td(_.id)),U=34,F=40,oe=14/i,Ee=Math.max(4,Math.min(jn-U-4,x.x+b/2+oe)),ze=Math.max(4,Math.min(Zn-F-4,x.y-g*.22));d+=`<button class="mapSpot mapHouse ${_?.mine||!_?"mine":""}" data-go="${$}" aria-label="${me(I)}" style="left:${l(x.x-b/2)};top:${l(x.y-g/2)};width:${l(b)};height:${l(g)}">${Yr(_?_.style:0,{lit:_?_.lit:!0})}${_?.locked?'<span class="lockBadge">🔒</span>':""}${_?.mine||!_?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${N?"up":""}" data-mail="${_?_.id:"home"}" aria-label="${me(I)} mailbox" style="left:${l(Ee)};top:${l(ze)};width:${l(U)};height:${l(F)}">${Cu(N)}</button>${m0(_,Math.max(4,x.x-b/2-40/i),x.y-g*.05,l)}`,f+=`<div class="mapSign ${_?.mine||!_?"mine":""}" style="left:${l(x.x)};top:${l(x.y+g/2-2)}">${me(I)}</div>`}),d+=`<button class="mapSpot mapPark" data-go="park" aria-label="The Park" style="left:${l(as.x-100)};top:${l(as.y-85)};width:${l(200)};height:${l(170)}">${su}</button>`,f+=`<div class="mapSign place" style="left:${l(as.x)};top:${l(as.y+70)}">Park</div>`,d+=`<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${l(yn.x-110)};top:${l(yn.y-90)};width:${l(220)};height:${l(180)}">${ou}</button>`,f+=`<div class="mapSign place" style="left:${l(yn.x)};top:${l(yn.y+78)}">Rainbow Ranch</div>`,d+=`<button class="mapSpot mapClub" data-go="gameroom" aria-label="The Clubhouse" style="left:${l(rs.x-95)};top:${l(rs.y-78)};width:${l(190)};height:${l(156)}">${iu}</button>`,f+=`<div class="mapSign place" style="left:${l(rs.x)};top:${l(rs.y+82)}">Clubhouse</div>`,Tt.set("park",{x:as.x,y:as.y-60}),Tt.set("ranch",{x:yn.x-30,y:yn.y-60}),Tt.set("barn",{x:yn.x+10,y:yn.y+10}),Tt.set("gameroom",{x:rs.x,y:rs.y-52}),r.insertAdjacentHTML("beforeend",nu(w,k)+d+'<div class="mapFaces" id="mapFaces"></div>')}t.insertAdjacentHTML("beforeend",f),z2(),aa(),yP(i),aa()}const hf=()=>[{x:as.x,y:as.y,r:115},{x:yn.x,y:yn.y,r:125},{x:wn.x,y:wn.y,r:100},{x:rs.x,y:rs.y,r:90}];function Q2(e,t,n){const s=e.getTotalLength(),o=[];for(let i=0;i<t;i++){const a=t===1?.2:.05+.75*i/(t-1),r=e.getPointAtLength(s*a),l=e.getPointAtLength(Math.min(s,s*a+3));let c=-(l.y-r.y),d=l.x-r.x;const f=Math.hypot(c,d)||1;c/=f,d/=f;const u=[1,-1].map(k=>({x:r.x+c*72*k,y:r.y+d*72*k})).map(k=>({...k,score:Math.min(...n.map(w=>Math.hypot(w.x-k.x,w.y-k.y)-w.r),k.x-50,jn-50-k.x,k.y-60,Zn-40-k.y)})),p=i%2?u:[u[1],u[0]],m=p[0].score>0||p[0].score>=p[1].score?p[0]:p[1];m.x=Math.max(60,Math.min(jn-60,m.x)),m.y=Math.max(62,Math.min(Zn-72,m.y)),n.push({x:m.x,y:m.y,r:70}),o.push({x:m.x,y:m.y})}return o}window.__mapFake=e=>{ff=e,ro(!0)};window.__mapLayout=e=>{const t=document.querySelector("#mapRoad");if(!t)return null;const n=Q2(t,e,hf());let s=1e9,o=1e9,i=!0;return n.forEach((a,r)=>{n.forEach((l,c)=>{c>r&&(s=Math.min(s,Math.hypot(a.x-l.x,a.y-l.y)))}),hf().forEach(l=>{o=Math.min(o,Math.hypot(a.x-l.x,a.y-l.y)-l.r)}),(a.x<55||a.x>jn-55||a.y<60||a.y>Zn-70)&&(i=!1)}),{n:e,minHouse:s,minSpot:o,inside:i}};function N2(e){return e.where==="house"&&e.houseId?{kind:"house",houseId:e.houseId,room:e.room}:e.where==="park"||e.where==="ranch"||e.where==="barn"||e.where==="gameroom"?{kind:e.where}:{kind:"square"}}const _P=e=>e.kind==="house"?"house:"+e.houseId:e.kind;function aa(){const e=document.getElementById("mapFaces");if(!e||A!=="street")return;const t=V2(),n=new Set,s=[];if(v){const i=[...v.presence.entries()],a=ye();a&&i.push([v.pid,a]);for(const[r,l]of i){const c=v.players.get(r);c&&s.push({key:r,look:c.look,name:c.nickname,mine:r===v.pid,place:N2(l)})}}else{const i=te.get().characters[0];i&&s.push({key:"solo",look:Pa(i),name:"You",mine:!0,place:{kind:"square"}})}const o=new Map;for(const i of s){const a=_P(i.place);o.has(a)||o.set(a,[]),o.get(a).push(i)}for(const[i,a]of o)a.sort((r,l)=>r.mine?-1:l.mine?1:r.name.localeCompare(l.name)),a.forEach((r,l)=>{let c,d;const f=Tt.get("square")??{x:wn.x,y:wn.y};if(i==="square")if(Ye.portrait){const b=Math.floor(l/3),g=l%3,y=Math.min(3,a.length-b*3);c=f.x+(g-(y-1)/2)*176,d=f.y+b*112}else if(a.length===1)c=wn.x,d=wn.y;else{const k=-Math.PI/2+l*(Math.PI*2/a.length);c=wn.x+Math.cos(k)*78,d=wn.y+Math.sin(k)*78}else{const k=Tt.get(i)??f,w=Ye.portrait?2:3,b=Ye.portrait?150:64,g=Math.floor(l/w),y=l%w,_=Math.min(w,a.length-g*w);c=k.x+(y-(_-1)/2)*b,d=k.y-g*(Ye.portrait?108:64)}Ye.portrait&&(c=Math.max(100,Math.min(Ye.w-100,c)),d=Math.max(48,Math.min(Ye.h-84,d))),{fx:c,fy:d}=xP(c,d,t),n.add(r.key);let u=e.querySelector(`.mapFace[data-pid="${r.key}"]`);u||(u=document.createElement("button"),u.className="mapFace "+(r.mine?"mine":"other"),u.dataset.pid=r.key,u.setAttribute("aria-label",r.mine?"You":r.name),e.appendChild(u));const p=JSON.stringify(r.look)+r.name;if(u.dataset.look!==p){const k=u.querySelector(".bubble");u.innerHTML=`<span class="face">${wf(St(r.look))}</span><span class="fname">${me(r.mine?"You":r.name)}</span>`,k&&u.appendChild(k),u.dataset.look=p}u.dataset.place=i;const m=Ye.portrait?62:46;u.style.left=(c-m/2)*t+"px",u.style.top=(d-m/2)*t+"px",u.style.width=u.style.height=m*t+"px"});e.querySelectorAll(".mapFace").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),To()}const $P=54;function xP(e,t,n){const s=document.querySelector("#mapWorld .mapFaces");if(!s)return{fx:e,fy:t};const o=s.getBoundingClientRect(),i=[...document.querySelectorAll("#mapWorld .mapMail, #mapWorld .mapKnock")].map(p=>p.getBoundingClientRect()).filter(p=>p.width>0).map(p=>({x:(p.left+p.width/2-o.left)/n,y:(p.top+p.height/2-o.top)/n})),a=$P/n,r=(p,m)=>!i.some(k=>Math.abs(k.x-p)<a&&Math.abs(k.y-m)<a);if(r(e,t))return{fx:e,fy:t};const l=a+.5,c=[e,...i.flatMap(p=>[p.x-l,p.x+l])],d=[t,...i.flatMap(p=>[p.y-l,p.y+l])];let f=null,u=1e9;for(const p of c)for(const m of d){if(p<24/n||p>Ye.w-24/n||m<24/n||m>Ye.h-24/n||!r(p,m))continue;const k=Math.hypot(p-e,m-t);k<u&&(u=k,f={fx:p,fy:m})}return f&&(e=f.fx,t=f.fy),{fx:e,fy:t}}function Bh(){L("mapWorld").classList.remove("zoomIn")}function q2(e,t){Bh(),C.swish(),MP(e)}function Na(e){Mn()||(e.classList.remove("sceneIn"),e.offsetWidth,e.classList.add("sceneIn"),setTimeout(()=>e.classList.remove("sceneIn"),260))}function MP(e){e.kind==="house"?Z2(e.houseId,e.room):e.kind==="home"?j2():e.kind==="park"?BP():e.kind==="ranch"?La(!1):e.kind==="barn"?La(!0):e.kind==="gameroom"&&DP()}function LP(e){const t=v?.presence.get(e);if(!v||!t)return;const n=N2(t),s=v.players.get(e)?.nickname??"your friend";if(n.kind==="square"){Z(`${s} is on the map too! 👋`),C.pop();return}document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`),q2(n),setTimeout(()=>{const o=ye();if(!o||!v)return;const i=t.x+(t.x>300?-110:110);if(n.kind==="house"&&o.where==="house")tt({...o,x:i,y:t.y}),kt(),tc(i-K/2);else if((n.kind==="park"||n.kind==="ranch"||n.kind==="barn")&&o.where===n.kind){dn({...o,x:i,y:Math.max(fo,Math.min(Yn,t.y)),flip:i>t.x});const a=n.kind==="park"?Qs():pn(),r=L(n.kind==="park"?"parkScroll":"ranchScroll");requestAnimationFrame(()=>{r.scrollLeft=t.x*a-r.clientWidth/2,ft()})}else if(n.kind==="gameroom"&&o.where==="gameroom"){const a=hi();a||dn({where:"gameroom",x:i,y:Math.max(fo,Math.min(Yn,t.y)),flip:i>t.x});const r=Hs(),l=L("grScroll"),c=a?.x??t.x;requestAnimationFrame(()=>{l.scrollLeft=c*r-l.clientWidth/2,ft()})}Z(`You found ${s}! 💕`)},420)}function td(e){if(!v)return!1;const t=v.houses.get(e);return!!t&&t.meta.ownerId===v.pid&&Sf(t.confirmed.mailbox)>0}let yr=0;function F2(){e2();const e=document.getElementById("mailCue"),t=v?.myHouseId()??"",n=v&&t?Sf(v.houses.get(t)?.confirmed.mailbox):0;if(!v||A!=="street"||n<=0){n<=0&&(yr=0),e?.classList.remove("show");return}yr!==n&&(yr=n,e?.classList.add("show"),window.setTimeout(()=>{yr===n&&e?.classList.remove("show")},8e3))}function rc(){const e=v?.myHouseId()??"",t=v&&e?Sf(v.houses.get(e)?.confirmed.mailbox):0,n=L("menuBadge");n.textContent=t>9?"9+":String(t),n.classList.toggle("on",t>0);const s=document.getElementById("mailNew");s&&(s.textContent=t>0?t===1?"1 new":t+" new":"",s.classList.toggle("on",t>0));const o=v?v.presence.size:0,i=L("mapBadge");i.textContent=o>9?"9+":String(o),i.classList.toggle("on",o>0),L("btnMap").setAttribute("aria-label",o>0?`Map, ${h1(o,"friend")} online`:"Map");const a=ac(),r=L("chatBadge");r.textContent=a>9?"9+":String(a),r.classList.toggle("on",a>0)}function bl(e){e&&document.querySelectorAll(".toast").forEach(t=>t.remove()),L("menuPop").classList.toggle("hidden",!e),L("btnMenu").setAttribute("aria-expanded",e?"true":"false"),L("btnPhoto").classList.toggle("ok",A==="house"),e&&rc(),EP()}L("btnPhoto").addEventListener("click",()=>{bl(!1),requestAnimationFrame(()=>requestAnimationFrame(()=>{U7(G,()=>C.click())}))});function EP(){const e=L("houseTag");if(e.style.top="",!e.classList.contains("show")||L("menuPop").classList.contains("hidden"))return;const t=document.querySelector(".menuCard");if(!t)return;const n=L("stageWrap").getBoundingClientRect(),s=t.getBoundingClientRect(),o=e.getBoundingClientRect();if(!(o.top<s.bottom-2&&o.bottom>s.top+2&&o.left<s.right-2&&o.right>s.left+2))return;const a=s.bottom-n.top+8;a+o.height<n.height-8?e.style.top=a+"px":e.style.top=Math.max(8,n.height-o.height-10)+"px"}L("btnMenu").addEventListener("click",()=>{bl(L("menuPop").classList.contains("hidden")),C.click()});L("menuPop").addEventListener("click",e=>{const t=e.target;if(t.id==="menuPop"||t.closest("#menuClose")){bl(!1);return}t.closest(".menuRow")&&bl(!1)});L("btnStudio").addEventListener("click",()=>b2());L("btnMail").addEventListener("click",()=>{const e=v?.myHouseId();e?Oh(e):Z("Join a street to send letters!")});L("secrets").addEventListener("click",()=>{if(A!=="house"){Z("Surprises are hiding in your house!");return}Pe.isPlay()&&L("modeDecorate").click(),Wt="secrets",Ft(),Z("Surprises are in your drawer!")});function Oh(e){if(!v||e==="home"||!v.houses.has(e)){Z("Join a street to send letters!");return}const t=v.houses.get(e);Ir.open(e,t.meta.name,t.meta.ownerId===v.pid,t.confirmed.mailbox?.letters??[]),C.click()}L("mapWorld").addEventListener("click",e=>{const t=e.target;if(A!=="street")return;const n=t.closest(".mapKnock");if(n){vP(n);return}const s=t.closest(".mapMail");if(s){Oh(s.dataset.mail||"home");return}const o=t.closest(".mapFace");if(o){o.classList.contains("mine")?(Ke(o),C.pop(),Z("That's you! Tap a place to go there")):LP(o.dataset.pid);return}const i=t.closest("[data-go]");if(!i)return;const a=i.dataset.go;q2(a.startsWith("house:")?{kind:"house",houseId:a.slice(6)}:{kind:a})});function Po(){Bh(),y1(),L("street").classList.add("hidden"),L("park").classList.add("hidden"),L("ranch").classList.add("hidden"),L("gameroom").classList.add("hidden"),Ar()?.close(),L("chatTray").classList.add("hidden"),L("sheet").classList.add("hidden")}function Zo(){Bh(),Qe=null,Bt=[],je=!1,v?tt({where:"street",x:600,y:540,flip:!1}):Qt=null,Po(),A="street",L("street").classList.remove("hidden"),L("streetTitle").textContent=v?"Our Neighborhood":"My Map",Ln(),ro(!0);const e=L("mapWorld");e.style.transformOrigin="50% 50%",e.classList.remove("zoomIn","mapIn"),Mn()||(e.offsetWidth,e.classList.add("mapIn")),C.swish()}function j2(){if(v){const e=v.myHouseId();e&&v.houses.has(e)&&Z2(e);return}Po(),A="house",Qt=null,Pe.sync(!0),Ln(),Lo(),Na(L("stageWrap")),C.sparkle(),Cs()}function Z2(e,t="living"){if(!v||!v.houses.has(e))return;ge=e,A="house",je=!1,Pe.sync(e===v.myHouseId());let n=ll.get(e);n||(n=uv(v,e,{get:()=>te.get().soundOn,set:s=>te.dispatch({type:"settings/sound",on:s})}),ll.set(e,n)),n.dispatch({type:"room/switch",room:t});{const s=Ch(e,t,{x:900+Math.random()*300,y:540});tt({where:"house",houseId:e,room:t,x:s.x,y:s.y,flip:!1})}Po(),H2(n),Na(L("stageWrap")),C.sparkle(),Cs()}function Dh(){v?.close(),v=null,ll=new Map,A="house",ge="",Qt=null,Qe=null,Bt=[],je=!1,L("elsewhere").classList.add("hidden"),Po(),Pe.sync(!0),H2(te),Ln()}L("btnMap").addEventListener("click",()=>{if(A==="street"){C.pop();return}Zo()});L("btnHome").addEventListener("click",()=>{if(A==="house"&&(!v||ge===v.myHouseId())){C.pop();return}j2()});L("phoneOk").addEventListener("click",()=>{L("phoneNote").classList.add("hidden"),C.click()});L("elsewhereGo").addEventListener("click",()=>{C.click(),v?.connect()});L("btnSolo").addEventListener("click",()=>{Dh(),Z("Playing in your own house 🏠")});window.addEventListener("resize",()=>{A==="street"&&ro(!0),A==="park"&&Vh(),A==="ranch"&&jh(),A==="gameroom"&&uh(),ft()});function Hh(e){v=e,ll=new Map,e.on("players",()=>{v===e&&(A==="street"?ro():A==="park"?Eo():A==="ranch"?(Ls(),Gh()):A==="gameroom"?sa():(kt(),Ln()),xa==="dress"&&bn())}),e.on("houses",()=>{v===e&&(A==="street"?ro():A==="house"&&!e.houses.has(ge)&&(Z("That house is gone now"),Zo()))}),e.on("houseMeta",n=>{v!==e||n!==ge||A!=="house"||(qe=null,Ln(),Ct(E.get()),Ft(),pt()||L("sheet").classList.add("hidden"))}),e.on("pres",()=>{v===e&&(A==="street"?aa():A==="park"?Eo():A==="ranch"?Ls():A==="gameroom"?sa():kt())}),e.on("art",(n,s)=>{if(!(v!==e||!s||typeof s!="object")){for(const[o,i]of Object.entries(s)){O1(o,i);const a=Or.get(o);a&&(Or.delete(o),A==="house"&&a.houseId===ge&&_2(a.room,o,a.frame,a.x))}A==="house"&&n===ge&&Ct(E.get())}}),e.on("artFail",(n,s,o)=>{v===e&&(Or.delete(s),o==="full"?Z("Your walls are full of art! Take one down to hang a new one."):o==="streetfull"?Z("The street is full of art! Take one down to hang a new one."):o==="slow"?Z("So much art! Wait a moment, then hang it again."):o==="locked"&&Z("This house is closed right now. Paint at home!"))}),e.on("ranch",()=>{v===e&&A==="ranch"&&uc(!0)}),e.on("ranchFail",n=>{v===e&&pf(n)}),e.on("noride",()=>{if(v!==e)return;const n=ye();if(n?.ride!==void 0){const{ride:s,...o}=n;tt(o),Ls()}Z("Someone is riding that horse!")}),e.on("fx",(n,s)=>{v===e&&iA(n,s)}),e.on("bubble",(n,s)=>{v===e&&pP(n,s)}),e.on("knocked",(n,s)=>{if(v!==e)return;const o=Date.now();(y0.get(s)??0)>o-2e4||(y0.set(s,o),Z(Z7(s)))}),e.on("sayFail",n=>Z(n==="presetsOnly"?"Typing is off. Pick a bubble!":Wl[n]||"Couldn't send that. Try again!")),e.on("mailbox",()=>{v===e&&(A==="street"&&ro(!0),F2(),Ir.refresh(),rc())}),e.on("mailFail",n=>{v===e&&Ir.fail(n)}),e.on("settings",()=>{v===e&&(L("chatTray").classList.contains("hidden")||W2(),Ir.refresh())}),e.on("removed",()=>{Z("A grown-up took this iPad off the street");const n=e.cfg;Qn({url:n.url,code:n.code,id:n.id,parentKey:n.parentKey}),Dh()}),e.on("status",n=>{v===e&&(document.body.classList.toggle("reconnecting",n!=="online"&&!e.replaced),(n==="online"||n==="connecting")&&L("elsewhere").classList.add("hidden"))}),e.on("replaced",()=>{v===e&&L("elsewhere").classList.remove("hidden")}),e.on("table",()=>{if(v===e){if(A==="gameroom"){const n=hi(),s=ye();n&&s?.where==="gameroom"&&Math.hypot(s.x-n.x,s.y-n.y)>40&&tt({where:"gameroom",x:n.x,y:Math.max(fo,Math.min(Yn,n.y)),flip:s.flip}),sa()}Ar()?.refresh()}}),e.on("tblFail",(n,s)=>{v===e&&Ar()?.fail(n,s)}),e.on("welcome",()=>{if(v===e)if(A==="street")ro(!0);else if(A==="park"||A==="ranch"){const n=ye();n&&tt(n),A==="park"?Vh():jh(),ft()}else if(A==="gameroom"){const n=ye();n&&tt(n),uh(),ft(),Ar()?.refresh()}else e.houses.has(ge)?Lo():Zo()}),e.on("reset",(n,s,o)=>{if(v!==e)return;const i=q9(s,o);i&&Z(i)});const t=j9(5e3);e.on("act",(n,s,o,i)=>{if(v!==e||A!=="house"||n!==ge||!o||o===e.pid||s.type!=="item/move"&&s.type!=="item/delete"||s.room!==E.get().currentRoom||!t(o+":"+s.id))return;const a=F9(e.players.get(o)?.nickname??"",s,le[i]?.name??"");a&&Z(a,2e3)}),Zo()}async function SP(){Ln();const e=Vl(),t=Ko();if(!e||!t?.token||t.url!==e)return;const n=new Ul(t),s=await n.connect();s==="ok"?Hh(n):(n.close(),s!=="closed"&&Z("Couldn't reach the street. Playing at home!"))}function en(e,t,n=""){const s=document.createElement("div");s.className="sheet hoodSheet "+n,s.innerHTML=`<div class="card">${e}</div>`,document.body.appendChild(s),C.swish();const o=()=>s.remove();return s.addEventListener("click",i=>{const a=i.target;if(a===s||a.closest('[data-m="close"]'))return o();t(a,o,s)}),{root:s,close:o}}const tn='<button class="close" data-m="close">✕</button>';L("btnHood").addEventListener("click",()=>TP());function TP(){const e=Vl();if(!e){en(`${tn}<h2>Neighborhood</h2><p class="hint">The street isn't open yet. Ask a grown-up to set it up!</p>`,()=>{});return}const t=Ko()?.url===e?Ko():null;en(`${tn}<h2>Neighborhood</h2><div class="bigBtns">
      ${t?.token?`<button class="big go" data-m="go">${Vt.street}<span>Go to my street</span></button>`:`<button class="big go" data-m="join">${Vt.street}<span>Join a friend's street</span></button>`}
      <button class="big grown" data-m="create">${Vt.shield}<span>${t?.parentKey?"Grown-ups":"Grown-ups: start a street"}</span></button></div>`,async(n,s)=>{const o=n.closest("[data-m]")?.dataset.m;if(o==="go"){s();const i=new Ul(t),a=await i.connect();a==="ok"?Hh(i):(i.close(),Z(a.startsWith("badtoken")?"Let's join again. Tap your name!":"Couldn't reach the street. Try again!"))}o==="join"&&(s(),ra(e)),o==="create"&&(s(),await Eg()&&(t?.parentKey?lc():PP(e)))})}async function PP(e){let t;try{t=await av(e)}catch{Z("Couldn't create a street right now");return}Qn({url:e,code:t.code,id:t.id,parentKey:t.parentKey}),en(`${tn}<h2>Your street is ready!</h2><p class="hint">Kids join with this code (you can pick your own on the grown-up screen):</p><div class="code" id="newCode">${t.code}</div>
    <p class="hint small">Grown-up key (keep it private; it opens the grown-up screen on another device):<br><b class="key" id="parentKey">${t.parentKey}</b></p>
    <div class="bigBtns"><button class="big grown" data-m="setup">${Vt.shield}<span>Add kids' names &amp; code</span></button>
    <button class="big go" data-m="joinhere">${Vt.street}<span>Join on this iPad</span></button></div>`,(n,s)=>{n.closest('[data-m="joinhere"]')&&(s(),Wh(e,t.code)),n.closest('[data-m="setup"]')&&(s(),lc())})}function ra(e,t=""){const n=en(`${tn}<h2>Join a street</h2><p class="hint">Type the code a grown-up gave you</p>
    <form id="codeForm" class="codeForm"><input id="codeInput" maxlength="${zf}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="CODE"/><button type="submit" class="go">Next</button></form>
    <p class="err">${me(t)}</p>`,()=>{}),s=n.root.querySelector("#codeInput");setTimeout(()=>s.focus(),50),s.addEventListener("input",()=>{s.value=qr(s.value)}),n.root.querySelector("#codeForm").addEventListener("submit",o=>{o.preventDefault();const i=qr(s.value);if(!hk(i)){n.close(),ra(e,"Hmm, that code doesn't look right. Check it and try again!");return}n.close(),Wh(e,i)})}async function Wh(e,t,n=""){let s;try{s=await rv(e,t)}catch{ra(e,"Couldn't reach the street. Try again!");return}if("slow"in s){ra(e,"Too many tries. Ask a grown-up and try again in a few minutes.");return}if(!s.exists){ra(e,"Hmm, we couldn't find that street. Check the code with a grown-up.");return}window.__lastLookupId=s.id,AP(e,t,s.id,s.roster,n)}function AP(e,t,n,s,o=""){if(s.length){en(`${tn}<h2>Who are you?</h2>${o?`<p class="err">${me(o)}</p>`:s.every(i=>i.claimed)?`<p class="err" id="allSignedIn">${Z9}</p>`:'<p class="hint">Tap your name</p>'}<div class="nicks roster">${s.map((i,a)=>`<button data-nick="${a}" ${i.claimed?"disabled":""}>${me(i.name)}${i.claimed?"<small>signed in</small>":""}</button>`).join("")}</div>
      <p class="hint small">Not on the list? Ask a grown-up to add your name.</p>`,(i,a)=>{const r=i.closest("[data-nick]");if(!r||r.disabled)return;a();const l=s[+r.dataset.nick];l.hasHouse?G2(e,t,n,l.name,void 0):b0(e,t,n,l.name)},"wide");return}en(`${tn}<h2>Pick your street name</h2>${o?`<p class="err">${me(o)}</p>`:""}<div class="nicks">${xu.map((i,a)=>`<button data-nick="${a}">${me(i)}</button>`).join("")}</div>`,(i,a)=>{const r=i.closest("[data-nick]");r&&(a(),b0(e,t,n,xu[+r.dataset.nick]))},"wide")}function b0(e,t,n,s){en(`${tn}<h2>Hi, ${me(s)}!</h2><p class="hint">What should your house on the street be?</p>
    <div class="bigBtns"><button class="big go" data-m="bring">${Yr(2)}<span>Bring my house</span></button>
    <button class="big" data-m="fresh">${Yr(5)}<span>Start a new one</span></button></div>`,(o,i)=>{const a=o.closest("[data-m]")?.dataset.m;a&&(i(),G2(e,t,n,s,a==="bring"))})}function RP(e,t){const n=e.myHouseId();if(!n)return;let s=0;for(const o of y2(t)){const i=vS(o);i&&s++<Fi&&e.saveArt(n,o,i)}s>Fi&&Z(`Your first ${Fi} paintings came along. The rest stay safe on this iPad!`)}async function G2(e,t,n,s,o){const i=te.get(),a=i.characters[0],r=Pa(a??{});let l;if(o&&(l=i,a)){const{reduce:m}=await Os(()=>h(()=>Promise.resolve().then(()=>Ww),void 0));l=m(i,{type:"char/delete",id:a.id})}const c=Ko(),d={url:e,code:t,id:n,parentKey:c?.id===n||c?.code===t?c.parentKey:void 0},f=i.dog?{name:i.dog.name,breed:i.dog.breed}:null,u=new Ul(d),p=await u.connect({nickname:s,look:r,house:l,dog:f});if(p==="ok"){Qn(u.cfg),Hh(u),Z(`Welcome to the street, ${s}!`),l&&RP(u,l),M7()&&(L7(),De=bt,ii("dress"));return}u.close(),p.startsWith("nickname")?Wh(e,t,p.endsWith("notOnList")?"That name is not on the list anymore.":"That name is already signed in on another iPad. Ask a grown-up!"):Z(p==="full"?"That street is full right now. Try again later!":"Couldn't join right now. Try again in a minute!")}L("btnParent").addEventListener("click",async()=>{await Eg()&&lc()});const CP={codeTaken:"That code is already used by another street. Try adding a number!",badCode:"Codes are 4–16 letters or numbers.",badName:"Use a first name only (letters).",rosterFull:`Up to ${uk} names.`,nameInUse:"Remove that player first.",codeFixed:"This street's code can't be changed."};async function lc(){const e=Ko();if(!e)return;if(!e.parentKey){const l=en(`${tn}<h2>Grown-up key</h2><p class="hint">Enter the key you got when the street was made</p><form id="keyForm" class="codeForm"><input id="keyInput" autocomplete="off" spellcheck="false"/><button class="go">OK</button></form>`,()=>{});l.root.querySelector("#keyForm").addEventListener("submit",c=>{c.preventDefault(),e.parentKey=l.root.querySelector("#keyInput").value.trim(),Qn(e),v&&(v.cfg.parentKey=e.parentKey),l.close(),lc()});return}let t=v;t||(t=new Ul({...e,token:void 0}),await t.connect());const n=t,s=l=>a.root.querySelector(l).value;let o=[];const i=l=>{const c=l.trim().replace(/\s+/g," "),d=o.find(f=>f.toLowerCase()===c.toLowerCase());if(d){Z(G9(d));return}n.parent({op:"rosterAdd",name:l})},a=en(`${tn}<h2>Grown-up screen</h2><div id="parentBody"><p class="hint">Loading…</p></div>`,async l=>{const c=l.closest("[data-p]");if(!c)return;const d=c.dataset.p;if(d==="free"&&n.parent({op:"freeChat",on:c.dataset.on!=="1"}),d==="freeMail"&&n.parent({op:"freeMail",on:c.dataset.on!=="1"}),d==="rename"&&n.parent({op:"rename",houseId:c.dataset.hid,name:s(`input[data-hid="${c.dataset.hid}"]`)}),d==="add"&&i(c.dataset.name??s("#rosterInput")),d==="unname"&&n.parent({op:"rosterRemove",name:c.dataset.name}),d==="unclaim"){if(c.dataset.sure!=="1"){c.dataset.sure="1",c.textContent="Tap again";return}n.parent({op:"unclaim",name:c.dataset.name})}if(d==="setcode"&&n.parent({op:"setCode",code:s("#codeEdit")}),d==="remove"){if(c.dataset.sure!=="1"){c.dataset.sure="1",c.textContent="Tap again to remove";return}n.parent({op:"remove",pid:c.dataset.pid})}if(d==="mailClear"||d==="mailClearAll"){if(c.dataset.sure!=="1"){c.dataset.sure="1",c.textContent=d==="mailClearAll"?"Tap again to clear every mailbox":c.dataset.id?"Tap again":"Tap again to clear this mailbox";return}d==="mailClearAll"?n.parent({op:"mailClearAll"}):n.parent({op:"mailClear",houseId:c.dataset.hid,...c.dataset.id?{id:c.dataset.id}:{}})}if(d==="leave"){if(c.dataset.sure!=="1"){c.dataset.sure="1",c.textContent="Tap again: forget this street here";return}Qn(null),a.close(),Dh(),Z("This iPad left the street")}},"wide parent");a.root.addEventListener("submit",l=>{l.preventDefault();const c=l.target.id;c==="rosterForm"&&i(s("#rosterInput")),c==="codeForm2"&&n.parent({op:"setCode",code:s("#codeEdit")})});const r=l=>{const c=new Date(l);return Number.isFinite(c.getTime())?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][c.getMonth()]+" "+c.getDate()+", "+c.getFullYear():""};n.on("parentInfo",l=>{const c=a.root.querySelector("#parentBody");if(!c)return;const d=Ko();d&&d.code!==l.code&&(d.code=l.code,Qn(d)),n.cfg.code=l.code;const f=l.roster??[];o=f.map(y=>y.name);const u=new Set(f.map(y=>y.name.toLowerCase())),p=pk.filter(y=>!u.has(y.toLowerCase())),m=f[0]?.name??"Reagan",k=Array.isArray(l.mail)?l.mail:[],w=k.some(y=>y.letters&&y.letters.length),b=mg(l.settings),g=k.map(y=>`<div class="pMailHouse"><div class="pMailName">${me(y.name||"House")}</div>${(y.letters||[]).slice().reverse().map(_=>`<div class="pLetter"><b>${me(_.from)}</b><span class="pWhen">${me(r(_.at))}</span><p>${me(_.text)}</p><button type="button" class="danger" data-p="mailClear" data-hid="${me(y.houseId)}" data-id="${me(_.id)}">Clear</button></div>`).join("")||'<p class="hint">No letters.</p>'}${(y.letters||[]).length?`<button type="button" class="danger" data-p="mailClear" data-hid="${me(y.houseId)}">Clear this mailbox</button>`:""}</div>`).join("");c.innerHTML=`${l.note?`<p class="err" id="pNote">${me(CP[l.note]??l.note)}</p>`:""}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${me(l.code)}</div></div>
        <div><div class="label">Free typing</div><button class="toggle ${l.settings.freeChat?"on":""}" data-p="free" data-on="${l.settings.freeChat?1:0}" id="pFree">${l.settings.freeChat?"On":"Off (presets only)"}</button><p class="hint small">Chat bubbles. Off means preset phrases only.</p></div>
        <div><div class="label">Let kids type their own letters</div><button class="toggle ${b?"on":""}" data-p="freeMail" data-on="${b?1:0}" id="pFreeMail">${b?"On":"Off (presets only)"}</button><p class="hint small">Letters only. Off means preset phrases only.</p></div></div>
      <div class="label">Letters</div><div id="parentMail">${g||'<p class="hint">No letters right now.</p>'}${w?'<button type="button" class="danger" data-p="mailClearAll" id="mailClearAll">Clear every mailbox</button>':""}</div>
      <form class="pAdd" id="codeForm2"><input id="codeEdit" maxlength="${zf}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="e.g. ${me(qr(m))}7"/><button data-p="setcode" type="button">Use this code</button></form>
      <p class="hint small">Tip: a word plus a number (like ${me(qr(m))}7) is easy to remember and harder to guess. Not case-sensitive.</p>
      <div class="label">Kids' names (sign-in list)</div>
      <div class="roster">${f.map(y=>`<span class="rName ${y.claimed?"claimed":""}"><b>${me(y.name)}</b>${y.claimed?`<i>signed in</i><button data-p="unclaim" data-name="${me(y.name)}">Reset</button>`:y.hasHouse?"<i>not signed in</i>":`<button class="x" data-p="unname" data-name="${me(y.name)}" aria-label="Remove name">×</button>`}</span>`).join("")||'<p class="hint">No names yet: kids pick a fun nickname instead.</p>'}</div>
      <form class="pAdd" id="rosterForm"><input id="rosterInput" maxlength="20" autocomplete="off" placeholder="First name"/><button data-p="add" type="button">Add</button></form>
      ${p.length?`<div class="sugg">${p.map(y=>`<button data-p="add" data-name="${y}">+ ${y}</button>`).join("")}</div>`:""}
      <div class="label">Houses</div>${l.houses.map(y=>`<div class="pHouse"><input data-hid="${y.id}" value="${me(y.name)}" maxlength="24"/><button data-p="rename" data-hid="${y.id}">Rename</button></div>`).join("")||'<p class="hint">No houses yet.</p>'}
      <div class="label">Players</div>${l.players.map(y=>`<div class="pPlayer"><span class="dot ${y.online?"on":""}"></span>${me(y.nickname)}<button class="danger" data-p="remove" data-pid="${y.pid}">Remove</button></div>`).join("")||'<p class="hint">Nobody has joined yet.</p>'}
      <p class="hint small">Letters stay on the server for up to 30 days. They are filtered, and only a first name is stored. You can clear them here, or turn off “Let kids type their own letters” so new letters use preset phrases. Chat bubbles are only relayed to kids standing nearby and are not saved. No emails or last names. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays).</p>
      <button class="danger wideBtn" data-p="leave">Forget this street on this device</button>`}),n.on("error",l=>{l==="badkey"&&(Z("That grown-up key didn't work"),e.parentKey=void 0,Qn(e),a.close())}),n.parent({op:"info"})}let Qt=null;function Qs(){return L("park").clientHeight/Yf}const IP=()=>{const e=te.get();return e.characters.find(t=>t.id===e.dog?.owner)??e.characters[0]},En=()=>v?ye():Qt;function dn(e){v?tt(e):Qt=e,A==="ranch"?Ls():A==="gameroom"?sa():Eo()}function _s(e="park"){if(v){const n=[],s=[...v.presence.entries()],o=ye();o&&s.push([v.pid,o]);for(const[i,a]of s){const r=v.players.get(i);r&&a.where===e&&n.push({key:i,look:r.look,name:r.nickname,p:a,mine:i===v.pid,dog:r.dog??null})}return n}const t=IP();return Qt&&Qt.where===e?[{key:"solo",look:Pa(t??{}),name:"",p:Qt,mine:!0,dog:te.get().dog??null}]:[]}function Vh(){const e=Qs(),t=L("parkWorld"),n=s=>s*e+"px";t.style.width=Nf*e+"px",t.style.height=Yf*e+"px",t.style.setProperty("--sc",String(e)),t.innerHTML=b4()+_d.map((s,o)=>s.kind==="swing"?`<div class="swing" data-swing="${o}" style="left:${n(s.x-30)};top:${n(on)};width:${n(60)};height:${n(240)}">${w4}</div>`:"").join("")+_d.map((s,o)=>`<button class="pspot k-${s.kind}" data-spot="${o}" aria-label="${s.kind}" style="left:${n(s.x-50)};top:${n(s.y-(s.kind==="swing"?70:55))};width:${n(100)};height:${n(s.kind==="swing"?90:65)}"></button>`).join("")+`<button class="pspot slide" data-act="slide" aria-label="Slide" style="left:${n(ke.ladder-45)};top:${n(ke.top.y-30)};width:${n(130)};height:${n(560-ke.top.y+30)}"></button><button class="pspot pond" data-act="splash" aria-label="Pond" style="left:${n(1235)};top:${n(462)};width:${n(370)};height:${n(105)}"></button><button class="pspot gate" data-act="exit" aria-label="Back to the street" style="left:${n(25)};top:${n(240)};width:${n(180)};height:${n(260)}"></button><div class="ripples" id="ripples"></div><button class="ball" id="ball" aria-label="Ball">${k4}</button><div class="savatars" id="pavatars"></div>`,ko(t,"park"),wl(),Eo(),ft()}const w0=2400;function Eo(){const e=document.getElementById("pavatars");if(!e||A!=="park")return;const t=Qs(),n=new Set,s=new Set;for(const o of _s()){n.add(o.key);let i=e.querySelector(`.savatar[data-pid="${o.key}"]`);i||(i=document.createElement("div"),i.className="savatar "+(o.mine?"mine":"other"),i.dataset.pid=o.key,e.appendChild(i),o.mine&&Y2(i));const a=JSON.stringify(o.look)+o.name;if(i.dataset.look!==a){const f=i.querySelector(".bubble");i.innerHTML=o.name?Ih(o.look,o.name):`<div class="inner">${St(o.look)}</div>`,f&&i.appendChild(f),i.dataset.look=a}const r=(As[o.look.size]??1)*t*.95,l=Xt*r,c=Ot*r;Yl(i,o.p.x*t-l/2+"px",o.p.y*t-c+"px"),i.style.width=l+"px",i.style.height=c+"px",i.style.zIndex=String(100+Math.round(o.p.y)),i.classList.toggle("flipped",o.p.flip),Ba(i,o.look,o.mine);const d=o.p.pose??"";i.dataset.pose!==d&&(i.classList.remove("pose-sit","pose-swing","pose-slide"),i.offsetWidth,d==="slide"&&(i.style.setProperty("--sx",(ke.top.x-ke.bottom.x)*t+"px"),i.style.setProperty("--sy",(ke.top.y-ke.bottom.y)*t+"px")),d&&i.classList.add("pose-"+d),i.dataset.pose=d),d==="swing"?(i.style.transformOrigin=`50% ${(on-o.p.y)*t+c}px`,i.style.animationDelay=-(Date.now()%w0)/1e3+"s",s.add(o.p.spot??-1)):(i.style.transformOrigin="",i.style.animationDelay="")}e.querySelectorAll(".savatar").forEach(o=>{n.has(o.dataset.pid)||o.remove()}),document.querySelectorAll("#parkWorld .swing").forEach(o=>{const i=s.has(+o.dataset.swing);i&&!o.classList.contains("swinging")&&(o.style.animationDelay=-(Date.now()%w0)/1e3+"s"),o.classList.toggle("swinging",i)}),To()}function Y2(e){e.addEventListener("pointerdown",t=>{t.preventDefault(),t.stopPropagation();const n=En();if(!n||n.where!=="park"&&n.where!=="ranch"&&n.where!=="barn")return;const s=n.where!=="park",o=n.where;Bt=[];const i=L(s?"ranchScroll":"parkScroll"),a=s?pn():Qs(),r=o==="barn"?xf:s?Sa:Nf,l=y=>{const _=L(s?"ranchWorld":"parkWorld").getBoundingClientRect();return{x:(y.clientX-_.left)/a,y:(y.clientY-_.top)/a}},c=l(t),d={x:n.x-c.x,y:n.y-c.y};let f=t,u=0,p=n.x,m=!1;const k=y=>{const _=l(y),T=En();if(!T)return;const x=Math.max(60,Math.min(r-60,_.x+d.x)),$=Math.max(470,Math.min(590,_.y+d.y));if(!m&&Math.hypot(x-T.x,$-T.y)<6)return;m=!0;const I=Math.abs(x-p)>3?x<p:T.flip;Math.abs(x-p)>3&&(p=x),dn(o==="barn"?{where:"barn",x,y:$,flip:I}:s?{where:"ranch",x,y:$,flip:I,...T.ride!==void 0?{ride:T.ride}:{}}:{where:"park",x,y:$,flip:I})},w=()=>{const y=i.getBoundingClientRect(),_=f.clientX<y.left+70?-10:f.clientX>y.right-70?10:0;_&&m&&(i.scrollLeft+=_,k(f)),u=requestAnimationFrame(w)};u=requestAnimationFrame(w),e.classList.add("lifted"),C.pick();const b=y=>{y.pointerId===t.pointerId&&(f=y,k(y))},g=y=>{y.pointerId===t.pointerId&&(cancelAnimationFrame(u),window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",g),e.classList.remove("lifted"),C.drop())};window.addEventListener("pointermove",b),window.addEventListener("pointerup",g)})}L("parkWorld").addEventListener("pointerdown",e=>{e.target.closest(".pspot, .ball, .pet")&&e.stopPropagation()});L("parkWorld").addEventListener("click",e=>{const t=e.target,n=En();if(!n)return;if(t.closest("#ball")){Qe||C.boing(),HP();return}const s=t.closest("[data-spot]");if(s){const i=+s.dataset.spot,a=_d[i];if(n.spot===i&&n.pose){dn({where:"park",x:a.x,y:Math.min(590,a.y+40),flip:n.flip}),C.drop();return}if(_s().some(r=>!r.mine&&r.p.spot===i&&r.p.pose)){Z("Someone is already there!"),C.pop();return}dn({where:"park",x:a.x,y:a.y,flip:n.flip,pose:a.kind==="swing"?"swing":"sit",spot:i}),a.kind==="swing"?C.boing():C.drop();return}const o=t.closest("[data-act]")?.dataset.act;if(o==="slide"&&(dn({where:"park",x:ke.bottom.x,y:ke.bottom.y,flip:!1,pose:"slide"}),C.swish(),setTimeout(()=>{const i=En();i?.pose==="slide"&&dn({where:"park",x:i.x,y:i.y,flip:i.flip})},1500)),o==="splash"){const i=L("parkWorld").getBoundingClientRect(),a=(e.clientX-i.left)/Qs();K2(a),v?.fx({k:"splash",x:a})}o==="exit"&&X2()});function K2(e){const t=document.getElementById("ripples");if(!t||A!=="park")return;const n=Qs();for(let s=0;s<2;s++){const o=document.createElement("div");o.className="ripple";const i=(120+s*70)*n;Object.assign(o.style,{left:e*n-i/2+"px",top:512*n-i*.18+"px",width:i+"px",height:i*.36+"px",animationDelay:s*.15+"s"}),t.appendChild(o),setTimeout(()=>o.remove(),1400)}for(let s=0;s<6;s++){const o=document.createElement("div");o.className="drop",Object.assign(o.style,{left:e*n+"px",top:505*n+"px"}),o.style.setProperty("--dx",(s-2.5)*14+"px"),t.appendChild(o),setTimeout(()=>o.remove(),900)}C.splash()}function BP(){Po(),Bt=[],je=!1,A="park",L("park").classList.remove("hidden"),Na(L("park"));const e={where:"park",x:290,y:548,flip:!1};v?tt(e):Qt=e,L("streetTitle").textContent="The Park",Ln(),Vh(),requestAnimationFrame(()=>{const t=L("parkScroll");t.scrollLeft=0,ft()}),C.sparkle()}function X2(){Zo()}function OP(){return gc()&&!document.body.classList.contains("phone")}function k0(){return gc()?520:280}function DP(){Po(),Bt=[],je=!1,A="gameroom",L("gameroom").classList.remove("hidden");const e=hi(),t=e?{where:"gameroom",x:e.x,y:Math.max(fo,Math.min(Yn,e.y)),flip:!1}:{where:"gameroom",x:k0(),y:560,flip:!1};v?tt(t):Qt=t,L("streetTitle").textContent="The Clubhouse",Ln(),uh(),requestAnimationFrame(()=>{const n=Hs(),s=L("grScroll"),o=e?.x??(OP()?N1/2:k0());s.scrollLeft=Math.max(0,o*n-s.clientWidth/2),ft(),xy()}),Na(L("gameroom")),C.sparkle()}L("btnLeavePark").addEventListener("click",()=>{A==="ranch"&&je?La(!1):X2()});let us={x:2620,y:565},Qe=null;function wl(e=!1){const t=document.getElementById("ball");if(!t)return;const n=Qs(),s=34*n;e||t.classList.remove("flying"),t.style.left=us.x*n-s/2+"px",t.style.top=us.y*n-s+"px",t.style.width=t.style.height=s+"px"}function HP(){if(Qe)return;const e=yt.x0+40+Math.random()*(yt.x1-yt.x0-80),t=yt.y0+25+Math.random()*(yt.y1-yt.y0-35);J2(v?v.pid:"solo",e,t),v?.fx({k:"ball",x:e,y:t})}function J2(e,t,n){if(A!=="park")return;const s=document.getElementById("ball");us={x:t,y:n},Qe={thrower:e,phase:"fly",dog:null,until:performance.now()+12e3},s&&(s.classList.remove("flying"),s.offsetWidth,s.classList.add("flying"),wl(!0)),C.boing(),setTimeout(()=>{Qe?.phase==="fly"&&(Qe.phase="chase",document.getElementById("ball")?.classList.remove("flying"),ps.size||(Qe=null))},650)}function WP(e){if(!v)return Qt;const t=e===v.pid?ye():v.presence.get(e);return t&&t.where==="park"?t:null}const ps=new Map,nd=e=>(t,n,s,o,i)=>{t.style.left=(n-o/2)*e+"px",t.style.top=(s-i)*e+"px",t.style.width=o*e+"px",t.style.height=i*e+"px"};function VP(){const e=[];if(A==="house"){const t=E.get(),n={box:Y,place:zs,z:s=>String(4e3+Math.round(s)),scale:1};if(v&&Ae!==te){const s=[...v.presence.entries()],o=ye();o&&s.push([v.pid,o]);for(const[i,a]of s){const r=v.players.get(i)?.dog;if(r&&a.where==="house"&&a.houseId===ge&&a.room===t.currentRoom){const l=wt(t.currentRoom,qt(i,a),a);e.push({key:i,dog:r,x:l.x,y:l.y,flip:a.flip,...n})}}}else if(t.dog){const s=t.characters.find(o=>o.id===t.dog.owner)??t.characters[0];if(s&&s.room===t.currentRoom){const o=wt(s.room,ut(s),s);e.push({key:"solo",dog:t.dog,x:o.x,y:o.y,flip:s.flip,...n})}}}else if(A==="park"){const t=document.getElementById("pavatars");if(!t)return e;const n=Qs();for(const s of _s())s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:nd(n),z:o=>String(Math.round(o)-200),scale:.95})}else if(A==="ranch"){const t=document.getElementById("ravatars");if(!t)return e;const n=pn();for(const s of _s(je?"barn":"ranch"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:nd(n),z:o=>String(100+Math.round(o)),scale:.95,riding:s.p.ride!==void 0})}else if(A==="gameroom"){const t=document.getElementById("gavatars");if(!t)return e;const n=Hs();for(const s of _s("gameroom"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:nd(n),z:o=>String(Math.round(o)-200),scale:.95})}return e}let v0=performance.now();function UP(e,t){const n=new Set;for(const s of VP()){if(NP(s.key))continue;n.add(s.key);let o=ps.get(s.key);const i=s.flip?1:-1,a=!s.riding&&A==="house"&&E.get().currentRoom==="backyard",r=s.riding?200:78;let l=a?Yu.x:s.x+i*r;s.riding?l=Math.max(50,Math.min(Sa-50,l)):A==="house"&&!a&&(l=ay(l,46));const c=a?Yu.y:Math.min(595,s.y+(s.riding?28:6));if(!o||o.box!==s.box||!o.el.isConnected){o?.el.remove();const $=document.createElement("div");$.className="pet pet-dog",$.dataset.dog=s.key,s.box.appendChild($),zP($,s.key),o={el:$,box:s.box,x:l,y:c,flip:s.flip,pose:"",look:"",idle:1,trickUntil:0,sitTrick:!1},ps.set(s.key,o)}let d=l,f=c,u=s.riding?980:320;if(Qe&&e>Qe.until&&(Qe=null,wl()),Qe&&A==="park"){if(Qe.phase==="chase")d=us.x,f=us.y,u=950,Math.hypot(o.x-d,o.y-f)<28&&(Qe.phase="carry",Qe.dog=s.key,C.woof());else if(Qe.phase==="carry"&&Qe.dog===s.key){const $=WP(Qe.thrower)??{x:(yt.x0+yt.x1)/2,y:540};d=$.x+60,f=Math.min(590,$.y+6),u=750,us={x:o.x+(o.flip?-40:40),y:o.y-30*s.scale},Math.hypot(o.x-d,o.y-f)<26&&(us={x:$.x+70,y:Math.min(590,$.y+12)},Qe=null,Hr(o,"♥"),C.sparkle()),wl()}}const p=e<o.trickUntil,m=d-o.x,k=f-o.y,w=Math.hypot(m,k);let b=!1;if(w>(Qe?4:10)&&!p){const $=Mn()?w:Math.min(w,u*t);o.x+=m/w*$,o.y+=k/w*$,b=!0,Math.abs(m)>1.5&&(o.flip=m<0),o.idle=0}else o.idle+=t,!p&&o.idle>.3&&Math.abs(s.x-o.x)>4&&(o.flip=s.x<o.x);const g=o.el.classList.contains("soc-foot"),y=g?"sleep":p&&o.sitTrick?"sit":b?"stand":o.idle>.9?"sit":"stand",_=y+s.dog.breed+(g?"f":"");if(o.pose+o.look!==y+_){for(const $ of[...o.el.children])$.matches(".bubble, .kennelBtn")||$.remove();o.el.insertAdjacentHTML("afterbegin",`<div class="inner">${ga(s.dog.breed,y,pa(s.dog.breed,y))}</div>`),o.pose=y,o.look=_}o.el.dataset.name=s.dog.name;const T=g&&A==="house"?E.get():null,x=T?T.rooms[T.currentRoom]?.items.find($=>$.kind==="bed"):void 0;o.el.classList.toggle("walking",b),o.el.classList.toggle("flipped",g?!!x?.flip:o.flip),s.place(o.el,o.x,o.y,92*s.scale,71*s.scale),o.el.style.zIndex=s.z(o.y+1),oy(o.el,s.key,!1)}for(const[s,o]of ps)n.has(s)||(o.el.remove(),ps.delete(s))}function Hr(e,t){e.el.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.el.appendChild(n),mi(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const _0=new Map;function ey(e,t){const n=ps.get(e);if(!n)return;const s=n.el.dataset.name??"";n.trickUntil=performance.now()+1400,n.sitTrick=t===0,n.el.classList.remove("spin","hop"),n.el.offsetWidth,t===0&&(Hr(n,`${s} sits! 🐾`),C.pop()),t===1&&(n.el.classList.add("spin"),Hr(n,"Wheee! ✨"),C.spin()),t===2&&(n.el.classList.add("hop"),Hr(n,"Woof! Woof!"),C.woof())}function zP(e,t){e.addEventListener("pointerdown",n=>{n.stopPropagation(),n.preventDefault()}),e.addEventListener("click",n=>{n.stopPropagation();const s=(_0.get(t)??0)%3;_0.set(t,s+1),ey(t,s),v&&v.fx({k:"trick",owner:t,v:s})})}function cc(e){const t=e?.dogKennel?.item;if(!t||!e)return null;for(const n of Object.values(e.rooms)){const s=n.items.find(o=>o.id===t&&o.kind==="kennel");if(s)return s}return null}function QP(e){if(e==="solo")return te.get();if(!v)return null;const t=v.players.get(e)?.houseId;return t?v.view(t):null}function NP(e){return!!cc(QP(e))}function Uh(){if(v){const e=v.myHouseId();return e?v.view(e):null}return te.get()}function ty(){if(A!=="house")return null;const e=E.get(),t=cc(e);if(!t||!e.rooms[e.currentRoom]?.items.some(n=>n.id===t.id))return null;if(v&&Ae!==te){const n=v.houses.get(ge)?.meta.ownerId,s=n?v.players.get(n)?.dog??null:null;return!n||!s?null:{key:n,dog:s,item:t}}return e.dog?{key:"solo",dog:e.dog,item:t}:null}function qP(){const e=Uh();if(!e)return null;const t=vl()?E.get().currentRoom:null;let n=null,s=null;for(const[o,i]of Object.entries(e.rooms))for(const a of i.items)a.kind==="kennel"&&((!n||a.z>=n.z)&&(n=a),o===t&&(!s||a.z>=s.z)&&(s=a));return s??n}function br(e){if(!Nh()){Z("Adopt a dog first!");return}Qi({type:"dog/kennel",item:e}),e?(C.pop(),Z("Rest well, puppy!")):(C.woof(),Z("Come on, puppy!"))}function zh(e){if(!Nh()){Z("Adopt a dog first!");return}const t=cc(Uh());if(e===void 0){if(t){br(null);return}const n=qP();if(!n){Z("Put a dog kennel down first!");return}br(n.id);return}t?.id===e?br(null):br(e)}function ny(e){const t=E.get(),n=t.rooms[t.currentRoom]?.items.find(s=>s.id===e);if(n){if(n.kind==="kennel"){vl()&&zh(n.id);return}n.kind==="cat-tower"&&sA()}}function FP(e,t){const n=E.get(),s=n.rooms[n.currentRoom]?.items.find(i=>i.id===t);if(!s)return;if(s.art){C.click(),SS(al(s.frame??0,H1(s.art),!1));return}const o=Lv(s.kind);if(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),C.click(),o==="kennel"||o==="tower"){ny(t);return}if(I0(s.kind)){S7();const i=!s.on;E.dispatch({type:"item/power",room:n.currentRoom,id:t,on:i}),i&&gs(s.kind)==="tv"&&YP(s),$s();return}if(!g9(s.kind,t,n.soundOn,$s)){if(o==="open"){e.classList.toggle("opened"),$s();return}if(o==="lamp"){e.classList.toggle("lamp-on");return}if(o==="sit"&&sy(s),o==="swing"&&KP(s),o!=="sit"&&(Jo(s.kind)||Et(s.kind)||Gn(s.kind))){const i=E.get().currentRoom;if(v&&A==="house"){const a=ye();a&&a.where==="house"&&$h(s.x,s.y,s)}else{const a=E.get(),r=a.characters.find(l=>l.id===De&&l.room===i)??a.characters.find(l=>l.room===i);r&&_h(r.id,s.x,s.y,s)}es(!1)}}}const $0={dance:Oe*2,sway:Oe*4,watch:Oe*5,warm:Oe*3,hug:Oe*2,bounce:Oe,bathe:Oe*3,nibble:Oe,...f9},jP={dance:"<span>♪</span><span>♫</span>",sway:"<span>♪</span>",hug:"<span>♥</span>",bathe:'<span class="bub"></span><span class="bub"></span><span class="bub"></span>',nibble:"<span>✦</span>",...h9},wr={stereo:"<span>♪</span><span>♫</span><span>♪</span>",musicbox:"<span>♪</span><span>♩</span>",tv:'<span class="glow"></span>',fire:'<span class="glow"></span><span class="ember"></span><span class="ember"></span>',tub:'<span class="bub"></span><span class="bub"></span><span class="bub"></span><span class="bub"></span>',fridge:'<span class="food">🍓</span><span class="food">🧁</span>',...u9},sd=new Map;let od=0;setInterval(()=>{document.hidden||$s()},1e3);function $s(){od||(od=requestAnimationFrame(()=>{od=0,ZP()}))}function so(e,t,n){let s=e.querySelector(":scope > .ambFx");if(!t){s?.remove();return}s||(s=document.createElement("i"),s.className="ambFx",s.setAttribute("aria-hidden","true"),e.appendChild(s)),s.dataset.k!==n&&(s.innerHTML=t,s.dataset.k=n,s.className="ambFx fx-"+n)}function x0(e,t,n){const s=t?t.kind+"|"+t.item:"",o=e.dataset.amb||"";if(o!==s){if(o&&e.classList.remove("amb-"+o.split("|")[0],"amb-l","amb-r"),o.startsWith("bathe|")&&!t&&(e.classList.add("amb-sparkle"),setTimeout(()=>e.classList.remove("amb-sparkle"),1200)),!t){delete e.dataset.amb,so(e,null,"");return}e.dataset.amb=s,e.style.setProperty("--amb-delay",lo(t.phase,$0[t.kind],n)+"ms"),e.style.setProperty("--amb-period",$0[t.kind]+"ms"),e.classList.add("amb-"+t.kind,t.face<0?"amb-l":"amb-r"),so(e,jP[t.kind]??null,t.kind)}}function ZP(){const e=E.get(),t=e.rooms[e.currentRoom];if(A!=="house"||!t){mp(null);return}const n=Date.now(),s=new Set;for(const w of t.items){if(gs(w.kind)!=="musicbox")continue;if(!w.on){sd.delete(w.id);continue}const b=sd.get(w.id)??(sd.set(w.id,n),setTimeout($s,ru+60),n);n-b>=ru&&s.add(w.id)}const o=t.items.map(w=>{const b=le[w.kind];return{id:w.id,kind:w.kind,x:w.x,y:w.y,on:!!w.on,w:b?Mh(b,Fe(w)).w:200}}),i=[],a=new Map;for(const w of e.characters){const b=It.get(w.id);if(w.room!==e.currentRoom||!b||b.classList.contains("lifted"))continue;const g=ut(w)?.pose;i.push({id:w.id,x:w.x,y:w.y,seated:g==="sit",lying:g==="lie"}),a.set(w.id,b)}if(v&&Ae!==te){const w=[...v.presence.entries()],b=ye();b&&w.push([v.pid,b]);for(const[g,y]of w){const _=fs.get(g);if(!_||!_.isConnected||y.where!=="house"||y.houseId!==ge||y.room!==e.currentRoom||_.classList.contains("lifted"))continue;const T=qt(g,y)?.pose;i.push({id:"p:"+g,x:y.x,y:y.y,seated:T==="sit",lying:T==="lie"}),a.set("p:"+g,_)}}const r=Hv(o,i.filter(w=>!w.id.startsWith("p:")));Y.querySelectorAll(".item").forEach(w=>{Es(w.dataset.kind||"")&&w.dataset.id&&w.classList.toggle("opened",r.has(w.dataset.id))});const l=m9(n),c=Uv(e,i,Jy(o,i,{fridgesOpen:r,musicBoxDone:s,keysPlaying:l})),d=R7(o,c);if(d)for(const w of d.dancers){const b=c.get(w);b&&c.set(w,{...b,phase:0,face:b.face})}for(const w of[...It.values(),...fs.values()])[...a.values()].includes(w)||x0(w,void 0,n);a.forEach((w,b)=>x0(w,c.get(b),n));const f=new Set([...c.values()].filter(w=>w.kind==="bathe").map(w=>w.item));let u=null;for(const w of t.items){const b=Y.querySelector(`.item[data-id="${w.id}"]`);if(!b)continue;const g=gs(w.kind),y=!!w.on&&!!g&&!s.has(w.id);if(b.classList.toggle("amb-on",y),y)b.dataset.amb=g,b.style.getPropertyValue("--amb-delay")||b.style.setProperty("--amb-delay",lo(0,Oe,n)+"ms"),g==="stereo"?u="stereo":g==="musicbox"&&!u&&(u="musicbox"),so(b,wr[g],g);else if(Gn(w.kind)&&f.has(w.id))so(b,wr.tub,"tub");else if(Es(w.kind)&&r.has(w.id))so(b,wr.fridge,"fridge");else{const _=y9(w.kind,w.id,c,l,r,f.size>0);b.classList.toggle("soc-ducky",_==="ducky"),_?so(b,wr[_]||null,_):(delete b.dataset.amb,so(b,null,""))}}GP(d,n),mp(u);const p=new Map;for(const w of i)p.set(w.id,{el:a.get(w.id),d:w});const m=e.baby&&e.baby.room===e.currentRoom&&!e.baby.holder?{x:e.baby.x,y:e.baby.y}:null,k=(e.rooms[e.currentRoom]?.items??[]).filter(w=>a1(w.kind)).map(w=>{const b=le[w.kind],g=Fe(w);return{kind:w.kind,x:w.x,y:w.y,flip:!!w.flip,scale:g,h:b?Je(b)*g:200}});b9({layer:Y,roomW:Rt,seed:ge||"local",now:n,reduced:Mn(),dolls:p,baby:m,beds:k},c)}let id="";function GP(e,t){const n=L("partyFx"),s=!!e&&A==="house";document.body.classList.toggle("party-on",s),n.classList.toggle("on",s),s?(n.style.setProperty("--px",e.x/pe*100+"%"),id!==e.stereo&&(n.style.setProperty("--amb-delay",lo(0,Oe,t)+"ms"),id=e.stereo)):id="";const o=new Set(s?e.toys:[]);Y.querySelectorAll(".item").forEach(c=>{const d=o.has(c.dataset.id||"");d!==c.classList.contains("party-bounce")&&(c.classList.toggle("party-bounce",d),d&&c.style.setProperty("--amb-delay",lo(0,Oe,t)+"ms"))});const i=s?Y.querySelector(`.item[data-id="${e.stereo}"]`):null,a=mh.getBoundingClientRect(),r=a.width?pe/a.width:1,l=i?.getBoundingClientRect();Y.querySelectorAll(".pet").forEach(c=>{let d=!1;if(l){const f=c.getBoundingClientRect();d=Math.hypot((f.left+f.width/2-l.left-l.width/2)*r,(f.bottom-l.bottom)*r*1.5)<=A7&&!c.classList.contains("leap")&&!c.classList.contains("curl")}d!==c.classList.contains("party-hop")&&(c.classList.toggle("party-hop",d),d&&c.style.setProperty("--amb-delay",lo(.5,Oe*2,t)+"ms"))})}function YP(e){const t=E.get();if(v&&A==="house"){const s=ye();if(!s||s.where!=="house"||s.seat)return}else{const s=t.characters.find(o=>o.id===De&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(!s||s.seat)return}const n=t.rooms[t.currentRoom].items.filter(s=>sc(s.kind)?.pose==="sit"&&Math.abs(s.x-e.x)<520).sort((s,o)=>Math.abs(s.x-e.x)-Math.abs(o.x-e.x))[0];n&&sy(n)}let zt=null,Ui=!1;function kl(){Y.querySelectorAll(".item.swinging").forEach(e=>{(!zt||e.dataset.id!==zt.item)&&e.classList.remove("swinging")}),zt&&Y.querySelector(`.item[data-id="${zt.item}"]`)?.classList.add("swinging")}function KP(e){const t=E.get(),n=t.characters.find(i=>i.id===De&&i.room===t.currentRoom)??t.characters.find(i=>i.room===t.currentRoom);if(!n)return;if(zt?.id===n.id&&zt.item===e.id){zt=null,Ui=!0,E.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x+70,y:Math.max(e.y,520)}),Ui=!1,kl();return}const s=le[e.kind],o=e.y-(s?Je(s)*Fe(e)*.26:40);zt={id:n.id,item:e.id},Ui=!0,E.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x,y:o}),Ui=!1,kl()}function sy(e){const t=Va(e);if(!t)return;if(v&&A==="house"){const i=ye();if(!i||i.where!=="house")return;if(!v.speaksSit){const r="p:"+v.pid,l=$n.get(r)?.item===e.id,c=Math.max(_o+40,t.footY-8);l?$n.delete(r):$n.set(r,{item:e.id,pose:t&&sc(e.kind).pose,n:0});const{seat:d,...f}=i;tt({...f,x:e.x,y:c,flip:!1}),kt();return}const a=No({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:xo(void 0,v.pid),alreadyOn:i.seat?.id===e.id?e.id:null});if(a.toast){Z(a.toast),C.pop();return}if(!a.moved)return;$a(i,a.x,a.y,!1,a.seat?{id:a.seat.item,pose:a.seat.pose,n:a.seat.n}:null),kt(),es(!1);return}const n=E.get(),s=n.characters.find(i=>i.id===De&&i.room===n.currentRoom)??n.characters.find(i=>i.room===n.currentRoom);if(!s)return;const o=No({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:xo(s.id),alreadyOn:s.seat?.item===e.id?e.id:null});if(o.toast){Z(o.toast),C.pop();return}o.moved&&(oa(s.id,n.currentRoom,o.x,o.y,o.seat),es(!1))}function oy(e,t,n){const s=v?t===v.pid:t==="solo";let o=e.querySelector(".kennelBtn");if(!s){o?.remove();return}o||(o=document.createElement("button"),o.type="button",o.className="kennelBtn",o.addEventListener("pointerdown",i=>{i.stopPropagation(),i.preventDefault()}),o.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault(),zh()}),e.appendChild(o)),o.textContent=n?"Out":"Kennel",XP(o)}function XP(e){if(A!=="house"){e.style.left=e.style.right=e.style.top=e.style.bottom=e.style.transform="";return}const t=e.parentElement;if(!t)return;const n=G.getBoundingClientRect().width/G.offsetWidth||1,s=G.getBoundingClientRect(),o=4,i={l:s.left+o,t:s.top+o,r:s.right-o,b:s.bottom-o},a=Y.querySelector(".char")?.getBoundingClientRect(),r=Y.querySelector('.item[data-kind="sofa"]')?.getBoundingClientRect(),l=[...Y.querySelectorAll(".pet-cat, .item")].map(W=>W.getBoundingClientRect()).filter(W=>W.width>2&&W.height>2),c=(W,z)=>!!z&&W.left<z.right-1&&W.right>z.left+1&&W.top<z.bottom-1&&W.bottom>z.top+1,d=(W,z)=>c(W,z)?Math.max(0,Math.min(W.right,z.right)-Math.max(W.left,z.left))*Math.max(0,Math.min(W.bottom,z.bottom)-Math.max(W.top,z.top)):0,f=W=>{let z=0;W.left<i.l&&(z+=(i.l-W.left)*8),W.right>i.r&&(z+=(W.right-i.r)*8),W.top<i.t&&(z+=(i.t-W.top)*8),W.bottom>i.b&&(z+=(W.bottom-i.b)*8),z+=d(W,a)*4,z+=d(W,r)*4;for(const nt of l)z+=d(W,nt)*4;return z},u=t.getBoundingClientRect(),p=!a||u.left+u.width/2<=a.left+a.width/2,m=W=>({left:W?"0px":"auto",right:W?"auto":"0px",top:"46%",bottom:"auto",transform:W?"translate(-108%, -50%)":"translate(108%, -50%)"}),k=[m(p),m(!p),{left:"50%",right:"auto",top:"0px",bottom:"auto",transform:"translate(-50%, -115%)"}];let w=k[0],b=1/0;for(const W of k){Object.assign(e.style,W);const z=f(e.getBoundingClientRect());z<b&&(b=z,w=W)}Object.assign(e.style,w);let g=e.getBoundingClientRect(),y=0,_=0;g.left<i.l&&(y+=i.l-g.left),g.right>i.r&&(y-=g.right-i.r),g.top<i.t&&(_+=i.t-g.top),g.bottom>i.b&&(_-=g.bottom-i.b);const T=W=>{if(!W)return;const z=()=>new DOMRect(g.left+y,g.top+_,g.width,g.height);if(!c(z(),W))return;const nt=Math.min(z().bottom,W.bottom)-Math.max(z().top,W.top),gt=W.bottom+4-z().top,Ge=W.top-4-z().bottom,He=gn=>z().top+gn>=i.t&&z().bottom+gn<=i.b;if(nt<g.height*.5&&He(gt)){_+=gt;return}if(nt<g.height*.5&&He(Ge)){_+=Ge;return}const Re=W.left-i.l,_t=i.r-W.right,$t=W===r?a:r,Ns=(gn,mc)=>{if(!$t)return!1;const qs=mc?gn-g.width:gn,yi=new DOMRect(qs,z().top,g.width,g.height);return c(yi,$t)};_t>=g.width+4&&!Ns(W.right+4,!1)?y+=W.right+4-z().left:Re>=g.width+4&&!Ns(W.left-4,!0)?y+=W.left-4-z().right:He(gt)?_+=gt:He(Ge)&&(_+=Ge)};T(a),T(r);const x=t.querySelector(".inner")?.getBoundingClientRect(),$=x&&x.width>2?x:u,I=Y.querySelector(".pet-cat")?.getBoundingClientRect(),N=Y.querySelector('.item[data-kind="sandbox"]')?.getBoundingClientRect(),U=Y.querySelector('.item[data-kind="yard-bench"]')?.getBoundingClientRect(),F=[...Y.querySelectorAll('.item[data-kind="yard-swing"], .item[data-kind="picnic-blanket"], .item[data-kind="lemonade-cart"], .item[data-kind="tulip-bed"]')].map(W=>W.getBoundingClientRect()),oe=G.querySelector(".yardDoor"),Ee=oe?[oe,oe.querySelector(".yardHintLabel"),oe.querySelector(".doorArt")].map(W=>W?.getBoundingClientRect()):[],ze=document.getElementById("secrets"),be=ze&&ze.offsetParent?ze.getBoundingClientRect():void 0,O=be&&be.width>2&&be.left<i.r&&be.right>i.l&&be.top<i.b&&be.bottom>i.t?be:void 0,B=O?new DOMRect(O.left-8,O.top-8,O.width+16,O.height+16):void 0,J=[a,r,I,N,U,B,...F,...Ee].filter(W=>!!W&&W.width>2&&W.height>2),V=new DOMRect(g.left+y,g.top+_,g.width,g.height),Q=$.left+$.width/2,q=$.top+$.height/2,se=W=>Math.hypot(W.left+W.width/2-Q,W.top+W.height/2-q),Le=W=>{const z=Math.min(W.right,$.right)-Math.max(W.left,$.left),nt=Math.min(W.bottom,$.bottom)-Math.max(W.top,$.top);return z>1&&nt>1},_e=W=>W.left>=i.l-.5&&W.right<=i.r+.5&&W.top>=i.t-.5&&W.bottom<=i.b+.5&&J.every(z=>!c(W,z))&&!Le(W);let Ze=V;if(!_e(V)||se(V)>150){const W=[],z=(Ge,He)=>{let Re=Ge,_t=He;Re<i.l&&(Re=i.l),_t<i.t&&(_t=i.t),Re+g.width>i.r&&(Re=Math.max(i.l,i.r-g.width)),_t+g.height>i.b&&(_t=Math.max(i.t,i.b-g.height)),W.push(new DOMRect(Re,_t,g.width,g.height))};z($.left+($.width-g.width)/2,$.top-g.height-8),z($.right-g.width,$.top-g.height-6),z($.left,$.top-g.height-6),a&&z(a.right+6,$.top-g.height-8),U&&z(U.left-g.width-6,U.top-g.height-6),a&&U&&z(a.right+6,U.top-g.height-6),a&&(z(a.left-12,a.top-g.height-8),z(i.l,a.top-g.height-10),z(a.left+(a.width-g.width)/2,a.top-g.height-8)),z(i.r-g.width,$.top-g.height-6),z($.right+8,$.top+($.height-g.height)/2),z($.left-g.width-8,$.top+($.height-g.height)/2),z(V.left,V.top);for(const Ge of[g.width*.65,g.width*1.05,88,120,155])for(let He=0;He<8;He++){const Re=He*Math.PI/4;z(Q+Math.cos(Re)*Ge-g.width/2,q+Math.sin(Re)*Ge-g.height/2)}const nt=Ge=>{let He=1/0,Re=null;for(const _t of W){if(!_e(_t)||se(_t)>Ge)continue;const $t=se(_t);$t<He&&(He=$t,Re=_t)}return Re},gt=nt(170)??nt(360);if(gt)Ze=gt;else if(!_e(V)){let Ge=null,He=1/0;for(const Re of W){if(Re.left<i.l-.5||Re.right>i.r+.5||Re.top<i.t-.5||Re.bottom>i.b+.5)continue;const $t=(Le(Re)?1e4:0)+J.reduce((Ns,gn)=>Ns+d(Re,gn),0)+se(Re);$t<He&&(He=$t,Ge=Re)}Ge&&(Ze=Ge)}}y+=Ze.left-V.left,_+=Ze.top-V.top,(y||_)&&(e.style.transform=`${e.style.transform} translate(${(y/n).toFixed(1)}px, ${(_/n).toFixed(1)}px)`)}function JP(e,t){e.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.appendChild(n),mi(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const zi=new Map;function eA(){const e=new Set,t=ty();if(t){e.add(t.key);const n=yv(t.dog.name,Date.now()),s=le[t.item.kind],i=(s?Ws(s,t.item.y):Math.min(t.item.y,Ie-Z1))-(n==="peek"?24:2);let a=zi.get(t.key);if(!a||!a.el.isConnected){a?.el.remove();const l=document.createElement("div");l.className="pet pet-dog kenneled",l.dataset.dog="kennel:"+t.key,Y.appendChild(l),l.addEventListener("pointerdown",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),c.preventDefault())}),l.addEventListener("click",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),JP(l,`${l.dataset.name??"Puppy"} is resting`))}),a={el:l,pose:"",look:"",x:t.item.x,y:i},zi.set(t.key,a)}const r=n==="rest"?"sleep":"sit";if(a.pose!==r||a.look!==n+t.dog.breed){for(const l of[...a.el.children])l.matches(".bubble, .kennelBtn")||l.remove();a.el.insertAdjacentHTML("afterbegin",`<div class="inner">${ga(t.dog.breed,r,pa(t.dog.breed,r))}</div>${n==="rest"?'<div class="zzz"><b>Zzz</b><i>z</i><i>z</i><i>z</i></div>':""}`),a.pose=r,a.look=n+t.dog.breed}a.el.dataset.name=t.dog.name,a.el.classList.toggle("rest",n==="rest"),a.el.classList.toggle("peek",n==="peek"),a.x=t.item.x,a.y=i,zs(a.el,t.item.x,i,100,77),a.el.style.zIndex=String(1e3+t.item.z+1),oy(a.el,t.key,!0)}for(const[n,s]of zi)e.has(n)||(s.el.remove(),zi.delete(n))}let de=null,kr="",ad=0,Qh=0,Wr={x:0,perch:0,leap:!1};const tA=562;function iy(e){return(e.rooms[e.currentRoom]?.items.filter(n=>n.kind==="cat-tower")??[]).reduce((n,s)=>!n||s.z>=n.z?s:n,null)}function M0(e){return e==="cat-bed"||e==="pet-bed"||e==="dog-bed"||e==="pack:cat-bed"||/(?:^|:)cat-bed$|(?:^|:)pet-bed$/.test(e)}function nA(e){const t=e.rooms[e.currentRoom]?.items??[],n=t.filter(a=>M0(a.kind)),s=t.filter(a=>a.kind==="bed"),o=(n.length?n:s).reduce((a,r)=>!a||r.z>=a.z?r:a,null);if(!o)return null;const i=le[o.kind];return{x:o.x,y:o.y,h:i?Je(i)*Fe(o):80,pet:M0(o.kind)}}function sA(){const e=E.get();!e.cat||e.cat.room!==e.currentRoom||!iy(e)||(Qh=performance.now()+900,C.boing(),v?.fx({k:"leap"}))}function oA(){const e=E.get(),t=A==="house"?e.cat:null;if(!t||t.room!==e.currentRoom){de&&(de.remove(),de=null,kr="",ad=0);return}(!de||!de.isConnected)&&(de=document.createElement("div"),de.className="pet pet-cat",Y.appendChild(de),kr="",de.addEventListener("pointerdown",I=>{I.stopPropagation(),I.preventDefault()}),de.addEventListener("click",I=>{I.stopPropagation(),ry(),v&&v.fx({k:"purr"})}));const n=iy(e),s=n?null:nA(e),o=n?le[n.kind]:void 0,i=n&&o?Je(o)*Fe(n):0,a=bv(t,Date.now(),n?{x:n.x}:null,s?{x:s.x}:null,Mn()),r=!!n&&performance.now()<Qh,l=r?2:a.perch,c=r&&n?n.x:a.x,d=r?"play":a.mood,f=de.classList.contains("soc-foot"),u=f||d==="nap"?"nap":d==="walk"?"stand":"sit",p=u+t.coat+(l?"p":"")+(f?"f":"");if(p!==kr){const I=[...de.querySelectorAll(".bubble, .heart")];de.innerHTML=`<div class="inner">${ei(t.coat,u,Xo(t.coat,u))}</div>${u==="nap"?'<div class="zzz"><i>z</i><i>z</i><i>z</i></div>':""}`;for(const N of I)de.appendChild(N);kr=p}if(l>0&&ad===0){de.classList.add("hop");const I=de;setTimeout(()=>I.classList.remove("hop"),420)}ad=l,de.dataset.name=t.name,de.dataset.mood=d,de.dataset.perch=String(l),de.dataset.leap=r?"1":"0",de.dataset.curl=a.curl?"1":"0";const m=f?e.rooms[e.currentRoom]?.items.find(I=>I.kind==="bed"):void 0;de.classList.toggle("walking",d==="walk"),de.classList.toggle("groom",d==="groom"),de.classList.toggle("play",d==="play"&&!r),de.classList.toggle("leap",r),de.classList.toggle("flipped",f?!!m?.flip:a.flip),de.classList.toggle("curl",a.curl===1||f),Y.querySelectorAll(".item.toy-live").forEach(I=>I.classList.remove("toy-live")),n&&d==="play"&&l&&!r&&Y.querySelector(`.item[data-id="${n.id}"]`)?.classList.add("toy-live");const k=window.__pinCat,w=!!(k&&Number.isFinite(k.x)),b=w&&Number.isFinite(k.y)?k.y:tA,g=!w&&l&&n?mv(n.y,i,l):!w&&a.curl&&s?s.y-s.h*(s.pet?.38:.2):b,y=e.currentRoom==="backyard"&&!l,_=!w&&l?92:y?115:128,T=!w&&l?110:y?135:150,x=w?k.x:e.currentRoom==="backyard"?bs.x:ay(c,T/2),$=!w&&e.currentRoom==="backyard"&&!l?bs.y:g;zs(de,x,$,T,_),de.style.zIndex=String(4e3+Math.round($)),Wr={x,perch:l,leap:r}}function ay(e,t){const n=E.get().currentRoom,s=n==="backyard"?jg:n==="living"?Fg:null;if(!s)return e;const o=s.x-s.w/2-t-16,i=s.x+s.w/2+t+16;return e<=o||e>=i?e:e<s.x?o:i}function ry(){if(!de)return;C.purr(),setTimeout(()=>C.meow(),250),de.querySelector(".bubble")?.remove();const e=document.createElement("div");e.className="bubble petBubble",e.textContent=`${de.dataset.name} purrs ♥`,de.appendChild(e),mi(),setTimeout(()=>e.classList.add("out"),1500),setTimeout(()=>e.remove(),1900),de.classList.remove("happy"),de.offsetWidth,de.classList.add("happy");for(let t=0;t<5;t++){const n=document.createElement("div");n.className="heart",n.textContent="♥",n.style.left=20+Math.random()*60+"%",n.style.animationDelay=t*.12+"s",n.style.color=["#ff6b9a","#ff8fab","#e879c6"][t%3],de.appendChild(n),setTimeout(()=>n.remove(),1800)}}function iA(e,t){if(t.k==="zoo"||t.k==="apple"||t.k==="honk"||t.k==="hen"){$A(t);return}t.k==="trick"?ey(t.owner,t.v):t.k==="purr"?A==="house"&&ry():t.k==="leap"?A==="house"&&(Qh=performance.now()+900):t.k==="ball"?J2(e,t.x,t.y):t.k==="splash"&&K2(t.x)}function ly(e){const t=Math.min(.05,Math.max(0,(e-v0)/1e3));v0=e;try{UP(e,t),eA(),oA(),MA(e,t),KS(t),d1()}catch{}requestAnimationFrame(ly)}function aA(){return v?v.view(v.myHouseId())?.cat??null:te.get().cat??null}function Nh(){return v?v.players.get(v.pid)?.dog??null:te.get().dog??null}function Qi(e){if(v){const t=v.myHouseId();t&&v.dispatch(t,e)}else te.dispatch(e)}const vl=()=>A==="house"&&(!v||Ae===te||ge===v.myHouseId());function rA(e="cat"){const t=aA(),n=Nh(),s=te.get().characters,o={tab:e,coat:t?.coat??0,catName:t?.name??"",breed:n?.breed??0,dogName:n?.name??"",owner:n?.owner??s[0]?.id,err:"",bye:!1},i=en("",(l,c)=>{const d=p=>l.closest(`[${p}]`)?.getAttribute(p);if(d("data-pt")){o.tab=d("data-pt"),o.err="",o.bye=!1,r();return}if(d("data-coat")!=null){o.coat=+d("data-coat"),C.click(),r();return}if(d("data-breed")!=null){o.breed=+d("data-breed"),C.click(),r();return}if(d("data-cname")){o.catName=d("data-cname"),C.click(),r();return}if(d("data-dname")){o.dogName=d("data-dname"),C.click(),r();return}if(d("data-owner")){o.owner=d("data-owner"),C.click(),r();return}const f=d("data-pa");if(!f)return;const u=(i.root.querySelector("#petName")?.value??"").trim();if(f==="adoptCat"||f==="adoptDog"){const p=u||(f==="adoptCat"?o.catName:o.dogName),m=gg(p);if(!m){o.err=p?"Hmm, try a different name!":"Pick a name first!",C.pop(),r();return}if(f==="adoptCat"){const k=vl(),w={name:m,coat:o.coat,room:k?E.get().currentRoom:t?.room??"living",x:k?Math.max(200,Math.min(pe-200,ae+K/2)):t?.x??1200};Qi({type:"cat/set",cat:w}),C.meow(),c(),Z(t?`${m} looks great! 🐱`:k?`${m} moved in! 🐱`:`${m} is waiting at your house! 🐱`)}else{const k=v?{name:m,breed:o.breed}:{name:m,breed:o.breed,owner:o.owner};v?(v.setDog(k),A==="park"&&Eo()):te.dispatch({type:"dog/set",dog:k}),C.woof(),c(),Z(n?`${m} looks great! 🐶`:`${m} is your new best friend! 🐶`)}return}if(f==="callCat"){Qi({type:"cat/move",room:E.get().currentRoom,x:Math.max(200,Math.min(pe-200,ae+K/2))}),C.meow(),c();return}if(f==="kennelDog"){zh(),c();return}if(f==="bye"){if(!o.bye){o.bye=!0,r();return}o.tab==="cat"?Qi({type:"cat/set",cat:null}):(Qi({type:"dog/kennel",item:null}),v?v.setDog(null):te.dispatch({type:"dog/set",dog:null}));const p=o.tab==="cat"?t?.name:n?.name;c(),Z(`${p||"They"} went to live with a kind friend 💛`);return}},"wide pets"),a=i.root.querySelector(".card");function r(){const l=o.tab==="cat",c=l?t:n,d=l?tv:nv,f=l?o.catName:o.dogName,u=i.root.querySelector("#petName")?.value??"";a.innerHTML=`${tn}<h2>Pets</h2>
      <div class="petTabs"><button data-pt="cat" class="${l?"on":""}">🐱 Cat</button><button data-pt="dog" class="${l?"":"on"}">🐶 Dog</button></div>
      <p class="hint small">${l?v?"Your cat lives in your house. Friends can see her when they visit!":"Your cat lives in your house. She naps, purrs, and plays!":v?"Your dog follows you everywhere: the street, friends' houses, and the park!":"Your dog follows you around the house and to the park!"}</p>
      <div class="petRow"><div class="petPreview">${l?ei(o.coat,"sit",Xo(o.coat,"sit")):ga(o.breed,"stand",pa(o.breed,"stand"))}</div>
        <div class="swatches">${(l?xd:Md).map((p,m)=>`<button ${l?"data-coat":"data-breed"}="${m}" class="${m===(l?o.coat:o.breed)?"on":""}"><div>${l?ei(m,"sit",Xo(m,"sit")):ga(m,"stand",pa(m,"stand"))}</div><span>${p.name}</span></button>`).join("")}</div></div>
      <div class="label">Name</div>
      <div class="nameChips">${d.map(p=>`<button ${l?"data-cname":"data-dname"}="${p}" class="${p===f?"on":""}">${p}</button>`).join("")}</div>
      <input id="petName" class="petName" maxlength="14" autocomplete="off" placeholder="…or type a name" value="${me(u)}"/>
      ${o.err?`<p class="err" id="petErr">${me(o.err)}</p>`:""}
      ${!l&&!v&&s.length>1?`<div class="label">Who does your dog follow?</div><div class="walkers">${s.map(p=>`<button data-owner="${p.id}" class="${p.id===o.owner?"on":""}">${St(p)}</button>`).join("")}</div>`:""}
      <div class="petBtns"><button class="go" data-pa="${l?"adoptCat":"adoptDog"}" id="adoptBtn">${c?"Save":"Adopt! 💛"}</button>
        ${l&&t&&vl()?'<button data-pa="callCat" id="callCat">Here, kitty!</button>':""}
        ${!l&&n?`<button data-pa="kennelDog" id="kennelDog">${cc(Uh())?"Come, puppy!":"Kennel"}</button>`:""}
        ${c?`<button class="danger" data-pa="bye">${o.bye?"Tap again to say goodbye":"Find a new home"}</button>`:""}</div>`}r()}L("btnPets").addEventListener("click",()=>rA(A==="house"?"cat":"dog"));requestAnimationFrame(ly);window.__pets=()=>{const e=ty(),t=e?zi.get(e.key):void 0;return{dogs:[...ps.keys()],dogPos:Object.fromEntries([...ps].map(([n,s])=>[n,{x:Math.round(s.x),y:Math.round(s.y)}])),cat:de?{mood:de.dataset.mood,name:de.dataset.name,perch:Wr.perch,x:Math.round(Wr.x),leap:Wr.leap,curl:de.dataset.curl==="1"}:null,kennel:e&&t?{x:Math.round(t.x),y:Math.round(t.y),pose:t.pose,name:e.dog.name,item:e.item.id}:null,dogKennel:E.get().dogKennel??null,fetch:Qe?.phase??null,ball:us,view:A}};function pn(){return L("ranch").clientHeight/Oa}let Bt=[];const Ma=e=>String(100+Math.round(e)),cy=220,lA=cy*130/160,dy=156,cA=dy*130/160,dA=.6,fA=3.5,hA=3,L0=[46.3,46.3,48.7,49.7,53],uA=[0,0,0,0,0],pA=4,gA=16,uf=10,xs=new Map,Vr=new Map;function _l(e,t,n=uf){const s=(e-Lt.x)/(Lt.rx+n),o=(t-Lt.y)/(Lt.ry+n);return s*s+o*o<1}function rd(e,t,n,s){for(let o=0;o<=18;o++){const i=o/18;if(_l(e+(n-e)*i,t+(s-t)*i))return!0}return!1}function $l(e,t){return{x:Math.max(70,Math.min(Fh()-70,e)),y:Math.max(fo,Math.min(Yn,t))}}function mA(e,t){const n=$l(t.x,t.y);if(_l(n.x,n.y,6))return null;if(!rd(e.x,e.y,n.x,n.y))return[n];const s=Lt.x-Lt.rx-uf-28,o=Lt.x+Lt.rx+uf+28;let i=null,a=1/0;for(const r of[fo+1,Yn-2]){const l=[];let c=e.x,d=e.y;const f=(w,b)=>{const g=$l(w,b);l.push(g),c=g.x,d=g.y};rd(c,d,c,r)&&f(c<Lt.x?s:o,d),Math.abs(d-r)>3&&f(c,r),Math.abs(c-n.x)>3&&f(n.x,r),l.push(n);let u=!0,p=e.x,m=e.y,k=0;for(const w of l){if(rd(p,m,w.x,w.y)||_l(w.x,w.y,4)){u=!1;break}k+=Math.hypot(w.x-p,w.y-m),p=w.x,m=w.y}u&&k<a&&(i=l,a=k)}return i}function fy(e,t){const n=En();if(!n)return;const s={x:Math.max(60,Math.min(Fh()-60,e)),y:Math.max(fo,Math.min(Yn,t))};if(n.ride!==void 0&&n.where==="ranch"){const o=mA(n,s);if(!o){Z("The horse won't splash through the pond!"),C.pop();return}Bt=o}else Bt=[s]}function yA(e){if(e.look2)return E7(e.look2);const t=e.pants,n="#5a3d5c",s=(o,i,a,r)=>`<path class="${o}" d="${i}" fill="none" stroke="${n}" stroke-width="${a}" stroke-linecap="round"/><path class="${o} cloth" d="${i}" fill="none" stroke="${t}" stroke-width="${r}" stroke-linecap="round"/>`;return`<svg class="rideleg" viewBox="0 0 160 130">${s("thigh","M66 56 L102 66",13,8)}${s("shin","M102 68 L106 104",12,7.2)}<circle class="knee" cx="102" cy="67" r="6.2" fill="${t}" stroke="${n}" stroke-width="3.5"/><ellipse class="shoe" cx="116" cy="106" rx="11" ry="5.2" fill="${n}"/></svg>`}function Ms(){return document.body.classList.contains("phone")&&document.body.classList.contains("phone-portrait")&&!je}function dc(){if(!Ms())return D0.map((t,n)=>n);const e=[0,2,4];for(const t of _s("ranch")){const n=t.p.ride;n!==void 0&&e.indexOf(n)<0&&e.push(n)}return e}function Is(e){if(!Ms())return D0[e];const t=dc(),n=t.indexOf(e),s=t.length,o=n<0?0:n,i=qh().w/2,a=2400+i+18,r=3080-i-18;return s<=1?Math.round((a+r)/2):Math.round(a+(r-a)*o/(s-1))}function qh(){return Ms()?{w:131,h:106}:{w:150,h:122}}function xl(e,t,n){const s=pn(),{w:o,h:i}=qh();e.style.left=(t-o/2)*s+"px",e.style.top=(n-i)*s+"px",e.style.width=o*s+"px",e.style.height=i*s+"px",e.style.zIndex=Ma(n)}function bA(){if(A!=="ranch"||je||!document.body.classList.contains("phone"))return;const e=new Set(dc());document.querySelectorAll("#ranchWorld .horse").forEach(t=>{const n=+t.dataset.horse;t.classList.toggle("stallOff",Ms()&&!e.has(n)),!(!e.has(n)||xs.has(n)||t.classList.contains("away"))&&xl(t,Is(n),ho)})}function wA(e,t,n){if(xs.has(e)||Math.hypot(t-Is(e),n-ho)<26)return;xs.set(e,{x:t,y:n});const s=document.querySelector(`#ranchWorld .horse[data-horse="${e}"]`);s&&(s.classList.add("trotting"),s.classList.remove("away"),s.classList.toggle("flipped",Is(e)<t),xl(s,t,n))}function kA(e,t,n){const s=n?-1:1;for(const o of[s*118,-s*118,s*160,-s*78])for(const i of[0,30,-26,48]){const a=$l(e+o,t+i);if(!(Math.hypot(a.x-e,a.y-t)<50)&&!_l(a.x,a.y,8))return a}return $l(e,t)}let E0=0,hy=0;const fc=()=>v?v.now():Date.now(),hc=()=>Ef(v?v.ranch.plots:te.get().garden),qa=()=>Lf(v?v.players.get(v.pid)?.basket:te.get().basket),Fh=()=>je?xf:Sa,uy=()=>je?"barn":"ranch",py=()=>{const e=new Map;for(const t of _s("ranch"))t.p.ride!==void 0&&e.set(t.p.ride,t);return e};function pf(e){const t={taken:"A friend just planted there!",wet:"Already watered 💧",notReady:"Still growing! 🌱",full:"Your basket is full!",slow:"The hen is laying… try again!",none:"Your basket has none left",nohouse:"Go home to put it in your room"};t[e]&&(Z(t[e]),C.pop())}function Go(e){if(v){const o=ud(hc(),qa(),e,fc(),e.op==="egg"?E0:0);return typeof o=="string"?(pf(o),!1):(e.op==="egg"&&(E0=Date.now()),v.ranchOp(e),!0)}const t=te.get(),n=Date.now(),s=ud(Ef(t.garden),Lf(t.basket),e,n,t.lastEgg??0);return typeof s=="string"?(pf(s),!1):(te.dispatch({type:"ranch/op",op:e,now:n}),uc(!0),Gh(),!0)}function La(e=!1){const t=A==="ranch"&&je&&!e;Po(),L("ranch").classList.remove("hidden"),Qe=null,Bt=[],A="ranch",je=e;const n=e?{where:"barn",x:170,y:560,flip:!1}:{where:"ranch",x:t?dd:130,y:t?520:565,flip:!1};v?tt(n):Qt=n,L("streetTitle").textContent=e?"The Barn":"Rainbow Ranch",Ln(),jh(),requestAnimationFrame(()=>{const s=L("ranchScroll"),o=pn();s.scrollLeft=t?Math.max(0,dd*o-s.clientWidth/2):0,mf()}),setTimeout(mf,650),Na(L("ranch")),e?C.swish():C.sparkle()}L("btnHopOff").addEventListener("click",()=>gy());function jh(){const e=pn(),t=L("ranchWorld"),n=o=>o*e+"px",s=(o,i,a,r)=>`left:${n(o-a/2)};top:${n(i-r)};width:${n(a)};height:${n(r)};z-index:${Ma(i)}`;if(t.style.width=Fh()*e+"px",t.style.height=Oa*e+"px",t.style.setProperty("--sc",String(e)),je){t.innerHTML=PE()+`<div class="sceneArtHost" id="ranchArt"></div><button class="rprop barnExit" data-r="exit" aria-label="Go outside" style="${s(127,444,206,244)}"><span class="exitHint"><span>Outside ☀️</span></span></button>`+oo.map((o,i)=>`<button class="animal" data-animal="${i}" aria-label="${w1[i].name}" style="${s(Mf[i],Sb+30,128,107)}">${Bd(i,jd(i))}</button>`).join("")+[300,1244].map(o=>["carrot","apple","hay"].map((i,a)=>`<button class="bucket" data-feed="${i}" aria-label="${i} bucket" style="${s(o+a*56,592,54,62)}">${$E(i)}</button>`).join("")).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',ko(L("ranchArt"),"barn",t),Ls(),ft();return}t.innerHTML=mE()+'<div class="sceneArtHost" id="ranchArt"></div>'+yE().replace("<svg ",`<svg style="z-index:${Ma(bE)}" `)+`<button class="rprop barnDoor" data-r="barn" aria-label="Go into the barn" style="${s(dd,472,150,150)}"><span class="doorHint"><span>Petting zoo inside! 🐐</span></span></button><button class="rprop windmill" data-r="mill" aria-label="Windmill" style="${s(1540,478,150,240)}">${EE}</button><button class="rprop henHouse" data-r="egg" aria-label="Hen house" style="${s(715,482,180,170)}">${Yi("hen-house",wE)}</button><button class="rprop tractor" data-r="honk" aria-label="Tractor" style="${s(900,580,170,130)}">${Yi("tractor",kE)}</button><button class="rprop appleTree" data-r="apple" aria-label="Apple tree" style="${s(2085,482,240,300)}">${Yi("apple-tree",vE)}</button>`+Tb.map((o,i)=>{const a=qh();return`<button class="horse${Ms()&&dc().indexOf(i)<0?" stallOff":""}" data-horse="${i}" aria-label="${il[i].name} horse" style="${s(Is(i),ho,a.w,a.h)}">${nh(i,!1,dh(i))}</button>`}).join("")+Array.from({length:fd},(o,i)=>`<button class="plot" data-plot="${i}" aria-label="Garden plot" style="${s(Ab(i),594,66,86)}"></button>`).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',ko(L("ranchArt"),"ranch",t),uc(!0),Ls(),ft()}const vr=[];function uc(e=!1){if(A!=="ranch"||je)return;const t=hc(),n=fc();document.querySelectorAll("#ranchWorld .plot").forEach(s=>{const o=+s.dataset.plot,i=t[o]??null,a=Dl(i,n),r=JSON.stringify(i)+a;!e&&vr[o]===r||(vr[o]!==void 0&&vr[o]!==r&&a>0&&(s.classList.remove("grow"),s.offsetWidth,s.classList.add("grow")),vr[o]=r,s.innerHTML=_1(i,a,o),s.dataset.stage=i?String(a):"empty")})}function Ls(){const e=document.getElementById("ravatars");if(!e||A!=="ranch")return;const t=pn(),n=new Set,s=new Set;let o=!1;for(const i of _s(uy())){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&Y2(a));const r=JSON.stringify(i.look)+i.name;if(a.dataset.look!==r){const p=a.querySelector(".bubble");a.innerHTML=i.name?Ih(i.look,i.name):`<div class="inner">${St(i.look)}</div>`,p&&a.appendChild(p),a.dataset.look=r,a.dataset.ride=""}const l=i.p.ride,c=(As[i.look.size]??1)*t*.95*(l!==void 0?dA:1),d=Xt*c,f=Ot*c;if(a.dataset.ride!==String(l??"")&&(a.querySelector(".mount")?.remove(),l!==void 0&&a.insertAdjacentHTML("afterbegin",`<div class="mount" data-mount="${l}">${nh(l,!0,dh(l,!0))}${yA(i.look)}</div>`),a.dataset.ride=String(l??"")),a.classList.toggle("riding",l!==void 0),l!==void 0){s.add(l),i.mine&&(o=!0),Vr.set(l,{x:i.p.x,y:i.p.y});const p=Ms()?dy:cy,m=Ms()?cA:lA,k=p*t,w=m*t,b=a.querySelector(".mount"),g=!!b.querySelector("img.horsesprite");b.classList.toggle("painted",g),b.style.width=k+"px",b.style.height=w+"px";const y=l??0,_=g?uA[y]??0:0,T=(i.p.flip?-_:_)/160*k;b.style.left=(d-k)/2+T+"px",b.style.top=f-w+"px";const x=Number(a.querySelector(".shirt")?.getAttribute("data-hem")??126),$=g?L0[y]??L0[0]:Number(b.querySelector(".saddle")?.getAttribute("data-top")??43);b.dataset.saddleTop=String($);const I=(x+fA/2)/160*f,N=f-w+($-hA/2)/130*w;a.style.setProperty("--lift",I-N+"px");const U=b.querySelector(".rideleg");U&&(U.style.left="0",U.style.top="0",U.style.width="100%",U.style.height="100%",g?(U.style.transformOrigin="48% 38%",U.style.transform=`translate(${pA/160*100}%, ${gA/130*100}%) rotate(22deg)`):(U.style.transformOrigin="",U.style.transform=""))}else a.style.removeProperty("--lift");const u=parseFloat(a.dataset.lx??"NaN");Number.isFinite(u)&&Math.abs(u-i.p.x)>2&&(a.classList.add("moving"),clearTimeout(+(a.dataset.mt??0)),a.dataset.mt=String(window.setTimeout(()=>a.classList.remove("moving"),260))),a.dataset.lx=String(i.p.x),Yl(a,i.p.x*t-d/2+"px",i.p.y*t-f+"px"),a.style.width=d+"px",a.style.height=f+"px",a.style.zIndex=Ma(i.p.y),a.classList.toggle("flipped",i.p.flip),Ba(a,i.look,i.mine)}if(e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),document.body.classList.contains("phone")){const i=new Set(dc());document.querySelectorAll("#ranchWorld .horse").forEach(a=>{a.classList.toggle("stallOff",Ms()&&!i.has(+a.dataset.horse))})}document.querySelectorAll("#ranchWorld .horse").forEach(i=>{const a=+i.dataset.horse;s.has(a)?(i.classList.add("away"),xs.delete(a)):i.classList.remove("away")});for(const[i,a]of[...Vr])s.has(i)||(wA(i,a.x,a.y),Vr.delete(i));document.body.classList.toggle("riding",o),To()}function vA(e){const t=En();if(!t||t.where!=="ranch")return;const n=py().get(e);if(n&&!n.mine){Z("Someone is riding!"),C.pop();return}if(t.ride!==void 0){if(n?.mine||t.ride===e){gy();return}fy(Is(e),Math.min(Yn,ho+8));return}Bt=[],xs.delete(e),dn({where:"ranch",x:Is(e),y:Math.min(Yn,ho+8),flip:!1,ride:e}),C.neigh(),Z(`You're riding ${il[e].name}! Tap the ground to gallop 🐴`)}function gy(){const e=En();if(!e||e.ride===void 0)return;const t=e.ride,{ride:n,...s}=e;Bt=[];const o=kA(s.x,s.y,s.flip);Vr.set(t,{x:s.x,y:s.y}),dn({...s,x:o.x,y:o.y}),C.drop()}function Zh(e,t){const n=e<oo.length?document.querySelector(`#ranchWorld .animal[data-animal="${e}"]`):document.querySelector(`#ranchWorld .horse[data-horse="${e-oo.length}"]:not(.away)`)??document.querySelector(`#ravatars .mount[data-mount="${e-oo.length}"]`);if(!n||A!=="ranch")return;const s=e>=oo.length,o=s?{say:"Neigh! ♥",snd:"neigh"}:w1[e];n.classList.remove("hop","munch"),n.offsetWidth,n.classList.add(t?"munch":"hop"),setTimeout(()=>n.classList.remove("hop","munch"),1400),n.querySelector(".abubble")?.remove();const i=document.createElement("div");i.className="bubble petBubble abubble",i.textContent=t?`Yum! Munch munch ${t===1?"🥕":t===2?"🍎":"🌾"}`:o.say,n.appendChild(i),mi(),setTimeout(()=>i.classList.add("out"),1400),setTimeout(()=>i.remove(),1800);for(let a=0;a<(t?6:4);a++){const r=document.createElement("div");r.className="heart",r.textContent="♥",r.style.left=15+Math.random()*70+"%",r.style.animationDelay=a*.12+"s",r.style.color=["#ff6b9a","#ff8fab","#e879c6","#b197fc"][a%4],n.appendChild(r),setTimeout(()=>r.remove(),1900)}C[o.snd]?.(),t&&setTimeout(()=>C.munch(),250)}function my(){const e=document.querySelector("#ranchWorld .henHouse");e&&(e.classList.remove("lay"),e.offsetWidth,e.classList.add("lay"),C.cluck())}function _A(){const e=document.querySelector("#ranchWorld .henHouse"),t=L("basketChip");if(!e)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=document.createElement("div");o.className="flyEgg",o.innerHTML=ba,document.body.appendChild(o),Object.assign(o.style,{left:n.left+n.width/2-18+"px",top:n.top+n.height*.6+"px"}),requestAnimationFrame(()=>{o.style.left=s.left+s.width/2-18+"px",o.style.top=s.top+"px",o.style.transform="scale(.6) rotate(200deg)"}),setTimeout(()=>{o.remove(),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")},650)}function yy(e){const t=document.getElementById("rfx");if(!t||A!=="ranch")return;const n=pn(),[s,o]=Rp[e]??Rp[0],i=1965+s,a=182+o,r=i+(e%2?26:-22),l=575+e*4,c=document.createElement("button");c.className="fallenApple",c.dataset.feed="apple",c.setAttribute("aria-label","Apple"),c.innerHTML=k1;const d=32*n;Object.assign(c.style,{width:d+"px",height:d+"px",left:i*n-d/2+"px",top:a*n-d/2+"px",zIndex:Ma(l)}),t.appendChild(c),requestAnimationFrame(()=>{c.style.left=r*n-d/2+"px",c.style.top=l*n-d+"px",c.classList.add("fallen")});const f=document.querySelector("#ranchWorld .appleTree");f?.classList.remove("shake"),f?.offsetWidth,f?.classList.add("shake"),C.boing(),setTimeout(()=>c.remove(),12e3)}function by(){const e=document.querySelector("#ranchWorld .tractor");e?.classList.remove("bounce"),e?.offsetWidth,e?.classList.add("bounce"),C.honk()}function $A(e){e.k==="zoo"?Zh(e.a,e.f):e.k==="apple"?yy(e.v):e.k==="honk"?by():e.k==="hen"&&my()}function S0(e,t){const n=document.elementFromPoint(e,t);if(!n)return null;const s=n.closest("[data-animal]");if(s)return+s.dataset.animal;const o=n.closest(".horse:not(.away)");if(o)return oo.length+ +o.dataset.horse;const i=n.closest(".savatar.riding");return i?.dataset.ride?oo.length+ +i.dataset.ride:null}function gf(e,t,n){e.preventDefault(),e.stopPropagation();const s=document.createElement("div");s.className="feedGhost",s.innerHTML=v1[t],document.body.appendChild(s);const o=m=>{s.style.left=m.clientX-30+"px",s.style.top=m.clientY-50+"px"};o(e),C.pick();let i=0;const a=e.clientX,r=e.clientY;n instanceof HTMLElement&&(n.style.visibility="hidden");let l=e.clientX,c=0;const d=L("ranchScroll"),f=()=>{const m=d.getBoundingClientRect(),k=l<m.left+60?-12:l>m.right-60?12:0;k&&i>12&&A==="ranch"&&(d.scrollLeft+=k),c=requestAnimationFrame(f)};c=requestAnimationFrame(f);const u=m=>{if(m.pointerId!==e.pointerId)return;l=m.clientX,i=Math.max(i,Math.hypot(m.clientX-a,m.clientY-r)),o(m),document.querySelectorAll(".feedHover").forEach(w=>w.classList.remove("feedHover")),S0(m.clientX,m.clientY)!==null&&document.elementFromPoint(m.clientX,m.clientY)?.closest(".animal, .horse, .savatar")?.classList.add("feedHover")},p=m=>{if(m.pointerId!==e.pointerId)return;cancelAnimationFrame(c),window.removeEventListener("pointermove",u),window.removeEventListener("pointerup",p),s.remove(),hy=Date.now(),document.querySelectorAll(".feedHover").forEach(b=>b.classList.remove("feedHover"));const k=S0(m.clientX,m.clientY);if(k===null){n instanceof HTMLElement&&(n.style.visibility=""),i<12?Z("Drag the food onto an animal! 🥕"):C.drop();return}if(n==="basket"&&!Go({op:"use",kind:"carrot"}))return;n instanceof HTMLElement&&n.remove();const w=Pb.indexOf(t);Zh(k,w),v?.fx({k:"zoo",a:k,f:w})};window.addEventListener("pointermove",u),window.addEventListener("pointerup",p)}L("ranchWorld").addEventListener("pointerdown",e=>{const t=e.target,n=t.closest(".bucket");if(n)return gf(e,n.dataset.feed,"bucket");const s=t.closest(".fallenApple");if(s)return gf(e,"apple",s);t.closest(".rprop, .animal, .horse, .plot, .pet")&&e.stopPropagation()});L("ranchWorld").addEventListener("click",e=>{const t=e.target;if(!En()||A!=="ranch"||Date.now()-hy<400)return;const s=t.closest("[data-animal]");if(s){const f=+s.dataset.animal;Zh(f,0),v?.fx({k:"zoo",a:f,f:0});return}const o=t.closest("[data-horse]");if(o){vA(+o.dataset.horse);return}const i=t.closest("[data-r]")?.dataset.r;if(i==="egg"){my(),Go({op:"egg"})&&(_A(),C.pickup());return}if(i==="honk"){by(),v?.fx({k:"honk"});return}if(i==="apple"){const f=Math.floor(Math.random()*4);yy(f),v?.fx({k:"apple",v:f});return}if(i==="barn"){La(!0);return}if(i==="exit"){La(!1);return}if(i==="mill"){const f=t.closest(".windmill");f?.classList.remove("whirl"),f?.offsetWidth,f?.classList.add("whirl"),C.swish();return}const a=t.closest("[data-plot]");if(a){xA(+a.dataset.plot,a);return}if(t.closest(".bucket, .fallenApple, .savatar, .pet"))return;const r=L("ranchWorld").getBoundingClientRect(),l=pn(),c=(e.clientX-r.left)/l,d=(e.clientY-r.top)/l;d<400||fy(c,d)});function xA(e,t){const n=hc()[e]??null,s=Dl(n,fc());if(document.querySelector(".seedPick")?.remove(),!n){const o=document.createElement("div");o.className="seedPick",o.innerHTML=`<button data-seed="carrot">${Jl}<span>Carrot</span></button><button data-seed="flower">${fh()}<span>Flower</span></button>`,t.parentElement.appendChild(o),o.style.left=t.offsetLeft+t.offsetWidth/2+"px",o.style.top=t.offsetTop-8+"px",o.addEventListener("pointerdown",i=>i.stopPropagation()),o.addEventListener("click",i=>{i.stopPropagation();const a=i.target.closest("[data-seed]")?.dataset.seed;o.remove(),a&&Go({op:"plant",i:e,seed:a})&&(C.plant(),Z("Planted! Now tap it to water 💧"))}),setTimeout(()=>o.remove(),6e3);return}if(!n.wet){Go({op:"water",i:e})&&(C.water(),t.classList.remove("watering"),t.offsetWidth,t.classList.add("watering"));return}if(s<3){Z("Still growing! 🌱"),C.pop();return}Go({op:"pick",i:e})&&(C.pickup(),Z(n.seed==="carrot"?"A carrot for your basket! 🥕":"Pretty flowers for your basket! 🌸"))}let T0=0;function MA(e,t){if(A!=="ranch")return;const n=Date.now();if(document.querySelectorAll("#ranchWorld .animal").forEach(s=>{const o=+s.dataset.animal,i=pn(),a=n/5200+o*1.7,r=(je?Mf:Eb)[o]+Math.sin(a)*32;s.style.left=(r-s.offsetWidth/i/2)*i+"px",s.classList.toggle("flipped",Math.cos(a)<0),s.classList.toggle("walking",Math.abs(Math.cos(a))>.35)}),e-T0>1e3&&(T0=e,uc()),Bt.length){const s=En();if(!s||s.where!==uy())Bt=[];else{const o=Bt[0],i=s.ride!==void 0?720:300,a=o.x-s.x,r=o.y-s.y,l=Math.hypot(a,r);if(l<6)Bt.shift();else{const c=Math.min(l,i*t),d={...s,x:s.x+a/l*c,y:s.y+r/l*c,flip:Math.abs(a)>2?a<0:s.flip};dn(d);const f=pn(),u=L("ranchScroll"),p=d.x*f-u.scrollLeft;p>-40&&p<u.clientWidth+40&&(p<u.clientWidth*.2||p>u.clientWidth*.8)&&(u.scrollLeft=d.x*f-u.clientWidth/2)}}}for(const[s,o]of xs){const i=document.querySelector(`#ranchWorld .horse[data-horse="${s}"]`);if(!i||i.classList.contains("away")){xs.delete(s);continue}const a=Is(s)-o.x,r=ho-o.y,l=Math.hypot(a,r);if(l<8){xs.delete(s),i.classList.remove("trotting","flipped"),xl(i,Is(s),ho);continue}const c=Math.min(l,460*t);o.x+=a/l*c,o.y+=r/l*c,i.classList.add("trotting"),i.classList.toggle("flipped",a<0),xl(i,o.x,o.y)}}function Gh(){const e=document.getElementById("basketChip");if(!e)return;const t=A==="house"&&(!v||Ae===te||ge===v.myHouseId()),n=qa(),o=n.egg+n.carrot+n.flower>0&&(A==="ranch"||t);e.classList.toggle("hidden",!o),e.classList.toggle("inHouse",A==="house"),o&&(e.innerHTML=`<span class="bIcon">${Yi("basket",xE)}</span><span class="bcount" data-kind="egg">${ba}<b>${n.egg}</b></span><span class="bcount" data-kind="carrot">${Jl}<b>${n.carrot}</b></span><span class="bcount" data-kind="flower">${fh()}<b>${n.flower}</b></span>`)}L("basketChip").addEventListener("pointerdown",e=>{e.target.closest('.bcount[data-kind="carrot"]')&&A==="ranch"&&qa().carrot>0&&gf(e,"carrot","basket")});L("basketChip").addEventListener("click",()=>LA());function LA(){const e=A==="house"&&(!v||Ae===te||ge===v.myHouseId()),t={egg:["Eggs",ba],carrot:["Carrots",Jl],flower:["Flowers",fh()]},n=en("",(o,i)=>{const a=o.closest("[data-take]")?.dataset.take;if(!a)return;if(!e){Z("Take it home to put it in your room! 🏠");return}const r="r"+Math.random().toString(36).slice(2,10),l=Math.max(120,Math.min(pe-120,ae+K/2+(Math.random()-.5)*300));Go({op:"take",kind:a,id:r,room:E.get().currentRoom,x:l})&&(C.drop(),i(),Z("It's in your room! Drag it to a hand to carry it ✋"))},"basketSheet"),s=qa();n.root.querySelector(".card").innerHTML=`${tn}<h2>My Basket</h2><p class="hint small">${e?"Tap one to put it in your room.":"Collect eggs, carrots and flowers at Rainbow Ranch, then take them home!"}</p>
    <div class="basketRows">${H0.map(o=>`<button class="bRow" data-take="${o}" ${s[o]?"":"disabled"}>${t[o][1]}<b>${s[o]}</b><span>${t[o][0]}</span></button>`).join("")}</div>`}window.__ranch=()=>({view:A,inBarn:je,plots:hc().map(e=>e?{seed:e.seed,stage:Dl(e,fc()),wet:!!e.wet}:null),basket:qa(),me:En(),ridden:[...py().keys()]});function EA(){const e=()=>{const s=document.getElementById("phoneNote");if(s&&!s.classList.contains("hidden")&&getComputedStyle(s).display!=="none"){const o=()=>{Rr||!s.classList.contains("hidden")&&getComputedStyle(s).display!=="none"||(s.classList.add("hidden"),Rr=!0,window.removeEventListener("resize",o),Pe.hint())};L("phoneOk").addEventListener("click",()=>setTimeout(o,0),{once:!0}),window.addEventListener("resize",o);return}Rr=!0,Pe.hint()};if(Vi.kind==="none"){e();return}XE();const t=en(JE(Vi.kind,Vi.entries),(s,o)=>{s.closest("#wnGo")&&(C.sparkle(),o())},"whatsNew "+Vi.kind);t.root.querySelector(".card").insertAdjacentHTML("afterbegin",tn);const n=new MutationObserver(()=>{t.root.isConnected||(n.disconnect(),e())});n.observe(document.body,{childList:!0})}setTimeout(EA,500);window.__whatsnew=Vi;window.__hood=()=>v;window.__hood_url=()=>Vl();window.__ui=()=>({view:A,currentHouseId:ge,mode:v?"hood":"solo",play:Pe.mode()});jS({hood:()=>v,view:()=>A,solo:()=>Qt,myPres:ye,setPres:dn,toast:Z,refreshNear:To,sfx:C,goMap:Zo,soloLook:()=>{const e=te.get();return{look:Pa(e.characters[0]??{}),dog:e.dog??null}}});function wy(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n.items)t.add(s.kind);for(const n of e.characters)n.held.left&&t.add(n.held.left.kind),n.held.right&&t.add(n.held.right.kind);return e.baby&&t.add("baby"),[...t]}let _r=null,Yh=()=>!1;function ky(e){return _r||(_r=Os(()=>h(()=>Promise.resolve().then(()=>Nl),void 0)).then(t=>(Yh=t.hasArt,t.boot(location.search,wy(E.get())))).then(t=>{for(let n=0;n<t.length;n++)if(le[t[n]]){Lo();break}A2()}),_r)}function SA(e){const t=new Set(e),n=E.get();let s=!1;for(const o of n.rooms[n.currentRoom].items){const i=le[o.kind];if(!t.has(o.kind)||!i||o.art)continue;const a=Y.querySelector(`.item[data-id="${o.id}"] .inner`);!a||a.querySelector("img.artimg")||(a.innerHTML=Nt(i,!0),s=!0)}cn(n),oc(),s&&A2()}let P0=null;function TA(){if(P0)return;const e=Rs.filter(t=>t.kind!=="people"&&t.icon&&le[t.icon]).map(t=>t.icon);P0=Os(()=>h(()=>Promise.resolve().then(()=>Nl),void 0)).then(t=>t.loadArtKinds(e)).then(()=>C2(),()=>{})}for(const e of["cats","shelf"])document.getElementById(e)?.addEventListener("pointerdown",TA,{once:!0,passive:!0});function PA(){return Os(()=>h(()=>Promise.resolve().then(()=>Nl),void 0)).then(e=>e.boot(location.search,wy(E.get()))).then(e=>{SA(e.filter(t=>!!le[t]))})}Yv();LM();bS();_9();tE(e=>e==="backyard"?fM():null);L("scenery").addEventListener("click",e=>{const t=e.target.closest("[data-yard-go]");t&&Lh(t.dataset.yardGo==="backyard"?"backyard":"living")});const AA=dS(L("skyMount"));window.__sky=AA;ic=p4({layer:Y,stageWrap:L("stageWrap"),get:()=>E.get(),dispatch:e=>E.dispatch(e),clock:()=>v&&Ae!==te?v.now():Date.now(),canSend:()=>!v||Ae===te||!!v.speaksBaby,owner:()=>vh(),inHouse:()=>A==="house",play:()=>Pe.isPlay(),editable:()=>pt(),toRoom:Ne,box:e=>{const t=le[e.kind];return t?{id:e.id,kind:e.kind,x:e.x,footY:Ws(t,e.y),flip:!!e.flip,scale:Fe(e),w:t.w,h:Je(t),z:e.z}:null},holderId:()=>v&&Ae!==te&&v.pid?v.pid:De||E.get().characters[0]?.id||"c1",holderSpot:e=>{const t=E.get(),n=v&&Ae!==te&&v.pid?v.pid:De||t.characters[0]?.id||"",s=e||n,o=(a,r,l,c,d,f)=>{const u=c?.pose==="sit"||c?.pose==="lie"?c.pose:null,p=u==="lie"?t.rooms[t.currentRoom]?.items.find(k=>k.id===c?.item):void 0,m=d&&/^#[0-9a-fA-F]{6}$/.test(d)?d:"#f1c27d";return{x:a.x,y:a.y,flip:r,scale:l>0?l:1,pose:u,lieFlip:!!(u==="lie"&&p?.flip),skin:m,chibi:!!f}},i=t.characters.find(a=>a.id===s&&a.room===t.currentRoom);if(i){const a=ut(i);return o(wt(t.currentRoom,a,i),i.flip,As[i.size]??1,a,i.look2&&i.look2.skin||i.skin,!!i.look2)}if(v&&A==="house"){const a=s===v.pid?ye():v.presence.get(s);if(a&&a.where==="house"&&a.houseId===ge&&a.room===t.currentRoom){const r=qt(s,a),l=v.players.get(s)?.look,c=l?.size??"kid";return o(wt(t.currentRoom,r,a),a.flip,As[c]??1,r,l?.look2&&l.look2.skin||l?.skin||"#f1c27d",!!l?.look2)}}return null},holderHere:e=>{if(!e)return!1;if(E.get().characters.some(s=>s.id===e))return!0;if(!v||Ae===te)return!1;const n=e===v.pid?ye():v.presence.get(e);return!!(n&&n.where==="house"&&n.houseId===ge)},occupied:()=>xo(void 0,v?.pid,!0),locked:()=>ts(null),seatAt:(e,t,n)=>wt(e,t,n)}).render;X1=()=>ic();Lo();Ft();Us();RA();Us();pc();r2();Tr();ui.matches?Cs():Us();requestAnimationFrame(()=>{Us(),pc(),nc()});function RA(){if(!gh)return;const e=Rd(),t=E.get().characters[0];if(!t)return;const n=e==="door";if(E.dispatch({type:"char/update",id:t.id,patch:{...T5(),flip:n?Id.flip:Cd.flip}}),E.dispatch({type:"cat/set",cat:{name:"Clover",coat:3,room:n?"living":"backyard",x:n?Xr:bs.x}}),E.dispatch({type:"dog/set",dog:{name:"Sunny",breed:3,owner:t.id}}),!E.get().rooms.backyard.items.some(s=>s.kind==="yard-swing"))for(const s of P5)E.dispatch({type:"item/add",room:"backyard",item:{id:"yp-"+s.kind,kind:s.kind,x:s.x,y:s.y,flip:!1,z:1,scale:s.scale??1}});if(e!=="sheet"){const s=n?Id:Cd;E.dispatch({type:"char/move",id:t.id,room:n?"living":"backyard",x:s.x,y:s.y}),E.dispatch({type:"room/switch",room:n?"living":"backyard"})}window.__pinCat=n?{x:Xr}:{x:bs.x,y:bs.y},e==="play"?L("modePlay").click():(e==="decorate"||e==="door")&&L("modeDecorate").click(),e==="sheet"&&document.body.insertAdjacentHTML("beforeend",gM()),e==="compare"&&document.body.insertAdjacentHTML("beforeend",yM()),document.body.dataset.yard="ready"}function CA(e){const t=E.get(),n=e==="backyard"?Cd:Id;zt=null;const s=t.characters.find(o=>o.id===De&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(s&&(E.dispatch({type:"char/update",id:s.id,patch:{flip:n.flip}}),E.dispatch({type:"char/move",id:s.id,room:e,x:n.x,y:n.y})),gh&&t.cat&&(E.dispatch({type:"cat/move",room:e,x:e==="backyard"?bs.x:Xr}),window.__pinCat=e==="backyard"?{x:bs.x,y:bs.y}:{x:Xr}),E.dispatch({type:"room/switch",room:e}),v&&Ae!==te){const o=ye();if(o&&o.where==="house"){const i=o.houseId?Ch(o.houseId,e,n):n;tt({...o,room:e,x:i.x,y:i.y,flip:n.flip})}}requestAnimationFrame(()=>pc())}function Kh(){const e=E.get(),t=v&&ye(),n=t&&t.where==="house"?t.x:e.characters.find(o=>o.room===e.currentRoom)?.x;if(n===void 0)return;const s=vy(e,n,ae);Math.abs(s-ae)>.5&&ct(s)}function vy(e,t,n){if(K>=1e3||document.body.classList.contains("phone")||e.currentRoom==="backyard")return n;n=oi(n);const s=90;let o=null;for(const i of e.rooms[e.currentRoom]?.items??[]){const a=le[i.kind];if(!a||a.wall)continue;const r=a.w*Fe(i),l=i.x-r/2,c=i.x+r/2;if(r<160||r>K-2*s||!(l<n&&c>n||l<n+K&&c>n+K))continue;const f=oi(l<n?l-16:c+16-K);t-s<f||t+s>f+K||l<f-1||c>f+K+1||(!o||r>o.w)&&(o={cam:f,w:r})}return e.currentRoom==="living"?IA(e,t,o?o.cam:n,s):o?o.cam:n}function IA(e,t,n,s){let a=(e.rooms.living?.items??[]).flatMap(r=>{const l=le[r.kind];if(!l||l.wall)return[];const c=l.w*Fe(r);return c>=60?[{l:r.x-c/2,r:r.x+c/2,w:c}]:[]}).filter(r=>r.r>n&&r.l<n+K);if(!a.some(r=>r.l<n+8||r.r>n+K-8))return n;for(a.sort((r,l)=>l.w-r.w);a.length;){const r=Math.max(Math.max(...a.map(c=>c.r))+8-K,t+s-K),l=Math.min(Math.min(...a.map(c=>c.l))-8,t-s);if(r<=l){const c=oi(Math.min(l,Math.max(r,n)));if(c>=r-1&&c<=l+1)return c}a=a.slice(0,-1)}return n}function pc(){if(E.get().currentRoom==="backyard"){Wa()?es(!1):Nn();return}if(!gh||Rd()==="sheet"||Rd()==="compare")return;const e=E.get().characters.find(t=>t.room===E.get().currentRoom);e&&ct(e.x-K/2),Nn()}function Nn(){if(Mo)return;const e=G.getBoundingClientRect();if(e.width<20)return;const t=dt()||parseFloat(G.style.getPropertyValue("--yard-sc"))||1;G.style.setProperty("--yard-sc",String(t));const n=[...G.querySelectorAll(".yardDoor")];for(const k of n){k.style.minWidth="",k.style.transform="";const w=k.querySelector(".yardHintLabel");if(!w)continue;w.style.transform="",w.style.translate="",w.style.visibility="";const b=w.querySelector("span");b&&(b.style.transform="");const g=Math.max(13,16/t);w.style.fontSize=g+"px",w.style.lineHeight="1";const y=38/t;w.style.height=y+"px";const _=3/t,T=Math.max(0,(y-_*2-g)/2);w.style.padding=`${T.toFixed(2)}px ${(14/t).toFixed(2)}px`}const s=n[0];if(!s)return;const o=s.querySelector(".doorArt"),i=s.querySelector(".yardHintLabel");s.style.transform="",i&&(i.style.translate="",i.style.visibility="");const a=o&&o.getBoundingClientRect().width>2?o.getBoundingClientRect():s.getBoundingClientRect(),r=Math.min(a.right,e.right)-Math.max(a.left,e.left),l=Math.min(a.bottom,e.bottom)-Math.max(a.top,e.top),c=r>Math.max(16,a.width*.3)&&l>20,f=G.classList.contains("sceneArtOn")&&Pe.isPlay();if(!c&&f){i&&(i.style.visibility="hidden"),Kc(s);return}i&&(i.style.visibility="");const u=6,p=()=>{const k=G.getBoundingClientRect(),w=s.getBoundingClientRect(),b=o?.getBoundingClientRect(),g=i?.getBoundingClientRect(),y=[w,b,g].filter(I=>!!I&&I.width>2&&I.height>2),_=Math.min(...y.map(I=>I.top)),T=Math.max(...y.map(I=>I.bottom));let x=k.left+u,$=k.right-u;for(const I of["nudgeL","nudgeR"]){const N=L(I);if(!N||N.classList.contains("off")||N.offsetParent===null)continue;const U=N.getBoundingClientRect();if(U.width<2||U.height<2)continue;const F=Ee=>Ee.top<U.bottom-1&&Ee.bottom>U.top+1,oe=[w,b].some(Ee=>Ee&&Ee.width>2&&F(Ee));!oe&&(_>=U.bottom-1||T<=U.top+1)||(I==="nudgeL"&&oe?x=Math.max(x,U.right+8):I==="nudgeR"&&oe&&($=Math.min($,U.left-8)))}return{leftLimit:x,rightLimit:$,doorR:w,artR:b,hintR:g}};if(!f){let k=0,w=0;for(;k++<4;){const{leftLimit:b,rightLimit:g,doorR:y,artR:_}=p();let T=0;const x=Math.min(y.left,_&&_.width>2?_.left:y.left),$=Math.max(y.right,_&&_.width>2?_.right:y.right);if(x<b&&(T+=b-x),$+T>g&&(T-=$+T-g),Math.abs(T)<.5)break;w+=T,s.style.transform=`translate(${(w/t).toFixed(1)}px, 0)`}}if(!i){Kc(s);return}const m=i.querySelector("span");if(m){const k=document.createRange();k.selectNodeContents(m);const w=k.getBoundingClientRect(),b=i.getBoundingClientRect(),g=(b.top+b.bottom-(w.top+w.bottom))/2,y=m;w.height>2&&Math.abs(g)>=.1?y.style.transform=`translateY(${(g/t).toFixed(2)}px)`:y.style.transform=""}if(!f){const k=i.getBoundingClientRect(),w=G.getBoundingClientRect();let b=0;if(E.get().currentRoom==="backyard"&&o){const g=o.getBoundingClientRect();g.width>2&&(b+=(g.left+g.right)/2-(k.left+k.right)/2)}k.left+b<w.left+u?b+=w.left+u-(k.left+b):k.right+b>w.right-u&&(b-=k.right+b-(w.right-u)),Math.abs(b)>.5?i.style.translate=`calc(-50% + ${(b/t).toFixed(1)}px) 0`:i.style.translate=""}Kc(s)}ky(E.get().currentRoom);const _y=()=>{const e=jl().size,t=Kr.length,n=L("secrets"),s=n.querySelector(".secCount");s&&(s.textContent=`${e}/${t}`),n.setAttribute("aria-label",`Surprises, ${e} of ${t}`),n2()};function gc(){return window.innerHeight>window.innerWidth+40}function $y(e,t){for(const F of e)F.style.transform="";if(!gc()||!e.length)return;const n=t&&t.clientWidth>20?t.getBoundingClientRect():{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth};if(n.width<20)return;const s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,window.innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,window.innerHeight)-s,l=Math.max(40,i-o),c=Math.max(40,r-a),f=e.map(F=>F.getBoundingClientRect()).filter(F=>F.width>2&&F.height>2);if(!f.length)return;const u=Math.min(...f.map(F=>F.left)),p=Math.max(...f.map(F=>F.right)),m=Math.min(...f.map(F=>F.top)),k=Math.max(...f.map(F=>F.bottom)),w=Math.max(1,p-u),b=Math.max(1,k-m),g=Math.min(1,l/w,c/b);if(g>.995&&u>=o-1&&p<=i+1&&m>=a-1&&k<=r+1)return;const _=e[0].getScreenCTM(),T=_&&Math.hypot(_.a,_.b)||1,x=(u+p)/2,$=(m+k)/2,I=b*g,N=(o+i)/2,U=m>=a&&k<=r?$:Math.min(Math.max($,a+I/2),r-I/2);for(const F of e){const oe=F.getBoundingClientRect(),Ee=(oe.left+oe.right)/2,ze=(oe.top+oe.bottom)/2,be=N+(Ee-x)*g,O=U+(ze-$)*g;F.style.transformBox="fill-box",F.style.transformOrigin="center",F.style.transform=`translate(${((be-Ee)/T).toFixed(2)}px, ${((O-ze)/T).toFixed(2)}px) scale(${g.toFixed(3)})`}}function xy(){if(A!=="gameroom")return;const e=document.getElementById("grScroll");$y([...document.querySelectorAll(".neonSignArt")],e)}function mf(){A!=="ranch"||je||(document.querySelectorAll(".ranchSignArt").forEach(e=>{e.style.transform=""}),ft(),My(),Xh())}function Xh(){if(A!=="ranch"||je)return;const e=document.getElementById("ranchScroll");if(!e)return;const t=e.getBoundingClientRect();document.querySelectorAll(".ranchSignArt").forEach(n=>{const s=n.getBoundingClientRect(),o=Math.min(t.right,innerWidth),i=Math.max(0,t.left-s.left)+Math.max(0,s.right-o);n.style.visibility=s.width>20&&i<8?"visible":"hidden"})}L("ranchScroll").addEventListener("scroll",()=>{A==="ranch"&&!je&&Xh()},{passive:!0});function My(){const e=document.querySelector(".doorHint"),t=document.getElementById("ranchScroll");if(!e||!t)return;e.style.transform="translateX(-50%)";const n=t.getBoundingClientRect(),s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,innerHeight)-s,l=e.getBoundingClientRect();let c=0;l.right>i&&(c-=l.right-i),l.left+c<o&&(c+=o-(l.left+c));let d=0;const f=t.querySelector(".savatar");if(f){const u=f.getBoundingClientRect(),m=f.querySelector(".nametag")?.getBoundingClientRect(),k=!!(m&&m.width>4&&m.height>4),w=k?Math.min(u.top,m.top):u.top,b=k?Math.min(u.left,m.left):u.left,g=k?Math.max(u.right,m.right):u.right,y=l.left+c;l.right+c>b-6&&y<g+6&&l.bottom+d>w-6&&l.top<u.top+u.height*.72&&(d+=w-48-(l.bottom+d))}if(l.top+d<a&&(d+=a-(l.top+d)),document.body.classList.contains("phone-portrait")){const u=document.querySelector(".ranchSign .ranchSignArt");if(u){const p=u.getBoundingClientRect(),m=l.left+c,k=l.right+c,w=l.top+d,b=l.bottom+d;if(p.width>20&&p.height>p.width*.7&&k>p.left+4&&m<p.right-4&&b>p.top+4&&w<p.bottom-4){let y=p.top-16-b;w+y<a&&(y+=a-(w+y));const T=f?.querySelector(".nametag")?.getBoundingClientRect(),x=b+y;!(T&&T.width>4&&T.height>4&&x>T.top-12&&k>T.left-6&&m<T.right+6)&&x<=r&&(d+=y)}}}(c||d)&&(e.style.transform=`translate(calc(-50% + ${c.toFixed(1)}px), ${d.toFixed(1)}px)`)}const Ly=C4({world:mh,roomW:pe,roomH:Ie,currentRoom:()=>E.get().currentRoom,sparkle:()=>C.sparkle(),tap:()=>C.click(),onFound:(e,t)=>{if(_y(),t){const n=L("secrets");n.classList.remove("pulse"),n.offsetWidth,n.classList.add("pulse"),setTimeout(()=>Z("🎁 A secret surprise appeared in your drawer!"),1400),Ft()}}});E.subscribe((e,t)=>{(t.type==="room/switch"||t.type==="game/reset")&&Ly.update()});_y();window.__eggs=()=>({found:[...jl()]});SP();new URLSearchParams(location.search).has("shareqa")&&(window.__share={planShare:Sd,shareActions:Td,recoverShare:Pd,locateSnack:xr,tryPass(e,t){const n=[];if(v){n.push(v.pid);for(const r of v.presence.keys())n.push(r)}const s=E.get().characters.find(r=>r.id===e),o=s?.held.left?.id||s?.held.right?.id||"",i=Sd({state:E.get(),fromId:e,toId:t,playerIds:n});if(!i.ok)return{...i,loc:xr(E.get(),o)};for(const r of Td(i))E.dispatch(r);const a=Pd(E.get(),i);return a&&E.dispatch(a),{ok:!0,loc:xr(E.get(),i.itemId),plan:i}}});const yf={restored:"The saved house had a hiccup, so we opened the last good copy.",unreadable:"We couldn't open the saved house, so we started a new one. The old one is kept safely on this iPad.",full:"This iPad is out of room, so new changes can't be saved yet. Your house is safe for now. To free space, delete old photos or apps in Settings › General › iPad Storage."},ld=te.trouble(),A0=[ld?yf[ld]:"",te.fullAtStart&&ld!=="full"?yf.full:""].filter(Boolean).join(" ");A0&&Lg(A0);te.onTrouble(e=>Lg(yf[e]));
