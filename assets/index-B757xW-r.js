(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const Ju="modulepreload",e0=function(e){return"/kids-house-game/"+e},Fd={},p=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(n.map(l=>{if(l=e0(l),l in Fd)return;Fd[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":Ju,c||(f.as="script"),f.crossOrigin="",f.href=l,r&&f.setAttribute("nonce",r),document.head.appendChild(f),c)return new Promise((h,g)=>{f.addEventListener("load",h),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return o.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})},ui="#5a3d5c",X=(e=4)=>`stroke="${ui}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,tl=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],Bn=1e3,An=700,nl="M 30 660 C 150 640, 200 540, 330 545 S 540 650, 690 600 S 925 470, 850 375 S 640 330, 520 355 S 270 385, 250 285 S 330 145, 480 150 S 700 200, 790 150",Qn={x:115,y:170},cn={x:880,y:120},fn={x:600,y:480},zn={x:400,y:260},zp=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${X(3)}/><circle cx="0" cy="-10" r="20" fill="${s}" ${X(3)}/><circle cx="-12" cy="-2" r="12" fill="${s}" ${X(3)}/><circle cx="12" cy="-3" r="13" fill="${s}" ${X(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`,bs=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})" fill="#fff"><ellipse cx="0" cy="10" rx="46" ry="22"/><ellipse cx="-36" cy="16" rx="28" ry="16"/><ellipse cx="38" cy="14" rx="30" ry="18"/><ellipse cx="10" cy="2" rx="24" ry="18"/></g>`,oi=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">${[0,72,144,216,288].map(o=>`<circle cx="${(Math.cos(o*Math.PI/180)*8).toFixed(1)}" cy="${(Math.sin(o*Math.PI/180)*8).toFixed(1)}" r="6.5" fill="${n}" ${X(2)}/>`).join("")}<circle r="4.5" fill="#ffd43b" ${X(2)}/></g>`,qn=(e,t,n)=>`<g transform="translate(${e} ${t})">${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*4}" cy="${Math.sin(s*Math.PI/180)*4}" r="3.6" fill="${n}"/>`).join("")}<circle r="2.6" fill="#ffd43b"/></g>`;function t0(){return`<svg class="mapBg" viewBox="0 0 ${Bn} ${An}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${Bn}" height="${An}" rx="34" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="160" cy="420" rx="150" ry="90"/><ellipse cx="760" cy="250" rx="170" ry="70"/><ellipse cx="480" cy="640" rx="140" ry="50"/><ellipse cx="930" cy="600" rx="90" ry="110"/></g>
  <g fill="#93d78e" opacity=".7"><ellipse cx="420" cy="260" rx="70" ry="30"/><ellipse cx="80" cy="560" rx="60" ry="26"/><ellipse cx="700" cy="420" rx="50" ry="22"/></g>
  <!-- pond -->
  <ellipse cx="120" cy="470" rx="72" ry="40" fill="#8ecae6" ${X()}/><ellipse cx="108" cy="462" rx="42" ry="16" fill="#bde6f7"/><path d="M150 480 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <!-- side paths to the park and the ranch -->
  <path d="M250 285 Q190 250 150 215" fill="none" stroke="${ui}" stroke-width="30" stroke-linecap="round"/><path d="M250 285 Q190 250 150 215" fill="none" stroke="#f2dcb8" stroke-width="22" stroke-linecap="round"/>
  <!-- the street -->
  <path d="${nl}" fill="none" stroke="${ui}" stroke-width="58" stroke-linecap="round"/>
  <path id="mapRoad" d="${nl}" fill="none" stroke="#f2dcb8" stroke-width="48" stroke-linecap="round"/>
  <path d="${nl}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 16" stroke-linecap="round" opacity=".9"/>
  <!-- town square -->
  <g transform="translate(${fn.x} ${fn.y})"><circle r="74" fill="#f7e6c8" ${X()}/><circle r="74" fill="none" stroke="#e6cfa6" stroke-width="10" stroke-dasharray="10 12" transform="scale(.82)"/>
    <circle r="30" fill="#bde6f7" ${X()}/><circle r="13" fill="#fff6e6" ${X(3)}/><path d="M0 -13 Q-8 -32 -16 -20 M0 -13 Q8 -32 16 -20 M0 -13 V-34" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>
    ${qn(-52,-40,"#ff8fab")}${qn(54,-38,"#b197fc")}${qn(-56,40,"#ffd43b")}${qn(52,44,"#ff8fab")}</g>
  ${[[60,330,"#ff8fab"],[300,470,"#b197fc"],[430,560,"#ffd43b"],[760,520,"#ff8fab"],[950,260,"#b197fc"],[600,260,"#ffd43b"],[380,90,"#ff8fab"],[40,120,"#b197fc"],[960,420,"#ffd43b"],[840,640,"#b197fc"],[210,620,"#ff8fab"]].map(([e,t,n])=>qn(+e,+t,String(n))+qn(+e+14,+t+8,String(n))).join("")}
  </svg>`}function jd(e,t,n=Bn,s=An){const o=[];let i=7;const a=()=>(i=(i*9301+49297)%233280)/233280;for(let r=0;r<260&&o.length<34;r++){const l=30+a()*(n-60),c=40+a()*(s-70);t(l,c)||e.some(d=>Math.hypot(d.x-l,d.y-c)<d.r)||(e.push({x:l,y:c,r:46}),o.push(zp(l,c,.75+a()*.45,["#5cc985","#4fbf7a","#78d39a"][r%3])))}return`<svg class="mapTrees" viewBox="0 0 ${n} ${s}" xmlns="http://www.w3.org/2000/svg">${o.join("")}</svg>`}function n0(e,t){const n=e/2,s=`M ${n} 36 C ${n-36} ${t*.28}, ${n+28} ${t*.48}, ${n-8} ${t*.68} S ${n+18} ${t*.86}, ${n} ${t-28}`;return`<svg class="mapBg" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="${t}" rx="28" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="${e*.22}" cy="${t*.22}" rx="90" ry="48"/><ellipse cx="${e*.78}" cy="${t*.42}" rx="80" ry="40"/><ellipse cx="${e*.3}" cy="${t*.72}" rx="100" ry="46"/></g>
  <ellipse cx="78" cy="${t*.58}" rx="46" ry="28" fill="#8ecae6" ${X()}/><ellipse cx="70" cy="${t*.56}" rx="24" ry="10" fill="#bde6f7"/>
  <path d="${s}" fill="none" stroke="${ui}" stroke-width="44" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#f2dcb8" stroke-width="34" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round" opacity=".9"/>
  ${[[40,250,"#ff8fab"],[500,280,"#b197fc"],[70,520,"#ffd43b"],[490,640,"#ff8fab"],[50,860,"#74c0fc"],[500,980,"#ffd43b"]].map(([o,i,a])=>qn(+o,+i,String(a))+qn(+o+16,+i+10,String(a))).join("")}
  </svg>`}const s0=(e,t,n=1,s="#4fbf7a")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="10" rx="28" ry="8" fill="#000" opacity=".08"/><circle cx="-14" cy="-2" r="16" fill="${s}" ${X(3)}/><circle cx="14" cy="0" r="18" fill="${s}" ${X(3)}/><circle cx="0" cy="-12" r="14" fill="${s}" ${X(3)}/><circle cx="-4" cy="-16" r="4" fill="#fff" opacity=".28"/></g>`,o0=(e,t,n="#ff8fab")=>`<g transform="translate(${e} ${t})"><ellipse cx="-7" cy="-2" rx="8" ry="5" fill="${n}" ${X(2)} transform="rotate(-24)"/><ellipse cx="7" cy="-2" rx="8" ry="5" fill="${n}" ${X(2)} transform="rotate(24)"/><ellipse cx="-6" cy="4" rx="6" ry="4" fill="#b197fc" ${X(1.6)} transform="rotate(18)"/><ellipse cx="6" cy="4" rx="6" ry="4" fill="#b197fc" ${X(1.6)} transform="rotate(-18)"/><path d="M0 -6 V8" ${X(2)}/></g>`;function i0(e,t,n){const s=e/2,o=(f,h,g)=>h>t*.4&&h<t-28&&Math.abs(f-s)>52&&!n.some(m=>Math.hypot(m.x-f,m.y-h)<m.r+g),i=[.07,.15,.22,.78,.85,.93],a=[.46,.54,.62,.7,.78,.86,.93],r=["#ff8fab","#b197fc","#ffd43b","#74c0fc","#69db7c"],l=[];let c=0;a.forEach((f,h)=>{i.forEach((g,m)=>{const k=Math.round(e*g+((h+m)%2?8:-6)),$=Math.round(t*f);if((h+m)%3===0){if(!o(k,$,34))return;l.push(s0(k,$,.85+m%2*.15,["#4fbf7a","#5cc985","#3dae6a"][(h+m)%3]))}else{if(!o(k,$,18))return;const y=r[(h*2+m)%r.length];l.push(oi(k,$,y,.85)),(h+m)%2===0&&o(k+18,$+12,14)&&l.push(oi(k+18,$+12,r[(h+m+2)%r.length],.7))}c++})});const d=[[e*.2,t*.5],[e*.8,t*.66],[e*.18,t*.84]];for(const[f,h]of d)o(f,h,16)&&l.push(o0(Math.round(f),Math.round(h),c%2?"#ffd43b":"#ff8fab"));return`<svg class="mapMeadowFill" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">${l.join("")}</svg>`}const a0=`<svg class="mapSkyArt" viewBox="0 0 900 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
  ${bs(280,28,1.05)}${bs(430,8,.8)}${bs(560,36,.95)}
  ${bs(250,88,.75)}${bs(390,108,1.05)}${bs(540,96,.85)}${bs(640,78,.7)}
  <g fill="none" stroke-linecap="round">
    ${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M300 ${118+t*6} A70 48 0 0 1 430 ${112+t*6}" stroke="${e}" stroke-width="5"/>`).join("")}
  </g>
</svg>`,r0=`<svg class="mapMeadowArt" viewBox="0 0 900 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
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
  ${[[48,188,"#ff8fab",.85],[120,176,"#ffd43b",.7],[200,198,"#b197fc",.9],[280,172,"#ff8fab",.75],[360,204,"#74c0fc",.8],[450,178,"#ffd43b",.85],[530,200,"#ff8fab",.75],[620,174,"#b197fc",.8],[700,196,"#69db7c",.7],[790,180,"#ffd43b",.85]].map(([e,t,n,s])=>oi(+e,+t,String(n),+s)).join("")}
  ${[[80,248,"#ff8fab"],[160,268,"#b197fc"],[250,242,"#ffd43b"],[340,274,"#ff8fab"],[430,250,"#74c0fc"],[520,270,"#b197fc"],[610,246,"#ffd43b"],[700,272,"#ff8fab"],[790,252,"#69db7c"]].map(([e,t,n])=>oi(+e,+t,String(n),1.05)).join("")}
  ${[[110,304,"#ffd43b"],[230,292,"#ff8fab"],[360,308,"#b197fc"],[490,294,"#74c0fc"],[620,306,"#ff8fab"],[750,296,"#ffd43b"]].map(([e,t,n])=>oi(+e,+t,String(n),.9)).join("")}
</svg>`,Gd=`<svg viewBox="0 0 200 170"><ellipse class="parkLawn" cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${X()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${X(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${X(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${X(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${X(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${X(2.5)}/>
  ${zp(40,66,1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${X(3)}/><path d="M178 88 V132" ${X(4)}/>
</svg>`,Yd=`<svg viewBox="0 0 220 180"><ellipse class="ranchGrass" cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${X()}/>
  ${tl.map((e,t)=>`<path d="M${20+t*7} 120 A${90-t*7} ${84-t*7} 0 0 1 ${200-t*7} 120" fill="none" stroke="${e}" stroke-width="7"/>`).join("")}
  <path d="M60 140 V82 L80 58 H140 L160 82 V140 Z" fill="#ef5b5b" ${X(4)}/>
  <path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${ui}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  ${tl.map((e,t)=>`<path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${e}" stroke-width="1.3" transform="translate(0 ${-3+t*1.2})"/>`).join("")}
  <rect x="88" y="100" width="44" height="40" rx="3" fill="#d94848" ${X(3)}/><path d="M88 100 L132 140 M132 100 L88 140" stroke="#fff6e6" stroke-width="3"/>
  <rect x="94" y="70" width="32" height="18" rx="4" fill="#fff6e6" ${X(3)}/>
  <path d="M10 150 H52 M168 150 H212 M14 140 V158 M30 140 V158 M46 140 V158 M174 140 V158 M190 140 V158 M206 140 V158" stroke="#fff6e6" stroke-width="5" stroke-linecap="round"/><path d="M10 150 H52 M168 150 H212" ${X(1.5)}/>
  <g transform="translate(178 122) scale(.42)"><ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" ${X(5)}/><path d="M24 -8 L40 -34 L54 -26 L36 2 Z" fill="#fff" ${X(5)}/>${tl.slice(0,4).map((e,t)=>`<path d="M38 ${-34+t*5} q-14 4 -20 14" fill="none" stroke="${e}" stroke-width="5" stroke-linecap="round"/>`).join("")}<path d="M-20 14 V34 M20 14 V34" ${X(6)}/></g>
</svg>`,Kd=`<svg viewBox="0 0 190 156">
  <ellipse cx="95" cy="118" rx="88" ry="32" fill="#ffd0e6" ${X()}/>
  <path d="M28 108 V62 L95 28 L162 62 V108 Z" fill="#fff0f6" ${X(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="#ff6b9a" ${X(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="none" stroke="#ffd43b" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="78" y="78" width="34" height="30" rx="4" fill="#ff8ec8" ${X(3)}/>
  <path d="M95 86 C90 80 82 82 86 90 C90 96 95 100 95 100 C95 100 100 96 104 90 C108 82 100 80 95 86 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  <rect x="42" y="74" width="22" height="16" rx="3" fill="#66d9e8" ${X(2)}/><rect x="126" y="74" width="22" height="16" rx="3" fill="#d0bfff" ${X(2)}/>
  ${[36,52,68,84,100,116,132,148].map((e,t)=>`<circle class="clubBulb" cx="${e}" cy="58" r="3.2" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" ${X(1.4)}/>`).join("")}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`,Tc=`<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${X(3)}/><path d="M17 8 V35 M31 13 V40" ${X(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${X(2)}/></svg>`,Rc=e=>e.indexOf("data-chibi")>=0?e.replace('viewBox="0 0 200 320"','viewBox="24 0 152 168"'):e.replace('viewBox="0 0 100 160"','viewBox="14 2 72 74"'),ur=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),l0={"cute-speaker":"stereo","cc-record-player":"stereo","retro-radio":"stereo","music-box":"musicbox",tv:"tv",fireplace:"fire","brick-fireplace":"fire","wc-woodstove":"fire",woodstove:"fire","wc-stone-hearth":"fire","fire-pit":"fire"};function Yn(e){return l0[ur(e)]??null}function qp(e){return Yn(e)!==null}function Zp(e){const t=ur(e);return t==="ball"||t==="beach-ball"||t==="balloon"?"bounce":t==="teddy"||/plush/.test(t)?"hug":null}const Np=e=>/(^|-)tub$/.test(ur(e)),Fp=e=>/fridge$/.test(ur(e)),c0={stereo:220,musicbox:160,tv:280,fire:230},d0=70,f0=130,p0=.4,h0=6,Xd=2e4,wt=900,g0=["stereo","tv","fire","musicbox"];function u0(e,t){let n=2166136261;const s=e+"|"+t;for(let o=0;o<s.length;o++)n^=s.charCodeAt(o),n=Math.imul(n,16777619);return(n>>>0)%1e3/1e3}const Jd=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5);function m0(e,t,n={}){const s=new Map,o=[...t].sort((r,l)=>r.id<l.id?-1:r.id>l.id?1:0),i=e.filter(r=>r.on&&Yn(r.kind)&&!(Yn(r.kind)==="musicbox"&&n.musicBoxDone?.has(r.id))),a=[];for(const r of o){if(r.lying)continue;let l=null;for(const c of g0){for(const d of i){if(Yn(d.kind)!==c)continue;const f=Jd(r,d);if(f>c0[c]||r.seated&&c!=="tv"&&c!=="musicbox")continue;const h=c==="stereo"?"dance":c==="tv"?"watch":c==="fire"?"warm":"sway";(!l||f<l.d||f===l.d&&d.id<l.it.id)&&(l={c:r,it:d,d:f,kind:h})}if(l)break}if(!l&&!r.seated)for(const c of e){const d=Zp(c.kind);let f=null,h=Jd(r,c);d&&h<=d0?f=d:Fp(c.kind)&&n.fridgesOpen?.has(c.id)&&h<=f0?f="nibble":Np(c.kind)&&Math.abs(r.x-c.x)<=(c.w??240)*p0&&Math.abs(r.y-c.y)<=40&&(f="bathe"),f&&(!l||h<l.d||h===l.d&&c.id<l.it.id)&&(l={c:r,it:c,d:h,kind:f})}l&&a.push(l)}a.sort((r,l)=>r.d-l.d||(r.c.id<l.c.id?-1:1));for(const r of a.slice(0,h0))s.set(r.c.id,{kind:r.kind,item:r.it.id,phase:u0(r.it.id,r.c.id),face:r.it.x<r.c.x?-1:1});return s}function ii(e,t,n){return-((n+e*t)%t)}const y0={},jt=e=>(y0?.VITE_STORE_PREFIX??"")+e,b0=400,mr=["#ffe0c4","#f6d2b5","#f1c27d","#e0ac69","#c9956c","#c68642","#a86b3c","#8d5524","#5c3a1e","#3d2914"],yr=["#2b1d16","#5b3a29","#a0522d","#f4d58d","#ff8fab","#8ecae6","#b388d6","#ff9f43","#1d1416","#c8602a","#7a4b32","#f7f1e8"],Bc=["#5a321c","#3f9b52","#3d7ec4","#c48a3a","#7b4fb8"],Tt=["#ff7aa8","#ffd166","#5aa9e6","#80ed99","#c9a0dc","#ff9f68","#ffffff","#5a3d5c","#ff8f7a","#7ec8c3","#f7f3ee","#f4a3c8","#6b8e4e","#e8d5b5","#ef6b6b","#3d4a6b"],br=["short","bob","buns","topbun","pixie","long","wavy","puffs","afro","curlybob","coily","boxbraids","braids","sidebraid","crown","pony","sidepony","pigtails","lowbun","locs","halfup","bangs","sidebangs","wavybob"],kr=["classic","stripes","hoodie","sweater","tank","puff","ruffle","button","jersey","cardigan","bib","raincoat"],wr=["pants","jeans","shorts","skirt","tutu","leggings","overalls","joggers"],vr=["","twirl","sundress","party","pinafore","jumper","ballet","nightgown","raindress"],_r=["classic","sneakers","lightup","boots","rainboots","sandals","maryjanes","slippers"],$r=["round","big","sleepy","sparkle","soft","bright"],po=["glasses","square","sunnies","bow","bigbow","headband","flower","cap","beanie","sunhat","catears","earmuffs"],k0=new Set(br),w0=new Set(kr),v0=new Set(wr),_0=new Set(vr),$0=new Set(_r),x0=new Set($r),M0=new Set(po),L0=new Set(["short","pixie","coily","afro","bangs"]),E0=new Set(["buns","puffs"]),C0=new Set(["topbun","lowbun"]),S0={hair:"buns",hairC:"#5b3a29",skin:"#f1c27d",eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"pants",bottomC:"#5aa9e6",dress:"",dressC:"#ff7aa8",shoes:"classic",shoesC:"#5a3d5c",accC:"#ffd166"};function P0(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function eo(e,t){return typeof e=="string"&&t.has(e)}function $n(e,t){if(typeof e!="string")return null;const n=e.trim().toLowerCase();for(let s=0;s<t.length;s++)if(t[s]===n)return t[s];return null}function Ti(e){if(!P0(e))return null;let t=0;try{t=JSON.stringify(e).length}catch{return null}if(t>b0)return null;const n={v:1};eo(e.hair,k0)&&(n.hair=e.hair);const s=$n(e.hairC,yr);s&&(n.hairC=s);const o=$n(e.skin,mr);o&&(n.skin=o),eo(e.eyes,x0)&&(n.eyes=e.eyes);const i=$n(e.eyeC,Bc);i&&(n.eyeC=i),(e.freckles===!0||e.freckles===!1)&&(n.freckles=e.freckles),(e.blush===!0||e.blush===!1)&&(n.blush=e.blush),eo(e.top,w0)&&(n.top=e.top);const a=$n(e.topC,Tt);a&&(n.topC=a),eo(e.bottom,v0)&&(n.bottom=e.bottom);const r=$n(e.bottomC,Tt);r&&(n.bottomC=r),eo(e.dress,_0)&&(n.dress=e.dress);const l=$n(e.dressC,Tt);l&&(n.dressC=l),eo(e.shoes,$0)&&(n.shoes=e.shoes);const c=$n(e.shoesC,Tt);if(c&&(n.shoesC=c),Array.isArray(e.acc)){const f=[];for(let h=0;h<e.acc.length&&f.length<2;h++){const g=e.acc[h];typeof g=="string"&&M0.has(g)&&f.indexOf(g)<0&&f.push(g)}n.acc=f}const d=$n(e.accC,Tt);return d&&(n.accC=d),n}function cs(e){const t=S0,n=e??{};return{v:1,hair:n.hair??t.hair,hairC:n.hairC??t.hairC,skin:n.skin??t.skin,eyes:n.eyes??t.eyes,eyeC:n.eyeC??t.eyeC,freckles:n.freckles??t.freckles,blush:n.blush??t.blush,top:n.top??t.top,topC:n.topC??t.topC,bottom:n.bottom??t.bottom,bottomC:n.bottomC??t.bottomC,dress:n.dress??t.dress,dressC:n.dressC??t.dressC,shoes:n.shoes??t.shoes,shoesC:n.shoesC??t.shoesC,acc:n.acc?n.acc.slice():[],accC:n.accC??t.accC}}function ef(e){const t=/^#([0-9a-f]{6})$/i.exec(e.trim());if(!t){const s=/^#([0-9a-f]{3})$/i.exec(e.trim());return s?[parseInt(s[1][0]+s[1][0],16),parseInt(s[1][1]+s[1][1],16),parseInt(s[1][2]+s[1][2],16)]:null}const n=parseInt(t[1],16);return[n>>16&255,n>>8&255,n&255]}function qi(e,t){const n=$n(e,t);if(n)return n;const s=ef(e);if(!s)return t[0];let o=t[0],i=1e12;for(let a=0;a<t.length;a++){const r=ef(t[a]);if(!r)continue;const l=(s[0]-r[0])*(s[0]-r[0])+(s[1]-r[1])*(s[1]-r[1])+(s[2]-r[2])*(s[2]-r[2]);l<i&&(i=l,o=t[a])}return o}function T0(e){return L0.has(e)?0:E0.has(e)?2:C0.has(e)?3:1}function R0(e){for(let t=0;t<e.length;t++){const n=e[t];if(n==="glasses"||n==="square"||n==="sunnies")return 2}for(let t=0;t<e.length;t++){const n=e[t];if(n==="cap"||n==="beanie"||n==="sunhat")return 3}for(let t=0;t<e.length;t++){const n=e[t];if(n==="bow"||n==="bigbow")return 1}return 0}function xr(e){const t=cs(e),n=t.dress!=="";return{skin:t.skin,hair:t.hairC,hairStyle:T0(t.hair),shirt:n?t.dressC:t.topC,pants:n?t.dressC:t.bottomC,acc:R0(t.acc)}}const B0=["short","bob","buns","topbun"];function Ra(e){const t=typeof e.hairStyle=="number"&&e.hairStyle>=0&&e.hairStyle<=3?Math.round(e.hairStyle):0,n=e.acc===1?["bow"]:e.acc===2?["glasses"]:e.acc===3?["cap"]:[],s=qi(String(e.shirt??""),Tt);return{v:1,hair:B0[t],hairC:qi(String(e.hair??""),yr),skin:qi(String(e.skin??""),mr),eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:s,bottom:"pants",bottomC:qi(String(e.pants??""),Tt),dress:"",dressC:s,shoes:"classic",shoesC:"#5a3d5c",acc:n,accC:"#ffd166"}}function mi(e){const t=Ti(e)??{},n=cs(t);return{...xr(n),look2:n}}const A0=new Set(["glasses","square","sunnies"]),D0=new Set(["bow","bigbow","flower","headband"]),I0=new Set(["cap","beanie","sunhat","catears","earmuffs"]);function Ba(e){return A0.has(e)?"face":D0.has(e)?"bow":I0.has(e)?"hat":"other"}function Xe(e,t){return t[Math.floor(e()*t.length)]}function Mr(e=Math.random){const t=e()<.38,n=e();let s=[];if(n<.22)s=[];else if(n<.68)s=[Xe(e,po)];else{const o=Xe(e,po),i=po.filter(a=>Ba(a)!==Ba(o));s=[o,Xe(e,i)]}return{v:1,hair:Xe(e,br),hairC:Xe(e,yr),skin:Xe(e,mr),eyes:Xe(e,$r),eyeC:Xe(e,Bc),freckles:e()<.4,blush:e()<.85,top:Xe(e,kr),topC:Xe(e,Tt),bottom:Xe(e,wr),bottomC:Xe(e,Tt),dress:t?Xe(e,vr.filter(o=>o!=="")):"",dressC:Xe(e,Tt),shoes:Xe(e,_r),shoesC:Xe(e,Tt),acc:s,accC:Xe(e,Tt)}}function H0(e,t=Math.random){const n=e.characters[0];if(!n)return e;const s=Mr(t),o=xr(s),i=e.characters.slice();return i[0]={...n,...o,look2:s},{...e,characters:i}}function O0(e){const t=[e.skin,e.hair,e.hairStyle,e.shirt,e.pants,e.acc,e.look2?JSON.stringify(e.look2):""].join("|");return e.costume?t+"|cos:"+e.costume:t}const tf={m:10,d:24},nf={m:11,d:2},Aa={yellow:"#ffd166",denim:"#4f7fb8",rose:"#f28fb0",mint:"#7fd8b8"},W0=["helper-yellow","helper-denim","helper-rose","helper-mint","witch","cat","ghost","skeleton","bat"],U0=new Set(W0),sf={helper:"Yellow Helper",witch:"Witch hat",cat:"Black cat",ghost:"Ghost sheet",skeleton:"Bone PJs",bat:"Bat cape"};function js(e){return typeof e=="string"&&U0.has(e)?e:null}function V0(e=new Date){const t=e.getMonth()+1,n=e.getDate();return t===tf.m?n>=tf.d:t===nf.m?n<=nf.d:!1}function Q0(){const e=typeof globalThis<"u"?globalThis:{};if(typeof e.__costumeDate=="string"){const t=new Date(e.__costumeDate+"T12:00:00");if(!isNaN(+t))return t}return new Date}function Lr(){return V0(Q0())}function z0(e){if(!e||e.costume==null)return null;const t=js(e.costume);return t&&Lr()?t:null}const Ri=3600,Bs=470,Dn=590,Es=["goat","sheep","piglet","chicks","bunny","cow"],q0=[1085,1215,1345,1470,1600,1735],Z0=520,Ac=1900,Dc=[600,800,1e3,1200,1400,1600],Bl=435,N0=["Chestnut","Snowy","Midnight","Sunny","Rainbow"],jp=[2470,2600,2730,2860,2990],As=540,F0=["pet","carrot","apple","hay"],Al=6,j0=e=>3175+e*68,G0=8e4,Dl=20,Y0=1500,Gp=["egg","carrot","flower"],K0={egg:"ranch-egg",carrot:"ranch-carrot",flower:"ranch-bouquet"},X0=()=>({egg:0,carrot:0,flower:0}),J0=(e,t,n)=>Number.isInteger(e)&&e>=t&&e<=n?e:null;function Ic(e){const t=X0();if(!e||typeof e!="object")return t;for(const n of Gp)t[n]=J0(e[n],0,Dl)??0;return t}function Hc(e){const t=Array(Al).fill(null);if(Array.isArray(e))for(let n=0;n<Al;n++){const s=e[n];if(!s||s.seed!=="carrot"&&s.seed!=="flower")continue;const o=Number(s.at),i=Number(s.wet);Number.isFinite(o)&&Number.isFinite(i)&&(t[n]={seed:s.seed,at:o,wet:i})}return t}function Er(e,t){if(!e||!e.wet)return 0;const n=(t-e.wet)/G0;return n>=1?3:n>=.4?2:1}function Il(e,t,n,s,o=0){const i=e.slice(),a={...t};switch(n.op){case"plant":return i[n.i]?"taken":(i[n.i]={seed:n.seed,at:s,wet:0},{plots:i,basket:a,garden:!0});case"water":{const r=i[n.i];return r?r.wet?"wet":(i[n.i]={...r,wet:s},{plots:i,basket:a,garden:!0}):"empty"}case"pick":{const r=i[n.i];return r?Er(r,s)<3?"notReady":a[r.seed]>=Dl?"full":(a[r.seed]++,i[n.i]=null,{plots:i,basket:a,garden:!0,got:r.seed}):"empty"}case"egg":return s-o<Y0?"slow":a.egg>=Dl?"full":(a.egg++,{plots:i,basket:a,garden:!1,got:"egg"});case"use":return a.carrot<=0?"none":(a.carrot--,{plots:i,basket:a,garden:!1});case"take":return a[n.kind]<=0?"none":(a[n.kind]--,{plots:i,basket:a,garden:!1})}}const Zn=80,em=30*24*60*60*1e3,tm=5,Yp=6,On=["#ffd6e8","#fff3b0","#d8f5e8","#e6d6ff","#d6efff"],nm=/^m[A-Za-z0-9]{4,40}$/,sm=/^[A-Za-z0-9:_\/.-]{1,80}$/;function sl(e,t=Date.now()){const n=Math.floor((t-e)/864e5);return n<=0?"today":n===1?"yesterday":n<7?"a few days ago":"a while ago"}function om(e,t=Date.now()){const n=e?.letters;if(!Array.isArray(n))return null;const s=[];for(const i of n.slice(-30*2)){if(!i||typeof i!="object")continue;const a=i;if(typeof a.id!="string"||!nm.test(a.id)||typeof a.from!="string")continue;const r=a.from.normalize("NFC").replace(/\s+/g," ").trim();if(!r||r.length>24||typeof a.fromPid!="string"||!sm.test(a.fromPid)||typeof a.text!="string"||a.text.length>Zn||typeof a.at!="number"||!Number.isFinite(a.at)||t-a.at>em||a.at>t+864e5||!Number.isInteger(a.color)||a.color<0||a.color>=tm||!Number.isInteger(a.sticker)||a.sticker<0||a.sticker>=Yp)continue;const l=a.text.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(l.length>Zn)continue;const c={id:a.id,from:r,fromPid:a.fromPid,text:l,color:a.color,sticker:a.sticker,at:a.at};a.read===!0&&(c.read=!0),s.push(c)}const o=s.slice(-30);return o.length?{letters:o}:null}function Oc(e){return e?.letters.filter(t=>!t.read&&t.text).length??0}const im=/^[A-Za-z0-9:_\/.-]{1,80}$/,Kp=/crib|bassinet|high-?chair|cat-bed|pet-bed|dog-bed|kennel|tulip|flower|toadstool|mobile/,ol={bed:{head:{x:.24,y:.42},pillow:{x:.1,y:.27,w:.22,h:.18},mattress:{x:.36,y:.34,w:.36,h:.16},clip:"starter"},"wooden-bed":{head:{x:.22,y:.53},pillow:{x:.12,y:.36,w:.24,h:.18},mattress:{x:.38,y:.46,w:.32,h:.16},clip:"wooden"},"checker-bed":{head:{x:.16,y:.45},pillow:{x:.08,y:.26,w:.22,h:.22},mattress:{x:.38,y:.4,w:.32,h:.16},clip:"checker"},"bunk-bed":{head:{x:.11,y:.62},pillow:{x:.05,y:.52,w:.18,h:.14},mattress:{x:.22,y:.56,w:.36,h:.14},clip:"bunk"},"canopy-bed":{head:{x:.38,y:.52},pillow:{x:.28,y:.46,w:.24,h:.14},mattress:{x:.48,y:.48,w:.28,h:.16},clip:"canopy"},"cc-heart-bed":{head:{x:.22,y:.67},pillow:{x:.12,y:.58,w:.26,h:.16},mattress:{x:.36,y:.64,w:.36,h:.16},clip:"heart"},"cc-canopy-daybed":{head:{x:.37,y:.58},pillow:{x:.26,y:.5,w:.26,h:.16},mattress:{x:.48,y:.54,w:.3,h:.16},clip:"daybed"},"wc-plaid-bed":{head:{x:.24,y:.26},pillow:{x:.08,y:.14,w:.3,h:.2},mattress:{x:.36,y:.18,w:.3,h:.18},clip:"wooden"}},am=["bed","pack:wooden-bed","pack:checker-bed","pack:bunk-bed","pack:canopy-bed","pack:cc-heart-bed","pack:cc-canopy-daybed","pack:wc-plaid-bed"];function Xp(e){return e==="bed"||/bunk/.test(e)||/daybed/.test(e)?!0:/(^|[-_:])bed$/.test(e)}function rm(){return am.slice()}function Cr(e){const t=String(e||"").toLowerCase();if(!t||Kp.test(t)||!Xp(t))return null;const n=t.replace(/^pack:/,"");return ol[n]||ol[t]||ol.bed}const lm={head:{x:55.0733,y:59.7445},chest:{x:60,y:114},hip:{x:60,y:138},classic:{x:60,y:52.8}},of=48,af=138.24;function Jp(e,t){const n=-90*Math.PI/180,s=Math.cos(n),o=Math.sin(n),i=e-of,a=t-af,r=of+s*i-o*a,l=af+o*i+s*a;return{x:r-60,y:l-192}}function Da(e,t){const n=lm[e],s=Jp(n.x,n.y);return{x:t?-s.x:s.x,y:s.y}}const rf=120,il=192,cm=.26;function dm(e,t,n,s,o=1){const i=o>0?o:1;if(n==="lie"&&s){const r=-t*i+210.24,l=-e*i+186.24;return{x:-rf*i/2+r,y:-il*i+l}}if(n==="lie"){const r=Jp(e,t);return{x:r.x*i,y:r.y*i}}const a=n==="sit"?cm*il*i:0;return{x:(e-rf/2)*i,y:(t-il)*i+a}}function fm(e,t,n,s,o){const i=Cr(e);if(!i||t<1||n<1)return null;const a=Da("head",!1),r=(i.head.x-.5)*t-a.x,l=(i.head.y-1)*n-a.y,c=Da(s,o);return{x:.5+((o?-r:r)+c.x)/t,y:1+(l+c.y)/n}}function Gs(e){const t=String(e||"").toLowerCase();return!t||Kp.test(t)?null:Xp(t)?{pose:"lie",spots:[{dx:0,dy:0}]}:/sofa|couch|loveseat/.test(t)?{pose:"sit",spots:[{dx:-.18,dy:-.33},{dx:.18,dy:-.33}]}:/armchair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/bench|window-seat/.test(t)?{pose:"sit",spots:[{dx:-.22,dy:-.3},{dx:.22,dy:-.3}]}:/ottoman/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/stool|rocker/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.38}]}:/chair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.48}]}:null}function eh(e){const t=Gs(e.kind);if(!t)return[];const n=e.scale||1,s=t.pose==="lie"?Cr(e.kind):null;if(s){const o=e.w*n,i=e.h*n,a=Da("head",!1),r=(s.head.x-.5)*o-a.x,l=(s.head.y-1)*i-a.y;return[{x:e.x+(e.flip?-r:r),y:e.footY+l,pose:"lie",n:0}]}return t.spots.map((o,i)=>{const a=o.dx*e.w*n,r=o.dy*e.h*n,l=i===1?1:0;return{x:e.x+(e.flip?-a:a),y:e.footY+r,pose:t.pose,n:l}})}function yi(e){const t=(r,l)=>({x:r,y:l,seat:null,toast:null,moved:!0});if(e.mode!=="play")return t(e.releaseX,e.releaseY);const n=e.piece;if(!n)return e.via==="drag"?t(e.releaseX,e.releaseY):{x:e.releaseX,y:e.releaseY,seat:null,toast:null,moved:!1};if(e.via==="tap"&&e.alreadyOn===n.id)return t(n.x,n.footY);const s=new Set(e.occupied.filter(r=>r.item===n.id).map(r=>r.n)),o=eh(n).filter(r=>!s.has(r.n));if(!o.length)return e.via==="tap"?{x:e.releaseX,y:e.releaseY,seat:null,toast:"Someone is already there!",moved:!1}:t(e.releaseX,e.releaseY);let i=o[0],a=1/0;for(const r of o){const l=(r.x-e.releaseX)**2+(r.y-e.releaseY)**2;l<a&&(i=r,a=l)}return{x:i.x,y:i.y,seat:{item:n.id,pose:i.pose,n:i.n},toast:null,moved:!0}}const pm={sofa:260,armchair:150,bed:300,chair:100,stool:90,rocker:190,"yard-bench":140,"bar-stool":52.8,"bunk-bed":294,"canopy-bed":294,"cc-bubble-chair":142,"cc-canopy-daybed":276,"cc-dryer-chair":164,"cc-heart-bed":236,"cc-mani-chair":188,"cc-mushroom-stool":112,"cc-scallop-loveseat":248,"checker-bed":196,"cloud-sofa":212,"comfy-armchair":161.7,"cream-sofa":234.6,"egg-chair":126,"fancy-sofa":234.6,"gaming-chair":101.4,"lattice-bench":147,"puffy-stool":46.9,"rocking-chair":137.2,"salon-chair":111.8,"swivel-stool":46.2,"waiting-bench":166.6,"wash-chair":186.2,"wood-armchair":127.4,"wood-stool":46.2,"wooden-bed":235.2};function Ia(e){const t=String(e||"").toLowerCase().replace(/^pack:/,"");return pm[t]??320}const Bi=540;function Wc(e,t,n,s=2400){const o=Math.max(0,t)/2+70,i=40;let a=n<e-8?-1:1,r=e+a*o;return(r<i||r>s-i)&&(a=-a,r=e+a*o),r<i&&(r=i),r>s-i&&(r=s-i),{x:r,y:Bi}}function Uc(e){if(!e||typeof e!="object")return null;const t=e;return typeof t.item!="string"||!im.test(t.item)||t.pose!=="sit"&&t.pose!=="lie"||t.n!==0&&t.n!==1?null:{item:t.item,pose:t.pose,n:t.n}}function Hl(e,t){if(!e)return null;const n=Uc(e);return!n||!t?.some(s=>s&&s.id===n.item)?null:n}const Ol=45e3,hm=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],lf=/^[A-Za-z0-9:_\/.-]{1,80}$/,gm=/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u,cf=["feed","burp","change","rock"];function Ds(e){const t=String(e||"").toLowerCase();return!t||/mobile/.test(t)?null:/bassinet/.test(t)?"bassinet":t==="crib"||/(^|[-_:])crib$/.test(t)?"crib":null}function um(e){return e===2?"Cozy":"Happy"}function mm(e){return e+1}function ym(e){return hm.indexOf(e)>=0}function bm(e){const t=typeof e=="number"&&Number.isFinite(e)?Math.round(e):2;return t<=2?2:t>=4?4:3}function th(e){if(!e||typeof e!="object")return;const t=e,n={};let s=!1;for(let o=0;o<cf.length;o++){const i=cf[o],a=t[i];typeof a=="number"&&Number.isFinite(a)&&(n[i]=a,s=!0)}return s?n:void 0}function sn(e){const t={name:e.name,mood:e.mood,spot:e.spot,x:e.x,y:e.y,room:e.room,since:e.since};(e.spot==="crib"||e.spot==="bassinet")&&e.bed&&(t.bed=e.bed),e.spot==="mat"&&e.seat&&(t.seat=e.seat),e.spot==="arms"&&e.holder&&(t.holder=e.holder);const n=th(e.at);return n&&(t.at=n),t}function Vc(e,t){return JSON.stringify(e)===JSON.stringify(t)}function km(e,t){if(!e||typeof e!="object")return null;const n=e,s=String(n.name??"").normalize("NFC").replace(/\s+/g," ").trim();if(!gm.test(s)||(s.match(/\d/g)||[]).length>2)return null;let o=n.spot==="crib"||n.spot==="bassinet"||n.spot==="arms"||n.spot==="mat"?n.spot:"mat";const i=ym(n.room)?n.room:"nursery",a=typeof n.x=="number"&&Number.isFinite(n.x)?Math.max(0,Math.min(2400,n.x)):700,r=typeof n.y=="number"&&Number.isFinite(n.y)?Math.max(0,Math.min(600,n.y)):540,l=typeof n.since=="number"&&Number.isFinite(n.since)?n.since:0,c=bm(n.mood);let d=typeof n.bed=="string"&&lf.test(n.bed)?n.bed:void 0,f=Uc(n.seat)??void 0,h=typeof n.holder=="string"&&lf.test(n.holder)?n.holder:void 0;if(t){const g=t[i]?.items??[];if(o==="crib"||o==="bassinet"){let m=!1;for(let k=0;k<g.length;k++){const $=g[k];$&&$.id===d&&Ds(String($.kind||""))===o&&(m=!0)}m||(o="mat",d=void 0)}if(f){let m=!1;for(let k=0;k<g.length;k++)g[k]&&g[k].id===f.item&&(m=!0);m||(f=void 0)}}return o!=="crib"&&o!=="bassinet"&&(d=void 0),o!=="mat"&&(f=void 0),o!=="arms"&&(h=void 0),o==="arms"&&!h&&(o="mat"),sn({name:s,mood:c,spot:o,bed:d,seat:f,holder:h,x:a,y:r,room:i,at:th(n.at),since:l})}function wm(e,t){const n=e.nursery?.items??[];for(let s=0;s<n.length;s++){const o=n[s];if(!o||!o.id||Ds(String(o.kind||""))!=="crib")continue;const i=typeof o.x=="number"&&Number.isFinite(o.x)?o.x:1170,a=typeof o.y=="number"&&Number.isFinite(o.y)?o.y:480;return sn({name:"Bean",mood:2,spot:"crib",bed:o.id,x:i,y:a,room:"nursery",since:t})}return sn({name:"Bean",mood:2,spot:"mat",x:700,y:540,room:"nursery",since:t})}function vm(e,t,n){const s=Math.min(4,e.mood+1);return sn({...e,mood:s,at:{...e.at||{},[t]:n},since:n})}function _m(e,t){if(!e.since){const i=sn({...e,since:t});return Vc(i,e)?null:i}if(e.mood<=2)return null;const n=Math.floor((t-e.since)/Ol);if(n<1)return null;const s=Math.min(n,e.mood-2),o=e.mood-s;return sn({...e,mood:o,since:e.since+s*Ol})}function Wl(e,t,n,s,o){const i=sn(t?{...e,spot:"arms",holder:t,room:n,x:s,y:o,bed:void 0,seat:void 0}:{...e,spot:"mat",room:n,x:s,y:o,bed:void 0,seat:void 0,holder:void 0});return Vc(i,e)?e:i}function $m(e,t,n,s){let o=t.spot==="crib"||t.spot==="bassinet"?t.spot:"mat",i,a;if(o==="crib"||o==="bassinet"){let l=!1;for(let c=0;c<n.length;c++){const d=n[c];d&&d.id===t.bed&&Ds(d.kind)===o&&(l=!0)}l&&t.bed?i=t.bed:o="mat"}if(o==="mat"&&t.seat){let l=null;for(let f=0;f<n.length;f++)n[f]&&n[f].id===t.seat.item&&(l=n[f]);const c=l?Gs(l.kind):null;let d=!1;for(let f=0;f<s.length;f++)s[f].item===t.seat.item&&s[f].n===t.seat.n&&(d=!0);l&&c&&c.pose===t.seat.pose&&!d&&(a=t.seat)}const r=sn({...e,spot:o,room:t.room,x:t.x,y:t.y,bed:i,seat:a,holder:void 0});return Vc(r,e)?e:r}function xm(e,t,n,s){const o=e.spot==="mat"&&e.seat?.item===t,i=!!n&&(e.spot==="crib"||e.spot==="bassinet")&&e.bed===t;return!o&&!i?e:sn({...e,spot:"mat",x:s?s.x:e.x,y:s?s.y:Bi,bed:void 0,seat:void 0,holder:void 0})}function nh(e,t){const n=t.scale||1,s=t.w*n,o=t.h*n,i=Ds(e);let a=i==="bassinet"?0:-.02*s;const r=i==="bassinet"?-.52*o:-.46*o;return t.flip&&(a=-a),{x:t.x+a,y:t.footY+r}}function Mm(e){const t=(o,i)=>({x:o,y:i,spot:"mat",bed:null,seat:null});if(e.mode!=="play"||!e.piece)return t(e.releaseX,e.releaseY);const n=Ds(e.piece.kind);if(n){const o=nh(e.piece.kind,e.piece);return{x:o.x,y:o.y,spot:n,bed:e.piece.id,seat:null}}const s=yi({mode:"play",via:"drag",releaseX:e.releaseX,releaseY:e.releaseY,piece:e.piece,occupied:e.occupied});return s.seat?{x:s.x,y:s.y,spot:"mat",bed:null,seat:s.seat}:t(e.releaseX,e.releaseY)}function Lm(e,t=2400){const s=t-40>40?t-40:40;let o=e;return o>=40||(o=40),o>s&&(o=s),{x:o,y:Bi}}function Em(e,t){return!e||e.spot!=="mat"||!e.seat||e.room!==t?null:{item:e.seat.item,n:e.seat.n}}const bi=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],sh=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],Rt=2400,Pn=600,oh=1e3,Eo=(Rt-oh)/2,Rs=[.75,.875,1,1.25,1.5];function Is(e){if(typeof e!="number"||!Number.isFinite(e))return 1;let t=1,n=1/0;for(const s of Rs){const o=Math.abs(e-s);o<n&&(n=o,t=s)}return t}function Ye(e){return(e?.scale||1)*Is(e?.size)}function ih(e,t){const n=Is(t);if(n===1){if(e.size==null)return e;const{size:s,...o}=e;return o}return e.size===n?e:{...e,size:n}}const Co=8,Cm=/^[A-Za-z0-9:_\/.-]{1,80}$/;function Qc(e){const t=e?.dogKennel;if(!t||typeof t!="object"||typeof t.item!="string"||!Cm.test(t.item))return null;const n=e.rooms;if(!n)return null;for(const s of Object.values(n))if(s?.items?.some(o=>o&&o.id===t.item&&o.kind==="kennel"))return{item:t.item};return null}function Sm(e,t){return Qc({dogKennel:{item:t},rooms:e.rooms})!==null}const Z=(e,t,n,s,o=1)=>({id:e+"-"+s,kind:e,x:t+Eo,y:n,flip:!1,z:s,scale:o});function Kn(){return{version:3,houseId:"local",currentRoom:"living",rooms:{living:{wallpaper:"#ffd6e0",floor:"#e8b98a",pattern:1,items:[Z("sofa",470,470,1),Z("lamp",230,470,2),Z("plant",760,480,3),Z("rug",480,530,0),Z("picture",470,200,4),Z("cat",600,520,5),Z("window",-350,230,6),Z("armchair",-300,480,7),Z("bookshelf",1250,470,8),Z("tree",1500,480,9),Z("clock",1100,170,10)]},bedroom:{wallpaper:"#d9ccff",floor:"#f2d0a4",pattern:2,items:[Z("bed",450,480,1),Z("window",750,230,2),Z("teddy",330,500,3),Z("stars",300,180,4),Z("tub",1350,480,5),Z("lamp",-250,470,6),Z("flowers",-150,500,7)]},salon:{wallpaper:"#ffe0f0",floor:"#f6d6ff",pattern:2,items:[Z("rug",470,540,0),Z("mirror",470,150,1),Z("vanity",470,480,2),Z("perfume",400,345,3),Z("polish",450,345,4),Z("hairdryer",560,340,5),Z("stool",470,545,6),Z("lamp",200,470,7),Z("flowers",780,480,8),Z("picture",780,200,9),Z("chair",-250,490,10),Z("mirror",-250,170,11),Z("plant",1300,480,12)]},kitchen:{wallpaper:"#cdf3dc",floor:"#ffe7a8",pattern:3,items:[Z("fridge",200,470,1),Z("table",520,500,2),Z("cake",520,395,3),Z("stove",800,470,4),Z("chair",380,500,5),Z("chair",660,500,6),Z("juice",470,395,7),Z("plant",-300,480,8),Z("fish",1300,480,9)]},nursery:{wallpaper:"#d6f3ff",floor:"#f3ddc4",pattern:1,items:[Z("cloud-rug",480,545,0),Z("crib",470,480,1),Z("crib-mobile",470,155,2),Z("rocker",780,490,3)]},bathroom:{wallpaper:"#d4f4fb",floor:"#f7e7d4",pattern:3,items:[Z("bath-mat",180,560,0),Z("shower-curtain",-40,520,1),Z("soaking-tub",160,500,2),Z("rubber-ducky",300,545,3),Z("bath-toilet",480,500,4),Z("sink-vanity",700,500,5),Z("bath-mirror",700,175,6),Z("towel-bar",940,200,7)]},backyard:{wallpaper:"#c5ecff",floor:"#b6e3a8",pattern:0,items:[{id:"yard-bench-1",kind:"yard-bench",x:1122,y:372,flip:!1,z:1,scale:1},{id:"tulip-bed-2",kind:"tulip-bed",x:946,y:580,flip:!1,z:2,scale:1}]}},characters:[as({id:"c1",skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6",room:"living",x:330+Eo,y:540})],soundOn:!0,dogKennel:null}}function as(e){return{skin:"#f1c27d",hair:"#5b3a29",hairStyle:0,shirt:"#ff7aa8",pants:"#5aa9e6",size:"kid",acc:0,room:"living",x:Rt/2,y:540,flip:!1,held:{left:null,right:null},...e}}const ks=(e,t,n)=>Math.max(t,Math.min(n,e)),Io=e=>e.items.reduce((t,n)=>Math.max(t,n.z),0),Pm=e=>e.items.reduce((t,n)=>Math.min(t,n.z),0);function Zi(e,t,n){return{...e,characters:e.characters.map(s=>s.id===t?n(s):s)}}function Tm(e,t,n){const s=e.baby;if(!t||!s||s.spot!=="arms"||s.holder!==t.id||n===s.room)return e;const o=t.room===s.room?t.x:s.x,i=t.room===s.room?t.y:Bi,a=Wl(s,null,s.room,o,i);return!a||a===s?e:{...e,baby:a}}function ki(e){if(!e.seat)return e;const{seat:t,...n}=e;return n}let Ha=null;function ah(){const e=Ha;return Ha=null,e}function Ni(e,t,n,s){if(!e.baby)return e;const o=s?Wc(s.x,Ia(s.kind)*Ye(s),e.baby.x):null,i=xm(e.baby,t,n,o);return i===e.baby?e:{...e,baby:i}}function Fi(e,t,n){n&&(Ha={id:t,x:n.x,kind:n.kind,scale:Ye(n)});let s=!1;const o=e.characters.map(i=>{if(i.seat?.item!==t)return i;if(s=!0,!n)return ki(i);const a=Wc(n.x,Ia(n.kind)*Ye(n),i.x),{seat:r,...l}=i;return{...l,x:a.x,y:a.y}});return s?{...e,characters:o}:e}function Rm(e,t,n,s){if(!s){const i=Hl(e.seat,t);return i?e.seat===i?e:{...e,seat:i}:ki(e)}const o=Hl(n,t);return o?{...e,seat:o}:ki(e)}function Je(e,t,n){const s=e.rooms[t];if(!s)return e;const o=n(s);return o===s?e:{...e,rooms:{...e.rooms,[t]:o}}}function Bm(e){const t=new Set;let n=!1;const s=e.map(o=>{if(!t.has(o.id))return t.add(o.id),o;n=!0;const i=String(o.id).replace(/-d\d+$/,"").replace(/[^A-Za-z0-9:_/.-]/g,"").slice(0,72)||"item";let a=2,r=(i+"-d"+a).slice(0,80);for(;t.has(r);)a+=1,r=(i+"-d"+a).slice(0,80);return t.add(r),{...o,id:r}});return n?s:e}function Am(e){let t=!1;const n={...e.rooms};for(const s of bi){const o=e.rooms[s];if(!o||!Array.isArray(o.items))continue;const i=Bm(o.items);i!==o.items&&(n[s]={...o,items:i},t=!0)}return t?{...e,rooms:n}:e}function rh(e){if(!e||!e.rooms)return e;const t=Kn().rooms,n=e.rooms;let s=!1;for(const i of bi){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(s=!0)}const o=s?(()=>{const i={...n};for(const a of bi){const r=n[a];(!r||typeof r!="object"||!Array.isArray(r.items))&&(i[a]=t[a])}return{...e,rooms:i}})():e;return Am(o)}function Oa(e,t){switch(Ha=null,t.type){case"room/switch":return e.rooms[t.room]?{...e,currentRoom:t.room}:e;case"item/add":return Je(e,t.room,n=>n.items.length>=80||n.items.some(s=>s.id===t.item.id)?n:{...n,items:[...n.items,{...t.item,z:Io(n)+1}]});case"item/move":{const n=e.rooms[t.room]?.items.find(o=>o.id===t.id)??null,s=Je(e,t.room,o=>({...o,items:o.items.map(i=>i.id===t.id?{...i,x:ks(t.x,0,Rt),y:ks(t.y,40,Pn)}:i)}));return t.stand?Ni(Fi(s,t.id,n),t.id,!1,n):s}case"item/flip":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return Ni(Fi(Je(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?{...o,flip:!o.flip}:o)})),t.id,n),t.id,!1,n)}case"item/size":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||Is(n.size)===Is(t.size)?e:Je(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?ih(o,t.size):o)}))}case"item/power":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||!qp(n.kind)||!!n.on==!!t.on?e:Je(e,t.room,s=>({...s,items:s.items.map(o=>{if(o.id!==t.id)return o;if(t.on)return{...o,on:!0};const{on:i,...a}=o;return a})}))}case"item/front":return Je(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:Io(n)+1}:s)}));case"item/back":return Je(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:Pm(n)-1}:s)}));case"item/delete":{const n=e.rooms[t.room]?.items.find(a=>a.id===t.id)??null,s=n?.kind==="kennel",o=Fi(Je(e,t.room,a=>({...a,items:a.items.filter(r=>r.id!==t.id)})),t.id,n),i=s&&e.dogKennel?.item===t.id?{...o,dogKennel:null}:o;return Ni(i,t.id,!0,n)}case"room/wallpaper":return Je(e,t.room,n=>({...n,wallpaper:t.color}));case"room/floor":return Je(e,t.room,n=>({...n,floor:t.color}));case"room/pattern":return Je(e,t.room,n=>({...n,pattern:t.pattern,wallTile:null}));case"room/wallTile":return Je(e,t.room,n=>({...n,wallTile:t.tile}));case"room/floorTile":return Je(e,t.room,n=>({...n,floorTile:t.tile}));case"char/add":return e.characters.length>=Co||e.characters.some(n=>n.id===t.char.id)?e:{...e,characters:[...e.characters,t.char]};case"char/update":return Zi(e,t.id,n=>{const{look2:s,costume:o,...i}=t.patch,a={...n,...i};if("look2"in t.patch&&(s?a.look2=s:delete a.look2),"costume"in t.patch){const r=js(o);r?a.costume=r:delete a.costume}return a});case"char/move":{if(!e.rooms[t.room])return e;const n=e.characters.find(o=>o.id===t.id),s=Zi(e,t.id,o=>{const i={...o,room:t.room,x:ks(t.x,0,Rt),y:ks(t.y,60,Pn)};return Rm(i,e.rooms[t.room].items,t.seat,"seat"in t)});return Tm(s,n,t.room)}case"char/delete":{const n=e.characters.find(o=>o.id===t.id);if(!n)return e;let s={...e,characters:e.characters.filter(o=>o.id!==t.id)};if(["left","right"].forEach((o,i)=>{const a=n.held[o];a&&(s=Je(s,n.room,r=>({...r,items:[...r.items,{...a,x:n.x+(i?40:-40),y:n.y,z:Io(r)+1}]})))}),s.baby?.spot==="arms"&&s.baby.holder===t.id){const o=Wl(s.baby,null,s.baby.room,s.baby.x,s.baby.y);o&&o!==s.baby&&(s={...s,baby:o})}return s}case"char/hold":{const n=e.characters.find(r=>r.id===t.id),s=e.rooms[t.room]?.items.find(r=>r.id===t.itemId);if(!n||!s||n.held[t.hand]||n.room!==t.room)return e;const o=Fi(Je(e,t.room,r=>({...r,items:r.items.filter(l=>l.id!==t.itemId)})),t.itemId,s),i=Zi(o,t.id,r=>({...r,held:{...r.held,[t.hand]:s}})),a=s.kind==="kennel"&&e.dogKennel?.item===t.itemId?{...i,dogKennel:null}:i;return Ni(a,t.itemId,!0,s)}case"char/release":{const n=e.characters.find(i=>i.id===t.id),s=n?.held[t.hand];if(!n||!s)return e;const o=Zi(e,t.id,i=>({...i,held:{...i.held,[t.hand]:null}}));return Je(o,n.room,i=>({...i,items:[...i.items,{...s,x:ks(t.x,0,Rt),y:ks(t.y,40,Pn),z:Io(i)+1}]}))}case"cat/set":return{...e,cat:t.cat};case"cat/move":return e.cat&&e.rooms[t.room]?{...e,cat:{...e.cat,room:t.room,x:ks(t.x,100,Rt-100)}}:e;case"dog/set":return{...e,dog:t.dog};case"dog/kennel":return t.item===null?e.dogKennel?{...e,dogKennel:null}:e:!Sm(e,t.item)||e.dogKennel?.item===t.item?e:{...e,dogKennel:{item:t.item}};case"ranch/op":{const n=t.op;if(n.op==="take"){const i=e.rooms[n.room];if(i&&i.items.some(a=>a.id===n.id))return e}const s=Il(Hc(e.garden),Ic(e.basket),t.op,t.now,e.lastEgg??0);if(typeof s=="string")return e;let o={...e,garden:s.plots,basket:s.basket,lastEgg:t.op.op==="egg"?t.now:e.lastEgg};if(t.op.op==="take"&&o.rooms[t.op.room]){const i=t.op;o=Je(o,i.room,a=>a.items.length>=80?a:{...a,items:[...a.items,{id:i.id,kind:K0[i.kind],x:i.x,y:560,flip:!1,z:Io(a)+1,scale:1}]})}return o}case"settings/sound":return{...e,soundOn:t.on};case"game/reset":return Kn();case"baby/meet":return e.baby?e:{...e,baby:wm(e.rooms,t.now)};case"baby/name":return!e.baby||!t.name||t.name===e.baby.name?e:{...e,baby:sn({...e.baby,name:t.name})};case"baby/care":{if(!e.baby)return e;const n=vm(e.baby,t.care,t.now);return n===e.baby?e:{...e,baby:n}}case"baby/hold":{if(!e.baby)return e;const n=Wl(e.baby,t.holder,t.room,t.x,t.y);return!n||n===e.baby?e:{...e,baby:n}}case"baby/place":{if(!e.baby||!e.rooms[t.room])return e;const n=e.characters.filter(o=>o.room===t.room&&o.seat).map(o=>({item:o.seat.item,n:o.seat.n})),s=$m(e.baby,t,e.rooms[t.room].items,n);return s===e.baby?e:{...e,baby:s}}case"baby/ease":{if(!e.baby)return e;const n=_m(e.baby,t.now);return n?{...e,baby:n}:e}}}const df=jt("cozy-house"),Dm=jt("cozy-house-v1");function zc(e){if(!e||typeof e!="object"||!e.rooms)return Kn();let t=e;if(t.version===1){const f=g=>(Number(g)||0)+Eo,h={};for(const[g,m]of Object.entries(t.rooms))h[g]={...m,items:(m.items??[]).map(k=>({...k,x:f(k.x)}))};t={...t,version:2,rooms:h,character:{...t.character,x:f(t.character?.x)}}}if(t.version===2){const f=t.character??{};t={...t,version:3,characters:[as({...f,id:"c1",size:"kid",acc:0,held:{left:null,right:null}})]},delete t.character}if(t.version!==3)return Kn();const n=Kn(),s=(Array.isArray(t.characters)?t.characters:[]).slice(0,Co).map((f,h)=>{const g=f?.look2,m=as({...f,id:String(f.id??"c"+(h+1)),held:{left:f.held?.left??null,right:f.held?.right??null}});if(delete m.look2,g!=null){const k=Ti(g);k&&(m.look2=k)}if("costume"in m){const k=js(m.costume);k?m.costume=k:delete m.costume}return m}),o=rh({...n,...t,rooms:{...n.rooms,...t.rooms},characters:s}),i=ff(o),a=Qc(i),r=a===o.dogKennel?o:{...o,dogKennel:a},l=om(r.mailbox);let c=i===o?r:{...r,characters:i.characters};if(l)c={...c,mailbox:l};else if(c.mailbox){const{mailbox:f,...h}=c;c=h}const d=km(c.baby,c.rooms);if(d)c={...c,baby:d};else if("baby"in c){const{baby:f,...h}=c;c=h}return ff(Im(c))}function ff(e){let t=!1;const n=e.characters.map(s=>{const o=Hl(Uc(s.seat),e.rooms[s.room]?.items);return o?s.seat?.item===o.item&&s.seat.pose===o.pose&&s.seat.n===o.n?s:{...s,seat:o}:s.seat?(t=!0,ki(s)):s});return!t&&n.every((s,o)=>s===e.characters[o])?e:{...e,characters:n}}function Im(e){const t=e.currentRoom,n=sh.includes(t),s=a=>bi.includes(a);let o=!1;const i=e.characters.map(a=>{const r=a.room;return!s(r)||!n&&r===t?(o=!0,{...a,room:"living"}):a});return n&&!o?e:{...e,currentRoom:n?e.currentRoom:"living",characters:i}}function lh(){let e,t=!1;try{const o=localStorage.getItem(df)??localStorage.getItem(Dm);o?e=zc(JSON.parse(o)):(t=!0,e=Kn(),typeof navigator<"u"&&!navigator.webdriver&&(e=H0(e)))}catch{e=Kn()}const n=[];let s;return{get:()=>e,subscribe(o){n.push(o)},dispatch(o){e=Oa(e,o),n.forEach(i=>i(e,o)),clearTimeout(s),s=window.setTimeout(()=>{try{localStorage.setItem(df,JSON.stringify(e))}catch{}},250)},born:t}}const Hm=Object.freeze(Object.defineProperty({__proto__:null,ITEM_SIZE_STEPS:Rs,MAX_CHARS:Co,ROOM_H:Pn,ROOM_IDS:bi,ROOM_W:Rt,SCENE_ROOMS:sh,V1_OFFSET:Eo,V1_ROOM_W:oh,applyItemSize:ih,createStore:lh,drawnScale:Ye,ensureRooms:rh,initialState:Kn,itemSizeOf:Is,migrate:zc,newCharacter:as,reduce:Oa,standChar:ki,takeClearedFurniture:ah,validKennel:Qc},Symbol.toStringTag,{value:"Module"}));function Ul(e,t){for(let n=e.length-1;n>0;n--){const s=Math.floor(t()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}const ch=4,pf=7,Om=30;function Wm(){const e=[];let t=0;for(let n=0;n<ch;n++){e.push({id:t++,c:n,v:0});for(let s=1;s<=9;s++)for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s});for(const s of["skip","rev","d2"])for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s})}for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"wild"});for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"w4"});return e}const Vl=e=>e.discard[e.discard.length-1],Ho=(e,t)=>t.c===4||t.c===e.color||t.v===Vl(e).v&&Vl(e).c!==4,Wn=(e,t,n=1)=>{const s=e.hands.length;return((t+e.dir*n)%s+s)%s};function Ql(e,t,n,s){const o=[];for(let i=0;i<n&&e.hands[t].length<Om;i++){if(!e.deck.length){const r=e.discard.pop();if(e.deck=Ul(e.discard.map(l=>l),s),e.discard=[r],!e.deck.length)break}const a=e.deck.pop();e.hands[t].push(a),o.push(a)}return e.hands[t].length>1&&(e.slay[t]=!1),o}function Um(e,t){if(e.owe!==null&&e.hands[e.owe]?.length===1&&!e.slay[e.owe]){const n=e.owe;return e.owe=null,{victim:n,vdrew:Ql(e,n,2,t).length}}return e.owe=null,{}}const hf=e=>{const t=[0,0,0,0];return e.forEach(n=>{n.c<4&&t[n.c]++}),t.indexOf(Math.max(...t))},Vm={id:"slay",name:"Slay",minPlayers:2,maxPlayers:6,setup(e,t){const n=Ul(Wm(),t),s=Array.from({length:e},()=>n.splice(-pf,pf));let o=n.length-1;for(;typeof n[o].v!="number";)o--;const i=n.splice(o,1)[0];return{deck:n,discard:[i],hands:s,color:i.c,turn:Math.floor(t()*e),dir:1,drawn:null,slay:s.map(()=>!1),owe:null,winner:null,ev:{n:0,p:-1,k:"start",card:i}}},cleanMove(e){return!e||typeof e!="object"?null:e.k==="play"&&Number.isInteger(e.id)&&e.id>=0&&e.id<108?{k:"play",id:e.id,...Number.isInteger(e.color)&&e.color>=0&&e.color<ch?{color:e.color}:{}}:e.k==="draw"||e.k==="pass"||e.k==="slay"?{k:e.k}:null},legal(e,t,n){if(e.winner!==null)return!1;if(n.k==="slay")return e.hands[t].length<=2&&!e.slay[t];if(t!==e.turn)return!1;if(n.k==="draw")return e.drawn===null;if(n.k==="pass")return e.drawn!==null;const s=e.hands[t].find(o=>o.id===n.id);return!s||e.drawn!==null&&s.id!==e.drawn||s.c===4&&n.color===void 0?!1:Ho(e,s)},apply(e,t,n,s){const o=e.ev.n+1;if(n.k==="slay")return e.slay[t]=!0,e.owe===t&&(e.owe=null),e.ev={n:o,p:t,k:"slay"},e;const i=Um(e,s);if(n.k==="draw"){const d=Ql(e,t,1,s),f=d[0];if(f&&Ho(e,f))e.drawn=f.id,e.ev={n:o,p:t,k:"draw",drew:1,...i};else{if(e.drawn=null,e.ev={n:o,p:t,k:"draw",drew:d.length,...i},e.stuck=d.length?0:(e.stuck??0)+1,(e.stuck??0)>=e.hands.length){const h=Math.min(...e.hands.map(g=>g.length));return e.winner=e.hands.findIndex(g=>g.length===h),e.turn=-1,e}e.turn=Wn(e,t)}return e}if(n.k==="pass")return e.drawn=null,e.turn=Wn(e,t),e.ev={n:o,p:t,k:"pass",...i},e;e.stuck=0;const a=e.hands[t],r=a.splice(a.findIndex(d=>d.id===n.id),1)[0];e.discard.push(r),e.drawn=null,e.color=r.c===4?n.color:r.c;const l={n:o,p:t,k:"play",card:r,color:e.color,...i};if(!a.length)return e.winner=t,e.turn=-1,e.ev=l,e;a.length===1&&!e.slay[t]&&(e.owe=t);const c=e.hands.length===2;if(r.v==="rev")e.dir=e.dir===1?-1:1,e.turn=c?t:Wn(e,t);else if(r.v==="skip")l.skipped=Wn(e,t),e.turn=Wn(e,t,2);else if(r.v==="d2"||r.v==="w4"){const d=Wn(e,t);l.skipped=d;const f=r.v==="d2"?2:4;l.drew=Ql(e,d,f,s).length,e.turn=Wn(e,t,2)}else e.turn=Wn(e,t);return e.ev=l,e},turn:e=>e.winner!==null?-1:e.turn,winner:e=>e.winner,view(e,t){return{top:Vl(e),color:e.color,turn:e.winner!==null?-1:e.turn,dir:e.dir,deck:e.deck.length,counts:e.hands.map(n=>n.length),slay:e.slay,winner:e.winner,ev:e.ev,...t!==null&&e.hands[t]?{hand:e.hands[t],drawn:t===e.turn?e.drawn:null}:{}}},autoMove(e,t){if(t!==e.turn)return null;if(e.drawn!==null){const s=e.hands[t].find(o=>o.id===e.drawn);return s&&Ho(e,s)?{k:"play",id:s.id,...s.c===4?{color:hf(e.hands[t])}:{}}:{k:"pass"}}const n=e.hands[t].find(s=>Ho(e,s)&&s.c!==4)??e.hands[t].find(s=>Ho(e,s));return n?{k:"play",id:n.id,...n.c===4?{color:hf(e.hands[t])}:{}}:{k:"draw"}},removePlayer(e,t,n){if(e.hands.length<=2)return null;const s=e.turn===t;return e.deck.unshift(...e.hands[t]),Ul(e.deck,n),e.hands.splice(t,1),e.slay.splice(t,1),e.owe===t?e.owe=null:e.owe!==null&&e.owe>t&&e.owe--,e.turn>t&&e.turn--,s&&(e.drawn=null,e.dir===-1?e.turn=((t-1)%e.hands.length+e.hands.length)%e.hands.length:e.turn=t%e.hands.length),e.ev={n:e.ev.n+1,p:t,k:"left"},e}},zl=7,ma=6,Qm=(e,t,n)=>{const s=e[t][n];for(const[o,i]of[[1,0],[0,1],[1,1],[1,-1]]){const a=[[t,n]];for(const r of[1,-1])for(let l=1;l<4;l++){const c=t+o*l*r,d=n+i*l*r;if(c<0||c>=zl||d<0||d>=ma||e[c][d]!==s)break;a.push([c,d])}if(a.length>=4)return a}return null},zm={id:"four",name:"Four in a Row",minPlayers:2,maxPlayers:2,setup:(e,t)=>({b:Array.from({length:zl},()=>[]),turn:t()<.5?0:1,winner:null,draw:!1,line:null,last:null,n:0}),cleanMove:e=>e&&Number.isInteger(e.col)&&e.col>=0&&e.col<zl?{col:e.col}:null,legal:(e,t,n)=>e.winner===null&&!e.draw&&t===e.turn&&e.b[n.col].length<ma,apply(e,t,n){e.b[n.col].push(t);const s=e.b[n.col].length-1;e.last={col:n.col,row:s,p:t},e.n++;const o=Qm(e.b,n.col,s);return o?(e.winner=t,e.line=o,e.turn=-1):e.b.every(i=>i.length>=ma)?(e.draw=!0,e.turn=-1):e.turn=1-t,e},turn:e=>e.turn,winner:e=>e.winner,view:e=>e,autoMove:(e,t)=>{if(t!==e.turn)return null;const s=[3,2,4,1,5,0,6].find(o=>e.b[o].length<ma);return s===void 0?null:{col:s}},removePlayer:()=>null},dh={slay:Vm,four:zm},Ai=2600,Hs=[{game:"slay",seats:6,x:720},{game:"four",seats:2,x:1500},{game:"slay",seats:4,x:2150}],qm=2e4,Zm="winter",Nm="Winter Cheer",Fm={[Zm]:Nm},jm=["pack:wc-holiday-tree","pack:wc-gingerbread","pack:wc-gingerbread-village","pack:wc-bauble-garland","pack:wc-stocking-row","pack:wc-cane-lamp","pack:wc-star-topper","pack:wc-poinsettia","pack:wc-holly","pack:wc-nutcracker","pack:wc-reindeer","pack:wc-sleigh-planter"],Gm=["Berry Wreath","Birch Log Basket","Cabin Picture","Cabin Planks","Candy Cane Lamp","Candy Stripe","Cinnamon Roll Tray","Cocoa Cart","Cocoa Pot","Cookie Oven","Cookie Plate","Cozy Red Plaid","Cozy Sock Hamper","Decorated Holiday Tree","Frosted Pine","Frosty Bookcase","Frosty Dots","Fur-Trim Bench","Gingerbread Cottage","Gingerbread Village","Holly Sprig","Ice Skates","Ice-Blue Wardrobe","Knit Pom Rug","Knit Stocking Row","Knit-Blanket Armchair","LED Candle Trio","Lantern","Log Bench","Marshmallow Jar","Mint Pine Sprigs","Mitten Ottoman","Mittens on a Line","Mug Tree Shelf","Mug of Cocoa","Nutcracker Friend","Penguin Plush","Penguin Plush Chair","Peppermint Counter","Peppermint Swirl Rug","Peppermint Tiles","Pinecone Garland","Pinecone Side Table","Plaid Cabin Sofa","Poinsettia Pot","Polar Bear Plush","Red Plaid Quilt Bed","Reindeer Plush","Ribbon Bauble Garland","Sled Coffee Table","Sleigh Planter","Snow Globe","Snow Knit Carpet","Snow-Globe Lamp","Snowflake Mobile","Snowflake Nightstand","Snowflake Sky","Snowman Buddy","Snowshoes","Snowy Window Art","Snowy Window Seat","Star Tree Topper","Stone Hearth Fireplace","Twinkle Light String","Twinkle-Light Floor Lamp","Winter Cheer","Woodstove","Wrapped Present Stack"],fh="halloween",Ym="Spooky Cute",Km={[fh]:Ym},Xm=!1;function Jm(e=new Date){const t=e.getMonth(),n=e.getDate();return t===9&&n>=24||t===10&&n<=2}function ph(e=new Date,t=Xm){return t||Jm(e)}const e1=["pack:hw-cauldron","pack:hw-cat-statue","pack:hw-witch-hat"],t1=["Autumn Leaf Garland","Black Cat Statue","Bubbly Cauldron","Friendly Sheet Ghost","Harvest Hay Bale","Heart and Moon Pumpkin","Moon and Stars Window Cling","Moonbeam Lantern","Spooky Cute","Starry Glow Pumpkin","Starry Witch Hat","Treat Bowl"],n1=["A-Frame Swing","Acorn Friend","Alarm Clock","Apple","Apple Tree","Arc Floor Lamp","Arc Lamp","Arched Mirror","Arched Shelf","Armchair","Autumn Wreath","Baby Blocks","Baby Bottle","Bakery Shelf","Ball","Balloons","Bananas","Bar Stool","Bassinet","Bath Mat","Bath Mirror","Bath Stool","Bathtub","Beach Ball","Bean Bag","Bed","Berry Basket","Big Leaf Plant","Big Monitor","Big Wardrobe","Birdbath","Birdhouse","Birdie","Blanket Basket","Blocks","Boba Buddy","Book Stack","Books","Bookshelf","Box Stack","Bread","Brush & Comb","Bubble Aquarium","Bubble Bath","Bubble Chair","Bubble-Gum Rug","Bubbly Fountain","Bubbly Plant","Bud Vase","Bulletin Board","Bunk Bed","Bunny","Bunny Plush","Bunny Slippers","Butterfly Bush","Cactus","Cactus Buddy","Cada's Mouse","Cake","Candle Jar","Canopy Bed","Canopy Daybed","Cat Bed","Cat Tower","Caterpillar Plush","Chair","Changing Table","Checker Rug","Checkered Bed","Chick","Chloe's Star Lamp","Clock","Clothes Rail","Clothesline","Cloud Beanbag","Cloud Lamp","Cloud Rug","Cloud Shelf","Cocoa Doll","Cocoa Mug","Coffee Table","Comfy Chair","Cookie Jar","Cooking Pot","Cottage Heart Pouf","Cottage Heart Rug","Counter","Cozy Fireplace","Cozy Lights","Cozy Mug","Cozy Nightstand","Cozy Reading Nook","Cozy Snake Plant","Cozy Teapot","Cream Jars","Cream Sofa","Crib","Crib Mobile","Cubby Shelf","Cube Shelf","Cupcake","Cupcake Stand","Curtains","Curvy Yellow Desk","Cute Keyboard","Cute Speaker","Daisy Pot","Daisy Rug","Desk","Desk Lamp","Desk Mic","Dino Plushie","Dish Cabinet","Dish Rack","Dog Kennel","Doll House","Donut","Dresser","Droplet Buddy","Egg Pan","Fairy-Light Garland","Fairy-Light Shelf","Fan","Fancy Sofa","Fiddle-Leaf Fig","Fig Tree","Fire Pit","Fireplace","Fish Bowl","Fish Tank","Floor Cushion","Flower Cart","Flower Floor Lamp","Flower Kettle","Flower Lamp","Flowers","Foot Spa","Fresh Egg","Fridge","Frog Plush","Fruit Bowl","Game Controller","Gaming Chair","Garden Bench","Garden Carrot","Garden Gnome","Glass Cabinet","Globe","Globe Pendants","Glossy Hair Dryer","Glow Mirror","Gold Floor Mirror","Guinea Pig","Hair Dryer","Hair-Dryer Chair","Hair-Wash Chair","Hammock","Hamster House","Hamster Pal","Hanging Lamp","Hanging Lantern","Hanging Plant","Hanging Vine Planter","Happy Fridge","Headphones","Heart Headboard Bed","Heart Pouf","Heart Rug","Heart Wall Clock","Heart Wall Light","Heart-Leaf Plant","Hedge Row","Herb Box","High Chair","Honey Doll","Ice Cream","Jewelry Box","Juice","Kettle","Kitchen Counter","Knit Cushion","Ladder Shelf","Lamp","Landscape Art","Lattice Bench","Laundry Hamper","Lava Lamp","Lemon Tree","Lemonade Cart","Lemonade Cup","Lighted Vanity","Lilac Curtain","Lily Pond","Little Rocking Horse","Little Slide","Little Sprout","Lotion Bottles","Macaron Jar","Macrame Swing Chair","Mani-Pedi Chair","Manicure Table","Microwave","Milk","Milk & Cookies","Mini Fridge","Mini Greenhouse","Mini Tree","Mint Fridge","Mint Pebble Rug","Mirror","Mixer","Moon and Stars","Moon Night-Light","Moving Box","Mushroom Stool","Music Box","Nail Dryer","Nail Polish","Nail Polish Rack","Night Light","Nightstand","Nursery Cloud Rug","Nursery Dresser","Nursery Lamp","Pancakes","Pantry","Paper Lantern","Pastel Range","Pastel Wardrobe","Patio Lights","Patio Umbrella","Pendant Lamp","Perfume","Perfume Bottle","Perfume Tray","Pet Bowl","Petal Coffee Table","Phone on a Stand","Piano","Picket Gate","Picnic Basket","Picnic Blanket","Picnic Table","Picture","Piggy Bank","Pillow","Pin Board","Pink Vanity","Pinwheel","Pizza","Plant","Plant Stand","Plant Wall","Play Mat","Play Tent","Polish Bottle","Popcorn","Pothos Plant","Pouf","Puffy Cloud Sofa","Puffy Stool","Puppy","Quinn's Cookie Pup","Radio","Rain Barrel","Rainbow Art","Rainbow Rug","Ranch Flowers","Rattle","Reagan's Frame","Reception Desk","Record Player","Ribbon Mirror","Ribbon Tray","Rice Cooker","Ring Light","Robot","Rocker","Rocking Chair","Rocking Horse","Rose Doll","Round Breakfast Table","Round Side Table","Round Woven Rug","Rubber Ducky","Rug","Runner Rug","Salon Chair","Sandbox","Scallop Curtains","Scalloped Loveseat","Seesaw","Shelf","Shower Curtain","Sink","Sink Vanity","Sloane's Rainbow Snail","Snake Plant","Soaking Tub","Soap Dish","Sofa","Sparkle Wall Light","Spice Rack","Splash Pool","Spray Bottle","Sprinkler","Stacking Rings","Star Dresser","Star Lamp","Star Mobile","Stars","Stepping Stones","Sticker Board","Story Pillow","Stove","String Lights","Striped Runner","Succulents","Sun Lounger","Sunny Art","Sunny Bean Bag","Sunny Cloud Rug","Sunny Shelf","Swing Chair","Swivel Stool","Table","Tassel Rug","Teapot","Teapot Set","Teddy","Tiered Tray","Toadstool Light","Toaster","Toilet","Towel Bar","Towel Cart","Towel Stack","Toy Bin","Toy Car","Toy cat","Toy Chest","Toy Train","Trailing Plant Shelf","Tulip Bed","Tulip Vase","Turtle","TV","TV Stand","Unicorn Plushie","Utensil Rail","Vanity","Vanity Stool","Vegetable Patch","Vlog Camera","Wagon","Waiting Bench","Wall Shelf","Wardrobe","Water-Drop Lamp","Watermelon","Wavy Floor Lamp","Window","Window Seat","Wood Armchair","Wood Bookshelf","Wood Coffee Table","Wood Desk","Wood Dresser","Wood Stool","Wood Wall Clock","Wooden Bed","Yard Sign",...Gm,...t1],s1=4,qc=16,Wa=e=>String(e??"").toUpperCase().replace(/[^A-Z0-9]/g,""),o1=e=>e.length>=s1&&e.length<=qc&&/^[A-Z0-9]+$/.test(e),i1=12,a1=["Cada","Chloe","Quinn","Reagan","Sloane"],r1=460,l1=320,gf=["Sunny Bunny","Bubbly Panda","Sparkle Kitty","Happy Hippo","Cozy Koala","Jolly Jelly","Zippy Fox","Dreamy Deer","Giggly Goose","Peachy Pup","Minty Mouse","Rainbow Duck","Cuddly Cub","Starry Owl","Bouncy Frog","Lucky Lamb","Snuggly Seal","Twinkle Tiger","Berry Bear","Cloudy Llama","Pebble Penguin","Honey Hedgehog","Marshmallow Moose","Cupcake Cat"],ai=["Hi!","Come over!","I love your house!","Let's play!","Follow me!","Look at this!","Want a snack?","Nice!","Yes!","No thanks","Hehe","Be right back","Bye!","Let's decorate!","Wanna race?","So cute!"],hh=["👋","😀","😂","😍","😮","😢","🎉","⭐","❤️","👍","🍕","🐱","🌈","🎶","💤","✨"],Zc=60,c1={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t","@":"a",$:"s","!":"i","+":"t"},al=["fuck","fuk","fck","shit","sht","bitch","btch","bastard","asshole","ass","dick","cock","pussy","cunt","whore","slut","damn","crap","piss","fag","faggot","retard","nigger","nigga","porn","sex","sexy","nude","naked","boob","boobs","penis","vagina","kill","suicide","stupid","idiot","dumb","hate","loser","shutup","wtf","stfu","gtfo","bs"],d1=["zero","oh","one","two","three","four","five","six","seven","eight","nine","ten"],f1=[/\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i,/\bi\s*live\s+(at|on|in)\b/i,/\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,/\b(password|passcode|zip\s*code|postcode)\b/i,/\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i],p1=/(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i,h1=/\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i,g1=/@\w/,u1=/\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;function m1(e,t=Zc){if(typeof e!="string")return{ok:!1,reason:"empty"};const n=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(!n)return{ok:!1,reason:"empty"};if(n.length>t)return{ok:!1,reason:"long"};if(p1.test(n))return{ok:!1,reason:"link"};if(h1.test(n)||g1.test(n))return{ok:!1,reason:"contact"};if((n.match(/\d/g)??[]).length>=5||/\d[\d\s().\-]{4,}\d/.test(n)||u1.test(n))return{ok:!1,reason:"contact"};const o=n.toLowerCase().split(/[^a-z]+/).filter(Boolean);let i=0;for(const c of o)if(i=d1.includes(c)?i+1:0,i>=4)return{ok:!1,reason:"contact"};if(f1.some(c=>c.test(n)))return{ok:!1,reason:"personal"};const a=n.toLowerCase().replace(/[0-9@$!+]/g,c=>c1[c]??c),r=a.split(/[^a-z]+/).filter(Boolean),l=a.replace(/[^a-z]/g,"").replace(/(.)\1{2,}/g,"$1$1");return r.some(c=>al.includes(c)||al.includes(c.replace(/(.)\1+/g,"$1")))||al.filter(c=>c.length>=5).some(c=>l.includes(c))?{ok:!1,reason:"words"}:{ok:!0,text:n}}const y1={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t",8:"b","@":"a",$:"s","!":"i","+":"t",v:"u","|":"k","<":"k","#":"h"};function b1(e){return/^f+u+c+k+$/.test(e)||/^f+u+k+$/.test(e)||/^f+c+k+$/.test(e)||/^s+h+i+t+$/.test(e)||/^s+h+t+$/.test(e)||/^b+i+t+c+h+$/.test(e)||/^b+t+c+h+$/.test(e)||/^a+s+h+o+l+e+$/.test(e)||/^d+u+m+b+a+s+$/.test(e)||/^n+i+g{2,}e+r+$/.test(e)||/^n+i+g{2,}a+$/.test(e)||/^f+a+g+$/.test(e)||/^f+a+g+o+t+$/.test(e)||/^r+e+t+a+r+d+$/.test(e)||/^k+y+s+$/.test(e)}function k1(e){return/^c+u+n+t+$/.test(e)||/^a+h+o+l+e+$/.test(e)||/^k+i+k+e+$/.test(e)||/^c+h+i+n+k+$/.test(e)||/^s+p+i+c+$/.test(e)||/^c+o{2,}n+$/.test(e)||/^w+e+t+b+a+c+k+$/.test(e)||/^t+r+a+n+y+$/.test(e)||/^t+r+a+n+i+$/.test(e)||/^d+y+k+e+$/.test(e)||/^b+e+a+n+e+r+$/.test(e)||/^g+o{2,}k+$/.test(e)||/^r+a+g+h+e+a+d+$/.test(e)||/^t+o+w+e+l+h+e+a+d+$/.test(e)||/^h+e+i+l+h+i+t+l+e+r+$/.test(e)}const w1=new Set(["spicy","spices","spicing","spicey","spicier","spiciest","cocky","chinking","spicer","gooky","slutty","twatt"]);function v1(e,t){if(!/^[a-z]+$/.test(e)||t&&w1.has(e))return!1;const n=[e],s=["ing","in","ers","er","ed","es","y","s"];for(let o=0;o<s.length;o++){const i=s[o];e.endsWith(i)&&e.length>i.length+2&&n.push(e.slice(0,-i.length))}for(let o=0;o<n.length;o++)if(b1(n[o])||t&&k1(n[o]))return!0;return!1}function _1(e){if(!e.includes("*"))return[e];const t=e.split("*").length-1,n=e.replace(/\*/g,""),s=n?[n]:[];if(t<1||t>3)return s;const o=e.split(""),i=[];for(let r=0;r<o.length;r++)o[r]==="*"&&i.push(r);const a=r=>{if(r===i.length){s.push(o.join(""));return}for(let l=97;l<=122;l++)o[i[r]]=String.fromCharCode(l),a(r+1)};return a(0),s}const uf=["mother","sonofa","horse","bull","dip"],mf=["face","head","you"];function ho(e,t){const n=e.replace(/ph(?=u+c+k)/g,"f").replace(/ph(?=u+k)/g,"f");if(v1(n,t)||/^w+t+f+$/.test(n)||/^s+t+f+u+$/.test(n))return!0;for(let s=0;s<uf.length;s++){const o=uf[s];if(n.startsWith(o)&&n.length>o.length+2&&ho(n.slice(o.length),t))return!0}for(let s=0;s<mf.length;s++){const o=$1(n,mf[s]);if(o&&ho(o,t))return!0}return!!(n.length>4&&n.endsWith("s")&&!n.endsWith("ss")&&ho(n.slice(0,-1),t))}function $1(e,t){let n=e.length;for(let s=t.length-1;s>=0;s--){const o=t[s];if(n===0||e[n-1]!==o)return null;for(;n>0&&e[n-1]===o;)n--}return n<=2?null:e.slice(0,n)}function Ua(e){let t="";for(let n=0;n<e.length;n++)t+=y1[e[n]]??e[n];return t}const x1={ѕ:"s",һ:"h",с:"c",а:"a",е:"e",о:"o",р:"p",і:"i",х:"x",у:"y",к:"k"};function M1(e){const n=e.replace(/[\u00ad\u0336\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").normalize("NFKC").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase();let s="";for(let o=0;o<n.length;o++)s+=x1[n[o]]??n[o];return s}const L1=new Set(["it","its","it's","is","as","a","i","uh","oh","so","he","she","hi","um","umm","hmm","hm","ah","eh","er","ow","ha","hey","yo","ok","yeah","yes","no","nah","wow","ho","ooh","ahh","uhh","ohh"]);function wi(e){return e>="a"&&e<="z"||e>="0"&&e<="9"||"@$!+*v|#<".includes(e)}function yf(e,t){let n=t;for(;n<e.length&&e[n]==="!";)n++;if(n>=e.length||!wi(e[n])||e[n]==="!")return null;const s=e[n];let o=n+1;for(;o<e.length&&e[o]==="!";)o++;return o<e.length&&wi(e[o])?null:{ch:s,end:o}}function E1(e,t){const n=e.length,s=" .-_~";let o=0;for(;o<n;){if(o>0&&wi(e[o-1])){o++;continue}const i=yf(e,o);if(!i){o++;continue}const a=[i.ch];let r=i.end;for(;r<n&&s.includes(e[r]);){const l=yf(e,r+1);if(!l)break;a.push(l.ch),r=l.end}if(a.length>=2){const l=Ua(a.join("")).replace(/\*/g,"");if(ho(l,t))return!0}o=Math.max(o+1,r)}return!1}function Os(e){return e.replace(/^!+/,"").replace(/!+$/,"")}function Va(e){return Ua(Os(e)).replace(/\*/g,"")}function gh(e){return/[0-9@$!+*|#<]/.test(Os(e))}function C1(e){return Os(e).length===1}function S1(e){const t=Os(e);return t.length<2||gh(e)?!1:/^sh+$/.test(t)||L1.has(t)}function P1(e){let t="space";for(let n=0;n<e.length;n++){const s=e[n];if(!(s===" "||s==="	"||s===`
`||s==="\r")){if(s==="-"){t="hyphen";continue}return"punct"}}return t}function T1(e){const t=[];let n=0,s="";for(;n<e.length;){if(!wi(e[n])){s+=e[n],n++;continue}let o=n+1;for(;o<e.length&&wi(e[o]);)o++;t.push({text:e.slice(n,o),gap:t.length===0?"start":P1(s)}),s="",n=o}return t}function R1(e){const t=[Ua(e)];if(e.charAt(0)==="!"||e.charAt(e.length-1)==="!"){const n=e.replace(/^!+/,"").replace(/!+$/,"");n&&n!==e&&t.push(Ua(n))}return t}function B1(e){for(let t=0;t<e.length;t++){if(!/^k+i+l+$/.test(e[t]))continue;const n=e[t+1]||"",s=e[t+2]||"";if(/^y+o+u+r+s+e+l+f+$/.test(n)||/^u+r+s+e+l+f+$/.test(n)||/^u+r+$/.test(n)&&/^s+e+l+f+$/.test(s))return!0}return!1}function A1(e,t,n){if(Os(e[n].text)!=="coon")return!1;const s=n>0?t[n-1]:"",o=t[n+1]||"";return s==="maine"||o==="cat"}function D1(e,t,n){return n===t+1&&e[n].gap==="space"&&/^a+$/.test(Va(e[t].text))&&/^h+o+l+e+$/.test(Va(e[n].text))}function I1(e,t,n){return Os(e[n].text)!=="dyke"?!1:n>0&&Os(e[n-1].text)==="van"}function H1(e){for(let t=0;t<e.length-1;t++)if(/^h+e+i+l+$/.test(e[t])&&/^h+i+t+l+e+r+$/.test(e[t+1]))return!0;return!1}function O1(e,t=!0){const n=M1(e);if(E1(n,t))return!0;const s=T1(n),o=s.map(a=>R1(a.text)),i=s.map(a=>Va(a.text));if(B1(i)||t&&H1(i))return!0;for(let a=0;a<o.length;a++)if(!(t&&(A1(s,i,a)||I1(s,i,a))))for(let r=0;r<o[a].length;r++){const l=_1(o[a][r]);for(let c=0;c<l.length;c++)if(ho(l[c].replace(/\*/g,""),t))return!0}for(let a=0;a<s.length;a++){let r="",l=0,c=!1,d=!1;for(let f=a;f<s.length&&f<a+8;f++){if(f>a){const h=s[f].gap,g=s[f-1].text;if(h==="punct"||h==="start"||g.endsWith("!")||s[f].text.startsWith("!")||h!=="space"&&h!=="hyphen")break}if(r+=Va(s[f].text),C1(s[f].text)&&l++,S1(s[f].text)&&(c=!0),gh(s[f].text)&&(d=!0),f!==a&&!(c&&l<2&&!d)&&ho(r,t)){if(t&&D1(s,a,f))break;return!0}}}return!1}function uh(e,t,n,s=!1){if(typeof e!="string")return{ok:!1,reason:"empty"};const o=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return o?o.length>t?{ok:!1,reason:"long"}:O1(o,!s)?{ok:!1,reason:n}:{ok:!0,text:o}:{ok:!1,reason:"empty"}}function W1(e,t=Zc){return uh(e,t,"words")}const Sr={long:"That is a bit long!",link:"No links, please!",contact:"Keep numbers and contact info secret!",personal:"Keep personal info secret!",words:"Let's use kind words!",mail:"Oops, try different words!",empty:""},mh={};for(const e of["АA","аa","ВB","вb","ЕE","еe","КK","кk","МM","мm","НH","нh","ОO","оo","РP","рp","СC","сc","ТT","тt","УY","уy","ХX","хx","ІI","іi","ЈJ","јj","ЅS","ѕs","ЁE","ёe","ЇI","їi","ΑA","ΕE","ΖZ","ΗH","ΙI","ΚK","ΜM","ΝN","ΟO","ΡP","ΤT","ΥY","ΧX","αa","εe","ζz","ιi","κk","νv","οo","ρp","τt","υu","χx"])mh[e[0]]=e[1];function U1(e){let t="";for(const n of e)t+=mh[n]??n;return t}function V1(e){return U1(String(e).normalize("NFKC")).replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\p{M}]/gu,"").replace(/[\p{Extended_Pictographic}\p{S}\p{P}]+/gu,"").replace(/\s+/g," ").trim()}function Q1(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(()=>{const e=[...new Set(n1.map(t=>V1(t)).filter(t=>t.length>=2))].sort((t,n)=>n.length-t.length);return new RegExp(`(^|[^A-Za-z])(?:${e.map(Q1).join("|")})(?![A-Za-z])`,"gi")})();const bf=(e,t,n)=>typeof e=="number"&&Number.isFinite(e)?Math.max(t,Math.min(n,e)):null,z1=(e,t,n=80)=>typeof e=="string"&&e.length<=n&&t.test(e)?e:null,q1=/^#[0-9a-fA-F]{3,8}$/,Z1=["little","kid","adult"];function N1(e){if(!e||typeof e!="object")return null;const t={};for(const n of["skin","hair","shirt","pants"])if(n in e){const s=z1(e[n],q1,9);if(!s)return null;t[n]=s}if("hairStyle"in e){const n=bf(e.hairStyle,0,3);if(n===null)return null;t.hairStyle=Math.round(n)}if("acc"in e){const n=bf(e.acc,0,3);if(n===null)return null;t.acc=Math.round(n)}if("size"in e){if(!Z1.includes(e.size))return null;t.size=e.size}if("flip"in e){if(typeof e.flip!="boolean")return null;t.flip=e.flip}return"look2"in e&&(t.look2=Ti(e.look2)??null),"costume"in e&&(t.costume=js(e.costume)),Object.keys(t).length?t:null}function Di(e){const t=as({id:"x"}),n=N1({skin:e?.skin,hair:e?.hair,hairStyle:e?.hairStyle,shirt:e?.shirt,pants:e?.pants,size:e?.size,acc:e?.acc})??{},s=i=>n[i]??t[i],o={skin:s("skin"),hair:s("hair"),hairStyle:s("hairStyle"),shirt:s("shirt"),pants:s("pants"),size:s("size"),acc:s("acc")};if(e&&typeof e=="object"&&"look2"in e){const i=Ti(e.look2);i&&(o.look2=i)}if(e&&typeof e=="object"&&"costume"in e){const i=js(e.costume);o.costume=i??""}return o}const kf=4,F1=["Mittens","Luna","Biscuit","Pumpkin","Whiskers","Mochi","Pepper","Noodle","Ginger","Socks"],j1=["Buddy","Coco","Max","Daisy","Peanut","Rocket","Bella","Waffles","Scout","Honey"];function yh(e){const t=String(e??"").normalize("NFC").replace(/\s+/g," ").trim();return!/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u.test(t)||(t.match(/\d/g)??[]).length>2?null:m1(t).ok?t:null}function G1(e,t=[]){return uh(e,Zn,"mail")}function bh(e){return typeof e.freeMail=="boolean"?e.freeMail:e.freeChat}const Nc=2900,ql=[{kind:"swing",x:430,y:500},{kind:"swing",x:570,y:500},{kind:"blanket",x:1730,y:548},{kind:"blanket",x:1850,y:548},{kind:"bench",x:2025,y:512},{kind:"bench",x:2105,y:512},{kind:"bench",x:2225,y:512},{kind:"bench",x:2305,y:512}],ge={top:{x:905,y:330},bottom:{x:1110,y:545},ladder:850},ct={x0:2440,x1:2840,y0:470,y1:585},Y1=(e,t)=>e.where===t.where&&(e.where!=="house"||e.houseId===t.houseId&&e.room===t.room),K1=(e,t)=>Y1(e,t)&&Math.abs(e.x-t.x)<=r1&&Math.abs(e.y-t.y)<=l1;function ji(e){try{return zc(e)}catch{return e}}const Zl=jt("cozy-hood"),ko=()=>{try{return JSON.parse(localStorage.getItem(Zl)??"null")}catch{return null}},Tn=e=>{e?localStorage.setItem(Zl,JSON.stringify(e)):localStorage.removeItem(Zl)};function Pr(){const e=new URLSearchParams(location.search).get("hood");return e?e.replace(/\/$/,""):"https://cozy-hood.andrewmunruh.workers.dev".replace(/\/$/,"")}async function X1(e){const t=await fetch(e+"/api/create",{method:"POST"});if(!t.ok)throw new Error("create failed "+t.status);return t.json()}async function J1(e,t){const n=await fetch(`${e}/api/hood/${encodeURIComponent(t)}`);if(n.status===429)return{slow:!0};if(!n.ok)throw new Error("lookup failed");return n.json()}const wf=e=>e.type==="item/move"?"im:"+e.id:e.type==="char/move"?"cm:"+e.id:e.type==="item/size"?"is:"+("id"in e?e.id:""):null;class Tr{constructor(t){this.cfg=t,this.ws=null,this.pid="",this.settings={freeChat:!0},this.players=new Map,this.houses=new Map,this.presence=new Map,this.status="offline",this.speaksSit=!1,this.speaksBaby=!1,this.speaksAmb=!1,this.replaced=!1,this.ranch={plots:[],skew:0},this.tables=new Map,this.handlers=new Map,this.cid=1,this.flushT=0,this.presT=0,this.lastPres=null,this.presDirty=!1,this.closedByUs=!1,this.retry=0,this.retryT=0,this.epoch=0,this.stableT=0,this.outbox=[]}on(t,n){(this.handlers.get(t)??this.handlers.set(t,[]).get(t)).push(n)}emit(t,...n){this.handlers.get(t)?.forEach(s=>s(...n))}send(t){return this.ws?.readyState!==WebSocket.OPEN?!1:(this.ws.send(JSON.stringify(t)),!0)}reliable(t){this.send(t)||(t.t==="lock"?this.outbox=this.outbox.filter(n=>!(n.t==="lock"&&n.houseId===t.houseId)):(t.t==="look"||t.t==="dog")&&(this.outbox=this.outbox.filter(n=>n.t!==t.t)),this.outbox.push(t),this.outbox.length>8&&this.outbox.splice(0,this.outbox.length-8))}flushOutbox(){if(this.ws?.readyState!==WebSocket.OPEN||!this.outbox.length)return;const t=this.outbox;this.outbox=[];for(const n of t)this.send(n)||this.outbox.push(n)}scheduleRetry(){if(this.closedByUs||this.replaced||!this.cfg.token||this.retryT)return;const t=this.epoch,n=Math.min(15e3,400*2**Math.min(this.retry,6));this.retry++,this.retryT=window.setTimeout(()=>{this.retryT=0,!(t!==this.epoch||this.closedByUs||this.replaced||!this.cfg.token)&&this.connect()},n)}armStable(){this.stableT&&clearTimeout(this.stableT),this.stableT=window.setTimeout(()=>{this.stableT=0,this.retry=0},1e4)}clearStable(){this.stableT&&(clearTimeout(this.stableT),this.stableT=0)}connect(t){this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.closedByUs=!1,this.replaced=!1,this.status="connecting",this.emit("status",this.status);const n=this.ws;return new Promise(s=>{let o=!1;const i=r=>{o||(o=!0,s(r))},a=new WebSocket(this.cfg.url.replace(/^http/,"ws")+"/ws/"+encodeURIComponent(this.cfg.id??this.cfg.code));if(this.ws=a,n&&n!==a)try{n.close()}catch{}a.onopen=()=>{t&&!this.cfg.token?this.send({t:"join",...t,v:kf,pet:1,mail:1,sit:1,fit:1,baby:1,amb:1,halloween:1,cos:1}):this.cfg.token?this.send({t:"hello",token:this.cfg.token,v:kf,pet:1,mail:1,sit:1,fit:1,baby:1,amb:1,halloween:1,cos:1}):i("notoken")},a.onmessage=r=>{const l=JSON.parse(r.data);this.handle(l),l.t==="welcome"&&(this.armStable(),i("ok")),l.t==="error"&&i(l.code+(l.msg?":"+l.msg:"")),l.t==="removed"&&i("removed")},a.onclose=r=>{if(this.ws===a){if(this.clearStable(),this.ws=null,this.status="offline",i("closed"),r.code===4e3){this.replaced=!0,this.emit("status",this.status),this.emit("replaced");return}this.emit("status",this.status),this.scheduleRetry()}},a.onerror=()=>{}})}close(){this.closedByUs=!0,this.replaced=!1,this.epoch++,this.outbox=[],this.clearStable(),this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.presT&&(clearTimeout(this.presT),this.presT=0);try{this.ws?.close()}catch{}this.ws=null,this.status="offline",clearInterval(this.flushT)}handle(t){switch(t.t){case"joined":this.cfg.token=t.token,this.cfg.pid=t.pid,Tn(this.cfg);break;case"welcome":this.pid=t.pid,this.settings=t.settings,this.status="online",this.speaksSit=t.sit===1,this.speaksBaby=t.baby===1,this.speaksAmb=t.amb===1,this.players=new Map(t.players.map(n=>[n.pid,n]));{const n=this.houses;this.houses=new Map;for(const s of t.houses){const{state:o,...i}=s,a=n.get(s.id);this.houses.set(s.id,{meta:i,confirmed:ji(o),pending:a?a.pending.filter(r=>!r.sent):[],view:null})}}this.presence=new Map(Object.entries(t.presence)),this.presence.delete(this.pid),t.ranch&&(this.ranch={plots:t.ranch.plots,skew:t.ranch.now-Date.now()});{const n=new Map;for(const s of t.tables??[])n.set(s.tb,this.stampTable(s));this.tables=n}clearInterval(this.flushT),this.flushT=window.setInterval(()=>this.flush(),60),this.lastPres&&(this.presDirty=!0),this.flushPres(),this.flushOutbox(),this.emit("welcome"),this.emit("status",this.status);break;case"act":{const n=this.houses.get(t.houseId);if(!n)return;n.confirmed=Oa(ji(n.confirmed),t.action);const s=t.by===this.pid&&n.pending[0]?.cid===t.cid;s&&n.pending.shift(),n.view=null,s||this.emit("act",t.houseId,t.action);break}case"nack":{const n=this.houses.get(t.houseId);if(!n)return;n.pending=n.pending.filter(s=>s.cid!==t.cid),t.state&&(n.confirmed=ji(t.state)),n.view=null,this.emit("reset",t.houseId,t.reason);break}case"pres":t.pid!==this.pid&&(t.p?this.presence.set(t.pid,t.p):this.presence.delete(t.pid),this.emit("pres",t.pid));break;case"players":this.players=new Map(t.players.map(n=>[n.pid,n])),this.emit("players");break;case"house":{const{state:n,...s}=t.house;this.houses.set(s.id,{meta:s,confirmed:ji(n),pending:[],view:null}),this.emit("houses");break}case"houseMeta":{const n=this.houses.get(t.meta.id);n&&(n.meta=t.meta,this.emit("houses"),this.emit("houseMeta",t.meta.id));break}case"houseGone":this.houses.delete(t.houseId),this.emit("houses"),this.emit("houseGone",t.houseId);break;case"settings":this.settings=t.settings,this.emit("settings");break;case"bubble":this.emit("bubble",t.pid,t.b);break;case"fx":this.emit("fx",t.pid,t.fx);break;case"knocked":this.emit("knocked",t.houseId,t.name);break;case"ranch":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch");break;case"ranchFail":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch"),this.emit("ranchFail",t.reason);break;case"noride":this.emit("noride",t.ride);break;case"table":{const n=this.stampTable(t.table);this.tables.set(n.tb,n),this.emit("table",n);break}case"tblFail":this.emit("tblFail",t.tb,t.reason);break;case"sayFail":this.emit("sayFail",t.reason);break;case"mailbox":{const n=this.houses.get(t.houseId);if(!n)return;if(t.mailbox?.letters?.length)n.confirmed={...n.confirmed,mailbox:t.mailbox};else{const{mailbox:s,...o}=n.confirmed;n.confirmed=o}n.view=null,this.emit("mailbox",t.houseId);break}case"mailFail":this.emit("mailFail",t.reason);break;case"parentInfo":this.emit("parentInfo",t);break;case"error":this.emit("error",t.code),t.code==="badtoken"&&(this.cfg.token=void 0,this.cfg.pid=void 0,Tn(this.cfg));break;case"removed":this.closedByUs=!0,this.emit("removed");break}}stampTable(t){const n=this.tables.get(t.tb),s=n&&n.away===t.away&&n.receivedAt?n.receivedAt:Date.now();return{...t,receivedAt:s}}view(t){const n=this.houses.get(t);return n?n.view??=n.pending.reduce((s,o)=>Oa(s,o.action),n.confirmed):null}myHouseId(){return this.players.get(this.pid)?.houseId??""}canEdit(t){const n=this.houses.get(t);return!!n&&(!n.meta.locked||n.meta.ownerId===this.pid)}dispatch(t,n){const s=this.houses.get(t);if(!s)return;const o=wf(n),i=s.pending[s.pending.length-1];o&&i&&!i.sent&&wf(i.action)===o?i.action=n:s.pending.push({cid:this.cid++,action:n,sent:!1}),s.view=null}flush(){for(const[t,n]of this.houses)for(const s of n.pending)!s.sent&&this.send({t:"act",houseId:t,cid:s.cid,action:s.action})&&(s.sent=!0);this.flushPres()}setPresence(t){this.lastPres=t,this.presDirty=!0,this.presT||this.flushPres()}flushPres(){if(!(!this.presDirty||!this.lastPres)){if(!this.send({t:"pres",p:this.lastPres})){!this.closedByUs&&!this.presT&&(this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90));return}this.presDirty=!1,this.presT&&clearTimeout(this.presT),this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90)}}myPresence(){return this.lastPres}say(t){this.reliable({t:"say",b:t})}lock(t,n){this.reliable({t:"lock",houseId:t,locked:n})}setLook(t){this.reliable({t:"look",look:t});const n=this.players.get(this.pid);n&&(n.look=t)}setDog(t){this.reliable({t:"dog",dog:t});const n=this.players.get(this.pid);n&&(n.dog=t)}fx(t){this.reliable({t:"fx",fx:t})}knock(t){this.send({t:"knock",houseId:t})}ranchOp(t){this.reliable({t:"ranch",o:t})}tbl(t){this.reliable({t:"tbl",...t})}sendMail(t,n,s,o){this.reliable({t:"mail",op:"send",houseId:t,text:n,color:s,sticker:o})}readMail(t,n){this.reliable({t:"mail",op:"read",houseId:t,id:n})}dropMail(t,n){this.reliable({t:"mail",op:"drop",houseId:t,id:n})}now(){return Date.now()+this.ranch.skew}parent(t){this.cfg.parentKey&&this.reliable({t:"parent",key:this.cfg.parentKey,...t})}}function e2(e,t,n,s="living"){let o=s;const i=[],a=()=>({...e.view(t),currentRoom:o,soundOn:n.get()}),r=l=>{if(e.houses.has(t)){const c=a();i.forEach(d=>d(c,l))}};return e.on("act",(l,c)=>{l===t&&r(c)}),e.on("reset",l=>{l===t&&r({type:"game/reset"})}),{houseId:t,get:a,subscribe(l){i.push(l)},dispatch(l){if(l.type==="room/switch")o=l.room;else if(l.type==="settings/sound")n.set(l.on);else{if(l.type==="game/reset")return;if(!e.canEdit(t)||l.type.startsWith("baby/")&&!e.speaksBaby||l.type==="item/power"&&!e.speaksAmb)return;e.dispatch(t,l)}r(l)}}}const tt="#5a3d5c",re=`stroke="${tt}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,Nl=[{name:"Tabby",body:"#ffb26b",stripe:"#e8893a",belly:"#ffe3c4"},{name:"Smokey",body:"#b9b6c9",stripe:"#8f8ba3",belly:"#ecebf3"},{name:"Tuxedo",body:"#4f4660",stripe:"",belly:"#ffffff"},{name:"Calico",body:"#fff6ec",stripe:"",belly:"#fff6ec"}],Fl=[{name:"Pup",body:"#f2d0a4",ear:"#b07d54",snout:"#fbe7cc"},{name:"Poodle",body:"#fff0f6",ear:"#ffc8dd",snout:"#fff7fb"},{name:"Dachshund",body:"#c07a45",ear:"#7d4a26",snout:"#d99a68"},{name:"Golden",body:"#f4b860",ear:"#e09a3e",snout:"#fbd9a0"},{name:"Spotty",body:"#ffffff",ear:"#4a3f52",snout:"#ffffff"}],t2=(e,t,n,s=!1)=>s?`<path d="M${e-3} ${n} q3 3 6 0 M${t-3} ${n} q3 3 6 0" fill="none" ${re} stroke-width="2.5"/>`:`<circle cx="${e}" cy="${n}" r="2.8" fill="${tt}"/><circle cx="${t}" cy="${n}" r="2.8" fill="${tt}"/><circle cx="${e+.9}" cy="${n-.9}" r=".9" fill="#fff"/><circle cx="${t+.9}" cy="${n-.9}" r=".9" fill="#fff"/>`,jl=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>`;function wo(e,t="stand"){const n=Nl[e]??Nl[0],s="#ffb3c6",o=(i,a,r,l)=>`
    <path d="M${i-13} ${a-8} L${i-10} ${a-25} L${i-1} ${a-13} Z" fill="${n.body}" ${re}/><path d="M${i-10.5} ${a-11} L${i-9.5} ${a-20} L${i-4} ${a-13} Z" fill="${s}"/>
    <path d="M${i+1} ${a-13} L${i+11} ${a-26} L${i+13} ${a-7} Z" fill="${e===3?"#f4a259":n.body}" ${re}/><path d="M${i+4} ${a-13} L${i+10} ${a-21} L${i+11} ${a-11} Z" fill="${s}"/>
    <circle cx="${i}" cy="${a}" r="${r}" fill="${n.body}" ${re}/>
    ${e===3?`<path d="M${i+2} ${a-r+1} a${r} ${r} 0 0 1 ${r-3} ${r-2} q-6 2 -${r-3} -${r-3}z" fill="#f4a259"/>`:""}
    ${e===2?`<ellipse cx="${i+2}" cy="${a+7}" rx="9" ry="7" fill="#fff"/>`:""}
    ${n.stripe?`<path d="M${i-4} ${a-r+2} v5 M${i+2} ${a-r+1} v6 M${i+8} ${a-r+3} v4" ${re} stroke="${n.stripe}" stroke-width="2.5"/>`:""}
    ${t2(i-4,i+7,a,l)}
    <path d="M${i+3} ${a+4} l-2.5 -2 h5 z" fill="#ff8fab"/><path d="M${i+.5} ${a+6} q2.5 2.5 5 0" fill="none" ${re} stroke-width="2"/>
    ${jl(i-8,a+5)}${jl(i+12,a+5)}
    <path d="M${i+r-2} ${a+3} l9 -2 M${i+r-2} ${a+6} l9 2" ${re} stroke-width="1.6"/>`;return t==="nap"?`<svg viewBox="0 0 120 100" class="catsvg nap">
    <g class="breathe"><path class="tail" d="M28 84 Q22 96 64 94" fill="none" stroke="${tt}" stroke-width="11" stroke-linecap="round"/><path d="M28 84 Q22 96 64 94" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="76" rx="36" ry="18" fill="${n.body}" ${re}/>
    ${e===3?'<ellipse cx="44" cy="72" rx="12" ry="8" fill="#f4a259"/><ellipse cx="66" cy="70" rx="9" ry="6" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 62 q3 6 0 12 M56 61 q3 6 0 12 M68 62 q3 6 0 11" fill="none" ${re} stroke="${n.stripe}" stroke-width="3"/>`:""}
    ${o(90,76,15,!0)}</g></svg>`:t==="sit"?`<svg viewBox="0 0 120 100" class="catsvg sit">
    <path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${tt}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="70" rx="20" ry="25" fill="${n.body}" ${re}/>
    <ellipse cx="70" cy="74" rx="10" ry="15" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="54" cy="66" rx="9" ry="12" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M50 60 q5 2 4 8 M49 72 q5 2 4 8" fill="none" ${re} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect x="62" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${re}/><rect x="74" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${re}/>
    ${e===2?'<ellipse cx="66.5" cy="93" rx="4" ry="2.5" fill="#fff"/><ellipse cx="78.5" cy="93" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(72,36,17,!1)}</svg>`:`<svg viewBox="0 0 120 100" class="catsvg stand">
    <path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${tt}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <rect class="leg b" x="34" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${re}/><rect class="leg a" x="74" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${re}/>
    <ellipse cx="58" cy="58" rx="32" ry="17" fill="${n.body}" ${re}/>
    <ellipse cx="64" cy="66" rx="20" ry="7" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="46" cy="52" rx="12" ry="9" fill="#f4a259"/><ellipse cx="68" cy="50" rx="9" ry="7" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 43 q3 6 0 12 M56 42 q3 6 0 12 M68 43 q3 6 0 11" fill="none" ${re} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect class="leg a" x="44" y="64" width="9" height="30" rx="4.5" fill="${n.body}" ${re}/><rect class="leg b" x="84" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${re}/>
    ${e===2?'<ellipse cx="48.5" cy="92" rx="4" ry="2.5" fill="#fff"/><ellipse cx="88.5" cy="92" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(90,40,17,!1)}</svg>`}function vi(e,t="stand"){const n=Fl[e]??Fl[0],s=t==="sleep",o=e===2,i=e===1,a=e===3,r=e===4,l=o?66:58,c=o?70:62,d=94-c,f=o?102:92,h=o?50:40,g=(_,T)=>i?`<rect class="leg ${T}" x="${_+2}" y="${c}" width="6" height="${d}" rx="3" fill="${n.body}" ${re}/><circle class="leg ${T}" cx="${_+5}" cy="91" r="6" fill="${n.body}" ${re}/>`:`<rect class="leg ${T}" x="${_}" y="${c}" width="10" height="${d}" rx="5" fill="${n.body}" ${re}/>`,m=i?`<circle cx="44" cy="58" r="15" fill="${n.body}" ${re}/><circle cx="70" cy="56" r="17" fill="${n.body}" ${re}/><ellipse cx="57" cy="58" rx="22" ry="12" fill="${n.body}"/>`:`<ellipse cx="${o?62:58}" cy="${l}" rx="${o?42:32}" ry="${o?13:17}" fill="${n.body}" ${re}/>`,k=r?`<circle cx="46" cy="54" r="5" fill="${tt}"/><circle cx="64" cy="62" r="4" fill="${tt}"/><circle cx="72" cy="50" r="3.5" fill="${tt}"/><circle cx="38" cy="64" r="3" fill="${tt}"/>`:"",$=i?`<g class="tail"><path d="M30 52 L22 38" ${re}/><circle cx="21" cy="34" r="7" fill="${n.body}" ${re}/></g>`:a?`<path class="tail" d="M30 52 Q10 50 14 30 Q20 40 30 46" fill="${n.body}" ${re}/>`:`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${tt}" stroke-width="9" stroke-linecap="round"/>`,y=!i&&!a?`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`:"",u=`
    ${i?`<circle cx="${f-2}" cy="${h-16}" r="10" fill="${n.body}" ${re}/>`:""}
    <circle cx="${f}" cy="${h}" r="17" fill="${n.body}" ${re}/>
    ${r?`<circle cx="${f-6}" cy="${h-8}" r="4" fill="${tt}"/>`:""}
    <ellipse cx="${f+13}" cy="${h+7}" rx="11" ry="8" fill="${n.snout}" ${re}/>
    <circle cx="${f+22}" cy="${h+4}" r="4" fill="${tt}"/>
    <path d="M${f+14} ${h+12} q4 3 8 0" fill="none" ${re} stroke-width="2"/>
    ${s?"":`<path class="tongue" d="M${f+16} ${h+13} q2 7 6 0" fill="#ff8fab" ${re} stroke-width="2"/>`}
    ${s?`<path d="M${f+2} ${h-4} q3 3 6 0" fill="none" ${re} stroke-width="2.4"/>`:`<circle cx="${f+5}" cy="${h-3}" r="3" fill="${tt}"/><circle cx="${f+6}" cy="${h-4}" r="1" fill="#fff"/>`}
    ${jl(f+2,h+8)}
    ${i?`<circle cx="${f-9}" cy="${h+8}" r="9" fill="${n.ear}" ${re}/>`:`<ellipse class="ear" cx="${f-9}" cy="${h+4}" rx="7" ry="${a||o?14:12}" fill="${n.ear}" ${re} transform="rotate(12 ${f-9} ${h+4})"/>`}
    <path d="M${f-12} ${h+14} q10 6 20 2" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/><circle cx="${f-1}" cy="${h+19}" r="3" fill="#ffd166" ${re} stroke-width="1.5"/>`,w=i?`<g class="tail"><path d="M42 86 L28 80" ${re}/><circle cx="25" cy="78" r="7" fill="${n.body}" ${re}/></g>`:`<path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${tt}" stroke-width="9" stroke-linecap="round"/><path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`;return t==="sit"||t==="sleep"?`<svg viewBox="0 0 130 100" class="dogsvg ${s?"sleep":"sit"}">${w}
    <ellipse cx="60" cy="70" rx="22" ry="24" fill="${n.body}" ${re}/>${r?`<circle cx="54" cy="66" r="5" fill="${tt}"/><circle cx="64" cy="80" r="4" fill="${tt}"/>`:""}
    ${g(62,"a")}${g(74,"b")}<g transform="translate(-22 -2)">${u}</g></svg>`:`<svg viewBox="0 0 130 100" class="dogsvg stand">${$}${y}
    ${g(o?30:34,"b")}${g(o?82:72,"a")}
    ${m}${k}
    ${g(o?42:46,"a")}${g(o?94:84,"b")}
    ${u}</svg>`}const kh=e=>{let t=2166136261;for(const n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0},$s=(e,t)=>{let n=(e^Math.imul(t,2654435761))>>>0;return n^=n>>>15,n=Math.imul(n,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296},vf=18,n2={1:.35,2:.6};function s2(e,t,n){return e-t*n2[n]}function o2(e,t){const s=Math.floor(t/1e3/2.8);return $s(kh(e||"pup"),s)<.62?"rest":"peek"}function i2(e,t,n,s,o=!1){const i=kh(e.name+":"+e.coat+":"+e.room+":"+Math.round(e.x)+(n?":t"+Math.round(n.x):"")),a=t/1e3,r=Math.floor(a/vf),l=a-r*vf;if(!n){const y=q=>Math.max(160,Math.min(2240,e.x+($s(i,q)-.5)*760)),u=y(r-1);let w=y(r);const _=$s(i+7,r),T=_<.45?"nap":_<.75?"sit":"groom",A=!!(s&&T==="nap"&&$s(i+13,r)<.72);A&&s&&(w=Math.max(160,Math.min(2240,s.x)));const H=Math.abs(w-u),F=Math.min(5,H/110);return l<F&&!o?{x:u+(w-u)*(l/F),mood:"walk",flip:w<u,perch:0,curl:0}:{x:w,mood:T,flip:w<u,perch:0,curl:A?1:0}}const c=Math.max(160,Math.min(2240,n.x)),d=$s(i+5,r)<.45?2:1,f=Math.max(160,Math.min(2240,c+($s(i,r)-.5)*420)),h=Math.abs(c-f),g=Math.min(4.2,Math.max(.6,h/160)),m=c<f;if(l<g&&!o)return{x:f+(c-f)*(l/g),mood:"walk",flip:m,perch:0,curl:0};const k=$s(i+11,r),$=k<.34?"nap":k<.67?"sit":"play";return{x:c,mood:$,flip:m,perch:d,curl:0}}const Qa="#5a3d5c",Ae=`stroke="${Qa}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,Oo=[`<svg viewBox="0 0 48 48"><path d="M24 40 C16 32 6 26 10 16 C14 8 24 12 24 20 C24 12 34 8 38 16 C42 26 32 32 24 40 Z" fill="#ff6b9a" ${Ae}/></svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd166" ${Ae}/></svg>`,`<svg viewBox="0 0 48 48"><circle cx="24" cy="22" r="6" fill="#ff8fab" ${Ae}/>${[0,60,120,180,240,300].map(e=>`<circle cx="${24+Math.cos(e*Math.PI/180)*12}" cy="${22+Math.sin(e*Math.PI/180)*12}" r="5" fill="#ffd166" ${Ae}/>`).join("")}<path d="M24 34 V44" ${Ae}/></svg>`,`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="10" fill="#ffb26b" ${Ae}/><circle cx="34" cy="20" r="8" fill="#ffc46b" ${Ae}/><path d="M28 14 L30 6 L36 14" fill="#ffb26b" ${Ae}/><circle cx="32" cy="19" r="1.4" fill="${Qa}"/><circle cx="37" cy="19" r="1.4" fill="${Qa}"/></svg>`,`<svg viewBox="0 0 48 48">${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M8 ${30-t*4} Q24 ${10-t*3} 40 ${30-t*4}" fill="none" stroke="${e}" stroke-width="4"/>`).join("")}</svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l3 10 10 1 -8 6 3 10 -8 -5 -8 5 3 -10 -8 -6 10 -1z" fill="#fff3b0" ${Ae}/><circle cx="12" cy="34" r="3" fill="#ff8fab" ${Ae}/><circle cx="36" cy="36" r="2.4" fill="#bde0fe" ${Ae}/></svg>`];function _f(e){const t=e?`<g class="flag"><path d="M30 16 V6" ${Ae}/><path d="M30 6 H42 L38 11 L42 16 H30 Z" fill="#ff6b6b" ${Ae}/></g>`:`<g class="flag"><path d="M18 28 H28" ${Ae}/><path d="M18 22 H28 L25 25 L28 28 H18 Z" fill="#ffd166" ${Ae}/></g>`;return`<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="68" rx="18" ry="3" fill="#000" opacity=".12"/>
    <rect x="30" y="40" width="5" height="26" rx="2" fill="#c99366" ${Ae}/>
    <path d="M8 40 V22 Q8 8 32 8 Q56 8 56 22 V40 Z" fill="#8ecae6" ${Ae}/>
    <path d="M8 28 H56" ${Ae}/>
    <rect x="14" y="32" width="36" height="16" rx="4" fill="#fff6e6" ${Ae}/>
    <circle cx="32" cy="40" r="3" fill="${Qa}"/>
    ${t}
  </svg>`}function a2(e,t=[]){const n=G1(e,t);return n.ok?{ok:!0,text:n.text}:{ok:!1,msg:n.reason==="empty"?"Write a little note!":Sr[n.reason]||"Oops, try different words!"}}const r2={...Sr,empty:"Write a little note!",slow:"Let's wait a moment!",full:"This mailbox is full!",notyours:"Only she can open her mail.",nohouse:"That house is not on the street.",gone:"That letter is already gone.",toobig:"The mailbox is too full!",presetsOnly:"Typing is turned off: pick a phrase!",unread:"She still has your letters! Wait until she reads them."};function l2(e){return r2[e]||"Let's try that again!"}function c2(e){let t="",n="",s=!1,o="",i=0,a=0,r=-1,l="",c="";const d=()=>document.getElementById("mailCue");d()?.addEventListener("click",()=>{e.openOwn()});function f(){t="",n="",document.getElementById("mailSheet")?.remove()}function h(){let y=document.getElementById("mailSheet");return y||(y=document.createElement("div"),y.id="mailSheet",y.className="sheet mailSheet",y.innerHTML='<div class="card" id="mailCard"></div>',document.body.appendChild(y),y.addEventListener("click",u=>{const w=u.target;if(w===y||w.closest('[data-m="close"]')){f();return}m(w)}),y.addEventListener("input",u=>{const w=u.target;if(w.id!=="mailText")return;const _=document.getElementById("mailCount");_&&(_.textContent=`${w.value.length}/${Zn}`)})),y}function g(){if(!t)return;const y=h().querySelector("#mailText")?.value??"",u=e.mine(t),w=e.lettersOf(t),_=e.houseName(t),T=h().querySelector("#mailCard");if(n&&u&&!s){const H=w.find(F=>F.id===n);if(H&&H.text){k(H);return}n=""}if(s||!u){const H=e.freeType(),F=o?`Reply to ${e.houseName(o)||"your friend"}`:u?"Leave a letter":`Letter for ${_}`,q=H?`<textarea id="mailText" class="mailBox" maxlength="${Zn}" placeholder="Hi! Come play!"></textarea>
        <div class="mailCount" id="mailCount">0/${Zn}</div>`:`<h3>Phrase</h3><div class="phrases mailPhrases">${ai.map((K,fe)=>`<button type="button" data-phrase="${fe}" class="${fe===r?"on":""}">${gt(K)}</button>`).join("")}</div>`;T.innerHTML=`<button class="close" data-m="close">✕</button><h2>${gt(F)}</h2>
        <p class="hint">${H?"A short note. Your name goes on it for you.":"Pick a phrase. Your name goes on it for you."}</p>
        ${q}
        <h3>Paper</h3><div class="mailRow">${On.map((K,fe)=>`<button class="swatch ${fe===i?"on":""}" data-color="${fe}" style="background:${K}" aria-label="Paper ${fe+1}"></button>`).join("")}</div>
        <h3>Sticker</h3><div class="mailRow">${Oo.slice(0,Yp).map((K,fe)=>`<button class="stick ${fe===a?"on":""}" data-sticker="${fe}" aria-label="Sticker ${fe+1}">${K}</button>`).join("")}</div>
        ${l?`<p class="mailErr" id="mailErr">${gt(l)}</p>`:""}
        <button class="mailSend" id="mailSend" type="button">Send</button>
        ${u&&w.length?'<button class="mailRow" data-act="back" type="button" style="margin-top:8px">Back to my mail</button>':""}`;const se=h().querySelector("#mailText");if(se&&y){se.value=y;const K=document.getElementById("mailCount");K&&(K.textContent=`${y.length}/${Zn}`)}return}const A=w.length?w.slice().reverse().map(H=>H.text?`<button type="button" class="letter ${H.read?"":"fresh"}" data-letter="${gt(H.id)}" style="background:${On[H.color]??On[0]}">
        <span class="sticker">${Oo[H.sticker]??Oo[0]}</span>
        <span class="who">${gt(H.from)}</span><span class="when">${gt(sl(H.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${Ae}/><path d="M4 8 L40 24 L76 8" fill="${On[H.color]??"#fff"}" ${Ae}/></svg>
      </button>`:`<div class="letter" style="background:${On[H.color]??On[0]}"><span class="who">Your letter</span><span class="when">${gt(sl(H.at))}</span><span class="statusChip ${H.read?"read":""}">${H.read?"Read":"Delivered"}</span></div>`).join(""):'<p class="hint">No letters yet. Your flag pops up when one arrives!</p>';T.innerHTML=`<button class="close" data-m="close">✕</button><h2>${gt(_)} mailbox</h2>${A}
      <div class="mailRow"><button type="button" data-act="write">Write a letter</button></div>
      ${l?`<p class="mailErr">${gt(l)}</p>`:""}`}function m(y){const u=y.closest(".mailPhrases [data-phrase]");if(u){r=+u.dataset.phrase,l="",g();return}const w=y.closest("[data-color]");if(w){i=+w.dataset.color,g();return}const _=y.closest("[data-sticker]");if(_){a=+_.dataset.sticker,g();return}if(y.closest("#mailSend"))return $();const T=y.closest("[data-act]")?.dataset.act;if(T==="write"){s=!0,o="",n="",l="",g();return}if(T==="back"){s=!1,o="",n="",l="",g();return}if(T==="reply"){const se=e.houseOf(y.closest("[data-from]")?.dataset.from??"");if(!se){e.toast("They are not on the street anymore.");return}o=se,s=!0,n="",l="",t=se,g();return}if(T==="drop"){const se=y.closest("[data-id]")?.dataset.id??"";if(c!==se){c=se,e.toast("Tap again to throw it away");return}c="",e.drop(t,se);return}const A=y.closest("[data-letter]");if(!A)return;const H=A.dataset.letter,q=e.lettersOf(t).find(se=>se.id===H);q&&(!e.mine(t)||!q.text||(q.read||e.read(t,H),n=H,k(q)))}function k(y){const u=d2(y.text),w=h().querySelector("#mailCard");w.innerHTML=`<button class="close" data-m="close">✕</button>
      <div class="letter open read" style="background:${On[y.color]??On[0]}" data-id="${gt(y.id)}" data-from="${gt(y.fromPid)}">
        <span class="sticker">${Oo[y.sticker]??Oo[0]}</span>
        <span class="who">${gt(y.from)}</span><span class="when">${gt(sl(y.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${Ae}/><path class="flap" d="M4 8 L40 24 L76 8" fill="#fff" ${Ae}/></svg>
        <p class="words">${gt(u??"")}</p>
        <span class="mailRow"><button type="button" data-act="reply">Reply</button><button type="button" class="throw" data-act="drop">${c===y.id?"Tap again":"Throw away"}</button></span>
      </div>
      <button type="button" data-act="back">All my mail</button>
      ${l?`<p class="mailErr">${gt(l)}</p>`:""}`}function $(){let y="";if(e.freeType()){const w=h().querySelector("#mailText")?.value??"",_=a2(w);if(!_.ok){l=_.msg,g();const T=h().querySelector("#mailText");T&&(T.value=w);return}y=_.text}else{if(r<0||r>=ai.length){l="Pick a phrase!",g();return}y=ai[r]}const u=o||t;l="",e.send(u,y,i,a),e.toast("On its way!"),e.mine(u)?(s=!1,o="",t=u,g()):f()}return{open(y,u,w,_){t=y,n="",s=!w,o="",l="",c="",i=0,a=0,r=-1,g()},fail(y){l=l2(y),t?g():e.toast(l)},refresh(){t&&g()},syncCue(y){d()?.classList.toggle("show",y)}}}function d2(e){if(!e)return null;const t=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return!t||t.length>Zn?null:t}function gt(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const wh=()=>jt("cozy-play");function f2(){try{return localStorage.getItem(wh())==="play"?"play":"decorate"}catch{return"decorate"}}function p2(e){try{localStorage.setItem(wh(),e)}catch{}}function h2(e){return e==="kennel"?"kennel":e==="cat-tower"?"tower":e==="yard-swing"?"swing":e==="lamp"||/(^|:)lamp|starlamp|light/.test(e)?"lamp":e==="fridge"||e==="stove"||e==="vanity"||e==="bookshelf"||e==="window"||e==="mirror"||e==="tv"||/fridge|stove|cabinet|drawer|vanity/.test(e)?"open":Gs(e)?"sit":"wiggle"}const g2='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M34 8 l1.2 3 3 .4 -2.2 2 .6 3 -2.6-1.6 -2.6 1.6 .6-3 -2.2-2 3-.4z" fill="#ffd166" stroke="#5a3d5c" stroke-width="1.4"/></svg>',u2='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 36 h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M8 14 l2 1 M40 34 l2 2 M8 40 l3 -1" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>';function m2(e,t){let n="decorate";const s=e.querySelector("#modePlay"),o=e.querySelector("#modeDecorate");s.querySelector(".modeIco").innerHTML=g2,o.querySelector(".modeIco").innerHTML=u2;const i=()=>{const c=n==="play";document.body.classList.toggle("mode-play",c),s.classList.toggle("on",c),o.classList.toggle("on",!c),s.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-pressed",c?"false":"true")},a=(c,d)=>{n=c,d&&p2(c),i(),t.onChange?.()};e.addEventListener("pointerdown",c=>c.stopPropagation()),e.addEventListener("click",c=>{const d=c.target.closest("[data-mode]");if(!d)return;const f=d.dataset.mode==="play"?"play":"decorate";a(f,t.ownHouse())}),i();let r=!1;return{mode:()=>n,isPlay:()=>n==="play",sync(c){a(c?f2():"play",!1)},hint:()=>{if(r||!document.body.classList.contains("phone"))return;const c=jt("cozy-mode-hint");try{if(localStorage.getItem(c)){r=!0;return}}catch{r=!0;return}r=!0;const d=document.createElement("p");d.className="modeHint",d.textContent="Play: tap things! Decorate: move things!",e.appendChild(d);let f=!1;const h=()=>{if(!f){f=!0,d.remove(),window.removeEventListener("pointerdown",h);try{localStorage.setItem(c,"1")}catch{}}};window.setTimeout(h,2800),d.addEventListener("click",h),window.addEventListener("pointerdown",h)}}}const vh=new Map;let _h=!1;function vo(){return _h}function y2(e){_h=e}function Ws(e){return vh.get(e)}function b2(e,t){vh.set(e,t)}const k2=!0;let Gi=null;function w2(e){const t=new URLSearchParams(e.replace(/^\?/,"")).get("art");t==="v1"?Gi=!1:t==="v2"?Gi=!0:Gi=null;const n=Gi??k2;return y2(n),n}const za=Object.assign({"../../assets/art/any/armchair.webp":()=>p(()=>import("./armchair-BAjEKZT-.js"),[]).then(e=>e.default),"../../assets/art/any/ball.webp":()=>p(()=>import("./ball-D1B5vbct.js"),[]).then(e=>e.default),"../../assets/art/any/balloon.webp":()=>p(()=>import("./balloon-5CQ1ji1d.js"),[]).then(e=>e.default),"../../assets/art/any/bookshelf.webp":()=>p(()=>import("./bookshelf-BCCk-QJS.js"),[]).then(e=>e.default),"../../assets/art/any/chair.webp":()=>p(()=>import("./chair-BxTP5f1M.js"),[]).then(e=>e.default),"../../assets/art/any/clock.webp":()=>p(()=>import("./clock-D_q2KVbT.js"),[]).then(e=>e.default),"../../assets/art/any/lamp.webp":()=>p(()=>import("./lamp-BOWZQ_df.js"),[]).then(e=>e.default),"../../assets/art/any/picture.webp":()=>p(()=>import("./picture-DsR0Jovx.js"),[]).then(e=>e.default),"../../assets/art/any/plant.webp":()=>p(()=>import("./plant-xO8tOsUj.js"),[]).then(e=>e.default),"../../assets/art/any/rug.webp":()=>p(()=>Promise.resolve().then(()=>F9),void 0).then(e=>e.default),"../../assets/art/any/sofa.webp":()=>p(()=>import("./sofa-DqtVZLgl.js"),[]).then(e=>e.default),"../../assets/art/any/table.webp":()=>p(()=>import("./table-CaJl95Y4.js"),[]).then(e=>e.default),"../../assets/art/any/tv.webp":()=>p(()=>import("./tv-10oa_PoM.js"),[]).then(e=>e.default),"../../assets/art/any/window.webp":()=>p(()=>import("./window-jtnOMij-.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-mat.webp":()=>p(()=>import("./bath-mat-DLlrRePN.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-mirror.webp":()=>p(()=>import("./bath-mirror-4OfFj8EV.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-stool.webp":()=>p(()=>import("./bath-stool-DqJM8fLh.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-toilet.webp":()=>p(()=>import("./bath-toilet-C2nhunlA.js"),[]).then(e=>e.default),"../../assets/art/bathroom/laundry-hamper.webp":()=>p(()=>import("./laundry-hamper-0OQZcXyH.js"),[]).then(e=>e.default),"../../assets/art/bathroom/rubber-ducky.webp":()=>p(()=>import("./rubber-ducky-pwUm0Pe4.js"),[]).then(e=>e.default),"../../assets/art/bathroom/shower-curtain.webp":()=>p(()=>import("./shower-curtain-UCHNbYT7.js"),[]).then(e=>e.default),"../../assets/art/bathroom/sink-vanity.webp":()=>p(()=>import("./sink-vanity-aUbm9Mix.js"),[]).then(e=>e.default),"../../assets/art/bathroom/soaking-tub.webp":()=>p(()=>import("./soaking-tub-C07Kgt8P.js"),[]).then(e=>e.default),"../../assets/art/bathroom/soap-dish.webp":()=>p(()=>import("./soap-dish-Duoeh42V.js"),[]).then(e=>e.default),"../../assets/art/bathroom/towel-bar.webp":()=>p(()=>import("./towel-bar-fU4SDA3M.js"),[]).then(e=>e.default),"../../assets/art/bedroom/bed.webp":()=>p(()=>import("./bed-CKbzIr1E.js"),[]).then(e=>e.default),"../../assets/art/bedroom/mirror.webp":()=>p(()=>import("./mirror-D5FvkWJA.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~alarm-clock.webp":()=>p(()=>import("./pack~alarm-clock-B1MKtcYc.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bedtime-snack.webp":()=>p(()=>import("./pack~bedtime-snack-CQHBbXTE.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~big-monitor.webp":()=>p(()=>import("./pack~big-monitor-DnY9RO7w.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~big-wardrobe.webp":()=>p(()=>import("./pack~big-wardrobe-DKmYluKF.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~book-stack.webp":()=>p(()=>import("./pack~book-stack-DgPlZ9_3.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bubble-bath.webp":()=>p(()=>import("./pack~bubble-bath-CP64sVml.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bunk-bed.webp":()=>p(()=>import("./pack~bunk-bed-D-NM_ktx.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bunny-slippers.webp":()=>p(()=>import("./pack~bunny-slippers-I8r5WVZt.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~canopy-bed.webp":()=>p(()=>import("./pack~canopy-bed-BpoysMK9.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cat-bed.webp":()=>p(()=>import("./pack~cat-bed-BAS6-rN0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~caterpillar-plush.webp":()=>p(()=>import("./pack~caterpillar-plush-CEbFuatX.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-canopy-daybed.webp":()=>p(()=>import("./pack~cc-canopy-daybed-DoE44IXz.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-cloud-beanbag.webp":()=>p(()=>import("./pack~cc-cloud-beanbag-D0qNEg32.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-cloud-lamp.webp":()=>p(()=>import("./pack~cc-cloud-lamp-DIDpxlMU.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-fairy-garland.webp":()=>p(()=>import("./pack~cc-fairy-garland-CEQT4GTj.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-heart-bed.webp":()=>p(()=>import("./pack~cc-heart-bed-BupJOayJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-jewel-box.webp":()=>p(()=>import("./pack~cc-jewel-box-C-vIsXue.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-reading-nook.webp":()=>p(()=>import("./pack~cc-reading-nook-Ba_6wW4M.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-star-dresser.webp":()=>p(()=>import("./pack~cc-star-dresser-CY3IU_Po.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-window-seat.webp":()=>p(()=>import("./pack~cc-window-seat-CPrwdaeJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~checker-bed.webp":()=>p(()=>import("./pack~checker-bed-Dl1khZwL.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~clothes-rail.webp":()=>p(()=>import("./pack~clothes-rail-DpNxviPS.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cloud-rug.webp":()=>p(()=>import("./pack~cloud-rug-BVi9jYKG.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cloud-shelf.webp":()=>p(()=>import("./pack~cloud-shelf-slqFLmn1.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cork-board.webp":()=>p(()=>import("./pack~cork-board-DWOPEjn8.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~curvy-desk.webp":()=>p(()=>import("./pack~curvy-desk-BDa2yytO.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~daisy-pot.webp":()=>p(()=>import("./pack~daisy-pot-vdUJfXm_.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~desk-mic.webp":()=>p(()=>import("./pack~desk-mic-d9T8n8mE.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~desk.webp":()=>p(()=>import("./pack~desk-C-3AgNRZ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~dino-plush.webp":()=>p(()=>import("./pack~dino-plush-DdqMPHIF.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~doll-house.webp":()=>p(()=>import("./pack~doll-house-CH0M4iJ5.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~dresser.webp":()=>p(()=>import("./pack~dresser-Cws-4Als.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~egg-chair.webp":()=>p(()=>import("./pack~egg-chair-DYGRZPW0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~floor-fan.webp":()=>p(()=>import("./pack~floor-fan-NUw25upr.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~frog-plush.webp":()=>p(()=>import("./pack~frog-plush-Bq4x4dF_.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~game-controller.webp":()=>p(()=>import("./pack~game-controller-CwDKL6zs.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~gaming-chair.webp":()=>p(()=>import("./pack~gaming-chair-Ch-jvTrR.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~guinea-pig.webp":()=>p(()=>import("./pack~guinea-pig-BSQGDcoG.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~hamster-cage.webp":()=>p(()=>import("./pack~hamster-cage-1ZrJIYPk.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~hamster-pet.webp":()=>p(()=>import("./pack~hamster-pet-DO0Nc-ra.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~headphones.webp":()=>p(()=>import("./pack~headphones-BuEyFi9F.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~heart-rug.webp":()=>p(()=>import("./pack~heart-rug-CHsSWFVJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~keyboard.webp":()=>p(()=>import("./pack~keyboard-CpH04NZb.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~lava-lamp.webp":()=>p(()=>import("./pack~lava-lamp-C0yGLXxS.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~moon-night-light.webp":()=>p(()=>import("./pack~moon-night-light-jQgCx363.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~nightstand.webp":()=>p(()=>import("./pack~nightstand-CAZ1Ijk0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~paper-lantern.webp":()=>p(()=>import("./pack~paper-lantern-CBHdnzS2.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~pastel-wardrobe.webp":()=>p(()=>import("./pack~pastel-wardrobe-6p6FbGSg.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~phone-stand.webp":()=>p(()=>import("./pack~phone-stand-DA6FpZ6R.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~piggy-bank.webp":()=>p(()=>import("./pack~piggy-bank-CsgR-O1T.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~plant-stand.webp":()=>p(()=>import("./pack~plant-stand-m1tPlZfP.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~play-tent.webp":()=>p(()=>import("./pack~play-tent-C9Fxa0Rh.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~star-mobile.webp":()=>p(()=>import("./pack~star-mobile-CMLjVRhn.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-chest.webp":()=>p(()=>import("./pack~toy-chest-Bx3rslln.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-robot.webp":()=>p(()=>import("./pack~toy-robot-DuDxaaXx.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-train.webp":()=>p(()=>import("./pack~toy-train-OdPxfMvY.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~unicorn-plush.webp":()=>p(()=>import("./pack~unicorn-plush-1Ml4NpgU.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~vlog-camera.webp":()=>p(()=>import("./pack~vlog-camera-CU7magSa.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wardrobe.webp":()=>p(()=>import("./pack~wardrobe-CnpDMG_i.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wh-dresser.webp":()=>p(()=>import("./pack~wh-dresser-BJJ7U3Ti.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wh-nightstand.webp":()=>p(()=>import("./pack~wh-nightstand-TWRUmwYh.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wood-desk.webp":()=>p(()=>import("./pack~wood-desk-rwE12GqK.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wooden-bed.webp":()=>p(()=>import("./pack~wooden-bed-13S3AiLf.js"),[]).then(e=>e.default),"../../assets/art/bedroom/stars.webp":()=>p(()=>import("./stars-BPD2RlkZ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/story-pillow.webp":()=>p(()=>import("./story-pillow-3KtRY1EI.js"),[]).then(e=>e.default),"../../assets/art/bedroom/teddy.webp":()=>p(()=>import("./teddy-CS3IZCmA.js"),[]).then(e=>e.default),"../../assets/art/bedroom/tub.webp":()=>p(()=>import("./tub-D2ItmFKM.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-bakery-shelf.webp":()=>p(()=>import("./pack~cc-bakery-shelf-C9pglmOD.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-breakfast-table.webp":()=>p(()=>import("./pack~cc-breakfast-table-CqAzN2si.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-bubble-chair.webp":()=>p(()=>import("./pack~cc-bubble-chair-Db6ctGIk.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-cupcake-stand.webp":()=>p(()=>import("./pack~cc-cupcake-stand-ClVhXfMJ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-dryer-chair.webp":()=>p(()=>import("./pack~cc-dryer-chair-BhVjSN-o.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-flower-kettle.webp":()=>p(()=>import("./pack~cc-flower-kettle-T5UeKV0l.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-light-vanity.webp":()=>p(()=>import("./pack~cc-light-vanity-D_F5Ili-.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-macaron-jar.webp":()=>p(()=>import("./pack~cc-macaron-jar-C7OMMZGy.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-mani-chair.webp":()=>p(()=>import("./pack~cc-mani-chair-gE8U4fT9.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-mint-fridge.webp":()=>p(()=>import("./pack~cc-mint-fridge-qv93g_mZ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-pastel-range.webp":()=>p(()=>import("./pack~cc-pastel-range-DEzEnqL9.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-perfume-tray.webp":()=>p(()=>import("./pack~cc-perfume-tray-BOuRtQMQ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-ribbon-mirror.webp":()=>p(()=>import("./pack~cc-ribbon-mirror-DaVelywO.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-teapot-set.webp":()=>p(()=>import("./pack~cc-teapot-set-CYwQRzs2.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~arched-shelf.webp":()=>p(()=>import("./pack~arched-shelf-CKpdbpUV.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~blob-rug.webp":()=>p(()=>import("./pack~blob-rug-DV27jZ4K.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~bubbly-plant.webp":()=>p(()=>import("./pack~bubbly-plant-DaDhjp5G.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~bud-vase.webp":()=>p(()=>import("./pack~bud-vase-BjDwnbex.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~comb-brush.webp":()=>p(()=>import("./pack~comb-brush-2q32lqRM.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~cream-jars.webp":()=>p(()=>import("./pack~cream-jars-DuhIPlDY.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~drop-lamp.webp":()=>p(()=>import("./pack~drop-lamp-CpS9XCXn.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~droplet-buddy.webp":()=>p(()=>import("./pack~droplet-buddy-DgmZ-fU6.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~fancy-sofa.webp":()=>p(()=>import("./pack~fancy-sofa-Cuv4CZ93.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~flower-cart.webp":()=>p(()=>import("./pack~flower-cart-Cpa-qrtx.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~foot-spa.webp":()=>p(()=>import("./pack~foot-spa-CSEQ1rPl.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~globe-pendants.webp":()=>p(()=>import("./pack~globe-pendants-CeBlCiLv.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~glow-mirror.webp":()=>p(()=>import("./pack~glow-mirror-BK53Zp0A.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~gold-floor-mirror.webp":()=>p(()=>import("./pack~gold-floor-mirror-BIgxfU1m.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~hair-dryer.webp":()=>p(()=>import("./pack~hair-dryer-CDTC9I6n.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~heart-plant.webp":()=>p(()=>import("./pack~heart-plant-B-wW-dwX.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~heart-pouf.webp":()=>p(()=>import("./pack~heart-pouf-BbbND0iB.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~lilac-curtain.webp":()=>p(()=>import("./pack~lilac-curtain-CKYxudqA.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~lotion-trio.webp":()=>p(()=>import("./pack~lotion-trio-oJDS-nAk.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~mani-lamp.webp":()=>p(()=>import("./pack~mani-lamp-CIckVWe7.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~nail-table.webp":()=>p(()=>import("./pack~nail-table-DblO1JLs.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pebble-rug.webp":()=>p(()=>import("./pack~pebble-rug-bTJFA8Ur.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~perfume-bottle.webp":()=>p(()=>import("./pack~perfume-bottle-gM_mVBfU.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pink-fountain.webp":()=>p(()=>import("./pack~pink-fountain-Ciur2kZp.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pink-vanity.webp":()=>p(()=>import("./pack~pink-vanity-wGJdTvWK.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~polish-bottle.webp":()=>p(()=>import("./pack~polish-bottle-TyYjJ4KH.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~polish-rack.webp":()=>p(()=>import("./pack~polish-rack-BiHiHzDG.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~reception-desk.webp":()=>p(()=>import("./pack~reception-desk-Bhr61SSS.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~salon-chair.webp":()=>p(()=>import("./pack~salon-chair-B5ARb_Hu.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~scent-candle.webp":()=>p(()=>import("./pack~scent-candle-DhSW37c1.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~spray-bottle.webp":()=>p(()=>import("./pack~spray-bottle-co6Gr0Aw.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~star-wall-sign.webp":()=>p(()=>import("./pack~star-wall-sign-keSh_Cax.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~swivel-stool.webp":()=>p(()=>import("./pack~swivel-stool-gm_rxOWt.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~tiered-tray.webp":()=>p(()=>import("./pack~tiered-tray-CrVkNUF_.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~towel-cart.webp":()=>p(()=>import("./pack~towel-cart-TzS6naxj.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~towel-stack.webp":()=>p(()=>import("./pack~towel-stack-DVE-ZURg.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~vine-planter.webp":()=>p(()=>import("./pack~vine-planter-D6XFbFLe.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~waiting-bench.webp":()=>p(()=>import("./pack~waiting-bench-rf-Lxrnd.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~wash-chair.webp":()=>p(()=>import("./pack~wash-chair-By1PyrJZ.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-candy-bowl.webp":()=>p(()=>import("./pack~hw-candy-bowl-DYzwlwqt.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-cat-statue.webp":()=>p(()=>import("./pack~hw-cat-statue-FQxqUye_.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-cauldron.webp":()=>p(()=>import("./pack~hw-cauldron-CEa-TJHO.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-ghost-sheet.webp":()=>p(()=>import("./pack~hw-ghost-sheet-rc91-ve_.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-hay-bale.webp":()=>p(()=>import("./pack~hw-hay-bale-BbE90YS9.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-heart-pumpkin.webp":()=>p(()=>import("./pack~hw-heart-pumpkin-PfYNpXFo.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-leaf-garland.webp":()=>p(()=>import("./pack~hw-leaf-garland-DpM5QBlC.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-moon-cling.webp":()=>p(()=>import("./pack~hw-moon-cling-CH5pjYPJ.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-moon-lantern.webp":()=>p(()=>import("./pack~hw-moon-lantern-CmD5N0JV.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-star-pumpkin.webp":()=>p(()=>import("./pack~hw-star-pumpkin-WFRvw5za.js"),[]).then(e=>e.default),"../../assets/art/halloween/pack~hw-witch-hat.webp":()=>p(()=>import("./pack~hw-witch-hat-q2MY5sg8.js"),[]).then(e=>e.default),"../../assets/art/kitchen/apple.webp":()=>p(()=>import("./apple-CgQUqZtF.js"),[]).then(e=>e.default),"../../assets/art/kitchen/berry-basket.webp":()=>p(()=>import("./berry-basket-D02mck40.js"),[]).then(e=>e.default),"../../assets/art/kitchen/cake.webp":()=>p(()=>import("./cake-D-PUSdV3.js"),[]).then(e=>e.default),"../../assets/art/kitchen/donut.webp":()=>p(()=>import("./donut-D-CyVfCH.js"),[]).then(e=>e.default),"../../assets/art/kitchen/fridge.webp":()=>p(()=>import("./fridge-CPUz39WO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/juice.webp":()=>p(()=>import("./juice-C7d-xViI.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bananas.webp":()=>p(()=>import("./pack~bananas-BaRiiq6m.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bar-stool.webp":()=>p(()=>import("./pack~bar-stool-DoItrBtD.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bread-loaf.webp":()=>p(()=>import("./pack~bread-loaf-DkvGPzQe.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~chick.webp":()=>p(()=>import("./pack~chick-BO9DXErH.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~china-hutch.webp":()=>p(()=>import("./pack~china-hutch-DPrwGSNq.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cocoa-mug.webp":()=>p(()=>import("./pack~cocoa-mug-hzMczJEM.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cookie-jar.webp":()=>p(()=>import("./pack~cookie-jar-DwGPCGTZ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cooking-pot.webp":()=>p(()=>import("./pack~cooking-pot-CfarfMvn.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cupcake.webp":()=>p(()=>import("./pack~cupcake-4s6JCz52.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~dish-rack.webp":()=>p(()=>import("./pack~dish-rack-Dffid-z2.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~fruit-bowl.webp":()=>p(()=>import("./pack~fruit-bowl-S7zdSZud.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~frying-pan.webp":()=>p(()=>import("./pack~frying-pan-BibqhFDJ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~happy-fridge.webp":()=>p(()=>import("./pack~happy-fridge-HnFXofL6.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~herb-box.webp":()=>p(()=>import("./pack~herb-box-DjQ-1q5D.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~high-chair.webp":()=>p(()=>import("./pack~high-chair-24NInnaO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~ice-cream.webp":()=>p(()=>import("./pack~ice-cream-rdopj06A.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kettle.webp":()=>p(()=>import("./pack~kettle-ByDzqkyg.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kitchen-counter.webp":()=>p(()=>import("./pack~kitchen-counter-B7uMIWhT.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kitchen-sink.webp":()=>p(()=>import("./pack~kitchen-sink-DyICEjEC.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~lemon-tree.webp":()=>p(()=>import("./pack~lemon-tree-B8bzBxaO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~microwave.webp":()=>p(()=>import("./pack~microwave-B6anYgBg.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~milk-bottle.webp":()=>p(()=>import("./pack~milk-bottle-CKMei0uX.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pancakes.webp":()=>p(()=>import("./pack~pancakes-BmuT40In.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pantry-shelf.webp":()=>p(()=>import("./pack~pantry-shelf-0EpJaISh.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pendant-lamp.webp":()=>p(()=>import("./pack~pendant-lamp-BRmz1TSb.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pet-bowl.webp":()=>p(()=>import("./pack~pet-bowl-bLDcshyX.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~rice-cooker.webp":()=>p(()=>import("./pack~rice-cooker-j9bjO2OS.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~runner-rug.webp":()=>p(()=>import("./pack~runner-rug-DgsAHdwM.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~spice-rack.webp":()=>p(()=>import("./pack~spice-rack-5CIyihfN.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~stand-mixer.webp":()=>p(()=>import("./pack~stand-mixer-DVs9icnQ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~teapot.webp":()=>p(()=>import("./pack~teapot-Clbuel00.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~toaster.webp":()=>p(()=>import("./pack~toaster-0CdrvAn6.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~utensil-rail.webp":()=>p(()=>import("./pack~utensil-rail-7lJosKxj.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~watermelon-slice.webp":()=>p(()=>import("./pack~watermelon-slice-DDNYgh1a.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pizza.webp":()=>p(()=>import("./pizza-CBn4rlbT.js"),[]).then(e=>e.default),"../../assets/art/kitchen/stove.webp":()=>p(()=>import("./stove-EEI-cSzf.js"),[]).then(e=>e.default),"../../assets/art/living/bunny.webp":()=>p(()=>import("./bunny-PYkx6Ie3.js"),[]).then(e=>e.default),"../../assets/art/living/cactus.webp":()=>p(()=>import("./cactus-CNbOypby.js"),[]).then(e=>e.default),"../../assets/art/living/cat-tower.webp":()=>p(()=>import("./cat-tower-BTX9_pA4.js"),[]).then(e=>e.default),"../../assets/art/living/cat.webp":()=>p(()=>import("./cat-CkF-5Moc.js"),[]).then(e=>e.default),"../../assets/art/living/dog.webp":()=>p(()=>import("./dog-XsW5t_fN.js"),[]).then(e=>e.default),"../../assets/art/living/egg~cada-mouse.webp":()=>p(()=>import("./egg~cada-mouse-CahQlh-m.js"),[]).then(e=>e.default),"../../assets/art/living/egg~chloe-starlamp.webp":()=>p(()=>import("./egg~chloe-starlamp-pq_Iclzu.js"),[]).then(e=>e.default),"../../assets/art/living/egg~quinn-pup.webp":()=>p(()=>import("./egg~quinn-pup-BqdUFpbv.js"),[]).then(e=>e.default),"../../assets/art/living/egg~reagan-frame.webp":()=>p(()=>import("./egg~reagan-frame-BWp9N6ej.js"),[]).then(e=>e.default),"../../assets/art/living/egg~sloane-snail.webp":()=>p(()=>import("./egg~sloane-snail-DsDMZRR7.js"),[]).then(e=>e.default),"../../assets/art/living/fish.webp":()=>p(()=>import("./fish-Cs1FEzIZ.js"),[]).then(e=>e.default),"../../assets/art/living/floor-cushion.webp":()=>p(()=>import("./floor-cushion-D7ewX4dX.js"),[]).then(e=>e.default),"../../assets/art/living/flowers.webp":()=>p(()=>import("./flowers-CHLFwDXa.js"),[]).then(e=>e.default),"../../assets/art/living/kennel.webp":()=>p(()=>import("./kennel-iNvQ28eh.js"),[]).then(e=>e.default),"../../assets/art/living/pack~acorn-friend.webp":()=>p(()=>import("./pack~acorn-friend-Bm4Hk12h.js"),[]).then(e=>e.default),"../../assets/art/living/pack~aquarium.webp":()=>p(()=>import("./pack~aquarium-D0sUglTr.js"),[]).then(e=>e.default),"../../assets/art/living/pack~arc-floor-lamp.webp":()=>p(()=>import("./pack~arc-floor-lamp-7GCaGkDs.js"),[]).then(e=>e.default),"../../assets/art/living/pack~bean-bag.webp":()=>p(()=>Promise.resolve().then(()=>j9),void 0).then(e=>e.default),"../../assets/art/living/pack~bird-cage.webp":()=>p(()=>import("./pack~bird-cage-CLlPQlCF.js"),[]).then(e=>e.default),"../../assets/art/living/pack~blanket-basket.webp":()=>p(()=>import("./pack~blanket-basket-Clw-jcOi.js"),[]).then(e=>e.default),"../../assets/art/living/pack~box-stack.webp":()=>p(()=>import("./pack~box-stack-DV3Ljobv.js"),[]).then(e=>e.default),"../../assets/art/living/pack~brick-fireplace.webp":()=>p(()=>import("./pack~brick-fireplace-CU641OC1.js"),[]).then(e=>e.default),"../../assets/art/living/pack~building-blocks.webp":()=>p(()=>import("./pack~building-blocks-C0yT9TvM.js"),[]).then(e=>e.default),"../../assets/art/living/pack~bulletin-board.webp":()=>p(()=>import("./pack~bulletin-board-BCXiWqVp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cactus-buddy.webp":()=>p(()=>import("./pack~cactus-buddy-2_JfEHKl.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-cottage-aquarium.webp":()=>p(()=>import("./pack~cc-cottage-aquarium-C8NYhmrd.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-fairy-shelf.webp":()=>p(()=>import("./pack~cc-fairy-shelf-CnHOFSRs.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-flower-lamp.webp":()=>p(()=>import("./pack~cc-flower-lamp-wbPhnbQ_.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-clock.webp":()=>p(()=>import("./pack~cc-heart-clock-jr4MzVW9.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-pouf.webp":()=>p(()=>import("./pack~cc-heart-pouf-BPM9YsrB.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-rug.webp":()=>p(()=>import("./pack~cc-heart-rug-BVKJ0cQB.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-macrame-swing.webp":()=>p(()=>import("./pack~cc-macrame-swing-pWIX7Xk-.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-mushroom-stool.webp":()=>p(()=>import("./pack~cc-mushroom-stool-CMlvAjd6.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-petal-table.webp":()=>p(()=>import("./pack~cc-petal-table-7S1s7yzK.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-plant-wall.webp":()=>p(()=>import("./pack~cc-plant-wall-p6D9EEBb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-record-player.webp":()=>p(()=>import("./pack~cc-record-player-BRAifeEK.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-scallop-curtains.webp":()=>p(()=>import("./pack~cc-scallop-curtains-BeV7rdPo.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-scallop-loveseat.webp":()=>p(()=>import("./pack~cc-scallop-loveseat-_AoDnFXb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~checker-rug.webp":()=>p(()=>import("./pack~checker-rug-Cp2IkzoS.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cloud-sofa.webp":()=>p(()=>import("./pack~cloud-sofa-DyBmuzAg.js"),[]).then(e=>e.default),"../../assets/art/living/pack~coffee-table.webp":()=>p(()=>import("./pack~coffee-table-DPuXhspW.js"),[]).then(e=>e.default),"../../assets/art/living/pack~comfy-armchair.webp":()=>p(()=>import("./pack~comfy-armchair-CJDG30Cj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cream-sofa.webp":()=>p(()=>import("./pack~cream-sofa-Ez2miUnO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cubby-shelf.webp":()=>p(()=>import("./pack~cubby-shelf-BUMGU8Jh.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cube-shelf.webp":()=>p(()=>import("./pack~cube-shelf-D5D2Dw5S.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cute-speaker.webp":()=>p(()=>import("./pack~cute-speaker-jTqsaV2I.js"),[]).then(e=>e.default),"../../assets/art/living/pack~daisy-rug.webp":()=>p(()=>import("./pack~daisy-rug-BCUkj5ia.js"),[]).then(e=>e.default),"../../assets/art/living/pack~desk-lamp.webp":()=>p(()=>import("./pack~desk-lamp-DmCKofr2.js"),[]).then(e=>e.default),"../../assets/art/living/pack~fiddle-leaf-fig.webp":()=>p(()=>import("./pack~fiddle-leaf-fig-D7FML9mx.js"),[]).then(e=>e.default),"../../assets/art/living/pack~fireplace.webp":()=>p(()=>import("./pack~fireplace-DYp6BN4M.js"),[]).then(e=>e.default),"../../assets/art/living/pack~flower-lamp.webp":()=>p(()=>import("./pack~flower-lamp-kPf9KBh-.js"),[]).then(e=>e.default),"../../assets/art/living/pack~glass-cabinet.webp":()=>p(()=>import("./pack~glass-cabinet-B9JOaE-O.js"),[]).then(e=>e.default),"../../assets/art/living/pack~globe.webp":()=>p(()=>import("./pack~globe-Df4aJX14.js"),[]).then(e=>e.default),"../../assets/art/living/pack~hanging-lantern.webp":()=>p(()=>import("./pack~hanging-lantern-CSb5_y-t.js"),[]).then(e=>e.default),"../../assets/art/living/pack~hanging-planter.webp":()=>p(()=>import("./pack~hanging-planter-BXNCa3po.js"),[]).then(e=>e.default),"../../assets/art/living/pack~heart-light.webp":()=>p(()=>import("./pack~heart-light-BMZQFtcT.js"),[]).then(e=>e.default),"../../assets/art/living/pack~knit-cushion.webp":()=>p(()=>import("./pack~knit-cushion-DzpDb6hm.js"),[]).then(e=>e.default),"../../assets/art/living/pack~ladder-shelf.webp":()=>p(()=>import("./pack~ladder-shelf-CLOcbyxp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~landscape-art.webp":()=>p(()=>import("./pack~landscape-art-DiJEigPf.js"),[]).then(e=>e.default),"../../assets/art/living/pack~lattice-bench.webp":()=>p(()=>import("./pack~lattice-bench-0G6hKZYj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~leaf-wreath.webp":()=>p(()=>import("./pack~leaf-wreath-WJ1hv4SR.js"),[]).then(e=>e.default),"../../assets/art/living/pack~monstera-plant.webp":()=>p(()=>import("./pack~monstera-plant-BE84EAw8.js"),[]).then(e=>e.default),"../../assets/art/living/pack~moving-box.webp":()=>p(()=>import("./pack~moving-box-CAe2Xeia.js"),[]).then(e=>e.default),"../../assets/art/living/pack~piano.webp":()=>p(()=>import("./pack~piano-C2g19n4Y.js"),[]).then(e=>e.default),"../../assets/art/living/pack~popcorn.webp":()=>p(()=>import("./pack~popcorn-B6n0yaX2.js"),[]).then(e=>e.default),"../../assets/art/living/pack~pothos-plant.webp":()=>p(()=>import("./pack~pothos-plant-CTHDCuIc.js"),[]).then(e=>e.default),"../../assets/art/living/pack~pouf.webp":()=>p(()=>import("./pack~pouf-BJ-teA6I.js"),[]).then(e=>e.default),"../../assets/art/living/pack~puffy-stool.webp":()=>p(()=>import("./pack~puffy-stool-D38tkWnm.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rainbow-rug.webp":()=>p(()=>import("./pack~rainbow-rug-DUV6gUsN.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rainbow-wall-art.webp":()=>p(()=>import("./pack~rainbow-wall-art--boV5icC.js"),[]).then(e=>e.default),"../../assets/art/living/pack~retro-radio.webp":()=>p(()=>import("./pack~retro-radio-CDLK9pHp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~ring-light.webp":()=>p(()=>import("./pack~ring-light-C3E9VDAl.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rocking-chair.webp":()=>p(()=>import("./pack~rocking-chair-B2p2ReQc.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rocking-horse.webp":()=>p(()=>import("./pack~rocking-horse-CswTc134.js"),[]).then(e=>e.default),"../../assets/art/living/pack~round-rug.webp":()=>p(()=>import("./pack~round-rug-CHSVB2Aw.js"),[]).then(e=>e.default),"../../assets/art/living/pack~side-table-round.webp":()=>p(()=>import("./pack~side-table-round-CP96FSiO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~snake-plant.webp":()=>p(()=>import("./pack~snake-plant-DawlmINM.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sprout-pot.webp":()=>p(()=>import("./pack~sprout-pot-Dx8LI8dH.js"),[]).then(e=>e.default),"../../assets/art/living/pack~star-lamp.webp":()=>p(()=>import("./pack~star-lamp-s9PtqFmZ.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sticker-board.webp":()=>p(()=>import("./pack~sticker-board--TDZ7ozq.js"),[]).then(e=>e.default),"../../assets/art/living/pack~string-lights.webp":()=>p(()=>import("./pack~string-lights-HZXr5sUd.js"),[]).then(e=>e.default),"../../assets/art/living/pack~stripe-runner.webp":()=>p(()=>import("./pack~stripe-runner-B0fRj7Re.js"),[]).then(e=>e.default),"../../assets/art/living/pack~succulent-trio.webp":()=>p(()=>import("./pack~succulent-trio-M7abHPiA.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sunny-art.webp":()=>p(()=>import("./pack~sunny-art-D2_v9d4h.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sv-bean-bag.webp":()=>p(()=>Promise.resolve().then(()=>G9),void 0).then(e=>e.default),"../../assets/art/living/pack~sv-cloud-rug.webp":()=>p(()=>import("./pack~sv-cloud-rug-DBeaYhY1.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sv-wall-shelf.webp":()=>p(()=>import("./pack~sv-wall-shelf-CE0YAWvX.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tassel-rug.webp":()=>p(()=>import("./pack~tassel-rug-C3GgXPyZ.js"),[]).then(e=>e.default),"../../assets/art/living/pack~throw-pillow.webp":()=>p(()=>import("./pack~throw-pillow-BUguyBcj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~toy-car.webp":()=>p(()=>import("./pack~toy-car-DZ6BYQDO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~trailing-plant.webp":()=>p(()=>import("./pack~trailing-plant-BJ2rTgvE.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tulip-vase.webp":()=>p(()=>import("./pack~tulip-vase-CmyisqxG.js"),[]).then(e=>e.default),"../../assets/art/living/pack~turtle.webp":()=>p(()=>import("./pack~turtle-FaBzuoqb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tv-stand.webp":()=>p(()=>import("./pack~tv-stand-C8gC4UFW.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wall-clock.webp":()=>p(()=>import("./pack~wall-clock-D7PdTom6.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wall-shelf.webp":()=>p(()=>import("./pack~wall-shelf-C1lRJ7GC.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wavy-floor-lamp.webp":()=>p(()=>import("./pack~wavy-floor-lamp-BL00MuGA.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-arc-floor-lamp.webp":()=>p(()=>import("./pack~wh-arc-floor-lamp-B6QVftZN.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-book-stack.webp":()=>p(()=>import("./pack~wh-book-stack-Dwcz23qo.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-fiddle-leaf-fig.webp":()=>p(()=>import("./pack~wh-fiddle-leaf-fig-COFk3BJw.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-pendant-lamp.webp":()=>p(()=>import("./pack~wh-pendant-lamp-Dd4mFEDS.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-snake-plant.webp":()=>p(()=>import("./pack~wh-snake-plant-D-C6ZJKO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-string-lights.webp":()=>p(()=>import("./pack~wh-string-lights-D0MBhT1M.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-armchair.webp":()=>p(()=>import("./pack~wood-armchair-DHvcj8Mx.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-bookshelf.webp":()=>p(()=>import("./pack~wood-bookshelf-sxaV4CyF.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-coffee-table.webp":()=>p(()=>import("./pack~wood-coffee-table-CrSb-1Xv.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-stool.webp":()=>p(()=>import("./pack~wood-stool-JjUX_8W2.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-bouquet.webp":()=>p(()=>import("./ranch-bouquet-LHbKbTej.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-carrot.webp":()=>p(()=>import("./ranch-carrot-cyry77wX.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-egg.webp":()=>p(()=>import("./ranch-egg-CYsNXUKY.js"),[]).then(e=>e.default),"../../assets/art/living/tree.webp":()=>p(()=>import("./tree-CXYySnAy.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby-bottle.webp":()=>p(()=>import("./baby-bottle-40H4PprS.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby-shelf.webp":()=>p(()=>import("./baby-shelf--dhe-OtF.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby.webp":()=>p(()=>import("./baby-Cjy_lAi1.js"),[]).then(e=>e.default),"../../assets/art/nursery/bassinet.webp":()=>p(()=>import("./bassinet-D1E3rjcm.js"),[]).then(e=>e.default),"../../assets/art/nursery/blocks.webp":()=>p(()=>import("./blocks-CtsB78Ug.js"),[]).then(e=>e.default),"../../assets/art/nursery/bunny-plush.webp":()=>p(()=>import("./bunny-plush-9_hTWSJ0.js"),[]).then(e=>e.default),"../../assets/art/nursery/changing-table.webp":()=>p(()=>import("./changing-table-DKyI_wrV.js"),[]).then(e=>e.default),"../../assets/art/nursery/cloud-rug.webp":()=>p(()=>import("./cloud-rug-BvUUbOnx.js"),[]).then(e=>e.default),"../../assets/art/nursery/crib-mobile.webp":()=>p(()=>import("./crib-mobile-BvlX6u0a.js"),[]).then(e=>e.default),"../../assets/art/nursery/crib.webp":()=>p(()=>import("./crib-Do3izZrw.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-cocoa.webp":()=>p(()=>import("./doll-cocoa-ypqLIm4M.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-honey.webp":()=>p(()=>import("./doll-honey-Dc51Fmwm.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-rose.webp":()=>p(()=>import("./doll-rose-DTSDlFkK.js"),[]).then(e=>e.default),"../../assets/art/nursery/moon-art.webp":()=>p(()=>import("./moon-art-DQbuFa-d.js"),[]).then(e=>e.default),"../../assets/art/nursery/music-box.webp":()=>p(()=>import("./music-box-DKDLmINu.js"),[]).then(e=>e.default),"../../assets/art/nursery/night-light.webp":()=>p(()=>import("./night-light-lryf6NaK.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-curtains.webp":()=>p(()=>import("./nursery-curtains-Ds4ZTC1C.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-dresser.webp":()=>p(()=>import("./nursery-dresser-DbmVYgde.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-lamp.webp":()=>p(()=>import("./nursery-lamp-pqbkf92r.js"),[]).then(e=>e.default),"../../assets/art/nursery/play-mat.webp":()=>p(()=>import("./play-mat-fGBMoW0r.js"),[]).then(e=>e.default),"../../assets/art/nursery/rattle.webp":()=>p(()=>import("./rattle-EzXp43O4.js"),[]).then(e=>e.default),"../../assets/art/nursery/rocker.webp":()=>p(()=>import("./rocker-BieX4wIy.js"),[]).then(e=>e.default),"../../assets/art/nursery/rocking-horse.webp":()=>p(()=>import("./rocking-horse-BK9_A5ep.js"),[]).then(e=>e.default),"../../assets/art/nursery/stacking-rings.webp":()=>p(()=>import("./stacking-rings-8Z2fYLIi.js"),[]).then(e=>e.default),"../../assets/art/nursery/toy-bin.webp":()=>p(()=>import("./toy-bin-CuORRSkX.js"),[]).then(e=>e.default),"../../assets/art/salon/hairdryer.webp":()=>p(()=>import("./hairdryer-BK3-NMh8.js"),[]).then(e=>e.default),"../../assets/art/salon/perfume.webp":()=>p(()=>import("./perfume-CCbV6-cE.js"),[]).then(e=>e.default),"../../assets/art/salon/polish.webp":()=>p(()=>import("./polish-Ch0EUf5y.js"),[]).then(e=>e.default),"../../assets/art/salon/ribbon-tray.webp":()=>p(()=>import("./ribbon-tray-DBUlSLAS.js"),[]).then(e=>e.default),"../../assets/art/salon/stool.webp":()=>p(()=>import("./stool-SBbn3Fq_.js"),[]).then(e=>e.default),"../../assets/art/salon/vanity.webp":()=>p(()=>import("./vanity-COm_EF9W.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~arched-mirror.webp":()=>p(()=>import("./pack~arched-mirror-FzcrWxa4.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~boba-cup.webp":()=>p(()=>import("./pack~boba-cup-DO0lCjCc.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~mini-fridge.webp":()=>p(()=>import("./pack~mini-fridge-DxF_-Si1.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~apple-tree.webp":()=>p(()=>import("./pack~apple-tree-BO7hFW66.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~cozy-mug.webp":()=>p(()=>import("./pack~cozy-mug-CL5TNVre.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~fire-pit.webp":()=>p(()=>import("./pack~fire-pit-CbfQWRzg.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~mini-greenhouse.webp":()=>p(()=>import("./pack~mini-greenhouse-Cgb6BHcc.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~picnic-basket.webp":()=>p(()=>import("./pack~picnic-basket-BZmSi61Z.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~sale-sign.webp":()=>p(()=>import("./pack~sale-sign-CNZEWdis.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~wh-kitchen-counter.webp":()=>p(()=>import("./pack~wh-kitchen-counter-BK3WsTw8.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~wh-teapot.webp":()=>p(()=>import("./pack~wh-teapot-C2xpf3Kz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-bauble-garland.webp":()=>p(()=>import("./pack~wc-bauble-garland-Bsv6snBW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-berry-wreath.webp":()=>p(()=>import("./pack~wc-berry-wreath-DwqWJGm0.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-birch-basket.webp":()=>p(()=>import("./pack~wc-birch-basket-Ck1MjTPW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cabin-picture.webp":()=>p(()=>import("./pack~wc-cabin-picture-Bo_qKFlZ.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-candle-trio.webp":()=>p(()=>import("./pack~wc-candle-trio-33RcvYK5.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cane-lamp.webp":()=>p(()=>import("./pack~wc-cane-lamp-BD2V2gLm.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cinnamon-tray.webp":()=>p(()=>import("./pack~wc-cinnamon-tray-Cy2cPyEY.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-cart.webp":()=>p(()=>import("./pack~wc-cocoa-cart-BwlPCBQR.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-mug.webp":()=>p(()=>import("./pack~wc-cocoa-mug-Cpad5gyz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-pot.webp":()=>p(()=>import("./pack~wc-cocoa-pot-CqjSzuIA.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cookie-oven.webp":()=>p(()=>import("./pack~wc-cookie-oven-AeTBKAqH.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cookie-plate.webp":()=>p(()=>import("./pack~wc-cookie-plate-Db4_27lp.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-frost-bookcase.webp":()=>p(()=>import("./pack~wc-frost-bookcase-ChH_Zc5-.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-frosted-pine.webp":()=>p(()=>import("./pack~wc-frosted-pine-BaL421Eq.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-fur-bench.webp":()=>p(()=>import("./pack~wc-fur-bench-BHy7RvLc.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-gingerbread-village.webp":()=>p(()=>import("./pack~wc-gingerbread-village-CXGNXY4G.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-gingerbread.webp":()=>p(()=>import("./pack~wc-gingerbread-BH26TMqz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-globe-lamp.webp":()=>p(()=>import("./pack~wc-globe-lamp-FQWUqV9q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-holiday-tree.webp":()=>p(()=>import("./pack~wc-holiday-tree-Dc9RLa8q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-holly.webp":()=>p(()=>import("./pack~wc-holly-Ddsa-Msy.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-ice-skates.webp":()=>p(()=>import("./pack~wc-ice-skates-CerfMu-3.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-ice-wardrobe.webp":()=>p(()=>import("./pack~wc-ice-wardrobe-Dk8v_MKI.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-knit-armchair.webp":()=>p(()=>import("./pack~wc-knit-armchair-p4nAzHXW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-lantern.webp":()=>p(()=>import("./pack~wc-lantern-rRWK8g8l.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-log-bench.webp":()=>p(()=>import("./pack~wc-log-bench-Djm76jnh.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-marshmallow-jar.webp":()=>p(()=>import("./pack~wc-marshmallow-jar-BiG_u42k.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mitten-line.webp":()=>p(()=>import("./pack~wc-mitten-line-BbhTynIV.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mitten-ottoman.webp":()=>p(()=>import("./pack~wc-mitten-ottoman-q05Rsc6B.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mug-shelf.webp":()=>p(()=>import("./pack~wc-mug-shelf-CeUbCPsi.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-nutcracker.webp":()=>p(()=>import("./pack~wc-nutcracker-DlEeuUgj.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-penguin-chair.webp":()=>p(()=>import("./pack~wc-penguin-chair-ARRfWJYR.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-penguin-plush.webp":()=>p(()=>import("./pack~wc-penguin-plush-w9LiHlOM.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-peppermint-counter.webp":()=>p(()=>import("./pack~wc-peppermint-counter-Cq5SRRi_.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-peppermint-rug.webp":()=>p(()=>import("./pack~wc-peppermint-rug-DjPM1BL2.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pinecone-garland.webp":()=>p(()=>import("./pack~wc-pinecone-garland-DV4Ijs5E.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pinecone-table.webp":()=>p(()=>import("./pack~wc-pinecone-table-CzULQj_N.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-plaid-bed.webp":()=>p(()=>import("./pack~wc-plaid-bed-ZVDIbe1Y.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-plaid-sofa.webp":()=>p(()=>import("./pack~wc-plaid-sofa-BaoM0h7H.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-poinsettia.webp":()=>p(()=>import("./pack~wc-poinsettia-DNdNw7QZ.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-polar-plush.webp":()=>p(()=>import("./pack~wc-polar-plush-Cz2NxU-X.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pom-rug.webp":()=>p(()=>import("./pack~wc-pom-rug-Zyeq7bwG.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-present-stack.webp":()=>p(()=>import("./pack~wc-present-stack-B09Rx_MO.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-reindeer.webp":()=>p(()=>import("./pack~wc-reindeer-DTWaMJXV.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sled-table.webp":()=>p(()=>import("./pack~wc-sled-table-BNH48Wur.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sleigh-planter.webp":()=>p(()=>import("./pack~wc-sleigh-planter-B3DNwK0i.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-globe.webp":()=>p(()=>import("./pack~wc-snow-globe-C9bft1_W.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-mobile.webp":()=>p(()=>import("./pack~wc-snow-mobile-JM0Q-i3v.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-nightstand.webp":()=>p(()=>import("./pack~wc-snow-nightstand-Bqay9NoW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-window.webp":()=>p(()=>import("./pack~wc-snow-window-DCwNoisx.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snowman.webp":()=>p(()=>import("./pack~wc-snowman-Z8FnDuXK.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snowshoes.webp":()=>p(()=>import("./pack~wc-snowshoes-Bux5zjz7.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sock-hamper.webp":()=>p(()=>import("./pack~wc-sock-hamper-IDMi8Oc3.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-star-topper.webp":()=>p(()=>import("./pack~wc-star-topper-CxhOrJOb.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-stocking-row.webp":()=>p(()=>import("./pack~wc-stocking-row-DRCxX9NW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-stone-hearth.webp":()=>p(()=>import("./pack~wc-stone-hearth-BIaBCxMx.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-twinkle-lamp.webp":()=>p(()=>import("./pack~wc-twinkle-lamp-3aXfb0Du.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-twinkle-string.webp":()=>p(()=>import("./pack~wc-twinkle-string-D1fw8i7q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-window-seat.webp":()=>p(()=>import("./pack~wc-window-seat-bNQT817S.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-woodstove.webp":()=>p(()=>import("./pack~wc-woodstove-BcUTK7y-.js"),[]).then(e=>e.default)});function Fc(e){const t=e.split("/").pop()||"";if(t.length<6||t.slice(-5).toLowerCase()!==".webp")return null;const n=decodeURIComponent(t.slice(0,-5)).replace(/~/g,":");return!n||n.startsWith("_")?null:n}const $h=new Set;for(const e in za){const t=Fc(e);t&&$h.add(t)}function v2(e){return $h.has(e)}const rl=new Map;function _2(e){for(const t in za)if(Fc(t)===e)return za[t]}function $2(e){const t=rl.get(e);if(t)return t;const n=_2(e);if(!n)return Promise.resolve(null);const s=n().then(o=>(b2(e,o),e)).catch(()=>(rl.delete(e),null));return rl.set(e,s),s}function Rr(e){const t=[...new Set(e)];return Promise.all(t.map($2)).then(n=>n.filter(s=>s!==null))}function x2(){const e=[];for(const t in za){const n=Fc(t);n&&e.push(n)}return Rr(e)}function M2(e,t=[]){return w2(e)?Rr(t):Promise.resolve([])}const jc=Object.freeze(Object.defineProperty({__proto__:null,boot:M2,hasArt:v2,loadAllArt:x2,loadArtKinds:Rr},Symbol.toStringTag,{value:"Module"})),$e="#5a3d5c",ze=`stroke="${$e}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,Yi=[{body:"#ffd6e0",roof:"#ff7aa8",door:"#8fd3ff",trim:"#fff6e6"},{body:"#d9f2ff",roof:"#5aa9e6",door:"#ffd166",trim:"#ffffff"},{body:"#e3f9d9",roof:"#5cc985",door:"#ff9f68",trim:"#fffbe6"},{body:"#fff1b8",roof:"#ff9f43",door:"#c9a0dc",trim:"#ffffff"},{body:"#eadcff",roof:"#9b7bd8",door:"#80ed99",trim:"#fff6fb"},{body:"#ffe0c7",roof:"#e07a5f",door:"#5fb0d8",trim:"#fffaf0"},{body:"#d8f5ef",roof:"#2fb3a3",door:"#ff8fab",trim:"#ffffff"},{body:"#fde2f3",roof:"#e879c6",door:"#ffd166",trim:"#fff"}];function qa(e,t={}){const n=Yi[(e%Yi.length+Yi.length)%Yi.length],s=e%2===1,o=t.lit?"#fff3b0":"#cfe8ff",i=s?`<path d="M22 138 Q22 36 160 30 Q298 36 298 138 Z" fill="${n.roof}" ${ze}/><path d="M60 110 Q70 60 120 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`:`<path d="M14 140 L160 26 L306 140 Z" fill="${n.roof}" ${ze}/><path d="M70 110 L140 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`;return`<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="294" rx="150" ry="8" fill="#000" opacity=".12"/>
  <rect x="${s?232:220}" y="${s?36:44}" width="30" height="56" rx="6" fill="${n.trim}" ${ze}/>
  <rect x="44" y="124" width="232" height="168" rx="20" fill="${n.body}" ${ze}/>
  ${i}
  <g class="houseWin" fill="${o}"><circle cx="160" cy="${s?92:98}" r="18" ${ze}/><rect x="62" y="160" width="62" height="58" rx="18" ${ze}/><rect x="196" y="160" width="62" height="58" rx="18" ${ze}/></g>
  <path d="M160 ${s?74:80} V${s?110:116} M142 ${s?92:98} H178" ${ze}/>
  <path d="M93 160 V218 M62 189 H124" ${ze}/><path d="M227 160 V218 M196 189 H258" ${ze}/>
  <rect x="56" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${ze}/><rect x="190" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${ze}/>
  <circle cx="72" cy="212" r="7" fill="#ff8fab" ${ze}/><circle cx="92" cy="208" r="7" fill="#ffd166" ${ze}/><circle cx="112" cy="212" r="7" fill="#ff8fab" ${ze}/>
  <circle cx="208" cy="212" r="7" fill="#c9a0dc" ${ze}/><circle cx="228" cy="208" r="7" fill="#80ed99" ${ze}/><circle cx="248" cy="212" r="7" fill="#c9a0dc" ${ze}/>
  <path d="M132 292 V226 Q132 196 160 196 Q188 196 188 226 V292 Z" fill="${n.door}" ${ze}/>
  <circle cx="176" cy="250" r="5" fill="${$e}"/><path d="M146 222 Q160 212 174 222" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>
  <rect x="118" y="286" width="84" height="10" rx="5" fill="${n.trim}" ${ze}/>
</svg>`}const Pt={street:`<svg viewBox="0 0 48 48"><circle cx="16" cy="15" r="7" fill="#ffd166" stroke="${$e}" stroke-width="3"/><circle cx="32" cy="15" r="7" fill="#ff8fab" stroke="${$e}" stroke-width="3"/><circle cx="13.5" cy="14.5" r="1.2" fill="${$e}"/><circle cx="18.5" cy="14.5" r="1.2" fill="${$e}"/><circle cx="29.5" cy="14.5" r="1.2" fill="${$e}"/><circle cx="34.5" cy="14.5" r="1.2" fill="${$e}"/><path d="M13 18 q3 2.2 6 0 M29 18 q3 2.2 6 0" fill="none" stroke="${$e}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 40 Q16 28 24 33 Q32 38 40 28" fill="none" stroke="#5cc985" stroke-width="4" stroke-linecap="round"/><circle cx="16" cy="36" r="2.2" fill="#fff" stroke="${$e}" stroke-width="1.5"/><circle cx="32" cy="32" r="2.2" fill="#fff" stroke="${$e}" stroke-width="1.5"/></svg>`,home:`<svg viewBox="0 0 48 48"><path d="M8 22 L24 8 L40 22 V40 H8 Z" fill="#ffd166" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 V28 H28 V40" fill="#fff" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="20" r="2.4" fill="${$e}"/></svg>`,lockOn:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q33 7 33 16 V22" fill="none" stroke="${$e}" stroke-width="4"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#ffd166" stroke="${$e}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${$e}"/></svg>`,lockOff:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q31 7 32.5 13" fill="none" stroke="${$e}" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#b6f0a8" stroke="${$e}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${$e}"/></svg>`,chat:`<svg viewBox="0 0 48 48"><path d="M8 12 Q8 6 14 6 H34 Q40 6 40 12 V26 Q40 32 34 32 H22 L13 40 V32 Q8 32 8 26 Z" fill="#fff3b0" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><circle cx="17" cy="19" r="2.5" fill="${$e}"/><circle cx="24" cy="19" r="2.5" fill="${$e}"/><circle cx="31" cy="19" r="2.5" fill="${$e}"/></svg>`,shield:`<svg viewBox="0 0 48 48"><path d="M24 5 L39 11 V23 Q39 36 24 43 Q9 36 9 23 V11 Z" fill="#c9a0dc" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><path d="M17 24 L22 29 L31 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,solo:`<svg viewBox="0 0 48 48"><path d="M8 24 L24 9 L40 24 V41 H8 Z" fill="#ffd166" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="28" width="10" height="13" rx="4" fill="#fff" stroke="${$e}" stroke-width="2.5"/><path d="M33 7 l2 4 4 .5 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.5z" fill="#ff8fab" stroke="${$e}" stroke-width="1.5"/></svg>`};function N(e,t=2600){const n=document.createElement("div");n.className="toast",n.textContent=e,(document.getElementById("toastLane")??document.body).appendChild(n),setTimeout(()=>n.classList.add("out"),t),setTimeout(()=>n.remove(),t+400)}function xh(){return new Promise(e=>{let t=0,n=0,s="",o=0;const i=document.createElement("div");i.className="sheet adult",i.innerHTML='<div class="card adultCard"></div>',document.body.appendChild(i);const a=i.firstElementChild,r=()=>{t=6+Math.floor(Math.random()*4),n=3+Math.floor(Math.random()*7),s="",l()},l=()=>{a.innerHTML=`<button class="close" data-k="x">✕</button><h2>Grown-ups only</h2><p class="q" data-q="${t*n}">What is ${t} × ${n}?</p>
        <div class="ans">${s||"&nbsp;"}</div>
        <div class="pad">${[1,2,3,4,5,6,7,8,9,"⌫",0,"OK"].map(d=>`<button data-k="${d}">${d}</button>`).join("")}</div>`},c=d=>{i.remove(),e(d)};a.addEventListener("click",d=>{const f=d.target.closest("[data-k]")?.dataset.k;if(f){if(f==="x")return c(!1);if(f==="⌫")s=s.slice(0,-1);else if(f==="OK"){if(+s===t*n)return c(!0);if(++o>=3)return c(!1);a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400),r();return}else s.length<3&&(s+=f);l()}}),i.addEventListener("click",d=>{d.target===i&&c(!1)}),r()})}let vn=null,Gc=!0;const L2=e=>{Gc=e};function he(e,t,n="sine",s=0,o=.15){if(Gc)try{vn??=new(window.AudioContext||window.webkitAudioContext),vn.state==="suspended"&&vn.resume().catch(()=>{});const i=vn.createOscillator(),a=vn.createGain(),r=vn.currentTime,l=Math.max(40,e*(.94+Math.random()*.12));i.type=n,i.frequency.setValueAtTime(l,r),s&&i.frequency.exponentialRampToValueAtTime(Math.max(40,l*s),r+t);const c=Math.min(.02,Math.max(.008,t*.22));if(a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(Math.max(2e-4,o),r+c),a.gain.exponentialRampToValueAtTime(.001,r+Math.max(t,c+.02)),n==="square"||n==="sawtooth"){const d=vn.createBiquadFilter();d.type="lowpass",d.frequency.setValueAtTime(1400,r),d.Q.setValueAtTime(.7,r),i.connect(d).connect(a).connect(vn.destination)}else i.connect(a).connect(vn.destination);i.start(r),i.stop(r+t+.02)}catch{}}const P={pick:()=>he(520,.12,"sine",1.6),drop:()=>{he(380,.1,"triangle",.7),setTimeout(()=>he(620,.08,"sine"),60)},pop:()=>he(800,.15,"square",.3,.08),click:()=>he(660,.07,"triangle"),swish:()=>he(300,.25,"sine",2.5,.1),meow:()=>{he(700,.12,"triangle",1.3,.1),setTimeout(()=>he(900,.22,"triangle",.6,.1),110)},purr:()=>[0,90,180,270,360].forEach(e=>setTimeout(()=>he(70,.09,"sawtooth",1,.05),e)),woof:()=>{he(260,.09,"square",.6,.09),setTimeout(()=>he(220,.12,"square",.5,.09),130)},spin:()=>he(400,.35,"sine",2.2,.08),boing:()=>he(200,.3,"sine",3,.1),splash:()=>[0,50,110].forEach((e,t)=>setTimeout(()=>he(900-t*200,.12,"triangle",.4,.06),e)),moo:()=>{he(160,.5,"sawtooth",.8,.07),setTimeout(()=>he(140,.45,"sawtooth",.85,.06),380)},baa:()=>[0,90,180].forEach(e=>setTimeout(()=>he(420,.1,"sawtooth",.95,.05),e)),bleat:()=>[0,70,140,210].forEach(e=>setTimeout(()=>he(520,.07,"square",1.05,.04),e)),oink:()=>{he(300,.12,"square",.6,.07),setTimeout(()=>he(330,.12,"square",.55,.07),160)},peep:()=>[0,120,240].forEach((e,t)=>setTimeout(()=>he(1800+t*150,.07,"sine",1.2,.08),e)),squeak:()=>he(1400,.1,"sine",1.5,.08),neigh:()=>{he(700,.5,"sawtooth",.6,.05),[0,60,120,180,240].forEach(e=>setTimeout(()=>he(620-e,.06,"triangle",1,.04),300+e))},honk:()=>{he(330,.18,"square",1,.07),setTimeout(()=>he(330,.25,"square",1,.07),230)},munch:()=>[0,110,220,330].forEach(e=>setTimeout(()=>he(180+Math.random()*60,.05,"square",.6,.05),e)),cluck:()=>[0,100,180].forEach((e,t)=>setTimeout(()=>he(600+t*80,.06,"square",.8,.05),e)),plant:()=>{he(260,.1,"triangle",.6),setTimeout(()=>he(520,.1,"sine"),90)},water:()=>[0,60,120,180,240].forEach((e,t)=>setTimeout(()=>he(1200-t*120,.08,"sine",.7,.05),e)),pickup:()=>[660,880,990].forEach((e,t)=>setTimeout(()=>he(e,.1,"triangle"),t*60)),sparkle:()=>[880,1100,1320].forEach((e,t)=>setTimeout(()=>he(e,.12),t*70))},$f=new Map;function E2(e,t){const n=(e?"s":"o")+(t?"f":"n"),s=$f.get(n);if(s)return s;const a=`<svg viewBox="0 0 200 260" aria-hidden="true">
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
  </svg>`;return $f.set(n,a),a}const ri="#5a3d5c";function Br(e){return e&&/^#[0-9a-fA-F]{6}$/.test(e)?e.toLowerCase():"#f1c27d"}const Ki={x:60,y:118,w:56,h:40};function C2(e,t,n){return n==="lie"&&e==="over"?null:t&&n==="lie"?{d:"M72 172 C36 200 40 228 88 220",sleeve:"M72 172 C52 186 44 196 42 204",hx:88,hy:220}:t&&n==="sit"?e==="under"?{d:"M72 172 C40 190 46 220 108 228",sleeve:"M72 172 C56 178 46 184 42 188",hx:108,hy:228}:{d:"M128 172 C154 192 150 214 118 208",sleeve:"M128 172 C142 180 148 186 150 190",hx:118,hy:208}:t?e==="under"?{d:"M72 172 C40 196 48 222 112 214",sleeve:"M72 172 C56 178 46 184 42 188",hx:112,hy:214}:{d:"M128 172 C158 180 154 200 124 196",sleeve:"M128 172 C144 178 150 184 154 188",hx:124,hy:196}:n==="lie"?{d:"M22 84 C10 112 14 136 46 130",sleeve:"",hx:46,hy:130}:e==="under"?{d:"M22 84 C14 104 12 128 44 130",sleeve:"",hx:44,hy:130}:{d:"M78 84 C90 98 86 118 64 114",sleeve:"",hx:64,hy:114}}function S2(e,t,n){const s=`M${e-8} ${t-1} Q${e-9} ${t-11} ${e} ${t-11} Q${e+9} ${t-11} ${e+9} ${t} Q${e+9} ${t+9} ${e} ${t+10} Q${e-9} ${t+9} ${e-8} ${t-1} Z`,o=`<ellipse cx="${e+8}" cy="${t-2}" rx="3.2" ry="5" fill="${n}" stroke="${ri}" stroke-width="3.4" transform="rotate(-24 ${e+8} ${t-2})"/>`;return`<path class="cradle-hand" data-cx="${e}" data-cy="${t}" d="${s}" fill="${n}" stroke="${ri}" stroke-width="3.9"/>${o}`}function Ii(e,t,n,s,o){const i=C2(e,t,s);if(!i)return"";const a=Br(n),r=o&&/^#[0-9a-fA-F]{6}$/.test(o)?o.toLowerCase():"",l='fill="none" stroke-linecap="round" stroke-linejoin="round"',c=t?16:12,d=t?20.2:15.5;let f=`<path d="${i.d}" ${l} stroke="${ri}" stroke-width="${d}"/><path d="${i.d}" ${l} stroke="${a}" stroke-width="${c}"/>`;t&&i.sleeve&&r&&(f+=`<path d="${i.sleeve}" ${l} stroke="${ri}" stroke-width="29"/><path d="${i.sleeve}" ${l} stroke="${r}" stroke-width="22"/>`);const h=t?S2(i.hx,i.hy,a):`<circle class="cradle-hand" data-cx="${i.hx}" data-cy="${i.hy}" cx="${i.hx}" cy="${i.hy}" r="7" fill="${a}" stroke="${ri}" stroke-width="3.5"/>`;return`<g class="arm cradle">${f}${h}</g>`}const Xi=110,Wo=148,xf=80,Mf=57,P2=60,T2=133,R2=42,B2=30,A2=60,D2=129,Ji=["feed","burp","change","rock"],ll=["Bean","Pip","Mochi","Bunny","Dot","Sunny"];function I2(e){let t=null,n=null,s=null,o=!1,i=Number.NaN,a=0,r=0,l=!1,c=!1;const d=typeof navigator<"u"&&!!navigator.webdriver;function f(B,I,G,V,Q){B.style.left=(I-V/2)/Rt*100+"%",B.style.top=(G-Q)/Pn*100+"%",B.style.width=V/Rt*100+"%",B.style.height=Q/Pn*100+"%"}function h(B){const I=B.scale&&B.scale>0?B.scale:1,G=B.pose==="sit"||B.pose==="lie"?B.pose:null,V=B.chibi&&B.pose!=="sit"&&B.pose!=="lie",Q=V?Ki.x:B.chibi?A2:P2,Y=V?Ki.y:B.chibi?D2:T2,pe=V?Ki.w:B.chibi?R2:xf,Le=V?Ki.h:B.chibi?B2:Mf,ye=dm(Q,Y,G,!!B.lieFlip,I),We=G==="lie"?ye.x:B.flip?-ye.x:ye.x,O=pe*I,W=Le*I;return{x:B.x+We,y:B.y+ye.y+W/2,w:O,h:W}}function g(B,I){let G=null,V=0;for(let Q=0;Q<Ji.length;Q++){const Y=Ji[Q],pe=B.at?.[Y]??0;pe>0&&I-pe>=0&&I-pe<1100&&pe>=V&&(G=Y,V=pe)}return G}function m(B){if(B.mood<=2||!e.canSend()){window.clearTimeout(a),i=Number.NaN;return}if(i===B.since)return;window.clearTimeout(a),i=B.since;const I=Math.max(0,B.since+Ol-e.clock());a=window.setTimeout(()=>{i=Number.NaN;const G=e.get().baby;!G||G.mood<=2||!e.canSend()||e.dispatch({type:"baby/ease",now:e.clock()})},I)}function k(B,I){window.clearTimeout(r);let G=0;for(let V=0;V<Ji.length;V++){const Q=B.at?.[Ji[V]]??0;I-Q>=0&&I-Q<1100&&Q>G&&(G=Q)}G&&(r=window.setTimeout(()=>Ze(),Math.max(0,1100-(I-G))))}function $(B,I){if(typeof document.elementsFromPoint!="function")return null;const G=document.elementsFromPoint(B,I),V=e.get(),Q=V.rooms[V.currentRoom]?.items??[];for(let Y=0;Y<G.length;Y++){const pe=G[Y];if(!pe||typeof pe.closest!="function"||pe.closest(".baby, .babyCare, .babyMeet"))continue;const Le=pe.closest(".item");if(!Le)continue;const ye=Le.dataset.id||"";for(let We=0;We<Q.length;We++){const O=Q[We];if(O.id===ye&&(Ds(O.kind)||e.box(O)))return O}}return null}function y(B){B.addEventListener("pointerdown",I=>{if(I.button!==0)return;const G=e.get().baby;if(!G)return;if(I.preventDefault(),I.stopPropagation(),G.spot==="arms"&&G.holder&&G.holder!==e.holderId()&&e.holderHere(G.holder)){N("Someone is cuddling!");return}if(!e.editable()){e.locked();return}if(!e.canSend())return;const V=e.owner(),Q=V,Y=I.clientX,pe=I.clientY,Le=I.pointerId;let ye=!1;const We=W=>{if(W.pointerId!==Le||(Math.hypot(W.clientX-Y,W.clientY-pe)>6&&(ye=!0),!Q||!ye))return;o=!0;const Ke=e.toRoom(W.clientX,W.clientY);f(B,Ke.x,Ke.y,Xi,Wo)},O=W=>{if(W.pointerId!==Le)return;window.removeEventListener("pointermove",We),window.removeEventListener("pointerup",O),window.removeEventListener("pointercancel",O);const Ke=o&&ye&&Q;if(o=!1,W.type==="pointercancel"){Ze();return}if(Ke){const ht=document.elementFromPoint(W.clientX,W.clientY)?.closest(".tab[data-room]");if(ht&&ht.dataset.room){const Do=ht.dataset.room,Xu=e.toRoom(W.clientX,W.clientY),Nd=Lm(Xu.x,Rt);Do!==e.get().currentRoom&&e.dispatch({type:"room/switch",room:Do}),e.dispatch({type:"baby/place",room:Do,x:Nd.x,y:Nd.y,spot:"mat",bed:null,seat:null,now:e.clock()}),P.drop();return}const ms=e.toRoom(W.clientX,W.clientY),rn=$(W.clientX,W.clientY),el=rn?e.box(rn):null,ys=Mm({mode:e.play()?"play":"decorate",releaseX:Math.max(0,Math.min(Rt,ms.x)),releaseY:Math.max(0,Math.min(Pn,ms.y)),piece:el,occupied:e.occupied()});e.dispatch({type:"baby/place",room:e.get().currentRoom,x:ys.x,y:ys.y,spot:ys.spot,bed:ys.bed,seat:ys.seat,now:e.clock()}),P.drop();return}if(ye){Ze();return}const rt=e.get().baby;if(!rt)return;if(rt.spot==="arms"&&rt.holder===e.holderId()){const ht=e.toRoom(W.clientX,W.clientY);e.dispatch({type:"baby/hold",holder:null,room:e.get().currentRoom,x:Math.max(0,Math.min(Rt,ht.x)),y:Math.max(40,Math.min(Pn,ht.y)),now:e.clock()}),P.drop();return}const Ue=e.holderSpot(),Be=Ue?h(Ue):null,Ee=Be?Be.x:rt.x,pt=Be?Math.max(40,Be.y):rt.y;e.dispatch({type:"baby/hold",holder:e.holderId(),room:e.get().currentRoom,x:Ee,y:pt,now:e.clock()}),P.pick()};window.addEventListener("pointermove",We),window.addEventListener("pointerup",O),window.addEventListener("pointercancel",O)})}function u(){return t&&t.isConnected||(t=document.createElement("div"),t.className="baby",t.dataset.baby="1",t.innerHTML='<div class="hit"></div><div class="babySpin"><div class="babyRock"><div class="babyInner"></div></div></div><div class="babyZzz" hidden>z z z</div><div class="babyBurp" hidden><i></i></div>',e.layer.appendChild(t),y(t)),t}function w(B,I){const G=B.querySelector(".babyWord");G&&(G.textContent=um(I));const V=B.querySelectorAll(".babyBlossom"),Q=mm(I);for(let pe=0;pe<V.length;pe++)V[pe].classList.toggle("on",pe<Q);const Y=B.querySelector(".babyMeter");Y&&(Y.dataset.mood=String(I))}function _(B){const I=yh(B);if(!I){N("Try another name!");return}const G=e.get().baby;!G||G.name===I||(e.dispatch({type:"baby/name",name:I}),P.click())}function T(B){n=document.createElement("div"),n.className="babyCare",n.dataset.babyCare="1";const I=[];for(let Q=0;Q<5;Q++)I.push('<i class="babyBlossom"></i>');const G=[];for(let Q=0;Q<ll.length;Q++)G.push(`<button type="button" data-preset="${ll[Q]}">${ll[Q]}</button>`);n.innerHTML=`<p class="babyWord"></p><span class="babyMeter"><span class="babyBlossoms">${I.join("")}</span></span>
      <button type="button" data-care="feed">Bottle</button>
      <button type="button" data-care="burp">Burp</button>
      <button type="button" data-care="change">Diaper</button>
      <button type="button" data-care="rock">Rock</button>
      <button type="button" data-baby-name-open>Name</button>
      <div class="babyNames" hidden>
        <input type="text" maxlength="14" autocomplete="off" enterkeyhint="done" aria-label="Baby name" value="">
        ${G.join("")}
      </div>`,w(n,B.mood),n.addEventListener("pointerdown",Q=>Q.stopPropagation()),n.addEventListener("click",Q=>{const Y=Q.target,pe=Y.closest("[data-care]");if(pe&&pe.dataset.care){if(!e.editable()){e.locked();return}if(!e.canSend())return;const ye=pe.dataset.care;e.dispatch({type:"baby/care",care:ye,now:e.clock()}),ye==="rock"?P.purr():ye==="feed"?P.sparkle():P.click();return}if(Y.closest("[data-baby-name-open]")){if(!e.owner())return;c=!c;const ye=n?.querySelector(".babyNames");ye&&(ye.hidden=!c);const We=n?.querySelector("input");c&&We&&(We.value=e.get().baby?.name??"",We.focus());return}const Le=Y.closest("[data-preset]");if(Le&&e.owner()){_(Le.dataset.preset||"");return}}),n.querySelector("input")?.addEventListener("keydown",Q=>{Q.key==="Enter"&&(Q.preventDefault(),_(Q.target.value))}),e.stageWrap.appendChild(n)}function A(B,I){if(!e.play()){H();return}const G=n&&document.activeElement&&n.contains(document.activeElement);if((!n||!n.isConnected)&&T(B),!n)return;n.hidden=!1,w(n,B.mood);const V=n.querySelector("[data-baby-name-open]");V&&(V.hidden=!I);const Q=n.querySelector(".babyNames");Q&&(Q.hidden=!I||!c);const Y=n.querySelector("input");Y&&!G&&(Y.value=B.name),F()}function H(){c=!1,n&&(n.remove(),n=null),F()}function F(){const B=!!(n&&n.isConnected&&!n.hidden),I=document.body.classList.contains("baby-card");document.body.classList.toggle("baby-card",B),I!==B&&window.dispatchEvent(new Event("resize"))}function q(B){if(!B||d){s&&(s.remove(),s=null);return}if(s&&s.isConnected){s.hidden=!1;return}s=document.createElement("button"),s.type="button",s.className="babyMeet",s.textContent="Meet the baby",s.addEventListener("pointerdown",I=>I.stopPropagation()),s.addEventListener("click",()=>{if(!e.editable()){e.locked();return}!e.canSend()||e.get().baby||(e.dispatch({type:"baby/meet",now:e.clock()}),P.sparkle())}),e.stageWrap.appendChild(s)}function se(){const B=e.get().rooms.nursery?.items??[];for(let I=0;I<B.length;I++)if(Ds(B[I].kind)==="crib")return!0;return!1}function K(B,I){B.classList.remove("baby-lie","baby-lie-r","baby-cradle","cradle-lie","flipped");const G=e.get().currentRoom;if((I.spot==="crib"||I.spot==="bassinet")&&I.bed){const V=e.get().rooms[I.room]?.items.find(Y=>Y.id===I.bed)??null,Q=V?e.box(V):null;if(V&&Q){const Y=nh(V.kind,Q);f(B,Y.x,Y.y+Wo/2,Xi,Wo),B.style.zIndex=String(1e3+V.z+1),B.classList.add("baby-lie"),V.flip&&B.classList.add("baby-lie-r");return}}if(I.spot==="arms"){const V=I.holder?e.holderSpot(I.holder):null,Q=V?h(V):null,Y=Q?Q.x:I.x,pe=Q?Q.y:I.y,Le=Q?Q.w:xf,ye=Q?Q.h:Mf;f(B,Y,pe,Le,ye),B.style.zIndex=String(5e3+Math.round(V?V.y:I.y)+2),B.classList.add("baby-cradle"),B.style.setProperty("--spin-w",(ye/Le*100).toFixed(4)+"%"),B.style.setProperty("--spin-h",(Le/ye*100).toFixed(4)+"%"),V&&V.pose==="lie"&&B.classList.add("cradle-lie"),V&&(V.pose==="lie"?V.lieFlip:V.flip)&&B.classList.add("flipped");return}if(I.spot==="mat"&&I.seat){const V=e.seatAt(G,I.seat,I);f(B,V.x,V.y,Xi,Wo);const Q=e.get().rooms[G]?.items.find(Y=>Y.id===I.seat?.item);B.style.zIndex=String(1e3+(Q?.z??0)+1),I.seat.pose==="lie"&&(B.classList.add("baby-lie"),Q?.flip&&B.classList.add("baby-lie-r"));return}f(B,I.x,I.y,Xi,Wo),B.style.zIndex=String(5e3+Math.round(I.y))}function fe(B){if(B.spot!=="arms"||!B.holder)return!1;const I=e.get().characters.find(G=>G.id===B.holder);return!!I&&I.room!==B.room}function an(B){o||!fe(B)||!e.canSend()||!e.editable()||e.dispatch({type:"baby/hold",holder:null,room:B.room,x:B.x,y:Bi,now:e.clock()})}function Wt(B){if(o||fe(B)||B.spot!=="arms"||B.holder!==e.holderId()||!e.canSend()||!e.editable())return;const I=e.holderSpot();if(!I)return;const G=e.get().currentRoom;if(B.room===G)return;const V=h(I);e.dispatch({type:"baby/hold",holder:B.holder,room:G,x:V.x,y:Math.max(40,V.y),now:e.clock()})}function Ze(){const B=e.get(),I=B.baby,G=!!I&&I.spot==="arms"&&!!I.holder&&!!e.holderSpot(I.holder),V=!!I&&I.spot==="arms"&&I.holder===e.holderId()&&!!e.holderSpot(),Q=!!(I&&e.inHouse()&&(I.room===B.currentRoom||G||V));if(!I||!Q){t&&(t.remove(),t=null),o=!1,H(),window.clearTimeout(a),i=Number.NaN;const Ee=!d&&!I&&e.inHouse()&&e.owner()&&e.editable()&&e.canSend()&&B.currentRoom==="nursery"&&se();q(Ee);return}q(!1),vo()&&!Ws("baby")&&!l&&(l=!0,Rr(["baby"]).then(()=>Ze()));const Y=u(),pe=e.clock(),Le=g(I,pe),ye=Le==="rock",We=Le==="change",O=!ye&&!We&&vo()?Ws("baby"):"",W=Y.querySelector(".babyInner"),Ke=(O||"svg")+(ye?"s":"")+(We?"f":"");W&&Y.dataset.look!==Ke&&(W.innerHTML=O?`<img class="artimg" alt="" draggable="false" src="${O}">`:E2(ye,We),Y.dataset.look=Ke),Y.dataset.babySpot=I.spot,Y.dataset.babyMood=String(I.mood),Y.dataset.babyName=I.name,Y.classList.toggle("is-feed",Le==="feed"),Y.classList.toggle("is-burp",Le==="burp"),Y.classList.toggle("is-change",Le==="change"),Y.classList.toggle("is-rock",Le==="rock");const rt=Y.querySelector(".babyZzz"),Ue=Y.querySelector(".babyBurp"),Be=(I.spot==="crib"||I.spot==="bassinet")&&!Le;rt&&(rt.hidden=!Be),Ue&&(Ue.hidden=Le!=="burp"),o&&Y.isConnected||K(Y,I),A(I,e.owner()),m(I),k(I,pe),an(I),Wt(I)}return{render:Ze}}const H2={hip:0,head:3,armL:26,armR:-22,legL:-76,legR:76,legLLift:8,legRLift:8},O2={hip:0,head:-8,armL:18,armR:-12,legL:-4,legR:6,legLLift:0,legRLift:0};function Ar(e){return e==="sit"?H2:e==="lie"?O2:null}const Ne="#5a3d5c",oe=(e=4)=>`stroke="${Ne}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Yc=600,Kt=250,ws=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})">
  <rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${oe()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${oe()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${oe()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${oe()}/>
  <circle cx="-18" cy="-78" r="9" fill="#fff" opacity=".35"/></g>`,W2=(e,t,n)=>`<g transform="translate(${e} ${t})"><path d="M0 0 V-16" ${oe(3)}/>${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*6}" cy="${-20+Math.sin(s*Math.PI/180)*6}" r="5" fill="${n}" ${oe(2)}/>`).join("")}<circle cx="0" cy="-20" r="4" fill="#ffd166" ${oe(2)}/></g>`,Lf=e=>`<g transform="translate(${e} 0)">
  <rect x="-80" y="452" width="160" height="12" rx="6" fill="#ff9f68" ${oe()}/><rect x="-80" y="470" width="160" height="12" rx="6" fill="#ff9f68" ${oe()}/>
  <rect x="-70" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${oe(3)}/><rect x="60" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${oe(3)}/>
  <rect x="-86" y="490" width="172" height="14" rx="7" fill="#ffb385" ${oe()}/></g>`;function U2(){const e=Nc,t=Array.from({length:Math.floor((ct.x1-ct.x0+40)/34)},(n,s)=>`<path d="M${ct.x0-20+s*34} 470 V428 l8 -10 l8 10 V470 Z" fill="#fff6e6" ${oe(3)}/>`).join("");return`<svg class="parkScene" viewBox="0 0 ${e} ${Yc}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient>
  <pattern id="pkCheck" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><rect width="15" height="15" fill="#ff8fab"/><rect x="15" y="15" width="15" height="15" fill="#ff8fab"/></pattern></defs>
  <rect width="${e}" height="440" fill="url(#pkSky)"/>
  ${[180,900,1600,2300].map((n,s)=>`<g transform="translate(${n} ${70+s%2*30})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <circle cx="${e-220}" cy="90" r="46" fill="#ffe066" ${oe(4)}/>
  <path d="M-50 360 Q500 220 1100 340 T2300 330 T${e+100} 350 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#9fe0aa"/><path d="M0 410 H${e}" ${oe(4)}/>
  <path d="M0 560 Q700 520 1400 565 T${e} 545 V600 H0 Z" fill="#f6e3c3" opacity=".9"/>
  ${ws(260,390,.9)}${ws(720,380,1.05,"#4fbf7a")}${ws(1230,385,.8)}${ws(1640,380,1,"#4fbf7a")}${ws(1990,388,.85)}${ws(2380,380,.95)}${ws(2860,390,.9,"#4fbf7a")}
  ${[[300,470,"#ff8fab"],[690,455,"#c9a0dc"],[1210,470,"#ffd166"],[1960,450,"#8ecae6"],[2390,470,"#ff8fab"],[1580,590,"#c9a0dc"],[140,585,"#ffd166"]].map(([n,s,o])=>W2(+n,+s,String(o))).join("")}
  <!-- gate back to the street -->
  <g><rect x="40" y="300" width="22" height="200" rx="6" fill="#c99366" ${oe()}/><rect x="168" y="300" width="22" height="200" rx="6" fill="#c99366" ${oe()}/>
    <path d="M30 312 Q115 240 200 312" fill="none" stroke="${Ne}" stroke-width="16" stroke-linecap="round"/><path d="M30 312 Q115 240 200 312" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
    <rect x="62" y="252" width="106" height="36" rx="12" fill="#fff6e6" ${oe(3)}/><text x="115" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="${Ne}" font-family="Nunito, system-ui, sans-serif">PARK</text></g>
  <!-- swing set (seats are separate so they can swing) -->
  <g><path d="M350 ${Kt} L310 500 M350 ${Kt} L390 500 M650 ${Kt} L610 500 M650 ${Kt} L690 500" stroke="${Ne}" stroke-width="14" stroke-linecap="round"/>
    <path d="M350 ${Kt} L310 500 M350 ${Kt} L390 500 M650 ${Kt} L610 500 M650 ${Kt} L690 500" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/>
    <rect x="330" y="${Kt-10}" width="340" height="20" rx="10" fill="#ff8fab" ${oe()}/></g>
  <!-- slide -->
  <g><path d="M${ge.ladder-20} 560 V${ge.top.y} M${ge.ladder+30} 560 V${ge.top.y}" stroke="${Ne}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${ge.ladder-20} 560 V${ge.top.y} M${ge.ladder+30} 560 V${ge.top.y}" stroke="#c9a0dc" stroke-width="6" stroke-linecap="round"/>
    ${[380,420,460,500,540].map(n=>`<path d="M${ge.ladder-20} ${n} H${ge.ladder+30}" ${oe(5)}/>`).join("")}
    <rect x="${ge.ladder-30}" y="${ge.top.y-14}" width="100" height="18" rx="8" fill="#ffd166" ${oe()}/>
    <path d="M${ge.ladder+60} ${ge.top.y-10} C 1000 ${ge.top.y} 1010 520 ${ge.bottom.x+40} 548 L${ge.bottom.x+40} 572 C 990 548 975 ${ge.top.y+30} ${ge.ladder+60} ${ge.top.y+14} Z" fill="#ffd166" ${oe()}/>
    <path d="M${ge.ladder+70} ${ge.top.y-2} C 990 ${ge.top.y+8} 1000 525 ${ge.bottom.x+30} 552" fill="none" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/></g>
  <!-- splash pond -->
  <g class="pondArt"><ellipse cx="1420" cy="515" rx="185" ry="52" fill="#8ecae6" ${oe()}/><ellipse cx="1420" cy="510" rx="150" ry="36" fill="#b5e3f5"/>
    <ellipse cx="1340" cy="520" rx="24" ry="9" fill="#80ed99" ${oe(3)}/><ellipse cx="1500" cy="505" rx="20" ry="8" fill="#80ed99" ${oe(3)}/>
    <g transform="translate(1440 500)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ffd166" ${oe(3)}/><circle cx="16" cy="-12" r="9" fill="#ffd166" ${oe(3)}/><path d="M24 -12 l8 2 l-8 3 z" fill="#ff9f68" ${oe(2)}/><circle cx="18" cy="-14" r="1.8" fill="${Ne}"/></g></g>
  <!-- picnic blanket -->
  <g><path d="M1670 530 L1910 530 L1940 580 L1640 580 Z" fill="url(#pkCheck)" ${oe()}/>
    <g transform="translate(1915 520)"><rect x="-26" y="-20" width="52" height="32" rx="8" fill="#e6b88a" ${oe(3)}/><path d="M-18 -20 Q0 -46 18 -20" fill="none" ${oe(4)}/><circle cx="-10" cy="-24" r="7" fill="#ff6b6b" ${oe(2)}/></g></g>
  ${Lf(2065)}${Lf(2265)}
  <!-- dog area -->
  <g>${t}<path d="M${ct.x0-20} 440 H${ct.x1+20}" ${oe(3)}/>
    <g transform="translate(${ct.x0+10} 380)"><rect x="-6" y="0" width="12" height="70" fill="#c99366" ${oe(3)}/><rect x="-55" y="-34" width="110" height="38" rx="10" fill="#fff6e6" ${oe(3)}/>
      <text x="0" y="-8" text-anchor="middle" font-size="20" font-weight="900" fill="${Ne}" font-family="Nunito, system-ui, sans-serif">DOGS 🐾</text></g>
    <g transform="translate(${ct.x1-30} 470)"><path d="M-50 0 V-60 L0 -100 L50 -60 V0 Z" fill="#ff8fab" ${oe()}/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="${Ne}" stroke-width="14" stroke-linecap="round"/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="#c9a0dc" stroke-width="8" stroke-linecap="round"/><path d="M-20 0 V-30 a20 20 0 0 1 40 0 V0 Z" fill="#5a3d5c"/></g>
    <g transform="translate(${ct.x0+120} 500)"><rect x="-12" y="-30" width="24" height="34" rx="8" fill="#ff6b6b" ${oe(3)}/><rect x="-18" y="-18" width="36" height="8" rx="4" fill="#ff6b6b" ${oe(3)}/><circle cx="0" cy="-32" r="10" fill="#ff6b6b" ${oe(3)}/></g></g>
  </svg>`}const V2=`<svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M10 0 V222 M50 0 V222" stroke="${Ne}" stroke-width="4"/><rect x="0" y="216" width="60" height="14" rx="6" fill="#ff9f68" ${oe(3)}/></svg>`,Q2=`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffd166" ${oe(3)}/><path d="M6 16 Q20 24 34 16 M8 27 Q20 19 32 27" fill="none" stroke="#fff" stroke-width="3"/></svg>`,z2=`<svg viewBox="0 0 48 48"><rect x="20" y="28" width="8" height="14" rx="3" fill="#c99366" stroke="${Ne}" stroke-width="3"/><circle cx="24" cy="20" r="13" fill="#5cc985" stroke="${Ne}" stroke-width="3"/><circle cx="19" cy="16" r="3" fill="#fff" opacity=".5"/></svg>`,Mh=`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8" fill="#ff8fab" stroke="${Ne}" stroke-width="3"/><circle cx="13" cy="20" r="4.5" fill="#ff8fab" stroke="${Ne}" stroke-width="3"/><circle cx="20" cy="13" r="4.5" fill="#ff8fab" stroke="${Ne}" stroke-width="3"/><circle cx="28" cy="13" r="4.5" fill="#ff8fab" stroke="${Ne}" stroke-width="3"/><circle cx="35" cy="20" r="4.5" fill="#ff8fab" stroke="${Ne}" stroke-width="3"/></svg>`,q2=`<svg viewBox="0 0 48 48"><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="${Ne}" stroke-width="4" stroke-linecap="round"/><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="#ff9f68" stroke-width="2"/><path d="M16 40 V26 M24 40 V22 M32 40 V26" stroke="${Ne}" stroke-width="3" stroke-linecap="round"/></svg>`,vt="#5a3d5c",_e=`stroke="${vt}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,cl=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${vt}"/><circle cx="${t}" cy="${n}" r="3" fill="${vt}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,dl=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,ea='<ellipse cx="50" cy="97" rx="34" ry="3" fill="#000" opacity=".12"/>',Z2=`<svg viewBox="0 0 40 30"><path d="M4 30 V16 Q4 2 20 2 Q36 2 36 16 V30 Z" fill="#3b2a3d" ${_e}/><circle cx="14" cy="18" r="1.6" fill="#fff" opacity=".8"/><circle cx="22" cy="18" r="1.6" fill="#fff" opacity=".8"/></svg>`,N2=`<svg viewBox="0 0 48 30"><path d="M4 27 Q10 22 22 23 L42 23 Q46 27 42 28 H6 Z" fill="#cdeccf" ${_e}/><circle cx="26" cy="15" r="11" fill="#ffb3c6" ${_e}/><path d="M26 15 m-5 0 a5 5 0 1 1 5 5" fill="none" ${_e}/><path d="M8 23 L5 13 M12 23 L12 13" ${_e}/></svg>`,F2=`<svg viewBox="0 0 30 30"><path d="M15 2 l3.6 8 8.4 1 -6.3 5.8 1.8 8.4 -7.5 -4.4 -7.5 4.4 1.8 -8.4 L3 11 l8.4 -1z" fill="#fff3b0" ${_e}/></svg>`,j2=`<svg viewBox="0 0 30 22"><ellipse cx="15" cy="13" rx="13" ry="8" fill="#e6b88a" ${_e}/><circle cx="10" cy="11" r="1.8" fill="${vt}"/><circle cx="18" cy="14" r="1.8" fill="${vt}"/><circle cx="16" cy="9" r="1.5" fill="${vt}"/></svg>`,G2=`<svg viewBox="0 0 30 28"><path d="M15 26 C3 18 1 10 6 5 C10 1 14 4 15 7 C16 4 20 1 24 5 C29 10 27 18 15 26 Z" fill="#ffc8dd" ${_e}/></svg>`,Za=[{name:"Cada",room:"living",x:150,y:382,w:40,h:30,taps:3,spot:Z2,hello:"Squeak! Hi Cada!",item:{kind:"egg:cada-mouse",name:"Cada's Mouse",cat:"secrets",w:80,holdable:!0,svg:`${ea}<path d="M78 74 Q96 68 92 52" stroke="#ff9bb5" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="28" ry="18" fill="#d6d6e8" ${_e}/><circle cx="28" cy="40" r="13" fill="#d6d6e8" ${_e}/><circle cx="62" cy="38" r="13" fill="#d6d6e8" ${_e}/><circle cx="28" cy="40" r="7" fill="#ffc8dd"/><circle cx="62" cy="38" r="7" fill="#ffc8dd"/><circle cx="45" cy="56" r="20" fill="#e4e4f2" ${_e}/>${cl(38,52,54)}<circle cx="45" cy="64" r="3" fill="#ff8fab"/>${dl(32,58,62)}<text x="50" y="96" font-size="11" font-weight="900" text-anchor="middle" fill="${vt}">C</text>`}},{name:"Sloane",room:"living",x:2290,y:383,w:48,h:30,taps:3,spot:N2,hello:"Hi Sloane! ✨",item:{kind:"egg:sloane-snail",name:"Sloane's Rainbow Snail",cat:"secrets",w:110,holdable:!0,svg:`${ea}<path d="M6 92 Q14 80 36 82 L84 82 Q94 90 84 94 H10 Z" fill="#cdeccf" ${_e}/><circle cx="56" cy="52" r="32" fill="#ff8fab" ${_e}/><circle cx="56" cy="52" r="24" fill="#ffd166"/><circle cx="56" cy="52" r="17" fill="#80ed99"/><circle cx="56" cy="52" r="10" fill="#8ecae6"/><circle cx="56" cy="52" r="4" fill="#c9a0dc"/><circle cx="56" cy="52" r="32" fill="none" ${_e}/><path d="M14 82 L8 60 M24 82 L24 60" ${_e}/><circle cx="8" cy="58" r="4" fill="${vt}"/><circle cx="24" cy="58" r="4" fill="${vt}"/>${dl(14,30,76)}`}},{name:"Chloe",room:"bedroom",x:2230,y:92,w:30,h:30,taps:5,spot:F2,item:{kind:"egg:chloe-starlamp",name:"Chloe's Star Lamp",cat:"secrets",w:100,holdable:!0,svg:`${ea}<circle cx="50" cy="38" r="34" fill="#fff3b0" opacity=".6"/><path d="M50 6 l8 17 19 2.5 -14 13 4 19 -17 -9.5 -17 9.5 4 -19 -14 -13 19 -2.5z" fill="#ffd166" ${_e}/>${cl(43,57,38)}<path d="M45 46 q5 4 10 0" ${_e} fill="none"/><rect x="46" y="66" width="8" height="22" rx="4" fill="#c9a0dc" ${_e}/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#b388d6" ${_e}/><text x="50" y="93" font-size="8" font-weight="900" text-anchor="middle" fill="#fff">CHLOE</text>`}},{name:"Quinn",room:"kitchen",x:80,y:588,w:30,h:22,taps:4,spot:j2,hello:"Woof! Hi Quinn!",item:{kind:"egg:quinn-pup",name:"Quinn's Cookie Pup",cat:"secrets",w:110,holdable:!0,svg:`${ea}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#e6b88a" ${_e}/><circle cx="50" cy="44" r="27" fill="#f2d0a4" ${_e}/><ellipse cx="24" cy="46" rx="10" ry="17" fill="#b07d54" ${_e}/><ellipse cx="76" cy="46" rx="10" ry="17" fill="#b07d54" ${_e}/>${cl(41,59,42)}<ellipse cx="50" cy="53" rx="5" ry="4" fill="${vt}"/>${dl(34,66,54)}<circle cx="84" cy="80" r="10" fill="#e6b88a" ${_e}/><circle cx="81" cy="78" r="1.8" fill="${vt}"/><circle cx="87" cy="82" r="1.8" fill="${vt}"/><text x="50" y="30" font-size="10" font-weight="900" text-anchor="middle" fill="${vt}">Q</text>`}},{name:"Reagan",room:"salon",x:2300,y:352,w:30,h:28,taps:5,spot:G2,item:{kind:"egg:reagan-frame",name:"Reagan's Frame",cat:"secrets",w:120,wall:!0,svg:`<rect x="8" y="10" width="84" height="84" rx="16" fill="#ff8fab" ${_e}/><rect x="18" y="20" width="64" height="64" rx="10" fill="#fff3f7" ${_e}/><text x="50" y="72" font-size="52" font-weight="900" text-anchor="middle" fill="#e879c6" stroke="${vt}" stroke-width="2.5">R</text><circle cx="14" cy="16" r="6" fill="#ffd166" ${_e}/><circle cx="86" cy="88" r="6" fill="#ffd166" ${_e}/><path d="M76 24 l2 4 4 .5 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.5z" fill="#ffd166"/>`}}],Y2=Za.map(e=>({...e.item,rooms:["any"],secret:e.name})),Lh=jt("cozy-secrets"),Dr=()=>{try{return new Set(JSON.parse(localStorage.getItem(Lh)??"[]"))}catch{return new Set}},K2=e=>localStorage.setItem(Lh,JSON.stringify([...e]));function X2(e){const t=document.createElement("div");t.className="eggs",e.world.appendChild(t);const n=new Map;for(const o of Za){const i=document.createElement("div");i.className="eggspot",i.dataset.egg=o.name,i.style.left=(o.x-o.w/2)/e.roomW*100+"%",i.style.top=(o.y-o.h)/e.roomH*100+"%",i.style.width=o.w/e.roomW*100+"%",i.style.height=o.h/e.roomH*100+"%",i.innerHTML=o.spot,t.appendChild(i),i.addEventListener("pointerdown",a=>a.stopPropagation()),i.addEventListener("click",a=>{a.stopPropagation();const r=Date.now(),l=n.get(o.name)??{n:0,t:0};if(l.n=r-l.t<1500?l.n+1:1,l.t=r,n.set(o.name,l),i.classList.remove("poke"),i.offsetWidth,i.classList.add("poke"),e.tap(),l.n<o.taps)return;l.n=0;const c=Dr(),d=!c.has(o.name);c.add(o.name),K2(c),J2(o,i),e.sparkle(),e.onFound(o.name,d)})}const s=()=>{const o=e.currentRoom();t.querySelectorAll(".eggspot").forEach(i=>{i.style.display=Za.find(a=>a.name===i.dataset.egg).room===o?"":"none"})};return s(),{update:s}}function J2(e,t){if(e.hello){const s=document.createElement("div");s.className="eggpop",s.innerHTML=`<div class="eggcritter"><svg viewBox="0 0 100 100">${e.item.svg}</svg></div><div class="bubble">${e.hello}</div>`,t.appendChild(s),setTimeout(()=>s.remove(),3200)}const n=document.createElement("div");n.className="eggbanner",n.innerHTML=`<span class="sp">✨</span><span class="nm">${[...e.name].map((s,o)=>`<i style="animation-delay:${o*70}ms">${s}</i>`).join("")}</span><span class="sp">✨</span>`,document.body.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3100),Eh()}function Eh(e=70){const t=["#ff8fab","#ffd166","#8ecae6","#80ed99","#c9a0dc","#ff9f68"],n=document.createElement("div");n.className="confetti",document.body.appendChild(n);for(let s=0;s<e;s++){const o=document.createElement("i");o.style.left=Math.random()*100+"vw",o.style.background=t[s%t.length],o.style.animationDelay=Math.random()*.5+"s",o.style.animationDuration=1.6+Math.random()*1.2+"s",o.style.setProperty("--r",Math.random()*720-360+"deg"),o.style.setProperty("--dx",Math.random()*160-80+"px"),s%3===0&&(o.style.borderRadius="50%"),n.appendChild(o)}setTimeout(()=>n.remove(),3600)}const ey=`[
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
`,ty=`[
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
`,ny="/kids-house-game/assets/alarm-clock-DOVobLzL.png",sy="/kids-house-game/assets/alarm-clock-BCd1-e86.svg",oy="/kids-house-game/assets/bedtime-snack-COvX4Nqo.png",iy="/kids-house-game/assets/bedtime-snack-BoNDQqOK.svg",ay="/kids-house-game/assets/book-stack-BlyqbTA1.png",ry="/kids-house-game/assets/book-stack-upnp1NwG.svg",ly="/kids-house-game/assets/bunk-bed-COiQly1s.png",cy="/kids-house-game/assets/bunk-bed-YZiRWNFR.svg",dy="/kids-house-game/assets/bunny-slippers-DajXa_JK.png",fy="/kids-house-game/assets/bunny-slippers-PNucIc_Q.svg",py="/kids-house-game/assets/canopy-bed-Db9GIfyT.png",hy="/kids-house-game/assets/canopy-bed-BwWkRhe2.svg",gy="/kids-house-game/assets/cat-bed-ChP4s69B.png",uy="/kids-house-game/assets/cat-bed-B8ULFbHc.svg",my="/kids-house-game/assets/cloud-rug-Bv3GScgR.png",yy="/kids-house-game/assets/cloud-rug-CFl6aZc5.svg",by="/kids-house-game/assets/cloud-shelf-BAmU3DSp.png",ky="/kids-house-game/assets/cloud-shelf-DF5b_IoZ.svg",wy="/kids-house-game/assets/cork-board-B8yw-MFd.png",vy="/kids-house-game/assets/cork-board-Bj5OuLbv.svg",_y="/kids-house-game/assets/daisy-pot-BQDVlAug.png",$y="/kids-house-game/assets/daisy-pot-Cy8SrSS6.svg",xy="/kids-house-game/assets/desk-UTaBcI2Q.png",My="/kids-house-game/assets/desk-2rRtV3Vk.svg",Ly="/kids-house-game/assets/dino-plush-yhz7rVZD.png",Ey="/kids-house-game/assets/dino-plush-Dq_qccf0.svg",Cy="/kids-house-game/assets/doll-house-DfYMaHqJ.png",Sy="/kids-house-game/assets/doll-house-BrC3RiST.svg",Py="/kids-house-game/assets/dresser-jJcAkDG_.png",Ty="/kids-house-game/assets/dresser-__9TGuYc.svg",Ry="/kids-house-game/assets/egg-chair-DobnnZdC.png",By="/kids-house-game/assets/egg-chair-CtiaqWNQ.svg",Ay="/kids-house-game/assets/floor-fan-C2R5oDHp.png",Dy="/kids-house-game/assets/floor-fan-Dt9SIAmB.svg",Iy="/kids-house-game/assets/guinea-pig-BzHyXlGo.png",Hy="/kids-house-game/assets/guinea-pig-CwLeNU_S.svg",Oy="/kids-house-game/assets/hamster-cage-zv59jo6b.png",Wy="/kids-house-game/assets/hamster-cage-lQ6r7saV.svg",Uy="/kids-house-game/assets/heart-rug-DYGPCKpT.png",Vy="/kids-house-game/assets/heart-rug-CBDvH6Q6.svg",Qy="/kids-house-game/assets/lava-lamp-Df-lJpLx.png",zy="/kids-house-game/assets/lava-lamp-DEuHvlco.svg",qy="/kids-house-game/assets/moon-night-light-JPI5SkUV.png",Zy="/kids-house-game/assets/moon-night-light-CAKsjYZv.svg",Ny="/kids-house-game/assets/nightstand-D3WOPlqw.png",Fy="/kids-house-game/assets/nightstand-Bgsh0YUi.svg",jy="/kids-house-game/assets/paper-lantern-mpw1jXzL.png",Gy="/kids-house-game/assets/paper-lantern-CErOGyrT.svg",Yy="/kids-house-game/assets/piggy-bank-DaSktUUA.png",Ky="/kids-house-game/assets/piggy-bank-DsHrmOcp.svg",Xy="/kids-house-game/assets/plant-stand-BpU338ra.png",Jy="/kids-house-game/assets/plant-stand-DDyIDaL0.svg",eb="/kids-house-game/assets/play-tent-ih6xOGXC.png",tb="/kids-house-game/assets/play-tent-Bsawe52j.svg",nb="/kids-house-game/assets/star-mobile-Bqyd_ikl.png",sb="/kids-house-game/assets/star-mobile-DzOGs-Jo.svg",ob="/kids-house-game/assets/toy-chest-DhEoVFj0.png",ib="/kids-house-game/assets/toy-chest-6iPrDiZH.svg",ab="/kids-house-game/assets/toy-robot-Bfkjfj_6.png",rb="/kids-house-game/assets/toy-robot-OaCEwmDT.svg",lb="/kids-house-game/assets/toy-train-DILjZiya.png",cb="/kids-house-game/assets/toy-train-D5GqAnpy.svg",db="/kids-house-game/assets/unicorn-plush-5YQqQjND.png",fb="/kids-house-game/assets/unicorn-plush-C0W1eEs9.svg",pb="/kids-house-game/assets/wardrobe-sJcJSWZ2.png",hb="/kids-house-game/assets/wardrobe-Dn492IK0.svg",gb="/kids-house-game/assets/bananas-D4irRkGy.png",ub="/kids-house-game/assets/bananas-aPQwdEVo.svg",mb="/kids-house-game/assets/bar-stool-xbwaa01H.png",yb="/kids-house-game/assets/bar-stool-DWxhX1Ah.svg",bb="/kids-house-game/assets/bread-loaf-DKmR5wPN.png",kb="/kids-house-game/assets/bread-loaf-C9cEAYcl.svg",wb="/kids-house-game/assets/chick-DCnoMwEt.png",vb="/kids-house-game/assets/chick-BTEVfgqU.svg",_b="/kids-house-game/assets/china-hutch-K3xtlmqi.png",$b="/kids-house-game/assets/china-hutch-BTmMY6rg.svg",xb="/kids-house-game/assets/cocoa-mug-BmqSzNJ6.png",Mb="/kids-house-game/assets/cocoa-mug-CraNCc9b.svg",Lb="/kids-house-game/assets/cookie-jar-CZsO9PSp.png",Eb="/kids-house-game/assets/cookie-jar-ripj0oyT.svg",Cb="/kids-house-game/assets/cooking-pot-BSKPlqyT.png",Sb="/kids-house-game/assets/cooking-pot-BWtfOm9f.svg",Pb="/kids-house-game/assets/cupcake-KO1KLKav.png",Tb="/kids-house-game/assets/cupcake-DFCw42xb.svg",Rb="/kids-house-game/assets/dish-rack-DICSEn5E.png",Bb="/kids-house-game/assets/dish-rack-BpVmmU6k.svg",Ab="/kids-house-game/assets/fruit-bowl-BL5EkaC8.png",Db="/kids-house-game/assets/fruit-bowl-Dw9lsB3B.svg",Ib="/kids-house-game/assets/frying-pan-BocrLcES.png",Hb="/kids-house-game/assets/frying-pan-CTBY6MC_.svg",Ob="/kids-house-game/assets/happy-fridge-BTbpm-W1.png",Wb="/kids-house-game/assets/happy-fridge-D7ENuEJs.svg",Ub="/kids-house-game/assets/herb-box-DFtC2qBN.png",Vb="/kids-house-game/assets/herb-box-CdRxefnV.svg",Qb="/kids-house-game/assets/high-chair-DZCqRJV8.png",zb="/kids-house-game/assets/high-chair-BQtLYlq4.svg",qb="/kids-house-game/assets/ice-cream-CLLMXjn9.png",Zb="/kids-house-game/assets/ice-cream-DydSyNXx.svg",Nb="/kids-house-game/assets/kettle-DScYOeEK.png",Fb="/kids-house-game/assets/kettle-D1nuAiG_.svg",jb="/kids-house-game/assets/kitchen-counter-cZcDRQIw.png",Gb="/kids-house-game/assets/kitchen-counter-C8sTAZ-V.svg",Yb="/kids-house-game/assets/kitchen-sink-DrP43iga.png",Kb="/kids-house-game/assets/kitchen-sink-CYjDcd1n.svg",Xb="/kids-house-game/assets/lemon-tree-BwA7W0cM.png",Jb="/kids-house-game/assets/lemon-tree-CZz-Vy3P.svg",ek="/kids-house-game/assets/microwave-BJRDd-L-.png",tk="/kids-house-game/assets/microwave-lopm-FCT.svg",nk="/kids-house-game/assets/milk-bottle-D7UB6VD8.png",sk="/kids-house-game/assets/milk-bottle-DxcUA6XT.svg",ok="/kids-house-game/assets/pancakes-CbisCK-C.png",ik="/kids-house-game/assets/pancakes-CLqxnc5R.svg",ak="/kids-house-game/assets/pantry-shelf-DI_CgvVD.png",rk="/kids-house-game/assets/pantry-shelf-Azdxpmzd.svg",lk="/kids-house-game/assets/pendant-lamp-BhZanag5.png",ck="/kids-house-game/assets/pendant-lamp-fZv6y1p0.svg",dk="/kids-house-game/assets/pet-bowl-Oe3KGELz.png",fk="/kids-house-game/assets/pet-bowl-ETL_EOAP.svg",pk="/kids-house-game/assets/rice-cooker-DUTXsBbb.png",hk="/kids-house-game/assets/rice-cooker-JX0L4bi2.svg",gk="/kids-house-game/assets/runner-rug-AYIsQudU.png",uk="/kids-house-game/assets/runner-rug-BbUgZFy4.svg",mk="/kids-house-game/assets/spice-rack-8ll-6Q2f.png",yk="/kids-house-game/assets/spice-rack-D9kAw-vT.svg",bk="/kids-house-game/assets/stand-mixer-CP2fpC-Q.png",kk="/kids-house-game/assets/stand-mixer-CZrLn00l.svg",wk="/kids-house-game/assets/teapot-iFnJNGiA.png",vk="/kids-house-game/assets/teapot-CtPOJzEm.svg",_k="/kids-house-game/assets/toaster-T2WkZkdo.png",$k="/kids-house-game/assets/toaster-CNk0hJDw.svg",xk="/kids-house-game/assets/utensil-rail-_vjcgBpy.png",Mk="/kids-house-game/assets/utensil-rail-B0QkGP3A.svg",Lk="/kids-house-game/assets/watermelon-slice-yHBcfKGj.png",Ek="/kids-house-game/assets/watermelon-slice-VzvgalD5.svg",Ck="/kids-house-game/assets/aquarium-rYRAu69m.png",Sk="/kids-house-game/assets/aquarium-BlhJ9UCr.svg",Pk="/kids-house-game/assets/arc-floor-lamp-CBq3G9j8.png",Tk="/kids-house-game/assets/arc-floor-lamp-DL5cEVzq.svg",Rk="/kids-house-game/assets/bean-bag-CMLYRsbz.png",Bk="/kids-house-game/assets/bean-bag-CauyDuZQ.svg",Ak="/kids-house-game/assets/bird-cage-qj5P0te2.png",Dk="/kids-house-game/assets/bird-cage-xqeVahX7.svg",Ik="/kids-house-game/assets/blanket-basket-5IQiUSS2.png",Hk="/kids-house-game/assets/blanket-basket-B4LREUo9.svg",Ok="/kids-house-game/assets/building-blocks-CzqAFUNB.png",Wk="/kids-house-game/assets/building-blocks-DbtoodPT.svg",Uk="/kids-house-game/assets/coffee-table-iKZ20Gpy.png",Vk="/kids-house-game/assets/coffee-table-ZYO2ApH6.svg",Qk="/kids-house-game/assets/comfy-armchair-U_SI3sk9.png",zk="/kids-house-game/assets/comfy-armchair-tjNYbfgO.svg",qk="/kids-house-game/assets/cubby-shelf-B0De91CO.png",Zk="/kids-house-game/assets/cubby-shelf-CLzTUpiz.svg",Nk="/kids-house-game/assets/daisy-rug-BqSOjPlJ.png",Fk="/kids-house-game/assets/daisy-rug-CvOlxjsu.svg",jk="/kids-house-game/assets/fiddle-leaf-fig-DnvG8l2j.png",Gk="/kids-house-game/assets/fiddle-leaf-fig-DiUNW4Q_.svg",Yk="/kids-house-game/assets/fireplace-C9azNipx.png",Kk="/kids-house-game/assets/fireplace-CqxIMN3Z.svg",Xk="/kids-house-game/assets/globe-C-L7vS0t.png",Jk="/kids-house-game/assets/globe-DN0sih3W.svg",ew="/kids-house-game/assets/hanging-planter-DGgUXZpP.png",tw="/kids-house-game/assets/hanging-planter-M9IHqztp.svg",nw="/kids-house-game/assets/monstera-plant-BbGZQtOh.png",sw="/kids-house-game/assets/monstera-plant-CLmuB_RM.svg",ow="/kids-house-game/assets/piano-DpS7nvdq.png",iw="/kids-house-game/assets/piano-Y0KQ4rD2.svg",aw="/kids-house-game/assets/popcorn-CFk12JbR.png",rw="/kids-house-game/assets/popcorn-BD2d8sUH.svg",lw="/kids-house-game/assets/pouf-DY0Vcx75.png",cw="/kids-house-game/assets/pouf-as0li8On.svg",dw="/kids-house-game/assets/rainbow-rug-DwzLb6aY.png",fw="/kids-house-game/assets/rainbow-rug-C5ZVauOA.svg",pw="/kids-house-game/assets/rainbow-wall-art--5LLrrQJ.png",hw="/kids-house-game/assets/rainbow-wall-art-CCXUPPen.svg",gw="/kids-house-game/assets/retro-radio-BIX4GYkL.png",uw="/kids-house-game/assets/retro-radio-B3T98xMQ.svg",mw="/kids-house-game/assets/rocking-chair-CDLlJFiP.png",yw="/kids-house-game/assets/rocking-chair-BgoIQu5H.svg",bw="/kids-house-game/assets/rocking-horse-Iz-CpscK.png",kw="/kids-house-game/assets/rocking-horse-1WLLV43R.svg",ww="/kids-house-game/assets/snake-plant-DgPna4k9.png",vw="/kids-house-game/assets/snake-plant-BGDwPcMj.svg",_w="/kids-house-game/assets/string-lights-nDUZa5m1.png",$w="/kids-house-game/assets/string-lights-DGC0Ni2I.svg",xw="/kids-house-game/assets/succulent-trio-VYNH-o5B.png",Mw="/kids-house-game/assets/succulent-trio-uPD-ljlL.svg",Lw="/kids-house-game/assets/tassel-rug-BBXtknxh.png",Ew="/kids-house-game/assets/tassel-rug-DolXtxfQ.svg",Cw="/kids-house-game/assets/throw-pillow-BjuGXMYA.png",Sw="/kids-house-game/assets/throw-pillow-qWyWQ9cT.svg",Pw="/kids-house-game/assets/toy-car-Bwrt0-AT.png",Tw="/kids-house-game/assets/toy-car-CTJy5H4V.svg",Rw="/kids-house-game/assets/tulip-vase-CpQUgXPR.png",Bw="/kids-house-game/assets/tulip-vase-o2vjI1Hg.svg",Aw="/kids-house-game/assets/turtle-Bf8_yRql.png",Dw="/kids-house-game/assets/turtle-B9Y6NDSv.svg",Iw="/kids-house-game/assets/tv-stand-DnwT-hn4.png",Hw="/kids-house-game/assets/tv-stand-CcLHFc1J.svg",Ow="/kids-house-game/assets/wall-shelf-Bs6mROe1.png",Ww="/kids-house-game/assets/wall-shelf-CCWuZ6Xl.svg",Uw="/kids-house-game/assets/cc-bakery-shelf-dMrnZVB3.png",Vw="/kids-house-game/assets/cc-bakery-shelf-BxdhLTTC.svg",Qw="/kids-house-game/assets/cc-breakfast-table-DwHbMV2p.png",zw="/kids-house-game/assets/cc-breakfast-table-DwaO0eFy.svg",qw="/kids-house-game/assets/cc-bubble-chair-DuDi-bRz.png",Zw="/kids-house-game/assets/cc-bubble-chair-DncHA7F-.svg",Nw="/kids-house-game/assets/cc-canopy-daybed-CAZpSo2a.png",Fw="/kids-house-game/assets/cc-canopy-daybed-CVbt6QDr.svg",jw="/kids-house-game/assets/cc-cloud-beanbag-BYcBLKf9.png",Gw="/kids-house-game/assets/cc-cloud-beanbag-SM0m-3qY.svg",Yw="/kids-house-game/assets/cc-cloud-lamp-v0UO1VrK.png",Kw="/kids-house-game/assets/cc-cloud-lamp-BWwxoCux.svg",Xw="/kids-house-game/assets/cc-cottage-aquarium-XYuN1CnR.png",Jw="/kids-house-game/assets/cc-cottage-aquarium-iY2D26Vq.svg",e4="/kids-house-game/assets/cc-cupcake-stand-jKA3zoCC.png",t4="/kids-house-game/assets/cc-cupcake-stand-B08kdXZL.svg",n4="/kids-house-game/assets/cc-dryer-chair-CP8q6yyq.png",s4="/kids-house-game/assets/cc-dryer-chair-DQmosxUz.svg",o4="/kids-house-game/assets/cc-fairy-garland-B4DVLP6L.png",i4="/kids-house-game/assets/cc-fairy-garland-BncKvkRL.svg",a4="/kids-house-game/assets/cc-fairy-shelf-DSmhC08i.png",r4="/kids-house-game/assets/cc-fairy-shelf-CE6x7J1w.svg",l4="/kids-house-game/assets/cc-flower-kettle-DZFkbEk5.png",c4="/kids-house-game/assets/cc-flower-kettle-ZTbAh26L.svg",d4="/kids-house-game/assets/cc-flower-lamp-hc1e4xxL.png",f4="/kids-house-game/assets/cc-flower-lamp-CS2T2S89.svg",p4="/kids-house-game/assets/cc-heart-bed-BtOx4_a4.png",h4="/kids-house-game/assets/cc-heart-bed-76-z9nJg.svg",g4="/kids-house-game/assets/cc-heart-clock-CLtzUj8w.png",u4="/kids-house-game/assets/cc-heart-clock-ByixSFru.svg",m4="/kids-house-game/assets/cc-heart-pouf-C3vCLnoM.png",y4="/kids-house-game/assets/cc-heart-pouf-DH5J2s2J.svg",b4="/kids-house-game/assets/cc-heart-rug-CpvyM_wf.png",k4="/kids-house-game/assets/cc-heart-rug-Jwmh-m0j.svg",w4="/kids-house-game/assets/cc-jewel-box-DZ6IxYiU.png",v4="/kids-house-game/assets/cc-jewel-box-qMbIQmo4.svg",_4="/kids-house-game/assets/cc-light-vanity-BxKLJiVW.png",$4="/kids-house-game/assets/cc-light-vanity-DD4uQJ_7.svg",x4="/kids-house-game/assets/cc-macaron-jar-NI43JiPM.png",M4="/kids-house-game/assets/cc-macaron-jar-A0sT-Lvj.svg",L4="/kids-house-game/assets/cc-macrame-swing-x8sop4y4.png",E4="/kids-house-game/assets/cc-macrame-swing-qIcoPp0o.svg",C4="/kids-house-game/assets/cc-mani-chair-C1J_zCFX.png",S4="/kids-house-game/assets/cc-mani-chair-7AWb60tv.svg",P4="/kids-house-game/assets/cc-mint-fridge-7zQk2-Kj.png",T4="/kids-house-game/assets/cc-mint-fridge-Cc87e_gW.svg",R4="/kids-house-game/assets/cc-mushroom-stool-DeoO7P27.png",B4="/kids-house-game/assets/cc-mushroom-stool-B9-y9WNf.svg",A4="/kids-house-game/assets/cc-pastel-range-CXu-Gr6f.png",D4="/kids-house-game/assets/cc-pastel-range-D6cjzJTl.svg",I4="/kids-house-game/assets/cc-perfume-tray-DkUHaA_i.png",H4="/kids-house-game/assets/cc-perfume-tray-DN4chcIn.svg",O4="/kids-house-game/assets/cc-petal-table-DadCDnSy.png",W4="/kids-house-game/assets/cc-petal-table-QrNho7KH.svg",U4="/kids-house-game/assets/cc-plant-wall-CCxqRxsH.png",V4="/kids-house-game/assets/cc-plant-wall-BMii8_kR.svg",Q4="/kids-house-game/assets/cc-reading-nook-Eq4Eh0MW.png",z4="/kids-house-game/assets/cc-reading-nook-wiDgasP8.svg",q4="/kids-house-game/assets/cc-record-player-LmfaPaE5.png",Z4="/kids-house-game/assets/cc-record-player-BoxZhHLy.svg",N4="/kids-house-game/assets/cc-ribbon-mirror-BEsGok51.png",F4="/kids-house-game/assets/cc-ribbon-mirror-DiCje_iy.svg",j4="/kids-house-game/assets/cc-scallop-curtains-Cvab-FzV.png",G4="/kids-house-game/assets/cc-scallop-curtains-Bzhy2peV.svg",Y4="/kids-house-game/assets/cc-scallop-loveseat-CR3Z2O-W.png",K4="/kids-house-game/assets/cc-scallop-loveseat-Dfi7dg3b.svg",X4="/kids-house-game/assets/cc-star-dresser-b15t-WLI.png",J4="/kids-house-game/assets/cc-star-dresser-2wqSnsip.svg",e6="/kids-house-game/assets/cc-teapot-set-ygQBLdbl.png",t6="/kids-house-game/assets/cc-teapot-set-DnZlJvn7.svg",n6="/kids-house-game/assets/cc-window-seat-D-Rfuuwm.png",s6="/kids-house-game/assets/cc-window-seat-BCOise4Z.svg",o6="/kids-house-game/assets/arched-shelf-Dt4oWiBK.png",i6="/kids-house-game/assets/arched-shelf-XtiqRVaT.svg",a6="/kids-house-game/assets/blob-rug-Ckw1kSsa.png",r6="/kids-house-game/assets/blob-rug-Deh5k10s.svg",l6="/kids-house-game/assets/bubbly-plant-CV9ioei6.png",c6="/kids-house-game/assets/bubbly-plant-CFTOJd5Y.svg",d6="/kids-house-game/assets/bud-vase-Bzj5qGgr.png",f6="/kids-house-game/assets/bud-vase-Dup4WQ5y.svg",p6="/kids-house-game/assets/comb-brush-CfTGGk1L.png",h6="/kids-house-game/assets/comb-brush-oPJeQv0v.svg",g6="/kids-house-game/assets/cream-jars-dLRXypJR.png",u6="/kids-house-game/assets/cream-jars-D6bxrnJR.svg",m6="/kids-house-game/assets/drop-lamp-DWqiPjZB.png",y6="/kids-house-game/assets/drop-lamp-CJg63ZKz.svg",b6="/kids-house-game/assets/droplet-buddy-DCjbvrlK.png",k6="/kids-house-game/assets/droplet-buddy-DTpHggFh.svg",w6="/kids-house-game/assets/fancy-sofa-BRlr2j8I.png",v6="/kids-house-game/assets/fancy-sofa-kq2L0ob5.svg",_6="/kids-house-game/assets/flower-cart-C3W7v2RD.png",$6="/kids-house-game/assets/flower-cart-BWgfg0s_.svg",x6="/kids-house-game/assets/foot-spa-HwiSNgdS.png",M6="/kids-house-game/assets/foot-spa-DdA5_fj_.svg",L6="/kids-house-game/assets/globe-pendants-ChKRw_Bp.png",E6="/kids-house-game/assets/globe-pendants-DNV5WnAO.svg",C6="/kids-house-game/assets/glow-mirror-D4P3UibJ.png",S6="/kids-house-game/assets/glow-mirror-C_dTGwQc.svg",P6="/kids-house-game/assets/gold-floor-mirror-CSYqaszS.png",T6="/kids-house-game/assets/gold-floor-mirror-jfPQepmr.svg",R6="/kids-house-game/assets/hair-dryer-_nFRnXBv.png",B6="/kids-house-game/assets/hair-dryer-CAkhCf7J.svg",A6="/kids-house-game/assets/heart-plant-CN47o4my.png",D6="/kids-house-game/assets/heart-plant-fSU4uLVy.svg",I6="/kids-house-game/assets/heart-pouf-b76ZFT07.png",H6="/kids-house-game/assets/heart-pouf-BMVPBVKJ.svg",O6="/kids-house-game/assets/lilac-curtain-94MUZIqr.png",W6="/kids-house-game/assets/lilac-curtain-D_mFsZKu.svg",U6="/kids-house-game/assets/lotion-trio-wGXg7qdC.png",V6="/kids-house-game/assets/lotion-trio-D3lKwvho.svg",Q6="/kids-house-game/assets/mani-lamp-B6MLP1xK.png",z6="/kids-house-game/assets/mani-lamp-B4SmvhvS.svg",q6="/kids-house-game/assets/nail-table-CP0_pEA8.png",Z6="/kids-house-game/assets/nail-table-C3FitmuG.svg",N6="/kids-house-game/assets/pebble-rug-BgHMxQ6Q.png",F6="/kids-house-game/assets/pebble-rug-DHBZUggl.svg",j6="/kids-house-game/assets/perfume-bottle-F_MkREQh.png",G6="/kids-house-game/assets/perfume-bottle-BcNXSWTW.svg",Y6="/kids-house-game/assets/pink-fountain-DtB69ljQ.png",K6="/kids-house-game/assets/pink-fountain-DQ3CIetr.svg",X6="/kids-house-game/assets/pink-vanity-CPmOesS7.png",J6="/kids-house-game/assets/pink-vanity-qE3SwdD6.svg",ev="/kids-house-game/assets/polish-bottle-B2f4PsGZ.png",tv="/kids-house-game/assets/polish-bottle-VWed8EQ-.svg",nv="/kids-house-game/assets/polish-rack-ANlncwDe.png",sv="/kids-house-game/assets/polish-rack-8Ph2n2nM.svg",ov="/kids-house-game/assets/reception-desk-DnhqgkHu.png",iv="/kids-house-game/assets/reception-desk-D4Gevx64.svg",av="/kids-house-game/assets/salon-chair-Bl31ZE_E.png",rv="/kids-house-game/assets/salon-chair-Wj2sOSW8.svg",lv="/kids-house-game/assets/scent-candle-BYUsO9s1.png",cv="/kids-house-game/assets/scent-candle-BEUE-6Uv.svg",dv="/kids-house-game/assets/spray-bottle-DJKZeNmL.png",fv="/kids-house-game/assets/spray-bottle-Bc8iuceJ.svg",pv="/kids-house-game/assets/star-wall-sign-D_9XhB91.png",hv="/kids-house-game/assets/star-wall-sign-DvenTqvU.svg",gv="/kids-house-game/assets/swivel-stool-BGAwWXNX.png",uv="/kids-house-game/assets/swivel-stool-P-Egqq_Z.svg",mv="/kids-house-game/assets/tiered-tray-CGuVyK1K.png",yv="/kids-house-game/assets/tiered-tray-DLnZTsUF.svg",bv="/kids-house-game/assets/towel-cart-5At-syZP.png",kv="/kids-house-game/assets/towel-cart-DJmR97UL.svg",wv="/kids-house-game/assets/towel-stack-D-pX5koc.png",vv="/kids-house-game/assets/towel-stack-C1qplZ4T.svg",_v="/kids-house-game/assets/vine-planter-mviuZvkw.png",$v="/kids-house-game/assets/vine-planter-Duhx9OMZ.svg",xv="/kids-house-game/assets/waiting-bench-DXbi7ObC.png",Mv="/kids-house-game/assets/waiting-bench-BQuoXbE3.svg",Lv="/kids-house-game/assets/wash-chair-CJo64U_O.png",Ev="/kids-house-game/assets/wash-chair-sdgNnj79.svg",Cv="/kids-house-game/assets/hw-candy-bowl-CD02D5Zj.webp",Sv="/kids-house-game/assets/hw-cat-statue-DeCc_3q0.webp",Pv="/kids-house-game/assets/hw-cauldron-Dct8_uZ8.webp",Tv="/kids-house-game/assets/hw-ghost-sheet-kZF5Oxdt.webp",Rv="/kids-house-game/assets/hw-hay-bale-BqFYl-D_.webp",Bv="/kids-house-game/assets/hw-heart-pumpkin-B-0-0OAK.webp",Av="/kids-house-game/assets/hw-leaf-garland-DN-y_jMP.webp",Dv="/kids-house-game/assets/hw-moon-cling-p5ei0N89.webp",Iv="/kids-house-game/assets/hw-moon-lantern-ByPteKOL.webp",Hv="/kids-house-game/assets/hw-star-pumpkin-Bxq_OX8C.webp",Ov="/kids-house-game/assets/hw-witch-hat-BmuOG13B.webp",Wv="/kids-house-game/assets/arched-mirror-2vakzmQ8.png",Uv="/kids-house-game/assets/arched-mirror-ClJgTBd9.svg",Vv="/kids-house-game/assets/big-monitor-BRiCdofl.png",Qv="/kids-house-game/assets/big-monitor-jx5PnUa_.svg",zv="/kids-house-game/assets/boba-cup-Dn_S1oAa.png",qv="/kids-house-game/assets/boba-cup-CwUerXNm.svg",Zv="/kids-house-game/assets/bubble-bath-D4AZavWB.png",Nv="/kids-house-game/assets/bubble-bath-8VwrkImA.svg",Fv="/kids-house-game/assets/cactus-buddy-D_lAS12Y.png",jv="/kids-house-game/assets/cactus-buddy-D3uacuVA.svg",Gv="/kids-house-game/assets/caterpillar-plush-vK3r58Ch.png",Yv="/kids-house-game/assets/caterpillar-plush-BhR8Pydf.svg",Kv="/kids-house-game/assets/checker-bed-DD4Ra6RV.png",Xv="/kids-house-game/assets/checker-bed-mtuxfPje.svg",Jv="/kids-house-game/assets/checker-rug-C9Gs09p_.png",e_="/kids-house-game/assets/checker-rug-CmSO3Y4j.svg",t_="/kids-house-game/assets/clothes-rail-CJ8Du1xN.png",n_="/kids-house-game/assets/clothes-rail-BY-f9coz.svg",s_="/kids-house-game/assets/cloud-sofa-3eVlcAzs.png",o_="/kids-house-game/assets/cloud-sofa-CZS1Y5s-.svg",i_="/kids-house-game/assets/cube-shelf-DPFNgFhk.png",a_="/kids-house-game/assets/cube-shelf-DoI0tLGL.svg",r_="/kids-house-game/assets/curvy-desk-BxyVtcg3.png",l_="/kids-house-game/assets/curvy-desk-eWCvec1f.svg",c_="/kids-house-game/assets/cute-speaker-Cy7ml0bm.png",d_="/kids-house-game/assets/cute-speaker-DrVF9uns.svg",f_="/kids-house-game/assets/desk-lamp-B39R5SBQ.png",p_="/kids-house-game/assets/desk-lamp-C-VtrE1V.svg",h_="/kids-house-game/assets/desk-mic-C-4XirP6.png",g_="/kids-house-game/assets/desk-mic-BqYzh6ma.svg",u_="/kids-house-game/assets/flower-lamp-DyDRXGpR.png",m_="/kids-house-game/assets/flower-lamp-Dpz6tQ2x.svg",y_="/kids-house-game/assets/frog-plush-NmeU5sHZ.png",b_="/kids-house-game/assets/frog-plush-BhkTrE24.svg",k_="/kids-house-game/assets/game-controller-B6phnmU4.png",w_="/kids-house-game/assets/game-controller-6gvwykQG.svg",v_="/kids-house-game/assets/gaming-chair-B7ZnwG2W.png",__="/kids-house-game/assets/gaming-chair-BCyGMzy0.svg",$_="/kids-house-game/assets/hamster-pet-C09aLs5N.png",x_="/kids-house-game/assets/hamster-pet-LBcghoJj.svg",M_="/kids-house-game/assets/headphones-MRHfNh-e.png",L_="/kids-house-game/assets/headphones-Cjjqt_92.svg",E_="/kids-house-game/assets/heart-light-B6LXGE4j.png",C_="/kids-house-game/assets/heart-light-DfDwRHju.svg",S_="/kids-house-game/assets/keyboard-Dvxz1PEW.png",P_="/kids-house-game/assets/keyboard-Cbtwvtj1.svg",T_="/kids-house-game/assets/mini-fridge-DgYceOBW.png",R_="/kids-house-game/assets/mini-fridge-qdNm4NKf.svg",B_="/kids-house-game/assets/pastel-wardrobe-CFIOdtrx.png",A_="/kids-house-game/assets/pastel-wardrobe-BubkWAN2.svg",D_="/kids-house-game/assets/phone-stand-CWfRuwT_.png",I_="/kids-house-game/assets/phone-stand-VLW-DsK-.svg",H_="/kids-house-game/assets/pothos-plant-mnKAaH_K.png",O_="/kids-house-game/assets/pothos-plant-C1I15M9a.svg",W_="/kids-house-game/assets/puffy-stool-B5z3sd2l.png",U_="/kids-house-game/assets/puffy-stool-CwjoblCa.svg",V_="/kids-house-game/assets/ring-light-BoqM9Lks.png",Q_="/kids-house-game/assets/ring-light-CdxNAXA6.svg",z_="/kids-house-game/assets/side-table-round-x1NbWzDq.png",q_="/kids-house-game/assets/side-table-round-rCsBU0YO.svg",Z_="/kids-house-game/assets/star-lamp-Bocs3YRP.png",N_="/kids-house-game/assets/star-lamp-CHKQnzvB.svg",F_="/kids-house-game/assets/sticker-board-CMn2BF_D.png",j_="/kids-house-game/assets/sticker-board-LUm1_I_P.svg",G_="/kids-house-game/assets/sunny-art-372bwMLG.png",Y_="/kids-house-game/assets/sunny-art-C25M7k02.svg",K_="/kids-house-game/assets/sv-bean-bag-DlsJBRMG.png",X_="/kids-house-game/assets/sv-bean-bag-DdsCYd4e.svg",J_="/kids-house-game/assets/sv-cloud-rug-Bo5aP_HP.png",e8="/kids-house-game/assets/sv-cloud-rug-BvczSj77.svg",t8="/kids-house-game/assets/sv-wall-shelf-C61Y5OFn.png",n8="/kids-house-game/assets/sv-wall-shelf-BtJLzNMg.svg",s8="/kids-house-game/assets/vlog-camera-DAiD7LSW.png",o8="/kids-house-game/assets/vlog-camera-CBd28A7P.svg",i8="/kids-house-game/assets/wavy-floor-lamp-1BJBLV8q.png",a8="/kids-house-game/assets/wavy-floor-lamp-Iy8llzr8.svg",r8="/kids-house-game/assets/acorn-friend-SMoU5de2.png",l8="/kids-house-game/assets/acorn-friend-BsLiZ2Z_.svg",c8="/kids-house-game/assets/apple-tree-CN7tYao3.png",d8="/kids-house-game/assets/apple-tree-DGIUIjY1.svg",f8="/kids-house-game/assets/big-wardrobe-DcZpROWW.png",p8="/kids-house-game/assets/big-wardrobe-BnfnkPXl.svg",h8="/kids-house-game/assets/box-stack-DBdO-RRV.png",g8="/kids-house-game/assets/box-stack-ji13G2mP.svg",u8="/kids-house-game/assets/brick-fireplace-CxelyhgA.png",m8="/kids-house-game/assets/brick-fireplace-BGCbiSK5.svg",y8="/kids-house-game/assets/bulletin-board-BWUCktvK.png",b8="/kids-house-game/assets/bulletin-board-DqA69wQH.svg",k8="/kids-house-game/assets/cozy-mug-DGMQRJK7.png",w8="/kids-house-game/assets/cozy-mug-CFJEPRKb.svg",v8="/kids-house-game/assets/cream-sofa-Dzaz9Eg9.png",_8="/kids-house-game/assets/cream-sofa-CB4EWIDp.svg",$8="/kids-house-game/assets/fire-pit-FhRYTkJU.png",x8="/kids-house-game/assets/fire-pit-DTyRokIj.svg",M8="/kids-house-game/assets/glass-cabinet-C1Dud5Om.png",L8="/kids-house-game/assets/glass-cabinet-BCHExP4F.svg",E8="/kids-house-game/assets/hanging-lantern-5_A0FrVU.png",C8="/kids-house-game/assets/hanging-lantern-DZbXB8L1.svg",S8="/kids-house-game/assets/knit-cushion-CeEpuawZ.png",P8="/kids-house-game/assets/knit-cushion-DUewI6rR.svg",T8="/kids-house-game/assets/ladder-shelf-kDBx9ho_.png",R8="/kids-house-game/assets/ladder-shelf-DXYDmQiE.svg",B8="/kids-house-game/assets/landscape-art-CXy-fkYO.png",A8="/kids-house-game/assets/landscape-art-CdCqCPL2.svg",D8="/kids-house-game/assets/lattice-bench-BQ7wYgqI.png",I8="/kids-house-game/assets/lattice-bench-D3zCZTQp.svg",H8="/kids-house-game/assets/leaf-wreath-01dJ9WfP.png",O8="/kids-house-game/assets/leaf-wreath-DUjq1MWh.svg",W8="/kids-house-game/assets/mini-greenhouse-DLsY7-VZ.png",U8="/kids-house-game/assets/mini-greenhouse-CGE5F9A_.svg",V8="/kids-house-game/assets/moving-box-DszcEI-k.png",Q8="/kids-house-game/assets/moving-box-CZXbXcJO.svg",z8="/kids-house-game/assets/picnic-basket-CYmGfWoy.png",q8="/kids-house-game/assets/picnic-basket-D72DCNRY.svg",Z8="/kids-house-game/assets/round-rug-DZTiY9p2.png",N8="/kids-house-game/assets/round-rug-D8ePosbv.svg",F8="/kids-house-game/assets/sale-sign-CLwCvavX.png",j8="/kids-house-game/assets/sale-sign-CXWpgQt5.svg",G8="/kids-house-game/assets/sprout-pot-BlPwmBjK.png",Y8="/kids-house-game/assets/sprout-pot-BbXk09mS.svg",K8="/kids-house-game/assets/stripe-runner-CWfHHL2f.png",X8="/kids-house-game/assets/stripe-runner-ClycKEW5.svg",J8="/kids-house-game/assets/trailing-plant-BBqKhPvp.png",e$="/kids-house-game/assets/trailing-plant-NbG7dy8O.svg",t$="/kids-house-game/assets/wall-clock-ItDQFPVO.png",n$="/kids-house-game/assets/wall-clock-CDC1o6eG.svg",s$="/kids-house-game/assets/wh-arc-floor-lamp-Dg8j_uAI.png",o$="/kids-house-game/assets/wh-arc-floor-lamp-BKVes2Fd.svg",i$="/kids-house-game/assets/wh-book-stack-9oDTUUnY.png",a$="/kids-house-game/assets/wh-book-stack-DjDFey2h.svg",r$="/kids-house-game/assets/wh-dresser-DhrzqcZ2.png",l$="/kids-house-game/assets/wh-dresser-Y-jnNt5q.svg",c$="/kids-house-game/assets/wh-fiddle-leaf-fig-Bt0Bc12k.png",d$="/kids-house-game/assets/wh-fiddle-leaf-fig-B0-kGmHI.svg",f$="/kids-house-game/assets/wh-kitchen-counter-BWikwkWo.png",p$="/kids-house-game/assets/wh-kitchen-counter-BtBenu6u.svg",h$="/kids-house-game/assets/wh-nightstand-BXusZ0A4.png",g$="/kids-house-game/assets/wh-nightstand-DPUoV5aO.svg",u$="/kids-house-game/assets/wh-pendant-lamp-DbfSrUho.png",m$="/kids-house-game/assets/wh-pendant-lamp-DBg4p7hi.svg",y$="/kids-house-game/assets/wh-snake-plant-kt_6Tus5.png",b$="/kids-house-game/assets/wh-snake-plant-Cj3bHF25.svg",k$="/kids-house-game/assets/wh-string-lights-CWVP27K_.png",w$="/kids-house-game/assets/wh-string-lights-C3JVBkgW.svg",v$="/kids-house-game/assets/wh-teapot-BclPHtYN.png",_$="/kids-house-game/assets/wh-teapot-kevlW5hN.svg",$$="/kids-house-game/assets/wood-armchair-BoX1llWe.png",x$="/kids-house-game/assets/wood-armchair-DNVhKBWe.svg",M$="/kids-house-game/assets/wood-bookshelf-CfgOK-7q.png",L$="/kids-house-game/assets/wood-bookshelf-CvT7GAuI.svg",E$="/kids-house-game/assets/wood-coffee-table-DmAJknnU.png",C$="/kids-house-game/assets/wood-coffee-table-CuAR_7Kr.svg",S$="/kids-house-game/assets/wood-desk-S1h5jwM2.png",P$="/kids-house-game/assets/wood-desk-DPCJq_XQ.svg",T$="/kids-house-game/assets/wood-stool-BWBID67e.png",R$="/kids-house-game/assets/wood-stool-CV7YeZwC.svg",B$="/kids-house-game/assets/wooden-bed-511IemjK.png",A$="/kids-house-game/assets/wooden-bed-Qj-sf8yq.svg",D$="/kids-house-game/assets/wc-bauble-garland-PlBim-j0.webp",I$="/kids-house-game/assets/wc-berry-wreath-BtfH1PGe.webp",H$="/kids-house-game/assets/wc-birch-basket-vRxqyB3J.webp",O$="/kids-house-game/assets/wc-cabin-picture-B-lavF1R.webp",W$="/kids-house-game/assets/wc-candle-trio-CjQ7YYcj.webp",U$="/kids-house-game/assets/wc-cane-lamp-OhwvqNa-.webp",V$="/kids-house-game/assets/wc-cinnamon-tray-CxLrtplK.webp",Q$="/kids-house-game/assets/wc-cocoa-cart-BkMzGgs0.webp",z$="/kids-house-game/assets/wc-cocoa-mug-qa2xzTYd.webp",q$="/kids-house-game/assets/wc-cocoa-pot-bLgiaNKD.webp",Z$="/kids-house-game/assets/wc-cookie-oven-D2Ud1EPt.webp",N$="/kids-house-game/assets/wc-cookie-plate-RhDZYroJ.webp",F$="/kids-house-game/assets/wc-frost-bookcase-BMd6DAXH.webp",j$="/kids-house-game/assets/wc-frosted-pine-BupMG4GK.webp",G$="/kids-house-game/assets/wc-fur-bench-B1nXjHAR.webp",Y$="/kids-house-game/assets/wc-gingerbread-village-8pOXPPCY.webp",K$="/kids-house-game/assets/wc-gingerbread-PGlclkJ_.webp",X$="/kids-house-game/assets/wc-globe-lamp-DUCVl_3A.webp",J$="/kids-house-game/assets/wc-holiday-tree-CO0SBlqY.webp",e3="/kids-house-game/assets/wc-holly-CD8teo0a.webp",t3="/kids-house-game/assets/wc-ice-skates-D49y8YK1.webp",n3="/kids-house-game/assets/wc-ice-wardrobe-Dliflqpp.webp",s3="/kids-house-game/assets/wc-knit-armchair-84rhSw_8.webp",o3="/kids-house-game/assets/wc-lantern-81B3e5fN.webp",i3="/kids-house-game/assets/wc-log-bench-qQ1zT34_.webp",a3="/kids-house-game/assets/wc-marshmallow-jar-DeWRr-zf.webp",r3="/kids-house-game/assets/wc-mitten-line-sg-sweCl.webp",l3="/kids-house-game/assets/wc-mitten-ottoman-H5qkjso6.webp",c3="/kids-house-game/assets/wc-mug-shelf-DlWrwZYo.webp",d3="/kids-house-game/assets/wc-nutcracker-BGZe5tYy.webp",f3="/kids-house-game/assets/wc-penguin-chair-CDM1eIxo.webp",p3="/kids-house-game/assets/wc-penguin-plush-C8B27KcB.webp",h3="/kids-house-game/assets/wc-peppermint-counter-CPl6TA0h.webp",g3="/kids-house-game/assets/wc-peppermint-rug-3nakY_gB.webp",u3="/kids-house-game/assets/wc-pinecone-garland-s7ZWASw2.webp",m3="/kids-house-game/assets/wc-pinecone-table-DlJvjB-2.webp",y3="/kids-house-game/assets/wc-plaid-bed-eAhWKZdO.webp",b3="/kids-house-game/assets/wc-plaid-sofa-kvF30vEn.webp",k3="/kids-house-game/assets/wc-poinsettia-C-S-MDMu.webp",w3="/kids-house-game/assets/wc-polar-plush-BUVRTt7t.webp",v3="/kids-house-game/assets/wc-pom-rug-B-JF-heA.webp",_3="/kids-house-game/assets/wc-present-stack-Do2pEHLF.webp",$3="/kids-house-game/assets/wc-reindeer-CbKEp6CE.webp",x3="/kids-house-game/assets/wc-sled-table-Bd2cST9J.webp",M3="/kids-house-game/assets/wc-sleigh-planter-Bfcxvgbk.webp",L3="/kids-house-game/assets/wc-snow-globe-BcGMsnmh.webp",E3="/kids-house-game/assets/wc-snow-mobile-F06-kuT7.webp",C3="/kids-house-game/assets/wc-snow-nightstand-D6RhLncP.webp",S3="/kids-house-game/assets/wc-snow-window-dOxdYTSk.webp",P3="/kids-house-game/assets/wc-snowman-gxLBKnIO.webp",T3="/kids-house-game/assets/wc-snowshoes-CZcMT0Qx.webp",R3="/kids-house-game/assets/wc-sock-hamper-mesU3CG3.webp",B3="/kids-house-game/assets/wc-star-topper-c4tXfpV6.webp",A3="/kids-house-game/assets/wc-stocking-row-Dz0-4wTi.webp",D3="/kids-house-game/assets/wc-stone-hearth-1blXXfiH.webp",I3="/kids-house-game/assets/wc-twinkle-lamp-CYcQjW3A.webp",H3="/kids-house-game/assets/wc-twinkle-string-Olg29poj.webp",O3="/kids-house-game/assets/wc-window-seat-B7CwlRjl.webp",W3="/kids-house-game/assets/wc-woodstove-Cf0xJFnD.webp",U3="/kids-house-game/assets/cc-butter-polka-DGTIwtTO.png",V3="/kids-house-game/assets/cc-butter-polka-CmiHLPHI.svg",Q3="/kids-house-game/assets/cc-cream-hex-DMlsmhhY.png",z3="/kids-house-game/assets/cc-cream-hex-Bkf3o84Z.svg",q3="/kids-house-game/assets/cc-lavender-lattice-D6QyuSPi.png",Z3="/kids-house-game/assets/cc-lavender-lattice-DhxILx5n.svg",N3="/kids-house-game/assets/cc-lilac-gingham-C8gKChr3.png",F3="/kids-house-game/assets/cc-lilac-gingham-C-WPjvD8.svg",j3="/kids-house-game/assets/cc-mint-checks-Bj1xaUgE.png",G3="/kids-house-game/assets/cc-mint-checks-BKmyOLlr.svg",Y3="/kids-house-game/assets/cc-mint-florals-DubHlfkl.png",K3="/kids-house-game/assets/cc-mint-florals-Dz8qRBHw.svg",X3="/kids-house-game/assets/cc-peach-scallops-3xV_Pu-6.png",J3="/kids-house-game/assets/cc-peach-scallops-GPn_mXbS.svg",e5="/kids-house-game/assets/cc-pink-plaid-C9HKdB4f.png",t5="/kids-house-game/assets/cc-pink-plaid-VgppBwax.svg",n5="/kids-house-game/assets/cc-rag-planks-B67vRZlX.png",s5="/kids-house-game/assets/cc-rag-planks-C5Hombhc.svg",o5="/kids-house-game/assets/cc-rose-herringbone-Cmke3vGv.png",i5="/kids-house-game/assets/cc-rose-herringbone-CQRix6_f.svg",a5="/kids-house-game/assets/lilac-stripes-DcsSoVwO.png",r5="/kids-house-game/assets/lilac-stripes-yb9DhjTf.svg",l5="/kids-house-game/assets/lilac-terrazzo-DOghNP_d.png",c5="/kids-house-game/assets/lilac-terrazzo-8CaN2qhK.svg",d5="/kids-house-game/assets/mint-bubbles-DtsYAubK.png",f5="/kids-house-game/assets/mint-bubbles-BIQM5a2P.svg",p5="/kids-house-game/assets/pink-check-floor-DjPuYxlq.png",h5="/kids-house-game/assets/pink-check-floor-Cy9k3Fal.svg",g5="/kids-house-game/assets/pink-hearts-DP4TxPV5.png",u5="/kids-house-game/assets/pink-hearts-BpVCT-98.svg",m5="/kids-house-game/assets/cloud-sky-CbZL0zcC.svg",y5="/kids-house-game/assets/pastel-planks-BAcEss7w.svg",b5="/kids-house-game/assets/soft-carpet-BSwTSDW1.svg",k5="/kids-house-game/assets/star-sprinkle-5bH7qjW0.svg",w5="/kids-house-game/assets/tiny-hearts-C-RHlg1h.svg",v5="/kids-house-game/assets/butter-check-floor-yLFbEdi4.png",_5="/kids-house-game/assets/butter-check-floor-C8HdmZ0P.svg",$5="/kids-house-game/assets/mint-checks-7rTweT19.png",x5="/kids-house-game/assets/mint-checks-rWbOdhfH.svg",M5="/kids-house-game/assets/sky-clouds-9-shWk3w.png",L5="/kids-house-game/assets/sky-clouds-DUJlygwI.svg",E5="/kids-house-game/assets/sky-tiles-Cu-Ga741.png",C5="/kids-house-game/assets/sky-tiles-xxuodD5m.svg",S5="/kids-house-game/assets/sunny-stars-Bc3CbIvZ.png",P5="/kids-house-game/assets/sunny-stars-C6fsFX70.svg",T5="/kids-house-game/assets/leafy-cream-Cv5o-u-w.png",R5="/kids-house-game/assets/leafy-cream-WIcyLI1T.svg",B5="/kids-house-game/assets/orange-gingham-BjUerG-F.png",A5="/kids-house-game/assets/orange-gingham-CVNizWBt.svg",D5="/kids-house-game/assets/terracotta-tiles-dXqpLLce.png",I5="/kids-house-game/assets/terracotta-tiles-j3yOSRI7.svg",H5="/kids-house-game/assets/wood-panel-BGEVUu4R.png",O5="/kids-house-game/assets/wood-panel-Dob8WRpW.svg",W5="/kids-house-game/assets/wood-planks-vE8-OOXo.png",U5="/kids-house-game/assets/wood-planks-4TUYjAkF.svg",V5="/kids-house-game/assets/wc-cabin-planks-Icu9n6YO.webp",Q5="/kids-house-game/assets/wc-candy-stripe-cOBsT1Xj.webp",z5="/kids-house-game/assets/wc-frosty-dots-DmQgGwJW.webp",q5="/kids-house-game/assets/wc-mint-pine-5FYK_dVo.webp",Z5="/kids-house-game/assets/wc-peppermint-tiles-ChaNg2gF.webp",N5="/kids-house-game/assets/wc-red-plaid-CcQ3BMhN.webp",F5="/kids-house-game/assets/wc-snow-knit-DEFXSv74.webp",j5="/kids-house-game/assets/wc-snowflake-sky-DrRAdoDP.webp",Ef={small:80,medium:150,large:260},G5={"welcome-home":"Welcome Home","sunny-vibes":"Sunny Vibes",glossy:"Glossy",cottage:"Cozy Cottage",...Fm,...Km},Ch=e=>G5[e]??e.replace(/[-_]+/g," ").replace(/\b\w/g,t=>t.toUpperCase()),Y5=Object.assign({"../assets/items/manifest.json":ey,"../assets/patterns/manifest.json":ty}),Cf=Object.assign({"../assets/items/bedroom/alarm-clock.png":ny,"../assets/items/bedroom/alarm-clock.svg":sy,"../assets/items/bedroom/bedtime-snack.png":oy,"../assets/items/bedroom/bedtime-snack.svg":iy,"../assets/items/bedroom/book-stack.png":ay,"../assets/items/bedroom/book-stack.svg":ry,"../assets/items/bedroom/bunk-bed.png":ly,"../assets/items/bedroom/bunk-bed.svg":cy,"../assets/items/bedroom/bunny-slippers.png":dy,"../assets/items/bedroom/bunny-slippers.svg":fy,"../assets/items/bedroom/canopy-bed.png":py,"../assets/items/bedroom/canopy-bed.svg":hy,"../assets/items/bedroom/cat-bed.png":gy,"../assets/items/bedroom/cat-bed.svg":uy,"../assets/items/bedroom/cloud-rug.png":my,"../assets/items/bedroom/cloud-rug.svg":yy,"../assets/items/bedroom/cloud-shelf.png":by,"../assets/items/bedroom/cloud-shelf.svg":ky,"../assets/items/bedroom/cork-board.png":wy,"../assets/items/bedroom/cork-board.svg":vy,"../assets/items/bedroom/daisy-pot.png":_y,"../assets/items/bedroom/daisy-pot.svg":$y,"../assets/items/bedroom/desk.png":xy,"../assets/items/bedroom/desk.svg":My,"../assets/items/bedroom/dino-plush.png":Ly,"../assets/items/bedroom/dino-plush.svg":Ey,"../assets/items/bedroom/doll-house.png":Cy,"../assets/items/bedroom/doll-house.svg":Sy,"../assets/items/bedroom/dresser.png":Py,"../assets/items/bedroom/dresser.svg":Ty,"../assets/items/bedroom/egg-chair.png":Ry,"../assets/items/bedroom/egg-chair.svg":By,"../assets/items/bedroom/floor-fan.png":Ay,"../assets/items/bedroom/floor-fan.svg":Dy,"../assets/items/bedroom/guinea-pig.png":Iy,"../assets/items/bedroom/guinea-pig.svg":Hy,"../assets/items/bedroom/hamster-cage.png":Oy,"../assets/items/bedroom/hamster-cage.svg":Wy,"../assets/items/bedroom/heart-rug.png":Uy,"../assets/items/bedroom/heart-rug.svg":Vy,"../assets/items/bedroom/lava-lamp.png":Qy,"../assets/items/bedroom/lava-lamp.svg":zy,"../assets/items/bedroom/moon-night-light.png":qy,"../assets/items/bedroom/moon-night-light.svg":Zy,"../assets/items/bedroom/nightstand.png":Ny,"../assets/items/bedroom/nightstand.svg":Fy,"../assets/items/bedroom/paper-lantern.png":jy,"../assets/items/bedroom/paper-lantern.svg":Gy,"../assets/items/bedroom/piggy-bank.png":Yy,"../assets/items/bedroom/piggy-bank.svg":Ky,"../assets/items/bedroom/plant-stand.png":Xy,"../assets/items/bedroom/plant-stand.svg":Jy,"../assets/items/bedroom/play-tent.png":eb,"../assets/items/bedroom/play-tent.svg":tb,"../assets/items/bedroom/star-mobile.png":nb,"../assets/items/bedroom/star-mobile.svg":sb,"../assets/items/bedroom/toy-chest.png":ob,"../assets/items/bedroom/toy-chest.svg":ib,"../assets/items/bedroom/toy-robot.png":ab,"../assets/items/bedroom/toy-robot.svg":rb,"../assets/items/bedroom/toy-train.png":lb,"../assets/items/bedroom/toy-train.svg":cb,"../assets/items/bedroom/unicorn-plush.png":db,"../assets/items/bedroom/unicorn-plush.svg":fb,"../assets/items/bedroom/wardrobe.png":pb,"../assets/items/bedroom/wardrobe.svg":hb,"../assets/items/kitchen/bananas.png":gb,"../assets/items/kitchen/bananas.svg":ub,"../assets/items/kitchen/bar-stool.png":mb,"../assets/items/kitchen/bar-stool.svg":yb,"../assets/items/kitchen/bread-loaf.png":bb,"../assets/items/kitchen/bread-loaf.svg":kb,"../assets/items/kitchen/chick.png":wb,"../assets/items/kitchen/chick.svg":vb,"../assets/items/kitchen/china-hutch.png":_b,"../assets/items/kitchen/china-hutch.svg":$b,"../assets/items/kitchen/cocoa-mug.png":xb,"../assets/items/kitchen/cocoa-mug.svg":Mb,"../assets/items/kitchen/cookie-jar.png":Lb,"../assets/items/kitchen/cookie-jar.svg":Eb,"../assets/items/kitchen/cooking-pot.png":Cb,"../assets/items/kitchen/cooking-pot.svg":Sb,"../assets/items/kitchen/cupcake.png":Pb,"../assets/items/kitchen/cupcake.svg":Tb,"../assets/items/kitchen/dish-rack.png":Rb,"../assets/items/kitchen/dish-rack.svg":Bb,"../assets/items/kitchen/fruit-bowl.png":Ab,"../assets/items/kitchen/fruit-bowl.svg":Db,"../assets/items/kitchen/frying-pan.png":Ib,"../assets/items/kitchen/frying-pan.svg":Hb,"../assets/items/kitchen/happy-fridge.png":Ob,"../assets/items/kitchen/happy-fridge.svg":Wb,"../assets/items/kitchen/herb-box.png":Ub,"../assets/items/kitchen/herb-box.svg":Vb,"../assets/items/kitchen/high-chair.png":Qb,"../assets/items/kitchen/high-chair.svg":zb,"../assets/items/kitchen/ice-cream.png":qb,"../assets/items/kitchen/ice-cream.svg":Zb,"../assets/items/kitchen/kettle.png":Nb,"../assets/items/kitchen/kettle.svg":Fb,"../assets/items/kitchen/kitchen-counter.png":jb,"../assets/items/kitchen/kitchen-counter.svg":Gb,"../assets/items/kitchen/kitchen-sink.png":Yb,"../assets/items/kitchen/kitchen-sink.svg":Kb,"../assets/items/kitchen/lemon-tree.png":Xb,"../assets/items/kitchen/lemon-tree.svg":Jb,"../assets/items/kitchen/microwave.png":ek,"../assets/items/kitchen/microwave.svg":tk,"../assets/items/kitchen/milk-bottle.png":nk,"../assets/items/kitchen/milk-bottle.svg":sk,"../assets/items/kitchen/pancakes.png":ok,"../assets/items/kitchen/pancakes.svg":ik,"../assets/items/kitchen/pantry-shelf.png":ak,"../assets/items/kitchen/pantry-shelf.svg":rk,"../assets/items/kitchen/pendant-lamp.png":lk,"../assets/items/kitchen/pendant-lamp.svg":ck,"../assets/items/kitchen/pet-bowl.png":dk,"../assets/items/kitchen/pet-bowl.svg":fk,"../assets/items/kitchen/rice-cooker.png":pk,"../assets/items/kitchen/rice-cooker.svg":hk,"../assets/items/kitchen/runner-rug.png":gk,"../assets/items/kitchen/runner-rug.svg":uk,"../assets/items/kitchen/spice-rack.png":mk,"../assets/items/kitchen/spice-rack.svg":yk,"../assets/items/kitchen/stand-mixer.png":bk,"../assets/items/kitchen/stand-mixer.svg":kk,"../assets/items/kitchen/teapot.png":wk,"../assets/items/kitchen/teapot.svg":vk,"../assets/items/kitchen/toaster.png":_k,"../assets/items/kitchen/toaster.svg":$k,"../assets/items/kitchen/utensil-rail.png":xk,"../assets/items/kitchen/utensil-rail.svg":Mk,"../assets/items/kitchen/watermelon-slice.png":Lk,"../assets/items/kitchen/watermelon-slice.svg":Ek,"../assets/items/living/aquarium.png":Ck,"../assets/items/living/aquarium.svg":Sk,"../assets/items/living/arc-floor-lamp.png":Pk,"../assets/items/living/arc-floor-lamp.svg":Tk,"../assets/items/living/bean-bag.png":Rk,"../assets/items/living/bean-bag.svg":Bk,"../assets/items/living/bird-cage.png":Ak,"../assets/items/living/bird-cage.svg":Dk,"../assets/items/living/blanket-basket.png":Ik,"../assets/items/living/blanket-basket.svg":Hk,"../assets/items/living/building-blocks.png":Ok,"../assets/items/living/building-blocks.svg":Wk,"../assets/items/living/coffee-table.png":Uk,"../assets/items/living/coffee-table.svg":Vk,"../assets/items/living/comfy-armchair.png":Qk,"../assets/items/living/comfy-armchair.svg":zk,"../assets/items/living/cubby-shelf.png":qk,"../assets/items/living/cubby-shelf.svg":Zk,"../assets/items/living/daisy-rug.png":Nk,"../assets/items/living/daisy-rug.svg":Fk,"../assets/items/living/fiddle-leaf-fig.png":jk,"../assets/items/living/fiddle-leaf-fig.svg":Gk,"../assets/items/living/fireplace.png":Yk,"../assets/items/living/fireplace.svg":Kk,"../assets/items/living/globe.png":Xk,"../assets/items/living/globe.svg":Jk,"../assets/items/living/hanging-planter.png":ew,"../assets/items/living/hanging-planter.svg":tw,"../assets/items/living/monstera-plant.png":nw,"../assets/items/living/monstera-plant.svg":sw,"../assets/items/living/piano.png":ow,"../assets/items/living/piano.svg":iw,"../assets/items/living/popcorn.png":aw,"../assets/items/living/popcorn.svg":rw,"../assets/items/living/pouf.png":lw,"../assets/items/living/pouf.svg":cw,"../assets/items/living/rainbow-rug.png":dw,"../assets/items/living/rainbow-rug.svg":fw,"../assets/items/living/rainbow-wall-art.png":pw,"../assets/items/living/rainbow-wall-art.svg":hw,"../assets/items/living/retro-radio.png":gw,"../assets/items/living/retro-radio.svg":uw,"../assets/items/living/rocking-chair.png":mw,"../assets/items/living/rocking-chair.svg":yw,"../assets/items/living/rocking-horse.png":bw,"../assets/items/living/rocking-horse.svg":kw,"../assets/items/living/snake-plant.png":ww,"../assets/items/living/snake-plant.svg":vw,"../assets/items/living/string-lights.png":_w,"../assets/items/living/string-lights.svg":$w,"../assets/items/living/succulent-trio.png":xw,"../assets/items/living/succulent-trio.svg":Mw,"../assets/items/living/tassel-rug.png":Lw,"../assets/items/living/tassel-rug.svg":Ew,"../assets/items/living/throw-pillow.png":Cw,"../assets/items/living/throw-pillow.svg":Sw,"../assets/items/living/toy-car.png":Pw,"../assets/items/living/toy-car.svg":Tw,"../assets/items/living/tulip-vase.png":Rw,"../assets/items/living/tulip-vase.svg":Bw,"../assets/items/living/turtle.png":Aw,"../assets/items/living/turtle.svg":Dw,"../assets/items/living/tv-stand.png":Iw,"../assets/items/living/tv-stand.svg":Hw,"../assets/items/living/wall-shelf.png":Ow,"../assets/items/living/wall-shelf.svg":Ww,"../assets/items/packs/cottage/cc-bakery-shelf.png":Uw,"../assets/items/packs/cottage/cc-bakery-shelf.svg":Vw,"../assets/items/packs/cottage/cc-breakfast-table.png":Qw,"../assets/items/packs/cottage/cc-breakfast-table.svg":zw,"../assets/items/packs/cottage/cc-bubble-chair.png":qw,"../assets/items/packs/cottage/cc-bubble-chair.svg":Zw,"../assets/items/packs/cottage/cc-canopy-daybed.png":Nw,"../assets/items/packs/cottage/cc-canopy-daybed.svg":Fw,"../assets/items/packs/cottage/cc-cloud-beanbag.png":jw,"../assets/items/packs/cottage/cc-cloud-beanbag.svg":Gw,"../assets/items/packs/cottage/cc-cloud-lamp.png":Yw,"../assets/items/packs/cottage/cc-cloud-lamp.svg":Kw,"../assets/items/packs/cottage/cc-cottage-aquarium.png":Xw,"../assets/items/packs/cottage/cc-cottage-aquarium.svg":Jw,"../assets/items/packs/cottage/cc-cupcake-stand.png":e4,"../assets/items/packs/cottage/cc-cupcake-stand.svg":t4,"../assets/items/packs/cottage/cc-dryer-chair.png":n4,"../assets/items/packs/cottage/cc-dryer-chair.svg":s4,"../assets/items/packs/cottage/cc-fairy-garland.png":o4,"../assets/items/packs/cottage/cc-fairy-garland.svg":i4,"../assets/items/packs/cottage/cc-fairy-shelf.png":a4,"../assets/items/packs/cottage/cc-fairy-shelf.svg":r4,"../assets/items/packs/cottage/cc-flower-kettle.png":l4,"../assets/items/packs/cottage/cc-flower-kettle.svg":c4,"../assets/items/packs/cottage/cc-flower-lamp.png":d4,"../assets/items/packs/cottage/cc-flower-lamp.svg":f4,"../assets/items/packs/cottage/cc-heart-bed.png":p4,"../assets/items/packs/cottage/cc-heart-bed.svg":h4,"../assets/items/packs/cottage/cc-heart-clock.png":g4,"../assets/items/packs/cottage/cc-heart-clock.svg":u4,"../assets/items/packs/cottage/cc-heart-pouf.png":m4,"../assets/items/packs/cottage/cc-heart-pouf.svg":y4,"../assets/items/packs/cottage/cc-heart-rug.png":b4,"../assets/items/packs/cottage/cc-heart-rug.svg":k4,"../assets/items/packs/cottage/cc-jewel-box.png":w4,"../assets/items/packs/cottage/cc-jewel-box.svg":v4,"../assets/items/packs/cottage/cc-light-vanity.png":_4,"../assets/items/packs/cottage/cc-light-vanity.svg":$4,"../assets/items/packs/cottage/cc-macaron-jar.png":x4,"../assets/items/packs/cottage/cc-macaron-jar.svg":M4,"../assets/items/packs/cottage/cc-macrame-swing.png":L4,"../assets/items/packs/cottage/cc-macrame-swing.svg":E4,"../assets/items/packs/cottage/cc-mani-chair.png":C4,"../assets/items/packs/cottage/cc-mani-chair.svg":S4,"../assets/items/packs/cottage/cc-mint-fridge.png":P4,"../assets/items/packs/cottage/cc-mint-fridge.svg":T4,"../assets/items/packs/cottage/cc-mushroom-stool.png":R4,"../assets/items/packs/cottage/cc-mushroom-stool.svg":B4,"../assets/items/packs/cottage/cc-pastel-range.png":A4,"../assets/items/packs/cottage/cc-pastel-range.svg":D4,"../assets/items/packs/cottage/cc-perfume-tray.png":I4,"../assets/items/packs/cottage/cc-perfume-tray.svg":H4,"../assets/items/packs/cottage/cc-petal-table.png":O4,"../assets/items/packs/cottage/cc-petal-table.svg":W4,"../assets/items/packs/cottage/cc-plant-wall.png":U4,"../assets/items/packs/cottage/cc-plant-wall.svg":V4,"../assets/items/packs/cottage/cc-reading-nook.png":Q4,"../assets/items/packs/cottage/cc-reading-nook.svg":z4,"../assets/items/packs/cottage/cc-record-player.png":q4,"../assets/items/packs/cottage/cc-record-player.svg":Z4,"../assets/items/packs/cottage/cc-ribbon-mirror.png":N4,"../assets/items/packs/cottage/cc-ribbon-mirror.svg":F4,"../assets/items/packs/cottage/cc-scallop-curtains.png":j4,"../assets/items/packs/cottage/cc-scallop-curtains.svg":G4,"../assets/items/packs/cottage/cc-scallop-loveseat.png":Y4,"../assets/items/packs/cottage/cc-scallop-loveseat.svg":K4,"../assets/items/packs/cottage/cc-star-dresser.png":X4,"../assets/items/packs/cottage/cc-star-dresser.svg":J4,"../assets/items/packs/cottage/cc-teapot-set.png":e6,"../assets/items/packs/cottage/cc-teapot-set.svg":t6,"../assets/items/packs/cottage/cc-window-seat.png":n6,"../assets/items/packs/cottage/cc-window-seat.svg":s6,"../assets/items/packs/glossy/arched-shelf.png":o6,"../assets/items/packs/glossy/arched-shelf.svg":i6,"../assets/items/packs/glossy/blob-rug.png":a6,"../assets/items/packs/glossy/blob-rug.svg":r6,"../assets/items/packs/glossy/bubbly-plant.png":l6,"../assets/items/packs/glossy/bubbly-plant.svg":c6,"../assets/items/packs/glossy/bud-vase.png":d6,"../assets/items/packs/glossy/bud-vase.svg":f6,"../assets/items/packs/glossy/comb-brush.png":p6,"../assets/items/packs/glossy/comb-brush.svg":h6,"../assets/items/packs/glossy/cream-jars.png":g6,"../assets/items/packs/glossy/cream-jars.svg":u6,"../assets/items/packs/glossy/drop-lamp.png":m6,"../assets/items/packs/glossy/drop-lamp.svg":y6,"../assets/items/packs/glossy/droplet-buddy.png":b6,"../assets/items/packs/glossy/droplet-buddy.svg":k6,"../assets/items/packs/glossy/fancy-sofa.png":w6,"../assets/items/packs/glossy/fancy-sofa.svg":v6,"../assets/items/packs/glossy/flower-cart.png":_6,"../assets/items/packs/glossy/flower-cart.svg":$6,"../assets/items/packs/glossy/foot-spa.png":x6,"../assets/items/packs/glossy/foot-spa.svg":M6,"../assets/items/packs/glossy/globe-pendants.png":L6,"../assets/items/packs/glossy/globe-pendants.svg":E6,"../assets/items/packs/glossy/glow-mirror.png":C6,"../assets/items/packs/glossy/glow-mirror.svg":S6,"../assets/items/packs/glossy/gold-floor-mirror.png":P6,"../assets/items/packs/glossy/gold-floor-mirror.svg":T6,"../assets/items/packs/glossy/hair-dryer.png":R6,"../assets/items/packs/glossy/hair-dryer.svg":B6,"../assets/items/packs/glossy/heart-plant.png":A6,"../assets/items/packs/glossy/heart-plant.svg":D6,"../assets/items/packs/glossy/heart-pouf.png":I6,"../assets/items/packs/glossy/heart-pouf.svg":H6,"../assets/items/packs/glossy/lilac-curtain.png":O6,"../assets/items/packs/glossy/lilac-curtain.svg":W6,"../assets/items/packs/glossy/lotion-trio.png":U6,"../assets/items/packs/glossy/lotion-trio.svg":V6,"../assets/items/packs/glossy/mani-lamp.png":Q6,"../assets/items/packs/glossy/mani-lamp.svg":z6,"../assets/items/packs/glossy/nail-table.png":q6,"../assets/items/packs/glossy/nail-table.svg":Z6,"../assets/items/packs/glossy/pebble-rug.png":N6,"../assets/items/packs/glossy/pebble-rug.svg":F6,"../assets/items/packs/glossy/perfume-bottle.png":j6,"../assets/items/packs/glossy/perfume-bottle.svg":G6,"../assets/items/packs/glossy/pink-fountain.png":Y6,"../assets/items/packs/glossy/pink-fountain.svg":K6,"../assets/items/packs/glossy/pink-vanity.png":X6,"../assets/items/packs/glossy/pink-vanity.svg":J6,"../assets/items/packs/glossy/polish-bottle.png":ev,"../assets/items/packs/glossy/polish-bottle.svg":tv,"../assets/items/packs/glossy/polish-rack.png":nv,"../assets/items/packs/glossy/polish-rack.svg":sv,"../assets/items/packs/glossy/reception-desk.png":ov,"../assets/items/packs/glossy/reception-desk.svg":iv,"../assets/items/packs/glossy/salon-chair.png":av,"../assets/items/packs/glossy/salon-chair.svg":rv,"../assets/items/packs/glossy/scent-candle.png":lv,"../assets/items/packs/glossy/scent-candle.svg":cv,"../assets/items/packs/glossy/spray-bottle.png":dv,"../assets/items/packs/glossy/spray-bottle.svg":fv,"../assets/items/packs/glossy/star-wall-sign.png":pv,"../assets/items/packs/glossy/star-wall-sign.svg":hv,"../assets/items/packs/glossy/swivel-stool.png":gv,"../assets/items/packs/glossy/swivel-stool.svg":uv,"../assets/items/packs/glossy/tiered-tray.png":mv,"../assets/items/packs/glossy/tiered-tray.svg":yv,"../assets/items/packs/glossy/towel-cart.png":bv,"../assets/items/packs/glossy/towel-cart.svg":kv,"../assets/items/packs/glossy/towel-stack.png":wv,"../assets/items/packs/glossy/towel-stack.svg":vv,"../assets/items/packs/glossy/vine-planter.png":_v,"../assets/items/packs/glossy/vine-planter.svg":$v,"../assets/items/packs/glossy/waiting-bench.png":xv,"../assets/items/packs/glossy/waiting-bench.svg":Mv,"../assets/items/packs/glossy/wash-chair.png":Lv,"../assets/items/packs/glossy/wash-chair.svg":Ev,"../assets/items/packs/halloween/hw-candy-bowl.webp":Cv,"../assets/items/packs/halloween/hw-cat-statue.webp":Sv,"../assets/items/packs/halloween/hw-cauldron.webp":Pv,"../assets/items/packs/halloween/hw-ghost-sheet.webp":Tv,"../assets/items/packs/halloween/hw-hay-bale.webp":Rv,"../assets/items/packs/halloween/hw-heart-pumpkin.webp":Bv,"../assets/items/packs/halloween/hw-leaf-garland.webp":Av,"../assets/items/packs/halloween/hw-moon-cling.webp":Dv,"../assets/items/packs/halloween/hw-moon-lantern.webp":Iv,"../assets/items/packs/halloween/hw-star-pumpkin.webp":Hv,"../assets/items/packs/halloween/hw-witch-hat.webp":Ov,"../assets/items/packs/sunny-vibes/arched-mirror.png":Wv,"../assets/items/packs/sunny-vibes/arched-mirror.svg":Uv,"../assets/items/packs/sunny-vibes/big-monitor.png":Vv,"../assets/items/packs/sunny-vibes/big-monitor.svg":Qv,"../assets/items/packs/sunny-vibes/boba-cup.png":zv,"../assets/items/packs/sunny-vibes/boba-cup.svg":qv,"../assets/items/packs/sunny-vibes/bubble-bath.png":Zv,"../assets/items/packs/sunny-vibes/bubble-bath.svg":Nv,"../assets/items/packs/sunny-vibes/cactus-buddy.png":Fv,"../assets/items/packs/sunny-vibes/cactus-buddy.svg":jv,"../assets/items/packs/sunny-vibes/caterpillar-plush.png":Gv,"../assets/items/packs/sunny-vibes/caterpillar-plush.svg":Yv,"../assets/items/packs/sunny-vibes/checker-bed.png":Kv,"../assets/items/packs/sunny-vibes/checker-bed.svg":Xv,"../assets/items/packs/sunny-vibes/checker-rug.png":Jv,"../assets/items/packs/sunny-vibes/checker-rug.svg":e_,"../assets/items/packs/sunny-vibes/clothes-rail.png":t_,"../assets/items/packs/sunny-vibes/clothes-rail.svg":n_,"../assets/items/packs/sunny-vibes/cloud-sofa.png":s_,"../assets/items/packs/sunny-vibes/cloud-sofa.svg":o_,"../assets/items/packs/sunny-vibes/cube-shelf.png":i_,"../assets/items/packs/sunny-vibes/cube-shelf.svg":a_,"../assets/items/packs/sunny-vibes/curvy-desk.png":r_,"../assets/items/packs/sunny-vibes/curvy-desk.svg":l_,"../assets/items/packs/sunny-vibes/cute-speaker.png":c_,"../assets/items/packs/sunny-vibes/cute-speaker.svg":d_,"../assets/items/packs/sunny-vibes/desk-lamp.png":f_,"../assets/items/packs/sunny-vibes/desk-lamp.svg":p_,"../assets/items/packs/sunny-vibes/desk-mic.png":h_,"../assets/items/packs/sunny-vibes/desk-mic.svg":g_,"../assets/items/packs/sunny-vibes/flower-lamp.png":u_,"../assets/items/packs/sunny-vibes/flower-lamp.svg":m_,"../assets/items/packs/sunny-vibes/frog-plush.png":y_,"../assets/items/packs/sunny-vibes/frog-plush.svg":b_,"../assets/items/packs/sunny-vibes/game-controller.png":k_,"../assets/items/packs/sunny-vibes/game-controller.svg":w_,"../assets/items/packs/sunny-vibes/gaming-chair.png":v_,"../assets/items/packs/sunny-vibes/gaming-chair.svg":__,"../assets/items/packs/sunny-vibes/hamster-pet.png":$_,"../assets/items/packs/sunny-vibes/hamster-pet.svg":x_,"../assets/items/packs/sunny-vibes/headphones.png":M_,"../assets/items/packs/sunny-vibes/headphones.svg":L_,"../assets/items/packs/sunny-vibes/heart-light.png":E_,"../assets/items/packs/sunny-vibes/heart-light.svg":C_,"../assets/items/packs/sunny-vibes/keyboard.png":S_,"../assets/items/packs/sunny-vibes/keyboard.svg":P_,"../assets/items/packs/sunny-vibes/mini-fridge.png":T_,"../assets/items/packs/sunny-vibes/mini-fridge.svg":R_,"../assets/items/packs/sunny-vibes/pastel-wardrobe.png":B_,"../assets/items/packs/sunny-vibes/pastel-wardrobe.svg":A_,"../assets/items/packs/sunny-vibes/phone-stand.png":D_,"../assets/items/packs/sunny-vibes/phone-stand.svg":I_,"../assets/items/packs/sunny-vibes/pothos-plant.png":H_,"../assets/items/packs/sunny-vibes/pothos-plant.svg":O_,"../assets/items/packs/sunny-vibes/puffy-stool.png":W_,"../assets/items/packs/sunny-vibes/puffy-stool.svg":U_,"../assets/items/packs/sunny-vibes/ring-light.png":V_,"../assets/items/packs/sunny-vibes/ring-light.svg":Q_,"../assets/items/packs/sunny-vibes/side-table-round.png":z_,"../assets/items/packs/sunny-vibes/side-table-round.svg":q_,"../assets/items/packs/sunny-vibes/star-lamp.png":Z_,"../assets/items/packs/sunny-vibes/star-lamp.svg":N_,"../assets/items/packs/sunny-vibes/sticker-board.png":F_,"../assets/items/packs/sunny-vibes/sticker-board.svg":j_,"../assets/items/packs/sunny-vibes/sunny-art.png":G_,"../assets/items/packs/sunny-vibes/sunny-art.svg":Y_,"../assets/items/packs/sunny-vibes/sv-bean-bag.png":K_,"../assets/items/packs/sunny-vibes/sv-bean-bag.svg":X_,"../assets/items/packs/sunny-vibes/sv-cloud-rug.png":J_,"../assets/items/packs/sunny-vibes/sv-cloud-rug.svg":e8,"../assets/items/packs/sunny-vibes/sv-wall-shelf.png":t8,"../assets/items/packs/sunny-vibes/sv-wall-shelf.svg":n8,"../assets/items/packs/sunny-vibes/vlog-camera.png":s8,"../assets/items/packs/sunny-vibes/vlog-camera.svg":o8,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.png":i8,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.svg":a8,"../assets/items/packs/welcome-home/acorn-friend.png":r8,"../assets/items/packs/welcome-home/acorn-friend.svg":l8,"../assets/items/packs/welcome-home/apple-tree.png":c8,"../assets/items/packs/welcome-home/apple-tree.svg":d8,"../assets/items/packs/welcome-home/big-wardrobe.png":f8,"../assets/items/packs/welcome-home/big-wardrobe.svg":p8,"../assets/items/packs/welcome-home/box-stack.png":h8,"../assets/items/packs/welcome-home/box-stack.svg":g8,"../assets/items/packs/welcome-home/brick-fireplace.png":u8,"../assets/items/packs/welcome-home/brick-fireplace.svg":m8,"../assets/items/packs/welcome-home/bulletin-board.png":y8,"../assets/items/packs/welcome-home/bulletin-board.svg":b8,"../assets/items/packs/welcome-home/cozy-mug.png":k8,"../assets/items/packs/welcome-home/cozy-mug.svg":w8,"../assets/items/packs/welcome-home/cream-sofa.png":v8,"../assets/items/packs/welcome-home/cream-sofa.svg":_8,"../assets/items/packs/welcome-home/fire-pit.png":$8,"../assets/items/packs/welcome-home/fire-pit.svg":x8,"../assets/items/packs/welcome-home/glass-cabinet.png":M8,"../assets/items/packs/welcome-home/glass-cabinet.svg":L8,"../assets/items/packs/welcome-home/hanging-lantern.png":E8,"../assets/items/packs/welcome-home/hanging-lantern.svg":C8,"../assets/items/packs/welcome-home/knit-cushion.png":S8,"../assets/items/packs/welcome-home/knit-cushion.svg":P8,"../assets/items/packs/welcome-home/ladder-shelf.png":T8,"../assets/items/packs/welcome-home/ladder-shelf.svg":R8,"../assets/items/packs/welcome-home/landscape-art.png":B8,"../assets/items/packs/welcome-home/landscape-art.svg":A8,"../assets/items/packs/welcome-home/lattice-bench.png":D8,"../assets/items/packs/welcome-home/lattice-bench.svg":I8,"../assets/items/packs/welcome-home/leaf-wreath.png":H8,"../assets/items/packs/welcome-home/leaf-wreath.svg":O8,"../assets/items/packs/welcome-home/mini-greenhouse.png":W8,"../assets/items/packs/welcome-home/mini-greenhouse.svg":U8,"../assets/items/packs/welcome-home/moving-box.png":V8,"../assets/items/packs/welcome-home/moving-box.svg":Q8,"../assets/items/packs/welcome-home/picnic-basket.png":z8,"../assets/items/packs/welcome-home/picnic-basket.svg":q8,"../assets/items/packs/welcome-home/round-rug.png":Z8,"../assets/items/packs/welcome-home/round-rug.svg":N8,"../assets/items/packs/welcome-home/sale-sign.png":F8,"../assets/items/packs/welcome-home/sale-sign.svg":j8,"../assets/items/packs/welcome-home/sprout-pot.png":G8,"../assets/items/packs/welcome-home/sprout-pot.svg":Y8,"../assets/items/packs/welcome-home/stripe-runner.png":K8,"../assets/items/packs/welcome-home/stripe-runner.svg":X8,"../assets/items/packs/welcome-home/trailing-plant.png":J8,"../assets/items/packs/welcome-home/trailing-plant.svg":e$,"../assets/items/packs/welcome-home/wall-clock.png":t$,"../assets/items/packs/welcome-home/wall-clock.svg":n$,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.png":s$,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.svg":o$,"../assets/items/packs/welcome-home/wh-book-stack.png":i$,"../assets/items/packs/welcome-home/wh-book-stack.svg":a$,"../assets/items/packs/welcome-home/wh-dresser.png":r$,"../assets/items/packs/welcome-home/wh-dresser.svg":l$,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.png":c$,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.svg":d$,"../assets/items/packs/welcome-home/wh-kitchen-counter.png":f$,"../assets/items/packs/welcome-home/wh-kitchen-counter.svg":p$,"../assets/items/packs/welcome-home/wh-nightstand.png":h$,"../assets/items/packs/welcome-home/wh-nightstand.svg":g$,"../assets/items/packs/welcome-home/wh-pendant-lamp.png":u$,"../assets/items/packs/welcome-home/wh-pendant-lamp.svg":m$,"../assets/items/packs/welcome-home/wh-snake-plant.png":y$,"../assets/items/packs/welcome-home/wh-snake-plant.svg":b$,"../assets/items/packs/welcome-home/wh-string-lights.png":k$,"../assets/items/packs/welcome-home/wh-string-lights.svg":w$,"../assets/items/packs/welcome-home/wh-teapot.png":v$,"../assets/items/packs/welcome-home/wh-teapot.svg":_$,"../assets/items/packs/welcome-home/wood-armchair.png":$$,"../assets/items/packs/welcome-home/wood-armchair.svg":x$,"../assets/items/packs/welcome-home/wood-bookshelf.png":M$,"../assets/items/packs/welcome-home/wood-bookshelf.svg":L$,"../assets/items/packs/welcome-home/wood-coffee-table.png":E$,"../assets/items/packs/welcome-home/wood-coffee-table.svg":C$,"../assets/items/packs/welcome-home/wood-desk.png":S$,"../assets/items/packs/welcome-home/wood-desk.svg":P$,"../assets/items/packs/welcome-home/wood-stool.png":T$,"../assets/items/packs/welcome-home/wood-stool.svg":R$,"../assets/items/packs/welcome-home/wooden-bed.png":B$,"../assets/items/packs/welcome-home/wooden-bed.svg":A$,"../assets/items/packs/winter/wc-bauble-garland.webp":D$,"../assets/items/packs/winter/wc-berry-wreath.webp":I$,"../assets/items/packs/winter/wc-birch-basket.webp":H$,"../assets/items/packs/winter/wc-cabin-picture.webp":O$,"../assets/items/packs/winter/wc-candle-trio.webp":W$,"../assets/items/packs/winter/wc-cane-lamp.webp":U$,"../assets/items/packs/winter/wc-cinnamon-tray.webp":V$,"../assets/items/packs/winter/wc-cocoa-cart.webp":Q$,"../assets/items/packs/winter/wc-cocoa-mug.webp":z$,"../assets/items/packs/winter/wc-cocoa-pot.webp":q$,"../assets/items/packs/winter/wc-cookie-oven.webp":Z$,"../assets/items/packs/winter/wc-cookie-plate.webp":N$,"../assets/items/packs/winter/wc-frost-bookcase.webp":F$,"../assets/items/packs/winter/wc-frosted-pine.webp":j$,"../assets/items/packs/winter/wc-fur-bench.webp":G$,"../assets/items/packs/winter/wc-gingerbread-village.webp":Y$,"../assets/items/packs/winter/wc-gingerbread.webp":K$,"../assets/items/packs/winter/wc-globe-lamp.webp":X$,"../assets/items/packs/winter/wc-holiday-tree.webp":J$,"../assets/items/packs/winter/wc-holly.webp":e3,"../assets/items/packs/winter/wc-ice-skates.webp":t3,"../assets/items/packs/winter/wc-ice-wardrobe.webp":n3,"../assets/items/packs/winter/wc-knit-armchair.webp":s3,"../assets/items/packs/winter/wc-lantern.webp":o3,"../assets/items/packs/winter/wc-log-bench.webp":i3,"../assets/items/packs/winter/wc-marshmallow-jar.webp":a3,"../assets/items/packs/winter/wc-mitten-line.webp":r3,"../assets/items/packs/winter/wc-mitten-ottoman.webp":l3,"../assets/items/packs/winter/wc-mug-shelf.webp":c3,"../assets/items/packs/winter/wc-nutcracker.webp":d3,"../assets/items/packs/winter/wc-penguin-chair.webp":f3,"../assets/items/packs/winter/wc-penguin-plush.webp":p3,"../assets/items/packs/winter/wc-peppermint-counter.webp":h3,"../assets/items/packs/winter/wc-peppermint-rug.webp":g3,"../assets/items/packs/winter/wc-pinecone-garland.webp":u3,"../assets/items/packs/winter/wc-pinecone-table.webp":m3,"../assets/items/packs/winter/wc-plaid-bed.webp":y3,"../assets/items/packs/winter/wc-plaid-sofa.webp":b3,"../assets/items/packs/winter/wc-poinsettia.webp":k3,"../assets/items/packs/winter/wc-polar-plush.webp":w3,"../assets/items/packs/winter/wc-pom-rug.webp":v3,"../assets/items/packs/winter/wc-present-stack.webp":_3,"../assets/items/packs/winter/wc-reindeer.webp":$3,"../assets/items/packs/winter/wc-sled-table.webp":x3,"../assets/items/packs/winter/wc-sleigh-planter.webp":M3,"../assets/items/packs/winter/wc-snow-globe.webp":L3,"../assets/items/packs/winter/wc-snow-mobile.webp":E3,"../assets/items/packs/winter/wc-snow-nightstand.webp":C3,"../assets/items/packs/winter/wc-snow-window.webp":S3,"../assets/items/packs/winter/wc-snowman.webp":P3,"../assets/items/packs/winter/wc-snowshoes.webp":T3,"../assets/items/packs/winter/wc-sock-hamper.webp":R3,"../assets/items/packs/winter/wc-star-topper.webp":B3,"../assets/items/packs/winter/wc-stocking-row.webp":A3,"../assets/items/packs/winter/wc-stone-hearth.webp":D3,"../assets/items/packs/winter/wc-twinkle-lamp.webp":I3,"../assets/items/packs/winter/wc-twinkle-string.webp":H3,"../assets/items/packs/winter/wc-window-seat.webp":O3,"../assets/items/packs/winter/wc-woodstove.webp":W3}),Sf=Object.assign({"../assets/patterns/cottage/cc-butter-polka.png":U3,"../assets/patterns/cottage/cc-butter-polka.svg":V3,"../assets/patterns/cottage/cc-cream-hex.png":Q3,"../assets/patterns/cottage/cc-cream-hex.svg":z3,"../assets/patterns/cottage/cc-lavender-lattice.png":q3,"../assets/patterns/cottage/cc-lavender-lattice.svg":Z3,"../assets/patterns/cottage/cc-lilac-gingham.png":N3,"../assets/patterns/cottage/cc-lilac-gingham.svg":F3,"../assets/patterns/cottage/cc-mint-checks.png":j3,"../assets/patterns/cottage/cc-mint-checks.svg":G3,"../assets/patterns/cottage/cc-mint-florals.png":Y3,"../assets/patterns/cottage/cc-mint-florals.svg":K3,"../assets/patterns/cottage/cc-peach-scallops.png":X3,"../assets/patterns/cottage/cc-peach-scallops.svg":J3,"../assets/patterns/cottage/cc-pink-plaid.png":e5,"../assets/patterns/cottage/cc-pink-plaid.svg":t5,"../assets/patterns/cottage/cc-rag-planks.png":n5,"../assets/patterns/cottage/cc-rag-planks.svg":s5,"../assets/patterns/cottage/cc-rose-herringbone.png":o5,"../assets/patterns/cottage/cc-rose-herringbone.svg":i5,"../assets/patterns/glossy/lilac-stripes.png":a5,"../assets/patterns/glossy/lilac-stripes.svg":r5,"../assets/patterns/glossy/lilac-terrazzo.png":l5,"../assets/patterns/glossy/lilac-terrazzo.svg":c5,"../assets/patterns/glossy/mint-bubbles.png":d5,"../assets/patterns/glossy/mint-bubbles.svg":f5,"../assets/patterns/glossy/pink-check-floor.png":p5,"../assets/patterns/glossy/pink-check-floor.svg":h5,"../assets/patterns/glossy/pink-hearts.png":g5,"../assets/patterns/glossy/pink-hearts.svg":u5,"../assets/patterns/nursery/cloud-sky.svg":m5,"../assets/patterns/nursery/pastel-planks.svg":y5,"../assets/patterns/nursery/soft-carpet.svg":b5,"../assets/patterns/nursery/star-sprinkle.svg":k5,"../assets/patterns/nursery/tiny-hearts.svg":w5,"../assets/patterns/sunny-vibes/butter-check-floor.png":v5,"../assets/patterns/sunny-vibes/butter-check-floor.svg":_5,"../assets/patterns/sunny-vibes/mint-checks.png":$5,"../assets/patterns/sunny-vibes/mint-checks.svg":x5,"../assets/patterns/sunny-vibes/sky-clouds.png":M5,"../assets/patterns/sunny-vibes/sky-clouds.svg":L5,"../assets/patterns/sunny-vibes/sky-tiles.png":E5,"../assets/patterns/sunny-vibes/sky-tiles.svg":C5,"../assets/patterns/sunny-vibes/sunny-stars.png":S5,"../assets/patterns/sunny-vibes/sunny-stars.svg":P5,"../assets/patterns/welcome-home/leafy-cream.png":T5,"../assets/patterns/welcome-home/leafy-cream.svg":R5,"../assets/patterns/welcome-home/orange-gingham.png":B5,"../assets/patterns/welcome-home/orange-gingham.svg":A5,"../assets/patterns/welcome-home/terracotta-tiles.png":D5,"../assets/patterns/welcome-home/terracotta-tiles.svg":I5,"../assets/patterns/welcome-home/wood-panel.png":H5,"../assets/patterns/welcome-home/wood-panel.svg":O5,"../assets/patterns/welcome-home/wood-planks.png":W5,"../assets/patterns/welcome-home/wood-planks.svg":U5,"../assets/patterns/winter/wc-cabin-planks.webp":V5,"../assets/patterns/winter/wc-candy-stripe.webp":Q5,"../assets/patterns/winter/wc-frosty-dots.webp":z5,"../assets/patterns/winter/wc-mint-pine.webp":q5,"../assets/patterns/winter/wc-peppermint-tiles.webp":Z5,"../assets/patterns/winter/wc-red-plaid.webp":N5,"../assets/patterns/winter/wc-snow-knit.webp":F5,"../assets/patterns/winter/wc-snowflake-sky.webp":j5});function K5(e,t){if(!e||!e.trim())return[];try{const n=JSON.parse(e);return(Array.isArray(n)?n:[...Array.isArray(n?.items)?n.items:[],...Array.isArray(n?.patterns)?n.patterns:[]]).filter(o=>o&&typeof o.slug=="string"&&o.slug.trim())}catch(n){return console.warn(`[packs] ${t} is not valid JSON; ignoring`,n),[]}}const Sh=Object.entries(Y5).flatMap(([e,t])=>K5(t,e)),X5=["svg","png","webp","SVG","PNG","WEBP"];function Ph(e,t,n,s){for(const i of X5){const a=e[`../assets/${t}/${n}/${s}.${i}`];if(a)return a}const o=Object.keys(e).find(i=>i.split("/").pop().replace(/\.\w+$/,"")===s);return o?e[o]:void 0}const Pf={furniture:"furniture",appliance:"furniture",appliances:"furniture",seating:"furniture",storage:"furniture",bed:"furniture",table:"furniture",decor:"decor",rug:"decor",rugs:"decor",lighting:"decor",light:"decor",lamp:"decor",toy:"decor",toys:"decor","wall-art":"decor",art:"decor",beauty:"decor",plant:"plants",plants:"plants",flower:"plants",flowers:"plants",food:"food",drink:"food",drinks:"food",snack:"food",pet:"pets",pets:"pets",animal:"pets",animals:"pets"};function J5(e){const t=typeof e=="string"?e.trim().toLowerCase():"";return Pf[t]??Pf[t.replace(/s$/,"")]??"decor"}const go=(e,t)=>typeof e=="string"&&e.trim()?e.trim().toLowerCase():t,Th=e=>["wallpaper","floor"].includes(go(e.type,"")),Tf=new Set,ex=Sh.filter(e=>!Th(e)).flatMap(e=>{const t=go(e.room,"any"),n=e.slug.trim();if(Tf.has(n))return[];Tf.add(n);const o=[e.svg,e.png].filter(g=>typeof g=="string").map(g=>Cf["../assets/items/"+g.replace(/^\.?\//,"")]).find(Boolean)??Ph(Cf,"items",t,n);if(!o)return console.warn(`[packs] no image for items/${t}/${n}`),[];const i=go(e.pack,""),a=go(e.size,"medium"),r=J5(e.category),l=typeof e.gameW=="number"&&e.gameW>20&&e.gameW<800?e.gameW:Ef[a]??Ef.medium,c=typeof e.widthUnits=="number"&&typeof e.heightUnits=="number"&&e.widthUnits>0&&e.heightUnits>0?e.heightUnits/e.widthUnits:1,d=Math.round(l*Math.min(4,Math.max(.2,c))),f=typeof e.holdable=="boolean"?e.holdable:a!=="large"&&r!=="furniture",h=e.tag==="lighting"||/lamp|light|lantern|candle/i.test(n);return[{kind:`pack:${n}`,name:e.name||n,cat:r,rooms:[t],w:l,h:d,wall:e.wall===!0||void 0,svg:"",img:o,pack:i||void 0,holdable:f,light:h||void 0}]}),Gl=Sh.filter(Th).flatMap(e=>{const t=go(e.pack,"extra"),n=e.slug.trim(),o=[e.svg,e.png].filter(i=>typeof i=="string").map(i=>Sf["../assets/patterns/"+i.replace(/^\.?\//,"")]).find(Boolean)??Ph(Sf,"patterns",t,n);return o?[{id:`${t}/${n}`,name:e.name||n,pack:t,kind:go(e.type,"wallpaper"),url:o}]:(console.warn(`[packs] no image for patterns/${t}/${n}`),[])}),Rf=Object.fromEntries(Gl.map(e=>[e.id,e])),Ln="#5a3d5c",D=`stroke="${Ln}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Rh=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="2.4" fill="${Ln}"/><circle cx="${t}" cy="${n}" r="2.4" fill="${Ln}"/><circle cx="${e+.8}" cy="${n-.8}" r=".8" fill="#fff"/><circle cx="${t+.8}" cy="${n-.8}" r=".8" fill="#fff"/>`,Bh=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/><ellipse cx="${t}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/>`,et='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>';function fl(e,t,n){return`${et}<ellipse cx="50" cy="78" rx="28" ry="16" fill="${t}" ${D}/><path d="M24 62 Q50 48 76 62 V78 Q50 92 24 78 Z" fill="${t}" ${D}/>
    <circle cx="50" cy="40" r="18" fill="${e}" ${D}/>${Rh(43,57,40)}${Bh(38,62,48)}<path d="M46 50 q4 3 8 0" fill="none" ${D}/>
    <path d="M38 26 Q50 16 62 26" fill="${n}" ${D}/><circle cx="50" cy="24" r="3" fill="${n}" ${D}/>`}const Ah=[{kind:"crib",name:"Crib",cat:"furniture",w:260,svg:`${et}<rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${D}/><path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${D}/><rect x="6" y="22" width="88" height="12" rx="6" fill="#9ad7f5" ${D}/><rect x="14" y="48" width="72" height="16" rx="6" fill="#ffe0ec"/><ellipse cx="32" cy="56" rx="8" ry="5" fill="#fff" ${D}/><ellipse cx="50" cy="56" rx="8" ry="5" fill="#c9e7ff" ${D}/>`},{kind:"bassinet",name:"Bassinet",cat:"furniture",w:170,svg:`${et}<path d="M18 78 Q8 78 10 64 L22 36 H78 L90 64 Q92 78 82 78 Z" fill="#fff" ${D}/><ellipse cx="50" cy="36" rx="32" ry="10" fill="#fff" ${D}/><path d="M22 40 Q50 52 78 40" fill="#ffe0ec" ${D}/><ellipse cx="50" cy="44" rx="16" ry="7" fill="#fff"/><path d="M30 78 L22 94 M70 78 L78 94" ${D}/><ellipse cx="50" cy="90" rx="28" ry="4" fill="none" ${D}/><path d="M14 22 Q50 4 86 22" fill="none" stroke="#9ad7f5" stroke-width="6" stroke-linecap="round"/>`},{kind:"rocker",name:"Rocker",cat:"furniture",w:190,svg:`${et}<path d="M16 88 Q50 98 84 88" fill="none" ${D}/><path d="M28 84 Q50 74 72 84" fill="#c9a0dc" ${D}/><rect x="30" y="28" width="40" height="36" rx="12" fill="#e4ccf2" ${D}/><path d="M22 48 Q18 70 30 80 H70 Q82 70 78 48 Z" fill="#f6e6ff" ${D}/><rect x="36" y="58" width="28" height="12" rx="6" fill="#ffc8dd" ${D}/><circle cx="50" cy="40" r="6" fill="#fff" opacity=".7"/>`},{kind:"changing-table",name:"Changing Table",cat:"furniture",w:230,svg:`${et}<rect x="8" y="36" width="84" height="16" rx="8" fill="#fff" ${D}/><rect x="14" y="40" width="72" height="8" rx="4" fill="#ffd6e8"/><rect x="16" y="52" width="28" height="32" rx="6" fill="#bde0fe" ${D}/><rect x="56" y="52" width="28" height="32" rx="6" fill="#c9f0d8" ${D}/><path d="M22 60 H38 M22 68 H38 M62 60 H78 M62 68 H78" ${D}/><rect x="18" y="84" width="8" height="10" rx="2" fill="${Ln}"/><rect x="74" y="84" width="8" height="10" rx="2" fill="${Ln}"/><rect x="34" y="22" width="18" height="12" rx="3" fill="#ffe0ec" ${D}/><rect x="54" y="24" width="16" height="10" rx="3" fill="#fff6d8" ${D}/>`},{kind:"toy-bin",name:"Toy Bin",cat:"furniture",w:150,svg:`${et}<path d="M14 40 H86 L78 90 H22 Z" fill="#ffd166" ${D}/><rect x="10" y="32" width="80" height="14" rx="7" fill="#ffe08a" ${D}/><circle cx="36" cy="58" r="8" fill="#ff8fab" ${D}/><rect x="50" y="50" width="16" height="16" rx="3" fill="#8ecae6" ${D}/><circle cx="62" cy="70" r="6" fill="#90e0a8" ${D}/>`},{kind:"baby-shelf",name:"Bookshelf",cat:"furniture",w:150,svg:`${et}<rect x="14" y="8" width="72" height="84" rx="8" fill="#f3d2b5" ${D}/><path d="M14 36 H86 M14 64 H86" ${D}/><rect x="22" y="14" width="8" height="18" rx="2" fill="#ff8fab" ${D}/><rect x="32" y="18" width="8" height="14" rx="2" fill="#8ecae6" ${D}/><rect x="44" y="14" width="8" height="18" rx="2" fill="#ffd166" ${D}/><rect x="58" y="16" width="8" height="16" rx="2" fill="#90e0a8" ${D}/><circle cx="34" cy="50" r="7" fill="#ffadad" ${D}/><rect x="50" y="44" width="18" height="14" rx="3" fill="#c9a0dc" ${D}/><ellipse cx="40" cy="78" rx="14" ry="8" fill="#fff" ${D}/>`},{kind:"doll-rose",name:"Rose Doll",cat:"decor",w:80,svg:fl("#f6d3b0","#ffc2d4","#ff8fab")},{kind:"doll-honey",name:"Honey Doll",cat:"decor",w:80,svg:fl("#e0ac69","#cdeffd","#ffd166")},{kind:"doll-cocoa",name:"Cocoa Doll",cat:"decor",w:80,svg:fl("#8d5524","#d8f3dc","#c9a0dc")},{kind:"crib-mobile",name:"Crib Mobile",cat:"decor",w:150,wall:!0,svg:`<path d="M50 6 V22" ${D}/><ellipse cx="50" cy="28" rx="28" ry="8" fill="#fff" ${D}/><path d="M28 32 V48 M50 36 V58 M72 32 V48" ${D}/><circle cx="28" cy="56" r="8" fill="#ffd166" ${D}/><circle cx="50" cy="68" r="9" fill="#ff8fab" ${D}/><path d="M72 56 l6 4 -6 4 -6 -4 z" fill="#8ecae6" ${D}/><circle cx="28" cy="54" r="2" fill="#fff"/><circle cx="50" cy="66" r="2" fill="#fff"/>`},{kind:"night-light",name:"Night Light",cat:"decor",w:70,svg:`${et}<circle cx="50" cy="46" r="22" fill="#fff6c8" ${D}/><circle cx="50" cy="46" r="12" fill="#ffe08a"/><path d="M50 18 V10 M30 26 L24 20 M70 26 L76 20 M24 46 H14 M86 46 H76" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><rect x="40" y="70" width="20" height="16" rx="4" fill="#c9a0dc" ${D}/><circle cx="50" cy="78" r="3" fill="#ff8fab"/>`},{kind:"bunny-plush",name:"Bunny Plush",cat:"decor",w:90,svg:`${et}<ellipse cx="34" cy="28" rx="8" ry="18" fill="#fff" ${D}/><ellipse cx="66" cy="28" rx="8" ry="18" fill="#fff" ${D}/><ellipse cx="34" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="66" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="50" cy="74" rx="26" ry="18" fill="#fff" ${D}/><circle cx="50" cy="50" r="20" fill="#fff" ${D}/>${Rh(43,57,50)}<path d="M47 58 l3 3 3 -3" fill="none" ${D}/>${Bh(38,62,58)}`},{kind:"stacking-rings",name:"Stacking Rings",cat:"decor",w:70,svg:`${et}<ellipse cx="50" cy="86" rx="26" ry="7" fill="#ff8fab" ${D}/><ellipse cx="50" cy="74" rx="20" ry="6" fill="#ffd166" ${D}/><ellipse cx="50" cy="64" rx="15" ry="5" fill="#8ecae6" ${D}/><ellipse cx="50" cy="56" rx="10" ry="4" fill="#90e0a8" ${D}/><rect x="46" y="28" width="8" height="40" rx="4" fill="#c9a0dc" ${D}/><circle cx="50" cy="24" r="7" fill="#ffb3c6" ${D}/>`},{kind:"rattle",name:"Rattle",cat:"decor",w:60,svg:`${et}<circle cx="38" cy="40" r="20" fill="#ffd166" ${D}/><circle cx="32" cy="34" r="5" fill="#fff" opacity=".7"/><rect x="50" y="52" width="10" height="28" rx="5" fill="#ff8fab" ${D} transform="rotate(-20 55 66)"/><circle cx="68" cy="82" r="8" fill="#8ecae6" ${D}/>`},{kind:"baby-bottle",name:"Baby Bottle",cat:"food",w:55,svg:`${et}<rect x="36" y="8" width="28" height="12" rx="4" fill="#c9a0dc" ${D}/><rect x="42" y="18" width="16" height="8" fill="#fff" ${D}/><path d="M30 30 H70 L66 88 Q50 96 34 88 Z" fill="#e7f6ff" ${D}/><path d="M32 48 H68 L66 80 Q50 88 34 80 Z" fill="#fff" opacity=".85"/><rect x="34" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="46" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="58" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/>`},{kind:"blocks",name:"Baby Blocks",cat:"decor",w:90,svg:`${et}<rect x="14" y="58" width="28" height="28" rx="4" fill="#ff8fab" ${D}/><rect x="40" y="46" width="28" height="28" rx="4" fill="#ffd166" ${D}/><rect x="28" y="28" width="26" height="26" rx="4" fill="#8ecae6" ${D}/><path d="M20 72 H36 M48 60 H62 M34 42 H48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"rocking-horse",name:"Little Rocking Horse",cat:"decor",w:180,svg:`${et}<path d="M12 86 Q50 98 88 82" fill="none" ${D}/><ellipse cx="48" cy="62" rx="26" ry="14" fill="#e6b88a" ${D}/><path d="M62 58 L84 40 Q92 36 90 48 L74 64 Z" fill="#f0d0b0" ${D}/><circle cx="82" cy="42" r="3" fill="${Ln}"/><path d="M70 36 L76 24 L84 34" fill="#ff8fab" ${D}/><rect x="36" y="48" width="16" height="8" rx="3" fill="#c9a0dc" ${D}/><path d="M30 70 L22 84 M58 72 L66 86" ${D}/>`},{kind:"music-box",name:"Music Box",cat:"decor",w:80,svg:`${et}<rect x="22" y="40" width="56" height="46" rx="8" fill="#f6d6ff" ${D}/><path d="M22 40 L50 22 L78 40" fill="#e4ccf2" ${D}/><circle cx="50" cy="64" r="10" fill="#fff" ${D}/><path d="M50 58 V70 M44 64 H56" ${D}/><circle cx="50" cy="30" r="4" fill="#ffd166" ${D}/>`},{kind:"cloud-rug",name:"Nursery Cloud Rug",cat:"decor",w:340,svg:`<ellipse cx="50" cy="78" rx="46" ry="16" fill="#e7f6ff" ${D}/><circle cx="28" cy="70" r="16" fill="#f4fbff" ${D}/><circle cx="50" cy="62" r="18" fill="#fff" ${D}/><circle cx="72" cy="70" r="16" fill="#f4fbff" ${D}/><ellipse cx="50" cy="78" rx="30" ry="8" fill="#d6f0ff"/>`},{kind:"play-mat",name:"Play Mat",cat:"decor",w:300,svg:`<rect x="6" y="62" width="88" height="30" rx="14" fill="#ffe0ec" ${D}/><path d="M50 70 C42 62 30 64 34 74 C38 82 50 88 50 88 C50 88 62 82 66 74 C70 64 58 62 50 70 Z" fill="#ff8fab" ${D}/><circle cx="22" cy="76" r="5" fill="#ffd166" ${D}/><circle cx="78" cy="76" r="5" fill="#8ecae6" ${D}/>`},{kind:"moon-art",name:"Moon and Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M58 18 A28 28 0 1 0 58 78 A18 18 0 1 1 58 18 Z" fill="#fff3b0" ${D}/><path d="M22 30 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1 z" fill="#ffd166" ${D}/><path d="M78 58 l2 5 5 1 -4 4 1 5 -4 -3 -4 3 1 -5 -4 -4 5 -1 z" fill="#c9e7ff" ${D}/>`},{kind:"nursery-dresser",name:"Nursery Dresser",cat:"furniture",w:170,svg:`${et}<rect x="14" y="22" width="72" height="68" rx="8" fill="#f6e2c4" ${D}/><path d="M14 44 H86 M14 66 H86" ${D}/><circle cx="50" cy="34" r="3" fill="${Ln}"/><circle cx="50" cy="55" r="3" fill="${Ln}"/><circle cx="50" cy="76" r="3" fill="${Ln}"/><rect x="30" y="10" width="18" height="12" rx="3" fill="#ffc2d4" ${D}/><rect x="52" y="12" width="16" height="10" rx="3" fill="#c9e7ff" ${D}/>`},{kind:"nursery-lamp",name:"Nursery Lamp",cat:"decor",w:80,svg:`${et}<path d="M28 42 L36 12 H64 L72 42 Z" fill="#fff6c8" ${D}/><rect x="46" y="42" width="8" height="40" rx="4" fill="#c9a0dc" ${D}/><ellipse cx="50" cy="88" rx="20" ry="6" fill="#b388d6" ${D}/><circle cx="46" cy="24" r="3" fill="#fff" opacity=".85"/><path d="M34 20 q6 -8 4 -2" fill="none" stroke="#ffd166" stroke-width="2"/>`},{kind:"nursery-curtains",name:"Curtains",cat:"decor",w:180,wall:!0,svg:`<rect x="16" y="10" width="68" height="50" rx="6" fill="#cfefff" ${D}/><path d="M50 10 V60 M16 34 H84" ${D}/><path d="M8 8 Q18 28 10 92" fill="#ffd6e8" ${D}/><path d="M92 8 Q82 28 90 92" fill="#ffd6e8" ${D}/><rect x="6" y="6" width="88" height="8" rx="3" fill="#f3d2b5" ${D}/>`}],st="#5a3d5c",v=(e=3.5)=>`stroke="${st}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function we(e,t,n){const s=Math.round(t*.62);return`<ellipse cx="${e}" cy="${n}" rx="${t}" ry="3.4" fill="${st}" opacity=".08"/><ellipse cx="${e}" cy="${(n+1.2).toFixed(1)}" rx="${s}" ry="1.55" fill="${st}" opacity=".12"/>`}function ne(e,t=2.2){return`<path d="${e}" fill="none" stroke="#fff" stroke-width="${t}" stroke-linecap="round" opacity=".75"/>`}function at(e,t=1.15){return`<path d="${e}" fill="none" stroke="${st}" stroke-width="${t}" stroke-linecap="round" opacity=".2"/>`}function Kc(e,t,n=".7"){return`<radialGradient id="${e}" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="${t}" stop-opacity="${n}"/><stop offset="1" stop-color="${t}" stop-opacity="0"/></radialGradient>`}function Xc(e,t,n){return`<linearGradient id="${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t}"/><stop offset="1" stop-color="${n}"/></linearGradient>`}function tx(){return typeof location>"u"?!1:/(?:^|[?&])yard=1(?:&|$)/.test(location.search)}function Yl(){return typeof location>"u"?"":new URLSearchParams(location.search).get("shot")||""}const nx={v:1,hair:"pigtails",hairC:"#a0522d",skin:"#f6d2b5",eyes:"big",eyeC:"#5a321c",freckles:!0,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"skirt",bottomC:"#c9a0dc",dress:"sundress",dressC:"#ff8fab",shoes:"maryjanes",shoesC:"#ffd166",acc:["bow"],accC:"#ff7aa8"},sx=()=>mi(nx),Kl=864,Xl={x:1084,y:578,flip:!0},Xn={x:1184,y:255},Bf={x:1146,y:578},Jl={x:940,y:540,flip:!0},Na=1160,Dh={x:824,y:398,w:96,h:230},Ih={x:996,y:372,w:82,h:196},ox=[{kind:"yard-swing",x:1266,y:580,scale:132/280},{kind:"lemonade-cart",x:1254,y:471},{kind:"sandbox",x:940,y:482},{kind:"picnic-blanket",x:939,y:420}];function ve(e){return{kind:e.kind,name:e.name,cat:e.cat,w:e.w,h:e.h,vb:e.vb,wall:e.wall,holdable:e.holdable??!1,rooms:["backyard"],svg:e.svg}}const ix=ve({kind:"yard-swing",name:"A-Frame Swing",cat:"furniture",w:280,h:215,vb:"0 0 130 100",svg:`${we(65,54,96)}
    <path d="M34 18 L50 18 L20 94 H4 Z" fill="#f3d2aa" ${v()}/>
    <path d="M42 24 L50 18 L18 70 H28 Z" fill="#d4a373"/>
    <path d="M80 18 L96 18 L126 94 H110 Z" fill="#e7c49a" ${v()}/>
    <path d="M108 22 L96 18 L126 94 H118 Z" fill="#c99366"/>
    ${at("M16 50 l8 28 M112 48 l8 30")}
    <rect x="22" y="6" width="86" height="14" rx="2" fill="#f6e0c4" ${v()}/>
    <rect x="86" y="9" width="18" height="8" rx="1" fill="#d4a373"/>
    <rect x="28" y="16" width="74" height="4" fill="#e7c49a"/>
    ${ne("M28 10 h30")}
    <g class="swingSeat">
      <rect x="48" y="74" width="34" height="7" rx="1" fill="#f3d2aa" ${v(2.2)}/>
      <rect x="72" y="76" width="8" height="4" fill="#d4a373"/>
      <path d="M54 20 V78 M76 20 V78" fill="none" ${v(2.2)}/>
      ${ne("M52 76 h14")}
    </g>`}),ax=ve({kind:"sandbox",name:"Sandbox",cat:"furniture",w:120,h:54,vb:"0 0 160 72",svg:`${we(80,64,68)}
    <path d="M108 38 L146 26 L146 52 L108 64 Z" fill="#e7c49a" ${v()}/>
    <path d="M126 36 L142 28 L142 48 L126 56 Z" fill="#c99366"/>
    <path d="M12 40 H108 V64 H12 Z" fill="#f3d2aa" ${v()}/>
    <path d="M12 40 L36 18 L146 18 L108 40 Z" fill="#f6e0c4" ${v()}/>
    <path d="M112 20 L142 20 L108 38 L90 38 Z" fill="#d4a373"/>
    <path d="M34 36 L52 24 L122 24 L100 36 Z" fill="#ffe08a" ${v(2.2)}/>
    <path d="M98 26 L118 26 L100 34 L86 34 Z" fill="#f0c36a"/>
    ${at("M48 30 q8 2 6 5 M68 28 q10 2 8 6 M58 34 h16")}
    <path d="M76 30 L100 36 L94 48 L70 42 Z" fill="#d7e6f2" ${v(2.2)}/>
    <path d="M88 34 L98 38 L94 44 L84 40 Z" fill="#b7c9d6"/>
    <path d="M52 8 L64 4 L90 34 L78 38 Z" fill="#f0d2b0" ${v()}/>
    <path d="M64 8 L72 6 L90 32 L82 34 Z" fill="#d4a373"/>
    <path d="M46 2 H66 V9 H46 Z" fill="#c99366" ${v(2)}/>
    ${ne("M18 44 h26")}
    ${ne("M44 22 h22")}`}),rx=ve({kind:"little-slide",name:"Little Slide",cat:"furniture",w:150,h:188,vb:"0 0 110 140",svg:`${we(56,44,134)}
    <path d="M50 34 H72 C94 36 102 56 98 82 L92 122 H70 L76 84 C78 60 72 46 52 44 Z" fill="#ffb3c6" ${v()}/>
    <path d="M72 38 C94 42 104 62 100 86 L94 122 H86 L92 86 C94 64 86 48 72 46 Z" fill="#e45d88"/>
    <rect x="14" y="34" width="8" height="96" rx="2" fill="#f3d2aa" ${v()}/>
    <rect x="36" y="34" width="8" height="96" rx="2" fill="#e7c49a" ${v()}/>
    <rect x="40" y="40" width="3" height="84" fill="#c99366"/>
    <rect x="14" y="52" width="30" height="5" rx="1" fill="#f6e0c4" ${v(2.2)}/>
    <rect x="14" y="70" width="30" height="5" rx="1" fill="#f6e0c4" ${v(2.2)}/>
    <rect x="14" y="88" width="30" height="5" rx="1" fill="#f6e0c4" ${v(2.2)}/>
    <rect x="14" y="106" width="30" height="5" rx="1" fill="#f6e0c4" ${v(2.2)}/>
    <rect x="6" y="18" width="56" height="22" rx="3" fill="#f3d2aa" ${v()}/>
    <rect x="6" y="34" width="56" height="6" fill="#d4a373"/>
    <path d="M48 20 H62 V40 H48 Z" fill="#c99366"/>
    ${ne("M12 24 h22")}
    <rect x="12" y="6" width="5" height="16" rx="1" fill="#f0d2b0" ${v(2.2)}/>
    <rect x="40" y="6" width="5" height="16" rx="1" fill="#e7c49a" ${v(2.2)}/>
    <path d="M14 8 H43" fill="none" ${v(2.2)}/>
    <rect x="80" y="116" width="7" height="16" rx="1" fill="#f3d2aa" ${v(2)}/>
    ${ne("M58 42 C74 48 86 66 86 88")}
    ${at("M80 64 q4 16 2 28")}`}),lx=ve({kind:"yard-bench",name:"Garden Bench",cat:"furniture",w:140,h:100,vb:"0 0 140 100",svg:`${we(70,58,96)}
    <rect x="10" y="8" width="12" height="86" rx="2" fill="#f3d2aa" ${v()}/>
    <rect x="118" y="8" width="12" height="86" rx="2" fill="#e7c49a" ${v()}/>
    <rect x="124" y="12" width="5" height="76" fill="#c99366"/>
    <rect x="28" y="52" width="10" height="42" rx="2" fill="#f0d2b0" ${v()}/>
    <rect x="102" y="52" width="10" height="42" rx="2" fill="#d4a373" ${v()}/>
    <rect x="108" y="56" width="3" height="32" fill="#c99366"/>
    <rect x="18" y="10" width="104" height="8" rx="1" fill="#f6e0c4" ${v(2.2)}/>
    <rect x="18" y="20" width="104" height="8" rx="1" fill="#f3d2aa" ${v(2.2)}/>
    <rect x="18" y="30" width="104" height="8" rx="1" fill="#f3d2aa" ${v(2.2)}/>
    <rect x="18" y="40" width="104" height="8" rx="1" fill="#e7c49a" ${v(2.2)}/>
    <rect x="18" y="48" width="104" height="7" rx="1" fill="#f6e0c4" ${v(2.2)}/>
    <rect x="18" y="57" width="104" height="7" rx="1" fill="#f3d2aa" ${v(2.2)}/>
    <rect x="18" y="66" width="104" height="7" rx="1" fill="#e7c49a" ${v(2.2)}/>
    <rect x="108" y="12" width="10" height="5" fill="#d4a373"/>
    <rect x="108" y="22" width="10" height="5" fill="#c99366"/>
    <rect x="108" y="50" width="10" height="4" fill="#d4a373"/>
    <rect x="108" y="68" width="10" height="4" fill="#c99366"/>
    <path d="M10 46 H40 V56 H10 Z" fill="#f6e0c4" ${v()}/>
    <path d="M100 46 H130 V56 H100 Z" fill="#e7c49a" ${v()}/>
    <path d="M116 48 H128 V54 H116 Z" fill="#c99366"/>
    ${ne("M22 13 h28")}
    ${ne("M14 48 h16")}
    ${at("M36 24 h48 M36 34 h44 M34 52 h52 M34 62 h46")}`}),cx=ve({kind:"lemonade-cart",name:"Lemonade Cart",cat:"furniture",w:108,h:121,vb:"0 0 100 112",svg:`${we(50,40,106)}
    <circle cx="30" cy="96" r="11" fill="${st}" ${v(2.2)}/><circle cx="30" cy="96" r="4.5" fill="#ffd166"/>
    <circle cx="72" cy="96" r="11" fill="${st}" ${v(2.2)}/><circle cx="72" cy="96" r="4.5" fill="#ffd166"/>
    <rect x="18" y="92" width="66" height="5" rx="2" fill="#c99366" ${v(2)}/>
    <rect x="16" y="46" width="68" height="46" rx="3" fill="#fff6ea" ${v()}/>
    <rect x="66" y="50" width="14" height="38" fill="#f0d2a4"/>
    ${at("M28 56 v28 M42 56 v28 M56 56 v28")}
    ${ne("M20 52 v16")}
    <rect x="12" y="38" width="76" height="12" rx="2" fill="#ffe08a" ${v()}/>
    <rect x="66" y="40" width="18" height="8" fill="#f0c45c"/>
    <path d="M14 40 L22 14 H80 L88 40 Z" fill="#ff8fab" ${v()}/>
    <path d="M34 16 L38 40 H50 L46 15 Z" fill="#fff4f7"/>
    <path d="M58 15 L62 40 H74 L70 15 Z" fill="#fff4f7"/>
    <path d="M72 16 H80 L88 40 H76 Z" fill="#e45d88"/>
    ${ne("M26 20 h18")}
    <path d="M28 52 H44 L42 72 H30 Z" fill="#fff" ${v(2)}/>
    <path d="M30 58 H42 L41 72 H31 Z" fill="#ffe566"/>
    <path d="M28 54 L22 58 L28 62 Z" fill="#fff" ${v(2)}/>
    <path d="M44 56 Q52 60 44 70" fill="none" ${v(2)}/>
    <path d="M56 60 H68 L66 72 H58 Z" fill="#fff" ${v(2)}/>
    <path d="M58 64 H66 L65 72 H59 Z" fill="#ffe566"/>
    <circle cx="78" cy="64" r="7" fill="#ffe566" ${v(2)}/>
    <path d="M78 58 v12 M72 64 h12" fill="none" stroke="#e0a83a" stroke-width="1.3"/>`}),dx=ve({kind:"sun-lounger",name:"Sun Lounger",cat:"furniture",w:168,h:86,vb:"0 0 170 90",svg:`${we(86,68,84)}
    <path d="M16 66 H28 L32 82 H12 Z" fill="#f3d2aa" ${v()}/>
    <path d="M126 64 H140 L146 82 H120 Z" fill="#d4a373" ${v()}/>
    <path d="M136 68 H142 L146 80 H138 Z" fill="#c99366"/>
    <path d="M12 52 H156 V64 H12 Z" fill="#f3d2aa" ${v()}/>
    <path d="M122 54 H154 V62 H122 Z" fill="#d4a373"/>
    <path d="M28 34 H36 L42 52 H32 Z" fill="#e7c49a" ${v()}/>
    <path d="M50 44 H150 L154 58 H54 Z" fill="#ffd4e2" ${v()}/>
    <path d="M128 48 H150 L154 58 H132 Z" fill="#e888a8"/>
    <path d="M18 6 L60 48 L48 58 L8 16 Z" fill="#ffb3c6" ${v()}/>
    <path d="M38 34 L54 48 L48 56 L30 42 Z" fill="#e45d88"/>
    <ellipse cx="22" cy="14" rx="11" ry="7" fill="#fff" ${v(2.2)}/>
    <path d="M22 8 H30 A7 7 0 0 1 30 20 H22 Z" fill="#ffd0e0"/>
    ${ne("M22 12 L50 40")}
    ${at("M26 22 L52 46")}`}),fx=ve({kind:"splash-pool",name:"Splash Pool",cat:"furniture",w:176,h:96,vb:"0 0 170 96",svg:`<defs>${Xc("ydpoolW","#f3fbff","#7ec8e3")}</defs>
    ${we(85,72,90)}
    <ellipse cx="85" cy="58" rx="74" ry="28" fill="#8ecae6" ${v()}/>
    <path d="M22 52 Q40 34 78 40" fill="none" stroke="#ff8fab" stroke-width="16" stroke-linecap="round"/>
    <path d="M100 36 Q138 38 152 58" fill="none" stroke="#ffd166" stroke-width="14" stroke-linecap="round"/>
    <path d="M18 66 C22 82 50 90 85 90 C120 90 152 82 154 66 C148 78 120 84 85 84 C50 84 24 78 18 66 Z" fill="#5aa9c6"/>
    <ellipse cx="85" cy="54" rx="48" ry="16" fill="url(#ydpoolW)" ${v(2.2)}/>
    ${ne("M36 50 q20 -10 36 0")}
    <circle cx="128" cy="48" r="4" fill="#fff" ${v(1.6)}/>
    <circle cx="128" cy="48" r="1.6" fill="#8ecae6"/>
    <path d="M70 46 q3 -8 1 0 M96 42 q4 -9 1 1" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`}),px=ve({kind:"picket-gate",name:"Picket Gate",cat:"furniture",w:110,h:150,vb:"0 0 100 136",svg:`${we(50,38,130)}
    <rect x="6" y="16" width="12" height="110" rx="2" fill="#f7fff8" ${v()}/>
    <rect x="82" y="16" width="12" height="110" rx="2" fill="#e7f6ea" ${v()}/>
    <rect x="88" y="20" width="5" height="100" fill="#c5e0c8"/>
    <rect x="4" y="40" width="16" height="6" rx="1" fill="#c99366" ${v(2)}/>
    <rect x="4" y="96" width="16" height="6" rx="1" fill="#c99366" ${v(2)}/>
    <rect x="16" y="38" width="68" height="8" rx="2" fill="#fff" ${v(2.2)}/>
    <rect x="16" y="86" width="68" height="8" rx="2" fill="#fff" ${v(2.2)}/>
    <path d="M20 90 L28 98 L80 46 L72 38 Z" fill="#f7fff8" ${v(2.2)}/>
    <path d="M26 30 L32 14 L38 30 V112 H26 Z" fill="#fff" ${v(2.2)}/>
    <path d="M44 30 L50 14 L56 30 V112 H44 Z" fill="#f7fff8" ${v(2.2)}/>
    <path d="M62 30 L68 14 L74 30 V112 H62 Z" fill="#e7f6ea" ${v(2.2)}/>
    <path d="M68 22 L74 16 L74 108 H68 Z" fill="#c5e0c8"/>
    ${ne("M28 36 v20")}
    <rect x="74" y="60" width="16" height="5" rx="1" fill="#c99366" ${v(2)}/>
    <circle cx="86" cy="62" r="2.6" fill="#ffd166" ${v(1.8)}/>`});function hx(){let e="";for(let t=0;t<6;t++)for(let n=0;n<13;n++)(t+n)%2===0&&(e+=`<rect x="${n*15-6}" y="${t*10}" width="15" height="10" fill="#ff8fab"/>`);return e}const gx=ve({kind:"picnic-blanket",name:"Picnic Blanket",cat:"decor",w:110,h:36,vb:"0 0 180 59",svg:`<defs><clipPath id="ydging"><path d="M22 20 L156 12 L174 44 L36 52 Z"/></clipPath></defs>
    ${we(96,74,54)}
    <path d="M22 20 L156 12 L174 44 L36 52 Z" fill="#fff0f5" ${v()}/>
    <g clip-path="url(#ydging)">${hx()}</g>
    <path d="M148 14 L170 42 L160 46 L138 18 Z" fill="#e45d88"/>
    <path d="M96 30 L128 26 L134 42 L100 46 Z" fill="#f3d2aa" ${v(2)}/>
    <path d="M120 28 L128 26 L134 42 L126 43 Z" fill="#c99366"/>
    <path d="M104 30 Q114 14 126 28" fill="none" ${v(2.2)}/>
    ${at("M104 34 h22 M104 38 h24",1)}
    ${ne("M34 26 l28 -3")}`});function Uo(e,t,n,s){return`<path d="M${e-1.5} ${t+16} H${e+1.5} V${t+40} H${e-1.5} Z" fill="#3d9a68"/>
    <path d="M${e} ${t+24} C${e-16} ${t+18} ${e-14} ${t+36} ${e-1} ${t+34}" fill="#74c69d" ${v(1.6)}/>
    <path d="M${e} ${t+22} C${e+16} ${t+16} ${e+12} ${t+36} ${e+1} ${t+32}" fill="#52b788"/>
    <path d="M${e} ${t+18} C${e-10} ${t+8} ${e-8} ${t} ${e} ${t+6} C${e+8} ${t} ${e+10} ${t+8} ${e} ${t+18} Z" fill="${n}" ${v(1.8)}/>
    <path d="M${e+1} ${t+6} C${e+7} ${t+4} ${e+8} ${t+13} ${e+1} ${t+15} Z" fill="${s}"/>`}const ux=ve({kind:"tulip-bed",name:"Tulip Bed",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`${we(70,56,86)}
    <path d="M10 56 H130 L120 82 H20 Z" fill="#f0d2b0" ${v()}/>
    <path d="M96 58 H126 L118 78 H92 Z" fill="#d4a373"/>
    <path d="M16 56 Q70 42 124 56 Q70 64 16 56 Z" fill="#c4a484" ${v(2.2)}/>
    ${ne("M22 60 h24")}
    ${Uo(32,16,"#ff8fab","#e45d88")}
    ${Uo(54,8,"#ffd166","#e0a83a")}
    ${Uo(76,4,"#ff7096","#e04578")}
    ${Uo(98,12,"#fff","#ffd0e0")}
    ${Uo(118,18,"#c9a0dc","#b388d6")}`}),mx=ve({kind:"birdbath",name:"Birdbath",cat:"decor",w:84,h:126,vb:"0 0 80 120",svg:`<defs>${Xc("ydbathW","#f3fbff","#8ecae6")}</defs>
    ${we(40,28,114)}
    <ellipse cx="40" cy="106" rx="20" ry="7" fill="#e7eef2" ${v()}/>
    <path d="M30 46 H50 C56 70 58 86 52 104 H28 C22 86 24 70 30 46 Z" fill="#f4f7f8" ${v()}/>
    <path d="M42 52 H50 C54 72 54 88 50 100 H44 Z" fill="#c5d0d6"/>
    ${ne("M33 62 v22")}
    <ellipse cx="40" cy="40" rx="32" ry="13" fill="#f7fafb" ${v()}/>
    <path d="M40 28 C66 28 72 38 72 42 C72 52 58 54 40 54 C60 54 68 48 68 42 C68 36 58 32 40 34 Z" fill="#d5dee4"/>
    <ellipse cx="40" cy="38" rx="22" ry="7" fill="url(#ydbathW)" ${v(2.2)}/>
    ${ne("M22 36 q10 -4 18 0")}
    <path d="M48 30 L40 24 L42 34 Z" fill="#f0c45c" ${v(1.6)}/>
    <ellipse cx="56" cy="28" rx="11" ry="6" fill="#ffd166" ${v(1.8)}/>
    <circle cx="66" cy="24" r="4.5" fill="#ffe08a" ${v(1.6)}/>
    <path d="M70 24 L77 26 L70 28 Z" fill="#e07a3f"/>
    <circle cx="67" cy="23" r="1" fill="${st}"/>
    <path d="M54 32 V40 M60 32 V40" fill="none" stroke="#c99366" stroke-width="1.4" stroke-linecap="round"/>`}),yx=ve({kind:"lily-pond",name:"Lily Pond",cat:"decor",w:170,h:90,vb:"0 0 170 90",svg:`<defs>${Xc("ydpondW","#eaf6ff","#5aa9e6")}</defs>
    ${we(85,70,84)}
    <ellipse cx="85" cy="54" rx="74" ry="28" fill="#c4a484" ${v()}/>
    <path d="M85 30 C142 32 158 48 158 56 C158 72 126 82 85 82 C124 80 150 68 150 56 C150 44 126 36 85 36 Z" fill="#a88462"/>
    <ellipse cx="85" cy="52" rx="62" ry="20" fill="url(#ydpondW)" ${v(2.2)}/>
    ${ne("M40 46 q24 -8 42 2")}
    <path fill="#95d5b2" ${v(2)} fill-rule="evenodd" d="M58 54 m-16 0 a16 7 0 1 0 32 0 a16 7 0 1 0 -32 0 M58 50 L72 54 L58 58 Z"/>
    <path d="M66 50 L74 54 L66 56 Z" fill="#3d9a68"/>
    <path fill="#74c69d" ${v(2)} fill-rule="evenodd" d="M112 48 m-18 0 a18 8 0 1 0 36 0 a18 8 0 1 0 -36 0 M112 42 L128 48 L112 54 Z"/>
    <path d="M40 58 q-4 -16 2 -22 q6 8 2 16" fill="#52b788" ${v(1.6)}/>
    <path d="M108 40 l2 -8 l4 6 l4 -7 l2 8 l-4 3 z" fill="#ff8fab" ${v(1.6)}/>
    <path d="M112 36 l3 -6 l2 5 l3 -5 l1 6 z" fill="#fff" ${v(1.4)}/>
    <circle cx="112" cy="40" r="2.4" fill="#ffd166"/>`});function Vo(e,t,n,s,o=10){return`<path d="M${e} ${t-o-8} V${t-o}" fill="none" ${v(2.2)}/>
    <rect x="${e-4}" y="${t-o-2}" width="8" height="5" rx="1" fill="#c99366" ${v(1.8)}/>
    <circle cx="${e}" cy="${t}" r="${o}" fill="${n}" ${v()}/>
    <path d="M${e+1} ${t-o+3} H${e+o-1} V${t+o-3} H${e+2} Z" fill="${s}"/>
    ${ne(`M${e-o+3} ${t-2} q2 -3 4 0`)}`}const bx=ve({kind:"patio-lights",name:"Patio Lights",cat:"decor",w:190,h:70,vb:"0 0 180 70",wall:!0,svg:`<path d="M8 12 Q50 32 90 12 Q130 32 172 14" fill="none" ${v()}/>
    ${Vo(28,40,"#fff6c8","#f0c45c")}
    ${Vo(64,46,"#ffc2d4","#e45d88")}
    ${Vo(100,36,"#fff1c2","#f0c45c")}
    ${Vo(136,46,"#c9f1ff","#7eb4dc")}
    ${Vo(164,34,"#ffd0e8","#e888a8",8)}`}),kx=ve({kind:"toadstool-light",name:"Toadstool Light",cat:"decor",w:70,h:84,vb:"0 0 80 96",svg:`<defs>${Kc("ydtoadG","#ffe7a0",".9")}</defs>
    ${we(40,26,90)}
    <ellipse cx="40" cy="70" rx="18" ry="8" fill="url(#ydtoadG)"/>
    <path d="M32 58 H48 L52 84 H28 Z" fill="#fff7f8" ${v()}/>
    <path d="M42 60 H48 L50 82 H43 Z" fill="#f0d8cc"/>
    <path d="M6 58 Q40 8 74 58 Q40 74 6 58 Z" fill="#ff8fab" ${v()}/>
    <path d="M44 22 Q66 16 72 54 Q52 66 44 52 Z" fill="#e45d88"/>
    ${ne("M18 48 q16 -12 26 -2")}
    <circle cx="26" cy="48" r="5" fill="#fff" ${v(2)}/>
    <circle cx="44" cy="40" r="6" fill="#fff" ${v(2)}/>
    <circle cx="36" cy="56" r="3.5" fill="#fff" ${v(2)}/>
    <path d="M22 52 h6 M40 46 h8" fill="none" stroke="#ffd0e0" stroke-width="1.2" stroke-linecap="round"/>`}),wx=ve({kind:"stepping-stones",name:"Stepping Stones",cat:"decor",w:160,h:64,vb:"0 0 160 70",svg:`${we(80,66,64)}
    <path d="M8 40 L24 28 L50 32 L54 50 L30 58 L10 52 Z" fill="#f7f4ef" ${v()}/>
    <path d="M34 36 L50 32 L54 50 L36 54 Z" fill="#d9d3cc"/>
    <path d="M56 44 L78 32 L108 36 L112 56 L80 64 L58 58 Z" fill="#f4f1ec" ${v()}/>
    <path d="M86 40 L108 36 L112 56 L90 58 Z" fill="#d4cdc4"/>
    <path d="M110 30 L128 20 L154 28 L150 48 L124 52 L108 42 Z" fill="#e7e2dc" ${v()}/>
    <path d="M132 26 L152 28 L148 46 L130 44 Z" fill="#d0c9c2"/>
    ${ne("M16 38 q8 -4 14 0")}
    ${at("M22 44 h12 M72 48 h16 M124 36 h12")}`}),vx=ve({kind:"pinwheel",name:"Pinwheel",cat:"decor",w:56,h:90,vb:"0 0 70 100",holdable:!0,svg:`${we(35,16,96)}
    <rect x="31" y="44" width="6" height="50" rx="2" fill="#c99366" ${v()}/>
    <rect x="34" y="48" width="3" height="42" fill="#c99366"/>
    <path d="M34 40 L34 8 Q54 16 48 36 Z" fill="#ff8fab" ${v(2.2)}/>
    <path d="M42 18 Q50 28 36 34 Z" fill="#e45d88"/>
    <path d="M34 40 L62 32 Q58 54 40 50 Z" fill="#ffd166" ${v(2.2)}/>
    <path d="M54 38 Q58 48 42 46 Z" fill="#e0a83a"/>
    <path d="M34 40 L34 72 Q14 64 20 44 Z" fill="#8ecae6" ${v(2.2)}/>
    <path d="M26 58 Q16 50 32 46 Z" fill="#5aa9d6"/>
    <path d="M34 40 L6 48 Q12 26 28 30 Z" fill="#c9a0dc" ${v(2.2)}/>
    <path d="M16 36 Q14 28 28 34 Z" fill="#b388d6"/>
    <circle cx="34" cy="40" r="5" fill="#fff" ${v(2.2)}/>
    <circle cx="34" cy="40" r="1.8" fill="${st}"/>`}),_x=ve({kind:"rain-barrel",name:"Rain Barrel",cat:"decor",w:86,h:108,vb:"0 0 80 110",svg:`${we(40,30,104)}
    <path d="M22 30 C12 48 12 78 22 98 H58 C68 78 68 48 58 30 Z" fill="#8ecae6" ${v()}/>
    <path d="M46 34 C58 48 60 76 54 96 H58 C66 76 66 50 56 32 Z" fill="#5aa9c6"/>
    ${at("M28 40 v48 M36 36 v54 M44 38 v50")}
    ${ne("M24 42 v24")}
    <ellipse cx="40" cy="30" rx="20" ry="8" fill="#bde0fe" ${v()}/>
    <ellipse cx="46" cy="30" rx="10" ry="5" fill="#7eb4dc"/>
    <path d="M16 48 H64" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <path d="M14 74 H66" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <rect x="56" y="78" width="14" height="7" rx="2" fill="#d7ecff" ${v(2)}/>
    <path d="M70 81 h6" fill="none" ${v(2)}/>
    <path d="M34 18 q6 -8 12 0" fill="none" stroke="#7eb4dc" stroke-width="2.2" stroke-linecap="round"/>`}),$x=ve({kind:"butterfly-bush",name:"Butterfly Bush",cat:"plants",w:120,h:130,vb:"0 0 100 120",svg:`${we(50,40,114)}
    <ellipse cx="32" cy="86" rx="22" ry="18" fill="#95d5b2" ${v(2.2)}/>
    <ellipse cx="70" cy="84" rx="24" ry="20" fill="#3d9a68" ${v(2.2)}/>
    <ellipse cx="50" cy="78" rx="36" ry="28" fill="#74c69d" ${v()}/>
    <path d="M18 90 Q50 108 84 88 Q68 100 50 102 Q30 100 18 90 Z" fill="#3d9a68"/>
    ${ne("M24 68 q14 -8 26 2")}
    ${at("M28 80 q4 6 0 10 M46 72 q5 8 0 12 M66 78 q4 6 0 10")}
    <path d="M30 62 C28 44 32 26 35 24 C39 28 40 46 38 62 Z" fill="#c9a0dc" ${v(1.8)}/>
    <circle cx="33" cy="36" r="2.2" fill="#f7ecff"/><circle cx="36" cy="46" r="2.2" fill="#b388d6"/><circle cx="33" cy="54" r="2" fill="#f7ecff"/>
    <path d="M46 58 C44 36 50 14 53 12 C57 16 58 40 54 58 Z" fill="#b388d6" ${v(1.8)}/>
    <circle cx="50" cy="28" r="2.4" fill="#f7ecff"/><circle cx="53" cy="40" r="2.4" fill="#c9a0dc"/><circle cx="50" cy="50" r="2.2" fill="#f7ecff"/>
    <path d="M62 60 C62 42 68 28 71 26 C75 30 76 46 72 60 Z" fill="#a78bfa" ${v(1.8)}/>
    <circle cx="67" cy="38" r="2.2" fill="#f7ecff"/><circle cx="70" cy="48" r="2" fill="#c9a0dc"/>
    <path d="M14 26 C4 14 2 24 10 32 C14 36 18 32 18 28 Z" fill="#ff8fab" ${v(1.6)}/>
    <path d="M20 24 C30 12 34 24 26 34 C22 38 20 30 20 26 Z" fill="#c9a0dc" ${v(1.6)}/>
    <path d="M12 30 C6 36 6 46 14 46 C18 44 20 36 18 30 Z" fill="#ffd166" ${v(1.6)}/>
    <path d="M22 30 C30 36 32 46 24 48 C20 44 18 36 20 30 Z" fill="#8ecae6" ${v(1.6)}/>
    <ellipse cx="18" cy="32" rx="2" ry="7" fill="${st}"/>
    <path d="M16 26 Q12 18 10 14 M20 26 Q24 18 28 14" fill="none" stroke="${st}" stroke-width="1.3" stroke-linecap="round"/>`}),xx=ve({kind:"hedge-row",name:"Hedge Row",cat:"plants",w:190,h:96,vb:"0 0 180 96",svg:`${we(90,78,90)}
    <path d="M16 84 C28 70 40 62 52 66 C62 52 78 50 90 62 C102 50 118 52 128 66 C140 58 156 64 164 74 L164 86 L16 86 Z" fill="#2f7d52"/>
    <path d="M10 82 L10 60 C10 50 18 46 26 50 C32 34 46 32 54 48 C60 30 76 28 84 46 C92 28 108 28 116 46 C124 30 140 32 148 48 C156 36 166 42 170 54 L170 82 Z" fill="#74c69d" ${v()}/>
    <path d="M148 46 C160 38 170 50 170 70 L170 82 L140 82 L146 58 Z" fill="#52b788"/>
    <path d="M22 64 C40 54 58 58 70 50 C84 60 100 48 116 56 C128 48 146 56 158 64" fill="none" stroke="#95d5b2" stroke-width="6" stroke-linecap="round" opacity=".85"/>
    <path d="M14 68 C48 78 132 76 166 66 L168 82 L12 82 Z" fill="#3d9a68"/>
    ${at("M28 58 q3 5 0 8 M48 54 q3 6 0 9 M70 52 q3 6 1 9 M94 52 q3 6 0 10 M118 54 q3 6 0 9 M142 56 q3 5 0 8")}
    ${ne("M18 58 q10 -4 16 1")}
    ${ne("M58 42 q12 -4 16 2")}`}),Mx=ve({kind:"lemonade-cup",name:"Lemonade Cup",cat:"food",w:52,h:70,vb:"0 0 70 90",holdable:!0,svg:`${we(35,22,84)}
    <path d="M18 32 H52 L46 76 H24 Z" fill="#fff" ${v()}/>
    <path d="M40 34 H50 L46 74 H40 Z" fill="#f0e6d8"/>
    <path d="M20 44 H50 L46 76 H24 Z" fill="#ffe566"/>
    <path d="M40 46 H48 L46 74 H40 Z" fill="#f0c45c"/>
    <ellipse cx="35" cy="44" rx="15" ry="6" fill="#fff3a0" ${v(2)}/>
    <ellipse cx="35" cy="32" rx="17" ry="7" fill="#fff" ${v()}/>
    <path d="M40 42 L48 16 H58" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="20" cy="30" r="8" fill="#ffe566" ${v(1.8)}/>
    <path d="M20 23 v14 M14 30 h12" fill="none" stroke="#fff" stroke-width="1.4"/>
    <path d="M16 26 q4 4 8 0 M16 34 q4 -4 8 0" fill="none" stroke="#e0a83a" stroke-width="1.2"/>
    ${ne("M24 38 v14")}`}),Lx=ve({kind:"picnic-table",name:"Picnic Table",cat:"furniture",w:180,h:110,vb:"0 0 160 100",svg:`${we(80,68,96)}
    <rect x="18" y="62" width="124" height="10" rx="2" fill="#e7c49a" ${v()}/>
    <rect x="118" y="64" width="20" height="7" fill="#c99366"/>
    <rect x="28" y="70" width="8" height="24" rx="1" fill="#f3d2aa" ${v(2)}/>
    <rect x="124" y="70" width="8" height="24" rx="1" fill="#d4a373" ${v(2)}/>
    <rect x="8" y="78" width="40" height="8" rx="2" fill="#f6e0c4" ${v(2)}/>
    <rect x="112" y="78" width="40" height="8" rx="2" fill="#e7c49a" ${v(2)}/>
    <rect x="22" y="36" width="116" height="14" rx="2" fill="#f6e0c4" ${v()}/>
    <rect x="110" y="38" width="24" height="10" fill="#d4a373"/>
    <rect x="36" y="48" width="8" height="18" fill="#f3d2aa" ${v(2)}/>
    <rect x="116" y="48" width="8" height="18" fill="#d4a373" ${v(2)}/>
    ${ne("M28 40 h36")}
    ${at("M40 42 h50 M34 66 h70")}`}),Ex=ve({kind:"seesaw",name:"Seesaw",cat:"furniture",w:200,h:80,vb:"0 0 180 80",svg:`${we(90,74,76)}
    <path d="M78 58 H102 L96 74 H84 Z" fill="#f3d2aa" ${v()}/>
    <path d="M94 60 H100 L96 72 H92 Z" fill="#c99366"/>
    <rect x="10" y="40" width="160" height="12" rx="3" fill="#ffd166" ${v()} transform="rotate(-8 90 46)"/>
    <rect x="130" y="28" width="28" height="8" fill="#e0a83a"/>
    <rect x="16" y="34" width="28" height="10" rx="2" fill="#ff8fab" ${v(2)}/>
    <rect x="136" y="22" width="28" height="10" rx="2" fill="#8ecae6" ${v(2)}/>
    ${ne("M24 44 h40")}`}),Cx=ve({kind:"wagon",name:"Wagon",cat:"furniture",w:130,h:90,vb:"0 0 130 90",svg:`${we(64,50,86)}
    <circle cx="36" cy="74" r="12" fill="${st}" ${v(2)}/><circle cx="36" cy="74" r="5" fill="#ffd166"/>
    <circle cx="96" cy="74" r="12" fill="${st}" ${v(2)}/><circle cx="96" cy="74" r="5" fill="#ffd166"/>
    <path d="M22 40 H108 L100 68 H30 Z" fill="#e45d88" ${v()}/>
    <path d="M86 42 H106 L100 66 H84 Z" fill="#c93b68"/>
    <rect x="28" y="28" width="76" height="14" rx="3" fill="#ff8fab" ${v()}/>
    <path d="M108 36 H122 L118 58" fill="none" ${v(2.4)}/>
    ${ne("M32 46 h28")}
    ${at("M40 54 h40")}`}),Sx=ve({kind:"birdhouse",name:"Birdhouse",cat:"decor",w:70,h:120,vb:"0 0 80 130",svg:`${we(40,22,124)}
    <rect x="34" y="70" width="12" height="50" rx="2" fill="#d4a373" ${v()}/>
    <rect x="40" y="74" width="5" height="42" fill="#c99366"/>
    <path d="M12 62 L40 28 L68 62 Z" fill="#e45d88" ${v()}/>
    <path d="M40 32 L66 60 H52 Z" fill="#c93b68"/>
    <rect x="18" y="60" width="44" height="36" rx="3" fill="#f6e0c4" ${v()}/>
    <rect x="48" y="64" width="10" height="28" fill="#e7c49a"/>
    <circle cx="40" cy="76" r="7" fill="#5a3d5c"/>
    <rect x="36" y="86" width="14" height="4" rx="1" fill="#d4a373" ${v(1.6)}/>
    ${ne("M22 66 h12")}`}),Px=ve({kind:"sprinkler",name:"Sprinkler",cat:"decor",w:80,h:70,vb:"0 0 100 80",svg:`${we(50,28,76)}
    <ellipse cx="50" cy="66" rx="22" ry="8" fill="#74c69d" ${v()}/>
    <rect x="44" y="40" width="12" height="26" rx="3" fill="#8ecae6" ${v()}/>
    <circle cx="50" cy="36" r="8" fill="#ffd166" ${v()}/>
    <path d="M50 28 C30 16 18 20 12 10" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 28 C70 14 84 18 90 8" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 26 C40 8 58 4 50 2" fill="none" stroke="#c9ecff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="12" cy="10" r="2.2" fill="#c9ecff"/><circle cx="90" cy="8" r="2.2" fill="#c9ecff"/><circle cx="50" cy="2" r="2.2" fill="#fff"/>
    ${ne("M46 44 v10")}`}),Tx=ve({kind:"beach-ball",name:"Beach Ball",cat:"decor",w:70,h:70,vb:"0 0 80 80",svg:`${we(40,26,76)}
    <circle cx="40" cy="40" r="28" fill="#fff" ${v()}/>
    <path d="M40 12 A28 28 0 0 1 66 32 L40 40 Z" fill="#ff8fab"/>
    <path d="M66 48 A28 28 0 0 1 40 68 L40 40 Z" fill="#ffd166"/>
    <path d="M24 64 A28 28 0 0 1 14 36 L40 40 Z" fill="#8ecae6"/>
    <path d="M18 28 A28 28 0 0 1 40 12 L40 40 Z" fill="#b7e4c7"/>
    <circle cx="40" cy="40" r="5" fill="#fff" ${v(2)}/>
    ${ne("M28 24 q6 -4 10 2")}`}),Rx=ve({kind:"patio-umbrella",name:"Patio Umbrella",cat:"furniture",w:150,h:180,vb:"0 0 120 150",svg:`${we(60,36,144)}
    <path d="M10 58 Q60 18 110 58 L98 64 Q60 32 22 64 Z" fill="#ffb3c6" ${v()}/>
    <path d="M60 22 L108 56 L96 62 Z" fill="#e45d88"/>
    <path d="M28 40 Q44 30 60 36 Q76 28 96 42" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <rect x="56" y="58" width="8" height="78" rx="2" fill="#f3d2aa" ${v()}/>
    <rect x="60" y="62" width="3" height="70" fill="#d4a373"/>
    <rect x="40" y="128" width="40" height="8" rx="2" fill="#e7c49a" ${v(2)}/>
    ${ne("M24 50 q16 -8 24 0")}`}),Bx=ve({kind:"veggie-patch",name:"Vegetable Patch",cat:"plants",w:150,h:80,vb:"0 0 150 80",svg:`${we(75,62,76)}
    <rect x="8" y="28" width="134" height="44" rx="4" fill="#c99366" ${v()}/>
    <rect x="16" y="34" width="118" height="32" fill="#8d6e4c"/>
    <path d="M36 48 C36 36 48 34 48 46 C48 34 60 36 58 48 Z" fill="#74c69d" ${v(2)}/>
    <path d="M78 50 C78 38 90 36 90 48 C90 36 102 38 100 50 Z" fill="#52b788" ${v(2)}/>
    <path d="M112 52 L120 30 L128 52 Z" fill="#ff922b" ${v(2)}/>
    <path d="M118 32 Q124 22 130 28" fill="none" stroke="#2f7d52" stroke-width="2" stroke-linecap="round"/>
    ${ne("M18 36 h24")}`}),Ax=ve({kind:"hammock",name:"Hammock",cat:"furniture",w:190,h:110,vb:"0 0 170 100",svg:`${we(85,70,96)}
    <rect x="8" y="18" width="10" height="74" rx="2" fill="#d4a373" ${v()}/>
    <rect x="152" y="18" width="10" height="74" rx="2" fill="#c99366" ${v()}/>
    <path d="M18 28 Q85 78 152 28" fill="none" stroke="#5a3d5c" stroke-width="2"/>
    <path d="M18 36 Q85 88 152 36 L152 48 Q85 96 18 48 Z" fill="#8ecae6" ${v()}/>
    <path d="M120 40 Q140 62 150 44 L150 54 Q136 74 112 52 Z" fill="#5fb0d8"/>
    ${ne("M36 46 q24 10 30 4")}
    ${at("M40 58 q30 16 50 4")}`}),Dx=ve({kind:"garden-gnome",name:"Garden Gnome",cat:"decor",w:64,h:100,vb:"0 0 70 110",svg:`${we(35,22,104)}
    <path d="M18 78 H52 L48 100 H22 Z" fill="#3d7ec4" ${v()}/>
    <path d="M40 80 H50 L48 98 H42 Z" fill="#2c5f96"/>
    <circle cx="35" cy="62" r="16" fill="#f6d2b5" ${v()}/>
    <path d="M20 66 Q35 78 50 66 Q46 74 35 76 Q24 74 20 66 Z" fill="#fff"/>
    <circle cx="29" cy="60" r="2" fill="${st}"/><circle cx="41" cy="60" r="2" fill="${st}"/>
    <path d="M16 52 L35 18 L54 52 Z" fill="#e45d88" ${v()}/>
    <path d="M35 22 L52 50 H42 Z" fill="#c93b68"/>
    <ellipse cx="35" cy="52" rx="16" ry="4" fill="#ff8fab" ${v(2)}/>
    ${ne("M22 40 l8 -8")}`}),Hi=[ix,ax,rx,lx,cx,dx,fx,px,gx,ux,mx,yx,bx,kx,wx,vx,_x,$x,xx,Mx,Lx,Ex,Cx,Sx,Px,Tx,Rx,Bx,Ax,Dx];function Ix(e,t){for(const n of Hi)t[n.kind]||(e.push(n),t[n.kind]=n)}function pl(e,t,n){return`<g>
    <ellipse cx="${e-22*n}" cy="${t}" rx="${26*n}" ry="${14*n}" fill="#fff"/>
    <ellipse cx="${e+18*n}" cy="${t-2*n}" rx="${30*n}" ry="${16*n}" fill="#fff"/>
    <ellipse cx="${e}" cy="${t+4*n}" rx="${34*n}" ry="${13*n}" fill="#fff"/>
  </g>`}function Hx(e,t,n,s,o){const a=l=>`<rect x="${e-2}" y="${l}" width="${t-e+12+4}" height="8" rx="3" fill="#fff" ${v(2.2)}/><rect x="${(t-40).toFixed(1)}" y="${l+1}" width="30" height="6" rx="2" fill="#d5ead8"/>`;let r=a(n+26)+a(s-28);for(let l=e;l<=t;l+=o)r+=`<path d="M${l} ${n+12} L${l+12/2} ${n} L${l+12} ${n+12} V${s} H${l} Z" fill="#f7fff8" ${v(2.2)}/>`,r+=`<path d="M${(l+12*.58).toFixed(1)} ${n+10} H${l+12-1} V${s-4} H${(l+12*.58).toFixed(1)} Z" fill="#d5ead8"/>`,r+=`<path d="M${l+2} ${n+18} v22" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".75" fill="none"/>`;return r}function Ox(e,t){const s=150+46*t,o=372-s;return`<g id="yardTree">
    <rect x="${e-14*t}" y="${s}" width="${28*t}" height="${o}" rx="${6*t}" fill="#e7b98a" ${v()}/>
    <rect x="${e+4*t}" y="${s+8*t}" width="${8*t}" height="${o-16*t}" fill="#c99366"/>
    ${at(`M${e-4*t} ${s+28*t} v${36*t}`)}
    ${ne(`M${e-8*t} ${s+16*t} v${22*t}`)}
    <ellipse cx="${e+8*t}" cy="${150+18*t}" rx="${78*t}" ry="${46*t}" fill="#2f7d52"/>
    <ellipse cx="${e-48*t}" cy="${150+10*t}" rx="${36*t}" ry="${30*t}" fill="#245e3e"/>
    <ellipse cx="${e-34*t}" cy="${150+16*t}" rx="${42*t}" ry="${34*t}" fill="#95d5b2" ${v(2.2)}/>
    <ellipse cx="${e}" cy="150" rx="${68*t}" ry="${50*t}" fill="#74c69d" ${v()}/>
    <ellipse cx="${e+40*t}" cy="${150+8*t}" rx="${40*t}" ry="${36*t}" fill="#3d9a68" ${v(2.2)}/>
    <ellipse cx="${e-8*t}" cy="${150-6*t}" rx="${28*t}" ry="${20*t}" fill="#b7e4c7" opacity=".95"/>
    ${at(`M${e-20*t} ${150+8*t} q${8*t} ${6*t} 0 ${12*t} M${e+10*t} ${150-4*t} q${8*t} ${6*t} 2 ${12*t} M${e+28*t} ${150+12*t} q${6*t} ${5*t} 0 ${10*t}`)}
    ${ne(`M${e-36*t} ${150-18*t} q${16*t} -8 ${28*t} 2`)}
  </g>`}function Wx(){return`<svg class="yardWorld" viewBox="0 0 2400 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ydsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6eb6e8"/>
        <stop offset=".48" stop-color="#c5e6fb"/>
        <stop offset="1" stop-color="#fff3df"/>
      </linearGradient>
      ${Kc("ydsun","#ffe566",".55")}
    </defs>
    <rect width="2400" height="430" fill="url(#ydsky)"/>
    <circle id="ydSunGlow" cx="1180" cy="68" r="62" fill="url(#ydsun)"/>
    <circle id="ydSun" cx="1180" cy="68" r="30" fill="#ffe566"/>
    <circle cx="1170" cy="58" r="8" fill="#fff" opacity=".8"/>
    ${pl(980,96,1.05)}${pl(1320,78,.85)}${pl(1500,120,.7)}
    <rect y="360" width="2400" height="240" fill="#c6ef9a"/>
    <rect y="360" width="2400" height="28" fill="#e7f8c8"/>
    <rect y="520" width="2400" height="80" fill="#9ed67a"/>
    <path d="M1040 470 q30 -12 16 -6 M1200 510 q28 -12 14 -4 M1360 548 q24 -10 12 -4" fill="none" stroke="#3d9a68" stroke-width="1.2" stroke-linecap="round" opacity=".22"/>
    ${Hx(846,2118,258,372,24)}
    ${Ox(1184,.8)}
    <path d="M840 120 H1076 L1054 152 H862 Z" fill="#ffb3c6" ${v()}/>
    <path d="M960 126 H1064 L1046 148 H976 Z" fill="#e45d88"/>
    ${ne("M876 132 h56")}
    <rect x="864" y="150" width="196" height="222" rx="4" fill="#fff6ea" ${v()}/>
    <rect x="1044" y="156" width="12" height="210" fill="#f0dcc4"/>
    ${at("M880 174 H1000 M880 202 H1000 M880 230 H990 M880 294 H1000 M880 334 H980")}
    <rect x="884" y="180" width="44" height="36" rx="4" fill="#c9ecff" ${v(2.2)}/>
    <rect x="912" y="184" width="12" height="28" fill="#8ecae6"/>
    <path d="M906 180 V216 M884 198 H928" fill="none" ${v(2.2)}/>
    ${ne("M890 188 h12")}
  </svg>`}function Ux(e,t,n,s,o){const i=(600-t)/600*100,a=(n/2400*100).toFixed(3),r=(s/600*100).toFixed(3);return o==="right"?`right:${((2400-(e+n/2))/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`:`left:${((e-n/2)/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`}function Vx(){return`<svg class="doorArt" viewBox="0 0 100 230">
    <rect x="4" y="2" width="92" height="226" rx="3" fill="#f3d2aa" ${v()}/>
    <rect x="76" y="6" width="16" height="218" fill="#d4a373"/>
    <rect x="14" y="12" width="72" height="206" rx="2" fill="#f6e9ff" ${v(2.2)}/>
    <rect x="70" y="16" width="12" height="198" fill="#d4b4e6"/>
    <rect x="24" y="22" width="52" height="42" rx="3" fill="#c9ecff" ${v(2.2)}/>
    <rect x="60" y="26" width="12" height="34" fill="#8ecae6"/>
    <path d="M50 22 V64 M24 43 H76" fill="none" ${v(2.2)}/>
    ${ne("M28 28 h18")}
    <rect x="24" y="76" width="52" height="56" rx="3" fill="#f7ecff" ${v(2.2)}/>
    <rect x="62" y="80" width="10" height="48" fill="#e0c8f0"/>
    ${ne("M28 84 v22")}
    <rect x="24" y="144" width="52" height="56" rx="3" fill="#f7ecff" ${v(2.2)}/>
    <rect x="62" y="148" width="10" height="48" fill="#e0c8f0"/>
    <circle cx="64" cy="126" r="4.2" fill="#ffd166" ${v(2.2)}/>
    <rect x="10" y="214" width="80" height="10" rx="2" fill="#e7c49a" ${v(2.2)}/>
  </svg>`}function Qx(e){const t=e==="living"?Dh:Ih,n=e==="living"?"backyard":"living",s=e==="living"?"Backyard":"Back inside",o=e==="yard"?"right":"left";return`<button type="button" class="yardDoor" data-yard-go="${n}" aria-label="${s}" style="${Ux(t.x,t.y,t.w,t.h,o)}">${Vx()}<span class="yardHintLabel"><span>${s}</span></span></button>`}function Jc(e,t){const n=e.replace(/[&<>]/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[s]);return`<figure class="ysCard"><div class="ysArt">${t}</div><figcaption>${n}</figcaption></figure>`}function zx(){return`<div class="yardSheet" data-yard-sheet="1"><h1>Backyard pieces</h1><div class="ysGrid">${Hi.map(t=>Jc(t.name,mn(t))).join("")}</div></div>`}function qx(e,t){return Jc(e,`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${t}</svg>`)}function Zx(){const e=(r,l)=>we(r,l,96.4),t=`
    ${e(50,40)}
    <path d="M18 58 V30 Q18 18 32 18 H68 Q82 18 82 30 V58 Z" fill="#ffb7cc" ${v()}/>
    <path d="M56 24 H76 Q80 24 80 32 V52 H56 Z" fill="#e888a8"/>
    <circle cx="34" cy="38" r="3.4" fill="#ff8fab" ${v(2)}/><circle cx="33" cy="37" r="1.1" fill="#fff"/>
    <circle cx="50" cy="36" r="3.4" fill="#ff8fab" ${v(2)}/><circle cx="49" cy="35" r="1.1" fill="#fff"/>
    <circle cx="66" cy="38" r="3.4" fill="#e45d88" ${v(2)}/><circle cx="65" cy="37" r="1.1" fill="#fff"/>
    <rect x="4" y="44" width="20" height="38" rx="10" fill="#ff7096" ${v()}/>
    <ellipse cx="14" cy="44" rx="12" ry="9" fill="#ff9ab6" ${v()}/>
    <ellipse cx="9" cy="41" rx="4" ry="2.4" fill="#fff" opacity=".7"/>
    <rect x="76" y="44" width="20" height="38" rx="10" fill="#e04878" ${v()}/>
    <ellipse cx="86" cy="44" rx="12" ry="9" fill="#e45d88" ${v()}/>
    <rect x="20" y="64" width="60" height="16" rx="6" fill="#ff8fab" ${v()}/>
    <rect x="22" y="56" width="28" height="22" rx="7" fill="#ffe0ea" ${v(2.4)}/>
    <rect x="50" y="56" width="28" height="22" rx="7" fill="#ffc2d4" ${v(2.4)}/>
    <rect x="66" y="58" width="10" height="18" rx="4" fill="#e888a8"/>
    <path d="M26 60 h20 M54 60 h16 M26 74 h20 M54 74 h16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M50 58 v18" fill="none" stroke="#e45d88" stroke-width="2.2" stroke-linecap="round"/>
    <rect x="26" y="46" width="20" height="16" rx="5" fill="#fff" ${v(2.2)}/>
    <path d="M33 52 c-2.2 -3.2 -6.4 -.4 -3.4 2.6 c1 1.2 3.4 2.6 3.4 2.6 c0 0 2.4 -1.4 3.4 -2.6 c3 -3 -1.2 -5.8 -3.4 -2.6 z" fill="#ff8fab"/>
    <path d="M41 56 c-1.4 -2 -4.2 0 -2.2 1.8 c.7 .8 2.2 1.6 2.2 1.6 c0 0 1.5 -.8 2.2 -1.6 c2 -1.8 -.8 -3.8 -2.2 -1.8 z" fill="#7eb4dc"/>
    <rect x="16" y="84" width="7" height="10" rx="2" fill="${st}"/>
    <rect x="77" y="84" width="7" height="10" rx="2" fill="${st}"/>`,n=`
    <defs>${Kc("a2lamp-glow","#ffd56a",".95")}</defs>
    ${e(50,22)}
    <path d="M34 8 L42 8 L37 40 L24 40 Z" fill="#fff6d4"/>
    <path d="M42 8 L50 8 L50 40 L37 40 Z" fill="#ffe08a"/>
    <path d="M50 8 L58 8 L63 40 L50 40 Z" fill="#f0c45c"/>
    <path d="M58 8 L66 8 L76 40 L63 40 Z" fill="#e0a83a"/>
    <path d="M24 40 L34 8 H66 L76 40 Z" fill="none" ${v()}/>
    <path d="M42 8 L37 40 M50 8 V40 M58 8 L63 40" fill="none" stroke="${st}" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="50" cy="36" rx="20" ry="10" fill="url(#a2lamp-glow)"/>
    <rect x="46" y="40" width="8" height="42" rx="3" fill="#e4ccf2" ${v()}/>
    <rect x="50" y="44" width="4" height="34" rx="2" fill="#c49ad4"/>
    <ellipse cx="50" cy="88" rx="20" ry="6" fill="#d4b4e6" ${v()}/>
    <ellipse cx="60" cy="90" rx="8" ry="3" fill="#b888c8"/>
    <ellipse cx="42" cy="86" rx="6" ry="2" fill="#fff" opacity=".55"/>`,s=`
    ${e(50,30)}
    <ellipse cx="30" cy="40" rx="14" ry="22" fill="#b7ebc8" ${v()} transform="rotate(-30 30 40)"/>
    <path d="M34 28 C30 40 32 52 44 58" fill="#52b078"/>
    <ellipse cx="72" cy="42" rx="13" ry="20" fill="#3d9a68" ${v()} transform="rotate(26 72 42)"/>
    <path d="M50 66 C40 44 42 18 50 6 C58 18 60 44 50 66 Z" fill="#d8f6e4" ${v()}/>
    <path d="M54 18 C60 32 58 48 50 58 C56 44 58 28 54 18 Z" fill="#52b078"/>
    <path d="M50 14 V52" fill="none" stroke="#2f7a52" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
    <path d="M40 60 C34 50 24 48 22 38 C32 44 38 54 42 64 Z" fill="#74c69d" ${v(2.2)}/>
    <path d="M28 64 H74 L68 94 H34 Z" fill="#e8845a" ${v()}/>
    <path d="M58 66 H72 L68 92 H60 Z" fill="#c45c38"/>
    <rect x="22" y="58" width="58" height="10" rx="4" fill="#f0a078" ${v()}/>
    <rect x="56" y="60" width="20" height="6" rx="3" fill="#d47848"/>
    <ellipse cx="50" cy="65" rx="20" ry="3" fill="#a86a42" opacity=".4"/>
    <path d="M28 62 h14" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>`,o=Object.fromEntries(Hi.map(r=>[r.kind,r])),i=(r,l,c)=>qx(r,l)+Jc(o[c].name,mn(o[c]));return`<div class="yardSheet yardCompare" data-yard-compare="1"><h1>House style and the yard</h1><p class="ysNote">Sofa, lamp, and plant are the approved refresh. Swing, cart, and birdbath use the same light.</p><div class="ysPair">${i("Sofa",t,"yard-swing")+i("Lamp",n,"lemonade-cart")+i("Plant",s,"birdbath")}</div></div>`}const Yo="#5a3d5c",z=`stroke="${Yo}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,ya='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>',Hh=[{kind:"soaking-tub",name:"Soaking Tub",cat:"furniture",w:250,h:200,vb:"0 0 120 96",svg:`<ellipse cx="60" cy="92" rx="48" ry="3.2" fill="#000" opacity=".12"/><rect x="18" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${z}/><rect x="92" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${z}/><path d="M14 58 Q8 58 10 46 L22 28 H98 L110 46 Q112 58 106 58 Z" fill="#fff" ${z}/><ellipse cx="60" cy="30" rx="44" ry="14" fill="#fff" ${z}/><ellipse cx="60" cy="32" rx="34" ry="9" fill="#d7f3ff"/><path d="M28 34 Q60 42 92 34" fill="none" stroke="#b9e6f8" stroke-width="4"/><rect x="96" y="8" width="8" height="22" rx="4" fill="#f7d27a" ${z}/><path d="M100 28 Q112 34 104 44" fill="none" ${z}/><circle cx="104" cy="46" r="3.2" fill="#a8d4ea" ${z}/><ellipse cx="46" cy="30" rx="8" ry="3" fill="#fff" opacity=".7"/>`},{kind:"bath-toilet",name:"Toilet",cat:"furniture",w:120,h:160,vb:"0 0 100 134",svg:`<ellipse cx="50" cy="128" rx="34" ry="4" fill="#000" opacity=".12"/><rect x="28" y="8" width="44" height="36" rx="8" fill="#fff" ${z}/><rect x="34" y="16" width="32" height="16" rx="4" fill="#e7f6ff"/><rect x="46" y="42" width="8" height="10" fill="#f4f7fb" ${z}/><ellipse cx="50" cy="78" rx="36" ry="22" fill="#fff" ${z}/><ellipse cx="50" cy="74" rx="24" ry="14" fill="#d7f3ff" ${z}/><path d="M18 70 Q50 58 82 70" fill="#fff" ${z}/><rect x="40" y="96" width="20" height="24" rx="4" fill="#f7f4ef" ${z}/>`},{kind:"sink-vanity",name:"Sink Vanity",cat:"furniture",w:210,h:190,vb:"0 0 110 100",svg:`<ellipse cx="55" cy="96" rx="46" ry="3.2" fill="#000" opacity=".12"/><rect x="10" y="48" width="90" height="42" rx="8" fill="#f6e2c4" ${z}/><path d="M55 48 V90" ${z}/><circle cx="28" cy="70" r="3" fill="${Yo}"/><circle cx="82" cy="70" r="3" fill="${Yo}"/><rect x="16" y="90" width="8" height="6" rx="2" fill="${Yo}"/><rect x="86" y="90" width="8" height="6" rx="2" fill="${Yo}"/><ellipse cx="55" cy="44" rx="40" ry="12" fill="#fff" ${z}/><ellipse cx="55" cy="44" rx="26" ry="7" fill="#d7f3ff"/><rect x="50" y="10" width="10" height="28" rx="4" fill="#f7d27a" ${z}/><path d="M55 36 Q70 40 66 48" fill="none" ${z}/><rect x="8" y="40" width="94" height="8" rx="3" fill="#f3d2b5" ${z}/>`},{kind:"bath-mirror",name:"Bath Mirror",cat:"decor",w:120,h:160,wall:!0,vb:"0 0 90 120",svg:`<path d="M45 8 C70 8 82 28 82 58 C82 92 68 112 45 112 C22 112 8 92 8 58 C8 28 20 8 45 8 Z" fill="#f7d27a" ${z}/><ellipse cx="45" cy="60" rx="26" ry="40" fill="#d7f4ff" ${z}/><path d="M30 36 l8 -8 M28 52 l18 -16" stroke="#fff" stroke-width="4" stroke-linecap="round"/><rect x="38" y="2" width="14" height="8" rx="3" fill="#f28fa6" ${z}/>`},{kind:"towel-bar",name:"Towel Bar",cat:"decor",w:170,h:116,wall:!0,vb:"0 0 150 102",svg:`<rect x="10" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${z}/><rect x="130" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${z}/><rect x="14" y="16" width="122" height="8" rx="4" fill="#c98d55" ${z}/><path d="M26 24 H124 V70 Q75 100 26 70 Z" fill="#f7d7e4" ${z}/><path d="M75 24 V88" stroke="#f28fa6" stroke-width="3"/><path d="M40 36 H110" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"bath-mat",name:"Bath Mat",cat:"decor",w:230,h:120,vb:"0 0 160 84",svg:`<ellipse cx="80" cy="78" rx="70" ry="5" fill="#000" opacity=".1"/><rect x="12" y="22" width="136" height="48" rx="18" fill="#f28fa6" ${z}/><rect x="24" y="32" width="112" height="28" rx="12" fill="#f7d7e4"/><path d="M40 46 H120 M40 54 H120" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>`},{kind:"rubber-ducky",name:"Rubber Ducky",cat:"decor",w:80,svg:`${ya}<ellipse cx="48" cy="68" rx="30" ry="26" fill="#f7d27a" ${z}/><circle cx="68" cy="40" r="18" fill="#ffe9a8" ${z}/><path d="M82 38 H98 Q102 44 92 48 H82 Z" fill="#f28fa6" ${z}/><ellipse cx="36" cy="74" rx="12" ry="8" fill="#f3c15a"/>`},{kind:"shower-curtain",name:"Shower Curtain",cat:"decor",w:150,h:260,holdable:!1,vb:"0 0 90 156",svg:`<rect x="8" y="8" width="74" height="8" rx="3" fill="#c98d55" ${z}/><circle cx="22" cy="16" r="3" fill="#f7d27a" ${z}/><circle cx="40" cy="16" r="3" fill="#f7d27a" ${z}/><circle cx="58" cy="16" r="3" fill="#f7d27a" ${z}/><circle cx="72" cy="16" r="3" fill="#f7d27a" ${z}/><path d="M12 18 Q8 80 16 146 H40 Q30 80 36 18 Z" fill="#d7f4ff" ${z}/><path d="M36 18 Q34 80 46 146 H74 Q84 80 78 18 Z" fill="#f7d7e4" ${z}/><path d="M24 40 Q18 70 26 100 M58 40 Q66 70 58 110" fill="none" stroke="#fff" stroke-width="3" opacity=".65"/>`},{kind:"soap-dish",name:"Soap Dish",cat:"decor",w:90,svg:`${ya}<ellipse cx="50" cy="78" rx="34" ry="12" fill="#fff" ${z}/><ellipse cx="50" cy="74" rx="26" ry="7" fill="#e7f6ff"/><rect x="28" y="48" width="44" height="22" rx="8" fill="#f7d7e4" ${z}/><path d="M36 56 H64" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"laundry-hamper",name:"Laundry Hamper",cat:"furniture",w:140,h:160,vb:"0 0 100 114",svg:`<ellipse cx="50" cy="108" rx="36" ry="4" fill="#000" opacity=".12"/><path d="M18 40 H82 L74 100 H26 Z" fill="#b9a0dc" ${z}/><path d="M24 58 H76 M26 74 H74" stroke="#fff" stroke-width="3" opacity=".55"/><ellipse cx="50" cy="40" rx="34" ry="10" fill="#c9b6e8" ${z}/><path d="M22 36 Q50 18 78 36" fill="#f7d7e4" ${z}/><path d="M40 28 Q50 40 62 26" fill="none" stroke="#f28fa6" stroke-width="4" stroke-linecap="round"/>`},{kind:"bath-stool",name:"Bath Stool",cat:"furniture",w:110,svg:`${ya}<ellipse cx="50" cy="58" rx="36" ry="12" fill="#f6e2c4" ${z}/><ellipse cx="50" cy="54" rx="28" ry="7" fill="#fff6ea"/><path d="M22 64 L16 92 M78 64 L84 92 M36 66 L34 92 M64 66 L66 92" ${z}/><path d="M18 90 H34 M66 90 H84" ${z}/>`}],Nx=[{kind:"floor-cushion",name:"Floor Cushion",cat:"decor",w:150,h:136,vb:"0 0 130 118",svg:`<ellipse cx="65" cy="112" rx="50" ry="4" fill="#000" opacity=".12"/><ellipse cx="65" cy="68" rx="52" ry="40" fill="#f28fa6" ${z}/><ellipse cx="65" cy="58" rx="40" ry="24" fill="#f7d7e4"/><path d="M38 64 Q65 82 92 64" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"story-pillow",name:"Story Pillow",cat:"decor",w:120,h:100,vb:"0 0 110 92",svg:`<ellipse cx="55" cy="86" rx="40" ry="4" fill="#000" opacity=".12"/><rect x="14" y="28" width="82" height="52" rx="18" fill="#a8d4ea" ${z}/><path d="M55 40 l6 12 13 2 -10 8 2 13 -11 -7 -11 7 2 -13 -10 -8 13 -2 z" fill="#f7d27a" ${z}/>`},{kind:"berry-basket",name:"Berry Basket",cat:"food",w:100,svg:`${ya}<path d="M22 48 H78 L70 88 H30 Z" fill="#f3d2b5" ${z}/><path d="M30 58 H70 M32 70 H68 M34 80 H66" ${z}/><circle cx="40" cy="40" r="10" fill="#f28fa6" ${z}/><circle cx="58" cy="36" r="10" fill="#c94b6a" ${z}/><circle cx="70" cy="48" r="8" fill="#b9a0dc" ${z}/><path d="M34 36 Q40 28 46 36" fill="none" stroke="#7dce8a" stroke-width="3"/>`},{kind:"ribbon-tray",name:"Ribbon Tray",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`<ellipse cx="70" cy="84" rx="52" ry="4" fill="#000" opacity=".12"/><rect x="16" y="40" width="108" height="36" rx="12" fill="#fff" ${z}/><rect x="22" y="46" width="96" height="22" rx="8" fill="#f7d7e4"/><rect x="36" y="28" width="16" height="22" rx="5" fill="#a8d4ea" ${z}/><rect x="58" y="22" width="14" height="28" rx="5" fill="#f7d27a" ${z}/><path d="M96 24 Q110 16 112 32 Q100 28 104 40 Q92 34 96 24 Z" fill="#f28fa6" ${z}/>`}],Se="#5a3d5c",L=`stroke="${Se}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,to=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${Se}"/><circle cx="${t}" cy="${n}" r="3" fill="${Se}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,ta=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,Ce='<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>',wn=[{kind:"sofa",name:"Sofa",cat:"furniture",w:260,svg:`${Ce}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${L}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${L}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${L}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${L}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${L}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${Se}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${Se}"/>`},{kind:"armchair",name:"Armchair",cat:"furniture",w:150,svg:`${Ce}<rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${L}/><rect x="6" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${L}/><rect x="72" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${L}/><rect x="24" y="58" width="52" height="24" rx="10" fill="#b8e0f2" ${L}/><rect x="20" y="86" width="6" height="10" rx="2" fill="${Se}"/><rect x="74" y="86" width="6" height="10" rx="2" fill="${Se}"/>`},{kind:"bed",name:"Bed",cat:"furniture",w:300,svg:`${Ce}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${L}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${L}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${L}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${L}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${L}/>`},{kind:"table",name:"Table",cat:"furniture",w:200,svg:`${Ce}<rect x="4" y="30" width="92" height="14" rx="7" fill="#f4a261" ${L}/><rect x="14" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${L}/><rect x="76" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${L}/><path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".5"/>`},{kind:"chair",name:"Chair",cat:"furniture",w:100,svg:`${Ce}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${L}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${L}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${L}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${L}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/>`},{kind:"lamp",name:"Lamp",cat:"furniture",w:90,svg:`${Ce}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${L}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${L}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${L}/><circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>`},{kind:"fridge",name:"Fridge",cat:"furniture",w:150,svg:`${Ce}<rect x="16" y="4" width="68" height="90" rx="14" fill="#bde0fe" ${L}/><path d="M16 38 H84" ${L}/><rect x="70" y="14" width="5" height="16" rx="2" fill="${Se}"/><rect x="70" y="46" width="5" height="22" rx="2" fill="${Se}"/><circle cx="32" cy="22" r="5" fill="#ff8fab" ${L}/><rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${L}/>`},{kind:"stove",name:"Stove",cat:"furniture",w:170,svg:`${Ce}<rect x="8" y="26" width="84" height="68" rx="12" fill="#ffadad" ${L}/><rect x="8" y="18" width="84" height="14" rx="6" fill="#ffd6a5" ${L}/><rect x="20" y="46" width="60" height="36" rx="8" fill="#5a3d5c" opacity=".85"/><rect x="26" y="52" width="48" height="8" rx="4" fill="#fff" opacity=".25"/><circle cx="22" cy="38" r="3" fill="${Se}"/><circle cx="36" cy="38" r="3" fill="${Se}"/><circle cx="78" cy="38" r="3" fill="${Se}"/>`},{kind:"bookshelf",name:"Shelf",cat:"furniture",w:170,svg:`${Ce}<rect x="10" y="4" width="80" height="90" rx="10" fill="#d4a373" ${L}/><path d="M10 34 H90 M10 64 H90" ${L}/><rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${L}/><rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${L}/><rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${L}/><rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${L}/><rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${L}/><circle cx="34" cy="80" r="8" fill="#ffadad" ${L}/>`},{kind:"tub",name:"Bathtub",cat:"furniture",w:240,svg:`${Ce}<circle cx="30" cy="40" r="7" fill="#bde0fe" ${L}/><circle cx="44" cy="34" r="9" fill="#e0f2ff" ${L}/><circle cx="60" cy="40" r="7" fill="#bde0fe" ${L}/><path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${L}/><rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${L}/><rect x="22" y="88" width="8" height="8" rx="2" fill="${Se}"/><rect x="70" y="88" width="8" height="8" rx="2" fill="${Se}"/>`},{kind:"rug",name:"Rug",cat:"decor",w:320,svg:`<ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${L}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${L}/><ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${L}/>`},{kind:"picture",name:"Picture",cat:"decor",w:130,wall:!0,svg:`<rect x="10" y="20" width="80" height="64" rx="8" fill="#ffd166" ${L}/><rect x="18" y="28" width="64" height="48" rx="4" fill="#bde0fe"/><circle cx="66" cy="40" r="7" fill="#fff3b0"/><path d="M18 76 L38 50 L52 64 L62 54 L82 76 Z" fill="#90e0a8" ${L}/>`},{kind:"window",name:"Window",cat:"decor",w:180,wall:!0,svg:`<rect class="winGlass" x="12" y="8" width="76" height="76" rx="38" fill="#a2d2ff" ${L}/><g class="winDay"><circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/></g><g class="winNight"><circle cx="62" cy="28" r="7" fill="#fff6d8"/><circle cx="28" cy="24" r="1.4" fill="#fff"/><circle cx="44" cy="20" r="1.1" fill="#fff"/><circle cx="70" cy="42" r="1.2" fill="#fff"/><circle cx="36" cy="46" r="1" fill="#fff"/></g><path d="M50 8 V84 M12 50 H88" ${L}/><path d="M4 8 Q20 40 10 90 M96 8 Q80 40 90 90" stroke="#ff8fab" stroke-width="9" fill="none" stroke-linecap="round"/>`},{kind:"clock",name:"Clock",cat:"decor",w:90,wall:!0,svg:`<circle cx="50" cy="50" r="38" fill="#fff" ${L}/><circle cx="50" cy="50" r="30" fill="#fff3b0"/><path d="M50 50 V28 M50 50 L64 58" ${L}/><circle cx="50" cy="50" r="3" fill="${Se}"/>${ta(30,70,66)}`},{kind:"stars",name:"Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M30 20 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffd166" ${L}/><path d="M70 40 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#ffadad" ${L}/><path d="M40 66 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#a2d2ff" ${L}/>`},{kind:"balloon",name:"Balloons",cat:"decor",w:110,svg:`<path d="M38 52 Q44 74 50 96 M64 46 Q58 72 50 96" stroke="${Se}" stroke-width="2" fill="none"/><ellipse cx="36" cy="32" rx="18" ry="22" fill="#ff8fab" ${L}/><ellipse cx="66" cy="28" rx="18" ry="22" fill="#a2d2ff" ${L}/><ellipse cx="30" cy="24" rx="4" ry="7" fill="#fff" opacity=".6"/>`},{kind:"teddy",name:"Teddy",cat:"decor",w:100,svg:`${Ce}<circle cx="26" cy="22" r="10" fill="#d4a373" ${L}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${L}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${L}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${L}/>${to(40,60,36)}<ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/><circle cx="50" cy="46" r="2.5" fill="${Se}"/>${ta(32,68,46)}`},{kind:"ball",name:"Ball",cat:"decor",w:70,svg:`${Ce}<circle cx="50" cy="58" r="36" fill="#ffd166" ${L}/><path d="M18 46 Q50 66 82 46 M26 82 Q50 60 74 82" stroke="#ff7096" stroke-width="7" fill="none"/>`},{kind:"tv",name:"TV",cat:"decor",w:170,svg:`${Ce}<rect x="6" y="14" width="88" height="62" rx="14" fill="#c9a0dc" ${L}/><rect x="16" y="22" width="68" height="46" rx="8" fill="#a2d2ff"/><path d="M30 6 L44 14 M70 6 L56 14" ${L}/><rect x="36" y="78" width="28" height="16" rx="4" fill="#b388d6" ${L}/>${to(42,58,42)}<path d="M44 52 q6 5 12 0" ${L} fill="none"/>`},{kind:"plant",name:"Plant",cat:"plants",w:110,svg:`${Ce}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${L} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${L} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${L}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${L}/><rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${L}/>`},{kind:"cactus",name:"Cactus",cat:"plants",w:80,svg:`${Ce}<rect x="36" y="12" width="28" height="64" rx="14" fill="#80ed99" ${L}/><path d="M36 50 H24 a8 8 0 0 1 -8 -8 V34" fill="none" stroke="${Se}" stroke-width="3.5"/><rect x="12" y="26" width="12" height="22" rx="6" fill="#80ed99" ${L}/><circle cx="50" cy="12" r="6" fill="#ff8fab" ${L}/>${to(44,56,40)}<path d="M28 74 H72 L66 96 H34 Z" fill="#c9a0dc" ${L}/>`},{kind:"flowers",name:"Flowers",cat:"plants",w:90,svg:`${Ce}<path d="M50 70 V30 M50 60 Q30 50 30 30 M50 60 Q70 50 70 30" stroke="#52b788" stroke-width="4" fill="none"/><circle cx="50" cy="26" r="10" fill="#ff8fab" ${L}/><circle cx="30" cy="28" r="9" fill="#ffd166" ${L}/><circle cx="70" cy="28" r="9" fill="#a2d2ff" ${L}/><circle cx="50" cy="26" r="3" fill="#fff"/><path d="M32 66 H68 L62 96 H38 Z" fill="#a2d2ff" ${L}/>`},{kind:"tree",name:"Mini Tree",cat:"plants",w:140,svg:`${Ce}<rect x="44" y="54" width="12" height="30" rx="4" fill="#b07d54" ${L}/><circle cx="50" cy="36" r="30" fill="#52b788" ${L}/><circle cx="38" cy="30" r="5" fill="#ff8fab"/><circle cx="62" cy="40" r="5" fill="#ff8fab"/><circle cx="52" cy="22" r="5" fill="#ff8fab"/><path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${L}/>`},{kind:"cake",name:"Cake",cat:"food",w:100,svg:`<rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${L}/><path d="M16 58 q8 10 17 0 q8 10 17 0 q8 10 17 0 q8 10 17 0" fill="#fff" ${L}/><rect x="46" y="28" width="8" height="22" rx="3" fill="#a2d2ff" ${L}/><path d="M50 14 q6 8 0 12 q-6 -4 0 -12" fill="#ffd166" ${L}/><ellipse cx="50" cy="92" rx="40" ry="5" fill="#fff" ${L}/>`},{kind:"apple",name:"Apple",cat:"food",w:60,svg:`<path d="M50 30 C20 18 8 50 22 74 C32 92 44 90 50 86 C56 90 68 92 78 74 C92 50 80 18 50 30 Z" fill="#ff6b6b" ${L}/><path d="M50 30 Q52 16 58 10" ${L} fill="none"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#80ed99" ${L} transform="rotate(-20 64 18)"/><ellipse cx="34" cy="46" rx="5" ry="9" fill="#fff" opacity=".5"/>`},{kind:"donut",name:"Donut",cat:"food",w:70,svg:`<circle cx="50" cy="58" r="36" fill="#e9c46a" ${L}/><path d="M18 52 Q20 26 50 24 Q80 26 82 52 Q76 62 66 56 Q56 66 46 58 Q34 66 24 58 Z" fill="#ff8fab" ${L}/><circle cx="50" cy="52" r="10" fill="#fff" ${L}/><rect x="30" y="36" width="6" height="3" rx="1.5" fill="#a2d2ff" transform="rotate(30 33 37)"/><rect x="64" y="38" width="6" height="3" rx="1.5" fill="#ffd166"/><rect x="56" y="30" width="6" height="3" rx="1.5" fill="#80ed99" transform="rotate(-30 59 31)"/>`},{kind:"pizza",name:"Pizza",cat:"food",w:80,svg:`<path d="M10 20 Q50 6 90 20 L50 94 Z" fill="#ffd166" ${L}/><path d="M10 20 Q50 6 90 20 L86 28 Q50 16 14 28 Z" fill="#e9a96a" ${L}/><circle cx="42" cy="38" r="7" fill="#ff6b6b" ${L}/><circle cx="62" cy="44" r="6" fill="#ff6b6b" ${L}/><circle cx="50" cy="62" r="6" fill="#ff6b6b" ${L}/>`},{kind:"juice",name:"Juice",cat:"food",w:55,svg:`<path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${L}/><path d="M27 44 H73 L70 92 H30 Z" fill="#ffb347"/><path d="M24 26 H76 L70 92 H30 Z" fill="none" ${L}/><path d="M58 30 L66 4" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="60" r="4" fill="#fff" opacity=".6"/>`},{kind:"cat",name:"Toy cat",cat:"pets",w:110,svg:`${Ce}<path d="M78 80 Q98 70 90 50" stroke="#ffb347" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="30" ry="20" fill="#ffb347" ${L}/><path d="M22 30 L26 8 L40 22 M78 30 L74 8 L60 22" fill="#ffb347" ${L}/><circle cx="50" cy="42" r="28" fill="#ffc46b" ${L}/>${to(40,60,40)}<path d="M46 50 q4 4 8 0" ${L} fill="none"/>${ta(32,68,50)}`},{kind:"dog",name:"Puppy",cat:"pets",w:120,svg:`${Ce}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#f5ebe0" ${L}/><circle cx="50" cy="42" r="28" fill="#fff" ${L}/><ellipse cx="22" cy="44" rx="10" ry="18" fill="#b07d54" ${L}/><ellipse cx="78" cy="44" rx="10" ry="18" fill="#b07d54" ${L}/><circle cx="60" cy="34" r="8" fill="#e6b88a" opacity=".7"/>${to(40,60,40)}<ellipse cx="50" cy="52" rx="5" ry="4" fill="${Se}"/><path d="M50 56 v6" ${L}/>`},{kind:"bunny",name:"Bunny",cat:"pets",w:90,svg:`${Ce}<ellipse cx="36" cy="22" rx="8" ry="20" fill="#fff" ${L}/><ellipse cx="64" cy="22" rx="8" ry="20" fill="#fff" ${L}/><ellipse cx="36" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="64" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="50" cy="76" rx="28" ry="20" fill="#fff" ${L}/><circle cx="50" cy="52" r="22" fill="#fff" ${L}/>${to(42,58,50)}<path d="M47 58 l3 3 3 -3" ${L} fill="none"/>${ta(36,64,58)}`},{kind:"fish",name:"Fish Bowl",cat:"pets",w:100,svg:`${Ce}<circle cx="50" cy="54" r="40" fill="#cdeffd" ${L}/><path d="M14 46 H86" stroke="#8ecae6" stroke-width="3"/><path d="M60 64 l14 -8 v16 z" fill="#ff9f68" ${L}/><ellipse cx="46" cy="64" rx="16" ry="11" fill="#ffb347" ${L}/><circle cx="40" cy="62" r="2.5" fill="${Se}"/><circle cx="32" cy="38" r="3" fill="#fff" opacity=".8"/><rect x="24" y="10" width="52" height="8" rx="4" fill="#cdeffd" ${L}/>`},{kind:"kennel",name:"Dog Kennel",cat:"pets",w:210,h:175,holdable:!1,vb:"0 0 120 100",svg:`<ellipse cx="60" cy="97" rx="48" ry="3.2" fill="#000" opacity=".12"/><path d="M14 50 L60 12 L106 50 Z" fill="#ff8fab" ${L}/><path d="M28 46 L60 22 L92 46 Z" fill="#ffd6e4"/><rect x="20" y="46" width="80" height="50" rx="10" fill="#fff6ea" ${L}/><path d="M20 56 H100" stroke="#ffc2d4" stroke-width="7"/><path d="M34 96 V58 Q60 36 86 58 V96 Z" fill="#f3e4ff" ${L}/><path d="M40 96 V64 Q60 46 80 64 V96 Z" fill="#ffe8c7"/><circle cx="86" cy="64" r="8" fill="#bde0fe" ${L}/><circle cx="84" cy="62" r="2.2" fill="#fff" opacity=".9"/><path d="M28 62 l2.4 2.4 2.4-2.4 2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4z" fill="#ff8fab" ${L}/><circle cx="30" cy="90" r="3.2" fill="#fff" ${L}/><rect x="32" y="88.4" width="14" height="3.4" rx="1.7" fill="#fff" ${L}/><circle cx="48" cy="90" r="3.2" fill="#fff" ${L}/>`},{kind:"cat-tower",name:"Cat Tower",cat:"pets",w:150,h:225,holdable:!1,vb:"0 0 100 150",svg:`<ellipse cx="50" cy="146" rx="36" ry="3.4" fill="#000" opacity=".12"/><rect x="44" y="30" width="12" height="104" rx="6" fill="#c9a0dc" ${L}/><ellipse cx="50" cy="136" rx="34" ry="10" fill="#ffc8dd" ${L}/><ellipse cx="50" cy="132" rx="26" ry="6" fill="#fff6ea"/><ellipse cx="50" cy="102" rx="30" ry="8" fill="#bde0fe" ${L}/><ellipse cx="50" cy="98" rx="22" ry="4" fill="#fff" opacity=".8"/><ellipse cx="50" cy="64" rx="28" ry="8" fill="#ffd166" ${L}/><ellipse cx="50" cy="60" rx="20" ry="4" fill="#fff6d0"/><circle cx="50" cy="22" r="8" fill="#ff8fab" ${L}/><circle cx="47" cy="19" r="2.2" fill="#fff" opacity=".75"/><g class="dangle"><circle cx="22" cy="126" r="8" fill="#ffb3c6" ${L}/><path d="M22 126 q12 5 7 16" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/></g><circle cx="80" cy="92" r="3.4" fill="#ffd166" ${L}/>`},{kind:"vanity",name:"Vanity",cat:"furniture",w:230,svg:`${Ce}<ellipse cx="50" cy="26" rx="24" ry="22" fill="#fff" ${L}/><ellipse cx="50" cy="26" rx="18" ry="16" fill="#cdeffd"/><path d="M38 18 l6 -6 M42 26 l10 -10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="12" r="3" fill="#ffd166" ${L}/><circle cx="74" cy="12" r="3" fill="#ffd166" ${L}/><rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${L}/><rect x="10" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${L}/><rect x="62" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${L}/><circle cx="24" cy="75" r="3" fill="${Se}"/><circle cx="76" cy="75" r="3" fill="${Se}"/><rect x="12" y="90" width="6" height="7" rx="2" fill="${Se}"/><rect x="82" y="90" width="6" height="7" rx="2" fill="${Se}"/>`},{kind:"stool",name:"Vanity Stool",cat:"furniture",w:90,svg:`${Ce}<ellipse cx="50" cy="48" rx="34" ry="14" fill="#c9a0dc" ${L}/><ellipse cx="50" cy="44" rx="28" ry="9" fill="#e4ccf2"/><path d="M28 58 L22 94 M72 58 L78 94 M50 62 V94" ${L}/><ellipse cx="50" cy="78" rx="22" ry="4" fill="none" ${L}/>`},{kind:"perfume",name:"Perfume",cat:"decor",w:50,svg:`<rect x="40" y="8" width="20" height="14" rx="5" fill="#ffd166" ${L}/><rect x="46" y="20" width="8" height="10" fill="#fff" ${L}/><path d="M20 50 Q20 30 50 30 Q80 30 80 50 V80 Q80 94 66 94 H34 Q20 94 20 80 Z" fill="#ff8fab" ${L}/><ellipse cx="36" cy="52" rx="5" ry="10" fill="#fff" opacity=".6"/><path d="M50 56 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#fff" opacity=".8"/>`},{kind:"polish",name:"Nail Polish",cat:"decor",w:40,svg:`<rect x="38" y="4" width="24" height="40" rx="8" fill="${Se}"/><path d="M24 54 Q24 42 36 42 H64 Q76 42 76 54 V84 Q76 96 64 96 H36 Q24 96 24 84 Z" fill="#b388d6" ${L}/><ellipse cx="38" cy="62" rx="5" ry="12" fill="#fff" opacity=".55"/>`},{kind:"hairdryer",name:"Hair Dryer",cat:"decor",w:90,svg:`<path d="M60 52 L70 92 Q70 96 64 96 H58 Q52 96 52 90 L46 56 Z" fill="#a2d2ff" ${L}/><rect x="6" y="20" width="62" height="40" rx="20" fill="#bde0fe" ${L}/><ellipse cx="82" cy="40" rx="12" ry="20" fill="#ffc8dd" ${L}/><ellipse cx="82" cy="40" rx="6" ry="11" fill="#fff" ${L}/><circle cx="24" cy="40" r="7" fill="#fff" opacity=".7"/>`},{kind:"mirror",name:"Mirror",cat:"decor",w:120,wall:!0,svg:`<path d="M50 6 C74 6 88 24 88 50 C88 76 72 94 50 94 C28 94 12 76 12 50 C12 24 26 6 50 6 Z" fill="#ffd166" ${L}/><ellipse cx="50" cy="50" rx="30" ry="36" fill="#e0f4ff" ${L}/><path d="M36 34 l10 -10 M36 46 l20 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ff8fab" ${L}/>`}],ds={sofa:["living"],armchair:["living"],lamp:["living","bedroom"],tv:["living"],rug:["living","bedroom"],picture:["living","bedroom"],bookshelf:["living","bedroom"],bed:["bedroom"],teddy:["bedroom"],stars:["bedroom"],tub:["bedroom"],balloon:["any"],clock:["any"],window:["any"],ball:["any"],vanity:["salon"],stool:["salon"],perfume:["salon"],polish:["salon"],hairdryer:["salon"],mirror:["salon","bedroom"],fridge:["kitchen"],stove:["kitchen"],table:["kitchen","living"],chair:["kitchen","living"]};for(const e of Ah)ds[e.kind]=["nursery"];for(const e of Hi)ds[e.kind]=["backyard"];for(const e of Hh)ds[e.kind]=["bathroom"];ds["floor-cushion"]=["living"];ds["story-pillow"]=["bedroom"];ds["berry-basket"]=["kitchen"];ds["ribbon-tray"]=["salon"];wn.push(...Ah,...Hi,...Hh,...Nx);for(const e of wn)e.rooms=ds[e.kind]??(["food"].includes(e.cat)?["kitchen"]:["any"]);const Fx=new Set(["rug","tv","tree"]);for(const e of wn)e.holdable??=!e.wall&&e.cat!=="furniture"&&e.w<=150&&!Fx.has(e.kind);const jx=[{kind:"ranch-egg",name:"Fresh Egg",cat:"ranch",w:50,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M50 30 C70 30 80 62 80 74 C80 90 66 96 50 96 C34 96 20 90 20 74 C20 62 30 30 50 30 Z" fill="#fff6e6" ${L}/><ellipse cx="40" cy="52" rx="6" ry="9" fill="#fff"/>`},{kind:"ranch-carrot",name:"Garden Carrot",cat:"ranch",w:70,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M30 40 L78 34 L40 96 Z" fill="#ff922b" ${L}/><path d="M44 50 l10 -2 M42 64 l8 -2 M44 78 l6 -1" ${L}/><path d="M72 36 Q80 14 92 14 M72 36 Q68 14 76 4 M72 36 Q90 30 96 36" fill="none" stroke="#40c057" stroke-width="7" stroke-linecap="round"/>`},{kind:"ranch-bouquet",name:"Ranch Flowers",cat:"ranch",w:80,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M50 94 L40 50 M50 94 L50 44 M50 94 L62 50" stroke="#40c057" stroke-width="5" stroke-linecap="round"/><path d="M36 78 L64 78 L56 96 L44 96 Z" fill="#c9a0dc" ${L}/>${[[38,40,"#ff8fab"],[50,30,"#ffd43b"],[64,40,"#74c0fc"],[44,52,"#ff922b"],[58,52,"#c9a0dc"]].map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="9" fill="${n}" ${L}/><circle cx="${e}" cy="${t}" r="3" fill="#fff3b0"/>`).join("")}`}];wn.push(...ex,...Y2,...jx);const Me=Object.fromEntries(wn.map(e=>[e.kind,e])),li=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),ft=e=>e.h??e.w,ed=e=>e.img?`<img class="packimg" src="${li(e.img)}" alt="${li(e.name)}" draggable="false" />`:`<svg viewBox="${e.vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${e.svg}</svg>`,mn=(e,t=!1)=>{const n=vo()?Ws(e.kind):void 0;if(!n)return ed(e);const s=t&&!e.wall?'<i class="artshade" aria-hidden="true"></i>':"",o=e.kind==="window"?'<i class="artnight" aria-hidden="true"></i>':"";return`${s}${o}<img class="packimg artimg" data-kind="${li(e.kind)}" src="${li(n)}" alt="${li(e.name)}" draggable="false" />`},Gx='<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="22" width="56" height="56" rx="14" fill="#fff6ea" stroke="#5a3d5c" stroke-width="4"/></svg>',Yx=(e,t)=>e.img&&/\.webp(?:$|\?)/i.test(e.img)?Gx:ed(e);let Af=!1;function Kx(){Af||typeof window>"u"||(Af=!0,window.addEventListener("error",e=>{const t=e.target;if(!(t instanceof HTMLImageElement)||!t.classList.contains("artimg")||t.dataset.fell==="1")return;const n=Me[t.dataset.kind||""];if(!n)return;t.dataset.fell="1",t.parentElement?.querySelector(".artshade")?.remove(),t.parentElement?.querySelector(".artnight")?.remove();const s=document.createElement("div");s.innerHTML=ed(n);const o=s.firstElementChild;o&&t.replaceWith(o)},!0))}const Df=new WeakMap;function Xx(e){const t=Df.get(e);if(t)return t;if(!e.complete||!e.naturalWidth)return null;const n=document.createElement("canvas");n.width=e.naturalWidth,n.height=e.naturalHeight;const s=n.getContext("2d",{willReadFrequently:!0});if(!s)return null;try{s.drawImage(e,0,0)}catch{return null}const o=s.getImageData(0,0,n.width,n.height).data;return Df.set(e,o),o}function Jx(e,t,n){const s=e.getBoundingClientRect();if(s.width<1||s.height<1||!e.naturalWidth)return null;let o=(t-s.left)/s.width;const i=(n-s.top)/s.height;e.closest(".flipped")&&(o=1-o);const a=e.naturalWidth,r=e.naturalHeight,l=Math.min(s.width/a,s.height/r),c=a*l,d=r*l,f=(s.width-c)*.5,h=s.height-d,g=(o*s.width-f)/l,m=(i*s.height-h)/l;return g<0||m<0||g>=a||m>=r?null:{x:g,y:m}}function td(e,t,n){const s=Xx(e),o=s&&Jx(e,t,n);if(!s||!o)return!s;const i=Math.floor(o.x),r=(Math.floor(o.y)*e.naturalWidth+i)*4+3;return s[r]>24}function e7(e,t){const n=[];try{for(let s=0;s<12;s++){const o=document.elementFromPoint(e,t);if(!o)return null;const i=o.closest("img.artimg");if(i&&!td(i,e,t)){n.push(i),i.style.pointerEvents="none";continue}return o}return null}finally{for(let s=0;s<n.length;s++)n[s].style.pointerEvents=""}}const t7="var(--line)",n7=1.4,lt='fill="#3a1d3c" opacity=".14"',ec='fill="#3a1d3c" opacity=".22"',zt={l:[72,172],r:[128,172]},hn={l:[50,233],r:[150,233]},s7={l:[88,238],r:[112,238]};function R(e=3){return`stroke="${t7}" stroke-width="${(e*n7).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"`}function x(e){const n=(Math.round(e*10)/10).toFixed(1);return n.endsWith(".0")?n.slice(0,-2):n}function tc(e,t,n,s,o){const i=o*Math.PI/180,a=e-n,r=t-s,l=Math.cos(i),c=Math.sin(i);return{x:n+a*l-r*c,y:s+a*c+r*l}}function ci(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=(n>>16&255)*(1-t),i=(n>>8&255)*(1-t),a=(n&255)*(1-t);return"#"+s(o)+s(i)+s(a)}function If(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=n>>16&255,i=n>>8&255,a=n&255;return"#"+s(o+(255-o)*t)+s(i+(255-i)*t)+s(a+(255-a)*t)}function nc(e,t,n,s,o=0){const i=e[0],a=e[1],r=e[0]===t[0]&&e[1]===t[1]?t[0]+.01:t[0],l=t[1],c=r-i,d=l-a,f=Math.hypot(c,d)||1,h=-d/f,g=c/f,m=(i+r)/2+h*o,k=(a+l)/2+g*o,$=n/2,y=s/2,u=($+y)/2*1.04,w=[i+h*$,a+g*$],_=[r+h*y,l+g*y],T=[r-h*y,l-g*y],A=[i-h*$,a-g*$];return`M${x(w[0])} ${x(w[1])} Q${x(m+h*u)} ${x(k+g*u)} ${x(_[0])} ${x(_[1])} A${x(y)} ${x(y)} 0 0 1 ${x(T[0])} ${x(T[1])} Q${x(m-h*u)} ${x(k-g*u)} ${x(A[0])} ${x(A[1])} A${x($)} ${x($)} 0 0 1 ${x(w[0])} ${x(w[1])} Z`}function Ir(e,t,n,s,o){const i=[],a=(t-e)/s;for(let r=0;r<s;r++){const l=e+r*a,c=l+a;i.push(`Q${x((l+c)/2)} ${x(n+o)} ${x(c)} ${x(n)}`)}return i.join(" ")}function sc(e,t,n,s,o,i=0){const a=[];for(let r=0;r<s;r++){const l=i+2*Math.PI*r/s,c=i+2*Math.PI*(r+1)/s,d=(l+c)/2,f=e+n*Math.cos(l),h=t+n*Math.sin(l),g=e+n*Math.cos(c),m=t+n*Math.sin(c),k=e+(n+o)*Math.cos(d),$=t+(n+o)*Math.sin(d);r===0&&a.push(`M${x(f)} ${x(h)}`),a.push(`Q${x(k)} ${x($)} ${x(g)} ${x(m)}`)}return a.join(" ")+" Z"}function Rn(e,t,n,s){const o=e==="arm"?zt[t]:s7[t],i=e==="arm"?t==="l"?s.armL:s.armR:t==="l"?s.legL:s.legR,a=e==="leg"?t==="l"?s.legLLift:s.legRLift:0,r=i||a?` transform="translate(0 ${x(-a)}) rotate(${x(i)} ${o[0]} ${o[1]})"`:"";return`<g class="${e} ${t}${e==="arm"?" hang":""}"${r} style="transform-box:view-box;transform-origin:${o[0]}px ${o[1]}px">${n}</g>`}const Jn="var(--line)";function En(e,t=.8,n=2.2){return e.map(s=>`<path d="${s}" fill="none" stroke="var(--hair-shade)" stroke-width="${n}" stroke-linecap="round" opacity="${t}"/>`).join("")}function Ko(e,t=.32){return e.map(n=>`<path d="${n}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${t}"/>`).join("")}function Un(){return'<path d="M54 72 Q62 44 92 38 Q70 50 63 74 Z" fill="#fff" opacity=".45"/><path d="M60 64 Q70 48 86 42" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".8"/><path d="M104 37 Q130 38 145 58 Q128 46 106 43 Z" fill="#fff" opacity=".3"/><circle cx="72" cy="50" r="2" fill="#fff" opacity=".85"/>'}function Et(e,t,n){return n?`<path d="${e}" fill="url(#${t}h)"/>`:""}const Hf="M34 112 Q28 28 100 28 Q172 28 166 112 Q164 146 146 156 L54 156 Q36 146 34 112 Z";function Ut(e,t){return`<path d="${Hf}" fill="var(--hair)" ${R(3.2)}/>${Et(Hf,e,t)}`}function hl(e,t,n,s,o,i,a=10){const r=sc(e+2,t+3,n,12,7,s+.1),l=sc(e,t,n-1,12,7,s);let c=`<path d="${r}" fill="var(--hair-shade)" ${R(3.2)}/><path d="${l}" fill="var(--hair)" ${R(3.2)}/>${Et(l,o,i)}`;for(let d=0;d<a;d++){const f=d*2.5+s,h=(n-6)*Math.sqrt((d+.5)/a),g=e+h*Math.cos(f),m=t+h*Math.sin(f);c+=`<path d="M${x(g-4)} ${x(m+1)} q1 -5 4.5 -4.5 q3.5 1 2.5 4.5" fill="none" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>`,m<t-2&&g<e+6&&(c+=`<path d="M${x(g-2.5)} ${x(m-2.5)} q2 -2 3.5 -1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`)}return c+=`<ellipse cx="${x(e-10)}" cy="${x(t-12)}" rx="6" ry="3.4" fill="#fff" opacity=".55" transform="rotate(-35 ${x(e-10)} ${x(t-12)})"/>`,c+=`<path d="M${x(e-16)} ${x(t-6)} Q${x(e-6)} ${x(t-18)} ${x(e+4)} ${x(t-14)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>`,c}function Cs(e,t,n,s=6,o=[],i=7){let a=`<path d="M${e} ${t-6} V${n}" stroke="${Jn}" stroke-width="${x(2*s+4.6)}" stroke-linecap="round"/><path d="M${e} ${t-6} V${n}" stroke="var(--hair)" stroke-width="${x(2*s)}" stroke-linecap="round"/>`,r=t,l=0;for(;r<n;){const c=l%2?1:-1;a+=`<path d="M${x(e-c)} ${x(r-4)} Q${x(e+c*s*1.05)} ${x(r-2)} ${x(e+c*s*.55)} ${x(r+4)} Q${x(e)} ${x(r+5.5)} ${x(e-c*1.4)} ${x(r+1)}" fill="none" stroke="var(--hair-shade)" stroke-width="1.7" stroke-linecap="round"/>`,c>0&&(a+=`<path d="M${x(e+1)} ${x(r-2)} q2.2 -.5 3 1.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>`),r+=i,l++}for(let c=0;c<o.length;c++){const d=o[c];a+=`<rect x="${x(e-6.2)}" y="${d-4}" width="12.4" height="8" rx="2.6" fill="var(--acc)" stroke="${Jn}" stroke-width="2"/><rect x="${x(e-4)}" y="${d-2.5}" width="2.6" height="4.5" rx="1" fill="#fff" opacity=".6"/>`}return a+=`<path d="M${e-4} ${n+2} q2 5 4 6 q2 -1 4 -6" fill="var(--hair)" stroke="${Jn}" stroke-width="2"/>`,a}function Fa(e,t,n,s=5.5){let o=`<path d="M${e} ${t} V${n}" stroke="${Jn}" stroke-width="${x(2*s+4)}" stroke-linecap="round"/><path d="M${e} ${t} V${n}" stroke="var(--hair)" stroke-width="${x(2*s)}" stroke-linecap="round"/>`;for(let i=t+8;i<n;i+=16)o+=`<path d="M${x(e-s*.7)} ${i} Q${e} ${i+5} ${x(e+s*.7)} ${i}" fill="none" stroke="var(--hair-shade)" stroke-width="1.6" opacity=".8"/>`;return o+=`<circle cx="${e}" cy="${n+3}" r="${x(s*.55)}" fill="var(--hair)" stroke="${Jn}" stroke-width="2"/>`,o}function gl(e,t,n,s){return`<path d="${e}" fill="var(--hair)" ${R(3)}/>${Et(e,t,n)}${En(s)}${Ko(s.slice(0,2),.45)}`}function no(e,t,n){return`<ellipse cx="${e}" cy="${t}" rx="8" ry="5.5" fill="var(--acc)" ${R(2.4)} transform="rotate(${n} ${e} ${t})"/><ellipse cx="${e-1}" cy="${t-2}" rx="2.4" ry="1.3" fill="#fff" opacity=".6" transform="rotate(${n} ${e-1} ${t-2})"/>`}const Vn='<path d="M42 104 Q44 76 70 66 Q86 74 100 58 Q114 74 130 66 Q156 76 158 104" fill="none" stroke="#3a1d3c" stroke-width="9" opacity=".12"/>';function Oh(e){return e==="puffs"||e==="coily"?"puffs":e==="afro"?"afro":e==="braids"?"braids":e==="boxbraids"?"box":e==="locs"?"locs":e==="sidebraid"?"sidebraid":e==="crown"?"crown":e==="pony"?"pony":e==="sidepony"?"sidepony":e==="pigtails"?"pigtails":e==="halfup"?"halfup":e==="buns"?"buns":e==="topbun"?"topbun":e==="lowbun"?"lowbun":e==="long"?"long":e==="wavy"||e==="wavybob"?e==="wavy"?"wavy":"bob":e==="bob"||e==="curlybob"||e==="sidebangs"?"bob":e==="pixie"?"pixie":(e==="bangs"||e==="short")&&e==="bangs"?"bangs":"short"}function o7(e,t,n){const s=Oh(e);if(s==="puffs"){const o=e==="coily"?26:30;return hl(48,52,o,0,t,n,12)+hl(152,52,o,.3,t,n,12)+`<path d="M42 112 Q38 48 100 44 Q162 48 158 112 Q154 144 100 146 Q46 144 42 112 Z" fill="var(--hair)" ${R(3.2)}/>`+no(66,68,-35)+no(134,68,35)}if(s==="afro")return hl(100,78,78,.2,t,n,14);if(s==="braids")return Ut(t,n)+Cs(34,108,230,5.4,[196])+Cs(166,108,230,5.4,[196]);if(s==="box")return Ut(t,n)+Cs(30,110,228,5,[200],10)+Cs(170,110,228,5,[200],10);if(s==="locs")return Ut(t,n)+Fa(32,112,236)+Fa(168,112,236);if(s==="sidebraid")return Ut(t,n);if(s==="pony"||s==="sidepony"||s==="halfup"){const o=s==="sidepony"?"M118 78 Q150 70 158 120 Q164 160 150 200 Q136 188 138 160 Q132 120 124 96 Z":"M126 40 Q178 28 180 92 Q184 132 168 168 Q160 196 174 220 Q148 212 145 182 Q140 156 152 124 Q160 90 132 64 Z",i=s==="halfup"?70:s==="sidepony"?86:44;return Ut(t,n)+gl(o,t,n,s==="sidepony"?["M130 96 Q150 120 146 160","M138 110 Q154 140 148 180"]:["M146 56 Q170 88 160 130","M156 66 Q176 100 166 140","M150 150 Q148 180 160 206"])+no(s==="sidepony"?124:128,i,s==="sidepony"?-20:25)}if(s==="pigtails")return Ut(t,n)+gl("M40 100 Q22 120 28 168 Q34 200 48 214 Q58 196 52 160 Q58 124 56 108 Z",t,n,["M40 120 Q32 150 40 184"])+gl("M160 100 Q178 120 172 168 Q166 200 152 214 Q142 196 148 160 Q142 124 144 108 Z",t,n,["M160 120 Q168 150 160 184"])+no(52,96,20)+no(148,96,-20);if(s==="buns"){let o="";for(const i of[52,148])o+=`<circle cx="${i}" cy="44" r="24" fill="var(--hair)" ${R(3.2)}/>${n?`<circle cx="${i}" cy="44" r="24" fill="url(#${t}h)"/>`:""}`,o+=En([`M${i-14} 48 Q${i-14} 28 ${i} 26 Q${i+16} 30 ${i+14} 48`,`M${i-8} 54 Q${i+8} 56 ${i+12} 48`]),o+=`<path d="M${i-12} 34 Q${i-4} 24 ${i+4} 26" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>`;return o+Ut(t,n)}if(s==="topbun")return`<circle cx="100" cy="30" r="26" fill="var(--hair)" ${R(3.2)}/>${n?`<circle cx="100" cy="30" r="26" fill="url(#${t}h)"/>`:""}<path d="M82 28 Q100 12 118 28" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>${En(["M86 36 Q100 24 114 36","M90 42 Q100 34 110 42"])}${Ut(t,n)}`;if(s==="lowbun")return Ut(t,n)+`<circle cx="100" cy="168" r="22" fill="var(--hair)" ${R(3)}/>${n?`<circle cx="100" cy="168" r="22" fill="url(#${t}h)"/>`:""}${no(100,148,0)}`;if(s==="long"||s==="wavy"){const o=s==="wavy"?"M36 108 Q28 160 40 210 Q52 250 46 286 Q70 270 78 230 Q60 180 58 140 Q52 120 48 108 Z M164 108 Q172 160 160 210 Q148 250 154 286 Q130 270 122 230 Q140 180 142 140 Q148 120 152 108 Z":"M38 110 Q30 170 36 240 Q42 280 34 300 L70 292 Q64 240 66 180 Q62 140 56 112 Z M162 110 Q170 170 164 240 Q158 280 166 300 L130 292 Q136 240 134 180 Q138 140 144 112 Z";return`<path d="${o}" fill="var(--hair)" ${R(3)}/>${Et(o,t,n)}${Ut(t,n)}`}if(s==="bob"){const o=e==="curlybob"?"M30 120 Q24 170 48 196 Q70 210 100 206 Q130 210 152 196 Q176 170 170 120 Q150 150 100 156 Q50 150 30 120 Z":"M32 116 Q26 168 50 190 Q78 204 100 200 Q122 204 150 190 Q174 168 168 116 Q150 148 100 154 Q50 148 32 116 Z";return`<path d="${o}" fill="var(--hair)" ${R(3.2)}/>${Et(o,t,n)}${Ut(t,n)}`}return Ut(t,n)}function i7(e,t,n){const s=Oh(e),o='<path d="M100 34 V56" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>';if(s==="puffs"||s==="braids"||s==="box"||s==="locs"||s==="afro"||s==="bangs"){const a=s==="afro"?"M48 100 Q52 48 100 40 Q148 48 152 100 Q140 78 100 70 Q60 78 48 100 Z":s==="bangs"?"M40 108 Q36 40 100 34 Q164 40 160 108 L150 96 Q130 108 100 100 Q70 108 50 96 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q154 74 130 62 Q112 70 100 52 Q88 70 70 62 Q46 74 40 106 Z";let r=Vn+`<path d="${a}" fill="var(--hair)" ${R(3.2)}/>${Et(a,t,n)}${o}`;return r+=En(["M84 44 Q70 52 60 70","M116 44 Q130 52 140 70","M92 40 Q80 48 74 58","M108 40 Q120 48 126 58","M76 42 Q58 56 52 82","M124 42 Q142 56 148 82"]),r+=Ko(["M90 36 Q78 42 70 52","M112 36 Q124 42 132 52"]),s==="puffs"?(r+=`<path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="${Jn}" stroke-width="7" stroke-linecap="round"/><path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`,r+=`<path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="${Jn}" stroke-width="7" stroke-linecap="round"/><path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`):s==="braids"||s==="box"?(r+=Cs(48,114,200,5,[156],s==="box"?10:7),r+=Cs(152,114,200,5,[156],s==="box"?10:7)):s==="locs"&&(r+=Fa(46,116,210,4.6)+Fa(154,116,210,4.6)),r+Un()}if(s==="sidebraid"){const a="M40 108 Q36 36 100 32 Q164 36 160 100 Q140 78 100 70 Q70 80 40 108 Z";return Vn+`<path d="${a}" fill="var(--hair)" ${R(3.2)}/>${Et(a,t,n)}${En(["M70 46 Q86 60 96 74","M120 44 Q136 58 146 74"])}${Cs(150,100,210,5.6,[168],7)}${Un()}`}if(s==="crown"){const a="M40 106 Q36 36 100 32 Q164 36 160 106 Q150 80 100 74 Q50 80 40 106 Z";let r="";for(let l=0;l<7;l++){const c=58+l*14;r+=`<path d="M${c} 58 Q${c+7} 46 ${c+14} 58" fill="none" stroke="var(--hair-shade)" stroke-width="3.2" stroke-linecap="round"/>`}return Vn+`<path d="${a}" fill="var(--hair)" ${R(3.2)}/>${Et(a,t,n)}${r}${Un()}`}if(s==="pony"||s==="sidepony"||s==="halfup"||s==="pigtails"){const a=s==="sidepony"?"M40 108 Q34 36 100 32 Q166 34 160 108 Q150 86 120 78 Q90 90 60 74 Q48 90 40 108 Z":"M40 108 Q34 34 100 32 Q166 34 160 108 Q156 84 144 72 Q128 86 104 80 Q86 78 72 68 Q60 84 48 84 Q42 94 40 108 Z";let r=Vn+`<path d="${a}" fill="var(--hair)" ${R(3.2)}/>${Et(a,t,n)}`;return r+=`<path d="M40 104 Q36 120 44 132 Q46 116 50 106 Z" fill="var(--hair)" ${R(2.4)}/><path d="M160 104 Q164 120 156 132 Q154 116 150 106 Z" fill="var(--hair)" ${R(2.4)}/>`,r+=En(["M70 46 Q90 60 104 74","M128 46 Q140 60 146 74","M96 40 Q110 56 116 66"]),r+=Ko(["M76 42 Q92 52 100 62"]),r+Un()}if(s==="buns"||s==="topbun"||s==="lowbun"){const a=s==="topbun"?"M44 108 Q40 50 100 46 Q160 50 156 108 Q148 82 100 74 Q52 82 44 108 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q152 80 138 70 Q126 80 112 76 Q104 82 100 74 Q96 82 88 76 Q74 80 62 70 Q48 80 40 106 Z";let r=Vn+`<path d="${a}" fill="var(--hair)" ${R(3.2)}/>${Et(a,t,n)}`;if(r+=En(["M80 42 Q72 56 68 68","M120 42 Q128 56 132 68","M100 36 Q98 56 100 70","M90 38 Q84 56 86 72","M110 38 Q116 56 114 72"]),r+=Ko(["M86 38 Q80 46 78 54","M114 38 Q120 46 122 54"]),s==="buns")for(const[l,c]of[[42,1],[158,-1]]){const d=`M${l} 100 q${-8*c} 14 ${-2*c} 24 q${5*c} 8 ${-1*c} 14`;r+=`<path d="${d}" fill="none" stroke="${Jn}" stroke-width="7" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`}return r+Un()}if(s==="long"||s==="wavy"||s==="bob"){const a=e==="sidebangs"||e==="wavybob"?"M38 108 Q34 40 70 36 Q100 34 112 48 Q90 70 48 78 Q36 90 38 108 Z M112 48 Q140 36 164 50 Q166 100 150 108 Q130 80 112 70 Z":"M40 108 Q34 36 100 32 Q166 36 160 108 Q152 78 128 68 Q112 78 100 60 Q88 78 72 68 Q48 78 40 108 Z";return Vn+`<path d="${a}" fill="var(--hair)" ${R(3.2)}/>${Et(a,t,n)}${En(["M78 46 Q68 64 64 80","M122 46 Q132 64 136 80","M100 38 V64"])}${Ko(["M88 40 Q80 50 76 60"])}${Un()}`}if(s==="pixie"){const a="M48 104 Q44 48 100 40 Q140 46 150 78 Q156 100 140 108 Q120 86 100 90 Q70 84 52 104 Z";return Vn+`<path d="${a}" fill="var(--hair)" ${R(3.2)}/>${Et(a,t,n)}${En(["M70 56 Q86 70 96 84","M118 52 Q132 66 138 82"])}${Un()}`}const i="M46 106 Q42 46 100 38 Q158 46 154 106 Q140 80 100 76 Q60 80 46 106 Z";return Vn+`<path d="${i}" fill="var(--hair)" ${R(3.2)}/>${Et(i,t,n)}${o}${Un()}`}const _o="var(--line)";function nd(e){return Math.abs(e.legL)>=40||Math.abs(e.legR)>=40}function Us(e,t,n,s=[]){const o=s.map(i=>`<path d="${i}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`).join("");return(n?`<path d="${e}" fill="url(#${t}c)"/>`:"")+o}function oc(e,t,n){const s=(n+7).toFixed(1);return`<path d="${e}" fill="none" stroke="${_o}" stroke-width="${s}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function sd(e,t,n){return Rn("arm",e,t,n).replace('class="arm ','class="arm sleeve ')}function ba(e,t,n=!1){const[s,o]=zt[e],i=e==="l"?-1:1;let a=oc(`M${s} ${o} L${s+7*i} ${o+20}`,"var(--top)",22);return n&&(a+=`<path d="M${s+7*i-12} ${o+17} H${s+7*i+12}" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round" opacity=".9" transform="rotate(${-18*i} ${s+7*i} ${o+17})"/>`),sd(e,a,t)}function di(e,t,n=!0){const[s,o]=zt[e],[i,a]=hn[e],r=e==="l"?-1:1,l=(s+i)/2+6*r;let c=oc(`M${s-2*r} ${o-2} Q${l} ${(o+a)/2-6} ${i-r} ${a-16}`,"var(--top)",21);return n&&(c+=oc(`M${i-3*r} ${a-17} L${i-r} ${a-13}`,"var(--top-trim)",20)),sd(e,c,t)}function ic(e,t,n=!1){const[s,o]=zt[e],i=e==="l"?-1:1,a=s+4*i,r=o+8;let l=`<path d="${sc(a,r,13,9,3.2)}" fill="var(--top)" ${R(2.8)}/>`;return l+=`<ellipse cx="${a-4*i}" cy="${r-5}" rx="5" ry="3" fill="#fff" opacity=".45"/>`,n&&(l+=`<path d="M${a-11} ${r+13} ${Ir(a-11,a+11,r+13,4,3)}" fill="none" stroke="#fff" stroke-width="2.4"/>`),sd(e,l,t)}function Qt(e,t){return e("l",t)+e("r",t)}const Of="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 228 Q100 236 64 228 Z";function vs(e,t,n,s,o,i,a="",r=[],l=!1){const c=`<path d="${t}" fill="var(--top)" ${R(3)}/>${Us(t,s,o,r)}${a}`;return`<g class="shirt" data-hem="${i}">${l?c+n:n+c}</g>`}function a7(e,t,n,s,o){if(t.dress)return"";const i=t.top;if(i==="hoodie"){const l="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L139 230 Q100 240 61 230 Z",c=`<path d="M120 162 Q132 164 134 170 L139 230 Q128 233 123 233 Z" ${lt}/><path d="M72 172 Q76 164 86 163" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".38"/><path d="M78 159 Q100 182 122 159 Q120 152 100 152 Q80 152 78 159 Z" fill="var(--top-trim)" ${R(2.8)}/><path d="M92 172 v18 M108 172 v18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="92" cy="191" r="2.6" fill="#fff" ${R(1.8)}/><circle cx="108" cy="191" r="2.6" fill="#fff" ${R(1.8)}/><path d="M78 202 H122 L127 222 H73 Z" fill="var(--top)" ${R(2.6)}/><path d="M78 202 H122 L124 210 H76 Z" ${lt}/><path d="M61 226 Q100 236 139 226 L139 234 Q100 244 61 234 Z" fill="var(--top-trim)" ${R(2.8)}/>`;return vs(e,l,Qt(di,e),n,s,o,c,["M74 196 q-2 12 2 22","M126 190 q2 14 0 26"])}if(i==="stripes"||i==="jersey"){const l="M68 168 Q74 158 92 158 H108 Q126 158 132 168 L135 232 Q100 238 65 232 Z",c=`${n}st`,d=i==="jersey"?'<path d="M70 176 H130 L128 188 H72 Z" fill="var(--top-trim)"/><path d="M68 210 H132 L130 222 H70 Z" fill="var(--top-trim)"/>':[166,179,192,205,218,231].map(m=>`<rect x="60" y="${m}" width="80" height="6" fill="var(--top-trim)"/>`).join(""),f=i==="jersey"?'<path d="M86 160 L100 176 L114 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/>':'<path d="M84 159 Q100 172 116 159" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',h=s?`<path d="${l}" fill="url(#${n}c)"/>`:"";return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${c}"><path d="${l}"/></clipPath></defs>${Qt(m=>ba(m,e,!0),e)}<path d="${l}" fill="var(--top)"/><g clip-path="url(#${c})">${h}<path d="M118 160 L135 168 L138 236 H120 Z" ${lt}/>${d}</g><path d="${l}" fill="none" ${R(3)}/>${f}<path d="M78 198 q-2 12 1 24" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/><path d="M122 190 q2 14 0 28" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/></g>`}if(i==="sweater"||i==="cardigan"){const l=i==="cardigan"?"M68 168 Q74 158 92 158 H108 Q126 158 132 168 L134 232 H108 L100 210 L92 232 H66 Z":"M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 234 Q100 242 64 234 Z",c=`<path d="M118 166 L134 174 L136 230 Q120 236 112 228 Z" ${lt}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M64 226 Q100 236 136 226" fill="none" stroke="var(--top-trim)" stroke-width="6" stroke-linecap="round"/>`,d=i==="cardigan"?[186,202,218].map(f=>`<circle cx="100" cy="${f}" r="2.4" fill="var(--top-trim)" ${R(1.4)}/>`).join(""):"";return vs(e,l,Qt(di,e),n,s,o,c+d,["M80 190 q-2 16 0 28","M120 188 q2 16 0 30"])}if(i==="tank"||i==="bib"){const l=i==="bib"?"M78 168 H122 L126 228 H74 Z":"M78 168 Q86 160 96 164 H104 Q114 160 122 168 L128 226 H72 Z",c=`<path d="M110 172 H126 L128 226 H114 Z" ${lt}/><path d="M82 176 Q84 168 92 166" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".35"/>`,d=i==="bib"?`${c}<path d="M86 150 L78 168 M114 150 L122 168" stroke="${_o}" stroke-width="8" stroke-linecap="round"/><path d="M86 150 L78 168 M114 150 L122 168" stroke="var(--top)" stroke-width="4.5" stroke-linecap="round"/><rect x="90" y="176" width="20" height="16" rx="3" fill="var(--top-trim)" ${R(1.6)}/>`:`${c}<path d="M84 166 Q100 176 116 166" fill="none" stroke="var(--top-trim)" stroke-width="4"/>`;return vs(e,l,"",n,s,o,d,["M88 190 q2 14 0 24"])}if(i==="puff"||i==="ruffle"){const l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L132 222 H68 Z",c=`<path d="M100 172 l-8 -5 v10 z M100 172 l8 -5 v10 z" fill="var(--top-trim)" ${R(1.8)}/><path d="M97 174 l-4 10 M103 174 l4 10" stroke="var(--top-trim)" stroke-width="2.6" stroke-linecap="round"/>`,d=(i==="ruffle"?`<path d="M68 166 Q74 178 82 166 Q90 180 100 166 Q110 180 118 166 Q126 180 132 166" fill="var(--top-trim)" ${R(2)}/>`:c)+`<path d="M118 162 Q128 164 130 170 L132 222 H120 Z" ${lt}/><path d="M74 176 Q76 168 84 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return vs(e,l,Qt(ic,e),n,s,o,d,["M86 190 q2 10 0 20","M116 188 q-2 12 0 22"],!0)}if(i==="button"){const l=Of,c=[180,196,212].map(f=>`<circle cx="100" cy="${f}" r="2.6" fill="#fff" ${R(1.6)}/>`).join(""),d=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${lt}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M100 164 V226" stroke="#fff" stroke-width="2" opacity=".7"/>${c}<path d="M82 160 Q100 172 118 160" fill="var(--top)" ${R(2.2)}/>`;return vs(e,l,Qt(f=>ba(f,e,!1),e),n,s,o,d,["M78 196 q-1 12 2 20"])}if(i==="raincoat"){const l="M62 168 Q70 156 92 156 H108 Q130 156 138 168 L146 240 Q100 252 54 240 Z",c=`<path d="M120 164 L142 176 L146 236 Q124 244 116 232 Z" ${lt}/><path d="M72 176 Q76 166 88 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M70 156 Q100 176 130 156" fill="none" stroke="var(--top-trim)" stroke-width="6"/><circle cx="100" cy="196" r="4" fill="var(--top-trim)" ${R(1.8)}/><path d="M78 214 H122" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round"/>`;return vs(e,l,Qt(di,e),n,s,o,c,["M76 190 q-4 18 -2 36","M124 188 q4 18 2 36"])}const a=Of,r=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${lt}/><path d="M84 160 Q100 172 116 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return vs(e,a,Qt(l=>ba(l,e,!1),e),n,s,o,r,["M78 196 q-2 12 1 22","M122 194 q2 14 -1 24"])}function Wf(e,t,n,s,o,i=!1,a=16){const r=e==="l"?88:112,l=e==="l"?-1:1,c=`M${r-a/2} 226 Q${r-a/2+l} ${n-20} ${r-a/2+2*l} ${n} H${r+a/2} Q${r+a/2} ${n-30} ${r+a/2-l} 226 Z`;let d=`<path d="${c}" fill="var(--bottom)" ${R(2.8)}/>`;return d+=Us(c,s,o,[`M${r-4*l} 240 Q${r} ${(226+n)/2} ${r+3*l} ${n-14}`]),e==="r"?d+=`<path d="M${r+1} 230 H${r+a/2} L${r+a/2} ${n} H${r+4} Z" ${lt}/>`:d+=`<path d="M${r-2} 238 Q${r-6} ${(226+n)/2} ${r-2} ${n-10}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".3"/>`,i&&(d+=`<path d="M${r-a/2-1} ${n-8} H${r+a/2+1} V${n+1} H${r-a/2-1} Z" fill="var(--bottom-trim)" ${R(2)}/>`),Rn("leg",e,d,t)}function r7(e,t,n,s){if(t.dress)return'<g data-layer="bottom"></g>';const o=t.bottom;if(nd(e)&&(o==="skirt"||o==="tutu"||o==="overalls"))return`<g data-layer="bottom"><path class="skirt" d="${o==="tutu"?"M52 216 H148 L160 248 Q100 260 40 248 Z":"M62 218 H138 L152 252 Q100 264 48 252 Z"}" fill="var(--bottom)" ${R(3)}/></g>`;if(o==="skirt"){const h="M68 222 H132 L146 262 Q100 274 54 262 Z";return`<g data-layer="bottom"><path class="skirt" d="${h}" fill="var(--bottom)" ${R(3)}/>${Us(h,n,s,["M82 234 L76 258","M100 232 V266","M118 234 L126 258"])}<path d="M114 224 H132 L146 262 Q130 268 118 266 Z" ${lt}/><path d="M72 228 Q66 246 64 258" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".3"/><path d="M84 236 v10 M116 236 v10" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/></g>`}if(o==="tutu")return'<g data-layer="bottom"></g>';if(o==="overalls"){const h="M66 220 H134 L139 264 H106 L100 254 L94 264 H61 Z";return`<g data-layer="bottom"><g class="leg" style="transform-box:view-box;transform-origin:100px 238px"><path d="${h}" fill="var(--bottom)" ${R(3)}/>${Us(h,n,s,["M78 232 Q74 248 72 260","M122 230 Q128 248 132 260"])}<path d="M118 222 H134 L139 264 H122 Z" ${lt}/><path d="M64 258 H95 M105 258 H138" stroke="var(--bottom-trim)" stroke-width="4"/></g></g>`}const a=o==="shorts"?256:292,r=o==="joggers"||o==="jeans",l=o==="leggings"?12:o==="shorts"?18:16,c=Wf("l",e,a,n,s,r,l)+Wf("r",e,a,n,s,r,l),d=o==="jeans"?'<path d="M88 232 V286 M112 232 V286" stroke="#c9a24a" stroke-width="1.4" stroke-dasharray="2 3" opacity=".7"/>':"";return`<g data-layer="bottom">${`<path d="M70 220 H130 V230 H70 Z" fill="var(--bottom)" ${R(2.4)}/>`}${c}${d}</g>`}function l7(e,t,n,s){if(t.dress)return'<g data-layer="bottom-over"></g>';const o=t.bottom;if(o==="overalls"){const i="M78 180 H122 L124 228 H76 Z";return`<g data-layer="bottom-over"><path d="M80 176 L72 164 M120 176 L128 164" stroke="${_o}" stroke-width="12" stroke-linecap="round"/><path d="M80 176 L72 164 M120 176 L128 164" stroke="var(--bottom)" stroke-width="7.5" stroke-linecap="round"/><path d="${i}" fill="var(--bottom)" ${R(3)}/>${Us(i,n,s,["M86 200 q14 6 28 0"])}<path d="M88 190 H112 V206 Q100 212 88 206 Z" fill="var(--bottom-trim)" ${R(2.4)}/><circle cx="82" cy="186" r="3.6" fill="#fff" ${R(2)}/><circle cx="118" cy="186" r="3.6" fill="#fff" ${R(2)}/><path d="M66 222 H134 L135 230 H65 Z" fill="var(--bottom)" ${R(3)}/><path d="M108 180 H122 L124 228 H110 Z" ${lt}/><path d="M82 182 v12" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/></g>`}if(o==="tutu"){if(nd(e))return`<g data-layer="bottom-over"><path class="skirt" d="M58 220 H142 L154 246 Q100 256 46 246 Z" fill="var(--bottom)" ${R(2.4)}/></g>`;let i="";const a=[[266,50,150,8],[256,56,144,7],[246,64,136,6]];for(let l=0;l<a.length;l++){const[c,d,f,h]=a[l],g=`M${d+8} ${c-22} H${f-8} L${f} ${c} ${Ir(f,d,c,6,h)} Z`;i+=`<path class="skirt" d="${g}" fill="var(--bottom)" ${R(2.4)}/>`,i+=`<path d="M${f-20} ${c-16} L${f-6} ${c-2}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".2"/>`}const r="M66 214 H134 V224 H66 Z";return`<g data-layer="bottom-over">${i}<path d="${r}" fill="var(--bottom-trim)" ${R(2.6)}/>${Us(r,n,s)}</g>`}return'<g data-layer="bottom-over"></g>'}function Uf(e,t){return`<path d="M${e} ${t+2} c-3 -5 -9 -1 -5 3 l5 4 l5 -4 c4 -4 -2 -8 -5 -3z" fill="var(--top-trim)" opacity=".85"/>`}function c7(e,t,n,s,o){const i=t.dress;if(!i)return"";const a=`${n}dr`;let r="M72 210 H128 L150 268 Q100 282 50 268 Z",l="M72 168 Q78 158 94 158 H106 Q122 158 128 168 L130 214 H70 Z",c="",d=Qt(m=>ic(m,e,!0),e),f=!0;i==="sundress"?(r="M76 214 H124 L140 266 Q100 276 60 266 Z",c='<path d="M78 166 Q100 180 122 166" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',d="",f=!1):i==="party"?c=[[64,236],[86,228],[108,234],[130,242],[76,254],[100,250],[122,258],[92,188]].map(([k,$])=>Uf(k,$)).join("")+`<path d="M100 214 l-10 -6 v12 z M100 214 l10 -6 v12 z" fill="var(--top-trim)" ${R(1.8)}/><path d="M52 262 Q100 276 148 262" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="1 5" opacity=".85"/>`:i==="pinafore"?(l="M80 176 H120 L122 214 H78 Z",c='<path d="M86 158 L80 178 M114 158 L120 178" stroke="var(--top)" stroke-width="5" stroke-linecap="round"/>',d="",f=!1,r="M74 212 H126 L142 264 Q100 274 58 264 Z"):i==="jumper"?(c=`<path d="M84 160 Q100 174 116 160" fill="var(--top-trim)" ${R(2)}/>`,d=Qt(m=>ba(m,e,!0),e),f=!1):i==="ballet"?(r="M78 214 H122 L132 250 Q100 258 68 250 Z",c=`<path d="M70 248 ${Ir(70,130,248,5,5)}" fill="none" stroke="#fff" stroke-width="2"/>`,d=Qt(ic,e)):i==="nightgown"?(r="M80 214 H120 L132 270 Q100 278 68 270 Z",c='<path d="M88 164 Q100 176 112 164" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>',d=Qt(di,e),f=!1):i==="raindress"?(r="M70 212 H130 L148 268 Q100 280 52 268 Z",c='<path d="M76 168 Q100 186 124 168" fill="none" stroke="var(--top-trim)" stroke-width="5"/><circle cx="100" cy="198" r="3.4" fill="var(--top-trim)"/>',d=Qt(di,e),f=!1):(r="M70 214 H130 L152 266 Q100 280 48 266 Z",l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L131 216 H69 Z",c=[[66,236],[86,228],[110,232],[132,240],[76,254],[100,248],[124,258],[56,260],[144,262],[96,266],[84,182],[114,190],[100,200]].map(([k,$])=>Uf(k,$)).join("")+`<path d="M112 214 H130 L152 266 Q138 271 128 272 Z" ${lt}/><path d="M118 162 L130 168 L131 216 H120 Z" ${lt}/><path d="M50 262 Q100 276 150 262" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9"/><path d="M60 226 Q56 244 54 258" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/><path d="M68 210 H132 V220 H68 Z" fill="var(--top-trim)" ${R(2.6)}/><path d="M100 215 l-13 -8 v16 z M100 215 l13 -8 v16 z" fill="var(--top-trim)" ${R(2.2)}/><circle cx="100" cy="215" r="3.6" fill="var(--top-trim)" ${R(2)}/><path d="M97 218 l-5 14 M103 218 l5 14" stroke="var(--top-trim)" stroke-width="3" stroke-linecap="round"/><path d="M80 158 Q78 172 94 170 Q99 166 100 162 Q101 166 106 170 Q122 172 120 158 Q100 164 80 158 Z" fill="#fff" ${R(2.4)}/>`),nd(e)&&(r="M68 214 H132 L150 250 Q100 262 50 250 Z");const h=`${r} ${l}`,g=`<path class="skirt" d="${r}" fill="var(--top)" ${R(3)}/><path d="${l}" fill="var(--top)" ${R(3)}/><g clip-path="url(#${a})">${Us(h,n,s,["M80 226 Q74 248 70 266","M120 226 Q126 248 130 266"])}${c}</g>`;return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${a}"><path d="${h}"/></clipPath></defs>${f?g+d:d+g}</g>`}function d7(e,t,n,s){const o=e==="l"?`<g transform="translate(${2*s} 0) scale(-1 1)">${n}</g>`:n;return Rn("leg",e,o,t)}function f7(e,t){const n=t.shoes;let s="";for(const o of["l","r"]){const i=o==="l"?87:113;let a="";if(n==="sneakers"||n==="lightup"){const r=n==="lightup"?`<circle cx="${i-4}" cy="292" r="2.2" fill="#ff8fab"/><circle cx="${i+4}" cy="296" r="2.2" fill="#8ecae6"/><circle cx="${i}" cy="300" r="2" fill="#ffd166"/>`:"";a=`<path d="M${i} 270 V286" fill="none" stroke="var(--sock)" stroke-width="16" stroke-linecap="round"/><path d="M${i-14} 296 Q${i-14} 284 ${i} 284 Q${i+14} 284 ${i+16} 296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+12} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${R(2.8)}/><path d="M${i-12} 304 H${i+18}" stroke="var(--shoe-trim)" stroke-width="3.5" stroke-linecap="round"/><path d="M${i-6} 290 l5 2 M${i-6} 295 l6 2" stroke="${_o}" stroke-width="1.8" stroke-linecap="round"/>${r}`}else if(n==="boots"||n==="rainboots"){const r=n==="rainboots"?248:258,l=n==="boots"?[[-6,272],[5,268],[-2,284],[7,290],[-8,294]].map(([c,d])=>`<circle cx="${i+c}" cy="${d}" r="2.6" fill="#fff" opacity=".9"/>`).join(""):"";a=`<path d="M${i-14} ${r} H${i+14} V296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+10} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${R(2.8)}/><path d="M${i-16} ${r-4} H${i+16} V${r+8} H${i-16} Z" fill="var(--shoe)" ${R(2.6)}/>`+l+(n==="rainboots"?`<path d="M${i-12} ${r+16} H${i+12}" stroke="var(--shoe-trim)" stroke-width="4" stroke-linecap="round"/>`:`<path d="M${i-6} ${r+14} V292" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".45"/>`)}else n==="maryjanes"?a=`<path d="M${i} 266 V290" fill="none" stroke="var(--sock)" stroke-width="15" stroke-linecap="round"/><path d="M${i-12} 274 ${Ir(i-12,i+12,274,4,4)} L${i+12} 268 H${i-12} Z" fill="var(--sock)" ${R(2)}/><path d="M${i-13} 298 Q${i-13} 290 ${i} 290 Q${i+13} 290 ${i+14} 298 Q${i+20} 300 ${i+20} 304 Q${i+20} 309 ${i+8} 309 H${i-12} Q${i-16} 309 ${i-14} 302 Z" fill="var(--shoe)" ${R(2.8)}/><path d="M${i-10} 294 H${i+12}" stroke="${_o}" stroke-width="2"/><circle cx="${i+8}" cy="294" r="2.2" fill="var(--acc)"/>`:n==="sandals"?a=`<path d="M${i-12} 298 Q${i-12} 286 ${i} 286 Q${i+12} 286 ${i+14} 296 Q${i+18} 298 ${i+18} 302 Q${i+18} 306 ${i+8} 306 H${i-12} Q${i-16} 306 ${i-14} 300 Z" fill="var(--skin)" ${R(2.4)}/><path d="M${i-14} 304 H${i+18}" stroke="var(--shoe)" stroke-width="5" stroke-linecap="round"/><path d="M${i-8} 292 H${i+10} M${i+2} 300 L${i+8} 290" stroke="var(--shoe)" stroke-width="4" stroke-linecap="round"/><circle cx="${i+2}" cy="293" r="3" fill="var(--shoe-trim)" ${R(1.4)}/>`:n==="slippers"?a=`<path d="M${i-14} 292 Q${i-14} 280 ${i} 278 Q${i+16} 280 ${i+18} 294 Q${i+22} 296 ${i+20} 304 H${i-14} Q${i-18} 304 ${i-16} 296 Z" fill="var(--shoe)" ${R(2.8)}/><path d="M${i-6} 286 q6 -4 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`:a=`<ellipse cx="${i+2}" cy="304" rx="16" ry="7" fill="var(--shoe)" ${R(2.6)}/>`;s+=d7(o,e,a,i)}return`<g data-layer="shoes">${s}</g>`}const Wh=new Set(["cap","beanie","sunhat"]),p7=new Set(["catears","earmuffs"]);function So(e){return e==="afro"?28:e==="topbun"?20:e==="puffs"||e==="coily"?16:e==="buns"||e==="curlybob"?12:e==="long"||e==="wavy"||e==="wavybob"?8:0}function Qo(e,t,n){if(!Wh.has(t)&&!p7.has(t))return n;const s=So(e);return s?`<g data-hat="${t}" transform="translate(0 ${x(-s)})">${n}</g>`:n}function h7(e,t,n){let s="";for(let l=0;l<n.length;l++)Wh.has(n[l])&&(s=n[l]);if(!s)return"";const o=So(t),i=(s==="beanie"?58:s==="cap"?64:62)-o,a=Math.min(70,i),r=t==="afro"||t==="puffs"||t==="coily"?92:78;return`<mask id="${e}hm" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" data-brim="${x(a)}"><rect x="-30" y="-50" width="260" height="420" fill="#fff"/><rect x="${x(100-r)}" y="-50" width="${x(r*2)}" height="${x(a+50)}" fill="#000"/></mask>`}function ul(e,t,n){return`<g transform="translate(${e} ${t}) scale(${n})"><path d="M0 0 C-8 -14 -30 -14 -28 0 C-30 14 -8 14 0 0 Z" fill="var(--acc)" ${R(2.6)}/><path d="M0 0 C8 -14 30 -14 28 0 C30 14 8 14 0 0 Z" fill="var(--acc)" ${R(2.6)}/><rect x="-6" y="-7" width="12" height="14" rx="4" fill="var(--acc2)" ${R(2.2)}/></g>`}function g7(e){return`<g data-layer="accessory">${e.acc.map(n=>n==="glasses"?'<circle cx="76" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="124" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="76" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><circle cx="124" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3.2"/><path d="M58 108 L42 104 M142 108 L158 104" stroke="var(--frame)" stroke-width="3.2" stroke-linecap="round"/>':n==="square"?'<rect x="58" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><rect x="108" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><path d="M92 112 H108" stroke="var(--frame)" stroke-width="3.2"/>':n==="sunnies"?'<path d="M56 104 H94 Q96 122 76 122 Q56 122 56 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M106 104 H144 Q146 122 124 122 Q104 122 106 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3"/>':n==="bow"?ul(100,78,.7):n==="bigbow"?ul(100,70,1.15):n==="headband"?`<path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="${_o}" stroke-width="12" stroke-linecap="round"/><path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round"/>${ul(100,32,.85)}`:n==="flower"?`<g transform="translate(138 78)">${[0,60,120,180,240,300].map(s=>`<ellipse cx="0" cy="-8" rx="5" ry="8" fill="var(--acc)" ${R(1.6)} transform="rotate(${s})"/>`).join("")}<circle r="4.5" fill="var(--acc2)" ${R(1.6)}/></g>`:n==="cap"?Qo(e.hair,"cap",`<path d="M54 64 Q56 20 100 16 Q144 20 146 64 Q128 54 100 56 Q72 54 54 64 Z" fill="var(--acc)" ${R(3)}/><path d="M48 56 Q100 66 152 56 L156 62 Q100 70 44 62 Z" fill="var(--acc)" ${R(3)}/><circle cx="100" cy="18" r="4.5" fill="#fff" ${R(2)}/>`):n==="beanie"?Qo(e.hair,"beanie",`<path d="M50 66 Q48 14 100 8 Q152 14 150 66 Q128 56 100 58 Q72 56 50 66 Z" fill="var(--acc)" ${R(3)}/><path d="M50 58 H150" stroke="var(--acc2)" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="8" r="7" fill="var(--acc2)" ${R(2.4)}/>`):n==="sunhat"?Qo(e.hair,"sunhat",`<path d="M66 56 Q68 22 100 18 Q132 22 134 56 Q118 48 100 50 Q82 48 66 56 Z" fill="var(--acc)" ${R(3)}/><path d="M18 56 Q100 68 182 56 Q170 64 100 66 Q30 64 18 56 Z" fill="var(--acc)" ${R(3)}/><path d="M72 46 Q100 38 128 46" fill="none" stroke="var(--acc2)" stroke-width="4"/>`):n==="catears"?Qo(e.hair,"catears",`<path d="M58 62 L70 18 L86 60 Z" fill="var(--acc)" ${R(2.6)}/><path d="M114 60 L130 18 L142 62 Z" fill="var(--acc)" ${R(2.6)}/><path d="M64 54 L72 30 L80 52 Z" fill="var(--acc2)"/><path d="M120 52 L128 30 L136 54 Z" fill="var(--acc2)"/>`):n==="earmuffs"?Qo(e.hair,"earmuffs",`<path d="M44 68 Q48 26 100 22 Q152 26 156 68" fill="none" stroke="var(--acc)" stroke-width="6"/><circle cx="34" cy="86" r="14" fill="var(--acc)" ${R(2.8)}/><circle cx="166" cy="86" r="14" fill="var(--acc)" ${R(2.8)}/><circle cx="34" cy="86" r="6" fill="var(--acc2)"/><circle cx="166" cy="86" r="6" fill="var(--acc2)"/>`):"").join("")}</g>`}const ja="var(--line)",ac="#f7f3ee",zo="#3d3150",na="#f7f1e8",_i="#4a2f5e",fi="#2f2433";function od(e,t,n){return`<path d="${e}" fill="none" stroke="${ja}" stroke-width="${x(n+7)}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function u7(e){const[t,n]=zt[e],[s,o]=hn[e],i=e==="l"?-1:1,a=(t+s)/2+6*i;return`M${t-2*i} ${n-2} Q${a} ${(n+o)/2-6} ${s-i} ${o-16}`}function Uh(e,t,n){return["l","r"].map(s=>{const o=od(u7(s),e,21)+(n?n(s):"");return Rn("arm",s,o,t).replace('class="arm ','class="arm sleeve ')}).join("")}function Vh(e,t,n){return["l","r"].map(s=>{const o=s==="l"?-1:1,i=s==="l"?88:112,a=od(`M${i} 238 L${i+o} 280`,e,24)+(n?n(s,i):"");return Rn("leg",s,a,t)}).join("")}const Qh="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z";function Po(e,t){return t.hip?`<g transform="rotate(${x(t.hip)} 100 238)">${e}</g>`:e}function m7(e,t){const n="#ffd166",s=`<path d="${Qh}" fill="${n}" ${R(3)}/>`,o=`<path d="M78 188 H122 V232 H78 Z" fill="${e}" ${R(2.8)}/><path d="M88 200 H112 V216 Q100 220 88 216 Z" fill="none" stroke="#3a1d3c" stroke-width="2.4" opacity=".3" stroke-linejoin="round"/><path d="M74 166 L82 190 M126 166 L118 190" stroke="${ja}" stroke-width="10" stroke-linecap="round"/><path d="M74 166 L82 190 M126 166 L118 190" stroke="${e}" stroke-width="5.5" stroke-linecap="round"/><circle cx="82" cy="192" r="4" fill="#c9ced6" ${R(1.6)}/><circle cx="118" cy="192" r="4" fill="#c9ced6" ${R(1.6)}/>`,i=`<path d="M66 228 H134 L136 248 Q100 256 64 248 Z" fill="${e}" ${R(3)}/>`,a=Uh(n,t,l=>{const[c,d]=hn[l];return`<path d="M${c-9} ${d-12} h18" stroke="#3a1d3c" stroke-width="2" opacity=".25" stroke-linecap="round"/>`});return{back:"",over:Vh(e,t,(l,c)=>`<path d="M${c-11} 276 h22" stroke="#3a1d3c" stroke-width="2.4" opacity=".25" stroke-linecap="round"/>`)+Po(a+s+i+o,t),head:"",sleeve:n}}function y7(e){const t=70-Math.min(10,So(e)/2),n=`<path d="M38 ${t+10} Q100 ${t-8} 162 ${t+10}" fill="none" stroke="${ja}" stroke-width="13" stroke-linecap="round"/><path d="M38 ${t+10} Q100 ${t-8} 162 ${t+10}" fill="none" stroke="#6b6f7a" stroke-width="7.5" stroke-linecap="round"/>`,s=o=>`<circle cx="${o}" cy="${t}" r="17" fill="#c9ced6" ${R(3)}/><circle cx="${o}" cy="${t}" r="10.5" fill="#bfe3f2" ${R(2)}/><path d="M${o-5} ${t-4} q3 -4 8 -3" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`;return`<g data-costume-part="goggles">${n}${s(80)}${s(120)}<path d="M96 ${t} h8" stroke="${ja}" stroke-width="5" stroke-linecap="round"/></g>`}function b7(e){const t=60-So(e),n=Math.max(30,Math.min(56,t-4)),s=t-n;return`<g data-costume-part="witch-hat"><path d="M64 ${t-2} Q82 ${t-n*.45} 92 ${s+8} Q98 ${s-2} 114 ${s+4} Q104 ${s+10} 106 ${s+n*.4} L136 ${t-2} Z" fill="${_i}" ${R(3)}/><path d="M70 ${t-10} Q100 ${t-16} 130 ${t-10} L133 ${t-3} Q100 ${t-9} 67 ${t-3} Z" fill="#ff9f43" ${R(2.2)}/><path d="M24 ${t+2} Q100 ${t-16} 176 ${t+2} Q100 ${t+12} 24 ${t+2} Z" fill="${_i}" ${R(3)}/><path d="M118 ${t-24} l2.6 5.4 5.8 .8 -4.2 4 1 5.8 -5.2 -2.8 -5.2 2.8 1 -5.8 -4.2 -4 5.8 -.8 Z" fill="#ffd166" ${R(1.4)}/></g>`}function k7(e){const t=So(e);return`<g data-costume-part="cat-ears" transform="translate(0 ${x(-t)})"><path d="M52 66 L64 20 L90 56 Z" fill="${fi}" ${R(2.8)}/><path d="M110 56 L136 20 L148 66 Z" fill="${fi}" ${R(2.8)}/><path d="M61 56 L66 34 L80 52 Z" fill="#f4a3c8"/><path d="M120 52 L134 34 L139 56 Z" fill="#f4a3c8"/><path d="M50 72 Q100 46 150 72" fill="none" stroke="${fi}" stroke-width="6" stroke-linecap="round"/></g>`}function w7(e){return Po(`<g data-costume-part="cat-tail">${od("M118 232 Q156 240 162 206 Q166 178 182 172",fi,11)}<circle cx="182" cy="172" r="6" fill="${fi}"/></g>`,e)}function v7(e){const t=[30,50,70,90,110,130,150,170];let n="";for(let i=t.length-1;i>0;i--)n+=` Q${t[i]-10} ${i%2?276:266} ${t[i-1]} 262`;const s=`M64 166 Q70 154 100 152 Q130 154 136 166 Q164 196 170 262${n} Q36 196 64 166 Z`;return{back:"",over:Po(`<g data-costume-part="ghost-sheet"><path d="${s}" fill="${ac}" ${R(3)}/><path d="M70 190 Q60 230 58 258 M130 190 Q140 230 142 258 M100 190 V250" fill="none" stroke="#3a1d3c" stroke-width="2.4" opacity=".12" stroke-linecap="round"/></g>`,e),head:"",sleeve:ac}}function _7(e){const n=30-Math.min(16,So(e));return`<g data-costume-part="ghost-hood"><path d="${`M30 112 Q28 ${n} 100 ${n} Q172 ${n} 170 112 Q172 150 150 170 Q100 182 50 170 Q28 150 30 112 Z`} M54 116 Q54 76 100 74 Q146 76 146 116 Q146 152 100 156 Q54 152 54 116 Z" fill="${ac}" fill-rule="evenodd" ${R(3)}/><path d="M44 96 Q48 ${n+26} 84 ${n+12}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/></g>`}function $7(e){const t=`<path d="${Qh}" fill="${zo}" ${R(3)}/>`,n=`<g data-costume-part="ribs" fill="none" stroke="${na}" stroke-linecap="round"><path d="M100 172 V226" stroke-width="6"/>`+[184,198,212].map((r,l)=>`<path d="M${80+l*2} ${r} Q90 ${r-5} 100 ${r}  M${120-l*2} ${r} Q110 ${r-5} 100 ${r}" stroke-width="5.5"/>`).join("")+'<path d="M86 232 Q100 224 114 232" stroke-width="6"/></g>',s=(r,l,c,d)=>`<path d="M${x(r)} ${x(l)} L${x(c)} ${x(d)}" stroke="${na}" stroke-width="5" stroke-linecap="round"/><circle cx="${x(r)}" cy="${x(l)}" r="4" fill="${na}"/><circle cx="${x(c)}" cy="${x(d)}" r="4" fill="${na}"/>`,o=Uh(zo,e,r=>{const[l,c]=zt[r],[d,f]=hn[r];return s(l+(d-l)*.2,c+(f-c)*.2,l+(d-l)*.72,c+(f-c)*.72)}),i=`<path d="M66 230 H134 L136 248 Q100 256 64 248 Z" fill="${zo}" ${R(3)}/>`;return{back:"",over:Vh(zo,e,(r,l)=>s(l,246,l+(r==="l"?-1:1),274))+Po(o+i+t+n,e),head:"",sleeve:zo}}function x7(e){const t=n=>{const s=o=>x(100+n*o);return`M${s(20)} 166 Q${s(60)} 168 ${s(84)} 186 Q${s(90)} 220 ${s(80)} 256 Q${s(68)} 244 ${s(58)} 256 Q${s(48)} 242 ${s(36)} 254 Q${s(28)} 240 ${s(14)} 250 Z`};return Po(`<g data-costume-part="bat-cape"><path d="${t(-1)}" fill="${_i}" ${R(3)}/><path d="${t(1)}" fill="${_i}" ${R(3)}/><path d="M40 190 Q44 220 52 240 M160 190 Q156 220 148 240" fill="none" stroke="#fff" stroke-width="2.4" opacity=".18" stroke-linecap="round"/></g>`,e)}function M7(e){return Po(`<g data-costume-part="bat-collar"><path d="M78 164 Q72 152 82 146 L92 160 Z M122 164 Q128 152 118 146 L108 160 Z" fill="${_i}" ${R(2.4)}/><circle cx="100" cy="166" r="5" fill="#ff9f43" ${R(1.8)}/></g>`,e)}function zh(e,t,n){const s={back:"",over:"",head:"",sleeve:null};if(e.indexOf("helper-")===0){const o=Aa[e.slice(7)]??Aa.yellow;return{...m7(o,t),head:y7(n)}}return e==="witch"?{...s,head:b7(n)}:e==="cat"?{...s,back:w7(t),head:k7(n)}:e==="ghost"?{...v7(t),head:_7(n)}:e==="skeleton"?$7(t):e==="bat"?{...s,back:x7(t),over:M7(t)}:s}const L7=[{hip:1.5,head:4,armL:3,armR:-2,legL:0,legR:-3,legLLift:0,legRLift:0},{hip:-2,head:-5,armL:1,armR:-7,legL:4,legR:0,legLLift:2,legRLift:0},{hip:0,head:3,armL:2,armR:-2,legL:0,legR:0,legLLift:0,legRLift:0},{hip:-1.5,head:-4,armL:4,armR:-1,legL:5,legR:0,legLLift:3,legRLift:0}],E7={puffs:0,afro:0,pony:1,sidepony:1,pigtails:1,halfup:1,braids:2,boxbraids:2,locs:2,sidebraid:2,crown:2,buns:3,topbun:3,lowbun:3};function id(e){const t=e.hair||"buns";let n=E7[t];if(n===void 0){let s=0;for(let o=0;o<t.length;o++)s=(s+t.charCodeAt(o))%4;n=s}return L7[n]}function C7(e){const t=(n,s,o,i,a)=>{const r=tc(n,s,o,i,a),l=tc(r.x,r.y,100,238,e.hip);return{x:l.x/2,y:l.y/2}};return{left:t(hn.l[0],hn.l[1],zt.l[0],zt.l[1],e.armL),right:t(hn.r[0],hn.r[1],zt.r[0],zt.r[1],e.armR)}}function S7(e){const t=tc(100,244,100,238,e.hip);return Math.round(t.y/2*10)/10}function ad(e){const t=parseInt(e.slice(1),16);return(t>>16&255)+(t>>8&255)+(t&255)}function P7(e){const t=ci(e,.32);return ad(t)<80?"#5a3a2c":t}function T7(e){return ad(e)<140?"#3b2340":ci(e,.12)}let Vf=0;function R7(){return Vf+=1,"a"+Vf.toString(36)}function Ls(e,t){return t.hip?`<g transform="rotate(${x(t.hip)} 100 238)">${e}</g>`:e}function so(e,t,n=!1){const s=t.head?`<g transform="rotate(${x(t.head)} 100 158)">${e}</g>`:e;return Ls(`<g${n?' class="dollhead" data-dollhead="1"':' class="dollhead"'}>${s}</g>`,t)}function B7(e,t,n){let s=`<defs><radialGradient id="${e}b"><stop offset="0" style="stop-color:var(--blush)" stop-opacity=".62"/><stop offset=".55" style="stop-color:var(--blush)" stop-opacity=".28"/><stop offset="1" style="stop-color:var(--blush)" stop-opacity="0"/></radialGradient>`;return s+=`<radialGradient id="${e}s"><stop offset="0" stop-color="#3a1d3c" stop-opacity=".3"/><stop offset=".6" stop-color="#3a1d3c" stop-opacity=".12"/><stop offset="1" stop-color="#3a1d3c" stop-opacity="0"/></radialGradient>`,s+=`<radialGradient id="${e}k" cx=".42" cy=".36" r=".75"><stop offset=".55" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".16"/></radialGradient>`,t&&(s+=`<linearGradient id="${e}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f1020" stop-opacity=".62"/><stop offset=".5" stop-color="#1f1020" stop-opacity=".05"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`,s+=`<linearGradient id="${e}c" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="146" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".2"/></linearGradient>`,s+=`<radialGradient id="${e}h" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1f1020" stop-opacity=".28"/></radialGradient>`),s+n+"</defs>"}function Qf(e){const t=e==="l"?-1:1,n=zt[e][0],s=zt[e][1],o=hn[e][0],i=hn[e][1],a=o-t,r=i-7,l=-t;let c=`<path d="${nc([n,s],[a,r],18,13,-3*t)}" fill="var(--skin)" ${R(3)}/>`;return c+=`<path class="hand" d="M${x(o-8)} ${x(i-4)} Q${x(o-8)} ${x(i-10)} ${x(o)} ${x(i-10)} Q${x(o+8)} ${x(i-10)} ${x(o+8)} ${x(i-3)} Q${x(o+8.5)} ${x(i+9)} ${x(o)} ${x(i+9.5)} Q${x(o-8.5)} ${x(i+9)} ${x(o-8)} ${x(i-4)} Z" fill="var(--skin)" ${R(2.8)}/>`,c+=`<ellipse cx="${x(o+7*l)}" cy="${x(i-1)}" rx="3.4" ry="5" fill="var(--skin)" ${R(2.4)} transform="rotate(${-20*l} ${x(o+7*l)} ${x(i-1)})"/>`,c+=`<path d="M${x(o-3*l)} ${x(i+3)} v4 M${x(o+.5*l)} ${x(i+3.5)} v4" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`,c+=`<ellipse cx="${x(o-3*l)}" cy="${x(i-5)}" rx="3" ry="1.8" fill="#fff" opacity=".35"/>`,c}function zf(e){const t=e==="l"?-1:1,n=e==="l"?88:112;let s=`<path d="${nc([n,234],[n+t,294],21,15,1.5*t)}" fill="var(--skin)" ${R(3)}/>`;return s+=`<path d="${nc([n+5*t,244],[n+5*t,290],6,4)}" ${lt}/>`,s+=`<ellipse cx="${x(n+.5*t)}" cy="268" rx="4.5" ry="2.6" fill="#3a1d3c" opacity=".12"/>`,s+=`<path d="M${n-4} 265 q4 -2.5 8 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`,s}function qf(e,t,n,s,o,i){const a=n?-1:1,r=o==="big"||o==="bright"?1.08:o==="soft"?.94:1,l=(y,u)=>`${x(e+y*r)} ${x(t+u*r)}`,c=13.5*r,d=17*r;let f="";if(i&&o!=="soft"){const y=[.35,.95,1.57,2.2,2.8];for(let u=0;u<y.length;u++){const w=y[u];f+=`<path d="M${x(e+5.5*Math.cos(w)*r)} ${x(t+(4+6.5*Math.sin(w))*r)} L${x(e+11.5*Math.cos(w)*r)} ${x(t+(2+14*Math.sin(w))*r)}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>`}}const h=o==="soft"?2:2.6,g=o==="soft"?"":`<path d="M${l(-16*a,-8)} q${x(-6*a*r)} -2 ${x(-9*a*r)} ${x(-9*r)} M${l(-17*a,-2)} q${x(-6*a*r)} ${x(-.5*r)} ${x(-10*a*r)} ${x(-5*r)} M${l(-12*a,-15)} q${x(-3*a*r)} ${x(-4*r)} ${x(-4*a*r)} ${x(-9*r)}" fill="none" stroke="var(--lash)" stroke-width="2.2" stroke-linecap="round"/>`,m=o==="sparkle"||o==="bright"?`<path d="M${l(-9*a,-8)} l.7 1.6 1.6 .7 -1.6 .7 -.7 1.6 -.7 -1.6 -1.6 -.7 1.6 -.7 Z" fill="#fff" opacity=".9"/>`:"",k=i?`<ellipse cx="${e}" cy="${x(t+r)}" rx="${x(c)}" ry="${x(d)}" fill="url(#${s}i)"/>`:"",$=o==="sleepy"?`<path d="M${l(-17,-4)} Q${e} ${x(t+r)} ${l(17,-4)} L${l(18,-16)} Q${e} ${x(t-20*r)} ${l(-18,-16)} Z" fill="var(--skin)"/>`:"";return`<path d="M${l(-16,-2)} Q${l(-16,-20)} ${l(0,-20)} Q${l(16,-20)} ${l(16,-2)} Q${l(16,19)} ${l(0,19)} Q${l(-16,19)} ${l(-16,-2)} Z" fill="#fff"/><path d="M${l(-15,-4)} Q${e} ${x(t-21*r)} ${l(15,-4)} Q${e} ${x(t-14*r)} ${l(-15,-4)} Z" fill="#3a1d3c" opacity=".12"/><ellipse data-iris="1" cx="${e}" cy="${x(t+r)}" rx="${x(c)}" ry="${x(d)}" fill="var(--eye)"/>${k}${f}<ellipse cx="${e}" cy="${x(t+3*r)}" rx="${x(7*r)}" ry="${x(9*r)}" fill="#1f1020" opacity=".8"/><ellipse cx="${e}" cy="${x(t+r)}" rx="${x(11.3*r)}" ry="${x(14.8*r)}" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/><ellipse cx="${e}" cy="${x(t+r)}" rx="${x(c)}" ry="${x(d)}" fill="none" stroke="#1f1020" stroke-width="2" opacity=".55"/><path d="M${l(-9,12)} Q${e} ${x(t+19.5*r)} ${l(9,12)} Q${e} ${x(t+15.5*r)} ${l(-9,12)} Z" fill="#fff" opacity=".5"/><ellipse cx="${x(e-6*a*r)}" cy="${x(t-6*r)}" rx="${x(5.8*r)}" ry="${x(6.8*r)}" fill="#fff" transform="rotate(${-15*a} ${x(e-6*a*r)} ${x(t-6*r)})"/><circle cx="${x(e+6*a*r)}" cy="${x(t+8*r)}" r="${x(2.8*r)}" fill="#fff"/><circle cx="${x(e-4*a*r)}" cy="${x(t+10*r)}" r="${x(1.3*r)}" fill="#fff" opacity=".85"/><path d="M${l(7*a,-10)} l${x(r)} ${x(2.4*r)} ${x(2.4*r)} ${x(r)} ${x(-2.4*r)} ${x(r)} ${x(-r)} ${x(2.4*r)} ${x(-r)} ${x(-2.4*r)} ${x(-2.4*r)} ${x(-r)} ${x(2.4*r)} ${x(-r)} Z" fill="#fff"/>`+m+$+`<path d="M${l(-17,-1)} Q${l(-16,-21)} ${l(0,-21)} Q${l(16,-21)} ${l(17,-3)} Q${l(14.5,-18.6)} ${l(0,-18.8)} Q${l(-14.5,-18.6)} ${l(-15.5,-1)} Z" fill="var(--lash)" stroke="var(--lash)" stroke-width="${h}" stroke-linejoin="round"/>`+g+`<path d="M${l(-11,-23)} Q${e} ${x(t-27*r)} ${l(11,-23)}" fill="none" stroke="var(--line)" stroke-width="1.3" stroke-linecap="round" opacity=".22"/><path d="M${l(-5,20.5)} Q${e} ${x(t+22*r)} ${l(5,20.5)}" fill="none" stroke="var(--lash)" stroke-width="1.3" stroke-linecap="round" opacity=".28"/>`}function A7(e,t,n,s=!1){const o=e.blush?`<ellipse cx="64" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><ellipse cx="136" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><path d="M60 133 l3 -3 M66 134 l3 -3 M132 133 l3 -3 M138 134 l3 -3" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>`:"";let i="";if(e.freckles){const a=[[58,132],[64,136],[70,131],[130,131],[136,136],[142,132]];for(let r=0;r<a.length;r++)i+=`<circle cx="${a[r][0]}" cy="${a[r][1]}" r="1.5" fill="var(--freckle)" opacity=".7"/>`}return o+i+'<path data-brow="l" d="M64 86 Q74 80 85 84" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/><path data-brow="r" d="M115 84 Q126 80 136 86" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'+qf(76,112,!1,t,s?"sleepy":e.eyes,n)+qf(124,112,!0,t,s?"sleepy":e.eyes,n)+'<path d="M98 131 q2 1.8 4 0" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" opacity=".55"/><ellipse cx="101.5" cy="128.5" rx="1.6" ry="1" fill="#fff" opacity=".6"/><path d="M92 140 Q100 147.5 108 140" fill="none" stroke="var(--line)" stroke-width="2.8" stroke-linecap="round"/><path d="M96 142.6 Q100 145.4 104 142.6 Q100 144 96 142.6 Z" fill="#ff8fa8"/>'}function D7(e){const t="M40 102 Q38 38 100 38 Q162 38 160 102 Q160 140 132 153 Q116 160 100 160 Q84 160 68 153 Q40 140 40 102 Z";return`<ellipse cx="39" cy="114" rx="9" ry="11" fill="var(--skin)" ${R(3)}/><ellipse cx="161" cy="114" rx="9" ry="11" fill="var(--skin)" ${R(3)}/><ellipse cx="40" cy="115" rx="4" ry="6" ${ec}/><ellipse cx="160" cy="115" rx="4" ry="6" ${ec}/><path d="${t}" fill="var(--skin)" ${R(3.2)}/><path d="${t}" fill="url(#${e}k)"/>`}function I7(){return`<path d="M91 146 h18 v22 q-9 5 -18 0 Z" fill="var(--skin)" ${R(3)}/><path d="M91 150 h18 v9 q-9 6 -18 0 Z" ${ec}/><path d="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z" fill="var(--skin)" ${R(3)}/>`}function rc(e,t){const n=cs(e),s=t?.pose??id(n),o=t?.rich!==!1,i=t?.uid??R7(),a=S7(s),r=n.shoesC,l=r.toLowerCase()==="#ffffff"?n.dress?n.dressC:n.topC:If(r,.28),c=n.dress?n.dressC:n.topC,d=ad(c)>700?"#8fdcc0":ci(c,.18),f=["--line:#5a3d5c",`--skin:${n.skin}`,`--hair:${n.hairC}`,`--hair-shade:${P7(n.hairC)}`,`--brow:${T7(n.hairC)}`,`--eye:${n.eyeC}`,"--lash:#3b2340","--blush:#ff6f91",`--freckle:${ci(n.skin,.35)}`,`--top:${c}`,`--top-trim:${d}`,`--bottom:${n.dress?n.dressC:n.bottomC}`,`--bottom-trim:${ci(n.dress?n.dressC:n.bottomC,.16)}`,`--shoe:${r}`,`--shoe-trim:${l}`,"--sock:#ffffff",`--acc:${n.accC}`,`--acc2:${If(n.accC,.18)}`,"--frame:#6e4a5e"].join(";"),h=Rn("leg","l",zf("l"),s)+Rn("leg","r",zf("r"),s),g=Rn("arm","l",`<g class="hand">${Qf("l")}</g>`,s)+Rn("arm","r",`<g class="hand">${Qf("r")}</g>`,s),m=`<g data-layer="body">${h}${Ls(I7()+g,s)}${so(D7(i),s,!0)}</g>`,k=n.dress?c7(s,n,i,o,a):a7(s,n,i,o,a),$=`<g class="shadow"><ellipse cx="100" cy="308" rx="52" ry="9" fill="url(#${i}s)"/><ellipse cx="87" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/><ellipse cx="113" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/></g>`,y=h7(i,n.hair,n.acc),u=y?` mask="url(#${i}hm)"`:"",w=[`<g data-layer="hair-back">${so(`<g${u}>${o7(n.hair,i,o)}</g>`,s)}</g>`,m,f7(s,n),Ls(r7(s,n,i,o),s),Ls(k,s),Ls(l7(s,n,i,o),s),`<g data-layer="face">${so(A7(n,i,o,t?.poseName==="lie"),s)}</g>`,`<g data-layer="hair-front">${so(`<g${u}>${i7(n.hair,i,o)}</g>`,s)}</g>`,so(g7(n),s)],_=t?.poseName==="sit"||t?.poseName==="lie"?t.poseName:null,T=t?.costume?zh(t.costume,s,n.hair):null;t?.holding&&w.splice(6,0,Ls(Ii("under",!0,n.skin,_,T?.sleeve??c),s)),T&&(T.head&&w.push(`<g data-layer="costume-head">${so(T.head,s)}</g>`),T.over&&w.splice(6,0,`<g data-layer="costume">${T.over}</g>`),T.back&&w.splice(1,0,`<g data-layer="costume-back">${T.back}</g>`));const A=w.join(""),H=n.dress||n.top,F=t?.poseName?` data-pose="${t.poseName}"`:"",q=t?.costume?` data-costume="${t.costume}"`:"";return`<svg${F}${q} data-chibi="1" data-hair="${n.hair}" data-top="${H}" viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" style="${f}">${B7(i,o,y)}${$}${A}</svg>`}function Zf(e,t,n){const s=cs(e),o=Ar(t)??id(s),i=t==="sit"||t==="lie"?t:null,a=(n?zh(n,o,s.hair).sleeve:null)??(s.dress?s.dressC:s.topC);return`<svg viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">${Ls(Ii("over",!0,s.skin,i,a),o)}</svg>`}function Ga(){try{return typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("selector(&)")}catch{return!1}}function Oi(e,t,n){const s=!!(t&&t.look2);e.classList.toggle("chibi",s);const o=s&&Ga();e.classList.toggle("chibi-move",s&&(o||n)),e.classList.toggle("chibi-bob",s&&!o&&!n)}function qh(e){return e.look2?z0(e):null}const nt="#5a3d5c",be=`stroke="${nt}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,H7=["little","kid","adult"],Vs={little:.78,kid:1,adult:1.28},Xo={left:{x:15,y:113},right:{x:85,y:113}};function Hr(e,t){return e.look2?C7(t??id(e.look2)):t?{left:{x:22,y:96},right:{x:78,y:96}}:Xo}function Zh(e,t){return e===1?`<path d="M62 16 L76 8 L76 26 Z M62 16 L50 6 L48 24 Z" fill="#ff7aa8" stroke="${nt}" stroke-width="3" stroke-linejoin="round"/><circle cx="62" cy="16" r="5" fill="#ffd166" stroke="${nt}" stroke-width="3"/>`:e===2?`<circle cx="40" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${nt}" stroke-width="3"/><circle cx="60" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${nt}" stroke-width="3"/><path d="M49 48 h2" stroke="${nt}" stroke-width="3"/>`:e===3?`<path d="M20 30 Q22 8 50 8 Q78 8 80 30 Z" fill="${t}" stroke="${nt}" stroke-width="3.5" stroke-linejoin="round"/><path d="M60 28 Q84 26 92 32 Q80 36 60 34 Z" fill="${t}" stroke="${nt}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="9" r="4" fill="#fff" stroke="${nt}" stroke-width="3"/>`:""}function Ya(e,t,n){return n?e===1?`<path d="M20 40 Q16 86 30 92 L70 92 Q84 86 80 40 Z" fill="${t}" ${be}/>`:e===2?`<circle cx="18" cy="34" r="12" fill="${t}" ${be}/><circle cx="82" cy="34" r="12" fill="${t}" ${be}/>`:e===3?`<circle cx="50" cy="8" r="13" fill="${t}" ${be}/>`:"":e===3?`<path d="M22 42 Q20 14 50 12 Q80 14 78 42 Q66 26 50 30 Q34 26 22 42 Z" fill="${t}" ${be}/>`:`<path d="M21 46 Q18 12 50 12 Q82 12 79 46 Q72 30 58 28 Q50 36 36 30 Q26 34 21 46 Z" fill="${t}" ${be}/>`}function bt(e,t,n){const s=Ar(t),o=qh(e);return o&&e.look2?rc(e.look2,{rich:Ga(),pose:s??void 0,poseName:t||void 0,holding:n,costume:o}):e.look2?rc(e.look2,{rich:Ga(),pose:s??void 0,poseName:t||void 0,holding:n}):t==="sit"||t==="lie"?O7(e,t,n):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${Ya(e.hairStyle,e.hair,!0)}
  <rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${be}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${be}/>
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${nt}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${nt}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${be} transform="rotate(12 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${be} transform="rotate(-12 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${be}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${be}/>
  <circle cx="50" cy="44" r="30" fill="${e.skin}" ${be}/>
  ${Ya(e.hairStyle,e.hair,!1)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${nt}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${nt}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${be} fill="none"/>
  ${Zh(e.acc??0,e.shirt)}
  <circle class="hand hang" cx="${Xo.left.x}" cy="${Xo.left.y}" r="6" fill="${e.skin}" ${be}/><circle class="hand hang" cx="${Xo.right.x}" cy="${Xo.right.y}" r="6" fill="${e.skin}" ${be}/>
  ${n?Ii("under",!1,Br(e.skin),null):""}
</svg>`}function Nh(e,t){const n=t==="sit"||t==="lie"?t:null;if(n==="lie")return"";const s=qh(e);return s&&e.look2?Zf(e.look2,t,s):e.look2?Zf(e.look2,t):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${Ii("over",!1,Br(e.skin),n)}</svg>`}function O7(e,t,n){const s=t==="sit"?`<rect class="leg" x="34" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${be} transform="rotate(-68 40 112)"/>
  <rect class="leg" x="53" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${be} transform="rotate(68 60 112)"/>`:`<rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${be}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${be}/>`,o=t==="lie"?`<path d="M34 48 Q40 52 46 48" fill="none" ${be}/><path d="M54 48 Q60 52 66 48" fill="none" ${be}/>`:`<ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${nt}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${nt}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>`,i=`<ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${Ya(e.hairStyle,e.hair,!0)}
  ${s}
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${nt}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${nt}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${be} transform="rotate(28 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${be} transform="rotate(-28 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${be}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${be}/>
  <g class="dollhead">
  <circle class="dollhead" data-dollhead="1" cx="50" cy="44" r="30" fill="${e.skin}" ${be}/>
  ${Ya(e.hairStyle,e.hair,!1)}
  ${o}
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${be} fill="none"/>
  ${Zh(e.acc??0,e.shirt)}
  </g>
  <circle class="hand hang" cx="22" cy="96" r="6" fill="${e.skin}" ${be}/><circle class="hand hang" cx="78" cy="96" r="6" fill="${e.skin}" ${be}/>
  ${n?Ii("under",!1,Br(e.skin),t):""}`;return`<svg data-pose="${t}" viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${i}</svg>`}const Nf=[{id:"hair",name:"Hair"},{id:"face",name:"Face"},{id:"clothes",name:"Clothes"},{id:"shoes",name:"Shoes"},{id:"extras",name:"Extras"}],W7={id:"costume",name:"🎃 Costumes"};function U7(){return Lr()?[...Nf,W7]:Nf}function V7(e,t){const n=js(e),s=!!n&&n.startsWith("helper-"),o=cs(t),i=(c,d,f,h)=>`<button type="button" class="avCosTile${f?" on":""}" data-act="av-costume" data-v="${c}" aria-pressed="${f}"><span class="avCosPic">${rc(o,{uid:"cosT"+(h||"none"),rich:!1,costume:h||null})}</span><span class="avCosName">${d}</span></button>`,a=s?n:"helper-yellow",r=i("","No costume",!n,"")+i(a,sf.helper,s,a)+["witch","cat","ghost","skeleton","bat"].map(c=>i(c,sf[c],n===c,c)).join(""),l=Object.keys(Aa).map(c=>`<button type="button" class="avSw${n==="helper-"+c?" on":""}" style="background:${Aa[c]}" data-act="av-costume" data-v="helper-${c}" aria-label="${c} overalls"></button>`).join("");return`<h3>Costumes</h3><p class="avHint">Halloween dress-up! Tap one. Everyone in the room sees it.</p><div class="avCosGrid">${r}</div><h3>Helper overalls color</h3><div class="avColors avCosColors">${l}</div>`}const Q7={short:"Short",pixie:"Pixie",coily:"Coily",afro:"Afro",bangs:"Bangs",bob:"Bob",wavybob:"Wavy bob",curlybob:"Curly bob",sidebangs:"Side bangs",long:"Long",wavy:"Wavy",braids:"Braids",boxbraids:"Box braids",locs:"Locs",sidebraid:"Side braid",crown:"Crown",pony:"Ponytail",sidepony:"Side pony",pigtails:"Pigtails",halfup:"Half-up",buns:"Buns",puffs:"Puffs",topbun:"Top bun",lowbun:"Low bun"},z7={classic:"Tee",stripes:"Stripes",hoodie:"Hoodie",sweater:"Sweater",tank:"Tank",puff:"Puff",ruffle:"Ruffle",button:"Buttons",jersey:"Jersey",cardigan:"Cardigan",bib:"Bib",raincoat:"Raincoat"},q7={pants:"Pants",jeans:"Jeans",shorts:"Shorts",skirt:"Skirt",tutu:"Tutu",leggings:"Leggings",overalls:"Overalls",joggers:"Joggers"},Z7={"":"No dress",twirl:"Twirl",sundress:"Sundress",party:"Party",pinafore:"Pinafore",jumper:"Jumper",ballet:"Ballet",nightgown:"Nightgown",raindress:"Rain"},N7={classic:"Classic",sneakers:"Sneakers",lightup:"Light-up",boots:"Boots",rainboots:"Rain boots",sandals:"Sandals",maryjanes:"Mary Janes",slippers:"Slippers"},F7={round:"Round",big:"Big",sleepy:"Sleepy",sparkle:"Sparkle",soft:"Soft",bright:"Bright"},j7={glasses:"Glasses",square:"Square",sunnies:"Sunnies",bow:"Bow",bigbow:"Big bow",headband:"Headband",flower:"Flower",cap:"Cap",beanie:"Beanie",sunhat:"Sun hat",catears:"Cat ears",earmuffs:"Earmuffs"},G7={little:"Little",kid:"Kid",adult:"Grown-up"};let xn="hair";function _n(e,t,n,s){return`<button type="button" class="avOpt${s?" on":""}" data-act="${e}" data-v="${t}">${n}</button>`}function ka(e,t,n){return`<button type="button" class="avSw${n?" on":""}" style="background:${t}" data-act="${e}" data-v="${t}" aria-label="Color"></button>`}function _s(e){return`<div class="avGrid">${e}</div>`}function qo(e,t){return`<div class="avColors">${Tt.map(n=>ka(e,n,n===t)).join("")}</div>`}function Y7(e,t,n,s){const o=cs(e.look2),i=e.id==="__me";xn==="costume"&&!Lr()&&(xn="hair");const a=xn==="costume"?V7(e.costume,e.look2):xn==="hair"?`<h3>Style</h3>${_s(br.map(c=>_n("av-hair",c,Q7[c],o.hair===c)).join(""))}<h3>Color</h3><div class="avColors">${yr.map(c=>ka("av-hairC",c,o.hairC===c)).join("")}</div>`:xn==="face"?`<h3>Skin</h3><div class="avColors">${mr.map(c=>ka("av-skin",c,o.skin===c)).join("")}</div><h3>Eyes</h3>${_s($r.map(c=>_n("av-eyes",c,F7[c],o.eyes===c)).join(""))}<h3>Eye color</h3><div class="avColors">${Bc.map(c=>ka("av-eyeC",c,o.eyeC===c)).join("")}</div><div class="avToggles">${_n("av-freckles",o.freckles?"0":"1","Freckles",o.freckles)}${_n("av-blush",o.blush?"0":"1","Blush",o.blush)}</div>`:xn==="clothes"?`<h3>Top</h3>${_s(kr.map(c=>_n("av-top",c,z7[c],!o.dress&&o.top===c)).join(""))}${qo("av-topC",o.topC)}<h3>Bottom</h3>${_s(wr.map(c=>_n("av-bottom",c,q7[c],!o.dress&&o.bottom===c)).join(""))}${qo("av-bottomC",o.bottomC)}<h3>Dress</h3>${_s(vr.map(c=>_n("av-dress",c,Z7[c],o.dress===c)).join(""))}${qo("av-dressC",o.dressC)}`:xn==="shoes"?`<h3>Shoes</h3>${_s(_r.map(c=>_n("av-shoes",c,N7[c],o.shoes===c)).join(""))}${qo("av-shoesC",o.shoesC)}`:`<h3>Extras</h3><p class="avHint">Pick up to two</p>${_s(po.map(c=>_n("av-acc",c,j7[c],o.acc.indexOf(c)>=0)).join(""))}${qo("av-accC",o.accC)}`,r=H7.map(c=>`<button type="button" class="avOpt sz${c===e.size?" on":""}" data-act="size" data-v="${c}">${G7[c]}</button>`).join(""),l=i?'<div class="meNote">This is you!</div>':`<button type="button" class="del${n?" sure":""}" data-act="delc">${s}<span>${n?"Tap again":""}</span></button>`;return`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${t}<div class="dress avLook"><div class="avStageWrap"><div class="avStage chibi-move">${bt(e)}</div>${l}<div class="avSizes">${r}</div></div><div class="avSide"><div class="avTabs">${U7().map(c=>`<button type="button" class="avTab${c.id===xn?" on":""}" data-act="av-tab" data-v="${c.id}">${c.name}</button>`).join("")}</div><div class="avPane">${a}</div><div class="avBar"><button type="button" class="avSurprise" data-act="av-surprise">🎲 Surprise me</button><button type="button" class="avDone" data-act="close">Done</button></div></div></div>`}function K7(e,t,n){if(t==="av-tab")return(n==="hair"||n==="face"||n==="clothes"||n==="shoes"||n==="extras"||n==="costume"&&Lr())&&(xn=n),null;const s=cs(e);if(t==="av-hair"&&br.indexOf(n)>=0)return{...s,hair:n};if(t==="av-hairC")return{...s,hairC:n};if(t==="av-skin")return{...s,skin:n};if(t==="av-eyes"&&$r.indexOf(n)>=0)return{...s,eyes:n};if(t==="av-eyeC")return{...s,eyeC:n};if(t==="av-freckles")return{...s,freckles:n==="1"};if(t==="av-blush")return{...s,blush:n==="1"};if(t==="av-top"&&kr.indexOf(n)>=0)return{...s,top:n,dress:""};if(t==="av-topC")return{...s,topC:n};if(t==="av-bottom"&&wr.indexOf(n)>=0)return{...s,bottom:n,dress:""};if(t==="av-bottomC")return{...s,bottomC:n};if(t==="av-dress"&&vr.indexOf(n)>=0)return{...s,dress:n};if(t==="av-dressC")return{...s,dressC:n};if(t==="av-shoes"&&_r.indexOf(n)>=0)return{...s,shoes:n};if(t==="av-shoesC")return{...s,shoesC:n};if(t==="av-accC")return{...s,accC:n};if(t==="av-acc"&&po.indexOf(n)>=0){const o=n,i=s.acc.slice(),a=i.indexOf(o);if(a>=0)i.splice(a,1);else{const r=Ba(o),l=i.filter(c=>Ba(c)!==r);return l.push(o),{...s,acc:l.slice(0,2)}}return{...s,acc:i}}return null}function X7(){try{return typeof navigator<"u"&&navigator.webdriver&&!window.__forceAvatarIntro?!1:localStorage.getItem(jt("avatar-intro"))!=="1"}catch{return!1}}function J7(){try{localStorage.setItem(jt("avatar-intro"),"1")}catch{}}const wa="#5a3d5c";function ml(e,t,n,s,o){return`<path class="${e}" d="${t}" fill="none" stroke="${wa}" stroke-width="${s}" stroke-linecap="round"/><path class="${e} cloth" d="${t}" fill="none" stroke="${n}" stroke-width="${o}" stroke-linecap="round"/>`}function eM(e){const t=cs(e),n=t.skin,s=t.dress!=="",o=s||t.bottom==="skirt"||t.bottom==="tutu",i=o?n:t.bottomC,a=t.shoesC,r=s||t.bottom==="skirt"||t.bottom==="tutu";let l="";if(r){const h=s?t.dressC:t.bottomC;l+=`<path class="dress" d="M75 46 L89 46 L91 53 L73 53 Z" fill="${h}" stroke="${wa}" stroke-width="1.1" stroke-linejoin="round"/>`}l+=ml("thigh","M76 44 Q83 48 88 54",i,6.2,4.8),l+=`<circle class="knee" cx="88" cy="56" r="2.3" fill="${i}" stroke="${wa}" stroke-width="1.1"/>`;const c=t.shoes==="boots"||t.shoes==="rainboots";l+=ml("shin",c?"M88 58 Q90 64 91 68":"M88 58 Q90 65 91 70",o?n:i,5.8,4.4),!c&&(t.shoes==="sneakers"||t.shoes==="maryjanes"||t.shoes==="lightup")&&(l+=ml("shin","M90 66 Q90.6 68 91 70","#ffffff",5.4,4));const d=t.shoes==="sandals"?n:a,f=c?66:69;return l+=`<path class="shoe" d="M90 ${f} Q90 ${f-2} 94 ${f-2} Q99 ${f-2} 100 ${f+1} Q100 ${f+5} 95 ${f+5} Q90 ${f+5} 90 ${f+2} Z" fill="${d}" stroke="${wa}" stroke-width="1.1" stroke-linejoin="round"/>`,t.shoes==="sandals"&&(l+=`<path d="M90 ${f+5} L100 ${f+5}" stroke="${a}" stroke-width="1.3" stroke-linecap="round"/>`,l+=`<path d="M93 ${f} L97 ${f+3}" stroke="${a}" stroke-width="1.1" stroke-linecap="round"/>`),`<svg class="rideleg" viewBox="0 0 160 130">${l}</svg>`}let Ve=null,Xt=null,uo=null,Zo=null,ln=0,va=0;const yl=[261.63,293.66,329.63,392,440,523.25,587.33,659.25,783.99,880],lc=[[4,-1,5,4,2,-1,3,-1],[2,3,4,-1,3,2,0,-1],[5,-1,7,6,5,-1,4,-1],[3,2,1,-1,2,-1,0,-1]],Ff=[130.81,98,110,98];function Fh(){try{return Ve??=new(window.AudioContext||window.webkitAudioContext),Xt||(Xt=Ve.createGain(),Xt.gain.value=.5,Xt.connect(Ve.destination)),Ve.state==="suspended"&&Ve.resume().catch(()=>{}),!0}catch{return!1}}function sa(e,t,n,s,o){if(!Ve||!Xt)return;const i=Ve.createOscillator(),a=Ve.createGain();i.type=s,i.frequency.setValueAtTime(e,t),a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(o,t+.03),a.gain.exponentialRampToValueAtTime(5e-4,t+n),i.connect(a).connect(Xt),i.start(t),i.stop(t+n+.05)}function tM(){if(!Ve||!uo)return;if(!Gc||document.hidden){ln=Ve.currentTime+.1;return}const e=wt/2e3*(uo==="musicbox"?1.35:1);for(ln<Ve.currentTime&&(ln=Ve.currentTime+.05);ln<Ve.currentTime+.4;){const t=Math.floor(va/8)%lc.length,n=va%8,s=lc[t][n];uo==="musicbox"?s>=0&&sa(yl[Math.min(yl.length-1,s+3)]*2,ln,.9,"sine",.05):(s>=0&&sa(yl[s],ln,.5,"triangle",.045),n===0&&sa(Ff[t],ln,1.6,"sine",.06),n===4&&sa(Ff[t]*1.5,ln,1,"sine",.035)),va++,ln+=e}}function jf(e){if(e!==uo){if(uo=e,!uo){if(Zo&&(clearInterval(Zo),Zo=null),Xt&&Ve){const t=Xt.gain;t.cancelScheduledValues(Ve.currentTime),t.setValueAtTime(t.value,Ve.currentTime),t.linearRampToValueAtTime(1e-4,Ve.currentTime+.4)}return}!Fh()||!Ve||!Xt||(Xt.gain.cancelScheduledValues(Ve.currentTime),Xt.gain.setValueAtTime(.5,Ve.currentTime+.42),va=Math.floor(Date.now()/(wt/2))%(lc.length*8),ln=Ve.currentTime+.45,Zo||(Zo=setInterval(tM,120)))}}function nM(){Fh()}const sM=2,oM=340,iM=380;function aM(e,t){const n=new Map;for(const[a,r]of t){if(r.kind!=="dance")continue;const l=e.find(c=>c.id===r.item);!l||!l.on||Yn(l.kind)!=="stereo"||(n.get(r.item)??n.set(r.item,[]).get(r.item)).push(a)}let s=null;for(const a of[...n].sort((r,l)=>r[0]<l[0]?-1:1))a[1].length>=sM&&(!s||a[1].length>s[1].length)&&(s=a);if(!s)return null;const o=e.find(a=>a.id===s[0]),i=e.filter(a=>a.id!==o.id&&Zp(a.kind)&&Math.hypot(a.x-o.x,(a.y-o.y)*1.5)<=oM).map(a=>a.id).sort();return{stereo:o.id,x:o.x,y:o.y,dancers:s[1].sort(),toys:i}}const rM="http://www.w3.org/1999/xhtml",Gf=new Map;function cc(e){if(e.startsWith("data:"))return Promise.resolve(e);let t=Gf.get(e);return t||(t=(async()=>{try{const n=new URL(e,location.href);if(n.origin!==location.origin)return"";const o=await(await fetch(n.href,{credentials:"same-origin"})).blob();return await new Promise(i=>{const a=new FileReader;a.onload=()=>i(String(a.result)),a.onerror=()=>i(""),a.readAsDataURL(o)})}catch{return""}})(),Gf.set(e,t)),t}const dc=/url\((['"]?)([^'")]+)\1\)/g;async function Yf(e,t,n){const s=new Map;for(const i of e.matchAll(dc)){const a=i[2];if(a.startsWith("data:")||a.startsWith("#"))continue;let r=a;try{r=new URL(a,t).href}catch{}s.set(a,r)}const o=new Map;return await Promise.all([...s].map(async([i,a])=>o.set(i,n(a)?await cc(a):""))),e.replace(dc,(i,a,r)=>{if(r.startsWith("data:")||r.startsWith("#"))return i;const l=o.get(r);return l?`url("${l}")`:"none"})}const lM=["transform","translate","rotate","scale","opacity","filter"];async function cM(e,t){const n=e.offsetWidth,s=e.offsetHeight,o=new Map;for(const _ of document.getAnimations()){const T=_.effect?.target;if(!T||!(e===T||e.contains(T))||_.effect.pseudoElement)continue;const A=getComputedStyle(T);o.set(T,lM.map(H=>`${H}:${A.getPropertyValue(H)}`).join(";"))}const i=new Set,a=_=>{for(const T of _.matchAll(dc))try{i.add(new URL(T[2],location.href).href)}catch{}},r=[e,...e.querySelectorAll("*")];for(const _ of r)a(getComputedStyle(_).backgroundImage),a(getComputedStyle(_,"::before").backgroundImage),a(getComputedStyle(_,"::after").backgroundImage);const l=e.cloneNode(!0),c=[l,...l.querySelectorAll("*")],d=[];r.forEach((_,T)=>{const A=c[T];if(!A)return;const H=o.get(_);H&&A.setAttribute("style",(A.getAttribute("style")||"")+";"+H);const F=A.getAttribute("style");if(F&&F.includes("url(")&&d.push(Yf(F,location.href,()=>!0).then(q=>A.setAttribute("style",q))),_ instanceof HTMLImageElement&&A instanceof HTMLImageElement){const q=_.currentSrc||_.src;A.removeAttribute("srcset"),A.removeAttribute("loading"),d.push(cc(q).then(se=>{se?A.src=se:A.removeAttribute("src")}))}else if(_ instanceof HTMLCanvasElement)try{const q=document.createElement("img");q.src=_.toDataURL(),q.setAttribute("style",getComputedStyle(_).cssText||`width:${_.offsetWidth}px;height:${_.offsetHeight}px`),q.className=_.className,A.replaceWith(q)}catch{}else if(_ instanceof SVGImageElement){const q=_.href.baseVal;q&&d.push(cc(q).then(se=>{se&&A.setAttribute("href",se)}))}_.tagName==="BUTTON"&&_.classList.contains("nudge")&&A.setAttribute("style","display:none")}),l.style.transform="none",l.style.left="0",l.style.top="0",l.style.position="relative",l.style.margin="0";let f="";for(const _ of[...document.styleSheets])try{const T=[..._.cssRules].map(A=>A.cssText).join(`
`);f+=await Yf(T,_.href||location.href,A=>i.has(A))}catch{}f=f.replace(/:root\b/g,".pbHtml")+`
*,*::before,*::after{animation:none!important;transition:none!important}`,await Promise.all(d);const h=document.documentElement,g=document.body,m=new XMLSerializer,k=`<div xmlns="${rM}" class="pbHtml ${h.className}" style="${Kf(h.getAttribute("style")||"")};width:${n}px;height:${s}px;overflow:hidden"><style>${f.replace(/<\/style/gi,"<\\/style")}</style><body class="${Kf(g.className)}" style="margin:0;width:${n}px;height:${s}px;overflow:hidden;background:transparent"><div id="app"><div class="stageWrap" style="position:relative;margin:0;padding:0;width:${n}px;height:${s}px;inset:auto;transform:none">`+m.serializeToString(l)+"</div></div></body></div>",$=`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${s}" viewBox="0 0 ${n} ${s}"><foreignObject x="0" y="0" width="${n}" height="${s}">${k}</foreignObject></svg>`,y="data:image/svg+xml;charset=utf-8,"+encodeURIComponent($),u=document.createElement("canvas");u.width=Math.round(n*t),u.height=Math.round(s*t);const w=u.getContext("2d");try{const _=new Image;_.decoding="sync",_.src=y,await _.decode().catch(()=>new Promise(T=>{_.onload=T,_.onerror=T})),w.drawImage(_,0,0,u.width,u.height),await new Promise(T=>setTimeout(T,60)),w.clearRect(0,0,u.width,u.height),w.drawImage(_,0,0,u.width,u.height)}finally{}return u}const Kf=e=>e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");function dM(e,t=new Date,n=0){const s=e.width/600,o=Math.round(26*s),i=Math.round(64*s),a=document.createElement("canvas");a.width=e.width+o*2,a.height=e.height+o+i;const r=a.getContext("2d"),l=r.createLinearGradient(0,0,a.width,a.height);l.addColorStop(0,"#ffd6e8"),l.addColorStop(.5,"#fff1c9"),l.addColorStop(1,"#d9ecff"),r.fillStyle=l,bl(r,0,0,a.width,a.height,30*s),r.fill(),r.lineWidth=5*s,r.strokeStyle="#5a3d5c",bl(r,2.5*s,2.5*s,a.width-5*s,a.height-5*s,28*s),r.stroke(),r.save(),n>0&&(bl(r,o,o,e.width,e.height,n),r.clip()),r.drawImage(e,o,o),r.restore();const c=["#ff7aa8","#ffd166","#7ec8ff","#b48cff","#8ee08e"];for(let d=0;d<26;d++){const h=d/26*a.width,g=d%2?o/2:a.height-i/2+(d%4-1.5)*8*s;r.fillStyle=c[d%5],r.beginPath(),r.arc(h+10*s,(d%2,g),4*s,0,Math.PI*2),r.fill()}return fM(r,o*1.2,a.height-i/2,14*s,"#ffd166"),pM(r,a.width-o*1.3,a.height-i/2,13*s,"#ff7aa8"),r.fillStyle="#5a3d5c",r.textAlign="center",r.textBaseline="middle",r.font=`800 ${Math.round(24*s)}px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif`,r.fillText("Our cozy house · "+t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),a.width/2,a.height-i/2),a}function bl(e,t,n,s,o,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+s,n,t+s,n+o,i),e.arcTo(t+s,n+o,t,n+o,i),e.arcTo(t,n+o,t,n,i),e.arcTo(t,n,t+s,n,i),e.closePath()}function fM(e,t,n,s,o){e.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?s*.45:s;e.lineTo(t+Math.cos(a)*r,n+Math.sin(a)*r)}e.closePath(),e.fillStyle=o,e.fill(),e.lineWidth=s/5,e.strokeStyle="#5a3d5c",e.stroke()}function pM(e,t,n,s,o){e.beginPath(),e.moveTo(t,n+s*.9),e.bezierCurveTo(t-s*1.6,n-s*.2,t-s*.6,n-s*1.3,t,n-s*.4),e.bezierCurveTo(t+s*.6,n-s*1.3,t+s*1.6,n-s*.2,t,n+s*.9),e.fillStyle=o,e.fill(),e.lineWidth=s/5,e.strokeStyle="#5a3d5c",e.stroke()}function hM(e,t){const n=t.getBoundingClientRect(),s=t.parentElement?.getBoundingClientRect(),o=(g,m)=>g?(parseFloat(getComputedStyle(g).borderTopRightRadius)||0)*m:0,i=e.width/(n.width||1),a=e.height/(n.height||1),r=e.width/Math.max(1,t.offsetWidth);if(!s||!n.width)return{c:e,radius:o(t,r)};const l=Math.max(n.left,s.left,0),c=Math.max(n.top,s.top,0),d=Math.min(n.right,s.right,innerWidth),f=Math.min(n.bottom,s.bottom,innerHeight);if(d-l>=n.width-2&&f-c>=n.height-2)return{c:e,radius:o(t,r)};if(d<=l||f<=c)return{c:e,radius:o(t,r)};const h=document.createElement("canvas");return h.width=Math.round((d-l)*i),h.height=Math.round((f-c)*a),h.getContext("2d").drawImage(e,(l-n.left)*i,(c-n.top)*a,h.width,h.height,0,0,h.width,h.height),{c:h,radius:o(t.parentElement,i)}}const gM=()=>typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let kl=!1;async function uM(e,t){if(!kl){kl=!0;try{const n=Math.min(2,Math.max(1,window.devicePixelRatio||1),1600/Math.max(1,e.offsetWidth)),s=cM(e,n),o=document.createElement("div");o.className="pbFlash"+(gM()?" soft":""),document.body.appendChild(o),t?.(),setTimeout(()=>o.remove(),700);const i=hM(await s,e),a=dM(i.c,new Date,i.radius),r=await new Promise(l=>a.toBlob(l,"image/png"));if(!r)return;mM(r)}catch(n){console.warn("photo booth",n)}finally{kl=!1}}}function mM(e){document.querySelector(".pbCard")?.remove();const t=URL.createObjectURL(e),n="cozy-house-"+new Date().toISOString().slice(0,10)+".png",s=typeof File=="function"?new File([e],n,{type:"image/png"}):null,o=document.createElement("div");o.className="pbCard",o.setAttribute("role","dialog"),o.setAttribute("aria-label","Your photo"),o.innerHTML=`<div class="pbInner"><img class="pbImg" alt="Your photo" src="${t}"/><div class="pbBtns"><button type="button" class="pbSave">💾 Save</button><button type="button" class="pbClose">Close</button></div></div>`,document.body.appendChild(o);const i=()=>{o.remove(),setTimeout(()=>URL.revokeObjectURL(t),1e3)};o.querySelector(".pbClose").addEventListener("click",i),o.addEventListener("click",a=>{a.target===o&&i()}),o.querySelector(".pbSave").addEventListener("click",async()=>{const a=navigator;if(s&&a.share&&a.canShare?.({files:[s]}))try{await a.share({files:[s]});return}catch(l){if(l?.name==="AbortError")return}const r=document.createElement("a");r.href=t,r.download=n,document.body.appendChild(r),r.click(),r.remove()})}const yM=/rug|lamp|light|plant|curtain|clock|window|lantern/;function bM(e){if(e.cat==="plants")return!0;const t=`${e.name} ${e.kind??""}`.toLowerCase();return yM.test(t)}const jh=new Set(["pack:ring-light","pack:desk-lamp",...jm,...e1]);function Gh(e,t=new Date){return e.pack===fh&&!ph(t)}function Yh(e){const t=e.rooms??[];return t.includes("backyard")&&!t.includes("any")}function kM(e,t){if(t==="nursery"&&e.kind&&jh.has(e.kind))return!1;if(t==="backyard")return Yh(e);if(t==="all"||!t)return!0;const n=e.rooms;return!n||n.length===0||n.includes(t)?!0:n.includes("any")?e.cat==="decor"||e.cat==="furniture"?bM(e):!0:!1}function wM(e,t,n,s,o){return e.secret&&!(o&&o.has(e.secret))||Gh(e)||!s&&n==="backyard"&&!Yh(e)||n==="nursery"&&e.kind&&jh.has(e.kind)?!1:t.startsWith("pack:")?e.pack===t.slice(5):e.cat!==t?!1:kM(e,s?"all":n)}const Kh="cozy-candy",Xf=["🍬","🍭","🍫","🍪","🧁","🍎"];function Xh(e){try{const t=Number(e?.getItem(Kh)??0);return Number.isFinite(t)&&t>0?Math.min(9999,Math.floor(t)):0}catch{return 0}}function vM(e,t=Math.random()){const n=Math.min(9999,Xh(e)+1);try{e?.setItem(Kh,String(n))}catch{}return{count:n,treat:Xf[Math.floor(Math.max(0,Math.min(.999,t))*Xf.length)]}}function Jh(e=new Date,t=typeof location<"u"?location.search:""){return/[?&]halloween=0\b/.test(t)?!1:/[?&]halloween=1\b/.test(t)||ph(e)}function _M(e){return`${String(e??"").replace(/[^\p{L}' -]/gu,"").replace(/\s+/g," ").trim().slice(0,30)||"A friend"} came trick-or-treating!`}function $M(e){const t=e.scale;let n=0;e.overflowR>1&&e.overflowL>1?n=-e.overflowL:e.overflowR>1?n=e.overflowR:e.overflowL>1&&(n=-e.overflowL);const s=e.cam+n/t,o=Math.max(0,Math.min(e.maxCam,s)),i=s-o,a=e.nudgeX&&Math.abs(i)>.5?e.kidX-i:e.kidX;return{cam:o,kidX:a}}function xM(e){const t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[1][0]).toUpperCase():"?"}function MM(e,t=3){const n=[...e].sort((r,l)=>r.x-l.x||r.id.localeCompare(l.id)),s=[],o=[],i=(r,l,c)=>s.some(d=>d.lane===c&&Math.abs(d.x-r)<(d.w+l)/2+8),a=[];for(const r of n){let l=-1;for(let c=0;c<t;c++)if(!i(r.x,r.w,c)){l=c;break}l<0?a.push(r):(s.push({x:r.x,w:r.w,lane:l}),o.push({id:r.id,lane:l,initials:!1}))}for(const r of a){const l=Math.min(r.w,44);let c=0;for(let d=0;d<t;d++)if(!i(r.x,l,d)){c=d;break}s.push({x:r.x,w:l,lane:c}),o.push({id:r.id,lane:c,initials:!0})}return o}let LM=0;function eg(e=document){const t=[...e.querySelectorAll(".nametag")].filter(o=>{const i=o.getBoundingClientRect();return i.width>2&&i.height>2});if(!t.length)return;const n=t.map(o=>{o.dataset.tagId||(o.dataset.tagId="tg"+(++LM).toString(36)),o.dataset.full||(o.dataset.full=(o.textContent||"").trim()),o.classList.contains("is-initials")||(o.dataset.fullW=String(o.getBoundingClientRect().width));const i=o.getBoundingClientRect(),a=Number(o.dataset.fullW)||i.width;return{id:o.dataset.tagId,x:i.left+i.width/2,w:a}}),s=new Map(MM(n).map(o=>[o.id,o]));for(const o of t){const i=s.get(o.dataset.tagId||"");if(!i)continue;const a=o.dataset.full||"",r=i.initials?xM(a):a;o.textContent!==r&&(o.textContent=r),o.classList.toggle("is-initials",i.initials),o.style.setProperty("--tag-lane",String(i.lane))}}function To(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function EM(e){!e||To()||(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),window.setTimeout(()=>e.classList.remove("wiggle"),480))}const CM=".round, .thing";function SM(){let e=null;const t=()=>{e?.classList.remove("pressing"),e=null};document.addEventListener("pointerdown",n=>{t();const s=n.target?.closest?.(CM);s&&(s.classList.add("pressing"),e=s)},{capture:!0,passive:!0});for(const n of["pointerup","pointercancel","dragstart","blur"])window.addEventListener(n,t,{capture:!0,passive:!0});document.addEventListener("pointerup",n=>{if(To())return;const s=n.target?.closest("button");s&&(s.classList.remove("spring"),s.offsetWidth,s.classList.add("spring"))},!0)}const tg="#5a3d5c",_t=`stroke="${tg}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,PM={living:"#ff8fab",bedroom:"#c9a0dc",kitchen:"#8fd6a6",salon:"#f0a0d8",nursery:"#9ad7f5",bathroom:"#7ec8d6",backyard:"#80ed99"};function TM(e){const t=PM[e]??"#ffb3c6";return`<div class="sceneWin builtin-window" aria-hidden="true"><svg viewBox="0 0 160 180">
    <path d="M18 20 H142 V150 H18 Z" fill="#fff6ea" ${_t}/>
    <path d="M28 30 H132 V118 H28 Z" fill="#b9e3ff" ${_t}/>
    <path d="M80 30 V118 M28 74 H132" ${_t} stroke-width="3"/>
    <circle cx="48" cy="52" r="10" fill="#fff" opacity=".85"/>
    <ellipse cx="108" cy="48" rx="16" ry="8" fill="#fff" opacity=".8"/>
    <path d="M40 118 Q58 96 70 118 Q90 100 112 118" fill="#7dce8a" stroke="${tg}" stroke-width="3"/>
    <rect x="96" y="86" width="8" height="32" rx="3" fill="#6b4a32" ${_t} stroke-width="2"/>
    <circle cx="100" cy="80" r="12" fill="#5cc985" ${_t} stroke-width="2"/>
    <path d="M8 16 Q6 80 16 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <path d="M152 16 Q154 80 144 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <rect x="46" y="146" width="68" height="12" rx="4" fill="#ffe7c2" ${_t}/>
  </svg></div>`}function RM(){return`<div class="sceneRug" aria-hidden="true"><svg viewBox="0 0 200 80">
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
  </svg></div>`}function BM(e,t){return t==="backyard"?[]:[{id:e("rug"),kind:"rug",x:1152,y:540,flip:!1,z:0,scale:1},{id:e("lamp"),kind:"lamp",x:804,y:470,flip:!1,z:0,scale:1},{id:e("plant"),kind:"plant",x:1584,y:480,flip:!1,z:0,scale:1}]}let xs="",ng=null;function AM(e){ng=e,xs=""}function DM(e,t,n){const s=ng?.(t,n);if(s!=null){const r="custom|"+t;if(r===xs&&e.childElementCount)return;xs=r,e.innerHTML=s,e.dataset.room=t;return}if(t==="backyard"){const r="yard|"+t;if(r===xs&&e.childElementCount)return;xs=r,e.innerHTML="",e.dataset.room=t;return}const o=n.length===0,i=n.some(r=>/window|curtain/i.test(r.kind)),a=t+(o?"|e":"")+(i?"|w":"");a===xs&&e.childElementCount||(xs=a,e.innerHTML=(i?"":TM(t))+(o?RM():""),e.dataset.room=t)}const De="#5a3d5c",E=(e=4)=>`stroke="${De}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Wi=600,nn=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],pn=(e,t,n=3)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${De}"/><circle cx="${e+1}" cy="${t-1}" r="${n/3}" fill="#fff"/>`,Ss=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="5" ry="3" fill="#ff9bb5" opacity=".75"/>`,IM=(e,t,n,s)=>nn.map((o,i)=>`<path d="M${e-n+i*s} ${t} A${n-i*s} ${n-i*s} 0 0 1 ${e+n-i*s} ${t}" fill="none" stroke="${o}" stroke-width="${s}"/>`).join(""),HM=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${E()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${E()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${E()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${E()}/></g>`,Sn=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-46" y="-50" width="92" height="50" rx="14" fill="#f5d27a" ${E()}/>
  <path d="M-30 -42 V-8 M0 -44 V-6 M30 -42 V-8" stroke="#d9a93f" stroke-width="4" stroke-linecap="round"/><path d="M-46 -26 H46" stroke="#c98a2e" stroke-width="5"/></g>`,OM=(e,t,n)=>{const s=Array.from({length:Math.floor((t-e)/70)+1},(o,i)=>`<rect x="${e+i*70-7}" y="${n-58}" width="14" height="64" rx="5" fill="#fff6e6" ${E(3)}/>`).join("");return`<rect x="${e}" y="${n-46}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${E(3)}/><rect x="${e}" y="${n-22}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${E(3)}/>${s}`};function WM(){const e=Ri;return`<svg class="parkScene ranchScene" viewBox="0 0 ${e} ${Wi}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="rcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7e8ff"/><stop offset="1" stop-color="#fff4fb"/></linearGradient></defs>
  <rect width="${e}" height="440" fill="url(#rcSky)"/>
  <g opacity=".55">${IM(1900,430,620,26)}</g>
  ${[160,820,1500,2300,3e3].map((t,n)=>`<g transform="translate(${t} ${70+n%2*34})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <g transform="translate(${e-200} 92)"><circle r="48" fill="#ffe066" ${E()}/>${pn(-15,-6,4)}${pn(13,-6,4)}<path d="M-14 12 Q0 24 14 12" fill="none" ${E(3)}/>${Ss(-26,8)}${Ss(26,8)}</g>
  <path d="M-50 370 Q600 230 1300 350 T2600 330 T${e+100} 360 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#a6e3a0"/><path d="M0 410 H${e}" ${E()}/>
  <path d="M0 566 Q900 530 1800 570 T${e} 552 V600 H0 Z" fill="#f2dcb8" opacity=".9"/>
  ${HM(3560,400,.8,"#4fbf7a")}
  <!-- entrance gate with a rainbow arch -->
  <g class="ranchSign"><g class="ranchSignArt"><rect x="40" y="290" width="24" height="210" rx="6" fill="#c99366" ${E()}/><rect x="196" y="290" width="24" height="210" rx="6" fill="#c99366" ${E()}/>
    <path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${De}" stroke-width="44" stroke-linecap="round"/>
    ${nn.map((t,n)=>`<path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${t}" stroke-width="${36-n*6}" stroke-linecap="round"/>`).join("")}
    <rect x="22" y="250" width="216" height="40" rx="14" fill="#fff6e6" ${E(3)}/><text x="130" y="277" text-anchor="middle" font-size="19" font-weight="900" fill="${De}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  <!-- red barn with rainbow trim and banner -->
  <g transform="translate(270 0)">
    <path d="M0 470 V250 L60 180 H270 L330 250 V470 Z" fill="#ef5b5b" ${E(5)}/>
    <path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${De}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    ${nn.map((t,n)=>`<path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${t}" stroke-width="3" transform="translate(0 ${-7+n*2.8})" stroke-linejoin="round"/>`).join("")}
    <rect x="115" y="215" width="100" height="56" rx="10" fill="#fff6e6" ${E(4)}/><path d="M115 215 L215 271 M215 215 L115 271" stroke="#ef5b5b" stroke-width="6"/>
    <rect x="95" y="330" width="140" height="140" rx="8" fill="#fff6e6" ${E(4)}/><rect x="108" y="342" width="56" height="128" fill="#d94848" ${E(3)}/><rect x="166" y="342" width="56" height="128" fill="#d94848" ${E(3)}/>
    <path d="M108 342 L164 470 M164 342 L108 470 M166 342 L222 470 M222 342 L166 470" stroke="#fff6e6" stroke-width="6"/>
    <g class="barnBanner" transform="translate(165 300)"><g class="ranchSignArt">${nn.map((t,n)=>`<rect x="${-120+n*40}" y="-16" width="40" height="30" fill="${t}"/>`).join("")}<rect x="-120" y="-16" width="240" height="30" fill="none" ${E(3)}/>
      <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${De}" stroke-width="4" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  </g>
  ${Sn(640,560,.8)}${Sn(1950,470,.7)}${Sn(1880,470,.55)}${Sn(3115,470,.7)}${Sn(3115,425,.55)}
  <!-- the petting zoo moved into the barn: a sign by the barn door, sunflowers where the pen was -->
  ${Array.from({length:6},(t,n)=>{const s=1030+n*66,o=70+n%3*18;return`<g transform="translate(${s} 470)"><path d="M0 0 V-${o}" stroke="#40c057" stroke-width="6" stroke-linecap="round"/><ellipse cx="${n%2?9:-9}" cy="-${o/2}" rx="11" ry="5" fill="#69db7c" ${E(2.5)}/>${[0,45,90,135,180,225,270,315].map(i=>`<ellipse cx="${Math.cos(i*Math.PI/180)*14}" cy="${-o+Math.sin(i*Math.PI/180)*14}" rx="8" ry="5" transform="rotate(${i} ${Math.cos(i*Math.PI/180)*14} ${-o+Math.sin(i*Math.PI/180)*14})" fill="#ffd43b" ${E(2)}/>`).join("")}<circle cy="-${o}" r="10" fill="#a0522d" ${E(2.5)}/></g>`}).join("")}
  <!-- pond -->
  <ellipse cx="${mt.x}" cy="${mt.y}" rx="${mt.rx}" ry="${mt.ry}" fill="#8ecae6" ${E()}/><ellipse cx="${mt.x-15}" cy="${mt.y-6}" rx="70" ry="16" fill="#bde6f7"/>
  <!-- paddock fence + HORSES sign are their own depth layer (paddockFenceSVG) -->
  <!-- garden -->
  <rect x="3140" y="520" width="420" height="70" rx="20" fill="#b07d54" ${E()}/>
  <rect x="3260" y="430" width="160" height="40" rx="12" fill="#fff6e6" ${E(3)}/><text x="3340" y="458" text-anchor="middle" font-size="21" font-weight="900" fill="${De}" font-family="Nunito, system-ui, sans-serif">GARDEN</text>
  <path d="M3340 470 V500" ${E(5)}/>
  </svg>`}function UM(){return`<svg class="fenceLayer" viewBox="0 0 ${Ri} ${Wi}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  ${OM(2400,3080,470)}
  <rect x="2640" y="380" width="180" height="40" rx="12" fill="#fff6e6" ${E(3)}/><text x="2730" y="408" text-anchor="middle" font-size="21" font-weight="900" fill="${De}" font-family="Nunito, system-ui, sans-serif">HORSES</text>
  </svg>`}const sg=[{name:"Goat",say:"Meh-eh-eh!",snd:"bleat"},{name:"Sheep",say:"Baa!",snd:"baa"},{name:"Piglet",say:"Oink oink!",snd:"oink"},{name:"Chicks",say:"Peep peep!",snd:"peep"},{name:"Bunny",say:"*wiggle wiggle*",snd:"squeak"},{name:"Cow",say:"Moooo!",snd:"moo"}],oa=(e,t,n,s=94)=>e.map((o,i)=>`<rect class="leg ${i%2?"b":"a"}" x="${o}" y="${t}" width="9" height="${s-t}" rx="4" fill="${n}" ${E(3)}/>`).join("");function fc(e){switch(e){case 0:return`<svg viewBox="0 0 120 100">${oa([32,44,70,82],60,"#efe6dc")}<path class="tail" d="M24 50 l-8 -10" ${E(5)}/>
      <ellipse cx="58" cy="56" rx="34" ry="17" fill="#f4ede5" ${E()}/><g class="head"><path d="M86 30 l-6 -16 l10 10 Z M96 30 l2 -17 l5 13 Z" fill="#c9b8a8" ${E(3)}/>
      <ellipse cx="94" cy="40" rx="14" ry="16" fill="#f4ede5" ${E()}/><ellipse class="ear" cx="80" cy="36" rx="9" ry="4" fill="#e8d6c4" ${E(3)}/>${pn(98,36)}<path d="M98 56 q2 8 6 0" fill="#e8d6c4" ${E(3)}/>${Ss(102,46)}<circle cx="106" cy="44" r="2" fill="${De}"/></g></svg>`;case 1:return`<svg viewBox="0 0 120 100">${oa([36,48,70,80],62,"#5a4a5c")}
      ${[[40,50],[56,44],[72,48],[86,56],[70,64],[48,64],[34,60]].map(([t,n])=>`<circle cx="${t}" cy="${n}" r="15" fill="#fff" ${E(3)}/>`).join("")}<ellipse cx="60" cy="55" rx="30" ry="14" fill="#fff"/>
      <g class="head"><ellipse cx="96" cy="46" rx="13" ry="15" fill="#6b5a6e" ${E()}/><circle cx="92" cy="32" r="8" fill="#fff" ${E(3)}/><ellipse class="ear" cx="82" cy="44" rx="8" ry="4" fill="#6b5a6e" ${E(3)}/>
      <circle cx="99" cy="42" r="3.2" fill="#fff"/><circle cx="99.5" cy="42" r="1.8" fill="${De}"/>${Ss(102,52)}</g></svg>`;case 2:return`<svg viewBox="0 0 120 100">${oa([38,50,66,78],66,"#ffadc6")}<path class="tail" d="M28 54 q-10 -4 -6 -12 q6 0 2 8" fill="none" ${E(3)}/>
      <ellipse cx="58" cy="60" rx="32" ry="20" fill="#ffc2d4" ${E()}/><g class="head"><circle cx="90" cy="52" r="16" fill="#ffc2d4" ${E()}/><path d="M80 38 l2 -12 l9 8 Z" fill="#ffadc6" ${E(3)}/>
      <ellipse cx="104" cy="56" rx="7" ry="8" fill="#ff9bb8" ${E(3)}/><circle cx="102" cy="54" r="1.6" fill="${De}"/><circle cx="106" cy="57" r="1.6" fill="${De}"/>${pn(92,46)}${Ss(90,60)}</g></svg>`;case 3:return`<svg viewBox="0 0 120 100">${[[30,72,1],[62,66,1.15],[92,74,.95]].map(([t,n,s])=>`<g transform="translate(${t} ${n}) scale(${s})"><path d="M-4 16 v8 M4 16 v8" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="4" r="14" fill="#ffe066" ${E(3)}/><path d="M-8 2 q-6 4 0 8" fill="#ffd43b" ${E(2)}/><g class="head"><circle cx="5" cy="-8" r="9" fill="#ffe066" ${E(3)}/><path d="M13 -9 l7 2 l-7 3 Z" fill="#ff9f43" ${E(2)}/>${pn(7,-10,2.2)}</g></g>`).join("")}</svg>`;case 4:return`<svg viewBox="0 0 120 100"><circle class="tail" cx="30" cy="68" r="8" fill="#fff" ${E(3)}/><ellipse cx="56" cy="72" rx="28" ry="20" fill="#f6eef9" ${E()}/><ellipse cx="74" cy="90" rx="12" ry="5" fill="#f6eef9" ${E(3)}/>
      <g class="head"><ellipse class="ear" cx="78" cy="26" rx="7" ry="20" fill="#f6eef9" ${E(3)} transform="rotate(-12 78 26)"/><ellipse cx="78" cy="26" rx="3" ry="13" fill="#ffc2d4" transform="rotate(-12 78 26)"/>
      <ellipse cx="90" cy="28" rx="7" ry="20" fill="#f6eef9" ${E(3)} transform="rotate(10 90 28)"/><circle cx="86" cy="56" r="17" fill="#f6eef9" ${E()}/>${pn(92,52)}<circle cx="102" cy="58" r="2.5" fill="#ff8fab"/>${Ss(90,63)}</g></svg>`;default:return`<svg viewBox="0 0 120 100">${oa([30,42,72,84],62,"#fff")}<path class="tail" d="M20 50 q-6 14 0 26" fill="none" ${E(3)}/>
      <rect x="18" y="38" width="80" height="34" rx="16" fill="#fff" ${E()}/><path d="M30 40 q10 8 4 20 q-10 -2 -10 -14 Z M60 42 q14 2 10 18 q-12 4 -14 -8 Z" fill="${De}"/><ellipse cx="60" cy="74" rx="8" ry="5" fill="#ffadc6" ${E(2)}/>
      <g class="head"><path d="M90 24 l-8 -8 M108 24 l8 -8" stroke="#f5d27a" stroke-width="5" stroke-linecap="round"/><rect x="86" y="22" width="26" height="30" rx="12" fill="#fff" ${E()}/>
      <ellipse cx="100" cy="52" rx="14" ry="10" fill="#ffc2d4" ${E(3)}/><circle cx="95" cy="52" r="1.8" fill="${De}"/><circle cx="105" cy="52" r="1.8" fill="${De}"/>${pn(94,34)}${pn(106,34)}
      <ellipse class="ear" cx="82" cy="30" rx="7" ry="4" fill="#fff" ${E(3)}/></g></svg>`}}const mt={x:2265,y:520,rx:110,ry:34},VM=476,Ka=[{name:"Chestnut",body:"#c97b45",mane:"#7a3f22",sock:"#fff6e6"},{name:"Snowy",body:"#fdf8f3",mane:"#d9cdc4",sock:"#e9ddd2"},{name:"Midnight",body:"#4a3f52",mane:"#2a2230",sock:"#6b5e74"},{name:"Sunny",body:"#f2c96b",mane:"#fff6e0",sock:"#fff6e0"},{name:"Rainbow Pony",body:"#fff0fa",mane:"rainbow",sock:"#ffd6ec"}];function rd(e,t=!1){const n=Ka[e]??Ka[0],s=n.mane==="rainbow",o=s?nn.map((r,l)=>{const c=124-l*1.6,d=14+l*2.4;return`<path d="M${c.toFixed(1)} ${d.toFixed(1)} q-6.5 2 -4.5 ${6+l*.35}" fill="none" stroke="${r}" stroke-width="5.5" stroke-linecap="round"/>`}).join(""):`<path d="M106 20 q-14 6 -18 30 q8 -6 10 -2 q4 -12 14 -18 Z" fill="${n.mane}" ${E(3)}/>`,i=s?`<g class="tail">${nn.map((r,l)=>`<path d="M30 58 q-18 ${8+l*3} -14 ${36+l}" fill="none" stroke="${r}" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`:`<path class="tail" d="M30 56 q-20 10 -14 44 q10 -10 8 -20 q6 -10 10 -18 Z" fill="${n.mane}" ${E(3)}/>`,a=(r,l)=>`<g class="leg ${l}"><rect x="${r}" y="78" width="12" height="44" rx="5" fill="${n.body}" ${E(3)}/><rect x="${r}" y="110" width="12" height="12" rx="4" fill="${n.sock}" ${E(3)}/></g>`;return`<svg viewBox="0 0 160 130" class="horsesvg">${i}${a(40,"a")}${a(56,"b")}${a(96,"b")}${a(112,"a")}
    <ellipse cx="80" cy="68" rx="50" ry="24" fill="${n.body}" ${E()}/>
    ${t||s?`<path class="saddle" data-top="43" d="M64 46 q16 -6 32 0 l-2 22 q-14 4 -28 0 Z" fill="${s?"#b197fc":"#e8590c"}" ${E(3)}/>`:""}
    <g class="head"><path d="M108 66 L114 30 Q118 16 132 18 L148 36 Q152 46 142 48 L130 46 L128 70 Z" fill="${n.body}" ${E()}/>
    <path d="M114 22 l2 -14 l8 12 Z" fill="${n.body}" ${E(3)}/>${o}
    ${pn(130,30,3.4)}<circle cx="146" cy="42" r="2" fill="${De}"/>${Ss(136,40)}
    ${s?`<path d="M120 14 l4 -14 l4 14 Z" fill="#ffd43b" ${E(2)}/>`:""}</g>
    ${s?'<g fill="#fff" opacity=".9"><path d="M60 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M92 74 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/></g>':""}</svg>`}const QM=`<svg viewBox="0 0 180 170"><path d="M10 70 L90 14 L170 70" fill="#ffa94d" ${E(5)}/>
  <rect x="24" y="66" width="132" height="84" rx="8" fill="#fff6e6" ${E()}/>${nn.map((e,t)=>`<rect x="${24+t*22}" y="66" width="22" height="10" fill="${e}"/>`).join("")}
  <rect x="24" y="66" width="132" height="10" fill="none" ${E(3)}/><circle cx="90" cy="108" r="22" fill="#5a3d5c"/>
  <path d="M60 150 l-12 16 M120 150 l12 16" ${E(5)}/>
  <g class="hen"><ellipse cx="90" cy="118" rx="20" ry="14" fill="#fff" ${E(3)}/><circle cx="104" cy="104" r="10" fill="#fff" ${E(3)}/><path d="M100 94 q3 -8 8 0" fill="#ff6b6b" ${E(2)}/>
  <path d="M113 104 l7 2 -7 3 Z" fill="#ffa94d" ${E(2)}/>${pn(106,102,2)}</g>
  <text x="90" y="54" text-anchor="middle" font-size="16" font-weight="900" fill="${De}" font-family="Nunito, system-ui, sans-serif">EGGS</text></svg>`,zM=`<svg viewBox="0 0 170 130"><rect x="80" y="30" width="54" height="50" rx="8" fill="#bde6f7" ${E()}/><rect x="74" y="24" width="66" height="10" rx="4" fill="#ff6b6b" ${E(3)}/>
  <rect x="20" y="62" width="130" height="34" rx="12" fill="#ff6b6b" ${E()}/><rect x="28" y="40" width="10" height="24" rx="3" fill="#868e96" ${E(3)}/>
  <circle cx="122" cy="98" r="28" fill="${De}"/><circle cx="122" cy="98" r="13" fill="#ffd43b" ${E(3)}/><circle cx="44" cy="106" r="18" fill="${De}"/><circle cx="44" cy="106" r="8" fill="#ffd43b" ${E(3)}/>
  <circle cx="26" cy="76" r="5" fill="#fff3b0" ${E(2)}/></svg>`,qM=`<svg viewBox="0 0 240 300"><rect x="104" y="160" width="32" height="140" rx="10" fill="#c99366" ${E()}/>
  <circle cx="120" cy="110" r="90" fill="#5cc985" ${E()}/><circle cx="62" cy="140" r="50" fill="#5cc985" ${E()}/><circle cx="180" cy="140" r="52" fill="#5cc985" ${E()}/>
  ${[[80,90],[150,70],[175,140],[100,150],[130,115],[60,140]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="11" fill="#ff6b6b" ${E(3)}/><path d="M${e} ${t-10} q2 -6 6 -7" fill="none" ${E(2)}/>`).join("")}</svg>`,Jf=[[80,90],[150,70],[175,140],[100,150]],og=`<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="14" fill="#ff6b6b" ${E(3)}/><path d="M20 10 q2 -6 6 -7" fill="none" ${E(2.5)}/><ellipse cx="27" cy="8" rx="5" ry="3" fill="#5cc985" ${E(2)}/><circle cx="14" cy="18" r="3" fill="#fff" opacity=".6"/></svg>`,Or=`<svg viewBox="0 0 40 40"><path d="M12 14 L32 10 L16 36 Z" fill="#ff922b" ${E(3)}/><path d="M18 18 l5 -1 M17 24 l4 -1" ${E(2)}/><path d="M30 10 q4 -8 8 -6 M30 10 q-2 -8 2 -10 M30 10 q6 -2 8 2" fill="none" stroke="#40c057" stroke-width="4" stroke-linecap="round"/></svg>`,ZM=`<svg viewBox="0 0 40 40"><path d="M6 34 Q20 4 34 34 Z" fill="#f5d27a" ${E(3)}/><path d="M14 30 L18 14 M20 32 V10 M26 30 L22 14" stroke="#d9a93f" stroke-width="2.5" stroke-linecap="round"/></svg>`,$i=`<svg viewBox="0 0 40 40"><path d="M20 4 C30 4 34 20 34 26 C34 34 28 38 20 38 C12 38 6 34 6 26 C6 20 10 4 20 4 Z" fill="#fff6e6" ${E(3)}/><circle cx="15" cy="16" r="3" fill="#fff"/></svg>`,ld=(e="#ff8fab")=>`<svg viewBox="0 0 40 40"><path d="M20 38 V20" stroke="#40c057" stroke-width="4" stroke-linecap="round"/>${[0,72,144,216,288].map(t=>`<circle cx="${20+Math.cos(t*Math.PI/180)*8}" cy="${14+Math.sin(t*Math.PI/180)*8}" r="7" fill="${e}" ${E(2.5)}/>`).join("")}<circle cx="20" cy="14" r="5" fill="#ffd43b" ${E(2)}/></svg>`,ig={carrot:Or,apple:og,hay:ZM},NM=e=>`<svg viewBox="0 0 80 90"><g transform="translate(14 0) scale(1.3)">${ig[e].replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g>
  <path d="M10 40 H70 L62 86 H18 Z" fill="${e==="carrot"?"#74c0fc":e==="apple"?"#ffa8c5":"#b2f2bb"}" ${E(4)}/><path d="M12 52 H68" stroke="#fff" stroke-width="4" opacity=".6"/></svg>`,FM=`<svg viewBox="0 0 60 50"><path d="M12 22 Q30 -6 48 22" fill="none" stroke="${De}" stroke-width="7" stroke-linecap="round"/><path d="M12 22 Q30 -6 48 22" fill="none" stroke="#e0a96d" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 22 H56 L50 46 H10 Z" fill="#e0a96d" ${E(3.5)}/><path d="M12 30 H48 M14 38 H46" stroke="#b5793d" stroke-width="3"/></svg>`,ep=["#ff8fab","#c9a0dc","#ffd43b","#74c0fc","#ff922b"];function ag(e,t,n){const s=`<ellipse cx="35" cy="76" rx="30" ry="11" fill="${e?.wet?"#7a4b2e":"#9c6b46"}" ${E(3)}/>`;if(!e)return`<svg viewBox="0 0 70 90">${s}<path d="M20 74 q4 -3 8 0 M36 78 q4 -3 8 0" stroke="#b5875f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;const o=ep[n%ep.length];let i="";t===0&&(i=`<circle cx="27" cy="72" r="3" fill="#f2dcb8" ${E(1.5)}/><circle cx="36" cy="75" r="3" fill="#f2dcb8" ${E(1.5)}/><circle cx="44" cy="71" r="3" fill="#f2dcb8" ${E(1.5)}/>`),t===1&&(i=`<path d="M35 72 V58" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="57" rx="7" ry="4" fill="#69db7c" ${E(2)}/><ellipse cx="41" cy="55" rx="7" ry="4" fill="#69db7c" ${E(2)}/>`),t===2&&(i=`<path d="M35 72 V40 M35 60 Q22 54 20 42 M35 56 Q48 50 50 38" stroke="#40c057" stroke-width="4" fill="none" stroke-linecap="round"/>${e.seed==="flower"?`<circle cx="35" cy="38" r="7" fill="#b2f2bb" ${E(2)}/>`:""}`),t===3&&(i=e.seed==="carrot"?`<path d="M26 74 L44 72 L35 86 Z" fill="#ff922b" ${E(2.5)}/><path d="M35 72 Q24 50 22 38 M35 72 Q36 48 36 34 M35 72 Q46 50 50 40" stroke="#40c057" stroke-width="5" fill="none" stroke-linecap="round"/>`:`<path d="M35 72 V34" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="54" rx="8" ry="4" fill="#69db7c" ${E(2)}/>${[0,72,144,216,288].map(l=>`<circle cx="${35+Math.cos(l*Math.PI/180)*10}" cy="${28+Math.sin(l*Math.PI/180)*10}" r="8" fill="${o}" ${E(2.5)}/>`).join("")}<circle cx="35" cy="28" r="6" fill="#ffd43b" ${E(2)}/>`);const a=e.wet?"":`<g class="needWater"><path d="M56 18 q6 10 0 14 q-6 -4 0 -14 Z" fill="#74c0fc" ${E(2)}/></g>`,r=t===3?`<g class="ready"><path d="M58 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffd43b" ${E(1.5)}/></g>`:"";return`<svg viewBox="0 0 70 90">${s}${i}${a}${r}</svg>`}const jM=`<svg viewBox="0 0 48 48">${nn.map((e,t)=>`<path d="M${6+t*2.6} 38 A${18-t*2.6} ${18-t*2.6} 0 0 1 ${42-t*2.6} 38" fill="none" stroke="${e}" stroke-width="3"/>`).join("")}<path d="M4 38 H44" ${E(3)}/></svg>`,GM=`<svg viewBox="0 0 48 48"><path d="M10 34 Q24 22 38 34" fill="none" ${E(4)}/><path d="M24 30 V8 M16 16 L24 8 L32 16" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40 H40" ${E(4)}/></svg>`,YM=`<svg viewBox="0 0 200 320"><path d="M70 310 L84 120 H116 L130 310 Z" fill="#fff6e6" ${E(4)}/><path d="M78 200 H122 M74 260 H126" ${E(3)}/><rect x="88" y="262" width="24" height="48" rx="10" fill="#b197fc" ${E(3)}/>
  <path d="M78 124 L100 92 L122 124 Z" fill="#ff8fab" ${E(4)}/>
  <g class="sails" style="transform-origin:100px 110px">${[0,90,180,270].map(e=>`<g transform="rotate(${e} 100 110)"><path d="M100 110 L104 30 L126 30 L118 104 Z" fill="${["#ffd43b","#74c0fc","#ff8fab","#69db7c"][e/90]}" ${E(3)}/><path d="M108 40 H122 M107 58 H121 M106 76 H120" ${E(2)}/></g>`).join("")}<circle cx="100" cy="110" r="10" fill="#ffa94d" ${E(3)}/></g></svg>`,KM=["GOAT","SHEEP","PIGLET","CHICKS","BUNNY","COW"],XM=e=>`<g class="lantern" style="transform-origin:${e}px 146px"><path d="M${e} 146 V178" ${E(3)}/><circle cx="${e}" cy="204" r="34" fill="#fff3b0" opacity=".45"/>
  <path d="M${e-14} 182 H${e+14} L${e+11} 226 H${e-11} Z" fill="#ffe066" ${E(3)}/><rect x="${e-17}" y="176" width="34" height="8" rx="3" fill="#495057" ${E(2.5)}/><rect x="${e-15}" y="224" width="30" height="7" rx="3" fill="#495057" ${E(2.5)}/><ellipse cx="${e}" cy="205" rx="5" ry="9" fill="#ff922b"/></g>`;function JM(){const e=Ac,t=Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64} 146 V440" stroke="#d4895f" stroke-width="3"/>`).join(""),n=Array.from({length:Math.ceil(e/46)},(o,i)=>{const a=i*46,r=160+Math.sin(i/3.1)*8;return`<path d="M${a} ${r} L${a+40} ${r} L${a+20} ${r+30} Z" fill="${nn[i%6]}" ${E(2.5)}/>`}).join(""),s=Dc.map((o,i)=>`<g><rect x="${o-96}" y="318" width="192" height="122" rx="6" fill="#f0c49a" ${E(4)}/>
    <path d="M${o-96} 350 H${o+96} M${o-96} 384 H${o+96} M${o-96} 412 H${o+96}" stroke="#d9a074" stroke-width="3"/><path d="M${o-96} 318 L${o+96} 440 M${o+96} 318 L${o-96} 440" stroke="#e0aa7e" stroke-width="7" opacity=".7"/>
    <rect x="${o-54}" y="284" width="108" height="30" rx="10" fill="#fff6e6" ${E(3)}/><text x="${o}" y="305" text-anchor="middle" font-size="17" font-weight="900" fill="${De}" font-family="Nunito, system-ui, sans-serif">${KM[i]}</text></g>`).join("");return`<svg class="parkScene ranchScene barnScene" viewBox="0 0 ${e} ${Wi}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="440" fill="#e8a87c"/>${t}
  <!-- hay loft -->
  <rect width="${e}" height="128" fill="#c98a5e"/>${Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64+32} 0 V128" stroke="#b5764d" stroke-width="3"/>`).join("")}
  ${[120,260,420,980,1130,1290,1640,1790].map((o,i)=>Sn(o,126,i%3===1?.72:.85)).join("")}${[190,1060,1720].map(o=>Sn(o,82,.7)).join("")}
  <rect x="0" y="126" width="${e}" height="24" fill="#a8653a" ${E(4)}/>
  ${[0,1,2,3,4,5,6].map(o=>`<path d="M${120+o*280} 150 L${180+o*280} 210" stroke="#a8653a" stroke-width="12" stroke-linecap="round"/><path d="M${120+o*280} 150 L${180+o*280} 210" ${E(2)}/>`).join("")}
  <!-- ladder up to the loft -->
  <g transform="translate(1840 0)"><path d="M-22 150 L-30 440 M22 150 L30 440" stroke="#c99366" stroke-width="10" stroke-linecap="round"/>${[190,240,290,340,390].map(o=>`<path d="M${-22-(o-150)*.028} ${o} H${22+(o-150)*.028}" stroke="#c99366" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
  <!-- rainbow bunting + big rainbow banner -->
  <path d="M0 160 Q${e/2} 176 ${e} 160" fill="none" ${E(2)}/>${n}
  <g transform="translate(${e/2+60} 236)">${nn.map((o,i)=>`<rect x="${-180+i*60}" y="-26" width="60" height="44" fill="${o}"/>`).join("")}<rect x="-180" y="-26" width="360" height="44" rx="4" fill="none" ${E(4)}/>
    <path d="M-180 -26 L-200 -4 L-180 18 M180 -26 L200 -4 L180 18" fill="#ff8fab" ${E(3)}/>
    <text x="0" y="6" text-anchor="middle" font-size="26" font-weight="900" fill="#fff" stroke="${De}" stroke-width="5" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  <!-- round windows with daylight -->
  ${[440,1720].map(o=>`<circle cx="${o}" cy="236" r="34" fill="#c7e8ff" ${E(4)}/><path d="M${o-34} 236 H${o+34} M${o} 202 V270" ${E(3)}/>`).join("")}
  ${s}
  <!-- the big door (back outside) -->
  <rect x="24" y="200" width="206" height="244" rx="10" fill="#b5703f" ${E(4)}/>
  <rect x="38" y="214" width="178" height="230" fill="#c7e8ff"/><path d="M38 360 Q120 330 216 352 V444 H38 Z" fill="#a6e3a0"/><circle cx="180" cy="250" r="16" fill="#ffe066"/>
  <path d="M38 214 H216 V444 M38 214 V444" fill="none" ${E(4)}/>
  <!-- straw floor -->
  <rect x="0" y="438" width="${e}" height="162" fill="#f2d58a"/><path d="M0 440 H${e}" ${E(4)}/>
  ${Array.from({length:70},(o,i)=>{const a=i*137%e,r=470+i*53%120;return`<path d="M${a} ${r} l${14+i%3*4} ${i%2?-4:4}" stroke="#d9a93f" stroke-width="3" stroke-linecap="round"/>`}).join("")}
  <!-- feed station -->
  <g transform="translate(356 0)"><rect x="-70" y="456" width="140" height="34" rx="12" fill="#fff6e6" ${E(3)}/><text x="0" y="480" text-anchor="middle" font-size="16" font-weight="900" fill="${De}" font-family="Nunito, system-ui, sans-serif">FOOD 🥕🍎🌾</text></g>
  ${Sn(1790,590,.8)}${Sn(1700,600,.65)}
  ${[290,660,1330,1590].map(XM).join("")}
  </svg>`}const $o=600,qt="#5a3d5c",ie=(e=4)=>`stroke="${qt}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function Ui(e){const t=Hs[e].seats,n=t<=2?140:t===4?110:100,s=(t-1)/2;return Array.from({length:t},(o,i)=>({x:Hs[e].x+(i-s)*n,y:558-Math.abs(i-s)*8}))}const tp=["#ff7eb3","#ffd43b","#66d9e8","#d0bfff","#fff"],Yt=(e,t,n=1,s="#fff")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -9 L2.2 -2.4 L9 -2.2 L3.4 2.2 L5.4 9 L0 4.6 L-5.4 9 L-3.4 2.2 L-9 -2.2 L-2.2 -2.4 Z" fill="${s}" stroke="${qt}" stroke-width="1.2" stroke-linejoin="round"/>`;function pc(e,t,n,s){const o=`<path d="M36 ${t} Q ${e/2} ${t+n+8} ${e-36} ${t}" fill="none" stroke="${qt}" stroke-width="3"/>`,i=Array.from({length:s},(a,r)=>{const l=s===1?.5:r/(s-1),c=48+l*(e-96),d=t+Math.sin(l*Math.PI)*n,f=tp[r%tp.length];return`<g class="bulb" style="animation-delay:-${r%8*.22}s"><line x1="${c}" y1="${d-16}" x2="${c}" y2="${d-6}" stroke="${qt}" stroke-width="2"/><circle cx="${c}" cy="${d}" r="7.5" fill="${f}" ${ie(2)}/><circle cx="${c-2}" cy="${d-2}" r="2.2" fill="#fff" opacity=".85"/></g>`}).join("");return o+i}const No=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">
  <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".12"/>
  <path d="M-40 10 Q-48 -22 -10 -28 Q10 -46 34 -18 Q50 2 34 18 Q8 32 -24 20 Q-42 16 -40 10 Z" fill="${n}" ${ie(3)}/>
  <path d="M-18 -6 Q-4 -20 14 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <circle cx="16" cy="6" r="4" fill="#fff" opacity=".35"/>
</g>`,np=(e,t,n)=>`<g transform="translate(${e} ${t})">
  <ellipse cx="0" cy="16" rx="28" ry="9" fill="#000" opacity=".12"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="${n}" ${ie(3)}/>
  <ellipse cx="-6" cy="-2" rx="12" ry="7" fill="#fff" opacity=".35"/>
  <path d="M0 -16 V-28" ${ie(3)}/><circle cy="-32" r="6" fill="#ffd43b" ${ie(2)}/>
</g>`;function Fo(e,t,n,s,o,i=""){return`<g class="photoFrame${i}" transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-40" y="-52" width="80" height="104" rx="6" fill="#fff" ${ie(3.5)}/>
    <rect x="-32" y="-44" width="64" height="72" rx="4" fill="${s}"/>
    ${o}
    <rect x="-10" y="-58" width="20" height="10" rx="2" fill="#ffe8a3" opacity=".85" transform="rotate(-8)"/>
  </g>`}function ia(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-28" y="-34" width="56" height="68" rx="3" fill="#fff" ${ie(3)}/>
    <rect x="-22" y="-28" width="44" height="40" fill="${s}"/>
    ${o}
  </g>`}function aa(e,t,n,s){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="36" rx="26" ry="8" fill="#000" opacity=".12"/>
    <path d="M-18 36 L-12 -2 H12 L18 36 Z" fill="${n}" ${ie(3)}/>
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c9a27a" ${ie(2)}/>
    <ellipse cx="-16" cy="-16" rx="16" ry="22" fill="${s}" ${ie(3)} transform="rotate(-18)"/>
    <ellipse cx="16" cy="-18" rx="16" ry="22" fill="${s}" ${ie(3)} transform="rotate(16)"/>
    <ellipse cx="0" cy="-28" rx="14" ry="20" fill="${s}" ${ie(3)}/>
    <circle cx="0" cy="-36" r="6" fill="#ff8ec8" ${ie(2)}/>
  </g>`}function e9(e,t){return`<g transform="translate(${e} ${t})">
    <ellipse cx="28" cy="118" rx="32" ry="8" fill="#000" opacity=".12"/>
    <rect width="56" height="118" rx="10" fill="#e7fbff" ${ie()}/>
    <rect y="52" width="56" height="8" fill="#d0f4ff" ${ie(2)}/>
    <rect x="44" y="18" width="6" height="22" rx="3" fill="#ffd43b" ${ie(2)}/>
    <rect x="44" y="70" width="6" height="28" rx="3" fill="#ffd43b" ${ie(2)}/>
    <rect x="8" y="12" width="28" height="22" rx="4" fill="#fff" ${ie(2)}/>
    <circle cx="16" cy="22" r="4" fill="#ff8ec8"/><circle cx="28" cy="24" r="3" fill="#ffd43b"/>
    <path d="M18 78 C14 72 8 74 12 82 C15 88 18 90 18 90 C18 90 21 88 24 82 C28 74 22 72 18 78 Z" fill="#ff4d94" ${ie(1.5)}/>
  </g>`}function t9(e,t,n){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="6" rx="34" ry="9" fill="#000" opacity=".1"/>
    <path d="M-46 -16 C-50 -86 -26 -108 0 -110 C26 -108 50 -86 46 -16 Z" fill="#fff6fb" ${ie()}/>
    <path d="M-32 -20 C-34 -74 -16 -90 0 -92 C16 -90 34 -74 32 -20 Z" fill="${n}"/>
    <ellipse cx="0" cy="-10" rx="40" ry="16" fill="${n}" ${ie()}/>
    <ellipse cx="-8" cy="-16" rx="14" ry="6" fill="#fff" opacity=".4"/>
    <path d="M-22 -2 L-26 16 M22 -2 L26 16" fill="none" stroke="${qt}" stroke-width="4" stroke-linecap="round"/>
  </g>`}function n9(e){const t=Hs[e],n=t.game==="four"?"Four":"Slay",s=t.game==="four"?"#7ad7ea":e===0?"#ff8ec8":"#e0b0ff",o=t.game==="four"?"#b8f2ff":e===0?"#ffd0e6":"#ead9ff",i=t.seats>=6?250:t.seats>=4?200:150;return`${Ui(e).map(r=>t9(r.x,r.y,o)).join("")}
  <g transform="translate(${t.x} 500)">
    <ellipse cx="0" cy="28" rx="${i+18}" ry="20" fill="#000" opacity=".1"/>
    <rect x="-18" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${ie(3)}/>
    <rect x="4" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${ie(3)}/>
    <ellipse cx="0" cy="-4" rx="${i}" ry="30" fill="${s}" stroke="#ffd43b" stroke-width="6"/>
    <ellipse cx="0" cy="-4" rx="${i-16}" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <ellipse cx="${-i*.25}" cy="-12" rx="${i*.35}" ry="8" fill="#fff" opacity=".28"/>
    <text x="0" y="4" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="${qt}" stroke-width="4" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${n}</text>
  </g>`}const jo=(e,t,n=1,s="#ff4d94")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 4 C-6 -4 -14 -2 -10 6 C-7 12 0 16 0 16 C0 16 7 12 10 6 C14 -2 6 -4 0 4 Z" fill="${s}" stroke="${qt}" stroke-width="1.6" stroke-linejoin="round"/>`;function sp(e,t){const n=Ai,s=Math.max(1,Math.ceil(t));let o="";if(e==="top"){o=`<rect width="${n}" height="${s}" fill="#ffe0f2"/>`;for(let i=s-70,a=0;i>24;i-=150,a++)o+=pc(n,i,a%2?22:16,a%2?26:20);for(let i=0;i<14;i++){const a=90+i*397%(n-180),r=20+i*131%Math.max(20,s-70);o+=Yt(a,r,.55+i%3*.2,i%2?"#fff":"#ffd43b")}}else{o=`<defs><linearGradient id="grFloorExt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e089ab"/><stop offset="1" stop-color="#d27399"/></linearGradient></defs>
  <rect width="${n}" height="${s}" fill="url(#grFloorExt)"/>`;for(let i=46;i<s;i+=64)o+=`<rect y="${i}" width="${n}" height="3" fill="#fff" opacity=".18"/>`}return`<svg class="grExt grExt-${e}" viewBox="0 0 ${n} ${s}" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${o}</svg>`}function s9(){const e=Ai,t=[[120,200],[260,250],[640,210],[900,250],[1180,190],[1560,230],[1860,180],[2100,240],[2420,200],[2520,280]];return`<svg class="grScene" viewBox="0 0 ${e} ${$o}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="${e}" height="${$o}" fill="url(#grWall)"/>
  <rect y="390" width="${e}" height="80" fill="#fff6fb" opacity=".45"/>
  ${Array.from({length:8},(n,s)=>`<rect x="${40+s*330}" y="400" width="280" height="62" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`).join("")}
  <rect y="468" width="${e}" height="132" fill="url(#grFloor)"/>
  <rect y="464" width="${e}" height="12" fill="#ffd43b" ${ie(3)}/>
  ${[720,1500,2150].map((n,s)=>`<ellipse cx="${n}" cy="548" rx="${s===1?210:280}" ry="42" fill="${s===1?"#d8f6ff":s===0?"#ffe0f0":"#f3e8ff"}" stroke="#fff" stroke-width="4" opacity=".8"/>`).join("")}
  ${pc(e,28,22,28)}
  ${pc(e,78,16,18)}
  ${t.map(([n,s],o)=>Yt(n,s,.7+o%3*.28,o%2?"#fff":"#ffd43b")).join("")}

  <g transform="translate(1180 70)">
    <rect x="20" y="20" width="220" height="150" rx="16" fill="url(#grSky)" ${ie()}/>
    <path d="M20 70 H240 M130 20 V170" ${ie(3)}/>
    <circle cx="78" cy="48" r="14" fill="#ffd43b" ${ie(2)}/>
    <path d="M8 36 Q20 90 8 150" fill="#ff8ec8" ${ie(3)}/><path d="M252 36 Q240 90 252 150" fill="#d0bfff" ${ie(3)}/>
  </g>

  <g class="neonSign" transform="translate(560 168)">
    <g class="neonSignArt">
    <rect x="-228" y="-58" width="456" height="108" rx="28" fill="#2b1430" ${ie(5)}/>
    <rect class="neonRing" x="-214" y="-44" width="428" height="80" rx="22" fill="none" stroke="#ff4d94" stroke-width="4"/>
    <path d="M-150 8 C-162 -14 -186 -8 -174 12 C-166 26 -150 36 -150 36 C-150 36 -134 26 -126 12 C-114 -8 -138 -14 -150 8 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="2"/>
    <text x="6" y="16" text-anchor="middle" font-size="40" font-weight="900" fill="#ff7eb3" stroke="#fff6fb" stroke-width="2" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY CLUB</text>
    </g>
  </g>

  ${Fo(500,340,-6,"#ffe0f0",`${jo(0,8,1.4)}${Yt(-18,-16,.7,"#ffd43b")}${Yt(18,-10,.55,"#66d9e8")}`," frameAtHead")}
  ${Fo(270,196,-8,"#ffe0f0",`${jo(0,8,1.4)}${Yt(-18,-16,.7,"#ffd43b")}${Yt(18,-10,.55,"#66d9e8")}`," framePhone")}
  ${Fo(980,240,5,"#e7fbff",`<ellipse cx="0" cy="6" rx="16" ry="12" fill="#fff" ${ie(2)}/><path d="M-6 6 Q0 -8 6 6" fill="none" stroke="${qt}" stroke-width="2"/><path d="M0 18 V28 M-12 24 H12" ${ie(2)}/>`)}
  ${Fo(1680,255,-4,"#fff3c4",`${Yt(0,2,1.5,"#ffd43b")}`)}
  ${Fo(2360,245,6,"#f3e8ff",`${jo(0,4,1.3,"#d0bfff")}`)}
  ${ia(400,300,8,"#fff0f6",jo(0,-4,1.1))}
  ${ia(820,310,-7,"#e7fbff",Yt(0,-6,1,"#66d9e8"))}
  ${ia(1900,300,9,"#fff6e6",Yt(0,-6,1,"#ffd43b"))}
  ${ia(2280,320,-8,"#ffe0f0",jo(0,-4,1))}

  <g class="disco" transform="translate(1288 36)">
    <line y1="0" y2="22" stroke="${qt}" stroke-width="3"/>
    <circle cy="44" r="26" fill="url(#disco)" ${ie(3)}/>
    <path d="M-14 36 L0 56 L14 36 M-8 48 H8" fill="none" stroke="#fff" stroke-width="2.5"/>
    ${Yt(-30,20,.45)}${Yt(32,28,.4,"#ffd43b")}
  </g>

  <g transform="translate(86 292)">
    <rect width="78" height="168" rx="12" fill="#ff8ec8" ${ie()}/>
    <rect x="8" y="10" width="62" height="36" rx="8" fill="#fff6e6" ${ie(2)}/>
    <text x="39" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="${qt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
    <circle cx="62" cy="96" r="5" fill="#ffd43b" ${ie(2)}/>
    <rect x="22" y="118" width="34" height="8" rx="3" fill="#fff" opacity=".45"/>
  </g>

  ${aa(40,400,"#ffd43b","#8ce99a")}
  ${aa(1080,392,"#ff8ec8","#69db7c")}
  ${aa(1600,400,"#d0bfff","#8ce99a")}
  ${aa(2520,396,"#66d9e8","#69db7c")}
  ${e9(200,348)}
  <g transform="translate(2420 360)">
    <rect width="130" height="100" rx="14" fill="#fff6fb" ${ie()}/>
    <rect y="28" width="130" height="10" fill="#ffd0e6" ${ie(2)}/>
    <circle cx="28" cy="64" r="12" fill="#ffd43b" ${ie(2)}/><circle cx="64" cy="66" r="10" fill="#ff8ec8" ${ie(2)}/><rect x="86" y="52" width="28" height="22" rx="6" fill="#66d9e8" ${ie(2)}/>
    <text x="65" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="${qt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">SNACKS</text>
  </g>

  ${No(330,455,"#ff8ec8",1.05)}
  ${No(1120,468,"#d0bfff")}
  ${No(1360,470,"#8ce4f2",.9)}
  ${No(1780,462,"#ffd43b")}
  ${np(1480,500,"#ffb3d9")}
  ${np(2e3,505,"#c9b3ff")}
  ${No(2550,468,"#ff8ec8",.85)}

  ${Hs.map((n,s)=>n9(s)).join("")}
  </svg>`}const o9=`<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${qt}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`,U="#5a3d5c",i9=`<svg viewBox="0 0 120 100"><rect x="0" y="62" width="120" height="38" rx="14" fill="#9fe0aa" stroke="${U}" stroke-width="3"/>
  <path d="M18 70 L30 22 L42 70 M78 70 L90 22 L102 70" fill="none" stroke="#8ecae6" stroke-width="5" stroke-linecap="round"/><path d="M26 22 H94" stroke="#ff8fab" stroke-width="7" stroke-linecap="round"/>
  <path d="M50 22 V54 M66 22 V54" stroke="${U}" stroke-width="2.5"/><rect x="45" y="52" width="26" height="7" rx="3" fill="#ff9f68" stroke="${U}" stroke-width="2.5"/>
  <circle cx="104" cy="14" r="9" fill="#ffd166" stroke="${U}" stroke-width="3"/></svg>`,rg=`<svg viewBox="0 0 120 100"><path d="M20 50 L60 16 L100 50" fill="#ff8fab" stroke="${U}" stroke-width="4" stroke-linejoin="round"/><rect x="28" y="48" width="64" height="44" rx="6" fill="#fff6e6" stroke="${U}" stroke-width="4"/>
  <rect x="52" y="64" width="16" height="28" rx="4" fill="#c9a0dc" stroke="${U}" stroke-width="3"/><rect x="34" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${U}" stroke-width="3"/><rect x="73" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${U}" stroke-width="3"/></svg>`,cd=`<svg viewBox="0 0 120 100"><path d="M40 18 L24 28 L14 46 L30 52 L34 44 V88 H86 V44 L90 52 L106 46 L96 28 L80 18 Q60 34 40 18 Z" fill="#8ecae6" stroke="${U}" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="58" r="7" fill="#fff3b0" stroke="${U}" stroke-width="3"/></svg>`,ue=e=>`<div class="wnArt">${e}</div>`,lg=`<svg viewBox="0 0 120 100"><rect x="16" y="58" width="74" height="24" rx="10" fill="#fff" stroke="${U}" stroke-width="4"/><circle cx="32" cy="70" r="7" fill="#ff8fab" stroke="${U}" stroke-width="3"/><circle cx="52" cy="70" r="7" fill="#ffe066" stroke="${U}" stroke-width="3"/><circle cx="72" cy="70" r="7" fill="#8ecae6" stroke="${U}" stroke-width="3"/><path d="M86 46 l14 -16 8 8 -14 16z" fill="#ffd166" stroke="${U}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="44" width="12" height="24" rx="4" fill="#c9a0dc" stroke="${U}" stroke-width="3"/></svg>`,a9=`<svg viewBox="0 0 120 100">${nn.map((e,t)=>`<path d="M${12+t*6} 84 A${48-t*6} ${48-t*6} 0 0 1 ${108-t*6} 84" fill="none" stroke="${e}" stroke-width="6"/>`).join("")}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${U}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${U}" stroke-width="3"/></svg>`,r9=`<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${$i.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g><g transform="translate(52 22) scale(1.4)">${$i.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g></svg>`,hc=(e,t,n,s)=>`<g transform="translate(${t} ${n}) scale(${s})">${e.replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"")}</g>`,l9=`<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${U}" stroke-width="4"/>${hc(Rc(bt({skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6"})).replace('viewBox="14 2 72 74"','viewBox="0 0 100 160"'),26,12,.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`,c9=`<svg viewBox="0 0 120 100"><rect x="8" y="28" width="104" height="64" rx="16" fill="#fff0f6" stroke="${U}" stroke-width="4"/><path d="M8 40 L60 12 L112 40" fill="#ff6b9a" stroke="${U}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 58 C52 48 40 50 46 60 C50 68 60 74 60 74 C60 74 70 68 74 60 C80 50 68 48 60 58 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  ${[18,34,50,66,82,98].map((e,t)=>`<circle cx="${e}" cy="24" r="4" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" stroke="${U}" stroke-width="1.5"/>`).join("")}</svg>`,d9=`<svg viewBox="0 0 120 100"><rect x="28" y="8" width="64" height="84" rx="12" fill="#fff" stroke="${U}" stroke-width="4"/><rect x="28" y="8" width="64" height="84" rx="12" fill="none" stroke="#ff7eb3" stroke-width="6"/><path d="M48 36 L54 24 L60 34 L68 20 L76 34 L82 24 L88 36 Z" fill="#ffd43b" stroke="${U}" stroke-width="2" stroke-linejoin="round"/><text x="60" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#ff4d94" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY</text></svg>`,f9=`<svg viewBox="0 0 120 100"><rect x="10" y="16" width="100" height="72" rx="14" fill="#fff6fb" stroke="${U}" stroke-width="4"/>
  <path d="M36 58 C28 48 18 50 24 60 C28 68 36 74 36 74 C36 74 44 68 48 60 C54 50 44 48 36 58 Z" fill="#ff4d94" stroke="${U}" stroke-width="2"/>
  <path d="M78 28 L82 40 H94 L84 48 L88 60 L78 52 L68 60 L72 48 L62 40 H74 Z" fill="#66d9e8" stroke="${U}" stroke-width="2"/></svg>`,cg=`<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="22" rx="6" fill="#fff" stroke="${U}" stroke-width="3"/><path d="M6 26 H42 M14 18 V40 M22 18 V40 M30 18 V40 M36 18 V40" stroke="${U}" stroke-width="2.4"/><rect x="4" y="12" width="40" height="8" rx="4" fill="#9ad7f5" stroke="${U}" stroke-width="3"/><ellipse cx="20" cy="32" rx="5" ry="3" fill="#ffe0ec"/><ellipse cx="30" cy="32" rx="5" ry="3" fill="#c9e7ff"/></svg>`,p9=`<svg viewBox="0 0 120 100"><ellipse cx="60" cy="72" rx="50" ry="20" fill="#ffc2d4" stroke="${U}" stroke-width="4"/><ellipse cx="60" cy="72" rx="32" ry="11" fill="#fff" stroke="${U}" stroke-width="3"/><path d="M60 58 C50 46 36 48 42 60 C48 70 60 78 60 78 C60 78 72 70 78 60 C84 48 70 46 60 58 Z" fill="#ff4d94" stroke="${U}" stroke-width="3"/><path d="M22 40 Q28 28 36 36" fill="none" stroke="#7dce8a" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="5" fill="#ffd166" stroke="${U}" stroke-width="2"/></svg>`,h9=`<svg viewBox="0 0 120 100"><path d="M16 50 L60 14 L104 50" fill="#ff8fab" stroke="${U}" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="48" width="68" height="40" rx="10" fill="#fff6ea" stroke="${U}" stroke-width="4"/><path d="M42 88 V60 Q60 44 78 60 V88" fill="#ffe8c7" stroke="${U}" stroke-width="3"/><circle cx="82" cy="64" r="7" fill="#bde0fe" stroke="${U}" stroke-width="3"/><circle cx="80" cy="62" r="2" fill="#fff"/></svg>`,g9=`<svg viewBox="0 0 120 100"><rect x="28" y="38" width="64" height="42" rx="8" fill="#8ecae6" stroke="${U}" stroke-width="4"/><path d="M28 44 L60 68 L92 44" fill="none" stroke="${U}" stroke-width="4"/><path d="M76 30 V16" stroke="${U}" stroke-width="4" stroke-linecap="round"/><path d="M76 16 H96 L90 23 L96 30 H76 Z" fill="#ff6b6b" stroke="${U}" stroke-width="3"/></svg>`,u9=`<svg viewBox="0 0 120 100"><rect x="8" y="32" width="48" height="40" rx="14" fill="#fff3b0" stroke="${U}" stroke-width="4"/><rect x="64" y="32" width="48" height="40" rx="14" fill="#fff" stroke="${U}" stroke-width="4"/><path d="M26 44 L40 52 L26 60 Z" fill="${U}"/><circle cx="88" cy="52" r="6" fill="#ff8fab" stroke="${U}" stroke-width="3"/></svg>`,m9=`<svg viewBox="0 0 120 100"><rect x="16" y="18" width="36" height="58" rx="6" fill="#fff" stroke="${U}" stroke-width="4"/><rect x="62" y="24" width="42" height="52" rx="6" fill="#e7f6ff" stroke="${U}" stroke-width="4"/><circle cx="34" cy="66" r="2.4" fill="${U}"/><circle cx="83" cy="66" r="2.4" fill="${U}"/></svg>`,dg=`<svg viewBox="0 0 120 100"><rect x="28" y="16" width="64" height="72" rx="16" fill="#fff" stroke="${U}" stroke-width="4"/><path d="M40 36 H80 M40 52 H80 M40 68 H80" fill="none" stroke="${U}" stroke-width="5" stroke-linecap="round"/><circle cx="92" cy="24" r="12" fill="#ff6b9a" stroke="${U}" stroke-width="3"/><text x="92" y="29" text-anchor="middle" font-size="14" font-weight="900" fill="#fff" font-family="Nunito, ui-rounded, system-ui, sans-serif">1</text></svg>`,y9=`<svg viewBox="0 0 120 100"><rect x="6" y="10" width="108" height="80" rx="18" fill="#2a2158" stroke="${U}" stroke-width="4"/><circle cx="34" cy="42" r="14" fill="#ffd166" stroke="${U}" stroke-width="3"/><path d="M78 28 a16 16 0 1 0 0 32 a12 12 0 1 1 0 -32z" fill="#fff6e4" stroke="${U}" stroke-width="3"/><circle cx="92" cy="30" r="2" fill="#fff"/><circle cx="70" cy="24" r="1.6" fill="#fff"/><circle cx="100" cy="48" r="1.6" fill="#fff"/></svg>`,b9=`<svg viewBox="0 0 120 100"><circle cx="60" cy="52" r="34" fill="#fff6e4" stroke="${U}" stroke-width="4"/><path d="M60 52 V32 M60 52 L76 60" stroke="${U}" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="52" r="3" fill="${U}"/><path d="M28 22 l4 6 M92 22 l-4 6" stroke="#ffb15c" stroke-width="4" stroke-linecap="round"/></svg>`,fg=`<svg viewBox="0 0 120 100"><path d="M60 18 L72 46 H96 L78 62 L84 90 L60 74 L36 90 L42 62 L24 46 H48 Z" fill="#ffd166" stroke="${U}" stroke-width="4" stroke-linejoin="round"/><path d="M60 48 L28 92 H92 Z" fill="#2f6b4f" stroke="${U}" stroke-width="4" stroke-linejoin="round"/><rect x="52" y="88" width="16" height="8" rx="2" fill="#c44558" stroke="${U}" stroke-width="3"/></svg>`,pg=[{v:10,title:"Winter Cheer!",lines:[{art:ue(fg),text:"The <b>Winter Cheer</b> pack is in your drawer!"}]},{v:9,title:"Everything's tidied into the Menu!",lines:[{art:ue(dg),text:"Everything's tidied into the <b>Menu</b>!"},{art:ue(y9),text:"The world follows the <b>clock</b>: morning, day, golden evening, and night."},{art:ue(b9),text:"Tap the <b>sun</b> and the <b>moon</b>. <b>Auto</b> follows the clock."}]},{v:8,title:"Make your look!",lines:[{art:ue(g9),text:"Leave a <b>letter</b> in a friend's mailbox!"},{art:ue(u9),text:"Tap <b>Play</b> or <b>Decorate</b>!"},{art:ue(cd),text:"<b>Make your look!</b> New hair, clothes, and colors."},{art:ue(m9),text:"Update every iPad to see the <b>new outfits</b>!"}]},{v:7,title:"New Nursery!",lines:[{art:ue(cg),text:"A new <b>Nursery</b> room, with a <b>crib</b> and a rocker!"},{art:ue(p9),text:"The <b>Cozy Cottage</b> furniture pack is in your drawer!"},{art:ue(h9),text:"A <b>dog kennel</b> and a <b>cat tower</b> for your pets!"}]},{v:6,title:"The clubhouse is open!",lines:[{art:ue(c9),text:"A glam <b>clubhouse</b> on the map!"},{art:ue(d9),text:"Play <b>Slay</b> with friends at a table!"},{art:ue(f9),text:"Line up <b>hearts</b> or <b>stars</b>!"}]},{v:5,title:"Your house looks even cozier!",lines:[{art:ue(lg),text:"Wallpaper and floors show their <b>real patterns</b> when you paint!"},{art:ue(wo(0,"sit")),text:"Your cat is <b>big and cozy</b>, just like the toy cat."},{art:ue(rg),text:"Tap <b>home</b> to come back from the map, the park, or the ranch."}]},{v:4,title:"A map of our neighborhood!",lines:[{art:ue(Tc),text:"Tap the <b>map</b> to go anywhere!"},{art:ue(l9),text:"Tap a friend's face to <b>find her</b>."},{art:ue(fc(0)),text:"The petting zoo is inside the <b>barn</b> now!"}]},{v:3,title:"Rainbow Ranch is open!",lines:[{art:ue(a9),text:"Visit <b>Rainbow Ranch</b>!"},{art:ue(fc(1)),text:"Pet and feed animals at the <b>petting zoo</b>."},{art:ue(`<svg viewBox="0 0 160 130">${hc(rd(4),0,0,1)}</svg>`),text:"Ride <b>horses</b> and the <b>rainbow pony</b>!"},{art:ue(r9),text:"Collect <b>eggs</b> from the hens."},{art:ue(`<svg viewBox="0 0 70 90">${hc(ag({seed:"carrot",wet:1},3,0),0,0,1)}</svg>`),text:"Grow carrots and flowers in the <b>garden</b>."}]},{v:2,title:"What's new!",lines:[{art:ue(i9),text:"A new <b>park</b>! Swing, slide and splash with friends."},{art:ue(wo(3,"sit")),text:"Adopt a <b>cat</b>! She lives in your house."},{art:ue(vi(3,"stand")),text:"Adopt a <b>dog</b>! Take it to the park to play fetch."}]}],hg=pg[0].v,gg={v:hg,title:"Welcome to your cozy house!",lines:[{art:ue(rg),text:"Drag furniture into your rooms."},{art:ue(cd),text:"Dress up your friends."},{art:ue(wo(0,"sit")),text:"Adopt a pet from the Menu ☰!"}]},ug=jt("cozy-whatsnew"),k9=1;function w9(){try{const e=Number(localStorage.getItem(ug)),t=["cozy-house","cozy-house-v1","cozy-hood"].some(o=>localStorage.getItem(jt(o))!==null);if(!e&&!t)return{kind:"welcome",entries:[gg]};const n=e||k9,s=pg.filter(o=>o.v>n).slice(0,3);return s.length?{kind:"news",entries:s}:{kind:"none",entries:[]}}catch{return{kind:"none",entries:[]}}}function v9(){try{localStorage.setItem(ug,String(hg))}catch{}}function _9(e,t){const n=e==="welcome"?gg.title:t[0].title,s=t.flatMap(o=>o.lines).slice(0,5);return`<div class="wnBadge">${e==="welcome"?Mh:t[0].v>=10?fg:t[0].v>=9?dg:t[0].v>=8?cd:t[0].v>=7?cg:t[0].v>=6?o9:t[0].v>=5?lg:t[0].v>=4?Tc:t[0].v>=3?jM:z2}</div>
    <h2 class="wnTitle">${n}</h2>
    <div class="wnList ${s.length>3?"many":""}">${s.map((o,i)=>`<div class="wnLine" style="animation-delay:${.15+i*.18}s">${o.art}<p>${o.text}</p></div>`).join("")}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`}const mg="cozy-sky",gc={tint:"#fff6e4",body:"#ffe9f0",pageA:"#ffe0ec",pageB:"#e6ddff",spot:"#fff6fa",fieldA:"#c9f2c7",fieldB:"#8fd18a",win:"#a2d2ff",win2:"#b9e3ff",house:"#fff3b0",mapTint:"#ffffff"},op={tint:"#e7b4cc",body:"#f6dce8",pageA:"#ffd0e6",pageB:"#e6d2f8",spot:"#fff0f6",fieldA:"#f6d0e2",fieldB:"#dcc8f0",win:"#f6c6de",win2:"#e4d0f8",house:"#ffe0ee",mapTint:"#f3c4dc"},ip={tint:"#ffb38a",body:"#ffe4dc",pageA:"#ffe0d6",pageB:"#f0d8ea",spot:"#fff6ee",fieldA:"#d4eec4",fieldB:"#a3cb8a",win:"#ffc48a",win2:"#ffd4b0",house:"#ffc56a",mapTint:"#ffb38a"},ao={tint:"#2a2350",body:"#14182c",pageA:"#1c1748",pageB:"#101832",spot:"#2c2458",fieldA:"#1a2458",fieldB:"#0c1028",win:"#1a245c",win2:"#12183a",house:"#ffe9a0",mapTint:"#102044"},ra=[{m:0,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...ao},{m:5*60,opacity:.7,map:.78,glow:.95,stars:.95,glass:1,phase:"night",...ao},{m:5*60+35,opacity:.42,map:.34,glow:.55,stars:.42,glass:.8,phase:"dawn",...op},{m:6*60+25,opacity:.14,map:.16,glow:.28,stars:.08,glass:.9,phase:"dawn",...op},{m:7*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...gc},{m:16*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...gc},{m:17*60+5,opacity:.08,map:.1,glow:.4,stars:.02,glass:.55,phase:"golden",...ip},{m:18*60+10,opacity:.18,map:.2,glow:.62,stars:.06,glass:.82,phase:"golden",...ip},{m:19*60+5,opacity:.52,map:.68,glow:.9,stars:.55,glass:1,phase:"night",...ao},{m:20*60+10,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...ao},{m:24*60,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...ao}],$9={phase:"day",opacity:0,map:0,glow:0,stars:0,glass:0,...gc},x9={phase:"night",opacity:.7,map:.78,glow:1,stars:1,glass:1,...ao};function ap(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function Gt(e,t,n){const s=ap(e),o=ap(t),i=a=>Math.round(s[a]+(o[a]-s[a])*n).toString(16).padStart(2,"0");return"#"+i(0)+i(1)+i(2)}const Go=(e,t,n)=>e+(t-e)*n;function M9(e){const t=e.getHours()*60+e.getMinutes()+e.getSeconds()/60;let n=0;for(;n<ra.length-2&&t>=ra[n+1].m;)n++;const s=ra[n],o=ra[n+1],i=Math.max(1,o.m-s.m),a=Math.max(0,Math.min(1,(t-s.m)/i));return{phase:a<.5?s.phase:o.phase,opacity:Go(s.opacity,o.opacity,a),map:Go(s.map,o.map,a),glow:Go(s.glow,o.glow,a),stars:Go(s.stars,o.stars,a),glass:Go(s.glass,o.glass,a),tint:Gt(s.tint,o.tint,a),body:Gt(s.body,o.body,a),pageA:Gt(s.pageA,o.pageA,a),pageB:Gt(s.pageB,o.pageB,a),spot:Gt(s.spot,o.spot,a),fieldA:Gt(s.fieldA,o.fieldA,a),fieldB:Gt(s.fieldB,o.fieldB,a),win:Gt(s.win,o.win,a),win2:Gt(s.win2,o.win2,a),house:Gt(s.house,o.house,a),mapTint:Gt(s.mapTint,o.mapTint,a)}}function rp(e,t){return t==="day"?$9:t==="night"?x9:M9(e)}function L9(e){return e==="day"||e==="night"||e==="auto"}function E9(e,t=!1){return t?!0:e==="lamp"||e==="window"||e==="stars"||e==="tv"||/lamp|light|lantern|candle|string-lights|night-light/i.test(e)}function lp(){try{if(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches)return!0}catch{}if(typeof navigator>"u")return!1;const e=navigator.hardwareConcurrency;if(typeof e=="number"&&e>0&&e<=2)return!0;const t=navigator.deviceMemory;return typeof t=="number"&&t>0&&t<=2}const cp={day:"night",night:"auto",auto:"day"},dp={day:"Day",night:"Night",auto:"Auto"},yg='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><g fill="none" stroke="#ffb15c" stroke-width="3" stroke-linecap="round"><path d="M24 7 V13 M24 35 V41 M7 24 H13 M35 24 H41 M12 12 L16 16 M32 32 L36 36 M36 12 L32 16 M16 32 L12 36"/></g></svg>',C9='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 8 a14 14 0 1 0 0 32 a11 11 0 1 1 0 -32z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="3"/><circle cx="14" cy="16" r="1.7" fill="#ffd166"/><circle cx="18" cy="28" r="1.2" fill="#fff"/><circle cx="11" cy="24" r="1" fill="#fff"/></svg>',S9='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="28" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M34 8 a9 9 0 1 0 0 18 a7 7 0 1 1 0 -18z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="14" cy="16" r="1.3" fill="#ffd166"/></svg>',P9={day:yg,night:C9,auto:S9},T9="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)";function R9(){if(document.getElementById("skyInk"))return;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.id="skyInk",e.setAttribute("aria-hidden","true"),e.setAttribute("width","0"),e.setAttribute("height","0"),e.style.cssText="position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none",e.innerHTML=`
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
  `,document.head.appendChild(t)}function B9(e){R9();const t=lp();let n=D9(),s=null,o=rp(new Date,n),i=0;e.innerHTML=`<button type="button" class="skyBtn" aria-label="Day. Tap for night.">${yg}</button>`;const a=e.querySelector("button"),r=g=>{o=g;const m=document.documentElement,k=Math.max(0,Math.min(1,g.glow));m.style.setProperty("--sky-opacity",g.opacity.toFixed(3)),m.style.setProperty("--sky-map-opacity",g.map.toFixed(3)),m.style.setProperty("--sky-glow",k.toFixed(3)),m.style.setProperty("--sky-stars",g.stars.toFixed(3)),m.style.setProperty("--sky-glass",g.glass.toFixed(3)),m.style.setProperty("--sky-tint",g.tint),m.style.setProperty("--sky-body",g.body),m.style.setProperty("--sky-page-a",g.pageA),m.style.setProperty("--sky-page-b",g.pageB),m.style.setProperty("--sky-spot",g.spot),m.style.setProperty("--sky-field-a",g.fieldA),m.style.setProperty("--sky-field-b",g.fieldB),m.style.setProperty("--sky-win",g.win),m.style.setProperty("--sky-win-2",g.win2),m.style.setProperty("--sky-house-win",g.house),m.style.setProperty("--sky-map-tint",g.mapTint),m.style.setProperty("--sky-glow-soft",`rgba(255, 186, 80, ${(k*.72).toFixed(3)})`),m.style.setProperty("--sky-glow-hot",`rgba(255, 220, 120, ${(k*.96).toFixed(3)})`),m.style.setProperty("--sky-glow-clear","rgba(255, 186, 80, 0)"),m.style.setProperty("--sky-glow-wash",`rgba(255, 170, 70, ${(k*.55).toFixed(3)})`),m.style.setProperty("--sky-glow-map",`rgba(255, 196, 110, ${(k*.7).toFixed(3)})`);const $=g.phase==="golden"?.24:g.phase==="dawn"?.22:0,y=g.phase==="golden"?"186, 110, 52":"140, 62, 18";m.style.setProperty("--sky-shadow",`rgba(${y}, ${$.toFixed(3)})`);const u=g.phase==="night"?.55:g.phase==="golden"?.08:g.phase==="dawn"?.16:0;m.style.setProperty("--sky-vig",`rgba(12, 10, 32, ${u.toFixed(3)})`);const w=g.phase==="golden"?"255, 196, 80":g.phase==="dawn"?"255, 214, 230":"255, 246, 214";m.style.setProperty("--sky-orb",`rgba(${w}, ${Math.min(1,g.glass).toFixed(3)})`),m.dataset.sky=g.phase,m.dataset.skyChoice=n,m.classList.toggle("sky-static",t),m.classList.toggle("sky-live",!t),a.innerHTML=P9[n],a.setAttribute("aria-label",`${dp[n]}. Tap for ${dp[cp[n]].toLowerCase()}.`)},l=()=>rp(s??new Date,n),c=()=>r(l()),d=()=>{i&&clearInterval(i),i=window.setInterval(()=>{s||c()},t?6e4:1e3)},f=g=>{n=g;try{localStorage.setItem(jt(mg),n)}catch{}c()};a.addEventListener("click",()=>f(cp[n])),document.documentElement.classList.toggle("sky-static",t),c(),d();const h=document.getElementById("mapWorld");h&&A9(h);try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change",()=>{const m=lp();document.documentElement.classList.toggle("sky-static",m),document.documentElement.classList.toggle("sky-live",!m)})}catch{}try{matchMedia(T9).addEventListener?.("change",()=>_a())}catch{}return window.addEventListener("resize",()=>_a()),new MutationObserver(()=>_a()).observe(document.body,{attributes:!0,attributeFilter:["class"]}),{choice:()=>n,look:()=>o,setChoice(g){f(g)},freeze(g){s=g,c()}}}function _a(){const e=document.getElementById("skyMount"),t=document.getElementById("menuDaySlot");e&&t&&e.parentElement!==t&&t.appendChild(e),t&&(t.hidden=!1),e&&(e.style.left="",e.style.top="")}function A9(e){const t=document.createElement("div");t.className="skyTint",t.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="skyLamps",n.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="skyBits",s.setAttribute("aria-hidden","true"),s.innerHTML='<i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i>';const o=()=>{e.contains(t)||e.appendChild(t),e.contains(n)||e.appendChild(n),e.contains(s)||e.appendChild(s)};o(),new MutationObserver(o).observe(e,{childList:!0})}function D9(){try{const e=localStorage.getItem(jt(mg));if(L9(e))return e}catch{}return"auto"}const ro=[{name:"Pink",fill:"#ff7eb3",ink:"#9d174d"},{name:"Lilac",fill:"#c9b3ff",ink:"#5f3dc4"},{name:"Aqua",fill:"#66d9e8",ink:"#0b7285"},{name:"Gold",fill:"#ffd43b",ink:"#e67700"}],ut="#5a3d5c",wl=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),fp=e=>typeof e=="number"?e:{skip:10,rev:11,d2:12,wild:13,w4:14}[e]??0,pp=e=>typeof e.v=="number"?String(e.v):e.v==="skip"?"✕":e.v==="rev"?"↻":e.v==="d2"?"+2":e.v==="w4"?"+4":"♛",I9=e=>e.v==="skip"?"Nope":e.v==="rev"?"Flip":e.v==="d2"?"+2":e.v==="wild"||e.v==="w4"?"Crown":"",Ms=(e,t,n=1,s="#ffd43b")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -6 L1.4 -1.4 L6 -1 L1.6 1.4 L3 6 L0 3 L-3 6 L-1.6 1.4 L-6 -1 L-1.4 -1.4 Z" fill="${s}" stroke="${ut}" stroke-width="1" stroke-linejoin="round"/>`,$a=(e,t,n=1)=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 1.2 C-2.2 -1.6 -5.2 -0.6 -3.6 2.2 C-2.4 4 0 5.2 0 5.2 C0 5.2 2.4 4 3.6 2.2 C5.2 -0.6 2.2 -1.6 0 1.2 Z" fill="#ff4d94" stroke="${ut}" stroke-width="1"/>`;function H9(e){return e.v==="wild"||e.v==="w4"?`<g transform="translate(14 28)">
      <path d="M4 26 L10 8 L18 16 L24 2 L30 16 L38 8 L44 26 Z" fill="#ffd43b" stroke="${ut}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="4" y="26" width="40" height="8" rx="2" fill="#ffd43b" stroke="${ut}" stroke-width="2.2"/>
      <circle cx="10" cy="8" r="2.4" fill="#ff7eb3"/><circle cx="24" cy="3" r="2.4" fill="#66d9e8"/><circle cx="38" cy="8" r="2.4" fill="#d0bfff"/>
      ${Ms(-2,0,.7)}${Ms(46,4,.65,"#fff")}${Ms(22,-4,.55,"#ff7eb3")}
    </g>${e.v==="w4"?`<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${ut}" font-family="Nunito, ui-rounded, system-ui, sans-serif">+4</text>`:""}`:e.v==="d2"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff" stroke="${ut}" stroke-width="2.4"/>
      ${$a(14,8,1.35)}${$a(32,8,1.35)}
      <path d="M12 26 Q23 34 34 26" fill="none" stroke="${ut}" stroke-width="2.4" stroke-linecap="round"/>
      ${$a(40,22,.8)}
    </g>`:e.v==="rev"?`<g fill="none" stroke="${ut}" stroke-width="3.2" stroke-linecap="round">
      <path d="M16 40 C42 22 54 52 34 60 C16 68 12 46 30 40"/>
      <path d="M14 38 L22 30 L24 42" stroke-linejoin="round"/>
    </g>${Ms(48,28,.85)}${Ms(20,62,.6,"#ff7eb3")}${Ms(50,58,.55,"#66d9e8")}`:e.v==="skip"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff6d8" stroke="${ut}" stroke-width="2.4"/>
      <rect x="8" y="12" width="14" height="9" rx="3" fill="#2b1430"/><rect x="24" y="12" width="14" height="9" rx="3" fill="#2b1430"/>
      <path d="M22 16.5 H24 M5 14 H2 M41 14 H44" stroke="${ut}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 27 Q23 32 34 27" fill="none" stroke="${ut}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`:""}function uc(e){const t=e.c===4,n=t?{fill:"#fff8ee",ink:ut}:ro[e.c]??ro[0],s=typeof e.v=="number",o=I9(e),i=t?'<rect x="2" y="2" width="66" height="96" rx="13" fill="#fff8ee" stroke="#ff7eb3" stroke-width="4"/><rect x="5" y="5" width="60" height="90" rx="11" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="7.5" y="7.5" width="55" height="85" rx="9" fill="none" stroke="#66d9e8" stroke-width="1.6"/><rect x="9.5" y="9.5" width="51" height="81" rx="8" fill="none" stroke="#ffd43b" stroke-width="1.6"/>':`<rect x="2" y="2" width="66" height="96" rx="13" fill="${n.fill}" stroke="${ut}" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`,a='<ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/>',r=`fill="${n.ink}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif"`,l=`<text x="8" y="16" font-size="13" font-weight="900" ${r}>${pp(e)}</text>`+(s?`<text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" ${r}>${pp(e)}</text>`:""),c=s?`<text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="${n.ink}" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${e.v}</text>`:`${H9(e)}${o?`<text x="35" y="92" text-anchor="middle" font-size="12" font-weight="900" ${r}>${o}</text>`:""}`;return`<svg viewBox="0 0 70 100">${i}${a}${l}${c}</svg>`}const O9=[[18,28],[40,28],[29,46],[18,64],[40,64],[29,78]].map(([e,t])=>$a(e,t,.9)).join(""),W9=`<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff4d94" stroke="${ut}" stroke-width="3"/>
  <rect x="7" y="7" width="56" height="86" rx="10" fill="none" stroke="#ffd43b" stroke-width="3"/>
  <rect x="11" y="11" width="48" height="78" rx="8" fill="#ff7eb3"/>
  ${O9}
  <circle cx="35" cy="50" r="14" fill="#fff6fb" stroke="${ut}" stroke-width="2.4"/>
  ${Ms(35,50,1.15,"#ffd43b")}
</svg>`,bg=(e,t)=>{if(t.turn<0||t.drawn!=null&&e.id!==t.drawn)return!1;const n=t.top;return e.c===4||e.c===t.color||e.v===n.v&&n.c!==4};let mc=null,Ct=null,oo=-1,hp=-1;function gp(e,t){mc=e;const n=t.table,s=n.view;if(!s||!s.top){e.innerHTML="";return}n.tb!==hp&&(Ct=null,oo=-1,hp=n.tb);const o=n.you,i=o!==null&&Array.isArray(s.hand)?s.hand.slice():[];Ct!==null&&!i.some(u=>u.id===Ct)&&(Ct=null);const a=s.ev;let r=null;if(a&&a.n!==oo&&oo>=0&&a.k==="play"&&a.card){const u=e.querySelector(`[data-card="${a.card.id}"]`)||e.querySelector(`[data-p="${a.p}"]`);u&&(r=u.getBoundingClientRect())}const c=n.phase==="play"&&s.turn>=0,d=c&&o!==null&&s.turn===o,f=o!==null&&i.length<=2&&i.length>0&&!s.slay?.[o]&&d,h=d&&s.drawn==null&&n.phase==="play",g=d&&s.drawn!=null&&n.phase==="play",m=i.sort((u,w)=>u.c-w.c||fp(u.v)-fp(w.v)),k=c?n.players[s.turn]:"",$=c?d?"Your turn!":`${wl(t.name(k))}'s turn`:"",y=ro[s.color]??ro[0];if(e.innerHTML=`<div class="slayFelt">
    ${$?`<div class="whose ${d?"yours":""}" id="whoseTurn">${$}<span class="slayDir" aria-hidden="true">${s.dir===1?"→":"←"}</span></div>`:""}
    <div class="slayOpps">${n.players.map((u,w)=>w===o?"":`<div class="slayOpp ${s.turn===w?"isTurn":""}" data-p="${w}" data-count="${s.counts?.[w]??0}"><span class="chipFace">${t.face(u)}</span><b>${wl(t.name(u))}</b><span class="cnt">${s.counts?.[w]??0}</span>${t.away(u)?'<i class="awayBadge">away</i>':""}${s.slay?.[w]?"<em>SLAY!</em>":""}</div>`).join("")}</div>
    <div class="slayPile">
      <button type="button" id="slayDeck" class="slayDeck" ${h?"":"disabled"} aria-label="Draw a card">${W9}<span>${s.deck??0}</span></button>
      <div id="slayDiscard" class="slayDiscard" data-top="${s.top.id}">${uc(s.top)}</div>
      <div class="nowColor" data-color="${s.color}" style="background:${y.fill}" aria-label="${y.name}"></div>
    </div>
    ${o===null?'<p class="watching">You are watching</p>':""}
    ${Ct!==null?`<div id="crownPick" class="crownPick"><p>Pick a color for your Crown!</p><div class="crownRow">${ro.map((u,w)=>`<button type="button" data-color="${w}" aria-label="${u.name}" style="background:${u.fill}"><span>${u.name}</span></button>`).join("")}</div></div>`:""}
    <div id="slayHand" class="slayHand ${d?"isTurn":""}">${m.map(u=>{const w=d&&n.phase==="play"&&bg(u,s),_=w?"can":d?"dim":"wait",T=typeof u.v=="number"?ro[u.c].name+" "+u.v:u.v==="wild"?"Crown":u.v==="w4"?"Crown plus 4":u.v==="d2"?"plus 2":u.v==="rev"?"Flip":"Nope";return`<button type="button" class="slayCard ${_} ${u.id===s.drawn?"justDrew":""} ${u.id===Ct?"picked":""}" data-card="${u.id}" data-c="${u.c}" data-v="${u.v}" aria-label="${wl(T)}" ${w?"":"disabled"}>${uc(u)}</button>`}).join("")}</div>
    ${c&&o!==null?`<button type="button" id="slayCall" class="slayCall ${f?"ready":""}" ${f?"":"disabled"}>SLAY!</button>`:""}
    <button type="button" id="slayPass" class="slayPass ${g?"":"hidden"}" ${g?"":"disabled"}>Pass</button>
  </div>`,a&&a.n!==oo){const u=oo;if(oo=a.n,u>=0){if(a.k==="play"&&a.card){const w=e.querySelector("#slayDiscard");w&&U9(r,a.card,w.getBoundingClientRect()),a.card.v==="skip"?t.toast("Nope!"):a.card.v==="rev"?t.toast("Flip!"):a.card.v==="d2"?t.toast("+2!"):a.card.v==="w4"&&t.toast("Crown +4!"),t.sfx.swish()}a.vdrew&&t.toast("Forgot to say SLAY! Draw 2"),a.k==="slay"&&t.sfx.sparkle()}}}function U9(e,t,n){const s=document.createElement("div");s.className="flyCard",s.innerHTML=uc(t);const o=e?.width||70,i=e?.height||100;Object.assign(s.style,{left:(e?.left??innerWidth/2)+"px",top:(e?.top??80)+"px",width:o+"px",height:i+"px"}),document.body.appendChild(s),requestAnimationFrame(()=>{s.style.left=n.left+"px",s.style.top=n.top+"px",s.style.width=Math.max(n.width,70)+"px",s.style.height=Math.max(n.height,96)+"px"}),setTimeout(()=>s.remove(),560)}const V9={id:"slay",render:gp,handle(e,t){const n=t.table.view,s=t.table.you;if(!n||t.table.phase!=="play"||s===null)return!1;const o=n.hand??[];if(e.closest("#slayCall"))return o.length<=2&&o.length>0&&!n.slay?.[s]&&(t.move({k:"slay"}),t.sfx.sparkle()),!0;if(e.closest("#slayDeck"))return n.turn===s&&n.drawn==null&&(Ct=null,t.move({k:"draw"}),t.sfx.click()),!0;if(e.closest("#slayPass"))return n.turn===s&&n.drawn!=null&&(Ct=null,t.move({k:"pass"}),t.sfx.click()),!0;const i=e.closest("#crownPick [data-color]");if(i&&Ct!==null)return t.move({k:"play",id:Ct,color:+i.dataset.color}),Ct=null,t.sfx.sparkle(),!0;const a=e.closest("#slayHand [data-card]");if(!a||a.hasAttribute("disabled"))return!!a;const r=+a.dataset.card,l=o.find(c=>c.id===r);return!l||n.turn!==s||!bg(l,n)||(l.c===4?(Ct=r,t.sfx.pop(),mc&&gp(mc,t)):(Ct=null,t.move({k:"play",id:r}),t.sfx.click())),!0}},kg="#5a3d5c",up=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Q9=`<svg viewBox="0 0 48 48"><path d="M24 42 C8 30 2 22 7 13 C11 6 20 8 24 16 C28 8 37 6 41 13 C46 22 40 30 24 42 Z" fill="#ff4d94" stroke="${kg}" stroke-width="3" stroke-linejoin="round"/><path d="M16 16 Q20 12 22 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`,z9=`<svg viewBox="0 0 48 48"><path d="M24 3 L29 17 H44 L32 26 L37 42 L24 33 L11 42 L16 26 L4 17 H19 Z" fill="#66d9e8" stroke="${kg}" stroke-width="3" stroke-linejoin="round"/><path d="M24 12 L26 18 H22 Z" fill="#fff" opacity=".8"/></svg>`,q9={id:"four",render(e,t){const n=t.table,s=n.view;if(!s||!Array.isArray(s.b)){e.innerHTML="";return}const o=n.you,i=o!==null&&s.turn===o&&n.phase==="play",a=new Set((s.line??[]).map(([k,$])=>k+":"+$)),r=s.last;let l="";for(let k=0;k<7;k++){const $=s.b[k];let y="";for(let w=5;w>=0;w--){const _=w<$.length?$[w]:null,T=a.has(k+":"+w)?" hot":"",A=r&&r.col===k&&r.row===w?" just":"";y+=`<span class="fourCell${_===0?" heart":_===1?" star":""}${T}${A}">${_===0?Q9:_===1?z9:""}</span>`}const u=i&&$.length<6;l+=`<button type="button" class="fourCol" data-col="${k}" ${u?"":"disabled"} aria-label="Drop in column ${k+1}">${y}<span class="dropHint">${u?"▼":""}</span></button>`}const c=n.phase==="play"&&s.turn>=0,d=c?n.players[s.turn]:"",f=c?i?"Your turn!":`${up(t.name(d))}'s turn`:"",h=o===0?"You are <b>pink hearts</b>":o===1?"You are <b>aqua stars</b>":"Pink hearts and aqua stars",g=k=>k===0?"♥":"★",m=n.players.map((k,$)=>`<div class="playerChip ${s.turn===$?"isTurn":""}"><span class="chipFace">${t.face(k)}</span><b>${up(t.name(k))} ${g($)}</b>${t.away(k)?'<i class="awayBadge">away</i>':""}</div>`).join("");e.innerHTML=`<div class="fourPlay">
      ${f?`<div class="whose ${i?"yours":""}" id="whoseTurn">${f}</div>`:""}
      <div class="fourChips">${m}</div>
      <p class="fourLegend">${h}</p>
      <div class="fourBoard" id="fourBoard">${l}</div>
    </div>`},handle(e,t){const n=e.closest(".fourCol");if(!n)return!1;const s=t.table.view,o=t.table.you;if(n.hasAttribute("disabled")||!s||o===null||s.turn!==o||t.table.phase!=="play")return!0;const i=+n.dataset.col;return!Number.isInteger(i)||s.b[i].length>=6||(t.move({col:i}),t.sfx.click()),!0}},mp={slay:V9,four:q9},la=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Z9={notHere:"Come into the clubhouse first!",taken:"Someone is sitting there!",playing:"You are already in this game!",playingElsewhere:"Finish your other game first!",notHost:"Waiting for the host…",needMore:"Play with friends on your street",tooMany:"That table is full!",notPlaying:"The game has not started!",notPlayer:"Sit down to play!",illegal:"You can't play that!",notAway:"She is still here!",tooSoon:"Give her a moment!",notSeated:"You are not at this table!",noMove:"No move to play!"};function N9(e){const t=document.getElementById("tableOverlay");let n=null,s="",o=0;const i=y=>y.away==null?0:y.away+Math.max(0,Date.now()-(y.receivedAt??Date.now())),a=()=>{o&&(clearInterval(o),o=0)},r=y=>{const u=!!y&&y.phase==="play"&&y.away!=null&&n!==null;u&&!o&&(o=window.setInterval(()=>f(),1e3)),u||a()},l=()=>e.hood(),c=()=>{const y=l();return!y||n===null?null:y.tables.get(n)??null},d=y=>{const u=l();return{table:y,me:u.pid,name:w=>u.players.get(w)?.nickname??"friend",face:w=>{const _=u.players.get(w)?.look;return _?Rc(bt(_)):""},move:w=>u.tbl({op:"move",tb:y.tb,m:w}),away:w=>{if(w===u.pid)return!1;const _=u.players.get(w);if(_&&!_.online)return!0;const T=u.presence.get(w);return!T||T.where!=="gameroom"},toast:e.toast,sfx:e.sfx}};t.addEventListener("click",y=>{const u=y.target;if(u.closest("#tblBack")){g(),e.sfx.swish();return}if(u.closest("#tblLeave")){m();return}if(u.closest("#tblStart")){k();return}if(u.closest("#tblNudge")){$();return}const w=c();w&&mp[w.game]?.handle(u,d(w))});function f(){const y=l(),u=c();if(!y||!u){t.classList.add("hidden"),t.innerHTML="",a();return}const w=dh[u.game],_=y.pid,T=u.seats.includes(_),A=u.seats.filter(Boolean).length,H=u.phase==="play"&&u.you!==null&&u.view&&u.view.turn===u.you,F=u.view?.winPid??null;let q="";if(u.phase==="over"){const B=F?y.players.get(F)?.nickname??"Friend":"";u.game==="slay"?q=F?F===_?"You slayed!":`${la(B)} slayed!`:"It's a tie!":q=u.view?.draw||!F?"It's a tie!":F===_?"You got four!":`${la(B)} got four!`;const I=u.tb+":"+u.seq;F===_&&s!==I&&(s=I,e.confetti(),e.sfx.sparkle())}const se=i(u),K=u.phase==="play"&&T&&se>=qm&&u.you!==null&&!!u.view&&u.view.turn!==u.you&&u.view.turn>=0,fe=u.phase!=="play"&&u.host===_&&A>=w.minPlayers&&A<=w.maxPlayers,an=T&&u.phase==="lobby"&&u.host!==_&&A>=w.minPlayers,Wt=T&&u.phase==="lobby"&&A<w.minPlayers;t.classList.remove("hidden"),t.dataset.tb=String(u.tb),t.dataset.phase=u.phase,t.dataset.game=u.game,t.dataset.you=u.you===null?"":String(u.you),t.innerHTML=`<div class="tblCard ${H?"yourTurn":""} game-${u.game}">
      <div class="tblTop"><h2>${la(w.name)}</h2><div class="seatDots">${u.seats.map(B=>`<i class="${B?"on":""} ${B===_?"me":""}"></i>`).join("")}</div></div>
      ${q?`<div class="winWrap"><div class="winBanner" id="winBanner">${q}</div></div>`:""}
      <div id="tblStage"></div>
      <div class="tblBar">
        ${fe?'<button type="button" id="tblStart">Start</button>':""}
        ${an?'<p class="tblWait">Waiting for the host…</p>':""}
        ${K?'<button type="button" id="tblNudge">Play for her</button>':""}
        <button type="button" id="tblBack">Back to room</button>
        <button type="button" id="tblLeave">Leave table</button>
      </div>
      ${Wt?'<p class="tblWait" id="needFriend">Play with friends on your street</p>':""}
    </div>`;const Ze=t.querySelector("#tblStage");u.phase==="lobby"||!u.view?Ze.innerHTML=h(u,y,_):mp[u.game]?.render(Ze,d(u)),r(u)}function h(y,u,w){return`<div class="lobby">${y.seats.map((_,T)=>`<div class="lobbySeat ${_?"filled":""} ${_===w?"me":""}">
      <span>${T+1}</span><b>${_?la(u.players.get(_)?.nickname??"friend"):"Empty"}</b>
      ${_&&_===y.host?"<i>host</i>":""}${_===w?"<i>you</i>":""}
    </div>`).join("")}</div>`}function g(){n=null,a(),t.classList.add("hidden"),t.innerHTML=""}function m(){const y=l(),u=c();y&&u&&u.seats.includes(y.pid)&&y.tbl({op:"leave",tb:u.tb}),e.sfx.click(),g()}function k(){const y=l(),u=c();y&&u&&(y.tbl({op:"start",tb:u.tb}),e.sfx.sparkle())}function $(){const y=l(),u=c();y&&u&&(y.tbl({op:"nudge",tb:u.tb}),e.sfx.click())}return{open(y){n=y,f()},close:g,refresh:f,fail(y,u){e.toast(Z9[u]||"Try that again!"),e.sfx.pop(),n===y&&f()},isOpen:()=>n}}const wg="/kids-house-game/assets/rug-zTS04c1f.webp",F9=Object.freeze(Object.defineProperty({__proto__:null,default:wg},Symbol.toStringTag,{value:"Module"})),vg="/kids-house-game/assets/pack~bean-bag-m3eBc9mA.webp",j9=Object.freeze(Object.defineProperty({__proto__:null,default:vg},Symbol.toStringTag,{value:"Module"})),_g="/kids-house-game/assets/pack~sv-bean-bag-TrtltuSt.webp",G9=Object.freeze(Object.defineProperty({__proto__:null,default:_g},Symbol.toStringTag,{value:"Module"})),Y9=120,K9=192,X9=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let te=null,es=null,Cn=null,yp=!1;const $g=960,J9=e=>!!e&&!document.body.classList.contains("phone")&&e.clientHeight>e.clientWidth+40,fs=()=>{const e=document.getElementById("gameroom"),t=e?.clientHeight||600;return J9(e)?Math.min(t/$o,e.clientWidth/$g):t/$o},xa=()=>es;function Ro(){const e=te?.hood();if(!e)return null;for(const[t,n]of e.tables){const s=n.seats.indexOf(e.pid);if(s>=0){const o=Ui(Number(t))[s];return{tb:Number(t),seat:s,x:o.x,y:o.y}}}return null}function eL(){const e=te?.hood();if(!e)return!1;for(const[t,n]of e.players)if(t!==e.pid&&n.online)return!0;return!1}function tL(e){if(te=e,es=N9({hood:e.hood,toast:e.toast,confetti:()=>Eh(),sfx:e.sfx}),yp)return es;yp=!0;const t=document.getElementById("grWorld");return t.addEventListener("click",sL),t.addEventListener("pointerdown",n=>{n.target.closest(".grChair, .grTable, .grDoor, .pet")&&n.stopPropagation()}),es}function dd(){if(!te)return;const e=fs(),t=document.getElementById("grWorld"),n=l=>l*e+"px";t.style.width=Ai*e+"px",t.style.height=$o*e+"px",t.style.setProperty("--sc",String(e));const s=document.getElementById("gameroom"),o=(s?.clientHeight||0)-6-$o*e,i=o>1?Math.round(o*.55):0,a=o>1?Math.ceil(o-i)+6:0;t.style.marginTop=i?i+"px":"";let r=s9();i&&(r+=`<div class="grExtWrap" style="top:${-i}px;height:${i}px">${sp("top",i/e)}</div>`),s&&(s.style.background=i?"linear-gradient(180deg, #ffe0f2 0 50%, #d27399 50%)":""),a&&(r+=`<div class="grExtWrap" style="top:100%;height:${a}px">${sp("bottom",a/e)}${rL(e,a,s?.clientWidth||0)}</div>`),r+=`<button class="grDoor" data-gr="map" aria-label="Back to the map" style="left:${n(78)};top:${n(268)};width:${n(86)};height:${n(170)}"></button>`,Hs.forEach((l,c)=>{const d=l.seats>=6?560:l.seats>=4?440:340;r+=`<button class="grTable" data-tb="${c}" aria-label="${dh[l.game].name} table" style="left:${n(l.x-d/2)};top:${n(456)};width:${n(d)};height:${n(70)}"></button>`,Ui(c).forEach((f,h)=>{const g=76*e,m=72*e,k=Math.max(g,44),$=Math.max(m,44),y=(f.x-38)*e-(k-g)/2,u=(f.y-16)*e-($-m)/2;r+=`<button class="grChair" data-tb="${c}" data-seat="${h}" aria-label="Empty chair" style="left:${y}px;top:${u}px;width:${k}px;height:${$}px"></button>`})}),r+='<div class="savatars" id="gavatars"></div>',t.innerHTML=r,pi()}function pi(){if(!te||te.view()!=="gameroom")return;const e=document.getElementById("gavatars");if(!e)return;const t=fs(),n=new Set;for(const i of nL()){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&aL(a));const r=JSON.stringify(i.look)+i.name+(i.away?":away":"");if(a.dataset.look!==r){const h=a.querySelector(".bubble");a.innerHTML=`<div class="inner">${bt(i.look)}</div>${i.name?`<div class="nametag">${X9(i.name)}${i.away?'<i class="awayBadge">away</i>':""}</div>`:""}`,h&&a.appendChild(h),a.dataset.look=r}const l=(Vs[i.look.size]??1)*t*.95,c=Y9*l,d=K9*l,f=i.seated?i.y-8:i.y;a.style.left=i.x*t-c/2+"px",a.style.top=f*t-d+"px",a.style.width=c+"px",a.style.height=d+"px",a.style.zIndex=String(100+Math.round(i.y)),a.classList.toggle("flipped",i.flip),a.classList.toggle("away",i.away),a.classList.toggle("seated",i.seated),Oi(a,i.look,i.mine)}e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),te.refreshNear();const s=te.hood();document.querySelectorAll("#grWorld .grChair").forEach(i=>{const a=s?.tables.get(+i.dataset.tb)?.seats[+i.dataset.seat];i.classList.toggle("taken",!!a);const r=a?s.players.get(a)?.nickname:"";i.setAttribute("aria-label",r?r+" is sitting":"Empty chair")});const o=document.getElementById("grSolo");o&&o.classList.toggle("hidden",eL())}function nL(){const e=[],t=te.hood();if(t){const n=new Map;for(const[a,r]of t.tables)r.seats.forEach((l,c)=>{l&&n.set(l,Ui(Number(a))[c])});const s=[...t.presence.entries()],o=te.myPres();o&&s.push([t.pid,o]);const i=new Set;for(const[a,r]of s){if(r.where!=="gameroom")continue;const l=t.players.get(a);if(!l)continue;i.add(a);const c=n.get(a);e.push({key:a,look:l.look,name:l.nickname,x:c?.x??r.x,y:c?.y??r.y,flip:r.flip,mine:a===t.pid,away:!1,seated:!!c})}for(const[a,r]of n){if(i.has(a))continue;const l=t.players.get(a);l&&e.push({key:a,look:l.look,name:l.nickname,x:r.x,y:r.y,flip:!1,mine:!1,away:!0,seated:!0})}}else{const n=te.solo();if(n?.where==="gameroom"){const s=te.soloLook();e.push({key:"solo",look:s.look,name:"",x:n.x,y:n.y,flip:n.flip,mine:!0,away:!1,seated:!1})}}return e}function sL(e){if(!te||te.view()!=="gameroom")return;const t=e.target,n=t.closest(".savatar");if(n){const c=te.hood(),d=n.dataset.pid;if(c&&d){for(const[f,h]of c.tables)if(h.seats.includes(d)){es?.open(Number(f));return}}return}if(t.closest('[data-gr="map"]')){te.goMap();return}const s=t.closest(".grChair");if(s){oL(+s.dataset.tb,+s.dataset.seat);return}const o=t.closest(".grTable");if(o){if(!te.hood()){xg();return}es?.open(+o.dataset.tb),te.sfx.click();return}if(t.closest(".pet")||Ro())return;const i=document.getElementById("grWorld").getBoundingClientRect(),a=fs(),r=(e.clientX-i.left)/a,l=(e.clientY-i.top)/a;l<430||(Cn={x:Math.max(60,Math.min(Ai-60,r)),y:Math.max(470,Math.min(590,l))})}function oL(e,t){if(!te)return;const n=te.hood();if(!n){xg();return}const s=n.tables.get(e)?.seats[t];if(s&&s!==n.pid){te.toast((n.players.get(s)?.nickname??"Someone")+" is sitting there!"),te.sfx.pop(),es?.open(e);return}Cn=null,n.tbl({op:"sit",tb:e,seat:t});const o=Ui(e)[t];te.setPres({where:"gameroom",x:o.x,y:Math.max(470,Math.min(590,o.y)),flip:!1}),es?.open(e),te.sfx.click()}function xg(){if(!te)return;const e=document.getElementById("grSolo");e&&(e.classList.remove("hidden"),e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),te.toast("Play with friends on your street"),te.sfx.pop()}function iL(e){if(!te||te.view()!=="gameroom"||!Cn)return;if(Ro()){Cn=null;return}const t=te.hood()?te.myPres():te.solo();if(!t||t.where!=="gameroom"){Cn=null;return}const n=Cn.x-t.x,s=Cn.y-t.y,o=Math.hypot(n,s);if(o<4){Cn=null;return}const i=Math.min(o,300*e),a={where:"gameroom",x:t.x+n/o*i,y:t.y+s/o*i,flip:Math.abs(n)>2?n<0:t.flip};te.setPres(a);const r=fs(),l=document.getElementById("grScroll"),c=a.x*r-l.scrollLeft;(c<l.clientWidth*.22||c>l.clientWidth*.78)&&(l.scrollLeft=a.x*r-l.clientWidth/2)}function aL(e){e.addEventListener("pointerdown",t=>{if(!te||Ro())return;const n=te.hood()?te.myPres():te.solo();if(!n||n.where!=="gameroom")return;t.preventDefault(),t.stopPropagation(),Cn=null;const s=fs(),o=document.getElementById("grWorld"),i=document.getElementById("grScroll"),a=y=>{const u=o.getBoundingClientRect();return{x:(y.clientX-u.left)/s,y:(y.clientY-u.top)/s}},r=a(t),l={x:n.x-r.x,y:n.y-r.y};let c=t,d=0,f=n.x,h=!1;const g=y=>{const u=te.hood()?te.myPres():te.solo();if(!u||u.where!=="gameroom")return;const w=a(y),_=Math.max(60,Math.min(Ai-60,w.x+l.x)),T=Math.max(470,Math.min(590,w.y+l.y));if(!h&&Math.hypot(_-u.x,T-u.y)<6)return;h=!0;const A=Math.abs(_-f)>3?_<f:u.flip;Math.abs(_-f)>3&&(f=_),te.setPres({where:"gameroom",x:_,y:T,flip:A})},m=()=>{const y=i.getBoundingClientRect(),u=c.clientX<y.left+70?-12:c.clientX>y.right-70?12:0;u&&h&&(i.scrollLeft+=u,g(c)),d=requestAnimationFrame(m)};d=requestAnimationFrame(m),e.classList.add("lifted"),te.sfx.pick();const k=y=>{y.pointerId===t.pointerId&&(c=y,g(y))},$=y=>{y.pointerId===t.pointerId&&(cancelAnimationFrame(d),window.removeEventListener("pointermove",k),window.removeEventListener("pointerup",$),e.classList.remove("lifted"),h&&te.sfx.drop())};window.addEventListener("pointermove",k),window.addEventListener("pointerup",$)})}function rL(e,t,n){if(t<120)return"";const s=n?Math.min(Hs[0].x*e,n/2):Hs[0].x*e,o=Math.min(560*e*1.2,t*1.7),i=o*306/960,a=Math.max(8,(t-i)*.45),r=o*.26,l=r*.78,c=(d,f,h,g,m=!1)=>`<img class="grDecor" src="${d}" alt="" aria-hidden="true" draggable="false" style="left:${f}px;top:${h}px;width:${g}px${m?";transform:scaleX(-1)":""}">`;return`<div class="grDecor grRug" aria-hidden="true" style="left:${s-o/2}px;top:${a}px;width:${o}px;height:${i}px"><img src="${wg}" alt="" draggable="false" style="width:${o}px;margin-top:${-o*634/960}px"></div>`+c(vg,s-o/2-r*.35,a+i*.45-l*.6,r)+c(_g,s+o/2-r*.65,a+i*.45-l*.6,r*1.02,!0)}const Jo=w9(),J=lh();J.born&&typeof navigator<"u"&&!navigator.webdriver&&!J.get().baby&&J.dispatch({type:"baby/meet",now:Date.now()});let Ie=J;const Mg=[],bp=new WeakSet;function Lg(e){bp.has(e)||(bp.add(e),e.subscribe((t,n)=>{Ie===e&&Mg.forEach(s=>s(t,n))}))}Lg(J);const C={get:()=>Ie.get(),dispatch(e){Ie.dispatch(e)},subscribe:e=>{Mg.push(e)}},me=Rt,Qe=Pn,xo=390;let ce=1e3;const Qs=()=>Math.max(0,me-ce),Eg=375,Cg=(e,t)=>e.wall?Math.min(t,Eg):t,Sg=12,Ys=(e,t)=>e.wall?t:Math.min(t,Qe-Sg),ps=120,yn=192,fd=[{id:"living",name:"Living Room",color:"#ff8fab"},{id:"bedroom",name:"Bedroom",color:"#b388d6"},{id:"kitchen",name:"Kitchen",color:"#5cc985"},{id:"salon",name:"Salon",color:"#f0a0d8"},{id:"nursery",name:"Nursery",color:"#9ad7f5"},{id:"bathroom",name:"Bathroom",color:"#7ec8d6"}],Pg=e=>fd.find(t=>t.id===e)?.color??"#ccc",pd=tx();Ix(wn,Me);const Mo=[{id:"__people",name:"People",icon:"",kind:"people"},...["furniture","decor","plants","food","pets"].map((e,t)=>({id:e,name:e,icon:["armchair","balloon","flowers","donut","cat"][t],kind:"cat"}))];Mo.push({id:"secrets",name:"Secrets",icon:"egg:chloe-starlamp",kind:"cat"});for(const e of wn)Mo.some(t=>t.kind==="cat"&&t.id===e.cat)||Mo.push({id:e.cat,name:e.cat,icon:e.kind,kind:"cat"});for(const e of wn)e.pack&&!Gh(e)&&!Mo.some(t=>t.id==="pack:"+e.pack)&&Mo.push({id:"pack:"+e.pack,name:Ch(e.pack),icon:e.kind,kind:"pack"});const vl=e=>wn.filter(t=>wM(t,e,C.get().currentRoom,gd==="all",Dr())),lL=["#ffd6e0","#d9ccff","#cdf3dc","#cfe8ff","#fff1b8","#ffe0c7","#ffffff","#f6c1ff"],cL=["#e8b98a","#f2d0a4","#c99366","#ffe7a8","#bfe3d0","#d6d6f5","#ffc8dd","#9fb4c7"],Vt={paint:'<svg viewBox="0 0 48 48"><path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M28 12 L34 6 L42 14 L36 20" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/></svg>',shirt:'<svg viewBox="0 0 48 48"><path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',soundOn:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 17 Q37 24 32 31 M36 12 Q45 24 36 36" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',soundOff:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ddd" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M33 19 L43 29 M43 19 L33 29" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',flip:'<svg viewBox="0 0 48 48"><path d="M24 6 V42" stroke="#5a3d5c" stroke-width="3" stroke-dasharray="4 4"/><path d="M18 12 L6 36 H18 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M30 12 L42 36 H30 Z" fill="#fff" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',front:'<svg viewBox="0 0 48 48"><rect x="6" y="6" width="22" height="22" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="18" y="18" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',back:'<svg viewBox="0 0 48 48"><rect x="18" y="18" width="24" height="24" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="22" height="22" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',trash:'<svg viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="28" rx="5" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><rect x="8" y="9" width="32" height="7" rx="3.5" fill="#ffadad" stroke="#5a3d5c" stroke-width="3"/><path d="M20 21 V35 M28 21 V35" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',smaller:'<svg viewBox="0 0 48 48"><rect x="16" y="16" width="16" height="16" rx="4" fill="#bde0fe" stroke="#5a3d5c" stroke-width="3"/><path d="M8 24 H14 M34 24 H40" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',bigger:'<svg viewBox="0 0 48 48"><rect x="12" y="12" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M24 6 V11 M24 37 V42 M6 24 H11 M37 24 H42" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>'},dL='<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',fL='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 15 H37 M11 24 H37 M11 33 H37" fill="none" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',pL='<svg class="mailGlyph" viewBox="0 0 48 48" aria-hidden="true"><g transform="translate(0 2)"><rect x="6" y="14" width="36" height="24" rx="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/><path d="M6 16 L24 30 L42 16" fill="none" stroke="#5a3d5c" stroke-width="3"/><path d="M34 12 V6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M34 6 H44 L40 10 L44 14 H34 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2"/></g></svg>',Tg='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',hL=document.getElementById("app");hL.innerHTML=`
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${Pt.chat}<span class="badge" id="chatBadge"></span></button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${Pt.home}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${q2}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${GM}</button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${Tc}<span class="badge" id="mapBadge"></span></button>
    <button class="round" id="btnMenu" aria-label="Menu" aria-expanded="false">${fL}<span class="badge" id="menuBadge"></span></button>
  </div>
</div>
<div class="menuPop hidden" id="menuPop">
  <div class="menuCard" role="dialog" aria-label="Menu">
    <button type="button" class="close" id="menuClose" aria-label="Close">✕</button>
    <p class="menuGroup">My stuff</p>
    <button type="button" class="menuRow photoRow" id="btnPhoto" aria-label="Take a photo"><span class="mIco">📸</span><span class="mLabel">Take a photo</span></button>
    <button type="button" class="menuRow" id="btnPets" aria-label="Pets"><span class="mIco">${Mh}</span><span class="mLabel">Pets</span></button>
    <button type="button" class="menuRow" id="btnDress" aria-label="Characters"><span class="mIco">${Vt.shirt}</span><span class="mLabel">Characters</span></button>
    <button type="button" class="menuRow" id="btnPaint" aria-label="Colors"><span class="mIco">${Vt.paint}</span><span class="mLabel">Wall &amp; floor colors</span></button>
    <button type="button" class="menuRow" id="secrets" aria-label="Surprises, 0 of 5"><span class="mIco secGift">🎁</span><span class="mLabel"><span class="secWord">Surprises </span><span class="secCount">0/5</span></span></button>
    <p class="menuGroup houseGroup">House</p>
    <button type="button" class="menuRow lockRow" id="btnLock" aria-label="Lock house"><span class="mIco" id="lockIco">${Pt.lockOff}</span><span class="mLabel" id="lockLabel">Lock my house</span></button>
    <button type="button" class="menuRow mailRow" id="btnMail" aria-label="Mailbox"><span class="mIco">${pL}</span><span class="mLabel">Mailbox</span><span class="menuNew" id="mailNew"></span></button>
    <!-- Day / Night / Auto. The clock stays on Auto until she taps. -->
    <div id="menuDaySlot" class="menuSlot" hidden></div>
    <p class="menuGroup streetGroup">Street</p>
    <button type="button" class="menuRow grownRow" id="btnParent" aria-label="Grown-ups"><span class="mIco">${Pt.shield}</span><span class="mLabel">Grown-ups</span></button>
    <button type="button" class="menuRow soloLeave" id="btnSolo" aria-label="Play in my own house"><span class="mIco">${Pt.solo}</span><span class="mLabel">Play in my own house</span></button>
    <button type="button" class="menuRow friendRow" id="btnHood" aria-label="Friends"><span class="mIco">${Pt.street}</span><span class="mLabel">Friends</span></button>
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
        <button data-a="smaller" aria-label="Smaller">${Vt.smaller}</button><button data-a="bigger" aria-label="Bigger">${Vt.bigger}</button><button data-a="flip" aria-label="Flip">${Vt.flip}</button><button data-a="front" aria-label="Bring forward">${Vt.front}</button><button data-a="back" aria-label="Send back">${Vt.back}</button><button data-a="delete" class="danger" aria-label="Put away">${Vt.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <div class="bin" id="bin">${Vt.trash}</div>
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
<div class="street mapView hidden" id="street"><div class="mapSky">${a0}</div><div class="mapMeadow">${r0}</div><button class="mailCue" id="mailCue" type="button">You've got mail!</button><div class="mapWorld" id="mapWorld"></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>
<div id="toastLane"></div>
<div class="phoneNote" id="phoneNote"><div class="card"><h2>Turn sideways</h2><p>Turn your phone sideways for more room to play!</p><button class="phoneOk" id="phoneOk" type="button">OK!</button></div></div>
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>
<div id="skyMount"></div>`;const M=e=>document.getElementById(e),j=M("stage"),hd=M("world"),ee=M("layer"),xe=M("toolbar"),Ma=M("bin");let ot=null,Te=C.get().characters[0]?.id??null,St="furniture",gd="",yc="",gL=Date.now()%1e5;const bc=e=>`${e}-${Date.now().toString(36)}${(++gL).toString(36)}${Math.random().toString(36).slice(2,5)}`,dt="__me";let b=null,S="house",Oe=!1,Pe="",Xa=new Map,Rg=!1,Bg=()=>{};const Re=m2(M("modeToggle"),{ownHouse:()=>!b||!Pe||Pe===b.myHouseId(),onChange:()=>{Rg&&(Bo.matches?rs():hs()),Bg()}}),La=c2({send:(e,t,n,s)=>b?.sendMail(e,t,n,s),read:(e,t)=>b?.readMail(e,t),drop:(e,t)=>b?.dropMail(e,t),houseOf:e=>[...b?.players.values()??[]].find(t=>t.pid===e)?.houseId??"",houseName:e=>b?.houses.get(e)?.meta.name??"My House",lettersOf:e=>b?.houses.get(e)?.confirmed.mailbox?.letters??[],mine:e=>!!b&&b.houses.get(e)?.meta.ownerId===b.pid,toast:N,openOwn:()=>{const e=b?.myHouseId();e&&Pd(e)},freeType:()=>!b||bh(b.settings)});Re.sync(!0);const Ps=new Map,Ja={};let le=Eo,mo=0;Rg=!0;let xi=null;const Wr=()=>{cancelAnimationFrame(mo),xi=null},ud=e=>Math.max(0,Math.min(Qs(),e));function Fe(e){le=ud(e),Ja[C.get().currentRoom]=le,hd.style.transform=`translate3d(${-le}px,0,0)`,M("nudgeL").classList.toggle("off",le<=1),M("nudgeR").classList.toggle("off",le>=Qs()-1);const t=M("mmView");t.style.left=le/me*100+"%",t.style.width=ce/me*100+"%",ot&&eu(C.get())}function Ur(e){cancelAnimationFrame(mo),e=ud(e),xi=e;const t=()=>{const n=e-le;if(Math.abs(n)<.5){Fe(e),xi=null;return}Fe(le+n*.18),mo=requestAnimationFrame(t)};mo=requestAnimationFrame(t)}const yt=()=>j.getBoundingClientRect().width/ce,uL="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)",Bo=window.matchMedia(uL);function mL(){const e=Bo.matches;document.body.classList.toggle("phone",e),document.body.classList.toggle("phone-portrait",e&&window.matchMedia("(orientation: portrait)").matches);const t=M("stageWrap");for(const n of[M("nudgeL"),M("nudgeR")]){const s=e?t:j;n.parentElement!==s&&s.appendChild(n)}}function Ag(){const e=document.querySelector(".top");if(!e)return;const t=e.getBoundingClientRect(),n=document.body.classList.contains("phone")?t.bottom:t.height;document.documentElement.style.setProperty("--chrome-h",Math.ceil(n)+"px"),Dg()}function Dg(){const e=document.querySelector(".top");if(!e)return;const t=Math.ceil(e.getBoundingClientRect().bottom+16)+"px",n=document.getElementById("mailCue");n&&(n.style.top=t);const s=document.getElementById("toastLane");s&&(s.style.top=t)}function yL(){const e=document.documentElement,t=document.getElementById("app");if(!(document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait"))){t.style.top="",t.style.height="",t.style.bottom="",e.style.removeProperty("--vvh"),e.style.removeProperty("--vvt");return}const s=window.visualViewport,o=Math.round(s?s.height:window.innerHeight),i=Math.round(s?s.offsetTop:0);e.style.setProperty("--vvh",o+"px"),e.style.setProperty("--vvt",i+"px"),t.style.top=i+"px",t.style.height=o+"px",t.style.bottom="auto"}function hs(){mL(),yL(),Ag();const e=M("stageWrap"),t=document.body.classList.contains("phone"),n=e.clientWidth,s=e.clientHeight,o=Math.max(1,s-bd());if(t?s>n*.85:s>n+40){const r=n/Math.max(1,s);ce=Math.round(Math.max(480,Math.min(860,Qe*r)))}else if(t){const r=n/Math.max(1,o);ce=Math.round(Math.max(480,Math.min(me,Qe*r)))}else ce=1e3;ce=md(ce),j.style.width=ce+"px",j.style.height=Qe+"px";const a=Math.min(n/ce,o/Qe);if(Vg(a),j.style.setProperty("--yard-sc",String(a||1)),t&&j.style.setProperty("--fit",String(yt())),Ig(),le>Qs())Fe(le);else{const r=M("mmView");r.style.left=le/me*100+"%",r.style.width=ce/me*100+"%"}it(),!t&&S==="house"&&zs(!1),EL(),S==="ranch"&&requestAnimationFrame(Pc),S==="gameroom"&&requestAnimationFrame(Gu),Ao(),t&&S==="ranch"&&eC(),Hg(),Re.hint(),Xr(),Gn()}function Ig(){const e=M("stageWrap"),t=document.body.classList.contains("phone")&&S==="house";for(const n of[M("nudgeL"),M("nudgeR")]){if(!t||n.parentElement!==e){n.style.marginTop="",n.style.left="",n.style.right="",n.style.top="";continue}const s=j.getBoundingClientRect(),o=e.getBoundingClientRect(),i=(s.top+s.bottom)/2-o.top;n.style.top=i+"px",n.style.marginTop=-n.offsetHeight/2+"px",n.style.left="",n.style.right=""}}function Hg(){document.body.classList.remove("secrets-chrome"),M("secrets")?.classList.remove("compact")}function it(e=0){if(!document.body.classList.contains("phone"))return;if(S==="house"){Og();return}const t=S==="park"?"parkScroll":S==="ranch"?"ranchScroll":S==="gameroom"?"grScroll":"";if(!t)return;const n=document.getElementById(t);if(!n||n.clientWidth<20){e<8&&requestAnimationFrame(()=>it(e+1));return}const s=n.querySelector(".savatar.mine")??n.querySelector(".savatar");if(!s){e<8&&requestAnimationFrame(()=>it(e+1));return}kL(n,[s,...s.querySelectorAll(".nametag")])&&e<8?requestAnimationFrame(()=>it(e+1)):bL()}function bL(){Jr()&&(S==="gameroom"&&ju([...document.querySelectorAll(".neonSignArt")],document.getElementById("grScroll")),S==="ranch"&&!Oe&&(Yu(),Zd()))}function kL(e,t){const s=e.getBoundingClientRect(),o=Math.min(s.right,window.innerWidth)-8,i=Math.max(s.left,0)+8;let a=0,r=0;for(const c of t){const d=c.getBoundingClientRect();d.width<2||d.height<2||(a=Math.max(a,d.right-o),r=Math.max(r,i-d.left))}if(a<=1&&r<=1)return!1;const l=e.scrollLeft;return a>1&&r>1?e.scrollLeft-=r:a>1?e.scrollLeft+=a:e.scrollLeft-=r,Math.abs(e.scrollLeft-l)>.5}function Og(){zs(!1)}function kp(e){let t=0;for(const n of e){const s=Me[n.kind];!s||s.wall||(t=Math.max(t,s.w*Ye(n)))}return t}function wL(){if(S!=="house"||!Re.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return 0;const e=C.get().rooms,t=C.get().currentRoom;let n=kp(e[t]?.items??[]);if(t==="backyard")for(const o of Object.keys(e))o!=="backyard"&&(n=Math.max(n,kp(e[o].items)));if(n<40)return 0;const s=document.body.classList.contains("phone-portrait")?.7:.55;return Math.min(me,Math.ceil(n/s))}function md(e){const t=wL();return t&&e<t?t:e}function vL(){const e=md(ce);if(e<=ce+.5)return;ce=e,j.style.width=ce+"px";const t=M("stageWrap"),n=Math.max(1,t.clientHeight-bd()),s=Math.min(t.clientWidth/ce,n/Qe);if(Vg(s),document.body.classList.contains("phone")&&j.style.setProperty("--fit",String(s)),le>Qs())Fe(le);else{const o=M("mmView");o.style.left=le/me*100+"%",o.style.width=ce/me*100+"%"}}let Mi=null,Li=!1;function _L(){if(S!=="house"||!Re.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return null;const e=C.get();if(e.currentRoom==="backyard")return null;let t=null,n=Mi;if(b&&Ie!==J){const a=ke();a&&a.where==="house"&&a.room===e.currentRoom&&(t=xt(e.currentRoom,In(b.pid,a),a).x,n||(n=In(b.pid,a)?.item??null))}if(t===null){const a=e.characters.find(r=>r.id===Te&&r.room===e.currentRoom)??e.characters.find(r=>r.room===e.currentRoom);if(!a)return null;t=xt(e.currentRoom,Lt(a),a).x,n||(n=Lt(a)?.item??null)}if(!n)return null;const s=e.rooms[e.currentRoom].items.find(a=>a.id===n),o=s&&Me[s.kind];if(!s||!o)return null;const i=o.w*Ye(s)/2;return{minX:Math.min(t-100,s.x-i),maxX:Math.max(t+100,s.x+i)}}function zs(e){if(S!=="house"||qs)return;if(C.get().currentRoom==="backyard"){Math.abs(le-Kl)>.5&&Fe(Kl),Gn();return}if(Li)return;const t=_L();if(t){const $=t.maxX-t.minX;let y=le;$+20*2>ce?y=t.minX-20:(t.minX-20<y&&(y=t.minX-20),t.maxX+20>y+ce&&(y=t.maxX+20-ce)),y=Math.max(0,Math.min(Qs(),y)),Math.abs(y-le)>.5&&Fe(y),Gn();return}const n=document.querySelector("#layer .char.avatar.mine")??document.querySelector("#layer .char");if(!n)return;const s=yt()||1,o=j.getBoundingClientRect(),i=8;let a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i;for(const k of["nudgeL","nudgeR"]){const $=M(k);if(!$||$.classList.contains("off")||$.offsetParent===null)continue;const y=$.getBoundingClientRect();y.width<2||y.height<2||(k==="nudgeL"?r=Math.max(r,y.right+6):a=Math.min(a,y.left-6))}a-r<48&&(a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i);const l=[n,...n.querySelectorAll(".nametag")];let c=0,d=0,f=1/0,h=-1/0;for(const k of l){const $=k.getBoundingClientRect();$.width<2||$.height<2||(c=Math.max(c,$.right-a),d=Math.max(d,r-$.left),f=Math.min(f,$.left),h=Math.max(h,$.right))}if(document.body.classList.contains("phone-portrait")&&f<1/0){const k=(f+h)/2-(r+a)/2;if(Math.abs(k)>3){Fe(le+k/s),Gn();return}}const g=$L(n),m=$M({cam:le,maxCam:Qs(),kidX:g,overflowL:d,overflowR:c,scale:s,nudgeX:e});Math.abs(m.cam-le)>.5&&Fe(m.cam),e&&Math.abs(m.kidX-g)>.5&&xL(n,m.kidX),Gn()}function $L(e){if(e.dataset.pid&&b){const t=e.dataset.pid===b.pid?ke():b.presence.get(e.dataset.pid);if(t&&t.where==="house")return t.x}return C.get().characters.find(t=>t.id===e.dataset.cid)?.x??0}function xL(e,t){if(e.dataset.pid&&b&&e.classList.contains("mine")){const o=ke();if(!o||o.where!=="house")return;Ge({...o,x:t}),Mt();return}const n=e.dataset.cid;if(!n)return;const s=C.get().characters.find(o=>o.id===n);s&&C.dispatch({type:"char/move",id:n,room:C.get().currentRoom,x:t,y:s.y})}const ML={living:"Living",bedroom:"Bed",kitchen:"Kitchen",salon:"Salon",nursery:"Nursery",bathroom:"Bath"};function Wg(){const e=S==="house",t=document.body.classList.contains("phone-portrait"),n=e&&!Re.isPlay(),s=e&&ce+1<me,o=e&&(t?n:n||s);document.body.classList.toggle("show-minimap",o)}const LL='<svg class="tabIco" width="14" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6 L8 1 L15 6 V11 H1 Z" fill="currentColor"/></svg>';function Ug(){return document.body.classList.contains("phone")}function EL(){const e=Ug()?"c":"f";Wg(),e!==yc&&(yc=e,Gg(C.get()))}function yd(){Bo.matches?rs():hs()}window.addEventListener("resize",yd);window.addEventListener("resize",()=>requestAnimationFrame(kd));M("tabs").addEventListener("scroll",kd,{passive:!0});Bo.addEventListener("change",yd);let wp="",_l=!1;function vp(){const e=M("stageWrap"),t=document.querySelector(".top"),n=document.querySelector(".tools"),s=r=>r?r.clientWidth+"x"+r.clientHeight:"0",o=window.visualViewport,i=o?Math.round(o.offsetTop)+"x"+Math.round(o.height)+"x"+Math.round(o.width):"",a=document.body.classList.contains("baby-card")?"c":"";return i+" "+s(e)+" "+s(t)+" "+s(n)+a}function bd(){const e=document.body;if(!e.classList.contains("baby-card")||!e.classList.contains("phone")||e.classList.contains("phone-portrait"))return 0;const t=document.querySelector(".babyCare"),n=t&&!t.hidden?t.getBoundingClientRect().height:0;return Math.ceil(8+(n>8?n:72)+8)}function Vg(e){const t=bd(),n=M("stageWrap").clientHeight;j.style.left="",t>0?j.style.top=t+Math.max(0,n-t)/2+"px":j.style.top="",j.style.transform=`translate(-50%,-50%) scale(${e})`}function Qg(){const e=M("modeToggle"),t=document.querySelector(".tools"),n=document.getElementById("modeDock"),s=document.querySelector(".drawerTop"),o=document.getElementById("roomFilter");if(!e||!t||!n||!s||!o)return!1;const i=document.body.classList.contains("phone"),a=i&&!document.body.classList.contains("phone-portrait"),r=!i&&window.matchMedia("(min-width: 900px)").matches,l=a?t:i||r?n:s;n.hidden=!(i&&!a)&&!r,n.classList.toggle("wideDock",r);let c=!1;const d=r?n:s;return o.parentElement!==d&&(r?n.appendChild(o):s.insertBefore(o,s.firstChild),c=!0),(e.parentElement!==l||r&&n.firstChild!==e)&&(a?t.insertBefore(e,t.firstChild):i||r?n.insertBefore(e,n.firstChild):s.insertBefore(e,s.firstChild),c=!0),c}function CL(){if(C.get().currentRoom==="backyard"||!document.body.classList.contains("phone-portrait")||!document.body.classList.contains("mode-play")||S!=="house")return;const e=M("stageWrap"),t=e.clientWidth,n=e.clientHeight;if(t<20||n<20||!(n>t*.85))return;const s=Math.min(me,md(Math.max(280,Math.min(860,Math.round(Qe*t/n)))));if(Math.abs(s-ce)<2)return;ce=s,j.style.width=ce+"px",j.style.height=Qe+"px";const o=Math.min(t/ce,n/Qe);if(j.style.transform=`translate(-50%,-50%) scale(${o})`,j.style.setProperty("--fit",String(yt())),le>Qs())Fe(le);else{const i=M("mmView");i.style.left=le/me*100+"%",i.style.width=ce/me*100+"%"}Ig(),Wg()}function rs(){if(_l||!Bo.matches)return;const e=Qg(),t=vp()+(document.body.classList.contains("mode-play")?"p":"d");if(!(!e&&t===wp)){_l=!0;try{hs(),CL(),it(),wp=vp()+(document.body.classList.contains("mode-play")?"p":"d")}finally{_l=!1}}}if(typeof ResizeObserver<"u"){const e=new ResizeObserver(()=>rs()),t=document.querySelector(".top");t&&e.observe(t),e.observe(M("stageWrap"));const n=document.querySelector(".tools");n&&e.observe(n)}window.visualViewport&&(window.visualViewport.addEventListener("resize",()=>rs()),window.visualViewport.addEventListener("scroll",()=>rs()));j.addEventListener("scroll",()=>{j.scrollLeft=0,j.scrollTop=0});const Dt=(e,t)=>{const n=j.getBoundingClientRect();return{x:(e-n.left)/n.width*ce+le,y:(t-n.top)/n.height*Qe}},kc=(e,t)=>{const n=j.getBoundingClientRect();return e>n.left&&e<n.right&&t>n.top&&t<n.bottom},_p=(e,t)=>{const n=Ma.getBoundingClientRect();return e>n.left-20&&e<n.right+20&&t>n.top-20&&t<n.bottom+20},Vi=e=>Vs[e.size]??1,gn=new Map;function zg(){return!b||Ie===J?!0:b.houses.get(Pe)?.meta.ownerId===b.pid}function Vr(e){const t=Me[e.kind];return!t||!Gs(e.kind)?null:{id:e.id,kind:e.kind,x:e.x,footY:Ys(t,e.y),flip:!!e.flip,scale:Ye(e),w:t.w,h:ft(t)}}function xt(e,t,n){if(!t)return n;const s=C.get().rooms[e]?.items.find(a=>a.id===t.item),o=s&&Vr(s);if(!o)return n;const i=eh(o).find(a=>a.n===t.n);return i?{x:i.x,y:i.y}:n}function Ei(e,t,n=!1){const s=C.get(),o=[];for(const i of s.characters){if(i.id===e||i.room!==s.currentRoom)continue;const a=Lt(i);a&&o.push({item:a.item,n:a.n})}if(!n){const i=Em(s.baby,s.currentRoom);i&&o.push(i)}if(b&&S==="house"){const i=(r,l)=>{if(r===t||l.where!=="house"||l.houseId!==Pe||l.room!==s.currentRoom)return;const c=In(r,l);c&&o.push({item:c.item,n:c.n})};b.presence.forEach((r,l)=>i(l,r));const a=ke();a&&b.pid!==t&&i(b.pid,a)}return o}function qg(e,t){t?gn.set(e,t):gn.delete(e)}function ei(e,t,n,s,o){const a=!b||Ie===J||!!b?.speaksSit;a?gn.delete("c:"+e):qg("c:"+e,o),a?C.dispatch({type:"char/move",id:e,room:t,x:n,y:s,seat:o}):C.dispatch({type:"char/move",id:e,room:t,x:n,y:s})}function Ea(e,t,n,s,o){const{seat:i,...a}=e;if(b&&!b.speaksSit){qg("p:"+b.pid,o?{item:o.id,pose:o.pose,n:o.n}:null),Ge({...a,x:t,y:n,flip:s});return}b&&gn.delete("p:"+b.pid),Ge(o?{...a,x:t,y:n,flip:s,seat:o}:{...a,x:t,y:n,flip:s})}function Lt(e){return e.seat?e.seat:gn.get("c:"+e.id)??null}function In(e,t){return t.seat?{item:t.seat.id,pose:t.seat.pose,n:t.seat.n}:gn.get("p:"+e)??null}function er(e,t){const n=C.get(),s=document.elementsFromPoint(e,t),o=new Set;for(let i=0;i<s.length;i++){const a=s[i];if(!a||!a.closest)continue;const r=a.closest(".item");if(!r)continue;const l=r.dataset.id;if(!l||o.has(l))continue;o.add(l);const c=n.rooms[n.currentRoom].items.find(d=>d.id===l);if(c&&Gs(c.kind))return c}return null}function SL(e){const t=Cr(e);if(t)return"k-bed k-bed-"+t.clip;const n=e.toLowerCase();return/sofa|couch|loveseat/.test(n)?"k-sofa":/bench/.test(n)?"k-bench":/chair|stool|rocker/.test(n)?"k-chair":""}function PL(){const e=C.get(),t=new Map,n=(s,o)=>{const i=t.get(s);t.set(s,i===void 0?o:Math.max(i,o))};for(const s of e.characters){const o=s.room===e.currentRoom?Lt(s):null;o&&n(o.item,o.n)}if(b&&S==="house"){const s=(i,a)=>{const r=a.where==="house"&&a.houseId===Pe&&a.room===e.currentRoom?In(i,a):null;r&&n(r.item,r.n)};b.presence.forEach((i,a)=>s(a,i));const o=ke();o&&s(b.pid,o)}return t}function TL(e,t){const n=Vi(e),s=Hr(e,Ar(Lt(e)?.pose))[t];let o=s.x;e.flip&&(o=100-o);const i=xt(e.room,Lt(e),e);return{x:i.x+(o-50)/100*ps*n,y:i.y-yn*n+s.y/160*yn*n}}function Zg(e){const t=C.get();let n=null;for(const s of t.characters){if(s.room!==t.currentRoom)continue;const o=Vi(s),i=xt(s.room,Lt(s),s),a=Math.abs(e.x-i.x)<ps*o/2+25&&e.y>i.y-yn*o-25&&e.y<i.y+20;for(const r of["left","right"]){if(s.held[r])continue;const l=TL(s,r),c=Math.hypot(e.x-l.x,e.y-l.y);(a||c<75)&&(!n||c<n.d)&&(n={c:s,hand:r,d:c})}}return n}const Ng=["none","radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)","repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)","linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)"],Fg="repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 125px), linear-gradient(rgba(0,0,0,.06), transparent 50%)",wc=e=>`url('${e.replace(/'/g,"%27")}')`;function jg(e){const t=e.rooms[e.currentRoom],n=M("wall"),s=M("floor"),o=t.wallTile?Rf[t.wallTile]:void 0;n.style.backgroundColor=t.wallpaper,o?(n.style.backgroundImage=wc(o.url),n.style.backgroundSize="220px auto",n.style.backgroundPosition="0 0"):(n.style.backgroundImage=Ng[t.pattern]??"none",n.style.backgroundSize=t.pattern===1?"44px 44px":t.pattern===3?"60px 60px":"auto",n.style.backgroundPosition=t.pattern===3?"0 0, 30px 30px":"0 0");const i=t.floorTile?Rf[t.floorTile]:void 0;s.style.backgroundColor=t.floor,s.style.backgroundImage=i?`${wc(i.url)}, linear-gradient(rgba(0,0,0,.06), transparent 50%)`:Fg,s.style.backgroundSize=i?"180px auto, auto":"auto",M("mmWall").style.background=t.wallpaper,M("mmFloor").style.background=t.floor,Yg(e)}function tr(e){const n=e.rooms[e.currentRoom].items.filter(o=>Me[o.kind]).map(o=>{const i=Me[o.kind];return`<i style="left:${o.x/me*100}%;top:${(Ys(i,o.y)-ft(i)*Ye(o)/2)/Qe*100}%"></i>`}).join(""),s=e.characters.filter(o=>o.room===e.currentRoom).map(o=>{const i=xt(e.currentRoom,Lt(o),o);return`<b style="left:${i.x/me*100}%;top:${(i.y-90)/Qe*100}%;background:${o.shirt}"></b>`}).join("");M("mmDots").innerHTML=n+s}function Gg(e){const t=Ug();yc=t?"c":"f",document.body.classList.toggle("tabs-compact",t),M("tabs").innerHTML=fd.map(n=>{const s=t?ML[n.id]??n.name:n.name;return`<button class="tab ${e.currentRoom===n.id||e.currentRoom==="backyard"&&n.id==="living"?"on":""}" data-room="${n.id}" style="--c:${n.color}" aria-label="${n.name}">${t?LL:""}${s}</button>`}).join(""),requestAnimationFrame(()=>{RL(),kd()})}function kd(){const e=document.getElementById("tabs");if(!e)return;const t=e.scrollWidth-e.clientWidth;e.classList.toggle("fadeL",t>2&&e.scrollLeft>2),e.classList.toggle("fadeR",t>2&&e.scrollLeft<t-2)}function RL(){const e=document.getElementById("tabs"),t=e?.querySelector(".tab.on");if(!e||!t||e.scrollWidth<=e.clientWidth+2)return;const n=t.offsetLeft-e.offsetLeft,s=n+t.offsetWidth;n<e.scrollLeft+24?e.scrollLeft=Math.max(0,n-24):s>e.scrollLeft+e.clientWidth-24&&(e.scrollLeft=s-e.clientWidth+24)}function Ks(e,t,n,s,o){e.style.left=(t-s/2)/me*100+"%",e.style.top=(n-o)/Qe*100+"%",e.style.width=s/me*100+"%",e.style.height=o/Qe*100+"%"}function wd(e,t){let n=e.w*t,s=ft(e)*t;if((e.kind==="kennel"||e.kind==="cat-tower")&&document.body.classList.contains("phone")){const o=Math.max(.2,yt()||1),i=44*me/(Math.max(1,ce)*o),a=44/o;n<i&&(n=i),s<a&&(s=a)}return{w:n,h:s}}function Jt(e){const t=e.rooms[e.currentRoom],n=new Set;for(const s of t.items){const o=Me[s.kind];if(!o)continue;n.add(s.id);let i=ee.querySelector(`.item[data-id="${s.id}"]`);i||(i=document.createElement("div"),i.className="item",i.dataset.id=s.id,i.innerHTML=`<div class="inner">${mn(o,!0)}</div>`,ee.appendChild(i),i.addEventListener("pointerdown",l=>NL(i,l))),i.dataset.kind=s.kind,i.classList.toggle("is-light",E9(s.kind,!!o.light));const a=wd(o,Ye(s));Ks(i,s.x,Ys(o,s.y),a.w,a.h);const r=1e3+s.z;i.style.zIndex=String(r),i.style.setProperty("--iz",String(r)),i.classList.toggle("flipped",s.flip),i.classList.toggle("sel",ot===s.id)}ee.querySelectorAll(".item").forEach(s=>{n.has(s.dataset.id)||s.remove()}),Yg(e),HL(),vd(),eu(e),tr(e),Fs()}function vd(){const e=C.get(),t=PL(),n=new Set;t.forEach((s,o)=>{const i=e.rooms[e.currentRoom]?.items.find(h=>h.id===o),a=i&&Me[i.kind],r=i&&SL(i.kind);if(!i||!a||!r)return;n.add(o);let l=ee.querySelector(`.seatFront[data-id="${o}"]`);l||(l=document.createElement("div"),l.className="seatFront",l.dataset.id=o,ee.appendChild(l));const c=ee.querySelector(`.item[data-id="${o}"] .inner`),d=l.querySelector(".inner");(!d||c&&d.innerHTML!==c.innerHTML)&&(l.innerHTML=`<div class="inner">${c?c.innerHTML:mn(a,!0)}</div>`),l.className="seatFront "+r+(i.flip?" flipped":"");const f=wd(a,Ye(i));Ks(l,i.x,Ys(a,i.y),f.w,f.h),l.style.zIndex=String(1e3+i.z+3)}),ee.querySelectorAll(".seatFront").forEach(s=>{n.has(s.dataset.id||"")||s.remove()})}let qs=!1,$p=0;function _d(e){performance.now()-$p<80||($p=performance.now(),gC(e))}function BL(e,t){const n=j.querySelector(".yardDoor");if(!n)return null;const s=o=>{if(!o)return!1;const i=o.getBoundingClientRect();return i.width>2&&i.height>2&&e>=i.left&&e<=i.right&&t>=i.top&&t<=i.bottom};return s(n.querySelector(".yardHintLabel"))||s(n.querySelector(".doorArt"))||s(n)?n:null}function AL(e){e.addEventListener("pointerdown",t=>{if(t.button!==0)return;t.stopPropagation();const n=e.dataset.yardGo==="backyard"?"backyard":"living",s=t.clientX,o=t.clientY,i=t.pointerId;qs=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),qs=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),_d(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)})}j.addEventListener("pointerdown",e=>{if(e.button!==0)return;const t=BL(e.clientX,e.clientY);if(!t||e.target instanceof Node&&t.contains(e.target))return;e.stopPropagation(),e.preventDefault();const n=t.dataset.yardGo==="backyard"?"backyard":"living",s=e.clientX,o=e.clientY,i=e.pointerId;qs=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),qs=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),_d(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)},!0);function DL(e,t){return e.width>2&&t.width>2&&e.left<t.right-1&&e.right>t.left+1&&e.top<t.bottom-1&&e.bottom>t.top+1}function xp(e){const t=e.getBoundingClientRect();let n=0;ee.querySelectorAll(".item").forEach(s=>{if(s.classList.contains("is-light"))return;const o=Me[s.dataset.kind||""];if(!o||o.wall||!DL(s.getBoundingClientRect(),t))return;const i=parseInt(s.style.zIndex||"0",10)||0;i>n&&(n=i)}),e.style.zIndex=n?String(n+2):"2"}function Yg(e){const t=e.rooms[e.currentRoom];DM(M("scenery"),e.currentRoom,t.items),M("scenery").querySelectorAll(".yardDoor").forEach(o=>o.remove());const n=e.currentRoom==="living"?"backyard":e.currentRoom==="backyard"?"living":"",s=ee.querySelector(".yardDoor");if(!n)ee.querySelectorAll(".yardDoor").forEach(o=>o.remove());else if(!s||s.dataset.yardGo!==n){ee.querySelectorAll(".yardDoor").forEach(i=>i.remove()),ee.insertAdjacentHTML("beforeend",Qx(n==="backyard"?"living":"yard"));const o=ee.querySelector(".yardDoor");o&&AL(o)}j.classList.toggle("room-yard",e.currentRoom==="backyard"),dr(),qs||Gn()}const Bt=new Map;function IL(e){const t=Vi(e),n=ps*t,s=yn*t,o=Hr(e,Ar(Lt(e)?.pose)),i=e.look2?.85:1;return["left","right"].map(a=>{const r=e.held[a],l=r&&Me[r.kind];if(!r||!l)return"";const c=Ye(r),d=Math.min(.7,120*t/Math.max(l.w,ft(l))/c)*i,f=l.w*c*d,h=ft(l)*c*d,g=o[a].x/100*n,m=o[a].y/160*s;return`<div class="held ${r.flip?"flipped":""}" data-hand="${a}" style="left:${(g-f/2)/n*100}%;top:${(m-h*.62)/s*100}%;width:${f/n*100}%;height:${h/s*100}%"><div class="inner">${mn(l)}</div></div>`}).join("")}function HL(){let e=ee.querySelector("#skyPuddles");e||(e=document.createElement("div"),e.id="skyPuddles",e.className="skyPuddles"),ee.appendChild(e);const t=[...ee.querySelectorAll(".item.is-light")];for(;e.children.length>t.length;)e.lastElementChild.remove();for(;e.children.length<t.length;)e.appendChild(document.createElement("i"));t.forEach((n,s)=>{const o=e.children[s],i=parseFloat(n.style.left),a=parseFloat(n.style.top),r=parseFloat(n.style.width),l=parseFloat(n.style.height),c=n.dataset.kind==="window"||n.dataset.kind==="tv";o.style.left=i-.6*r+"%",o.style.top=a-(c?.38:.5)*l+"%",o.style.width=2.2*r+"%",o.style.height=2*l+"%",o.style.zIndex=String(parseInt(n.style.zIndex||"1000",10))})}let Qr=()=>{};function hi(e){const t=e.baby;return t&&t.spot==="arms"&&t.holder?t.holder:""}const Nn=new Map;function Kg(e){for(const[t,n]of Nn)t.indexOf(e+":")===0&&(n.remove(),Nn.delete(t))}function Xg(e,t){const n=e+":"+t,s=Nn.get(n);s&&(s.remove(),Nn.delete(n))}function Jg(e,t,n,s,o){const i=e+":"+t;for(const[r,l]of Nn)r.indexOf(e+":")===0&&r!==i&&(l.remove(),Nn.delete(r));let a=Nn.get(i);if((!a||!a.isConnected)&&(a=document.createElement("div"),a.className="cradle-front",a.dataset.for=t,a.innerHTML='<div class="inner"></div>',ee.appendChild(a),Nn.set(i,a)),a.dataset.arm!==s){const r=a.querySelector(".inner");r&&(r.innerHTML=s),a.dataset.arm=s}a.style.left=n.style.left,a.style.top=n.style.top,a.style.width=n.style.width,a.style.height=n.style.height,a.style.zIndex=String(5e3+Math.round(o)+4),a.classList.toggle("flipped",n.classList.contains("flipped")),a.classList.toggle("pose-sit",n.classList.contains("pose-sit")),a.classList.toggle("pose-lie",n.classList.contains("pose-lie")),a.classList.toggle("pose-lie-r",n.classList.contains("pose-lie-r"))}function en(e){const t=e.characters.filter(n=>n.room===e.currentRoom);for(const[n,s]of Bt)t.some(o=>o.id===n)||(s.remove(),Bt.delete(n));for(const n of t){let s=Bt.get(n.id);s||(s=document.createElement("div"),s.className="char",s.dataset.cid=n.id,s.innerHTML='<div class="inner"></div><div class="hands"></div>',ee.appendChild(s),Bt.set(n.id,s),GL(s));const o=Lt(n),i=o?.pose??null,a=hi(e)===n.id,r=O0(n)+(i||"")+(a?"h":"");s.dataset.look!==r&&(s.querySelector(".inner").innerHTML=bt(n,i,a),s.dataset.look=r),s.classList.toggle("holding",a);const l=JSON.stringify([n.held.left?.id,n.held.left?.flip,n.held.right?.id,n.held.right?.flip,n.size,i]);s.dataset.held!==l&&(s.querySelector(".hands").innerHTML=IL(n),s.dataset.held=l);const c=Vi(n),d=xt(e.currentRoom,o,n);if(Ks(s,d.x,d.y,ps*c,yn*c),s.style.zIndex=String(o?1e3+(e.rooms[e.currentRoom].items.find(h=>h.id===o.item)?.z??0)+1+o.n:5e3+Math.round(n.y)),s.classList.toggle("flipped",n.flip),s.classList.toggle("pose-sit",i==="sit"),s.classList.toggle("pose-lie",i==="lie"),s.classList.toggle("pose-lie-r",i==="lie"&&!!e.rooms[e.currentRoom].items.find(h=>h.id===o?.item)?.flip),s.classList.toggle("active",n.id===Te),Oi(s,n,n.id===Te),s.classList.toggle("pose-swing",At?.id===n.id),a){const h=Nh(n,i);h?Jg("doll",n.id,s,h,d.y):Xg("doll",n.id)}const f=Hr(n);s.style.setProperty("--hx-l",f.left.x+"%"),s.style.setProperty("--hx-r",f.right.x+"%")}(hi(e)===""||!t.some(n=>n.id===hi(e)))&&Kg("doll"),Fs(),tr(e),Qr()}function ca(){const e=j.getBoundingClientRect(),t=e.width/Math.max(1,ce),n=6,o=document.body.classList.contains("phone")?1/Math.max(.2,t):1,i=xe.offsetWidth,a=xe.offsetHeight,r=parseFloat(xe.style.left)/100*me,l=parseFloat(xe.style.top)/100*Qe,c=xe.classList.contains("below"),d=r,f=c?l+a/2:l-a/2,h=o*i/2,g=o*a/2,m=_=>e.left+(n+_-le)*t,k=_=>e.top+(n+_)*t,$=m(d-h),y=m(d+h),u=k(f-g),w=k(f+g);return{left:$,right:y,top:u,bottom:w,width:y-$,height:w-u}}function OL(){const e=j.getBoundingClientRect(),t=4;let n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t,o=Math.max(e.top,0)+t,i=Math.min(e.bottom,window.innerHeight)-t;for(const a of["nudgeL","nudgeR"]){const r=M(a);if(!r||r.classList.contains("off")||r.offsetParent===null)continue;const l=r.getBoundingClientRect();l.width<2||l.height<2||(a==="nudgeL"?n=Math.max(n,l.right+4):s=Math.min(s,l.left-4))}return s-n<48&&(n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t),{left:n,right:s,top:o,bottom:i}}function da(e,t){xe.style.left=e/me*100+"%",xe.style.top=t/Qe*100+"%"}function eu(e){const t=ot&&e.rooms[e.currentRoom].items.find(k=>k.id===ot);if(Re.isPlay()||!t||!Me[t.kind]){xe.classList.add("hidden"),xe.classList.remove("below"),xe.style.maxWidth="";return}const n=Me[t.kind],s=Ys(n,t.y),o=s-ft(n)*Ye(t),i=12;xe.classList.remove("hidden"),xe.style.maxWidth="",xe.classList.remove("below"),da(t.x,o-i);const a=OL();ca().top<a.top&&(xe.classList.add("below"),da(t.x,s+i));let r=ca();const l=a.right-a.left;if(r.width>l-2&&l>60){const k=xe.offsetWidth*((l-8)/Math.max(1,r.width));xe.style.maxWidth=Math.max(76,k)+"px",!xe.classList.contains("below")&&ca().top<a.top&&(xe.classList.add("below"),da(t.x,s+i)),r=ca()}let c=0,d=0;if(r.left<a.left&&(c=a.left-r.left),r.right+c>a.right&&(c=a.right-r.right),r.width>a.right-a.left&&(c=(a.left+a.right)/2-(r.left+r.right)/2),r.top<a.top&&(d=a.top-r.top),r.bottom+d>a.bottom&&(d=a.bottom-r.bottom),Math.abs(c)>=.5||Math.abs(d)>=.5){const k=j.getBoundingClientRect().width/Math.max(1,ce)||1,$=parseFloat(xe.style.left)/100*me+c/k,y=parseFloat(xe.style.top)/100*Qe+d/k;da($,y)}const f=Is(t.size),h=Rs.indexOf(f),g=xe.querySelector('[data-a="smaller"]'),m=xe.querySelector('[data-a="bigger"]');g&&(g.disabled=h<=0),m&&(m.disabled=h>=Rs.length-1)}function tu(e){const t=M("soundIco");t&&(t.innerHTML=e.soundOn?Vt.soundOn:Vt.soundOff),M("btnSound").setAttribute("aria-label",e.soundOn?"Sound on":"Sound off"),L2(e.soundOn)}function Zs(){const e=C.get();ee.innerHTML="",Bt.clear(),Gg(e),jg(e),Jt(e),en(e),tu(e);const t=e.characters.find(o=>o.room===e.currentRoom),n=b&&ke(),s=n&&n.where==="house"?n.x:t?.x;Wr(),Fe(Ja[e.currentRoom]??ud(s!==void 0?s-ce/2:Eo)),Mt(),bn(),document.body.classList.contains("phone")&&S==="house"&&requestAnimationFrame(()=>Og())}const Mp=200,WL=2,nr=[];let vc=0,Ca=!1,$l=0;const nu=new Map;function _c(e){const t=document.getElementById("shelf");if(!t)return!1;const n=t.getBoundingClientRect();if(n.width<2||n.height<2)return!1;const s=e.getBoundingClientRect();return s.right>n.left-Mp&&s.left<n.right+Mp&&s.bottom>n.top-8&&s.top<n.bottom+8}const UL=3,sr=new Map;function $c(e,t){const n=(sr.get(t)||0)+1;if(sr.set(t,n),delete e.dataset.shelfq,n>=UL){delete e.dataset.artq;return}setTimeout($d,300*n)}function lo(){vc--,!Ca&&su()}function Lp(e,t){const n=document.createElement("div");n.innerHTML=mn(t);const s=n.querySelector("img.artimg");if(!s){delete e.dataset.artq,lo();return}const o=sr.get(t.kind)||0;if(o>0){const l=s.getAttribute("src")||"";s.setAttribute("src",l+(l.indexOf("?")>=0?"&":"?")+"retry="+o)}let i=!1;const a=l=>{if(!i){if(i=!0,l){const c=Array.prototype.slice.call(n.childNodes);if(nu.set(t.kind,c),sr.delete(t.kind),e.isConnected&&e.dataset.artq==="1"){delete e.dataset.artq,e.innerHTML="";for(let d=0;d<c.length;d++)e.appendChild(c[d])}else{const d=document.querySelector(`#shelf button.thing[data-artq="1"][data-kind="${CSS.escape(t.kind)}"]`);if(d){delete d.dataset.artq,d.innerHTML="";for(let f=0;f<c.length;f++)d.appendChild(c[f])}}}else e.isConnected&&e.dataset.artq==="1"&&$c(e,t.kind);lo()}},r=()=>{typeof s.decode=="function"?s.decode().then(()=>a(!0),()=>a(!0)):a(!0)};s.onload=r,s.onerror=()=>a(!1),s.complete&&s.naturalWidth>0&&r()}function su(){if(!Ca){for(Ca=!0;vc<WL&&nr.length;){const e=nr.shift();if(!e||!e.isConnected||e.dataset.artq!=="1")continue;if(!_c(e)){delete e.dataset.shelfq;continue}const t=e.dataset.kind||"",n=Me[t];if(!n){delete e.dataset.artq;continue}if(vc++,Ws(t)){Lp(e,n);continue}p(()=>Promise.resolve().then(()=>jc),void 0).then(s=>s.loadArtKinds([t])).then(()=>{if(!e.isConnected||e.dataset.artq!=="1"){lo();return}if(!Ws(t)){$c(e,t),lo();return}if(!_c(e)){delete e.dataset.shelfq,lo();return}Lp(e,n)},()=>{e.isConnected&&e.dataset.artq==="1"&&$c(e,t),lo()})}Ca=!1}}function VL(){const e=document.getElementById("shelf");if(!e||!vo())return;const t=e.querySelectorAll('button.thing[data-artq="1"]');for(let n=0;n<t.length;n++){const s=t[n];s.dataset.shelfq!=="1"&&_c(s)&&(s.dataset.shelfq="1",nr.push(s))}su()}function $d(){$l||($l=requestAnimationFrame(()=>{$l=0,VL()}))}function QL(){const e=document.getElementById("shelf");!e||e.dataset.artscroll==="1"||(e.dataset.artscroll="1",e.addEventListener("scroll",$d,{passive:!0}))}function ou(){const e=document.getElementById("shelf");if(!e||!vo())return;const t=e.querySelectorAll("button.thing[data-kind]");for(let n=0;n<t.length;n++){const s=t[n],o=s.dataset.kind||"";s.querySelector("img.artimg")||!(qd(o)||Ws(o))||(s.dataset.artq="1")}$d()}function iu(){if(St==="__people"){Ht();return}ou()}function zL(e){const t=ah();if(!b)return;const n=ke();if(!n||n.where!=="house"||!n.seat)return;let s="";if(e.type==="item/flip"||e.type==="item/delete")s=e.id;else if(e.type==="item/move"&&e.stand)s=e.id;else if(e.type==="char/hold")s=e.itemId;else return;if(!s||n.seat.id!==s||e.room!==n.room)return;const o=t&&t.id===s?t:null,i=o?Ia(o.kind)*(o.scale||1):Ia("bed"),a=Wc(o?o.x:n.x,i,n.x);gn.delete("p:"+b.pid);const{seat:r,...l}=n;Ge({...l,x:a.x,y:a.y})}C.subscribe((e,t)=>{switch(zL(t),t.type){case"room/switch":{const n=j.classList.contains("room-yard");b&&Ie!==J&&JL(t.room),Zs(),Ht(),(t.room==="backyard"||n||Re.isPlay()&&Math.min(window.innerWidth,window.innerHeight)<500)&&hs(),Nu(t.room);break}case"item/add":Jt(e),vL(),fC();break;case"game/reset":Zs();break;case"room/wallpaper":case"room/floor":case"room/pattern":case"room/wallTile":case"room/floorTile":jg(e);break;case"char/update":case"char/move":t.type==="char/move"&&At&&!ti&&t.id===At.id&&(At=null),en(e),vd(),dr(),S==="ranch"?is():S==="park"&&Ns();break;case"char/add":case"char/delete":case"char/hold":case"char/release":Jt(e),en(e),Mt(),St==="__people"&&Ht();break;case"item/move":case"item/flip":case"item/delete":case"item/size":Jt(e),en(e),Mt();break;case"baby/meet":case"baby/name":case"baby/care":case"baby/hold":case"baby/place":case"baby/ease":en(e),Mt();break;case"settings/sound":tu(e);break;default:Jt(e)}});function je(e){if(!e)return;const t=e.querySelector(":scope > .inner")??e;t.classList.remove("bounce"),t.offsetWidth,t.classList.add("bounce")}function xd(e,t,n=7){const s=M("fx"),o=["#ffd166","#ff8fab","#8ecae6","#80ed99","#c9a0dc"];for(let i=0;i<n;i++){const a=document.createElement("div");a.className="spark";const r=Math.PI*2*i/n+Math.random()*.5,l=40+Math.random()*30;a.style.left=e+"px",a.style.top=t+"px",a.style.background=o[i%o.length],a.style.setProperty("--dx",Math.cos(r)*l+"px"),a.style.setProperty("--dy",Math.sin(r)*l+"px"),s.appendChild(a),setTimeout(()=>a.remove(),650)}}const zr=e=>{const t=e?.getBoundingClientRect();t&&xd(t.left+t.width/2,t.top+t.height/2)};function Md(e,t){xd(e,t,10),P.pop()}function or(e){Bt.forEach((t,n)=>{t.classList.toggle("hold-target",!!e&&e.c.id===n),t.dataset.hand=e&&e.c.id===n?e.hand:""})}function au(e,t){C.dispatch({type:"char/hold",id:e.c.id,hand:e.hand,room:e.c.room,itemId:t}),ot=null,Jt(C.get());const n=Bt.get(e.c.id);je(n),zr(n?.querySelector(`.held[data-hand="${e.hand}"]`)),P.sparkle()}const un=new Map;let Zt=!1,ir=0;const Ld=()=>[...un.values()].reduce((e,t)=>e+t,0)/un.size;j.addEventListener("pointerdown",e=>{e.pointerType==="touch"&&(un.set(e.pointerId,e.clientX),un.size>=2&&(Zt=!0,ir=Ld(),Wr(),xe.classList.add("hidden")))},!0);window.addEventListener("pointermove",e=>{if(un.has(e.pointerId)&&(un.set(e.pointerId,e.clientX),Zt&&un.size>=2)){const t=Ld();Fe(le-(t-ir)/yt()),ir=t}},!0);const ru=e=>{un.delete(e.pointerId),un.size<2&&Zt&&(un.size===0?Zt=!1:ir=Ld())};window.addEventListener("pointerup",ru,!0);window.addEventListener("pointercancel",ru,!0);const io=80;function qL(e,t){const n=j.getBoundingClientRect();return t<n.top-40||t>n.bottom+10?0:e<n.left+io?-Math.min(1,(n.left+io-e)/io)*16:e>n.right-io?Math.min(1,(e-(n.right-io))/io)*16:0}function gs(e,t){let n=e,s=0;const o=()=>{const r=Zt?0:qL(n.clientX,n.clientY);if(r){const l=le;Fe(le+r),le!==l&&t.onMove(n)}s=requestAnimationFrame(o)};t.edgeScroll!==!1&&(s=requestAnimationFrame(o));const i=r=>{r.pointerId===e.pointerId&&(r.preventDefault(),n=r,Zt||t.onMove(r))},a=r=>{r.pointerId===e.pointerId&&(cancelAnimationFrame(s),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",a),t.onUp(r))};window.addEventListener("pointermove",i,{passive:!1}),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a)}function ZL(e){return new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,pointerId:e.pointerId,pointerType:e.pointerType,button:e.button,buttons:e.buttons,isPrimary:e.isPrimary})}function NL(e,t){const n=t.target,s=n&&n.closest?n.closest("img.artimg"):null;if(s&&!td(s,t.clientX,t.clientY)){const o=e7(t.clientX,t.clientY),i=o?.closest(".item"),a=o?.closest(".char");i&&i!==e?(t.stopPropagation(),xc(i,t)):a&&(t.stopPropagation(),a.dispatchEvent(ZL(t)));return}xc(e,t)}function FL(e,t){if(t.preventDefault(),t.stopPropagation(),Zt)return;const n=e.dataset.id,s=t.clientX,o=t.clientY;gs(t,{edgeScroll:!1,onMove(){},onUp(i){Math.hypot(i.clientX-s,i.clientY-o)>6||TE(e,n)}})}function xc(e,t,n=!1){if(t.preventDefault(),t.stopPropagation(),Zt)return;if(Re.isPlay()){FL(e,t);return}if(!Ot()){Hn(e);return}const s=C.get(),o=s.currentRoom,i=e.dataset.id,a=s.rooms[o].items.find(h=>h.id===i);if(!a)return;const r=Me[a.kind],l=Dt(t.clientX,t.clientY),c={x:a.x-l.x,y:a.y-l.y};let d=n,f=null;ot=i,C.dispatch({type:"item/front",room:o,id:i}),e.classList.add("lifted"),P.pick(),gs(t,{onMove(h){const g=Dt(h.clientX,h.clientY);Math.hypot(g.x-l.x,g.y-l.y)>6&&(d=!0),d&&(xe.classList.add("hidden"),Ma.classList.add("show")),Ma.classList.toggle("hot",_p(h.clientX,h.clientY));const m=r.w*Ye(a)/2;C.dispatch({type:"item/move",room:o,id:i,x:Math.max(m*.6,Math.min(me-m*.6,g.x+c.x)),y:Cg(r,g.y+c.y),...d?{stand:!0}:{}}),d&&xe.classList.add("hidden"),f=d&&r.holdable?Zg(g):null,or(f)},onUp(h){if(e.classList.remove("lifted"),Ma.classList.remove("show","hot"),or(null),d&&_p(h.clientX,h.clientY)){ot=null,C.dispatch({type:"item/delete",room:o,id:i}),Md(h.clientX,h.clientY);return}if(d&&f){au(f,i);return}d?(P.drop(),je(e)):(P.click(),Cu(i),EM(e)),Jt(C.get())}})}function jL(e,t,n){if(n.preventDefault(),n.stopPropagation(),Zt||Re.isPlay())return;const s=e.dataset.cid,o=t.dataset.hand,i=C.get().characters.find(d=>d.id===s),a=i?.held[o];if(!i||!a)return;const r=t.getBoundingClientRect(),l=Dt(r.left+r.width/2,r.bottom);C.dispatch({type:"char/release",id:s,hand:o,x:l.x,y:l.y});const c=ee.querySelector(`.item[data-id="${a.id}"]`);c&&xc(c,n,!0)}function GL(e){e.addEventListener("pointerdown",t=>{const n=t.target.closest(".held"),s=n?.querySelector("img.artimg"),o=!!s&&!td(s,t.clientX,t.clientY);if(n&&!o){if(Re.isPlay()){t.preventDefault(),t.stopPropagation();return}if(!Ot()){t.stopPropagation(),Hn(e);return}return jL(e,n,t)}if(t.preventDefault(),t.stopPropagation(),Zt||Re.isPlay()&&!zg())return;if(!Ot()){Hn(e);return}ot=null,Jt(C.get());const i=e.dataset.cid;Te=i;const a=C.get(),r=a.characters.find(g=>g.id===i);if(!r)return;const l=Dt(t.clientX,t.clientY),c=xt(a.currentRoom,Lt(r),r),d={x:c.x-l.x,y:c.y-l.y};let f=c.x,h=!1;e.classList.add("lifted"),P.pick(),en(C.get()),Li=!0,gs(t,{onMove(g){const m=Dt(g.clientX,g.clientY),k=m.x+d.x;if(Math.hypot(m.x-l.x,m.y-l.y)>6&&(h=!0),!h)return;const $=C.get().characters.find(u=>u.id===i);if(!$)return;if(Math.abs(k-f)>3){const u=k<f;u!==$.flip&&C.dispatch({type:"char/update",id:i,patch:{flip:u}}),f=k}const y=Math.max(xo+40,m.y+d.y);ei(i,a.currentRoom,k,y,null),Re.isPlay()&&(Mi=er(g.clientX,g.clientY)?.id??null),document.querySelectorAll(".tab").forEach(u=>u.classList.remove("drop")),document.elementFromPoint(g.clientX,g.clientY)?.closest(".tab:not(.on)")?.classList.add("drop")},onUp(g){Li=!1,Mi=null,e.classList.remove("lifted"),document.querySelectorAll(".tab").forEach(w=>w.classList.remove("drop"));const m=document.elementFromPoint(g.clientX,g.clientY)?.closest("[data-room]"),k=C.get().characters.find(w=>w.id===i);if(!h||!k){P.click();return}if(m&&m.dataset.room!==a.currentRoom){const w=m.getBoundingClientRect();xd(w.left+w.width/2,w.top+w.height/2,9),P.swish(),ei(i,m.dataset.room,k.x,k.y,null);return}const $=Dt(g.clientX,g.clientY),y=$.x+d.x,u=Math.max(xo+40,$.y+d.y);if(Re.isPlay()){const w=er(g.clientX,g.clientY),_=yi({mode:"play",via:"drag",releaseX:y,releaseY:u,piece:w?Vr(w):null,occupied:Ei(i)});ei(i,a.currentRoom,_.x,_.y,_.seat)}else ei(i,a.currentRoom,y,u,null);P.drop(),je(e),requestAnimationFrame(()=>zs(!0))}})})}function YL(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Re.isPlay()){n.stopPropagation();return}if(!Ot()){Hn(e);return}const s=document.createElement("div");s.className="ghost",s.innerHTML=mn(t),document.body.appendChild(s);const o=Math.max(1,60/(Math.max(t.w,ft(t))*yt())),i=t.w*yt()*o,a=ft(t)*yt()*o;s.style.width=i+"px",s.style.height=a+"px";let r=null;const l=f=>{s.style.left=f.clientX-i/2+"px",s.style.top=f.clientY-a*.8+"px",r=t.holdable&&kc(f.clientX,f.clientY)?Zg(Dt(f.clientX,f.clientY)):null,or(r)};l(n),P.pick(),e.classList.add("pressed");const c=n.clientX,d=n.clientY;gs(n,{onMove:l,onUp(f){s.remove(),e.classList.remove("pressed"),or(null);const h=C.get().currentRoom,g=Math.hypot(f.clientX-c,f.clientY-d)<8;let m,k;if(g)m=le+380+Math.random()*240,k=t.wall?Math.min(Eg,200+ft(t)/2):500+Math.random()*40;else if(kc(f.clientX,f.clientY)){const u=Dt(f.clientX,f.clientY);m=u.x,k=Cg(t,u.y+ft(t)*.2)}else return;const $={id:bc(t.kind.replace(/[^a-z0-9-]/gi,"")),kind:t.kind,x:m,y:k,flip:!1,z:0,scale:1};if(h!=="backyard"&&C.get().rooms[h].items.length===0){const u=BM(w=>bc(w),h);for(let w=0;w<u.length;w++)C.dispatch({type:"item/add",room:h,item:u[w]})}if(C.dispatch({type:"item/add",room:h,item:$}),!g&&r){au(r,$.id);return}ot=$.id,Jt(C.get());const y=ee.querySelector(`.item[data-id="${$.id}"]`);je(y),zr(y),P.sparkle()}})})}function KL(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Re.isPlay())return;if(!Ot()){Hn(e);return}const s=C.get().characters.find(h=>h.id===t);if(!s)return;const o=Vi(s),i=ps*o*yt(),a=yn*o*yt(),r=document.createElement("div");r.className="ghost",r.innerHTML=bt(s),r.style.width=i+"px",r.style.height=a+"px",document.body.appendChild(r);const l=h=>{r.style.left=h.clientX-i/2+"px",r.style.top=h.clientY-a*.85+"px"},c=n.clientX,d=n.clientY;let f=!1;r.style.visibility="hidden",gs(n,{onMove(h){Math.hypot(h.clientX-c,h.clientY-d)>8&&(f=!0,r.style.visibility=""),l(h)},onUp(h){if(r.remove(),!f){P.click(),Te=t,Lo("dress");return}if(!kc(h.clientX,h.clientY))return;const g=Dt(h.clientX,h.clientY),m=C.get().currentRoom;C.dispatch({type:"char/move",id:t,room:m,x:g.x,y:Math.max(xo+40,g.y+yn*o*.15)}),Te=t,en(C.get());const k=Bt.get(t);je(k),zr(k),P.sparkle()}})})}function lu(){if(!Ot())return Hn(null),null;const e=C.get();if(e.characters.length>=Co)return null;const t=bc("c"),n=Mr();C.dispatch({type:"char/add",char:as({id:t,...xr(n),look2:n,room:e.currentRoom,x:le+300+Math.random()*400,y:520+Math.random()*40})}),Te=t,en(C.get());const s=Bt.get(t);return je(s),zr(s),P.sparkle(),t}function XL(){return gd==="all"?"all":C.get().currentRoom}function Ht(){const e=C.get().currentRoom,t=XL(),n=fd.find(l=>l.id===e)?.name??"This room",s=t==="all";M("roomFilter").innerHTML=`<button class="rf ${s?"on":""}" data-rf="${s?"room":"all"}">${s?"Just "+n:"All rooms"}</button>`;const o=vl("secrets").length>0,i=Mo.filter(l=>l.id!=="secrets"&&(l.kind==="people"||l.kind==="pack"&&e!=="backyard"||vl(l.id).length));!(St==="secrets"&&o)&&!i.some(l=>l.id===St)&&(St=i[1]?.id??"__people"),M("cats").innerHTML=i.map(l=>`<button class="cat ${l.kind} ${l.id===St?"on":""}" data-cat="${l.id}" aria-label="${l.name}" title="${l.name}">${l.kind==="people"?dL:l.kind==="pack"?`<span class="packicon">${mn(Me[l.icon])}</span><span class="packname">${l.name}</span>`:mn(Me[l.icon])}</button>`).join("")+(o?`<button class="cat secretTab ${St==="secrets"?"on":""}" data-cat="secrets" aria-label="Secrets" title="Secrets">🎁</button>`:"");const a=M("shelf");if(nr.length=0,a.innerHTML="",!Ot()){a.innerHTML='<div class="empty locked">🔒 This house is look-only right now</div>';return}if(St==="__people"){const l=C.get(),c=ts();if(c){const d=document.createElement("button");d.className="thing person me",d.setAttribute("aria-label","Me"),d.innerHTML=`<div class="face">${bt(c)}</div><span class="meStar">★</span>`,d.addEventListener("click",()=>{P.click(),Te=dt,Lo("dress")}),a.appendChild(d)}for(const d of l.characters){const f=document.createElement("button");f.className="thing person",f.setAttribute("aria-label","Character"),f.innerHTML=`<div class="face">${bt(d)}</div><span class="where" style="background:${Pg(d.room)}"></span>`,a.appendChild(f),KL(f,d.id)}if(l.characters.length<Co){const d=document.createElement("button");d.className="thing add",d.setAttribute("aria-label","New character"),d.innerHTML=Tg,d.addEventListener("click",()=>{lu()&&(Ht(),Lo("dress"))}),a.appendChild(d)}return}const r=vl(St);r.length||(a.innerHTML='<div class="empty">Nothing here yet!</div>');for(const l of r){const c=document.createElement("button");c.className="thing",c.setAttribute("aria-label",l.name),c.dataset.kind=l.kind;const d=vo()&&Ws(l.kind)?nu.get(l.kind):void 0;if(d)for(let f=0;f<d.length;f++)c.appendChild(d[f]);else c.innerHTML=Yx(l,qd(l.kind));a.appendChild(c),YL(c,l)}a.scrollLeft=0,Ed(),QL(),ou()}function Ed(){const e=document.querySelector(".drawerTop"),t=document.getElementById("drawerBar");!e||!t||(t.classList.toggle("more",e.scrollWidth-e.clientWidth-e.scrollLeft>6),t.classList.toggle("back",e.scrollLeft>6))}document.querySelector(".drawerTop").addEventListener("scroll",Ed,{passive:!0});window.addEventListener("resize",Ed);function Ep(e,t,n){return`<div class="sw">${e.map(s=>`<button class="dot ${s===t?"on":""}" style="background:${s}" data-act="${n}" data-v="${s}"></button>`).join("")}</div>`}let Ci=null,co=!1;function cu(e){if(e===dt){const n=ts();if(!n||n.look2)return;Mn(dt,mi(Ra(n)));return}const t=C.get().characters.find(n=>n.id===e);!t||t.look2||Mn(e,{...mi(Ra(t)),size:t.size})}function dn(){const e=C.get(),t=M("card");if(Ci==="paint"){t.classList.remove("avCard");const n=e.rooms[e.currentRoom],s=Gl.filter(a=>a.kind==="wallpaper"),o=Gl.filter(a=>a.kind==="floor"),i=(a,r,l,c)=>`<button class="dot pat tile ${a.id===r?"on":""}" data-act="${l}" data-v="${a.id}" title="${a.name} (${Ch(a.pack)})" style="background-color:${c};background-image:${wc(a.url)};background-size:48px auto"></button>`;t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${Ep(lL,n.wallpaper,"wall")}
      <h3>Wallpaper</h3><div class="sw">${Ng.map((a,r)=>`<button class="dot pat ${!n.wallTile&&r===n.pattern?"on":""}" data-act="pat" data-v="${r}" style="background-color:${n.wallpaper};background-image:${a};background-size:${r===1?"16px 16px":r===3?"20px 20px":"auto"}"></button>`).join("")}${s.map(a=>i(a,n.wallTile,"wtile",n.wallpaper)).join("")}</div>
      <h3>Floor</h3>${Ep(cL,n.floor,"floor")}
      ${o.length?`<h3>Floor style</h3><div class="sw"><button class="dot pat ${n.floorTile?"":"on"}" data-act="ftile" data-v="" style="background-color:${n.floor};background-image:${Fg}"></button>${o.map(a=>i(a,n.floorTile,"ftile",n.floor)).join("")}</div>`:""}`}else if(Ci==="dress"){t.classList.add("avCard");let n=e,s=ts(),o=s?as({id:dt,...s}):null,i=Te===dt&&o?o:n.characters.find(r=>r.id===Te)??o??n.characters[0];i&&!i.look2&&cu(i.id),n=C.get(),s=ts(),o=s?as({id:dt,...s}):null,i=Te===dt&&o?o:n.characters.find(r=>r.id===Te)??o??n.characters[0];const a=`<div class="picker">${o?`<button class="pk me ${i?.id===dt?"on":""}" data-act="pickc" data-v="${dt}"><div class="face">${bt(o)}</div><span class="meStar">★</span></button>`:""}${n.characters.map(r=>`<button class="pk ${r.id===i?.id?"on":""}" data-act="pickc" data-v="${r.id}"><div class="face">${bt(r)}</div><span class="where" style="background:${Pg(r.room)}"></span></button>`).join("")}${n.characters.length<Co?`<button class="pk add" data-act="newc">${Tg}</button>`:""}</div>`;if(!i){t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${a}<div class="dress"><p class="hint">Tap + to make someone new!</p></div>`;return}Te=i.id,t.innerHTML=Y7(i,a,co,Vt.trash)}}function Lo(e){Ci=e,co=!1,dn(),M("sheet").classList.remove("hidden"),P.swish()}M("sheet").addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(e.target===M("sheet")||t?.dataset.act==="close"){M("sheet").classList.add("hidden"),Ci=null,P.click(),St==="__people"&&Ht();return}if(!t)return;const n=C.get(),s=n.currentRoom,o=t.dataset.v,i=Te??"",a=t.dataset.act;if(a!=="delc"&&(co=!1),a&&a.indexOf("av-")===0){const r=i===dt?ts():C.get().characters.find(d=>d.id===i);if(a==="av-costume"){r&&!r.look2&&cu(i);const d=i===dt?ts():C.get().characters.find(f=>f.id===i);Mn(i,{costume:js(o)??null,...d?.look2?{look2:d.look2}:{},size:d?.size??"kid"}),P.sparkle(),dn(),je(document.querySelector(".avStage"));return}if(a==="av-surprise"){Mn(i,{...mi(Mr()),size:r?.size??"kid"}),P.sparkle(),dn(),je(document.querySelector(".avStage"));return}const l=r?.look2??Ra(r??{}),c=K7(l,a,o??"");if(!c){P.click(),dn();return}Mn(i,{...mi(c),size:r?.size??"kid"}),P.sparkle(),dn(),je(document.querySelector(".avStage"));return}switch(a){case"wall":C.dispatch({type:"room/wallpaper",room:s,color:o});break;case"floor":C.dispatch({type:"room/floor",room:s,color:o});break;case"pat":C.dispatch({type:"room/pattern",room:s,pattern:+o});break;case"wtile":C.dispatch({type:"room/wallTile",room:s,tile:o});break;case"ftile":C.dispatch({type:"room/floorTile",room:s,tile:o||null});break;case"skin":case"hair":case"shirt":case"pants":Mn(i,{[a]:o});break;case"hs":Mn(i,{hairStyle:+o});break;case"acc":Mn(i,{acc:+o});break;case"size":{const r=i===dt?ts():C.get().characters.find(l=>l.id===i);Mn(i,{size:o,...r?.look2?{look2:r.look2}:{}}),en(C.get());break}case"pickc":Te=o,en(C.get()),P.click(),dn();return;case"newc":if(!lu())return;break;case"delc":if(i===dt||!Ot())return;if(!co){co=!0,P.click(),dn();return}co=!1;{const l=Bt.get(i)?.getBoundingClientRect();C.dispatch({type:"char/delete",id:i}),l?Md(l.left+l.width/2,l.top+l.height/2):P.pop()}Te=C.get().characters[0]?.id??null,dn();return}P.sparkle(),dn(),je(document.querySelector(".preview"))});M("tabs").addEventListener("click",e=>{const t=e.target.closest("[data-room]");if(!t)return;const n=t.dataset.room;n!==C.get().currentRoom&&(ot=null,P.swish(),j.classList.remove("swap"),j.offsetWidth,j.classList.add("swap"),C.dispatch({type:"room/switch",room:n}))});M("cats").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");t&&(St=t.dataset.cat,P.click(),Ht())});M("roomFilter").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");if(t){St=t.dataset.cat,P.click(),Ht();return}const n=e.target.closest("[data-rf]");n&&(gd=n.dataset.rf==="all"?"all":"",P.click(),Ht())});xe.addEventListener("pointerdown",e=>e.stopPropagation());xe.addEventListener("click",e=>{const t=e.target.closest("[data-a]");if(!t||!ot)return;if(!Ot()){Hn(null);return}const n=C.get().currentRoom,s=ot,o=ee.querySelector(`.item[data-id="${s}"]`);switch(t.dataset.a){case"smaller":case"bigger":{const i=C.get().rooms[n].items.find(l=>l.id===s);if(!i)break;const a=Rs.indexOf(Is(i.size)),r=t.dataset.a==="smaller"?a-1:a+1;if(r<0||r>=Rs.length)break;C.dispatch({type:"item/size",room:n,id:s,size:Rs[r]}),P.click(),je(o);break}case"flip":C.dispatch({type:"item/flip",room:n,id:s}),P.swish(),je(o);break;case"front":C.dispatch({type:"item/front",room:n,id:s}),P.click(),je(o);break;case"back":C.dispatch({type:"item/back",room:n,id:s}),P.click(),je(o);break;case"delete":{const i=o?.getBoundingClientRect();ot=null,C.dispatch({type:"item/delete",room:n,id:s}),i&&Md(i.left+i.width/2,i.top+i.height/2);break}}});j.addEventListener("pointerdown",e=>{if(e.target.closest(".nudge"))return;Wr();const t=e.clientX,n=le;let s=!1,o=0,i=e.clientX,a=performance.now();gs(e,{edgeScroll:!1,onMove(r){if(Math.abs(r.clientX-t)>6&&(s=!0),!s)return;const l=performance.now();o=(r.clientX-i)/Math.max(1,l-a),i=r.clientX,a=l,Fe(n-(r.clientX-t)/yt())},onUp(){if(!s){ot&&(ot=null,Jt(C.get()));return}if(Zt)return;let r=-o*16/yt();const l=()=>{Math.abs(r)<.3||(Fe(le+r),r*=.92,mo=requestAnimationFrame(l))};mo=requestAnimationFrame(l)}})});j.addEventListener("wheel",e=>{e.preventDefault(),Wr(),Fe(le+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/yt())},{passive:!1});M("nudgeL").addEventListener("pointerdown",e=>{e.stopPropagation(),P.swish(),Ur((xi??le)-ce*.6)});M("nudgeR").addEventListener("pointerdown",e=>{e.stopPropagation(),P.swish(),Ur((xi??le)+ce*.6)});const Cp=M("minimap");Cp.addEventListener("pointerdown",e=>{e.stopPropagation(),e.preventDefault();const t=n=>{const s=Cp.getBoundingClientRect();Ur((n.clientX-s.left)/s.width*me-ce/2)};t(e),P.click(),gs(e,{edgeScroll:!1,onMove:t,onUp(){}})});M("btnPaint").addEventListener("click",()=>{if(!Ot())return Hn(null);Lo("paint")});M("btnDress").addEventListener("click",()=>Lo("dress"));M("btnSound").addEventListener("click",()=>{C.dispatch({type:"settings/sound",on:!C.get().soundOn}),P.click()});document.addEventListener("gesturestart",e=>e.preventDefault());document.addEventListener("contextmenu",e=>e.preventDefault());"serviceWorker"in navigator&&navigator.serviceWorker.register("/kids-house-game/sw.js");window.__store=C;window.__items=Object.fromEntries(wn.filter(e=>e.img).map(e=>[e.kind,{w:e.w,h:ft(e),cat:e.cat,holdable:e.holdable,svg:e.img.includes(".svg")}]));window.__cam={get:()=>le,set:Fe};window.__phoneShowKids=()=>it();window.__avatar={richAvatars:Ga,randomLook2:Mr,look2FromLegacy:Ra,legacyFromLook2:xr,sanitizeLook2:Ti,handsFor:Hr};window.__frameHouseKid=()=>zs(!0);window.__layoutNameTags=()=>eg();window.__lie={bedArt:Cr,lieBedKinds:rm,lieOffset:Da,lieSpot:fm,box(e){const t=Me[e];return t?{w:t.w,h:ft(t)}:null}};window.__paint=()=>{Mt()};const de=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Ot(){return!b||Ie===J||b.canEdit(Pe)}function Hn(e){P.pop();const t=M("houseTag");t.classList.add("show"),t.classList.remove("wiggle"),t.offsetWidth,t.classList.add("wiggle"),window.clearTimeout(ar),ar=window.setTimeout(()=>{S==="house"&&b&&!document.body.classList.contains("own-house")||t.classList.remove("show")},2e3),e&&(e.classList.remove("nope"),e.offsetWidth,e.classList.add("nope")),N("🔒 Look-only house: ask the owner to unlock it!",1800)}const ke=()=>b?.myPresence()??null,ts=()=>b?b.players.get(b.pid)?.look??null:null;function Mn(e,t){if(e===dt){const n=ts();if(!n||!b)return;b.setLook(Di({...n,...t})),Mt(),S==="street"&&rr(),S==="park"&&Ns(),S==="ranch"&&is();return}C.dispatch({type:"char/update",id:e,patch:t})}function Ge(e){b?.setPresence(e)}function JL(e){const t=ke();t&&t.where==="house"&&Ge({...t,room:e})}function du(e){Ie=e,Lg(e),ot=null,setTimeout(()=>Ku.update());for(const t of Object.keys(Ja))delete Ja[t];Te=e===J?e.get().characters[0]?.id??null:dt,Zs(),Ht()}function Cd(e,t,n,s){return`<div class="inner">${bt(e,n,s)}</div><div class="nametag">${de(t)}</div>`}function Mt(){const e=new Set;if(b&&Ie!==J&&S==="house"){const n=C.get().currentRoom,s=[...b.presence.entries()],o=ke();o&&s.push([b.pid,o]);for(const[i,a]of s){const r=b.players.get(i);if(!r||a.where!=="house"||a.houseId!==Pe||a.room!==n)continue;e.add(i);let l=Ps.get(i);(!l||!l.isConnected)&&(l=document.createElement("div"),l.className="char avatar "+(i===b.pid?"mine":"other"),l.dataset.pid=i,ee.appendChild(l),Ps.set(i,l),i===b.pid?eE(l):l.addEventListener("pointerdown",y=>{y.preventDefault(),y.stopPropagation()}));const c=r.look,d=In(i,a),f=d?.pose??null,h=hi(C.get())===i,g=JSON.stringify(c)+r.nickname+(f||"")+(h?"h":"");if(l.dataset.look!==g){const y=l.querySelector(".bubble");l.innerHTML=Cd(c,r.nickname,f,h),y&&l.appendChild(y),l.dataset.look=g}l.classList.toggle("holding",h);const m=Vs[c.size]??1,k=xt(n,d,a);Ks(l,k.x,k.y,ps*m,yn*m);const $=d&&C.get().rooms[n].items.find(y=>y.id===d.item);if(l.style.zIndex=String($?1e3+$.z+1+d.n:5e3+Math.round(a.y)),l.classList.toggle("flipped",a.flip),l.classList.toggle("pose-sit",f==="sit"),l.classList.toggle("pose-lie",f==="lie"),l.classList.toggle("pose-lie-r",f==="lie"&&!!$?.flip),Oi(l,c,i===b.pid),h){const y=Nh(c,f);y?Jg("avatar",i,l,y,k.y):Xg("avatar",i)}}}const t=hi(C.get());b&&S==="house"&&t&&e.has(t)||Kg("avatar");for(const[n,s]of Ps)(!e.has(n)||!s.isConnected)&&(e.has(n)||s.remove(),Ps.delete(n));vd(),Xs(),Qr(),Fs()}function eE(e){e.addEventListener("pointerdown",t=>{if(t.preventDefault(),t.stopPropagation(),Zt||!b)return;const n=ke();if(!n||n.where!=="house")return;const s=Dt(t.clientX,t.clientY),o=xt(C.get().currentRoom,In(b.pid,n),n),i={x:o.x-s.x,y:o.y-s.y};let a=o.x,r=!1;e.classList.add("lifted"),P.pick(),Li=!0,gs(t,{onMove(l){const c=Dt(l.clientX,l.clientY),d=ke();if(!d||d.where!=="house"||(Math.hypot(c.x-s.x,c.y-s.y)>6&&(r=!0),!r))return;const f=Math.max(40,Math.min(me-40,c.x+i.x)),h=Math.max(xo+40,Math.min(Qe,c.y+i.y)),g=Math.abs(f-a)>3?f<a:d.flip;Math.abs(f-a)>3&&(a=f),Ea(d,f,h,g,null),Mt(),tr(C.get()),Re.isPlay()&&(Mi=er(l.clientX,l.clientY)?.id??null)},onUp(l){Li=!1,Mi=null,e.classList.remove("lifted");const c=ke();if(!r||!c||c.where!=="house"){P.click();return}const d=Dt(l.clientX,l.clientY),f=Math.max(40,Math.min(me-40,d.x+i.x)),h=Math.max(xo+40,Math.min(Qe,d.y+i.y));if(Re.isPlay()){const g=er(l.clientX,l.clientY),m=yi({mode:"play",via:"drag",releaseX:f,releaseY:h,piece:g?Vr(g):null,occupied:Ei(void 0,b.pid)}),k=m.seat?{id:m.seat.item,pose:m.seat.pose,n:m.seat.n}:null;Ea(c,m.x,m.y,c.flip,k)}else Ea(c,f,h,c.flip,null);Mt(),tr(C.get()),P.drop(),je(e),requestAnimationFrame(()=>zs(!0))}})})}function tE(e){return e.kind==="text"?e.v:(e.kind==="phrase"?ai:hh)[e.v]??""}function Ao(){const e=document.querySelectorAll(".bubble");if(!document.body.classList.contains("phone")){e.forEach(s=>{(s.style.marginLeft||s.style.marginTop)&&(s.style.marginLeft="",s.style.marginTop="")});return}const t=j.getBoundingClientRect(),n=yt()||1;e.forEach(s=>{s.style.marginLeft="0px",s.style.marginTop="0px";const o=s.getBoundingClientRect();let i=0;o.width>=t.width-8||o.left<t.left+4?i=t.left+4-o.left:o.right>t.right-4&&(i=t.right-4-o.right);let a=0;o.top<t.top+4?a=t.top+4-o.top:o.bottom>t.bottom-4&&(a=t.bottom-4-o.bottom),i&&(s.style.marginLeft=i/n+"px"),a&&(s.style.marginTop=a/n+"px")})}function nE(e,t){const n=S==="street"?document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`):S==="park"?document.querySelector(`#pavatars .savatar[data-pid="${e}"]`):S==="ranch"?document.querySelector(`#ravatars .savatar[data-pid="${e}"]`):S==="gameroom"?document.querySelector(`#gavatars .savatar[data-pid="${e}"]`):Ps.get(e),s=n?[n]:[];for(const o of s){o.querySelector(".bubble")?.remove();const i=document.createElement("div");i.className="bubble"+(t.kind==="emote"?" emote":""),i.textContent=tE(t),o.appendChild(i),Ao(),setTimeout(()=>i.classList.add("out"),4600),setTimeout(()=>i.remove(),5e3)}e!==b?.pid&&P.click()}function qr(){const e=ke();if(!b||!e)return 0;let t=0;return b.presence.forEach(n=>{K1(e,n)&&t++}),t}function Xs(){const e=qr();M("btnChat").classList.toggle("glow",e>0),Zr();const t=document.getElementById("chatNear");t&&(t.textContent=e?`${e} friend${e>1?"s":""} nearby can hear you`:"Walk closer to a friend to talk!",M("chatTray").classList.toggle("nobody",!e))}function fu(){const e=M("chatTray");if(!b)return;const t=document.body.classList.contains("phone"),n=`<div class="phrases">${ai.map((a,r)=>`<button data-phrase="${r}">${de(a)}</button>`).join("")}</div>`,s=b.settings.freeChat?`<form class="typed" id="chatForm"><input id="chatInput" maxlength="${Zc}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>`:'<div class="presetsOnly">Picking from the bubbles above 💬</div>',o=t?'<button type="button" class="chatMore" data-chat="more">more</button>':"";e.innerHTML=`<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${hh.map((a,r)=>`<button data-emote="${r}">${a}</button>`).join("")}</div>
    ${o}
    <div class="chatExtra${t?" hidden":""}">${n}${s}</div>`,Xs(),document.getElementById("chatForm")?.addEventListener("submit",a=>{a.preventDefault();const r=M("chatInput"),l=W1(r.value);if(!l.ok){M("chatWarn").textContent=Sr[l.reason]??"",P.pop();return}if(!qr()){N("Walk closer to a friend to talk!");return}b.say({kind:"text",v:l.text}),r.value="",M("chatWarn").textContent="",r.blur()})}M("chatTray").addEventListener("click",e=>{const t=e.target;if(!b)return;if(t.closest('[data-chat="close"]')){M("chatTray").classList.add("hidden");return}const n=t.closest('[data-chat="more"]');if(n){const i=M("chatTray").querySelector(".chatExtra");i?.classList.toggle("hidden"),n.textContent=i&&!i.classList.contains("hidden")?"less":"more";return}const s=t.closest("[data-emote]"),o=t.closest("[data-phrase]");if(!(!s&&!o)){if(!qr()){N("Walk closer to a friend to talk!");return}b.say(s?{kind:"emote",v:+s.dataset.emote}:{kind:"phrase",v:+o.dataset.phrase}),P.click()}});M("btnChat").addEventListener("click",()=>{M("chatTray").classList.toggle("hidden")||(fu(),P.swish())});function bn(){const e=document.body.classList,n=!!b&&Ie!==J&&S==="house"?b.houses.get(Pe):void 0,s=!!n&&n.meta.ownerId===b.pid;if(e.toggle("mode-hood",!!b),e.toggle("view-street",S!=="house"),e.toggle("view-park",S==="park"),e.toggle("view-ranch",S==="ranch"),e.toggle("view-map",S==="street"),e.toggle("view-gameroom",S==="gameroom"),e.toggle("in-barn",S==="ranch"&&Oe),e.toggle("mode-play",S==="house"&&Re.isPlay()),zd(),bu(),e.toggle("own-house",s),e.toggle("locked",!!n&&!Ot()),e.toggle("has-hood",!!Pr()),Zr(),n){const o=b.players.get(n.meta.ownerId)?.nickname??"";M("houseTag").innerHTML=`${n.meta.locked?"🔒 ":""}<b>${de(n.meta.name)}</b>${s?" · yours":o?" · "+de(o):""}`;const i=M("lockIco");i&&(i.innerHTML=n.meta.locked?Pt.lockOn:Pt.lockOff);const a=n.meta.locked?"Unlock my house":"Lock my house";M("btnLock").setAttribute("aria-label",n.meta.locked?"Unlock house":"Lock house");const r=M("lockLabel");r&&(r.textContent=a)}Xs(),sE(),document.body.classList.contains("phone")&&Ag()}let xl="",ar=0;function sE(){const e=M("houseTag"),t=!!b&&S==="house"&&!document.body.classList.contains("own-house");if(S!=="house"||!b){xl="",e.classList.remove("show");return}if(t){e.classList.add("show");return}const n=Pe||"solo";xl!==n&&(xl=n,e.classList.add("show"),window.clearTimeout(ar),ar=window.setTimeout(()=>e.classList.remove("show"),2e3))}M("btnLock").addEventListener("click",()=>{const e=b?.houses.get(Pe);!e||e.meta.ownerId!==b.pid||(b.lock(e.meta.id,!e.meta.locked),P.click(),N(e.meta.locked?"Unlocked: friends can decorate!":"Locked: friends can look but not change things"))});const kt=new Map;let Sp="",Mc=0,qe={w:Bn,h:An,portrait:!1};function oE(){return document.body.classList.contains("phone-portrait")?!0:document.body.classList.contains("phone")?!1:window.innerHeight>=window.innerWidth*1.25}function pu(){const e=M("street"),t=qe.portrait&&!document.body.classList.contains("phone")?24:0,n=Math.max(1,e.clientWidth-t),s=Math.max(1,e.clientHeight-t);return Math.min(n/qe.w,s/qe.h)}function iE(e){const t=M("street"),n=M("mapWorld"),s=qe.w*e,o=qe.h*e;n.style.marginLeft=Math.max(0,Math.floor((t.clientWidth-s)/2))+"px",n.style.marginTop=Math.max(0,Math.floor((t.clientHeight-o)/2))+"px",t.scrollLeft=0,t.scrollTop=0,hu()}function hu(){const e=M("street"),t=M("mapWorld"),n=4,s=e.clientWidth-n,o=e.clientHeight-n,i=t.offsetLeft,a=t.offsetTop;t.querySelectorAll(".mapSign").forEach(r=>{r.style.transform="translateX(-50%)";const l=r.offsetWidth,c=r.offsetHeight,d=i+r.offsetLeft-l/2,f=a+r.offsetTop;let h=0,g=0;d<n&&(h=n-d),d+l+h>s&&(h-=d+l+h-s),f<n&&(g=n-f),f+c+g>o&&(g-=f+c+g-o),aE(r,h,g,i,a,n,s,o)})}function aE(e,t,n,s,o,i,a,r){const l=[...e.parentElement.querySelectorAll(".mapMail")],c=()=>{const f=e.offsetWidth,h=e.offsetHeight,g=s+e.offsetLeft-f/2+t,m=o+e.offsetTop+n;return{left:g,top:m,right:g+f,bottom:m+h,width:f,height:h}};for(let f=0;f<6;f++){const h=c(),g=l.find(_=>{const T=s+_.offsetLeft,A=o+_.offsetTop,H=T+_.offsetWidth,F=A+_.offsetHeight;return h.right>T+2&&h.left<H-2&&h.bottom>A+2&&h.top<F-2});if(!g)break;const m=s+g.offsetLeft,k=o+g.offsetTop,$=k+g.offsetHeight,y=c(),u=$+4-y.top,w=y.bottom-(k-4);y.top+u+y.height<=r?n+=u:y.top-w>=i?n-=w:t-=Math.min(y.right,m+g.offsetWidth)-Math.max(y.left,m)+6}const d=c();d.left<i&&(t+=i-d.left),d.right>a&&(t-=d.right-a),d.top<i&&(n+=i-d.top),d.bottom>r&&(n-=d.bottom-r),e.style.transform=Math.abs(t)>.5||Math.abs(n)>.5?`translate(calc(-50% + ${t.toFixed(1)}px), ${n.toFixed(1)}px)`:"translateX(-50%)"}document.fonts?.ready.then(()=>{S==="street"&&hu()});function rE(){return b?[...b.houses.values()].map(e=>e.meta).sort((e,t)=>e.slot-t.slot):[]}function lE(e){const s=Math.round(97.5),o=Math.max(1,Math.ceil(e/(e===1?1:2))),i=158,a=318,l=a+(o-1)*i+s/2+108,c=Math.max(1020,l+78),d=Math.max(l,Math.min(c-88,Math.round(c*.74))),f=e===1?[280]:[150,410],h=e===1?1:2,g=Array.from({length:e},(m,k)=>({x:f[k%h],y:a+Math.floor(k/h)*i}));return{w:560,h:c,hw:104,hh:s,houses:g,square:{x:280,y:d},park:{x:96,y:122},club:{x:280,y:116},ranch:{x:458,y:120}}}function Pp(e,t,n,s){return!e||e.mine||!Jh()?"":`<button class="mapKnock" data-knock="${e.id}" aria-label="Knock at ${de(e.name)} for a treat" style="left:${s(t)};top:${s(n)}"><span>🎃</span></button>`}const Tp=new Map;function gu(){const e=M("street");let t=document.getElementById("candyBucket");if(!Jh()){t?.remove();return}t||(t=document.createElement("div"),t.id="candyBucket",t.className="candyBucket",t.setAttribute("aria-live","polite"),e.appendChild(t));const n=Xh(localStorage);t.innerHTML=`<span class="pail">🎃</span><b>${n}</b>`,t.setAttribute("aria-label",`${n} treats in your bucket`)}function cE(e){const{treat:t}=vM(localStorage);gu(),je(e),P.pop();const n=document.createElement("span");n.className="treatPop",n.textContent=t,e.appendChild(n),setTimeout(()=>n.remove(),900);const s=document.getElementById("candyBucket");s&&je(s),b&&b.knock(e.dataset.knock)}function Ts(e=!1){if(S!=="street")return;const t=M("mapWorld"),n=rE(),s=b?n.map(h=>({id:h.id,name:h.name,style:h.style,locked:h.locked,mine:h.ownerId===b.pid,lit:!!b.players.get(h.ownerId)?.online})):Mc?Array.from({length:Mc},(h,g)=>({id:"fake"+g,name:["Reagan","Quinn","Chloe","Sloane","Cada","Emma","Olivia","Charlotte","Amelia","Sophia","Isabella","Mia"][g%12]+"'s House",style:g,locked:g===3,mine:g===0,lit:g%3!==1})):[null],o=oE()?lE(Math.max(1,s.length)):null;qe=o?{w:o.w,h:o.h,portrait:!0}:{w:Bn,h:An,portrait:!1},document.body.classList.toggle("map-tall",!!o&&!document.body.classList.contains("phone"));const i=pu(),a=(qe.portrait?"P":"L")+qe.w+"x"+qe.h+":"+i.toFixed(3)+JSON.stringify(n)+(b?n.map(h=>(b.players.get(h.ownerId)?.online?1:0)+(Ml(h.id)?"u":"")).join("")+b.pid:"solo");if(!e&&a===Sp&&t.querySelector("#mapFaces")){rr();return}Sp=a,t.style.width=qe.w*i+"px",t.style.height=qe.h*i+"px",t.style.setProperty("--sc",String(i)),t.innerHTML=`<div class="mapClip">${o?n0(o.w,o.h):t0()}</div>`;const r=t.querySelector(".mapClip"),l=h=>h*i+"px";kt.clear();const c=s.length;let d="",f="";if(o){const{hw:h,hh:g}=o,m=34,k=40;s.forEach((w,_)=>{const T=o.houses[_]??o.houses[0],A=w?`house:${w.id}`:"home",H=w?w.name:"My House";kt.set(w?"house:"+w.id:"home",{x:T.x,y:T.y-g/2-8});const F=!!(w&&Ml(w.id)),q=T.x<o.w/2,se=q?Math.max(4,T.x-h/2-m-8):Math.min(o.w-m-4,T.x+h/2+8),K=Math.max(4,Math.min(o.h-k-4,T.y-g*.42));d+=`<button class="mapSpot mapHouse ${w?.mine||!w?"mine":""}" data-go="${A}" aria-label="${de(H)}" style="left:${l(T.x-h/2)};top:${l(T.y-g/2)};width:${l(h)};height:${l(g)}">${qa(w?w.style:0,{lit:w?w.lit:!0})}${w?.locked?'<span class="lockBadge">🔒</span>':""}${w?.mine||!w?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${F?"up":""}" data-mail="${w?w.id:"home"}" aria-label="${de(H)} mailbox" style="left:${l(se)};top:${l(K)};width:${l(m)};height:${l(k)}">${_f(F)}</button>${Pp(w,q?T.x+h/2-30:T.x-h/2-10,T.y+g*.12,l)}`,f+=`<div class="mapSign ${w?.mine||!w?"mine":""}" style="left:${l(T.x)};top:${l(T.y+g/2+2)}">${de(H)}</div>`});const $=(w,_,T,A,H,F,q,se,K)=>{d+=`<button class="mapSpot ${w}" data-go="${_}" aria-label="${T}" style="left:${l(H-q/2)};top:${l(F-se/2)};width:${l(q)};height:${l(se)}">${A}</button>`,f+=`<div class="mapSign place" style="left:${l(H)};top:${l(F+K)}">${T==="The park"?"Park":T==="Rainbow Ranch"?"Rainbow Ranch":"Clubhouse"}</div>`};$("mapPark","park","The park",Gd,o.park.x,o.park.y,148,126,68),$("mapRanch","ranch","Rainbow Ranch",Yd,o.ranch.x,o.ranch.y,156,128,72),$("mapClub","gameroom","The clubhouse",Kd,o.club.x,o.club.y,146,120,68),kt.set("park",{x:o.park.x,y:o.park.y-78}),kt.set("ranch",{x:o.ranch.x,y:o.ranch.y-80}),kt.set("barn",{x:o.ranch.x,y:o.ranch.y+8}),kt.set("gameroom",{x:o.club.x,y:o.club.y-74}),kt.set("square",o.square);const y=[{x:o.park.x,y:o.park.y,r:90},{x:o.ranch.x,y:o.ranch.y,r:96},{x:o.club.x,y:o.club.y,r:88},{x:o.square.x,y:o.square.y,r:70},...o.houses.map(w=>({x:w.x,y:w.y,r:78}))],u=o.w/2;r.insertAdjacentHTML("beforeend",jd(y,(w,_)=>Math.abs(w-u)<34,o.w,o.h)+i0(o.w,o.h,y)+d+'<div class="mapFaces" id="mapFaces"></div>')}else{const h=t.querySelector("#mapRoad"),g=h.getTotalLength(),m=Array.from({length:160},(_,T)=>h.getPointAtLength(g*T/159)),k=(_,T)=>m.some(A=>Math.hypot(A.x-_,A.y-T)<50),$=Lc(),y=c>8?80:94,u=y*300/320,w=uu(h,c,$);s.forEach((_,T)=>{const A=w[T],H=_?`house:${_.id}`:"home",F=_?_.name:"My House";kt.set(_?"house:"+_.id:"home",{x:A.x,y:A.y-u/2-4});const q=!!(_&&Ml(_.id)),se=34,K=40,fe=14/i,an=Math.max(4,Math.min(Bn-se-4,A.x+y/2+fe)),Wt=Math.max(4,Math.min(An-K-4,A.y-u*.22));d+=`<button class="mapSpot mapHouse ${_?.mine||!_?"mine":""}" data-go="${H}" aria-label="${de(F)}" style="left:${l(A.x-y/2)};top:${l(A.y-u/2)};width:${l(y)};height:${l(u)}">${qa(_?_.style:0,{lit:_?_.lit:!0})}${_?.locked?'<span class="lockBadge">🔒</span>':""}${_?.mine||!_?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${q?"up":""}" data-mail="${_?_.id:"home"}" aria-label="${de(F)} mailbox" style="left:${l(an)};top:${l(Wt)};width:${l(se)};height:${l(K)}">${_f(q)}</button>${Pp(_,Math.max(4,A.x-y/2-40/i),A.y-u*.05,l)}`,f+=`<div class="mapSign ${_?.mine||!_?"mine":""}" style="left:${l(A.x)};top:${l(A.y+u/2-2)}">${de(F)}</div>`}),d+=`<button class="mapSpot mapPark" data-go="park" aria-label="The park" style="left:${l(Qn.x-100)};top:${l(Qn.y-85)};width:${l(200)};height:${l(170)}">${Gd}</button>`,f+=`<div class="mapSign place" style="left:${l(Qn.x)};top:${l(Qn.y+70)}">Park</div>`,d+=`<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${l(cn.x-110)};top:${l(cn.y-90)};width:${l(220)};height:${l(180)}">${Yd}</button>`,f+=`<div class="mapSign place" style="left:${l(cn.x)};top:${l(cn.y+78)}">Rainbow Ranch</div>`,d+=`<button class="mapSpot mapClub" data-go="gameroom" aria-label="The clubhouse" style="left:${l(zn.x-95)};top:${l(zn.y-78)};width:${l(190)};height:${l(156)}">${Kd}</button>`,f+=`<div class="mapSign place" style="left:${l(zn.x)};top:${l(zn.y+82)}">Clubhouse</div>`,kt.set("park",{x:Qn.x,y:Qn.y-60}),kt.set("ranch",{x:cn.x-30,y:cn.y-60}),kt.set("barn",{x:cn.x+10,y:cn.y+10}),kt.set("gameroom",{x:zn.x,y:zn.y-52}),r.insertAdjacentHTML("beforeend",jd($,k)+d+'<div class="mapFaces" id="mapFaces"></div>')}t.insertAdjacentHTML("beforeend",f),gu(),rr(),iE(i)}const Lc=()=>[{x:Qn.x,y:Qn.y,r:115},{x:cn.x,y:cn.y,r:125},{x:fn.x,y:fn.y,r:100},{x:zn.x,y:zn.y,r:90}];function uu(e,t,n){const s=e.getTotalLength(),o=[];for(let i=0;i<t;i++){const a=t===1?.2:.05+.75*i/(t-1),r=e.getPointAtLength(s*a),l=e.getPointAtLength(Math.min(s,s*a+3));let c=-(l.y-r.y),d=l.x-r.x;const f=Math.hypot(c,d)||1;c/=f,d/=f;const h=[1,-1].map(k=>({x:r.x+c*72*k,y:r.y+d*72*k})).map(k=>({...k,score:Math.min(...n.map($=>Math.hypot($.x-k.x,$.y-k.y)-$.r),k.x-50,Bn-50-k.x,k.y-60,An-40-k.y)})),g=i%2?h:[h[1],h[0]],m=g[0].score>0||g[0].score>=g[1].score?g[0]:g[1];m.x=Math.max(60,Math.min(Bn-60,m.x)),m.y=Math.max(62,Math.min(An-72,m.y)),n.push({x:m.x,y:m.y,r:70}),o.push({x:m.x,y:m.y})}return o}window.__mapFake=e=>{Mc=e,Ts(!0)};window.__mapLayout=e=>{const t=document.querySelector("#mapRoad");if(!t)return null;const n=uu(t,e,Lc());let s=1e9,o=1e9,i=!0;return n.forEach((a,r)=>{n.forEach((l,c)=>{c>r&&(s=Math.min(s,Math.hypot(a.x-l.x,a.y-l.y)))}),Lc().forEach(l=>{o=Math.min(o,Math.hypot(a.x-l.x,a.y-l.y)-l.r)}),(a.x<55||a.x>Bn-55||a.y<60||a.y>An-70)&&(i=!1)}),{n:e,minHouse:s,minSpot:o,inside:i}};function mu(e){return e.where==="house"&&e.houseId?{kind:"house",houseId:e.houseId,room:e.room}:e.where==="park"||e.where==="ranch"||e.where==="barn"||e.where==="gameroom"?{kind:e.where}:{kind:"square"}}const dE=e=>e.kind==="house"?"house:"+e.houseId:e.kind;function rr(){const e=document.getElementById("mapFaces");if(!e||S!=="street")return;const t=pu(),n=new Set,s=[];if(b){const i=[...b.presence.entries()],a=ke();a&&i.push([b.pid,a]);for(const[r,l]of i){const c=b.players.get(r);c&&s.push({key:r,look:c.look,name:c.nickname,mine:r===b.pid,place:mu(l)})}}else{const i=J.get().characters[0];i&&s.push({key:"solo",look:Di(i),name:"You",mine:!0,place:{kind:"square"}})}const o=new Map;for(const i of s){const a=dE(i.place);o.has(a)||o.set(a,[]),o.get(a).push(i)}for(const[i,a]of o)a.sort((r,l)=>r.mine?-1:l.mine?1:r.name.localeCompare(l.name)),a.forEach((r,l)=>{let c,d;const f=kt.get("square")??{x:fn.x,y:fn.y};if(i==="square")if(qe.portrait){const y=Math.floor(l/3),u=l%3,w=Math.min(3,a.length-y*3);c=f.x+(u-(w-1)/2)*176,d=f.y+y*112}else if(a.length===1)c=fn.x,d=fn.y;else{const k=-Math.PI/2+l*(Math.PI*2/a.length);c=fn.x+Math.cos(k)*78,d=fn.y+Math.sin(k)*78}else{const k=kt.get(i)??f,$=qe.portrait?2:3,y=qe.portrait?150:64,u=Math.floor(l/$),w=l%$,_=Math.min($,a.length-u*$);c=k.x+(w-(_-1)/2)*y,d=k.y-u*(qe.portrait?108:64)}qe.portrait&&(c=Math.max(100,Math.min(qe.w-100,c)),d=Math.max(48,Math.min(qe.h-84,d))),n.add(r.key);let h=e.querySelector(`.mapFace[data-pid="${r.key}"]`);h||(h=document.createElement("button"),h.className="mapFace "+(r.mine?"mine":"other"),h.dataset.pid=r.key,h.setAttribute("aria-label",r.mine?"You":r.name),e.appendChild(h));const g=JSON.stringify(r.look)+r.name;if(h.dataset.look!==g){const k=h.querySelector(".bubble");h.innerHTML=`<span class="face">${Rc(bt(r.look))}</span><span class="fname">${de(r.mine?"You":r.name)}</span>`,k&&h.appendChild(k),h.dataset.look=g}h.dataset.place=i;const m=qe.portrait?62:46;h.style.left=(c-m/2)*t+"px",h.style.top=(d-m/2)*t+"px",h.style.width=h.style.height=m*t+"px"});e.querySelectorAll(".mapFace").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),Xs()}function Sd(){M("mapWorld").classList.remove("zoomIn")}function yu(e,t){Sd(),P.swish(),fE(e)}function Qi(e){To()||(e.classList.remove("sceneIn"),e.offsetWidth,e.classList.add("sceneIn"),setTimeout(()=>e.classList.remove("sceneIn"),260))}function fE(e){e.kind==="house"?wu(e.houseId,e.room):e.kind==="home"?ku():e.kind==="park"?wE():e.kind==="ranch"?Pi(!1):e.kind==="barn"?Pi(!0):e.kind==="gameroom"&&_E()}function pE(e){const t=b?.presence.get(e);if(!b||!t)return;const n=mu(t),s=b.players.get(e)?.nickname??"your friend";if(n.kind==="square"){N(`${s} is on the map too! 👋`),P.pop();return}document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`),yu(n),setTimeout(()=>{const o=ke();if(!o||!b)return;const i=t.x+(t.x>300?-110:110);if(n.kind==="house"&&o.where==="house")Ge({...o,x:i,y:t.y}),Mt(),Ur(i-ce/2);else if((n.kind==="park"||n.kind==="ranch"||n.kind==="barn")&&o.where===n.kind){tn({...o,x:i,y:Math.max(Bs,Math.min(Dn,t.y)),flip:i>t.x});const a=n.kind==="park"?us():on(),r=M(n.kind==="park"?"parkScroll":"ranchScroll");requestAnimationFrame(()=>{r.scrollLeft=t.x*a-r.clientWidth/2,it()})}else if(n.kind==="gameroom"&&o.where==="gameroom"){const a=Ro();a||tn({where:"gameroom",x:i,y:Math.max(Bs,Math.min(Dn,t.y)),flip:i>t.x});const r=fs(),l=M("grScroll"),c=a?.x??t.x;requestAnimationFrame(()=>{l.scrollLeft=c*r-l.clientWidth/2,it()})}N(`You found ${s}! 💕`)},420)}function Ml(e){if(!b)return!1;const t=b.houses.get(e);return!!t&&t.meta.ownerId===b.pid&&Oc(t.confirmed.mailbox)>0}let fa=0;function bu(){Dg();const e=document.getElementById("mailCue"),t=b?.myHouseId()??"",n=b&&t?Oc(b.houses.get(t)?.confirmed.mailbox):0;if(!b||S!=="street"||n<=0){n<=0&&(fa=0),e?.classList.remove("show");return}fa!==n&&(fa=n,e?.classList.add("show"),window.setTimeout(()=>{fa===n&&e?.classList.remove("show")},8e3))}function Zr(){const e=b?.myHouseId()??"",t=b&&e?Oc(b.houses.get(e)?.confirmed.mailbox):0,n=M("menuBadge");n.textContent=t>9?"9+":String(t),n.classList.toggle("on",t>0);const s=document.getElementById("mailNew");s&&(s.textContent=t>0?t===1?"1 new":t+" new":"",s.classList.toggle("on",t>0));const o=b?b.presence.size:0,i=M("mapBadge");i.textContent=o>9?"9+":String(o),i.classList.toggle("on",o>0),M("btnMap").setAttribute("aria-label",o>0?`Map, ${o} friends online`:"Map");const a=qr(),r=M("chatBadge");r.textContent=a>9?"9+":String(a),r.classList.toggle("on",a>0)}function lr(e){e&&document.querySelectorAll(".toast").forEach(t=>t.remove()),M("menuPop").classList.toggle("hidden",!e),M("btnMenu").setAttribute("aria-expanded",e?"true":"false"),M("btnPhoto").classList.toggle("ok",S==="house"),e&&Zr(),hE()}M("btnPhoto").addEventListener("click",()=>{lr(!1),requestAnimationFrame(()=>requestAnimationFrame(()=>{uM(j,()=>P.click())}))});function hE(){const e=M("houseTag");if(e.style.top="",!e.classList.contains("show")||M("menuPop").classList.contains("hidden"))return;const t=document.querySelector(".menuCard");if(!t)return;const n=M("stageWrap").getBoundingClientRect(),s=t.getBoundingClientRect(),o=e.getBoundingClientRect();if(!(o.top<s.bottom-2&&o.bottom>s.top+2&&o.left<s.right-2&&o.right>s.left+2))return;const a=s.bottom-n.top+8;a+o.height<n.height-8?e.style.top=a+"px":e.style.top=Math.max(8,n.height-o.height-10)+"px"}M("btnMenu").addEventListener("click",()=>{lr(M("menuPop").classList.contains("hidden")),P.click()});M("menuPop").addEventListener("click",e=>{const t=e.target;if(t.id==="menuPop"||t.closest("#menuClose")){lr(!1);return}t.closest(".menuRow")&&lr(!1)});M("btnMail").addEventListener("click",()=>{const e=b?.myHouseId();e?Pd(e):N("Join a street to send letters!")});M("secrets").addEventListener("click",()=>{if(S!=="house"){N("Surprises are hiding in your house!");return}Re.isPlay()&&M("modeDecorate").click(),St="secrets",Ht(),N("Surprises are in your drawer!")});function Pd(e){if(!b||e==="home"||!b.houses.has(e)){N("Join a street to send letters!");return}const t=b.houses.get(e);La.open(e,t.meta.name,t.meta.ownerId===b.pid,t.confirmed.mailbox?.letters??[]),P.click()}M("mapWorld").addEventListener("click",e=>{const t=e.target;if(S!=="street")return;const n=t.closest(".mapKnock");if(n){cE(n);return}const s=t.closest(".mapMail");if(s){Pd(s.dataset.mail||"home");return}const o=t.closest(".mapFace");if(o){o.classList.contains("mine")?(je(o),P.pop(),N("That's you! Tap a place to go there")):pE(o.dataset.pid);return}const i=t.closest("[data-go]");if(!i)return;const a=i.dataset.go;yu(a.startsWith("house:")?{kind:"house",houseId:a.slice(6)}:{kind:a})});function Js(){Sd(),M("street").classList.add("hidden"),M("park").classList.add("hidden"),M("ranch").classList.add("hidden"),M("gameroom").classList.add("hidden"),xa()?.close(),M("chatTray").classList.add("hidden"),M("sheet").classList.add("hidden")}function yo(){Sd(),He=null,$t=[],Oe=!1,b?Ge({where:"street",x:600,y:540,flip:!1}):It=null,Js(),S="street",M("street").classList.remove("hidden"),M("streetTitle").textContent=b?"Our Neighborhood":"My Map",bn(),Ts(!0);const e=M("mapWorld");e.style.transformOrigin="50% 50%",e.classList.remove("zoomIn","mapIn"),To()||(e.offsetWidth,e.classList.add("mapIn")),P.swish()}function ku(){if(b){const e=b.myHouseId();e&&b.houses.has(e)&&wu(e);return}Js(),S="house",It=null,Re.sync(!0),bn(),Zs(),Qi(M("stageWrap")),P.sparkle(),rs()}function wu(e,t="living"){if(!b||!b.houses.has(e))return;Pe=e,S="house",Oe=!1,Re.sync(e===b.myHouseId());let n=Xa.get(e);n||(n=e2(b,e,{get:()=>J.get().soundOn,set:s=>J.dispatch({type:"settings/sound",on:s})}),Xa.set(e,n)),n.dispatch({type:"room/switch",room:t}),Ge({where:"house",houseId:e,room:t,x:900+Math.random()*300,y:540,flip:!1}),Js(),du(n),Qi(M("stageWrap")),P.sparkle(),rs()}function Td(){b?.close(),b=null,Xa=new Map,S="house",Pe="",It=null,He=null,$t=[],Oe=!1,M("elsewhere").classList.add("hidden"),Js(),Re.sync(!0),du(J),bn()}M("btnMap").addEventListener("click",()=>{if(S==="street"){P.pop();return}yo()});M("btnHome").addEventListener("click",()=>{if(S==="house"&&(!b||Pe===b.myHouseId())){P.pop();return}ku()});M("phoneOk").addEventListener("click",()=>{M("phoneNote").classList.add("hidden"),P.click()});M("elsewhereGo").addEventListener("click",()=>{P.click(),b?.connect()});M("btnSolo").addEventListener("click",()=>{Td(),N("Playing in your own house 🏠")});window.addEventListener("resize",()=>{S==="street"&&Ts(!0),S==="park"&&Ad(),S==="ranch"&&Vd(),S==="gameroom"&&dd(),it()});function Rd(e){b=e,Xa=new Map,e.on("players",()=>{b===e&&(S==="street"?Ts():S==="park"?Ns():S==="ranch"?(is(),zd()):S==="gameroom"?pi():(Mt(),bn()),Ci==="dress"&&dn())}),e.on("houses",()=>{b===e&&(S==="street"?Ts():S==="house"&&!e.houses.has(Pe)&&(N("That house is gone now"),yo()))}),e.on("houseMeta",t=>{b!==e||t!==Pe||S!=="house"||(ot=null,bn(),Jt(C.get()),Ht(),Ot()||M("sheet").classList.add("hidden"))}),e.on("pres",()=>{b===e&&(S==="street"?rr():S==="park"?Ns():S==="ranch"?is():S==="gameroom"?pi():Mt())}),e.on("ranch",()=>{b===e&&S==="ranch"&&Kr(!0)}),e.on("ranchFail",t=>{b===e&&Cc(t)}),e.on("noride",()=>{if(b!==e)return;const t=ke();if(t?.ride!==void 0){const{ride:n,...s}=t;Ge(s),is()}N("Someone is riding that horse!")}),e.on("fx",(t,n)=>{b===e&&qE(t,n)}),e.on("bubble",(t,n)=>{b===e&&nE(t,n)}),e.on("knocked",(t,n)=>{if(b!==e)return;const s=Date.now();(Tp.get(n)??0)>s-2e4||(Tp.set(n,s),N(_M(n)))}),e.on("sayFail",t=>N(t==="presetsOnly"?"Typing is turned off: pick a bubble!":Sr[t]||"Couldn't send that")),e.on("mailbox",()=>{b===e&&(S==="street"&&Ts(!0),bu(),La.refresh(),Zr())}),e.on("mailFail",t=>{b===e&&La.fail(t)}),e.on("settings",()=>{b===e&&(M("chatTray").classList.contains("hidden")||fu(),La.refresh())}),e.on("removed",()=>{N("A grown-up took this iPad off the street");const t=e.cfg;Tn({url:t.url,code:t.code,id:t.id,parentKey:t.parentKey}),Td()}),e.on("status",t=>{b===e&&(document.body.classList.toggle("reconnecting",t!=="online"&&!e.replaced),(t==="online"||t==="connecting")&&M("elsewhere").classList.add("hidden"))}),e.on("replaced",()=>{b===e&&M("elsewhere").classList.remove("hidden")}),e.on("table",()=>{if(b===e){if(S==="gameroom"){const t=Ro(),n=ke();t&&n?.where==="gameroom"&&Math.hypot(n.x-t.x,n.y-t.y)>40&&Ge({where:"gameroom",x:t.x,y:Math.max(Bs,Math.min(Dn,t.y)),flip:n.flip}),pi()}xa()?.refresh()}}),e.on("tblFail",(t,n)=>{b===e&&xa()?.fail(t,n)}),e.on("welcome",()=>{if(b===e)if(S==="street")Ts(!0);else if(S==="park"||S==="ranch"){const t=ke();t&&Ge(t),S==="park"?Ad():Vd(),it()}else if(S==="gameroom"){const t=ke();t&&Ge(t),dd(),it(),xa()?.refresh()}else e.houses.has(Pe)?Zs():yo()}),e.on("reset",(t,n)=>{b===e&&n==="cuddling"&&N("Someone is cuddling!")}),yo()}async function gE(){bn();const e=Pr(),t=ko();if(!e||!t?.token||t.url!==e)return;const n=new Tr(t),s=await n.connect();s==="ok"?Rd(n):(n.close(),s!=="closed"&&N("Couldn't reach the street. Playing at home!"))}function Nt(e,t,n=""){const s=document.createElement("div");s.className="sheet hoodSheet "+n,s.innerHTML=`<div class="card">${e}</div>`,document.body.appendChild(s),P.swish();const o=()=>s.remove();return s.addEventListener("click",i=>{const a=i.target;if(a===s||a.closest('[data-m="close"]'))return o();t(a,o,s)}),{root:s,close:o}}const Ft='<button class="close" data-m="close">✕</button>';M("btnHood").addEventListener("click",()=>uE());function uE(){const e=Pr();if(!e){Nt(`${Ft}<h2>Neighborhood</h2><p class="hint">The street isn't open yet. Ask a grown-up to set it up!</p>`,()=>{});return}const t=ko()?.url===e?ko():null;Nt(`${Ft}<h2>Neighborhood</h2><div class="bigBtns">
      ${t?.token?`<button class="big go" data-m="go">${Pt.street}<span>Go to my street</span></button>`:`<button class="big go" data-m="join">${Pt.street}<span>Join a friend's street</span></button>`}
      <button class="big grown" data-m="create">${Pt.shield}<span>${t?.parentKey?"Grown-ups":"Grown-ups: start a street"}</span></button></div>`,async(n,s)=>{const o=n.closest("[data-m]")?.dataset.m;if(o==="go"){s();const i=new Tr(t),a=await i.connect();a==="ok"?Rd(i):(i.close(),N(a.startsWith("badtoken")?"Please join again":"Couldn't reach the street"))}o==="join"&&(s(),gi(e)),o==="create"&&(s(),await xh()&&(t?.parentKey?Nr():mE(e)))})}async function mE(e){let t;try{t=await X1(e)}catch{N("Couldn't create a street right now");return}Tn({url:e,code:t.code,id:t.id,parentKey:t.parentKey}),Nt(`${Ft}<h2>Your street is ready!</h2><p class="hint">Kids join with this code (you can pick your own on the grown-up screen):</p><div class="code" id="newCode">${t.code}</div>
    <p class="hint small">Grown-up key (keep it private; it opens the grown-up screen on another device):<br><b class="key" id="parentKey">${t.parentKey}</b></p>
    <div class="bigBtns"><button class="big grown" data-m="setup">${Pt.shield}<span>Add kids' names &amp; code</span></button>
    <button class="big go" data-m="joinhere">${Pt.street}<span>Join on this iPad</span></button></div>`,(n,s)=>{n.closest('[data-m="joinhere"]')&&(s(),Bd(e,t.code)),n.closest('[data-m="setup"]')&&(s(),Nr())})}function gi(e,t=""){const n=Nt(`${Ft}<h2>Join a street</h2><p class="hint">Type the code a grown-up gave you</p>
    <form id="codeForm" class="codeForm"><input id="codeInput" maxlength="${qc}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="CODE"/><button type="submit" class="go">Next</button></form>
    <p class="err">${de(t)}</p>`,()=>{}),s=n.root.querySelector("#codeInput");setTimeout(()=>s.focus(),50),s.addEventListener("input",()=>{s.value=Wa(s.value)}),n.root.querySelector("#codeForm").addEventListener("submit",o=>{o.preventDefault();const i=Wa(s.value);if(!o1(i)){n.close(),gi(e,"That code looks wrong. Try again!");return}n.close(),Bd(e,i)})}async function Bd(e,t,n=""){let s;try{s=await J1(e,t)}catch{gi(e,"Couldn't reach the street. Try again!");return}if("slow"in s){gi(e,"Too many tries. Ask a grown-up and try again in a few minutes.");return}if(!s.exists){gi(e,"Hmm, we couldn't find that street.");return}window.__lastLookupId=s.id,yE(e,t,s.id,s.roster,n)}function yE(e,t,n,s,o=""){if(s.length){Nt(`${Ft}<h2>Who are you?</h2>${o?`<p class="err">${de(o)}</p>`:'<p class="hint">Tap your name</p>'}<div class="nicks roster">${s.map((i,a)=>`<button data-nick="${a}" ${i.claimed?"disabled":""}>${de(i.name)}${i.claimed?"<small>signed in</small>":""}</button>`).join("")}</div>
      <p class="hint small">Not on the list? Ask a grown-up to add your name.</p>`,(i,a)=>{const r=i.closest("[data-nick]");if(!r||r.disabled)return;a();const l=s[+r.dataset.nick];l.hasHouse?vu(e,t,n,l.name,void 0):Rp(e,t,n,l.name)},"wide");return}Nt(`${Ft}<h2>Pick your street name</h2>${o?`<p class="err">${de(o)}</p>`:""}<div class="nicks">${gf.map((i,a)=>`<button data-nick="${a}">${de(i)}</button>`).join("")}</div>`,(i,a)=>{const r=i.closest("[data-nick]");r&&(a(),Rp(e,t,n,gf[+r.dataset.nick]))},"wide")}function Rp(e,t,n,s){Nt(`${Ft}<h2>Hi, ${de(s)}!</h2><p class="hint">What should your house on the street be?</p>
    <div class="bigBtns"><button class="big go" data-m="bring">${qa(2)}<span>Bring my house</span></button>
    <button class="big" data-m="fresh">${qa(5)}<span>Start a new one</span></button></div>`,(o,i)=>{const a=o.closest("[data-m]")?.dataset.m;a&&(i(),vu(e,t,n,s,a==="bring"))})}async function vu(e,t,n,s,o){const i=J.get(),a=i.characters[0],r=Di(a??{});let l;if(o&&(l=i,a)){const{reduce:m}=await p(async()=>{const{reduce:k}=await Promise.resolve().then(()=>Hm);return{reduce:k}},void 0);l=m(i,{type:"char/delete",id:a.id})}const c=ko(),d={url:e,code:t,id:n,parentKey:c?.id===n||c?.code===t?c.parentKey:void 0},f=i.dog?{name:i.dog.name,breed:i.dog.breed}:null,h=new Tr(d),g=await h.connect({nickname:s,look:r,house:l,dog:f});if(g==="ok"){Tn(h.cfg),Rd(h),N(`Welcome to the street, ${s}!`),X7()&&(J7(),Te=dt,Lo("dress"));return}h.close(),g.startsWith("nickname")?Bd(e,t,g.endsWith("notOnList")?"That name is not on the list anymore.":"That name is already signed in on another iPad. Ask a grown-up!"):N(g==="full"?"That street is full":"Couldn't join right now")}M("btnParent").addEventListener("click",async()=>{await xh()&&Nr()});const bE={codeTaken:"That code is already used by another street. Try adding a number!",badCode:"Codes are 4–16 letters or numbers.",badName:"Use a first name only (letters).",rosterFull:`Up to ${i1} names.`,nameInUse:"Remove that player first.",codeFixed:"This street's code can't be changed."};async function Nr(){const e=ko();if(!e)return;if(!e.parentKey){const a=Nt(`${Ft}<h2>Grown-up key</h2><p class="hint">Enter the key you got when the street was made</p><form id="keyForm" class="codeForm"><input id="keyInput" autocomplete="off" spellcheck="false"/><button class="go">OK</button></form>`,()=>{});a.root.querySelector("#keyForm").addEventListener("submit",r=>{r.preventDefault(),e.parentKey=a.root.querySelector("#keyInput").value.trim(),Tn(e),b&&(b.cfg.parentKey=e.parentKey),a.close(),Nr()});return}let t=b;t||(t=new Tr({...e,token:void 0}),await t.connect());const n=t,s=a=>o.root.querySelector(a).value,o=Nt(`${Ft}<h2>Grown-up screen</h2><div id="parentBody"><p class="hint">Loading…</p></div>`,async a=>{const r=a.closest("[data-p]");if(!r)return;const l=r.dataset.p;if(l==="free"&&n.parent({op:"freeChat",on:r.dataset.on!=="1"}),l==="freeMail"&&n.parent({op:"freeMail",on:r.dataset.on!=="1"}),l==="rename"&&n.parent({op:"rename",houseId:r.dataset.hid,name:s(`input[data-hid="${r.dataset.hid}"]`)}),l==="add"&&n.parent({op:"rosterAdd",name:r.dataset.name??s("#rosterInput")}),l==="unname"&&n.parent({op:"rosterRemove",name:r.dataset.name}),l==="unclaim"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again";return}n.parent({op:"unclaim",name:r.dataset.name})}if(l==="setcode"&&n.parent({op:"setCode",code:s("#codeEdit")}),l==="remove"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again to remove";return}n.parent({op:"remove",pid:r.dataset.pid})}if(l==="mailClear"||l==="mailClearAll"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent=l==="mailClearAll"?"Tap again to clear every mailbox":r.dataset.id?"Tap again":"Tap again to clear this mailbox";return}l==="mailClearAll"?n.parent({op:"mailClearAll"}):n.parent({op:"mailClear",houseId:r.dataset.hid,...r.dataset.id?{id:r.dataset.id}:{}})}if(l==="leave"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again: forget this street here";return}Tn(null),o.close(),Td(),N("This iPad left the street")}},"wide parent");o.root.addEventListener("submit",a=>{a.preventDefault();const r=a.target.id;r==="rosterForm"&&n.parent({op:"rosterAdd",name:s("#rosterInput")}),r==="codeForm2"&&n.parent({op:"setCode",code:s("#codeEdit")})});const i=a=>{const r=new Date(a);return Number.isFinite(r.getTime())?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r.getMonth()]+" "+r.getDate()+", "+r.getFullYear():""};n.on("parentInfo",a=>{const r=o.root.querySelector("#parentBody");if(!r)return;const l=ko();l&&l.code!==a.code&&(l.code=a.code,Tn(l)),n.cfg.code=a.code;const c=a.roster??[],d=new Set(c.map(y=>y.name.toLowerCase())),f=a1.filter(y=>!d.has(y.toLowerCase())),h=c[0]?.name??"Reagan",g=Array.isArray(a.mail)?a.mail:[],m=g.some(y=>y.letters&&y.letters.length),k=bh(a.settings),$=g.map(y=>`<div class="pMailHouse"><div class="pMailName">${de(y.name||"House")}</div>${(y.letters||[]).slice().reverse().map(u=>`<div class="pLetter"><b>${de(u.from)}</b><span class="pWhen">${de(i(u.at))}</span><p>${de(u.text)}</p><button type="button" class="danger" data-p="mailClear" data-hid="${de(y.houseId)}" data-id="${de(u.id)}">Clear</button></div>`).join("")||'<p class="hint">No letters.</p>'}${(y.letters||[]).length?`<button type="button" class="danger" data-p="mailClear" data-hid="${de(y.houseId)}">Clear this mailbox</button>`:""}</div>`).join("");r.innerHTML=`${a.note?`<p class="err" id="pNote">${de(bE[a.note]??a.note)}</p>`:""}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${de(a.code)}</div></div>
        <div><div class="label">Free typing</div><button class="toggle ${a.settings.freeChat?"on":""}" data-p="free" data-on="${a.settings.freeChat?1:0}" id="pFree">${a.settings.freeChat?"On":"Off (presets only)"}</button><p class="hint small">Chat bubbles. Off means preset phrases only.</p></div>
        <div><div class="label">Let kids type their own letters</div><button class="toggle ${k?"on":""}" data-p="freeMail" data-on="${k?1:0}" id="pFreeMail">${k?"On":"Off (presets only)"}</button><p class="hint small">Letters only. Off means preset phrases only.</p></div></div>
      <div class="label">Letters</div><div id="parentMail">${$||'<p class="hint">No letters right now.</p>'}${m?'<button type="button" class="danger" data-p="mailClearAll" id="mailClearAll">Clear every mailbox</button>':""}</div>
      <form class="pAdd" id="codeForm2"><input id="codeEdit" maxlength="${qc}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="e.g. ${de(Wa(h))}7"/><button data-p="setcode" type="button">Use this code</button></form>
      <p class="hint small">Tip: a word plus a number (like ${de(Wa(h))}7) is easy to remember and harder to guess. Not case-sensitive.</p>
      <div class="label">Kids' names (sign-in list)</div>
      <div class="roster">${c.map(y=>`<span class="rName ${y.claimed?"claimed":""}"><b>${de(y.name)}</b>${y.claimed?`<i>signed in</i><button data-p="unclaim" data-name="${de(y.name)}">Reset</button>`:y.hasHouse?"<i>not signed in</i>":`<button class="x" data-p="unname" data-name="${de(y.name)}" aria-label="Remove name">×</button>`}</span>`).join("")||'<p class="hint">No names yet: kids pick a fun nickname instead.</p>'}</div>
      <form class="pAdd" id="rosterForm"><input id="rosterInput" maxlength="20" autocomplete="off" placeholder="First name"/><button data-p="add" type="button">Add</button></form>
      ${f.length?`<div class="sugg">${f.map(y=>`<button data-p="add" data-name="${y}">+ ${y}</button>`).join("")}</div>`:""}
      <div class="label">Houses</div>${a.houses.map(y=>`<div class="pHouse"><input data-hid="${y.id}" value="${de(y.name)}" maxlength="24"/><button data-p="rename" data-hid="${y.id}">Rename</button></div>`).join("")||'<p class="hint">No houses yet.</p>'}
      <div class="label">Players</div>${a.players.map(y=>`<div class="pPlayer"><span class="dot ${y.online?"on":""}"></span>${de(y.nickname)}<button class="danger" data-p="remove" data-pid="${y.pid}">Remove</button></div>`).join("")||'<p class="hint">Nobody has joined yet.</p>'}
      <p class="hint small">Letters stay on the server for up to 30 days. They are filtered, and only a first name is stored. You can clear them here, or turn off “Let kids type their own letters” so new letters use preset phrases. Chat bubbles are only relayed to kids standing nearby and are not saved. No emails or last names. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays).</p>
      <button class="danger wideBtn" data-p="leave">Forget this street on this device</button>`}),n.on("error",a=>{a==="badkey"&&(N("That grown-up key didn't work"),e.parentKey=void 0,Tn(e),o.close())}),n.parent({op:"info"})}let It=null;function us(){return M("park").clientHeight/Yc}const kE=()=>{const e=J.get();return e.characters.find(t=>t.id===e.dog?.owner)??e.characters[0]},kn=()=>b?ke():It;function tn(e){b?Ge(e):It=e,S==="ranch"?is():S==="gameroom"?pi():Ns()}function ns(e="park"){if(b){const n=[],s=[...b.presence.entries()],o=ke();o&&s.push([b.pid,o]);for(const[i,a]of s){const r=b.players.get(i);r&&a.where===e&&n.push({key:i,look:r.look,name:r.nickname,p:a,mine:i===b.pid,dog:r.dog??null})}return n}const t=kE();return It&&It.where===e?[{key:"solo",look:Di(t??{}),name:"",p:It,mine:!0,dog:J.get().dog??null}]:[]}function Ad(){const e=us(),t=M("parkWorld"),n=s=>s*e+"px";t.style.width=Nc*e+"px",t.style.height=Yc*e+"px",t.style.setProperty("--sc",String(e)),t.innerHTML=U2()+ql.map((s,o)=>s.kind==="swing"?`<div class="swing" data-swing="${o}" style="left:${n(s.x-30)};top:${n(Kt)};width:${n(60)};height:${n(240)}">${V2}</div>`:"").join("")+ql.map((s,o)=>`<button class="pspot k-${s.kind}" data-spot="${o}" aria-label="${s.kind}" style="left:${n(s.x-50)};top:${n(s.y-(s.kind==="swing"?70:55))};width:${n(100)};height:${n(s.kind==="swing"?90:65)}"></button>`).join("")+`<button class="pspot slide" data-act="slide" aria-label="Slide" style="left:${n(ge.ladder-45)};top:${n(ge.top.y-30)};width:${n(130)};height:${n(560-ge.top.y+30)}"></button><button class="pspot pond" data-act="splash" aria-label="Pond" style="left:${n(1235)};top:${n(462)};width:${n(370)};height:${n(105)}"></button><button class="pspot gate" data-act="exit" aria-label="Back to the street" style="left:${n(25)};top:${n(240)};width:${n(180)};height:${n(260)}"></button><div class="ripples" id="ripples"></div><button class="ball" id="ball" aria-label="Ball">${Q2}</button><div class="savatars" id="pavatars"></div>`,cr(),Ns(),it()}const Bp=2400;function Ns(){const e=document.getElementById("pavatars");if(!e||S!=="park")return;const t=us(),n=new Set,s=new Set;for(const o of ns()){n.add(o.key);let i=e.querySelector(`.savatar[data-pid="${o.key}"]`);i||(i=document.createElement("div"),i.className="savatar "+(o.mine?"mine":"other"),i.dataset.pid=o.key,e.appendChild(i),o.mine&&_u(i));const a=JSON.stringify(o.look)+o.name;if(i.dataset.look!==a){const f=i.querySelector(".bubble");i.innerHTML=o.name?Cd(o.look,o.name):`<div class="inner">${bt(o.look)}</div>`,f&&i.appendChild(f),i.dataset.look=a}const r=(Vs[o.look.size]??1)*t*.95,l=ps*r,c=yn*r;i.style.left=o.p.x*t-l/2+"px",i.style.top=o.p.y*t-c+"px",i.style.width=l+"px",i.style.height=c+"px",i.style.zIndex=String(100+Math.round(o.p.y)),i.classList.toggle("flipped",o.p.flip),Oi(i,o.look,o.mine);const d=o.p.pose??"";i.dataset.pose!==d&&(i.classList.remove("pose-sit","pose-swing","pose-slide"),i.offsetWidth,d==="slide"&&(i.style.setProperty("--sx",(ge.top.x-ge.bottom.x)*t+"px"),i.style.setProperty("--sy",(ge.top.y-ge.bottom.y)*t+"px")),d&&i.classList.add("pose-"+d),i.dataset.pose=d),d==="swing"?(i.style.transformOrigin=`50% ${(Kt-o.p.y)*t+c}px`,i.style.animationDelay=-(Date.now()%Bp)/1e3+"s",s.add(o.p.spot??-1)):(i.style.transformOrigin="",i.style.animationDelay="")}e.querySelectorAll(".savatar").forEach(o=>{n.has(o.dataset.pid)||o.remove()}),document.querySelectorAll("#parkWorld .swing").forEach(o=>{const i=s.has(+o.dataset.swing);i&&!o.classList.contains("swinging")&&(o.style.animationDelay=-(Date.now()%Bp)/1e3+"s"),o.classList.toggle("swinging",i)}),Xs()}function _u(e){e.addEventListener("pointerdown",t=>{t.preventDefault(),t.stopPropagation();const n=kn();if(!n||n.where!=="park"&&n.where!=="ranch"&&n.where!=="barn")return;const s=n.where!=="park",o=n.where;$t=[];const i=M(s?"ranchScroll":"parkScroll"),a=s?on():us(),r=o==="barn"?Ac:s?Ri:Nc,l=w=>{const _=M(s?"ranchWorld":"parkWorld").getBoundingClientRect();return{x:(w.clientX-_.left)/a,y:(w.clientY-_.top)/a}},c=l(t),d={x:n.x-c.x,y:n.y-c.y};let f=t,h=0,g=n.x,m=!1;const k=w=>{const _=l(w),T=kn();if(!T)return;const A=Math.max(60,Math.min(r-60,_.x+d.x)),H=Math.max(470,Math.min(590,_.y+d.y));if(!m&&Math.hypot(A-T.x,H-T.y)<6)return;m=!0;const F=Math.abs(A-g)>3?A<g:T.flip;Math.abs(A-g)>3&&(g=A),tn(o==="barn"?{where:"barn",x:A,y:H,flip:F}:s?{where:"ranch",x:A,y:H,flip:F,...T.ride!==void 0?{ride:T.ride}:{}}:{where:"park",x:A,y:H,flip:F})},$=()=>{const w=i.getBoundingClientRect(),_=f.clientX<w.left+70?-10:f.clientX>w.right-70?10:0;_&&m&&(i.scrollLeft+=_,k(f)),h=requestAnimationFrame($)};h=requestAnimationFrame($),e.classList.add("lifted"),P.pick();const y=w=>{w.pointerId===t.pointerId&&(f=w,k(w))},u=w=>{w.pointerId===t.pointerId&&(cancelAnimationFrame(h),window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",u),e.classList.remove("lifted"),P.drop())};window.addEventListener("pointermove",y),window.addEventListener("pointerup",u)})}M("parkWorld").addEventListener("pointerdown",e=>{e.target.closest(".pspot, .ball, .pet")&&e.stopPropagation()});M("parkWorld").addEventListener("click",e=>{const t=e.target,n=kn();if(!n)return;if(t.closest("#ball")){He||P.boing(),$E();return}const s=t.closest("[data-spot]");if(s){const i=+s.dataset.spot,a=ql[i];if(n.spot===i&&n.pose){tn({where:"park",x:a.x,y:Math.min(590,a.y+40),flip:n.flip}),P.drop();return}if(ns().some(r=>!r.mine&&r.p.spot===i&&r.p.pose)){N("Someone is already there!"),P.pop();return}tn({where:"park",x:a.x,y:a.y,flip:n.flip,pose:a.kind==="swing"?"swing":"sit",spot:i}),a.kind==="swing"?P.boing():P.drop();return}const o=t.closest("[data-act]")?.dataset.act;if(o==="slide"&&(tn({where:"park",x:ge.bottom.x,y:ge.bottom.y,flip:!1,pose:"slide"}),P.swish(),setTimeout(()=>{const i=kn();i?.pose==="slide"&&tn({where:"park",x:i.x,y:i.y,flip:i.flip})},1500)),o==="splash"){const i=M("parkWorld").getBoundingClientRect(),a=(e.clientX-i.left)/us();$u(a),b?.fx({k:"splash",x:a})}o==="exit"&&xu()});function $u(e){const t=document.getElementById("ripples");if(!t||S!=="park")return;const n=us();for(let s=0;s<2;s++){const o=document.createElement("div");o.className="ripple";const i=(120+s*70)*n;Object.assign(o.style,{left:e*n-i/2+"px",top:512*n-i*.18+"px",width:i+"px",height:i*.36+"px",animationDelay:s*.15+"s"}),t.appendChild(o),setTimeout(()=>o.remove(),1400)}for(let s=0;s<6;s++){const o=document.createElement("div");o.className="drop",Object.assign(o.style,{left:e*n+"px",top:505*n+"px"}),o.style.setProperty("--dx",(s-2.5)*14+"px"),t.appendChild(o),setTimeout(()=>o.remove(),900)}P.splash()}function wE(){Js(),$t=[],Oe=!1,S="park",M("park").classList.remove("hidden"),Qi(M("park"));const e={where:"park",x:290,y:548,flip:!1};b?Ge(e):It=e,M("streetTitle").textContent="The Park",bn(),Ad(),requestAnimationFrame(()=>{const t=M("parkScroll");t.scrollLeft=0,it()}),P.sparkle()}function xu(){yo()}function vE(){return Jr()&&!document.body.classList.contains("phone")}function Ap(){return Jr()?520:280}function _E(){Js(),$t=[],Oe=!1,S="gameroom",M("gameroom").classList.remove("hidden");const e=Ro(),t=e?{where:"gameroom",x:e.x,y:Math.max(Bs,Math.min(Dn,e.y)),flip:!1}:{where:"gameroom",x:Ap(),y:560,flip:!1};b?Ge(t):It=t,M("streetTitle").textContent="The Clubhouse",bn(),dd(),requestAnimationFrame(()=>{const n=fs(),s=M("grScroll"),o=e?.x??(vE()?60+$g/2:Ap());s.scrollLeft=Math.max(0,o*n-s.clientWidth/2),it(),Gu()}),Qi(M("gameroom")),P.sparkle()}M("btnLeavePark").addEventListener("click",()=>{S==="ranch"&&Oe?Pi(!1):xu()});let Fn={x:2620,y:565},He=null;function cr(e=!1){const t=document.getElementById("ball");if(!t)return;const n=us(),s=34*n;e||t.classList.remove("flying"),t.style.left=Fn.x*n-s/2+"px",t.style.top=Fn.y*n-s+"px",t.style.width=t.style.height=s+"px"}function $E(){if(He)return;const e=ct.x0+40+Math.random()*(ct.x1-ct.x0-80),t=ct.y0+25+Math.random()*(ct.y1-ct.y0-35);Mu(b?b.pid:"solo",e,t),b?.fx({k:"ball",x:e,y:t})}function Mu(e,t,n){if(S!=="park")return;const s=document.getElementById("ball");Fn={x:t,y:n},He={thrower:e,phase:"fly",dog:null,until:performance.now()+12e3},s&&(s.classList.remove("flying"),s.offsetWidth,s.classList.add("flying"),cr(!0)),P.boing(),setTimeout(()=>{He?.phase==="fly"&&(He.phase="chase",document.getElementById("ball")?.classList.remove("flying"),jn.size||(He=null))},650)}function xE(e){if(!b)return It;const t=e===b.pid?ke():b.presence.get(e);return t&&t.where==="park"?t:null}const jn=new Map,Ll=e=>(t,n,s,o,i)=>{t.style.left=(n-o/2)*e+"px",t.style.top=(s-i)*e+"px",t.style.width=o*e+"px",t.style.height=i*e+"px"};function ME(){const e=[];if(S==="house"){const t=C.get(),n={box:ee,place:Ks,z:s=>String(4e3+Math.round(s)),scale:1};if(b&&Ie!==J){const s=[...b.presence.entries()],o=ke();o&&s.push([b.pid,o]);for(const[i,a]of s){const r=b.players.get(i)?.dog;if(r&&a.where==="house"&&a.houseId===Pe&&a.room===t.currentRoom){const l=xt(t.currentRoom,In(i,a),a);e.push({key:i,dog:r,x:l.x,y:l.y,flip:a.flip,...n})}}}else if(t.dog){const s=t.characters.find(o=>o.id===t.dog.owner)??t.characters[0];if(s&&s.room===t.currentRoom){const o=xt(s.room,Lt(s),s);e.push({key:"solo",dog:t.dog,x:o.x,y:o.y,flip:s.flip,...n})}}}else if(S==="park"){const t=document.getElementById("pavatars");if(!t)return e;const n=us();for(const s of ns())s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Ll(n),z:o=>String(Math.round(o)-200),scale:.95})}else if(S==="ranch"){const t=document.getElementById("ravatars");if(!t)return e;const n=on();for(const s of ns(Oe?"barn":"ranch"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Ll(n),z:o=>String(100+Math.round(o)),scale:.95,riding:s.p.ride!==void 0})}else if(S==="gameroom"){const t=document.getElementById("gavatars");if(!t)return e;const n=fs();for(const s of ns("gameroom"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Ll(n),z:o=>String(Math.round(o)-200),scale:.95})}return e}let Dp=performance.now();function LE(e,t){const n=new Set;for(const s of ME()){if(SE(s.key))continue;n.add(s.key);let o=jn.get(s.key);const i=s.flip?1:-1,a=!s.riding&&S==="house"&&C.get().currentRoom==="backyard",r=s.riding?200:78;let l=a?Bf.x:s.x+i*r;s.riding?l=Math.max(50,Math.min(Ri-50,l)):S==="house"&&!a&&(l=Ru(l,46));const c=a?Bf.y:Math.min(595,s.y+(s.riding?28:6));if(!o||o.box!==s.box||!o.el.isConnected){o?.el.remove();const _=document.createElement("div");_.className="pet pet-dog",_.dataset.dog=s.key,s.box.appendChild(_),EE(_,s.key),o={el:_,box:s.box,x:l,y:c,flip:s.flip,pose:"",look:"",idle:1,trickUntil:0,sitTrick:!1},jn.set(s.key,o)}let d=l,f=c,h=s.riding?980:320;if(He&&e>He.until&&(He=null,cr()),He&&S==="park"){if(He.phase==="chase")d=Fn.x,f=Fn.y,h=950,Math.hypot(o.x-d,o.y-f)<28&&(He.phase="carry",He.dog=s.key,P.woof());else if(He.phase==="carry"&&He.dog===s.key){const _=xE(He.thrower)??{x:(ct.x0+ct.x1)/2,y:540};d=_.x+60,f=Math.min(590,_.y+6),h=750,Fn={x:o.x+(o.flip?-40:40),y:o.y-30*s.scale},Math.hypot(o.x-d,o.y-f)<26&&(Fn={x:_.x+70,y:Math.min(590,_.y+12)},He=null,Sa(o,"♥"),P.sparkle()),cr()}}const g=e<o.trickUntil,m=d-o.x,k=f-o.y,$=Math.hypot(m,k);let y=!1;if($>(He?4:10)&&!g){const _=To()?$:Math.min($,h*t);o.x+=m/$*_,o.y+=k/$*_,y=!0,Math.abs(m)>1.5&&(o.flip=m<0),o.idle=0}else o.idle+=t,!g&&o.idle>.3&&Math.abs(s.x-o.x)>4&&(o.flip=s.x<o.x);const u=g&&o.sitTrick?"sit":y?"stand":o.idle>.9?"sit":"stand",w=u+s.dog.breed;if(o.pose+o.look!==u+w){for(const _ of[...o.el.children])_.matches(".bubble, .kennelBtn")||_.remove();o.el.insertAdjacentHTML("afterbegin",`<div class="inner">${vi(s.dog.breed,u)}</div>`),o.pose=u,o.look=w}o.el.dataset.name=s.dog.name,o.el.classList.toggle("walking",y),o.el.classList.toggle("flipped",o.flip),s.place(o.el,o.x,o.y,92*s.scale,71*s.scale),o.el.style.zIndex=s.z(o.y+1),Pu(o.el,s.key,!1)}for(const[s,o]of jn)n.has(s)||(o.el.remove(),jn.delete(s))}function Sa(e,t){e.el.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.el.appendChild(n),Ao(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const Ip=new Map;function Lu(e,t){const n=jn.get(e);if(!n)return;const s=n.el.dataset.name??"";n.trickUntil=performance.now()+1400,n.sitTrick=t===0,n.el.classList.remove("spin","hop"),n.el.offsetWidth,t===0&&(Sa(n,`${s} sits! 🐾`),P.pop()),t===1&&(n.el.classList.add("spin"),Sa(n,"Wheee! ✨"),P.spin()),t===2&&(n.el.classList.add("hop"),Sa(n,"Woof! Woof!"),P.woof())}function EE(e,t){e.addEventListener("pointerdown",n=>{n.stopPropagation(),n.preventDefault()}),e.addEventListener("click",n=>{n.stopPropagation();const s=(Ip.get(t)??0)%3;Ip.set(t,s+1),Lu(t,s),b&&b.fx({k:"trick",owner:t,v:s})})}function Fr(e){const t=e?.dogKennel?.item;if(!t||!e)return null;for(const n of Object.values(e.rooms)){const s=n.items.find(o=>o.id===t&&o.kind==="kennel");if(s)return s}return null}function CE(e){if(e==="solo")return J.get();if(!b)return null;const t=b.players.get(e)?.houseId;return t?b.view(t):null}function SE(e){return!!Fr(CE(e))}function Dd(){if(b){const e=b.myHouseId();return e?b.view(e):null}return J.get()}function Eu(){if(S!=="house")return null;const e=C.get(),t=Fr(e);if(!t||!e.rooms[e.currentRoom]?.items.some(n=>n.id===t.id))return null;if(b&&Ie!==J){const n=b.houses.get(Pe)?.meta.ownerId,s=n?b.players.get(n)?.dog??null:null;return!n||!s?null:{key:n,dog:s,item:t}}return e.dog?{key:"solo",dog:e.dog,item:t}:null}function PE(){const e=Dd();if(!e)return null;const t=fr()?C.get().currentRoom:null;let n=null,s=null;for(const[o,i]of Object.entries(e.rooms))for(const a of i.items)a.kind==="kennel"&&((!n||a.z>=n.z)&&(n=a),o===t&&(!s||a.z>=s.z)&&(s=a));return s??n}function pa(e){if(!Od()){N("Adopt a dog first!");return}si({type:"dog/kennel",item:e}),e?(P.pop(),N("Rest well, puppy!")):(P.woof(),N("Come on, puppy!"))}function Id(e){if(!Od()){N("Adopt a dog first!");return}const t=Fr(Dd());if(e===void 0){if(t){pa(null);return}const n=PE();if(!n){N("Put a dog kennel down first!");return}pa(n.id);return}t?.id===e?pa(null):pa(e)}function Cu(e){const t=C.get(),n=t.rooms[t.currentRoom]?.items.find(s=>s.id===e);if(n){if(n.kind==="kennel"){fr()&&Id(n.id);return}n.kind==="cat-tower"&&QE()}}function TE(e,t){const n=C.get(),s=n.rooms[n.currentRoom]?.items.find(i=>i.id===t);if(!s)return;const o=h2(s.kind);if(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),P.click(),o==="kennel"||o==="tower"){Cu(t);return}if(qp(s.kind)){nM();const i=!s.on;C.dispatch({type:"item/power",room:n.currentRoom,id:t,on:i}),i&&Yn(s.kind)==="tv"&&DE(s),Fs();return}if(o==="open"){e.classList.toggle("opened"),Fs();return}if(o==="lamp"){e.classList.toggle("lamp-on");return}o==="sit"&&Su(s),o==="swing"&&IE(s)}const Hp={dance:wt*2,sway:wt*4,watch:wt*5,warm:wt*3,hug:wt*2,bounce:wt,bathe:wt*3,nibble:wt},RE={dance:"<span>♪</span><span>♫</span>",sway:"<span>♪</span>",hug:"<span>♥</span>",bathe:'<span class="bub"></span><span class="bub"></span><span class="bub"></span>',nibble:"<span>✦</span>"},El={stereo:"<span>♪</span><span>♫</span><span>♪</span>",musicbox:"<span>♪</span><span>♩</span>",tv:'<span class="glow"></span>',fire:'<span class="glow"></span><span class="ember"></span><span class="ember"></span>',tub:'<span class="bub"></span><span class="bub"></span><span class="bub"></span><span class="bub"></span>',fridge:'<span class="food">🍓</span><span class="food">🧁</span>'},Cl=new Map;let Sl=0;setInterval(()=>Fs(),1e3);function Fs(){Sl||(Sl=requestAnimationFrame(()=>{Sl=0,BE()}))}function fo(e,t,n){let s=e.querySelector(":scope > .ambFx");if(!t){s?.remove();return}s||(s=document.createElement("i"),s.className="ambFx",s.setAttribute("aria-hidden","true"),e.appendChild(s)),s.dataset.k!==n&&(s.innerHTML=t,s.dataset.k=n,s.className="ambFx fx-"+n)}function Op(e,t,n){const s=t?t.kind+"|"+t.item:"",o=e.dataset.amb||"";if(o!==s){if(o&&e.classList.remove("amb-"+o.split("|")[0],"amb-l","amb-r"),o.startsWith("bathe|")&&!t&&(e.classList.add("amb-sparkle"),setTimeout(()=>e.classList.remove("amb-sparkle"),1200)),!t){delete e.dataset.amb,fo(e,null,"");return}e.dataset.amb=s,e.style.setProperty("--amb-delay",ii(t.phase,Hp[t.kind],n)+"ms"),e.style.setProperty("--amb-period",Hp[t.kind]+"ms"),e.classList.add("amb-"+t.kind,t.face<0?"amb-l":"amb-r"),fo(e,RE[t.kind]??null,t.kind)}}function BE(){const e=C.get(),t=e.rooms[e.currentRoom];if(S!=="house"||!t){jf(null);return}const n=Date.now(),s=new Set;for(const h of t.items){if(Yn(h.kind)!=="musicbox")continue;if(!h.on){Cl.delete(h.id);continue}const g=Cl.get(h.id)??(Cl.set(h.id,n),setTimeout(Fs,Xd+60),n);n-g>=Xd&&s.add(h.id)}const o=new Set;ee.querySelectorAll(".item.opened").forEach(h=>{h.dataset.id&&o.add(h.dataset.id)});const i=t.items.map(h=>{const g=Me[h.kind];return{id:h.id,kind:h.kind,x:h.x,y:h.y,on:!!h.on,w:g?wd(g,Ye(h)).w:200}}),a=[],r=new Map;for(const h of e.characters){const g=Bt.get(h.id);if(h.room!==e.currentRoom||!g||g.classList.contains("lifted"))continue;const m=Lt(h)?.pose;a.push({id:h.id,x:h.x,y:h.y,seated:m==="sit",lying:m==="lie"}),r.set(h.id,g)}if(b&&Ie!==J){const h=[...b.presence.entries()],g=ke();g&&h.push([b.pid,g]);for(const[m,k]of h){const $=Ps.get(m);if(!$||!$.isConnected||k.where!=="house"||k.houseId!==Pe||k.room!==e.currentRoom||$.classList.contains("lifted"))continue;const y=In(m,k)?.pose;a.push({id:"p:"+m,x:k.x,y:k.y,seated:y==="sit",lying:y==="lie"}),r.set("p:"+m,$)}}const l=m0(i,a,{fridgesOpen:o,musicBoxDone:s}),c=aM(i,l);if(c)for(const h of c.dancers){const g=l.get(h);g&&l.set(h,{...g,phase:0,face:g.face})}for(const h of[...Bt.values(),...Ps.values()])[...r.values()].includes(h)||Op(h,void 0,n);r.forEach((h,g)=>Op(h,l.get(g),n));const d=new Set([...l.values()].filter(h=>h.kind==="bathe").map(h=>h.item));let f=null;for(const h of t.items){const g=ee.querySelector(`.item[data-id="${h.id}"]`);if(!g)continue;const m=Yn(h.kind),k=!!h.on&&!!m&&!s.has(h.id);g.classList.toggle("amb-on",k),k?(g.dataset.amb=m,g.style.getPropertyValue("--amb-delay")||g.style.setProperty("--amb-delay",ii(0,wt,n)+"ms"),m==="stereo"?f="stereo":m==="musicbox"&&!f&&(f="musicbox"),fo(g,El[m],m)):Np(h.kind)&&d.has(h.id)?fo(g,El.tub,"tub"):Fp(h.kind)&&o.has(h.id)?fo(g,El.fridge,"fridge"):(delete g.dataset.amb,fo(g,null,""))}AE(c,n),jf(f)}let Pl="";function AE(e,t){const n=M("partyFx"),s=!!e&&S==="house";document.body.classList.toggle("party-on",s),n.classList.toggle("on",s),s?(n.style.setProperty("--px",e.x/me*100+"%"),Pl!==e.stereo&&(n.style.setProperty("--amb-delay",ii(0,wt,t)+"ms"),Pl=e.stereo)):Pl="";const o=new Set(s?e.toys:[]);ee.querySelectorAll(".item").forEach(c=>{const d=o.has(c.dataset.id||"");d!==c.classList.contains("party-bounce")&&(c.classList.toggle("party-bounce",d),d&&c.style.setProperty("--amb-delay",ii(0,wt,t)+"ms"))});const i=s?ee.querySelector(`.item[data-id="${e.stereo}"]`):null,a=hd.getBoundingClientRect(),r=a.width?me/a.width:1,l=i?.getBoundingClientRect();ee.querySelectorAll(".pet").forEach(c=>{let d=!1;if(l){const f=c.getBoundingClientRect();d=Math.hypot((f.left+f.width/2-l.left-l.width/2)*r,(f.bottom-l.bottom)*r*1.5)<=iM&&!c.classList.contains("leap")&&!c.classList.contains("curl")}d!==c.classList.contains("party-hop")&&(c.classList.toggle("party-hop",d),d&&c.style.setProperty("--amb-delay",ii(.5,wt*2,t)+"ms"))})}function DE(e){const t=C.get();if(b&&S==="house"){const s=ke();if(!s||s.where!=="house"||s.seat)return}else{const s=t.characters.find(o=>o.id===Te&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(!s||s.seat)return}const n=t.rooms[t.currentRoom].items.filter(s=>Gs(s.kind)?.pose==="sit"&&Math.abs(s.x-e.x)<520).sort((s,o)=>Math.abs(s.x-e.x)-Math.abs(o.x-e.x))[0];n&&Su(n)}let At=null,ti=!1;function dr(){ee.querySelectorAll(".item.swinging").forEach(e=>{(!At||e.dataset.id!==At.item)&&e.classList.remove("swinging")}),At&&ee.querySelector(`.item[data-id="${At.item}"]`)?.classList.add("swinging")}function IE(e){const t=C.get(),n=t.characters.find(i=>i.id===Te&&i.room===t.currentRoom)??t.characters.find(i=>i.room===t.currentRoom);if(!n)return;if(At?.id===n.id&&At.item===e.id){At=null,ti=!0,C.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x+70,y:Math.max(e.y,520)}),ti=!1,dr();return}const s=Me[e.kind],o=e.y-(s?ft(s)*Ye(e)*.26:40);At={id:n.id,item:e.id},ti=!0,C.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x,y:o}),ti=!1,dr()}function Su(e){const t=Vr(e);if(!t)return;if(b&&S==="house"){const i=ke();if(!i||i.where!=="house")return;if(!b.speaksSit){const r="p:"+b.pid,l=gn.get(r)?.item===e.id,c=Math.max(xo+40,t.footY-8);l?gn.delete(r):gn.set(r,{item:e.id,pose:t&&Gs(e.kind).pose,n:0});const{seat:d,...f}=i;Ge({...f,x:e.x,y:c,flip:!1}),Mt();return}const a=yi({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:Ei(void 0,b.pid),alreadyOn:i.seat?.id===e.id?e.id:null});if(a.toast){N(a.toast),P.pop();return}if(!a.moved)return;Ea(i,a.x,a.y,!1,a.seat?{id:a.seat.item,pose:a.seat.pose,n:a.seat.n}:null),Mt(),zs(!1);return}const n=C.get(),s=n.characters.find(i=>i.id===Te&&i.room===n.currentRoom)??n.characters.find(i=>i.room===n.currentRoom);if(!s)return;const o=yi({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:Ei(s.id),alreadyOn:s.seat?.item===e.id?e.id:null});if(o.toast){N(o.toast),P.pop();return}o.moved&&(ei(s.id,n.currentRoom,o.x,o.y,o.seat),zs(!1))}function Pu(e,t,n){const s=b?t===b.pid:t==="solo";let o=e.querySelector(".kennelBtn");if(!s){o?.remove();return}o||(o=document.createElement("button"),o.type="button",o.className="kennelBtn",o.addEventListener("pointerdown",i=>{i.stopPropagation(),i.preventDefault()}),o.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault(),Id()}),e.appendChild(o)),o.textContent=n?"Out":"Kennel",HE(o)}function HE(e){if(S!=="house"){e.style.left=e.style.right=e.style.top=e.style.bottom=e.style.transform="";return}const t=e.parentElement;if(!t)return;const n=j.getBoundingClientRect().width/j.offsetWidth||1,s=j.getBoundingClientRect(),o=4,i={l:s.left+o,t:s.top+o,r:s.right-o,b:s.bottom-o},a=ee.querySelector(".char")?.getBoundingClientRect(),r=ee.querySelector('.item[data-kind="sofa"]')?.getBoundingClientRect(),l=[...ee.querySelectorAll(".pet-cat, .item")].map(O=>O.getBoundingClientRect()).filter(O=>O.width>2&&O.height>2),c=(O,W)=>!!W&&O.left<W.right-1&&O.right>W.left+1&&O.top<W.bottom-1&&O.bottom>W.top+1,d=(O,W)=>c(O,W)?Math.max(0,Math.min(O.right,W.right)-Math.max(O.left,W.left))*Math.max(0,Math.min(O.bottom,W.bottom)-Math.max(O.top,W.top)):0,f=O=>{let W=0;O.left<i.l&&(W+=(i.l-O.left)*8),O.right>i.r&&(W+=(O.right-i.r)*8),O.top<i.t&&(W+=(i.t-O.top)*8),O.bottom>i.b&&(W+=(O.bottom-i.b)*8),W+=d(O,a)*4,W+=d(O,r)*4;for(const Ke of l)W+=d(O,Ke)*4;return W},h=t.getBoundingClientRect(),g=!a||h.left+h.width/2<=a.left+a.width/2,m=O=>({left:O?"0px":"auto",right:O?"auto":"0px",top:"46%",bottom:"auto",transform:O?"translate(-108%, -50%)":"translate(108%, -50%)"}),k=[m(g),m(!g),{left:"50%",right:"auto",top:"0px",bottom:"auto",transform:"translate(-50%, -115%)"}];let $=k[0],y=1/0;for(const O of k){Object.assign(e.style,O);const W=f(e.getBoundingClientRect());W<y&&(y=W,$=O)}Object.assign(e.style,$);let u=e.getBoundingClientRect(),w=0,_=0;u.left<i.l&&(w+=i.l-u.left),u.right>i.r&&(w-=u.right-i.r),u.top<i.t&&(_+=i.t-u.top),u.bottom>i.b&&(_-=u.bottom-i.b);const T=O=>{if(!O)return;const W=()=>new DOMRect(u.left+w,u.top+_,u.width,u.height);if(!c(W(),O))return;const Ke=Math.min(W().bottom,O.bottom)-Math.max(W().top,O.top),rt=O.bottom+4-W().top,Ue=O.top-4-W().bottom,Be=rn=>W().top+rn>=i.t&&W().bottom+rn<=i.b;if(Ke<u.height*.5&&Be(rt)){_+=rt;return}if(Ke<u.height*.5&&Be(Ue)){_+=Ue;return}const Ee=O.left-i.l,pt=i.r-O.right,ht=O===r?a:r,ms=(rn,el)=>{if(!ht)return!1;const ys=el?rn-u.width:rn,Do=new DOMRect(ys,W().top,u.width,u.height);return c(Do,ht)};pt>=u.width+4&&!ms(O.right+4,!1)?w+=O.right+4-W().left:Ee>=u.width+4&&!ms(O.left-4,!0)?w+=O.left-4-W().right:Be(rt)?_+=rt:Be(Ue)&&(_+=Ue)};T(a),T(r);const A=t.querySelector(".inner")?.getBoundingClientRect(),H=A&&A.width>2?A:h,F=ee.querySelector(".pet-cat")?.getBoundingClientRect(),q=ee.querySelector('.item[data-kind="sandbox"]')?.getBoundingClientRect(),se=ee.querySelector('.item[data-kind="yard-bench"]')?.getBoundingClientRect(),K=[...ee.querySelectorAll('.item[data-kind="yard-swing"], .item[data-kind="picnic-blanket"], .item[data-kind="lemonade-cart"], .item[data-kind="tulip-bed"]')].map(O=>O.getBoundingClientRect()),fe=j.querySelector(".yardDoor"),an=fe?[fe,fe.querySelector(".yardHintLabel"),fe.querySelector(".doorArt")].map(O=>O?.getBoundingClientRect()):[],Wt=document.getElementById("secrets"),Ze=Wt&&Wt.offsetParent?Wt.getBoundingClientRect():void 0,B=Ze&&Ze.width>2&&Ze.left<i.r&&Ze.right>i.l&&Ze.top<i.b&&Ze.bottom>i.t?Ze:void 0,I=B?new DOMRect(B.left-8,B.top-8,B.width+16,B.height+16):void 0,G=[a,r,F,q,se,I,...K,...an].filter(O=>!!O&&O.width>2&&O.height>2),V=new DOMRect(u.left+w,u.top+_,u.width,u.height),Q=H.left+H.width/2,Y=H.top+H.height/2,pe=O=>Math.hypot(O.left+O.width/2-Q,O.top+O.height/2-Y),Le=O=>{const W=Math.min(O.right,H.right)-Math.max(O.left,H.left),Ke=Math.min(O.bottom,H.bottom)-Math.max(O.top,H.top);return W>1&&Ke>1},ye=O=>O.left>=i.l-.5&&O.right<=i.r+.5&&O.top>=i.t-.5&&O.bottom<=i.b+.5&&G.every(W=>!c(O,W))&&!Le(O);let We=V;if(!ye(V)||pe(V)>150){const O=[],W=(Ue,Be)=>{let Ee=Ue,pt=Be;Ee<i.l&&(Ee=i.l),pt<i.t&&(pt=i.t),Ee+u.width>i.r&&(Ee=Math.max(i.l,i.r-u.width)),pt+u.height>i.b&&(pt=Math.max(i.t,i.b-u.height)),O.push(new DOMRect(Ee,pt,u.width,u.height))};W(H.left+(H.width-u.width)/2,H.top-u.height-8),W(H.right-u.width,H.top-u.height-6),W(H.left,H.top-u.height-6),a&&W(a.right+6,H.top-u.height-8),se&&W(se.left-u.width-6,se.top-u.height-6),a&&se&&W(a.right+6,se.top-u.height-6),a&&(W(a.left-12,a.top-u.height-8),W(i.l,a.top-u.height-10),W(a.left+(a.width-u.width)/2,a.top-u.height-8)),W(i.r-u.width,H.top-u.height-6),W(H.right+8,H.top+(H.height-u.height)/2),W(H.left-u.width-8,H.top+(H.height-u.height)/2),W(V.left,V.top);for(const Ue of[u.width*.65,u.width*1.05,88,120,155])for(let Be=0;Be<8;Be++){const Ee=Be*Math.PI/4;W(Q+Math.cos(Ee)*Ue-u.width/2,Y+Math.sin(Ee)*Ue-u.height/2)}const Ke=Ue=>{let Be=1/0,Ee=null;for(const pt of O){if(!ye(pt)||pe(pt)>Ue)continue;const ht=pe(pt);ht<Be&&(Be=ht,Ee=pt)}return Ee},rt=Ke(170)??Ke(360);if(rt)We=rt;else if(!ye(V)){let Ue=null,Be=1/0;for(const Ee of O){if(Ee.left<i.l-.5||Ee.right>i.r+.5||Ee.top<i.t-.5||Ee.bottom>i.b+.5)continue;const ht=(Le(Ee)?1e4:0)+G.reduce((ms,rn)=>ms+d(Ee,rn),0)+pe(Ee);ht<Be&&(Be=ht,Ue=Ee)}Ue&&(We=Ue)}}w+=We.left-V.left,_+=We.top-V.top,(w||_)&&(e.style.transform=`${e.style.transform} translate(${(w/n).toFixed(1)}px, ${(_/n).toFixed(1)}px)`)}function OE(e,t){e.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.appendChild(n),Ao(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const ni=new Map;function WE(){const e=new Set,t=Eu();if(t){e.add(t.key);const n=o2(t.dog.name,Date.now()),s=Me[t.item.kind],i=(s?Ys(s,t.item.y):Math.min(t.item.y,Qe-Sg))-(n==="peek"?24:2);let a=ni.get(t.key);if(!a||!a.el.isConnected){a?.el.remove();const l=document.createElement("div");l.className="pet pet-dog kenneled",l.dataset.dog="kennel:"+t.key,ee.appendChild(l),l.addEventListener("pointerdown",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),c.preventDefault())}),l.addEventListener("click",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),OE(l,`${l.dataset.name??"Puppy"} is resting`))}),a={el:l,pose:"",look:"",x:t.item.x,y:i},ni.set(t.key,a)}const r=n==="rest"?"sleep":"sit";if(a.pose!==r||a.look!==n+t.dog.breed){for(const l of[...a.el.children])l.matches(".bubble, .kennelBtn")||l.remove();a.el.insertAdjacentHTML("afterbegin",`<div class="inner">${vi(t.dog.breed,r)}</div>${n==="rest"?'<div class="zzz"><b>Zzz</b><i>z</i><i>z</i><i>z</i></div>':""}`),a.pose=r,a.look=n+t.dog.breed}a.el.dataset.name=t.dog.name,a.el.classList.toggle("rest",n==="rest"),a.el.classList.toggle("peek",n==="peek"),a.x=t.item.x,a.y=i,Ks(a.el,t.item.x,i,100,77),a.el.style.zIndex=String(1e3+t.item.z+1),Pu(a.el,t.key,!0)}for(const[n,s]of ni)e.has(n)||(s.el.remove(),ni.delete(n))}let ae=null,ha="",Tl=0,Hd=0,Pa={x:0,perch:0,leap:!1};const UE=562;function Tu(e){return(e.rooms[e.currentRoom]?.items.filter(n=>n.kind==="cat-tower")??[]).reduce((n,s)=>!n||s.z>=n.z?s:n,null)}function Wp(e){return e==="cat-bed"||e==="pet-bed"||e==="dog-bed"||e==="pack:cat-bed"||/(?:^|:)cat-bed$|(?:^|:)pet-bed$/.test(e)}function VE(e){const t=e.rooms[e.currentRoom]?.items??[],n=t.filter(a=>Wp(a.kind)),s=t.filter(a=>a.kind==="bed"),o=(n.length?n:s).reduce((a,r)=>!a||r.z>=a.z?r:a,null);if(!o)return null;const i=Me[o.kind];return{x:o.x,y:o.y,h:i?ft(i)*Ye(o):80,pet:Wp(o.kind)}}function QE(){const e=C.get();!e.cat||e.cat.room!==e.currentRoom||!Tu(e)||(Hd=performance.now()+900,P.boing(),b?.fx({k:"leap"}))}function zE(){const e=C.get(),t=S==="house"?e.cat:null;if(!t||t.room!==e.currentRoom){ae&&(ae.remove(),ae=null,ha="",Tl=0);return}(!ae||!ae.isConnected)&&(ae=document.createElement("div"),ae.className="pet pet-cat",ee.appendChild(ae),ha="",ae.addEventListener("pointerdown",A=>{A.stopPropagation(),A.preventDefault()}),ae.addEventListener("click",A=>{A.stopPropagation(),Bu(),b&&b.fx({k:"purr"})}));const n=Tu(e),s=n?null:VE(e),o=n?Me[n.kind]:void 0,i=n&&o?ft(o)*Ye(n):0,a=i2(t,Date.now(),n?{x:n.x}:null,s?{x:s.x}:null,To()),r=!!n&&performance.now()<Hd,l=r?2:a.perch,c=r&&n?n.x:a.x,d=r?"play":a.mood,f=d==="walk"?"stand":d==="nap"?"nap":"sit",h=f+t.coat+(l?"p":"");if(h!==ha){const A=[...ae.querySelectorAll(".bubble, .heart")];ae.innerHTML=`<div class="inner">${wo(t.coat,f)}</div>${f==="nap"?'<div class="zzz"><i>z</i><i>z</i><i>z</i></div>':""}`;for(const H of A)ae.appendChild(H);ha=h}if(l>0&&Tl===0){ae.classList.add("hop");const A=ae;setTimeout(()=>A.classList.remove("hop"),420)}Tl=l,ae.dataset.name=t.name,ae.dataset.mood=d,ae.dataset.perch=String(l),ae.dataset.leap=r?"1":"0",ae.dataset.curl=a.curl?"1":"0",ae.classList.toggle("walking",d==="walk"),ae.classList.toggle("groom",d==="groom"),ae.classList.toggle("play",d==="play"&&!r),ae.classList.toggle("leap",r),ae.classList.toggle("flipped",a.flip),ae.classList.toggle("curl",a.curl===1),ee.querySelectorAll(".item.toy-live").forEach(A=>A.classList.remove("toy-live")),n&&d==="play"&&l&&!r&&ee.querySelector(`.item[data-id="${n.id}"]`)?.classList.add("toy-live");const g=window.__pinCat,m=!!(g&&Number.isFinite(g.x)),k=m&&Number.isFinite(g.y)?g.y:UE,$=!m&&l&&n?s2(n.y,i,l):!m&&a.curl&&s?s.y-s.h*(s.pet?.38:.2):k,y=e.currentRoom==="backyard"&&!l,u=!m&&l?92:y?115:128,w=!m&&l?110:y?135:150,_=m?g.x:e.currentRoom==="backyard"?Xn.x:Ru(c,w/2),T=!m&&e.currentRoom==="backyard"&&!l?Xn.y:$;Ks(ae,_,T,w,u),ae.style.zIndex=String(4e3+Math.round(T)),Pa={x:_,perch:l,leap:r}}function Ru(e,t){const n=C.get().currentRoom,s=n==="backyard"?Ih:n==="living"?Dh:null;if(!s)return e;const o=s.x-s.w/2-t-16,i=s.x+s.w/2+t+16;return e<=o||e>=i?e:e<s.x?o:i}function Bu(){if(!ae)return;P.purr(),setTimeout(()=>P.meow(),250),ae.querySelector(".bubble")?.remove();const e=document.createElement("div");e.className="bubble petBubble",e.textContent=`${ae.dataset.name} purrs ♥`,ae.appendChild(e),Ao(),setTimeout(()=>e.classList.add("out"),1500),setTimeout(()=>e.remove(),1900),ae.classList.remove("happy"),ae.offsetWidth,ae.classList.add("happy");for(let t=0;t<5;t++){const n=document.createElement("div");n.className="heart",n.textContent="♥",n.style.left=20+Math.random()*60+"%",n.style.animationDelay=t*.12+"s",n.style.color=["#ff6b9a","#ff8fab","#e879c6"][t%3],ae.appendChild(n),setTimeout(()=>n.remove(),1800)}}function qE(e,t){if(t.k==="zoo"||t.k==="apple"||t.k==="honk"||t.k==="hen"){iC(t);return}t.k==="trick"?Lu(t.owner,t.v):t.k==="purr"?S==="house"&&Bu():t.k==="leap"?S==="house"&&(Hd=performance.now()+900):t.k==="ball"?Mu(e,t.x,t.y):t.k==="splash"&&$u(t.x)}function Au(e){const t=Math.min(.05,Math.max(0,(e-Dp)/1e3));Dp=e;try{LE(e,t),WE(),zE(),rC(e,t),iL(t),eg()}catch{}requestAnimationFrame(Au)}function ZE(){return b?b.view(b.myHouseId())?.cat??null:J.get().cat??null}function Od(){return b?b.players.get(b.pid)?.dog??null:J.get().dog??null}function si(e){if(b){const t=b.myHouseId();t&&b.dispatch(t,e)}else J.dispatch(e)}const fr=()=>S==="house"&&(!b||Ie===J||Pe===b.myHouseId());function NE(e="cat"){const t=ZE(),n=Od(),s=J.get().characters,o={tab:e,coat:t?.coat??0,catName:t?.name??"",breed:n?.breed??0,dogName:n?.name??"",owner:n?.owner??s[0]?.id,err:"",bye:!1},i=Nt("",(l,c)=>{const d=g=>l.closest(`[${g}]`)?.getAttribute(g);if(d("data-pt")){o.tab=d("data-pt"),o.err="",o.bye=!1,r();return}if(d("data-coat")!=null){o.coat=+d("data-coat"),P.click(),r();return}if(d("data-breed")!=null){o.breed=+d("data-breed"),P.click(),r();return}if(d("data-cname")){o.catName=d("data-cname"),P.click(),r();return}if(d("data-dname")){o.dogName=d("data-dname"),P.click(),r();return}if(d("data-owner")){o.owner=d("data-owner"),P.click(),r();return}const f=d("data-pa");if(!f)return;const h=(i.root.querySelector("#petName")?.value??"").trim();if(f==="adoptCat"||f==="adoptDog"){const g=h||(f==="adoptCat"?o.catName:o.dogName),m=yh(g);if(!m){o.err=g?"Hmm, try a different name!":"Pick a name first!",P.pop(),r();return}if(f==="adoptCat"){const k=fr(),$={name:m,coat:o.coat,room:k?C.get().currentRoom:t?.room??"living",x:k?Math.max(200,Math.min(me-200,le+ce/2)):t?.x??1200};si({type:"cat/set",cat:$}),P.meow(),c(),N(t?`${m} looks great! 🐱`:k?`${m} moved in! 🐱`:`${m} is waiting at your house! 🐱`)}else{const k=b?{name:m,breed:o.breed}:{name:m,breed:o.breed,owner:o.owner};b?(b.setDog(k),S==="park"&&Ns()):J.dispatch({type:"dog/set",dog:k}),P.woof(),c(),N(n?`${m} looks great! 🐶`:`${m} is your new best friend! 🐶`)}return}if(f==="callCat"){si({type:"cat/move",room:C.get().currentRoom,x:Math.max(200,Math.min(me-200,le+ce/2))}),P.meow(),c();return}if(f==="kennelDog"){Id(),c();return}if(f==="bye"){if(!o.bye){o.bye=!0,r();return}o.tab==="cat"?si({type:"cat/set",cat:null}):(si({type:"dog/kennel",item:null}),b?b.setDog(null):J.dispatch({type:"dog/set",dog:null})),c(),N("They went to live with a kind friend 💛");return}},"wide pets"),a=i.root.querySelector(".card");function r(){const l=o.tab==="cat",c=l?t:n,d=l?F1:j1,f=l?o.catName:o.dogName,h=i.root.querySelector("#petName")?.value??"";a.innerHTML=`${Ft}<h2>Pets</h2>
      <div class="petTabs"><button data-pt="cat" class="${l?"on":""}">🐱 Cat</button><button data-pt="dog" class="${l?"":"on"}">🐶 Dog</button></div>
      <p class="hint small">${l?b?"Your cat lives in your house. Friends can see her when they visit!":"Your cat lives in your house. She naps, purrs, and plays!":b?"Your dog follows you everywhere: the street, friends' houses, and the park!":"Your dog follows you around the house and to the park!"}</p>
      <div class="petRow"><div class="petPreview">${l?wo(o.coat,"sit"):vi(o.breed,"stand")}</div>
        <div class="swatches">${(l?Nl:Fl).map((g,m)=>`<button ${l?"data-coat":"data-breed"}="${m}" class="${m===(l?o.coat:o.breed)?"on":""}"><div>${l?wo(m,"sit"):vi(m,"stand")}</div><span>${g.name}</span></button>`).join("")}</div></div>
      <div class="label">Name</div>
      <div class="nameChips">${d.map(g=>`<button ${l?"data-cname":"data-dname"}="${g}" class="${g===f?"on":""}">${g}</button>`).join("")}</div>
      <input id="petName" class="petName" maxlength="14" autocomplete="off" placeholder="…or type a name" value="${de(h)}"/>
      ${o.err?`<p class="err" id="petErr">${de(o.err)}</p>`:""}
      ${!l&&!b&&s.length>1?`<div class="label">Who does your dog follow?</div><div class="walkers">${s.map(g=>`<button data-owner="${g.id}" class="${g.id===o.owner?"on":""}">${bt(g)}</button>`).join("")}</div>`:""}
      <div class="petBtns"><button class="go" data-pa="${l?"adoptCat":"adoptDog"}" id="adoptBtn">${c?"Save":"Adopt! 💛"}</button>
        ${l&&t&&fr()?'<button data-pa="callCat" id="callCat">Here, kitty!</button>':""}
        ${!l&&n?`<button data-pa="kennelDog" id="kennelDog">${Fr(Dd())?"Come, puppy!":"Kennel"}</button>`:""}
        ${c?`<button class="danger" data-pa="bye">${o.bye?"Tap again to say goodbye":"Find a new home"}</button>`:""}</div>`}r()}M("btnPets").addEventListener("click",()=>NE(S==="house"?"cat":"dog"));requestAnimationFrame(Au);window.__pets=()=>{const e=Eu(),t=e?ni.get(e.key):void 0;return{dogs:[...jn.keys()],dogPos:Object.fromEntries([...jn].map(([n,s])=>[n,{x:Math.round(s.x),y:Math.round(s.y)}])),cat:ae?{mood:ae.dataset.mood,name:ae.dataset.name,perch:Pa.perch,x:Math.round(Pa.x),leap:Pa.leap,curl:ae.dataset.curl==="1"}:null,kennel:e&&t?{x:Math.round(t.x),y:Math.round(t.y),pose:t.pose,name:e.dog.name,item:e.item.id}:null,dogKennel:C.get().dogKennel??null,fetch:He?.phase??null,ball:Fn,view:S}};function on(){return M("ranch").clientHeight/Wi}let $t=[];const Si=e=>String(100+Math.round(e)),Du=220,FE=Du*130/160,Iu=156,jE=Iu*130/160,GE=.6,YE=3.5,KE=3,Ec=10,ss=new Map,Ta=new Map;function pr(e,t,n=Ec){const s=(e-mt.x)/(mt.rx+n),o=(t-mt.y)/(mt.ry+n);return s*s+o*o<1}function Rl(e,t,n,s){for(let o=0;o<=18;o++){const i=o/18;if(pr(e+(n-e)*i,t+(s-t)*i))return!0}return!1}function hr(e,t){return{x:Math.max(70,Math.min(Ud()-70,e)),y:Math.max(Bs,Math.min(Dn,t))}}function XE(e,t){const n=hr(t.x,t.y);if(pr(n.x,n.y,6))return null;if(!Rl(e.x,e.y,n.x,n.y))return[n];const s=mt.x-mt.rx-Ec-28,o=mt.x+mt.rx+Ec+28;let i=null,a=1/0;for(const r of[Bs+1,Dn-2]){const l=[];let c=e.x,d=e.y;const f=($,y)=>{const u=hr($,y);l.push(u),c=u.x,d=u.y};Rl(c,d,c,r)&&f(c<mt.x?s:o,d),Math.abs(d-r)>3&&f(c,r),Math.abs(c-n.x)>3&&f(n.x,r),l.push(n);let h=!0,g=e.x,m=e.y,k=0;for(const $ of l){if(Rl(g,m,$.x,$.y)||pr($.x,$.y,4)){h=!1;break}k+=Math.hypot($.x-g,$.y-m),g=$.x,m=$.y}h&&k<a&&(i=l,a=k)}return i}function Hu(e,t){const n=kn();if(!n)return;const s={x:Math.max(60,Math.min(Ud()-60,e)),y:Math.max(Bs,Math.min(Dn,t))};if(n.ride!==void 0&&n.where==="ranch"){const o=XE(n,s);if(!o){N("The horse won't splash through the pond!"),P.pop();return}$t=o}else $t=[s]}function JE(e){if(e.look2)return eM(e.look2);const t=e.pants,n="#5a3d5c",s=(o,i,a,r)=>`<path class="${o}" d="${i}" fill="none" stroke="${n}" stroke-width="${a}" stroke-linecap="round"/><path class="${o} cloth" d="${i}" fill="none" stroke="${t}" stroke-width="${r}" stroke-linecap="round"/>`;return`<svg class="rideleg" viewBox="0 0 160 130">${s("thigh","M66 56 L102 66",13,8)}${s("shin","M102 68 L106 104",12,7.2)}<circle class="knee" cx="102" cy="67" r="6.2" fill="${t}" stroke="${n}" stroke-width="3.5"/><ellipse class="shoe" cx="116" cy="106" rx="11" ry="5.2" fill="${n}"/></svg>`}function os(){return document.body.classList.contains("phone")&&document.body.classList.contains("phone-portrait")&&!Oe}function jr(){if(!os())return jp.map((t,n)=>n);const e=[0,2,4];for(const t of ns("ranch")){const n=t.p.ride;n!==void 0&&e.indexOf(n)<0&&e.push(n)}return e}function ls(e){if(!os())return jp[e];const t=jr(),n=t.indexOf(e),s=t.length,o=n<0?0:n,i=Wd().w/2,a=2400+i+18,r=3080-i-18;return s<=1?Math.round((a+r)/2):Math.round(a+(r-a)*o/(s-1))}function Wd(){return os()?{w:131,h:106}:{w:150,h:122}}function gr(e,t,n){const s=on(),{w:o,h:i}=Wd();e.style.left=(t-o/2)*s+"px",e.style.top=(n-i)*s+"px",e.style.width=o*s+"px",e.style.height=i*s+"px",e.style.zIndex=Si(n)}function eC(){if(S!=="ranch"||Oe||!document.body.classList.contains("phone"))return;const e=new Set(jr());document.querySelectorAll("#ranchWorld .horse").forEach(t=>{const n=+t.dataset.horse;t.classList.toggle("stallOff",os()&&!e.has(n)),!(!e.has(n)||ss.has(n)||t.classList.contains("away"))&&gr(t,ls(n),As)})}function tC(e,t,n){if(ss.has(e)||Math.hypot(t-ls(e),n-As)<26)return;ss.set(e,{x:t,y:n});const s=document.querySelector(`#ranchWorld .horse[data-horse="${e}"]`);s&&(s.classList.add("trotting"),s.classList.remove("away"),s.classList.toggle("flipped",ls(e)<t),gr(s,t,n))}function nC(e,t,n){const s=n?-1:1;for(const o of[s*118,-s*118,s*160,-s*78])for(const i of[0,30,-26,48]){const a=hr(e+o,t+i);if(!(Math.hypot(a.x-e,a.y-t)<50)&&!pr(a.x,a.y,8))return a}return hr(e,t)}let Up=0,Ou=0;const Gr=()=>b?b.now():Date.now(),Yr=()=>Hc(b?b.ranch.plots:J.get().garden),zi=()=>Ic(b?b.players.get(b.pid)?.basket:J.get().basket),Ud=()=>Oe?Ac:Ri,Wu=()=>Oe?"barn":"ranch",Uu=()=>{const e=new Map;for(const t of ns("ranch"))t.p.ride!==void 0&&e.set(t.p.ride,t);return e};function Cc(e){const t={taken:"A friend just planted there!",wet:"Already watered 💧",notReady:"Still growing! 🌱",full:"Your basket is full!",slow:"The hen is laying… try again!",none:"Your basket has none left",nohouse:"Go home to put it in your room"};t[e]&&(N(t[e]),P.pop())}function bo(e){if(b){const o=Il(Yr(),zi(),e,Gr(),e.op==="egg"?Up:0);return typeof o=="string"?(Cc(o),!1):(e.op==="egg"&&(Up=Date.now()),b.ranchOp(e),!0)}const t=J.get(),n=Date.now(),s=Il(Hc(t.garden),Ic(t.basket),e,n,t.lastEgg??0);return typeof s=="string"?(Cc(s),!1):(J.dispatch({type:"ranch/op",op:e,now:n}),Kr(!0),zd(),!0)}function Pi(e=!1){const t=S==="ranch"&&Oe&&!e;Js(),M("ranch").classList.remove("hidden"),He=null,$t=[],S="ranch",Oe=e;const n=e?{where:"barn",x:170,y:560,flip:!1}:{where:"ranch",x:t?Bl:130,y:t?520:565,flip:!1};b?Ge(n):It=n,M("streetTitle").textContent=e?"The Barn":"Rainbow Ranch",bn(),Vd(),requestAnimationFrame(()=>{const s=M("ranchScroll"),o=on();s.scrollLeft=t?Math.max(0,Bl*o-s.clientWidth/2):0,Pc()}),setTimeout(Pc,650),Qi(M("ranch")),e?P.swish():P.sparkle()}M("btnHopOff").addEventListener("click",()=>Vu());function Vd(){const e=on(),t=M("ranchWorld"),n=o=>o*e+"px",s=(o,i,a,r)=>`left:${n(o-a/2)};top:${n(i-r)};width:${n(a)};height:${n(r)};z-index:${Si(i)}`;if(t.style.width=Ud()*e+"px",t.style.height=Wi*e+"px",t.style.setProperty("--sc",String(e)),Oe){t.innerHTML=JM()+`<button class="rprop barnExit" data-r="exit" aria-label="Go outside" style="${s(127,444,206,244)}"><span class="exitHint"><span>Outside ☀️</span></span></button>`+Es.map((o,i)=>`<button class="animal" data-animal="${i}" aria-label="${sg[i].name}" style="${s(Dc[i],Z0+30,128,107)}">${fc(i)}</button>`).join("")+[300,1244].map(o=>["carrot","apple","hay"].map((i,a)=>`<button class="bucket" data-feed="${i}" aria-label="${i} bucket" style="${s(o+a*56,592,54,62)}">${NM(i)}</button>`).join("")).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',is(),it();return}t.innerHTML=WM()+UM().replace("<svg ",`<svg style="z-index:${Si(VM)}" `)+`<button class="rprop barnDoor" data-r="barn" aria-label="Go into the barn" style="${s(Bl,472,150,150)}"><span class="doorHint"><span>Petting zoo inside! 🐐</span></span></button><button class="rprop windmill" data-r="mill" aria-label="Windmill" style="${s(1540,478,150,240)}">${YM}</button><button class="rprop henHouse" data-r="egg" aria-label="Hen house" style="${s(715,482,180,170)}">${QM}</button><button class="rprop tractor" data-r="honk" aria-label="Tractor" style="${s(900,580,170,130)}">${zM}</button><button class="rprop appleTree" data-r="apple" aria-label="Apple tree" style="${s(2085,482,240,300)}">${qM}</button>`+N0.map((o,i)=>{const a=Wd();return`<button class="horse${os()&&jr().indexOf(i)<0?" stallOff":""}" data-horse="${i}" aria-label="${Ka[i].name} horse" style="${s(ls(i),As,a.w,a.h)}">${rd(i)}</button>`}).join("")+Array.from({length:Al},(o,i)=>`<button class="plot" data-plot="${i}" aria-label="Garden plot" style="${s(j0(i),594,66,86)}"></button>`).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',Kr(!0),is(),it()}const ga=[];function Kr(e=!1){if(S!=="ranch"||Oe)return;const t=Yr(),n=Gr();document.querySelectorAll("#ranchWorld .plot").forEach(s=>{const o=+s.dataset.plot,i=t[o]??null,a=Er(i,n),r=JSON.stringify(i)+a;!e&&ga[o]===r||(ga[o]!==void 0&&ga[o]!==r&&a>0&&(s.classList.remove("grow"),s.offsetWidth,s.classList.add("grow")),ga[o]=r,s.innerHTML=ag(i,a,o),s.dataset.stage=i?String(a):"empty")})}function is(){const e=document.getElementById("ravatars");if(!e||S!=="ranch")return;const t=on(),n=new Set,s=new Set;let o=!1;for(const i of ns(Wu())){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&_u(a));const r=JSON.stringify(i.look)+i.name;if(a.dataset.look!==r){const g=a.querySelector(".bubble");a.innerHTML=i.name?Cd(i.look,i.name):`<div class="inner">${bt(i.look)}</div>`,g&&a.appendChild(g),a.dataset.look=r,a.dataset.ride=""}const l=i.p.ride,c=(Vs[i.look.size]??1)*t*.95*(l!==void 0?GE:1),d=ps*c,f=yn*c;if(a.dataset.ride!==String(l??"")&&(a.querySelector(".mount")?.remove(),l!==void 0&&a.insertAdjacentHTML("afterbegin",`<div class="mount" data-mount="${l}">${rd(l,!0)}${JE(i.look)}</div>`),a.dataset.ride=String(l??"")),a.classList.toggle("riding",l!==void 0),l!==void 0){s.add(l),i.mine&&(o=!0),Ta.set(l,{x:i.p.x,y:i.p.y});const g=os()?Iu:Du,m=os()?jE:FE,k=g*t,$=m*t,y=a.querySelector(".mount");y.style.width=k+"px",y.style.height=$+"px",y.style.left=(d-k)/2+"px",y.style.top=f-$+"px";const u=Number(a.querySelector(".shirt")?.getAttribute("data-hem")??126),w=Number(y.querySelector(".saddle")?.getAttribute("data-top")??43),_=(u+YE/2)/160*f,T=f-$+(w-KE/2)/130*$;a.style.setProperty("--lift",_-T+"px");const A=y.querySelector(".rideleg");A&&(A.style.left="0",A.style.top="0",A.style.width="100%",A.style.height="100%")}else a.style.removeProperty("--lift");const h=parseFloat(a.dataset.lx??"NaN");Number.isFinite(h)&&Math.abs(h-i.p.x)>2&&(a.classList.add("moving"),clearTimeout(+(a.dataset.mt??0)),a.dataset.mt=String(window.setTimeout(()=>a.classList.remove("moving"),260))),a.dataset.lx=String(i.p.x),a.style.left=i.p.x*t-d/2+"px",a.style.top=i.p.y*t-f+"px",a.style.width=d+"px",a.style.height=f+"px",a.style.zIndex=Si(i.p.y),a.classList.toggle("flipped",i.p.flip),Oi(a,i.look,i.mine)}if(e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),document.body.classList.contains("phone")){const i=new Set(jr());document.querySelectorAll("#ranchWorld .horse").forEach(a=>{a.classList.toggle("stallOff",os()&&!i.has(+a.dataset.horse))})}document.querySelectorAll("#ranchWorld .horse").forEach(i=>{const a=+i.dataset.horse;s.has(a)?(i.classList.add("away"),ss.delete(a)):i.classList.remove("away")});for(const[i,a]of[...Ta])s.has(i)||(tC(i,a.x,a.y),Ta.delete(i));document.body.classList.toggle("riding",o),Xs()}function sC(e){const t=kn();if(!t||t.where!=="ranch")return;const n=Uu().get(e);if(n&&!n.mine){N("Someone is riding!"),P.pop();return}if(t.ride!==void 0){if(n?.mine||t.ride===e){Vu();return}Hu(ls(e),Math.min(Dn,As+8));return}$t=[],ss.delete(e),tn({where:"ranch",x:ls(e),y:Math.min(Dn,As+8),flip:!1,ride:e}),P.neigh(),N(`You're riding ${Ka[e].name}! Tap the ground to gallop 🐴`)}function Vu(){const e=kn();if(!e||e.ride===void 0)return;const t=e.ride,{ride:n,...s}=e;$t=[];const o=nC(s.x,s.y,s.flip);Ta.set(t,{x:s.x,y:s.y}),tn({...s,x:o.x,y:o.y}),P.drop()}function Qd(e,t){const n=e<Es.length?document.querySelector(`#ranchWorld .animal[data-animal="${e}"]`):document.querySelector(`#ranchWorld .horse[data-horse="${e-Es.length}"]:not(.away)`)??document.querySelector(`#ravatars .mount[data-mount="${e-Es.length}"]`);if(!n||S!=="ranch")return;const s=e>=Es.length,o=s?{say:"Neigh! ♥",snd:"neigh"}:sg[e];n.classList.remove("hop","munch"),n.offsetWidth,n.classList.add(t?"munch":"hop"),setTimeout(()=>n.classList.remove("hop","munch"),1400),n.querySelector(".abubble")?.remove();const i=document.createElement("div");i.className="bubble petBubble abubble",i.textContent=t?`Yum! Munch munch ${t===1?"🥕":t===2?"🍎":"🌾"}`:o.say,n.appendChild(i),Ao(),setTimeout(()=>i.classList.add("out"),1400),setTimeout(()=>i.remove(),1800);for(let a=0;a<(t?6:4);a++){const r=document.createElement("div");r.className="heart",r.textContent="♥",r.style.left=15+Math.random()*70+"%",r.style.animationDelay=a*.12+"s",r.style.color=["#ff6b9a","#ff8fab","#e879c6","#b197fc"][a%4],n.appendChild(r),setTimeout(()=>r.remove(),1900)}P[o.snd]?.(),t&&setTimeout(()=>P.munch(),250)}function Qu(){const e=document.querySelector("#ranchWorld .henHouse");e&&(e.classList.remove("lay"),e.offsetWidth,e.classList.add("lay"),P.cluck())}function oC(){const e=document.querySelector("#ranchWorld .henHouse"),t=M("basketChip");if(!e)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=document.createElement("div");o.className="flyEgg",o.innerHTML=$i,document.body.appendChild(o),Object.assign(o.style,{left:n.left+n.width/2-18+"px",top:n.top+n.height*.6+"px"}),requestAnimationFrame(()=>{o.style.left=s.left+s.width/2-18+"px",o.style.top=s.top+"px",o.style.transform="scale(.6) rotate(200deg)"}),setTimeout(()=>{o.remove(),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")},650)}function zu(e){const t=document.getElementById("rfx");if(!t||S!=="ranch")return;const n=on(),[s,o]=Jf[e]??Jf[0],i=1965+s,a=182+o,r=i+(e%2?26:-22),l=575+e*4,c=document.createElement("button");c.className="fallenApple",c.dataset.feed="apple",c.setAttribute("aria-label","Apple"),c.innerHTML=og;const d=32*n;Object.assign(c.style,{width:d+"px",height:d+"px",left:i*n-d/2+"px",top:a*n-d/2+"px",zIndex:Si(l)}),t.appendChild(c),requestAnimationFrame(()=>{c.style.left=r*n-d/2+"px",c.style.top=l*n-d+"px",c.classList.add("fallen")});const f=document.querySelector("#ranchWorld .appleTree");f?.classList.remove("shake"),f?.offsetWidth,f?.classList.add("shake"),P.boing(),setTimeout(()=>c.remove(),12e3)}function qu(){const e=document.querySelector("#ranchWorld .tractor");e?.classList.remove("bounce"),e?.offsetWidth,e?.classList.add("bounce"),P.honk()}function iC(e){e.k==="zoo"?Qd(e.a,e.f):e.k==="apple"?zu(e.v):e.k==="honk"?qu():e.k==="hen"&&Qu()}function Vp(e,t){const n=document.elementFromPoint(e,t);if(!n)return null;const s=n.closest("[data-animal]");if(s)return+s.dataset.animal;const o=n.closest(".horse:not(.away)");if(o)return Es.length+ +o.dataset.horse;const i=n.closest(".savatar.riding");return i?.dataset.ride?Es.length+ +i.dataset.ride:null}function Sc(e,t,n){e.preventDefault(),e.stopPropagation();const s=document.createElement("div");s.className="feedGhost",s.innerHTML=ig[t],document.body.appendChild(s);const o=m=>{s.style.left=m.clientX-30+"px",s.style.top=m.clientY-50+"px"};o(e),P.pick();let i=0;const a=e.clientX,r=e.clientY;n instanceof HTMLElement&&(n.style.visibility="hidden");let l=e.clientX,c=0;const d=M("ranchScroll"),f=()=>{const m=d.getBoundingClientRect(),k=l<m.left+60?-12:l>m.right-60?12:0;k&&i>12&&S==="ranch"&&(d.scrollLeft+=k),c=requestAnimationFrame(f)};c=requestAnimationFrame(f);const h=m=>{if(m.pointerId!==e.pointerId)return;l=m.clientX,i=Math.max(i,Math.hypot(m.clientX-a,m.clientY-r)),o(m),document.querySelectorAll(".feedHover").forEach($=>$.classList.remove("feedHover")),Vp(m.clientX,m.clientY)!==null&&document.elementFromPoint(m.clientX,m.clientY)?.closest(".animal, .horse, .savatar")?.classList.add("feedHover")},g=m=>{if(m.pointerId!==e.pointerId)return;cancelAnimationFrame(c),window.removeEventListener("pointermove",h),window.removeEventListener("pointerup",g),s.remove(),Ou=Date.now(),document.querySelectorAll(".feedHover").forEach(y=>y.classList.remove("feedHover"));const k=Vp(m.clientX,m.clientY);if(k===null){n instanceof HTMLElement&&(n.style.visibility=""),i<12?N("Drag the food onto an animal! 🥕"):P.drop();return}if(n==="basket"&&!bo({op:"use",kind:"carrot"}))return;n instanceof HTMLElement&&n.remove();const $=F0.indexOf(t);Qd(k,$),b?.fx({k:"zoo",a:k,f:$})};window.addEventListener("pointermove",h),window.addEventListener("pointerup",g)}M("ranchWorld").addEventListener("pointerdown",e=>{const t=e.target,n=t.closest(".bucket");if(n)return Sc(e,n.dataset.feed,"bucket");const s=t.closest(".fallenApple");if(s)return Sc(e,"apple",s);t.closest(".rprop, .animal, .horse, .plot, .pet")&&e.stopPropagation()});M("ranchWorld").addEventListener("click",e=>{const t=e.target;if(!kn()||S!=="ranch"||Date.now()-Ou<400)return;const s=t.closest("[data-animal]");if(s){const f=+s.dataset.animal;Qd(f,0),b?.fx({k:"zoo",a:f,f:0});return}const o=t.closest("[data-horse]");if(o){sC(+o.dataset.horse);return}const i=t.closest("[data-r]")?.dataset.r;if(i==="egg"){Qu(),bo({op:"egg"})&&(oC(),P.pickup());return}if(i==="honk"){qu(),b?.fx({k:"honk"});return}if(i==="apple"){const f=Math.floor(Math.random()*4);zu(f),b?.fx({k:"apple",v:f});return}if(i==="barn"){Pi(!0);return}if(i==="exit"){Pi(!1);return}if(i==="mill"){const f=t.closest(".windmill");f?.classList.remove("whirl"),f?.offsetWidth,f?.classList.add("whirl"),P.swish();return}const a=t.closest("[data-plot]");if(a){aC(+a.dataset.plot,a);return}if(t.closest(".bucket, .fallenApple, .savatar, .pet"))return;const r=M("ranchWorld").getBoundingClientRect(),l=on(),c=(e.clientX-r.left)/l,d=(e.clientY-r.top)/l;d<400||Hu(c,d)});function aC(e,t){const n=Yr()[e]??null,s=Er(n,Gr());if(document.querySelector(".seedPick")?.remove(),!n){const o=document.createElement("div");o.className="seedPick",o.innerHTML=`<button data-seed="carrot">${Or}<span>Carrot</span></button><button data-seed="flower">${ld()}<span>Flower</span></button>`,t.parentElement.appendChild(o),o.style.left=t.offsetLeft+t.offsetWidth/2+"px",o.style.top=t.offsetTop-8+"px",o.addEventListener("pointerdown",i=>i.stopPropagation()),o.addEventListener("click",i=>{i.stopPropagation();const a=i.target.closest("[data-seed]")?.dataset.seed;o.remove(),a&&bo({op:"plant",i:e,seed:a})&&(P.plant(),N("Planted! Now tap it to water 💧"))}),setTimeout(()=>o.remove(),6e3);return}if(!n.wet){bo({op:"water",i:e})&&(P.water(),t.classList.remove("watering"),t.offsetWidth,t.classList.add("watering"));return}if(s<3){N("Still growing! 🌱"),P.pop();return}bo({op:"pick",i:e})&&(P.pickup(),N(n.seed==="carrot"?"A carrot for your basket! 🥕":"Pretty flowers for your basket! 🌸"))}let Qp=0;function rC(e,t){if(S!=="ranch")return;const n=Date.now();if(document.querySelectorAll("#ranchWorld .animal").forEach(s=>{const o=+s.dataset.animal,i=on(),a=n/5200+o*1.7,r=(Oe?Dc:q0)[o]+Math.sin(a)*32;s.style.left=(r-s.offsetWidth/i/2)*i+"px",s.classList.toggle("flipped",Math.cos(a)<0),s.classList.toggle("walking",Math.abs(Math.cos(a))>.35)}),e-Qp>1e3&&(Qp=e,Kr()),$t.length){const s=kn();if(!s||s.where!==Wu())$t=[];else{const o=$t[0],i=s.ride!==void 0?720:300,a=o.x-s.x,r=o.y-s.y,l=Math.hypot(a,r);if(l<6)$t.shift();else{const c=Math.min(l,i*t),d={...s,x:s.x+a/l*c,y:s.y+r/l*c,flip:Math.abs(a)>2?a<0:s.flip};tn(d);const f=on(),h=M("ranchScroll"),g=d.x*f-h.scrollLeft;g>-40&&g<h.clientWidth+40&&(g<h.clientWidth*.2||g>h.clientWidth*.8)&&(h.scrollLeft=d.x*f-h.clientWidth/2)}}}for(const[s,o]of ss){const i=document.querySelector(`#ranchWorld .horse[data-horse="${s}"]`);if(!i||i.classList.contains("away")){ss.delete(s);continue}const a=ls(s)-o.x,r=As-o.y,l=Math.hypot(a,r);if(l<8){ss.delete(s),i.classList.remove("trotting","flipped"),gr(i,ls(s),As);continue}const c=Math.min(l,460*t);o.x+=a/l*c,o.y+=r/l*c,i.classList.add("trotting"),i.classList.toggle("flipped",a<0),gr(i,o.x,o.y)}}function zd(){const e=document.getElementById("basketChip");if(!e)return;const t=S==="house"&&(!b||Ie===J||Pe===b.myHouseId()),n=zi(),o=n.egg+n.carrot+n.flower>0&&(S==="ranch"||t);e.classList.toggle("hidden",!o),e.classList.toggle("inHouse",S==="house"),o&&(e.innerHTML=`<span class="bIcon">${FM}</span><span class="bcount" data-kind="egg">${$i}<b>${n.egg}</b></span><span class="bcount" data-kind="carrot">${Or}<b>${n.carrot}</b></span><span class="bcount" data-kind="flower">${ld()}<b>${n.flower}</b></span>`)}M("basketChip").addEventListener("pointerdown",e=>{e.target.closest('.bcount[data-kind="carrot"]')&&S==="ranch"&&zi().carrot>0&&Sc(e,"carrot","basket")});M("basketChip").addEventListener("click",()=>lC());function lC(){const e=S==="house"&&(!b||Ie===J||Pe===b.myHouseId()),t={egg:["Eggs",$i],carrot:["Carrots",Or],flower:["Flowers",ld()]},n=Nt("",(o,i)=>{const a=o.closest("[data-take]")?.dataset.take;if(!a)return;if(!e){N("Take it home to put it in your room! 🏠");return}const r="r"+Math.random().toString(36).slice(2,10),l=Math.max(120,Math.min(me-120,le+ce/2+(Math.random()-.5)*300));bo({op:"take",kind:a,id:r,room:C.get().currentRoom,x:l})&&(P.drop(),i(),N("It's in your room! Drag it to a hand to carry it ✋"))},"basketSheet"),s=zi();n.root.querySelector(".card").innerHTML=`${Ft}<h2>My Basket</h2><p class="hint small">${e?"Tap one to put it in your room.":"Collect eggs, carrots and flowers at Rainbow Ranch, then take them home!"}</p>
    <div class="basketRows">${Gp.map(o=>`<button class="bRow" data-take="${o}" ${s[o]?"":"disabled"}>${t[o][1]}<b>${s[o]}</b><span>${t[o][0]}</span></button>`).join("")}</div>`}window.__ranch=()=>({view:S,inBarn:Oe,plots:Yr().map(e=>e?{seed:e.seed,stage:Er(e,Gr()),wet:!!e.wet}:null),basket:zi(),me:kn(),ridden:[...Uu().keys()]});function cC(){if(Jo.kind==="none")return;v9(),Nt(_9(Jo.kind,Jo.entries),(t,n)=>{t.closest("#wnGo")&&(P.sparkle(),n())},"whatsNew "+Jo.kind).root.querySelector(".card").insertAdjacentHTML("afterbegin",Ft)}setTimeout(cC,500);window.__whatsnew=Jo;window.__hood=()=>b;window.__hood_url=()=>Pr();window.__ui=()=>({view:S,currentHouseId:Pe,mode:b?"hood":"solo",play:Re.mode()});tL({hood:()=>b,view:()=>S,solo:()=>It,myPres:ke,setPres:tn,toast:N,refreshNear:Xs,sfx:P,goMap:yo,soloLook:()=>{const e=J.get();return{look:Di(e.characters[0]??{}),dog:e.dog??null}}});function Zu(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n.items)t.add(s.kind);for(const n of e.characters)n.held.left&&t.add(n.held.left.kind),n.held.right&&t.add(n.held.right.kind);return e.baby&&t.add("baby"),[...t]}let ua=null,qd=()=>!1;function Nu(e){return ua||(ua=p(()=>Promise.resolve().then(()=>jc),void 0).then(t=>(qd=t.hasArt,t.boot(location.search,Zu(C.get())))).then(t=>{for(let n=0;n<t.length;n++)if(Me[t[n]]){Zs();break}iu()}),ua)}function dC(e){const t=new Set(e),n=C.get();let s=!1;for(const o of n.rooms[n.currentRoom].items){const i=Me[o.kind];if(!t.has(o.kind)||!i)continue;const a=ee.querySelector(`.item[data-id="${o.id}"] .inner`);!a||a.querySelector("img.artimg")||(a.innerHTML=mn(i,!0),s=!0)}s&&(Bt.forEach(o=>{delete o.dataset.held}),en(n),iu())}function fC(){return p(()=>Promise.resolve().then(()=>jc),void 0).then(e=>e.boot(location.search,Zu(C.get()))).then(e=>{dC(e.filter(t=>!!Me[t]))})}Kx();SM();AM(e=>e==="backyard"?Wx():null);M("scenery").addEventListener("click",e=>{const t=e.target.closest("[data-yard-go]");t&&_d(t.dataset.yardGo==="backyard"?"backyard":"living")});const pC=B9(M("skyMount"));window.__sky=pC;Qr=I2({layer:ee,stageWrap:M("stageWrap"),get:()=>C.get(),dispatch:e=>C.dispatch(e),clock:()=>b&&Ie!==J?b.now():Date.now(),canSend:()=>!b||Ie===J||!!b.speaksBaby,owner:()=>zg(),inHouse:()=>S==="house",play:()=>Re.isPlay(),editable:()=>Ot(),toRoom:Dt,box:e=>{const t=Me[e.kind];return t?{id:e.id,kind:e.kind,x:e.x,footY:Ys(t,e.y),flip:!!e.flip,scale:Ye(e),w:t.w,h:ft(t),z:e.z}:null},holderId:()=>b&&Ie!==J&&b.pid?b.pid:Te||C.get().characters[0]?.id||"c1",holderSpot:e=>{const t=C.get(),n=b&&Ie!==J&&b.pid?b.pid:Te||t.characters[0]?.id||"",s=e||n,o=(a,r,l,c,d,f)=>{const h=c?.pose==="sit"||c?.pose==="lie"?c.pose:null,g=h==="lie"?t.rooms[t.currentRoom]?.items.find(k=>k.id===c?.item):void 0,m=d&&/^#[0-9a-fA-F]{6}$/.test(d)?d:"#f1c27d";return{x:a.x,y:a.y,flip:r,scale:l>0?l:1,pose:h,lieFlip:!!(h==="lie"&&g?.flip),skin:m,chibi:!!f}},i=t.characters.find(a=>a.id===s&&a.room===t.currentRoom);if(i){const a=Lt(i);return o(xt(t.currentRoom,a,i),i.flip,Vs[i.size]??1,a,i.look2&&i.look2.skin||i.skin,!!i.look2)}if(b&&S==="house"){const a=s===b.pid?ke():b.presence.get(s);if(a&&a.where==="house"&&a.houseId===Pe&&a.room===t.currentRoom){const r=In(s,a),l=b.players.get(s)?.look,c=l?.size??"kid";return o(xt(t.currentRoom,r,a),a.flip,Vs[c]??1,r,l?.look2&&l.look2.skin||l?.skin||"#f1c27d",!!l?.look2)}}return null},holderHere:e=>{if(!e)return!1;if(C.get().characters.some(s=>s.id===e))return!0;if(!b||Ie===J)return!1;const n=e===b.pid?ke():b.presence.get(e);return!!(n&&n.where==="house"&&n.houseId===Pe)},occupied:()=>Ei(void 0,b?.pid,!0),locked:()=>Hn(null),seatAt:(e,t,n)=>xt(e,t,n)}).render;Bg=()=>Qr();Zs();Ht();hs();hC();hs();Xr();Qg();_a();Bo.matches?rs():hs();requestAnimationFrame(()=>{hs(),Xr(),yd()});function hC(){if(!pd)return;const e=Yl(),t=C.get().characters[0];if(!t)return;const n=e==="door";if(C.dispatch({type:"char/update",id:t.id,patch:{...sx(),flip:n?Jl.flip:Xl.flip}}),C.dispatch({type:"cat/set",cat:{name:"Clover",coat:3,room:n?"living":"backyard",x:n?Na:Xn.x}}),C.dispatch({type:"dog/set",dog:{name:"Sunny",breed:3,owner:t.id}}),!C.get().rooms.backyard.items.some(s=>s.kind==="yard-swing"))for(const s of ox)C.dispatch({type:"item/add",room:"backyard",item:{id:"yp-"+s.kind,kind:s.kind,x:s.x,y:s.y,flip:!1,z:1,scale:s.scale??1}});if(e!=="sheet"){const s=n?Jl:Xl;C.dispatch({type:"char/move",id:t.id,room:n?"living":"backyard",x:s.x,y:s.y}),C.dispatch({type:"room/switch",room:n?"living":"backyard"})}window.__pinCat=n?{x:Na}:{x:Xn.x,y:Xn.y},e==="play"?M("modePlay").click():(e==="decorate"||e==="door")&&M("modeDecorate").click(),e==="sheet"&&document.body.insertAdjacentHTML("beforeend",zx()),e==="compare"&&document.body.insertAdjacentHTML("beforeend",Zx()),document.body.dataset.yard="ready"}function gC(e){const t=C.get(),n=e==="backyard"?Xl:Jl;At=null;const s=t.characters.find(o=>o.id===Te&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(s&&(C.dispatch({type:"char/update",id:s.id,patch:{flip:n.flip}}),C.dispatch({type:"char/move",id:s.id,room:e,x:n.x,y:n.y})),pd&&t.cat&&(C.dispatch({type:"cat/move",room:e,x:e==="backyard"?Xn.x:Na}),window.__pinCat=e==="backyard"?{x:Xn.x,y:Xn.y}:{x:Na}),C.dispatch({type:"room/switch",room:e}),b&&Ie!==J){const o=ke();o&&o.where==="house"&&Ge({...o,room:e,x:n.x,y:n.y,flip:n.flip})}requestAnimationFrame(()=>Xr())}function Xr(){if(C.get().currentRoom==="backyard"){Fe(Kl),Gn();return}if(!pd||Yl()==="sheet"||Yl()==="compare")return;const e=C.get().characters.find(t=>t.room===C.get().currentRoom);e&&Fe(e.x-ce/2),Gn()}function Gn(){if(qs||j.getBoundingClientRect().width<20)return;const t=yt()||parseFloat(j.style.getPropertyValue("--yard-sc"))||1;j.style.setProperty("--yard-sc",String(t));const n=[...j.querySelectorAll(".yardDoor")];for(const m of n){m.style.minWidth="",m.style.transform="";const k=m.querySelector(".yardHintLabel");if(!k)continue;k.style.transform="",k.style.translate="";const $=k.querySelector("span");$&&($.style.transform="");const y=Math.max(13,16/t);k.style.fontSize=y+"px",k.style.lineHeight="1";const u=38/t;k.style.height=u+"px";const w=3/t,_=Math.max(0,(u-w*2-y)/2);k.style.padding=`${_.toFixed(2)}px ${(14/t).toFixed(2)}px`}const s=n[0];if(!s)return;const o=s.querySelector(".doorArt"),i=s.querySelector(".yardHintLabel"),a=6,r=()=>{const m=j.getBoundingClientRect(),k=s.getBoundingClientRect(),$=o?.getBoundingClientRect(),y=i?.getBoundingClientRect(),u=[k,$,y].filter(H=>!!H&&H.width>2&&H.height>2),w=Math.min(...u.map(H=>H.top)),_=Math.max(...u.map(H=>H.bottom));let T=m.left+a,A=m.right-a;for(const H of["nudgeL","nudgeR"]){const F=M(H);if(!F||F.classList.contains("off")||F.offsetParent===null)continue;const q=F.getBoundingClientRect();if(q.width<2||q.height<2)continue;const se=fe=>fe.top<q.bottom-1&&fe.bottom>q.top+1,K=[k,$].some(fe=>fe&&fe.width>2&&se(fe));!K&&(w>=q.bottom-1||_<=q.top+1)||(H==="nudgeL"&&K?T=Math.max(T,q.right+8):H==="nudgeR"&&K&&(A=Math.min(A,q.left-8)))}return{leftLimit:T,rightLimit:A,doorR:k,artR:$,hintR:y}};let l=0,c=0;for(;l++<4;){const{leftLimit:m,rightLimit:k,doorR:$,artR:y}=r();let u=0;const w=Math.min($.left,y&&y.width>2?y.left:$.left),_=Math.max($.right,y&&y.width>2?y.right:$.right);if(w<m&&(u+=m-w),_+u>k&&(u-=_+u-k),Math.abs(u)<.5)break;c+=u,s.style.transform=`translate(${(c/t).toFixed(1)}px, 0)`}if(!i){xp(s);return}const d=i.querySelector("span");if(d){const m=document.createRange();m.selectNodeContents(d);const k=m.getBoundingClientRect(),$=i.getBoundingClientRect(),y=($.top+$.bottom-(k.top+k.bottom))/2,u=d;k.height>2&&Math.abs(y)>=.1?u.style.transform=`translateY(${(y/t).toFixed(2)}px)`:u.style.transform=""}const f=i.getBoundingClientRect(),h=j.getBoundingClientRect();let g=0;if(C.get().currentRoom==="backyard"&&o){const m=o.getBoundingClientRect();m.width>2&&(g+=(m.left+m.right)/2-(f.left+f.right)/2)}f.left+g<h.left+a?g+=h.left+a-(f.left+g):f.right+g>h.right-a&&(g-=f.right+g-(h.right-a)),Math.abs(g)>.5?i.style.translate=`calc(-50% + ${(g/t).toFixed(1)}px) 0`:i.style.translate="",xp(s)}Nu(C.get().currentRoom);const Fu=()=>{const e=Dr().size,t=Za.length,n=M("secrets"),s=n.querySelector(".secCount");s&&(s.textContent=`${e}/${t}`),n.setAttribute("aria-label",`Surprises, ${e} of ${t}`),Hg()};function Jr(){return window.innerHeight>window.innerWidth+40}function ju(e,t){for(const K of e)K.style.transform="";if(!Jr()||!e.length)return;const n=t&&t.clientWidth>20?t.getBoundingClientRect():{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth};if(n.width<20)return;const s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,window.innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,window.innerHeight)-s,l=Math.max(40,i-o),c=Math.max(40,r-a),f=e.map(K=>K.getBoundingClientRect()).filter(K=>K.width>2&&K.height>2);if(!f.length)return;const h=Math.min(...f.map(K=>K.left)),g=Math.max(...f.map(K=>K.right)),m=Math.min(...f.map(K=>K.top)),k=Math.max(...f.map(K=>K.bottom)),$=Math.max(1,g-h),y=Math.max(1,k-m),u=Math.min(1,l/$,c/y);if(u>.995&&h>=o-1&&g<=i+1&&m>=a-1&&k<=r+1)return;const _=e[0].getScreenCTM(),T=_&&Math.hypot(_.a,_.b)||1,A=(h+g)/2,H=(m+k)/2,F=y*u,q=(o+i)/2,se=m>=a&&k<=r?H:Math.min(Math.max(H,a+F/2),r-F/2);for(const K of e){const fe=K.getBoundingClientRect(),an=(fe.left+fe.right)/2,Wt=(fe.top+fe.bottom)/2,Ze=q+(an-A)*u,B=se+(Wt-H)*u;K.style.transformBox="fill-box",K.style.transformOrigin="center",K.style.transform=`translate(${((Ze-an)/T).toFixed(2)}px, ${((B-Wt)/T).toFixed(2)}px) scale(${u.toFixed(3)})`}}function Gu(){if(S!=="gameroom")return;const e=document.getElementById("grScroll");ju([...document.querySelectorAll(".neonSignArt")],e)}function Pc(){S!=="ranch"||Oe||(document.querySelectorAll(".ranchSignArt").forEach(e=>{e.style.transform=""}),it(),Yu(),Zd())}function Zd(){if(S!=="ranch"||Oe)return;const e=document.getElementById("ranchScroll");if(!e)return;const t=e.getBoundingClientRect();document.querySelectorAll(".ranchSignArt").forEach(n=>{const s=n.getBoundingClientRect(),o=Math.min(t.right,innerWidth),i=Math.max(0,t.left-s.left)+Math.max(0,s.right-o);n.style.visibility=s.width>20&&i<8?"visible":"hidden"})}M("ranchScroll").addEventListener("scroll",()=>{S==="ranch"&&!Oe&&Zd()},{passive:!0});function Yu(){const e=document.querySelector(".doorHint"),t=document.getElementById("ranchScroll");if(!e||!t)return;e.style.transform="translateX(-50%)";const n=t.getBoundingClientRect(),s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,innerHeight)-s,l=e.getBoundingClientRect();let c=0;l.right>i&&(c-=l.right-i),l.left+c<o&&(c+=o-(l.left+c));let d=0;const f=t.querySelector(".savatar");if(f){const h=f.getBoundingClientRect(),m=f.querySelector(".nametag")?.getBoundingClientRect(),k=!!(m&&m.width>4&&m.height>4),$=k?Math.min(h.top,m.top):h.top,y=k?Math.min(h.left,m.left):h.left,u=k?Math.max(h.right,m.right):h.right,w=l.left+c;l.right+c>y-6&&w<u+6&&l.bottom+d>$-6&&l.top<h.top+h.height*.72&&(d+=$-48-(l.bottom+d))}if(l.top+d<a&&(d+=a-(l.top+d)),document.body.classList.contains("phone-portrait")){const h=document.querySelector(".ranchSign .ranchSignArt");if(h){const g=h.getBoundingClientRect(),m=l.left+c,k=l.right+c,$=l.top+d,y=l.bottom+d;if(g.width>20&&g.height>g.width*.7&&k>g.left+4&&m<g.right-4&&y>g.top+4&&$<g.bottom-4){let w=g.top-16-y;$+w<a&&(w+=a-($+w));const T=f?.querySelector(".nametag")?.getBoundingClientRect(),A=y+w;!(T&&T.width>4&&T.height>4&&A>T.top-12&&k>T.left-6&&m<T.right+6)&&A<=r&&(d+=w)}}}(c||d)&&(e.style.transform=`translate(calc(-50% + ${c.toFixed(1)}px), ${d.toFixed(1)}px)`)}const Ku=X2({world:hd,roomW:me,roomH:Qe,currentRoom:()=>C.get().currentRoom,sparkle:()=>P.sparkle(),tap:()=>P.click(),onFound:(e,t)=>{if(Fu(),t){const n=M("secrets");n.classList.remove("pulse"),n.offsetWidth,n.classList.add("pulse"),setTimeout(()=>N("🎁 A secret surprise appeared in your drawer!"),1400),Ht()}}});C.subscribe((e,t)=>{(t.type==="room/switch"||t.type==="game/reset")&&Ku.update()});Fu();window.__eggs=()=>({found:[...Dr()]});gE();
