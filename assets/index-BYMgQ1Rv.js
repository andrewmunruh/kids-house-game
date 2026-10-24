(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const f0="modulepreload",p0=function(e){return"/kids-house-game/"+e},Ed={},p=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(n.map(l=>{if(l=p0(l),l in Ed)return;Ed[l]=!0;const c=l.endsWith(".css"),f=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":f0,c||(d.as="script"),d.crossOrigin="",d.href=l,r&&d.setAttribute("nonce",r),document.head.appendChild(d),c)return new Promise((g,h)=>{d.addEventListener("load",g),d.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return o.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})},ci="#5a3d5c",Y=(e=4)=>`stroke="${ci}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,zr=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],Sn=1e3,Pn=700,Qr="M 30 660 C 150 640, 200 540, 330 545 S 540 650, 690 600 S 925 470, 850 375 S 640 330, 520 355 S 270 385, 250 285 S 330 145, 480 150 S 700 200, 790 150",On={x:115,y:170},ln={x:880,y:120},cn={x:600,y:480},Wn={x:400,y:260},pp=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${Y(3)}/><circle cx="0" cy="-10" r="20" fill="${s}" ${Y(3)}/><circle cx="-12" cy="-2" r="12" fill="${s}" ${Y(3)}/><circle cx="12" cy="-3" r="13" fill="${s}" ${Y(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`,ps=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})" fill="#fff"><ellipse cx="0" cy="10" rx="46" ry="22"/><ellipse cx="-36" cy="16" rx="28" ry="16"/><ellipse cx="38" cy="14" rx="30" ry="18"/><ellipse cx="10" cy="2" rx="24" ry="18"/></g>`,ei=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">${[0,72,144,216,288].map(o=>`<circle cx="${(Math.cos(o*Math.PI/180)*8).toFixed(1)}" cy="${(Math.sin(o*Math.PI/180)*8).toFixed(1)}" r="6.5" fill="${n}" ${Y(2)}/>`).join("")}<circle r="4.5" fill="#ffd43b" ${Y(2)}/></g>`,Un=(e,t,n)=>`<g transform="translate(${e} ${t})">${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*4}" cy="${Math.sin(s*Math.PI/180)*4}" r="3.6" fill="${n}"/>`).join("")}<circle r="2.6" fill="#ffd43b"/></g>`;function g0(){return`<svg class="mapBg" viewBox="0 0 ${Sn} ${Pn}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${Sn}" height="${Pn}" rx="34" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="160" cy="420" rx="150" ry="90"/><ellipse cx="760" cy="250" rx="170" ry="70"/><ellipse cx="480" cy="640" rx="140" ry="50"/><ellipse cx="930" cy="600" rx="90" ry="110"/></g>
  <g fill="#93d78e" opacity=".7"><ellipse cx="420" cy="260" rx="70" ry="30"/><ellipse cx="80" cy="560" rx="60" ry="26"/><ellipse cx="700" cy="420" rx="50" ry="22"/></g>
  <!-- pond -->
  <ellipse cx="120" cy="470" rx="72" ry="40" fill="#8ecae6" ${Y()}/><ellipse cx="108" cy="462" rx="42" ry="16" fill="#bde6f7"/><path d="M150 480 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <!-- side paths to the park and the ranch -->
  <path d="M250 285 Q190 250 150 215" fill="none" stroke="${ci}" stroke-width="30" stroke-linecap="round"/><path d="M250 285 Q190 250 150 215" fill="none" stroke="#f2dcb8" stroke-width="22" stroke-linecap="round"/>
  <!-- the street -->
  <path d="${Qr}" fill="none" stroke="${ci}" stroke-width="58" stroke-linecap="round"/>
  <path id="mapRoad" d="${Qr}" fill="none" stroke="#f2dcb8" stroke-width="48" stroke-linecap="round"/>
  <path d="${Qr}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 16" stroke-linecap="round" opacity=".9"/>
  <!-- town square -->
  <g transform="translate(${cn.x} ${cn.y})"><circle r="74" fill="#f7e6c8" ${Y()}/><circle r="74" fill="none" stroke="#e6cfa6" stroke-width="10" stroke-dasharray="10 12" transform="scale(.82)"/>
    <circle r="30" fill="#bde6f7" ${Y()}/><circle r="13" fill="#fff6e6" ${Y(3)}/><path d="M0 -13 Q-8 -32 -16 -20 M0 -13 Q8 -32 16 -20 M0 -13 V-34" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>
    ${Un(-52,-40,"#ff8fab")}${Un(54,-38,"#b197fc")}${Un(-56,40,"#ffd43b")}${Un(52,44,"#ff8fab")}</g>
  ${[[60,330,"#ff8fab"],[300,470,"#b197fc"],[430,560,"#ffd43b"],[760,520,"#ff8fab"],[950,260,"#b197fc"],[600,260,"#ffd43b"],[380,90,"#ff8fab"],[40,120,"#b197fc"],[960,420,"#ffd43b"],[840,640,"#b197fc"],[210,620,"#ff8fab"]].map(([e,t,n])=>Un(+e,+t,String(n))+Un(+e+14,+t+8,String(n))).join("")}
  </svg>`}function Cd(e,t,n=Sn,s=Pn){const o=[];let i=7;const a=()=>(i=(i*9301+49297)%233280)/233280;for(let r=0;r<260&&o.length<34;r++){const l=30+a()*(n-60),c=40+a()*(s-70);t(l,c)||e.some(f=>Math.hypot(f.x-l,f.y-c)<f.r)||(e.push({x:l,y:c,r:46}),o.push(pp(l,c,.75+a()*.45,["#5cc985","#4fbf7a","#78d39a"][r%3])))}return`<svg class="mapTrees" viewBox="0 0 ${n} ${s}" xmlns="http://www.w3.org/2000/svg">${o.join("")}</svg>`}function h0(e,t){const n=e/2,s=`M ${n} 36 C ${n-36} ${t*.28}, ${n+28} ${t*.48}, ${n-8} ${t*.68} S ${n+18} ${t*.86}, ${n} ${t-28}`;return`<svg class="mapBg" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="${t}" rx="28" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="${e*.22}" cy="${t*.22}" rx="90" ry="48"/><ellipse cx="${e*.78}" cy="${t*.42}" rx="80" ry="40"/><ellipse cx="${e*.3}" cy="${t*.72}" rx="100" ry="46"/></g>
  <ellipse cx="78" cy="${t*.58}" rx="46" ry="28" fill="#8ecae6" ${Y()}/><ellipse cx="70" cy="${t*.56}" rx="24" ry="10" fill="#bde6f7"/>
  <path d="${s}" fill="none" stroke="${ci}" stroke-width="44" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#f2dcb8" stroke-width="34" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round" opacity=".9"/>
  ${[[40,250,"#ff8fab"],[500,280,"#b197fc"],[70,520,"#ffd43b"],[490,640,"#ff8fab"],[50,860,"#74c0fc"],[500,980,"#ffd43b"]].map(([o,i,a])=>Un(+o,+i,String(a))+Un(+o+16,+i+10,String(a))).join("")}
  </svg>`}const u0=(e,t,n=1,s="#4fbf7a")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="10" rx="28" ry="8" fill="#000" opacity=".08"/><circle cx="-14" cy="-2" r="16" fill="${s}" ${Y(3)}/><circle cx="14" cy="0" r="18" fill="${s}" ${Y(3)}/><circle cx="0" cy="-12" r="14" fill="${s}" ${Y(3)}/><circle cx="-4" cy="-16" r="4" fill="#fff" opacity=".28"/></g>`,m0=(e,t,n="#ff8fab")=>`<g transform="translate(${e} ${t})"><ellipse cx="-7" cy="-2" rx="8" ry="5" fill="${n}" ${Y(2)} transform="rotate(-24)"/><ellipse cx="7" cy="-2" rx="8" ry="5" fill="${n}" ${Y(2)} transform="rotate(24)"/><ellipse cx="-6" cy="4" rx="6" ry="4" fill="#b197fc" ${Y(1.6)} transform="rotate(18)"/><ellipse cx="6" cy="4" rx="6" ry="4" fill="#b197fc" ${Y(1.6)} transform="rotate(-18)"/><path d="M0 -6 V8" ${Y(2)}/></g>`;function y0(e,t,n){const s=e/2,o=(d,g,h)=>g>t*.4&&g<t-28&&Math.abs(d-s)>52&&!n.some(m=>Math.hypot(m.x-d,m.y-g)<m.r+h),i=[.07,.15,.22,.78,.85,.93],a=[.46,.54,.62,.7,.78,.86,.93],r=["#ff8fab","#b197fc","#ffd43b","#74c0fc","#69db7c"],l=[];let c=0;a.forEach((d,g)=>{i.forEach((h,m)=>{const k=Math.round(e*h+((g+m)%2?8:-6)),_=Math.round(t*d);if((g+m)%3===0){if(!o(k,_,34))return;l.push(u0(k,_,.85+m%2*.15,["#4fbf7a","#5cc985","#3dae6a"][(g+m)%3]))}else{if(!o(k,_,18))return;const y=r[(g*2+m)%r.length];l.push(ei(k,_,y,.85)),(g+m)%2===0&&o(k+18,_+12,14)&&l.push(ei(k+18,_+12,r[(g+m+2)%r.length],.7))}c++})});const f=[[e*.2,t*.5],[e*.8,t*.66],[e*.18,t*.84]];for(const[d,g]of f)o(d,g,16)&&l.push(m0(Math.round(d),Math.round(g),c%2?"#ffd43b":"#ff8fab"));return`<svg class="mapMeadowFill" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">${l.join("")}</svg>`}const b0=`<svg class="mapSkyArt" viewBox="0 0 900 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
  ${ps(280,28,1.05)}${ps(430,8,.8)}${ps(560,36,.95)}
  ${ps(250,88,.75)}${ps(390,108,1.05)}${ps(540,96,.85)}${ps(640,78,.7)}
  <g fill="none" stroke-linecap="round">
    ${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M300 ${118+t*6} A70 48 0 0 1 430 ${112+t*6}" stroke="${e}" stroke-width="5"/>`).join("")}
  </g>
</svg>`,k0=`<svg class="mapMeadowArt" viewBox="0 0 900 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
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
  ${[[48,188,"#ff8fab",.85],[120,176,"#ffd43b",.7],[200,198,"#b197fc",.9],[280,172,"#ff8fab",.75],[360,204,"#74c0fc",.8],[450,178,"#ffd43b",.85],[530,200,"#ff8fab",.75],[620,174,"#b197fc",.8],[700,196,"#69db7c",.7],[790,180,"#ffd43b",.85]].map(([e,t,n,s])=>ei(+e,+t,String(n),+s)).join("")}
  ${[[80,248,"#ff8fab"],[160,268,"#b197fc"],[250,242,"#ffd43b"],[340,274,"#ff8fab"],[430,250,"#74c0fc"],[520,270,"#b197fc"],[610,246,"#ffd43b"],[700,272,"#ff8fab"],[790,252,"#69db7c"]].map(([e,t,n])=>ei(+e,+t,String(n),1.05)).join("")}
  ${[[110,304,"#ffd43b"],[230,292,"#ff8fab"],[360,308,"#b197fc"],[490,294,"#74c0fc"],[620,306,"#ff8fab"],[750,296,"#ffd43b"]].map(([e,t,n])=>ei(+e,+t,String(n),.9)).join("")}
</svg>`,Sd=`<svg viewBox="0 0 200 170"><ellipse class="parkLawn" cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${Y()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${Y(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${Y(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${Y(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${Y(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${Y(2.5)}/>
  ${pp(40,66,1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${Y(3)}/><path d="M178 88 V132" ${Y(4)}/>
</svg>`,Pd=`<svg viewBox="0 0 220 180"><ellipse class="ranchGrass" cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${Y()}/>
  ${zr.map((e,t)=>`<path d="M${20+t*7} 120 A${90-t*7} ${84-t*7} 0 0 1 ${200-t*7} 120" fill="none" stroke="${e}" stroke-width="7"/>`).join("")}
  <path d="M60 140 V82 L80 58 H140 L160 82 V140 Z" fill="#ef5b5b" ${Y(4)}/>
  <path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${ci}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  ${zr.map((e,t)=>`<path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${e}" stroke-width="1.3" transform="translate(0 ${-3+t*1.2})"/>`).join("")}
  <rect x="88" y="100" width="44" height="40" rx="3" fill="#d94848" ${Y(3)}/><path d="M88 100 L132 140 M132 100 L88 140" stroke="#fff6e6" stroke-width="3"/>
  <rect x="94" y="70" width="32" height="18" rx="4" fill="#fff6e6" ${Y(3)}/>
  <path d="M10 150 H52 M168 150 H212 M14 140 V158 M30 140 V158 M46 140 V158 M174 140 V158 M190 140 V158 M206 140 V158" stroke="#fff6e6" stroke-width="5" stroke-linecap="round"/><path d="M10 150 H52 M168 150 H212" ${Y(1.5)}/>
  <g transform="translate(178 122) scale(.42)"><ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" ${Y(5)}/><path d="M24 -8 L40 -34 L54 -26 L36 2 Z" fill="#fff" ${Y(5)}/>${zr.slice(0,4).map((e,t)=>`<path d="M38 ${-34+t*5} q-14 4 -20 14" fill="none" stroke="${e}" stroke-width="5" stroke-linecap="round"/>`).join("")}<path d="M-20 14 V34 M20 14 V34" ${Y(6)}/></g>
</svg>`,Td=`<svg viewBox="0 0 190 156">
  <ellipse cx="95" cy="118" rx="88" ry="32" fill="#ffd0e6" ${Y()}/>
  <path d="M28 108 V62 L95 28 L162 62 V108 Z" fill="#fff0f6" ${Y(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="#ff6b9a" ${Y(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="none" stroke="#ffd43b" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="78" y="78" width="34" height="30" rx="4" fill="#ff8ec8" ${Y(3)}/>
  <path d="M95 86 C90 80 82 82 86 90 C90 96 95 100 95 100 C95 100 100 96 104 90 C108 82 100 80 95 86 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  <rect x="42" y="74" width="22" height="16" rx="3" fill="#66d9e8" ${Y(2)}/><rect x="126" y="74" width="22" height="16" rx="3" fill="#d0bfff" ${Y(2)}/>
  ${[36,52,68,84,100,116,132,148].map((e,t)=>`<circle class="clubBulb" cx="${e}" cy="58" r="3.2" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" ${Y(1.4)}/>`).join("")}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`,pc=`<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${Y(3)}/><path d="M17 8 V35 M31 13 V40" ${Y(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${Y(2)}/></svg>`,gc=e=>e.indexOf("data-chibi")>=0?e.replace('viewBox="0 0 200 320"','viewBox="24 0 152 168"'):e.replace('viewBox="0 0 100 160"','viewBox="14 2 72 74"'),sr=e=>String(e||"").replace(/^pack:/,"").toLowerCase(),w0={"cute-speaker":"stereo","cc-record-player":"stereo","retro-radio":"stereo","music-box":"musicbox",tv:"tv",fireplace:"fire","brick-fireplace":"fire","wc-woodstove":"fire",woodstove:"fire","wc-stone-hearth":"fire","fire-pit":"fire"};function Cs(e){return w0[sr(e)]??null}function gp(e){return Cs(e)!==null}function v0(e){const t=sr(e);return t==="ball"||t==="beach-ball"||t==="balloon"?"bounce":t==="teddy"||/plush/.test(t)?"hug":null}const hp=e=>/(^|-)tub$/.test(sr(e)),up=e=>/fridge$/.test(sr(e)),_0={stereo:220,musicbox:160,tv:280,fire:230},$0=70,x0=130,M0=.4,L0=6,Bd=2e4,Yt=900,E0=["stereo","tv","fire","musicbox"];function C0(e,t){let n=2166136261;const s=e+"|"+t;for(let o=0;o<s.length;o++)n^=s.charCodeAt(o),n=Math.imul(n,16777619);return(n>>>0)%1e3/1e3}const Rd=(e,t)=>Math.hypot(e.x-t.x,(e.y-t.y)*1.5);function S0(e,t,n={}){const s=new Map,o=[...t].sort((r,l)=>r.id<l.id?-1:r.id>l.id?1:0),i=e.filter(r=>r.on&&Cs(r.kind)&&!(Cs(r.kind)==="musicbox"&&n.musicBoxDone?.has(r.id))),a=[];for(const r of o){if(r.lying)continue;let l=null;for(const c of E0){for(const f of i){if(Cs(f.kind)!==c)continue;const d=Rd(r,f);if(d>_0[c]||r.seated&&c!=="tv"&&c!=="musicbox")continue;const g=c==="stereo"?"dance":c==="tv"?"watch":c==="fire"?"warm":"sway";(!l||d<l.d||d===l.d&&f.id<l.it.id)&&(l={c:r,it:f,d,kind:g})}if(l)break}if(!l&&!r.seated)for(const c of e){const f=v0(c.kind);let d=null,g=Rd(r,c);f&&g<=$0?d=f:up(c.kind)&&n.fridgesOpen?.has(c.id)&&g<=x0?d="nibble":hp(c.kind)&&Math.abs(r.x-c.x)<=(c.w??240)*M0&&Math.abs(r.y-c.y)<=40&&(d="bathe"),d&&(!l||g<l.d||g===l.d&&c.id<l.it.id)&&(l={c:r,it:c,d:g,kind:d})}l&&a.push(l)}a.sort((r,l)=>r.d-l.d||(r.c.id<l.c.id?-1:1));for(const r of a.slice(0,L0))s.set(r.c.id,{kind:r.kind,item:r.it.id,phase:C0(r.it.id,r.c.id),face:r.it.x<r.c.x?-1:1});return s}function mp(e,t,n){return-((n+e*t)%t)}const P0={},Nt=e=>(P0?.VITE_STORE_PREFIX??"")+e,T0=400,or=["#ffe0c4","#f6d2b5","#f1c27d","#e0ac69","#c9956c","#c68642","#a86b3c","#8d5524","#5c3a1e","#3d2914"],ir=["#2b1d16","#5b3a29","#a0522d","#f4d58d","#ff8fab","#8ecae6","#b388d6","#ff9f43","#1d1416","#c8602a","#7a4b32","#f7f1e8"],hc=["#5a321c","#3f9b52","#3d7ec4","#c48a3a","#7b4fb8"],Pt=["#ff7aa8","#ffd166","#5aa9e6","#80ed99","#c9a0dc","#ff9f68","#ffffff","#5a3d5c","#ff8f7a","#7ec8c3","#f7f3ee","#f4a3c8","#6b8e4e","#e8d5b5","#ef6b6b","#3d4a6b"],ar=["short","bob","buns","topbun","pixie","long","wavy","puffs","afro","curlybob","coily","boxbraids","braids","sidebraid","crown","pony","sidepony","pigtails","lowbun","locs","halfup","bangs","sidebangs","wavybob"],rr=["classic","stripes","hoodie","sweater","tank","puff","ruffle","button","jersey","cardigan","bib","raincoat"],lr=["pants","jeans","shorts","skirt","tutu","leggings","overalls","joggers"],cr=["","twirl","sundress","party","pinafore","jumper","ballet","nightgown","raindress"],dr=["classic","sneakers","lightup","boots","rainboots","sandals","maryjanes","slippers"],fr=["round","big","sleepy","sparkle","soft","bright"],co=["glasses","square","sunnies","bow","bigbow","headband","flower","cap","beanie","sunhat","catears","earmuffs"],B0=new Set(ar),R0=new Set(rr),A0=new Set(lr),D0=new Set(cr),I0=new Set(dr),H0=new Set(fr),O0=new Set(co),W0=new Set(["short","pixie","coily","afro","bangs"]),U0=new Set(["buns","puffs"]),V0=new Set(["topbun","lowbun"]),z0={hair:"buns",hairC:"#5b3a29",skin:"#f1c27d",eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"pants",bottomC:"#5aa9e6",dress:"",dressC:"#ff7aa8",shoes:"classic",shoesC:"#5a3d5c",accC:"#ffd166"};function Q0(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Xs(e,t){return typeof e=="string"&&t.has(e)}function vn(e,t){if(typeof e!="string")return null;const n=e.trim().toLowerCase();for(let s=0;s<t.length;s++)if(t[s]===n)return t[s];return null}function xi(e){if(!Q0(e))return null;let t=0;try{t=JSON.stringify(e).length}catch{return null}if(t>T0)return null;const n={v:1};Xs(e.hair,B0)&&(n.hair=e.hair);const s=vn(e.hairC,ir);s&&(n.hairC=s);const o=vn(e.skin,or);o&&(n.skin=o),Xs(e.eyes,H0)&&(n.eyes=e.eyes);const i=vn(e.eyeC,hc);i&&(n.eyeC=i),(e.freckles===!0||e.freckles===!1)&&(n.freckles=e.freckles),(e.blush===!0||e.blush===!1)&&(n.blush=e.blush),Xs(e.top,R0)&&(n.top=e.top);const a=vn(e.topC,Pt);a&&(n.topC=a),Xs(e.bottom,A0)&&(n.bottom=e.bottom);const r=vn(e.bottomC,Pt);r&&(n.bottomC=r),Xs(e.dress,D0)&&(n.dress=e.dress);const l=vn(e.dressC,Pt);l&&(n.dressC=l),Xs(e.shoes,I0)&&(n.shoes=e.shoes);const c=vn(e.shoesC,Pt);if(c&&(n.shoesC=c),Array.isArray(e.acc)){const d=[];for(let g=0;g<e.acc.length&&d.length<2;g++){const h=e.acc[g];typeof h=="string"&&O0.has(h)&&d.indexOf(h)<0&&d.push(h)}n.acc=d}const f=vn(e.accC,Pt);return f&&(n.accC=f),n}function Ns(e){const t=z0,n=e??{};return{v:1,hair:n.hair??t.hair,hairC:n.hairC??t.hairC,skin:n.skin??t.skin,eyes:n.eyes??t.eyes,eyeC:n.eyeC??t.eyeC,freckles:n.freckles??t.freckles,blush:n.blush??t.blush,top:n.top??t.top,topC:n.topC??t.topC,bottom:n.bottom??t.bottom,bottomC:n.bottomC??t.bottomC,dress:n.dress??t.dress,dressC:n.dressC??t.dressC,shoes:n.shoes??t.shoes,shoesC:n.shoesC??t.shoesC,acc:n.acc?n.acc.slice():[],accC:n.accC??t.accC}}function Ad(e){const t=/^#([0-9a-f]{6})$/i.exec(e.trim());if(!t){const s=/^#([0-9a-f]{3})$/i.exec(e.trim());return s?[parseInt(s[1][0]+s[1][0],16),parseInt(s[1][1]+s[1][1],16),parseInt(s[1][2]+s[1][2],16)]:null}const n=parseInt(t[1],16);return[n>>16&255,n>>8&255,n&255]}function Hi(e,t){const n=vn(e,t);if(n)return n;const s=Ad(e);if(!s)return t[0];let o=t[0],i=1e12;for(let a=0;a<t.length;a++){const r=Ad(t[a]);if(!r)continue;const l=(s[0]-r[0])*(s[0]-r[0])+(s[1]-r[1])*(s[1]-r[1])+(s[2]-r[2])*(s[2]-r[2]);l<i&&(i=l,o=t[a])}return o}function q0(e){return W0.has(e)?0:U0.has(e)?2:V0.has(e)?3:1}function Z0(e){for(let t=0;t<e.length;t++){const n=e[t];if(n==="glasses"||n==="square"||n==="sunnies")return 2}for(let t=0;t<e.length;t++){const n=e[t];if(n==="cap"||n==="beanie"||n==="sunhat")return 3}for(let t=0;t<e.length;t++){const n=e[t];if(n==="bow"||n==="bigbow")return 1}return 0}function pr(e){const t=Ns(e),n=t.dress!=="";return{skin:t.skin,hair:t.hairC,hairStyle:q0(t.hair),shirt:n?t.dressC:t.topC,pants:n?t.dressC:t.bottomC,acc:Z0(t.acc)}}const N0=["short","bob","buns","topbun"];function xa(e){const t=typeof e.hairStyle=="number"&&e.hairStyle>=0&&e.hairStyle<=3?Math.round(e.hairStyle):0,n=e.acc===1?["bow"]:e.acc===2?["glasses"]:e.acc===3?["cap"]:[],s=Hi(String(e.shirt??""),Pt);return{v:1,hair:N0[t],hairC:Hi(String(e.hair??""),ir),skin:Hi(String(e.skin??""),or),eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:s,bottom:"pants",bottomC:Hi(String(e.pants??""),Pt),dress:"",dressC:s,shoes:"classic",shoesC:"#5a3d5c",acc:n,accC:"#ffd166"}}function di(e){const t=xi(e)??{},n=Ns(t);return{...pr(n),look2:n}}const F0=new Set(["glasses","square","sunnies"]),j0=new Set(["bow","bigbow","flower","headband"]),G0=new Set(["cap","beanie","sunhat","catears","earmuffs"]);function Ma(e){return F0.has(e)?"face":j0.has(e)?"bow":G0.has(e)?"hat":"other"}function Ke(e,t){return t[Math.floor(e()*t.length)]}function gr(e=Math.random){const t=e()<.38,n=e();let s=[];if(n<.22)s=[];else if(n<.68)s=[Ke(e,co)];else{const o=Ke(e,co),i=co.filter(a=>Ma(a)!==Ma(o));s=[o,Ke(e,i)]}return{v:1,hair:Ke(e,ar),hairC:Ke(e,ir),skin:Ke(e,or),eyes:Ke(e,fr),eyeC:Ke(e,hc),freckles:e()<.4,blush:e()<.85,top:Ke(e,rr),topC:Ke(e,Pt),bottom:Ke(e,lr),bottomC:Ke(e,Pt),dress:t?Ke(e,cr.filter(o=>o!=="")):"",dressC:Ke(e,Pt),shoes:Ke(e,dr),shoesC:Ke(e,Pt),acc:s,accC:Ke(e,Pt)}}function Y0(e,t=Math.random){const n=e.characters[0];if(!n)return e;const s=gr(t),o=pr(s),i=e.characters.slice();return i[0]={...n,...o,look2:s},{...e,characters:i}}function K0(e){return[e.skin,e.hair,e.hairStyle,e.shirt,e.pants,e.acc,e.look2?JSON.stringify(e.look2):""].join("|")}const Mi=3600,Ps=470,Tn=590,vs=["goat","sheep","piglet","chicks","bunny","cow"],X0=[1085,1215,1345,1470,1600,1735],J0=520,uc=1900,mc=[600,800,1e3,1200,1400,1600],yl=435,eu=["Chestnut","Snowy","Midnight","Sunny","Rainbow"],yp=[2470,2600,2730,2860,2990],Ts=540,tu=["pet","carrot","apple","hay"],bl=6,nu=e=>3175+e*68,su=8e4,kl=20,ou=1500,bp=["egg","carrot","flower"],iu={egg:"ranch-egg",carrot:"ranch-carrot",flower:"ranch-bouquet"},au=()=>({egg:0,carrot:0,flower:0}),ru=(e,t,n)=>Number.isInteger(e)&&e>=t&&e<=n?e:null;function yc(e){const t=au();if(!e||typeof e!="object")return t;for(const n of bp)t[n]=ru(e[n],0,kl)??0;return t}function bc(e){const t=Array(bl).fill(null);if(Array.isArray(e))for(let n=0;n<bl;n++){const s=e[n];if(!s||s.seed!=="carrot"&&s.seed!=="flower")continue;const o=Number(s.at),i=Number(s.wet);Number.isFinite(o)&&Number.isFinite(i)&&(t[n]={seed:s.seed,at:o,wet:i})}return t}function hr(e,t){if(!e||!e.wet)return 0;const n=(t-e.wet)/su;return n>=1?3:n>=.4?2:1}function wl(e,t,n,s,o=0){const i=e.slice(),a={...t};switch(n.op){case"plant":return i[n.i]?"taken":(i[n.i]={seed:n.seed,at:s,wet:0},{plots:i,basket:a,garden:!0});case"water":{const r=i[n.i];return r?r.wet?"wet":(i[n.i]={...r,wet:s},{plots:i,basket:a,garden:!0}):"empty"}case"pick":{const r=i[n.i];return r?hr(r,s)<3?"notReady":a[r.seed]>=kl?"full":(a[r.seed]++,i[n.i]=null,{plots:i,basket:a,garden:!0,got:r.seed}):"empty"}case"egg":return s-o<ou?"slow":a.egg>=kl?"full":(a.egg++,{plots:i,basket:a,garden:!1,got:"egg"});case"use":return a.carrot<=0?"none":(a.carrot--,{plots:i,basket:a,garden:!1});case"take":return a[n.kind]<=0?"none":(a[n.kind]--,{plots:i,basket:a,garden:!1})}}const zn=80,lu=30*24*60*60*1e3,cu=5,kp=6,An=["#ffd6e8","#fff3b0","#d8f5e8","#e6d6ff","#d6efff"],du=/^m[A-Za-z0-9]{4,40}$/,fu=/^[A-Za-z0-9:_\/.-]{1,80}$/;function qr(e,t=Date.now()){const n=Math.floor((t-e)/864e5);return n<=0?"today":n===1?"yesterday":n<7?"a few days ago":"a while ago"}function pu(e,t=Date.now()){const n=e?.letters;if(!Array.isArray(n))return null;const s=[];for(const i of n.slice(-30*2)){if(!i||typeof i!="object")continue;const a=i;if(typeof a.id!="string"||!du.test(a.id)||typeof a.from!="string")continue;const r=a.from.normalize("NFC").replace(/\s+/g," ").trim();if(!r||r.length>24||typeof a.fromPid!="string"||!fu.test(a.fromPid)||typeof a.text!="string"||a.text.length>zn||typeof a.at!="number"||!Number.isFinite(a.at)||t-a.at>lu||a.at>t+864e5||!Number.isInteger(a.color)||a.color<0||a.color>=cu||!Number.isInteger(a.sticker)||a.sticker<0||a.sticker>=kp)continue;const l=a.text.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(l.length>zn)continue;const c={id:a.id,from:r,fromPid:a.fromPid,text:l,color:a.color,sticker:a.sticker,at:a.at};a.read===!0&&(c.read=!0),s.push(c)}const o=s.slice(-30);return o.length?{letters:o}:null}function kc(e){return e?.letters.filter(t=>!t.read&&t.text).length??0}const gu=/^[A-Za-z0-9:_\/.-]{1,80}$/,wp=/crib|bassinet|high-?chair|cat-bed|pet-bed|dog-bed|kennel|tulip|flower|toadstool|mobile/,Zr={bed:{head:{x:.24,y:.42},pillow:{x:.1,y:.27,w:.22,h:.18},mattress:{x:.36,y:.34,w:.36,h:.16},clip:"starter"},"wooden-bed":{head:{x:.22,y:.53},pillow:{x:.12,y:.36,w:.24,h:.18},mattress:{x:.38,y:.46,w:.32,h:.16},clip:"wooden"},"checker-bed":{head:{x:.16,y:.45},pillow:{x:.08,y:.26,w:.22,h:.22},mattress:{x:.38,y:.4,w:.32,h:.16},clip:"checker"},"bunk-bed":{head:{x:.11,y:.62},pillow:{x:.05,y:.52,w:.18,h:.14},mattress:{x:.22,y:.56,w:.36,h:.14},clip:"bunk"},"canopy-bed":{head:{x:.38,y:.52},pillow:{x:.28,y:.46,w:.24,h:.14},mattress:{x:.48,y:.48,w:.28,h:.16},clip:"canopy"},"cc-heart-bed":{head:{x:.22,y:.67},pillow:{x:.12,y:.58,w:.26,h:.16},mattress:{x:.36,y:.64,w:.36,h:.16},clip:"heart"},"cc-canopy-daybed":{head:{x:.37,y:.58},pillow:{x:.26,y:.5,w:.26,h:.16},mattress:{x:.48,y:.54,w:.3,h:.16},clip:"daybed"},"wc-plaid-bed":{head:{x:.24,y:.26},pillow:{x:.08,y:.14,w:.3,h:.2},mattress:{x:.36,y:.18,w:.3,h:.18},clip:"wooden"}},hu=["bed","pack:wooden-bed","pack:checker-bed","pack:bunk-bed","pack:canopy-bed","pack:cc-heart-bed","pack:cc-canopy-daybed","pack:wc-plaid-bed"];function vp(e){return e==="bed"||/bunk/.test(e)||/daybed/.test(e)?!0:/(^|[-_:])bed$/.test(e)}function uu(){return hu.slice()}function ur(e){const t=String(e||"").toLowerCase();if(!t||wp.test(t)||!vp(t))return null;const n=t.replace(/^pack:/,"");return Zr[n]||Zr[t]||Zr.bed}const mu={head:{x:55.0733,y:59.7445},chest:{x:60,y:114},hip:{x:60,y:138},classic:{x:60,y:52.8}},Dd=48,Id=138.24;function _p(e,t){const n=-90*Math.PI/180,s=Math.cos(n),o=Math.sin(n),i=e-Dd,a=t-Id,r=Dd+s*i-o*a,l=Id+o*i+s*a;return{x:r-60,y:l-192}}function La(e,t){const n=mu[e],s=_p(n.x,n.y);return{x:t?-s.x:s.x,y:s.y}}const Hd=120,Nr=192,yu=.26;function bu(e,t,n,s,o=1){const i=o>0?o:1;if(n==="lie"&&s){const r=-t*i+210.24,l=-e*i+186.24;return{x:-Hd*i/2+r,y:-Nr*i+l}}if(n==="lie"){const r=_p(e,t);return{x:r.x*i,y:r.y*i}}const a=n==="sit"?yu*Nr*i:0;return{x:(e-Hd/2)*i,y:(t-Nr)*i+a}}function ku(e,t,n,s,o){const i=ur(e);if(!i||t<1||n<1)return null;const a=La("head",!1),r=(i.head.x-.5)*t-a.x,l=(i.head.y-1)*n-a.y,c=La(s,o);return{x:.5+((o?-r:r)+c.x)/t,y:1+(l+c.y)/n}}function Fs(e){const t=String(e||"").toLowerCase();return!t||wp.test(t)?null:vp(t)?{pose:"lie",spots:[{dx:0,dy:0}]}:/sofa|couch|loveseat/.test(t)?{pose:"sit",spots:[{dx:-.18,dy:-.33},{dx:.18,dy:-.33}]}:/armchair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/bench|window-seat/.test(t)?{pose:"sit",spots:[{dx:-.22,dy:-.3},{dx:.22,dy:-.3}]}:/ottoman/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/stool|rocker/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.38}]}:/chair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.48}]}:null}function $p(e){const t=Fs(e.kind);if(!t)return[];const n=e.scale||1,s=t.pose==="lie"?ur(e.kind):null;if(s){const o=e.w*n,i=e.h*n,a=La("head",!1),r=(s.head.x-.5)*o-a.x,l=(s.head.y-1)*i-a.y;return[{x:e.x+(e.flip?-r:r),y:e.footY+l,pose:"lie",n:0}]}return t.spots.map((o,i)=>{const a=o.dx*e.w*n,r=o.dy*e.h*n,l=i===1?1:0;return{x:e.x+(e.flip?-a:a),y:e.footY+r,pose:t.pose,n:l}})}function fi(e){const t=(r,l)=>({x:r,y:l,seat:null,toast:null,moved:!0});if(e.mode!=="play")return t(e.releaseX,e.releaseY);const n=e.piece;if(!n)return e.via==="drag"?t(e.releaseX,e.releaseY):{x:e.releaseX,y:e.releaseY,seat:null,toast:null,moved:!1};if(e.via==="tap"&&e.alreadyOn===n.id)return t(n.x,n.footY);const s=new Set(e.occupied.filter(r=>r.item===n.id).map(r=>r.n)),o=$p(n).filter(r=>!s.has(r.n));if(!o.length)return e.via==="tap"?{x:e.releaseX,y:e.releaseY,seat:null,toast:"Someone is already there!",moved:!1}:t(e.releaseX,e.releaseY);let i=o[0],a=1/0;for(const r of o){const l=(r.x-e.releaseX)**2+(r.y-e.releaseY)**2;l<a&&(i=r,a=l)}return{x:i.x,y:i.y,seat:{item:n.id,pose:i.pose,n:i.n},toast:null,moved:!0}}const wu={sofa:260,armchair:150,bed:300,chair:100,stool:90,rocker:190,"yard-bench":140,"bar-stool":52.8,"bunk-bed":294,"canopy-bed":294,"cc-bubble-chair":142,"cc-canopy-daybed":276,"cc-dryer-chair":164,"cc-heart-bed":236,"cc-mani-chair":188,"cc-mushroom-stool":112,"cc-scallop-loveseat":248,"checker-bed":196,"cloud-sofa":212,"comfy-armchair":161.7,"cream-sofa":234.6,"egg-chair":126,"fancy-sofa":234.6,"gaming-chair":101.4,"lattice-bench":147,"puffy-stool":46.9,"rocking-chair":137.2,"salon-chair":111.8,"swivel-stool":46.2,"waiting-bench":166.6,"wash-chair":186.2,"wood-armchair":127.4,"wood-stool":46.2,"wooden-bed":235.2};function Ea(e){const t=String(e||"").toLowerCase().replace(/^pack:/,"");return wu[t]??320}const Li=540;function wc(e,t,n,s=2400){const o=Math.max(0,t)/2+70,i=40;let a=n<e-8?-1:1,r=e+a*o;return(r<i||r>s-i)&&(a=-a,r=e+a*o),r<i&&(r=i),r>s-i&&(r=s-i),{x:r,y:Li}}function vc(e){if(!e||typeof e!="object")return null;const t=e;return typeof t.item!="string"||!gu.test(t.item)||t.pose!=="sit"&&t.pose!=="lie"||t.n!==0&&t.n!==1?null:{item:t.item,pose:t.pose,n:t.n}}function vl(e,t){if(!e)return null;const n=vc(e);return!n||!t?.some(s=>s&&s.id===n.item)?null:n}const _l=45e3,vu=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],Od=/^[A-Za-z0-9:_\/.-]{1,80}$/,_u=/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u,Wd=["feed","burp","change","rock"];function Bs(e){const t=String(e||"").toLowerCase();return!t||/mobile/.test(t)?null:/bassinet/.test(t)?"bassinet":t==="crib"||/(^|[-_:])crib$/.test(t)?"crib":null}function $u(e){return e===2?"Cozy":"Happy"}function xu(e){return e+1}function Mu(e){return vu.indexOf(e)>=0}function Lu(e){const t=typeof e=="number"&&Number.isFinite(e)?Math.round(e):2;return t<=2?2:t>=4?4:3}function xp(e){if(!e||typeof e!="object")return;const t=e,n={};let s=!1;for(let o=0;o<Wd.length;o++){const i=Wd[o],a=t[i];typeof a=="number"&&Number.isFinite(a)&&(n[i]=a,s=!0)}return s?n:void 0}function nn(e){const t={name:e.name,mood:e.mood,spot:e.spot,x:e.x,y:e.y,room:e.room,since:e.since};(e.spot==="crib"||e.spot==="bassinet")&&e.bed&&(t.bed=e.bed),e.spot==="mat"&&e.seat&&(t.seat=e.seat),e.spot==="arms"&&e.holder&&(t.holder=e.holder);const n=xp(e.at);return n&&(t.at=n),t}function _c(e,t){return JSON.stringify(e)===JSON.stringify(t)}function Eu(e,t){if(!e||typeof e!="object")return null;const n=e,s=String(n.name??"").normalize("NFC").replace(/\s+/g," ").trim();if(!_u.test(s)||(s.match(/\d/g)||[]).length>2)return null;let o=n.spot==="crib"||n.spot==="bassinet"||n.spot==="arms"||n.spot==="mat"?n.spot:"mat";const i=Mu(n.room)?n.room:"nursery",a=typeof n.x=="number"&&Number.isFinite(n.x)?Math.max(0,Math.min(2400,n.x)):700,r=typeof n.y=="number"&&Number.isFinite(n.y)?Math.max(0,Math.min(600,n.y)):540,l=typeof n.since=="number"&&Number.isFinite(n.since)?n.since:0,c=Lu(n.mood);let f=typeof n.bed=="string"&&Od.test(n.bed)?n.bed:void 0,d=vc(n.seat)??void 0,g=typeof n.holder=="string"&&Od.test(n.holder)?n.holder:void 0;if(t){const h=t[i]?.items??[];if(o==="crib"||o==="bassinet"){let m=!1;for(let k=0;k<h.length;k++){const _=h[k];_&&_.id===f&&Bs(String(_.kind||""))===o&&(m=!0)}m||(o="mat",f=void 0)}if(d){let m=!1;for(let k=0;k<h.length;k++)h[k]&&h[k].id===d.item&&(m=!0);m||(d=void 0)}}return o!=="crib"&&o!=="bassinet"&&(f=void 0),o!=="mat"&&(d=void 0),o!=="arms"&&(g=void 0),o==="arms"&&!g&&(o="mat"),nn({name:s,mood:c,spot:o,bed:f,seat:d,holder:g,x:a,y:r,room:i,at:xp(n.at),since:l})}function Cu(e,t){const n=e.nursery?.items??[];for(let s=0;s<n.length;s++){const o=n[s];if(!o||!o.id||Bs(String(o.kind||""))!=="crib")continue;const i=typeof o.x=="number"&&Number.isFinite(o.x)?o.x:1170,a=typeof o.y=="number"&&Number.isFinite(o.y)?o.y:480;return nn({name:"Bean",mood:2,spot:"crib",bed:o.id,x:i,y:a,room:"nursery",since:t})}return nn({name:"Bean",mood:2,spot:"mat",x:700,y:540,room:"nursery",since:t})}function Su(e,t,n){const s=Math.min(4,e.mood+1);return nn({...e,mood:s,at:{...e.at||{},[t]:n},since:n})}function Pu(e,t){if(!e.since){const i=nn({...e,since:t});return _c(i,e)?null:i}if(e.mood<=2)return null;const n=Math.floor((t-e.since)/_l);if(n<1)return null;const s=Math.min(n,e.mood-2),o=e.mood-s;return nn({...e,mood:o,since:e.since+s*_l})}function $l(e,t,n,s,o){const i=nn(t?{...e,spot:"arms",holder:t,room:n,x:s,y:o,bed:void 0,seat:void 0}:{...e,spot:"mat",room:n,x:s,y:o,bed:void 0,seat:void 0,holder:void 0});return _c(i,e)?e:i}function Tu(e,t,n,s){let o=t.spot==="crib"||t.spot==="bassinet"?t.spot:"mat",i,a;if(o==="crib"||o==="bassinet"){let l=!1;for(let c=0;c<n.length;c++){const f=n[c];f&&f.id===t.bed&&Bs(f.kind)===o&&(l=!0)}l&&t.bed?i=t.bed:o="mat"}if(o==="mat"&&t.seat){let l=null;for(let d=0;d<n.length;d++)n[d]&&n[d].id===t.seat.item&&(l=n[d]);const c=l?Fs(l.kind):null;let f=!1;for(let d=0;d<s.length;d++)s[d].item===t.seat.item&&s[d].n===t.seat.n&&(f=!0);l&&c&&c.pose===t.seat.pose&&!f&&(a=t.seat)}const r=nn({...e,spot:o,room:t.room,x:t.x,y:t.y,bed:i,seat:a,holder:void 0});return _c(r,e)?e:r}function Bu(e,t,n,s){const o=e.spot==="mat"&&e.seat?.item===t,i=!!n&&(e.spot==="crib"||e.spot==="bassinet")&&e.bed===t;return!o&&!i?e:nn({...e,spot:"mat",x:s?s.x:e.x,y:s?s.y:Li,bed:void 0,seat:void 0,holder:void 0})}function Mp(e,t){const n=t.scale||1,s=t.w*n,o=t.h*n,i=Bs(e);let a=i==="bassinet"?0:-.02*s;const r=i==="bassinet"?-.52*o:-.46*o;return t.flip&&(a=-a),{x:t.x+a,y:t.footY+r}}function Ru(e){const t=(o,i)=>({x:o,y:i,spot:"mat",bed:null,seat:null});if(e.mode!=="play"||!e.piece)return t(e.releaseX,e.releaseY);const n=Bs(e.piece.kind);if(n){const o=Mp(e.piece.kind,e.piece);return{x:o.x,y:o.y,spot:n,bed:e.piece.id,seat:null}}const s=fi({mode:"play",via:"drag",releaseX:e.releaseX,releaseY:e.releaseY,piece:e.piece,occupied:e.occupied});return s.seat?{x:s.x,y:s.y,spot:"mat",bed:null,seat:s.seat}:t(e.releaseX,e.releaseY)}function Au(e,t=2400){const s=t-40>40?t-40:40;let o=e;return o>=40||(o=40),o>s&&(o=s),{x:o,y:Li}}function Du(e,t){return!e||e.spot!=="mat"||!e.seat||e.room!==t?null:{item:e.seat.item,n:e.seat.n}}const pi=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],Lp=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],Tt=2400,En=600,Ep=1e3,Mo=(Tt-Ep)/2,Ss=[.75,.875,1,1.25,1.5];function Rs(e){if(typeof e!="number"||!Number.isFinite(e))return 1;let t=1,n=1/0;for(const s of Ss){const o=Math.abs(e-s);o<n&&(n=o,t=s)}return t}function Ge(e){return(e?.scale||1)*Rs(e?.size)}function Cp(e,t){const n=Rs(t);if(n===1){if(e.size==null)return e;const{size:s,...o}=e;return o}return e.size===n?e:{...e,size:n}}const Lo=8,Iu=/^[A-Za-z0-9:_\/.-]{1,80}$/;function $c(e){const t=e?.dogKennel;if(!t||typeof t!="object"||typeof t.item!="string"||!Iu.test(t.item))return null;const n=e.rooms;if(!n)return null;for(const s of Object.values(n))if(s?.items?.some(o=>o&&o.id===t.item&&o.kind==="kennel"))return{item:t.item};return null}function Hu(e,t){return $c({dogKennel:{item:t},rooms:e.rooms})!==null}const q=(e,t,n,s,o=1)=>({id:e+"-"+s,kind:e,x:t+Mo,y:n,flip:!1,z:s,scale:o});function Fn(){return{version:3,houseId:"local",currentRoom:"living",rooms:{living:{wallpaper:"#ffd6e0",floor:"#e8b98a",pattern:1,items:[q("sofa",470,470,1),q("lamp",230,470,2),q("plant",760,480,3),q("rug",480,530,0),q("picture",470,200,4),q("cat",600,520,5),q("window",-350,230,6),q("armchair",-300,480,7),q("bookshelf",1250,470,8),q("tree",1500,480,9),q("clock",1100,170,10)]},bedroom:{wallpaper:"#d9ccff",floor:"#f2d0a4",pattern:2,items:[q("bed",450,480,1),q("window",750,230,2),q("teddy",330,500,3),q("stars",300,180,4),q("tub",1350,480,5),q("lamp",-250,470,6),q("flowers",-150,500,7)]},salon:{wallpaper:"#ffe0f0",floor:"#f6d6ff",pattern:2,items:[q("rug",470,540,0),q("mirror",470,150,1),q("vanity",470,480,2),q("perfume",400,345,3),q("polish",450,345,4),q("hairdryer",560,340,5),q("stool",470,545,6),q("lamp",200,470,7),q("flowers",780,480,8),q("picture",780,200,9),q("chair",-250,490,10),q("mirror",-250,170,11),q("plant",1300,480,12)]},kitchen:{wallpaper:"#cdf3dc",floor:"#ffe7a8",pattern:3,items:[q("fridge",200,470,1),q("table",520,500,2),q("cake",520,395,3),q("stove",800,470,4),q("chair",380,500,5),q("chair",660,500,6),q("juice",470,395,7),q("plant",-300,480,8),q("fish",1300,480,9)]},nursery:{wallpaper:"#d6f3ff",floor:"#f3ddc4",pattern:1,items:[q("cloud-rug",480,545,0),q("crib",470,480,1),q("crib-mobile",470,155,2),q("rocker",780,490,3)]},bathroom:{wallpaper:"#d4f4fb",floor:"#f7e7d4",pattern:3,items:[q("bath-mat",180,560,0),q("shower-curtain",-40,520,1),q("soaking-tub",160,500,2),q("rubber-ducky",300,545,3),q("bath-toilet",480,500,4),q("sink-vanity",700,500,5),q("bath-mirror",700,175,6),q("towel-bar",940,200,7)]},backyard:{wallpaper:"#c5ecff",floor:"#b6e3a8",pattern:0,items:[{id:"yard-bench-1",kind:"yard-bench",x:1122,y:372,flip:!1,z:1,scale:1},{id:"tulip-bed-2",kind:"tulip-bed",x:946,y:580,flip:!1,z:2,scale:1}]}},characters:[ts({id:"c1",skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6",room:"living",x:330+Mo,y:540})],soundOn:!0,dogKennel:null}}function ts(e){return{skin:"#f1c27d",hair:"#5b3a29",hairStyle:0,shirt:"#ff7aa8",pants:"#5aa9e6",size:"kid",acc:0,room:"living",x:Tt/2,y:540,flip:!1,held:{left:null,right:null},...e}}const gs=(e,t,n)=>Math.max(t,Math.min(n,e)),Bo=e=>e.items.reduce((t,n)=>Math.max(t,n.z),0),Ou=e=>e.items.reduce((t,n)=>Math.min(t,n.z),0);function Oi(e,t,n){return{...e,characters:e.characters.map(s=>s.id===t?n(s):s)}}function Wu(e,t,n){const s=e.baby;if(!t||!s||s.spot!=="arms"||s.holder!==t.id||n===s.room)return e;const o=t.room===s.room?t.x:s.x,i=t.room===s.room?t.y:Li,a=$l(s,null,s.room,o,i);return!a||a===s?e:{...e,baby:a}}function gi(e){if(!e.seat)return e;const{seat:t,...n}=e;return n}let Ca=null;function Sp(){const e=Ca;return Ca=null,e}function Wi(e,t,n,s){if(!e.baby)return e;const o=s?wc(s.x,Ea(s.kind)*Ge(s),e.baby.x):null,i=Bu(e.baby,t,n,o);return i===e.baby?e:{...e,baby:i}}function Ui(e,t,n){n&&(Ca={id:t,x:n.x,kind:n.kind,scale:Ge(n)});let s=!1;const o=e.characters.map(i=>{if(i.seat?.item!==t)return i;if(s=!0,!n)return gi(i);const a=wc(n.x,Ea(n.kind)*Ge(n),i.x),{seat:r,...l}=i;return{...l,x:a.x,y:a.y}});return s?{...e,characters:o}:e}function Uu(e,t,n,s){if(!s){const i=vl(e.seat,t);return i?e.seat===i?e:{...e,seat:i}:gi(e)}const o=vl(n,t);return o?{...e,seat:o}:gi(e)}function Xe(e,t,n){const s=e.rooms[t];if(!s)return e;const o=n(s);return o===s?e:{...e,rooms:{...e.rooms,[t]:o}}}function Vu(e){const t=new Set;let n=!1;const s=e.map(o=>{if(!t.has(o.id))return t.add(o.id),o;n=!0;const i=String(o.id).replace(/-d\d+$/,"").replace(/[^A-Za-z0-9:_/.-]/g,"").slice(0,72)||"item";let a=2,r=(i+"-d"+a).slice(0,80);for(;t.has(r);)a+=1,r=(i+"-d"+a).slice(0,80);return t.add(r),{...o,id:r}});return n?s:e}function zu(e){let t=!1;const n={...e.rooms};for(const s of pi){const o=e.rooms[s];if(!o||!Array.isArray(o.items))continue;const i=Vu(o.items);i!==o.items&&(n[s]={...o,items:i},t=!0)}return t?{...e,rooms:n}:e}function Pp(e){if(!e||!e.rooms)return e;const t=Fn().rooms,n=e.rooms;let s=!1;for(const i of pi){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(s=!0)}const o=s?(()=>{const i={...n};for(const a of pi){const r=n[a];(!r||typeof r!="object"||!Array.isArray(r.items))&&(i[a]=t[a])}return{...e,rooms:i}})():e;return zu(o)}function Sa(e,t){switch(Ca=null,t.type){case"room/switch":return e.rooms[t.room]?{...e,currentRoom:t.room}:e;case"item/add":return Xe(e,t.room,n=>n.items.length>=80||n.items.some(s=>s.id===t.item.id)?n:{...n,items:[...n.items,{...t.item,z:Bo(n)+1}]});case"item/move":{const n=e.rooms[t.room]?.items.find(o=>o.id===t.id)??null,s=Xe(e,t.room,o=>({...o,items:o.items.map(i=>i.id===t.id?{...i,x:gs(t.x,0,Tt),y:gs(t.y,40,En)}:i)}));return t.stand?Wi(Ui(s,t.id,n),t.id,!1,n):s}case"item/flip":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return Wi(Ui(Xe(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?{...o,flip:!o.flip}:o)})),t.id,n),t.id,!1,n)}case"item/size":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||Rs(n.size)===Rs(t.size)?e:Xe(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?Cp(o,t.size):o)}))}case"item/power":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||!gp(n.kind)||!!n.on==!!t.on?e:Xe(e,t.room,s=>({...s,items:s.items.map(o=>{if(o.id!==t.id)return o;if(t.on)return{...o,on:!0};const{on:i,...a}=o;return a})}))}case"item/front":return Xe(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:Bo(n)+1}:s)}));case"item/back":return Xe(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:Ou(n)-1}:s)}));case"item/delete":{const n=e.rooms[t.room]?.items.find(a=>a.id===t.id)??null,s=n?.kind==="kennel",o=Ui(Xe(e,t.room,a=>({...a,items:a.items.filter(r=>r.id!==t.id)})),t.id,n),i=s&&e.dogKennel?.item===t.id?{...o,dogKennel:null}:o;return Wi(i,t.id,!0,n)}case"room/wallpaper":return Xe(e,t.room,n=>({...n,wallpaper:t.color}));case"room/floor":return Xe(e,t.room,n=>({...n,floor:t.color}));case"room/pattern":return Xe(e,t.room,n=>({...n,pattern:t.pattern,wallTile:null}));case"room/wallTile":return Xe(e,t.room,n=>({...n,wallTile:t.tile}));case"room/floorTile":return Xe(e,t.room,n=>({...n,floorTile:t.tile}));case"char/add":return e.characters.length>=Lo||e.characters.some(n=>n.id===t.char.id)?e:{...e,characters:[...e.characters,t.char]};case"char/update":return Oi(e,t.id,n=>{const{look2:s,...o}=t.patch,i={...n,...o};return"look2"in t.patch&&(s?i.look2=s:delete i.look2),i});case"char/move":{if(!e.rooms[t.room])return e;const n=e.characters.find(o=>o.id===t.id),s=Oi(e,t.id,o=>{const i={...o,room:t.room,x:gs(t.x,0,Tt),y:gs(t.y,60,En)};return Uu(i,e.rooms[t.room].items,t.seat,"seat"in t)});return Wu(s,n,t.room)}case"char/delete":{const n=e.characters.find(o=>o.id===t.id);if(!n)return e;let s={...e,characters:e.characters.filter(o=>o.id!==t.id)};if(["left","right"].forEach((o,i)=>{const a=n.held[o];a&&(s=Xe(s,n.room,r=>({...r,items:[...r.items,{...a,x:n.x+(i?40:-40),y:n.y,z:Bo(r)+1}]})))}),s.baby?.spot==="arms"&&s.baby.holder===t.id){const o=$l(s.baby,null,s.baby.room,s.baby.x,s.baby.y);o&&o!==s.baby&&(s={...s,baby:o})}return s}case"char/hold":{const n=e.characters.find(r=>r.id===t.id),s=e.rooms[t.room]?.items.find(r=>r.id===t.itemId);if(!n||!s||n.held[t.hand]||n.room!==t.room)return e;const o=Ui(Xe(e,t.room,r=>({...r,items:r.items.filter(l=>l.id!==t.itemId)})),t.itemId,s),i=Oi(o,t.id,r=>({...r,held:{...r.held,[t.hand]:s}})),a=s.kind==="kennel"&&e.dogKennel?.item===t.itemId?{...i,dogKennel:null}:i;return Wi(a,t.itemId,!0,s)}case"char/release":{const n=e.characters.find(i=>i.id===t.id),s=n?.held[t.hand];if(!n||!s)return e;const o=Oi(e,t.id,i=>({...i,held:{...i.held,[t.hand]:null}}));return Xe(o,n.room,i=>({...i,items:[...i.items,{...s,x:gs(t.x,0,Tt),y:gs(t.y,40,En),z:Bo(i)+1}]}))}case"cat/set":return{...e,cat:t.cat};case"cat/move":return e.cat&&e.rooms[t.room]?{...e,cat:{...e.cat,room:t.room,x:gs(t.x,100,Tt-100)}}:e;case"dog/set":return{...e,dog:t.dog};case"dog/kennel":return t.item===null?e.dogKennel?{...e,dogKennel:null}:e:!Hu(e,t.item)||e.dogKennel?.item===t.item?e:{...e,dogKennel:{item:t.item}};case"ranch/op":{const n=t.op;if(n.op==="take"){const i=e.rooms[n.room];if(i&&i.items.some(a=>a.id===n.id))return e}const s=wl(bc(e.garden),yc(e.basket),t.op,t.now,e.lastEgg??0);if(typeof s=="string")return e;let o={...e,garden:s.plots,basket:s.basket,lastEgg:t.op.op==="egg"?t.now:e.lastEgg};if(t.op.op==="take"&&o.rooms[t.op.room]){const i=t.op;o=Xe(o,i.room,a=>a.items.length>=80?a:{...a,items:[...a.items,{id:i.id,kind:iu[i.kind],x:i.x,y:560,flip:!1,z:Bo(a)+1,scale:1}]})}return o}case"settings/sound":return{...e,soundOn:t.on};case"game/reset":return Fn();case"baby/meet":return e.baby?e:{...e,baby:Cu(e.rooms,t.now)};case"baby/name":return!e.baby||!t.name||t.name===e.baby.name?e:{...e,baby:nn({...e.baby,name:t.name})};case"baby/care":{if(!e.baby)return e;const n=Su(e.baby,t.care,t.now);return n===e.baby?e:{...e,baby:n}}case"baby/hold":{if(!e.baby)return e;const n=$l(e.baby,t.holder,t.room,t.x,t.y);return!n||n===e.baby?e:{...e,baby:n}}case"baby/place":{if(!e.baby||!e.rooms[t.room])return e;const n=e.characters.filter(o=>o.room===t.room&&o.seat).map(o=>({item:o.seat.item,n:o.seat.n})),s=Tu(e.baby,t,e.rooms[t.room].items,n);return s===e.baby?e:{...e,baby:s}}case"baby/ease":{if(!e.baby)return e;const n=Pu(e.baby,t.now);return n?{...e,baby:n}:e}}}const Ud=Nt("cozy-house"),Qu=Nt("cozy-house-v1");function xc(e){if(!e||typeof e!="object"||!e.rooms)return Fn();let t=e;if(t.version===1){const d=h=>(Number(h)||0)+Mo,g={};for(const[h,m]of Object.entries(t.rooms))g[h]={...m,items:(m.items??[]).map(k=>({...k,x:d(k.x)}))};t={...t,version:2,rooms:g,character:{...t.character,x:d(t.character?.x)}}}if(t.version===2){const d=t.character??{};t={...t,version:3,characters:[ts({...d,id:"c1",size:"kid",acc:0,held:{left:null,right:null}})]},delete t.character}if(t.version!==3)return Fn();const n=Fn(),s=(Array.isArray(t.characters)?t.characters:[]).slice(0,Lo).map((d,g)=>{const h=d?.look2,m=ts({...d,id:String(d.id??"c"+(g+1)),held:{left:d.held?.left??null,right:d.held?.right??null}});if(delete m.look2,h!=null){const k=xi(h);k&&(m.look2=k)}return m}),o=Pp({...n,...t,rooms:{...n.rooms,...t.rooms},characters:s}),i=Vd(o),a=$c(i),r=a===o.dogKennel?o:{...o,dogKennel:a},l=pu(r.mailbox);let c=i===o?r:{...r,characters:i.characters};if(l)c={...c,mailbox:l};else if(c.mailbox){const{mailbox:d,...g}=c;c=g}const f=Eu(c.baby,c.rooms);if(f)c={...c,baby:f};else if("baby"in c){const{baby:d,...g}=c;c=g}return Vd(qu(c))}function Vd(e){let t=!1;const n=e.characters.map(s=>{const o=vl(vc(s.seat),e.rooms[s.room]?.items);return o?s.seat?.item===o.item&&s.seat.pose===o.pose&&s.seat.n===o.n?s:{...s,seat:o}:s.seat?(t=!0,gi(s)):s});return!t&&n.every((s,o)=>s===e.characters[o])?e:{...e,characters:n}}function qu(e){const t=e.currentRoom,n=Lp.includes(t),s=a=>pi.includes(a);let o=!1;const i=e.characters.map(a=>{const r=a.room;return!s(r)||!n&&r===t?(o=!0,{...a,room:"living"}):a});return n&&!o?e:{...e,currentRoom:n?e.currentRoom:"living",characters:i}}function Tp(){let e,t=!1;try{const o=localStorage.getItem(Ud)??localStorage.getItem(Qu);o?e=xc(JSON.parse(o)):(t=!0,e=Fn(),typeof navigator<"u"&&!navigator.webdriver&&(e=Y0(e)))}catch{e=Fn()}const n=[];let s;return{get:()=>e,subscribe(o){n.push(o)},dispatch(o){e=Sa(e,o),n.forEach(i=>i(e,o)),clearTimeout(s),s=window.setTimeout(()=>{try{localStorage.setItem(Ud,JSON.stringify(e))}catch{}},250)},born:t}}const Zu=Object.freeze(Object.defineProperty({__proto__:null,ITEM_SIZE_STEPS:Ss,MAX_CHARS:Lo,ROOM_H:En,ROOM_IDS:pi,ROOM_W:Tt,SCENE_ROOMS:Lp,V1_OFFSET:Mo,V1_ROOM_W:Ep,applyItemSize:Cp,createStore:Tp,drawnScale:Ge,ensureRooms:Pp,initialState:Fn,itemSizeOf:Rs,migrate:xc,newCharacter:ts,reduce:Sa,standChar:gi,takeClearedFurniture:Sp,validKennel:$c},Symbol.toStringTag,{value:"Module"}));function xl(e,t){for(let n=e.length-1;n>0;n--){const s=Math.floor(t()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}const Bp=4,zd=7,Nu=30;function Fu(){const e=[];let t=0;for(let n=0;n<Bp;n++){e.push({id:t++,c:n,v:0});for(let s=1;s<=9;s++)for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s});for(const s of["skip","rev","d2"])for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s})}for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"wild"});for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"w4"});return e}const Ml=e=>e.discard[e.discard.length-1],Ro=(e,t)=>t.c===4||t.c===e.color||t.v===Ml(e).v&&Ml(e).c!==4,Dn=(e,t,n=1)=>{const s=e.hands.length;return((t+e.dir*n)%s+s)%s};function Ll(e,t,n,s){const o=[];for(let i=0;i<n&&e.hands[t].length<Nu;i++){if(!e.deck.length){const r=e.discard.pop();if(e.deck=xl(e.discard.map(l=>l),s),e.discard=[r],!e.deck.length)break}const a=e.deck.pop();e.hands[t].push(a),o.push(a)}return e.hands[t].length>1&&(e.slay[t]=!1),o}function ju(e,t){if(e.owe!==null&&e.hands[e.owe]?.length===1&&!e.slay[e.owe]){const n=e.owe;return e.owe=null,{victim:n,vdrew:Ll(e,n,2,t).length}}return e.owe=null,{}}const Qd=e=>{const t=[0,0,0,0];return e.forEach(n=>{n.c<4&&t[n.c]++}),t.indexOf(Math.max(...t))},Gu={id:"slay",name:"Slay",minPlayers:2,maxPlayers:6,setup(e,t){const n=xl(Fu(),t),s=Array.from({length:e},()=>n.splice(-zd,zd));let o=n.length-1;for(;typeof n[o].v!="number";)o--;const i=n.splice(o,1)[0];return{deck:n,discard:[i],hands:s,color:i.c,turn:Math.floor(t()*e),dir:1,drawn:null,slay:s.map(()=>!1),owe:null,winner:null,ev:{n:0,p:-1,k:"start",card:i}}},cleanMove(e){return!e||typeof e!="object"?null:e.k==="play"&&Number.isInteger(e.id)&&e.id>=0&&e.id<108?{k:"play",id:e.id,...Number.isInteger(e.color)&&e.color>=0&&e.color<Bp?{color:e.color}:{}}:e.k==="draw"||e.k==="pass"||e.k==="slay"?{k:e.k}:null},legal(e,t,n){if(e.winner!==null)return!1;if(n.k==="slay")return e.hands[t].length<=2&&!e.slay[t];if(t!==e.turn)return!1;if(n.k==="draw")return e.drawn===null;if(n.k==="pass")return e.drawn!==null;const s=e.hands[t].find(o=>o.id===n.id);return!s||e.drawn!==null&&s.id!==e.drawn||s.c===4&&n.color===void 0?!1:Ro(e,s)},apply(e,t,n,s){const o=e.ev.n+1;if(n.k==="slay")return e.slay[t]=!0,e.owe===t&&(e.owe=null),e.ev={n:o,p:t,k:"slay"},e;const i=ju(e,s);if(n.k==="draw"){const f=Ll(e,t,1,s),d=f[0];if(d&&Ro(e,d))e.drawn=d.id,e.ev={n:o,p:t,k:"draw",drew:1,...i};else{if(e.drawn=null,e.ev={n:o,p:t,k:"draw",drew:f.length,...i},e.stuck=f.length?0:(e.stuck??0)+1,(e.stuck??0)>=e.hands.length){const g=Math.min(...e.hands.map(h=>h.length));return e.winner=e.hands.findIndex(h=>h.length===g),e.turn=-1,e}e.turn=Dn(e,t)}return e}if(n.k==="pass")return e.drawn=null,e.turn=Dn(e,t),e.ev={n:o,p:t,k:"pass",...i},e;e.stuck=0;const a=e.hands[t],r=a.splice(a.findIndex(f=>f.id===n.id),1)[0];e.discard.push(r),e.drawn=null,e.color=r.c===4?n.color:r.c;const l={n:o,p:t,k:"play",card:r,color:e.color,...i};if(!a.length)return e.winner=t,e.turn=-1,e.ev=l,e;a.length===1&&!e.slay[t]&&(e.owe=t);const c=e.hands.length===2;if(r.v==="rev")e.dir=e.dir===1?-1:1,e.turn=c?t:Dn(e,t);else if(r.v==="skip")l.skipped=Dn(e,t),e.turn=Dn(e,t,2);else if(r.v==="d2"||r.v==="w4"){const f=Dn(e,t);l.skipped=f;const d=r.v==="d2"?2:4;l.drew=Ll(e,f,d,s).length,e.turn=Dn(e,t,2)}else e.turn=Dn(e,t);return e.ev=l,e},turn:e=>e.winner!==null?-1:e.turn,winner:e=>e.winner,view(e,t){return{top:Ml(e),color:e.color,turn:e.winner!==null?-1:e.turn,dir:e.dir,deck:e.deck.length,counts:e.hands.map(n=>n.length),slay:e.slay,winner:e.winner,ev:e.ev,...t!==null&&e.hands[t]?{hand:e.hands[t],drawn:t===e.turn?e.drawn:null}:{}}},autoMove(e,t){if(t!==e.turn)return null;if(e.drawn!==null){const s=e.hands[t].find(o=>o.id===e.drawn);return s&&Ro(e,s)?{k:"play",id:s.id,...s.c===4?{color:Qd(e.hands[t])}:{}}:{k:"pass"}}const n=e.hands[t].find(s=>Ro(e,s)&&s.c!==4)??e.hands[t].find(s=>Ro(e,s));return n?{k:"play",id:n.id,...n.c===4?{color:Qd(e.hands[t])}:{}}:{k:"draw"}},removePlayer(e,t,n){if(e.hands.length<=2)return null;const s=e.turn===t;return e.deck.unshift(...e.hands[t]),xl(e.deck,n),e.hands.splice(t,1),e.slay.splice(t,1),e.owe===t?e.owe=null:e.owe!==null&&e.owe>t&&e.owe--,e.turn>t&&e.turn--,s&&(e.drawn=null,e.dir===-1?e.turn=((t-1)%e.hands.length+e.hands.length)%e.hands.length:e.turn=t%e.hands.length),e.ev={n:e.ev.n+1,p:t,k:"left"},e}},El=7,la=6,Yu=(e,t,n)=>{const s=e[t][n];for(const[o,i]of[[1,0],[0,1],[1,1],[1,-1]]){const a=[[t,n]];for(const r of[1,-1])for(let l=1;l<4;l++){const c=t+o*l*r,f=n+i*l*r;if(c<0||c>=El||f<0||f>=la||e[c][f]!==s)break;a.push([c,f])}if(a.length>=4)return a}return null},Ku={id:"four",name:"Four in a Row",minPlayers:2,maxPlayers:2,setup:(e,t)=>({b:Array.from({length:El},()=>[]),turn:t()<.5?0:1,winner:null,draw:!1,line:null,last:null,n:0}),cleanMove:e=>e&&Number.isInteger(e.col)&&e.col>=0&&e.col<El?{col:e.col}:null,legal:(e,t,n)=>e.winner===null&&!e.draw&&t===e.turn&&e.b[n.col].length<la,apply(e,t,n){e.b[n.col].push(t);const s=e.b[n.col].length-1;e.last={col:n.col,row:s,p:t},e.n++;const o=Yu(e.b,n.col,s);return o?(e.winner=t,e.line=o,e.turn=-1):e.b.every(i=>i.length>=la)?(e.draw=!0,e.turn=-1):e.turn=1-t,e},turn:e=>e.turn,winner:e=>e.winner,view:e=>e,autoMove:(e,t)=>{if(t!==e.turn)return null;const s=[3,2,4,1,5,0,6].find(o=>e.b[o].length<la);return s===void 0?null:{col:s}},removePlayer:()=>null},Rp={slay:Gu,four:Ku},Ei=2600,As=[{game:"slay",seats:6,x:720},{game:"four",seats:2,x:1500},{game:"slay",seats:4,x:2150}],Xu=2e4,Ju="winter",em="Winter Cheer",tm={[Ju]:em},nm=["pack:wc-holiday-tree","pack:wc-gingerbread","pack:wc-gingerbread-village","pack:wc-bauble-garland","pack:wc-stocking-row","pack:wc-cane-lamp","pack:wc-star-topper","pack:wc-poinsettia","pack:wc-holly","pack:wc-nutcracker","pack:wc-reindeer","pack:wc-sleigh-planter"],sm=["Berry Wreath","Birch Log Basket","Cabin Picture","Cabin Planks","Candy Cane Lamp","Candy Stripe","Cinnamon Roll Tray","Cocoa Cart","Cocoa Pot","Cookie Oven","Cookie Plate","Cozy Red Plaid","Cozy Sock Hamper","Decorated Holiday Tree","Frosted Pine","Frosty Bookcase","Frosty Dots","Fur-Trim Bench","Gingerbread Cottage","Gingerbread Village","Holly Sprig","Ice Skates","Ice-Blue Wardrobe","Knit Pom Rug","Knit Stocking Row","Knit-Blanket Armchair","LED Candle Trio","Lantern","Log Bench","Marshmallow Jar","Mint Pine Sprigs","Mitten Ottoman","Mittens on a Line","Mug Tree Shelf","Mug of Cocoa","Nutcracker Friend","Penguin Plush","Penguin Plush Chair","Peppermint Counter","Peppermint Swirl Rug","Peppermint Tiles","Pinecone Garland","Pinecone Side Table","Plaid Cabin Sofa","Poinsettia Pot","Polar Bear Plush","Red Plaid Quilt Bed","Reindeer Plush","Ribbon Bauble Garland","Sled Coffee Table","Sleigh Planter","Snow Globe","Snow Knit Carpet","Snow-Globe Lamp","Snowflake Mobile","Snowflake Nightstand","Snowflake Sky","Snowman Buddy","Snowshoes","Snowy Window Art","Snowy Window Seat","Star Tree Topper","Stone Hearth Fireplace","Twinkle Light String","Twinkle-Light Floor Lamp","Winter Cheer","Woodstove","Wrapped Present Stack"],om=["A-Frame Swing","Acorn Friend","Alarm Clock","Apple","Apple Tree","Arc Floor Lamp","Arc Lamp","Arched Mirror","Arched Shelf","Armchair","Autumn Wreath","Baby Blocks","Baby Bottle","Bakery Shelf","Ball","Balloons","Bananas","Bar Stool","Bassinet","Bath Mat","Bath Mirror","Bath Stool","Bathtub","Beach Ball","Bean Bag","Bed","Berry Basket","Big Leaf Plant","Big Monitor","Big Wardrobe","Birdbath","Birdhouse","Birdie","Blanket Basket","Blocks","Boba Buddy","Book Stack","Books","Bookshelf","Box Stack","Bread","Brush & Comb","Bubble Aquarium","Bubble Bath","Bubble Chair","Bubble-Gum Rug","Bubbly Fountain","Bubbly Plant","Bud Vase","Bulletin Board","Bunk Bed","Bunny","Bunny Plush","Bunny Slippers","Butterfly Bush","Cactus","Cactus Buddy","Cada's Mouse","Cake","Candle Jar","Canopy Bed","Canopy Daybed","Cat Bed","Cat Tower","Caterpillar Plush","Chair","Changing Table","Checker Rug","Checkered Bed","Chick","Chloe's Star Lamp","Clock","Clothes Rail","Clothesline","Cloud Beanbag","Cloud Lamp","Cloud Rug","Cloud Shelf","Cocoa Doll","Cocoa Mug","Coffee Table","Comfy Chair","Cookie Jar","Cooking Pot","Cottage Heart Pouf","Cottage Heart Rug","Counter","Cozy Fireplace","Cozy Lights","Cozy Mug","Cozy Nightstand","Cozy Reading Nook","Cozy Snake Plant","Cozy Teapot","Cream Jars","Cream Sofa","Crib","Crib Mobile","Cubby Shelf","Cube Shelf","Cupcake","Cupcake Stand","Curtains","Curvy Yellow Desk","Cute Keyboard","Cute Speaker","Daisy Pot","Daisy Rug","Desk","Desk Lamp","Desk Mic","Dino Plushie","Dish Cabinet","Dish Rack","Dog Kennel","Doll House","Donut","Dresser","Droplet Buddy","Egg Pan","Fairy-Light Garland","Fairy-Light Shelf","Fan","Fancy Sofa","Fiddle-Leaf Fig","Fig Tree","Fire Pit","Fireplace","Fish Bowl","Fish Tank","Floor Cushion","Flower Cart","Flower Floor Lamp","Flower Kettle","Flower Lamp","Flowers","Foot Spa","Fresh Egg","Fridge","Frog Plush","Fruit Bowl","Game Controller","Gaming Chair","Garden Bench","Garden Carrot","Garden Gnome","Glass Cabinet","Globe","Globe Pendants","Glossy Hair Dryer","Glow Mirror","Gold Floor Mirror","Guinea Pig","Hair Dryer","Hair-Dryer Chair","Hair-Wash Chair","Hammock","Hamster House","Hamster Pal","Hanging Lamp","Hanging Lantern","Hanging Plant","Hanging Vine Planter","Happy Fridge","Headphones","Heart Headboard Bed","Heart Pouf","Heart Rug","Heart Wall Clock","Heart Wall Light","Heart-Leaf Plant","Hedge Row","Herb Box","High Chair","Honey Doll","Ice Cream","Jewelry Box","Juice","Kettle","Kitchen Counter","Knit Cushion","Ladder Shelf","Lamp","Landscape Art","Lattice Bench","Laundry Hamper","Lava Lamp","Lemon Tree","Lemonade Cart","Lemonade Cup","Lighted Vanity","Lilac Curtain","Lily Pond","Little Rocking Horse","Little Slide","Little Sprout","Lotion Bottles","Macaron Jar","Macrame Swing Chair","Mani-Pedi Chair","Manicure Table","Microwave","Milk","Milk & Cookies","Mini Fridge","Mini Greenhouse","Mini Tree","Mint Fridge","Mint Pebble Rug","Mirror","Mixer","Moon and Stars","Moon Night-Light","Moving Box","Mushroom Stool","Music Box","Nail Dryer","Nail Polish","Nail Polish Rack","Night Light","Nightstand","Nursery Cloud Rug","Nursery Dresser","Nursery Lamp","Pancakes","Pantry","Paper Lantern","Pastel Range","Pastel Wardrobe","Patio Lights","Patio Umbrella","Pendant Lamp","Perfume","Perfume Bottle","Perfume Tray","Pet Bowl","Petal Coffee Table","Phone on a Stand","Piano","Picket Gate","Picnic Basket","Picnic Blanket","Picnic Table","Picture","Piggy Bank","Pillow","Pin Board","Pink Vanity","Pinwheel","Pizza","Plant","Plant Stand","Plant Wall","Play Mat","Play Tent","Polish Bottle","Popcorn","Pothos Plant","Pouf","Puffy Cloud Sofa","Puffy Stool","Puppy","Quinn's Cookie Pup","Radio","Rain Barrel","Rainbow Art","Rainbow Rug","Ranch Flowers","Rattle","Reagan's Frame","Reception Desk","Record Player","Ribbon Mirror","Ribbon Tray","Rice Cooker","Ring Light","Robot","Rocker","Rocking Chair","Rocking Horse","Rose Doll","Round Breakfast Table","Round Side Table","Round Woven Rug","Rubber Ducky","Rug","Runner Rug","Salon Chair","Sandbox","Scallop Curtains","Scalloped Loveseat","Seesaw","Shelf","Shower Curtain","Sink","Sink Vanity","Sloane's Rainbow Snail","Snake Plant","Soaking Tub","Soap Dish","Sofa","Sparkle Wall Light","Spice Rack","Splash Pool","Spray Bottle","Sprinkler","Stacking Rings","Star Dresser","Star Lamp","Star Mobile","Stars","Stepping Stones","Sticker Board","Story Pillow","Stove","String Lights","Striped Runner","Succulents","Sun Lounger","Sunny Art","Sunny Bean Bag","Sunny Cloud Rug","Sunny Shelf","Swing Chair","Swivel Stool","Table","Tassel Rug","Teapot","Teapot Set","Teddy","Tiered Tray","Toadstool Light","Toaster","Toilet","Towel Bar","Towel Cart","Towel Stack","Toy Bin","Toy Car","Toy cat","Toy Chest","Toy Train","Trailing Plant Shelf","Tulip Bed","Tulip Vase","Turtle","TV","TV Stand","Unicorn Plushie","Utensil Rail","Vanity","Vanity Stool","Vegetable Patch","Vlog Camera","Wagon","Waiting Bench","Wall Shelf","Wardrobe","Water-Drop Lamp","Watermelon","Wavy Floor Lamp","Window","Window Seat","Wood Armchair","Wood Bookshelf","Wood Coffee Table","Wood Desk","Wood Dresser","Wood Stool","Wood Wall Clock","Wooden Bed","Yard Sign",...sm],im=4,Mc=16,Pa=e=>String(e??"").toUpperCase().replace(/[^A-Z0-9]/g,""),am=e=>e.length>=im&&e.length<=Mc&&/^[A-Z0-9]+$/.test(e),rm=12,lm=["Cada","Chloe","Quinn","Reagan","Sloane"],cm=460,dm=320,qd=["Sunny Bunny","Bubbly Panda","Sparkle Kitty","Happy Hippo","Cozy Koala","Jolly Jelly","Zippy Fox","Dreamy Deer","Giggly Goose","Peachy Pup","Minty Mouse","Rainbow Duck","Cuddly Cub","Starry Owl","Bouncy Frog","Lucky Lamb","Snuggly Seal","Twinkle Tiger","Berry Bear","Cloudy Llama","Pebble Penguin","Honey Hedgehog","Marshmallow Moose","Cupcake Cat"],ti=["Hi!","Come over!","I love your house!","Let's play!","Follow me!","Look at this!","Want a snack?","Nice!","Yes!","No thanks","Hehe","Be right back","Bye!","Let's decorate!","Wanna race?","So cute!"],Ap=["👋","😀","😂","😍","😮","😢","🎉","⭐","❤️","👍","🍕","🐱","🌈","🎶","💤","✨"],Lc=60,fm={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t","@":"a",$:"s","!":"i","+":"t"},Fr=["fuck","fuk","fck","shit","sht","bitch","btch","bastard","asshole","ass","dick","cock","pussy","cunt","whore","slut","damn","crap","piss","fag","faggot","retard","nigger","nigga","porn","sex","sexy","nude","naked","boob","boobs","penis","vagina","kill","suicide","stupid","idiot","dumb","hate","loser","shutup","wtf","stfu","gtfo","bs"],pm=["zero","oh","one","two","three","four","five","six","seven","eight","nine","ten"],gm=[/\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i,/\bi\s*live\s+(at|on|in)\b/i,/\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,/\b(password|passcode|zip\s*code|postcode)\b/i,/\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i],hm=/(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i,um=/\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i,mm=/@\w/,ym=/\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;function bm(e,t=Lc){if(typeof e!="string")return{ok:!1,reason:"empty"};const n=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(!n)return{ok:!1,reason:"empty"};if(n.length>t)return{ok:!1,reason:"long"};if(hm.test(n))return{ok:!1,reason:"link"};if(um.test(n)||mm.test(n))return{ok:!1,reason:"contact"};if((n.match(/\d/g)??[]).length>=5||/\d[\d\s().\-]{4,}\d/.test(n)||ym.test(n))return{ok:!1,reason:"contact"};const o=n.toLowerCase().split(/[^a-z]+/).filter(Boolean);let i=0;for(const c of o)if(i=pm.includes(c)?i+1:0,i>=4)return{ok:!1,reason:"contact"};if(gm.some(c=>c.test(n)))return{ok:!1,reason:"personal"};const a=n.toLowerCase().replace(/[0-9@$!+]/g,c=>fm[c]??c),r=a.split(/[^a-z]+/).filter(Boolean),l=a.replace(/[^a-z]/g,"").replace(/(.)\1{2,}/g,"$1$1");return r.some(c=>Fr.includes(c)||Fr.includes(c.replace(/(.)\1+/g,"$1")))||Fr.filter(c=>c.length>=5).some(c=>l.includes(c))?{ok:!1,reason:"words"}:{ok:!0,text:n}}const km={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t",8:"b","@":"a",$:"s","!":"i","+":"t",v:"u","|":"k","<":"k","#":"h"};function wm(e){return/^f+u+c+k+$/.test(e)||/^f+u+k+$/.test(e)||/^f+c+k+$/.test(e)||/^s+h+i+t+$/.test(e)||/^s+h+t+$/.test(e)||/^b+i+t+c+h+$/.test(e)||/^b+t+c+h+$/.test(e)||/^a+s+h+o+l+e+$/.test(e)||/^d+u+m+b+a+s+$/.test(e)||/^n+i+g{2,}e+r+$/.test(e)||/^n+i+g{2,}a+$/.test(e)||/^f+a+g+$/.test(e)||/^f+a+g+o+t+$/.test(e)||/^r+e+t+a+r+d+$/.test(e)||/^k+y+s+$/.test(e)}function vm(e){return/^c+u+n+t+$/.test(e)||/^a+h+o+l+e+$/.test(e)||/^k+i+k+e+$/.test(e)||/^c+h+i+n+k+$/.test(e)||/^s+p+i+c+$/.test(e)||/^c+o{2,}n+$/.test(e)||/^w+e+t+b+a+c+k+$/.test(e)||/^t+r+a+n+y+$/.test(e)||/^t+r+a+n+i+$/.test(e)||/^d+y+k+e+$/.test(e)||/^b+e+a+n+e+r+$/.test(e)||/^g+o{2,}k+$/.test(e)||/^r+a+g+h+e+a+d+$/.test(e)||/^t+o+w+e+l+h+e+a+d+$/.test(e)||/^h+e+i+l+h+i+t+l+e+r+$/.test(e)}const _m=new Set(["spicy","spices","spicing","spicey","spicier","spiciest","cocky","chinking","spicer","gooky","slutty","twatt"]);function $m(e,t){if(!/^[a-z]+$/.test(e)||t&&_m.has(e))return!1;const n=[e],s=["ing","in","ers","er","ed","es","y","s"];for(let o=0;o<s.length;o++){const i=s[o];e.endsWith(i)&&e.length>i.length+2&&n.push(e.slice(0,-i.length))}for(let o=0;o<n.length;o++)if(wm(n[o])||t&&vm(n[o]))return!0;return!1}function xm(e){if(!e.includes("*"))return[e];const t=e.split("*").length-1,n=e.replace(/\*/g,""),s=n?[n]:[];if(t<1||t>3)return s;const o=e.split(""),i=[];for(let r=0;r<o.length;r++)o[r]==="*"&&i.push(r);const a=r=>{if(r===i.length){s.push(o.join(""));return}for(let l=97;l<=122;l++)o[i[r]]=String.fromCharCode(l),a(r+1)};return a(0),s}const Zd=["mother","sonofa","horse","bull","dip"],Nd=["face","head","you"];function fo(e,t){const n=e.replace(/ph(?=u+c+k)/g,"f").replace(/ph(?=u+k)/g,"f");if($m(n,t)||/^w+t+f+$/.test(n)||/^s+t+f+u+$/.test(n))return!0;for(let s=0;s<Zd.length;s++){const o=Zd[s];if(n.startsWith(o)&&n.length>o.length+2&&fo(n.slice(o.length),t))return!0}for(let s=0;s<Nd.length;s++){const o=Mm(n,Nd[s]);if(o&&fo(o,t))return!0}return!!(n.length>4&&n.endsWith("s")&&!n.endsWith("ss")&&fo(n.slice(0,-1),t))}function Mm(e,t){let n=e.length;for(let s=t.length-1;s>=0;s--){const o=t[s];if(n===0||e[n-1]!==o)return null;for(;n>0&&e[n-1]===o;)n--}return n<=2?null:e.slice(0,n)}function Ta(e){let t="";for(let n=0;n<e.length;n++)t+=km[e[n]]??e[n];return t}const Lm={ѕ:"s",һ:"h",с:"c",а:"a",е:"e",о:"o",р:"p",і:"i",х:"x",у:"y",к:"k"};function Em(e){const n=e.replace(/[\u00ad\u0336\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").normalize("NFKC").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase();let s="";for(let o=0;o<n.length;o++)s+=Lm[n[o]]??n[o];return s}const Cm=new Set(["it","its","it's","is","as","a","i","uh","oh","so","he","she","hi","um","umm","hmm","hm","ah","eh","er","ow","ha","hey","yo","ok","yeah","yes","no","nah","wow","ho","ooh","ahh","uhh","ohh"]);function hi(e){return e>="a"&&e<="z"||e>="0"&&e<="9"||"@$!+*v|#<".includes(e)}function Fd(e,t){let n=t;for(;n<e.length&&e[n]==="!";)n++;if(n>=e.length||!hi(e[n])||e[n]==="!")return null;const s=e[n];let o=n+1;for(;o<e.length&&e[o]==="!";)o++;return o<e.length&&hi(e[o])?null:{ch:s,end:o}}function Sm(e,t){const n=e.length,s=" .-_~";let o=0;for(;o<n;){if(o>0&&hi(e[o-1])){o++;continue}const i=Fd(e,o);if(!i){o++;continue}const a=[i.ch];let r=i.end;for(;r<n&&s.includes(e[r]);){const l=Fd(e,r+1);if(!l)break;a.push(l.ch),r=l.end}if(a.length>=2){const l=Ta(a.join("")).replace(/\*/g,"");if(fo(l,t))return!0}o=Math.max(o+1,r)}return!1}function Ds(e){return e.replace(/^!+/,"").replace(/!+$/,"")}function Ba(e){return Ta(Ds(e)).replace(/\*/g,"")}function Dp(e){return/[0-9@$!+*|#<]/.test(Ds(e))}function Pm(e){return Ds(e).length===1}function Tm(e){const t=Ds(e);return t.length<2||Dp(e)?!1:/^sh+$/.test(t)||Cm.has(t)}function Bm(e){let t="space";for(let n=0;n<e.length;n++){const s=e[n];if(!(s===" "||s==="	"||s===`
`||s==="\r")){if(s==="-"){t="hyphen";continue}return"punct"}}return t}function Rm(e){const t=[];let n=0,s="";for(;n<e.length;){if(!hi(e[n])){s+=e[n],n++;continue}let o=n+1;for(;o<e.length&&hi(e[o]);)o++;t.push({text:e.slice(n,o),gap:t.length===0?"start":Bm(s)}),s="",n=o}return t}function Am(e){const t=[Ta(e)];if(e.charAt(0)==="!"||e.charAt(e.length-1)==="!"){const n=e.replace(/^!+/,"").replace(/!+$/,"");n&&n!==e&&t.push(Ta(n))}return t}function Dm(e){for(let t=0;t<e.length;t++){if(!/^k+i+l+$/.test(e[t]))continue;const n=e[t+1]||"",s=e[t+2]||"";if(/^y+o+u+r+s+e+l+f+$/.test(n)||/^u+r+s+e+l+f+$/.test(n)||/^u+r+$/.test(n)&&/^s+e+l+f+$/.test(s))return!0}return!1}function Im(e,t,n){if(Ds(e[n].text)!=="coon")return!1;const s=n>0?t[n-1]:"",o=t[n+1]||"";return s==="maine"||o==="cat"}function Hm(e,t,n){return n===t+1&&e[n].gap==="space"&&/^a+$/.test(Ba(e[t].text))&&/^h+o+l+e+$/.test(Ba(e[n].text))}function Om(e,t,n){return Ds(e[n].text)!=="dyke"?!1:n>0&&Ds(e[n-1].text)==="van"}function Wm(e){for(let t=0;t<e.length-1;t++)if(/^h+e+i+l+$/.test(e[t])&&/^h+i+t+l+e+r+$/.test(e[t+1]))return!0;return!1}function Um(e,t=!0){const n=Em(e);if(Sm(n,t))return!0;const s=Rm(n),o=s.map(a=>Am(a.text)),i=s.map(a=>Ba(a.text));if(Dm(i)||t&&Wm(i))return!0;for(let a=0;a<o.length;a++)if(!(t&&(Im(s,i,a)||Om(s,i,a))))for(let r=0;r<o[a].length;r++){const l=xm(o[a][r]);for(let c=0;c<l.length;c++)if(fo(l[c].replace(/\*/g,""),t))return!0}for(let a=0;a<s.length;a++){let r="",l=0,c=!1,f=!1;for(let d=a;d<s.length&&d<a+8;d++){if(d>a){const g=s[d].gap,h=s[d-1].text;if(g==="punct"||g==="start"||h.endsWith("!")||s[d].text.startsWith("!")||g!=="space"&&g!=="hyphen")break}if(r+=Ba(s[d].text),Pm(s[d].text)&&l++,Tm(s[d].text)&&(c=!0),Dp(s[d].text)&&(f=!0),d!==a&&!(c&&l<2&&!f)&&fo(r,t)){if(t&&Hm(s,a,d))break;return!0}}}return!1}function Ip(e,t,n,s=!1){if(typeof e!="string")return{ok:!1,reason:"empty"};const o=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return o?o.length>t?{ok:!1,reason:"long"}:Um(o,!s)?{ok:!1,reason:n}:{ok:!0,text:o}:{ok:!1,reason:"empty"}}function Vm(e,t=Lc){return Ip(e,t,"words")}const mr={long:"That is a bit long!",link:"No links, please!",contact:"Keep numbers and contact info secret!",personal:"Keep personal info secret!",words:"Let's use kind words!",mail:"Oops, try different words!",empty:""},Hp={};for(const e of["АA","аa","ВB","вb","ЕE","еe","КK","кk","МM","мm","НH","нh","ОO","оo","РP","рp","СC","сc","ТT","тt","УY","уy","ХX","хx","ІI","іi","ЈJ","јj","ЅS","ѕs","ЁE","ёe","ЇI","їi","ΑA","ΕE","ΖZ","ΗH","ΙI","ΚK","ΜM","ΝN","ΟO","ΡP","ΤT","ΥY","ΧX","αa","εe","ζz","ιi","κk","νv","οo","ρp","τt","υu","χx"])Hp[e[0]]=e[1];function zm(e){let t="";for(const n of e)t+=Hp[n]??n;return t}function Qm(e){return zm(String(e).normalize("NFKC")).replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\p{M}]/gu,"").replace(/[\p{Extended_Pictographic}\p{S}\p{P}]+/gu,"").replace(/\s+/g," ").trim()}function qm(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(()=>{const e=[...new Set(om.map(t=>Qm(t)).filter(t=>t.length>=2))].sort((t,n)=>n.length-t.length);return new RegExp(`(^|[^A-Za-z])(?:${e.map(qm).join("|")})(?![A-Za-z])`,"gi")})();const jd=(e,t,n)=>typeof e=="number"&&Number.isFinite(e)?Math.max(t,Math.min(n,e)):null,Zm=(e,t,n=80)=>typeof e=="string"&&e.length<=n&&t.test(e)?e:null,Nm=/^#[0-9a-fA-F]{3,8}$/,Fm=["little","kid","adult"];function jm(e){if(!e||typeof e!="object")return null;const t={};for(const n of["skin","hair","shirt","pants"])if(n in e){const s=Zm(e[n],Nm,9);if(!s)return null;t[n]=s}if("hairStyle"in e){const n=jd(e.hairStyle,0,3);if(n===null)return null;t.hairStyle=Math.round(n)}if("acc"in e){const n=jd(e.acc,0,3);if(n===null)return null;t.acc=Math.round(n)}if("size"in e){if(!Fm.includes(e.size))return null;t.size=e.size}if("flip"in e){if(typeof e.flip!="boolean")return null;t.flip=e.flip}return"look2"in e&&(t.look2=xi(e.look2)??null),Object.keys(t).length?t:null}function Ci(e){const t=ts({id:"x"}),n=jm({skin:e?.skin,hair:e?.hair,hairStyle:e?.hairStyle,shirt:e?.shirt,pants:e?.pants,size:e?.size,acc:e?.acc})??{},s=i=>n[i]??t[i],o={skin:s("skin"),hair:s("hair"),hairStyle:s("hairStyle"),shirt:s("shirt"),pants:s("pants"),size:s("size"),acc:s("acc")};if(e&&typeof e=="object"&&"look2"in e){const i=xi(e.look2);i&&(o.look2=i)}return o}const Gd=4,Gm=["Mittens","Luna","Biscuit","Pumpkin","Whiskers","Mochi","Pepper","Noodle","Ginger","Socks"],Ym=["Buddy","Coco","Max","Daisy","Peanut","Rocket","Bella","Waffles","Scout","Honey"];function Op(e){const t=String(e??"").normalize("NFC").replace(/\s+/g," ").trim();return!/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u.test(t)||(t.match(/\d/g)??[]).length>2?null:bm(t).ok?t:null}function Km(e,t=[]){return Ip(e,zn,"mail")}function Wp(e){return typeof e.freeMail=="boolean"?e.freeMail:e.freeChat}const Ec=2900,Cl=[{kind:"swing",x:430,y:500},{kind:"swing",x:570,y:500},{kind:"blanket",x:1730,y:548},{kind:"blanket",x:1850,y:548},{kind:"bench",x:2025,y:512},{kind:"bench",x:2105,y:512},{kind:"bench",x:2225,y:512},{kind:"bench",x:2305,y:512}],he={top:{x:905,y:330},bottom:{x:1110,y:545},ladder:850},lt={x0:2440,x1:2840,y0:470,y1:585},Xm=(e,t)=>e.where===t.where&&(e.where!=="house"||e.houseId===t.houseId&&e.room===t.room),Jm=(e,t)=>Xm(e,t)&&Math.abs(e.x-t.x)<=cm&&Math.abs(e.y-t.y)<=dm;function Vi(e){try{return xc(e)}catch{return e}}const Sl=Nt("cozy-hood"),yo=()=>{try{return JSON.parse(localStorage.getItem(Sl)??"null")}catch{return null}},Cn=e=>{e?localStorage.setItem(Sl,JSON.stringify(e)):localStorage.removeItem(Sl)};function yr(){const e=new URLSearchParams(location.search).get("hood");return e?e.replace(/\/$/,""):"https://cozy-hood.andrewmunruh.workers.dev".replace(/\/$/,"")}async function e1(e){const t=await fetch(e+"/api/create",{method:"POST"});if(!t.ok)throw new Error("create failed "+t.status);return t.json()}async function t1(e,t){const n=await fetch(`${e}/api/hood/${encodeURIComponent(t)}`);if(n.status===429)return{slow:!0};if(!n.ok)throw new Error("lookup failed");return n.json()}const Yd=e=>e.type==="item/move"?"im:"+e.id:e.type==="char/move"?"cm:"+e.id:e.type==="item/size"?"is:"+("id"in e?e.id:""):null;class br{constructor(t){this.cfg=t,this.ws=null,this.pid="",this.settings={freeChat:!0},this.players=new Map,this.houses=new Map,this.presence=new Map,this.status="offline",this.speaksSit=!1,this.speaksBaby=!1,this.speaksAmb=!1,this.replaced=!1,this.ranch={plots:[],skew:0},this.tables=new Map,this.handlers=new Map,this.cid=1,this.flushT=0,this.presT=0,this.lastPres=null,this.presDirty=!1,this.closedByUs=!1,this.retry=0,this.retryT=0,this.epoch=0,this.stableT=0,this.outbox=[]}on(t,n){(this.handlers.get(t)??this.handlers.set(t,[]).get(t)).push(n)}emit(t,...n){this.handlers.get(t)?.forEach(s=>s(...n))}send(t){return this.ws?.readyState!==WebSocket.OPEN?!1:(this.ws.send(JSON.stringify(t)),!0)}reliable(t){this.send(t)||(t.t==="lock"?this.outbox=this.outbox.filter(n=>!(n.t==="lock"&&n.houseId===t.houseId)):(t.t==="look"||t.t==="dog")&&(this.outbox=this.outbox.filter(n=>n.t!==t.t)),this.outbox.push(t),this.outbox.length>8&&this.outbox.splice(0,this.outbox.length-8))}flushOutbox(){if(this.ws?.readyState!==WebSocket.OPEN||!this.outbox.length)return;const t=this.outbox;this.outbox=[];for(const n of t)this.send(n)||this.outbox.push(n)}scheduleRetry(){if(this.closedByUs||this.replaced||!this.cfg.token||this.retryT)return;const t=this.epoch,n=Math.min(15e3,400*2**Math.min(this.retry,6));this.retry++,this.retryT=window.setTimeout(()=>{this.retryT=0,!(t!==this.epoch||this.closedByUs||this.replaced||!this.cfg.token)&&this.connect()},n)}armStable(){this.stableT&&clearTimeout(this.stableT),this.stableT=window.setTimeout(()=>{this.stableT=0,this.retry=0},1e4)}clearStable(){this.stableT&&(clearTimeout(this.stableT),this.stableT=0)}connect(t){this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.closedByUs=!1,this.replaced=!1,this.status="connecting",this.emit("status",this.status);const n=this.ws;return new Promise(s=>{let o=!1;const i=r=>{o||(o=!0,s(r))},a=new WebSocket(this.cfg.url.replace(/^http/,"ws")+"/ws/"+encodeURIComponent(this.cfg.id??this.cfg.code));if(this.ws=a,n&&n!==a)try{n.close()}catch{}a.onopen=()=>{t&&!this.cfg.token?this.send({t:"join",...t,v:Gd,pet:1,mail:1,sit:1,fit:1,baby:1,amb:1}):this.cfg.token?this.send({t:"hello",token:this.cfg.token,v:Gd,pet:1,mail:1,sit:1,fit:1,baby:1,amb:1}):i("notoken")},a.onmessage=r=>{const l=JSON.parse(r.data);this.handle(l),l.t==="welcome"&&(this.armStable(),i("ok")),l.t==="error"&&i(l.code+(l.msg?":"+l.msg:"")),l.t==="removed"&&i("removed")},a.onclose=r=>{if(this.ws===a){if(this.clearStable(),this.ws=null,this.status="offline",i("closed"),r.code===4e3){this.replaced=!0,this.emit("status",this.status),this.emit("replaced");return}this.emit("status",this.status),this.scheduleRetry()}},a.onerror=()=>{}})}close(){this.closedByUs=!0,this.replaced=!1,this.epoch++,this.outbox=[],this.clearStable(),this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.presT&&(clearTimeout(this.presT),this.presT=0);try{this.ws?.close()}catch{}this.ws=null,this.status="offline",clearInterval(this.flushT)}handle(t){switch(t.t){case"joined":this.cfg.token=t.token,this.cfg.pid=t.pid,Cn(this.cfg);break;case"welcome":this.pid=t.pid,this.settings=t.settings,this.status="online",this.speaksSit=t.sit===1,this.speaksBaby=t.baby===1,this.speaksAmb=t.amb===1,this.players=new Map(t.players.map(n=>[n.pid,n]));{const n=this.houses;this.houses=new Map;for(const s of t.houses){const{state:o,...i}=s,a=n.get(s.id);this.houses.set(s.id,{meta:i,confirmed:Vi(o),pending:a?a.pending.filter(r=>!r.sent):[],view:null})}}this.presence=new Map(Object.entries(t.presence)),this.presence.delete(this.pid),t.ranch&&(this.ranch={plots:t.ranch.plots,skew:t.ranch.now-Date.now()});{const n=new Map;for(const s of t.tables??[])n.set(s.tb,this.stampTable(s));this.tables=n}clearInterval(this.flushT),this.flushT=window.setInterval(()=>this.flush(),60),this.lastPres&&(this.presDirty=!0),this.flushPres(),this.flushOutbox(),this.emit("welcome"),this.emit("status",this.status);break;case"act":{const n=this.houses.get(t.houseId);if(!n)return;n.confirmed=Sa(Vi(n.confirmed),t.action);const s=t.by===this.pid&&n.pending[0]?.cid===t.cid;s&&n.pending.shift(),n.view=null,s||this.emit("act",t.houseId,t.action);break}case"nack":{const n=this.houses.get(t.houseId);if(!n)return;n.pending=n.pending.filter(s=>s.cid!==t.cid),t.state&&(n.confirmed=Vi(t.state)),n.view=null,this.emit("reset",t.houseId,t.reason);break}case"pres":t.pid!==this.pid&&(t.p?this.presence.set(t.pid,t.p):this.presence.delete(t.pid),this.emit("pres",t.pid));break;case"players":this.players=new Map(t.players.map(n=>[n.pid,n])),this.emit("players");break;case"house":{const{state:n,...s}=t.house;this.houses.set(s.id,{meta:s,confirmed:Vi(n),pending:[],view:null}),this.emit("houses");break}case"houseMeta":{const n=this.houses.get(t.meta.id);n&&(n.meta=t.meta,this.emit("houses"),this.emit("houseMeta",t.meta.id));break}case"houseGone":this.houses.delete(t.houseId),this.emit("houses"),this.emit("houseGone",t.houseId);break;case"settings":this.settings=t.settings,this.emit("settings");break;case"bubble":this.emit("bubble",t.pid,t.b);break;case"fx":this.emit("fx",t.pid,t.fx);break;case"ranch":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch");break;case"ranchFail":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch"),this.emit("ranchFail",t.reason);break;case"noride":this.emit("noride",t.ride);break;case"table":{const n=this.stampTable(t.table);this.tables.set(n.tb,n),this.emit("table",n);break}case"tblFail":this.emit("tblFail",t.tb,t.reason);break;case"sayFail":this.emit("sayFail",t.reason);break;case"mailbox":{const n=this.houses.get(t.houseId);if(!n)return;if(t.mailbox?.letters?.length)n.confirmed={...n.confirmed,mailbox:t.mailbox};else{const{mailbox:s,...o}=n.confirmed;n.confirmed=o}n.view=null,this.emit("mailbox",t.houseId);break}case"mailFail":this.emit("mailFail",t.reason);break;case"parentInfo":this.emit("parentInfo",t);break;case"error":this.emit("error",t.code),t.code==="badtoken"&&(this.cfg.token=void 0,this.cfg.pid=void 0,Cn(this.cfg));break;case"removed":this.closedByUs=!0,this.emit("removed");break}}stampTable(t){const n=this.tables.get(t.tb),s=n&&n.away===t.away&&n.receivedAt?n.receivedAt:Date.now();return{...t,receivedAt:s}}view(t){const n=this.houses.get(t);return n?n.view??=n.pending.reduce((s,o)=>Sa(s,o.action),n.confirmed):null}myHouseId(){return this.players.get(this.pid)?.houseId??""}canEdit(t){const n=this.houses.get(t);return!!n&&(!n.meta.locked||n.meta.ownerId===this.pid)}dispatch(t,n){const s=this.houses.get(t);if(!s)return;const o=Yd(n),i=s.pending[s.pending.length-1];o&&i&&!i.sent&&Yd(i.action)===o?i.action=n:s.pending.push({cid:this.cid++,action:n,sent:!1}),s.view=null}flush(){for(const[t,n]of this.houses)for(const s of n.pending)!s.sent&&this.send({t:"act",houseId:t,cid:s.cid,action:s.action})&&(s.sent=!0);this.flushPres()}setPresence(t){this.lastPres=t,this.presDirty=!0,this.presT||this.flushPres()}flushPres(){if(!(!this.presDirty||!this.lastPres)){if(!this.send({t:"pres",p:this.lastPres})){!this.closedByUs&&!this.presT&&(this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90));return}this.presDirty=!1,this.presT&&clearTimeout(this.presT),this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90)}}myPresence(){return this.lastPres}say(t){this.reliable({t:"say",b:t})}lock(t,n){this.reliable({t:"lock",houseId:t,locked:n})}setLook(t){this.reliable({t:"look",look:t});const n=this.players.get(this.pid);n&&(n.look=t)}setDog(t){this.reliable({t:"dog",dog:t});const n=this.players.get(this.pid);n&&(n.dog=t)}fx(t){this.reliable({t:"fx",fx:t})}ranchOp(t){this.reliable({t:"ranch",o:t})}tbl(t){this.reliable({t:"tbl",...t})}sendMail(t,n,s,o){this.reliable({t:"mail",op:"send",houseId:t,text:n,color:s,sticker:o})}readMail(t,n){this.reliable({t:"mail",op:"read",houseId:t,id:n})}dropMail(t,n){this.reliable({t:"mail",op:"drop",houseId:t,id:n})}now(){return Date.now()+this.ranch.skew}parent(t){this.cfg.parentKey&&this.reliable({t:"parent",key:this.cfg.parentKey,...t})}}function n1(e,t,n,s="living"){let o=s;const i=[],a=()=>({...e.view(t),currentRoom:o,soundOn:n.get()}),r=l=>{if(e.houses.has(t)){const c=a();i.forEach(f=>f(c,l))}};return e.on("act",(l,c)=>{l===t&&r(c)}),e.on("reset",l=>{l===t&&r({type:"game/reset"})}),{houseId:t,get:a,subscribe(l){i.push(l)},dispatch(l){if(l.type==="room/switch")o=l.room;else if(l.type==="settings/sound")n.set(l.on);else{if(l.type==="game/reset")return;if(!e.canEdit(t)||l.type.startsWith("baby/")&&!e.speaksBaby||l.type==="item/power"&&!e.speaksAmb)return;e.dispatch(t,l)}r(l)}}}const et="#5a3d5c",ie=`stroke="${et}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,Pl=[{name:"Tabby",body:"#ffb26b",stripe:"#e8893a",belly:"#ffe3c4"},{name:"Smokey",body:"#b9b6c9",stripe:"#8f8ba3",belly:"#ecebf3"},{name:"Tuxedo",body:"#4f4660",stripe:"",belly:"#ffffff"},{name:"Calico",body:"#fff6ec",stripe:"",belly:"#fff6ec"}],Tl=[{name:"Pup",body:"#f2d0a4",ear:"#b07d54",snout:"#fbe7cc"},{name:"Poodle",body:"#fff0f6",ear:"#ffc8dd",snout:"#fff7fb"},{name:"Dachshund",body:"#c07a45",ear:"#7d4a26",snout:"#d99a68"},{name:"Golden",body:"#f4b860",ear:"#e09a3e",snout:"#fbd9a0"},{name:"Spotty",body:"#ffffff",ear:"#4a3f52",snout:"#ffffff"}],s1=(e,t,n,s=!1)=>s?`<path d="M${e-3} ${n} q3 3 6 0 M${t-3} ${n} q3 3 6 0" fill="none" ${ie} stroke-width="2.5"/>`:`<circle cx="${e}" cy="${n}" r="2.8" fill="${et}"/><circle cx="${t}" cy="${n}" r="2.8" fill="${et}"/><circle cx="${e+.9}" cy="${n-.9}" r=".9" fill="#fff"/><circle cx="${t+.9}" cy="${n-.9}" r=".9" fill="#fff"/>`,Bl=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>`;function bo(e,t="stand"){const n=Pl[e]??Pl[0],s="#ffb3c6",o=(i,a,r,l)=>`
    <path d="M${i-13} ${a-8} L${i-10} ${a-25} L${i-1} ${a-13} Z" fill="${n.body}" ${ie}/><path d="M${i-10.5} ${a-11} L${i-9.5} ${a-20} L${i-4} ${a-13} Z" fill="${s}"/>
    <path d="M${i+1} ${a-13} L${i+11} ${a-26} L${i+13} ${a-7} Z" fill="${e===3?"#f4a259":n.body}" ${ie}/><path d="M${i+4} ${a-13} L${i+10} ${a-21} L${i+11} ${a-11} Z" fill="${s}"/>
    <circle cx="${i}" cy="${a}" r="${r}" fill="${n.body}" ${ie}/>
    ${e===3?`<path d="M${i+2} ${a-r+1} a${r} ${r} 0 0 1 ${r-3} ${r-2} q-6 2 -${r-3} -${r-3}z" fill="#f4a259"/>`:""}
    ${e===2?`<ellipse cx="${i+2}" cy="${a+7}" rx="9" ry="7" fill="#fff"/>`:""}
    ${n.stripe?`<path d="M${i-4} ${a-r+2} v5 M${i+2} ${a-r+1} v6 M${i+8} ${a-r+3} v4" ${ie} stroke="${n.stripe}" stroke-width="2.5"/>`:""}
    ${s1(i-4,i+7,a,l)}
    <path d="M${i+3} ${a+4} l-2.5 -2 h5 z" fill="#ff8fab"/><path d="M${i+.5} ${a+6} q2.5 2.5 5 0" fill="none" ${ie} stroke-width="2"/>
    ${Bl(i-8,a+5)}${Bl(i+12,a+5)}
    <path d="M${i+r-2} ${a+3} l9 -2 M${i+r-2} ${a+6} l9 2" ${ie} stroke-width="1.6"/>`;return t==="nap"?`<svg viewBox="0 0 120 100" class="catsvg nap">
    <g class="breathe"><path class="tail" d="M28 84 Q22 96 64 94" fill="none" stroke="${et}" stroke-width="11" stroke-linecap="round"/><path d="M28 84 Q22 96 64 94" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="76" rx="36" ry="18" fill="${n.body}" ${ie}/>
    ${e===3?'<ellipse cx="44" cy="72" rx="12" ry="8" fill="#f4a259"/><ellipse cx="66" cy="70" rx="9" ry="6" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 62 q3 6 0 12 M56 61 q3 6 0 12 M68 62 q3 6 0 11" fill="none" ${ie} stroke="${n.stripe}" stroke-width="3"/>`:""}
    ${o(90,76,15,!0)}</g></svg>`:t==="sit"?`<svg viewBox="0 0 120 100" class="catsvg sit">
    <path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${et}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="70" rx="20" ry="25" fill="${n.body}" ${ie}/>
    <ellipse cx="70" cy="74" rx="10" ry="15" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="54" cy="66" rx="9" ry="12" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M50 60 q5 2 4 8 M49 72 q5 2 4 8" fill="none" ${ie} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect x="62" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${ie}/><rect x="74" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${ie}/>
    ${e===2?'<ellipse cx="66.5" cy="93" rx="4" ry="2.5" fill="#fff"/><ellipse cx="78.5" cy="93" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(72,36,17,!1)}</svg>`:`<svg viewBox="0 0 120 100" class="catsvg stand">
    <path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${et}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <rect class="leg b" x="34" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${ie}/><rect class="leg a" x="74" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${ie}/>
    <ellipse cx="58" cy="58" rx="32" ry="17" fill="${n.body}" ${ie}/>
    <ellipse cx="64" cy="66" rx="20" ry="7" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="46" cy="52" rx="12" ry="9" fill="#f4a259"/><ellipse cx="68" cy="50" rx="9" ry="7" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 43 q3 6 0 12 M56 42 q3 6 0 12 M68 43 q3 6 0 11" fill="none" ${ie} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect class="leg a" x="44" y="64" width="9" height="30" rx="4.5" fill="${n.body}" ${ie}/><rect class="leg b" x="84" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${ie}/>
    ${e===2?'<ellipse cx="48.5" cy="92" rx="4" ry="2.5" fill="#fff"/><ellipse cx="88.5" cy="92" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(90,40,17,!1)}</svg>`}function ui(e,t="stand"){const n=Tl[e]??Tl[0],s=t==="sleep",o=e===2,i=e===1,a=e===3,r=e===4,l=o?66:58,c=o?70:62,f=94-c,d=o?102:92,g=o?50:40,h=(x,A)=>i?`<rect class="leg ${A}" x="${x+2}" y="${c}" width="6" height="${f}" rx="3" fill="${n.body}" ${ie}/><circle class="leg ${A}" cx="${x+5}" cy="91" r="6" fill="${n.body}" ${ie}/>`:`<rect class="leg ${A}" x="${x}" y="${c}" width="10" height="${f}" rx="5" fill="${n.body}" ${ie}/>`,m=i?`<circle cx="44" cy="58" r="15" fill="${n.body}" ${ie}/><circle cx="70" cy="56" r="17" fill="${n.body}" ${ie}/><ellipse cx="57" cy="58" rx="22" ry="12" fill="${n.body}"/>`:`<ellipse cx="${o?62:58}" cy="${l}" rx="${o?42:32}" ry="${o?13:17}" fill="${n.body}" ${ie}/>`,k=r?`<circle cx="46" cy="54" r="5" fill="${et}"/><circle cx="64" cy="62" r="4" fill="${et}"/><circle cx="72" cy="50" r="3.5" fill="${et}"/><circle cx="38" cy="64" r="3" fill="${et}"/>`:"",_=i?`<g class="tail"><path d="M30 52 L22 38" ${ie}/><circle cx="21" cy="34" r="7" fill="${n.body}" ${ie}/></g>`:a?`<path class="tail" d="M30 52 Q10 50 14 30 Q20 40 30 46" fill="${n.body}" ${ie}/>`:`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${et}" stroke-width="9" stroke-linecap="round"/>`,y=!i&&!a?`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`:"",u=`
    ${i?`<circle cx="${d-2}" cy="${g-16}" r="10" fill="${n.body}" ${ie}/>`:""}
    <circle cx="${d}" cy="${g}" r="17" fill="${n.body}" ${ie}/>
    ${r?`<circle cx="${d-6}" cy="${g-8}" r="4" fill="${et}"/>`:""}
    <ellipse cx="${d+13}" cy="${g+7}" rx="11" ry="8" fill="${n.snout}" ${ie}/>
    <circle cx="${d+22}" cy="${g+4}" r="4" fill="${et}"/>
    <path d="M${d+14} ${g+12} q4 3 8 0" fill="none" ${ie} stroke-width="2"/>
    ${s?"":`<path class="tongue" d="M${d+16} ${g+13} q2 7 6 0" fill="#ff8fab" ${ie} stroke-width="2"/>`}
    ${s?`<path d="M${d+2} ${g-4} q3 3 6 0" fill="none" ${ie} stroke-width="2.4"/>`:`<circle cx="${d+5}" cy="${g-3}" r="3" fill="${et}"/><circle cx="${d+6}" cy="${g-4}" r="1" fill="#fff"/>`}
    ${Bl(d+2,g+8)}
    ${i?`<circle cx="${d-9}" cy="${g+8}" r="9" fill="${n.ear}" ${ie}/>`:`<ellipse class="ear" cx="${d-9}" cy="${g+4}" rx="7" ry="${a||o?14:12}" fill="${n.ear}" ${ie} transform="rotate(12 ${d-9} ${g+4})"/>`}
    <path d="M${d-12} ${g+14} q10 6 20 2" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/><circle cx="${d-1}" cy="${g+19}" r="3" fill="#ffd166" ${ie} stroke-width="1.5"/>`,v=i?`<g class="tail"><path d="M42 86 L28 80" ${ie}/><circle cx="25" cy="78" r="7" fill="${n.body}" ${ie}/></g>`:`<path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${et}" stroke-width="9" stroke-linecap="round"/><path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`;return t==="sit"||t==="sleep"?`<svg viewBox="0 0 130 100" class="dogsvg ${s?"sleep":"sit"}">${v}
    <ellipse cx="60" cy="70" rx="22" ry="24" fill="${n.body}" ${ie}/>${r?`<circle cx="54" cy="66" r="5" fill="${et}"/><circle cx="64" cy="80" r="4" fill="${et}"/>`:""}
    ${h(62,"a")}${h(74,"b")}<g transform="translate(-22 -2)">${u}</g></svg>`:`<svg viewBox="0 0 130 100" class="dogsvg stand">${_}${y}
    ${h(o?30:34,"b")}${h(o?82:72,"a")}
    ${m}${k}
    ${h(o?42:46,"a")}${h(o?94:84,"b")}
    ${u}</svg>`}const Up=e=>{let t=2166136261;for(const n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0},ys=(e,t)=>{let n=(e^Math.imul(t,2654435761))>>>0;return n^=n>>>15,n=Math.imul(n,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296},Kd=18,o1={1:.35,2:.6};function i1(e,t,n){return e-t*o1[n]}function a1(e,t){const s=Math.floor(t/1e3/2.8);return ys(Up(e||"pup"),s)<.62?"rest":"peek"}function r1(e,t,n,s,o=!1){const i=Up(e.name+":"+e.coat+":"+e.room+":"+Math.round(e.x)+(n?":t"+Math.round(n.x):"")),a=t/1e3,r=Math.floor(a/Kd),l=a-r*Kd;if(!n){const y=le=>Math.max(160,Math.min(2240,e.x+(ys(i,le)-.5)*760)),u=y(r-1);let v=y(r);const x=ys(i+7,r),A=x<.45?"nap":x<.75?"sit":"groom",O=!!(s&&A==="nap"&&ys(i+13,r)<.72);O&&s&&(v=Math.max(160,Math.min(2240,s.x)));const H=Math.abs(v-u),X=Math.min(5,H/110);return l<X&&!o?{x:u+(v-u)*(l/X),mood:"walk",flip:v<u,perch:0,curl:0}:{x:v,mood:A,flip:v<u,perch:0,curl:O?1:0}}const c=Math.max(160,Math.min(2240,n.x)),f=ys(i+5,r)<.45?2:1,d=Math.max(160,Math.min(2240,c+(ys(i,r)-.5)*420)),g=Math.abs(c-d),h=Math.min(4.2,Math.max(.6,g/160)),m=c<d;if(l<h&&!o)return{x:d+(c-d)*(l/h),mood:"walk",flip:m,perch:0,curl:0};const k=ys(i+11,r),_=k<.34?"nap":k<.67?"sit":"play";return{x:c,mood:_,flip:m,perch:f,curl:0}}const Ra="#5a3d5c",Ae=`stroke="${Ra}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,Ao=[`<svg viewBox="0 0 48 48"><path d="M24 40 C16 32 6 26 10 16 C14 8 24 12 24 20 C24 12 34 8 38 16 C42 26 32 32 24 40 Z" fill="#ff6b9a" ${Ae}/></svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd166" ${Ae}/></svg>`,`<svg viewBox="0 0 48 48"><circle cx="24" cy="22" r="6" fill="#ff8fab" ${Ae}/>${[0,60,120,180,240,300].map(e=>`<circle cx="${24+Math.cos(e*Math.PI/180)*12}" cy="${22+Math.sin(e*Math.PI/180)*12}" r="5" fill="#ffd166" ${Ae}/>`).join("")}<path d="M24 34 V44" ${Ae}/></svg>`,`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="10" fill="#ffb26b" ${Ae}/><circle cx="34" cy="20" r="8" fill="#ffc46b" ${Ae}/><path d="M28 14 L30 6 L36 14" fill="#ffb26b" ${Ae}/><circle cx="32" cy="19" r="1.4" fill="${Ra}"/><circle cx="37" cy="19" r="1.4" fill="${Ra}"/></svg>`,`<svg viewBox="0 0 48 48">${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M8 ${30-t*4} Q24 ${10-t*3} 40 ${30-t*4}" fill="none" stroke="${e}" stroke-width="4"/>`).join("")}</svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l3 10 10 1 -8 6 3 10 -8 -5 -8 5 3 -10 -8 -6 10 -1z" fill="#fff3b0" ${Ae}/><circle cx="12" cy="34" r="3" fill="#ff8fab" ${Ae}/><circle cx="36" cy="36" r="2.4" fill="#bde0fe" ${Ae}/></svg>`];function Xd(e){const t=e?`<g class="flag"><path d="M30 16 V6" ${Ae}/><path d="M30 6 H42 L38 11 L42 16 H30 Z" fill="#ff6b6b" ${Ae}/></g>`:`<g class="flag"><path d="M18 28 H28" ${Ae}/><path d="M18 22 H28 L25 25 L28 28 H18 Z" fill="#ffd166" ${Ae}/></g>`;return`<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="68" rx="18" ry="3" fill="#000" opacity=".12"/>
    <rect x="30" y="40" width="5" height="26" rx="2" fill="#c99366" ${Ae}/>
    <path d="M8 40 V22 Q8 8 32 8 Q56 8 56 22 V40 Z" fill="#8ecae6" ${Ae}/>
    <path d="M8 28 H56" ${Ae}/>
    <rect x="14" y="32" width="36" height="16" rx="4" fill="#fff6e6" ${Ae}/>
    <circle cx="32" cy="40" r="3" fill="${Ra}"/>
    ${t}
  </svg>`}function l1(e,t=[]){const n=Km(e,t);return n.ok?{ok:!0,text:n.text}:{ok:!1,msg:n.reason==="empty"?"Write a little note!":mr[n.reason]||"Oops, try different words!"}}const c1={...mr,empty:"Write a little note!",slow:"Let's wait a moment!",full:"This mailbox is full!",notyours:"Only she can open her mail.",nohouse:"That house is not on the street.",gone:"That letter is already gone.",toobig:"The mailbox is too full!",presetsOnly:"Typing is turned off: pick a phrase!",unread:"She still has your letters! Wait until she reads them."};function d1(e){return c1[e]||"Let's try that again!"}function f1(e){let t="",n="",s=!1,o="",i=0,a=0,r=-1,l="",c="";const f=()=>document.getElementById("mailCue");f()?.addEventListener("click",()=>{e.openOwn()});function d(){t="",n="",document.getElementById("mailSheet")?.remove()}function g(){let y=document.getElementById("mailSheet");return y||(y=document.createElement("div"),y.id="mailSheet",y.className="sheet mailSheet",y.innerHTML='<div class="card" id="mailCard"></div>',document.body.appendChild(y),y.addEventListener("click",u=>{const v=u.target;if(v===y||v.closest('[data-m="close"]')){d();return}m(v)}),y.addEventListener("input",u=>{const v=u.target;if(v.id!=="mailText")return;const x=document.getElementById("mailCount");x&&(x.textContent=`${v.value.length}/${zn}`)})),y}function h(){if(!t)return;const y=g().querySelector("#mailText")?.value??"",u=e.mine(t),v=e.lettersOf(t),x=e.houseName(t),A=g().querySelector("#mailCard");if(n&&u&&!s){const H=v.find(X=>X.id===n);if(H&&H.text){k(H);return}n=""}if(s||!u){const H=e.freeType(),X=o?`Reply to ${e.houseName(o)||"your friend"}`:u?"Leave a letter":`Letter for ${x}`,le=H?`<textarea id="mailText" class="mailBox" maxlength="${zn}" placeholder="Hi! Come play!"></textarea>
        <div class="mailCount" id="mailCount">0/${zn}</div>`:`<h3>Phrase</h3><div class="phrases mailPhrases">${ti.map((G,fe)=>`<button type="button" data-phrase="${fe}" class="${fe===r?"on":""}">${pt(G)}</button>`).join("")}</div>`;A.innerHTML=`<button class="close" data-m="close">✕</button><h2>${pt(X)}</h2>
        <p class="hint">${H?"A short note. Your name goes on it for you.":"Pick a phrase. Your name goes on it for you."}</p>
        ${le}
        <h3>Paper</h3><div class="mailRow">${An.map((G,fe)=>`<button class="swatch ${fe===i?"on":""}" data-color="${fe}" style="background:${G}" aria-label="Paper ${fe+1}"></button>`).join("")}</div>
        <h3>Sticker</h3><div class="mailRow">${Ao.slice(0,kp).map((G,fe)=>`<button class="stick ${fe===a?"on":""}" data-sticker="${fe}" aria-label="Sticker ${fe+1}">${G}</button>`).join("")}</div>
        ${l?`<p class="mailErr" id="mailErr">${pt(l)}</p>`:""}
        <button class="mailSend" id="mailSend" type="button">Send</button>
        ${u&&v.length?'<button class="mailRow" data-act="back" type="button" style="margin-top:8px">Back to my mail</button>':""}`;const ce=g().querySelector("#mailText");if(ce&&y){ce.value=y;const G=document.getElementById("mailCount");G&&(G.textContent=`${y.length}/${zn}`)}return}const O=v.length?v.slice().reverse().map(H=>H.text?`<button type="button" class="letter ${H.read?"":"fresh"}" data-letter="${pt(H.id)}" style="background:${An[H.color]??An[0]}">
        <span class="sticker">${Ao[H.sticker]??Ao[0]}</span>
        <span class="who">${pt(H.from)}</span><span class="when">${pt(qr(H.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${Ae}/><path d="M4 8 L40 24 L76 8" fill="${An[H.color]??"#fff"}" ${Ae}/></svg>
      </button>`:`<div class="letter" style="background:${An[H.color]??An[0]}"><span class="who">Your letter</span><span class="when">${pt(qr(H.at))}</span><span class="statusChip ${H.read?"read":""}">${H.read?"Read":"Delivered"}</span></div>`).join(""):'<p class="hint">No letters yet. Your flag pops up when one arrives!</p>';A.innerHTML=`<button class="close" data-m="close">✕</button><h2>${pt(x)} mailbox</h2>${O}
      <div class="mailRow"><button type="button" data-act="write">Write a letter</button></div>
      ${l?`<p class="mailErr">${pt(l)}</p>`:""}`}function m(y){const u=y.closest(".mailPhrases [data-phrase]");if(u){r=+u.dataset.phrase,l="",h();return}const v=y.closest("[data-color]");if(v){i=+v.dataset.color,h();return}const x=y.closest("[data-sticker]");if(x){a=+x.dataset.sticker,h();return}if(y.closest("#mailSend"))return _();const A=y.closest("[data-act]")?.dataset.act;if(A==="write"){s=!0,o="",n="",l="",h();return}if(A==="back"){s=!1,o="",n="",l="",h();return}if(A==="reply"){const ce=e.houseOf(y.closest("[data-from]")?.dataset.from??"");if(!ce){e.toast("They are not on the street anymore.");return}o=ce,s=!0,n="",l="",t=ce,h();return}if(A==="drop"){const ce=y.closest("[data-id]")?.dataset.id??"";if(c!==ce){c=ce,e.toast("Tap again to throw it away");return}c="",e.drop(t,ce);return}const O=y.closest("[data-letter]");if(!O)return;const H=O.dataset.letter,le=e.lettersOf(t).find(ce=>ce.id===H);le&&(!e.mine(t)||!le.text||(le.read||e.read(t,H),n=H,k(le)))}function k(y){const u=p1(y.text),v=g().querySelector("#mailCard");v.innerHTML=`<button class="close" data-m="close">✕</button>
      <div class="letter open read" style="background:${An[y.color]??An[0]}" data-id="${pt(y.id)}" data-from="${pt(y.fromPid)}">
        <span class="sticker">${Ao[y.sticker]??Ao[0]}</span>
        <span class="who">${pt(y.from)}</span><span class="when">${pt(qr(y.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${Ae}/><path class="flap" d="M4 8 L40 24 L76 8" fill="#fff" ${Ae}/></svg>
        <p class="words">${pt(u??"")}</p>
        <span class="mailRow"><button type="button" data-act="reply">Reply</button><button type="button" class="throw" data-act="drop">${c===y.id?"Tap again":"Throw away"}</button></span>
      </div>
      <button type="button" data-act="back">All my mail</button>
      ${l?`<p class="mailErr">${pt(l)}</p>`:""}`}function _(){let y="";if(e.freeType()){const v=g().querySelector("#mailText")?.value??"",x=l1(v);if(!x.ok){l=x.msg,h();const A=g().querySelector("#mailText");A&&(A.value=v);return}y=x.text}else{if(r<0||r>=ti.length){l="Pick a phrase!",h();return}y=ti[r]}const u=o||t;l="",e.send(u,y,i,a),e.toast("On its way!"),e.mine(u)?(s=!1,o="",t=u,h()):d()}return{open(y,u,v,x){t=y,n="",s=!v,o="",l="",c="",i=0,a=0,r=-1,h()},fail(y){l=d1(y),t?h():e.toast(l)},refresh(){t&&h()},syncCue(y){f()?.classList.toggle("show",y)}}}function p1(e){if(!e)return null;const t=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return!t||t.length>zn?null:t}function pt(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const Vp=()=>Nt("cozy-play");function g1(){try{return localStorage.getItem(Vp())==="play"?"play":"decorate"}catch{return"decorate"}}function h1(e){try{localStorage.setItem(Vp(),e)}catch{}}function u1(e){return e==="kennel"?"kennel":e==="cat-tower"?"tower":e==="yard-swing"?"swing":e==="lamp"||/(^|:)lamp|starlamp|light/.test(e)?"lamp":e==="fridge"||e==="stove"||e==="vanity"||e==="bookshelf"||e==="window"||e==="mirror"||e==="tv"||/fridge|stove|cabinet|drawer|vanity/.test(e)?"open":Fs(e)?"sit":"wiggle"}const m1='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M34 8 l1.2 3 3 .4 -2.2 2 .6 3 -2.6-1.6 -2.6 1.6 .6-3 -2.2-2 3-.4z" fill="#ffd166" stroke="#5a3d5c" stroke-width="1.4"/></svg>',y1='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 36 h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M8 14 l2 1 M40 34 l2 2 M8 40 l3 -1" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>';function b1(e,t){let n="decorate";const s=e.querySelector("#modePlay"),o=e.querySelector("#modeDecorate");s.querySelector(".modeIco").innerHTML=m1,o.querySelector(".modeIco").innerHTML=y1;const i=()=>{const c=n==="play";document.body.classList.toggle("mode-play",c),s.classList.toggle("on",c),o.classList.toggle("on",!c),s.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-pressed",c?"false":"true")},a=(c,f)=>{n=c,f&&h1(c),i(),t.onChange?.()};e.addEventListener("pointerdown",c=>c.stopPropagation()),e.addEventListener("click",c=>{const f=c.target.closest("[data-mode]");if(!f)return;const d=f.dataset.mode==="play"?"play":"decorate";a(d,t.ownHouse())}),i();let r=!1;return{mode:()=>n,isPlay:()=>n==="play",sync(c){a(c?g1():"play",!1)},hint:()=>{if(r||!document.body.classList.contains("phone"))return;const c=Nt("cozy-mode-hint");try{if(localStorage.getItem(c)){r=!0;return}}catch{r=!0;return}r=!0;const f=document.createElement("p");f.className="modeHint",f.textContent="Play: tap things! Decorate: move things!",e.appendChild(f);let d=!1;const g=()=>{if(!d){d=!0,f.remove(),window.removeEventListener("pointerdown",g);try{localStorage.setItem(c,"1")}catch{}}};window.setTimeout(g,2800),f.addEventListener("click",g),window.addEventListener("pointerdown",g)}}}const zp=new Map;let Qp=!1;function ko(){return Qp}function k1(e){Qp=e}function Is(e){return zp.get(e)}function w1(e,t){zp.set(e,t)}const v1=!0;let zi=null;function _1(e){const t=new URLSearchParams(e.replace(/^\?/,"")).get("art");t==="v1"?zi=!1:t==="v2"?zi=!0:zi=null;const n=zi??v1;return k1(n),n}const Aa=Object.assign({"../../assets/art/any/armchair.webp":()=>p(()=>import("./armchair-BAjEKZT-.js"),[]).then(e=>e.default),"../../assets/art/any/ball.webp":()=>p(()=>import("./ball-D1B5vbct.js"),[]).then(e=>e.default),"../../assets/art/any/balloon.webp":()=>p(()=>import("./balloon-5CQ1ji1d.js"),[]).then(e=>e.default),"../../assets/art/any/bookshelf.webp":()=>p(()=>import("./bookshelf-BCCk-QJS.js"),[]).then(e=>e.default),"../../assets/art/any/chair.webp":()=>p(()=>import("./chair-BxTP5f1M.js"),[]).then(e=>e.default),"../../assets/art/any/clock.webp":()=>p(()=>import("./clock-D_q2KVbT.js"),[]).then(e=>e.default),"../../assets/art/any/lamp.webp":()=>p(()=>import("./lamp-BOWZQ_df.js"),[]).then(e=>e.default),"../../assets/art/any/picture.webp":()=>p(()=>import("./picture-DsR0Jovx.js"),[]).then(e=>e.default),"../../assets/art/any/plant.webp":()=>p(()=>import("./plant-xO8tOsUj.js"),[]).then(e=>e.default),"../../assets/art/any/rug.webp":()=>p(()=>Promise.resolve().then(()=>fM),void 0).then(e=>e.default),"../../assets/art/any/sofa.webp":()=>p(()=>import("./sofa-DqtVZLgl.js"),[]).then(e=>e.default),"../../assets/art/any/table.webp":()=>p(()=>import("./table-CaJl95Y4.js"),[]).then(e=>e.default),"../../assets/art/any/tv.webp":()=>p(()=>import("./tv-10oa_PoM.js"),[]).then(e=>e.default),"../../assets/art/any/window.webp":()=>p(()=>import("./window-jtnOMij-.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-mat.webp":()=>p(()=>import("./bath-mat-DLlrRePN.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-mirror.webp":()=>p(()=>import("./bath-mirror-4OfFj8EV.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-stool.webp":()=>p(()=>import("./bath-stool-DqJM8fLh.js"),[]).then(e=>e.default),"../../assets/art/bathroom/bath-toilet.webp":()=>p(()=>import("./bath-toilet-C2nhunlA.js"),[]).then(e=>e.default),"../../assets/art/bathroom/laundry-hamper.webp":()=>p(()=>import("./laundry-hamper-0OQZcXyH.js"),[]).then(e=>e.default),"../../assets/art/bathroom/rubber-ducky.webp":()=>p(()=>import("./rubber-ducky-pwUm0Pe4.js"),[]).then(e=>e.default),"../../assets/art/bathroom/shower-curtain.webp":()=>p(()=>import("./shower-curtain-UCHNbYT7.js"),[]).then(e=>e.default),"../../assets/art/bathroom/sink-vanity.webp":()=>p(()=>import("./sink-vanity-aUbm9Mix.js"),[]).then(e=>e.default),"../../assets/art/bathroom/soaking-tub.webp":()=>p(()=>import("./soaking-tub-C07Kgt8P.js"),[]).then(e=>e.default),"../../assets/art/bathroom/soap-dish.webp":()=>p(()=>import("./soap-dish-Duoeh42V.js"),[]).then(e=>e.default),"../../assets/art/bathroom/towel-bar.webp":()=>p(()=>import("./towel-bar-fU4SDA3M.js"),[]).then(e=>e.default),"../../assets/art/bedroom/bed.webp":()=>p(()=>import("./bed-CKbzIr1E.js"),[]).then(e=>e.default),"../../assets/art/bedroom/mirror.webp":()=>p(()=>import("./mirror-D5FvkWJA.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~alarm-clock.webp":()=>p(()=>import("./pack~alarm-clock-B1MKtcYc.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bedtime-snack.webp":()=>p(()=>import("./pack~bedtime-snack-CQHBbXTE.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~big-monitor.webp":()=>p(()=>import("./pack~big-monitor-DnY9RO7w.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~big-wardrobe.webp":()=>p(()=>import("./pack~big-wardrobe-DKmYluKF.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~book-stack.webp":()=>p(()=>import("./pack~book-stack-DgPlZ9_3.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bubble-bath.webp":()=>p(()=>import("./pack~bubble-bath-CP64sVml.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bunk-bed.webp":()=>p(()=>import("./pack~bunk-bed-D-NM_ktx.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~bunny-slippers.webp":()=>p(()=>import("./pack~bunny-slippers-I8r5WVZt.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~canopy-bed.webp":()=>p(()=>import("./pack~canopy-bed-BpoysMK9.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cat-bed.webp":()=>p(()=>import("./pack~cat-bed-BAS6-rN0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~caterpillar-plush.webp":()=>p(()=>import("./pack~caterpillar-plush-CEbFuatX.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-canopy-daybed.webp":()=>p(()=>import("./pack~cc-canopy-daybed-DoE44IXz.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-cloud-beanbag.webp":()=>p(()=>import("./pack~cc-cloud-beanbag-D0qNEg32.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-cloud-lamp.webp":()=>p(()=>import("./pack~cc-cloud-lamp-DIDpxlMU.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-fairy-garland.webp":()=>p(()=>import("./pack~cc-fairy-garland-CEQT4GTj.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-heart-bed.webp":()=>p(()=>import("./pack~cc-heart-bed-BupJOayJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-jewel-box.webp":()=>p(()=>import("./pack~cc-jewel-box-C-vIsXue.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-reading-nook.webp":()=>p(()=>import("./pack~cc-reading-nook-Ba_6wW4M.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-star-dresser.webp":()=>p(()=>import("./pack~cc-star-dresser-CY3IU_Po.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cc-window-seat.webp":()=>p(()=>import("./pack~cc-window-seat-CPrwdaeJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~checker-bed.webp":()=>p(()=>import("./pack~checker-bed-Dl1khZwL.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~clothes-rail.webp":()=>p(()=>import("./pack~clothes-rail-DpNxviPS.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cloud-rug.webp":()=>p(()=>import("./pack~cloud-rug-BVi9jYKG.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cloud-shelf.webp":()=>p(()=>import("./pack~cloud-shelf-slqFLmn1.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~cork-board.webp":()=>p(()=>import("./pack~cork-board-DWOPEjn8.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~curvy-desk.webp":()=>p(()=>import("./pack~curvy-desk-BDa2yytO.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~daisy-pot.webp":()=>p(()=>import("./pack~daisy-pot-vdUJfXm_.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~desk-mic.webp":()=>p(()=>import("./pack~desk-mic-d9T8n8mE.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~desk.webp":()=>p(()=>import("./pack~desk-C-3AgNRZ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~dino-plush.webp":()=>p(()=>import("./pack~dino-plush-DdqMPHIF.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~doll-house.webp":()=>p(()=>import("./pack~doll-house-CH0M4iJ5.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~dresser.webp":()=>p(()=>import("./pack~dresser-Cws-4Als.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~egg-chair.webp":()=>p(()=>import("./pack~egg-chair-DYGRZPW0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~floor-fan.webp":()=>p(()=>import("./pack~floor-fan-NUw25upr.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~frog-plush.webp":()=>p(()=>import("./pack~frog-plush-Bq4x4dF_.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~game-controller.webp":()=>p(()=>import("./pack~game-controller-CwDKL6zs.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~gaming-chair.webp":()=>p(()=>import("./pack~gaming-chair-Ch-jvTrR.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~guinea-pig.webp":()=>p(()=>import("./pack~guinea-pig-BSQGDcoG.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~hamster-cage.webp":()=>p(()=>import("./pack~hamster-cage-1ZrJIYPk.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~hamster-pet.webp":()=>p(()=>import("./pack~hamster-pet-DO0Nc-ra.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~headphones.webp":()=>p(()=>import("./pack~headphones-BuEyFi9F.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~heart-rug.webp":()=>p(()=>import("./pack~heart-rug-CHsSWFVJ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~keyboard.webp":()=>p(()=>import("./pack~keyboard-CpH04NZb.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~lava-lamp.webp":()=>p(()=>import("./pack~lava-lamp-C0yGLXxS.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~moon-night-light.webp":()=>p(()=>import("./pack~moon-night-light-jQgCx363.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~nightstand.webp":()=>p(()=>import("./pack~nightstand-CAZ1Ijk0.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~paper-lantern.webp":()=>p(()=>import("./pack~paper-lantern-CBHdnzS2.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~pastel-wardrobe.webp":()=>p(()=>import("./pack~pastel-wardrobe-6p6FbGSg.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~phone-stand.webp":()=>p(()=>import("./pack~phone-stand-DA6FpZ6R.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~piggy-bank.webp":()=>p(()=>import("./pack~piggy-bank-CsgR-O1T.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~plant-stand.webp":()=>p(()=>import("./pack~plant-stand-m1tPlZfP.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~play-tent.webp":()=>p(()=>import("./pack~play-tent-C9Fxa0Rh.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~star-mobile.webp":()=>p(()=>import("./pack~star-mobile-CMLjVRhn.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-chest.webp":()=>p(()=>import("./pack~toy-chest-Bx3rslln.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-robot.webp":()=>p(()=>import("./pack~toy-robot-DuDxaaXx.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~toy-train.webp":()=>p(()=>import("./pack~toy-train-OdPxfMvY.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~unicorn-plush.webp":()=>p(()=>import("./pack~unicorn-plush-1Ml4NpgU.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~vlog-camera.webp":()=>p(()=>import("./pack~vlog-camera-CU7magSa.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wardrobe.webp":()=>p(()=>import("./pack~wardrobe-CnpDMG_i.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wh-dresser.webp":()=>p(()=>import("./pack~wh-dresser-BJJ7U3Ti.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wh-nightstand.webp":()=>p(()=>import("./pack~wh-nightstand-TWRUmwYh.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wood-desk.webp":()=>p(()=>import("./pack~wood-desk-rwE12GqK.js"),[]).then(e=>e.default),"../../assets/art/bedroom/pack~wooden-bed.webp":()=>p(()=>import("./pack~wooden-bed-13S3AiLf.js"),[]).then(e=>e.default),"../../assets/art/bedroom/stars.webp":()=>p(()=>import("./stars-BPD2RlkZ.js"),[]).then(e=>e.default),"../../assets/art/bedroom/story-pillow.webp":()=>p(()=>import("./story-pillow-3KtRY1EI.js"),[]).then(e=>e.default),"../../assets/art/bedroom/teddy.webp":()=>p(()=>import("./teddy-CS3IZCmA.js"),[]).then(e=>e.default),"../../assets/art/bedroom/tub.webp":()=>p(()=>import("./tub-D2ItmFKM.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-bakery-shelf.webp":()=>p(()=>import("./pack~cc-bakery-shelf-C9pglmOD.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-breakfast-table.webp":()=>p(()=>import("./pack~cc-breakfast-table-CqAzN2si.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-bubble-chair.webp":()=>p(()=>import("./pack~cc-bubble-chair-Db6ctGIk.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-cupcake-stand.webp":()=>p(()=>import("./pack~cc-cupcake-stand-ClVhXfMJ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-dryer-chair.webp":()=>p(()=>import("./pack~cc-dryer-chair-BhVjSN-o.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-flower-kettle.webp":()=>p(()=>import("./pack~cc-flower-kettle-T5UeKV0l.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-light-vanity.webp":()=>p(()=>import("./pack~cc-light-vanity-D_F5Ili-.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-macaron-jar.webp":()=>p(()=>import("./pack~cc-macaron-jar-C7OMMZGy.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-mani-chair.webp":()=>p(()=>import("./pack~cc-mani-chair-gE8U4fT9.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-mint-fridge.webp":()=>p(()=>import("./pack~cc-mint-fridge-qv93g_mZ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-pastel-range.webp":()=>p(()=>import("./pack~cc-pastel-range-DEzEnqL9.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-perfume-tray.webp":()=>p(()=>import("./pack~cc-perfume-tray-BOuRtQMQ.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-ribbon-mirror.webp":()=>p(()=>import("./pack~cc-ribbon-mirror-DaVelywO.js"),[]).then(e=>e.default),"../../assets/art/cottage/pack~cc-teapot-set.webp":()=>p(()=>import("./pack~cc-teapot-set-CYwQRzs2.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~arched-shelf.webp":()=>p(()=>import("./pack~arched-shelf-CKpdbpUV.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~blob-rug.webp":()=>p(()=>import("./pack~blob-rug-DV27jZ4K.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~bubbly-plant.webp":()=>p(()=>import("./pack~bubbly-plant-DaDhjp5G.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~bud-vase.webp":()=>p(()=>import("./pack~bud-vase-BjDwnbex.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~comb-brush.webp":()=>p(()=>import("./pack~comb-brush-2q32lqRM.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~cream-jars.webp":()=>p(()=>import("./pack~cream-jars-DuhIPlDY.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~drop-lamp.webp":()=>p(()=>import("./pack~drop-lamp-CpS9XCXn.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~droplet-buddy.webp":()=>p(()=>import("./pack~droplet-buddy-DgmZ-fU6.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~fancy-sofa.webp":()=>p(()=>import("./pack~fancy-sofa-Cuv4CZ93.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~flower-cart.webp":()=>p(()=>import("./pack~flower-cart-Cpa-qrtx.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~foot-spa.webp":()=>p(()=>import("./pack~foot-spa-CSEQ1rPl.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~globe-pendants.webp":()=>p(()=>import("./pack~globe-pendants-CeBlCiLv.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~glow-mirror.webp":()=>p(()=>import("./pack~glow-mirror-BK53Zp0A.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~gold-floor-mirror.webp":()=>p(()=>import("./pack~gold-floor-mirror-BIgxfU1m.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~hair-dryer.webp":()=>p(()=>import("./pack~hair-dryer-CDTC9I6n.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~heart-plant.webp":()=>p(()=>import("./pack~heart-plant-B-wW-dwX.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~heart-pouf.webp":()=>p(()=>import("./pack~heart-pouf-BbbND0iB.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~lilac-curtain.webp":()=>p(()=>import("./pack~lilac-curtain-CKYxudqA.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~lotion-trio.webp":()=>p(()=>import("./pack~lotion-trio-oJDS-nAk.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~mani-lamp.webp":()=>p(()=>import("./pack~mani-lamp-CIckVWe7.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~nail-table.webp":()=>p(()=>import("./pack~nail-table-DblO1JLs.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pebble-rug.webp":()=>p(()=>import("./pack~pebble-rug-bTJFA8Ur.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~perfume-bottle.webp":()=>p(()=>import("./pack~perfume-bottle-gM_mVBfU.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pink-fountain.webp":()=>p(()=>import("./pack~pink-fountain-Ciur2kZp.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~pink-vanity.webp":()=>p(()=>import("./pack~pink-vanity-wGJdTvWK.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~polish-bottle.webp":()=>p(()=>import("./pack~polish-bottle-TyYjJ4KH.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~polish-rack.webp":()=>p(()=>import("./pack~polish-rack-BiHiHzDG.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~reception-desk.webp":()=>p(()=>import("./pack~reception-desk-Bhr61SSS.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~salon-chair.webp":()=>p(()=>import("./pack~salon-chair-B5ARb_Hu.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~scent-candle.webp":()=>p(()=>import("./pack~scent-candle-DhSW37c1.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~spray-bottle.webp":()=>p(()=>import("./pack~spray-bottle-co6Gr0Aw.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~star-wall-sign.webp":()=>p(()=>import("./pack~star-wall-sign-keSh_Cax.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~swivel-stool.webp":()=>p(()=>import("./pack~swivel-stool-gm_rxOWt.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~tiered-tray.webp":()=>p(()=>import("./pack~tiered-tray-CrVkNUF_.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~towel-cart.webp":()=>p(()=>import("./pack~towel-cart-TzS6naxj.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~towel-stack.webp":()=>p(()=>import("./pack~towel-stack-DVE-ZURg.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~vine-planter.webp":()=>p(()=>import("./pack~vine-planter-D6XFbFLe.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~waiting-bench.webp":()=>p(()=>import("./pack~waiting-bench-rf-Lxrnd.js"),[]).then(e=>e.default),"../../assets/art/glossy/pack~wash-chair.webp":()=>p(()=>import("./pack~wash-chair-By1PyrJZ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/apple.webp":()=>p(()=>import("./apple-CgQUqZtF.js"),[]).then(e=>e.default),"../../assets/art/kitchen/berry-basket.webp":()=>p(()=>import("./berry-basket-D02mck40.js"),[]).then(e=>e.default),"../../assets/art/kitchen/cake.webp":()=>p(()=>import("./cake-D-PUSdV3.js"),[]).then(e=>e.default),"../../assets/art/kitchen/donut.webp":()=>p(()=>import("./donut-D-CyVfCH.js"),[]).then(e=>e.default),"../../assets/art/kitchen/fridge.webp":()=>p(()=>import("./fridge-CPUz39WO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/juice.webp":()=>p(()=>import("./juice-C7d-xViI.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bananas.webp":()=>p(()=>import("./pack~bananas-BaRiiq6m.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bar-stool.webp":()=>p(()=>import("./pack~bar-stool-DoItrBtD.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~bread-loaf.webp":()=>p(()=>import("./pack~bread-loaf-DkvGPzQe.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~chick.webp":()=>p(()=>import("./pack~chick-BO9DXErH.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~china-hutch.webp":()=>p(()=>import("./pack~china-hutch-DPrwGSNq.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cocoa-mug.webp":()=>p(()=>import("./pack~cocoa-mug-hzMczJEM.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cookie-jar.webp":()=>p(()=>import("./pack~cookie-jar-DwGPCGTZ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cooking-pot.webp":()=>p(()=>import("./pack~cooking-pot-CfarfMvn.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~cupcake.webp":()=>p(()=>import("./pack~cupcake-4s6JCz52.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~dish-rack.webp":()=>p(()=>import("./pack~dish-rack-Dffid-z2.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~fruit-bowl.webp":()=>p(()=>import("./pack~fruit-bowl-S7zdSZud.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~frying-pan.webp":()=>p(()=>import("./pack~frying-pan-BibqhFDJ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~happy-fridge.webp":()=>p(()=>import("./pack~happy-fridge-HnFXofL6.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~herb-box.webp":()=>p(()=>import("./pack~herb-box-DjQ-1q5D.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~high-chair.webp":()=>p(()=>import("./pack~high-chair-24NInnaO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~ice-cream.webp":()=>p(()=>import("./pack~ice-cream-rdopj06A.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kettle.webp":()=>p(()=>import("./pack~kettle-ByDzqkyg.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kitchen-counter.webp":()=>p(()=>import("./pack~kitchen-counter-B7uMIWhT.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~kitchen-sink.webp":()=>p(()=>import("./pack~kitchen-sink-DyICEjEC.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~lemon-tree.webp":()=>p(()=>import("./pack~lemon-tree-B8bzBxaO.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~microwave.webp":()=>p(()=>import("./pack~microwave-B6anYgBg.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~milk-bottle.webp":()=>p(()=>import("./pack~milk-bottle-CKMei0uX.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pancakes.webp":()=>p(()=>import("./pack~pancakes-BmuT40In.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pantry-shelf.webp":()=>p(()=>import("./pack~pantry-shelf-0EpJaISh.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pendant-lamp.webp":()=>p(()=>import("./pack~pendant-lamp-BRmz1TSb.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~pet-bowl.webp":()=>p(()=>import("./pack~pet-bowl-bLDcshyX.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~rice-cooker.webp":()=>p(()=>import("./pack~rice-cooker-j9bjO2OS.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~runner-rug.webp":()=>p(()=>import("./pack~runner-rug-DgsAHdwM.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~spice-rack.webp":()=>p(()=>import("./pack~spice-rack-5CIyihfN.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~stand-mixer.webp":()=>p(()=>import("./pack~stand-mixer-DVs9icnQ.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~teapot.webp":()=>p(()=>import("./pack~teapot-Clbuel00.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~toaster.webp":()=>p(()=>import("./pack~toaster-0CdrvAn6.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~utensil-rail.webp":()=>p(()=>import("./pack~utensil-rail-7lJosKxj.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pack~watermelon-slice.webp":()=>p(()=>import("./pack~watermelon-slice-DDNYgh1a.js"),[]).then(e=>e.default),"../../assets/art/kitchen/pizza.webp":()=>p(()=>import("./pizza-CBn4rlbT.js"),[]).then(e=>e.default),"../../assets/art/kitchen/stove.webp":()=>p(()=>import("./stove-EEI-cSzf.js"),[]).then(e=>e.default),"../../assets/art/living/bunny.webp":()=>p(()=>import("./bunny-PYkx6Ie3.js"),[]).then(e=>e.default),"../../assets/art/living/cactus.webp":()=>p(()=>import("./cactus-CNbOypby.js"),[]).then(e=>e.default),"../../assets/art/living/cat-tower.webp":()=>p(()=>import("./cat-tower-BTX9_pA4.js"),[]).then(e=>e.default),"../../assets/art/living/cat.webp":()=>p(()=>import("./cat-CkF-5Moc.js"),[]).then(e=>e.default),"../../assets/art/living/dog.webp":()=>p(()=>import("./dog-XsW5t_fN.js"),[]).then(e=>e.default),"../../assets/art/living/egg~cada-mouse.webp":()=>p(()=>import("./egg~cada-mouse-CahQlh-m.js"),[]).then(e=>e.default),"../../assets/art/living/egg~chloe-starlamp.webp":()=>p(()=>import("./egg~chloe-starlamp-pq_Iclzu.js"),[]).then(e=>e.default),"../../assets/art/living/egg~quinn-pup.webp":()=>p(()=>import("./egg~quinn-pup-BqdUFpbv.js"),[]).then(e=>e.default),"../../assets/art/living/egg~reagan-frame.webp":()=>p(()=>import("./egg~reagan-frame-BWp9N6ej.js"),[]).then(e=>e.default),"../../assets/art/living/egg~sloane-snail.webp":()=>p(()=>import("./egg~sloane-snail-DsDMZRR7.js"),[]).then(e=>e.default),"../../assets/art/living/fish.webp":()=>p(()=>import("./fish-Cs1FEzIZ.js"),[]).then(e=>e.default),"../../assets/art/living/floor-cushion.webp":()=>p(()=>import("./floor-cushion-D7ewX4dX.js"),[]).then(e=>e.default),"../../assets/art/living/flowers.webp":()=>p(()=>import("./flowers-CHLFwDXa.js"),[]).then(e=>e.default),"../../assets/art/living/kennel.webp":()=>p(()=>import("./kennel-iNvQ28eh.js"),[]).then(e=>e.default),"../../assets/art/living/pack~acorn-friend.webp":()=>p(()=>import("./pack~acorn-friend-Bm4Hk12h.js"),[]).then(e=>e.default),"../../assets/art/living/pack~aquarium.webp":()=>p(()=>import("./pack~aquarium-D0sUglTr.js"),[]).then(e=>e.default),"../../assets/art/living/pack~arc-floor-lamp.webp":()=>p(()=>import("./pack~arc-floor-lamp-7GCaGkDs.js"),[]).then(e=>e.default),"../../assets/art/living/pack~bean-bag.webp":()=>p(()=>Promise.resolve().then(()=>pM),void 0).then(e=>e.default),"../../assets/art/living/pack~bird-cage.webp":()=>p(()=>import("./pack~bird-cage-CLlPQlCF.js"),[]).then(e=>e.default),"../../assets/art/living/pack~blanket-basket.webp":()=>p(()=>import("./pack~blanket-basket-Clw-jcOi.js"),[]).then(e=>e.default),"../../assets/art/living/pack~box-stack.webp":()=>p(()=>import("./pack~box-stack-DV3Ljobv.js"),[]).then(e=>e.default),"../../assets/art/living/pack~brick-fireplace.webp":()=>p(()=>import("./pack~brick-fireplace-CU641OC1.js"),[]).then(e=>e.default),"../../assets/art/living/pack~building-blocks.webp":()=>p(()=>import("./pack~building-blocks-C0yT9TvM.js"),[]).then(e=>e.default),"../../assets/art/living/pack~bulletin-board.webp":()=>p(()=>import("./pack~bulletin-board-BCXiWqVp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cactus-buddy.webp":()=>p(()=>import("./pack~cactus-buddy-2_JfEHKl.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-cottage-aquarium.webp":()=>p(()=>import("./pack~cc-cottage-aquarium-C8NYhmrd.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-fairy-shelf.webp":()=>p(()=>import("./pack~cc-fairy-shelf-CnHOFSRs.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-flower-lamp.webp":()=>p(()=>import("./pack~cc-flower-lamp-wbPhnbQ_.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-clock.webp":()=>p(()=>import("./pack~cc-heart-clock-jr4MzVW9.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-pouf.webp":()=>p(()=>import("./pack~cc-heart-pouf-BPM9YsrB.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-heart-rug.webp":()=>p(()=>import("./pack~cc-heart-rug-BVKJ0cQB.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-macrame-swing.webp":()=>p(()=>import("./pack~cc-macrame-swing-pWIX7Xk-.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-mushroom-stool.webp":()=>p(()=>import("./pack~cc-mushroom-stool-CMlvAjd6.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-petal-table.webp":()=>p(()=>import("./pack~cc-petal-table-7S1s7yzK.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-plant-wall.webp":()=>p(()=>import("./pack~cc-plant-wall-p6D9EEBb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-record-player.webp":()=>p(()=>import("./pack~cc-record-player-BRAifeEK.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-scallop-curtains.webp":()=>p(()=>import("./pack~cc-scallop-curtains-BeV7rdPo.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cc-scallop-loveseat.webp":()=>p(()=>import("./pack~cc-scallop-loveseat-_AoDnFXb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~checker-rug.webp":()=>p(()=>import("./pack~checker-rug-Cp2IkzoS.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cloud-sofa.webp":()=>p(()=>import("./pack~cloud-sofa-DyBmuzAg.js"),[]).then(e=>e.default),"../../assets/art/living/pack~coffee-table.webp":()=>p(()=>import("./pack~coffee-table-DPuXhspW.js"),[]).then(e=>e.default),"../../assets/art/living/pack~comfy-armchair.webp":()=>p(()=>import("./pack~comfy-armchair-CJDG30Cj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cream-sofa.webp":()=>p(()=>import("./pack~cream-sofa-Ez2miUnO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cubby-shelf.webp":()=>p(()=>import("./pack~cubby-shelf-BUMGU8Jh.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cube-shelf.webp":()=>p(()=>import("./pack~cube-shelf-D5D2Dw5S.js"),[]).then(e=>e.default),"../../assets/art/living/pack~cute-speaker.webp":()=>p(()=>import("./pack~cute-speaker-jTqsaV2I.js"),[]).then(e=>e.default),"../../assets/art/living/pack~daisy-rug.webp":()=>p(()=>import("./pack~daisy-rug-BCUkj5ia.js"),[]).then(e=>e.default),"../../assets/art/living/pack~desk-lamp.webp":()=>p(()=>import("./pack~desk-lamp-DmCKofr2.js"),[]).then(e=>e.default),"../../assets/art/living/pack~fiddle-leaf-fig.webp":()=>p(()=>import("./pack~fiddle-leaf-fig-D7FML9mx.js"),[]).then(e=>e.default),"../../assets/art/living/pack~fireplace.webp":()=>p(()=>import("./pack~fireplace-DYp6BN4M.js"),[]).then(e=>e.default),"../../assets/art/living/pack~flower-lamp.webp":()=>p(()=>import("./pack~flower-lamp-kPf9KBh-.js"),[]).then(e=>e.default),"../../assets/art/living/pack~glass-cabinet.webp":()=>p(()=>import("./pack~glass-cabinet-B9JOaE-O.js"),[]).then(e=>e.default),"../../assets/art/living/pack~globe.webp":()=>p(()=>import("./pack~globe-Df4aJX14.js"),[]).then(e=>e.default),"../../assets/art/living/pack~hanging-lantern.webp":()=>p(()=>import("./pack~hanging-lantern-CSb5_y-t.js"),[]).then(e=>e.default),"../../assets/art/living/pack~hanging-planter.webp":()=>p(()=>import("./pack~hanging-planter-BXNCa3po.js"),[]).then(e=>e.default),"../../assets/art/living/pack~heart-light.webp":()=>p(()=>import("./pack~heart-light-BMZQFtcT.js"),[]).then(e=>e.default),"../../assets/art/living/pack~knit-cushion.webp":()=>p(()=>import("./pack~knit-cushion-DzpDb6hm.js"),[]).then(e=>e.default),"../../assets/art/living/pack~ladder-shelf.webp":()=>p(()=>import("./pack~ladder-shelf-CLOcbyxp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~landscape-art.webp":()=>p(()=>import("./pack~landscape-art-DiJEigPf.js"),[]).then(e=>e.default),"../../assets/art/living/pack~lattice-bench.webp":()=>p(()=>import("./pack~lattice-bench-0G6hKZYj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~leaf-wreath.webp":()=>p(()=>import("./pack~leaf-wreath-WJ1hv4SR.js"),[]).then(e=>e.default),"../../assets/art/living/pack~monstera-plant.webp":()=>p(()=>import("./pack~monstera-plant-BE84EAw8.js"),[]).then(e=>e.default),"../../assets/art/living/pack~moving-box.webp":()=>p(()=>import("./pack~moving-box-CAe2Xeia.js"),[]).then(e=>e.default),"../../assets/art/living/pack~piano.webp":()=>p(()=>import("./pack~piano-C2g19n4Y.js"),[]).then(e=>e.default),"../../assets/art/living/pack~popcorn.webp":()=>p(()=>import("./pack~popcorn-B6n0yaX2.js"),[]).then(e=>e.default),"../../assets/art/living/pack~pothos-plant.webp":()=>p(()=>import("./pack~pothos-plant-CTHDCuIc.js"),[]).then(e=>e.default),"../../assets/art/living/pack~pouf.webp":()=>p(()=>import("./pack~pouf-BJ-teA6I.js"),[]).then(e=>e.default),"../../assets/art/living/pack~puffy-stool.webp":()=>p(()=>import("./pack~puffy-stool-D38tkWnm.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rainbow-rug.webp":()=>p(()=>import("./pack~rainbow-rug-DUV6gUsN.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rainbow-wall-art.webp":()=>p(()=>import("./pack~rainbow-wall-art--boV5icC.js"),[]).then(e=>e.default),"../../assets/art/living/pack~retro-radio.webp":()=>p(()=>import("./pack~retro-radio-CDLK9pHp.js"),[]).then(e=>e.default),"../../assets/art/living/pack~ring-light.webp":()=>p(()=>import("./pack~ring-light-C3E9VDAl.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rocking-chair.webp":()=>p(()=>import("./pack~rocking-chair-B2p2ReQc.js"),[]).then(e=>e.default),"../../assets/art/living/pack~rocking-horse.webp":()=>p(()=>import("./pack~rocking-horse-CswTc134.js"),[]).then(e=>e.default),"../../assets/art/living/pack~round-rug.webp":()=>p(()=>import("./pack~round-rug-CHSVB2Aw.js"),[]).then(e=>e.default),"../../assets/art/living/pack~side-table-round.webp":()=>p(()=>import("./pack~side-table-round-CP96FSiO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~snake-plant.webp":()=>p(()=>import("./pack~snake-plant-DawlmINM.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sprout-pot.webp":()=>p(()=>import("./pack~sprout-pot-Dx8LI8dH.js"),[]).then(e=>e.default),"../../assets/art/living/pack~star-lamp.webp":()=>p(()=>import("./pack~star-lamp-s9PtqFmZ.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sticker-board.webp":()=>p(()=>import("./pack~sticker-board--TDZ7ozq.js"),[]).then(e=>e.default),"../../assets/art/living/pack~string-lights.webp":()=>p(()=>import("./pack~string-lights-HZXr5sUd.js"),[]).then(e=>e.default),"../../assets/art/living/pack~stripe-runner.webp":()=>p(()=>import("./pack~stripe-runner-B0fRj7Re.js"),[]).then(e=>e.default),"../../assets/art/living/pack~succulent-trio.webp":()=>p(()=>import("./pack~succulent-trio-M7abHPiA.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sunny-art.webp":()=>p(()=>import("./pack~sunny-art-D2_v9d4h.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sv-bean-bag.webp":()=>p(()=>Promise.resolve().then(()=>gM),void 0).then(e=>e.default),"../../assets/art/living/pack~sv-cloud-rug.webp":()=>p(()=>import("./pack~sv-cloud-rug-DBeaYhY1.js"),[]).then(e=>e.default),"../../assets/art/living/pack~sv-wall-shelf.webp":()=>p(()=>import("./pack~sv-wall-shelf-CE0YAWvX.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tassel-rug.webp":()=>p(()=>import("./pack~tassel-rug-C3GgXPyZ.js"),[]).then(e=>e.default),"../../assets/art/living/pack~throw-pillow.webp":()=>p(()=>import("./pack~throw-pillow-BUguyBcj.js"),[]).then(e=>e.default),"../../assets/art/living/pack~toy-car.webp":()=>p(()=>import("./pack~toy-car-DZ6BYQDO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~trailing-plant.webp":()=>p(()=>import("./pack~trailing-plant-BJ2rTgvE.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tulip-vase.webp":()=>p(()=>import("./pack~tulip-vase-CmyisqxG.js"),[]).then(e=>e.default),"../../assets/art/living/pack~turtle.webp":()=>p(()=>import("./pack~turtle-FaBzuoqb.js"),[]).then(e=>e.default),"../../assets/art/living/pack~tv-stand.webp":()=>p(()=>import("./pack~tv-stand-C8gC4UFW.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wall-clock.webp":()=>p(()=>import("./pack~wall-clock-D7PdTom6.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wall-shelf.webp":()=>p(()=>import("./pack~wall-shelf-C1lRJ7GC.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wavy-floor-lamp.webp":()=>p(()=>import("./pack~wavy-floor-lamp-BL00MuGA.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-arc-floor-lamp.webp":()=>p(()=>import("./pack~wh-arc-floor-lamp-B6QVftZN.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-book-stack.webp":()=>p(()=>import("./pack~wh-book-stack-Dwcz23qo.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-fiddle-leaf-fig.webp":()=>p(()=>import("./pack~wh-fiddle-leaf-fig-COFk3BJw.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-pendant-lamp.webp":()=>p(()=>import("./pack~wh-pendant-lamp-Dd4mFEDS.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-snake-plant.webp":()=>p(()=>import("./pack~wh-snake-plant-D-C6ZJKO.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wh-string-lights.webp":()=>p(()=>import("./pack~wh-string-lights-D0MBhT1M.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-armchair.webp":()=>p(()=>import("./pack~wood-armchair-DHvcj8Mx.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-bookshelf.webp":()=>p(()=>import("./pack~wood-bookshelf-sxaV4CyF.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-coffee-table.webp":()=>p(()=>import("./pack~wood-coffee-table-CrSb-1Xv.js"),[]).then(e=>e.default),"../../assets/art/living/pack~wood-stool.webp":()=>p(()=>import("./pack~wood-stool-JjUX_8W2.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-bouquet.webp":()=>p(()=>import("./ranch-bouquet-LHbKbTej.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-carrot.webp":()=>p(()=>import("./ranch-carrot-cyry77wX.js"),[]).then(e=>e.default),"../../assets/art/living/ranch-egg.webp":()=>p(()=>import("./ranch-egg-CYsNXUKY.js"),[]).then(e=>e.default),"../../assets/art/living/tree.webp":()=>p(()=>import("./tree-CXYySnAy.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby-bottle.webp":()=>p(()=>import("./baby-bottle-40H4PprS.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby-shelf.webp":()=>p(()=>import("./baby-shelf--dhe-OtF.js"),[]).then(e=>e.default),"../../assets/art/nursery/baby.webp":()=>p(()=>import("./baby-Cjy_lAi1.js"),[]).then(e=>e.default),"../../assets/art/nursery/bassinet.webp":()=>p(()=>import("./bassinet-D1E3rjcm.js"),[]).then(e=>e.default),"../../assets/art/nursery/blocks.webp":()=>p(()=>import("./blocks-CtsB78Ug.js"),[]).then(e=>e.default),"../../assets/art/nursery/bunny-plush.webp":()=>p(()=>import("./bunny-plush-9_hTWSJ0.js"),[]).then(e=>e.default),"../../assets/art/nursery/changing-table.webp":()=>p(()=>import("./changing-table-DKyI_wrV.js"),[]).then(e=>e.default),"../../assets/art/nursery/cloud-rug.webp":()=>p(()=>import("./cloud-rug-BvUUbOnx.js"),[]).then(e=>e.default),"../../assets/art/nursery/crib-mobile.webp":()=>p(()=>import("./crib-mobile-BvlX6u0a.js"),[]).then(e=>e.default),"../../assets/art/nursery/crib.webp":()=>p(()=>import("./crib-Do3izZrw.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-cocoa.webp":()=>p(()=>import("./doll-cocoa-ypqLIm4M.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-honey.webp":()=>p(()=>import("./doll-honey-Dc51Fmwm.js"),[]).then(e=>e.default),"../../assets/art/nursery/doll-rose.webp":()=>p(()=>import("./doll-rose-DTSDlFkK.js"),[]).then(e=>e.default),"../../assets/art/nursery/moon-art.webp":()=>p(()=>import("./moon-art-DQbuFa-d.js"),[]).then(e=>e.default),"../../assets/art/nursery/music-box.webp":()=>p(()=>import("./music-box-DKDLmINu.js"),[]).then(e=>e.default),"../../assets/art/nursery/night-light.webp":()=>p(()=>import("./night-light-lryf6NaK.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-curtains.webp":()=>p(()=>import("./nursery-curtains-Ds4ZTC1C.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-dresser.webp":()=>p(()=>import("./nursery-dresser-DbmVYgde.js"),[]).then(e=>e.default),"../../assets/art/nursery/nursery-lamp.webp":()=>p(()=>import("./nursery-lamp-pqbkf92r.js"),[]).then(e=>e.default),"../../assets/art/nursery/play-mat.webp":()=>p(()=>import("./play-mat-fGBMoW0r.js"),[]).then(e=>e.default),"../../assets/art/nursery/rattle.webp":()=>p(()=>import("./rattle-EzXp43O4.js"),[]).then(e=>e.default),"../../assets/art/nursery/rocker.webp":()=>p(()=>import("./rocker-BieX4wIy.js"),[]).then(e=>e.default),"../../assets/art/nursery/rocking-horse.webp":()=>p(()=>import("./rocking-horse-BK9_A5ep.js"),[]).then(e=>e.default),"../../assets/art/nursery/stacking-rings.webp":()=>p(()=>import("./stacking-rings-8Z2fYLIi.js"),[]).then(e=>e.default),"../../assets/art/nursery/toy-bin.webp":()=>p(()=>import("./toy-bin-CuORRSkX.js"),[]).then(e=>e.default),"../../assets/art/salon/hairdryer.webp":()=>p(()=>import("./hairdryer-BK3-NMh8.js"),[]).then(e=>e.default),"../../assets/art/salon/perfume.webp":()=>p(()=>import("./perfume-CCbV6-cE.js"),[]).then(e=>e.default),"../../assets/art/salon/polish.webp":()=>p(()=>import("./polish-Ch0EUf5y.js"),[]).then(e=>e.default),"../../assets/art/salon/ribbon-tray.webp":()=>p(()=>import("./ribbon-tray-DBUlSLAS.js"),[]).then(e=>e.default),"../../assets/art/salon/stool.webp":()=>p(()=>import("./stool-SBbn3Fq_.js"),[]).then(e=>e.default),"../../assets/art/salon/vanity.webp":()=>p(()=>import("./vanity-COm_EF9W.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~arched-mirror.webp":()=>p(()=>import("./pack~arched-mirror-FzcrWxa4.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~boba-cup.webp":()=>p(()=>import("./pack~boba-cup-DO0lCjCc.js"),[]).then(e=>e.default),"../../assets/art/sunny-vibes/pack~mini-fridge.webp":()=>p(()=>import("./pack~mini-fridge-DxF_-Si1.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~apple-tree.webp":()=>p(()=>import("./pack~apple-tree-BO7hFW66.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~cozy-mug.webp":()=>p(()=>import("./pack~cozy-mug-CL5TNVre.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~fire-pit.webp":()=>p(()=>import("./pack~fire-pit-CbfQWRzg.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~mini-greenhouse.webp":()=>p(()=>import("./pack~mini-greenhouse-Cgb6BHcc.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~picnic-basket.webp":()=>p(()=>import("./pack~picnic-basket-BZmSi61Z.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~sale-sign.webp":()=>p(()=>import("./pack~sale-sign-CNZEWdis.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~wh-kitchen-counter.webp":()=>p(()=>import("./pack~wh-kitchen-counter-BK3WsTw8.js"),[]).then(e=>e.default),"../../assets/art/welcome-home/pack~wh-teapot.webp":()=>p(()=>import("./pack~wh-teapot-C2xpf3Kz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-bauble-garland.webp":()=>p(()=>import("./pack~wc-bauble-garland-Bsv6snBW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-berry-wreath.webp":()=>p(()=>import("./pack~wc-berry-wreath-DwqWJGm0.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-birch-basket.webp":()=>p(()=>import("./pack~wc-birch-basket-Ck1MjTPW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cabin-picture.webp":()=>p(()=>import("./pack~wc-cabin-picture-Bo_qKFlZ.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-candle-trio.webp":()=>p(()=>import("./pack~wc-candle-trio-33RcvYK5.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cane-lamp.webp":()=>p(()=>import("./pack~wc-cane-lamp-BD2V2gLm.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cinnamon-tray.webp":()=>p(()=>import("./pack~wc-cinnamon-tray-Cy2cPyEY.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-cart.webp":()=>p(()=>import("./pack~wc-cocoa-cart-BwlPCBQR.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-mug.webp":()=>p(()=>import("./pack~wc-cocoa-mug-Cpad5gyz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cocoa-pot.webp":()=>p(()=>import("./pack~wc-cocoa-pot-CqjSzuIA.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cookie-oven.webp":()=>p(()=>import("./pack~wc-cookie-oven-AeTBKAqH.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-cookie-plate.webp":()=>p(()=>import("./pack~wc-cookie-plate-Db4_27lp.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-frost-bookcase.webp":()=>p(()=>import("./pack~wc-frost-bookcase-ChH_Zc5-.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-frosted-pine.webp":()=>p(()=>import("./pack~wc-frosted-pine-BaL421Eq.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-fur-bench.webp":()=>p(()=>import("./pack~wc-fur-bench-BHy7RvLc.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-gingerbread-village.webp":()=>p(()=>import("./pack~wc-gingerbread-village-CXGNXY4G.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-gingerbread.webp":()=>p(()=>import("./pack~wc-gingerbread-BH26TMqz.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-globe-lamp.webp":()=>p(()=>import("./pack~wc-globe-lamp-FQWUqV9q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-holiday-tree.webp":()=>p(()=>import("./pack~wc-holiday-tree-Dc9RLa8q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-holly.webp":()=>p(()=>import("./pack~wc-holly-Ddsa-Msy.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-ice-skates.webp":()=>p(()=>import("./pack~wc-ice-skates-CerfMu-3.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-ice-wardrobe.webp":()=>p(()=>import("./pack~wc-ice-wardrobe-Dk8v_MKI.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-knit-armchair.webp":()=>p(()=>import("./pack~wc-knit-armchair-p4nAzHXW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-lantern.webp":()=>p(()=>import("./pack~wc-lantern-rRWK8g8l.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-log-bench.webp":()=>p(()=>import("./pack~wc-log-bench-Djm76jnh.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-marshmallow-jar.webp":()=>p(()=>import("./pack~wc-marshmallow-jar-BiG_u42k.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mitten-line.webp":()=>p(()=>import("./pack~wc-mitten-line-BbhTynIV.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mitten-ottoman.webp":()=>p(()=>import("./pack~wc-mitten-ottoman-q05Rsc6B.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-mug-shelf.webp":()=>p(()=>import("./pack~wc-mug-shelf-CeUbCPsi.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-nutcracker.webp":()=>p(()=>import("./pack~wc-nutcracker-DlEeuUgj.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-penguin-chair.webp":()=>p(()=>import("./pack~wc-penguin-chair-ARRfWJYR.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-penguin-plush.webp":()=>p(()=>import("./pack~wc-penguin-plush-w9LiHlOM.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-peppermint-counter.webp":()=>p(()=>import("./pack~wc-peppermint-counter-Cq5SRRi_.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-peppermint-rug.webp":()=>p(()=>import("./pack~wc-peppermint-rug-DjPM1BL2.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pinecone-garland.webp":()=>p(()=>import("./pack~wc-pinecone-garland-DV4Ijs5E.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pinecone-table.webp":()=>p(()=>import("./pack~wc-pinecone-table-CzULQj_N.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-plaid-bed.webp":()=>p(()=>import("./pack~wc-plaid-bed-ZVDIbe1Y.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-plaid-sofa.webp":()=>p(()=>import("./pack~wc-plaid-sofa-BaoM0h7H.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-poinsettia.webp":()=>p(()=>import("./pack~wc-poinsettia-DNdNw7QZ.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-polar-plush.webp":()=>p(()=>import("./pack~wc-polar-plush-Cz2NxU-X.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-pom-rug.webp":()=>p(()=>import("./pack~wc-pom-rug-Zyeq7bwG.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-present-stack.webp":()=>p(()=>import("./pack~wc-present-stack-B09Rx_MO.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-reindeer.webp":()=>p(()=>import("./pack~wc-reindeer-DTWaMJXV.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sled-table.webp":()=>p(()=>import("./pack~wc-sled-table-BNH48Wur.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sleigh-planter.webp":()=>p(()=>import("./pack~wc-sleigh-planter-B3DNwK0i.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-globe.webp":()=>p(()=>import("./pack~wc-snow-globe-C9bft1_W.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-mobile.webp":()=>p(()=>import("./pack~wc-snow-mobile-JM0Q-i3v.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-nightstand.webp":()=>p(()=>import("./pack~wc-snow-nightstand-Bqay9NoW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snow-window.webp":()=>p(()=>import("./pack~wc-snow-window-DCwNoisx.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snowman.webp":()=>p(()=>import("./pack~wc-snowman-Z8FnDuXK.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-snowshoes.webp":()=>p(()=>import("./pack~wc-snowshoes-Bux5zjz7.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-sock-hamper.webp":()=>p(()=>import("./pack~wc-sock-hamper-IDMi8Oc3.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-star-topper.webp":()=>p(()=>import("./pack~wc-star-topper-CxhOrJOb.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-stocking-row.webp":()=>p(()=>import("./pack~wc-stocking-row-DRCxX9NW.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-stone-hearth.webp":()=>p(()=>import("./pack~wc-stone-hearth-BIaBCxMx.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-twinkle-lamp.webp":()=>p(()=>import("./pack~wc-twinkle-lamp-3aXfb0Du.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-twinkle-string.webp":()=>p(()=>import("./pack~wc-twinkle-string-D1fw8i7q.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-window-seat.webp":()=>p(()=>import("./pack~wc-window-seat-bNQT817S.js"),[]).then(e=>e.default),"../../assets/art/winter/pack~wc-woodstove.webp":()=>p(()=>import("./pack~wc-woodstove-BcUTK7y-.js"),[]).then(e=>e.default)});function Cc(e){const t=e.split("/").pop()||"";if(t.length<6||t.slice(-5).toLowerCase()!==".webp")return null;const n=decodeURIComponent(t.slice(0,-5)).replace(/~/g,":");return!n||n.startsWith("_")?null:n}const qp=new Set;for(const e in Aa){const t=Cc(e);t&&qp.add(t)}function $1(e){return qp.has(e)}const jr=new Map;function x1(e){for(const t in Aa)if(Cc(t)===e)return Aa[t]}function M1(e){const t=jr.get(e);if(t)return t;const n=x1(e);if(!n)return Promise.resolve(null);const s=n().then(o=>(w1(e,o),e)).catch(()=>(jr.delete(e),null));return jr.set(e,s),s}function kr(e){const t=[...new Set(e)];return Promise.all(t.map(M1)).then(n=>n.filter(s=>s!==null))}function L1(){const e=[];for(const t in Aa){const n=Cc(t);n&&e.push(n)}return kr(e)}function E1(e,t=[]){return _1(e)?kr(t):Promise.resolve([])}const Sc=Object.freeze(Object.defineProperty({__proto__:null,boot:E1,hasArt:$1,loadAllArt:L1,loadArtKinds:kr},Symbol.toStringTag,{value:"Module"})),$e="#5a3d5c",Qe=`stroke="${$e}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,Qi=[{body:"#ffd6e0",roof:"#ff7aa8",door:"#8fd3ff",trim:"#fff6e6"},{body:"#d9f2ff",roof:"#5aa9e6",door:"#ffd166",trim:"#ffffff"},{body:"#e3f9d9",roof:"#5cc985",door:"#ff9f68",trim:"#fffbe6"},{body:"#fff1b8",roof:"#ff9f43",door:"#c9a0dc",trim:"#ffffff"},{body:"#eadcff",roof:"#9b7bd8",door:"#80ed99",trim:"#fff6fb"},{body:"#ffe0c7",roof:"#e07a5f",door:"#5fb0d8",trim:"#fffaf0"},{body:"#d8f5ef",roof:"#2fb3a3",door:"#ff8fab",trim:"#ffffff"},{body:"#fde2f3",roof:"#e879c6",door:"#ffd166",trim:"#fff"}];function Da(e,t={}){const n=Qi[(e%Qi.length+Qi.length)%Qi.length],s=e%2===1,o=t.lit?"#fff3b0":"#cfe8ff",i=s?`<path d="M22 138 Q22 36 160 30 Q298 36 298 138 Z" fill="${n.roof}" ${Qe}/><path d="M60 110 Q70 60 120 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`:`<path d="M14 140 L160 26 L306 140 Z" fill="${n.roof}" ${Qe}/><path d="M70 110 L140 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`;return`<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="294" rx="150" ry="8" fill="#000" opacity=".12"/>
  <rect x="${s?232:220}" y="${s?36:44}" width="30" height="56" rx="6" fill="${n.trim}" ${Qe}/>
  <rect x="44" y="124" width="232" height="168" rx="20" fill="${n.body}" ${Qe}/>
  ${i}
  <g class="houseWin" fill="${o}"><circle cx="160" cy="${s?92:98}" r="18" ${Qe}/><rect x="62" y="160" width="62" height="58" rx="18" ${Qe}/><rect x="196" y="160" width="62" height="58" rx="18" ${Qe}/></g>
  <path d="M160 ${s?74:80} V${s?110:116} M142 ${s?92:98} H178" ${Qe}/>
  <path d="M93 160 V218 M62 189 H124" ${Qe}/><path d="M227 160 V218 M196 189 H258" ${Qe}/>
  <rect x="56" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${Qe}/><rect x="190" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${Qe}/>
  <circle cx="72" cy="212" r="7" fill="#ff8fab" ${Qe}/><circle cx="92" cy="208" r="7" fill="#ffd166" ${Qe}/><circle cx="112" cy="212" r="7" fill="#ff8fab" ${Qe}/>
  <circle cx="208" cy="212" r="7" fill="#c9a0dc" ${Qe}/><circle cx="228" cy="208" r="7" fill="#80ed99" ${Qe}/><circle cx="248" cy="212" r="7" fill="#c9a0dc" ${Qe}/>
  <path d="M132 292 V226 Q132 196 160 196 Q188 196 188 226 V292 Z" fill="${n.door}" ${Qe}/>
  <circle cx="176" cy="250" r="5" fill="${$e}"/><path d="M146 222 Q160 212 174 222" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>
  <rect x="118" y="286" width="84" height="10" rx="5" fill="${n.trim}" ${Qe}/>
</svg>`}const St={street:`<svg viewBox="0 0 48 48"><circle cx="16" cy="15" r="7" fill="#ffd166" stroke="${$e}" stroke-width="3"/><circle cx="32" cy="15" r="7" fill="#ff8fab" stroke="${$e}" stroke-width="3"/><circle cx="13.5" cy="14.5" r="1.2" fill="${$e}"/><circle cx="18.5" cy="14.5" r="1.2" fill="${$e}"/><circle cx="29.5" cy="14.5" r="1.2" fill="${$e}"/><circle cx="34.5" cy="14.5" r="1.2" fill="${$e}"/><path d="M13 18 q3 2.2 6 0 M29 18 q3 2.2 6 0" fill="none" stroke="${$e}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 40 Q16 28 24 33 Q32 38 40 28" fill="none" stroke="#5cc985" stroke-width="4" stroke-linecap="round"/><circle cx="16" cy="36" r="2.2" fill="#fff" stroke="${$e}" stroke-width="1.5"/><circle cx="32" cy="32" r="2.2" fill="#fff" stroke="${$e}" stroke-width="1.5"/></svg>`,home:`<svg viewBox="0 0 48 48"><path d="M8 22 L24 8 L40 22 V40 H8 Z" fill="#ffd166" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 V28 H28 V40" fill="#fff" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="20" r="2.4" fill="${$e}"/></svg>`,lockOn:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q33 7 33 16 V22" fill="none" stroke="${$e}" stroke-width="4"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#ffd166" stroke="${$e}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${$e}"/></svg>`,lockOff:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q31 7 32.5 13" fill="none" stroke="${$e}" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#b6f0a8" stroke="${$e}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${$e}"/></svg>`,chat:`<svg viewBox="0 0 48 48"><path d="M8 12 Q8 6 14 6 H34 Q40 6 40 12 V26 Q40 32 34 32 H22 L13 40 V32 Q8 32 8 26 Z" fill="#fff3b0" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><circle cx="17" cy="19" r="2.5" fill="${$e}"/><circle cx="24" cy="19" r="2.5" fill="${$e}"/><circle cx="31" cy="19" r="2.5" fill="${$e}"/></svg>`,shield:`<svg viewBox="0 0 48 48"><path d="M24 5 L39 11 V23 Q39 36 24 43 Q9 36 9 23 V11 Z" fill="#c9a0dc" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><path d="M17 24 L22 29 L31 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,solo:`<svg viewBox="0 0 48 48"><path d="M8 24 L24 9 L40 24 V41 H8 Z" fill="#ffd166" stroke="${$e}" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="28" width="10" height="13" rx="4" fill="#fff" stroke="${$e}" stroke-width="2.5"/><path d="M33 7 l2 4 4 .5 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.5z" fill="#ff8fab" stroke="${$e}" stroke-width="1.5"/></svg>`};function Z(e,t=2600){const n=document.createElement("div");n.className="toast",n.textContent=e,(document.getElementById("toastLane")??document.body).appendChild(n),setTimeout(()=>n.classList.add("out"),t),setTimeout(()=>n.remove(),t+400)}function Zp(){return new Promise(e=>{let t=0,n=0,s="",o=0;const i=document.createElement("div");i.className="sheet adult",i.innerHTML='<div class="card adultCard"></div>',document.body.appendChild(i);const a=i.firstElementChild,r=()=>{t=6+Math.floor(Math.random()*4),n=3+Math.floor(Math.random()*7),s="",l()},l=()=>{a.innerHTML=`<button class="close" data-k="x">✕</button><h2>Grown-ups only</h2><p class="q" data-q="${t*n}">What is ${t} × ${n}?</p>
        <div class="ans">${s||"&nbsp;"}</div>
        <div class="pad">${[1,2,3,4,5,6,7,8,9,"⌫",0,"OK"].map(f=>`<button data-k="${f}">${f}</button>`).join("")}</div>`},c=f=>{i.remove(),e(f)};a.addEventListener("click",f=>{const d=f.target.closest("[data-k]")?.dataset.k;if(d){if(d==="x")return c(!1);if(d==="⌫")s=s.slice(0,-1);else if(d==="OK"){if(+s===t*n)return c(!0);if(++o>=3)return c(!1);a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400),r();return}else s.length<3&&(s+=d);l()}}),i.addEventListener("click",f=>{f.target===i&&c(!1)}),r()})}let kn=null,Pc=!0;const C1=e=>{Pc=e};function ge(e,t,n="sine",s=0,o=.15){if(Pc)try{kn??=new(window.AudioContext||window.webkitAudioContext),kn.state==="suspended"&&kn.resume().catch(()=>{});const i=kn.createOscillator(),a=kn.createGain(),r=kn.currentTime,l=Math.max(40,e*(.94+Math.random()*.12));i.type=n,i.frequency.setValueAtTime(l,r),s&&i.frequency.exponentialRampToValueAtTime(Math.max(40,l*s),r+t);const c=Math.min(.02,Math.max(.008,t*.22));if(a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(Math.max(2e-4,o),r+c),a.gain.exponentialRampToValueAtTime(.001,r+Math.max(t,c+.02)),n==="square"||n==="sawtooth"){const f=kn.createBiquadFilter();f.type="lowpass",f.frequency.setValueAtTime(1400,r),f.Q.setValueAtTime(.7,r),i.connect(f).connect(a).connect(kn.destination)}else i.connect(a).connect(kn.destination);i.start(r),i.stop(r+t+.02)}catch{}}const P={pick:()=>ge(520,.12,"sine",1.6),drop:()=>{ge(380,.1,"triangle",.7),setTimeout(()=>ge(620,.08,"sine"),60)},pop:()=>ge(800,.15,"square",.3,.08),click:()=>ge(660,.07,"triangle"),swish:()=>ge(300,.25,"sine",2.5,.1),meow:()=>{ge(700,.12,"triangle",1.3,.1),setTimeout(()=>ge(900,.22,"triangle",.6,.1),110)},purr:()=>[0,90,180,270,360].forEach(e=>setTimeout(()=>ge(70,.09,"sawtooth",1,.05),e)),woof:()=>{ge(260,.09,"square",.6,.09),setTimeout(()=>ge(220,.12,"square",.5,.09),130)},spin:()=>ge(400,.35,"sine",2.2,.08),boing:()=>ge(200,.3,"sine",3,.1),splash:()=>[0,50,110].forEach((e,t)=>setTimeout(()=>ge(900-t*200,.12,"triangle",.4,.06),e)),moo:()=>{ge(160,.5,"sawtooth",.8,.07),setTimeout(()=>ge(140,.45,"sawtooth",.85,.06),380)},baa:()=>[0,90,180].forEach(e=>setTimeout(()=>ge(420,.1,"sawtooth",.95,.05),e)),bleat:()=>[0,70,140,210].forEach(e=>setTimeout(()=>ge(520,.07,"square",1.05,.04),e)),oink:()=>{ge(300,.12,"square",.6,.07),setTimeout(()=>ge(330,.12,"square",.55,.07),160)},peep:()=>[0,120,240].forEach((e,t)=>setTimeout(()=>ge(1800+t*150,.07,"sine",1.2,.08),e)),squeak:()=>ge(1400,.1,"sine",1.5,.08),neigh:()=>{ge(700,.5,"sawtooth",.6,.05),[0,60,120,180,240].forEach(e=>setTimeout(()=>ge(620-e,.06,"triangle",1,.04),300+e))},honk:()=>{ge(330,.18,"square",1,.07),setTimeout(()=>ge(330,.25,"square",1,.07),230)},munch:()=>[0,110,220,330].forEach(e=>setTimeout(()=>ge(180+Math.random()*60,.05,"square",.6,.05),e)),cluck:()=>[0,100,180].forEach((e,t)=>setTimeout(()=>ge(600+t*80,.06,"square",.8,.05),e)),plant:()=>{ge(260,.1,"triangle",.6),setTimeout(()=>ge(520,.1,"sine"),90)},water:()=>[0,60,120,180,240].forEach((e,t)=>setTimeout(()=>ge(1200-t*120,.08,"sine",.7,.05),e)),pickup:()=>[660,880,990].forEach((e,t)=>setTimeout(()=>ge(e,.1,"triangle"),t*60)),sparkle:()=>[880,1100,1320].forEach((e,t)=>setTimeout(()=>ge(e,.12),t*70))},Jd=new Map;function S1(e,t){const n=(e?"s":"o")+(t?"f":"n"),s=Jd.get(n);if(s)return s;const a=`<svg viewBox="0 0 200 260" aria-hidden="true">
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
  </svg>`;return Jd.set(n,a),a}const ni="#5a3d5c";function wr(e){return e&&/^#[0-9a-fA-F]{6}$/.test(e)?e.toLowerCase():"#f1c27d"}const qi={x:60,y:118,w:56,h:40};function P1(e,t,n){return n==="lie"&&e==="over"?null:t&&n==="lie"?{d:"M72 172 C36 200 40 228 88 220",sleeve:"M72 172 C52 186 44 196 42 204",hx:88,hy:220}:t&&n==="sit"?e==="under"?{d:"M72 172 C40 190 46 220 108 228",sleeve:"M72 172 C56 178 46 184 42 188",hx:108,hy:228}:{d:"M128 172 C154 192 150 214 118 208",sleeve:"M128 172 C142 180 148 186 150 190",hx:118,hy:208}:t?e==="under"?{d:"M72 172 C40 196 48 222 112 214",sleeve:"M72 172 C56 178 46 184 42 188",hx:112,hy:214}:{d:"M128 172 C158 180 154 200 124 196",sleeve:"M128 172 C144 178 150 184 154 188",hx:124,hy:196}:n==="lie"?{d:"M22 84 C10 112 14 136 46 130",sleeve:"",hx:46,hy:130}:e==="under"?{d:"M22 84 C14 104 12 128 44 130",sleeve:"",hx:44,hy:130}:{d:"M78 84 C90 98 86 118 64 114",sleeve:"",hx:64,hy:114}}function T1(e,t,n){const s=`M${e-8} ${t-1} Q${e-9} ${t-11} ${e} ${t-11} Q${e+9} ${t-11} ${e+9} ${t} Q${e+9} ${t+9} ${e} ${t+10} Q${e-9} ${t+9} ${e-8} ${t-1} Z`,o=`<ellipse cx="${e+8}" cy="${t-2}" rx="3.2" ry="5" fill="${n}" stroke="${ni}" stroke-width="3.4" transform="rotate(-24 ${e+8} ${t-2})"/>`;return`<path class="cradle-hand" data-cx="${e}" data-cy="${t}" d="${s}" fill="${n}" stroke="${ni}" stroke-width="3.9"/>${o}`}function Si(e,t,n,s,o){const i=P1(e,t,s);if(!i)return"";const a=wr(n),r=o&&/^#[0-9a-fA-F]{6}$/.test(o)?o.toLowerCase():"",l='fill="none" stroke-linecap="round" stroke-linejoin="round"',c=t?16:12,f=t?20.2:15.5;let d=`<path d="${i.d}" ${l} stroke="${ni}" stroke-width="${f}"/><path d="${i.d}" ${l} stroke="${a}" stroke-width="${c}"/>`;t&&i.sleeve&&r&&(d+=`<path d="${i.sleeve}" ${l} stroke="${ni}" stroke-width="29"/><path d="${i.sleeve}" ${l} stroke="${r}" stroke-width="22"/>`);const g=t?T1(i.hx,i.hy,a):`<circle class="cradle-hand" data-cx="${i.hx}" data-cy="${i.hy}" cx="${i.hx}" cy="${i.hy}" r="7" fill="${a}" stroke="${ni}" stroke-width="3.5"/>`;return`<g class="arm cradle">${d}${g}</g>`}const Zi=110,Do=148,ef=80,tf=57,B1=60,R1=133,A1=42,D1=30,I1=60,H1=129,Ni=["feed","burp","change","rock"],Gr=["Bean","Pip","Mochi","Bunny","Dot","Sunny"];function O1(e){let t=null,n=null,s=null,o=!1,i=Number.NaN,a=0,r=0,l=!1,c=!1;const f=typeof navigator<"u"&&!!navigator.webdriver;function d(T,R,N,V,z){T.style.left=(R-V/2)/Tt*100+"%",T.style.top=(N-z)/En*100+"%",T.style.width=V/Tt*100+"%",T.style.height=z/En*100+"%"}function g(T){const R=T.scale&&T.scale>0?T.scale:1,N=T.pose==="sit"||T.pose==="lie"?T.pose:null,V=T.chibi&&T.pose!=="sit"&&T.pose!=="lie",z=V?qi.x:T.chibi?I1:B1,j=V?qi.y:T.chibi?H1:R1,pe=V?qi.w:T.chibi?A1:ef,Le=V?qi.h:T.chibi?D1:tf,me=bu(z,j,N,!!T.lieFlip,R),We=N==="lie"?me.x:T.flip?-me.x:me.x,D=pe*R,W=Le*R;return{x:T.x+We,y:T.y+me.y+W/2,w:D,h:W}}function h(T,R){let N=null,V=0;for(let z=0;z<Ni.length;z++){const j=Ni[z],pe=T.at?.[j]??0;pe>0&&R-pe>=0&&R-pe<1100&&pe>=V&&(N=j,V=pe)}return N}function m(T){if(T.mood<=2||!e.canSend()){window.clearTimeout(a),i=Number.NaN;return}if(i===T.since)return;window.clearTimeout(a),i=T.since;const R=Math.max(0,T.since+_l-e.clock());a=window.setTimeout(()=>{i=Number.NaN;const N=e.get().baby;!N||N.mood<=2||!e.canSend()||e.dispatch({type:"baby/ease",now:e.clock()})},R)}function k(T,R){window.clearTimeout(r);let N=0;for(let V=0;V<Ni.length;V++){const z=T.at?.[Ni[V]]??0;R-z>=0&&R-z<1100&&z>N&&(N=z)}N&&(r=window.setTimeout(()=>Ze(),Math.max(0,1100-(R-N))))}function _(T,R){if(typeof document.elementsFromPoint!="function")return null;const N=document.elementsFromPoint(T,R),V=e.get(),z=V.rooms[V.currentRoom]?.items??[];for(let j=0;j<N.length;j++){const pe=N[j];if(!pe||typeof pe.closest!="function"||pe.closest(".baby, .babyCare, .babyMeet"))continue;const Le=pe.closest(".item");if(!Le)continue;const me=Le.dataset.id||"";for(let We=0;We<z.length;We++){const D=z[We];if(D.id===me&&(Bs(D.kind)||e.box(D)))return D}}return null}function y(T){T.addEventListener("pointerdown",R=>{if(R.button!==0)return;const N=e.get().baby;if(!N)return;if(R.preventDefault(),R.stopPropagation(),N.spot==="arms"&&N.holder&&N.holder!==e.holderId()&&e.holderHere(N.holder)){Z("Someone is cuddling!");return}if(!e.editable()){e.locked();return}if(!e.canSend())return;const V=e.owner(),z=V,j=R.clientX,pe=R.clientY,Le=R.pointerId;let me=!1;const We=W=>{if(W.pointerId!==Le||(Math.hypot(W.clientX-j,W.clientY-pe)>6&&(me=!0),!z||!me))return;o=!0;const Ye=e.toRoom(W.clientX,W.clientY);d(T,Ye.x,Ye.y,Zi,Do)},D=W=>{if(W.pointerId!==Le)return;window.removeEventListener("pointermove",We),window.removeEventListener("pointerup",D),window.removeEventListener("pointercancel",D);const Ye=o&&me&&z;if(o=!1,W.type==="pointercancel"){Ze();return}if(Ye){const ft=document.elementFromPoint(W.clientX,W.clientY)?.closest(".tab[data-room]");if(ft&&ft.dataset.room){const To=ft.dataset.room,d0=e.toRoom(W.clientX,W.clientY),Ld=Au(d0.x,Tt);To!==e.get().currentRoom&&e.dispatch({type:"room/switch",room:To}),e.dispatch({type:"baby/place",room:To,x:Ld.x,y:Ld.y,spot:"mat",bed:null,seat:null,now:e.clock()}),P.drop();return}const ds=e.toRoom(W.clientX,W.clientY),an=_(W.clientX,W.clientY),Vr=an?e.box(an):null,fs=Ru({mode:e.play()?"play":"decorate",releaseX:Math.max(0,Math.min(Tt,ds.x)),releaseY:Math.max(0,Math.min(En,ds.y)),piece:Vr,occupied:e.occupied()});e.dispatch({type:"baby/place",room:e.get().currentRoom,x:fs.x,y:fs.y,spot:fs.spot,bed:fs.bed,seat:fs.seat,now:e.clock()}),P.drop();return}if(me){Ze();return}const at=e.get().baby;if(!at)return;if(at.spot==="arms"&&at.holder===e.holderId()){const ft=e.toRoom(W.clientX,W.clientY);e.dispatch({type:"baby/hold",holder:null,room:e.get().currentRoom,x:Math.max(0,Math.min(Tt,ft.x)),y:Math.max(40,Math.min(En,ft.y)),now:e.clock()}),P.drop();return}const Ue=e.holderSpot(),Re=Ue?g(Ue):null,Ee=Re?Re.x:at.x,dt=Re?Math.max(40,Re.y):at.y;e.dispatch({type:"baby/hold",holder:e.holderId(),room:e.get().currentRoom,x:Ee,y:dt,now:e.clock()}),P.pick()};window.addEventListener("pointermove",We),window.addEventListener("pointerup",D),window.addEventListener("pointercancel",D)})}function u(){return t&&t.isConnected||(t=document.createElement("div"),t.className="baby",t.dataset.baby="1",t.innerHTML='<div class="hit"></div><div class="babySpin"><div class="babyRock"><div class="babyInner"></div></div></div><div class="babyZzz" hidden>z z z</div><div class="babyBurp" hidden><i></i></div>',e.layer.appendChild(t),y(t)),t}function v(T,R){const N=T.querySelector(".babyWord");N&&(N.textContent=$u(R));const V=T.querySelectorAll(".babyBlossom"),z=xu(R);for(let pe=0;pe<V.length;pe++)V[pe].classList.toggle("on",pe<z);const j=T.querySelector(".babyMeter");j&&(j.dataset.mood=String(R))}function x(T){const R=Op(T);if(!R){Z("Try another name!");return}const N=e.get().baby;!N||N.name===R||(e.dispatch({type:"baby/name",name:R}),P.click())}function A(T){n=document.createElement("div"),n.className="babyCare",n.dataset.babyCare="1";const R=[];for(let z=0;z<5;z++)R.push('<i class="babyBlossom"></i>');const N=[];for(let z=0;z<Gr.length;z++)N.push(`<button type="button" data-preset="${Gr[z]}">${Gr[z]}</button>`);n.innerHTML=`<p class="babyWord"></p><span class="babyMeter"><span class="babyBlossoms">${R.join("")}</span></span>
      <button type="button" data-care="feed">Bottle</button>
      <button type="button" data-care="burp">Burp</button>
      <button type="button" data-care="change">Diaper</button>
      <button type="button" data-care="rock">Rock</button>
      <button type="button" data-baby-name-open>Name</button>
      <div class="babyNames" hidden>
        <input type="text" maxlength="14" autocomplete="off" enterkeyhint="done" aria-label="Baby name" value="">
        ${N.join("")}
      </div>`,v(n,T.mood),n.addEventListener("pointerdown",z=>z.stopPropagation()),n.addEventListener("click",z=>{const j=z.target,pe=j.closest("[data-care]");if(pe&&pe.dataset.care){if(!e.editable()){e.locked();return}if(!e.canSend())return;const me=pe.dataset.care;e.dispatch({type:"baby/care",care:me,now:e.clock()}),me==="rock"?P.purr():me==="feed"?P.sparkle():P.click();return}if(j.closest("[data-baby-name-open]")){if(!e.owner())return;c=!c;const me=n?.querySelector(".babyNames");me&&(me.hidden=!c);const We=n?.querySelector("input");c&&We&&(We.value=e.get().baby?.name??"",We.focus());return}const Le=j.closest("[data-preset]");if(Le&&e.owner()){x(Le.dataset.preset||"");return}}),n.querySelector("input")?.addEventListener("keydown",z=>{z.key==="Enter"&&(z.preventDefault(),x(z.target.value))}),e.stageWrap.appendChild(n)}function O(T,R){if(!e.play()){H();return}const N=n&&document.activeElement&&n.contains(document.activeElement);if((!n||!n.isConnected)&&A(T),!n)return;n.hidden=!1,v(n,T.mood);const V=n.querySelector("[data-baby-name-open]");V&&(V.hidden=!R);const z=n.querySelector(".babyNames");z&&(z.hidden=!R||!c);const j=n.querySelector("input");j&&!N&&(j.value=T.name),X()}function H(){c=!1,n&&(n.remove(),n=null),X()}function X(){const T=!!(n&&n.isConnected&&!n.hidden),R=document.body.classList.contains("baby-card");document.body.classList.toggle("baby-card",T),R!==T&&window.dispatchEvent(new Event("resize"))}function le(T){if(!T||f){s&&(s.remove(),s=null);return}if(s&&s.isConnected){s.hidden=!1;return}s=document.createElement("button"),s.type="button",s.className="babyMeet",s.textContent="Meet the baby",s.addEventListener("pointerdown",R=>R.stopPropagation()),s.addEventListener("click",()=>{if(!e.editable()){e.locked();return}!e.canSend()||e.get().baby||(e.dispatch({type:"baby/meet",now:e.clock()}),P.sparkle())}),e.stageWrap.appendChild(s)}function ce(){const T=e.get().rooms.nursery?.items??[];for(let R=0;R<T.length;R++)if(Bs(T[R].kind)==="crib")return!0;return!1}function G(T,R){T.classList.remove("baby-lie","baby-lie-r","baby-cradle","cradle-lie","flipped");const N=e.get().currentRoom;if((R.spot==="crib"||R.spot==="bassinet")&&R.bed){const V=e.get().rooms[R.room]?.items.find(j=>j.id===R.bed)??null,z=V?e.box(V):null;if(V&&z){const j=Mp(V.kind,z);d(T,j.x,j.y+Do/2,Zi,Do),T.style.zIndex=String(1e3+V.z+1),T.classList.add("baby-lie"),V.flip&&T.classList.add("baby-lie-r");return}}if(R.spot==="arms"){const V=R.holder?e.holderSpot(R.holder):null,z=V?g(V):null,j=z?z.x:R.x,pe=z?z.y:R.y,Le=z?z.w:ef,me=z?z.h:tf;d(T,j,pe,Le,me),T.style.zIndex=String(5e3+Math.round(V?V.y:R.y)+2),T.classList.add("baby-cradle"),T.style.setProperty("--spin-w",(me/Le*100).toFixed(4)+"%"),T.style.setProperty("--spin-h",(Le/me*100).toFixed(4)+"%"),V&&V.pose==="lie"&&T.classList.add("cradle-lie"),V&&(V.pose==="lie"?V.lieFlip:V.flip)&&T.classList.add("flipped");return}if(R.spot==="mat"&&R.seat){const V=e.seatAt(N,R.seat,R);d(T,V.x,V.y,Zi,Do);const z=e.get().rooms[N]?.items.find(j=>j.id===R.seat?.item);T.style.zIndex=String(1e3+(z?.z??0)+1),R.seat.pose==="lie"&&(T.classList.add("baby-lie"),z?.flip&&T.classList.add("baby-lie-r"));return}d(T,R.x,R.y,Zi,Do),T.style.zIndex=String(5e3+Math.round(R.y))}function fe(T){if(T.spot!=="arms"||!T.holder)return!1;const R=e.get().characters.find(N=>N.id===T.holder);return!!R&&R.room!==T.room}function on(T){o||!fe(T)||!e.canSend()||!e.editable()||e.dispatch({type:"baby/hold",holder:null,room:T.room,x:T.x,y:Li,now:e.clock()})}function Ot(T){if(o||fe(T)||T.spot!=="arms"||T.holder!==e.holderId()||!e.canSend()||!e.editable())return;const R=e.holderSpot();if(!R)return;const N=e.get().currentRoom;if(T.room===N)return;const V=g(R);e.dispatch({type:"baby/hold",holder:T.holder,room:N,x:V.x,y:Math.max(40,V.y),now:e.clock()})}function Ze(){const T=e.get(),R=T.baby,N=!!R&&R.spot==="arms"&&!!R.holder&&!!e.holderSpot(R.holder),V=!!R&&R.spot==="arms"&&R.holder===e.holderId()&&!!e.holderSpot(),z=!!(R&&e.inHouse()&&(R.room===T.currentRoom||N||V));if(!R||!z){t&&(t.remove(),t=null),o=!1,H(),window.clearTimeout(a),i=Number.NaN;const Ee=!f&&!R&&e.inHouse()&&e.owner()&&e.editable()&&e.canSend()&&T.currentRoom==="nursery"&&ce();le(Ee);return}le(!1),ko()&&!Is("baby")&&!l&&(l=!0,kr(["baby"]).then(()=>Ze()));const j=u(),pe=e.clock(),Le=h(R,pe),me=Le==="rock",We=Le==="change",D=!me&&!We&&ko()?Is("baby"):"",W=j.querySelector(".babyInner"),Ye=(D||"svg")+(me?"s":"")+(We?"f":"");W&&j.dataset.look!==Ye&&(W.innerHTML=D?`<img class="artimg" alt="" draggable="false" src="${D}">`:S1(me,We),j.dataset.look=Ye),j.dataset.babySpot=R.spot,j.dataset.babyMood=String(R.mood),j.dataset.babyName=R.name,j.classList.toggle("is-feed",Le==="feed"),j.classList.toggle("is-burp",Le==="burp"),j.classList.toggle("is-change",Le==="change"),j.classList.toggle("is-rock",Le==="rock");const at=j.querySelector(".babyZzz"),Ue=j.querySelector(".babyBurp"),Re=(R.spot==="crib"||R.spot==="bassinet")&&!Le;at&&(at.hidden=!Re),Ue&&(Ue.hidden=Le!=="burp"),o&&j.isConnected||G(j,R),O(R,e.owner()),m(R),k(R,pe),on(R),Ot(R)}return{render:Ze}}const W1={hip:0,head:3,armL:26,armR:-22,legL:-76,legR:76,legLLift:8,legRLift:8},U1={hip:0,head:-8,armL:18,armR:-12,legL:-4,legR:6,legLLift:0,legRLift:0};function vr(e){return e==="sit"?W1:e==="lie"?U1:null}const Ne="#5a3d5c",te=(e=4)=>`stroke="${Ne}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Tc=600,Gt=250,hs=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})">
  <rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${te()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${te()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${te()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${te()}/>
  <circle cx="-18" cy="-78" r="9" fill="#fff" opacity=".35"/></g>`,V1=(e,t,n)=>`<g transform="translate(${e} ${t})"><path d="M0 0 V-16" ${te(3)}/>${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*6}" cy="${-20+Math.sin(s*Math.PI/180)*6}" r="5" fill="${n}" ${te(2)}/>`).join("")}<circle cx="0" cy="-20" r="4" fill="#ffd166" ${te(2)}/></g>`,nf=e=>`<g transform="translate(${e} 0)">
  <rect x="-80" y="452" width="160" height="12" rx="6" fill="#ff9f68" ${te()}/><rect x="-80" y="470" width="160" height="12" rx="6" fill="#ff9f68" ${te()}/>
  <rect x="-70" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${te(3)}/><rect x="60" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${te(3)}/>
  <rect x="-86" y="490" width="172" height="14" rx="7" fill="#ffb385" ${te()}/></g>`;function z1(){const e=Ec,t=Array.from({length:Math.floor((lt.x1-lt.x0+40)/34)},(n,s)=>`<path d="M${lt.x0-20+s*34} 470 V428 l8 -10 l8 10 V470 Z" fill="#fff6e6" ${te(3)}/>`).join("");return`<svg class="parkScene" viewBox="0 0 ${e} ${Tc}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient>
  <pattern id="pkCheck" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><rect width="15" height="15" fill="#ff8fab"/><rect x="15" y="15" width="15" height="15" fill="#ff8fab"/></pattern></defs>
  <rect width="${e}" height="440" fill="url(#pkSky)"/>
  ${[180,900,1600,2300].map((n,s)=>`<g transform="translate(${n} ${70+s%2*30})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <circle cx="${e-220}" cy="90" r="46" fill="#ffe066" ${te(4)}/>
  <path d="M-50 360 Q500 220 1100 340 T2300 330 T${e+100} 350 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#9fe0aa"/><path d="M0 410 H${e}" ${te(4)}/>
  <path d="M0 560 Q700 520 1400 565 T${e} 545 V600 H0 Z" fill="#f6e3c3" opacity=".9"/>
  ${hs(260,390,.9)}${hs(720,380,1.05,"#4fbf7a")}${hs(1230,385,.8)}${hs(1640,380,1,"#4fbf7a")}${hs(1990,388,.85)}${hs(2380,380,.95)}${hs(2860,390,.9,"#4fbf7a")}
  ${[[300,470,"#ff8fab"],[690,455,"#c9a0dc"],[1210,470,"#ffd166"],[1960,450,"#8ecae6"],[2390,470,"#ff8fab"],[1580,590,"#c9a0dc"],[140,585,"#ffd166"]].map(([n,s,o])=>V1(+n,+s,String(o))).join("")}
  <!-- gate back to the street -->
  <g><rect x="40" y="300" width="22" height="200" rx="6" fill="#c99366" ${te()}/><rect x="168" y="300" width="22" height="200" rx="6" fill="#c99366" ${te()}/>
    <path d="M30 312 Q115 240 200 312" fill="none" stroke="${Ne}" stroke-width="16" stroke-linecap="round"/><path d="M30 312 Q115 240 200 312" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
    <rect x="62" y="252" width="106" height="36" rx="12" fill="#fff6e6" ${te(3)}/><text x="115" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="${Ne}" font-family="Nunito, system-ui, sans-serif">PARK</text></g>
  <!-- swing set (seats are separate so they can swing) -->
  <g><path d="M350 ${Gt} L310 500 M350 ${Gt} L390 500 M650 ${Gt} L610 500 M650 ${Gt} L690 500" stroke="${Ne}" stroke-width="14" stroke-linecap="round"/>
    <path d="M350 ${Gt} L310 500 M350 ${Gt} L390 500 M650 ${Gt} L610 500 M650 ${Gt} L690 500" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/>
    <rect x="330" y="${Gt-10}" width="340" height="20" rx="10" fill="#ff8fab" ${te()}/></g>
  <!-- slide -->
  <g><path d="M${he.ladder-20} 560 V${he.top.y} M${he.ladder+30} 560 V${he.top.y}" stroke="${Ne}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${he.ladder-20} 560 V${he.top.y} M${he.ladder+30} 560 V${he.top.y}" stroke="#c9a0dc" stroke-width="6" stroke-linecap="round"/>
    ${[380,420,460,500,540].map(n=>`<path d="M${he.ladder-20} ${n} H${he.ladder+30}" ${te(5)}/>`).join("")}
    <rect x="${he.ladder-30}" y="${he.top.y-14}" width="100" height="18" rx="8" fill="#ffd166" ${te()}/>
    <path d="M${he.ladder+60} ${he.top.y-10} C 1000 ${he.top.y} 1010 520 ${he.bottom.x+40} 548 L${he.bottom.x+40} 572 C 990 548 975 ${he.top.y+30} ${he.ladder+60} ${he.top.y+14} Z" fill="#ffd166" ${te()}/>
    <path d="M${he.ladder+70} ${he.top.y-2} C 990 ${he.top.y+8} 1000 525 ${he.bottom.x+30} 552" fill="none" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/></g>
  <!-- splash pond -->
  <g class="pondArt"><ellipse cx="1420" cy="515" rx="185" ry="52" fill="#8ecae6" ${te()}/><ellipse cx="1420" cy="510" rx="150" ry="36" fill="#b5e3f5"/>
    <ellipse cx="1340" cy="520" rx="24" ry="9" fill="#80ed99" ${te(3)}/><ellipse cx="1500" cy="505" rx="20" ry="8" fill="#80ed99" ${te(3)}/>
    <g transform="translate(1440 500)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ffd166" ${te(3)}/><circle cx="16" cy="-12" r="9" fill="#ffd166" ${te(3)}/><path d="M24 -12 l8 2 l-8 3 z" fill="#ff9f68" ${te(2)}/><circle cx="18" cy="-14" r="1.8" fill="${Ne}"/></g></g>
  <!-- picnic blanket -->
  <g><path d="M1670 530 L1910 530 L1940 580 L1640 580 Z" fill="url(#pkCheck)" ${te()}/>
    <g transform="translate(1915 520)"><rect x="-26" y="-20" width="52" height="32" rx="8" fill="#e6b88a" ${te(3)}/><path d="M-18 -20 Q0 -46 18 -20" fill="none" ${te(4)}/><circle cx="-10" cy="-24" r="7" fill="#ff6b6b" ${te(2)}/></g></g>
  ${nf(2065)}${nf(2265)}
  <!-- dog area -->
  <g>${t}<path d="M${lt.x0-20} 440 H${lt.x1+20}" ${te(3)}/>
    <g transform="translate(${lt.x0+10} 380)"><rect x="-6" y="0" width="12" height="70" fill="#c99366" ${te(3)}/><rect x="-55" y="-34" width="110" height="38" rx="10" fill="#fff6e6" ${te(3)}/>
      <text x="0" y="-8" text-anchor="middle" font-size="20" font-weight="900" fill="${Ne}" font-family="Nunito, system-ui, sans-serif">DOGS 🐾</text></g>
    <g transform="translate(${lt.x1-30} 470)"><path d="M-50 0 V-60 L0 -100 L50 -60 V0 Z" fill="#ff8fab" ${te()}/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="${Ne}" stroke-width="14" stroke-linecap="round"/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="#c9a0dc" stroke-width="8" stroke-linecap="round"/><path d="M-20 0 V-30 a20 20 0 0 1 40 0 V0 Z" fill="#5a3d5c"/></g>
    <g transform="translate(${lt.x0+120} 500)"><rect x="-12" y="-30" width="24" height="34" rx="8" fill="#ff6b6b" ${te(3)}/><rect x="-18" y="-18" width="36" height="8" rx="4" fill="#ff6b6b" ${te(3)}/><circle cx="0" cy="-32" r="10" fill="#ff6b6b" ${te(3)}/></g></g>
  </svg>`}const Q1=`<svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M10 0 V222 M50 0 V222" stroke="${Ne}" stroke-width="4"/><rect x="0" y="216" width="60" height="14" rx="6" fill="#ff9f68" ${te(3)}/></svg>`,q1=`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffd166" ${te(3)}/><path d="M6 16 Q20 24 34 16 M8 27 Q20 19 32 27" fill="none" stroke="#fff" stroke-width="3"/></svg>`,Z1=`<svg viewBox="0 0 48 48"><rect x="20" y="28" width="8" height="14" rx="3" fill="#c99366" stroke="${Ne}" stroke-width="3"/><circle cx="24" cy="20" r="13" fill="#5cc985" stroke="${Ne}" stroke-width="3"/><circle cx="19" cy="16" r="3" fill="#fff" opacity=".5"/></svg>`,Np=`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8" fill="#ff8fab" stroke="${Ne}" stroke-width="3"/><circle cx="13" cy="20" r="4.5" fill="#ff8fab" stroke="${Ne}" stroke-width="3"/><circle cx="20" cy="13" r="4.5" fill="#ff8fab" stroke="${Ne}" stroke-width="3"/><circle cx="28" cy="13" r="4.5" fill="#ff8fab" stroke="${Ne}" stroke-width="3"/><circle cx="35" cy="20" r="4.5" fill="#ff8fab" stroke="${Ne}" stroke-width="3"/></svg>`,N1=`<svg viewBox="0 0 48 48"><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="${Ne}" stroke-width="4" stroke-linecap="round"/><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="#ff9f68" stroke-width="2"/><path d="M16 40 V26 M24 40 V22 M32 40 V26" stroke="${Ne}" stroke-width="3" stroke-linecap="round"/></svg>`,wt="#5a3d5c",ve=`stroke="${wt}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Yr=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${wt}"/><circle cx="${t}" cy="${n}" r="3" fill="${wt}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,Kr=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,Fi='<ellipse cx="50" cy="97" rx="34" ry="3" fill="#000" opacity=".12"/>',F1=`<svg viewBox="0 0 40 30"><path d="M4 30 V16 Q4 2 20 2 Q36 2 36 16 V30 Z" fill="#3b2a3d" ${ve}/><circle cx="14" cy="18" r="1.6" fill="#fff" opacity=".8"/><circle cx="22" cy="18" r="1.6" fill="#fff" opacity=".8"/></svg>`,j1=`<svg viewBox="0 0 48 30"><path d="M4 27 Q10 22 22 23 L42 23 Q46 27 42 28 H6 Z" fill="#cdeccf" ${ve}/><circle cx="26" cy="15" r="11" fill="#ffb3c6" ${ve}/><path d="M26 15 m-5 0 a5 5 0 1 1 5 5" fill="none" ${ve}/><path d="M8 23 L5 13 M12 23 L12 13" ${ve}/></svg>`,G1=`<svg viewBox="0 0 30 30"><path d="M15 2 l3.6 8 8.4 1 -6.3 5.8 1.8 8.4 -7.5 -4.4 -7.5 4.4 1.8 -8.4 L3 11 l8.4 -1z" fill="#fff3b0" ${ve}/></svg>`,Y1=`<svg viewBox="0 0 30 22"><ellipse cx="15" cy="13" rx="13" ry="8" fill="#e6b88a" ${ve}/><circle cx="10" cy="11" r="1.8" fill="${wt}"/><circle cx="18" cy="14" r="1.8" fill="${wt}"/><circle cx="16" cy="9" r="1.5" fill="${wt}"/></svg>`,K1=`<svg viewBox="0 0 30 28"><path d="M15 26 C3 18 1 10 6 5 C10 1 14 4 15 7 C16 4 20 1 24 5 C29 10 27 18 15 26 Z" fill="#ffc8dd" ${ve}/></svg>`,Ia=[{name:"Cada",room:"living",x:150,y:382,w:40,h:30,taps:3,spot:F1,hello:"Squeak! Hi Cada!",item:{kind:"egg:cada-mouse",name:"Cada's Mouse",cat:"secrets",w:80,holdable:!0,svg:`${Fi}<path d="M78 74 Q96 68 92 52" stroke="#ff9bb5" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="28" ry="18" fill="#d6d6e8" ${ve}/><circle cx="28" cy="40" r="13" fill="#d6d6e8" ${ve}/><circle cx="62" cy="38" r="13" fill="#d6d6e8" ${ve}/><circle cx="28" cy="40" r="7" fill="#ffc8dd"/><circle cx="62" cy="38" r="7" fill="#ffc8dd"/><circle cx="45" cy="56" r="20" fill="#e4e4f2" ${ve}/>${Yr(38,52,54)}<circle cx="45" cy="64" r="3" fill="#ff8fab"/>${Kr(32,58,62)}<text x="50" y="96" font-size="11" font-weight="900" text-anchor="middle" fill="${wt}">C</text>`}},{name:"Sloane",room:"living",x:2290,y:383,w:48,h:30,taps:3,spot:j1,hello:"Hi Sloane! ✨",item:{kind:"egg:sloane-snail",name:"Sloane's Rainbow Snail",cat:"secrets",w:110,holdable:!0,svg:`${Fi}<path d="M6 92 Q14 80 36 82 L84 82 Q94 90 84 94 H10 Z" fill="#cdeccf" ${ve}/><circle cx="56" cy="52" r="32" fill="#ff8fab" ${ve}/><circle cx="56" cy="52" r="24" fill="#ffd166"/><circle cx="56" cy="52" r="17" fill="#80ed99"/><circle cx="56" cy="52" r="10" fill="#8ecae6"/><circle cx="56" cy="52" r="4" fill="#c9a0dc"/><circle cx="56" cy="52" r="32" fill="none" ${ve}/><path d="M14 82 L8 60 M24 82 L24 60" ${ve}/><circle cx="8" cy="58" r="4" fill="${wt}"/><circle cx="24" cy="58" r="4" fill="${wt}"/>${Kr(14,30,76)}`}},{name:"Chloe",room:"bedroom",x:2230,y:92,w:30,h:30,taps:5,spot:G1,item:{kind:"egg:chloe-starlamp",name:"Chloe's Star Lamp",cat:"secrets",w:100,holdable:!0,svg:`${Fi}<circle cx="50" cy="38" r="34" fill="#fff3b0" opacity=".6"/><path d="M50 6 l8 17 19 2.5 -14 13 4 19 -17 -9.5 -17 9.5 4 -19 -14 -13 19 -2.5z" fill="#ffd166" ${ve}/>${Yr(43,57,38)}<path d="M45 46 q5 4 10 0" ${ve} fill="none"/><rect x="46" y="66" width="8" height="22" rx="4" fill="#c9a0dc" ${ve}/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#b388d6" ${ve}/><text x="50" y="93" font-size="8" font-weight="900" text-anchor="middle" fill="#fff">CHLOE</text>`}},{name:"Quinn",room:"kitchen",x:80,y:588,w:30,h:22,taps:4,spot:Y1,hello:"Woof! Hi Quinn!",item:{kind:"egg:quinn-pup",name:"Quinn's Cookie Pup",cat:"secrets",w:110,holdable:!0,svg:`${Fi}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#e6b88a" ${ve}/><circle cx="50" cy="44" r="27" fill="#f2d0a4" ${ve}/><ellipse cx="24" cy="46" rx="10" ry="17" fill="#b07d54" ${ve}/><ellipse cx="76" cy="46" rx="10" ry="17" fill="#b07d54" ${ve}/>${Yr(41,59,42)}<ellipse cx="50" cy="53" rx="5" ry="4" fill="${wt}"/>${Kr(34,66,54)}<circle cx="84" cy="80" r="10" fill="#e6b88a" ${ve}/><circle cx="81" cy="78" r="1.8" fill="${wt}"/><circle cx="87" cy="82" r="1.8" fill="${wt}"/><text x="50" y="30" font-size="10" font-weight="900" text-anchor="middle" fill="${wt}">Q</text>`}},{name:"Reagan",room:"salon",x:2300,y:352,w:30,h:28,taps:5,spot:K1,item:{kind:"egg:reagan-frame",name:"Reagan's Frame",cat:"secrets",w:120,wall:!0,svg:`<rect x="8" y="10" width="84" height="84" rx="16" fill="#ff8fab" ${ve}/><rect x="18" y="20" width="64" height="64" rx="10" fill="#fff3f7" ${ve}/><text x="50" y="72" font-size="52" font-weight="900" text-anchor="middle" fill="#e879c6" stroke="${wt}" stroke-width="2.5">R</text><circle cx="14" cy="16" r="6" fill="#ffd166" ${ve}/><circle cx="86" cy="88" r="6" fill="#ffd166" ${ve}/><path d="M76 24 l2 4 4 .5 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.5z" fill="#ffd166"/>`}}],X1=Ia.map(e=>({...e.item,rooms:["any"],secret:e.name})),Fp=Nt("cozy-secrets"),_r=()=>{try{return new Set(JSON.parse(localStorage.getItem(Fp)??"[]"))}catch{return new Set}},J1=e=>localStorage.setItem(Fp,JSON.stringify([...e]));function e2(e){const t=document.createElement("div");t.className="eggs",e.world.appendChild(t);const n=new Map;for(const o of Ia){const i=document.createElement("div");i.className="eggspot",i.dataset.egg=o.name,i.style.left=(o.x-o.w/2)/e.roomW*100+"%",i.style.top=(o.y-o.h)/e.roomH*100+"%",i.style.width=o.w/e.roomW*100+"%",i.style.height=o.h/e.roomH*100+"%",i.innerHTML=o.spot,t.appendChild(i),i.addEventListener("pointerdown",a=>a.stopPropagation()),i.addEventListener("click",a=>{a.stopPropagation();const r=Date.now(),l=n.get(o.name)??{n:0,t:0};if(l.n=r-l.t<1500?l.n+1:1,l.t=r,n.set(o.name,l),i.classList.remove("poke"),i.offsetWidth,i.classList.add("poke"),e.tap(),l.n<o.taps)return;l.n=0;const c=_r(),f=!c.has(o.name);c.add(o.name),J1(c),t2(o,i),e.sparkle(),e.onFound(o.name,f)})}const s=()=>{const o=e.currentRoom();t.querySelectorAll(".eggspot").forEach(i=>{i.style.display=Ia.find(a=>a.name===i.dataset.egg).room===o?"":"none"})};return s(),{update:s}}function t2(e,t){if(e.hello){const s=document.createElement("div");s.className="eggpop",s.innerHTML=`<div class="eggcritter"><svg viewBox="0 0 100 100">${e.item.svg}</svg></div><div class="bubble">${e.hello}</div>`,t.appendChild(s),setTimeout(()=>s.remove(),3200)}const n=document.createElement("div");n.className="eggbanner",n.innerHTML=`<span class="sp">✨</span><span class="nm">${[...e.name].map((s,o)=>`<i style="animation-delay:${o*70}ms">${s}</i>`).join("")}</span><span class="sp">✨</span>`,document.body.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3100),jp()}function jp(e=70){const t=["#ff8fab","#ffd166","#8ecae6","#80ed99","#c9a0dc","#ff9f68"],n=document.createElement("div");n.className="confetti",document.body.appendChild(n);for(let s=0;s<e;s++){const o=document.createElement("i");o.style.left=Math.random()*100+"vw",o.style.background=t[s%t.length],o.style.animationDelay=Math.random()*.5+"s",o.style.animationDuration=1.6+Math.random()*1.2+"s",o.style.setProperty("--r",Math.random()*720-360+"deg"),o.style.setProperty("--dx",Math.random()*160-80+"px"),s%3===0&&(o.style.borderRadius="50%"),n.appendChild(o)}setTimeout(()=>n.remove(),3600)}const n2=`[
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
  }
]`,s2=`[
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
`,o2="/kids-house-game/assets/alarm-clock-DOVobLzL.png",i2="/kids-house-game/assets/alarm-clock-BCd1-e86.svg",a2="/kids-house-game/assets/bedtime-snack-COvX4Nqo.png",r2="/kids-house-game/assets/bedtime-snack-BoNDQqOK.svg",l2="/kids-house-game/assets/book-stack-BlyqbTA1.png",c2="/kids-house-game/assets/book-stack-upnp1NwG.svg",d2="/kids-house-game/assets/bunk-bed-COiQly1s.png",f2="/kids-house-game/assets/bunk-bed-YZiRWNFR.svg",p2="/kids-house-game/assets/bunny-slippers-DajXa_JK.png",g2="/kids-house-game/assets/bunny-slippers-PNucIc_Q.svg",h2="/kids-house-game/assets/canopy-bed-Db9GIfyT.png",u2="/kids-house-game/assets/canopy-bed-BwWkRhe2.svg",m2="/kids-house-game/assets/cat-bed-ChP4s69B.png",y2="/kids-house-game/assets/cat-bed-B8ULFbHc.svg",b2="/kids-house-game/assets/cloud-rug-Bv3GScgR.png",k2="/kids-house-game/assets/cloud-rug-CFl6aZc5.svg",w2="/kids-house-game/assets/cloud-shelf-BAmU3DSp.png",v2="/kids-house-game/assets/cloud-shelf-DF5b_IoZ.svg",_2="/kids-house-game/assets/cork-board-B8yw-MFd.png",$2="/kids-house-game/assets/cork-board-Bj5OuLbv.svg",x2="/kids-house-game/assets/daisy-pot-BQDVlAug.png",M2="/kids-house-game/assets/daisy-pot-Cy8SrSS6.svg",L2="/kids-house-game/assets/desk-UTaBcI2Q.png",E2="/kids-house-game/assets/desk-2rRtV3Vk.svg",C2="/kids-house-game/assets/dino-plush-yhz7rVZD.png",S2="/kids-house-game/assets/dino-plush-Dq_qccf0.svg",P2="/kids-house-game/assets/doll-house-DfYMaHqJ.png",T2="/kids-house-game/assets/doll-house-BrC3RiST.svg",B2="/kids-house-game/assets/dresser-jJcAkDG_.png",R2="/kids-house-game/assets/dresser-__9TGuYc.svg",A2="/kids-house-game/assets/egg-chair-DobnnZdC.png",D2="/kids-house-game/assets/egg-chair-CtiaqWNQ.svg",I2="/kids-house-game/assets/floor-fan-C2R5oDHp.png",H2="/kids-house-game/assets/floor-fan-Dt9SIAmB.svg",O2="/kids-house-game/assets/guinea-pig-BzHyXlGo.png",W2="/kids-house-game/assets/guinea-pig-CwLeNU_S.svg",U2="/kids-house-game/assets/hamster-cage-zv59jo6b.png",V2="/kids-house-game/assets/hamster-cage-lQ6r7saV.svg",z2="/kids-house-game/assets/heart-rug-DYGPCKpT.png",Q2="/kids-house-game/assets/heart-rug-CBDvH6Q6.svg",q2="/kids-house-game/assets/lava-lamp-Df-lJpLx.png",Z2="/kids-house-game/assets/lava-lamp-DEuHvlco.svg",N2="/kids-house-game/assets/moon-night-light-JPI5SkUV.png",F2="/kids-house-game/assets/moon-night-light-CAKsjYZv.svg",j2="/kids-house-game/assets/nightstand-D3WOPlqw.png",G2="/kids-house-game/assets/nightstand-Bgsh0YUi.svg",Y2="/kids-house-game/assets/paper-lantern-mpw1jXzL.png",K2="/kids-house-game/assets/paper-lantern-CErOGyrT.svg",X2="/kids-house-game/assets/piggy-bank-DaSktUUA.png",J2="/kids-house-game/assets/piggy-bank-DsHrmOcp.svg",ey="/kids-house-game/assets/plant-stand-BpU338ra.png",ty="/kids-house-game/assets/plant-stand-DDyIDaL0.svg",ny="/kids-house-game/assets/play-tent-ih6xOGXC.png",sy="/kids-house-game/assets/play-tent-Bsawe52j.svg",oy="/kids-house-game/assets/star-mobile-Bqyd_ikl.png",iy="/kids-house-game/assets/star-mobile-DzOGs-Jo.svg",ay="/kids-house-game/assets/toy-chest-DhEoVFj0.png",ry="/kids-house-game/assets/toy-chest-6iPrDiZH.svg",ly="/kids-house-game/assets/toy-robot-Bfkjfj_6.png",cy="/kids-house-game/assets/toy-robot-OaCEwmDT.svg",dy="/kids-house-game/assets/toy-train-DILjZiya.png",fy="/kids-house-game/assets/toy-train-D5GqAnpy.svg",py="/kids-house-game/assets/unicorn-plush-5YQqQjND.png",gy="/kids-house-game/assets/unicorn-plush-C0W1eEs9.svg",hy="/kids-house-game/assets/wardrobe-sJcJSWZ2.png",uy="/kids-house-game/assets/wardrobe-Dn492IK0.svg",my="/kids-house-game/assets/bananas-D4irRkGy.png",yy="/kids-house-game/assets/bananas-aPQwdEVo.svg",by="/kids-house-game/assets/bar-stool-xbwaa01H.png",ky="/kids-house-game/assets/bar-stool-DWxhX1Ah.svg",wy="/kids-house-game/assets/bread-loaf-DKmR5wPN.png",vy="/kids-house-game/assets/bread-loaf-C9cEAYcl.svg",_y="/kids-house-game/assets/chick-DCnoMwEt.png",$y="/kids-house-game/assets/chick-BTEVfgqU.svg",xy="/kids-house-game/assets/china-hutch-K3xtlmqi.png",My="/kids-house-game/assets/china-hutch-BTmMY6rg.svg",Ly="/kids-house-game/assets/cocoa-mug-BmqSzNJ6.png",Ey="/kids-house-game/assets/cocoa-mug-CraNCc9b.svg",Cy="/kids-house-game/assets/cookie-jar-CZsO9PSp.png",Sy="/kids-house-game/assets/cookie-jar-ripj0oyT.svg",Py="/kids-house-game/assets/cooking-pot-BSKPlqyT.png",Ty="/kids-house-game/assets/cooking-pot-BWtfOm9f.svg",By="/kids-house-game/assets/cupcake-KO1KLKav.png",Ry="/kids-house-game/assets/cupcake-DFCw42xb.svg",Ay="/kids-house-game/assets/dish-rack-DICSEn5E.png",Dy="/kids-house-game/assets/dish-rack-BpVmmU6k.svg",Iy="/kids-house-game/assets/fruit-bowl-BL5EkaC8.png",Hy="/kids-house-game/assets/fruit-bowl-Dw9lsB3B.svg",Oy="/kids-house-game/assets/frying-pan-BocrLcES.png",Wy="/kids-house-game/assets/frying-pan-CTBY6MC_.svg",Uy="/kids-house-game/assets/happy-fridge-BTbpm-W1.png",Vy="/kids-house-game/assets/happy-fridge-D7ENuEJs.svg",zy="/kids-house-game/assets/herb-box-DFtC2qBN.png",Qy="/kids-house-game/assets/herb-box-CdRxefnV.svg",qy="/kids-house-game/assets/high-chair-DZCqRJV8.png",Zy="/kids-house-game/assets/high-chair-BQtLYlq4.svg",Ny="/kids-house-game/assets/ice-cream-CLLMXjn9.png",Fy="/kids-house-game/assets/ice-cream-DydSyNXx.svg",jy="/kids-house-game/assets/kettle-DScYOeEK.png",Gy="/kids-house-game/assets/kettle-D1nuAiG_.svg",Yy="/kids-house-game/assets/kitchen-counter-cZcDRQIw.png",Ky="/kids-house-game/assets/kitchen-counter-C8sTAZ-V.svg",Xy="/kids-house-game/assets/kitchen-sink-DrP43iga.png",Jy="/kids-house-game/assets/kitchen-sink-CYjDcd1n.svg",eb="/kids-house-game/assets/lemon-tree-BwA7W0cM.png",tb="/kids-house-game/assets/lemon-tree-CZz-Vy3P.svg",nb="/kids-house-game/assets/microwave-BJRDd-L-.png",sb="/kids-house-game/assets/microwave-lopm-FCT.svg",ob="/kids-house-game/assets/milk-bottle-D7UB6VD8.png",ib="/kids-house-game/assets/milk-bottle-DxcUA6XT.svg",ab="/kids-house-game/assets/pancakes-CbisCK-C.png",rb="/kids-house-game/assets/pancakes-CLqxnc5R.svg",lb="/kids-house-game/assets/pantry-shelf-DI_CgvVD.png",cb="/kids-house-game/assets/pantry-shelf-Azdxpmzd.svg",db="/kids-house-game/assets/pendant-lamp-BhZanag5.png",fb="/kids-house-game/assets/pendant-lamp-fZv6y1p0.svg",pb="/kids-house-game/assets/pet-bowl-Oe3KGELz.png",gb="/kids-house-game/assets/pet-bowl-ETL_EOAP.svg",hb="/kids-house-game/assets/rice-cooker-DUTXsBbb.png",ub="/kids-house-game/assets/rice-cooker-JX0L4bi2.svg",mb="/kids-house-game/assets/runner-rug-AYIsQudU.png",yb="/kids-house-game/assets/runner-rug-BbUgZFy4.svg",bb="/kids-house-game/assets/spice-rack-8ll-6Q2f.png",kb="/kids-house-game/assets/spice-rack-D9kAw-vT.svg",wb="/kids-house-game/assets/stand-mixer-CP2fpC-Q.png",vb="/kids-house-game/assets/stand-mixer-CZrLn00l.svg",_b="/kids-house-game/assets/teapot-iFnJNGiA.png",$b="/kids-house-game/assets/teapot-CtPOJzEm.svg",xb="/kids-house-game/assets/toaster-T2WkZkdo.png",Mb="/kids-house-game/assets/toaster-CNk0hJDw.svg",Lb="/kids-house-game/assets/utensil-rail-_vjcgBpy.png",Eb="/kids-house-game/assets/utensil-rail-B0QkGP3A.svg",Cb="/kids-house-game/assets/watermelon-slice-yHBcfKGj.png",Sb="/kids-house-game/assets/watermelon-slice-VzvgalD5.svg",Pb="/kids-house-game/assets/aquarium-rYRAu69m.png",Tb="/kids-house-game/assets/aquarium-BlhJ9UCr.svg",Bb="/kids-house-game/assets/arc-floor-lamp-CBq3G9j8.png",Rb="/kids-house-game/assets/arc-floor-lamp-DL5cEVzq.svg",Ab="/kids-house-game/assets/bean-bag-CMLYRsbz.png",Db="/kids-house-game/assets/bean-bag-CauyDuZQ.svg",Ib="/kids-house-game/assets/bird-cage-qj5P0te2.png",Hb="/kids-house-game/assets/bird-cage-xqeVahX7.svg",Ob="/kids-house-game/assets/blanket-basket-5IQiUSS2.png",Wb="/kids-house-game/assets/blanket-basket-B4LREUo9.svg",Ub="/kids-house-game/assets/building-blocks-CzqAFUNB.png",Vb="/kids-house-game/assets/building-blocks-DbtoodPT.svg",zb="/kids-house-game/assets/coffee-table-iKZ20Gpy.png",Qb="/kids-house-game/assets/coffee-table-ZYO2ApH6.svg",qb="/kids-house-game/assets/comfy-armchair-U_SI3sk9.png",Zb="/kids-house-game/assets/comfy-armchair-tjNYbfgO.svg",Nb="/kids-house-game/assets/cubby-shelf-B0De91CO.png",Fb="/kids-house-game/assets/cubby-shelf-CLzTUpiz.svg",jb="/kids-house-game/assets/daisy-rug-BqSOjPlJ.png",Gb="/kids-house-game/assets/daisy-rug-CvOlxjsu.svg",Yb="/kids-house-game/assets/fiddle-leaf-fig-DnvG8l2j.png",Kb="/kids-house-game/assets/fiddle-leaf-fig-DiUNW4Q_.svg",Xb="/kids-house-game/assets/fireplace-C9azNipx.png",Jb="/kids-house-game/assets/fireplace-CqxIMN3Z.svg",ek="/kids-house-game/assets/globe-C-L7vS0t.png",tk="/kids-house-game/assets/globe-DN0sih3W.svg",nk="/kids-house-game/assets/hanging-planter-DGgUXZpP.png",sk="/kids-house-game/assets/hanging-planter-M9IHqztp.svg",ok="/kids-house-game/assets/monstera-plant-BbGZQtOh.png",ik="/kids-house-game/assets/monstera-plant-CLmuB_RM.svg",ak="/kids-house-game/assets/piano-DpS7nvdq.png",rk="/kids-house-game/assets/piano-Y0KQ4rD2.svg",lk="/kids-house-game/assets/popcorn-CFk12JbR.png",ck="/kids-house-game/assets/popcorn-BD2d8sUH.svg",dk="/kids-house-game/assets/pouf-DY0Vcx75.png",fk="/kids-house-game/assets/pouf-as0li8On.svg",pk="/kids-house-game/assets/rainbow-rug-DwzLb6aY.png",gk="/kids-house-game/assets/rainbow-rug-C5ZVauOA.svg",hk="/kids-house-game/assets/rainbow-wall-art--5LLrrQJ.png",uk="/kids-house-game/assets/rainbow-wall-art-CCXUPPen.svg",mk="/kids-house-game/assets/retro-radio-BIX4GYkL.png",yk="/kids-house-game/assets/retro-radio-B3T98xMQ.svg",bk="/kids-house-game/assets/rocking-chair-CDLlJFiP.png",kk="/kids-house-game/assets/rocking-chair-BgoIQu5H.svg",wk="/kids-house-game/assets/rocking-horse-Iz-CpscK.png",vk="/kids-house-game/assets/rocking-horse-1WLLV43R.svg",_k="/kids-house-game/assets/snake-plant-DgPna4k9.png",$k="/kids-house-game/assets/snake-plant-BGDwPcMj.svg",xk="/kids-house-game/assets/string-lights-nDUZa5m1.png",Mk="/kids-house-game/assets/string-lights-DGC0Ni2I.svg",Lk="/kids-house-game/assets/succulent-trio-VYNH-o5B.png",Ek="/kids-house-game/assets/succulent-trio-uPD-ljlL.svg",Ck="/kids-house-game/assets/tassel-rug-BBXtknxh.png",Sk="/kids-house-game/assets/tassel-rug-DolXtxfQ.svg",Pk="/kids-house-game/assets/throw-pillow-BjuGXMYA.png",Tk="/kids-house-game/assets/throw-pillow-qWyWQ9cT.svg",Bk="/kids-house-game/assets/toy-car-Bwrt0-AT.png",Rk="/kids-house-game/assets/toy-car-CTJy5H4V.svg",Ak="/kids-house-game/assets/tulip-vase-CpQUgXPR.png",Dk="/kids-house-game/assets/tulip-vase-o2vjI1Hg.svg",Ik="/kids-house-game/assets/turtle-Bf8_yRql.png",Hk="/kids-house-game/assets/turtle-B9Y6NDSv.svg",Ok="/kids-house-game/assets/tv-stand-DnwT-hn4.png",Wk="/kids-house-game/assets/tv-stand-CcLHFc1J.svg",Uk="/kids-house-game/assets/wall-shelf-Bs6mROe1.png",Vk="/kids-house-game/assets/wall-shelf-CCWuZ6Xl.svg",zk="/kids-house-game/assets/cc-bakery-shelf-dMrnZVB3.png",Qk="/kids-house-game/assets/cc-bakery-shelf-BxdhLTTC.svg",qk="/kids-house-game/assets/cc-breakfast-table-DwHbMV2p.png",Zk="/kids-house-game/assets/cc-breakfast-table-DwaO0eFy.svg",Nk="/kids-house-game/assets/cc-bubble-chair-DuDi-bRz.png",Fk="/kids-house-game/assets/cc-bubble-chair-DncHA7F-.svg",jk="/kids-house-game/assets/cc-canopy-daybed-CAZpSo2a.png",Gk="/kids-house-game/assets/cc-canopy-daybed-CVbt6QDr.svg",Yk="/kids-house-game/assets/cc-cloud-beanbag-BYcBLKf9.png",Kk="/kids-house-game/assets/cc-cloud-beanbag-SM0m-3qY.svg",Xk="/kids-house-game/assets/cc-cloud-lamp-v0UO1VrK.png",Jk="/kids-house-game/assets/cc-cloud-lamp-BWwxoCux.svg",ew="/kids-house-game/assets/cc-cottage-aquarium-XYuN1CnR.png",tw="/kids-house-game/assets/cc-cottage-aquarium-iY2D26Vq.svg",nw="/kids-house-game/assets/cc-cupcake-stand-jKA3zoCC.png",sw="/kids-house-game/assets/cc-cupcake-stand-B08kdXZL.svg",ow="/kids-house-game/assets/cc-dryer-chair-CP8q6yyq.png",iw="/kids-house-game/assets/cc-dryer-chair-DQmosxUz.svg",aw="/kids-house-game/assets/cc-fairy-garland-B4DVLP6L.png",rw="/kids-house-game/assets/cc-fairy-garland-BncKvkRL.svg",lw="/kids-house-game/assets/cc-fairy-shelf-DSmhC08i.png",cw="/kids-house-game/assets/cc-fairy-shelf-CE6x7J1w.svg",dw="/kids-house-game/assets/cc-flower-kettle-DZFkbEk5.png",fw="/kids-house-game/assets/cc-flower-kettle-ZTbAh26L.svg",pw="/kids-house-game/assets/cc-flower-lamp-hc1e4xxL.png",gw="/kids-house-game/assets/cc-flower-lamp-CS2T2S89.svg",hw="/kids-house-game/assets/cc-heart-bed-BtOx4_a4.png",uw="/kids-house-game/assets/cc-heart-bed-76-z9nJg.svg",mw="/kids-house-game/assets/cc-heart-clock-CLtzUj8w.png",yw="/kids-house-game/assets/cc-heart-clock-ByixSFru.svg",bw="/kids-house-game/assets/cc-heart-pouf-C3vCLnoM.png",kw="/kids-house-game/assets/cc-heart-pouf-DH5J2s2J.svg",ww="/kids-house-game/assets/cc-heart-rug-CpvyM_wf.png",vw="/kids-house-game/assets/cc-heart-rug-Jwmh-m0j.svg",_w="/kids-house-game/assets/cc-jewel-box-DZ6IxYiU.png",$w="/kids-house-game/assets/cc-jewel-box-qMbIQmo4.svg",xw="/kids-house-game/assets/cc-light-vanity-BxKLJiVW.png",Mw="/kids-house-game/assets/cc-light-vanity-DD4uQJ_7.svg",Lw="/kids-house-game/assets/cc-macaron-jar-NI43JiPM.png",Ew="/kids-house-game/assets/cc-macaron-jar-A0sT-Lvj.svg",Cw="/kids-house-game/assets/cc-macrame-swing-x8sop4y4.png",Sw="/kids-house-game/assets/cc-macrame-swing-qIcoPp0o.svg",Pw="/kids-house-game/assets/cc-mani-chair-C1J_zCFX.png",Tw="/kids-house-game/assets/cc-mani-chair-7AWb60tv.svg",Bw="/kids-house-game/assets/cc-mint-fridge-7zQk2-Kj.png",Rw="/kids-house-game/assets/cc-mint-fridge-Cc87e_gW.svg",Aw="/kids-house-game/assets/cc-mushroom-stool-DeoO7P27.png",Dw="/kids-house-game/assets/cc-mushroom-stool-B9-y9WNf.svg",Iw="/kids-house-game/assets/cc-pastel-range-CXu-Gr6f.png",Hw="/kids-house-game/assets/cc-pastel-range-D6cjzJTl.svg",Ow="/kids-house-game/assets/cc-perfume-tray-DkUHaA_i.png",Ww="/kids-house-game/assets/cc-perfume-tray-DN4chcIn.svg",Uw="/kids-house-game/assets/cc-petal-table-DadCDnSy.png",Vw="/kids-house-game/assets/cc-petal-table-QrNho7KH.svg",zw="/kids-house-game/assets/cc-plant-wall-CCxqRxsH.png",Qw="/kids-house-game/assets/cc-plant-wall-BMii8_kR.svg",qw="/kids-house-game/assets/cc-reading-nook-Eq4Eh0MW.png",Zw="/kids-house-game/assets/cc-reading-nook-wiDgasP8.svg",Nw="/kids-house-game/assets/cc-record-player-LmfaPaE5.png",Fw="/kids-house-game/assets/cc-record-player-BoxZhHLy.svg",jw="/kids-house-game/assets/cc-ribbon-mirror-BEsGok51.png",Gw="/kids-house-game/assets/cc-ribbon-mirror-DiCje_iy.svg",Yw="/kids-house-game/assets/cc-scallop-curtains-Cvab-FzV.png",Kw="/kids-house-game/assets/cc-scallop-curtains-Bzhy2peV.svg",Xw="/kids-house-game/assets/cc-scallop-loveseat-CR3Z2O-W.png",Jw="/kids-house-game/assets/cc-scallop-loveseat-Dfi7dg3b.svg",e4="/kids-house-game/assets/cc-star-dresser-b15t-WLI.png",t4="/kids-house-game/assets/cc-star-dresser-2wqSnsip.svg",n4="/kids-house-game/assets/cc-teapot-set-ygQBLdbl.png",s4="/kids-house-game/assets/cc-teapot-set-DnZlJvn7.svg",o4="/kids-house-game/assets/cc-window-seat-D-Rfuuwm.png",i4="/kids-house-game/assets/cc-window-seat-BCOise4Z.svg",a4="/kids-house-game/assets/arched-shelf-Dt4oWiBK.png",r4="/kids-house-game/assets/arched-shelf-XtiqRVaT.svg",l4="/kids-house-game/assets/blob-rug-Ckw1kSsa.png",c4="/kids-house-game/assets/blob-rug-Deh5k10s.svg",d4="/kids-house-game/assets/bubbly-plant-CV9ioei6.png",f4="/kids-house-game/assets/bubbly-plant-CFTOJd5Y.svg",p4="/kids-house-game/assets/bud-vase-Bzj5qGgr.png",g4="/kids-house-game/assets/bud-vase-Dup4WQ5y.svg",h4="/kids-house-game/assets/comb-brush-CfTGGk1L.png",u4="/kids-house-game/assets/comb-brush-oPJeQv0v.svg",m4="/kids-house-game/assets/cream-jars-dLRXypJR.png",y4="/kids-house-game/assets/cream-jars-D6bxrnJR.svg",b4="/kids-house-game/assets/drop-lamp-DWqiPjZB.png",k4="/kids-house-game/assets/drop-lamp-CJg63ZKz.svg",w4="/kids-house-game/assets/droplet-buddy-DCjbvrlK.png",v4="/kids-house-game/assets/droplet-buddy-DTpHggFh.svg",_4="/kids-house-game/assets/fancy-sofa-BRlr2j8I.png",$4="/kids-house-game/assets/fancy-sofa-kq2L0ob5.svg",x4="/kids-house-game/assets/flower-cart-C3W7v2RD.png",M4="/kids-house-game/assets/flower-cart-BWgfg0s_.svg",L4="/kids-house-game/assets/foot-spa-HwiSNgdS.png",E4="/kids-house-game/assets/foot-spa-DdA5_fj_.svg",C4="/kids-house-game/assets/globe-pendants-ChKRw_Bp.png",S4="/kids-house-game/assets/globe-pendants-DNV5WnAO.svg",P4="/kids-house-game/assets/glow-mirror-D4P3UibJ.png",T4="/kids-house-game/assets/glow-mirror-C_dTGwQc.svg",B4="/kids-house-game/assets/gold-floor-mirror-CSYqaszS.png",R4="/kids-house-game/assets/gold-floor-mirror-jfPQepmr.svg",A4="/kids-house-game/assets/hair-dryer-_nFRnXBv.png",D4="/kids-house-game/assets/hair-dryer-CAkhCf7J.svg",I4="/kids-house-game/assets/heart-plant-CN47o4my.png",H4="/kids-house-game/assets/heart-plant-fSU4uLVy.svg",O4="/kids-house-game/assets/heart-pouf-b76ZFT07.png",W4="/kids-house-game/assets/heart-pouf-BMVPBVKJ.svg",U4="/kids-house-game/assets/lilac-curtain-94MUZIqr.png",V4="/kids-house-game/assets/lilac-curtain-D_mFsZKu.svg",z4="/kids-house-game/assets/lotion-trio-wGXg7qdC.png",Q4="/kids-house-game/assets/lotion-trio-D3lKwvho.svg",q4="/kids-house-game/assets/mani-lamp-B6MLP1xK.png",Z4="/kids-house-game/assets/mani-lamp-B4SmvhvS.svg",N4="/kids-house-game/assets/nail-table-CP0_pEA8.png",F4="/kids-house-game/assets/nail-table-C3FitmuG.svg",j4="/kids-house-game/assets/pebble-rug-BgHMxQ6Q.png",G4="/kids-house-game/assets/pebble-rug-DHBZUggl.svg",Y4="/kids-house-game/assets/perfume-bottle-F_MkREQh.png",K4="/kids-house-game/assets/perfume-bottle-BcNXSWTW.svg",X4="/kids-house-game/assets/pink-fountain-DtB69ljQ.png",J4="/kids-house-game/assets/pink-fountain-DQ3CIetr.svg",e6="/kids-house-game/assets/pink-vanity-CPmOesS7.png",t6="/kids-house-game/assets/pink-vanity-qE3SwdD6.svg",n6="/kids-house-game/assets/polish-bottle-B2f4PsGZ.png",s6="/kids-house-game/assets/polish-bottle-VWed8EQ-.svg",o6="/kids-house-game/assets/polish-rack-ANlncwDe.png",i6="/kids-house-game/assets/polish-rack-8Ph2n2nM.svg",a6="/kids-house-game/assets/reception-desk-DnhqgkHu.png",r6="/kids-house-game/assets/reception-desk-D4Gevx64.svg",l6="/kids-house-game/assets/salon-chair-Bl31ZE_E.png",c6="/kids-house-game/assets/salon-chair-Wj2sOSW8.svg",d6="/kids-house-game/assets/scent-candle-BYUsO9s1.png",f6="/kids-house-game/assets/scent-candle-BEUE-6Uv.svg",p6="/kids-house-game/assets/spray-bottle-DJKZeNmL.png",g6="/kids-house-game/assets/spray-bottle-Bc8iuceJ.svg",h6="/kids-house-game/assets/star-wall-sign-D_9XhB91.png",u6="/kids-house-game/assets/star-wall-sign-DvenTqvU.svg",m6="/kids-house-game/assets/swivel-stool-BGAwWXNX.png",y6="/kids-house-game/assets/swivel-stool-P-Egqq_Z.svg",b6="/kids-house-game/assets/tiered-tray-CGuVyK1K.png",k6="/kids-house-game/assets/tiered-tray-DLnZTsUF.svg",w6="/kids-house-game/assets/towel-cart-5At-syZP.png",v6="/kids-house-game/assets/towel-cart-DJmR97UL.svg",_6="/kids-house-game/assets/towel-stack-D-pX5koc.png",$6="/kids-house-game/assets/towel-stack-C1qplZ4T.svg",x6="/kids-house-game/assets/vine-planter-mviuZvkw.png",M6="/kids-house-game/assets/vine-planter-Duhx9OMZ.svg",L6="/kids-house-game/assets/waiting-bench-DXbi7ObC.png",E6="/kids-house-game/assets/waiting-bench-BQuoXbE3.svg",C6="/kids-house-game/assets/wash-chair-CJo64U_O.png",S6="/kids-house-game/assets/wash-chair-sdgNnj79.svg",P6="/kids-house-game/assets/arched-mirror-2vakzmQ8.png",T6="/kids-house-game/assets/arched-mirror-ClJgTBd9.svg",B6="/kids-house-game/assets/big-monitor-BRiCdofl.png",R6="/kids-house-game/assets/big-monitor-jx5PnUa_.svg",A6="/kids-house-game/assets/boba-cup-Dn_S1oAa.png",D6="/kids-house-game/assets/boba-cup-CwUerXNm.svg",I6="/kids-house-game/assets/bubble-bath-D4AZavWB.png",H6="/kids-house-game/assets/bubble-bath-8VwrkImA.svg",O6="/kids-house-game/assets/cactus-buddy-D_lAS12Y.png",W6="/kids-house-game/assets/cactus-buddy-D3uacuVA.svg",U6="/kids-house-game/assets/caterpillar-plush-vK3r58Ch.png",V6="/kids-house-game/assets/caterpillar-plush-BhR8Pydf.svg",z6="/kids-house-game/assets/checker-bed-DD4Ra6RV.png",Q6="/kids-house-game/assets/checker-bed-mtuxfPje.svg",q6="/kids-house-game/assets/checker-rug-C9Gs09p_.png",Z6="/kids-house-game/assets/checker-rug-CmSO3Y4j.svg",N6="/kids-house-game/assets/clothes-rail-CJ8Du1xN.png",F6="/kids-house-game/assets/clothes-rail-BY-f9coz.svg",j6="/kids-house-game/assets/cloud-sofa-3eVlcAzs.png",G6="/kids-house-game/assets/cloud-sofa-CZS1Y5s-.svg",Y6="/kids-house-game/assets/cube-shelf-DPFNgFhk.png",K6="/kids-house-game/assets/cube-shelf-DoI0tLGL.svg",X6="/kids-house-game/assets/curvy-desk-BxyVtcg3.png",J6="/kids-house-game/assets/curvy-desk-eWCvec1f.svg",ev="/kids-house-game/assets/cute-speaker-Cy7ml0bm.png",tv="/kids-house-game/assets/cute-speaker-DrVF9uns.svg",nv="/kids-house-game/assets/desk-lamp-B39R5SBQ.png",sv="/kids-house-game/assets/desk-lamp-C-VtrE1V.svg",ov="/kids-house-game/assets/desk-mic-C-4XirP6.png",iv="/kids-house-game/assets/desk-mic-BqYzh6ma.svg",av="/kids-house-game/assets/flower-lamp-DyDRXGpR.png",rv="/kids-house-game/assets/flower-lamp-Dpz6tQ2x.svg",lv="/kids-house-game/assets/frog-plush-NmeU5sHZ.png",cv="/kids-house-game/assets/frog-plush-BhkTrE24.svg",dv="/kids-house-game/assets/game-controller-B6phnmU4.png",fv="/kids-house-game/assets/game-controller-6gvwykQG.svg",pv="/kids-house-game/assets/gaming-chair-B7ZnwG2W.png",gv="/kids-house-game/assets/gaming-chair-BCyGMzy0.svg",hv="/kids-house-game/assets/hamster-pet-C09aLs5N.png",uv="/kids-house-game/assets/hamster-pet-LBcghoJj.svg",mv="/kids-house-game/assets/headphones-MRHfNh-e.png",yv="/kids-house-game/assets/headphones-Cjjqt_92.svg",bv="/kids-house-game/assets/heart-light-B6LXGE4j.png",kv="/kids-house-game/assets/heart-light-DfDwRHju.svg",wv="/kids-house-game/assets/keyboard-Dvxz1PEW.png",vv="/kids-house-game/assets/keyboard-Cbtwvtj1.svg",_v="/kids-house-game/assets/mini-fridge-DgYceOBW.png",$v="/kids-house-game/assets/mini-fridge-qdNm4NKf.svg",xv="/kids-house-game/assets/pastel-wardrobe-CFIOdtrx.png",Mv="/kids-house-game/assets/pastel-wardrobe-BubkWAN2.svg",Lv="/kids-house-game/assets/phone-stand-CWfRuwT_.png",Ev="/kids-house-game/assets/phone-stand-VLW-DsK-.svg",Cv="/kids-house-game/assets/pothos-plant-mnKAaH_K.png",Sv="/kids-house-game/assets/pothos-plant-C1I15M9a.svg",Pv="/kids-house-game/assets/puffy-stool-B5z3sd2l.png",Tv="/kids-house-game/assets/puffy-stool-CwjoblCa.svg",Bv="/kids-house-game/assets/ring-light-BoqM9Lks.png",Rv="/kids-house-game/assets/ring-light-CdxNAXA6.svg",Av="/kids-house-game/assets/side-table-round-x1NbWzDq.png",Dv="/kids-house-game/assets/side-table-round-rCsBU0YO.svg",Iv="/kids-house-game/assets/star-lamp-Bocs3YRP.png",Hv="/kids-house-game/assets/star-lamp-CHKQnzvB.svg",Ov="/kids-house-game/assets/sticker-board-CMn2BF_D.png",Wv="/kids-house-game/assets/sticker-board-LUm1_I_P.svg",Uv="/kids-house-game/assets/sunny-art-372bwMLG.png",Vv="/kids-house-game/assets/sunny-art-C25M7k02.svg",zv="/kids-house-game/assets/sv-bean-bag-DlsJBRMG.png",Qv="/kids-house-game/assets/sv-bean-bag-DdsCYd4e.svg",qv="/kids-house-game/assets/sv-cloud-rug-Bo5aP_HP.png",Zv="/kids-house-game/assets/sv-cloud-rug-BvczSj77.svg",Nv="/kids-house-game/assets/sv-wall-shelf-C61Y5OFn.png",Fv="/kids-house-game/assets/sv-wall-shelf-BtJLzNMg.svg",jv="/kids-house-game/assets/vlog-camera-DAiD7LSW.png",Gv="/kids-house-game/assets/vlog-camera-CBd28A7P.svg",Yv="/kids-house-game/assets/wavy-floor-lamp-1BJBLV8q.png",Kv="/kids-house-game/assets/wavy-floor-lamp-Iy8llzr8.svg",Xv="/kids-house-game/assets/acorn-friend-SMoU5de2.png",Jv="/kids-house-game/assets/acorn-friend-BsLiZ2Z_.svg",e_="/kids-house-game/assets/apple-tree-CN7tYao3.png",t_="/kids-house-game/assets/apple-tree-DGIUIjY1.svg",n_="/kids-house-game/assets/big-wardrobe-DcZpROWW.png",s_="/kids-house-game/assets/big-wardrobe-BnfnkPXl.svg",o_="/kids-house-game/assets/box-stack-DBdO-RRV.png",i_="/kids-house-game/assets/box-stack-ji13G2mP.svg",a_="/kids-house-game/assets/brick-fireplace-CxelyhgA.png",r_="/kids-house-game/assets/brick-fireplace-BGCbiSK5.svg",l_="/kids-house-game/assets/bulletin-board-BWUCktvK.png",c_="/kids-house-game/assets/bulletin-board-DqA69wQH.svg",d_="/kids-house-game/assets/cozy-mug-DGMQRJK7.png",f_="/kids-house-game/assets/cozy-mug-CFJEPRKb.svg",p_="/kids-house-game/assets/cream-sofa-Dzaz9Eg9.png",g_="/kids-house-game/assets/cream-sofa-CB4EWIDp.svg",h_="/kids-house-game/assets/fire-pit-FhRYTkJU.png",u_="/kids-house-game/assets/fire-pit-DTyRokIj.svg",m_="/kids-house-game/assets/glass-cabinet-C1Dud5Om.png",y_="/kids-house-game/assets/glass-cabinet-BCHExP4F.svg",b_="/kids-house-game/assets/hanging-lantern-5_A0FrVU.png",k_="/kids-house-game/assets/hanging-lantern-DZbXB8L1.svg",w_="/kids-house-game/assets/knit-cushion-CeEpuawZ.png",v_="/kids-house-game/assets/knit-cushion-DUewI6rR.svg",__="/kids-house-game/assets/ladder-shelf-kDBx9ho_.png",$_="/kids-house-game/assets/ladder-shelf-DXYDmQiE.svg",x_="/kids-house-game/assets/landscape-art-CXy-fkYO.png",M_="/kids-house-game/assets/landscape-art-CdCqCPL2.svg",L_="/kids-house-game/assets/lattice-bench-BQ7wYgqI.png",E_="/kids-house-game/assets/lattice-bench-D3zCZTQp.svg",C_="/kids-house-game/assets/leaf-wreath-01dJ9WfP.png",S_="/kids-house-game/assets/leaf-wreath-DUjq1MWh.svg",P_="/kids-house-game/assets/mini-greenhouse-DLsY7-VZ.png",T_="/kids-house-game/assets/mini-greenhouse-CGE5F9A_.svg",B_="/kids-house-game/assets/moving-box-DszcEI-k.png",R_="/kids-house-game/assets/moving-box-CZXbXcJO.svg",A_="/kids-house-game/assets/picnic-basket-CYmGfWoy.png",D_="/kids-house-game/assets/picnic-basket-D72DCNRY.svg",I_="/kids-house-game/assets/round-rug-DZTiY9p2.png",H_="/kids-house-game/assets/round-rug-D8ePosbv.svg",O_="/kids-house-game/assets/sale-sign-CLwCvavX.png",W_="/kids-house-game/assets/sale-sign-CXWpgQt5.svg",U_="/kids-house-game/assets/sprout-pot-BlPwmBjK.png",V_="/kids-house-game/assets/sprout-pot-BbXk09mS.svg",z_="/kids-house-game/assets/stripe-runner-CWfHHL2f.png",Q_="/kids-house-game/assets/stripe-runner-ClycKEW5.svg",q_="/kids-house-game/assets/trailing-plant-BBqKhPvp.png",Z_="/kids-house-game/assets/trailing-plant-NbG7dy8O.svg",N_="/kids-house-game/assets/wall-clock-ItDQFPVO.png",F_="/kids-house-game/assets/wall-clock-CDC1o6eG.svg",j_="/kids-house-game/assets/wh-arc-floor-lamp-Dg8j_uAI.png",G_="/kids-house-game/assets/wh-arc-floor-lamp-BKVes2Fd.svg",Y_="/kids-house-game/assets/wh-book-stack-9oDTUUnY.png",K_="/kids-house-game/assets/wh-book-stack-DjDFey2h.svg",X_="/kids-house-game/assets/wh-dresser-DhrzqcZ2.png",J_="/kids-house-game/assets/wh-dresser-Y-jnNt5q.svg",e8="/kids-house-game/assets/wh-fiddle-leaf-fig-Bt0Bc12k.png",t8="/kids-house-game/assets/wh-fiddle-leaf-fig-B0-kGmHI.svg",n8="/kids-house-game/assets/wh-kitchen-counter-BWikwkWo.png",s8="/kids-house-game/assets/wh-kitchen-counter-BtBenu6u.svg",o8="/kids-house-game/assets/wh-nightstand-BXusZ0A4.png",i8="/kids-house-game/assets/wh-nightstand-DPUoV5aO.svg",a8="/kids-house-game/assets/wh-pendant-lamp-DbfSrUho.png",r8="/kids-house-game/assets/wh-pendant-lamp-DBg4p7hi.svg",l8="/kids-house-game/assets/wh-snake-plant-kt_6Tus5.png",c8="/kids-house-game/assets/wh-snake-plant-Cj3bHF25.svg",d8="/kids-house-game/assets/wh-string-lights-CWVP27K_.png",f8="/kids-house-game/assets/wh-string-lights-C3JVBkgW.svg",p8="/kids-house-game/assets/wh-teapot-BclPHtYN.png",g8="/kids-house-game/assets/wh-teapot-kevlW5hN.svg",h8="/kids-house-game/assets/wood-armchair-BoX1llWe.png",u8="/kids-house-game/assets/wood-armchair-DNVhKBWe.svg",m8="/kids-house-game/assets/wood-bookshelf-CfgOK-7q.png",y8="/kids-house-game/assets/wood-bookshelf-CvT7GAuI.svg",b8="/kids-house-game/assets/wood-coffee-table-DmAJknnU.png",k8="/kids-house-game/assets/wood-coffee-table-CuAR_7Kr.svg",w8="/kids-house-game/assets/wood-desk-S1h5jwM2.png",v8="/kids-house-game/assets/wood-desk-DPCJq_XQ.svg",_8="/kids-house-game/assets/wood-stool-BWBID67e.png",$8="/kids-house-game/assets/wood-stool-CV7YeZwC.svg",x8="/kids-house-game/assets/wooden-bed-511IemjK.png",M8="/kids-house-game/assets/wooden-bed-Qj-sf8yq.svg",L8="/kids-house-game/assets/wc-bauble-garland-PlBim-j0.webp",E8="/kids-house-game/assets/wc-berry-wreath-BtfH1PGe.webp",C8="/kids-house-game/assets/wc-birch-basket-vRxqyB3J.webp",S8="/kids-house-game/assets/wc-cabin-picture-B-lavF1R.webp",P8="/kids-house-game/assets/wc-candle-trio-CjQ7YYcj.webp",T8="/kids-house-game/assets/wc-cane-lamp-OhwvqNa-.webp",B8="/kids-house-game/assets/wc-cinnamon-tray-CxLrtplK.webp",R8="/kids-house-game/assets/wc-cocoa-cart-BkMzGgs0.webp",A8="/kids-house-game/assets/wc-cocoa-mug-qa2xzTYd.webp",D8="/kids-house-game/assets/wc-cocoa-pot-bLgiaNKD.webp",I8="/kids-house-game/assets/wc-cookie-oven-D2Ud1EPt.webp",H8="/kids-house-game/assets/wc-cookie-plate-RhDZYroJ.webp",O8="/kids-house-game/assets/wc-frost-bookcase-BMd6DAXH.webp",W8="/kids-house-game/assets/wc-frosted-pine-BupMG4GK.webp",U8="/kids-house-game/assets/wc-fur-bench-B1nXjHAR.webp",V8="/kids-house-game/assets/wc-gingerbread-village-8pOXPPCY.webp",z8="/kids-house-game/assets/wc-gingerbread-PGlclkJ_.webp",Q8="/kids-house-game/assets/wc-globe-lamp-DUCVl_3A.webp",q8="/kids-house-game/assets/wc-holiday-tree-CO0SBlqY.webp",Z8="/kids-house-game/assets/wc-holly-CD8teo0a.webp",N8="/kids-house-game/assets/wc-ice-skates-D49y8YK1.webp",F8="/kids-house-game/assets/wc-ice-wardrobe-Dliflqpp.webp",j8="/kids-house-game/assets/wc-knit-armchair-84rhSw_8.webp",G8="/kids-house-game/assets/wc-lantern-81B3e5fN.webp",Y8="/kids-house-game/assets/wc-log-bench-qQ1zT34_.webp",K8="/kids-house-game/assets/wc-marshmallow-jar-DeWRr-zf.webp",X8="/kids-house-game/assets/wc-mitten-line-sg-sweCl.webp",J8="/kids-house-game/assets/wc-mitten-ottoman-H5qkjso6.webp",e$="/kids-house-game/assets/wc-mug-shelf-DlWrwZYo.webp",t$="/kids-house-game/assets/wc-nutcracker-BGZe5tYy.webp",n$="/kids-house-game/assets/wc-penguin-chair-CDM1eIxo.webp",s$="/kids-house-game/assets/wc-penguin-plush-C8B27KcB.webp",o$="/kids-house-game/assets/wc-peppermint-counter-CPl6TA0h.webp",i$="/kids-house-game/assets/wc-peppermint-rug-3nakY_gB.webp",a$="/kids-house-game/assets/wc-pinecone-garland-s7ZWASw2.webp",r$="/kids-house-game/assets/wc-pinecone-table-DlJvjB-2.webp",l$="/kids-house-game/assets/wc-plaid-bed-eAhWKZdO.webp",c$="/kids-house-game/assets/wc-plaid-sofa-kvF30vEn.webp",d$="/kids-house-game/assets/wc-poinsettia-C-S-MDMu.webp",f$="/kids-house-game/assets/wc-polar-plush-BUVRTt7t.webp",p$="/kids-house-game/assets/wc-pom-rug-B-JF-heA.webp",g$="/kids-house-game/assets/wc-present-stack-Do2pEHLF.webp",h$="/kids-house-game/assets/wc-reindeer-CbKEp6CE.webp",u$="/kids-house-game/assets/wc-sled-table-Bd2cST9J.webp",m$="/kids-house-game/assets/wc-sleigh-planter-Bfcxvgbk.webp",y$="/kids-house-game/assets/wc-snow-globe-BcGMsnmh.webp",b$="/kids-house-game/assets/wc-snow-mobile-F06-kuT7.webp",k$="/kids-house-game/assets/wc-snow-nightstand-D6RhLncP.webp",w$="/kids-house-game/assets/wc-snow-window-dOxdYTSk.webp",v$="/kids-house-game/assets/wc-snowman-gxLBKnIO.webp",_$="/kids-house-game/assets/wc-snowshoes-CZcMT0Qx.webp",$$="/kids-house-game/assets/wc-sock-hamper-mesU3CG3.webp",x$="/kids-house-game/assets/wc-star-topper-c4tXfpV6.webp",M$="/kids-house-game/assets/wc-stocking-row-Dz0-4wTi.webp",L$="/kids-house-game/assets/wc-stone-hearth-1blXXfiH.webp",E$="/kids-house-game/assets/wc-twinkle-lamp-CYcQjW3A.webp",C$="/kids-house-game/assets/wc-twinkle-string-Olg29poj.webp",S$="/kids-house-game/assets/wc-window-seat-B7CwlRjl.webp",P$="/kids-house-game/assets/wc-woodstove-Cf0xJFnD.webp",T$="/kids-house-game/assets/cc-butter-polka-DGTIwtTO.png",B$="/kids-house-game/assets/cc-butter-polka-CmiHLPHI.svg",R$="/kids-house-game/assets/cc-cream-hex-DMlsmhhY.png",A$="/kids-house-game/assets/cc-cream-hex-Bkf3o84Z.svg",D$="/kids-house-game/assets/cc-lavender-lattice-D6QyuSPi.png",I$="/kids-house-game/assets/cc-lavender-lattice-DhxILx5n.svg",H$="/kids-house-game/assets/cc-lilac-gingham-C8gKChr3.png",O$="/kids-house-game/assets/cc-lilac-gingham-C-WPjvD8.svg",W$="/kids-house-game/assets/cc-mint-checks-Bj1xaUgE.png",U$="/kids-house-game/assets/cc-mint-checks-BKmyOLlr.svg",V$="/kids-house-game/assets/cc-mint-florals-DubHlfkl.png",z$="/kids-house-game/assets/cc-mint-florals-Dz8qRBHw.svg",Q$="/kids-house-game/assets/cc-peach-scallops-3xV_Pu-6.png",q$="/kids-house-game/assets/cc-peach-scallops-GPn_mXbS.svg",Z$="/kids-house-game/assets/cc-pink-plaid-C9HKdB4f.png",N$="/kids-house-game/assets/cc-pink-plaid-VgppBwax.svg",F$="/kids-house-game/assets/cc-rag-planks-B67vRZlX.png",j$="/kids-house-game/assets/cc-rag-planks-C5Hombhc.svg",G$="/kids-house-game/assets/cc-rose-herringbone-Cmke3vGv.png",Y$="/kids-house-game/assets/cc-rose-herringbone-CQRix6_f.svg",K$="/kids-house-game/assets/lilac-stripes-DcsSoVwO.png",X$="/kids-house-game/assets/lilac-stripes-yb9DhjTf.svg",J$="/kids-house-game/assets/lilac-terrazzo-DOghNP_d.png",e3="/kids-house-game/assets/lilac-terrazzo-8CaN2qhK.svg",t3="/kids-house-game/assets/mint-bubbles-DtsYAubK.png",n3="/kids-house-game/assets/mint-bubbles-BIQM5a2P.svg",s3="/kids-house-game/assets/pink-check-floor-DjPuYxlq.png",o3="/kids-house-game/assets/pink-check-floor-Cy9k3Fal.svg",i3="/kids-house-game/assets/pink-hearts-DP4TxPV5.png",a3="/kids-house-game/assets/pink-hearts-BpVCT-98.svg",r3="/kids-house-game/assets/cloud-sky-CbZL0zcC.svg",l3="/kids-house-game/assets/pastel-planks-BAcEss7w.svg",c3="/kids-house-game/assets/soft-carpet-BSwTSDW1.svg",d3="/kids-house-game/assets/star-sprinkle-5bH7qjW0.svg",f3="/kids-house-game/assets/tiny-hearts-C-RHlg1h.svg",p3="/kids-house-game/assets/butter-check-floor-yLFbEdi4.png",g3="/kids-house-game/assets/butter-check-floor-C8HdmZ0P.svg",h3="/kids-house-game/assets/mint-checks-7rTweT19.png",u3="/kids-house-game/assets/mint-checks-rWbOdhfH.svg",m3="/kids-house-game/assets/sky-clouds-9-shWk3w.png",y3="/kids-house-game/assets/sky-clouds-DUJlygwI.svg",b3="/kids-house-game/assets/sky-tiles-Cu-Ga741.png",k3="/kids-house-game/assets/sky-tiles-xxuodD5m.svg",w3="/kids-house-game/assets/sunny-stars-Bc3CbIvZ.png",v3="/kids-house-game/assets/sunny-stars-C6fsFX70.svg",_3="/kids-house-game/assets/leafy-cream-Cv5o-u-w.png",$3="/kids-house-game/assets/leafy-cream-WIcyLI1T.svg",x3="/kids-house-game/assets/orange-gingham-BjUerG-F.png",M3="/kids-house-game/assets/orange-gingham-CVNizWBt.svg",L3="/kids-house-game/assets/terracotta-tiles-dXqpLLce.png",E3="/kids-house-game/assets/terracotta-tiles-j3yOSRI7.svg",C3="/kids-house-game/assets/wood-panel-BGEVUu4R.png",S3="/kids-house-game/assets/wood-panel-Dob8WRpW.svg",P3="/kids-house-game/assets/wood-planks-vE8-OOXo.png",T3="/kids-house-game/assets/wood-planks-4TUYjAkF.svg",B3="/kids-house-game/assets/wc-cabin-planks-Icu9n6YO.webp",R3="/kids-house-game/assets/wc-candy-stripe-cOBsT1Xj.webp",A3="/kids-house-game/assets/wc-frosty-dots-DmQgGwJW.webp",D3="/kids-house-game/assets/wc-mint-pine-5FYK_dVo.webp",I3="/kids-house-game/assets/wc-peppermint-tiles-ChaNg2gF.webp",H3="/kids-house-game/assets/wc-red-plaid-CcQ3BMhN.webp",O3="/kids-house-game/assets/wc-snow-knit-DEFXSv74.webp",W3="/kids-house-game/assets/wc-snowflake-sky-DrRAdoDP.webp",sf={small:80,medium:150,large:260},U3={"welcome-home":"Welcome Home","sunny-vibes":"Sunny Vibes",glossy:"Glossy",cottage:"Cozy Cottage",...tm},Gp=e=>U3[e]??e.replace(/[-_]+/g," ").replace(/\b\w/g,t=>t.toUpperCase()),V3=Object.assign({"../assets/items/manifest.json":n2,"../assets/patterns/manifest.json":s2}),of=Object.assign({"../assets/items/bedroom/alarm-clock.png":o2,"../assets/items/bedroom/alarm-clock.svg":i2,"../assets/items/bedroom/bedtime-snack.png":a2,"../assets/items/bedroom/bedtime-snack.svg":r2,"../assets/items/bedroom/book-stack.png":l2,"../assets/items/bedroom/book-stack.svg":c2,"../assets/items/bedroom/bunk-bed.png":d2,"../assets/items/bedroom/bunk-bed.svg":f2,"../assets/items/bedroom/bunny-slippers.png":p2,"../assets/items/bedroom/bunny-slippers.svg":g2,"../assets/items/bedroom/canopy-bed.png":h2,"../assets/items/bedroom/canopy-bed.svg":u2,"../assets/items/bedroom/cat-bed.png":m2,"../assets/items/bedroom/cat-bed.svg":y2,"../assets/items/bedroom/cloud-rug.png":b2,"../assets/items/bedroom/cloud-rug.svg":k2,"../assets/items/bedroom/cloud-shelf.png":w2,"../assets/items/bedroom/cloud-shelf.svg":v2,"../assets/items/bedroom/cork-board.png":_2,"../assets/items/bedroom/cork-board.svg":$2,"../assets/items/bedroom/daisy-pot.png":x2,"../assets/items/bedroom/daisy-pot.svg":M2,"../assets/items/bedroom/desk.png":L2,"../assets/items/bedroom/desk.svg":E2,"../assets/items/bedroom/dino-plush.png":C2,"../assets/items/bedroom/dino-plush.svg":S2,"../assets/items/bedroom/doll-house.png":P2,"../assets/items/bedroom/doll-house.svg":T2,"../assets/items/bedroom/dresser.png":B2,"../assets/items/bedroom/dresser.svg":R2,"../assets/items/bedroom/egg-chair.png":A2,"../assets/items/bedroom/egg-chair.svg":D2,"../assets/items/bedroom/floor-fan.png":I2,"../assets/items/bedroom/floor-fan.svg":H2,"../assets/items/bedroom/guinea-pig.png":O2,"../assets/items/bedroom/guinea-pig.svg":W2,"../assets/items/bedroom/hamster-cage.png":U2,"../assets/items/bedroom/hamster-cage.svg":V2,"../assets/items/bedroom/heart-rug.png":z2,"../assets/items/bedroom/heart-rug.svg":Q2,"../assets/items/bedroom/lava-lamp.png":q2,"../assets/items/bedroom/lava-lamp.svg":Z2,"../assets/items/bedroom/moon-night-light.png":N2,"../assets/items/bedroom/moon-night-light.svg":F2,"../assets/items/bedroom/nightstand.png":j2,"../assets/items/bedroom/nightstand.svg":G2,"../assets/items/bedroom/paper-lantern.png":Y2,"../assets/items/bedroom/paper-lantern.svg":K2,"../assets/items/bedroom/piggy-bank.png":X2,"../assets/items/bedroom/piggy-bank.svg":J2,"../assets/items/bedroom/plant-stand.png":ey,"../assets/items/bedroom/plant-stand.svg":ty,"../assets/items/bedroom/play-tent.png":ny,"../assets/items/bedroom/play-tent.svg":sy,"../assets/items/bedroom/star-mobile.png":oy,"../assets/items/bedroom/star-mobile.svg":iy,"../assets/items/bedroom/toy-chest.png":ay,"../assets/items/bedroom/toy-chest.svg":ry,"../assets/items/bedroom/toy-robot.png":ly,"../assets/items/bedroom/toy-robot.svg":cy,"../assets/items/bedroom/toy-train.png":dy,"../assets/items/bedroom/toy-train.svg":fy,"../assets/items/bedroom/unicorn-plush.png":py,"../assets/items/bedroom/unicorn-plush.svg":gy,"../assets/items/bedroom/wardrobe.png":hy,"../assets/items/bedroom/wardrobe.svg":uy,"../assets/items/kitchen/bananas.png":my,"../assets/items/kitchen/bananas.svg":yy,"../assets/items/kitchen/bar-stool.png":by,"../assets/items/kitchen/bar-stool.svg":ky,"../assets/items/kitchen/bread-loaf.png":wy,"../assets/items/kitchen/bread-loaf.svg":vy,"../assets/items/kitchen/chick.png":_y,"../assets/items/kitchen/chick.svg":$y,"../assets/items/kitchen/china-hutch.png":xy,"../assets/items/kitchen/china-hutch.svg":My,"../assets/items/kitchen/cocoa-mug.png":Ly,"../assets/items/kitchen/cocoa-mug.svg":Ey,"../assets/items/kitchen/cookie-jar.png":Cy,"../assets/items/kitchen/cookie-jar.svg":Sy,"../assets/items/kitchen/cooking-pot.png":Py,"../assets/items/kitchen/cooking-pot.svg":Ty,"../assets/items/kitchen/cupcake.png":By,"../assets/items/kitchen/cupcake.svg":Ry,"../assets/items/kitchen/dish-rack.png":Ay,"../assets/items/kitchen/dish-rack.svg":Dy,"../assets/items/kitchen/fruit-bowl.png":Iy,"../assets/items/kitchen/fruit-bowl.svg":Hy,"../assets/items/kitchen/frying-pan.png":Oy,"../assets/items/kitchen/frying-pan.svg":Wy,"../assets/items/kitchen/happy-fridge.png":Uy,"../assets/items/kitchen/happy-fridge.svg":Vy,"../assets/items/kitchen/herb-box.png":zy,"../assets/items/kitchen/herb-box.svg":Qy,"../assets/items/kitchen/high-chair.png":qy,"../assets/items/kitchen/high-chair.svg":Zy,"../assets/items/kitchen/ice-cream.png":Ny,"../assets/items/kitchen/ice-cream.svg":Fy,"../assets/items/kitchen/kettle.png":jy,"../assets/items/kitchen/kettle.svg":Gy,"../assets/items/kitchen/kitchen-counter.png":Yy,"../assets/items/kitchen/kitchen-counter.svg":Ky,"../assets/items/kitchen/kitchen-sink.png":Xy,"../assets/items/kitchen/kitchen-sink.svg":Jy,"../assets/items/kitchen/lemon-tree.png":eb,"../assets/items/kitchen/lemon-tree.svg":tb,"../assets/items/kitchen/microwave.png":nb,"../assets/items/kitchen/microwave.svg":sb,"../assets/items/kitchen/milk-bottle.png":ob,"../assets/items/kitchen/milk-bottle.svg":ib,"../assets/items/kitchen/pancakes.png":ab,"../assets/items/kitchen/pancakes.svg":rb,"../assets/items/kitchen/pantry-shelf.png":lb,"../assets/items/kitchen/pantry-shelf.svg":cb,"../assets/items/kitchen/pendant-lamp.png":db,"../assets/items/kitchen/pendant-lamp.svg":fb,"../assets/items/kitchen/pet-bowl.png":pb,"../assets/items/kitchen/pet-bowl.svg":gb,"../assets/items/kitchen/rice-cooker.png":hb,"../assets/items/kitchen/rice-cooker.svg":ub,"../assets/items/kitchen/runner-rug.png":mb,"../assets/items/kitchen/runner-rug.svg":yb,"../assets/items/kitchen/spice-rack.png":bb,"../assets/items/kitchen/spice-rack.svg":kb,"../assets/items/kitchen/stand-mixer.png":wb,"../assets/items/kitchen/stand-mixer.svg":vb,"../assets/items/kitchen/teapot.png":_b,"../assets/items/kitchen/teapot.svg":$b,"../assets/items/kitchen/toaster.png":xb,"../assets/items/kitchen/toaster.svg":Mb,"../assets/items/kitchen/utensil-rail.png":Lb,"../assets/items/kitchen/utensil-rail.svg":Eb,"../assets/items/kitchen/watermelon-slice.png":Cb,"../assets/items/kitchen/watermelon-slice.svg":Sb,"../assets/items/living/aquarium.png":Pb,"../assets/items/living/aquarium.svg":Tb,"../assets/items/living/arc-floor-lamp.png":Bb,"../assets/items/living/arc-floor-lamp.svg":Rb,"../assets/items/living/bean-bag.png":Ab,"../assets/items/living/bean-bag.svg":Db,"../assets/items/living/bird-cage.png":Ib,"../assets/items/living/bird-cage.svg":Hb,"../assets/items/living/blanket-basket.png":Ob,"../assets/items/living/blanket-basket.svg":Wb,"../assets/items/living/building-blocks.png":Ub,"../assets/items/living/building-blocks.svg":Vb,"../assets/items/living/coffee-table.png":zb,"../assets/items/living/coffee-table.svg":Qb,"../assets/items/living/comfy-armchair.png":qb,"../assets/items/living/comfy-armchair.svg":Zb,"../assets/items/living/cubby-shelf.png":Nb,"../assets/items/living/cubby-shelf.svg":Fb,"../assets/items/living/daisy-rug.png":jb,"../assets/items/living/daisy-rug.svg":Gb,"../assets/items/living/fiddle-leaf-fig.png":Yb,"../assets/items/living/fiddle-leaf-fig.svg":Kb,"../assets/items/living/fireplace.png":Xb,"../assets/items/living/fireplace.svg":Jb,"../assets/items/living/globe.png":ek,"../assets/items/living/globe.svg":tk,"../assets/items/living/hanging-planter.png":nk,"../assets/items/living/hanging-planter.svg":sk,"../assets/items/living/monstera-plant.png":ok,"../assets/items/living/monstera-plant.svg":ik,"../assets/items/living/piano.png":ak,"../assets/items/living/piano.svg":rk,"../assets/items/living/popcorn.png":lk,"../assets/items/living/popcorn.svg":ck,"../assets/items/living/pouf.png":dk,"../assets/items/living/pouf.svg":fk,"../assets/items/living/rainbow-rug.png":pk,"../assets/items/living/rainbow-rug.svg":gk,"../assets/items/living/rainbow-wall-art.png":hk,"../assets/items/living/rainbow-wall-art.svg":uk,"../assets/items/living/retro-radio.png":mk,"../assets/items/living/retro-radio.svg":yk,"../assets/items/living/rocking-chair.png":bk,"../assets/items/living/rocking-chair.svg":kk,"../assets/items/living/rocking-horse.png":wk,"../assets/items/living/rocking-horse.svg":vk,"../assets/items/living/snake-plant.png":_k,"../assets/items/living/snake-plant.svg":$k,"../assets/items/living/string-lights.png":xk,"../assets/items/living/string-lights.svg":Mk,"../assets/items/living/succulent-trio.png":Lk,"../assets/items/living/succulent-trio.svg":Ek,"../assets/items/living/tassel-rug.png":Ck,"../assets/items/living/tassel-rug.svg":Sk,"../assets/items/living/throw-pillow.png":Pk,"../assets/items/living/throw-pillow.svg":Tk,"../assets/items/living/toy-car.png":Bk,"../assets/items/living/toy-car.svg":Rk,"../assets/items/living/tulip-vase.png":Ak,"../assets/items/living/tulip-vase.svg":Dk,"../assets/items/living/turtle.png":Ik,"../assets/items/living/turtle.svg":Hk,"../assets/items/living/tv-stand.png":Ok,"../assets/items/living/tv-stand.svg":Wk,"../assets/items/living/wall-shelf.png":Uk,"../assets/items/living/wall-shelf.svg":Vk,"../assets/items/packs/cottage/cc-bakery-shelf.png":zk,"../assets/items/packs/cottage/cc-bakery-shelf.svg":Qk,"../assets/items/packs/cottage/cc-breakfast-table.png":qk,"../assets/items/packs/cottage/cc-breakfast-table.svg":Zk,"../assets/items/packs/cottage/cc-bubble-chair.png":Nk,"../assets/items/packs/cottage/cc-bubble-chair.svg":Fk,"../assets/items/packs/cottage/cc-canopy-daybed.png":jk,"../assets/items/packs/cottage/cc-canopy-daybed.svg":Gk,"../assets/items/packs/cottage/cc-cloud-beanbag.png":Yk,"../assets/items/packs/cottage/cc-cloud-beanbag.svg":Kk,"../assets/items/packs/cottage/cc-cloud-lamp.png":Xk,"../assets/items/packs/cottage/cc-cloud-lamp.svg":Jk,"../assets/items/packs/cottage/cc-cottage-aquarium.png":ew,"../assets/items/packs/cottage/cc-cottage-aquarium.svg":tw,"../assets/items/packs/cottage/cc-cupcake-stand.png":nw,"../assets/items/packs/cottage/cc-cupcake-stand.svg":sw,"../assets/items/packs/cottage/cc-dryer-chair.png":ow,"../assets/items/packs/cottage/cc-dryer-chair.svg":iw,"../assets/items/packs/cottage/cc-fairy-garland.png":aw,"../assets/items/packs/cottage/cc-fairy-garland.svg":rw,"../assets/items/packs/cottage/cc-fairy-shelf.png":lw,"../assets/items/packs/cottage/cc-fairy-shelf.svg":cw,"../assets/items/packs/cottage/cc-flower-kettle.png":dw,"../assets/items/packs/cottage/cc-flower-kettle.svg":fw,"../assets/items/packs/cottage/cc-flower-lamp.png":pw,"../assets/items/packs/cottage/cc-flower-lamp.svg":gw,"../assets/items/packs/cottage/cc-heart-bed.png":hw,"../assets/items/packs/cottage/cc-heart-bed.svg":uw,"../assets/items/packs/cottage/cc-heart-clock.png":mw,"../assets/items/packs/cottage/cc-heart-clock.svg":yw,"../assets/items/packs/cottage/cc-heart-pouf.png":bw,"../assets/items/packs/cottage/cc-heart-pouf.svg":kw,"../assets/items/packs/cottage/cc-heart-rug.png":ww,"../assets/items/packs/cottage/cc-heart-rug.svg":vw,"../assets/items/packs/cottage/cc-jewel-box.png":_w,"../assets/items/packs/cottage/cc-jewel-box.svg":$w,"../assets/items/packs/cottage/cc-light-vanity.png":xw,"../assets/items/packs/cottage/cc-light-vanity.svg":Mw,"../assets/items/packs/cottage/cc-macaron-jar.png":Lw,"../assets/items/packs/cottage/cc-macaron-jar.svg":Ew,"../assets/items/packs/cottage/cc-macrame-swing.png":Cw,"../assets/items/packs/cottage/cc-macrame-swing.svg":Sw,"../assets/items/packs/cottage/cc-mani-chair.png":Pw,"../assets/items/packs/cottage/cc-mani-chair.svg":Tw,"../assets/items/packs/cottage/cc-mint-fridge.png":Bw,"../assets/items/packs/cottage/cc-mint-fridge.svg":Rw,"../assets/items/packs/cottage/cc-mushroom-stool.png":Aw,"../assets/items/packs/cottage/cc-mushroom-stool.svg":Dw,"../assets/items/packs/cottage/cc-pastel-range.png":Iw,"../assets/items/packs/cottage/cc-pastel-range.svg":Hw,"../assets/items/packs/cottage/cc-perfume-tray.png":Ow,"../assets/items/packs/cottage/cc-perfume-tray.svg":Ww,"../assets/items/packs/cottage/cc-petal-table.png":Uw,"../assets/items/packs/cottage/cc-petal-table.svg":Vw,"../assets/items/packs/cottage/cc-plant-wall.png":zw,"../assets/items/packs/cottage/cc-plant-wall.svg":Qw,"../assets/items/packs/cottage/cc-reading-nook.png":qw,"../assets/items/packs/cottage/cc-reading-nook.svg":Zw,"../assets/items/packs/cottage/cc-record-player.png":Nw,"../assets/items/packs/cottage/cc-record-player.svg":Fw,"../assets/items/packs/cottage/cc-ribbon-mirror.png":jw,"../assets/items/packs/cottage/cc-ribbon-mirror.svg":Gw,"../assets/items/packs/cottage/cc-scallop-curtains.png":Yw,"../assets/items/packs/cottage/cc-scallop-curtains.svg":Kw,"../assets/items/packs/cottage/cc-scallop-loveseat.png":Xw,"../assets/items/packs/cottage/cc-scallop-loveseat.svg":Jw,"../assets/items/packs/cottage/cc-star-dresser.png":e4,"../assets/items/packs/cottage/cc-star-dresser.svg":t4,"../assets/items/packs/cottage/cc-teapot-set.png":n4,"../assets/items/packs/cottage/cc-teapot-set.svg":s4,"../assets/items/packs/cottage/cc-window-seat.png":o4,"../assets/items/packs/cottage/cc-window-seat.svg":i4,"../assets/items/packs/glossy/arched-shelf.png":a4,"../assets/items/packs/glossy/arched-shelf.svg":r4,"../assets/items/packs/glossy/blob-rug.png":l4,"../assets/items/packs/glossy/blob-rug.svg":c4,"../assets/items/packs/glossy/bubbly-plant.png":d4,"../assets/items/packs/glossy/bubbly-plant.svg":f4,"../assets/items/packs/glossy/bud-vase.png":p4,"../assets/items/packs/glossy/bud-vase.svg":g4,"../assets/items/packs/glossy/comb-brush.png":h4,"../assets/items/packs/glossy/comb-brush.svg":u4,"../assets/items/packs/glossy/cream-jars.png":m4,"../assets/items/packs/glossy/cream-jars.svg":y4,"../assets/items/packs/glossy/drop-lamp.png":b4,"../assets/items/packs/glossy/drop-lamp.svg":k4,"../assets/items/packs/glossy/droplet-buddy.png":w4,"../assets/items/packs/glossy/droplet-buddy.svg":v4,"../assets/items/packs/glossy/fancy-sofa.png":_4,"../assets/items/packs/glossy/fancy-sofa.svg":$4,"../assets/items/packs/glossy/flower-cart.png":x4,"../assets/items/packs/glossy/flower-cart.svg":M4,"../assets/items/packs/glossy/foot-spa.png":L4,"../assets/items/packs/glossy/foot-spa.svg":E4,"../assets/items/packs/glossy/globe-pendants.png":C4,"../assets/items/packs/glossy/globe-pendants.svg":S4,"../assets/items/packs/glossy/glow-mirror.png":P4,"../assets/items/packs/glossy/glow-mirror.svg":T4,"../assets/items/packs/glossy/gold-floor-mirror.png":B4,"../assets/items/packs/glossy/gold-floor-mirror.svg":R4,"../assets/items/packs/glossy/hair-dryer.png":A4,"../assets/items/packs/glossy/hair-dryer.svg":D4,"../assets/items/packs/glossy/heart-plant.png":I4,"../assets/items/packs/glossy/heart-plant.svg":H4,"../assets/items/packs/glossy/heart-pouf.png":O4,"../assets/items/packs/glossy/heart-pouf.svg":W4,"../assets/items/packs/glossy/lilac-curtain.png":U4,"../assets/items/packs/glossy/lilac-curtain.svg":V4,"../assets/items/packs/glossy/lotion-trio.png":z4,"../assets/items/packs/glossy/lotion-trio.svg":Q4,"../assets/items/packs/glossy/mani-lamp.png":q4,"../assets/items/packs/glossy/mani-lamp.svg":Z4,"../assets/items/packs/glossy/nail-table.png":N4,"../assets/items/packs/glossy/nail-table.svg":F4,"../assets/items/packs/glossy/pebble-rug.png":j4,"../assets/items/packs/glossy/pebble-rug.svg":G4,"../assets/items/packs/glossy/perfume-bottle.png":Y4,"../assets/items/packs/glossy/perfume-bottle.svg":K4,"../assets/items/packs/glossy/pink-fountain.png":X4,"../assets/items/packs/glossy/pink-fountain.svg":J4,"../assets/items/packs/glossy/pink-vanity.png":e6,"../assets/items/packs/glossy/pink-vanity.svg":t6,"../assets/items/packs/glossy/polish-bottle.png":n6,"../assets/items/packs/glossy/polish-bottle.svg":s6,"../assets/items/packs/glossy/polish-rack.png":o6,"../assets/items/packs/glossy/polish-rack.svg":i6,"../assets/items/packs/glossy/reception-desk.png":a6,"../assets/items/packs/glossy/reception-desk.svg":r6,"../assets/items/packs/glossy/salon-chair.png":l6,"../assets/items/packs/glossy/salon-chair.svg":c6,"../assets/items/packs/glossy/scent-candle.png":d6,"../assets/items/packs/glossy/scent-candle.svg":f6,"../assets/items/packs/glossy/spray-bottle.png":p6,"../assets/items/packs/glossy/spray-bottle.svg":g6,"../assets/items/packs/glossy/star-wall-sign.png":h6,"../assets/items/packs/glossy/star-wall-sign.svg":u6,"../assets/items/packs/glossy/swivel-stool.png":m6,"../assets/items/packs/glossy/swivel-stool.svg":y6,"../assets/items/packs/glossy/tiered-tray.png":b6,"../assets/items/packs/glossy/tiered-tray.svg":k6,"../assets/items/packs/glossy/towel-cart.png":w6,"../assets/items/packs/glossy/towel-cart.svg":v6,"../assets/items/packs/glossy/towel-stack.png":_6,"../assets/items/packs/glossy/towel-stack.svg":$6,"../assets/items/packs/glossy/vine-planter.png":x6,"../assets/items/packs/glossy/vine-planter.svg":M6,"../assets/items/packs/glossy/waiting-bench.png":L6,"../assets/items/packs/glossy/waiting-bench.svg":E6,"../assets/items/packs/glossy/wash-chair.png":C6,"../assets/items/packs/glossy/wash-chair.svg":S6,"../assets/items/packs/sunny-vibes/arched-mirror.png":P6,"../assets/items/packs/sunny-vibes/arched-mirror.svg":T6,"../assets/items/packs/sunny-vibes/big-monitor.png":B6,"../assets/items/packs/sunny-vibes/big-monitor.svg":R6,"../assets/items/packs/sunny-vibes/boba-cup.png":A6,"../assets/items/packs/sunny-vibes/boba-cup.svg":D6,"../assets/items/packs/sunny-vibes/bubble-bath.png":I6,"../assets/items/packs/sunny-vibes/bubble-bath.svg":H6,"../assets/items/packs/sunny-vibes/cactus-buddy.png":O6,"../assets/items/packs/sunny-vibes/cactus-buddy.svg":W6,"../assets/items/packs/sunny-vibes/caterpillar-plush.png":U6,"../assets/items/packs/sunny-vibes/caterpillar-plush.svg":V6,"../assets/items/packs/sunny-vibes/checker-bed.png":z6,"../assets/items/packs/sunny-vibes/checker-bed.svg":Q6,"../assets/items/packs/sunny-vibes/checker-rug.png":q6,"../assets/items/packs/sunny-vibes/checker-rug.svg":Z6,"../assets/items/packs/sunny-vibes/clothes-rail.png":N6,"../assets/items/packs/sunny-vibes/clothes-rail.svg":F6,"../assets/items/packs/sunny-vibes/cloud-sofa.png":j6,"../assets/items/packs/sunny-vibes/cloud-sofa.svg":G6,"../assets/items/packs/sunny-vibes/cube-shelf.png":Y6,"../assets/items/packs/sunny-vibes/cube-shelf.svg":K6,"../assets/items/packs/sunny-vibes/curvy-desk.png":X6,"../assets/items/packs/sunny-vibes/curvy-desk.svg":J6,"../assets/items/packs/sunny-vibes/cute-speaker.png":ev,"../assets/items/packs/sunny-vibes/cute-speaker.svg":tv,"../assets/items/packs/sunny-vibes/desk-lamp.png":nv,"../assets/items/packs/sunny-vibes/desk-lamp.svg":sv,"../assets/items/packs/sunny-vibes/desk-mic.png":ov,"../assets/items/packs/sunny-vibes/desk-mic.svg":iv,"../assets/items/packs/sunny-vibes/flower-lamp.png":av,"../assets/items/packs/sunny-vibes/flower-lamp.svg":rv,"../assets/items/packs/sunny-vibes/frog-plush.png":lv,"../assets/items/packs/sunny-vibes/frog-plush.svg":cv,"../assets/items/packs/sunny-vibes/game-controller.png":dv,"../assets/items/packs/sunny-vibes/game-controller.svg":fv,"../assets/items/packs/sunny-vibes/gaming-chair.png":pv,"../assets/items/packs/sunny-vibes/gaming-chair.svg":gv,"../assets/items/packs/sunny-vibes/hamster-pet.png":hv,"../assets/items/packs/sunny-vibes/hamster-pet.svg":uv,"../assets/items/packs/sunny-vibes/headphones.png":mv,"../assets/items/packs/sunny-vibes/headphones.svg":yv,"../assets/items/packs/sunny-vibes/heart-light.png":bv,"../assets/items/packs/sunny-vibes/heart-light.svg":kv,"../assets/items/packs/sunny-vibes/keyboard.png":wv,"../assets/items/packs/sunny-vibes/keyboard.svg":vv,"../assets/items/packs/sunny-vibes/mini-fridge.png":_v,"../assets/items/packs/sunny-vibes/mini-fridge.svg":$v,"../assets/items/packs/sunny-vibes/pastel-wardrobe.png":xv,"../assets/items/packs/sunny-vibes/pastel-wardrobe.svg":Mv,"../assets/items/packs/sunny-vibes/phone-stand.png":Lv,"../assets/items/packs/sunny-vibes/phone-stand.svg":Ev,"../assets/items/packs/sunny-vibes/pothos-plant.png":Cv,"../assets/items/packs/sunny-vibes/pothos-plant.svg":Sv,"../assets/items/packs/sunny-vibes/puffy-stool.png":Pv,"../assets/items/packs/sunny-vibes/puffy-stool.svg":Tv,"../assets/items/packs/sunny-vibes/ring-light.png":Bv,"../assets/items/packs/sunny-vibes/ring-light.svg":Rv,"../assets/items/packs/sunny-vibes/side-table-round.png":Av,"../assets/items/packs/sunny-vibes/side-table-round.svg":Dv,"../assets/items/packs/sunny-vibes/star-lamp.png":Iv,"../assets/items/packs/sunny-vibes/star-lamp.svg":Hv,"../assets/items/packs/sunny-vibes/sticker-board.png":Ov,"../assets/items/packs/sunny-vibes/sticker-board.svg":Wv,"../assets/items/packs/sunny-vibes/sunny-art.png":Uv,"../assets/items/packs/sunny-vibes/sunny-art.svg":Vv,"../assets/items/packs/sunny-vibes/sv-bean-bag.png":zv,"../assets/items/packs/sunny-vibes/sv-bean-bag.svg":Qv,"../assets/items/packs/sunny-vibes/sv-cloud-rug.png":qv,"../assets/items/packs/sunny-vibes/sv-cloud-rug.svg":Zv,"../assets/items/packs/sunny-vibes/sv-wall-shelf.png":Nv,"../assets/items/packs/sunny-vibes/sv-wall-shelf.svg":Fv,"../assets/items/packs/sunny-vibes/vlog-camera.png":jv,"../assets/items/packs/sunny-vibes/vlog-camera.svg":Gv,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.png":Yv,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.svg":Kv,"../assets/items/packs/welcome-home/acorn-friend.png":Xv,"../assets/items/packs/welcome-home/acorn-friend.svg":Jv,"../assets/items/packs/welcome-home/apple-tree.png":e_,"../assets/items/packs/welcome-home/apple-tree.svg":t_,"../assets/items/packs/welcome-home/big-wardrobe.png":n_,"../assets/items/packs/welcome-home/big-wardrobe.svg":s_,"../assets/items/packs/welcome-home/box-stack.png":o_,"../assets/items/packs/welcome-home/box-stack.svg":i_,"../assets/items/packs/welcome-home/brick-fireplace.png":a_,"../assets/items/packs/welcome-home/brick-fireplace.svg":r_,"../assets/items/packs/welcome-home/bulletin-board.png":l_,"../assets/items/packs/welcome-home/bulletin-board.svg":c_,"../assets/items/packs/welcome-home/cozy-mug.png":d_,"../assets/items/packs/welcome-home/cozy-mug.svg":f_,"../assets/items/packs/welcome-home/cream-sofa.png":p_,"../assets/items/packs/welcome-home/cream-sofa.svg":g_,"../assets/items/packs/welcome-home/fire-pit.png":h_,"../assets/items/packs/welcome-home/fire-pit.svg":u_,"../assets/items/packs/welcome-home/glass-cabinet.png":m_,"../assets/items/packs/welcome-home/glass-cabinet.svg":y_,"../assets/items/packs/welcome-home/hanging-lantern.png":b_,"../assets/items/packs/welcome-home/hanging-lantern.svg":k_,"../assets/items/packs/welcome-home/knit-cushion.png":w_,"../assets/items/packs/welcome-home/knit-cushion.svg":v_,"../assets/items/packs/welcome-home/ladder-shelf.png":__,"../assets/items/packs/welcome-home/ladder-shelf.svg":$_,"../assets/items/packs/welcome-home/landscape-art.png":x_,"../assets/items/packs/welcome-home/landscape-art.svg":M_,"../assets/items/packs/welcome-home/lattice-bench.png":L_,"../assets/items/packs/welcome-home/lattice-bench.svg":E_,"../assets/items/packs/welcome-home/leaf-wreath.png":C_,"../assets/items/packs/welcome-home/leaf-wreath.svg":S_,"../assets/items/packs/welcome-home/mini-greenhouse.png":P_,"../assets/items/packs/welcome-home/mini-greenhouse.svg":T_,"../assets/items/packs/welcome-home/moving-box.png":B_,"../assets/items/packs/welcome-home/moving-box.svg":R_,"../assets/items/packs/welcome-home/picnic-basket.png":A_,"../assets/items/packs/welcome-home/picnic-basket.svg":D_,"../assets/items/packs/welcome-home/round-rug.png":I_,"../assets/items/packs/welcome-home/round-rug.svg":H_,"../assets/items/packs/welcome-home/sale-sign.png":O_,"../assets/items/packs/welcome-home/sale-sign.svg":W_,"../assets/items/packs/welcome-home/sprout-pot.png":U_,"../assets/items/packs/welcome-home/sprout-pot.svg":V_,"../assets/items/packs/welcome-home/stripe-runner.png":z_,"../assets/items/packs/welcome-home/stripe-runner.svg":Q_,"../assets/items/packs/welcome-home/trailing-plant.png":q_,"../assets/items/packs/welcome-home/trailing-plant.svg":Z_,"../assets/items/packs/welcome-home/wall-clock.png":N_,"../assets/items/packs/welcome-home/wall-clock.svg":F_,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.png":j_,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.svg":G_,"../assets/items/packs/welcome-home/wh-book-stack.png":Y_,"../assets/items/packs/welcome-home/wh-book-stack.svg":K_,"../assets/items/packs/welcome-home/wh-dresser.png":X_,"../assets/items/packs/welcome-home/wh-dresser.svg":J_,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.png":e8,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.svg":t8,"../assets/items/packs/welcome-home/wh-kitchen-counter.png":n8,"../assets/items/packs/welcome-home/wh-kitchen-counter.svg":s8,"../assets/items/packs/welcome-home/wh-nightstand.png":o8,"../assets/items/packs/welcome-home/wh-nightstand.svg":i8,"../assets/items/packs/welcome-home/wh-pendant-lamp.png":a8,"../assets/items/packs/welcome-home/wh-pendant-lamp.svg":r8,"../assets/items/packs/welcome-home/wh-snake-plant.png":l8,"../assets/items/packs/welcome-home/wh-snake-plant.svg":c8,"../assets/items/packs/welcome-home/wh-string-lights.png":d8,"../assets/items/packs/welcome-home/wh-string-lights.svg":f8,"../assets/items/packs/welcome-home/wh-teapot.png":p8,"../assets/items/packs/welcome-home/wh-teapot.svg":g8,"../assets/items/packs/welcome-home/wood-armchair.png":h8,"../assets/items/packs/welcome-home/wood-armchair.svg":u8,"../assets/items/packs/welcome-home/wood-bookshelf.png":m8,"../assets/items/packs/welcome-home/wood-bookshelf.svg":y8,"../assets/items/packs/welcome-home/wood-coffee-table.png":b8,"../assets/items/packs/welcome-home/wood-coffee-table.svg":k8,"../assets/items/packs/welcome-home/wood-desk.png":w8,"../assets/items/packs/welcome-home/wood-desk.svg":v8,"../assets/items/packs/welcome-home/wood-stool.png":_8,"../assets/items/packs/welcome-home/wood-stool.svg":$8,"../assets/items/packs/welcome-home/wooden-bed.png":x8,"../assets/items/packs/welcome-home/wooden-bed.svg":M8,"../assets/items/packs/winter/wc-bauble-garland.webp":L8,"../assets/items/packs/winter/wc-berry-wreath.webp":E8,"../assets/items/packs/winter/wc-birch-basket.webp":C8,"../assets/items/packs/winter/wc-cabin-picture.webp":S8,"../assets/items/packs/winter/wc-candle-trio.webp":P8,"../assets/items/packs/winter/wc-cane-lamp.webp":T8,"../assets/items/packs/winter/wc-cinnamon-tray.webp":B8,"../assets/items/packs/winter/wc-cocoa-cart.webp":R8,"../assets/items/packs/winter/wc-cocoa-mug.webp":A8,"../assets/items/packs/winter/wc-cocoa-pot.webp":D8,"../assets/items/packs/winter/wc-cookie-oven.webp":I8,"../assets/items/packs/winter/wc-cookie-plate.webp":H8,"../assets/items/packs/winter/wc-frost-bookcase.webp":O8,"../assets/items/packs/winter/wc-frosted-pine.webp":W8,"../assets/items/packs/winter/wc-fur-bench.webp":U8,"../assets/items/packs/winter/wc-gingerbread-village.webp":V8,"../assets/items/packs/winter/wc-gingerbread.webp":z8,"../assets/items/packs/winter/wc-globe-lamp.webp":Q8,"../assets/items/packs/winter/wc-holiday-tree.webp":q8,"../assets/items/packs/winter/wc-holly.webp":Z8,"../assets/items/packs/winter/wc-ice-skates.webp":N8,"../assets/items/packs/winter/wc-ice-wardrobe.webp":F8,"../assets/items/packs/winter/wc-knit-armchair.webp":j8,"../assets/items/packs/winter/wc-lantern.webp":G8,"../assets/items/packs/winter/wc-log-bench.webp":Y8,"../assets/items/packs/winter/wc-marshmallow-jar.webp":K8,"../assets/items/packs/winter/wc-mitten-line.webp":X8,"../assets/items/packs/winter/wc-mitten-ottoman.webp":J8,"../assets/items/packs/winter/wc-mug-shelf.webp":e$,"../assets/items/packs/winter/wc-nutcracker.webp":t$,"../assets/items/packs/winter/wc-penguin-chair.webp":n$,"../assets/items/packs/winter/wc-penguin-plush.webp":s$,"../assets/items/packs/winter/wc-peppermint-counter.webp":o$,"../assets/items/packs/winter/wc-peppermint-rug.webp":i$,"../assets/items/packs/winter/wc-pinecone-garland.webp":a$,"../assets/items/packs/winter/wc-pinecone-table.webp":r$,"../assets/items/packs/winter/wc-plaid-bed.webp":l$,"../assets/items/packs/winter/wc-plaid-sofa.webp":c$,"../assets/items/packs/winter/wc-poinsettia.webp":d$,"../assets/items/packs/winter/wc-polar-plush.webp":f$,"../assets/items/packs/winter/wc-pom-rug.webp":p$,"../assets/items/packs/winter/wc-present-stack.webp":g$,"../assets/items/packs/winter/wc-reindeer.webp":h$,"../assets/items/packs/winter/wc-sled-table.webp":u$,"../assets/items/packs/winter/wc-sleigh-planter.webp":m$,"../assets/items/packs/winter/wc-snow-globe.webp":y$,"../assets/items/packs/winter/wc-snow-mobile.webp":b$,"../assets/items/packs/winter/wc-snow-nightstand.webp":k$,"../assets/items/packs/winter/wc-snow-window.webp":w$,"../assets/items/packs/winter/wc-snowman.webp":v$,"../assets/items/packs/winter/wc-snowshoes.webp":_$,"../assets/items/packs/winter/wc-sock-hamper.webp":$$,"../assets/items/packs/winter/wc-star-topper.webp":x$,"../assets/items/packs/winter/wc-stocking-row.webp":M$,"../assets/items/packs/winter/wc-stone-hearth.webp":L$,"../assets/items/packs/winter/wc-twinkle-lamp.webp":E$,"../assets/items/packs/winter/wc-twinkle-string.webp":C$,"../assets/items/packs/winter/wc-window-seat.webp":S$,"../assets/items/packs/winter/wc-woodstove.webp":P$}),af=Object.assign({"../assets/patterns/cottage/cc-butter-polka.png":T$,"../assets/patterns/cottage/cc-butter-polka.svg":B$,"../assets/patterns/cottage/cc-cream-hex.png":R$,"../assets/patterns/cottage/cc-cream-hex.svg":A$,"../assets/patterns/cottage/cc-lavender-lattice.png":D$,"../assets/patterns/cottage/cc-lavender-lattice.svg":I$,"../assets/patterns/cottage/cc-lilac-gingham.png":H$,"../assets/patterns/cottage/cc-lilac-gingham.svg":O$,"../assets/patterns/cottage/cc-mint-checks.png":W$,"../assets/patterns/cottage/cc-mint-checks.svg":U$,"../assets/patterns/cottage/cc-mint-florals.png":V$,"../assets/patterns/cottage/cc-mint-florals.svg":z$,"../assets/patterns/cottage/cc-peach-scallops.png":Q$,"../assets/patterns/cottage/cc-peach-scallops.svg":q$,"../assets/patterns/cottage/cc-pink-plaid.png":Z$,"../assets/patterns/cottage/cc-pink-plaid.svg":N$,"../assets/patterns/cottage/cc-rag-planks.png":F$,"../assets/patterns/cottage/cc-rag-planks.svg":j$,"../assets/patterns/cottage/cc-rose-herringbone.png":G$,"../assets/patterns/cottage/cc-rose-herringbone.svg":Y$,"../assets/patterns/glossy/lilac-stripes.png":K$,"../assets/patterns/glossy/lilac-stripes.svg":X$,"../assets/patterns/glossy/lilac-terrazzo.png":J$,"../assets/patterns/glossy/lilac-terrazzo.svg":e3,"../assets/patterns/glossy/mint-bubbles.png":t3,"../assets/patterns/glossy/mint-bubbles.svg":n3,"../assets/patterns/glossy/pink-check-floor.png":s3,"../assets/patterns/glossy/pink-check-floor.svg":o3,"../assets/patterns/glossy/pink-hearts.png":i3,"../assets/patterns/glossy/pink-hearts.svg":a3,"../assets/patterns/nursery/cloud-sky.svg":r3,"../assets/patterns/nursery/pastel-planks.svg":l3,"../assets/patterns/nursery/soft-carpet.svg":c3,"../assets/patterns/nursery/star-sprinkle.svg":d3,"../assets/patterns/nursery/tiny-hearts.svg":f3,"../assets/patterns/sunny-vibes/butter-check-floor.png":p3,"../assets/patterns/sunny-vibes/butter-check-floor.svg":g3,"../assets/patterns/sunny-vibes/mint-checks.png":h3,"../assets/patterns/sunny-vibes/mint-checks.svg":u3,"../assets/patterns/sunny-vibes/sky-clouds.png":m3,"../assets/patterns/sunny-vibes/sky-clouds.svg":y3,"../assets/patterns/sunny-vibes/sky-tiles.png":b3,"../assets/patterns/sunny-vibes/sky-tiles.svg":k3,"../assets/patterns/sunny-vibes/sunny-stars.png":w3,"../assets/patterns/sunny-vibes/sunny-stars.svg":v3,"../assets/patterns/welcome-home/leafy-cream.png":_3,"../assets/patterns/welcome-home/leafy-cream.svg":$3,"../assets/patterns/welcome-home/orange-gingham.png":x3,"../assets/patterns/welcome-home/orange-gingham.svg":M3,"../assets/patterns/welcome-home/terracotta-tiles.png":L3,"../assets/patterns/welcome-home/terracotta-tiles.svg":E3,"../assets/patterns/welcome-home/wood-panel.png":C3,"../assets/patterns/welcome-home/wood-panel.svg":S3,"../assets/patterns/welcome-home/wood-planks.png":P3,"../assets/patterns/welcome-home/wood-planks.svg":T3,"../assets/patterns/winter/wc-cabin-planks.webp":B3,"../assets/patterns/winter/wc-candy-stripe.webp":R3,"../assets/patterns/winter/wc-frosty-dots.webp":A3,"../assets/patterns/winter/wc-mint-pine.webp":D3,"../assets/patterns/winter/wc-peppermint-tiles.webp":I3,"../assets/patterns/winter/wc-red-plaid.webp":H3,"../assets/patterns/winter/wc-snow-knit.webp":O3,"../assets/patterns/winter/wc-snowflake-sky.webp":W3});function z3(e,t){if(!e||!e.trim())return[];try{const n=JSON.parse(e);return(Array.isArray(n)?n:[...Array.isArray(n?.items)?n.items:[],...Array.isArray(n?.patterns)?n.patterns:[]]).filter(o=>o&&typeof o.slug=="string"&&o.slug.trim())}catch(n){return console.warn(`[packs] ${t} is not valid JSON; ignoring`,n),[]}}const Yp=Object.entries(V3).flatMap(([e,t])=>z3(t,e)),Q3=["svg","png","webp","SVG","PNG","WEBP"];function Kp(e,t,n,s){for(const i of Q3){const a=e[`../assets/${t}/${n}/${s}.${i}`];if(a)return a}const o=Object.keys(e).find(i=>i.split("/").pop().replace(/\.\w+$/,"")===s);return o?e[o]:void 0}const rf={furniture:"furniture",appliance:"furniture",appliances:"furniture",seating:"furniture",storage:"furniture",bed:"furniture",table:"furniture",decor:"decor",rug:"decor",rugs:"decor",lighting:"decor",light:"decor",lamp:"decor",toy:"decor",toys:"decor","wall-art":"decor",art:"decor",beauty:"decor",plant:"plants",plants:"plants",flower:"plants",flowers:"plants",food:"food",drink:"food",drinks:"food",snack:"food",pet:"pets",pets:"pets",animal:"pets",animals:"pets"};function q3(e){const t=typeof e=="string"?e.trim().toLowerCase():"";return rf[t]??rf[t.replace(/s$/,"")]??"decor"}const po=(e,t)=>typeof e=="string"&&e.trim()?e.trim().toLowerCase():t,Xp=e=>["wallpaper","floor"].includes(po(e.type,"")),lf=new Set,Z3=Yp.filter(e=>!Xp(e)).flatMap(e=>{const t=po(e.room,"any"),n=e.slug.trim();if(lf.has(n))return[];lf.add(n);const o=[e.svg,e.png].filter(h=>typeof h=="string").map(h=>of["../assets/items/"+h.replace(/^\.?\//,"")]).find(Boolean)??Kp(of,"items",t,n);if(!o)return console.warn(`[packs] no image for items/${t}/${n}`),[];const i=po(e.pack,""),a=po(e.size,"medium"),r=q3(e.category),l=typeof e.gameW=="number"&&e.gameW>20&&e.gameW<800?e.gameW:sf[a]??sf.medium,c=typeof e.widthUnits=="number"&&typeof e.heightUnits=="number"&&e.widthUnits>0&&e.heightUnits>0?e.heightUnits/e.widthUnits:1,f=Math.round(l*Math.min(4,Math.max(.2,c))),d=typeof e.holdable=="boolean"?e.holdable:a!=="large"&&r!=="furniture",g=e.tag==="lighting"||/lamp|light|lantern|candle/i.test(n);return[{kind:`pack:${n}`,name:e.name||n,cat:r,rooms:[t],w:l,h:f,wall:e.wall===!0||void 0,svg:"",img:o,pack:i||void 0,holdable:d,light:g||void 0}]}),Rl=Yp.filter(Xp).flatMap(e=>{const t=po(e.pack,"extra"),n=e.slug.trim(),o=[e.svg,e.png].filter(i=>typeof i=="string").map(i=>af["../assets/patterns/"+i.replace(/^\.?\//,"")]).find(Boolean)??Kp(af,"patterns",t,n);return o?[{id:`${t}/${n}`,name:e.name||n,pack:t,kind:po(e.type,"wallpaper"),url:o}]:(console.warn(`[packs] no image for patterns/${t}/${n}`),[])}),cf=Object.fromEntries(Rl.map(e=>[e.id,e])),$n="#5a3d5c",B=`stroke="${$n}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Jp=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="2.4" fill="${$n}"/><circle cx="${t}" cy="${n}" r="2.4" fill="${$n}"/><circle cx="${e+.8}" cy="${n-.8}" r=".8" fill="#fff"/><circle cx="${t+.8}" cy="${n-.8}" r=".8" fill="#fff"/>`,eg=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/><ellipse cx="${t}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/>`,Je='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>';function Xr(e,t,n){return`${Je}<ellipse cx="50" cy="78" rx="28" ry="16" fill="${t}" ${B}/><path d="M24 62 Q50 48 76 62 V78 Q50 92 24 78 Z" fill="${t}" ${B}/>
    <circle cx="50" cy="40" r="18" fill="${e}" ${B}/>${Jp(43,57,40)}${eg(38,62,48)}<path d="M46 50 q4 3 8 0" fill="none" ${B}/>
    <path d="M38 26 Q50 16 62 26" fill="${n}" ${B}/><circle cx="50" cy="24" r="3" fill="${n}" ${B}/>`}const tg=[{kind:"crib",name:"Crib",cat:"furniture",w:260,svg:`${Je}<rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${B}/><path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${B}/><rect x="6" y="22" width="88" height="12" rx="6" fill="#9ad7f5" ${B}/><rect x="14" y="48" width="72" height="16" rx="6" fill="#ffe0ec"/><ellipse cx="32" cy="56" rx="8" ry="5" fill="#fff" ${B}/><ellipse cx="50" cy="56" rx="8" ry="5" fill="#c9e7ff" ${B}/>`},{kind:"bassinet",name:"Bassinet",cat:"furniture",w:170,svg:`${Je}<path d="M18 78 Q8 78 10 64 L22 36 H78 L90 64 Q92 78 82 78 Z" fill="#fff" ${B}/><ellipse cx="50" cy="36" rx="32" ry="10" fill="#fff" ${B}/><path d="M22 40 Q50 52 78 40" fill="#ffe0ec" ${B}/><ellipse cx="50" cy="44" rx="16" ry="7" fill="#fff"/><path d="M30 78 L22 94 M70 78 L78 94" ${B}/><ellipse cx="50" cy="90" rx="28" ry="4" fill="none" ${B}/><path d="M14 22 Q50 4 86 22" fill="none" stroke="#9ad7f5" stroke-width="6" stroke-linecap="round"/>`},{kind:"rocker",name:"Rocker",cat:"furniture",w:190,svg:`${Je}<path d="M16 88 Q50 98 84 88" fill="none" ${B}/><path d="M28 84 Q50 74 72 84" fill="#c9a0dc" ${B}/><rect x="30" y="28" width="40" height="36" rx="12" fill="#e4ccf2" ${B}/><path d="M22 48 Q18 70 30 80 H70 Q82 70 78 48 Z" fill="#f6e6ff" ${B}/><rect x="36" y="58" width="28" height="12" rx="6" fill="#ffc8dd" ${B}/><circle cx="50" cy="40" r="6" fill="#fff" opacity=".7"/>`},{kind:"changing-table",name:"Changing Table",cat:"furniture",w:230,svg:`${Je}<rect x="8" y="36" width="84" height="16" rx="8" fill="#fff" ${B}/><rect x="14" y="40" width="72" height="8" rx="4" fill="#ffd6e8"/><rect x="16" y="52" width="28" height="32" rx="6" fill="#bde0fe" ${B}/><rect x="56" y="52" width="28" height="32" rx="6" fill="#c9f0d8" ${B}/><path d="M22 60 H38 M22 68 H38 M62 60 H78 M62 68 H78" ${B}/><rect x="18" y="84" width="8" height="10" rx="2" fill="${$n}"/><rect x="74" y="84" width="8" height="10" rx="2" fill="${$n}"/><rect x="34" y="22" width="18" height="12" rx="3" fill="#ffe0ec" ${B}/><rect x="54" y="24" width="16" height="10" rx="3" fill="#fff6d8" ${B}/>`},{kind:"toy-bin",name:"Toy Bin",cat:"furniture",w:150,svg:`${Je}<path d="M14 40 H86 L78 90 H22 Z" fill="#ffd166" ${B}/><rect x="10" y="32" width="80" height="14" rx="7" fill="#ffe08a" ${B}/><circle cx="36" cy="58" r="8" fill="#ff8fab" ${B}/><rect x="50" y="50" width="16" height="16" rx="3" fill="#8ecae6" ${B}/><circle cx="62" cy="70" r="6" fill="#90e0a8" ${B}/>`},{kind:"baby-shelf",name:"Bookshelf",cat:"furniture",w:150,svg:`${Je}<rect x="14" y="8" width="72" height="84" rx="8" fill="#f3d2b5" ${B}/><path d="M14 36 H86 M14 64 H86" ${B}/><rect x="22" y="14" width="8" height="18" rx="2" fill="#ff8fab" ${B}/><rect x="32" y="18" width="8" height="14" rx="2" fill="#8ecae6" ${B}/><rect x="44" y="14" width="8" height="18" rx="2" fill="#ffd166" ${B}/><rect x="58" y="16" width="8" height="16" rx="2" fill="#90e0a8" ${B}/><circle cx="34" cy="50" r="7" fill="#ffadad" ${B}/><rect x="50" y="44" width="18" height="14" rx="3" fill="#c9a0dc" ${B}/><ellipse cx="40" cy="78" rx="14" ry="8" fill="#fff" ${B}/>`},{kind:"doll-rose",name:"Rose Doll",cat:"decor",w:80,svg:Xr("#f6d3b0","#ffc2d4","#ff8fab")},{kind:"doll-honey",name:"Honey Doll",cat:"decor",w:80,svg:Xr("#e0ac69","#cdeffd","#ffd166")},{kind:"doll-cocoa",name:"Cocoa Doll",cat:"decor",w:80,svg:Xr("#8d5524","#d8f3dc","#c9a0dc")},{kind:"crib-mobile",name:"Crib Mobile",cat:"decor",w:150,wall:!0,svg:`<path d="M50 6 V22" ${B}/><ellipse cx="50" cy="28" rx="28" ry="8" fill="#fff" ${B}/><path d="M28 32 V48 M50 36 V58 M72 32 V48" ${B}/><circle cx="28" cy="56" r="8" fill="#ffd166" ${B}/><circle cx="50" cy="68" r="9" fill="#ff8fab" ${B}/><path d="M72 56 l6 4 -6 4 -6 -4 z" fill="#8ecae6" ${B}/><circle cx="28" cy="54" r="2" fill="#fff"/><circle cx="50" cy="66" r="2" fill="#fff"/>`},{kind:"night-light",name:"Night Light",cat:"decor",w:70,svg:`${Je}<circle cx="50" cy="46" r="22" fill="#fff6c8" ${B}/><circle cx="50" cy="46" r="12" fill="#ffe08a"/><path d="M50 18 V10 M30 26 L24 20 M70 26 L76 20 M24 46 H14 M86 46 H76" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><rect x="40" y="70" width="20" height="16" rx="4" fill="#c9a0dc" ${B}/><circle cx="50" cy="78" r="3" fill="#ff8fab"/>`},{kind:"bunny-plush",name:"Bunny Plush",cat:"decor",w:90,svg:`${Je}<ellipse cx="34" cy="28" rx="8" ry="18" fill="#fff" ${B}/><ellipse cx="66" cy="28" rx="8" ry="18" fill="#fff" ${B}/><ellipse cx="34" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="66" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="50" cy="74" rx="26" ry="18" fill="#fff" ${B}/><circle cx="50" cy="50" r="20" fill="#fff" ${B}/>${Jp(43,57,50)}<path d="M47 58 l3 3 3 -3" fill="none" ${B}/>${eg(38,62,58)}`},{kind:"stacking-rings",name:"Stacking Rings",cat:"decor",w:70,svg:`${Je}<ellipse cx="50" cy="86" rx="26" ry="7" fill="#ff8fab" ${B}/><ellipse cx="50" cy="74" rx="20" ry="6" fill="#ffd166" ${B}/><ellipse cx="50" cy="64" rx="15" ry="5" fill="#8ecae6" ${B}/><ellipse cx="50" cy="56" rx="10" ry="4" fill="#90e0a8" ${B}/><rect x="46" y="28" width="8" height="40" rx="4" fill="#c9a0dc" ${B}/><circle cx="50" cy="24" r="7" fill="#ffb3c6" ${B}/>`},{kind:"rattle",name:"Rattle",cat:"decor",w:60,svg:`${Je}<circle cx="38" cy="40" r="20" fill="#ffd166" ${B}/><circle cx="32" cy="34" r="5" fill="#fff" opacity=".7"/><rect x="50" y="52" width="10" height="28" rx="5" fill="#ff8fab" ${B} transform="rotate(-20 55 66)"/><circle cx="68" cy="82" r="8" fill="#8ecae6" ${B}/>`},{kind:"baby-bottle",name:"Baby Bottle",cat:"food",w:55,svg:`${Je}<rect x="36" y="8" width="28" height="12" rx="4" fill="#c9a0dc" ${B}/><rect x="42" y="18" width="16" height="8" fill="#fff" ${B}/><path d="M30 30 H70 L66 88 Q50 96 34 88 Z" fill="#e7f6ff" ${B}/><path d="M32 48 H68 L66 80 Q50 88 34 80 Z" fill="#fff" opacity=".85"/><rect x="34" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="46" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="58" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/>`},{kind:"blocks",name:"Baby Blocks",cat:"decor",w:90,svg:`${Je}<rect x="14" y="58" width="28" height="28" rx="4" fill="#ff8fab" ${B}/><rect x="40" y="46" width="28" height="28" rx="4" fill="#ffd166" ${B}/><rect x="28" y="28" width="26" height="26" rx="4" fill="#8ecae6" ${B}/><path d="M20 72 H36 M48 60 H62 M34 42 H48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"rocking-horse",name:"Little Rocking Horse",cat:"decor",w:180,svg:`${Je}<path d="M12 86 Q50 98 88 82" fill="none" ${B}/><ellipse cx="48" cy="62" rx="26" ry="14" fill="#e6b88a" ${B}/><path d="M62 58 L84 40 Q92 36 90 48 L74 64 Z" fill="#f0d0b0" ${B}/><circle cx="82" cy="42" r="3" fill="${$n}"/><path d="M70 36 L76 24 L84 34" fill="#ff8fab" ${B}/><rect x="36" y="48" width="16" height="8" rx="3" fill="#c9a0dc" ${B}/><path d="M30 70 L22 84 M58 72 L66 86" ${B}/>`},{kind:"music-box",name:"Music Box",cat:"decor",w:80,svg:`${Je}<rect x="22" y="40" width="56" height="46" rx="8" fill="#f6d6ff" ${B}/><path d="M22 40 L50 22 L78 40" fill="#e4ccf2" ${B}/><circle cx="50" cy="64" r="10" fill="#fff" ${B}/><path d="M50 58 V70 M44 64 H56" ${B}/><circle cx="50" cy="30" r="4" fill="#ffd166" ${B}/>`},{kind:"cloud-rug",name:"Nursery Cloud Rug",cat:"decor",w:340,svg:`<ellipse cx="50" cy="78" rx="46" ry="16" fill="#e7f6ff" ${B}/><circle cx="28" cy="70" r="16" fill="#f4fbff" ${B}/><circle cx="50" cy="62" r="18" fill="#fff" ${B}/><circle cx="72" cy="70" r="16" fill="#f4fbff" ${B}/><ellipse cx="50" cy="78" rx="30" ry="8" fill="#d6f0ff"/>`},{kind:"play-mat",name:"Play Mat",cat:"decor",w:300,svg:`<rect x="6" y="62" width="88" height="30" rx="14" fill="#ffe0ec" ${B}/><path d="M50 70 C42 62 30 64 34 74 C38 82 50 88 50 88 C50 88 62 82 66 74 C70 64 58 62 50 70 Z" fill="#ff8fab" ${B}/><circle cx="22" cy="76" r="5" fill="#ffd166" ${B}/><circle cx="78" cy="76" r="5" fill="#8ecae6" ${B}/>`},{kind:"moon-art",name:"Moon and Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M58 18 A28 28 0 1 0 58 78 A18 18 0 1 1 58 18 Z" fill="#fff3b0" ${B}/><path d="M22 30 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1 z" fill="#ffd166" ${B}/><path d="M78 58 l2 5 5 1 -4 4 1 5 -4 -3 -4 3 1 -5 -4 -4 5 -1 z" fill="#c9e7ff" ${B}/>`},{kind:"nursery-dresser",name:"Nursery Dresser",cat:"furniture",w:170,svg:`${Je}<rect x="14" y="22" width="72" height="68" rx="8" fill="#f6e2c4" ${B}/><path d="M14 44 H86 M14 66 H86" ${B}/><circle cx="50" cy="34" r="3" fill="${$n}"/><circle cx="50" cy="55" r="3" fill="${$n}"/><circle cx="50" cy="76" r="3" fill="${$n}"/><rect x="30" y="10" width="18" height="12" rx="3" fill="#ffc2d4" ${B}/><rect x="52" y="12" width="16" height="10" rx="3" fill="#c9e7ff" ${B}/>`},{kind:"nursery-lamp",name:"Nursery Lamp",cat:"decor",w:80,svg:`${Je}<path d="M28 42 L36 12 H64 L72 42 Z" fill="#fff6c8" ${B}/><rect x="46" y="42" width="8" height="40" rx="4" fill="#c9a0dc" ${B}/><ellipse cx="50" cy="88" rx="20" ry="6" fill="#b388d6" ${B}/><circle cx="46" cy="24" r="3" fill="#fff" opacity=".85"/><path d="M34 20 q6 -8 4 -2" fill="none" stroke="#ffd166" stroke-width="2"/>`},{kind:"nursery-curtains",name:"Curtains",cat:"decor",w:180,wall:!0,svg:`<rect x="16" y="10" width="68" height="50" rx="6" fill="#cfefff" ${B}/><path d="M50 10 V60 M16 34 H84" ${B}/><path d="M8 8 Q18 28 10 92" fill="#ffd6e8" ${B}/><path d="M92 8 Q82 28 90 92" fill="#ffd6e8" ${B}/><rect x="6" y="6" width="88" height="8" rx="3" fill="#f3d2b5" ${B}/>`}],nt="#5a3d5c",w=(e=3.5)=>`stroke="${nt}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function ke(e,t,n){const s=Math.round(t*.62);return`<ellipse cx="${e}" cy="${n}" rx="${t}" ry="3.4" fill="${nt}" opacity=".08"/><ellipse cx="${e}" cy="${(n+1.2).toFixed(1)}" rx="${s}" ry="1.55" fill="${nt}" opacity=".12"/>`}function ee(e,t=2.2){return`<path d="${e}" fill="none" stroke="#fff" stroke-width="${t}" stroke-linecap="round" opacity=".75"/>`}function it(e,t=1.15){return`<path d="${e}" fill="none" stroke="${nt}" stroke-width="${t}" stroke-linecap="round" opacity=".2"/>`}function Bc(e,t,n=".7"){return`<radialGradient id="${e}" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="${t}" stop-opacity="${n}"/><stop offset="1" stop-color="${t}" stop-opacity="0"/></radialGradient>`}function Rc(e,t,n){return`<linearGradient id="${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t}"/><stop offset="1" stop-color="${n}"/></linearGradient>`}function N3(){return typeof location>"u"?!1:/(?:^|[?&])yard=1(?:&|$)/.test(location.search)}function Al(){return typeof location>"u"?"":new URLSearchParams(location.search).get("shot")||""}const F3={v:1,hair:"pigtails",hairC:"#a0522d",skin:"#f6d2b5",eyes:"big",eyeC:"#5a321c",freckles:!0,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"skirt",bottomC:"#c9a0dc",dress:"sundress",dressC:"#ff8fab",shoes:"maryjanes",shoesC:"#ffd166",acc:["bow"],accC:"#ff7aa8"},j3=()=>di(F3),Dl=864,Il={x:1084,y:578,flip:!0},jn={x:1184,y:255},df={x:1146,y:578},Hl={x:940,y:540,flip:!0},Ha=1160,ng={x:824,y:398,w:96,h:230},sg={x:996,y:372,w:82,h:196},G3=[{kind:"yard-swing",x:1266,y:580,scale:132/280},{kind:"lemonade-cart",x:1254,y:471},{kind:"sandbox",x:940,y:482},{kind:"picnic-blanket",x:939,y:420}];function we(e){return{kind:e.kind,name:e.name,cat:e.cat,w:e.w,h:e.h,vb:e.vb,wall:e.wall,holdable:e.holdable??!1,rooms:["backyard"],svg:e.svg}}const Y3=we({kind:"yard-swing",name:"A-Frame Swing",cat:"furniture",w:280,h:215,vb:"0 0 130 100",svg:`${ke(65,54,96)}
    <path d="M34 18 L50 18 L20 94 H4 Z" fill="#f3d2aa" ${w()}/>
    <path d="M42 24 L50 18 L18 70 H28 Z" fill="#d4a373"/>
    <path d="M80 18 L96 18 L126 94 H110 Z" fill="#e7c49a" ${w()}/>
    <path d="M108 22 L96 18 L126 94 H118 Z" fill="#c99366"/>
    ${it("M16 50 l8 28 M112 48 l8 30")}
    <rect x="22" y="6" width="86" height="14" rx="2" fill="#f6e0c4" ${w()}/>
    <rect x="86" y="9" width="18" height="8" rx="1" fill="#d4a373"/>
    <rect x="28" y="16" width="74" height="4" fill="#e7c49a"/>
    ${ee("M28 10 h30")}
    <g class="swingSeat">
      <rect x="48" y="74" width="34" height="7" rx="1" fill="#f3d2aa" ${w(2.2)}/>
      <rect x="72" y="76" width="8" height="4" fill="#d4a373"/>
      <path d="M54 20 V78 M76 20 V78" fill="none" ${w(2.2)}/>
      ${ee("M52 76 h14")}
    </g>`}),K3=we({kind:"sandbox",name:"Sandbox",cat:"furniture",w:120,h:54,vb:"0 0 160 72",svg:`${ke(80,64,68)}
    <path d="M108 38 L146 26 L146 52 L108 64 Z" fill="#e7c49a" ${w()}/>
    <path d="M126 36 L142 28 L142 48 L126 56 Z" fill="#c99366"/>
    <path d="M12 40 H108 V64 H12 Z" fill="#f3d2aa" ${w()}/>
    <path d="M12 40 L36 18 L146 18 L108 40 Z" fill="#f6e0c4" ${w()}/>
    <path d="M112 20 L142 20 L108 38 L90 38 Z" fill="#d4a373"/>
    <path d="M34 36 L52 24 L122 24 L100 36 Z" fill="#ffe08a" ${w(2.2)}/>
    <path d="M98 26 L118 26 L100 34 L86 34 Z" fill="#f0c36a"/>
    ${it("M48 30 q8 2 6 5 M68 28 q10 2 8 6 M58 34 h16")}
    <path d="M76 30 L100 36 L94 48 L70 42 Z" fill="#d7e6f2" ${w(2.2)}/>
    <path d="M88 34 L98 38 L94 44 L84 40 Z" fill="#b7c9d6"/>
    <path d="M52 8 L64 4 L90 34 L78 38 Z" fill="#f0d2b0" ${w()}/>
    <path d="M64 8 L72 6 L90 32 L82 34 Z" fill="#d4a373"/>
    <path d="M46 2 H66 V9 H46 Z" fill="#c99366" ${w(2)}/>
    ${ee("M18 44 h26")}
    ${ee("M44 22 h22")}`}),X3=we({kind:"little-slide",name:"Little Slide",cat:"furniture",w:150,h:188,vb:"0 0 110 140",svg:`${ke(56,44,134)}
    <path d="M50 34 H72 C94 36 102 56 98 82 L92 122 H70 L76 84 C78 60 72 46 52 44 Z" fill="#ffb3c6" ${w()}/>
    <path d="M72 38 C94 42 104 62 100 86 L94 122 H86 L92 86 C94 64 86 48 72 46 Z" fill="#e45d88"/>
    <rect x="14" y="34" width="8" height="96" rx="2" fill="#f3d2aa" ${w()}/>
    <rect x="36" y="34" width="8" height="96" rx="2" fill="#e7c49a" ${w()}/>
    <rect x="40" y="40" width="3" height="84" fill="#c99366"/>
    <rect x="14" y="52" width="30" height="5" rx="1" fill="#f6e0c4" ${w(2.2)}/>
    <rect x="14" y="70" width="30" height="5" rx="1" fill="#f6e0c4" ${w(2.2)}/>
    <rect x="14" y="88" width="30" height="5" rx="1" fill="#f6e0c4" ${w(2.2)}/>
    <rect x="14" y="106" width="30" height="5" rx="1" fill="#f6e0c4" ${w(2.2)}/>
    <rect x="6" y="18" width="56" height="22" rx="3" fill="#f3d2aa" ${w()}/>
    <rect x="6" y="34" width="56" height="6" fill="#d4a373"/>
    <path d="M48 20 H62 V40 H48 Z" fill="#c99366"/>
    ${ee("M12 24 h22")}
    <rect x="12" y="6" width="5" height="16" rx="1" fill="#f0d2b0" ${w(2.2)}/>
    <rect x="40" y="6" width="5" height="16" rx="1" fill="#e7c49a" ${w(2.2)}/>
    <path d="M14 8 H43" fill="none" ${w(2.2)}/>
    <rect x="80" y="116" width="7" height="16" rx="1" fill="#f3d2aa" ${w(2)}/>
    ${ee("M58 42 C74 48 86 66 86 88")}
    ${it("M80 64 q4 16 2 28")}`}),J3=we({kind:"yard-bench",name:"Garden Bench",cat:"furniture",w:140,h:100,vb:"0 0 140 100",svg:`${ke(70,58,96)}
    <rect x="10" y="8" width="12" height="86" rx="2" fill="#f3d2aa" ${w()}/>
    <rect x="118" y="8" width="12" height="86" rx="2" fill="#e7c49a" ${w()}/>
    <rect x="124" y="12" width="5" height="76" fill="#c99366"/>
    <rect x="28" y="52" width="10" height="42" rx="2" fill="#f0d2b0" ${w()}/>
    <rect x="102" y="52" width="10" height="42" rx="2" fill="#d4a373" ${w()}/>
    <rect x="108" y="56" width="3" height="32" fill="#c99366"/>
    <rect x="18" y="10" width="104" height="8" rx="1" fill="#f6e0c4" ${w(2.2)}/>
    <rect x="18" y="20" width="104" height="8" rx="1" fill="#f3d2aa" ${w(2.2)}/>
    <rect x="18" y="30" width="104" height="8" rx="1" fill="#f3d2aa" ${w(2.2)}/>
    <rect x="18" y="40" width="104" height="8" rx="1" fill="#e7c49a" ${w(2.2)}/>
    <rect x="18" y="48" width="104" height="7" rx="1" fill="#f6e0c4" ${w(2.2)}/>
    <rect x="18" y="57" width="104" height="7" rx="1" fill="#f3d2aa" ${w(2.2)}/>
    <rect x="18" y="66" width="104" height="7" rx="1" fill="#e7c49a" ${w(2.2)}/>
    <rect x="108" y="12" width="10" height="5" fill="#d4a373"/>
    <rect x="108" y="22" width="10" height="5" fill="#c99366"/>
    <rect x="108" y="50" width="10" height="4" fill="#d4a373"/>
    <rect x="108" y="68" width="10" height="4" fill="#c99366"/>
    <path d="M10 46 H40 V56 H10 Z" fill="#f6e0c4" ${w()}/>
    <path d="M100 46 H130 V56 H100 Z" fill="#e7c49a" ${w()}/>
    <path d="M116 48 H128 V54 H116 Z" fill="#c99366"/>
    ${ee("M22 13 h28")}
    ${ee("M14 48 h16")}
    ${it("M36 24 h48 M36 34 h44 M34 52 h52 M34 62 h46")}`}),e5=we({kind:"lemonade-cart",name:"Lemonade Cart",cat:"furniture",w:108,h:121,vb:"0 0 100 112",svg:`${ke(50,40,106)}
    <circle cx="30" cy="96" r="11" fill="${nt}" ${w(2.2)}/><circle cx="30" cy="96" r="4.5" fill="#ffd166"/>
    <circle cx="72" cy="96" r="11" fill="${nt}" ${w(2.2)}/><circle cx="72" cy="96" r="4.5" fill="#ffd166"/>
    <rect x="18" y="92" width="66" height="5" rx="2" fill="#c99366" ${w(2)}/>
    <rect x="16" y="46" width="68" height="46" rx="3" fill="#fff6ea" ${w()}/>
    <rect x="66" y="50" width="14" height="38" fill="#f0d2a4"/>
    ${it("M28 56 v28 M42 56 v28 M56 56 v28")}
    ${ee("M20 52 v16")}
    <rect x="12" y="38" width="76" height="12" rx="2" fill="#ffe08a" ${w()}/>
    <rect x="66" y="40" width="18" height="8" fill="#f0c45c"/>
    <path d="M14 40 L22 14 H80 L88 40 Z" fill="#ff8fab" ${w()}/>
    <path d="M34 16 L38 40 H50 L46 15 Z" fill="#fff4f7"/>
    <path d="M58 15 L62 40 H74 L70 15 Z" fill="#fff4f7"/>
    <path d="M72 16 H80 L88 40 H76 Z" fill="#e45d88"/>
    ${ee("M26 20 h18")}
    <path d="M28 52 H44 L42 72 H30 Z" fill="#fff" ${w(2)}/>
    <path d="M30 58 H42 L41 72 H31 Z" fill="#ffe566"/>
    <path d="M28 54 L22 58 L28 62 Z" fill="#fff" ${w(2)}/>
    <path d="M44 56 Q52 60 44 70" fill="none" ${w(2)}/>
    <path d="M56 60 H68 L66 72 H58 Z" fill="#fff" ${w(2)}/>
    <path d="M58 64 H66 L65 72 H59 Z" fill="#ffe566"/>
    <circle cx="78" cy="64" r="7" fill="#ffe566" ${w(2)}/>
    <path d="M78 58 v12 M72 64 h12" fill="none" stroke="#e0a83a" stroke-width="1.3"/>`}),t5=we({kind:"sun-lounger",name:"Sun Lounger",cat:"furniture",w:168,h:86,vb:"0 0 170 90",svg:`${ke(86,68,84)}
    <path d="M16 66 H28 L32 82 H12 Z" fill="#f3d2aa" ${w()}/>
    <path d="M126 64 H140 L146 82 H120 Z" fill="#d4a373" ${w()}/>
    <path d="M136 68 H142 L146 80 H138 Z" fill="#c99366"/>
    <path d="M12 52 H156 V64 H12 Z" fill="#f3d2aa" ${w()}/>
    <path d="M122 54 H154 V62 H122 Z" fill="#d4a373"/>
    <path d="M28 34 H36 L42 52 H32 Z" fill="#e7c49a" ${w()}/>
    <path d="M50 44 H150 L154 58 H54 Z" fill="#ffd4e2" ${w()}/>
    <path d="M128 48 H150 L154 58 H132 Z" fill="#e888a8"/>
    <path d="M18 6 L60 48 L48 58 L8 16 Z" fill="#ffb3c6" ${w()}/>
    <path d="M38 34 L54 48 L48 56 L30 42 Z" fill="#e45d88"/>
    <ellipse cx="22" cy="14" rx="11" ry="7" fill="#fff" ${w(2.2)}/>
    <path d="M22 8 H30 A7 7 0 0 1 30 20 H22 Z" fill="#ffd0e0"/>
    ${ee("M22 12 L50 40")}
    ${it("M26 22 L52 46")}`}),n5=we({kind:"splash-pool",name:"Splash Pool",cat:"furniture",w:176,h:96,vb:"0 0 170 96",svg:`<defs>${Rc("ydpoolW","#f3fbff","#7ec8e3")}</defs>
    ${ke(85,72,90)}
    <ellipse cx="85" cy="58" rx="74" ry="28" fill="#8ecae6" ${w()}/>
    <path d="M22 52 Q40 34 78 40" fill="none" stroke="#ff8fab" stroke-width="16" stroke-linecap="round"/>
    <path d="M100 36 Q138 38 152 58" fill="none" stroke="#ffd166" stroke-width="14" stroke-linecap="round"/>
    <path d="M18 66 C22 82 50 90 85 90 C120 90 152 82 154 66 C148 78 120 84 85 84 C50 84 24 78 18 66 Z" fill="#5aa9c6"/>
    <ellipse cx="85" cy="54" rx="48" ry="16" fill="url(#ydpoolW)" ${w(2.2)}/>
    ${ee("M36 50 q20 -10 36 0")}
    <circle cx="128" cy="48" r="4" fill="#fff" ${w(1.6)}/>
    <circle cx="128" cy="48" r="1.6" fill="#8ecae6"/>
    <path d="M70 46 q3 -8 1 0 M96 42 q4 -9 1 1" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`}),s5=we({kind:"picket-gate",name:"Picket Gate",cat:"furniture",w:110,h:150,vb:"0 0 100 136",svg:`${ke(50,38,130)}
    <rect x="6" y="16" width="12" height="110" rx="2" fill="#f7fff8" ${w()}/>
    <rect x="82" y="16" width="12" height="110" rx="2" fill="#e7f6ea" ${w()}/>
    <rect x="88" y="20" width="5" height="100" fill="#c5e0c8"/>
    <rect x="4" y="40" width="16" height="6" rx="1" fill="#c99366" ${w(2)}/>
    <rect x="4" y="96" width="16" height="6" rx="1" fill="#c99366" ${w(2)}/>
    <rect x="16" y="38" width="68" height="8" rx="2" fill="#fff" ${w(2.2)}/>
    <rect x="16" y="86" width="68" height="8" rx="2" fill="#fff" ${w(2.2)}/>
    <path d="M20 90 L28 98 L80 46 L72 38 Z" fill="#f7fff8" ${w(2.2)}/>
    <path d="M26 30 L32 14 L38 30 V112 H26 Z" fill="#fff" ${w(2.2)}/>
    <path d="M44 30 L50 14 L56 30 V112 H44 Z" fill="#f7fff8" ${w(2.2)}/>
    <path d="M62 30 L68 14 L74 30 V112 H62 Z" fill="#e7f6ea" ${w(2.2)}/>
    <path d="M68 22 L74 16 L74 108 H68 Z" fill="#c5e0c8"/>
    ${ee("M28 36 v20")}
    <rect x="74" y="60" width="16" height="5" rx="1" fill="#c99366" ${w(2)}/>
    <circle cx="86" cy="62" r="2.6" fill="#ffd166" ${w(1.8)}/>`});function o5(){let e="";for(let t=0;t<6;t++)for(let n=0;n<13;n++)(t+n)%2===0&&(e+=`<rect x="${n*15-6}" y="${t*10}" width="15" height="10" fill="#ff8fab"/>`);return e}const i5=we({kind:"picnic-blanket",name:"Picnic Blanket",cat:"decor",w:110,h:36,vb:"0 0 180 59",svg:`<defs><clipPath id="ydging"><path d="M22 20 L156 12 L174 44 L36 52 Z"/></clipPath></defs>
    ${ke(96,74,54)}
    <path d="M22 20 L156 12 L174 44 L36 52 Z" fill="#fff0f5" ${w()}/>
    <g clip-path="url(#ydging)">${o5()}</g>
    <path d="M148 14 L170 42 L160 46 L138 18 Z" fill="#e45d88"/>
    <path d="M96 30 L128 26 L134 42 L100 46 Z" fill="#f3d2aa" ${w(2)}/>
    <path d="M120 28 L128 26 L134 42 L126 43 Z" fill="#c99366"/>
    <path d="M104 30 Q114 14 126 28" fill="none" ${w(2.2)}/>
    ${it("M104 34 h22 M104 38 h24",1)}
    ${ee("M34 26 l28 -3")}`});function Io(e,t,n,s){return`<path d="M${e-1.5} ${t+16} H${e+1.5} V${t+40} H${e-1.5} Z" fill="#3d9a68"/>
    <path d="M${e} ${t+24} C${e-16} ${t+18} ${e-14} ${t+36} ${e-1} ${t+34}" fill="#74c69d" ${w(1.6)}/>
    <path d="M${e} ${t+22} C${e+16} ${t+16} ${e+12} ${t+36} ${e+1} ${t+32}" fill="#52b788"/>
    <path d="M${e} ${t+18} C${e-10} ${t+8} ${e-8} ${t} ${e} ${t+6} C${e+8} ${t} ${e+10} ${t+8} ${e} ${t+18} Z" fill="${n}" ${w(1.8)}/>
    <path d="M${e+1} ${t+6} C${e+7} ${t+4} ${e+8} ${t+13} ${e+1} ${t+15} Z" fill="${s}"/>`}const a5=we({kind:"tulip-bed",name:"Tulip Bed",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`${ke(70,56,86)}
    <path d="M10 56 H130 L120 82 H20 Z" fill="#f0d2b0" ${w()}/>
    <path d="M96 58 H126 L118 78 H92 Z" fill="#d4a373"/>
    <path d="M16 56 Q70 42 124 56 Q70 64 16 56 Z" fill="#c4a484" ${w(2.2)}/>
    ${ee("M22 60 h24")}
    ${Io(32,16,"#ff8fab","#e45d88")}
    ${Io(54,8,"#ffd166","#e0a83a")}
    ${Io(76,4,"#ff7096","#e04578")}
    ${Io(98,12,"#fff","#ffd0e0")}
    ${Io(118,18,"#c9a0dc","#b388d6")}`}),r5=we({kind:"birdbath",name:"Birdbath",cat:"decor",w:84,h:126,vb:"0 0 80 120",svg:`<defs>${Rc("ydbathW","#f3fbff","#8ecae6")}</defs>
    ${ke(40,28,114)}
    <ellipse cx="40" cy="106" rx="20" ry="7" fill="#e7eef2" ${w()}/>
    <path d="M30 46 H50 C56 70 58 86 52 104 H28 C22 86 24 70 30 46 Z" fill="#f4f7f8" ${w()}/>
    <path d="M42 52 H50 C54 72 54 88 50 100 H44 Z" fill="#c5d0d6"/>
    ${ee("M33 62 v22")}
    <ellipse cx="40" cy="40" rx="32" ry="13" fill="#f7fafb" ${w()}/>
    <path d="M40 28 C66 28 72 38 72 42 C72 52 58 54 40 54 C60 54 68 48 68 42 C68 36 58 32 40 34 Z" fill="#d5dee4"/>
    <ellipse cx="40" cy="38" rx="22" ry="7" fill="url(#ydbathW)" ${w(2.2)}/>
    ${ee("M22 36 q10 -4 18 0")}
    <path d="M48 30 L40 24 L42 34 Z" fill="#f0c45c" ${w(1.6)}/>
    <ellipse cx="56" cy="28" rx="11" ry="6" fill="#ffd166" ${w(1.8)}/>
    <circle cx="66" cy="24" r="4.5" fill="#ffe08a" ${w(1.6)}/>
    <path d="M70 24 L77 26 L70 28 Z" fill="#e07a3f"/>
    <circle cx="67" cy="23" r="1" fill="${nt}"/>
    <path d="M54 32 V40 M60 32 V40" fill="none" stroke="#c99366" stroke-width="1.4" stroke-linecap="round"/>`}),l5=we({kind:"lily-pond",name:"Lily Pond",cat:"decor",w:170,h:90,vb:"0 0 170 90",svg:`<defs>${Rc("ydpondW","#eaf6ff","#5aa9e6")}</defs>
    ${ke(85,70,84)}
    <ellipse cx="85" cy="54" rx="74" ry="28" fill="#c4a484" ${w()}/>
    <path d="M85 30 C142 32 158 48 158 56 C158 72 126 82 85 82 C124 80 150 68 150 56 C150 44 126 36 85 36 Z" fill="#a88462"/>
    <ellipse cx="85" cy="52" rx="62" ry="20" fill="url(#ydpondW)" ${w(2.2)}/>
    ${ee("M40 46 q24 -8 42 2")}
    <path fill="#95d5b2" ${w(2)} fill-rule="evenodd" d="M58 54 m-16 0 a16 7 0 1 0 32 0 a16 7 0 1 0 -32 0 M58 50 L72 54 L58 58 Z"/>
    <path d="M66 50 L74 54 L66 56 Z" fill="#3d9a68"/>
    <path fill="#74c69d" ${w(2)} fill-rule="evenodd" d="M112 48 m-18 0 a18 8 0 1 0 36 0 a18 8 0 1 0 -36 0 M112 42 L128 48 L112 54 Z"/>
    <path d="M40 58 q-4 -16 2 -22 q6 8 2 16" fill="#52b788" ${w(1.6)}/>
    <path d="M108 40 l2 -8 l4 6 l4 -7 l2 8 l-4 3 z" fill="#ff8fab" ${w(1.6)}/>
    <path d="M112 36 l3 -6 l2 5 l3 -5 l1 6 z" fill="#fff" ${w(1.4)}/>
    <circle cx="112" cy="40" r="2.4" fill="#ffd166"/>`});function Ho(e,t,n,s,o=10){return`<path d="M${e} ${t-o-8} V${t-o}" fill="none" ${w(2.2)}/>
    <rect x="${e-4}" y="${t-o-2}" width="8" height="5" rx="1" fill="#c99366" ${w(1.8)}/>
    <circle cx="${e}" cy="${t}" r="${o}" fill="${n}" ${w()}/>
    <path d="M${e+1} ${t-o+3} H${e+o-1} V${t+o-3} H${e+2} Z" fill="${s}"/>
    ${ee(`M${e-o+3} ${t-2} q2 -3 4 0`)}`}const c5=we({kind:"patio-lights",name:"Patio Lights",cat:"decor",w:190,h:70,vb:"0 0 180 70",wall:!0,svg:`<path d="M8 12 Q50 32 90 12 Q130 32 172 14" fill="none" ${w()}/>
    ${Ho(28,40,"#fff6c8","#f0c45c")}
    ${Ho(64,46,"#ffc2d4","#e45d88")}
    ${Ho(100,36,"#fff1c2","#f0c45c")}
    ${Ho(136,46,"#c9f1ff","#7eb4dc")}
    ${Ho(164,34,"#ffd0e8","#e888a8",8)}`}),d5=we({kind:"toadstool-light",name:"Toadstool Light",cat:"decor",w:70,h:84,vb:"0 0 80 96",svg:`<defs>${Bc("ydtoadG","#ffe7a0",".9")}</defs>
    ${ke(40,26,90)}
    <ellipse cx="40" cy="70" rx="18" ry="8" fill="url(#ydtoadG)"/>
    <path d="M32 58 H48 L52 84 H28 Z" fill="#fff7f8" ${w()}/>
    <path d="M42 60 H48 L50 82 H43 Z" fill="#f0d8cc"/>
    <path d="M6 58 Q40 8 74 58 Q40 74 6 58 Z" fill="#ff8fab" ${w()}/>
    <path d="M44 22 Q66 16 72 54 Q52 66 44 52 Z" fill="#e45d88"/>
    ${ee("M18 48 q16 -12 26 -2")}
    <circle cx="26" cy="48" r="5" fill="#fff" ${w(2)}/>
    <circle cx="44" cy="40" r="6" fill="#fff" ${w(2)}/>
    <circle cx="36" cy="56" r="3.5" fill="#fff" ${w(2)}/>
    <path d="M22 52 h6 M40 46 h8" fill="none" stroke="#ffd0e0" stroke-width="1.2" stroke-linecap="round"/>`}),f5=we({kind:"stepping-stones",name:"Stepping Stones",cat:"decor",w:160,h:64,vb:"0 0 160 70",svg:`${ke(80,66,64)}
    <path d="M8 40 L24 28 L50 32 L54 50 L30 58 L10 52 Z" fill="#f7f4ef" ${w()}/>
    <path d="M34 36 L50 32 L54 50 L36 54 Z" fill="#d9d3cc"/>
    <path d="M56 44 L78 32 L108 36 L112 56 L80 64 L58 58 Z" fill="#f4f1ec" ${w()}/>
    <path d="M86 40 L108 36 L112 56 L90 58 Z" fill="#d4cdc4"/>
    <path d="M110 30 L128 20 L154 28 L150 48 L124 52 L108 42 Z" fill="#e7e2dc" ${w()}/>
    <path d="M132 26 L152 28 L148 46 L130 44 Z" fill="#d0c9c2"/>
    ${ee("M16 38 q8 -4 14 0")}
    ${it("M22 44 h12 M72 48 h16 M124 36 h12")}`}),p5=we({kind:"pinwheel",name:"Pinwheel",cat:"decor",w:56,h:90,vb:"0 0 70 100",holdable:!0,svg:`${ke(35,16,96)}
    <rect x="31" y="44" width="6" height="50" rx="2" fill="#c99366" ${w()}/>
    <rect x="34" y="48" width="3" height="42" fill="#c99366"/>
    <path d="M34 40 L34 8 Q54 16 48 36 Z" fill="#ff8fab" ${w(2.2)}/>
    <path d="M42 18 Q50 28 36 34 Z" fill="#e45d88"/>
    <path d="M34 40 L62 32 Q58 54 40 50 Z" fill="#ffd166" ${w(2.2)}/>
    <path d="M54 38 Q58 48 42 46 Z" fill="#e0a83a"/>
    <path d="M34 40 L34 72 Q14 64 20 44 Z" fill="#8ecae6" ${w(2.2)}/>
    <path d="M26 58 Q16 50 32 46 Z" fill="#5aa9d6"/>
    <path d="M34 40 L6 48 Q12 26 28 30 Z" fill="#c9a0dc" ${w(2.2)}/>
    <path d="M16 36 Q14 28 28 34 Z" fill="#b388d6"/>
    <circle cx="34" cy="40" r="5" fill="#fff" ${w(2.2)}/>
    <circle cx="34" cy="40" r="1.8" fill="${nt}"/>`}),g5=we({kind:"rain-barrel",name:"Rain Barrel",cat:"decor",w:86,h:108,vb:"0 0 80 110",svg:`${ke(40,30,104)}
    <path d="M22 30 C12 48 12 78 22 98 H58 C68 78 68 48 58 30 Z" fill="#8ecae6" ${w()}/>
    <path d="M46 34 C58 48 60 76 54 96 H58 C66 76 66 50 56 32 Z" fill="#5aa9c6"/>
    ${it("M28 40 v48 M36 36 v54 M44 38 v50")}
    ${ee("M24 42 v24")}
    <ellipse cx="40" cy="30" rx="20" ry="8" fill="#bde0fe" ${w()}/>
    <ellipse cx="46" cy="30" rx="10" ry="5" fill="#7eb4dc"/>
    <path d="M16 48 H64" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <path d="M14 74 H66" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <rect x="56" y="78" width="14" height="7" rx="2" fill="#d7ecff" ${w(2)}/>
    <path d="M70 81 h6" fill="none" ${w(2)}/>
    <path d="M34 18 q6 -8 12 0" fill="none" stroke="#7eb4dc" stroke-width="2.2" stroke-linecap="round"/>`}),h5=we({kind:"butterfly-bush",name:"Butterfly Bush",cat:"plants",w:120,h:130,vb:"0 0 100 120",svg:`${ke(50,40,114)}
    <ellipse cx="32" cy="86" rx="22" ry="18" fill="#95d5b2" ${w(2.2)}/>
    <ellipse cx="70" cy="84" rx="24" ry="20" fill="#3d9a68" ${w(2.2)}/>
    <ellipse cx="50" cy="78" rx="36" ry="28" fill="#74c69d" ${w()}/>
    <path d="M18 90 Q50 108 84 88 Q68 100 50 102 Q30 100 18 90 Z" fill="#3d9a68"/>
    ${ee("M24 68 q14 -8 26 2")}
    ${it("M28 80 q4 6 0 10 M46 72 q5 8 0 12 M66 78 q4 6 0 10")}
    <path d="M30 62 C28 44 32 26 35 24 C39 28 40 46 38 62 Z" fill="#c9a0dc" ${w(1.8)}/>
    <circle cx="33" cy="36" r="2.2" fill="#f7ecff"/><circle cx="36" cy="46" r="2.2" fill="#b388d6"/><circle cx="33" cy="54" r="2" fill="#f7ecff"/>
    <path d="M46 58 C44 36 50 14 53 12 C57 16 58 40 54 58 Z" fill="#b388d6" ${w(1.8)}/>
    <circle cx="50" cy="28" r="2.4" fill="#f7ecff"/><circle cx="53" cy="40" r="2.4" fill="#c9a0dc"/><circle cx="50" cy="50" r="2.2" fill="#f7ecff"/>
    <path d="M62 60 C62 42 68 28 71 26 C75 30 76 46 72 60 Z" fill="#a78bfa" ${w(1.8)}/>
    <circle cx="67" cy="38" r="2.2" fill="#f7ecff"/><circle cx="70" cy="48" r="2" fill="#c9a0dc"/>
    <path d="M14 26 C4 14 2 24 10 32 C14 36 18 32 18 28 Z" fill="#ff8fab" ${w(1.6)}/>
    <path d="M20 24 C30 12 34 24 26 34 C22 38 20 30 20 26 Z" fill="#c9a0dc" ${w(1.6)}/>
    <path d="M12 30 C6 36 6 46 14 46 C18 44 20 36 18 30 Z" fill="#ffd166" ${w(1.6)}/>
    <path d="M22 30 C30 36 32 46 24 48 C20 44 18 36 20 30 Z" fill="#8ecae6" ${w(1.6)}/>
    <ellipse cx="18" cy="32" rx="2" ry="7" fill="${nt}"/>
    <path d="M16 26 Q12 18 10 14 M20 26 Q24 18 28 14" fill="none" stroke="${nt}" stroke-width="1.3" stroke-linecap="round"/>`}),u5=we({kind:"hedge-row",name:"Hedge Row",cat:"plants",w:190,h:96,vb:"0 0 180 96",svg:`${ke(90,78,90)}
    <path d="M16 84 C28 70 40 62 52 66 C62 52 78 50 90 62 C102 50 118 52 128 66 C140 58 156 64 164 74 L164 86 L16 86 Z" fill="#2f7d52"/>
    <path d="M10 82 L10 60 C10 50 18 46 26 50 C32 34 46 32 54 48 C60 30 76 28 84 46 C92 28 108 28 116 46 C124 30 140 32 148 48 C156 36 166 42 170 54 L170 82 Z" fill="#74c69d" ${w()}/>
    <path d="M148 46 C160 38 170 50 170 70 L170 82 L140 82 L146 58 Z" fill="#52b788"/>
    <path d="M22 64 C40 54 58 58 70 50 C84 60 100 48 116 56 C128 48 146 56 158 64" fill="none" stroke="#95d5b2" stroke-width="6" stroke-linecap="round" opacity=".85"/>
    <path d="M14 68 C48 78 132 76 166 66 L168 82 L12 82 Z" fill="#3d9a68"/>
    ${it("M28 58 q3 5 0 8 M48 54 q3 6 0 9 M70 52 q3 6 1 9 M94 52 q3 6 0 10 M118 54 q3 6 0 9 M142 56 q3 5 0 8")}
    ${ee("M18 58 q10 -4 16 1")}
    ${ee("M58 42 q12 -4 16 2")}`}),m5=we({kind:"lemonade-cup",name:"Lemonade Cup",cat:"food",w:52,h:70,vb:"0 0 70 90",holdable:!0,svg:`${ke(35,22,84)}
    <path d="M18 32 H52 L46 76 H24 Z" fill="#fff" ${w()}/>
    <path d="M40 34 H50 L46 74 H40 Z" fill="#f0e6d8"/>
    <path d="M20 44 H50 L46 76 H24 Z" fill="#ffe566"/>
    <path d="M40 46 H48 L46 74 H40 Z" fill="#f0c45c"/>
    <ellipse cx="35" cy="44" rx="15" ry="6" fill="#fff3a0" ${w(2)}/>
    <ellipse cx="35" cy="32" rx="17" ry="7" fill="#fff" ${w()}/>
    <path d="M40 42 L48 16 H58" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="20" cy="30" r="8" fill="#ffe566" ${w(1.8)}/>
    <path d="M20 23 v14 M14 30 h12" fill="none" stroke="#fff" stroke-width="1.4"/>
    <path d="M16 26 q4 4 8 0 M16 34 q4 -4 8 0" fill="none" stroke="#e0a83a" stroke-width="1.2"/>
    ${ee("M24 38 v14")}`}),y5=we({kind:"picnic-table",name:"Picnic Table",cat:"furniture",w:180,h:110,vb:"0 0 160 100",svg:`${ke(80,68,96)}
    <rect x="18" y="62" width="124" height="10" rx="2" fill="#e7c49a" ${w()}/>
    <rect x="118" y="64" width="20" height="7" fill="#c99366"/>
    <rect x="28" y="70" width="8" height="24" rx="1" fill="#f3d2aa" ${w(2)}/>
    <rect x="124" y="70" width="8" height="24" rx="1" fill="#d4a373" ${w(2)}/>
    <rect x="8" y="78" width="40" height="8" rx="2" fill="#f6e0c4" ${w(2)}/>
    <rect x="112" y="78" width="40" height="8" rx="2" fill="#e7c49a" ${w(2)}/>
    <rect x="22" y="36" width="116" height="14" rx="2" fill="#f6e0c4" ${w()}/>
    <rect x="110" y="38" width="24" height="10" fill="#d4a373"/>
    <rect x="36" y="48" width="8" height="18" fill="#f3d2aa" ${w(2)}/>
    <rect x="116" y="48" width="8" height="18" fill="#d4a373" ${w(2)}/>
    ${ee("M28 40 h36")}
    ${it("M40 42 h50 M34 66 h70")}`}),b5=we({kind:"seesaw",name:"Seesaw",cat:"furniture",w:200,h:80,vb:"0 0 180 80",svg:`${ke(90,74,76)}
    <path d="M78 58 H102 L96 74 H84 Z" fill="#f3d2aa" ${w()}/>
    <path d="M94 60 H100 L96 72 H92 Z" fill="#c99366"/>
    <rect x="10" y="40" width="160" height="12" rx="3" fill="#ffd166" ${w()} transform="rotate(-8 90 46)"/>
    <rect x="130" y="28" width="28" height="8" fill="#e0a83a"/>
    <rect x="16" y="34" width="28" height="10" rx="2" fill="#ff8fab" ${w(2)}/>
    <rect x="136" y="22" width="28" height="10" rx="2" fill="#8ecae6" ${w(2)}/>
    ${ee("M24 44 h40")}`}),k5=we({kind:"wagon",name:"Wagon",cat:"furniture",w:130,h:90,vb:"0 0 130 90",svg:`${ke(64,50,86)}
    <circle cx="36" cy="74" r="12" fill="${nt}" ${w(2)}/><circle cx="36" cy="74" r="5" fill="#ffd166"/>
    <circle cx="96" cy="74" r="12" fill="${nt}" ${w(2)}/><circle cx="96" cy="74" r="5" fill="#ffd166"/>
    <path d="M22 40 H108 L100 68 H30 Z" fill="#e45d88" ${w()}/>
    <path d="M86 42 H106 L100 66 H84 Z" fill="#c93b68"/>
    <rect x="28" y="28" width="76" height="14" rx="3" fill="#ff8fab" ${w()}/>
    <path d="M108 36 H122 L118 58" fill="none" ${w(2.4)}/>
    ${ee("M32 46 h28")}
    ${it("M40 54 h40")}`}),w5=we({kind:"birdhouse",name:"Birdhouse",cat:"decor",w:70,h:120,vb:"0 0 80 130",svg:`${ke(40,22,124)}
    <rect x="34" y="70" width="12" height="50" rx="2" fill="#d4a373" ${w()}/>
    <rect x="40" y="74" width="5" height="42" fill="#c99366"/>
    <path d="M12 62 L40 28 L68 62 Z" fill="#e45d88" ${w()}/>
    <path d="M40 32 L66 60 H52 Z" fill="#c93b68"/>
    <rect x="18" y="60" width="44" height="36" rx="3" fill="#f6e0c4" ${w()}/>
    <rect x="48" y="64" width="10" height="28" fill="#e7c49a"/>
    <circle cx="40" cy="76" r="7" fill="#5a3d5c"/>
    <rect x="36" y="86" width="14" height="4" rx="1" fill="#d4a373" ${w(1.6)}/>
    ${ee("M22 66 h12")}`}),v5=we({kind:"sprinkler",name:"Sprinkler",cat:"decor",w:80,h:70,vb:"0 0 100 80",svg:`${ke(50,28,76)}
    <ellipse cx="50" cy="66" rx="22" ry="8" fill="#74c69d" ${w()}/>
    <rect x="44" y="40" width="12" height="26" rx="3" fill="#8ecae6" ${w()}/>
    <circle cx="50" cy="36" r="8" fill="#ffd166" ${w()}/>
    <path d="M50 28 C30 16 18 20 12 10" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 28 C70 14 84 18 90 8" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 26 C40 8 58 4 50 2" fill="none" stroke="#c9ecff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="12" cy="10" r="2.2" fill="#c9ecff"/><circle cx="90" cy="8" r="2.2" fill="#c9ecff"/><circle cx="50" cy="2" r="2.2" fill="#fff"/>
    ${ee("M46 44 v10")}`}),_5=we({kind:"beach-ball",name:"Beach Ball",cat:"decor",w:70,h:70,vb:"0 0 80 80",svg:`${ke(40,26,76)}
    <circle cx="40" cy="40" r="28" fill="#fff" ${w()}/>
    <path d="M40 12 A28 28 0 0 1 66 32 L40 40 Z" fill="#ff8fab"/>
    <path d="M66 48 A28 28 0 0 1 40 68 L40 40 Z" fill="#ffd166"/>
    <path d="M24 64 A28 28 0 0 1 14 36 L40 40 Z" fill="#8ecae6"/>
    <path d="M18 28 A28 28 0 0 1 40 12 L40 40 Z" fill="#b7e4c7"/>
    <circle cx="40" cy="40" r="5" fill="#fff" ${w(2)}/>
    ${ee("M28 24 q6 -4 10 2")}`}),$5=we({kind:"patio-umbrella",name:"Patio Umbrella",cat:"furniture",w:150,h:180,vb:"0 0 120 150",svg:`${ke(60,36,144)}
    <path d="M10 58 Q60 18 110 58 L98 64 Q60 32 22 64 Z" fill="#ffb3c6" ${w()}/>
    <path d="M60 22 L108 56 L96 62 Z" fill="#e45d88"/>
    <path d="M28 40 Q44 30 60 36 Q76 28 96 42" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <rect x="56" y="58" width="8" height="78" rx="2" fill="#f3d2aa" ${w()}/>
    <rect x="60" y="62" width="3" height="70" fill="#d4a373"/>
    <rect x="40" y="128" width="40" height="8" rx="2" fill="#e7c49a" ${w(2)}/>
    ${ee("M24 50 q16 -8 24 0")}`}),x5=we({kind:"veggie-patch",name:"Vegetable Patch",cat:"plants",w:150,h:80,vb:"0 0 150 80",svg:`${ke(75,62,76)}
    <rect x="8" y="28" width="134" height="44" rx="4" fill="#c99366" ${w()}/>
    <rect x="16" y="34" width="118" height="32" fill="#8d6e4c"/>
    <path d="M36 48 C36 36 48 34 48 46 C48 34 60 36 58 48 Z" fill="#74c69d" ${w(2)}/>
    <path d="M78 50 C78 38 90 36 90 48 C90 36 102 38 100 50 Z" fill="#52b788" ${w(2)}/>
    <path d="M112 52 L120 30 L128 52 Z" fill="#ff922b" ${w(2)}/>
    <path d="M118 32 Q124 22 130 28" fill="none" stroke="#2f7d52" stroke-width="2" stroke-linecap="round"/>
    ${ee("M18 36 h24")}`}),M5=we({kind:"hammock",name:"Hammock",cat:"furniture",w:190,h:110,vb:"0 0 170 100",svg:`${ke(85,70,96)}
    <rect x="8" y="18" width="10" height="74" rx="2" fill="#d4a373" ${w()}/>
    <rect x="152" y="18" width="10" height="74" rx="2" fill="#c99366" ${w()}/>
    <path d="M18 28 Q85 78 152 28" fill="none" stroke="#5a3d5c" stroke-width="2"/>
    <path d="M18 36 Q85 88 152 36 L152 48 Q85 96 18 48 Z" fill="#8ecae6" ${w()}/>
    <path d="M120 40 Q140 62 150 44 L150 54 Q136 74 112 52 Z" fill="#5fb0d8"/>
    ${ee("M36 46 q24 10 30 4")}
    ${it("M40 58 q30 16 50 4")}`}),L5=we({kind:"garden-gnome",name:"Garden Gnome",cat:"decor",w:64,h:100,vb:"0 0 70 110",svg:`${ke(35,22,104)}
    <path d="M18 78 H52 L48 100 H22 Z" fill="#3d7ec4" ${w()}/>
    <path d="M40 80 H50 L48 98 H42 Z" fill="#2c5f96"/>
    <circle cx="35" cy="62" r="16" fill="#f6d2b5" ${w()}/>
    <path d="M20 66 Q35 78 50 66 Q46 74 35 76 Q24 74 20 66 Z" fill="#fff"/>
    <circle cx="29" cy="60" r="2" fill="${nt}"/><circle cx="41" cy="60" r="2" fill="${nt}"/>
    <path d="M16 52 L35 18 L54 52 Z" fill="#e45d88" ${w()}/>
    <path d="M35 22 L52 50 H42 Z" fill="#c93b68"/>
    <ellipse cx="35" cy="52" rx="16" ry="4" fill="#ff8fab" ${w(2)}/>
    ${ee("M22 40 l8 -8")}`}),Pi=[Y3,K3,X3,J3,e5,t5,n5,s5,i5,a5,r5,l5,c5,d5,f5,p5,g5,h5,u5,m5,y5,b5,k5,w5,v5,_5,$5,x5,M5,L5];function E5(e,t){for(const n of Pi)t[n.kind]||(e.push(n),t[n.kind]=n)}function Jr(e,t,n){return`<g>
    <ellipse cx="${e-22*n}" cy="${t}" rx="${26*n}" ry="${14*n}" fill="#fff"/>
    <ellipse cx="${e+18*n}" cy="${t-2*n}" rx="${30*n}" ry="${16*n}" fill="#fff"/>
    <ellipse cx="${e}" cy="${t+4*n}" rx="${34*n}" ry="${13*n}" fill="#fff"/>
  </g>`}function C5(e,t,n,s,o){const a=l=>`<rect x="${e-2}" y="${l}" width="${t-e+12+4}" height="8" rx="3" fill="#fff" ${w(2.2)}/><rect x="${(t-40).toFixed(1)}" y="${l+1}" width="30" height="6" rx="2" fill="#d5ead8"/>`;let r=a(n+26)+a(s-28);for(let l=e;l<=t;l+=o)r+=`<path d="M${l} ${n+12} L${l+12/2} ${n} L${l+12} ${n+12} V${s} H${l} Z" fill="#f7fff8" ${w(2.2)}/>`,r+=`<path d="M${(l+12*.58).toFixed(1)} ${n+10} H${l+12-1} V${s-4} H${(l+12*.58).toFixed(1)} Z" fill="#d5ead8"/>`,r+=`<path d="M${l+2} ${n+18} v22" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".75" fill="none"/>`;return r}function S5(e,t){const s=150+46*t,o=372-s;return`<g id="yardTree">
    <rect x="${e-14*t}" y="${s}" width="${28*t}" height="${o}" rx="${6*t}" fill="#e7b98a" ${w()}/>
    <rect x="${e+4*t}" y="${s+8*t}" width="${8*t}" height="${o-16*t}" fill="#c99366"/>
    ${it(`M${e-4*t} ${s+28*t} v${36*t}`)}
    ${ee(`M${e-8*t} ${s+16*t} v${22*t}`)}
    <ellipse cx="${e+8*t}" cy="${150+18*t}" rx="${78*t}" ry="${46*t}" fill="#2f7d52"/>
    <ellipse cx="${e-48*t}" cy="${150+10*t}" rx="${36*t}" ry="${30*t}" fill="#245e3e"/>
    <ellipse cx="${e-34*t}" cy="${150+16*t}" rx="${42*t}" ry="${34*t}" fill="#95d5b2" ${w(2.2)}/>
    <ellipse cx="${e}" cy="150" rx="${68*t}" ry="${50*t}" fill="#74c69d" ${w()}/>
    <ellipse cx="${e+40*t}" cy="${150+8*t}" rx="${40*t}" ry="${36*t}" fill="#3d9a68" ${w(2.2)}/>
    <ellipse cx="${e-8*t}" cy="${150-6*t}" rx="${28*t}" ry="${20*t}" fill="#b7e4c7" opacity=".95"/>
    ${it(`M${e-20*t} ${150+8*t} q${8*t} ${6*t} 0 ${12*t} M${e+10*t} ${150-4*t} q${8*t} ${6*t} 2 ${12*t} M${e+28*t} ${150+12*t} q${6*t} ${5*t} 0 ${10*t}`)}
    ${ee(`M${e-36*t} ${150-18*t} q${16*t} -8 ${28*t} 2`)}
  </g>`}function P5(){return`<svg class="yardWorld" viewBox="0 0 2400 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ydsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6eb6e8"/>
        <stop offset=".48" stop-color="#c5e6fb"/>
        <stop offset="1" stop-color="#fff3df"/>
      </linearGradient>
      ${Bc("ydsun","#ffe566",".55")}
    </defs>
    <rect width="2400" height="430" fill="url(#ydsky)"/>
    <circle id="ydSunGlow" cx="1180" cy="68" r="62" fill="url(#ydsun)"/>
    <circle id="ydSun" cx="1180" cy="68" r="30" fill="#ffe566"/>
    <circle cx="1170" cy="58" r="8" fill="#fff" opacity=".8"/>
    ${Jr(980,96,1.05)}${Jr(1320,78,.85)}${Jr(1500,120,.7)}
    <rect y="360" width="2400" height="240" fill="#c6ef9a"/>
    <rect y="360" width="2400" height="28" fill="#e7f8c8"/>
    <rect y="520" width="2400" height="80" fill="#9ed67a"/>
    <path d="M1040 470 q30 -12 16 -6 M1200 510 q28 -12 14 -4 M1360 548 q24 -10 12 -4" fill="none" stroke="#3d9a68" stroke-width="1.2" stroke-linecap="round" opacity=".22"/>
    ${C5(846,2118,258,372,24)}
    ${S5(1184,.8)}
    <path d="M840 120 H1076 L1054 152 H862 Z" fill="#ffb3c6" ${w()}/>
    <path d="M960 126 H1064 L1046 148 H976 Z" fill="#e45d88"/>
    ${ee("M876 132 h56")}
    <rect x="864" y="150" width="196" height="222" rx="4" fill="#fff6ea" ${w()}/>
    <rect x="1044" y="156" width="12" height="210" fill="#f0dcc4"/>
    ${it("M880 174 H1000 M880 202 H1000 M880 230 H990 M880 294 H1000 M880 334 H980")}
    <rect x="884" y="180" width="44" height="36" rx="4" fill="#c9ecff" ${w(2.2)}/>
    <rect x="912" y="184" width="12" height="28" fill="#8ecae6"/>
    <path d="M906 180 V216 M884 198 H928" fill="none" ${w(2.2)}/>
    ${ee("M890 188 h12")}
  </svg>`}function T5(e,t,n,s,o){const i=(600-t)/600*100,a=(n/2400*100).toFixed(3),r=(s/600*100).toFixed(3);return o==="right"?`right:${((2400-(e+n/2))/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`:`left:${((e-n/2)/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`}function B5(){return`<svg class="doorArt" viewBox="0 0 100 230">
    <rect x="4" y="2" width="92" height="226" rx="3" fill="#f3d2aa" ${w()}/>
    <rect x="76" y="6" width="16" height="218" fill="#d4a373"/>
    <rect x="14" y="12" width="72" height="206" rx="2" fill="#f6e9ff" ${w(2.2)}/>
    <rect x="70" y="16" width="12" height="198" fill="#d4b4e6"/>
    <rect x="24" y="22" width="52" height="42" rx="3" fill="#c9ecff" ${w(2.2)}/>
    <rect x="60" y="26" width="12" height="34" fill="#8ecae6"/>
    <path d="M50 22 V64 M24 43 H76" fill="none" ${w(2.2)}/>
    ${ee("M28 28 h18")}
    <rect x="24" y="76" width="52" height="56" rx="3" fill="#f7ecff" ${w(2.2)}/>
    <rect x="62" y="80" width="10" height="48" fill="#e0c8f0"/>
    ${ee("M28 84 v22")}
    <rect x="24" y="144" width="52" height="56" rx="3" fill="#f7ecff" ${w(2.2)}/>
    <rect x="62" y="148" width="10" height="48" fill="#e0c8f0"/>
    <circle cx="64" cy="126" r="4.2" fill="#ffd166" ${w(2.2)}/>
    <rect x="10" y="214" width="80" height="10" rx="2" fill="#e7c49a" ${w(2.2)}/>
  </svg>`}function R5(e){const t=e==="living"?ng:sg,n=e==="living"?"backyard":"living",s=e==="living"?"Backyard":"Back inside",o=e==="yard"?"right":"left";return`<button type="button" class="yardDoor" data-yard-go="${n}" aria-label="${s}" style="${T5(t.x,t.y,t.w,t.h,o)}">${B5()}<span class="yardHintLabel"><span>${s}</span></span></button>`}function Ac(e,t){const n=e.replace(/[&<>]/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[s]);return`<figure class="ysCard"><div class="ysArt">${t}</div><figcaption>${n}</figcaption></figure>`}function A5(){return`<div class="yardSheet" data-yard-sheet="1"><h1>Backyard pieces</h1><div class="ysGrid">${Pi.map(t=>Ac(t.name,hn(t))).join("")}</div></div>`}function D5(e,t){return Ac(e,`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${t}</svg>`)}function I5(){const e=(r,l)=>ke(r,l,96.4),t=`
    ${e(50,40)}
    <path d="M18 58 V30 Q18 18 32 18 H68 Q82 18 82 30 V58 Z" fill="#ffb7cc" ${w()}/>
    <path d="M56 24 H76 Q80 24 80 32 V52 H56 Z" fill="#e888a8"/>
    <circle cx="34" cy="38" r="3.4" fill="#ff8fab" ${w(2)}/><circle cx="33" cy="37" r="1.1" fill="#fff"/>
    <circle cx="50" cy="36" r="3.4" fill="#ff8fab" ${w(2)}/><circle cx="49" cy="35" r="1.1" fill="#fff"/>
    <circle cx="66" cy="38" r="3.4" fill="#e45d88" ${w(2)}/><circle cx="65" cy="37" r="1.1" fill="#fff"/>
    <rect x="4" y="44" width="20" height="38" rx="10" fill="#ff7096" ${w()}/>
    <ellipse cx="14" cy="44" rx="12" ry="9" fill="#ff9ab6" ${w()}/>
    <ellipse cx="9" cy="41" rx="4" ry="2.4" fill="#fff" opacity=".7"/>
    <rect x="76" y="44" width="20" height="38" rx="10" fill="#e04878" ${w()}/>
    <ellipse cx="86" cy="44" rx="12" ry="9" fill="#e45d88" ${w()}/>
    <rect x="20" y="64" width="60" height="16" rx="6" fill="#ff8fab" ${w()}/>
    <rect x="22" y="56" width="28" height="22" rx="7" fill="#ffe0ea" ${w(2.4)}/>
    <rect x="50" y="56" width="28" height="22" rx="7" fill="#ffc2d4" ${w(2.4)}/>
    <rect x="66" y="58" width="10" height="18" rx="4" fill="#e888a8"/>
    <path d="M26 60 h20 M54 60 h16 M26 74 h20 M54 74 h16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M50 58 v18" fill="none" stroke="#e45d88" stroke-width="2.2" stroke-linecap="round"/>
    <rect x="26" y="46" width="20" height="16" rx="5" fill="#fff" ${w(2.2)}/>
    <path d="M33 52 c-2.2 -3.2 -6.4 -.4 -3.4 2.6 c1 1.2 3.4 2.6 3.4 2.6 c0 0 2.4 -1.4 3.4 -2.6 c3 -3 -1.2 -5.8 -3.4 -2.6 z" fill="#ff8fab"/>
    <path d="M41 56 c-1.4 -2 -4.2 0 -2.2 1.8 c.7 .8 2.2 1.6 2.2 1.6 c0 0 1.5 -.8 2.2 -1.6 c2 -1.8 -.8 -3.8 -2.2 -1.8 z" fill="#7eb4dc"/>
    <rect x="16" y="84" width="7" height="10" rx="2" fill="${nt}"/>
    <rect x="77" y="84" width="7" height="10" rx="2" fill="${nt}"/>`,n=`
    <defs>${Bc("a2lamp-glow","#ffd56a",".95")}</defs>
    ${e(50,22)}
    <path d="M34 8 L42 8 L37 40 L24 40 Z" fill="#fff6d4"/>
    <path d="M42 8 L50 8 L50 40 L37 40 Z" fill="#ffe08a"/>
    <path d="M50 8 L58 8 L63 40 L50 40 Z" fill="#f0c45c"/>
    <path d="M58 8 L66 8 L76 40 L63 40 Z" fill="#e0a83a"/>
    <path d="M24 40 L34 8 H66 L76 40 Z" fill="none" ${w()}/>
    <path d="M42 8 L37 40 M50 8 V40 M58 8 L63 40" fill="none" stroke="${nt}" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="50" cy="36" rx="20" ry="10" fill="url(#a2lamp-glow)"/>
    <rect x="46" y="40" width="8" height="42" rx="3" fill="#e4ccf2" ${w()}/>
    <rect x="50" y="44" width="4" height="34" rx="2" fill="#c49ad4"/>
    <ellipse cx="50" cy="88" rx="20" ry="6" fill="#d4b4e6" ${w()}/>
    <ellipse cx="60" cy="90" rx="8" ry="3" fill="#b888c8"/>
    <ellipse cx="42" cy="86" rx="6" ry="2" fill="#fff" opacity=".55"/>`,s=`
    ${e(50,30)}
    <ellipse cx="30" cy="40" rx="14" ry="22" fill="#b7ebc8" ${w()} transform="rotate(-30 30 40)"/>
    <path d="M34 28 C30 40 32 52 44 58" fill="#52b078"/>
    <ellipse cx="72" cy="42" rx="13" ry="20" fill="#3d9a68" ${w()} transform="rotate(26 72 42)"/>
    <path d="M50 66 C40 44 42 18 50 6 C58 18 60 44 50 66 Z" fill="#d8f6e4" ${w()}/>
    <path d="M54 18 C60 32 58 48 50 58 C56 44 58 28 54 18 Z" fill="#52b078"/>
    <path d="M50 14 V52" fill="none" stroke="#2f7a52" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
    <path d="M40 60 C34 50 24 48 22 38 C32 44 38 54 42 64 Z" fill="#74c69d" ${w(2.2)}/>
    <path d="M28 64 H74 L68 94 H34 Z" fill="#e8845a" ${w()}/>
    <path d="M58 66 H72 L68 92 H60 Z" fill="#c45c38"/>
    <rect x="22" y="58" width="58" height="10" rx="4" fill="#f0a078" ${w()}/>
    <rect x="56" y="60" width="20" height="6" rx="3" fill="#d47848"/>
    <ellipse cx="50" cy="65" rx="20" ry="3" fill="#a86a42" opacity=".4"/>
    <path d="M28 62 h14" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>`,o=Object.fromEntries(Pi.map(r=>[r.kind,r])),i=(r,l,c)=>D5(r,l)+Ac(o[c].name,hn(o[c]));return`<div class="yardSheet yardCompare" data-yard-compare="1"><h1>House style and the yard</h1><p class="ysNote">Sofa, lamp, and plant are the approved refresh. Swing, cart, and birdbath use the same light.</p><div class="ysPair">${i("Sofa",t,"yard-swing")+i("Lamp",n,"lemonade-cart")+i("Plant",s,"birdbath")}</div></div>`}const No="#5a3d5c",Q=`stroke="${No}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,ca='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>',og=[{kind:"soaking-tub",name:"Soaking Tub",cat:"furniture",w:250,h:200,vb:"0 0 120 96",svg:`<ellipse cx="60" cy="92" rx="48" ry="3.2" fill="#000" opacity=".12"/><rect x="18" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${Q}/><rect x="92" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${Q}/><path d="M14 58 Q8 58 10 46 L22 28 H98 L110 46 Q112 58 106 58 Z" fill="#fff" ${Q}/><ellipse cx="60" cy="30" rx="44" ry="14" fill="#fff" ${Q}/><ellipse cx="60" cy="32" rx="34" ry="9" fill="#d7f3ff"/><path d="M28 34 Q60 42 92 34" fill="none" stroke="#b9e6f8" stroke-width="4"/><rect x="96" y="8" width="8" height="22" rx="4" fill="#f7d27a" ${Q}/><path d="M100 28 Q112 34 104 44" fill="none" ${Q}/><circle cx="104" cy="46" r="3.2" fill="#a8d4ea" ${Q}/><ellipse cx="46" cy="30" rx="8" ry="3" fill="#fff" opacity=".7"/>`},{kind:"bath-toilet",name:"Toilet",cat:"furniture",w:120,h:160,vb:"0 0 100 134",svg:`<ellipse cx="50" cy="128" rx="34" ry="4" fill="#000" opacity=".12"/><rect x="28" y="8" width="44" height="36" rx="8" fill="#fff" ${Q}/><rect x="34" y="16" width="32" height="16" rx="4" fill="#e7f6ff"/><rect x="46" y="42" width="8" height="10" fill="#f4f7fb" ${Q}/><ellipse cx="50" cy="78" rx="36" ry="22" fill="#fff" ${Q}/><ellipse cx="50" cy="74" rx="24" ry="14" fill="#d7f3ff" ${Q}/><path d="M18 70 Q50 58 82 70" fill="#fff" ${Q}/><rect x="40" y="96" width="20" height="24" rx="4" fill="#f7f4ef" ${Q}/>`},{kind:"sink-vanity",name:"Sink Vanity",cat:"furniture",w:210,h:190,vb:"0 0 110 100",svg:`<ellipse cx="55" cy="96" rx="46" ry="3.2" fill="#000" opacity=".12"/><rect x="10" y="48" width="90" height="42" rx="8" fill="#f6e2c4" ${Q}/><path d="M55 48 V90" ${Q}/><circle cx="28" cy="70" r="3" fill="${No}"/><circle cx="82" cy="70" r="3" fill="${No}"/><rect x="16" y="90" width="8" height="6" rx="2" fill="${No}"/><rect x="86" y="90" width="8" height="6" rx="2" fill="${No}"/><ellipse cx="55" cy="44" rx="40" ry="12" fill="#fff" ${Q}/><ellipse cx="55" cy="44" rx="26" ry="7" fill="#d7f3ff"/><rect x="50" y="10" width="10" height="28" rx="4" fill="#f7d27a" ${Q}/><path d="M55 36 Q70 40 66 48" fill="none" ${Q}/><rect x="8" y="40" width="94" height="8" rx="3" fill="#f3d2b5" ${Q}/>`},{kind:"bath-mirror",name:"Bath Mirror",cat:"decor",w:120,h:160,wall:!0,vb:"0 0 90 120",svg:`<path d="M45 8 C70 8 82 28 82 58 C82 92 68 112 45 112 C22 112 8 92 8 58 C8 28 20 8 45 8 Z" fill="#f7d27a" ${Q}/><ellipse cx="45" cy="60" rx="26" ry="40" fill="#d7f4ff" ${Q}/><path d="M30 36 l8 -8 M28 52 l18 -16" stroke="#fff" stroke-width="4" stroke-linecap="round"/><rect x="38" y="2" width="14" height="8" rx="3" fill="#f28fa6" ${Q}/>`},{kind:"towel-bar",name:"Towel Bar",cat:"decor",w:170,h:116,wall:!0,vb:"0 0 150 102",svg:`<rect x="10" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${Q}/><rect x="130" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${Q}/><rect x="14" y="16" width="122" height="8" rx="4" fill="#c98d55" ${Q}/><path d="M26 24 H124 V70 Q75 100 26 70 Z" fill="#f7d7e4" ${Q}/><path d="M75 24 V88" stroke="#f28fa6" stroke-width="3"/><path d="M40 36 H110" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"bath-mat",name:"Bath Mat",cat:"decor",w:230,h:120,vb:"0 0 160 84",svg:`<ellipse cx="80" cy="78" rx="70" ry="5" fill="#000" opacity=".1"/><rect x="12" y="22" width="136" height="48" rx="18" fill="#f28fa6" ${Q}/><rect x="24" y="32" width="112" height="28" rx="12" fill="#f7d7e4"/><path d="M40 46 H120 M40 54 H120" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>`},{kind:"rubber-ducky",name:"Rubber Ducky",cat:"decor",w:80,svg:`${ca}<ellipse cx="48" cy="68" rx="30" ry="26" fill="#f7d27a" ${Q}/><circle cx="68" cy="40" r="18" fill="#ffe9a8" ${Q}/><path d="M82 38 H98 Q102 44 92 48 H82 Z" fill="#f28fa6" ${Q}/><ellipse cx="36" cy="74" rx="12" ry="8" fill="#f3c15a"/>`},{kind:"shower-curtain",name:"Shower Curtain",cat:"decor",w:150,h:260,holdable:!1,vb:"0 0 90 156",svg:`<rect x="8" y="8" width="74" height="8" rx="3" fill="#c98d55" ${Q}/><circle cx="22" cy="16" r="3" fill="#f7d27a" ${Q}/><circle cx="40" cy="16" r="3" fill="#f7d27a" ${Q}/><circle cx="58" cy="16" r="3" fill="#f7d27a" ${Q}/><circle cx="72" cy="16" r="3" fill="#f7d27a" ${Q}/><path d="M12 18 Q8 80 16 146 H40 Q30 80 36 18 Z" fill="#d7f4ff" ${Q}/><path d="M36 18 Q34 80 46 146 H74 Q84 80 78 18 Z" fill="#f7d7e4" ${Q}/><path d="M24 40 Q18 70 26 100 M58 40 Q66 70 58 110" fill="none" stroke="#fff" stroke-width="3" opacity=".65"/>`},{kind:"soap-dish",name:"Soap Dish",cat:"decor",w:90,svg:`${ca}<ellipse cx="50" cy="78" rx="34" ry="12" fill="#fff" ${Q}/><ellipse cx="50" cy="74" rx="26" ry="7" fill="#e7f6ff"/><rect x="28" y="48" width="44" height="22" rx="8" fill="#f7d7e4" ${Q}/><path d="M36 56 H64" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"laundry-hamper",name:"Laundry Hamper",cat:"furniture",w:140,h:160,vb:"0 0 100 114",svg:`<ellipse cx="50" cy="108" rx="36" ry="4" fill="#000" opacity=".12"/><path d="M18 40 H82 L74 100 H26 Z" fill="#b9a0dc" ${Q}/><path d="M24 58 H76 M26 74 H74" stroke="#fff" stroke-width="3" opacity=".55"/><ellipse cx="50" cy="40" rx="34" ry="10" fill="#c9b6e8" ${Q}/><path d="M22 36 Q50 18 78 36" fill="#f7d7e4" ${Q}/><path d="M40 28 Q50 40 62 26" fill="none" stroke="#f28fa6" stroke-width="4" stroke-linecap="round"/>`},{kind:"bath-stool",name:"Bath Stool",cat:"furniture",w:110,svg:`${ca}<ellipse cx="50" cy="58" rx="36" ry="12" fill="#f6e2c4" ${Q}/><ellipse cx="50" cy="54" rx="28" ry="7" fill="#fff6ea"/><path d="M22 64 L16 92 M78 64 L84 92 M36 66 L34 92 M64 66 L66 92" ${Q}/><path d="M18 90 H34 M66 90 H84" ${Q}/>`}],H5=[{kind:"floor-cushion",name:"Floor Cushion",cat:"decor",w:150,h:136,vb:"0 0 130 118",svg:`<ellipse cx="65" cy="112" rx="50" ry="4" fill="#000" opacity=".12"/><ellipse cx="65" cy="68" rx="52" ry="40" fill="#f28fa6" ${Q}/><ellipse cx="65" cy="58" rx="40" ry="24" fill="#f7d7e4"/><path d="M38 64 Q65 82 92 64" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"story-pillow",name:"Story Pillow",cat:"decor",w:120,h:100,vb:"0 0 110 92",svg:`<ellipse cx="55" cy="86" rx="40" ry="4" fill="#000" opacity=".12"/><rect x="14" y="28" width="82" height="52" rx="18" fill="#a8d4ea" ${Q}/><path d="M55 40 l6 12 13 2 -10 8 2 13 -11 -7 -11 7 2 -13 -10 -8 13 -2 z" fill="#f7d27a" ${Q}/>`},{kind:"berry-basket",name:"Berry Basket",cat:"food",w:100,svg:`${ca}<path d="M22 48 H78 L70 88 H30 Z" fill="#f3d2b5" ${Q}/><path d="M30 58 H70 M32 70 H68 M34 80 H66" ${Q}/><circle cx="40" cy="40" r="10" fill="#f28fa6" ${Q}/><circle cx="58" cy="36" r="10" fill="#c94b6a" ${Q}/><circle cx="70" cy="48" r="8" fill="#b9a0dc" ${Q}/><path d="M34 36 Q40 28 46 36" fill="none" stroke="#7dce8a" stroke-width="3"/>`},{kind:"ribbon-tray",name:"Ribbon Tray",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`<ellipse cx="70" cy="84" rx="52" ry="4" fill="#000" opacity=".12"/><rect x="16" y="40" width="108" height="36" rx="12" fill="#fff" ${Q}/><rect x="22" y="46" width="96" height="22" rx="8" fill="#f7d7e4"/><rect x="36" y="28" width="16" height="22" rx="5" fill="#a8d4ea" ${Q}/><rect x="58" y="22" width="14" height="28" rx="5" fill="#f7d27a" ${Q}/><path d="M96 24 Q110 16 112 32 Q100 28 104 40 Q92 34 96 24 Z" fill="#f28fa6" ${Q}/>`}],Se="#5a3d5c",L=`stroke="${Se}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Js=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${Se}"/><circle cx="${t}" cy="${n}" r="3" fill="${Se}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,ji=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,Ce='<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>',bn=[{kind:"sofa",name:"Sofa",cat:"furniture",w:260,svg:`${Ce}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${L}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${L}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${L}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${L}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${L}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${Se}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${Se}"/>`},{kind:"armchair",name:"Armchair",cat:"furniture",w:150,svg:`${Ce}<rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${L}/><rect x="6" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${L}/><rect x="72" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${L}/><rect x="24" y="58" width="52" height="24" rx="10" fill="#b8e0f2" ${L}/><rect x="20" y="86" width="6" height="10" rx="2" fill="${Se}"/><rect x="74" y="86" width="6" height="10" rx="2" fill="${Se}"/>`},{kind:"bed",name:"Bed",cat:"furniture",w:300,svg:`${Ce}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${L}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${L}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${L}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${L}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${L}/>`},{kind:"table",name:"Table",cat:"furniture",w:200,svg:`${Ce}<rect x="4" y="30" width="92" height="14" rx="7" fill="#f4a261" ${L}/><rect x="14" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${L}/><rect x="76" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${L}/><path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".5"/>`},{kind:"chair",name:"Chair",cat:"furniture",w:100,svg:`${Ce}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${L}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${L}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${L}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${L}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/>`},{kind:"lamp",name:"Lamp",cat:"furniture",w:90,svg:`${Ce}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${L}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${L}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${L}/><circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>`},{kind:"fridge",name:"Fridge",cat:"furniture",w:150,svg:`${Ce}<rect x="16" y="4" width="68" height="90" rx="14" fill="#bde0fe" ${L}/><path d="M16 38 H84" ${L}/><rect x="70" y="14" width="5" height="16" rx="2" fill="${Se}"/><rect x="70" y="46" width="5" height="22" rx="2" fill="${Se}"/><circle cx="32" cy="22" r="5" fill="#ff8fab" ${L}/><rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${L}/>`},{kind:"stove",name:"Stove",cat:"furniture",w:170,svg:`${Ce}<rect x="8" y="26" width="84" height="68" rx="12" fill="#ffadad" ${L}/><rect x="8" y="18" width="84" height="14" rx="6" fill="#ffd6a5" ${L}/><rect x="20" y="46" width="60" height="36" rx="8" fill="#5a3d5c" opacity=".85"/><rect x="26" y="52" width="48" height="8" rx="4" fill="#fff" opacity=".25"/><circle cx="22" cy="38" r="3" fill="${Se}"/><circle cx="36" cy="38" r="3" fill="${Se}"/><circle cx="78" cy="38" r="3" fill="${Se}"/>`},{kind:"bookshelf",name:"Shelf",cat:"furniture",w:170,svg:`${Ce}<rect x="10" y="4" width="80" height="90" rx="10" fill="#d4a373" ${L}/><path d="M10 34 H90 M10 64 H90" ${L}/><rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${L}/><rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${L}/><rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${L}/><rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${L}/><rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${L}/><circle cx="34" cy="80" r="8" fill="#ffadad" ${L}/>`},{kind:"tub",name:"Bathtub",cat:"furniture",w:240,svg:`${Ce}<circle cx="30" cy="40" r="7" fill="#bde0fe" ${L}/><circle cx="44" cy="34" r="9" fill="#e0f2ff" ${L}/><circle cx="60" cy="40" r="7" fill="#bde0fe" ${L}/><path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${L}/><rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${L}/><rect x="22" y="88" width="8" height="8" rx="2" fill="${Se}"/><rect x="70" y="88" width="8" height="8" rx="2" fill="${Se}"/>`},{kind:"rug",name:"Rug",cat:"decor",w:320,svg:`<ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${L}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${L}/><ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${L}/>`},{kind:"picture",name:"Picture",cat:"decor",w:130,wall:!0,svg:`<rect x="10" y="20" width="80" height="64" rx="8" fill="#ffd166" ${L}/><rect x="18" y="28" width="64" height="48" rx="4" fill="#bde0fe"/><circle cx="66" cy="40" r="7" fill="#fff3b0"/><path d="M18 76 L38 50 L52 64 L62 54 L82 76 Z" fill="#90e0a8" ${L}/>`},{kind:"window",name:"Window",cat:"decor",w:180,wall:!0,svg:`<rect class="winGlass" x="12" y="8" width="76" height="76" rx="38" fill="#a2d2ff" ${L}/><g class="winDay"><circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/></g><g class="winNight"><circle cx="62" cy="28" r="7" fill="#fff6d8"/><circle cx="28" cy="24" r="1.4" fill="#fff"/><circle cx="44" cy="20" r="1.1" fill="#fff"/><circle cx="70" cy="42" r="1.2" fill="#fff"/><circle cx="36" cy="46" r="1" fill="#fff"/></g><path d="M50 8 V84 M12 50 H88" ${L}/><path d="M4 8 Q20 40 10 90 M96 8 Q80 40 90 90" stroke="#ff8fab" stroke-width="9" fill="none" stroke-linecap="round"/>`},{kind:"clock",name:"Clock",cat:"decor",w:90,wall:!0,svg:`<circle cx="50" cy="50" r="38" fill="#fff" ${L}/><circle cx="50" cy="50" r="30" fill="#fff3b0"/><path d="M50 50 V28 M50 50 L64 58" ${L}/><circle cx="50" cy="50" r="3" fill="${Se}"/>${ji(30,70,66)}`},{kind:"stars",name:"Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M30 20 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffd166" ${L}/><path d="M70 40 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#ffadad" ${L}/><path d="M40 66 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#a2d2ff" ${L}/>`},{kind:"balloon",name:"Balloons",cat:"decor",w:110,svg:`<path d="M38 52 Q44 74 50 96 M64 46 Q58 72 50 96" stroke="${Se}" stroke-width="2" fill="none"/><ellipse cx="36" cy="32" rx="18" ry="22" fill="#ff8fab" ${L}/><ellipse cx="66" cy="28" rx="18" ry="22" fill="#a2d2ff" ${L}/><ellipse cx="30" cy="24" rx="4" ry="7" fill="#fff" opacity=".6"/>`},{kind:"teddy",name:"Teddy",cat:"decor",w:100,svg:`${Ce}<circle cx="26" cy="22" r="10" fill="#d4a373" ${L}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${L}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${L}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${L}/>${Js(40,60,36)}<ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/><circle cx="50" cy="46" r="2.5" fill="${Se}"/>${ji(32,68,46)}`},{kind:"ball",name:"Ball",cat:"decor",w:70,svg:`${Ce}<circle cx="50" cy="58" r="36" fill="#ffd166" ${L}/><path d="M18 46 Q50 66 82 46 M26 82 Q50 60 74 82" stroke="#ff7096" stroke-width="7" fill="none"/>`},{kind:"tv",name:"TV",cat:"decor",w:170,svg:`${Ce}<rect x="6" y="14" width="88" height="62" rx="14" fill="#c9a0dc" ${L}/><rect x="16" y="22" width="68" height="46" rx="8" fill="#a2d2ff"/><path d="M30 6 L44 14 M70 6 L56 14" ${L}/><rect x="36" y="78" width="28" height="16" rx="4" fill="#b388d6" ${L}/>${Js(42,58,42)}<path d="M44 52 q6 5 12 0" ${L} fill="none"/>`},{kind:"plant",name:"Plant",cat:"plants",w:110,svg:`${Ce}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${L} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${L} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${L}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${L}/><rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${L}/>`},{kind:"cactus",name:"Cactus",cat:"plants",w:80,svg:`${Ce}<rect x="36" y="12" width="28" height="64" rx="14" fill="#80ed99" ${L}/><path d="M36 50 H24 a8 8 0 0 1 -8 -8 V34" fill="none" stroke="${Se}" stroke-width="3.5"/><rect x="12" y="26" width="12" height="22" rx="6" fill="#80ed99" ${L}/><circle cx="50" cy="12" r="6" fill="#ff8fab" ${L}/>${Js(44,56,40)}<path d="M28 74 H72 L66 96 H34 Z" fill="#c9a0dc" ${L}/>`},{kind:"flowers",name:"Flowers",cat:"plants",w:90,svg:`${Ce}<path d="M50 70 V30 M50 60 Q30 50 30 30 M50 60 Q70 50 70 30" stroke="#52b788" stroke-width="4" fill="none"/><circle cx="50" cy="26" r="10" fill="#ff8fab" ${L}/><circle cx="30" cy="28" r="9" fill="#ffd166" ${L}/><circle cx="70" cy="28" r="9" fill="#a2d2ff" ${L}/><circle cx="50" cy="26" r="3" fill="#fff"/><path d="M32 66 H68 L62 96 H38 Z" fill="#a2d2ff" ${L}/>`},{kind:"tree",name:"Mini Tree",cat:"plants",w:140,svg:`${Ce}<rect x="44" y="54" width="12" height="30" rx="4" fill="#b07d54" ${L}/><circle cx="50" cy="36" r="30" fill="#52b788" ${L}/><circle cx="38" cy="30" r="5" fill="#ff8fab"/><circle cx="62" cy="40" r="5" fill="#ff8fab"/><circle cx="52" cy="22" r="5" fill="#ff8fab"/><path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${L}/>`},{kind:"cake",name:"Cake",cat:"food",w:100,svg:`<rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${L}/><path d="M16 58 q8 10 17 0 q8 10 17 0 q8 10 17 0 q8 10 17 0" fill="#fff" ${L}/><rect x="46" y="28" width="8" height="22" rx="3" fill="#a2d2ff" ${L}/><path d="M50 14 q6 8 0 12 q-6 -4 0 -12" fill="#ffd166" ${L}/><ellipse cx="50" cy="92" rx="40" ry="5" fill="#fff" ${L}/>`},{kind:"apple",name:"Apple",cat:"food",w:60,svg:`<path d="M50 30 C20 18 8 50 22 74 C32 92 44 90 50 86 C56 90 68 92 78 74 C92 50 80 18 50 30 Z" fill="#ff6b6b" ${L}/><path d="M50 30 Q52 16 58 10" ${L} fill="none"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#80ed99" ${L} transform="rotate(-20 64 18)"/><ellipse cx="34" cy="46" rx="5" ry="9" fill="#fff" opacity=".5"/>`},{kind:"donut",name:"Donut",cat:"food",w:70,svg:`<circle cx="50" cy="58" r="36" fill="#e9c46a" ${L}/><path d="M18 52 Q20 26 50 24 Q80 26 82 52 Q76 62 66 56 Q56 66 46 58 Q34 66 24 58 Z" fill="#ff8fab" ${L}/><circle cx="50" cy="52" r="10" fill="#fff" ${L}/><rect x="30" y="36" width="6" height="3" rx="1.5" fill="#a2d2ff" transform="rotate(30 33 37)"/><rect x="64" y="38" width="6" height="3" rx="1.5" fill="#ffd166"/><rect x="56" y="30" width="6" height="3" rx="1.5" fill="#80ed99" transform="rotate(-30 59 31)"/>`},{kind:"pizza",name:"Pizza",cat:"food",w:80,svg:`<path d="M10 20 Q50 6 90 20 L50 94 Z" fill="#ffd166" ${L}/><path d="M10 20 Q50 6 90 20 L86 28 Q50 16 14 28 Z" fill="#e9a96a" ${L}/><circle cx="42" cy="38" r="7" fill="#ff6b6b" ${L}/><circle cx="62" cy="44" r="6" fill="#ff6b6b" ${L}/><circle cx="50" cy="62" r="6" fill="#ff6b6b" ${L}/>`},{kind:"juice",name:"Juice",cat:"food",w:55,svg:`<path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${L}/><path d="M27 44 H73 L70 92 H30 Z" fill="#ffb347"/><path d="M24 26 H76 L70 92 H30 Z" fill="none" ${L}/><path d="M58 30 L66 4" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="60" r="4" fill="#fff" opacity=".6"/>`},{kind:"cat",name:"Toy cat",cat:"pets",w:110,svg:`${Ce}<path d="M78 80 Q98 70 90 50" stroke="#ffb347" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="30" ry="20" fill="#ffb347" ${L}/><path d="M22 30 L26 8 L40 22 M78 30 L74 8 L60 22" fill="#ffb347" ${L}/><circle cx="50" cy="42" r="28" fill="#ffc46b" ${L}/>${Js(40,60,40)}<path d="M46 50 q4 4 8 0" ${L} fill="none"/>${ji(32,68,50)}`},{kind:"dog",name:"Puppy",cat:"pets",w:120,svg:`${Ce}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#f5ebe0" ${L}/><circle cx="50" cy="42" r="28" fill="#fff" ${L}/><ellipse cx="22" cy="44" rx="10" ry="18" fill="#b07d54" ${L}/><ellipse cx="78" cy="44" rx="10" ry="18" fill="#b07d54" ${L}/><circle cx="60" cy="34" r="8" fill="#e6b88a" opacity=".7"/>${Js(40,60,40)}<ellipse cx="50" cy="52" rx="5" ry="4" fill="${Se}"/><path d="M50 56 v6" ${L}/>`},{kind:"bunny",name:"Bunny",cat:"pets",w:90,svg:`${Ce}<ellipse cx="36" cy="22" rx="8" ry="20" fill="#fff" ${L}/><ellipse cx="64" cy="22" rx="8" ry="20" fill="#fff" ${L}/><ellipse cx="36" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="64" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="50" cy="76" rx="28" ry="20" fill="#fff" ${L}/><circle cx="50" cy="52" r="22" fill="#fff" ${L}/>${Js(42,58,50)}<path d="M47 58 l3 3 3 -3" ${L} fill="none"/>${ji(36,64,58)}`},{kind:"fish",name:"Fish Bowl",cat:"pets",w:100,svg:`${Ce}<circle cx="50" cy="54" r="40" fill="#cdeffd" ${L}/><path d="M14 46 H86" stroke="#8ecae6" stroke-width="3"/><path d="M60 64 l14 -8 v16 z" fill="#ff9f68" ${L}/><ellipse cx="46" cy="64" rx="16" ry="11" fill="#ffb347" ${L}/><circle cx="40" cy="62" r="2.5" fill="${Se}"/><circle cx="32" cy="38" r="3" fill="#fff" opacity=".8"/><rect x="24" y="10" width="52" height="8" rx="4" fill="#cdeffd" ${L}/>`},{kind:"kennel",name:"Dog Kennel",cat:"pets",w:210,h:175,holdable:!1,vb:"0 0 120 100",svg:`<ellipse cx="60" cy="97" rx="48" ry="3.2" fill="#000" opacity=".12"/><path d="M14 50 L60 12 L106 50 Z" fill="#ff8fab" ${L}/><path d="M28 46 L60 22 L92 46 Z" fill="#ffd6e4"/><rect x="20" y="46" width="80" height="50" rx="10" fill="#fff6ea" ${L}/><path d="M20 56 H100" stroke="#ffc2d4" stroke-width="7"/><path d="M34 96 V58 Q60 36 86 58 V96 Z" fill="#f3e4ff" ${L}/><path d="M40 96 V64 Q60 46 80 64 V96 Z" fill="#ffe8c7"/><circle cx="86" cy="64" r="8" fill="#bde0fe" ${L}/><circle cx="84" cy="62" r="2.2" fill="#fff" opacity=".9"/><path d="M28 62 l2.4 2.4 2.4-2.4 2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4z" fill="#ff8fab" ${L}/><circle cx="30" cy="90" r="3.2" fill="#fff" ${L}/><rect x="32" y="88.4" width="14" height="3.4" rx="1.7" fill="#fff" ${L}/><circle cx="48" cy="90" r="3.2" fill="#fff" ${L}/>`},{kind:"cat-tower",name:"Cat Tower",cat:"pets",w:150,h:225,holdable:!1,vb:"0 0 100 150",svg:`<ellipse cx="50" cy="146" rx="36" ry="3.4" fill="#000" opacity=".12"/><rect x="44" y="30" width="12" height="104" rx="6" fill="#c9a0dc" ${L}/><ellipse cx="50" cy="136" rx="34" ry="10" fill="#ffc8dd" ${L}/><ellipse cx="50" cy="132" rx="26" ry="6" fill="#fff6ea"/><ellipse cx="50" cy="102" rx="30" ry="8" fill="#bde0fe" ${L}/><ellipse cx="50" cy="98" rx="22" ry="4" fill="#fff" opacity=".8"/><ellipse cx="50" cy="64" rx="28" ry="8" fill="#ffd166" ${L}/><ellipse cx="50" cy="60" rx="20" ry="4" fill="#fff6d0"/><circle cx="50" cy="22" r="8" fill="#ff8fab" ${L}/><circle cx="47" cy="19" r="2.2" fill="#fff" opacity=".75"/><g class="dangle"><circle cx="22" cy="126" r="8" fill="#ffb3c6" ${L}/><path d="M22 126 q12 5 7 16" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/></g><circle cx="80" cy="92" r="3.4" fill="#ffd166" ${L}/>`},{kind:"vanity",name:"Vanity",cat:"furniture",w:230,svg:`${Ce}<ellipse cx="50" cy="26" rx="24" ry="22" fill="#fff" ${L}/><ellipse cx="50" cy="26" rx="18" ry="16" fill="#cdeffd"/><path d="M38 18 l6 -6 M42 26 l10 -10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="12" r="3" fill="#ffd166" ${L}/><circle cx="74" cy="12" r="3" fill="#ffd166" ${L}/><rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${L}/><rect x="10" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${L}/><rect x="62" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${L}/><circle cx="24" cy="75" r="3" fill="${Se}"/><circle cx="76" cy="75" r="3" fill="${Se}"/><rect x="12" y="90" width="6" height="7" rx="2" fill="${Se}"/><rect x="82" y="90" width="6" height="7" rx="2" fill="${Se}"/>`},{kind:"stool",name:"Vanity Stool",cat:"furniture",w:90,svg:`${Ce}<ellipse cx="50" cy="48" rx="34" ry="14" fill="#c9a0dc" ${L}/><ellipse cx="50" cy="44" rx="28" ry="9" fill="#e4ccf2"/><path d="M28 58 L22 94 M72 58 L78 94 M50 62 V94" ${L}/><ellipse cx="50" cy="78" rx="22" ry="4" fill="none" ${L}/>`},{kind:"perfume",name:"Perfume",cat:"decor",w:50,svg:`<rect x="40" y="8" width="20" height="14" rx="5" fill="#ffd166" ${L}/><rect x="46" y="20" width="8" height="10" fill="#fff" ${L}/><path d="M20 50 Q20 30 50 30 Q80 30 80 50 V80 Q80 94 66 94 H34 Q20 94 20 80 Z" fill="#ff8fab" ${L}/><ellipse cx="36" cy="52" rx="5" ry="10" fill="#fff" opacity=".6"/><path d="M50 56 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#fff" opacity=".8"/>`},{kind:"polish",name:"Nail Polish",cat:"decor",w:40,svg:`<rect x="38" y="4" width="24" height="40" rx="8" fill="${Se}"/><path d="M24 54 Q24 42 36 42 H64 Q76 42 76 54 V84 Q76 96 64 96 H36 Q24 96 24 84 Z" fill="#b388d6" ${L}/><ellipse cx="38" cy="62" rx="5" ry="12" fill="#fff" opacity=".55"/>`},{kind:"hairdryer",name:"Hair Dryer",cat:"decor",w:90,svg:`<path d="M60 52 L70 92 Q70 96 64 96 H58 Q52 96 52 90 L46 56 Z" fill="#a2d2ff" ${L}/><rect x="6" y="20" width="62" height="40" rx="20" fill="#bde0fe" ${L}/><ellipse cx="82" cy="40" rx="12" ry="20" fill="#ffc8dd" ${L}/><ellipse cx="82" cy="40" rx="6" ry="11" fill="#fff" ${L}/><circle cx="24" cy="40" r="7" fill="#fff" opacity=".7"/>`},{kind:"mirror",name:"Mirror",cat:"decor",w:120,wall:!0,svg:`<path d="M50 6 C74 6 88 24 88 50 C88 76 72 94 50 94 C28 94 12 76 12 50 C12 24 26 6 50 6 Z" fill="#ffd166" ${L}/><ellipse cx="50" cy="50" rx="30" ry="36" fill="#e0f4ff" ${L}/><path d="M36 34 l10 -10 M36 46 l20 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ff8fab" ${L}/>`}],os={sofa:["living"],armchair:["living"],lamp:["living","bedroom"],tv:["living"],rug:["living","bedroom"],picture:["living","bedroom"],bookshelf:["living","bedroom"],bed:["bedroom"],teddy:["bedroom"],stars:["bedroom"],tub:["bedroom"],balloon:["any"],clock:["any"],window:["any"],ball:["any"],vanity:["salon"],stool:["salon"],perfume:["salon"],polish:["salon"],hairdryer:["salon"],mirror:["salon","bedroom"],fridge:["kitchen"],stove:["kitchen"],table:["kitchen","living"],chair:["kitchen","living"]};for(const e of tg)os[e.kind]=["nursery"];for(const e of Pi)os[e.kind]=["backyard"];for(const e of og)os[e.kind]=["bathroom"];os["floor-cushion"]=["living"];os["story-pillow"]=["bedroom"];os["berry-basket"]=["kitchen"];os["ribbon-tray"]=["salon"];bn.push(...tg,...Pi,...og,...H5);for(const e of bn)e.rooms=os[e.kind]??(["food"].includes(e.cat)?["kitchen"]:["any"]);const O5=new Set(["rug","tv","tree"]);for(const e of bn)e.holdable??=!e.wall&&e.cat!=="furniture"&&e.w<=150&&!O5.has(e.kind);const W5=[{kind:"ranch-egg",name:"Fresh Egg",cat:"ranch",w:50,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M50 30 C70 30 80 62 80 74 C80 90 66 96 50 96 C34 96 20 90 20 74 C20 62 30 30 50 30 Z" fill="#fff6e6" ${L}/><ellipse cx="40" cy="52" rx="6" ry="9" fill="#fff"/>`},{kind:"ranch-carrot",name:"Garden Carrot",cat:"ranch",w:70,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M30 40 L78 34 L40 96 Z" fill="#ff922b" ${L}/><path d="M44 50 l10 -2 M42 64 l8 -2 M44 78 l6 -1" ${L}/><path d="M72 36 Q80 14 92 14 M72 36 Q68 14 76 4 M72 36 Q90 30 96 36" fill="none" stroke="#40c057" stroke-width="7" stroke-linecap="round"/>`},{kind:"ranch-bouquet",name:"Ranch Flowers",cat:"ranch",w:80,holdable:!0,rooms:["any"],svg:`${Ce}<path d="M50 94 L40 50 M50 94 L50 44 M50 94 L62 50" stroke="#40c057" stroke-width="5" stroke-linecap="round"/><path d="M36 78 L64 78 L56 96 L44 96 Z" fill="#c9a0dc" ${L}/>${[[38,40,"#ff8fab"],[50,30,"#ffd43b"],[64,40,"#74c0fc"],[44,52,"#ff922b"],[58,52,"#c9a0dc"]].map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="9" fill="${n}" ${L}/><circle cx="${e}" cy="${t}" r="3" fill="#fff3b0"/>`).join("")}`}];bn.push(...Z3,...X1,...W5);const Me=Object.fromEntries(bn.map(e=>[e.kind,e])),si=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),ct=e=>e.h??e.w,Dc=e=>e.img?`<img class="packimg" src="${si(e.img)}" alt="${si(e.name)}" draggable="false" />`:`<svg viewBox="${e.vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${e.svg}</svg>`,hn=(e,t=!1)=>{const n=ko()?Is(e.kind):void 0;if(!n)return Dc(e);const s=t&&!e.wall?'<i class="artshade" aria-hidden="true"></i>':"",o=e.kind==="window"?'<i class="artnight" aria-hidden="true"></i>':"";return`${s}${o}<img class="packimg artimg" data-kind="${si(e.kind)}" src="${si(n)}" alt="${si(e.name)}" draggable="false" />`},U5='<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="22" width="56" height="56" rx="14" fill="#fff6ea" stroke="#5a3d5c" stroke-width="4"/></svg>',V5=(e,t)=>e.img&&/\.webp(?:$|\?)/i.test(e.img)?U5:Dc(e);let ff=!1;function z5(){ff||typeof window>"u"||(ff=!0,window.addEventListener("error",e=>{const t=e.target;if(!(t instanceof HTMLImageElement)||!t.classList.contains("artimg")||t.dataset.fell==="1")return;const n=Me[t.dataset.kind||""];if(!n)return;t.dataset.fell="1",t.parentElement?.querySelector(".artshade")?.remove(),t.parentElement?.querySelector(".artnight")?.remove();const s=document.createElement("div");s.innerHTML=Dc(n);const o=s.firstElementChild;o&&t.replaceWith(o)},!0))}const pf=new WeakMap;function Q5(e){const t=pf.get(e);if(t)return t;if(!e.complete||!e.naturalWidth)return null;const n=document.createElement("canvas");n.width=e.naturalWidth,n.height=e.naturalHeight;const s=n.getContext("2d",{willReadFrequently:!0});if(!s)return null;try{s.drawImage(e,0,0)}catch{return null}const o=s.getImageData(0,0,n.width,n.height).data;return pf.set(e,o),o}function q5(e,t,n){const s=e.getBoundingClientRect();if(s.width<1||s.height<1||!e.naturalWidth)return null;let o=(t-s.left)/s.width;const i=(n-s.top)/s.height;e.closest(".flipped")&&(o=1-o);const a=e.naturalWidth,r=e.naturalHeight,l=Math.min(s.width/a,s.height/r),c=a*l,f=r*l,d=(s.width-c)*.5,g=s.height-f,h=(o*s.width-d)/l,m=(i*s.height-g)/l;return h<0||m<0||h>=a||m>=r?null:{x:h,y:m}}function Ic(e,t,n){const s=Q5(e),o=s&&q5(e,t,n);if(!s||!o)return!s;const i=Math.floor(o.x),r=(Math.floor(o.y)*e.naturalWidth+i)*4+3;return s[r]>24}function Z5(e,t){const n=[];try{for(let s=0;s<12;s++){const o=document.elementFromPoint(e,t);if(!o)return null;const i=o.closest("img.artimg");if(i&&!Ic(i,e,t)){n.push(i),i.style.pointerEvents="none";continue}return o}return null}finally{for(let s=0;s<n.length;s++)n[s].style.pointerEvents=""}}const N5="var(--line)",F5=1.4,rt='fill="#3a1d3c" opacity=".14"',Ol='fill="#3a1d3c" opacity=".22"',fn={l:[72,172],r:[128,172]},_s={l:[50,233],r:[150,233]},j5={l:[88,238],r:[112,238]};function I(e=3){return`stroke="${N5}" stroke-width="${(e*F5).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"`}function $(e){const n=(Math.round(e*10)/10).toFixed(1);return n.endsWith(".0")?n.slice(0,-2):n}function Wl(e,t,n,s,o){const i=o*Math.PI/180,a=e-n,r=t-s,l=Math.cos(i),c=Math.sin(i);return{x:n+a*l-r*c,y:s+a*c+r*l}}function oi(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=(n>>16&255)*(1-t),i=(n>>8&255)*(1-t),a=(n&255)*(1-t);return"#"+s(o)+s(i)+s(a)}function gf(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=n>>16&255,i=n>>8&255,a=n&255;return"#"+s(o+(255-o)*t)+s(i+(255-i)*t)+s(a+(255-a)*t)}function Ul(e,t,n,s,o=0){const i=e[0],a=e[1],r=e[0]===t[0]&&e[1]===t[1]?t[0]+.01:t[0],l=t[1],c=r-i,f=l-a,d=Math.hypot(c,f)||1,g=-f/d,h=c/d,m=(i+r)/2+g*o,k=(a+l)/2+h*o,_=n/2,y=s/2,u=(_+y)/2*1.04,v=[i+g*_,a+h*_],x=[r+g*y,l+h*y],A=[r-g*y,l-h*y],O=[i-g*_,a-h*_];return`M${$(v[0])} ${$(v[1])} Q${$(m+g*u)} ${$(k+h*u)} ${$(x[0])} ${$(x[1])} A${$(y)} ${$(y)} 0 0 1 ${$(A[0])} ${$(A[1])} Q${$(m-g*u)} ${$(k-h*u)} ${$(O[0])} ${$(O[1])} A${$(_)} ${$(_)} 0 0 1 ${$(v[0])} ${$(v[1])} Z`}function $r(e,t,n,s,o){const i=[],a=(t-e)/s;for(let r=0;r<s;r++){const l=e+r*a,c=l+a;i.push(`Q${$((l+c)/2)} ${$(n+o)} ${$(c)} ${$(n)}`)}return i.join(" ")}function Vl(e,t,n,s,o,i=0){const a=[];for(let r=0;r<s;r++){const l=i+2*Math.PI*r/s,c=i+2*Math.PI*(r+1)/s,f=(l+c)/2,d=e+n*Math.cos(l),g=t+n*Math.sin(l),h=e+n*Math.cos(c),m=t+n*Math.sin(c),k=e+(n+o)*Math.cos(f),_=t+(n+o)*Math.sin(f);r===0&&a.push(`M${$(d)} ${$(g)}`),a.push(`Q${$(k)} ${$(_)} ${$(h)} ${$(m)}`)}return a.join(" ")+" Z"}function $s(e,t,n,s){const o=e==="arm"?fn[t]:j5[t],i=e==="arm"?t==="l"?s.armL:s.armR:t==="l"?s.legL:s.legR,a=e==="leg"?t==="l"?s.legLLift:s.legRLift:0,r=i||a?` transform="translate(0 ${$(-a)}) rotate(${$(i)} ${o[0]} ${o[1]})"`:"";return`<g class="${e} ${t}${e==="arm"?" hang":""}"${r} style="transform-box:view-box;transform-origin:${o[0]}px ${o[1]}px">${n}</g>`}const Gn="var(--line)";function xn(e,t=.8,n=2.2){return e.map(s=>`<path d="${s}" fill="none" stroke="var(--hair-shade)" stroke-width="${n}" stroke-linecap="round" opacity="${t}"/>`).join("")}function Fo(e,t=.32){return e.map(n=>`<path d="${n}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${t}"/>`).join("")}function In(){return'<path d="M54 72 Q62 44 92 38 Q70 50 63 74 Z" fill="#fff" opacity=".45"/><path d="M60 64 Q70 48 86 42" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".8"/><path d="M104 37 Q130 38 145 58 Q128 46 106 43 Z" fill="#fff" opacity=".3"/><circle cx="72" cy="50" r="2" fill="#fff" opacity=".85"/>'}function Lt(e,t,n){return n?`<path d="${e}" fill="url(#${t}h)"/>`:""}const hf="M34 112 Q28 28 100 28 Q172 28 166 112 Q164 146 146 156 L54 156 Q36 146 34 112 Z";function Wt(e,t){return`<path d="${hf}" fill="var(--hair)" ${I(3.2)}/>${Lt(hf,e,t)}`}function el(e,t,n,s,o,i,a=10){const r=Vl(e+2,t+3,n,12,7,s+.1),l=Vl(e,t,n-1,12,7,s);let c=`<path d="${r}" fill="var(--hair-shade)" ${I(3.2)}/><path d="${l}" fill="var(--hair)" ${I(3.2)}/>${Lt(l,o,i)}`;for(let f=0;f<a;f++){const d=f*2.5+s,g=(n-6)*Math.sqrt((f+.5)/a),h=e+g*Math.cos(d),m=t+g*Math.sin(d);c+=`<path d="M${$(h-4)} ${$(m+1)} q1 -5 4.5 -4.5 q3.5 1 2.5 4.5" fill="none" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>`,m<t-2&&h<e+6&&(c+=`<path d="M${$(h-2.5)} ${$(m-2.5)} q2 -2 3.5 -1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`)}return c+=`<ellipse cx="${$(e-10)}" cy="${$(t-12)}" rx="6" ry="3.4" fill="#fff" opacity=".55" transform="rotate(-35 ${$(e-10)} ${$(t-12)})"/>`,c+=`<path d="M${$(e-16)} ${$(t-6)} Q${$(e-6)} ${$(t-18)} ${$(e+4)} ${$(t-14)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>`,c}function xs(e,t,n,s=6,o=[],i=7){let a=`<path d="M${e} ${t-6} V${n}" stroke="${Gn}" stroke-width="${$(2*s+4.6)}" stroke-linecap="round"/><path d="M${e} ${t-6} V${n}" stroke="var(--hair)" stroke-width="${$(2*s)}" stroke-linecap="round"/>`,r=t,l=0;for(;r<n;){const c=l%2?1:-1;a+=`<path d="M${$(e-c)} ${$(r-4)} Q${$(e+c*s*1.05)} ${$(r-2)} ${$(e+c*s*.55)} ${$(r+4)} Q${$(e)} ${$(r+5.5)} ${$(e-c*1.4)} ${$(r+1)}" fill="none" stroke="var(--hair-shade)" stroke-width="1.7" stroke-linecap="round"/>`,c>0&&(a+=`<path d="M${$(e+1)} ${$(r-2)} q2.2 -.5 3 1.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>`),r+=i,l++}for(let c=0;c<o.length;c++){const f=o[c];a+=`<rect x="${$(e-6.2)}" y="${f-4}" width="12.4" height="8" rx="2.6" fill="var(--acc)" stroke="${Gn}" stroke-width="2"/><rect x="${$(e-4)}" y="${f-2.5}" width="2.6" height="4.5" rx="1" fill="#fff" opacity=".6"/>`}return a+=`<path d="M${e-4} ${n+2} q2 5 4 6 q2 -1 4 -6" fill="var(--hair)" stroke="${Gn}" stroke-width="2"/>`,a}function Oa(e,t,n,s=5.5){let o=`<path d="M${e} ${t} V${n}" stroke="${Gn}" stroke-width="${$(2*s+4)}" stroke-linecap="round"/><path d="M${e} ${t} V${n}" stroke="var(--hair)" stroke-width="${$(2*s)}" stroke-linecap="round"/>`;for(let i=t+8;i<n;i+=16)o+=`<path d="M${$(e-s*.7)} ${i} Q${e} ${i+5} ${$(e+s*.7)} ${i}" fill="none" stroke="var(--hair-shade)" stroke-width="1.6" opacity=".8"/>`;return o+=`<circle cx="${e}" cy="${n+3}" r="${$(s*.55)}" fill="var(--hair)" stroke="${Gn}" stroke-width="2"/>`,o}function tl(e,t,n,s){return`<path d="${e}" fill="var(--hair)" ${I(3)}/>${Lt(e,t,n)}${xn(s)}${Fo(s.slice(0,2),.45)}`}function eo(e,t,n){return`<ellipse cx="${e}" cy="${t}" rx="8" ry="5.5" fill="var(--acc)" ${I(2.4)} transform="rotate(${n} ${e} ${t})"/><ellipse cx="${e-1}" cy="${t-2}" rx="2.4" ry="1.3" fill="#fff" opacity=".6" transform="rotate(${n} ${e-1} ${t-2})"/>`}const Hn='<path d="M42 104 Q44 76 70 66 Q86 74 100 58 Q114 74 130 66 Q156 76 158 104" fill="none" stroke="#3a1d3c" stroke-width="9" opacity=".12"/>';function ig(e){return e==="puffs"||e==="coily"?"puffs":e==="afro"?"afro":e==="braids"?"braids":e==="boxbraids"?"box":e==="locs"?"locs":e==="sidebraid"?"sidebraid":e==="crown"?"crown":e==="pony"?"pony":e==="sidepony"?"sidepony":e==="pigtails"?"pigtails":e==="halfup"?"halfup":e==="buns"?"buns":e==="topbun"?"topbun":e==="lowbun"?"lowbun":e==="long"?"long":e==="wavy"||e==="wavybob"?e==="wavy"?"wavy":"bob":e==="bob"||e==="curlybob"||e==="sidebangs"?"bob":e==="pixie"?"pixie":(e==="bangs"||e==="short")&&e==="bangs"?"bangs":"short"}function G5(e,t,n){const s=ig(e);if(s==="puffs"){const o=e==="coily"?26:30;return el(48,52,o,0,t,n,12)+el(152,52,o,.3,t,n,12)+`<path d="M42 112 Q38 48 100 44 Q162 48 158 112 Q154 144 100 146 Q46 144 42 112 Z" fill="var(--hair)" ${I(3.2)}/>`+eo(66,68,-35)+eo(134,68,35)}if(s==="afro")return el(100,78,78,.2,t,n,14);if(s==="braids")return Wt(t,n)+xs(34,108,230,5.4,[196])+xs(166,108,230,5.4,[196]);if(s==="box")return Wt(t,n)+xs(30,110,228,5,[200],10)+xs(170,110,228,5,[200],10);if(s==="locs")return Wt(t,n)+Oa(32,112,236)+Oa(168,112,236);if(s==="sidebraid")return Wt(t,n);if(s==="pony"||s==="sidepony"||s==="halfup"){const o=s==="sidepony"?"M118 78 Q150 70 158 120 Q164 160 150 200 Q136 188 138 160 Q132 120 124 96 Z":"M126 40 Q178 28 180 92 Q184 132 168 168 Q160 196 174 220 Q148 212 145 182 Q140 156 152 124 Q160 90 132 64 Z",i=s==="halfup"?70:s==="sidepony"?86:44;return Wt(t,n)+tl(o,t,n,s==="sidepony"?["M130 96 Q150 120 146 160","M138 110 Q154 140 148 180"]:["M146 56 Q170 88 160 130","M156 66 Q176 100 166 140","M150 150 Q148 180 160 206"])+eo(s==="sidepony"?124:128,i,s==="sidepony"?-20:25)}if(s==="pigtails")return Wt(t,n)+tl("M40 100 Q22 120 28 168 Q34 200 48 214 Q58 196 52 160 Q58 124 56 108 Z",t,n,["M40 120 Q32 150 40 184"])+tl("M160 100 Q178 120 172 168 Q166 200 152 214 Q142 196 148 160 Q142 124 144 108 Z",t,n,["M160 120 Q168 150 160 184"])+eo(52,96,20)+eo(148,96,-20);if(s==="buns"){let o="";for(const i of[52,148])o+=`<circle cx="${i}" cy="44" r="24" fill="var(--hair)" ${I(3.2)}/>${n?`<circle cx="${i}" cy="44" r="24" fill="url(#${t}h)"/>`:""}`,o+=xn([`M${i-14} 48 Q${i-14} 28 ${i} 26 Q${i+16} 30 ${i+14} 48`,`M${i-8} 54 Q${i+8} 56 ${i+12} 48`]),o+=`<path d="M${i-12} 34 Q${i-4} 24 ${i+4} 26" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>`;return o+Wt(t,n)}if(s==="topbun")return`<circle cx="100" cy="30" r="26" fill="var(--hair)" ${I(3.2)}/>${n?`<circle cx="100" cy="30" r="26" fill="url(#${t}h)"/>`:""}<path d="M82 28 Q100 12 118 28" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>${xn(["M86 36 Q100 24 114 36","M90 42 Q100 34 110 42"])}${Wt(t,n)}`;if(s==="lowbun")return Wt(t,n)+`<circle cx="100" cy="168" r="22" fill="var(--hair)" ${I(3)}/>${n?`<circle cx="100" cy="168" r="22" fill="url(#${t}h)"/>`:""}${eo(100,148,0)}`;if(s==="long"||s==="wavy"){const o=s==="wavy"?"M36 108 Q28 160 40 210 Q52 250 46 286 Q70 270 78 230 Q60 180 58 140 Q52 120 48 108 Z M164 108 Q172 160 160 210 Q148 250 154 286 Q130 270 122 230 Q140 180 142 140 Q148 120 152 108 Z":"M38 110 Q30 170 36 240 Q42 280 34 300 L70 292 Q64 240 66 180 Q62 140 56 112 Z M162 110 Q170 170 164 240 Q158 280 166 300 L130 292 Q136 240 134 180 Q138 140 144 112 Z";return`<path d="${o}" fill="var(--hair)" ${I(3)}/>${Lt(o,t,n)}${Wt(t,n)}`}if(s==="bob"){const o=e==="curlybob"?"M30 120 Q24 170 48 196 Q70 210 100 206 Q130 210 152 196 Q176 170 170 120 Q150 150 100 156 Q50 150 30 120 Z":"M32 116 Q26 168 50 190 Q78 204 100 200 Q122 204 150 190 Q174 168 168 116 Q150 148 100 154 Q50 148 32 116 Z";return`<path d="${o}" fill="var(--hair)" ${I(3.2)}/>${Lt(o,t,n)}${Wt(t,n)}`}return Wt(t,n)}function Y5(e,t,n){const s=ig(e),o='<path d="M100 34 V56" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>';if(s==="puffs"||s==="braids"||s==="box"||s==="locs"||s==="afro"||s==="bangs"){const a=s==="afro"?"M48 100 Q52 48 100 40 Q148 48 152 100 Q140 78 100 70 Q60 78 48 100 Z":s==="bangs"?"M40 108 Q36 40 100 34 Q164 40 160 108 L150 96 Q130 108 100 100 Q70 108 50 96 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q154 74 130 62 Q112 70 100 52 Q88 70 70 62 Q46 74 40 106 Z";let r=Hn+`<path d="${a}" fill="var(--hair)" ${I(3.2)}/>${Lt(a,t,n)}${o}`;return r+=xn(["M84 44 Q70 52 60 70","M116 44 Q130 52 140 70","M92 40 Q80 48 74 58","M108 40 Q120 48 126 58","M76 42 Q58 56 52 82","M124 42 Q142 56 148 82"]),r+=Fo(["M90 36 Q78 42 70 52","M112 36 Q124 42 132 52"]),s==="puffs"?(r+=`<path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="${Gn}" stroke-width="7" stroke-linecap="round"/><path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`,r+=`<path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="${Gn}" stroke-width="7" stroke-linecap="round"/><path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`):s==="braids"||s==="box"?(r+=xs(48,114,200,5,[156],s==="box"?10:7),r+=xs(152,114,200,5,[156],s==="box"?10:7)):s==="locs"&&(r+=Oa(46,116,210,4.6)+Oa(154,116,210,4.6)),r+In()}if(s==="sidebraid"){const a="M40 108 Q36 36 100 32 Q164 36 160 100 Q140 78 100 70 Q70 80 40 108 Z";return Hn+`<path d="${a}" fill="var(--hair)" ${I(3.2)}/>${Lt(a,t,n)}${xn(["M70 46 Q86 60 96 74","M120 44 Q136 58 146 74"])}${xs(150,100,210,5.6,[168],7)}${In()}`}if(s==="crown"){const a="M40 106 Q36 36 100 32 Q164 36 160 106 Q150 80 100 74 Q50 80 40 106 Z";let r="";for(let l=0;l<7;l++){const c=58+l*14;r+=`<path d="M${c} 58 Q${c+7} 46 ${c+14} 58" fill="none" stroke="var(--hair-shade)" stroke-width="3.2" stroke-linecap="round"/>`}return Hn+`<path d="${a}" fill="var(--hair)" ${I(3.2)}/>${Lt(a,t,n)}${r}${In()}`}if(s==="pony"||s==="sidepony"||s==="halfup"||s==="pigtails"){const a=s==="sidepony"?"M40 108 Q34 36 100 32 Q166 34 160 108 Q150 86 120 78 Q90 90 60 74 Q48 90 40 108 Z":"M40 108 Q34 34 100 32 Q166 34 160 108 Q156 84 144 72 Q128 86 104 80 Q86 78 72 68 Q60 84 48 84 Q42 94 40 108 Z";let r=Hn+`<path d="${a}" fill="var(--hair)" ${I(3.2)}/>${Lt(a,t,n)}`;return r+=`<path d="M40 104 Q36 120 44 132 Q46 116 50 106 Z" fill="var(--hair)" ${I(2.4)}/><path d="M160 104 Q164 120 156 132 Q154 116 150 106 Z" fill="var(--hair)" ${I(2.4)}/>`,r+=xn(["M70 46 Q90 60 104 74","M128 46 Q140 60 146 74","M96 40 Q110 56 116 66"]),r+=Fo(["M76 42 Q92 52 100 62"]),r+In()}if(s==="buns"||s==="topbun"||s==="lowbun"){const a=s==="topbun"?"M44 108 Q40 50 100 46 Q160 50 156 108 Q148 82 100 74 Q52 82 44 108 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q152 80 138 70 Q126 80 112 76 Q104 82 100 74 Q96 82 88 76 Q74 80 62 70 Q48 80 40 106 Z";let r=Hn+`<path d="${a}" fill="var(--hair)" ${I(3.2)}/>${Lt(a,t,n)}`;if(r+=xn(["M80 42 Q72 56 68 68","M120 42 Q128 56 132 68","M100 36 Q98 56 100 70","M90 38 Q84 56 86 72","M110 38 Q116 56 114 72"]),r+=Fo(["M86 38 Q80 46 78 54","M114 38 Q120 46 122 54"]),s==="buns")for(const[l,c]of[[42,1],[158,-1]]){const f=`M${l} 100 q${-8*c} 14 ${-2*c} 24 q${5*c} 8 ${-1*c} 14`;r+=`<path d="${f}" fill="none" stroke="${Gn}" stroke-width="7" stroke-linecap="round"/><path d="${f}" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`}return r+In()}if(s==="long"||s==="wavy"||s==="bob"){const a=e==="sidebangs"||e==="wavybob"?"M38 108 Q34 40 70 36 Q100 34 112 48 Q90 70 48 78 Q36 90 38 108 Z M112 48 Q140 36 164 50 Q166 100 150 108 Q130 80 112 70 Z":"M40 108 Q34 36 100 32 Q166 36 160 108 Q152 78 128 68 Q112 78 100 60 Q88 78 72 68 Q48 78 40 108 Z";return Hn+`<path d="${a}" fill="var(--hair)" ${I(3.2)}/>${Lt(a,t,n)}${xn(["M78 46 Q68 64 64 80","M122 46 Q132 64 136 80","M100 38 V64"])}${Fo(["M88 40 Q80 50 76 60"])}${In()}`}if(s==="pixie"){const a="M48 104 Q44 48 100 40 Q140 46 150 78 Q156 100 140 108 Q120 86 100 90 Q70 84 52 104 Z";return Hn+`<path d="${a}" fill="var(--hair)" ${I(3.2)}/>${Lt(a,t,n)}${xn(["M70 56 Q86 70 96 84","M118 52 Q132 66 138 82"])}${In()}`}const i="M46 106 Q42 46 100 38 Q158 46 154 106 Q140 80 100 76 Q60 80 46 106 Z";return Hn+`<path d="${i}" fill="var(--hair)" ${I(3.2)}/>${Lt(i,t,n)}${o}${In()}`}const wo="var(--line)";function Hc(e){return Math.abs(e.legL)>=40||Math.abs(e.legR)>=40}function Hs(e,t,n,s=[]){const o=s.map(i=>`<path d="${i}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`).join("");return(n?`<path d="${e}" fill="url(#${t}c)"/>`:"")+o}function zl(e,t,n){const s=(n+7).toFixed(1);return`<path d="${e}" fill="none" stroke="${wo}" stroke-width="${s}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function Oc(e,t,n){return $s("arm",e,t,n).replace('class="arm ','class="arm sleeve ')}function da(e,t,n=!1){const[s,o]=fn[e],i=e==="l"?-1:1;let a=zl(`M${s} ${o} L${s+7*i} ${o+20}`,"var(--top)",22);return n&&(a+=`<path d="M${s+7*i-12} ${o+17} H${s+7*i+12}" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round" opacity=".9" transform="rotate(${-18*i} ${s+7*i} ${o+17})"/>`),Oc(e,a,t)}function ii(e,t,n=!0){const[s,o]=fn[e],[i,a]=_s[e],r=e==="l"?-1:1,l=(s+i)/2+6*r;let c=zl(`M${s-2*r} ${o-2} Q${l} ${(o+a)/2-6} ${i-r} ${a-16}`,"var(--top)",21);return n&&(c+=zl(`M${i-3*r} ${a-17} L${i-r} ${a-13}`,"var(--top-trim)",20)),Oc(e,c,t)}function Ql(e,t,n=!1){const[s,o]=fn[e],i=e==="l"?-1:1,a=s+4*i,r=o+8;let l=`<path d="${Vl(a,r,13,9,3.2)}" fill="var(--top)" ${I(2.8)}/>`;return l+=`<ellipse cx="${a-4*i}" cy="${r-5}" rx="5" ry="3" fill="#fff" opacity=".45"/>`,n&&(l+=`<path d="M${a-11} ${r+13} ${$r(a-11,a+11,r+13,4,3)}" fill="none" stroke="#fff" stroke-width="2.4"/>`),Oc(e,l,t)}function Vt(e,t){return e("l",t)+e("r",t)}const uf="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 228 Q100 236 64 228 Z";function us(e,t,n,s,o,i,a="",r=[],l=!1){const c=`<path d="${t}" fill="var(--top)" ${I(3)}/>${Hs(t,s,o,r)}${a}`;return`<g class="shirt" data-hem="${i}">${l?c+n:n+c}</g>`}function K5(e,t,n,s,o){if(t.dress)return"";const i=t.top;if(i==="hoodie"){const l="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L139 230 Q100 240 61 230 Z",c=`<path d="M120 162 Q132 164 134 170 L139 230 Q128 233 123 233 Z" ${rt}/><path d="M72 172 Q76 164 86 163" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".38"/><path d="M78 159 Q100 182 122 159 Q120 152 100 152 Q80 152 78 159 Z" fill="var(--top-trim)" ${I(2.8)}/><path d="M92 172 v18 M108 172 v18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="92" cy="191" r="2.6" fill="#fff" ${I(1.8)}/><circle cx="108" cy="191" r="2.6" fill="#fff" ${I(1.8)}/><path d="M78 202 H122 L127 222 H73 Z" fill="var(--top)" ${I(2.6)}/><path d="M78 202 H122 L124 210 H76 Z" ${rt}/><path d="M61 226 Q100 236 139 226 L139 234 Q100 244 61 234 Z" fill="var(--top-trim)" ${I(2.8)}/>`;return us(e,l,Vt(ii,e),n,s,o,c,["M74 196 q-2 12 2 22","M126 190 q2 14 0 26"])}if(i==="stripes"||i==="jersey"){const l="M68 168 Q74 158 92 158 H108 Q126 158 132 168 L135 232 Q100 238 65 232 Z",c=`${n}st`,f=i==="jersey"?'<path d="M70 176 H130 L128 188 H72 Z" fill="var(--top-trim)"/><path d="M68 210 H132 L130 222 H70 Z" fill="var(--top-trim)"/>':[166,179,192,205,218,231].map(m=>`<rect x="60" y="${m}" width="80" height="6" fill="var(--top-trim)"/>`).join(""),d=i==="jersey"?'<path d="M86 160 L100 176 L114 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/>':'<path d="M84 159 Q100 172 116 159" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',g=s?`<path d="${l}" fill="url(#${n}c)"/>`:"";return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${c}"><path d="${l}"/></clipPath></defs>${Vt(m=>da(m,e,!0),e)}<path d="${l}" fill="var(--top)"/><g clip-path="url(#${c})">${g}<path d="M118 160 L135 168 L138 236 H120 Z" ${rt}/>${f}</g><path d="${l}" fill="none" ${I(3)}/>${d}<path d="M78 198 q-2 12 1 24" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/><path d="M122 190 q2 14 0 28" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/></g>`}if(i==="sweater"||i==="cardigan"){const l=i==="cardigan"?"M68 168 Q74 158 92 158 H108 Q126 158 132 168 L134 232 H108 L100 210 L92 232 H66 Z":"M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 234 Q100 242 64 234 Z",c=`<path d="M118 166 L134 174 L136 230 Q120 236 112 228 Z" ${rt}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M64 226 Q100 236 136 226" fill="none" stroke="var(--top-trim)" stroke-width="6" stroke-linecap="round"/>`,f=i==="cardigan"?[186,202,218].map(d=>`<circle cx="100" cy="${d}" r="2.4" fill="var(--top-trim)" ${I(1.4)}/>`).join(""):"";return us(e,l,Vt(ii,e),n,s,o,c+f,["M80 190 q-2 16 0 28","M120 188 q2 16 0 30"])}if(i==="tank"||i==="bib"){const l=i==="bib"?"M78 168 H122 L126 228 H74 Z":"M78 168 Q86 160 96 164 H104 Q114 160 122 168 L128 226 H72 Z",c=`<path d="M110 172 H126 L128 226 H114 Z" ${rt}/><path d="M82 176 Q84 168 92 166" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".35"/>`,f=i==="bib"?`${c}<path d="M86 150 L78 168 M114 150 L122 168" stroke="${wo}" stroke-width="8" stroke-linecap="round"/><path d="M86 150 L78 168 M114 150 L122 168" stroke="var(--top)" stroke-width="4.5" stroke-linecap="round"/><rect x="90" y="176" width="20" height="16" rx="3" fill="var(--top-trim)" ${I(1.6)}/>`:`${c}<path d="M84 166 Q100 176 116 166" fill="none" stroke="var(--top-trim)" stroke-width="4"/>`;return us(e,l,"",n,s,o,f,["M88 190 q2 14 0 24"])}if(i==="puff"||i==="ruffle"){const l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L132 222 H68 Z",c=`<path d="M100 172 l-8 -5 v10 z M100 172 l8 -5 v10 z" fill="var(--top-trim)" ${I(1.8)}/><path d="M97 174 l-4 10 M103 174 l4 10" stroke="var(--top-trim)" stroke-width="2.6" stroke-linecap="round"/>`,f=(i==="ruffle"?`<path d="M68 166 Q74 178 82 166 Q90 180 100 166 Q110 180 118 166 Q126 180 132 166" fill="var(--top-trim)" ${I(2)}/>`:c)+`<path d="M118 162 Q128 164 130 170 L132 222 H120 Z" ${rt}/><path d="M74 176 Q76 168 84 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return us(e,l,Vt(Ql,e),n,s,o,f,["M86 190 q2 10 0 20","M116 188 q-2 12 0 22"],!0)}if(i==="button"){const l=uf,c=[180,196,212].map(d=>`<circle cx="100" cy="${d}" r="2.6" fill="#fff" ${I(1.6)}/>`).join(""),f=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${rt}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M100 164 V226" stroke="#fff" stroke-width="2" opacity=".7"/>${c}<path d="M82 160 Q100 172 118 160" fill="var(--top)" ${I(2.2)}/>`;return us(e,l,Vt(d=>da(d,e,!1),e),n,s,o,f,["M78 196 q-1 12 2 20"])}if(i==="raincoat"){const l="M62 168 Q70 156 92 156 H108 Q130 156 138 168 L146 240 Q100 252 54 240 Z",c=`<path d="M120 164 L142 176 L146 236 Q124 244 116 232 Z" ${rt}/><path d="M72 176 Q76 166 88 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M70 156 Q100 176 130 156" fill="none" stroke="var(--top-trim)" stroke-width="6"/><circle cx="100" cy="196" r="4" fill="var(--top-trim)" ${I(1.8)}/><path d="M78 214 H122" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round"/>`;return us(e,l,Vt(ii,e),n,s,o,c,["M76 190 q-4 18 -2 36","M124 188 q4 18 2 36"])}const a=uf,r=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${rt}/><path d="M84 160 Q100 172 116 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return us(e,a,Vt(l=>da(l,e,!1),e),n,s,o,r,["M78 196 q-2 12 1 22","M122 194 q2 14 -1 24"])}function mf(e,t,n,s,o,i=!1,a=16){const r=e==="l"?88:112,l=e==="l"?-1:1,c=`M${r-a/2} 226 Q${r-a/2+l} ${n-20} ${r-a/2+2*l} ${n} H${r+a/2} Q${r+a/2} ${n-30} ${r+a/2-l} 226 Z`;let f=`<path d="${c}" fill="var(--bottom)" ${I(2.8)}/>`;return f+=Hs(c,s,o,[`M${r-4*l} 240 Q${r} ${(226+n)/2} ${r+3*l} ${n-14}`]),e==="r"?f+=`<path d="M${r+1} 230 H${r+a/2} L${r+a/2} ${n} H${r+4} Z" ${rt}/>`:f+=`<path d="M${r-2} 238 Q${r-6} ${(226+n)/2} ${r-2} ${n-10}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".3"/>`,i&&(f+=`<path d="M${r-a/2-1} ${n-8} H${r+a/2+1} V${n+1} H${r-a/2-1} Z" fill="var(--bottom-trim)" ${I(2)}/>`),$s("leg",e,f,t)}function X5(e,t,n,s){if(t.dress)return'<g data-layer="bottom"></g>';const o=t.bottom;if(Hc(e)&&(o==="skirt"||o==="tutu"||o==="overalls"))return`<g data-layer="bottom"><path class="skirt" d="${o==="tutu"?"M52 216 H148 L160 248 Q100 260 40 248 Z":"M62 218 H138 L152 252 Q100 264 48 252 Z"}" fill="var(--bottom)" ${I(3)}/></g>`;if(o==="skirt"){const g="M68 222 H132 L146 262 Q100 274 54 262 Z";return`<g data-layer="bottom"><path class="skirt" d="${g}" fill="var(--bottom)" ${I(3)}/>${Hs(g,n,s,["M82 234 L76 258","M100 232 V266","M118 234 L126 258"])}<path d="M114 224 H132 L146 262 Q130 268 118 266 Z" ${rt}/><path d="M72 228 Q66 246 64 258" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".3"/><path d="M84 236 v10 M116 236 v10" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/></g>`}if(o==="tutu")return'<g data-layer="bottom"></g>';if(o==="overalls"){const g="M66 220 H134 L139 264 H106 L100 254 L94 264 H61 Z";return`<g data-layer="bottom"><g class="leg" style="transform-box:view-box;transform-origin:100px 238px"><path d="${g}" fill="var(--bottom)" ${I(3)}/>${Hs(g,n,s,["M78 232 Q74 248 72 260","M122 230 Q128 248 132 260"])}<path d="M118 222 H134 L139 264 H122 Z" ${rt}/><path d="M64 258 H95 M105 258 H138" stroke="var(--bottom-trim)" stroke-width="4"/></g></g>`}const a=o==="shorts"?256:292,r=o==="joggers"||o==="jeans",l=o==="leggings"?12:o==="shorts"?18:16,c=mf("l",e,a,n,s,r,l)+mf("r",e,a,n,s,r,l),f=o==="jeans"?'<path d="M88 232 V286 M112 232 V286" stroke="#c9a24a" stroke-width="1.4" stroke-dasharray="2 3" opacity=".7"/>':"";return`<g data-layer="bottom">${`<path d="M70 220 H130 V230 H70 Z" fill="var(--bottom)" ${I(2.4)}/>`}${c}${f}</g>`}function J5(e,t,n,s){if(t.dress)return'<g data-layer="bottom-over"></g>';const o=t.bottom;if(o==="overalls"){const i="M78 180 H122 L124 228 H76 Z";return`<g data-layer="bottom-over"><path d="M80 176 L72 164 M120 176 L128 164" stroke="${wo}" stroke-width="12" stroke-linecap="round"/><path d="M80 176 L72 164 M120 176 L128 164" stroke="var(--bottom)" stroke-width="7.5" stroke-linecap="round"/><path d="${i}" fill="var(--bottom)" ${I(3)}/>${Hs(i,n,s,["M86 200 q14 6 28 0"])}<path d="M88 190 H112 V206 Q100 212 88 206 Z" fill="var(--bottom-trim)" ${I(2.4)}/><circle cx="82" cy="186" r="3.6" fill="#fff" ${I(2)}/><circle cx="118" cy="186" r="3.6" fill="#fff" ${I(2)}/><path d="M66 222 H134 L135 230 H65 Z" fill="var(--bottom)" ${I(3)}/><path d="M108 180 H122 L124 228 H110 Z" ${rt}/><path d="M82 182 v12" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/></g>`}if(o==="tutu"){if(Hc(e))return`<g data-layer="bottom-over"><path class="skirt" d="M58 220 H142 L154 246 Q100 256 46 246 Z" fill="var(--bottom)" ${I(2.4)}/></g>`;let i="";const a=[[266,50,150,8],[256,56,144,7],[246,64,136,6]];for(let l=0;l<a.length;l++){const[c,f,d,g]=a[l],h=`M${f+8} ${c-22} H${d-8} L${d} ${c} ${$r(d,f,c,6,g)} Z`;i+=`<path class="skirt" d="${h}" fill="var(--bottom)" ${I(2.4)}/>`,i+=`<path d="M${d-20} ${c-16} L${d-6} ${c-2}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".2"/>`}const r="M66 214 H134 V224 H66 Z";return`<g data-layer="bottom-over">${i}<path d="${r}" fill="var(--bottom-trim)" ${I(2.6)}/>${Hs(r,n,s)}</g>`}return'<g data-layer="bottom-over"></g>'}function yf(e,t){return`<path d="M${e} ${t+2} c-3 -5 -9 -1 -5 3 l5 4 l5 -4 c4 -4 -2 -8 -5 -3z" fill="var(--top-trim)" opacity=".85"/>`}function ex(e,t,n,s,o){const i=t.dress;if(!i)return"";const a=`${n}dr`;let r="M72 210 H128 L150 268 Q100 282 50 268 Z",l="M72 168 Q78 158 94 158 H106 Q122 158 128 168 L130 214 H70 Z",c="",f=Vt(m=>Ql(m,e,!0),e),d=!0;i==="sundress"?(r="M76 214 H124 L140 266 Q100 276 60 266 Z",c='<path d="M78 166 Q100 180 122 166" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',f="",d=!1):i==="party"?c=[[64,236],[86,228],[108,234],[130,242],[76,254],[100,250],[122,258],[92,188]].map(([k,_])=>yf(k,_)).join("")+`<path d="M100 214 l-10 -6 v12 z M100 214 l10 -6 v12 z" fill="var(--top-trim)" ${I(1.8)}/><path d="M52 262 Q100 276 148 262" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="1 5" opacity=".85"/>`:i==="pinafore"?(l="M80 176 H120 L122 214 H78 Z",c='<path d="M86 158 L80 178 M114 158 L120 178" stroke="var(--top)" stroke-width="5" stroke-linecap="round"/>',f="",d=!1,r="M74 212 H126 L142 264 Q100 274 58 264 Z"):i==="jumper"?(c=`<path d="M84 160 Q100 174 116 160" fill="var(--top-trim)" ${I(2)}/>`,f=Vt(m=>da(m,e,!0),e),d=!1):i==="ballet"?(r="M78 214 H122 L132 250 Q100 258 68 250 Z",c=`<path d="M70 248 ${$r(70,130,248,5,5)}" fill="none" stroke="#fff" stroke-width="2"/>`,f=Vt(Ql,e)):i==="nightgown"?(r="M80 214 H120 L132 270 Q100 278 68 270 Z",c='<path d="M88 164 Q100 176 112 164" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>',f=Vt(ii,e),d=!1):i==="raindress"?(r="M70 212 H130 L148 268 Q100 280 52 268 Z",c='<path d="M76 168 Q100 186 124 168" fill="none" stroke="var(--top-trim)" stroke-width="5"/><circle cx="100" cy="198" r="3.4" fill="var(--top-trim)"/>',f=Vt(ii,e),d=!1):(r="M70 214 H130 L152 266 Q100 280 48 266 Z",l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L131 216 H69 Z",c=[[66,236],[86,228],[110,232],[132,240],[76,254],[100,248],[124,258],[56,260],[144,262],[96,266],[84,182],[114,190],[100,200]].map(([k,_])=>yf(k,_)).join("")+`<path d="M112 214 H130 L152 266 Q138 271 128 272 Z" ${rt}/><path d="M118 162 L130 168 L131 216 H120 Z" ${rt}/><path d="M50 262 Q100 276 150 262" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9"/><path d="M60 226 Q56 244 54 258" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/><path d="M68 210 H132 V220 H68 Z" fill="var(--top-trim)" ${I(2.6)}/><path d="M100 215 l-13 -8 v16 z M100 215 l13 -8 v16 z" fill="var(--top-trim)" ${I(2.2)}/><circle cx="100" cy="215" r="3.6" fill="var(--top-trim)" ${I(2)}/><path d="M97 218 l-5 14 M103 218 l5 14" stroke="var(--top-trim)" stroke-width="3" stroke-linecap="round"/><path d="M80 158 Q78 172 94 170 Q99 166 100 162 Q101 166 106 170 Q122 172 120 158 Q100 164 80 158 Z" fill="#fff" ${I(2.4)}/>`),Hc(e)&&(r="M68 214 H132 L150 250 Q100 262 50 250 Z");const g=`${r} ${l}`,h=`<path class="skirt" d="${r}" fill="var(--top)" ${I(3)}/><path d="${l}" fill="var(--top)" ${I(3)}/><g clip-path="url(#${a})">${Hs(g,n,s,["M80 226 Q74 248 70 266","M120 226 Q126 248 130 266"])}${c}</g>`;return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${a}"><path d="${g}"/></clipPath></defs>${d?h+f:f+h}</g>`}function tx(e,t,n,s){const o=e==="l"?`<g transform="translate(${2*s} 0) scale(-1 1)">${n}</g>`:n;return $s("leg",e,o,t)}function nx(e,t){const n=t.shoes;let s="";for(const o of["l","r"]){const i=o==="l"?87:113;let a="";if(n==="sneakers"||n==="lightup"){const r=n==="lightup"?`<circle cx="${i-4}" cy="292" r="2.2" fill="#ff8fab"/><circle cx="${i+4}" cy="296" r="2.2" fill="#8ecae6"/><circle cx="${i}" cy="300" r="2" fill="#ffd166"/>`:"";a=`<path d="M${i} 270 V286" fill="none" stroke="var(--sock)" stroke-width="16" stroke-linecap="round"/><path d="M${i-14} 296 Q${i-14} 284 ${i} 284 Q${i+14} 284 ${i+16} 296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+12} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${I(2.8)}/><path d="M${i-12} 304 H${i+18}" stroke="var(--shoe-trim)" stroke-width="3.5" stroke-linecap="round"/><path d="M${i-6} 290 l5 2 M${i-6} 295 l6 2" stroke="${wo}" stroke-width="1.8" stroke-linecap="round"/>${r}`}else if(n==="boots"||n==="rainboots"){const r=n==="rainboots"?248:258,l=n==="boots"?[[-6,272],[5,268],[-2,284],[7,290],[-8,294]].map(([c,f])=>`<circle cx="${i+c}" cy="${f}" r="2.6" fill="#fff" opacity=".9"/>`).join(""):"";a=`<path d="M${i-14} ${r} H${i+14} V296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+10} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${I(2.8)}/><path d="M${i-16} ${r-4} H${i+16} V${r+8} H${i-16} Z" fill="var(--shoe)" ${I(2.6)}/>`+l+(n==="rainboots"?`<path d="M${i-12} ${r+16} H${i+12}" stroke="var(--shoe-trim)" stroke-width="4" stroke-linecap="round"/>`:`<path d="M${i-6} ${r+14} V292" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".45"/>`)}else n==="maryjanes"?a=`<path d="M${i} 266 V290" fill="none" stroke="var(--sock)" stroke-width="15" stroke-linecap="round"/><path d="M${i-12} 274 ${$r(i-12,i+12,274,4,4)} L${i+12} 268 H${i-12} Z" fill="var(--sock)" ${I(2)}/><path d="M${i-13} 298 Q${i-13} 290 ${i} 290 Q${i+13} 290 ${i+14} 298 Q${i+20} 300 ${i+20} 304 Q${i+20} 309 ${i+8} 309 H${i-12} Q${i-16} 309 ${i-14} 302 Z" fill="var(--shoe)" ${I(2.8)}/><path d="M${i-10} 294 H${i+12}" stroke="${wo}" stroke-width="2"/><circle cx="${i+8}" cy="294" r="2.2" fill="var(--acc)"/>`:n==="sandals"?a=`<path d="M${i-12} 298 Q${i-12} 286 ${i} 286 Q${i+12} 286 ${i+14} 296 Q${i+18} 298 ${i+18} 302 Q${i+18} 306 ${i+8} 306 H${i-12} Q${i-16} 306 ${i-14} 300 Z" fill="var(--skin)" ${I(2.4)}/><path d="M${i-14} 304 H${i+18}" stroke="var(--shoe)" stroke-width="5" stroke-linecap="round"/><path d="M${i-8} 292 H${i+10} M${i+2} 300 L${i+8} 290" stroke="var(--shoe)" stroke-width="4" stroke-linecap="round"/><circle cx="${i+2}" cy="293" r="3" fill="var(--shoe-trim)" ${I(1.4)}/>`:n==="slippers"?a=`<path d="M${i-14} 292 Q${i-14} 280 ${i} 278 Q${i+16} 280 ${i+18} 294 Q${i+22} 296 ${i+20} 304 H${i-14} Q${i-18} 304 ${i-16} 296 Z" fill="var(--shoe)" ${I(2.8)}/><path d="M${i-6} 286 q6 -4 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`:a=`<ellipse cx="${i+2}" cy="304" rx="16" ry="7" fill="var(--shoe)" ${I(2.6)}/>`;s+=tx(o,e,a,i)}return`<g data-layer="shoes">${s}</g>`}const ag=new Set(["cap","beanie","sunhat"]),sx=new Set(["catears","earmuffs"]);function rg(e){return e==="afro"?28:e==="topbun"?20:e==="puffs"||e==="coily"?16:e==="buns"||e==="curlybob"?12:e==="long"||e==="wavy"||e==="wavybob"?8:0}function Oo(e,t,n){if(!ag.has(t)&&!sx.has(t))return n;const s=rg(e);return s?`<g data-hat="${t}" transform="translate(0 ${$(-s)})">${n}</g>`:n}function ox(e,t,n){let s="";for(let l=0;l<n.length;l++)ag.has(n[l])&&(s=n[l]);if(!s)return"";const o=rg(t),i=(s==="beanie"?58:s==="cap"?64:62)-o,a=Math.min(70,i),r=t==="afro"||t==="puffs"||t==="coily"?92:78;return`<mask id="${e}hm" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" data-brim="${$(a)}"><rect x="-30" y="-50" width="260" height="420" fill="#fff"/><rect x="${$(100-r)}" y="-50" width="${$(r*2)}" height="${$(a+50)}" fill="#000"/></mask>`}function nl(e,t,n){return`<g transform="translate(${e} ${t}) scale(${n})"><path d="M0 0 C-8 -14 -30 -14 -28 0 C-30 14 -8 14 0 0 Z" fill="var(--acc)" ${I(2.6)}/><path d="M0 0 C8 -14 30 -14 28 0 C30 14 8 14 0 0 Z" fill="var(--acc)" ${I(2.6)}/><rect x="-6" y="-7" width="12" height="14" rx="4" fill="var(--acc2)" ${I(2.2)}/></g>`}function ix(e){return`<g data-layer="accessory">${e.acc.map(n=>n==="glasses"?'<circle cx="76" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="124" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="76" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><circle cx="124" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3.2"/><path d="M58 108 L42 104 M142 108 L158 104" stroke="var(--frame)" stroke-width="3.2" stroke-linecap="round"/>':n==="square"?'<rect x="58" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><rect x="108" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><path d="M92 112 H108" stroke="var(--frame)" stroke-width="3.2"/>':n==="sunnies"?'<path d="M56 104 H94 Q96 122 76 122 Q56 122 56 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M106 104 H144 Q146 122 124 122 Q104 122 106 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3"/>':n==="bow"?nl(100,78,.7):n==="bigbow"?nl(100,70,1.15):n==="headband"?`<path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="${wo}" stroke-width="12" stroke-linecap="round"/><path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round"/>${nl(100,32,.85)}`:n==="flower"?`<g transform="translate(138 78)">${[0,60,120,180,240,300].map(s=>`<ellipse cx="0" cy="-8" rx="5" ry="8" fill="var(--acc)" ${I(1.6)} transform="rotate(${s})"/>`).join("")}<circle r="4.5" fill="var(--acc2)" ${I(1.6)}/></g>`:n==="cap"?Oo(e.hair,"cap",`<path d="M54 64 Q56 20 100 16 Q144 20 146 64 Q128 54 100 56 Q72 54 54 64 Z" fill="var(--acc)" ${I(3)}/><path d="M48 56 Q100 66 152 56 L156 62 Q100 70 44 62 Z" fill="var(--acc)" ${I(3)}/><circle cx="100" cy="18" r="4.5" fill="#fff" ${I(2)}/>`):n==="beanie"?Oo(e.hair,"beanie",`<path d="M50 66 Q48 14 100 8 Q152 14 150 66 Q128 56 100 58 Q72 56 50 66 Z" fill="var(--acc)" ${I(3)}/><path d="M50 58 H150" stroke="var(--acc2)" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="8" r="7" fill="var(--acc2)" ${I(2.4)}/>`):n==="sunhat"?Oo(e.hair,"sunhat",`<path d="M66 56 Q68 22 100 18 Q132 22 134 56 Q118 48 100 50 Q82 48 66 56 Z" fill="var(--acc)" ${I(3)}/><path d="M18 56 Q100 68 182 56 Q170 64 100 66 Q30 64 18 56 Z" fill="var(--acc)" ${I(3)}/><path d="M72 46 Q100 38 128 46" fill="none" stroke="var(--acc2)" stroke-width="4"/>`):n==="catears"?Oo(e.hair,"catears",`<path d="M58 62 L70 18 L86 60 Z" fill="var(--acc)" ${I(2.6)}/><path d="M114 60 L130 18 L142 62 Z" fill="var(--acc)" ${I(2.6)}/><path d="M64 54 L72 30 L80 52 Z" fill="var(--acc2)"/><path d="M120 52 L128 30 L136 54 Z" fill="var(--acc2)"/>`):n==="earmuffs"?Oo(e.hair,"earmuffs",`<path d="M44 68 Q48 26 100 22 Q152 26 156 68" fill="none" stroke="var(--acc)" stroke-width="6"/><circle cx="34" cy="86" r="14" fill="var(--acc)" ${I(2.8)}/><circle cx="166" cy="86" r="14" fill="var(--acc)" ${I(2.8)}/><circle cx="34" cy="86" r="6" fill="var(--acc2)"/><circle cx="166" cy="86" r="6" fill="var(--acc2)"/>`):"").join("")}</g>`}const ax=[{hip:1.5,head:4,armL:3,armR:-2,legL:0,legR:-3,legLLift:0,legRLift:0},{hip:-2,head:-5,armL:1,armR:-7,legL:4,legR:0,legLLift:2,legRLift:0},{hip:0,head:3,armL:2,armR:-2,legL:0,legR:0,legLLift:0,legRLift:0},{hip:-1.5,head:-4,armL:4,armR:-1,legL:5,legR:0,legLLift:3,legRLift:0}],rx={puffs:0,afro:0,pony:1,sidepony:1,pigtails:1,halfup:1,braids:2,boxbraids:2,locs:2,sidebraid:2,crown:2,buns:3,topbun:3,lowbun:3};function Wc(e){const t=e.hair||"buns";let n=rx[t];if(n===void 0){let s=0;for(let o=0;o<t.length;o++)s=(s+t.charCodeAt(o))%4;n=s}return ax[n]}function lx(e){const t=(n,s,o,i,a)=>{const r=Wl(n,s,o,i,a),l=Wl(r.x,r.y,100,238,e.hip);return{x:l.x/2,y:l.y/2}};return{left:t(_s.l[0],_s.l[1],fn.l[0],fn.l[1],e.armL),right:t(_s.r[0],_s.r[1],fn.r[0],fn.r[1],e.armR)}}function cx(e){const t=Wl(100,244,100,238,e.hip);return Math.round(t.y/2*10)/10}function Uc(e){const t=parseInt(e.slice(1),16);return(t>>16&255)+(t>>8&255)+(t&255)}function dx(e){const t=oi(e,.32);return Uc(t)<80?"#5a3a2c":t}function fx(e){return Uc(e)<140?"#3b2340":oi(e,.12)}let bf=0;function px(){return bf+=1,"a"+bf.toString(36)}function ws(e,t){return t.hip?`<g transform="rotate(${$(t.hip)} 100 238)">${e}</g>`:e}function Wo(e,t,n=!1){const s=t.head?`<g transform="rotate(${$(t.head)} 100 158)">${e}</g>`:e;return ws(`<g${n?' class="dollhead" data-dollhead="1"':' class="dollhead"'}>${s}</g>`,t)}function gx(e,t,n){let s=`<defs><radialGradient id="${e}b"><stop offset="0" style="stop-color:var(--blush)" stop-opacity=".62"/><stop offset=".55" style="stop-color:var(--blush)" stop-opacity=".28"/><stop offset="1" style="stop-color:var(--blush)" stop-opacity="0"/></radialGradient>`;return s+=`<radialGradient id="${e}s"><stop offset="0" stop-color="#3a1d3c" stop-opacity=".3"/><stop offset=".6" stop-color="#3a1d3c" stop-opacity=".12"/><stop offset="1" stop-color="#3a1d3c" stop-opacity="0"/></radialGradient>`,s+=`<radialGradient id="${e}k" cx=".42" cy=".36" r=".75"><stop offset=".55" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".16"/></radialGradient>`,t&&(s+=`<linearGradient id="${e}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f1020" stop-opacity=".62"/><stop offset=".5" stop-color="#1f1020" stop-opacity=".05"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`,s+=`<linearGradient id="${e}c" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="146" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".2"/></linearGradient>`,s+=`<radialGradient id="${e}h" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1f1020" stop-opacity=".28"/></radialGradient>`),s+n+"</defs>"}function kf(e){const t=e==="l"?-1:1,n=fn[e][0],s=fn[e][1],o=_s[e][0],i=_s[e][1],a=o-t,r=i-7,l=-t;let c=`<path d="${Ul([n,s],[a,r],18,13,-3*t)}" fill="var(--skin)" ${I(3)}/>`;return c+=`<path class="hand" d="M${$(o-8)} ${$(i-4)} Q${$(o-8)} ${$(i-10)} ${$(o)} ${$(i-10)} Q${$(o+8)} ${$(i-10)} ${$(o+8)} ${$(i-3)} Q${$(o+8.5)} ${$(i+9)} ${$(o)} ${$(i+9.5)} Q${$(o-8.5)} ${$(i+9)} ${$(o-8)} ${$(i-4)} Z" fill="var(--skin)" ${I(2.8)}/>`,c+=`<ellipse cx="${$(o+7*l)}" cy="${$(i-1)}" rx="3.4" ry="5" fill="var(--skin)" ${I(2.4)} transform="rotate(${-20*l} ${$(o+7*l)} ${$(i-1)})"/>`,c+=`<path d="M${$(o-3*l)} ${$(i+3)} v4 M${$(o+.5*l)} ${$(i+3.5)} v4" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`,c+=`<ellipse cx="${$(o-3*l)}" cy="${$(i-5)}" rx="3" ry="1.8" fill="#fff" opacity=".35"/>`,c}function wf(e){const t=e==="l"?-1:1,n=e==="l"?88:112;let s=`<path d="${Ul([n,234],[n+t,294],21,15,1.5*t)}" fill="var(--skin)" ${I(3)}/>`;return s+=`<path d="${Ul([n+5*t,244],[n+5*t,290],6,4)}" ${rt}/>`,s+=`<ellipse cx="${$(n+.5*t)}" cy="268" rx="4.5" ry="2.6" fill="#3a1d3c" opacity=".12"/>`,s+=`<path d="M${n-4} 265 q4 -2.5 8 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`,s}function vf(e,t,n,s,o,i){const a=n?-1:1,r=o==="big"||o==="bright"?1.08:o==="soft"?.94:1,l=(y,u)=>`${$(e+y*r)} ${$(t+u*r)}`,c=13.5*r,f=17*r;let d="";if(i&&o!=="soft"){const y=[.35,.95,1.57,2.2,2.8];for(let u=0;u<y.length;u++){const v=y[u];d+=`<path d="M${$(e+5.5*Math.cos(v)*r)} ${$(t+(4+6.5*Math.sin(v))*r)} L${$(e+11.5*Math.cos(v)*r)} ${$(t+(2+14*Math.sin(v))*r)}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>`}}const g=o==="soft"?2:2.6,h=o==="soft"?"":`<path d="M${l(-16*a,-8)} q${$(-6*a*r)} -2 ${$(-9*a*r)} ${$(-9*r)} M${l(-17*a,-2)} q${$(-6*a*r)} ${$(-.5*r)} ${$(-10*a*r)} ${$(-5*r)} M${l(-12*a,-15)} q${$(-3*a*r)} ${$(-4*r)} ${$(-4*a*r)} ${$(-9*r)}" fill="none" stroke="var(--lash)" stroke-width="2.2" stroke-linecap="round"/>`,m=o==="sparkle"||o==="bright"?`<path d="M${l(-9*a,-8)} l.7 1.6 1.6 .7 -1.6 .7 -.7 1.6 -.7 -1.6 -1.6 -.7 1.6 -.7 Z" fill="#fff" opacity=".9"/>`:"",k=i?`<ellipse cx="${e}" cy="${$(t+r)}" rx="${$(c)}" ry="${$(f)}" fill="url(#${s}i)"/>`:"",_=o==="sleepy"?`<path d="M${l(-17,-4)} Q${e} ${$(t+r)} ${l(17,-4)} L${l(18,-16)} Q${e} ${$(t-20*r)} ${l(-18,-16)} Z" fill="var(--skin)"/>`:"";return`<path d="M${l(-16,-2)} Q${l(-16,-20)} ${l(0,-20)} Q${l(16,-20)} ${l(16,-2)} Q${l(16,19)} ${l(0,19)} Q${l(-16,19)} ${l(-16,-2)} Z" fill="#fff"/><path d="M${l(-15,-4)} Q${e} ${$(t-21*r)} ${l(15,-4)} Q${e} ${$(t-14*r)} ${l(-15,-4)} Z" fill="#3a1d3c" opacity=".12"/><ellipse data-iris="1" cx="${e}" cy="${$(t+r)}" rx="${$(c)}" ry="${$(f)}" fill="var(--eye)"/>${k}${d}<ellipse cx="${e}" cy="${$(t+3*r)}" rx="${$(7*r)}" ry="${$(9*r)}" fill="#1f1020" opacity=".8"/><ellipse cx="${e}" cy="${$(t+r)}" rx="${$(11.3*r)}" ry="${$(14.8*r)}" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/><ellipse cx="${e}" cy="${$(t+r)}" rx="${$(c)}" ry="${$(f)}" fill="none" stroke="#1f1020" stroke-width="2" opacity=".55"/><path d="M${l(-9,12)} Q${e} ${$(t+19.5*r)} ${l(9,12)} Q${e} ${$(t+15.5*r)} ${l(-9,12)} Z" fill="#fff" opacity=".5"/><ellipse cx="${$(e-6*a*r)}" cy="${$(t-6*r)}" rx="${$(5.8*r)}" ry="${$(6.8*r)}" fill="#fff" transform="rotate(${-15*a} ${$(e-6*a*r)} ${$(t-6*r)})"/><circle cx="${$(e+6*a*r)}" cy="${$(t+8*r)}" r="${$(2.8*r)}" fill="#fff"/><circle cx="${$(e-4*a*r)}" cy="${$(t+10*r)}" r="${$(1.3*r)}" fill="#fff" opacity=".85"/><path d="M${l(7*a,-10)} l${$(r)} ${$(2.4*r)} ${$(2.4*r)} ${$(r)} ${$(-2.4*r)} ${$(r)} ${$(-r)} ${$(2.4*r)} ${$(-r)} ${$(-2.4*r)} ${$(-2.4*r)} ${$(-r)} ${$(2.4*r)} ${$(-r)} Z" fill="#fff"/>`+m+_+`<path d="M${l(-17,-1)} Q${l(-16,-21)} ${l(0,-21)} Q${l(16,-21)} ${l(17,-3)} Q${l(14.5,-18.6)} ${l(0,-18.8)} Q${l(-14.5,-18.6)} ${l(-15.5,-1)} Z" fill="var(--lash)" stroke="var(--lash)" stroke-width="${g}" stroke-linejoin="round"/>`+h+`<path d="M${l(-11,-23)} Q${e} ${$(t-27*r)} ${l(11,-23)}" fill="none" stroke="var(--line)" stroke-width="1.3" stroke-linecap="round" opacity=".22"/><path d="M${l(-5,20.5)} Q${e} ${$(t+22*r)} ${l(5,20.5)}" fill="none" stroke="var(--lash)" stroke-width="1.3" stroke-linecap="round" opacity=".28"/>`}function hx(e,t,n,s=!1){const o=e.blush?`<ellipse cx="64" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><ellipse cx="136" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><path d="M60 133 l3 -3 M66 134 l3 -3 M132 133 l3 -3 M138 134 l3 -3" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>`:"";let i="";if(e.freckles){const a=[[58,132],[64,136],[70,131],[130,131],[136,136],[142,132]];for(let r=0;r<a.length;r++)i+=`<circle cx="${a[r][0]}" cy="${a[r][1]}" r="1.5" fill="var(--freckle)" opacity=".7"/>`}return o+i+'<path data-brow="l" d="M64 86 Q74 80 85 84" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/><path data-brow="r" d="M115 84 Q126 80 136 86" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'+vf(76,112,!1,t,s?"sleepy":e.eyes,n)+vf(124,112,!0,t,s?"sleepy":e.eyes,n)+'<path d="M98 131 q2 1.8 4 0" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" opacity=".55"/><ellipse cx="101.5" cy="128.5" rx="1.6" ry="1" fill="#fff" opacity=".6"/><path d="M92 140 Q100 147.5 108 140" fill="none" stroke="var(--line)" stroke-width="2.8" stroke-linecap="round"/><path d="M96 142.6 Q100 145.4 104 142.6 Q100 144 96 142.6 Z" fill="#ff8fa8"/>'}function ux(e){const t="M40 102 Q38 38 100 38 Q162 38 160 102 Q160 140 132 153 Q116 160 100 160 Q84 160 68 153 Q40 140 40 102 Z";return`<ellipse cx="39" cy="114" rx="9" ry="11" fill="var(--skin)" ${I(3)}/><ellipse cx="161" cy="114" rx="9" ry="11" fill="var(--skin)" ${I(3)}/><ellipse cx="40" cy="115" rx="4" ry="6" ${Ol}/><ellipse cx="160" cy="115" rx="4" ry="6" ${Ol}/><path d="${t}" fill="var(--skin)" ${I(3.2)}/><path d="${t}" fill="url(#${e}k)"/>`}function mx(){return`<path d="M91 146 h18 v22 q-9 5 -18 0 Z" fill="var(--skin)" ${I(3)}/><path d="M91 150 h18 v9 q-9 6 -18 0 Z" ${Ol}/><path d="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z" fill="var(--skin)" ${I(3)}/>`}function yx(e,t){const n=Ns(e),s=t?.pose??Wc(n),o=t?.rich!==!1,i=t?.uid??px(),a=cx(s),r=n.shoesC,l=r.toLowerCase()==="#ffffff"?n.dress?n.dressC:n.topC:gf(r,.28),c=n.dress?n.dressC:n.topC,f=Uc(c)>700?"#8fdcc0":oi(c,.18),d=["--line:#5a3d5c",`--skin:${n.skin}`,`--hair:${n.hairC}`,`--hair-shade:${dx(n.hairC)}`,`--brow:${fx(n.hairC)}`,`--eye:${n.eyeC}`,"--lash:#3b2340","--blush:#ff6f91",`--freckle:${oi(n.skin,.35)}`,`--top:${c}`,`--top-trim:${f}`,`--bottom:${n.dress?n.dressC:n.bottomC}`,`--bottom-trim:${oi(n.dress?n.dressC:n.bottomC,.16)}`,`--shoe:${r}`,`--shoe-trim:${l}`,"--sock:#ffffff",`--acc:${n.accC}`,`--acc2:${gf(n.accC,.18)}`,"--frame:#6e4a5e"].join(";"),g=$s("leg","l",wf("l"),s)+$s("leg","r",wf("r"),s),h=$s("arm","l",`<g class="hand">${kf("l")}</g>`,s)+$s("arm","r",`<g class="hand">${kf("r")}</g>`,s),m=`<g data-layer="body">${g}${ws(mx()+h,s)}${Wo(ux(i),s,!0)}</g>`,k=n.dress?ex(s,n,i,o,a):K5(s,n,i,o,a),_=`<g class="shadow"><ellipse cx="100" cy="308" rx="52" ry="9" fill="url(#${i}s)"/><ellipse cx="87" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/><ellipse cx="113" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/></g>`,y=ox(i,n.hair,n.acc),u=y?` mask="url(#${i}hm)"`:"",v=[`<g data-layer="hair-back">${Wo(`<g${u}>${G5(n.hair,i,o)}</g>`,s)}</g>`,m,nx(s,n),ws(X5(s,n,i,o),s),ws(k,s),ws(J5(s,n,i,o),s),`<g data-layer="face">${Wo(hx(n,i,o,t?.poseName==="lie"),s)}</g>`,`<g data-layer="hair-front">${Wo(`<g${u}>${Y5(n.hair,i,o)}</g>`,s)}</g>`,Wo(ix(n),s)],x=t?.poseName==="sit"||t?.poseName==="lie"?t.poseName:null;t?.holding&&v.splice(6,0,ws(Si("under",!0,n.skin,x,c),s));const A=v.join(""),O=n.dress||n.top;return`<svg${t?.poseName?` data-pose="${t.poseName}"`:""} data-chibi="1" data-hair="${n.hair}" data-top="${O}" viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" style="${d}">${gx(i,o,y)}${_}${A}</svg>`}function bx(e,t){const n=Ns(e),s=vr(t)??Wc(n),o=t==="sit"||t==="lie"?t:null,i=n.dress?n.dressC:n.topC;return`<svg viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">${ws(Si("over",!0,n.skin,o,i),s)}</svg>`}function Vc(){try{return typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("selector(&)")}catch{return!1}}function Ti(e,t,n){const s=!!(t&&t.look2);e.classList.toggle("chibi",s);const o=s&&Vc();e.classList.toggle("chibi-move",s&&(o||n)),e.classList.toggle("chibi-bob",s&&!o&&!n)}const tt="#5a3d5c",ye=`stroke="${tt}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,kx=["little","kid","adult"],Os={little:.78,kid:1,adult:1.28},jo={left:{x:15,y:113},right:{x:85,y:113}};function xr(e,t){return e.look2?lx(t??Wc(e.look2)):t?{left:{x:22,y:96},right:{x:78,y:96}}:jo}function lg(e,t){return e===1?`<path d="M62 16 L76 8 L76 26 Z M62 16 L50 6 L48 24 Z" fill="#ff7aa8" stroke="${tt}" stroke-width="3" stroke-linejoin="round"/><circle cx="62" cy="16" r="5" fill="#ffd166" stroke="${tt}" stroke-width="3"/>`:e===2?`<circle cx="40" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${tt}" stroke-width="3"/><circle cx="60" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${tt}" stroke-width="3"/><path d="M49 48 h2" stroke="${tt}" stroke-width="3"/>`:e===3?`<path d="M20 30 Q22 8 50 8 Q78 8 80 30 Z" fill="${t}" stroke="${tt}" stroke-width="3.5" stroke-linejoin="round"/><path d="M60 28 Q84 26 92 32 Q80 36 60 34 Z" fill="${t}" stroke="${tt}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="9" r="4" fill="#fff" stroke="${tt}" stroke-width="3"/>`:""}function Wa(e,t,n){return n?e===1?`<path d="M20 40 Q16 86 30 92 L70 92 Q84 86 80 40 Z" fill="${t}" ${ye}/>`:e===2?`<circle cx="18" cy="34" r="12" fill="${t}" ${ye}/><circle cx="82" cy="34" r="12" fill="${t}" ${ye}/>`:e===3?`<circle cx="50" cy="8" r="13" fill="${t}" ${ye}/>`:"":e===3?`<path d="M22 42 Q20 14 50 12 Q80 14 78 42 Q66 26 50 30 Q34 26 22 42 Z" fill="${t}" ${ye}/>`:`<path d="M21 46 Q18 12 50 12 Q82 12 79 46 Q72 30 58 28 Q50 36 36 30 Q26 34 21 46 Z" fill="${t}" ${ye}/>`}function bt(e,t,n){const s=vr(t);return e.look2?yx(e.look2,{rich:Vc(),pose:s??void 0,poseName:t||void 0,holding:n}):t==="sit"||t==="lie"?wx(e,t,n):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${Wa(e.hairStyle,e.hair,!0)}
  <rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${ye}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${ye}/>
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${tt}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${tt}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${ye} transform="rotate(12 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${ye} transform="rotate(-12 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${ye}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${ye}/>
  <circle cx="50" cy="44" r="30" fill="${e.skin}" ${ye}/>
  ${Wa(e.hairStyle,e.hair,!1)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${tt}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${tt}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${ye} fill="none"/>
  ${lg(e.acc??0,e.shirt)}
  <circle class="hand hang" cx="${jo.left.x}" cy="${jo.left.y}" r="6" fill="${e.skin}" ${ye}/><circle class="hand hang" cx="${jo.right.x}" cy="${jo.right.y}" r="6" fill="${e.skin}" ${ye}/>
  ${n?Si("under",!1,wr(e.skin),null):""}
</svg>`}function cg(e,t){const n=t==="sit"||t==="lie"?t:null;return n==="lie"?"":e.look2?bx(e.look2,t):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${Si("over",!1,wr(e.skin),n)}</svg>`}function wx(e,t,n){const s=t==="sit"?`<rect class="leg" x="34" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${ye} transform="rotate(-68 40 112)"/>
  <rect class="leg" x="53" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${ye} transform="rotate(68 60 112)"/>`:`<rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${ye}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${ye}/>`,o=t==="lie"?`<path d="M34 48 Q40 52 46 48" fill="none" ${ye}/><path d="M54 48 Q60 52 66 48" fill="none" ${ye}/>`:`<ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${tt}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${tt}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>`,i=`<ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${Wa(e.hairStyle,e.hair,!0)}
  ${s}
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${tt}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${tt}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${ye} transform="rotate(28 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${ye} transform="rotate(-28 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${ye}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${ye}/>
  <g class="dollhead">
  <circle class="dollhead" data-dollhead="1" cx="50" cy="44" r="30" fill="${e.skin}" ${ye}/>
  ${Wa(e.hairStyle,e.hair,!1)}
  ${o}
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${ye} fill="none"/>
  ${lg(e.acc??0,e.shirt)}
  </g>
  <circle class="hand hang" cx="22" cy="96" r="6" fill="${e.skin}" ${ye}/><circle class="hand hang" cx="78" cy="96" r="6" fill="${e.skin}" ${ye}/>
  ${n?Si("under",!1,wr(e.skin),t):""}`;return`<svg data-pose="${t}" viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${i}</svg>`}const vx=[{id:"hair",name:"Hair"},{id:"face",name:"Face"},{id:"clothes",name:"Clothes"},{id:"shoes",name:"Shoes"},{id:"extras",name:"Extras"}],_x={short:"Short",pixie:"Pixie",coily:"Coily",afro:"Afro",bangs:"Bangs",bob:"Bob",wavybob:"Wavy bob",curlybob:"Curly bob",sidebangs:"Side bangs",long:"Long",wavy:"Wavy",braids:"Braids",boxbraids:"Box braids",locs:"Locs",sidebraid:"Side braid",crown:"Crown",pony:"Ponytail",sidepony:"Side pony",pigtails:"Pigtails",halfup:"Half-up",buns:"Buns",puffs:"Puffs",topbun:"Top bun",lowbun:"Low bun"},$x={classic:"Tee",stripes:"Stripes",hoodie:"Hoodie",sweater:"Sweater",tank:"Tank",puff:"Puff",ruffle:"Ruffle",button:"Buttons",jersey:"Jersey",cardigan:"Cardigan",bib:"Bib",raincoat:"Raincoat"},xx={pants:"Pants",jeans:"Jeans",shorts:"Shorts",skirt:"Skirt",tutu:"Tutu",leggings:"Leggings",overalls:"Overalls",joggers:"Joggers"},Mx={"":"No dress",twirl:"Twirl",sundress:"Sundress",party:"Party",pinafore:"Pinafore",jumper:"Jumper",ballet:"Ballet",nightgown:"Nightgown",raindress:"Rain"},Lx={classic:"Classic",sneakers:"Sneakers",lightup:"Light-up",boots:"Boots",rainboots:"Rain boots",sandals:"Sandals",maryjanes:"Mary Janes",slippers:"Slippers"},Ex={round:"Round",big:"Big",sleepy:"Sleepy",sparkle:"Sparkle",soft:"Soft",bright:"Bright"},Cx={glasses:"Glasses",square:"Square",sunnies:"Sunnies",bow:"Bow",bigbow:"Big bow",headband:"Headband",flower:"Flower",cap:"Cap",beanie:"Beanie",sunhat:"Sun hat",catears:"Cat ears",earmuffs:"Earmuffs"},Sx={little:"Little",kid:"Kid",adult:"Grown-up"};let so="hair";function wn(e,t,n,s){return`<button type="button" class="avOpt${s?" on":""}" data-act="${e}" data-v="${t}">${n}</button>`}function fa(e,t,n){return`<button type="button" class="avSw${n?" on":""}" style="background:${t}" data-act="${e}" data-v="${t}" aria-label="Color"></button>`}function ms(e){return`<div class="avGrid">${e}</div>`}function Uo(e,t){return`<div class="avColors">${Pt.map(n=>fa(e,n,n===t)).join("")}</div>`}function Px(e,t,n,s){const o=Ns(e.look2),i=e.id==="__me",a=so==="hair"?`<h3>Style</h3>${ms(ar.map(c=>wn("av-hair",c,_x[c],o.hair===c)).join(""))}<h3>Color</h3><div class="avColors">${ir.map(c=>fa("av-hairC",c,o.hairC===c)).join("")}</div>`:so==="face"?`<h3>Skin</h3><div class="avColors">${or.map(c=>fa("av-skin",c,o.skin===c)).join("")}</div><h3>Eyes</h3>${ms(fr.map(c=>wn("av-eyes",c,Ex[c],o.eyes===c)).join(""))}<h3>Eye color</h3><div class="avColors">${hc.map(c=>fa("av-eyeC",c,o.eyeC===c)).join("")}</div><div class="avToggles">${wn("av-freckles",o.freckles?"0":"1","Freckles",o.freckles)}${wn("av-blush",o.blush?"0":"1","Blush",o.blush)}</div>`:so==="clothes"?`<h3>Top</h3>${ms(rr.map(c=>wn("av-top",c,$x[c],!o.dress&&o.top===c)).join(""))}${Uo("av-topC",o.topC)}<h3>Bottom</h3>${ms(lr.map(c=>wn("av-bottom",c,xx[c],!o.dress&&o.bottom===c)).join(""))}${Uo("av-bottomC",o.bottomC)}<h3>Dress</h3>${ms(cr.map(c=>wn("av-dress",c,Mx[c],o.dress===c)).join(""))}${Uo("av-dressC",o.dressC)}`:so==="shoes"?`<h3>Shoes</h3>${ms(dr.map(c=>wn("av-shoes",c,Lx[c],o.shoes===c)).join(""))}${Uo("av-shoesC",o.shoesC)}`:`<h3>Extras</h3><p class="avHint">Pick up to two</p>${ms(co.map(c=>wn("av-acc",c,Cx[c],o.acc.indexOf(c)>=0)).join(""))}${Uo("av-accC",o.accC)}`,r=kx.map(c=>`<button type="button" class="avOpt sz${c===e.size?" on":""}" data-act="size" data-v="${c}">${Sx[c]}</button>`).join(""),l=i?'<div class="meNote">This is you!</div>':`<button type="button" class="del${n?" sure":""}" data-act="delc">${s}<span>${n?"Tap again":""}</span></button>`;return`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${t}<div class="dress avLook"><div class="avStageWrap"><div class="avStage chibi-move">${bt(e)}</div>${l}<div class="avSizes">${r}</div></div><div class="avSide"><div class="avTabs">${vx.map(c=>`<button type="button" class="avTab${c.id===so?" on":""}" data-act="av-tab" data-v="${c.id}">${c.name}</button>`).join("")}</div><div class="avPane">${a}</div><div class="avBar"><button type="button" class="avSurprise" data-act="av-surprise">🎲 Surprise me</button><button type="button" class="avDone" data-act="close">Done</button></div></div></div>`}function Tx(e,t,n){if(t==="av-tab")return(n==="hair"||n==="face"||n==="clothes"||n==="shoes"||n==="extras")&&(so=n),null;const s=Ns(e);if(t==="av-hair"&&ar.indexOf(n)>=0)return{...s,hair:n};if(t==="av-hairC")return{...s,hairC:n};if(t==="av-skin")return{...s,skin:n};if(t==="av-eyes"&&fr.indexOf(n)>=0)return{...s,eyes:n};if(t==="av-eyeC")return{...s,eyeC:n};if(t==="av-freckles")return{...s,freckles:n==="1"};if(t==="av-blush")return{...s,blush:n==="1"};if(t==="av-top"&&rr.indexOf(n)>=0)return{...s,top:n,dress:""};if(t==="av-topC")return{...s,topC:n};if(t==="av-bottom"&&lr.indexOf(n)>=0)return{...s,bottom:n,dress:""};if(t==="av-bottomC")return{...s,bottomC:n};if(t==="av-dress"&&cr.indexOf(n)>=0)return{...s,dress:n};if(t==="av-dressC")return{...s,dressC:n};if(t==="av-shoes"&&dr.indexOf(n)>=0)return{...s,shoes:n};if(t==="av-shoesC")return{...s,shoesC:n};if(t==="av-accC")return{...s,accC:n};if(t==="av-acc"&&co.indexOf(n)>=0){const o=n,i=s.acc.slice(),a=i.indexOf(o);if(a>=0)i.splice(a,1);else{const r=Ma(o),l=i.filter(c=>Ma(c)!==r);return l.push(o),{...s,acc:l.slice(0,2)}}return{...s,acc:i}}return null}function Bx(){try{return typeof navigator<"u"&&navigator.webdriver&&!window.__forceAvatarIntro?!1:localStorage.getItem(Nt("avatar-intro"))!=="1"}catch{return!1}}function Rx(){try{localStorage.setItem(Nt("avatar-intro"),"1")}catch{}}const pa="#5a3d5c";function sl(e,t,n,s,o){return`<path class="${e}" d="${t}" fill="none" stroke="${pa}" stroke-width="${s}" stroke-linecap="round"/><path class="${e} cloth" d="${t}" fill="none" stroke="${n}" stroke-width="${o}" stroke-linecap="round"/>`}function Ax(e){const t=Ns(e),n=t.skin,s=t.dress!=="",o=s||t.bottom==="skirt"||t.bottom==="tutu",i=o?n:t.bottomC,a=t.shoesC,r=s||t.bottom==="skirt"||t.bottom==="tutu";let l="";if(r){const g=s?t.dressC:t.bottomC;l+=`<path class="dress" d="M75 46 L89 46 L91 53 L73 53 Z" fill="${g}" stroke="${pa}" stroke-width="1.1" stroke-linejoin="round"/>`}l+=sl("thigh","M76 44 Q83 48 88 54",i,6.2,4.8),l+=`<circle class="knee" cx="88" cy="56" r="2.3" fill="${i}" stroke="${pa}" stroke-width="1.1"/>`;const c=t.shoes==="boots"||t.shoes==="rainboots";l+=sl("shin",c?"M88 58 Q90 64 91 68":"M88 58 Q90 65 91 70",o?n:i,5.8,4.4),!c&&(t.shoes==="sneakers"||t.shoes==="maryjanes"||t.shoes==="lightup")&&(l+=sl("shin","M90 66 Q90.6 68 91 70","#ffffff",5.4,4));const f=t.shoes==="sandals"?n:a,d=c?66:69;return l+=`<path class="shoe" d="M90 ${d} Q90 ${d-2} 94 ${d-2} Q99 ${d-2} 100 ${d+1} Q100 ${d+5} 95 ${d+5} Q90 ${d+5} 90 ${d+2} Z" fill="${f}" stroke="${pa}" stroke-width="1.1" stroke-linejoin="round"/>`,t.shoes==="sandals"&&(l+=`<path d="M90 ${d+5} L100 ${d+5}" stroke="${a}" stroke-width="1.3" stroke-linecap="round"/>`,l+=`<path d="M93 ${d} L97 ${d+3}" stroke="${a}" stroke-width="1.1" stroke-linecap="round"/>`),`<svg class="rideleg" viewBox="0 0 160 130">${l}</svg>`}let Ve=null,Kt=null,go=null,Vo=null,rn=0,ga=0;const ol=[261.63,293.66,329.63,392,440,523.25,587.33,659.25,783.99,880],ql=[[4,-1,5,4,2,-1,3,-1],[2,3,4,-1,3,2,0,-1],[5,-1,7,6,5,-1,4,-1],[3,2,1,-1,2,-1,0,-1]],_f=[130.81,98,110,98];function dg(){try{return Ve??=new(window.AudioContext||window.webkitAudioContext),Kt||(Kt=Ve.createGain(),Kt.gain.value=.5,Kt.connect(Ve.destination)),Ve.state==="suspended"&&Ve.resume().catch(()=>{}),!0}catch{return!1}}function Gi(e,t,n,s,o){if(!Ve||!Kt)return;const i=Ve.createOscillator(),a=Ve.createGain();i.type=s,i.frequency.setValueAtTime(e,t),a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(o,t+.03),a.gain.exponentialRampToValueAtTime(5e-4,t+n),i.connect(a).connect(Kt),i.start(t),i.stop(t+n+.05)}function Dx(){if(!Ve||!go)return;if(!Pc||document.hidden){rn=Ve.currentTime+.1;return}const e=Yt/2e3*(go==="musicbox"?1.35:1);for(rn<Ve.currentTime&&(rn=Ve.currentTime+.05);rn<Ve.currentTime+.4;){const t=Math.floor(ga/8)%ql.length,n=ga%8,s=ql[t][n];go==="musicbox"?s>=0&&Gi(ol[Math.min(ol.length-1,s+3)]*2,rn,.9,"sine",.05):(s>=0&&Gi(ol[s],rn,.5,"triangle",.045),n===0&&Gi(_f[t],rn,1.6,"sine",.06),n===4&&Gi(_f[t]*1.5,rn,1,"sine",.035)),ga++,rn+=e}}function $f(e){if(e!==go){if(go=e,!go){if(Vo&&(clearInterval(Vo),Vo=null),Kt&&Ve){const t=Kt.gain;t.cancelScheduledValues(Ve.currentTime),t.setValueAtTime(t.value,Ve.currentTime),t.linearRampToValueAtTime(1e-4,Ve.currentTime+.4)}return}!dg()||!Ve||!Kt||(Kt.gain.cancelScheduledValues(Ve.currentTime),Kt.gain.setValueAtTime(.5,Ve.currentTime+.42),ga=Math.floor(Date.now()/(Yt/2))%(ql.length*8),rn=Ve.currentTime+.45,Vo||(Vo=setInterval(Dx,120)))}}function Ix(){dg()}const Hx=/rug|lamp|light|plant|curtain|clock|window|lantern/;function Ox(e){if(e.cat==="plants")return!0;const t=`${e.name} ${e.kind??""}`.toLowerCase();return Hx.test(t)}const fg=new Set(["pack:ring-light","pack:desk-lamp",...nm]);function pg(e){const t=e.rooms??[];return t.includes("backyard")&&!t.includes("any")}function Wx(e,t){if(t==="nursery"&&e.kind&&fg.has(e.kind))return!1;if(t==="backyard")return pg(e);if(t==="all"||!t)return!0;const n=e.rooms;return!n||n.length===0||n.includes(t)?!0:n.includes("any")?e.cat==="decor"||e.cat==="furniture"?Ox(e):!0:!1}function Ux(e,t,n,s,o){return e.secret&&!(o&&o.has(e.secret))||!s&&n==="backyard"&&!pg(e)||n==="nursery"&&e.kind&&fg.has(e.kind)?!1:t.startsWith("pack:")?e.pack===t.slice(5):e.cat!==t?!1:Wx(e,s?"all":n)}function Vx(e){const t=e.scale;let n=0;e.overflowR>1&&e.overflowL>1?n=-e.overflowL:e.overflowR>1?n=e.overflowR:e.overflowL>1&&(n=-e.overflowL);const s=e.cam+n/t,o=Math.max(0,Math.min(e.maxCam,s)),i=s-o,a=e.nudgeX&&Math.abs(i)>.5?e.kidX-i:e.kidX;return{cam:o,kidX:a}}function zx(e){const t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[1][0]).toUpperCase():"?"}function Qx(e,t=3){const n=[...e].sort((r,l)=>r.x-l.x||r.id.localeCompare(l.id)),s=[],o=[],i=(r,l,c)=>s.some(f=>f.lane===c&&Math.abs(f.x-r)<(f.w+l)/2+8),a=[];for(const r of n){let l=-1;for(let c=0;c<t;c++)if(!i(r.x,r.w,c)){l=c;break}l<0?a.push(r):(s.push({x:r.x,w:r.w,lane:l}),o.push({id:r.id,lane:l,initials:!1}))}for(const r of a){const l=Math.min(r.w,44);let c=0;for(let f=0;f<t;f++)if(!i(r.x,l,f)){c=f;break}s.push({x:r.x,w:l,lane:c}),o.push({id:r.id,lane:c,initials:!0})}return o}let qx=0;function gg(e=document){const t=[...e.querySelectorAll(".nametag")].filter(o=>{const i=o.getBoundingClientRect();return i.width>2&&i.height>2});if(!t.length)return;const n=t.map(o=>{o.dataset.tagId||(o.dataset.tagId="tg"+(++qx).toString(36)),o.dataset.full||(o.dataset.full=(o.textContent||"").trim()),o.classList.contains("is-initials")||(o.dataset.fullW=String(o.getBoundingClientRect().width));const i=o.getBoundingClientRect(),a=Number(o.dataset.fullW)||i.width;return{id:o.dataset.tagId,x:i.left+i.width/2,w:a}}),s=new Map(Qx(n).map(o=>[o.id,o]));for(const o of t){const i=s.get(o.dataset.tagId||"");if(!i)continue;const a=o.dataset.full||"",r=i.initials?zx(a):a;o.textContent!==r&&(o.textContent=r),o.classList.toggle("is-initials",i.initials),o.style.setProperty("--tag-lane",String(i.lane))}}function Eo(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function Zx(e){!e||Eo()||(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),window.setTimeout(()=>e.classList.remove("wiggle"),480))}const Nx=".round, .thing";function Fx(){let e=null;const t=()=>{e?.classList.remove("pressing"),e=null};document.addEventListener("pointerdown",n=>{t();const s=n.target?.closest?.(Nx);s&&(s.classList.add("pressing"),e=s)},{capture:!0,passive:!0});for(const n of["pointerup","pointercancel","dragstart","blur"])window.addEventListener(n,t,{capture:!0,passive:!0});document.addEventListener("pointerup",n=>{if(Eo())return;const s=n.target?.closest("button");s&&(s.classList.remove("spring"),s.offsetWidth,s.classList.add("spring"))},!0)}const hg="#5a3d5c",vt=`stroke="${hg}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,jx={living:"#ff8fab",bedroom:"#c9a0dc",kitchen:"#8fd6a6",salon:"#f0a0d8",nursery:"#9ad7f5",bathroom:"#7ec8d6",backyard:"#80ed99"};function Gx(e){const t=jx[e]??"#ffb3c6";return`<div class="sceneWin builtin-window" aria-hidden="true"><svg viewBox="0 0 160 180">
    <path d="M18 20 H142 V150 H18 Z" fill="#fff6ea" ${vt}/>
    <path d="M28 30 H132 V118 H28 Z" fill="#b9e3ff" ${vt}/>
    <path d="M80 30 V118 M28 74 H132" ${vt} stroke-width="3"/>
    <circle cx="48" cy="52" r="10" fill="#fff" opacity=".85"/>
    <ellipse cx="108" cy="48" rx="16" ry="8" fill="#fff" opacity=".8"/>
    <path d="M40 118 Q58 96 70 118 Q90 100 112 118" fill="#7dce8a" stroke="${hg}" stroke-width="3"/>
    <rect x="96" y="86" width="8" height="32" rx="3" fill="#6b4a32" ${vt} stroke-width="2"/>
    <circle cx="100" cy="80" r="12" fill="#5cc985" ${vt} stroke-width="2"/>
    <path d="M8 16 Q6 80 16 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <path d="M152 16 Q154 80 144 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <rect x="46" y="146" width="68" height="12" rx="4" fill="#ffe7c2" ${vt}/>
  </svg></div>`}function Yx(){return`<div class="sceneRug" aria-hidden="true"><svg viewBox="0 0 200 80">
    <ellipse cx="100" cy="48" rx="92" ry="24" fill="#ffc8dd" ${vt}/>
    <ellipse cx="100" cy="48" rx="64" ry="15" fill="#bde0fe" ${vt} stroke-width="3"/>
    <ellipse cx="100" cy="48" rx="28" ry="7" fill="#fff6ea"/>
  </svg></div>
  <div class="sceneLamp" aria-hidden="true"><svg viewBox="0 0 80 160">
    <path d="M18 52 L30 8 H50 L62 52 Z" fill="#ffd166" ${vt}/>
    <rect x="36" y="52" width="8" height="78" rx="4" fill="#c9a0dc" ${vt}/>
    <ellipse cx="40" cy="136" rx="26" ry="8" fill="#b388d6" ${vt}/>
    <circle cx="34" cy="28" r="4" fill="#fff" opacity=".8"/>
  </svg></div>
  <div class="scenePlant" aria-hidden="true"><svg viewBox="0 0 90 140">
    <path d="M45 128 C45 90 18 78 20 48 C40 58 44 80 45 128" fill="#5cc985" ${vt}/>
    <path d="M45 128 C45 92 74 70 78 40 C58 54 50 82 45 128" fill="#80ed99" ${vt}/>
    <path d="M45 128 C40 96 28 88 22 70" fill="none" stroke="#3d9a62" stroke-width="3"/>
    <path d="M30 132 H62 L56 118 H36 Z" fill="#e07a5f" ${vt}/>
    <ellipse cx="46" cy="126" rx="16" ry="5" fill="#c4634a"/>
  </svg></div>`}function Kx(e,t){return t==="backyard"?[]:[{id:e("rug"),kind:"rug",x:1152,y:540,flip:!1,z:0,scale:1},{id:e("lamp"),kind:"lamp",x:804,y:470,flip:!1,z:0,scale:1},{id:e("plant"),kind:"plant",x:1584,y:480,flip:!1,z:0,scale:1}]}let bs="",ug=null;function Xx(e){ug=e,bs=""}function Jx(e,t,n){const s=ug?.(t,n);if(s!=null){const r="custom|"+t;if(r===bs&&e.childElementCount)return;bs=r,e.innerHTML=s,e.dataset.room=t;return}if(t==="backyard"){const r="yard|"+t;if(r===bs&&e.childElementCount)return;bs=r,e.innerHTML="",e.dataset.room=t;return}const o=n.length===0,i=n.some(r=>/window|curtain/i.test(r.kind)),a=t+(o?"|e":"")+(i?"|w":"");a===bs&&e.childElementCount||(bs=a,e.innerHTML=(i?"":Gx(t))+(o?Yx():""),e.dataset.room=t)}const De="#5a3d5c",E=(e=4)=>`stroke="${De}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Bi=600,tn=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],dn=(e,t,n=3)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${De}"/><circle cx="${e+1}" cy="${t-1}" r="${n/3}" fill="#fff"/>`,Ms=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="5" ry="3" fill="#ff9bb5" opacity=".75"/>`,e7=(e,t,n,s)=>tn.map((o,i)=>`<path d="M${e-n+i*s} ${t} A${n-i*s} ${n-i*s} 0 0 1 ${e+n-i*s} ${t}" fill="none" stroke="${o}" stroke-width="${s}"/>`).join(""),t7=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${E()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${E()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${E()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${E()}/></g>`,Ln=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-46" y="-50" width="92" height="50" rx="14" fill="#f5d27a" ${E()}/>
  <path d="M-30 -42 V-8 M0 -44 V-6 M30 -42 V-8" stroke="#d9a93f" stroke-width="4" stroke-linecap="round"/><path d="M-46 -26 H46" stroke="#c98a2e" stroke-width="5"/></g>`,n7=(e,t,n)=>{const s=Array.from({length:Math.floor((t-e)/70)+1},(o,i)=>`<rect x="${e+i*70-7}" y="${n-58}" width="14" height="64" rx="5" fill="#fff6e6" ${E(3)}/>`).join("");return`<rect x="${e}" y="${n-46}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${E(3)}/><rect x="${e}" y="${n-22}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${E(3)}/>${s}`};function s7(){const e=Mi;return`<svg class="parkScene ranchScene" viewBox="0 0 ${e} ${Bi}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="rcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7e8ff"/><stop offset="1" stop-color="#fff4fb"/></linearGradient></defs>
  <rect width="${e}" height="440" fill="url(#rcSky)"/>
  <g opacity=".55">${e7(1900,430,620,26)}</g>
  ${[160,820,1500,2300,3e3].map((t,n)=>`<g transform="translate(${t} ${70+n%2*34})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <g transform="translate(${e-200} 92)"><circle r="48" fill="#ffe066" ${E()}/>${dn(-15,-6,4)}${dn(13,-6,4)}<path d="M-14 12 Q0 24 14 12" fill="none" ${E(3)}/>${Ms(-26,8)}${Ms(26,8)}</g>
  <path d="M-50 370 Q600 230 1300 350 T2600 330 T${e+100} 360 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#a6e3a0"/><path d="M0 410 H${e}" ${E()}/>
  <path d="M0 566 Q900 530 1800 570 T${e} 552 V600 H0 Z" fill="#f2dcb8" opacity=".9"/>
  ${t7(3560,400,.8,"#4fbf7a")}
  <!-- entrance gate with a rainbow arch -->
  <g class="ranchSign"><g class="ranchSignArt"><rect x="40" y="290" width="24" height="210" rx="6" fill="#c99366" ${E()}/><rect x="196" y="290" width="24" height="210" rx="6" fill="#c99366" ${E()}/>
    <path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${De}" stroke-width="44" stroke-linecap="round"/>
    ${tn.map((t,n)=>`<path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${t}" stroke-width="${36-n*6}" stroke-linecap="round"/>`).join("")}
    <rect x="22" y="250" width="216" height="40" rx="14" fill="#fff6e6" ${E(3)}/><text x="130" y="277" text-anchor="middle" font-size="19" font-weight="900" fill="${De}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  <!-- red barn with rainbow trim and banner -->
  <g transform="translate(270 0)">
    <path d="M0 470 V250 L60 180 H270 L330 250 V470 Z" fill="#ef5b5b" ${E(5)}/>
    <path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${De}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    ${tn.map((t,n)=>`<path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${t}" stroke-width="3" transform="translate(0 ${-7+n*2.8})" stroke-linejoin="round"/>`).join("")}
    <rect x="115" y="215" width="100" height="56" rx="10" fill="#fff6e6" ${E(4)}/><path d="M115 215 L215 271 M215 215 L115 271" stroke="#ef5b5b" stroke-width="6"/>
    <rect x="95" y="330" width="140" height="140" rx="8" fill="#fff6e6" ${E(4)}/><rect x="108" y="342" width="56" height="128" fill="#d94848" ${E(3)}/><rect x="166" y="342" width="56" height="128" fill="#d94848" ${E(3)}/>
    <path d="M108 342 L164 470 M164 342 L108 470 M166 342 L222 470 M222 342 L166 470" stroke="#fff6e6" stroke-width="6"/>
    <g class="barnBanner" transform="translate(165 300)"><g class="ranchSignArt">${tn.map((t,n)=>`<rect x="${-120+n*40}" y="-16" width="40" height="30" fill="${t}"/>`).join("")}<rect x="-120" y="-16" width="240" height="30" fill="none" ${E(3)}/>
      <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${De}" stroke-width="4" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  </g>
  ${Ln(640,560,.8)}${Ln(1950,470,.7)}${Ln(1880,470,.55)}${Ln(3115,470,.7)}${Ln(3115,425,.55)}
  <!-- the petting zoo moved into the barn: a sign by the barn door, sunflowers where the pen was -->
  ${Array.from({length:6},(t,n)=>{const s=1030+n*66,o=70+n%3*18;return`<g transform="translate(${s} 470)"><path d="M0 0 V-${o}" stroke="#40c057" stroke-width="6" stroke-linecap="round"/><ellipse cx="${n%2?9:-9}" cy="-${o/2}" rx="11" ry="5" fill="#69db7c" ${E(2.5)}/>${[0,45,90,135,180,225,270,315].map(i=>`<ellipse cx="${Math.cos(i*Math.PI/180)*14}" cy="${-o+Math.sin(i*Math.PI/180)*14}" rx="8" ry="5" transform="rotate(${i} ${Math.cos(i*Math.PI/180)*14} ${-o+Math.sin(i*Math.PI/180)*14})" fill="#ffd43b" ${E(2)}/>`).join("")}<circle cy="-${o}" r="10" fill="#a0522d" ${E(2.5)}/></g>`}).join("")}
  <!-- pond -->
  <ellipse cx="${ht.x}" cy="${ht.y}" rx="${ht.rx}" ry="${ht.ry}" fill="#8ecae6" ${E()}/><ellipse cx="${ht.x-15}" cy="${ht.y-6}" rx="70" ry="16" fill="#bde6f7"/>
  <!-- paddock fence + HORSES sign are their own depth layer (paddockFenceSVG) -->
  <!-- garden -->
  <rect x="3140" y="520" width="420" height="70" rx="20" fill="#b07d54" ${E()}/>
  <rect x="3260" y="430" width="160" height="40" rx="12" fill="#fff6e6" ${E(3)}/><text x="3340" y="458" text-anchor="middle" font-size="21" font-weight="900" fill="${De}" font-family="Nunito, system-ui, sans-serif">GARDEN</text>
  <path d="M3340 470 V500" ${E(5)}/>
  </svg>`}function o7(){return`<svg class="fenceLayer" viewBox="0 0 ${Mi} ${Bi}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  ${n7(2400,3080,470)}
  <rect x="2640" y="380" width="180" height="40" rx="12" fill="#fff6e6" ${E(3)}/><text x="2730" y="408" text-anchor="middle" font-size="21" font-weight="900" fill="${De}" font-family="Nunito, system-ui, sans-serif">HORSES</text>
  </svg>`}const mg=[{name:"Goat",say:"Meh-eh-eh!",snd:"bleat"},{name:"Sheep",say:"Baa!",snd:"baa"},{name:"Piglet",say:"Oink oink!",snd:"oink"},{name:"Chicks",say:"Peep peep!",snd:"peep"},{name:"Bunny",say:"*wiggle wiggle*",snd:"squeak"},{name:"Cow",say:"Moooo!",snd:"moo"}],Yi=(e,t,n,s=94)=>e.map((o,i)=>`<rect class="leg ${i%2?"b":"a"}" x="${o}" y="${t}" width="9" height="${s-t}" rx="4" fill="${n}" ${E(3)}/>`).join("");function Zl(e){switch(e){case 0:return`<svg viewBox="0 0 120 100">${Yi([32,44,70,82],60,"#efe6dc")}<path class="tail" d="M24 50 l-8 -10" ${E(5)}/>
      <ellipse cx="58" cy="56" rx="34" ry="17" fill="#f4ede5" ${E()}/><g class="head"><path d="M86 30 l-6 -16 l10 10 Z M96 30 l2 -17 l5 13 Z" fill="#c9b8a8" ${E(3)}/>
      <ellipse cx="94" cy="40" rx="14" ry="16" fill="#f4ede5" ${E()}/><ellipse class="ear" cx="80" cy="36" rx="9" ry="4" fill="#e8d6c4" ${E(3)}/>${dn(98,36)}<path d="M98 56 q2 8 6 0" fill="#e8d6c4" ${E(3)}/>${Ms(102,46)}<circle cx="106" cy="44" r="2" fill="${De}"/></g></svg>`;case 1:return`<svg viewBox="0 0 120 100">${Yi([36,48,70,80],62,"#5a4a5c")}
      ${[[40,50],[56,44],[72,48],[86,56],[70,64],[48,64],[34,60]].map(([t,n])=>`<circle cx="${t}" cy="${n}" r="15" fill="#fff" ${E(3)}/>`).join("")}<ellipse cx="60" cy="55" rx="30" ry="14" fill="#fff"/>
      <g class="head"><ellipse cx="96" cy="46" rx="13" ry="15" fill="#6b5a6e" ${E()}/><circle cx="92" cy="32" r="8" fill="#fff" ${E(3)}/><ellipse class="ear" cx="82" cy="44" rx="8" ry="4" fill="#6b5a6e" ${E(3)}/>
      <circle cx="99" cy="42" r="3.2" fill="#fff"/><circle cx="99.5" cy="42" r="1.8" fill="${De}"/>${Ms(102,52)}</g></svg>`;case 2:return`<svg viewBox="0 0 120 100">${Yi([38,50,66,78],66,"#ffadc6")}<path class="tail" d="M28 54 q-10 -4 -6 -12 q6 0 2 8" fill="none" ${E(3)}/>
      <ellipse cx="58" cy="60" rx="32" ry="20" fill="#ffc2d4" ${E()}/><g class="head"><circle cx="90" cy="52" r="16" fill="#ffc2d4" ${E()}/><path d="M80 38 l2 -12 l9 8 Z" fill="#ffadc6" ${E(3)}/>
      <ellipse cx="104" cy="56" rx="7" ry="8" fill="#ff9bb8" ${E(3)}/><circle cx="102" cy="54" r="1.6" fill="${De}"/><circle cx="106" cy="57" r="1.6" fill="${De}"/>${dn(92,46)}${Ms(90,60)}</g></svg>`;case 3:return`<svg viewBox="0 0 120 100">${[[30,72,1],[62,66,1.15],[92,74,.95]].map(([t,n,s])=>`<g transform="translate(${t} ${n}) scale(${s})"><path d="M-4 16 v8 M4 16 v8" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="4" r="14" fill="#ffe066" ${E(3)}/><path d="M-8 2 q-6 4 0 8" fill="#ffd43b" ${E(2)}/><g class="head"><circle cx="5" cy="-8" r="9" fill="#ffe066" ${E(3)}/><path d="M13 -9 l7 2 l-7 3 Z" fill="#ff9f43" ${E(2)}/>${dn(7,-10,2.2)}</g></g>`).join("")}</svg>`;case 4:return`<svg viewBox="0 0 120 100"><circle class="tail" cx="30" cy="68" r="8" fill="#fff" ${E(3)}/><ellipse cx="56" cy="72" rx="28" ry="20" fill="#f6eef9" ${E()}/><ellipse cx="74" cy="90" rx="12" ry="5" fill="#f6eef9" ${E(3)}/>
      <g class="head"><ellipse class="ear" cx="78" cy="26" rx="7" ry="20" fill="#f6eef9" ${E(3)} transform="rotate(-12 78 26)"/><ellipse cx="78" cy="26" rx="3" ry="13" fill="#ffc2d4" transform="rotate(-12 78 26)"/>
      <ellipse cx="90" cy="28" rx="7" ry="20" fill="#f6eef9" ${E(3)} transform="rotate(10 90 28)"/><circle cx="86" cy="56" r="17" fill="#f6eef9" ${E()}/>${dn(92,52)}<circle cx="102" cy="58" r="2.5" fill="#ff8fab"/>${Ms(90,63)}</g></svg>`;default:return`<svg viewBox="0 0 120 100">${Yi([30,42,72,84],62,"#fff")}<path class="tail" d="M20 50 q-6 14 0 26" fill="none" ${E(3)}/>
      <rect x="18" y="38" width="80" height="34" rx="16" fill="#fff" ${E()}/><path d="M30 40 q10 8 4 20 q-10 -2 -10 -14 Z M60 42 q14 2 10 18 q-12 4 -14 -8 Z" fill="${De}"/><ellipse cx="60" cy="74" rx="8" ry="5" fill="#ffadc6" ${E(2)}/>
      <g class="head"><path d="M90 24 l-8 -8 M108 24 l8 -8" stroke="#f5d27a" stroke-width="5" stroke-linecap="round"/><rect x="86" y="22" width="26" height="30" rx="12" fill="#fff" ${E()}/>
      <ellipse cx="100" cy="52" rx="14" ry="10" fill="#ffc2d4" ${E(3)}/><circle cx="95" cy="52" r="1.8" fill="${De}"/><circle cx="105" cy="52" r="1.8" fill="${De}"/>${dn(94,34)}${dn(106,34)}
      <ellipse class="ear" cx="82" cy="30" rx="7" ry="4" fill="#fff" ${E(3)}/></g></svg>`}}const ht={x:2265,y:520,rx:110,ry:34},i7=476,Ua=[{name:"Chestnut",body:"#c97b45",mane:"#7a3f22",sock:"#fff6e6"},{name:"Snowy",body:"#fdf8f3",mane:"#d9cdc4",sock:"#e9ddd2"},{name:"Midnight",body:"#4a3f52",mane:"#2a2230",sock:"#6b5e74"},{name:"Sunny",body:"#f2c96b",mane:"#fff6e0",sock:"#fff6e0"},{name:"Rainbow Pony",body:"#fff0fa",mane:"rainbow",sock:"#ffd6ec"}];function zc(e,t=!1){const n=Ua[e]??Ua[0],s=n.mane==="rainbow",o=s?tn.map((r,l)=>{const c=124-l*1.6,f=14+l*2.4;return`<path d="M${c.toFixed(1)} ${f.toFixed(1)} q-6.5 2 -4.5 ${6+l*.35}" fill="none" stroke="${r}" stroke-width="5.5" stroke-linecap="round"/>`}).join(""):`<path d="M106 20 q-14 6 -18 30 q8 -6 10 -2 q4 -12 14 -18 Z" fill="${n.mane}" ${E(3)}/>`,i=s?`<g class="tail">${tn.map((r,l)=>`<path d="M30 58 q-18 ${8+l*3} -14 ${36+l}" fill="none" stroke="${r}" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`:`<path class="tail" d="M30 56 q-20 10 -14 44 q10 -10 8 -20 q6 -10 10 -18 Z" fill="${n.mane}" ${E(3)}/>`,a=(r,l)=>`<g class="leg ${l}"><rect x="${r}" y="78" width="12" height="44" rx="5" fill="${n.body}" ${E(3)}/><rect x="${r}" y="110" width="12" height="12" rx="4" fill="${n.sock}" ${E(3)}/></g>`;return`<svg viewBox="0 0 160 130" class="horsesvg">${i}${a(40,"a")}${a(56,"b")}${a(96,"b")}${a(112,"a")}
    <ellipse cx="80" cy="68" rx="50" ry="24" fill="${n.body}" ${E()}/>
    ${t||s?`<path class="saddle" data-top="43" d="M64 46 q16 -6 32 0 l-2 22 q-14 4 -28 0 Z" fill="${s?"#b197fc":"#e8590c"}" ${E(3)}/>`:""}
    <g class="head"><path d="M108 66 L114 30 Q118 16 132 18 L148 36 Q152 46 142 48 L130 46 L128 70 Z" fill="${n.body}" ${E()}/>
    <path d="M114 22 l2 -14 l8 12 Z" fill="${n.body}" ${E(3)}/>${o}
    ${dn(130,30,3.4)}<circle cx="146" cy="42" r="2" fill="${De}"/>${Ms(136,40)}
    ${s?`<path d="M120 14 l4 -14 l4 14 Z" fill="#ffd43b" ${E(2)}/>`:""}</g>
    ${s?'<g fill="#fff" opacity=".9"><path d="M60 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M92 74 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/></g>':""}</svg>`}const a7=`<svg viewBox="0 0 180 170"><path d="M10 70 L90 14 L170 70" fill="#ffa94d" ${E(5)}/>
  <rect x="24" y="66" width="132" height="84" rx="8" fill="#fff6e6" ${E()}/>${tn.map((e,t)=>`<rect x="${24+t*22}" y="66" width="22" height="10" fill="${e}"/>`).join("")}
  <rect x="24" y="66" width="132" height="10" fill="none" ${E(3)}/><circle cx="90" cy="108" r="22" fill="#5a3d5c"/>
  <path d="M60 150 l-12 16 M120 150 l12 16" ${E(5)}/>
  <g class="hen"><ellipse cx="90" cy="118" rx="20" ry="14" fill="#fff" ${E(3)}/><circle cx="104" cy="104" r="10" fill="#fff" ${E(3)}/><path d="M100 94 q3 -8 8 0" fill="#ff6b6b" ${E(2)}/>
  <path d="M113 104 l7 2 -7 3 Z" fill="#ffa94d" ${E(2)}/>${dn(106,102,2)}</g>
  <text x="90" y="54" text-anchor="middle" font-size="16" font-weight="900" fill="${De}" font-family="Nunito, system-ui, sans-serif">EGGS</text></svg>`,r7=`<svg viewBox="0 0 170 130"><rect x="80" y="30" width="54" height="50" rx="8" fill="#bde6f7" ${E()}/><rect x="74" y="24" width="66" height="10" rx="4" fill="#ff6b6b" ${E(3)}/>
  <rect x="20" y="62" width="130" height="34" rx="12" fill="#ff6b6b" ${E()}/><rect x="28" y="40" width="10" height="24" rx="3" fill="#868e96" ${E(3)}/>
  <circle cx="122" cy="98" r="28" fill="${De}"/><circle cx="122" cy="98" r="13" fill="#ffd43b" ${E(3)}/><circle cx="44" cy="106" r="18" fill="${De}"/><circle cx="44" cy="106" r="8" fill="#ffd43b" ${E(3)}/>
  <circle cx="26" cy="76" r="5" fill="#fff3b0" ${E(2)}/></svg>`,l7=`<svg viewBox="0 0 240 300"><rect x="104" y="160" width="32" height="140" rx="10" fill="#c99366" ${E()}/>
  <circle cx="120" cy="110" r="90" fill="#5cc985" ${E()}/><circle cx="62" cy="140" r="50" fill="#5cc985" ${E()}/><circle cx="180" cy="140" r="52" fill="#5cc985" ${E()}/>
  ${[[80,90],[150,70],[175,140],[100,150],[130,115],[60,140]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="11" fill="#ff6b6b" ${E(3)}/><path d="M${e} ${t-10} q2 -6 6 -7" fill="none" ${E(2)}/>`).join("")}</svg>`,xf=[[80,90],[150,70],[175,140],[100,150]],yg=`<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="14" fill="#ff6b6b" ${E(3)}/><path d="M20 10 q2 -6 6 -7" fill="none" ${E(2.5)}/><ellipse cx="27" cy="8" rx="5" ry="3" fill="#5cc985" ${E(2)}/><circle cx="14" cy="18" r="3" fill="#fff" opacity=".6"/></svg>`,Mr=`<svg viewBox="0 0 40 40"><path d="M12 14 L32 10 L16 36 Z" fill="#ff922b" ${E(3)}/><path d="M18 18 l5 -1 M17 24 l4 -1" ${E(2)}/><path d="M30 10 q4 -8 8 -6 M30 10 q-2 -8 2 -10 M30 10 q6 -2 8 2" fill="none" stroke="#40c057" stroke-width="4" stroke-linecap="round"/></svg>`,c7=`<svg viewBox="0 0 40 40"><path d="M6 34 Q20 4 34 34 Z" fill="#f5d27a" ${E(3)}/><path d="M14 30 L18 14 M20 32 V10 M26 30 L22 14" stroke="#d9a93f" stroke-width="2.5" stroke-linecap="round"/></svg>`,mi=`<svg viewBox="0 0 40 40"><path d="M20 4 C30 4 34 20 34 26 C34 34 28 38 20 38 C12 38 6 34 6 26 C6 20 10 4 20 4 Z" fill="#fff6e6" ${E(3)}/><circle cx="15" cy="16" r="3" fill="#fff"/></svg>`,Qc=(e="#ff8fab")=>`<svg viewBox="0 0 40 40"><path d="M20 38 V20" stroke="#40c057" stroke-width="4" stroke-linecap="round"/>${[0,72,144,216,288].map(t=>`<circle cx="${20+Math.cos(t*Math.PI/180)*8}" cy="${14+Math.sin(t*Math.PI/180)*8}" r="7" fill="${e}" ${E(2.5)}/>`).join("")}<circle cx="20" cy="14" r="5" fill="#ffd43b" ${E(2)}/></svg>`,bg={carrot:Mr,apple:yg,hay:c7},d7=e=>`<svg viewBox="0 0 80 90"><g transform="translate(14 0) scale(1.3)">${bg[e].replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g>
  <path d="M10 40 H70 L62 86 H18 Z" fill="${e==="carrot"?"#74c0fc":e==="apple"?"#ffa8c5":"#b2f2bb"}" ${E(4)}/><path d="M12 52 H68" stroke="#fff" stroke-width="4" opacity=".6"/></svg>`,f7=`<svg viewBox="0 0 60 50"><path d="M12 22 Q30 -6 48 22" fill="none" stroke="${De}" stroke-width="7" stroke-linecap="round"/><path d="M12 22 Q30 -6 48 22" fill="none" stroke="#e0a96d" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 22 H56 L50 46 H10 Z" fill="#e0a96d" ${E(3.5)}/><path d="M12 30 H48 M14 38 H46" stroke="#b5793d" stroke-width="3"/></svg>`,Mf=["#ff8fab","#c9a0dc","#ffd43b","#74c0fc","#ff922b"];function kg(e,t,n){const s=`<ellipse cx="35" cy="76" rx="30" ry="11" fill="${e?.wet?"#7a4b2e":"#9c6b46"}" ${E(3)}/>`;if(!e)return`<svg viewBox="0 0 70 90">${s}<path d="M20 74 q4 -3 8 0 M36 78 q4 -3 8 0" stroke="#b5875f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;const o=Mf[n%Mf.length];let i="";t===0&&(i=`<circle cx="27" cy="72" r="3" fill="#f2dcb8" ${E(1.5)}/><circle cx="36" cy="75" r="3" fill="#f2dcb8" ${E(1.5)}/><circle cx="44" cy="71" r="3" fill="#f2dcb8" ${E(1.5)}/>`),t===1&&(i=`<path d="M35 72 V58" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="57" rx="7" ry="4" fill="#69db7c" ${E(2)}/><ellipse cx="41" cy="55" rx="7" ry="4" fill="#69db7c" ${E(2)}/>`),t===2&&(i=`<path d="M35 72 V40 M35 60 Q22 54 20 42 M35 56 Q48 50 50 38" stroke="#40c057" stroke-width="4" fill="none" stroke-linecap="round"/>${e.seed==="flower"?`<circle cx="35" cy="38" r="7" fill="#b2f2bb" ${E(2)}/>`:""}`),t===3&&(i=e.seed==="carrot"?`<path d="M26 74 L44 72 L35 86 Z" fill="#ff922b" ${E(2.5)}/><path d="M35 72 Q24 50 22 38 M35 72 Q36 48 36 34 M35 72 Q46 50 50 40" stroke="#40c057" stroke-width="5" fill="none" stroke-linecap="round"/>`:`<path d="M35 72 V34" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="54" rx="8" ry="4" fill="#69db7c" ${E(2)}/>${[0,72,144,216,288].map(l=>`<circle cx="${35+Math.cos(l*Math.PI/180)*10}" cy="${28+Math.sin(l*Math.PI/180)*10}" r="8" fill="${o}" ${E(2.5)}/>`).join("")}<circle cx="35" cy="28" r="6" fill="#ffd43b" ${E(2)}/>`);const a=e.wet?"":`<g class="needWater"><path d="M56 18 q6 10 0 14 q-6 -4 0 -14 Z" fill="#74c0fc" ${E(2)}/></g>`,r=t===3?`<g class="ready"><path d="M58 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffd43b" ${E(1.5)}/></g>`:"";return`<svg viewBox="0 0 70 90">${s}${i}${a}${r}</svg>`}const p7=`<svg viewBox="0 0 48 48">${tn.map((e,t)=>`<path d="M${6+t*2.6} 38 A${18-t*2.6} ${18-t*2.6} 0 0 1 ${42-t*2.6} 38" fill="none" stroke="${e}" stroke-width="3"/>`).join("")}<path d="M4 38 H44" ${E(3)}/></svg>`,g7=`<svg viewBox="0 0 48 48"><path d="M10 34 Q24 22 38 34" fill="none" ${E(4)}/><path d="M24 30 V8 M16 16 L24 8 L32 16" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40 H40" ${E(4)}/></svg>`,h7=`<svg viewBox="0 0 200 320"><path d="M70 310 L84 120 H116 L130 310 Z" fill="#fff6e6" ${E(4)}/><path d="M78 200 H122 M74 260 H126" ${E(3)}/><rect x="88" y="262" width="24" height="48" rx="10" fill="#b197fc" ${E(3)}/>
  <path d="M78 124 L100 92 L122 124 Z" fill="#ff8fab" ${E(4)}/>
  <g class="sails" style="transform-origin:100px 110px">${[0,90,180,270].map(e=>`<g transform="rotate(${e} 100 110)"><path d="M100 110 L104 30 L126 30 L118 104 Z" fill="${["#ffd43b","#74c0fc","#ff8fab","#69db7c"][e/90]}" ${E(3)}/><path d="M108 40 H122 M107 58 H121 M106 76 H120" ${E(2)}/></g>`).join("")}<circle cx="100" cy="110" r="10" fill="#ffa94d" ${E(3)}/></g></svg>`,u7=["GOAT","SHEEP","PIGLET","CHICKS","BUNNY","COW"],m7=e=>`<g class="lantern" style="transform-origin:${e}px 146px"><path d="M${e} 146 V178" ${E(3)}/><circle cx="${e}" cy="204" r="34" fill="#fff3b0" opacity=".45"/>
  <path d="M${e-14} 182 H${e+14} L${e+11} 226 H${e-11} Z" fill="#ffe066" ${E(3)}/><rect x="${e-17}" y="176" width="34" height="8" rx="3" fill="#495057" ${E(2.5)}/><rect x="${e-15}" y="224" width="30" height="7" rx="3" fill="#495057" ${E(2.5)}/><ellipse cx="${e}" cy="205" rx="5" ry="9" fill="#ff922b"/></g>`;function y7(){const e=uc,t=Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64} 146 V440" stroke="#d4895f" stroke-width="3"/>`).join(""),n=Array.from({length:Math.ceil(e/46)},(o,i)=>{const a=i*46,r=160+Math.sin(i/3.1)*8;return`<path d="M${a} ${r} L${a+40} ${r} L${a+20} ${r+30} Z" fill="${tn[i%6]}" ${E(2.5)}/>`}).join(""),s=mc.map((o,i)=>`<g><rect x="${o-96}" y="318" width="192" height="122" rx="6" fill="#f0c49a" ${E(4)}/>
    <path d="M${o-96} 350 H${o+96} M${o-96} 384 H${o+96} M${o-96} 412 H${o+96}" stroke="#d9a074" stroke-width="3"/><path d="M${o-96} 318 L${o+96} 440 M${o+96} 318 L${o-96} 440" stroke="#e0aa7e" stroke-width="7" opacity=".7"/>
    <rect x="${o-54}" y="284" width="108" height="30" rx="10" fill="#fff6e6" ${E(3)}/><text x="${o}" y="305" text-anchor="middle" font-size="17" font-weight="900" fill="${De}" font-family="Nunito, system-ui, sans-serif">${u7[i]}</text></g>`).join("");return`<svg class="parkScene ranchScene barnScene" viewBox="0 0 ${e} ${Bi}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="440" fill="#e8a87c"/>${t}
  <!-- hay loft -->
  <rect width="${e}" height="128" fill="#c98a5e"/>${Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64+32} 0 V128" stroke="#b5764d" stroke-width="3"/>`).join("")}
  ${[120,260,420,980,1130,1290,1640,1790].map((o,i)=>Ln(o,126,i%3===1?.72:.85)).join("")}${[190,1060,1720].map(o=>Ln(o,82,.7)).join("")}
  <rect x="0" y="126" width="${e}" height="24" fill="#a8653a" ${E(4)}/>
  ${[0,1,2,3,4,5,6].map(o=>`<path d="M${120+o*280} 150 L${180+o*280} 210" stroke="#a8653a" stroke-width="12" stroke-linecap="round"/><path d="M${120+o*280} 150 L${180+o*280} 210" ${E(2)}/>`).join("")}
  <!-- ladder up to the loft -->
  <g transform="translate(1840 0)"><path d="M-22 150 L-30 440 M22 150 L30 440" stroke="#c99366" stroke-width="10" stroke-linecap="round"/>${[190,240,290,340,390].map(o=>`<path d="M${-22-(o-150)*.028} ${o} H${22+(o-150)*.028}" stroke="#c99366" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
  <!-- rainbow bunting + big rainbow banner -->
  <path d="M0 160 Q${e/2} 176 ${e} 160" fill="none" ${E(2)}/>${n}
  <g transform="translate(${e/2+60} 236)">${tn.map((o,i)=>`<rect x="${-180+i*60}" y="-26" width="60" height="44" fill="${o}"/>`).join("")}<rect x="-180" y="-26" width="360" height="44" rx="4" fill="none" ${E(4)}/>
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
  ${Ln(1790,590,.8)}${Ln(1700,600,.65)}
  ${[290,660,1330,1590].map(m7).join("")}
  </svg>`}const vo=600,zt="#5a3d5c",ne=(e=4)=>`stroke="${zt}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function Ri(e){const t=As[e].seats,n=t<=2?140:t===4?110:100,s=(t-1)/2;return Array.from({length:t},(o,i)=>({x:As[e].x+(i-s)*n,y:558-Math.abs(i-s)*8}))}const Lf=["#ff7eb3","#ffd43b","#66d9e8","#d0bfff","#fff"],jt=(e,t,n=1,s="#fff")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -9 L2.2 -2.4 L9 -2.2 L3.4 2.2 L5.4 9 L0 4.6 L-5.4 9 L-3.4 2.2 L-9 -2.2 L-2.2 -2.4 Z" fill="${s}" stroke="${zt}" stroke-width="1.2" stroke-linejoin="round"/>`;function Nl(e,t,n,s){const o=`<path d="M36 ${t} Q ${e/2} ${t+n+8} ${e-36} ${t}" fill="none" stroke="${zt}" stroke-width="3"/>`,i=Array.from({length:s},(a,r)=>{const l=s===1?.5:r/(s-1),c=48+l*(e-96),f=t+Math.sin(l*Math.PI)*n,d=Lf[r%Lf.length];return`<g class="bulb" style="animation-delay:-${r%8*.22}s"><line x1="${c}" y1="${f-16}" x2="${c}" y2="${f-6}" stroke="${zt}" stroke-width="2"/><circle cx="${c}" cy="${f}" r="7.5" fill="${d}" ${ne(2)}/><circle cx="${c-2}" cy="${f-2}" r="2.2" fill="#fff" opacity=".85"/></g>`}).join("");return o+i}const zo=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">
  <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".12"/>
  <path d="M-40 10 Q-48 -22 -10 -28 Q10 -46 34 -18 Q50 2 34 18 Q8 32 -24 20 Q-42 16 -40 10 Z" fill="${n}" ${ne(3)}/>
  <path d="M-18 -6 Q-4 -20 14 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <circle cx="16" cy="6" r="4" fill="#fff" opacity=".35"/>
</g>`,Ef=(e,t,n)=>`<g transform="translate(${e} ${t})">
  <ellipse cx="0" cy="16" rx="28" ry="9" fill="#000" opacity=".12"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="${n}" ${ne(3)}/>
  <ellipse cx="-6" cy="-2" rx="12" ry="7" fill="#fff" opacity=".35"/>
  <path d="M0 -16 V-28" ${ne(3)}/><circle cy="-32" r="6" fill="#ffd43b" ${ne(2)}/>
</g>`;function Qo(e,t,n,s,o,i=""){return`<g class="photoFrame${i}" transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-40" y="-52" width="80" height="104" rx="6" fill="#fff" ${ne(3.5)}/>
    <rect x="-32" y="-44" width="64" height="72" rx="4" fill="${s}"/>
    ${o}
    <rect x="-10" y="-58" width="20" height="10" rx="2" fill="#ffe8a3" opacity=".85" transform="rotate(-8)"/>
  </g>`}function Ki(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-28" y="-34" width="56" height="68" rx="3" fill="#fff" ${ne(3)}/>
    <rect x="-22" y="-28" width="44" height="40" fill="${s}"/>
    ${o}
  </g>`}function Xi(e,t,n,s){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="36" rx="26" ry="8" fill="#000" opacity=".12"/>
    <path d="M-18 36 L-12 -2 H12 L18 36 Z" fill="${n}" ${ne(3)}/>
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c9a27a" ${ne(2)}/>
    <ellipse cx="-16" cy="-16" rx="16" ry="22" fill="${s}" ${ne(3)} transform="rotate(-18)"/>
    <ellipse cx="16" cy="-18" rx="16" ry="22" fill="${s}" ${ne(3)} transform="rotate(16)"/>
    <ellipse cx="0" cy="-28" rx="14" ry="20" fill="${s}" ${ne(3)}/>
    <circle cx="0" cy="-36" r="6" fill="#ff8ec8" ${ne(2)}/>
  </g>`}function b7(e,t){return`<g transform="translate(${e} ${t})">
    <ellipse cx="28" cy="118" rx="32" ry="8" fill="#000" opacity=".12"/>
    <rect width="56" height="118" rx="10" fill="#e7fbff" ${ne()}/>
    <rect y="52" width="56" height="8" fill="#d0f4ff" ${ne(2)}/>
    <rect x="44" y="18" width="6" height="22" rx="3" fill="#ffd43b" ${ne(2)}/>
    <rect x="44" y="70" width="6" height="28" rx="3" fill="#ffd43b" ${ne(2)}/>
    <rect x="8" y="12" width="28" height="22" rx="4" fill="#fff" ${ne(2)}/>
    <circle cx="16" cy="22" r="4" fill="#ff8ec8"/><circle cx="28" cy="24" r="3" fill="#ffd43b"/>
    <path d="M18 78 C14 72 8 74 12 82 C15 88 18 90 18 90 C18 90 21 88 24 82 C28 74 22 72 18 78 Z" fill="#ff4d94" ${ne(1.5)}/>
  </g>`}function k7(e,t,n){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="6" rx="34" ry="9" fill="#000" opacity=".1"/>
    <path d="M-46 -16 C-50 -86 -26 -108 0 -110 C26 -108 50 -86 46 -16 Z" fill="#fff6fb" ${ne()}/>
    <path d="M-32 -20 C-34 -74 -16 -90 0 -92 C16 -90 34 -74 32 -20 Z" fill="${n}"/>
    <ellipse cx="0" cy="-10" rx="40" ry="16" fill="${n}" ${ne()}/>
    <ellipse cx="-8" cy="-16" rx="14" ry="6" fill="#fff" opacity=".4"/>
    <path d="M-22 -2 L-26 16 M22 -2 L26 16" fill="none" stroke="${zt}" stroke-width="4" stroke-linecap="round"/>
  </g>`}function w7(e){const t=As[e],n=t.game==="four"?"Four":"Slay",s=t.game==="four"?"#7ad7ea":e===0?"#ff8ec8":"#e0b0ff",o=t.game==="four"?"#b8f2ff":e===0?"#ffd0e6":"#ead9ff",i=t.seats>=6?250:t.seats>=4?200:150;return`${Ri(e).map(r=>k7(r.x,r.y,o)).join("")}
  <g transform="translate(${t.x} 500)">
    <ellipse cx="0" cy="28" rx="${i+18}" ry="20" fill="#000" opacity=".1"/>
    <rect x="-18" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${ne(3)}/>
    <rect x="4" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${ne(3)}/>
    <ellipse cx="0" cy="-4" rx="${i}" ry="30" fill="${s}" stroke="#ffd43b" stroke-width="6"/>
    <ellipse cx="0" cy="-4" rx="${i-16}" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <ellipse cx="${-i*.25}" cy="-12" rx="${i*.35}" ry="8" fill="#fff" opacity=".28"/>
    <text x="0" y="4" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="${zt}" stroke-width="4" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${n}</text>
  </g>`}const qo=(e,t,n=1,s="#ff4d94")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 4 C-6 -4 -14 -2 -10 6 C-7 12 0 16 0 16 C0 16 7 12 10 6 C14 -2 6 -4 0 4 Z" fill="${s}" stroke="${zt}" stroke-width="1.6" stroke-linejoin="round"/>`;function Cf(e,t){const n=Ei,s=Math.max(1,Math.ceil(t));let o="";if(e==="top"){o=`<rect width="${n}" height="${s}" fill="#ffe0f2"/>`;for(let i=s-70,a=0;i>24;i-=150,a++)o+=Nl(n,i,a%2?22:16,a%2?26:20);for(let i=0;i<14;i++){const a=90+i*397%(n-180),r=20+i*131%Math.max(20,s-70);o+=jt(a,r,.55+i%3*.2,i%2?"#fff":"#ffd43b")}}else{o=`<defs><linearGradient id="grFloorExt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e089ab"/><stop offset="1" stop-color="#d27399"/></linearGradient></defs>
  <rect width="${n}" height="${s}" fill="url(#grFloorExt)"/>`;for(let i=46;i<s;i+=64)o+=`<rect y="${i}" width="${n}" height="3" fill="#fff" opacity=".18"/>`}return`<svg class="grExt grExt-${e}" viewBox="0 0 ${n} ${s}" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${o}</svg>`}function v7(){const e=Ei,t=[[120,200],[260,250],[640,210],[900,250],[1180,190],[1560,230],[1860,180],[2100,240],[2420,200],[2520,280]];return`<svg class="grScene" viewBox="0 0 ${e} ${vo}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="${e}" height="${vo}" fill="url(#grWall)"/>
  <rect y="390" width="${e}" height="80" fill="#fff6fb" opacity=".45"/>
  ${Array.from({length:8},(n,s)=>`<rect x="${40+s*330}" y="400" width="280" height="62" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`).join("")}
  <rect y="468" width="${e}" height="132" fill="url(#grFloor)"/>
  <rect y="464" width="${e}" height="12" fill="#ffd43b" ${ne(3)}/>
  ${[720,1500,2150].map((n,s)=>`<ellipse cx="${n}" cy="548" rx="${s===1?210:280}" ry="42" fill="${s===1?"#d8f6ff":s===0?"#ffe0f0":"#f3e8ff"}" stroke="#fff" stroke-width="4" opacity=".8"/>`).join("")}
  ${Nl(e,28,22,28)}
  ${Nl(e,78,16,18)}
  ${t.map(([n,s],o)=>jt(n,s,.7+o%3*.28,o%2?"#fff":"#ffd43b")).join("")}

  <g transform="translate(1180 70)">
    <rect x="20" y="20" width="220" height="150" rx="16" fill="url(#grSky)" ${ne()}/>
    <path d="M20 70 H240 M130 20 V170" ${ne(3)}/>
    <circle cx="78" cy="48" r="14" fill="#ffd43b" ${ne(2)}/>
    <path d="M8 36 Q20 90 8 150" fill="#ff8ec8" ${ne(3)}/><path d="M252 36 Q240 90 252 150" fill="#d0bfff" ${ne(3)}/>
  </g>

  <g class="neonSign" transform="translate(560 168)">
    <g class="neonSignArt">
    <rect x="-228" y="-58" width="456" height="108" rx="28" fill="#2b1430" ${ne(5)}/>
    <rect class="neonRing" x="-214" y="-44" width="428" height="80" rx="22" fill="none" stroke="#ff4d94" stroke-width="4"/>
    <path d="M-150 8 C-162 -14 -186 -8 -174 12 C-166 26 -150 36 -150 36 C-150 36 -134 26 -126 12 C-114 -8 -138 -14 -150 8 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="2"/>
    <text x="6" y="16" text-anchor="middle" font-size="40" font-weight="900" fill="#ff7eb3" stroke="#fff6fb" stroke-width="2" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY CLUB</text>
    </g>
  </g>

  ${Qo(500,340,-6,"#ffe0f0",`${qo(0,8,1.4)}${jt(-18,-16,.7,"#ffd43b")}${jt(18,-10,.55,"#66d9e8")}`," frameAtHead")}
  ${Qo(270,196,-8,"#ffe0f0",`${qo(0,8,1.4)}${jt(-18,-16,.7,"#ffd43b")}${jt(18,-10,.55,"#66d9e8")}`," framePhone")}
  ${Qo(980,240,5,"#e7fbff",`<ellipse cx="0" cy="6" rx="16" ry="12" fill="#fff" ${ne(2)}/><path d="M-6 6 Q0 -8 6 6" fill="none" stroke="${zt}" stroke-width="2"/><path d="M0 18 V28 M-12 24 H12" ${ne(2)}/>`)}
  ${Qo(1680,255,-4,"#fff3c4",`${jt(0,2,1.5,"#ffd43b")}`)}
  ${Qo(2360,245,6,"#f3e8ff",`${qo(0,4,1.3,"#d0bfff")}`)}
  ${Ki(400,300,8,"#fff0f6",qo(0,-4,1.1))}
  ${Ki(820,310,-7,"#e7fbff",jt(0,-6,1,"#66d9e8"))}
  ${Ki(1900,300,9,"#fff6e6",jt(0,-6,1,"#ffd43b"))}
  ${Ki(2280,320,-8,"#ffe0f0",qo(0,-4,1))}

  <g class="disco" transform="translate(1288 36)">
    <line y1="0" y2="22" stroke="${zt}" stroke-width="3"/>
    <circle cy="44" r="26" fill="url(#disco)" ${ne(3)}/>
    <path d="M-14 36 L0 56 L14 36 M-8 48 H8" fill="none" stroke="#fff" stroke-width="2.5"/>
    ${jt(-30,20,.45)}${jt(32,28,.4,"#ffd43b")}
  </g>

  <g transform="translate(86 292)">
    <rect width="78" height="168" rx="12" fill="#ff8ec8" ${ne()}/>
    <rect x="8" y="10" width="62" height="36" rx="8" fill="#fff6e6" ${ne(2)}/>
    <text x="39" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="${zt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
    <circle cx="62" cy="96" r="5" fill="#ffd43b" ${ne(2)}/>
    <rect x="22" y="118" width="34" height="8" rx="3" fill="#fff" opacity=".45"/>
  </g>

  ${Xi(40,400,"#ffd43b","#8ce99a")}
  ${Xi(1080,392,"#ff8ec8","#69db7c")}
  ${Xi(1600,400,"#d0bfff","#8ce99a")}
  ${Xi(2520,396,"#66d9e8","#69db7c")}
  ${b7(200,348)}
  <g transform="translate(2420 360)">
    <rect width="130" height="100" rx="14" fill="#fff6fb" ${ne()}/>
    <rect y="28" width="130" height="10" fill="#ffd0e6" ${ne(2)}/>
    <circle cx="28" cy="64" r="12" fill="#ffd43b" ${ne(2)}/><circle cx="64" cy="66" r="10" fill="#ff8ec8" ${ne(2)}/><rect x="86" y="52" width="28" height="22" rx="6" fill="#66d9e8" ${ne(2)}/>
    <text x="65" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="${zt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">SNACKS</text>
  </g>

  ${zo(330,455,"#ff8ec8",1.05)}
  ${zo(1120,468,"#d0bfff")}
  ${zo(1360,470,"#8ce4f2",.9)}
  ${zo(1780,462,"#ffd43b")}
  ${Ef(1480,500,"#ffb3d9")}
  ${Ef(2e3,505,"#c9b3ff")}
  ${zo(2550,468,"#ff8ec8",.85)}

  ${As.map((n,s)=>w7(s)).join("")}
  </svg>`}const _7=`<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${zt}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`,U="#5a3d5c",$7=`<svg viewBox="0 0 120 100"><rect x="0" y="62" width="120" height="38" rx="14" fill="#9fe0aa" stroke="${U}" stroke-width="3"/>
  <path d="M18 70 L30 22 L42 70 M78 70 L90 22 L102 70" fill="none" stroke="#8ecae6" stroke-width="5" stroke-linecap="round"/><path d="M26 22 H94" stroke="#ff8fab" stroke-width="7" stroke-linecap="round"/>
  <path d="M50 22 V54 M66 22 V54" stroke="${U}" stroke-width="2.5"/><rect x="45" y="52" width="26" height="7" rx="3" fill="#ff9f68" stroke="${U}" stroke-width="2.5"/>
  <circle cx="104" cy="14" r="9" fill="#ffd166" stroke="${U}" stroke-width="3"/></svg>`,wg=`<svg viewBox="0 0 120 100"><path d="M20 50 L60 16 L100 50" fill="#ff8fab" stroke="${U}" stroke-width="4" stroke-linejoin="round"/><rect x="28" y="48" width="64" height="44" rx="6" fill="#fff6e6" stroke="${U}" stroke-width="4"/>
  <rect x="52" y="64" width="16" height="28" rx="4" fill="#c9a0dc" stroke="${U}" stroke-width="3"/><rect x="34" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${U}" stroke-width="3"/><rect x="73" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${U}" stroke-width="3"/></svg>`,qc=`<svg viewBox="0 0 120 100"><path d="M40 18 L24 28 L14 46 L30 52 L34 44 V88 H86 V44 L90 52 L106 46 L96 28 L80 18 Q60 34 40 18 Z" fill="#8ecae6" stroke="${U}" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="58" r="7" fill="#fff3b0" stroke="${U}" stroke-width="3"/></svg>`,ue=e=>`<div class="wnArt">${e}</div>`,vg=`<svg viewBox="0 0 120 100"><rect x="16" y="58" width="74" height="24" rx="10" fill="#fff" stroke="${U}" stroke-width="4"/><circle cx="32" cy="70" r="7" fill="#ff8fab" stroke="${U}" stroke-width="3"/><circle cx="52" cy="70" r="7" fill="#ffe066" stroke="${U}" stroke-width="3"/><circle cx="72" cy="70" r="7" fill="#8ecae6" stroke="${U}" stroke-width="3"/><path d="M86 46 l14 -16 8 8 -14 16z" fill="#ffd166" stroke="${U}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="44" width="12" height="24" rx="4" fill="#c9a0dc" stroke="${U}" stroke-width="3"/></svg>`,x7=`<svg viewBox="0 0 120 100">${tn.map((e,t)=>`<path d="M${12+t*6} 84 A${48-t*6} ${48-t*6} 0 0 1 ${108-t*6} 84" fill="none" stroke="${e}" stroke-width="6"/>`).join("")}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${U}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${U}" stroke-width="3"/></svg>`,M7=`<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${mi.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g><g transform="translate(52 22) scale(1.4)">${mi.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g></svg>`,Fl=(e,t,n,s)=>`<g transform="translate(${t} ${n}) scale(${s})">${e.replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"")}</g>`,L7=`<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${U}" stroke-width="4"/>${Fl(gc(bt({skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6"})).replace('viewBox="14 2 72 74"','viewBox="0 0 100 160"'),26,12,.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`,E7=`<svg viewBox="0 0 120 100"><rect x="8" y="28" width="104" height="64" rx="16" fill="#fff0f6" stroke="${U}" stroke-width="4"/><path d="M8 40 L60 12 L112 40" fill="#ff6b9a" stroke="${U}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 58 C52 48 40 50 46 60 C50 68 60 74 60 74 C60 74 70 68 74 60 C80 50 68 48 60 58 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  ${[18,34,50,66,82,98].map((e,t)=>`<circle cx="${e}" cy="24" r="4" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" stroke="${U}" stroke-width="1.5"/>`).join("")}</svg>`,C7=`<svg viewBox="0 0 120 100"><rect x="28" y="8" width="64" height="84" rx="12" fill="#fff" stroke="${U}" stroke-width="4"/><rect x="28" y="8" width="64" height="84" rx="12" fill="none" stroke="#ff7eb3" stroke-width="6"/><path d="M48 36 L54 24 L60 34 L68 20 L76 34 L82 24 L88 36 Z" fill="#ffd43b" stroke="${U}" stroke-width="2" stroke-linejoin="round"/><text x="60" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#ff4d94" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY</text></svg>`,S7=`<svg viewBox="0 0 120 100"><rect x="10" y="16" width="100" height="72" rx="14" fill="#fff6fb" stroke="${U}" stroke-width="4"/>
  <path d="M36 58 C28 48 18 50 24 60 C28 68 36 74 36 74 C36 74 44 68 48 60 C54 50 44 48 36 58 Z" fill="#ff4d94" stroke="${U}" stroke-width="2"/>
  <path d="M78 28 L82 40 H94 L84 48 L88 60 L78 52 L68 60 L72 48 L62 40 H74 Z" fill="#66d9e8" stroke="${U}" stroke-width="2"/></svg>`,_g=`<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="22" rx="6" fill="#fff" stroke="${U}" stroke-width="3"/><path d="M6 26 H42 M14 18 V40 M22 18 V40 M30 18 V40 M36 18 V40" stroke="${U}" stroke-width="2.4"/><rect x="4" y="12" width="40" height="8" rx="4" fill="#9ad7f5" stroke="${U}" stroke-width="3"/><ellipse cx="20" cy="32" rx="5" ry="3" fill="#ffe0ec"/><ellipse cx="30" cy="32" rx="5" ry="3" fill="#c9e7ff"/></svg>`,P7=`<svg viewBox="0 0 120 100"><ellipse cx="60" cy="72" rx="50" ry="20" fill="#ffc2d4" stroke="${U}" stroke-width="4"/><ellipse cx="60" cy="72" rx="32" ry="11" fill="#fff" stroke="${U}" stroke-width="3"/><path d="M60 58 C50 46 36 48 42 60 C48 70 60 78 60 78 C60 78 72 70 78 60 C84 48 70 46 60 58 Z" fill="#ff4d94" stroke="${U}" stroke-width="3"/><path d="M22 40 Q28 28 36 36" fill="none" stroke="#7dce8a" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="5" fill="#ffd166" stroke="${U}" stroke-width="2"/></svg>`,T7=`<svg viewBox="0 0 120 100"><path d="M16 50 L60 14 L104 50" fill="#ff8fab" stroke="${U}" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="48" width="68" height="40" rx="10" fill="#fff6ea" stroke="${U}" stroke-width="4"/><path d="M42 88 V60 Q60 44 78 60 V88" fill="#ffe8c7" stroke="${U}" stroke-width="3"/><circle cx="82" cy="64" r="7" fill="#bde0fe" stroke="${U}" stroke-width="3"/><circle cx="80" cy="62" r="2" fill="#fff"/></svg>`,B7=`<svg viewBox="0 0 120 100"><rect x="28" y="38" width="64" height="42" rx="8" fill="#8ecae6" stroke="${U}" stroke-width="4"/><path d="M28 44 L60 68 L92 44" fill="none" stroke="${U}" stroke-width="4"/><path d="M76 30 V16" stroke="${U}" stroke-width="4" stroke-linecap="round"/><path d="M76 16 H96 L90 23 L96 30 H76 Z" fill="#ff6b6b" stroke="${U}" stroke-width="3"/></svg>`,R7=`<svg viewBox="0 0 120 100"><rect x="8" y="32" width="48" height="40" rx="14" fill="#fff3b0" stroke="${U}" stroke-width="4"/><rect x="64" y="32" width="48" height="40" rx="14" fill="#fff" stroke="${U}" stroke-width="4"/><path d="M26 44 L40 52 L26 60 Z" fill="${U}"/><circle cx="88" cy="52" r="6" fill="#ff8fab" stroke="${U}" stroke-width="3"/></svg>`,A7=`<svg viewBox="0 0 120 100"><rect x="16" y="18" width="36" height="58" rx="6" fill="#fff" stroke="${U}" stroke-width="4"/><rect x="62" y="24" width="42" height="52" rx="6" fill="#e7f6ff" stroke="${U}" stroke-width="4"/><circle cx="34" cy="66" r="2.4" fill="${U}"/><circle cx="83" cy="66" r="2.4" fill="${U}"/></svg>`,$g=`<svg viewBox="0 0 120 100"><rect x="28" y="16" width="64" height="72" rx="16" fill="#fff" stroke="${U}" stroke-width="4"/><path d="M40 36 H80 M40 52 H80 M40 68 H80" fill="none" stroke="${U}" stroke-width="5" stroke-linecap="round"/><circle cx="92" cy="24" r="12" fill="#ff6b9a" stroke="${U}" stroke-width="3"/><text x="92" y="29" text-anchor="middle" font-size="14" font-weight="900" fill="#fff" font-family="Nunito, ui-rounded, system-ui, sans-serif">1</text></svg>`,D7=`<svg viewBox="0 0 120 100"><rect x="6" y="10" width="108" height="80" rx="18" fill="#2a2158" stroke="${U}" stroke-width="4"/><circle cx="34" cy="42" r="14" fill="#ffd166" stroke="${U}" stroke-width="3"/><path d="M78 28 a16 16 0 1 0 0 32 a12 12 0 1 1 0 -32z" fill="#fff6e4" stroke="${U}" stroke-width="3"/><circle cx="92" cy="30" r="2" fill="#fff"/><circle cx="70" cy="24" r="1.6" fill="#fff"/><circle cx="100" cy="48" r="1.6" fill="#fff"/></svg>`,I7=`<svg viewBox="0 0 120 100"><circle cx="60" cy="52" r="34" fill="#fff6e4" stroke="${U}" stroke-width="4"/><path d="M60 52 V32 M60 52 L76 60" stroke="${U}" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="52" r="3" fill="${U}"/><path d="M28 22 l4 6 M92 22 l-4 6" stroke="#ffb15c" stroke-width="4" stroke-linecap="round"/></svg>`,xg=`<svg viewBox="0 0 120 100"><path d="M60 18 L72 46 H96 L78 62 L84 90 L60 74 L36 90 L42 62 L24 46 H48 Z" fill="#ffd166" stroke="${U}" stroke-width="4" stroke-linejoin="round"/><path d="M60 48 L28 92 H92 Z" fill="#2f6b4f" stroke="${U}" stroke-width="4" stroke-linejoin="round"/><rect x="52" y="88" width="16" height="8" rx="2" fill="#c44558" stroke="${U}" stroke-width="3"/></svg>`,Mg=[{v:10,title:"Winter Cheer!",lines:[{art:ue(xg),text:"The <b>Winter Cheer</b> pack is in your drawer!"}]},{v:9,title:"Everything's tidied into the Menu!",lines:[{art:ue($g),text:"Everything's tidied into the <b>Menu</b>!"},{art:ue(D7),text:"The world follows the <b>clock</b>: morning, day, golden evening, and night."},{art:ue(I7),text:"Tap the <b>sun</b> and the <b>moon</b>. <b>Auto</b> follows the clock."}]},{v:8,title:"Make your look!",lines:[{art:ue(B7),text:"Leave a <b>letter</b> in a friend's mailbox!"},{art:ue(R7),text:"Tap <b>Play</b> or <b>Decorate</b>!"},{art:ue(qc),text:"<b>Make your look!</b> New hair, clothes, and colors."},{art:ue(A7),text:"Update every iPad to see the <b>new outfits</b>!"}]},{v:7,title:"New Nursery!",lines:[{art:ue(_g),text:"A new <b>Nursery</b> room, with a <b>crib</b> and a rocker!"},{art:ue(P7),text:"The <b>Cozy Cottage</b> furniture pack is in your drawer!"},{art:ue(T7),text:"A <b>dog kennel</b> and a <b>cat tower</b> for your pets!"}]},{v:6,title:"The clubhouse is open!",lines:[{art:ue(E7),text:"A glam <b>clubhouse</b> on the map!"},{art:ue(C7),text:"Play <b>Slay</b> with friends at a table!"},{art:ue(S7),text:"Line up <b>hearts</b> or <b>stars</b>!"}]},{v:5,title:"Your house looks even cozier!",lines:[{art:ue(vg),text:"Wallpaper and floors show their <b>real patterns</b> when you paint!"},{art:ue(bo(0,"sit")),text:"Your cat is <b>big and cozy</b>, just like the toy cat."},{art:ue(wg),text:"Tap <b>home</b> to come back from the map, the park, or the ranch."}]},{v:4,title:"A map of our neighborhood!",lines:[{art:ue(pc),text:"Tap the <b>map</b> to go anywhere!"},{art:ue(L7),text:"Tap a friend's face to <b>find her</b>."},{art:ue(Zl(0)),text:"The petting zoo is inside the <b>barn</b> now!"}]},{v:3,title:"Rainbow Ranch is open!",lines:[{art:ue(x7),text:"Visit <b>Rainbow Ranch</b>!"},{art:ue(Zl(1)),text:"Pet and feed animals at the <b>petting zoo</b>."},{art:ue(`<svg viewBox="0 0 160 130">${Fl(zc(4),0,0,1)}</svg>`),text:"Ride <b>horses</b> and the <b>rainbow pony</b>!"},{art:ue(M7),text:"Collect <b>eggs</b> from the hens."},{art:ue(`<svg viewBox="0 0 70 90">${Fl(kg({seed:"carrot",wet:1},3,0),0,0,1)}</svg>`),text:"Grow carrots and flowers in the <b>garden</b>."}]},{v:2,title:"What's new!",lines:[{art:ue($7),text:"A new <b>park</b>! Swing, slide and splash with friends."},{art:ue(bo(3,"sit")),text:"Adopt a <b>cat</b>! She lives in your house."},{art:ue(ui(3,"stand")),text:"Adopt a <b>dog</b>! Take it to the park to play fetch."}]}],Lg=Mg[0].v,Eg={v:Lg,title:"Welcome to your cozy house!",lines:[{art:ue(wg),text:"Drag furniture into your rooms."},{art:ue(qc),text:"Dress up your friends."},{art:ue(bo(0,"sit")),text:"Tap the paw to adopt a pet!"}]},Cg=Nt("cozy-whatsnew"),H7=1;function O7(){try{const e=Number(localStorage.getItem(Cg)),t=["cozy-house","cozy-house-v1","cozy-hood"].some(o=>localStorage.getItem(Nt(o))!==null);if(!e&&!t)return{kind:"welcome",entries:[Eg]};const n=e||H7,s=Mg.filter(o=>o.v>n).slice(0,3);return s.length?{kind:"news",entries:s}:{kind:"none",entries:[]}}catch{return{kind:"none",entries:[]}}}function W7(){try{localStorage.setItem(Cg,String(Lg))}catch{}}function U7(e,t){const n=e==="welcome"?Eg.title:t[0].title,s=t.flatMap(o=>o.lines).slice(0,5);return`<div class="wnBadge">${e==="welcome"?Np:t[0].v>=10?xg:t[0].v>=9?$g:t[0].v>=8?qc:t[0].v>=7?_g:t[0].v>=6?_7:t[0].v>=5?vg:t[0].v>=4?pc:t[0].v>=3?p7:Z1}</div>
    <h2 class="wnTitle">${n}</h2>
    <div class="wnList ${s.length>3?"many":""}">${s.map((o,i)=>`<div class="wnLine" style="animation-delay:${.15+i*.18}s">${o.art}<p>${o.text}</p></div>`).join("")}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`}const Sg="cozy-sky",jl={tint:"#fff6e4",body:"#ffe9f0",pageA:"#ffe0ec",pageB:"#e6ddff",spot:"#fff6fa",fieldA:"#c9f2c7",fieldB:"#8fd18a",win:"#a2d2ff",win2:"#b9e3ff",house:"#fff3b0",mapTint:"#ffffff"},Sf={tint:"#e7b4cc",body:"#f6dce8",pageA:"#ffd0e6",pageB:"#e6d2f8",spot:"#fff0f6",fieldA:"#f6d0e2",fieldB:"#dcc8f0",win:"#f6c6de",win2:"#e4d0f8",house:"#ffe0ee",mapTint:"#f3c4dc"},Pf={tint:"#ffb38a",body:"#ffe4dc",pageA:"#ffe0d6",pageB:"#f0d8ea",spot:"#fff6ee",fieldA:"#d4eec4",fieldB:"#a3cb8a",win:"#ffc48a",win2:"#ffd4b0",house:"#ffc56a",mapTint:"#ffb38a"},oo={tint:"#2a2350",body:"#14182c",pageA:"#1c1748",pageB:"#101832",spot:"#2c2458",fieldA:"#1a2458",fieldB:"#0c1028",win:"#1a245c",win2:"#12183a",house:"#ffe9a0",mapTint:"#102044"},Ji=[{m:0,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...oo},{m:5*60,opacity:.7,map:.78,glow:.95,stars:.95,glass:1,phase:"night",...oo},{m:5*60+35,opacity:.42,map:.34,glow:.55,stars:.42,glass:.8,phase:"dawn",...Sf},{m:6*60+25,opacity:.14,map:.16,glow:.28,stars:.08,glass:.9,phase:"dawn",...Sf},{m:7*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...jl},{m:16*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...jl},{m:17*60+5,opacity:.08,map:.1,glow:.4,stars:.02,glass:.55,phase:"golden",...Pf},{m:18*60+10,opacity:.18,map:.2,glow:.62,stars:.06,glass:.82,phase:"golden",...Pf},{m:19*60+5,opacity:.52,map:.68,glow:.9,stars:.55,glass:1,phase:"night",...oo},{m:20*60+10,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...oo},{m:24*60,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...oo}],V7={phase:"day",opacity:0,map:0,glow:0,stars:0,glass:0,...jl},z7={phase:"night",opacity:.7,map:.78,glow:1,stars:1,glass:1,...oo};function Tf(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function Ft(e,t,n){const s=Tf(e),o=Tf(t),i=a=>Math.round(s[a]+(o[a]-s[a])*n).toString(16).padStart(2,"0");return"#"+i(0)+i(1)+i(2)}const Zo=(e,t,n)=>e+(t-e)*n;function Q7(e){const t=e.getHours()*60+e.getMinutes()+e.getSeconds()/60;let n=0;for(;n<Ji.length-2&&t>=Ji[n+1].m;)n++;const s=Ji[n],o=Ji[n+1],i=Math.max(1,o.m-s.m),a=Math.max(0,Math.min(1,(t-s.m)/i));return{phase:a<.5?s.phase:o.phase,opacity:Zo(s.opacity,o.opacity,a),map:Zo(s.map,o.map,a),glow:Zo(s.glow,o.glow,a),stars:Zo(s.stars,o.stars,a),glass:Zo(s.glass,o.glass,a),tint:Ft(s.tint,o.tint,a),body:Ft(s.body,o.body,a),pageA:Ft(s.pageA,o.pageA,a),pageB:Ft(s.pageB,o.pageB,a),spot:Ft(s.spot,o.spot,a),fieldA:Ft(s.fieldA,o.fieldA,a),fieldB:Ft(s.fieldB,o.fieldB,a),win:Ft(s.win,o.win,a),win2:Ft(s.win2,o.win2,a),house:Ft(s.house,o.house,a),mapTint:Ft(s.mapTint,o.mapTint,a)}}function Bf(e,t){return t==="day"?V7:t==="night"?z7:Q7(e)}function q7(e){return e==="day"||e==="night"||e==="auto"}function Z7(e,t=!1){return t?!0:e==="lamp"||e==="window"||e==="stars"||e==="tv"||/lamp|light|lantern|candle|string-lights|night-light/i.test(e)}function Rf(){try{if(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches)return!0}catch{}if(typeof navigator>"u")return!1;const e=navigator.hardwareConcurrency;if(typeof e=="number"&&e>0&&e<=2)return!0;const t=navigator.deviceMemory;return typeof t=="number"&&t>0&&t<=2}const Af={day:"night",night:"auto",auto:"day"},Df={day:"Day",night:"Night",auto:"Auto"},Pg='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><g fill="none" stroke="#ffb15c" stroke-width="3" stroke-linecap="round"><path d="M24 7 V13 M24 35 V41 M7 24 H13 M35 24 H41 M12 12 L16 16 M32 32 L36 36 M36 12 L32 16 M16 32 L12 36"/></g></svg>',N7='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 8 a14 14 0 1 0 0 32 a11 11 0 1 1 0 -32z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="3"/><circle cx="14" cy="16" r="1.7" fill="#ffd166"/><circle cx="18" cy="28" r="1.2" fill="#fff"/><circle cx="11" cy="24" r="1" fill="#fff"/></svg>',F7='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="28" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M34 8 a9 9 0 1 0 0 18 a7 7 0 1 1 0 -18z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="14" cy="16" r="1.3" fill="#ffd166"/></svg>',j7={day:Pg,night:N7,auto:F7},G7="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)";function Y7(){if(document.getElementById("skyInk"))return;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.id="skyInk",e.setAttribute("aria-hidden","true"),e.setAttribute("width","0"),e.setAttribute("height","0"),e.style.cssText="position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none",e.innerHTML=`
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
  `,document.head.appendChild(t)}function K7(e){Y7();const t=Rf();let n=J7(),s=null,o=Bf(new Date,n),i=0;e.innerHTML=`<button type="button" class="skyBtn" aria-label="Day. Tap for night.">${Pg}</button>`;const a=e.querySelector("button"),r=h=>{o=h;const m=document.documentElement,k=Math.max(0,Math.min(1,h.glow));m.style.setProperty("--sky-opacity",h.opacity.toFixed(3)),m.style.setProperty("--sky-map-opacity",h.map.toFixed(3)),m.style.setProperty("--sky-glow",k.toFixed(3)),m.style.setProperty("--sky-stars",h.stars.toFixed(3)),m.style.setProperty("--sky-glass",h.glass.toFixed(3)),m.style.setProperty("--sky-tint",h.tint),m.style.setProperty("--sky-body",h.body),m.style.setProperty("--sky-page-a",h.pageA),m.style.setProperty("--sky-page-b",h.pageB),m.style.setProperty("--sky-spot",h.spot),m.style.setProperty("--sky-field-a",h.fieldA),m.style.setProperty("--sky-field-b",h.fieldB),m.style.setProperty("--sky-win",h.win),m.style.setProperty("--sky-win-2",h.win2),m.style.setProperty("--sky-house-win",h.house),m.style.setProperty("--sky-map-tint",h.mapTint),m.style.setProperty("--sky-glow-soft",`rgba(255, 186, 80, ${(k*.72).toFixed(3)})`),m.style.setProperty("--sky-glow-hot",`rgba(255, 220, 120, ${(k*.96).toFixed(3)})`),m.style.setProperty("--sky-glow-clear","rgba(255, 186, 80, 0)"),m.style.setProperty("--sky-glow-wash",`rgba(255, 170, 70, ${(k*.55).toFixed(3)})`),m.style.setProperty("--sky-glow-map",`rgba(255, 196, 110, ${(k*.7).toFixed(3)})`);const _=h.phase==="golden"?.24:h.phase==="dawn"?.22:0,y=h.phase==="golden"?"186, 110, 52":"140, 62, 18";m.style.setProperty("--sky-shadow",`rgba(${y}, ${_.toFixed(3)})`);const u=h.phase==="night"?.55:h.phase==="golden"?.08:h.phase==="dawn"?.16:0;m.style.setProperty("--sky-vig",`rgba(12, 10, 32, ${u.toFixed(3)})`);const v=h.phase==="golden"?"255, 196, 80":h.phase==="dawn"?"255, 214, 230":"255, 246, 214";m.style.setProperty("--sky-orb",`rgba(${v}, ${Math.min(1,h.glass).toFixed(3)})`),m.dataset.sky=h.phase,m.dataset.skyChoice=n,m.classList.toggle("sky-static",t),m.classList.toggle("sky-live",!t),a.innerHTML=j7[n],a.setAttribute("aria-label",`${Df[n]}. Tap for ${Df[Af[n]].toLowerCase()}.`)},l=()=>Bf(s??new Date,n),c=()=>r(l()),f=()=>{i&&clearInterval(i),i=window.setInterval(()=>{s||c()},t?6e4:1e3)},d=h=>{n=h;try{localStorage.setItem(Nt(Sg),n)}catch{}c()};a.addEventListener("click",()=>d(Af[n])),document.documentElement.classList.toggle("sky-static",t),c(),f();const g=document.getElementById("mapWorld");g&&X7(g);try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change",()=>{const m=Rf();document.documentElement.classList.toggle("sky-static",m),document.documentElement.classList.toggle("sky-live",!m)})}catch{}try{matchMedia(G7).addEventListener?.("change",()=>ha())}catch{}return window.addEventListener("resize",()=>ha()),new MutationObserver(()=>ha()).observe(document.body,{attributes:!0,attributeFilter:["class"]}),{choice:()=>n,look:()=>o,setChoice(h){d(h)},freeze(h){s=h,c()}}}function ha(){const e=document.getElementById("skyMount"),t=document.getElementById("menuDaySlot");e&&t&&e.parentElement!==t&&t.appendChild(e),t&&(t.hidden=!1),e&&(e.style.left="",e.style.top="")}function X7(e){const t=document.createElement("div");t.className="skyTint",t.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="skyLamps",n.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="skyBits",s.setAttribute("aria-hidden","true"),s.innerHTML='<i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i>';const o=()=>{e.contains(t)||e.appendChild(t),e.contains(n)||e.appendChild(n),e.contains(s)||e.appendChild(s)};o(),new MutationObserver(o).observe(e,{childList:!0})}function J7(){try{const e=localStorage.getItem(Nt(Sg));if(q7(e))return e}catch{}return"auto"}const io=[{name:"Pink",fill:"#ff7eb3",ink:"#9d174d"},{name:"Lilac",fill:"#c9b3ff",ink:"#5f3dc4"},{name:"Aqua",fill:"#66d9e8",ink:"#0b7285"},{name:"Gold",fill:"#ffd43b",ink:"#e67700"}],gt="#5a3d5c",il=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),If=e=>typeof e=="number"?e:{skip:10,rev:11,d2:12,wild:13,w4:14}[e]??0,Hf=e=>typeof e.v=="number"?String(e.v):e.v==="skip"?"✕":e.v==="rev"?"↻":e.v==="d2"?"+2":e.v==="w4"?"+4":"♛",eM=e=>e.v==="skip"?"Nope":e.v==="rev"?"Flip":e.v==="d2"?"+2":e.v==="wild"||e.v==="w4"?"Crown":"",ks=(e,t,n=1,s="#ffd43b")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -6 L1.4 -1.4 L6 -1 L1.6 1.4 L3 6 L0 3 L-3 6 L-1.6 1.4 L-6 -1 L-1.4 -1.4 Z" fill="${s}" stroke="${gt}" stroke-width="1" stroke-linejoin="round"/>`,ua=(e,t,n=1)=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 1.2 C-2.2 -1.6 -5.2 -0.6 -3.6 2.2 C-2.4 4 0 5.2 0 5.2 C0 5.2 2.4 4 3.6 2.2 C5.2 -0.6 2.2 -1.6 0 1.2 Z" fill="#ff4d94" stroke="${gt}" stroke-width="1"/>`;function tM(e){return e.v==="wild"||e.v==="w4"?`<g transform="translate(14 28)">
      <path d="M4 26 L10 8 L18 16 L24 2 L30 16 L38 8 L44 26 Z" fill="#ffd43b" stroke="${gt}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="4" y="26" width="40" height="8" rx="2" fill="#ffd43b" stroke="${gt}" stroke-width="2.2"/>
      <circle cx="10" cy="8" r="2.4" fill="#ff7eb3"/><circle cx="24" cy="3" r="2.4" fill="#66d9e8"/><circle cx="38" cy="8" r="2.4" fill="#d0bfff"/>
      ${ks(-2,0,.7)}${ks(46,4,.65,"#fff")}${ks(22,-4,.55,"#ff7eb3")}
    </g>${e.v==="w4"?`<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${gt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">+4</text>`:""}`:e.v==="d2"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff" stroke="${gt}" stroke-width="2.4"/>
      ${ua(14,8,1.35)}${ua(32,8,1.35)}
      <path d="M12 26 Q23 34 34 26" fill="none" stroke="${gt}" stroke-width="2.4" stroke-linecap="round"/>
      ${ua(40,22,.8)}
    </g>`:e.v==="rev"?`<g fill="none" stroke="${gt}" stroke-width="3.2" stroke-linecap="round">
      <path d="M16 40 C42 22 54 52 34 60 C16 68 12 46 30 40"/>
      <path d="M14 38 L22 30 L24 42" stroke-linejoin="round"/>
    </g>${ks(48,28,.85)}${ks(20,62,.6,"#ff7eb3")}${ks(50,58,.55,"#66d9e8")}`:e.v==="skip"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff6d8" stroke="${gt}" stroke-width="2.4"/>
      <rect x="8" y="12" width="14" height="9" rx="3" fill="#2b1430"/><rect x="24" y="12" width="14" height="9" rx="3" fill="#2b1430"/>
      <path d="M22 16.5 H24 M5 14 H2 M41 14 H44" stroke="${gt}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 27 Q23 32 34 27" fill="none" stroke="${gt}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`:""}function Gl(e){const t=e.c===4,n=t?{fill:"#fff8ee",ink:gt}:io[e.c]??io[0],s=typeof e.v=="number",o=eM(e),i=t?'<rect x="2" y="2" width="66" height="96" rx="13" fill="#fff8ee" stroke="#ff7eb3" stroke-width="4"/><rect x="5" y="5" width="60" height="90" rx="11" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="7.5" y="7.5" width="55" height="85" rx="9" fill="none" stroke="#66d9e8" stroke-width="1.6"/><rect x="9.5" y="9.5" width="51" height="81" rx="8" fill="none" stroke="#ffd43b" stroke-width="1.6"/>':`<rect x="2" y="2" width="66" height="96" rx="13" fill="${n.fill}" stroke="${gt}" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`,a='<ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/>',r=`fill="${n.ink}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif"`,l=`<text x="8" y="16" font-size="13" font-weight="900" ${r}>${Hf(e)}</text>`+(s?`<text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" ${r}>${Hf(e)}</text>`:""),c=s?`<text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="${n.ink}" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${e.v}</text>`:`${tM(e)}${o?`<text x="35" y="92" text-anchor="middle" font-size="12" font-weight="900" ${r}>${o}</text>`:""}`;return`<svg viewBox="0 0 70 100">${i}${a}${l}${c}</svg>`}const nM=[[18,28],[40,28],[29,46],[18,64],[40,64],[29,78]].map(([e,t])=>ua(e,t,.9)).join(""),sM=`<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff4d94" stroke="${gt}" stroke-width="3"/>
  <rect x="7" y="7" width="56" height="86" rx="10" fill="none" stroke="#ffd43b" stroke-width="3"/>
  <rect x="11" y="11" width="48" height="78" rx="8" fill="#ff7eb3"/>
  ${nM}
  <circle cx="35" cy="50" r="14" fill="#fff6fb" stroke="${gt}" stroke-width="2.4"/>
  ${ks(35,50,1.15,"#ffd43b")}
</svg>`,Tg=(e,t)=>{if(t.turn<0||t.drawn!=null&&e.id!==t.drawn)return!1;const n=t.top;return e.c===4||e.c===t.color||e.v===n.v&&n.c!==4};let Yl=null,Et=null,to=-1,Of=-1;function Wf(e,t){Yl=e;const n=t.table,s=n.view;if(!s||!s.top){e.innerHTML="";return}n.tb!==Of&&(Et=null,to=-1,Of=n.tb);const o=n.you,i=o!==null&&Array.isArray(s.hand)?s.hand.slice():[];Et!==null&&!i.some(u=>u.id===Et)&&(Et=null);const a=s.ev;let r=null;if(a&&a.n!==to&&to>=0&&a.k==="play"&&a.card){const u=e.querySelector(`[data-card="${a.card.id}"]`)||e.querySelector(`[data-p="${a.p}"]`);u&&(r=u.getBoundingClientRect())}const c=n.phase==="play"&&s.turn>=0,f=c&&o!==null&&s.turn===o,d=o!==null&&i.length<=2&&i.length>0&&!s.slay?.[o]&&f,g=f&&s.drawn==null&&n.phase==="play",h=f&&s.drawn!=null&&n.phase==="play",m=i.sort((u,v)=>u.c-v.c||If(u.v)-If(v.v)),k=c?n.players[s.turn]:"",_=c?f?"Your turn!":`${il(t.name(k))}'s turn`:"",y=io[s.color]??io[0];if(e.innerHTML=`<div class="slayFelt">
    ${_?`<div class="whose ${f?"yours":""}" id="whoseTurn">${_}<span class="slayDir" aria-hidden="true">${s.dir===1?"→":"←"}</span></div>`:""}
    <div class="slayOpps">${n.players.map((u,v)=>v===o?"":`<div class="slayOpp ${s.turn===v?"isTurn":""}" data-p="${v}" data-count="${s.counts?.[v]??0}"><span class="chipFace">${t.face(u)}</span><b>${il(t.name(u))}</b><span class="cnt">${s.counts?.[v]??0}</span>${t.away(u)?'<i class="awayBadge">away</i>':""}${s.slay?.[v]?"<em>SLAY!</em>":""}</div>`).join("")}</div>
    <div class="slayPile">
      <button type="button" id="slayDeck" class="slayDeck" ${g?"":"disabled"} aria-label="Draw a card">${sM}<span>${s.deck??0}</span></button>
      <div id="slayDiscard" class="slayDiscard" data-top="${s.top.id}">${Gl(s.top)}</div>
      <div class="nowColor" data-color="${s.color}" style="background:${y.fill}" aria-label="${y.name}"></div>
    </div>
    ${o===null?'<p class="watching">You are watching</p>':""}
    ${Et!==null?`<div id="crownPick" class="crownPick"><p>Pick a color for your Crown!</p><div class="crownRow">${io.map((u,v)=>`<button type="button" data-color="${v}" aria-label="${u.name}" style="background:${u.fill}"><span>${u.name}</span></button>`).join("")}</div></div>`:""}
    <div id="slayHand" class="slayHand ${f?"isTurn":""}">${m.map(u=>{const v=f&&n.phase==="play"&&Tg(u,s),x=v?"can":f?"dim":"wait",A=typeof u.v=="number"?io[u.c].name+" "+u.v:u.v==="wild"?"Crown":u.v==="w4"?"Crown plus 4":u.v==="d2"?"plus 2":u.v==="rev"?"Flip":"Nope";return`<button type="button" class="slayCard ${x} ${u.id===s.drawn?"justDrew":""} ${u.id===Et?"picked":""}" data-card="${u.id}" data-c="${u.c}" data-v="${u.v}" aria-label="${il(A)}" ${v?"":"disabled"}>${Gl(u)}</button>`}).join("")}</div>
    ${c&&o!==null?`<button type="button" id="slayCall" class="slayCall ${d?"ready":""}" ${d?"":"disabled"}>SLAY!</button>`:""}
    <button type="button" id="slayPass" class="slayPass ${h?"":"hidden"}" ${h?"":"disabled"}>Pass</button>
  </div>`,a&&a.n!==to){const u=to;if(to=a.n,u>=0){if(a.k==="play"&&a.card){const v=e.querySelector("#slayDiscard");v&&oM(r,a.card,v.getBoundingClientRect()),a.card.v==="skip"?t.toast("Nope!"):a.card.v==="rev"?t.toast("Flip!"):a.card.v==="d2"?t.toast("+2!"):a.card.v==="w4"&&t.toast("Crown +4!"),t.sfx.swish()}a.vdrew&&t.toast("Forgot to say SLAY! Draw 2"),a.k==="slay"&&t.sfx.sparkle()}}}function oM(e,t,n){const s=document.createElement("div");s.className="flyCard",s.innerHTML=Gl(t);const o=e?.width||70,i=e?.height||100;Object.assign(s.style,{left:(e?.left??innerWidth/2)+"px",top:(e?.top??80)+"px",width:o+"px",height:i+"px"}),document.body.appendChild(s),requestAnimationFrame(()=>{s.style.left=n.left+"px",s.style.top=n.top+"px",s.style.width=Math.max(n.width,70)+"px",s.style.height=Math.max(n.height,96)+"px"}),setTimeout(()=>s.remove(),560)}const iM={id:"slay",render:Wf,handle(e,t){const n=t.table.view,s=t.table.you;if(!n||t.table.phase!=="play"||s===null)return!1;const o=n.hand??[];if(e.closest("#slayCall"))return o.length<=2&&o.length>0&&!n.slay?.[s]&&(t.move({k:"slay"}),t.sfx.sparkle()),!0;if(e.closest("#slayDeck"))return n.turn===s&&n.drawn==null&&(Et=null,t.move({k:"draw"}),t.sfx.click()),!0;if(e.closest("#slayPass"))return n.turn===s&&n.drawn!=null&&(Et=null,t.move({k:"pass"}),t.sfx.click()),!0;const i=e.closest("#crownPick [data-color]");if(i&&Et!==null)return t.move({k:"play",id:Et,color:+i.dataset.color}),Et=null,t.sfx.sparkle(),!0;const a=e.closest("#slayHand [data-card]");if(!a||a.hasAttribute("disabled"))return!!a;const r=+a.dataset.card,l=o.find(c=>c.id===r);return!l||n.turn!==s||!Tg(l,n)||(l.c===4?(Et=r,t.sfx.pop(),Yl&&Wf(Yl,t)):(Et=null,t.move({k:"play",id:r}),t.sfx.click())),!0}},Bg="#5a3d5c",Uf=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),aM=`<svg viewBox="0 0 48 48"><path d="M24 42 C8 30 2 22 7 13 C11 6 20 8 24 16 C28 8 37 6 41 13 C46 22 40 30 24 42 Z" fill="#ff4d94" stroke="${Bg}" stroke-width="3" stroke-linejoin="round"/><path d="M16 16 Q20 12 22 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`,rM=`<svg viewBox="0 0 48 48"><path d="M24 3 L29 17 H44 L32 26 L37 42 L24 33 L11 42 L16 26 L4 17 H19 Z" fill="#66d9e8" stroke="${Bg}" stroke-width="3" stroke-linejoin="round"/><path d="M24 12 L26 18 H22 Z" fill="#fff" opacity=".8"/></svg>`,lM={id:"four",render(e,t){const n=t.table,s=n.view;if(!s||!Array.isArray(s.b)){e.innerHTML="";return}const o=n.you,i=o!==null&&s.turn===o&&n.phase==="play",a=new Set((s.line??[]).map(([k,_])=>k+":"+_)),r=s.last;let l="";for(let k=0;k<7;k++){const _=s.b[k];let y="";for(let v=5;v>=0;v--){const x=v<_.length?_[v]:null,A=a.has(k+":"+v)?" hot":"",O=r&&r.col===k&&r.row===v?" just":"";y+=`<span class="fourCell${x===0?" heart":x===1?" star":""}${A}${O}">${x===0?aM:x===1?rM:""}</span>`}const u=i&&_.length<6;l+=`<button type="button" class="fourCol" data-col="${k}" ${u?"":"disabled"} aria-label="Drop in column ${k+1}">${y}<span class="dropHint">${u?"▼":""}</span></button>`}const c=n.phase==="play"&&s.turn>=0,f=c?n.players[s.turn]:"",d=c?i?"Your turn!":`${Uf(t.name(f))}'s turn`:"",g=o===0?"You are <b>pink hearts</b>":o===1?"You are <b>aqua stars</b>":"Pink hearts and aqua stars",h=k=>k===0?"♥":"★",m=n.players.map((k,_)=>`<div class="playerChip ${s.turn===_?"isTurn":""}"><span class="chipFace">${t.face(k)}</span><b>${Uf(t.name(k))} ${h(_)}</b>${t.away(k)?'<i class="awayBadge">away</i>':""}</div>`).join("");e.innerHTML=`<div class="fourPlay">
      ${d?`<div class="whose ${i?"yours":""}" id="whoseTurn">${d}</div>`:""}
      <div class="fourChips">${m}</div>
      <p class="fourLegend">${g}</p>
      <div class="fourBoard" id="fourBoard">${l}</div>
    </div>`},handle(e,t){const n=e.closest(".fourCol");if(!n)return!1;const s=t.table.view,o=t.table.you;if(n.hasAttribute("disabled")||!s||o===null||s.turn!==o||t.table.phase!=="play")return!0;const i=+n.dataset.col;return!Number.isInteger(i)||s.b[i].length>=6||(t.move({col:i}),t.sfx.click()),!0}},Vf={slay:iM,four:lM},ea=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),cM={notHere:"Come into the clubhouse first!",taken:"Someone is sitting there!",playing:"You are already in this game!",playingElsewhere:"Finish your other game first!",notHost:"Waiting for the host…",needMore:"Play with friends on your street",tooMany:"That table is full!",notPlaying:"The game has not started!",notPlayer:"Sit down to play!",illegal:"You can't play that!",notAway:"She is still here!",tooSoon:"Give her a moment!",notSeated:"You are not at this table!",noMove:"No move to play!"};function dM(e){const t=document.getElementById("tableOverlay");let n=null,s="",o=0;const i=y=>y.away==null?0:y.away+Math.max(0,Date.now()-(y.receivedAt??Date.now())),a=()=>{o&&(clearInterval(o),o=0)},r=y=>{const u=!!y&&y.phase==="play"&&y.away!=null&&n!==null;u&&!o&&(o=window.setInterval(()=>d(),1e3)),u||a()},l=()=>e.hood(),c=()=>{const y=l();return!y||n===null?null:y.tables.get(n)??null},f=y=>{const u=l();return{table:y,me:u.pid,name:v=>u.players.get(v)?.nickname??"friend",face:v=>{const x=u.players.get(v)?.look;return x?gc(bt(x)):""},move:v=>u.tbl({op:"move",tb:y.tb,m:v}),away:v=>{if(v===u.pid)return!1;const x=u.players.get(v);if(x&&!x.online)return!0;const A=u.presence.get(v);return!A||A.where!=="gameroom"},toast:e.toast,sfx:e.sfx}};t.addEventListener("click",y=>{const u=y.target;if(u.closest("#tblBack")){h(),e.sfx.swish();return}if(u.closest("#tblLeave")){m();return}if(u.closest("#tblStart")){k();return}if(u.closest("#tblNudge")){_();return}const v=c();v&&Vf[v.game]?.handle(u,f(v))});function d(){const y=l(),u=c();if(!y||!u){t.classList.add("hidden"),t.innerHTML="",a();return}const v=Rp[u.game],x=y.pid,A=u.seats.includes(x),O=u.seats.filter(Boolean).length,H=u.phase==="play"&&u.you!==null&&u.view&&u.view.turn===u.you,X=u.view?.winPid??null;let le="";if(u.phase==="over"){const T=X?y.players.get(X)?.nickname??"Friend":"";u.game==="slay"?le=X?X===x?"You slayed!":`${ea(T)} slayed!`:"It's a tie!":le=u.view?.draw||!X?"It's a tie!":X===x?"You got four!":`${ea(T)} got four!`;const R=u.tb+":"+u.seq;X===x&&s!==R&&(s=R,e.confetti(),e.sfx.sparkle())}const ce=i(u),G=u.phase==="play"&&A&&ce>=Xu&&u.you!==null&&!!u.view&&u.view.turn!==u.you&&u.view.turn>=0,fe=u.phase!=="play"&&u.host===x&&O>=v.minPlayers&&O<=v.maxPlayers,on=A&&u.phase==="lobby"&&u.host!==x&&O>=v.minPlayers,Ot=A&&u.phase==="lobby"&&O<v.minPlayers;t.classList.remove("hidden"),t.dataset.tb=String(u.tb),t.dataset.phase=u.phase,t.dataset.game=u.game,t.dataset.you=u.you===null?"":String(u.you),t.innerHTML=`<div class="tblCard ${H?"yourTurn":""} game-${u.game}">
      <div class="tblTop"><h2>${ea(v.name)}</h2><div class="seatDots">${u.seats.map(T=>`<i class="${T?"on":""} ${T===x?"me":""}"></i>`).join("")}</div></div>
      ${le?`<div class="winWrap"><div class="winBanner" id="winBanner">${le}</div></div>`:""}
      <div id="tblStage"></div>
      <div class="tblBar">
        ${fe?'<button type="button" id="tblStart">Start</button>':""}
        ${on?'<p class="tblWait">Waiting for the host…</p>':""}
        ${G?'<button type="button" id="tblNudge">Play for her</button>':""}
        <button type="button" id="tblBack">Back to room</button>
        <button type="button" id="tblLeave">Leave table</button>
      </div>
      ${Ot?'<p class="tblWait" id="needFriend">Play with friends on your street</p>':""}
    </div>`;const Ze=t.querySelector("#tblStage");u.phase==="lobby"||!u.view?Ze.innerHTML=g(u,y,x):Vf[u.game]?.render(Ze,f(u)),r(u)}function g(y,u,v){return`<div class="lobby">${y.seats.map((x,A)=>`<div class="lobbySeat ${x?"filled":""} ${x===v?"me":""}">
      <span>${A+1}</span><b>${x?ea(u.players.get(x)?.nickname??"friend"):"Empty"}</b>
      ${x&&x===y.host?"<i>host</i>":""}${x===v?"<i>you</i>":""}
    </div>`).join("")}</div>`}function h(){n=null,a(),t.classList.add("hidden"),t.innerHTML=""}function m(){const y=l(),u=c();y&&u&&u.seats.includes(y.pid)&&y.tbl({op:"leave",tb:u.tb}),e.sfx.click(),h()}function k(){const y=l(),u=c();y&&u&&(y.tbl({op:"start",tb:u.tb}),e.sfx.sparkle())}function _(){const y=l(),u=c();y&&u&&(y.tbl({op:"nudge",tb:u.tb}),e.sfx.click())}return{open(y){n=y,d()},close:h,refresh:d,fail(y,u){e.toast(cM[u]||"Try that again!"),e.sfx.pop(),n===y&&d()},isOpen:()=>n}}const Rg="/kids-house-game/assets/rug-zTS04c1f.webp",fM=Object.freeze(Object.defineProperty({__proto__:null,default:Rg},Symbol.toStringTag,{value:"Module"})),Ag="/kids-house-game/assets/pack~bean-bag-m3eBc9mA.webp",pM=Object.freeze(Object.defineProperty({__proto__:null,default:Ag},Symbol.toStringTag,{value:"Module"})),Dg="/kids-house-game/assets/pack~sv-bean-bag-TrtltuSt.webp",gM=Object.freeze(Object.defineProperty({__proto__:null,default:Dg},Symbol.toStringTag,{value:"Module"})),hM=120,uM=192,mM=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let J=null,Yn=null,Mn=null,zf=!1;const Ig=960,yM=e=>!!e&&!document.body.classList.contains("phone")&&e.clientHeight>e.clientWidth+40,is=()=>{const e=document.getElementById("gameroom"),t=e?.clientHeight||600;return yM(e)?Math.min(t/vo,e.clientWidth/Ig):t/vo},ma=()=>Yn;function Co(){const e=J?.hood();if(!e)return null;for(const[t,n]of e.tables){const s=n.seats.indexOf(e.pid);if(s>=0){const o=Ri(Number(t))[s];return{tb:Number(t),seat:s,x:o.x,y:o.y}}}return null}function bM(){const e=J?.hood();if(!e)return!1;for(const[t,n]of e.players)if(t!==e.pid&&n.online)return!0;return!1}function kM(e){if(J=e,Yn=dM({hood:e.hood,toast:e.toast,confetti:()=>jp(),sfx:e.sfx}),zf)return Yn;zf=!0;const t=document.getElementById("grWorld");return t.addEventListener("click",vM),t.addEventListener("pointerdown",n=>{n.target.closest(".grChair, .grTable, .grDoor, .pet")&&n.stopPropagation()}),Yn}function Zc(){if(!J)return;const e=is(),t=document.getElementById("grWorld"),n=l=>l*e+"px";t.style.width=Ei*e+"px",t.style.height=vo*e+"px",t.style.setProperty("--sc",String(e));const s=document.getElementById("gameroom"),o=(s?.clientHeight||0)-6-vo*e,i=o>1?Math.round(o*.55):0,a=o>1?Math.ceil(o-i)+6:0;t.style.marginTop=i?i+"px":"";let r=v7();i&&(r+=`<div class="grExtWrap" style="top:${-i}px;height:${i}px">${Cf("top",i/e)}</div>`),s&&(s.style.background=i?"linear-gradient(180deg, #ffe0f2 0 50%, #d27399 50%)":""),a&&(r+=`<div class="grExtWrap" style="top:100%;height:${a}px">${Cf("bottom",a/e)}${MM(e,a,s?.clientWidth||0)}</div>`),r+=`<button class="grDoor" data-gr="map" aria-label="Back to the map" style="left:${n(78)};top:${n(268)};width:${n(86)};height:${n(170)}"></button>`,As.forEach((l,c)=>{const f=l.seats>=6?560:l.seats>=4?440:340;r+=`<button class="grTable" data-tb="${c}" aria-label="${Rp[l.game].name} table" style="left:${n(l.x-f/2)};top:${n(456)};width:${n(f)};height:${n(70)}"></button>`,Ri(c).forEach((d,g)=>{const h=76*e,m=72*e,k=Math.max(h,44),_=Math.max(m,44),y=(d.x-38)*e-(k-h)/2,u=(d.y-16)*e-(_-m)/2;r+=`<button class="grChair" data-tb="${c}" data-seat="${g}" aria-label="Empty chair" style="left:${y}px;top:${u}px;width:${k}px;height:${_}px"></button>`})}),r+='<div class="savatars" id="gavatars"></div>',t.innerHTML=r,ai()}function ai(){if(!J||J.view()!=="gameroom")return;const e=document.getElementById("gavatars");if(!e)return;const t=is(),n=new Set;for(const i of wM()){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&xM(a));const r=JSON.stringify(i.look)+i.name+(i.away?":away":"");if(a.dataset.look!==r){const g=a.querySelector(".bubble");a.innerHTML=`<div class="inner">${bt(i.look)}</div>${i.name?`<div class="nametag">${mM(i.name)}${i.away?'<i class="awayBadge">away</i>':""}</div>`:""}`,g&&a.appendChild(g),a.dataset.look=r}const l=(Os[i.look.size]??1)*t*.95,c=hM*l,f=uM*l,d=i.seated?i.y-8:i.y;a.style.left=i.x*t-c/2+"px",a.style.top=d*t-f+"px",a.style.width=c+"px",a.style.height=f+"px",a.style.zIndex=String(100+Math.round(i.y)),a.classList.toggle("flipped",i.flip),a.classList.toggle("away",i.away),a.classList.toggle("seated",i.seated),Ti(a,i.look,i.mine)}e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),J.refreshNear();const s=J.hood();document.querySelectorAll("#grWorld .grChair").forEach(i=>{const a=s?.tables.get(+i.dataset.tb)?.seats[+i.dataset.seat];i.classList.toggle("taken",!!a);const r=a?s.players.get(a)?.nickname:"";i.setAttribute("aria-label",r?r+" is sitting":"Empty chair")});const o=document.getElementById("grSolo");o&&o.classList.toggle("hidden",bM())}function wM(){const e=[],t=J.hood();if(t){const n=new Map;for(const[a,r]of t.tables)r.seats.forEach((l,c)=>{l&&n.set(l,Ri(Number(a))[c])});const s=[...t.presence.entries()],o=J.myPres();o&&s.push([t.pid,o]);const i=new Set;for(const[a,r]of s){if(r.where!=="gameroom")continue;const l=t.players.get(a);if(!l)continue;i.add(a);const c=n.get(a);e.push({key:a,look:l.look,name:l.nickname,x:c?.x??r.x,y:c?.y??r.y,flip:r.flip,mine:a===t.pid,away:!1,seated:!!c})}for(const[a,r]of n){if(i.has(a))continue;const l=t.players.get(a);l&&e.push({key:a,look:l.look,name:l.nickname,x:r.x,y:r.y,flip:!1,mine:!1,away:!0,seated:!0})}}else{const n=J.solo();if(n?.where==="gameroom"){const s=J.soloLook();e.push({key:"solo",look:s.look,name:"",x:n.x,y:n.y,flip:n.flip,mine:!0,away:!1,seated:!1})}}return e}function vM(e){if(!J||J.view()!=="gameroom")return;const t=e.target,n=t.closest(".savatar");if(n){const c=J.hood(),f=n.dataset.pid;if(c&&f){for(const[d,g]of c.tables)if(g.seats.includes(f)){Yn?.open(Number(d));return}}return}if(t.closest('[data-gr="map"]')){J.goMap();return}const s=t.closest(".grChair");if(s){_M(+s.dataset.tb,+s.dataset.seat);return}const o=t.closest(".grTable");if(o){if(!J.hood()){Hg();return}Yn?.open(+o.dataset.tb),J.sfx.click();return}if(t.closest(".pet")||Co())return;const i=document.getElementById("grWorld").getBoundingClientRect(),a=is(),r=(e.clientX-i.left)/a,l=(e.clientY-i.top)/a;l<430||(Mn={x:Math.max(60,Math.min(Ei-60,r)),y:Math.max(470,Math.min(590,l))})}function _M(e,t){if(!J)return;const n=J.hood();if(!n){Hg();return}const s=n.tables.get(e)?.seats[t];if(s&&s!==n.pid){J.toast((n.players.get(s)?.nickname??"Someone")+" is sitting there!"),J.sfx.pop(),Yn?.open(e);return}Mn=null,n.tbl({op:"sit",tb:e,seat:t});const o=Ri(e)[t];J.setPres({where:"gameroom",x:o.x,y:Math.max(470,Math.min(590,o.y)),flip:!1}),Yn?.open(e),J.sfx.click()}function Hg(){if(!J)return;const e=document.getElementById("grSolo");e&&(e.classList.remove("hidden"),e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),J.toast("Play with friends on your street"),J.sfx.pop()}function $M(e){if(!J||J.view()!=="gameroom"||!Mn)return;if(Co()){Mn=null;return}const t=J.hood()?J.myPres():J.solo();if(!t||t.where!=="gameroom"){Mn=null;return}const n=Mn.x-t.x,s=Mn.y-t.y,o=Math.hypot(n,s);if(o<4){Mn=null;return}const i=Math.min(o,300*e),a={where:"gameroom",x:t.x+n/o*i,y:t.y+s/o*i,flip:Math.abs(n)>2?n<0:t.flip};J.setPres(a);const r=is(),l=document.getElementById("grScroll"),c=a.x*r-l.scrollLeft;(c<l.clientWidth*.22||c>l.clientWidth*.78)&&(l.scrollLeft=a.x*r-l.clientWidth/2)}function xM(e){e.addEventListener("pointerdown",t=>{if(!J||Co())return;const n=J.hood()?J.myPres():J.solo();if(!n||n.where!=="gameroom")return;t.preventDefault(),t.stopPropagation(),Mn=null;const s=is(),o=document.getElementById("grWorld"),i=document.getElementById("grScroll"),a=y=>{const u=o.getBoundingClientRect();return{x:(y.clientX-u.left)/s,y:(y.clientY-u.top)/s}},r=a(t),l={x:n.x-r.x,y:n.y-r.y};let c=t,f=0,d=n.x,g=!1;const h=y=>{const u=J.hood()?J.myPres():J.solo();if(!u||u.where!=="gameroom")return;const v=a(y),x=Math.max(60,Math.min(Ei-60,v.x+l.x)),A=Math.max(470,Math.min(590,v.y+l.y));if(!g&&Math.hypot(x-u.x,A-u.y)<6)return;g=!0;const O=Math.abs(x-d)>3?x<d:u.flip;Math.abs(x-d)>3&&(d=x),J.setPres({where:"gameroom",x,y:A,flip:O})},m=()=>{const y=i.getBoundingClientRect(),u=c.clientX<y.left+70?-12:c.clientX>y.right-70?12:0;u&&g&&(i.scrollLeft+=u,h(c)),f=requestAnimationFrame(m)};f=requestAnimationFrame(m),e.classList.add("lifted"),J.sfx.pick();const k=y=>{y.pointerId===t.pointerId&&(c=y,h(y))},_=y=>{y.pointerId===t.pointerId&&(cancelAnimationFrame(f),window.removeEventListener("pointermove",k),window.removeEventListener("pointerup",_),e.classList.remove("lifted"),g&&J.sfx.drop())};window.addEventListener("pointermove",k),window.addEventListener("pointerup",_)})}function MM(e,t,n){if(t<120)return"";const s=n?Math.min(As[0].x*e,n/2):As[0].x*e,o=Math.min(560*e*1.2,t*1.7),i=o*306/960,a=Math.max(8,(t-i)*.45),r=o*.26,l=r*.78,c=(f,d,g,h,m=!1)=>`<img class="grDecor" src="${f}" alt="" aria-hidden="true" draggable="false" style="left:${d}px;top:${g}px;width:${h}px${m?";transform:scaleX(-1)":""}">`;return`<div class="grDecor grRug" aria-hidden="true" style="left:${s-o/2}px;top:${a}px;width:${o}px;height:${i}px"><img src="${Rg}" alt="" draggable="false" style="width:${o}px;margin-top:${-o*634/960}px"></div>`+c(Ag,s-o/2-r*.35,a+i*.45-l*.6,r)+c(Dg,s+o/2-r*.65,a+i*.45-l*.6,r*1.02,!0)}const Go=O7(),K=Tp();K.born&&typeof navigator<"u"&&!navigator.webdriver&&!K.get().baby&&K.dispatch({type:"baby/meet",now:Date.now()});let Ie=K;const Og=[],Qf=new WeakSet;function Wg(e){Qf.has(e)||(Qf.add(e),e.subscribe((t,n)=>{Ie===e&&Og.forEach(s=>s(t,n))}))}Wg(K);const C={get:()=>Ie.get(),dispatch(e){Ie.dispatch(e)},subscribe:e=>{Og.push(e)}},_e=Tt,ze=En,_o=390;let re=1e3;const Ws=()=>Math.max(0,_e-re),Ug=375,Vg=(e,t)=>e.wall?Math.min(t,Ug):t,zg=12,js=(e,t)=>e.wall?t:Math.min(t,ze-zg),as=120,un=192,Nc=[{id:"living",name:"Living Room",color:"#ff8fab"},{id:"bedroom",name:"Bedroom",color:"#b388d6"},{id:"kitchen",name:"Kitchen",color:"#5cc985"},{id:"salon",name:"Salon",color:"#f0a0d8"},{id:"nursery",name:"Nursery",color:"#9ad7f5"},{id:"bathroom",name:"Bathroom",color:"#7ec8d6"}],Qg=e=>Nc.find(t=>t.id===e)?.color??"#ccc",Fc=N3();E5(bn,Me);const $o=[{id:"__people",name:"People",icon:"",kind:"people"},...["furniture","decor","plants","food","pets"].map((e,t)=>({id:e,name:e,icon:["armchair","balloon","flowers","donut","cat"][t],kind:"cat"}))];$o.push({id:"secrets",name:"Secrets",icon:"egg:chloe-starlamp",kind:"cat"});for(const e of bn)$o.some(t=>t.kind==="cat"&&t.id===e.cat)||$o.push({id:e.cat,name:e.cat,icon:e.kind,kind:"cat"});for(const e of bn)e.pack&&!$o.some(t=>t.id==="pack:"+e.pack)&&$o.push({id:"pack:"+e.pack,name:Gp(e.pack),icon:e.kind,kind:"pack"});const al=e=>bn.filter(t=>Ux(t,e,C.get().currentRoom,jc==="all",_r())),LM=["#ffd6e0","#d9ccff","#cdf3dc","#cfe8ff","#fff1b8","#ffe0c7","#ffffff","#f6c1ff"],EM=["#e8b98a","#f2d0a4","#c99366","#ffe7a8","#bfe3d0","#d6d6f5","#ffc8dd","#9fb4c7"],Ut={paint:'<svg viewBox="0 0 48 48"><path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M28 12 L34 6 L42 14 L36 20" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/></svg>',shirt:'<svg viewBox="0 0 48 48"><path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',soundOn:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 17 Q37 24 32 31 M36 12 Q45 24 36 36" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',soundOff:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ddd" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M33 19 L43 29 M43 19 L33 29" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',flip:'<svg viewBox="0 0 48 48"><path d="M24 6 V42" stroke="#5a3d5c" stroke-width="3" stroke-dasharray="4 4"/><path d="M18 12 L6 36 H18 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M30 12 L42 36 H30 Z" fill="#fff" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',front:'<svg viewBox="0 0 48 48"><rect x="6" y="6" width="22" height="22" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="18" y="18" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',back:'<svg viewBox="0 0 48 48"><rect x="18" y="18" width="24" height="24" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="22" height="22" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',trash:'<svg viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="28" rx="5" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><rect x="8" y="9" width="32" height="7" rx="3.5" fill="#ffadad" stroke="#5a3d5c" stroke-width="3"/><path d="M20 21 V35 M28 21 V35" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',smaller:'<svg viewBox="0 0 48 48"><rect x="16" y="16" width="16" height="16" rx="4" fill="#bde0fe" stroke="#5a3d5c" stroke-width="3"/><path d="M8 24 H14 M34 24 H40" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',bigger:'<svg viewBox="0 0 48 48"><rect x="12" y="12" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M24 6 V11 M24 37 V42 M6 24 H11 M37 24 H42" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>'},CM='<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',SM='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 15 H37 M11 24 H37 M11 33 H37" fill="none" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',PM='<svg class="mailGlyph" viewBox="0 0 48 48" aria-hidden="true"><g transform="translate(0 2)"><rect x="6" y="14" width="36" height="24" rx="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/><path d="M6 16 L24 30 L42 16" fill="none" stroke="#5a3d5c" stroke-width="3"/><path d="M34 12 V6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M34 6 H44 L40 10 L44 14 H34 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2"/></g></svg>',qg='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',TM=document.getElementById("app");TM.innerHTML=`
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${St.chat}<span class="badge" id="chatBadge"></span></button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${St.home}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${N1}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${g7}</button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${pc}<span class="badge" id="mapBadge"></span></button>
    <button class="round" id="btnMenu" aria-label="Menu" aria-expanded="false">${SM}<span class="badge" id="menuBadge"></span></button>
  </div>
</div>
<div class="menuPop hidden" id="menuPop">
  <div class="menuCard" role="dialog" aria-label="Menu">
    <button type="button" class="close" id="menuClose" aria-label="Close">✕</button>
    <p class="menuGroup">My stuff</p>
    <button type="button" class="menuRow" id="btnPets" aria-label="Pets"><span class="mIco">${Np}</span><span class="mLabel">Pets</span></button>
    <button type="button" class="menuRow" id="btnDress" aria-label="Characters"><span class="mIco">${Ut.shirt}</span><span class="mLabel">Characters</span></button>
    <button type="button" class="menuRow" id="btnPaint" aria-label="Colors"><span class="mIco">${Ut.paint}</span><span class="mLabel">Wall &amp; floor colors</span></button>
    <button type="button" class="menuRow" id="secrets" aria-label="Surprises, 0 of 5"><span class="mIco secGift">🎁</span><span class="mLabel"><span class="secWord">Surprises </span><span class="secCount">0/5</span></span></button>
    <p class="menuGroup houseGroup">House</p>
    <button type="button" class="menuRow lockRow" id="btnLock" aria-label="Lock house"><span class="mIco" id="lockIco">${St.lockOff}</span><span class="mLabel" id="lockLabel">Lock my house</span></button>
    <button type="button" class="menuRow mailRow" id="btnMail" aria-label="Mailbox"><span class="mIco">${PM}</span><span class="mLabel">Mailbox</span><span class="menuNew" id="mailNew"></span></button>
    <!-- Day / Night / Auto. The clock stays on Auto until she taps. -->
    <div id="menuDaySlot" class="menuSlot" hidden></div>
    <p class="menuGroup streetGroup">Street</p>
    <button type="button" class="menuRow grownRow" id="btnParent" aria-label="Grown-ups"><span class="mIco">${St.shield}</span><span class="mLabel">Grown-ups</span></button>
    <button type="button" class="menuRow soloLeave" id="btnSolo" aria-label="Play in my own house"><span class="mIco">${St.solo}</span><span class="mLabel">Play in my own house</span></button>
    <button type="button" class="menuRow friendRow" id="btnHood" aria-label="Friends"><span class="mIco">${St.street}</span><span class="mLabel">Friends</span></button>
    <p class="menuGroup">This iPad</p>
    <button type="button" class="menuRow" id="btnSound" aria-label="Sound"><span class="mIco" id="soundIco"></span><span class="mLabel">Sound</span></button>
  </div>
</div>
<div class="stageWrap" id="stageWrap">
  <div class="stage" id="stage">
    <div class="world" id="world">
      <div class="wall" id="wall"></div><div class="floor" id="floor"></div><div class="baseboard"></div>
      <div class="scenery" id="scenery"></div>
      <div class="layer" id="layer"></div>
      <div class="toolbar hidden" id="toolbar">
        <button data-a="smaller" aria-label="Smaller">${Ut.smaller}</button><button data-a="bigger" aria-label="Bigger">${Ut.bigger}</button><button data-a="flip" aria-label="Flip">${Ut.flip}</button><button data-a="front" aria-label="Bring forward">${Ut.front}</button><button data-a="back" aria-label="Send back">${Ut.back}</button><button data-a="delete" class="danger" aria-label="Put away">${Ut.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <div class="bin" id="bin">${Ut.trash}</div>
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
<div class="street mapView hidden" id="street"><div class="mapSky">${b0}</div><div class="mapMeadow">${k0}</div><button class="mailCue" id="mailCue" type="button">You've got mail!</button><div class="mapWorld" id="mapWorld"></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>
<div id="toastLane"></div>
<div class="phoneNote" id="phoneNote"><div class="card"><h2>Turn sideways</h2><p>Turn your phone sideways for more room to play!</p><button class="phoneOk" id="phoneOk" type="button">OK!</button></div></div>
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>
<div id="skyMount"></div>`;const M=e=>document.getElementById(e),F=M("stage"),Zg=M("world"),se=M("layer"),xe=M("toolbar"),ya=M("bin");let st=null,Te=C.get().characters[0]?.id??null,Ct="furniture",jc="",Kl="",BM=Date.now()%1e5;const Xl=e=>`${e}-${Date.now().toString(36)}${(++BM).toString(36)}${Math.random().toString(36).slice(2,5)}`,ut="__me";let b=null,S="house",Oe=!1,Pe="",Va=new Map,Ng=!1,Fg=()=>{};const Be=b1(M("modeToggle"),{ownHouse:()=>!b||!Pe||Pe===b.myHouseId(),onChange:()=>{Ng&&(So.matches?ns():rs()),Fg()}}),ba=f1({send:(e,t,n,s)=>b?.sendMail(e,t,n,s),read:(e,t)=>b?.readMail(e,t),drop:(e,t)=>b?.dropMail(e,t),houseOf:e=>[...b?.players.values()??[]].find(t=>t.pid===e)?.houseId??"",houseName:e=>b?.houses.get(e)?.meta.name??"My House",lettersOf:e=>b?.houses.get(e)?.confirmed.mailbox?.letters??[],mine:e=>!!b&&b.houses.get(e)?.meta.ownerId===b.pid,toast:Z,openOwn:()=>{const e=b?.myHouseId();e&&dd(e)},freeType:()=>!b||Wp(b.settings)});Be.sync(!0);const Ls=new Map,za={};let ae=Mo,ho=0;Ng=!0;let yi=null;const Lr=()=>{cancelAnimationFrame(ho),yi=null},Gc=e=>Math.max(0,Math.min(Ws(),e));function Fe(e){ae=Gc(e),za[C.get().currentRoom]=ae,Zg.style.transform=`translate3d(${-ae}px,0,0)`,M("nudgeL").classList.toggle("off",ae<=1),M("nudgeR").classList.toggle("off",ae>=Ws()-1);const t=M("mmView");t.style.left=ae/_e*100+"%",t.style.width=re/_e*100+"%",st&&hh(C.get())}function Er(e){cancelAnimationFrame(ho),e=Gc(e),yi=e;const t=()=>{const n=e-ae;if(Math.abs(n)<.5){Fe(e),yi=null;return}Fe(ae+n*.18),ho=requestAnimationFrame(t)};ho=requestAnimationFrame(t)}const yt=()=>F.getBoundingClientRect().width/re,RM="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)",So=window.matchMedia(RM);function AM(){const e=So.matches;document.body.classList.toggle("phone",e),document.body.classList.toggle("phone-portrait",e&&window.matchMedia("(orientation: portrait)").matches);const t=M("stageWrap");for(const n of[M("nudgeL"),M("nudgeR")]){const s=e?t:F;n.parentElement!==s&&s.appendChild(n)}}function jg(){const e=document.querySelector(".top");if(!e)return;const t=e.getBoundingClientRect(),n=document.body.classList.contains("phone")?t.bottom:t.height;document.documentElement.style.setProperty("--chrome-h",Math.ceil(n)+"px"),Gg()}function Gg(){const e=document.querySelector(".top");if(!e)return;const t=Math.ceil(e.getBoundingClientRect().bottom+16)+"px",n=document.getElementById("mailCue");n&&(n.style.top=t);const s=document.getElementById("toastLane");s&&(s.style.top=t)}function DM(){const e=document.documentElement,t=document.getElementById("app");if(!(document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait"))){t.style.top="",t.style.height="",t.style.bottom="",e.style.removeProperty("--vvh"),e.style.removeProperty("--vvt");return}const s=window.visualViewport,o=Math.round(s?s.height:window.innerHeight),i=Math.round(s?s.offsetTop:0);e.style.setProperty("--vvh",o+"px"),e.style.setProperty("--vvt",i+"px"),t.style.top=i+"px",t.style.height=o+"px",t.style.bottom="auto"}function rs(){AM(),DM(),jg();const e=M("stageWrap"),t=document.body.classList.contains("phone"),n=e.clientWidth,s=e.clientHeight,o=Math.max(1,s-Xc());if(t?s>n*.85:s>n+40){const r=n/Math.max(1,s);re=Math.round(Math.max(480,Math.min(860,ze*r)))}else if(t){const r=n/Math.max(1,o);re=Math.round(Math.max(480,Math.min(_e,ze*r)))}else re=1e3;re=Yc(re),F.style.width=re+"px",F.style.height=ze+"px";const a=Math.min(n/re,o/ze);if(th(a),F.style.setProperty("--yard-sc",String(a||1)),t&&F.style.setProperty("--fit",String(yt())),Yg(),ae>Ws())Fe(ae);else{const r=M("mmView");r.style.left=ae/_e*100+"%",r.style.width=re/_e*100+"%"}ot(),!t&&S==="house"&&Us(!1),ZM(),S==="ranch"&&requestAnimationFrame(fc),S==="gameroom"&&requestAnimationFrame(r0),Po(),t&&S==="ranch"&&yL(),Kg(),Be.hint(),Wr(),Nn()}function Yg(){const e=M("stageWrap"),t=document.body.classList.contains("phone")&&S==="house";for(const n of[M("nudgeL"),M("nudgeR")]){if(!t||n.parentElement!==e){n.style.marginTop="",n.style.left="",n.style.right="",n.style.top="";continue}const s=F.getBoundingClientRect(),o=e.getBoundingClientRect(),i=(s.top+s.bottom)/2-o.top;n.style.top=i+"px",n.style.marginTop=-n.offsetHeight/2+"px",n.style.left="",n.style.right=""}}function Kg(){document.body.classList.remove("secrets-chrome"),M("secrets")?.classList.remove("compact")}function ot(e=0){if(!document.body.classList.contains("phone"))return;if(S==="house"){Xg();return}const t=S==="park"?"parkScroll":S==="ranch"?"ranchScroll":S==="gameroom"?"grScroll":"";if(!t)return;const n=document.getElementById(t);if(!n||n.clientWidth<20){e<8&&requestAnimationFrame(()=>ot(e+1));return}const s=n.querySelector(".savatar.mine")??n.querySelector(".savatar");if(!s){e<8&&requestAnimationFrame(()=>ot(e+1));return}HM(n,[s,...s.querySelectorAll(".nametag")])&&e<8?requestAnimationFrame(()=>ot(e+1)):IM()}function IM(){Ur()&&(S==="gameroom"&&a0([...document.querySelectorAll(".neonSignArt")],document.getElementById("grScroll")),S==="ranch"&&!Oe&&(l0(),Md()))}function HM(e,t){const s=e.getBoundingClientRect(),o=Math.min(s.right,window.innerWidth)-8,i=Math.max(s.left,0)+8;let a=0,r=0;for(const c of t){const f=c.getBoundingClientRect();f.width<2||f.height<2||(a=Math.max(a,f.right-o),r=Math.max(r,i-f.left))}if(a<=1&&r<=1)return!1;const l=e.scrollLeft;return a>1&&r>1?e.scrollLeft-=r:a>1?e.scrollLeft+=a:e.scrollLeft-=r,Math.abs(e.scrollLeft-l)>.5}function Xg(){Us(!1)}function qf(e){let t=0;for(const n of e){const s=Me[n.kind];!s||s.wall||(t=Math.max(t,s.w*Ge(n)))}return t}function OM(){if(S!=="house"||!Be.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return 0;const e=C.get().rooms,t=C.get().currentRoom;let n=qf(e[t]?.items??[]);if(t==="backyard")for(const s of Object.keys(e))s!=="backyard"&&(n=Math.max(n,qf(e[s].items)));return n<40?0:Math.min(_e,Math.ceil(n/.55))}function Yc(e){const t=OM();return t&&e<t?t:e}function WM(){const e=Yc(re);if(e<=re+.5)return;re=e,F.style.width=re+"px";const t=M("stageWrap"),n=Math.max(1,t.clientHeight-Xc()),s=Math.min(t.clientWidth/re,n/ze);if(th(s),document.body.classList.contains("phone")&&F.style.setProperty("--fit",String(s)),ae>Ws())Fe(ae);else{const o=M("mmView");o.style.left=ae/_e*100+"%",o.style.width=re/_e*100+"%"}}let bi=null,ki=!1;function UM(){if(S!=="house"||!Be.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return null;const e=C.get();if(e.currentRoom==="backyard")return null;let t=null,n=bi;if(b&&Ie!==K){const a=be();a&&a.where==="house"&&a.room===e.currentRoom&&(t=$t(e.currentRoom,Bn(b.pid,a),a).x,n||(n=Bn(b.pid,a)?.item??null))}if(t===null){const a=e.characters.find(r=>r.id===Te&&r.room===e.currentRoom)??e.characters.find(r=>r.room===e.currentRoom);if(!a)return null;t=$t(e.currentRoom,Mt(a),a).x,n||(n=Mt(a)?.item??null)}if(!n)return null;const s=e.rooms[e.currentRoom].items.find(a=>a.id===n),o=s&&Me[s.kind];if(!s||!o)return null;const i=o.w*Ge(s)/2;return{minX:Math.min(t-100,s.x-i),maxX:Math.max(t+100,s.x+i)}}function Us(e){if(S!=="house"||Vs)return;if(C.get().currentRoom==="backyard"){Math.abs(ae-Dl)>.5&&Fe(Dl),Nn();return}if(ki)return;const t=UM();if(t){const _=t.maxX-t.minX;let y=ae;_+20*2>re?y=t.minX-20:(t.minX-20<y&&(y=t.minX-20),t.maxX+20>y+re&&(y=t.maxX+20-re)),y=Math.max(0,Math.min(Ws(),y)),Math.abs(y-ae)>.5&&Fe(y),Nn();return}const n=document.querySelector("#layer .char.avatar.mine")??document.querySelector("#layer .char");if(!n)return;const s=yt()||1,o=F.getBoundingClientRect(),i=8;let a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i;for(const k of["nudgeL","nudgeR"]){const _=M(k);if(!_||_.classList.contains("off")||_.offsetParent===null)continue;const y=_.getBoundingClientRect();y.width<2||y.height<2||(k==="nudgeL"?r=Math.max(r,y.right+6):a=Math.min(a,y.left-6))}a-r<48&&(a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i);const l=[n,...n.querySelectorAll(".nametag")];let c=0,f=0,d=1/0,g=-1/0;for(const k of l){const _=k.getBoundingClientRect();_.width<2||_.height<2||(c=Math.max(c,_.right-a),f=Math.max(f,r-_.left),d=Math.min(d,_.left),g=Math.max(g,_.right))}if(document.body.classList.contains("phone-portrait")&&d<1/0){const k=(d+g)/2-(r+a)/2;if(Math.abs(k)>3){Fe(ae+k/s),Nn();return}}const h=VM(n),m=Vx({cam:ae,maxCam:Ws(),kidX:h,overflowL:f,overflowR:c,scale:s,nudgeX:e});Math.abs(m.cam-ae)>.5&&Fe(m.cam),e&&Math.abs(m.kidX-h)>.5&&zM(n,m.kidX),Nn()}function VM(e){if(e.dataset.pid&&b){const t=e.dataset.pid===b.pid?be():b.presence.get(e.dataset.pid);if(t&&t.where==="house")return t.x}return C.get().characters.find(t=>t.id===e.dataset.cid)?.x??0}function zM(e,t){if(e.dataset.pid&&b&&e.classList.contains("mine")){const o=be();if(!o||o.where!=="house")return;je({...o,x:t}),xt();return}const n=e.dataset.cid;if(!n)return;const s=C.get().characters.find(o=>o.id===n);s&&C.dispatch({type:"char/move",id:n,room:C.get().currentRoom,x:t,y:s.y})}const QM={living:"Living",bedroom:"Bed",kitchen:"Kitchen",salon:"Salon",nursery:"Nursery",bathroom:"Bath"};function Jg(){const e=S==="house",t=document.body.classList.contains("phone-portrait"),n=e&&!Be.isPlay(),s=e&&re+1<_e,o=e&&(t?n:n||s);document.body.classList.toggle("show-minimap",o)}const qM='<svg class="tabIco" width="14" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6 L8 1 L15 6 V11 H1 Z" fill="currentColor"/></svg>';function eh(){return document.body.classList.contains("phone")}function ZM(){const e=eh()?"c":"f";Jg(),e!==Kl&&(Kl=e,ch(C.get()))}function Kc(){So.matches?ns():rs()}window.addEventListener("resize",Kc);window.addEventListener("resize",()=>requestAnimationFrame(Jc));M("tabs").addEventListener("scroll",Jc,{passive:!0});So.addEventListener("change",Kc);let Zf="",rl=!1;function Nf(){const e=M("stageWrap"),t=document.querySelector(".top"),n=document.querySelector(".tools"),s=r=>r?r.clientWidth+"x"+r.clientHeight:"0",o=window.visualViewport,i=o?Math.round(o.offsetTop)+"x"+Math.round(o.height)+"x"+Math.round(o.width):"",a=document.body.classList.contains("baby-card")?"c":"";return i+" "+s(e)+" "+s(t)+" "+s(n)+a}function Xc(){const e=document.body;if(!e.classList.contains("baby-card")||!e.classList.contains("phone")||e.classList.contains("phone-portrait"))return 0;const t=document.querySelector(".babyCare"),n=t&&!t.hidden?t.getBoundingClientRect().height:0;return Math.ceil(8+(n>8?n:72)+8)}function th(e){const t=Xc(),n=M("stageWrap").clientHeight;F.style.left="",t>0?F.style.top=t+Math.max(0,n-t)/2+"px":F.style.top="",F.style.transform=`translate(-50%,-50%) scale(${e})`}function nh(){const e=M("modeToggle"),t=document.querySelector(".tools"),n=document.getElementById("modeDock"),s=document.querySelector(".drawerTop");if(!e||!t||!n||!s)return!1;const o=document.body.classList.contains("phone"),i=o&&!document.body.classList.contains("phone-portrait"),a=i?t:o?n:s,r=e.parentElement===a;return n.hidden=!o||i,r?!1:(i?t.insertBefore(e,t.firstChild):o?n.appendChild(e):s.insertBefore(e,s.firstChild),!0)}function NM(){if(C.get().currentRoom==="backyard"||!document.body.classList.contains("phone-portrait")||!document.body.classList.contains("mode-play")||S!=="house")return;const e=M("stageWrap"),t=e.clientWidth,n=e.clientHeight;if(t<20||n<20||!(n>t*.85))return;const s=Math.min(_e,Yc(Math.max(280,Math.min(860,Math.round(ze*t/n)))));if(Math.abs(s-re)<2)return;re=s,F.style.width=re+"px",F.style.height=ze+"px";const o=Math.min(t/re,n/ze);if(F.style.transform=`translate(-50%,-50%) scale(${o})`,F.style.setProperty("--fit",String(yt())),ae>Ws())Fe(ae);else{const i=M("mmView");i.style.left=ae/_e*100+"%",i.style.width=re/_e*100+"%"}Yg(),Jg()}function ns(){if(rl||!So.matches)return;const e=nh(),t=Nf()+(document.body.classList.contains("mode-play")?"p":"d");if(!(!e&&t===Zf)){rl=!0;try{rs(),NM(),ot(),Zf=Nf()+(document.body.classList.contains("mode-play")?"p":"d")}finally{rl=!1}}}if(typeof ResizeObserver<"u"){const e=new ResizeObserver(()=>ns()),t=document.querySelector(".top");t&&e.observe(t),e.observe(M("stageWrap"));const n=document.querySelector(".tools");n&&e.observe(n)}window.visualViewport&&(window.visualViewport.addEventListener("resize",()=>ns()),window.visualViewport.addEventListener("scroll",()=>ns()));F.addEventListener("scroll",()=>{F.scrollLeft=0,F.scrollTop=0});const At=(e,t)=>{const n=F.getBoundingClientRect();return{x:(e-n.left)/n.width*re+ae,y:(t-n.top)/n.height*ze}},Jl=(e,t)=>{const n=F.getBoundingClientRect();return e>n.left&&e<n.right&&t>n.top&&t<n.bottom},Ff=(e,t)=>{const n=ya.getBoundingClientRect();return e>n.left-20&&e<n.right+20&&t>n.top-20&&t<n.bottom+20},Ai=e=>Os[e.size]??1,pn=new Map;function sh(){return!b||Ie===K?!0:b.houses.get(Pe)?.meta.ownerId===b.pid}function Cr(e){const t=Me[e.kind];return!t||!Fs(e.kind)?null:{id:e.id,kind:e.kind,x:e.x,footY:js(t,e.y),flip:!!e.flip,scale:Ge(e),w:t.w,h:ct(t)}}function $t(e,t,n){if(!t)return n;const s=C.get().rooms[e]?.items.find(a=>a.id===t.item),o=s&&Cr(s);if(!o)return n;const i=$p(o).find(a=>a.n===t.n);return i?{x:i.x,y:i.y}:n}function wi(e,t,n=!1){const s=C.get(),o=[];for(const i of s.characters){if(i.id===e||i.room!==s.currentRoom)continue;const a=Mt(i);a&&o.push({item:a.item,n:a.n})}if(!n){const i=Du(s.baby,s.currentRoom);i&&o.push(i)}if(b&&S==="house"){const i=(r,l)=>{if(r===t||l.where!=="house"||l.houseId!==Pe||l.room!==s.currentRoom)return;const c=Bn(r,l);c&&o.push({item:c.item,n:c.n})};b.presence.forEach((r,l)=>i(l,r));const a=be();a&&b.pid!==t&&i(b.pid,a)}return o}function oh(e,t){t?pn.set(e,t):pn.delete(e)}function Yo(e,t,n,s,o){const a=!b||Ie===K||!!b?.speaksSit;a?pn.delete("c:"+e):oh("c:"+e,o),a?C.dispatch({type:"char/move",id:e,room:t,x:n,y:s,seat:o}):C.dispatch({type:"char/move",id:e,room:t,x:n,y:s})}function ka(e,t,n,s,o){const{seat:i,...a}=e;if(b&&!b.speaksSit){oh("p:"+b.pid,o?{item:o.id,pose:o.pose,n:o.n}:null),je({...a,x:t,y:n,flip:s});return}b&&pn.delete("p:"+b.pid),je(o?{...a,x:t,y:n,flip:s,seat:o}:{...a,x:t,y:n,flip:s})}function Mt(e){return e.seat?e.seat:pn.get("c:"+e.id)??null}function Bn(e,t){return t.seat?{item:t.seat.id,pose:t.seat.pose,n:t.seat.n}:pn.get("p:"+e)??null}function Qa(e,t){const n=C.get(),s=document.elementsFromPoint(e,t),o=new Set;for(let i=0;i<s.length;i++){const a=s[i];if(!a||!a.closest)continue;const r=a.closest(".item");if(!r)continue;const l=r.dataset.id;if(!l||o.has(l))continue;o.add(l);const c=n.rooms[n.currentRoom].items.find(f=>f.id===l);if(c&&Fs(c.kind))return c}return null}function FM(e){const t=ur(e);if(t)return"k-bed k-bed-"+t.clip;const n=e.toLowerCase();return/sofa|couch|loveseat/.test(n)?"k-sofa":/bench/.test(n)?"k-bench":/chair|stool|rocker/.test(n)?"k-chair":""}function jM(){const e=C.get(),t=new Map,n=(s,o)=>{const i=t.get(s);t.set(s,i===void 0?o:Math.max(i,o))};for(const s of e.characters){const o=s.room===e.currentRoom?Mt(s):null;o&&n(o.item,o.n)}if(b&&S==="house"){const s=(i,a)=>{const r=a.where==="house"&&a.houseId===Pe&&a.room===e.currentRoom?Bn(i,a):null;r&&n(r.item,r.n)};b.presence.forEach((i,a)=>s(a,i));const o=be();o&&s(b.pid,o)}return t}function GM(e,t){const n=Ai(e),s=xr(e,vr(Mt(e)?.pose))[t];let o=s.x;e.flip&&(o=100-o);const i=$t(e.room,Mt(e),e);return{x:i.x+(o-50)/100*as*n,y:i.y-un*n+s.y/160*un*n}}function ih(e){const t=C.get();let n=null;for(const s of t.characters){if(s.room!==t.currentRoom)continue;const o=Ai(s),i=$t(s.room,Mt(s),s),a=Math.abs(e.x-i.x)<as*o/2+25&&e.y>i.y-un*o-25&&e.y<i.y+20;for(const r of["left","right"]){if(s.held[r])continue;const l=GM(s,r),c=Math.hypot(e.x-l.x,e.y-l.y);(a||c<75)&&(!n||c<n.d)&&(n={c:s,hand:r,d:c})}}return n}const ah=["none","radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)","repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)","linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)"],rh="repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 125px), linear-gradient(rgba(0,0,0,.06), transparent 50%)",ec=e=>`url('${e.replace(/'/g,"%27")}')`;function lh(e){const t=e.rooms[e.currentRoom],n=M("wall"),s=M("floor"),o=t.wallTile?cf[t.wallTile]:void 0;n.style.backgroundColor=t.wallpaper,o?(n.style.backgroundImage=ec(o.url),n.style.backgroundSize="220px auto",n.style.backgroundPosition="0 0"):(n.style.backgroundImage=ah[t.pattern]??"none",n.style.backgroundSize=t.pattern===1?"44px 44px":t.pattern===3?"60px 60px":"auto",n.style.backgroundPosition=t.pattern===3?"0 0, 30px 30px":"0 0");const i=t.floorTile?cf[t.floorTile]:void 0;s.style.backgroundColor=t.floor,s.style.backgroundImage=i?`${ec(i.url)}, linear-gradient(rgba(0,0,0,.06), transparent 50%)`:rh,s.style.backgroundSize=i?"180px auto, auto":"auto",M("mmWall").style.background=t.wallpaper,M("mmFloor").style.background=t.floor,dh(e)}function qa(e){const n=e.rooms[e.currentRoom].items.filter(o=>Me[o.kind]).map(o=>{const i=Me[o.kind];return`<i style="left:${o.x/_e*100}%;top:${(js(i,o.y)-ct(i)*Ge(o)/2)/ze*100}%"></i>`}).join(""),s=e.characters.filter(o=>o.room===e.currentRoom).map(o=>{const i=$t(e.currentRoom,Mt(o),o);return`<b style="left:${i.x/_e*100}%;top:${(i.y-90)/ze*100}%;background:${o.shirt}"></b>`}).join("");M("mmDots").innerHTML=n+s}function ch(e){const t=eh();Kl=t?"c":"f",document.body.classList.toggle("tabs-compact",t),M("tabs").innerHTML=Nc.map(n=>{const s=t?QM[n.id]??n.name:n.name;return`<button class="tab ${e.currentRoom===n.id||e.currentRoom==="backyard"&&n.id==="living"?"on":""}" data-room="${n.id}" style="--c:${n.color}" aria-label="${n.name}">${t?qM:""}${s}</button>`}).join(""),requestAnimationFrame(()=>{YM(),Jc()})}function Jc(){const e=document.getElementById("tabs");if(!e)return;const t=e.scrollWidth-e.clientWidth;e.classList.toggle("fadeL",t>2&&e.scrollLeft>2),e.classList.toggle("fadeR",t>2&&e.scrollLeft<t-2)}function YM(){const e=document.getElementById("tabs"),t=e?.querySelector(".tab.on");if(!e||!t||e.scrollWidth<=e.clientWidth+2)return;const n=t.offsetLeft-e.offsetLeft,s=n+t.offsetWidth;n<e.scrollLeft+24?e.scrollLeft=Math.max(0,n-24):s>e.scrollLeft+e.clientWidth-24&&(e.scrollLeft=s-e.clientWidth+24)}function Gs(e,t,n,s,o){e.style.left=(t-s/2)/_e*100+"%",e.style.top=(n-o)/ze*100+"%",e.style.width=s/_e*100+"%",e.style.height=o/ze*100+"%"}function ed(e,t){let n=e.w*t,s=ct(e)*t;if((e.kind==="kennel"||e.kind==="cat-tower")&&document.body.classList.contains("phone")){const o=Math.max(.2,yt()||1),i=44*_e/(Math.max(1,re)*o),a=44/o;n<i&&(n=i),s<a&&(s=a)}return{w:n,h:s}}function Xt(e){const t=e.rooms[e.currentRoom],n=new Set;for(const s of t.items){const o=Me[s.kind];if(!o)continue;n.add(s.id);let i=se.querySelector(`.item[data-id="${s.id}"]`);i||(i=document.createElement("div"),i.className="item",i.dataset.id=s.id,i.innerHTML=`<div class="inner">${hn(o,!0)}</div>`,se.appendChild(i),i.addEventListener("pointerdown",l=>d9(i,l))),i.dataset.kind=s.kind,i.classList.toggle("is-light",Z7(s.kind,!!o.light));const a=ed(o,Ge(s));Gs(i,s.x,js(o,s.y),a.w,a.h);const r=1e3+s.z;i.style.zIndex=String(r),i.style.setProperty("--iz",String(r)),i.classList.toggle("flipped",s.flip),i.classList.toggle("sel",st===s.id)}se.querySelectorAll(".item").forEach(s=>{n.has(s.dataset.id)||s.remove()}),dh(e),t9(),td(),hh(e),qa(e),Zs()}function td(){const e=C.get(),t=jM(),n=new Set;t.forEach((s,o)=>{const i=e.rooms[e.currentRoom]?.items.find(g=>g.id===o),a=i&&Me[i.kind],r=i&&FM(i.kind);if(!i||!a||!r)return;n.add(o);let l=se.querySelector(`.seatFront[data-id="${o}"]`);l||(l=document.createElement("div"),l.className="seatFront",l.dataset.id=o,se.appendChild(l));const c=se.querySelector(`.item[data-id="${o}"] .inner`),f=l.querySelector(".inner");(!f||c&&f.innerHTML!==c.innerHTML)&&(l.innerHTML=`<div class="inner">${c?c.innerHTML:hn(a,!0)}</div>`),l.className="seatFront "+r+(i.flip?" flipped":"");const d=ed(a,Ge(i));Gs(l,i.x,js(a,i.y),d.w,d.h),l.style.zIndex=String(1e3+i.z+3)}),se.querySelectorAll(".seatFront").forEach(s=>{n.has(s.dataset.id||"")||s.remove()})}let Vs=!1,jf=0;function nd(e){performance.now()-jf<80||(jf=performance.now(),TL(e))}function KM(e,t){const n=F.querySelector(".yardDoor");if(!n)return null;const s=o=>{if(!o)return!1;const i=o.getBoundingClientRect();return i.width>2&&i.height>2&&e>=i.left&&e<=i.right&&t>=i.top&&t<=i.bottom};return s(n.querySelector(".yardHintLabel"))||s(n.querySelector(".doorArt"))||s(n)?n:null}function XM(e){e.addEventListener("pointerdown",t=>{if(t.button!==0)return;t.stopPropagation();const n=e.dataset.yardGo==="backyard"?"backyard":"living",s=t.clientX,o=t.clientY,i=t.pointerId;Vs=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),Vs=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),nd(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)})}F.addEventListener("pointerdown",e=>{if(e.button!==0)return;const t=KM(e.clientX,e.clientY);if(!t||e.target instanceof Node&&t.contains(e.target))return;e.stopPropagation(),e.preventDefault();const n=t.dataset.yardGo==="backyard"?"backyard":"living",s=e.clientX,o=e.clientY,i=e.pointerId;Vs=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),Vs=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),nd(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)},!0);function JM(e,t){return e.width>2&&t.width>2&&e.left<t.right-1&&e.right>t.left+1&&e.top<t.bottom-1&&e.bottom>t.top+1}function Gf(e){const t=e.getBoundingClientRect();let n=0;se.querySelectorAll(".item").forEach(s=>{if(s.classList.contains("is-light"))return;const o=Me[s.dataset.kind||""];if(!o||o.wall||!JM(s.getBoundingClientRect(),t))return;const i=parseInt(s.style.zIndex||"0",10)||0;i>n&&(n=i)}),e.style.zIndex=n?String(n+2):"2"}function dh(e){const t=e.rooms[e.currentRoom];Jx(M("scenery"),e.currentRoom,t.items),M("scenery").querySelectorAll(".yardDoor").forEach(o=>o.remove());const n=e.currentRoom==="living"?"backyard":e.currentRoom==="backyard"?"living":"",s=se.querySelector(".yardDoor");if(!n)se.querySelectorAll(".yardDoor").forEach(o=>o.remove());else if(!s||s.dataset.yardGo!==n){se.querySelectorAll(".yardDoor").forEach(i=>i.remove()),se.insertAdjacentHTML("beforeend",R5(n==="backyard"?"living":"yard"));const o=se.querySelector(".yardDoor");o&&XM(o)}F.classList.toggle("room-yard",e.currentRoom==="backyard"),Xa(),Vs||Nn()}const Bt=new Map;function e9(e){const t=Ai(e),n=as*t,s=un*t,o=xr(e,vr(Mt(e)?.pose)),i=e.look2?.85:1;return["left","right"].map(a=>{const r=e.held[a],l=r&&Me[r.kind];if(!r||!l)return"";const c=Ge(r),f=Math.min(.7,120*t/Math.max(l.w,ct(l))/c)*i,d=l.w*c*f,g=ct(l)*c*f,h=o[a].x/100*n,m=o[a].y/160*s;return`<div class="held ${r.flip?"flipped":""}" data-hand="${a}" style="left:${(h-d/2)/n*100}%;top:${(m-g*.62)/s*100}%;width:${d/n*100}%;height:${g/s*100}%"><div class="inner">${hn(l)}</div></div>`}).join("")}function t9(){let e=se.querySelector("#skyPuddles");e||(e=document.createElement("div"),e.id="skyPuddles",e.className="skyPuddles"),se.appendChild(e);const t=[...se.querySelectorAll(".item.is-light")];for(;e.children.length>t.length;)e.lastElementChild.remove();for(;e.children.length<t.length;)e.appendChild(document.createElement("i"));t.forEach((n,s)=>{const o=e.children[s],i=parseFloat(n.style.left),a=parseFloat(n.style.top),r=parseFloat(n.style.width),l=parseFloat(n.style.height),c=n.dataset.kind==="window"||n.dataset.kind==="tv";o.style.left=i-.6*r+"%",o.style.top=a-(c?.38:.5)*l+"%",o.style.width=2.2*r+"%",o.style.height=2*l+"%",o.style.zIndex=String(parseInt(n.style.zIndex||"1000",10))})}let Sr=()=>{};function ri(e){const t=e.baby;return t&&t.spot==="arms"&&t.holder?t.holder:""}const Qn=new Map;function fh(e){for(const[t,n]of Qn)t.indexOf(e+":")===0&&(n.remove(),Qn.delete(t))}function ph(e,t){const n=e+":"+t,s=Qn.get(n);s&&(s.remove(),Qn.delete(n))}function gh(e,t,n,s,o){const i=e+":"+t;for(const[r,l]of Qn)r.indexOf(e+":")===0&&r!==i&&(l.remove(),Qn.delete(r));let a=Qn.get(i);if((!a||!a.isConnected)&&(a=document.createElement("div"),a.className="cradle-front",a.dataset.for=t,a.innerHTML='<div class="inner"></div>',se.appendChild(a),Qn.set(i,a)),a.dataset.arm!==s){const r=a.querySelector(".inner");r&&(r.innerHTML=s),a.dataset.arm=s}a.style.left=n.style.left,a.style.top=n.style.top,a.style.width=n.style.width,a.style.height=n.style.height,a.style.zIndex=String(5e3+Math.round(o)+4),a.classList.toggle("flipped",n.classList.contains("flipped")),a.classList.toggle("pose-sit",n.classList.contains("pose-sit")),a.classList.toggle("pose-lie",n.classList.contains("pose-lie")),a.classList.toggle("pose-lie-r",n.classList.contains("pose-lie-r"))}function Jt(e){const t=e.characters.filter(n=>n.room===e.currentRoom);for(const[n,s]of Bt)t.some(o=>o.id===n)||(s.remove(),Bt.delete(n));for(const n of t){let s=Bt.get(n.id);s||(s=document.createElement("div"),s.className="char",s.dataset.cid=n.id,s.innerHTML='<div class="inner"></div><div class="hands"></div>',se.appendChild(s),Bt.set(n.id,s),g9(s));const o=Mt(n),i=o?.pose??null,a=ri(e)===n.id,r=K0(n)+(i||"")+(a?"h":"");s.dataset.look!==r&&(s.querySelector(".inner").innerHTML=bt(n,i,a),s.dataset.look=r),s.classList.toggle("holding",a);const l=JSON.stringify([n.held.left?.id,n.held.left?.flip,n.held.right?.id,n.held.right?.flip,n.size,i]);s.dataset.held!==l&&(s.querySelector(".hands").innerHTML=e9(n),s.dataset.held=l);const c=Ai(n),f=$t(e.currentRoom,o,n);if(Gs(s,f.x,f.y,as*c,un*c),s.style.zIndex=String(o?1e3+(e.rooms[e.currentRoom].items.find(g=>g.id===o.item)?.z??0)+1+o.n:5e3+Math.round(n.y)),s.classList.toggle("flipped",n.flip),s.classList.toggle("pose-sit",i==="sit"),s.classList.toggle("pose-lie",i==="lie"),s.classList.toggle("pose-lie-r",i==="lie"&&!!e.rooms[e.currentRoom].items.find(g=>g.id===o?.item)?.flip),s.classList.toggle("active",n.id===Te),Ti(s,n,n.id===Te),s.classList.toggle("pose-swing",Rt?.id===n.id),a){const g=cg(n,i);g?gh("doll",n.id,s,g,f.y):ph("doll",n.id)}const d=xr(n);s.style.setProperty("--hx-l",d.left.x+"%"),s.style.setProperty("--hx-r",d.right.x+"%")}(ri(e)===""||!t.some(n=>n.id===ri(e)))&&fh("doll"),Zs(),qa(e),Sr()}function ta(){const e=F.getBoundingClientRect(),t=e.width/Math.max(1,re),n=6,o=document.body.classList.contains("phone")?1/Math.max(.2,t):1,i=xe.offsetWidth,a=xe.offsetHeight,r=parseFloat(xe.style.left)/100*_e,l=parseFloat(xe.style.top)/100*ze,c=xe.classList.contains("below"),f=r,d=c?l+a/2:l-a/2,g=o*i/2,h=o*a/2,m=x=>e.left+(n+x-ae)*t,k=x=>e.top+(n+x)*t,_=m(f-g),y=m(f+g),u=k(d-h),v=k(d+h);return{left:_,right:y,top:u,bottom:v,width:y-_,height:v-u}}function n9(){const e=F.getBoundingClientRect(),t=4;let n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t,o=Math.max(e.top,0)+t,i=Math.min(e.bottom,window.innerHeight)-t;for(const a of["nudgeL","nudgeR"]){const r=M(a);if(!r||r.classList.contains("off")||r.offsetParent===null)continue;const l=r.getBoundingClientRect();l.width<2||l.height<2||(a==="nudgeL"?n=Math.max(n,l.right+4):s=Math.min(s,l.left-4))}return s-n<48&&(n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t),{left:n,right:s,top:o,bottom:i}}function na(e,t){xe.style.left=e/_e*100+"%",xe.style.top=t/ze*100+"%"}function hh(e){const t=st&&e.rooms[e.currentRoom].items.find(k=>k.id===st);if(Be.isPlay()||!t||!Me[t.kind]){xe.classList.add("hidden"),xe.classList.remove("below"),xe.style.maxWidth="";return}const n=Me[t.kind],s=js(n,t.y),o=s-ct(n)*Ge(t),i=12;xe.classList.remove("hidden"),xe.style.maxWidth="",xe.classList.remove("below"),na(t.x,o-i);const a=n9();ta().top<a.top&&(xe.classList.add("below"),na(t.x,s+i));let r=ta();const l=a.right-a.left;if(r.width>l-2&&l>60){const k=xe.offsetWidth*((l-8)/Math.max(1,r.width));xe.style.maxWidth=Math.max(76,k)+"px",!xe.classList.contains("below")&&ta().top<a.top&&(xe.classList.add("below"),na(t.x,s+i)),r=ta()}let c=0,f=0;if(r.left<a.left&&(c=a.left-r.left),r.right+c>a.right&&(c=a.right-r.right),r.width>a.right-a.left&&(c=(a.left+a.right)/2-(r.left+r.right)/2),r.top<a.top&&(f=a.top-r.top),r.bottom+f>a.bottom&&(f=a.bottom-r.bottom),Math.abs(c)>=.5||Math.abs(f)>=.5){const k=F.getBoundingClientRect().width/Math.max(1,re)||1,_=parseFloat(xe.style.left)/100*_e+c/k,y=parseFloat(xe.style.top)/100*ze+f/k;na(_,y)}const d=Rs(t.size),g=Ss.indexOf(d),h=xe.querySelector('[data-a="smaller"]'),m=xe.querySelector('[data-a="bigger"]');h&&(h.disabled=g<=0),m&&(m.disabled=g>=Ss.length-1)}function uh(e){const t=M("soundIco");t&&(t.innerHTML=e.soundOn?Ut.soundOn:Ut.soundOff),M("btnSound").setAttribute("aria-label",e.soundOn?"Sound on":"Sound off"),C1(e.soundOn)}function zs(){const e=C.get();se.innerHTML="",Bt.clear(),ch(e),lh(e),Xt(e),Jt(e),uh(e);const t=e.characters.find(o=>o.room===e.currentRoom),n=b&&be(),s=n&&n.where==="house"?n.x:t?.x;Lr(),Fe(za[e.currentRoom]??Gc(s!==void 0?s-re/2:Mo)),xt(),mn(),document.body.classList.contains("phone")&&S==="house"&&requestAnimationFrame(()=>Xg())}const Yf=200,s9=2,Za=[];let tc=0,wa=!1,ll=0;const mh=new Map;function nc(e){const t=document.getElementById("shelf");if(!t)return!1;const n=t.getBoundingClientRect();if(n.width<2||n.height<2)return!1;const s=e.getBoundingClientRect();return s.right>n.left-Yf&&s.left<n.right+Yf&&s.bottom>n.top-8&&s.top<n.bottom+8}const o9=3,Na=new Map;function sc(e,t){const n=(Na.get(t)||0)+1;if(Na.set(t,n),delete e.dataset.shelfq,n>=o9){delete e.dataset.artq;return}setTimeout(sd,300*n)}function ao(){tc--,!wa&&yh()}function Kf(e,t){const n=document.createElement("div");n.innerHTML=hn(t);const s=n.querySelector("img.artimg");if(!s){delete e.dataset.artq,ao();return}const o=Na.get(t.kind)||0;if(o>0){const l=s.getAttribute("src")||"";s.setAttribute("src",l+(l.indexOf("?")>=0?"&":"?")+"retry="+o)}let i=!1;const a=l=>{if(!i){if(i=!0,l){const c=Array.prototype.slice.call(n.childNodes);if(mh.set(t.kind,c),Na.delete(t.kind),e.isConnected&&e.dataset.artq==="1"){delete e.dataset.artq,e.innerHTML="";for(let f=0;f<c.length;f++)e.appendChild(c[f])}else{const f=document.querySelector(`#shelf button.thing[data-artq="1"][data-kind="${CSS.escape(t.kind)}"]`);if(f){delete f.dataset.artq,f.innerHTML="";for(let d=0;d<c.length;d++)f.appendChild(c[d])}}}else e.isConnected&&e.dataset.artq==="1"&&sc(e,t.kind);ao()}},r=()=>{typeof s.decode=="function"?s.decode().then(()=>a(!0),()=>a(!0)):a(!0)};s.onload=r,s.onerror=()=>a(!1),s.complete&&s.naturalWidth>0&&r()}function yh(){if(!wa){for(wa=!0;tc<s9&&Za.length;){const e=Za.shift();if(!e||!e.isConnected||e.dataset.artq!=="1")continue;if(!nc(e)){delete e.dataset.shelfq;continue}const t=e.dataset.kind||"",n=Me[t];if(!n){delete e.dataset.artq;continue}if(tc++,Is(t)){Kf(e,n);continue}p(()=>Promise.resolve().then(()=>Sc),void 0).then(s=>s.loadArtKinds([t])).then(()=>{if(!e.isConnected||e.dataset.artq!=="1"){ao();return}if(!Is(t)){sc(e,t),ao();return}if(!nc(e)){delete e.dataset.shelfq,ao();return}Kf(e,n)},()=>{e.isConnected&&e.dataset.artq==="1"&&sc(e,t),ao()})}wa=!1}}function i9(){const e=document.getElementById("shelf");if(!e||!ko())return;const t=e.querySelectorAll('button.thing[data-artq="1"]');for(let n=0;n<t.length;n++){const s=t[n];s.dataset.shelfq!=="1"&&nc(s)&&(s.dataset.shelfq="1",Za.push(s))}yh()}function sd(){ll||(ll=requestAnimationFrame(()=>{ll=0,i9()}))}function a9(){const e=document.getElementById("shelf");!e||e.dataset.artscroll==="1"||(e.dataset.artscroll="1",e.addEventListener("scroll",sd,{passive:!0}))}function bh(){const e=document.getElementById("shelf");if(!e||!ko())return;const t=e.querySelectorAll("button.thing[data-kind]");for(let n=0;n<t.length;n++){const s=t[n],o=s.dataset.kind||"";s.querySelector("img.artimg")||!(xd(o)||Is(o))||(s.dataset.artq="1")}sd()}function kh(){if(Ct==="__people"){It();return}bh()}function r9(e){const t=Sp();if(!b)return;const n=be();if(!n||n.where!=="house"||!n.seat)return;let s="";if(e.type==="item/flip"||e.type==="item/delete")s=e.id;else if(e.type==="item/move"&&e.stand)s=e.id;else if(e.type==="char/hold")s=e.itemId;else return;if(!s||n.seat.id!==s||e.room!==n.room)return;const o=t&&t.id===s?t:null,i=o?Ea(o.kind)*(o.scale||1):Ea("bed"),a=wc(o?o.x:n.x,i,n.x);pn.delete("p:"+b.pid);const{seat:r,...l}=n;je({...l,x:a.x,y:a.y})}C.subscribe((e,t)=>{switch(r9(t),t.type){case"room/switch":{const n=F.classList.contains("room-yard");b&&Ie!==K&&b9(t.room),zs(),It(),(t.room==="backyard"||n||Be.isPlay()&&Math.min(window.innerWidth,window.innerHeight)<500)&&rs(),o0(t.room);break}case"item/add":Xt(e),WM(),CL();break;case"game/reset":zs();break;case"room/wallpaper":case"room/floor":case"room/pattern":case"room/wallTile":case"room/floorTile":lh(e);break;case"char/update":case"char/move":t.type==="char/move"&&Rt&&!Ko&&t.id===Rt.id&&(Rt=null),Jt(e),td(),Xa(),S==="ranch"?es():S==="park"&&qs();break;case"char/add":case"char/delete":case"char/hold":case"char/release":Xt(e),Jt(e),xt(),Ct==="__people"&&It();break;case"item/move":case"item/flip":case"item/delete":case"item/size":Xt(e),Jt(e),xt();break;case"baby/meet":case"baby/name":case"baby/care":case"baby/hold":case"baby/place":case"baby/ease":Jt(e),xt();break;case"settings/sound":uh(e);break;default:Xt(e)}});function mt(e){if(!e)return;const t=e.querySelector(":scope > .inner")??e;t.classList.remove("bounce"),t.offsetWidth,t.classList.add("bounce")}function od(e,t,n=7){const s=M("fx"),o=["#ffd166","#ff8fab","#8ecae6","#80ed99","#c9a0dc"];for(let i=0;i<n;i++){const a=document.createElement("div");a.className="spark";const r=Math.PI*2*i/n+Math.random()*.5,l=40+Math.random()*30;a.style.left=e+"px",a.style.top=t+"px",a.style.background=o[i%o.length],a.style.setProperty("--dx",Math.cos(r)*l+"px"),a.style.setProperty("--dy",Math.sin(r)*l+"px"),s.appendChild(a),setTimeout(()=>a.remove(),650)}}const Pr=e=>{const t=e?.getBoundingClientRect();t&&od(t.left+t.width/2,t.top+t.height/2)};function id(e,t){od(e,t,10),P.pop()}function Fa(e){Bt.forEach((t,n)=>{t.classList.toggle("hold-target",!!e&&e.c.id===n),t.dataset.hand=e&&e.c.id===n?e.hand:""})}function wh(e,t){C.dispatch({type:"char/hold",id:e.c.id,hand:e.hand,room:e.c.room,itemId:t}),st=null,Xt(C.get());const n=Bt.get(e.c.id);mt(n),Pr(n?.querySelector(`.held[data-hand="${e.hand}"]`)),P.sparkle()}const gn=new Map;let Qt=!1,ja=0;const ad=()=>[...gn.values()].reduce((e,t)=>e+t,0)/gn.size;F.addEventListener("pointerdown",e=>{e.pointerType==="touch"&&(gn.set(e.pointerId,e.clientX),gn.size>=2&&(Qt=!0,ja=ad(),Lr(),xe.classList.add("hidden")))},!0);window.addEventListener("pointermove",e=>{if(gn.has(e.pointerId)&&(gn.set(e.pointerId,e.clientX),Qt&&gn.size>=2)){const t=ad();Fe(ae-(t-ja)/yt()),ja=t}},!0);const vh=e=>{gn.delete(e.pointerId),gn.size<2&&Qt&&(gn.size===0?Qt=!1:ja=ad())};window.addEventListener("pointerup",vh,!0);window.addEventListener("pointercancel",vh,!0);const no=80;function l9(e,t){const n=F.getBoundingClientRect();return t<n.top-40||t>n.bottom+10?0:e<n.left+no?-Math.min(1,(n.left+no-e)/no)*16:e>n.right-no?Math.min(1,(e-(n.right-no))/no)*16:0}function ls(e,t){let n=e,s=0;const o=()=>{const r=Qt?0:l9(n.clientX,n.clientY);if(r){const l=ae;Fe(ae+r),ae!==l&&t.onMove(n)}s=requestAnimationFrame(o)};t.edgeScroll!==!1&&(s=requestAnimationFrame(o));const i=r=>{r.pointerId===e.pointerId&&(r.preventDefault(),n=r,Qt||t.onMove(r))},a=r=>{r.pointerId===e.pointerId&&(cancelAnimationFrame(s),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",a),t.onUp(r))};window.addEventListener("pointermove",i,{passive:!1}),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a)}function c9(e){return new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,pointerId:e.pointerId,pointerType:e.pointerType,button:e.button,buttons:e.buttons,isPrimary:e.isPrimary})}function d9(e,t){const n=t.target,s=n&&n.closest?n.closest("img.artimg"):null;if(s&&!Ic(s,t.clientX,t.clientY)){const o=Z5(t.clientX,t.clientY),i=o?.closest(".item"),a=o?.closest(".char");i&&i!==e?(t.stopPropagation(),oc(i,t)):a&&(t.stopPropagation(),a.dispatchEvent(c9(t)));return}oc(e,t)}function f9(e,t){if(t.preventDefault(),t.stopPropagation(),Qt)return;const n=e.dataset.id,s=t.clientX,o=t.clientY;ls(t,{edgeScroll:!1,onMove(){},onUp(i){Math.hypot(i.clientX-s,i.clientY-o)>6||G9(e,n)}})}function oc(e,t,n=!1){if(t.preventDefault(),t.stopPropagation(),Qt)return;if(Be.isPlay()){f9(e,t);return}if(!Ht()){Rn(e);return}const s=C.get(),o=s.currentRoom,i=e.dataset.id,a=s.rooms[o].items.find(g=>g.id===i);if(!a)return;const r=Me[a.kind],l=At(t.clientX,t.clientY),c={x:a.x-l.x,y:a.y-l.y};let f=n,d=null;st=i,C.dispatch({type:"item/front",room:o,id:i}),e.classList.add("lifted"),P.pick(),ls(t,{onMove(g){const h=At(g.clientX,g.clientY);Math.hypot(h.x-l.x,h.y-l.y)>6&&(f=!0),f&&(xe.classList.add("hidden"),ya.classList.add("show")),ya.classList.toggle("hot",Ff(g.clientX,g.clientY));const m=r.w*Ge(a)/2;C.dispatch({type:"item/move",room:o,id:i,x:Math.max(m*.6,Math.min(_e-m*.6,h.x+c.x)),y:Vg(r,h.y+c.y),...f?{stand:!0}:{}}),f&&xe.classList.add("hidden"),d=f&&r.holdable?ih(h):null,Fa(d)},onUp(g){if(e.classList.remove("lifted"),ya.classList.remove("show","hot"),Fa(null),f&&Ff(g.clientX,g.clientY)){st=null,C.dispatch({type:"item/delete",room:o,id:i}),id(g.clientX,g.clientY);return}if(f&&d){wh(d,i);return}f?(P.drop(),mt(e)):(P.click(),Uh(i),Zx(e)),Xt(C.get())}})}function p9(e,t,n){if(n.preventDefault(),n.stopPropagation(),Qt||Be.isPlay())return;const s=e.dataset.cid,o=t.dataset.hand,i=C.get().characters.find(f=>f.id===s),a=i?.held[o];if(!i||!a)return;const r=t.getBoundingClientRect(),l=At(r.left+r.width/2,r.bottom);C.dispatch({type:"char/release",id:s,hand:o,x:l.x,y:l.y});const c=se.querySelector(`.item[data-id="${a.id}"]`);c&&oc(c,n,!0)}function g9(e){e.addEventListener("pointerdown",t=>{const n=t.target.closest(".held"),s=n?.querySelector("img.artimg"),o=!!s&&!Ic(s,t.clientX,t.clientY);if(n&&!o){if(Be.isPlay()){t.preventDefault(),t.stopPropagation();return}if(!Ht()){t.stopPropagation(),Rn(e);return}return p9(e,n,t)}if(t.preventDefault(),t.stopPropagation(),Qt||Be.isPlay()&&!sh())return;if(!Ht()){Rn(e);return}st=null,Xt(C.get());const i=e.dataset.cid;Te=i;const a=C.get(),r=a.characters.find(h=>h.id===i);if(!r)return;const l=At(t.clientX,t.clientY),c=$t(a.currentRoom,Mt(r),r),f={x:c.x-l.x,y:c.y-l.y};let d=c.x,g=!1;e.classList.add("lifted"),P.pick(),Jt(C.get()),ki=!0,ls(t,{onMove(h){const m=At(h.clientX,h.clientY),k=m.x+f.x;if(Math.hypot(m.x-l.x,m.y-l.y)>6&&(g=!0),!g)return;const _=C.get().characters.find(u=>u.id===i);if(!_)return;if(Math.abs(k-d)>3){const u=k<d;u!==_.flip&&C.dispatch({type:"char/update",id:i,patch:{flip:u}}),d=k}const y=Math.max(_o+40,m.y+f.y);Yo(i,a.currentRoom,k,y,null),Be.isPlay()&&(bi=Qa(h.clientX,h.clientY)?.id??null),document.querySelectorAll(".tab").forEach(u=>u.classList.remove("drop")),document.elementFromPoint(h.clientX,h.clientY)?.closest(".tab:not(.on)")?.classList.add("drop")},onUp(h){ki=!1,bi=null,e.classList.remove("lifted"),document.querySelectorAll(".tab").forEach(v=>v.classList.remove("drop"));const m=document.elementFromPoint(h.clientX,h.clientY)?.closest("[data-room]"),k=C.get().characters.find(v=>v.id===i);if(!g||!k){P.click();return}if(m&&m.dataset.room!==a.currentRoom){const v=m.getBoundingClientRect();od(v.left+v.width/2,v.top+v.height/2,9),P.swish(),Yo(i,m.dataset.room,k.x,k.y,null);return}const _=At(h.clientX,h.clientY),y=_.x+f.x,u=Math.max(_o+40,_.y+f.y);if(Be.isPlay()){const v=Qa(h.clientX,h.clientY),x=fi({mode:"play",via:"drag",releaseX:y,releaseY:u,piece:v?Cr(v):null,occupied:wi(i)});Yo(i,a.currentRoom,x.x,x.y,x.seat)}else Yo(i,a.currentRoom,y,u,null);P.drop(),mt(e),requestAnimationFrame(()=>Us(!0))}})})}function h9(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Be.isPlay()){n.stopPropagation();return}if(!Ht()){Rn(e);return}const s=document.createElement("div");s.className="ghost",s.innerHTML=hn(t),document.body.appendChild(s);const o=Math.max(1,60/(Math.max(t.w,ct(t))*yt())),i=t.w*yt()*o,a=ct(t)*yt()*o;s.style.width=i+"px",s.style.height=a+"px";let r=null;const l=d=>{s.style.left=d.clientX-i/2+"px",s.style.top=d.clientY-a*.8+"px",r=t.holdable&&Jl(d.clientX,d.clientY)?ih(At(d.clientX,d.clientY)):null,Fa(r)};l(n),P.pick(),e.classList.add("pressed");const c=n.clientX,f=n.clientY;ls(n,{onMove:l,onUp(d){s.remove(),e.classList.remove("pressed"),Fa(null);const g=C.get().currentRoom,h=Math.hypot(d.clientX-c,d.clientY-f)<8;let m,k;if(h)m=ae+380+Math.random()*240,k=t.wall?Math.min(Ug,200+ct(t)/2):500+Math.random()*40;else if(Jl(d.clientX,d.clientY)){const u=At(d.clientX,d.clientY);m=u.x,k=Vg(t,u.y+ct(t)*.2)}else return;const _={id:Xl(t.kind.replace(/[^a-z0-9-]/gi,"")),kind:t.kind,x:m,y:k,flip:!1,z:0,scale:1};if(g!=="backyard"&&C.get().rooms[g].items.length===0){const u=Kx(v=>Xl(v),g);for(let v=0;v<u.length;v++)C.dispatch({type:"item/add",room:g,item:u[v]})}if(C.dispatch({type:"item/add",room:g,item:_}),!h&&r){wh(r,_.id);return}st=_.id,Xt(C.get());const y=se.querySelector(`.item[data-id="${_.id}"]`);mt(y),Pr(y),P.sparkle()}})})}function u9(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),Be.isPlay())return;if(!Ht()){Rn(e);return}const s=C.get().characters.find(g=>g.id===t);if(!s)return;const o=Ai(s),i=as*o*yt(),a=un*o*yt(),r=document.createElement("div");r.className="ghost",r.innerHTML=bt(s),r.style.width=i+"px",r.style.height=a+"px",document.body.appendChild(r);const l=g=>{r.style.left=g.clientX-i/2+"px",r.style.top=g.clientY-a*.85+"px"},c=n.clientX,f=n.clientY;let d=!1;r.style.visibility="hidden",ls(n,{onMove(g){Math.hypot(g.clientX-c,g.clientY-f)>8&&(d=!0,r.style.visibility=""),l(g)},onUp(g){if(r.remove(),!d){P.click(),Te=t,xo("dress");return}if(!Jl(g.clientX,g.clientY))return;const h=At(g.clientX,g.clientY),m=C.get().currentRoom;C.dispatch({type:"char/move",id:t,room:m,x:h.x,y:Math.max(_o+40,h.y+un*o*.15)}),Te=t,Jt(C.get());const k=Bt.get(t);mt(k),Pr(k),P.sparkle()}})})}function _h(){if(!Ht())return Rn(null),null;const e=C.get();if(e.characters.length>=Lo)return null;const t=Xl("c"),n=gr();C.dispatch({type:"char/add",char:ts({id:t,...pr(n),look2:n,room:e.currentRoom,x:ae+300+Math.random()*400,y:520+Math.random()*40})}),Te=t,Jt(C.get());const s=Bt.get(t);return mt(s),Pr(s),P.sparkle(),t}function m9(){return jc==="all"?"all":C.get().currentRoom}function It(){const e=C.get().currentRoom,t=m9(),n=Nc.find(l=>l.id===e)?.name??"This room",s=t==="all";M("roomFilter").innerHTML=`<button class="rf ${s?"on":""}" data-rf="${s?"room":"all"}">${s?"Just "+n:"All rooms"}</button>`;const o=al("secrets").length>0,i=$o.filter(l=>l.id!=="secrets"&&(l.kind==="people"||l.kind==="pack"&&e!=="backyard"||al(l.id).length));!(Ct==="secrets"&&o)&&!i.some(l=>l.id===Ct)&&(Ct=i[1]?.id??"__people"),M("cats").innerHTML=i.map(l=>`<button class="cat ${l.kind} ${l.id===Ct?"on":""}" data-cat="${l.id}" aria-label="${l.name}" title="${l.name}">${l.kind==="people"?CM:l.kind==="pack"?`<span class="packicon">${hn(Me[l.icon])}</span><span class="packname">${l.name}</span>`:hn(Me[l.icon])}</button>`).join("")+(o?`<button class="cat secretTab ${Ct==="secrets"?"on":""}" data-cat="secrets" aria-label="Secrets" title="Secrets">🎁</button>`:"");const a=M("shelf");if(Za.length=0,a.innerHTML="",!Ht()){a.innerHTML='<div class="empty locked">🔒 This house is look-only right now</div>';return}if(Ct==="__people"){const l=C.get(),c=Qs();if(c){const f=document.createElement("button");f.className="thing person me",f.setAttribute("aria-label","Me"),f.innerHTML=`<div class="face">${bt(c)}</div><span class="meStar">★</span>`,f.addEventListener("click",()=>{P.click(),Te=ut,xo("dress")}),a.appendChild(f)}for(const f of l.characters){const d=document.createElement("button");d.className="thing person",d.setAttribute("aria-label","Character"),d.innerHTML=`<div class="face">${bt(f)}</div><span class="where" style="background:${Qg(f.room)}"></span>`,a.appendChild(d),u9(d,f.id)}if(l.characters.length<Lo){const f=document.createElement("button");f.className="thing add",f.setAttribute("aria-label","New character"),f.innerHTML=qg,f.addEventListener("click",()=>{_h()&&(It(),xo("dress"))}),a.appendChild(f)}return}const r=al(Ct);r.length||(a.innerHTML='<div class="empty">Nothing here yet!</div>');for(const l of r){const c=document.createElement("button");c.className="thing",c.setAttribute("aria-label",l.name),c.dataset.kind=l.kind;const f=ko()&&Is(l.kind)?mh.get(l.kind):void 0;if(f)for(let d=0;d<f.length;d++)c.appendChild(f[d]);else c.innerHTML=V5(l,xd(l.kind));a.appendChild(c),h9(c,l)}a.scrollLeft=0,rd(),a9(),bh()}function rd(){const e=document.querySelector(".drawerTop"),t=document.getElementById("drawerBar");!e||!t||t.classList.toggle("more",e.scrollWidth-e.clientWidth-e.scrollLeft>6)}document.querySelector(".drawerTop").addEventListener("scroll",rd,{passive:!0});window.addEventListener("resize",rd);function Xf(e,t,n){return`<div class="sw">${e.map(s=>`<button class="dot ${s===t?"on":""}" style="background:${s}" data-act="${n}" data-v="${s}"></button>`).join("")}</div>`}let vi=null,ro=!1;function y9(e){if(e===ut){const n=Qs();if(!n||n.look2)return;Vn(ut,di(xa(n)));return}const t=C.get().characters.find(n=>n.id===e);!t||t.look2||Vn(e,{...di(xa(t)),size:t.size})}function _n(){const e=C.get(),t=M("card");if(vi==="paint"){t.classList.remove("avCard");const n=e.rooms[e.currentRoom],s=Rl.filter(a=>a.kind==="wallpaper"),o=Rl.filter(a=>a.kind==="floor"),i=(a,r,l,c)=>`<button class="dot pat tile ${a.id===r?"on":""}" data-act="${l}" data-v="${a.id}" title="${a.name} (${Gp(a.pack)})" style="background-color:${c};background-image:${ec(a.url)};background-size:48px auto"></button>`;t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${Xf(LM,n.wallpaper,"wall")}
      <h3>Wallpaper</h3><div class="sw">${ah.map((a,r)=>`<button class="dot pat ${!n.wallTile&&r===n.pattern?"on":""}" data-act="pat" data-v="${r}" style="background-color:${n.wallpaper};background-image:${a};background-size:${r===1?"16px 16px":r===3?"20px 20px":"auto"}"></button>`).join("")}${s.map(a=>i(a,n.wallTile,"wtile",n.wallpaper)).join("")}</div>
      <h3>Floor</h3>${Xf(EM,n.floor,"floor")}
      ${o.length?`<h3>Floor style</h3><div class="sw"><button class="dot pat ${n.floorTile?"":"on"}" data-act="ftile" data-v="" style="background-color:${n.floor};background-image:${rh}"></button>${o.map(a=>i(a,n.floorTile,"ftile",n.floor)).join("")}</div>`:""}`}else if(vi==="dress"){t.classList.add("avCard");let n=e,s=Qs(),o=s?ts({id:ut,...s}):null,i=Te===ut&&o?o:n.characters.find(r=>r.id===Te)??o??n.characters[0];i&&!i.look2&&y9(i.id),n=C.get(),s=Qs(),o=s?ts({id:ut,...s}):null,i=Te===ut&&o?o:n.characters.find(r=>r.id===Te)??o??n.characters[0];const a=`<div class="picker">${o?`<button class="pk me ${i?.id===ut?"on":""}" data-act="pickc" data-v="${ut}"><div class="face">${bt(o)}</div><span class="meStar">★</span></button>`:""}${n.characters.map(r=>`<button class="pk ${r.id===i?.id?"on":""}" data-act="pickc" data-v="${r.id}"><div class="face">${bt(r)}</div><span class="where" style="background:${Qg(r.room)}"></span></button>`).join("")}${n.characters.length<Lo?`<button class="pk add" data-act="newc">${qg}</button>`:""}</div>`;if(!i){t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${a}<div class="dress"><p class="hint">Tap + to make someone new!</p></div>`;return}Te=i.id,t.innerHTML=Px(i,a,ro,Ut.trash)}}function xo(e){vi=e,ro=!1,_n(),M("sheet").classList.remove("hidden"),P.swish()}M("sheet").addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(e.target===M("sheet")||t?.dataset.act==="close"){M("sheet").classList.add("hidden"),vi=null,P.click(),Ct==="__people"&&It();return}if(!t)return;const n=C.get(),s=n.currentRoom,o=t.dataset.v,i=Te??"",a=t.dataset.act;if(a!=="delc"&&(ro=!1),a&&a.indexOf("av-")===0){const r=i===ut?Qs():C.get().characters.find(f=>f.id===i);if(a==="av-surprise"){Vn(i,{...di(gr()),size:r?.size??"kid"}),P.sparkle(),_n(),mt(document.querySelector(".avStage"));return}const l=r?.look2??xa(r??{}),c=Tx(l,a,o??"");if(!c){P.click(),_n();return}Vn(i,{...di(c),size:r?.size??"kid"}),P.sparkle(),_n(),mt(document.querySelector(".avStage"));return}switch(a){case"wall":C.dispatch({type:"room/wallpaper",room:s,color:o});break;case"floor":C.dispatch({type:"room/floor",room:s,color:o});break;case"pat":C.dispatch({type:"room/pattern",room:s,pattern:+o});break;case"wtile":C.dispatch({type:"room/wallTile",room:s,tile:o});break;case"ftile":C.dispatch({type:"room/floorTile",room:s,tile:o||null});break;case"skin":case"hair":case"shirt":case"pants":Vn(i,{[a]:o});break;case"hs":Vn(i,{hairStyle:+o});break;case"acc":Vn(i,{acc:+o});break;case"size":{const r=i===ut?Qs():C.get().characters.find(l=>l.id===i);Vn(i,{size:o,...r?.look2?{look2:r.look2}:{}}),Jt(C.get());break}case"pickc":Te=o,Jt(C.get()),P.click(),_n();return;case"newc":if(!_h())return;break;case"delc":if(i===ut||!Ht())return;if(!ro){ro=!0,P.click(),_n();return}ro=!1;{const l=Bt.get(i)?.getBoundingClientRect();C.dispatch({type:"char/delete",id:i}),l?id(l.left+l.width/2,l.top+l.height/2):P.pop()}Te=C.get().characters[0]?.id??null,_n();return}P.sparkle(),_n(),mt(document.querySelector(".preview"))});M("tabs").addEventListener("click",e=>{const t=e.target.closest("[data-room]");if(!t)return;const n=t.dataset.room;n!==C.get().currentRoom&&(st=null,P.swish(),F.classList.remove("swap"),F.offsetWidth,F.classList.add("swap"),C.dispatch({type:"room/switch",room:n}))});M("cats").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");t&&(Ct=t.dataset.cat,P.click(),It())});M("roomFilter").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");if(t){Ct=t.dataset.cat,P.click(),It();return}const n=e.target.closest("[data-rf]");n&&(jc=n.dataset.rf==="all"?"all":"",P.click(),It())});xe.addEventListener("pointerdown",e=>e.stopPropagation());xe.addEventListener("click",e=>{const t=e.target.closest("[data-a]");if(!t||!st)return;if(!Ht()){Rn(null);return}const n=C.get().currentRoom,s=st,o=se.querySelector(`.item[data-id="${s}"]`);switch(t.dataset.a){case"smaller":case"bigger":{const i=C.get().rooms[n].items.find(l=>l.id===s);if(!i)break;const a=Ss.indexOf(Rs(i.size)),r=t.dataset.a==="smaller"?a-1:a+1;if(r<0||r>=Ss.length)break;C.dispatch({type:"item/size",room:n,id:s,size:Ss[r]}),P.click(),mt(o);break}case"flip":C.dispatch({type:"item/flip",room:n,id:s}),P.swish(),mt(o);break;case"front":C.dispatch({type:"item/front",room:n,id:s}),P.click(),mt(o);break;case"back":C.dispatch({type:"item/back",room:n,id:s}),P.click(),mt(o);break;case"delete":{const i=o?.getBoundingClientRect();st=null,C.dispatch({type:"item/delete",room:n,id:s}),i&&id(i.left+i.width/2,i.top+i.height/2);break}}});F.addEventListener("pointerdown",e=>{if(e.target.closest(".nudge"))return;Lr();const t=e.clientX,n=ae;let s=!1,o=0,i=e.clientX,a=performance.now();ls(e,{edgeScroll:!1,onMove(r){if(Math.abs(r.clientX-t)>6&&(s=!0),!s)return;const l=performance.now();o=(r.clientX-i)/Math.max(1,l-a),i=r.clientX,a=l,Fe(n-(r.clientX-t)/yt())},onUp(){if(!s){st&&(st=null,Xt(C.get()));return}if(Qt)return;let r=-o*16/yt();const l=()=>{Math.abs(r)<.3||(Fe(ae+r),r*=.92,ho=requestAnimationFrame(l))};ho=requestAnimationFrame(l)}})});F.addEventListener("wheel",e=>{e.preventDefault(),Lr(),Fe(ae+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/yt())},{passive:!1});M("nudgeL").addEventListener("pointerdown",e=>{e.stopPropagation(),P.swish(),Er((yi??ae)-re*.6)});M("nudgeR").addEventListener("pointerdown",e=>{e.stopPropagation(),P.swish(),Er((yi??ae)+re*.6)});const Jf=M("minimap");Jf.addEventListener("pointerdown",e=>{e.stopPropagation(),e.preventDefault();const t=n=>{const s=Jf.getBoundingClientRect();Er((n.clientX-s.left)/s.width*_e-re/2)};t(e),P.click(),ls(e,{edgeScroll:!1,onMove:t,onUp(){}})});M("btnPaint").addEventListener("click",()=>{if(!Ht())return Rn(null);xo("paint")});M("btnDress").addEventListener("click",()=>xo("dress"));M("btnSound").addEventListener("click",()=>{C.dispatch({type:"settings/sound",on:!C.get().soundOn}),P.click()});document.addEventListener("gesturestart",e=>e.preventDefault());document.addEventListener("contextmenu",e=>e.preventDefault());"serviceWorker"in navigator&&navigator.serviceWorker.register("/kids-house-game/sw.js");window.__store=C;window.__items=Object.fromEntries(bn.filter(e=>e.img).map(e=>[e.kind,{w:e.w,h:ct(e),cat:e.cat,holdable:e.holdable,svg:e.img.includes(".svg")}]));window.__cam={get:()=>ae,set:Fe};window.__phoneShowKids=()=>ot();window.__avatar={richAvatars:Vc,randomLook2:gr,look2FromLegacy:xa,legacyFromLook2:pr,sanitizeLook2:xi,handsFor:xr};window.__frameHouseKid=()=>Us(!0);window.__layoutNameTags=()=>gg();window.__lie={bedArt:ur,lieBedKinds:uu,lieOffset:La,lieSpot:ku,box(e){const t=Me[e];return t?{w:t.w,h:ct(t)}:null}};window.__paint=()=>{xt()};const de=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Ht(){return!b||Ie===K||b.canEdit(Pe)}function Rn(e){P.pop();const t=M("houseTag");t.classList.add("show"),t.classList.remove("wiggle"),t.offsetWidth,t.classList.add("wiggle"),window.clearTimeout(Ga),Ga=window.setTimeout(()=>{S==="house"&&b&&!document.body.classList.contains("own-house")||t.classList.remove("show")},2e3),e&&(e.classList.remove("nope"),e.offsetWidth,e.classList.add("nope")),Z("🔒 Look-only house: ask the owner to unlock it!",1800)}const be=()=>b?.myPresence()??null,Qs=()=>b?b.players.get(b.pid)?.look??null:null;function Vn(e,t){if(e===ut){const n=Qs();if(!n||!b)return;b.setLook(Ci({...n,...t})),xt(),S==="street"&&Ya(),S==="park"&&qs(),S==="ranch"&&es();return}C.dispatch({type:"char/update",id:e,patch:t})}function je(e){b?.setPresence(e)}function b9(e){const t=be();t&&t.where==="house"&&je({...t,room:e})}function $h(e){Ie=e,Wg(e),st=null,setTimeout(()=>c0.update());for(const t of Object.keys(za))delete za[t];Te=e===K?e.get().characters[0]?.id??null:ut,zs(),It()}function ld(e,t,n,s){return`<div class="inner">${bt(e,n,s)}</div><div class="nametag">${de(t)}</div>`}function xt(){const e=new Set;if(b&&Ie!==K&&S==="house"){const n=C.get().currentRoom,s=[...b.presence.entries()],o=be();o&&s.push([b.pid,o]);for(const[i,a]of s){const r=b.players.get(i);if(!r||a.where!=="house"||a.houseId!==Pe||a.room!==n)continue;e.add(i);let l=Ls.get(i);(!l||!l.isConnected)&&(l=document.createElement("div"),l.className="char avatar "+(i===b.pid?"mine":"other"),l.dataset.pid=i,se.appendChild(l),Ls.set(i,l),i===b.pid?k9(l):l.addEventListener("pointerdown",y=>{y.preventDefault(),y.stopPropagation()}));const c=r.look,f=Bn(i,a),d=f?.pose??null,g=ri(C.get())===i,h=JSON.stringify(c)+r.nickname+(d||"")+(g?"h":"");if(l.dataset.look!==h){const y=l.querySelector(".bubble");l.innerHTML=ld(c,r.nickname,d,g),y&&l.appendChild(y),l.dataset.look=h}l.classList.toggle("holding",g);const m=Os[c.size]??1,k=$t(n,f,a);Gs(l,k.x,k.y,as*m,un*m);const _=f&&C.get().rooms[n].items.find(y=>y.id===f.item);if(l.style.zIndex=String(_?1e3+_.z+1+f.n:5e3+Math.round(a.y)),l.classList.toggle("flipped",a.flip),l.classList.toggle("pose-sit",d==="sit"),l.classList.toggle("pose-lie",d==="lie"),l.classList.toggle("pose-lie-r",d==="lie"&&!!_?.flip),Ti(l,c,i===b.pid),g){const y=cg(c,d);y?gh("avatar",i,l,y,k.y):ph("avatar",i)}}}const t=ri(C.get());b&&S==="house"&&t&&e.has(t)||fh("avatar");for(const[n,s]of Ls)(!e.has(n)||!s.isConnected)&&(e.has(n)||s.remove(),Ls.delete(n));td(),Ys(),Sr(),Zs()}function k9(e){e.addEventListener("pointerdown",t=>{if(t.preventDefault(),t.stopPropagation(),Qt||!b)return;const n=be();if(!n||n.where!=="house")return;const s=At(t.clientX,t.clientY),o=$t(C.get().currentRoom,Bn(b.pid,n),n),i={x:o.x-s.x,y:o.y-s.y};let a=o.x,r=!1;e.classList.add("lifted"),P.pick(),ki=!0,ls(t,{onMove(l){const c=At(l.clientX,l.clientY),f=be();if(!f||f.where!=="house"||(Math.hypot(c.x-s.x,c.y-s.y)>6&&(r=!0),!r))return;const d=Math.max(40,Math.min(_e-40,c.x+i.x)),g=Math.max(_o+40,Math.min(ze,c.y+i.y)),h=Math.abs(d-a)>3?d<a:f.flip;Math.abs(d-a)>3&&(a=d),ka(f,d,g,h,null),xt(),qa(C.get()),Be.isPlay()&&(bi=Qa(l.clientX,l.clientY)?.id??null)},onUp(l){ki=!1,bi=null,e.classList.remove("lifted");const c=be();if(!r||!c||c.where!=="house"){P.click();return}const f=At(l.clientX,l.clientY),d=Math.max(40,Math.min(_e-40,f.x+i.x)),g=Math.max(_o+40,Math.min(ze,f.y+i.y));if(Be.isPlay()){const h=Qa(l.clientX,l.clientY),m=fi({mode:"play",via:"drag",releaseX:d,releaseY:g,piece:h?Cr(h):null,occupied:wi(void 0,b.pid)}),k=m.seat?{id:m.seat.item,pose:m.seat.pose,n:m.seat.n}:null;ka(c,m.x,m.y,c.flip,k)}else ka(c,d,g,c.flip,null);xt(),qa(C.get()),P.drop(),mt(e),requestAnimationFrame(()=>Us(!0))}})})}function w9(e){return e.kind==="text"?e.v:(e.kind==="phrase"?ti:Ap)[e.v]??""}function Po(){const e=document.querySelectorAll(".bubble");if(!document.body.classList.contains("phone")){e.forEach(s=>{(s.style.marginLeft||s.style.marginTop)&&(s.style.marginLeft="",s.style.marginTop="")});return}const t=F.getBoundingClientRect(),n=yt()||1;e.forEach(s=>{s.style.marginLeft="0px",s.style.marginTop="0px";const o=s.getBoundingClientRect();let i=0;o.width>=t.width-8||o.left<t.left+4?i=t.left+4-o.left:o.right>t.right-4&&(i=t.right-4-o.right);let a=0;o.top<t.top+4?a=t.top+4-o.top:o.bottom>t.bottom-4&&(a=t.bottom-4-o.bottom),i&&(s.style.marginLeft=i/n+"px"),a&&(s.style.marginTop=a/n+"px")})}function v9(e,t){const n=S==="street"?document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`):S==="park"?document.querySelector(`#pavatars .savatar[data-pid="${e}"]`):S==="ranch"?document.querySelector(`#ravatars .savatar[data-pid="${e}"]`):S==="gameroom"?document.querySelector(`#gavatars .savatar[data-pid="${e}"]`):Ls.get(e),s=n?[n]:[];for(const o of s){o.querySelector(".bubble")?.remove();const i=document.createElement("div");i.className="bubble"+(t.kind==="emote"?" emote":""),i.textContent=w9(t),o.appendChild(i),Po(),setTimeout(()=>i.classList.add("out"),4600),setTimeout(()=>i.remove(),5e3)}e!==b?.pid&&P.click()}function Tr(){const e=be();if(!b||!e)return 0;let t=0;return b.presence.forEach(n=>{Jm(e,n)&&t++}),t}function Ys(){const e=Tr();M("btnChat").classList.toggle("glow",e>0),Br();const t=document.getElementById("chatNear");t&&(t.textContent=e?`${e} friend${e>1?"s":""} nearby can hear you`:"Walk closer to a friend to talk!",M("chatTray").classList.toggle("nobody",!e))}function xh(){const e=M("chatTray");if(!b)return;const t=document.body.classList.contains("phone"),n=`<div class="phrases">${ti.map((a,r)=>`<button data-phrase="${r}">${de(a)}</button>`).join("")}</div>`,s=b.settings.freeChat?`<form class="typed" id="chatForm"><input id="chatInput" maxlength="${Lc}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>`:'<div class="presetsOnly">Picking from the bubbles above 💬</div>',o=t?'<button type="button" class="chatMore" data-chat="more">more</button>':"";e.innerHTML=`<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${Ap.map((a,r)=>`<button data-emote="${r}">${a}</button>`).join("")}</div>
    ${o}
    <div class="chatExtra${t?" hidden":""}">${n}${s}</div>`,Ys(),document.getElementById("chatForm")?.addEventListener("submit",a=>{a.preventDefault();const r=M("chatInput"),l=Vm(r.value);if(!l.ok){M("chatWarn").textContent=mr[l.reason]??"",P.pop();return}if(!Tr()){Z("Walk closer to a friend to talk!");return}b.say({kind:"text",v:l.text}),r.value="",M("chatWarn").textContent="",r.blur()})}M("chatTray").addEventListener("click",e=>{const t=e.target;if(!b)return;if(t.closest('[data-chat="close"]')){M("chatTray").classList.add("hidden");return}const n=t.closest('[data-chat="more"]');if(n){const i=M("chatTray").querySelector(".chatExtra");i?.classList.toggle("hidden"),n.textContent=i&&!i.classList.contains("hidden")?"less":"more";return}const s=t.closest("[data-emote]"),o=t.closest("[data-phrase]");if(!(!s&&!o)){if(!Tr()){Z("Walk closer to a friend to talk!");return}b.say(s?{kind:"emote",v:+s.dataset.emote}:{kind:"phrase",v:+o.dataset.phrase}),P.click()}});M("btnChat").addEventListener("click",()=>{M("chatTray").classList.toggle("hidden")||(xh(),P.swish())});function mn(){const e=document.body.classList,n=!!b&&Ie!==K&&S==="house"?b.houses.get(Pe):void 0,s=!!n&&n.meta.ownerId===b.pid;if(e.toggle("mode-hood",!!b),e.toggle("view-street",S!=="house"),e.toggle("view-park",S==="park"),e.toggle("view-ranch",S==="ranch"),e.toggle("view-map",S==="street"),e.toggle("view-gameroom",S==="gameroom"),e.toggle("in-barn",S==="ranch"&&Oe),e.toggle("mode-play",S==="house"&&Be.isPlay()),$d(),Ph(),e.toggle("own-house",s),e.toggle("locked",!!n&&!Ht()),e.toggle("has-hood",!!yr()),Br(),n){const o=b.players.get(n.meta.ownerId)?.nickname??"";M("houseTag").innerHTML=`${n.meta.locked?"🔒 ":""}<b>${de(n.meta.name)}</b>${s?" · yours":o?" · "+de(o):""}`;const i=M("lockIco");i&&(i.innerHTML=n.meta.locked?St.lockOn:St.lockOff);const a=n.meta.locked?"Unlock my house":"Lock my house";M("btnLock").setAttribute("aria-label",n.meta.locked?"Unlock house":"Lock house");const r=M("lockLabel");r&&(r.textContent=a)}Ys(),_9(),document.body.classList.contains("phone")&&jg()}let cl="",Ga=0;function _9(){const e=M("houseTag"),t=!!b&&S==="house"&&!document.body.classList.contains("own-house");if(S!=="house"||!b){cl="",e.classList.remove("show");return}if(t){e.classList.add("show");return}const n=Pe||"solo";cl!==n&&(cl=n,e.classList.add("show"),window.clearTimeout(Ga),Ga=window.setTimeout(()=>e.classList.remove("show"),2e3))}M("btnLock").addEventListener("click",()=>{const e=b?.houses.get(Pe);!e||e.meta.ownerId!==b.pid||(b.lock(e.meta.id,!e.meta.locked),P.click(),Z(e.meta.locked?"Unlocked: friends can decorate!":"Locked: friends can look but not change things"))});const kt=new Map;let ep="",ic=0,qe={w:Sn,h:Pn,portrait:!1};function $9(){return document.body.classList.contains("phone-portrait")?!0:document.body.classList.contains("phone")?!1:window.innerHeight>=window.innerWidth*1.25}function Mh(){const e=M("street"),t=qe.portrait&&!document.body.classList.contains("phone")?24:0,n=Math.max(1,e.clientWidth-t),s=Math.max(1,e.clientHeight-t);return Math.min(n/qe.w,s/qe.h)}function x9(e){const t=M("street"),n=M("mapWorld"),s=qe.w*e,o=qe.h*e;n.style.marginLeft=Math.max(0,Math.floor((t.clientWidth-s)/2))+"px",n.style.marginTop=Math.max(0,Math.floor((t.clientHeight-o)/2))+"px",t.scrollLeft=0,t.scrollTop=0,Lh()}function Lh(){const e=M("street"),t=M("mapWorld"),n=4,s=e.clientWidth-n,o=e.clientHeight-n,i=t.offsetLeft,a=t.offsetTop;t.querySelectorAll(".mapSign").forEach(r=>{r.style.transform="translateX(-50%)";const l=r.offsetWidth,c=r.offsetHeight,f=i+r.offsetLeft-l/2,d=a+r.offsetTop;let g=0,h=0;f<n&&(g=n-f),f+l+g>s&&(g-=f+l+g-s),d<n&&(h=n-d),d+c+h>o&&(h-=d+c+h-o),M9(r,g,h,i,a,n,s,o)})}function M9(e,t,n,s,o,i,a,r){const l=[...e.parentElement.querySelectorAll(".mapMail")],c=()=>{const d=e.offsetWidth,g=e.offsetHeight,h=s+e.offsetLeft-d/2+t,m=o+e.offsetTop+n;return{left:h,top:m,right:h+d,bottom:m+g,width:d,height:g}};for(let d=0;d<6;d++){const g=c(),h=l.find(x=>{const A=s+x.offsetLeft,O=o+x.offsetTop,H=A+x.offsetWidth,X=O+x.offsetHeight;return g.right>A+2&&g.left<H-2&&g.bottom>O+2&&g.top<X-2});if(!h)break;const m=s+h.offsetLeft,k=o+h.offsetTop,_=k+h.offsetHeight,y=c(),u=_+4-y.top,v=y.bottom-(k-4);y.top+u+y.height<=r?n+=u:y.top-v>=i?n-=v:t-=Math.min(y.right,m+h.offsetWidth)-Math.max(y.left,m)+6}const f=c();f.left<i&&(t+=i-f.left),f.right>a&&(t-=f.right-a),f.top<i&&(n+=i-f.top),f.bottom>r&&(n-=f.bottom-r),e.style.transform=Math.abs(t)>.5||Math.abs(n)>.5?`translate(calc(-50% + ${t.toFixed(1)}px), ${n.toFixed(1)}px)`:"translateX(-50%)"}document.fonts?.ready.then(()=>{S==="street"&&Lh()});function L9(){return b?[...b.houses.values()].map(e=>e.meta).sort((e,t)=>e.slot-t.slot):[]}function E9(e){const s=Math.round(97.5),o=Math.max(1,Math.ceil(e/(e===1?1:2))),i=158,a=318,l=a+(o-1)*i+s/2+108,c=Math.max(1020,l+78),f=Math.max(l,Math.min(c-88,Math.round(c*.74))),d=e===1?[280]:[150,410],g=e===1?1:2,h=Array.from({length:e},(m,k)=>({x:d[k%g],y:a+Math.floor(k/g)*i}));return{w:560,h:c,hw:104,hh:s,houses:h,square:{x:280,y:f},park:{x:96,y:122},club:{x:280,y:116},ranch:{x:458,y:120}}}function Es(e=!1){if(S!=="street")return;const t=M("mapWorld"),n=L9(),s=b?n.map(g=>({id:g.id,name:g.name,style:g.style,locked:g.locked,mine:g.ownerId===b.pid,lit:!!b.players.get(g.ownerId)?.online})):ic?Array.from({length:ic},(g,h)=>({id:"fake"+h,name:["Reagan","Quinn","Chloe","Sloane","Cada","Emma","Olivia","Charlotte","Amelia","Sophia","Isabella","Mia"][h%12]+"'s House",style:h,locked:h===3,mine:h===0,lit:h%3!==1})):[null],o=$9()?E9(Math.max(1,s.length)):null;qe=o?{w:o.w,h:o.h,portrait:!0}:{w:Sn,h:Pn,portrait:!1},document.body.classList.toggle("map-tall",!!o&&!document.body.classList.contains("phone"));const i=Mh(),a=(qe.portrait?"P":"L")+qe.w+"x"+qe.h+":"+i.toFixed(3)+JSON.stringify(n)+(b?n.map(g=>(b.players.get(g.ownerId)?.online?1:0)+(dl(g.id)?"u":"")).join("")+b.pid:"solo");if(!e&&a===ep&&t.querySelector("#mapFaces")){Ya();return}ep=a,t.style.width=qe.w*i+"px",t.style.height=qe.h*i+"px",t.style.setProperty("--sc",String(i)),t.innerHTML=`<div class="mapClip">${o?h0(o.w,o.h):g0()}</div>`;const r=t.querySelector(".mapClip"),l=g=>g*i+"px";kt.clear();const c=s.length;let f="",d="";if(o){const{hw:g,hh:h}=o,m=34,k=40;s.forEach((v,x)=>{const A=o.houses[x]??o.houses[0],O=v?`house:${v.id}`:"home",H=v?v.name:"My House";kt.set(v?"house:"+v.id:"home",{x:A.x,y:A.y-h/2-8});const X=!!(v&&dl(v.id)),ce=A.x<o.w/2?Math.max(4,A.x-g/2-m-8):Math.min(o.w-m-4,A.x+g/2+8),G=Math.max(4,Math.min(o.h-k-4,A.y-h*.42));f+=`<button class="mapSpot mapHouse ${v?.mine||!v?"mine":""}" data-go="${O}" aria-label="${de(H)}" style="left:${l(A.x-g/2)};top:${l(A.y-h/2)};width:${l(g)};height:${l(h)}">${Da(v?v.style:0,{lit:v?v.lit:!0})}${v?.locked?'<span class="lockBadge">🔒</span>':""}${v?.mine||!v?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${X?"up":""}" data-mail="${v?v.id:"home"}" aria-label="${de(H)} mailbox" style="left:${l(ce)};top:${l(G)};width:${l(m)};height:${l(k)}">${Xd(X)}</button>`,d+=`<div class="mapSign ${v?.mine||!v?"mine":""}" style="left:${l(A.x)};top:${l(A.y+h/2+2)}">${de(H)}</div>`});const _=(v,x,A,O,H,X,le,ce,G)=>{f+=`<button class="mapSpot ${v}" data-go="${x}" aria-label="${A}" style="left:${l(H-le/2)};top:${l(X-ce/2)};width:${l(le)};height:${l(ce)}">${O}</button>`,d+=`<div class="mapSign place" style="left:${l(H)};top:${l(X+G)}">${A==="The park"?"Park":A==="Rainbow Ranch"?"Rainbow Ranch":"Clubhouse"}</div>`};_("mapPark","park","The park",Sd,o.park.x,o.park.y,148,126,68),_("mapRanch","ranch","Rainbow Ranch",Pd,o.ranch.x,o.ranch.y,156,128,72),_("mapClub","gameroom","The clubhouse",Td,o.club.x,o.club.y,146,120,68),kt.set("park",{x:o.park.x,y:o.park.y-78}),kt.set("ranch",{x:o.ranch.x,y:o.ranch.y-80}),kt.set("barn",{x:o.ranch.x,y:o.ranch.y+8}),kt.set("gameroom",{x:o.club.x,y:o.club.y-74}),kt.set("square",o.square);const y=[{x:o.park.x,y:o.park.y,r:90},{x:o.ranch.x,y:o.ranch.y,r:96},{x:o.club.x,y:o.club.y,r:88},{x:o.square.x,y:o.square.y,r:70},...o.houses.map(v=>({x:v.x,y:v.y,r:78}))],u=o.w/2;r.insertAdjacentHTML("beforeend",Cd(y,(v,x)=>Math.abs(v-u)<34,o.w,o.h)+y0(o.w,o.h,y)+f+'<div class="mapFaces" id="mapFaces"></div>')}else{const g=t.querySelector("#mapRoad"),h=g.getTotalLength(),m=Array.from({length:160},(x,A)=>g.getPointAtLength(h*A/159)),k=(x,A)=>m.some(O=>Math.hypot(O.x-x,O.y-A)<50),_=ac(),y=c>8?80:94,u=y*300/320,v=Eh(g,c,_);s.forEach((x,A)=>{const O=v[A],H=x?`house:${x.id}`:"home",X=x?x.name:"My House";kt.set(x?"house:"+x.id:"home",{x:O.x,y:O.y-u/2-4});const le=!!(x&&dl(x.id)),ce=34,G=40,fe=14/i,on=Math.max(4,Math.min(Sn-ce-4,O.x+y/2+fe)),Ot=Math.max(4,Math.min(Pn-G-4,O.y-u*.22));f+=`<button class="mapSpot mapHouse ${x?.mine||!x?"mine":""}" data-go="${H}" aria-label="${de(X)}" style="left:${l(O.x-y/2)};top:${l(O.y-u/2)};width:${l(y)};height:${l(u)}">${Da(x?x.style:0,{lit:x?x.lit:!0})}${x?.locked?'<span class="lockBadge">🔒</span>':""}${x?.mine||!x?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${le?"up":""}" data-mail="${x?x.id:"home"}" aria-label="${de(X)} mailbox" style="left:${l(on)};top:${l(Ot)};width:${l(ce)};height:${l(G)}">${Xd(le)}</button>`,d+=`<div class="mapSign ${x?.mine||!x?"mine":""}" style="left:${l(O.x)};top:${l(O.y+u/2-2)}">${de(X)}</div>`}),f+=`<button class="mapSpot mapPark" data-go="park" aria-label="The park" style="left:${l(On.x-100)};top:${l(On.y-85)};width:${l(200)};height:${l(170)}">${Sd}</button>`,d+=`<div class="mapSign place" style="left:${l(On.x)};top:${l(On.y+70)}">Park</div>`,f+=`<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${l(ln.x-110)};top:${l(ln.y-90)};width:${l(220)};height:${l(180)}">${Pd}</button>`,d+=`<div class="mapSign place" style="left:${l(ln.x)};top:${l(ln.y+78)}">Rainbow Ranch</div>`,f+=`<button class="mapSpot mapClub" data-go="gameroom" aria-label="The clubhouse" style="left:${l(Wn.x-95)};top:${l(Wn.y-78)};width:${l(190)};height:${l(156)}">${Td}</button>`,d+=`<div class="mapSign place" style="left:${l(Wn.x)};top:${l(Wn.y+82)}">Clubhouse</div>`,kt.set("park",{x:On.x,y:On.y-60}),kt.set("ranch",{x:ln.x-30,y:ln.y-60}),kt.set("barn",{x:ln.x+10,y:ln.y+10}),kt.set("gameroom",{x:Wn.x,y:Wn.y-52}),r.insertAdjacentHTML("beforeend",Cd(_,k)+f+'<div class="mapFaces" id="mapFaces"></div>')}t.insertAdjacentHTML("beforeend",d),Ya(),x9(i)}const ac=()=>[{x:On.x,y:On.y,r:115},{x:ln.x,y:ln.y,r:125},{x:cn.x,y:cn.y,r:100},{x:Wn.x,y:Wn.y,r:90}];function Eh(e,t,n){const s=e.getTotalLength(),o=[];for(let i=0;i<t;i++){const a=t===1?.2:.05+.75*i/(t-1),r=e.getPointAtLength(s*a),l=e.getPointAtLength(Math.min(s,s*a+3));let c=-(l.y-r.y),f=l.x-r.x;const d=Math.hypot(c,f)||1;c/=d,f/=d;const g=[1,-1].map(k=>({x:r.x+c*72*k,y:r.y+f*72*k})).map(k=>({...k,score:Math.min(...n.map(_=>Math.hypot(_.x-k.x,_.y-k.y)-_.r),k.x-50,Sn-50-k.x,k.y-60,Pn-40-k.y)})),h=i%2?g:[g[1],g[0]],m=h[0].score>0||h[0].score>=h[1].score?h[0]:h[1];m.x=Math.max(60,Math.min(Sn-60,m.x)),m.y=Math.max(62,Math.min(Pn-72,m.y)),n.push({x:m.x,y:m.y,r:70}),o.push({x:m.x,y:m.y})}return o}window.__mapFake=e=>{ic=e,Es(!0)};window.__mapLayout=e=>{const t=document.querySelector("#mapRoad");if(!t)return null;const n=Eh(t,e,ac());let s=1e9,o=1e9,i=!0;return n.forEach((a,r)=>{n.forEach((l,c)=>{c>r&&(s=Math.min(s,Math.hypot(a.x-l.x,a.y-l.y)))}),ac().forEach(l=>{o=Math.min(o,Math.hypot(a.x-l.x,a.y-l.y)-l.r)}),(a.x<55||a.x>Sn-55||a.y<60||a.y>Pn-70)&&(i=!1)}),{n:e,minHouse:s,minSpot:o,inside:i}};function Ch(e){return e.where==="house"&&e.houseId?{kind:"house",houseId:e.houseId,room:e.room}:e.where==="park"||e.where==="ranch"||e.where==="barn"||e.where==="gameroom"?{kind:e.where}:{kind:"square"}}const C9=e=>e.kind==="house"?"house:"+e.houseId:e.kind;function Ya(){const e=document.getElementById("mapFaces");if(!e||S!=="street")return;const t=Mh(),n=new Set,s=[];if(b){const i=[...b.presence.entries()],a=be();a&&i.push([b.pid,a]);for(const[r,l]of i){const c=b.players.get(r);c&&s.push({key:r,look:c.look,name:c.nickname,mine:r===b.pid,place:Ch(l)})}}else{const i=K.get().characters[0];i&&s.push({key:"solo",look:Ci(i),name:"You",mine:!0,place:{kind:"square"}})}const o=new Map;for(const i of s){const a=C9(i.place);o.has(a)||o.set(a,[]),o.get(a).push(i)}for(const[i,a]of o)a.sort((r,l)=>r.mine?-1:l.mine?1:r.name.localeCompare(l.name)),a.forEach((r,l)=>{let c,f;const d=kt.get("square")??{x:cn.x,y:cn.y};if(i==="square")if(qe.portrait){const y=Math.floor(l/3),u=l%3,v=Math.min(3,a.length-y*3);c=d.x+(u-(v-1)/2)*176,f=d.y+y*112}else if(a.length===1)c=cn.x,f=cn.y;else{const k=-Math.PI/2+l*(Math.PI*2/a.length);c=cn.x+Math.cos(k)*78,f=cn.y+Math.sin(k)*78}else{const k=kt.get(i)??d,_=qe.portrait?2:3,y=qe.portrait?150:64,u=Math.floor(l/_),v=l%_,x=Math.min(_,a.length-u*_);c=k.x+(v-(x-1)/2)*y,f=k.y-u*(qe.portrait?108:64)}qe.portrait&&(c=Math.max(100,Math.min(qe.w-100,c)),f=Math.max(48,Math.min(qe.h-84,f))),n.add(r.key);let g=e.querySelector(`.mapFace[data-pid="${r.key}"]`);g||(g=document.createElement("button"),g.className="mapFace "+(r.mine?"mine":"other"),g.dataset.pid=r.key,g.setAttribute("aria-label",r.mine?"You":r.name),e.appendChild(g));const h=JSON.stringify(r.look)+r.name;if(g.dataset.look!==h){const k=g.querySelector(".bubble");g.innerHTML=`<span class="face">${gc(bt(r.look))}</span><span class="fname">${de(r.mine?"You":r.name)}</span>`,k&&g.appendChild(k),g.dataset.look=h}g.dataset.place=i;const m=qe.portrait?62:46;g.style.left=(c-m/2)*t+"px",g.style.top=(f-m/2)*t+"px",g.style.width=g.style.height=m*t+"px"});e.querySelectorAll(".mapFace").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),Ys()}function cd(){M("mapWorld").classList.remove("zoomIn")}function Sh(e,t){cd(),P.swish(),S9(e)}function Di(e){Eo()||(e.classList.remove("sceneIn"),e.offsetWidth,e.classList.add("sceneIn"),setTimeout(()=>e.classList.remove("sceneIn"),260))}function S9(e){e.kind==="house"?Bh(e.houseId,e.room):e.kind==="home"?Th():e.kind==="park"?O9():e.kind==="ranch"?$i(!1):e.kind==="barn"?$i(!0):e.kind==="gameroom"&&U9()}function P9(e){const t=b?.presence.get(e);if(!b||!t)return;const n=Ch(t),s=b.players.get(e)?.nickname??"your friend";if(n.kind==="square"){Z(`${s} is on the map too! 👋`),P.pop();return}document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`),Sh(n),setTimeout(()=>{const o=be();if(!o||!b)return;const i=t.x+(t.x>300?-110:110);if(n.kind==="house"&&o.where==="house")je({...o,x:i,y:t.y}),xt(),Er(i-re/2);else if((n.kind==="park"||n.kind==="ranch"||n.kind==="barn")&&o.where===n.kind){en({...o,x:i,y:Math.max(Ps,Math.min(Tn,t.y)),flip:i>t.x});const a=n.kind==="park"?cs():sn(),r=M(n.kind==="park"?"parkScroll":"ranchScroll");requestAnimationFrame(()=>{r.scrollLeft=t.x*a-r.clientWidth/2,ot()})}else if(n.kind==="gameroom"&&o.where==="gameroom"){const a=Co();a||en({where:"gameroom",x:i,y:Math.max(Ps,Math.min(Tn,t.y)),flip:i>t.x});const r=is(),l=M("grScroll"),c=a?.x??t.x;requestAnimationFrame(()=>{l.scrollLeft=c*r-l.clientWidth/2,ot()})}Z(`You found ${s}! 💕`)},420)}function dl(e){if(!b)return!1;const t=b.houses.get(e);return!!t&&t.meta.ownerId===b.pid&&kc(t.confirmed.mailbox)>0}let sa=0;function Ph(){Gg();const e=document.getElementById("mailCue"),t=b?.myHouseId()??"",n=b&&t?kc(b.houses.get(t)?.confirmed.mailbox):0;if(!b||S!=="street"||n<=0){n<=0&&(sa=0),e?.classList.remove("show");return}sa!==n&&(sa=n,e?.classList.add("show"),window.setTimeout(()=>{sa===n&&e?.classList.remove("show")},8e3))}function Br(){const e=b?.myHouseId()??"",t=b&&e?kc(b.houses.get(e)?.confirmed.mailbox):0,n=M("menuBadge");n.textContent=t>9?"9+":String(t),n.classList.toggle("on",t>0);const s=document.getElementById("mailNew");s&&(s.textContent=t>0?t===1?"1 new":t+" new":"",s.classList.toggle("on",t>0));const o=b?b.presence.size:0,i=M("mapBadge");i.textContent=o>9?"9+":String(o),i.classList.toggle("on",o>0),M("btnMap").setAttribute("aria-label",o>0?`Map, ${o} friends online`:"Map");const a=Tr(),r=M("chatBadge");r.textContent=a>9?"9+":String(a),r.classList.toggle("on",a>0)}function rc(e){e&&document.querySelectorAll(".toast").forEach(t=>t.remove()),M("menuPop").classList.toggle("hidden",!e),M("btnMenu").setAttribute("aria-expanded",e?"true":"false"),e&&Br(),T9()}function T9(){const e=M("houseTag");if(e.style.top="",!e.classList.contains("show")||M("menuPop").classList.contains("hidden"))return;const t=document.querySelector(".menuCard");if(!t)return;const n=M("stageWrap").getBoundingClientRect(),s=t.getBoundingClientRect(),o=e.getBoundingClientRect();if(!(o.top<s.bottom-2&&o.bottom>s.top+2&&o.left<s.right-2&&o.right>s.left+2))return;const a=s.bottom-n.top+8;a+o.height<n.height-8?e.style.top=a+"px":e.style.top=Math.max(8,n.height-o.height-10)+"px"}M("btnMenu").addEventListener("click",()=>{rc(M("menuPop").classList.contains("hidden")),P.click()});M("menuPop").addEventListener("click",e=>{const t=e.target;if(t.id==="menuPop"||t.closest("#menuClose")){rc(!1);return}t.closest(".menuRow")&&rc(!1)});M("btnMail").addEventListener("click",()=>{const e=b?.myHouseId();e?dd(e):Z("Join a street to send letters!")});M("secrets").addEventListener("click",()=>{if(S!=="house"){Z("Surprises are hiding in your house!");return}Be.isPlay()&&M("modeDecorate").click(),Ct="secrets",It(),Z("Surprises are in your drawer!")});function dd(e){if(!b||e==="home"||!b.houses.has(e)){Z("Join a street to send letters!");return}const t=b.houses.get(e);ba.open(e,t.meta.name,t.meta.ownerId===b.pid,t.confirmed.mailbox?.letters??[]),P.click()}M("mapWorld").addEventListener("click",e=>{const t=e.target;if(S!=="street")return;const n=t.closest(".mapMail");if(n){dd(n.dataset.mail||"home");return}const s=t.closest(".mapFace");if(s){s.classList.contains("mine")?(mt(s),P.pop(),Z("That's you! Tap a place to go there")):P9(s.dataset.pid);return}const o=t.closest("[data-go]");if(!o)return;const i=o.dataset.go;Sh(i.startsWith("house:")?{kind:"house",houseId:i.slice(6)}:{kind:i})});function Ks(){cd(),M("street").classList.add("hidden"),M("park").classList.add("hidden"),M("ranch").classList.add("hidden"),M("gameroom").classList.add("hidden"),ma()?.close(),M("chatTray").classList.add("hidden"),M("sheet").classList.add("hidden")}function uo(){cd(),He=null,_t=[],Oe=!1,b?je({where:"street",x:600,y:540,flip:!1}):Dt=null,Ks(),S="street",M("street").classList.remove("hidden"),M("streetTitle").textContent=b?"Our Neighborhood":"My Map",mn(),Es(!0);const e=M("mapWorld");e.style.transformOrigin="50% 50%",e.classList.remove("zoomIn","mapIn"),Eo()||(e.offsetWidth,e.classList.add("mapIn")),P.swish()}function Th(){if(b){const e=b.myHouseId();e&&b.houses.has(e)&&Bh(e);return}Ks(),S="house",Dt=null,Be.sync(!0),mn(),zs(),Di(M("stageWrap")),P.sparkle(),ns()}function Bh(e,t="living"){if(!b||!b.houses.has(e))return;Pe=e,S="house",Oe=!1,Be.sync(e===b.myHouseId());let n=Va.get(e);n||(n=n1(b,e,{get:()=>K.get().soundOn,set:s=>K.dispatch({type:"settings/sound",on:s})}),Va.set(e,n)),n.dispatch({type:"room/switch",room:t}),je({where:"house",houseId:e,room:t,x:900+Math.random()*300,y:540,flip:!1}),Ks(),$h(n),Di(M("stageWrap")),P.sparkle(),ns()}function fd(){b?.close(),b=null,Va=new Map,S="house",Pe="",Dt=null,He=null,_t=[],Oe=!1,M("elsewhere").classList.add("hidden"),Ks(),Be.sync(!0),$h(K),mn()}M("btnMap").addEventListener("click",()=>{if(S==="street"){P.pop();return}uo()});M("btnHome").addEventListener("click",()=>{if(S==="house"&&(!b||Pe===b.myHouseId())){P.pop();return}Th()});M("phoneOk").addEventListener("click",()=>{M("phoneNote").classList.add("hidden"),P.click()});M("elsewhereGo").addEventListener("click",()=>{P.click(),b?.connect()});M("btnSolo").addEventListener("click",()=>{fd(),Z("Playing in your own house 🏠")});window.addEventListener("resize",()=>{S==="street"&&Es(!0),S==="park"&&hd(),S==="ranch"&&vd(),S==="gameroom"&&Zc(),ot()});function pd(e){b=e,Va=new Map,e.on("players",()=>{b===e&&(S==="street"?Es():S==="park"?qs():S==="ranch"?(es(),$d()):S==="gameroom"?ai():(xt(),mn()),vi==="dress"&&_n())}),e.on("houses",()=>{b===e&&(S==="street"?Es():S==="house"&&!e.houses.has(Pe)&&(Z("That house is gone now"),uo()))}),e.on("houseMeta",t=>{b!==e||t!==Pe||S!=="house"||(st=null,mn(),Xt(C.get()),It(),Ht()||M("sheet").classList.add("hidden"))}),e.on("pres",()=>{b===e&&(S==="street"?Ya():S==="park"?qs():S==="ranch"?es():S==="gameroom"?ai():xt())}),e.on("ranch",()=>{b===e&&S==="ranch"&&Or(!0)}),e.on("ranchFail",t=>{b===e&&cc(t)}),e.on("noride",()=>{if(b!==e)return;const t=be();if(t?.ride!==void 0){const{ride:n,...s}=t;je(s),es()}Z("Someone is riding that horse!")}),e.on("fx",(t,n)=>{b===e&&rL(t,n)}),e.on("bubble",(t,n)=>{b===e&&v9(t,n)}),e.on("sayFail",t=>Z(t==="presetsOnly"?"Typing is turned off: pick a bubble!":mr[t]||"Couldn't send that")),e.on("mailbox",()=>{b===e&&(S==="street"&&Es(!0),Ph(),ba.refresh(),Br())}),e.on("mailFail",t=>{b===e&&ba.fail(t)}),e.on("settings",()=>{b===e&&(M("chatTray").classList.contains("hidden")||xh(),ba.refresh())}),e.on("removed",()=>{Z("A grown-up took this iPad off the street");const t=e.cfg;Cn({url:t.url,code:t.code,id:t.id,parentKey:t.parentKey}),fd()}),e.on("status",t=>{b===e&&(document.body.classList.toggle("reconnecting",t!=="online"&&!e.replaced),(t==="online"||t==="connecting")&&M("elsewhere").classList.add("hidden"))}),e.on("replaced",()=>{b===e&&M("elsewhere").classList.remove("hidden")}),e.on("table",()=>{if(b===e){if(S==="gameroom"){const t=Co(),n=be();t&&n?.where==="gameroom"&&Math.hypot(n.x-t.x,n.y-t.y)>40&&je({where:"gameroom",x:t.x,y:Math.max(Ps,Math.min(Tn,t.y)),flip:n.flip}),ai()}ma()?.refresh()}}),e.on("tblFail",(t,n)=>{b===e&&ma()?.fail(t,n)}),e.on("welcome",()=>{if(b===e)if(S==="street")Es(!0);else if(S==="park"||S==="ranch"){const t=be();t&&je(t),S==="park"?hd():vd(),ot()}else if(S==="gameroom"){const t=be();t&&je(t),Zc(),ot(),ma()?.refresh()}else e.houses.has(Pe)?zs():uo()}),e.on("reset",(t,n)=>{b===e&&n==="cuddling"&&Z("Someone is cuddling!")}),uo()}async function B9(){mn();const e=yr(),t=yo();if(!e||!t?.token||t.url!==e)return;const n=new br(t),s=await n.connect();s==="ok"?pd(n):(n.close(),s!=="closed"&&Z("Couldn't reach the street. Playing at home!"))}function qt(e,t,n=""){const s=document.createElement("div");s.className="sheet hoodSheet "+n,s.innerHTML=`<div class="card">${e}</div>`,document.body.appendChild(s),P.swish();const o=()=>s.remove();return s.addEventListener("click",i=>{const a=i.target;if(a===s||a.closest('[data-m="close"]'))return o();t(a,o,s)}),{root:s,close:o}}const Zt='<button class="close" data-m="close">✕</button>';M("btnHood").addEventListener("click",()=>R9());function R9(){const e=yr();if(!e){qt(`${Zt}<h2>Neighborhood</h2><p class="hint">The street isn't open yet. Ask a grown-up to set it up!</p>`,()=>{});return}const t=yo()?.url===e?yo():null;qt(`${Zt}<h2>Neighborhood</h2><div class="bigBtns">
      ${t?.token?`<button class="big go" data-m="go">${St.street}<span>Go to my street</span></button>`:`<button class="big go" data-m="join">${St.street}<span>Join a friend's street</span></button>`}
      <button class="big grown" data-m="create">${St.shield}<span>${t?.parentKey?"Grown-ups":"Grown-ups: start a street"}</span></button></div>`,async(n,s)=>{const o=n.closest("[data-m]")?.dataset.m;if(o==="go"){s();const i=new br(t),a=await i.connect();a==="ok"?pd(i):(i.close(),Z(a.startsWith("badtoken")?"Please join again":"Couldn't reach the street"))}o==="join"&&(s(),li(e)),o==="create"&&(s(),await Zp()&&(t?.parentKey?Rr():A9(e)))})}async function A9(e){let t;try{t=await e1(e)}catch{Z("Couldn't create a street right now");return}Cn({url:e,code:t.code,id:t.id,parentKey:t.parentKey}),qt(`${Zt}<h2>Your street is ready!</h2><p class="hint">Kids join with this code (you can pick your own on the grown-up screen):</p><div class="code" id="newCode">${t.code}</div>
    <p class="hint small">Grown-up key (keep it private; it opens the grown-up screen on another device):<br><b class="key" id="parentKey">${t.parentKey}</b></p>
    <div class="bigBtns"><button class="big grown" data-m="setup">${St.shield}<span>Add kids' names &amp; code</span></button>
    <button class="big go" data-m="joinhere">${St.street}<span>Join on this iPad</span></button></div>`,(n,s)=>{n.closest('[data-m="joinhere"]')&&(s(),gd(e,t.code)),n.closest('[data-m="setup"]')&&(s(),Rr())})}function li(e,t=""){const n=qt(`${Zt}<h2>Join a street</h2><p class="hint">Type the code a grown-up gave you</p>
    <form id="codeForm" class="codeForm"><input id="codeInput" maxlength="${Mc}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="CODE"/><button type="submit" class="go">Next</button></form>
    <p class="err">${de(t)}</p>`,()=>{}),s=n.root.querySelector("#codeInput");setTimeout(()=>s.focus(),50),s.addEventListener("input",()=>{s.value=Pa(s.value)}),n.root.querySelector("#codeForm").addEventListener("submit",o=>{o.preventDefault();const i=Pa(s.value);if(!am(i)){n.close(),li(e,"That code looks wrong. Try again!");return}n.close(),gd(e,i)})}async function gd(e,t,n=""){let s;try{s=await t1(e,t)}catch{li(e,"Couldn't reach the street. Try again!");return}if("slow"in s){li(e,"Too many tries. Ask a grown-up and try again in a few minutes.");return}if(!s.exists){li(e,"Hmm, we couldn't find that street.");return}window.__lastLookupId=s.id,D9(e,t,s.id,s.roster,n)}function D9(e,t,n,s,o=""){if(s.length){qt(`${Zt}<h2>Who are you?</h2>${o?`<p class="err">${de(o)}</p>`:'<p class="hint">Tap your name</p>'}<div class="nicks roster">${s.map((i,a)=>`<button data-nick="${a}" ${i.claimed?"disabled":""}>${de(i.name)}${i.claimed?"<small>signed in</small>":""}</button>`).join("")}</div>
      <p class="hint small">Not on the list? Ask a grown-up to add your name.</p>`,(i,a)=>{const r=i.closest("[data-nick]");if(!r||r.disabled)return;a();const l=s[+r.dataset.nick];l.hasHouse?Rh(e,t,n,l.name,void 0):tp(e,t,n,l.name)},"wide");return}qt(`${Zt}<h2>Pick your street name</h2>${o?`<p class="err">${de(o)}</p>`:""}<div class="nicks">${qd.map((i,a)=>`<button data-nick="${a}">${de(i)}</button>`).join("")}</div>`,(i,a)=>{const r=i.closest("[data-nick]");r&&(a(),tp(e,t,n,qd[+r.dataset.nick]))},"wide")}function tp(e,t,n,s){qt(`${Zt}<h2>Hi, ${de(s)}!</h2><p class="hint">What should your house on the street be?</p>
    <div class="bigBtns"><button class="big go" data-m="bring">${Da(2)}<span>Bring my house</span></button>
    <button class="big" data-m="fresh">${Da(5)}<span>Start a new one</span></button></div>`,(o,i)=>{const a=o.closest("[data-m]")?.dataset.m;a&&(i(),Rh(e,t,n,s,a==="bring"))})}async function Rh(e,t,n,s,o){const i=K.get(),a=i.characters[0],r=Ci(a??{});let l;if(o&&(l=i,a)){const{reduce:m}=await p(async()=>{const{reduce:k}=await Promise.resolve().then(()=>Zu);return{reduce:k}},void 0);l=m(i,{type:"char/delete",id:a.id})}const c=yo(),f={url:e,code:t,id:n,parentKey:c?.id===n||c?.code===t?c.parentKey:void 0},d=i.dog?{name:i.dog.name,breed:i.dog.breed}:null,g=new br(f),h=await g.connect({nickname:s,look:r,house:l,dog:d});if(h==="ok"){Cn(g.cfg),pd(g),Z(`Welcome to the street, ${s}!`),Bx()&&(Rx(),Te=ut,xo("dress"));return}g.close(),h.startsWith("nickname")?gd(e,t,h.endsWith("notOnList")?"That name is not on the list anymore.":"That name is already signed in on another iPad. Ask a grown-up!"):Z(h==="full"?"That street is full":"Couldn't join right now")}M("btnParent").addEventListener("click",async()=>{await Zp()&&Rr()});const I9={codeTaken:"That code is already used by another street. Try adding a number!",badCode:"Codes are 4–16 letters or numbers.",badName:"Use a first name only (letters).",rosterFull:`Up to ${rm} names.`,nameInUse:"Remove that player first.",codeFixed:"This street's code can't be changed."};async function Rr(){const e=yo();if(!e)return;if(!e.parentKey){const a=qt(`${Zt}<h2>Grown-up key</h2><p class="hint">Enter the key you got when the street was made</p><form id="keyForm" class="codeForm"><input id="keyInput" autocomplete="off" spellcheck="false"/><button class="go">OK</button></form>`,()=>{});a.root.querySelector("#keyForm").addEventListener("submit",r=>{r.preventDefault(),e.parentKey=a.root.querySelector("#keyInput").value.trim(),Cn(e),b&&(b.cfg.parentKey=e.parentKey),a.close(),Rr()});return}let t=b;t||(t=new br({...e,token:void 0}),await t.connect());const n=t,s=a=>o.root.querySelector(a).value,o=qt(`${Zt}<h2>Grown-up screen</h2><div id="parentBody"><p class="hint">Loading…</p></div>`,async a=>{const r=a.closest("[data-p]");if(!r)return;const l=r.dataset.p;if(l==="free"&&n.parent({op:"freeChat",on:r.dataset.on!=="1"}),l==="freeMail"&&n.parent({op:"freeMail",on:r.dataset.on!=="1"}),l==="rename"&&n.parent({op:"rename",houseId:r.dataset.hid,name:s(`input[data-hid="${r.dataset.hid}"]`)}),l==="add"&&n.parent({op:"rosterAdd",name:r.dataset.name??s("#rosterInput")}),l==="unname"&&n.parent({op:"rosterRemove",name:r.dataset.name}),l==="unclaim"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again";return}n.parent({op:"unclaim",name:r.dataset.name})}if(l==="setcode"&&n.parent({op:"setCode",code:s("#codeEdit")}),l==="remove"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again to remove";return}n.parent({op:"remove",pid:r.dataset.pid})}if(l==="mailClear"||l==="mailClearAll"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent=l==="mailClearAll"?"Tap again to clear every mailbox":r.dataset.id?"Tap again":"Tap again to clear this mailbox";return}l==="mailClearAll"?n.parent({op:"mailClearAll"}):n.parent({op:"mailClear",houseId:r.dataset.hid,...r.dataset.id?{id:r.dataset.id}:{}})}if(l==="leave"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again: forget this street here";return}Cn(null),o.close(),fd(),Z("This iPad left the street")}},"wide parent");o.root.addEventListener("submit",a=>{a.preventDefault();const r=a.target.id;r==="rosterForm"&&n.parent({op:"rosterAdd",name:s("#rosterInput")}),r==="codeForm2"&&n.parent({op:"setCode",code:s("#codeEdit")})});const i=a=>{const r=new Date(a);return Number.isFinite(r.getTime())?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r.getMonth()]+" "+r.getDate()+", "+r.getFullYear():""};n.on("parentInfo",a=>{const r=o.root.querySelector("#parentBody");if(!r)return;const l=yo();l&&l.code!==a.code&&(l.code=a.code,Cn(l)),n.cfg.code=a.code;const c=a.roster??[],f=new Set(c.map(y=>y.name.toLowerCase())),d=lm.filter(y=>!f.has(y.toLowerCase())),g=c[0]?.name??"Reagan",h=Array.isArray(a.mail)?a.mail:[],m=h.some(y=>y.letters&&y.letters.length),k=Wp(a.settings),_=h.map(y=>`<div class="pMailHouse"><div class="pMailName">${de(y.name||"House")}</div>${(y.letters||[]).slice().reverse().map(u=>`<div class="pLetter"><b>${de(u.from)}</b><span class="pWhen">${de(i(u.at))}</span><p>${de(u.text)}</p><button type="button" class="danger" data-p="mailClear" data-hid="${de(y.houseId)}" data-id="${de(u.id)}">Clear</button></div>`).join("")||'<p class="hint">No letters.</p>'}${(y.letters||[]).length?`<button type="button" class="danger" data-p="mailClear" data-hid="${de(y.houseId)}">Clear this mailbox</button>`:""}</div>`).join("");r.innerHTML=`${a.note?`<p class="err" id="pNote">${de(I9[a.note]??a.note)}</p>`:""}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${de(a.code)}</div></div>
        <div><div class="label">Free typing</div><button class="toggle ${a.settings.freeChat?"on":""}" data-p="free" data-on="${a.settings.freeChat?1:0}" id="pFree">${a.settings.freeChat?"On":"Off (presets only)"}</button><p class="hint small">Chat bubbles. Off means preset phrases only.</p></div>
        <div><div class="label">Let kids type their own letters</div><button class="toggle ${k?"on":""}" data-p="freeMail" data-on="${k?1:0}" id="pFreeMail">${k?"On":"Off (presets only)"}</button><p class="hint small">Letters only. Off means preset phrases only.</p></div></div>
      <div class="label">Letters</div><div id="parentMail">${_||'<p class="hint">No letters right now.</p>'}${m?'<button type="button" class="danger" data-p="mailClearAll" id="mailClearAll">Clear every mailbox</button>':""}</div>
      <form class="pAdd" id="codeForm2"><input id="codeEdit" maxlength="${Mc}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="e.g. ${de(Pa(g))}7"/><button data-p="setcode" type="button">Use this code</button></form>
      <p class="hint small">Tip: a word plus a number (like ${de(Pa(g))}7) is easy to remember and harder to guess. Not case-sensitive.</p>
      <div class="label">Kids' names (sign-in list)</div>
      <div class="roster">${c.map(y=>`<span class="rName ${y.claimed?"claimed":""}"><b>${de(y.name)}</b>${y.claimed?`<i>signed in</i><button data-p="unclaim" data-name="${de(y.name)}">Reset</button>`:y.hasHouse?"<i>not signed in</i>":`<button class="x" data-p="unname" data-name="${de(y.name)}" aria-label="Remove name">×</button>`}</span>`).join("")||'<p class="hint">No names yet: kids pick a fun nickname instead.</p>'}</div>
      <form class="pAdd" id="rosterForm"><input id="rosterInput" maxlength="20" autocomplete="off" placeholder="First name"/><button data-p="add" type="button">Add</button></form>
      ${d.length?`<div class="sugg">${d.map(y=>`<button data-p="add" data-name="${y}">+ ${y}</button>`).join("")}</div>`:""}
      <div class="label">Houses</div>${a.houses.map(y=>`<div class="pHouse"><input data-hid="${y.id}" value="${de(y.name)}" maxlength="24"/><button data-p="rename" data-hid="${y.id}">Rename</button></div>`).join("")||'<p class="hint">No houses yet.</p>'}
      <div class="label">Players</div>${a.players.map(y=>`<div class="pPlayer"><span class="dot ${y.online?"on":""}"></span>${de(y.nickname)}<button class="danger" data-p="remove" data-pid="${y.pid}">Remove</button></div>`).join("")||'<p class="hint">Nobody has joined yet.</p>'}
      <p class="hint small">Letters stay on the server for up to 30 days. They are filtered, and only a first name is stored. You can clear them here, or turn off “Let kids type their own letters” so new letters use preset phrases. Chat bubbles are only relayed to kids standing nearby and are not saved. No emails or last names. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays).</p>
      <button class="danger wideBtn" data-p="leave">Forget this street on this device</button>`}),n.on("error",a=>{a==="badkey"&&(Z("That grown-up key didn't work"),e.parentKey=void 0,Cn(e),o.close())}),n.parent({op:"info"})}let Dt=null;function cs(){return M("park").clientHeight/Tc}const H9=()=>{const e=K.get();return e.characters.find(t=>t.id===e.dog?.owner)??e.characters[0]},yn=()=>b?be():Dt;function en(e){b?je(e):Dt=e,S==="ranch"?es():S==="gameroom"?ai():qs()}function Kn(e="park"){if(b){const n=[],s=[...b.presence.entries()],o=be();o&&s.push([b.pid,o]);for(const[i,a]of s){const r=b.players.get(i);r&&a.where===e&&n.push({key:i,look:r.look,name:r.nickname,p:a,mine:i===b.pid,dog:r.dog??null})}return n}const t=H9();return Dt&&Dt.where===e?[{key:"solo",look:Ci(t??{}),name:"",p:Dt,mine:!0,dog:K.get().dog??null}]:[]}function hd(){const e=cs(),t=M("parkWorld"),n=s=>s*e+"px";t.style.width=Ec*e+"px",t.style.height=Tc*e+"px",t.style.setProperty("--sc",String(e)),t.innerHTML=z1()+Cl.map((s,o)=>s.kind==="swing"?`<div class="swing" data-swing="${o}" style="left:${n(s.x-30)};top:${n(Gt)};width:${n(60)};height:${n(240)}">${Q1}</div>`:"").join("")+Cl.map((s,o)=>`<button class="pspot k-${s.kind}" data-spot="${o}" aria-label="${s.kind}" style="left:${n(s.x-50)};top:${n(s.y-(s.kind==="swing"?70:55))};width:${n(100)};height:${n(s.kind==="swing"?90:65)}"></button>`).join("")+`<button class="pspot slide" data-act="slide" aria-label="Slide" style="left:${n(he.ladder-45)};top:${n(he.top.y-30)};width:${n(130)};height:${n(560-he.top.y+30)}"></button><button class="pspot pond" data-act="splash" aria-label="Pond" style="left:${n(1235)};top:${n(462)};width:${n(370)};height:${n(105)}"></button><button class="pspot gate" data-act="exit" aria-label="Back to the street" style="left:${n(25)};top:${n(240)};width:${n(180)};height:${n(260)}"></button><div class="ripples" id="ripples"></div><button class="ball" id="ball" aria-label="Ball">${q1}</button><div class="savatars" id="pavatars"></div>`,Ka(),qs(),ot()}const np=2400;function qs(){const e=document.getElementById("pavatars");if(!e||S!=="park")return;const t=cs(),n=new Set,s=new Set;for(const o of Kn()){n.add(o.key);let i=e.querySelector(`.savatar[data-pid="${o.key}"]`);i||(i=document.createElement("div"),i.className="savatar "+(o.mine?"mine":"other"),i.dataset.pid=o.key,e.appendChild(i),o.mine&&Ah(i));const a=JSON.stringify(o.look)+o.name;if(i.dataset.look!==a){const d=i.querySelector(".bubble");i.innerHTML=o.name?ld(o.look,o.name):`<div class="inner">${bt(o.look)}</div>`,d&&i.appendChild(d),i.dataset.look=a}const r=(Os[o.look.size]??1)*t*.95,l=as*r,c=un*r;i.style.left=o.p.x*t-l/2+"px",i.style.top=o.p.y*t-c+"px",i.style.width=l+"px",i.style.height=c+"px",i.style.zIndex=String(100+Math.round(o.p.y)),i.classList.toggle("flipped",o.p.flip),Ti(i,o.look,o.mine);const f=o.p.pose??"";i.dataset.pose!==f&&(i.classList.remove("pose-sit","pose-swing","pose-slide"),i.offsetWidth,f==="slide"&&(i.style.setProperty("--sx",(he.top.x-he.bottom.x)*t+"px"),i.style.setProperty("--sy",(he.top.y-he.bottom.y)*t+"px")),f&&i.classList.add("pose-"+f),i.dataset.pose=f),f==="swing"?(i.style.transformOrigin=`50% ${(Gt-o.p.y)*t+c}px`,i.style.animationDelay=-(Date.now()%np)/1e3+"s",s.add(o.p.spot??-1)):(i.style.transformOrigin="",i.style.animationDelay="")}e.querySelectorAll(".savatar").forEach(o=>{n.has(o.dataset.pid)||o.remove()}),document.querySelectorAll("#parkWorld .swing").forEach(o=>{const i=s.has(+o.dataset.swing);i&&!o.classList.contains("swinging")&&(o.style.animationDelay=-(Date.now()%np)/1e3+"s"),o.classList.toggle("swinging",i)}),Ys()}function Ah(e){e.addEventListener("pointerdown",t=>{t.preventDefault(),t.stopPropagation();const n=yn();if(!n||n.where!=="park"&&n.where!=="ranch"&&n.where!=="barn")return;const s=n.where!=="park",o=n.where;_t=[];const i=M(s?"ranchScroll":"parkScroll"),a=s?sn():cs(),r=o==="barn"?uc:s?Mi:Ec,l=v=>{const x=M(s?"ranchWorld":"parkWorld").getBoundingClientRect();return{x:(v.clientX-x.left)/a,y:(v.clientY-x.top)/a}},c=l(t),f={x:n.x-c.x,y:n.y-c.y};let d=t,g=0,h=n.x,m=!1;const k=v=>{const x=l(v),A=yn();if(!A)return;const O=Math.max(60,Math.min(r-60,x.x+f.x)),H=Math.max(470,Math.min(590,x.y+f.y));if(!m&&Math.hypot(O-A.x,H-A.y)<6)return;m=!0;const X=Math.abs(O-h)>3?O<h:A.flip;Math.abs(O-h)>3&&(h=O),en(o==="barn"?{where:"barn",x:O,y:H,flip:X}:s?{where:"ranch",x:O,y:H,flip:X,...A.ride!==void 0?{ride:A.ride}:{}}:{where:"park",x:O,y:H,flip:X})},_=()=>{const v=i.getBoundingClientRect(),x=d.clientX<v.left+70?-10:d.clientX>v.right-70?10:0;x&&m&&(i.scrollLeft+=x,k(d)),g=requestAnimationFrame(_)};g=requestAnimationFrame(_),e.classList.add("lifted"),P.pick();const y=v=>{v.pointerId===t.pointerId&&(d=v,k(v))},u=v=>{v.pointerId===t.pointerId&&(cancelAnimationFrame(g),window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",u),e.classList.remove("lifted"),P.drop())};window.addEventListener("pointermove",y),window.addEventListener("pointerup",u)})}M("parkWorld").addEventListener("pointerdown",e=>{e.target.closest(".pspot, .ball, .pet")&&e.stopPropagation()});M("parkWorld").addEventListener("click",e=>{const t=e.target,n=yn();if(!n)return;if(t.closest("#ball")){He||P.boing(),V9();return}const s=t.closest("[data-spot]");if(s){const i=+s.dataset.spot,a=Cl[i];if(n.spot===i&&n.pose){en({where:"park",x:a.x,y:Math.min(590,a.y+40),flip:n.flip}),P.drop();return}if(Kn().some(r=>!r.mine&&r.p.spot===i&&r.p.pose)){Z("Someone is already there!"),P.pop();return}en({where:"park",x:a.x,y:a.y,flip:n.flip,pose:a.kind==="swing"?"swing":"sit",spot:i}),a.kind==="swing"?P.boing():P.drop();return}const o=t.closest("[data-act]")?.dataset.act;if(o==="slide"&&(en({where:"park",x:he.bottom.x,y:he.bottom.y,flip:!1,pose:"slide"}),P.swish(),setTimeout(()=>{const i=yn();i?.pose==="slide"&&en({where:"park",x:i.x,y:i.y,flip:i.flip})},1500)),o==="splash"){const i=M("parkWorld").getBoundingClientRect(),a=(e.clientX-i.left)/cs();Dh(a),b?.fx({k:"splash",x:a})}o==="exit"&&Ih()});function Dh(e){const t=document.getElementById("ripples");if(!t||S!=="park")return;const n=cs();for(let s=0;s<2;s++){const o=document.createElement("div");o.className="ripple";const i=(120+s*70)*n;Object.assign(o.style,{left:e*n-i/2+"px",top:512*n-i*.18+"px",width:i+"px",height:i*.36+"px",animationDelay:s*.15+"s"}),t.appendChild(o),setTimeout(()=>o.remove(),1400)}for(let s=0;s<6;s++){const o=document.createElement("div");o.className="drop",Object.assign(o.style,{left:e*n+"px",top:505*n+"px"}),o.style.setProperty("--dx",(s-2.5)*14+"px"),t.appendChild(o),setTimeout(()=>o.remove(),900)}P.splash()}function O9(){Ks(),_t=[],Oe=!1,S="park",M("park").classList.remove("hidden"),Di(M("park"));const e={where:"park",x:290,y:548,flip:!1};b?je(e):Dt=e,M("streetTitle").textContent="The Park",mn(),hd(),requestAnimationFrame(()=>{const t=M("parkScroll");t.scrollLeft=0,ot()}),P.sparkle()}function Ih(){uo()}function W9(){return Ur()&&!document.body.classList.contains("phone")}function sp(){return Ur()?520:280}function U9(){Ks(),_t=[],Oe=!1,S="gameroom",M("gameroom").classList.remove("hidden");const e=Co(),t=e?{where:"gameroom",x:e.x,y:Math.max(Ps,Math.min(Tn,e.y)),flip:!1}:{where:"gameroom",x:sp(),y:560,flip:!1};b?je(t):Dt=t,M("streetTitle").textContent="The Clubhouse",mn(),Zc(),requestAnimationFrame(()=>{const n=is(),s=M("grScroll"),o=e?.x??(W9()?60+Ig/2:sp());s.scrollLeft=Math.max(0,o*n-s.clientWidth/2),ot(),r0()}),Di(M("gameroom")),P.sparkle()}M("btnLeavePark").addEventListener("click",()=>{S==="ranch"&&Oe?$i(!1):Ih()});let qn={x:2620,y:565},He=null;function Ka(e=!1){const t=document.getElementById("ball");if(!t)return;const n=cs(),s=34*n;e||t.classList.remove("flying"),t.style.left=qn.x*n-s/2+"px",t.style.top=qn.y*n-s+"px",t.style.width=t.style.height=s+"px"}function V9(){if(He)return;const e=lt.x0+40+Math.random()*(lt.x1-lt.x0-80),t=lt.y0+25+Math.random()*(lt.y1-lt.y0-35);Hh(b?b.pid:"solo",e,t),b?.fx({k:"ball",x:e,y:t})}function Hh(e,t,n){if(S!=="park")return;const s=document.getElementById("ball");qn={x:t,y:n},He={thrower:e,phase:"fly",dog:null,until:performance.now()+12e3},s&&(s.classList.remove("flying"),s.offsetWidth,s.classList.add("flying"),Ka(!0)),P.boing(),setTimeout(()=>{He?.phase==="fly"&&(He.phase="chase",document.getElementById("ball")?.classList.remove("flying"),Zn.size||(He=null))},650)}function z9(e){if(!b)return Dt;const t=e===b.pid?be():b.presence.get(e);return t&&t.where==="park"?t:null}const Zn=new Map,fl=e=>(t,n,s,o,i)=>{t.style.left=(n-o/2)*e+"px",t.style.top=(s-i)*e+"px",t.style.width=o*e+"px",t.style.height=i*e+"px"};function Q9(){const e=[];if(S==="house"){const t=C.get(),n={box:se,place:Gs,z:s=>String(4e3+Math.round(s)),scale:1};if(b&&Ie!==K){const s=[...b.presence.entries()],o=be();o&&s.push([b.pid,o]);for(const[i,a]of s){const r=b.players.get(i)?.dog;if(r&&a.where==="house"&&a.houseId===Pe&&a.room===t.currentRoom){const l=$t(t.currentRoom,Bn(i,a),a);e.push({key:i,dog:r,x:l.x,y:l.y,flip:a.flip,...n})}}}else if(t.dog){const s=t.characters.find(o=>o.id===t.dog.owner)??t.characters[0];if(s&&s.room===t.currentRoom){const o=$t(s.room,Mt(s),s);e.push({key:"solo",dog:t.dog,x:o.x,y:o.y,flip:s.flip,...n})}}}else if(S==="park"){const t=document.getElementById("pavatars");if(!t)return e;const n=cs();for(const s of Kn())s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:fl(n),z:o=>String(Math.round(o)-200),scale:.95})}else if(S==="ranch"){const t=document.getElementById("ravatars");if(!t)return e;const n=sn();for(const s of Kn(Oe?"barn":"ranch"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:fl(n),z:o=>String(100+Math.round(o)),scale:.95,riding:s.p.ride!==void 0})}else if(S==="gameroom"){const t=document.getElementById("gavatars");if(!t)return e;const n=is();for(const s of Kn("gameroom"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:fl(n),z:o=>String(Math.round(o)-200),scale:.95})}return e}let op=performance.now();function q9(e,t){const n=new Set;for(const s of Q9()){if(F9(s.key))continue;n.add(s.key);let o=Zn.get(s.key);const i=s.flip?1:-1,a=!s.riding&&S==="house"&&C.get().currentRoom==="backyard",r=s.riding?200:78;let l=a?df.x:s.x+i*r;s.riding?l=Math.max(50,Math.min(Mi-50,l)):S==="house"&&!a&&(l=qh(l,46));const c=a?df.y:Math.min(595,s.y+(s.riding?28:6));if(!o||o.box!==s.box||!o.el.isConnected){o?.el.remove();const x=document.createElement("div");x.className="pet pet-dog",x.dataset.dog=s.key,s.box.appendChild(x),Z9(x,s.key),o={el:x,box:s.box,x:l,y:c,flip:s.flip,pose:"",look:"",idle:1,trickUntil:0,sitTrick:!1},Zn.set(s.key,o)}let f=l,d=c,g=s.riding?980:320;if(He&&e>He.until&&(He=null,Ka()),He&&S==="park"){if(He.phase==="chase")f=qn.x,d=qn.y,g=950,Math.hypot(o.x-f,o.y-d)<28&&(He.phase="carry",He.dog=s.key,P.woof());else if(He.phase==="carry"&&He.dog===s.key){const x=z9(He.thrower)??{x:(lt.x0+lt.x1)/2,y:540};f=x.x+60,d=Math.min(590,x.y+6),g=750,qn={x:o.x+(o.flip?-40:40),y:o.y-30*s.scale},Math.hypot(o.x-f,o.y-d)<26&&(qn={x:x.x+70,y:Math.min(590,x.y+12)},He=null,va(o,"♥"),P.sparkle()),Ka()}}const h=e<o.trickUntil,m=f-o.x,k=d-o.y,_=Math.hypot(m,k);let y=!1;if(_>(He?4:10)&&!h){const x=Eo()?_:Math.min(_,g*t);o.x+=m/_*x,o.y+=k/_*x,y=!0,Math.abs(m)>1.5&&(o.flip=m<0),o.idle=0}else o.idle+=t,!h&&o.idle>.3&&Math.abs(s.x-o.x)>4&&(o.flip=s.x<o.x);const u=h&&o.sitTrick?"sit":y?"stand":o.idle>.9?"sit":"stand",v=u+s.dog.breed;if(o.pose+o.look!==u+v){for(const x of[...o.el.children])x.matches(".bubble, .kennelBtn")||x.remove();o.el.insertAdjacentHTML("afterbegin",`<div class="inner">${ui(s.dog.breed,u)}</div>`),o.pose=u,o.look=v}o.el.dataset.name=s.dog.name,o.el.classList.toggle("walking",y),o.el.classList.toggle("flipped",o.flip),s.place(o.el,o.x,o.y,92*s.scale,71*s.scale),o.el.style.zIndex=s.z(o.y+1),zh(o.el,s.key,!1)}for(const[s,o]of Zn)n.has(s)||(o.el.remove(),Zn.delete(s))}function va(e,t){e.el.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.el.appendChild(n),Po(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const ip=new Map;function Oh(e,t){const n=Zn.get(e);if(!n)return;const s=n.el.dataset.name??"";n.trickUntil=performance.now()+1400,n.sitTrick=t===0,n.el.classList.remove("spin","hop"),n.el.offsetWidth,t===0&&(va(n,`${s} sits! 🐾`),P.pop()),t===1&&(n.el.classList.add("spin"),va(n,"Wheee! ✨"),P.spin()),t===2&&(n.el.classList.add("hop"),va(n,"Woof! Woof!"),P.woof())}function Z9(e,t){e.addEventListener("pointerdown",n=>{n.stopPropagation(),n.preventDefault()}),e.addEventListener("click",n=>{n.stopPropagation();const s=(ip.get(t)??0)%3;ip.set(t,s+1),Oh(t,s),b&&b.fx({k:"trick",owner:t,v:s})})}function Ar(e){const t=e?.dogKennel?.item;if(!t||!e)return null;for(const n of Object.values(e.rooms)){const s=n.items.find(o=>o.id===t&&o.kind==="kennel");if(s)return s}return null}function N9(e){if(e==="solo")return K.get();if(!b)return null;const t=b.players.get(e)?.houseId;return t?b.view(t):null}function F9(e){return!!Ar(N9(e))}function ud(){if(b){const e=b.myHouseId();return e?b.view(e):null}return K.get()}function Wh(){if(S!=="house")return null;const e=C.get(),t=Ar(e);if(!t||!e.rooms[e.currentRoom]?.items.some(n=>n.id===t.id))return null;if(b&&Ie!==K){const n=b.houses.get(Pe)?.meta.ownerId,s=n?b.players.get(n)?.dog??null:null;return!n||!s?null:{key:n,dog:s,item:t}}return e.dog?{key:"solo",dog:e.dog,item:t}:null}function j9(){const e=ud();if(!e)return null;const t=Ja()?C.get().currentRoom:null;let n=null,s=null;for(const[o,i]of Object.entries(e.rooms))for(const a of i.items)a.kind==="kennel"&&((!n||a.z>=n.z)&&(n=a),o===t&&(!s||a.z>=s.z)&&(s=a));return s??n}function oa(e){if(!bd()){Z("Adopt a dog first!");return}Jo({type:"dog/kennel",item:e}),e?(P.pop(),Z("Rest well, puppy!")):(P.woof(),Z("Come on, puppy!"))}function md(e){if(!bd()){Z("Adopt a dog first!");return}const t=Ar(ud());if(e===void 0){if(t){oa(null);return}const n=j9();if(!n){Z("Put a dog kennel down first!");return}oa(n.id);return}t?.id===e?oa(null):oa(e)}function Uh(e){const t=C.get(),n=t.rooms[t.currentRoom]?.items.find(s=>s.id===e);if(n){if(n.kind==="kennel"){Ja()&&md(n.id);return}n.kind==="cat-tower"&&iL()}}function G9(e,t){const n=C.get(),s=n.rooms[n.currentRoom]?.items.find(i=>i.id===t);if(!s)return;const o=u1(s.kind);if(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),P.click(),o==="kennel"||o==="tower"){Uh(t);return}if(gp(s.kind)){Ix();const i=!s.on;C.dispatch({type:"item/power",room:n.currentRoom,id:t,on:i}),i&&Cs(s.kind)==="tv"&&X9(s),Zs();return}if(o==="open"){e.classList.toggle("opened"),Zs();return}if(o==="lamp"){e.classList.toggle("lamp-on");return}o==="sit"&&Vh(s),o==="swing"&&J9(s)}const ap={dance:Yt*2,sway:Yt*4,watch:Yt*5,warm:Yt*3,hug:Yt*2,bounce:Yt,bathe:Yt*3,nibble:Yt},Y9={dance:"<span>♪</span><span>♫</span>",sway:"<span>♪</span>",hug:"<span>♥</span>",bathe:'<span class="bub"></span><span class="bub"></span><span class="bub"></span>',nibble:"<span>✦</span>"},pl={stereo:"<span>♪</span><span>♫</span><span>♪</span>",musicbox:"<span>♪</span><span>♩</span>",tv:'<span class="glow"></span>',fire:'<span class="glow"></span><span class="ember"></span><span class="ember"></span>',tub:'<span class="bub"></span><span class="bub"></span><span class="bub"></span><span class="bub"></span>',fridge:'<span class="food">🍓</span><span class="food">🧁</span>'},gl=new Map;let hl=0;setInterval(()=>Zs(),1e3);function Zs(){hl||(hl=requestAnimationFrame(()=>{hl=0,K9()}))}function lo(e,t,n){let s=e.querySelector(":scope > .ambFx");if(!t){s?.remove();return}s||(s=document.createElement("i"),s.className="ambFx",s.setAttribute("aria-hidden","true"),e.appendChild(s)),s.dataset.k!==n&&(s.innerHTML=t,s.dataset.k=n,s.className="ambFx fx-"+n)}function rp(e,t,n){const s=t?t.kind+"|"+t.item:"",o=e.dataset.amb||"";if(o!==s){if(o&&e.classList.remove("amb-"+o.split("|")[0],"amb-l","amb-r"),o.startsWith("bathe|")&&!t&&(e.classList.add("amb-sparkle"),setTimeout(()=>e.classList.remove("amb-sparkle"),1200)),!t){delete e.dataset.amb,lo(e,null,"");return}e.dataset.amb=s,e.style.setProperty("--amb-delay",mp(t.phase,ap[t.kind],n)+"ms"),e.style.setProperty("--amb-period",ap[t.kind]+"ms"),e.classList.add("amb-"+t.kind,t.face<0?"amb-l":"amb-r"),lo(e,Y9[t.kind]??null,t.kind)}}function K9(){const e=C.get(),t=e.rooms[e.currentRoom];if(S!=="house"||!t){$f(null);return}const n=Date.now(),s=new Set;for(const d of t.items){if(Cs(d.kind)!=="musicbox")continue;if(!d.on){gl.delete(d.id);continue}const g=gl.get(d.id)??(gl.set(d.id,n),setTimeout(Zs,Bd+60),n);n-g>=Bd&&s.add(d.id)}const o=new Set;se.querySelectorAll(".item.opened").forEach(d=>{d.dataset.id&&o.add(d.dataset.id)});const i=t.items.map(d=>{const g=Me[d.kind];return{id:d.id,kind:d.kind,x:d.x,y:d.y,on:!!d.on,w:g?ed(g,Ge(d)).w:200}}),a=[],r=new Map;for(const d of e.characters){const g=Bt.get(d.id);if(d.room!==e.currentRoom||!g||g.classList.contains("lifted"))continue;const h=Mt(d)?.pose;a.push({id:d.id,x:d.x,y:d.y,seated:h==="sit",lying:h==="lie"}),r.set(d.id,g)}if(b&&Ie!==K){const d=[...b.presence.entries()],g=be();g&&d.push([b.pid,g]);for(const[h,m]of d){const k=Ls.get(h);if(!k||!k.isConnected||m.where!=="house"||m.houseId!==Pe||m.room!==e.currentRoom||k.classList.contains("lifted"))continue;const _=Bn(h,m)?.pose;a.push({id:"p:"+h,x:m.x,y:m.y,seated:_==="sit",lying:_==="lie"}),r.set("p:"+h,k)}}const l=S0(i,a,{fridgesOpen:o,musicBoxDone:s});for(const d of[...Bt.values(),...Ls.values()])[...r.values()].includes(d)||rp(d,void 0,n);r.forEach((d,g)=>rp(d,l.get(g),n));const c=new Set([...l.values()].filter(d=>d.kind==="bathe").map(d=>d.item));let f=null;for(const d of t.items){const g=se.querySelector(`.item[data-id="${d.id}"]`);if(!g)continue;const h=Cs(d.kind),m=!!d.on&&!!h&&!s.has(d.id);g.classList.toggle("amb-on",m),m?(g.dataset.amb=h,g.style.getPropertyValue("--amb-delay")||g.style.setProperty("--amb-delay",mp(0,Yt,n)+"ms"),h==="stereo"?f="stereo":h==="musicbox"&&!f&&(f="musicbox"),lo(g,pl[h],h)):hp(d.kind)&&c.has(d.id)?lo(g,pl.tub,"tub"):up(d.kind)&&o.has(d.id)?lo(g,pl.fridge,"fridge"):(delete g.dataset.amb,lo(g,null,""))}$f(f)}function X9(e){const t=C.get();if(b&&S==="house"){const s=be();if(!s||s.where!=="house"||s.seat)return}else{const s=t.characters.find(o=>o.id===Te&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(!s||s.seat)return}const n=t.rooms[t.currentRoom].items.filter(s=>Fs(s.kind)?.pose==="sit"&&Math.abs(s.x-e.x)<520).sort((s,o)=>Math.abs(s.x-e.x)-Math.abs(o.x-e.x))[0];n&&Vh(n)}let Rt=null,Ko=!1;function Xa(){se.querySelectorAll(".item.swinging").forEach(e=>{(!Rt||e.dataset.id!==Rt.item)&&e.classList.remove("swinging")}),Rt&&se.querySelector(`.item[data-id="${Rt.item}"]`)?.classList.add("swinging")}function J9(e){const t=C.get(),n=t.characters.find(i=>i.id===Te&&i.room===t.currentRoom)??t.characters.find(i=>i.room===t.currentRoom);if(!n)return;if(Rt?.id===n.id&&Rt.item===e.id){Rt=null,Ko=!0,C.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x+70,y:Math.max(e.y,520)}),Ko=!1,Xa();return}const s=Me[e.kind],o=e.y-(s?ct(s)*Ge(e)*.26:40);Rt={id:n.id,item:e.id},Ko=!0,C.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x,y:o}),Ko=!1,Xa()}function Vh(e){const t=Cr(e);if(!t)return;if(b&&S==="house"){const i=be();if(!i||i.where!=="house")return;if(!b.speaksSit){const r="p:"+b.pid,l=pn.get(r)?.item===e.id,c=Math.max(_o+40,t.footY-8);l?pn.delete(r):pn.set(r,{item:e.id,pose:t&&Fs(e.kind).pose,n:0});const{seat:f,...d}=i;je({...d,x:e.x,y:c,flip:!1}),xt();return}const a=fi({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:wi(void 0,b.pid),alreadyOn:i.seat?.id===e.id?e.id:null});if(a.toast){Z(a.toast),P.pop();return}if(!a.moved)return;ka(i,a.x,a.y,!1,a.seat?{id:a.seat.item,pose:a.seat.pose,n:a.seat.n}:null),xt(),Us(!1);return}const n=C.get(),s=n.characters.find(i=>i.id===Te&&i.room===n.currentRoom)??n.characters.find(i=>i.room===n.currentRoom);if(!s)return;const o=fi({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:wi(s.id),alreadyOn:s.seat?.item===e.id?e.id:null});if(o.toast){Z(o.toast),P.pop();return}o.moved&&(Yo(s.id,n.currentRoom,o.x,o.y,o.seat),Us(!1))}function zh(e,t,n){const s=b?t===b.pid:t==="solo";let o=e.querySelector(".kennelBtn");if(!s){o?.remove();return}o||(o=document.createElement("button"),o.type="button",o.className="kennelBtn",o.addEventListener("pointerdown",i=>{i.stopPropagation(),i.preventDefault()}),o.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault(),md()}),e.appendChild(o)),o.textContent=n?"Out":"Kennel",eL(o)}function eL(e){if(S!=="house"){e.style.left=e.style.right=e.style.top=e.style.bottom=e.style.transform="";return}const t=e.parentElement;if(!t)return;const n=F.getBoundingClientRect().width/F.offsetWidth||1,s=F.getBoundingClientRect(),o=4,i={l:s.left+o,t:s.top+o,r:s.right-o,b:s.bottom-o},a=se.querySelector(".char")?.getBoundingClientRect(),r=se.querySelector('.item[data-kind="sofa"]')?.getBoundingClientRect(),l=[...se.querySelectorAll(".pet-cat, .item")].map(D=>D.getBoundingClientRect()).filter(D=>D.width>2&&D.height>2),c=(D,W)=>!!W&&D.left<W.right-1&&D.right>W.left+1&&D.top<W.bottom-1&&D.bottom>W.top+1,f=(D,W)=>c(D,W)?Math.max(0,Math.min(D.right,W.right)-Math.max(D.left,W.left))*Math.max(0,Math.min(D.bottom,W.bottom)-Math.max(D.top,W.top)):0,d=D=>{let W=0;D.left<i.l&&(W+=(i.l-D.left)*8),D.right>i.r&&(W+=(D.right-i.r)*8),D.top<i.t&&(W+=(i.t-D.top)*8),D.bottom>i.b&&(W+=(D.bottom-i.b)*8),W+=f(D,a)*4,W+=f(D,r)*4;for(const Ye of l)W+=f(D,Ye)*4;return W},g=t.getBoundingClientRect(),h=!a||g.left+g.width/2<=a.left+a.width/2,m=D=>({left:D?"0px":"auto",right:D?"auto":"0px",top:"46%",bottom:"auto",transform:D?"translate(-108%, -50%)":"translate(108%, -50%)"}),k=[m(h),m(!h),{left:"50%",right:"auto",top:"0px",bottom:"auto",transform:"translate(-50%, -115%)"}];let _=k[0],y=1/0;for(const D of k){Object.assign(e.style,D);const W=d(e.getBoundingClientRect());W<y&&(y=W,_=D)}Object.assign(e.style,_);let u=e.getBoundingClientRect(),v=0,x=0;u.left<i.l&&(v+=i.l-u.left),u.right>i.r&&(v-=u.right-i.r),u.top<i.t&&(x+=i.t-u.top),u.bottom>i.b&&(x-=u.bottom-i.b);const A=D=>{if(!D)return;const W=()=>new DOMRect(u.left+v,u.top+x,u.width,u.height);if(!c(W(),D))return;const Ye=Math.min(W().bottom,D.bottom)-Math.max(W().top,D.top),at=D.bottom+4-W().top,Ue=D.top-4-W().bottom,Re=an=>W().top+an>=i.t&&W().bottom+an<=i.b;if(Ye<u.height*.5&&Re(at)){x+=at;return}if(Ye<u.height*.5&&Re(Ue)){x+=Ue;return}const Ee=D.left-i.l,dt=i.r-D.right,ft=D===r?a:r,ds=(an,Vr)=>{if(!ft)return!1;const fs=Vr?an-u.width:an,To=new DOMRect(fs,W().top,u.width,u.height);return c(To,ft)};dt>=u.width+4&&!ds(D.right+4,!1)?v+=D.right+4-W().left:Ee>=u.width+4&&!ds(D.left-4,!0)?v+=D.left-4-W().right:Re(at)?x+=at:Re(Ue)&&(x+=Ue)};A(a),A(r);const O=t.querySelector(".inner")?.getBoundingClientRect(),H=O&&O.width>2?O:g,X=se.querySelector(".pet-cat")?.getBoundingClientRect(),le=se.querySelector('.item[data-kind="sandbox"]')?.getBoundingClientRect(),ce=se.querySelector('.item[data-kind="yard-bench"]')?.getBoundingClientRect(),G=[...se.querySelectorAll('.item[data-kind="yard-swing"], .item[data-kind="picnic-blanket"], .item[data-kind="lemonade-cart"], .item[data-kind="tulip-bed"]')].map(D=>D.getBoundingClientRect()),fe=F.querySelector(".yardDoor"),on=fe?[fe,fe.querySelector(".yardHintLabel"),fe.querySelector(".doorArt")].map(D=>D?.getBoundingClientRect()):[],Ot=document.getElementById("secrets"),Ze=Ot&&Ot.offsetParent?Ot.getBoundingClientRect():void 0,T=Ze&&Ze.width>2&&Ze.left<i.r&&Ze.right>i.l&&Ze.top<i.b&&Ze.bottom>i.t?Ze:void 0,R=T?new DOMRect(T.left-8,T.top-8,T.width+16,T.height+16):void 0,N=[a,r,X,le,ce,R,...G,...on].filter(D=>!!D&&D.width>2&&D.height>2),V=new DOMRect(u.left+v,u.top+x,u.width,u.height),z=H.left+H.width/2,j=H.top+H.height/2,pe=D=>Math.hypot(D.left+D.width/2-z,D.top+D.height/2-j),Le=D=>{const W=Math.min(D.right,H.right)-Math.max(D.left,H.left),Ye=Math.min(D.bottom,H.bottom)-Math.max(D.top,H.top);return W>1&&Ye>1},me=D=>D.left>=i.l-.5&&D.right<=i.r+.5&&D.top>=i.t-.5&&D.bottom<=i.b+.5&&N.every(W=>!c(D,W))&&!Le(D);let We=V;if(!me(V)||pe(V)>150){const D=[],W=(Ue,Re)=>{let Ee=Ue,dt=Re;Ee<i.l&&(Ee=i.l),dt<i.t&&(dt=i.t),Ee+u.width>i.r&&(Ee=Math.max(i.l,i.r-u.width)),dt+u.height>i.b&&(dt=Math.max(i.t,i.b-u.height)),D.push(new DOMRect(Ee,dt,u.width,u.height))};W(H.left+(H.width-u.width)/2,H.top-u.height-8),W(H.right-u.width,H.top-u.height-6),W(H.left,H.top-u.height-6),a&&W(a.right+6,H.top-u.height-8),ce&&W(ce.left-u.width-6,ce.top-u.height-6),a&&ce&&W(a.right+6,ce.top-u.height-6),a&&(W(a.left-12,a.top-u.height-8),W(i.l,a.top-u.height-10),W(a.left+(a.width-u.width)/2,a.top-u.height-8)),W(i.r-u.width,H.top-u.height-6),W(H.right+8,H.top+(H.height-u.height)/2),W(H.left-u.width-8,H.top+(H.height-u.height)/2),W(V.left,V.top);for(const Ue of[u.width*.65,u.width*1.05,88,120,155])for(let Re=0;Re<8;Re++){const Ee=Re*Math.PI/4;W(z+Math.cos(Ee)*Ue-u.width/2,j+Math.sin(Ee)*Ue-u.height/2)}const Ye=Ue=>{let Re=1/0,Ee=null;for(const dt of D){if(!me(dt)||pe(dt)>Ue)continue;const ft=pe(dt);ft<Re&&(Re=ft,Ee=dt)}return Ee},at=Ye(170)??Ye(360);if(at)We=at;else if(!me(V)){let Ue=null,Re=1/0;for(const Ee of D){if(Ee.left<i.l-.5||Ee.right>i.r+.5||Ee.top<i.t-.5||Ee.bottom>i.b+.5)continue;const ft=(Le(Ee)?1e4:0)+N.reduce((ds,an)=>ds+f(Ee,an),0)+pe(Ee);ft<Re&&(Re=ft,Ue=Ee)}Ue&&(We=Ue)}}v+=We.left-V.left,x+=We.top-V.top,(v||x)&&(e.style.transform=`${e.style.transform} translate(${(v/n).toFixed(1)}px, ${(x/n).toFixed(1)}px)`)}function tL(e,t){e.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.appendChild(n),Po(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const Xo=new Map;function nL(){const e=new Set,t=Wh();if(t){e.add(t.key);const n=a1(t.dog.name,Date.now()),s=Me[t.item.kind],i=(s?js(s,t.item.y):Math.min(t.item.y,ze-zg))-(n==="peek"?24:2);let a=Xo.get(t.key);if(!a||!a.el.isConnected){a?.el.remove();const l=document.createElement("div");l.className="pet pet-dog kenneled",l.dataset.dog="kennel:"+t.key,se.appendChild(l),l.addEventListener("pointerdown",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),c.preventDefault())}),l.addEventListener("click",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),tL(l,`${l.dataset.name??"Puppy"} is resting`))}),a={el:l,pose:"",look:"",x:t.item.x,y:i},Xo.set(t.key,a)}const r=n==="rest"?"sleep":"sit";if(a.pose!==r||a.look!==n+t.dog.breed){for(const l of[...a.el.children])l.matches(".bubble, .kennelBtn")||l.remove();a.el.insertAdjacentHTML("afterbegin",`<div class="inner">${ui(t.dog.breed,r)}</div>${n==="rest"?'<div class="zzz"><b>Zzz</b><i>z</i><i>z</i><i>z</i></div>':""}`),a.pose=r,a.look=n+t.dog.breed}a.el.dataset.name=t.dog.name,a.el.classList.toggle("rest",n==="rest"),a.el.classList.toggle("peek",n==="peek"),a.x=t.item.x,a.y=i,Gs(a.el,t.item.x,i,100,77),a.el.style.zIndex=String(1e3+t.item.z+1),zh(a.el,t.key,!0)}for(const[n,s]of Xo)e.has(n)||(s.el.remove(),Xo.delete(n))}let oe=null,ia="",ul=0,yd=0,_a={x:0,perch:0,leap:!1};const sL=562;function Qh(e){return(e.rooms[e.currentRoom]?.items.filter(n=>n.kind==="cat-tower")??[]).reduce((n,s)=>!n||s.z>=n.z?s:n,null)}function lp(e){return e==="cat-bed"||e==="pet-bed"||e==="dog-bed"||e==="pack:cat-bed"||/(?:^|:)cat-bed$|(?:^|:)pet-bed$/.test(e)}function oL(e){const t=e.rooms[e.currentRoom]?.items??[],n=t.filter(a=>lp(a.kind)),s=t.filter(a=>a.kind==="bed"),o=(n.length?n:s).reduce((a,r)=>!a||r.z>=a.z?r:a,null);if(!o)return null;const i=Me[o.kind];return{x:o.x,y:o.y,h:i?ct(i)*Ge(o):80,pet:lp(o.kind)}}function iL(){const e=C.get();!e.cat||e.cat.room!==e.currentRoom||!Qh(e)||(yd=performance.now()+900,P.boing(),b?.fx({k:"leap"}))}function aL(){const e=C.get(),t=S==="house"?e.cat:null;if(!t||t.room!==e.currentRoom){oe&&(oe.remove(),oe=null,ia="",ul=0);return}(!oe||!oe.isConnected)&&(oe=document.createElement("div"),oe.className="pet pet-cat",se.appendChild(oe),ia="",oe.addEventListener("pointerdown",O=>{O.stopPropagation(),O.preventDefault()}),oe.addEventListener("click",O=>{O.stopPropagation(),Zh(),b&&b.fx({k:"purr"})}));const n=Qh(e),s=n?null:oL(e),o=n?Me[n.kind]:void 0,i=n&&o?ct(o)*Ge(n):0,a=r1(t,Date.now(),n?{x:n.x}:null,s?{x:s.x}:null,Eo()),r=!!n&&performance.now()<yd,l=r?2:a.perch,c=r&&n?n.x:a.x,f=r?"play":a.mood,d=f==="walk"?"stand":f==="nap"?"nap":"sit",g=d+t.coat+(l?"p":"");if(g!==ia){const O=[...oe.querySelectorAll(".bubble, .heart")];oe.innerHTML=`<div class="inner">${bo(t.coat,d)}</div>${d==="nap"?'<div class="zzz"><i>z</i><i>z</i><i>z</i></div>':""}`;for(const H of O)oe.appendChild(H);ia=g}if(l>0&&ul===0){oe.classList.add("hop");const O=oe;setTimeout(()=>O.classList.remove("hop"),420)}ul=l,oe.dataset.name=t.name,oe.dataset.mood=f,oe.dataset.perch=String(l),oe.dataset.leap=r?"1":"0",oe.dataset.curl=a.curl?"1":"0",oe.classList.toggle("walking",f==="walk"),oe.classList.toggle("groom",f==="groom"),oe.classList.toggle("play",f==="play"&&!r),oe.classList.toggle("leap",r),oe.classList.toggle("flipped",a.flip),oe.classList.toggle("curl",a.curl===1),se.querySelectorAll(".item.toy-live").forEach(O=>O.classList.remove("toy-live")),n&&f==="play"&&l&&!r&&se.querySelector(`.item[data-id="${n.id}"]`)?.classList.add("toy-live");const h=window.__pinCat,m=!!(h&&Number.isFinite(h.x)),k=m&&Number.isFinite(h.y)?h.y:sL,_=!m&&l&&n?i1(n.y,i,l):!m&&a.curl&&s?s.y-s.h*(s.pet?.38:.2):k,y=e.currentRoom==="backyard"&&!l,u=!m&&l?92:y?115:128,v=!m&&l?110:y?135:150,x=m?h.x:e.currentRoom==="backyard"?jn.x:qh(c,v/2),A=!m&&e.currentRoom==="backyard"&&!l?jn.y:_;Gs(oe,x,A,v,u),oe.style.zIndex=String(4e3+Math.round(A)),_a={x,perch:l,leap:r}}function qh(e,t){const n=C.get().currentRoom,s=n==="backyard"?sg:n==="living"?ng:null;if(!s)return e;const o=s.x-s.w/2-t-16,i=s.x+s.w/2+t+16;return e<=o||e>=i?e:e<s.x?o:i}function Zh(){if(!oe)return;P.purr(),setTimeout(()=>P.meow(),250),oe.querySelector(".bubble")?.remove();const e=document.createElement("div");e.className="bubble petBubble",e.textContent=`${oe.dataset.name} purrs ♥`,oe.appendChild(e),Po(),setTimeout(()=>e.classList.add("out"),1500),setTimeout(()=>e.remove(),1900),oe.classList.remove("happy"),oe.offsetWidth,oe.classList.add("happy");for(let t=0;t<5;t++){const n=document.createElement("div");n.className="heart",n.textContent="♥",n.style.left=20+Math.random()*60+"%",n.style.animationDelay=t*.12+"s",n.style.color=["#ff6b9a","#ff8fab","#e879c6"][t%3],oe.appendChild(n),setTimeout(()=>n.remove(),1800)}}function rL(e,t){if(t.k==="zoo"||t.k==="apple"||t.k==="honk"||t.k==="hen"){_L(t);return}t.k==="trick"?Oh(t.owner,t.v):t.k==="purr"?S==="house"&&Zh():t.k==="leap"?S==="house"&&(yd=performance.now()+900):t.k==="ball"?Hh(e,t.x,t.y):t.k==="splash"&&Dh(t.x)}function Nh(e){const t=Math.min(.05,Math.max(0,(e-op)/1e3));op=e;try{q9(e,t),nL(),aL(),xL(e,t),$M(t),gg()}catch{}requestAnimationFrame(Nh)}function lL(){return b?b.view(b.myHouseId())?.cat??null:K.get().cat??null}function bd(){return b?b.players.get(b.pid)?.dog??null:K.get().dog??null}function Jo(e){if(b){const t=b.myHouseId();t&&b.dispatch(t,e)}else K.dispatch(e)}const Ja=()=>S==="house"&&(!b||Ie===K||Pe===b.myHouseId());function cL(e="cat"){const t=lL(),n=bd(),s=K.get().characters,o={tab:e,coat:t?.coat??0,catName:t?.name??"",breed:n?.breed??0,dogName:n?.name??"",owner:n?.owner??s[0]?.id,err:"",bye:!1},i=qt("",(l,c)=>{const f=h=>l.closest(`[${h}]`)?.getAttribute(h);if(f("data-pt")){o.tab=f("data-pt"),o.err="",o.bye=!1,r();return}if(f("data-coat")!=null){o.coat=+f("data-coat"),P.click(),r();return}if(f("data-breed")!=null){o.breed=+f("data-breed"),P.click(),r();return}if(f("data-cname")){o.catName=f("data-cname"),P.click(),r();return}if(f("data-dname")){o.dogName=f("data-dname"),P.click(),r();return}if(f("data-owner")){o.owner=f("data-owner"),P.click(),r();return}const d=f("data-pa");if(!d)return;const g=(i.root.querySelector("#petName")?.value??"").trim();if(d==="adoptCat"||d==="adoptDog"){const h=g||(d==="adoptCat"?o.catName:o.dogName),m=Op(h);if(!m){o.err=h?"Hmm, try a different name!":"Pick a name first!",P.pop(),r();return}if(d==="adoptCat"){const k=Ja(),_={name:m,coat:o.coat,room:k?C.get().currentRoom:t?.room??"living",x:k?Math.max(200,Math.min(_e-200,ae+re/2)):t?.x??1200};Jo({type:"cat/set",cat:_}),P.meow(),c(),Z(t?`${m} looks great! 🐱`:k?`${m} moved in! 🐱`:`${m} is waiting at your house! 🐱`)}else{const k=b?{name:m,breed:o.breed}:{name:m,breed:o.breed,owner:o.owner};b?(b.setDog(k),S==="park"&&qs()):K.dispatch({type:"dog/set",dog:k}),P.woof(),c(),Z(n?`${m} looks great! 🐶`:`${m} is your new best friend! 🐶`)}return}if(d==="callCat"){Jo({type:"cat/move",room:C.get().currentRoom,x:Math.max(200,Math.min(_e-200,ae+re/2))}),P.meow(),c();return}if(d==="kennelDog"){md(),c();return}if(d==="bye"){if(!o.bye){o.bye=!0,r();return}o.tab==="cat"?Jo({type:"cat/set",cat:null}):(Jo({type:"dog/kennel",item:null}),b?b.setDog(null):K.dispatch({type:"dog/set",dog:null})),c(),Z("They went to live with a kind friend 💛");return}},"wide pets"),a=i.root.querySelector(".card");function r(){const l=o.tab==="cat",c=l?t:n,f=l?Gm:Ym,d=l?o.catName:o.dogName,g=i.root.querySelector("#petName")?.value??"";a.innerHTML=`${Zt}<h2>Pets</h2>
      <div class="petTabs"><button data-pt="cat" class="${l?"on":""}">🐱 Cat</button><button data-pt="dog" class="${l?"":"on"}">🐶 Dog</button></div>
      <p class="hint small">${l?b?"Your cat lives in your house. Friends can see her when they visit!":"Your cat lives in your house. She naps, purrs, and plays!":b?"Your dog follows you everywhere: the street, friends' houses, and the park!":"Your dog follows you around the house and to the park!"}</p>
      <div class="petRow"><div class="petPreview">${l?bo(o.coat,"sit"):ui(o.breed,"stand")}</div>
        <div class="swatches">${(l?Pl:Tl).map((h,m)=>`<button ${l?"data-coat":"data-breed"}="${m}" class="${m===(l?o.coat:o.breed)?"on":""}"><div>${l?bo(m,"sit"):ui(m,"stand")}</div><span>${h.name}</span></button>`).join("")}</div></div>
      <div class="label">Name</div>
      <div class="nameChips">${f.map(h=>`<button ${l?"data-cname":"data-dname"}="${h}" class="${h===d?"on":""}">${h}</button>`).join("")}</div>
      <input id="petName" class="petName" maxlength="14" autocomplete="off" placeholder="…or type a name" value="${de(g)}"/>
      ${o.err?`<p class="err" id="petErr">${de(o.err)}</p>`:""}
      ${!l&&!b&&s.length>1?`<div class="label">Who does your dog follow?</div><div class="walkers">${s.map(h=>`<button data-owner="${h.id}" class="${h.id===o.owner?"on":""}">${bt(h)}</button>`).join("")}</div>`:""}
      <div class="petBtns"><button class="go" data-pa="${l?"adoptCat":"adoptDog"}" id="adoptBtn">${c?"Save":"Adopt! 💛"}</button>
        ${l&&t&&Ja()?'<button data-pa="callCat" id="callCat">Here, kitty!</button>':""}
        ${!l&&n?`<button data-pa="kennelDog" id="kennelDog">${Ar(ud())?"Come, puppy!":"Kennel"}</button>`:""}
        ${c?`<button class="danger" data-pa="bye">${o.bye?"Tap again to say goodbye":"Find a new home"}</button>`:""}</div>`}r()}M("btnPets").addEventListener("click",()=>cL(S==="house"?"cat":"dog"));requestAnimationFrame(Nh);window.__pets=()=>{const e=Wh(),t=e?Xo.get(e.key):void 0;return{dogs:[...Zn.keys()],dogPos:Object.fromEntries([...Zn].map(([n,s])=>[n,{x:Math.round(s.x),y:Math.round(s.y)}])),cat:oe?{mood:oe.dataset.mood,name:oe.dataset.name,perch:_a.perch,x:Math.round(_a.x),leap:_a.leap,curl:oe.dataset.curl==="1"}:null,kennel:e&&t?{x:Math.round(t.x),y:Math.round(t.y),pose:t.pose,name:e.dog.name,item:e.item.id}:null,dogKennel:C.get().dogKennel??null,fetch:He?.phase??null,ball:qn,view:S}};function sn(){return M("ranch").clientHeight/Bi}let _t=[];const _i=e=>String(100+Math.round(e)),Fh=220,dL=Fh*130/160,jh=156,fL=jh*130/160,pL=.6,gL=3.5,hL=3,lc=10,Xn=new Map,$a=new Map;function er(e,t,n=lc){const s=(e-ht.x)/(ht.rx+n),o=(t-ht.y)/(ht.ry+n);return s*s+o*o<1}function ml(e,t,n,s){for(let o=0;o<=18;o++){const i=o/18;if(er(e+(n-e)*i,t+(s-t)*i))return!0}return!1}function tr(e,t){return{x:Math.max(70,Math.min(wd()-70,e)),y:Math.max(Ps,Math.min(Tn,t))}}function uL(e,t){const n=tr(t.x,t.y);if(er(n.x,n.y,6))return null;if(!ml(e.x,e.y,n.x,n.y))return[n];const s=ht.x-ht.rx-lc-28,o=ht.x+ht.rx+lc+28;let i=null,a=1/0;for(const r of[Ps+1,Tn-2]){const l=[];let c=e.x,f=e.y;const d=(_,y)=>{const u=tr(_,y);l.push(u),c=u.x,f=u.y};ml(c,f,c,r)&&d(c<ht.x?s:o,f),Math.abs(f-r)>3&&d(c,r),Math.abs(c-n.x)>3&&d(n.x,r),l.push(n);let g=!0,h=e.x,m=e.y,k=0;for(const _ of l){if(ml(h,m,_.x,_.y)||er(_.x,_.y,4)){g=!1;break}k+=Math.hypot(_.x-h,_.y-m),h=_.x,m=_.y}g&&k<a&&(i=l,a=k)}return i}function Gh(e,t){const n=yn();if(!n)return;const s={x:Math.max(60,Math.min(wd()-60,e)),y:Math.max(Ps,Math.min(Tn,t))};if(n.ride!==void 0&&n.where==="ranch"){const o=uL(n,s);if(!o){Z("The horse won't splash through the pond!"),P.pop();return}_t=o}else _t=[s]}function mL(e){if(e.look2)return Ax(e.look2);const t=e.pants,n="#5a3d5c",s=(o,i,a,r)=>`<path class="${o}" d="${i}" fill="none" stroke="${n}" stroke-width="${a}" stroke-linecap="round"/><path class="${o} cloth" d="${i}" fill="none" stroke="${t}" stroke-width="${r}" stroke-linecap="round"/>`;return`<svg class="rideleg" viewBox="0 0 160 130">${s("thigh","M66 56 L102 66",13,8)}${s("shin","M102 68 L106 104",12,7.2)}<circle class="knee" cx="102" cy="67" r="6.2" fill="${t}" stroke="${n}" stroke-width="3.5"/><ellipse class="shoe" cx="116" cy="106" rx="11" ry="5.2" fill="${n}"/></svg>`}function Jn(){return document.body.classList.contains("phone")&&document.body.classList.contains("phone-portrait")&&!Oe}function Dr(){if(!Jn())return yp.map((t,n)=>n);const e=[0,2,4];for(const t of Kn("ranch")){const n=t.p.ride;n!==void 0&&e.indexOf(n)<0&&e.push(n)}return e}function ss(e){if(!Jn())return yp[e];const t=Dr(),n=t.indexOf(e),s=t.length,o=n<0?0:n,i=kd().w/2,a=2400+i+18,r=3080-i-18;return s<=1?Math.round((a+r)/2):Math.round(a+(r-a)*o/(s-1))}function kd(){return Jn()?{w:131,h:106}:{w:150,h:122}}function nr(e,t,n){const s=sn(),{w:o,h:i}=kd();e.style.left=(t-o/2)*s+"px",e.style.top=(n-i)*s+"px",e.style.width=o*s+"px",e.style.height=i*s+"px",e.style.zIndex=_i(n)}function yL(){if(S!=="ranch"||Oe||!document.body.classList.contains("phone"))return;const e=new Set(Dr());document.querySelectorAll("#ranchWorld .horse").forEach(t=>{const n=+t.dataset.horse;t.classList.toggle("stallOff",Jn()&&!e.has(n)),!(!e.has(n)||Xn.has(n)||t.classList.contains("away"))&&nr(t,ss(n),Ts)})}function bL(e,t,n){if(Xn.has(e)||Math.hypot(t-ss(e),n-Ts)<26)return;Xn.set(e,{x:t,y:n});const s=document.querySelector(`#ranchWorld .horse[data-horse="${e}"]`);s&&(s.classList.add("trotting"),s.classList.remove("away"),s.classList.toggle("flipped",ss(e)<t),nr(s,t,n))}function kL(e,t,n){const s=n?-1:1;for(const o of[s*118,-s*118,s*160,-s*78])for(const i of[0,30,-26,48]){const a=tr(e+o,t+i);if(!(Math.hypot(a.x-e,a.y-t)<50)&&!er(a.x,a.y,8))return a}return tr(e,t)}let cp=0,Yh=0;const Ir=()=>b?b.now():Date.now(),Hr=()=>bc(b?b.ranch.plots:K.get().garden),Ii=()=>yc(b?b.players.get(b.pid)?.basket:K.get().basket),wd=()=>Oe?uc:Mi,Kh=()=>Oe?"barn":"ranch",Xh=()=>{const e=new Map;for(const t of Kn("ranch"))t.p.ride!==void 0&&e.set(t.p.ride,t);return e};function cc(e){const t={taken:"A friend just planted there!",wet:"Already watered 💧",notReady:"Still growing! 🌱",full:"Your basket is full!",slow:"The hen is laying… try again!",none:"Your basket has none left",nohouse:"Go home to put it in your room"};t[e]&&(Z(t[e]),P.pop())}function mo(e){if(b){const o=wl(Hr(),Ii(),e,Ir(),e.op==="egg"?cp:0);return typeof o=="string"?(cc(o),!1):(e.op==="egg"&&(cp=Date.now()),b.ranchOp(e),!0)}const t=K.get(),n=Date.now(),s=wl(bc(t.garden),yc(t.basket),e,n,t.lastEgg??0);return typeof s=="string"?(cc(s),!1):(K.dispatch({type:"ranch/op",op:e,now:n}),Or(!0),$d(),!0)}function $i(e=!1){const t=S==="ranch"&&Oe&&!e;Ks(),M("ranch").classList.remove("hidden"),He=null,_t=[],S="ranch",Oe=e;const n=e?{where:"barn",x:170,y:560,flip:!1}:{where:"ranch",x:t?yl:130,y:t?520:565,flip:!1};b?je(n):Dt=n,M("streetTitle").textContent=e?"The Barn":"Rainbow Ranch",mn(),vd(),requestAnimationFrame(()=>{const s=M("ranchScroll"),o=sn();s.scrollLeft=t?Math.max(0,yl*o-s.clientWidth/2):0,fc()}),setTimeout(fc,650),Di(M("ranch")),e?P.swish():P.sparkle()}M("btnHopOff").addEventListener("click",()=>Jh());function vd(){const e=sn(),t=M("ranchWorld"),n=o=>o*e+"px",s=(o,i,a,r)=>`left:${n(o-a/2)};top:${n(i-r)};width:${n(a)};height:${n(r)};z-index:${_i(i)}`;if(t.style.width=wd()*e+"px",t.style.height=Bi*e+"px",t.style.setProperty("--sc",String(e)),Oe){t.innerHTML=y7()+`<button class="rprop barnExit" data-r="exit" aria-label="Go outside" style="${s(127,444,206,244)}"><span class="exitHint"><span>Outside ☀️</span></span></button>`+vs.map((o,i)=>`<button class="animal" data-animal="${i}" aria-label="${mg[i].name}" style="${s(mc[i],J0+30,128,107)}">${Zl(i)}</button>`).join("")+[300,1244].map(o=>["carrot","apple","hay"].map((i,a)=>`<button class="bucket" data-feed="${i}" aria-label="${i} bucket" style="${s(o+a*56,592,54,62)}">${d7(i)}</button>`).join("")).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',es(),ot();return}t.innerHTML=s7()+o7().replace("<svg ",`<svg style="z-index:${_i(i7)}" `)+`<button class="rprop barnDoor" data-r="barn" aria-label="Go into the barn" style="${s(yl,472,150,150)}"><span class="doorHint"><span>Petting zoo inside! 🐐</span></span></button><button class="rprop windmill" data-r="mill" aria-label="Windmill" style="${s(1540,478,150,240)}">${h7}</button><button class="rprop henHouse" data-r="egg" aria-label="Hen house" style="${s(715,482,180,170)}">${a7}</button><button class="rprop tractor" data-r="honk" aria-label="Tractor" style="${s(900,580,170,130)}">${r7}</button><button class="rprop appleTree" data-r="apple" aria-label="Apple tree" style="${s(2085,482,240,300)}">${l7}</button>`+eu.map((o,i)=>{const a=kd();return`<button class="horse${Jn()&&Dr().indexOf(i)<0?" stallOff":""}" data-horse="${i}" aria-label="${Ua[i].name} horse" style="${s(ss(i),Ts,a.w,a.h)}">${zc(i)}</button>`}).join("")+Array.from({length:bl},(o,i)=>`<button class="plot" data-plot="${i}" aria-label="Garden plot" style="${s(nu(i),594,66,86)}"></button>`).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',Or(!0),es(),ot()}const aa=[];function Or(e=!1){if(S!=="ranch"||Oe)return;const t=Hr(),n=Ir();document.querySelectorAll("#ranchWorld .plot").forEach(s=>{const o=+s.dataset.plot,i=t[o]??null,a=hr(i,n),r=JSON.stringify(i)+a;!e&&aa[o]===r||(aa[o]!==void 0&&aa[o]!==r&&a>0&&(s.classList.remove("grow"),s.offsetWidth,s.classList.add("grow")),aa[o]=r,s.innerHTML=kg(i,a,o),s.dataset.stage=i?String(a):"empty")})}function es(){const e=document.getElementById("ravatars");if(!e||S!=="ranch")return;const t=sn(),n=new Set,s=new Set;let o=!1;for(const i of Kn(Kh())){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&Ah(a));const r=JSON.stringify(i.look)+i.name;if(a.dataset.look!==r){const h=a.querySelector(".bubble");a.innerHTML=i.name?ld(i.look,i.name):`<div class="inner">${bt(i.look)}</div>`,h&&a.appendChild(h),a.dataset.look=r,a.dataset.ride=""}const l=i.p.ride,c=(Os[i.look.size]??1)*t*.95*(l!==void 0?pL:1),f=as*c,d=un*c;if(a.dataset.ride!==String(l??"")&&(a.querySelector(".mount")?.remove(),l!==void 0&&a.insertAdjacentHTML("afterbegin",`<div class="mount" data-mount="${l}">${zc(l,!0)}${mL(i.look)}</div>`),a.dataset.ride=String(l??"")),a.classList.toggle("riding",l!==void 0),l!==void 0){s.add(l),i.mine&&(o=!0),$a.set(l,{x:i.p.x,y:i.p.y});const h=Jn()?jh:Fh,m=Jn()?fL:dL,k=h*t,_=m*t,y=a.querySelector(".mount");y.style.width=k+"px",y.style.height=_+"px",y.style.left=(f-k)/2+"px",y.style.top=d-_+"px";const u=Number(a.querySelector(".shirt")?.getAttribute("data-hem")??126),v=Number(y.querySelector(".saddle")?.getAttribute("data-top")??43),x=(u+gL/2)/160*d,A=d-_+(v-hL/2)/130*_;a.style.setProperty("--lift",x-A+"px");const O=y.querySelector(".rideleg");O&&(O.style.left="0",O.style.top="0",O.style.width="100%",O.style.height="100%")}else a.style.removeProperty("--lift");const g=parseFloat(a.dataset.lx??"NaN");Number.isFinite(g)&&Math.abs(g-i.p.x)>2&&(a.classList.add("moving"),clearTimeout(+(a.dataset.mt??0)),a.dataset.mt=String(window.setTimeout(()=>a.classList.remove("moving"),260))),a.dataset.lx=String(i.p.x),a.style.left=i.p.x*t-f/2+"px",a.style.top=i.p.y*t-d+"px",a.style.width=f+"px",a.style.height=d+"px",a.style.zIndex=_i(i.p.y),a.classList.toggle("flipped",i.p.flip),Ti(a,i.look,i.mine)}if(e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),document.body.classList.contains("phone")){const i=new Set(Dr());document.querySelectorAll("#ranchWorld .horse").forEach(a=>{a.classList.toggle("stallOff",Jn()&&!i.has(+a.dataset.horse))})}document.querySelectorAll("#ranchWorld .horse").forEach(i=>{const a=+i.dataset.horse;s.has(a)?(i.classList.add("away"),Xn.delete(a)):i.classList.remove("away")});for(const[i,a]of[...$a])s.has(i)||(bL(i,a.x,a.y),$a.delete(i));document.body.classList.toggle("riding",o),Ys()}function wL(e){const t=yn();if(!t||t.where!=="ranch")return;const n=Xh().get(e);if(n&&!n.mine){Z("Someone is riding!"),P.pop();return}if(t.ride!==void 0){if(n?.mine||t.ride===e){Jh();return}Gh(ss(e),Math.min(Tn,Ts+8));return}_t=[],Xn.delete(e),en({where:"ranch",x:ss(e),y:Math.min(Tn,Ts+8),flip:!1,ride:e}),P.neigh(),Z(`You're riding ${Ua[e].name}! Tap the ground to gallop 🐴`)}function Jh(){const e=yn();if(!e||e.ride===void 0)return;const t=e.ride,{ride:n,...s}=e;_t=[];const o=kL(s.x,s.y,s.flip);$a.set(t,{x:s.x,y:s.y}),en({...s,x:o.x,y:o.y}),P.drop()}function _d(e,t){const n=e<vs.length?document.querySelector(`#ranchWorld .animal[data-animal="${e}"]`):document.querySelector(`#ranchWorld .horse[data-horse="${e-vs.length}"]:not(.away)`)??document.querySelector(`#ravatars .mount[data-mount="${e-vs.length}"]`);if(!n||S!=="ranch")return;const s=e>=vs.length,o=s?{say:"Neigh! ♥",snd:"neigh"}:mg[e];n.classList.remove("hop","munch"),n.offsetWidth,n.classList.add(t?"munch":"hop"),setTimeout(()=>n.classList.remove("hop","munch"),1400),n.querySelector(".abubble")?.remove();const i=document.createElement("div");i.className="bubble petBubble abubble",i.textContent=t?`Yum! Munch munch ${t===1?"🥕":t===2?"🍎":"🌾"}`:o.say,n.appendChild(i),Po(),setTimeout(()=>i.classList.add("out"),1400),setTimeout(()=>i.remove(),1800);for(let a=0;a<(t?6:4);a++){const r=document.createElement("div");r.className="heart",r.textContent="♥",r.style.left=15+Math.random()*70+"%",r.style.animationDelay=a*.12+"s",r.style.color=["#ff6b9a","#ff8fab","#e879c6","#b197fc"][a%4],n.appendChild(r),setTimeout(()=>r.remove(),1900)}P[o.snd]?.(),t&&setTimeout(()=>P.munch(),250)}function e0(){const e=document.querySelector("#ranchWorld .henHouse");e&&(e.classList.remove("lay"),e.offsetWidth,e.classList.add("lay"),P.cluck())}function vL(){const e=document.querySelector("#ranchWorld .henHouse"),t=M("basketChip");if(!e)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=document.createElement("div");o.className="flyEgg",o.innerHTML=mi,document.body.appendChild(o),Object.assign(o.style,{left:n.left+n.width/2-18+"px",top:n.top+n.height*.6+"px"}),requestAnimationFrame(()=>{o.style.left=s.left+s.width/2-18+"px",o.style.top=s.top+"px",o.style.transform="scale(.6) rotate(200deg)"}),setTimeout(()=>{o.remove(),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")},650)}function t0(e){const t=document.getElementById("rfx");if(!t||S!=="ranch")return;const n=sn(),[s,o]=xf[e]??xf[0],i=1965+s,a=182+o,r=i+(e%2?26:-22),l=575+e*4,c=document.createElement("button");c.className="fallenApple",c.dataset.feed="apple",c.setAttribute("aria-label","Apple"),c.innerHTML=yg;const f=32*n;Object.assign(c.style,{width:f+"px",height:f+"px",left:i*n-f/2+"px",top:a*n-f/2+"px",zIndex:_i(l)}),t.appendChild(c),requestAnimationFrame(()=>{c.style.left=r*n-f/2+"px",c.style.top=l*n-f+"px",c.classList.add("fallen")});const d=document.querySelector("#ranchWorld .appleTree");d?.classList.remove("shake"),d?.offsetWidth,d?.classList.add("shake"),P.boing(),setTimeout(()=>c.remove(),12e3)}function n0(){const e=document.querySelector("#ranchWorld .tractor");e?.classList.remove("bounce"),e?.offsetWidth,e?.classList.add("bounce"),P.honk()}function _L(e){e.k==="zoo"?_d(e.a,e.f):e.k==="apple"?t0(e.v):e.k==="honk"?n0():e.k==="hen"&&e0()}function dp(e,t){const n=document.elementFromPoint(e,t);if(!n)return null;const s=n.closest("[data-animal]");if(s)return+s.dataset.animal;const o=n.closest(".horse:not(.away)");if(o)return vs.length+ +o.dataset.horse;const i=n.closest(".savatar.riding");return i?.dataset.ride?vs.length+ +i.dataset.ride:null}function dc(e,t,n){e.preventDefault(),e.stopPropagation();const s=document.createElement("div");s.className="feedGhost",s.innerHTML=bg[t],document.body.appendChild(s);const o=m=>{s.style.left=m.clientX-30+"px",s.style.top=m.clientY-50+"px"};o(e),P.pick();let i=0;const a=e.clientX,r=e.clientY;n instanceof HTMLElement&&(n.style.visibility="hidden");let l=e.clientX,c=0;const f=M("ranchScroll"),d=()=>{const m=f.getBoundingClientRect(),k=l<m.left+60?-12:l>m.right-60?12:0;k&&i>12&&S==="ranch"&&(f.scrollLeft+=k),c=requestAnimationFrame(d)};c=requestAnimationFrame(d);const g=m=>{if(m.pointerId!==e.pointerId)return;l=m.clientX,i=Math.max(i,Math.hypot(m.clientX-a,m.clientY-r)),o(m),document.querySelectorAll(".feedHover").forEach(_=>_.classList.remove("feedHover")),dp(m.clientX,m.clientY)!==null&&document.elementFromPoint(m.clientX,m.clientY)?.closest(".animal, .horse, .savatar")?.classList.add("feedHover")},h=m=>{if(m.pointerId!==e.pointerId)return;cancelAnimationFrame(c),window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",h),s.remove(),Yh=Date.now(),document.querySelectorAll(".feedHover").forEach(y=>y.classList.remove("feedHover"));const k=dp(m.clientX,m.clientY);if(k===null){n instanceof HTMLElement&&(n.style.visibility=""),i<12?Z("Drag the food onto an animal! 🥕"):P.drop();return}if(n==="basket"&&!mo({op:"use",kind:"carrot"}))return;n instanceof HTMLElement&&n.remove();const _=tu.indexOf(t);_d(k,_),b?.fx({k:"zoo",a:k,f:_})};window.addEventListener("pointermove",g),window.addEventListener("pointerup",h)}M("ranchWorld").addEventListener("pointerdown",e=>{const t=e.target,n=t.closest(".bucket");if(n)return dc(e,n.dataset.feed,"bucket");const s=t.closest(".fallenApple");if(s)return dc(e,"apple",s);t.closest(".rprop, .animal, .horse, .plot, .pet")&&e.stopPropagation()});M("ranchWorld").addEventListener("click",e=>{const t=e.target;if(!yn()||S!=="ranch"||Date.now()-Yh<400)return;const s=t.closest("[data-animal]");if(s){const d=+s.dataset.animal;_d(d,0),b?.fx({k:"zoo",a:d,f:0});return}const o=t.closest("[data-horse]");if(o){wL(+o.dataset.horse);return}const i=t.closest("[data-r]")?.dataset.r;if(i==="egg"){e0(),mo({op:"egg"})&&(vL(),P.pickup());return}if(i==="honk"){n0(),b?.fx({k:"honk"});return}if(i==="apple"){const d=Math.floor(Math.random()*4);t0(d),b?.fx({k:"apple",v:d});return}if(i==="barn"){$i(!0);return}if(i==="exit"){$i(!1);return}if(i==="mill"){const d=t.closest(".windmill");d?.classList.remove("whirl"),d?.offsetWidth,d?.classList.add("whirl"),P.swish();return}const a=t.closest("[data-plot]");if(a){$L(+a.dataset.plot,a);return}if(t.closest(".bucket, .fallenApple, .savatar, .pet"))return;const r=M("ranchWorld").getBoundingClientRect(),l=sn(),c=(e.clientX-r.left)/l,f=(e.clientY-r.top)/l;f<400||Gh(c,f)});function $L(e,t){const n=Hr()[e]??null,s=hr(n,Ir());if(document.querySelector(".seedPick")?.remove(),!n){const o=document.createElement("div");o.className="seedPick",o.innerHTML=`<button data-seed="carrot">${Mr}<span>Carrot</span></button><button data-seed="flower">${Qc()}<span>Flower</span></button>`,t.parentElement.appendChild(o),o.style.left=t.offsetLeft+t.offsetWidth/2+"px",o.style.top=t.offsetTop-8+"px",o.addEventListener("pointerdown",i=>i.stopPropagation()),o.addEventListener("click",i=>{i.stopPropagation();const a=i.target.closest("[data-seed]")?.dataset.seed;o.remove(),a&&mo({op:"plant",i:e,seed:a})&&(P.plant(),Z("Planted! Now tap it to water 💧"))}),setTimeout(()=>o.remove(),6e3);return}if(!n.wet){mo({op:"water",i:e})&&(P.water(),t.classList.remove("watering"),t.offsetWidth,t.classList.add("watering"));return}if(s<3){Z("Still growing! 🌱"),P.pop();return}mo({op:"pick",i:e})&&(P.pickup(),Z(n.seed==="carrot"?"A carrot for your basket! 🥕":"Pretty flowers for your basket! 🌸"))}let fp=0;function xL(e,t){if(S!=="ranch")return;const n=Date.now();if(document.querySelectorAll("#ranchWorld .animal").forEach(s=>{const o=+s.dataset.animal,i=sn(),a=n/5200+o*1.7,r=(Oe?mc:X0)[o]+Math.sin(a)*32;s.style.left=(r-s.offsetWidth/i/2)*i+"px",s.classList.toggle("flipped",Math.cos(a)<0),s.classList.toggle("walking",Math.abs(Math.cos(a))>.35)}),e-fp>1e3&&(fp=e,Or()),_t.length){const s=yn();if(!s||s.where!==Kh())_t=[];else{const o=_t[0],i=s.ride!==void 0?720:300,a=o.x-s.x,r=o.y-s.y,l=Math.hypot(a,r);if(l<6)_t.shift();else{const c=Math.min(l,i*t),f={...s,x:s.x+a/l*c,y:s.y+r/l*c,flip:Math.abs(a)>2?a<0:s.flip};en(f);const d=sn(),g=M("ranchScroll"),h=f.x*d-g.scrollLeft;h>-40&&h<g.clientWidth+40&&(h<g.clientWidth*.2||h>g.clientWidth*.8)&&(g.scrollLeft=f.x*d-g.clientWidth/2)}}}for(const[s,o]of Xn){const i=document.querySelector(`#ranchWorld .horse[data-horse="${s}"]`);if(!i||i.classList.contains("away")){Xn.delete(s);continue}const a=ss(s)-o.x,r=Ts-o.y,l=Math.hypot(a,r);if(l<8){Xn.delete(s),i.classList.remove("trotting","flipped"),nr(i,ss(s),Ts);continue}const c=Math.min(l,460*t);o.x+=a/l*c,o.y+=r/l*c,i.classList.add("trotting"),i.classList.toggle("flipped",a<0),nr(i,o.x,o.y)}}function $d(){const e=document.getElementById("basketChip");if(!e)return;const t=S==="house"&&(!b||Ie===K||Pe===b.myHouseId()),n=Ii(),o=n.egg+n.carrot+n.flower>0&&(S==="ranch"||t);e.classList.toggle("hidden",!o),e.classList.toggle("inHouse",S==="house"),o&&(e.innerHTML=`<span class="bIcon">${f7}</span><span class="bcount" data-kind="egg">${mi}<b>${n.egg}</b></span><span class="bcount" data-kind="carrot">${Mr}<b>${n.carrot}</b></span><span class="bcount" data-kind="flower">${Qc()}<b>${n.flower}</b></span>`)}M("basketChip").addEventListener("pointerdown",e=>{e.target.closest('.bcount[data-kind="carrot"]')&&S==="ranch"&&Ii().carrot>0&&dc(e,"carrot","basket")});M("basketChip").addEventListener("click",()=>ML());function ML(){const e=S==="house"&&(!b||Ie===K||Pe===b.myHouseId()),t={egg:["Eggs",mi],carrot:["Carrots",Mr],flower:["Flowers",Qc()]},n=qt("",(o,i)=>{const a=o.closest("[data-take]")?.dataset.take;if(!a)return;if(!e){Z("Take it home to put it in your room! 🏠");return}const r="r"+Math.random().toString(36).slice(2,10),l=Math.max(120,Math.min(_e-120,ae+re/2+(Math.random()-.5)*300));mo({op:"take",kind:a,id:r,room:C.get().currentRoom,x:l})&&(P.drop(),i(),Z("It's in your room! Drag it to a hand to carry it ✋"))},"basketSheet"),s=Ii();n.root.querySelector(".card").innerHTML=`${Zt}<h2>My Basket</h2><p class="hint small">${e?"Tap one to put it in your room.":"Collect eggs, carrots and flowers at Rainbow Ranch, then take them home!"}</p>
    <div class="basketRows">${bp.map(o=>`<button class="bRow" data-take="${o}" ${s[o]?"":"disabled"}>${t[o][1]}<b>${s[o]}</b><span>${t[o][0]}</span></button>`).join("")}</div>`}window.__ranch=()=>({view:S,inBarn:Oe,plots:Hr().map(e=>e?{seed:e.seed,stage:hr(e,Ir()),wet:!!e.wet}:null),basket:Ii(),me:yn(),ridden:[...Xh().keys()]});function LL(){if(Go.kind==="none")return;W7(),qt(U7(Go.kind,Go.entries),(t,n)=>{t.closest("#wnGo")&&(P.sparkle(),n())},"whatsNew "+Go.kind).root.querySelector(".card").insertAdjacentHTML("afterbegin",Zt)}setTimeout(LL,500);window.__whatsnew=Go;window.__hood=()=>b;window.__hood_url=()=>yr();window.__ui=()=>({view:S,currentHouseId:Pe,mode:b?"hood":"solo",play:Be.mode()});kM({hood:()=>b,view:()=>S,solo:()=>Dt,myPres:be,setPres:en,toast:Z,refreshNear:Ys,sfx:P,goMap:uo,soloLook:()=>{const e=K.get();return{look:Ci(e.characters[0]??{}),dog:e.dog??null}}});function s0(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n.items)t.add(s.kind);for(const n of e.characters)n.held.left&&t.add(n.held.left.kind),n.held.right&&t.add(n.held.right.kind);return e.baby&&t.add("baby"),[...t]}let ra=null,xd=()=>!1;function o0(e){return ra||(ra=p(()=>Promise.resolve().then(()=>Sc),void 0).then(t=>(xd=t.hasArt,t.boot(location.search,s0(C.get())))).then(t=>{for(let n=0;n<t.length;n++)if(Me[t[n]]){zs();break}kh()}),ra)}function EL(e){const t=new Set(e),n=C.get();let s=!1;for(const o of n.rooms[n.currentRoom].items){const i=Me[o.kind];if(!t.has(o.kind)||!i)continue;const a=se.querySelector(`.item[data-id="${o.id}"] .inner`);!a||a.querySelector("img.artimg")||(a.innerHTML=hn(i,!0),s=!0)}s&&(Bt.forEach(o=>{delete o.dataset.held}),Jt(n),kh())}function CL(){return p(()=>Promise.resolve().then(()=>Sc),void 0).then(e=>e.boot(location.search,s0(C.get()))).then(e=>{EL(e.filter(t=>!!Me[t]))})}z5();Fx();Xx(e=>e==="backyard"?P5():null);M("scenery").addEventListener("click",e=>{const t=e.target.closest("[data-yard-go]");t&&nd(t.dataset.yardGo==="backyard"?"backyard":"living")});const SL=K7(M("skyMount"));window.__sky=SL;Sr=O1({layer:se,stageWrap:M("stageWrap"),get:()=>C.get(),dispatch:e=>C.dispatch(e),clock:()=>b&&Ie!==K?b.now():Date.now(),canSend:()=>!b||Ie===K||!!b.speaksBaby,owner:()=>sh(),inHouse:()=>S==="house",play:()=>Be.isPlay(),editable:()=>Ht(),toRoom:At,box:e=>{const t=Me[e.kind];return t?{id:e.id,kind:e.kind,x:e.x,footY:js(t,e.y),flip:!!e.flip,scale:Ge(e),w:t.w,h:ct(t),z:e.z}:null},holderId:()=>b&&Ie!==K&&b.pid?b.pid:Te||C.get().characters[0]?.id||"c1",holderSpot:e=>{const t=C.get(),n=b&&Ie!==K&&b.pid?b.pid:Te||t.characters[0]?.id||"",s=e||n,o=(a,r,l,c,f,d)=>{const g=c?.pose==="sit"||c?.pose==="lie"?c.pose:null,h=g==="lie"?t.rooms[t.currentRoom]?.items.find(k=>k.id===c?.item):void 0,m=f&&/^#[0-9a-fA-F]{6}$/.test(f)?f:"#f1c27d";return{x:a.x,y:a.y,flip:r,scale:l>0?l:1,pose:g,lieFlip:!!(g==="lie"&&h?.flip),skin:m,chibi:!!d}},i=t.characters.find(a=>a.id===s&&a.room===t.currentRoom);if(i){const a=Mt(i);return o($t(t.currentRoom,a,i),i.flip,Os[i.size]??1,a,i.look2&&i.look2.skin||i.skin,!!i.look2)}if(b&&S==="house"){const a=s===b.pid?be():b.presence.get(s);if(a&&a.where==="house"&&a.houseId===Pe&&a.room===t.currentRoom){const r=Bn(s,a),l=b.players.get(s)?.look,c=l?.size??"kid";return o($t(t.currentRoom,r,a),a.flip,Os[c]??1,r,l?.look2&&l.look2.skin||l?.skin||"#f1c27d",!!l?.look2)}}return null},holderHere:e=>{if(!e)return!1;if(C.get().characters.some(s=>s.id===e))return!0;if(!b||Ie===K)return!1;const n=e===b.pid?be():b.presence.get(e);return!!(n&&n.where==="house"&&n.houseId===Pe)},occupied:()=>wi(void 0,b?.pid,!0),locked:()=>Rn(null),seatAt:(e,t,n)=>$t(e,t,n)}).render;Fg=()=>Sr();zs();It();rs();PL();rs();Wr();nh();ha();So.matches?ns():rs();requestAnimationFrame(()=>{rs(),Wr(),Kc()});function PL(){if(!Fc)return;const e=Al(),t=C.get().characters[0];if(!t)return;const n=e==="door";if(C.dispatch({type:"char/update",id:t.id,patch:{...j3(),flip:n?Hl.flip:Il.flip}}),C.dispatch({type:"cat/set",cat:{name:"Clover",coat:3,room:n?"living":"backyard",x:n?Ha:jn.x}}),C.dispatch({type:"dog/set",dog:{name:"Sunny",breed:3,owner:t.id}}),!C.get().rooms.backyard.items.some(s=>s.kind==="yard-swing"))for(const s of G3)C.dispatch({type:"item/add",room:"backyard",item:{id:"yp-"+s.kind,kind:s.kind,x:s.x,y:s.y,flip:!1,z:1,scale:s.scale??1}});if(e!=="sheet"){const s=n?Hl:Il;C.dispatch({type:"char/move",id:t.id,room:n?"living":"backyard",x:s.x,y:s.y}),C.dispatch({type:"room/switch",room:n?"living":"backyard"})}window.__pinCat=n?{x:Ha}:{x:jn.x,y:jn.y},e==="play"?M("modePlay").click():(e==="decorate"||e==="door")&&M("modeDecorate").click(),e==="sheet"&&document.body.insertAdjacentHTML("beforeend",A5()),e==="compare"&&document.body.insertAdjacentHTML("beforeend",I5()),document.body.dataset.yard="ready"}function TL(e){const t=C.get(),n=e==="backyard"?Il:Hl;Rt=null;const s=t.characters.find(o=>o.id===Te&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(s&&(C.dispatch({type:"char/update",id:s.id,patch:{flip:n.flip}}),C.dispatch({type:"char/move",id:s.id,room:e,x:n.x,y:n.y})),Fc&&t.cat&&(C.dispatch({type:"cat/move",room:e,x:e==="backyard"?jn.x:Ha}),window.__pinCat=e==="backyard"?{x:jn.x,y:jn.y}:{x:Ha}),C.dispatch({type:"room/switch",room:e}),b&&Ie!==K){const o=be();o&&o.where==="house"&&je({...o,room:e,x:n.x,y:n.y,flip:n.flip})}requestAnimationFrame(()=>Wr())}function Wr(){if(C.get().currentRoom==="backyard"){Fe(Dl),Nn();return}if(!Fc||Al()==="sheet"||Al()==="compare")return;const e=C.get().characters.find(t=>t.room===C.get().currentRoom);e&&Fe(e.x-re/2),Nn()}function Nn(){if(Vs||F.getBoundingClientRect().width<20)return;const t=yt()||parseFloat(F.style.getPropertyValue("--yard-sc"))||1;F.style.setProperty("--yard-sc",String(t));const n=[...F.querySelectorAll(".yardDoor")];for(const m of n){m.style.minWidth="",m.style.transform="";const k=m.querySelector(".yardHintLabel");if(!k)continue;k.style.transform="",k.style.translate="";const _=k.querySelector("span");_&&(_.style.transform="");const y=Math.max(13,16/t);k.style.fontSize=y+"px",k.style.lineHeight="1";const u=38/t;k.style.height=u+"px";const v=3/t,x=Math.max(0,(u-v*2-y)/2);k.style.padding=`${x.toFixed(2)}px ${(14/t).toFixed(2)}px`}const s=n[0];if(!s)return;const o=s.querySelector(".doorArt"),i=s.querySelector(".yardHintLabel"),a=6,r=()=>{const m=F.getBoundingClientRect(),k=s.getBoundingClientRect(),_=o?.getBoundingClientRect(),y=i?.getBoundingClientRect(),u=[k,_,y].filter(H=>!!H&&H.width>2&&H.height>2),v=Math.min(...u.map(H=>H.top)),x=Math.max(...u.map(H=>H.bottom));let A=m.left+a,O=m.right-a;for(const H of["nudgeL","nudgeR"]){const X=M(H);if(!X||X.classList.contains("off")||X.offsetParent===null)continue;const le=X.getBoundingClientRect();if(le.width<2||le.height<2)continue;const ce=fe=>fe.top<le.bottom-1&&fe.bottom>le.top+1,G=[k,_].some(fe=>fe&&fe.width>2&&ce(fe));!G&&(v>=le.bottom-1||x<=le.top+1)||(H==="nudgeL"&&G?A=Math.max(A,le.right+8):H==="nudgeR"&&G&&(O=Math.min(O,le.left-8)))}return{leftLimit:A,rightLimit:O,doorR:k,artR:_,hintR:y}};let l=0,c=0;for(;l++<4;){const{leftLimit:m,rightLimit:k,doorR:_,artR:y}=r();let u=0;const v=Math.min(_.left,y&&y.width>2?y.left:_.left),x=Math.max(_.right,y&&y.width>2?y.right:_.right);if(v<m&&(u+=m-v),x+u>k&&(u-=x+u-k),Math.abs(u)<.5)break;c+=u,s.style.transform=`translate(${(c/t).toFixed(1)}px, 0)`}if(!i){Gf(s);return}const f=i.querySelector("span");if(f){const m=document.createRange();m.selectNodeContents(f);const k=m.getBoundingClientRect(),_=i.getBoundingClientRect(),y=(_.top+_.bottom-(k.top+k.bottom))/2,u=f;k.height>2&&Math.abs(y)>=.1?u.style.transform=`translateY(${(y/t).toFixed(2)}px)`:u.style.transform=""}const d=i.getBoundingClientRect(),g=F.getBoundingClientRect();let h=0;if(C.get().currentRoom==="backyard"&&o){const m=o.getBoundingClientRect();m.width>2&&(h+=(m.left+m.right)/2-(d.left+d.right)/2)}d.left+h<g.left+a?h+=g.left+a-(d.left+h):d.right+h>g.right-a&&(h-=d.right+h-(g.right-a)),Math.abs(h)>.5?i.style.translate=`calc(-50% + ${(h/t).toFixed(1)}px) 0`:i.style.translate="",Gf(s)}o0(C.get().currentRoom);const i0=()=>{const e=_r().size,t=Ia.length,n=M("secrets"),s=n.querySelector(".secCount");s&&(s.textContent=`${e}/${t}`),n.setAttribute("aria-label",`Surprises, ${e} of ${t}`),Kg()};function Ur(){return window.innerHeight>window.innerWidth+40}function a0(e,t){for(const G of e)G.style.transform="";if(!Ur()||!e.length)return;const n=t&&t.clientWidth>20?t.getBoundingClientRect():{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth};if(n.width<20)return;const s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,window.innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,window.innerHeight)-s,l=Math.max(40,i-o),c=Math.max(40,r-a),d=e.map(G=>G.getBoundingClientRect()).filter(G=>G.width>2&&G.height>2);if(!d.length)return;const g=Math.min(...d.map(G=>G.left)),h=Math.max(...d.map(G=>G.right)),m=Math.min(...d.map(G=>G.top)),k=Math.max(...d.map(G=>G.bottom)),_=Math.max(1,h-g),y=Math.max(1,k-m),u=Math.min(1,l/_,c/y);if(u>.995&&g>=o-1&&h<=i+1&&m>=a-1&&k<=r+1)return;const x=e[0].getScreenCTM(),A=x&&Math.hypot(x.a,x.b)||1,O=(g+h)/2,H=(m+k)/2,X=y*u,le=(o+i)/2,ce=m>=a&&k<=r?H:Math.min(Math.max(H,a+X/2),r-X/2);for(const G of e){const fe=G.getBoundingClientRect(),on=(fe.left+fe.right)/2,Ot=(fe.top+fe.bottom)/2,Ze=le+(on-O)*u,T=ce+(Ot-H)*u;G.style.transformBox="fill-box",G.style.transformOrigin="center",G.style.transform=`translate(${((Ze-on)/A).toFixed(2)}px, ${((T-Ot)/A).toFixed(2)}px) scale(${u.toFixed(3)})`}}function r0(){if(S!=="gameroom")return;const e=document.getElementById("grScroll");a0([...document.querySelectorAll(".neonSignArt")],e)}function fc(){S!=="ranch"||Oe||(document.querySelectorAll(".ranchSignArt").forEach(e=>{e.style.transform=""}),ot(),l0(),Md())}function Md(){if(S!=="ranch"||Oe)return;const e=document.getElementById("ranchScroll");if(!e)return;const t=e.getBoundingClientRect();document.querySelectorAll(".ranchSignArt").forEach(n=>{const s=n.getBoundingClientRect(),o=Math.min(t.right,innerWidth),i=Math.max(0,t.left-s.left)+Math.max(0,s.right-o);n.style.visibility=s.width>20&&i<8?"visible":"hidden"})}M("ranchScroll").addEventListener("scroll",()=>{S==="ranch"&&!Oe&&Md()},{passive:!0});function l0(){const e=document.querySelector(".doorHint"),t=document.getElementById("ranchScroll");if(!e||!t)return;e.style.transform="translateX(-50%)";const n=t.getBoundingClientRect(),s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,innerHeight)-s,l=e.getBoundingClientRect();let c=0;l.right>i&&(c-=l.right-i),l.left+c<o&&(c+=o-(l.left+c));let f=0;const d=t.querySelector(".savatar");if(d){const g=d.getBoundingClientRect(),m=d.querySelector(".nametag")?.getBoundingClientRect(),k=!!(m&&m.width>4&&m.height>4),_=k?Math.min(g.top,m.top):g.top,y=k?Math.min(g.left,m.left):g.left,u=k?Math.max(g.right,m.right):g.right,v=l.left+c;l.right+c>y-6&&v<u+6&&l.bottom+f>_-6&&l.top<g.top+g.height*.72&&(f+=_-48-(l.bottom+f))}if(l.top+f<a&&(f+=a-(l.top+f)),document.body.classList.contains("phone-portrait")){const g=document.querySelector(".ranchSign .ranchSignArt");if(g){const h=g.getBoundingClientRect(),m=l.left+c,k=l.right+c,_=l.top+f,y=l.bottom+f;if(h.width>20&&h.height>h.width*.7&&k>h.left+4&&m<h.right-4&&y>h.top+4&&_<h.bottom-4){let v=h.top-16-y;_+v<a&&(v+=a-(_+v));const A=d?.querySelector(".nametag")?.getBoundingClientRect(),O=y+v;!(A&&A.width>4&&A.height>4&&O>A.top-12&&k>A.left-6&&m<A.right+6)&&O<=r&&(f+=v)}}}(c||f)&&(e.style.transform=`translate(calc(-50% + ${c.toFixed(1)}px), ${f.toFixed(1)}px)`)}const c0=e2({world:Zg,roomW:_e,roomH:ze,currentRoom:()=>C.get().currentRoom,sparkle:()=>P.sparkle(),tap:()=>P.click(),onFound:(e,t)=>{if(i0(),t){const n=M("secrets");n.classList.remove("pulse"),n.offsetWidth,n.classList.add("pulse"),setTimeout(()=>Z("🎁 A secret surprise appeared in your drawer!"),1400),It()}}});C.subscribe((e,t)=>{(t.type==="room/switch"||t.type==="game/reset")&&c0.update()});i0();window.__eggs=()=>({found:[..._r()]});B9();
