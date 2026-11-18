(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const q2="modulepreload",j2=function(e){return"/kids-house-game/"+e},Ch={},h=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(n.map(l=>{if(l=j2(l),l in Ch)return;Ch[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":q2,c||(f.as="script"),f.crossOrigin="",f.href=l,r&&f.setAttribute("nonce",r),document.head.appendChild(f),c)return new Promise((u,p)=>{f.addEventListener("load",u),f.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return o.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})},F2="2e4c878364b5",ac="cozy-sw-killed";let Ih=!1;async function Z2(e){try{const t=new AbortController,n=setTimeout(()=>t.abort(),4e3),s=await fetch(e+"sw-switch.json?t="+Date.now(),{cache:"no-store",signal:t.signal});if(clearTimeout(n),!s.ok)return!1;const o=await s.json();return!!o&&o.sw==="off"}catch{return!1}}async function G2(e){const t=location.origin+e,n=e==="/kids-house-game/";try{for(const s of await navigator.serviceWorker.getRegistrations())(s.scope===t||s.scope.startsWith(t))&&await s.unregister()}catch{}try{if("caches"in self)for(const s of await caches.keys())(n&&s==="cozy-v1"||s.startsWith("cozy:"+e+":"))&&await caches.delete(s)}catch{}}async function Y2(e){if(!("serviceWorker"in navigator))return;const t=navigator.serviceWorker;if(await Z2(e.base)){await G2(e.base);let o=!1;try{o=sessionStorage.getItem(ac)==="1",sessionStorage.setItem(ac,"1")}catch{o=!0}t.controller&&!o&&location.reload();return}try{sessionStorage.removeItem(ac)}catch{}t.addEventListener("message",o=>{const i=o.data;i&&i.type==="cozy-sw"&&typeof i.build=="string"&&!i.build.startsWith("__")&&i.build!==F2&&!Ih&&(Ih=!0,K2(e))}),t.addEventListener("controllerchange",()=>{try{t.controller?.postMessage({type:"cozy-build?"})}catch{}});let n;try{n=await t.register(e.base+"sw.js")}catch{return}try{t.controller?.postMessage({type:"cozy-build?"})}catch{}let s=Date.now();document.addEventListener("visibilitychange",()=>{document.visibilityState!=="visible"||Date.now()-s<10*6e4||(s=Date.now(),n?.update().catch(()=>{}))})}function K2(e){const t=()=>location.reload(),n=()=>{if(e.safeNow&&!e.safeNow()){setTimeout(n,2e3);return}(e.showNote??X2)(t)};n()}function X2(e){if(document.querySelector(".updateNote"))return;const t=document.createElement("div");t.className="toast grownNotice updateNote",t.setAttribute("role","status"),t.innerHTML='<span>New stuff! Tap to refresh</span><button type="button">Refresh</button>',t.addEventListener("click",e),(document.getElementById("toastLane")??document.body).appendChild(t)}const J2=150;function ey(e,t,n){const s=n.gap??J2,o=Math.max(n.minY,Math.min(n.maxY,e.y)),i=r=>Math.max(n.minX,Math.min(n.maxX,r)),a=r=>t.every(l=>Math.abs(l.x-r)>=s||Math.abs(l.y-o)>=s*.6);for(let r=0;r<=12;r++)for(const l of r?[1,-1]:[1]){const c=i(e.x+l*r*s*.6);if(a(c))return{x:c,y:o}}return{x:i(e.x),y:o}}const sa="#5a3d5c",oe=(e=4)=>`stroke="${sa}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,rc=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],Qn=1e3,Nn=700,lc="M 30 660 C 150 640, 200 540, 330 545 S 540 650, 690 600 S 925 470, 850 375 S 640 330, 520 355 S 270 385, 250 285 S 330 145, 480 150 S 700 200, 790 150",os={x:115,y:170},pn={x:880,y:120},mn={x:600,y:480},is={x:400,y:260},i0=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${oe(3)}/><circle cx="0" cy="-10" r="20" fill="${s}" ${oe(3)}/><circle cx="-12" cy="-2" r="12" fill="${s}" ${oe(3)}/><circle cx="12" cy="-3" r="13" fill="${s}" ${oe(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`,Us=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})" fill="#fff"><ellipse cx="0" cy="10" rx="46" ry="22"/><ellipse cx="-36" cy="16" rx="28" ry="16"/><ellipse cx="38" cy="14" rx="30" ry="18"/><ellipse cx="10" cy="2" rx="24" ry="18"/></g>`,Wi=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">${[0,72,144,216,288].map(o=>`<circle cx="${(Math.cos(o*Math.PI/180)*8).toFixed(1)}" cy="${(Math.sin(o*Math.PI/180)*8).toFixed(1)}" r="6.5" fill="${n}" ${oe(2)}/>`).join("")}<circle r="4.5" fill="#ffd43b" ${oe(2)}/></g>`,as=(e,t,n)=>`<g transform="translate(${e} ${t})">${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*4}" cy="${Math.sin(s*Math.PI/180)*4}" r="3.6" fill="${n}"/>`).join("")}<circle r="2.6" fill="#ffd43b"/></g>`;function ty(){return`<svg class="mapBg" viewBox="0 0 ${Qn} ${Nn}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${Qn}" height="${Nn}" rx="34" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="160" cy="420" rx="150" ry="90"/><ellipse cx="760" cy="250" rx="170" ry="70"/><ellipse cx="480" cy="640" rx="140" ry="50"/><ellipse cx="930" cy="600" rx="90" ry="110"/></g>
  <g fill="#93d78e" opacity=".7"><ellipse cx="420" cy="260" rx="70" ry="30"/><ellipse cx="80" cy="560" rx="60" ry="26"/><ellipse cx="700" cy="420" rx="50" ry="22"/></g>
  <!-- pond -->
  <ellipse cx="120" cy="470" rx="72" ry="40" fill="#8ecae6" ${oe()}/><ellipse cx="108" cy="462" rx="42" ry="16" fill="#bde6f7"/><path d="M150 480 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <!-- side paths to the park and the ranch -->
  <path d="M250 285 Q190 250 150 215" fill="none" stroke="${sa}" stroke-width="30" stroke-linecap="round"/><path d="M250 285 Q190 250 150 215" fill="none" stroke="#f2dcb8" stroke-width="22" stroke-linecap="round"/>
  <!-- the street -->
  <path d="${lc}" fill="none" stroke="${sa}" stroke-width="58" stroke-linecap="round"/>
  <path id="mapRoad" d="${lc}" fill="none" stroke="#f2dcb8" stroke-width="48" stroke-linecap="round"/>
  <path d="${lc}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 16" stroke-linecap="round" opacity=".9"/>
  <!-- town square -->
  <g transform="translate(${mn.x} ${mn.y})"><circle r="74" fill="#f7e6c8" ${oe()}/><circle r="74" fill="none" stroke="#e6cfa6" stroke-width="10" stroke-dasharray="10 12" transform="scale(.82)"/>
    <circle r="30" fill="#bde6f7" ${oe()}/><circle r="13" fill="#fff6e6" ${oe(3)}/><path d="M0 -13 Q-8 -32 -16 -20 M0 -13 Q8 -32 16 -20 M0 -13 V-34" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>
    ${as(-52,-40,"#ff8fab")}${as(54,-38,"#b197fc")}${as(-56,40,"#ffd43b")}${as(52,44,"#ff8fab")}</g>
  ${[[60,330,"#ff8fab"],[300,470,"#b197fc"],[430,560,"#ffd43b"],[760,520,"#ff8fab"],[950,260,"#b197fc"],[600,260,"#ffd43b"],[380,90,"#ff8fab"],[40,120,"#b197fc"],[960,420,"#ffd43b"],[840,640,"#b197fc"],[210,620,"#ff8fab"]].map(([e,t,n])=>as(+e,+t,String(n))+as(+e+14,+t+8,String(n))).join("")}
  </svg>`}function Oh(e,t,n=Qn,s=Nn){const o=[];let i=7;const a=()=>(i=(i*9301+49297)%233280)/233280;for(let r=0;r<260&&o.length<34;r++){const l=30+a()*(n-60),c=40+a()*(s-70);t(l,c)||e.some(d=>Math.hypot(d.x-l,d.y-c)<d.r)||(e.push({x:l,y:c,r:46}),o.push(i0(l,c,.75+a()*.45,["#5cc985","#4fbf7a","#78d39a"][r%3])))}return`<svg class="mapTrees" viewBox="0 0 ${n} ${s}" xmlns="http://www.w3.org/2000/svg">${o.join("")}</svg>`}function ny(e,t){const n=e/2,s=`M ${n} 36 C ${n-36} ${t*.28}, ${n+28} ${t*.48}, ${n-8} ${t*.68} S ${n+18} ${t*.86}, ${n} ${t-28}`;return`<svg class="mapBg" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="${t}" rx="28" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="${e*.22}" cy="${t*.22}" rx="90" ry="48"/><ellipse cx="${e*.78}" cy="${t*.42}" rx="80" ry="40"/><ellipse cx="${e*.3}" cy="${t*.72}" rx="100" ry="46"/></g>
  <ellipse cx="78" cy="${t*.58}" rx="46" ry="28" fill="#8ecae6" ${oe()}/><ellipse cx="70" cy="${t*.56}" rx="24" ry="10" fill="#bde6f7"/>
  <path d="${s}" fill="none" stroke="${sa}" stroke-width="44" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#f2dcb8" stroke-width="34" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round" opacity=".9"/>
  ${[[40,250,"#ff8fab"],[500,280,"#b197fc"],[70,520,"#ffd43b"],[490,640,"#ff8fab"],[50,860,"#74c0fc"],[500,980,"#ffd43b"]].map(([o,i,a])=>as(+o,+i,String(a))+as(+o+16,+i+10,String(a))).join("")}
  </svg>`}const sy=(e,t,n=1,s="#4fbf7a")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="10" rx="28" ry="8" fill="#000" opacity=".08"/><circle cx="-14" cy="-2" r="16" fill="${s}" ${oe(3)}/><circle cx="14" cy="0" r="18" fill="${s}" ${oe(3)}/><circle cx="0" cy="-12" r="14" fill="${s}" ${oe(3)}/><circle cx="-4" cy="-16" r="4" fill="#fff" opacity=".28"/></g>`,oy=(e,t,n="#ff8fab")=>`<g transform="translate(${e} ${t})"><ellipse cx="-7" cy="-2" rx="8" ry="5" fill="${n}" ${oe(2)} transform="rotate(-24)"/><ellipse cx="7" cy="-2" rx="8" ry="5" fill="${n}" ${oe(2)} transform="rotate(24)"/><ellipse cx="-6" cy="4" rx="6" ry="4" fill="#b197fc" ${oe(1.6)} transform="rotate(18)"/><ellipse cx="6" cy="4" rx="6" ry="4" fill="#b197fc" ${oe(1.6)} transform="rotate(-18)"/><path d="M0 -6 V8" ${oe(2)}/></g>`;function iy(e,t,n){const s=e/2,o=(f,u,p)=>u>t*.4&&u<t-28&&Math.abs(f-s)>52&&!n.some(y=>Math.hypot(y.x-f,y.y-u)<y.r+p),i=[.07,.15,.22,.78,.85,.93],a=[.46,.54,.62,.7,.78,.86,.93],r=["#ff8fab","#b197fc","#ffd43b","#74c0fc","#69db7c"],l=[];let c=0;a.forEach((f,u)=>{i.forEach((p,y)=>{const m=Math.round(e*p+((u+y)%2?8:-6)),k=Math.round(t*f);if((u+y)%3===0){if(!o(m,k,34))return;l.push(sy(m,k,.85+y%2*.15,["#4fbf7a","#5cc985","#3dae6a"][(u+y)%3]))}else{if(!o(m,k,18))return;const b=r[(u*2+y)%r.length];l.push(Wi(m,k,b,.85)),(u+y)%2===0&&o(m+18,k+12,14)&&l.push(Wi(m+18,k+12,r[(u+y+2)%r.length],.7))}c++})});const d=[[e*.2,t*.5],[e*.8,t*.66],[e*.18,t*.84]];for(const[f,u]of d)o(f,u,16)&&l.push(oy(Math.round(f),Math.round(u),c%2?"#ffd43b":"#ff8fab"));return`<svg class="mapMeadowFill" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">${l.join("")}</svg>`}const ay=`<svg class="mapSkyArt" viewBox="0 0 900 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
  ${Us(280,28,1.05)}${Us(430,8,.8)}${Us(560,36,.95)}
  ${Us(250,88,.75)}${Us(390,108,1.05)}${Us(540,96,.85)}${Us(640,78,.7)}
  <g fill="none" stroke-linecap="round">
    ${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M300 ${118+t*6} A70 48 0 0 1 430 ${112+t*6}" stroke="${e}" stroke-width="5"/>`).join("")}
  </g>
</svg>`,ry=`<svg class="mapMeadowArt" viewBox="0 0 900 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
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
  ${[[48,188,"#ff8fab",.85],[120,176,"#ffd43b",.7],[200,198,"#b197fc",.9],[280,172,"#ff8fab",.75],[360,204,"#74c0fc",.8],[450,178,"#ffd43b",.85],[530,200,"#ff8fab",.75],[620,174,"#b197fc",.8],[700,196,"#69db7c",.7],[790,180,"#ffd43b",.85]].map(([e,t,n,s])=>Wi(+e,+t,String(n),+s)).join("")}
  ${[[80,248,"#ff8fab"],[160,268,"#b197fc"],[250,242,"#ffd43b"],[340,274,"#ff8fab"],[430,250,"#74c0fc"],[520,270,"#b197fc"],[610,246,"#ffd43b"],[700,272,"#ff8fab"],[790,252,"#69db7c"]].map(([e,t,n])=>Wi(+e,+t,String(n),1.05)).join("")}
  ${[[110,304,"#ffd43b"],[230,292,"#ff8fab"],[360,308,"#b197fc"],[490,294,"#74c0fc"],[620,306,"#ff8fab"],[750,296,"#ffd43b"]].map(([e,t,n])=>Wi(+e,+t,String(n),.9)).join("")}
</svg>`,Bh=`<svg viewBox="0 0 200 170"><ellipse class="parkLawn" cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${oe()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${oe(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${oe(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${oe(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${oe(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${oe(2.5)}/>
  ${i0(40,66,1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${oe(3)}/><path d="M178 88 V132" ${oe(4)}/>
</svg>`,Dh=`<svg viewBox="0 0 220 180"><ellipse class="ranchGrass" cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${oe()}/>
  ${rc.map((e,t)=>`<path d="M${20+t*7} 120 A${90-t*7} ${84-t*7} 0 0 1 ${200-t*7} 120" fill="none" stroke="${e}" stroke-width="7"/>`).join("")}
  <path d="M60 140 V82 L80 58 H140 L160 82 V140 Z" fill="#ef5b5b" ${oe(4)}/>
  <path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${sa}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  ${rc.map((e,t)=>`<path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${e}" stroke-width="1.3" transform="translate(0 ${-3+t*1.2})"/>`).join("")}
  <rect x="88" y="100" width="44" height="40" rx="3" fill="#d94848" ${oe(3)}/><path d="M88 100 L132 140 M132 100 L88 140" stroke="#fff6e6" stroke-width="3"/>
  <rect x="94" y="70" width="32" height="18" rx="4" fill="#fff6e6" ${oe(3)}/>
  <path d="M10 150 H52 M168 150 H212 M14 140 V158 M30 140 V158 M46 140 V158 M174 140 V158 M190 140 V158 M206 140 V158" stroke="#fff6e6" stroke-width="5" stroke-linecap="round"/><path d="M10 150 H52 M168 150 H212" ${oe(1.5)}/>
  <g transform="translate(178 122) scale(.42)"><ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" ${oe(5)}/><path d="M24 -8 L40 -34 L54 -26 L36 2 Z" fill="#fff" ${oe(5)}/>${rc.slice(0,4).map((e,t)=>`<path d="M38 ${-34+t*5} q-14 4 -20 14" fill="none" stroke="${e}" stroke-width="5" stroke-linecap="round"/>`).join("")}<path d="M-20 14 V34 M20 14 V34" ${oe(6)}/></g>
</svg>`,Hh=`<svg viewBox="0 0 190 156">
  <ellipse cx="95" cy="118" rx="88" ry="32" fill="#ffd0e6" ${oe()}/>
  <path d="M28 108 V62 L95 28 L162 62 V108 Z" fill="#fff0f6" ${oe(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="#ff6b9a" ${oe(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="none" stroke="#ffd43b" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="78" y="78" width="34" height="30" rx="4" fill="#ff8ec8" ${oe(3)}/>
  <path d="M95 86 C90 80 82 82 86 90 C90 96 95 100 95 100 C95 100 100 96 104 90 C108 82 100 80 95 86 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  <rect x="42" y="74" width="22" height="16" rx="3" fill="#66d9e8" ${oe(2)}/><rect x="126" y="74" width="22" height="16" rx="3" fill="#d0bfff" ${oe(2)}/>
  ${[36,52,68,84,100,116,132,148].map((e,t)=>`<circle class="clubBulb" cx="${e}" cy="58" r="3.2" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" ${oe(1.4)}/>`).join("")}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`,tf=`<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${oe(3)}/><path d="M17 8 V35 M31 13 V40" ${oe(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${oe(2)}/></svg>`,nf=e=>e.indexOf("data-chibi")>=0?e.replace('viewBox="0 0 200 320"','viewBox="24 0 152 168"'):e.replace('viewBox="0 0 100 160"','viewBox="14 2 72 74"'),a0=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),ly={piano:"keys",keyboard:"keys",stove:"stove","yard-swing":"swing","cc-macrame-swing":"swing","little-slide":"slide",aquarium:"water","cc-cottage-aquarium":"water",fish:"water","pink-fountain":"water","lily-pond":"water",birdbath:"water","doll-house":"dollhouse"};function sf(e){return ly[a0(e)]??null}const cy=e=>a0(e)==="rubber-ducky",zs={play:110,listen:260,stir:140,swing:70,slide:90,look:200,kneel:120},Wh=9e3;function dy(e,t,n,s,o={}){const i=sf(e);if(!i)return null;switch(i){case"keys":return o.keysPlaying?.has(t)?!s&&n<=zs.play?{kind:"play",d:n}:n<=zs.listen?{kind:"listen",d:n+40}:null:null;case"stove":return!s&&o.opened?.has(t)&&n<=zs.stir?{kind:"stir",d:n}:null;case"swing":return!s&&n<=zs.swing?{kind:"swing",d:n}:null;case"slide":return!s&&n<=zs.slide?{kind:"slide",d:n}:null;case"water":return n<=zs.look?{kind:"look",d:n+20}:null;case"dollhouse":return!s&&n<=zs.kneel?{kind:"kneel",d:n}:null}}const gl=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),fy={"cute-speaker":"stereo","cc-record-player":"stereo","retro-radio":"stereo","music-box":"musicbox",tv:"tv",fireplace:"fire","brick-fireplace":"fire","wc-woodstove":"fire",woodstove:"fire","wc-stone-hearth":"fire","fire-pit":"fire"};function us(e){return fy[gl(e)]??null}function r0(e){return us(e)!==null}function of(e){const t=gl(e);return t==="ball"||t==="beach-ball"||t==="balloon"?"bounce":t==="teddy"||/plush/.test(t)?"hug":null}const qn=e=>/(^|-)tub$/.test(gl(e)),si=e=>/fridge$/.test(gl(e)),hy={stereo:220,musicbox:160,tv:280,fire:230},Kc=70,l0=130,uy=.4,py=6,Vh=2e4,Be=900,gy=["stereo","tv","fire","musicbox"];function my(e,t){let n=2166136261;const s=e+"|"+t;for(let o=0;o<s.length;o++)n^=s.charCodeAt(o),n=Math.imul(n,16777619);return(n>>>0)%1e3/1e3}const cc=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5);function yy(e,t,n={}){const s=new Map,o=[...t].sort((r,l)=>r.id<l.id?-1:r.id>l.id?1:0),i=e.filter(r=>r.on&&us(r.kind)&&!(us(r.kind)==="musicbox"&&n.musicBoxDone?.has(r.id))),a=[];for(const r of o){if(r.lying)continue;let l=null;for(const c of gy){for(const d of i){if(us(d.kind)!==c)continue;const f=cc(r,d);if(f>hy[c]||r.seated&&c!=="tv"&&c!=="musicbox")continue;const u=c==="stereo"?"dance":c==="tv"?"watch":c==="fire"?"warm":"sway";(!l||f<l.d||f===l.d&&d.id<l.it.id)&&(l={c:r,it:d,d:f,kind:u})}if(l)break}if(!l)for(const c of e){const d=dy(c.kind,c.id,cc(r,c),!!r.seated,{...n,opened:n.opened??n.fridgesOpen});if(d&&(!l||d.d<l.d||d.d===l.d&&c.id<l.it.id)&&(l={c:r,it:c,d:d.d,kind:d.kind}),r.seated)continue;const f=of(c.kind);let u=null,p=cc(r,c);f&&p<=Kc?u=f:si(c.kind)&&n.fridgesOpen?.has(c.id)&&p<=l0?u="nibble":qn(c.kind)&&Math.abs(r.x-c.x)<=(c.w??240)*uy&&Math.abs(r.y-c.y)<=40&&(u="bathe"),u&&(!l||p<l.d||p===l.d&&c.id<l.it.id)&&(l={c:r,it:c,d:p,kind:u})}l&&a.push(l)}a.sort((r,l)=>r.d-l.d||(r.c.id<l.c.id?-1:1));for(const r of a.slice(0,py))s.set(r.c.id,{kind:r.kind,item:r.it.id,phase:my(r.it.id,r.c.id),face:r.it.x<r.c.x?-1:1});return s}function oo(e,t,n){return-((n+e*t)%t)}const by={},wt=e=>(by?.VITE_STORE_PREFIX??"")+e,wy=400,ml=["#ffe0c4","#f6d2b5","#f1c27d","#e0ac69","#c9956c","#c68642","#a86b3c","#8d5524","#5c3a1e","#3d2914"],yl=["#2b1d16","#5b3a29","#a0522d","#f4d58d","#ff8fab","#8ecae6","#b388d6","#ff9f43","#1d1416","#c8602a","#7a4b32","#f7f1e8"],af=["#5a321c","#3f9b52","#3d7ec4","#c48a3a","#7b4fb8"],Ht=["#ff7aa8","#ffd166","#5aa9e6","#80ed99","#c9a0dc","#ff9f68","#ffffff","#5a3d5c","#ff8f7a","#7ec8c3","#f7f3ee","#f4a3c8","#6b8e4e","#e8d5b5","#ef6b6b","#3d4a6b"],bl=["short","bob","buns","topbun","pixie","long","wavy","puffs","afro","curlybob","coily","boxbraids","braids","sidebraid","crown","pony","sidepony","pigtails","lowbun","locs","halfup","bangs","sidebangs","wavybob"],wl=["classic","stripes","hoodie","sweater","tank","puff","ruffle","button","jersey","cardigan","bib","raincoat"],kl=["pants","jeans","shorts","skirt","tutu","leggings","overalls","joggers"],vl=["","twirl","sundress","party","pinafore","jumper","ballet","nightgown","raindress"],_l=["classic","sneakers","lightup","boots","rainboots","sandals","maryjanes","slippers"],$l=["round","big","sleepy","sparkle","soft","bright"],Uo=["glasses","square","sunnies","bow","bigbow","headband","flower","cap","beanie","sunhat","catears","earmuffs"],ky=new Set(bl),vy=new Set(wl),_y=new Set(kl),$y=new Set(vl),xy=new Set(_l),My=new Set($l),Ly=new Set(Uo),Ey=new Set(["short","pixie","coily","afro","bangs"]),Sy=new Set(["buns","puffs"]),Ty=new Set(["topbun","lowbun"]),Py={hair:"buns",hairC:"#5b3a29",skin:"#f1c27d",eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"pants",bottomC:"#5aa9e6",dress:"",dressC:"#ff7aa8",shoes:"classic",shoesC:"#5a3d5c",accC:"#ffd166"};function Ay(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Po(e,t){return typeof e=="string"&&t.has(e)}function Pn(e,t){if(typeof e!="string")return null;const n=e.trim().toLowerCase();for(let s=0;s<t.length;s++)if(t[s]===n)return t[s];return null}function $a(e){if(!Ay(e))return null;let t=0;try{t=JSON.stringify(e).length}catch{return null}if(t>wy)return null;const n={v:1};Po(e.hair,ky)&&(n.hair=e.hair);const s=Pn(e.hairC,yl);s&&(n.hairC=s);const o=Pn(e.skin,ml);o&&(n.skin=o),Po(e.eyes,My)&&(n.eyes=e.eyes);const i=Pn(e.eyeC,af);i&&(n.eyeC=i),(e.freckles===!0||e.freckles===!1)&&(n.freckles=e.freckles),(e.blush===!0||e.blush===!1)&&(n.blush=e.blush),Po(e.top,vy)&&(n.top=e.top);const a=Pn(e.topC,Ht);a&&(n.topC=a),Po(e.bottom,_y)&&(n.bottom=e.bottom);const r=Pn(e.bottomC,Ht);r&&(n.bottomC=r),Po(e.dress,$y)&&(n.dress=e.dress);const l=Pn(e.dressC,Ht);l&&(n.dressC=l),Po(e.shoes,xy)&&(n.shoes=e.shoes);const c=Pn(e.shoesC,Ht);if(c&&(n.shoesC=c),Array.isArray(e.acc)){const f=[];for(let u=0;u<e.acc.length&&f.length<2;u++){const p=e.acc[u];typeof p=="string"&&Ly.has(p)&&f.indexOf(p)<0&&f.push(p)}n.acc=f}const d=Pn(e.accC,Ht);return d&&(n.accC=d),n}function Rs(e){const t=Py,n=e??{};return{v:1,hair:n.hair??t.hair,hairC:n.hairC??t.hairC,skin:n.skin??t.skin,eyes:n.eyes??t.eyes,eyeC:n.eyeC??t.eyeC,freckles:n.freckles??t.freckles,blush:n.blush??t.blush,top:n.top??t.top,topC:n.topC??t.topC,bottom:n.bottom??t.bottom,bottomC:n.bottomC??t.bottomC,dress:n.dress??t.dress,dressC:n.dressC??t.dressC,shoes:n.shoes??t.shoes,shoesC:n.shoesC??t.shoesC,acc:n.acc?n.acc.slice():[],accC:n.accC??t.accC}}function Uh(e){const t=/^#([0-9a-f]{6})$/i.exec(e.trim());if(!t){const s=/^#([0-9a-f]{3})$/i.exec(e.trim());return s?[parseInt(s[1][0]+s[1][0],16),parseInt(s[1][1]+s[1][1],16),parseInt(s[1][2]+s[1][2],16)]:null}const n=parseInt(t[1],16);return[n>>16&255,n>>8&255,n&255]}function za(e,t){const n=Pn(e,t);if(n)return n;const s=Uh(e);if(!s)return t[0];let o=t[0],i=1e12;for(let a=0;a<t.length;a++){const r=Uh(t[a]);if(!r)continue;const l=(s[0]-r[0])*(s[0]-r[0])+(s[1]-r[1])*(s[1]-r[1])+(s[2]-r[2])*(s[2]-r[2]);l<i&&(i=l,o=t[a])}return o}function Ry(e){return Ey.has(e)?0:Sy.has(e)?2:Ty.has(e)?3:1}function Cy(e){for(let t=0;t<e.length;t++){const n=e[t];if(n==="glasses"||n==="square"||n==="sunnies")return 2}for(let t=0;t<e.length;t++){const n=e[t];if(n==="cap"||n==="beanie"||n==="sunhat")return 3}for(let t=0;t<e.length;t++){const n=e[t];if(n==="bow"||n==="bigbow")return 1}return 0}function xl(e){const t=Rs(e),n=t.dress!=="";return{skin:t.skin,hair:t.hairC,hairStyle:Ry(t.hair),shirt:n?t.dressC:t.topC,pants:n?t.dressC:t.bottomC,acc:Cy(t.acc)}}const Iy=["short","bob","buns","topbun"];function oa(e){const t=typeof e.hairStyle=="number"&&e.hairStyle>=0&&e.hairStyle<=3?Math.round(e.hairStyle):0,n=e.acc===1?["bow"]:e.acc===2?["glasses"]:e.acc===3?["cap"]:[],s=za(String(e.shirt??""),Ht);return{v:1,hair:Iy[t],hairC:za(String(e.hair??""),yl),skin:za(String(e.skin??""),ml),eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:s,bottom:"pants",bottomC:za(String(e.pants??""),Ht),dress:"",dressC:s,shoes:"classic",shoesC:"#5a3d5c",acc:n,accC:"#ffd166"}}function ia(e){const t=$a(e)??{},n=Rs(t);return{...xl(n),look2:n}}const Oy=new Set(["glasses","square","sunnies"]),By=new Set(["bow","bigbow","flower","headband"]),Dy=new Set(["cap","beanie","sunhat","catears","earmuffs"]);function Cr(e){return Oy.has(e)?"face":By.has(e)?"bow":Dy.has(e)?"hat":"other"}function ot(e,t){return t[Math.floor(e()*t.length)]}function Ml(e=Math.random){const t=e()<.38,n=e();let s=[];if(n<.22)s=[];else if(n<.68)s=[ot(e,Uo)];else{const o=ot(e,Uo),i=Uo.filter(a=>Cr(a)!==Cr(o));s=[o,ot(e,i)]}return{v:1,hair:ot(e,bl),hairC:ot(e,yl),skin:ot(e,ml),eyes:ot(e,$l),eyeC:ot(e,af),freckles:e()<.4,blush:e()<.85,top:ot(e,wl),topC:ot(e,Ht),bottom:ot(e,kl),bottomC:ot(e,Ht),dress:t?ot(e,vl.filter(o=>o!=="")):"",dressC:ot(e,Ht),shoes:ot(e,_l),shoesC:ot(e,Ht),acc:s,accC:ot(e,Ht)}}function Hy(e,t=Math.random){const n=e.characters[0];if(!n)return e;const s=Ml(t),o=xl(s),i=e.characters.slice();return i[0]={...n,...o,look2:s},{...e,characters:i}}function c0(e){const t=e.characters[0];if(!t||t.look2)return e;const n=e.characters.slice();return n[0]={...t,look2:{...oa(t),eyes:"sparkle"}},{...e,characters:n}}function Wy(e){const t=[e.skin,e.hair,e.hairStyle,e.shirt,e.pants,e.acc,e.look2?JSON.stringify(e.look2):""].join("|");return e.costume?t+"|cos:"+e.costume:t}const zh={m:10,d:24},Qh={m:11,d:2},Ir={yellow:"#ffd166",denim:"#4f7fb8",rose:"#f28fb0",mint:"#7fd8b8"},Vy=["helper-yellow","helper-denim","helper-rose","helper-mint","witch","cat","ghost","skeleton","bat"],Uy=new Set(Vy),Nh={helper:"Yellow Helper",witch:"Witch hat",cat:"Black cat",ghost:"Ghost sheet",skeleton:"Bone PJs",bat:"Bat cape"};function Mo(e){return typeof e=="string"&&Uy.has(e)?e:null}function zy(e=new Date){const t=e.getMonth()+1,n=e.getDate();return t===zh.m?n>=zh.d:t===Qh.m?n<=Qh.d:!1}function Qy(){const e=typeof globalThis<"u"?globalThis:{};if(typeof e.__costumeDate=="string"){const t=new Date(e.__costumeDate+"T12:00:00");if(!isNaN(+t))return t}return new Date}function Ll(){return zy(Qy())}function Ny(e){if(!e||e.costume==null)return null;const t=Mo(e.costume);return t&&Ll()?t:null}const xa=3600,ro=470,jn=590,Js=["goat","sheep","piglet","chicks","bunny","cow"],qy=[1085,1215,1345,1470,1600,1735],jy=520,rf=1900,lf=[600,800,1e3,1200,1400,1600],Xc=435,Fy=["Chestnut","Snowy","Midnight","Sunny","Rainbow"],d0=[2470,2600,2730,2860,2990],lo=540,Zy=["pet","carrot","apple","hay"],Jc=6,Gy=e=>3175+e*68,Yy=8e4,ed=20,Ky=1500,f0=["egg","carrot","flower"],Xy={egg:"ranch-egg",carrot:"ranch-carrot",flower:"ranch-bouquet"},Jy=()=>({egg:0,carrot:0,flower:0}),eb=(e,t,n)=>Number.isInteger(e)&&e>=t&&e<=n?e:null;function cf(e){const t=Jy();if(!e||typeof e!="object")return t;for(const n of f0)t[n]=eb(e[n],0,ed)??0;return t}function df(e){const t=Array(Jc).fill(null);if(Array.isArray(e))for(let n=0;n<Jc;n++){const s=e[n];if(!s||s.seed!=="carrot"&&s.seed!=="flower")continue;const o=Number(s.at),i=Number(s.wet);Number.isFinite(o)&&Number.isFinite(i)&&(t[n]={seed:s.seed,at:o,wet:i})}return t}function El(e,t){if(!e||!e.wet)return 0;const n=(t-e.wet)/Yy;return n>=1?3:n>=.4?2:1}function td(e,t,n,s,o=0){const i=e.slice(),a={...t};switch(n.op){case"plant":return i[n.i]?"taken":(i[n.i]={seed:n.seed,at:s,wet:0},{plots:i,basket:a,garden:!0});case"water":{const r=i[n.i];return r?r.wet?"wet":(i[n.i]={...r,wet:s},{plots:i,basket:a,garden:!0}):"empty"}case"pick":{const r=i[n.i];return r?El(r,s)<3?"notReady":a[r.seed]>=ed?"full":(a[r.seed]++,i[n.i]=null,{plots:i,basket:a,garden:!0,got:r.seed}):"empty"}case"egg":return s-o<Ky?"slow":a.egg>=ed?"full":(a.egg++,{plots:i,basket:a,garden:!1,got:"egg"});case"use":return a.carrot<=0?"none":(a.carrot--,{plots:i,basket:a,garden:!1});case"take":return a[n.kind]<=0?"none":(a[n.kind]--,{plots:i,basket:a,garden:!1})}}const ls=80,tb=30*24*60*60*1e3,nb=5,h0=6,es=["#ffd6e8","#fff3b0","#d8f5e8","#e6d6ff","#d6efff"],sb=/^m[A-Za-z0-9]{4,40}$/,ob=/^[A-Za-z0-9:_\/.-]{1,80}$/;function dc(e,t=Date.now()){const n=Math.floor((t-e)/864e5);return n<=0?"today":n===1?"yesterday":n<7?"a few days ago":"a while ago"}function ib(e,t=Date.now()){const n=e?.letters;if(!Array.isArray(n))return null;const s=[];for(const i of n.slice(-30*2)){if(!i||typeof i!="object")continue;const a=i;if(typeof a.id!="string"||!sb.test(a.id)||typeof a.from!="string")continue;const r=a.from.normalize("NFC").replace(/\s+/g," ").trim();if(!r||r.length>24||typeof a.fromPid!="string"||!ob.test(a.fromPid)||typeof a.text!="string"||a.text.length>ls||typeof a.at!="number"||!Number.isFinite(a.at)||t-a.at>tb||a.at>t+864e5||!Number.isInteger(a.color)||a.color<0||a.color>=nb||!Number.isInteger(a.sticker)||a.sticker<0||a.sticker>=h0)continue;const l=a.text.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(l.length>ls)continue;const c={id:a.id,from:r,fromPid:a.fromPid,text:l,color:a.color,sticker:a.sticker,at:a.at};a.read===!0&&(c.read=!0),s.push(c)}const o=s.slice(-30);return o.length?{letters:o}:null}function ff(e){return e?.letters.filter(t=>!t.read&&t.text).length??0}const ab=/^[A-Za-z0-9:_\/.-]{1,80}$/,u0=/crib|bassinet|high-?chair|cat-bed|pet-bed|dog-bed|kennel|tulip|flower|toadstool|mobile/,fc={bed:{head:{x:.24,y:.42},pillow:{x:.1,y:.27,w:.22,h:.18},mattress:{x:.36,y:.34,w:.36,h:.16},clip:"starter"},"wooden-bed":{head:{x:.22,y:.53},pillow:{x:.12,y:.36,w:.24,h:.18},mattress:{x:.38,y:.46,w:.32,h:.16},clip:"wooden"},"checker-bed":{head:{x:.16,y:.45},pillow:{x:.08,y:.26,w:.22,h:.22},mattress:{x:.38,y:.4,w:.32,h:.16},clip:"checker"},"bunk-bed":{head:{x:.11,y:.62},pillow:{x:.05,y:.52,w:.18,h:.14},mattress:{x:.22,y:.56,w:.36,h:.14},clip:"bunk"},"canopy-bed":{head:{x:.38,y:.52},pillow:{x:.28,y:.46,w:.24,h:.14},mattress:{x:.48,y:.48,w:.28,h:.16},clip:"canopy"},"cc-heart-bed":{head:{x:.22,y:.67},pillow:{x:.12,y:.58,w:.26,h:.16},mattress:{x:.36,y:.64,w:.36,h:.16},clip:"heart"},"cc-canopy-daybed":{head:{x:.37,y:.58},pillow:{x:.26,y:.5,w:.26,h:.16},mattress:{x:.48,y:.54,w:.3,h:.16},clip:"daybed"},"wc-plaid-bed":{head:{x:.24,y:.26},pillow:{x:.08,y:.14,w:.3,h:.2},mattress:{x:.36,y:.18,w:.3,h:.18},clip:"wooden"}},rb=["bed","pack:wooden-bed","pack:checker-bed","pack:bunk-bed","pack:canopy-bed","pack:cc-heart-bed","pack:cc-canopy-daybed","pack:wc-plaid-bed"];function p0(e){return e==="bed"||/bunk/.test(e)||/daybed/.test(e)?!0:/(^|[-_:])bed$/.test(e)}function lb(){return rb.slice()}function Sl(e){const t=String(e||"").toLowerCase();if(!t||u0.test(t)||!p0(t))return null;const n=t.replace(/^pack:/,"");return fc[n]||fc[t]||fc.bed}const cb={head:{x:55.0733,y:59.7445},chest:{x:60,y:114},hip:{x:60,y:138},classic:{x:60,y:52.8}},qh=48,jh=138.24;function g0(e,t){const n=-90*Math.PI/180,s=Math.cos(n),o=Math.sin(n),i=e-qh,a=t-jh,r=qh+s*i-o*a,l=jh+o*i+s*a;return{x:r-60,y:l-192}}function Or(e,t){const n=cb[e],s=g0(n.x,n.y);return{x:t?-s.x:s.x,y:s.y}}const Fh=120,hc=192,db=.26;function fb(e,t,n,s,o=1){const i=o>0?o:1;if(n==="lie"&&s){const r=-t*i+210.24,l=-e*i+186.24;return{x:-Fh*i/2+r,y:-hc*i+l}}if(n==="lie"){const r=g0(e,t);return{x:r.x*i,y:r.y*i}}const a=n==="sit"?db*hc*i:0;return{x:(e-Fh/2)*i,y:(t-hc)*i+a}}function hb(e,t,n,s,o){const i=Sl(e);if(!i||t<1||n<1)return null;const a=Or("head",!1),r=(i.head.x-.5)*t-a.x,l=(i.head.y-1)*n-a.y,c=Or(s,o);return{x:.5+((o?-r:r)+c.x)/t,y:1+(l+c.y)/n}}function Kn(e){const t=String(e||"").toLowerCase();return!t||u0.test(t)?null:p0(t)?{pose:"lie",spots:[{dx:0,dy:0}]}:/sofa|couch|loveseat/.test(t)?{pose:"sit",spots:[{dx:-.18,dy:-.33},{dx:.18,dy:-.33}]}:/armchair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/bench|window-seat/.test(t)?{pose:"sit",spots:[{dx:-.22,dy:-.3},{dx:.22,dy:-.3}]}:/ottoman/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/stool|rocker/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.38}]}:/chair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.48}]}:null}function m0(e){const t=Kn(e.kind);if(!t)return[];const n=e.scale||1,s=t.pose==="lie"?Sl(e.kind):null;if(s){const o=e.w*n,i=e.h*n,a=Or("head",!1),r=(s.head.x-.5)*o-a.x,l=(s.head.y-1)*i-a.y;return[{x:e.x+(e.flip?-r:r),y:e.footY+l,pose:"lie",n:0}]}return t.spots.map((o,i)=>{const a=o.dx*e.w*n,r=o.dy*e.h*n,l=i===1?1:0;return{x:e.x+(e.flip?-a:a),y:e.footY+r,pose:t.pose,n:l}})}function zo(e){const t=(r,l)=>({x:r,y:l,seat:null,toast:null,moved:!0});if(e.mode!=="play")return t(e.releaseX,e.releaseY);const n=e.piece;if(!n)return e.via==="drag"?t(e.releaseX,e.releaseY):{x:e.releaseX,y:e.releaseY,seat:null,toast:null,moved:!1};if(e.via==="tap"&&e.alreadyOn===n.id)return t(n.x,n.footY);const s=new Set(e.occupied.filter(r=>r.item===n.id).map(r=>r.n)),o=m0(n).filter(r=>!s.has(r.n));if(!o.length)return e.via==="tap"?{x:e.releaseX,y:e.releaseY,seat:null,toast:"Someone is already there!",moved:!1}:t(e.releaseX,e.releaseY);let i=o[0],a=1/0;for(const r of o){const l=(r.x-e.releaseX)**2+(r.y-e.releaseY)**2;l<a&&(i=r,a=l)}return{x:i.x,y:i.y,seat:{item:n.id,pose:i.pose,n:i.n},toast:null,moved:!0}}const ub={sofa:260,armchair:150,bed:300,chair:100,stool:90,rocker:190,"yard-bench":140,"bar-stool":52.8,"bunk-bed":294,"canopy-bed":294,"cc-bubble-chair":142,"cc-canopy-daybed":276,"cc-dryer-chair":164,"cc-heart-bed":236,"cc-mani-chair":188,"cc-mushroom-stool":112,"cc-scallop-loveseat":248,"checker-bed":196,"cloud-sofa":212,"comfy-armchair":161.7,"cream-sofa":234.6,"egg-chair":126,"fancy-sofa":234.6,"gaming-chair":101.4,"lattice-bench":147,"puffy-stool":46.9,"rocking-chair":137.2,"salon-chair":111.8,"swivel-stool":46.2,"waiting-bench":166.6,"wash-chair":186.2,"wood-armchair":127.4,"wood-stool":46.2,"wooden-bed":235.2};function _n(e){const t=String(e||"").toLowerCase().replace(/^pack:/,"");return ub[t]??320}const oi=540;function co(e,t,n,s=2400){const o=Math.max(0,t)/2+70,i=40;let a=n<e-8?-1:1,r=e+a*o;return(r<i||r>s-i)&&(a=-a,r=e+a*o),r<i&&(r=i),r>s-i&&(r=s-i),{x:r,y:oi}}function hf(e){if(!e||typeof e!="object")return null;const t=e;return typeof t.item!="string"||!ab.test(t.item)||t.pose!=="sit"&&t.pose!=="lie"||t.n!==0&&t.n!==1?null:{item:t.item,pose:t.pose,n:t.n}}function nd(e,t){if(!e)return null;const n=hf(e);return!n||!t?.some(s=>s&&s.id===n.item)?null:n}const io=["sleepy","hungry","playful","clean"],pb=1,gb=4*6e4,mb=2*6e4,yb=75e3;function bb(e,t){return e.characters.some(n=>gf(n))?gb:t===0?yb:mb}const uf=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),wb=/^(cake|juice|cupcake|cookie|apple|pie|pizza|donut|sandwich|milk|bread|fruit|.*-cake|.*-pie|.*cookies?)$/,ln=e=>wb.test(uf(e)),Zo=e=>!!of(e)||uf(e)==="rubber-ducky";function pf(e){if(!e||typeof e!="object")return null;const t={};for(const n of io){const s=e[n];if(typeof s!="number"||!Number.isFinite(s))continue;const o=Math.max(0,Math.min(3,Math.round(s)));o<3&&(t[n]=o)}return Object.keys(t).length?t:null}function fo(e,t){const n=e?.needs?.[t];return typeof n=="number"?Math.max(0,Math.min(3,n)):3}function gf(e){let t=null,n=pb+1;for(const s of io){const o=fo(e,s);o<n&&(n=o,t=s)}return t}function y0(e,t){if(t)return{...e,needs:t};if(!("needs"in e))return e;const{needs:n,...s}=e;return s}const uc=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5),Zh=(e,t)=>!!(e.held.left&&t(e.held.left.kind)||e.held.right&&t(e.held.right.kind)),kb=e=>_n(e.kind)*(e.scale||1)*(e.size||1);function mf(e,t,n){const s=e.rooms[t.room]?.items??[];switch(n){case"sleepy":return t.seat?.pose==="lie"&&s.some(o=>o.id===t.seat.item);case"clean":return s.some(o=>qn(o.kind)&&Math.abs(t.x-o.x)<=Math.max(60,kb(o)*.45)&&Math.abs(t.y-o.y)<=60);case"hungry":return Zh(t,ln)||s.some(o=>si(o.kind)&&uc(t,o)<=l0+30||ln(o.kind)&&uc(t,o)<=Kc+40);case"playful":return Zh(t,Zo)||s.some(o=>Zo(o.kind)&&uc(t,o)<=Kc+40)}}function vb(e,t){return io.filter(n=>fo(t,n)<3&&mf(e,t,n))}function _b(e,t,n){const s=e.characters.find(a=>a.id===t);if(!s||fo(s,n)>=3||!mf(e,s,n))return e;const o={...s.needs??{}};delete o[n];const i=y0(s,pf(o));return{...e,characters:e.characters.map(a=>a.id===t?i:a)}}function $b(e,t,n){const s=e.characters.find(a=>a.id===t),o=fo(s,n);if(!s||o<=0)return e;const i=y0(s,pf({...s.needs??{},[n]:o-1}));return{...e,characters:e.characters.map(a=>a.id===t?i:a)}}function xb(e,t){const n=Object.values(e.rooms).flatMap(c=>c?.items??[]),s={sleepy:n.some(c=>/bed$|^bed|sofa|couch/.test(uf(c.kind))),hungry:n.some(c=>si(c.kind)||ln(c.kind)),playful:n.some(c=>Zo(c.kind)),clean:n.some(c=>qn(c.kind))},o=c=>c[(t%c.length+c.length)%c.length],i=[];for(const c of[...e.characters].sort((d,f)=>d.id<f.id?-1:1)){const d=!!gf(c);for(const f of io)if(s[f]){const u=fo(c,f);u>0&&i.push({id:c.id,need:f,l:u,wish:d})}}if(!i.length)return null;const a=i.filter(c=>!c.wish);if(a.length){const c=a.filter(f=>f.l<3),d=c.length?o(c):o(a);return{id:d.id,need:d.need}}const r=Math.max(...i.map(c=>c.l)),l=o(i.filter(c=>c.l===r));return{id:l.id,need:l.need}}const sd=45e3,Mb=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],Gh=/^[A-Za-z0-9:_\/.-]{1,80}$/,Lb=/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u,Yh=["feed","burp","change","rock"];function ho(e){const t=String(e||"").toLowerCase();return!t||/mobile/.test(t)?null:/bassinet/.test(t)?"bassinet":t==="crib"||/(^|[-_:])crib$/.test(t)?"crib":null}function Eb(e){return e===2?"Cozy":"Happy"}function Sb(e){return e+1}function Tb(e){return Mb.indexOf(e)>=0}function Pb(e){const t=typeof e=="number"&&Number.isFinite(e)?Math.round(e):2;return t<=2?2:t>=4?4:3}function b0(e){if(!e||typeof e!="object")return;const t=e,n={};let s=!1;for(let o=0;o<Yh.length;o++){const i=Yh[o],a=t[i];typeof a=="number"&&Number.isFinite(a)&&(n[i]=a,s=!0)}return s?n:void 0}function cn(e){const t={name:e.name,mood:e.mood,spot:e.spot,x:e.x,y:e.y,room:e.room,since:e.since};(e.spot==="crib"||e.spot==="bassinet")&&e.bed&&(t.bed=e.bed),e.spot==="mat"&&e.seat&&(t.seat=e.seat),e.spot==="arms"&&e.holder&&(t.holder=e.holder);const n=b0(e.at);return n&&(t.at=n),t}function yf(e,t){return JSON.stringify(e)===JSON.stringify(t)}function Ab(e,t){if(!e||typeof e!="object")return null;const n=e,s=String(n.name??"").normalize("NFC").replace(/\s+/g," ").trim();if(!Lb.test(s)||(s.match(/\d/g)||[]).length>2)return null;let o=n.spot==="crib"||n.spot==="bassinet"||n.spot==="arms"||n.spot==="mat"?n.spot:"mat";const i=Tb(n.room)?n.room:"nursery",a=typeof n.x=="number"&&Number.isFinite(n.x)?Math.max(0,Math.min(2400,n.x)):700,r=typeof n.y=="number"&&Number.isFinite(n.y)?Math.max(0,Math.min(600,n.y)):540,l=typeof n.since=="number"&&Number.isFinite(n.since)?n.since:0,c=Pb(n.mood);let d=typeof n.bed=="string"&&Gh.test(n.bed)?n.bed:void 0,f=hf(n.seat)??void 0,u=typeof n.holder=="string"&&Gh.test(n.holder)?n.holder:void 0;if(t){const p=t[i]?.items??[];if(o==="crib"||o==="bassinet"){let y=!1;for(let m=0;m<p.length;m++){const k=p[m];k&&k.id===d&&ho(String(k.kind||""))===o&&(y=!0)}y||(o="mat",d=void 0)}if(f){let y=!1;for(let m=0;m<p.length;m++)p[m]&&p[m].id===f.item&&(y=!0);y||(f=void 0)}}return o!=="crib"&&o!=="bassinet"&&(d=void 0),o!=="mat"&&(f=void 0),o!=="arms"&&(u=void 0),o==="arms"&&!u&&(o="mat"),cn({name:s,mood:c,spot:o,bed:d,seat:f,holder:u,x:a,y:r,room:i,at:b0(n.at),since:l})}function Rb(e,t){const n=e.nursery?.items??[];for(let s=0;s<n.length;s++){const o=n[s];if(!o||!o.id||ho(String(o.kind||""))!=="crib")continue;const i=typeof o.x=="number"&&Number.isFinite(o.x)?o.x:1170,a=typeof o.y=="number"&&Number.isFinite(o.y)?o.y:480;return cn({name:"Bean",mood:2,spot:"crib",bed:o.id,x:i,y:a,room:"nursery",since:t})}return cn({name:"Bean",mood:2,spot:"mat",x:700,y:540,room:"nursery",since:t})}function Cb(e,t,n){const s=Math.min(4,e.mood+1);return cn({...e,mood:s,at:{...e.at||{},[t]:n},since:n})}function Ib(e,t){if(!e.since){const i=cn({...e,since:t});return yf(i,e)?null:i}if(e.mood<=2)return null;const n=Math.floor((t-e.since)/sd);if(n<1)return null;const s=Math.min(n,e.mood-2),o=e.mood-s;return cn({...e,mood:o,since:e.since+s*sd})}function od(e,t,n,s,o){const i=cn(t?{...e,spot:"arms",holder:t,room:n,x:s,y:o,bed:void 0,seat:void 0}:{...e,spot:"mat",room:n,x:s,y:o,bed:void 0,seat:void 0,holder:void 0});return yf(i,e)?e:i}function Ob(e,t,n,s){let o=t.spot==="crib"||t.spot==="bassinet"?t.spot:"mat",i,a;if(o==="crib"||o==="bassinet"){let l=!1;for(let c=0;c<n.length;c++){const d=n[c];d&&d.id===t.bed&&ho(d.kind)===o&&(l=!0)}l&&t.bed?i=t.bed:o="mat"}if(o==="mat"&&t.seat){let l=null;for(let f=0;f<n.length;f++)n[f]&&n[f].id===t.seat.item&&(l=n[f]);const c=l?Kn(l.kind):null;let d=!1;for(let f=0;f<s.length;f++)s[f].item===t.seat.item&&s[f].n===t.seat.n&&(d=!0);l&&c&&c.pose===t.seat.pose&&!d&&(a=t.seat)}const r=cn({...e,spot:o,room:t.room,x:t.x,y:t.y,bed:i,seat:a,holder:void 0});return yf(r,e)?e:r}function Bb(e,t,n,s){const o=e.spot==="mat"&&e.seat?.item===t,i=!!n&&(e.spot==="crib"||e.spot==="bassinet")&&e.bed===t;return!o&&!i?e:cn({...e,spot:"mat",x:s?s.x:e.x,y:s?s.y:oi,bed:void 0,seat:void 0,holder:void 0})}function w0(e,t){const n=t.scale||1,s=t.w*n,o=t.h*n,i=ho(e);let a=i==="bassinet"?0:-.02*s;const r=i==="bassinet"?-.52*o:-.46*o;return t.flip&&(a=-a),{x:t.x+a,y:t.footY+r}}function Db(e){const t=(o,i)=>({x:o,y:i,spot:"mat",bed:null,seat:null});if(e.mode!=="play"||!e.piece)return t(e.releaseX,e.releaseY);const n=ho(e.piece.kind);if(n){const o=w0(e.piece.kind,e.piece);return{x:o.x,y:o.y,spot:n,bed:e.piece.id,seat:null}}const s=zo({mode:"play",via:"drag",releaseX:e.releaseX,releaseY:e.releaseY,piece:e.piece,occupied:e.occupied});return s.seat?{x:s.x,y:s.y,spot:"mat",bed:null,seat:s.seat}:t(e.releaseX,e.releaseY)}function Hb(e,t=2400){const s=t-40>40?t-40:40;let o=e;return o>=40||(o=40),o>s&&(o=s),{x:o,y:oi}}function Wb(e,t){return!e||e.spot!=="mat"||!e.seat||e.room!==t?null:{item:e.seat.item,n:e.seat.n}}const aa=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],Vb=["living","bedroom","kitchen","salon","nursery","bathroom"],k0=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],Tt=2400,Wn=600,v0=1e3,ii=(Tt-v0)/2,Un=[.75,.875,1,1.25,1.5];function Fn(e){if(typeof e!="number"||!Number.isFinite(e))return 1;let t=1,n=1/0;for(const s of Un){const o=Math.abs(e-s);o<n&&(n=o,t=s)}return t}function Ge(e){return(e?.scale||1)*Fn(e?.size)}function _0(e,t){const n=Fn(t);if(n===1){if(e.size==null)return e;const{size:s,...o}=e;return o}return e.size===n?e:{...e,size:n}}const ai=8,Ub=4,zb=5,Qb=/^[A-Za-z0-9:_\/.-]{1,80}$/;function bf(e){const t=e?.dogKennel;if(!t||typeof t!="object"||typeof t.item!="string"||!Qb.test(t.item))return null;const n=e.rooms;if(!n)return null;for(const s of Object.values(n))if(s?.items?.some(o=>o&&o.id===t.item&&o.kind==="kennel"))return{item:t.item};return null}function Nb(e,t){return bf({dogKennel:{item:t},rooms:e.rooms})!==null}const J=(e,t,n,s,o=1)=>({id:e+"-"+s,kind:e,x:t+ii,y:n,flip:!1,z:s,scale:o});function zn(){return{version:3,houseId:"local",currentRoom:"living",rooms:{living:{wallpaper:"#ffd6e0",floor:"#e8b98a",pattern:1,items:[J("sofa",470,470,1),J("lamp",230,470,2),J("plant",760,480,3),J("rug",480,530,0),J("picture",470,200,4),J("cat",600,520,5),J("window",-350,230,6),J("armchair",-300,480,7),J("bookshelf",1250,470,8),J("tree",1500,480,9),J("clock",1100,170,10)]},bedroom:{wallpaper:"#d9ccff",floor:"#f2d0a4",pattern:2,items:[J("bed",450,480,1),J("window",750,230,2),J("teddy",330,500,3),J("stars",300,180,4),J("tub",1350,480,5),J("lamp",-250,470,6),J("flowers",-150,500,7)]},salon:{wallpaper:"#ffe0f0",floor:"#f6d6ff",pattern:2,items:[J("rug",470,540,0),J("mirror",470,150,1),J("vanity",470,480,2),J("perfume",400,345,3),J("polish",450,345,4),J("hairdryer",560,340,5),J("stool",470,545,6),J("lamp",200,470,7),J("flowers",780,480,8),J("picture",780,200,9),J("chair",-250,490,10),J("mirror",-250,170,11),J("plant",1300,480,12)]},kitchen:{wallpaper:"#cdf3dc",floor:"#ffe7a8",pattern:3,items:[J("fridge",200,470,1),J("table",520,500,2),J("cake",520,395,3),J("stove",800,470,4),J("chair",380,500,5),J("chair",660,500,6),J("juice",470,395,7),J("plant",-300,480,8),J("fish",1300,480,9)]},nursery:{wallpaper:"#d6f3ff",floor:"#f3ddc4",pattern:1,items:[J("cloud-rug",480,545,0),J("crib",470,480,1),J("crib-mobile",470,155,2),J("rocker",780,490,3)]},bathroom:{wallpaper:"#d4f4fb",floor:"#f7e7d4",pattern:3,items:[J("bath-mat",180,560,0),J("shower-curtain",-40,520,1),J("soaking-tub",160,500,2),J("rubber-ducky",300,545,3),J("bath-toilet",480,500,4),J("sink-vanity",700,500,5),J("bath-mirror",700,175,6),J("towel-bar",940,200,7)]},backyard:{wallpaper:"#c5ecff",floor:"#b6e3a8",pattern:0,items:[{id:"yard-bench-1",kind:"yard-bench",x:1122,y:372,flip:!1,z:1,scale:1},{id:"tulip-bed-2",kind:"tulip-bed",x:946,y:580,flip:!1,z:2,scale:1}]}},characters:[Ms({id:"c1",skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6",room:"living",x:330+ii,y:540})],soundOn:!0,dogKennel:null}}function Ms(e){return{skin:"#f1c27d",hair:"#5b3a29",hairStyle:0,shirt:"#ff7aa8",pants:"#5aa9e6",size:"kid",acc:0,room:"living",x:Tt/2,y:540,flip:!1,held:{left:null,right:null},...e}}const Qs=(e,t,n)=>Math.max(t,Math.min(n,e)),pi=e=>e.items.reduce((t,n)=>Math.max(t,n.z),0),qb=e=>e.items.reduce((t,n)=>Math.min(t,n.z),0);function Qa(e,t,n){return{...e,characters:e.characters.map(s=>s.id===t?n(s):s)}}function jb(e,t,n){const s=e.baby;if(!t||!s||s.spot!=="arms"||s.holder!==t.id||n===s.room)return e;const o=t.room===s.room?t.x:s.x,i=t.room===s.room?t.y:oi,a=od(s,null,s.room,o,i);return!a||a===s?e:{...e,baby:a}}function ra(e){if(!e.seat)return e;const{seat:t,...n}=e;return n}let Br=null;function $0(){const e=Br;return Br=null,e}function Na(e,t,n,s){if(!e.baby)return e;const o=s?co(s.x,_n(s.kind)*Ge(s),e.baby.x):null,i=Bb(e.baby,t,n,o);return i===e.baby?e:{...e,baby:i}}function qa(e,t,n){n&&(Br={id:t,x:n.x,kind:n.kind,scale:Ge(n)});let s=!1;const o=e.characters.map(i=>{if(i.seat?.item!==t)return i;if(s=!0,!n)return ra(i);const a=co(n.x,_n(n.kind)*Ge(n),i.x),{seat:r,...l}=i;return{...l,x:a.x,y:a.y}});return s?{...e,characters:o}:e}function Fb(e,t,n,s){if(!s){const i=nd(e.seat,t);return i?e.seat===i?e:{...e,seat:i}:ra(e)}const o=nd(n,t);return o?{...e,seat:o}:ra(e)}function it(e,t,n){const s=e.rooms[t];if(!s)return e;const o=n(s);return o===s?e:{...e,rooms:{...e.rooms,[t]:o}}}function Zb(e){const t=new Set;let n=!1;const s=e.map(o=>{if(!t.has(o.id))return t.add(o.id),o;n=!0;const i=String(o.id).replace(/-d\d+$/,"").replace(/[^A-Za-z0-9:_/.-]/g,"").slice(0,72)||"item";let a=2,r=(i+"-d"+a).slice(0,80);for(;t.has(r);)a+=1,r=(i+"-d"+a).slice(0,80);return t.add(r),{...o,id:r}});return n?s:e}function Gb(e){let t=!1;const n={...e.rooms};for(const s of aa){const o=e.rooms[s];if(!o||!Array.isArray(o.items))continue;const i=Zb(o.items);i!==o.items&&(n[s]={...o,items:i},t=!0)}return t?{...e,rooms:n}:e}function x0(e){if(!e||!e.rooms)return e;const t=zn().rooms,n=e.rooms;let s=!1;for(const i of aa){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(s=!0)}const o=s?(()=>{const i={...n};for(const a of aa){const r=n[a];(!r||typeof r!="object"||!Array.isArray(r.items))&&(i[a]=t[a])}return{...e,rooms:i}})():e;return Gb(o)}function Vi(e,t){switch(Br=null,t.type){case"room/switch":return e.rooms[t.room]?{...e,currentRoom:t.room}:e;case"item/add":return it(e,t.room,n=>n.items.length>=80||n.items.some(s=>s.id===t.item.id)?n:{...n,items:[...n.items,{...t.item,z:pi(n)+1}]});case"item/move":{const n=e.rooms[t.room]?.items.find(o=>o.id===t.id)??null,s=it(e,t.room,o=>({...o,items:o.items.map(i=>i.id===t.id?{...i,x:Qs(t.x,0,Tt),y:Qs(t.y,40,Wn)}:i)}));return t.stand?Na(qa(s,t.id,n),t.id,!1,n):s}case"item/flip":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return Na(qa(it(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?{...o,flip:!o.flip}:o)})),t.id,n),t.id,!1,n)}case"item/size":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||Fn(n.size)===Fn(t.size)?e:it(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?_0(o,t.size):o)}))}case"item/power":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||!r0(n.kind)||!!n.on==!!t.on?e:it(e,t.room,s=>({...s,items:s.items.map(o=>{if(o.id!==t.id)return o;if(t.on)return{...o,on:!0};const{on:i,...a}=o;return a})}))}case"item/front":return it(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:pi(n)+1}:s)}));case"item/back":return it(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:qb(n)-1}:s)}));case"item/delete":{const n=e.rooms[t.room]?.items.find(a=>a.id===t.id)??null,s=n?.kind==="kennel",o=qa(it(e,t.room,a=>({...a,items:a.items.filter(r=>r.id!==t.id)})),t.id,n),i=s&&e.dogKennel?.item===t.id?{...o,dogKennel:null}:o;return Na(i,t.id,!0,n)}case"room/wallpaper":return it(e,t.room,n=>({...n,wallpaper:t.color}));case"room/floor":return it(e,t.room,n=>({...n,floor:t.color}));case"room/pattern":return it(e,t.room,n=>({...n,pattern:t.pattern,wallTile:null}));case"room/wallTile":return it(e,t.room,n=>({...n,wallTile:t.tile}));case"room/floorTile":return it(e,t.room,n=>({...n,floorTile:t.tile}));case"char/add":return e.characters.length>=ai||e.characters.some(n=>n.id===t.char.id)?e:{...e,characters:[...e.characters,t.char]};case"char/update":return Qa(e,t.id,n=>{const{look2:s,costume:o,...i}=t.patch,a={...n,...i};if("look2"in t.patch&&(s?a.look2=s:delete a.look2),"costume"in t.patch){const r=Mo(o);r?a.costume=r:delete a.costume}return a});case"char/move":{if(!e.rooms[t.room])return e;const n=e.characters.find(o=>o.id===t.id),s=Qa(e,t.id,o=>{const i={...o,room:t.room,x:Qs(t.x,0,Tt),y:Qs(t.y,60,Wn)};return Fb(i,e.rooms[t.room].items,t.seat,"seat"in t)});return jb(s,n,t.room)}case"char/delete":{const n=e.characters.find(o=>o.id===t.id);if(!n)return e;let s={...e,characters:e.characters.filter(o=>o.id!==t.id)};if(["left","right"].forEach((o,i)=>{const a=n.held[o];a&&(s=it(s,n.room,r=>({...r,items:[...r.items,{...a,x:n.x+(i?40:-40),y:n.y,z:pi(r)+1}]})))}),s.baby?.spot==="arms"&&s.baby.holder===t.id){const o=od(s.baby,null,s.baby.room,s.baby.x,s.baby.y);o&&o!==s.baby&&(s={...s,baby:o})}return s}case"char/hold":{const n=e.characters.find(r=>r.id===t.id),s=e.rooms[t.room]?.items.find(r=>r.id===t.itemId);if(!n||!s||n.held[t.hand]||n.room!==t.room)return e;const o=qa(it(e,t.room,r=>({...r,items:r.items.filter(l=>l.id!==t.itemId)})),t.itemId,s),i=Qa(o,t.id,r=>({...r,held:{...r.held,[t.hand]:s}})),a=s.kind==="kennel"&&e.dogKennel?.item===t.itemId?{...i,dogKennel:null}:i;return Na(a,t.itemId,!0,s)}case"char/release":{const n=e.characters.find(i=>i.id===t.id),s=n?.held[t.hand];if(!n||!s)return e;const o=Qa(e,t.id,i=>({...i,held:{...i.held,[t.hand]:null}}));return it(o,n.room,i=>({...i,items:[...i.items,{...s,x:Qs(t.x,0,Tt),y:Qs(t.y,40,Wn),z:pi(i)+1}]}))}case"cat/set":return{...e,cat:t.cat};case"cat/move":return e.cat&&e.rooms[t.room]?{...e,cat:{...e.cat,room:t.room,x:Qs(t.x,100,Tt-100)}}:e;case"dog/set":return{...e,dog:t.dog};case"dog/kennel":return t.item===null?e.dogKennel?{...e,dogKennel:null}:e:!Nb(e,t.item)||e.dogKennel?.item===t.item?e:{...e,dogKennel:{item:t.item}};case"ranch/op":{const n=t.op;if(n.op==="take"){const i=e.rooms[n.room];if(i&&i.items.some(a=>a.id===n.id))return e}const s=td(df(e.garden),cf(e.basket),t.op,t.now,e.lastEgg??0);if(typeof s=="string")return e;let o={...e,garden:s.plots,basket:s.basket,lastEgg:t.op.op==="egg"?t.now:e.lastEgg};if(t.op.op==="take"&&o.rooms[t.op.room]){const i=t.op;o=it(o,i.room,a=>a.items.length>=80?a:{...a,items:[...a.items,{id:i.id,kind:Xy[i.kind],x:i.x,y:560,flip:!1,z:pi(a)+1,scale:1}]})}return o}case"settings/sound":return{...e,soundOn:t.on};case"game/reset":return c0(zn());case"baby/meet":return e.baby?e:{...e,baby:Rb(e.rooms,t.now)};case"baby/name":return!e.baby||!t.name||t.name===e.baby.name?e:{...e,baby:cn({...e.baby,name:t.name})};case"baby/care":{if(!e.baby)return e;const n=Cb(e.baby,t.care,t.now);return n===e.baby?e:{...e,baby:n}}case"baby/hold":{if(!e.baby)return e;const n=od(e.baby,t.holder,t.room,t.x,t.y);return!n||n===e.baby?e:{...e,baby:n}}case"baby/place":{if(!e.baby||!e.rooms[t.room])return e;const n=e.characters.filter(o=>o.room===t.room&&o.seat).map(o=>({item:o.seat.item,n:o.seat.n})),s=Ob(e.baby,t,e.rooms[t.room].items,n);return s===e.baby?e:{...e,baby:s}}case"baby/ease":{if(!e.baby)return e;const n=Ib(e.baby,t.now);return n?{...e,baby:n}:e}case"need/meet":return _b(e,t.id,t.need);case"need/drift":return $b(e,t.id,t.need)}}const ja=wt("cozy-house"),Yb=wt("cozy-house-v1");function wf(e){if(!e||typeof e!="object"||!e.rooms)return zn();let t=e;if(t.version===1){const f=p=>(Number(p)||0)+ii,u={};for(const[p,y]of Object.entries(t.rooms))u[p]={...y,items:(y.items??[]).map(m=>({...m,x:f(m.x)}))};t={...t,version:2,rooms:u,character:{...t.character,x:f(t.character?.x)}}}if(t.version===2){const f=t.character??{};t={...t,version:3,characters:[Ms({...f,id:"c1",size:"kid",acc:0,held:{left:null,right:null}})]},delete t.character}if(t.version!==3)return zn();const n=zn(),s=(Array.isArray(t.characters)?t.characters:[]).slice(0,ai).map((f,u)=>{const p=f?.look2,y=Ms({...f,id:String(f.id??"c"+(u+1)),held:{left:f.held?.left??null,right:f.held?.right??null}});if(delete y.look2,p!=null){const k=$a(p);k&&(y.look2=k)}if("costume"in y){const k=Mo(y.costume);k?y.costume=k:delete y.costume}delete y.needs;const m=pf(f?.needs);return m&&(y.needs=m),y}),o=x0({...n,...t,rooms:{...n.rooms,...t.rooms},characters:s}),i=Kh(o),a=bf(i),r=a===o.dogKennel?o:{...o,dogKennel:a},l=ib(r.mailbox);let c=i===o?r:{...r,characters:i.characters};if(l)c={...c,mailbox:l};else if(c.mailbox){const{mailbox:f,...u}=c;c=u}const d=Ab(c.baby,c.rooms);if(d)c={...c,baby:d};else if("baby"in c){const{baby:f,...u}=c;c=u}return Kh(Kb(c))}function Kh(e){let t=!1;const n=e.characters.map(s=>{const o=nd(hf(s.seat),e.rooms[s.room]?.items);return o?s.seat?.item===o.item&&s.seat.pose===o.pose&&s.seat.n===o.n?s:{...s,seat:o}:s.seat?(t=!0,ra(s)):s});return!t&&n.every((s,o)=>s===e.characters[o])?e:{...e,characters:n}}function Kb(e){const t=e.currentRoom,n=k0.includes(t),s=a=>aa.includes(a);let o=!1;const i=e.characters.map(a=>{const r=a.room;return!s(r)||!n&&r===t?(o=!0,{...a,room:"living"}):a});return n&&!o?e:{...e,currentRoom:n?e.currentRoom:"living",characters:i}}const Ns=wt("cozy-house-bak"),gi=wt("cozy-house-corrupt-"),Xb=20,Jb=2,ew=5;function Fa(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.rooms&&(t.version===1||t.version===2||t.version===3)?wf(t):null}catch{return null}}const Xh=e=>!!e&&(e.name==="QuotaExceededError"||e.name==="NS_ERROR_DOM_QUOTA_REACHED"||e.code===22||e.code===1014);function M0(){let e,t=!1,n=null,s=!1,o=null;try{o=localStorage.getItem(ja)??localStorage.getItem(Yb)}catch{o=null}let i=!1,a=()=>{i=!0},r=!1;const l=()=>{if(!r)return!0;try{for(let $=0;$<localStorage.length;$++){const x=localStorage.key($);if(x&&x.startsWith(gi)&&localStorage.getItem(x)===o)return r=!1,!0}localStorage.setItem(gi+Date.now(),o),r=!1;try{const $=[];for(let x=0;x<localStorage.length;x++){const H=localStorage.key(x);H&&H.startsWith(gi)&&$.push(H)}$.sort((x,H)=>Number(x.slice(gi.length))-Number(H.slice(gi.length))),$.slice(0,Math.max(0,$.length-Jb)).forEach(x=>localStorage.removeItem(x))}catch{}return!0}catch($){return Xh($)&&a(),!1}},c=o!==null?Fa(o):null;if(o!==null&&c){e=c,s=!0;try{localStorage.getItem(Ns)!==o&&localStorage.setItem(Ns,o)}catch{}}else if(o!==null){r=o.trim()!=="",l();let $=null;try{$=localStorage.getItem(Ns)}catch{}const x=$?Fa($):null;if(x){if(e=x,s=!0,n="restored",l())try{localStorage.setItem(ja,$)}catch{}}else e=zn(),n="unreadable"}else if((()=>{try{return localStorage.getItem(Ns)}catch{return null}})()!==null&&Fa(localStorage.getItem(Ns))){const $=localStorage.getItem(Ns);e=Fa($),s=!0,n="restored";try{localStorage.setItem(ja,$)}catch{}}else t=!0,e=zn(),typeof navigator<"u"&&(e=navigator.webdriver?c0(e):Hy(e));const d=[],f=[],u=$=>{n=$,f.forEach(x=>x($))};let p,y,m=!1,k=0,b=0;a=()=>{i||(i=!0,u("full"))};const g=()=>{if(clearTimeout(p),p=void 0,!!m){if(!l()){_();return}try{const $=JSON.stringify(e);if(localStorage.setItem(ja,$),m=!1,clearTimeout(y),y=void 0,b=0,s&&++k%Xb===0)try{localStorage.setItem(Ns,$)}catch{}}catch($){Xh($)&&a(),_()}}},w=()=>{m&&g()};function _(){clearTimeout(y),y=void 0,!(++b>ew)&&(y=window.setTimeout(()=>{y=void 0,g()},5e3))}const P=()=>{b=0,w()};return typeof window<"u"&&(document.addEventListener("visibilitychange",P),window.addEventListener("pagehide",w),window.addEventListener("beforeunload",w)),{get:()=>e,subscribe($){d.push($)},dispatch($){e=Vi(e,$),d.forEach(x=>x(e,$)),m=!0,b=0,clearTimeout(p),p=window.setTimeout(g,250)},flush:w,trouble:()=>n,fullAtStart:i,onTrouble($){f.push($)},born:t}}const tw=Object.freeze(Object.defineProperty({__proto__:null,CAT_COATS:Ub,DOG_BREEDS:zb,ITEM_SIZE_STEPS:Un,MAX_CHARS:ai,ROOM_H:Wn,ROOM_IDS:aa,ROOM_W:Tt,SCENE_ROOMS:k0,TAB_ROOMS:Vb,V1_OFFSET:ii,V1_ROOM_W:v0,applyItemSize:_0,createStore:M0,drawnScale:Ge,ensureRooms:x0,initialState:zn,itemSizeOf:Fn,migrate:wf,newCharacter:Ms,reduce:Vi,standChar:ra,takeClearedFurniture:$0,validKennel:bf},Symbol.toStringTag,{value:"Module"})),ps=256,gs=192,kf=["#ffffff","#5a3d5c","#ff6b6b","#ff8fab","#ffa94d","#ffd43b","#69db7c","#2f9e44","#4dabf7","#1c5fb8","#b388d6","#7048b6","#c9905a","#7a4b2a","#ced4da","#212529"],id=8e3,Ui=12,L0=["wood","plum","gold","rainbow"],nw=/^a[0-9a-z]{6,24}$/,sw=/^P1[A-Za-z0-9+/]+={0,2}$/;function vf(e){return typeof e!="string"||e.length<4||e.length>id||!sw.test(e)||(e.length-2)%4!==0?null:e}function E0(e){return typeof e=="string"&&nw.test(e)?e:null}function ow(e){const t=[];let n=0;for(;n<e.length;){const s=e[n]&15;let o=1;for(;n+o<e.length&&(e[n+o]&15)===s&&o<2056;)o++;if(o<=8)t.push(o-1<<4|s);else{const i=o-9;t.push(128|i>>8<<4|s,i&255)}n+=o}return Uint8Array.from(t)}function iw(e,t=ps*gs){const n=new Uint8Array(t);let s=0;for(let o=0;o<e.length&&s<t;o++){const i=e[o];let a;if(i<128)a=(i>>4)+1;else{if(o+1>=e.length)break;a=((i>>4&7)<<8|e[++o])+9}const r=Math.min(t,s+a);n.fill(i&15,s,r),s=r}return n}const Ti="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function aw(e){let t="";for(let n=0;n<e.length;n+=3){const s=e[n],o=e[n+1],i=e[n+2];t+=Ti[s>>2]+Ti[(s&3)<<4|(o??0)>>4]+(o===void 0?"=":Ti[(o&15)<<2|(i??0)>>6])+(i===void 0?"=":Ti[i&63])}return t}function rw(e){const t=e.replace(/=+$/,""),n=[];let s=0,o=0;for(const i of t){const a=Ti.indexOf(i);if(a<0)break;s=s<<6|a,o+=6,o>=8&&(o-=8,n.push(s>>o&255))}return Uint8Array.from(n)}const pc=e=>"P1"+aw(ow(e));function S0(e){return!e||!vf(e)?new Uint8Array(ps*gs):iw(rw(e.slice(2)))}function ad(e,t){for(let n=e.length-1;n>0;n--){const s=Math.floor(t()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}const T0=4,Jh=7,lw=30;function cw(){const e=[];let t=0;for(let n=0;n<T0;n++){e.push({id:t++,c:n,v:0});for(let s=1;s<=9;s++)for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s});for(const s of["skip","rev","d2"])for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s})}for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"wild"});for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"w4"});return e}const rd=e=>e.discard[e.discard.length-1],mi=(e,t)=>t.c===4||t.c===e.color||t.v===rd(e).v&&rd(e).c!==4,ts=(e,t,n=1)=>{const s=e.hands.length;return((t+e.dir*n)%s+s)%s};function ld(e,t,n,s){const o=[];for(let i=0;i<n&&e.hands[t].length<lw;i++){if(!e.deck.length){const r=e.discard.pop();if(e.deck=ad(e.discard.map(l=>l),s),e.discard=[r],!e.deck.length)break}const a=e.deck.pop();e.hands[t].push(a),o.push(a)}return e.hands[t].length>1&&(e.slay[t]=!1),o}function dw(e,t){if(e.owe!==null&&e.hands[e.owe]?.length===1&&!e.slay[e.owe]){const n=e.owe;return e.owe=null,{victim:n,vdrew:ld(e,n,2,t).length}}return e.owe=null,{}}const eu=e=>{const t=[0,0,0,0];return e.forEach(n=>{n.c<4&&t[n.c]++}),t.indexOf(Math.max(...t))},fw={id:"slay",name:"Slay",minPlayers:2,maxPlayers:6,setup(e,t){const n=ad(cw(),t),s=Array.from({length:e},()=>n.splice(-Jh,Jh));let o=n.length-1;for(;typeof n[o].v!="number";)o--;const i=n.splice(o,1)[0];return{deck:n,discard:[i],hands:s,color:i.c,turn:Math.floor(t()*e),dir:1,drawn:null,slay:s.map(()=>!1),owe:null,winner:null,ev:{n:0,p:-1,k:"start",card:i}}},cleanMove(e){return!e||typeof e!="object"?null:e.k==="play"&&Number.isInteger(e.id)&&e.id>=0&&e.id<108?{k:"play",id:e.id,...Number.isInteger(e.color)&&e.color>=0&&e.color<T0?{color:e.color}:{}}:e.k==="draw"||e.k==="pass"||e.k==="slay"?{k:e.k}:null},legal(e,t,n){if(e.winner!==null)return!1;if(n.k==="slay")return e.hands[t].length<=2&&!e.slay[t];if(t!==e.turn)return!1;if(n.k==="draw")return e.drawn===null;if(n.k==="pass")return e.drawn!==null;const s=e.hands[t].find(o=>o.id===n.id);return!s||e.drawn!==null&&s.id!==e.drawn||s.c===4&&n.color===void 0?!1:mi(e,s)},apply(e,t,n,s){const o=e.ev.n+1;if(n.k==="slay")return e.slay[t]=!0,e.owe===t&&(e.owe=null),e.ev={n:o,p:t,k:"slay"},e;const i=dw(e,s);if(n.k==="draw"){const d=ld(e,t,1,s),f=d[0];if(f&&mi(e,f))e.drawn=f.id,e.ev={n:o,p:t,k:"draw",drew:1,...i};else{if(e.drawn=null,e.ev={n:o,p:t,k:"draw",drew:d.length,...i},e.stuck=d.length?0:(e.stuck??0)+1,(e.stuck??0)>=e.hands.length){const u=Math.min(...e.hands.map(p=>p.length));return e.winner=e.hands.findIndex(p=>p.length===u),e.turn=-1,e}e.turn=ts(e,t)}return e}if(n.k==="pass")return e.drawn=null,e.turn=ts(e,t),e.ev={n:o,p:t,k:"pass",...i},e;e.stuck=0;const a=e.hands[t],r=a.splice(a.findIndex(d=>d.id===n.id),1)[0];e.discard.push(r),e.drawn=null,e.color=r.c===4?n.color:r.c;const l={n:o,p:t,k:"play",card:r,color:e.color,...i};if(!a.length)return e.winner=t,e.turn=-1,e.ev=l,e;a.length===1&&!e.slay[t]&&(e.owe=t);const c=e.hands.length===2;if(r.v==="rev")e.dir=e.dir===1?-1:1,e.turn=c?t:ts(e,t);else if(r.v==="skip")l.skipped=ts(e,t),e.turn=ts(e,t,2);else if(r.v==="d2"||r.v==="w4"){const d=ts(e,t);l.skipped=d;const f=r.v==="d2"?2:4;l.drew=ld(e,d,f,s).length,e.turn=ts(e,t,2)}else e.turn=ts(e,t);return e.ev=l,e},turn:e=>e.winner!==null?-1:e.turn,winner:e=>e.winner,view(e,t){return{top:rd(e),color:e.color,turn:e.winner!==null?-1:e.turn,dir:e.dir,deck:e.deck.length,counts:e.hands.map(n=>n.length),slay:e.slay,winner:e.winner,ev:e.ev,...t!==null&&e.hands[t]?{hand:e.hands[t],drawn:t===e.turn?e.drawn:null}:{}}},autoMove(e,t){if(t!==e.turn)return null;if(e.drawn!==null){const s=e.hands[t].find(o=>o.id===e.drawn);return s&&mi(e,s)?{k:"play",id:s.id,...s.c===4?{color:eu(e.hands[t])}:{}}:{k:"pass"}}const n=e.hands[t].find(s=>mi(e,s)&&s.c!==4)??e.hands[t].find(s=>mi(e,s));return n?{k:"play",id:n.id,...n.c===4?{color:eu(e.hands[t])}:{}}:{k:"draw"}},removePlayer(e,t,n){if(e.hands.length<=2)return null;const s=e.turn===t;return e.deck.unshift(...e.hands[t]),ad(e.deck,n),e.hands.splice(t,1),e.slay.splice(t,1),e.owe===t?e.owe=null:e.owe!==null&&e.owe>t&&e.owe--,e.turn>t&&e.turn--,s&&(e.drawn=null,e.dir===-1?e.turn=((t-1)%e.hands.length+e.hands.length)%e.hands.length:e.turn=t%e.hands.length),e.ev={n:e.ev.n+1,p:t,k:"left"},e}},cd=7,yr=6,hw=(e,t,n)=>{const s=e[t][n];for(const[o,i]of[[1,0],[0,1],[1,1],[1,-1]]){const a=[[t,n]];for(const r of[1,-1])for(let l=1;l<4;l++){const c=t+o*l*r,d=n+i*l*r;if(c<0||c>=cd||d<0||d>=yr||e[c][d]!==s)break;a.push([c,d])}if(a.length>=4)return a}return null},uw={id:"four",name:"Four in a Row",minPlayers:2,maxPlayers:2,setup:(e,t)=>({b:Array.from({length:cd},()=>[]),turn:t()<.5?0:1,winner:null,draw:!1,line:null,last:null,n:0}),cleanMove:e=>e&&Number.isInteger(e.col)&&e.col>=0&&e.col<cd?{col:e.col}:null,legal:(e,t,n)=>e.winner===null&&!e.draw&&t===e.turn&&e.b[n.col].length<yr,apply(e,t,n){e.b[n.col].push(t);const s=e.b[n.col].length-1;e.last={col:n.col,row:s,p:t},e.n++;const o=hw(e.b,n.col,s);return o?(e.winner=t,e.line=o,e.turn=-1):e.b.every(i=>i.length>=yr)?(e.draw=!0,e.turn=-1):e.turn=1-t,e},turn:e=>e.turn,winner:e=>e.winner,view:e=>e,autoMove:(e,t)=>{if(t!==e.turn)return null;const s=[3,2,4,1,5,0,6].find(o=>e.b[o].length<yr);return s===void 0?null:{col:s}},removePlayer:()=>null},P0={slay:fw,four:uw},Ma=2600,uo=[{game:"slay",seats:6,x:720},{game:"four",seats:2,x:1500},{game:"slay",seats:4,x:2150}],pw=2e4,gw="winter",mw="Winter Cheer",yw={[gw]:mw},bw=["pack:wc-holiday-tree","pack:wc-gingerbread","pack:wc-gingerbread-village","pack:wc-bauble-garland","pack:wc-stocking-row","pack:wc-cane-lamp","pack:wc-star-topper","pack:wc-poinsettia","pack:wc-holly","pack:wc-nutcracker","pack:wc-reindeer","pack:wc-sleigh-planter"],ww=["Berry Wreath","Birch Log Basket","Cabin Picture","Cabin Planks","Candy Cane Lamp","Candy Stripe","Cinnamon Roll Tray","Cocoa Cart","Cocoa Pot","Cookie Oven","Cookie Plate","Cozy Red Plaid","Cozy Sock Hamper","Decorated Holiday Tree","Frosted Pine","Frosty Bookcase","Frosty Dots","Fur-Trim Bench","Gingerbread Cottage","Gingerbread Village","Holly Sprig","Ice Skates","Ice-Blue Wardrobe","Knit Pom Rug","Knit Stocking Row","Knit-Blanket Armchair","LED Candle Trio","Lantern","Log Bench","Marshmallow Jar","Mint Pine Sprigs","Mitten Ottoman","Mittens on a Line","Mug Tree Shelf","Mug of Cocoa","Nutcracker Friend","Penguin Plush","Penguin Plush Chair","Peppermint Counter","Peppermint Swirl Rug","Peppermint Tiles","Pinecone Garland","Pinecone Side Table","Plaid Cabin Sofa","Poinsettia Pot","Polar Bear Plush","Red Plaid Quilt Bed","Reindeer Plush","Ribbon Bauble Garland","Sled Coffee Table","Sleigh Planter","Snow Globe","Snow Knit Carpet","Snow-Globe Lamp","Snowflake Mobile","Snowflake Nightstand","Snowflake Sky","Snowman Buddy","Snowshoes","Snowy Window Art","Snowy Window Seat","Star Tree Topper","Stone Hearth Fireplace","Twinkle Light String","Twinkle-Light Floor Lamp","Winter Cheer","Woodstove","Wrapped Present Stack"],A0="halloween",kw="Spooky Cute",vw={[A0]:kw},_w=!1;function $w(e=new Date){const t=e.getMonth(),n=e.getDate();return t===9&&n>=24||t===10&&n<=2}function R0(e=new Date,t=_w){return t||$w(e)}const xw=["pack:hw-cauldron","pack:hw-cat-statue","pack:hw-witch-hat"],Mw=["Autumn Leaf Garland","Black Cat Statue","Bubbly Cauldron","Friendly Sheet Ghost","Harvest Hay Bale","Heart and Moon Pumpkin","Moon and Stars Window Cling","Moonbeam Lantern","Spooky Cute","Starry Glow Pumpkin","Starry Witch Hat","Treat Bowl"],Lw=["A-Frame Swing","Acorn Friend","Alarm Clock","Apple","Apple Tree","Arc Floor Lamp","Arc Lamp","Arched Mirror","Arched Shelf","Armchair","Autumn Wreath","Baby Blocks","Baby Bottle","Bakery Shelf","Ball","Balloons","Bananas","Bar Stool","Bassinet","Bath Mat","Bath Mirror","Bath Stool","Bathtub","Beach Ball","Bean Bag","Bed","Berry Basket","Big Leaf Plant","Big Monitor","Big Wardrobe","Birdbath","Birdhouse","Birdie","Blanket Basket","Blocks","Boba Buddy","Book Stack","Books","Bookshelf","Box Stack","Bread","Brush & Comb","Bubble Aquarium","Bubble Bath","Bubble Chair","Bubble-Gum Rug","Bubbly Fountain","Bubbly Plant","Bud Vase","Bulletin Board","Bunk Bed","Bunny","Bunny Plush","Bunny Slippers","Butterfly Bush","Cactus","Cactus Buddy","Cada's Mouse","Cake","Candle Jar","Canopy Bed","Canopy Daybed","Cat Bed","Cat Tower","Caterpillar Plush","Chair","Changing Table","Checker Rug","Checkered Bed","Chick","Chloe's Star Lamp","Clock","Clothes Rail","Clothesline","Cloud Beanbag","Cloud Lamp","Cloud Rug","Cloud Shelf","Cocoa Doll","Cocoa Mug","Coffee Table","Comfy Chair","Cookie Jar","Cooking Pot","Cottage Heart Pouf","Cottage Heart Rug","Counter","Cozy Fireplace","Cozy Lights","Cozy Mug","Cozy Nightstand","Cozy Reading Nook","Cozy Snake Plant","Cozy Teapot","Cream Jars","Cream Sofa","Crib","Crib Mobile","Cubby Shelf","Cube Shelf","Cupcake","Cupcake Stand","Curtains","Curvy Yellow Desk","Cute Keyboard","Cute Speaker","Daisy Pot","Daisy Rug","Desk","Desk Lamp","Desk Mic","Dino Plushie","Dish Cabinet","Dish Rack","Dog Kennel","Doll House","Donut","Dresser","Droplet Buddy","Egg Pan","Fairy-Light Garland","Fairy-Light Shelf","Fan","Fancy Sofa","Fiddle-Leaf Fig","Fig Tree","Fire Pit","Fireplace","Fish Bowl","Fish Tank","Floor Cushion","Flower Cart","Flower Floor Lamp","Flower Kettle","Flower Lamp","Flowers","Foot Spa","Fresh Egg","Fridge","Frog Plush","Fruit Bowl","Game Controller","Gaming Chair","Garden Bench","Garden Carrot","Garden Gnome","Glass Cabinet","Globe","Globe Pendants","Glossy Hair Dryer","Glow Mirror","Gold Floor Mirror","Guinea Pig","Hair Dryer","Hair-Dryer Chair","Hair-Wash Chair","Hammock","Hamster House","Hamster Pal","Hanging Lamp","Hanging Lantern","Hanging Plant","Hanging Vine Planter","Happy Fridge","Headphones","Heart Headboard Bed","Heart Pouf","Heart Rug","Heart Wall Clock","Heart Wall Light","Heart-Leaf Plant","Hedge Row","Herb Box","High Chair","Honey Doll","Ice Cream","Jewelry Box","Juice","Kettle","Kitchen Counter","Knit Cushion","Ladder Shelf","Lamp","Landscape Art","Lattice Bench","Laundry Hamper","Lava Lamp","Lemon Tree","Lemonade Cart","Lemonade Cup","Lighted Vanity","Lilac Curtain","Lily Pond","Little Rocking Horse","Little Slide","Little Sprout","Lotion Bottles","Macaron Jar","Macrame Swing Chair","Mani-Pedi Chair","Manicure Table","Microwave","Milk","Milk & Cookies","Mini Fridge","Mini Greenhouse","Mini Tree","Mint Fridge","Mint Pebble Rug","Mirror","Mixer","Moon and Stars","Moon Night-Light","Moving Box","Mushroom Stool","Music Box","Nail Dryer","Nail Polish","Nail Polish Rack","Night Light","Nightstand","Nursery Cloud Rug","Nursery Dresser","Nursery Lamp","Pancakes","Pantry","Paper Lantern","Pastel Range","Pastel Wardrobe","Patio Lights","Patio Umbrella","Pendant Lamp","Perfume","Perfume Bottle","Perfume Tray","Pet Bowl","Petal Coffee Table","Phone on a Stand","Piano","Picket Gate","Picnic Basket","Picnic Blanket","Picnic Table","Picture","Piggy Bank","Pillow","Pin Board","Pink Vanity","Pinwheel","Pizza","Plant","Plant Stand","Plant Wall","Play Mat","Play Tent","Polish Bottle","Popcorn","Pothos Plant","Pouf","Puffy Cloud Sofa","Puffy Stool","Puppy","Quinn's Cookie Pup","Radio","Rain Barrel","Rainbow Art","Rainbow Rug","Ranch Flowers","Rattle","Reagan's Frame","Reception Desk","Record Player","Ribbon Mirror","Ribbon Tray","Rice Cooker","Ring Light","Robot","Rocker","Rocking Chair","Rocking Horse","Rose Doll","Round Breakfast Table","Round Side Table","Round Woven Rug","Rubber Ducky","Rug","Runner Rug","Salon Chair","Sandbox","Scallop Curtains","Scalloped Loveseat","Seesaw","Shelf","Shower Curtain","Sink","Sink Vanity","Sloane's Rainbow Snail","Snake Plant","Soaking Tub","Soap Dish","Sofa","Sparkle Wall Light","Spice Rack","Splash Pool","Spray Bottle","Sprinkler","Stacking Rings","Star Dresser","Star Lamp","Star Mobile","Stars","Stepping Stones","Sticker Board","Story Pillow","Stove","String Lights","Striped Runner","Succulents","Sun Lounger","Sunny Art","Sunny Bean Bag","Sunny Cloud Rug","Sunny Shelf","Swing Chair","Swivel Stool","Table","Tassel Rug","Teapot","Teapot Set","Teddy","Tiered Tray","Toadstool Light","Toaster","Toilet","Towel Bar","Towel Cart","Towel Stack","Toy Bin","Toy Car","Toy cat","Toy Chest","Toy Train","Trailing Plant Shelf","Tulip Bed","Tulip Vase","Turtle","TV","TV Stand","Unicorn Plushie","Utensil Rail","Vanity","Vanity Stool","Vegetable Patch","Vlog Camera","Wagon","Waiting Bench","Wall Shelf","Wardrobe","Water-Drop Lamp","Watermelon","Wavy Floor Lamp","Window","Window Seat","Wood Armchair","Wood Bookshelf","Wood Coffee Table","Wood Desk","Wood Dresser","Wood Stool","Wood Wall Clock","Wooden Bed","Yard Sign",...ww,...Mw],Ew=4,_f=16,Dr=e=>String(e??"").toUpperCase().replace(/[^A-Z0-9]/g,""),Sw=e=>e.length>=Ew&&e.length<=_f&&/^[A-Z0-9]+$/.test(e),Tw=12,Pw=["Cada","Chloe","Quinn","Reagan","Sloane"],Aw=460,Rw=320,tu=["Sunny Bunny","Bubbly Panda","Sparkle Kitty","Happy Hippo","Cozy Koala","Jolly Jelly","Zippy Fox","Dreamy Deer","Giggly Goose","Peachy Pup","Minty Mouse","Rainbow Duck","Cuddly Cub","Starry Owl","Bouncy Frog","Lucky Lamb","Snuggly Seal","Twinkle Tiger","Berry Bear","Cloudy Llama","Pebble Penguin","Honey Hedgehog","Marshmallow Moose","Cupcake Cat"],zi=["Hi!","Come over!","I love your house!","Let's play!","Follow me!","Look at this!","Want a snack?","Nice!","Yes!","No thanks","Hehe","Be right back","Bye!","Let's decorate!","Wanna race?","So cute!"],C0=["👋","😀","😂","😍","😮","😢","🎉","⭐","❤️","👍","🍕","🐱","🌈","🎶","💤","✨"],$f=60,Cw={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t","@":"a",$:"s","!":"i","+":"t"},gc=["fuck","fuk","fck","shit","sht","bitch","btch","bastard","asshole","ass","dick","cock","pussy","cunt","whore","slut","damn","crap","piss","fag","faggot","retard","nigger","nigga","porn","sex","sexy","nude","naked","boob","boobs","penis","vagina","kill","suicide","stupid","idiot","dumb","hate","loser","shutup","wtf","stfu","gtfo","bs"],Iw=["zero","oh","one","two","three","four","five","six","seven","eight","nine","ten"],Ow=[/\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i,/\bi\s*live\s+(at|on|in)\b/i,/\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,/\b(password|passcode|zip\s*code|postcode)\b/i,/\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i],Bw=/(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i,Dw=/\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i,Hw=/@\w/,Ww=/\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;function Vw(e,t=$f){if(typeof e!="string")return{ok:!1,reason:"empty"};const n=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(!n)return{ok:!1,reason:"empty"};if(n.length>t)return{ok:!1,reason:"long"};if(Bw.test(n))return{ok:!1,reason:"link"};if(Dw.test(n)||Hw.test(n))return{ok:!1,reason:"contact"};if((n.match(/\d/g)??[]).length>=5||/\d[\d\s().\-]{4,}\d/.test(n)||Ww.test(n))return{ok:!1,reason:"contact"};const o=n.toLowerCase().split(/[^a-z]+/).filter(Boolean);let i=0;for(const c of o)if(i=Iw.includes(c)?i+1:0,i>=4)return{ok:!1,reason:"contact"};if(Ow.some(c=>c.test(n)))return{ok:!1,reason:"personal"};const a=n.toLowerCase().replace(/[0-9@$!+]/g,c=>Cw[c]??c),r=a.split(/[^a-z]+/).filter(Boolean),l=a.replace(/[^a-z]/g,"").replace(/(.)\1{2,}/g,"$1$1");return r.some(c=>gc.includes(c)||gc.includes(c.replace(/(.)\1+/g,"$1")))||gc.filter(c=>c.length>=5).some(c=>l.includes(c))?{ok:!1,reason:"words"}:{ok:!0,text:n}}const Uw={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t",8:"b","@":"a",$:"s","!":"i","+":"t",v:"u","|":"k","<":"k","#":"h"};function zw(e){return/^f+u+c+k+$/.test(e)||/^f+u+k+$/.test(e)||/^f+c+k+$/.test(e)||/^s+h+i+t+$/.test(e)||/^s+h+t+$/.test(e)||/^b+i+t+c+h+$/.test(e)||/^b+t+c+h+$/.test(e)||/^a+s+h+o+l+e+$/.test(e)||/^d+u+m+b+a+s+$/.test(e)||/^n+i+g{2,}e+r+$/.test(e)||/^n+i+g{2,}a+$/.test(e)||/^f+a+g+$/.test(e)||/^f+a+g+o+t+$/.test(e)||/^r+e+t+a+r+d+$/.test(e)||/^k+y+s+$/.test(e)}function Qw(e){return/^c+u+n+t+$/.test(e)||/^a+h+o+l+e+$/.test(e)||/^k+i+k+e+$/.test(e)||/^c+h+i+n+k+$/.test(e)||/^s+p+i+c+$/.test(e)||/^c+o{2,}n+$/.test(e)||/^w+e+t+b+a+c+k+$/.test(e)||/^t+r+a+n+y+$/.test(e)||/^t+r+a+n+i+$/.test(e)||/^d+y+k+e+$/.test(e)||/^b+e+a+n+e+r+$/.test(e)||/^g+o{2,}k+$/.test(e)||/^r+a+g+h+e+a+d+$/.test(e)||/^t+o+w+e+l+h+e+a+d+$/.test(e)||/^h+e+i+l+h+i+t+l+e+r+$/.test(e)}const Nw=new Set(["spicy","spices","spicing","spicey","spicier","spiciest","cocky","chinking","spicer","gooky","slutty","twatt"]);function qw(e,t){if(!/^[a-z]+$/.test(e)||t&&Nw.has(e))return!1;const n=[e],s=["ing","in","ers","er","ed","es","y","s"];for(let o=0;o<s.length;o++){const i=s[o];e.endsWith(i)&&e.length>i.length+2&&n.push(e.slice(0,-i.length))}for(let o=0;o<n.length;o++)if(zw(n[o])||t&&Qw(n[o]))return!0;return!1}function jw(e){if(!e.includes("*"))return[e];const t=e.split("*").length-1,n=e.replace(/\*/g,""),s=n?[n]:[];if(t<1||t>3)return s;const o=e.split(""),i=[];for(let r=0;r<o.length;r++)o[r]==="*"&&i.push(r);const a=r=>{if(r===i.length){s.push(o.join(""));return}for(let l=97;l<=122;l++)o[i[r]]=String.fromCharCode(l),a(r+1)};return a(0),s}const nu=["mother","sonofa","horse","bull","dip"],su=["face","head","you"];function Qo(e,t){const n=e.replace(/ph(?=u+c+k)/g,"f").replace(/ph(?=u+k)/g,"f");if(qw(n,t)||/^w+t+f+$/.test(n)||/^s+t+f+u+$/.test(n))return!0;for(let s=0;s<nu.length;s++){const o=nu[s];if(n.startsWith(o)&&n.length>o.length+2&&Qo(n.slice(o.length),t))return!0}for(let s=0;s<su.length;s++){const o=Fw(n,su[s]);if(o&&Qo(o,t))return!0}return!!(n.length>4&&n.endsWith("s")&&!n.endsWith("ss")&&Qo(n.slice(0,-1),t))}function Fw(e,t){let n=e.length;for(let s=t.length-1;s>=0;s--){const o=t[s];if(n===0||e[n-1]!==o)return null;for(;n>0&&e[n-1]===o;)n--}return n<=2?null:e.slice(0,n)}function Hr(e){let t="";for(let n=0;n<e.length;n++)t+=Uw[e[n]]??e[n];return t}const Zw={ѕ:"s",һ:"h",с:"c",а:"a",е:"e",о:"o",р:"p",і:"i",х:"x",у:"y",к:"k"};function Gw(e){const n=e.replace(/[\u00ad\u0336\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").normalize("NFKC").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase();let s="";for(let o=0;o<n.length;o++)s+=Zw[n[o]]??n[o];return s}const Yw=new Set(["it","its","it's","is","as","a","i","uh","oh","so","he","she","hi","um","umm","hmm","hm","ah","eh","er","ow","ha","hey","yo","ok","yeah","yes","no","nah","wow","ho","ooh","ahh","uhh","ohh"]);function la(e){return e>="a"&&e<="z"||e>="0"&&e<="9"||"@$!+*v|#<".includes(e)}function ou(e,t){let n=t;for(;n<e.length&&e[n]==="!";)n++;if(n>=e.length||!la(e[n])||e[n]==="!")return null;const s=e[n];let o=n+1;for(;o<e.length&&e[o]==="!";)o++;return o<e.length&&la(e[o])?null:{ch:s,end:o}}function Kw(e,t){const n=e.length,s=" .-_~";let o=0;for(;o<n;){if(o>0&&la(e[o-1])){o++;continue}const i=ou(e,o);if(!i){o++;continue}const a=[i.ch];let r=i.end;for(;r<n&&s.includes(e[r]);){const l=ou(e,r+1);if(!l)break;a.push(l.ch),r=l.end}if(a.length>=2){const l=Hr(a.join("")).replace(/\*/g,"");if(Qo(l,t))return!0}o=Math.max(o+1,r)}return!1}function po(e){return e.replace(/^!+/,"").replace(/!+$/,"")}function Wr(e){return Hr(po(e)).replace(/\*/g,"")}function I0(e){return/[0-9@$!+*|#<]/.test(po(e))}function Xw(e){return po(e).length===1}function Jw(e){const t=po(e);return t.length<2||I0(e)?!1:/^sh+$/.test(t)||Yw.has(t)}function ek(e){let t="space";for(let n=0;n<e.length;n++){const s=e[n];if(!(s===" "||s==="	"||s===`
`||s==="\r")){if(s==="-"){t="hyphen";continue}return"punct"}}return t}function tk(e){const t=[];let n=0,s="";for(;n<e.length;){if(!la(e[n])){s+=e[n],n++;continue}let o=n+1;for(;o<e.length&&la(e[o]);)o++;t.push({text:e.slice(n,o),gap:t.length===0?"start":ek(s)}),s="",n=o}return t}function nk(e){const t=[Hr(e)];if(e.charAt(0)==="!"||e.charAt(e.length-1)==="!"){const n=e.replace(/^!+/,"").replace(/!+$/,"");n&&n!==e&&t.push(Hr(n))}return t}function sk(e){for(let t=0;t<e.length;t++){if(!/^k+i+l+$/.test(e[t]))continue;const n=e[t+1]||"",s=e[t+2]||"";if(/^y+o+u+r+s+e+l+f+$/.test(n)||/^u+r+s+e+l+f+$/.test(n)||/^u+r+$/.test(n)&&/^s+e+l+f+$/.test(s))return!0}return!1}function ok(e,t,n){if(po(e[n].text)!=="coon")return!1;const s=n>0?t[n-1]:"",o=t[n+1]||"";return s==="maine"||o==="cat"}function ik(e,t,n){return n===t+1&&e[n].gap==="space"&&/^a+$/.test(Wr(e[t].text))&&/^h+o+l+e+$/.test(Wr(e[n].text))}function ak(e,t,n){return po(e[n].text)!=="dyke"?!1:n>0&&po(e[n-1].text)==="van"}function rk(e){for(let t=0;t<e.length-1;t++)if(/^h+e+i+l+$/.test(e[t])&&/^h+i+t+l+e+r+$/.test(e[t+1]))return!0;return!1}function lk(e,t=!0){const n=Gw(e);if(Kw(n,t))return!0;const s=tk(n),o=s.map(a=>nk(a.text)),i=s.map(a=>Wr(a.text));if(sk(i)||t&&rk(i))return!0;for(let a=0;a<o.length;a++)if(!(t&&(ok(s,i,a)||ak(s,i,a))))for(let r=0;r<o[a].length;r++){const l=jw(o[a][r]);for(let c=0;c<l.length;c++)if(Qo(l[c].replace(/\*/g,""),t))return!0}for(let a=0;a<s.length;a++){let r="",l=0,c=!1,d=!1;for(let f=a;f<s.length&&f<a+8;f++){if(f>a){const u=s[f].gap,p=s[f-1].text;if(u==="punct"||u==="start"||p.endsWith("!")||s[f].text.startsWith("!")||u!=="space"&&u!=="hyphen")break}if(r+=Wr(s[f].text),Xw(s[f].text)&&l++,Jw(s[f].text)&&(c=!0),I0(s[f].text)&&(d=!0),f!==a&&!(c&&l<2&&!d)&&Qo(r,t)){if(t&&ik(s,a,f))break;return!0}}}return!1}function O0(e,t,n,s=!1){if(typeof e!="string")return{ok:!1,reason:"empty"};const o=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return o?o.length>t?{ok:!1,reason:"long"}:lk(o,!s)?{ok:!1,reason:n}:{ok:!0,text:o}:{ok:!1,reason:"empty"}}function ck(e,t=$f){return O0(e,t,"words")}const Tl={long:"That is a bit long!",link:"No links, please!",contact:"Keep numbers and contact info secret!",personal:"Keep personal info secret!",words:"Let's use kind words!",mail:"Oops, try different words!",empty:""},B0={};for(const e of["АA","аa","ВB","вb","ЕE","еe","КK","кk","МM","мm","НH","нh","ОO","оo","РP","рp","СC","сc","ТT","тt","УY","уy","ХX","хx","ІI","іi","ЈJ","јj","ЅS","ѕs","ЁE","ёe","ЇI","їi","ΑA","ΕE","ΖZ","ΗH","ΙI","ΚK","ΜM","ΝN","ΟO","ΡP","ΤT","ΥY","ΧX","αa","εe","ζz","ιi","κk","νv","οo","ρp","τt","υu","χx"])B0[e[0]]=e[1];function dk(e){let t="";for(const n of e)t+=B0[n]??n;return t}function fk(e){return dk(String(e).normalize("NFKC")).replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\p{M}]/gu,"").replace(/[\p{Extended_Pictographic}\p{S}\p{P}]+/gu,"").replace(/\s+/g," ").trim()}function hk(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(()=>{const e=[...new Set(Lw.map(t=>fk(t)).filter(t=>t.length>=2))].sort((t,n)=>n.length-t.length);return new RegExp(`(^|[^A-Za-z])(?:${e.map(hk).join("|")})(?![A-Za-z])`,"gi")})();const iu=(e,t,n)=>typeof e=="number"&&Number.isFinite(e)?Math.max(t,Math.min(n,e)):null,uk=(e,t,n=80)=>typeof e=="string"&&e.length<=n&&t.test(e)?e:null,pk=/^#[0-9a-fA-F]{3,8}$/,gk=["little","kid","adult"];function mk(e){if(!e||typeof e!="object")return null;const t={};for(const n of["skin","hair","shirt","pants"])if(n in e){const s=uk(e[n],pk,9);if(!s)return null;t[n]=s}if("hairStyle"in e){const n=iu(e.hairStyle,0,3);if(n===null)return null;t.hairStyle=Math.round(n)}if("acc"in e){const n=iu(e.acc,0,3);if(n===null)return null;t.acc=Math.round(n)}if("size"in e){if(!gk.includes(e.size))return null;t.size=e.size}if("flip"in e){if(typeof e.flip!="boolean")return null;t.flip=e.flip}return"look2"in e&&(t.look2=$a(e.look2)??null),"costume"in e&&(t.costume=Mo(e.costume)),Object.keys(t).length?t:null}function La(e){const t=Ms({id:"x"}),n=mk({skin:e?.skin,hair:e?.hair,hairStyle:e?.hairStyle,shirt:e?.shirt,pants:e?.pants,size:e?.size,acc:e?.acc})??{},s=i=>n[i]??t[i],o={skin:s("skin"),hair:s("hair"),hairStyle:s("hairStyle"),shirt:s("shirt"),pants:s("pants"),size:s("size"),acc:s("acc")};if(e&&typeof e=="object"&&"look2"in e){const i=$a(e.look2);i&&(o.look2=i)}if(e&&typeof e=="object"&&"costume"in e){const i=Mo(e.costume);o.costume=i??""}return o}const au=4,yk=["Mittens","Luna","Biscuit","Pumpkin","Whiskers","Mochi","Pepper","Noodle","Ginger","Socks"],bk=["Buddy","Coco","Max","Daisy","Peanut","Rocket","Bella","Waffles","Scout","Honey"];function D0(e){const t=String(e??"").normalize("NFC").replace(/\s+/g," ").trim();return!/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u.test(t)||(t.match(/\d/g)??[]).length>2?null:Vw(t).ok?t:null}function wk(e,t=[]){return O0(e,ls,"mail")}function H0(e){return typeof e.freeMail=="boolean"?e.freeMail:e.freeChat}const xf=2900,dd=[{kind:"swing",x:430,y:500},{kind:"swing",x:570,y:500},{kind:"blanket",x:1730,y:548},{kind:"blanket",x:1850,y:548},{kind:"bench",x:2025,y:512},{kind:"bench",x:2105,y:512},{kind:"bench",x:2225,y:512},{kind:"bench",x:2305,y:512}],we={top:{x:905,y:330},bottom:{x:1110,y:545},ladder:850},gt={x0:2440,x1:2840,y0:470,y1:585},kk=(e,t)=>e.where===t.where&&(e.where!=="house"||e.houseId===t.houseId&&e.room===t.room),vk=(e,t)=>kk(e,t)&&Math.abs(e.x-t.x)<=Aw&&Math.abs(e.y-t.y)<=Rw;function Za(e){try{return wf(e)}catch{return e}}const fd=wt("cozy-hood"),Go=()=>{try{return JSON.parse(localStorage.getItem(fd)??"null")}catch{return null}},Vn=e=>{try{e?localStorage.setItem(fd,JSON.stringify(e)):localStorage.removeItem(fd)}catch{}};function Pl(){const e=new URLSearchParams(location.search).get("hood");return e?e.replace(/\/$/,""):"https://cozy-hood.andrewmunruh.workers.dev".replace(/\/$/,"")}async function _k(e){const t=await fetch(e+"/api/create",{method:"POST"});if(!t.ok)throw new Error("create failed "+t.status);return t.json()}async function $k(e,t){const n=await fetch(`${e}/api/hood/${encodeURIComponent(t)}`);if(n.status===429)return{slow:!0};if(!n.ok)throw new Error("lookup failed");return n.json()}const yi=e=>e===void 0?"u":JSON.stringify(e,(t,n)=>n&&typeof n=="object"&&!Array.isArray(n)?Object.fromEntries(Object.keys(n).sort().map(s=>[s,n[s]])):n);function ru(e,t){if(t.type.startsWith("item/")&&t.type!=="item/add"&&"id"in t&&"room"in t)return yi(e.rooms[t.room]?.items.find(n=>n.id===t.id)??null);if(t.type.startsWith("room/")&&t.type!=="room/switch"&&"room"in t){const n=e.rooms[t.room];return yi(n?[n.wallpaper,n.floor,n.pattern,n.wallTile??null,n.floorTile??null]:null)}if(t.type==="cat/move"||t.type==="cat/set")return yi(e.cat??null);if(t.type==="dog/set")return yi(e.dog??null);if((t.type==="char/update"||t.type==="char/move"||t.type==="char/delete"||t.type==="char/hold"||t.type==="char/release")&&"id"in t)return yi(e.characters.find(n=>n.id===t.id)??null)}const xk=new Set(["dog/kennel","baby/meet","baby/name"]),Mk=1e4,Lk=1e4,Ek=5e3,Sk=3e3,lu=e=>e.type==="item/move"?"im:"+e.id:e.type==="char/move"?"cm:"+e.id:e.type==="item/size"?"is:"+("id"in e?e.id:""):null;class Al{constructor(t){this.cfg=t,this.ws=null,this.pid="",this.settings={freeChat:!0},this.players=new Map,this.houses=new Map,this.presence=new Map,this.status="offline",this.speaksSit=!1,this.speaksBaby=!1,this.speaksAmb=!1,this.speaksArt=!1,this.speaksNeeds=!1,this.replaced=!1,this.ranch={plots:[],skew:0},this.tables=new Map,this.handlers=new Map,this.cid=1,this.flushT=0,this.presT=0,this.lastPres=null,this.presDirty=!1,this.closedByUs=!1,this.retry=0,this.retryT=0,this.epoch=0,this.stableT=0,this.outbox=[],this.saidAt=new WeakMap,this.speaksHb=!1,this.lastRx=0,this.hbT=0,this.hbWaitT=0,this.hbMissed=0,this.hiddenAt=0,this.wakeOn=!1,this.resent={again:0,dropped:0},this.wake=n=>{if(n.type==="visibilitychange"&&document.visibilityState==="hidden"){this.hiddenAt=Date.now();return}if(this.closedByUs||this.replaced||!this.cfg.token)return;const s=this.hiddenAt?Date.now()-this.hiddenAt:0;if(this.hiddenAt=0,this.status==="offline"){this.retry=0,this.connect();return}if(this.status==="online"){if(this.speaksHb){this.hbWaitT&&(clearTimeout(this.hbWaitT),this.hbWaitT=0),this.probe(Sk);return}(n.type==="online"||n.type==="pageshow"&&n.persisted||s>3e3)&&this.dropDead()}}}on(t,n){(this.handlers.get(t)??this.handlers.set(t,[]).get(t)).push(n)}emit(t,...n){this.handlers.get(t)?.forEach(s=>s(...n))}send(t){return this.ws?.readyState!==WebSocket.OPEN?!1:(this.ws.send(JSON.stringify(t)),!0)}reliable(t){this.send(t)||(t.t==="lock"?this.outbox=this.outbox.filter(n=>!(n.t==="lock"&&n.houseId===t.houseId)):(t.t==="look"||t.t==="dog")&&(this.outbox=this.outbox.filter(n=>n.t!==t.t)),(t.t==="say"||t.t==="fx")&&this.saidAt.set(t,Date.now()),this.outbox.push(t),this.outbox.length>8&&this.outbox.splice(0,this.outbox.length-8))}flushOutbox(){if(this.ws?.readyState!==WebSocket.OPEN||!this.outbox.length)return;const t=this.outbox;this.outbox=[];const n=Date.now();for(const s of t){const o=this.saidAt.get(s);o!==void 0&&n-o>Mk||this.send(s)||this.outbox.push(s)}}scheduleRetry(){if(this.closedByUs||this.replaced||!this.cfg.token||this.retryT)return;const t=this.epoch,n=Math.min(15e3,400*2**Math.min(this.retry,6));this.retry++,this.retryT=window.setTimeout(()=>{this.retryT=0,!(t!==this.epoch||this.closedByUs||this.replaced||!this.cfg.token)&&this.connect()},n)}armStable(){this.stableT&&clearTimeout(this.stableT),this.stableT=window.setTimeout(()=>{this.stableT=0,this.retry=0},1e4)}clearStable(){this.stableT&&(clearTimeout(this.stableT),this.stableT=0)}stopHb(){clearInterval(this.hbT),this.hbT=0,this.hbMissed=0,this.hbWaitT&&(clearTimeout(this.hbWaitT),this.hbWaitT=0)}startHb(){this.stopHb(),this.speaksHb&&(this.hbT=window.setInterval(()=>this.probe(Ek),Lk))}probe(t){if(!this.speaksHb||this.status!=="online"||this.hbWaitT)return;const n=Date.now();this.send({t:"ping"})&&(this.hbWaitT=window.setTimeout(()=>{if(this.hbWaitT=0,this.status==="online"){if(this.lastRx>=n){this.hbMissed=0;return}++this.hbMissed>=2?(this.hbMissed=0,this.dropDead()):this.probe(t)}},t))}dropDead(){const t=this.ws;if(t){t.onclose=null,t.onmessage=null,t.onopen=null;try{t.close()}catch{}this.ws=null,this.clearStable(),this.stopHb(),this.status="offline",this.emit("status",this.status),this.retry=0,this.scheduleRetry()}}listenWake(t){if(t===this.wakeOn||typeof document>"u")return;this.wakeOn=t;const n=t?"addEventListener":"removeEventListener";document[n]("visibilitychange",this.wake),window[n]("pageshow",this.wake),window[n]("online",this.wake)}connect(t){this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.closedByUs=!1,this.replaced=!1,this.status="connecting",this.emit("status",this.status),this.stopHb(),this.listenWake(!0);const n=this.ws;return new Promise(s=>{let o=!1;const i=r=>{o||(o=!0,s(r))},a=new WebSocket(this.cfg.url.replace(/^http/,"ws")+"/ws/"+encodeURIComponent(this.cfg.id??this.cfg.code));if(this.ws=a,n&&n!==a)try{n.close()}catch{}a.onopen=()=>{t&&!this.cfg.token?this.send({t:"join",...t,v:au,pet:1,mail:1,sit:1,fit:1,baby:1,amb:1,halloween:1,cos:1,needs:1,art:1,hb:1}):this.cfg.token?this.send({t:"hello",token:this.cfg.token,v:au,pet:1,mail:1,sit:1,fit:1,baby:1,amb:1,halloween:1,cos:1,needs:1,art:1,hb:1}):i("notoken")},a.onmessage=r=>{this.lastRx=Date.now(),this.hbMissed=0;const l=JSON.parse(r.data);this.handle(l),l.t==="welcome"&&(this.armStable(),i("ok")),l.t==="error"&&i(l.code+(l.msg?":"+l.msg:"")),l.t==="removed"&&i("removed")},a.onclose=r=>{if(this.ws===a){if(this.clearStable(),this.ws=null,this.status="offline",this.stopHb(),i("closed"),r.code===4e3){this.replaced=!0,this.emit("status",this.status),this.emit("replaced");return}this.emit("status",this.status),this.scheduleRetry()}},a.onerror=()=>{}})}close(){this.closedByUs=!0,this.replaced=!1,this.epoch++,this.outbox=[],this.clearStable(),this.stopHb(),this.listenWake(!1),this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.presT&&(clearTimeout(this.presT),this.presT=0);try{this.ws?.close()}catch{}this.ws=null,this.status="offline",clearInterval(this.flushT)}handle(t){switch(t.t){case"joined":this.cfg.token=t.token,this.cfg.pid=t.pid,Vn(this.cfg);break;case"welcome":this.pid=t.pid,this.settings=t.settings,this.status="online",this.speaksSit=t.sit===1,this.speaksBaby=t.baby===1,this.speaksAmb=t.amb===1,this.speaksArt=t.art===1,this.speaksNeeds=t.needs===1,this.speaksHb=t.hb===1,this.players=new Map(t.players.map(n=>[n.pid,n]));{const n=this.houses;this.houses=new Map;for(const s of t.houses){const{state:o,...i}=s,a=n.get(s.id),r=Za(o);this.houses.set(s.id,{meta:i,confirmed:r,pending:a?this.carry(r,a.pending):[],view:null})}}this.presence=new Map(Object.entries(t.presence)),this.presence.delete(this.pid),t.ranch&&(this.ranch={plots:t.ranch.plots,skew:t.ranch.now-Date.now()});{const n=new Map;for(const s of t.tables??[])n.set(s.tb,this.stampTable(s));this.tables=n}clearInterval(this.flushT),this.flushT=window.setInterval(()=>this.flush(),60),this.lastPres&&(this.presDirty=!0),this.flushPres(),this.flushOutbox(),this.startHb(),this.emit("welcome"),this.emit("status",this.status);break;case"act":{const n=this.houses.get(t.houseId);if(!n)return;const s=t.action,o=s.id&&s.room?n.confirmed.rooms[s.room]?.items.find(a=>a.id===s.id):void 0;n.confirmed=Vi(Za(n.confirmed),t.action);const i=t.by===this.pid&&n.pending[0]?.cid===t.cid;i&&n.pending.shift(),n.view=null,i||this.emit("act",t.houseId,t.action,t.by,o?.kind??"");break}case"nack":{const n=this.houses.get(t.houseId);if(!n)return;const s=n.pending.find(o=>o.cid===t.cid)?.action??null;n.pending=n.pending.filter(o=>o.cid!==t.cid),t.state&&(n.confirmed=Za(t.state)),n.view=null,this.emit("reset",t.houseId,t.reason,s);break}case"pres":t.pid!==this.pid&&(t.p?this.presence.set(t.pid,t.p):this.presence.delete(t.pid),this.emit("pres",t.pid));break;case"players":this.players=new Map(t.players.map(n=>[n.pid,n])),this.emit("players");break;case"house":{const{state:n,...s}=t.house;this.houses.set(s.id,{meta:s,confirmed:Za(n),pending:[],view:null}),this.emit("houses");break}case"houseMeta":{const n=this.houses.get(t.meta.id);n&&(n.meta=t.meta,this.emit("houses"),this.emit("houseMeta",t.meta.id));break}case"houseGone":this.houses.delete(t.houseId),this.emit("houses"),this.emit("houseGone",t.houseId);break;case"settings":this.settings=t.settings,this.emit("settings");break;case"bubble":this.emit("bubble",t.pid,t.b);break;case"fx":this.emit("fx",t.pid,t.fx);break;case"knocked":this.emit("knocked",t.houseId,t.name);break;case"ranch":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch");break;case"ranchFail":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch"),this.emit("ranchFail",t.reason);break;case"noride":this.emit("noride",t.ride);break;case"table":{const n=this.stampTable(t.table);this.tables.set(n.tb,n),this.emit("table",n);break}case"tblFail":this.emit("tblFail",t.tb,t.reason);break;case"sayFail":this.emit("sayFail",t.reason);break;case"mailbox":{const n=this.houses.get(t.houseId);if(!n)return;if(t.mailbox?.letters?.length)n.confirmed={...n.confirmed,mailbox:t.mailbox};else{const{mailbox:s,...o}=n.confirmed;n.confirmed=o}n.view=null,this.emit("mailbox",t.houseId);break}case"mailFail":this.emit("mailFail",t.reason);break;case"art":this.emit("art",t.houseId,t.arts);break;case"artFail":this.emit("artFail",t.houseId,t.id,t.reason);break;case"parentInfo":this.emit("parentInfo",t);break;case"error":this.emit("error",t.code),t.code==="badtoken"&&(this.cfg.token=void 0,this.cfg.pid=void 0,Vn(this.cfg));break;case"pong":break;case"removed":this.closedByUs=!0,this.emit("removed");break}}stampTable(t){const n=this.tables.get(t.tb),s=n&&n.away===t.away&&n.receivedAt?n.receivedAt:Date.now();return{...t,receivedAt:s}}carry(t,n){const s=[];let o=t;for(const i of n){const a=ru(o,i.action);let r;if(a!==void 0&&i.base!==void 0&&i.base!==null?r=a===i.base:r=!i.sent||xk.has(i.action.type),i.sent&&(r?this.resent.again++:this.resent.dropped++),!!r){s.push({cid:this.cid++,action:i.action,sent:!1,base:i.base});try{o=Vi(o,i.action)}catch{}}}return s}view(t){const n=this.houses.get(t);return n?n.view??=n.pending.reduce((s,o)=>Vi(s,o.action),n.confirmed):null}myHouseId(){return this.players.get(this.pid)?.houseId??""}canEdit(t){const n=this.houses.get(t);return!!n&&(!n.meta.locked||n.meta.ownerId===this.pid)}dispatch(t,n){const s=this.houses.get(t);if(!s)return;const o=lu(n),i=s.pending[s.pending.length-1];if(o&&i&&!i.sent&&lu(i.action)===o)i.action=n;else{const a=this.view(t);s.pending.push({cid:this.cid++,action:n,sent:!1,base:a?ru(a,n)??null:null})}s.view=null}flush(){for(const[t,n]of this.houses)for(const s of n.pending)!s.sent&&this.send({t:"act",houseId:t,cid:s.cid,action:s.action})&&(s.sent=!0);this.flushPres()}setPresence(t){this.lastPres=t,this.presDirty=!0,this.presT||this.flushPres()}flushPres(){if(!(!this.presDirty||!this.lastPres)){if(!this.send({t:"pres",p:this.lastPres})){!this.closedByUs&&!this.presT&&(this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90));return}this.presDirty=!1,this.presT&&clearTimeout(this.presT),this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90)}}myPresence(){return this.lastPres}say(t){this.reliable({t:"say",b:t})}lock(t,n){this.reliable({t:"lock",houseId:t,locked:n})}setLook(t){this.reliable({t:"look",look:t});const n=this.players.get(this.pid);n&&(n.look=t)}setDog(t){this.reliable({t:"dog",dog:t});const n=this.players.get(this.pid);n&&(n.dog=t)}fx(t){this.reliable({t:"fx",fx:t})}knock(t){this.send({t:"knock",houseId:t})}ranchOp(t){this.reliable({t:"ranch",o:t})}tbl(t){this.reliable({t:"tbl",...t})}saveArt(t,n,s){return this.send({t:"art",op:"save",houseId:t,id:n,data:s})}getArt(t,n){return this.send({t:"art",op:"get",houseId:t,ids:n})}sendMail(t,n,s,o){this.reliable({t:"mail",op:"send",houseId:t,text:n,color:s,sticker:o})}readMail(t,n){this.reliable({t:"mail",op:"read",houseId:t,id:n})}dropMail(t,n){this.reliable({t:"mail",op:"drop",houseId:t,id:n})}now(){return Date.now()+this.ranch.skew}parent(t){this.cfg.parentKey&&this.reliable({t:"parent",key:this.cfg.parentKey,...t})}}function Tk(e,t,n,s="living"){let o=s;const i=[],a=()=>({...e.view(t),currentRoom:o,soundOn:n.get()}),r=l=>{if(e.houses.has(t)){const c=a();i.forEach(d=>d(c,l))}};return e.on("act",(l,c)=>{l===t&&r(c)}),e.on("reset",l=>{l===t&&r({type:"game/reset"})}),{houseId:t,get:a,subscribe(l){i.push(l)},dispatch(l){if(l.type==="room/switch")o=l.room;else if(l.type==="settings/sound")n.set(l.on);else{if(l.type==="game/reset")return;if(!e.canEdit(t)||l.type.startsWith("baby/")&&!e.speaksBaby||l.type==="item/power"&&!e.speaksAmb||l.type.startsWith("need/")&&!e.speaksNeeds)return;e.dispatch(t,l)}r(l)}}}const rt="#5a3d5c",he=`stroke="${rt}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,hd=[{name:"Tabby",body:"#ffb26b",stripe:"#e8893a",belly:"#ffe3c4"},{name:"Smokey",body:"#b9b6c9",stripe:"#8f8ba3",belly:"#ecebf3"},{name:"Tuxedo",body:"#4f4660",stripe:"",belly:"#ffffff"},{name:"Calico",body:"#fff6ec",stripe:"",belly:"#fff6ec"}],ud=[{name:"Pup",body:"#f2d0a4",ear:"#b07d54",snout:"#fbe7cc"},{name:"Poodle",body:"#fff0f6",ear:"#ffc8dd",snout:"#fff7fb"},{name:"Dachshund",body:"#c07a45",ear:"#7d4a26",snout:"#d99a68"},{name:"Golden",body:"#f4b860",ear:"#e09a3e",snout:"#fbd9a0"},{name:"Spotty",body:"#ffffff",ear:"#4a3f52",snout:"#ffffff"}],Pk=(e,t,n,s=!1)=>s?`<path d="M${e-3} ${n} q3 3 6 0 M${t-3} ${n} q3 3 6 0" fill="none" ${he} stroke-width="2.5"/>`:`<circle cx="${e}" cy="${n}" r="2.8" fill="${rt}"/><circle cx="${t}" cy="${n}" r="2.8" fill="${rt}"/><circle cx="${e+.9}" cy="${n-.9}" r=".9" fill="#fff"/><circle cx="${t+.9}" cy="${n-.9}" r=".9" fill="#fff"/>`,pd=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>`;function Yo(e,t="stand"){const n=hd[e]??hd[0],s="#ffb3c6",o=(i,a,r,l)=>`
    <path d="M${i-13} ${a-8} L${i-10} ${a-25} L${i-1} ${a-13} Z" fill="${n.body}" ${he}/><path d="M${i-10.5} ${a-11} L${i-9.5} ${a-20} L${i-4} ${a-13} Z" fill="${s}"/>
    <path d="M${i+1} ${a-13} L${i+11} ${a-26} L${i+13} ${a-7} Z" fill="${e===3?"#f4a259":n.body}" ${he}/><path d="M${i+4} ${a-13} L${i+10} ${a-21} L${i+11} ${a-11} Z" fill="${s}"/>
    <circle cx="${i}" cy="${a}" r="${r}" fill="${n.body}" ${he}/>
    ${e===3?`<path d="M${i+2} ${a-r+1} a${r} ${r} 0 0 1 ${r-3} ${r-2} q-6 2 -${r-3} -${r-3}z" fill="#f4a259"/>`:""}
    ${e===2?`<ellipse cx="${i+2}" cy="${a+7}" rx="9" ry="7" fill="#fff"/>`:""}
    ${n.stripe?`<path d="M${i-4} ${a-r+2} v5 M${i+2} ${a-r+1} v6 M${i+8} ${a-r+3} v4" ${he} stroke="${n.stripe}" stroke-width="2.5"/>`:""}
    ${Pk(i-4,i+7,a,l)}
    <path d="M${i+3} ${a+4} l-2.5 -2 h5 z" fill="#ff8fab"/><path d="M${i+.5} ${a+6} q2.5 2.5 5 0" fill="none" ${he} stroke-width="2"/>
    ${pd(i-8,a+5)}${pd(i+12,a+5)}
    <path d="M${i+r-2} ${a+3} l9 -2 M${i+r-2} ${a+6} l9 2" ${he} stroke-width="1.6"/>`;return t==="nap"?`<svg viewBox="0 0 120 100" class="catsvg nap">
    <g class="breathe"><path class="tail" d="M28 84 Q22 96 64 94" fill="none" stroke="${rt}" stroke-width="11" stroke-linecap="round"/><path d="M28 84 Q22 96 64 94" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="76" rx="36" ry="18" fill="${n.body}" ${he}/>
    ${e===3?'<ellipse cx="44" cy="72" rx="12" ry="8" fill="#f4a259"/><ellipse cx="66" cy="70" rx="9" ry="6" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 62 q3 6 0 12 M56 61 q3 6 0 12 M68 62 q3 6 0 11" fill="none" ${he} stroke="${n.stripe}" stroke-width="3"/>`:""}
    ${o(90,76,15,!0)}</g></svg>`:t==="sit"?`<svg viewBox="0 0 120 100" class="catsvg sit">
    <path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${rt}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="70" rx="20" ry="25" fill="${n.body}" ${he}/>
    <ellipse cx="70" cy="74" rx="10" ry="15" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="54" cy="66" rx="9" ry="12" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M50 60 q5 2 4 8 M49 72 q5 2 4 8" fill="none" ${he} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect x="62" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${he}/><rect x="74" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${he}/>
    ${e===2?'<ellipse cx="66.5" cy="93" rx="4" ry="2.5" fill="#fff"/><ellipse cx="78.5" cy="93" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(72,36,17,!1)}</svg>`:`<svg viewBox="0 0 120 100" class="catsvg stand">
    <path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${rt}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <rect class="leg b" x="34" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${he}/><rect class="leg a" x="74" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${he}/>
    <ellipse cx="58" cy="58" rx="32" ry="17" fill="${n.body}" ${he}/>
    <ellipse cx="64" cy="66" rx="20" ry="7" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="46" cy="52" rx="12" ry="9" fill="#f4a259"/><ellipse cx="68" cy="50" rx="9" ry="7" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 43 q3 6 0 12 M56 42 q3 6 0 12 M68 43 q3 6 0 11" fill="none" ${he} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect class="leg a" x="44" y="64" width="9" height="30" rx="4.5" fill="${n.body}" ${he}/><rect class="leg b" x="84" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${he}/>
    ${e===2?'<ellipse cx="48.5" cy="92" rx="4" ry="2.5" fill="#fff"/><ellipse cx="88.5" cy="92" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(90,40,17,!1)}</svg>`}function ca(e,t="stand"){const n=ud[e]??ud[0],s=t==="sleep",o=e===2,i=e===1,a=e===3,r=e===4,l=o?66:58,c=o?70:62,d=94-c,f=o?102:92,u=o?50:40,p=(_,P)=>i?`<rect class="leg ${P}" x="${_+2}" y="${c}" width="6" height="${d}" rx="3" fill="${n.body}" ${he}/><circle class="leg ${P}" cx="${_+5}" cy="91" r="6" fill="${n.body}" ${he}/>`:`<rect class="leg ${P}" x="${_}" y="${c}" width="10" height="${d}" rx="5" fill="${n.body}" ${he}/>`,y=i?`<circle cx="44" cy="58" r="15" fill="${n.body}" ${he}/><circle cx="70" cy="56" r="17" fill="${n.body}" ${he}/><ellipse cx="57" cy="58" rx="22" ry="12" fill="${n.body}"/>`:`<ellipse cx="${o?62:58}" cy="${l}" rx="${o?42:32}" ry="${o?13:17}" fill="${n.body}" ${he}/>`,m=r?`<circle cx="46" cy="54" r="5" fill="${rt}"/><circle cx="64" cy="62" r="4" fill="${rt}"/><circle cx="72" cy="50" r="3.5" fill="${rt}"/><circle cx="38" cy="64" r="3" fill="${rt}"/>`:"",k=i?`<g class="tail"><path d="M30 52 L22 38" ${he}/><circle cx="21" cy="34" r="7" fill="${n.body}" ${he}/></g>`:a?`<path class="tail" d="M30 52 Q10 50 14 30 Q20 40 30 46" fill="${n.body}" ${he}/>`:`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${rt}" stroke-width="9" stroke-linecap="round"/>`,b=!i&&!a?`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`:"",g=`
    ${i?`<circle cx="${f-2}" cy="${u-16}" r="10" fill="${n.body}" ${he}/>`:""}
    <circle cx="${f}" cy="${u}" r="17" fill="${n.body}" ${he}/>
    ${r?`<circle cx="${f-6}" cy="${u-8}" r="4" fill="${rt}"/>`:""}
    <ellipse cx="${f+13}" cy="${u+7}" rx="11" ry="8" fill="${n.snout}" ${he}/>
    <circle cx="${f+22}" cy="${u+4}" r="4" fill="${rt}"/>
    <path d="M${f+14} ${u+12} q4 3 8 0" fill="none" ${he} stroke-width="2"/>
    ${s?"":`<path class="tongue" d="M${f+16} ${u+13} q2 7 6 0" fill="#ff8fab" ${he} stroke-width="2"/>`}
    ${s?`<path d="M${f+2} ${u-4} q3 3 6 0" fill="none" ${he} stroke-width="2.4"/>`:`<circle cx="${f+5}" cy="${u-3}" r="3" fill="${rt}"/><circle cx="${f+6}" cy="${u-4}" r="1" fill="#fff"/>`}
    ${pd(f+2,u+8)}
    ${i?`<circle cx="${f-9}" cy="${u+8}" r="9" fill="${n.ear}" ${he}/>`:`<ellipse class="ear" cx="${f-9}" cy="${u+4}" rx="7" ry="${a||o?14:12}" fill="${n.ear}" ${he} transform="rotate(12 ${f-9} ${u+4})"/>`}
    <path d="M${f-12} ${u+14} q10 6 20 2" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/><circle cx="${f-1}" cy="${u+19}" r="3" fill="#ffd166" ${he} stroke-width="1.5"/>`,w=i?`<g class="tail"><path d="M42 86 L28 80" ${he}/><circle cx="25" cy="78" r="7" fill="${n.body}" ${he}/></g>`:`<path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${rt}" stroke-width="9" stroke-linecap="round"/><path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`;return t==="sit"||t==="sleep"?`<svg viewBox="0 0 130 100" class="dogsvg ${s?"sleep":"sit"}">${w}
    <ellipse cx="60" cy="70" rx="22" ry="24" fill="${n.body}" ${he}/>${r?`<circle cx="54" cy="66" r="5" fill="${rt}"/><circle cx="64" cy="80" r="4" fill="${rt}"/>`:""}
    ${p(62,"a")}${p(74,"b")}<g transform="translate(-22 -2)">${g}</g></svg>`:`<svg viewBox="0 0 130 100" class="dogsvg stand">${k}${b}
    ${p(o?30:34,"b")}${p(o?82:72,"a")}
    ${y}${m}
    ${p(o?42:46,"a")}${p(o?94:84,"b")}
    ${g}</svg>`}const W0=e=>{let t=2166136261;for(const n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0},Gs=(e,t)=>{let n=(e^Math.imul(t,2654435761))>>>0;return n^=n>>>15,n=Math.imul(n,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296},cu=18,Ak={1:.35,2:.6};function Rk(e,t,n){return e-t*Ak[n]}function Ck(e,t){const s=Math.floor(t/1e3/2.8);return Gs(W0(e||"pup"),s)<.62?"rest":"peek"}function Ik(e,t,n,s,o=!1){const i=W0(e.name+":"+e.coat+":"+e.room+":"+Math.round(e.x)+(n?":t"+Math.round(n.x):"")),a=t/1e3,r=Math.floor(a/cu),l=a-r*cu;if(!n){const b=V=>Math.max(160,Math.min(2240,e.x+(Gs(i,V)-.5)*760)),g=b(r-1);let w=b(r);const _=Gs(i+7,r),P=_<.45?"nap":_<.75?"sit":"groom",$=!!(s&&P==="nap"&&Gs(i+13,r)<.72);$&&s&&(w=Math.max(160,Math.min(2240,s.x)));const x=Math.abs(w-g),H=Math.min(5,x/110);return l<H&&!o?{x:g+(w-g)*(l/H),mood:"walk",flip:w<g,perch:0,curl:0}:{x:w,mood:P,flip:w<g,perch:0,curl:$?1:0}}const c=Math.max(160,Math.min(2240,n.x)),d=Gs(i+5,r)<.45?2:1,f=Math.max(160,Math.min(2240,c+(Gs(i,r)-.5)*420)),u=Math.abs(c-f),p=Math.min(4.2,Math.max(.6,u/160)),y=c<f;if(l<p&&!o)return{x:f+(c-f)*(l/p),mood:"walk",flip:y,perch:0,curl:0};const m=Gs(i+11,r),k=m<.34?"nap":m<.67?"sit":"play";return{x:c,mood:k,flip:y,perch:d,curl:0}}const Vr="#5a3d5c",We=`stroke="${Vr}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,Bo=[`<svg viewBox="0 0 48 48"><path d="M24 40 C16 32 6 26 10 16 C14 8 24 12 24 20 C24 12 34 8 38 16 C42 26 32 32 24 40 Z" fill="#ff6b9a" ${We}/></svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd166" ${We}/></svg>`,`<svg viewBox="0 0 48 48"><circle cx="24" cy="22" r="6" fill="#ff8fab" ${We}/>${[0,60,120,180,240,300].map(e=>`<circle cx="${24+Math.cos(e*Math.PI/180)*12}" cy="${22+Math.sin(e*Math.PI/180)*12}" r="5" fill="#ffd166" ${We}/>`).join("")}<path d="M24 34 V44" ${We}/></svg>`,`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="10" fill="#ffb26b" ${We}/><circle cx="34" cy="20" r="8" fill="#ffc46b" ${We}/><path d="M28 14 L30 6 L36 14" fill="#ffb26b" ${We}/><circle cx="32" cy="19" r="1.4" fill="${Vr}"/><circle cx="37" cy="19" r="1.4" fill="${Vr}"/></svg>`,`<svg viewBox="0 0 48 48">${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M8 ${30-t*4} Q24 ${10-t*3} 40 ${30-t*4}" fill="none" stroke="${e}" stroke-width="4"/>`).join("")}</svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l3 10 10 1 -8 6 3 10 -8 -5 -8 5 3 -10 -8 -6 10 -1z" fill="#fff3b0" ${We}/><circle cx="12" cy="34" r="3" fill="#ff8fab" ${We}/><circle cx="36" cy="36" r="2.4" fill="#bde0fe" ${We}/></svg>`];function du(e){const t=e?`<g class="flag"><path d="M30 16 V6" ${We}/><path d="M30 6 H42 L38 11 L42 16 H30 Z" fill="#ff6b6b" ${We}/></g>`:`<g class="flag"><path d="M18 28 H28" ${We}/><path d="M18 22 H28 L25 25 L28 28 H18 Z" fill="#ffd166" ${We}/></g>`;return`<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="68" rx="18" ry="3" fill="#000" opacity=".12"/>
    <rect x="30" y="40" width="5" height="26" rx="2" fill="#c99366" ${We}/>
    <path d="M8 40 V22 Q8 8 32 8 Q56 8 56 22 V40 Z" fill="#8ecae6" ${We}/>
    <path d="M8 28 H56" ${We}/>
    <rect x="14" y="32" width="36" height="16" rx="4" fill="#fff6e6" ${We}/>
    <circle cx="32" cy="40" r="3" fill="${Vr}"/>
    ${t}
  </svg>`}function Ok(e,t=[]){const n=wk(e,t);return n.ok?{ok:!0,text:n.text}:{ok:!1,msg:n.reason==="empty"?"Write a little note!":Tl[n.reason]||"Oops, try different words!"}}const Bk={...Tl,empty:"Write a little note!",slow:"Let's wait a moment!",full:"This mailbox is full!",notyours:"That's her mailbox. Only she can open it 💌",nohouse:"That house is not on the street.",gone:"That letter is already gone.",toobig:"The mailbox is too full!",presetsOnly:"Typing is off. Pick a phrase!",unread:"She still has your letters! Wait until she reads them."};function Dk(e){return Bk[e]||"Let's try that again!"}function Hk(e){let t="",n="",s=!1,o="",i=0,a=0,r=-1,l="",c="";const d=()=>document.getElementById("mailCue");d()?.addEventListener("click",()=>{e.openOwn()});function f(){t="",n="",document.getElementById("mailSheet")?.remove()}function u(){let b=document.getElementById("mailSheet");return b||(b=document.createElement("div"),b.id="mailSheet",b.className="sheet mailSheet",b.innerHTML='<div class="card" id="mailCard"></div>',document.body.appendChild(b),b.addEventListener("click",g=>{const w=g.target;if(w===b||w.closest('[data-m="close"]')){f();return}y(w)}),b.addEventListener("input",g=>{const w=g.target;if(w.id!=="mailText")return;const _=document.getElementById("mailCount");_&&(_.textContent=`${w.value.length}/${ls}`)})),b}function p(){if(!t)return;const b=u().querySelector("#mailText")?.value??"",g=e.mine(t),w=e.lettersOf(t),_=e.houseName(t),P=u().querySelector("#mailCard");if(n&&g&&!s){const x=w.find(H=>H.id===n);if(x&&x.text){m(x);return}n=""}if(s||!g){const x=e.freeType(),H=o?`Reply to ${e.houseName(o)||"your friend"}`:g?"Leave a letter":`Letter for ${_}`,V=x?`<textarea id="mailText" class="mailBox" maxlength="${ls}" placeholder="Hi! Come play!"></textarea>
        <div class="mailCount" id="mailCount">0/${ls}</div>`:`<h3>Phrase</h3><div class="phrases mailPhrases">${zi.map((q,se)=>`<button type="button" data-phrase="${se}" class="${se===r?"on":""}">${_t(q)}</button>`).join("")}</div>`;P.innerHTML=`<button class="close" data-m="close">✕</button><h2>${_t(H)}</h2>
        <p class="hint">${x?"A short note. Your name goes on it for you.":"Pick a phrase. Your name goes on it for you."}</p>
        ${V}
        <h3>Paper</h3><div class="mailRow">${es.map((q,se)=>`<button class="swatch ${se===i?"on":""}" data-color="${se}" style="background:${q}" aria-label="Paper ${se+1}"></button>`).join("")}</div>
        <h3>Sticker</h3><div class="mailRow">${Bo.slice(0,h0).map((q,se)=>`<button class="stick ${se===a?"on":""}" data-sticker="${se}" aria-label="Sticker ${se+1}">${q}</button>`).join("")}</div>
        ${l?`<p class="mailErr" id="mailErr">${_t(l)}</p>`:""}
        <button class="mailSend" id="mailSend" type="button">Send</button>
        ${g&&w.length?'<button class="mailRow" data-act="back" type="button" style="margin-top:8px">Back to my mail</button>':""}`;const Q=u().querySelector("#mailText");if(Q&&b){Q.value=b;const q=document.getElementById("mailCount");q&&(q.textContent=`${b.length}/${ls}`)}return}const $=w.length?w.slice().reverse().map(x=>x.text?`<button type="button" class="letter ${x.read?"":"fresh"}" data-letter="${_t(x.id)}" style="background:${es[x.color]??es[0]}">
        <span class="sticker">${Bo[x.sticker]??Bo[0]}</span>
        <span class="who">${_t(x.from)}</span><span class="when">${_t(dc(x.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${We}/><path d="M4 8 L40 24 L76 8" fill="${es[x.color]??"#fff"}" ${We}/></svg>
      </button>`:`<div class="letter" style="background:${es[x.color]??es[0]}"><span class="who">Your letter</span><span class="when">${_t(dc(x.at))}</span><span class="statusChip ${x.read?"read":""}">${x.read?"Read":"Delivered"}</span></div>`).join(""):'<p class="hint">No letters yet. Your flag pops up when one arrives!</p>';P.innerHTML=`<button class="close" data-m="close">✕</button><h2>${_t(_)} mailbox</h2>${$}
      <div class="mailRow"><button type="button" data-act="write">Write a letter</button></div>
      ${l?`<p class="mailErr">${_t(l)}</p>`:""}`}function y(b){const g=b.closest(".mailPhrases [data-phrase]");if(g){r=+g.dataset.phrase,l="",p();return}const w=b.closest("[data-color]");if(w){i=+w.dataset.color,p();return}const _=b.closest("[data-sticker]");if(_){a=+_.dataset.sticker,p();return}if(b.closest("#mailSend"))return k();const P=b.closest("[data-act]")?.dataset.act;if(P==="write"){s=!0,o="",n="",l="",p();return}if(P==="back"){s=!1,o="",n="",l="",p();return}if(P==="reply"){const Q=e.houseOf(b.closest("[data-from]")?.dataset.from??"");if(!Q){e.toast("They are not on the street anymore.");return}o=Q,s=!0,n="",l="",t=Q,p();return}if(P==="drop"){const Q=b.closest("[data-id]")?.dataset.id??"";if(c!==Q){c=Q,e.toast("Tap again to throw it away");return}c="",e.drop(t,Q);return}const $=b.closest("[data-letter]");if(!$)return;const x=$.dataset.letter,V=e.lettersOf(t).find(Q=>Q.id===x);V&&(!e.mine(t)||!V.text||(V.read||e.read(t,x),n=x,m(V)))}function m(b){const g=Wk(b.text),w=u().querySelector("#mailCard");w.innerHTML=`<button class="close" data-m="close">✕</button>
      <div class="letter open read" style="background:${es[b.color]??es[0]}" data-id="${_t(b.id)}" data-from="${_t(b.fromPid)}">
        <span class="sticker">${Bo[b.sticker]??Bo[0]}</span>
        <span class="who">${_t(b.from)}</span><span class="when">${_t(dc(b.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${We}/><path class="flap" d="M4 8 L40 24 L76 8" fill="#fff" ${We}/></svg>
        <p class="words">${_t(g??"")}</p>
        <span class="mailRow"><button type="button" data-act="reply">Reply</button><button type="button" class="throw" data-act="drop">${c===b.id?"Tap again":"Throw away"}</button></span>
      </div>
      <button type="button" data-act="back">All my mail</button>
      ${l?`<p class="mailErr">${_t(l)}</p>`:""}`}function k(){let b="";if(e.freeType()){const w=u().querySelector("#mailText")?.value??"",_=Ok(w);if(!_.ok){l=_.msg,p();const P=u().querySelector("#mailText");P&&(P.value=w);return}b=_.text}else{if(r<0||r>=zi.length){l="Pick a phrase!",p();return}b=zi[r]}const g=o||t;l="",e.send(g,b,i,a),e.toast("On its way!"),e.mine(g)?(s=!1,o="",t=g,p()):f()}return{open(b,g,w,_){t=b,n="",s=!w,o="",l="",c="",i=0,a=0,r=-1,p()},fail(b){l=Dk(b),t?p():e.toast(l)},refresh(){t&&p()},syncCue(b){d()?.classList.toggle("show",b)}}}function Wk(e){if(!e)return null;const t=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return!t||t.length>ls?null:t}function _t(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const V0=()=>wt("cozy-play");function Vk(){try{return localStorage.getItem(V0())==="play"?"play":"decorate"}catch{return"decorate"}}function Uk(e){try{localStorage.setItem(V0(),e)}catch{}}function zk(e){return e==="kennel"?"kennel":e==="cat-tower"?"tower":e==="yard-swing"?"swing":e==="lamp"||/(^|:)lamp|starlamp|light/.test(e)?"lamp":e==="fridge"||e==="stove"||e==="vanity"||e==="bookshelf"||e==="window"||e==="mirror"||e==="tv"||/fridge|stove|cabinet|drawer|vanity/.test(e)?"open":Kn(e)?"sit":"wiggle"}const Qk='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M34 8 l1.2 3 3 .4 -2.2 2 .6 3 -2.6-1.6 -2.6 1.6 .6-3 -2.2-2 3-.4z" fill="#ffd166" stroke="#5a3d5c" stroke-width="1.4"/></svg>',Nk='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 36 h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M8 14 l2 1 M40 34 l2 2 M8 40 l3 -1" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>';function qk(e,t){let n="decorate";const s=e.querySelector("#modePlay"),o=e.querySelector("#modeDecorate");s.querySelector(".modeIco").innerHTML=Qk,o.querySelector(".modeIco").innerHTML=Nk;const i=()=>{const c=n==="play";document.body.classList.toggle("mode-play",c),s.classList.toggle("on",c),o.classList.toggle("on",!c),s.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-pressed",c?"false":"true")},a=(c,d)=>{n=c,d&&Uk(c),i(),t.onChange?.()};e.addEventListener("pointerdown",c=>c.stopPropagation()),e.addEventListener("click",c=>{const d=c.target.closest("[data-mode]");if(!d)return;const f=d.dataset.mode==="play"?"play":"decorate";a(f,t.ownHouse())}),i();let r=!1;return{mode:()=>n,isPlay:()=>n==="play",sync(c){a(c?Vk():"play",!1)},hint:()=>{if(r||!document.body.classList.contains("phone"))return;const c=wt("cozy-mode-hint");try{if(localStorage.getItem(c)){r=!0;return}}catch{r=!0;return}r=!0;const d=document.createElement("p");d.className="modeHint",d.textContent="Play: tap things! Decorate: move things!",e.appendChild(d);let f=!1;const u=()=>{if(!f){f=!0,d.remove(),window.removeEventListener("pointerdown",u);try{localStorage.setItem(c,"1")}catch{}}};window.setTimeout(u,2800),d.addEventListener("click",u),window.addEventListener("pointerdown",u)}}}const U0=e=>String(e||"").replace(/^pack:/,"").toLowerCase();function da(e){return/(^|-)table$/.test(U0(e))}function fu(e){const t=Kn(e);return!t||t.pose!=="sit"?!1:/chair|stool/.test(U0(e))}const jk=320,Fk=180,gd=(e,t)=>Math.hypot(e.x-t.x,e.y-t.y);function Zk(e,t,n,s){if(s&&da(s.kind))return s;const o=e.filter(c=>da(c.kind));let i=null,a=1/0;const r=s&&ln(s.kind)?s:{x:t,y:n},l=s&&ln(s.kind)?Fk:0;for(const c of o){const d=Math.max(l,_n(c.kind)*.55+40),f=gd(r,c);f<=d&&f<a&&(i=c,a=f)}return i}function Gk(e,t,n,s){if(s&&qn(s.kind))return s;for(const o of e){if(!qn(o.kind))continue;const i=_n(o.kind);if(Math.abs(t-o.x)<=Math.max(60,i*.45)&&Math.abs(n-o.y)<=80)return o}return null}function Yk(e,t,n,s){const o=_n(e.kind),i=co(e.x,o,t,s),a=[i];if(n>1){const r=co(e.x,o,e.x+(e.x-i.x),s);a.push({x:r.x,y:r.y})}return a}function Rl(e){const t=e.roomW??2400,{releaseX:n,releaseY:s,hit:o,items:i,occupied:a,held:r,seatPiece:l}=e,c=r.filter(b=>ln(b.kind));if(o&&fu(o.kind)){const b=l(o);if(b){const g=zo({mode:"play",via:"drag",releaseX:n,releaseY:s,piece:b,occupied:a});if(g.seat)return{x:g.x,y:g.y,seat:g.seat,releases:[]}}}const d=Gk(i,n,s,o),f=Zk(i,n,s,o),u=!!(o&&Kn(o.kind)?.pose==="lie"),p=d||(u?o:null),y=[];if(p&&c.length){const b=Yk(p,n,c.length,t);for(let g=0;g<c.length;g++){const w=b[Math.min(g,b.length-1)];y.push({hand:c[g].hand,x:w.x,y:w.y||oi})}}if(d)return{x:d.x,y:d.y+8,seat:null,releases:y};if(f){let b=null,g=1/0;for(const _ of i){if(!fu(_.kind)||gd(_,f)>jk)continue;const P=l(_);if(!P)continue;const $=zo({mode:"play",via:"drag",releaseX:n,releaseY:s,piece:P,occupied:a});if(!$.seat)continue;const x=gd(_,{x:n,y:s});x<g&&(g=x,b={x:$.x,y:$.y,seat:$.seat})}if(b)return{...b,releases:y};const w=co(f.x,_n(f.kind),n,t);return{x:w.x,y:w.y,seat:null,releases:y}}const m=o?l(o):null,k=zo({mode:"play",via:"drag",releaseX:n,releaseY:s,piece:m,occupied:a});return{x:k.x,y:k.y,seat:k.seat,releases:y}}const z0=new Map;let Q0=!1;function Zn(){return Q0}function Kk(e){Q0=e}function Gn(e){return z0.get(e)}function Xk(e,t){z0.set(e,t)}const N0=!0;let Pi=null;function Mf(){return Pi??N0}function Jk(e){const t=new URLSearchParams(e.replace(/^\?/,"")).get("art");t==="v1"?Pi=!1:t==="v2"?Pi=!0:Pi=null;const n=Pi??N0;return Kk(n),n}const Ls=[600,1800,4500],e4=e=>new Promise(t=>setTimeout(t,e));async function q0(e,t=Ls){let n;for(let s=0;;s++){try{return await e()}catch(o){n=o}if(s>=t.length)break;await e4(t[s])}throw n}function t4(e,t=Ls){const n=Number(e.dataset.tries||"0");if(n>=t.length)return!1;const s=e.getAttribute("src");return s?(e.dataset.tries=String(n+1),setTimeout(()=>{!e.isConnected||e.getAttribute("src")!==s||(e.removeAttribute("src"),e.setAttribute("src",s))},t[n]),!0):!1}async function Cs(e,t=Ls){try{return await q0(e,t)}catch(n){throw s4(),n}}let hu=!1,uu=!1;function n4(){hu||typeof window>"u"||(hu=!0,window.addEventListener("vite:preloadError",e=>{}))}function s4(){if(uu||typeof document>"u"||(uu=!0,document.getElementById("artRetryNote")))return;const e=document.createElement("div");e.id="artRetryNote",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.textContent="Some pictures could not load. You can still play!";const t=document.createElement("button");t.type="button",t.className="artRetryNoteOk",t.textContent="OK",t.addEventListener("click",()=>e.remove()),e.appendChild(t);const n=()=>{(document.body||document.documentElement).appendChild(e)};document.body?n():document.addEventListener("DOMContentLoaded",n,{once:!0})}const Ur=Object.assign({"../../assets/art/any/armchair.webp":()=>h(()=>import("./armchair-BAjEKZT-.js"),[]).then(e=>e.default),"../../assets/art/any/ball.webp":()=>h(()=>import("./ball-D1B5vbct.js"),[]).then(e=>e.default),"../../assets/art/any/balloon.webp":()=>h(()=>import("./balloon-5CQ1ji1d.js"),[]).then(e=>e.default),"../../assets/art/any/bookshelf.webp":()=>h(()=>import("./bookshelf-BCCk-QJS.js"),[]).then(e=>e.default),"../../assets/art/any/chair.webp":()=>h(()=>import("./chair-BxTP5f1M.js"),[]).then(e=>e.default),"../../assets/art/any/clock.webp":()=>h(()=>import("./clock-D_q2KVbT.js"),[]).then(e=>e.default),"../../assets/art/any/lamp.webp":()=>h(()=>import("./lamp-BOWZQ_df.js"),[]).then(e=>e.default),"../../assets/art/any/picture.webp":()=>h(()=>import("./picture-DsR0Jovx.js"),[]).then(e=>e.default),"../../assets/art/any/plant.webp":()=>h(()=>import("./plant-xO8tOsUj.js"),[]).then(e=>e.default),"../../assets/art/any/rug.webp":()=>h(()=>Promise.resolve().then(()=>BE),void 0).then(e=>e.default),"../../assets/art/any/sofa.webp":()=>h(()=>import("./sofa-DqtVZLgl.js"),[]).then(e=>e.default),"../../assets/art/any/table.webp":()=>h(()=>import("./table-CaJl95Y4.js"),[]).then(e=>e.default),"../../assets/art/any/tv.webp":()=>h(()=>import("./tv-10oa_PoM.js"),[]).then(e=>e.default),"../../assets/art/any/window.webp":()=>h(()=>Promise.resolve().then(()=>j7),void 0).then(e=>e.default),"../../assets/art/backyard/beach-ball.webp":()=>h(()=>import("./beach-ball-BGSUwHpb.js"),[]).then(e=>e.default),"../../assets/art/backyard/birdbath.webp":()=>h(()=>import("./birdbath-Cxq6uhaA.js"),[]).then(e=>e.default),"../../assets/art/backyard/birdhouse.webp":()=>h(()=>import("./birdhouse-BZjankMZ.js"),[]).then(e=>e.default),"../../assets/art/backyard/butterfly-bush.webp":()=>h(()=>import("./butterfly-bush-DyFmTTis.js"),[]).then(e=>e.default),"../../assets/art/backyard/garden-gnome.webp":()=>h(()=>import("./garden-gnome-BdIogyb0.js"),[]).then(e=>e.default),"../../assets/art/backyard/hammock.webp":()=>h(()=>import("./hammock-D6n3oWJ0.js"),[]).then(e=>e.default),"../../assets/art/backyard/hedge-row.webp":()=>h(()=>import("./hedge-row-Box4JkqY.js"),[]).then(e=>e.default),"../../assets/art/backyard/lemonade-cart.webp":()=>h(()=>import("./lemonade-cart-D5_QECrJ.js"),[]).then(e=>e.default),"../../assets/art/backyard/lemonade-cup.webp":()=>h(()=>import("./lemonade-cup-Deu_4A_L.js"),[]).then(e=>e.default),"../../assets/art/backyard/lily-pond.webp":()=>h(()=>import("./lily-pond-DdWM66PF.js"),[]).then(e=>e.default),"../../assets/art/backyard/little-slide.webp":()=>h(()=>import("./little-slide-BmFzgQVg.js"),[]).then(e=>e.default),"../../assets/art/backyard/patio-lights.webp":()=>h(()=>import("./patio-lights-CG-X-NR-.js"),[]).then(e=>e.default),"../../assets/art/backyard/patio-umbrella.webp":()=>h(()=>import("./patio-umbrella-CBfWeK2o.js"),[]).then(e=>e.default),"../../assets/art/backyard/picket-gate.webp":()=>h(()=>import("./picket-gate-DdopcGK9.js"),[]).then(e=>e.default),"../../assets/art/backyard/picnic-blanket.webp":()=>h(()=>import("./picnic-blanket-DEHPBD-8.js"),[]).then(e=>e.default),"../../assets/art/backyard/picnic-table.webp":()=>h(()=>import("./picnic-table-Beke1hZj.js"),[]).then(e=>e.default),"../../assets/art/backyard/pinwheel.webp":()=>h(()=>import("./pinwheel-BYWuiGc6.js"),[]).then(e=>e.default),"../../assets/art/backyard/rain-barrel.webp":()=>h(()=>import("./rain-barrel-DuOSk5bU.js"),[]).then(e=>e.default),"../../assets/art/backyard/sandbox.webp":()=>h(()=>import("./sandbox-BNfGpBrd.js"),[]).then(e=>e.default),"../../assets/art/backyard/seesaw.webp":()=>h(()=>import("./seesaw-Bb88ZDIz.js"),[]).then(e=>e.default),"../../assets/art/backyard/splash-pool.webp":()=>h(()=>import("./splash-pool-C2vvqkle.js"),[]).then(e=>e.default),"../../assets/art/backyard/sprinkler.webp":()=>h(()=>import("./sprinkler-GPjPfQrr.js"),[]).then(e=>e.default),"../../assets/art/backyard/stepping-stones.webp":()=>h(()=>import("./stepping-stones-ByiG5frJ.js"),[]).then(e=>e.default),"../../assets/art/backyard/sun-lounger.webp":()=>h(()=>import("./sun-lounger-CJ0PUVv5.js"),[]).then(e=>e.default),"../../assets/art/backyard/toadstool-light.webp":()=>h(()=>import("./toadstool-light-CIg2fdg_.js"),[]).then(e=>e.default),"../../assets/art/backyard/tulip-bed.webp":()=>h(()=>import("./tulip-bed-VZSHoKAo.js"),[]).then(e=>e.default),"../../assets/art/backyard/veggie-patch.webp":()=>h(()=>import("./veggie-patch-DLXqFE6L.js"),[]).then(e=>e.default),"../../assets/art/backyard/wagon.webp":()=>h(()=>import("./wagon-CbnJhW-K.js"),[]).then(e=>e.default),"../../assets/art/backyard/yard-bench.webp":()=>h(()=>import("./yard-bench-Bp6oh0wx.js"),[]).then(e=>e.default),"../../assets/art/backyard/yard-swing.webp":()=>h(()=>import("./yard-swing-CpKUWWCT.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-mat.webp":()=>h(()=>import("./bath-mat-DLlrRePN.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-mirror.webp":()=>h(()=>import("./bath-mirror-4OfFj8EV.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-stool.webp":()=>h(()=>import("./bath-stool-DqJM8fLh.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-toilet.webp":()=>h(()=>import("./bath-toilet-C2nhunlA.js"),[]).then(e=>e.default),"../../assets/art/bathroom/laundry-hamper.webp":()=>h(()=>import("./laundry-hamper-0OQZcXyH.js"),[]).then(e=>e.default),"../../assets/art/bathroom/rubber-ducky.webp":()=>h(()=>import("./rubber-ducky-pwUm0Pe4.js"),[]).then(e=>e.default),"../../assets/art/bathroom/shower-curtain.webp":()=>h(()=>import("./shower-curtain-UCHNbYT7.js"),[]).then(e=>e.default),"../../assets/art/bathroom/sink-vanity.webp":()=>h(()=>import("./sink-vanity-aUbm9Mix.js"),[]).then(e=>e.default),"../../assets/art/bathroom/soaking-tub.webp":()=>h(()=>import("./soaking-tub-C07Kgt8P.js"),[]).then(e=>e.default),"../../assets/art/bathroom/soap-dish.webp":()=>h(()=>import("./soap-dish-Duoeh42V.js"),[]).then(e=>e.default),"../../assets/art/bathroom/towel-bar.webp":()=>h(()=>import("./towel-bar-fU4SDA3M.js"),[]).then(e=>e.default),"../../assets/art/bedroom/bed.webp":()=>h(()=>import("./bed-CKbzIr1E.js"),[]).then(e=>e.default),"../../assets/art/bedroom/mirror.webp":()=>h(()=>import("./mirror-D5FvkWJA.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~alarm-clock.webp":()=>h(()=>import("./pack~alarm-clock-B1MKtcYc.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bedtime-snack.webp":()=>h(()=>import("./pack~bedtime-snack-CQHBbXTE.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~big-monitor.webp":()=>h(()=>import("./pack~big-monitor-DnY9RO7w.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~big-wardrobe.webp":()=>h(()=>import("./pack~big-wardrobe-DKmYluKF.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~book-stack.webp":()=>h(()=>import("./pack~book-stack-DgPlZ9_3.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bubble-bath.webp":()=>h(()=>import("./pack~bubble-bath-CP64sVml.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bunk-bed.webp":()=>h(()=>import("./pack~bunk-bed-D-NM_ktx.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bunny-slippers.webp":()=>h(()=>import("./pack~bunny-slippers-I8r5WVZt.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~canopy-bed.webp":()=>h(()=>import("./pack~canopy-bed-BpoysMK9.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cat-bed.webp":()=>h(()=>import("./pack~cat-bed-BAS6-rN0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~caterpillar-plush.webp":()=>h(()=>import("./pack~caterpillar-plush-CEbFuatX.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-canopy-daybed.webp":()=>h(()=>import("./pack~cc-canopy-daybed-DoE44IXz.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-cloud-beanbag.webp":()=>h(()=>import("./pack~cc-cloud-beanbag-D0qNEg32.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-cloud-lamp.webp":()=>h(()=>import("./pack~cc-cloud-lamp-DIDpxlMU.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-fairy-garland.webp":()=>h(()=>import("./pack~cc-fairy-garland-CEQT4GTj.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-heart-bed.webp":()=>h(()=>import("./pack~cc-heart-bed-BupJOayJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-jewel-box.webp":()=>h(()=>import("./pack~cc-jewel-box-C-vIsXue.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-reading-nook.webp":()=>h(()=>import("./pack~cc-reading-nook-Ba_6wW4M.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-star-dresser.webp":()=>h(()=>import("./pack~cc-star-dresser-CY3IU_Po.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-window-seat.webp":()=>h(()=>import("./pack~cc-window-seat-CPrwdaeJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~checker-bed.webp":()=>h(()=>import("./pack~checker-bed-Dl1khZwL.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~clothes-rail.webp":()=>h(()=>import("./pack~clothes-rail-DpNxviPS.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cloud-rug.webp":()=>h(()=>import("./pack~cloud-rug-BVi9jYKG.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cloud-shelf.webp":()=>h(()=>import("./pack~cloud-shelf-slqFLmn1.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cork-board.webp":()=>h(()=>import("./pack~cork-board-DWOPEjn8.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~curvy-desk.webp":()=>h(()=>import("./pack~curvy-desk-BDa2yytO.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~daisy-pot.webp":()=>h(()=>import("./pack~daisy-pot-vdUJfXm_.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~desk-mic.webp":()=>h(()=>import("./pack~desk-mic-d9T8n8mE.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~desk.webp":()=>h(()=>import("./pack~desk-C-3AgNRZ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~dino-plush.webp":()=>h(()=>import("./pack~dino-plush-DdqMPHIF.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~doll-house.webp":()=>h(()=>import("./pack~doll-house-CH0M4iJ5.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~dresser.webp":()=>h(()=>import("./pack~dresser-Cws-4Als.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~egg-chair.webp":()=>h(()=>import("./pack~egg-chair-DYGRZPW0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~floor-fan.webp":()=>h(()=>import("./pack~floor-fan-NUw25upr.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~frog-plush.webp":()=>h(()=>import("./pack~frog-plush-Bq4x4dF_.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~game-controller.webp":()=>h(()=>import("./pack~game-controller-CwDKL6zs.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~gaming-chair.webp":()=>h(()=>import("./pack~gaming-chair-Ch-jvTrR.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~guinea-pig.webp":()=>h(()=>import("./pack~guinea-pig-BSQGDcoG.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~hamster-cage.webp":()=>h(()=>import("./pack~hamster-cage-1ZrJIYPk.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~hamster-pet.webp":()=>h(()=>import("./pack~hamster-pet-DO0Nc-ra.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~headphones.webp":()=>h(()=>import("./pack~headphones-BuEyFi9F.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~heart-rug.webp":()=>h(()=>import("./pack~heart-rug-CHsSWFVJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~keyboard.webp":()=>h(()=>import("./pack~keyboard-CpH04NZb.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~lava-lamp.webp":()=>h(()=>import("./pack~lava-lamp-C0yGLXxS.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~moon-night-light.webp":()=>h(()=>import("./pack~moon-night-light-jQgCx363.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~nightstand.webp":()=>h(()=>import("./pack~nightstand-CAZ1Ijk0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~paper-lantern.webp":()=>h(()=>import("./pack~paper-lantern-CBHdnzS2.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~pastel-wardrobe.webp":()=>h(()=>import("./pack~pastel-wardrobe-6p6FbGSg.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~phone-stand.webp":()=>h(()=>import("./pack~phone-stand-DA6FpZ6R.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~piggy-bank.webp":()=>h(()=>import("./pack~piggy-bank-CsgR-O1T.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~plant-stand.webp":()=>h(()=>import("./pack~plant-stand-m1tPlZfP.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~play-tent.webp":()=>h(()=>import("./pack~play-tent-C9Fxa0Rh.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~star-mobile.webp":()=>h(()=>import("./pack~star-mobile-CMLjVRhn.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-chest.webp":()=>h(()=>import("./pack~toy-chest-Bx3rslln.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-robot.webp":()=>h(()=>import("./pack~toy-robot-DuDxaaXx.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-train.webp":()=>h(()=>import("./pack~toy-train-OdPxfMvY.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~unicorn-plush.webp":()=>h(()=>import("./pack~unicorn-plush-1Ml4NpgU.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~vlog-camera.webp":()=>h(()=>import("./pack~vlog-camera-CU7magSa.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wardrobe.webp":()=>h(()=>import("./pack~wardrobe-CnpDMG_i.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wh-dresser.webp":()=>h(()=>import("./pack~wh-dresser-BJJ7U3Ti.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wh-nightstand.webp":()=>h(()=>import("./pack~wh-nightstand-TWRUmwYh.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wood-desk.webp":()=>h(()=>import("./pack~wood-desk-rwE12GqK.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wooden-bed.webp":()=>h(()=>import("./pack~wooden-bed-13S3AiLf.js"),[]).then(e=>e.default),"../../assets/art/bedroom/stars.webp":()=>h(()=>import("./stars-BPD2RlkZ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/story-pillow.webp":()=>h(()=>import("./story-pillow-3KtRY1EI.js"),[]).then(e=>e.default),"../../assets/art/bedroom/teddy.webp":()=>h(()=>import("./teddy-CS3IZCmA.js"),[]).then(e=>e.default),"../../assets/art/bedroom/tub.webp":()=>h(()=>import("./tub-D2ItmFKM.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-bakery-shelf.webp":()=>h(()=>import("./pack~cc-bakery-shelf-C9pglmOD.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-breakfast-table.webp":()=>h(()=>import("./pack~cc-breakfast-table-CqAzN2si.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-bubble-chair.webp":()=>h(()=>import("./pack~cc-bubble-chair-Db6ctGIk.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-cupcake-stand.webp":()=>h(()=>import("./pack~cc-cupcake-stand-ClVhXfMJ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-dryer-chair.webp":()=>h(()=>import("./pack~cc-dryer-chair-BhVjSN-o.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-flower-kettle.webp":()=>h(()=>import("./pack~cc-flower-kettle-T5UeKV0l.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-light-vanity.webp":()=>h(()=>import("./pack~cc-light-vanity-D_F5Ili-.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-macaron-jar.webp":()=>h(()=>import("./pack~cc-macaron-jar-C7OMMZGy.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-mani-chair.webp":()=>h(()=>import("./pack~cc-mani-chair-gE8U4fT9.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-mint-fridge.webp":()=>h(()=>import("./pack~cc-mint-fridge-qv93g_mZ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-pastel-range.webp":()=>h(()=>import("./pack~cc-pastel-range-DEzEnqL9.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-perfume-tray.webp":()=>h(()=>import("./pack~cc-perfume-tray-BOuRtQMQ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-ribbon-mirror.webp":()=>h(()=>import("./pack~cc-ribbon-mirror-DaVelywO.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-teapot-set.webp":()=>h(()=>import("./pack~cc-teapot-set-CYwQRzs2.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~arched-shelf.webp":()=>h(()=>import("./pack~arched-shelf-CKpdbpUV.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~blob-rug.webp":()=>h(()=>import("./pack~blob-rug-DV27jZ4K.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~bubbly-plant.webp":()=>h(()=>import("./pack~bubbly-plant-DaDhjp5G.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~bud-vase.webp":()=>h(()=>import("./pack~bud-vase-BjDwnbex.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~comb-brush.webp":()=>h(()=>import("./pack~comb-brush-2q32lqRM.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~cream-jars.webp":()=>h(()=>import("./pack~cream-jars-DuhIPlDY.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~drop-lamp.webp":()=>h(()=>import("./pack~drop-lamp-CpS9XCXn.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~droplet-buddy.webp":()=>h(()=>import("./pack~droplet-buddy-DgmZ-fU6.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~fancy-sofa.webp":()=>h(()=>import("./pack~fancy-sofa-Cuv4CZ93.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~flower-cart.webp":()=>h(()=>import("./pack~flower-cart-Cpa-qrtx.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~foot-spa.webp":()=>h(()=>import("./pack~foot-spa-CSEQ1rPl.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~globe-pendants.webp":()=>h(()=>import("./pack~globe-pendants-CeBlCiLv.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~glow-mirror.webp":()=>h(()=>import("./pack~glow-mirror-BK53Zp0A.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~gold-floor-mirror.webp":()=>h(()=>import("./pack~gold-floor-mirror-BIgxfU1m.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~hair-dryer.webp":()=>h(()=>import("./pack~hair-dryer-CDTC9I6n.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~heart-plant.webp":()=>h(()=>import("./pack~heart-plant-B-wW-dwX.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~heart-pouf.webp":()=>h(()=>import("./pack~heart-pouf-BbbND0iB.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~lilac-curtain.webp":()=>h(()=>import("./pack~lilac-curtain-CKYxudqA.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~lotion-trio.webp":()=>h(()=>import("./pack~lotion-trio-oJDS-nAk.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~mani-lamp.webp":()=>h(()=>import("./pack~mani-lamp-CIckVWe7.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~nail-table.webp":()=>h(()=>import("./pack~nail-table-DblO1JLs.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pebble-rug.webp":()=>h(()=>import("./pack~pebble-rug-bTJFA8Ur.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~perfume-bottle.webp":()=>h(()=>import("./pack~perfume-bottle-gM_mVBfU.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pink-fountain.webp":()=>h(()=>import("./pack~pink-fountain-Ciur2kZp.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pink-vanity.webp":()=>h(()=>import("./pack~pink-vanity-wGJdTvWK.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~polish-bottle.webp":()=>h(()=>import("./pack~polish-bottle-TyYjJ4KH.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~polish-rack.webp":()=>h(()=>import("./pack~polish-rack-BiHiHzDG.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~reception-desk.webp":()=>h(()=>import("./pack~reception-desk-Bhr61SSS.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~salon-chair.webp":()=>h(()=>import("./pack~salon-chair-B5ARb_Hu.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~scent-candle.webp":()=>h(()=>import("./pack~scent-candle-DhSW37c1.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~spray-bottle.webp":()=>h(()=>import("./pack~spray-bottle-co6Gr0Aw.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~star-wall-sign.webp":()=>h(()=>import("./pack~star-wall-sign-keSh_Cax.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~swivel-stool.webp":()=>h(()=>import("./pack~swivel-stool-gm_rxOWt.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~tiered-tray.webp":()=>h(()=>import("./pack~tiered-tray-CrVkNUF_.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~towel-cart.webp":()=>h(()=>import("./pack~towel-cart-TzS6naxj.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~towel-stack.webp":()=>h(()=>import("./pack~towel-stack-DVE-ZURg.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~vine-planter.webp":()=>h(()=>import("./pack~vine-planter-D6XFbFLe.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~waiting-bench.webp":()=>h(()=>import("./pack~waiting-bench-rf-Lxrnd.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~wash-chair.webp":()=>h(()=>import("./pack~wash-chair-By1PyrJZ.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-candy-bowl.webp":()=>h(()=>import("./pack~hw-candy-bowl-DYzwlwqt.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-cat-statue.webp":()=>h(()=>import("./pack~hw-cat-statue-FQxqUye_.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-cauldron.webp":()=>h(()=>import("./pack~hw-cauldron-CEa-TJHO.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-ghost-sheet.webp":()=>h(()=>import("./pack~hw-ghost-sheet-rc91-ve_.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-hay-bale.webp":()=>h(()=>import("./pack~hw-hay-bale-BbE90YS9.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-heart-pumpkin.webp":()=>h(()=>import("./pack~hw-heart-pumpkin-PfYNpXFo.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-leaf-garland.webp":()=>h(()=>import("./pack~hw-leaf-garland-DpM5QBlC.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-moon-cling.webp":()=>h(()=>import("./pack~hw-moon-cling-CH5pjYPJ.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-moon-lantern.webp":()=>h(()=>import("./pack~hw-moon-lantern-CmD5N0JV.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-star-pumpkin.webp":()=>h(()=>import("./pack~hw-star-pumpkin-WFRvw5za.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-witch-hat.webp":()=>h(()=>import("./pack~hw-witch-hat-q2MY5sg8.js"),[]).then(e=>e.default),"../../assets/art/kitchen/apple.webp":()=>h(()=>import("./apple-CgQUqZtF.js"),[]).then(e=>e.default),"../../assets/art/kitchen/berry-basket.webp":()=>h(()=>import("./berry-basket-D02mck40.js"),[]).then(e=>e.default),"../../assets/art/kitchen/cake.webp":()=>h(()=>import("./cake-D-PUSdV3.js"),[]).then(e=>e.default),"../../assets/art/kitchen/donut.webp":()=>h(()=>import("./donut-D-CyVfCH.js"),[]).then(e=>e.default),"../../assets/art/kitchen/fridge.webp":()=>h(()=>import("./fridge-CPUz39WO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/juice.webp":()=>h(()=>import("./juice-C7d-xViI.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bananas.webp":()=>h(()=>import("./pack~bananas-BaRiiq6m.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bar-stool.webp":()=>h(()=>import("./pack~bar-stool-DoItrBtD.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bread-loaf.webp":()=>h(()=>import("./pack~bread-loaf-DkvGPzQe.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~chick.webp":()=>h(()=>import("./pack~chick-BO9DXErH.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~china-hutch.webp":()=>h(()=>import("./pack~china-hutch-DPrwGSNq.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cocoa-mug.webp":()=>h(()=>import("./pack~cocoa-mug-hzMczJEM.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cookie-jar.webp":()=>h(()=>import("./pack~cookie-jar-DwGPCGTZ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cooking-pot.webp":()=>h(()=>import("./pack~cooking-pot-CfarfMvn.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cupcake.webp":()=>h(()=>import("./pack~cupcake-4s6JCz52.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~dish-rack.webp":()=>h(()=>import("./pack~dish-rack-Dffid-z2.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~fruit-bowl.webp":()=>h(()=>import("./pack~fruit-bowl-S7zdSZud.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~frying-pan.webp":()=>h(()=>import("./pack~frying-pan-BibqhFDJ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~happy-fridge.webp":()=>h(()=>import("./pack~happy-fridge-HnFXofL6.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~herb-box.webp":()=>h(()=>import("./pack~herb-box-DjQ-1q5D.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~high-chair.webp":()=>h(()=>import("./pack~high-chair-24NInnaO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~ice-cream.webp":()=>h(()=>import("./pack~ice-cream-rdopj06A.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kettle.webp":()=>h(()=>import("./pack~kettle-ByDzqkyg.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kitchen-counter.webp":()=>h(()=>import("./pack~kitchen-counter-B7uMIWhT.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kitchen-sink.webp":()=>h(()=>import("./pack~kitchen-sink-DyICEjEC.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~lemon-tree.webp":()=>h(()=>import("./pack~lemon-tree-B8bzBxaO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~microwave.webp":()=>h(()=>import("./pack~microwave-B6anYgBg.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~milk-bottle.webp":()=>h(()=>import("./pack~milk-bottle-CKMei0uX.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pancakes.webp":()=>h(()=>import("./pack~pancakes-BmuT40In.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pantry-shelf.webp":()=>h(()=>import("./pack~pantry-shelf-0EpJaISh.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pendant-lamp.webp":()=>h(()=>import("./pack~pendant-lamp-BRmz1TSb.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pet-bowl.webp":()=>h(()=>import("./pack~pet-bowl-bLDcshyX.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~rice-cooker.webp":()=>h(()=>import("./pack~rice-cooker-j9bjO2OS.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~runner-rug.webp":()=>h(()=>import("./pack~runner-rug-DgsAHdwM.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~spice-rack.webp":()=>h(()=>import("./pack~spice-rack-5CIyihfN.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~stand-mixer.webp":()=>h(()=>import("./pack~stand-mixer-DVs9icnQ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~teapot.webp":()=>h(()=>import("./pack~teapot-Clbuel00.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~toaster.webp":()=>h(()=>import("./pack~toaster-0CdrvAn6.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~utensil-rail.webp":()=>h(()=>import("./pack~utensil-rail-7lJosKxj.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~watermelon-slice.webp":()=>h(()=>import("./pack~watermelon-slice-DDNYgh1a.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pizza.webp":()=>h(()=>import("./pizza-CBn4rlbT.js"),[]).then(e=>e.default),"../../assets/art/kitchen/stove.webp":()=>h(()=>import("./stove-EEI-cSzf.js"),[]).then(e=>e.default),"../../assets/art/living/_pop~cada-mouse.webp":()=>h(()=>Promise.resolve().then(()=>T4),void 0).then(e=>e.default),"../../assets/art/living/_pop~quinn-pup.webp":()=>h(()=>Promise.resolve().then(()=>P4),void 0).then(e=>e.default),"../../assets/art/living/_pop~sloane-snail.webp":()=>h(()=>Promise.resolve().then(()=>A4),void 0).then(e=>e.default),"../../assets/art/living/bunny.webp":()=>h(()=>import("./bunny-PYkx6Ie3.js"),[]).then(e=>e.default),"../../assets/art/living/cactus.webp":()=>h(()=>import("./cactus-CNbOypby.js"),[]).then(e=>e.default),"../../assets/art/living/cat-tower.webp":()=>h(()=>import("./cat-tower-BTX9_pA4.js"),[]).then(e=>e.default),"../../assets/art/living/cat.webp":()=>h(()=>import("./cat-CkF-5Moc.js"),[]).then(e=>e.default),"../../assets/art/living/dog.webp":()=>h(()=>import("./dog-XsW5t_fN.js"),[]).then(e=>e.default),"../../assets/art/living/egg~cada-mouse.webp":()=>h(()=>import("./egg~cada-mouse-CahQlh-m.js"),[]).then(e=>e.default),"../../assets/art/living/egg~chloe-starlamp.webp":()=>h(()=>import("./egg~chloe-starlamp-pq_Iclzu.js"),[]).then(e=>e.default),"../../assets/art/living/egg~quinn-pup.webp":()=>h(()=>import("./egg~quinn-pup-BqdUFpbv.js"),[]).then(e=>e.default),"../../assets/art/living/egg~reagan-frame.webp":()=>h(()=>import("./egg~reagan-frame-BWp9N6ej.js"),[]).then(e=>e.default),"../../assets/art/living/egg~sloane-snail.webp":()=>h(()=>import("./egg~sloane-snail-DsDMZRR7.js"),[]).then(e=>e.default),"../../assets/art/living/fish.webp":()=>h(()=>import("./fish-Cs1FEzIZ.js"),[]).then(e=>e.default),"../../assets/art/living/floor-cushion.webp":()=>h(()=>import("./floor-cushion-D7ewX4dX.js"),[]).then(e=>e.default),"../../assets/art/living/flowers.webp":()=>h(()=>import("./flowers-CHLFwDXa.js"),[]).then(e=>e.default),"../../assets/art/living/kennel.webp":()=>h(()=>import("./kennel-iNvQ28eh.js"),[]).then(e=>e.default),"../../assets/art/living/pack~acorn-friend.webp":()=>h(()=>import("./pack~acorn-friend-Bm4Hk12h.js"),[]).then(e=>e.default),"../../assets/art/living/pack~aquarium.webp":()=>h(()=>import("./pack~aquarium-D0sUglTr.js"),[]).then(e=>e.default),"../../assets/art/living/pack~arc-floor-lamp.webp":()=>h(()=>import("./pack~arc-floor-lamp-7GCaGkDs.js"),[]).then(e=>e.default),"../../assets/art/living/pack~bean-bag.webp":()=>h(()=>Promise.resolve().then(()=>DE),void 0).then(e=>e.default),"../../assets/art/living/pack~bird-cage.webp":()=>h(()=>import("./pack~bird-cage-CLlPQlCF.js"),[]).then(e=>e.default),"../../assets/art/living/pack~blanket-basket.webp":()=>h(()=>import("./pack~blanket-basket-Clw-jcOi.js"),[]).then(e=>e.default),"../../assets/art/living/pack~box-stack.webp":()=>h(()=>import("./pack~box-stack-DV3Ljobv.js"),[]).then(e=>e.default),"../../assets/art/living/pack~brick-fireplace.webp":()=>h(()=>import("./pack~brick-fireplace-CU641OC1.js"),[]).then(e=>e.default),"../../assets/art/living/pack~building-blocks.webp":()=>h(()=>import("./pack~building-blocks-C0yT9TvM.js"),[]).then(e=>e.default),"../../assets/art/living/pack~bulletin-board.webp":()=>h(()=>import("./pack~bulletin-board-BCXiWqVp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cactus-buddy.webp":()=>h(()=>import("./pack~cactus-buddy-2_JfEHKl.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-cottage-aquarium.webp":()=>h(()=>import("./pack~cc-cottage-aquarium-C8NYhmrd.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-fairy-shelf.webp":()=>h(()=>import("./pack~cc-fairy-shelf-CnHOFSRs.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-flower-lamp.webp":()=>h(()=>import("./pack~cc-flower-lamp-wbPhnbQ_.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-clock.webp":()=>h(()=>import("./pack~cc-heart-clock-jr4MzVW9.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-pouf.webp":()=>h(()=>import("./pack~cc-heart-pouf-BPM9YsrB.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-rug.webp":()=>h(()=>import("./pack~cc-heart-rug-BVKJ0cQB.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-macrame-swing.webp":()=>h(()=>import("./pack~cc-macrame-swing-pWIX7Xk-.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-mushroom-stool.webp":()=>h(()=>import("./pack~cc-mushroom-stool-CMlvAjd6.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-petal-table.webp":()=>h(()=>import("./pack~cc-petal-table-7S1s7yzK.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-plant-wall.webp":()=>h(()=>import("./pack~cc-plant-wall-p6D9EEBb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-record-player.webp":()=>h(()=>import("./pack~cc-record-player-BRAifeEK.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-scallop-curtains.webp":()=>h(()=>import("./pack~cc-scallop-curtains-BeV7rdPo.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-scallop-loveseat.webp":()=>h(()=>import("./pack~cc-scallop-loveseat-_AoDnFXb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~checker-rug.webp":()=>h(()=>import("./pack~checker-rug-Cp2IkzoS.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cloud-sofa.webp":()=>h(()=>import("./pack~cloud-sofa-DyBmuzAg.js"),[]).then(e=>e.default),"../../assets/art/living/pack~coffee-table.webp":()=>h(()=>import("./pack~coffee-table-DPuXhspW.js"),[]).then(e=>e.default),"../../assets/art/living/pack~comfy-armchair.webp":()=>h(()=>import("./pack~comfy-armchair-CJDG30Cj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cream-sofa.webp":()=>h(()=>import("./pack~cream-sofa-Ez2miUnO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cubby-shelf.webp":()=>h(()=>import("./pack~cubby-shelf-BUMGU8Jh.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cube-shelf.webp":()=>h(()=>import("./pack~cube-shelf-D5D2Dw5S.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cute-speaker.webp":()=>h(()=>import("./pack~cute-speaker-jTqsaV2I.js"),[]).then(e=>e.default),"../../assets/art/living/pack~daisy-rug.webp":()=>h(()=>import("./pack~daisy-rug-BCUkj5ia.js"),[]).then(e=>e.default),"../../assets/art/living/pack~desk-lamp.webp":()=>h(()=>import("./pack~desk-lamp-DmCKofr2.js"),[]).then(e=>e.default),"../../assets/art/living/pack~fiddle-leaf-fig.webp":()=>h(()=>import("./pack~fiddle-leaf-fig-D7FML9mx.js"),[]).then(e=>e.default),"../../assets/art/living/pack~fireplace.webp":()=>h(()=>import("./pack~fireplace-DYp6BN4M.js"),[]).then(e=>e.default),"../../assets/art/living/pack~flower-lamp.webp":()=>h(()=>import("./pack~flower-lamp-kPf9KBh-.js"),[]).then(e=>e.default),"../../assets/art/living/pack~glass-cabinet.webp":()=>h(()=>import("./pack~glass-cabinet-B9JOaE-O.js"),[]).then(e=>e.default),"../../assets/art/living/pack~globe.webp":()=>h(()=>import("./pack~globe-Df4aJX14.js"),[]).then(e=>e.default),"../../assets/art/living/pack~hanging-lantern.webp":()=>h(()=>import("./pack~hanging-lantern-CSb5_y-t.js"),[]).then(e=>e.default),"../../assets/art/living/pack~hanging-planter.webp":()=>h(()=>import("./pack~hanging-planter-BXNCa3po.js"),[]).then(e=>e.default),"../../assets/art/living/pack~heart-light.webp":()=>h(()=>import("./pack~heart-light-BMZQFtcT.js"),[]).then(e=>e.default),"../../assets/art/living/pack~knit-cushion.webp":()=>h(()=>import("./pack~knit-cushion-DzpDb6hm.js"),[]).then(e=>e.default),"../../assets/art/living/pack~ladder-shelf.webp":()=>h(()=>import("./pack~ladder-shelf-CLOcbyxp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~landscape-art.webp":()=>h(()=>import("./pack~landscape-art-DiJEigPf.js"),[]).then(e=>e.default),"../../assets/art/living/pack~lattice-bench.webp":()=>h(()=>import("./pack~lattice-bench-0G6hKZYj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~leaf-wreath.webp":()=>h(()=>import("./pack~leaf-wreath-WJ1hv4SR.js"),[]).then(e=>e.default),"../../assets/art/living/pack~monstera-plant.webp":()=>h(()=>import("./pack~monstera-plant-BE84EAw8.js"),[]).then(e=>e.default),"../../assets/art/living/pack~moving-box.webp":()=>h(()=>import("./pack~moving-box-CAe2Xeia.js"),[]).then(e=>e.default),"../../assets/art/living/pack~piano.webp":()=>h(()=>import("./pack~piano-C2g19n4Y.js"),[]).then(e=>e.default),"../../assets/art/living/pack~popcorn.webp":()=>h(()=>import("./pack~popcorn-B6n0yaX2.js"),[]).then(e=>e.default),"../../assets/art/living/pack~pothos-plant.webp":()=>h(()=>import("./pack~pothos-plant-CTHDCuIc.js"),[]).then(e=>e.default),"../../assets/art/living/pack~pouf.webp":()=>h(()=>import("./pack~pouf-BJ-teA6I.js"),[]).then(e=>e.default),"../../assets/art/living/pack~puffy-stool.webp":()=>h(()=>import("./pack~puffy-stool-D38tkWnm.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rainbow-rug.webp":()=>h(()=>import("./pack~rainbow-rug-DUV6gUsN.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rainbow-wall-art.webp":()=>h(()=>import("./pack~rainbow-wall-art--boV5icC.js"),[]).then(e=>e.default),"../../assets/art/living/pack~retro-radio.webp":()=>h(()=>import("./pack~retro-radio-CDLK9pHp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~ring-light.webp":()=>h(()=>import("./pack~ring-light-C3E9VDAl.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rocking-chair.webp":()=>h(()=>import("./pack~rocking-chair-B2p2ReQc.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rocking-horse.webp":()=>h(()=>import("./pack~rocking-horse-CswTc134.js"),[]).then(e=>e.default),"../../assets/art/living/pack~round-rug.webp":()=>h(()=>import("./pack~round-rug-CHSVB2Aw.js"),[]).then(e=>e.default),"../../assets/art/living/pack~side-table-round.webp":()=>h(()=>import("./pack~side-table-round-CP96FSiO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~snake-plant.webp":()=>h(()=>import("./pack~snake-plant-DawlmINM.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sprout-pot.webp":()=>h(()=>import("./pack~sprout-pot-Dx8LI8dH.js"),[]).then(e=>e.default),"../../assets/art/living/pack~star-lamp.webp":()=>h(()=>import("./pack~star-lamp-s9PtqFmZ.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sticker-board.webp":()=>h(()=>import("./pack~sticker-board--TDZ7ozq.js"),[]).then(e=>e.default),"../../assets/art/living/pack~string-lights.webp":()=>h(()=>import("./pack~string-lights-HZXr5sUd.js"),[]).then(e=>e.default),"../../assets/art/living/pack~stripe-runner.webp":()=>h(()=>import("./pack~stripe-runner-B0fRj7Re.js"),[]).then(e=>e.default),"../../assets/art/living/pack~succulent-trio.webp":()=>h(()=>import("./pack~succulent-trio-M7abHPiA.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sunny-art.webp":()=>h(()=>import("./pack~sunny-art-D2_v9d4h.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sv-bean-bag.webp":()=>h(()=>Promise.resolve().then(()=>HE),void 0).then(e=>e.default),"../../assets/art/living/pack~sv-cloud-rug.webp":()=>h(()=>import("./pack~sv-cloud-rug-DBeaYhY1.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sv-wall-shelf.webp":()=>h(()=>import("./pack~sv-wall-shelf-CE0YAWvX.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tassel-rug.webp":()=>h(()=>import("./pack~tassel-rug-C3GgXPyZ.js"),[]).then(e=>e.default),"../../assets/art/living/pack~throw-pillow.webp":()=>h(()=>import("./pack~throw-pillow-BUguyBcj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~toy-car.webp":()=>h(()=>import("./pack~toy-car-DZ6BYQDO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~trailing-plant.webp":()=>h(()=>import("./pack~trailing-plant-BJ2rTgvE.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tulip-vase.webp":()=>h(()=>import("./pack~tulip-vase-CmyisqxG.js"),[]).then(e=>e.default),"../../assets/art/living/pack~turtle.webp":()=>h(()=>import("./pack~turtle-FaBzuoqb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tv-stand.webp":()=>h(()=>import("./pack~tv-stand-C8gC4UFW.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wall-clock.webp":()=>h(()=>import("./pack~wall-clock-D7PdTom6.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wall-shelf.webp":()=>h(()=>import("./pack~wall-shelf-C1lRJ7GC.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wavy-floor-lamp.webp":()=>h(()=>import("./pack~wavy-floor-lamp-BL00MuGA.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-arc-floor-lamp.webp":()=>h(()=>import("./pack~wh-arc-floor-lamp-B6QVftZN.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-book-stack.webp":()=>h(()=>import("./pack~wh-book-stack-Dwcz23qo.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-fiddle-leaf-fig.webp":()=>h(()=>import("./pack~wh-fiddle-leaf-fig-COFk3BJw.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-pendant-lamp.webp":()=>h(()=>import("./pack~wh-pendant-lamp-Dd4mFEDS.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-snake-plant.webp":()=>h(()=>import("./pack~wh-snake-plant-D-C6ZJKO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-string-lights.webp":()=>h(()=>import("./pack~wh-string-lights-D0MBhT1M.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-armchair.webp":()=>h(()=>import("./pack~wood-armchair-DHvcj8Mx.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-bookshelf.webp":()=>h(()=>import("./pack~wood-bookshelf-sxaV4CyF.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-coffee-table.webp":()=>h(()=>import("./pack~wood-coffee-table-CrSb-1Xv.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-stool.webp":()=>h(()=>import("./pack~wood-stool-JjUX_8W2.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-bouquet.webp":()=>h(()=>import("./ranch-bouquet-LHbKbTej.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-carrot.webp":()=>h(()=>import("./ranch-carrot-cyry77wX.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-egg.webp":()=>h(()=>import("./ranch-egg-CYsNXUKY.js"),[]).then(e=>e.default),"../../assets/art/living/tree.webp":()=>h(()=>import("./tree-CXYySnAy.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby-bottle.webp":()=>h(()=>import("./baby-bottle-40H4PprS.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby-shelf.webp":()=>h(()=>import("./baby-shelf--dhe-OtF.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby.webp":()=>h(()=>import("./baby-Cjy_lAi1.js"),[]).then(e=>e.default),"../../assets/art/nursery/bassinet.webp":()=>h(()=>import("./bassinet-D1E3rjcm.js"),[]).then(e=>e.default),"../../assets/art/nursery/blocks.webp":()=>h(()=>import("./blocks-CtsB78Ug.js"),[]).then(e=>e.default),"../../assets/art/nursery/bunny-plush.webp":()=>h(()=>import("./bunny-plush-9_hTWSJ0.js"),[]).then(e=>e.default),"../../assets/art/nursery/changing-table.webp":()=>h(()=>import("./changing-table-DKyI_wrV.js"),[]).then(e=>e.default),"../../assets/art/nursery/cloud-rug.webp":()=>h(()=>import("./cloud-rug-BvUUbOnx.js"),[]).then(e=>e.default),"../../assets/art/nursery/crib-mobile.webp":()=>h(()=>import("./crib-mobile-BvlX6u0a.js"),[]).then(e=>e.default),"../../assets/art/nursery/crib.webp":()=>h(()=>import("./crib-Do3izZrw.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-cocoa.webp":()=>h(()=>import("./doll-cocoa-ypqLIm4M.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-honey.webp":()=>h(()=>import("./doll-honey-Dc51Fmwm.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-rose.webp":()=>h(()=>import("./doll-rose-DTSDlFkK.js"),[]).then(e=>e.default),"../../assets/art/nursery/moon-art.webp":()=>h(()=>import("./moon-art-DQbuFa-d.js"),[]).then(e=>e.default),"../../assets/art/nursery/music-box.webp":()=>h(()=>import("./music-box-DKDLmINu.js"),[]).then(e=>e.default),"../../assets/art/nursery/night-light.webp":()=>h(()=>import("./night-light-lryf6NaK.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-curtains.webp":()=>h(()=>import("./nursery-curtains-Ds4ZTC1C.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-dresser.webp":()=>h(()=>import("./nursery-dresser-DbmVYgde.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-lamp.webp":()=>h(()=>import("./nursery-lamp-pqbkf92r.js"),[]).then(e=>e.default),"../../assets/art/nursery/play-mat.webp":()=>h(()=>import("./play-mat-fGBMoW0r.js"),[]).then(e=>e.default),"../../assets/art/nursery/rattle.webp":()=>h(()=>import("./rattle-EzXp43O4.js"),[]).then(e=>e.default),"../../assets/art/nursery/rocker.webp":()=>h(()=>import("./rocker-BieX4wIy.js"),[]).then(e=>e.default),"../../assets/art/nursery/rocking-horse.webp":()=>h(()=>import("./rocking-horse-BK9_A5ep.js"),[]).then(e=>e.default),"../../assets/art/nursery/stacking-rings.webp":()=>h(()=>import("./stacking-rings-8Z2fYLIi.js"),[]).then(e=>e.default),"../../assets/art/nursery/toy-bin.webp":()=>h(()=>import("./toy-bin-CuORRSkX.js"),[]).then(e=>e.default),"../../assets/art/pets/cat-calico-nap.webp":()=>h(()=>Promise.resolve().then(()=>C5),void 0).then(e=>e.default),"../../assets/art/pets/cat-calico-sit.webp":()=>h(()=>Promise.resolve().then(()=>I5),void 0).then(e=>e.default),"../../assets/art/pets/cat-calico-stand.webp":()=>h(()=>Promise.resolve().then(()=>O5),void 0).then(e=>e.default),"../../assets/art/pets/cat-smokey-nap.webp":()=>h(()=>Promise.resolve().then(()=>B5),void 0).then(e=>e.default),"../../assets/art/pets/cat-smokey-sit.webp":()=>h(()=>Promise.resolve().then(()=>D5),void 0).then(e=>e.default),"../../assets/art/pets/cat-smokey-stand.webp":()=>h(()=>Promise.resolve().then(()=>H5),void 0).then(e=>e.default),"../../assets/art/pets/cat-tabby-nap.webp":()=>h(()=>Promise.resolve().then(()=>W5),void 0).then(e=>e.default),"../../assets/art/pets/cat-tabby-sit.webp":()=>h(()=>Promise.resolve().then(()=>V5),void 0).then(e=>e.default),"../../assets/art/pets/cat-tabby-stand.webp":()=>h(()=>Promise.resolve().then(()=>U5),void 0).then(e=>e.default),"../../assets/art/pets/cat-tuxedo-nap.webp":()=>h(()=>Promise.resolve().then(()=>z5),void 0).then(e=>e.default),"../../assets/art/pets/cat-tuxedo-sit.webp":()=>h(()=>Promise.resolve().then(()=>Q5),void 0).then(e=>e.default),"../../assets/art/pets/cat-tuxedo-stand.webp":()=>h(()=>Promise.resolve().then(()=>N5),void 0).then(e=>e.default),"../../assets/art/pets/dog-dachshund-sit.webp":()=>h(()=>Promise.resolve().then(()=>q5),void 0).then(e=>e.default),"../../assets/art/pets/dog-dachshund-sleep.webp":()=>h(()=>Promise.resolve().then(()=>j5),void 0).then(e=>e.default),"../../assets/art/pets/dog-dachshund-stand.webp":()=>h(()=>Promise.resolve().then(()=>F5),void 0).then(e=>e.default),"../../assets/art/pets/dog-golden-sit.webp":()=>h(()=>Promise.resolve().then(()=>Z5),void 0).then(e=>e.default),"../../assets/art/pets/dog-golden-sleep.webp":()=>h(()=>Promise.resolve().then(()=>G5),void 0).then(e=>e.default),"../../assets/art/pets/dog-golden-stand.webp":()=>h(()=>Promise.resolve().then(()=>Y5),void 0).then(e=>e.default),"../../assets/art/pets/dog-poodle-sit.webp":()=>h(()=>Promise.resolve().then(()=>K5),void 0).then(e=>e.default),"../../assets/art/pets/dog-poodle-sleep.webp":()=>h(()=>Promise.resolve().then(()=>X5),void 0).then(e=>e.default),"../../assets/art/pets/dog-poodle-stand.webp":()=>h(()=>Promise.resolve().then(()=>J5),void 0).then(e=>e.default),"../../assets/art/pets/dog-pup-sit.webp":()=>h(()=>Promise.resolve().then(()=>eM),void 0).then(e=>e.default),"../../assets/art/pets/dog-pup-sleep.webp":()=>h(()=>Promise.resolve().then(()=>tM),void 0).then(e=>e.default),"../../assets/art/pets/dog-pup-stand.webp":()=>h(()=>Promise.resolve().then(()=>nM),void 0).then(e=>e.default),"../../assets/art/pets/dog-spotty-sit.webp":()=>h(()=>Promise.resolve().then(()=>sM),void 0).then(e=>e.default),"../../assets/art/pets/dog-spotty-sleep.webp":()=>h(()=>Promise.resolve().then(()=>oM),void 0).then(e=>e.default),"../../assets/art/pets/dog-spotty-stand.webp":()=>h(()=>Promise.resolve().then(()=>iM),void 0).then(e=>e.default),"../../assets/art/ranch/animal-bunny.webp":()=>h(()=>Promise.resolve().then(()=>aM),void 0).then(e=>e.default),"../../assets/art/ranch/animal-cow.webp":()=>h(()=>Promise.resolve().then(()=>rM),void 0).then(e=>e.default),"../../assets/art/ranch/animal-goat.webp":()=>h(()=>Promise.resolve().then(()=>lM),void 0).then(e=>e.default),"../../assets/art/ranch/animal-piglet.webp":()=>h(()=>Promise.resolve().then(()=>cM),void 0).then(e=>e.default),"../../assets/art/ranch/animal-sheep.webp":()=>h(()=>Promise.resolve().then(()=>dM),void 0).then(e=>e.default),"../../assets/art/ranch/apple-tree.webp":()=>h(()=>Promise.resolve().then(()=>fM),void 0).then(e=>e.default),"../../assets/art/ranch/basket.webp":()=>h(()=>Promise.resolve().then(()=>hM),void 0).then(e=>e.default),"../../assets/art/ranch/hen-house.webp":()=>h(()=>Promise.resolve().then(()=>uM),void 0).then(e=>e.default),"../../assets/art/ranch/horse-chestnut-bare.webp":()=>h(()=>Promise.resolve().then(()=>pM),void 0).then(e=>e.default),"../../assets/art/ranch/horse-chestnut-saddle.webp":()=>h(()=>Promise.resolve().then(()=>gM),void 0).then(e=>e.default),"../../assets/art/ranch/horse-midnight-bare.webp":()=>h(()=>Promise.resolve().then(()=>mM),void 0).then(e=>e.default),"../../assets/art/ranch/horse-midnight-saddle.webp":()=>h(()=>Promise.resolve().then(()=>yM),void 0).then(e=>e.default),"../../assets/art/ranch/horse-rainbow-bare.webp":()=>h(()=>Promise.resolve().then(()=>bM),void 0).then(e=>e.default),"../../assets/art/ranch/horse-rainbow-saddle.webp":()=>h(()=>Promise.resolve().then(()=>wM),void 0).then(e=>e.default),"../../assets/art/ranch/horse-snowy-bare.webp":()=>h(()=>Promise.resolve().then(()=>kM),void 0).then(e=>e.default),"../../assets/art/ranch/horse-snowy-saddle.webp":()=>h(()=>Promise.resolve().then(()=>vM),void 0).then(e=>e.default),"../../assets/art/ranch/horse-sunny-bare.webp":()=>h(()=>Promise.resolve().then(()=>_M),void 0).then(e=>e.default),"../../assets/art/ranch/horse-sunny-saddle.webp":()=>h(()=>Promise.resolve().then(()=>$M),void 0).then(e=>e.default),"../../assets/art/ranch/tractor.webp":()=>h(()=>Promise.resolve().then(()=>xM),void 0).then(e=>e.default),"../../assets/art/salon/hairdryer.webp":()=>h(()=>import("./hairdryer-BK3-NMh8.js"),[]).then(e=>e.default),"../../assets/art/salon/perfume.webp":()=>h(()=>import("./perfume-CCbV6-cE.js"),[]).then(e=>e.default),"../../assets/art/salon/polish.webp":()=>h(()=>import("./polish-Ch0EUf5y.js"),[]).then(e=>e.default),"../../assets/art/salon/ribbon-tray.webp":()=>h(()=>import("./ribbon-tray-DBUlSLAS.js"),[]).then(e=>e.default),"../../assets/art/salon/stool.webp":()=>h(()=>import("./stool-SBbn3Fq_.js"),[]).then(e=>e.default),"../../assets/art/salon/vanity.webp":()=>h(()=>import("./vanity-COm_EF9W.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~arched-mirror.webp":()=>h(()=>import("./pack~arched-mirror-FzcrWxa4.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~boba-cup.webp":()=>h(()=>import("./pack~boba-cup-DO0lCjCc.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~mini-fridge.webp":()=>h(()=>import("./pack~mini-fridge-DxF_-Si1.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~apple-tree.webp":()=>h(()=>import("./pack~apple-tree-BO7hFW66.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~cozy-mug.webp":()=>h(()=>import("./pack~cozy-mug-CL5TNVre.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~fire-pit.webp":()=>h(()=>import("./pack~fire-pit-CbfQWRzg.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~mini-greenhouse.webp":()=>h(()=>import("./pack~mini-greenhouse-Cgb6BHcc.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~picnic-basket.webp":()=>h(()=>import("./pack~picnic-basket-BZmSi61Z.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~sale-sign.webp":()=>h(()=>import("./pack~sale-sign-CNZEWdis.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~wh-kitchen-counter.webp":()=>h(()=>import("./pack~wh-kitchen-counter-BK3WsTw8.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~wh-teapot.webp":()=>h(()=>import("./pack~wh-teapot-C2xpf3Kz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-bauble-garland.webp":()=>h(()=>import("./pack~wc-bauble-garland-Bsv6snBW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-berry-wreath.webp":()=>h(()=>import("./pack~wc-berry-wreath-DwqWJGm0.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-birch-basket.webp":()=>h(()=>import("./pack~wc-birch-basket-Ck1MjTPW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cabin-picture.webp":()=>h(()=>import("./pack~wc-cabin-picture-Bo_qKFlZ.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-candle-trio.webp":()=>h(()=>import("./pack~wc-candle-trio-33RcvYK5.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cane-lamp.webp":()=>h(()=>import("./pack~wc-cane-lamp-BD2V2gLm.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cinnamon-tray.webp":()=>h(()=>import("./pack~wc-cinnamon-tray-Cy2cPyEY.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-cart.webp":()=>h(()=>import("./pack~wc-cocoa-cart-BwlPCBQR.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-mug.webp":()=>h(()=>import("./pack~wc-cocoa-mug-Cpad5gyz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-pot.webp":()=>h(()=>import("./pack~wc-cocoa-pot-CqjSzuIA.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cookie-oven.webp":()=>h(()=>import("./pack~wc-cookie-oven-AeTBKAqH.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cookie-plate.webp":()=>h(()=>import("./pack~wc-cookie-plate-Db4_27lp.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-frost-bookcase.webp":()=>h(()=>import("./pack~wc-frost-bookcase-ChH_Zc5-.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-frosted-pine.webp":()=>h(()=>import("./pack~wc-frosted-pine-BaL421Eq.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-fur-bench.webp":()=>h(()=>import("./pack~wc-fur-bench-BHy7RvLc.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-gingerbread-village.webp":()=>h(()=>import("./pack~wc-gingerbread-village-CXGNXY4G.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-gingerbread.webp":()=>h(()=>import("./pack~wc-gingerbread-BH26TMqz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-globe-lamp.webp":()=>h(()=>import("./pack~wc-globe-lamp-FQWUqV9q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-holiday-tree.webp":()=>h(()=>import("./pack~wc-holiday-tree-Dc9RLa8q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-holly.webp":()=>h(()=>import("./pack~wc-holly-Ddsa-Msy.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-ice-skates.webp":()=>h(()=>import("./pack~wc-ice-skates-CerfMu-3.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-ice-wardrobe.webp":()=>h(()=>import("./pack~wc-ice-wardrobe-Dk8v_MKI.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-knit-armchair.webp":()=>h(()=>import("./pack~wc-knit-armchair-p4nAzHXW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-lantern.webp":()=>h(()=>import("./pack~wc-lantern-rRWK8g8l.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-log-bench.webp":()=>h(()=>import("./pack~wc-log-bench-Djm76jnh.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-marshmallow-jar.webp":()=>h(()=>import("./pack~wc-marshmallow-jar-BiG_u42k.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mitten-line.webp":()=>h(()=>import("./pack~wc-mitten-line-BbhTynIV.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mitten-ottoman.webp":()=>h(()=>import("./pack~wc-mitten-ottoman-q05Rsc6B.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mug-shelf.webp":()=>h(()=>import("./pack~wc-mug-shelf-CeUbCPsi.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-nutcracker.webp":()=>h(()=>import("./pack~wc-nutcracker-DlEeuUgj.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-penguin-chair.webp":()=>h(()=>import("./pack~wc-penguin-chair-ARRfWJYR.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-penguin-plush.webp":()=>h(()=>import("./pack~wc-penguin-plush-w9LiHlOM.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-peppermint-counter.webp":()=>h(()=>import("./pack~wc-peppermint-counter-Cq5SRRi_.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-peppermint-rug.webp":()=>h(()=>import("./pack~wc-peppermint-rug-DjPM1BL2.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pinecone-garland.webp":()=>h(()=>import("./pack~wc-pinecone-garland-DV4Ijs5E.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pinecone-table.webp":()=>h(()=>import("./pack~wc-pinecone-table-CzULQj_N.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-plaid-bed.webp":()=>h(()=>import("./pack~wc-plaid-bed-ZVDIbe1Y.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-plaid-sofa.webp":()=>h(()=>import("./pack~wc-plaid-sofa-BaoM0h7H.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-poinsettia.webp":()=>h(()=>import("./pack~wc-poinsettia-DNdNw7QZ.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-polar-plush.webp":()=>h(()=>import("./pack~wc-polar-plush-Cz2NxU-X.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pom-rug.webp":()=>h(()=>import("./pack~wc-pom-rug-Zyeq7bwG.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-present-stack.webp":()=>h(()=>import("./pack~wc-present-stack-B09Rx_MO.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-reindeer.webp":()=>h(()=>import("./pack~wc-reindeer-DTWaMJXV.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sled-table.webp":()=>h(()=>import("./pack~wc-sled-table-BNH48Wur.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sleigh-planter.webp":()=>h(()=>import("./pack~wc-sleigh-planter-B3DNwK0i.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-globe.webp":()=>h(()=>import("./pack~wc-snow-globe-C9bft1_W.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-mobile.webp":()=>h(()=>import("./pack~wc-snow-mobile-JM0Q-i3v.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-nightstand.webp":()=>h(()=>import("./pack~wc-snow-nightstand-Bqay9NoW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-window.webp":()=>h(()=>import("./pack~wc-snow-window-DCwNoisx.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snowman.webp":()=>h(()=>import("./pack~wc-snowman-Z8FnDuXK.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snowshoes.webp":()=>h(()=>import("./pack~wc-snowshoes-Bux5zjz7.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sock-hamper.webp":()=>h(()=>import("./pack~wc-sock-hamper-IDMi8Oc3.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-star-topper.webp":()=>h(()=>import("./pack~wc-star-topper-CxhOrJOb.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-stocking-row.webp":()=>h(()=>import("./pack~wc-stocking-row-DRCxX9NW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-stone-hearth.webp":()=>h(()=>import("./pack~wc-stone-hearth-BIaBCxMx.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-twinkle-lamp.webp":()=>h(()=>import("./pack~wc-twinkle-lamp-3aXfb0Du.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-twinkle-string.webp":()=>h(()=>import("./pack~wc-twinkle-string-D1fw8i7q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-window-seat.webp":()=>h(()=>import("./pack~wc-window-seat-bNQT817S.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-woodstove.webp":()=>h(()=>import("./pack~wc-woodstove-BcUTK7y-.js"),[]).then(e=>e.default)});function Lf(e){const t=e.split("/").pop()||"";if(t.length<6||t.slice(-5).toLowerCase()!==".webp")return null;const n=decodeURIComponent(t.slice(0,-5)).replace(/~/g,":");return!n||n.startsWith("_")?null:n}const j0=new Set;for(const e in Ur){const t=Lf(e);t&&j0.add(t)}function o4(e){return j0.has(e)}const mc=new Map;function i4(e){for(const t in Ur)if(Lf(t)===e)return Ur[t]}const a4=6e4,yc=new Map;function r4(e){const t=mc.get(e);if(t)return t;const n=yc.get(e);if(n!==void 0&&Date.now()-n<a4)return Promise.resolve(null);const s=i4(e);if(!s)return Promise.resolve(null);const o=Cs(s).then(i=>(yc.delete(e),Xk(e,i),e)).catch(()=>(mc.delete(e),yc.set(e,Date.now()),null));return mc.set(e,o),o}function Cl(e){const t=[...new Set(e)];return Promise.all(t.map(r4)).then(n=>n.filter(s=>s!==null))}function l4(){const e=[];for(const t in Ur){const n=Lf(t);n&&e.push(n)}return Cl(e)}function c4(e,t=[]){return Jk(e)?Cl(t):Promise.resolve([])}const Il=Object.freeze(Object.defineProperty({__proto__:null,boot:c4,hasArt:o4,loadAllArt:l4,loadArtKinds:Cl},Symbol.toStringTag,{value:"Module"})),Le="#5a3d5c",Ye=`stroke="${Le}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,Ga=[{body:"#ffd6e0",roof:"#ff7aa8",door:"#8fd3ff",trim:"#fff6e6"},{body:"#d9f2ff",roof:"#5aa9e6",door:"#ffd166",trim:"#ffffff"},{body:"#e3f9d9",roof:"#5cc985",door:"#ff9f68",trim:"#fffbe6"},{body:"#fff1b8",roof:"#ff9f43",door:"#c9a0dc",trim:"#ffffff"},{body:"#eadcff",roof:"#9b7bd8",door:"#80ed99",trim:"#fff6fb"},{body:"#ffe0c7",roof:"#e07a5f",door:"#5fb0d8",trim:"#fffaf0"},{body:"#d8f5ef",roof:"#2fb3a3",door:"#ff8fab",trim:"#ffffff"},{body:"#fde2f3",roof:"#e879c6",door:"#ffd166",trim:"#fff"}];function zr(e,t={}){const n=Ga[(e%Ga.length+Ga.length)%Ga.length],s=e%2===1,o=t.lit?"#fff3b0":"#cfe8ff",i=s?`<path d="M22 138 Q22 36 160 30 Q298 36 298 138 Z" fill="${n.roof}" ${Ye}/><path d="M60 110 Q70 60 120 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`:`<path d="M14 140 L160 26 L306 140 Z" fill="${n.roof}" ${Ye}/><path d="M70 110 L140 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`;return`<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="294" rx="150" ry="8" fill="#000" opacity=".12"/>
  <rect x="${s?232:220}" y="${s?36:44}" width="30" height="56" rx="6" fill="${n.trim}" ${Ye}/>
  <rect x="44" y="124" width="232" height="168" rx="20" fill="${n.body}" ${Ye}/>
  ${i}
  <g class="houseWin" fill="${o}"><circle cx="160" cy="${s?92:98}" r="18" ${Ye}/><rect x="62" y="160" width="62" height="58" rx="18" ${Ye}/><rect x="196" y="160" width="62" height="58" rx="18" ${Ye}/></g>
  <path d="M160 ${s?74:80} V${s?110:116} M142 ${s?92:98} H178" ${Ye}/>
  <path d="M93 160 V218 M62 189 H124" ${Ye}/><path d="M227 160 V218 M196 189 H258" ${Ye}/>
  <rect x="56" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${Ye}/><rect x="190" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${Ye}/>
  <circle cx="72" cy="212" r="7" fill="#ff8fab" ${Ye}/><circle cx="92" cy="208" r="7" fill="#ffd166" ${Ye}/><circle cx="112" cy="212" r="7" fill="#ff8fab" ${Ye}/>
  <circle cx="208" cy="212" r="7" fill="#c9a0dc" ${Ye}/><circle cx="228" cy="208" r="7" fill="#80ed99" ${Ye}/><circle cx="248" cy="212" r="7" fill="#c9a0dc" ${Ye}/>
  <path d="M132 292 V226 Q132 196 160 196 Q188 196 188 226 V292 Z" fill="${n.door}" ${Ye}/>
  <circle cx="176" cy="250" r="5" fill="${Le}"/><path d="M146 222 Q160 212 174 222" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>
  <rect x="118" y="286" width="84" height="10" rx="5" fill="${n.trim}" ${Ye}/>
</svg>`}const Dt={street:`<svg viewBox="0 0 48 48"><circle cx="16" cy="15" r="7" fill="#ffd166" stroke="${Le}" stroke-width="3"/><circle cx="32" cy="15" r="7" fill="#ff8fab" stroke="${Le}" stroke-width="3"/><circle cx="13.5" cy="14.5" r="1.2" fill="${Le}"/><circle cx="18.5" cy="14.5" r="1.2" fill="${Le}"/><circle cx="29.5" cy="14.5" r="1.2" fill="${Le}"/><circle cx="34.5" cy="14.5" r="1.2" fill="${Le}"/><path d="M13 18 q3 2.2 6 0 M29 18 q3 2.2 6 0" fill="none" stroke="${Le}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 40 Q16 28 24 33 Q32 38 40 28" fill="none" stroke="#5cc985" stroke-width="4" stroke-linecap="round"/><circle cx="16" cy="36" r="2.2" fill="#fff" stroke="${Le}" stroke-width="1.5"/><circle cx="32" cy="32" r="2.2" fill="#fff" stroke="${Le}" stroke-width="1.5"/></svg>`,home:`<svg viewBox="0 0 48 48"><path d="M8 22 L24 8 L40 22 V40 H8 Z" fill="#ffd166" stroke="${Le}" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 V28 H28 V40" fill="#fff" stroke="${Le}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="20" r="2.4" fill="${Le}"/></svg>`,lockOn:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q33 7 33 16 V22" fill="none" stroke="${Le}" stroke-width="4"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#ffd166" stroke="${Le}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${Le}"/></svg>`,lockOff:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q31 7 32.5 13" fill="none" stroke="${Le}" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#b6f0a8" stroke="${Le}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${Le}"/></svg>`,chat:`<svg viewBox="0 0 48 48"><path d="M8 12 Q8 6 14 6 H34 Q40 6 40 12 V26 Q40 32 34 32 H22 L13 40 V32 Q8 32 8 26 Z" fill="#fff3b0" stroke="${Le}" stroke-width="3" stroke-linejoin="round"/><circle cx="17" cy="19" r="2.5" fill="${Le}"/><circle cx="24" cy="19" r="2.5" fill="${Le}"/><circle cx="31" cy="19" r="2.5" fill="${Le}"/></svg>`,shield:`<svg viewBox="0 0 48 48"><path d="M24 5 L39 11 V23 Q39 36 24 43 Q9 36 9 23 V11 Z" fill="#c9a0dc" stroke="${Le}" stroke-width="3" stroke-linejoin="round"/><path d="M17 24 L22 29 L31 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,solo:`<svg viewBox="0 0 48 48"><path d="M8 24 L24 9 L40 24 V41 H8 Z" fill="#ffd166" stroke="${Le}" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="28" width="10" height="13" rx="4" fill="#fff" stroke="${Le}" stroke-width="2.5"/><path d="M33 7 l2 4 4 .5 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.5z" fill="#ff8fab" stroke="${Le}" stroke-width="1.5"/></svg>`};function F(e,t=2600){const n=document.createElement("div");n.className="toast",n.textContent=e,(document.getElementById("toastLane")??document.body).appendChild(n),setTimeout(()=>n.classList.add("out"),t),setTimeout(()=>n.remove(),t+400)}function F0(e){document.querySelector(".grownNotice")?.remove();const t=document.createElement("div");t.className="toast grownNotice",t.setAttribute("role","status"),t.innerHTML='<b>For grown-ups</b><span></span><button type="button">OK</button>',t.querySelector("span").textContent=e,t.querySelector("button").addEventListener("click",()=>{t.classList.add("out"),setTimeout(()=>t.remove(),400)}),(document.getElementById("toastLane")??document.body).appendChild(t)}function Z0(){return new Promise(e=>{let t=0,n=0,s="",o=0;const i=document.createElement("div");i.className="sheet adult",i.innerHTML='<div class="card adultCard"></div>',document.body.appendChild(i);const a=i.firstElementChild,r=()=>{t=6+Math.floor(Math.random()*4),n=3+Math.floor(Math.random()*7),s="",l()},l=()=>{a.innerHTML=`<button class="close" data-k="x">✕</button><h2>Grown-ups only</h2><p class="q" data-q="${t*n}">What is ${t} × ${n}?</p>
        <div class="ans">${s||"&nbsp;"}</div>
        <div class="pad">${[1,2,3,4,5,6,7,8,9,"⌫",0,"OK"].map(d=>`<button data-k="${d}">${d}</button>`).join("")}</div>`},c=d=>{i.remove(),e(d)};a.addEventListener("click",d=>{const f=d.target.closest("[data-k]")?.dataset.k;if(f){if(f==="x")return c(!1);if(f==="⌫")s=s.slice(0,-1);else if(f==="OK"){if(+s===t*n)return c(!0);if(++o>=3)return c(!1);a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400),r();return}else s.length<3&&(s+=f);l()}}),i.addEventListener("click",d=>{d.target===i&&c(!1)}),r()})}const G0=new Set,bc=new Set,Y0=[];let pu=!1;function K0(){pu||typeof document>"u"||(pu=!0,document.addEventListener("visibilitychange",()=>{if(document.hidden)for(const e of G0)e.state==="running"&&(bc.add(e),e.suspend().catch(()=>{}));else{for(const e of bc)e.resume().catch(()=>{});bc.clear();for(const e of Y0)try{e()}catch{}}}))}function Ef(e){return K0(),G0.add(e),e}function X0(e){K0(),Y0.push(e)}let En=null,Sf=!0;const d4=e=>{Sf=e};function be(e,t,n="sine",s=0,o=.15){if(Sf)try{En??=Ef(new(window.AudioContext||window.webkitAudioContext)),En.state==="suspended"&&En.resume().catch(()=>{});const i=En.createOscillator(),a=En.createGain(),r=En.currentTime,l=Math.max(40,e*(.94+Math.random()*.12));i.type=n,i.frequency.setValueAtTime(l,r),s&&i.frequency.exponentialRampToValueAtTime(Math.max(40,l*s),r+t);const c=Math.min(.02,Math.max(.008,t*.22));if(a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(Math.max(2e-4,o),r+c),a.gain.exponentialRampToValueAtTime(.001,r+Math.max(t,c+.02)),n==="square"||n==="sawtooth"){const d=En.createBiquadFilter();d.type="lowpass",d.frequency.setValueAtTime(1400,r),d.Q.setValueAtTime(.7,r),i.connect(d).connect(a).connect(En.destination)}else i.connect(a).connect(En.destination);i.start(r),i.stop(r+t+.02)}catch{}}const C={pick:()=>be(520,.12,"sine",1.6),drop:()=>{be(380,.1,"triangle",.7),setTimeout(()=>be(620,.08,"sine"),60)},pop:()=>be(800,.15,"square",.3,.08),click:()=>be(660,.07,"triangle"),swish:()=>be(300,.25,"sine",2.5,.1),meow:()=>{be(700,.12,"triangle",1.3,.1),setTimeout(()=>be(900,.22,"triangle",.6,.1),110)},purr:()=>[0,90,180,270,360].forEach(e=>setTimeout(()=>be(70,.09,"sawtooth",1,.05),e)),woof:()=>{be(260,.09,"square",.6,.09),setTimeout(()=>be(220,.12,"square",.5,.09),130)},spin:()=>be(400,.35,"sine",2.2,.08),boing:()=>be(200,.3,"sine",3,.1),splash:()=>[0,50,110].forEach((e,t)=>setTimeout(()=>be(900-t*200,.12,"triangle",.4,.06),e)),moo:()=>{be(160,.5,"sawtooth",.8,.07),setTimeout(()=>be(140,.45,"sawtooth",.85,.06),380)},baa:()=>[0,90,180].forEach(e=>setTimeout(()=>be(420,.1,"sawtooth",.95,.05),e)),bleat:()=>[0,70,140,210].forEach(e=>setTimeout(()=>be(520,.07,"square",1.05,.04),e)),oink:()=>{be(300,.12,"square",.6,.07),setTimeout(()=>be(330,.12,"square",.55,.07),160)},peep:()=>[0,120,240].forEach((e,t)=>setTimeout(()=>be(1800+t*150,.07,"sine",1.2,.08),e)),squeak:()=>be(1400,.1,"sine",1.5,.08),neigh:()=>{be(700,.5,"sawtooth",.6,.05),[0,60,120,180,240].forEach(e=>setTimeout(()=>be(620-e,.06,"triangle",1,.04),300+e))},honk:()=>{be(330,.18,"square",1,.07),setTimeout(()=>be(330,.25,"square",1,.07),230)},munch:()=>[0,110,220,330].forEach(e=>setTimeout(()=>be(180+Math.random()*60,.05,"square",.6,.05),e)),cluck:()=>[0,100,180].forEach((e,t)=>setTimeout(()=>be(600+t*80,.06,"square",.8,.05),e)),plant:()=>{be(260,.1,"triangle",.6),setTimeout(()=>be(520,.1,"sine"),90)},water:()=>[0,60,120,180,240].forEach((e,t)=>setTimeout(()=>be(1200-t*120,.08,"sine",.7,.05),e)),pickup:()=>[660,880,990].forEach((e,t)=>setTimeout(()=>be(e,.1,"triangle"),t*60)),sparkle:()=>[880,1100,1320].forEach((e,t)=>setTimeout(()=>be(e,.12),t*70))},gu=new Map;function f4(e,t){const n=(e?"s":"o")+(t?"f":"n"),s=gu.get(n);if(s)return s;const a=`<svg viewBox="0 0 200 260" aria-hidden="true">
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
  </svg>`;return gu.set(n,a),a}const Qi="#5a3d5c";function Ol(e){return e&&/^#[0-9a-fA-F]{6}$/.test(e)?e.toLowerCase():"#f1c27d"}const Ya={x:60,y:118,w:56,h:40};function h4(e,t,n){return n==="lie"&&e==="over"?null:t&&n==="lie"?{d:"M72 172 C36 200 40 228 88 220",sleeve:"M72 172 C52 186 44 196 42 204",hx:88,hy:220}:t&&n==="sit"?e==="under"?{d:"M72 172 C40 190 46 220 108 228",sleeve:"M72 172 C56 178 46 184 42 188",hx:108,hy:228}:{d:"M128 172 C154 192 150 214 118 208",sleeve:"M128 172 C142 180 148 186 150 190",hx:118,hy:208}:t?e==="under"?{d:"M72 172 C40 196 48 222 112 214",sleeve:"M72 172 C56 178 46 184 42 188",hx:112,hy:214}:{d:"M128 172 C158 180 154 200 124 196",sleeve:"M128 172 C144 178 150 184 154 188",hx:124,hy:196}:n==="lie"?{d:"M22 84 C10 112 14 136 46 130",sleeve:"",hx:46,hy:130}:e==="under"?{d:"M22 84 C14 104 12 128 44 130",sleeve:"",hx:44,hy:130}:{d:"M78 84 C90 98 86 118 64 114",sleeve:"",hx:64,hy:114}}function u4(e,t,n){const s=`M${e-8} ${t-1} Q${e-9} ${t-11} ${e} ${t-11} Q${e+9} ${t-11} ${e+9} ${t} Q${e+9} ${t+9} ${e} ${t+10} Q${e-9} ${t+9} ${e-8} ${t-1} Z`,o=`<ellipse cx="${e+8}" cy="${t-2}" rx="3.2" ry="5" fill="${n}" stroke="${Qi}" stroke-width="3.4" transform="rotate(-24 ${e+8} ${t-2})"/>`;return`<path class="cradle-hand" data-cx="${e}" data-cy="${t}" d="${s}" fill="${n}" stroke="${Qi}" stroke-width="3.9"/>${o}`}function Ea(e,t,n,s,o){const i=h4(e,t,s);if(!i)return"";const a=Ol(n),r=o&&/^#[0-9a-fA-F]{6}$/.test(o)?o.toLowerCase():"",l='fill="none" stroke-linecap="round" stroke-linejoin="round"',c=t?16:12,d=t?20.2:15.5;let f=`<path d="${i.d}" ${l} stroke="${Qi}" stroke-width="${d}"/><path d="${i.d}" ${l} stroke="${a}" stroke-width="${c}"/>`;t&&i.sleeve&&r&&(f+=`<path d="${i.sleeve}" ${l} stroke="${Qi}" stroke-width="29"/><path d="${i.sleeve}" ${l} stroke="${r}" stroke-width="22"/>`);const u=t?u4(i.hx,i.hy,a):`<circle class="cradle-hand" data-cx="${i.hx}" data-cy="${i.hy}" cx="${i.hx}" cy="${i.hy}" r="7" fill="${a}" stroke="${Qi}" stroke-width="3.5"/>`;return`<g class="arm cradle">${f}${u}</g>`}const Ka=110,bi=148,mu=80,yu=57,p4=60,g4=133,m4=42,y4=30,b4=60,w4=129,Xa=["feed","burp","change","rock"],wc=["Bean","Pip","Mochi","Bunny","Dot","Sunny"];function k4(e){let t=null,n=null,s=null,o=!1,i=Number.NaN,a=0,r=0,l=!1,c=!1;const d=typeof navigator<"u"&&!!navigator.webdriver;function f(I,B,te,U,N){I.style.left=(B-U/2)/Tt*100+"%",I.style.top=(te-N)/Wn*100+"%",I.style.width=U/Tt*100+"%",I.style.height=N/Wn*100+"%"}function u(I){const B=I.scale&&I.scale>0?I.scale:1,te=I.pose==="sit"||I.pose==="lie"?I.pose:null,U=I.chibi&&I.pose!=="sit"&&I.pose!=="lie",N=U?Ya.x:I.chibi?b4:p4,Z=U?Ya.y:I.chibi?w4:g4,pe=U?Ya.w:I.chibi?m4:mu,Te=U?Ya.h:I.chibi?y4:yu,ve=fb(N,Z,te,!!I.lieFlip,B),je=te==="lie"?ve.x:I.flip?-ve.x:ve.x,W=pe*B,z=Te*B;return{x:I.x+je,y:I.y+ve.y+z/2,w:W,h:z}}function p(I,B){let te=null,U=0;for(let N=0;N<Xa.length;N++){const Z=Xa[N],pe=I.at?.[Z]??0;pe>0&&B-pe>=0&&B-pe<1100&&pe>=U&&(te=Z,U=pe)}return te}function y(I){if(I.mood<=2||!e.canSend()){window.clearTimeout(a),i=Number.NaN;return}if(i===I.since)return;window.clearTimeout(a),i=I.since;const B=Math.max(0,I.since+sd-e.clock());a=window.setTimeout(()=>{i=Number.NaN;const te=e.get().baby;!te||te.mood<=2||!e.canSend()||e.dispatch({type:"baby/ease",now:e.clock()})},B)}function m(I,B){window.clearTimeout(r);let te=0;for(let U=0;U<Xa.length;U++){const N=I.at?.[Xa[U]]??0;B-N>=0&&B-N<1100&&N>te&&(te=N)}te&&(r=window.setTimeout(()=>Ie(),Math.max(0,1100-(B-te))))}function k(I,B){if(typeof document.elementsFromPoint!="function")return null;const te=document.elementsFromPoint(I,B),U=e.get(),N=U.rooms[U.currentRoom]?.items??[];for(let Z=0;Z<te.length;Z++){const pe=te[Z];if(!pe||typeof pe.closest!="function"||pe.closest(".baby, .babyCare, .babyMeet"))continue;const Te=pe.closest(".item");if(!Te)continue;const ve=Te.dataset.id||"";for(let je=0;je<N.length;je++){const W=N[je];if(W.id===ve&&(ho(W.kind)||e.box(W)))return W}}return null}function b(I){I.addEventListener("pointerdown",B=>{if(B.button!==0)return;const te=e.get().baby;if(!te)return;if(B.preventDefault(),B.stopPropagation(),te.spot==="arms"&&te.holder&&te.holder!==e.holderId()&&e.holderHere(te.holder)){F("Someone is cuddling!");return}if(!e.editable()){e.locked();return}if(!e.canSend())return;const U=e.owner(),N=U,Z=B.clientX,pe=B.clientY,Te=B.pointerId;let ve=!1;const je=z=>{if(z.pointerId!==Te||(Math.hypot(z.clientX-Z,z.clientY-pe)>6&&(ve=!0),!N||!ve))return;o=!0;const st=e.toRoom(z.clientX,z.clientY);f(I,st.x,st.y,Ka,bi)},W=z=>{if(z.pointerId!==Te)return;window.removeEventListener("pointermove",je),window.removeEventListener("pointerup",W),window.removeEventListener("pointercancel",W);const st=o&&ve&&N;if(o=!1,z.type==="pointercancel"){Ie();return}if(st){const vt=document.elementFromPoint(z.clientX,z.clientY)?.closest(".tab[data-room]");if(vt&&vt.dataset.room){const ui=vt.dataset.room,N2=e.toRoom(z.clientX,z.clientY),Rh=Hb(N2.x,Tt);ui!==e.get().currentRoom&&e.dispatch({type:"room/switch",room:ui}),e.dispatch({type:"baby/place",room:ui,x:Rh.x,y:Rh.y,spot:"mat",bed:null,seat:null,now:e.clock()}),C.drop();return}const Ws=e.toRoom(z.clientX,z.clientY),hn=k(z.clientX,z.clientY),ic=hn?e.box(hn):null,Vs=Db({mode:e.play()?"play":"decorate",releaseX:Math.max(0,Math.min(Tt,Ws.x)),releaseY:Math.max(0,Math.min(Wn,Ws.y)),piece:ic,occupied:e.occupied()});e.dispatch({type:"baby/place",room:e.get().currentRoom,x:Vs.x,y:Vs.y,spot:Vs.spot,bed:Vs.bed,seat:Vs.seat,now:e.clock()}),C.drop();return}if(ve){Ie();return}const ut=e.get().baby;if(!ut)return;if(ut.spot==="arms"&&ut.holder===e.holderId()){const vt=e.toRoom(z.clientX,z.clientY);e.dispatch({type:"baby/hold",holder:null,room:e.get().currentRoom,x:Math.max(0,Math.min(Tt,vt.x)),y:Math.max(40,Math.min(Wn,vt.y)),now:e.clock()}),C.drop();return}const Fe=e.holderSpot(),He=Fe?u(Fe):null,Pe=He?He.x:ut.x,kt=He?Math.max(40,He.y):ut.y;e.dispatch({type:"baby/hold",holder:e.holderId(),room:e.get().currentRoom,x:Pe,y:kt,now:e.clock()}),C.pick()};window.addEventListener("pointermove",je),window.addEventListener("pointerup",W),window.addEventListener("pointercancel",W)})}function g(){return t&&t.isConnected||(t=document.createElement("div"),t.className="baby",t.dataset.baby="1",t.innerHTML='<div class="hit"></div><div class="babySpin"><div class="babyRock"><div class="babyInner"></div></div></div><div class="babyZzz" hidden>z z z</div><div class="babyBurp" hidden><i></i></div>',e.layer.appendChild(t),b(t)),t}function w(I,B){const te=I.querySelector(".babyWord");te&&(te.textContent=Eb(B));const U=I.querySelectorAll(".babyBlossom"),N=Sb(B);for(let pe=0;pe<U.length;pe++)U[pe].classList.toggle("on",pe<N);const Z=I.querySelector(".babyMeter");Z&&(Z.dataset.mood=String(B))}function _(I){const B=D0(I);if(!B){F("Try another name!");return}const te=e.get().baby;!te||te.name===B||(e.dispatch({type:"baby/name",name:B}),C.click())}function P(I){n=document.createElement("div"),n.className="babyCare",n.dataset.babyCare="1";const B=[];for(let N=0;N<5;N++)B.push('<i class="babyBlossom"></i>');const te=[];for(let N=0;N<wc.length;N++)te.push(`<button type="button" data-preset="${wc[N]}">${wc[N]}</button>`);n.innerHTML=`<p class="babyWord"></p><span class="babyMeter"><span class="babyBlossoms">${B.join("")}</span></span>
      <button type="button" data-care="feed">Bottle</button>
      <button type="button" data-care="burp">Burp</button>
      <button type="button" data-care="change">Diaper</button>
      <button type="button" data-care="rock">Rock</button>
      <button type="button" data-baby-name-open>Name</button>
      <div class="babyNames" hidden>
        <input type="text" maxlength="14" autocomplete="off" enterkeyhint="done" aria-label="Baby name" value="">
        ${te.join("")}
      </div>`,w(n,I.mood),n.addEventListener("pointerdown",N=>N.stopPropagation()),n.addEventListener("click",N=>{const Z=N.target,pe=Z.closest("[data-care]");if(pe&&pe.dataset.care){if(!e.editable()){e.locked();return}if(!e.canSend())return;const ve=pe.dataset.care;e.dispatch({type:"baby/care",care:ve,now:e.clock()}),ve==="rock"?C.purr():ve==="feed"?C.sparkle():C.click();return}if(Z.closest("[data-baby-name-open]")){if(!e.owner())return;c=!c;const ve=n?.querySelector(".babyNames");ve&&(ve.hidden=!c);const je=n?.querySelector("input");c&&je&&(je.value=e.get().baby?.name??"",je.focus());return}const Te=Z.closest("[data-preset]");if(Te&&e.owner()){_(Te.dataset.preset||"");return}}),n.querySelector("input")?.addEventListener("keydown",N=>{N.key==="Enter"&&(N.preventDefault(),_(N.target.value))}),e.stageWrap.appendChild(n)}function $(I,B){if(!e.play()){x();return}const te=n&&document.activeElement&&n.contains(document.activeElement);if((!n||!n.isConnected)&&P(I),!n)return;n.hidden=!1,w(n,I.mood);const U=n.querySelector("[data-baby-name-open]");U&&(U.hidden=!B);const N=n.querySelector(".babyNames");N&&(N.hidden=!B||!c);const Z=n.querySelector("input");Z&&!te&&(Z.value=I.name),H()}function x(){c=!1,n&&(n.remove(),n=null),H()}function H(){const I=!!(n&&n.isConnected&&!n.hidden),B=document.body.classList.contains("baby-card");document.body.classList.toggle("baby-card",I),B!==I&&window.dispatchEvent(new Event("resize"))}function V(I){if(!I||d){s&&(s.remove(),s=null);return}if(s&&s.isConnected){s.hidden=!1;return}s=document.createElement("button"),s.type="button",s.className="babyMeet",s.textContent="Meet the baby",s.addEventListener("pointerdown",B=>B.stopPropagation()),s.addEventListener("click",()=>{if(!e.editable()){e.locked();return}!e.canSend()||e.get().baby||(e.dispatch({type:"baby/meet",now:e.clock()}),C.sparkle())}),e.stageWrap.appendChild(s)}function Q(){const I=e.get().rooms.nursery?.items??[];for(let B=0;B<I.length;B++)if(ho(I[B].kind)==="crib")return!0;return!1}function q(I,B){I.classList.remove("baby-lie","baby-lie-r","baby-cradle","cradle-lie","flipped");const te=e.get().currentRoom;if((B.spot==="crib"||B.spot==="bassinet")&&B.bed){const U=e.get().rooms[B.room]?.items.find(Z=>Z.id===B.bed)??null,N=U?e.box(U):null;if(U&&N){const Z=w0(U.kind,N);f(I,Z.x,Z.y+bi/2,Ka,bi),I.style.zIndex=String(1e3+U.z+1),I.classList.add("baby-lie"),U.flip&&I.classList.add("baby-lie-r");return}}if(B.spot==="arms"){const U=B.holder?e.holderSpot(B.holder):null,N=U?u(U):null,Z=N?N.x:B.x,pe=N?N.y:B.y,Te=N?N.w:mu,ve=N?N.h:yu;f(I,Z,pe,Te,ve),I.style.zIndex=String(5e3+Math.round(U?U.y:B.y)+2),I.classList.add("baby-cradle"),I.style.setProperty("--spin-w",(ve/Te*100).toFixed(4)+"%"),I.style.setProperty("--spin-h",(Te/ve*100).toFixed(4)+"%"),U&&U.pose==="lie"&&I.classList.add("cradle-lie"),U&&(U.pose==="lie"?U.lieFlip:U.flip)&&I.classList.add("flipped");return}if(B.spot==="mat"&&B.seat){const U=e.seatAt(te,B.seat,B);f(I,U.x,U.y,Ka,bi);const N=e.get().rooms[te]?.items.find(Z=>Z.id===B.seat?.item);I.style.zIndex=String(1e3+(N?.z??0)+1),B.seat.pose==="lie"&&(I.classList.add("baby-lie"),N?.flip&&I.classList.add("baby-lie-r"));return}f(I,B.x,B.y,Ka,bi),I.style.zIndex=String(5e3+Math.round(B.y))}function se(I){if(I.spot!=="arms"||!I.holder)return!1;const B=e.get().characters.find(te=>te.id===I.holder);return!!B&&B.room!==I.room}function Me(I){o||!se(I)||!e.canSend()||!e.editable()||e.dispatch({type:"baby/hold",holder:null,room:I.room,x:I.x,y:oi,now:e.clock()})}function Ke(I){if(o||se(I)||I.spot!=="arms"||I.holder!==e.holderId()||!e.canSend()||!e.editable())return;const B=e.holderSpot();if(!B)return;const te=e.get().currentRoom;if(I.room===te)return;const U=u(B);e.dispatch({type:"baby/hold",holder:I.holder,room:te,x:U.x,y:Math.max(40,U.y),now:e.clock()})}function Ie(){const I=e.get(),B=I.baby,te=!!B&&B.spot==="arms"&&!!B.holder&&!!e.holderSpot(B.holder),U=!!B&&B.spot==="arms"&&B.holder===e.holderId()&&!!e.holderSpot(),N=!!(B&&e.inHouse()&&(B.room===I.currentRoom||te||U));if(!B||!N){t&&(t.remove(),t=null),o=!1,x(),window.clearTimeout(a),i=Number.NaN;const Pe=!d&&!B&&e.inHouse()&&e.owner()&&e.editable()&&e.canSend()&&I.currentRoom==="nursery"&&Q();V(Pe);return}V(!1),Zn()&&!Gn("baby")&&!l&&(l=!0,Cl(["baby"]).then(()=>Ie()));const Z=g(),pe=e.clock(),Te=p(B,pe),ve=Te==="rock",je=Te==="change",W=!ve&&!je&&Zn()?Gn("baby"):"",z=Z.querySelector(".babyInner"),st=(W||"svg")+(ve?"s":"")+(je?"f":"");z&&Z.dataset.look!==st&&(z.innerHTML=W?`<img class="artimg" alt="" draggable="false" src="${W}">`:f4(ve,je),Z.dataset.look=st),Z.dataset.babySpot=B.spot,Z.dataset.babyMood=String(B.mood),Z.dataset.babyName=B.name,Z.classList.toggle("is-feed",Te==="feed"),Z.classList.toggle("is-burp",Te==="burp"),Z.classList.toggle("is-change",Te==="change"),Z.classList.toggle("is-rock",Te==="rock");const ut=Z.querySelector(".babyZzz"),Fe=Z.querySelector(".babyBurp"),He=(B.spot==="crib"||B.spot==="bassinet")&&!Te;ut&&(ut.hidden=!He),Fe&&(Fe.hidden=Te!=="burp"),o&&Z.isConnected||q(Z,B),$(B,e.owner()),y(B),m(B,pe),Me(B),Ke(B)}return{render:Ie}}const v4={hip:0,head:3,armL:26,armR:-22,legL:-76,legR:76,legLLift:8,legRLift:8},_4={hip:0,head:-8,armL:18,armR:-12,legL:-4,legR:6,legLLift:0,legRLift:0};function Bl(e){return e==="sit"?v4:e==="lie"?_4:null}const tt="#5a3d5c",le=(e=4)=>`stroke="${tt}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Tf=600,en=250,qs=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})">
  <rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${le()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${le()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${le()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${le()}/>
  <circle cx="-18" cy="-78" r="9" fill="#fff" opacity=".35"/></g>`,$4=(e,t,n)=>`<g transform="translate(${e} ${t})"><path d="M0 0 V-16" ${le(3)}/>${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*6}" cy="${-20+Math.sin(s*Math.PI/180)*6}" r="5" fill="${n}" ${le(2)}/>`).join("")}<circle cx="0" cy="-20" r="4" fill="#ffd166" ${le(2)}/></g>`,bu=e=>`<g transform="translate(${e} 0)">
  <rect x="-80" y="452" width="160" height="12" rx="6" fill="#ff9f68" ${le()}/><rect x="-80" y="470" width="160" height="12" rx="6" fill="#ff9f68" ${le()}/>
  <rect x="-70" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${le(3)}/><rect x="60" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${le(3)}/>
  <rect x="-86" y="490" width="172" height="14" rx="7" fill="#ffb385" ${le()}/></g>`;function x4(){const e=xf,t=Array.from({length:Math.floor((gt.x1-gt.x0+40)/34)},(n,s)=>`<path d="M${gt.x0-20+s*34} 470 V428 l8 -10 l8 10 V470 Z" fill="#fff6e6" ${le(3)}/>`).join("");return`<svg class="parkScene" viewBox="0 0 ${e} ${Tf}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient>
  <pattern id="pkCheck" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><rect width="15" height="15" fill="#ff8fab"/><rect x="15" y="15" width="15" height="15" fill="#ff8fab"/></pattern></defs>
  <rect width="${e}" height="440" fill="url(#pkSky)"/>
  ${[180,900,1600,2300].map((n,s)=>`<g transform="translate(${n} ${70+s%2*30})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <circle cx="${e-220}" cy="90" r="46" fill="#ffe066" ${le(4)}/>
  <path d="M-50 360 Q500 220 1100 340 T2300 330 T${e+100} 350 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#9fe0aa"/><path d="M0 410 H${e}" ${le(4)}/>
  <path d="M0 560 Q700 520 1400 565 T${e} 545 V600 H0 Z" fill="#f6e3c3" opacity=".9"/>
  ${qs(260,390,.9)}${qs(720,380,1.05,"#4fbf7a")}${qs(1230,385,.8)}${qs(1640,380,1,"#4fbf7a")}${qs(1990,388,.85)}${qs(2380,380,.95)}${qs(2860,390,.9,"#4fbf7a")}
  ${[[300,470,"#ff8fab"],[690,455,"#c9a0dc"],[1210,470,"#ffd166"],[1960,450,"#8ecae6"],[2390,470,"#ff8fab"],[1580,590,"#c9a0dc"],[140,585,"#ffd166"]].map(([n,s,o])=>$4(+n,+s,String(o))).join("")}
  <!-- gate back to the street -->
  <g><rect x="40" y="300" width="22" height="200" rx="6" fill="#c99366" ${le()}/><rect x="168" y="300" width="22" height="200" rx="6" fill="#c99366" ${le()}/>
    <path d="M30 312 Q115 240 200 312" fill="none" stroke="${tt}" stroke-width="16" stroke-linecap="round"/><path d="M30 312 Q115 240 200 312" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
    <rect x="62" y="252" width="106" height="36" rx="12" fill="#fff6e6" ${le(3)}/><text x="115" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="${tt}" font-family="Nunito, system-ui, sans-serif">PARK</text></g>
  <!-- swing set (seats are separate so they can swing) -->
  <g><path d="M350 ${en} L310 500 M350 ${en} L390 500 M650 ${en} L610 500 M650 ${en} L690 500" stroke="${tt}" stroke-width="14" stroke-linecap="round"/>
    <path d="M350 ${en} L310 500 M350 ${en} L390 500 M650 ${en} L610 500 M650 ${en} L690 500" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/>
    <rect x="330" y="${en-10}" width="340" height="20" rx="10" fill="#ff8fab" ${le()}/></g>
  <!-- slide -->
  <g><path d="M${we.ladder-20} 560 V${we.top.y} M${we.ladder+30} 560 V${we.top.y}" stroke="${tt}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${we.ladder-20} 560 V${we.top.y} M${we.ladder+30} 560 V${we.top.y}" stroke="#c9a0dc" stroke-width="6" stroke-linecap="round"/>
    ${[380,420,460,500,540].map(n=>`<path d="M${we.ladder-20} ${n} H${we.ladder+30}" ${le(5)}/>`).join("")}
    <rect x="${we.ladder-30}" y="${we.top.y-14}" width="100" height="18" rx="8" fill="#ffd166" ${le()}/>
    <path d="M${we.ladder+60} ${we.top.y-10} C 1000 ${we.top.y} 1010 520 ${we.bottom.x+40} 548 L${we.bottom.x+40} 572 C 990 548 975 ${we.top.y+30} ${we.ladder+60} ${we.top.y+14} Z" fill="#ffd166" ${le()}/>
    <path d="M${we.ladder+70} ${we.top.y-2} C 990 ${we.top.y+8} 1000 525 ${we.bottom.x+30} 552" fill="none" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/></g>
  <!-- splash pond -->
  <g class="pondArt"><ellipse cx="1420" cy="515" rx="185" ry="52" fill="#8ecae6" ${le()}/><ellipse cx="1420" cy="510" rx="150" ry="36" fill="#b5e3f5"/>
    <ellipse cx="1340" cy="520" rx="24" ry="9" fill="#80ed99" ${le(3)}/><ellipse cx="1500" cy="505" rx="20" ry="8" fill="#80ed99" ${le(3)}/>
    <g transform="translate(1440 500)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ffd166" ${le(3)}/><circle cx="16" cy="-12" r="9" fill="#ffd166" ${le(3)}/><path d="M24 -12 l8 2 l-8 3 z" fill="#ff9f68" ${le(2)}/><circle cx="18" cy="-14" r="1.8" fill="${tt}"/></g></g>
  <!-- picnic blanket -->
  <g><path d="M1670 530 L1910 530 L1940 580 L1640 580 Z" fill="url(#pkCheck)" ${le()}/>
    <g transform="translate(1915 520)"><rect x="-26" y="-20" width="52" height="32" rx="8" fill="#e6b88a" ${le(3)}/><path d="M-18 -20 Q0 -46 18 -20" fill="none" ${le(4)}/><circle cx="-10" cy="-24" r="7" fill="#ff6b6b" ${le(2)}/></g></g>
  ${bu(2065)}${bu(2265)}
  <!-- dog area -->
  <g>${t}<path d="M${gt.x0-20} 440 H${gt.x1+20}" ${le(3)}/>
    <g transform="translate(${gt.x0+10} 380)"><rect x="-6" y="0" width="12" height="70" fill="#c99366" ${le(3)}/><rect x="-55" y="-34" width="110" height="38" rx="10" fill="#fff6e6" ${le(3)}/>
      <text x="0" y="-8" text-anchor="middle" font-size="20" font-weight="900" fill="${tt}" font-family="Nunito, system-ui, sans-serif">DOGS 🐾</text></g>
    <g transform="translate(${gt.x1-30} 470)"><path d="M-50 0 V-60 L0 -100 L50 -60 V0 Z" fill="#ff8fab" ${le()}/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="${tt}" stroke-width="14" stroke-linecap="round"/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="#c9a0dc" stroke-width="8" stroke-linecap="round"/><path d="M-20 0 V-30 a20 20 0 0 1 40 0 V0 Z" fill="#5a3d5c"/></g>
    <g transform="translate(${gt.x0+120} 500)"><rect x="-12" y="-30" width="24" height="34" rx="8" fill="#ff6b6b" ${le(3)}/><rect x="-18" y="-18" width="36" height="8" rx="4" fill="#ff6b6b" ${le(3)}/><circle cx="0" cy="-32" r="10" fill="#ff6b6b" ${le(3)}/></g></g>
  </svg>`}const M4=`<svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M10 0 V222 M50 0 V222" stroke="${tt}" stroke-width="4"/><rect x="0" y="216" width="60" height="14" rx="6" fill="#ff9f68" ${le(3)}/></svg>`,L4=`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffd166" ${le(3)}/><path d="M6 16 Q20 24 34 16 M8 27 Q20 19 32 27" fill="none" stroke="#fff" stroke-width="3"/></svg>`,E4=`<svg viewBox="0 0 48 48"><rect x="20" y="28" width="8" height="14" rx="3" fill="#c99366" stroke="${tt}" stroke-width="3"/><circle cx="24" cy="20" r="13" fill="#5cc985" stroke="${tt}" stroke-width="3"/><circle cx="19" cy="16" r="3" fill="#fff" opacity=".5"/></svg>`,J0=`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8" fill="#ff8fab" stroke="${tt}" stroke-width="3"/><circle cx="13" cy="20" r="4.5" fill="#ff8fab" stroke="${tt}" stroke-width="3"/><circle cx="20" cy="13" r="4.5" fill="#ff8fab" stroke="${tt}" stroke-width="3"/><circle cx="28" cy="13" r="4.5" fill="#ff8fab" stroke="${tt}" stroke-width="3"/><circle cx="35" cy="20" r="4.5" fill="#ff8fab" stroke="${tt}" stroke-width="3"/></svg>`,S4=`<svg viewBox="0 0 48 48"><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="${tt}" stroke-width="4" stroke-linecap="round"/><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="#ff9f68" stroke-width="2"/><path d="M16 40 V26 M24 40 V22 M32 40 V26" stroke="${tt}" stroke-width="3" stroke-linecap="round"/></svg>`,eg="/kids-house-game/assets/_pop~cada-mouse-DI1-rdPA.webp",T4=Object.freeze(Object.defineProperty({__proto__:null,default:eg},Symbol.toStringTag,{value:"Module"})),tg="/kids-house-game/assets/_pop~quinn-pup-BNjRkBlA.webp",P4=Object.freeze(Object.defineProperty({__proto__:null,default:tg},Symbol.toStringTag,{value:"Module"})),ng="/kids-house-game/assets/_pop~sloane-snail-B9PsYK5P.webp",A4=Object.freeze(Object.defineProperty({__proto__:null,default:ng},Symbol.toStringTag,{value:"Module"})),nn="#5a3d5c",Ee=`stroke="${nn}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Ja='<ellipse cx="50" cy="97" rx="34" ry="3" fill="#000" opacity=".12"/>',R4=`<svg viewBox="0 0 40 30"><path d="M4 30 V16 Q4 2 20 2 Q36 2 36 16 V30 Z" fill="#3b2a3d" ${Ee}/><circle cx="14" cy="18" r="1.6" fill="#fff" opacity=".8"/><circle cx="22" cy="18" r="1.6" fill="#fff" opacity=".8"/></svg>`,C4=`<svg viewBox="0 0 48 30"><path d="M4 27 Q10 22 22 23 L42 23 Q46 27 42 28 H6 Z" fill="#cdeccf" ${Ee}/><circle cx="26" cy="15" r="11" fill="#ffb3c6" ${Ee}/><path d="M26 15 m-5 0 a5 5 0 1 1 5 5" fill="none" ${Ee}/><path d="M8 23 L5 13 M12 23 L12 13" ${Ee}/></svg>`,I4=`<svg viewBox="0 0 30 30"><path d="M15 2 l3.6 8 8.4 1 -6.3 5.8 1.8 8.4 -7.5 -4.4 -7.5 4.4 1.8 -8.4 L3 11 l8.4 -1z" fill="#fff3b0" ${Ee}/></svg>`,O4=`<svg viewBox="0 0 30 22"><ellipse cx="15" cy="13" rx="13" ry="8" fill="#e6b88a" ${Ee}/><circle cx="10" cy="11" r="1.8" fill="${nn}"/><circle cx="18" cy="14" r="1.8" fill="${nn}"/><circle cx="16" cy="9" r="1.5" fill="${nn}"/></svg>`,B4=`<svg viewBox="0 0 30 28"><path d="M15 26 C3 18 1 10 6 5 C10 1 14 4 15 7 C16 4 20 1 24 5 C29 10 27 18 15 26 Z" fill="#ffc8dd" ${Ee}/></svg>`,Qr=[{name:"Cada",room:"living",x:150,y:382,w:40,h:30,taps:3,spot:R4,hello:"Squeak! Hi Cada!",item:{kind:"egg:cada-mouse",name:"Cada's Mouse",cat:"secrets",w:80,holdable:!0,svg:`${Ja}<path d="M78 74 Q96 68 92 52" stroke="#ff9bb5" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="28" ry="18" fill="#d6d6e8" ${Ee}/><circle cx="28" cy="40" r="13" fill="#d6d6e8" ${Ee}/><circle cx="62" cy="38" r="13" fill="#d6d6e8" ${Ee}/><circle cx="28" cy="40" r="7" fill="#ffc8dd"/><circle cx="62" cy="38" r="7" fill="#ffc8dd"/><circle cx="45" cy="56" r="20" fill="#e4e4f2" ${Ee}/><text x="50" y="96" font-size="11" font-weight="900" text-anchor="middle" fill="${nn}">C</text>`}},{name:"Sloane",room:"living",x:2290,y:383,w:48,h:30,taps:3,spot:C4,hello:"Hi Sloane! ✨",item:{kind:"egg:sloane-snail",name:"Sloane's Rainbow Snail",cat:"secrets",w:110,holdable:!0,svg:`${Ja}<path d="M6 92 Q14 80 36 82 L84 82 Q94 90 84 94 H10 Z" fill="#cdeccf" ${Ee}/><circle cx="56" cy="52" r="32" fill="#ff8fab" ${Ee}/><circle cx="56" cy="52" r="24" fill="#ffd166"/><circle cx="56" cy="52" r="17" fill="#80ed99"/><circle cx="56" cy="52" r="10" fill="#8ecae6"/><circle cx="56" cy="52" r="4" fill="#c9a0dc"/><circle cx="56" cy="52" r="32" fill="none" ${Ee}/><path d="M14 82 L8 60 M24 82 L24 60" ${Ee}/><circle cx="8" cy="58" r="4" fill="${nn}"/><circle cx="24" cy="58" r="4" fill="${nn}"/>`}},{name:"Chloe",room:"bedroom",x:2230,y:92,w:30,h:30,taps:5,spot:I4,item:{kind:"egg:chloe-starlamp",name:"Chloe's Star Lamp",cat:"secrets",w:100,holdable:!0,svg:`${Ja}<circle cx="50" cy="38" r="34" fill="#fff3b0" opacity=".6"/><path d="M50 6 l8 17 19 2.5 -14 13 4 19 -17 -9.5 -17 9.5 4 -19 -14 -13 19 -2.5z" fill="#ffd166" ${Ee}/><rect x="46" y="66" width="8" height="22" rx="4" fill="#c9a0dc" ${Ee}/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#b388d6" ${Ee}/><text x="50" y="93" font-size="8" font-weight="900" text-anchor="middle" fill="#fff">CHLOE</text>`}},{name:"Quinn",room:"kitchen",x:80,y:588,w:30,h:22,taps:4,spot:O4,hello:"Woof! Hi Quinn!",item:{kind:"egg:quinn-pup",name:"Quinn's Cookie Pup",cat:"secrets",w:110,holdable:!0,svg:`${Ja}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#e6b88a" ${Ee}/><circle cx="50" cy="44" r="27" fill="#f2d0a4" ${Ee}/><ellipse cx="24" cy="46" rx="10" ry="17" fill="#b07d54" ${Ee}/><ellipse cx="76" cy="46" rx="10" ry="17" fill="#b07d54" ${Ee}/><circle cx="84" cy="80" r="10" fill="#e6b88a" ${Ee}/><circle cx="81" cy="78" r="1.8" fill="${nn}"/><circle cx="87" cy="82" r="1.8" fill="${nn}"/><text x="50" y="30" font-size="10" font-weight="900" text-anchor="middle" fill="${nn}">Q</text>`}},{name:"Reagan",room:"salon",x:2300,y:352,w:30,h:28,taps:5,spot:B4,item:{kind:"egg:reagan-frame",name:"Reagan's Frame",cat:"secrets",w:120,wall:!0,svg:`<rect x="8" y="10" width="84" height="84" rx="16" fill="#ff8fab" ${Ee}/><rect x="18" y="20" width="64" height="64" rx="10" fill="#fff3f7" ${Ee}/><text x="50" y="72" font-size="52" font-weight="900" text-anchor="middle" fill="#e879c6" stroke="${nn}" stroke-width="2.5">R</text><circle cx="14" cy="16" r="6" fill="#ffd166" ${Ee}/><circle cx="86" cy="88" r="6" fill="#ffd166" ${Ee}/><path d="M76 24 l2 4 4 .5 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.5z" fill="#ffd166"/>`}}],D4=Qr.map(e=>({...e.item,rooms:["any"],secret:e.name})),sg=wt("cozy-secrets"),Dl=()=>{try{return new Set(JSON.parse(localStorage.getItem(sg)??"[]"))}catch{return new Set}},H4=e=>{try{localStorage.setItem(sg,JSON.stringify([...e]))}catch{}};function W4(e){const t=document.createElement("div");t.className="eggs",e.world.appendChild(t);const n=new Map;for(const o of Qr){const i=document.createElement("div");i.className="eggspot",i.dataset.egg=o.name,i.style.left=(o.x-o.w/2)/e.roomW*100+"%",i.style.top=(o.y-o.h)/e.roomH*100+"%",i.style.width=o.w/e.roomW*100+"%",i.style.height=o.h/e.roomH*100+"%",i.innerHTML=o.spot,t.appendChild(i),i.addEventListener("pointerdown",a=>a.stopPropagation()),i.addEventListener("click",a=>{a.stopPropagation();const r=Date.now(),l=n.get(o.name)??{n:0,t:0};if(l.n=r-l.t<1500?l.n+1:1,l.t=r,n.set(o.name,l),i.classList.remove("poke"),i.offsetWidth,i.classList.add("poke"),e.tap(),l.n<o.taps)return;l.n=0;const c=Dl(),d=!c.has(o.name);c.add(o.name),H4(c),V4(o,i),e.sparkle(),e.onFound(o.name,d)})}const s=()=>{const o=e.currentRoom();t.querySelectorAll(".eggspot").forEach(i=>{i.style.display=Qr.find(a=>a.name===i.dataset.egg).room===o?"":"none"})};return s(),{update:s}}const wu=Object.assign({"../assets/art/living/_pop~cada-mouse.webp":eg,"../assets/art/living/_pop~quinn-pup.webp":tg,"../assets/art/living/_pop~sloane-snail.webp":ng}),og={};for(const e in wu)og["egg:"+e.split("_pop~").pop().slice(0,-5)]=wu[e];function V4(e,t){if(e.hello){const s=document.createElement("div");s.className="eggpop";const o=Mf()?og[e.item.kind]:void 0;if(s.innerHTML=`<div class="eggcritter"><svg viewBox="0 0 100 100">${e.item.svg}</svg></div><div class="bubble">${e.hello}</div>`,o){const i=s.querySelector(".eggcritter"),a=i.innerHTML,r=new Image;r.alt="",r.className="eggpic",r.onerror=()=>{i.innerHTML=a},r.src=o,i.replaceChildren(r)}t.appendChild(s),setTimeout(()=>s.remove(),3200)}const n=document.createElement("div");n.className="eggbanner",n.innerHTML=`<span class="sp">✨</span><span class="nm">${[...e.name].map((s,o)=>`<i style="animation-delay:${o*70}ms">${s}</i>`).join("")}</span><span class="sp">✨</span>`,document.body.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3100),ig()}function ig(e=70){const t=["#ff8fab","#ffd166","#8ecae6","#80ed99","#c9a0dc","#ff9f68"],n=document.createElement("div");n.className="confetti",document.body.appendChild(n);for(let s=0;s<e;s++){const o=document.createElement("i");o.style.left=Math.random()*100+"vw",o.style.background=t[s%t.length],o.style.animationDelay=Math.random()*.5+"s",o.style.animationDuration=1.6+Math.random()*1.2+"s",o.style.setProperty("--r",Math.random()*720-360+"deg"),o.style.setProperty("--dx",Math.random()*160-80+"px"),s%3===0&&(o.style.borderRadius="50%"),n.appendChild(o)}setTimeout(()=>n.remove(),3600)}const U4=`[
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
`,z4=`[
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
`,Q4="/kids-house-game/assets/alarm-clock-BCd1-e86.svg",N4="/kids-house-game/assets/bedtime-snack-BoNDQqOK.svg",q4="/kids-house-game/assets/book-stack-upnp1NwG.svg",j4="/kids-house-game/assets/bunk-bed-YZiRWNFR.svg",F4="/kids-house-game/assets/bunny-slippers-PNucIc_Q.svg",Z4="/kids-house-game/assets/canopy-bed-BwWkRhe2.svg",G4="/kids-house-game/assets/cat-bed-B8ULFbHc.svg",Y4="/kids-house-game/assets/cloud-rug-CFl6aZc5.svg",K4="/kids-house-game/assets/cloud-shelf-DF5b_IoZ.svg",X4="/kids-house-game/assets/cork-board-Bj5OuLbv.svg",J4="/kids-house-game/assets/daisy-pot-Cy8SrSS6.svg",e6="/kids-house-game/assets/desk-2rRtV3Vk.svg",t6="/kids-house-game/assets/dino-plush-Dq_qccf0.svg",n6="/kids-house-game/assets/doll-house-BrC3RiST.svg",s6="/kids-house-game/assets/dresser-__9TGuYc.svg",o6="/kids-house-game/assets/egg-chair-CtiaqWNQ.svg",i6="/kids-house-game/assets/floor-fan-Dt9SIAmB.svg",a6="/kids-house-game/assets/guinea-pig-CwLeNU_S.svg",r6="/kids-house-game/assets/hamster-cage-lQ6r7saV.svg",l6="/kids-house-game/assets/heart-rug-CBDvH6Q6.svg",c6="/kids-house-game/assets/lava-lamp-DEuHvlco.svg",d6="/kids-house-game/assets/moon-night-light-CAKsjYZv.svg",f6="/kids-house-game/assets/nightstand-Bgsh0YUi.svg",h6="/kids-house-game/assets/paper-lantern-CErOGyrT.svg",u6="/kids-house-game/assets/piggy-bank-DsHrmOcp.svg",p6="/kids-house-game/assets/plant-stand-DDyIDaL0.svg",g6="/kids-house-game/assets/play-tent-Bsawe52j.svg",m6="/kids-house-game/assets/star-mobile-DzOGs-Jo.svg",y6="/kids-house-game/assets/toy-chest-6iPrDiZH.svg",b6="/kids-house-game/assets/toy-robot-OaCEwmDT.svg",w6="/kids-house-game/assets/toy-train-D5GqAnpy.svg",k6="/kids-house-game/assets/unicorn-plush-C0W1eEs9.svg",v6="/kids-house-game/assets/wardrobe-Dn492IK0.svg",_6="/kids-house-game/assets/bananas-aPQwdEVo.svg",$6="/kids-house-game/assets/bar-stool-DWxhX1Ah.svg",x6="/kids-house-game/assets/bread-loaf-C9cEAYcl.svg",M6="/kids-house-game/assets/chick-BTEVfgqU.svg",L6="/kids-house-game/assets/china-hutch-BTmMY6rg.svg",E6="/kids-house-game/assets/cocoa-mug-CraNCc9b.svg",S6="/kids-house-game/assets/cookie-jar-ripj0oyT.svg",T6="/kids-house-game/assets/cooking-pot-BWtfOm9f.svg",P6="/kids-house-game/assets/cupcake-DFCw42xb.svg",A6="/kids-house-game/assets/dish-rack-BpVmmU6k.svg",R6="/kids-house-game/assets/fruit-bowl-Dw9lsB3B.svg",C6="/kids-house-game/assets/frying-pan-CTBY6MC_.svg",I6="/kids-house-game/assets/happy-fridge-D7ENuEJs.svg",O6="/kids-house-game/assets/herb-box-CdRxefnV.svg",B6="/kids-house-game/assets/high-chair-BQtLYlq4.svg",D6="/kids-house-game/assets/ice-cream-DydSyNXx.svg",H6="/kids-house-game/assets/kettle-D1nuAiG_.svg",W6="/kids-house-game/assets/kitchen-counter-C8sTAZ-V.svg",V6="/kids-house-game/assets/kitchen-sink-CYjDcd1n.svg",U6="/kids-house-game/assets/lemon-tree-CZz-Vy3P.svg",z6="/kids-house-game/assets/microwave-lopm-FCT.svg",Q6="/kids-house-game/assets/milk-bottle-DxcUA6XT.svg",N6="/kids-house-game/assets/pancakes-CLqxnc5R.svg",q6="/kids-house-game/assets/pantry-shelf-Azdxpmzd.svg",j6="/kids-house-game/assets/pendant-lamp-fZv6y1p0.svg",F6="/kids-house-game/assets/pet-bowl-ETL_EOAP.svg",Z6="/kids-house-game/assets/rice-cooker-JX0L4bi2.svg",G6="/kids-house-game/assets/runner-rug-BbUgZFy4.svg",Y6="/kids-house-game/assets/spice-rack-D9kAw-vT.svg",K6="/kids-house-game/assets/stand-mixer-CZrLn00l.svg",X6="/kids-house-game/assets/teapot-CtPOJzEm.svg",J6="/kids-house-game/assets/toaster-CNk0hJDw.svg",ev="/kids-house-game/assets/utensil-rail-B0QkGP3A.svg",tv="/kids-house-game/assets/watermelon-slice-VzvgalD5.svg",nv="/kids-house-game/assets/aquarium-BlhJ9UCr.svg",sv="/kids-house-game/assets/arc-floor-lamp-DL5cEVzq.svg",ov="/kids-house-game/assets/bean-bag-CauyDuZQ.svg",iv="/kids-house-game/assets/bird-cage-xqeVahX7.svg",av="/kids-house-game/assets/blanket-basket-B4LREUo9.svg",rv="/kids-house-game/assets/building-blocks-DbtoodPT.svg",lv="/kids-house-game/assets/coffee-table-ZYO2ApH6.svg",cv="/kids-house-game/assets/comfy-armchair-tjNYbfgO.svg",dv="/kids-house-game/assets/cubby-shelf-CLzTUpiz.svg",fv="/kids-house-game/assets/daisy-rug-CvOlxjsu.svg",hv="/kids-house-game/assets/fiddle-leaf-fig-DiUNW4Q_.svg",uv="/kids-house-game/assets/fireplace-CqxIMN3Z.svg",pv="/kids-house-game/assets/globe-DN0sih3W.svg",gv="/kids-house-game/assets/hanging-planter-M9IHqztp.svg",mv="/kids-house-game/assets/monstera-plant-CLmuB_RM.svg",yv="/kids-house-game/assets/piano-Y0KQ4rD2.svg",bv="/kids-house-game/assets/popcorn-BD2d8sUH.svg",wv="/kids-house-game/assets/pouf-as0li8On.svg",kv="/kids-house-game/assets/rainbow-rug-C5ZVauOA.svg",vv="/kids-house-game/assets/rainbow-wall-art-CCXUPPen.svg",_v="/kids-house-game/assets/retro-radio-B3T98xMQ.svg",$v="/kids-house-game/assets/rocking-chair-BgoIQu5H.svg",xv="/kids-house-game/assets/rocking-horse-1WLLV43R.svg",Mv="/kids-house-game/assets/snake-plant-BGDwPcMj.svg",Lv="/kids-house-game/assets/string-lights-DGC0Ni2I.svg",Ev="/kids-house-game/assets/succulent-trio-uPD-ljlL.svg",Sv="/kids-house-game/assets/tassel-rug-DolXtxfQ.svg",Tv="/kids-house-game/assets/throw-pillow-qWyWQ9cT.svg",Pv="/kids-house-game/assets/toy-car-CTJy5H4V.svg",Av="/kids-house-game/assets/tulip-vase-o2vjI1Hg.svg",Rv="/kids-house-game/assets/turtle-B9Y6NDSv.svg",Cv="/kids-house-game/assets/tv-stand-CcLHFc1J.svg",Iv="/kids-house-game/assets/wall-shelf-CCWuZ6Xl.svg",Ov="/kids-house-game/assets/cc-bakery-shelf-BxdhLTTC.svg",Bv="/kids-house-game/assets/cc-breakfast-table-DwaO0eFy.svg",Dv="/kids-house-game/assets/cc-bubble-chair-DncHA7F-.svg",Hv="/kids-house-game/assets/cc-canopy-daybed-CVbt6QDr.svg",Wv="/kids-house-game/assets/cc-cloud-beanbag-SM0m-3qY.svg",Vv="/kids-house-game/assets/cc-cloud-lamp-BWwxoCux.svg",Uv="/kids-house-game/assets/cc-cottage-aquarium-iY2D26Vq.svg",zv="/kids-house-game/assets/cc-cupcake-stand-B08kdXZL.svg",Qv="/kids-house-game/assets/cc-dryer-chair-DQmosxUz.svg",Nv="/kids-house-game/assets/cc-fairy-garland-BncKvkRL.svg",qv="/kids-house-game/assets/cc-fairy-shelf-CE6x7J1w.svg",jv="/kids-house-game/assets/cc-flower-kettle-ZTbAh26L.svg",Fv="/kids-house-game/assets/cc-flower-lamp-CS2T2S89.svg",Zv="/kids-house-game/assets/cc-heart-bed-76-z9nJg.svg",Gv="/kids-house-game/assets/cc-heart-clock-ByixSFru.svg",Yv="/kids-house-game/assets/cc-heart-pouf-DH5J2s2J.svg",Kv="/kids-house-game/assets/cc-heart-rug-Jwmh-m0j.svg",Xv="/kids-house-game/assets/cc-jewel-box-qMbIQmo4.svg",Jv="/kids-house-game/assets/cc-light-vanity-DD4uQJ_7.svg",e_="/kids-house-game/assets/cc-macaron-jar-A0sT-Lvj.svg",t_="/kids-house-game/assets/cc-macrame-swing-qIcoPp0o.svg",n_="/kids-house-game/assets/cc-mani-chair-7AWb60tv.svg",s_="/kids-house-game/assets/cc-mint-fridge-Cc87e_gW.svg",o_="/kids-house-game/assets/cc-mushroom-stool-B9-y9WNf.svg",i_="/kids-house-game/assets/cc-pastel-range-D6cjzJTl.svg",a_="/kids-house-game/assets/cc-perfume-tray-DN4chcIn.svg",r_="/kids-house-game/assets/cc-petal-table-QrNho7KH.svg",l_="/kids-house-game/assets/cc-plant-wall-BMii8_kR.svg",c_="/kids-house-game/assets/cc-reading-nook-wiDgasP8.svg",d_="/kids-house-game/assets/cc-record-player-BoxZhHLy.svg",f_="/kids-house-game/assets/cc-ribbon-mirror-DiCje_iy.svg",h_="/kids-house-game/assets/cc-scallop-curtains-Bzhy2peV.svg",u_="/kids-house-game/assets/cc-scallop-loveseat-Dfi7dg3b.svg",p_="/kids-house-game/assets/cc-star-dresser-2wqSnsip.svg",g_="/kids-house-game/assets/cc-teapot-set-DnZlJvn7.svg",m_="/kids-house-game/assets/cc-window-seat-BCOise4Z.svg",y_="/kids-house-game/assets/arched-shelf-XtiqRVaT.svg",b_="/kids-house-game/assets/blob-rug-Deh5k10s.svg",w_="/kids-house-game/assets/bubbly-plant-CFTOJd5Y.svg",k_="/kids-house-game/assets/bud-vase-Dup4WQ5y.svg",v_="/kids-house-game/assets/comb-brush-oPJeQv0v.svg",__="/kids-house-game/assets/cream-jars-D6bxrnJR.svg",$_="/kids-house-game/assets/drop-lamp-CJg63ZKz.svg",x_="/kids-house-game/assets/droplet-buddy-DTpHggFh.svg",M_="/kids-house-game/assets/fancy-sofa-kq2L0ob5.svg",L_="/kids-house-game/assets/flower-cart-BWgfg0s_.svg",E_="/kids-house-game/assets/foot-spa-DdA5_fj_.svg",S_="/kids-house-game/assets/globe-pendants-DNV5WnAO.svg",T_="/kids-house-game/assets/glow-mirror-C_dTGwQc.svg",P_="/kids-house-game/assets/gold-floor-mirror-jfPQepmr.svg",A_="/kids-house-game/assets/hair-dryer-CAkhCf7J.svg",R_="/kids-house-game/assets/heart-plant-fSU4uLVy.svg",C_="/kids-house-game/assets/heart-pouf-BMVPBVKJ.svg",I_="/kids-house-game/assets/lilac-curtain-D_mFsZKu.svg",O_="/kids-house-game/assets/lotion-trio-D3lKwvho.svg",B_="/kids-house-game/assets/mani-lamp-B4SmvhvS.svg",D_="/kids-house-game/assets/nail-table-C3FitmuG.svg",H_="/kids-house-game/assets/pebble-rug-DHBZUggl.svg",W_="/kids-house-game/assets/perfume-bottle-BcNXSWTW.svg",V_="/kids-house-game/assets/pink-fountain-DQ3CIetr.svg",U_="/kids-house-game/assets/pink-vanity-qE3SwdD6.svg",z_="/kids-house-game/assets/polish-bottle-VWed8EQ-.svg",Q_="/kids-house-game/assets/polish-rack-8Ph2n2nM.svg",N_="/kids-house-game/assets/reception-desk-D4Gevx64.svg",q_="/kids-house-game/assets/salon-chair-Wj2sOSW8.svg",j_="/kids-house-game/assets/scent-candle-BEUE-6Uv.svg",F_="/kids-house-game/assets/spray-bottle-Bc8iuceJ.svg",Z_="/kids-house-game/assets/star-wall-sign-DvenTqvU.svg",G_="/kids-house-game/assets/swivel-stool-P-Egqq_Z.svg",Y_="/kids-house-game/assets/tiered-tray-DLnZTsUF.svg",K_="/kids-house-game/assets/towel-cart-DJmR97UL.svg",X_="/kids-house-game/assets/towel-stack-C1qplZ4T.svg",J_="/kids-house-game/assets/vine-planter-Duhx9OMZ.svg",e8="/kids-house-game/assets/waiting-bench-BQuoXbE3.svg",t8="/kids-house-game/assets/wash-chair-sdgNnj79.svg",n8="/kids-house-game/assets/hw-candy-bowl-CD02D5Zj.webp",s8="/kids-house-game/assets/hw-cat-statue-DeCc_3q0.webp",o8="/kids-house-game/assets/hw-cauldron-Dct8_uZ8.webp",i8="/kids-house-game/assets/hw-ghost-sheet-kZF5Oxdt.webp",a8="/kids-house-game/assets/hw-hay-bale-BqFYl-D_.webp",r8="/kids-house-game/assets/hw-heart-pumpkin-B-0-0OAK.webp",l8="/kids-house-game/assets/hw-leaf-garland-DN-y_jMP.webp",c8="/kids-house-game/assets/hw-moon-cling-p5ei0N89.webp",d8="/kids-house-game/assets/hw-moon-lantern-ByPteKOL.webp",f8="/kids-house-game/assets/hw-star-pumpkin-Bxq_OX8C.webp",h8="/kids-house-game/assets/hw-witch-hat-BmuOG13B.webp",u8="/kids-house-game/assets/arched-mirror-ClJgTBd9.svg",p8="/kids-house-game/assets/big-monitor-jx5PnUa_.svg",g8="/kids-house-game/assets/boba-cup-CwUerXNm.svg",m8="/kids-house-game/assets/bubble-bath-8VwrkImA.svg",y8="/kids-house-game/assets/cactus-buddy-D3uacuVA.svg",b8="/kids-house-game/assets/caterpillar-plush-BhR8Pydf.svg",w8="/kids-house-game/assets/checker-bed-mtuxfPje.svg",k8="/kids-house-game/assets/checker-rug-CmSO3Y4j.svg",v8="/kids-house-game/assets/clothes-rail-BY-f9coz.svg",_8="/kids-house-game/assets/cloud-sofa-CZS1Y5s-.svg",$8="/kids-house-game/assets/cube-shelf-DoI0tLGL.svg",x8="/kids-house-game/assets/curvy-desk-eWCvec1f.svg",M8="/kids-house-game/assets/cute-speaker-DrVF9uns.svg",L8="/kids-house-game/assets/desk-lamp-C-VtrE1V.svg",E8="/kids-house-game/assets/desk-mic-BqYzh6ma.svg",S8="/kids-house-game/assets/flower-lamp-Dpz6tQ2x.svg",T8="/kids-house-game/assets/frog-plush-BhkTrE24.svg",P8="/kids-house-game/assets/game-controller-6gvwykQG.svg",A8="/kids-house-game/assets/gaming-chair-BCyGMzy0.svg",R8="/kids-house-game/assets/hamster-pet-LBcghoJj.svg",C8="/kids-house-game/assets/headphones-Cjjqt_92.svg",I8="/kids-house-game/assets/heart-light-DfDwRHju.svg",O8="/kids-house-game/assets/keyboard-Cbtwvtj1.svg",B8="/kids-house-game/assets/mini-fridge-qdNm4NKf.svg",D8="/kids-house-game/assets/pastel-wardrobe-BubkWAN2.svg",H8="/kids-house-game/assets/phone-stand-VLW-DsK-.svg",W8="/kids-house-game/assets/pothos-plant-C1I15M9a.svg",V8="/kids-house-game/assets/puffy-stool-CwjoblCa.svg",U8="/kids-house-game/assets/ring-light-CdxNAXA6.svg",z8="/kids-house-game/assets/side-table-round-rCsBU0YO.svg",Q8="/kids-house-game/assets/star-lamp-CHKQnzvB.svg",N8="/kids-house-game/assets/sticker-board-LUm1_I_P.svg",q8="/kids-house-game/assets/sunny-art-C25M7k02.svg",j8="/kids-house-game/assets/sv-bean-bag-DdsCYd4e.svg",F8="/kids-house-game/assets/sv-cloud-rug-BvczSj77.svg",Z8="/kids-house-game/assets/sv-wall-shelf-BtJLzNMg.svg",G8="/kids-house-game/assets/vlog-camera-CBd28A7P.svg",Y8="/kids-house-game/assets/wavy-floor-lamp-Iy8llzr8.svg",K8="/kids-house-game/assets/acorn-friend-BsLiZ2Z_.svg",X8="/kids-house-game/assets/apple-tree-DGIUIjY1.svg",J8="/kids-house-game/assets/big-wardrobe-BnfnkPXl.svg",e$="/kids-house-game/assets/box-stack-ji13G2mP.svg",t$="/kids-house-game/assets/brick-fireplace-BGCbiSK5.svg",n$="/kids-house-game/assets/bulletin-board-DqA69wQH.svg",s$="/kids-house-game/assets/cozy-mug-CFJEPRKb.svg",o$="/kids-house-game/assets/cream-sofa-CB4EWIDp.svg",i$="/kids-house-game/assets/fire-pit-DTyRokIj.svg",a$="/kids-house-game/assets/glass-cabinet-BCHExP4F.svg",r$="/kids-house-game/assets/hanging-lantern-DZbXB8L1.svg",l$="/kids-house-game/assets/knit-cushion-DUewI6rR.svg",c$="/kids-house-game/assets/ladder-shelf-DXYDmQiE.svg",d$="/kids-house-game/assets/landscape-art-CdCqCPL2.svg",f$="/kids-house-game/assets/lattice-bench-D3zCZTQp.svg",h$="/kids-house-game/assets/leaf-wreath-DUjq1MWh.svg",u$="/kids-house-game/assets/mini-greenhouse-CGE5F9A_.svg",p$="/kids-house-game/assets/moving-box-CZXbXcJO.svg",g$="/kids-house-game/assets/picnic-basket-D72DCNRY.svg",m$="/kids-house-game/assets/round-rug-D8ePosbv.svg",y$="/kids-house-game/assets/sale-sign-CXWpgQt5.svg",b$="/kids-house-game/assets/sprout-pot-BbXk09mS.svg",w$="/kids-house-game/assets/stripe-runner-ClycKEW5.svg",k$="/kids-house-game/assets/trailing-plant-NbG7dy8O.svg",v$="/kids-house-game/assets/wall-clock-CDC1o6eG.svg",_$="/kids-house-game/assets/wh-arc-floor-lamp-BKVes2Fd.svg",$$="/kids-house-game/assets/wh-book-stack-DjDFey2h.svg",x$="/kids-house-game/assets/wh-dresser-Y-jnNt5q.svg",M$="/kids-house-game/assets/wh-fiddle-leaf-fig-B0-kGmHI.svg",L$="/kids-house-game/assets/wh-kitchen-counter-BtBenu6u.svg",E$="/kids-house-game/assets/wh-nightstand-DPUoV5aO.svg",S$="/kids-house-game/assets/wh-pendant-lamp-DBg4p7hi.svg",T$="/kids-house-game/assets/wh-snake-plant-Cj3bHF25.svg",P$="/kids-house-game/assets/wh-string-lights-C3JVBkgW.svg",A$="/kids-house-game/assets/wh-teapot-kevlW5hN.svg",R$="/kids-house-game/assets/wood-armchair-DNVhKBWe.svg",C$="/kids-house-game/assets/wood-bookshelf-CvT7GAuI.svg",I$="/kids-house-game/assets/wood-coffee-table-CuAR_7Kr.svg",O$="/kids-house-game/assets/wood-desk-DPCJq_XQ.svg",B$="/kids-house-game/assets/wood-stool-CV7YeZwC.svg",D$="/kids-house-game/assets/wooden-bed-Qj-sf8yq.svg",H$="/kids-house-game/assets/wc-bauble-garland-PlBim-j0.webp",W$="/kids-house-game/assets/wc-berry-wreath-BtfH1PGe.webp",V$="/kids-house-game/assets/wc-birch-basket-vRxqyB3J.webp",U$="/kids-house-game/assets/wc-cabin-picture-B-lavF1R.webp",z$="/kids-house-game/assets/wc-candle-trio-CjQ7YYcj.webp",Q$="/kids-house-game/assets/wc-cane-lamp-OhwvqNa-.webp",N$="/kids-house-game/assets/wc-cinnamon-tray-CxLrtplK.webp",q$="/kids-house-game/assets/wc-cocoa-cart-BkMzGgs0.webp",j$="/kids-house-game/assets/wc-cocoa-mug-qa2xzTYd.webp",F$="/kids-house-game/assets/wc-cocoa-pot-bLgiaNKD.webp",Z$="/kids-house-game/assets/wc-cookie-oven-D2Ud1EPt.webp",G$="/kids-house-game/assets/wc-cookie-plate-RhDZYroJ.webp",Y$="/kids-house-game/assets/wc-frost-bookcase-BMd6DAXH.webp",K$="/kids-house-game/assets/wc-frosted-pine-BupMG4GK.webp",X$="/kids-house-game/assets/wc-fur-bench-B1nXjHAR.webp",J$="/kids-house-game/assets/wc-gingerbread-village-8pOXPPCY.webp",e3="/kids-house-game/assets/wc-gingerbread-PGlclkJ_.webp",t3="/kids-house-game/assets/wc-globe-lamp-DUCVl_3A.webp",n3="/kids-house-game/assets/wc-holiday-tree-CO0SBlqY.webp",s3="/kids-house-game/assets/wc-holly-CD8teo0a.webp",o3="/kids-house-game/assets/wc-ice-skates-D49y8YK1.webp",i3="/kids-house-game/assets/wc-ice-wardrobe-Dliflqpp.webp",a3="/kids-house-game/assets/wc-knit-armchair-84rhSw_8.webp",r3="/kids-house-game/assets/wc-lantern-81B3e5fN.webp",l3="/kids-house-game/assets/wc-log-bench-qQ1zT34_.webp",c3="/kids-house-game/assets/wc-marshmallow-jar-DeWRr-zf.webp",d3="/kids-house-game/assets/wc-mitten-line-sg-sweCl.webp",f3="/kids-house-game/assets/wc-mitten-ottoman-H5qkjso6.webp",h3="/kids-house-game/assets/wc-mug-shelf-DlWrwZYo.webp",u3="/kids-house-game/assets/wc-nutcracker-BGZe5tYy.webp",p3="/kids-house-game/assets/wc-penguin-chair-CDM1eIxo.webp",g3="/kids-house-game/assets/wc-penguin-plush-C8B27KcB.webp",m3="/kids-house-game/assets/wc-peppermint-counter-CPl6TA0h.webp",y3="/kids-house-game/assets/wc-peppermint-rug-3nakY_gB.webp",b3="/kids-house-game/assets/wc-pinecone-garland-s7ZWASw2.webp",w3="/kids-house-game/assets/wc-pinecone-table-DlJvjB-2.webp",k3="/kids-house-game/assets/wc-plaid-bed-eAhWKZdO.webp",v3="/kids-house-game/assets/wc-plaid-sofa-kvF30vEn.webp",_3="/kids-house-game/assets/wc-poinsettia-C-S-MDMu.webp",$3="/kids-house-game/assets/wc-polar-plush-BUVRTt7t.webp",x3="/kids-house-game/assets/wc-pom-rug-B-JF-heA.webp",M3="/kids-house-game/assets/wc-present-stack-Do2pEHLF.webp",L3="/kids-house-game/assets/wc-reindeer-CbKEp6CE.webp",E3="/kids-house-game/assets/wc-sled-table-Bd2cST9J.webp",S3="/kids-house-game/assets/wc-sleigh-planter-Bfcxvgbk.webp",T3="/kids-house-game/assets/wc-snow-globe-BcGMsnmh.webp",P3="/kids-house-game/assets/wc-snow-mobile-F06-kuT7.webp",A3="/kids-house-game/assets/wc-snow-nightstand-D6RhLncP.webp",R3="/kids-house-game/assets/wc-snow-window-dOxdYTSk.webp",C3="/kids-house-game/assets/wc-snowman-gxLBKnIO.webp",I3="/kids-house-game/assets/wc-snowshoes-CZcMT0Qx.webp",O3="/kids-house-game/assets/wc-sock-hamper-mesU3CG3.webp",B3="/kids-house-game/assets/wc-star-topper-c4tXfpV6.webp",D3="/kids-house-game/assets/wc-stocking-row-Dz0-4wTi.webp",H3="/kids-house-game/assets/wc-stone-hearth-1blXXfiH.webp",W3="/kids-house-game/assets/wc-twinkle-lamp-CYcQjW3A.webp",V3="/kids-house-game/assets/wc-twinkle-string-Olg29poj.webp",U3="/kids-house-game/assets/wc-window-seat-B7CwlRjl.webp",z3="/kids-house-game/assets/wc-woodstove-Cf0xJFnD.webp",Q3="/kids-house-game/assets/cc-butter-polka-CmiHLPHI.svg",N3="/kids-house-game/assets/cc-cream-hex-Bkf3o84Z.svg",q3="/kids-house-game/assets/cc-lavender-lattice-DhxILx5n.svg",j3="/kids-house-game/assets/cc-lilac-gingham-C-WPjvD8.svg",F3="/kids-house-game/assets/cc-mint-checks-BKmyOLlr.svg",Z3="/kids-house-game/assets/cc-mint-florals-Dz8qRBHw.svg",G3="/kids-house-game/assets/cc-peach-scallops-GPn_mXbS.svg",Y3="/kids-house-game/assets/cc-pink-plaid-VgppBwax.svg",K3="/kids-house-game/assets/cc-rag-planks-C5Hombhc.svg",X3="/kids-house-game/assets/cc-rose-herringbone-CQRix6_f.svg",J3="/kids-house-game/assets/lilac-stripes-yb9DhjTf.svg",ex="/kids-house-game/assets/lilac-terrazzo-8CaN2qhK.svg",tx="/kids-house-game/assets/mint-bubbles-BIQM5a2P.svg",nx="/kids-house-game/assets/pink-check-floor-Cy9k3Fal.svg",sx="/kids-house-game/assets/pink-hearts-BpVCT-98.svg",ox="/kids-house-game/assets/cloud-sky-CbZL0zcC.svg",ix="/kids-house-game/assets/pastel-planks-BAcEss7w.svg",ax="/kids-house-game/assets/soft-carpet-BSwTSDW1.svg",rx="/kids-house-game/assets/star-sprinkle-5bH7qjW0.svg",lx="/kids-house-game/assets/tiny-hearts-C-RHlg1h.svg",cx="/kids-house-game/assets/butter-check-floor-C8HdmZ0P.svg",dx="/kids-house-game/assets/mint-checks-rWbOdhfH.svg",fx="/kids-house-game/assets/sky-clouds-DUJlygwI.svg",hx="/kids-house-game/assets/sky-tiles-xxuodD5m.svg",ux="/kids-house-game/assets/sunny-stars-C6fsFX70.svg",px="/kids-house-game/assets/leafy-cream-WIcyLI1T.svg",gx="/kids-house-game/assets/orange-gingham-CVNizWBt.svg",mx="/kids-house-game/assets/terracotta-tiles-j3yOSRI7.svg",yx="/kids-house-game/assets/wood-panel-Dob8WRpW.svg",bx="/kids-house-game/assets/wood-planks-4TUYjAkF.svg",wx="/kids-house-game/assets/wc-cabin-planks-Icu9n6YO.webp",kx="/kids-house-game/assets/wc-candy-stripe-cOBsT1Xj.webp",vx="/kids-house-game/assets/wc-frosty-dots-DmQgGwJW.webp",_x="/kids-house-game/assets/wc-mint-pine-5FYK_dVo.webp",$x="/kids-house-game/assets/wc-peppermint-tiles-ChaNg2gF.webp",xx="/kids-house-game/assets/wc-red-plaid-CcQ3BMhN.webp",Mx="/kids-house-game/assets/wc-snow-knit-DEFXSv74.webp",Lx="/kids-house-game/assets/wc-snowflake-sky-DrRAdoDP.webp",ku={small:80,medium:150,large:260},Ex={"welcome-home":"Welcome Home","sunny-vibes":"Sunny Vibes",glossy:"Glossy",cottage:"Cozy Cottage",...yw,...vw},ag=e=>Ex[e]??e.replace(/[-_]+/g," ").replace(/\b\w/g,t=>t.toUpperCase()),Sx=Object.assign({"../assets/items/manifest.json":U4,"../assets/patterns/manifest.json":z4}),vu=Object.assign({"../assets/items/bedroom/alarm-clock.svg":Q4,"../assets/items/bedroom/bedtime-snack.svg":N4,"../assets/items/bedroom/book-stack.svg":q4,"../assets/items/bedroom/bunk-bed.svg":j4,"../assets/items/bedroom/bunny-slippers.svg":F4,"../assets/items/bedroom/canopy-bed.svg":Z4,"../assets/items/bedroom/cat-bed.svg":G4,"../assets/items/bedroom/cloud-rug.svg":Y4,"../assets/items/bedroom/cloud-shelf.svg":K4,"../assets/items/bedroom/cork-board.svg":X4,"../assets/items/bedroom/daisy-pot.svg":J4,"../assets/items/bedroom/desk.svg":e6,"../assets/items/bedroom/dino-plush.svg":t6,"../assets/items/bedroom/doll-house.svg":n6,"../assets/items/bedroom/dresser.svg":s6,"../assets/items/bedroom/egg-chair.svg":o6,"../assets/items/bedroom/floor-fan.svg":i6,"../assets/items/bedroom/guinea-pig.svg":a6,"../assets/items/bedroom/hamster-cage.svg":r6,"../assets/items/bedroom/heart-rug.svg":l6,"../assets/items/bedroom/lava-lamp.svg":c6,"../assets/items/bedroom/moon-night-light.svg":d6,"../assets/items/bedroom/nightstand.svg":f6,"../assets/items/bedroom/paper-lantern.svg":h6,"../assets/items/bedroom/piggy-bank.svg":u6,"../assets/items/bedroom/plant-stand.svg":p6,"../assets/items/bedroom/play-tent.svg":g6,"../assets/items/bedroom/star-mobile.svg":m6,"../assets/items/bedroom/toy-chest.svg":y6,"../assets/items/bedroom/toy-robot.svg":b6,"../assets/items/bedroom/toy-train.svg":w6,"../assets/items/bedroom/unicorn-plush.svg":k6,"../assets/items/bedroom/wardrobe.svg":v6,"../assets/items/kitchen/bananas.svg":_6,"../assets/items/kitchen/bar-stool.svg":$6,"../assets/items/kitchen/bread-loaf.svg":x6,"../assets/items/kitchen/chick.svg":M6,"../assets/items/kitchen/china-hutch.svg":L6,"../assets/items/kitchen/cocoa-mug.svg":E6,"../assets/items/kitchen/cookie-jar.svg":S6,"../assets/items/kitchen/cooking-pot.svg":T6,"../assets/items/kitchen/cupcake.svg":P6,"../assets/items/kitchen/dish-rack.svg":A6,"../assets/items/kitchen/fruit-bowl.svg":R6,"../assets/items/kitchen/frying-pan.svg":C6,"../assets/items/kitchen/happy-fridge.svg":I6,"../assets/items/kitchen/herb-box.svg":O6,"../assets/items/kitchen/high-chair.svg":B6,"../assets/items/kitchen/ice-cream.svg":D6,"../assets/items/kitchen/kettle.svg":H6,"../assets/items/kitchen/kitchen-counter.svg":W6,"../assets/items/kitchen/kitchen-sink.svg":V6,"../assets/items/kitchen/lemon-tree.svg":U6,"../assets/items/kitchen/microwave.svg":z6,"../assets/items/kitchen/milk-bottle.svg":Q6,"../assets/items/kitchen/pancakes.svg":N6,"../assets/items/kitchen/pantry-shelf.svg":q6,"../assets/items/kitchen/pendant-lamp.svg":j6,"../assets/items/kitchen/pet-bowl.svg":F6,"../assets/items/kitchen/rice-cooker.svg":Z6,"../assets/items/kitchen/runner-rug.svg":G6,"../assets/items/kitchen/spice-rack.svg":Y6,"../assets/items/kitchen/stand-mixer.svg":K6,"../assets/items/kitchen/teapot.svg":X6,"../assets/items/kitchen/toaster.svg":J6,"../assets/items/kitchen/utensil-rail.svg":ev,"../assets/items/kitchen/watermelon-slice.svg":tv,"../assets/items/living/aquarium.svg":nv,"../assets/items/living/arc-floor-lamp.svg":sv,"../assets/items/living/bean-bag.svg":ov,"../assets/items/living/bird-cage.svg":iv,"../assets/items/living/blanket-basket.svg":av,"../assets/items/living/building-blocks.svg":rv,"../assets/items/living/coffee-table.svg":lv,"../assets/items/living/comfy-armchair.svg":cv,"../assets/items/living/cubby-shelf.svg":dv,"../assets/items/living/daisy-rug.svg":fv,"../assets/items/living/fiddle-leaf-fig.svg":hv,"../assets/items/living/fireplace.svg":uv,"../assets/items/living/globe.svg":pv,"../assets/items/living/hanging-planter.svg":gv,"../assets/items/living/monstera-plant.svg":mv,"../assets/items/living/piano.svg":yv,"../assets/items/living/popcorn.svg":bv,"../assets/items/living/pouf.svg":wv,"../assets/items/living/rainbow-rug.svg":kv,"../assets/items/living/rainbow-wall-art.svg":vv,"../assets/items/living/retro-radio.svg":_v,"../assets/items/living/rocking-chair.svg":$v,"../assets/items/living/rocking-horse.svg":xv,"../assets/items/living/snake-plant.svg":Mv,"../assets/items/living/string-lights.svg":Lv,"../assets/items/living/succulent-trio.svg":Ev,"../assets/items/living/tassel-rug.svg":Sv,"../assets/items/living/throw-pillow.svg":Tv,"../assets/items/living/toy-car.svg":Pv,"../assets/items/living/tulip-vase.svg":Av,"../assets/items/living/turtle.svg":Rv,"../assets/items/living/tv-stand.svg":Cv,"../assets/items/living/wall-shelf.svg":Iv,"../assets/items/packs/cottage/cc-bakery-shelf.svg":Ov,"../assets/items/packs/cottage/cc-breakfast-table.svg":Bv,"../assets/items/packs/cottage/cc-bubble-chair.svg":Dv,"../assets/items/packs/cottage/cc-canopy-daybed.svg":Hv,"../assets/items/packs/cottage/cc-cloud-beanbag.svg":Wv,"../assets/items/packs/cottage/cc-cloud-lamp.svg":Vv,"../assets/items/packs/cottage/cc-cottage-aquarium.svg":Uv,"../assets/items/packs/cottage/cc-cupcake-stand.svg":zv,"../assets/items/packs/cottage/cc-dryer-chair.svg":Qv,"../assets/items/packs/cottage/cc-fairy-garland.svg":Nv,"../assets/items/packs/cottage/cc-fairy-shelf.svg":qv,"../assets/items/packs/cottage/cc-flower-kettle.svg":jv,"../assets/items/packs/cottage/cc-flower-lamp.svg":Fv,"../assets/items/packs/cottage/cc-heart-bed.svg":Zv,"../assets/items/packs/cottage/cc-heart-clock.svg":Gv,"../assets/items/packs/cottage/cc-heart-pouf.svg":Yv,"../assets/items/packs/cottage/cc-heart-rug.svg":Kv,"../assets/items/packs/cottage/cc-jewel-box.svg":Xv,"../assets/items/packs/cottage/cc-light-vanity.svg":Jv,"../assets/items/packs/cottage/cc-macaron-jar.svg":e_,"../assets/items/packs/cottage/cc-macrame-swing.svg":t_,"../assets/items/packs/cottage/cc-mani-chair.svg":n_,"../assets/items/packs/cottage/cc-mint-fridge.svg":s_,"../assets/items/packs/cottage/cc-mushroom-stool.svg":o_,"../assets/items/packs/cottage/cc-pastel-range.svg":i_,"../assets/items/packs/cottage/cc-perfume-tray.svg":a_,"../assets/items/packs/cottage/cc-petal-table.svg":r_,"../assets/items/packs/cottage/cc-plant-wall.svg":l_,"../assets/items/packs/cottage/cc-reading-nook.svg":c_,"../assets/items/packs/cottage/cc-record-player.svg":d_,"../assets/items/packs/cottage/cc-ribbon-mirror.svg":f_,"../assets/items/packs/cottage/cc-scallop-curtains.svg":h_,"../assets/items/packs/cottage/cc-scallop-loveseat.svg":u_,"../assets/items/packs/cottage/cc-star-dresser.svg":p_,"../assets/items/packs/cottage/cc-teapot-set.svg":g_,"../assets/items/packs/cottage/cc-window-seat.svg":m_,"../assets/items/packs/glossy/arched-shelf.svg":y_,"../assets/items/packs/glossy/blob-rug.svg":b_,"../assets/items/packs/glossy/bubbly-plant.svg":w_,"../assets/items/packs/glossy/bud-vase.svg":k_,"../assets/items/packs/glossy/comb-brush.svg":v_,"../assets/items/packs/glossy/cream-jars.svg":__,"../assets/items/packs/glossy/drop-lamp.svg":$_,"../assets/items/packs/glossy/droplet-buddy.svg":x_,"../assets/items/packs/glossy/fancy-sofa.svg":M_,"../assets/items/packs/glossy/flower-cart.svg":L_,"../assets/items/packs/glossy/foot-spa.svg":E_,"../assets/items/packs/glossy/globe-pendants.svg":S_,"../assets/items/packs/glossy/glow-mirror.svg":T_,"../assets/items/packs/glossy/gold-floor-mirror.svg":P_,"../assets/items/packs/glossy/hair-dryer.svg":A_,"../assets/items/packs/glossy/heart-plant.svg":R_,"../assets/items/packs/glossy/heart-pouf.svg":C_,"../assets/items/packs/glossy/lilac-curtain.svg":I_,"../assets/items/packs/glossy/lotion-trio.svg":O_,"../assets/items/packs/glossy/mani-lamp.svg":B_,"../assets/items/packs/glossy/nail-table.svg":D_,"../assets/items/packs/glossy/pebble-rug.svg":H_,"../assets/items/packs/glossy/perfume-bottle.svg":W_,"../assets/items/packs/glossy/pink-fountain.svg":V_,"../assets/items/packs/glossy/pink-vanity.svg":U_,"../assets/items/packs/glossy/polish-bottle.svg":z_,"../assets/items/packs/glossy/polish-rack.svg":Q_,"../assets/items/packs/glossy/reception-desk.svg":N_,"../assets/items/packs/glossy/salon-chair.svg":q_,"../assets/items/packs/glossy/scent-candle.svg":j_,"../assets/items/packs/glossy/spray-bottle.svg":F_,"../assets/items/packs/glossy/star-wall-sign.svg":Z_,"../assets/items/packs/glossy/swivel-stool.svg":G_,"../assets/items/packs/glossy/tiered-tray.svg":Y_,"../assets/items/packs/glossy/towel-cart.svg":K_,"../assets/items/packs/glossy/towel-stack.svg":X_,"../assets/items/packs/glossy/vine-planter.svg":J_,"../assets/items/packs/glossy/waiting-bench.svg":e8,"../assets/items/packs/glossy/wash-chair.svg":t8,"../assets/items/packs/halloween/hw-candy-bowl.webp":n8,"../assets/items/packs/halloween/hw-cat-statue.webp":s8,"../assets/items/packs/halloween/hw-cauldron.webp":o8,"../assets/items/packs/halloween/hw-ghost-sheet.webp":i8,"../assets/items/packs/halloween/hw-hay-bale.webp":a8,"../assets/items/packs/halloween/hw-heart-pumpkin.webp":r8,"../assets/items/packs/halloween/hw-leaf-garland.webp":l8,"../assets/items/packs/halloween/hw-moon-cling.webp":c8,"../assets/items/packs/halloween/hw-moon-lantern.webp":d8,"../assets/items/packs/halloween/hw-star-pumpkin.webp":f8,"../assets/items/packs/halloween/hw-witch-hat.webp":h8,"../assets/items/packs/sunny-vibes/arched-mirror.svg":u8,"../assets/items/packs/sunny-vibes/big-monitor.svg":p8,"../assets/items/packs/sunny-vibes/boba-cup.svg":g8,"../assets/items/packs/sunny-vibes/bubble-bath.svg":m8,"../assets/items/packs/sunny-vibes/cactus-buddy.svg":y8,"../assets/items/packs/sunny-vibes/caterpillar-plush.svg":b8,"../assets/items/packs/sunny-vibes/checker-bed.svg":w8,"../assets/items/packs/sunny-vibes/checker-rug.svg":k8,"../assets/items/packs/sunny-vibes/clothes-rail.svg":v8,"../assets/items/packs/sunny-vibes/cloud-sofa.svg":_8,"../assets/items/packs/sunny-vibes/cube-shelf.svg":$8,"../assets/items/packs/sunny-vibes/curvy-desk.svg":x8,"../assets/items/packs/sunny-vibes/cute-speaker.svg":M8,"../assets/items/packs/sunny-vibes/desk-lamp.svg":L8,"../assets/items/packs/sunny-vibes/desk-mic.svg":E8,"../assets/items/packs/sunny-vibes/flower-lamp.svg":S8,"../assets/items/packs/sunny-vibes/frog-plush.svg":T8,"../assets/items/packs/sunny-vibes/game-controller.svg":P8,"../assets/items/packs/sunny-vibes/gaming-chair.svg":A8,"../assets/items/packs/sunny-vibes/hamster-pet.svg":R8,"../assets/items/packs/sunny-vibes/headphones.svg":C8,"../assets/items/packs/sunny-vibes/heart-light.svg":I8,"../assets/items/packs/sunny-vibes/keyboard.svg":O8,"../assets/items/packs/sunny-vibes/mini-fridge.svg":B8,"../assets/items/packs/sunny-vibes/pastel-wardrobe.svg":D8,"../assets/items/packs/sunny-vibes/phone-stand.svg":H8,"../assets/items/packs/sunny-vibes/pothos-plant.svg":W8,"../assets/items/packs/sunny-vibes/puffy-stool.svg":V8,"../assets/items/packs/sunny-vibes/ring-light.svg":U8,"../assets/items/packs/sunny-vibes/side-table-round.svg":z8,"../assets/items/packs/sunny-vibes/star-lamp.svg":Q8,"../assets/items/packs/sunny-vibes/sticker-board.svg":N8,"../assets/items/packs/sunny-vibes/sunny-art.svg":q8,"../assets/items/packs/sunny-vibes/sv-bean-bag.svg":j8,"../assets/items/packs/sunny-vibes/sv-cloud-rug.svg":F8,"../assets/items/packs/sunny-vibes/sv-wall-shelf.svg":Z8,"../assets/items/packs/sunny-vibes/vlog-camera.svg":G8,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.svg":Y8,"../assets/items/packs/welcome-home/acorn-friend.svg":K8,"../assets/items/packs/welcome-home/apple-tree.svg":X8,"../assets/items/packs/welcome-home/big-wardrobe.svg":J8,"../assets/items/packs/welcome-home/box-stack.svg":e$,"../assets/items/packs/welcome-home/brick-fireplace.svg":t$,"../assets/items/packs/welcome-home/bulletin-board.svg":n$,"../assets/items/packs/welcome-home/cozy-mug.svg":s$,"../assets/items/packs/welcome-home/cream-sofa.svg":o$,"../assets/items/packs/welcome-home/fire-pit.svg":i$,"../assets/items/packs/welcome-home/glass-cabinet.svg":a$,"../assets/items/packs/welcome-home/hanging-lantern.svg":r$,"../assets/items/packs/welcome-home/knit-cushion.svg":l$,"../assets/items/packs/welcome-home/ladder-shelf.svg":c$,"../assets/items/packs/welcome-home/landscape-art.svg":d$,"../assets/items/packs/welcome-home/lattice-bench.svg":f$,"../assets/items/packs/welcome-home/leaf-wreath.svg":h$,"../assets/items/packs/welcome-home/mini-greenhouse.svg":u$,"../assets/items/packs/welcome-home/moving-box.svg":p$,"../assets/items/packs/welcome-home/picnic-basket.svg":g$,"../assets/items/packs/welcome-home/round-rug.svg":m$,"../assets/items/packs/welcome-home/sale-sign.svg":y$,"../assets/items/packs/welcome-home/sprout-pot.svg":b$,"../assets/items/packs/welcome-home/stripe-runner.svg":w$,"../assets/items/packs/welcome-home/trailing-plant.svg":k$,"../assets/items/packs/welcome-home/wall-clock.svg":v$,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.svg":_$,"../assets/items/packs/welcome-home/wh-book-stack.svg":$$,"../assets/items/packs/welcome-home/wh-dresser.svg":x$,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.svg":M$,"../assets/items/packs/welcome-home/wh-kitchen-counter.svg":L$,"../assets/items/packs/welcome-home/wh-nightstand.svg":E$,"../assets/items/packs/welcome-home/wh-pendant-lamp.svg":S$,"../assets/items/packs/welcome-home/wh-snake-plant.svg":T$,"../assets/items/packs/welcome-home/wh-string-lights.svg":P$,"../assets/items/packs/welcome-home/wh-teapot.svg":A$,"../assets/items/packs/welcome-home/wood-armchair.svg":R$,"../assets/items/packs/welcome-home/wood-bookshelf.svg":C$,"../assets/items/packs/welcome-home/wood-coffee-table.svg":I$,"../assets/items/packs/welcome-home/wood-desk.svg":O$,"../assets/items/packs/welcome-home/wood-stool.svg":B$,"../assets/items/packs/welcome-home/wooden-bed.svg":D$,"../assets/items/packs/winter/wc-bauble-garland.webp":H$,"../assets/items/packs/winter/wc-berry-wreath.webp":W$,"../assets/items/packs/winter/wc-birch-basket.webp":V$,"../assets/items/packs/winter/wc-cabin-picture.webp":U$,"../assets/items/packs/winter/wc-candle-trio.webp":z$,"../assets/items/packs/winter/wc-cane-lamp.webp":Q$,"../assets/items/packs/winter/wc-cinnamon-tray.webp":N$,"../assets/items/packs/winter/wc-cocoa-cart.webp":q$,"../assets/items/packs/winter/wc-cocoa-mug.webp":j$,"../assets/items/packs/winter/wc-cocoa-pot.webp":F$,"../assets/items/packs/winter/wc-cookie-oven.webp":Z$,"../assets/items/packs/winter/wc-cookie-plate.webp":G$,"../assets/items/packs/winter/wc-frost-bookcase.webp":Y$,"../assets/items/packs/winter/wc-frosted-pine.webp":K$,"../assets/items/packs/winter/wc-fur-bench.webp":X$,"../assets/items/packs/winter/wc-gingerbread-village.webp":J$,"../assets/items/packs/winter/wc-gingerbread.webp":e3,"../assets/items/packs/winter/wc-globe-lamp.webp":t3,"../assets/items/packs/winter/wc-holiday-tree.webp":n3,"../assets/items/packs/winter/wc-holly.webp":s3,"../assets/items/packs/winter/wc-ice-skates.webp":o3,"../assets/items/packs/winter/wc-ice-wardrobe.webp":i3,"../assets/items/packs/winter/wc-knit-armchair.webp":a3,"../assets/items/packs/winter/wc-lantern.webp":r3,"../assets/items/packs/winter/wc-log-bench.webp":l3,"../assets/items/packs/winter/wc-marshmallow-jar.webp":c3,"../assets/items/packs/winter/wc-mitten-line.webp":d3,"../assets/items/packs/winter/wc-mitten-ottoman.webp":f3,"../assets/items/packs/winter/wc-mug-shelf.webp":h3,"../assets/items/packs/winter/wc-nutcracker.webp":u3,"../assets/items/packs/winter/wc-penguin-chair.webp":p3,"../assets/items/packs/winter/wc-penguin-plush.webp":g3,"../assets/items/packs/winter/wc-peppermint-counter.webp":m3,"../assets/items/packs/winter/wc-peppermint-rug.webp":y3,"../assets/items/packs/winter/wc-pinecone-garland.webp":b3,"../assets/items/packs/winter/wc-pinecone-table.webp":w3,"../assets/items/packs/winter/wc-plaid-bed.webp":k3,"../assets/items/packs/winter/wc-plaid-sofa.webp":v3,"../assets/items/packs/winter/wc-poinsettia.webp":_3,"../assets/items/packs/winter/wc-polar-plush.webp":$3,"../assets/items/packs/winter/wc-pom-rug.webp":x3,"../assets/items/packs/winter/wc-present-stack.webp":M3,"../assets/items/packs/winter/wc-reindeer.webp":L3,"../assets/items/packs/winter/wc-sled-table.webp":E3,"../assets/items/packs/winter/wc-sleigh-planter.webp":S3,"../assets/items/packs/winter/wc-snow-globe.webp":T3,"../assets/items/packs/winter/wc-snow-mobile.webp":P3,"../assets/items/packs/winter/wc-snow-nightstand.webp":A3,"../assets/items/packs/winter/wc-snow-window.webp":R3,"../assets/items/packs/winter/wc-snowman.webp":C3,"../assets/items/packs/winter/wc-snowshoes.webp":I3,"../assets/items/packs/winter/wc-sock-hamper.webp":O3,"../assets/items/packs/winter/wc-star-topper.webp":B3,"../assets/items/packs/winter/wc-stocking-row.webp":D3,"../assets/items/packs/winter/wc-stone-hearth.webp":H3,"../assets/items/packs/winter/wc-twinkle-lamp.webp":W3,"../assets/items/packs/winter/wc-twinkle-string.webp":V3,"../assets/items/packs/winter/wc-window-seat.webp":U3,"../assets/items/packs/winter/wc-woodstove.webp":z3}),_u=Object.assign({"../assets/patterns/cottage/cc-butter-polka.svg":Q3,"../assets/patterns/cottage/cc-cream-hex.svg":N3,"../assets/patterns/cottage/cc-lavender-lattice.svg":q3,"../assets/patterns/cottage/cc-lilac-gingham.svg":j3,"../assets/patterns/cottage/cc-mint-checks.svg":F3,"../assets/patterns/cottage/cc-mint-florals.svg":Z3,"../assets/patterns/cottage/cc-peach-scallops.svg":G3,"../assets/patterns/cottage/cc-pink-plaid.svg":Y3,"../assets/patterns/cottage/cc-rag-planks.svg":K3,"../assets/patterns/cottage/cc-rose-herringbone.svg":X3,"../assets/patterns/glossy/lilac-stripes.svg":J3,"../assets/patterns/glossy/lilac-terrazzo.svg":ex,"../assets/patterns/glossy/mint-bubbles.svg":tx,"../assets/patterns/glossy/pink-check-floor.svg":nx,"../assets/patterns/glossy/pink-hearts.svg":sx,"../assets/patterns/nursery/cloud-sky.svg":ox,"../assets/patterns/nursery/pastel-planks.svg":ix,"../assets/patterns/nursery/soft-carpet.svg":ax,"../assets/patterns/nursery/star-sprinkle.svg":rx,"../assets/patterns/nursery/tiny-hearts.svg":lx,"../assets/patterns/sunny-vibes/butter-check-floor.svg":cx,"../assets/patterns/sunny-vibes/mint-checks.svg":dx,"../assets/patterns/sunny-vibes/sky-clouds.svg":fx,"../assets/patterns/sunny-vibes/sky-tiles.svg":hx,"../assets/patterns/sunny-vibes/sunny-stars.svg":ux,"../assets/patterns/welcome-home/leafy-cream.svg":px,"../assets/patterns/welcome-home/orange-gingham.svg":gx,"../assets/patterns/welcome-home/terracotta-tiles.svg":mx,"../assets/patterns/welcome-home/wood-panel.svg":yx,"../assets/patterns/welcome-home/wood-planks.svg":bx,"../assets/patterns/winter/wc-cabin-planks.webp":wx,"../assets/patterns/winter/wc-candy-stripe.webp":kx,"../assets/patterns/winter/wc-frosty-dots.webp":vx,"../assets/patterns/winter/wc-mint-pine.webp":_x,"../assets/patterns/winter/wc-peppermint-tiles.webp":$x,"../assets/patterns/winter/wc-red-plaid.webp":xx,"../assets/patterns/winter/wc-snow-knit.webp":Mx,"../assets/patterns/winter/wc-snowflake-sky.webp":Lx});function Tx(e,t){if(!e||!e.trim())return[];try{const n=JSON.parse(e);return(Array.isArray(n)?n:[...Array.isArray(n?.items)?n.items:[],...Array.isArray(n?.patterns)?n.patterns:[]]).filter(o=>o&&typeof o.slug=="string"&&o.slug.trim())}catch(n){return console.warn(`[packs] ${t} is not valid JSON; ignoring`,n),[]}}const rg=Object.entries(Sx).flatMap(([e,t])=>Tx(t,e)),Px=["svg","png","webp","SVG","PNG","WEBP"];function lg(e,t,n,s){for(const i of Px){const a=e[`../assets/${t}/${n}/${s}.${i}`];if(a)return a}const o=Object.keys(e).find(i=>i.split("/").pop().replace(/\.\w+$/,"")===s);return o?e[o]:void 0}const $u={furniture:"furniture",appliance:"furniture",appliances:"furniture",seating:"furniture",storage:"furniture",bed:"furniture",table:"furniture",decor:"decor",rug:"decor",rugs:"decor",lighting:"decor",light:"decor",lamp:"decor",toy:"decor",toys:"decor","wall-art":"decor",art:"decor",beauty:"decor",plant:"plants",plants:"plants",flower:"plants",flowers:"plants",food:"food",drink:"food",drinks:"food",snack:"food",pet:"pets",pets:"pets",animal:"pets",animals:"pets"};function Ax(e){const t=typeof e=="string"?e.trim().toLowerCase():"";return $u[t]??$u[t.replace(/s$/,"")]??"decor"}const No=(e,t)=>typeof e=="string"&&e.trim()?e.trim().toLowerCase():t,cg=e=>["wallpaper","floor"].includes(No(e.type,"")),xu=new Set,Rx=rg.filter(e=>!cg(e)).flatMap(e=>{const t=No(e.room,"any"),n=e.slug.trim();if(xu.has(n))return[];xu.add(n);const o=[e.svg,e.png].filter(p=>typeof p=="string").map(p=>vu["../assets/items/"+p.replace(/^\.?\//,"")]).find(Boolean)??lg(vu,"items",t,n);if(!o)return console.warn(`[packs] no image for items/${t}/${n}`),[];const i=No(e.pack,""),a=No(e.size,"medium"),r=Ax(e.category),l=typeof e.gameW=="number"&&e.gameW>20&&e.gameW<800?e.gameW:ku[a]??ku.medium,c=typeof e.widthUnits=="number"&&typeof e.heightUnits=="number"&&e.widthUnits>0&&e.heightUnits>0?e.heightUnits/e.widthUnits:1,d=Math.round(l*Math.min(4,Math.max(.2,c))),f=typeof e.holdable=="boolean"?e.holdable:a!=="large"&&r!=="furniture",u=e.tag==="lighting"||/lamp|light|lantern|candle/i.test(n);return[{kind:`pack:${n}`,name:e.name||n,cat:r,rooms:[t],w:l,h:d,wall:e.wall===!0||void 0,svg:"",img:o,pack:i||void 0,holdable:f,light:u||void 0}]}),md=rg.filter(cg).flatMap(e=>{const t=No(e.pack,"extra"),n=e.slug.trim(),o=[e.svg,e.png].filter(i=>typeof i=="string").map(i=>_u["../assets/patterns/"+i.replace(/^\.?\//,"")]).find(Boolean)??lg(_u,"patterns",t,n);return o?[{id:`${t}/${n}`,name:e.name||n,pack:t,kind:No(e.type,"wallpaper"),url:o}]:(console.warn(`[packs] no image for patterns/${t}/${n}`),[])}),Mu=Object.fromEntries(md.map(e=>[e.id,e])),In="#5a3d5c",D=`stroke="${In}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,dg=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="2.4" fill="${In}"/><circle cx="${t}" cy="${n}" r="2.4" fill="${In}"/><circle cx="${e+.8}" cy="${n-.8}" r=".8" fill="#fff"/><circle cx="${t+.8}" cy="${n-.8}" r=".8" fill="#fff"/>`,fg=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/><ellipse cx="${t}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/>`,at='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>';function kc(e,t,n){return`${at}<ellipse cx="50" cy="78" rx="28" ry="16" fill="${t}" ${D}/><path d="M24 62 Q50 48 76 62 V78 Q50 92 24 78 Z" fill="${t}" ${D}/>
    <circle cx="50" cy="40" r="18" fill="${e}" ${D}/>${dg(43,57,40)}${fg(38,62,48)}<path d="M46 50 q4 3 8 0" fill="none" ${D}/>
    <path d="M38 26 Q50 16 62 26" fill="${n}" ${D}/><circle cx="50" cy="24" r="3" fill="${n}" ${D}/>`}const hg=[{kind:"crib",name:"Crib",cat:"furniture",w:260,svg:`${at}<rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${D}/><path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${D}/><rect x="6" y="22" width="88" height="12" rx="6" fill="#9ad7f5" ${D}/><rect x="14" y="48" width="72" height="16" rx="6" fill="#ffe0ec"/><ellipse cx="32" cy="56" rx="8" ry="5" fill="#fff" ${D}/><ellipse cx="50" cy="56" rx="8" ry="5" fill="#c9e7ff" ${D}/>`},{kind:"bassinet",name:"Bassinet",cat:"furniture",w:170,svg:`${at}<path d="M18 78 Q8 78 10 64 L22 36 H78 L90 64 Q92 78 82 78 Z" fill="#fff" ${D}/><ellipse cx="50" cy="36" rx="32" ry="10" fill="#fff" ${D}/><path d="M22 40 Q50 52 78 40" fill="#ffe0ec" ${D}/><ellipse cx="50" cy="44" rx="16" ry="7" fill="#fff"/><path d="M30 78 L22 94 M70 78 L78 94" ${D}/><ellipse cx="50" cy="90" rx="28" ry="4" fill="none" ${D}/><path d="M14 22 Q50 4 86 22" fill="none" stroke="#9ad7f5" stroke-width="6" stroke-linecap="round"/>`},{kind:"rocker",name:"Rocker",cat:"furniture",w:190,svg:`${at}<path d="M16 88 Q50 98 84 88" fill="none" ${D}/><path d="M28 84 Q50 74 72 84" fill="#c9a0dc" ${D}/><rect x="30" y="28" width="40" height="36" rx="12" fill="#e4ccf2" ${D}/><path d="M22 48 Q18 70 30 80 H70 Q82 70 78 48 Z" fill="#f6e6ff" ${D}/><rect x="36" y="58" width="28" height="12" rx="6" fill="#ffc8dd" ${D}/><circle cx="50" cy="40" r="6" fill="#fff" opacity=".7"/>`},{kind:"changing-table",name:"Changing Table",cat:"furniture",w:230,svg:`${at}<rect x="8" y="36" width="84" height="16" rx="8" fill="#fff" ${D}/><rect x="14" y="40" width="72" height="8" rx="4" fill="#ffd6e8"/><rect x="16" y="52" width="28" height="32" rx="6" fill="#bde0fe" ${D}/><rect x="56" y="52" width="28" height="32" rx="6" fill="#c9f0d8" ${D}/><path d="M22 60 H38 M22 68 H38 M62 60 H78 M62 68 H78" ${D}/><rect x="18" y="84" width="8" height="10" rx="2" fill="${In}"/><rect x="74" y="84" width="8" height="10" rx="2" fill="${In}"/><rect x="34" y="22" width="18" height="12" rx="3" fill="#ffe0ec" ${D}/><rect x="54" y="24" width="16" height="10" rx="3" fill="#fff6d8" ${D}/>`},{kind:"toy-bin",name:"Toy Bin",cat:"furniture",w:150,svg:`${at}<path d="M14 40 H86 L78 90 H22 Z" fill="#ffd166" ${D}/><rect x="10" y="32" width="80" height="14" rx="7" fill="#ffe08a" ${D}/><circle cx="36" cy="58" r="8" fill="#ff8fab" ${D}/><rect x="50" y="50" width="16" height="16" rx="3" fill="#8ecae6" ${D}/><circle cx="62" cy="70" r="6" fill="#90e0a8" ${D}/>`},{kind:"baby-shelf",name:"Bookshelf",cat:"furniture",w:150,svg:`${at}<rect x="14" y="8" width="72" height="84" rx="8" fill="#f3d2b5" ${D}/><path d="M14 36 H86 M14 64 H86" ${D}/><rect x="22" y="14" width="8" height="18" rx="2" fill="#ff8fab" ${D}/><rect x="32" y="18" width="8" height="14" rx="2" fill="#8ecae6" ${D}/><rect x="44" y="14" width="8" height="18" rx="2" fill="#ffd166" ${D}/><rect x="58" y="16" width="8" height="16" rx="2" fill="#90e0a8" ${D}/><circle cx="34" cy="50" r="7" fill="#ffadad" ${D}/><rect x="50" y="44" width="18" height="14" rx="3" fill="#c9a0dc" ${D}/><ellipse cx="40" cy="78" rx="14" ry="8" fill="#fff" ${D}/>`},{kind:"doll-rose",name:"Rose Doll",cat:"decor",w:80,svg:kc("#f6d3b0","#ffc2d4","#ff8fab")},{kind:"doll-honey",name:"Honey Doll",cat:"decor",w:80,svg:kc("#e0ac69","#cdeffd","#ffd166")},{kind:"doll-cocoa",name:"Cocoa Doll",cat:"decor",w:80,svg:kc("#8d5524","#d8f3dc","#c9a0dc")},{kind:"crib-mobile",name:"Crib Mobile",cat:"decor",w:150,wall:!0,svg:`<path d="M50 6 V22" ${D}/><ellipse cx="50" cy="28" rx="28" ry="8" fill="#fff" ${D}/><path d="M28 32 V48 M50 36 V58 M72 32 V48" ${D}/><circle cx="28" cy="56" r="8" fill="#ffd166" ${D}/><circle cx="50" cy="68" r="9" fill="#ff8fab" ${D}/><path d="M72 56 l6 4 -6 4 -6 -4 z" fill="#8ecae6" ${D}/><circle cx="28" cy="54" r="2" fill="#fff"/><circle cx="50" cy="66" r="2" fill="#fff"/>`},{kind:"night-light",name:"Night Light",cat:"decor",w:70,svg:`${at}<circle cx="50" cy="46" r="22" fill="#fff6c8" ${D}/><circle cx="50" cy="46" r="12" fill="#ffe08a"/><path d="M50 18 V10 M30 26 L24 20 M70 26 L76 20 M24 46 H14 M86 46 H76" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><rect x="40" y="70" width="20" height="16" rx="4" fill="#c9a0dc" ${D}/><circle cx="50" cy="78" r="3" fill="#ff8fab"/>`},{kind:"bunny-plush",name:"Bunny Plush",cat:"decor",w:90,svg:`${at}<ellipse cx="34" cy="28" rx="8" ry="18" fill="#fff" ${D}/><ellipse cx="66" cy="28" rx="8" ry="18" fill="#fff" ${D}/><ellipse cx="34" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="66" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="50" cy="74" rx="26" ry="18" fill="#fff" ${D}/><circle cx="50" cy="50" r="20" fill="#fff" ${D}/>${dg(43,57,50)}<path d="M47 58 l3 3 3 -3" fill="none" ${D}/>${fg(38,62,58)}`},{kind:"stacking-rings",name:"Stacking Rings",cat:"decor",w:70,svg:`${at}<ellipse cx="50" cy="86" rx="26" ry="7" fill="#ff8fab" ${D}/><ellipse cx="50" cy="74" rx="20" ry="6" fill="#ffd166" ${D}/><ellipse cx="50" cy="64" rx="15" ry="5" fill="#8ecae6" ${D}/><ellipse cx="50" cy="56" rx="10" ry="4" fill="#90e0a8" ${D}/><rect x="46" y="28" width="8" height="40" rx="4" fill="#c9a0dc" ${D}/><circle cx="50" cy="24" r="7" fill="#ffb3c6" ${D}/>`},{kind:"rattle",name:"Rattle",cat:"decor",w:60,svg:`${at}<circle cx="38" cy="40" r="20" fill="#ffd166" ${D}/><circle cx="32" cy="34" r="5" fill="#fff" opacity=".7"/><rect x="50" y="52" width="10" height="28" rx="5" fill="#ff8fab" ${D} transform="rotate(-20 55 66)"/><circle cx="68" cy="82" r="8" fill="#8ecae6" ${D}/>`},{kind:"baby-bottle",name:"Baby Bottle",cat:"food",w:55,svg:`${at}<rect x="36" y="8" width="28" height="12" rx="4" fill="#c9a0dc" ${D}/><rect x="42" y="18" width="16" height="8" fill="#fff" ${D}/><path d="M30 30 H70 L66 88 Q50 96 34 88 Z" fill="#e7f6ff" ${D}/><path d="M32 48 H68 L66 80 Q50 88 34 80 Z" fill="#fff" opacity=".85"/><rect x="34" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="46" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="58" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/>`},{kind:"blocks",name:"Baby Blocks",cat:"decor",w:90,svg:`${at}<rect x="14" y="58" width="28" height="28" rx="4" fill="#ff8fab" ${D}/><rect x="40" y="46" width="28" height="28" rx="4" fill="#ffd166" ${D}/><rect x="28" y="28" width="26" height="26" rx="4" fill="#8ecae6" ${D}/><path d="M20 72 H36 M48 60 H62 M34 42 H48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"rocking-horse",name:"Little Rocking Horse",cat:"decor",w:180,svg:`${at}<path d="M12 86 Q50 98 88 82" fill="none" ${D}/><ellipse cx="48" cy="62" rx="26" ry="14" fill="#e6b88a" ${D}/><path d="M62 58 L84 40 Q92 36 90 48 L74 64 Z" fill="#f0d0b0" ${D}/><circle cx="82" cy="42" r="3" fill="${In}"/><path d="M70 36 L76 24 L84 34" fill="#ff8fab" ${D}/><rect x="36" y="48" width="16" height="8" rx="3" fill="#c9a0dc" ${D}/><path d="M30 70 L22 84 M58 72 L66 86" ${D}/>`},{kind:"music-box",name:"Music Box",cat:"decor",w:80,svg:`${at}<rect x="22" y="40" width="56" height="46" rx="8" fill="#f6d6ff" ${D}/><path d="M22 40 L50 22 L78 40" fill="#e4ccf2" ${D}/><circle cx="50" cy="64" r="10" fill="#fff" ${D}/><path d="M50 58 V70 M44 64 H56" ${D}/><circle cx="50" cy="30" r="4" fill="#ffd166" ${D}/>`},{kind:"cloud-rug",name:"Nursery Cloud Rug",cat:"decor",w:340,svg:`<ellipse cx="50" cy="78" rx="46" ry="16" fill="#e7f6ff" ${D}/><circle cx="28" cy="70" r="16" fill="#f4fbff" ${D}/><circle cx="50" cy="62" r="18" fill="#fff" ${D}/><circle cx="72" cy="70" r="16" fill="#f4fbff" ${D}/><ellipse cx="50" cy="78" rx="30" ry="8" fill="#d6f0ff"/>`},{kind:"play-mat",name:"Play Mat",cat:"decor",w:300,svg:`<rect x="6" y="62" width="88" height="30" rx="14" fill="#ffe0ec" ${D}/><path d="M50 70 C42 62 30 64 34 74 C38 82 50 88 50 88 C50 88 62 82 66 74 C70 64 58 62 50 70 Z" fill="#ff8fab" ${D}/><circle cx="22" cy="76" r="5" fill="#ffd166" ${D}/><circle cx="78" cy="76" r="5" fill="#8ecae6" ${D}/>`},{kind:"moon-art",name:"Moon and Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M58 18 A28 28 0 1 0 58 78 A18 18 0 1 1 58 18 Z" fill="#fff3b0" ${D}/><path d="M22 30 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1 z" fill="#ffd166" ${D}/><path d="M78 58 l2 5 5 1 -4 4 1 5 -4 -3 -4 3 1 -5 -4 -4 5 -1 z" fill="#c9e7ff" ${D}/>`},{kind:"nursery-dresser",name:"Nursery Dresser",cat:"furniture",w:170,svg:`${at}<rect x="14" y="22" width="72" height="68" rx="8" fill="#f6e2c4" ${D}/><path d="M14 44 H86 M14 66 H86" ${D}/><circle cx="50" cy="34" r="3" fill="${In}"/><circle cx="50" cy="55" r="3" fill="${In}"/><circle cx="50" cy="76" r="3" fill="${In}"/><rect x="30" y="10" width="18" height="12" rx="3" fill="#ffc2d4" ${D}/><rect x="52" y="12" width="16" height="10" rx="3" fill="#c9e7ff" ${D}/>`},{kind:"nursery-lamp",name:"Nursery Lamp",cat:"decor",w:80,svg:`${at}<path d="M28 42 L36 12 H64 L72 42 Z" fill="#fff6c8" ${D}/><rect x="46" y="42" width="8" height="40" rx="4" fill="#c9a0dc" ${D}/><ellipse cx="50" cy="88" rx="20" ry="6" fill="#b388d6" ${D}/><circle cx="46" cy="24" r="3" fill="#fff" opacity=".85"/><path d="M34 20 q6 -8 4 -2" fill="none" stroke="#ffd166" stroke-width="2"/>`},{kind:"nursery-curtains",name:"Curtains",cat:"decor",w:180,wall:!0,svg:`<rect x="16" y="10" width="68" height="50" rx="6" fill="#cfefff" ${D}/><path d="M50 10 V60 M16 34 H84" ${D}/><path d="M8 8 Q18 28 10 92" fill="#ffd6e8" ${D}/><path d="M92 8 Q82 28 90 92" fill="#ffd6e8" ${D}/><rect x="6" y="6" width="88" height="8" rx="3" fill="#f3d2b5" ${D}/>`}],ct="#5a3d5c",M=(e=3.5)=>`stroke="${ct}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function $e(e,t,n){const s=Math.round(t*.62);return`<ellipse cx="${e}" cy="${n}" rx="${t}" ry="3.4" fill="${ct}" opacity=".08"/><ellipse cx="${e}" cy="${(n+1.2).toFixed(1)}" rx="${s}" ry="1.55" fill="${ct}" opacity=".12"/>`}function re(e,t=2.2){return`<path d="${e}" fill="none" stroke="#fff" stroke-width="${t}" stroke-linecap="round" opacity=".75"/>`}function ft(e,t=1.15){return`<path d="${e}" fill="none" stroke="${ct}" stroke-width="${t}" stroke-linecap="round" opacity=".2"/>`}function Pf(e,t,n=".7"){return`<radialGradient id="${e}" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="${t}" stop-opacity="${n}"/><stop offset="1" stop-color="${t}" stop-opacity="0"/></radialGradient>`}function Af(e,t,n){return`<linearGradient id="${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t}"/><stop offset="1" stop-color="${n}"/></linearGradient>`}function Cx(){return typeof location>"u"?!1:/(?:^|[?&])yard=1(?:&|$)/.test(location.search)}function yd(){return typeof location>"u"?"":new URLSearchParams(location.search).get("shot")||""}const Ix={v:1,hair:"pigtails",hairC:"#a0522d",skin:"#f6d2b5",eyes:"big",eyeC:"#5a321c",freckles:!0,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"skirt",bottomC:"#c9a0dc",dress:"sundress",dressC:"#ff8fab",shoes:"maryjanes",shoesC:"#ffd166",acc:["bow"],accC:"#ff7aa8"},Ox=()=>ia(Ix),bd=864,wd={x:1084,y:578,flip:!0},ms={x:1184,y:255},Lu={x:1146,y:578},kd={x:940,y:540,flip:!0},Nr=1160,ug={x:824,y:398,w:96,h:230},pg={x:996,y:372,w:82,h:196},Bx=[{kind:"yard-swing",x:1266,y:580,scale:132/280},{kind:"lemonade-cart",x:1254,y:471},{kind:"sandbox",x:940,y:482},{kind:"picnic-blanket",x:939,y:420}];function xe(e){return{kind:e.kind,name:e.name,cat:e.cat,w:e.w,h:e.h,vb:e.vb,wall:e.wall,holdable:e.holdable??!1,rooms:["backyard"],svg:e.svg}}const Dx=xe({kind:"yard-swing",name:"A-Frame Swing",cat:"furniture",w:280,h:215,vb:"0 0 130 100",svg:`${$e(65,54,96)}
    <path d="M34 18 L50 18 L20 94 H4 Z" fill="#f3d2aa" ${M()}/>
    <path d="M42 24 L50 18 L18 70 H28 Z" fill="#d4a373"/>
    <path d="M80 18 L96 18 L126 94 H110 Z" fill="#e7c49a" ${M()}/>
    <path d="M108 22 L96 18 L126 94 H118 Z" fill="#c99366"/>
    ${ft("M16 50 l8 28 M112 48 l8 30")}
    <rect x="22" y="6" width="86" height="14" rx="2" fill="#f6e0c4" ${M()}/>
    <rect x="86" y="9" width="18" height="8" rx="1" fill="#d4a373"/>
    <rect x="28" y="16" width="74" height="4" fill="#e7c49a"/>
    ${re("M28 10 h30")}
    <g class="swingSeat">
      <rect x="48" y="74" width="34" height="7" rx="1" fill="#f3d2aa" ${M(2.2)}/>
      <rect x="72" y="76" width="8" height="4" fill="#d4a373"/>
      <path d="M54 20 V78 M76 20 V78" fill="none" ${M(2.2)}/>
      ${re("M52 76 h14")}
    </g>`}),Hx=xe({kind:"sandbox",name:"Sandbox",cat:"furniture",w:120,h:54,vb:"0 0 160 72",svg:`${$e(80,64,68)}
    <path d="M108 38 L146 26 L146 52 L108 64 Z" fill="#e7c49a" ${M()}/>
    <path d="M126 36 L142 28 L142 48 L126 56 Z" fill="#c99366"/>
    <path d="M12 40 H108 V64 H12 Z" fill="#f3d2aa" ${M()}/>
    <path d="M12 40 L36 18 L146 18 L108 40 Z" fill="#f6e0c4" ${M()}/>
    <path d="M112 20 L142 20 L108 38 L90 38 Z" fill="#d4a373"/>
    <path d="M34 36 L52 24 L122 24 L100 36 Z" fill="#ffe08a" ${M(2.2)}/>
    <path d="M98 26 L118 26 L100 34 L86 34 Z" fill="#f0c36a"/>
    ${ft("M48 30 q8 2 6 5 M68 28 q10 2 8 6 M58 34 h16")}
    <path d="M76 30 L100 36 L94 48 L70 42 Z" fill="#d7e6f2" ${M(2.2)}/>
    <path d="M88 34 L98 38 L94 44 L84 40 Z" fill="#b7c9d6"/>
    <path d="M52 8 L64 4 L90 34 L78 38 Z" fill="#f0d2b0" ${M()}/>
    <path d="M64 8 L72 6 L90 32 L82 34 Z" fill="#d4a373"/>
    <path d="M46 2 H66 V9 H46 Z" fill="#c99366" ${M(2)}/>
    ${re("M18 44 h26")}
    ${re("M44 22 h22")}`}),Wx=xe({kind:"little-slide",name:"Little Slide",cat:"furniture",w:150,h:188,vb:"0 0 110 140",svg:`${$e(56,44,134)}
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
    ${re("M12 24 h22")}
    <rect x="12" y="6" width="5" height="16" rx="1" fill="#f0d2b0" ${M(2.2)}/>
    <rect x="40" y="6" width="5" height="16" rx="1" fill="#e7c49a" ${M(2.2)}/>
    <path d="M14 8 H43" fill="none" ${M(2.2)}/>
    <rect x="80" y="116" width="7" height="16" rx="1" fill="#f3d2aa" ${M(2)}/>
    ${re("M58 42 C74 48 86 66 86 88")}
    ${ft("M80 64 q4 16 2 28")}`}),Vx=xe({kind:"yard-bench",name:"Garden Bench",cat:"furniture",w:140,h:100,vb:"0 0 140 100",svg:`${$e(70,58,96)}
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
    ${re("M22 13 h28")}
    ${re("M14 48 h16")}
    ${ft("M36 24 h48 M36 34 h44 M34 52 h52 M34 62 h46")}`}),Ux=xe({kind:"lemonade-cart",name:"Lemonade Cart",cat:"furniture",w:108,h:121,vb:"0 0 100 112",svg:`${$e(50,40,106)}
    <circle cx="30" cy="96" r="11" fill="${ct}" ${M(2.2)}/><circle cx="30" cy="96" r="4.5" fill="#ffd166"/>
    <circle cx="72" cy="96" r="11" fill="${ct}" ${M(2.2)}/><circle cx="72" cy="96" r="4.5" fill="#ffd166"/>
    <rect x="18" y="92" width="66" height="5" rx="2" fill="#c99366" ${M(2)}/>
    <rect x="16" y="46" width="68" height="46" rx="3" fill="#fff6ea" ${M()}/>
    <rect x="66" y="50" width="14" height="38" fill="#f0d2a4"/>
    ${ft("M28 56 v28 M42 56 v28 M56 56 v28")}
    ${re("M20 52 v16")}
    <rect x="12" y="38" width="76" height="12" rx="2" fill="#ffe08a" ${M()}/>
    <rect x="66" y="40" width="18" height="8" fill="#f0c45c"/>
    <path d="M14 40 L22 14 H80 L88 40 Z" fill="#ff8fab" ${M()}/>
    <path d="M34 16 L38 40 H50 L46 15 Z" fill="#fff4f7"/>
    <path d="M58 15 L62 40 H74 L70 15 Z" fill="#fff4f7"/>
    <path d="M72 16 H80 L88 40 H76 Z" fill="#e45d88"/>
    ${re("M26 20 h18")}
    <path d="M28 52 H44 L42 72 H30 Z" fill="#fff" ${M(2)}/>
    <path d="M30 58 H42 L41 72 H31 Z" fill="#ffe566"/>
    <path d="M28 54 L22 58 L28 62 Z" fill="#fff" ${M(2)}/>
    <path d="M44 56 Q52 60 44 70" fill="none" ${M(2)}/>
    <path d="M56 60 H68 L66 72 H58 Z" fill="#fff" ${M(2)}/>
    <path d="M58 64 H66 L65 72 H59 Z" fill="#ffe566"/>
    <circle cx="78" cy="64" r="7" fill="#ffe566" ${M(2)}/>
    <path d="M78 58 v12 M72 64 h12" fill="none" stroke="#e0a83a" stroke-width="1.3"/>`}),zx=xe({kind:"sun-lounger",name:"Sun Lounger",cat:"furniture",w:168,h:86,vb:"0 0 170 90",svg:`${$e(86,68,84)}
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
    ${re("M22 12 L50 40")}
    ${ft("M26 22 L52 46")}`}),Qx=xe({kind:"splash-pool",name:"Splash Pool",cat:"furniture",w:176,h:96,vb:"0 0 170 96",svg:`<defs>${Af("ydpoolW","#f3fbff","#7ec8e3")}</defs>
    ${$e(85,72,90)}
    <ellipse cx="85" cy="58" rx="74" ry="28" fill="#8ecae6" ${M()}/>
    <path d="M22 52 Q40 34 78 40" fill="none" stroke="#ff8fab" stroke-width="16" stroke-linecap="round"/>
    <path d="M100 36 Q138 38 152 58" fill="none" stroke="#ffd166" stroke-width="14" stroke-linecap="round"/>
    <path d="M18 66 C22 82 50 90 85 90 C120 90 152 82 154 66 C148 78 120 84 85 84 C50 84 24 78 18 66 Z" fill="#5aa9c6"/>
    <ellipse cx="85" cy="54" rx="48" ry="16" fill="url(#ydpoolW)" ${M(2.2)}/>
    ${re("M36 50 q20 -10 36 0")}
    <circle cx="128" cy="48" r="4" fill="#fff" ${M(1.6)}/>
    <circle cx="128" cy="48" r="1.6" fill="#8ecae6"/>
    <path d="M70 46 q3 -8 1 0 M96 42 q4 -9 1 1" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`}),Nx=xe({kind:"picket-gate",name:"Picket Gate",cat:"furniture",w:110,h:150,vb:"0 0 100 136",svg:`${$e(50,38,130)}
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
    ${re("M28 36 v20")}
    <rect x="74" y="60" width="16" height="5" rx="1" fill="#c99366" ${M(2)}/>
    <circle cx="86" cy="62" r="2.6" fill="#ffd166" ${M(1.8)}/>`});function qx(){let e="";for(let t=0;t<6;t++)for(let n=0;n<13;n++)(t+n)%2===0&&(e+=`<rect x="${n*15-6}" y="${t*10}" width="15" height="10" fill="#ff8fab"/>`);return e}const jx=xe({kind:"picnic-blanket",name:"Picnic Blanket",cat:"decor",w:110,h:36,vb:"0 0 180 59",svg:`<defs><clipPath id="ydging"><path d="M22 20 L156 12 L174 44 L36 52 Z"/></clipPath></defs>
    ${$e(96,74,54)}
    <path d="M22 20 L156 12 L174 44 L36 52 Z" fill="#fff0f5" ${M()}/>
    <g clip-path="url(#ydging)">${qx()}</g>
    <path d="M148 14 L170 42 L160 46 L138 18 Z" fill="#e45d88"/>
    <path d="M96 30 L128 26 L134 42 L100 46 Z" fill="#f3d2aa" ${M(2)}/>
    <path d="M120 28 L128 26 L134 42 L126 43 Z" fill="#c99366"/>
    <path d="M104 30 Q114 14 126 28" fill="none" ${M(2.2)}/>
    ${ft("M104 34 h22 M104 38 h24",1)}
    ${re("M34 26 l28 -3")}`});function wi(e,t,n,s){return`<path d="M${e-1.5} ${t+16} H${e+1.5} V${t+40} H${e-1.5} Z" fill="#3d9a68"/>
    <path d="M${e} ${t+24} C${e-16} ${t+18} ${e-14} ${t+36} ${e-1} ${t+34}" fill="#74c69d" ${M(1.6)}/>
    <path d="M${e} ${t+22} C${e+16} ${t+16} ${e+12} ${t+36} ${e+1} ${t+32}" fill="#52b788"/>
    <path d="M${e} ${t+18} C${e-10} ${t+8} ${e-8} ${t} ${e} ${t+6} C${e+8} ${t} ${e+10} ${t+8} ${e} ${t+18} Z" fill="${n}" ${M(1.8)}/>
    <path d="M${e+1} ${t+6} C${e+7} ${t+4} ${e+8} ${t+13} ${e+1} ${t+15} Z" fill="${s}"/>`}const Fx=xe({kind:"tulip-bed",name:"Tulip Bed",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`${$e(70,56,86)}
    <path d="M10 56 H130 L120 82 H20 Z" fill="#f0d2b0" ${M()}/>
    <path d="M96 58 H126 L118 78 H92 Z" fill="#d4a373"/>
    <path d="M16 56 Q70 42 124 56 Q70 64 16 56 Z" fill="#c4a484" ${M(2.2)}/>
    ${re("M22 60 h24")}
    ${wi(32,16,"#ff8fab","#e45d88")}
    ${wi(54,8,"#ffd166","#e0a83a")}
    ${wi(76,4,"#ff7096","#e04578")}
    ${wi(98,12,"#fff","#ffd0e0")}
    ${wi(118,18,"#c9a0dc","#b388d6")}`}),Zx=xe({kind:"birdbath",name:"Birdbath",cat:"decor",w:84,h:126,vb:"0 0 80 120",svg:`<defs>${Af("ydbathW","#f3fbff","#8ecae6")}</defs>
    ${$e(40,28,114)}
    <ellipse cx="40" cy="106" rx="20" ry="7" fill="#e7eef2" ${M()}/>
    <path d="M30 46 H50 C56 70 58 86 52 104 H28 C22 86 24 70 30 46 Z" fill="#f4f7f8" ${M()}/>
    <path d="M42 52 H50 C54 72 54 88 50 100 H44 Z" fill="#c5d0d6"/>
    ${re("M33 62 v22")}
    <ellipse cx="40" cy="40" rx="32" ry="13" fill="#f7fafb" ${M()}/>
    <path d="M40 28 C66 28 72 38 72 42 C72 52 58 54 40 54 C60 54 68 48 68 42 C68 36 58 32 40 34 Z" fill="#d5dee4"/>
    <ellipse cx="40" cy="38" rx="22" ry="7" fill="url(#ydbathW)" ${M(2.2)}/>
    ${re("M22 36 q10 -4 18 0")}
    <path d="M48 30 L40 24 L42 34 Z" fill="#f0c45c" ${M(1.6)}/>
    <ellipse cx="56" cy="28" rx="11" ry="6" fill="#ffd166" ${M(1.8)}/>
    <circle cx="66" cy="24" r="4.5" fill="#ffe08a" ${M(1.6)}/>
    <path d="M70 24 L77 26 L70 28 Z" fill="#e07a3f"/>
    <circle cx="67" cy="23" r="1" fill="${ct}"/>
    <path d="M54 32 V40 M60 32 V40" fill="none" stroke="#c99366" stroke-width="1.4" stroke-linecap="round"/>`}),Gx=xe({kind:"lily-pond",name:"Lily Pond",cat:"decor",w:170,h:90,vb:"0 0 170 90",svg:`<defs>${Af("ydpondW","#eaf6ff","#5aa9e6")}</defs>
    ${$e(85,70,84)}
    <ellipse cx="85" cy="54" rx="74" ry="28" fill="#c4a484" ${M()}/>
    <path d="M85 30 C142 32 158 48 158 56 C158 72 126 82 85 82 C124 80 150 68 150 56 C150 44 126 36 85 36 Z" fill="#a88462"/>
    <ellipse cx="85" cy="52" rx="62" ry="20" fill="url(#ydpondW)" ${M(2.2)}/>
    ${re("M40 46 q24 -8 42 2")}
    <path fill="#95d5b2" ${M(2)} fill-rule="evenodd" d="M58 54 m-16 0 a16 7 0 1 0 32 0 a16 7 0 1 0 -32 0 M58 50 L72 54 L58 58 Z"/>
    <path d="M66 50 L74 54 L66 56 Z" fill="#3d9a68"/>
    <path fill="#74c69d" ${M(2)} fill-rule="evenodd" d="M112 48 m-18 0 a18 8 0 1 0 36 0 a18 8 0 1 0 -36 0 M112 42 L128 48 L112 54 Z"/>
    <path d="M40 58 q-4 -16 2 -22 q6 8 2 16" fill="#52b788" ${M(1.6)}/>
    <path d="M108 40 l2 -8 l4 6 l4 -7 l2 8 l-4 3 z" fill="#ff8fab" ${M(1.6)}/>
    <path d="M112 36 l3 -6 l2 5 l3 -5 l1 6 z" fill="#fff" ${M(1.4)}/>
    <circle cx="112" cy="40" r="2.4" fill="#ffd166"/>`});function ki(e,t,n,s,o=10){return`<path d="M${e} ${t-o-8} V${t-o}" fill="none" ${M(2.2)}/>
    <rect x="${e-4}" y="${t-o-2}" width="8" height="5" rx="1" fill="#c99366" ${M(1.8)}/>
    <circle cx="${e}" cy="${t}" r="${o}" fill="${n}" ${M()}/>
    <path d="M${e+1} ${t-o+3} H${e+o-1} V${t+o-3} H${e+2} Z" fill="${s}"/>
    ${re(`M${e-o+3} ${t-2} q2 -3 4 0`)}`}const Yx=xe({kind:"patio-lights",name:"Patio Lights",cat:"decor",w:190,h:70,vb:"0 0 180 70",wall:!0,svg:`<path d="M8 12 Q50 32 90 12 Q130 32 172 14" fill="none" ${M()}/>
    ${ki(28,40,"#fff6c8","#f0c45c")}
    ${ki(64,46,"#ffc2d4","#e45d88")}
    ${ki(100,36,"#fff1c2","#f0c45c")}
    ${ki(136,46,"#c9f1ff","#7eb4dc")}
    ${ki(164,34,"#ffd0e8","#e888a8",8)}`}),Kx=xe({kind:"toadstool-light",name:"Toadstool Light",cat:"decor",w:70,h:84,vb:"0 0 80 96",svg:`<defs>${Pf("ydtoadG","#ffe7a0",".9")}</defs>
    ${$e(40,26,90)}
    <ellipse cx="40" cy="70" rx="18" ry="8" fill="url(#ydtoadG)"/>
    <path d="M32 58 H48 L52 84 H28 Z" fill="#fff7f8" ${M()}/>
    <path d="M42 60 H48 L50 82 H43 Z" fill="#f0d8cc"/>
    <path d="M6 58 Q40 8 74 58 Q40 74 6 58 Z" fill="#ff8fab" ${M()}/>
    <path d="M44 22 Q66 16 72 54 Q52 66 44 52 Z" fill="#e45d88"/>
    ${re("M18 48 q16 -12 26 -2")}
    <circle cx="26" cy="48" r="5" fill="#fff" ${M(2)}/>
    <circle cx="44" cy="40" r="6" fill="#fff" ${M(2)}/>
    <circle cx="36" cy="56" r="3.5" fill="#fff" ${M(2)}/>
    <path d="M22 52 h6 M40 46 h8" fill="none" stroke="#ffd0e0" stroke-width="1.2" stroke-linecap="round"/>`}),Xx=xe({kind:"stepping-stones",name:"Stepping Stones",cat:"decor",w:160,h:64,vb:"0 0 160 70",svg:`${$e(80,66,64)}
    <path d="M8 40 L24 28 L50 32 L54 50 L30 58 L10 52 Z" fill="#f7f4ef" ${M()}/>
    <path d="M34 36 L50 32 L54 50 L36 54 Z" fill="#d9d3cc"/>
    <path d="M56 44 L78 32 L108 36 L112 56 L80 64 L58 58 Z" fill="#f4f1ec" ${M()}/>
    <path d="M86 40 L108 36 L112 56 L90 58 Z" fill="#d4cdc4"/>
    <path d="M110 30 L128 20 L154 28 L150 48 L124 52 L108 42 Z" fill="#e7e2dc" ${M()}/>
    <path d="M132 26 L152 28 L148 46 L130 44 Z" fill="#d0c9c2"/>
    ${re("M16 38 q8 -4 14 0")}
    ${ft("M22 44 h12 M72 48 h16 M124 36 h12")}`}),Jx=xe({kind:"pinwheel",name:"Pinwheel",cat:"decor",w:56,h:90,vb:"0 0 70 100",holdable:!0,svg:`${$e(35,16,96)}
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
    <circle cx="34" cy="40" r="1.8" fill="${ct}"/>`}),e5=xe({kind:"rain-barrel",name:"Rain Barrel",cat:"decor",w:86,h:108,vb:"0 0 80 110",svg:`${$e(40,30,104)}
    <path d="M22 30 C12 48 12 78 22 98 H58 C68 78 68 48 58 30 Z" fill="#8ecae6" ${M()}/>
    <path d="M46 34 C58 48 60 76 54 96 H58 C66 76 66 50 56 32 Z" fill="#5aa9c6"/>
    ${ft("M28 40 v48 M36 36 v54 M44 38 v50")}
    ${re("M24 42 v24")}
    <ellipse cx="40" cy="30" rx="20" ry="8" fill="#bde0fe" ${M()}/>
    <ellipse cx="46" cy="30" rx="10" ry="5" fill="#7eb4dc"/>
    <path d="M16 48 H64" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <path d="M14 74 H66" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <rect x="56" y="78" width="14" height="7" rx="2" fill="#d7ecff" ${M(2)}/>
    <path d="M70 81 h6" fill="none" ${M(2)}/>
    <path d="M34 18 q6 -8 12 0" fill="none" stroke="#7eb4dc" stroke-width="2.2" stroke-linecap="round"/>`}),t5=xe({kind:"butterfly-bush",name:"Butterfly Bush",cat:"plants",w:120,h:130,vb:"0 0 100 120",svg:`${$e(50,40,114)}
    <ellipse cx="32" cy="86" rx="22" ry="18" fill="#95d5b2" ${M(2.2)}/>
    <ellipse cx="70" cy="84" rx="24" ry="20" fill="#3d9a68" ${M(2.2)}/>
    <ellipse cx="50" cy="78" rx="36" ry="28" fill="#74c69d" ${M()}/>
    <path d="M18 90 Q50 108 84 88 Q68 100 50 102 Q30 100 18 90 Z" fill="#3d9a68"/>
    ${re("M24 68 q14 -8 26 2")}
    ${ft("M28 80 q4 6 0 10 M46 72 q5 8 0 12 M66 78 q4 6 0 10")}
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
    <ellipse cx="18" cy="32" rx="2" ry="7" fill="${ct}"/>
    <path d="M16 26 Q12 18 10 14 M20 26 Q24 18 28 14" fill="none" stroke="${ct}" stroke-width="1.3" stroke-linecap="round"/>`}),n5=xe({kind:"hedge-row",name:"Hedge Row",cat:"plants",w:190,h:96,vb:"0 0 180 96",svg:`${$e(90,78,90)}
    <path d="M16 84 C28 70 40 62 52 66 C62 52 78 50 90 62 C102 50 118 52 128 66 C140 58 156 64 164 74 L164 86 L16 86 Z" fill="#2f7d52"/>
    <path d="M10 82 L10 60 C10 50 18 46 26 50 C32 34 46 32 54 48 C60 30 76 28 84 46 C92 28 108 28 116 46 C124 30 140 32 148 48 C156 36 166 42 170 54 L170 82 Z" fill="#74c69d" ${M()}/>
    <path d="M148 46 C160 38 170 50 170 70 L170 82 L140 82 L146 58 Z" fill="#52b788"/>
    <path d="M22 64 C40 54 58 58 70 50 C84 60 100 48 116 56 C128 48 146 56 158 64" fill="none" stroke="#95d5b2" stroke-width="6" stroke-linecap="round" opacity=".85"/>
    <path d="M14 68 C48 78 132 76 166 66 L168 82 L12 82 Z" fill="#3d9a68"/>
    ${ft("M28 58 q3 5 0 8 M48 54 q3 6 0 9 M70 52 q3 6 1 9 M94 52 q3 6 0 10 M118 54 q3 6 0 9 M142 56 q3 5 0 8")}
    ${re("M18 58 q10 -4 16 1")}
    ${re("M58 42 q12 -4 16 2")}`}),s5=xe({kind:"lemonade-cup",name:"Lemonade Cup",cat:"food",w:52,h:70,vb:"0 0 70 90",holdable:!0,svg:`${$e(35,22,84)}
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
    ${re("M24 38 v14")}`}),o5=xe({kind:"picnic-table",name:"Picnic Table",cat:"furniture",w:180,h:110,vb:"0 0 160 100",svg:`${$e(80,68,96)}
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
    ${re("M28 40 h36")}
    ${ft("M40 42 h50 M34 66 h70")}`}),i5=xe({kind:"seesaw",name:"Seesaw",cat:"furniture",w:200,h:80,vb:"0 0 180 80",svg:`${$e(90,74,76)}
    <path d="M78 58 H102 L96 74 H84 Z" fill="#f3d2aa" ${M()}/>
    <path d="M94 60 H100 L96 72 H92 Z" fill="#c99366"/>
    <rect x="10" y="40" width="160" height="12" rx="3" fill="#ffd166" ${M()} transform="rotate(-8 90 46)"/>
    <rect x="130" y="28" width="28" height="8" fill="#e0a83a"/>
    <rect x="16" y="34" width="28" height="10" rx="2" fill="#ff8fab" ${M(2)}/>
    <rect x="136" y="22" width="28" height="10" rx="2" fill="#8ecae6" ${M(2)}/>
    ${re("M24 44 h40")}`}),a5=xe({kind:"wagon",name:"Wagon",cat:"furniture",w:130,h:90,vb:"0 0 130 90",svg:`${$e(64,50,86)}
    <circle cx="36" cy="74" r="12" fill="${ct}" ${M(2)}/><circle cx="36" cy="74" r="5" fill="#ffd166"/>
    <circle cx="96" cy="74" r="12" fill="${ct}" ${M(2)}/><circle cx="96" cy="74" r="5" fill="#ffd166"/>
    <path d="M22 40 H108 L100 68 H30 Z" fill="#e45d88" ${M()}/>
    <path d="M86 42 H106 L100 66 H84 Z" fill="#c93b68"/>
    <rect x="28" y="28" width="76" height="14" rx="3" fill="#ff8fab" ${M()}/>
    <path d="M108 36 H122 L118 58" fill="none" ${M(2.4)}/>
    ${re("M32 46 h28")}
    ${ft("M40 54 h40")}`}),r5=xe({kind:"birdhouse",name:"Birdhouse",cat:"decor",w:70,h:120,vb:"0 0 80 130",svg:`${$e(40,22,124)}
    <rect x="34" y="70" width="12" height="50" rx="2" fill="#d4a373" ${M()}/>
    <rect x="40" y="74" width="5" height="42" fill="#c99366"/>
    <path d="M12 62 L40 28 L68 62 Z" fill="#e45d88" ${M()}/>
    <path d="M40 32 L66 60 H52 Z" fill="#c93b68"/>
    <rect x="18" y="60" width="44" height="36" rx="3" fill="#f6e0c4" ${M()}/>
    <rect x="48" y="64" width="10" height="28" fill="#e7c49a"/>
    <circle cx="40" cy="76" r="7" fill="#5a3d5c"/>
    <rect x="36" y="86" width="14" height="4" rx="1" fill="#d4a373" ${M(1.6)}/>
    ${re("M22 66 h12")}`}),l5=xe({kind:"sprinkler",name:"Sprinkler",cat:"decor",w:80,h:70,vb:"0 0 100 80",svg:`${$e(50,28,76)}
    <ellipse cx="50" cy="66" rx="22" ry="8" fill="#74c69d" ${M()}/>
    <rect x="44" y="40" width="12" height="26" rx="3" fill="#8ecae6" ${M()}/>
    <circle cx="50" cy="36" r="8" fill="#ffd166" ${M()}/>
    <path d="M50 28 C30 16 18 20 12 10" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 28 C70 14 84 18 90 8" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 26 C40 8 58 4 50 2" fill="none" stroke="#c9ecff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="12" cy="10" r="2.2" fill="#c9ecff"/><circle cx="90" cy="8" r="2.2" fill="#c9ecff"/><circle cx="50" cy="2" r="2.2" fill="#fff"/>
    ${re("M46 44 v10")}`}),c5=xe({kind:"beach-ball",name:"Beach Ball",cat:"decor",w:70,h:70,vb:"0 0 80 80",svg:`${$e(40,26,76)}
    <circle cx="40" cy="40" r="28" fill="#fff" ${M()}/>
    <path d="M40 12 A28 28 0 0 1 66 32 L40 40 Z" fill="#ff8fab"/>
    <path d="M66 48 A28 28 0 0 1 40 68 L40 40 Z" fill="#ffd166"/>
    <path d="M24 64 A28 28 0 0 1 14 36 L40 40 Z" fill="#8ecae6"/>
    <path d="M18 28 A28 28 0 0 1 40 12 L40 40 Z" fill="#b7e4c7"/>
    <circle cx="40" cy="40" r="5" fill="#fff" ${M(2)}/>
    ${re("M28 24 q6 -4 10 2")}`}),d5=xe({kind:"patio-umbrella",name:"Patio Umbrella",cat:"furniture",w:150,h:180,vb:"0 0 120 150",svg:`${$e(60,36,144)}
    <path d="M10 58 Q60 18 110 58 L98 64 Q60 32 22 64 Z" fill="#ffb3c6" ${M()}/>
    <path d="M60 22 L108 56 L96 62 Z" fill="#e45d88"/>
    <path d="M28 40 Q44 30 60 36 Q76 28 96 42" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <rect x="56" y="58" width="8" height="78" rx="2" fill="#f3d2aa" ${M()}/>
    <rect x="60" y="62" width="3" height="70" fill="#d4a373"/>
    <rect x="40" y="128" width="40" height="8" rx="2" fill="#e7c49a" ${M(2)}/>
    ${re("M24 50 q16 -8 24 0")}`}),f5=xe({kind:"veggie-patch",name:"Vegetable Patch",cat:"plants",w:150,h:80,vb:"0 0 150 80",svg:`${$e(75,62,76)}
    <rect x="8" y="28" width="134" height="44" rx="4" fill="#c99366" ${M()}/>
    <rect x="16" y="34" width="118" height="32" fill="#8d6e4c"/>
    <path d="M36 48 C36 36 48 34 48 46 C48 34 60 36 58 48 Z" fill="#74c69d" ${M(2)}/>
    <path d="M78 50 C78 38 90 36 90 48 C90 36 102 38 100 50 Z" fill="#52b788" ${M(2)}/>
    <path d="M112 52 L120 30 L128 52 Z" fill="#ff922b" ${M(2)}/>
    <path d="M118 32 Q124 22 130 28" fill="none" stroke="#2f7d52" stroke-width="2" stroke-linecap="round"/>
    ${re("M18 36 h24")}`}),h5=xe({kind:"hammock",name:"Hammock",cat:"furniture",w:190,h:110,vb:"0 0 170 100",svg:`${$e(85,70,96)}
    <rect x="8" y="18" width="10" height="74" rx="2" fill="#d4a373" ${M()}/>
    <rect x="152" y="18" width="10" height="74" rx="2" fill="#c99366" ${M()}/>
    <path d="M18 28 Q85 78 152 28" fill="none" stroke="#5a3d5c" stroke-width="2"/>
    <path d="M18 36 Q85 88 152 36 L152 48 Q85 96 18 48 Z" fill="#8ecae6" ${M()}/>
    <path d="M120 40 Q140 62 150 44 L150 54 Q136 74 112 52 Z" fill="#5fb0d8"/>
    ${re("M36 46 q24 10 30 4")}
    ${ft("M40 58 q30 16 50 4")}`}),u5=xe({kind:"garden-gnome",name:"Garden Gnome",cat:"decor",w:64,h:100,vb:"0 0 70 110",svg:`${$e(35,22,104)}
    <path d="M18 78 H52 L48 100 H22 Z" fill="#3d7ec4" ${M()}/>
    <path d="M40 80 H50 L48 98 H42 Z" fill="#2c5f96"/>
    <circle cx="35" cy="62" r="16" fill="#f6d2b5" ${M()}/>
    <path d="M20 66 Q35 78 50 66 Q46 74 35 76 Q24 74 20 66 Z" fill="#fff"/>
    <circle cx="29" cy="60" r="2" fill="${ct}"/><circle cx="41" cy="60" r="2" fill="${ct}"/>
    <path d="M16 52 L35 18 L54 52 Z" fill="#e45d88" ${M()}/>
    <path d="M35 22 L52 50 H42 Z" fill="#c93b68"/>
    <ellipse cx="35" cy="52" rx="16" ry="4" fill="#ff8fab" ${M(2)}/>
    ${re("M22 40 l8 -8")}`}),Sa=[Dx,Hx,Wx,Vx,Ux,zx,Qx,Nx,jx,Fx,Zx,Gx,Yx,Kx,Xx,Jx,e5,t5,n5,s5,o5,i5,a5,r5,l5,c5,d5,f5,h5,u5];function p5(e,t){for(const n of Sa)t[n.kind]||(e.push(n),t[n.kind]=n)}function vc(e,t,n){return`<g>
    <ellipse cx="${e-22*n}" cy="${t}" rx="${26*n}" ry="${14*n}" fill="#fff"/>
    <ellipse cx="${e+18*n}" cy="${t-2*n}" rx="${30*n}" ry="${16*n}" fill="#fff"/>
    <ellipse cx="${e}" cy="${t+4*n}" rx="${34*n}" ry="${13*n}" fill="#fff"/>
  </g>`}function g5(e,t,n,s,o){const a=l=>`<rect x="${e-2}" y="${l}" width="${t-e+12+4}" height="8" rx="3" fill="#fff" ${M(2.2)}/><rect x="${(t-40).toFixed(1)}" y="${l+1}" width="30" height="6" rx="2" fill="#d5ead8"/>`;let r=a(n+26)+a(s-28);for(let l=e;l<=t;l+=o)r+=`<path d="M${l} ${n+12} L${l+12/2} ${n} L${l+12} ${n+12} V${s} H${l} Z" fill="#f7fff8" ${M(2.2)}/>`,r+=`<path d="M${(l+12*.58).toFixed(1)} ${n+10} H${l+12-1} V${s-4} H${(l+12*.58).toFixed(1)} Z" fill="#d5ead8"/>`,r+=`<path d="M${l+2} ${n+18} v22" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".75" fill="none"/>`;return r}function m5(e,t){const s=150+46*t,o=372-s;return`<g id="yardTree">
    <rect x="${e-14*t}" y="${s}" width="${28*t}" height="${o}" rx="${6*t}" fill="#e7b98a" ${M()}/>
    <rect x="${e+4*t}" y="${s+8*t}" width="${8*t}" height="${o-16*t}" fill="#c99366"/>
    ${ft(`M${e-4*t} ${s+28*t} v${36*t}`)}
    ${re(`M${e-8*t} ${s+16*t} v${22*t}`)}
    <ellipse cx="${e+8*t}" cy="${150+18*t}" rx="${78*t}" ry="${46*t}" fill="#2f7d52"/>
    <ellipse cx="${e-48*t}" cy="${150+10*t}" rx="${36*t}" ry="${30*t}" fill="#245e3e"/>
    <ellipse cx="${e-34*t}" cy="${150+16*t}" rx="${42*t}" ry="${34*t}" fill="#95d5b2" ${M(2.2)}/>
    <ellipse cx="${e}" cy="150" rx="${68*t}" ry="${50*t}" fill="#74c69d" ${M()}/>
    <ellipse cx="${e+40*t}" cy="${150+8*t}" rx="${40*t}" ry="${36*t}" fill="#3d9a68" ${M(2.2)}/>
    <ellipse cx="${e-8*t}" cy="${150-6*t}" rx="${28*t}" ry="${20*t}" fill="#b7e4c7" opacity=".95"/>
    ${ft(`M${e-20*t} ${150+8*t} q${8*t} ${6*t} 0 ${12*t} M${e+10*t} ${150-4*t} q${8*t} ${6*t} 2 ${12*t} M${e+28*t} ${150+12*t} q${6*t} ${5*t} 0 ${10*t}`)}
    ${re(`M${e-36*t} ${150-18*t} q${16*t} -8 ${28*t} 2`)}
  </g>`}function y5(){return`<svg class="yardWorld" viewBox="0 0 2400 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ydsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6eb6e8"/>
        <stop offset=".48" stop-color="#c5e6fb"/>
        <stop offset="1" stop-color="#fff3df"/>
      </linearGradient>
      ${Pf("ydsun","#ffe566",".55")}
    </defs>
    <rect width="2400" height="430" fill="url(#ydsky)"/>
    <circle id="ydSunGlow" cx="1180" cy="68" r="62" fill="url(#ydsun)"/>
    <circle id="ydSun" cx="1180" cy="68" r="30" fill="#ffe566"/>
    <circle cx="1170" cy="58" r="8" fill="#fff" opacity=".8"/>
    ${vc(980,96,1.05)}${vc(1320,78,.85)}${vc(1500,120,.7)}
    <rect y="360" width="2400" height="240" fill="#c6ef9a"/>
    <rect y="360" width="2400" height="28" fill="#e7f8c8"/>
    <rect y="520" width="2400" height="80" fill="#9ed67a"/>
    <path d="M1040 470 q30 -12 16 -6 M1200 510 q28 -12 14 -4 M1360 548 q24 -10 12 -4" fill="none" stroke="#3d9a68" stroke-width="1.2" stroke-linecap="round" opacity=".22"/>
    ${g5(846,2118,258,372,24)}
    ${m5(1184,.8)}
    <path d="M840 120 H1076 L1054 152 H862 Z" fill="#ffb3c6" ${M()}/>
    <path d="M960 126 H1064 L1046 148 H976 Z" fill="#e45d88"/>
    ${re("M876 132 h56")}
    <rect x="864" y="150" width="196" height="222" rx="4" fill="#fff6ea" ${M()}/>
    <rect x="1044" y="156" width="12" height="210" fill="#f0dcc4"/>
    ${ft("M880 174 H1000 M880 202 H1000 M880 230 H990 M880 294 H1000 M880 334 H980")}
    <rect x="884" y="180" width="44" height="36" rx="4" fill="#c9ecff" ${M(2.2)}/>
    <rect x="912" y="184" width="12" height="28" fill="#8ecae6"/>
    <path d="M906 180 V216 M884 198 H928" fill="none" ${M(2.2)}/>
    ${re("M890 188 h12")}
  </svg>`}function b5(e,t,n,s,o){const i=(600-t)/600*100,a=(n/2400*100).toFixed(3),r=(s/600*100).toFixed(3);return o==="right"?`right:${((2400-(e+n/2))/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`:`left:${((e-n/2)/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`}function w5(){return`<svg class="doorArt" viewBox="0 0 100 230">
    <rect x="4" y="2" width="92" height="226" rx="3" fill="#f3d2aa" ${M()}/>
    <rect x="76" y="6" width="16" height="218" fill="#d4a373"/>
    <rect x="14" y="12" width="72" height="206" rx="2" fill="#f6e9ff" ${M(2.2)}/>
    <rect x="70" y="16" width="12" height="198" fill="#d4b4e6"/>
    <rect x="24" y="22" width="52" height="42" rx="3" fill="#c9ecff" ${M(2.2)}/>
    <rect x="60" y="26" width="12" height="34" fill="#8ecae6"/>
    <path d="M50 22 V64 M24 43 H76" fill="none" ${M(2.2)}/>
    ${re("M28 28 h18")}
    <rect x="24" y="76" width="52" height="56" rx="3" fill="#f7ecff" ${M(2.2)}/>
    <rect x="62" y="80" width="10" height="48" fill="#e0c8f0"/>
    ${re("M28 84 v22")}
    <rect x="24" y="144" width="52" height="56" rx="3" fill="#f7ecff" ${M(2.2)}/>
    <rect x="62" y="148" width="10" height="48" fill="#e0c8f0"/>
    <circle cx="64" cy="126" r="4.2" fill="#ffd166" ${M(2.2)}/>
    <rect x="10" y="214" width="80" height="10" rx="2" fill="#e7c49a" ${M(2.2)}/>
  </svg>`}function k5(e){const t=e==="living"?ug:pg,n=e==="living"?"backyard":"living",s=e==="living"?"Backyard":"Back inside",o=e==="yard"?"right":"left";return`<button type="button" class="yardDoor" data-yard-go="${n}" aria-label="${s}" style="${b5(t.x,t.y,t.w,t.h,o)}">${w5()}<span class="yardHintLabel"><span>${s}</span></span></button>`}function Rf(e,t){const n=e.replace(/[&<>]/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[s]);return`<figure class="ysCard"><div class="ysArt">${t}</div><figcaption>${n}</figcaption></figure>`}function v5(){return`<div class="yardSheet" data-yard-sheet="1"><h1>Backyard pieces</h1><div class="ysGrid">${Sa.map(t=>Rf(t.name,Ut(t))).join("")}</div></div>`}function _5(e,t){return Rf(e,`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${t}</svg>`)}function $5(){const e=(r,l)=>$e(r,l,96.4),t=`
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
    <rect x="16" y="84" width="7" height="10" rx="2" fill="${ct}"/>
    <rect x="77" y="84" width="7" height="10" rx="2" fill="${ct}"/>`,n=`
    <defs>${Pf("a2lamp-glow","#ffd56a",".95")}</defs>
    ${e(50,22)}
    <path d="M34 8 L42 8 L37 40 L24 40 Z" fill="#fff6d4"/>
    <path d="M42 8 L50 8 L50 40 L37 40 Z" fill="#ffe08a"/>
    <path d="M50 8 L58 8 L63 40 L50 40 Z" fill="#f0c45c"/>
    <path d="M58 8 L66 8 L76 40 L63 40 Z" fill="#e0a83a"/>
    <path d="M24 40 L34 8 H66 L76 40 Z" fill="none" ${M()}/>
    <path d="M42 8 L37 40 M50 8 V40 M58 8 L63 40" fill="none" stroke="${ct}" stroke-width="2" stroke-linecap="round"/>
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
    <path d="M28 62 h14" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>`,o=Object.fromEntries(Sa.map(r=>[r.kind,r])),i=(r,l,c)=>_5(r,l)+Rf(o[c].name,Ut(o[c]));return`<div class="yardSheet yardCompare" data-yard-compare="1"><h1>House style and the yard</h1><p class="ysNote">Sofa, lamp, and plant are the approved refresh. Swing, cart, and birdbath use the same light.</p><div class="ysPair">${i("Sofa",t,"yard-swing")+i("Lamp",n,"lemonade-cart")+i("Plant",s,"birdbath")}</div></div>`}const Ai="#5a3d5c",K=`stroke="${Ai}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,br='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>',gg=[{kind:"soaking-tub",name:"Soaking Tub",cat:"furniture",w:250,h:200,vb:"0 0 120 96",svg:`<ellipse cx="60" cy="92" rx="48" ry="3.2" fill="#000" opacity=".12"/><rect x="18" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${K}/><rect x="92" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${K}/><path d="M14 58 Q8 58 10 46 L22 28 H98 L110 46 Q112 58 106 58 Z" fill="#fff" ${K}/><ellipse cx="60" cy="30" rx="44" ry="14" fill="#fff" ${K}/><ellipse cx="60" cy="32" rx="34" ry="9" fill="#d7f3ff"/><path d="M28 34 Q60 42 92 34" fill="none" stroke="#b9e6f8" stroke-width="4"/><rect x="96" y="8" width="8" height="22" rx="4" fill="#f7d27a" ${K}/><path d="M100 28 Q112 34 104 44" fill="none" ${K}/><circle cx="104" cy="46" r="3.2" fill="#a8d4ea" ${K}/><ellipse cx="46" cy="30" rx="8" ry="3" fill="#fff" opacity=".7"/>`},{kind:"bath-toilet",name:"Toilet",cat:"furniture",w:120,h:160,vb:"0 0 100 134",svg:`<ellipse cx="50" cy="128" rx="34" ry="4" fill="#000" opacity=".12"/><rect x="28" y="8" width="44" height="36" rx="8" fill="#fff" ${K}/><rect x="34" y="16" width="32" height="16" rx="4" fill="#e7f6ff"/><rect x="46" y="42" width="8" height="10" fill="#f4f7fb" ${K}/><ellipse cx="50" cy="78" rx="36" ry="22" fill="#fff" ${K}/><ellipse cx="50" cy="74" rx="24" ry="14" fill="#d7f3ff" ${K}/><path d="M18 70 Q50 58 82 70" fill="#fff" ${K}/><rect x="40" y="96" width="20" height="24" rx="4" fill="#f7f4ef" ${K}/>`},{kind:"sink-vanity",name:"Sink Vanity",cat:"furniture",w:210,h:190,vb:"0 0 110 100",svg:`<ellipse cx="55" cy="96" rx="46" ry="3.2" fill="#000" opacity=".12"/><rect x="10" y="48" width="90" height="42" rx="8" fill="#f6e2c4" ${K}/><path d="M55 48 V90" ${K}/><circle cx="28" cy="70" r="3" fill="${Ai}"/><circle cx="82" cy="70" r="3" fill="${Ai}"/><rect x="16" y="90" width="8" height="6" rx="2" fill="${Ai}"/><rect x="86" y="90" width="8" height="6" rx="2" fill="${Ai}"/><ellipse cx="55" cy="44" rx="40" ry="12" fill="#fff" ${K}/><ellipse cx="55" cy="44" rx="26" ry="7" fill="#d7f3ff"/><rect x="50" y="10" width="10" height="28" rx="4" fill="#f7d27a" ${K}/><path d="M55 36 Q70 40 66 48" fill="none" ${K}/><rect x="8" y="40" width="94" height="8" rx="3" fill="#f3d2b5" ${K}/>`},{kind:"bath-mirror",name:"Bath Mirror",cat:"decor",w:120,h:160,wall:!0,vb:"0 0 90 120",svg:`<path d="M45 8 C70 8 82 28 82 58 C82 92 68 112 45 112 C22 112 8 92 8 58 C8 28 20 8 45 8 Z" fill="#f7d27a" ${K}/><ellipse cx="45" cy="60" rx="26" ry="40" fill="#d7f4ff" ${K}/><path d="M30 36 l8 -8 M28 52 l18 -16" stroke="#fff" stroke-width="4" stroke-linecap="round"/><rect x="38" y="2" width="14" height="8" rx="3" fill="#f28fa6" ${K}/>`},{kind:"towel-bar",name:"Towel Bar",cat:"decor",w:170,h:116,wall:!0,vb:"0 0 150 102",svg:`<rect x="10" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${K}/><rect x="130" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${K}/><rect x="14" y="16" width="122" height="8" rx="4" fill="#c98d55" ${K}/><path d="M26 24 H124 V70 Q75 100 26 70 Z" fill="#f7d7e4" ${K}/><path d="M75 24 V88" stroke="#f28fa6" stroke-width="3"/><path d="M40 36 H110" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"bath-mat",name:"Bath Mat",cat:"decor",w:230,h:120,vb:"0 0 160 84",svg:`<ellipse cx="80" cy="78" rx="70" ry="5" fill="#000" opacity=".1"/><rect x="12" y="22" width="136" height="48" rx="18" fill="#f28fa6" ${K}/><rect x="24" y="32" width="112" height="28" rx="12" fill="#f7d7e4"/><path d="M40 46 H120 M40 54 H120" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>`},{kind:"rubber-ducky",name:"Rubber Ducky",cat:"decor",w:80,svg:`${br}<ellipse cx="48" cy="68" rx="30" ry="26" fill="#f7d27a" ${K}/><circle cx="68" cy="40" r="18" fill="#ffe9a8" ${K}/><path d="M82 38 H98 Q102 44 92 48 H82 Z" fill="#f28fa6" ${K}/><ellipse cx="36" cy="74" rx="12" ry="8" fill="#f3c15a"/>`},{kind:"shower-curtain",name:"Shower Curtain",cat:"decor",w:150,h:260,holdable:!1,vb:"0 0 90 156",svg:`<rect x="8" y="8" width="74" height="8" rx="3" fill="#c98d55" ${K}/><circle cx="22" cy="16" r="3" fill="#f7d27a" ${K}/><circle cx="40" cy="16" r="3" fill="#f7d27a" ${K}/><circle cx="58" cy="16" r="3" fill="#f7d27a" ${K}/><circle cx="72" cy="16" r="3" fill="#f7d27a" ${K}/><path d="M12 18 Q8 80 16 146 H40 Q30 80 36 18 Z" fill="#d7f4ff" ${K}/><path d="M36 18 Q34 80 46 146 H74 Q84 80 78 18 Z" fill="#f7d7e4" ${K}/><path d="M24 40 Q18 70 26 100 M58 40 Q66 70 58 110" fill="none" stroke="#fff" stroke-width="3" opacity=".65"/>`},{kind:"soap-dish",name:"Soap Dish",cat:"decor",w:90,svg:`${br}<ellipse cx="50" cy="78" rx="34" ry="12" fill="#fff" ${K}/><ellipse cx="50" cy="74" rx="26" ry="7" fill="#e7f6ff"/><rect x="28" y="48" width="44" height="22" rx="8" fill="#f7d7e4" ${K}/><path d="M36 56 H64" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"laundry-hamper",name:"Laundry Hamper",cat:"furniture",w:140,h:160,vb:"0 0 100 114",svg:`<ellipse cx="50" cy="108" rx="36" ry="4" fill="#000" opacity=".12"/><path d="M18 40 H82 L74 100 H26 Z" fill="#b9a0dc" ${K}/><path d="M24 58 H76 M26 74 H74" stroke="#fff" stroke-width="3" opacity=".55"/><ellipse cx="50" cy="40" rx="34" ry="10" fill="#c9b6e8" ${K}/><path d="M22 36 Q50 18 78 36" fill="#f7d7e4" ${K}/><path d="M40 28 Q50 40 62 26" fill="none" stroke="#f28fa6" stroke-width="4" stroke-linecap="round"/>`},{kind:"bath-stool",name:"Bath Stool",cat:"furniture",w:110,svg:`${br}<ellipse cx="50" cy="58" rx="36" ry="12" fill="#f6e2c4" ${K}/><ellipse cx="50" cy="54" rx="28" ry="7" fill="#fff6ea"/><path d="M22 64 L16 92 M78 64 L84 92 M36 66 L34 92 M64 66 L66 92" ${K}/><path d="M18 90 H34 M66 90 H84" ${K}/>`}],x5=[{kind:"floor-cushion",name:"Floor Cushion",cat:"decor",w:150,h:136,vb:"0 0 130 118",svg:`<ellipse cx="65" cy="112" rx="50" ry="4" fill="#000" opacity=".12"/><ellipse cx="65" cy="68" rx="52" ry="40" fill="#f28fa6" ${K}/><ellipse cx="65" cy="58" rx="40" ry="24" fill="#f7d7e4"/><path d="M38 64 Q65 82 92 64" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"story-pillow",name:"Story Pillow",cat:"decor",w:120,h:100,vb:"0 0 110 92",svg:`<ellipse cx="55" cy="86" rx="40" ry="4" fill="#000" opacity=".12"/><rect x="14" y="28" width="82" height="52" rx="18" fill="#a8d4ea" ${K}/><path d="M55 40 l6 12 13 2 -10 8 2 13 -11 -7 -11 7 2 -13 -10 -8 13 -2 z" fill="#f7d27a" ${K}/>`},{kind:"berry-basket",name:"Berry Basket",cat:"food",w:100,svg:`${br}<path d="M22 48 H78 L70 88 H30 Z" fill="#f3d2b5" ${K}/><path d="M30 58 H70 M32 70 H68 M34 80 H66" ${K}/><circle cx="40" cy="40" r="10" fill="#f28fa6" ${K}/><circle cx="58" cy="36" r="10" fill="#c94b6a" ${K}/><circle cx="70" cy="48" r="8" fill="#b9a0dc" ${K}/><path d="M34 36 Q40 28 46 36" fill="none" stroke="#7dce8a" stroke-width="3"/>`},{kind:"ribbon-tray",name:"Ribbon Tray",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`<ellipse cx="70" cy="84" rx="52" ry="4" fill="#000" opacity=".12"/><rect x="16" y="40" width="108" height="36" rx="12" fill="#fff" ${K}/><rect x="22" y="46" width="96" height="22" rx="8" fill="#f7d7e4"/><rect x="36" y="28" width="16" height="22" rx="5" fill="#a8d4ea" ${K}/><rect x="58" y="22" width="14" height="28" rx="5" fill="#f7d27a" ${K}/><path d="M96 24 Q110 16 112 32 Q100 28 104 40 Q92 34 96 24 Z" fill="#f28fa6" ${K}/>`}],Oe="#5a3d5c",T=`stroke="${Oe}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Ao=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${Oe}"/><circle cx="${t}" cy="${n}" r="3" fill="${Oe}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,er=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,Ae='<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>',Ln=[{kind:"sofa",name:"Sofa",cat:"furniture",w:260,svg:`${Ae}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${T}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${T}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${T}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${T}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${T}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${Oe}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${Oe}"/>`},{kind:"armchair",name:"Armchair",cat:"furniture",w:150,svg:`${Ae}<rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${T}/><rect x="6" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${T}/><rect x="72" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${T}/><rect x="24" y="58" width="52" height="24" rx="10" fill="#b8e0f2" ${T}/><rect x="20" y="86" width="6" height="10" rx="2" fill="${Oe}"/><rect x="74" y="86" width="6" height="10" rx="2" fill="${Oe}"/>`},{kind:"bed",name:"Bed",cat:"furniture",w:300,svg:`${Ae}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${T}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${T}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${T}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${T}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${T}/>`},{kind:"table",name:"Table",cat:"furniture",w:200,svg:`${Ae}<rect x="4" y="30" width="92" height="14" rx="7" fill="#f4a261" ${T}/><rect x="14" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${T}/><rect x="76" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${T}/><path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".5"/>`},{kind:"chair",name:"Chair",cat:"furniture",w:100,svg:`${Ae}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${T}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${T}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${T}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${T}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/>`},{kind:"lamp",name:"Lamp",cat:"furniture",w:90,svg:`${Ae}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${T}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${T}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${T}/><circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>`},{kind:"fridge",name:"Fridge",cat:"furniture",w:150,svg:`${Ae}<rect x="16" y="4" width="68" height="90" rx="14" fill="#bde0fe" ${T}/><path d="M16 38 H84" ${T}/><rect x="70" y="14" width="5" height="16" rx="2" fill="${Oe}"/><rect x="70" y="46" width="5" height="22" rx="2" fill="${Oe}"/><circle cx="32" cy="22" r="5" fill="#ff8fab" ${T}/><rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${T}/>`},{kind:"stove",name:"Stove",cat:"furniture",w:170,svg:`${Ae}<rect x="8" y="26" width="84" height="68" rx="12" fill="#ffadad" ${T}/><rect x="8" y="18" width="84" height="14" rx="6" fill="#ffd6a5" ${T}/><rect x="20" y="46" width="60" height="36" rx="8" fill="#5a3d5c" opacity=".85"/><rect x="26" y="52" width="48" height="8" rx="4" fill="#fff" opacity=".25"/><circle cx="22" cy="38" r="3" fill="${Oe}"/><circle cx="36" cy="38" r="3" fill="${Oe}"/><circle cx="78" cy="38" r="3" fill="${Oe}"/>`},{kind:"bookshelf",name:"Shelf",cat:"furniture",w:170,svg:`${Ae}<rect x="10" y="4" width="80" height="90" rx="10" fill="#d4a373" ${T}/><path d="M10 34 H90 M10 64 H90" ${T}/><rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${T}/><rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${T}/><rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${T}/><rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${T}/><rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${T}/><circle cx="34" cy="80" r="8" fill="#ffadad" ${T}/>`},{kind:"tub",name:"Bathtub",cat:"furniture",w:240,svg:`${Ae}<circle cx="30" cy="40" r="7" fill="#bde0fe" ${T}/><circle cx="44" cy="34" r="9" fill="#e0f2ff" ${T}/><circle cx="60" cy="40" r="7" fill="#bde0fe" ${T}/><path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${T}/><rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${T}/><rect x="22" y="88" width="8" height="8" rx="2" fill="${Oe}"/><rect x="70" y="88" width="8" height="8" rx="2" fill="${Oe}"/>`},{kind:"rug",name:"Rug",cat:"decor",w:320,svg:`<ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${T}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${T}/><ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${T}/>`},{kind:"picture",name:"Picture",cat:"decor",w:130,wall:!0,svg:`<rect x="10" y="20" width="80" height="64" rx="8" fill="#ffd166" ${T}/><rect x="18" y="28" width="64" height="48" rx="4" fill="#bde0fe"/><circle cx="66" cy="40" r="7" fill="#fff3b0"/><path d="M18 76 L38 50 L52 64 L62 54 L82 76 Z" fill="#90e0a8" ${T}/>`},{kind:"window",name:"Window",cat:"decor",w:180,wall:!0,svg:`<rect class="winGlass" x="12" y="8" width="76" height="76" rx="38" fill="#a2d2ff" ${T}/><g class="winDay"><circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/></g><g class="winNight"><circle cx="62" cy="28" r="7" fill="#fff6d8"/><circle cx="28" cy="24" r="1.4" fill="#fff"/><circle cx="44" cy="20" r="1.1" fill="#fff"/><circle cx="70" cy="42" r="1.2" fill="#fff"/><circle cx="36" cy="46" r="1" fill="#fff"/></g><path d="M50 8 V84 M12 50 H88" ${T}/><path d="M4 8 Q20 40 10 90 M96 8 Q80 40 90 90" stroke="#ff8fab" stroke-width="9" fill="none" stroke-linecap="round"/>`},{kind:"clock",name:"Clock",cat:"decor",w:90,wall:!0,svg:`<circle cx="50" cy="50" r="38" fill="#fff" ${T}/><circle cx="50" cy="50" r="30" fill="#fff3b0"/><path d="M50 50 V28 M50 50 L64 58" ${T}/><circle cx="50" cy="50" r="3" fill="${Oe}"/>${er(30,70,66)}`},{kind:"stars",name:"Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M30 20 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffd166" ${T}/><path d="M70 40 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#ffadad" ${T}/><path d="M40 66 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#a2d2ff" ${T}/>`},{kind:"balloon",name:"Balloons",cat:"decor",w:110,svg:`<path d="M38 52 Q44 74 50 96 M64 46 Q58 72 50 96" stroke="${Oe}" stroke-width="2" fill="none"/><ellipse cx="36" cy="32" rx="18" ry="22" fill="#ff8fab" ${T}/><ellipse cx="66" cy="28" rx="18" ry="22" fill="#a2d2ff" ${T}/><ellipse cx="30" cy="24" rx="4" ry="7" fill="#fff" opacity=".6"/>`},{kind:"teddy",name:"Teddy",cat:"decor",w:100,svg:`${Ae}<circle cx="26" cy="22" r="10" fill="#d4a373" ${T}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${T}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${T}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${T}/>${Ao(40,60,36)}<ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/><circle cx="50" cy="46" r="2.5" fill="${Oe}"/>${er(32,68,46)}`},{kind:"ball",name:"Ball",cat:"decor",w:70,svg:`${Ae}<circle cx="50" cy="58" r="36" fill="#ffd166" ${T}/><path d="M18 46 Q50 66 82 46 M26 82 Q50 60 74 82" stroke="#ff7096" stroke-width="7" fill="none"/>`},{kind:"tv",name:"TV",cat:"decor",w:170,svg:`${Ae}<rect x="6" y="14" width="88" height="62" rx="14" fill="#c9a0dc" ${T}/><rect x="16" y="22" width="68" height="46" rx="8" fill="#a2d2ff"/><path d="M30 6 L44 14 M70 6 L56 14" ${T}/><rect x="36" y="78" width="28" height="16" rx="4" fill="#b388d6" ${T}/>${Ao(42,58,42)}<path d="M44 52 q6 5 12 0" ${T} fill="none"/>`},{kind:"plant",name:"Plant",cat:"plants",w:110,svg:`${Ae}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${T} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${T} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${T}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${T}/><rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${T}/>`},{kind:"cactus",name:"Cactus",cat:"plants",w:80,svg:`${Ae}<rect x="36" y="12" width="28" height="64" rx="14" fill="#80ed99" ${T}/><path d="M36 50 H24 a8 8 0 0 1 -8 -8 V34" fill="none" stroke="${Oe}" stroke-width="3.5"/><rect x="12" y="26" width="12" height="22" rx="6" fill="#80ed99" ${T}/><circle cx="50" cy="12" r="6" fill="#ff8fab" ${T}/>${Ao(44,56,40)}<path d="M28 74 H72 L66 96 H34 Z" fill="#c9a0dc" ${T}/>`},{kind:"flowers",name:"Flowers",cat:"plants",w:90,svg:`${Ae}<path d="M50 70 V30 M50 60 Q30 50 30 30 M50 60 Q70 50 70 30" stroke="#52b788" stroke-width="4" fill="none"/><circle cx="50" cy="26" r="10" fill="#ff8fab" ${T}/><circle cx="30" cy="28" r="9" fill="#ffd166" ${T}/><circle cx="70" cy="28" r="9" fill="#a2d2ff" ${T}/><circle cx="50" cy="26" r="3" fill="#fff"/><path d="M32 66 H68 L62 96 H38 Z" fill="#a2d2ff" ${T}/>`},{kind:"tree",name:"Mini Tree",cat:"plants",w:140,svg:`${Ae}<rect x="44" y="54" width="12" height="30" rx="4" fill="#b07d54" ${T}/><circle cx="50" cy="36" r="30" fill="#52b788" ${T}/><circle cx="38" cy="30" r="5" fill="#ff8fab"/><circle cx="62" cy="40" r="5" fill="#ff8fab"/><circle cx="52" cy="22" r="5" fill="#ff8fab"/><path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${T}/>`},{kind:"cake",name:"Cake",cat:"food",w:100,svg:`<rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${T}/><path d="M16 58 q8 10 17 0 q8 10 17 0 q8 10 17 0 q8 10 17 0" fill="#fff" ${T}/><rect x="46" y="28" width="8" height="22" rx="3" fill="#a2d2ff" ${T}/><path d="M50 14 q6 8 0 12 q-6 -4 0 -12" fill="#ffd166" ${T}/><ellipse cx="50" cy="92" rx="40" ry="5" fill="#fff" ${T}/>`},{kind:"apple",name:"Apple",cat:"food",w:60,svg:`<path d="M50 30 C20 18 8 50 22 74 C32 92 44 90 50 86 C56 90 68 92 78 74 C92 50 80 18 50 30 Z" fill="#ff6b6b" ${T}/><path d="M50 30 Q52 16 58 10" ${T} fill="none"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#80ed99" ${T} transform="rotate(-20 64 18)"/><ellipse cx="34" cy="46" rx="5" ry="9" fill="#fff" opacity=".5"/>`},{kind:"donut",name:"Donut",cat:"food",w:70,svg:`<circle cx="50" cy="58" r="36" fill="#e9c46a" ${T}/><path d="M18 52 Q20 26 50 24 Q80 26 82 52 Q76 62 66 56 Q56 66 46 58 Q34 66 24 58 Z" fill="#ff8fab" ${T}/><circle cx="50" cy="52" r="10" fill="#fff" ${T}/><rect x="30" y="36" width="6" height="3" rx="1.5" fill="#a2d2ff" transform="rotate(30 33 37)"/><rect x="64" y="38" width="6" height="3" rx="1.5" fill="#ffd166"/><rect x="56" y="30" width="6" height="3" rx="1.5" fill="#80ed99" transform="rotate(-30 59 31)"/>`},{kind:"pizza",name:"Pizza",cat:"food",w:80,svg:`<path d="M10 20 Q50 6 90 20 L50 94 Z" fill="#ffd166" ${T}/><path d="M10 20 Q50 6 90 20 L86 28 Q50 16 14 28 Z" fill="#e9a96a" ${T}/><circle cx="42" cy="38" r="7" fill="#ff6b6b" ${T}/><circle cx="62" cy="44" r="6" fill="#ff6b6b" ${T}/><circle cx="50" cy="62" r="6" fill="#ff6b6b" ${T}/>`},{kind:"juice",name:"Juice",cat:"food",w:55,svg:`<path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${T}/><path d="M27 44 H73 L70 92 H30 Z" fill="#ffb347"/><path d="M24 26 H76 L70 92 H30 Z" fill="none" ${T}/><path d="M58 30 L66 4" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="60" r="4" fill="#fff" opacity=".6"/>`},{kind:"cat",name:"Toy cat",cat:"pets",w:110,svg:`${Ae}<path d="M78 80 Q98 70 90 50" stroke="#ffb347" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="30" ry="20" fill="#ffb347" ${T}/><path d="M22 30 L26 8 L40 22 M78 30 L74 8 L60 22" fill="#ffb347" ${T}/><circle cx="50" cy="42" r="28" fill="#ffc46b" ${T}/>${Ao(40,60,40)}<path d="M46 50 q4 4 8 0" ${T} fill="none"/>${er(32,68,50)}`},{kind:"dog",name:"Puppy",cat:"pets",w:120,svg:`${Ae}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#f5ebe0" ${T}/><circle cx="50" cy="42" r="28" fill="#fff" ${T}/><ellipse cx="22" cy="44" rx="10" ry="18" fill="#b07d54" ${T}/><ellipse cx="78" cy="44" rx="10" ry="18" fill="#b07d54" ${T}/><circle cx="60" cy="34" r="8" fill="#e6b88a" opacity=".7"/>${Ao(40,60,40)}<ellipse cx="50" cy="52" rx="5" ry="4" fill="${Oe}"/><path d="M50 56 v6" ${T}/>`},{kind:"bunny",name:"Bunny",cat:"pets",w:90,svg:`${Ae}<ellipse cx="36" cy="22" rx="8" ry="20" fill="#fff" ${T}/><ellipse cx="64" cy="22" rx="8" ry="20" fill="#fff" ${T}/><ellipse cx="36" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="64" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="50" cy="76" rx="28" ry="20" fill="#fff" ${T}/><circle cx="50" cy="52" r="22" fill="#fff" ${T}/>${Ao(42,58,50)}<path d="M47 58 l3 3 3 -3" ${T} fill="none"/>${er(36,64,58)}`},{kind:"fish",name:"Fish Bowl",cat:"pets",w:100,svg:`${Ae}<circle cx="50" cy="54" r="40" fill="#cdeffd" ${T}/><path d="M14 46 H86" stroke="#8ecae6" stroke-width="3"/><path d="M60 64 l14 -8 v16 z" fill="#ff9f68" ${T}/><ellipse cx="46" cy="64" rx="16" ry="11" fill="#ffb347" ${T}/><circle cx="40" cy="62" r="2.5" fill="${Oe}"/><circle cx="32" cy="38" r="3" fill="#fff" opacity=".8"/><rect x="24" y="10" width="52" height="8" rx="4" fill="#cdeffd" ${T}/>`},{kind:"kennel",name:"Dog Kennel",cat:"pets",w:210,h:175,holdable:!1,vb:"0 0 120 100",svg:`<ellipse cx="60" cy="97" rx="48" ry="3.2" fill="#000" opacity=".12"/><path d="M14 50 L60 12 L106 50 Z" fill="#ff8fab" ${T}/><path d="M28 46 L60 22 L92 46 Z" fill="#ffd6e4"/><rect x="20" y="46" width="80" height="50" rx="10" fill="#fff6ea" ${T}/><path d="M20 56 H100" stroke="#ffc2d4" stroke-width="7"/><path d="M34 96 V58 Q60 36 86 58 V96 Z" fill="#f3e4ff" ${T}/><path d="M40 96 V64 Q60 46 80 64 V96 Z" fill="#ffe8c7"/><circle cx="86" cy="64" r="8" fill="#bde0fe" ${T}/><circle cx="84" cy="62" r="2.2" fill="#fff" opacity=".9"/><path d="M28 62 l2.4 2.4 2.4-2.4 2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4z" fill="#ff8fab" ${T}/><circle cx="30" cy="90" r="3.2" fill="#fff" ${T}/><rect x="32" y="88.4" width="14" height="3.4" rx="1.7" fill="#fff" ${T}/><circle cx="48" cy="90" r="3.2" fill="#fff" ${T}/>`},{kind:"cat-tower",name:"Cat Tower",cat:"pets",w:150,h:225,holdable:!1,vb:"0 0 100 150",svg:`<ellipse cx="50" cy="146" rx="36" ry="3.4" fill="#000" opacity=".12"/><rect x="44" y="30" width="12" height="104" rx="6" fill="#c9a0dc" ${T}/><ellipse cx="50" cy="136" rx="34" ry="10" fill="#ffc8dd" ${T}/><ellipse cx="50" cy="132" rx="26" ry="6" fill="#fff6ea"/><ellipse cx="50" cy="102" rx="30" ry="8" fill="#bde0fe" ${T}/><ellipse cx="50" cy="98" rx="22" ry="4" fill="#fff" opacity=".8"/><ellipse cx="50" cy="64" rx="28" ry="8" fill="#ffd166" ${T}/><ellipse cx="50" cy="60" rx="20" ry="4" fill="#fff6d0"/><circle cx="50" cy="22" r="8" fill="#ff8fab" ${T}/><circle cx="47" cy="19" r="2.2" fill="#fff" opacity=".75"/><g class="dangle"><circle cx="22" cy="126" r="8" fill="#ffb3c6" ${T}/><path d="M22 126 q12 5 7 16" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/></g><circle cx="80" cy="92" r="3.4" fill="#ffd166" ${T}/>`},{kind:"vanity",name:"Vanity",cat:"furniture",w:230,svg:`${Ae}<ellipse cx="50" cy="26" rx="24" ry="22" fill="#fff" ${T}/><ellipse cx="50" cy="26" rx="18" ry="16" fill="#cdeffd"/><path d="M38 18 l6 -6 M42 26 l10 -10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="12" r="3" fill="#ffd166" ${T}/><circle cx="74" cy="12" r="3" fill="#ffd166" ${T}/><rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${T}/><rect x="10" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${T}/><rect x="62" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${T}/><circle cx="24" cy="75" r="3" fill="${Oe}"/><circle cx="76" cy="75" r="3" fill="${Oe}"/><rect x="12" y="90" width="6" height="7" rx="2" fill="${Oe}"/><rect x="82" y="90" width="6" height="7" rx="2" fill="${Oe}"/>`},{kind:"stool",name:"Vanity Stool",cat:"furniture",w:90,svg:`${Ae}<ellipse cx="50" cy="48" rx="34" ry="14" fill="#c9a0dc" ${T}/><ellipse cx="50" cy="44" rx="28" ry="9" fill="#e4ccf2"/><path d="M28 58 L22 94 M72 58 L78 94 M50 62 V94" ${T}/><ellipse cx="50" cy="78" rx="22" ry="4" fill="none" ${T}/>`},{kind:"perfume",name:"Perfume",cat:"decor",w:50,svg:`<rect x="40" y="8" width="20" height="14" rx="5" fill="#ffd166" ${T}/><rect x="46" y="20" width="8" height="10" fill="#fff" ${T}/><path d="M20 50 Q20 30 50 30 Q80 30 80 50 V80 Q80 94 66 94 H34 Q20 94 20 80 Z" fill="#ff8fab" ${T}/><ellipse cx="36" cy="52" rx="5" ry="10" fill="#fff" opacity=".6"/><path d="M50 56 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#fff" opacity=".8"/>`},{kind:"polish",name:"Nail Polish",cat:"decor",w:40,svg:`<rect x="38" y="4" width="24" height="40" rx="8" fill="${Oe}"/><path d="M24 54 Q24 42 36 42 H64 Q76 42 76 54 V84 Q76 96 64 96 H36 Q24 96 24 84 Z" fill="#b388d6" ${T}/><ellipse cx="38" cy="62" rx="5" ry="12" fill="#fff" opacity=".55"/>`},{kind:"hairdryer",name:"Hair Dryer",cat:"decor",w:90,svg:`<path d="M60 52 L70 92 Q70 96 64 96 H58 Q52 96 52 90 L46 56 Z" fill="#a2d2ff" ${T}/><rect x="6" y="20" width="62" height="40" rx="20" fill="#bde0fe" ${T}/><ellipse cx="82" cy="40" rx="12" ry="20" fill="#ffc8dd" ${T}/><ellipse cx="82" cy="40" rx="6" ry="11" fill="#fff" ${T}/><circle cx="24" cy="40" r="7" fill="#fff" opacity=".7"/>`},{kind:"mirror",name:"Mirror",cat:"decor",w:120,wall:!0,svg:`<path d="M50 6 C74 6 88 24 88 50 C88 76 72 94 50 94 C28 94 12 76 12 50 C12 24 26 6 50 6 Z" fill="#ffd166" ${T}/><ellipse cx="50" cy="50" rx="30" ry="36" fill="#e0f4ff" ${T}/><path d="M36 34 l10 -10 M36 46 l20 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ff8fab" ${T}/>`}],Is={sofa:["living"],armchair:["living"],lamp:["living","bedroom"],tv:["living"],rug:["living","bedroom"],picture:["living","bedroom"],bookshelf:["living","bedroom"],bed:["bedroom"],teddy:["bedroom"],stars:["bedroom"],tub:["bedroom"],balloon:["any"],clock:["any"],window:["any"],ball:["any"],vanity:["salon"],stool:["salon"],perfume:["salon"],polish:["salon"],hairdryer:["salon"],mirror:["salon","bedroom"],fridge:["kitchen"],stove:["kitchen"],table:["kitchen","living"],chair:["kitchen","living"]};for(const e of hg)Is[e.kind]=["nursery"];for(const e of Sa)Is[e.kind]=["backyard"];for(const e of gg)Is[e.kind]=["bathroom"];Is["floor-cushion"]=["living"];Is["story-pillow"]=["bedroom"];Is["berry-basket"]=["kitchen"];Is["ribbon-tray"]=["salon"];Ln.push(...hg,...Sa,...gg,...x5);for(const e of Ln)e.rooms=Is[e.kind]??(["food"].includes(e.cat)?["kitchen"]:["any"]);const M5=new Set(["rug","tv","tree"]);for(const e of Ln)e.holdable??=!e.wall&&e.cat!=="furniture"&&e.w<=150&&!M5.has(e.kind);const L5=[{kind:"ranch-egg",name:"Fresh Egg",cat:"ranch",w:50,holdable:!0,rooms:["any"],svg:`${Ae}<path d="M50 30 C70 30 80 62 80 74 C80 90 66 96 50 96 C34 96 20 90 20 74 C20 62 30 30 50 30 Z" fill="#fff6e6" ${T}/><ellipse cx="40" cy="52" rx="6" ry="9" fill="#fff"/>`},{kind:"ranch-carrot",name:"Garden Carrot",cat:"ranch",w:70,holdable:!0,rooms:["any"],svg:`${Ae}<path d="M30 40 L78 34 L40 96 Z" fill="#ff922b" ${T}/><path d="M44 50 l10 -2 M42 64 l8 -2 M44 78 l6 -1" ${T}/><path d="M72 36 Q80 14 92 14 M72 36 Q68 14 76 4 M72 36 Q90 30 96 36" fill="none" stroke="#40c057" stroke-width="7" stroke-linecap="round"/>`},{kind:"ranch-bouquet",name:"Ranch Flowers",cat:"ranch",w:80,holdable:!0,rooms:["any"],svg:`${Ae}<path d="M50 94 L40 50 M50 94 L50 44 M50 94 L62 50" stroke="#40c057" stroke-width="5" stroke-linecap="round"/><path d="M36 78 L64 78 L56 96 L44 96 Z" fill="#c9a0dc" ${T}/>${[[38,40,"#ff8fab"],[50,30,"#ffd43b"],[64,40,"#74c0fc"],[44,52,"#ff922b"],[58,52,"#c9a0dc"]].map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="9" fill="${n}" ${T}/><circle cx="${e}" cy="${t}" r="3" fill="#fff3b0"/>`).join("")}`}];Ln.push(...Rx,...D4,...L5);const de=Object.fromEntries(Ln.map(e=>[e.kind,e])),Ni=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),Xe=e=>e.h??e.w,Cf=e=>e.img?`<img class="packimg" src="${Ni(e.img)}" alt="${Ni(e.name)}" draggable="false" />`:`<svg viewBox="${e.vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${e.svg}</svg>`,Ut=(e,t=!1)=>{const n=Zn()?Gn(e.kind):void 0;if(!n)return Cf(e);const s=t&&!e.wall?'<i class="artshade" aria-hidden="true"></i>':"",o=e.kind==="window"?'<i class="artnight" aria-hidden="true"></i>':"";return`${s}${o}<img class="packimg artimg" data-kind="${Ni(e.kind)}" src="${Ni(n)}" alt="${Ni(e.name)}" draggable="false" />`},E5='<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="22" width="56" height="56" rx="14" fill="#fff6ea" stroke="#5a3d5c" stroke-width="4"/></svg>',S5=(e,t)=>e.img&&/\.webp(?:$|\?)/i.test(e.img)?E5:Cf(e);let Eu=!1;const T5='<svg class="imgmiss" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="20" y="20" width="60" height="60" rx="16" fill="#fff6ea" stroke="#5a3d5c" stroke-width="4" stroke-dasharray="9 7" opacity=".55"/></svg>',P5=e=>new Promise((t,n)=>{const s=new Image;s.onload=()=>t(),s.onerror=()=>n(new Error("image failed")),s.src=e});function A5(e,t,n,s){const[o,...i]=Ls;new Promise(a=>setTimeout(a,o)).then(()=>q0(()=>P5(n),i)).then(()=>{if(!e.isConnected||!Zn()||Gn(t.kind)!==n)return;const a=document.createElement("div");a.innerHTML=Ut(t,s),e.replaceWith(...Array.from(a.childNodes))},()=>{})}function R5(){Eu||typeof window>"u"||(Eu=!0,document.addEventListener("load",e=>{const t=e.target;t instanceof HTMLImageElement&&t.classList.contains("imgwait")&&t.classList.remove("imgwait")},!0),window.addEventListener("error",e=>{const t=e.target;if(!(t instanceof HTMLImageElement)||t.dataset.fell==="1")return;if(t.classList.contains("artimg")){const o=de[t.dataset.kind||""];if(!o)return;t.dataset.fell="1";const i=t.getAttribute("src")||"",a=!!t.parentElement?.querySelector(".artshade");t.parentElement?.querySelector(".artshade")?.remove(),t.parentElement?.querySelector(".artnight")?.remove();const r=document.createElement("div");r.innerHTML=Cf(o);const l=r.firstElementChild;l&&(t.replaceWith(l),i&&A5(l,o,i,a));return}if(!t.classList.contains("packimg"))return;if(t4(t)){t.classList.add("imgwait");return}t.dataset.fell="1";const n=document.createElement("div");n.innerHTML=T5;const s=n.firstElementChild;s&&t.replaceWith(s)},!0))}const mg="/kids-house-game/assets/cat-calico-nap-YtfdpbDg.webp",C5=Object.freeze(Object.defineProperty({__proto__:null,default:mg},Symbol.toStringTag,{value:"Module"})),yg="/kids-house-game/assets/cat-calico-sit-D1667wmu.webp",I5=Object.freeze(Object.defineProperty({__proto__:null,default:yg},Symbol.toStringTag,{value:"Module"})),bg="/kids-house-game/assets/cat-calico-stand-3uEzEb3G.webp",O5=Object.freeze(Object.defineProperty({__proto__:null,default:bg},Symbol.toStringTag,{value:"Module"})),wg="/kids-house-game/assets/cat-smokey-nap-lOaTkxI0.webp",B5=Object.freeze(Object.defineProperty({__proto__:null,default:wg},Symbol.toStringTag,{value:"Module"})),kg="/kids-house-game/assets/cat-smokey-sit-_C3gdGqG.webp",D5=Object.freeze(Object.defineProperty({__proto__:null,default:kg},Symbol.toStringTag,{value:"Module"})),vg="/kids-house-game/assets/cat-smokey-stand-Cdf8P9_H.webp",H5=Object.freeze(Object.defineProperty({__proto__:null,default:vg},Symbol.toStringTag,{value:"Module"})),_g="/kids-house-game/assets/cat-tabby-nap-B93Gst5Y.webp",W5=Object.freeze(Object.defineProperty({__proto__:null,default:_g},Symbol.toStringTag,{value:"Module"})),$g="/kids-house-game/assets/cat-tabby-sit-Ww7lKHQz.webp",V5=Object.freeze(Object.defineProperty({__proto__:null,default:$g},Symbol.toStringTag,{value:"Module"})),xg="/kids-house-game/assets/cat-tabby-stand-DRgSjSXE.webp",U5=Object.freeze(Object.defineProperty({__proto__:null,default:xg},Symbol.toStringTag,{value:"Module"})),Mg="/kids-house-game/assets/cat-tuxedo-nap-BVE8WH2l.webp",z5=Object.freeze(Object.defineProperty({__proto__:null,default:Mg},Symbol.toStringTag,{value:"Module"})),Lg="/kids-house-game/assets/cat-tuxedo-sit-CDRf8L3Y.webp",Q5=Object.freeze(Object.defineProperty({__proto__:null,default:Lg},Symbol.toStringTag,{value:"Module"})),Eg="/kids-house-game/assets/cat-tuxedo-stand-D1hHQgPJ.webp",N5=Object.freeze(Object.defineProperty({__proto__:null,default:Eg},Symbol.toStringTag,{value:"Module"})),Sg="/kids-house-game/assets/dog-dachshund-sit-CSdaeXeM.webp",q5=Object.freeze(Object.defineProperty({__proto__:null,default:Sg},Symbol.toStringTag,{value:"Module"})),Tg="/kids-house-game/assets/dog-dachshund-sleep-D51MuT-5.webp",j5=Object.freeze(Object.defineProperty({__proto__:null,default:Tg},Symbol.toStringTag,{value:"Module"})),Pg="/kids-house-game/assets/dog-dachshund-stand-CTaAEwG4.webp",F5=Object.freeze(Object.defineProperty({__proto__:null,default:Pg},Symbol.toStringTag,{value:"Module"})),Ag="/kids-house-game/assets/dog-golden-sit-DFrpj82v.webp",Z5=Object.freeze(Object.defineProperty({__proto__:null,default:Ag},Symbol.toStringTag,{value:"Module"})),Rg="/kids-house-game/assets/dog-golden-sleep-CNdabQUH.webp",G5=Object.freeze(Object.defineProperty({__proto__:null,default:Rg},Symbol.toStringTag,{value:"Module"})),Cg="/kids-house-game/assets/dog-golden-stand-4x9IvGBb.webp",Y5=Object.freeze(Object.defineProperty({__proto__:null,default:Cg},Symbol.toStringTag,{value:"Module"})),Ig="/kids-house-game/assets/dog-poodle-sit-C6jNzYen.webp",K5=Object.freeze(Object.defineProperty({__proto__:null,default:Ig},Symbol.toStringTag,{value:"Module"})),Og="/kids-house-game/assets/dog-poodle-sleep-BQs2iX06.webp",X5=Object.freeze(Object.defineProperty({__proto__:null,default:Og},Symbol.toStringTag,{value:"Module"})),Bg="/kids-house-game/assets/dog-poodle-stand-CLU8S245.webp",J5=Object.freeze(Object.defineProperty({__proto__:null,default:Bg},Symbol.toStringTag,{value:"Module"})),Dg="/kids-house-game/assets/dog-pup-sit-Mv9ktTAi.webp",eM=Object.freeze(Object.defineProperty({__proto__:null,default:Dg},Symbol.toStringTag,{value:"Module"})),Hg="/kids-house-game/assets/dog-pup-sleep-M8R5iFqC.webp",tM=Object.freeze(Object.defineProperty({__proto__:null,default:Hg},Symbol.toStringTag,{value:"Module"})),Wg="/kids-house-game/assets/dog-pup-stand-0TcMABgh.webp",nM=Object.freeze(Object.defineProperty({__proto__:null,default:Wg},Symbol.toStringTag,{value:"Module"})),Vg="/kids-house-game/assets/dog-spotty-sit-ogWfm1-x.webp",sM=Object.freeze(Object.defineProperty({__proto__:null,default:Vg},Symbol.toStringTag,{value:"Module"})),Ug="/kids-house-game/assets/dog-spotty-sleep-d8a6Ckq3.webp",oM=Object.freeze(Object.defineProperty({__proto__:null,default:Ug},Symbol.toStringTag,{value:"Module"})),zg="/kids-house-game/assets/dog-spotty-stand-BR88_RXw.webp",iM=Object.freeze(Object.defineProperty({__proto__:null,default:zg},Symbol.toStringTag,{value:"Module"})),Qg="/kids-house-game/assets/animal-bunny-C8IjPVne.webp",aM=Object.freeze(Object.defineProperty({__proto__:null,default:Qg},Symbol.toStringTag,{value:"Module"})),Ng="/kids-house-game/assets/animal-cow-BNE4y3fn.webp",rM=Object.freeze(Object.defineProperty({__proto__:null,default:Ng},Symbol.toStringTag,{value:"Module"})),qg="/kids-house-game/assets/animal-goat-BEXFo23D.webp",lM=Object.freeze(Object.defineProperty({__proto__:null,default:qg},Symbol.toStringTag,{value:"Module"})),jg="/kids-house-game/assets/animal-piglet-CITF8sJ9.webp",cM=Object.freeze(Object.defineProperty({__proto__:null,default:jg},Symbol.toStringTag,{value:"Module"})),Fg="/kids-house-game/assets/animal-sheep-DxcQ96U2.webp",dM=Object.freeze(Object.defineProperty({__proto__:null,default:Fg},Symbol.toStringTag,{value:"Module"})),Zg="/kids-house-game/assets/apple-tree-ztWRqXgk.webp",fM=Object.freeze(Object.defineProperty({__proto__:null,default:Zg},Symbol.toStringTag,{value:"Module"})),Gg="/kids-house-game/assets/basket-D0ZYb-9_.webp",hM=Object.freeze(Object.defineProperty({__proto__:null,default:Gg},Symbol.toStringTag,{value:"Module"})),Yg="/kids-house-game/assets/hen-house-BMb6vLOg.webp",uM=Object.freeze(Object.defineProperty({__proto__:null,default:Yg},Symbol.toStringTag,{value:"Module"})),Kg="/kids-house-game/assets/horse-chestnut-bare-ClpQBHmC.webp",pM=Object.freeze(Object.defineProperty({__proto__:null,default:Kg},Symbol.toStringTag,{value:"Module"})),Xg="/kids-house-game/assets/horse-chestnut-saddle-DjGl6zGL.webp",gM=Object.freeze(Object.defineProperty({__proto__:null,default:Xg},Symbol.toStringTag,{value:"Module"})),Jg="/kids-house-game/assets/horse-midnight-bare-CN96wJg8.webp",mM=Object.freeze(Object.defineProperty({__proto__:null,default:Jg},Symbol.toStringTag,{value:"Module"})),em="/kids-house-game/assets/horse-midnight-saddle-Zoz0ZHm8.webp",yM=Object.freeze(Object.defineProperty({__proto__:null,default:em},Symbol.toStringTag,{value:"Module"})),tm="/kids-house-game/assets/horse-rainbow-bare-oUM2b_lJ.webp",bM=Object.freeze(Object.defineProperty({__proto__:null,default:tm},Symbol.toStringTag,{value:"Module"})),nm="/kids-house-game/assets/horse-rainbow-saddle-B6LiByBH.webp",wM=Object.freeze(Object.defineProperty({__proto__:null,default:nm},Symbol.toStringTag,{value:"Module"})),sm="/kids-house-game/assets/horse-snowy-bare-DvYLjfaE.webp",kM=Object.freeze(Object.defineProperty({__proto__:null,default:sm},Symbol.toStringTag,{value:"Module"})),om="/kids-house-game/assets/horse-snowy-saddle-K4Sm_Hpq.webp",vM=Object.freeze(Object.defineProperty({__proto__:null,default:om},Symbol.toStringTag,{value:"Module"})),im="/kids-house-game/assets/horse-sunny-bare-zPTIKgZH.webp",_M=Object.freeze(Object.defineProperty({__proto__:null,default:im},Symbol.toStringTag,{value:"Module"})),am="/kids-house-game/assets/horse-sunny-saddle-M4nhkGvO.webp",$M=Object.freeze(Object.defineProperty({__proto__:null,default:am},Symbol.toStringTag,{value:"Module"})),rm="/kids-house-game/assets/tractor-DSDXT0Gz.webp",xM=Object.freeze(Object.defineProperty({__proto__:null,default:rm},Symbol.toStringTag,{value:"Module"})),MM={"cat-calico-stand":[1.018,1.009],"cat-smokey-sit":[1.063,1.063],"cat-smokey-stand":[1.032,1.009],"cat-tabby-stand":[1.027,1.009]},LM=MM;function lm(e){const t=LM[e];return t?` style="--fx:${t[0]};--fy:${t[1]}"`:""}const EM=Object.assign({"../../assets/art/pets/cat-calico-nap.webp":mg,"../../assets/art/pets/cat-calico-sit.webp":yg,"../../assets/art/pets/cat-calico-stand.webp":bg,"../../assets/art/pets/cat-smokey-nap.webp":wg,"../../assets/art/pets/cat-smokey-sit.webp":kg,"../../assets/art/pets/cat-smokey-stand.webp":vg,"../../assets/art/pets/cat-tabby-nap.webp":_g,"../../assets/art/pets/cat-tabby-sit.webp":$g,"../../assets/art/pets/cat-tabby-stand.webp":xg,"../../assets/art/pets/cat-tuxedo-nap.webp":Mg,"../../assets/art/pets/cat-tuxedo-sit.webp":Lg,"../../assets/art/pets/cat-tuxedo-stand.webp":Eg,"../../assets/art/pets/dog-dachshund-sit.webp":Sg,"../../assets/art/pets/dog-dachshund-sleep.webp":Tg,"../../assets/art/pets/dog-dachshund-stand.webp":Pg,"../../assets/art/pets/dog-golden-sit.webp":Ag,"../../assets/art/pets/dog-golden-sleep.webp":Rg,"../../assets/art/pets/dog-golden-stand.webp":Cg,"../../assets/art/pets/dog-poodle-sit.webp":Ig,"../../assets/art/pets/dog-poodle-sleep.webp":Og,"../../assets/art/pets/dog-poodle-stand.webp":Bg,"../../assets/art/pets/dog-pup-sit.webp":Dg,"../../assets/art/pets/dog-pup-sleep.webp":Hg,"../../assets/art/pets/dog-pup-stand.webp":Wg,"../../assets/art/pets/dog-spotty-sit.webp":Vg,"../../assets/art/pets/dog-spotty-sleep.webp":Ug,"../../assets/art/pets/dog-spotty-stand.webp":zg}),SM=Object.assign({"../../assets/art/ranch/animal-bunny.webp":Qg,"../../assets/art/ranch/animal-cow.webp":Ng,"../../assets/art/ranch/animal-goat.webp":qg,"../../assets/art/ranch/animal-piglet.webp":jg,"../../assets/art/ranch/animal-sheep.webp":Fg,"../../assets/art/ranch/apple-tree.webp":Zg,"../../assets/art/ranch/basket.webp":Gg,"../../assets/art/ranch/hen-house.webp":Yg,"../../assets/art/ranch/horse-chestnut-bare.webp":Kg,"../../assets/art/ranch/horse-chestnut-saddle.webp":Xg,"../../assets/art/ranch/horse-midnight-bare.webp":Jg,"../../assets/art/ranch/horse-midnight-saddle.webp":em,"../../assets/art/ranch/horse-rainbow-bare.webp":tm,"../../assets/art/ranch/horse-rainbow-saddle.webp":nm,"../../assets/art/ranch/horse-snowy-bare.webp":sm,"../../assets/art/ranch/horse-snowy-saddle.webp":om,"../../assets/art/ranch/horse-sunny-bare.webp":im,"../../assets/art/ranch/horse-sunny-saddle.webp":am,"../../assets/art/ranch/tractor.webp":rm}),If=new Map;for(const[e,t]of Object.entries(EM)){const n=e.split("/").pop().replace(/\.webp$/i,"");If.set(n,t)}for(const[e,t]of Object.entries(SM)){const n=e.split("/").pop().replace(/\.webp$/i,"");If.set(n,t)}const Su=["tabby","smokey","tuxedo","calico"],Tu=["pup","poodle","dachshund","golden","spotty"],Pu=["goat","sheep","piglet","chicks","bunny","cow"],TM=new Set(["chicks"]),Au=["chestnut","snowy","midnight","sunny","rainbow"];function Ta(e){return Mf()?If.get(e)??null:null}function Pa(e,t="artimg sprite",n=""){return`<img class="${t}" alt="" draggable="false"${n} src="${e}">`}function Ko(e,t,n){const o=`cat-${Su[e]??Su[0]}-${t}`,i=Ta(o);return i?Pa(i,"artimg sprite petsprite",lm(o)):n}function fa(e,t,n){const o=`dog-${Tu[e]??Tu[0]}-${t}`,i=Ta(o);return i?Pa(i,"artimg sprite petsprite",lm(o)):n}function vd(e,t){const n=Pu[e]??Pu[0];if(TM.has(n))return t;const s=Ta(`animal-${n}`);return s?Pa(s,"artimg sprite ranchsprite"):t}function Of(e,t,n){const s=Au[e]??Au[0],o=Ta(`horse-${s}-${t?"saddle":"bare"}`);return o?Pa(o,"artimg sprite ranchsprite horsesprite"):n}function qi(e,t){const n=Ta(e);return n?Pa(n,"artimg sprite ranchsprite"):t}const Ru=new WeakMap;function PM(e){const t=Ru.get(e);if(t)return t;if(!e.complete||!e.naturalWidth)return null;const n=document.createElement("canvas");n.width=e.naturalWidth,n.height=e.naturalHeight;const s=n.getContext("2d",{willReadFrequently:!0});if(!s)return null;try{s.drawImage(e,0,0)}catch{return null}const o=s.getImageData(0,0,n.width,n.height).data;return Ru.set(e,o),o}function AM(e,t,n){const s=e.getBoundingClientRect();if(s.width<1||s.height<1||!e.naturalWidth)return null;let o=(t-s.left)/s.width;const i=(n-s.top)/s.height;e.closest(".flipped")&&(o=1-o);const a=e.naturalWidth,r=e.naturalHeight,l=Math.min(s.width/a,s.height/r),c=a*l,d=r*l,f=(s.width-c)*.5,u=s.height-d,p=(o*s.width-f)/l,y=(i*s.height-u)/l;return p<0||y<0||p>=a||y>=r?null:{x:p,y}}function Bf(e,t,n){const s=PM(e),o=s&&AM(e,t,n);if(!s||!o)return!s;const i=Math.floor(o.x),r=(Math.floor(o.y)*e.naturalWidth+i)*4+3;return s[r]>24}function RM(e,t){const n=[];try{for(let s=0;s<12;s++){const o=document.elementFromPoint(e,t);if(!o)return null;const i=o.closest("img.artimg");if(i&&!Bf(i,e,t)){n.push(i),i.style.pointerEvents="none";continue}return o}return null}finally{for(let s=0;s<n.length;s++)n[s].style.pointerEvents=""}}const CM="var(--line)",IM=1.4,pt='fill="#3a1d3c" opacity=".14"',_d='fill="#3a1d3c" opacity=".22"',jt={l:[72,172],r:[128,172]},wn={l:[50,233],r:[150,233]},OM={l:[88,238],r:[112,238]};function O(e=3){return`stroke="${CM}" stroke-width="${(e*IM).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"`}function E(e){const n=(Math.round(e*10)/10).toFixed(1);return n.endsWith(".0")?n.slice(0,-2):n}function $d(e,t,n,s,o){const i=o*Math.PI/180,a=e-n,r=t-s,l=Math.cos(i),c=Math.sin(i);return{x:n+a*l-r*c,y:s+a*c+r*l}}function ji(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=(n>>16&255)*(1-t),i=(n>>8&255)*(1-t),a=(n&255)*(1-t);return"#"+s(o)+s(i)+s(a)}function Cu(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=n>>16&255,i=n>>8&255,a=n&255;return"#"+s(o+(255-o)*t)+s(i+(255-i)*t)+s(a+(255-a)*t)}function xd(e,t,n,s,o=0){const i=e[0],a=e[1],r=e[0]===t[0]&&e[1]===t[1]?t[0]+.01:t[0],l=t[1],c=r-i,d=l-a,f=Math.hypot(c,d)||1,u=-d/f,p=c/f,y=(i+r)/2+u*o,m=(a+l)/2+p*o,k=n/2,b=s/2,g=(k+b)/2*1.04,w=[i+u*k,a+p*k],_=[r+u*b,l+p*b],P=[r-u*b,l-p*b],$=[i-u*k,a-p*k];return`M${E(w[0])} ${E(w[1])} Q${E(y+u*g)} ${E(m+p*g)} ${E(_[0])} ${E(_[1])} A${E(b)} ${E(b)} 0 0 1 ${E(P[0])} ${E(P[1])} Q${E(y-u*g)} ${E(m-p*g)} ${E($[0])} ${E($[1])} A${E(k)} ${E(k)} 0 0 1 ${E(w[0])} ${E(w[1])} Z`}function Hl(e,t,n,s,o){const i=[],a=(t-e)/s;for(let r=0;r<s;r++){const l=e+r*a,c=l+a;i.push(`Q${E((l+c)/2)} ${E(n+o)} ${E(c)} ${E(n)}`)}return i.join(" ")}function Md(e,t,n,s,o,i=0){const a=[];for(let r=0;r<s;r++){const l=i+2*Math.PI*r/s,c=i+2*Math.PI*(r+1)/s,d=(l+c)/2,f=e+n*Math.cos(l),u=t+n*Math.sin(l),p=e+n*Math.cos(c),y=t+n*Math.sin(c),m=e+(n+o)*Math.cos(d),k=t+(n+o)*Math.sin(d);r===0&&a.push(`M${E(f)} ${E(u)}`),a.push(`Q${E(m)} ${E(k)} ${E(p)} ${E(y)}`)}return a.join(" ")+" Z"}function Es(e,t,n,s){const o=e==="arm"?jt[t]:OM[t],i=e==="arm"?t==="l"?s.armL:s.armR:t==="l"?s.legL:s.legR,a=e==="leg"?t==="l"?s.legLLift:s.legRLift:0,r=i||a?` transform="translate(0 ${E(-a)}) rotate(${E(i)} ${o[0]} ${o[1]})"`:"",c=`<g class="${e} ${t}${e==="arm"?" hang":""}" style="transform-box:view-box;transform-origin:${o[0]}px ${o[1]}px">${n}</g>`;return r?`<g${r}>${c}</g>`:c}const ys="var(--line)";function On(e,t=.8,n=2.2){return e.map(s=>`<path d="${s}" fill="none" stroke="var(--hair-shade)" stroke-width="${n}" stroke-linecap="round" opacity="${t}"/>`).join("")}function Ri(e,t=.32){return e.map(n=>`<path d="${n}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${t}"/>`).join("")}function ns(){return'<path d="M54 72 Q62 44 92 38 Q70 50 63 74 Z" fill="#fff" opacity=".45"/><path d="M60 64 Q70 48 86 42" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".8"/><path d="M104 37 Q130 38 145 58 Q128 46 106 43 Z" fill="#fff" opacity=".3"/><circle cx="72" cy="50" r="2" fill="#fff" opacity=".85"/>'}function It(e,t,n){return n?`<path d="${e}" fill="url(#${t}h)"/>`:""}const Iu="M34 112 Q28 28 100 28 Q172 28 166 112 Q164 146 146 156 L54 156 Q36 146 34 112 Z";function Qt(e,t){return`<path d="${Iu}" fill="var(--hair)" ${O(3.2)}/>${It(Iu,e,t)}`}function _c(e,t,n,s,o,i,a=10){const r=Md(e+2,t+3,n,12,7,s+.1),l=Md(e,t,n-1,12,7,s);let c=`<path d="${r}" fill="var(--hair-shade)" ${O(3.2)}/><path d="${l}" fill="var(--hair)" ${O(3.2)}/>${It(l,o,i)}`;for(let d=0;d<a;d++){const f=d*2.5+s,u=(n-6)*Math.sqrt((d+.5)/a),p=e+u*Math.cos(f),y=t+u*Math.sin(f);c+=`<path d="M${E(p-4)} ${E(y+1)} q1 -5 4.5 -4.5 q3.5 1 2.5 4.5" fill="none" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>`,y<t-2&&p<e+6&&(c+=`<path d="M${E(p-2.5)} ${E(y-2.5)} q2 -2 3.5 -1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`)}return c+=`<ellipse cx="${E(e-10)}" cy="${E(t-12)}" rx="6" ry="3.4" fill="#fff" opacity=".55" transform="rotate(-35 ${E(e-10)} ${E(t-12)})"/>`,c+=`<path d="M${E(e-16)} ${E(t-6)} Q${E(e-6)} ${E(t-18)} ${E(e+4)} ${E(t-14)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>`,c}function eo(e,t,n,s=6,o=[],i=7){let a=`<path d="M${e} ${t-6} V${n}" stroke="${ys}" stroke-width="${E(2*s+4.6)}" stroke-linecap="round"/><path d="M${e} ${t-6} V${n}" stroke="var(--hair)" stroke-width="${E(2*s)}" stroke-linecap="round"/>`,r=t,l=0;for(;r<n;){const c=l%2?1:-1;a+=`<path d="M${E(e-c)} ${E(r-4)} Q${E(e+c*s*1.05)} ${E(r-2)} ${E(e+c*s*.55)} ${E(r+4)} Q${E(e)} ${E(r+5.5)} ${E(e-c*1.4)} ${E(r+1)}" fill="none" stroke="var(--hair-shade)" stroke-width="1.7" stroke-linecap="round"/>`,c>0&&(a+=`<path d="M${E(e+1)} ${E(r-2)} q2.2 -.5 3 1.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>`),r+=i,l++}for(let c=0;c<o.length;c++){const d=o[c];a+=`<rect x="${E(e-6.2)}" y="${d-4}" width="12.4" height="8" rx="2.6" fill="var(--acc)" stroke="${ys}" stroke-width="2"/><rect x="${E(e-4)}" y="${d-2.5}" width="2.6" height="4.5" rx="1" fill="#fff" opacity=".6"/>`}return a+=`<path d="M${e-4} ${n+2} q2 5 4 6 q2 -1 4 -6" fill="var(--hair)" stroke="${ys}" stroke-width="2"/>`,a}function qr(e,t,n,s=5.5){let o=`<path d="M${e} ${t} V${n}" stroke="${ys}" stroke-width="${E(2*s+4)}" stroke-linecap="round"/><path d="M${e} ${t} V${n}" stroke="var(--hair)" stroke-width="${E(2*s)}" stroke-linecap="round"/>`;for(let i=t+8;i<n;i+=16)o+=`<path d="M${E(e-s*.7)} ${i} Q${e} ${i+5} ${E(e+s*.7)} ${i}" fill="none" stroke="var(--hair-shade)" stroke-width="1.6" opacity=".8"/>`;return o+=`<circle cx="${e}" cy="${n+3}" r="${E(s*.55)}" fill="var(--hair)" stroke="${ys}" stroke-width="2"/>`,o}function $c(e,t,n,s){return`<path d="${e}" fill="var(--hair)" ${O(3)}/>${It(e,t,n)}${On(s)}${Ri(s.slice(0,2),.45)}`}function Ro(e,t,n){return`<ellipse cx="${e}" cy="${t}" rx="8" ry="5.5" fill="var(--acc)" ${O(2.4)} transform="rotate(${n} ${e} ${t})"/><ellipse cx="${e-1}" cy="${t-2}" rx="2.4" ry="1.3" fill="#fff" opacity=".6" transform="rotate(${n} ${e-1} ${t-2})"/>`}const ss='<path d="M42 104 Q44 76 70 66 Q86 74 100 58 Q114 74 130 66 Q156 76 158 104" fill="none" stroke="#3a1d3c" stroke-width="9" opacity=".12"/>';function cm(e){return e==="puffs"||e==="coily"?"puffs":e==="afro"?"afro":e==="braids"?"braids":e==="boxbraids"?"box":e==="locs"?"locs":e==="sidebraid"?"sidebraid":e==="crown"?"crown":e==="pony"?"pony":e==="sidepony"?"sidepony":e==="pigtails"?"pigtails":e==="halfup"?"halfup":e==="buns"?"buns":e==="topbun"?"topbun":e==="lowbun"?"lowbun":e==="long"?"long":e==="wavy"||e==="wavybob"?e==="wavy"?"wavy":"bob":e==="bob"||e==="curlybob"||e==="sidebangs"?"bob":e==="pixie"?"pixie":(e==="bangs"||e==="short")&&e==="bangs"?"bangs":"short"}function BM(e,t,n){const s=cm(e);if(s==="puffs"){const o=e==="coily"?26:30;return _c(48,52,o,0,t,n,12)+_c(152,52,o,.3,t,n,12)+`<path d="M42 112 Q38 48 100 44 Q162 48 158 112 Q154 144 100 146 Q46 144 42 112 Z" fill="var(--hair)" ${O(3.2)}/>`+Ro(66,68,-35)+Ro(134,68,35)}if(s==="afro")return _c(100,78,78,.2,t,n,14);if(s==="braids")return Qt(t,n)+eo(34,108,230,5.4,[196])+eo(166,108,230,5.4,[196]);if(s==="box")return Qt(t,n)+eo(30,110,228,5,[200],10)+eo(170,110,228,5,[200],10);if(s==="locs")return Qt(t,n)+qr(32,112,236)+qr(168,112,236);if(s==="sidebraid")return Qt(t,n);if(s==="pony"||s==="sidepony"||s==="halfup"){const o=s==="sidepony"?"M118 78 Q150 70 158 120 Q164 160 150 200 Q136 188 138 160 Q132 120 124 96 Z":"M126 40 Q178 28 180 92 Q184 132 168 168 Q160 196 174 220 Q148 212 145 182 Q140 156 152 124 Q160 90 132 64 Z",i=s==="halfup"?70:s==="sidepony"?86:44;return Qt(t,n)+$c(o,t,n,s==="sidepony"?["M130 96 Q150 120 146 160","M138 110 Q154 140 148 180"]:["M146 56 Q170 88 160 130","M156 66 Q176 100 166 140","M150 150 Q148 180 160 206"])+Ro(s==="sidepony"?124:128,i,s==="sidepony"?-20:25)}if(s==="pigtails")return Qt(t,n)+$c("M40 100 Q22 120 28 168 Q34 200 48 214 Q58 196 52 160 Q58 124 56 108 Z",t,n,["M40 120 Q32 150 40 184"])+$c("M160 100 Q178 120 172 168 Q166 200 152 214 Q142 196 148 160 Q142 124 144 108 Z",t,n,["M160 120 Q168 150 160 184"])+Ro(52,96,20)+Ro(148,96,-20);if(s==="buns"){let o="";for(const i of[52,148])o+=`<circle cx="${i}" cy="44" r="24" fill="var(--hair)" ${O(3.2)}/>${n?`<circle cx="${i}" cy="44" r="24" fill="url(#${t}h)"/>`:""}`,o+=On([`M${i-14} 48 Q${i-14} 28 ${i} 26 Q${i+16} 30 ${i+14} 48`,`M${i-8} 54 Q${i+8} 56 ${i+12} 48`]),o+=`<path d="M${i-12} 34 Q${i-4} 24 ${i+4} 26" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>`;return o+Qt(t,n)}if(s==="topbun")return`<circle cx="100" cy="30" r="26" fill="var(--hair)" ${O(3.2)}/>${n?`<circle cx="100" cy="30" r="26" fill="url(#${t}h)"/>`:""}<path d="M82 28 Q100 12 118 28" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>${On(["M86 36 Q100 24 114 36","M90 42 Q100 34 110 42"])}${Qt(t,n)}`;if(s==="lowbun")return Qt(t,n)+`<circle cx="100" cy="168" r="22" fill="var(--hair)" ${O(3)}/>${n?`<circle cx="100" cy="168" r="22" fill="url(#${t}h)"/>`:""}${Ro(100,148,0)}`;if(s==="long"||s==="wavy"){const o=s==="wavy"?"M36 108 Q28 160 40 210 Q52 250 46 286 Q70 270 78 230 Q60 180 58 140 Q52 120 48 108 Z M164 108 Q172 160 160 210 Q148 250 154 286 Q130 270 122 230 Q140 180 142 140 Q148 120 152 108 Z":"M38 110 Q30 170 36 240 Q42 280 34 300 L70 292 Q64 240 66 180 Q62 140 56 112 Z M162 110 Q170 170 164 240 Q158 280 166 300 L130 292 Q136 240 134 180 Q138 140 144 112 Z";return`<path d="${o}" fill="var(--hair)" ${O(3)}/>${It(o,t,n)}${Qt(t,n)}`}if(s==="bob"){const o=e==="curlybob"?"M30 120 Q24 170 48 196 Q70 210 100 206 Q130 210 152 196 Q176 170 170 120 Q150 150 100 156 Q50 150 30 120 Z":"M32 116 Q26 168 50 190 Q78 204 100 200 Q122 204 150 190 Q174 168 168 116 Q150 148 100 154 Q50 148 32 116 Z";return`<path d="${o}" fill="var(--hair)" ${O(3.2)}/>${It(o,t,n)}${Qt(t,n)}`}return Qt(t,n)}function DM(e,t,n){const s=cm(e),o='<path d="M100 34 V56" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>';if(s==="puffs"||s==="braids"||s==="box"||s==="locs"||s==="afro"||s==="bangs"){const a=s==="afro"?"M48 100 Q52 48 100 40 Q148 48 152 100 Q140 78 100 70 Q60 78 48 100 Z":s==="bangs"?"M40 108 Q36 40 100 34 Q164 40 160 108 L150 96 Q130 108 100 100 Q70 108 50 96 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q154 74 130 62 Q112 70 100 52 Q88 70 70 62 Q46 74 40 106 Z";let r=ss+`<path d="${a}" fill="var(--hair)" ${O(3.2)}/>${It(a,t,n)}${o}`;return r+=On(["M84 44 Q70 52 60 70","M116 44 Q130 52 140 70","M92 40 Q80 48 74 58","M108 40 Q120 48 126 58","M76 42 Q58 56 52 82","M124 42 Q142 56 148 82"]),r+=Ri(["M90 36 Q78 42 70 52","M112 36 Q124 42 132 52"]),s==="puffs"?(r+=`<path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="${ys}" stroke-width="7" stroke-linecap="round"/><path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`,r+=`<path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="${ys}" stroke-width="7" stroke-linecap="round"/><path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`):s==="braids"||s==="box"?(r+=eo(48,114,200,5,[156],s==="box"?10:7),r+=eo(152,114,200,5,[156],s==="box"?10:7)):s==="locs"&&(r+=qr(46,116,210,4.6)+qr(154,116,210,4.6)),r+ns()}if(s==="sidebraid"){const a="M40 108 Q36 36 100 32 Q164 36 160 100 Q140 78 100 70 Q70 80 40 108 Z";return ss+`<path d="${a}" fill="var(--hair)" ${O(3.2)}/>${It(a,t,n)}${On(["M70 46 Q86 60 96 74","M120 44 Q136 58 146 74"])}${eo(150,100,210,5.6,[168],7)}${ns()}`}if(s==="crown"){const a="M40 106 Q36 36 100 32 Q164 36 160 106 Q150 80 100 74 Q50 80 40 106 Z";let r="";for(let l=0;l<7;l++){const c=58+l*14;r+=`<path d="M${c} 58 Q${c+7} 46 ${c+14} 58" fill="none" stroke="var(--hair-shade)" stroke-width="3.2" stroke-linecap="round"/>`}return ss+`<path d="${a}" fill="var(--hair)" ${O(3.2)}/>${It(a,t,n)}${r}${ns()}`}if(s==="pony"||s==="sidepony"||s==="halfup"||s==="pigtails"){const a=s==="sidepony"?"M40 108 Q34 36 100 32 Q166 34 160 108 Q150 86 120 78 Q90 90 60 74 Q48 90 40 108 Z":"M40 108 Q34 34 100 32 Q166 34 160 108 Q156 84 144 72 Q128 86 104 80 Q86 78 72 68 Q60 84 48 84 Q42 94 40 108 Z";let r=ss+`<path d="${a}" fill="var(--hair)" ${O(3.2)}/>${It(a,t,n)}`;return r+=`<path d="M40 104 Q36 120 44 132 Q46 116 50 106 Z" fill="var(--hair)" ${O(2.4)}/><path d="M160 104 Q164 120 156 132 Q154 116 150 106 Z" fill="var(--hair)" ${O(2.4)}/>`,r+=On(["M70 46 Q90 60 104 74","M128 46 Q140 60 146 74","M96 40 Q110 56 116 66"]),r+=Ri(["M76 42 Q92 52 100 62"]),r+ns()}if(s==="buns"||s==="topbun"||s==="lowbun"){const a=s==="topbun"?"M44 108 Q40 50 100 46 Q160 50 156 108 Q148 82 100 74 Q52 82 44 108 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q152 80 138 70 Q126 80 112 76 Q104 82 100 74 Q96 82 88 76 Q74 80 62 70 Q48 80 40 106 Z";let r=ss+`<path d="${a}" fill="var(--hair)" ${O(3.2)}/>${It(a,t,n)}`;if(r+=On(["M80 42 Q72 56 68 68","M120 42 Q128 56 132 68","M100 36 Q98 56 100 70","M90 38 Q84 56 86 72","M110 38 Q116 56 114 72"]),r+=Ri(["M86 38 Q80 46 78 54","M114 38 Q120 46 122 54"]),s==="buns")for(const[l,c]of[[42,1],[158,-1]]){const d=`M${l} 100 q${-8*c} 14 ${-2*c} 24 q${5*c} 8 ${-1*c} 14`;r+=`<path d="${d}" fill="none" stroke="${ys}" stroke-width="7" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`}return r+ns()}if(s==="long"||s==="wavy"||s==="bob"){const a=e==="sidebangs"||e==="wavybob"?"M38 108 Q34 40 70 36 Q100 34 112 48 Q90 70 48 78 Q36 90 38 108 Z M112 48 Q140 36 164 50 Q166 100 150 108 Q130 80 112 70 Z":"M40 108 Q34 36 100 32 Q166 36 160 108 Q152 78 128 68 Q112 78 100 60 Q88 78 72 68 Q48 78 40 108 Z";return ss+`<path d="${a}" fill="var(--hair)" ${O(3.2)}/>${It(a,t,n)}${On(["M78 46 Q68 64 64 80","M122 46 Q132 64 136 80","M100 38 V64"])}${Ri(["M88 40 Q80 50 76 60"])}${ns()}`}if(s==="pixie"){const a="M48 104 Q44 48 100 40 Q140 46 150 78 Q156 100 140 108 Q120 86 100 90 Q70 84 52 104 Z";return ss+`<path d="${a}" fill="var(--hair)" ${O(3.2)}/>${It(a,t,n)}${On(["M70 56 Q86 70 96 84","M118 52 Q132 66 138 82"])}${ns()}`}const i="M46 106 Q42 46 100 38 Q158 46 154 106 Q140 80 100 76 Q60 80 46 106 Z";return ss+`<path d="${i}" fill="var(--hair)" ${O(3.2)}/>${It(i,t,n)}${o}${ns()}`}const Xo="var(--line)";function Df(e){return Math.abs(e.legL)>=40||Math.abs(e.legR)>=40}function go(e,t,n,s=[]){const o=s.map(i=>`<path d="${i}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`).join("");return(n?`<path d="${e}" fill="url(#${t}c)"/>`:"")+o}function Ld(e,t,n){const s=(n+7).toFixed(1);return`<path d="${e}" fill="none" stroke="${Xo}" stroke-width="${s}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function Hf(e,t,n){return Es("arm",e,t,n).replace('class="arm ','class="arm sleeve ')}function wr(e,t,n=!1){const[s,o]=jt[e],i=e==="l"?-1:1;let a=Ld(`M${s} ${o} L${s+7*i} ${o+20}`,"var(--top)",22);return n&&(a+=`<path d="M${s+7*i-12} ${o+17} H${s+7*i+12}" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round" opacity=".9" transform="rotate(${-18*i} ${s+7*i} ${o+17})"/>`),Hf(e,a,t)}function Fi(e,t,n=!0){const[s,o]=jt[e],[i,a]=wn[e],r=e==="l"?-1:1,l=(s+i)/2+6*r;let c=Ld(`M${s-2*r} ${o-2} Q${l} ${(o+a)/2-6} ${i-r} ${a-16}`,"var(--top)",21);return n&&(c+=Ld(`M${i-3*r} ${a-17} L${i-r} ${a-13}`,"var(--top-trim)",20)),Hf(e,c,t)}function Ed(e,t,n=!1){const[s,o]=jt[e],i=e==="l"?-1:1,a=s+4*i,r=o+8;let l=`<path d="${Md(a,r,13,9,3.2)}" fill="var(--top)" ${O(2.8)}/>`;return l+=`<ellipse cx="${a-4*i}" cy="${r-5}" rx="5" ry="3" fill="#fff" opacity=".45"/>`,n&&(l+=`<path d="M${a-11} ${r+13} ${Hl(a-11,a+11,r+13,4,3)}" fill="none" stroke="#fff" stroke-width="2.4"/>`),Hf(e,l,t)}function qt(e,t){return e("l",t)+e("r",t)}const Ou="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 228 Q100 236 64 228 Z";function js(e,t,n,s,o,i,a="",r=[],l=!1){const c=`<path d="${t}" fill="var(--top)" ${O(3)}/>${go(t,s,o,r)}${a}`;return`<g class="shirt" data-hem="${i}">${l?c+n:n+c}</g>`}function HM(e,t,n,s,o){if(t.dress)return"";const i=t.top;if(i==="hoodie"){const l="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L139 230 Q100 240 61 230 Z",c=`<path d="M120 162 Q132 164 134 170 L139 230 Q128 233 123 233 Z" ${pt}/><path d="M72 172 Q76 164 86 163" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".38"/><path d="M78 159 Q100 182 122 159 Q120 152 100 152 Q80 152 78 159 Z" fill="var(--top-trim)" ${O(2.8)}/><path d="M92 172 v18 M108 172 v18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="92" cy="191" r="2.6" fill="#fff" ${O(1.8)}/><circle cx="108" cy="191" r="2.6" fill="#fff" ${O(1.8)}/><path d="M78 202 H122 L127 222 H73 Z" fill="var(--top)" ${O(2.6)}/><path d="M78 202 H122 L124 210 H76 Z" ${pt}/><path d="M61 226 Q100 236 139 226 L139 234 Q100 244 61 234 Z" fill="var(--top-trim)" ${O(2.8)}/>`;return js(e,l,qt(Fi,e),n,s,o,c,["M74 196 q-2 12 2 22","M126 190 q2 14 0 26"])}if(i==="stripes"||i==="jersey"){const l="M68 168 Q74 158 92 158 H108 Q126 158 132 168 L135 232 Q100 238 65 232 Z",c=`${n}st`,d=i==="jersey"?'<path d="M70 176 H130 L128 188 H72 Z" fill="var(--top-trim)"/><path d="M68 210 H132 L130 222 H70 Z" fill="var(--top-trim)"/>':[166,179,192,205,218,231].map(y=>`<rect x="60" y="${y}" width="80" height="6" fill="var(--top-trim)"/>`).join(""),f=i==="jersey"?'<path d="M86 160 L100 176 L114 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/>':'<path d="M84 159 Q100 172 116 159" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',u=s?`<path d="${l}" fill="url(#${n}c)"/>`:"";return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${c}"><path d="${l}"/></clipPath></defs>${qt(y=>wr(y,e,!0),e)}<path d="${l}" fill="var(--top)"/><g clip-path="url(#${c})">${u}<path d="M118 160 L135 168 L138 236 H120 Z" ${pt}/>${d}</g><path d="${l}" fill="none" ${O(3)}/>${f}<path d="M78 198 q-2 12 1 24" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/><path d="M122 190 q2 14 0 28" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/></g>`}if(i==="sweater"||i==="cardigan"){const l=i==="cardigan"?"M68 168 Q74 158 92 158 H108 Q126 158 132 168 L134 232 H108 L100 210 L92 232 H66 Z":"M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 234 Q100 242 64 234 Z",c=`<path d="M118 166 L134 174 L136 230 Q120 236 112 228 Z" ${pt}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M64 226 Q100 236 136 226" fill="none" stroke="var(--top-trim)" stroke-width="6" stroke-linecap="round"/>`,d=i==="cardigan"?[186,202,218].map(f=>`<circle cx="100" cy="${f}" r="2.4" fill="var(--top-trim)" ${O(1.4)}/>`).join(""):"";return js(e,l,qt(Fi,e),n,s,o,c+d,["M80 190 q-2 16 0 28","M120 188 q2 16 0 30"])}if(i==="tank"||i==="bib"){const l=i==="bib"?"M78 168 H122 L126 228 H74 Z":"M78 168 Q86 160 96 164 H104 Q114 160 122 168 L128 226 H72 Z",c=`<path d="M110 172 H126 L128 226 H114 Z" ${pt}/><path d="M82 176 Q84 168 92 166" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".35"/>`,d=i==="bib"?`${c}<path d="M86 150 L78 168 M114 150 L122 168" stroke="${Xo}" stroke-width="8" stroke-linecap="round"/><path d="M86 150 L78 168 M114 150 L122 168" stroke="var(--top)" stroke-width="4.5" stroke-linecap="round"/><rect x="90" y="176" width="20" height="16" rx="3" fill="var(--top-trim)" ${O(1.6)}/>`:`${c}<path d="M84 166 Q100 176 116 166" fill="none" stroke="var(--top-trim)" stroke-width="4"/>`;return js(e,l,"",n,s,o,d,["M88 190 q2 14 0 24"])}if(i==="puff"||i==="ruffle"){const l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L132 222 H68 Z",c=`<path d="M100 172 l-8 -5 v10 z M100 172 l8 -5 v10 z" fill="var(--top-trim)" ${O(1.8)}/><path d="M97 174 l-4 10 M103 174 l4 10" stroke="var(--top-trim)" stroke-width="2.6" stroke-linecap="round"/>`,d=(i==="ruffle"?`<path d="M68 166 Q74 178 82 166 Q90 180 100 166 Q110 180 118 166 Q126 180 132 166" fill="var(--top-trim)" ${O(2)}/>`:c)+`<path d="M118 162 Q128 164 130 170 L132 222 H120 Z" ${pt}/><path d="M74 176 Q76 168 84 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return js(e,l,qt(Ed,e),n,s,o,d,["M86 190 q2 10 0 20","M116 188 q-2 12 0 22"],!0)}if(i==="button"){const l=Ou,c=[180,196,212].map(f=>`<circle cx="100" cy="${f}" r="2.6" fill="#fff" ${O(1.6)}/>`).join(""),d=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${pt}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M100 164 V226" stroke="#fff" stroke-width="2" opacity=".7"/>${c}<path d="M82 160 Q100 172 118 160" fill="var(--top)" ${O(2.2)}/>`;return js(e,l,qt(f=>wr(f,e,!1),e),n,s,o,d,["M78 196 q-1 12 2 20"])}if(i==="raincoat"){const l="M62 168 Q70 156 92 156 H108 Q130 156 138 168 L146 240 Q100 252 54 240 Z",c=`<path d="M120 164 L142 176 L146 236 Q124 244 116 232 Z" ${pt}/><path d="M72 176 Q76 166 88 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M70 156 Q100 176 130 156" fill="none" stroke="var(--top-trim)" stroke-width="6"/><circle cx="100" cy="196" r="4" fill="var(--top-trim)" ${O(1.8)}/><path d="M78 214 H122" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round"/>`;return js(e,l,qt(Fi,e),n,s,o,c,["M76 190 q-4 18 -2 36","M124 188 q4 18 2 36"])}const a=Ou,r=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${pt}/><path d="M84 160 Q100 172 116 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return js(e,a,qt(l=>wr(l,e,!1),e),n,s,o,r,["M78 196 q-2 12 1 22","M122 194 q2 14 -1 24"])}function Bu(e,t,n,s,o,i=!1,a=16){const r=e==="l"?88:112,l=e==="l"?-1:1,c=`M${r-a/2} 226 Q${r-a/2+l} ${n-20} ${r-a/2+2*l} ${n} H${r+a/2} Q${r+a/2} ${n-30} ${r+a/2-l} 226 Z`;let d=`<path d="${c}" fill="var(--bottom)" ${O(2.8)}/>`;return d+=go(c,s,o,[`M${r-4*l} 240 Q${r} ${(226+n)/2} ${r+3*l} ${n-14}`]),e==="r"?d+=`<path d="M${r+1} 230 H${r+a/2} L${r+a/2} ${n} H${r+4} Z" ${pt}/>`:d+=`<path d="M${r-2} 238 Q${r-6} ${(226+n)/2} ${r-2} ${n-10}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".3"/>`,i&&(d+=`<path d="M${r-a/2-1} ${n-8} H${r+a/2+1} V${n+1} H${r-a/2-1} Z" fill="var(--bottom-trim)" ${O(2)}/>`),Es("leg",e,d,t)}function WM(e,t,n,s){if(t.dress)return'<g data-layer="bottom"></g>';const o=t.bottom;if(Df(e)&&(o==="skirt"||o==="tutu"||o==="overalls"))return`<g data-layer="bottom"><path class="skirt" d="${o==="tutu"?"M52 216 H148 L160 248 Q100 260 40 248 Z":"M62 218 H138 L152 252 Q100 264 48 252 Z"}" fill="var(--bottom)" ${O(3)}/></g>`;if(o==="skirt"){const u="M68 222 H132 L146 262 Q100 274 54 262 Z";return`<g data-layer="bottom"><path class="skirt" d="${u}" fill="var(--bottom)" ${O(3)}/>${go(u,n,s,["M82 234 L76 258","M100 232 V266","M118 234 L126 258"])}<path d="M114 224 H132 L146 262 Q130 268 118 266 Z" ${pt}/><path d="M72 228 Q66 246 64 258" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".3"/><path d="M84 236 v10 M116 236 v10" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/></g>`}if(o==="tutu")return'<g data-layer="bottom"></g>';if(o==="overalls"){const u="M66 220 H134 L139 264 H106 L100 254 L94 264 H61 Z";return`<g data-layer="bottom"><g class="leg" style="transform-box:view-box;transform-origin:100px 238px"><path d="${u}" fill="var(--bottom)" ${O(3)}/>${go(u,n,s,["M78 232 Q74 248 72 260","M122 230 Q128 248 132 260"])}<path d="M118 222 H134 L139 264 H122 Z" ${pt}/><path d="M64 258 H95 M105 258 H138" stroke="var(--bottom-trim)" stroke-width="4"/></g></g>`}const a=o==="shorts"?256:292,r=o==="joggers"||o==="jeans",l=o==="leggings"?12:o==="shorts"?18:16,c=Bu("l",e,a,n,s,r,l)+Bu("r",e,a,n,s,r,l),d=o==="jeans"?'<path d="M88 232 V286 M112 232 V286" stroke="#c9a24a" stroke-width="1.4" stroke-dasharray="2 3" opacity=".7"/>':"";return`<g data-layer="bottom">${`<path d="M70 220 H130 V230 H70 Z" fill="var(--bottom)" ${O(2.4)}/>`}${c}${d}</g>`}function VM(e,t,n,s){if(t.dress)return'<g data-layer="bottom-over"></g>';const o=t.bottom;if(o==="overalls"){const i="M78 180 H122 L124 228 H76 Z";return`<g data-layer="bottom-over"><path d="M80 176 L72 164 M120 176 L128 164" stroke="${Xo}" stroke-width="12" stroke-linecap="round"/><path d="M80 176 L72 164 M120 176 L128 164" stroke="var(--bottom)" stroke-width="7.5" stroke-linecap="round"/><path d="${i}" fill="var(--bottom)" ${O(3)}/>${go(i,n,s,["M86 200 q14 6 28 0"])}<path d="M88 190 H112 V206 Q100 212 88 206 Z" fill="var(--bottom-trim)" ${O(2.4)}/><circle cx="82" cy="186" r="3.6" fill="#fff" ${O(2)}/><circle cx="118" cy="186" r="3.6" fill="#fff" ${O(2)}/><path d="M66 222 H134 L135 230 H65 Z" fill="var(--bottom)" ${O(3)}/><path d="M108 180 H122 L124 228 H110 Z" ${pt}/><path d="M82 182 v12" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/></g>`}if(o==="tutu"){if(Df(e))return`<g data-layer="bottom-over"><path class="skirt" d="M58 220 H142 L154 246 Q100 256 46 246 Z" fill="var(--bottom)" ${O(2.4)}/></g>`;let i="";const a=[[266,50,150,8],[256,56,144,7],[246,64,136,6]];for(let l=0;l<a.length;l++){const[c,d,f,u]=a[l],p=`M${d+8} ${c-22} H${f-8} L${f} ${c} ${Hl(f,d,c,6,u)} Z`;i+=`<path class="skirt" d="${p}" fill="var(--bottom)" ${O(2.4)}/>`,i+=`<path d="M${f-20} ${c-16} L${f-6} ${c-2}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".2"/>`}const r="M66 214 H134 V224 H66 Z";return`<g data-layer="bottom-over">${i}<path d="${r}" fill="var(--bottom-trim)" ${O(2.6)}/>${go(r,n,s)}</g>`}return'<g data-layer="bottom-over"></g>'}function Du(e,t){return`<path d="M${e} ${t+2} c-3 -5 -9 -1 -5 3 l5 4 l5 -4 c4 -4 -2 -8 -5 -3z" fill="var(--top-trim)" opacity=".85"/>`}function UM(e,t,n,s,o){const i=t.dress;if(!i)return"";const a=`${n}dr`;let r="M72 210 H128 L150 268 Q100 282 50 268 Z",l="M72 168 Q78 158 94 158 H106 Q122 158 128 168 L130 214 H70 Z",c="",d=qt(y=>Ed(y,e,!0),e),f=!0;i==="sundress"?(r="M76 214 H124 L140 266 Q100 276 60 266 Z",c='<path d="M78 166 Q100 180 122 166" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',d="",f=!1):i==="party"?c=[[64,236],[86,228],[108,234],[130,242],[76,254],[100,250],[122,258],[92,188]].map(([m,k])=>Du(m,k)).join("")+`<path d="M100 214 l-10 -6 v12 z M100 214 l10 -6 v12 z" fill="var(--top-trim)" ${O(1.8)}/><path d="M52 262 Q100 276 148 262" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="1 5" opacity=".85"/>`:i==="pinafore"?(l="M80 176 H120 L122 214 H78 Z",c='<path d="M86 158 L80 178 M114 158 L120 178" stroke="var(--top)" stroke-width="5" stroke-linecap="round"/>',d="",f=!1,r="M74 212 H126 L142 264 Q100 274 58 264 Z"):i==="jumper"?(c=`<path d="M84 160 Q100 174 116 160" fill="var(--top-trim)" ${O(2)}/>`,d=qt(y=>wr(y,e,!0),e),f=!1):i==="ballet"?(r="M78 214 H122 L132 250 Q100 258 68 250 Z",c=`<path d="M70 248 ${Hl(70,130,248,5,5)}" fill="none" stroke="#fff" stroke-width="2"/>`,d=qt(Ed,e)):i==="nightgown"?(r="M80 214 H120 L132 270 Q100 278 68 270 Z",c='<path d="M88 164 Q100 176 112 164" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>',d=qt(Fi,e),f=!1):i==="raindress"?(r="M70 212 H130 L148 268 Q100 280 52 268 Z",c='<path d="M76 168 Q100 186 124 168" fill="none" stroke="var(--top-trim)" stroke-width="5"/><circle cx="100" cy="198" r="3.4" fill="var(--top-trim)"/>',d=qt(Fi,e),f=!1):(r="M70 214 H130 L152 266 Q100 280 48 266 Z",l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L131 216 H69 Z",c=[[66,236],[86,228],[110,232],[132,240],[76,254],[100,248],[124,258],[56,260],[144,262],[96,266],[84,182],[114,190],[100,200]].map(([m,k])=>Du(m,k)).join("")+`<path d="M112 214 H130 L152 266 Q138 271 128 272 Z" ${pt}/><path d="M118 162 L130 168 L131 216 H120 Z" ${pt}/><path d="M50 262 Q100 276 150 262" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9"/><path d="M60 226 Q56 244 54 258" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/><path d="M68 210 H132 V220 H68 Z" fill="var(--top-trim)" ${O(2.6)}/><path d="M100 215 l-13 -8 v16 z M100 215 l13 -8 v16 z" fill="var(--top-trim)" ${O(2.2)}/><circle cx="100" cy="215" r="3.6" fill="var(--top-trim)" ${O(2)}/><path d="M97 218 l-5 14 M103 218 l5 14" stroke="var(--top-trim)" stroke-width="3" stroke-linecap="round"/><path d="M80 158 Q78 172 94 170 Q99 166 100 162 Q101 166 106 170 Q122 172 120 158 Q100 164 80 158 Z" fill="#fff" ${O(2.4)}/>`),Df(e)&&(r="M68 214 H132 L150 250 Q100 262 50 250 Z");const u=`${r} ${l}`,p=`<path class="skirt" d="${r}" fill="var(--top)" ${O(3)}/><path d="${l}" fill="var(--top)" ${O(3)}/><g clip-path="url(#${a})">${go(u,n,s,["M80 226 Q74 248 70 266","M120 226 Q126 248 130 266"])}${c}</g>`;return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${a}"><path d="${u}"/></clipPath></defs>${f?p+d:d+p}</g>`}function zM(e,t,n,s){const o=e==="l"?`<g transform="translate(${2*s} 0) scale(-1 1)">${n}</g>`:n;return Es("leg",e,o,t)}function QM(e,t){const n=t.shoes;let s="";for(const o of["l","r"]){const i=o==="l"?87:113;let a="";if(n==="sneakers"||n==="lightup"){const r=n==="lightup"?`<circle cx="${i-4}" cy="292" r="2.2" fill="#ff8fab"/><circle cx="${i+4}" cy="296" r="2.2" fill="#8ecae6"/><circle cx="${i}" cy="300" r="2" fill="#ffd166"/>`:"";a=`<path d="M${i} 270 V286" fill="none" stroke="var(--sock)" stroke-width="16" stroke-linecap="round"/><path d="M${i-14} 296 Q${i-14} 284 ${i} 284 Q${i+14} 284 ${i+16} 296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+12} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${O(2.8)}/><path d="M${i-12} 304 H${i+18}" stroke="var(--shoe-trim)" stroke-width="3.5" stroke-linecap="round"/><path d="M${i-6} 290 l5 2 M${i-6} 295 l6 2" stroke="${Xo}" stroke-width="1.8" stroke-linecap="round"/>${r}`}else if(n==="boots"||n==="rainboots"){const r=n==="rainboots"?248:258,l=n==="boots"?[[-6,272],[5,268],[-2,284],[7,290],[-8,294]].map(([c,d])=>`<circle cx="${i+c}" cy="${d}" r="2.6" fill="#fff" opacity=".9"/>`).join(""):"";a=`<path d="M${i-14} ${r} H${i+14} V296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+10} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${O(2.8)}/><path d="M${i-16} ${r-4} H${i+16} V${r+8} H${i-16} Z" fill="var(--shoe)" ${O(2.6)}/>`+l+(n==="rainboots"?`<path d="M${i-12} ${r+16} H${i+12}" stroke="var(--shoe-trim)" stroke-width="4" stroke-linecap="round"/>`:`<path d="M${i-6} ${r+14} V292" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".45"/>`)}else n==="maryjanes"?a=`<path d="M${i} 266 V290" fill="none" stroke="var(--sock)" stroke-width="15" stroke-linecap="round"/><path d="M${i-12} 274 ${Hl(i-12,i+12,274,4,4)} L${i+12} 268 H${i-12} Z" fill="var(--sock)" ${O(2)}/><path d="M${i-13} 298 Q${i-13} 290 ${i} 290 Q${i+13} 290 ${i+14} 298 Q${i+20} 300 ${i+20} 304 Q${i+20} 309 ${i+8} 309 H${i-12} Q${i-16} 309 ${i-14} 302 Z" fill="var(--shoe)" ${O(2.8)}/><path d="M${i-10} 294 H${i+12}" stroke="${Xo}" stroke-width="2"/><circle cx="${i+8}" cy="294" r="2.2" fill="var(--acc)"/>`:n==="sandals"?a=`<path d="M${i-12} 298 Q${i-12} 286 ${i} 286 Q${i+12} 286 ${i+14} 296 Q${i+18} 298 ${i+18} 302 Q${i+18} 306 ${i+8} 306 H${i-12} Q${i-16} 306 ${i-14} 300 Z" fill="var(--skin)" ${O(2.4)}/><path d="M${i-14} 304 H${i+18}" stroke="var(--shoe)" stroke-width="5" stroke-linecap="round"/><path d="M${i-8} 292 H${i+10} M${i+2} 300 L${i+8} 290" stroke="var(--shoe)" stroke-width="4" stroke-linecap="round"/><circle cx="${i+2}" cy="293" r="3" fill="var(--shoe-trim)" ${O(1.4)}/>`:n==="slippers"?a=`<path d="M${i-14} 292 Q${i-14} 280 ${i} 278 Q${i+16} 280 ${i+18} 294 Q${i+22} 296 ${i+20} 304 H${i-14} Q${i-18} 304 ${i-16} 296 Z" fill="var(--shoe)" ${O(2.8)}/><path d="M${i-6} 286 q6 -4 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`:a=`<ellipse cx="${i+2}" cy="304" rx="16" ry="7" fill="var(--shoe)" ${O(2.6)}/>`;s+=zM(o,e,a,i)}return`<g data-layer="shoes">${s}</g>`}const dm=new Set(["cap","beanie","sunhat"]),NM=new Set(["catears","earmuffs"]);function ri(e){return e==="afro"?28:e==="topbun"?20:e==="puffs"||e==="coily"?16:e==="buns"||e==="curlybob"?12:e==="long"||e==="wavy"||e==="wavybob"?8:0}function vi(e,t,n){if(!dm.has(t)&&!NM.has(t))return n;const s=ri(e);return s?`<g data-hat="${t}" transform="translate(0 ${E(-s)})">${n}</g>`:n}function qM(e,t,n){let s="";for(let l=0;l<n.length;l++)dm.has(n[l])&&(s=n[l]);if(!s)return"";const o=ri(t),i=(s==="beanie"?58:s==="cap"?64:62)-o,a=Math.min(70,i),r=t==="afro"||t==="puffs"||t==="coily"?92:78;return`<mask id="${e}hm" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" data-brim="${E(a)}"><rect x="-30" y="-50" width="260" height="420" fill="#fff"/><rect x="${E(100-r)}" y="-50" width="${E(r*2)}" height="${E(a+50)}" fill="#000"/></mask>`}function xc(e,t,n){return`<g transform="translate(${e} ${t}) scale(${n})"><path d="M0 0 C-8 -14 -30 -14 -28 0 C-30 14 -8 14 0 0 Z" fill="var(--acc)" ${O(2.6)}/><path d="M0 0 C8 -14 30 -14 28 0 C30 14 8 14 0 0 Z" fill="var(--acc)" ${O(2.6)}/><rect x="-6" y="-7" width="12" height="14" rx="4" fill="var(--acc2)" ${O(2.2)}/></g>`}function jM(e){return`<g data-layer="accessory">${e.acc.map(n=>n==="glasses"?'<circle cx="76" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="124" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="76" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><circle cx="124" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3.2"/><path d="M58 108 L42 104 M142 108 L158 104" stroke="var(--frame)" stroke-width="3.2" stroke-linecap="round"/>':n==="square"?'<rect x="58" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><rect x="108" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><path d="M92 112 H108" stroke="var(--frame)" stroke-width="3.2"/>':n==="sunnies"?'<path d="M56 104 H94 Q96 122 76 122 Q56 122 56 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M106 104 H144 Q146 122 124 122 Q104 122 106 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3"/>':n==="bow"?xc(100,78,.7):n==="bigbow"?xc(100,70,1.15):n==="headband"?`<path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="${Xo}" stroke-width="12" stroke-linecap="round"/><path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round"/>${xc(100,32,.85)}`:n==="flower"?`<g transform="translate(138 78)">${[0,60,120,180,240,300].map(s=>`<ellipse cx="0" cy="-8" rx="5" ry="8" fill="var(--acc)" ${O(1.6)} transform="rotate(${s})"/>`).join("")}<circle r="4.5" fill="var(--acc2)" ${O(1.6)}/></g>`:n==="cap"?vi(e.hair,"cap",`<path d="M54 64 Q56 20 100 16 Q144 20 146 64 Q128 54 100 56 Q72 54 54 64 Z" fill="var(--acc)" ${O(3)}/><path d="M48 56 Q100 66 152 56 L156 62 Q100 70 44 62 Z" fill="var(--acc)" ${O(3)}/><circle cx="100" cy="18" r="4.5" fill="#fff" ${O(2)}/>`):n==="beanie"?vi(e.hair,"beanie",`<path d="M50 66 Q48 14 100 8 Q152 14 150 66 Q128 56 100 58 Q72 56 50 66 Z" fill="var(--acc)" ${O(3)}/><path d="M50 58 H150" stroke="var(--acc2)" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="8" r="7" fill="var(--acc2)" ${O(2.4)}/>`):n==="sunhat"?vi(e.hair,"sunhat",`<path d="M66 56 Q68 22 100 18 Q132 22 134 56 Q118 48 100 50 Q82 48 66 56 Z" fill="var(--acc)" ${O(3)}/><path d="M18 56 Q100 68 182 56 Q170 64 100 66 Q30 64 18 56 Z" fill="var(--acc)" ${O(3)}/><path d="M72 46 Q100 38 128 46" fill="none" stroke="var(--acc2)" stroke-width="4"/>`):n==="catears"?vi(e.hair,"catears",`<path d="M58 62 L70 18 L86 60 Z" fill="var(--acc)" ${O(2.6)}/><path d="M114 60 L130 18 L142 62 Z" fill="var(--acc)" ${O(2.6)}/><path d="M64 54 L72 30 L80 52 Z" fill="var(--acc2)"/><path d="M120 52 L128 30 L136 54 Z" fill="var(--acc2)"/>`):n==="earmuffs"?vi(e.hair,"earmuffs",`<path d="M44 68 Q48 26 100 22 Q152 26 156 68" fill="none" stroke="var(--acc)" stroke-width="6"/><circle cx="34" cy="86" r="14" fill="var(--acc)" ${O(2.8)}/><circle cx="166" cy="86" r="14" fill="var(--acc)" ${O(2.8)}/><circle cx="34" cy="86" r="6" fill="var(--acc2)"/><circle cx="166" cy="86" r="6" fill="var(--acc2)"/>`):"").join("")}</g>`}const jr="var(--line)",Sd="#f7f3ee",_i="#3d3150",tr="#f7f1e8",ha="#4a2f5e",Zi="#2f2433";function Wf(e,t,n){return`<path d="${e}" fill="none" stroke="${jr}" stroke-width="${E(n+7)}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function FM(e){const[t,n]=jt[e],[s,o]=wn[e],i=e==="l"?-1:1,a=(t+s)/2+6*i;return`M${t-2*i} ${n-2} Q${a} ${(n+o)/2-6} ${s-i} ${o-16}`}function fm(e,t,n){return["l","r"].map(s=>{const o=Wf(FM(s),e,21)+(n?n(s):"");return Es("arm",s,o,t).replace('class="arm ','class="arm sleeve ')}).join("")}function hm(e,t,n){return["l","r"].map(s=>{const o=s==="l"?-1:1,i=s==="l"?88:112,a=Wf(`M${i} 238 L${i+o} 280`,e,24)+(n?n(s,i):"");return Es("leg",s,a,t)}).join("")}const um="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z";function li(e,t){return t.hip?`<g transform="rotate(${E(t.hip)} 100 238)">${e}</g>`:e}function ZM(e,t){const n="#ffd166",s=`<path d="${um}" fill="${n}" ${O(3)}/>`,o=`<path d="M78 188 H122 V232 H78 Z" fill="${e}" ${O(2.8)}/><path d="M88 200 H112 V216 Q100 220 88 216 Z" fill="none" stroke="#3a1d3c" stroke-width="2.4" opacity=".3" stroke-linejoin="round"/><path d="M74 166 L82 190 M126 166 L118 190" stroke="${jr}" stroke-width="10" stroke-linecap="round"/><path d="M74 166 L82 190 M126 166 L118 190" stroke="${e}" stroke-width="5.5" stroke-linecap="round"/><circle cx="82" cy="192" r="4" fill="#c9ced6" ${O(1.6)}/><circle cx="118" cy="192" r="4" fill="#c9ced6" ${O(1.6)}/>`,i=`<path d="M66 228 H134 L136 248 Q100 256 64 248 Z" fill="${e}" ${O(3)}/>`,a=fm(n,t,l=>{const[c,d]=wn[l];return`<path d="M${c-9} ${d-12} h18" stroke="#3a1d3c" stroke-width="2" opacity=".25" stroke-linecap="round"/>`});return{back:"",over:hm(e,t,(l,c)=>`<path d="M${c-11} 276 h22" stroke="#3a1d3c" stroke-width="2.4" opacity=".25" stroke-linecap="round"/>`)+li(a+s+i+o,t),head:"",sleeve:n}}function GM(e){const t=70-Math.min(10,ri(e)/2),n=`<path d="M38 ${t+10} Q100 ${t-8} 162 ${t+10}" fill="none" stroke="${jr}" stroke-width="13" stroke-linecap="round"/><path d="M38 ${t+10} Q100 ${t-8} 162 ${t+10}" fill="none" stroke="#6b6f7a" stroke-width="7.5" stroke-linecap="round"/>`,s=o=>`<circle cx="${o}" cy="${t}" r="17" fill="#c9ced6" ${O(3)}/><circle cx="${o}" cy="${t}" r="10.5" fill="#bfe3f2" ${O(2)}/><path d="M${o-5} ${t-4} q3 -4 8 -3" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`;return`<g data-costume-part="goggles">${n}${s(80)}${s(120)}<path d="M96 ${t} h8" stroke="${jr}" stroke-width="5" stroke-linecap="round"/></g>`}function YM(e){const t=60-ri(e),n=Math.max(30,Math.min(56,t-4)),s=t-n;return`<g data-costume-part="witch-hat"><path d="M64 ${t-2} Q82 ${t-n*.45} 92 ${s+8} Q98 ${s-2} 114 ${s+4} Q104 ${s+10} 106 ${s+n*.4} L136 ${t-2} Z" fill="${ha}" ${O(3)}/><path d="M70 ${t-10} Q100 ${t-16} 130 ${t-10} L133 ${t-3} Q100 ${t-9} 67 ${t-3} Z" fill="#ff9f43" ${O(2.2)}/><path d="M24 ${t+2} Q100 ${t-16} 176 ${t+2} Q100 ${t+12} 24 ${t+2} Z" fill="${ha}" ${O(3)}/><path d="M118 ${t-24} l2.6 5.4 5.8 .8 -4.2 4 1 5.8 -5.2 -2.8 -5.2 2.8 1 -5.8 -4.2 -4 5.8 -.8 Z" fill="#ffd166" ${O(1.4)}/></g>`}function KM(e){const t=ri(e);return`<g data-costume-part="cat-ears" transform="translate(0 ${E(-t)})"><path d="M52 66 L64 20 L90 56 Z" fill="${Zi}" ${O(2.8)}/><path d="M110 56 L136 20 L148 66 Z" fill="${Zi}" ${O(2.8)}/><path d="M61 56 L66 34 L80 52 Z" fill="#f4a3c8"/><path d="M120 52 L134 34 L139 56 Z" fill="#f4a3c8"/><path d="M50 72 Q100 46 150 72" fill="none" stroke="${Zi}" stroke-width="6" stroke-linecap="round"/></g>`}function XM(e){return li(`<g data-costume-part="cat-tail">${Wf("M118 232 Q156 240 162 206 Q166 178 182 172",Zi,11)}<circle cx="182" cy="172" r="6" fill="${Zi}"/></g>`,e)}function JM(e){const t=[30,50,70,90,110,130,150,170];let n="";for(let i=t.length-1;i>0;i--)n+=` Q${t[i]-10} ${i%2?276:266} ${t[i-1]} 262`;const s=`M64 166 Q70 154 100 152 Q130 154 136 166 Q164 196 170 262${n} Q36 196 64 166 Z`;return{back:"",over:li(`<g data-costume-part="ghost-sheet"><path d="${s}" fill="${Sd}" ${O(3)}/><path d="M70 190 Q60 230 58 258 M130 190 Q140 230 142 258 M100 190 V250" fill="none" stroke="#3a1d3c" stroke-width="2.4" opacity=".12" stroke-linecap="round"/></g>`,e),head:"",sleeve:Sd,coversArms:!0}}function eL(e){const n=30-Math.min(16,ri(e));return`<g data-costume-part="ghost-hood"><path d="${`M30 112 Q28 ${n} 100 ${n} Q172 ${n} 170 112 Q172 150 150 170 Q100 182 50 170 Q28 150 30 112 Z`} M54 116 Q54 76 100 74 Q146 76 146 116 Q146 152 100 156 Q54 152 54 116 Z" fill="${Sd}" fill-rule="evenodd" ${O(3)}/><path d="M44 96 Q48 ${n+26} 84 ${n+12}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/></g>`}function tL(e){const t=`<path d="${um}" fill="${_i}" ${O(3)}/>`,n=`<g data-costume-part="ribs" fill="none" stroke="${tr}" stroke-linecap="round"><path d="M100 172 V226" stroke-width="6"/>`+[184,198,212].map((r,l)=>`<path d="M${80+l*2} ${r} Q90 ${r-5} 100 ${r}  M${120-l*2} ${r} Q110 ${r-5} 100 ${r}" stroke-width="5.5"/>`).join("")+'<path d="M86 232 Q100 224 114 232" stroke-width="6"/></g>',s=(r,l,c,d)=>`<path d="M${E(r)} ${E(l)} L${E(c)} ${E(d)}" stroke="${tr}" stroke-width="5" stroke-linecap="round"/><circle cx="${E(r)}" cy="${E(l)}" r="4" fill="${tr}"/><circle cx="${E(c)}" cy="${E(d)}" r="4" fill="${tr}"/>`,o=fm(_i,e,r=>{const[l,c]=jt[r],[d,f]=wn[r];return s(l+(d-l)*.2,c+(f-c)*.2,l+(d-l)*.72,c+(f-c)*.72)}),i=`<path d="M66 230 H134 L136 248 Q100 256 64 248 Z" fill="${_i}" ${O(3)}/>`;return{back:"",over:hm(_i,e,(r,l)=>s(l,246,l+(r==="l"?-1:1),274))+li(o+i+t+n,e),head:"",sleeve:_i}}function nL(e){const t=n=>{const s=o=>E(100+n*o);return`M${s(20)} 166 Q${s(60)} 168 ${s(84)} 186 Q${s(90)} 220 ${s(80)} 256 Q${s(68)} 244 ${s(58)} 256 Q${s(48)} 242 ${s(36)} 254 Q${s(28)} 240 ${s(14)} 250 Z`};return li(`<g data-costume-part="bat-cape"><path d="${t(-1)}" fill="${ha}" ${O(3)}/><path d="${t(1)}" fill="${ha}" ${O(3)}/><path d="M40 190 Q44 220 52 240 M160 190 Q156 220 148 240" fill="none" stroke="#fff" stroke-width="2.4" opacity=".18" stroke-linecap="round"/></g>`,e)}function sL(e){return li(`<g data-costume-part="bat-collar"><path d="M78 164 Q72 152 82 146 L92 160 Z M122 164 Q128 152 118 146 L108 160 Z" fill="${ha}" ${O(2.4)}/><circle cx="100" cy="166" r="5" fill="#ff9f43" ${O(1.8)}/></g>`,e)}function pm(e,t,n){const s={back:"",over:"",head:"",sleeve:null};if(e.indexOf("helper-")===0){const o=Ir[e.slice(7)]??Ir.yellow;return{...ZM(o,t),head:GM(n)}}return e==="witch"?{...s,head:YM(n)}:e==="cat"?{...s,back:XM(t),head:KM(n)}:e==="ghost"?{...JM(t),head:eL(n)}:e==="skeleton"?tL(t):e==="bat"?{...s,back:nL(t),over:sL(t)}:s}const oL=[{hip:1.5,head:4,armL:3,armR:-2,legL:0,legR:-3,legLLift:0,legRLift:0},{hip:-2,head:-5,armL:1,armR:-7,legL:4,legR:0,legLLift:2,legRLift:0},{hip:0,head:3,armL:2,armR:-2,legL:0,legR:0,legLLift:0,legRLift:0},{hip:-1.5,head:-4,armL:4,armR:-1,legL:5,legR:0,legLLift:3,legRLift:0}],iL={puffs:0,afro:0,pony:1,sidepony:1,pigtails:1,halfup:1,braids:2,boxbraids:2,locs:2,sidebraid:2,crown:2,buns:3,topbun:3,lowbun:3};function Vf(e){const t=e.hair||"buns";let n=iL[t];if(n===void 0){let s=0;for(let o=0;o<t.length;o++)s=(s+t.charCodeAt(o))%4;n=s}return oL[n]}function aL(e){const t=(n,s,o,i,a)=>{const r=$d(n,s,o,i,a),l=$d(r.x,r.y,100,238,e.hip);return{x:l.x/2,y:l.y/2}};return{left:t(wn.l[0],wn.l[1],jt.l[0],jt.l[1],e.armL),right:t(wn.r[0],wn.r[1],jt.r[0],jt.r[1],e.armR)}}function rL(e){const t=$d(100,244,100,238,e.hip);return Math.round(t.y/2*10)/10}function Uf(e){const t=parseInt(e.slice(1),16);return(t>>16&255)+(t>>8&255)+(t&255)}function lL(e){const t=ji(e,.32);return Uf(t)<80?"#5a3a2c":t}function cL(e){return Uf(e)<140?"#3b2340":ji(e,.12)}let Hu=0;function dL(){return Hu+=1,"a"+Hu.toString(36)}function rs(e,t){return t.hip?`<g transform="rotate(${E(t.hip)} 100 238)">${e}</g>`:e}function Co(e,t,n=!1){const s=t.head?`<g transform="rotate(${E(t.head)} 100 158)">${e}</g>`:e;return rs(`<g${n?' class="dollhead" data-dollhead="1"':' class="dollhead"'}>${s}</g>`,t)}function fL(e,t,n){let s=`<defs><radialGradient id="${e}b"><stop offset="0" style="stop-color:var(--blush)" stop-opacity=".62"/><stop offset=".55" style="stop-color:var(--blush)" stop-opacity=".28"/><stop offset="1" style="stop-color:var(--blush)" stop-opacity="0"/></radialGradient>`;return s+=`<radialGradient id="${e}s"><stop offset="0" stop-color="#3a1d3c" stop-opacity=".3"/><stop offset=".6" stop-color="#3a1d3c" stop-opacity=".12"/><stop offset="1" stop-color="#3a1d3c" stop-opacity="0"/></radialGradient>`,s+=`<radialGradient id="${e}k" cx=".42" cy=".36" r=".75"><stop offset=".55" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".16"/></radialGradient>`,t&&(s+=`<linearGradient id="${e}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f1020" stop-opacity=".62"/><stop offset=".5" stop-color="#1f1020" stop-opacity=".05"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`,s+=`<linearGradient id="${e}c" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="146" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".2"/></linearGradient>`,s+=`<radialGradient id="${e}h" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1f1020" stop-opacity=".28"/></radialGradient>`),s+n+"</defs>"}function hL(e){const t=e==="l"?-1:1,n=jt[e][0],s=jt[e][1],o=wn[e][0],i=wn[e][1],a=o-t,r=i-7,l=-t;let c=`<path d="${xd([n,s],[a,r],18,13,-3*t)}" fill="var(--skin)" ${O(3)}/>`;return c+=`<path class="hand" d="M${E(o-8)} ${E(i-4)} Q${E(o-8)} ${E(i-10)} ${E(o)} ${E(i-10)} Q${E(o+8)} ${E(i-10)} ${E(o+8)} ${E(i-3)} Q${E(o+8.5)} ${E(i+9)} ${E(o)} ${E(i+9.5)} Q${E(o-8.5)} ${E(i+9)} ${E(o-8)} ${E(i-4)} Z" fill="var(--skin)" ${O(2.8)}/>`,c+=`<ellipse cx="${E(o+7*l)}" cy="${E(i-1)}" rx="3.4" ry="5" fill="var(--skin)" ${O(2.4)} transform="rotate(${-20*l} ${E(o+7*l)} ${E(i-1)})"/>`,c+=`<path d="M${E(o-3*l)} ${E(i+3)} v4 M${E(o+.5*l)} ${E(i+3.5)} v4" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`,c+=`<ellipse cx="${E(o-3*l)}" cy="${E(i-5)}" rx="3" ry="1.8" fill="#fff" opacity=".35"/>`,c}function Wu(e){const t={rest:"",l:"",r:""},n=/<g class="arm sleeve (l|r) hang"[^>]*>/g,s=/<g[\s>]|<\/g>/g;let o=0,i;for(;i=n.exec(e);){const a=i[1];let r=1,l=-1,c;for(s.lastIndex=i.index+i[0].length;c=s.exec(e);)if(r+=c[0]==="</g>"?-1:1,r===0){l=c.index;break}if(l<0)break;t.rest+=e.slice(o,i.index),t[a]+=e.slice(i.index+i[0].length,l),o=l+4,n.lastIndex=o}return t.rest+=e.slice(o),t}function Vu(e,t,n){const s=t?`<g class="arm sleeve ${e} hang">${t}</g>`:"";return Es("arm",e,`<g class="hand">${hL(e)}</g>${s}`,n)}function Uu(e){const t=e==="l"?-1:1,n=e==="l"?88:112;let s=`<path d="${xd([n,234],[n+t,294],21,15,1.5*t)}" fill="var(--skin)" ${O(3)}/>`;return s+=`<path d="${xd([n+5*t,244],[n+5*t,290],6,4)}" ${pt}/>`,s+=`<ellipse cx="${E(n+.5*t)}" cy="268" rx="4.5" ry="2.6" fill="#3a1d3c" opacity=".12"/>`,s+=`<path d="M${n-4} 265 q4 -2.5 8 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`,s}function zu(e,t,n,s,o,i){const a=n?-1:1,r=o==="big"||o==="bright"?1.08:o==="soft"?.94:1,l=(b,g)=>`${E(e+b*r)} ${E(t+g*r)}`,c=13.5*r,d=17*r;let f="";if(i&&o!=="soft"){const b=[.35,.95,1.57,2.2,2.8];for(let g=0;g<b.length;g++){const w=b[g];f+=`<path d="M${E(e+5.5*Math.cos(w)*r)} ${E(t+(4+6.5*Math.sin(w))*r)} L${E(e+11.5*Math.cos(w)*r)} ${E(t+(2+14*Math.sin(w))*r)}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>`}}const u=o==="soft"?2:2.6,p=o==="soft"?"":`<path d="M${l(-16*a,-8)} q${E(-6*a*r)} -2 ${E(-9*a*r)} ${E(-9*r)} M${l(-17*a,-2)} q${E(-6*a*r)} ${E(-.5*r)} ${E(-10*a*r)} ${E(-5*r)} M${l(-12*a,-15)} q${E(-3*a*r)} ${E(-4*r)} ${E(-4*a*r)} ${E(-9*r)}" fill="none" stroke="var(--lash)" stroke-width="2.2" stroke-linecap="round"/>`,y=o==="sparkle"||o==="bright"?`<path d="M${l(-9*a,-8)} l.7 1.6 1.6 .7 -1.6 .7 -.7 1.6 -.7 -1.6 -1.6 -.7 1.6 -.7 Z" fill="#fff" opacity=".9"/>`:"",m=i?`<ellipse cx="${e}" cy="${E(t+r)}" rx="${E(c)}" ry="${E(d)}" fill="url(#${s}i)"/>`:"",k=o==="sleepy"?`<path d="M${l(-17,-4)} Q${e} ${E(t+r)} ${l(17,-4)} L${l(18,-16)} Q${e} ${E(t-20*r)} ${l(-18,-16)} Z" fill="var(--skin)"/>`:"";return`<path d="M${l(-16,-2)} Q${l(-16,-20)} ${l(0,-20)} Q${l(16,-20)} ${l(16,-2)} Q${l(16,19)} ${l(0,19)} Q${l(-16,19)} ${l(-16,-2)} Z" fill="#fff"/><path d="M${l(-15,-4)} Q${e} ${E(t-21*r)} ${l(15,-4)} Q${e} ${E(t-14*r)} ${l(-15,-4)} Z" fill="#3a1d3c" opacity=".12"/><ellipse data-iris="1" cx="${e}" cy="${E(t+r)}" rx="${E(c)}" ry="${E(d)}" fill="var(--eye)"/>${m}${f}<ellipse cx="${e}" cy="${E(t+3*r)}" rx="${E(7*r)}" ry="${E(9*r)}" fill="#1f1020" opacity=".8"/><ellipse cx="${e}" cy="${E(t+r)}" rx="${E(11.3*r)}" ry="${E(14.8*r)}" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/><ellipse cx="${e}" cy="${E(t+r)}" rx="${E(c)}" ry="${E(d)}" fill="none" stroke="#1f1020" stroke-width="2" opacity=".55"/><path d="M${l(-9,12)} Q${e} ${E(t+19.5*r)} ${l(9,12)} Q${e} ${E(t+15.5*r)} ${l(-9,12)} Z" fill="#fff" opacity=".5"/><ellipse cx="${E(e-6*a*r)}" cy="${E(t-6*r)}" rx="${E(5.8*r)}" ry="${E(6.8*r)}" fill="#fff" transform="rotate(${-15*a} ${E(e-6*a*r)} ${E(t-6*r)})"/><circle cx="${E(e+6*a*r)}" cy="${E(t+8*r)}" r="${E(2.8*r)}" fill="#fff"/><circle cx="${E(e-4*a*r)}" cy="${E(t+10*r)}" r="${E(1.3*r)}" fill="#fff" opacity=".85"/><path d="M${l(7*a,-10)} l${E(r)} ${E(2.4*r)} ${E(2.4*r)} ${E(r)} ${E(-2.4*r)} ${E(r)} ${E(-r)} ${E(2.4*r)} ${E(-r)} ${E(-2.4*r)} ${E(-2.4*r)} ${E(-r)} ${E(2.4*r)} ${E(-r)} Z" fill="#fff"/>`+y+k+`<path d="M${l(-17,-1)} Q${l(-16,-21)} ${l(0,-21)} Q${l(16,-21)} ${l(17,-3)} Q${l(14.5,-18.6)} ${l(0,-18.8)} Q${l(-14.5,-18.6)} ${l(-15.5,-1)} Z" fill="var(--lash)" stroke="var(--lash)" stroke-width="${u}" stroke-linejoin="round"/>`+p+`<path d="M${l(-11,-23)} Q${e} ${E(t-27*r)} ${l(11,-23)}" fill="none" stroke="var(--line)" stroke-width="1.3" stroke-linecap="round" opacity=".22"/><path d="M${l(-5,20.5)} Q${e} ${E(t+22*r)} ${l(5,20.5)}" fill="none" stroke="var(--lash)" stroke-width="1.3" stroke-linecap="round" opacity=".28"/>`}function uL(e,t,n,s=!1){const o=e.blush?`<ellipse cx="64" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><ellipse cx="136" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><path d="M60 133 l3 -3 M66 134 l3 -3 M132 133 l3 -3 M138 134 l3 -3" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>`:"";let i="";if(e.freckles){const a=[[58,132],[64,136],[70,131],[130,131],[136,136],[142,132]];for(let r=0;r<a.length;r++)i+=`<circle cx="${a[r][0]}" cy="${a[r][1]}" r="1.5" fill="var(--freckle)" opacity=".7"/>`}return o+i+'<path data-brow="l" d="M64 86 Q74 80 85 84" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/><path data-brow="r" d="M115 84 Q126 80 136 86" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'+zu(76,112,!1,t,s?"sleepy":e.eyes,n)+zu(124,112,!0,t,s?"sleepy":e.eyes,n)+'<path d="M98 131 q2 1.8 4 0" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" opacity=".55"/><ellipse cx="101.5" cy="128.5" rx="1.6" ry="1" fill="#fff" opacity=".6"/><path d="M92 140 Q100 147.5 108 140" fill="none" stroke="var(--line)" stroke-width="2.8" stroke-linecap="round"/><path d="M96 142.6 Q100 145.4 104 142.6 Q100 144 96 142.6 Z" fill="#ff8fa8"/>'}function pL(e){const t="M40 102 Q38 38 100 38 Q162 38 160 102 Q160 140 132 153 Q116 160 100 160 Q84 160 68 153 Q40 140 40 102 Z";return`<ellipse cx="39" cy="114" rx="9" ry="11" fill="var(--skin)" ${O(3)}/><ellipse cx="161" cy="114" rx="9" ry="11" fill="var(--skin)" ${O(3)}/><ellipse cx="40" cy="115" rx="4" ry="6" ${_d}/><ellipse cx="160" cy="115" rx="4" ry="6" ${_d}/><path d="${t}" fill="var(--skin)" ${O(3.2)}/><path d="${t}" fill="url(#${e}k)"/>`}function gL(){return`<path d="M91 146 h18 v22 q-9 5 -18 0 Z" fill="var(--skin)" ${O(3)}/><path d="M91 150 h18 v9 q-9 6 -18 0 Z" ${_d}/><path d="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z" fill="var(--skin)" ${O(3)}/>`}function Td(e,t){const n=Rs(e),s=t?.pose??Vf(n),o=t?.rich!==!1,i=t?.uid??dL(),a=rL(s),r=n.shoesC,l=r.toLowerCase()==="#ffffff"?n.dress?n.dressC:n.topC:Cu(r,.28),c=n.dress?n.dressC:n.topC,d=Uf(c)>700?"#8fdcc0":ji(c,.18),f=["--line:#5a3d5c",`--skin:${n.skin}`,`--hair:${n.hairC}`,`--hair-shade:${lL(n.hairC)}`,`--brow:${cL(n.hairC)}`,`--eye:${n.eyeC}`,"--lash:#3b2340","--blush:#ff6f91",`--freckle:${ji(n.skin,.35)}`,`--top:${c}`,`--top-trim:${d}`,`--bottom:${n.dress?n.dressC:n.bottomC}`,`--bottom-trim:${ji(n.dress?n.dressC:n.bottomC,.16)}`,`--shoe:${r}`,`--shoe-trim:${l}`,"--sock:#ffffff",`--acc:${n.accC}`,`--acc2:${Cu(n.accC,.18)}`,"--frame:#6e4a5e"].join(";"),u=Es("leg","l",Uu("l"),s)+Es("leg","r",Uu("r"),s),p=t?.poseName==="sit"||t?.poseName==="lie"?t.poseName:null,y=t?.costume?pm(t.costume,s,n.hair):null,m=n.dress?UM(s,n,i,o,a):HM(s,n,i,o,a),k=Wu(m),b=y&&!y.coversArms?Wu(y.over):null,g=!!b&&(b.l||b.r),w=g?b:k,_=Vu("l",w.l,s)+Vu("r",w.r,s),P=!!y?.coversArms,$=`<g data-layer="body">${u}${rs(gL()+(P?_:""),s)}${Co(pL(i),s,!0)}</g>`,x=k.rest,H=P?"":`<g data-layer="arms">${rs(_,s)}</g>`,V=`<g class="shadow"><ellipse cx="100" cy="308" rx="52" ry="9" fill="url(#${i}s)"/><ellipse cx="87" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/><ellipse cx="113" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/></g>`,Q=qM(i,n.hair,n.acc),q=Q?` mask="url(#${i}hm)"`:"",se=[`<g data-layer="hair-back">${Co(`<g${q}>${BM(n.hair,i,o)}</g>`,s)}</g>`,$,QM(s,n),rs(WM(s,n,i,o),s),rs(x,s),rs(VM(s,n,i,o),s),`<g data-layer="costume">${y?g?b.rest:y.over:""}</g>`,H,`<g data-layer="face">${Co(uL(n,i,o,t?.poseName==="lie"),s)}</g>`,`<g data-layer="hair-front">${Co(`<g${q}>${DM(n.hair,i,o)}</g>`,s)}</g>`,Co(jM(n),s)];t?.holding&&se.splice(se.findIndex(B=>B.indexOf('data-layer="face"')>=0),0,rs(Ea("under",!0,n.skin,p,y?.sleeve??c),s)),y&&(y.head&&se.push(`<g data-layer="costume-head">${Co(y.head,s)}</g>`),y.back&&se.splice(1,0,`<g data-layer="costume-back">${y.back}</g>`));const Me=se.filter(B=>B&&B!=='<g data-layer="costume"></g>').join(""),Ke=n.dress||n.top,Ie=t?.poseName?` data-pose="${t.poseName}"`:"",I=t?.costume?` data-costume="${t.costume}"`:"";return`<svg${Ie}${I} data-chibi="1" data-hair="${n.hair}" data-top="${Ke}" viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" style="${f}">${fL(i,o,Q)}${V}${Me}</svg>`}function Qu(e,t,n){const s=Rs(e),o=Bl(t)??Vf(s),i=t==="sit"||t==="lie"?t:null,a=(n?pm(n,o,s.hair).sleeve:null)??(s.dress?s.dressC:s.topC);return`<svg viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">${rs(Ea("over",!0,s.skin,i,a),o)}</svg>`}function Fr(){try{return typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("selector(&)")}catch{return!1}}function Aa(e,t,n){const s=!!(t&&t.look2);e.classList.toggle("chibi",s);const o=s&&Fr();e.classList.toggle("chibi-move",s&&(o||n)),e.classList.toggle("chibi-bob",s&&!o&&!n)}function gm(e){return e.look2?Ny(e):null}const lt="#5a3d5c",_e=`stroke="${lt}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,mL=["little","kid","adult"],mo={little:.78,kid:1,adult:1.28},Ci={left:{x:15,y:113},right:{x:85,y:113}};function Wl(e,t){return e.look2?aL(t??Vf(e.look2)):t?{left:{x:22,y:96},right:{x:78,y:96}}:Ci}function mm(e,t){return e===1?`<path d="M62 16 L76 8 L76 26 Z M62 16 L50 6 L48 24 Z" fill="#ff7aa8" stroke="${lt}" stroke-width="3" stroke-linejoin="round"/><circle cx="62" cy="16" r="5" fill="#ffd166" stroke="${lt}" stroke-width="3"/>`:e===2?`<circle cx="40" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${lt}" stroke-width="3"/><circle cx="60" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${lt}" stroke-width="3"/><path d="M49 48 h2" stroke="${lt}" stroke-width="3"/>`:e===3?`<path d="M20 30 Q22 8 50 8 Q78 8 80 30 Z" fill="${t}" stroke="${lt}" stroke-width="3.5" stroke-linejoin="round"/><path d="M60 28 Q84 26 92 32 Q80 36 60 34 Z" fill="${t}" stroke="${lt}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="9" r="4" fill="#fff" stroke="${lt}" stroke-width="3"/>`:""}function Zr(e,t,n){return n?e===1?`<path d="M20 40 Q16 86 30 92 L70 92 Q84 86 80 40 Z" fill="${t}" ${_e}/>`:e===2?`<circle cx="18" cy="34" r="12" fill="${t}" ${_e}/><circle cx="82" cy="34" r="12" fill="${t}" ${_e}/>`:e===3?`<circle cx="50" cy="8" r="13" fill="${t}" ${_e}/>`:"":e===3?`<path d="M22 42 Q20 14 50 12 Q80 14 78 42 Q66 26 50 30 Q34 26 22 42 Z" fill="${t}" ${_e}/>`:`<path d="M21 46 Q18 12 50 12 Q82 12 79 46 Q72 30 58 28 Q50 36 36 30 Q26 34 21 46 Z" fill="${t}" ${_e}/>`}function Mt(e,t,n){const s=Bl(t),o=gm(e);return o&&e.look2?Td(e.look2,{rich:Fr(),pose:s??void 0,poseName:t||void 0,holding:n,costume:o}):e.look2?Td(e.look2,{rich:Fr(),pose:s??void 0,poseName:t||void 0,holding:n}):t==="sit"||t==="lie"?yL(e,t,n):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${Zr(e.hairStyle,e.hair,!0)}
  <rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${_e}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${_e}/>
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${lt}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${lt}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${_e} transform="rotate(12 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${_e} transform="rotate(-12 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${_e}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${_e}/>
  <circle cx="50" cy="44" r="30" fill="${e.skin}" ${_e}/>
  ${Zr(e.hairStyle,e.hair,!1)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${lt}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${lt}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${_e} fill="none"/>
  ${mm(e.acc??0,e.shirt)}
  <circle class="hand hang" cx="${Ci.left.x}" cy="${Ci.left.y}" r="6" fill="${e.skin}" ${_e}/><circle class="hand hang" cx="${Ci.right.x}" cy="${Ci.right.y}" r="6" fill="${e.skin}" ${_e}/>
  ${n?Ea("under",!1,Ol(e.skin),null):""}
</svg>`}function ym(e,t){const n=t==="sit"||t==="lie"?t:null;if(n==="lie")return"";const s=gm(e);return s&&e.look2?Qu(e.look2,t,s):e.look2?Qu(e.look2,t):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${Ea("over",!1,Ol(e.skin),n)}</svg>`}function yL(e,t,n){const s=t==="sit"?`<rect class="leg" x="34" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${_e} transform="rotate(-68 40 112)"/>
  <rect class="leg" x="53" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${_e} transform="rotate(68 60 112)"/>`:`<rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${_e}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${_e}/>`,o=t==="lie"?`<path d="M34 48 Q40 52 46 48" fill="none" ${_e}/><path d="M54 48 Q60 52 66 48" fill="none" ${_e}/>`:`<ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${lt}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${lt}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>`,i=`<ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${Zr(e.hairStyle,e.hair,!0)}
  ${s}
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${lt}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${lt}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${_e} transform="rotate(28 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${_e} transform="rotate(-28 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${_e}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${_e}/>
  <g class="dollhead">
  <circle class="dollhead" data-dollhead="1" cx="50" cy="44" r="30" fill="${e.skin}" ${_e}/>
  ${Zr(e.hairStyle,e.hair,!1)}
  ${o}
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${_e} fill="none"/>
  ${mm(e.acc??0,e.shirt)}
  </g>
  <circle class="hand hang" cx="22" cy="96" r="6" fill="${e.skin}" ${_e}/><circle class="hand hang" cx="78" cy="96" r="6" fill="${e.skin}" ${_e}/>
  ${n?Ea("under",!1,Ol(e.skin),t):""}`;return`<svg data-pose="${t}" viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${i}</svg>`}const Nu=[{id:"hair",name:"Hair"},{id:"face",name:"Face"},{id:"clothes",name:"Clothes"},{id:"shoes",name:"Shoes"},{id:"extras",name:"Extras"}],bL={id:"costume",name:"🎃 Costumes"};function wL(){return Ll()?[...Nu,bL]:Nu}function kL(e,t){const n=Mo(e),s=!!n&&n.startsWith("helper-"),o=Rs(t),i=(c,d,f,u)=>`<button type="button" class="avCosTile${f?" on":""}" data-act="av-costume" data-v="${c}" aria-pressed="${f}"><span class="avCosPic">${Td(o,{uid:"cosT"+(u||"none"),rich:!1,costume:u||null})}</span><span class="avCosName">${d}</span></button>`,a=s?n:"helper-yellow",r=i("","No costume",!n,"")+i(a,Nh.helper,s,a)+["witch","cat","ghost","skeleton","bat"].map(c=>i(c,Nh[c],n===c,c)).join(""),l=Object.keys(Ir).map(c=>`<button type="button" class="avSw${n==="helper-"+c?" on":""}" style="background:${Ir[c]}" data-act="av-costume" data-v="helper-${c}" aria-label="${c} overalls"></button>`).join("");return`<h3>Costumes</h3><p class="avHint">Halloween dress-up! Tap one. Everyone in the room sees it.</p><div class="avCosGrid">${r}</div><h3>Helper overalls color</h3><div class="avColors avCosColors">${l}</div>`}const vL={short:"Short",pixie:"Pixie",coily:"Coily",afro:"Afro",bangs:"Bangs",bob:"Bob",wavybob:"Wavy bob",curlybob:"Curly bob",sidebangs:"Side bangs",long:"Long",wavy:"Wavy",braids:"Braids",boxbraids:"Box braids",locs:"Locs",sidebraid:"Side braid",crown:"Crown",pony:"Ponytail",sidepony:"Side pony",pigtails:"Pigtails",halfup:"Half-up",buns:"Buns",puffs:"Puffs",topbun:"Top bun",lowbun:"Low bun"},_L={classic:"Tee",stripes:"Stripes",hoodie:"Hoodie",sweater:"Sweater",tank:"Tank",puff:"Puff",ruffle:"Ruffle",button:"Buttons",jersey:"Jersey",cardigan:"Cardigan",bib:"Bib",raincoat:"Raincoat"},$L={pants:"Pants",jeans:"Jeans",shorts:"Shorts",skirt:"Skirt",tutu:"Tutu",leggings:"Leggings",overalls:"Overalls",joggers:"Joggers"},xL={"":"No dress",twirl:"Twirl",sundress:"Sundress",party:"Party",pinafore:"Pinafore",jumper:"Jumper",ballet:"Ballet",nightgown:"Nightgown",raindress:"Rain"},ML={classic:"Classic",sneakers:"Sneakers",lightup:"Light-up",boots:"Boots",rainboots:"Rain boots",sandals:"Sandals",maryjanes:"Mary Janes",slippers:"Slippers"},LL={round:"Round",big:"Big",sleepy:"Sleepy",sparkle:"Sparkle",soft:"Soft",bright:"Bright"},EL={glasses:"Glasses",square:"Square",sunnies:"Sunnies",bow:"Bow",bigbow:"Big bow",headband:"Headband",flower:"Flower",cap:"Cap",beanie:"Beanie",sunhat:"Sun hat",catears:"Cat ears",earmuffs:"Earmuffs"},SL={little:"Little",kid:"Kid",adult:"Grown-up"};let An="hair";function Sn(e,t,n,s){return`<button type="button" class="avOpt${s?" on":""}" data-act="${e}" data-v="${t}">${n}</button>`}function kr(e,t,n){return`<button type="button" class="avSw${n?" on":""}" style="background:${t}" data-act="${e}" data-v="${t}" aria-label="Color"></button>`}function Fs(e){return`<div class="avGrid">${e}</div>`}function $i(e,t){return`<div class="avColors">${Ht.map(n=>kr(e,n,n===t)).join("")}</div>`}function TL(e,t,n,s){const o=Rs(e.look2),i=e.id==="__me";An==="costume"&&!Ll()&&(An="hair");const a=An==="costume"?kL(e.costume,e.look2):An==="hair"?`<h3>Style</h3>${Fs(bl.map(c=>Sn("av-hair",c,vL[c],o.hair===c)).join(""))}<h3>Color</h3><div class="avColors">${yl.map(c=>kr("av-hairC",c,o.hairC===c)).join("")}</div>`:An==="face"?`<h3>Skin</h3><div class="avColors">${ml.map(c=>kr("av-skin",c,o.skin===c)).join("")}</div><h3>Eyes</h3>${Fs($l.map(c=>Sn("av-eyes",c,LL[c],o.eyes===c)).join(""))}<h3>Eye color</h3><div class="avColors">${af.map(c=>kr("av-eyeC",c,o.eyeC===c)).join("")}</div><div class="avToggles">${Sn("av-freckles",o.freckles?"0":"1","Freckles",o.freckles)}${Sn("av-blush",o.blush?"0":"1","Blush",o.blush)}</div>`:An==="clothes"?`<h3>Top</h3>${Fs(wl.map(c=>Sn("av-top",c,_L[c],!o.dress&&o.top===c)).join(""))}${$i("av-topC",o.topC)}<h3>Bottom</h3>${Fs(kl.map(c=>Sn("av-bottom",c,$L[c],!o.dress&&o.bottom===c)).join(""))}${$i("av-bottomC",o.bottomC)}<h3>Dress</h3>${Fs(vl.map(c=>Sn("av-dress",c,xL[c],o.dress===c)).join(""))}${$i("av-dressC",o.dressC)}`:An==="shoes"?`<h3>Shoes</h3>${Fs(_l.map(c=>Sn("av-shoes",c,ML[c],o.shoes===c)).join(""))}${$i("av-shoesC",o.shoesC)}`:`<h3>Extras</h3><p class="avHint">Pick up to two</p>${Fs(Uo.map(c=>Sn("av-acc",c,EL[c],o.acc.indexOf(c)>=0)).join(""))}${$i("av-accC",o.accC)}`,r=mL.map(c=>`<button type="button" class="avOpt sz${c===e.size?" on":""}" data-act="size" data-v="${c}">${SL[c]}</button>`).join(""),l=i?'<div class="meNote">This is you!</div>':`<button type="button" class="del${n?" sure":""}" data-act="delc">${s}<span>${n?"Tap again":""}</span></button>`;return`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${t}<div class="dress avLook"><div class="avStageWrap"><div class="avStage chibi-move">${Mt(e)}</div>${l}<div class="avSizes">${r}</div></div><div class="avSide"><div class="avTabs">${wL().map(c=>`<button type="button" class="avTab${c.id===An?" on":""}" data-act="av-tab" data-v="${c.id}">${c.name}</button>`).join("")}</div><div class="avPane">${a}</div><div class="avBar"><button type="button" class="avSurprise" data-act="av-surprise">🎲 Surprise me</button><button type="button" class="avDone" data-act="close">Done</button></div></div></div>`}function PL(e,t,n){if(t==="av-tab")return(n==="hair"||n==="face"||n==="clothes"||n==="shoes"||n==="extras"||n==="costume"&&Ll())&&(An=n),null;const s=Rs(e);if(t==="av-hair"&&bl.indexOf(n)>=0)return{...s,hair:n};if(t==="av-hairC")return{...s,hairC:n};if(t==="av-skin")return{...s,skin:n};if(t==="av-eyes"&&$l.indexOf(n)>=0)return{...s,eyes:n};if(t==="av-eyeC")return{...s,eyeC:n};if(t==="av-freckles")return{...s,freckles:n==="1"};if(t==="av-blush")return{...s,blush:n==="1"};if(t==="av-top"&&wl.indexOf(n)>=0)return{...s,top:n,dress:""};if(t==="av-topC")return{...s,topC:n};if(t==="av-bottom"&&kl.indexOf(n)>=0)return{...s,bottom:n,dress:""};if(t==="av-bottomC")return{...s,bottomC:n};if(t==="av-dress"&&vl.indexOf(n)>=0)return{...s,dress:n};if(t==="av-dressC")return{...s,dressC:n};if(t==="av-shoes"&&_l.indexOf(n)>=0)return{...s,shoes:n};if(t==="av-shoesC")return{...s,shoesC:n};if(t==="av-accC")return{...s,accC:n};if(t==="av-acc"&&Uo.indexOf(n)>=0){const o=n,i=s.acc.slice(),a=i.indexOf(o);if(a>=0)i.splice(a,1);else{const r=Cr(o),l=i.filter(c=>Cr(c)!==r);return l.push(o),{...s,acc:l.slice(0,2)}}return{...s,acc:i}}return null}function AL(){try{return typeof navigator<"u"&&navigator.webdriver&&!window.__forceAvatarIntro?!1:localStorage.getItem(wt("avatar-intro"))!=="1"}catch{return!1}}function RL(){try{localStorage.setItem(wt("avatar-intro"),"1")}catch{}}const vr="#5a3d5c";function Mc(e,t,n,s,o){return`<path class="${e}" d="${t}" fill="none" stroke="${vr}" stroke-width="${s}" stroke-linecap="round"/><path class="${e} cloth" d="${t}" fill="none" stroke="${n}" stroke-width="${o}" stroke-linecap="round"/>`}function CL(e){const t=Rs(e),n=t.skin,s=t.dress!=="",o=s||t.bottom==="skirt"||t.bottom==="tutu",i=o?n:t.bottomC,a=t.shoesC,r=s||t.bottom==="skirt"||t.bottom==="tutu";let l="";if(r){const u=s?t.dressC:t.bottomC;l+=`<path class="dress" d="M75 46 L89 46 L91 53 L73 53 Z" fill="${u}" stroke="${vr}" stroke-width="1.1" stroke-linejoin="round"/>`}l+=Mc("thigh","M76 44 Q83 48 88 54",i,6.2,4.8),l+=`<circle class="knee" cx="88" cy="56" r="2.3" fill="${i}" stroke="${vr}" stroke-width="1.1"/>`;const c=t.shoes==="boots"||t.shoes==="rainboots";l+=Mc("shin",c?"M88 58 Q90 64 91 68":"M88 58 Q90 65 91 70",o?n:i,5.8,4.4),!c&&(t.shoes==="sneakers"||t.shoes==="maryjanes"||t.shoes==="lightup")&&(l+=Mc("shin","M90 66 Q90.6 68 91 70","#ffffff",5.4,4));const d=t.shoes==="sandals"?n:a,f=c?66:69;return l+=`<path class="shoe" d="M90 ${f} Q90 ${f-2} 94 ${f-2} Q99 ${f-2} 100 ${f+1} Q100 ${f+5} 95 ${f+5} Q90 ${f+5} 90 ${f+2} Z" fill="${d}" stroke="${vr}" stroke-width="1.1" stroke-linejoin="round"/>`,t.shoes==="sandals"&&(l+=`<path d="M90 ${f+5} L100 ${f+5}" stroke="${a}" stroke-width="1.3" stroke-linecap="round"/>`,l+=`<path d="M93 ${f} L97 ${f+3}" stroke="${a}" stroke-width="1.1" stroke-linecap="round"/>`),`<svg class="rideleg" viewBox="0 0 160 130">${l}</svg>`}let Ve=null,sn=null,ao=null,bn=null,tn=0,Gi=0;const Lc=[261.63,293.66,329.63,392,440,523.25,587.33,659.25,783.99,880],Gr=[[4,-1,5,4,2,-1,3,-1],[2,3,4,-1,3,2,0,-1],[5,-1,7,6,5,-1,4,-1],[3,2,1,-1,2,-1,0,-1]],qu=[130.81,98,110,98];function bm(){try{return Ve??=Ef(new(window.AudioContext||window.webkitAudioContext)),sn||(sn=Ve.createGain(),sn.gain.value=.5,sn.connect(Ve.destination)),Ve.state==="suspended"&&Ve.resume().catch(()=>{}),!0}catch{return!1}}function nr(e,t,n,s,o){if(!Ve||!sn)return;const i=Ve.createOscillator(),a=Ve.createGain();i.type=s,i.frequency.setValueAtTime(e,t),a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(o,t+.03),a.gain.exponentialRampToValueAtTime(5e-4,t+n),i.connect(a).connect(sn),i.start(t),i.stop(t+n+.05)}function wm(){if(!Ve||!ao)return;if(document.hidden&&bn){clearInterval(bn),bn=null;return}if(!Sf||document.hidden){tn=Ve.currentTime+.1;return}const e=Be/2e3*(ao==="musicbox"?1.35:1);for(tn<Ve.currentTime&&(tn=Ve.currentTime+.05);tn<Ve.currentTime+.4;){const t=Math.floor(Gi/8)%Gr.length,n=Gi%8,s=Gr[t][n];ao==="musicbox"?s>=0&&nr(Lc[Math.min(Lc.length-1,s+3)]*2,tn,.9,"sine",.05):(s>=0&&nr(Lc[s],tn,.5,"triangle",.045),n===0&&nr(qu[t],tn,1.6,"sine",.06),n===4&&nr(qu[t]*1.5,tn,1,"sine",.035)),Gi++,tn+=e}}function ju(e){if(e!==ao){if(ao=e,!ao){if(bn&&(clearInterval(bn),bn=null),sn&&Ve){const t=sn.gain;t.cancelScheduledValues(Ve.currentTime),t.setValueAtTime(t.value,Ve.currentTime),t.linearRampToValueAtTime(1e-4,Ve.currentTime+.4)}return}!bm()||!Ve||!sn||(sn.gain.cancelScheduledValues(Ve.currentTime),sn.gain.setValueAtTime(.5,Ve.currentTime+.42),Gi=Math.floor(Date.now()/(Be/2))%(Gr.length*8),tn=Ve.currentTime+.45,bn||(bn=setInterval(wm,120)))}}function IL(){bm()}X0(()=>{ao&&Ve&&!bn&&(Gi=Math.floor(Date.now()/(Be/2))%(Gr.length*8),tn=Ve.currentTime+.1,bn=setInterval(wm,120))});const OL=2,BL=340,DL=380;function HL(e,t){const n=new Map;for(const[a,r]of t){if(r.kind!=="dance")continue;const l=e.find(c=>c.id===r.item);!l||!l.on||us(l.kind)!=="stereo"||(n.get(r.item)??n.set(r.item,[]).get(r.item)).push(a)}let s=null;for(const a of[...n].sort((r,l)=>r[0]<l[0]?-1:1))a[1].length>=OL&&(!s||a[1].length>s[1].length)&&(s=a);if(!s)return null;const o=e.find(a=>a.id===s[0]),i=e.filter(a=>a.id!==o.id&&of(a.kind)&&Math.hypot(a.x-o.x,(a.y-o.y)*1.5)<=BL).map(a=>a.id).sort();return{stereo:o.id,x:o.x,y:o.y,dancers:s[1].sort(),toys:i}}const WL="http://www.w3.org/1999/xhtml",Fu=new Map;function Pd(e){if(e.startsWith("data:"))return Promise.resolve(e);let t=Fu.get(e);return t||(t=(async()=>{try{const n=new URL(e,location.href);if(n.origin!==location.origin)return"";const o=await(await fetch(n.href,{credentials:"same-origin"})).blob();return await new Promise(i=>{const a=new FileReader;a.onload=()=>i(String(a.result)),a.onerror=()=>i(""),a.readAsDataURL(o)})}catch{return""}})(),Fu.set(e,t)),t}const Ad=/url\((['"]?)([^'")]+)\1\)/g;async function Zu(e,t,n){const s=new Map;for(const i of e.matchAll(Ad)){const a=i[2];if(a.startsWith("data:")||a.startsWith("#"))continue;let r=a;try{r=new URL(a,t).href}catch{}s.set(a,r)}const o=new Map;return await Promise.all([...s].map(async([i,a])=>o.set(i,n(a)?await Pd(a):""))),e.replace(Ad,(i,a,r)=>{if(r.startsWith("data:")||r.startsWith("#"))return i;const l=o.get(r);return l?`url("${l}")`:"none"})}const VL=["transform","translate","rotate","scale","opacity","filter"];async function UL(e,t){const n=e.offsetWidth,s=e.offsetHeight,o=new Map;for(const _ of document.getAnimations()){const P=_.effect?.target;if(!P||!(e===P||e.contains(P))||_.effect.pseudoElement)continue;const $=getComputedStyle(P);o.set(P,VL.map(x=>`${x}:${$.getPropertyValue(x)}`).join(";"))}const i=new Set,a=_=>{for(const P of _.matchAll(Ad))try{i.add(new URL(P[2],location.href).href)}catch{}},r=[e,...e.querySelectorAll("*")];for(const _ of r)a(getComputedStyle(_).backgroundImage),a(getComputedStyle(_,"::before").backgroundImage),a(getComputedStyle(_,"::after").backgroundImage);const l=e.cloneNode(!0),c=[l,...l.querySelectorAll("*")],d=[];r.forEach((_,P)=>{const $=c[P];if(!$)return;const x=o.get(_);x&&$.setAttribute("style",($.getAttribute("style")||"")+";"+x);const H=$.getAttribute("style");if(H&&H.includes("url(")&&d.push(Zu(H,location.href,()=>!0).then(V=>$.setAttribute("style",V))),_ instanceof HTMLImageElement&&$ instanceof HTMLImageElement){const V=_.currentSrc||_.src;$.removeAttribute("srcset"),$.removeAttribute("loading"),d.push(Pd(V).then(Q=>{Q?$.src=Q:$.removeAttribute("src")}))}else if(_ instanceof HTMLCanvasElement)try{const V=document.createElement("img");V.src=_.toDataURL(),V.setAttribute("style",getComputedStyle(_).cssText||`width:${_.offsetWidth}px;height:${_.offsetHeight}px`),V.className=_.className,$.replaceWith(V)}catch{}else if(_ instanceof SVGImageElement){const V=_.href.baseVal;V&&d.push(Pd(V).then(Q=>{Q&&$.setAttribute("href",Q)}))}_.tagName==="BUTTON"&&_.classList.contains("nudge")&&$.setAttribute("style","display:none")}),l.style.transform="none",l.style.left="0",l.style.top="0",l.style.position="relative",l.style.margin="0";let f="";for(const _ of[...document.styleSheets])try{const P=[..._.cssRules].map($=>$.cssText).join(`
`);f+=await Zu(P,_.href||location.href,$=>i.has($))}catch{}f=f.replace(/:root\b/g,".pbHtml")+`
*,*::before,*::after{animation:none!important;transition:none!important}`,await Promise.all(d);const u=document.documentElement,p=document.body,y=new XMLSerializer,m=`<div xmlns="${WL}" class="pbHtml ${u.className}" style="${Gu(u.getAttribute("style")||"")};width:${n}px;height:${s}px;overflow:hidden"><style>${f.replace(/<\/style/gi,"<\\/style")}</style><body class="${Gu(p.className)}" style="margin:0;width:${n}px;height:${s}px;overflow:hidden;background:transparent"><div id="app"><div class="stageWrap" style="position:relative;margin:0;padding:0;width:${n}px;height:${s}px;inset:auto;transform:none">`+y.serializeToString(l)+"</div></div></body></div>",k=`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${s}" viewBox="0 0 ${n} ${s}"><foreignObject x="0" y="0" width="${n}" height="${s}">${m}</foreignObject></svg>`,b="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(k),g=document.createElement("canvas");g.width=Math.round(n*t),g.height=Math.round(s*t);const w=g.getContext("2d");try{const _=new Image;_.decoding="sync",_.src=b,await _.decode().catch(()=>new Promise(P=>{_.onload=P,_.onerror=P})),w.drawImage(_,0,0,g.width,g.height),await new Promise(P=>setTimeout(P,60)),w.clearRect(0,0,g.width,g.height),w.drawImage(_,0,0,g.width,g.height)}finally{}return g}const Gu=e=>e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");function zL(e,t=new Date,n=0){const s=e.width/600,o=Math.round(26*s),i=Math.round(64*s),a=document.createElement("canvas");a.width=e.width+o*2,a.height=e.height+o+i;const r=a.getContext("2d"),l=r.createLinearGradient(0,0,a.width,a.height);l.addColorStop(0,"#ffd6e8"),l.addColorStop(.5,"#fff1c9"),l.addColorStop(1,"#d9ecff"),r.fillStyle=l,Ec(r,0,0,a.width,a.height,30*s),r.fill(),r.lineWidth=5*s,r.strokeStyle="#5a3d5c",Ec(r,2.5*s,2.5*s,a.width-5*s,a.height-5*s,28*s),r.stroke(),r.save(),n>0&&(Ec(r,o,o,e.width,e.height,n),r.clip()),r.drawImage(e,o,o),r.restore();const c=["#ff7aa8","#ffd166","#7ec8ff","#b48cff","#8ee08e"];for(let d=0;d<26;d++){const u=d/26*a.width,p=d%2?o/2:a.height-i/2+(d%4-1.5)*8*s;r.fillStyle=c[d%5],r.beginPath(),r.arc(u+10*s,(d%2,p),4*s,0,Math.PI*2),r.fill()}return QL(r,o*1.2,a.height-i/2,14*s,"#ffd166"),NL(r,a.width-o*1.3,a.height-i/2,13*s,"#ff7aa8"),r.fillStyle="#5a3d5c",r.textAlign="center",r.textBaseline="middle",r.font=`800 ${Math.round(24*s)}px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif`,r.fillText("Our cozy house · "+t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),a.width/2,a.height-i/2),a}function Ec(e,t,n,s,o,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+s,n,t+s,n+o,i),e.arcTo(t+s,n+o,t,n+o,i),e.arcTo(t,n+o,t,n,i),e.arcTo(t,n,t+s,n,i),e.closePath()}function QL(e,t,n,s,o){e.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?s*.45:s;e.lineTo(t+Math.cos(a)*r,n+Math.sin(a)*r)}e.closePath(),e.fillStyle=o,e.fill(),e.lineWidth=s/5,e.strokeStyle="#5a3d5c",e.stroke()}function NL(e,t,n,s,o){e.beginPath(),e.moveTo(t,n+s*.9),e.bezierCurveTo(t-s*1.6,n-s*.2,t-s*.6,n-s*1.3,t,n-s*.4),e.bezierCurveTo(t+s*.6,n-s*1.3,t+s*1.6,n-s*.2,t,n+s*.9),e.fillStyle=o,e.fill(),e.lineWidth=s/5,e.strokeStyle="#5a3d5c",e.stroke()}function qL(e,t){const n=t.getBoundingClientRect(),s=t.parentElement?.getBoundingClientRect(),o=(p,y)=>p?(parseFloat(getComputedStyle(p).borderTopRightRadius)||0)*y:0,i=e.width/(n.width||1),a=e.height/(n.height||1),r=e.width/Math.max(1,t.offsetWidth);if(!s||!n.width)return{c:e,radius:o(t,r)};const l=Math.max(n.left,s.left,0),c=Math.max(n.top,s.top,0),d=Math.min(n.right,s.right,innerWidth),f=Math.min(n.bottom,s.bottom,innerHeight);if(d-l>=n.width-2&&f-c>=n.height-2)return{c:e,radius:o(t,r)};if(d<=l||f<=c)return{c:e,radius:o(t,r)};const u=document.createElement("canvas");return u.width=Math.round((d-l)*i),u.height=Math.round((f-c)*a),u.getContext("2d").drawImage(e,(l-n.left)*i,(c-n.top)*a,u.width,u.height,0,0,u.width,u.height),{c:u,radius:o(t.parentElement,i)}}const jL=()=>typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let Sc=!1;async function FL(e,t){if(!Sc){Sc=!0;try{const n=Math.min(2,Math.max(1,window.devicePixelRatio||1),1600/Math.max(1,e.offsetWidth)),s=UL(e,n),o=document.createElement("div");o.className="pbFlash"+(jL()?" soft":""),document.body.appendChild(o),t?.(),setTimeout(()=>o.remove(),700);const i=qL(await s,e),a=zL(i.c,new Date,i.radius),r=await new Promise(l=>a.toBlob(l,"image/png"));if(!r)return;ZL(r)}catch(n){console.warn("photo booth",n)}finally{Sc=!1}}}function ZL(e){document.querySelector(".pbCard")?.remove();const t=URL.createObjectURL(e),n="cozy-house-"+new Date().toISOString().slice(0,10)+".png",s=typeof File=="function"?new File([e],n,{type:"image/png"}):null,o=document.createElement("div");o.className="pbCard",o.setAttribute("role","dialog"),o.setAttribute("aria-label","Your photo"),o.innerHTML=`<div class="pbInner"><img class="pbImg" alt="Your photo" src="${t}"/><div class="pbBtns"><button type="button" class="pbSave">💾 Save</button><button type="button" class="pbClose">Close</button></div></div>`,document.body.appendChild(o);const i=()=>{o.remove(),setTimeout(()=>URL.revokeObjectURL(t),1e3)};o.querySelector(".pbClose").addEventListener("click",i),o.addEventListener("click",a=>{a.target===o&&i()}),o.querySelector(".pbSave").addEventListener("click",async()=>{const a=navigator;if(s&&a.share&&a.canShare?.({files:[s]}))try{await a.share({files:[s]});return}catch(l){if(l?.name==="AbortError")return}const r=document.createElement("a");r.href=t,r.download=n,document.body.appendChild(r),r.click(),r.remove()})}const GL=/rug|lamp|light|plant|curtain|clock|window|lantern/;function YL(e){if(e.cat==="plants")return!0;const t=`${e.name} ${e.kind??""}`.toLowerCase();return GL.test(t)}const km=new Set(["pack:ring-light","pack:desk-lamp",...bw,...xw]);function vm(e,t=new Date){return e.pack===A0&&!R0(t)}function _m(e){const t=e.rooms??[];return t.includes("backyard")&&!t.includes("any")}function KL(e,t){if(t==="nursery"&&e.kind&&km.has(e.kind))return!1;if(t==="backyard")return _m(e);if(t==="all"||!t)return!0;const n=e.rooms;return!n||n.length===0||n.includes(t)?!0:n.includes("any")?e.cat==="decor"||e.cat==="furniture"?YL(e):!0:!1}function XL(e,t,n,s,o){return e.secret&&!(o&&o.has(e.secret))||vm(e)||!s&&n==="backyard"&&!_m(e)||n==="nursery"&&e.kind&&km.has(e.kind)?!1:t.startsWith("pack:")?e.pack===t.slice(5):e.cat!==t?!1:KL(e,s?"all":n)}const $m="cozy-candy",Yu=["🍬","🍭","🍫","🍪","🧁","🍎"];function xm(e){try{const t=Number(e?.getItem($m)??0);return Number.isFinite(t)&&t>0?Math.min(9999,Math.floor(t)):0}catch{return 0}}function JL(e,t=Math.random()){const n=Math.min(9999,xm(e)+1);try{e?.setItem($m,String(n))}catch{}return{count:n,treat:Yu[Math.floor(Math.max(0,Math.min(.999,t))*Yu.length)]}}function Mm(e=new Date,t=typeof location<"u"?location.search:""){return/[?&]halloween=0\b/.test(t)?!1:/[?&]halloween=1\b/.test(t)||R0(e)}function e7(e){return`${String(e??"").replace(/[^\p{L}' -]/gu,"").replace(/\s+/g," ").trim().slice(0,30)||"A friend"} came trick-or-treating!`}const t7=200,n7=170,s7=210,o7=420,i7=70,Yr=12e3,a7=4200,r7=3,Tc=["wave","hop","heart"];function ua(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return(t>>>0)%1e4/1e4}const Pc=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5),l7=(e,t)=>e.id<t.id?-1:e.id>t.id?1:0;function c7(e,t,n,s){const o=ua(e+"|"+t+"|"+n)*Yr;return(s+o)%Yr<a7}function d7(e,t,n,s){const o=ua(e+"|"+t+"|"+n)*Yr,i=Math.floor((s+o)/Yr);return Tc[Math.floor(ua(e+t+n+i)*Tc.length)%Tc.length]}function f7(e,t,n,s,o){const i={pair:new Map,duet:new Map,nearBaby:new Map,babyCoo:!1,pets:new Map},a=[...t].sort(l7),r=new Set;for(const u of a){if(!u.dancingAt||r.has(u.id))continue;let p=null,y=1/0;for(const m of a){if(m===u||r.has(m.id)||m.dancingAt!==u.dancingAt)continue;const k=Pc(u,m);k<=n7&&k<y&&(y=k,p=m)}if(p){const m=ua(e+u.id+p.id);i.duet.set(u.id,{with:p.id,face:p.x<u.x?-1:1,phase:m}),i.duet.set(p.id,{with:u.id,face:u.x<p.x?-1:1,phase:m}),r.add(u.id),r.add(p.id)}}const l=a.filter(u=>!u.busy&&!u.lying),c=[];for(let u=0;u<l.length;u++)for(let p=u+1;p<l.length;p++){const y=Pc(l[u],l[p]);y<=t7&&c.push({a:l[u],b:l[p],d:y})}c.sort((u,p)=>u.d-p.d||(u.a.id+u.b.id<p.a.id+p.b.id?-1:1));const d=new Set;for(const{a:u,b:p}of c){if(i.pair.size>=r7*2)break;if(d.has(u.id)||d.has(p.id)||(d.add(u.id),d.add(p.id),!c7(e,u.id,p.id,o)))continue;let y=d7(e,u.id,p.id,o);y==="hop"&&(u.seated||p.seated)&&(y="wave");const m=ua(e+u.id+p.id);i.pair.set(u.id,{kind:y,with:p.id,face:p.x<u.x?-1:1,phase:m}),i.pair.set(p.id,{kind:y,with:u.id,face:u.x<p.x?-1:1,phase:(m+.18)%1})}if(s)for(const u of a)!u.lying&&Pc(u,s)<=s7&&(i.nearBaby.set(u.id,s.x<u.x?-1:1),i.babyCoo=!0);const f=a.filter(u=>u.seated||u.lying);for(const u of[...n].sort((p,y)=>p.key<y.key?-1:1)){let p=null,y=1/0;for(const g of f){const w=Math.abs(g.x-u.x);w<=o7&&w<y&&(y=w,p=g)}if(!p)continue;const m=u.x<=p.x?-1:1,k=[...i.pets.values()].some(g=>g.toward===p.id),b=p.x+m*i7*(k?1.9:1);i.pets.set(u.key,{toward:p.id,dx:Math.round(b-u.x)})}return i}const h7={play:Be,listen:Be*4,stir:Be*2,swing:Be*3,slide:Be*4,look:Be*5,kneel:Be*3},u7={play:"<span>♪</span><span>♩</span>",listen:"<span>♪</span>"},p7={keys:"<span>♪</span><span>♫</span><span>♩</span>",stove:'<span class="steam"></span><span class="steam"></span><span class="steam"></span>',water:'<span class="bub"></span><span class="bub"></span><span class="ripple"></span>',ducky:""},Yi=new Map;let Zs=null;function g7(e){try{Zs??=Ef(new(window.AudioContext||window.webkitAudioContext)),Zs.state==="suspended"&&Zs.resume().catch(()=>{});const t=Zs.currentTime+.02,n=[523.25,587.33,659.25,783.99,880,1046.5];for(let s=0;s<6;s++){const o=Zs.createOscillator(),i=Zs.createGain();o.type="triangle",o.frequency.value=n[(e+s*(s%2?2:3))%n.length];const a=t+s*.28;i.gain.setValueAtTime(0,a),i.gain.linearRampToValueAtTime(.06,a+.02),i.gain.exponentialRampToValueAtTime(8e-4,a+.6),o.connect(i).connect(Zs.destination),o.start(a),o.stop(a+.65)}}catch{}}function m7(e,t,n,s){if(sf(e)!=="keys")return!1;const o=Date.now();return(Yi.get(t)??0)>o?Yi.delete(t):(Yi.set(t,o+Wh),n&&g7(o%6),setTimeout(s,Wh+60)),s(),!0}function y7(e=Date.now()){const t=new Set;return Yi.forEach((n,s)=>{n>e?t.add(s):Yi.delete(s)}),t}function b7(e,t,n,s,o,i){const a=sf(e);if(a==="keys")return s.has(t)?"keys":null;if(a==="stove")return o.has(t)?"stove":null;if(a==="water"){for(const r of n.values())if(r.item===t&&r.kind==="look")return"water";return null}return cy(e)&&i?"ducky":null}const Ku=["soc-wave","soc-hop","soc-heart","soc-l","soc-r","soc-duet","soc-baby"];let Xu=new Map,Ac=new Set;const Ju=new Map;function w7(e,t){return{x:(e.offsetLeft+e.offsetWidth/2)/t,y:(e.offsetTop+e.offsetHeight)/t}}function k7(e,t){const n=e.layer.offsetWidth/e.roomW||1,s=[],o=new Map;e.layer.querySelectorAll(":scope > .pet").forEach((c,d)=>{if(c.classList.contains("lifted")||c.classList.contains("kenneled"))return;const f=c.classList.contains("pet-cat")?"cat":c.dataset.dog||"pet"+d;s.push({key:f,...w7(c,n)}),o.set(f,c)});const i=[];for(const[c,{d}]of e.dolls){const f=t.get(c);i.push({...d,id:c,busy:!!f,dancingAt:f?.kind==="dance"?f.item:void 0})}const a=f7(e.seed,i,s,e.baby,e.now),r=new Map;for(const c of i)for(const d of i)c!==d&&Math.hypot(c.x-d.x,(c.y-d.y)*1.5)<=200&&(r.get(c.id)??r.set(c.id,new Set).get(c.id)).add(d.id);for(const[c,d]of r)for(const f of d)!Xu.get(c)?.has(f)&&Ac.has(c)&&Ac.has(f)&&Ju.set(c,e.now+1800);Xu=r,Ac=new Set(i.map(c=>c.id));for(const[c,{el:d}]of e.dolls){const f=t.get(c),u=a.pair.get(c),p=a.duet.get(c),y=a.nearBaby.get(c),m=(Ju.get(c)??0)>e.now;let k="",b=0,g=0;if(p&&f)k="soc-duet",b=p.face,g=p.phase;else if(!f&&m){k="soc-wave";const P=[...r.get(c)??[]][0],$=P?e.dolls.get(P)?.d:void 0;b=$?$.x<e.dolls.get(c).d.x?-1:1:0}else!f&&u?(k="soc-"+u.kind,b=u.face,g=u.phase):!f&&y&&(k="soc-baby",b=y);const w=k+b;if(d.dataset.soc===w)continue;if(d.classList.remove(...Ku),!k){delete d.dataset.soc;continue}d.dataset.soc=w,d.classList.add(k),b&&d.classList.add(b<0?"soc-l":"soc-r");const _=Be*2;d.style.setProperty("--soc-delay",oo(g,_,e.now)+"ms"),k==="soc-duet"&&d.style.setProperty("--amb-delay",oo(g,Be*2,e.now)+"ms")}for(const c of e.layer.querySelectorAll("[data-soc]"))c.dataset.id||c.dataset.pid,[...e.dolls.values()].some(d=>d.el===c)||(c.classList.remove(...Ku),delete c.dataset.soc);for(const[c,d]of o){const f=a.pets.get(c),u=f&&!e.reduced||f?f.dx*n:0,p=parseFloat(d.dataset.socDx||"0");Math.abs(u-p)<1||(d.dataset.socDx=String(u),d.classList.toggle("soc-trot",Math.abs(u-p)>12&&!e.reduced),d.classList.toggle("soc-snug",!!f),d.style.translate=u?`${u.toFixed(1)}px 0`:"",Math.abs(u-p)>12&&setTimeout(()=>d.classList.remove("soc-trot"),1300))}const l=e.layer.querySelector(":scope > .baby");l&&l.classList.toggle("soc-coo",a.babyCoo)}function v7(e){return!!(e.held?.left&&ln(e.held.left.kind))||!!(e.held?.right&&ln(e.held.right.kind))}function Rc(e,t){const n=gf(t);return!n||t.seat?.pose==="lie"||mf(e,t,"clean")||v7(t)?null:n}function Xn(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function _7(e){!e||Xn()||(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),window.setTimeout(()=>e.classList.remove("wiggle"),480))}const $7=".round, .thing";function x7(){let e=null;const t=()=>{e?.classList.remove("pressing"),e=null};document.addEventListener("pointerdown",n=>{t();const s=n.target?.closest?.($7);s&&(s.classList.add("pressing"),e=s)},{capture:!0,passive:!0});for(const n of["pointerup","pointercancel","dragstart","blur"])window.addEventListener(n,t,{capture:!0,passive:!0});document.addEventListener("pointerup",n=>{if(Xn())return;const s=n.target?.closest("button");s&&(s.classList.remove("spring"),s.offsetWidth,s.classList.add("spring"))},!0)}const Lm=wt("khg.showWishes"),sr=()=>{try{return localStorage.getItem(Lm)!=="0"}catch{return!0}},M7={sleepy:'<svg viewBox="0 0 40 40"><rect x="5" y="20" width="30" height="10" rx="3" fill="#8fb8ff" stroke="#5b3d5c" stroke-width="2.5"/><rect x="7" y="15" width="10" height="7" rx="3" fill="#fff" stroke="#5b3d5c" stroke-width="2.5"/><path d="M6 30 V34 M34 30 V34" stroke="#5b3d5c" stroke-width="2.5" stroke-linecap="round"/><path d="M24 6 H31 L24 13 H31" fill="none" stroke="#5b3d5c" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/></svg>',hungry:'<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="12" fill="#ff6b6b" stroke="#5b3d5c" stroke-width="2.5"/><path d="M20 11 V6" stroke="#5b3d5c" stroke-width="2.5" stroke-linecap="round"/><path d="M21 9 Q28 4 31 9 Q26 13 21 9 Z" fill="#7bd389" stroke="#5b3d5c" stroke-width="2"/></svg>',playful:'<svg viewBox="0 0 40 40"><ellipse cx="20" cy="16" rx="10" ry="12" fill="#ffd166" stroke="#5b3d5c" stroke-width="2.5"/><path d="M18 28 L22 28 L20 31 Z" fill="#ffd166" stroke="#5b3d5c" stroke-width="2"/><path d="M20 31 Q16 34 20 37" fill="none" stroke="#5b3d5c" stroke-width="2" stroke-linecap="round"/></svg>',clean:'<svg viewBox="0 0 40 40"><circle cx="15" cy="23" r="9" fill="#bfe9ff" stroke="#5b3d5c" stroke-width="2.5"/><circle cx="27" cy="14" r="6" fill="#bfe9ff" stroke="#5b3d5c" stroke-width="2.5"/><circle cx="29" cy="29" r="4" fill="#bfe9ff" stroke="#5b3d5c" stroke-width="2"/><path d="M11 19 Q13 17 15 17" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>'},L7={sleepy:"wants a nap",hungry:"wants a snack",playful:"wants to play",clean:"wants a bath"},E7='<svg viewBox="0 0 48 48"><path d="M6 28 Q24 8 42 28" fill="none" stroke="#5b3d5c" stroke-width="3" stroke-linecap="round"/><ellipse cx="24" cy="30" rx="14" ry="11" fill="#fff" stroke="#5b3d5c" stroke-width="3"/><circle cx="20" cy="30" r="5" fill="#ffd166" stroke="#5b3d5c" stroke-width="2.5"/><circle cx="31" cy="24" r="3" fill="#fff" stroke="#5b3d5c" stroke-width="2"/></svg>',S7='<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="11" fill="#eee" stroke="#5b3d5c" stroke-width="3"/><path d="M10 40 L38 18" stroke="#5b3d5c" stroke-width="3" stroke-linecap="round"/></svg>',Em=(e,t)=>e==="sleepy"?/(^|-|:)bed$|bunk-bed|canopy-bed/.test(t):e==="hungry"?si(t):e==="clean"?qn(t):Zo(t);function T7(e,t,n){const s=e.rooms[t.room]?.items??[],o=r=>n==="sleepy"?/bed|crib|cot/.test(r):n==="hungry"?si(r)||ln(r):n==="clean"?qn(r):Zo(r);let i=null,a=1/0;for(const r of s)if(o(r.kind)){const l=Math.abs(r.x-t.x);l<a&&(a=l,i=r.x)}return i}function P7(e,t){const n=o=>Em(t,o);if((e.rooms[e.currentRoom]?.items??[]).some(o=>n(o.kind)))return null;const s=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"];for(const o of s){if(o===e.currentRoom)continue;if((e.rooms[o]?.items??[]).some(a=>n(a.kind)))return o}return null}function A7(e){const t=new Map,n=new Map;let s=0,o=performance.now(),i=0,a=0;const r=document.createElement("button");r.type="button",r.className="menuRow",r.id="btnWishes",r.innerHTML='<span class="mIco" id="wishIco"></span><span class="mLabel">Show wishes</span>';const l=()=>{const m=sr();r.querySelector("#wishIco").innerHTML=m?E7:S7,r.setAttribute("aria-label",m?"Wishes on":"Wishes off"),r.setAttribute("aria-pressed",String(m))};r.addEventListener("click",()=>{try{localStorage.setItem(Lm,sr()?"0":"1")}catch{}l(),C.click(),u(),F(sr()?"Wishes on":"Wishes off",1400)}),e.menuAfter?.insertAdjacentElement("afterend",r),l();function c(m){if(Xn()){m.classList.add("need-glow"),setTimeout(()=>m.classList.remove("need-glow"),900);return}const k=document.createElement("div");k.className="need-burst",k.setAttribute("aria-hidden","true");for(let g=0;g<7;g++){const w=document.createElement("i");w.className=g%2?"nb-heart":"nb-spark",w.style.setProperty("--a",g/7*360+15+"deg"),w.style.setProperty("--dl",g*40+"ms"),k.appendChild(w)}m.appendChild(k),setTimeout(()=>k.remove(),1400);const b=m.querySelector(":scope > .inner");b?.classList.remove("need-hop"),b?.offsetWidth,b?.classList.add("need-hop")}function d(m,k,b){const g=m.offsetWidth?m.getBoundingClientRect().width/m.offsetWidth:1;if(g>0&&Number.isFinite(g)&&k.style.setProperty("--nbs",g.toFixed(3)),!b){k.style.left="",k.style.bottom="";return}const w=m.querySelector(".inner svg .dollhead");if(!w)return;const _=m.getBoundingClientRect(),P=w.getBoundingClientRect();!_.width||!_.height||!P.width||(k.style.left=((P.left+P.width/2-_.left)/_.width*100).toFixed(1)+"%",k.style.bottom=((_.bottom-P.top)/_.height*100+4).toFixed(1)+"%")}function f(m){const k=m.querySelector(".inner svg .dollhead");if(!k)return;const b=m.getBoundingClientRect(),g=k.getBoundingClientRect();!b.width||!b.height||!g.width||(m.style.setProperty("--zx",((g.left+g.width*.7-b.left)/b.width*100).toFixed(1)+"%"),m.style.setProperty("--zy",((g.top-b.top)/b.height*100-14).toFixed(1)+"%"))}function u(){const m=e.get(),k=sr();for(const w of e.layer.querySelectorAll(".char[data-cid]")){const _=m.characters.find(Me=>Me.id===w.dataset.cid);if(!_)continue;const P={sleepy:3,hungry:3,playful:3,clean:3};for(const Me of io)P[Me]=fo(_,Me);const $=t.get(_.id);$&&io.some(Me=>P[Me]>$[Me])&&(c(w),C.sparkle()),t.set(_.id,P);const x=Rc(m,_),H=!!_.seat&&_.seat.pose==="lie";w.classList.toggle("need-snooze",H),H?requestAnimationFrame(()=>f(w)):(w.style.removeProperty("--zx"),w.style.removeProperty("--zy")),w.classList.toggle("need-sleepy",x==="sleepy"&&!H);let V=w.querySelector(":scope > .need-bubble");if(!x||!k){if(V){V.classList.remove("show");const Me=V;setTimeout(()=>{Me.classList.contains("show")||Me.remove()},450)}continue}V||(V=document.createElement("div"),V.className="need-bubble",V.innerHTML='<i class="nb-dot1"></i><i class="nb-dot2"></i><span class="nb-cloud"></span>',w.appendChild(V)),V.dataset.need!==x&&(V.dataset.need=x,V.querySelector(".nb-cloud").innerHTML=M7[x],V.setAttribute("role","img"),V.setAttribute("aria-label",L7[x]));const Q=T7(m,_,x),q=Q==null?0:Math.max(-1,Math.min(1,(Q-_.x)/300));V.style.setProperty("--lean",String(Math.round(q*100)/100));const se=V;requestAnimationFrame(()=>{d(w,se,H),se.classList.add("show")})}for(const w of t.keys())m.characters.some(_=>_.id===w)||t.delete(w);const b=new Set;if(k){for(const w of m.characters)if(w.room===m.currentRoom&&Rc(m,w)){for(const _ of io)if(fo(w,_)<=1)for(const P of m.rooms[m.currentRoom]?.items??[])Em(_,P.kind)&&b.add(P.id)}}for(const w of e.layer.querySelectorAll(".item[data-id]"))w.classList.toggle("need-hint",b.has(w.dataset.id));const g=document.getElementById("tabs");if(g){const w=document.body.classList.contains("mode-play");let _=null;if(k&&w)for(const P of m.characters){if(P.room!==m.currentRoom)continue;const $=Rc(m,P);if($&&(_=P7(m,$),_))break}for(const P of g.querySelectorAll("[data-room]"))P.classList.toggle("need-elsewhere",!!_&&P.dataset.room===_)}e.afterPaint?.()}function p(){if(!e.speaks())return;const m=e.get(),k=Date.now();for(const b of m.characters)if(b.room===m.currentRoom)for(const g of vb(m,b)){const w=b.id+"|"+g;k-(n.get(w)??0)<2500||(n.set(w,k),e.dispatch({type:"need/meet",id:b.id,need:g}))}}function y(m){const k=performance.now(),b=m??Math.min(k-o,5e3);if(o=k,m==null&&document.visibilityState!=="visible")return;if(!e.canDrift()||!e.speaks()){s=0;return}if(s+=b,s<bb(e.get(),a))return;s=0,a++;const g=xb(e.get(),i++);g&&e.dispatch({type:"need/drift",id:g.id,need:g.need})}e.subscribe(()=>{u(),setTimeout(p,0)}),e.layer.addEventListener("pointerup",m=>{m.target.closest?.(".char[data-cid]")&&(n.clear(),p())}),setInterval(()=>{document.hidden||(y(),u())},1e3),document.addEventListener("visibilitychange",()=>{o=performance.now()}),u(),new URLSearchParams(location.search).has("needsqa")&&(window.__needs={tick:m=>y(m),visible:()=>s,paint:u,care:p})}function R7(e){const t=e.scale;let n=0;e.overflowR>1&&e.overflowL>1?n=-e.overflowL:e.overflowR>1?n=e.overflowR:e.overflowL>1&&(n=-e.overflowL);const s=e.cam+n/t,o=Math.max(0,Math.min(e.maxCam,s)),i=s-o,a=e.nudgeX&&Math.abs(i)>.5?e.kidX-i:e.kidX;return{cam:o,kidX:a}}function C7(e){const t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[1][0]).toUpperCase():"?"}function I7(e,t=3){const n=[...e].sort((l,c)=>l.x-c.x||l.id.localeCompare(c.id)),s=[],o=[],i=(l,c,d,f)=>d===void 0||f===void 0||l.y===void 0||l.h===void 0?l.lane===c:Math.abs(d-c*f-(l.y-l.lane*l.h))<(f+l.h)/2,a=(l,c,d,f,u)=>s.some(p=>i(p,d,f,u)&&Math.abs(p.x-l)<(p.w+c)/2+8),r=[];for(const l of n){let c=-1;for(let d=0;d<t;d++)if(!a(l.x,l.w,d,l.y,l.h)){c=d;break}c<0?r.push(l):(s.push({x:l.x,w:l.w,lane:c,y:l.y,h:l.h}),o.push({id:l.id,lane:c,initials:!1}))}for(const l of r){const c=Math.min(l.w,44);let d=0;for(let f=0;f<t;f++)if(!a(l.x,c,f,l.y,l.h)){d=f;break}s.push({x:l.x,w:c,lane:d,y:l.y,h:l.h}),o.push({id:l.id,lane:d,initials:!0})}return o}let O7=0;function Sm(e=document){const t=[...e.querySelectorAll(".nametag")].filter(o=>{const i=o.getBoundingClientRect();return i.width>2&&i.height>2});if(!t.length)return;const n=t.map(o=>{o.dataset.tagId||(o.dataset.tagId="tg"+(++O7).toString(36)),o.dataset.full||(o.dataset.full=(o.textContent||"").trim()),o.classList.contains("is-initials")||(o.dataset.fullW=String(o.getBoundingClientRect().width));const i=o.getBoundingClientRect(),a=Number(o.dataset.fullW)||i.width,r=(parseFloat(getComputedStyle(o).fontSize)||16)*1.35,l=Number(o.style.getPropertyValue("--tag-lane"))||0;return{id:o.dataset.tagId,x:i.left+i.width/2,w:a,y:i.bottom+l*r,h:Math.max(r,i.height)}}),s=new Map(I7(n).map(o=>[o.id,o]));for(const o of t){const i=s.get(o.dataset.tagId||"");if(!i)continue;const a=o.dataset.full||"",r=i.initials?C7(a):a;o.textContent!==r&&(o.textContent=r),o.classList.toggle("is-initials",i.initials),o.style.setProperty("--tag-lane",String(i.lane))}}const Rd=120,B7=300,D7=.25,H7=500;function W7(e){return!Number.isFinite(e)||e<=0?Rd:Math.round(Math.min(B7,Math.max(Rd,e)))}function V7(e){return e.reduced||e.first||e.sinceResizeMs<H7||!(e.jumpFrac<=D7)?0:W7(e.avgGapMs*1.15)}let Tm=-1/0;if(typeof window<"u"){const e=()=>{Tm=performance.now()};window.addEventListener("resize",e),window.addEventListener("orientationchange",e)}function ep(e,t,n){if(!e)return NaN;const s=parseFloat(e),o=parseFloat(t);return!Number.isFinite(s)||!Number.isFinite(o)?NaN:e.endsWith("%")&&t.endsWith("%")?Math.abs(o-s)/100:e.endsWith("px")&&t.endsWith("px")&&n>0?Math.abs(o-s)/n:NaN}function Vl(e,t,n,s=performance.now()){if(!(e.style.left===t&&e.style.top===n)){if(e.classList.contains("other")){const o=Number(e.dataset.glideAt||0);e.dataset.glideAt=String(s);const i=o?Math.min(s-o,600):Rd,r=(Number(e.dataset.glideGap||0)||i)*.5+i*.5;e.dataset.glideGap=String(r);const l=e.parentElement,c=Math.max(ep(e.style.left,t,l?.clientWidth??0),ep(e.style.top,n,l?.clientHeight??0)),d=V7({first:!o||!e.style.left,jumpFrac:c,sinceResizeMs:s-Tm,reduced:Xn(),avgGapMs:r});e.style.transitionDuration=d+"ms",e.dataset.glideMs=String(d)}e.style.left=t,e.style.top=n}}function Pm(e,t,n=t+"s"){return`${e} ${e===1?t:n}`}function U7(e,t){const n=t?.type??"";switch(e){case"locked":return"This house is locked 🔒 You can look around!";case"notyours":return n==="char/move"||n.startsWith("item/")?"That's hers to move 💛":"Only she can do that one 💛";case"cuddling":return"Someone is cuddling!";case"nohouse":return"That house isn't on the street anymore.";case"toobig":return"This house is super full! Put something away first.";default:return""}}function z7(e,t,n){const s=n?"the "+n.toLowerCase():"something";return e?t.type==="item/move"?`${e} moved ${s}`:t.type==="item/delete"?`${e} put ${s} away`:"":""}function Q7(e=5e3){const t=new Map;return(n,s=Date.now())=>{const o=t.get(n)??-1/0;if(s-o<e)return!1;if(t.set(n,s),t.size>64)for(const[i,a]of t)s-a>e&&t.delete(i);return!0}}const N7="Everyone's already playing! Ask a grown-up to add your name.",q7=e=>`${e} is already on the list 💛`,Am="/kids-house-game/assets/window-CIKRGJz0.webp",j7=Object.freeze(Object.defineProperty({__proto__:null,default:Am},Symbol.toStringTag,{value:"Module"})),Rm="#5a3d5c",Et=`stroke="${Rm}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,F7={living:"#ff8fab",bedroom:"#c9a0dc",kitchen:"#8fd6a6",salon:"#f0a0d8",nursery:"#9ad7f5",bathroom:"#7ec8d6",backyard:"#80ed99"};function Cm(e){return e==="living"&&Zn()}function Z7(e){if(Cm(e))return`<div class="sceneWin builtin-window painted" aria-hidden="true"><div class="pwin"><img class="artimg" alt="" draggable="false" src="${Am}"><i class="artnight" aria-hidden="true"></i></div></div>`;const t=F7[e]??"#ffb3c6";return`<div class="sceneWin builtin-window" aria-hidden="true"><svg viewBox="0 0 160 180">
    <path d="M18 20 H142 V150 H18 Z" fill="#fff6ea" ${Et}/>
    <path d="M28 30 H132 V118 H28 Z" fill="#b9e3ff" ${Et}/>
    <path d="M80 30 V118 M28 74 H132" ${Et} stroke-width="3"/>
    <circle cx="48" cy="52" r="10" fill="#fff" opacity=".85"/>
    <ellipse cx="108" cy="48" rx="16" ry="8" fill="#fff" opacity=".8"/>
    <path d="M40 118 Q58 96 70 118 Q90 100 112 118" fill="#7dce8a" stroke="${Rm}" stroke-width="3"/>
    <rect x="96" y="86" width="8" height="32" rx="3" fill="#6b4a32" ${Et} stroke-width="2"/>
    <circle cx="100" cy="80" r="12" fill="#5cc985" ${Et} stroke-width="2"/>
    <path d="M8 16 Q6 80 16 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <path d="M152 16 Q154 80 144 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <rect x="46" y="146" width="68" height="12" rx="4" fill="#ffe7c2" ${Et}/>
  </svg></div>`}function G7(){return`<div class="sceneRug" aria-hidden="true"><svg viewBox="0 0 200 80">
    <ellipse cx="100" cy="48" rx="92" ry="24" fill="#ffc8dd" ${Et}/>
    <ellipse cx="100" cy="48" rx="64" ry="15" fill="#bde0fe" ${Et} stroke-width="3"/>
    <ellipse cx="100" cy="48" rx="28" ry="7" fill="#fff6ea"/>
  </svg></div>
  <div class="sceneLamp" aria-hidden="true"><svg viewBox="0 0 80 160">
    <path d="M18 52 L30 8 H50 L62 52 Z" fill="#ffd166" ${Et}/>
    <rect x="36" y="52" width="8" height="78" rx="4" fill="#c9a0dc" ${Et}/>
    <ellipse cx="40" cy="136" rx="26" ry="8" fill="#b388d6" ${Et}/>
    <circle cx="34" cy="28" r="4" fill="#fff" opacity=".8"/>
  </svg></div>
  <div class="scenePlant" aria-hidden="true"><svg viewBox="0 0 90 140">
    <path d="M45 128 C45 90 18 78 20 48 C40 58 44 80 45 128" fill="#5cc985" ${Et}/>
    <path d="M45 128 C45 92 74 70 78 40 C58 54 50 82 45 128" fill="#80ed99" ${Et}/>
    <path d="M45 128 C40 96 28 88 22 70" fill="none" stroke="#3d9a62" stroke-width="3"/>
    <path d="M30 132 H62 L56 118 H36 Z" fill="#e07a5f" ${Et}/>
    <ellipse cx="46" cy="126" rx="16" ry="5" fill="#c4634a"/>
  </svg></div>`}function Y7(e,t){return t==="backyard"?[]:[{id:e("rug"),kind:"rug",x:1152,y:540,flip:!1,z:0,scale:1},{id:e("lamp"),kind:"lamp",x:804,y:470,flip:!1,z:0,scale:1},{id:e("plant"),kind:"plant",x:1584,y:480,flip:!1,z:0,scale:1}]}let Ys="",Im=null;function K7(e){Im=e,Ys=""}function X7(e,t,n){const s=Im?.(t,n);if(s!=null){const r="custom|"+t;if(r===Ys&&e.childElementCount)return;Ys=r,e.innerHTML=s,e.dataset.room=t;return}if(t==="backyard"){const r="yard|"+t;if(r===Ys&&e.childElementCount)return;Ys=r,e.innerHTML="",e.dataset.room=t;return}const o=n.length===0,i=n.some(r=>/window|curtain/i.test(r.kind)),a=t+(o?"|e":"")+(i?"|w":"")+(Cm(t)?"|p":"");a===Ys&&e.childElementCount||(Ys=a,e.innerHTML=(i?"":Z7(t))+(o?G7():""),e.dataset.room=t)}let tp=null;function J7(e,t){if(e==="backyard")return"backyard";tp??=zn().rooms;const n=tp[e];return!n||t.wallTile||t.floorTile||t.wallpaper.toLowerCase()!==n.wallpaper.toLowerCase()||t.floor.toLowerCase()!==n.floor.toLowerCase()||t.pattern!==n.pattern?null:"room-"+e}const e9={backyard:{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]},barn:{w:3800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,200]]},clubhouse:{w:5200,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200],[4800,400]]},park:{w:5800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200],[4800,1e3]]},ranch:{w:7200,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200],[4800,1200],[6e3,1200]]},"room-bathroom":{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]},"room-bedroom":{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]},"room-kitchen":{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]},"room-living":{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]},"room-nursery":{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]},"room-salon":{w:4800,h:1200,tiles:[[0,1200],[1200,1200],[2400,1200],[3600,1200]]}},np=Object.assign({"../../assets/art/scene/backyard.webp":()=>h(()=>import("./backyard-C4n7jd31.js"),[]).then(e=>e.default),"../../assets/art/scene/barn.webp":()=>h(()=>import("./barn-DG-07NaG.js"),[]).then(e=>e.default),"../../assets/art/scene/clubhouse.webp":()=>h(()=>import("./clubhouse-CAzySw31.js"),[]).then(e=>e.default),"../../assets/art/scene/map-portrait.webp":()=>h(()=>import("./map-portrait-CTGs9sOW.js"),[]).then(e=>e.default),"../../assets/art/scene/map.webp":()=>h(()=>import("./map-BUJvl7XC.js"),[]).then(e=>e.default),"../../assets/art/scene/park.webp":()=>h(()=>import("./park-DL8kzHI3.js"),[]).then(e=>e.default),"../../assets/art/scene/ranch.webp":()=>h(()=>import("./ranch-CFAzH2IJ.js"),[]).then(e=>e.default),"../../assets/art/scene/room-bathroom.webp":()=>h(()=>import("./room-bathroom-EqYrBEhG.js"),[]).then(e=>e.default),"../../assets/art/scene/room-bedroom.webp":()=>h(()=>import("./room-bedroom-DX4Ycex-.js"),[]).then(e=>e.default),"../../assets/art/scene/room-kitchen.webp":()=>h(()=>import("./room-kitchen-WWNenRTM.js"),[]).then(e=>e.default),"../../assets/art/scene/room-living.webp":()=>h(()=>import("./room-living-PFJvgqHk.js"),[]).then(e=>e.default),"../../assets/art/scene/room-nursery.webp":()=>h(()=>import("./room-nursery-iz54eiRz.js"),[]).then(e=>e.default),"../../assets/art/scene/room-salon.webp":()=>h(()=>import("./room-salon-Dr5fy97s.js"),[]).then(e=>e.default)}),Ul=new Map;for(const e in np){const t=(e.split("/").pop()||"").replace(/\.webp$/i,"");t&&!t.startsWith("_")&&Ul.set(t,np[e])}const t9=Object.assign({"../../assets/art/scene-tiles/backyard/backyard.0.webp":()=>h(()=>import("./backyard.0-CSXsjQOi.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/backyard/backyard.1.webp":()=>h(()=>import("./backyard.1-DntyGX-Y.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/backyard/backyard.2.webp":()=>h(()=>import("./backyard.2-Pqupz3up.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/backyard/backyard.3.webp":()=>h(()=>import("./backyard.3-DO1YkYIm.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/barn/barn.0.webp":()=>h(()=>import("./barn.0-CqKqneXa.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/barn/barn.1.webp":()=>h(()=>import("./barn.1-BsUACQ_P.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/barn/barn.2.webp":()=>h(()=>import("./barn.2-B4LSWJJ1.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/barn/barn.3.webp":()=>h(()=>import("./barn.3-BHvngjn9.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/clubhouse/clubhouse.0.webp":()=>h(()=>import("./clubhouse.0-DuxNTKDT.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/clubhouse/clubhouse.1.webp":()=>h(()=>import("./clubhouse.1-D3VoUYtM.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/clubhouse/clubhouse.2.webp":()=>h(()=>import("./clubhouse.2-DTTWw483.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/clubhouse/clubhouse.3.webp":()=>h(()=>import("./clubhouse.3-BPiGPMmj.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/clubhouse/clubhouse.4.webp":()=>h(()=>import("./clubhouse.4-IQdup0W1.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/park/park.0.webp":()=>h(()=>import("./park.0-D3-rHkFV.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/park/park.1.webp":()=>h(()=>import("./park.1-BvSUGWCo.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/park/park.2.webp":()=>h(()=>import("./park.2-ChzxTPXW.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/park/park.3.webp":()=>h(()=>import("./park.3-DcxKKz-Y.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/park/park.4.webp":()=>h(()=>import("./park.4-DDqsVuYv.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/ranch/ranch.0.webp":()=>h(()=>import("./ranch.0-Dg3AIHmC.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/ranch/ranch.1.webp":()=>h(()=>import("./ranch.1-WjRmcitr.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/ranch/ranch.2.webp":()=>h(()=>import("./ranch.2-4YmZatX8.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/ranch/ranch.3.webp":()=>h(()=>import("./ranch.3-DFQSKZ7m.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/ranch/ranch.4.webp":()=>h(()=>import("./ranch.4-D0etOqRY.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/ranch/ranch.5.webp":()=>h(()=>import("./ranch.5-Dc-gYJ_b.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bathroom/room-bathroom.0.webp":()=>h(()=>import("./room-bathroom.0-DD0DxkZ1.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bathroom/room-bathroom.1.webp":()=>h(()=>import("./room-bathroom.1-DyqYEJCK.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bathroom/room-bathroom.2.webp":()=>h(()=>import("./room-bathroom.2-BFDlgQ81.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bathroom/room-bathroom.3.webp":()=>h(()=>import("./room-bathroom.3-6YMMRwFB.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bedroom/room-bedroom.0.webp":()=>h(()=>import("./room-bedroom.0-C-wmAMf-.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bedroom/room-bedroom.1.webp":()=>h(()=>import("./room-bedroom.1-nLadp7_P.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bedroom/room-bedroom.2.webp":()=>h(()=>import("./room-bedroom.2-D4LdGWHR.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-bedroom/room-bedroom.3.webp":()=>h(()=>import("./room-bedroom.3-De_n6kQm.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-kitchen/room-kitchen.0.webp":()=>h(()=>import("./room-kitchen.0-CIdVA1M6.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-kitchen/room-kitchen.1.webp":()=>h(()=>import("./room-kitchen.1-Dex09a2m.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-kitchen/room-kitchen.2.webp":()=>h(()=>import("./room-kitchen.2-B-4_QV89.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-kitchen/room-kitchen.3.webp":()=>h(()=>import("./room-kitchen.3-D-2XSjXx.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-living/room-living.0.webp":()=>h(()=>import("./room-living.0-Dcz4Y0yz.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-living/room-living.1.webp":()=>h(()=>import("./room-living.1-Cj0aYrda.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-living/room-living.2.webp":()=>h(()=>import("./room-living.2-dZeYCDDc.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-living/room-living.3.webp":()=>h(()=>import("./room-living.3-DdtyoRJF.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-nursery/room-nursery.0.webp":()=>h(()=>import("./room-nursery.0-BfldSb4z.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-nursery/room-nursery.1.webp":()=>h(()=>import("./room-nursery.1-BlQGSOIs.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-nursery/room-nursery.2.webp":()=>h(()=>import("./room-nursery.2-Dm3pl06d.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-nursery/room-nursery.3.webp":()=>h(()=>import("./room-nursery.3-UONUAIUj.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-salon/room-salon.0.webp":()=>h(()=>import("./room-salon.0-KNSg0ty4.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-salon/room-salon.1.webp":()=>h(()=>import("./room-salon.1-DqvqPc1O.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-salon/room-salon.2.webp":()=>h(()=>import("./room-salon.2-DXkU0KlN.js"),[]).then(e=>e.default),"../../assets/art/scene-tiles/room-salon/room-salon.3.webp":()=>h(()=>import("./room-salon.3-Dv1qX-Oc.js"),[]).then(e=>e.default)}),Jo=new Map;for(const[e,t]of Object.entries(e9)){const n=t.tiles.map(([s,o],i)=>({x:s,w:o,get:t9[`../../assets/art/scene-tiles/${e}/${e}.${i}.webp`]}));Ul.has(e)&&n.length&&n.every(s=>!!s.get)&&Jo.set(e,{w:t.w,parts:n})}const sp=!1;function n9(){try{const e=new URLSearchParams(location.search).get("tiles");return e==="1"?!1:e==="0"?!0:!sp}catch{return!sp}}function s9(){try{if(new URLSearchParams(location.search).get("art")==="v1")return!0}catch{}return!Mf()}const Rn=new Map,o9=24;function i9(e){let t=Rn.get(e);if(t)return t;const n=Ul.get(e),s={state:"loading",p:null};for(s.p=Cs(n).then(o=>(s.state="ok",s.url=o,o)).catch(()=>(s.state="failed",Rn.get(e)===s&&Rn.delete(e),null)),Rn.set(e,s);Rn.size>o9;)Rn.delete(Rn.keys().next().value);return s}const zl=new Set;function Ii(e,t){e.querySelectorAll(":scope > img.sceneArt").forEach(s=>{s.removeAttribute("src"),s.remove()}),zl.delete(e),St.delete(e),St.size||Bm();const n=t??e.__sceneMark;n&&(n.classList.remove("sceneArtOn"),delete n.dataset.sceneArt)}function Om(e){for(const t of[...zl])t!==e&&(t.dataset.sceneWant="",Ii(t,null))}function yo(e,t,n=e){const s=t&&Ul.has(t)&&!s9()?t:null;if(e.dataset.sceneWant=s??"",e.__sceneMark=n,!s){Ii(e,n);return}if(Om(e),Jo.has(s)&&!n9()){r9(e,s,n);return}St.has(e)&&Ii(e,n);const o=i9(s),i=l=>{if(e.dataset.sceneWant!==s)return;let c=e.querySelector(":scope > img.sceneArt");if(c&&c.getAttribute("src")===l&&!c.hidden){n.classList.add("sceneArtOn"),n.dataset.sceneArt=s;return}c||(c=document.createElement("img"),c.className="sceneArt",c.alt="",c.setAttribute("aria-hidden","true"),c.draggable=!1,c.decoding="async",e.prepend(c)),zl.add(e);const d=c;if(d.getAttribute("src")===l){a(d);return}d.hidden=!0,n.classList.remove("sceneArtOn"),delete n.dataset.sceneArt,d.src=l,d.decode().then(()=>{e.dataset.sceneWant===s&&d.isConnected&&d.getAttribute("src")===l&&a(d)},()=>{const f=Number(d.dataset.tries||"0");if(f<Ls.length&&e.dataset.sceneWant===s&&d.isConnected){d.dataset.tries=String(f+1),setTimeout(()=>{e.dataset.sceneWant===s&&d.isConnected&&d.getAttribute("src")===l&&(d.removeAttribute("src"),i(l))},Ls[f]);return}o.state="failed",Rn.get(s)===o&&Rn.delete(s),e.dataset.sceneWant===s&&Ii(e,n)})},a=l=>{l.hidden=!1,n.classList.add("sceneArtOn"),n.dataset.sceneArt=s};if(o.state==="ok"){i(o.url);return}if(o.state==="failed"){Ii(e,n);return}n.classList.remove("sceneArtOn"),delete n.dataset.sceneArt;const r=e.querySelector(":scope > img.sceneArt");r&&(r.hidden=!0),o.p.then(l=>{l&&i(l)})}const St=new Map,op=new Map;let Ki=0;function Bm(){Ki&&(clearInterval(Ki),Ki=0)}function a9(){Ki||(Ki=window.setInterval(()=>{if(!document.hidden)for(const e of St.keys())zf(e)},200))}function r9(e,t,n){const s=Jo.get(t);let o=St.get(e);if(!o||o.scene!==t){e.querySelectorAll(":scope > img.sceneArt").forEach(a=>{a.removeAttribute("src"),a.remove()}),n.classList.remove("sceneArtOn"),delete n.dataset.sceneArt;const i=s.parts.map((a,r)=>{const l=document.createElement("img");return l.className="sceneArt sceneTile",l.alt="",l.setAttribute("aria-hidden","true"),l.draggable=!1,l.decoding="async",l.dataset.tile=String(r),l.hidden=!0,l.style.left=a.x/s.w*100+"%",l.style.width=a.w/s.w*100+"%",l});e.prepend(...i),o={scene:t,mark:n,imgs:i,shown:!1},St.set(e,o)}zl.add(e),a9(),zf(e)}function zf(e){const t=St.get(e);if(!t||e.dataset.sceneWant!==t.scene)return;const n=Jo.get(t.scene),s=e.getBoundingClientRect();if(s.width<2)return;const o=innerWidth,i=o*.25,a=[];t.imgs.forEach((r,l)=>{const c=n.parts[l],d=s.left+c.x/n.w*s.width,f=d+c.w/n.w*s.width,u=f>-i&&d<o+i;f>0&&d<o&&a.push(r),u&&!r.dataset.state&&l9(e,t,r,l)}),!t.shown&&a.length&&a.every(r=>r.dataset.state==="ok")&&(t.shown=!0,t.mark.classList.add("sceneArtOn"),t.mark.dataset.sceneArt=t.scene)}function l9(e,t,n,s){n.dataset.state="loading";const o=t.scene+"."+s,i=op.get(o),a=i?Promise.resolve(i):Cs(()=>Jo.get(t.scene).parts[s].get()).then(c=>(op.set(o,c),c)),r=(c,d=0)=>{St.get(e)!==t||!n.isConnected||(n.src=c,n.decode().then(()=>{St.get(e)!==t||!n.isConnected||n.dataset.state==="loading"&&(n.hidden=!1,n.dataset.state="ok",zf(e))},()=>{if(!(St.get(e)!==t||!n.isConnected)){if(d<Ls.length){setTimeout(()=>{St.get(e)===t&&n.isConnected&&n.dataset.state==="loading"&&(n.removeAttribute("src"),r(c,d+1))},Ls[d]);return}l()}}))},l=()=>{St.get(e)===t&&(St.delete(e),St.size||Bm(),e.querySelectorAll(":scope > img.sceneTile").forEach(c=>{c.removeAttribute("src"),c.remove()}),Jo.delete(t.scene),yo(e,t.scene,t.mark))};a.then(c=>r(c),()=>l())}const Ue="#5a3d5c",A=(e=4)=>`stroke="${Ue}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Ra=600,rn=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],yn=(e,t,n=3)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${Ue}"/><circle cx="${e+1}" cy="${t-1}" r="${n/3}" fill="#fff"/>`,to=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="5" ry="3" fill="#ff9bb5" opacity=".75"/>`,c9=(e,t,n,s)=>rn.map((o,i)=>`<path d="M${e-n+i*s} ${t} A${n-i*s} ${n-i*s} 0 0 1 ${e+n-i*s} ${t}" fill="none" stroke="${o}" stroke-width="${s}"/>`).join(""),d9=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${A()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${A()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${A()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${A()}/></g>`,Dn=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-46" y="-50" width="92" height="50" rx="14" fill="#f5d27a" ${A()}/>
  <path d="M-30 -42 V-8 M0 -44 V-6 M30 -42 V-8" stroke="#d9a93f" stroke-width="4" stroke-linecap="round"/><path d="M-46 -26 H46" stroke="#c98a2e" stroke-width="5"/></g>`,f9=(e,t,n)=>{const s=Array.from({length:Math.floor((t-e)/70)+1},(o,i)=>`<rect x="${e+i*70-7}" y="${n-58}" width="14" height="64" rx="5" fill="#fff6e6" ${A(3)}/>`).join("");return`<rect x="${e}" y="${n-46}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${A(3)}/><rect x="${e}" y="${n-22}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${A(3)}/>${s}`};function h9(){const e=xa;return`<svg class="parkScene ranchScene" viewBox="0 0 ${e} ${Ra}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="rcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7e8ff"/><stop offset="1" stop-color="#fff4fb"/></linearGradient></defs>
  <rect width="${e}" height="440" fill="url(#rcSky)"/>
  <g opacity=".55">${c9(1900,430,620,26)}</g>
  ${[160,820,1500,2300,3e3].map((t,n)=>`<g transform="translate(${t} ${70+n%2*34})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <g transform="translate(${e-200} 92)"><circle r="48" fill="#ffe066" ${A()}/>${yn(-15,-6,4)}${yn(13,-6,4)}<path d="M-14 12 Q0 24 14 12" fill="none" ${A(3)}/>${to(-26,8)}${to(26,8)}</g>
  <path d="M-50 370 Q600 230 1300 350 T2600 330 T${e+100} 360 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#a6e3a0"/><path d="M0 410 H${e}" ${A()}/>
  <path d="M0 566 Q900 530 1800 570 T${e} 552 V600 H0 Z" fill="#f2dcb8" opacity=".9"/>
  ${d9(3560,400,.8,"#4fbf7a")}
  <!-- entrance gate with a rainbow arch -->
  <g class="ranchSign"><g class="ranchSignArt"><rect x="40" y="290" width="24" height="210" rx="6" fill="#c99366" ${A()}/><rect x="196" y="290" width="24" height="210" rx="6" fill="#c99366" ${A()}/>
    <path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${Ue}" stroke-width="44" stroke-linecap="round"/>
    ${rn.map((t,n)=>`<path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${t}" stroke-width="${36-n*6}" stroke-linecap="round"/>`).join("")}
    <rect x="22" y="250" width="216" height="40" rx="14" fill="#fff6e6" ${A(3)}/><text x="130" y="277" text-anchor="middle" font-size="19" font-weight="900" fill="${Ue}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  <!-- red barn with rainbow trim and banner -->
  <g transform="translate(270 0)">
    <path d="M0 470 V250 L60 180 H270 L330 250 V470 Z" fill="#ef5b5b" ${A(5)}/>
    <path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${Ue}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    ${rn.map((t,n)=>`<path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${t}" stroke-width="3" transform="translate(0 ${-7+n*2.8})" stroke-linejoin="round"/>`).join("")}
    <rect x="115" y="215" width="100" height="56" rx="10" fill="#fff6e6" ${A(4)}/><path d="M115 215 L215 271 M215 215 L115 271" stroke="#ef5b5b" stroke-width="6"/>
    <rect x="95" y="330" width="140" height="140" rx="8" fill="#fff6e6" ${A(4)}/><rect x="108" y="342" width="56" height="128" fill="#d94848" ${A(3)}/><rect x="166" y="342" width="56" height="128" fill="#d94848" ${A(3)}/>
    <path d="M108 342 L164 470 M164 342 L108 470 M166 342 L222 470 M222 342 L166 470" stroke="#fff6e6" stroke-width="6"/>
    <g class="barnBanner" transform="translate(165 300)"><g class="ranchSignArt">${rn.map((t,n)=>`<rect x="${-120+n*40}" y="-16" width="40" height="30" fill="${t}"/>`).join("")}<rect x="-120" y="-16" width="240" height="30" fill="none" ${A(3)}/>
      <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${Ue}" stroke-width="4" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  </g>
  ${Dn(640,560,.8)}${Dn(1950,470,.7)}${Dn(1880,470,.55)}${Dn(3115,470,.7)}${Dn(3115,425,.55)}
  <!-- the petting zoo moved into the barn: a sign by the barn door, sunflowers where the pen was -->
  ${Array.from({length:6},(t,n)=>{const s=1030+n*66,o=70+n%3*18;return`<g transform="translate(${s} 470)"><path d="M0 0 V-${o}" stroke="#40c057" stroke-width="6" stroke-linecap="round"/><ellipse cx="${n%2?9:-9}" cy="-${o/2}" rx="11" ry="5" fill="#69db7c" ${A(2.5)}/>${[0,45,90,135,180,225,270,315].map(i=>`<ellipse cx="${Math.cos(i*Math.PI/180)*14}" cy="${-o+Math.sin(i*Math.PI/180)*14}" rx="8" ry="5" transform="rotate(${i} ${Math.cos(i*Math.PI/180)*14} ${-o+Math.sin(i*Math.PI/180)*14})" fill="#ffd43b" ${A(2)}/>`).join("")}<circle cy="-${o}" r="10" fill="#a0522d" ${A(2.5)}/></g>`}).join("")}
  <!-- pond -->
  <ellipse cx="${xt.x}" cy="${xt.y}" rx="${xt.rx}" ry="${xt.ry}" fill="#8ecae6" ${A()}/><ellipse cx="${xt.x-15}" cy="${xt.y-6}" rx="70" ry="16" fill="#bde6f7"/>
  <!-- paddock fence + HORSES sign are their own depth layer (paddockFenceSVG) -->
  <!-- garden -->
  <rect x="3140" y="520" width="420" height="70" rx="20" fill="#b07d54" ${A()}/>
  <rect x="3260" y="430" width="160" height="40" rx="12" fill="#fff6e6" ${A(3)}/><text x="3340" y="458" text-anchor="middle" font-size="21" font-weight="900" fill="${Ue}" font-family="Nunito, system-ui, sans-serif">GARDEN</text>
  <path d="M3340 470 V500" ${A(5)}/>
  </svg>`}function u9(){return`<svg class="fenceLayer" viewBox="0 0 ${xa} ${Ra}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  ${f9(2400,3080,470)}
  <rect x="2640" y="380" width="180" height="40" rx="12" fill="#fff6e6" ${A(3)}/><text x="2730" y="408" text-anchor="middle" font-size="21" font-weight="900" fill="${Ue}" font-family="Nunito, system-ui, sans-serif">HORSES</text>
  </svg>`}const Dm=[{name:"Goat",say:"Meh-eh-eh!",snd:"bleat"},{name:"Sheep",say:"Baa!",snd:"baa"},{name:"Piglet",say:"Oink oink!",snd:"oink"},{name:"Chicks",say:"Peep peep!",snd:"peep"},{name:"Bunny",say:"*wiggle wiggle*",snd:"squeak"},{name:"Cow",say:"Moooo!",snd:"moo"}],or=(e,t,n,s=94)=>e.map((o,i)=>`<rect class="leg ${i%2?"b":"a"}" x="${o}" y="${t}" width="9" height="${s-t}" rx="4" fill="${n}" ${A(3)}/>`).join("");function Cd(e){switch(e){case 0:return`<svg viewBox="0 0 120 100">${or([32,44,70,82],60,"#efe6dc")}<path class="tail" d="M24 50 l-8 -10" ${A(5)}/>
      <ellipse cx="58" cy="56" rx="34" ry="17" fill="#f4ede5" ${A()}/><g class="head"><path d="M86 30 l-6 -16 l10 10 Z M96 30 l2 -17 l5 13 Z" fill="#c9b8a8" ${A(3)}/>
      <ellipse cx="94" cy="40" rx="14" ry="16" fill="#f4ede5" ${A()}/><ellipse class="ear" cx="80" cy="36" rx="9" ry="4" fill="#e8d6c4" ${A(3)}/>${yn(98,36)}<path d="M98 56 q2 8 6 0" fill="#e8d6c4" ${A(3)}/>${to(102,46)}<circle cx="106" cy="44" r="2" fill="${Ue}"/></g></svg>`;case 1:return`<svg viewBox="0 0 120 100">${or([36,48,70,80],62,"#5a4a5c")}
      ${[[40,50],[56,44],[72,48],[86,56],[70,64],[48,64],[34,60]].map(([t,n])=>`<circle cx="${t}" cy="${n}" r="15" fill="#fff" ${A(3)}/>`).join("")}<ellipse cx="60" cy="55" rx="30" ry="14" fill="#fff"/>
      <g class="head"><ellipse cx="96" cy="46" rx="13" ry="15" fill="#6b5a6e" ${A()}/><circle cx="92" cy="32" r="8" fill="#fff" ${A(3)}/><ellipse class="ear" cx="82" cy="44" rx="8" ry="4" fill="#6b5a6e" ${A(3)}/>
      <circle cx="99" cy="42" r="3.2" fill="#fff"/><circle cx="99.5" cy="42" r="1.8" fill="${Ue}"/>${to(102,52)}</g></svg>`;case 2:return`<svg viewBox="0 0 120 100">${or([38,50,66,78],66,"#ffadc6")}<path class="tail" d="M28 54 q-10 -4 -6 -12 q6 0 2 8" fill="none" ${A(3)}/>
      <ellipse cx="58" cy="60" rx="32" ry="20" fill="#ffc2d4" ${A()}/><g class="head"><circle cx="90" cy="52" r="16" fill="#ffc2d4" ${A()}/><path d="M80 38 l2 -12 l9 8 Z" fill="#ffadc6" ${A(3)}/>
      <ellipse cx="104" cy="56" rx="7" ry="8" fill="#ff9bb8" ${A(3)}/><circle cx="102" cy="54" r="1.6" fill="${Ue}"/><circle cx="106" cy="57" r="1.6" fill="${Ue}"/>${yn(92,46)}${to(90,60)}</g></svg>`;case 3:return`<svg viewBox="0 0 120 100">${[[30,72,1],[62,66,1.15],[92,74,.95]].map(([t,n,s])=>`<g transform="translate(${t} ${n}) scale(${s})"><path d="M-4 16 v8 M4 16 v8" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="4" r="14" fill="#ffe066" ${A(3)}/><path d="M-8 2 q-6 4 0 8" fill="#ffd43b" ${A(2)}/><g class="head"><circle cx="5" cy="-8" r="9" fill="#ffe066" ${A(3)}/><path d="M13 -9 l7 2 l-7 3 Z" fill="#ff9f43" ${A(2)}/>${yn(7,-10,2.2)}</g></g>`).join("")}</svg>`;case 4:return`<svg viewBox="0 0 120 100"><circle class="tail" cx="30" cy="68" r="8" fill="#fff" ${A(3)}/><ellipse cx="56" cy="72" rx="28" ry="20" fill="#f6eef9" ${A()}/><ellipse cx="74" cy="90" rx="12" ry="5" fill="#f6eef9" ${A(3)}/>
      <g class="head"><ellipse class="ear" cx="78" cy="26" rx="7" ry="20" fill="#f6eef9" ${A(3)} transform="rotate(-12 78 26)"/><ellipse cx="78" cy="26" rx="3" ry="13" fill="#ffc2d4" transform="rotate(-12 78 26)"/>
      <ellipse cx="90" cy="28" rx="7" ry="20" fill="#f6eef9" ${A(3)} transform="rotate(10 90 28)"/><circle cx="86" cy="56" r="17" fill="#f6eef9" ${A()}/>${yn(92,52)}<circle cx="102" cy="58" r="2.5" fill="#ff8fab"/>${to(90,63)}</g></svg>`;default:return`<svg viewBox="0 0 120 100">${or([30,42,72,84],62,"#fff")}<path class="tail" d="M20 50 q-6 14 0 26" fill="none" ${A(3)}/>
      <rect x="18" y="38" width="80" height="34" rx="16" fill="#fff" ${A()}/><path d="M30 40 q10 8 4 20 q-10 -2 -10 -14 Z M60 42 q14 2 10 18 q-12 4 -14 -8 Z" fill="${Ue}"/><ellipse cx="60" cy="74" rx="8" ry="5" fill="#ffadc6" ${A(2)}/>
      <g class="head"><path d="M90 24 l-8 -8 M108 24 l8 -8" stroke="#f5d27a" stroke-width="5" stroke-linecap="round"/><rect x="86" y="22" width="26" height="30" rx="12" fill="#fff" ${A()}/>
      <ellipse cx="100" cy="52" rx="14" ry="10" fill="#ffc2d4" ${A(3)}/><circle cx="95" cy="52" r="1.8" fill="${Ue}"/><circle cx="105" cy="52" r="1.8" fill="${Ue}"/>${yn(94,34)}${yn(106,34)}
      <ellipse class="ear" cx="82" cy="30" rx="7" ry="4" fill="#fff" ${A(3)}/></g></svg>`}}const xt={x:2265,y:520,rx:110,ry:34},p9=476,Kr=[{name:"Chestnut",body:"#c97b45",mane:"#7a3f22",sock:"#fff6e6"},{name:"Snowy",body:"#fdf8f3",mane:"#d9cdc4",sock:"#e9ddd2"},{name:"Midnight",body:"#4a3f52",mane:"#2a2230",sock:"#6b5e74"},{name:"Sunny",body:"#f2c96b",mane:"#fff6e0",sock:"#fff6e0"},{name:"Rainbow Pony",body:"#fff0fa",mane:"rainbow",sock:"#ffd6ec"}];function Qf(e,t=!1){const n=Kr[e]??Kr[0],s=n.mane==="rainbow",o=s?rn.map((r,l)=>{const c=124-l*1.6,d=14+l*2.4;return`<path d="M${c.toFixed(1)} ${d.toFixed(1)} q-6.5 2 -4.5 ${6+l*.35}" fill="none" stroke="${r}" stroke-width="5.5" stroke-linecap="round"/>`}).join(""):`<path d="M106 20 q-14 6 -18 30 q8 -6 10 -2 q4 -12 14 -18 Z" fill="${n.mane}" ${A(3)}/>`,i=s?`<g class="tail">${rn.map((r,l)=>`<path d="M30 58 q-18 ${8+l*3} -14 ${36+l}" fill="none" stroke="${r}" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`:`<path class="tail" d="M30 56 q-20 10 -14 44 q10 -10 8 -20 q6 -10 10 -18 Z" fill="${n.mane}" ${A(3)}/>`,a=(r,l)=>`<g class="leg ${l}"><rect x="${r}" y="78" width="12" height="44" rx="5" fill="${n.body}" ${A(3)}/><rect x="${r}" y="110" width="12" height="12" rx="4" fill="${n.sock}" ${A(3)}/></g>`;return`<svg viewBox="0 0 160 130" class="horsesvg">${i}${a(40,"a")}${a(56,"b")}${a(96,"b")}${a(112,"a")}
    <ellipse cx="80" cy="68" rx="50" ry="24" fill="${n.body}" ${A()}/>
    ${t||s?`<path class="saddle" data-top="43" d="M64 46 q16 -6 32 0 l-2 22 q-14 4 -28 0 Z" fill="${s?"#b197fc":"#e8590c"}" ${A(3)}/>`:""}
    <g class="head"><path d="M108 66 L114 30 Q118 16 132 18 L148 36 Q152 46 142 48 L130 46 L128 70 Z" fill="${n.body}" ${A()}/>
    <path d="M114 22 l2 -14 l8 12 Z" fill="${n.body}" ${A(3)}/>${o}
    ${yn(130,30,3.4)}<circle cx="146" cy="42" r="2" fill="${Ue}"/>${to(136,40)}
    ${s?`<path d="M120 14 l4 -14 l4 14 Z" fill="#ffd43b" ${A(2)}/>`:""}</g>
    ${s?'<g fill="#fff" opacity=".9"><path d="M60 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M92 74 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/></g>':""}</svg>`}const g9=`<svg viewBox="0 0 180 170"><path d="M10 70 L90 14 L170 70" fill="#ffa94d" ${A(5)}/>
  <rect x="24" y="66" width="132" height="84" rx="8" fill="#fff6e6" ${A()}/>${rn.map((e,t)=>`<rect x="${24+t*22}" y="66" width="22" height="10" fill="${e}"/>`).join("")}
  <rect x="24" y="66" width="132" height="10" fill="none" ${A(3)}/><circle cx="90" cy="108" r="22" fill="#5a3d5c"/>
  <path d="M60 150 l-12 16 M120 150 l12 16" ${A(5)}/>
  <g class="hen"><ellipse cx="90" cy="118" rx="20" ry="14" fill="#fff" ${A(3)}/><circle cx="104" cy="104" r="10" fill="#fff" ${A(3)}/><path d="M100 94 q3 -8 8 0" fill="#ff6b6b" ${A(2)}/>
  <path d="M113 104 l7 2 -7 3 Z" fill="#ffa94d" ${A(2)}/>${yn(106,102,2)}</g>
  <text x="90" y="54" text-anchor="middle" font-size="16" font-weight="900" fill="${Ue}" font-family="Nunito, system-ui, sans-serif">EGGS</text></svg>`,m9=`<svg viewBox="0 0 170 130"><rect x="80" y="30" width="54" height="50" rx="8" fill="#bde6f7" ${A()}/><rect x="74" y="24" width="66" height="10" rx="4" fill="#ff6b6b" ${A(3)}/>
  <rect x="20" y="62" width="130" height="34" rx="12" fill="#ff6b6b" ${A()}/><rect x="28" y="40" width="10" height="24" rx="3" fill="#868e96" ${A(3)}/>
  <circle cx="122" cy="98" r="28" fill="${Ue}"/><circle cx="122" cy="98" r="13" fill="#ffd43b" ${A(3)}/><circle cx="44" cy="106" r="18" fill="${Ue}"/><circle cx="44" cy="106" r="8" fill="#ffd43b" ${A(3)}/>
  <circle cx="26" cy="76" r="5" fill="#fff3b0" ${A(2)}/></svg>`,y9=`<svg viewBox="0 0 240 300"><rect x="104" y="160" width="32" height="140" rx="10" fill="#c99366" ${A()}/>
  <circle cx="120" cy="110" r="90" fill="#5cc985" ${A()}/><circle cx="62" cy="140" r="50" fill="#5cc985" ${A()}/><circle cx="180" cy="140" r="52" fill="#5cc985" ${A()}/>
  ${[[80,90],[150,70],[175,140],[100,150],[130,115],[60,140]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="11" fill="#ff6b6b" ${A(3)}/><path d="M${e} ${t-10} q2 -6 6 -7" fill="none" ${A(2)}/>`).join("")}</svg>`,ip=[[80,90],[150,70],[175,140],[100,150]],Hm=`<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="14" fill="#ff6b6b" ${A(3)}/><path d="M20 10 q2 -6 6 -7" fill="none" ${A(2.5)}/><ellipse cx="27" cy="8" rx="5" ry="3" fill="#5cc985" ${A(2)}/><circle cx="14" cy="18" r="3" fill="#fff" opacity=".6"/></svg>`,Ql=`<svg viewBox="0 0 40 40"><path d="M12 14 L32 10 L16 36 Z" fill="#ff922b" ${A(3)}/><path d="M18 18 l5 -1 M17 24 l4 -1" ${A(2)}/><path d="M30 10 q4 -8 8 -6 M30 10 q-2 -8 2 -10 M30 10 q6 -2 8 2" fill="none" stroke="#40c057" stroke-width="4" stroke-linecap="round"/></svg>`,b9=`<svg viewBox="0 0 40 40"><path d="M6 34 Q20 4 34 34 Z" fill="#f5d27a" ${A(3)}/><path d="M14 30 L18 14 M20 32 V10 M26 30 L22 14" stroke="#d9a93f" stroke-width="2.5" stroke-linecap="round"/></svg>`,pa=`<svg viewBox="0 0 40 40"><path d="M20 4 C30 4 34 20 34 26 C34 34 28 38 20 38 C12 38 6 34 6 26 C6 20 10 4 20 4 Z" fill="#fff6e6" ${A(3)}/><circle cx="15" cy="16" r="3" fill="#fff"/></svg>`,Nf=(e="#ff8fab")=>`<svg viewBox="0 0 40 40"><path d="M20 38 V20" stroke="#40c057" stroke-width="4" stroke-linecap="round"/>${[0,72,144,216,288].map(t=>`<circle cx="${20+Math.cos(t*Math.PI/180)*8}" cy="${14+Math.sin(t*Math.PI/180)*8}" r="7" fill="${e}" ${A(2.5)}/>`).join("")}<circle cx="20" cy="14" r="5" fill="#ffd43b" ${A(2)}/></svg>`,Wm={carrot:Ql,apple:Hm,hay:b9},w9=e=>`<svg viewBox="0 0 80 90"><g transform="translate(14 0) scale(1.3)">${Wm[e].replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g>
  <path d="M10 40 H70 L62 86 H18 Z" fill="${e==="carrot"?"#74c0fc":e==="apple"?"#ffa8c5":"#b2f2bb"}" ${A(4)}/><path d="M12 52 H68" stroke="#fff" stroke-width="4" opacity=".6"/></svg>`,k9=`<svg viewBox="0 0 60 50"><path d="M12 22 Q30 -6 48 22" fill="none" stroke="${Ue}" stroke-width="7" stroke-linecap="round"/><path d="M12 22 Q30 -6 48 22" fill="none" stroke="#e0a96d" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 22 H56 L50 46 H10 Z" fill="#e0a96d" ${A(3.5)}/><path d="M12 30 H48 M14 38 H46" stroke="#b5793d" stroke-width="3"/></svg>`,ap=["#ff8fab","#c9a0dc","#ffd43b","#74c0fc","#ff922b"];function Vm(e,t,n){const s=`<ellipse cx="35" cy="76" rx="30" ry="11" fill="${e?.wet?"#7a4b2e":"#9c6b46"}" ${A(3)}/>`;if(!e)return`<svg viewBox="0 0 70 90">${s}<path d="M20 74 q4 -3 8 0 M36 78 q4 -3 8 0" stroke="#b5875f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;const o=ap[n%ap.length];let i="";t===0&&(i=`<circle cx="27" cy="72" r="3" fill="#f2dcb8" ${A(1.5)}/><circle cx="36" cy="75" r="3" fill="#f2dcb8" ${A(1.5)}/><circle cx="44" cy="71" r="3" fill="#f2dcb8" ${A(1.5)}/>`),t===1&&(i=`<path d="M35 72 V58" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="57" rx="7" ry="4" fill="#69db7c" ${A(2)}/><ellipse cx="41" cy="55" rx="7" ry="4" fill="#69db7c" ${A(2)}/>`),t===2&&(i=`<path d="M35 72 V40 M35 60 Q22 54 20 42 M35 56 Q48 50 50 38" stroke="#40c057" stroke-width="4" fill="none" stroke-linecap="round"/>${e.seed==="flower"?`<circle cx="35" cy="38" r="7" fill="#b2f2bb" ${A(2)}/>`:""}`),t===3&&(i=e.seed==="carrot"?`<path d="M26 74 L44 72 L35 86 Z" fill="#ff922b" ${A(2.5)}/><path d="M35 72 Q24 50 22 38 M35 72 Q36 48 36 34 M35 72 Q46 50 50 40" stroke="#40c057" stroke-width="5" fill="none" stroke-linecap="round"/>`:`<path d="M35 72 V34" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="54" rx="8" ry="4" fill="#69db7c" ${A(2)}/>${[0,72,144,216,288].map(l=>`<circle cx="${35+Math.cos(l*Math.PI/180)*10}" cy="${28+Math.sin(l*Math.PI/180)*10}" r="8" fill="${o}" ${A(2.5)}/>`).join("")}<circle cx="35" cy="28" r="6" fill="#ffd43b" ${A(2)}/>`);const a=e.wet?"":`<g class="needWater"><path d="M56 18 q6 10 0 14 q-6 -4 0 -14 Z" fill="#74c0fc" ${A(2)}/></g>`,r=t===3?`<g class="ready"><path d="M58 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffd43b" ${A(1.5)}/></g>`:"";return`<svg viewBox="0 0 70 90">${s}${i}${a}${r}</svg>`}const v9=`<svg viewBox="0 0 48 48">${rn.map((e,t)=>`<path d="M${6+t*2.6} 38 A${18-t*2.6} ${18-t*2.6} 0 0 1 ${42-t*2.6} 38" fill="none" stroke="${e}" stroke-width="3"/>`).join("")}<path d="M4 38 H44" ${A(3)}/></svg>`,_9=`<svg viewBox="0 0 48 48"><path d="M10 34 Q24 22 38 34" fill="none" ${A(4)}/><path d="M24 30 V8 M16 16 L24 8 L32 16" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40 H40" ${A(4)}/></svg>`,$9=`<svg viewBox="0 0 200 320"><path d="M70 310 L84 120 H116 L130 310 Z" fill="#fff6e6" ${A(4)}/><path d="M78 200 H122 M74 260 H126" ${A(3)}/><rect x="88" y="262" width="24" height="48" rx="10" fill="#b197fc" ${A(3)}/>
  <path d="M78 124 L100 92 L122 124 Z" fill="#ff8fab" ${A(4)}/>
  <g class="sails" style="transform-origin:100px 110px">${[0,90,180,270].map(e=>`<g transform="rotate(${e} 100 110)"><path d="M100 110 L104 30 L126 30 L118 104 Z" fill="${["#ffd43b","#74c0fc","#ff8fab","#69db7c"][e/90]}" ${A(3)}/><path d="M108 40 H122 M107 58 H121 M106 76 H120" ${A(2)}/></g>`).join("")}<circle cx="100" cy="110" r="10" fill="#ffa94d" ${A(3)}/></g></svg>`,x9=["GOAT","SHEEP","PIGLET","CHICKS","BUNNY","COW"],M9=e=>`<g class="lantern" style="transform-origin:${e}px 146px"><path d="M${e} 146 V178" ${A(3)}/><circle cx="${e}" cy="204" r="34" fill="#fff3b0" opacity=".45"/>
  <path d="M${e-14} 182 H${e+14} L${e+11} 226 H${e-11} Z" fill="#ffe066" ${A(3)}/><rect x="${e-17}" y="176" width="34" height="8" rx="3" fill="#495057" ${A(2.5)}/><rect x="${e-15}" y="224" width="30" height="7" rx="3" fill="#495057" ${A(2.5)}/><ellipse cx="${e}" cy="205" rx="5" ry="9" fill="#ff922b"/></g>`;function L9(){const e=rf,t=Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64} 146 V440" stroke="#d4895f" stroke-width="3"/>`).join(""),n=Array.from({length:Math.ceil(e/46)},(o,i)=>{const a=i*46,r=160+Math.sin(i/3.1)*8;return`<path d="M${a} ${r} L${a+40} ${r} L${a+20} ${r+30} Z" fill="${rn[i%6]}" ${A(2.5)}/>`}).join(""),s=lf.map((o,i)=>`<g><rect x="${o-96}" y="318" width="192" height="122" rx="6" fill="#f0c49a" ${A(4)}/>
    <path d="M${o-96} 350 H${o+96} M${o-96} 384 H${o+96} M${o-96} 412 H${o+96}" stroke="#d9a074" stroke-width="3"/><path d="M${o-96} 318 L${o+96} 440 M${o+96} 318 L${o-96} 440" stroke="#e0aa7e" stroke-width="7" opacity=".7"/>
    <rect x="${o-54}" y="284" width="108" height="30" rx="10" fill="#fff6e6" ${A(3)}/><text x="${o}" y="305" text-anchor="middle" font-size="17" font-weight="900" fill="${Ue}" font-family="Nunito, system-ui, sans-serif">${x9[i]}</text></g>`).join("");return`<svg class="parkScene ranchScene barnScene" viewBox="0 0 ${e} ${Ra}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="440" fill="#e8a87c"/>${t}
  <!-- hay loft -->
  <rect width="${e}" height="128" fill="#c98a5e"/>${Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64+32} 0 V128" stroke="#b5764d" stroke-width="3"/>`).join("")}
  ${[120,260,420,980,1130,1290,1640,1790].map((o,i)=>Dn(o,126,i%3===1?.72:.85)).join("")}${[190,1060,1720].map(o=>Dn(o,82,.7)).join("")}
  <rect x="0" y="126" width="${e}" height="24" fill="#a8653a" ${A(4)}/>
  ${[0,1,2,3,4,5,6].map(o=>`<path d="M${120+o*280} 150 L${180+o*280} 210" stroke="#a8653a" stroke-width="12" stroke-linecap="round"/><path d="M${120+o*280} 150 L${180+o*280} 210" ${A(2)}/>`).join("")}
  <!-- ladder up to the loft -->
  <g transform="translate(1840 0)"><path d="M-22 150 L-30 440 M22 150 L30 440" stroke="#c99366" stroke-width="10" stroke-linecap="round"/>${[190,240,290,340,390].map(o=>`<path d="M${-22-(o-150)*.028} ${o} H${22+(o-150)*.028}" stroke="#c99366" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
  <!-- rainbow bunting + big rainbow banner -->
  <path d="M0 160 Q${e/2} 176 ${e} 160" fill="none" ${A(2)}/>${n}
  <g transform="translate(${e/2+60} 236)">${rn.map((o,i)=>`<rect x="${-180+i*60}" y="-26" width="60" height="44" fill="${o}"/>`).join("")}<rect x="-180" y="-26" width="360" height="44" rx="4" fill="none" ${A(4)}/>
    <path d="M-180 -26 L-200 -4 L-180 18 M180 -26 L200 -4 L180 18" fill="#ff8fab" ${A(3)}/>
    <text x="0" y="6" text-anchor="middle" font-size="26" font-weight="900" fill="#fff" stroke="${Ue}" stroke-width="5" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  <!-- round windows with daylight -->
  ${[440,1720].map(o=>`<circle cx="${o}" cy="236" r="34" fill="#c7e8ff" ${A(4)}/><path d="M${o-34} 236 H${o+34} M${o} 202 V270" ${A(3)}/>`).join("")}
  ${s}
  <!-- the big door (back outside) -->
  <rect x="24" y="200" width="206" height="244" rx="10" fill="#b5703f" ${A(4)}/>
  <rect x="38" y="214" width="178" height="230" fill="#c7e8ff"/><path d="M38 360 Q120 330 216 352 V444 H38 Z" fill="#a6e3a0"/><circle cx="180" cy="250" r="16" fill="#ffe066"/>
  <path d="M38 214 H216 V444 M38 214 V444" fill="none" ${A(4)}/>
  <!-- straw floor -->
  <rect x="0" y="438" width="${e}" height="162" fill="#f2d58a"/><path d="M0 440 H${e}" ${A(4)}/>
  ${Array.from({length:70},(o,i)=>{const a=i*137%e,r=470+i*53%120;return`<path d="M${a} ${r} l${14+i%3*4} ${i%2?-4:4}" stroke="#d9a93f" stroke-width="3" stroke-linecap="round"/>`}).join("")}
  <!-- feed station -->
  <g transform="translate(356 0)"><rect x="-70" y="456" width="140" height="34" rx="12" fill="#fff6e6" ${A(3)}/><text x="0" y="480" text-anchor="middle" font-size="16" font-weight="900" fill="${Ue}" font-family="Nunito, system-ui, sans-serif">FOOD 🥕🍎🌾</text></g>
  ${Dn(1790,590,.8)}${Dn(1700,600,.65)}
  ${[290,660,1330,1590].map(M9).join("")}
  </svg>`}const ei=600,Ft="#5a3d5c",ce=(e=4)=>`stroke="${Ft}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function Ca(e){const t=uo[e].seats,n=t<=2?140:t===4?110:100,s=(t-1)/2;return Array.from({length:t},(o,i)=>({x:uo[e].x+(i-s)*n,y:558-Math.abs(i-s)*8}))}const rp=["#ff7eb3","#ffd43b","#66d9e8","#d0bfff","#fff"],Jt=(e,t,n=1,s="#fff")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -9 L2.2 -2.4 L9 -2.2 L3.4 2.2 L5.4 9 L0 4.6 L-5.4 9 L-3.4 2.2 L-9 -2.2 L-2.2 -2.4 Z" fill="${s}" stroke="${Ft}" stroke-width="1.2" stroke-linejoin="round"/>`;function Id(e,t,n,s){const o=`<path d="M36 ${t} Q ${e/2} ${t+n+8} ${e-36} ${t}" fill="none" stroke="${Ft}" stroke-width="3"/>`,i=Array.from({length:s},(a,r)=>{const l=s===1?.5:r/(s-1),c=48+l*(e-96),d=t+Math.sin(l*Math.PI)*n,f=rp[r%rp.length];return`<g class="bulb" style="animation-delay:-${r%8*.22}s"><line x1="${c}" y1="${d-16}" x2="${c}" y2="${d-6}" stroke="${Ft}" stroke-width="2"/><circle cx="${c}" cy="${d}" r="7.5" fill="${f}" ${ce(2)}/><circle cx="${c-2}" cy="${d-2}" r="2.2" fill="#fff" opacity=".85"/></g>`}).join("");return o+i}const xi=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">
  <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".12"/>
  <path d="M-40 10 Q-48 -22 -10 -28 Q10 -46 34 -18 Q50 2 34 18 Q8 32 -24 20 Q-42 16 -40 10 Z" fill="${n}" ${ce(3)}/>
  <path d="M-18 -6 Q-4 -20 14 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <circle cx="16" cy="6" r="4" fill="#fff" opacity=".35"/>
</g>`,lp=(e,t,n)=>`<g transform="translate(${e} ${t})">
  <ellipse cx="0" cy="16" rx="28" ry="9" fill="#000" opacity=".12"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="${n}" ${ce(3)}/>
  <ellipse cx="-6" cy="-2" rx="12" ry="7" fill="#fff" opacity=".35"/>
  <path d="M0 -16 V-28" ${ce(3)}/><circle cy="-32" r="6" fill="#ffd43b" ${ce(2)}/>
</g>`;function Mi(e,t,n,s,o,i=""){return`<g class="photoFrame${i}" transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-40" y="-52" width="80" height="104" rx="6" fill="#fff" ${ce(3.5)}/>
    <rect x="-32" y="-44" width="64" height="72" rx="4" fill="${s}"/>
    ${o}
    <rect x="-10" y="-58" width="20" height="10" rx="2" fill="#ffe8a3" opacity=".85" transform="rotate(-8)"/>
  </g>`}function ir(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-28" y="-34" width="56" height="68" rx="3" fill="#fff" ${ce(3)}/>
    <rect x="-22" y="-28" width="44" height="40" fill="${s}"/>
    ${o}
  </g>`}function ar(e,t,n,s){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="36" rx="26" ry="8" fill="#000" opacity=".12"/>
    <path d="M-18 36 L-12 -2 H12 L18 36 Z" fill="${n}" ${ce(3)}/>
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c9a27a" ${ce(2)}/>
    <ellipse cx="-16" cy="-16" rx="16" ry="22" fill="${s}" ${ce(3)} transform="rotate(-18)"/>
    <ellipse cx="16" cy="-18" rx="16" ry="22" fill="${s}" ${ce(3)} transform="rotate(16)"/>
    <ellipse cx="0" cy="-28" rx="14" ry="20" fill="${s}" ${ce(3)}/>
    <circle cx="0" cy="-36" r="6" fill="#ff8ec8" ${ce(2)}/>
  </g>`}function E9(e,t){return`<g transform="translate(${e} ${t})">
    <ellipse cx="28" cy="118" rx="32" ry="8" fill="#000" opacity=".12"/>
    <rect width="56" height="118" rx="10" fill="#e7fbff" ${ce()}/>
    <rect y="52" width="56" height="8" fill="#d0f4ff" ${ce(2)}/>
    <rect x="44" y="18" width="6" height="22" rx="3" fill="#ffd43b" ${ce(2)}/>
    <rect x="44" y="70" width="6" height="28" rx="3" fill="#ffd43b" ${ce(2)}/>
    <rect x="8" y="12" width="28" height="22" rx="4" fill="#fff" ${ce(2)}/>
    <circle cx="16" cy="22" r="4" fill="#ff8ec8"/><circle cx="28" cy="24" r="3" fill="#ffd43b"/>
    <path d="M18 78 C14 72 8 74 12 82 C15 88 18 90 18 90 C18 90 21 88 24 82 C28 74 22 72 18 78 Z" fill="#ff4d94" ${ce(1.5)}/>
  </g>`}function S9(e,t,n){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="6" rx="34" ry="9" fill="#000" opacity=".1"/>
    <path d="M-46 -16 C-50 -86 -26 -108 0 -110 C26 -108 50 -86 46 -16 Z" fill="#fff6fb" ${ce()}/>
    <path d="M-32 -20 C-34 -74 -16 -90 0 -92 C16 -90 34 -74 32 -20 Z" fill="${n}"/>
    <ellipse cx="0" cy="-10" rx="40" ry="16" fill="${n}" ${ce()}/>
    <ellipse cx="-8" cy="-16" rx="14" ry="6" fill="#fff" opacity=".4"/>
    <path d="M-22 -2 L-26 16 M22 -2 L26 16" fill="none" stroke="${Ft}" stroke-width="4" stroke-linecap="round"/>
  </g>`}function T9(e){const t=uo[e],n=t.game==="four"?"Four":"Slay",s=t.game==="four"?"#7ad7ea":e===0?"#ff8ec8":"#e0b0ff",o=t.game==="four"?"#b8f2ff":e===0?"#ffd0e6":"#ead9ff",i=t.seats>=6?250:t.seats>=4?200:150;return`${Ca(e).map(r=>S9(r.x,r.y,o)).join("")}
  <g transform="translate(${t.x} 500)">
    <ellipse cx="0" cy="28" rx="${i+18}" ry="20" fill="#000" opacity=".1"/>
    <rect x="-18" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${ce(3)}/>
    <rect x="4" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${ce(3)}/>
    <ellipse cx="0" cy="-4" rx="${i}" ry="30" fill="${s}" stroke="#ffd43b" stroke-width="6"/>
    <ellipse cx="0" cy="-4" rx="${i-16}" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <ellipse cx="${-i*.25}" cy="-12" rx="${i*.35}" ry="8" fill="#fff" opacity=".28"/>
    <text x="0" y="4" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="${Ft}" stroke-width="4" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${n}</text>
  </g>`}const Li=(e,t,n=1,s="#ff4d94")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 4 C-6 -4 -14 -2 -10 6 C-7 12 0 16 0 16 C0 16 7 12 10 6 C14 -2 6 -4 0 4 Z" fill="${s}" stroke="${Ft}" stroke-width="1.6" stroke-linejoin="round"/>`;function cp(e,t){const n=Ma,s=Math.max(1,Math.ceil(t));let o="";if(e==="top"){o=`<rect width="${n}" height="${s}" fill="#ffe0f2"/>`;for(let i=s-70,a=0;i>24;i-=150,a++)o+=Id(n,i,a%2?22:16,a%2?26:20);for(let i=0;i<14;i++){const a=90+i*397%(n-180),r=20+i*131%Math.max(20,s-70);o+=Jt(a,r,.55+i%3*.2,i%2?"#fff":"#ffd43b")}}else{o=`<defs><linearGradient id="grFloorExt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e089ab"/><stop offset="1" stop-color="#d27399"/></linearGradient></defs>
  <rect width="${n}" height="${s}" fill="url(#grFloorExt)"/>`;for(let i=46;i<s;i+=64)o+=`<rect y="${i}" width="${n}" height="3" fill="#fff" opacity=".18"/>`}return`<svg class="grExt grExt-${e}" viewBox="0 0 ${n} ${s}" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${o}</svg>`}function P9(){const e=Ma,t=[[120,200],[260,250],[640,210],[900,250],[1180,190],[1560,230],[1860,180],[2100,240],[2420,200],[2520,280]];return`<svg class="grScene" viewBox="0 0 ${e} ${ei}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="${e}" height="${ei}" fill="url(#grWall)"/>
  <rect y="390" width="${e}" height="80" fill="#fff6fb" opacity=".45"/>
  ${Array.from({length:8},(n,s)=>`<rect x="${40+s*330}" y="400" width="280" height="62" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`).join("")}
  <rect y="468" width="${e}" height="132" fill="url(#grFloor)"/>
  <rect y="464" width="${e}" height="12" fill="#ffd43b" ${ce(3)}/>
  ${[720,1500,2150].map((n,s)=>`<ellipse cx="${n}" cy="548" rx="${s===1?210:280}" ry="42" fill="${s===1?"#d8f6ff":s===0?"#ffe0f0":"#f3e8ff"}" stroke="#fff" stroke-width="4" opacity=".8"/>`).join("")}
  ${Id(e,28,22,28)}
  ${Id(e,78,16,18)}
  ${t.map(([n,s],o)=>Jt(n,s,.7+o%3*.28,o%2?"#fff":"#ffd43b")).join("")}

  <g transform="translate(1180 70)">
    <rect x="20" y="20" width="220" height="150" rx="16" fill="url(#grSky)" ${ce()}/>
    <path d="M20 70 H240 M130 20 V170" ${ce(3)}/>
    <circle cx="78" cy="48" r="14" fill="#ffd43b" ${ce(2)}/>
    <path d="M8 36 Q20 90 8 150" fill="#ff8ec8" ${ce(3)}/><path d="M252 36 Q240 90 252 150" fill="#d0bfff" ${ce(3)}/>
  </g>

  <g class="neonSign" transform="translate(560 168)">
    <g class="neonSignArt">
    <rect x="-228" y="-58" width="456" height="108" rx="28" fill="#2b1430" ${ce(5)}/>
    <rect class="neonRing" x="-214" y="-44" width="428" height="80" rx="22" fill="none" stroke="#ff4d94" stroke-width="4"/>
    <path d="M-150 8 C-162 -14 -186 -8 -174 12 C-166 26 -150 36 -150 36 C-150 36 -134 26 -126 12 C-114 -8 -138 -14 -150 8 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="2"/>
    <text x="6" y="16" text-anchor="middle" font-size="40" font-weight="900" fill="#ff7eb3" stroke="#fff6fb" stroke-width="2" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY CLUB</text>
    </g>
  </g>

  ${Mi(500,340,-6,"#ffe0f0",`${Li(0,8,1.4)}${Jt(-18,-16,.7,"#ffd43b")}${Jt(18,-10,.55,"#66d9e8")}`," frameAtHead")}
  ${Mi(270,196,-8,"#ffe0f0",`${Li(0,8,1.4)}${Jt(-18,-16,.7,"#ffd43b")}${Jt(18,-10,.55,"#66d9e8")}`," framePhone")}
  ${Mi(980,240,5,"#e7fbff",`<ellipse cx="0" cy="6" rx="16" ry="12" fill="#fff" ${ce(2)}/><path d="M-6 6 Q0 -8 6 6" fill="none" stroke="${Ft}" stroke-width="2"/><path d="M0 18 V28 M-12 24 H12" ${ce(2)}/>`)}
  ${Mi(1680,255,-4,"#fff3c4",`${Jt(0,2,1.5,"#ffd43b")}`)}
  ${Mi(2360,245,6,"#f3e8ff",`${Li(0,4,1.3,"#d0bfff")}`)}
  ${ir(400,300,8,"#fff0f6",Li(0,-4,1.1))}
  ${ir(820,310,-7,"#e7fbff",Jt(0,-6,1,"#66d9e8"))}
  ${ir(1900,300,9,"#fff6e6",Jt(0,-6,1,"#ffd43b"))}
  ${ir(2280,320,-8,"#ffe0f0",Li(0,-4,1))}

  <g class="disco" transform="translate(1288 36)">
    <line y1="0" y2="22" stroke="${Ft}" stroke-width="3"/>
    <circle cy="44" r="26" fill="url(#disco)" ${ce(3)}/>
    <path d="M-14 36 L0 56 L14 36 M-8 48 H8" fill="none" stroke="#fff" stroke-width="2.5"/>
    ${Jt(-30,20,.45)}${Jt(32,28,.4,"#ffd43b")}
  </g>

  <g transform="translate(86 292)">
    <rect width="78" height="168" rx="12" fill="#ff8ec8" ${ce()}/>
    <rect x="8" y="10" width="62" height="36" rx="8" fill="#fff6e6" ${ce(2)}/>
    <text x="39" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="${Ft}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
    <circle cx="62" cy="96" r="5" fill="#ffd43b" ${ce(2)}/>
    <rect x="22" y="118" width="34" height="8" rx="3" fill="#fff" opacity=".45"/>
  </g>

  ${ar(40,400,"#ffd43b","#8ce99a")}
  ${ar(1080,392,"#ff8ec8","#69db7c")}
  ${ar(1600,400,"#d0bfff","#8ce99a")}
  ${ar(2520,396,"#66d9e8","#69db7c")}
  ${E9(200,348)}
  <g transform="translate(2420 360)">
    <rect width="130" height="100" rx="14" fill="#fff6fb" ${ce()}/>
    <rect y="28" width="130" height="10" fill="#ffd0e6" ${ce(2)}/>
    <circle cx="28" cy="64" r="12" fill="#ffd43b" ${ce(2)}/><circle cx="64" cy="66" r="10" fill="#ff8ec8" ${ce(2)}/><rect x="86" y="52" width="28" height="22" rx="6" fill="#66d9e8" ${ce(2)}/>
    <text x="65" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="${Ft}" font-family="Nunito, ui-rounded, system-ui, sans-serif">SNACKS</text>
  </g>

  ${xi(330,455,"#ff8ec8",1.05)}
  ${xi(1120,468,"#d0bfff")}
  ${xi(1360,470,"#8ce4f2",.9)}
  ${xi(1780,462,"#ffd43b")}
  ${lp(1480,500,"#ffb3d9")}
  ${lp(2e3,505,"#c9b3ff")}
  ${xi(2550,468,"#ff8ec8",.85)}

  ${uo.map((n,s)=>T9(s)).join("")}
  </svg>`}const A9=`<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${Ft}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`,j="#5a3d5c",R9=`<svg viewBox="0 0 120 100"><rect x="0" y="62" width="120" height="38" rx="14" fill="#9fe0aa" stroke="${j}" stroke-width="3"/>
  <path d="M18 70 L30 22 L42 70 M78 70 L90 22 L102 70" fill="none" stroke="#8ecae6" stroke-width="5" stroke-linecap="round"/><path d="M26 22 H94" stroke="#ff8fab" stroke-width="7" stroke-linecap="round"/>
  <path d="M50 22 V54 M66 22 V54" stroke="${j}" stroke-width="2.5"/><rect x="45" y="52" width="26" height="7" rx="3" fill="#ff9f68" stroke="${j}" stroke-width="2.5"/>
  <circle cx="104" cy="14" r="9" fill="#ffd166" stroke="${j}" stroke-width="3"/></svg>`,Um=`<svg viewBox="0 0 120 100"><path d="M20 50 L60 16 L100 50" fill="#ff8fab" stroke="${j}" stroke-width="4" stroke-linejoin="round"/><rect x="28" y="48" width="64" height="44" rx="6" fill="#fff6e6" stroke="${j}" stroke-width="4"/>
  <rect x="52" y="64" width="16" height="28" rx="4" fill="#c9a0dc" stroke="${j}" stroke-width="3"/><rect x="34" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${j}" stroke-width="3"/><rect x="73" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${j}" stroke-width="3"/></svg>`,qf=`<svg viewBox="0 0 120 100"><path d="M40 18 L24 28 L14 46 L30 52 L34 44 V88 H86 V44 L90 52 L106 46 L96 28 L80 18 Q60 34 40 18 Z" fill="#8ecae6" stroke="${j}" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="58" r="7" fill="#fff3b0" stroke="${j}" stroke-width="3"/></svg>`,ke=e=>`<div class="wnArt">${e}</div>`,zm=`<svg viewBox="0 0 120 100"><rect x="16" y="58" width="74" height="24" rx="10" fill="#fff" stroke="${j}" stroke-width="4"/><circle cx="32" cy="70" r="7" fill="#ff8fab" stroke="${j}" stroke-width="3"/><circle cx="52" cy="70" r="7" fill="#ffe066" stroke="${j}" stroke-width="3"/><circle cx="72" cy="70" r="7" fill="#8ecae6" stroke="${j}" stroke-width="3"/><path d="M86 46 l14 -16 8 8 -14 16z" fill="#ffd166" stroke="${j}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="44" width="12" height="24" rx="4" fill="#c9a0dc" stroke="${j}" stroke-width="3"/></svg>`,C9=`<svg viewBox="0 0 120 100">${rn.map((e,t)=>`<path d="M${12+t*6} 84 A${48-t*6} ${48-t*6} 0 0 1 ${108-t*6} 84" fill="none" stroke="${e}" stroke-width="6"/>`).join("")}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${j}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${j}" stroke-width="3"/></svg>`,I9=`<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${pa.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g><g transform="translate(52 22) scale(1.4)">${pa.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g></svg>`,Qm=(e,t,n,s)=>`<g transform="translate(${t} ${n}) scale(${s})">${e.replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"")}</g>`,O9=`<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${j}" stroke-width="4"/>${Qm(nf(Mt({skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6"})).replace('viewBox="14 2 72 74"','viewBox="0 0 100 160"'),26,12,.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`,B9=`<svg viewBox="0 0 120 100"><rect x="8" y="28" width="104" height="64" rx="16" fill="#fff0f6" stroke="${j}" stroke-width="4"/><path d="M8 40 L60 12 L112 40" fill="#ff6b9a" stroke="${j}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 58 C52 48 40 50 46 60 C50 68 60 74 60 74 C60 74 70 68 74 60 C80 50 68 48 60 58 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  ${[18,34,50,66,82,98].map((e,t)=>`<circle cx="${e}" cy="24" r="4" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" stroke="${j}" stroke-width="1.5"/>`).join("")}</svg>`,D9=`<svg viewBox="0 0 120 100"><rect x="28" y="8" width="64" height="84" rx="12" fill="#fff" stroke="${j}" stroke-width="4"/><rect x="28" y="8" width="64" height="84" rx="12" fill="none" stroke="#ff7eb3" stroke-width="6"/><path d="M48 36 L54 24 L60 34 L68 20 L76 34 L82 24 L88 36 Z" fill="#ffd43b" stroke="${j}" stroke-width="2" stroke-linejoin="round"/><text x="60" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#ff4d94" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY</text></svg>`,H9=`<svg viewBox="0 0 120 100"><rect x="10" y="16" width="100" height="72" rx="14" fill="#fff6fb" stroke="${j}" stroke-width="4"/>
  <path d="M36 58 C28 48 18 50 24 60 C28 68 36 74 36 74 C36 74 44 68 48 60 C54 50 44 48 36 58 Z" fill="#ff4d94" stroke="${j}" stroke-width="2"/>
  <path d="M78 28 L82 40 H94 L84 48 L88 60 L78 52 L68 60 L72 48 L62 40 H74 Z" fill="#66d9e8" stroke="${j}" stroke-width="2"/></svg>`,Nm=`<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="22" rx="6" fill="#fff" stroke="${j}" stroke-width="3"/><path d="M6 26 H42 M14 18 V40 M22 18 V40 M30 18 V40 M36 18 V40" stroke="${j}" stroke-width="2.4"/><rect x="4" y="12" width="40" height="8" rx="4" fill="#9ad7f5" stroke="${j}" stroke-width="3"/><ellipse cx="20" cy="32" rx="5" ry="3" fill="#ffe0ec"/><ellipse cx="30" cy="32" rx="5" ry="3" fill="#c9e7ff"/></svg>`,W9=`<svg viewBox="0 0 120 100"><ellipse cx="60" cy="72" rx="50" ry="20" fill="#ffc2d4" stroke="${j}" stroke-width="4"/><ellipse cx="60" cy="72" rx="32" ry="11" fill="#fff" stroke="${j}" stroke-width="3"/><path d="M60 58 C50 46 36 48 42 60 C48 70 60 78 60 78 C60 78 72 70 78 60 C84 48 70 46 60 58 Z" fill="#ff4d94" stroke="${j}" stroke-width="3"/><path d="M22 40 Q28 28 36 36" fill="none" stroke="#7dce8a" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="5" fill="#ffd166" stroke="${j}" stroke-width="2"/></svg>`,V9=`<svg viewBox="0 0 120 100"><path d="M16 50 L60 14 L104 50" fill="#ff8fab" stroke="${j}" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="48" width="68" height="40" rx="10" fill="#fff6ea" stroke="${j}" stroke-width="4"/><path d="M42 88 V60 Q60 44 78 60 V88" fill="#ffe8c7" stroke="${j}" stroke-width="3"/><circle cx="82" cy="64" r="7" fill="#bde0fe" stroke="${j}" stroke-width="3"/><circle cx="80" cy="62" r="2" fill="#fff"/></svg>`,U9=`<svg viewBox="0 0 120 100"><rect x="28" y="38" width="64" height="42" rx="8" fill="#8ecae6" stroke="${j}" stroke-width="4"/><path d="M28 44 L60 68 L92 44" fill="none" stroke="${j}" stroke-width="4"/><path d="M76 30 V16" stroke="${j}" stroke-width="4" stroke-linecap="round"/><path d="M76 16 H96 L90 23 L96 30 H76 Z" fill="#ff6b6b" stroke="${j}" stroke-width="3"/></svg>`,z9=`<svg viewBox="0 0 120 100"><rect x="8" y="32" width="48" height="40" rx="14" fill="#fff3b0" stroke="${j}" stroke-width="4"/><rect x="64" y="32" width="48" height="40" rx="14" fill="#fff" stroke="${j}" stroke-width="4"/><path d="M26 44 L40 52 L26 60 Z" fill="${j}"/><circle cx="88" cy="52" r="6" fill="#ff8fab" stroke="${j}" stroke-width="3"/></svg>`,Q9=`<svg viewBox="0 0 120 100"><rect x="16" y="18" width="36" height="58" rx="6" fill="#fff" stroke="${j}" stroke-width="4"/><rect x="62" y="24" width="42" height="52" rx="6" fill="#e7f6ff" stroke="${j}" stroke-width="4"/><circle cx="34" cy="66" r="2.4" fill="${j}"/><circle cx="83" cy="66" r="2.4" fill="${j}"/></svg>`,qm=`<svg viewBox="0 0 120 100"><rect x="28" y="16" width="64" height="72" rx="16" fill="#fff" stroke="${j}" stroke-width="4"/><path d="M40 36 H80 M40 52 H80 M40 68 H80" fill="none" stroke="${j}" stroke-width="5" stroke-linecap="round"/><circle cx="92" cy="24" r="12" fill="#ff6b9a" stroke="${j}" stroke-width="3"/><text x="92" y="29" text-anchor="middle" font-size="14" font-weight="900" fill="#fff" font-family="Nunito, ui-rounded, system-ui, sans-serif">1</text></svg>`,N9=`<svg viewBox="0 0 120 100"><rect x="6" y="10" width="108" height="80" rx="18" fill="#2a2158" stroke="${j}" stroke-width="4"/><circle cx="34" cy="42" r="14" fill="#ffd166" stroke="${j}" stroke-width="3"/><path d="M78 28 a16 16 0 1 0 0 32 a12 12 0 1 1 0 -32z" fill="#fff6e4" stroke="${j}" stroke-width="3"/><circle cx="92" cy="30" r="2" fill="#fff"/><circle cx="70" cy="24" r="1.6" fill="#fff"/><circle cx="100" cy="48" r="1.6" fill="#fff"/></svg>`,q9=`<svg viewBox="0 0 120 100"><circle cx="60" cy="52" r="34" fill="#fff6e4" stroke="${j}" stroke-width="4"/><path d="M60 52 V32 M60 52 L76 60" stroke="${j}" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="52" r="3" fill="${j}"/><path d="M28 22 l4 6 M92 22 l-4 6" stroke="#ffb15c" stroke-width="4" stroke-linecap="round"/></svg>`,jm=`<svg viewBox="0 0 120 100"><path d="M60 18 L72 46 H96 L78 62 L84 90 L60 74 L36 90 L42 62 L24 46 H48 Z" fill="#ffd166" stroke="${j}" stroke-width="4" stroke-linejoin="round"/><path d="M60 48 L28 92 H92 Z" fill="#2f6b4f" stroke="${j}" stroke-width="4" stroke-linejoin="round"/><rect x="52" y="88" width="16" height="8" rx="2" fill="#c44558" stroke="${j}" stroke-width="3"/></svg>`,Fm=[{v:10,title:"Winter Cheer!",lines:[{art:ke(jm),text:"The <b>Winter Cheer</b> pack is in your drawer!"}]},{v:9,title:"Everything's tidied into the Menu!",lines:[{art:ke(qm),text:"Everything's tidied into the <b>Menu</b>!"},{art:ke(N9),text:"The world follows the <b>clock</b>: morning, day, golden evening, and night."},{art:ke(q9),text:"Tap the <b>sun</b> and the <b>moon</b>. <b>Auto</b> follows the clock."}]},{v:8,title:"Make your look!",lines:[{art:ke(U9),text:"Leave a <b>letter</b> in a friend's mailbox!"},{art:ke(z9),text:"Tap <b>Play</b> or <b>Decorate</b>!"},{art:ke(qf),text:"<b>Make your look!</b> New hair, clothes, and colors."},{art:ke(Q9),text:"Update every iPad to see the <b>new outfits</b>!"}]},{v:7,title:"New Nursery!",lines:[{art:ke(Nm),text:"A new <b>Nursery</b> room, with a <b>crib</b> and a rocker!"},{art:ke(W9),text:"The <b>Cozy Cottage</b> furniture pack is in your drawer!"},{art:ke(V9),text:"A <b>dog kennel</b> and a <b>cat tower</b> for your pets!"}]},{v:6,title:"The clubhouse is open!",lines:[{art:ke(B9),text:"A glam <b>clubhouse</b> on the map!"},{art:ke(D9),text:"Play <b>Slay</b> with friends at a table!"},{art:ke(H9),text:"Line up <b>hearts</b> or <b>stars</b>!"}]},{v:5,title:"Your house looks even cozier!",lines:[{art:ke(zm),text:"Wallpaper and floors show their <b>real patterns</b> when you paint!"},{art:ke(Ko(0,"sit",Yo(0,"sit"))),text:"Your cat is <b>big and cozy</b>, just like the toy cat."},{art:ke(Um),text:"Tap <b>home</b> to come back from the map, the park, or the ranch."}]},{v:4,title:"A map of our neighborhood!",lines:[{art:ke(tf),text:"Tap the <b>map</b> to go anywhere!"},{art:ke(O9),text:"Tap a friend's face to <b>find her</b>."},{art:ke(vd(0,Cd(0))),text:"The petting zoo is inside the <b>barn</b> now!"}]},{v:3,title:"Rainbow Ranch is open!",lines:[{art:ke(C9),text:"Visit <b>Rainbow Ranch</b>!"},{art:ke(vd(1,Cd(1))),text:"Pet and feed animals at the <b>petting zoo</b>."},{art:ke(Of(4,!1,Qf(4))),text:"Ride <b>horses</b> and the <b>rainbow pony</b>!"},{art:ke(qi("basket",I9)),text:"Collect <b>eggs</b> from the hens."},{art:ke(`<svg viewBox="0 0 70 90">${Qm(Vm({seed:"carrot",wet:1},3,0),0,0,1)}</svg>`),text:"Grow carrots and flowers in the <b>garden</b>."}]},{v:2,title:"What's new!",lines:[{art:ke(R9),text:"A new <b>park</b>! Swing, slide and splash with friends."},{art:ke(Ko(3,"sit",Yo(3,"sit"))),text:"Adopt a <b>cat</b>! She lives in your house."},{art:ke(fa(3,"stand",ca(3,"stand"))),text:"Adopt a <b>dog</b>! Take it to the park to play fetch."}]}],Zm=Fm[0].v,Gm={v:Zm,title:"Welcome to your cozy house!",lines:[{art:ke(Um),text:"Drag furniture into your rooms."},{art:ke(qf),text:"Dress up your friends."},{art:ke(Ko(0,"sit",Yo(0,"sit"))),text:"Adopt a pet from the Menu ☰!"}]},Ym=wt("cozy-whatsnew"),j9=1;function F9(){try{const e=Number(localStorage.getItem(Ym)),t=["cozy-house","cozy-house-v1","cozy-hood"].some(o=>localStorage.getItem(wt(o))!==null);if(!e&&!t)return{kind:"welcome",entries:[Gm]};const n=e||j9,s=Fm.filter(o=>o.v>n).slice(0,3);return s.length?{kind:"news",entries:s}:{kind:"none",entries:[]}}catch{return{kind:"none",entries:[]}}}function Z9(){try{localStorage.setItem(Ym,String(Zm))}catch{}}function G9(e,t){const n=e==="welcome"?Gm.title:t[0].title,s=t.flatMap(o=>o.lines).slice(0,5);return`<div class="wnBadge">${e==="welcome"?J0:t[0].v>=10?jm:t[0].v>=9?qm:t[0].v>=8?qf:t[0].v>=7?Nm:t[0].v>=6?A9:t[0].v>=5?zm:t[0].v>=4?tf:t[0].v>=3?v9:E4}</div>
    <h2 class="wnTitle">${n}</h2>
    <div class="wnList ${s.length>3?"many":""}">${s.map((o,i)=>`<div class="wnLine" style="animation-delay:${.15+i*.18}s">${o.art}<p>${o.text}</p></div>`).join("")}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`}const Km="cozy-sky",Od={tint:"#fff6e4",body:"#ffe9f0",pageA:"#ffe0ec",pageB:"#e6ddff",spot:"#fff6fa",fieldA:"#c9f2c7",fieldB:"#8fd18a",win:"#a2d2ff",win2:"#b9e3ff",house:"#fff3b0",mapTint:"#ffffff"},dp={tint:"#e7b4cc",body:"#f6dce8",pageA:"#ffd0e6",pageB:"#e6d2f8",spot:"#fff0f6",fieldA:"#f6d0e2",fieldB:"#dcc8f0",win:"#f6c6de",win2:"#e4d0f8",house:"#ffe0ee",mapTint:"#f3c4dc"},fp={tint:"#ffb38a",body:"#ffe4dc",pageA:"#ffe0d6",pageB:"#f0d8ea",spot:"#fff6ee",fieldA:"#d4eec4",fieldB:"#a3cb8a",win:"#ffc48a",win2:"#ffd4b0",house:"#ffc56a",mapTint:"#ffb38a"},Do={tint:"#2a2350",body:"#14182c",pageA:"#1c1748",pageB:"#101832",spot:"#2c2458",fieldA:"#1a2458",fieldB:"#0c1028",win:"#1a245c",win2:"#12183a",house:"#ffe9a0",mapTint:"#102044"},rr=[{m:0,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...Do},{m:5*60,opacity:.7,map:.78,glow:.95,stars:.95,glass:1,phase:"night",...Do},{m:5*60+35,opacity:.42,map:.34,glow:.55,stars:.42,glass:.8,phase:"dawn",...dp},{m:6*60+25,opacity:.14,map:.16,glow:.28,stars:.08,glass:.9,phase:"dawn",...dp},{m:7*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...Od},{m:16*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...Od},{m:17*60+5,opacity:.08,map:.1,glow:.4,stars:.02,glass:.55,phase:"golden",...fp},{m:18*60+10,opacity:.18,map:.2,glow:.62,stars:.06,glass:.82,phase:"golden",...fp},{m:19*60+5,opacity:.52,map:.68,glow:.9,stars:.55,glass:1,phase:"night",...Do},{m:20*60+10,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...Do},{m:24*60,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...Do}],Y9={phase:"day",opacity:0,map:0,glow:0,stars:0,glass:0,...Od},K9={phase:"night",opacity:.7,map:.78,glow:1,stars:1,glass:1,...Do};function hp(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function Xt(e,t,n){const s=hp(e),o=hp(t),i=a=>Math.round(s[a]+(o[a]-s[a])*n).toString(16).padStart(2,"0");return"#"+i(0)+i(1)+i(2)}const Ei=(e,t,n)=>e+(t-e)*n;function X9(e){const t=e.getHours()*60+e.getMinutes()+e.getSeconds()/60;let n=0;for(;n<rr.length-2&&t>=rr[n+1].m;)n++;const s=rr[n],o=rr[n+1],i=Math.max(1,o.m-s.m),a=Math.max(0,Math.min(1,(t-s.m)/i));return{phase:a<.5?s.phase:o.phase,opacity:Ei(s.opacity,o.opacity,a),map:Ei(s.map,o.map,a),glow:Ei(s.glow,o.glow,a),stars:Ei(s.stars,o.stars,a),glass:Ei(s.glass,o.glass,a),tint:Xt(s.tint,o.tint,a),body:Xt(s.body,o.body,a),pageA:Xt(s.pageA,o.pageA,a),pageB:Xt(s.pageB,o.pageB,a),spot:Xt(s.spot,o.spot,a),fieldA:Xt(s.fieldA,o.fieldA,a),fieldB:Xt(s.fieldB,o.fieldB,a),win:Xt(s.win,o.win,a),win2:Xt(s.win2,o.win2,a),house:Xt(s.house,o.house,a),mapTint:Xt(s.mapTint,o.mapTint,a)}}function up(e,t){return t==="day"?Y9:t==="night"?K9:X9(e)}function J9(e){return e==="day"||e==="night"||e==="auto"}function eE(e,t=!1){return t?!0:e==="lamp"||e==="window"||e==="stars"||e==="tv"||/lamp|light|lantern|candle|string-lights|night-light/i.test(e)}function pp(){try{if(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches)return!0}catch{}if(typeof navigator>"u")return!1;const e=navigator.hardwareConcurrency;if(typeof e=="number"&&e>0&&e<=2)return!0;const t=navigator.deviceMemory;return typeof t=="number"&&t>0&&t<=2}const gp={day:"night",night:"auto",auto:"day"},mp={day:"Day",night:"Night",auto:"Auto"},Xm='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><g fill="none" stroke="#ffb15c" stroke-width="3" stroke-linecap="round"><path d="M24 7 V13 M24 35 V41 M7 24 H13 M35 24 H41 M12 12 L16 16 M32 32 L36 36 M36 12 L32 16 M16 32 L12 36"/></g></svg>',tE='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 8 a14 14 0 1 0 0 32 a11 11 0 1 1 0 -32z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="3"/><circle cx="14" cy="16" r="1.7" fill="#ffd166"/><circle cx="18" cy="28" r="1.2" fill="#fff"/><circle cx="11" cy="24" r="1" fill="#fff"/></svg>',nE='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="28" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M34 8 a9 9 0 1 0 0 18 a7 7 0 1 1 0 -18z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="14" cy="16" r="1.3" fill="#ffd166"/></svg>',sE={day:Xm,night:tE,auto:nE},oE="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)";function iE(){if(document.getElementById("skyInk"))return;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.id="skyInk",e.setAttribute("aria-hidden","true"),e.setAttribute("width","0"),e.setAttribute("height","0"),e.style.cssText="position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none",e.innerHTML=`
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
  `,document.head.appendChild(t)}function aE(e){iE();const t=pp();let n=lE(),s=null,o=up(new Date,n),i=0;e.innerHTML=`<button type="button" class="skyBtn" aria-label="Day. Tap for night.">${Xm}</button>`;const a=e.querySelector("button"),r=p=>{o=p;const y=document.documentElement,m=Math.max(0,Math.min(1,p.glow));y.style.setProperty("--sky-opacity",p.opacity.toFixed(3)),y.style.setProperty("--sky-map-opacity",p.map.toFixed(3)),y.style.setProperty("--sky-glow",m.toFixed(3)),y.style.setProperty("--sky-stars",p.stars.toFixed(3)),y.style.setProperty("--sky-glass",p.glass.toFixed(3)),y.style.setProperty("--sky-tint",p.tint),y.style.setProperty("--sky-body",p.body),y.style.setProperty("--sky-page-a",p.pageA),y.style.setProperty("--sky-page-b",p.pageB),y.style.setProperty("--sky-spot",p.spot),y.style.setProperty("--sky-field-a",p.fieldA),y.style.setProperty("--sky-field-b",p.fieldB),y.style.setProperty("--sky-win",p.win),y.style.setProperty("--sky-win-2",p.win2),y.style.setProperty("--sky-house-win",p.house),y.style.setProperty("--sky-map-tint",p.mapTint),y.style.setProperty("--sky-glow-soft",`rgba(255, 186, 80, ${(m*.72).toFixed(3)})`),y.style.setProperty("--sky-glow-hot",`rgba(255, 220, 120, ${(m*.96).toFixed(3)})`),y.style.setProperty("--sky-glow-clear","rgba(255, 186, 80, 0)"),y.style.setProperty("--sky-glow-wash",`rgba(255, 170, 70, ${(m*.55).toFixed(3)})`),y.style.setProperty("--sky-glow-map",`rgba(255, 196, 110, ${(m*.7).toFixed(3)})`);const k=p.phase==="golden"?.24:p.phase==="dawn"?.22:0,b=p.phase==="golden"?"186, 110, 52":"140, 62, 18";y.style.setProperty("--sky-shadow",`rgba(${b}, ${k.toFixed(3)})`);const g=p.phase==="night"?.55:p.phase==="golden"?.08:p.phase==="dawn"?.16:0;y.style.setProperty("--sky-vig",`rgba(12, 10, 32, ${g.toFixed(3)})`);const w=p.phase==="golden"?"255, 196, 80":p.phase==="dawn"?"255, 214, 230":"255, 246, 214";y.style.setProperty("--sky-orb",`rgba(${w}, ${Math.min(1,p.glass).toFixed(3)})`),y.dataset.sky=p.phase,y.dataset.skyChoice=n,y.classList.toggle("sky-static",t),y.classList.toggle("sky-live",!t),a.innerHTML=sE[n],a.setAttribute("aria-label",`${mp[n]}. Tap for ${mp[gp[n]].toLowerCase()}.`)},l=()=>up(s??new Date,n),c=()=>r(l()),d=()=>{i&&clearInterval(i),i=window.setInterval(()=>{!s&&!document.hidden&&c()},t?6e4:1e3)},f=p=>{n=p;try{localStorage.setItem(wt(Km),n)}catch{}c()};a.addEventListener("click",()=>f(gp[n])),document.documentElement.classList.toggle("sky-static",t),c(),d(),X0(()=>{s||c()});const u=document.getElementById("mapWorld");u&&rE(u);try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change",()=>{const y=pp();document.documentElement.classList.toggle("sky-static",y),document.documentElement.classList.toggle("sky-live",!y)})}catch{}try{matchMedia(oE).addEventListener?.("change",()=>_r())}catch{}return window.addEventListener("resize",()=>_r()),new MutationObserver(()=>_r()).observe(document.body,{attributes:!0,attributeFilter:["class"]}),{choice:()=>n,look:()=>o,setChoice(p){f(p)},freeze(p){s=p,c()}}}function _r(){const e=document.getElementById("skyMount"),t=document.getElementById("menuDaySlot");e&&t&&e.parentElement!==t&&t.appendChild(e),t&&(t.hidden=!1),e&&(e.style.left="",e.style.top="")}function rE(e){const t=document.createElement("div");t.className="skyTint",t.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="skyLamps",n.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="skyBits",s.setAttribute("aria-hidden","true"),s.innerHTML='<i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i>';const o=()=>{e.contains(t)||e.appendChild(t),e.contains(n)||e.appendChild(n),e.contains(s)||e.appendChild(s)};o(),new MutationObserver(o).observe(e,{childList:!0})}function lE(){try{const e=localStorage.getItem(wt(Km));if(J9(e))return e}catch{}return"auto"}const Jm=255,cE=12;class dE{constructor(t){this.w=ps,this.h=gs,this.undo=[],this.px=S0(t??null)}checkpoint(){this.undo.push(this.px.slice()),this.undo.length>cE&&this.undo.shift()}canUndo(){return this.undo.length>0}undoStep(){const t=this.undo.pop();return t?(this.px=t,!0):!1}apply(t){switch(t.k){case"line":this.line(t.x0,t.y0,t.x1,t.y1,t.r,t.c);break;case"fill":this.fill(t.x,t.y,t.c);break;case"stamp":this.stamp(t.mask,t.x,t.y);break;case"clear":this.px.fill(0);break}}dot(t,n,s,o){const i=Math.max(.5,s),a=i*i,r=Math.max(0,Math.floor(t-i)),l=Math.min(this.w-1,Math.ceil(t+i)),c=Math.max(0,Math.floor(n-i)),d=Math.min(this.h-1,Math.ceil(n+i));for(let f=c;f<=d;f++)for(let u=r;u<=l;u++){const p=u+.5-t,y=f+.5-n;p*p+y*y<=a&&(this.px[f*this.w+u]=o)}}line(t,n,s,o,i,a){const r=Math.hypot(s-t,o-n),l=Math.max(.5,i/2),c=Math.max(1,Math.ceil(r/l));for(let d=0;d<=c;d++)this.dot(t+(s-t)*d/c,n+(o-n)*d/c,i,a)}fill(t,n,s){const o=Math.floor(t),i=Math.floor(n);if(o<0||i<0||o>=this.w||i>=this.h)return;const{w:a,h:r,px:l}=this,c=l[i*a+o];if(c===s)return;const d=[o,i];for(;d.length;){const f=d.pop(),u=d.pop();let p=u;for(;p>0&&l[f*a+p-1]===c;)p--;let y=u;for(;y<a-1&&l[f*a+y+1]===c;)y++;for(let m=p;m<=y;m++)l[f*a+m]=s,f>0&&l[(f-1)*a+m]===c&&(m===p||l[(f-1)*a+m-1]!==c)&&d.push(m,f-1),f<r-1&&l[(f+1)*a+m]===c&&(m===p||l[(f+1)*a+m-1]!==c)&&d.push(m,f+1)}}stamp(t,n,s){const o=Math.round(n-t.w/2),i=Math.round(s-t.h/2);for(let a=0;a<t.h;a++)for(let r=0;r<t.w;r++){const l=t.px[a*t.w+r];if(l===Jm)continue;const c=o+r,d=i+a;c>=0&&d>=0&&c<this.w&&d<this.h&&(this.px[d*this.w+c]=l)}}save(){let t=pc(this.px),n=this.px;for(let s=0;t.length>id&&s<6;s++)n=fE(n,this.w,this.h,1<<s),t=pc(n);return t.length>id&&(t=pc(hE(n,this.w,this.h,8))),t}}function fE(e,t,n,s){const o=e.slice();for(let i=0;i<n;i++){let a=0;for(;a<t;){const r=o[i*t+a];let l=1;for(;a+l<t&&o[i*t+a+l]===r;)l++;l<=s&&a>0&&o.fill(o[i*t+a-1],i*t+a,i*t+a+l),a+=l}}return o}function hE(e,t,n,s){const o=new Uint8Array(e.length);for(let i=0;i<n;i++)for(let a=0;a<t;a++)o[i*t+a]=e[Math.floor(i/s)*s*t+Math.floor(a/s)*s];return o}function uE(e,t,n,s){let o=0,i=1/0;return s.forEach((a,r)=>{const l=parseInt(a.slice(1,3),16),c=parseInt(a.slice(3,5),16),d=parseInt(a.slice(5,7),16),f=(l-e)**2*2+(c-t)**2*4+(d-n)**2*3;f<i&&(i=f,o=r)}),o}const lr="#5a3d5c",bo=new Map,Bd=new Map,Dd=wt("cozy-art");function pE(){try{const e=JSON.parse(localStorage.getItem(Dd)??"{}");if(e&&typeof e=="object")for(const[t,n]of Object.entries(e))E0(t)&&vf(n)&&bo.set(t,n)}catch{}}function gE(e,t,n){bo.set(e,t);let s={};try{s=JSON.parse(localStorage.getItem(Dd)??"{}")||{}}catch{s={}}s[e]=t;const o=Object.keys(s);if(o.length>Ui)for(const i of o)i!==e&&!n.has(i)&&Object.keys(s).length>Ui&&delete s[i];try{localStorage.setItem(Dd,JSON.stringify(s))}catch{}}function mE(e){return bo.has(e)}function e1(e,t){!E0(e)||!vf(t)||bo.get(e)!==t&&(bo.set(e,t),Bd.delete(e))}function yE(e){return bo.get(e)??null}const bE=kf.map(e=>[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)]);function t1(e,t){const n=t.data;for(let s=0;s<e.length;s++){const o=bE[e[s]&15];n[s*4]=o[0],n[s*4+1]=o[1],n[s*4+2]=o[2],n[s*4+3]=255}}function n1(e){const t=Bd.get(e);if(t)return t;const n=bo.get(e);if(!n)return null;const s=document.createElement("canvas");s.width=ps,s.height=gs;const o=s.getContext("2d");if(!o)return null;const i=o.createImageData(ps,gs);t1(S0(n),i),o.putImageData(i,0,0);const a=s.toDataURL("image/png");return Bd.set(e,a),a}function Xr(e,t,n=!0){const s=L0[e]??"wood",o=`stroke="${lr}" stroke-width="3" stroke-linejoin="round"`;let i="";s==="wood"?i=`<rect x="6" y="18" width="88" height="70" rx="6" fill="#c9905a" ${o}/><path d="M10 24 H90 M10 82 H90" stroke="#a86f3e" stroke-width="1.6" opacity=".7"/>`:s==="plum"?i=`<rect x="6" y="18" width="88" height="70" rx="8" fill="#9a6fc0" ${o}/><rect x="9" y="21" width="82" height="64" rx="6" fill="none" stroke="#d7c0ef" stroke-width="1.6"/>`:s==="gold"?i=`<rect x="6" y="18" width="88" height="70" rx="5" fill="#f2c14e" ${o}/>${[14,32,50,68,86].map(l=>`<circle cx="${l}" cy="21.5" r="1.6" fill="#fff3b0"/><circle cx="${l}" cy="84.5" r="1.6" fill="#fff3b0"/>`).join("")}`:i=`<rect x="6" y="18" width="88" height="70" rx="7" fill="#ff6b6b" ${o}/>${["#ffa94d","#ffd43b","#69db7c","#4dabf7","#b388d6"].map((l,c)=>`<rect x="${7.5+c*1.1}" y="${19.5+c*1.1}" width="${85-c*2.2}" height="${67-c*2.2}" rx="6" fill="none" stroke="${l}" stroke-width="1.3"/>`).join("")}`;const a=t?`<image href="${t}" x="13" y="25" width="74" height="55.5" preserveAspectRatio="none"/>`:'<rect x="13" y="25" width="74" height="55.5" fill="#fff6ea"/><circle cx="40" cy="50" r="5" fill="#ffc8dd"/><circle cx="55" cy="56" r="4" fill="#bde0fe"/><circle cx="62" cy="44" r="3.5" fill="#fff3b0"/>',r=n?`<path d="M38 18 L50 7 L62 18" fill="none" stroke="${lr}" stroke-width="2"/><circle cx="50" cy="7" r="2.4" fill="${lr}"/>`:"";return`<svg viewBox="${n?"0 0 100 100":"4 16 92 74"}" xmlns="http://www.w3.org/2000/svg">${r}${i}${a}<rect x="13" y="25" width="74" height="55.5" fill="none" stroke="${lr}" stroke-width="1.6"/></svg>`}const Cc=[2,4,8,14],yp=[24,34,46,60],bp={brush:'<svg viewBox="0 0 40 40"><path d="M26 6 L34 14 L18 30 L10 22 Z" fill="#ffd43b" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 22 L18 30 Q12 36 5 35 Q4 28 10 22 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/></svg>',fill:'<svg viewBox="0 0 40 40"><path d="M7 15 L21 9 L27 23 L13 29 Z" fill="#fff" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/><path d="M7 15 Q14 19 21 9" fill="#4dabf7" stroke="#5a3d5c" stroke-width="2"/><path d="M8 16 Q3 24 6 34 Q12 34 11 27 Q10 22 8 16 Z" fill="#4dabf7" stroke="#5a3d5c" stroke-width="2" stroke-linejoin="round"/><path d="M27 23 Q31 14 21 9" fill="none" stroke="#5a3d5c" stroke-width="2"/></svg>',eraser:'<svg viewBox="0 0 40 40"><g transform="rotate(-35 20 20)"><rect x="6" y="13" width="28" height="14" rx="3" fill="#ffc8dd" stroke="#5a3d5c" stroke-width="2.5"/><rect x="6" y="13" width="10" height="14" rx="3" fill="#fff" stroke="#5a3d5c" stroke-width="2.5"/></g><path d="M7 35 h4 M15 36 h3 M22 35 h2" stroke="#5a3d5c" stroke-width="2.5" stroke-linecap="round"/></svg>',stamp:'<svg viewBox="0 0 40 40"><path d="M20 33 C13 27 5 22 8 14 C11 7 20 10 20 16 C20 10 29 7 32 14 C35 22 27 27 20 33 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="2.5"/></svg>'},wE='<svg viewBox="0 0 40 40"><path d="M14 10 L6 18 L14 26" fill="none" stroke="#5a3d5c" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 18 H24 Q34 18 34 26 Q34 33 24 33 H18" fill="none" stroke="#5a3d5c" stroke-width="3.5" stroke-linecap="round"/></svg>',wp={brush:"Brush",fill:"Fill",eraser:"Eraser",stamp:"Stamps"},kE=["White","Plum","Red","Pink","Orange","Yellow","Green","Dark green","Blue","Dark blue","Lilac","Purple","Tan","Brown","Gray","Black"],vE={wood:"Wood",plum:"Plum",gold:"Gold",rainbow:"Rainbow"},_E='<svg viewBox="0 0 40 40"><rect x="7" y="7" width="26" height="26" rx="5" fill="#fff" stroke="#5a3d5c" stroke-width="2.5"/><path d="M12 28 L28 12" stroke="#ff8fab" stroke-width="3" stroke-linecap="round"/><circle cx="31" cy="9" r="3" fill="#ffd43b"/></svg>',kp=new Map;async function vp(e,t){const n=e.name+":"+t,s=kp.get(n);if(s)return s;const o=e.svg.includes("xmlns")?e.svg:e.svg.replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" '),i=new Image;i.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(o);try{await i.decode()}catch{return null}const a=document.createElement("canvas");a.width=t,a.height=t;const r=a.getContext("2d",{willReadFrequently:!0});if(!r)return null;r.drawImage(i,0,0,t,t);const l=r.getImageData(0,0,t,t).data,c=new Uint8Array(t*t);for(let f=0;f<c.length;f++)c[f]=l[f*4+3]<140?Jm:uE(l[f*4],l[f*4+1],l[f*4+2],kf);const d={w:t,h:t,px:c};return kp.set(n,d),d}let Si=null;function $E(e){if(Si)return;const t=new dE;let n="brush",s=2,o=1,i=0,a=0;const r=document.createElement("div");r.className="studio",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Art Studio"),r.innerHTML=`<div class="stuCard">
    <div class="stuHead"><h2>Art Studio</h2><button type="button" class="stuX" aria-label="Close">✕</button></div>
    <div class="stuBody">
      <div class="stuPaper"><canvas width="${ps}" height="${gs}" aria-label="Drawing paper"></canvas></div>
      <div class="stuSide">
        <div class="stuTools">${Object.keys(bp).map($=>`<button type="button" class="stuTool" data-tool="${$}" aria-label="${wp[$]}" aria-pressed="false">${bp[$]}<span>${wp[$]}</span></button>`).join("")}
          <button type="button" class="stuTool stuUndo" aria-label="Undo">${wE}<span>Undo</span></button><button type="button" class="stuTool stuClear" aria-label="Clear">${_E}<span>Clear</span></button></div>
        <div class="stuGroup stuSizeGroup"><b>Size</b><div class="stuRow stuSizes">${Cc.map(($,x)=>`<button type="button" class="stuSize" data-size="${x}" aria-label="Size ${x+1}" aria-pressed="false"><i style="width:${8+$*2}px;height:${8+$*2}px"></i></button>`).join("")}</div></div>
        <div class="stuGroup stuColorGroup"><b>Colors</b><div class="stuColors">${kf.map(($,x)=>`<button type="button" class="stuColor" data-color="${x}" aria-label="${kE[x]??"Color "+(x+1)}" aria-pressed="false" style="background:${$}"></button>`).join("")}</div></div>
        <div class="stuGroup stuStampGroup"><b>Stamps</b><div class="stuStamps">${e.stamps.map(($,x)=>`<button type="button" class="stuStamp" data-stamp="${x}" aria-label="${$.name}" aria-pressed="false">${$.svg}</button>`).join("")}</div></div>
        <div class="stuGroup stuFrameGroup"><b>Frame</b><div class="stuRow stuFrames">${L0.map(($,x)=>`<button type="button" class="stuFrame" data-frame="${x}" aria-label="${vE[$]??$} frame" aria-pressed="false">${Xr(x,null,!1)}</button>`).join("")}</div></div>
        <button type="button" class="stuHang">Hang it up!</button>
      </div>
    </div></div>
    <div class="stuAsk hidden" role="alertdialog" aria-label="Start over?"><div class="stuAskCard"><p>Start a new picture?</p><div class="stuAskRow"><button type="button" class="stuAskNo" aria-label="Keep my picture">Keep it</button><button type="button" class="stuAskYes" aria-label="Yes, clear it">Clear it</button></div></div></div>`,document.body.appendChild(r),Si=r;const l=r.querySelector("canvas"),c=l.getContext("2d"),d=c.createImageData(ps,gs),f=()=>{t1(t.px,d),c.putImageData(d,0,0)},u=()=>{r.querySelectorAll(".stuTool[data-tool]").forEach($=>$.classList.toggle("on",$.dataset.tool===n)),r.querySelectorAll(".stuSize").forEach($=>$.classList.toggle("on",Number($.dataset.size)===o)),r.querySelectorAll(".stuColor").forEach($=>$.classList.toggle("on",Number($.dataset.color)===s)),r.querySelectorAll(".stuStamp").forEach($=>$.classList.toggle("on",Number($.dataset.stamp)===i)),r.querySelectorAll(".stuFrame").forEach($=>$.classList.toggle("on",Number($.dataset.frame)===a)),r.querySelectorAll("[aria-pressed]").forEach($=>$.setAttribute("aria-pressed",String($.classList.contains("on")))),r.classList.toggle("stamping",n==="stamp"),t.canUndo()!==p&&m(),r.querySelector(".stuUndo").disabled=!t.canUndo()};let p=!1,y=0;function m(){p=t.canUndo(),clearTimeout(y),y=window.setTimeout(()=>{if(!Si)return;const $=t.canUndo()?l.toDataURL():null;r.querySelectorAll(".stuFrame").forEach(x=>{x.innerHTML=Xr(Number(x.dataset.frame),$,!1)})},60)}const k=r.querySelector(".stuAsk");f(),u();const b=()=>{r.remove(),Si=null,e.onClose?.()};r.addEventListener("click",$=>{const x=$.target.closest("button");if(x){if(e.sfx?.click(),x.classList.contains("stuX")){b();return}if(x.classList.contains("stuAskNo")){k.classList.add("hidden");return}if(x.classList.contains("stuAskYes")){k.classList.add("hidden"),t.checkpoint(),t.apply({k:"clear"}),f(),u(),m();return}if(x.dataset.tool)n=x.dataset.tool;else if(x.dataset.size)o=Number(x.dataset.size);else if(x.dataset.color)s=Number(x.dataset.color),(n==="eraser"||n==="stamp")&&(n="brush");else if(x.dataset.stamp)i=Number(x.dataset.stamp),n="stamp";else if(x.dataset.frame)a=Number(x.dataset.frame);else if(x.classList.contains("stuUndo"))t.undoStep()&&(f(),m());else if(x.classList.contains("stuClear"))k.classList.remove("hidden"),k.querySelector(".stuAskNo").focus();else if(x.classList.contains("stuHang")){const H=t.save();b(),e.onSave(H,a);return}u()}});let g=-1,w=null;const _=$=>{const x=l.getBoundingClientRect();return{x:($.clientX-x.left)*ps/x.width,y:($.clientY-x.top)*gs/x.height}};l.addEventListener("pointerdown",$=>{if($.preventDefault(),g!==-1)return;const x=_($);if(n==="fill"){t.checkpoint(),t.apply({k:"fill",x:x.x,y:x.y,c:s}),f(),u(),m(),e.sfx?.pop?.();return}if(n==="stamp"){const H=e.stamps[i];if(!H)return;vp(H,yp[o]).then(V=>{!V||!Si||(t.checkpoint(),t.apply({k:"stamp",mask:V,x:x.x,y:x.y}),f(),u(),m(),e.sfx?.pop?.())});return}g=$.pointerId;try{l.setPointerCapture($.pointerId)}catch{}t.checkpoint(),w=x,t.apply({k:"line",x0:x.x,y0:x.y,x1:x.x,y1:x.y,r:Cc[o],c:n==="eraser"?0:s}),f()}),l.addEventListener("pointermove",$=>{if($.pointerId!==g||!w)return;const x=typeof $.getCoalescedEvents=="function"?$.getCoalescedEvents():[];for(const H of x.length?x:[$]){const V=_(H);t.apply({k:"line",x0:w.x,y0:w.y,x1:V.x,y1:V.y,r:Cc[o],c:n==="eraser"?0:s}),w=V}f()});const P=$=>{$.pointerId===g&&(g=-1,w=null,u(),m())};l.addEventListener("pointerup",P),l.addEventListener("pointercancel",P),e.stamps.slice(0,3).forEach($=>void vp($,yp[1]))}function xE(e){const t=document.createElement("div");t.className="paintZoom",t.setAttribute("role","dialog"),t.setAttribute("aria-label","Painting"),t.innerHTML=`<div class="pzInner">${e}</div>`,t.addEventListener("pointerup",()=>t.remove()),document.body.appendChild(t)}const Ho=[{name:"Pink",fill:"#ff7eb3",ink:"#9d174d"},{name:"Lilac",fill:"#c9b3ff",ink:"#5f3dc4"},{name:"Aqua",fill:"#66d9e8",ink:"#0b7285"},{name:"Gold",fill:"#ffd43b",ink:"#e67700"}],$t="#5a3d5c",Ic=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),_p=e=>typeof e=="number"?e:{skip:10,rev:11,d2:12,wild:13,w4:14}[e]??0,$p=e=>typeof e.v=="number"?String(e.v):e.v==="skip"?"✕":e.v==="rev"?"↻":e.v==="d2"?"+2":e.v==="w4"?"+4":"♛",ME=e=>e.v==="skip"?"Nope":e.v==="rev"?"Flip":e.v==="d2"?"+2":e.v==="wild"||e.v==="w4"?"Crown":"",Ks=(e,t,n=1,s="#ffd43b")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -6 L1.4 -1.4 L6 -1 L1.6 1.4 L3 6 L0 3 L-3 6 L-1.6 1.4 L-6 -1 L-1.4 -1.4 Z" fill="${s}" stroke="${$t}" stroke-width="1" stroke-linejoin="round"/>`,$r=(e,t,n=1)=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 1.2 C-2.2 -1.6 -5.2 -0.6 -3.6 2.2 C-2.4 4 0 5.2 0 5.2 C0 5.2 2.4 4 3.6 2.2 C5.2 -0.6 2.2 -1.6 0 1.2 Z" fill="#ff4d94" stroke="${$t}" stroke-width="1"/>`;function LE(e){return e.v==="wild"||e.v==="w4"?`<g transform="translate(14 28)">
      <path d="M4 26 L10 8 L18 16 L24 2 L30 16 L38 8 L44 26 Z" fill="#ffd43b" stroke="${$t}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="4" y="26" width="40" height="8" rx="2" fill="#ffd43b" stroke="${$t}" stroke-width="2.2"/>
      <circle cx="10" cy="8" r="2.4" fill="#ff7eb3"/><circle cx="24" cy="3" r="2.4" fill="#66d9e8"/><circle cx="38" cy="8" r="2.4" fill="#d0bfff"/>
      ${Ks(-2,0,.7)}${Ks(46,4,.65,"#fff")}${Ks(22,-4,.55,"#ff7eb3")}
    </g>${e.v==="w4"?`<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${$t}" font-family="Nunito, ui-rounded, system-ui, sans-serif">+4</text>`:""}`:e.v==="d2"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff" stroke="${$t}" stroke-width="2.4"/>
      ${$r(14,8,1.35)}${$r(32,8,1.35)}
      <path d="M12 26 Q23 34 34 26" fill="none" stroke="${$t}" stroke-width="2.4" stroke-linecap="round"/>
      ${$r(40,22,.8)}
    </g>`:e.v==="rev"?`<g fill="none" stroke="${$t}" stroke-width="3.2" stroke-linecap="round">
      <path d="M16 40 C42 22 54 52 34 60 C16 68 12 46 30 40"/>
      <path d="M14 38 L22 30 L24 42" stroke-linejoin="round"/>
    </g>${Ks(48,28,.85)}${Ks(20,62,.6,"#ff7eb3")}${Ks(50,58,.55,"#66d9e8")}`:e.v==="skip"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff6d8" stroke="${$t}" stroke-width="2.4"/>
      <rect x="8" y="12" width="14" height="9" rx="3" fill="#2b1430"/><rect x="24" y="12" width="14" height="9" rx="3" fill="#2b1430"/>
      <path d="M22 16.5 H24 M5 14 H2 M41 14 H44" stroke="${$t}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 27 Q23 32 34 27" fill="none" stroke="${$t}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`:""}function Hd(e){const t=e.c===4,n=t?{fill:"#fff8ee",ink:$t}:Ho[e.c]??Ho[0],s=typeof e.v=="number",o=ME(e),i=t?'<rect x="2" y="2" width="66" height="96" rx="13" fill="#fff8ee" stroke="#ff7eb3" stroke-width="4"/><rect x="5" y="5" width="60" height="90" rx="11" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="7.5" y="7.5" width="55" height="85" rx="9" fill="none" stroke="#66d9e8" stroke-width="1.6"/><rect x="9.5" y="9.5" width="51" height="81" rx="8" fill="none" stroke="#ffd43b" stroke-width="1.6"/>':`<rect x="2" y="2" width="66" height="96" rx="13" fill="${n.fill}" stroke="${$t}" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`,a='<ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/>',r=`fill="${n.ink}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif"`,l=`<text x="8" y="16" font-size="13" font-weight="900" ${r}>${$p(e)}</text>`+(s?`<text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" ${r}>${$p(e)}</text>`:""),c=s?`<text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="${n.ink}" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${e.v}</text>`:`${LE(e)}${o?`<text x="35" y="92" text-anchor="middle" font-size="12" font-weight="900" ${r}>${o}</text>`:""}`;return`<svg viewBox="0 0 70 100">${i}${a}${l}${c}</svg>`}const EE=[[18,28],[40,28],[29,46],[18,64],[40,64],[29,78]].map(([e,t])=>$r(e,t,.9)).join(""),SE=`<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff4d94" stroke="${$t}" stroke-width="3"/>
  <rect x="7" y="7" width="56" height="86" rx="10" fill="none" stroke="#ffd43b" stroke-width="3"/>
  <rect x="11" y="11" width="48" height="78" rx="8" fill="#ff7eb3"/>
  ${EE}
  <circle cx="35" cy="50" r="14" fill="#fff6fb" stroke="${$t}" stroke-width="2.4"/>
  ${Ks(35,50,1.15,"#ffd43b")}
</svg>`,s1=(e,t)=>{if(t.turn<0||t.drawn!=null&&e.id!==t.drawn)return!1;const n=t.top;return e.c===4||e.c===t.color||e.v===n.v&&n.c!==4};let Wd=null,Ot=null,Io=-1,xp=-1;function Mp(e,t){Wd=e;const n=t.table,s=n.view;if(!s||!s.top){e.innerHTML="";return}n.tb!==xp&&(Ot=null,Io=-1,xp=n.tb);const o=n.you,i=o!==null&&Array.isArray(s.hand)?s.hand.slice():[];Ot!==null&&!i.some(g=>g.id===Ot)&&(Ot=null);const a=s.ev;let r=null;if(a&&a.n!==Io&&Io>=0&&a.k==="play"&&a.card){const g=e.querySelector(`[data-card="${a.card.id}"]`)||e.querySelector(`[data-p="${a.p}"]`);g&&(r=g.getBoundingClientRect())}const c=n.phase==="play"&&s.turn>=0,d=c&&o!==null&&s.turn===o,f=o!==null&&i.length<=2&&i.length>0&&!s.slay?.[o]&&d,u=d&&s.drawn==null&&n.phase==="play",p=d&&s.drawn!=null&&n.phase==="play",y=i.sort((g,w)=>g.c-w.c||_p(g.v)-_p(w.v)),m=c?n.players[s.turn]:"",k=c?d?"Your turn!":`${Ic(t.name(m))}'s turn`:"",b=Ho[s.color]??Ho[0];if(e.innerHTML=`<div class="slayFelt">
    ${k?`<div class="whose ${d?"yours":""}" id="whoseTurn">${k}<span class="slayDir" aria-hidden="true">${s.dir===1?"→":"←"}</span></div>`:""}
    <div class="slayOpps">${n.players.map((g,w)=>w===o?"":`<div class="slayOpp ${s.turn===w?"isTurn":""}" data-p="${w}" data-count="${s.counts?.[w]??0}"><span class="chipFace">${t.face(g)}</span><b>${Ic(t.name(g))}</b><span class="cnt">${s.counts?.[w]??0}</span>${t.away(g)?'<i class="awayBadge">away</i>':""}${s.slay?.[w]?"<em>SLAY!</em>":""}</div>`).join("")}</div>
    <div class="slayPile">
      <button type="button" id="slayDeck" class="slayDeck" ${u?"":"disabled"} aria-label="Draw a card">${SE}<span>${s.deck??0}</span></button>
      <div id="slayDiscard" class="slayDiscard" data-top="${s.top.id}">${Hd(s.top)}</div>
      <div class="nowColor" data-color="${s.color}" style="background:${b.fill}" aria-label="${b.name}"></div>
    </div>
    ${o===null?'<p class="watching">You are watching</p>':""}
    ${Ot!==null?`<div id="crownPick" class="crownPick"><p>Pick a color for your Crown!</p><div class="crownRow">${Ho.map((g,w)=>`<button type="button" data-color="${w}" aria-label="${g.name}" style="background:${g.fill}"><span>${g.name}</span></button>`).join("")}</div></div>`:""}
    <div id="slayHand" class="slayHand ${d?"isTurn":""}">${y.map(g=>{const w=d&&n.phase==="play"&&s1(g,s),_=w?"can":d?"dim":"wait",P=typeof g.v=="number"?Ho[g.c].name+" "+g.v:g.v==="wild"?"Crown":g.v==="w4"?"Crown plus 4":g.v==="d2"?"plus 2":g.v==="rev"?"Flip":"Nope";return`<button type="button" class="slayCard ${_} ${g.id===s.drawn?"justDrew":""} ${g.id===Ot?"picked":""}" data-card="${g.id}" data-c="${g.c}" data-v="${g.v}" aria-label="${Ic(P)}" ${w?"":"disabled"}>${Hd(g)}</button>`}).join("")}</div>
    ${c&&o!==null?`<button type="button" id="slayCall" class="slayCall ${f?"ready":""}" ${f?"":"disabled"}>SLAY!</button>`:""}
    <button type="button" id="slayPass" class="slayPass ${p?"":"hidden"}" ${p?"":"disabled"}>Pass</button>
  </div>`,a&&a.n!==Io){const g=Io;if(Io=a.n,g>=0){if(a.k==="play"&&a.card){const w=e.querySelector("#slayDiscard");w&&TE(r,a.card,w.getBoundingClientRect()),a.card.v==="skip"?t.toast("Nope!"):a.card.v==="rev"?t.toast("Flip!"):a.card.v==="d2"?t.toast("+2!"):a.card.v==="w4"&&t.toast("Crown +4!"),t.sfx.swish()}a.vdrew&&t.toast("Forgot to say SLAY! Draw 2"),a.k==="slay"&&t.sfx.sparkle()}}}function TE(e,t,n){const s=document.createElement("div");s.className="flyCard",s.innerHTML=Hd(t);const o=e?.width||70,i=e?.height||100;Object.assign(s.style,{left:(e?.left??innerWidth/2)+"px",top:(e?.top??80)+"px",width:o+"px",height:i+"px"}),document.body.appendChild(s),requestAnimationFrame(()=>{s.style.left=n.left+"px",s.style.top=n.top+"px",s.style.width=Math.max(n.width,70)+"px",s.style.height=Math.max(n.height,96)+"px"}),setTimeout(()=>s.remove(),560)}const PE={id:"slay",render:Mp,handle(e,t){const n=t.table.view,s=t.table.you;if(!n||t.table.phase!=="play"||s===null)return!1;const o=n.hand??[];if(e.closest("#slayCall"))return o.length<=2&&o.length>0&&!n.slay?.[s]&&(t.move({k:"slay"}),t.sfx.sparkle()),!0;if(e.closest("#slayDeck"))return n.turn===s&&n.drawn==null&&(Ot=null,t.move({k:"draw"}),t.sfx.click()),!0;if(e.closest("#slayPass"))return n.turn===s&&n.drawn!=null&&(Ot=null,t.move({k:"pass"}),t.sfx.click()),!0;const i=e.closest("#crownPick [data-color]");if(i&&Ot!==null)return t.move({k:"play",id:Ot,color:+i.dataset.color}),Ot=null,t.sfx.sparkle(),!0;const a=e.closest("#slayHand [data-card]");if(!a||a.hasAttribute("disabled"))return!!a;const r=+a.dataset.card,l=o.find(c=>c.id===r);return!l||n.turn!==s||!s1(l,n)||(l.c===4?(Ot=r,t.sfx.pop(),Wd&&Mp(Wd,t)):(Ot=null,t.move({k:"play",id:r}),t.sfx.click())),!0}},o1="#5a3d5c",Lp=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),AE=`<svg viewBox="0 0 48 48"><path d="M24 42 C8 30 2 22 7 13 C11 6 20 8 24 16 C28 8 37 6 41 13 C46 22 40 30 24 42 Z" fill="#ff4d94" stroke="${o1}" stroke-width="3" stroke-linejoin="round"/><path d="M16 16 Q20 12 22 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`,RE=`<svg viewBox="0 0 48 48"><path d="M24 3 L29 17 H44 L32 26 L37 42 L24 33 L11 42 L16 26 L4 17 H19 Z" fill="#66d9e8" stroke="${o1}" stroke-width="3" stroke-linejoin="round"/><path d="M24 12 L26 18 H22 Z" fill="#fff" opacity=".8"/></svg>`,CE={id:"four",render(e,t){const n=t.table,s=n.view;if(!s||!Array.isArray(s.b)){e.innerHTML="";return}const o=n.you,i=o!==null&&s.turn===o&&n.phase==="play",a=new Set((s.line??[]).map(([m,k])=>m+":"+k)),r=s.last;let l="";for(let m=0;m<7;m++){const k=s.b[m];let b="";for(let w=5;w>=0;w--){const _=w<k.length?k[w]:null,P=a.has(m+":"+w)?" hot":"",$=r&&r.col===m&&r.row===w?" just":"";b+=`<span class="fourCell${_===0?" heart":_===1?" star":""}${P}${$}">${_===0?AE:_===1?RE:""}</span>`}const g=i&&k.length<6;l+=`<button type="button" class="fourCol" data-col="${m}" ${g?"":"disabled"} aria-label="Drop in column ${m+1}">${b}<span class="dropHint">${g?"▼":""}</span></button>`}const c=n.phase==="play"&&s.turn>=0,d=c?n.players[s.turn]:"",f=c?i?"Your turn!":`${Lp(t.name(d))}'s turn`:"",u=o===0?"You are <b>pink hearts</b>":o===1?"You are <b>aqua stars</b>":"Pink hearts and aqua stars",p=m=>m===0?"♥":"★",y=n.players.map((m,k)=>`<div class="playerChip ${s.turn===k?"isTurn":""}"><span class="chipFace">${t.face(m)}</span><b>${Lp(t.name(m))} ${p(k)}</b>${t.away(m)?'<i class="awayBadge">away</i>':""}</div>`).join("");e.innerHTML=`<div class="fourPlay">
      ${f?`<div class="whose ${i?"yours":""}" id="whoseTurn">${f}</div>`:""}
      <div class="fourChips">${y}</div>
      <p class="fourLegend">${u}</p>
      <div class="fourBoard" id="fourBoard">${l}</div>
    </div>`},handle(e,t){const n=e.closest(".fourCol");if(!n)return!1;const s=t.table.view,o=t.table.you;if(n.hasAttribute("disabled")||!s||o===null||s.turn!==o||t.table.phase!=="play")return!0;const i=+n.dataset.col;return!Number.isInteger(i)||s.b[i].length>=6||(t.move({col:i}),t.sfx.click()),!0}},Ep={slay:PE,four:CE},cr=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),IE={notHere:"Come into the clubhouse first!",taken:"Someone is sitting there!",playing:"You are already in this game!",playingElsewhere:"Finish your other game first!",notHost:"Waiting for the host…",needMore:"Play with friends on your street",tooMany:"That table is full!",notPlaying:"The game has not started!",notPlayer:"Sit down to play!",illegal:"You can't play that!",notAway:"She is still here!",tooSoon:"Give her a moment!",notSeated:"You are not at this table!",noMove:"No move to play!"};function OE(e){const t=document.getElementById("tableOverlay");let n=null,s="",o=0;const i=b=>b.away==null?0:b.away+Math.max(0,Date.now()-(b.receivedAt??Date.now())),a=()=>{o&&(clearInterval(o),o=0)},r=b=>{const g=!!b&&b.phase==="play"&&b.away!=null&&n!==null;g&&!o&&(o=window.setInterval(()=>f(),1e3)),g||a()},l=()=>e.hood(),c=()=>{const b=l();return!b||n===null?null:b.tables.get(n)??null},d=b=>{const g=l();return{table:b,me:g.pid,name:w=>g.players.get(w)?.nickname??"friend",face:w=>{const _=g.players.get(w)?.look;return _?nf(Mt(_)):""},move:w=>g.tbl({op:"move",tb:b.tb,m:w}),away:w=>{if(w===g.pid)return!1;const _=g.players.get(w);if(_&&!_.online)return!0;const P=g.presence.get(w);return!P||P.where!=="gameroom"},toast:e.toast,sfx:e.sfx}};t.addEventListener("click",b=>{const g=b.target;if(g.closest("#tblBack")){p(),e.sfx.swish();return}if(g.closest("#tblLeave")){y();return}if(g.closest("#tblStart")){m();return}if(g.closest("#tblNudge")){k();return}const w=c();w&&Ep[w.game]?.handle(g,d(w))});function f(){const b=l(),g=c();if(!b||!g){t.classList.add("hidden"),t.innerHTML="",a();return}const w=P0[g.game],_=b.pid,P=g.seats.includes(_),$=g.seats.filter(Boolean).length,x=g.phase==="play"&&g.you!==null&&g.view&&g.view.turn===g.you,H=g.view?.winPid??null;let V="";if(g.phase==="over"){const I=H?b.players.get(H)?.nickname??"Friend":"";g.game==="slay"?V=H?H===_?"You slayed!":`${cr(I)} slayed!`:"It's a tie!":V=g.view?.draw||!H?"It's a tie!":H===_?"You got four!":`${cr(I)} got four!`;const B=g.tb+":"+g.seq;H===_&&s!==B&&(s=B,e.confetti(),e.sfx.sparkle())}const Q=i(g),q=g.phase==="play"&&P&&Q>=pw&&g.you!==null&&!!g.view&&g.view.turn!==g.you&&g.view.turn>=0,se=g.phase!=="play"&&g.host===_&&$>=w.minPlayers&&$<=w.maxPlayers,Me=P&&g.phase==="lobby"&&g.host!==_&&$>=w.minPlayers,Ke=P&&g.phase==="lobby"&&$<w.minPlayers;t.classList.remove("hidden"),t.dataset.tb=String(g.tb),t.dataset.phase=g.phase,t.dataset.game=g.game,t.dataset.you=g.you===null?"":String(g.you),t.innerHTML=`<div class="tblCard ${x?"yourTurn":""} game-${g.game}">
      <div class="tblTop"><h2>${cr(w.name)}</h2><div class="seatDots">${g.seats.map(I=>`<i class="${I?"on":""} ${I===_?"me":""}"></i>`).join("")}</div></div>
      ${V?`<div class="winWrap"><div class="winBanner" id="winBanner">${V}</div></div>`:""}
      <div id="tblStage"></div>
      <div class="tblBar">
        ${se?'<button type="button" id="tblStart">Start</button>':""}
        ${Me?'<p class="tblWait">Waiting for the host…</p>':""}
        ${q?'<button type="button" id="tblNudge">Play for her</button>':""}
        <button type="button" id="tblBack">Back to room</button>
        <button type="button" id="tblLeave">Leave table</button>
      </div>
      ${Ke?'<p class="tblWait" id="needFriend">Play with friends on your street</p>':""}
    </div>`;const Ie=t.querySelector("#tblStage");g.phase==="lobby"||!g.view?Ie.innerHTML=u(g,b,_):Ep[g.game]?.render(Ie,d(g)),r(g)}function u(b,g,w){return`<div class="lobby">${b.seats.map((_,P)=>`<div class="lobbySeat ${_?"filled":""} ${_===w?"me":""}">
      <span>${P+1}</span><b>${_?cr(g.players.get(_)?.nickname??"friend"):"Empty"}</b>
      ${_&&_===b.host?"<i>host</i>":""}${_===w?"<i>you</i>":""}
    </div>`).join("")}</div>`}function p(){n=null,a(),t.classList.add("hidden"),t.innerHTML=""}function y(){const b=l(),g=c();b&&g&&g.seats.includes(b.pid)&&b.tbl({op:"leave",tb:g.tb}),e.sfx.click(),p()}function m(){const b=l(),g=c();b&&g&&(b.tbl({op:"start",tb:g.tb}),e.sfx.sparkle())}function k(){const b=l(),g=c();b&&g&&(b.tbl({op:"nudge",tb:g.tb}),e.sfx.click())}return{open(b){n=b,f()},close:p,refresh:f,fail(b,g){e.toast(IE[g]||"Try that again!"),e.sfx.pop(),n===b&&f()},isOpen:()=>n}}const i1="/kids-house-game/assets/rug-zTS04c1f.webp",BE=Object.freeze(Object.defineProperty({__proto__:null,default:i1},Symbol.toStringTag,{value:"Module"})),a1="/kids-house-game/assets/pack~bean-bag-m3eBc9mA.webp",DE=Object.freeze(Object.defineProperty({__proto__:null,default:a1},Symbol.toStringTag,{value:"Module"})),r1="/kids-house-game/assets/pack~sv-bean-bag-TrtltuSt.webp",HE=Object.freeze(Object.defineProperty({__proto__:null,default:r1},Symbol.toStringTag,{value:"Module"})),WE=120,VE=192,UE=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let ae=null,bs=null,Bn=null,Sp=!1;const l1=1020,zE=e=>!!e&&!document.body.classList.contains("phone")&&e.clientHeight>e.clientWidth+40,Os=()=>{const e=document.getElementById("gameroom"),t=e?.clientHeight||600;return zE(e)?Math.min(t/ei,e.clientWidth/l1):t/ei},xr=()=>bs;function ci(){const e=ae?.hood();if(!e)return null;for(const[t,n]of e.tables){const s=n.seats.indexOf(e.pid);if(s>=0){const o=Ca(Number(t))[s];return{tb:Number(t),seat:s,x:o.x,y:o.y}}}return null}function QE(){const e=ae?.hood();if(!e)return!1;for(const[t,n]of e.players)if(t!==e.pid&&n.online)return!0;return!1}function NE(e){if(ae=e,bs=OE({hood:e.hood,toast:e.toast,confetti:()=>ig(),sfx:e.sfx}),Sp)return bs;Sp=!0;const t=document.getElementById("grWorld");return t.addEventListener("click",jE),t.addEventListener("pointerdown",n=>{n.target.closest(".grChair, .grTable, .grDoor, .pet")&&n.stopPropagation()}),bs}function jf(){if(!ae)return;const e=Os(),t=document.getElementById("grWorld"),n=l=>l*e+"px";t.style.width=Ma*e+"px",t.style.height=ei*e+"px",t.style.setProperty("--sc",String(e));const s=document.getElementById("gameroom"),o=(s?.clientHeight||0)-6-ei*e,i=o>1?Math.round(o*.55):0,a=o>1?Math.ceil(o-i)+6:0;t.style.marginTop=i?i+"px":"";let r='<div class="sceneArtHost" id="grSceneArt"></div>'+P9();i&&(r+=`<div class="grExtWrap" style="top:${-i}px;height:${i}px">${cp("top",i/e)}</div>`),s&&(s.style.background=i?"linear-gradient(180deg, #ffe0f2 0 50%, #d27399 50%)":""),a&&(r+=`<div class="grExtWrap" style="top:100%;height:${a}px">${cp("bottom",a/e)}${YE(e,a,s?.clientWidth||0)}</div>`),r+=`<button class="grDoor" data-gr="map" aria-label="Back to the map" style="left:${n(78)};top:${n(268)};width:${n(86)};height:${n(170)}"></button>`,uo.forEach((l,c)=>{const d=l.seats>=6?560:l.seats>=4?440:340;r+=`<button class="grTable" data-tb="${c}" aria-label="${P0[l.game].name} table" style="left:${n(l.x-d/2)};top:${n(456)};width:${n(d)};height:${n(70)}"></button>`,Ca(c).forEach((f,u)=>{const p=76*e,y=72*e,m=Math.max(p,44),k=Math.max(y,44),b=(f.x-38)*e-(m-p)/2,g=(f.y-16)*e-(k-y)/2;r+=`<button class="grChair" data-tb="${c}" data-seat="${u}" aria-label="Empty chair" style="left:${b}px;top:${g}px;width:${m}px;height:${k}px"></button>`})}),r+='<div class="savatars" id="gavatars"></div>',t.innerHTML=r,yo(document.getElementById("grSceneArt"),"clubhouse",t),Xi()}function Xi(){if(!ae||ae.view()!=="gameroom")return;const e=document.getElementById("gavatars");if(!e)return;const t=Os(),n=new Set;for(const i of qE()){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&GE(a));const r=JSON.stringify(i.look)+i.name+(i.away?":away":"");if(a.dataset.look!==r){const u=a.querySelector(".bubble");a.innerHTML=`<div class="inner">${Mt(i.look)}</div>${i.name?`<div class="nametag">${UE(i.name)}${i.away?'<i class="awayBadge">away</i>':""}</div>`:""}`,u&&a.appendChild(u),a.dataset.look=r}const l=(mo[i.look.size]??1)*t*.95,c=WE*l,d=VE*l,f=i.seated?i.y-8:i.y;Vl(a,i.x*t-c/2+"px",f*t-d+"px"),a.style.width=c+"px",a.style.height=d+"px",a.style.zIndex=String(100+Math.round(i.y)),a.classList.toggle("flipped",i.flip),a.classList.toggle("away",i.away),a.classList.toggle("seated",i.seated),Aa(a,i.look,i.mine)}e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),ae.refreshNear();const s=ae.hood();document.querySelectorAll("#grWorld .grChair").forEach(i=>{const a=s?.tables.get(+i.dataset.tb)?.seats[+i.dataset.seat];i.classList.toggle("taken",!!a);const r=a?s.players.get(a)?.nickname:"";i.setAttribute("aria-label",r?r+" is sitting":"Empty chair")});const o=document.getElementById("grSolo");o&&o.classList.toggle("hidden",QE())}function qE(){const e=[],t=ae.hood();if(t){const n=new Map;for(const[a,r]of t.tables)r.seats.forEach((l,c)=>{l&&n.set(l,Ca(Number(a))[c])});const s=[...t.presence.entries()],o=ae.myPres();o&&s.push([t.pid,o]);const i=new Set;for(const[a,r]of s){if(r.where!=="gameroom")continue;const l=t.players.get(a);if(!l)continue;i.add(a);const c=n.get(a);e.push({key:a,look:l.look,name:l.nickname,x:c?.x??r.x,y:c?.y??r.y,flip:r.flip,mine:a===t.pid,away:!1,seated:!!c})}for(const[a,r]of n){if(i.has(a))continue;const l=t.players.get(a);l&&e.push({key:a,look:l.look,name:l.nickname,x:r.x,y:r.y,flip:!1,mine:!1,away:!0,seated:!0})}}else{const n=ae.solo();if(n?.where==="gameroom"){const s=ae.soloLook();e.push({key:"solo",look:s.look,name:"",x:n.x,y:n.y,flip:n.flip,mine:!0,away:!1,seated:!1})}}return e}function jE(e){if(!ae||ae.view()!=="gameroom")return;const t=e.target,n=t.closest(".savatar");if(n){const c=ae.hood(),d=n.dataset.pid;if(c&&d){for(const[f,u]of c.tables)if(u.seats.includes(d)){bs?.open(Number(f));return}}return}if(t.closest('[data-gr="map"]')){ae.goMap();return}const s=t.closest(".grChair");if(s){FE(+s.dataset.tb,+s.dataset.seat);return}const o=t.closest(".grTable");if(o){if(!ae.hood()){c1();return}bs?.open(+o.dataset.tb),ae.sfx.click();return}if(t.closest(".pet")||ci())return;const i=document.getElementById("grWorld").getBoundingClientRect(),a=Os(),r=(e.clientX-i.left)/a,l=(e.clientY-i.top)/a;l<430||(Bn={x:Math.max(60,Math.min(Ma-60,r)),y:Math.max(470,Math.min(590,l))})}function FE(e,t){if(!ae)return;const n=ae.hood();if(!n){c1();return}const s=n.tables.get(e)?.seats[t];if(s&&s!==n.pid){ae.toast((n.players.get(s)?.nickname??"Someone")+" is sitting there!"),ae.sfx.pop(),bs?.open(e);return}Bn=null,n.tbl({op:"sit",tb:e,seat:t});const o=Ca(e)[t];ae.setPres({where:"gameroom",x:o.x,y:Math.max(470,Math.min(590,o.y)),flip:!1}),bs?.open(e),ae.sfx.click()}function c1(){if(!ae)return;const e=document.getElementById("grSolo");e&&(e.classList.remove("hidden"),e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),ae.toast("Play with friends on your street"),ae.sfx.pop()}function ZE(e){if(!ae||ae.view()!=="gameroom"||!Bn)return;if(ci()){Bn=null;return}const t=ae.hood()?ae.myPres():ae.solo();if(!t||t.where!=="gameroom"){Bn=null;return}const n=Bn.x-t.x,s=Bn.y-t.y,o=Math.hypot(n,s);if(o<4){Bn=null;return}const i=Math.min(o,300*e),a={where:"gameroom",x:t.x+n/o*i,y:t.y+s/o*i,flip:Math.abs(n)>2?n<0:t.flip};ae.setPres(a);const r=Os(),l=document.getElementById("grScroll"),c=a.x*r-l.scrollLeft;(c<l.clientWidth*.22||c>l.clientWidth*.78)&&(l.scrollLeft=a.x*r-l.clientWidth/2)}function GE(e){e.addEventListener("pointerdown",t=>{if(!ae||ci())return;const n=ae.hood()?ae.myPres():ae.solo();if(!n||n.where!=="gameroom")return;t.preventDefault(),t.stopPropagation(),Bn=null;const s=Os(),o=document.getElementById("grWorld"),i=document.getElementById("grScroll"),a=b=>{const g=o.getBoundingClientRect();return{x:(b.clientX-g.left)/s,y:(b.clientY-g.top)/s}},r=a(t),l={x:n.x-r.x,y:n.y-r.y};let c=t,d=0,f=n.x,u=!1;const p=b=>{const g=ae.hood()?ae.myPres():ae.solo();if(!g||g.where!=="gameroom")return;const w=a(b),_=Math.max(60,Math.min(Ma-60,w.x+l.x)),P=Math.max(470,Math.min(590,w.y+l.y));if(!u&&Math.hypot(_-g.x,P-g.y)<6)return;u=!0;const $=Math.abs(_-f)>3?_<f:g.flip;Math.abs(_-f)>3&&(f=_),ae.setPres({where:"gameroom",x:_,y:P,flip:$})},y=()=>{const b=i.getBoundingClientRect(),g=c.clientX<b.left+70?-12:c.clientX>b.right-70?12:0;g&&u&&(i.scrollLeft+=g,p(c)),d=requestAnimationFrame(y)};d=requestAnimationFrame(y),e.classList.add("lifted"),ae.sfx.pick();const m=b=>{b.pointerId===t.pointerId&&(c=b,p(b))},k=b=>{b.pointerId===t.pointerId&&(cancelAnimationFrame(d),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",k),e.classList.remove("lifted"),u&&ae.sfx.drop())};window.addEventListener("pointermove",m),window.addEventListener("pointerup",k)})}function YE(e,t,n){if(t<120)return"";const s=n?Math.min(uo[0].x*e,n/2):uo[0].x*e,o=Math.min(560*e*1.2,t*1.7),i=o*306/960,a=Math.max(8,(t-i)*.45),r=o*.26,l=r*.78,c=(d,f,u,p,y=!1)=>`<img class="grDecor" src="${d}" alt="" aria-hidden="true" draggable="false" style="left:${f}px;top:${u}px;width:${p}px${y?";transform:scaleX(-1)":""}">`;return`<div class="grDecor grRug" aria-hidden="true" style="left:${s-o/2}px;top:${a}px;width:${o}px;height:${i}px"><img src="${i1}" alt="" draggable="false" style="width:${o}px;margin-top:${-o*634/960}px"></div>`+c(a1,s-o/2-r*.35,a+i*.45-l*.6,r)+c(r1,s+o/2-r*.65,a+i*.45-l*.6,r*1.02,!0)}let Mr=!1;const Oi=F9(),ee=M0();ee.born&&typeof navigator<"u"&&!navigator.webdriver&&!ee.get().baby&&ee.dispatch({type:"baby/meet",now:Date.now()});let Re=ee;const d1=[],Tp=new WeakSet;function f1(e){Tp.has(e)||(Tp.add(e),e.subscribe((t,n)=>{Re===e&&d1.forEach(s=>s(t,n))}))}f1(ee);const S={get:()=>Re.get(),dispatch(e){Re.dispatch(e)},subscribe:e=>{d1.push(e)}},ue=Tt,Ce=Wn,wo=390;let G=1e3;const ko=()=>Math.max(0,ue-G),Ia=375,h1=(e,t)=>e.wall?Math.min(t,Ia):t,u1=12,Lo=(e,t)=>e.wall?t:Math.min(t,Ce-u1),Bs=120,$n=192,Ff=[{id:"living",name:"Living Room",color:"#ff8fab"},{id:"bedroom",name:"Bedroom",color:"#b388d6"},{id:"kitchen",name:"Kitchen",color:"#5cc985"},{id:"salon",name:"Salon",color:"#f0a0d8"},{id:"nursery",name:"Nursery",color:"#9ad7f5"},{id:"bathroom",name:"Bathroom",color:"#7ec8d6"}],p1=e=>Ff.find(t=>t.id===e)?.color??"#ccc",Zf=Cx();p5(Ln,de);const Ss=[{id:"__people",name:"People",icon:"",kind:"people"},...["furniture","decor","plants","food","pets"].map((e,t)=>({id:e,name:e,icon:["armchair","balloon","flowers","donut","cat"][t],kind:"cat"}))];Ss.push({id:"secrets",name:"Secrets",icon:"egg:chloe-starlamp",kind:"cat"});for(const e of Ln)Ss.some(t=>t.kind==="cat"&&t.id===e.cat)||Ss.push({id:e.cat,name:e.cat,icon:e.kind,kind:"cat"});for(const e of Ln)e.pack&&!vm(e)&&!Ss.some(t=>t.id==="pack:"+e.pack)&&Ss.push({id:"pack:"+e.pack,name:ag(e.pack),icon:e.kind,kind:"pack"});const Oc=e=>Ln.filter(t=>XL(t,e,S.get().currentRoom,Yf==="all",Dl())),KE=["#ffd6e0","#d9ccff","#cdf3dc","#cfe8ff","#fff1b8","#ffe0c7","#ffffff","#f6c1ff"],XE=["#e8b98a","#f2d0a4","#c99366","#ffe7a8","#bfe3d0","#d6d6f5","#ffc8dd","#9fb4c7"],Nt={paint:'<svg viewBox="0 0 48 48"><path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M28 12 L34 6 L42 14 L36 20" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/></svg>',shirt:'<svg viewBox="0 0 48 48"><path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',soundOn:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 17 Q37 24 32 31 M36 12 Q45 24 36 36" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',soundOff:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ddd" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M33 19 L43 29 M43 19 L33 29" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',flip:'<svg viewBox="0 0 48 48"><path d="M24 6 V42" stroke="#5a3d5c" stroke-width="3" stroke-dasharray="4 4"/><path d="M18 12 L6 36 H18 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M30 12 L42 36 H30 Z" fill="#fff" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',front:'<svg viewBox="0 0 48 48"><rect x="6" y="6" width="22" height="22" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="18" y="18" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',back:'<svg viewBox="0 0 48 48"><rect x="18" y="18" width="24" height="24" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="22" height="22" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',trash:'<svg viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="28" rx="5" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><rect x="8" y="9" width="32" height="7" rx="3.5" fill="#ffadad" stroke="#5a3d5c" stroke-width="3"/><path d="M20 21 V35 M28 21 V35" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',smaller:'<svg viewBox="0 0 48 48"><rect x="16" y="16" width="16" height="16" rx="4" fill="#bde0fe" stroke="#5a3d5c" stroke-width="3"/><path d="M8 24 H14 M34 24 H40" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',bigger:'<svg viewBox="0 0 48 48"><rect x="12" y="12" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M24 6 V11 M24 37 V42 M6 24 H11 M37 24 H42" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>'},JE='<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5b3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5b3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5b3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5b3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',eS='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 15 H37 M11 24 H37 M11 33 H37" fill="none" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',tS='<svg class="mailGlyph" viewBox="0 0 48 48" aria-hidden="true"><g transform="translate(0 2)"><rect x="6" y="14" width="36" height="24" rx="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/><path d="M6 16 L24 30 L42 16" fill="none" stroke="#5a3d5c" stroke-width="3"/><path d="M34 12 V6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M34 6 H44 L40 10 L44 14 H34 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2"/></g></svg>',g1='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',Pp='<svg viewBox="0 0 40 40" width="28" height="28"><path d="M12 36 L18 8 M28 36 L22 8 M20 30 V38" stroke="#a86f3e" stroke-width="3" stroke-linecap="round"/><rect x="8" y="8" width="24" height="18" rx="3" fill="#fff" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="16" cy="16" r="3" fill="#ff8fab"/><path d="M12 24 L20 17 L28 24" fill="#69db7c" stroke="#5a3d5c" stroke-width="1.5" stroke-linejoin="round"/></svg>',nS=document.getElementById("app");nS.innerHTML=`
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${Dt.chat}<span class="badge" id="chatBadge"></span></button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${Dt.home}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${S4}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${_9}</button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${tf}<span class="badge" id="mapBadge"></span></button>
    <button class="round" id="btnMenu" aria-label="Menu" aria-expanded="false">${eS}<span class="badge" id="menuBadge"></span></button>
  </div>
</div>
<div class="menuPop hidden" id="menuPop">
  <div class="menuCard" role="dialog" aria-label="Menu">
    <button type="button" class="close" id="menuClose" aria-label="Close">✕</button>
    <p class="menuGroup">My stuff</p>
    <button type="button" class="menuRow photoRow" id="btnPhoto" aria-label="Take a photo"><span class="mIco">📸</span><span class="mLabel">Take a photo</span></button>
    <button type="button" class="menuRow" id="btnPets" aria-label="Pets"><span class="mIco">${J0}</span><span class="mLabel">Pets</span></button>
    <button type="button" class="menuRow" id="btnDress" aria-label="Characters"><span class="mIco">${Nt.shirt}</span><span class="mLabel">Characters</span></button>
    <button type="button" class="menuRow" id="btnStudio" aria-label="Art Studio"><span class="mIco">${Pp}</span><span class="mLabel">Art Studio</span></button>
    <button type="button" class="menuRow" id="btnPaint" aria-label="Colors"><span class="mIco">${Nt.paint}</span><span class="mLabel">Wall &amp; floor colors</span></button>
    <button type="button" class="menuRow" id="secrets" aria-label="Surprises, 0 of 5"><span class="mIco secGift">🎁</span><span class="mLabel"><span class="secWord">Surprises </span><span class="secCount">0/5</span></span></button>
    <p class="menuGroup houseGroup">House</p>
    <button type="button" class="menuRow lockRow" id="btnLock" aria-label="Lock my house"><span class="mIco" id="lockIco">${Dt.lockOff}</span><span class="mLabel" id="lockLabel">Lock my house</span></button>
    <button type="button" class="menuRow mailRow" id="btnMail" aria-label="Mailbox"><span class="mIco">${tS}</span><span class="mLabel">Mailbox</span><span class="menuNew" id="mailNew"></span></button>
    <!-- Day / Night / Auto. The clock stays on Auto until she taps. -->
    <div id="menuDaySlot" class="menuSlot" hidden></div>
    <p class="menuGroup streetGroup">Street</p>
    <button type="button" class="menuRow grownRow" id="btnParent" aria-label="Grown-ups"><span class="mIco">${Dt.shield}</span><span class="mLabel">Grown-ups</span></button>
    <button type="button" class="menuRow soloLeave" id="btnSolo" aria-label="Play in my own house"><span class="mIco">${Dt.solo}</span><span class="mLabel">Play in my own house</span></button>
    <button type="button" class="menuRow friendRow" id="btnHood" aria-label="Friends"><span class="mIco">${Dt.street}</span><span class="mLabel">Friends</span></button>
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
        <button data-a="smaller" aria-label="Smaller">${Nt.smaller}</button><button data-a="bigger" aria-label="Bigger">${Nt.bigger}</button><button data-a="flip" aria-label="Flip">${Nt.flip}</button><button data-a="front" aria-label="Bring forward">${Nt.front}</button><button data-a="back" aria-label="Send back">${Nt.back}</button><button data-a="delete" class="danger" aria-label="Put away">${Nt.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <button type="button" class="artFab" id="artFab" aria-label="Art Studio: paint a picture">${Pp}<span>Paint</span></button>
  <div class="bin" id="bin">${Nt.trash}</div>
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
<div class="street mapView hidden" id="street"><div class="mapSky">${ay}</div><div class="mapMeadow">${ry}</div><button class="mailCue" id="mailCue" type="button">You've got mail!</button><div class="mapWorld" id="mapWorld"></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>
<div id="toastLane"></div>
<div class="phoneNote" id="phoneNote"><div class="card"><h2>Turn sideways</h2><p>Turn your phone sideways for more room to play!</p><button class="phoneOk" id="phoneOk" type="button">OK!</button></div></div>
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>
<div id="skyMount"></div>`;const L=e=>document.getElementById(e),Y=L("stage"),Gf=L("world"),X=L("layer"),ne=L("toolbar"),Lr=L("bin");let Ne=null,De=S.get().characters[0]?.id??null,Bt="furniture",Yf="",Vd="",sS=Date.now()%1e5;const Jr=e=>`${e}-${Date.now().toString(36)}${(++sS).toString(36)}${Math.random().toString(36).slice(2,5)}`,mt="__me";let v=null,R="house",qe=!1,me="",el=new Map,m1=!1,y1=()=>{};const Se=qk(L("modeToggle"),{ownHouse:()=>!v||!me||me===v.myHouseId(),onChange:()=>{m1&&(fi.matches?Ps():Ds()),y1()}}),Er=Hk({send:(e,t,n,s)=>v?.sendMail(e,t,n,s),read:(e,t)=>v?.readMail(e,t),drop:(e,t)=>v?.dropMail(e,t),houseOf:e=>[...v?.players.values()??[]].find(t=>t.pid===e)?.houseId??"",houseName:e=>v?.houses.get(e)?.meta.name??"My House",lettersOf:e=>v?.houses.get(e)?.confirmed.mailbox?.letters??[],mine:e=>!!v&&v.houses.get(e)?.meta.ownerId===v.pid,toast:F,openOwn:()=>{const e=v?.myHouseId();e&&gh(e)},freeType:()=>!v||H0(v.settings)});Se.sync(!0);const no=new Map,ga={};let ie=ii,qo=0;const b1=new Set,Kf=()=>!b1.has(S.get().currentRoom),di=()=>{b1.add(S.get().currentRoom)};m1=!0;let ma=null;const Nl=()=>{cancelAnimationFrame(qo),ma=null},ti=e=>Math.max(0,Math.min(ko(),e));function Je(e){ie=ti(e),ga[S.get().currentRoom]=ie,Gf.style.transform=`translate3d(${-ie}px,0,0)`,L("nudgeL").classList.toggle("off",ie<=1),L("nudgeR").classList.toggle("off",ie>=ko()-1);const t=L("mmView");t.style.left=ie/ue*100+"%",t.style.width=G/ue*100+"%",Ne&&N1(S.get()),Wa(),Ha()}function ql(e){cancelAnimationFrame(qo),e=ti(e),ma=e;const t=()=>{const n=e-ie;if(Math.abs(n)<.5){Je(e),ma=null;return}Je(ie+n*.18),qo=requestAnimationFrame(t)};qo=requestAnimationFrame(t)}const yt=()=>Y.getBoundingClientRect().width/G,oS="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)",fi=window.matchMedia(oS);function iS(){const e=fi.matches;document.body.classList.toggle("phone",e),document.body.classList.toggle("phone-portrait",e&&window.matchMedia("(orientation: portrait)").matches);const t=L("stageWrap");for(const n of[L("nudgeL"),L("nudgeR")]){const s=e?t:Y;n.parentElement!==s&&s.appendChild(n)}}function w1(){const e=document.querySelector(".top");if(!e)return;const t=e.getBoundingClientRect(),n=document.body.classList.contains("phone")?t.bottom:t.height;document.documentElement.style.setProperty("--chrome-h",Math.ceil(n)+"px"),k1()}function k1(){const e=document.querySelector(".top");if(!e)return;const t=Math.ceil(e.getBoundingClientRect().bottom+16)+"px",n=document.getElementById("mailCue");n&&(n.style.top=t);const s=document.getElementById("toastLane");s&&(s.style.top=t)}function aS(){const e=document.documentElement,t=document.getElementById("app");if(!(document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait"))){t.style.top="",t.style.height="",t.style.bottom="",e.style.removeProperty("--vvh"),e.style.removeProperty("--vvt");return}const s=window.visualViewport,o=Math.round(s?s.height:window.innerHeight),i=Math.round(s?s.offsetTop:0);e.style.setProperty("--vvh",o+"px"),e.style.setProperty("--vvt",i+"px"),t.style.top=i+"px",t.style.height=o+"px",t.style.bottom="auto"}function Ds(){iS(),aS(),w1();const e=L("stageWrap"),t=document.body.classList.contains("phone"),n=e.clientWidth,s=e.clientHeight,o=Math.max(1,s-Jf());if(t?s>n*.85:s>n*.95){const r=n/Math.max(1,s);G=Math.round(Math.max(480,Math.min(860,Ce*r)))}else if(t){const r=n/Math.max(1,o);G=Math.round(Math.max(480,Math.min(ue,Ce*r)))}else G=1e3;G=Xf(G),Y.style.width=G+"px",Y.style.height=Ce+"px";const a=Math.min(n/G,o/Ce);if(L1(a),Y.style.setProperty("--yard-sc",String(a||1)),t&&Y.style.setProperty("--fit",String(yt())),v1(),ie>ko())Je(ie);else{const r=L("mmView");r.style.left=ie/ue*100+"%",r.style.width=G/ue*100+"%"}dt(),!t&&R==="house"&&Kf()&&Ph(),!t&&R==="house"&&Ts(!1),mS(),R==="ranch"&&requestAnimationFrame(Jd),R==="gameroom"&&requestAnimationFrame(U2),hi(),t&&R==="ranch"&&lP(),_1(),Mr&&Se.hint(),sc(),hs()}function v1(){const e=L("stageWrap"),t=document.body.classList.contains("phone")&&R==="house";for(const n of[L("nudgeL"),L("nudgeR")]){if(!t||n.parentElement!==e){n.style.marginTop="",n.style.left="",n.style.right="",n.style.top="";continue}const s=Y.getBoundingClientRect(),o=e.getBoundingClientRect(),i=(s.top+s.bottom)/2-o.top;n.style.top=i+"px",n.style.marginTop=-n.offsetHeight/2+"px",n.style.left="",n.style.right=""}}function _1(){document.body.classList.remove("secrets-chrome"),L("secrets")?.classList.remove("compact")}function dt(e=0){if(!document.body.classList.contains("phone"))return;if(R==="house"){$1();return}const t=R==="park"?"parkScroll":R==="ranch"?"ranchScroll":R==="gameroom"?"grScroll":"";if(!t)return;const n=document.getElementById(t);if(!n||n.clientWidth<20){e<8&&requestAnimationFrame(()=>dt(e+1));return}const s=n.querySelector(".savatar.mine")??n.querySelector(".savatar");if(!s){e<8&&requestAnimationFrame(()=>dt(e+1));return}lS(n,[s,...s.querySelectorAll(".nametag")])&&e<8?requestAnimationFrame(()=>dt(e+1)):rS()}function rS(){oc()&&(R==="gameroom"&&V2([...document.querySelectorAll(".neonSignArt")],document.getElementById("grScroll")),R==="ranch"&&!qe&&(z2(),Ah()))}function lS(e,t){const s=e.getBoundingClientRect(),o=Math.min(s.right,window.innerWidth)-12,i=Math.max(s.left,0)+12;let a=0,r=0;for(const c of t){const d=c.getBoundingClientRect();d.width<2||d.height<2||(a=Math.max(a,d.right-o),r=Math.max(r,i-d.left))}if(a<=1&&r<=1)return!1;const l=e.scrollLeft;return a>1&&r>1?e.scrollLeft-=r:a>1?e.scrollLeft+=a:e.scrollLeft-=r,Math.abs(e.scrollLeft-l)>.5}function $1(){Ts(!1)}function Ap(e){let t=0;for(const n of e){const s=de[n.kind];!s||s.wall||(t=Math.max(t,s.w*Ge(n)))}return t}function cS(){if(R!=="house"||!Se.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return 0;const e=S.get().rooms,t=S.get().currentRoom;let n=Ap(e[t]?.items??[]);if(t==="backyard")for(const o of Object.keys(e))o!=="backyard"&&(n=Math.max(n,Ap(e[o].items)));if(n<40)return 0;const s=document.body.classList.contains("phone-portrait")?.7:.55;return Math.min(ue,Math.ceil(n/s))}function Xf(e){const t=cS();return t&&e<t?t:e}function dS(){const e=Xf(G);if(e<=G+.5)return;G=e,Y.style.width=G+"px";const t=L("stageWrap"),n=Math.max(1,t.clientHeight-Jf()),s=Math.min(t.clientWidth/G,n/Ce);if(L1(s),document.body.classList.contains("phone")&&Y.style.setProperty("--fit",String(s)),ie>ko())Je(ie);else{const o=L("mmView");o.style.left=ie/ue*100+"%",o.style.width=G/ue*100+"%"}Kf()&&R==="house"&&!document.body.classList.contains("phone")&&Ph()}let ya=null,ba=!1;function fS(){if(R!=="house"||!Se.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return null;const e=S.get();if(e.currentRoom==="backyard")return null;let t=null,n=ya;if(v&&Re!==ee){const a=ye();a&&a.where==="house"&&a.room===e.currentRoom&&(t=Rt(e.currentRoom,dn(v.pid,a),a).x,n||(n=dn(v.pid,a)?.item??null))}if(t===null){const a=e.characters.find(r=>r.id===De&&r.room===e.currentRoom)??e.characters.find(r=>r.room===e.currentRoom);if(!a)return null;t=Rt(e.currentRoom,Ct(a),a).x,n||(n=Ct(a)?.item??null)}if(!n)return null;const s=e.rooms[e.currentRoom].items.find(a=>a.id===n),o=s&&de[s.kind];if(!s||!o)return null;const i=o.w*Ge(s)/2;return{minX:Math.min(t-100,s.x-i),maxX:Math.max(t+100,s.x+i)}}function Ts(e){if(R!=="house"||_o)return;if(S.get().currentRoom==="backyard"){Math.abs(ie-bd)>.5&&Je(bd),hs();return}if(ba)return;const t=fS();if(t){const k=t.maxX-t.minX;let b=ie;k+20*2>G?b=t.minX-20:(t.minX-20<b&&(b=t.minX-20),t.maxX+20>b+G&&(b=t.maxX+20-G)),b=Math.max(0,Math.min(ko(),b)),Math.abs(b-ie)>.5&&Je(b),hs();return}const n=document.querySelector("#layer .char.avatar.mine")??document.querySelector("#layer .char");if(!n)return;const s=yt()||1,o=Y.getBoundingClientRect(),i=8;let a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i;for(const m of["nudgeL","nudgeR"]){const k=L(m);if(!k||k.classList.contains("off")||k.offsetParent===null)continue;const b=k.getBoundingClientRect();b.width<2||b.height<2||(m==="nudgeL"?r=Math.max(r,b.right+6):a=Math.min(a,b.left-6))}a-r<48&&(a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i);const l=[n,...n.querySelectorAll(".nametag")];let c=0,d=0,f=1/0,u=-1/0;for(const m of l){const k=m.getBoundingClientRect();k.width<2||k.height<2||(c=Math.max(c,k.right-a),d=Math.max(d,r-k.left),f=Math.min(f,k.left),u=Math.max(u,k.right))}if(document.body.classList.contains("phone-portrait")&&f<1/0){const m=(f+u)/2-(r+a)/2;if(Math.abs(m)>3){Je(ie+m/s),hs();return}}const p=hS(n),y=R7({cam:ie,maxCam:ko(),kidX:p,overflowL:d,overflowR:c,scale:s,nudgeX:e});Math.abs(y.cam-ie)>.5&&Je(y.cam),e&&Math.abs(y.kidX-p)>.5&&uS(n,y.kidX),hs()}function hS(e){if(e.dataset.pid&&v){const t=e.dataset.pid===v.pid?ye():v.presence.get(e.dataset.pid);if(t&&t.where==="house")return t.x}return S.get().characters.find(t=>t.id===e.dataset.cid)?.x??0}function uS(e,t){if(e.dataset.pid&&v&&e.classList.contains("mine")){const o=ye();if(!o||o.where!=="house")return;nt({...o,x:t}),bt();return}const n=e.dataset.cid;if(!n)return;const s=S.get().characters.find(o=>o.id===n);s&&S.dispatch({type:"char/move",id:n,room:S.get().currentRoom,x:t,y:s.y})}const pS={living:"Living",bedroom:"Bed",kitchen:"Kitchen",salon:"Salon",nursery:"Nursery",bathroom:"Bath"};function x1(){const e=R==="house",t=document.body.classList.contains("phone-portrait"),n=e&&!Se.isPlay(),s=e&&G+1<ue,o=e&&(t?n:n||s);document.body.classList.toggle("show-minimap",o)}const gS='<svg class="tabIco" width="14" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M1.6 6 L8 1.4 L14.4 6 V10.8 H1.6 Z" fill="currentColor" stroke="#5b3d5c" stroke-width="1.4" stroke-linejoin="round"/><rect x="6.6" y="7" width="2.8" height="3.8" rx=".8" fill="#fff6ea" stroke="#5b3d5c" stroke-width="1"/></svg>';function M1(){return document.body.classList.contains("phone")}function mS(){const e=M1()?"c":"f";x1(),e!==Vd&&(Vd=e,I1(S.get()))}function jl(){fi.matches?Ps():Ds()}window.addEventListener("resize",jl);window.addEventListener("resize",()=>requestAnimationFrame(sh));L("tabs").addEventListener("scroll",sh,{passive:!0});fi.addEventListener("change",jl);if(typeof ResizeObserver<"u"){let e="";new ResizeObserver(()=>{const t=L("stageWrap"),n=t.clientWidth+"x"+t.clientHeight;n!==e&&(e=n,jl())}).observe(L("stageWrap"))}let Rp="",Bc=!1;function Cp(){const e=L("stageWrap"),t=document.querySelector(".top"),n=document.querySelector(".tools"),s=r=>r?r.clientWidth+"x"+r.clientHeight:"0",o=window.visualViewport,i=o?Math.round(o.offsetTop)+"x"+Math.round(o.height)+"x"+Math.round(o.width):"",a=document.body.classList.contains("baby-card")?"c":"";return i+" "+s(e)+" "+s(t)+" "+s(n)+a}function Jf(){const e=document.body;if(!e.classList.contains("baby-card")||!e.classList.contains("phone")||e.classList.contains("phone-portrait"))return 0;const t=document.querySelector(".babyCare"),n=t&&!t.hidden?t.getBoundingClientRect().height:0;return Math.ceil(8+(n>8?n:72)+8)}function L1(e){const t=Jf(),n=L("stageWrap").clientHeight;Y.style.left="",t>0?Y.style.top=t+Math.max(0,n-t)/2+"px":Y.style.top="",Y.style.transform=`translate(-50%,-50%) scale(${e})`}function E1(){const e=L("modeToggle"),t=document.querySelector(".tools"),n=document.getElementById("modeDock"),s=document.querySelector(".drawerTop"),o=document.getElementById("roomFilter");if(!e||!t||!n||!s||!o)return!1;const i=document.body.classList.contains("phone"),a=i&&!document.body.classList.contains("phone-portrait"),r=!i&&window.matchMedia("(min-width: 900px)").matches,l=a?t:i||r?n:s;n.hidden=!(i&&!a)&&!r,n.classList.toggle("wideDock",r);let c=!1;const d=r?n:s;return o.parentElement!==d&&(r?n.appendChild(o):s.insertBefore(o,s.firstChild),c=!0),(e.parentElement!==l||r&&n.firstChild!==e)&&(a?t.insertBefore(e,t.firstChild):i||r?n.insertBefore(e,n.firstChild):s.insertBefore(e,s.firstChild),c=!0),c}function yS(){if(S.get().currentRoom==="backyard"||!document.body.classList.contains("phone-portrait")||!document.body.classList.contains("mode-play")||R!=="house")return;const e=L("stageWrap"),t=e.clientWidth,n=e.clientHeight;if(t<20||n<20||!(n>t*.85))return;const s=Math.min(ue,Xf(Math.max(280,Math.min(860,Math.round(Ce*t/n)))));if(Math.abs(s-G)<2)return;G=s,Y.style.width=G+"px",Y.style.height=Ce+"px";const o=Math.min(t/G,n/Ce);if(Y.style.transform=`translate(-50%,-50%) scale(${o})`,Y.style.setProperty("--fit",String(yt())),ie>ko())Je(ie);else{const i=L("mmView");i.style.left=ie/ue*100+"%",i.style.width=G/ue*100+"%"}v1(),x1()}function Ps(){if(Bc||!fi.matches)return;const e=E1(),t=Cp()+(document.body.classList.contains("mode-play")?"p":"d");if(!(!e&&t===Rp)){Bc=!0;try{Ds(),yS(),dt(),Rp=Cp()+(document.body.classList.contains("mode-play")?"p":"d")}finally{Bc=!1}}}if(typeof ResizeObserver<"u"){const e=new ResizeObserver(()=>Ps()),t=document.querySelector(".top");t&&e.observe(t),e.observe(L("stageWrap"));const n=document.querySelector(".tools");n&&e.observe(n)}window.visualViewport&&(window.visualViewport.addEventListener("resize",()=>Ps()),window.visualViewport.addEventListener("scroll",()=>Ps()));Y.addEventListener("scroll",()=>{Y.scrollLeft=0,Y.scrollTop=0});const Qe=(e,t)=>{const n=Y.getBoundingClientRect();return{x:(e-n.left)/n.width*G+ie,y:(t-n.top)/n.height*Ce}},Ud=(e,t)=>{const n=Y.getBoundingClientRect();return e>n.left&&e<n.right&&t>n.top&&t<n.bottom},Ip=(e,t)=>{const n=Lr.getBoundingClientRect();return e>n.left-20&&e<n.right+20&&t>n.top-20&&t<n.bottom+20},Oa=e=>mo[e.size]??1,kn=new Map;function eh(){return!v||Re===ee?!0:v.houses.get(me)?.meta.ownerId===v.pid}function Ba(e){const t=de[e.kind];return!t||!Kn(e.kind)?null:{id:e.id,kind:e.kind,x:e.x,footY:Lo(t,e.y),flip:!!e.flip,scale:Ge(e),w:t.w,h:Xe(t)}}function Rt(e,t,n){if(!t)return n;const s=S.get().rooms[e]?.items.find(a=>a.id===t.item),o=s&&Ba(s);if(!o)return n;const i=m0(o).find(a=>a.n===t.n);return i?{x:i.x,y:i.y}:n}function vo(e,t,n=!1){const s=S.get(),o=[];for(const i of s.characters){if(i.id===e||i.room!==s.currentRoom)continue;const a=Ct(i);a&&o.push({item:a.item,n:a.n})}if(!n){const i=Wb(s.baby,s.currentRoom);i&&o.push(i)}if(v&&R==="house"){const i=(r,l)=>{if(r===t||l.where!=="house"||l.houseId!==me||l.room!==s.currentRoom)return;const c=dn(r,l);c&&o.push({item:c.item,n:c.n})};v.presence.forEach((r,l)=>i(l,r));const a=ye();a&&v.pid!==t&&i(v.pid,a)}return o}function S1(e,t){t?kn.set(e,t):kn.delete(e)}function Ji(e,t,n,s,o){const a=!v||Re===ee||!!v?.speaksSit;a?kn.delete("c:"+e):S1("c:"+e,o),a?S.dispatch({type:"char/move",id:e,room:t,x:n,y:s,seat:o}):S.dispatch({type:"char/move",id:e,room:t,x:n,y:s})}function wa(e,t,n,s,o){const{seat:i,...a}=e;if(v&&!v.speaksSit){S1("p:"+v.pid,o?{item:o.id,pose:o.pose,n:o.n}:null),nt({...a,x:t,y:n,flip:s});return}v&&kn.delete("p:"+v.pid),nt(o?{...a,x:t,y:n,flip:s,seat:o}:{...a,x:t,y:n,flip:s})}function Ct(e){return e.seat?e.seat:kn.get("c:"+e.id)??null}function dn(e,t){return t.seat?{item:t.seat.id,pose:t.seat.pose,n:t.seat.n}:kn.get("p:"+e)??null}function tl(e,t){const n=S.get(),s=document.elementsFromPoint(e,t),o=new Set;for(let i=0;i<s.length;i++){const a=s[i];if(!a||!a.closest)continue;const r=a.closest(".item");if(!r)continue;const l=r.dataset.id;if(!l||o.has(l))continue;o.add(l);const c=n.rooms[n.currentRoom].items.find(d=>d.id===l);if(c&&Kn(c.kind))return c}return null}function T1(e,t){const n=S.get(),s=document.elementsFromPoint(e,t),o=new Set;for(let i=0;i<s.length;i++){const a=s[i];if(!a||!a.closest)continue;const r=a.closest(".item");if(!r)continue;const l=r.dataset.id;if(!l||o.has(l))continue;o.add(l);const c=n.rooms[n.currentRoom].items.find(d=>d.id===l);if(c)return c}return null}function bS(e){const t=[];for(const n of["left","right"]){const s=e.held[n];s&&ln(s.kind)&&t.push({hand:n,kind:s.kind})}return t}function th(e,t,n,s){const o=S.get(),i=o.characters.find(r=>r.id===e);if(!i)return;const a=Rl({releaseX:t,releaseY:n,hit:s,items:o.rooms[o.currentRoom].items,occupied:vo(e),held:bS(i),seatPiece:r=>Ba(r)});for(const r of a.releases)S.dispatch({type:"char/release",id:e,hand:r.hand,x:r.x,y:r.y});Ji(e,o.currentRoom,a.x,a.y,a.seat)}function nh(e,t,n){const s=ye();if(!s||!v||s.where!=="house")return;const o=S.get(),i=Rl({releaseX:e,releaseY:t,hit:n,items:o.rooms[o.currentRoom].items,occupied:vo(void 0,v.pid),held:[],seatPiece:r=>Ba(r)}),a=i.seat?{id:i.seat.item,pose:i.seat.pose,n:i.seat.n}:null;wa(s,i.x,i.y,s.flip,a)}function wS(e){const t=Sl(e);if(t)return"k-bed k-bed-"+t.clip;const n=e.toLowerCase();return/sofa|couch|loveseat/.test(n)?"k-sofa":/bench/.test(n)?"k-bench":/chair|stool|rocker/.test(n)?"k-chair":""}function kS(){const e=S.get(),t=new Map,n=(s,o)=>{const i=t.get(s);t.set(s,i===void 0?o:Math.max(i,o))};for(const s of e.characters){const o=s.room===e.currentRoom?Ct(s):null;o&&n(o.item,o.n)}if(v&&R==="house"){const s=(i,a)=>{const r=a.where==="house"&&a.houseId===me&&a.room===e.currentRoom?dn(i,a):null;r&&n(r.item,r.n)};v.presence.forEach((i,a)=>s(a,i));const o=ye();o&&s(v.pid,o)}return t}function vS(e,t){const n=Oa(e),s=Wl(e,Bl(Ct(e)?.pose))[t];let o=s.x;e.flip&&(o=100-o);const i=Rt(e.room,Ct(e),e);return{x:i.x+(o-50)/100*Bs*n,y:i.y-$n*n+s.y/160*$n*n}}function P1(e){const t=S.get();let n=null;for(const s of t.characters){if(s.room!==t.currentRoom)continue;const o=Oa(s),i=Rt(s.room,Ct(s),s),a=Math.abs(e.x-i.x)<Bs*o/2+25&&e.y>i.y-$n*o-25&&e.y<i.y+20;for(const r of["left","right"]){if(s.held[r])continue;const l=vS(s,r),c=Math.hypot(e.x-l.x,e.y-l.y);(a||c<75)&&(!n||c<n.d)&&(n={c:s,hand:r,d:c})}}return n}const A1=["none","radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)","repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)","linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)"],R1="repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 125px), linear-gradient(rgba(0,0,0,.06), transparent 50%)",zd=e=>`url('${e.replace(/'/g,"%27")}')`;function C1(e){const t=e.rooms[e.currentRoom],n=L("wall"),s=L("floor"),o=t.wallTile?Mu[t.wallTile]:void 0;n.style.backgroundColor=t.wallpaper,o?(n.style.backgroundImage=zd(o.url),n.style.backgroundSize="220px auto",n.style.backgroundPosition="0 0"):(n.style.backgroundImage=A1[t.pattern]??"none",n.style.backgroundSize=t.pattern===1?"44px 44px":t.pattern===3?"60px 60px":"auto",n.style.backgroundPosition=t.pattern===3?"0 0, 30px 30px":"0 0");const i=t.floorTile?Mu[t.floorTile]:void 0;s.style.backgroundColor=t.floor,s.style.backgroundImage=i?`${zd(i.url)}, linear-gradient(rgba(0,0,0,.06), transparent 50%)`:R1,s.style.backgroundSize=i?"180px auto, auto":"auto",L("mmWall").style.background=t.wallpaper,L("mmFloor").style.background=t.floor,yo(L("sceneArt"),R==="house"?J7(e.currentRoom,t):null,Y),V1(e)}function nl(e){const n=e.rooms[e.currentRoom].items.filter(o=>de[o.kind]).map(o=>{const i=de[o.kind];return`<i style="left:${o.x/ue*100}%;top:${(Lo(i,o.y)-Xe(i)*Ge(o)/2)/Ce*100}%"></i>`}).join(""),s=e.characters.filter(o=>o.room===e.currentRoom).map(o=>{const i=Rt(e.currentRoom,Ct(o),o);return`<b style="left:${i.x/ue*100}%;top:${(i.y-90)/Ce*100}%;background:${o.shirt}"></b>`}).join("");L("mmDots").innerHTML=n+s}function I1(e){const t=M1();Vd=t?"c":"f",document.body.classList.toggle("tabs-compact",t),L("tabs").innerHTML=Ff.map(n=>{const s=t?pS[n.id]??n.name:n.name;return`<button class="tab ${e.currentRoom===n.id?"on":""}" data-room="${n.id}" style="--c:${n.color}" aria-label="${n.name}">${t?gS:""}${s}</button>`}).join(""),requestAnimationFrame(()=>{_S(),sh()})}function sh(){const e=document.getElementById("tabs");if(!e)return;const t=e.scrollWidth-e.clientWidth;e.classList.toggle("fadeL",t>2&&e.scrollLeft>2),e.classList.toggle("fadeR",t>2&&e.scrollLeft<t-2)}function _S(){const e=document.getElementById("tabs"),t=e?.querySelector(".tab.on");if(!e||!t||e.scrollWidth<=e.clientWidth+2)return;const n=t.offsetLeft-e.offsetLeft,s=n+t.offsetWidth;n<e.scrollLeft+24?e.scrollLeft=Math.max(0,n-24):s>e.scrollLeft+e.clientWidth-24&&(e.scrollLeft=s-e.clientWidth+24)}function Eo(e,t,n,s,o){Vl(e,(t-s/2)/ue*100+"%",(n-o)/Ce*100+"%"),e.style.width=s/ue*100+"%",e.style.height=o/Ce*100+"%"}function oh(e,t){let n=e.w*t,s=Xe(e)*t;if((e.kind==="kennel"||e.kind==="cat-tower")&&document.body.classList.contains("phone")){const o=Math.max(.2,yt()||1),i=44*ue/(Math.max(1,G)*o),a=44/o;n<i&&(n=i),s<a&&(s=a)}return{w:n,h:s}}function $S(e,t,n){const s=n1(t),o=t+":"+n+":"+(s?1:0);e.dataset.sig!==o&&(e.dataset.sig=o,e.innerHTML=`<div class="inner">${Xr(n,s)}</div>`,s||xS(t))}const Dc=new Set;let Hc=0;const Wc=new Set;function xS(e){!v||Re===ee||Dc.has(e)||mE(e)||(Dc.add(e),Wc.add(e),Hc||(Hc=window.setTimeout(()=>{Hc=0;const t=[...Wc];Wc.clear(),v&&me&&v.getArt(me,t),t.forEach(n=>setTimeout(()=>Dc.delete(n),8e3))},60)))}function O1(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n?.items??[])s.art&&t.add(s.art);return t}const MS=[...["Heart","Star","Flower","Kitty","Rainbow","Sparkle"].map((e,t)=>({name:e,svg:Bo[t]})),...["dog","bunny","fish","flowers","balloon","cake"].filter(e=>de[e]).map(e=>({name:de[e].name,svg:`<svg viewBox="${de[e].vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${de[e].svg}</svg>`}))];function B1(){if(R!=="house"){F("The Art Studio is at home. Pop inside to paint!");return}if(!ht()){F("Paint at home, or in a friend's open house!");return}$E({stamps:MS,sfx:C,onSave:(e,t)=>TS(e,t)})}const Op=new Set;function LS(e){const t=L("artGrip"),n=Ne?e.rooms[e.currentRoom].items.find(l=>l.id===Ne):void 0,s=n&&X.querySelector(`.item[data-id="${n.id}"]`);if(Se.isPlay()||!n||n.kind!=="picture"||!n.art||!s||!ht()){t.classList.add("hidden");return}const o=s.getBoundingClientRect(),i=Math.min(o.width,o.height)>=120?14:0,a=Qe(o.right-i,o.bottom-i),r=Y.getBoundingClientRect().width/Math.max(1,G)||1;t.style.left=a.x/ue*100+"%",t.style.top=a.y/Ce*100+"%",t.style.width=t.style.height=64/r+"px",(t.classList.contains("hidden")||t.dataset.for!==n.id)&&(t.dataset.for=n.id,Op.has(n.id)||(Op.add(n.id),t.classList.remove("pulse"),t.offsetWidth,t.classList.add("pulse"))),t.classList.remove("hidden")}L("artGrip").addEventListener("pointerdown",e=>{if(e.preventDefault(),e.stopPropagation(),!ht()||!Ne)return;const t=S.get().currentRoom,n=Ne,s=S.get().rooms[t].items.find(k=>k.id===n),o=X.querySelector(`.item[data-id="${n}"]`);if(!s||!o)return;const i=o.getBoundingClientRect(),a=i.left+i.width/2,r=i.top+i.height/2,l=i.width/2,c=i.height/2,d=Math.max(1,Math.hypot(l,c)),f=l/d,u=c/d,p=(k,b)=>(k-a)*f+(b-r)*u,y=Math.max(20,p(e.clientX,e.clientY)),m=Fn(s.size);L("artGrip").classList.remove("pulse"),L("artGrip").classList.add("active"),ne.classList.add("hidden"),Jn(e,{edgeScroll:!1,onMove(k){const b=m*Math.max(0,p(k.clientX,k.clientY))/y;let g=Un[0];for(const _ of Un)Math.abs(_-b)<Math.abs(g-b)&&(g=_);const w=S.get().rooms[t].items.find(_=>_.id===n);w&&Fn(w.size)!==g&&(S.dispatch({type:"item/size",room:t,id:n,size:g}),C.click())},onUp(){L("artGrip").classList.remove("active"),H1(t,n),Pt(S.get())}})});L("artFab").addEventListener("click",()=>{C.click(),B1()});function ES(){L("artFab").classList.toggle("hidden",R!=="house"||!ht())}const Sr=new Map;function D1(e){const t=Y.getBoundingClientRect(),n=L("nudgeL").getBoundingClientRect(),s=L("nudgeR").getBoundingClientRect(),o=(c,d)=>c.width>0&&!d.classList.contains("off")&&getComputedStyle(d).visibility!=="hidden"&&getComputedStyle(d).display!=="none"&&+getComputedStyle(d).opacity>.05,i=o(n,L("nudgeL"))?n.right+10:t.left+6,a=o(s,L("nudgeR"))?s.left-10:t.right-6;let r=Qe(i,0).x+e,l=Qe(a,0).x-e;if(r=Math.max(e,r),l=Math.min(ue-e,l),l<r){const c=(r+l)/2;r=l=Math.max(e,Math.min(ue-e,c))}return{lo:r,hi:l}}function SS(){const e=de.picture,t=e.w/2,n=Xe(e),s=Math.min(Ia,200+n/2),o=s-n;let{lo:i,hi:a}=D1(t);const r=[];for(const f of document.querySelectorAll("#layer > :not(.char), #scenery > *")){const u=f.getBoundingClientRect();if(!u.width)continue;const p=Qe(u.left,u.top),y=Qe(u.right,u.bottom),m=f.classList.contains("yardDoor")?50:1;r.push({l:p.x,r:y.x,t:p.y,b:y.y,k:m})}const l=ie+G/2;i=Math.min(Math.max(i,l-G*.3),a),a=Math.max(Math.min(a,l+G*.3),i);let c=Math.max(i,Math.min(a,l)),d=1/0;for(let f=i;f<=a+.1;f+=Math.max(4,(a-i)/60)){let u=0;for(const y of r)u+=y.k*Math.max(0,Math.min(f+t+12,y.r)-Math.max(f-t-12,y.l))*Math.max(0,Math.min(s+12,y.b)-Math.max(o-12,y.t));const p=u*10+Math.abs(f-l);p<d&&(d=p,c=f)}return c}function H1(e,t){const n=S.get().rooms[e].items.find(u=>u.id===t);if(!n||n.kind!=="picture"||!n.art)return;const s=de.picture,o=Ge(n),i=s.w*o/2,a=Xe(s)*o,r=Y.getBoundingClientRect(),l=Qe(r.left,0).x,c=Qe(r.right,0).x;let d=n.x,f=Math.min(Ia,Math.max(a+16,n.y));if(d+i>l&&d-i<c){const{lo:u,hi:p}=D1(i);d=Math.max(u,Math.min(p,d));const y=X.querySelector(".yardDoor"),m=y?.getBoundingClientRect();if(m&&m.width){const k=Qe(m.left,m.top),b=Qe(m.right,m.bottom);if(d+i>k.x-8&&d-i<b.x+8&&f>k.y&&f-a<b.y){const g=k.x-8-i,w=b.x+8+i,_=$=>$>=u-.5&&$<=p+.5,P=[g,w].filter(_).sort(($,x)=>Math.abs($-d)-Math.abs(x-d));P.length&&(d=P[0])}}}(Math.abs(d-n.x)>.5||Math.abs(f-n.y)>.5)&&S.dispatch({type:"item/move",room:e,id:t,x:d,y:f})}function TS(e,t){const n="a"+Date.now().toString(36)+Math.random().toString(36).slice(2,8),s=S.get(),o=s.currentRoom;e1(n,e);const i=SS();if(v&&Re!==ee&&me){Sr.set(n,{houseId:me,room:o,frame:t,x:i}),v.saveArt(me,n,e);return}gE(n,e,O1(s)),W1(o,n,t,i)}function W1(e,t,n,s){const o=de.picture,i={id:Jr("picture"),kind:"picture",x:s,y:Math.min(Ia,200+Xe(o)/2),flip:!1,z:0,scale:1,art:t,...n?{frame:n}:{}};S.dispatch({type:"item/add",room:e,item:i}),Ne=i.id,Pt(S.get());const a=X.querySelector(`.item[data-id="${i.id}"]`);et(a),Da(a),C.sparkle()}function Pt(e){const t=e.rooms[e.currentRoom],n=new Set;for(const s of t.items){const o=de[s.kind];if(!o)continue;n.add(s.id);let i=X.querySelector(`.item[data-id="${s.id}"]`);i||(i=document.createElement("div"),i.className="item",i.dataset.id=s.id,i.innerHTML=`<div class="inner">${Ut(o,!0)}</div>`,X.appendChild(i),i.addEventListener("pointerdown",l=>qS(i,l))),i.dataset.kind=s.kind,s.art&&$S(i,s.art,s.frame??0),i.classList.toggle("is-light",eE(s.kind,!!o.light));const a=oh(o,Ge(s));Eo(i,s.x,Lo(o,s.y),a.w,a.h);const r=1e3+s.z;if(i.style.zIndex=String(r),i.style.setProperty("--iz",String(r)),s.art){const l=X.querySelector(".yardDoor");l&&Qd(i.getBoundingClientRect(),l.getBoundingClientRect())&&(i.style.zIndex=String(Math.max(r,(parseInt(l.style.zIndex||"2",10)||2)+1)))}i.classList.toggle("flipped",s.flip),i.classList.toggle("sel",Ne===s.id)}X.querySelectorAll(".item").forEach(s=>{n.has(s.dataset.id)||s.remove()}),V1(e),CS(),Fl(),N1(e),nl(e),ES(),vs()}function Fl(){const e=S.get(),t=kS(),n=new Set;t.forEach((s,o)=>{const i=e.rooms[e.currentRoom]?.items.find(u=>u.id===o),a=i&&de[i.kind],r=i&&wS(i.kind);if(!i||!a||!r)return;n.add(o);let l=X.querySelector(`.seatFront[data-id="${o}"]`);l||(l=document.createElement("div"),l.className="seatFront",l.dataset.id=o,X.appendChild(l));const c=X.querySelector(`.item[data-id="${o}"] .inner`),d=l.querySelector(".inner");(!d||c&&d.innerHTML!==c.innerHTML)&&(l.innerHTML=`<div class="inner">${c?c.innerHTML:Ut(a,!0)}</div>`),l.className="seatFront "+r+(i.flip?" flipped":"");const f=oh(a,Ge(i));Eo(l,i.x,Lo(a,i.y),f.w,f.h),l.style.zIndex=String(1e3+i.z+3)}),X.querySelectorAll(".seatFront").forEach(s=>{n.has(s.dataset.id||"")||s.remove()})}let _o=!1,Bp=0;function ih(e){performance.now()-Bp<80||(Bp=performance.now(),$P(e))}function PS(e,t){const n=Y.querySelector(".yardDoor");if(!n)return null;const s=o=>{if(!o)return!1;const i=o.getBoundingClientRect();return i.width>2&&i.height>2&&e>=i.left&&e<=i.right&&t>=i.top&&t<=i.bottom};return s(n.querySelector(".yardHintLabel"))||s(n.querySelector(".doorArt"))||s(n)?n:null}function AS(e){e.addEventListener("pointerdown",t=>{if(t.button!==0)return;t.stopPropagation();const n=e.dataset.yardGo==="backyard"?"backyard":"living",s=t.clientX,o=t.clientY,i=t.pointerId;_o=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),_o=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),ih(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)})}Y.addEventListener("pointerdown",e=>{if(e.button!==0)return;const t=PS(e.clientX,e.clientY);if(!t||e.target instanceof Node&&t.contains(e.target)||e.target instanceof Element&&e.target.closest("#artGrip, #toolbar")||e.target instanceof Element&&e.target.closest('.item[data-kind="picture"][data-sig]'))return;e.stopPropagation(),e.preventDefault();const n=t.dataset.yardGo==="backyard"?"backyard":"living",s=e.clientX,o=e.clientY,i=e.pointerId;_o=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),_o=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),ih(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)},!0);function Qd(e,t){return e.width>2&&t.width>2&&e.left<t.right-1&&e.right>t.left+1&&e.top<t.bottom-1&&e.bottom>t.top+1}function Dp(e){const t=e.getBoundingClientRect();let n=0;X.querySelectorAll(".item").forEach(s=>{if(s.classList.contains("is-light"))return;const o=de[s.dataset.kind||""];if(!o||o.wall||!Qd(s.getBoundingClientRect(),t))return;const i=parseInt(s.style.zIndex||"0",10)||0;i>n&&(n=i)}),e.style.zIndex=n?String(n+2):"2",X.querySelectorAll(".item[data-sig]").forEach(s=>{Qd(s.getBoundingClientRect(),t)&&(s.style.zIndex=String(Math.max(parseInt(s.style.zIndex||"0",10)||0,parseInt(e.style.zIndex,10)+1)))})}function V1(e){const t=e.rooms[e.currentRoom];X7(L("scenery"),e.currentRoom,t.items),L("scenery").querySelectorAll(".yardDoor").forEach(o=>o.remove());const n=e.currentRoom==="living"?"backyard":e.currentRoom==="backyard"?"living":"",s=X.querySelector(".yardDoor");if(!n)X.querySelectorAll(".yardDoor").forEach(o=>o.remove());else if(!s||s.dataset.yardGo!==n){X.querySelectorAll(".yardDoor").forEach(i=>i.remove()),X.insertAdjacentHTML("beforeend",k5(n==="backyard"?"living":"yard"));const o=X.querySelector(".yardDoor");o&&AS(o)}Y.classList.toggle("room-yard",e.currentRoom==="backyard"),dl(),_o||hs()}const Zt=new Map;function RS(e){const t=Oa(e),n=Bs*t,s=$n*t,o=Wl(e,Bl(Ct(e)?.pose)),i=e.look2?.85:1;return["left","right"].map(a=>{const r=e.held[a],l=r&&de[r.kind];if(!r||!l)return"";const c=Ge(r),d=Math.min(.7,120*t/Math.max(l.w,Xe(l))/c)*i,f=l.w*c*d,u=Xe(l)*c*d,p=o[a].x/100*n,y=o[a].y/160*s,m=Zo(r.kind)&&e.size!=="little"?.7:.62;return`<div class="held ${r.flip?"flipped":""}" data-hand="${a}" style="left:${(p-f/2)/n*100}%;top:${(y-u*m)/s*100}%;width:${f/n*100}%;height:${u/s*100}%"><div class="inner">${Ut(l)}</div></div>`}).join("")}function CS(){let e=X.querySelector("#skyPuddles");e||(e=document.createElement("div"),e.id="skyPuddles",e.className="skyPuddles"),X.appendChild(e);const t=[...X.querySelectorAll(".item.is-light")];for(;e.children.length>t.length;)e.lastElementChild.remove();for(;e.children.length<t.length;)e.appendChild(document.createElement("i"));t.forEach((n,s)=>{const o=e.children[s],i=parseFloat(n.style.left),a=parseFloat(n.style.top),r=parseFloat(n.style.width),l=parseFloat(n.style.height),c=n.dataset.kind==="window"||n.dataset.kind==="tv";o.style.left=i-.6*r+"%",o.style.top=a-(c?.38:.5)*l+"%",o.style.width=2.2*r+"%",o.style.height=2*l+"%",o.style.zIndex=String(parseInt(n.style.zIndex||"1000",10))})}let Zl=()=>{};function ea(e){const t=e.baby;return t&&t.spot==="arms"&&t.holder?t.holder:""}const cs=new Map;function U1(e){for(const[t,n]of cs)t.indexOf(e+":")===0&&(n.remove(),cs.delete(t))}function z1(e,t){const n=e+":"+t,s=cs.get(n);s&&(s.remove(),cs.delete(n))}function Q1(e,t,n,s,o){const i=e+":"+t;for(const[r,l]of cs)r.indexOf(e+":")===0&&r!==i&&(l.remove(),cs.delete(r));let a=cs.get(i);if((!a||!a.isConnected)&&(a=document.createElement("div"),a.className="cradle-front",a.dataset.for=t,a.innerHTML='<div class="inner"></div>',X.appendChild(a),cs.set(i,a)),a.dataset.arm!==s){const r=a.querySelector(".inner");r&&(r.innerHTML=s),a.dataset.arm=s}a.style.left=n.style.left,a.style.top=n.style.top,a.style.width=n.style.width,a.style.height=n.style.height,a.style.zIndex=String(5e3+Math.round(o)+4),a.classList.toggle("flipped",n.classList.contains("flipped")),a.classList.toggle("pose-sit",n.classList.contains("pose-sit")),a.classList.toggle("pose-lie",n.classList.contains("pose-lie")),a.classList.toggle("pose-lie-r",n.classList.contains("pose-lie-r"))}function on(e){const t=e.characters.filter(n=>n.room===e.currentRoom);for(const[n,s]of Zt)t.some(o=>o.id===n)||(s.remove(),Zt.delete(n));for(const n of t){let s=Zt.get(n.id);s||(s=document.createElement("div"),s.className="char",s.dataset.cid=n.id,s.innerHTML='<div class="inner"></div><div class="hands"></div>',X.appendChild(s),Zt.set(n.id,s),ZS(s));const o=Ct(n),i=o?.pose??null,a=ea(e)===n.id,r=Wy(n)+(i||"")+(a?"h":"");s.dataset.look!==r&&(s.querySelector(".inner").innerHTML=Mt(n,i,a),s.dataset.look=r),s.classList.toggle("holding",a);const l=RS(n);s.dataset.held!==l&&(s.querySelector(".hands").innerHTML=l,s.dataset.held=l);const c=Oa(n),d=Rt(e.currentRoom,o,n);if(Eo(s,d.x,d.y,Bs*c,$n*c),s.style.zIndex=String(o?1e3+(e.rooms[e.currentRoom].items.find(u=>u.id===o.item)?.z??0)+1+o.n:5e3+Math.round(n.y)),s.classList.toggle("flipped",n.flip),s.classList.toggle("pose-sit",i==="sit"),s.classList.toggle("pose-lie",i==="lie"),s.classList.toggle("pose-lie-r",i==="lie"&&!!e.rooms[e.currentRoom].items.find(u=>u.id===o?.item)?.flip),s.classList.toggle("active",n.id===De),Aa(s,n,n.id===De),s.classList.toggle("pose-swing",Wt?.id===n.id),a){const u=ym(n,i);u?Q1("doll",n.id,s,u,d.y):z1("doll",n.id)}const f=Wl(n);s.style.setProperty("--hx-l",f.left.x+"%"),s.style.setProperty("--hx-r",f.right.x+"%")}(ea(e)===""||!t.some(n=>n.id===ea(e)))&&U1("doll"),vs(),nl(e),Zl(),Wa(),Ha()}function un(){const e=Y.getBoundingClientRect(),t=e.width/Math.max(1,G),n=6,o=document.body.classList.contains("phone")?1/Math.max(.2,t):1,i=ne.offsetWidth,a=ne.offsetHeight,r=parseFloat(ne.style.left)/100*ue,l=parseFloat(ne.style.top)/100*Ce,c=ne.classList.contains("below"),d=r,f=c?l+a/2:l-a/2,u=o*i/2,p=o*a/2,y=_=>e.left+(n+_-ie)*t,m=_=>e.top+(n+_)*t,k=y(d-u),b=y(d+u),g=m(f-p),w=m(f+p);return{left:k,right:b,top:g,bottom:w,width:b-k,height:w-g}}function IS(){const e=Y.getBoundingClientRect(),t=4;let n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t,o=Math.max(e.top,0)+t,i=Math.min(e.bottom,window.innerHeight)-t;for(const a of["nudgeL","nudgeR"]){const r=L(a);if(!r||r.classList.contains("off")||r.offsetParent===null)continue;const l=r.getBoundingClientRect();l.width<2||l.height<2||(a==="nudgeL"?n=Math.max(n,l.right+4):s=Math.min(s,l.left-4))}return s-n<48&&(n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t),{left:n,right:s,top:o,bottom:i}}function Tn(e,t){ne.style.left=e/ue*100+"%",ne.style.top=t/Ce*100+"%"}function N1(e){LS(e);const t=Ne&&e.rooms[e.currentRoom].items.find(m=>m.id===Ne);if(Se.isPlay()||!t||!de[t.kind]){ne.classList.add("hidden"),ne.classList.remove("below"),ne.style.maxWidth="",L("artFab").classList.remove("tucked");return}L("artFab").classList.add("tucked");const n=de[t.kind],s=Lo(n,t.y),o=s-Xe(n)*Ge(t),i=t.kind==="picture"&&t.art?12+64/(Y.getBoundingClientRect().width/Math.max(1,G)||1):12;ne.classList.remove("hidden"),ne.style.maxWidth="",ne.classList.remove("below"),Tn(t.x,o-i);const a=IS();un().top<a.top&&(ne.classList.add("below"),Tn(t.x,s+i));let r=un();const l=a.right-a.left;if(r.width>l-2&&l>60){const m=ne.offsetWidth*((l-8)/Math.max(1,r.width));ne.style.maxWidth=Math.max(76,m)+"px",!ne.classList.contains("below")&&un().top<a.top&&(ne.classList.add("below"),Tn(t.x,s+i)),r=un()}let c=0,d=0;if(r.left<a.left&&(c=a.left-r.left),r.right+c>a.right&&(c=a.right-r.right),r.width>a.right-a.left&&(c=(a.left+a.right)/2-(r.left+r.right)/2),r.top<a.top&&(d=a.top-r.top),r.bottom+d>a.bottom&&(d=a.bottom-r.bottom),Math.abs(c)>=.5||Math.abs(d)>=.5){const m=Y.getBoundingClientRect().width/Math.max(1,G)||1,k=parseFloat(ne.style.left)/100*ue+c/m,b=parseFloat(ne.style.top)/100*Ce+d/m;Tn(k,b)}if(t.kind==="picture"&&t.art){const m=X.querySelector(`.item[data-id="${t.id}"]`),k=L("artGrip"),b=(x,H)=>Math.max(0,Math.min(x.right,H.right)-Math.max(x.left,H.left))*Math.max(0,Math.min(x.bottom,H.bottom)-Math.max(x.top,H.top)),g=()=>k.classList.contains("hidden")?0:b(k.getBoundingClientRect(),ne.getBoundingClientRect()),w=()=>m?b(m.getBoundingClientRect(),ne.getBoundingClientRect())+8*g():0,_=w();if(_>0){const x={l:ne.style.left,t:ne.style.top,below:ne.classList.contains("below")};ne.classList.toggle("below",!x.below),Tn(t.x,x.below?o-i:s+i);const H=un(),V=Y.getBoundingClientRect().width/Math.max(1,G)||1;let Q=0,q=0;H.left<a.left&&(Q=a.left-H.left),H.right+Q>a.right&&(Q=a.right-H.right),H.top<a.top&&(q=a.top-H.top),H.bottom+q>a.bottom&&(q=a.bottom-H.bottom),(Q||q)&&Tn(parseFloat(ne.style.left)/100*ue+Q/V,parseFloat(ne.style.top)/100*Ce+q/V),w()>=_&&(ne.style.left=x.l,ne.style.top=x.t,ne.classList.toggle("below",x.below))}if(g()>0){const x=k.getBoundingClientRect(),H=un(),V=Y.getBoundingClientRect().width/Math.max(1,G)||1,Q=x.left-6-H.right,q=x.right+6-H.left,se=H.left+Q>=a.left,Me=H.right+q<=a.right,Ke=se&&(!Me||-Q<=q)?Q:Me?q:0;Ke&&Tn(parseFloat(ne.style.left)/100*ue+Ke/V,parseFloat(ne.style.top)/100*Ce)}const P=()=>[...X.querySelectorAll(".char")].map(x=>{const H=x.getBoundingClientRect();return new DOMRect(H.left,H.top,H.width,H.height*.42)}),$=()=>{const x=un(),H=new DOMRect(x.left,x.top,x.width,x.height);return P().reduce((V,Q)=>V+b(Q,H),0)};if($()>0){const x=Y.getBoundingClientRect().width/Math.max(1,G)||1,H=()=>{const U=un();return new DOMRect(U.left,U.top,U.width,U.height)},V=()=>k.classList.contains("hidden")?0:b(k.getBoundingClientRect(),H()),Q=()=>m?b(m.getBoundingClientRect(),H()):0,q=()=>(V()>0?1e9:0)+$()*20+Q(),se=()=>({l:ne.style.left,t:ne.style.top,below:ne.classList.contains("below")}),Me=U=>{ne.style.left=U.l,ne.style.top=U.t,ne.classList.toggle("below",U.below)},Ke=()=>{const U=un();let N=0,Z=0;U.left<a.left&&(N=a.left-U.left),U.right+N>a.right&&(N=a.right-U.right),U.top<a.top&&(Z=a.top-U.top),U.bottom+Z>a.bottom&&(Z=a.bottom-U.bottom),(N||Z)&&Tn(parseFloat(ne.style.left)/100*ue+N/x,parseFloat(ne.style.top)/100*Ce+Z/x)};let Ie=se(),I=q();const B=(U,N)=>{ne.classList.toggle("below",U),Tn(t.x+N/x,U?s+i:o-i),Ke();const Z=q();Z<I-.5&&(I=Z,Ie=se())},te=un();for(const U of[!Ie.below,Ie.below]){B(U,0);const N=Y.getBoundingClientRect().left+(6+t.x-ie)*x,Z=te.width/2;for(const pe of P())B(U,pe.left-8-Z-N),B(U,pe.right+8+Z-N)}Me(Ie)}}const f=Fn(t.size),u=Un.indexOf(f),p=ne.querySelector('[data-a="smaller"]'),y=ne.querySelector('[data-a="bigger"]');p&&(p.disabled=u<=0),y&&(y.disabled=u>=Un.length-1)}function q1(e){const t=L("soundIco");t&&(t.innerHTML=e.soundOn?Nt.soundOn:Nt.soundOff),L("btnSound").setAttribute("aria-label",e.soundOn?"Sound on":"Sound off"),d4(e.soundOn)}function $o(){const e=S.get();X.innerHTML="",Zt.clear(),I1(e),C1(e),Pt(e),on(e),q1(e);const t=e.characters.find(o=>o.room===e.currentRoom),n=v&&ye(),s=n&&n.where==="house"?n.x:t?.x;Nl(),Je(ga[e.currentRoom]??ti(s!==void 0?H2(e,s,s-G/2):ii)),ga[e.currentRoom]!==void 0&&Kf()&&R==="house"&&!document.body.classList.contains("phone")&&Ph(),bt(),xn(),document.body.classList.contains("phone")&&R==="house"&&requestAnimationFrame(()=>$1())}const Hp=200,OS=2,sl=[];let Nd=0,Tr=!1,Vc=0;const Hn=new Map,BS=60;function DS(e,t){for(Hn.delete(e),Hn.set(e,t);Hn.size>BS;)Hn.delete(Hn.keys().next().value)}function HS(e){const t=Hn.get(e);return t&&(Hn.delete(e),Hn.set(e,t)),t}function qd(e){const t=document.getElementById("shelf");if(!t)return!1;const n=t.getBoundingClientRect();if(n.width<2||n.height<2)return!1;const s=e.getBoundingClientRect();return s.right>n.left-Hp&&s.left<n.right+Hp&&s.bottom>n.top-8&&s.top<n.bottom+8}const WS=3,ol=new Map;function jd(e,t){const n=(ol.get(t)||0)+1;if(ol.set(t,n),delete e.dataset.shelfq,n>=WS){delete e.dataset.artq;return}setTimeout(ah,300*n)}function Wo(){Nd--,!Tr&&j1()}function Wp(e,t){const n=document.createElement("div");n.innerHTML=Ut(t);const s=n.querySelector("img.artimg");if(!s){delete e.dataset.artq,Wo();return}const o=ol.get(t.kind)||0;if(o>0){const l=s.getAttribute("src")||"";s.setAttribute("src",l+(l.indexOf("?")>=0?"&":"?")+"retry="+o)}let i=!1;const a=l=>{if(!i){if(i=!0,l){const c=Array.prototype.slice.call(n.childNodes);if(DS(t.kind,c),ol.delete(t.kind),e.isConnected&&e.dataset.artq==="1"){delete e.dataset.artq,e.innerHTML="";for(let d=0;d<c.length;d++)e.appendChild(c[d])}else{const d=document.querySelector(`#shelf button.thing[data-artq="1"][data-kind="${CSS.escape(t.kind)}"]`);if(d){delete d.dataset.artq,d.innerHTML="";for(let f=0;f<c.length;f++)d.appendChild(c[f])}}}else e.isConnected&&e.dataset.artq==="1"&&jd(e,t.kind);Wo()}},r=()=>{typeof s.decode=="function"?s.decode().then(()=>a(!0),()=>a(!0)):a(!0)};s.onload=r,s.onerror=()=>a(!1),s.complete&&s.naturalWidth>0&&r()}function j1(){if(!Tr){for(Tr=!0;Nd<OS&&sl.length;){const e=sl.shift();if(!e||!e.isConnected||e.dataset.artq!=="1")continue;if(!qd(e)){delete e.dataset.shelfq;continue}const t=e.dataset.kind||"",n=de[t];if(!n){delete e.dataset.artq;continue}if(Nd++,Gn(t)){Wp(e,n);continue}Cs(()=>h(()=>Promise.resolve().then(()=>Il),void 0)).then(s=>s.loadArtKinds([t])).then(()=>{if(!e.isConnected||e.dataset.artq!=="1"){Wo();return}if(!Gn(t)){jd(e,t),Wo();return}if(!qd(e)){delete e.dataset.shelfq,Wo();return}Wp(e,n)},()=>{e.isConnected&&e.dataset.artq==="1"&&jd(e,t),Wo()})}Tr=!1}}function VS(){const e=document.getElementById("shelf");if(!e||!Zn())return;const t=e.querySelectorAll('button.thing[data-artq="1"]');for(let n=0;n<t.length;n++){const s=t[n];s.dataset.shelfq!=="1"&&qd(s)&&(s.dataset.shelfq="1",sl.push(s))}j1()}function ah(){Vc||(Vc=requestAnimationFrame(()=>{Vc=0,VS()}))}function US(){const e=document.getElementById("shelf");!e||e.dataset.artscroll==="1"||(e.dataset.artscroll="1",e.addEventListener("scroll",ah,{passive:!0}))}function F1(){const e=document.getElementById("shelf");if(!e||!Zn())return;const t=e.querySelectorAll("button.thing[data-kind]");for(let n=0;n<t.length;n++){const s=t[n],o=s.dataset.kind||"";s.querySelector("img.artimg")||!(Th(o)||Gn(o))||(s.dataset.artq="1")}ah()}function Z1(){if(Bt==="__people"){zt();return}F1(),Y1()}const G1=()=>de["egg:chloe-starlamp"]?Ut(de["egg:chloe-starlamp"]):"🎁";function Y1(){document.querySelectorAll("#cats .cat[data-cat]").forEach(e=>{if(e.querySelector("img.artimg"))return;const t=e.dataset.cat,n=Ss.find(i=>i.id===t);if(t==="secrets"){e.innerHTML=G1();return}const s=n&&n.kind!=="people"?de[n.icon]:void 0;if(!s||!Zn()||!Gn(s.kind))return;const o=n.kind==="pack"?e.querySelector(".packicon"):e;o&&(o.innerHTML=Ut(s))})}function zS(e){const t=$0();if(!v)return;const n=ye();if(!n||n.where!=="house"||!n.seat)return;let s="";if(e.type==="item/flip"||e.type==="item/delete")s=e.id;else if(e.type==="item/move"&&e.stand)s=e.id;else if(e.type==="char/hold")s=e.itemId;else return;if(!s||n.seat.id!==s||e.room!==n.room)return;const o=t&&t.id===s?t:null,i=o?_n(o.kind)*(o.scale||1):_n("bed"),a=co(o?o.x:n.x,i,n.x);kn.delete("p:"+v.pid);const{seat:r,...l}=n;nt({...l,x:a.x,y:a.y})}S.subscribe((e,t)=>{switch(zS(t),t.type){case"room/switch":{const n=Y.classList.contains("room-yard");v&&Re!==ee&&XS(t.room),$o(),zt(),(t.room==="backyard"||n||Se.isPlay()&&Math.min(window.innerWidth,window.innerHeight)<500)&&Ds(),D2(t.room);break}case"item/add":Pt(e),dS(),kP();break;case"game/reset":$o();break;case"room/wallpaper":case"room/floor":case"room/pattern":case"room/wallTile":case"room/floorTile":C1(e);break;case"char/update":case"char/move":t.type==="char/move"&&Wt&&!Bi&&t.id===Wt.id&&(Wt=null),on(e),Fl(),dl(),R==="ranch"?xs():R==="park"&&xo();break;case"char/add":case"char/delete":case"char/hold":case"char/release":Pt(e),on(e),bt(),Bt==="__people"&&zt();break;case"item/move":case"item/flip":case"item/delete":case"item/size":Pt(e),on(e),bt();break;case"baby/meet":case"baby/name":case"baby/care":case"baby/hold":case"baby/place":case"baby/ease":on(e),bt();break;case"settings/sound":q1(e);break;default:Pt(e)}});function et(e){if(!e)return;const t=e.querySelector(":scope > .inner")??e;t.classList.remove("bounce"),t.offsetWidth,t.classList.add("bounce")}function rh(e,t,n=7){const s=L("fx"),o=["#ffd166","#ff8fab","#8ecae6","#80ed99","#c9a0dc"];for(let i=0;i<n;i++){const a=document.createElement("div");a.className="spark";const r=Math.PI*2*i/n+Math.random()*.5,l=40+Math.random()*30;a.style.left=e+"px",a.style.top=t+"px",a.style.background=o[i%o.length],a.style.setProperty("--dx",Math.cos(r)*l+"px"),a.style.setProperty("--dy",Math.sin(r)*l+"px"),s.appendChild(a),setTimeout(()=>a.remove(),650)}}const Da=e=>{const t=e?.getBoundingClientRect();t&&rh(t.left+t.width/2,t.top+t.height/2)};function lh(e,t){rh(e,t,10),C.pop()}function il(e){Zt.forEach((t,n)=>{t.classList.toggle("hold-target",!!e&&e.c.id===n),t.dataset.hand=e&&e.c.id===n?e.hand:""})}function K1(e,t){S.dispatch({type:"char/hold",id:e.c.id,hand:e.hand,room:e.c.room,itemId:t}),Ne=null,Pt(S.get());const n=Zt.get(e.c.id);et(n),Da(n?.querySelector(`.held[data-hand="${e.hand}"]`)),C.sparkle()}const vn=new Map;let Gt=!1,al=0;const ch=()=>[...vn.values()].reduce((e,t)=>e+t,0)/vn.size;Y.addEventListener("pointerdown",e=>{e.pointerType==="touch"&&(vn.set(e.pointerId,e.clientX),vn.size>=2&&(Gt=!0,al=ch(),Nl(),ne.classList.add("hidden")))},!0);window.addEventListener("pointermove",e=>{if(vn.has(e.pointerId)&&(vn.set(e.pointerId,e.clientX),Gt&&vn.size>=2)){di();const t=ch();Je(ie-(t-al)/yt()),al=t}},!0);const X1=e=>{vn.delete(e.pointerId),vn.size<2&&Gt&&(vn.size===0?Gt=!1:al=ch())};window.addEventListener("pointerup",X1,!0);window.addEventListener("pointercancel",X1,!0);const Oo=80;function QS(e,t){const n=Y.getBoundingClientRect();return t<n.top-40||t>n.bottom+10?0:e<n.left+Oo?-Math.min(1,(n.left+Oo-e)/Oo)*16:e>n.right-Oo?Math.min(1,(e-(n.right-Oo))/Oo)*16:0}function Jn(e,t){let n=e,s=0;const o=()=>{const r=Gt?0:QS(n.clientX,n.clientY);if(r){const l=ie;Je(ie+r),ie!==l&&t.onMove(n)}s=requestAnimationFrame(o)};t.edgeScroll!==!1&&(s=requestAnimationFrame(o));const i=r=>{r.pointerId===e.pointerId&&(r.preventDefault(),n=r,Gt||t.onMove(r))},a=r=>{r.pointerId===e.pointerId&&(cancelAnimationFrame(s),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",a),t.onUp(r))};window.addEventListener("pointermove",i,{passive:!1}),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a)}function NS(e){return new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,pointerId:e.pointerId,pointerType:e.pointerType,button:e.button,buttons:e.buttons,isPrimary:e.isPrimary})}function qS(e,t){const n=t.target,s=n&&n.closest?n.closest("img.artimg"):null,o=S.get(),i=!!o.rooms[o.currentRoom]?.items.find(a=>a.id===e.dataset.id)?.art;if(s&&!i&&!Bf(s,t.clientX,t.clientY)){const a=RM(t.clientX,t.clientY),r=a?.closest(".item"),l=a?.closest(".char");r&&r!==e?(t.stopPropagation(),Fd(r,t)):l&&(t.stopPropagation(),l.dispatchEvent(NS(t)));return}Fd(e,t)}function jS(e,t){if(t.preventDefault(),t.stopPropagation(),Gt)return;const n=e.dataset.id,s=t.clientX,o=t.clientY;Jn(t,{edgeScroll:!1,onMove(){},onUp(i){Math.hypot(i.clientX-s,i.clientY-o)>6||BT(e,n)}})}function Fd(e,t,n=!1){if(t.preventDefault(),t.stopPropagation(),Gt)return;if(Se.isPlay()){jS(e,t);return}if(!ht()){Yn(e);return}const s=S.get(),o=s.currentRoom,i=e.dataset.id,a=s.rooms[o].items.find(u=>u.id===i);if(!a)return;const r=de[a.kind],l=Qe(t.clientX,t.clientY),c={x:a.x-l.x,y:a.y-l.y};let d=n,f=null;Ne=i,S.dispatch({type:"item/front",room:o,id:i}),e.classList.add("lifted"),C.pick(),Jn(t,{onMove(u){const p=Qe(u.clientX,u.clientY);Math.hypot(p.x-l.x,p.y-l.y)>6&&(d=!0),d&&(ne.classList.add("hidden"),Lr.classList.add("show")),Lr.classList.toggle("hot",Ip(u.clientX,u.clientY));const y=r.w*Ge(a)/2;S.dispatch({type:"item/move",room:o,id:i,x:Math.max(y*.6,Math.min(ue-y*.6,p.x+c.x)),y:h1(r,p.y+c.y),...d?{stand:!0}:{}}),d&&ne.classList.add("hidden"),f=d&&r.holdable?P1(p):null,il(f)},onUp(u){if(e.classList.remove("lifted"),Lr.classList.remove("show","hot"),il(null),d&&Ip(u.clientX,u.clientY)){Ne=null,S.dispatch({type:"item/delete",room:o,id:i}),lh(u.clientX,u.clientY);return}if(d&&f){K1(f,i);return}d?(H1(o,i),C.drop(),et(e)):(C.click(),w2(i),_7(e)),Pt(S.get())}})}function FS(e,t,n){if(n.preventDefault(),n.stopPropagation(),Gt||Se.isPlay())return;const s=e.dataset.cid,o=t.dataset.hand,i=S.get().characters.find(d=>d.id===s),a=i?.held[o];if(!i||!a)return;const r=t.getBoundingClientRect(),l=Qe(r.left+r.width/2,r.bottom);S.dispatch({type:"char/release",id:s,hand:o,x:l.x,y:l.y});const c=X.querySelector(`.item[data-id="${a.id}"]`);c&&Fd(c,n,!0)}function ZS(e){e.addEventListener("pointerdown",t=>{const n=t.target.closest(".held"),s=n?.querySelector("img.artimg"),o=!!s&&!Bf(s,t.clientX,t.clientY);if(n&&!o){if(Se.isPlay()){t.preventDefault(),t.stopPropagation();return}if(!ht()){t.stopPropagation(),Yn(e);return}return FS(e,n,t)}if(t.preventDefault(),t.stopPropagation(),Gt||Se.isPlay()&&!eh())return;if(!ht()){Yn(e);return}Ne=null,Pt(S.get());const i=e.dataset.cid;De=i;const a=S.get(),r=a.characters.find(p=>p.id===i);if(!r)return;const l=Qe(t.clientX,t.clientY),c=Rt(a.currentRoom,Ct(r),r),d={x:c.x-l.x,y:c.y-l.y};let f=c.x,u=!1;e.classList.add("lifted"),C.pick(),on(S.get()),ba=!0,Jn(t,{onMove(p){const y=Qe(p.clientX,p.clientY),m=y.x+d.x;if(Math.hypot(y.x-l.x,y.y-l.y)>6&&(u=!0),!u)return;const k=S.get().characters.find(g=>g.id===i);if(!k)return;if(Math.abs(m-f)>3){const g=m<f;g!==k.flip&&S.dispatch({type:"char/update",id:i,patch:{flip:g}}),f=m}const b=Math.max(wo+40,y.y+d.y);Ji(i,a.currentRoom,m,b,null),Se.isPlay()&&(ya=tl(p.clientX,p.clientY)?.id??null),document.querySelectorAll(".tab").forEach(g=>g.classList.remove("drop")),document.elementFromPoint(p.clientX,p.clientY)?.closest(".tab:not(.on)")?.classList.add("drop")},onUp(p){ba=!1,ya=null,e.classList.remove("lifted"),document.querySelectorAll(".tab").forEach(w=>w.classList.remove("drop"));const y=document.elementFromPoint(p.clientX,p.clientY)?.closest("[data-room]"),m=S.get().characters.find(w=>w.id===i);if(!u||!m){C.click();return}if(y&&y.dataset.room!==a.currentRoom){const w=y.getBoundingClientRect();rh(w.left+w.width/2,w.top+w.height/2,9),C.swish(),Ji(i,y.dataset.room,m.x,m.y,null);return}const k=Qe(p.clientX,p.clientY),b=k.x+d.x,g=Math.max(wo+40,k.y+d.y);if(Se.isPlay()){const w=T1(p.clientX,p.clientY)??tl(p.clientX,p.clientY);th(i,b,g,w)}else Ji(i,a.currentRoom,b,g,null);C.drop(),et(e),requestAnimationFrame(()=>Ts(!0))}})})}function GS(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Se.isPlay()){n.stopPropagation();return}if(!ht()){Yn(e);return}const s=document.createElement("div");s.className="ghost",s.innerHTML=Ut(t),document.body.appendChild(s);const o=Math.max(1,60/(Math.max(t.w,Xe(t))*yt())),i=t.w*yt()*o,a=Xe(t)*yt()*o;s.style.width=i+"px",s.style.height=a+"px";let r=null;const l=f=>{s.style.left=f.clientX-i/2+"px",s.style.top=f.clientY-a*.8+"px",r=t.holdable&&Ud(f.clientX,f.clientY)?P1(Qe(f.clientX,f.clientY)):null,il(r)};l(n),C.pick(),e.classList.add("pressed");const c=n.clientX,d=n.clientY;Jn(n,{onMove:l,onUp(f){s.remove(),e.classList.remove("pressed"),il(null);const u=S.get().currentRoom,p=Math.hypot(f.clientX-c,f.clientY-d)<8;let y,m;if(p)y=ie+380+Math.random()*240,m=t.wall?Math.min(Ia,200+Xe(t)/2):500+Math.random()*40;else if(Ud(f.clientX,f.clientY)){const g=Qe(f.clientX,f.clientY);y=g.x,m=h1(t,g.y+Xe(t)*.2)}else return;const k={id:Jr(t.kind.replace(/[^a-z0-9-]/gi,"")),kind:t.kind,x:y,y:m,flip:!1,z:0,scale:1};if(u!=="backyard"&&S.get().rooms[u].items.length===0){const g=Y7(w=>Jr(w),u);for(let w=0;w<g.length;w++)S.dispatch({type:"item/add",room:u,item:g[w]})}if(S.dispatch({type:"item/add",room:u,item:k}),!p&&r){K1(r,k.id);return}Ne=k.id,Pt(S.get());const b=X.querySelector(`.item[data-id="${k.id}"]`);et(b),Da(b),C.sparkle()}})})}function YS(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Se.isPlay())return;if(!ht()){Yn(e);return}const s=S.get().characters.find(u=>u.id===t);if(!s)return;const o=Oa(s),i=Bs*o*yt(),a=$n*o*yt(),r=document.createElement("div");r.className="ghost",r.innerHTML=Mt(s),r.style.width=i+"px",r.style.height=a+"px",document.body.appendChild(r);const l=u=>{r.style.left=u.clientX-i/2+"px",r.style.top=u.clientY-a*.85+"px"},c=n.clientX,d=n.clientY;let f=!1;r.style.visibility="hidden",Jn(n,{onMove(u){Math.hypot(u.clientX-c,u.clientY-d)>8&&(f=!0,r.style.visibility=""),l(u)},onUp(u){if(r.remove(),!f){C.click(),De=t,ni("dress");return}if(!Ud(u.clientX,u.clientY))return;const p=Qe(u.clientX,u.clientY),y=S.get().currentRoom;S.dispatch({type:"char/move",id:t,room:y,x:p.x,y:Math.max(wo+40,p.y+$n*o*.15)}),De=t,on(S.get());const m=Zt.get(t);et(m),Da(m),C.sparkle()}})})}function J1(){if(!ht())return Yn(null),null;const e=S.get();if(e.characters.length>=ai)return null;const t=Jr("c"),n=Ml();S.dispatch({type:"char/add",char:Ms({id:t,...xl(n),look2:n,room:e.currentRoom,x:ie+300+Math.random()*400,y:520+Math.random()*40})}),De=t,on(S.get());const s=Zt.get(t);return et(s),Da(s),C.sparkle(),t}function KS(){return Yf==="all"?"all":S.get().currentRoom}function zt(){const e=S.get().currentRoom,t=KS(),n=Ff.find(l=>l.id===e)?.name??"This room",s=t==="all";L("roomFilter").innerHTML=`<button class="rf ${s?"on":""}" data-rf="${s?"room":"all"}">${s?"Just "+n:"All rooms"}</button>`;const o=Oc("secrets").length>0,i=Ss.filter(l=>l.id!=="secrets"&&(l.kind==="people"||l.kind==="pack"&&e!=="backyard"||Oc(l.id).length));!(Bt==="secrets"&&o)&&!i.some(l=>l.id===Bt)&&(Bt=i[1]?.id??"__people"),L("cats").innerHTML=i.map(l=>`<button class="cat ${l.kind} ${l.id===Bt?"on":""}" data-cat="${l.id}" aria-label="${l.name}" title="${l.name}">${l.kind==="people"?JE:l.kind==="pack"?`<span class="packicon">${Ut(de[l.icon])}</span><span class="packname">${l.name}</span>`:Ut(de[l.icon])}</button>`).join("")+(o?`<button class="cat secretTab ${Bt==="secrets"?"on":""}" data-cat="secrets" aria-label="Secrets" title="Secrets">${G1()}</button>`:"");const a=L("shelf");if(sl.length=0,a.innerHTML="",!ht()){a.innerHTML='<div class="empty locked">🔒 This house is look-only right now</div>';return}if(Bt==="__people"){const l=S.get(),c=ws();if(c){const d=document.createElement("button");d.className="thing person me",d.setAttribute("aria-label","Me"),d.innerHTML=`<div class="face">${Mt(c)}</div><span class="meStar">★</span>`,d.addEventListener("click",()=>{C.click(),De=mt,ni("dress")}),a.appendChild(d)}for(const d of l.characters){const f=document.createElement("button");f.className="thing person",f.setAttribute("aria-label","Character"),f.innerHTML=`<div class="face">${Mt(d)}</div><span class="where" style="background:${p1(d.room)}"></span>`,a.appendChild(f),YS(f,d.id)}if(l.characters.length<ai){const d=document.createElement("button");d.className="thing add",d.setAttribute("aria-label","New character"),d.innerHTML=g1,d.addEventListener("click",()=>{J1()&&(zt(),ni("dress"))}),a.appendChild(d)}return}const r=Oc(Bt);r.length||(a.innerHTML='<div class="empty">Nothing here yet!</div>');for(const l of r){const c=document.createElement("button");c.className="thing",c.setAttribute("aria-label",l.name),c.dataset.kind=l.kind;const d=Zn()&&Gn(l.kind)?HS(l.kind):void 0;if(d)for(let f=0;f<d.length;f++)c.appendChild(d[f]);else c.innerHTML=S5(l,Th(l.kind));a.appendChild(c),GS(c,l)}a.scrollLeft=0,dh(),US(),F1()}function dh(){const e=document.querySelector(".drawerTop"),t=document.getElementById("drawerBar");!e||!t||(t.classList.toggle("more",e.scrollWidth-e.clientWidth-e.scrollLeft>6),t.classList.toggle("back",e.scrollLeft>6))}document.querySelector(".drawerTop").addEventListener("scroll",dh,{passive:!0});window.addEventListener("resize",dh);function Vp(e,t,n){return`<div class="sw">${e.map(s=>`<button class="dot ${s===t?"on":""}" style="background:${s}" data-act="${n}" data-v="${s}"></button>`).join("")}</div>`}let ka=null,Vo=!1;function e2(e){if(e===mt){const n=ws();if(!n||n.look2)return;Cn(mt,ia(oa(n)));return}const t=S.get().characters.find(n=>n.id===e);!t||t.look2||Cn(e,{...ia(oa(t)),size:t.size})}function gn(){const e=S.get(),t=L("card");if(ka==="paint"){t.classList.remove("avCard");const n=e.rooms[e.currentRoom],s=md.filter(a=>a.kind==="wallpaper"),o=md.filter(a=>a.kind==="floor"),i=(a,r,l,c)=>`<button class="dot pat tile ${a.id===r?"on":""}" data-act="${l}" data-v="${a.id}" title="${a.name} (${ag(a.pack)})" style="background-color:${c};background-image:${zd(a.url)};background-size:48px auto"></button>`;t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${Vp(KE,n.wallpaper,"wall")}
      <h3>Wallpaper</h3><div class="sw">${A1.map((a,r)=>`<button class="dot pat ${!n.wallTile&&r===n.pattern?"on":""}" data-act="pat" data-v="${r}" style="background-color:${n.wallpaper};background-image:${a};background-size:${r===1?"16px 16px":r===3?"20px 20px":"auto"}"></button>`).join("")}${s.map(a=>i(a,n.wallTile,"wtile",n.wallpaper)).join("")}</div>
      <h3>Floor</h3>${Vp(XE,n.floor,"floor")}
      ${o.length?`<h3>Floor style</h3><div class="sw"><button class="dot pat ${n.floorTile?"":"on"}" data-act="ftile" data-v="" style="background-color:${n.floor};background-image:${R1}"></button>${o.map(a=>i(a,n.floorTile,"ftile",n.floor)).join("")}</div>`:""}`}else if(ka==="dress"){t.classList.add("avCard");let n=e,s=ws(),o=s?Ms({id:mt,...s}):null,i=De===mt&&o?o:n.characters.find(r=>r.id===De)??o??n.characters[0];i&&!i.look2&&e2(i.id),n=S.get(),s=ws(),o=s?Ms({id:mt,...s}):null,i=De===mt&&o?o:n.characters.find(r=>r.id===De)??o??n.characters[0];const a=`<div class="picker">${o?`<button class="pk me ${i?.id===mt?"on":""}" data-act="pickc" data-v="${mt}"><div class="face">${Mt(o)}</div><span class="meStar">★</span></button>`:""}${n.characters.map(r=>`<button class="pk ${r.id===i?.id?"on":""}" data-act="pickc" data-v="${r.id}"><div class="face">${Mt(r)}</div><span class="where" style="background:${p1(r.room)}"></span></button>`).join("")}${n.characters.length<ai?`<button class="pk add" data-act="newc">${g1}</button>`:""}</div>`;if(!i){t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${a}<div class="dress"><p class="hint">Tap + to make someone new!</p></div>`;return}De=i.id,t.innerHTML=TL(i,a,Vo,Nt.trash)}}function ni(e){ka=e,Vo=!1,gn(),L("sheet").classList.remove("hidden"),C.swish()}L("sheet").addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(e.target===L("sheet")||t?.dataset.act==="close"){L("sheet").classList.add("hidden"),ka=null,C.click(),Bt==="__people"&&zt();return}if(!t)return;const n=S.get(),s=n.currentRoom,o=t.dataset.v,i=De??"",a=t.dataset.act;if(a!=="delc"&&(Vo=!1),a&&a.indexOf("av-")===0){const r=i===mt?ws():S.get().characters.find(d=>d.id===i);if(a==="av-costume"){r&&!r.look2&&e2(i);const d=i===mt?ws():S.get().characters.find(f=>f.id===i);Cn(i,{costume:Mo(o)??null,...d?.look2?{look2:d.look2}:{},size:d?.size??"kid"}),C.sparkle(),gn(),et(document.querySelector(".avStage"));return}if(a==="av-surprise"){Cn(i,{...ia(Ml()),size:r?.size??"kid"}),C.sparkle(),gn(),et(document.querySelector(".avStage"));return}const l=r?.look2??oa(r??{}),c=PL(l,a,o??"");if(!c){C.click(),gn();return}Cn(i,{...ia(c),size:r?.size??"kid"}),C.sparkle(),gn(),et(document.querySelector(".avStage"));return}switch(a){case"wall":S.dispatch({type:"room/wallpaper",room:s,color:o});break;case"floor":S.dispatch({type:"room/floor",room:s,color:o});break;case"pat":S.dispatch({type:"room/pattern",room:s,pattern:+o});break;case"wtile":S.dispatch({type:"room/wallTile",room:s,tile:o});break;case"ftile":S.dispatch({type:"room/floorTile",room:s,tile:o||null});break;case"skin":case"hair":case"shirt":case"pants":Cn(i,{[a]:o});break;case"hs":Cn(i,{hairStyle:+o});break;case"acc":Cn(i,{acc:+o});break;case"size":{const r=i===mt?ws():S.get().characters.find(l=>l.id===i);Cn(i,{size:o,...r?.look2?{look2:r.look2}:{}}),on(S.get());break}case"pickc":De=o,on(S.get()),C.click(),gn();return;case"newc":if(!J1())return;break;case"delc":if(i===mt||!ht())return;if(!Vo){Vo=!0,C.click(),gn();return}Vo=!1;{const l=Zt.get(i)?.getBoundingClientRect();S.dispatch({type:"char/delete",id:i}),l?lh(l.left+l.width/2,l.top+l.height/2):C.pop()}De=S.get().characters[0]?.id??null,gn();return}C.sparkle(),gn(),et(document.querySelector(".preview"))});L("tabs").addEventListener("click",e=>{const t=e.target.closest("[data-room]");if(!t)return;const n=t.dataset.room;n!==S.get().currentRoom&&(Ne=null,C.swish(),Y.classList.remove("swap"),Y.offsetWidth,Y.classList.add("swap"),S.dispatch({type:"room/switch",room:n}))});L("cats").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");t&&(Bt=t.dataset.cat,C.click(),zt())});L("roomFilter").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");if(t){Bt=t.dataset.cat,C.click(),zt();return}const n=e.target.closest("[data-rf]");n&&(Yf=n.dataset.rf==="all"?"all":"",C.click(),zt())});ne.addEventListener("pointerdown",e=>e.stopPropagation());ne.addEventListener("click",e=>{const t=e.target.closest("[data-a]");if(!t||!Ne)return;if(!ht()){Yn(null);return}const n=S.get().currentRoom,s=Ne,o=X.querySelector(`.item[data-id="${s}"]`);switch(t.dataset.a){case"smaller":case"bigger":{const i=S.get().rooms[n].items.find(l=>l.id===s);if(!i)break;const a=Un.indexOf(Fn(i.size)),r=t.dataset.a==="smaller"?a-1:a+1;if(r<0||r>=Un.length)break;S.dispatch({type:"item/size",room:n,id:s,size:Un[r]}),C.click(),et(o);break}case"flip":S.dispatch({type:"item/flip",room:n,id:s}),C.swish(),et(o);break;case"front":S.dispatch({type:"item/front",room:n,id:s}),C.click(),et(o);break;case"back":S.dispatch({type:"item/back",room:n,id:s}),C.click(),et(o);break;case"delete":{const i=o?.getBoundingClientRect();Ne=null,S.dispatch({type:"item/delete",room:n,id:s}),i&&lh(i.left+i.width/2,i.top+i.height/2);break}}});Y.addEventListener("pointerdown",e=>{if(e.target.closest(".nudge"))return;Nl();const t=e.clientX,n=ie;let s=!1,o=0,i=e.clientX,a=performance.now();Jn(e,{edgeScroll:!1,onMove(r){if(Math.abs(r.clientX-t)>6&&(s=!0),!s)return;const l=performance.now();o=(r.clientX-i)/Math.max(1,l-a),i=r.clientX,a=l,di(),Je(n-(r.clientX-t)/yt())},onUp(){if(!s){Ne&&(Ne=null,Pt(S.get()));return}if(Gt)return;let r=-o*16/yt();const l=()=>{Math.abs(r)<.3||(Je(ie+r),r*=.92,qo=requestAnimationFrame(l))};qo=requestAnimationFrame(l)}})});Y.addEventListener("wheel",e=>{e.preventDefault(),Nl(),di(),Je(ie+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/yt())},{passive:!1});L("nudgeL").addEventListener("pointerdown",e=>{e.stopPropagation(),C.swish(),di(),ql((ma??ie)-G*.6)});L("nudgeR").addEventListener("pointerdown",e=>{e.stopPropagation(),C.swish(),di(),ql((ma??ie)+G*.6)});const Up=L("minimap");Up.addEventListener("pointerdown",e=>{e.stopPropagation(),e.preventDefault();const t=n=>{di();const s=Up.getBoundingClientRect();ql((n.clientX-s.left)/s.width*ue-G/2)};t(e),C.click(),Jn(e,{edgeScroll:!1,onMove:t,onUp(){}})});L("btnPaint").addEventListener("click",()=>{if(!ht())return Yn(null);ni("paint")});L("btnDress").addEventListener("click",()=>ni("dress"));L("btnSound").addEventListener("click",()=>{S.dispatch({type:"settings/sound",on:!S.get().soundOn}),C.click()});document.addEventListener("gesturestart",e=>e.preventDefault());document.addEventListener("contextmenu",e=>e.preventDefault());const fh=new Set;document.addEventListener("pointerdown",e=>{fh.add(e.pointerId)},!0);for(const e of["pointerup","pointercancel"])document.addEventListener(e,t=>{fh.delete(t.pointerId)},!0);Y2({base:"/kids-house-game/",safeNow:()=>fh.size===0});window.__store=S;window.__shelfCache=()=>Hn.size;A7({get:()=>S.get(),dispatch:e=>S.dispatch(e),subscribe:e=>S.subscribe(e),canDrift:()=>R==="house"&&eh(),speaks:()=>!v||Re===ee||v.speaksNeeds,layer:X,menuAfter:L("btnSound"),afterPaint:()=>{Wa(),Ha()}});window.__items=Object.fromEntries(Ln.filter(e=>e.img).map(e=>[e.kind,{w:e.w,h:Xe(e),cat:e.cat,holdable:e.holdable,svg:e.img.includes(".svg")}]));window.__cam={get:()=>ie,set:Je};window.__yieldNudges=Wa;window.__myPres=()=>ye();window.__playDropPolish=Rl;window.__takenSeats=vo;window.__applyPlayDrop=(e,t,n,s)=>{const o=S.get(),i=s?o.rooms[o.currentRoom].items.find(a=>a.id===s)??null:null;th(e,t,n,i)};window.__applyAvatarPlayDrop=(e,t,n)=>{const s=S.get(),o=n?s.rooms[s.currentRoom].items.find(i=>i.id===n)??null:null;nh(e,t,o),bt()};window.__phoneShowKids=()=>dt();window.__avatar={richAvatars:Fr,randomLook2:Ml,look2FromLegacy:oa,legacyFromLook2:xl,sanitizeLook2:$a,handsFor:Wl};window.__frameHouseKid=()=>Ts(!0);window.__layoutNameTags=()=>Sm();window.__lie={bedArt:Sl,lieBedKinds:lb,lieOffset:Or,lieSpot:hb,box(e){const t=de[e];return t?{w:t.w,h:Xe(t)}:null}};window.__paint=()=>{bt()};const ge=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function ht(){return!v||Re===ee||v.canEdit(me)}function Yn(e){C.pop();const t=L("houseTag");t.classList.add("show"),t.classList.remove("wiggle"),t.offsetWidth,t.classList.add("wiggle"),window.clearTimeout(rl),rl=window.setTimeout(()=>{R==="house"&&v&&!document.body.classList.contains("own-house")||t.classList.remove("show")},2e3),e&&(e.classList.remove("nope"),e.offsetWidth,e.classList.add("nope")),F("🔒 Look-only house: ask the owner to unlock it!",1800)}const ye=()=>v?.myPresence()??null,ws=()=>v?v.players.get(v.pid)?.look??null:null;function Cn(e,t){if(e===mt){const n=ws();if(!n||!v)return;v.setLook(La({...n,...t})),bt(),R==="street"&&ta(),R==="park"&&xo(),R==="ranch"&&xs();return}S.dispatch({type:"char/update",id:e,patch:t})}function nt(e){v?.setPresence(e)}function hh(e,t,n){const s=[];return v?.presence.forEach((o,i)=>{i!==v.pid&&o.where==="house"&&o.houseId===e&&o.room===t&&s.push(o)}),ey(n,s,{minX:80,maxX:ue-80,minY:wo+60,maxY:Ce-20})}function XS(e){const t=ye();if(t&&t.where==="house"){const n=t.houseId?hh(t.houseId,e,t):t;nt({...t,room:e,x:n.x,y:n.y})}}function t2(e){Re=e,f1(e),Ne=null,setTimeout(()=>Q2.update());for(const t of Object.keys(ga))delete ga[t];De=e===ee?e.get().characters[0]?.id??null:mt,$o(),zt()}function uh(e,t,n,s){return`<div class="inner">${Mt(e,n,s)}</div><div class="nametag">${ge(t)}</div>`}let Uc=!1;function JS(){if(Uc||!v||R!=="house")return;const e=v,t=ye();if(!t||t.where!=="house"||t.houseId!==me)return;const n=dn(e.pid,t);if(!n)return;let s=!1;if(e.presence.forEach((l,c)=>{if(c===e.pid||l.where!=="house"||l.houseId!==me||l.room!==t.room)return;const d=dn(c,l);d&&d.item===n.item&&d.n===n.n&&(s=!0)}),!s)return;const o=t.room&&S.get().rooms[t.room]?t.room:S.get().currentRoom,i=S.get().rooms[o]?.items??[],a=i.find(l=>da(l.kind)&&Math.hypot(l.x-t.x,l.y-t.y)<420)??i.find(l=>da(l.kind))??i.find(l=>l.id===n.item)??null,r=[...vo(void 0,e.pid),{item:n.item,n:n.n}];Uc=!0;try{const l=Rl({releaseX:t.x,releaseY:t.y,hit:a,items:i,occupied:r,held:[],seatPiece:u=>Ba(u)});let c=l.seat&&!(l.seat.item===n.item&&l.seat.n===n.n)?{id:l.seat.item,pose:l.seat.pose,n:l.seat.n}:null,d=l.x,f=l.y;if(!c){const u=i.find(y=>y.id===n.item),p=co(u?.x??t.x,_n(u?.kind??"chair")*(u?.scale||1),t.x);d=p.x,f=p.y}wa(t,d,f,t.flip,c),bt()}finally{Uc=!1}}function bt(){const e=new Set;if(v&&Re!==ee&&R==="house"){const n=S.get().currentRoom,s=[...v.presence.entries()],o=ye();o&&s.push([v.pid,o]);for(const[i,a]of s){const r=v.players.get(i);if(!r||a.where!=="house"||a.houseId!==me||a.room!==n)continue;e.add(i);let l=no.get(i);(!l||!l.isConnected)&&(l=document.createElement("div"),l.className="char avatar "+(i===v.pid?"mine":"other"),l.dataset.pid=i,X.appendChild(l),no.set(i,l),i===v.pid?eT(l):l.addEventListener("pointerdown",b=>{b.preventDefault(),b.stopPropagation()}));const c=r.look,d=dn(i,a),f=d?.pose??null,u=ea(S.get())===i,p=JSON.stringify(c)+r.nickname+(f||"")+(u?"h":"");if(l.dataset.look!==p){const b=l.querySelector(".bubble");l.innerHTML=uh(c,r.nickname,f,u),b&&l.appendChild(b),l.dataset.look=p}l.classList.toggle("holding",u);const y=mo[c.size]??1,m=Rt(n,d,a);Eo(l,m.x,m.y,Bs*y,$n*y);const k=d&&S.get().rooms[n].items.find(b=>b.id===d.item);if(l.style.zIndex=String(k?1e3+k.z+1+d.n:5e3+Math.round(a.y)),l.classList.toggle("flipped",a.flip),l.classList.toggle("pose-sit",f==="sit"),l.classList.toggle("pose-lie",f==="lie"),l.classList.toggle("pose-lie-r",f==="lie"&&!!k?.flip),Aa(l,c,i===v.pid),u){const b=ym(c,f);b?Q1("avatar",i,l,b,m.y):z1("avatar",i)}}}const t=ea(S.get());v&&R==="house"&&t&&e.has(t)||U1("avatar");for(const[n,s]of no)(!e.has(n)||!s.isConnected)&&(e.has(n)||s.remove(),no.delete(n));Fl(),So(),Zl(),vs(),JS(),Wa(),Ha()}function eT(e){e.addEventListener("pointerdown",t=>{if(t.preventDefault(),t.stopPropagation(),Gt||!v)return;const n=ye();if(!n||n.where!=="house")return;const s=Qe(t.clientX,t.clientY),o=Rt(S.get().currentRoom,dn(v.pid,n),n),i={x:o.x-s.x,y:o.y-s.y};let a=o.x,r=!1;e.classList.add("lifted"),C.pick(),ba=!0,Jn(t,{onMove(l){const c=Qe(l.clientX,l.clientY),d=ye();if(!d||d.where!=="house"||(Math.hypot(c.x-s.x,c.y-s.y)>6&&(r=!0),!r))return;const f=Math.max(40,Math.min(ue-40,c.x+i.x)),u=Math.max(wo+40,Math.min(Ce,c.y+i.y)),p=Math.abs(f-a)>3?f<a:d.flip;Math.abs(f-a)>3&&(a=f),wa(d,f,u,p,null),bt(),nl(S.get()),Se.isPlay()&&(ya=tl(l.clientX,l.clientY)?.id??null)},onUp(l){ba=!1,ya=null,e.classList.remove("lifted");const c=ye();if(!r||!c||c.where!=="house"){C.click();return}const d=Qe(l.clientX,l.clientY),f=Math.max(40,Math.min(ue-40,d.x+i.x)),u=Math.max(wo+40,Math.min(Ce,d.y+i.y));if(Se.isPlay()){const p=T1(l.clientX,l.clientY)??tl(l.clientX,l.clientY);nh(f,u,p)}else wa(c,f,u,c.flip,null);bt(),nl(S.get()),C.drop(),et(e),requestAnimationFrame(()=>Ts(!0))}})})}function tT(e){return e.kind==="text"?e.v:(e.kind==="phrase"?zi:C0)[e.v]??""}function Ha(){const e=document.body.classList.contains("phone")?".bubble":".bubble, .nametag, .need-bubble.show",t=document.querySelectorAll(e),n=Y.getBoundingClientRect();if(!n.width)return;const s=yt()||1,o=4;t.forEach(i=>{i.style.marginLeft="0px",i.style.marginTop="0px";const a=i.getBoundingClientRect();if(!a.width||!a.height)return;let r=0,l=0;a.width>=n.width-o*2||a.left<n.left+o?r=n.left+o-a.left:a.right>n.right-o&&(r=n.right-o-a.right),a.top<n.top+o?l=n.top+o-a.top:a.bottom>n.bottom-o&&(l=n.bottom-o-a.bottom),r&&(i.style.marginLeft=r/s+"px"),l&&(i.style.marginTop=l/s+"px")})}const hi=Ha,nT=230,sT=88;function dr(){if(document.body.classList.contains("phone")){L("nudgeL")?.classList.remove("yield"),L("nudgeR")?.classList.remove("yield");return}const e=yt()||1,t=L("layer")||X;for(const n of["nudgeL","nudgeR"]){const s=L(n);if(!s||s.classList.contains("off")||s.offsetParent===null){s?.classList.remove("yield");continue}const o=s.getBoundingClientRect(),i=s.classList.contains("yield")?(nT-sT)*e:0,a=o.top+i,r=o.bottom+i;let l=!1;for(const c of t.querySelectorAll(".char .inner, .need-bubble.show")){const d=c.getBoundingClientRect();if(!(d.width<2||d.height<2)&&d.left<o.right-2&&d.right>o.left+2&&d.top<r-2&&d.bottom>a+2){l=!0;break}}s.classList.toggle("yield",l)}}function Wa(){dr(),requestAnimationFrame(()=>{dr(),requestAnimationFrame(dr)}),window.setTimeout(dr,50)}function oT(e,t){const n=R==="street"?document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`):R==="park"?document.querySelector(`#pavatars .savatar[data-pid="${e}"]`):R==="ranch"?document.querySelector(`#ravatars .savatar[data-pid="${e}"]`):R==="gameroom"?document.querySelector(`#gavatars .savatar[data-pid="${e}"]`):no.get(e),s=n?[n]:[];for(const o of s){o.querySelector(".bubble")?.remove();const i=document.createElement("div");i.className="bubble"+(t.kind==="emote"?" emote":""),i.textContent=tT(t),o.appendChild(i),hi(),setTimeout(()=>i.classList.add("out"),4600),setTimeout(()=>i.remove(),5e3)}e!==v?.pid&&C.click()}function Gl(){const e=ye();if(!v||!e)return 0;let t=0;return v.presence.forEach(n=>{vk(e,n)&&t++}),t}function So(){const e=Gl();L("btnChat").classList.toggle("glow",e>0),Yl();const t=document.getElementById("chatNear");t&&(t.textContent=e?`${e} friend${e>1?"s":""} nearby can hear you`:"Walk closer to a friend to talk!",L("chatTray").classList.toggle("nobody",!e))}function n2(){const e=L("chatTray");if(!v)return;const t=document.body.classList.contains("phone"),n=`<div class="phrases">${zi.map((a,r)=>`<button data-phrase="${r}">${ge(a)}</button>`).join("")}</div>`,s=v.settings.freeChat?`<form class="typed" id="chatForm"><input id="chatInput" maxlength="${$f}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>`:'<div class="presetsOnly">Picking from the bubbles above 💬</div>',o=t?'<button type="button" class="chatMore" data-chat="more">more</button>':"";e.innerHTML=`<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${C0.map((a,r)=>`<button data-emote="${r}">${a}</button>`).join("")}</div>
    ${o}
    <div class="chatExtra${t?" hidden":""}">${n}${s}</div>`,So(),document.getElementById("chatForm")?.addEventListener("submit",a=>{a.preventDefault();const r=L("chatInput"),l=ck(r.value);if(!l.ok){L("chatWarn").textContent=Tl[l.reason]??"",C.pop();return}if(!Gl()){F("Walk closer to a friend to talk!");return}v.say({kind:"text",v:l.text}),r.value="",L("chatWarn").textContent="",r.blur()})}L("chatTray").addEventListener("click",e=>{const t=e.target;if(!v)return;if(t.closest('[data-chat="close"]')){L("chatTray").classList.add("hidden");return}const n=t.closest('[data-chat="more"]');if(n){const i=L("chatTray").querySelector(".chatExtra");i?.classList.toggle("hidden"),n.textContent=i&&!i.classList.contains("hidden")?"less":"more";return}const s=t.closest("[data-emote]"),o=t.closest("[data-phrase]");if(!(!s&&!o)){if(!Gl()){F("Walk closer to a friend to talk!");return}v.say(s?{kind:"emote",v:+s.dataset.emote}:{kind:"phrase",v:+o.dataset.phrase}),C.click()}});L("btnChat").addEventListener("click",()=>{L("chatTray").classList.toggle("hidden")||(n2(),C.swish())});function xn(){const e=document.body.classList,n=!!v&&Re!==ee&&R==="house"?v.houses.get(me):void 0,s=!!n&&n.meta.ownerId===v.pid;if(e.toggle("mode-hood",!!v),e.toggle("view-street",R!=="house"),e.toggle("view-park",R==="park"),e.toggle("view-ranch",R==="ranch"),e.toggle("view-map",R==="street"),e.toggle("view-gameroom",R==="gameroom"),e.toggle("in-barn",R==="ranch"&&qe),e.toggle("mode-play",R==="house"&&Se.isPlay()),Sh(),c2(),e.toggle("own-house",s),e.toggle("locked",!!n&&!ht()),e.toggle("has-hood",!!Pl()),Yl(),n){const o=v.players.get(n.meta.ownerId)?.nickname??"";L("houseTag").innerHTML=`${n.meta.locked?"🔒 ":""}<b>${ge(n.meta.name)}</b>${s?" · yours":o?" · "+ge(o):""}`;const i=L("lockIco");i&&(i.innerHTML=n.meta.locked?Dt.lockOn:Dt.lockOff);const a=n.meta.locked?"Unlock my house":"Lock my house";L("btnLock").setAttribute("aria-label",n.meta.locked?"Unlock my house":"Lock my house");const r=L("lockLabel");r&&(r.textContent=a)}So(),iT(),document.body.classList.contains("phone")&&w1()}let zc="",rl=0;function iT(){const e=L("houseTag"),t=!!v&&R==="house"&&!document.body.classList.contains("own-house");if(R!=="house"||!v){zc="",e.classList.remove("show");return}if(t){e.classList.add("show");return}const n=me||"solo";zc!==n&&(zc=n,e.classList.add("show"),window.clearTimeout(rl),rl=window.setTimeout(()=>e.classList.remove("show"),2e3))}L("btnLock").addEventListener("click",()=>{const e=v?.houses.get(me);!e||e.meta.ownerId!==v.pid||(v.lock(e.meta.id,!e.meta.locked),C.click(),F(e.meta.locked?"Unlocked: friends can decorate!":"Locked: friends can look but not change things"))});const Lt=new Map;let zp="",Zd=0,Ze={w:Qn,h:Nn,portrait:!1};function aT(){return document.body.classList.contains("phone-portrait")?!0:document.body.classList.contains("phone")?!1:window.innerHeight>=window.innerWidth*1.25}function s2(){const e=L("street"),t=Ze.portrait&&!document.body.classList.contains("phone")?24:0,n=Math.max(1,e.clientWidth-t),s=Math.max(1,e.clientHeight-t);return Math.min(n/Ze.w,s/Ze.h)}function rT(e){const t=L("street"),n=L("mapWorld"),s=Ze.w*e,o=Ze.h*e;n.style.marginLeft=Math.max(0,Math.floor((t.clientWidth-s)/2))+"px",n.style.marginTop=Math.max(0,Math.floor((t.clientHeight-o)/2))+"px",t.scrollLeft=0,t.scrollTop=0,o2()}function o2(){const e=L("street"),t=L("mapWorld"),n=4,s=e.clientWidth-n,o=e.clientHeight-n,i=t.offsetLeft,a=t.offsetTop;t.querySelectorAll(".mapSign").forEach(r=>{r.style.transform="translateX(-50%)";const l=r.offsetWidth,c=r.offsetHeight,d=i+r.offsetLeft-l/2,f=a+r.offsetTop;let u=0,p=0;d<n&&(u=n-d),d+l+u>s&&(u-=d+l+u-s),f<n&&(p=n-f),f+c+p>o&&(p-=f+c+p-o),lT(r,u,p,i,a,n,s,o)})}function lT(e,t,n,s,o,i,a,r){const l=[...e.parentElement.querySelectorAll(".mapMail")],c=()=>{const f=e.offsetWidth,u=e.offsetHeight,p=s+e.offsetLeft-f/2+t,y=o+e.offsetTop+n;return{left:p,top:y,right:p+f,bottom:y+u,width:f,height:u}};for(let f=0;f<6;f++){const u=c(),p=l.find(_=>{const P=s+_.offsetLeft,$=o+_.offsetTop,x=P+_.offsetWidth,H=$+_.offsetHeight;return u.right>P+2&&u.left<x-2&&u.bottom>$+2&&u.top<H-2});if(!p)break;const y=s+p.offsetLeft,m=o+p.offsetTop,k=m+p.offsetHeight,b=c(),g=k+4-b.top,w=b.bottom-(m-4);b.top+g+b.height<=r?n+=g:b.top-w>=i?n-=w:t-=Math.min(b.right,y+p.offsetWidth)-Math.max(b.left,y)+6}const d=c();d.left<i&&(t+=i-d.left),d.right>a&&(t-=d.right-a),d.top<i&&(n+=i-d.top),d.bottom>r&&(n-=d.bottom-r),e.style.transform=Math.abs(t)>.5||Math.abs(n)>.5?`translate(calc(-50% + ${t.toFixed(1)}px), ${n.toFixed(1)}px)`:"translateX(-50%)"}document.fonts?.ready.then(()=>{R==="street"&&o2()});function cT(){return v?[...v.houses.values()].map(e=>e.meta).sort((e,t)=>e.slot-t.slot):[]}function dT(e){const s=Math.round(97.5),o=Math.max(1,Math.ceil(e/(e===1?1:2))),i=158,a=318,l=a+(o-1)*i+s/2+108,c=Math.max(1020,l+78),d=Math.max(l,Math.min(c-88,Math.round(c*.74))),f=e===1?[280]:[150,410],u=e===1?1:2,p=Array.from({length:e},(y,m)=>({x:f[m%u],y:a+Math.floor(m/u)*i}));return{w:560,h:c,hw:104,hh:s,houses:p,square:{x:280,y:d},park:{x:96,y:122},club:{x:280,y:116},ranch:{x:458,y:120}}}function Qp(e,t,n,s){return!e||e.mine||!Mm()?"":`<button class="mapKnock" data-knock="${e.id}" aria-label="Knock at ${ge(e.name)} for a treat" style="left:${s(t)};top:${s(n)}"><span>🎃</span></button>`}const Np=new Map;function i2(){const e=L("street");let t=document.getElementById("candyBucket");if(!Mm()){t?.remove();return}t||(t=document.createElement("div"),t.id="candyBucket",t.className="candyBucket",t.setAttribute("aria-live","polite"),e.appendChild(t));const n=xm(localStorage);t.innerHTML=`<span class="pail">🎃</span><b>${n}</b>`,t.setAttribute("aria-label",`${Pm(n,"treat")} in your bucket`)}function fT(e){const{treat:t}=JL(localStorage);i2(),et(e),C.pop();const n=document.createElement("span");n.className="treatPop",n.textContent=t,e.appendChild(n),setTimeout(()=>n.remove(),900);const s=document.getElementById("candyBucket");s&&et(s),v&&v.knock(e.dataset.knock)}function so(e=!1){if(R!=="street")return;const t=L("mapWorld"),n=cT(),s=v?n.map(u=>({id:u.id,name:u.name,style:u.style,locked:u.locked,mine:u.ownerId===v.pid,lit:!!v.players.get(u.ownerId)?.online})):Zd?Array.from({length:Zd},(u,p)=>({id:"fake"+p,name:["Reagan","Quinn","Chloe","Sloane","Cada","Emma","Olivia","Charlotte","Amelia","Sophia","Isabella","Mia"][p%12]+"'s House",style:p,locked:p===3,mine:p===0,lit:p%3!==1})):[null],o=aT()?dT(Math.max(1,s.length)):null;Ze=o?{w:o.w,h:o.h,portrait:!0}:{w:Qn,h:Nn,portrait:!1},document.body.classList.toggle("map-tall",!!o&&!document.body.classList.contains("phone"));const i=s2(),a=(Ze.portrait?"P":"L")+Ze.w+"x"+Ze.h+":"+i.toFixed(3)+JSON.stringify(n)+(v?n.map(u=>(v.players.get(u.ownerId)?.online?1:0)+(Qc(u.id)?"u":"")).join("")+v.pid:"solo");if(!e&&a===zp&&t.querySelector("#mapFaces")){ta();return}zp=a,t.style.width=Ze.w*i+"px",t.style.height=Ze.h*i+"px",t.style.setProperty("--sc",String(i)),t.innerHTML=`<div class="mapClip">${o?ny(o.w,o.h):ty()}</div>`;const r=t.querySelector(".mapClip");yo(r,o?"map-portrait":"map");const l=u=>u*i+"px";Lt.clear();const c=s.length;let d="",f="";if(o){const{hw:u,hh:p}=o,y=34,m=40;s.forEach((w,_)=>{const P=o.houses[_]??o.houses[0],$=w?`house:${w.id}`:"home",x=w?w.name:"My House";Lt.set(w?"house:"+w.id:"home",{x:P.x,y:P.y-p/2-8});const H=!!(w&&Qc(w.id)),V=P.x<o.w/2,Q=V?Math.max(4,P.x-u/2-y-8):Math.min(o.w-y-4,P.x+u/2+8),q=Math.max(4,Math.min(o.h-m-4,P.y-p*.42));d+=`<button class="mapSpot mapHouse ${w?.mine||!w?"mine":""}" data-go="${$}" aria-label="${ge(x)}" style="left:${l(P.x-u/2)};top:${l(P.y-p/2)};width:${l(u)};height:${l(p)}">${zr(w?w.style:0,{lit:w?w.lit:!0})}${w?.locked?'<span class="lockBadge">🔒</span>':""}${w?.mine||!w?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${H?"up":""}" data-mail="${w?w.id:"home"}" aria-label="${ge(x)} mailbox" style="left:${l(Q)};top:${l(q)};width:${l(y)};height:${l(m)}">${du(H)}</button>${Qp(w,V?P.x+u/2-30:P.x-u/2-10,P.y+p*.12,l)}`,f+=`<div class="mapSign ${w?.mine||!w?"mine":""}" style="left:${l(P.x)};top:${l(P.y+p/2+2)}">${ge(x)}</div>`});const k=(w,_,P,$,x,H,V,Q,q)=>{d+=`<button class="mapSpot ${w}" data-go="${_}" aria-label="${P}" style="left:${l(x-V/2)};top:${l(H-Q/2)};width:${l(V)};height:${l(Q)}">${$}</button>`,f+=`<div class="mapSign place" style="left:${l(x)};top:${l(H+q)}">${P==="The Park"?"Park":P==="Rainbow Ranch"?"Rainbow Ranch":"Clubhouse"}</div>`};k("mapPark","park","The Park",Bh,o.park.x,o.park.y,148,126,68),k("mapRanch","ranch","Rainbow Ranch",Dh,o.ranch.x,o.ranch.y,156,128,72),k("mapClub","gameroom","The Clubhouse",Hh,o.club.x,o.club.y,146,120,68),Lt.set("park",{x:o.park.x,y:o.park.y-78}),Lt.set("ranch",{x:o.ranch.x,y:o.ranch.y-80}),Lt.set("barn",{x:o.ranch.x,y:o.ranch.y+8}),Lt.set("gameroom",{x:o.club.x,y:o.club.y-74}),Lt.set("square",o.square);const b=[{x:o.park.x,y:o.park.y,r:90},{x:o.ranch.x,y:o.ranch.y,r:96},{x:o.club.x,y:o.club.y,r:88},{x:o.square.x,y:o.square.y,r:70},...o.houses.map(w=>({x:w.x,y:w.y,r:78}))],g=o.w/2;r.insertAdjacentHTML("beforeend",Oh(b,(w,_)=>Math.abs(w-g)<34,o.w,o.h)+iy(o.w,o.h,b)+d+'<div class="mapFaces" id="mapFaces"></div>')}else{const u=t.querySelector("#mapRoad"),p=u.getTotalLength(),y=Array.from({length:160},(_,P)=>u.getPointAtLength(p*P/159)),m=(_,P)=>y.some($=>Math.hypot($.x-_,$.y-P)<50),k=Gd(),b=c>8?80:94,g=b*300/320,w=a2(u,c,k);s.forEach((_,P)=>{const $=w[P],x=_?`house:${_.id}`:"home",H=_?_.name:"My House";Lt.set(_?"house:"+_.id:"home",{x:$.x,y:$.y-g/2-4});const V=!!(_&&Qc(_.id)),Q=34,q=40,se=14/i,Me=Math.max(4,Math.min(Qn-Q-4,$.x+b/2+se)),Ke=Math.max(4,Math.min(Nn-q-4,$.y-g*.22));d+=`<button class="mapSpot mapHouse ${_?.mine||!_?"mine":""}" data-go="${x}" aria-label="${ge(H)}" style="left:${l($.x-b/2)};top:${l($.y-g/2)};width:${l(b)};height:${l(g)}">${zr(_?_.style:0,{lit:_?_.lit:!0})}${_?.locked?'<span class="lockBadge">🔒</span>':""}${_?.mine||!_?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${V?"up":""}" data-mail="${_?_.id:"home"}" aria-label="${ge(H)} mailbox" style="left:${l(Me)};top:${l(Ke)};width:${l(Q)};height:${l(q)}">${du(V)}</button>${Qp(_,Math.max(4,$.x-b/2-40/i),$.y-g*.05,l)}`,f+=`<div class="mapSign ${_?.mine||!_?"mine":""}" style="left:${l($.x)};top:${l($.y+g/2-2)}">${ge(H)}</div>`}),d+=`<button class="mapSpot mapPark" data-go="park" aria-label="The Park" style="left:${l(os.x-100)};top:${l(os.y-85)};width:${l(200)};height:${l(170)}">${Bh}</button>`,f+=`<div class="mapSign place" style="left:${l(os.x)};top:${l(os.y+70)}">Park</div>`,d+=`<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${l(pn.x-110)};top:${l(pn.y-90)};width:${l(220)};height:${l(180)}">${Dh}</button>`,f+=`<div class="mapSign place" style="left:${l(pn.x)};top:${l(pn.y+78)}">Rainbow Ranch</div>`,d+=`<button class="mapSpot mapClub" data-go="gameroom" aria-label="The Clubhouse" style="left:${l(is.x-95)};top:${l(is.y-78)};width:${l(190)};height:${l(156)}">${Hh}</button>`,f+=`<div class="mapSign place" style="left:${l(is.x)};top:${l(is.y+82)}">Clubhouse</div>`,Lt.set("park",{x:os.x,y:os.y-60}),Lt.set("ranch",{x:pn.x-30,y:pn.y-60}),Lt.set("barn",{x:pn.x+10,y:pn.y+10}),Lt.set("gameroom",{x:is.x,y:is.y-52}),r.insertAdjacentHTML("beforeend",Oh(k,m)+d+'<div class="mapFaces" id="mapFaces"></div>')}t.insertAdjacentHTML("beforeend",f),i2(),ta(),rT(i),ta()}const Gd=()=>[{x:os.x,y:os.y,r:115},{x:pn.x,y:pn.y,r:125},{x:mn.x,y:mn.y,r:100},{x:is.x,y:is.y,r:90}];function a2(e,t,n){const s=e.getTotalLength(),o=[];for(let i=0;i<t;i++){const a=t===1?.2:.05+.75*i/(t-1),r=e.getPointAtLength(s*a),l=e.getPointAtLength(Math.min(s,s*a+3));let c=-(l.y-r.y),d=l.x-r.x;const f=Math.hypot(c,d)||1;c/=f,d/=f;const u=[1,-1].map(m=>({x:r.x+c*72*m,y:r.y+d*72*m})).map(m=>({...m,score:Math.min(...n.map(k=>Math.hypot(k.x-m.x,k.y-m.y)-k.r),m.x-50,Qn-50-m.x,m.y-60,Nn-40-m.y)})),p=i%2?u:[u[1],u[0]],y=p[0].score>0||p[0].score>=p[1].score?p[0]:p[1];y.x=Math.max(60,Math.min(Qn-60,y.x)),y.y=Math.max(62,Math.min(Nn-72,y.y)),n.push({x:y.x,y:y.y,r:70}),o.push({x:y.x,y:y.y})}return o}window.__mapFake=e=>{Zd=e,so(!0)};window.__mapLayout=e=>{const t=document.querySelector("#mapRoad");if(!t)return null;const n=a2(t,e,Gd());let s=1e9,o=1e9,i=!0;return n.forEach((a,r)=>{n.forEach((l,c)=>{c>r&&(s=Math.min(s,Math.hypot(a.x-l.x,a.y-l.y)))}),Gd().forEach(l=>{o=Math.min(o,Math.hypot(a.x-l.x,a.y-l.y)-l.r)}),(a.x<55||a.x>Qn-55||a.y<60||a.y>Nn-70)&&(i=!1)}),{n:e,minHouse:s,minSpot:o,inside:i}};function r2(e){return e.where==="house"&&e.houseId?{kind:"house",houseId:e.houseId,room:e.room}:e.where==="park"||e.where==="ranch"||e.where==="barn"||e.where==="gameroom"?{kind:e.where}:{kind:"square"}}const hT=e=>e.kind==="house"?"house:"+e.houseId:e.kind;function ta(){const e=document.getElementById("mapFaces");if(!e||R!=="street")return;const t=s2(),n=new Set,s=[];if(v){const i=[...v.presence.entries()],a=ye();a&&i.push([v.pid,a]);for(const[r,l]of i){const c=v.players.get(r);c&&s.push({key:r,look:c.look,name:c.nickname,mine:r===v.pid,place:r2(l)})}}else{const i=ee.get().characters[0];i&&s.push({key:"solo",look:La(i),name:"You",mine:!0,place:{kind:"square"}})}const o=new Map;for(const i of s){const a=hT(i.place);o.has(a)||o.set(a,[]),o.get(a).push(i)}for(const[i,a]of o)a.sort((r,l)=>r.mine?-1:l.mine?1:r.name.localeCompare(l.name)),a.forEach((r,l)=>{let c,d;const f=Lt.get("square")??{x:mn.x,y:mn.y};if(i==="square")if(Ze.portrait){const b=Math.floor(l/3),g=l%3,w=Math.min(3,a.length-b*3);c=f.x+(g-(w-1)/2)*176,d=f.y+b*112}else if(a.length===1)c=mn.x,d=mn.y;else{const m=-Math.PI/2+l*(Math.PI*2/a.length);c=mn.x+Math.cos(m)*78,d=mn.y+Math.sin(m)*78}else{const m=Lt.get(i)??f,k=Ze.portrait?2:3,b=Ze.portrait?150:64,g=Math.floor(l/k),w=l%k,_=Math.min(k,a.length-g*k);c=m.x+(w-(_-1)/2)*b,d=m.y-g*(Ze.portrait?108:64)}Ze.portrait&&(c=Math.max(100,Math.min(Ze.w-100,c)),d=Math.max(48,Math.min(Ze.h-84,d))),{fx:c,fy:d}=pT(c,d,t),n.add(r.key);let u=e.querySelector(`.mapFace[data-pid="${r.key}"]`);u||(u=document.createElement("button"),u.className="mapFace "+(r.mine?"mine":"other"),u.dataset.pid=r.key,u.setAttribute("aria-label",r.mine?"You":r.name),e.appendChild(u));const p=JSON.stringify(r.look)+r.name;if(u.dataset.look!==p){const m=u.querySelector(".bubble");u.innerHTML=`<span class="face">${nf(Mt(r.look))}</span><span class="fname">${ge(r.mine?"You":r.name)}</span>`,m&&u.appendChild(m),u.dataset.look=p}u.dataset.place=i;const y=Ze.portrait?62:46;u.style.left=(c-y/2)*t+"px",u.style.top=(d-y/2)*t+"px",u.style.width=u.style.height=y*t+"px"});e.querySelectorAll(".mapFace").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),So()}const uT=54;function pT(e,t,n){const s=document.querySelector("#mapWorld .mapFaces");if(!s)return{fx:e,fy:t};const o=s.getBoundingClientRect(),i=[...document.querySelectorAll("#mapWorld .mapMail, #mapWorld .mapKnock")].map(p=>p.getBoundingClientRect()).filter(p=>p.width>0).map(p=>({x:(p.left+p.width/2-o.left)/n,y:(p.top+p.height/2-o.top)/n})),a=uT/n,r=(p,y)=>!i.some(m=>Math.abs(m.x-p)<a&&Math.abs(m.y-y)<a);if(r(e,t))return{fx:e,fy:t};const l=a+.5,c=[e,...i.flatMap(p=>[p.x-l,p.x+l])],d=[t,...i.flatMap(p=>[p.y-l,p.y+l])];let f=null,u=1e9;for(const p of c)for(const y of d){if(p<24/n||p>Ze.w-24/n||y<24/n||y>Ze.h-24/n||!r(p,y))continue;const m=Math.hypot(p-e,y-t);m<u&&(u=m,f={fx:p,fy:y})}return f&&(e=f.fx,t=f.fy),{fx:e,fy:t}}function ph(){L("mapWorld").classList.remove("zoomIn")}function l2(e,t){ph(),C.swish(),gT(e)}function Va(e){Xn()||(e.classList.remove("sceneIn"),e.offsetWidth,e.classList.add("sceneIn"),setTimeout(()=>e.classList.remove("sceneIn"),260))}function gT(e){e.kind==="house"?f2(e.houseId,e.room):e.kind==="home"?d2():e.kind==="park"?MT():e.kind==="ranch"?_a(!1):e.kind==="barn"?_a(!0):e.kind==="gameroom"&&ET()}function mT(e){const t=v?.presence.get(e);if(!v||!t)return;const n=r2(t),s=v.players.get(e)?.nickname??"your friend";if(n.kind==="square"){F(`${s} is on the map too! 👋`),C.pop();return}document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`),l2(n),setTimeout(()=>{const o=ye();if(!o||!v)return;const i=t.x+(t.x>300?-110:110);if(n.kind==="house"&&o.where==="house")nt({...o,x:i,y:t.y}),bt(),ql(i-G/2);else if((n.kind==="park"||n.kind==="ranch"||n.kind==="barn")&&o.where===n.kind){an({...o,x:i,y:Math.max(ro,Math.min(jn,t.y)),flip:i>t.x});const a=n.kind==="park"?Hs():fn(),r=L(n.kind==="park"?"parkScroll":"ranchScroll");requestAnimationFrame(()=>{r.scrollLeft=t.x*a-r.clientWidth/2,dt()})}else if(n.kind==="gameroom"&&o.where==="gameroom"){const a=ci();a||an({where:"gameroom",x:i,y:Math.max(ro,Math.min(jn,t.y)),flip:i>t.x});const r=Os(),l=L("grScroll"),c=a?.x??t.x;requestAnimationFrame(()=>{l.scrollLeft=c*r-l.clientWidth/2,dt()})}F(`You found ${s}! 💕`)},420)}function Qc(e){if(!v)return!1;const t=v.houses.get(e);return!!t&&t.meta.ownerId===v.pid&&ff(t.confirmed.mailbox)>0}let fr=0;function c2(){k1();const e=document.getElementById("mailCue"),t=v?.myHouseId()??"",n=v&&t?ff(v.houses.get(t)?.confirmed.mailbox):0;if(!v||R!=="street"||n<=0){n<=0&&(fr=0),e?.classList.remove("show");return}fr!==n&&(fr=n,e?.classList.add("show"),window.setTimeout(()=>{fr===n&&e?.classList.remove("show")},8e3))}function Yl(){const e=v?.myHouseId()??"",t=v&&e?ff(v.houses.get(e)?.confirmed.mailbox):0,n=L("menuBadge");n.textContent=t>9?"9+":String(t),n.classList.toggle("on",t>0);const s=document.getElementById("mailNew");s&&(s.textContent=t>0?t===1?"1 new":t+" new":"",s.classList.toggle("on",t>0));const o=v?v.presence.size:0,i=L("mapBadge");i.textContent=o>9?"9+":String(o),i.classList.toggle("on",o>0),L("btnMap").setAttribute("aria-label",o>0?`Map, ${Pm(o,"friend")} online`:"Map");const a=Gl(),r=L("chatBadge");r.textContent=a>9?"9+":String(a),r.classList.toggle("on",a>0)}function ll(e){e&&document.querySelectorAll(".toast").forEach(t=>t.remove()),L("menuPop").classList.toggle("hidden",!e),L("btnMenu").setAttribute("aria-expanded",e?"true":"false"),L("btnPhoto").classList.toggle("ok",R==="house"),e&&Yl(),yT()}L("btnPhoto").addEventListener("click",()=>{ll(!1),requestAnimationFrame(()=>requestAnimationFrame(()=>{FL(Y,()=>C.click())}))});function yT(){const e=L("houseTag");if(e.style.top="",!e.classList.contains("show")||L("menuPop").classList.contains("hidden"))return;const t=document.querySelector(".menuCard");if(!t)return;const n=L("stageWrap").getBoundingClientRect(),s=t.getBoundingClientRect(),o=e.getBoundingClientRect();if(!(o.top<s.bottom-2&&o.bottom>s.top+2&&o.left<s.right-2&&o.right>s.left+2))return;const a=s.bottom-n.top+8;a+o.height<n.height-8?e.style.top=a+"px":e.style.top=Math.max(8,n.height-o.height-10)+"px"}L("btnMenu").addEventListener("click",()=>{ll(L("menuPop").classList.contains("hidden")),C.click()});L("menuPop").addEventListener("click",e=>{const t=e.target;if(t.id==="menuPop"||t.closest("#menuClose")){ll(!1);return}t.closest(".menuRow")&&ll(!1)});L("btnStudio").addEventListener("click",()=>B1());L("btnMail").addEventListener("click",()=>{const e=v?.myHouseId();e?gh(e):F("Join a street to send letters!")});L("secrets").addEventListener("click",()=>{if(R!=="house"){F("Surprises are hiding in your house!");return}Se.isPlay()&&L("modeDecorate").click(),Bt="secrets",zt(),F("Surprises are in your drawer!")});function gh(e){if(!v||e==="home"||!v.houses.has(e)){F("Join a street to send letters!");return}const t=v.houses.get(e);Er.open(e,t.meta.name,t.meta.ownerId===v.pid,t.confirmed.mailbox?.letters??[]),C.click()}L("mapWorld").addEventListener("click",e=>{const t=e.target;if(R!=="street")return;const n=t.closest(".mapKnock");if(n){fT(n);return}const s=t.closest(".mapMail");if(s){gh(s.dataset.mail||"home");return}const o=t.closest(".mapFace");if(o){o.classList.contains("mine")?(et(o),C.pop(),F("That's you! Tap a place to go there")):mT(o.dataset.pid);return}const i=t.closest("[data-go]");if(!i)return;const a=i.dataset.go;l2(a.startsWith("house:")?{kind:"house",houseId:a.slice(6)}:{kind:a})});function To(){ph(),Om(),L("street").classList.add("hidden"),L("park").classList.add("hidden"),L("ranch").classList.add("hidden"),L("gameroom").classList.add("hidden"),xr()?.close(),L("chatTray").classList.add("hidden"),L("sheet").classList.add("hidden")}function jo(){ph(),ze=null,At=[],qe=!1,v?nt({where:"street",x:600,y:540,flip:!1}):Vt=null,To(),R="street",L("street").classList.remove("hidden"),L("streetTitle").textContent=v?"Our Neighborhood":"My Map",xn(),so(!0);const e=L("mapWorld");e.style.transformOrigin="50% 50%",e.classList.remove("zoomIn","mapIn"),Xn()||(e.offsetWidth,e.classList.add("mapIn")),C.swish()}function d2(){if(v){const e=v.myHouseId();e&&v.houses.has(e)&&f2(e);return}To(),R="house",Vt=null,Se.sync(!0),xn(),$o(),Va(L("stageWrap")),C.sparkle(),Ps()}function f2(e,t="living"){if(!v||!v.houses.has(e))return;me=e,R="house",qe=!1,Se.sync(e===v.myHouseId());let n=el.get(e);n||(n=Tk(v,e,{get:()=>ee.get().soundOn,set:s=>ee.dispatch({type:"settings/sound",on:s})}),el.set(e,n)),n.dispatch({type:"room/switch",room:t});{const s=hh(e,t,{x:900+Math.random()*300,y:540});nt({where:"house",houseId:e,room:t,x:s.x,y:s.y,flip:!1})}To(),t2(n),Va(L("stageWrap")),C.sparkle(),Ps()}function mh(){v?.close(),v=null,el=new Map,R="house",me="",Vt=null,ze=null,At=[],qe=!1,L("elsewhere").classList.add("hidden"),To(),Se.sync(!0),t2(ee),xn()}L("btnMap").addEventListener("click",()=>{if(R==="street"){C.pop();return}jo()});L("btnHome").addEventListener("click",()=>{if(R==="house"&&(!v||me===v.myHouseId())){C.pop();return}d2()});L("phoneOk").addEventListener("click",()=>{L("phoneNote").classList.add("hidden"),C.click()});L("elsewhereGo").addEventListener("click",()=>{C.click(),v?.connect()});L("btnSolo").addEventListener("click",()=>{mh(),F("Playing in your own house 🏠")});window.addEventListener("resize",()=>{R==="street"&&so(!0),R==="park"&&wh(),R==="ranch"&&Lh(),R==="gameroom"&&jf(),dt()});function yh(e){v=e,el=new Map,e.on("players",()=>{v===e&&(R==="street"?so():R==="park"?xo():R==="ranch"?(xs(),Sh()):R==="gameroom"?Xi():(bt(),xn()),ka==="dress"&&gn())}),e.on("houses",()=>{v===e&&(R==="street"?so():R==="house"&&!e.houses.has(me)&&(F("That house is gone now"),jo()))}),e.on("houseMeta",n=>{v!==e||n!==me||R!=="house"||(Ne=null,xn(),Pt(S.get()),zt(),ht()||L("sheet").classList.add("hidden"))}),e.on("pres",()=>{v===e&&(R==="street"?ta():R==="park"?xo():R==="ranch"?xs():R==="gameroom"?Xi():bt())}),e.on("art",(n,s)=>{if(!(v!==e||!s||typeof s!="object")){for(const[o,i]of Object.entries(s)){e1(o,i);const a=Sr.get(o);a&&(Sr.delete(o),R==="house"&&a.houseId===me&&W1(a.room,o,a.frame,a.x))}R==="house"&&n===me&&Pt(S.get())}}),e.on("artFail",(n,s,o)=>{v===e&&(Sr.delete(s),o==="full"?F("Your walls are full of art! Take one down to hang a new one."):o==="streetfull"?F("The street is full of art! Take one down to hang a new one."):o==="slow"?F("So much art! Wait a moment, then hang it again."):o==="locked"&&F("This house is closed right now. Paint at home!"))}),e.on("ranch",()=>{v===e&&R==="ranch"&&nc(!0)}),e.on("ranchFail",n=>{v===e&&Kd(n)}),e.on("noride",()=>{if(v!==e)return;const n=ye();if(n?.ride!==void 0){const{ride:s,...o}=n;nt(o),xs()}F("Someone is riding that horse!")}),e.on("fx",(n,s)=>{v===e&&GT(n,s)}),e.on("bubble",(n,s)=>{v===e&&oT(n,s)}),e.on("knocked",(n,s)=>{if(v!==e)return;const o=Date.now();(Np.get(s)??0)>o-2e4||(Np.set(s,o),F(e7(s)))}),e.on("sayFail",n=>F(n==="presetsOnly"?"Typing is off. Pick a bubble!":Tl[n]||"Couldn't send that. Try again!")),e.on("mailbox",()=>{v===e&&(R==="street"&&so(!0),c2(),Er.refresh(),Yl())}),e.on("mailFail",n=>{v===e&&Er.fail(n)}),e.on("settings",()=>{v===e&&(L("chatTray").classList.contains("hidden")||n2(),Er.refresh())}),e.on("removed",()=>{F("A grown-up took this iPad off the street");const n=e.cfg;Vn({url:n.url,code:n.code,id:n.id,parentKey:n.parentKey}),mh()}),e.on("status",n=>{v===e&&(document.body.classList.toggle("reconnecting",n!=="online"&&!e.replaced),(n==="online"||n==="connecting")&&L("elsewhere").classList.add("hidden"))}),e.on("replaced",()=>{v===e&&L("elsewhere").classList.remove("hidden")}),e.on("table",()=>{if(v===e){if(R==="gameroom"){const n=ci(),s=ye();n&&s?.where==="gameroom"&&Math.hypot(s.x-n.x,s.y-n.y)>40&&nt({where:"gameroom",x:n.x,y:Math.max(ro,Math.min(jn,n.y)),flip:s.flip}),Xi()}xr()?.refresh()}}),e.on("tblFail",(n,s)=>{v===e&&xr()?.fail(n,s)}),e.on("welcome",()=>{if(v===e)if(R==="street")so(!0);else if(R==="park"||R==="ranch"){const n=ye();n&&nt(n),R==="park"?wh():Lh(),dt()}else if(R==="gameroom"){const n=ye();n&&nt(n),jf(),dt(),xr()?.refresh()}else e.houses.has(me)?$o():jo()}),e.on("reset",(n,s,o)=>{if(v!==e)return;const i=U7(s,o);i&&F(i)});const t=Q7(5e3);e.on("act",(n,s,o,i)=>{if(v!==e||R!=="house"||n!==me||!o||o===e.pid||s.type!=="item/move"&&s.type!=="item/delete"||s.room!==S.get().currentRoom||!t(o+":"+s.id))return;const a=z7(e.players.get(o)?.nickname??"",s,de[i]?.name??"");a&&F(a,2e3)}),jo()}async function bT(){xn();const e=Pl(),t=Go();if(!e||!t?.token||t.url!==e)return;const n=new Al(t),s=await n.connect();s==="ok"?yh(n):(n.close(),s!=="closed"&&F("Couldn't reach the street. Playing at home!"))}function Yt(e,t,n=""){const s=document.createElement("div");s.className="sheet hoodSheet "+n,s.innerHTML=`<div class="card">${e}</div>`,document.body.appendChild(s),C.swish();const o=()=>s.remove();return s.addEventListener("click",i=>{const a=i.target;if(a===s||a.closest('[data-m="close"]'))return o();t(a,o,s)}),{root:s,close:o}}const Kt='<button class="close" data-m="close">✕</button>';L("btnHood").addEventListener("click",()=>wT());function wT(){const e=Pl();if(!e){Yt(`${Kt}<h2>Neighborhood</h2><p class="hint">The street isn't open yet. Ask a grown-up to set it up!</p>`,()=>{});return}const t=Go()?.url===e?Go():null;Yt(`${Kt}<h2>Neighborhood</h2><div class="bigBtns">
      ${t?.token?`<button class="big go" data-m="go">${Dt.street}<span>Go to my street</span></button>`:`<button class="big go" data-m="join">${Dt.street}<span>Join a friend's street</span></button>`}
      <button class="big grown" data-m="create">${Dt.shield}<span>${t?.parentKey?"Grown-ups":"Grown-ups: start a street"}</span></button></div>`,async(n,s)=>{const o=n.closest("[data-m]")?.dataset.m;if(o==="go"){s();const i=new Al(t),a=await i.connect();a==="ok"?yh(i):(i.close(),F(a.startsWith("badtoken")?"Let's join again. Tap your name!":"Couldn't reach the street. Try again!"))}o==="join"&&(s(),na(e)),o==="create"&&(s(),await Z0()&&(t?.parentKey?Kl():kT(e)))})}async function kT(e){let t;try{t=await _k(e)}catch{F("Couldn't create a street right now");return}Vn({url:e,code:t.code,id:t.id,parentKey:t.parentKey}),Yt(`${Kt}<h2>Your street is ready!</h2><p class="hint">Kids join with this code (you can pick your own on the grown-up screen):</p><div class="code" id="newCode">${t.code}</div>
    <p class="hint small">Grown-up key (keep it private; it opens the grown-up screen on another device):<br><b class="key" id="parentKey">${t.parentKey}</b></p>
    <div class="bigBtns"><button class="big grown" data-m="setup">${Dt.shield}<span>Add kids' names &amp; code</span></button>
    <button class="big go" data-m="joinhere">${Dt.street}<span>Join on this iPad</span></button></div>`,(n,s)=>{n.closest('[data-m="joinhere"]')&&(s(),bh(e,t.code)),n.closest('[data-m="setup"]')&&(s(),Kl())})}function na(e,t=""){const n=Yt(`${Kt}<h2>Join a street</h2><p class="hint">Type the code a grown-up gave you</p>
    <form id="codeForm" class="codeForm"><input id="codeInput" maxlength="${_f}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="CODE"/><button type="submit" class="go">Next</button></form>
    <p class="err">${ge(t)}</p>`,()=>{}),s=n.root.querySelector("#codeInput");setTimeout(()=>s.focus(),50),s.addEventListener("input",()=>{s.value=Dr(s.value)}),n.root.querySelector("#codeForm").addEventListener("submit",o=>{o.preventDefault();const i=Dr(s.value);if(!Sw(i)){n.close(),na(e,"Hmm, that code doesn't look right. Check it and try again!");return}n.close(),bh(e,i)})}async function bh(e,t,n=""){let s;try{s=await $k(e,t)}catch{na(e,"Couldn't reach the street. Try again!");return}if("slow"in s){na(e,"Too many tries. Ask a grown-up and try again in a few minutes.");return}if(!s.exists){na(e,"Hmm, we couldn't find that street. Check the code with a grown-up.");return}window.__lastLookupId=s.id,vT(e,t,s.id,s.roster,n)}function vT(e,t,n,s,o=""){if(s.length){Yt(`${Kt}<h2>Who are you?</h2>${o?`<p class="err">${ge(o)}</p>`:s.every(i=>i.claimed)?`<p class="err" id="allSignedIn">${N7}</p>`:'<p class="hint">Tap your name</p>'}<div class="nicks roster">${s.map((i,a)=>`<button data-nick="${a}" ${i.claimed?"disabled":""}>${ge(i.name)}${i.claimed?"<small>signed in</small>":""}</button>`).join("")}</div>
      <p class="hint small">Not on the list? Ask a grown-up to add your name.</p>`,(i,a)=>{const r=i.closest("[data-nick]");if(!r||r.disabled)return;a();const l=s[+r.dataset.nick];l.hasHouse?h2(e,t,n,l.name,void 0):qp(e,t,n,l.name)},"wide");return}Yt(`${Kt}<h2>Pick your street name</h2>${o?`<p class="err">${ge(o)}</p>`:""}<div class="nicks">${tu.map((i,a)=>`<button data-nick="${a}">${ge(i)}</button>`).join("")}</div>`,(i,a)=>{const r=i.closest("[data-nick]");r&&(a(),qp(e,t,n,tu[+r.dataset.nick]))},"wide")}function qp(e,t,n,s){Yt(`${Kt}<h2>Hi, ${ge(s)}!</h2><p class="hint">What should your house on the street be?</p>
    <div class="bigBtns"><button class="big go" data-m="bring">${zr(2)}<span>Bring my house</span></button>
    <button class="big" data-m="fresh">${zr(5)}<span>Start a new one</span></button></div>`,(o,i)=>{const a=o.closest("[data-m]")?.dataset.m;a&&(i(),h2(e,t,n,s,a==="bring"))})}function _T(e,t){const n=e.myHouseId();if(!n)return;let s=0;for(const o of O1(t)){const i=yE(o);i&&s++<Ui&&e.saveArt(n,o,i)}s>Ui&&F(`Your first ${Ui} paintings came along. The rest stay safe on this iPad!`)}async function h2(e,t,n,s,o){const i=ee.get(),a=i.characters[0],r=La(a??{});let l;if(o&&(l=i,a)){const{reduce:y}=await Cs(()=>h(()=>Promise.resolve().then(()=>tw),void 0));l=y(i,{type:"char/delete",id:a.id})}const c=Go(),d={url:e,code:t,id:n,parentKey:c?.id===n||c?.code===t?c.parentKey:void 0},f=i.dog?{name:i.dog.name,breed:i.dog.breed}:null,u=new Al(d),p=await u.connect({nickname:s,look:r,house:l,dog:f});if(p==="ok"){Vn(u.cfg),yh(u),F(`Welcome to the street, ${s}!`),l&&_T(u,l),AL()&&(RL(),De=mt,ni("dress"));return}u.close(),p.startsWith("nickname")?bh(e,t,p.endsWith("notOnList")?"That name is not on the list anymore.":"That name is already signed in on another iPad. Ask a grown-up!"):F(p==="full"?"That street is full right now. Try again later!":"Couldn't join right now. Try again in a minute!")}L("btnParent").addEventListener("click",async()=>{await Z0()&&Kl()});const $T={codeTaken:"That code is already used by another street. Try adding a number!",badCode:"Codes are 4–16 letters or numbers.",badName:"Use a first name only (letters).",rosterFull:`Up to ${Tw} names.`,nameInUse:"Remove that player first.",codeFixed:"This street's code can't be changed."};async function Kl(){const e=Go();if(!e)return;if(!e.parentKey){const l=Yt(`${Kt}<h2>Grown-up key</h2><p class="hint">Enter the key you got when the street was made</p><form id="keyForm" class="codeForm"><input id="keyInput" autocomplete="off" spellcheck="false"/><button class="go">OK</button></form>`,()=>{});l.root.querySelector("#keyForm").addEventListener("submit",c=>{c.preventDefault(),e.parentKey=l.root.querySelector("#keyInput").value.trim(),Vn(e),v&&(v.cfg.parentKey=e.parentKey),l.close(),Kl()});return}let t=v;t||(t=new Al({...e,token:void 0}),await t.connect());const n=t,s=l=>a.root.querySelector(l).value;let o=[];const i=l=>{const c=l.trim().replace(/\s+/g," "),d=o.find(f=>f.toLowerCase()===c.toLowerCase());if(d){F(q7(d));return}n.parent({op:"rosterAdd",name:l})},a=Yt(`${Kt}<h2>Grown-up screen</h2><div id="parentBody"><p class="hint">Loading…</p></div>`,async l=>{const c=l.closest("[data-p]");if(!c)return;const d=c.dataset.p;if(d==="free"&&n.parent({op:"freeChat",on:c.dataset.on!=="1"}),d==="freeMail"&&n.parent({op:"freeMail",on:c.dataset.on!=="1"}),d==="rename"&&n.parent({op:"rename",houseId:c.dataset.hid,name:s(`input[data-hid="${c.dataset.hid}"]`)}),d==="add"&&i(c.dataset.name??s("#rosterInput")),d==="unname"&&n.parent({op:"rosterRemove",name:c.dataset.name}),d==="unclaim"){if(c.dataset.sure!=="1"){c.dataset.sure="1",c.textContent="Tap again";return}n.parent({op:"unclaim",name:c.dataset.name})}if(d==="setcode"&&n.parent({op:"setCode",code:s("#codeEdit")}),d==="remove"){if(c.dataset.sure!=="1"){c.dataset.sure="1",c.textContent="Tap again to remove";return}n.parent({op:"remove",pid:c.dataset.pid})}if(d==="mailClear"||d==="mailClearAll"){if(c.dataset.sure!=="1"){c.dataset.sure="1",c.textContent=d==="mailClearAll"?"Tap again to clear every mailbox":c.dataset.id?"Tap again":"Tap again to clear this mailbox";return}d==="mailClearAll"?n.parent({op:"mailClearAll"}):n.parent({op:"mailClear",houseId:c.dataset.hid,...c.dataset.id?{id:c.dataset.id}:{}})}if(d==="leave"){if(c.dataset.sure!=="1"){c.dataset.sure="1",c.textContent="Tap again: forget this street here";return}Vn(null),a.close(),mh(),F("This iPad left the street")}},"wide parent");a.root.addEventListener("submit",l=>{l.preventDefault();const c=l.target.id;c==="rosterForm"&&i(s("#rosterInput")),c==="codeForm2"&&n.parent({op:"setCode",code:s("#codeEdit")})});const r=l=>{const c=new Date(l);return Number.isFinite(c.getTime())?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][c.getMonth()]+" "+c.getDate()+", "+c.getFullYear():""};n.on("parentInfo",l=>{const c=a.root.querySelector("#parentBody");if(!c)return;const d=Go();d&&d.code!==l.code&&(d.code=l.code,Vn(d)),n.cfg.code=l.code;const f=l.roster??[];o=f.map(w=>w.name);const u=new Set(f.map(w=>w.name.toLowerCase())),p=Pw.filter(w=>!u.has(w.toLowerCase())),y=f[0]?.name??"Reagan",m=Array.isArray(l.mail)?l.mail:[],k=m.some(w=>w.letters&&w.letters.length),b=H0(l.settings),g=m.map(w=>`<div class="pMailHouse"><div class="pMailName">${ge(w.name||"House")}</div>${(w.letters||[]).slice().reverse().map(_=>`<div class="pLetter"><b>${ge(_.from)}</b><span class="pWhen">${ge(r(_.at))}</span><p>${ge(_.text)}</p><button type="button" class="danger" data-p="mailClear" data-hid="${ge(w.houseId)}" data-id="${ge(_.id)}">Clear</button></div>`).join("")||'<p class="hint">No letters.</p>'}${(w.letters||[]).length?`<button type="button" class="danger" data-p="mailClear" data-hid="${ge(w.houseId)}">Clear this mailbox</button>`:""}</div>`).join("");c.innerHTML=`${l.note?`<p class="err" id="pNote">${ge($T[l.note]??l.note)}</p>`:""}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${ge(l.code)}</div></div>
        <div><div class="label">Free typing</div><button class="toggle ${l.settings.freeChat?"on":""}" data-p="free" data-on="${l.settings.freeChat?1:0}" id="pFree">${l.settings.freeChat?"On":"Off (presets only)"}</button><p class="hint small">Chat bubbles. Off means preset phrases only.</p></div>
        <div><div class="label">Let kids type their own letters</div><button class="toggle ${b?"on":""}" data-p="freeMail" data-on="${b?1:0}" id="pFreeMail">${b?"On":"Off (presets only)"}</button><p class="hint small">Letters only. Off means preset phrases only.</p></div></div>
      <div class="label">Letters</div><div id="parentMail">${g||'<p class="hint">No letters right now.</p>'}${k?'<button type="button" class="danger" data-p="mailClearAll" id="mailClearAll">Clear every mailbox</button>':""}</div>
      <form class="pAdd" id="codeForm2"><input id="codeEdit" maxlength="${_f}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="e.g. ${ge(Dr(y))}7"/><button data-p="setcode" type="button">Use this code</button></form>
      <p class="hint small">Tip: a word plus a number (like ${ge(Dr(y))}7) is easy to remember and harder to guess. Not case-sensitive.</p>
      <div class="label">Kids' names (sign-in list)</div>
      <div class="roster">${f.map(w=>`<span class="rName ${w.claimed?"claimed":""}"><b>${ge(w.name)}</b>${w.claimed?`<i>signed in</i><button data-p="unclaim" data-name="${ge(w.name)}">Reset</button>`:w.hasHouse?"<i>not signed in</i>":`<button class="x" data-p="unname" data-name="${ge(w.name)}" aria-label="Remove name">×</button>`}</span>`).join("")||'<p class="hint">No names yet: kids pick a fun nickname instead.</p>'}</div>
      <form class="pAdd" id="rosterForm"><input id="rosterInput" maxlength="20" autocomplete="off" placeholder="First name"/><button data-p="add" type="button">Add</button></form>
      ${p.length?`<div class="sugg">${p.map(w=>`<button data-p="add" data-name="${w}">+ ${w}</button>`).join("")}</div>`:""}
      <div class="label">Houses</div>${l.houses.map(w=>`<div class="pHouse"><input data-hid="${w.id}" value="${ge(w.name)}" maxlength="24"/><button data-p="rename" data-hid="${w.id}">Rename</button></div>`).join("")||'<p class="hint">No houses yet.</p>'}
      <div class="label">Players</div>${l.players.map(w=>`<div class="pPlayer"><span class="dot ${w.online?"on":""}"></span>${ge(w.nickname)}<button class="danger" data-p="remove" data-pid="${w.pid}">Remove</button></div>`).join("")||'<p class="hint">Nobody has joined yet.</p>'}
      <p class="hint small">Letters stay on the server for up to 30 days. They are filtered, and only a first name is stored. You can clear them here, or turn off “Let kids type their own letters” so new letters use preset phrases. Chat bubbles are only relayed to kids standing nearby and are not saved. No emails or last names. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays).</p>
      <button class="danger wideBtn" data-p="leave">Forget this street on this device</button>`}),n.on("error",l=>{l==="badkey"&&(F("That grown-up key didn't work"),e.parentKey=void 0,Vn(e),a.close())}),n.parent({op:"info"})}let Vt=null;function Hs(){return L("park").clientHeight/Tf}const xT=()=>{const e=ee.get();return e.characters.find(t=>t.id===e.dog?.owner)??e.characters[0]},Mn=()=>v?ye():Vt;function an(e){v?nt(e):Vt=e,R==="ranch"?xs():R==="gameroom"?Xi():xo()}function ks(e="park"){if(v){const n=[],s=[...v.presence.entries()],o=ye();o&&s.push([v.pid,o]);for(const[i,a]of s){const r=v.players.get(i);r&&a.where===e&&n.push({key:i,look:r.look,name:r.nickname,p:a,mine:i===v.pid,dog:r.dog??null})}return n}const t=xT();return Vt&&Vt.where===e?[{key:"solo",look:La(t??{}),name:"",p:Vt,mine:!0,dog:ee.get().dog??null}]:[]}function wh(){const e=Hs(),t=L("parkWorld"),n=s=>s*e+"px";t.style.width=xf*e+"px",t.style.height=Tf*e+"px",t.style.setProperty("--sc",String(e)),t.innerHTML=x4()+dd.map((s,o)=>s.kind==="swing"?`<div class="swing" data-swing="${o}" style="left:${n(s.x-30)};top:${n(en)};width:${n(60)};height:${n(240)}">${M4}</div>`:"").join("")+dd.map((s,o)=>`<button class="pspot k-${s.kind}" data-spot="${o}" aria-label="${s.kind}" style="left:${n(s.x-50)};top:${n(s.y-(s.kind==="swing"?70:55))};width:${n(100)};height:${n(s.kind==="swing"?90:65)}"></button>`).join("")+`<button class="pspot slide" data-act="slide" aria-label="Slide" style="left:${n(we.ladder-45)};top:${n(we.top.y-30)};width:${n(130)};height:${n(560-we.top.y+30)}"></button><button class="pspot pond" data-act="splash" aria-label="Pond" style="left:${n(1235)};top:${n(462)};width:${n(370)};height:${n(105)}"></button><button class="pspot gate" data-act="exit" aria-label="Back to the street" style="left:${n(25)};top:${n(240)};width:${n(180)};height:${n(260)}"></button><div class="ripples" id="ripples"></div><button class="ball" id="ball" aria-label="Ball">${L4}</button><div class="savatars" id="pavatars"></div>`,yo(t,"park"),cl(),xo(),dt()}const jp=2400;function xo(){const e=document.getElementById("pavatars");if(!e||R!=="park")return;const t=Hs(),n=new Set,s=new Set;for(const o of ks()){n.add(o.key);let i=e.querySelector(`.savatar[data-pid="${o.key}"]`);i||(i=document.createElement("div"),i.className="savatar "+(o.mine?"mine":"other"),i.dataset.pid=o.key,e.appendChild(i),o.mine&&u2(i));const a=JSON.stringify(o.look)+o.name;if(i.dataset.look!==a){const f=i.querySelector(".bubble");i.innerHTML=o.name?uh(o.look,o.name):`<div class="inner">${Mt(o.look)}</div>`,f&&i.appendChild(f),i.dataset.look=a}const r=(mo[o.look.size]??1)*t*.95,l=Bs*r,c=$n*r;Vl(i,o.p.x*t-l/2+"px",o.p.y*t-c+"px"),i.style.width=l+"px",i.style.height=c+"px",i.style.zIndex=String(100+Math.round(o.p.y)),i.classList.toggle("flipped",o.p.flip),Aa(i,o.look,o.mine);const d=o.p.pose??"";i.dataset.pose!==d&&(i.classList.remove("pose-sit","pose-swing","pose-slide"),i.offsetWidth,d==="slide"&&(i.style.setProperty("--sx",(we.top.x-we.bottom.x)*t+"px"),i.style.setProperty("--sy",(we.top.y-we.bottom.y)*t+"px")),d&&i.classList.add("pose-"+d),i.dataset.pose=d),d==="swing"?(i.style.transformOrigin=`50% ${(en-o.p.y)*t+c}px`,i.style.animationDelay=-(Date.now()%jp)/1e3+"s",s.add(o.p.spot??-1)):(i.style.transformOrigin="",i.style.animationDelay="")}e.querySelectorAll(".savatar").forEach(o=>{n.has(o.dataset.pid)||o.remove()}),document.querySelectorAll("#parkWorld .swing").forEach(o=>{const i=s.has(+o.dataset.swing);i&&!o.classList.contains("swinging")&&(o.style.animationDelay=-(Date.now()%jp)/1e3+"s"),o.classList.toggle("swinging",i)}),So()}function u2(e){e.addEventListener("pointerdown",t=>{t.preventDefault(),t.stopPropagation();const n=Mn();if(!n||n.where!=="park"&&n.where!=="ranch"&&n.where!=="barn")return;const s=n.where!=="park",o=n.where;At=[];const i=L(s?"ranchScroll":"parkScroll"),a=s?fn():Hs(),r=o==="barn"?rf:s?xa:xf,l=w=>{const _=L(s?"ranchWorld":"parkWorld").getBoundingClientRect();return{x:(w.clientX-_.left)/a,y:(w.clientY-_.top)/a}},c=l(t),d={x:n.x-c.x,y:n.y-c.y};let f=t,u=0,p=n.x,y=!1;const m=w=>{const _=l(w),P=Mn();if(!P)return;const $=Math.max(60,Math.min(r-60,_.x+d.x)),x=Math.max(470,Math.min(590,_.y+d.y));if(!y&&Math.hypot($-P.x,x-P.y)<6)return;y=!0;const H=Math.abs($-p)>3?$<p:P.flip;Math.abs($-p)>3&&(p=$),an(o==="barn"?{where:"barn",x:$,y:x,flip:H}:s?{where:"ranch",x:$,y:x,flip:H,...P.ride!==void 0?{ride:P.ride}:{}}:{where:"park",x:$,y:x,flip:H})},k=()=>{const w=i.getBoundingClientRect(),_=f.clientX<w.left+70?-10:f.clientX>w.right-70?10:0;_&&y&&(i.scrollLeft+=_,m(f)),u=requestAnimationFrame(k)};u=requestAnimationFrame(k),e.classList.add("lifted"),C.pick();const b=w=>{w.pointerId===t.pointerId&&(f=w,m(w))},g=w=>{w.pointerId===t.pointerId&&(cancelAnimationFrame(u),window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",g),e.classList.remove("lifted"),C.drop())};window.addEventListener("pointermove",b),window.addEventListener("pointerup",g)})}L("parkWorld").addEventListener("pointerdown",e=>{e.target.closest(".pspot, .ball, .pet")&&e.stopPropagation()});L("parkWorld").addEventListener("click",e=>{const t=e.target,n=Mn();if(!n)return;if(t.closest("#ball")){ze||C.boing(),ST();return}const s=t.closest("[data-spot]");if(s){const i=+s.dataset.spot,a=dd[i];if(n.spot===i&&n.pose){an({where:"park",x:a.x,y:Math.min(590,a.y+40),flip:n.flip}),C.drop();return}if(ks().some(r=>!r.mine&&r.p.spot===i&&r.p.pose)){F("Someone is already there!"),C.pop();return}an({where:"park",x:a.x,y:a.y,flip:n.flip,pose:a.kind==="swing"?"swing":"sit",spot:i}),a.kind==="swing"?C.boing():C.drop();return}const o=t.closest("[data-act]")?.dataset.act;if(o==="slide"&&(an({where:"park",x:we.bottom.x,y:we.bottom.y,flip:!1,pose:"slide"}),C.swish(),setTimeout(()=>{const i=Mn();i?.pose==="slide"&&an({where:"park",x:i.x,y:i.y,flip:i.flip})},1500)),o==="splash"){const i=L("parkWorld").getBoundingClientRect(),a=(e.clientX-i.left)/Hs();p2(a),v?.fx({k:"splash",x:a})}o==="exit"&&g2()});function p2(e){const t=document.getElementById("ripples");if(!t||R!=="park")return;const n=Hs();for(let s=0;s<2;s++){const o=document.createElement("div");o.className="ripple";const i=(120+s*70)*n;Object.assign(o.style,{left:e*n-i/2+"px",top:512*n-i*.18+"px",width:i+"px",height:i*.36+"px",animationDelay:s*.15+"s"}),t.appendChild(o),setTimeout(()=>o.remove(),1400)}for(let s=0;s<6;s++){const o=document.createElement("div");o.className="drop",Object.assign(o.style,{left:e*n+"px",top:505*n+"px"}),o.style.setProperty("--dx",(s-2.5)*14+"px"),t.appendChild(o),setTimeout(()=>o.remove(),900)}C.splash()}function MT(){To(),At=[],qe=!1,R="park",L("park").classList.remove("hidden"),Va(L("park"));const e={where:"park",x:290,y:548,flip:!1};v?nt(e):Vt=e,L("streetTitle").textContent="The Park",xn(),wh(),requestAnimationFrame(()=>{const t=L("parkScroll");t.scrollLeft=0,dt()}),C.sparkle()}function g2(){jo()}function LT(){return oc()&&!document.body.classList.contains("phone")}function Fp(){return oc()?520:280}function ET(){To(),At=[],qe=!1,R="gameroom",L("gameroom").classList.remove("hidden");const e=ci(),t=e?{where:"gameroom",x:e.x,y:Math.max(ro,Math.min(jn,e.y)),flip:!1}:{where:"gameroom",x:Fp(),y:560,flip:!1};v?nt(t):Vt=t,L("streetTitle").textContent="The Clubhouse",xn(),jf(),requestAnimationFrame(()=>{const n=Os(),s=L("grScroll"),o=e?.x??(LT()?l1/2:Fp());s.scrollLeft=Math.max(0,o*n-s.clientWidth/2),dt(),U2()}),Va(L("gameroom")),C.sparkle()}L("btnLeavePark").addEventListener("click",()=>{R==="ranch"&&qe?_a(!1):g2()});let ds={x:2620,y:565},ze=null;function cl(e=!1){const t=document.getElementById("ball");if(!t)return;const n=Hs(),s=34*n;e||t.classList.remove("flying"),t.style.left=ds.x*n-s/2+"px",t.style.top=ds.y*n-s+"px",t.style.width=t.style.height=s+"px"}function ST(){if(ze)return;const e=gt.x0+40+Math.random()*(gt.x1-gt.x0-80),t=gt.y0+25+Math.random()*(gt.y1-gt.y0-35);m2(v?v.pid:"solo",e,t),v?.fx({k:"ball",x:e,y:t})}function m2(e,t,n){if(R!=="park")return;const s=document.getElementById("ball");ds={x:t,y:n},ze={thrower:e,phase:"fly",dog:null,until:performance.now()+12e3},s&&(s.classList.remove("flying"),s.offsetWidth,s.classList.add("flying"),cl(!0)),C.boing(),setTimeout(()=>{ze?.phase==="fly"&&(ze.phase="chase",document.getElementById("ball")?.classList.remove("flying"),fs.size||(ze=null))},650)}function TT(e){if(!v)return Vt;const t=e===v.pid?ye():v.presence.get(e);return t&&t.where==="park"?t:null}const fs=new Map,Nc=e=>(t,n,s,o,i)=>{t.style.left=(n-o/2)*e+"px",t.style.top=(s-i)*e+"px",t.style.width=o*e+"px",t.style.height=i*e+"px"};function PT(){const e=[];if(R==="house"){const t=S.get(),n={box:X,place:Eo,z:s=>String(4e3+Math.round(s)),scale:1};if(v&&Re!==ee){const s=[...v.presence.entries()],o=ye();o&&s.push([v.pid,o]);for(const[i,a]of s){const r=v.players.get(i)?.dog;if(r&&a.where==="house"&&a.houseId===me&&a.room===t.currentRoom){const l=Rt(t.currentRoom,dn(i,a),a);e.push({key:i,dog:r,x:l.x,y:l.y,flip:a.flip,...n})}}}else if(t.dog){const s=t.characters.find(o=>o.id===t.dog.owner)??t.characters[0];if(s&&s.room===t.currentRoom){const o=Rt(s.room,Ct(s),s);e.push({key:"solo",dog:t.dog,x:o.x,y:o.y,flip:s.flip,...n})}}}else if(R==="park"){const t=document.getElementById("pavatars");if(!t)return e;const n=Hs();for(const s of ks())s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Nc(n),z:o=>String(Math.round(o)-200),scale:.95})}else if(R==="ranch"){const t=document.getElementById("ravatars");if(!t)return e;const n=fn();for(const s of ks(qe?"barn":"ranch"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Nc(n),z:o=>String(100+Math.round(o)),scale:.95,riding:s.p.ride!==void 0})}else if(R==="gameroom"){const t=document.getElementById("gavatars");if(!t)return e;const n=Os();for(const s of ks("gameroom"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Nc(n),z:o=>String(Math.round(o)-200),scale:.95})}return e}let Zp=performance.now();function AT(e,t){const n=new Set;for(const s of PT()){if(IT(s.key))continue;n.add(s.key);let o=fs.get(s.key);const i=s.flip?1:-1,a=!s.riding&&R==="house"&&S.get().currentRoom==="backyard",r=s.riding?200:78;let l=a?Lu.x:s.x+i*r;s.riding?l=Math.max(50,Math.min(xa-50,l)):R==="house"&&!a&&(l=$2(l,46));const c=a?Lu.y:Math.min(595,s.y+(s.riding?28:6));if(!o||o.box!==s.box||!o.el.isConnected){o?.el.remove();const _=document.createElement("div");_.className="pet pet-dog",_.dataset.dog=s.key,s.box.appendChild(_),RT(_,s.key),o={el:_,box:s.box,x:l,y:c,flip:s.flip,pose:"",look:"",idle:1,trickUntil:0,sitTrick:!1},fs.set(s.key,o)}let d=l,f=c,u=s.riding?980:320;if(ze&&e>ze.until&&(ze=null,cl()),ze&&R==="park"){if(ze.phase==="chase")d=ds.x,f=ds.y,u=950,Math.hypot(o.x-d,o.y-f)<28&&(ze.phase="carry",ze.dog=s.key,C.woof());else if(ze.phase==="carry"&&ze.dog===s.key){const _=TT(ze.thrower)??{x:(gt.x0+gt.x1)/2,y:540};d=_.x+60,f=Math.min(590,_.y+6),u=750,ds={x:o.x+(o.flip?-40:40),y:o.y-30*s.scale},Math.hypot(o.x-d,o.y-f)<26&&(ds={x:_.x+70,y:Math.min(590,_.y+12)},ze=null,Pr(o,"♥"),C.sparkle()),cl()}}const p=e<o.trickUntil,y=d-o.x,m=f-o.y,k=Math.hypot(y,m);let b=!1;if(k>(ze?4:10)&&!p){const _=Xn()?k:Math.min(k,u*t);o.x+=y/k*_,o.y+=m/k*_,b=!0,Math.abs(y)>1.5&&(o.flip=y<0),o.idle=0}else o.idle+=t,!p&&o.idle>.3&&Math.abs(s.x-o.x)>4&&(o.flip=s.x<o.x);const g=p&&o.sitTrick?"sit":b?"stand":o.idle>.9?"sit":"stand",w=g+s.dog.breed;if(o.pose+o.look!==g+w){for(const _ of[...o.el.children])_.matches(".bubble, .kennelBtn")||_.remove();o.el.insertAdjacentHTML("afterbegin",`<div class="inner">${fa(s.dog.breed,g,ca(s.dog.breed,g))}</div>`),o.pose=g,o.look=w}o.el.dataset.name=s.dog.name,o.el.classList.toggle("walking",b),o.el.classList.toggle("flipped",o.flip),s.place(o.el,o.x,o.y,92*s.scale,71*s.scale),o.el.style.zIndex=s.z(o.y+1),v2(o.el,s.key,!1)}for(const[s,o]of fs)n.has(s)||(o.el.remove(),fs.delete(s))}function Pr(e,t){e.el.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.el.appendChild(n),hi(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const Gp=new Map;function y2(e,t){const n=fs.get(e);if(!n)return;const s=n.el.dataset.name??"";n.trickUntil=performance.now()+1400,n.sitTrick=t===0,n.el.classList.remove("spin","hop"),n.el.offsetWidth,t===0&&(Pr(n,`${s} sits! 🐾`),C.pop()),t===1&&(n.el.classList.add("spin"),Pr(n,"Wheee! ✨"),C.spin()),t===2&&(n.el.classList.add("hop"),Pr(n,"Woof! Woof!"),C.woof())}function RT(e,t){e.addEventListener("pointerdown",n=>{n.stopPropagation(),n.preventDefault()}),e.addEventListener("click",n=>{n.stopPropagation();const s=(Gp.get(t)??0)%3;Gp.set(t,s+1),y2(t,s),v&&v.fx({k:"trick",owner:t,v:s})})}function Xl(e){const t=e?.dogKennel?.item;if(!t||!e)return null;for(const n of Object.values(e.rooms)){const s=n.items.find(o=>o.id===t&&o.kind==="kennel");if(s)return s}return null}function CT(e){if(e==="solo")return ee.get();if(!v)return null;const t=v.players.get(e)?.houseId;return t?v.view(t):null}function IT(e){return!!Xl(CT(e))}function kh(){if(v){const e=v.myHouseId();return e?v.view(e):null}return ee.get()}function b2(){if(R!=="house")return null;const e=S.get(),t=Xl(e);if(!t||!e.rooms[e.currentRoom]?.items.some(n=>n.id===t.id))return null;if(v&&Re!==ee){const n=v.houses.get(me)?.meta.ownerId,s=n?v.players.get(n)?.dog??null:null;return!n||!s?null:{key:n,dog:s,item:t}}return e.dog?{key:"solo",dog:e.dog,item:t}:null}function OT(){const e=kh();if(!e)return null;const t=fl()?S.get().currentRoom:null;let n=null,s=null;for(const[o,i]of Object.entries(e.rooms))for(const a of i.items)a.kind==="kennel"&&((!n||a.z>=n.z)&&(n=a),o===t&&(!s||a.z>=s.z)&&(s=a));return s??n}function hr(e){if(!$h()){F("Adopt a dog first!");return}Hi({type:"dog/kennel",item:e}),e?(C.pop(),F("Rest well, puppy!")):(C.woof(),F("Come on, puppy!"))}function vh(e){if(!$h()){F("Adopt a dog first!");return}const t=Xl(kh());if(e===void 0){if(t){hr(null);return}const n=OT();if(!n){F("Put a dog kennel down first!");return}hr(n.id);return}t?.id===e?hr(null):hr(e)}function w2(e){const t=S.get(),n=t.rooms[t.currentRoom]?.items.find(s=>s.id===e);if(n){if(n.kind==="kennel"){fl()&&vh(n.id);return}n.kind==="cat-tower"&&FT()}}function BT(e,t){const n=S.get(),s=n.rooms[n.currentRoom]?.items.find(i=>i.id===t);if(!s)return;if(s.art){C.click(),xE(Xr(s.frame??0,n1(s.art),!1));return}const o=zk(s.kind);if(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),C.click(),o==="kennel"||o==="tower"){w2(t);return}if(r0(s.kind)){IL();const i=!s.on;S.dispatch({type:"item/power",room:n.currentRoom,id:t,on:i}),i&&us(s.kind)==="tv"&&VT(s),vs();return}if(!m7(s.kind,t,n.soundOn,vs)){if(o==="open"){e.classList.toggle("opened"),vs();return}if(o==="lamp"){e.classList.toggle("lamp-on");return}if(o==="sit"&&k2(s),o==="swing"&&UT(s),o!=="sit"&&(da(s.kind)||ln(s.kind)||qn(s.kind))){const i=S.get().currentRoom;if(v&&R==="house"){const a=ye();a&&a.where==="house"&&nh(s.x,s.y,s)}else{const a=S.get(),r=a.characters.find(l=>l.id===De&&l.room===i)??a.characters.find(l=>l.room===i);r&&th(r.id,s.x,s.y,s)}Ts(!1)}}}const Yp={dance:Be*2,sway:Be*4,watch:Be*5,warm:Be*3,hug:Be*2,bounce:Be,bathe:Be*3,nibble:Be,...h7},DT={dance:"<span>♪</span><span>♫</span>",sway:"<span>♪</span>",hug:"<span>♥</span>",bathe:'<span class="bub"></span><span class="bub"></span><span class="bub"></span>',nibble:"<span>✦</span>",...u7},ur={stereo:"<span>♪</span><span>♫</span><span>♪</span>",musicbox:"<span>♪</span><span>♩</span>",tv:'<span class="glow"></span>',fire:'<span class="glow"></span><span class="ember"></span><span class="ember"></span>',tub:'<span class="bub"></span><span class="bub"></span><span class="bub"></span><span class="bub"></span>',fridge:'<span class="food">🍓</span><span class="food">🧁</span>',...p7},qc=new Map;let jc=0;setInterval(()=>{document.hidden||vs()},1e3);function vs(){jc||(jc=requestAnimationFrame(()=>{jc=0,HT()}))}function Xs(e,t,n){let s=e.querySelector(":scope > .ambFx");if(!t){s?.remove();return}s||(s=document.createElement("i"),s.className="ambFx",s.setAttribute("aria-hidden","true"),e.appendChild(s)),s.dataset.k!==n&&(s.innerHTML=t,s.dataset.k=n,s.className="ambFx fx-"+n)}function Kp(e,t,n){const s=t?t.kind+"|"+t.item:"",o=e.dataset.amb||"";if(o!==s){if(o&&e.classList.remove("amb-"+o.split("|")[0],"amb-l","amb-r"),o.startsWith("bathe|")&&!t&&(e.classList.add("amb-sparkle"),setTimeout(()=>e.classList.remove("amb-sparkle"),1200)),!t){delete e.dataset.amb,Xs(e,null,"");return}e.dataset.amb=s,e.style.setProperty("--amb-delay",oo(t.phase,Yp[t.kind],n)+"ms"),e.style.setProperty("--amb-period",Yp[t.kind]+"ms"),e.classList.add("amb-"+t.kind,t.face<0?"amb-l":"amb-r"),Xs(e,DT[t.kind]??null,t.kind)}}function HT(){const e=S.get(),t=e.rooms[e.currentRoom];if(R!=="house"||!t){ju(null);return}const n=Date.now(),s=new Set;for(const m of t.items){if(us(m.kind)!=="musicbox")continue;if(!m.on){qc.delete(m.id);continue}const k=qc.get(m.id)??(qc.set(m.id,n),setTimeout(vs,Vh+60),n);n-k>=Vh&&s.add(m.id)}const o=new Set;X.querySelectorAll(".item.opened").forEach(m=>{m.dataset.id&&o.add(m.dataset.id)});const i=t.items.map(m=>{const k=de[m.kind];return{id:m.id,kind:m.kind,x:m.x,y:m.y,on:!!m.on,w:k?oh(k,Ge(m)).w:200}}),a=[],r=new Map;for(const m of e.characters){const k=Zt.get(m.id);if(m.room!==e.currentRoom||!k||k.classList.contains("lifted"))continue;const b=Ct(m)?.pose;a.push({id:m.id,x:m.x,y:m.y,seated:b==="sit",lying:b==="lie"}),r.set(m.id,k)}if(v&&Re!==ee){const m=[...v.presence.entries()],k=ye();k&&m.push([v.pid,k]);for(const[b,g]of m){const w=no.get(b);if(!w||!w.isConnected||g.where!=="house"||g.houseId!==me||g.room!==e.currentRoom||w.classList.contains("lifted"))continue;const _=dn(b,g)?.pose;a.push({id:"p:"+b,x:g.x,y:g.y,seated:_==="sit",lying:_==="lie"}),r.set("p:"+b,w)}}const l=y7(n),c=yy(i,a,{fridgesOpen:o,musicBoxDone:s,keysPlaying:l}),d=HL(i,c);if(d)for(const m of d.dancers){const k=c.get(m);k&&c.set(m,{...k,phase:0,face:k.face})}for(const m of[...Zt.values(),...no.values()])[...r.values()].includes(m)||Kp(m,void 0,n);r.forEach((m,k)=>Kp(m,c.get(k),n));const f=new Set([...c.values()].filter(m=>m.kind==="bathe").map(m=>m.item));let u=null;for(const m of t.items){const k=X.querySelector(`.item[data-id="${m.id}"]`);if(!k)continue;const b=us(m.kind),g=!!m.on&&!!b&&!s.has(m.id);if(k.classList.toggle("amb-on",g),g)k.dataset.amb=b,k.style.getPropertyValue("--amb-delay")||k.style.setProperty("--amb-delay",oo(0,Be,n)+"ms"),b==="stereo"?u="stereo":b==="musicbox"&&!u&&(u="musicbox"),Xs(k,ur[b],b);else if(qn(m.kind)&&f.has(m.id))Xs(k,ur.tub,"tub");else if(si(m.kind)&&o.has(m.id))Xs(k,ur.fridge,"fridge");else{const w=b7(m.kind,m.id,c,l,o,f.size>0);k.classList.toggle("soc-ducky",w==="ducky"),w?Xs(k,ur[w]||null,w):(delete k.dataset.amb,Xs(k,null,""))}}WT(d,n),ju(u);const p=new Map;for(const m of a)p.set(m.id,{el:r.get(m.id),d:m});const y=e.baby&&e.baby.room===e.currentRoom&&!e.baby.holder?{x:e.baby.x,y:e.baby.y}:null;k7({layer:X,roomW:Tt,seed:me||"local",now:n,reduced:Xn(),dolls:p,baby:y},c)}let Fc="";function WT(e,t){const n=L("partyFx"),s=!!e&&R==="house";document.body.classList.toggle("party-on",s),n.classList.toggle("on",s),s?(n.style.setProperty("--px",e.x/ue*100+"%"),Fc!==e.stereo&&(n.style.setProperty("--amb-delay",oo(0,Be,t)+"ms"),Fc=e.stereo)):Fc="";const o=new Set(s?e.toys:[]);X.querySelectorAll(".item").forEach(c=>{const d=o.has(c.dataset.id||"");d!==c.classList.contains("party-bounce")&&(c.classList.toggle("party-bounce",d),d&&c.style.setProperty("--amb-delay",oo(0,Be,t)+"ms"))});const i=s?X.querySelector(`.item[data-id="${e.stereo}"]`):null,a=Gf.getBoundingClientRect(),r=a.width?ue/a.width:1,l=i?.getBoundingClientRect();X.querySelectorAll(".pet").forEach(c=>{let d=!1;if(l){const f=c.getBoundingClientRect();d=Math.hypot((f.left+f.width/2-l.left-l.width/2)*r,(f.bottom-l.bottom)*r*1.5)<=DL&&!c.classList.contains("leap")&&!c.classList.contains("curl")}d!==c.classList.contains("party-hop")&&(c.classList.toggle("party-hop",d),d&&c.style.setProperty("--amb-delay",oo(.5,Be*2,t)+"ms"))})}function VT(e){const t=S.get();if(v&&R==="house"){const s=ye();if(!s||s.where!=="house"||s.seat)return}else{const s=t.characters.find(o=>o.id===De&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(!s||s.seat)return}const n=t.rooms[t.currentRoom].items.filter(s=>Kn(s.kind)?.pose==="sit"&&Math.abs(s.x-e.x)<520).sort((s,o)=>Math.abs(s.x-e.x)-Math.abs(o.x-e.x))[0];n&&k2(n)}let Wt=null,Bi=!1;function dl(){X.querySelectorAll(".item.swinging").forEach(e=>{(!Wt||e.dataset.id!==Wt.item)&&e.classList.remove("swinging")}),Wt&&X.querySelector(`.item[data-id="${Wt.item}"]`)?.classList.add("swinging")}function UT(e){const t=S.get(),n=t.characters.find(i=>i.id===De&&i.room===t.currentRoom)??t.characters.find(i=>i.room===t.currentRoom);if(!n)return;if(Wt?.id===n.id&&Wt.item===e.id){Wt=null,Bi=!0,S.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x+70,y:Math.max(e.y,520)}),Bi=!1,dl();return}const s=de[e.kind],o=e.y-(s?Xe(s)*Ge(e)*.26:40);Wt={id:n.id,item:e.id},Bi=!0,S.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x,y:o}),Bi=!1,dl()}function k2(e){const t=Ba(e);if(!t)return;if(v&&R==="house"){const i=ye();if(!i||i.where!=="house")return;if(!v.speaksSit){const r="p:"+v.pid,l=kn.get(r)?.item===e.id,c=Math.max(wo+40,t.footY-8);l?kn.delete(r):kn.set(r,{item:e.id,pose:t&&Kn(e.kind).pose,n:0});const{seat:d,...f}=i;nt({...f,x:e.x,y:c,flip:!1}),bt();return}const a=zo({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:vo(void 0,v.pid),alreadyOn:i.seat?.id===e.id?e.id:null});if(a.toast){F(a.toast),C.pop();return}if(!a.moved)return;wa(i,a.x,a.y,!1,a.seat?{id:a.seat.item,pose:a.seat.pose,n:a.seat.n}:null),bt(),Ts(!1);return}const n=S.get(),s=n.characters.find(i=>i.id===De&&i.room===n.currentRoom)??n.characters.find(i=>i.room===n.currentRoom);if(!s)return;const o=zo({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:vo(s.id),alreadyOn:s.seat?.item===e.id?e.id:null});if(o.toast){F(o.toast),C.pop();return}o.moved&&(Ji(s.id,n.currentRoom,o.x,o.y,o.seat),Ts(!1))}function v2(e,t,n){const s=v?t===v.pid:t==="solo";let o=e.querySelector(".kennelBtn");if(!s){o?.remove();return}o||(o=document.createElement("button"),o.type="button",o.className="kennelBtn",o.addEventListener("pointerdown",i=>{i.stopPropagation(),i.preventDefault()}),o.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault(),vh()}),e.appendChild(o)),o.textContent=n?"Out":"Kennel",zT(o)}function zT(e){if(R!=="house"){e.style.left=e.style.right=e.style.top=e.style.bottom=e.style.transform="";return}const t=e.parentElement;if(!t)return;const n=Y.getBoundingClientRect().width/Y.offsetWidth||1,s=Y.getBoundingClientRect(),o=4,i={l:s.left+o,t:s.top+o,r:s.right-o,b:s.bottom-o},a=X.querySelector(".char")?.getBoundingClientRect(),r=X.querySelector('.item[data-kind="sofa"]')?.getBoundingClientRect(),l=[...X.querySelectorAll(".pet-cat, .item")].map(W=>W.getBoundingClientRect()).filter(W=>W.width>2&&W.height>2),c=(W,z)=>!!z&&W.left<z.right-1&&W.right>z.left+1&&W.top<z.bottom-1&&W.bottom>z.top+1,d=(W,z)=>c(W,z)?Math.max(0,Math.min(W.right,z.right)-Math.max(W.left,z.left))*Math.max(0,Math.min(W.bottom,z.bottom)-Math.max(W.top,z.top)):0,f=W=>{let z=0;W.left<i.l&&(z+=(i.l-W.left)*8),W.right>i.r&&(z+=(W.right-i.r)*8),W.top<i.t&&(z+=(i.t-W.top)*8),W.bottom>i.b&&(z+=(W.bottom-i.b)*8),z+=d(W,a)*4,z+=d(W,r)*4;for(const st of l)z+=d(W,st)*4;return z},u=t.getBoundingClientRect(),p=!a||u.left+u.width/2<=a.left+a.width/2,y=W=>({left:W?"0px":"auto",right:W?"auto":"0px",top:"46%",bottom:"auto",transform:W?"translate(-108%, -50%)":"translate(108%, -50%)"}),m=[y(p),y(!p),{left:"50%",right:"auto",top:"0px",bottom:"auto",transform:"translate(-50%, -115%)"}];let k=m[0],b=1/0;for(const W of m){Object.assign(e.style,W);const z=f(e.getBoundingClientRect());z<b&&(b=z,k=W)}Object.assign(e.style,k);let g=e.getBoundingClientRect(),w=0,_=0;g.left<i.l&&(w+=i.l-g.left),g.right>i.r&&(w-=g.right-i.r),g.top<i.t&&(_+=i.t-g.top),g.bottom>i.b&&(_-=g.bottom-i.b);const P=W=>{if(!W)return;const z=()=>new DOMRect(g.left+w,g.top+_,g.width,g.height);if(!c(z(),W))return;const st=Math.min(z().bottom,W.bottom)-Math.max(z().top,W.top),ut=W.bottom+4-z().top,Fe=W.top-4-z().bottom,He=hn=>z().top+hn>=i.t&&z().bottom+hn<=i.b;if(st<g.height*.5&&He(ut)){_+=ut;return}if(st<g.height*.5&&He(Fe)){_+=Fe;return}const Pe=W.left-i.l,kt=i.r-W.right,vt=W===r?a:r,Ws=(hn,ic)=>{if(!vt)return!1;const Vs=ic?hn-g.width:hn,ui=new DOMRect(Vs,z().top,g.width,g.height);return c(ui,vt)};kt>=g.width+4&&!Ws(W.right+4,!1)?w+=W.right+4-z().left:Pe>=g.width+4&&!Ws(W.left-4,!0)?w+=W.left-4-z().right:He(ut)?_+=ut:He(Fe)&&(_+=Fe)};P(a),P(r);const $=t.querySelector(".inner")?.getBoundingClientRect(),x=$&&$.width>2?$:u,H=X.querySelector(".pet-cat")?.getBoundingClientRect(),V=X.querySelector('.item[data-kind="sandbox"]')?.getBoundingClientRect(),Q=X.querySelector('.item[data-kind="yard-bench"]')?.getBoundingClientRect(),q=[...X.querySelectorAll('.item[data-kind="yard-swing"], .item[data-kind="picnic-blanket"], .item[data-kind="lemonade-cart"], .item[data-kind="tulip-bed"]')].map(W=>W.getBoundingClientRect()),se=Y.querySelector(".yardDoor"),Me=se?[se,se.querySelector(".yardHintLabel"),se.querySelector(".doorArt")].map(W=>W?.getBoundingClientRect()):[],Ke=document.getElementById("secrets"),Ie=Ke&&Ke.offsetParent?Ke.getBoundingClientRect():void 0,I=Ie&&Ie.width>2&&Ie.left<i.r&&Ie.right>i.l&&Ie.top<i.b&&Ie.bottom>i.t?Ie:void 0,B=I?new DOMRect(I.left-8,I.top-8,I.width+16,I.height+16):void 0,te=[a,r,H,V,Q,B,...q,...Me].filter(W=>!!W&&W.width>2&&W.height>2),U=new DOMRect(g.left+w,g.top+_,g.width,g.height),N=x.left+x.width/2,Z=x.top+x.height/2,pe=W=>Math.hypot(W.left+W.width/2-N,W.top+W.height/2-Z),Te=W=>{const z=Math.min(W.right,x.right)-Math.max(W.left,x.left),st=Math.min(W.bottom,x.bottom)-Math.max(W.top,x.top);return z>1&&st>1},ve=W=>W.left>=i.l-.5&&W.right<=i.r+.5&&W.top>=i.t-.5&&W.bottom<=i.b+.5&&te.every(z=>!c(W,z))&&!Te(W);let je=U;if(!ve(U)||pe(U)>150){const W=[],z=(Fe,He)=>{let Pe=Fe,kt=He;Pe<i.l&&(Pe=i.l),kt<i.t&&(kt=i.t),Pe+g.width>i.r&&(Pe=Math.max(i.l,i.r-g.width)),kt+g.height>i.b&&(kt=Math.max(i.t,i.b-g.height)),W.push(new DOMRect(Pe,kt,g.width,g.height))};z(x.left+(x.width-g.width)/2,x.top-g.height-8),z(x.right-g.width,x.top-g.height-6),z(x.left,x.top-g.height-6),a&&z(a.right+6,x.top-g.height-8),Q&&z(Q.left-g.width-6,Q.top-g.height-6),a&&Q&&z(a.right+6,Q.top-g.height-6),a&&(z(a.left-12,a.top-g.height-8),z(i.l,a.top-g.height-10),z(a.left+(a.width-g.width)/2,a.top-g.height-8)),z(i.r-g.width,x.top-g.height-6),z(x.right+8,x.top+(x.height-g.height)/2),z(x.left-g.width-8,x.top+(x.height-g.height)/2),z(U.left,U.top);for(const Fe of[g.width*.65,g.width*1.05,88,120,155])for(let He=0;He<8;He++){const Pe=He*Math.PI/4;z(N+Math.cos(Pe)*Fe-g.width/2,Z+Math.sin(Pe)*Fe-g.height/2)}const st=Fe=>{let He=1/0,Pe=null;for(const kt of W){if(!ve(kt)||pe(kt)>Fe)continue;const vt=pe(kt);vt<He&&(He=vt,Pe=kt)}return Pe},ut=st(170)??st(360);if(ut)je=ut;else if(!ve(U)){let Fe=null,He=1/0;for(const Pe of W){if(Pe.left<i.l-.5||Pe.right>i.r+.5||Pe.top<i.t-.5||Pe.bottom>i.b+.5)continue;const vt=(Te(Pe)?1e4:0)+te.reduce((Ws,hn)=>Ws+d(Pe,hn),0)+pe(Pe);vt<He&&(He=vt,Fe=Pe)}Fe&&(je=Fe)}}w+=je.left-U.left,_+=je.top-U.top,(w||_)&&(e.style.transform=`${e.style.transform} translate(${(w/n).toFixed(1)}px, ${(_/n).toFixed(1)}px)`)}function QT(e,t){e.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.appendChild(n),hi(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const Di=new Map;function NT(){const e=new Set,t=b2();if(t){e.add(t.key);const n=Ck(t.dog.name,Date.now()),s=de[t.item.kind],i=(s?Lo(s,t.item.y):Math.min(t.item.y,Ce-u1))-(n==="peek"?24:2);let a=Di.get(t.key);if(!a||!a.el.isConnected){a?.el.remove();const l=document.createElement("div");l.className="pet pet-dog kenneled",l.dataset.dog="kennel:"+t.key,X.appendChild(l),l.addEventListener("pointerdown",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),c.preventDefault())}),l.addEventListener("click",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),QT(l,`${l.dataset.name??"Puppy"} is resting`))}),a={el:l,pose:"",look:"",x:t.item.x,y:i},Di.set(t.key,a)}const r=n==="rest"?"sleep":"sit";if(a.pose!==r||a.look!==n+t.dog.breed){for(const l of[...a.el.children])l.matches(".bubble, .kennelBtn")||l.remove();a.el.insertAdjacentHTML("afterbegin",`<div class="inner">${fa(t.dog.breed,r,ca(t.dog.breed,r))}</div>${n==="rest"?'<div class="zzz"><b>Zzz</b><i>z</i><i>z</i><i>z</i></div>':""}`),a.pose=r,a.look=n+t.dog.breed}a.el.dataset.name=t.dog.name,a.el.classList.toggle("rest",n==="rest"),a.el.classList.toggle("peek",n==="peek"),a.x=t.item.x,a.y=i,Eo(a.el,t.item.x,i,100,77),a.el.style.zIndex=String(1e3+t.item.z+1),v2(a.el,t.key,!0)}for(const[n,s]of Di)e.has(n)||(s.el.remove(),Di.delete(n))}let fe=null,pr="",Zc=0,_h=0,Ar={x:0,perch:0,leap:!1};const qT=562;function _2(e){return(e.rooms[e.currentRoom]?.items.filter(n=>n.kind==="cat-tower")??[]).reduce((n,s)=>!n||s.z>=n.z?s:n,null)}function Xp(e){return e==="cat-bed"||e==="pet-bed"||e==="dog-bed"||e==="pack:cat-bed"||/(?:^|:)cat-bed$|(?:^|:)pet-bed$/.test(e)}function jT(e){const t=e.rooms[e.currentRoom]?.items??[],n=t.filter(a=>Xp(a.kind)),s=t.filter(a=>a.kind==="bed"),o=(n.length?n:s).reduce((a,r)=>!a||r.z>=a.z?r:a,null);if(!o)return null;const i=de[o.kind];return{x:o.x,y:o.y,h:i?Xe(i)*Ge(o):80,pet:Xp(o.kind)}}function FT(){const e=S.get();!e.cat||e.cat.room!==e.currentRoom||!_2(e)||(_h=performance.now()+900,C.boing(),v?.fx({k:"leap"}))}function ZT(){const e=S.get(),t=R==="house"?e.cat:null;if(!t||t.room!==e.currentRoom){fe&&(fe.remove(),fe=null,pr="",Zc=0);return}(!fe||!fe.isConnected)&&(fe=document.createElement("div"),fe.className="pet pet-cat",X.appendChild(fe),pr="",fe.addEventListener("pointerdown",$=>{$.stopPropagation(),$.preventDefault()}),fe.addEventListener("click",$=>{$.stopPropagation(),x2(),v&&v.fx({k:"purr"})}));const n=_2(e),s=n?null:jT(e),o=n?de[n.kind]:void 0,i=n&&o?Xe(o)*Ge(n):0,a=Ik(t,Date.now(),n?{x:n.x}:null,s?{x:s.x}:null,Xn()),r=!!n&&performance.now()<_h,l=r?2:a.perch,c=r&&n?n.x:a.x,d=r?"play":a.mood,f=d==="walk"?"stand":d==="nap"?"nap":"sit",u=f+t.coat+(l?"p":"");if(u!==pr){const $=[...fe.querySelectorAll(".bubble, .heart")];fe.innerHTML=`<div class="inner">${Ko(t.coat,f,Yo(t.coat,f))}</div>${f==="nap"?'<div class="zzz"><i>z</i><i>z</i><i>z</i></div>':""}`;for(const x of $)fe.appendChild(x);pr=u}if(l>0&&Zc===0){fe.classList.add("hop");const $=fe;setTimeout(()=>$.classList.remove("hop"),420)}Zc=l,fe.dataset.name=t.name,fe.dataset.mood=d,fe.dataset.perch=String(l),fe.dataset.leap=r?"1":"0",fe.dataset.curl=a.curl?"1":"0",fe.classList.toggle("walking",d==="walk"),fe.classList.toggle("groom",d==="groom"),fe.classList.toggle("play",d==="play"&&!r),fe.classList.toggle("leap",r),fe.classList.toggle("flipped",a.flip),fe.classList.toggle("curl",a.curl===1),X.querySelectorAll(".item.toy-live").forEach($=>$.classList.remove("toy-live")),n&&d==="play"&&l&&!r&&X.querySelector(`.item[data-id="${n.id}"]`)?.classList.add("toy-live");const p=window.__pinCat,y=!!(p&&Number.isFinite(p.x)),m=y&&Number.isFinite(p.y)?p.y:qT,k=!y&&l&&n?Rk(n.y,i,l):!y&&a.curl&&s?s.y-s.h*(s.pet?.38:.2):m,b=e.currentRoom==="backyard"&&!l,g=!y&&l?92:b?115:128,w=!y&&l?110:b?135:150,_=y?p.x:e.currentRoom==="backyard"?ms.x:$2(c,w/2),P=!y&&e.currentRoom==="backyard"&&!l?ms.y:k;Eo(fe,_,P,w,g),fe.style.zIndex=String(4e3+Math.round(P)),Ar={x:_,perch:l,leap:r}}function $2(e,t){const n=S.get().currentRoom,s=n==="backyard"?pg:n==="living"?ug:null;if(!s)return e;const o=s.x-s.w/2-t-16,i=s.x+s.w/2+t+16;return e<=o||e>=i?e:e<s.x?o:i}function x2(){if(!fe)return;C.purr(),setTimeout(()=>C.meow(),250),fe.querySelector(".bubble")?.remove();const e=document.createElement("div");e.className="bubble petBubble",e.textContent=`${fe.dataset.name} purrs ♥`,fe.appendChild(e),hi(),setTimeout(()=>e.classList.add("out"),1500),setTimeout(()=>e.remove(),1900),fe.classList.remove("happy"),fe.offsetWidth,fe.classList.add("happy");for(let t=0;t<5;t++){const n=document.createElement("div");n.className="heart",n.textContent="♥",n.style.left=20+Math.random()*60+"%",n.style.animationDelay=t*.12+"s",n.style.color=["#ff6b9a","#ff8fab","#e879c6"][t%3],fe.appendChild(n),setTimeout(()=>n.remove(),1800)}}function GT(e,t){if(t.k==="zoo"||t.k==="apple"||t.k==="honk"||t.k==="hen"){uP(t);return}t.k==="trick"?y2(t.owner,t.v):t.k==="purr"?R==="house"&&x2():t.k==="leap"?R==="house"&&(_h=performance.now()+900):t.k==="ball"?m2(e,t.x,t.y):t.k==="splash"&&p2(t.x)}function M2(e){const t=Math.min(.05,Math.max(0,(e-Zp)/1e3));Zp=e;try{AT(e,t),NT(),ZT(),gP(e,t),ZE(t),Sm()}catch{}requestAnimationFrame(M2)}function YT(){return v?v.view(v.myHouseId())?.cat??null:ee.get().cat??null}function $h(){return v?v.players.get(v.pid)?.dog??null:ee.get().dog??null}function Hi(e){if(v){const t=v.myHouseId();t&&v.dispatch(t,e)}else ee.dispatch(e)}const fl=()=>R==="house"&&(!v||Re===ee||me===v.myHouseId());function KT(e="cat"){const t=YT(),n=$h(),s=ee.get().characters,o={tab:e,coat:t?.coat??0,catName:t?.name??"",breed:n?.breed??0,dogName:n?.name??"",owner:n?.owner??s[0]?.id,err:"",bye:!1},i=Yt("",(l,c)=>{const d=p=>l.closest(`[${p}]`)?.getAttribute(p);if(d("data-pt")){o.tab=d("data-pt"),o.err="",o.bye=!1,r();return}if(d("data-coat")!=null){o.coat=+d("data-coat"),C.click(),r();return}if(d("data-breed")!=null){o.breed=+d("data-breed"),C.click(),r();return}if(d("data-cname")){o.catName=d("data-cname"),C.click(),r();return}if(d("data-dname")){o.dogName=d("data-dname"),C.click(),r();return}if(d("data-owner")){o.owner=d("data-owner"),C.click(),r();return}const f=d("data-pa");if(!f)return;const u=(i.root.querySelector("#petName")?.value??"").trim();if(f==="adoptCat"||f==="adoptDog"){const p=u||(f==="adoptCat"?o.catName:o.dogName),y=D0(p);if(!y){o.err=p?"Hmm, try a different name!":"Pick a name first!",C.pop(),r();return}if(f==="adoptCat"){const m=fl(),k={name:y,coat:o.coat,room:m?S.get().currentRoom:t?.room??"living",x:m?Math.max(200,Math.min(ue-200,ie+G/2)):t?.x??1200};Hi({type:"cat/set",cat:k}),C.meow(),c(),F(t?`${y} looks great! 🐱`:m?`${y} moved in! 🐱`:`${y} is waiting at your house! 🐱`)}else{const m=v?{name:y,breed:o.breed}:{name:y,breed:o.breed,owner:o.owner};v?(v.setDog(m),R==="park"&&xo()):ee.dispatch({type:"dog/set",dog:m}),C.woof(),c(),F(n?`${y} looks great! 🐶`:`${y} is your new best friend! 🐶`)}return}if(f==="callCat"){Hi({type:"cat/move",room:S.get().currentRoom,x:Math.max(200,Math.min(ue-200,ie+G/2))}),C.meow(),c();return}if(f==="kennelDog"){vh(),c();return}if(f==="bye"){if(!o.bye){o.bye=!0,r();return}o.tab==="cat"?Hi({type:"cat/set",cat:null}):(Hi({type:"dog/kennel",item:null}),v?v.setDog(null):ee.dispatch({type:"dog/set",dog:null}));const p=o.tab==="cat"?t?.name:n?.name;c(),F(`${p||"They"} went to live with a kind friend 💛`);return}},"wide pets"),a=i.root.querySelector(".card");function r(){const l=o.tab==="cat",c=l?t:n,d=l?yk:bk,f=l?o.catName:o.dogName,u=i.root.querySelector("#petName")?.value??"";a.innerHTML=`${Kt}<h2>Pets</h2>
      <div class="petTabs"><button data-pt="cat" class="${l?"on":""}">🐱 Cat</button><button data-pt="dog" class="${l?"":"on"}">🐶 Dog</button></div>
      <p class="hint small">${l?v?"Your cat lives in your house. Friends can see her when they visit!":"Your cat lives in your house. She naps, purrs, and plays!":v?"Your dog follows you everywhere: the street, friends' houses, and the park!":"Your dog follows you around the house and to the park!"}</p>
      <div class="petRow"><div class="petPreview">${l?Ko(o.coat,"sit",Yo(o.coat,"sit")):fa(o.breed,"stand",ca(o.breed,"stand"))}</div>
        <div class="swatches">${(l?hd:ud).map((p,y)=>`<button ${l?"data-coat":"data-breed"}="${y}" class="${y===(l?o.coat:o.breed)?"on":""}"><div>${l?Ko(y,"sit",Yo(y,"sit")):fa(y,"stand",ca(y,"stand"))}</div><span>${p.name}</span></button>`).join("")}</div></div>
      <div class="label">Name</div>
      <div class="nameChips">${d.map(p=>`<button ${l?"data-cname":"data-dname"}="${p}" class="${p===f?"on":""}">${p}</button>`).join("")}</div>
      <input id="petName" class="petName" maxlength="14" autocomplete="off" placeholder="…or type a name" value="${ge(u)}"/>
      ${o.err?`<p class="err" id="petErr">${ge(o.err)}</p>`:""}
      ${!l&&!v&&s.length>1?`<div class="label">Who does your dog follow?</div><div class="walkers">${s.map(p=>`<button data-owner="${p.id}" class="${p.id===o.owner?"on":""}">${Mt(p)}</button>`).join("")}</div>`:""}
      <div class="petBtns"><button class="go" data-pa="${l?"adoptCat":"adoptDog"}" id="adoptBtn">${c?"Save":"Adopt! 💛"}</button>
        ${l&&t&&fl()?'<button data-pa="callCat" id="callCat">Here, kitty!</button>':""}
        ${!l&&n?`<button data-pa="kennelDog" id="kennelDog">${Xl(kh())?"Come, puppy!":"Kennel"}</button>`:""}
        ${c?`<button class="danger" data-pa="bye">${o.bye?"Tap again to say goodbye":"Find a new home"}</button>`:""}</div>`}r()}L("btnPets").addEventListener("click",()=>KT(R==="house"?"cat":"dog"));requestAnimationFrame(M2);window.__pets=()=>{const e=b2(),t=e?Di.get(e.key):void 0;return{dogs:[...fs.keys()],dogPos:Object.fromEntries([...fs].map(([n,s])=>[n,{x:Math.round(s.x),y:Math.round(s.y)}])),cat:fe?{mood:fe.dataset.mood,name:fe.dataset.name,perch:Ar.perch,x:Math.round(Ar.x),leap:Ar.leap,curl:fe.dataset.curl==="1"}:null,kennel:e&&t?{x:Math.round(t.x),y:Math.round(t.y),pose:t.pose,name:e.dog.name,item:e.item.id}:null,dogKennel:S.get().dogKennel??null,fetch:ze?.phase??null,ball:ds,view:R}};function fn(){return L("ranch").clientHeight/Ra}let At=[];const va=e=>String(100+Math.round(e)),L2=220,XT=L2*130/160,E2=156,JT=E2*130/160,eP=.6,tP=3.5,nP=3,Jp=[46.3,46.3,48.7,49.7,53],sP=[0,0,0,0,0],oP=4,iP=16,Yd=10,_s=new Map,Rr=new Map;function hl(e,t,n=Yd){const s=(e-xt.x)/(xt.rx+n),o=(t-xt.y)/(xt.ry+n);return s*s+o*o<1}function Gc(e,t,n,s){for(let o=0;o<=18;o++){const i=o/18;if(hl(e+(n-e)*i,t+(s-t)*i))return!0}return!1}function ul(e,t){return{x:Math.max(70,Math.min(Mh()-70,e)),y:Math.max(ro,Math.min(jn,t))}}function aP(e,t){const n=ul(t.x,t.y);if(hl(n.x,n.y,6))return null;if(!Gc(e.x,e.y,n.x,n.y))return[n];const s=xt.x-xt.rx-Yd-28,o=xt.x+xt.rx+Yd+28;let i=null,a=1/0;for(const r of[ro+1,jn-2]){const l=[];let c=e.x,d=e.y;const f=(k,b)=>{const g=ul(k,b);l.push(g),c=g.x,d=g.y};Gc(c,d,c,r)&&f(c<xt.x?s:o,d),Math.abs(d-r)>3&&f(c,r),Math.abs(c-n.x)>3&&f(n.x,r),l.push(n);let u=!0,p=e.x,y=e.y,m=0;for(const k of l){if(Gc(p,y,k.x,k.y)||hl(k.x,k.y,4)){u=!1;break}m+=Math.hypot(k.x-p,k.y-y),p=k.x,y=k.y}u&&m<a&&(i=l,a=m)}return i}function S2(e,t){const n=Mn();if(!n)return;const s={x:Math.max(60,Math.min(Mh()-60,e)),y:Math.max(ro,Math.min(jn,t))};if(n.ride!==void 0&&n.where==="ranch"){const o=aP(n,s);if(!o){F("The horse won't splash through the pond!"),C.pop();return}At=o}else At=[s]}function rP(e){if(e.look2)return CL(e.look2);const t=e.pants,n="#5a3d5c",s=(o,i,a,r)=>`<path class="${o}" d="${i}" fill="none" stroke="${n}" stroke-width="${a}" stroke-linecap="round"/><path class="${o} cloth" d="${i}" fill="none" stroke="${t}" stroke-width="${r}" stroke-linecap="round"/>`;return`<svg class="rideleg" viewBox="0 0 160 130">${s("thigh","M66 56 L102 66",13,8)}${s("shin","M102 68 L106 104",12,7.2)}<circle class="knee" cx="102" cy="67" r="6.2" fill="${t}" stroke="${n}" stroke-width="3.5"/><ellipse class="shoe" cx="116" cy="106" rx="11" ry="5.2" fill="${n}"/></svg>`}function $s(){return document.body.classList.contains("phone")&&document.body.classList.contains("phone-portrait")&&!qe}function Jl(){if(!$s())return d0.map((t,n)=>n);const e=[0,2,4];for(const t of ks("ranch")){const n=t.p.ride;n!==void 0&&e.indexOf(n)<0&&e.push(n)}return e}function As(e){if(!$s())return d0[e];const t=Jl(),n=t.indexOf(e),s=t.length,o=n<0?0:n,i=xh().w/2,a=2400+i+18,r=3080-i-18;return s<=1?Math.round((a+r)/2):Math.round(a+(r-a)*o/(s-1))}function xh(){return $s()?{w:131,h:106}:{w:150,h:122}}function pl(e,t,n){const s=fn(),{w:o,h:i}=xh();e.style.left=(t-o/2)*s+"px",e.style.top=(n-i)*s+"px",e.style.width=o*s+"px",e.style.height=i*s+"px",e.style.zIndex=va(n)}function lP(){if(R!=="ranch"||qe||!document.body.classList.contains("phone"))return;const e=new Set(Jl());document.querySelectorAll("#ranchWorld .horse").forEach(t=>{const n=+t.dataset.horse;t.classList.toggle("stallOff",$s()&&!e.has(n)),!(!e.has(n)||_s.has(n)||t.classList.contains("away"))&&pl(t,As(n),lo)})}function cP(e,t,n){if(_s.has(e)||Math.hypot(t-As(e),n-lo)<26)return;_s.set(e,{x:t,y:n});const s=document.querySelector(`#ranchWorld .horse[data-horse="${e}"]`);s&&(s.classList.add("trotting"),s.classList.remove("away"),s.classList.toggle("flipped",As(e)<t),pl(s,t,n))}function dP(e,t,n){const s=n?-1:1;for(const o of[s*118,-s*118,s*160,-s*78])for(const i of[0,30,-26,48]){const a=ul(e+o,t+i);if(!(Math.hypot(a.x-e,a.y-t)<50)&&!hl(a.x,a.y,8))return a}return ul(e,t)}let e0=0,T2=0;const ec=()=>v?v.now():Date.now(),tc=()=>df(v?v.ranch.plots:ee.get().garden),Ua=()=>cf(v?v.players.get(v.pid)?.basket:ee.get().basket),Mh=()=>qe?rf:xa,P2=()=>qe?"barn":"ranch",A2=()=>{const e=new Map;for(const t of ks("ranch"))t.p.ride!==void 0&&e.set(t.p.ride,t);return e};function Kd(e){const t={taken:"A friend just planted there!",wet:"Already watered 💧",notReady:"Still growing! 🌱",full:"Your basket is full!",slow:"The hen is laying… try again!",none:"Your basket has none left",nohouse:"Go home to put it in your room"};t[e]&&(F(t[e]),C.pop())}function Fo(e){if(v){const o=td(tc(),Ua(),e,ec(),e.op==="egg"?e0:0);return typeof o=="string"?(Kd(o),!1):(e.op==="egg"&&(e0=Date.now()),v.ranchOp(e),!0)}const t=ee.get(),n=Date.now(),s=td(df(t.garden),cf(t.basket),e,n,t.lastEgg??0);return typeof s=="string"?(Kd(s),!1):(ee.dispatch({type:"ranch/op",op:e,now:n}),nc(!0),Sh(),!0)}function _a(e=!1){const t=R==="ranch"&&qe&&!e;To(),L("ranch").classList.remove("hidden"),ze=null,At=[],R="ranch",qe=e;const n=e?{where:"barn",x:170,y:560,flip:!1}:{where:"ranch",x:t?Xc:130,y:t?520:565,flip:!1};v?nt(n):Vt=n,L("streetTitle").textContent=e?"The Barn":"Rainbow Ranch",xn(),Lh(),requestAnimationFrame(()=>{const s=L("ranchScroll"),o=fn();s.scrollLeft=t?Math.max(0,Xc*o-s.clientWidth/2):0,Jd()}),setTimeout(Jd,650),Va(L("ranch")),e?C.swish():C.sparkle()}L("btnHopOff").addEventListener("click",()=>R2());function Lh(){const e=fn(),t=L("ranchWorld"),n=o=>o*e+"px",s=(o,i,a,r)=>`left:${n(o-a/2)};top:${n(i-r)};width:${n(a)};height:${n(r)};z-index:${va(i)}`;if(t.style.width=Mh()*e+"px",t.style.height=Ra*e+"px",t.style.setProperty("--sc",String(e)),qe){t.innerHTML=L9()+`<div class="sceneArtHost" id="ranchArt"></div><button class="rprop barnExit" data-r="exit" aria-label="Go outside" style="${s(127,444,206,244)}"><span class="exitHint"><span>Outside ☀️</span></span></button>`+Js.map((o,i)=>`<button class="animal" data-animal="${i}" aria-label="${Dm[i].name}" style="${s(lf[i],jy+30,128,107)}">${vd(i,Cd(i))}</button>`).join("")+[300,1244].map(o=>["carrot","apple","hay"].map((i,a)=>`<button class="bucket" data-feed="${i}" aria-label="${i} bucket" style="${s(o+a*56,592,54,62)}">${w9(i)}</button>`).join("")).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',yo(L("ranchArt"),"barn",t),xs(),dt();return}t.innerHTML=h9()+'<div class="sceneArtHost" id="ranchArt"></div>'+u9().replace("<svg ",`<svg style="z-index:${va(p9)}" `)+`<button class="rprop barnDoor" data-r="barn" aria-label="Go into the barn" style="${s(Xc,472,150,150)}"><span class="doorHint"><span>Petting zoo inside! 🐐</span></span></button><button class="rprop windmill" data-r="mill" aria-label="Windmill" style="${s(1540,478,150,240)}">${$9}</button><button class="rprop henHouse" data-r="egg" aria-label="Hen house" style="${s(715,482,180,170)}">${qi("hen-house",g9)}</button><button class="rprop tractor" data-r="honk" aria-label="Tractor" style="${s(900,580,170,130)}">${qi("tractor",m9)}</button><button class="rprop appleTree" data-r="apple" aria-label="Apple tree" style="${s(2085,482,240,300)}">${qi("apple-tree",y9)}</button>`+Fy.map((o,i)=>{const a=xh();return`<button class="horse${$s()&&Jl().indexOf(i)<0?" stallOff":""}" data-horse="${i}" aria-label="${Kr[i].name} horse" style="${s(As(i),lo,a.w,a.h)}">${Of(i,!1,Qf(i))}</button>`}).join("")+Array.from({length:Jc},(o,i)=>`<button class="plot" data-plot="${i}" aria-label="Garden plot" style="${s(Gy(i),594,66,86)}"></button>`).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',yo(L("ranchArt"),"ranch",t),nc(!0),xs(),dt()}const gr=[];function nc(e=!1){if(R!=="ranch"||qe)return;const t=tc(),n=ec();document.querySelectorAll("#ranchWorld .plot").forEach(s=>{const o=+s.dataset.plot,i=t[o]??null,a=El(i,n),r=JSON.stringify(i)+a;!e&&gr[o]===r||(gr[o]!==void 0&&gr[o]!==r&&a>0&&(s.classList.remove("grow"),s.offsetWidth,s.classList.add("grow")),gr[o]=r,s.innerHTML=Vm(i,a,o),s.dataset.stage=i?String(a):"empty")})}function xs(){const e=document.getElementById("ravatars");if(!e||R!=="ranch")return;const t=fn(),n=new Set,s=new Set;let o=!1;for(const i of ks(P2())){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&u2(a));const r=JSON.stringify(i.look)+i.name;if(a.dataset.look!==r){const p=a.querySelector(".bubble");a.innerHTML=i.name?uh(i.look,i.name):`<div class="inner">${Mt(i.look)}</div>`,p&&a.appendChild(p),a.dataset.look=r,a.dataset.ride=""}const l=i.p.ride,c=(mo[i.look.size]??1)*t*.95*(l!==void 0?eP:1),d=Bs*c,f=$n*c;if(a.dataset.ride!==String(l??"")&&(a.querySelector(".mount")?.remove(),l!==void 0&&a.insertAdjacentHTML("afterbegin",`<div class="mount" data-mount="${l}">${Of(l,!0,Qf(l,!0))}${rP(i.look)}</div>`),a.dataset.ride=String(l??"")),a.classList.toggle("riding",l!==void 0),l!==void 0){s.add(l),i.mine&&(o=!0),Rr.set(l,{x:i.p.x,y:i.p.y});const p=$s()?E2:L2,y=$s()?JT:XT,m=p*t,k=y*t,b=a.querySelector(".mount"),g=!!b.querySelector("img.horsesprite");b.classList.toggle("painted",g),b.style.width=m+"px",b.style.height=k+"px";const w=l??0,_=g?sP[w]??0:0,P=(i.p.flip?-_:_)/160*m;b.style.left=(d-m)/2+P+"px",b.style.top=f-k+"px";const $=Number(a.querySelector(".shirt")?.getAttribute("data-hem")??126),x=g?Jp[w]??Jp[0]:Number(b.querySelector(".saddle")?.getAttribute("data-top")??43);b.dataset.saddleTop=String(x);const H=($+tP/2)/160*f,V=f-k+(x-nP/2)/130*k;a.style.setProperty("--lift",H-V+"px");const Q=b.querySelector(".rideleg");Q&&(Q.style.left="0",Q.style.top="0",Q.style.width="100%",Q.style.height="100%",g?(Q.style.transformOrigin="48% 38%",Q.style.transform=`translate(${oP/160*100}%, ${iP/130*100}%) rotate(22deg)`):(Q.style.transformOrigin="",Q.style.transform=""))}else a.style.removeProperty("--lift");const u=parseFloat(a.dataset.lx??"NaN");Number.isFinite(u)&&Math.abs(u-i.p.x)>2&&(a.classList.add("moving"),clearTimeout(+(a.dataset.mt??0)),a.dataset.mt=String(window.setTimeout(()=>a.classList.remove("moving"),260))),a.dataset.lx=String(i.p.x),Vl(a,i.p.x*t-d/2+"px",i.p.y*t-f+"px"),a.style.width=d+"px",a.style.height=f+"px",a.style.zIndex=va(i.p.y),a.classList.toggle("flipped",i.p.flip),Aa(a,i.look,i.mine)}if(e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),document.body.classList.contains("phone")){const i=new Set(Jl());document.querySelectorAll("#ranchWorld .horse").forEach(a=>{a.classList.toggle("stallOff",$s()&&!i.has(+a.dataset.horse))})}document.querySelectorAll("#ranchWorld .horse").forEach(i=>{const a=+i.dataset.horse;s.has(a)?(i.classList.add("away"),_s.delete(a)):i.classList.remove("away")});for(const[i,a]of[...Rr])s.has(i)||(cP(i,a.x,a.y),Rr.delete(i));document.body.classList.toggle("riding",o),So()}function fP(e){const t=Mn();if(!t||t.where!=="ranch")return;const n=A2().get(e);if(n&&!n.mine){F("Someone is riding!"),C.pop();return}if(t.ride!==void 0){if(n?.mine||t.ride===e){R2();return}S2(As(e),Math.min(jn,lo+8));return}At=[],_s.delete(e),an({where:"ranch",x:As(e),y:Math.min(jn,lo+8),flip:!1,ride:e}),C.neigh(),F(`You're riding ${Kr[e].name}! Tap the ground to gallop 🐴`)}function R2(){const e=Mn();if(!e||e.ride===void 0)return;const t=e.ride,{ride:n,...s}=e;At=[];const o=dP(s.x,s.y,s.flip);Rr.set(t,{x:s.x,y:s.y}),an({...s,x:o.x,y:o.y}),C.drop()}function Eh(e,t){const n=e<Js.length?document.querySelector(`#ranchWorld .animal[data-animal="${e}"]`):document.querySelector(`#ranchWorld .horse[data-horse="${e-Js.length}"]:not(.away)`)??document.querySelector(`#ravatars .mount[data-mount="${e-Js.length}"]`);if(!n||R!=="ranch")return;const s=e>=Js.length,o=s?{say:"Neigh! ♥",snd:"neigh"}:Dm[e];n.classList.remove("hop","munch"),n.offsetWidth,n.classList.add(t?"munch":"hop"),setTimeout(()=>n.classList.remove("hop","munch"),1400),n.querySelector(".abubble")?.remove();const i=document.createElement("div");i.className="bubble petBubble abubble",i.textContent=t?`Yum! Munch munch ${t===1?"🥕":t===2?"🍎":"🌾"}`:o.say,n.appendChild(i),hi(),setTimeout(()=>i.classList.add("out"),1400),setTimeout(()=>i.remove(),1800);for(let a=0;a<(t?6:4);a++){const r=document.createElement("div");r.className="heart",r.textContent="♥",r.style.left=15+Math.random()*70+"%",r.style.animationDelay=a*.12+"s",r.style.color=["#ff6b9a","#ff8fab","#e879c6","#b197fc"][a%4],n.appendChild(r),setTimeout(()=>r.remove(),1900)}C[o.snd]?.(),t&&setTimeout(()=>C.munch(),250)}function C2(){const e=document.querySelector("#ranchWorld .henHouse");e&&(e.classList.remove("lay"),e.offsetWidth,e.classList.add("lay"),C.cluck())}function hP(){const e=document.querySelector("#ranchWorld .henHouse"),t=L("basketChip");if(!e)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=document.createElement("div");o.className="flyEgg",o.innerHTML=pa,document.body.appendChild(o),Object.assign(o.style,{left:n.left+n.width/2-18+"px",top:n.top+n.height*.6+"px"}),requestAnimationFrame(()=>{o.style.left=s.left+s.width/2-18+"px",o.style.top=s.top+"px",o.style.transform="scale(.6) rotate(200deg)"}),setTimeout(()=>{o.remove(),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")},650)}function I2(e){const t=document.getElementById("rfx");if(!t||R!=="ranch")return;const n=fn(),[s,o]=ip[e]??ip[0],i=1965+s,a=182+o,r=i+(e%2?26:-22),l=575+e*4,c=document.createElement("button");c.className="fallenApple",c.dataset.feed="apple",c.setAttribute("aria-label","Apple"),c.innerHTML=Hm;const d=32*n;Object.assign(c.style,{width:d+"px",height:d+"px",left:i*n-d/2+"px",top:a*n-d/2+"px",zIndex:va(l)}),t.appendChild(c),requestAnimationFrame(()=>{c.style.left=r*n-d/2+"px",c.style.top=l*n-d+"px",c.classList.add("fallen")});const f=document.querySelector("#ranchWorld .appleTree");f?.classList.remove("shake"),f?.offsetWidth,f?.classList.add("shake"),C.boing(),setTimeout(()=>c.remove(),12e3)}function O2(){const e=document.querySelector("#ranchWorld .tractor");e?.classList.remove("bounce"),e?.offsetWidth,e?.classList.add("bounce"),C.honk()}function uP(e){e.k==="zoo"?Eh(e.a,e.f):e.k==="apple"?I2(e.v):e.k==="honk"?O2():e.k==="hen"&&C2()}function t0(e,t){const n=document.elementFromPoint(e,t);if(!n)return null;const s=n.closest("[data-animal]");if(s)return+s.dataset.animal;const o=n.closest(".horse:not(.away)");if(o)return Js.length+ +o.dataset.horse;const i=n.closest(".savatar.riding");return i?.dataset.ride?Js.length+ +i.dataset.ride:null}function Xd(e,t,n){e.preventDefault(),e.stopPropagation();const s=document.createElement("div");s.className="feedGhost",s.innerHTML=Wm[t],document.body.appendChild(s);const o=y=>{s.style.left=y.clientX-30+"px",s.style.top=y.clientY-50+"px"};o(e),C.pick();let i=0;const a=e.clientX,r=e.clientY;n instanceof HTMLElement&&(n.style.visibility="hidden");let l=e.clientX,c=0;const d=L("ranchScroll"),f=()=>{const y=d.getBoundingClientRect(),m=l<y.left+60?-12:l>y.right-60?12:0;m&&i>12&&R==="ranch"&&(d.scrollLeft+=m),c=requestAnimationFrame(f)};c=requestAnimationFrame(f);const u=y=>{if(y.pointerId!==e.pointerId)return;l=y.clientX,i=Math.max(i,Math.hypot(y.clientX-a,y.clientY-r)),o(y),document.querySelectorAll(".feedHover").forEach(k=>k.classList.remove("feedHover")),t0(y.clientX,y.clientY)!==null&&document.elementFromPoint(y.clientX,y.clientY)?.closest(".animal, .horse, .savatar")?.classList.add("feedHover")},p=y=>{if(y.pointerId!==e.pointerId)return;cancelAnimationFrame(c),window.removeEventListener("pointermove",u),window.removeEventListener("pointerup",p),s.remove(),T2=Date.now(),document.querySelectorAll(".feedHover").forEach(b=>b.classList.remove("feedHover"));const m=t0(y.clientX,y.clientY);if(m===null){n instanceof HTMLElement&&(n.style.visibility=""),i<12?F("Drag the food onto an animal! 🥕"):C.drop();return}if(n==="basket"&&!Fo({op:"use",kind:"carrot"}))return;n instanceof HTMLElement&&n.remove();const k=Zy.indexOf(t);Eh(m,k),v?.fx({k:"zoo",a:m,f:k})};window.addEventListener("pointermove",u),window.addEventListener("pointerup",p)}L("ranchWorld").addEventListener("pointerdown",e=>{const t=e.target,n=t.closest(".bucket");if(n)return Xd(e,n.dataset.feed,"bucket");const s=t.closest(".fallenApple");if(s)return Xd(e,"apple",s);t.closest(".rprop, .animal, .horse, .plot, .pet")&&e.stopPropagation()});L("ranchWorld").addEventListener("click",e=>{const t=e.target;if(!Mn()||R!=="ranch"||Date.now()-T2<400)return;const s=t.closest("[data-animal]");if(s){const f=+s.dataset.animal;Eh(f,0),v?.fx({k:"zoo",a:f,f:0});return}const o=t.closest("[data-horse]");if(o){fP(+o.dataset.horse);return}const i=t.closest("[data-r]")?.dataset.r;if(i==="egg"){C2(),Fo({op:"egg"})&&(hP(),C.pickup());return}if(i==="honk"){O2(),v?.fx({k:"honk"});return}if(i==="apple"){const f=Math.floor(Math.random()*4);I2(f),v?.fx({k:"apple",v:f});return}if(i==="barn"){_a(!0);return}if(i==="exit"){_a(!1);return}if(i==="mill"){const f=t.closest(".windmill");f?.classList.remove("whirl"),f?.offsetWidth,f?.classList.add("whirl"),C.swish();return}const a=t.closest("[data-plot]");if(a){pP(+a.dataset.plot,a);return}if(t.closest(".bucket, .fallenApple, .savatar, .pet"))return;const r=L("ranchWorld").getBoundingClientRect(),l=fn(),c=(e.clientX-r.left)/l,d=(e.clientY-r.top)/l;d<400||S2(c,d)});function pP(e,t){const n=tc()[e]??null,s=El(n,ec());if(document.querySelector(".seedPick")?.remove(),!n){const o=document.createElement("div");o.className="seedPick",o.innerHTML=`<button data-seed="carrot">${Ql}<span>Carrot</span></button><button data-seed="flower">${Nf()}<span>Flower</span></button>`,t.parentElement.appendChild(o),o.style.left=t.offsetLeft+t.offsetWidth/2+"px",o.style.top=t.offsetTop-8+"px",o.addEventListener("pointerdown",i=>i.stopPropagation()),o.addEventListener("click",i=>{i.stopPropagation();const a=i.target.closest("[data-seed]")?.dataset.seed;o.remove(),a&&Fo({op:"plant",i:e,seed:a})&&(C.plant(),F("Planted! Now tap it to water 💧"))}),setTimeout(()=>o.remove(),6e3);return}if(!n.wet){Fo({op:"water",i:e})&&(C.water(),t.classList.remove("watering"),t.offsetWidth,t.classList.add("watering"));return}if(s<3){F("Still growing! 🌱"),C.pop();return}Fo({op:"pick",i:e})&&(C.pickup(),F(n.seed==="carrot"?"A carrot for your basket! 🥕":"Pretty flowers for your basket! 🌸"))}let n0=0;function gP(e,t){if(R!=="ranch")return;const n=Date.now();if(document.querySelectorAll("#ranchWorld .animal").forEach(s=>{const o=+s.dataset.animal,i=fn(),a=n/5200+o*1.7,r=(qe?lf:qy)[o]+Math.sin(a)*32;s.style.left=(r-s.offsetWidth/i/2)*i+"px",s.classList.toggle("flipped",Math.cos(a)<0),s.classList.toggle("walking",Math.abs(Math.cos(a))>.35)}),e-n0>1e3&&(n0=e,nc()),At.length){const s=Mn();if(!s||s.where!==P2())At=[];else{const o=At[0],i=s.ride!==void 0?720:300,a=o.x-s.x,r=o.y-s.y,l=Math.hypot(a,r);if(l<6)At.shift();else{const c=Math.min(l,i*t),d={...s,x:s.x+a/l*c,y:s.y+r/l*c,flip:Math.abs(a)>2?a<0:s.flip};an(d);const f=fn(),u=L("ranchScroll"),p=d.x*f-u.scrollLeft;p>-40&&p<u.clientWidth+40&&(p<u.clientWidth*.2||p>u.clientWidth*.8)&&(u.scrollLeft=d.x*f-u.clientWidth/2)}}}for(const[s,o]of _s){const i=document.querySelector(`#ranchWorld .horse[data-horse="${s}"]`);if(!i||i.classList.contains("away")){_s.delete(s);continue}const a=As(s)-o.x,r=lo-o.y,l=Math.hypot(a,r);if(l<8){_s.delete(s),i.classList.remove("trotting","flipped"),pl(i,As(s),lo);continue}const c=Math.min(l,460*t);o.x+=a/l*c,o.y+=r/l*c,i.classList.add("trotting"),i.classList.toggle("flipped",a<0),pl(i,o.x,o.y)}}function Sh(){const e=document.getElementById("basketChip");if(!e)return;const t=R==="house"&&(!v||Re===ee||me===v.myHouseId()),n=Ua(),o=n.egg+n.carrot+n.flower>0&&(R==="ranch"||t);e.classList.toggle("hidden",!o),e.classList.toggle("inHouse",R==="house"),o&&(e.innerHTML=`<span class="bIcon">${qi("basket",k9)}</span><span class="bcount" data-kind="egg">${pa}<b>${n.egg}</b></span><span class="bcount" data-kind="carrot">${Ql}<b>${n.carrot}</b></span><span class="bcount" data-kind="flower">${Nf()}<b>${n.flower}</b></span>`)}L("basketChip").addEventListener("pointerdown",e=>{e.target.closest('.bcount[data-kind="carrot"]')&&R==="ranch"&&Ua().carrot>0&&Xd(e,"carrot","basket")});L("basketChip").addEventListener("click",()=>mP());function mP(){const e=R==="house"&&(!v||Re===ee||me===v.myHouseId()),t={egg:["Eggs",pa],carrot:["Carrots",Ql],flower:["Flowers",Nf()]},n=Yt("",(o,i)=>{const a=o.closest("[data-take]")?.dataset.take;if(!a)return;if(!e){F("Take it home to put it in your room! 🏠");return}const r="r"+Math.random().toString(36).slice(2,10),l=Math.max(120,Math.min(ue-120,ie+G/2+(Math.random()-.5)*300));Fo({op:"take",kind:a,id:r,room:S.get().currentRoom,x:l})&&(C.drop(),i(),F("It's in your room! Drag it to a hand to carry it ✋"))},"basketSheet"),s=Ua();n.root.querySelector(".card").innerHTML=`${Kt}<h2>My Basket</h2><p class="hint small">${e?"Tap one to put it in your room.":"Collect eggs, carrots and flowers at Rainbow Ranch, then take them home!"}</p>
    <div class="basketRows">${f0.map(o=>`<button class="bRow" data-take="${o}" ${s[o]?"":"disabled"}>${t[o][1]}<b>${s[o]}</b><span>${t[o][0]}</span></button>`).join("")}</div>`}window.__ranch=()=>({view:R,inBarn:qe,plots:tc().map(e=>e?{seed:e.seed,stage:El(e,ec()),wet:!!e.wet}:null),basket:Ua(),me:Mn(),ridden:[...A2().keys()]});function yP(){const e=()=>{const s=document.getElementById("phoneNote");if(s&&!s.classList.contains("hidden")&&getComputedStyle(s).display!=="none"){const o=()=>{Mr||!s.classList.contains("hidden")&&getComputedStyle(s).display!=="none"||(s.classList.add("hidden"),Mr=!0,window.removeEventListener("resize",o),Se.hint())};L("phoneOk").addEventListener("click",()=>setTimeout(o,0),{once:!0}),window.addEventListener("resize",o);return}Mr=!0,Se.hint()};if(Oi.kind==="none"){e();return}Z9();const t=Yt(G9(Oi.kind,Oi.entries),(s,o)=>{s.closest("#wnGo")&&(C.sparkle(),o())},"whatsNew "+Oi.kind);t.root.querySelector(".card").insertAdjacentHTML("afterbegin",Kt);const n=new MutationObserver(()=>{t.root.isConnected||(n.disconnect(),e())});n.observe(document.body,{childList:!0})}setTimeout(yP,500);window.__whatsnew=Oi;window.__hood=()=>v;window.__hood_url=()=>Pl();window.__ui=()=>({view:R,currentHouseId:me,mode:v?"hood":"solo",play:Se.mode()});NE({hood:()=>v,view:()=>R,solo:()=>Vt,myPres:ye,setPres:an,toast:F,refreshNear:So,sfx:C,goMap:jo,soloLook:()=>{const e=ee.get();return{look:La(e.characters[0]??{}),dog:e.dog??null}}});function B2(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n.items)t.add(s.kind);for(const n of e.characters)n.held.left&&t.add(n.held.left.kind),n.held.right&&t.add(n.held.right.kind);return e.baby&&t.add("baby"),[...t]}let mr=null,Th=()=>!1;function D2(e){return mr||(mr=Cs(()=>h(()=>Promise.resolve().then(()=>Il),void 0)).then(t=>(Th=t.hasArt,t.boot(location.search,B2(S.get())))).then(t=>{for(let n=0;n<t.length;n++)if(de[t[n]]){$o();break}Z1()}),mr)}function bP(e){const t=new Set(e),n=S.get();let s=!1;for(const o of n.rooms[n.currentRoom].items){const i=de[o.kind];if(!t.has(o.kind)||!i||o.art)continue;const a=X.querySelector(`.item[data-id="${o.id}"] .inner`);!a||a.querySelector("img.artimg")||(a.innerHTML=Ut(i,!0),s=!0)}on(n),Fl(),s&&Z1()}let s0=null;function wP(){if(s0)return;const e=Ss.filter(t=>t.kind!=="people"&&t.icon&&de[t.icon]).map(t=>t.icon);s0=Cs(()=>h(()=>Promise.resolve().then(()=>Il),void 0)).then(t=>t.loadArtKinds(e)).then(()=>Y1(),()=>{})}for(const e of["cats","shelf"])document.getElementById(e)?.addEventListener("pointerdown",wP,{once:!0,passive:!0});function kP(){return Cs(()=>h(()=>Promise.resolve().then(()=>Il),void 0)).then(e=>e.boot(location.search,B2(S.get()))).then(e=>{bP(e.filter(t=>!!de[t]))})}n4();R5();pE();x7();K7(e=>e==="backyard"?y5():null);L("scenery").addEventListener("click",e=>{const t=e.target.closest("[data-yard-go]");t&&ih(t.dataset.yardGo==="backyard"?"backyard":"living")});const vP=aE(L("skyMount"));window.__sky=vP;Zl=k4({layer:X,stageWrap:L("stageWrap"),get:()=>S.get(),dispatch:e=>S.dispatch(e),clock:()=>v&&Re!==ee?v.now():Date.now(),canSend:()=>!v||Re===ee||!!v.speaksBaby,owner:()=>eh(),inHouse:()=>R==="house",play:()=>Se.isPlay(),editable:()=>ht(),toRoom:Qe,box:e=>{const t=de[e.kind];return t?{id:e.id,kind:e.kind,x:e.x,footY:Lo(t,e.y),flip:!!e.flip,scale:Ge(e),w:t.w,h:Xe(t),z:e.z}:null},holderId:()=>v&&Re!==ee&&v.pid?v.pid:De||S.get().characters[0]?.id||"c1",holderSpot:e=>{const t=S.get(),n=v&&Re!==ee&&v.pid?v.pid:De||t.characters[0]?.id||"",s=e||n,o=(a,r,l,c,d,f)=>{const u=c?.pose==="sit"||c?.pose==="lie"?c.pose:null,p=u==="lie"?t.rooms[t.currentRoom]?.items.find(m=>m.id===c?.item):void 0,y=d&&/^#[0-9a-fA-F]{6}$/.test(d)?d:"#f1c27d";return{x:a.x,y:a.y,flip:r,scale:l>0?l:1,pose:u,lieFlip:!!(u==="lie"&&p?.flip),skin:y,chibi:!!f}},i=t.characters.find(a=>a.id===s&&a.room===t.currentRoom);if(i){const a=Ct(i);return o(Rt(t.currentRoom,a,i),i.flip,mo[i.size]??1,a,i.look2&&i.look2.skin||i.skin,!!i.look2)}if(v&&R==="house"){const a=s===v.pid?ye():v.presence.get(s);if(a&&a.where==="house"&&a.houseId===me&&a.room===t.currentRoom){const r=dn(s,a),l=v.players.get(s)?.look,c=l?.size??"kid";return o(Rt(t.currentRoom,r,a),a.flip,mo[c]??1,r,l?.look2&&l.look2.skin||l?.skin||"#f1c27d",!!l?.look2)}}return null},holderHere:e=>{if(!e)return!1;if(S.get().characters.some(s=>s.id===e))return!0;if(!v||Re===ee)return!1;const n=e===v.pid?ye():v.presence.get(e);return!!(n&&n.where==="house"&&n.houseId===me)},occupied:()=>vo(void 0,v?.pid,!0),locked:()=>Yn(null),seatAt:(e,t,n)=>Rt(e,t,n)}).render;y1=()=>Zl();$o();zt();Ds();_P();Ds();sc();E1();_r();fi.matches?Ps():Ds();requestAnimationFrame(()=>{Ds(),sc(),jl()});function _P(){if(!Zf)return;const e=yd(),t=S.get().characters[0];if(!t)return;const n=e==="door";if(S.dispatch({type:"char/update",id:t.id,patch:{...Ox(),flip:n?kd.flip:wd.flip}}),S.dispatch({type:"cat/set",cat:{name:"Clover",coat:3,room:n?"living":"backyard",x:n?Nr:ms.x}}),S.dispatch({type:"dog/set",dog:{name:"Sunny",breed:3,owner:t.id}}),!S.get().rooms.backyard.items.some(s=>s.kind==="yard-swing"))for(const s of Bx)S.dispatch({type:"item/add",room:"backyard",item:{id:"yp-"+s.kind,kind:s.kind,x:s.x,y:s.y,flip:!1,z:1,scale:s.scale??1}});if(e!=="sheet"){const s=n?kd:wd;S.dispatch({type:"char/move",id:t.id,room:n?"living":"backyard",x:s.x,y:s.y}),S.dispatch({type:"room/switch",room:n?"living":"backyard"})}window.__pinCat=n?{x:Nr}:{x:ms.x,y:ms.y},e==="play"?L("modePlay").click():(e==="decorate"||e==="door")&&L("modeDecorate").click(),e==="sheet"&&document.body.insertAdjacentHTML("beforeend",v5()),e==="compare"&&document.body.insertAdjacentHTML("beforeend",$5()),document.body.dataset.yard="ready"}function $P(e){const t=S.get(),n=e==="backyard"?wd:kd;Wt=null;const s=t.characters.find(o=>o.id===De&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(s&&(S.dispatch({type:"char/update",id:s.id,patch:{flip:n.flip}}),S.dispatch({type:"char/move",id:s.id,room:e,x:n.x,y:n.y})),Zf&&t.cat&&(S.dispatch({type:"cat/move",room:e,x:e==="backyard"?ms.x:Nr}),window.__pinCat=e==="backyard"?{x:ms.x,y:ms.y}:{x:Nr}),S.dispatch({type:"room/switch",room:e}),v&&Re!==ee){const o=ye();if(o&&o.where==="house"){const i=o.houseId?hh(o.houseId,e,n):n;nt({...o,room:e,x:i.x,y:i.y,flip:n.flip})}}requestAnimationFrame(()=>sc())}function Ph(){const e=S.get(),t=v&&ye(),n=t&&t.where==="house"?t.x:e.characters.find(o=>o.room===e.currentRoom)?.x;if(n===void 0)return;const s=H2(e,n,ie);Math.abs(s-ie)>.5&&Je(s)}function H2(e,t,n){if(G>=1e3||document.body.classList.contains("phone")||e.currentRoom==="backyard")return n;n=ti(n);const s=90;let o=null;for(const i of e.rooms[e.currentRoom]?.items??[]){const a=de[i.kind];if(!a||a.wall)continue;const r=a.w*Ge(i),l=i.x-r/2,c=i.x+r/2;if(r<160||r>G-2*s||!(l<n&&c>n||l<n+G&&c>n+G))continue;const f=ti(l<n?l-16:c+16-G);t-s<f||t+s>f+G||l<f-1||c>f+G+1||(!o||r>o.w)&&(o={cam:f,w:r})}return e.currentRoom==="living"?xP(e,t,o?o.cam:n,s):o?o.cam:n}function xP(e,t,n,s){let a=(e.rooms.living?.items??[]).flatMap(r=>{const l=de[r.kind];if(!l||l.wall)return[];const c=l.w*Ge(r);return c>=60?[{l:r.x-c/2,r:r.x+c/2,w:c}]:[]}).filter(r=>r.r>n&&r.l<n+G);if(!a.some(r=>r.l<n+8||r.r>n+G-8))return n;for(a.sort((r,l)=>l.w-r.w);a.length;){const r=Math.max(Math.max(...a.map(c=>c.r))+8-G,t+s-G),l=Math.min(Math.min(...a.map(c=>c.l))-8,t-s);if(r<=l){const c=ti(Math.min(l,Math.max(r,n)));if(c>=r-1&&c<=l+1)return c}a=a.slice(0,-1)}return n}function sc(){if(S.get().currentRoom==="backyard"){Je(bd),hs();return}if(!Zf||yd()==="sheet"||yd()==="compare")return;const e=S.get().characters.find(t=>t.room===S.get().currentRoom);e&&Je(e.x-G/2),hs()}function hs(){if(_o||Y.getBoundingClientRect().width<20)return;const t=yt()||parseFloat(Y.style.getPropertyValue("--yard-sc"))||1;Y.style.setProperty("--yard-sc",String(t));const n=[...Y.querySelectorAll(".yardDoor")];for(const y of n){y.style.minWidth="",y.style.transform="";const m=y.querySelector(".yardHintLabel");if(!m)continue;m.style.transform="",m.style.translate="";const k=m.querySelector("span");k&&(k.style.transform="");const b=Math.max(13,16/t);m.style.fontSize=b+"px",m.style.lineHeight="1";const g=38/t;m.style.height=g+"px";const w=3/t,_=Math.max(0,(g-w*2-b)/2);m.style.padding=`${_.toFixed(2)}px ${(14/t).toFixed(2)}px`}const s=n[0];if(!s)return;const o=s.querySelector(".doorArt"),i=s.querySelector(".yardHintLabel"),a=6,r=()=>{const y=Y.getBoundingClientRect(),m=s.getBoundingClientRect(),k=o?.getBoundingClientRect(),b=i?.getBoundingClientRect(),g=[m,k,b].filter(x=>!!x&&x.width>2&&x.height>2),w=Math.min(...g.map(x=>x.top)),_=Math.max(...g.map(x=>x.bottom));let P=y.left+a,$=y.right-a;for(const x of["nudgeL","nudgeR"]){const H=L(x);if(!H||H.classList.contains("off")||H.offsetParent===null)continue;const V=H.getBoundingClientRect();if(V.width<2||V.height<2)continue;const Q=se=>se.top<V.bottom-1&&se.bottom>V.top+1,q=[m,k].some(se=>se&&se.width>2&&Q(se));!q&&(w>=V.bottom-1||_<=V.top+1)||(x==="nudgeL"&&q?P=Math.max(P,V.right+8):x==="nudgeR"&&q&&($=Math.min($,V.left-8)))}return{leftLimit:P,rightLimit:$,doorR:m,artR:k,hintR:b}};let l=0,c=0;for(;l++<4;){const{leftLimit:y,rightLimit:m,doorR:k,artR:b}=r();let g=0;const w=Math.min(k.left,b&&b.width>2?b.left:k.left),_=Math.max(k.right,b&&b.width>2?b.right:k.right);if(w<y&&(g+=y-w),_+g>m&&(g-=_+g-m),Math.abs(g)<.5)break;c+=g,s.style.transform=`translate(${(c/t).toFixed(1)}px, 0)`}if(!i){Dp(s);return}const d=i.querySelector("span");if(d){const y=document.createRange();y.selectNodeContents(d);const m=y.getBoundingClientRect(),k=i.getBoundingClientRect(),b=(k.top+k.bottom-(m.top+m.bottom))/2,g=d;m.height>2&&Math.abs(b)>=.1?g.style.transform=`translateY(${(b/t).toFixed(2)}px)`:g.style.transform=""}const f=i.getBoundingClientRect(),u=Y.getBoundingClientRect();let p=0;if(S.get().currentRoom==="backyard"&&o){const y=o.getBoundingClientRect();y.width>2&&(p+=(y.left+y.right)/2-(f.left+f.right)/2)}f.left+p<u.left+a?p+=u.left+a-(f.left+p):f.right+p>u.right-a&&(p-=f.right+p-(u.right-a)),Math.abs(p)>.5?i.style.translate=`calc(-50% + ${(p/t).toFixed(1)}px) 0`:i.style.translate="",Dp(s)}D2(S.get().currentRoom);const W2=()=>{const e=Dl().size,t=Qr.length,n=L("secrets"),s=n.querySelector(".secCount");s&&(s.textContent=`${e}/${t}`),n.setAttribute("aria-label",`Surprises, ${e} of ${t}`),_1()};function oc(){return window.innerHeight>window.innerWidth+40}function V2(e,t){for(const q of e)q.style.transform="";if(!oc()||!e.length)return;const n=t&&t.clientWidth>20?t.getBoundingClientRect():{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth};if(n.width<20)return;const s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,window.innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,window.innerHeight)-s,l=Math.max(40,i-o),c=Math.max(40,r-a),f=e.map(q=>q.getBoundingClientRect()).filter(q=>q.width>2&&q.height>2);if(!f.length)return;const u=Math.min(...f.map(q=>q.left)),p=Math.max(...f.map(q=>q.right)),y=Math.min(...f.map(q=>q.top)),m=Math.max(...f.map(q=>q.bottom)),k=Math.max(1,p-u),b=Math.max(1,m-y),g=Math.min(1,l/k,c/b);if(g>.995&&u>=o-1&&p<=i+1&&y>=a-1&&m<=r+1)return;const _=e[0].getScreenCTM(),P=_&&Math.hypot(_.a,_.b)||1,$=(u+p)/2,x=(y+m)/2,H=b*g,V=(o+i)/2,Q=y>=a&&m<=r?x:Math.min(Math.max(x,a+H/2),r-H/2);for(const q of e){const se=q.getBoundingClientRect(),Me=(se.left+se.right)/2,Ke=(se.top+se.bottom)/2,Ie=V+(Me-$)*g,I=Q+(Ke-x)*g;q.style.transformBox="fill-box",q.style.transformOrigin="center",q.style.transform=`translate(${((Ie-Me)/P).toFixed(2)}px, ${((I-Ke)/P).toFixed(2)}px) scale(${g.toFixed(3)})`}}function U2(){if(R!=="gameroom")return;const e=document.getElementById("grScroll");V2([...document.querySelectorAll(".neonSignArt")],e)}function Jd(){R!=="ranch"||qe||(document.querySelectorAll(".ranchSignArt").forEach(e=>{e.style.transform=""}),dt(),z2(),Ah())}function Ah(){if(R!=="ranch"||qe)return;const e=document.getElementById("ranchScroll");if(!e)return;const t=e.getBoundingClientRect();document.querySelectorAll(".ranchSignArt").forEach(n=>{const s=n.getBoundingClientRect(),o=Math.min(t.right,innerWidth),i=Math.max(0,t.left-s.left)+Math.max(0,s.right-o);n.style.visibility=s.width>20&&i<8?"visible":"hidden"})}L("ranchScroll").addEventListener("scroll",()=>{R==="ranch"&&!qe&&Ah()},{passive:!0});function z2(){const e=document.querySelector(".doorHint"),t=document.getElementById("ranchScroll");if(!e||!t)return;e.style.transform="translateX(-50%)";const n=t.getBoundingClientRect(),s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,innerHeight)-s,l=e.getBoundingClientRect();let c=0;l.right>i&&(c-=l.right-i),l.left+c<o&&(c+=o-(l.left+c));let d=0;const f=t.querySelector(".savatar");if(f){const u=f.getBoundingClientRect(),y=f.querySelector(".nametag")?.getBoundingClientRect(),m=!!(y&&y.width>4&&y.height>4),k=m?Math.min(u.top,y.top):u.top,b=m?Math.min(u.left,y.left):u.left,g=m?Math.max(u.right,y.right):u.right,w=l.left+c;l.right+c>b-6&&w<g+6&&l.bottom+d>k-6&&l.top<u.top+u.height*.72&&(d+=k-48-(l.bottom+d))}if(l.top+d<a&&(d+=a-(l.top+d)),document.body.classList.contains("phone-portrait")){const u=document.querySelector(".ranchSign .ranchSignArt");if(u){const p=u.getBoundingClientRect(),y=l.left+c,m=l.right+c,k=l.top+d,b=l.bottom+d;if(p.width>20&&p.height>p.width*.7&&m>p.left+4&&y<p.right-4&&b>p.top+4&&k<p.bottom-4){let w=p.top-16-b;k+w<a&&(w+=a-(k+w));const P=f?.querySelector(".nametag")?.getBoundingClientRect(),$=b+w;!(P&&P.width>4&&P.height>4&&$>P.top-12&&m>P.left-6&&y<P.right+6)&&$<=r&&(d+=w)}}}(c||d)&&(e.style.transform=`translate(calc(-50% + ${c.toFixed(1)}px), ${d.toFixed(1)}px)`)}const Q2=W4({world:Gf,roomW:ue,roomH:Ce,currentRoom:()=>S.get().currentRoom,sparkle:()=>C.sparkle(),tap:()=>C.click(),onFound:(e,t)=>{if(W2(),t){const n=L("secrets");n.classList.remove("pulse"),n.offsetWidth,n.classList.add("pulse"),setTimeout(()=>F("🎁 A secret surprise appeared in your drawer!"),1400),zt()}}});S.subscribe((e,t)=>{(t.type==="room/switch"||t.type==="game/reset")&&Q2.update()});W2();window.__eggs=()=>({found:[...Dl()]});bT();const ef={restored:"The saved house had a hiccup, so we opened the last good copy.",unreadable:"We couldn't open the saved house, so we started a new one. The old one is kept safely on this iPad.",full:"This iPad is out of room, so new changes can't be saved yet. Your house is safe for now. To free space, delete old photos or apps in Settings › General › iPad Storage."},Yc=ee.trouble(),o0=[Yc?ef[Yc]:"",ee.fullAtStart&&Yc!=="full"?ef.full:""].filter(Boolean).join(" ");o0&&F0(o0);ee.onTrouble(e=>F0(ef[e]));
