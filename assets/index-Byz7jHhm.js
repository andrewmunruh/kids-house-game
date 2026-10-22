(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const Qh="modulepreload",Ah=function(e){return"/kids-house-game/"+e},Lc={},wa=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(n.map(l=>{if(l=Ah(l),l in Lc)return;Lc[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":Qh,c||(f.as="script"),f.crossOrigin="",f.href=l,r&&f.setAttribute("nonce",r),document.head.appendChild(f),c)return new Promise((g,h)=>{f.addEventListener("load",g),f.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return o.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})},Bo="#5a3d5c",Z=(e=4)=>`stroke="${Bo}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,or=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],ln=1e3,cn=700,ir="M 30 660 C 150 640, 200 540, 330 545 S 540 650, 690 600 S 925 470, 850 375 S 640 330, 520 355 S 270 385, 250 285 S 330 145, 480 150 S 700 200, 790 150",kn={x:115,y:170},zt={x:880,y:120},Dt={x:600,y:480},bn={x:400,y:260},Xd=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${Z(3)}/><circle cx="0" cy="-10" r="20" fill="${s}" ${Z(3)}/><circle cx="-12" cy="-2" r="12" fill="${s}" ${Z(3)}/><circle cx="12" cy="-3" r="13" fill="${s}" ${Z(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`,jn=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})" fill="#fff"><ellipse cx="0" cy="10" rx="46" ry="22"/><ellipse cx="-36" cy="16" rx="28" ry="16"/><ellipse cx="38" cy="14" rx="30" ry="18"/><ellipse cx="10" cy="2" rx="24" ry="18"/></g>`,wo=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">${[0,72,144,216,288].map(o=>`<circle cx="${(Math.cos(o*Math.PI/180)*8).toFixed(1)}" cy="${(Math.sin(o*Math.PI/180)*8).toFixed(1)}" r="6.5" fill="${n}" ${Z(2)}/>`).join("")}<circle r="4.5" fill="#ffd43b" ${Z(2)}/></g>`,vn=(e,t,n)=>`<g transform="translate(${e} ${t})">${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*4}" cy="${Math.sin(s*Math.PI/180)*4}" r="3.6" fill="${n}"/>`).join("")}<circle r="2.6" fill="#ffd43b"/></g>`;function Uh(){return`<svg class="mapBg" viewBox="0 0 ${ln} ${cn}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${ln}" height="${cn}" rx="34" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="160" cy="420" rx="150" ry="90"/><ellipse cx="760" cy="250" rx="170" ry="70"/><ellipse cx="480" cy="640" rx="140" ry="50"/><ellipse cx="930" cy="600" rx="90" ry="110"/></g>
  <g fill="#93d78e" opacity=".7"><ellipse cx="420" cy="260" rx="70" ry="30"/><ellipse cx="80" cy="560" rx="60" ry="26"/><ellipse cx="700" cy="420" rx="50" ry="22"/></g>
  <!-- pond -->
  <ellipse cx="120" cy="470" rx="72" ry="40" fill="#8ecae6" ${Z()}/><ellipse cx="108" cy="462" rx="42" ry="16" fill="#bde6f7"/><path d="M150 480 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <!-- side paths to the park and the ranch -->
  <path d="M250 285 Q190 250 150 215" fill="none" stroke="${Bo}" stroke-width="30" stroke-linecap="round"/><path d="M250 285 Q190 250 150 215" fill="none" stroke="#f2dcb8" stroke-width="22" stroke-linecap="round"/>
  <!-- the street -->
  <path d="${ir}" fill="none" stroke="${Bo}" stroke-width="58" stroke-linecap="round"/>
  <path id="mapRoad" d="${ir}" fill="none" stroke="#f2dcb8" stroke-width="48" stroke-linecap="round"/>
  <path d="${ir}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 16" stroke-linecap="round" opacity=".9"/>
  <!-- town square -->
  <g transform="translate(${Dt.x} ${Dt.y})"><circle r="74" fill="#f7e6c8" ${Z()}/><circle r="74" fill="none" stroke="#e6cfa6" stroke-width="10" stroke-dasharray="10 12" transform="scale(.82)"/>
    <circle r="30" fill="#bde6f7" ${Z()}/><circle r="13" fill="#fff6e6" ${Z(3)}/><path d="M0 -13 Q-8 -32 -16 -20 M0 -13 Q8 -32 16 -20 M0 -13 V-34" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>
    ${vn(-52,-40,"#ff8fab")}${vn(54,-38,"#b197fc")}${vn(-56,40,"#ffd43b")}${vn(52,44,"#ff8fab")}</g>
  ${[[60,330,"#ff8fab"],[300,470,"#b197fc"],[430,560,"#ffd43b"],[760,520,"#ff8fab"],[950,260,"#b197fc"],[600,260,"#ffd43b"],[380,90,"#ff8fab"],[40,120,"#b197fc"],[960,420,"#ffd43b"],[840,640,"#b197fc"],[210,620,"#ff8fab"]].map(([e,t,n])=>vn(+e,+t,String(n))+vn(+e+14,+t+8,String(n))).join("")}
  </svg>`}function Cc(e,t,n=ln,s=cn){const o=[];let i=7;const a=()=>(i=(i*9301+49297)%233280)/233280;for(let r=0;r<260&&o.length<34;r++){const l=30+a()*(n-60),c=40+a()*(s-70);t(l,c)||e.some(d=>Math.hypot(d.x-l,d.y-c)<d.r)||(e.push({x:l,y:c,r:46}),o.push(Xd(l,c,.75+a()*.45,["#5cc985","#4fbf7a","#78d39a"][r%3])))}return`<svg class="mapTrees" viewBox="0 0 ${n} ${s}" xmlns="http://www.w3.org/2000/svg">${o.join("")}</svg>`}function zh(e,t){const n=e/2,s=`M ${n} 36 C ${n-36} ${t*.28}, ${n+28} ${t*.48}, ${n-8} ${t*.68} S ${n+18} ${t*.86}, ${n} ${t-28}`;return`<svg class="mapBg" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="${t}" rx="28" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="${e*.22}" cy="${t*.22}" rx="90" ry="48"/><ellipse cx="${e*.78}" cy="${t*.42}" rx="80" ry="40"/><ellipse cx="${e*.3}" cy="${t*.72}" rx="100" ry="46"/></g>
  <ellipse cx="78" cy="${t*.58}" rx="46" ry="28" fill="#8ecae6" ${Z()}/><ellipse cx="70" cy="${t*.56}" rx="24" ry="10" fill="#bde6f7"/>
  <path d="${s}" fill="none" stroke="${Bo}" stroke-width="44" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#f2dcb8" stroke-width="34" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round" opacity=".9"/>
  ${[[40,250,"#ff8fab"],[500,280,"#b197fc"],[70,520,"#ffd43b"],[490,640,"#ff8fab"],[50,860,"#74c0fc"],[500,980,"#ffd43b"]].map(([o,i,a])=>vn(+o,+i,String(a))+vn(+o+16,+i+10,String(a))).join("")}
  </svg>`}const Dh=(e,t,n=1,s="#4fbf7a")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="10" rx="28" ry="8" fill="#000" opacity=".08"/><circle cx="-14" cy="-2" r="16" fill="${s}" ${Z(3)}/><circle cx="14" cy="0" r="18" fill="${s}" ${Z(3)}/><circle cx="0" cy="-12" r="14" fill="${s}" ${Z(3)}/><circle cx="-4" cy="-16" r="4" fill="#fff" opacity=".28"/></g>`,qh=(e,t,n="#ff8fab")=>`<g transform="translate(${e} ${t})"><ellipse cx="-7" cy="-2" rx="8" ry="5" fill="${n}" ${Z(2)} transform="rotate(-24)"/><ellipse cx="7" cy="-2" rx="8" ry="5" fill="${n}" ${Z(2)} transform="rotate(24)"/><ellipse cx="-6" cy="4" rx="6" ry="4" fill="#b197fc" ${Z(1.6)} transform="rotate(18)"/><ellipse cx="6" cy="4" rx="6" ry="4" fill="#b197fc" ${Z(1.6)} transform="rotate(-18)"/><path d="M0 -6 V8" ${Z(2)}/></g>`;function Zh(e,t,n){const s=e/2,o=(f,g,h)=>g>t*.4&&g<t-28&&Math.abs(f-s)>52&&!n.some(u=>Math.hypot(u.x-f,u.y-g)<u.r+h),i=[.07,.15,.22,.78,.85,.93],a=[.46,.54,.62,.7,.78,.86,.93],r=["#ff8fab","#b197fc","#ffd43b","#74c0fc","#69db7c"],l=[];let c=0;a.forEach((f,g)=>{i.forEach((h,u)=>{const b=Math.round(e*h+((g+u)%2?8:-6)),_=Math.round(t*f);if((g+u)%3===0){if(!o(b,_,34))return;l.push(Dh(b,_,.85+u%2*.15,["#4fbf7a","#5cc985","#3dae6a"][(g+u)%3]))}else{if(!o(b,_,18))return;const m=r[(g*2+u)%r.length];l.push(wo(b,_,m,.85)),(g+u)%2===0&&o(b+18,_+12,14)&&l.push(wo(b+18,_+12,r[(g+u+2)%r.length],.7))}c++})});const d=[[e*.2,t*.5],[e*.8,t*.66],[e*.18,t*.84]];for(const[f,g]of d)o(f,g,16)&&l.push(qh(Math.round(f),Math.round(g),c%2?"#ffd43b":"#ff8fab"));return`<svg class="mapMeadowFill" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">${l.join("")}</svg>`}const Ih=`<svg class="mapSkyArt" viewBox="0 0 900 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
  ${jn(280,28,1.05)}${jn(430,8,.8)}${jn(560,36,.95)}
  ${jn(250,88,.75)}${jn(390,108,1.05)}${jn(540,96,.85)}${jn(640,78,.7)}
  <g fill="none" stroke-linecap="round">
    ${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M300 ${118+t*6} A70 48 0 0 1 430 ${112+t*6}" stroke="${e}" stroke-width="5"/>`).join("")}
  </g>
</svg>`,Oh=`<svg class="mapMeadowArt" viewBox="0 0 900 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
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
  ${[[48,188,"#ff8fab",.85],[120,176,"#ffd43b",.7],[200,198,"#b197fc",.9],[280,172,"#ff8fab",.75],[360,204,"#74c0fc",.8],[450,178,"#ffd43b",.85],[530,200,"#ff8fab",.75],[620,174,"#b197fc",.8],[700,196,"#69db7c",.7],[790,180,"#ffd43b",.85]].map(([e,t,n,s])=>wo(+e,+t,String(n),+s)).join("")}
  ${[[80,248,"#ff8fab"],[160,268,"#b197fc"],[250,242,"#ffd43b"],[340,274,"#ff8fab"],[430,250,"#74c0fc"],[520,270,"#b197fc"],[610,246,"#ffd43b"],[700,272,"#ff8fab"],[790,252,"#69db7c"]].map(([e,t,n])=>wo(+e,+t,String(n),1.05)).join("")}
  ${[[110,304,"#ffd43b"],[230,292,"#ff8fab"],[360,308,"#b197fc"],[490,294,"#74c0fc"],[620,306,"#ff8fab"],[750,296,"#ffd43b"]].map(([e,t,n])=>wo(+e,+t,String(n),.9)).join("")}
</svg>`,Sc=`<svg viewBox="0 0 200 170"><ellipse class="parkLawn" cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${Z()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${Z(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${Z(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${Z(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${Z(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${Z(2.5)}/>
  ${Xd(40,66,1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${Z(3)}/><path d="M178 88 V132" ${Z(4)}/>
</svg>`,Bc=`<svg viewBox="0 0 220 180"><ellipse class="ranchGrass" cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${Z()}/>
  ${or.map((e,t)=>`<path d="M${20+t*7} 120 A${90-t*7} ${84-t*7} 0 0 1 ${200-t*7} 120" fill="none" stroke="${e}" stroke-width="7"/>`).join("")}
  <path d="M60 140 V82 L80 58 H140 L160 82 V140 Z" fill="#ef5b5b" ${Z(4)}/>
  <path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${Bo}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  ${or.map((e,t)=>`<path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${e}" stroke-width="1.3" transform="translate(0 ${-3+t*1.2})"/>`).join("")}
  <rect x="88" y="100" width="44" height="40" rx="3" fill="#d94848" ${Z(3)}/><path d="M88 100 L132 140 M132 100 L88 140" stroke="#fff6e6" stroke-width="3"/>
  <rect x="94" y="70" width="32" height="18" rx="4" fill="#fff6e6" ${Z(3)}/>
  <path d="M10 150 H52 M168 150 H212 M14 140 V158 M30 140 V158 M46 140 V158 M174 140 V158 M190 140 V158 M206 140 V158" stroke="#fff6e6" stroke-width="5" stroke-linecap="round"/><path d="M10 150 H52 M168 150 H212" ${Z(1.5)}/>
  <g transform="translate(178 122) scale(.42)"><ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" ${Z(5)}/><path d="M24 -8 L40 -34 L54 -26 L36 2 Z" fill="#fff" ${Z(5)}/>${or.slice(0,4).map((e,t)=>`<path d="M38 ${-34+t*5} q-14 4 -20 14" fill="none" stroke="${e}" stroke-width="5" stroke-linecap="round"/>`).join("")}<path d="M-20 14 V34 M20 14 V34" ${Z(6)}/></g>
</svg>`,Hc=`<svg viewBox="0 0 190 156">
  <ellipse cx="95" cy="118" rx="88" ry="32" fill="#ffd0e6" ${Z()}/>
  <path d="M28 108 V62 L95 28 L162 62 V108 Z" fill="#fff0f6" ${Z(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="#ff6b9a" ${Z(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="none" stroke="#ffd43b" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="78" y="78" width="34" height="30" rx="4" fill="#ff8ec8" ${Z(3)}/>
  <path d="M95 86 C90 80 82 82 86 90 C90 96 95 100 95 100 C95 100 100 96 104 90 C108 82 100 80 95 86 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  <rect x="42" y="74" width="22" height="16" rx="3" fill="#66d9e8" ${Z(2)}/><rect x="126" y="74" width="22" height="16" rx="3" fill="#d0bfff" ${Z(2)}/>
  ${[36,52,68,84,100,116,132,148].map((e,t)=>`<circle class="clubBulb" cx="${e}" cy="58" r="3.2" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" ${Z(1.4)}/>`).join("")}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`,kl=`<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${Z(3)}/><path d="M17 8 V35 M31 13 V40" ${Z(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${Z(2)}/></svg>`,bl=e=>e.indexOf("data-chibi")>=0?e.replace('viewBox="0 0 200 320"','viewBox="24 0 152 168"'):e.replace('viewBox="0 0 100 160"','viewBox="14 2 72 74"'),Nh={},St=e=>(Nh?.VITE_STORE_PREFIX??"")+e,Fh=400,$a=["#ffe0c4","#f6d2b5","#f1c27d","#e0ac69","#c9956c","#c68642","#a86b3c","#8d5524","#5c3a1e","#3d2914"],xa=["#2b1d16","#5b3a29","#a0522d","#f4d58d","#ff8fab","#8ecae6","#b388d6","#ff9f43","#1d1416","#c8602a","#7a4b32","#f7f1e8"],vl=["#5a321c","#3f9b52","#3d7ec4","#c48a3a","#7b4fb8"],gt=["#ff7aa8","#ffd166","#5aa9e6","#80ed99","#c9a0dc","#ff9f68","#ffffff","#5a3d5c","#ff8f7a","#7ec8c3","#f7f3ee","#f4a3c8","#6b8e4e","#e8d5b5","#ef6b6b","#3d4a6b"],_a=["short","bob","buns","topbun","pixie","long","wavy","puffs","afro","curlybob","coily","boxbraids","braids","sidebraid","crown","pony","sidepony","pigtails","lowbun","locs","halfup","bangs","sidebangs","wavybob"],Ma=["classic","stripes","hoodie","sweater","tank","puff","ruffle","button","jersey","cardigan","bib","raincoat"],La=["pants","jeans","shorts","skirt","tutu","leggings","overalls","joggers"],Ca=["","twirl","sundress","party","pinafore","jumper","ballet","nightgown","raindress"],Sa=["classic","sneakers","lightup","boots","rainboots","sandals","maryjanes","slippers"],Ba=["round","big","sleepy","sparkle","soft","bright"],Ws=["glasses","square","sunnies","bow","bigbow","headband","flower","cap","beanie","sunhat","catears","earmuffs"],jh=new Set(_a),Vh=new Set(Ma),Gh=new Set(La),Yh=new Set(Ca),Kh=new Set(Sa),Xh=new Set(Ba),Jh=new Set(Ws),e0=new Set(["short","pixie","coily","afro","bangs"]),t0=new Set(["buns","puffs"]),n0=new Set(["topbun","lowbun"]),s0={hair:"buns",hairC:"#5b3a29",skin:"#f1c27d",eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"pants",bottomC:"#5aa9e6",dress:"",dressC:"#ff7aa8",shoes:"classic",shoesC:"#5a3d5c",accC:"#ffd166"};function o0(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function xs(e,t){return typeof e=="string"&&t.has(e)}function en(e,t){if(typeof e!="string")return null;const n=e.trim().toLowerCase();for(let s=0;s<t.length;s++)if(t[s]===n)return t[s];return null}function Oo(e){if(!o0(e))return null;let t=0;try{t=JSON.stringify(e).length}catch{return null}if(t>Fh)return null;const n={v:1};xs(e.hair,jh)&&(n.hair=e.hair);const s=en(e.hairC,xa);s&&(n.hairC=s);const o=en(e.skin,$a);o&&(n.skin=o),xs(e.eyes,Xh)&&(n.eyes=e.eyes);const i=en(e.eyeC,vl);i&&(n.eyeC=i),(e.freckles===!0||e.freckles===!1)&&(n.freckles=e.freckles),(e.blush===!0||e.blush===!1)&&(n.blush=e.blush),xs(e.top,Vh)&&(n.top=e.top);const a=en(e.topC,gt);a&&(n.topC=a),xs(e.bottom,Gh)&&(n.bottom=e.bottom);const r=en(e.bottomC,gt);r&&(n.bottomC=r),xs(e.dress,Yh)&&(n.dress=e.dress);const l=en(e.dressC,gt);l&&(n.dressC=l),xs(e.shoes,Kh)&&(n.shoes=e.shoes);const c=en(e.shoesC,gt);if(c&&(n.shoesC=c),Array.isArray(e.acc)){const f=[];for(let g=0;g<e.acc.length&&f.length<2;g++){const h=e.acc[g];typeof h=="string"&&Jh.has(h)&&f.indexOf(h)<0&&f.push(h)}n.acc=f}const d=en(e.accC,gt);return d&&(n.accC=d),n}function Ns(e){const t=s0,n=e??{};return{v:1,hair:n.hair??t.hair,hairC:n.hairC??t.hairC,skin:n.skin??t.skin,eyes:n.eyes??t.eyes,eyeC:n.eyeC??t.eyeC,freckles:n.freckles??t.freckles,blush:n.blush??t.blush,top:n.top??t.top,topC:n.topC??t.topC,bottom:n.bottom??t.bottom,bottomC:n.bottomC??t.bottomC,dress:n.dress??t.dress,dressC:n.dressC??t.dressC,shoes:n.shoes??t.shoes,shoesC:n.shoesC??t.shoesC,acc:n.acc?n.acc.slice():[],accC:n.accC??t.accC}}function Pc(e){const t=/^#([0-9a-f]{6})$/i.exec(e.trim());if(!t){const s=/^#([0-9a-f]{3})$/i.exec(e.trim());return s?[parseInt(s[1][0]+s[1][0],16),parseInt(s[1][1]+s[1][1],16),parseInt(s[1][2]+s[1][2],16)]:null}const n=parseInt(t[1],16);return[n>>16&255,n>>8&255,n&255]}function ai(e,t){const n=en(e,t);if(n)return n;const s=Pc(e);if(!s)return t[0];let o=t[0],i=1e12;for(let a=0;a<t.length;a++){const r=Pc(t[a]);if(!r)continue;const l=(s[0]-r[0])*(s[0]-r[0])+(s[1]-r[1])*(s[1]-r[1])+(s[2]-r[2])*(s[2]-r[2]);l<i&&(i=l,o=t[a])}return o}function i0(e){return e0.has(e)?0:t0.has(e)?2:n0.has(e)?3:1}function a0(e){for(let t=0;t<e.length;t++){const n=e[t];if(n==="glasses"||n==="square"||n==="sunnies")return 2}for(let t=0;t<e.length;t++){const n=e[t];if(n==="cap"||n==="beanie"||n==="sunhat")return 3}for(let t=0;t<e.length;t++){const n=e[t];if(n==="bow"||n==="bigbow")return 1}return 0}function Ha(e){const t=Ns(e),n=t.dress!=="";return{skin:t.skin,hair:t.hairC,hairStyle:i0(t.hair),shirt:n?t.dressC:t.topC,pants:n?t.dressC:t.bottomC,acc:a0(t.acc)}}const r0=["short","bob","buns","topbun"];function Di(e){const t=typeof e.hairStyle=="number"&&e.hairStyle>=0&&e.hairStyle<=3?Math.round(e.hairStyle):0,n=e.acc===1?["bow"]:e.acc===2?["glasses"]:e.acc===3?["cap"]:[],s=ai(String(e.shirt??""),gt);return{v:1,hair:r0[t],hairC:ai(String(e.hair??""),xa),skin:ai(String(e.skin??""),$a),eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:s,bottom:"pants",bottomC:ai(String(e.pants??""),gt),dress:"",dressC:s,shoes:"classic",shoesC:"#5a3d5c",acc:n,accC:"#ffd166"}}function Ho(e){const t=Oo(e)??{},n=Ns(t);return{...Ha(n),look2:n}}const l0=new Set(["glasses","square","sunnies"]),c0=new Set(["bow","bigbow","flower","headband"]),d0=new Set(["cap","beanie","sunhat","catears","earmuffs"]);function qi(e){return l0.has(e)?"face":c0.has(e)?"bow":d0.has(e)?"hat":"other"}function We(e,t){return t[Math.floor(e()*t.length)]}function Pa(e=Math.random){const t=e()<.38,n=e();let s=[];if(n<.22)s=[];else if(n<.68)s=[We(e,Ws)];else{const o=We(e,Ws),i=Ws.filter(a=>qi(a)!==qi(o));s=[o,We(e,i)]}return{v:1,hair:We(e,_a),hairC:We(e,xa),skin:We(e,$a),eyes:We(e,Ba),eyeC:We(e,vl),freckles:e()<.4,blush:e()<.85,top:We(e,Ma),topC:We(e,gt),bottom:We(e,La),bottomC:We(e,gt),dress:t?We(e,Ca.filter(o=>o!=="")):"",dressC:We(e,gt),shoes:We(e,Sa),shoesC:We(e,gt),acc:s,accC:We(e,gt)}}function f0(e,t=Math.random){const n=e.characters[0];if(!n)return e;const s=Pa(t),o=Ha(s),i=e.characters.slice();return i[0]={...n,...o,look2:s},{...e,characters:i}}function g0(e){return[e.skin,e.hair,e.hairStyle,e.shirt,e.pants,e.acc,e.look2?JSON.stringify(e.look2):""].join("|")}const No=3600,ls=470,dn=590,ts=["goat","sheep","piglet","chicks","bunny","cow"],h0=[1085,1215,1345,1470,1600,1735],p0=520,wl=1900,$l=[600,800,1e3,1200,1400,1600],Lr=435,u0=["Chestnut","Snowy","Midnight","Sunny","Rainbow"],Jd=[2470,2600,2730,2860,2990],cs=540,m0=["pet","carrot","apple","hay"],Cr=6,y0=e=>3175+e*68,k0=8e4,Sr=20,b0=1500,ef=["egg","carrot","flower"],v0={egg:"ranch-egg",carrot:"ranch-carrot",flower:"ranch-bouquet"},w0=()=>({egg:0,carrot:0,flower:0}),$0=(e,t,n)=>Number.isInteger(e)&&e>=t&&e<=n?e:null;function xl(e){const t=w0();if(!e||typeof e!="object")return t;for(const n of ef)t[n]=$0(e[n],0,Sr)??0;return t}function _l(e){const t=Array(Cr).fill(null);if(Array.isArray(e))for(let n=0;n<Cr;n++){const s=e[n];if(!s||s.seed!=="carrot"&&s.seed!=="flower")continue;const o=Number(s.at),i=Number(s.wet);Number.isFinite(o)&&Number.isFinite(i)&&(t[n]={seed:s.seed,at:o,wet:i})}return t}function Ta(e,t){if(!e||!e.wet)return 0;const n=(t-e.wet)/k0;return n>=1?3:n>=.4?2:1}function Br(e,t,n,s,o=0){const i=e.slice(),a={...t};switch(n.op){case"plant":return i[n.i]?"taken":(i[n.i]={seed:n.seed,at:s,wet:0},{plots:i,basket:a,garden:!0});case"water":{const r=i[n.i];return r?r.wet?"wet":(i[n.i]={...r,wet:s},{plots:i,basket:a,garden:!0}):"empty"}case"pick":{const r=i[n.i];return r?Ta(r,s)<3?"notReady":a[r.seed]>=Sr?"full":(a[r.seed]++,i[n.i]=null,{plots:i,basket:a,garden:!0,got:r.seed}):"empty"}case"egg":return s-o<b0?"slow":a.egg>=Sr?"full":(a.egg++,{plots:i,basket:a,garden:!1,got:"egg"});case"use":return a.carrot<=0?"none":(a.carrot--,{plots:i,basket:a,garden:!1});case"take":return a[n.kind]<=0?"none":(a[n.kind]--,{plots:i,basket:a,garden:!1})}}const $n=80,x0=30*24*60*60*1e3,_0=5,tf=6,pn=["#ffd6e8","#fff3b0","#d8f5e8","#e6d6ff","#d6efff"],M0=/^m[A-Za-z0-9]{4,40}$/,L0=/^[A-Za-z0-9:_\/.-]{1,80}$/;function ar(e,t=Date.now()){const n=Math.floor((t-e)/864e5);return n<=0?"today":n===1?"yesterday":n<7?"a few days ago":"a while ago"}function C0(e,t=Date.now()){const n=e?.letters;if(!Array.isArray(n))return null;const s=[];for(const i of n.slice(-30*2)){if(!i||typeof i!="object")continue;const a=i;if(typeof a.id!="string"||!M0.test(a.id)||typeof a.from!="string")continue;const r=a.from.normalize("NFC").replace(/\s+/g," ").trim();if(!r||r.length>24||typeof a.fromPid!="string"||!L0.test(a.fromPid)||typeof a.text!="string"||a.text.length>$n||typeof a.at!="number"||!Number.isFinite(a.at)||t-a.at>x0||a.at>t+864e5||!Number.isInteger(a.color)||a.color<0||a.color>=_0||!Number.isInteger(a.sticker)||a.sticker<0||a.sticker>=tf)continue;const l=a.text.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(l.length>$n)continue;const c={id:a.id,from:r,fromPid:a.fromPid,text:l,color:a.color,sticker:a.sticker,at:a.at};a.read===!0&&(c.read=!0),s.push(c)}const o=s.slice(-30);return o.length?{letters:o}:null}function Ml(e){return e?.letters.filter(t=>!t.read&&t.text).length??0}const S0=/^[A-Za-z0-9:_\/.-]{1,80}$/,nf=/crib|bassinet|high-?chair|cat-bed|pet-bed|dog-bed|kennel|tulip|flower|toadstool|mobile/,rr={bed:{head:{x:.24,y:.42},pillow:{x:.1,y:.27,w:.22,h:.18},mattress:{x:.36,y:.34,w:.36,h:.16},clip:"starter"},"wooden-bed":{head:{x:.22,y:.53},pillow:{x:.12,y:.36,w:.24,h:.18},mattress:{x:.38,y:.46,w:.32,h:.16},clip:"wooden"},"checker-bed":{head:{x:.16,y:.45},pillow:{x:.08,y:.26,w:.22,h:.22},mattress:{x:.38,y:.4,w:.32,h:.16},clip:"checker"},"bunk-bed":{head:{x:.11,y:.62},pillow:{x:.05,y:.52,w:.18,h:.14},mattress:{x:.22,y:.56,w:.36,h:.14},clip:"bunk"},"canopy-bed":{head:{x:.38,y:.52},pillow:{x:.28,y:.46,w:.24,h:.14},mattress:{x:.48,y:.48,w:.28,h:.16},clip:"canopy"},"cc-heart-bed":{head:{x:.22,y:.67},pillow:{x:.12,y:.58,w:.26,h:.16},mattress:{x:.36,y:.64,w:.36,h:.16},clip:"heart"},"cc-canopy-daybed":{head:{x:.37,y:.58},pillow:{x:.26,y:.5,w:.26,h:.16},mattress:{x:.48,y:.54,w:.3,h:.16},clip:"daybed"}},B0=["bed","pack:wooden-bed","pack:checker-bed","pack:bunk-bed","pack:canopy-bed","pack:cc-heart-bed","pack:cc-canopy-daybed"];function sf(e){return e==="bed"||/bunk/.test(e)||/daybed/.test(e)?!0:/(^|[-_:])bed$/.test(e)}function H0(){return B0.slice()}function Wa(e){const t=String(e||"").toLowerCase();if(!t||nf.test(t)||!sf(t))return null;const n=t.replace(/^pack:/,"");return rr[n]||rr[t]||rr.bed}const P0={head:{x:55.0733,y:59.7445},chest:{x:60,y:114},hip:{x:60,y:138},classic:{x:60,y:52.8}},Tc=48,Wc=138.24;function T0(e,t){const n=-90*Math.PI/180,s=Math.cos(n),o=Math.sin(n),i=e-Tc,a=t-Wc,r=Tc+s*i-o*a,l=Wc+o*i+s*a;return{x:r-60,y:l-192}}function Zi(e,t){const n=P0[e],s=T0(n.x,n.y);return{x:t?-s.x:s.x,y:s.y}}function W0(e,t,n,s,o){const i=Wa(e);if(!i||t<1||n<1)return null;const a=Zi("head",!1),r=(i.head.x-.5)*t-a.x,l=(i.head.y-1)*n-a.y,c=Zi(s,o);return{x:.5+((o?-r:r)+c.x)/t,y:1+(l+c.y)/n}}function Fo(e){const t=String(e||"").toLowerCase();return!t||nf.test(t)?null:sf(t)?{pose:"lie",spots:[{dx:0,dy:0}]}:/sofa|couch|loveseat/.test(t)?{pose:"sit",spots:[{dx:-.18,dy:-.33},{dx:.18,dy:-.33}]}:/armchair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.32}]}:/bench/.test(t)?{pose:"sit",spots:[{dx:-.22,dy:-.3},{dx:.22,dy:-.3}]}:/stool|rocker/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.38}]}:/chair/.test(t)?{pose:"sit",spots:[{dx:0,dy:-.48}]}:null}function of(e){const t=Fo(e.kind);if(!t)return[];const n=e.scale||1,s=t.pose==="lie"?Wa(e.kind):null;if(s){const o=e.w*n,i=e.h*n,a=Zi("head",!1),r=(s.head.x-.5)*o-a.x,l=(s.head.y-1)*i-a.y;return[{x:e.x+(e.flip?-r:r),y:e.footY+l,pose:"lie",n:0}]}return t.spots.map((o,i)=>{const a=o.dx*e.w*n,r=o.dy*e.h*n,l=i===1?1:0;return{x:e.x+(e.flip?-a:a),y:e.footY+r,pose:t.pose,n:l}})}function Ii(e){const t=(r,l)=>({x:r,y:l,seat:null,toast:null,moved:!0});if(e.mode!=="play")return t(e.releaseX,e.releaseY);const n=e.piece;if(!n)return e.via==="drag"?t(e.releaseX,e.releaseY):{x:e.releaseX,y:e.releaseY,seat:null,toast:null,moved:!1};if(e.via==="tap"&&e.alreadyOn===n.id)return t(n.x,n.footY);const s=new Set(e.occupied.filter(r=>r.item===n.id).map(r=>r.n)),o=of(n).filter(r=>!s.has(r.n));if(!o.length)return e.via==="tap"?{x:e.releaseX,y:e.releaseY,seat:null,toast:"Someone is already there!",moved:!1}:t(e.releaseX,e.releaseY);let i=o[0],a=1/0;for(const r of o){const l=(r.x-e.releaseX)**2+(r.y-e.releaseY)**2;l<a&&(i=r,a=l)}return{x:i.x,y:i.y,seat:{item:n.id,pose:i.pose,n:i.n},toast:null,moved:!0}}const R0={sofa:260,armchair:150,bed:300,chair:100,stool:90,rocker:190,"yard-bench":140,"bar-stool":52.8,"bunk-bed":294,"canopy-bed":294,"cc-bubble-chair":142,"cc-canopy-daybed":276,"cc-dryer-chair":164,"cc-heart-bed":236,"cc-mani-chair":188,"cc-mushroom-stool":112,"cc-scallop-loveseat":248,"checker-bed":196,"cloud-sofa":212,"comfy-armchair":161.7,"cream-sofa":234.6,"egg-chair":126,"fancy-sofa":234.6,"gaming-chair":101.4,"lattice-bench":147,"puffy-stool":46.9,"rocking-chair":137.2,"salon-chair":111.8,"swivel-stool":46.2,"waiting-bench":166.6,"wash-chair":186.2,"wood-armchair":127.4,"wood-stool":46.2,"wooden-bed":235.2};function Hr(e){const t=String(e||"").toLowerCase().replace(/^pack:/,"");return R0[t]??320}const E0=540;function af(e,t,n,s=2400){const o=Math.max(0,t)/2+70,i=40;let a=n<e-8?-1:1,r=e+a*o;return(r<i||r>s-i)&&(a=-a,r=e+a*o),r<i&&(r=i),r>s-i&&(r=s-i),{x:r,y:E0}}function rf(e){if(!e||typeof e!="object")return null;const t=e;return typeof t.item!="string"||!S0.test(t.item)||t.pose!=="sit"&&t.pose!=="lie"||t.n!==0&&t.n!==1?null:{item:t.item,pose:t.pose,n:t.n}}function Pr(e,t){if(!e)return null;const n=rf(e);return!n||!t?.some(s=>s&&s.id===n.item)?null:n}const Po=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],lf=["living","bedroom","kitchen","salon","nursery","bathroom","backyard"],xn=2400,$o=600,cf=1e3,Fs=(xn-cf)/2,rs=[.75,.875,1,1.25,1.5];function ds(e){if(typeof e!="number"||!Number.isFinite(e))return 1;let t=1,n=1/0;for(const s of rs){const o=Math.abs(e-s);o<n&&(n=o,t=s)}return t}function et(e){return(e?.scale||1)*ds(e?.size)}function df(e,t){const n=ds(t);if(n===1){if(e.size==null)return e;const{size:s,...o}=e;return o}return e.size===n?e:{...e,size:n}}const js=8,Q0=/^[A-Za-z0-9:_\/.-]{1,80}$/;function Ll(e){const t=e?.dogKennel;if(!t||typeof t!="object"||typeof t.item!="string"||!Q0.test(t.item))return null;const n=e.rooms;if(!n)return null;for(const s of Object.values(n))if(s?.items?.some(o=>o&&o.id===t.item&&o.kind==="kennel"))return{item:t.item};return null}function A0(e,t){return Ll({dogKennel:{item:t},rooms:e.rooms})!==null}const z=(e,t,n,s,o=1)=>({id:e+"-"+s,kind:e,x:t+Fs,y:n,flip:!1,z:s,scale:o});function Cn(){return{version:3,houseId:"local",currentRoom:"living",rooms:{living:{wallpaper:"#ffd6e0",floor:"#e8b98a",pattern:1,items:[z("sofa",470,470,1),z("lamp",230,470,2),z("plant",760,480,3),z("rug",480,530,0),z("picture",470,200,4),z("cat",600,520,5),z("window",-350,230,6),z("armchair",-300,480,7),z("bookshelf",1250,470,8),z("tree",1500,480,9),z("clock",1100,170,10)]},bedroom:{wallpaper:"#d9ccff",floor:"#f2d0a4",pattern:2,items:[z("bed",450,480,1),z("window",750,230,2),z("teddy",330,500,3),z("stars",300,180,4),z("tub",1350,480,5),z("lamp",-250,470,6),z("flowers",-150,500,7)]},salon:{wallpaper:"#ffe0f0",floor:"#f6d6ff",pattern:2,items:[z("rug",470,540,0),z("mirror",470,150,1),z("vanity",470,480,2),z("perfume",400,345,3),z("polish",450,345,4),z("hairdryer",560,340,5),z("stool",470,545,6),z("lamp",200,470,7),z("flowers",780,480,8),z("picture",780,200,9),z("chair",-250,490,10),z("mirror",-250,170,11),z("plant",1300,480,12)]},kitchen:{wallpaper:"#cdf3dc",floor:"#ffe7a8",pattern:3,items:[z("fridge",200,470,1),z("table",520,500,2),z("cake",520,395,3),z("stove",800,470,4),z("chair",380,500,5),z("chair",660,500,6),z("juice",470,395,7),z("plant",-300,480,8),z("fish",1300,480,9)]},nursery:{wallpaper:"#d6f3ff",floor:"#f3ddc4",pattern:1,items:[z("cloud-rug",480,545,0),z("crib",470,480,1),z("crib-mobile",470,155,2),z("rocker",780,490,3)]},bathroom:{wallpaper:"#d4f4fb",floor:"#f7e7d4",pattern:3,items:[z("bath-mat",180,560,0),z("shower-curtain",-40,520,1),z("soaking-tub",160,500,2),z("rubber-ducky",300,545,3),z("bath-toilet",480,500,4),z("sink-vanity",700,500,5),z("bath-mirror",700,175,6),z("towel-bar",940,200,7)]},backyard:{wallpaper:"#c5ecff",floor:"#b6e3a8",pattern:0,items:[{id:"yard-bench-1",kind:"yard-bench",x:1122,y:372,flip:!1,z:1,scale:1},{id:"tulip-bed-2",kind:"tulip-bed",x:946,y:580,flip:!1,z:2,scale:1}]}},characters:[En({id:"c1",skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6",room:"living",x:330+Fs,y:540})],soundOn:!0,dogKennel:null}}function En(e){return{skin:"#f1c27d",hair:"#5b3a29",hairStyle:0,shirt:"#ff7aa8",pants:"#5aa9e6",size:"kid",acc:0,room:"living",x:xn/2,y:540,flip:!1,held:{left:null,right:null},...e}}const Vn=(e,t,n)=>Math.max(t,Math.min(n,e)),Xs=e=>e.items.reduce((t,n)=>Math.max(t,n.z),0),U0=e=>e.items.reduce((t,n)=>Math.min(t,n.z),0);function ri(e,t,n){return{...e,characters:e.characters.map(s=>s.id===t?n(s):s)}}function To(e){if(!e.seat)return e;const{seat:t,...n}=e;return n}let Oi=null;function ff(){const e=Oi;return Oi=null,e}function li(e,t,n){n&&(Oi={id:t,x:n.x,kind:n.kind,scale:et(n)});let s=!1;const o=e.characters.map(i=>{if(i.seat?.item!==t)return i;if(s=!0,!n)return To(i);const a=af(n.x,Hr(n.kind)*et(n),i.x),{seat:r,...l}=i;return{...l,x:a.x,y:a.y}});return s?{...e,characters:o}:e}function z0(e,t,n,s){if(!s){const i=Pr(e.seat,t);return i?e.seat===i?e:{...e,seat:i}:To(e)}const o=Pr(n,t);return o?{...e,seat:o}:To(e)}function Ie(e,t,n){const s=e.rooms[t];if(!s)return e;const o=n(s);return o===s?e:{...e,rooms:{...e.rooms,[t]:o}}}function D0(e){const t=new Set;let n=!1;const s=e.map(o=>{if(!t.has(o.id))return t.add(o.id),o;n=!0;const i=String(o.id).replace(/-d\d+$/,"").replace(/[^A-Za-z0-9:_/.-]/g,"").slice(0,72)||"item";let a=2,r=(i+"-d"+a).slice(0,80);for(;t.has(r);)a+=1,r=(i+"-d"+a).slice(0,80);return t.add(r),{...o,id:r}});return n?s:e}function q0(e){let t=!1;const n={...e.rooms};for(const s of Po){const o=e.rooms[s];if(!o||!Array.isArray(o.items))continue;const i=D0(o.items);i!==o.items&&(n[s]={...o,items:i},t=!0)}return t?{...e,rooms:n}:e}function gf(e){if(!e||!e.rooms)return e;const t=Cn().rooms,n=e.rooms;let s=!1;for(const i of Po){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(s=!0)}const o=s?(()=>{const i={...n};for(const a of Po){const r=n[a];(!r||typeof r!="object"||!Array.isArray(r.items))&&(i[a]=t[a])}return{...e,rooms:i}})():e;return q0(o)}function Ni(e,t){switch(Oi=null,t.type){case"room/switch":return e.rooms[t.room]?{...e,currentRoom:t.room}:e;case"item/add":return Ie(e,t.room,n=>n.items.length>=80||n.items.some(s=>s.id===t.item.id)?n:{...n,items:[...n.items,{...t.item,z:Xs(n)+1}]});case"item/move":{const n=e.rooms[t.room]?.items.find(o=>o.id===t.id)??null,s=Ie(e,t.room,o=>({...o,items:o.items.map(i=>i.id===t.id?{...i,x:Vn(t.x,0,xn),y:Vn(t.y,40,$o)}:i)}));return t.stand?li(s,t.id,n):s}case"item/flip":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return li(Ie(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?{...o,flip:!o.flip}:o)})),t.id,n)}case"item/size":{const n=e.rooms[t.room]?.items.find(s=>s.id===t.id)??null;return!n||ds(n.size)===ds(t.size)?e:Ie(e,t.room,s=>({...s,items:s.items.map(o=>o.id===t.id?df(o,t.size):o)}))}case"item/front":return Ie(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:Xs(n)+1}:s)}));case"item/back":return Ie(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:U0(n)-1}:s)}));case"item/delete":{const n=e.rooms[t.room]?.items.find(i=>i.id===t.id)??null,s=n?.kind==="kennel",o=li(Ie(e,t.room,i=>({...i,items:i.items.filter(a=>a.id!==t.id)})),t.id,n);return s&&e.dogKennel?.item===t.id?{...o,dogKennel:null}:o}case"room/wallpaper":return Ie(e,t.room,n=>({...n,wallpaper:t.color}));case"room/floor":return Ie(e,t.room,n=>({...n,floor:t.color}));case"room/pattern":return Ie(e,t.room,n=>({...n,pattern:t.pattern,wallTile:null}));case"room/wallTile":return Ie(e,t.room,n=>({...n,wallTile:t.tile}));case"room/floorTile":return Ie(e,t.room,n=>({...n,floorTile:t.tile}));case"char/add":return e.characters.length>=js||e.characters.some(n=>n.id===t.char.id)?e:{...e,characters:[...e.characters,t.char]};case"char/update":return ri(e,t.id,n=>{const{look2:s,...o}=t.patch,i={...n,...o};return"look2"in t.patch&&(s?i.look2=s:delete i.look2),i});case"char/move":return e.rooms[t.room]?ri(e,t.id,n=>{const s={...n,room:t.room,x:Vn(t.x,0,xn),y:Vn(t.y,60,$o)};return z0(s,e.rooms[t.room].items,t.seat,"seat"in t)}):e;case"char/delete":{const n=e.characters.find(o=>o.id===t.id);if(!n)return e;let s={...e,characters:e.characters.filter(o=>o.id!==t.id)};return["left","right"].forEach((o,i)=>{const a=n.held[o];a&&(s=Ie(s,n.room,r=>({...r,items:[...r.items,{...a,x:n.x+(i?40:-40),y:n.y,z:Xs(r)+1}]})))}),s}case"char/hold":{const n=e.characters.find(a=>a.id===t.id),s=e.rooms[t.room]?.items.find(a=>a.id===t.itemId);if(!n||!s||n.held[t.hand]||n.room!==t.room)return e;const o=li(Ie(e,t.room,a=>({...a,items:a.items.filter(r=>r.id!==t.itemId)})),t.itemId,s),i=ri(o,t.id,a=>({...a,held:{...a.held,[t.hand]:s}}));return s.kind==="kennel"&&e.dogKennel?.item===t.itemId?{...i,dogKennel:null}:i}case"char/release":{const n=e.characters.find(i=>i.id===t.id),s=n?.held[t.hand];if(!n||!s)return e;const o=ri(e,t.id,i=>({...i,held:{...i.held,[t.hand]:null}}));return Ie(o,n.room,i=>({...i,items:[...i.items,{...s,x:Vn(t.x,0,xn),y:Vn(t.y,40,$o),z:Xs(i)+1}]}))}case"cat/set":return{...e,cat:t.cat};case"cat/move":return e.cat&&e.rooms[t.room]?{...e,cat:{...e.cat,room:t.room,x:Vn(t.x,100,xn-100)}}:e;case"dog/set":return{...e,dog:t.dog};case"dog/kennel":return t.item===null?e.dogKennel?{...e,dogKennel:null}:e:!A0(e,t.item)||e.dogKennel?.item===t.item?e:{...e,dogKennel:{item:t.item}};case"ranch/op":{const n=t.op;if(n.op==="take"){const i=e.rooms[n.room];if(i&&i.items.some(a=>a.id===n.id))return e}const s=Br(_l(e.garden),xl(e.basket),t.op,t.now,e.lastEgg??0);if(typeof s=="string")return e;let o={...e,garden:s.plots,basket:s.basket,lastEgg:t.op.op==="egg"?t.now:e.lastEgg};if(t.op.op==="take"&&o.rooms[t.op.room]){const i=t.op;o=Ie(o,i.room,a=>a.items.length>=80?a:{...a,items:[...a.items,{id:i.id,kind:v0[i.kind],x:i.x,y:560,flip:!1,z:Xs(a)+1,scale:1}]})}return o}case"settings/sound":return{...e,soundOn:t.on};case"game/reset":return Cn()}}const Rc=St("cozy-house"),Z0=St("cozy-house-v1");function Cl(e){if(!e||typeof e!="object"||!e.rooms)return Cn();let t=e;if(t.version===1){const d=g=>(Number(g)||0)+Fs,f={};for(const[g,h]of Object.entries(t.rooms))f[g]={...h,items:(h.items??[]).map(u=>({...u,x:d(u.x)}))};t={...t,version:2,rooms:f,character:{...t.character,x:d(t.character?.x)}}}if(t.version===2){const d=t.character??{};t={...t,version:3,characters:[En({...d,id:"c1",size:"kid",acc:0,held:{left:null,right:null}})]},delete t.character}if(t.version!==3)return Cn();const n=Cn(),s=(Array.isArray(t.characters)?t.characters:[]).slice(0,js).map((d,f)=>{const g=d?.look2,h=En({...d,id:String(d.id??"c"+(f+1)),held:{left:d.held?.left??null,right:d.held?.right??null}});if(delete h.look2,g!=null){const u=Oo(g);u&&(h.look2=u)}return h}),o=gf({...n,...t,rooms:{...n.rooms,...t.rooms},characters:s}),i=Ec(o),a=Ll(i),r=a===o.dogKennel?o:{...o,dogKennel:a},l=C0(r.mailbox);let c=i===o?r:{...r,characters:i.characters};if(l)c={...c,mailbox:l};else if(c.mailbox){const{mailbox:d,...f}=c;c=f}return Ec(I0(c))}function Ec(e){let t=!1;const n=e.characters.map(s=>{const o=Pr(rf(s.seat),e.rooms[s.room]?.items);return o?s.seat?.item===o.item&&s.seat.pose===o.pose&&s.seat.n===o.n?s:{...s,seat:o}:s.seat?(t=!0,To(s)):s});return!t&&n.every((s,o)=>s===e.characters[o])?e:{...e,characters:n}}function I0(e){const t=e.currentRoom,n=lf.includes(t),s=a=>Po.includes(a);let o=!1;const i=e.characters.map(a=>{const r=a.room;return!s(r)||!n&&r===t?(o=!0,{...a,room:"living"}):a});return n&&!o?e:{...e,currentRoom:n?e.currentRoom:"living",characters:i}}function hf(){let e;try{const s=localStorage.getItem(Rc)??localStorage.getItem(Z0);e=s?Cl(JSON.parse(s)):Cn(),!s&&typeof navigator<"u"&&!navigator.webdriver&&(e=f0(e))}catch{e=Cn()}const t=[];let n;return{get:()=>e,subscribe(s){t.push(s)},dispatch(s){e=Ni(e,s),t.forEach(o=>o(e,s)),clearTimeout(n),n=window.setTimeout(()=>{try{localStorage.setItem(Rc,JSON.stringify(e))}catch{}},250)}}}const O0=Object.freeze(Object.defineProperty({__proto__:null,ITEM_SIZE_STEPS:rs,MAX_CHARS:js,ROOM_H:$o,ROOM_IDS:Po,ROOM_W:xn,SCENE_ROOMS:lf,V1_OFFSET:Fs,V1_ROOM_W:cf,applyItemSize:df,createStore:hf,drawnScale:et,ensureRooms:gf,initialState:Cn,itemSizeOf:ds,migrate:Cl,newCharacter:En,reduce:Ni,standChar:To,takeClearedFurniture:ff,validKennel:Ll},Symbol.toStringTag,{value:"Module"}));function Tr(e,t){for(let n=e.length-1;n>0;n--){const s=Math.floor(t()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}const pf=4,Qc=7,N0=30;function F0(){const e=[];let t=0;for(let n=0;n<pf;n++){e.push({id:t++,c:n,v:0});for(let s=1;s<=9;s++)for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s});for(const s of["skip","rev","d2"])for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s})}for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"wild"});for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"w4"});return e}const Wr=e=>e.discard[e.discard.length-1],Js=(e,t)=>t.c===4||t.c===e.color||t.v===Wr(e).v&&Wr(e).c!==4,un=(e,t,n=1)=>{const s=e.hands.length;return((t+e.dir*n)%s+s)%s};function Rr(e,t,n,s){const o=[];for(let i=0;i<n&&e.hands[t].length<N0;i++){if(!e.deck.length){const r=e.discard.pop();if(e.deck=Tr(e.discard.map(l=>l),s),e.discard=[r],!e.deck.length)break}const a=e.deck.pop();e.hands[t].push(a),o.push(a)}return e.hands[t].length>1&&(e.slay[t]=!1),o}function j0(e,t){if(e.owe!==null&&e.hands[e.owe]?.length===1&&!e.slay[e.owe]){const n=e.owe;return e.owe=null,{victim:n,vdrew:Rr(e,n,2,t).length}}return e.owe=null,{}}const Ac=e=>{const t=[0,0,0,0];return e.forEach(n=>{n.c<4&&t[n.c]++}),t.indexOf(Math.max(...t))},V0={id:"slay",name:"Slay",minPlayers:2,maxPlayers:6,setup(e,t){const n=Tr(F0(),t),s=Array.from({length:e},()=>n.splice(-Qc,Qc));let o=n.length-1;for(;typeof n[o].v!="number";)o--;const i=n.splice(o,1)[0];return{deck:n,discard:[i],hands:s,color:i.c,turn:Math.floor(t()*e),dir:1,drawn:null,slay:s.map(()=>!1),owe:null,winner:null,ev:{n:0,p:-1,k:"start",card:i}}},cleanMove(e){return!e||typeof e!="object"?null:e.k==="play"&&Number.isInteger(e.id)&&e.id>=0&&e.id<108?{k:"play",id:e.id,...Number.isInteger(e.color)&&e.color>=0&&e.color<pf?{color:e.color}:{}}:e.k==="draw"||e.k==="pass"||e.k==="slay"?{k:e.k}:null},legal(e,t,n){if(e.winner!==null)return!1;if(n.k==="slay")return e.hands[t].length<=2&&!e.slay[t];if(t!==e.turn)return!1;if(n.k==="draw")return e.drawn===null;if(n.k==="pass")return e.drawn!==null;const s=e.hands[t].find(o=>o.id===n.id);return!s||e.drawn!==null&&s.id!==e.drawn||s.c===4&&n.color===void 0?!1:Js(e,s)},apply(e,t,n,s){const o=e.ev.n+1;if(n.k==="slay")return e.slay[t]=!0,e.owe===t&&(e.owe=null),e.ev={n:o,p:t,k:"slay"},e;const i=j0(e,s);if(n.k==="draw"){const d=Rr(e,t,1,s),f=d[0];if(f&&Js(e,f))e.drawn=f.id,e.ev={n:o,p:t,k:"draw",drew:1,...i};else{if(e.drawn=null,e.ev={n:o,p:t,k:"draw",drew:d.length,...i},e.stuck=d.length?0:(e.stuck??0)+1,(e.stuck??0)>=e.hands.length){const g=Math.min(...e.hands.map(h=>h.length));return e.winner=e.hands.findIndex(h=>h.length===g),e.turn=-1,e}e.turn=un(e,t)}return e}if(n.k==="pass")return e.drawn=null,e.turn=un(e,t),e.ev={n:o,p:t,k:"pass",...i},e;e.stuck=0;const a=e.hands[t],r=a.splice(a.findIndex(d=>d.id===n.id),1)[0];e.discard.push(r),e.drawn=null,e.color=r.c===4?n.color:r.c;const l={n:o,p:t,k:"play",card:r,color:e.color,...i};if(!a.length)return e.winner=t,e.turn=-1,e.ev=l,e;a.length===1&&!e.slay[t]&&(e.owe=t);const c=e.hands.length===2;if(r.v==="rev")e.dir=e.dir===1?-1:1,e.turn=c?t:un(e,t);else if(r.v==="skip")l.skipped=un(e,t),e.turn=un(e,t,2);else if(r.v==="d2"||r.v==="w4"){const d=un(e,t);l.skipped=d;const f=r.v==="d2"?2:4;l.drew=Rr(e,d,f,s).length,e.turn=un(e,t,2)}else e.turn=un(e,t);return e.ev=l,e},turn:e=>e.winner!==null?-1:e.turn,winner:e=>e.winner,view(e,t){return{top:Wr(e),color:e.color,turn:e.winner!==null?-1:e.turn,dir:e.dir,deck:e.deck.length,counts:e.hands.map(n=>n.length),slay:e.slay,winner:e.winner,ev:e.ev,...t!==null&&e.hands[t]?{hand:e.hands[t],drawn:t===e.turn?e.drawn:null}:{}}},autoMove(e,t){if(t!==e.turn)return null;if(e.drawn!==null){const s=e.hands[t].find(o=>o.id===e.drawn);return s&&Js(e,s)?{k:"play",id:s.id,...s.c===4?{color:Ac(e.hands[t])}:{}}:{k:"pass"}}const n=e.hands[t].find(s=>Js(e,s)&&s.c!==4)??e.hands[t].find(s=>Js(e,s));return n?{k:"play",id:n.id,...n.c===4?{color:Ac(e.hands[t])}:{}}:{k:"draw"}},removePlayer(e,t,n){if(e.hands.length<=2)return null;const s=e.turn===t;return e.deck.unshift(...e.hands[t]),Tr(e.deck,n),e.hands.splice(t,1),e.slay.splice(t,1),e.owe===t?e.owe=null:e.owe!==null&&e.owe>t&&e.owe--,e.turn>t&&e.turn--,s&&(e.drawn=null,e.dir===-1?e.turn=((t-1)%e.hands.length+e.hands.length)%e.hands.length:e.turn=t%e.hands.length),e.ev={n:e.ev.n+1,p:t,k:"left"},e}},Er=7,Mi=6,G0=(e,t,n)=>{const s=e[t][n];for(const[o,i]of[[1,0],[0,1],[1,1],[1,-1]]){const a=[[t,n]];for(const r of[1,-1])for(let l=1;l<4;l++){const c=t+o*l*r,d=n+i*l*r;if(c<0||c>=Er||d<0||d>=Mi||e[c][d]!==s)break;a.push([c,d])}if(a.length>=4)return a}return null},Y0={id:"four",name:"Four in a Row",minPlayers:2,maxPlayers:2,setup:(e,t)=>({b:Array.from({length:Er},()=>[]),turn:t()<.5?0:1,winner:null,draw:!1,line:null,last:null,n:0}),cleanMove:e=>e&&Number.isInteger(e.col)&&e.col>=0&&e.col<Er?{col:e.col}:null,legal:(e,t,n)=>e.winner===null&&!e.draw&&t===e.turn&&e.b[n.col].length<Mi,apply(e,t,n){e.b[n.col].push(t);const s=e.b[n.col].length-1;e.last={col:n.col,row:s,p:t},e.n++;const o=G0(e.b,n.col,s);return o?(e.winner=t,e.line=o,e.turn=-1):e.b.every(i=>i.length>=Mi)?(e.draw=!0,e.turn=-1):e.turn=1-t,e},turn:e=>e.turn,winner:e=>e.winner,view:e=>e,autoMove:(e,t)=>{if(t!==e.turn)return null;const s=[3,2,4,1,5,0,6].find(o=>e.b[o].length<Mi);return s===void 0?null:{col:s}},removePlayer:()=>null},uf={slay:V0,four:Y0},Ra=2600,Wo=[{game:"slay",seats:6,x:720},{game:"four",seats:2,x:1500},{game:"slay",seats:4,x:2150}],K0=2e4,X0=["A-Frame Swing","Acorn Friend","Alarm Clock","Apple","Apple Tree","Arc Floor Lamp","Arc Lamp","Arched Mirror","Arched Shelf","Armchair","Autumn Wreath","Baby Blocks","Baby Bottle","Bakery Shelf","Ball","Balloons","Bananas","Bar Stool","Bassinet","Bath Mat","Bath Mirror","Bath Stool","Bathtub","Beach Ball","Bean Bag","Bed","Berry Basket","Big Leaf Plant","Big Monitor","Big Wardrobe","Birdbath","Birdhouse","Birdie","Blanket Basket","Blocks","Boba Buddy","Book Stack","Books","Bookshelf","Box Stack","Bread","Brush & Comb","Bubble Aquarium","Bubble Bath","Bubble Chair","Bubble-Gum Rug","Bubbly Fountain","Bubbly Plant","Bud Vase","Bulletin Board","Bunk Bed","Bunny","Bunny Plush","Bunny Slippers","Butterfly Bush","Cactus","Cactus Buddy","Cada's Mouse","Cake","Candle Jar","Canopy Bed","Canopy Daybed","Cat Bed","Cat Tower","Caterpillar Plush","Chair","Changing Table","Checker Rug","Checkered Bed","Chick","Chloe's Star Lamp","Clock","Clothes Rail","Clothesline","Cloud Beanbag","Cloud Lamp","Cloud Rug","Cloud Shelf","Cocoa Doll","Cocoa Mug","Coffee Table","Comfy Chair","Cookie Jar","Cooking Pot","Cottage Heart Pouf","Cottage Heart Rug","Counter","Cozy Fireplace","Cozy Lights","Cozy Mug","Cozy Nightstand","Cozy Reading Nook","Cozy Snake Plant","Cozy Teapot","Cream Jars","Cream Sofa","Crib","Crib Mobile","Cubby Shelf","Cube Shelf","Cupcake","Cupcake Stand","Curtains","Curvy Yellow Desk","Cute Keyboard","Cute Speaker","Daisy Pot","Daisy Rug","Desk","Desk Lamp","Desk Mic","Dino Plushie","Dish Cabinet","Dish Rack","Dog Kennel","Doll House","Donut","Dresser","Droplet Buddy","Egg Pan","Fairy-Light Garland","Fairy-Light Shelf","Fan","Fancy Sofa","Fiddle-Leaf Fig","Fig Tree","Fire Pit","Fireplace","Fish Bowl","Fish Tank","Floor Cushion","Flower Cart","Flower Floor Lamp","Flower Kettle","Flower Lamp","Flowers","Foot Spa","Fresh Egg","Fridge","Frog Plush","Fruit Bowl","Game Controller","Gaming Chair","Garden Bench","Garden Carrot","Garden Gnome","Glass Cabinet","Globe","Globe Pendants","Glossy Hair Dryer","Glow Mirror","Gold Floor Mirror","Guinea Pig","Hair Dryer","Hair-Dryer Chair","Hair-Wash Chair","Hammock","Hamster House","Hamster Pal","Hanging Lamp","Hanging Lantern","Hanging Plant","Hanging Vine Planter","Happy Fridge","Headphones","Heart Headboard Bed","Heart Pouf","Heart Rug","Heart Wall Clock","Heart Wall Light","Heart-Leaf Plant","Hedge Row","Herb Box","High Chair","Honey Doll","Ice Cream","Jewelry Box","Juice","Kettle","Kitchen Counter","Knit Cushion","Ladder Shelf","Lamp","Landscape Art","Lattice Bench","Laundry Hamper","Lava Lamp","Lemon Tree","Lemonade Cart","Lemonade Cup","Lighted Vanity","Lilac Curtain","Lily Pond","Little Rocking Horse","Little Slide","Little Sprout","Lotion Bottles","Macaron Jar","Macrame Swing Chair","Mani-Pedi Chair","Manicure Table","Microwave","Milk","Milk & Cookies","Mini Fridge","Mini Greenhouse","Mini Tree","Mint Fridge","Mint Pebble Rug","Mirror","Mixer","Moon and Stars","Moon Night-Light","Moving Box","Mushroom Stool","Music Box","Nail Dryer","Nail Polish","Nail Polish Rack","Night Light","Nightstand","Nursery Cloud Rug","Nursery Dresser","Nursery Lamp","Pancakes","Pantry","Paper Lantern","Pastel Range","Pastel Wardrobe","Patio Lights","Patio Umbrella","Pendant Lamp","Perfume","Perfume Bottle","Perfume Tray","Pet Bowl","Petal Coffee Table","Phone on a Stand","Piano","Picket Gate","Picnic Basket","Picnic Blanket","Picnic Table","Picture","Piggy Bank","Pillow","Pin Board","Pink Vanity","Pinwheel","Pizza","Plant","Plant Stand","Plant Wall","Play Mat","Play Tent","Polish Bottle","Popcorn","Pothos Plant","Pouf","Puffy Cloud Sofa","Puffy Stool","Puppy","Quinn's Cookie Pup","Radio","Rain Barrel","Rainbow Art","Rainbow Rug","Ranch Flowers","Rattle","Reagan's Frame","Reception Desk","Record Player","Ribbon Mirror","Ribbon Tray","Rice Cooker","Ring Light","Robot","Rocker","Rocking Chair","Rocking Horse","Rose Doll","Round Breakfast Table","Round Side Table","Round Woven Rug","Rubber Ducky","Rug","Runner Rug","Salon Chair","Sandbox","Scallop Curtains","Scalloped Loveseat","Seesaw","Shelf","Shower Curtain","Sink","Sink Vanity","Sloane's Rainbow Snail","Snake Plant","Soaking Tub","Soap Dish","Sofa","Sparkle Wall Light","Spice Rack","Splash Pool","Spray Bottle","Sprinkler","Stacking Rings","Star Dresser","Star Lamp","Star Mobile","Stars","Stepping Stones","Sticker Board","Story Pillow","Stove","String Lights","Striped Runner","Succulents","Sun Lounger","Sunny Art","Sunny Bean Bag","Sunny Cloud Rug","Sunny Shelf","Swing Chair","Swivel Stool","Table","Tassel Rug","Teapot","Teapot Set","Teddy","Tiered Tray","Toadstool Light","Toaster","Toilet","Towel Bar","Towel Cart","Towel Stack","Toy Bin","Toy Car","Toy cat","Toy Chest","Toy Train","Trailing Plant Shelf","Tulip Bed","Tulip Vase","Turtle","TV","TV Stand","Unicorn Plushie","Utensil Rail","Vanity","Vanity Stool","Vegetable Patch","Vlog Camera","Wagon","Waiting Bench","Wall Shelf","Wardrobe","Water-Drop Lamp","Watermelon","Wavy Floor Lamp","Window","Window Seat","Wood Armchair","Wood Bookshelf","Wood Coffee Table","Wood Desk","Wood Dresser","Wood Stool","Wood Wall Clock","Wooden Bed","Yard Sign"],J0=4,Sl=16,Fi=e=>String(e??"").toUpperCase().replace(/[^A-Z0-9]/g,""),ep=e=>e.length>=J0&&e.length<=Sl&&/^[A-Z0-9]+$/.test(e),tp=12,np=["Cada","Chloe","Quinn","Reagan","Sloane"],sp=460,op=320,Uc=["Sunny Bunny","Bubbly Panda","Sparkle Kitty","Happy Hippo","Cozy Koala","Jolly Jelly","Zippy Fox","Dreamy Deer","Giggly Goose","Peachy Pup","Minty Mouse","Rainbow Duck","Cuddly Cub","Starry Owl","Bouncy Frog","Lucky Lamb","Snuggly Seal","Twinkle Tiger","Berry Bear","Cloudy Llama","Pebble Penguin","Honey Hedgehog","Marshmallow Moose","Cupcake Cat"],xo=["Hi!","Come over!","I love your house!","Let's play!","Follow me!","Look at this!","Want a snack?","Nice!","Yes!","No thanks","Hehe","Be right back","Bye!","Let's decorate!","Wanna race?","So cute!"],mf=["👋","😀","😂","😍","😮","😢","🎉","⭐","❤️","👍","🍕","🐱","🌈","🎶","💤","✨"],Bl=60,ip={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t","@":"a",$:"s","!":"i","+":"t"},lr=["fuck","fuk","fck","shit","sht","bitch","btch","bastard","asshole","ass","dick","cock","pussy","cunt","whore","slut","damn","crap","piss","fag","faggot","retard","nigger","nigga","porn","sex","sexy","nude","naked","boob","boobs","penis","vagina","kill","suicide","stupid","idiot","dumb","hate","loser","shutup","wtf","stfu","gtfo","bs"],ap=["zero","oh","one","two","three","four","five","six","seven","eight","nine","ten"],rp=[/\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i,/\bi\s*live\s+(at|on|in)\b/i,/\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,/\b(password|passcode|zip\s*code|postcode)\b/i,/\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i],lp=/(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i,cp=/\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i,dp=/@\w/,fp=/\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;function gp(e,t=Bl){if(typeof e!="string")return{ok:!1,reason:"empty"};const n=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(!n)return{ok:!1,reason:"empty"};if(n.length>t)return{ok:!1,reason:"long"};if(lp.test(n))return{ok:!1,reason:"link"};if(cp.test(n)||dp.test(n))return{ok:!1,reason:"contact"};if((n.match(/\d/g)??[]).length>=5||/\d[\d\s().\-]{4,}\d/.test(n)||fp.test(n))return{ok:!1,reason:"contact"};const o=n.toLowerCase().split(/[^a-z]+/).filter(Boolean);let i=0;for(const c of o)if(i=ap.includes(c)?i+1:0,i>=4)return{ok:!1,reason:"contact"};if(rp.some(c=>c.test(n)))return{ok:!1,reason:"personal"};const a=n.toLowerCase().replace(/[0-9@$!+]/g,c=>ip[c]??c),r=a.split(/[^a-z]+/).filter(Boolean),l=a.replace(/[^a-z]/g,"").replace(/(.)\1{2,}/g,"$1$1");return r.some(c=>lr.includes(c)||lr.includes(c.replace(/(.)\1+/g,"$1")))||lr.filter(c=>c.length>=5).some(c=>l.includes(c))?{ok:!1,reason:"words"}:{ok:!0,text:n}}const hp={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t",8:"b","@":"a",$:"s","!":"i","+":"t",v:"u","|":"k","<":"k","#":"h"};function pp(e){return/^f+u+c+k+$/.test(e)||/^f+u+k+$/.test(e)||/^f+c+k+$/.test(e)||/^s+h+i+t+$/.test(e)||/^s+h+t+$/.test(e)||/^b+i+t+c+h+$/.test(e)||/^b+t+c+h+$/.test(e)||/^a+s+h+o+l+e+$/.test(e)||/^d+u+m+b+a+s+$/.test(e)||/^n+i+g{2,}e+r+$/.test(e)||/^n+i+g{2,}a+$/.test(e)||/^f+a+g+$/.test(e)||/^f+a+g+o+t+$/.test(e)||/^r+e+t+a+r+d+$/.test(e)||/^k+y+s+$/.test(e)}function up(e){return/^c+u+n+t+$/.test(e)||/^a+h+o+l+e+$/.test(e)||/^k+i+k+e+$/.test(e)||/^c+h+i+n+k+$/.test(e)||/^s+p+i+c+$/.test(e)||/^c+o{2,}n+$/.test(e)||/^w+e+t+b+a+c+k+$/.test(e)||/^t+r+a+n+y+$/.test(e)||/^t+r+a+n+i+$/.test(e)||/^d+y+k+e+$/.test(e)||/^b+e+a+n+e+r+$/.test(e)||/^g+o{2,}k+$/.test(e)||/^r+a+g+h+e+a+d+$/.test(e)||/^t+o+w+e+l+h+e+a+d+$/.test(e)||/^h+e+i+l+h+i+t+l+e+r+$/.test(e)}const mp=new Set(["spicy","spices","spicing","spicey","spicier","spiciest","cocky","chinking","spicer","gooky","slutty","twatt"]);function yp(e,t){if(!/^[a-z]+$/.test(e)||t&&mp.has(e))return!1;const n=[e],s=["ing","in","ers","er","ed","es","y","s"];for(let o=0;o<s.length;o++){const i=s[o];e.endsWith(i)&&e.length>i.length+2&&n.push(e.slice(0,-i.length))}for(let o=0;o<n.length;o++)if(pp(n[o])||t&&up(n[o]))return!0;return!1}function kp(e){if(!e.includes("*"))return[e];const t=e.split("*").length-1,n=e.replace(/\*/g,""),s=n?[n]:[];if(t<1||t>3)return s;const o=e.split(""),i=[];for(let r=0;r<o.length;r++)o[r]==="*"&&i.push(r);const a=r=>{if(r===i.length){s.push(o.join(""));return}for(let l=97;l<=122;l++)o[i[r]]=String.fromCharCode(l),a(r+1)};return a(0),s}const zc=["mother","sonofa","horse","bull","dip"],Dc=["face","head","you"];function Rs(e,t){const n=e.replace(/ph(?=u+c+k)/g,"f").replace(/ph(?=u+k)/g,"f");if(yp(n,t)||/^w+t+f+$/.test(n)||/^s+t+f+u+$/.test(n))return!0;for(let s=0;s<zc.length;s++){const o=zc[s];if(n.startsWith(o)&&n.length>o.length+2&&Rs(n.slice(o.length),t))return!0}for(let s=0;s<Dc.length;s++){const o=bp(n,Dc[s]);if(o&&Rs(o,t))return!0}return!!(n.length>4&&n.endsWith("s")&&!n.endsWith("ss")&&Rs(n.slice(0,-1),t))}function bp(e,t){let n=e.length;for(let s=t.length-1;s>=0;s--){const o=t[s];if(n===0||e[n-1]!==o)return null;for(;n>0&&e[n-1]===o;)n--}return n<=2?null:e.slice(0,n)}function ji(e){let t="";for(let n=0;n<e.length;n++)t+=hp[e[n]]??e[n];return t}const vp={ѕ:"s",һ:"h",с:"c",а:"a",е:"e",о:"o",р:"p",і:"i",х:"x",у:"y",к:"k"};function wp(e){const n=e.replace(/[\u00ad\u0336\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").normalize("NFKC").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase();let s="";for(let o=0;o<n.length;o++)s+=vp[n[o]]??n[o];return s}const $p=new Set(["it","its","it's","is","as","a","i","uh","oh","so","he","she","hi","um","umm","hmm","hm","ah","eh","er","ow","ha","hey","yo","ok","yeah","yes","no","nah","wow","ho","ooh","ahh","uhh","ohh"]);function Ro(e){return e>="a"&&e<="z"||e>="0"&&e<="9"||"@$!+*v|#<".includes(e)}function qc(e,t){let n=t;for(;n<e.length&&e[n]==="!";)n++;if(n>=e.length||!Ro(e[n])||e[n]==="!")return null;const s=e[n];let o=n+1;for(;o<e.length&&e[o]==="!";)o++;return o<e.length&&Ro(e[o])?null:{ch:s,end:o}}function xp(e,t){const n=e.length,s=" .-_~";let o=0;for(;o<n;){if(o>0&&Ro(e[o-1])){o++;continue}const i=qc(e,o);if(!i){o++;continue}const a=[i.ch];let r=i.end;for(;r<n&&s.includes(e[r]);){const l=qc(e,r+1);if(!l)break;a.push(l.ch),r=l.end}if(a.length>=2){const l=ji(a.join("")).replace(/\*/g,"");if(Rs(l,t))return!0}o=Math.max(o+1,r)}return!1}function fs(e){return e.replace(/^!+/,"").replace(/!+$/,"")}function Vi(e){return ji(fs(e)).replace(/\*/g,"")}function yf(e){return/[0-9@$!+*|#<]/.test(fs(e))}function _p(e){return fs(e).length===1}function Mp(e){const t=fs(e);return t.length<2||yf(e)?!1:/^sh+$/.test(t)||$p.has(t)}function Lp(e){let t="space";for(let n=0;n<e.length;n++){const s=e[n];if(!(s===" "||s==="	"||s===`
`||s==="\r")){if(s==="-"){t="hyphen";continue}return"punct"}}return t}function Cp(e){const t=[];let n=0,s="";for(;n<e.length;){if(!Ro(e[n])){s+=e[n],n++;continue}let o=n+1;for(;o<e.length&&Ro(e[o]);)o++;t.push({text:e.slice(n,o),gap:t.length===0?"start":Lp(s)}),s="",n=o}return t}function Sp(e){const t=[ji(e)];if(e.charAt(0)==="!"||e.charAt(e.length-1)==="!"){const n=e.replace(/^!+/,"").replace(/!+$/,"");n&&n!==e&&t.push(ji(n))}return t}function Bp(e){for(let t=0;t<e.length;t++){if(!/^k+i+l+$/.test(e[t]))continue;const n=e[t+1]||"",s=e[t+2]||"";if(/^y+o+u+r+s+e+l+f+$/.test(n)||/^u+r+s+e+l+f+$/.test(n)||/^u+r+$/.test(n)&&/^s+e+l+f+$/.test(s))return!0}return!1}function Hp(e,t,n){if(fs(e[n].text)!=="coon")return!1;const s=n>0?t[n-1]:"",o=t[n+1]||"";return s==="maine"||o==="cat"}function Pp(e,t,n){return n===t+1&&e[n].gap==="space"&&/^a+$/.test(Vi(e[t].text))&&/^h+o+l+e+$/.test(Vi(e[n].text))}function Tp(e,t,n){return fs(e[n].text)!=="dyke"?!1:n>0&&fs(e[n-1].text)==="van"}function Wp(e){for(let t=0;t<e.length-1;t++)if(/^h+e+i+l+$/.test(e[t])&&/^h+i+t+l+e+r+$/.test(e[t+1]))return!0;return!1}function Rp(e,t=!0){const n=wp(e);if(xp(n,t))return!0;const s=Cp(n),o=s.map(a=>Sp(a.text)),i=s.map(a=>Vi(a.text));if(Bp(i)||t&&Wp(i))return!0;for(let a=0;a<o.length;a++)if(!(t&&(Hp(s,i,a)||Tp(s,i,a))))for(let r=0;r<o[a].length;r++){const l=kp(o[a][r]);for(let c=0;c<l.length;c++)if(Rs(l[c].replace(/\*/g,""),t))return!0}for(let a=0;a<s.length;a++){let r="",l=0,c=!1,d=!1;for(let f=a;f<s.length&&f<a+8;f++){if(f>a){const g=s[f].gap,h=s[f-1].text;if(g==="punct"||g==="start"||h.endsWith("!")||s[f].text.startsWith("!")||g!=="space"&&g!=="hyphen")break}if(r+=Vi(s[f].text),_p(s[f].text)&&l++,Mp(s[f].text)&&(c=!0),yf(s[f].text)&&(d=!0),f!==a&&!(c&&l<2&&!d)&&Rs(r,t)){if(t&&Pp(s,a,f))break;return!0}}}return!1}function kf(e,t,n,s=!1){if(typeof e!="string")return{ok:!1,reason:"empty"};const o=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return o?o.length>t?{ok:!1,reason:"long"}:Rp(o,!s)?{ok:!1,reason:n}:{ok:!0,text:o}:{ok:!1,reason:"empty"}}function Ep(e,t=Bl){return kf(e,t,"words")}const Ea={long:"That is a bit long!",link:"No links, please!",contact:"Keep numbers and contact info secret!",personal:"Keep personal info secret!",words:"Let's use kind words!",mail:"Oops, try different words!",empty:""},bf={};for(const e of["АA","аa","ВB","вb","ЕE","еe","КK","кk","МM","мm","НH","нh","ОO","оo","РP","рp","СC","сc","ТT","тt","УY","уy","ХX","хx","ІI","іi","ЈJ","јj","ЅS","ѕs","ЁE","ёe","ЇI","їi","ΑA","ΕE","ΖZ","ΗH","ΙI","ΚK","ΜM","ΝN","ΟO","ΡP","ΤT","ΥY","ΧX","αa","εe","ζz","ιi","κk","νv","οo","ρp","τt","υu","χx"])bf[e[0]]=e[1];function Qp(e){let t="";for(const n of e)t+=bf[n]??n;return t}function Ap(e){return Qp(String(e).normalize("NFKC")).replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\p{M}]/gu,"").replace(/[\p{Extended_Pictographic}\p{S}\p{P}]+/gu,"").replace(/\s+/g," ").trim()}function Up(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(()=>{const e=[...new Set(X0.map(t=>Ap(t)).filter(t=>t.length>=2))].sort((t,n)=>n.length-t.length);return new RegExp(`(^|[^A-Za-z])(?:${e.map(Up).join("|")})(?![A-Za-z])`,"gi")})();const Zc=(e,t,n)=>typeof e=="number"&&Number.isFinite(e)?Math.max(t,Math.min(n,e)):null,zp=(e,t,n=80)=>typeof e=="string"&&e.length<=n&&t.test(e)?e:null,Dp=/^#[0-9a-fA-F]{3,8}$/,qp=["little","kid","adult"];function Zp(e){if(!e||typeof e!="object")return null;const t={};for(const n of["skin","hair","shirt","pants"])if(n in e){const s=zp(e[n],Dp,9);if(!s)return null;t[n]=s}if("hairStyle"in e){const n=Zc(e.hairStyle,0,3);if(n===null)return null;t.hairStyle=Math.round(n)}if("acc"in e){const n=Zc(e.acc,0,3);if(n===null)return null;t.acc=Math.round(n)}if("size"in e){if(!qp.includes(e.size))return null;t.size=e.size}if("flip"in e){if(typeof e.flip!="boolean")return null;t.flip=e.flip}return"look2"in e&&(t.look2=Oo(e.look2)??null),Object.keys(t).length?t:null}function jo(e){const t=En({id:"x"}),n=Zp({skin:e?.skin,hair:e?.hair,hairStyle:e?.hairStyle,shirt:e?.shirt,pants:e?.pants,size:e?.size,acc:e?.acc})??{},s=i=>n[i]??t[i],o={skin:s("skin"),hair:s("hair"),hairStyle:s("hairStyle"),shirt:s("shirt"),pants:s("pants"),size:s("size"),acc:s("acc")};if(e&&typeof e=="object"&&"look2"in e){const i=Oo(e.look2);i&&(o.look2=i)}return o}const Ic=4,Ip=["Mittens","Luna","Biscuit","Pumpkin","Whiskers","Mochi","Pepper","Noodle","Ginger","Socks"],Op=["Buddy","Coco","Max","Daisy","Peanut","Rocket","Bella","Waffles","Scout","Honey"];function Np(e){const t=String(e??"").normalize("NFC").replace(/\s+/g," ").trim();return!/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u.test(t)||(t.match(/\d/g)??[]).length>2?null:gp(t).ok?t:null}function Fp(e,t=[]){return kf(e,$n,"mail")}function vf(e){return typeof e.freeMail=="boolean"?e.freeMail:e.freeChat}const Hl=2900,Qr=[{kind:"swing",x:430,y:500},{kind:"swing",x:570,y:500},{kind:"blanket",x:1730,y:548},{kind:"blanket",x:1850,y:548},{kind:"bench",x:2025,y:512},{kind:"bench",x:2105,y:512},{kind:"bench",x:2225,y:512},{kind:"bench",x:2305,y:512}],ie={top:{x:905,y:330},bottom:{x:1110,y:545},ladder:850},Ne={x0:2440,x1:2840,y0:470,y1:585},jp=(e,t)=>e.where===t.where&&(e.where!=="house"||e.houseId===t.houseId&&e.room===t.room),Vp=(e,t)=>jp(e,t)&&Math.abs(e.x-t.x)<=sp&&Math.abs(e.y-t.y)<=op;function ci(e){try{return Cl(e)}catch{return e}}const Ar=St("cozy-hood"),zs=()=>{try{return JSON.parse(localStorage.getItem(Ar)??"null")}catch{return null}},rn=e=>{e?localStorage.setItem(Ar,JSON.stringify(e)):localStorage.removeItem(Ar)};function Qa(){const e=new URLSearchParams(location.search).get("hood");return e?e.replace(/\/$/,""):"https://cozy-hood.andrewmunruh.workers.dev".replace(/\/$/,"")}async function Gp(e){const t=await fetch(e+"/api/create",{method:"POST"});if(!t.ok)throw new Error("create failed "+t.status);return t.json()}async function Yp(e,t){const n=await fetch(`${e}/api/hood/${encodeURIComponent(t)}`);if(n.status===429)return{slow:!0};if(!n.ok)throw new Error("lookup failed");return n.json()}const Oc=e=>e.type==="item/move"?"im:"+e.id:e.type==="char/move"?"cm:"+e.id:e.type==="item/size"?"is:"+("id"in e?e.id:""):null;class Aa{constructor(t){this.cfg=t,this.ws=null,this.pid="",this.settings={freeChat:!0},this.players=new Map,this.houses=new Map,this.presence=new Map,this.status="offline",this.speaksSit=!1,this.replaced=!1,this.ranch={plots:[],skew:0},this.tables=new Map,this.handlers=new Map,this.cid=1,this.flushT=0,this.presT=0,this.lastPres=null,this.presDirty=!1,this.closedByUs=!1,this.retry=0,this.retryT=0,this.epoch=0,this.stableT=0,this.outbox=[]}on(t,n){(this.handlers.get(t)??this.handlers.set(t,[]).get(t)).push(n)}emit(t,...n){this.handlers.get(t)?.forEach(s=>s(...n))}send(t){return this.ws?.readyState!==WebSocket.OPEN?!1:(this.ws.send(JSON.stringify(t)),!0)}reliable(t){this.send(t)||(t.t==="lock"?this.outbox=this.outbox.filter(n=>!(n.t==="lock"&&n.houseId===t.houseId)):(t.t==="look"||t.t==="dog")&&(this.outbox=this.outbox.filter(n=>n.t!==t.t)),this.outbox.push(t),this.outbox.length>8&&this.outbox.splice(0,this.outbox.length-8))}flushOutbox(){if(this.ws?.readyState!==WebSocket.OPEN||!this.outbox.length)return;const t=this.outbox;this.outbox=[];for(const n of t)this.send(n)||this.outbox.push(n)}scheduleRetry(){if(this.closedByUs||this.replaced||!this.cfg.token||this.retryT)return;const t=this.epoch,n=Math.min(15e3,400*2**Math.min(this.retry,6));this.retry++,this.retryT=window.setTimeout(()=>{this.retryT=0,!(t!==this.epoch||this.closedByUs||this.replaced||!this.cfg.token)&&this.connect()},n)}armStable(){this.stableT&&clearTimeout(this.stableT),this.stableT=window.setTimeout(()=>{this.stableT=0,this.retry=0},1e4)}clearStable(){this.stableT&&(clearTimeout(this.stableT),this.stableT=0)}connect(t){this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.closedByUs=!1,this.replaced=!1,this.status="connecting",this.emit("status",this.status);const n=this.ws;return new Promise(s=>{let o=!1;const i=r=>{o||(o=!0,s(r))},a=new WebSocket(this.cfg.url.replace(/^http/,"ws")+"/ws/"+encodeURIComponent(this.cfg.id??this.cfg.code));if(this.ws=a,n&&n!==a)try{n.close()}catch{}a.onopen=()=>{t&&!this.cfg.token?this.send({t:"join",...t,v:Ic,pet:1,mail:1,sit:1,fit:1}):this.cfg.token?this.send({t:"hello",token:this.cfg.token,v:Ic,pet:1,mail:1,sit:1,fit:1}):i("notoken")},a.onmessage=r=>{const l=JSON.parse(r.data);this.handle(l),l.t==="welcome"&&(this.armStable(),i("ok")),l.t==="error"&&i(l.code+(l.msg?":"+l.msg:"")),l.t==="removed"&&i("removed")},a.onclose=r=>{if(this.ws===a){if(this.clearStable(),this.ws=null,this.status="offline",i("closed"),r.code===4e3){this.replaced=!0,this.emit("status",this.status),this.emit("replaced");return}this.emit("status",this.status),this.scheduleRetry()}},a.onerror=()=>{}})}close(){this.closedByUs=!0,this.replaced=!1,this.epoch++,this.outbox=[],this.clearStable(),this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.presT&&(clearTimeout(this.presT),this.presT=0);try{this.ws?.close()}catch{}this.ws=null,this.status="offline",clearInterval(this.flushT)}handle(t){switch(t.t){case"joined":this.cfg.token=t.token,this.cfg.pid=t.pid,rn(this.cfg);break;case"welcome":this.pid=t.pid,this.settings=t.settings,this.status="online",this.speaksSit=t.sit===1,this.players=new Map(t.players.map(n=>[n.pid,n]));{const n=this.houses;this.houses=new Map;for(const s of t.houses){const{state:o,...i}=s,a=n.get(s.id);this.houses.set(s.id,{meta:i,confirmed:ci(o),pending:a?a.pending.filter(r=>!r.sent):[],view:null})}}this.presence=new Map(Object.entries(t.presence)),this.presence.delete(this.pid),t.ranch&&(this.ranch={plots:t.ranch.plots,skew:t.ranch.now-Date.now()});{const n=new Map;for(const s of t.tables??[])n.set(s.tb,this.stampTable(s));this.tables=n}clearInterval(this.flushT),this.flushT=window.setInterval(()=>this.flush(),60),this.lastPres&&(this.presDirty=!0),this.flushPres(),this.flushOutbox(),this.emit("welcome"),this.emit("status",this.status);break;case"act":{const n=this.houses.get(t.houseId);if(!n)return;n.confirmed=Ni(ci(n.confirmed),t.action);const s=t.by===this.pid&&n.pending[0]?.cid===t.cid;s&&n.pending.shift(),n.view=null,s||this.emit("act",t.houseId,t.action);break}case"nack":{const n=this.houses.get(t.houseId);if(!n)return;n.pending=n.pending.filter(s=>s.cid!==t.cid),t.state&&(n.confirmed=ci(t.state)),n.view=null,this.emit("reset",t.houseId,t.reason);break}case"pres":t.pid!==this.pid&&(t.p?this.presence.set(t.pid,t.p):this.presence.delete(t.pid),this.emit("pres",t.pid));break;case"players":this.players=new Map(t.players.map(n=>[n.pid,n])),this.emit("players");break;case"house":{const{state:n,...s}=t.house;this.houses.set(s.id,{meta:s,confirmed:ci(n),pending:[],view:null}),this.emit("houses");break}case"houseMeta":{const n=this.houses.get(t.meta.id);n&&(n.meta=t.meta,this.emit("houses"),this.emit("houseMeta",t.meta.id));break}case"houseGone":this.houses.delete(t.houseId),this.emit("houses"),this.emit("houseGone",t.houseId);break;case"settings":this.settings=t.settings,this.emit("settings");break;case"bubble":this.emit("bubble",t.pid,t.b);break;case"fx":this.emit("fx",t.pid,t.fx);break;case"ranch":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch");break;case"ranchFail":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch"),this.emit("ranchFail",t.reason);break;case"noride":this.emit("noride",t.ride);break;case"table":{const n=this.stampTable(t.table);this.tables.set(n.tb,n),this.emit("table",n);break}case"tblFail":this.emit("tblFail",t.tb,t.reason);break;case"sayFail":this.emit("sayFail",t.reason);break;case"mailbox":{const n=this.houses.get(t.houseId);if(!n)return;if(t.mailbox?.letters?.length)n.confirmed={...n.confirmed,mailbox:t.mailbox};else{const{mailbox:s,...o}=n.confirmed;n.confirmed=o}n.view=null,this.emit("mailbox",t.houseId);break}case"mailFail":this.emit("mailFail",t.reason);break;case"parentInfo":this.emit("parentInfo",t);break;case"error":this.emit("error",t.code),t.code==="badtoken"&&(this.cfg.token=void 0,this.cfg.pid=void 0,rn(this.cfg));break;case"removed":this.closedByUs=!0,this.emit("removed");break}}stampTable(t){const n=this.tables.get(t.tb),s=n&&n.away===t.away&&n.receivedAt?n.receivedAt:Date.now();return{...t,receivedAt:s}}view(t){const n=this.houses.get(t);return n?n.view??=n.pending.reduce((s,o)=>Ni(s,o.action),n.confirmed):null}myHouseId(){return this.players.get(this.pid)?.houseId??""}canEdit(t){const n=this.houses.get(t);return!!n&&(!n.meta.locked||n.meta.ownerId===this.pid)}dispatch(t,n){const s=this.houses.get(t);if(!s)return;const o=Oc(n),i=s.pending[s.pending.length-1];o&&i&&!i.sent&&Oc(i.action)===o?i.action=n:s.pending.push({cid:this.cid++,action:n,sent:!1}),s.view=null}flush(){for(const[t,n]of this.houses)for(const s of n.pending)!s.sent&&this.send({t:"act",houseId:t,cid:s.cid,action:s.action})&&(s.sent=!0);this.flushPres()}setPresence(t){this.lastPres=t,this.presDirty=!0,this.presT||this.flushPres()}flushPres(){if(!(!this.presDirty||!this.lastPres)){if(!this.send({t:"pres",p:this.lastPres})){!this.closedByUs&&!this.presT&&(this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90));return}this.presDirty=!1,this.presT&&clearTimeout(this.presT),this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90)}}myPresence(){return this.lastPres}say(t){this.reliable({t:"say",b:t})}lock(t,n){this.reliable({t:"lock",houseId:t,locked:n})}setLook(t){this.reliable({t:"look",look:t});const n=this.players.get(this.pid);n&&(n.look=t)}setDog(t){this.reliable({t:"dog",dog:t});const n=this.players.get(this.pid);n&&(n.dog=t)}fx(t){this.reliable({t:"fx",fx:t})}ranchOp(t){this.reliable({t:"ranch",o:t})}tbl(t){this.reliable({t:"tbl",...t})}sendMail(t,n,s,o){this.reliable({t:"mail",op:"send",houseId:t,text:n,color:s,sticker:o})}readMail(t,n){this.reliable({t:"mail",op:"read",houseId:t,id:n})}dropMail(t,n){this.reliable({t:"mail",op:"drop",houseId:t,id:n})}now(){return Date.now()+this.ranch.skew}parent(t){this.cfg.parentKey&&this.reliable({t:"parent",key:this.cfg.parentKey,...t})}}function Kp(e,t,n,s="living"){let o=s;const i=[],a=()=>({...e.view(t),currentRoom:o,soundOn:n.get()}),r=l=>{if(e.houses.has(t)){const c=a();i.forEach(d=>d(c,l))}};return e.on("act",(l,c)=>{l===t&&r(c)}),e.on("reset",l=>{l===t&&r({type:"game/reset"})}),{houseId:t,get:a,subscribe(l){i.push(l)},dispatch(l){if(l.type==="room/switch")o=l.room;else if(l.type==="settings/sound")n.set(l.on);else{if(l.type==="game/reset")return;if(!e.canEdit(t))return;e.dispatch(t,l)}r(l)}}}const Ee="#5a3d5c",Y=`stroke="${Ee}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,Ur=[{name:"Tabby",body:"#ffb26b",stripe:"#e8893a",belly:"#ffe3c4"},{name:"Smokey",body:"#b9b6c9",stripe:"#8f8ba3",belly:"#ecebf3"},{name:"Tuxedo",body:"#4f4660",stripe:"",belly:"#ffffff"},{name:"Calico",body:"#fff6ec",stripe:"",belly:"#fff6ec"}],zr=[{name:"Pup",body:"#f2d0a4",ear:"#b07d54",snout:"#fbe7cc"},{name:"Poodle",body:"#fff0f6",ear:"#ffc8dd",snout:"#fff7fb"},{name:"Dachshund",body:"#c07a45",ear:"#7d4a26",snout:"#d99a68"},{name:"Golden",body:"#f4b860",ear:"#e09a3e",snout:"#fbd9a0"},{name:"Spotty",body:"#ffffff",ear:"#4a3f52",snout:"#ffffff"}],Xp=(e,t,n,s=!1)=>s?`<path d="M${e-3} ${n} q3 3 6 0 M${t-3} ${n} q3 3 6 0" fill="none" ${Y} stroke-width="2.5"/>`:`<circle cx="${e}" cy="${n}" r="2.8" fill="${Ee}"/><circle cx="${t}" cy="${n}" r="2.8" fill="${Ee}"/><circle cx="${e+.9}" cy="${n-.9}" r=".9" fill="#fff"/><circle cx="${t+.9}" cy="${n-.9}" r=".9" fill="#fff"/>`,Dr=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>`;function Ds(e,t="stand"){const n=Ur[e]??Ur[0],s="#ffb3c6",o=(i,a,r,l)=>`
    <path d="M${i-13} ${a-8} L${i-10} ${a-25} L${i-1} ${a-13} Z" fill="${n.body}" ${Y}/><path d="M${i-10.5} ${a-11} L${i-9.5} ${a-20} L${i-4} ${a-13} Z" fill="${s}"/>
    <path d="M${i+1} ${a-13} L${i+11} ${a-26} L${i+13} ${a-7} Z" fill="${e===3?"#f4a259":n.body}" ${Y}/><path d="M${i+4} ${a-13} L${i+10} ${a-21} L${i+11} ${a-11} Z" fill="${s}"/>
    <circle cx="${i}" cy="${a}" r="${r}" fill="${n.body}" ${Y}/>
    ${e===3?`<path d="M${i+2} ${a-r+1} a${r} ${r} 0 0 1 ${r-3} ${r-2} q-6 2 -${r-3} -${r-3}z" fill="#f4a259"/>`:""}
    ${e===2?`<ellipse cx="${i+2}" cy="${a+7}" rx="9" ry="7" fill="#fff"/>`:""}
    ${n.stripe?`<path d="M${i-4} ${a-r+2} v5 M${i+2} ${a-r+1} v6 M${i+8} ${a-r+3} v4" ${Y} stroke="${n.stripe}" stroke-width="2.5"/>`:""}
    ${Xp(i-4,i+7,a,l)}
    <path d="M${i+3} ${a+4} l-2.5 -2 h5 z" fill="#ff8fab"/><path d="M${i+.5} ${a+6} q2.5 2.5 5 0" fill="none" ${Y} stroke-width="2"/>
    ${Dr(i-8,a+5)}${Dr(i+12,a+5)}
    <path d="M${i+r-2} ${a+3} l9 -2 M${i+r-2} ${a+6} l9 2" ${Y} stroke-width="1.6"/>`;return t==="nap"?`<svg viewBox="0 0 120 100" class="catsvg nap">
    <g class="breathe"><path class="tail" d="M28 84 Q22 96 64 94" fill="none" stroke="${Ee}" stroke-width="11" stroke-linecap="round"/><path d="M28 84 Q22 96 64 94" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="76" rx="36" ry="18" fill="${n.body}" ${Y}/>
    ${e===3?'<ellipse cx="44" cy="72" rx="12" ry="8" fill="#f4a259"/><ellipse cx="66" cy="70" rx="9" ry="6" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 62 q3 6 0 12 M56 61 q3 6 0 12 M68 62 q3 6 0 11" fill="none" ${Y} stroke="${n.stripe}" stroke-width="3"/>`:""}
    ${o(90,76,15,!0)}</g></svg>`:t==="sit"?`<svg viewBox="0 0 120 100" class="catsvg sit">
    <path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${Ee}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="70" rx="20" ry="25" fill="${n.body}" ${Y}/>
    <ellipse cx="70" cy="74" rx="10" ry="15" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="54" cy="66" rx="9" ry="12" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M50 60 q5 2 4 8 M49 72 q5 2 4 8" fill="none" ${Y} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect x="62" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${Y}/><rect x="74" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${Y}/>
    ${e===2?'<ellipse cx="66.5" cy="93" rx="4" ry="2.5" fill="#fff"/><ellipse cx="78.5" cy="93" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(72,36,17,!1)}</svg>`:`<svg viewBox="0 0 120 100" class="catsvg stand">
    <path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${Ee}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <rect class="leg b" x="34" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${Y}/><rect class="leg a" x="74" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${Y}/>
    <ellipse cx="58" cy="58" rx="32" ry="17" fill="${n.body}" ${Y}/>
    <ellipse cx="64" cy="66" rx="20" ry="7" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="46" cy="52" rx="12" ry="9" fill="#f4a259"/><ellipse cx="68" cy="50" rx="9" ry="7" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 43 q3 6 0 12 M56 42 q3 6 0 12 M68 43 q3 6 0 11" fill="none" ${Y} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect class="leg a" x="44" y="64" width="9" height="30" rx="4.5" fill="${n.body}" ${Y}/><rect class="leg b" x="84" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${Y}/>
    ${e===2?'<ellipse cx="48.5" cy="92" rx="4" ry="2.5" fill="#fff"/><ellipse cx="88.5" cy="92" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(90,40,17,!1)}</svg>`}function Eo(e,t="stand"){const n=zr[e]??zr[0],s=t==="sleep",o=e===2,i=e===1,a=e===3,r=e===4,l=o?66:58,c=o?70:62,d=94-c,f=o?102:92,g=o?50:40,h=($,P)=>i?`<rect class="leg ${P}" x="${$+2}" y="${c}" width="6" height="${d}" rx="3" fill="${n.body}" ${Y}/><circle class="leg ${P}" cx="${$+5}" cy="91" r="6" fill="${n.body}" ${Y}/>`:`<rect class="leg ${P}" x="${$}" y="${c}" width="10" height="${d}" rx="5" fill="${n.body}" ${Y}/>`,u=i?`<circle cx="44" cy="58" r="15" fill="${n.body}" ${Y}/><circle cx="70" cy="56" r="17" fill="${n.body}" ${Y}/><ellipse cx="57" cy="58" rx="22" ry="12" fill="${n.body}"/>`:`<ellipse cx="${o?62:58}" cy="${l}" rx="${o?42:32}" ry="${o?13:17}" fill="${n.body}" ${Y}/>`,b=r?`<circle cx="46" cy="54" r="5" fill="${Ee}"/><circle cx="64" cy="62" r="4" fill="${Ee}"/><circle cx="72" cy="50" r="3.5" fill="${Ee}"/><circle cx="38" cy="64" r="3" fill="${Ee}"/>`:"",_=i?`<g class="tail"><path d="M30 52 L22 38" ${Y}/><circle cx="21" cy="34" r="7" fill="${n.body}" ${Y}/></g>`:a?`<path class="tail" d="M30 52 Q10 50 14 30 Q20 40 30 46" fill="${n.body}" ${Y}/>`:`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${Ee}" stroke-width="9" stroke-linecap="round"/>`,m=!i&&!a?`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`:"",p=`
    ${i?`<circle cx="${f-2}" cy="${g-16}" r="10" fill="${n.body}" ${Y}/>`:""}
    <circle cx="${f}" cy="${g}" r="17" fill="${n.body}" ${Y}/>
    ${r?`<circle cx="${f-6}" cy="${g-8}" r="4" fill="${Ee}"/>`:""}
    <ellipse cx="${f+13}" cy="${g+7}" rx="11" ry="8" fill="${n.snout}" ${Y}/>
    <circle cx="${f+22}" cy="${g+4}" r="4" fill="${Ee}"/>
    <path d="M${f+14} ${g+12} q4 3 8 0" fill="none" ${Y} stroke-width="2"/>
    ${s?"":`<path class="tongue" d="M${f+16} ${g+13} q2 7 6 0" fill="#ff8fab" ${Y} stroke-width="2"/>`}
    ${s?`<path d="M${f+2} ${g-4} q3 3 6 0" fill="none" ${Y} stroke-width="2.4"/>`:`<circle cx="${f+5}" cy="${g-3}" r="3" fill="${Ee}"/><circle cx="${f+6}" cy="${g-4}" r="1" fill="#fff"/>`}
    ${Dr(f+2,g+8)}
    ${i?`<circle cx="${f-9}" cy="${g+8}" r="9" fill="${n.ear}" ${Y}/>`:`<ellipse class="ear" cx="${f-9}" cy="${g+4}" rx="7" ry="${a||o?14:12}" fill="${n.ear}" ${Y} transform="rotate(12 ${f-9} ${g+4})"/>`}
    <path d="M${f-12} ${g+14} q10 6 20 2" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/><circle cx="${f-1}" cy="${g+19}" r="3" fill="#ffd166" ${Y} stroke-width="1.5"/>`,v=i?`<g class="tail"><path d="M42 86 L28 80" ${Y}/><circle cx="25" cy="78" r="7" fill="${n.body}" ${Y}/></g>`:`<path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${Ee}" stroke-width="9" stroke-linecap="round"/><path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`;return t==="sit"||t==="sleep"?`<svg viewBox="0 0 130 100" class="dogsvg ${s?"sleep":"sit"}">${v}
    <ellipse cx="60" cy="70" rx="22" ry="24" fill="${n.body}" ${Y}/>${r?`<circle cx="54" cy="66" r="5" fill="${Ee}"/><circle cx="64" cy="80" r="4" fill="${Ee}"/>`:""}
    ${h(62,"a")}${h(74,"b")}<g transform="translate(-22 -2)">${p}</g></svg>`:`<svg viewBox="0 0 130 100" class="dogsvg stand">${_}${m}
    ${h(o?30:34,"b")}${h(o?82:72,"a")}
    ${u}${b}
    ${h(o?42:46,"a")}${h(o?94:84,"b")}
    ${p}</svg>`}const wf=e=>{let t=2166136261;for(const n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0},Xn=(e,t)=>{let n=(e^Math.imul(t,2654435761))>>>0;return n^=n>>>15,n=Math.imul(n,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296},Nc=18,Jp={1:.35,2:.6};function eu(e,t,n){return e-t*Jp[n]}function tu(e,t){const s=Math.floor(t/1e3/2.8);return Xn(wf(e||"pup"),s)<.62?"rest":"peek"}function nu(e,t,n,s,o=!1){const i=wf(e.name+":"+e.coat+":"+e.room+":"+Math.round(e.x)+(n?":t"+Math.round(n.x):"")),a=t/1e3,r=Math.floor(a/Nc),l=a-r*Nc;if(!n){const m=ne=>Math.max(160,Math.min(2240,e.x+(Xn(i,ne)-.5)*760)),p=m(r-1);let v=m(r);const $=Xn(i+7,r),P=$<.45?"nap":$<.75?"sit":"groom",R=!!(s&&P==="nap"&&Xn(i+13,r)<.72);R&&s&&(v=Math.max(160,Math.min(2240,s.x)));const W=Math.abs(v-p),F=Math.min(5,W/110);return l<F&&!o?{x:p+(v-p)*(l/F),mood:"walk",flip:v<p,perch:0,curl:0}:{x:v,mood:P,flip:v<p,perch:0,curl:R?1:0}}const c=Math.max(160,Math.min(2240,n.x)),d=Xn(i+5,r)<.45?2:1,f=Math.max(160,Math.min(2240,c+(Xn(i,r)-.5)*420)),g=Math.abs(c-f),h=Math.min(4.2,Math.max(.6,g/160)),u=c<f;if(l<h&&!o)return{x:f+(c-f)*(l/h),mood:"walk",flip:u,perch:0,curl:0};const b=Xn(i+11,r),_=b<.34?"nap":b<.67?"sit":"play";return{x:c,mood:_,flip:u,perch:d,curl:0}}const Gi="#5a3d5c",be=`stroke="${Gi}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,eo=[`<svg viewBox="0 0 48 48"><path d="M24 40 C16 32 6 26 10 16 C14 8 24 12 24 20 C24 12 34 8 38 16 C42 26 32 32 24 40 Z" fill="#ff6b9a" ${be}/></svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd166" ${be}/></svg>`,`<svg viewBox="0 0 48 48"><circle cx="24" cy="22" r="6" fill="#ff8fab" ${be}/>${[0,60,120,180,240,300].map(e=>`<circle cx="${24+Math.cos(e*Math.PI/180)*12}" cy="${22+Math.sin(e*Math.PI/180)*12}" r="5" fill="#ffd166" ${be}/>`).join("")}<path d="M24 34 V44" ${be}/></svg>`,`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="10" fill="#ffb26b" ${be}/><circle cx="34" cy="20" r="8" fill="#ffc46b" ${be}/><path d="M28 14 L30 6 L36 14" fill="#ffb26b" ${be}/><circle cx="32" cy="19" r="1.4" fill="${Gi}"/><circle cx="37" cy="19" r="1.4" fill="${Gi}"/></svg>`,`<svg viewBox="0 0 48 48">${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M8 ${30-t*4} Q24 ${10-t*3} 40 ${30-t*4}" fill="none" stroke="${e}" stroke-width="4"/>`).join("")}</svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l3 10 10 1 -8 6 3 10 -8 -5 -8 5 3 -10 -8 -6 10 -1z" fill="#fff3b0" ${be}/><circle cx="12" cy="34" r="3" fill="#ff8fab" ${be}/><circle cx="36" cy="36" r="2.4" fill="#bde0fe" ${be}/></svg>`];function Fc(e){const t=e?`<g class="flag"><path d="M30 16 V6" ${be}/><path d="M30 6 H42 L38 11 L42 16 H30 Z" fill="#ff6b6b" ${be}/></g>`:`<g class="flag"><path d="M18 28 H28" ${be}/><path d="M18 22 H28 L25 25 L28 28 H18 Z" fill="#ffd166" ${be}/></g>`;return`<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="68" rx="18" ry="3" fill="#000" opacity=".12"/>
    <rect x="30" y="40" width="5" height="26" rx="2" fill="#c99366" ${be}/>
    <path d="M8 40 V22 Q8 8 32 8 Q56 8 56 22 V40 Z" fill="#8ecae6" ${be}/>
    <path d="M8 28 H56" ${be}/>
    <rect x="14" y="32" width="36" height="16" rx="4" fill="#fff6e6" ${be}/>
    <circle cx="32" cy="40" r="3" fill="${Gi}"/>
    ${t}
  </svg>`}function su(e,t=[]){const n=Fp(e,t);return n.ok?{ok:!0,text:n.text}:{ok:!1,msg:n.reason==="empty"?"Write a little note!":Ea[n.reason]||"Oops, try different words!"}}const ou={...Ea,empty:"Write a little note!",slow:"Let's wait a moment!",full:"This mailbox is full!",notyours:"Only she can open her mail.",nohouse:"That house is not on the street.",gone:"That letter is already gone.",toobig:"The mailbox is too full!",presetsOnly:"Typing is turned off: pick a phrase!",unread:"She still has your letters! Wait until she reads them."};function iu(e){return ou[e]||"Let's try that again!"}function au(e){let t="",n="",s=!1,o="",i=0,a=0,r=-1,l="",c="";const d=()=>document.getElementById("mailCue");d()?.addEventListener("click",()=>{e.openOwn()});function f(){t="",n="",document.getElementById("mailSheet")?.remove()}function g(){let m=document.getElementById("mailSheet");return m||(m=document.createElement("div"),m.id="mailSheet",m.className="sheet mailSheet",m.innerHTML='<div class="card" id="mailCard"></div>',document.body.appendChild(m),m.addEventListener("click",p=>{const v=p.target;if(v===m||v.closest('[data-m="close"]')){f();return}u(v)}),m.addEventListener("input",p=>{const v=p.target;if(v.id!=="mailText")return;const $=document.getElementById("mailCount");$&&($.textContent=`${v.value.length}/${$n}`)})),m}function h(){if(!t)return;const m=g().querySelector("#mailText")?.value??"",p=e.mine(t),v=e.lettersOf(t),$=e.houseName(t),P=g().querySelector("#mailCard");if(n&&p&&!s){const W=v.find(F=>F.id===n);if(W&&W.text){b(W);return}n=""}if(s||!p){const W=e.freeType(),F=o?`Reply to ${e.houseName(o)||"your friend"}`:p?"Leave a letter":`Letter for ${$}`,ne=W?`<textarea id="mailText" class="mailBox" maxlength="${$n}" placeholder="Hi! Come play!"></textarea>
        <div class="mailCount" id="mailCount">0/${$n}</div>`:`<h3>Phrase</h3><div class="phrases mailPhrases">${xo.map((I,ae)=>`<button type="button" data-phrase="${ae}" class="${ae===r?"on":""}">${je(I)}</button>`).join("")}</div>`;P.innerHTML=`<button class="close" data-m="close">✕</button><h2>${je(F)}</h2>
        <p class="hint">${W?"A short note. Your name goes on it for you.":"Pick a phrase. Your name goes on it for you."}</p>
        ${ne}
        <h3>Paper</h3><div class="mailRow">${pn.map((I,ae)=>`<button class="swatch ${ae===i?"on":""}" data-color="${ae}" style="background:${I}" aria-label="Paper ${ae+1}"></button>`).join("")}</div>
        <h3>Sticker</h3><div class="mailRow">${eo.slice(0,tf).map((I,ae)=>`<button class="stick ${ae===a?"on":""}" data-sticker="${ae}" aria-label="Sticker ${ae+1}">${I}</button>`).join("")}</div>
        ${l?`<p class="mailErr" id="mailErr">${je(l)}</p>`:""}
        <button class="mailSend" id="mailSend" type="button">Send</button>
        ${p&&v.length?'<button class="mailRow" data-act="back" type="button" style="margin-top:8px">Back to my mail</button>':""}`;const se=g().querySelector("#mailText");if(se&&m){se.value=m;const I=document.getElementById("mailCount");I&&(I.textContent=`${m.length}/${$n}`)}return}const R=v.length?v.slice().reverse().map(W=>W.text?`<button type="button" class="letter ${W.read?"":"fresh"}" data-letter="${je(W.id)}" style="background:${pn[W.color]??pn[0]}">
        <span class="sticker">${eo[W.sticker]??eo[0]}</span>
        <span class="who">${je(W.from)}</span><span class="when">${je(ar(W.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${be}/><path d="M4 8 L40 24 L76 8" fill="${pn[W.color]??"#fff"}" ${be}/></svg>
      </button>`:`<div class="letter" style="background:${pn[W.color]??pn[0]}"><span class="who">Your letter</span><span class="when">${je(ar(W.at))}</span><span class="statusChip ${W.read?"read":""}">${W.read?"Read":"Delivered"}</span></div>`).join(""):'<p class="hint">No letters yet. Your flag pops up when one arrives!</p>';P.innerHTML=`<button class="close" data-m="close">✕</button><h2>${je($)} mailbox</h2>${R}
      <div class="mailRow"><button type="button" data-act="write">Write a letter</button></div>
      ${l?`<p class="mailErr">${je(l)}</p>`:""}`}function u(m){const p=m.closest(".mailPhrases [data-phrase]");if(p){r=+p.dataset.phrase,l="",h();return}const v=m.closest("[data-color]");if(v){i=+v.dataset.color,h();return}const $=m.closest("[data-sticker]");if($){a=+$.dataset.sticker,h();return}if(m.closest("#mailSend"))return _();const P=m.closest("[data-act]")?.dataset.act;if(P==="write"){s=!0,o="",n="",l="",h();return}if(P==="back"){s=!1,o="",n="",l="",h();return}if(P==="reply"){const se=e.houseOf(m.closest("[data-from]")?.dataset.from??"");if(!se){e.toast("They are not on the street anymore.");return}o=se,s=!0,n="",l="",t=se,h();return}if(P==="drop"){const se=m.closest("[data-id]")?.dataset.id??"";if(c!==se){c=se,e.toast("Tap again to throw it away");return}c="",e.drop(t,se);return}const R=m.closest("[data-letter]");if(!R)return;const W=R.dataset.letter,ne=e.lettersOf(t).find(se=>se.id===W);ne&&(!e.mine(t)||!ne.text||(ne.read||e.read(t,W),n=W,b(ne)))}function b(m){const p=ru(m.text),v=g().querySelector("#mailCard");v.innerHTML=`<button class="close" data-m="close">✕</button>
      <div class="letter open read" style="background:${pn[m.color]??pn[0]}" data-id="${je(m.id)}" data-from="${je(m.fromPid)}">
        <span class="sticker">${eo[m.sticker]??eo[0]}</span>
        <span class="who">${je(m.from)}</span><span class="when">${je(ar(m.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${be}/><path class="flap" d="M4 8 L40 24 L76 8" fill="#fff" ${be}/></svg>
        <p class="words">${je(p??"")}</p>
        <span class="mailRow"><button type="button" data-act="reply">Reply</button><button type="button" class="throw" data-act="drop">${c===m.id?"Tap again":"Throw away"}</button></span>
      </div>
      <button type="button" data-act="back">All my mail</button>
      ${l?`<p class="mailErr">${je(l)}</p>`:""}`}function _(){let m="";if(e.freeType()){const v=g().querySelector("#mailText")?.value??"",$=su(v);if(!$.ok){l=$.msg,h();const P=g().querySelector("#mailText");P&&(P.value=v);return}m=$.text}else{if(r<0||r>=xo.length){l="Pick a phrase!",h();return}m=xo[r]}const p=o||t;l="",e.send(p,m,i,a),e.toast("On its way!"),e.mine(p)?(s=!1,o="",t=p,h()):f()}return{open(m,p,v,$){t=m,n="",s=!v,o="",l="",c="",i=0,a=0,r=-1,h()},fail(m){l=iu(m),t?h():e.toast(l)},refresh(){t&&h()},syncCue(m){d()?.classList.toggle("show",m)}}}function ru(e){if(!e)return null;const t=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return!t||t.length>$n?null:t}function je(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const $f=()=>St("cozy-play");function lu(){try{return localStorage.getItem($f())==="play"?"play":"decorate"}catch{return"decorate"}}function cu(e){try{localStorage.setItem($f(),e)}catch{}}function du(e){return e==="kennel"?"kennel":e==="cat-tower"?"tower":e==="yard-swing"?"swing":e==="lamp"||/(^|:)lamp|starlamp|light/.test(e)?"lamp":e==="fridge"||e==="stove"||e==="vanity"||e==="bookshelf"||e==="window"||e==="mirror"||e==="tv"||/fridge|stove|cabinet|drawer|vanity/.test(e)?"open":Fo(e)?"sit":"wiggle"}const fu='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M34 8 l1.2 3 3 .4 -2.2 2 .6 3 -2.6-1.6 -2.6 1.6 .6-3 -2.2-2 3-.4z" fill="#ffd166" stroke="#5a3d5c" stroke-width="1.4"/></svg>',gu='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 36 h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M8 14 l2 1 M40 34 l2 2 M8 40 l3 -1" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>';function hu(e,t){let n="decorate";const s=e.querySelector("#modePlay"),o=e.querySelector("#modeDecorate");s.querySelector(".modeIco").innerHTML=fu,o.querySelector(".modeIco").innerHTML=gu;const i=()=>{const c=n==="play";document.body.classList.toggle("mode-play",c),s.classList.toggle("on",c),o.classList.toggle("on",!c),s.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-pressed",c?"false":"true")},a=(c,d)=>{n=c,d&&cu(c),i(),t.onChange?.()};e.addEventListener("pointerdown",c=>c.stopPropagation()),e.addEventListener("click",c=>{const d=c.target.closest("[data-mode]");if(!d)return;const f=d.dataset.mode==="play"?"play":"decorate";a(f,t.ownHouse())}),i();let r=!1;return{mode:()=>n,isPlay:()=>n==="play",sync(c){a(c?lu():"play",!1)},hint:()=>{if(r||!document.body.classList.contains("phone"))return;const c=St("cozy-mode-hint");try{if(localStorage.getItem(c)){r=!0;return}}catch{r=!0;return}r=!0;const d=document.createElement("p");d.className="modeHint",d.textContent="Play: tap things! Decorate: move things!",e.appendChild(d);let f=!1;const g=()=>{if(!f){f=!0,d.remove(),window.removeEventListener("pointerdown",g);try{localStorage.setItem(c,"1")}catch{}}};window.setTimeout(g,2800),d.addEventListener("click",g),window.addEventListener("pointerdown",g)}}}const pu={hip:0,head:3,armL:26,armR:-22,legL:-76,legR:76,legLLift:8,legRLift:8},uu={hip:0,head:-8,armL:18,armR:-12,legL:-4,legR:6,legLLift:0,legRLift:0};function Pl(e){return e==="sit"?pu:e==="lie"?uu:null}const He="#5a3d5c",j=(e=4)=>`stroke="${He}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Tl=600,Ht=250,Gn=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})">
  <rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${j()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${j()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${j()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${j()}/>
  <circle cx="-18" cy="-78" r="9" fill="#fff" opacity=".35"/></g>`,mu=(e,t,n)=>`<g transform="translate(${e} ${t})"><path d="M0 0 V-16" ${j(3)}/>${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*6}" cy="${-20+Math.sin(s*Math.PI/180)*6}" r="5" fill="${n}" ${j(2)}/>`).join("")}<circle cx="0" cy="-20" r="4" fill="#ffd166" ${j(2)}/></g>`,jc=e=>`<g transform="translate(${e} 0)">
  <rect x="-80" y="452" width="160" height="12" rx="6" fill="#ff9f68" ${j()}/><rect x="-80" y="470" width="160" height="12" rx="6" fill="#ff9f68" ${j()}/>
  <rect x="-70" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${j(3)}/><rect x="60" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${j(3)}/>
  <rect x="-86" y="490" width="172" height="14" rx="7" fill="#ffb385" ${j()}/></g>`;function yu(){const e=Hl,t=Array.from({length:Math.floor((Ne.x1-Ne.x0+40)/34)},(n,s)=>`<path d="M${Ne.x0-20+s*34} 470 V428 l8 -10 l8 10 V470 Z" fill="#fff6e6" ${j(3)}/>`).join("");return`<svg class="parkScene" viewBox="0 0 ${e} ${Tl}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient>
  <pattern id="pkCheck" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><rect width="15" height="15" fill="#ff8fab"/><rect x="15" y="15" width="15" height="15" fill="#ff8fab"/></pattern></defs>
  <rect width="${e}" height="440" fill="url(#pkSky)"/>
  ${[180,900,1600,2300].map((n,s)=>`<g transform="translate(${n} ${70+s%2*30})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <circle cx="${e-220}" cy="90" r="46" fill="#ffe066" ${j(4)}/>
  <path d="M-50 360 Q500 220 1100 340 T2300 330 T${e+100} 350 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#9fe0aa"/><path d="M0 410 H${e}" ${j(4)}/>
  <path d="M0 560 Q700 520 1400 565 T${e} 545 V600 H0 Z" fill="#f6e3c3" opacity=".9"/>
  ${Gn(260,390,.9)}${Gn(720,380,1.05,"#4fbf7a")}${Gn(1230,385,.8)}${Gn(1640,380,1,"#4fbf7a")}${Gn(1990,388,.85)}${Gn(2380,380,.95)}${Gn(2860,390,.9,"#4fbf7a")}
  ${[[300,470,"#ff8fab"],[690,455,"#c9a0dc"],[1210,470,"#ffd166"],[1960,450,"#8ecae6"],[2390,470,"#ff8fab"],[1580,590,"#c9a0dc"],[140,585,"#ffd166"]].map(([n,s,o])=>mu(+n,+s,String(o))).join("")}
  <!-- gate back to the street -->
  <g><rect x="40" y="300" width="22" height="200" rx="6" fill="#c99366" ${j()}/><rect x="168" y="300" width="22" height="200" rx="6" fill="#c99366" ${j()}/>
    <path d="M30 312 Q115 240 200 312" fill="none" stroke="${He}" stroke-width="16" stroke-linecap="round"/><path d="M30 312 Q115 240 200 312" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
    <rect x="62" y="252" width="106" height="36" rx="12" fill="#fff6e6" ${j(3)}/><text x="115" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">PARK</text></g>
  <!-- swing set (seats are separate so they can swing) -->
  <g><path d="M350 ${Ht} L310 500 M350 ${Ht} L390 500 M650 ${Ht} L610 500 M650 ${Ht} L690 500" stroke="${He}" stroke-width="14" stroke-linecap="round"/>
    <path d="M350 ${Ht} L310 500 M350 ${Ht} L390 500 M650 ${Ht} L610 500 M650 ${Ht} L690 500" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/>
    <rect x="330" y="${Ht-10}" width="340" height="20" rx="10" fill="#ff8fab" ${j()}/></g>
  <!-- slide -->
  <g><path d="M${ie.ladder-20} 560 V${ie.top.y} M${ie.ladder+30} 560 V${ie.top.y}" stroke="${He}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${ie.ladder-20} 560 V${ie.top.y} M${ie.ladder+30} 560 V${ie.top.y}" stroke="#c9a0dc" stroke-width="6" stroke-linecap="round"/>
    ${[380,420,460,500,540].map(n=>`<path d="M${ie.ladder-20} ${n} H${ie.ladder+30}" ${j(5)}/>`).join("")}
    <rect x="${ie.ladder-30}" y="${ie.top.y-14}" width="100" height="18" rx="8" fill="#ffd166" ${j()}/>
    <path d="M${ie.ladder+60} ${ie.top.y-10} C 1000 ${ie.top.y} 1010 520 ${ie.bottom.x+40} 548 L${ie.bottom.x+40} 572 C 990 548 975 ${ie.top.y+30} ${ie.ladder+60} ${ie.top.y+14} Z" fill="#ffd166" ${j()}/>
    <path d="M${ie.ladder+70} ${ie.top.y-2} C 990 ${ie.top.y+8} 1000 525 ${ie.bottom.x+30} 552" fill="none" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/></g>
  <!-- splash pond -->
  <g class="pondArt"><ellipse cx="1420" cy="515" rx="185" ry="52" fill="#8ecae6" ${j()}/><ellipse cx="1420" cy="510" rx="150" ry="36" fill="#b5e3f5"/>
    <ellipse cx="1340" cy="520" rx="24" ry="9" fill="#80ed99" ${j(3)}/><ellipse cx="1500" cy="505" rx="20" ry="8" fill="#80ed99" ${j(3)}/>
    <g transform="translate(1440 500)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ffd166" ${j(3)}/><circle cx="16" cy="-12" r="9" fill="#ffd166" ${j(3)}/><path d="M24 -12 l8 2 l-8 3 z" fill="#ff9f68" ${j(2)}/><circle cx="18" cy="-14" r="1.8" fill="${He}"/></g></g>
  <!-- picnic blanket -->
  <g><path d="M1670 530 L1910 530 L1940 580 L1640 580 Z" fill="url(#pkCheck)" ${j()}/>
    <g transform="translate(1915 520)"><rect x="-26" y="-20" width="52" height="32" rx="8" fill="#e6b88a" ${j(3)}/><path d="M-18 -20 Q0 -46 18 -20" fill="none" ${j(4)}/><circle cx="-10" cy="-24" r="7" fill="#ff6b6b" ${j(2)}/></g></g>
  ${jc(2065)}${jc(2265)}
  <!-- dog area -->
  <g>${t}<path d="M${Ne.x0-20} 440 H${Ne.x1+20}" ${j(3)}/>
    <g transform="translate(${Ne.x0+10} 380)"><rect x="-6" y="0" width="12" height="70" fill="#c99366" ${j(3)}/><rect x="-55" y="-34" width="110" height="38" rx="10" fill="#fff6e6" ${j(3)}/>
      <text x="0" y="-8" text-anchor="middle" font-size="20" font-weight="900" fill="${He}" font-family="Nunito, system-ui, sans-serif">DOGS 🐾</text></g>
    <g transform="translate(${Ne.x1-30} 470)"><path d="M-50 0 V-60 L0 -100 L50 -60 V0 Z" fill="#ff8fab" ${j()}/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="${He}" stroke-width="14" stroke-linecap="round"/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="#c9a0dc" stroke-width="8" stroke-linecap="round"/><path d="M-20 0 V-30 a20 20 0 0 1 40 0 V0 Z" fill="#5a3d5c"/></g>
    <g transform="translate(${Ne.x0+120} 500)"><rect x="-12" y="-30" width="24" height="34" rx="8" fill="#ff6b6b" ${j(3)}/><rect x="-18" y="-18" width="36" height="8" rx="4" fill="#ff6b6b" ${j(3)}/><circle cx="0" cy="-32" r="10" fill="#ff6b6b" ${j(3)}/></g></g>
  </svg>`}const ku=`<svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M10 0 V222 M50 0 V222" stroke="${He}" stroke-width="4"/><rect x="0" y="216" width="60" height="14" rx="6" fill="#ff9f68" ${j(3)}/></svg>`,bu=`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffd166" ${j(3)}/><path d="M6 16 Q20 24 34 16 M8 27 Q20 19 32 27" fill="none" stroke="#fff" stroke-width="3"/></svg>`,vu=`<svg viewBox="0 0 48 48"><rect x="20" y="28" width="8" height="14" rx="3" fill="#c99366" stroke="${He}" stroke-width="3"/><circle cx="24" cy="20" r="13" fill="#5cc985" stroke="${He}" stroke-width="3"/><circle cx="19" cy="16" r="3" fill="#fff" opacity=".5"/></svg>`,xf=`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8" fill="#ff8fab" stroke="${He}" stroke-width="3"/><circle cx="13" cy="20" r="4.5" fill="#ff8fab" stroke="${He}" stroke-width="3"/><circle cx="20" cy="13" r="4.5" fill="#ff8fab" stroke="${He}" stroke-width="3"/><circle cx="28" cy="13" r="4.5" fill="#ff8fab" stroke="${He}" stroke-width="3"/><circle cx="35" cy="20" r="4.5" fill="#ff8fab" stroke="${He}" stroke-width="3"/></svg>`,wu=`<svg viewBox="0 0 48 48"><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="${He}" stroke-width="4" stroke-linecap="round"/><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="#ff9f68" stroke-width="2"/><path d="M16 40 V26 M24 40 V22 M32 40 V26" stroke="${He}" stroke-width="3" stroke-linecap="round"/></svg>`,he="#5a3d5c",Se=`stroke="${he}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,di=[{body:"#ffd6e0",roof:"#ff7aa8",door:"#8fd3ff",trim:"#fff6e6"},{body:"#d9f2ff",roof:"#5aa9e6",door:"#ffd166",trim:"#ffffff"},{body:"#e3f9d9",roof:"#5cc985",door:"#ff9f68",trim:"#fffbe6"},{body:"#fff1b8",roof:"#ff9f43",door:"#c9a0dc",trim:"#ffffff"},{body:"#eadcff",roof:"#9b7bd8",door:"#80ed99",trim:"#fff6fb"},{body:"#ffe0c7",roof:"#e07a5f",door:"#5fb0d8",trim:"#fffaf0"},{body:"#d8f5ef",roof:"#2fb3a3",door:"#ff8fab",trim:"#ffffff"},{body:"#fde2f3",roof:"#e879c6",door:"#ffd166",trim:"#fff"}];function Yi(e,t={}){const n=di[(e%di.length+di.length)%di.length],s=e%2===1,o=t.lit?"#fff3b0":"#cfe8ff",i=s?`<path d="M22 138 Q22 36 160 30 Q298 36 298 138 Z" fill="${n.roof}" ${Se}/><path d="M60 110 Q70 60 120 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`:`<path d="M14 140 L160 26 L306 140 Z" fill="${n.roof}" ${Se}/><path d="M70 110 L140 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`;return`<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="294" rx="150" ry="8" fill="#000" opacity=".12"/>
  <rect x="${s?232:220}" y="${s?36:44}" width="30" height="56" rx="6" fill="${n.trim}" ${Se}/>
  <rect x="44" y="124" width="232" height="168" rx="20" fill="${n.body}" ${Se}/>
  ${i}
  <g class="houseWin" fill="${o}"><circle cx="160" cy="${s?92:98}" r="18" ${Se}/><rect x="62" y="160" width="62" height="58" rx="18" ${Se}/><rect x="196" y="160" width="62" height="58" rx="18" ${Se}/></g>
  <path d="M160 ${s?74:80} V${s?110:116} M142 ${s?92:98} H178" ${Se}/>
  <path d="M93 160 V218 M62 189 H124" ${Se}/><path d="M227 160 V218 M196 189 H258" ${Se}/>
  <rect x="56" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${Se}/><rect x="190" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${Se}/>
  <circle cx="72" cy="212" r="7" fill="#ff8fab" ${Se}/><circle cx="92" cy="208" r="7" fill="#ffd166" ${Se}/><circle cx="112" cy="212" r="7" fill="#ff8fab" ${Se}/>
  <circle cx="208" cy="212" r="7" fill="#c9a0dc" ${Se}/><circle cx="228" cy="208" r="7" fill="#80ed99" ${Se}/><circle cx="248" cy="212" r="7" fill="#c9a0dc" ${Se}/>
  <path d="M132 292 V226 Q132 196 160 196 Q188 196 188 226 V292 Z" fill="${n.door}" ${Se}/>
  <circle cx="176" cy="250" r="5" fill="${he}"/><path d="M146 222 Q160 212 174 222" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>
  <rect x="118" y="286" width="84" height="10" rx="5" fill="${n.trim}" ${Se}/>
</svg>`}const ft={street:`<svg viewBox="0 0 48 48"><circle cx="16" cy="15" r="7" fill="#ffd166" stroke="${he}" stroke-width="3"/><circle cx="32" cy="15" r="7" fill="#ff8fab" stroke="${he}" stroke-width="3"/><circle cx="13.5" cy="14.5" r="1.2" fill="${he}"/><circle cx="18.5" cy="14.5" r="1.2" fill="${he}"/><circle cx="29.5" cy="14.5" r="1.2" fill="${he}"/><circle cx="34.5" cy="14.5" r="1.2" fill="${he}"/><path d="M13 18 q3 2.2 6 0 M29 18 q3 2.2 6 0" fill="none" stroke="${he}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 40 Q16 28 24 33 Q32 38 40 28" fill="none" stroke="#5cc985" stroke-width="4" stroke-linecap="round"/><circle cx="16" cy="36" r="2.2" fill="#fff" stroke="${he}" stroke-width="1.5"/><circle cx="32" cy="32" r="2.2" fill="#fff" stroke="${he}" stroke-width="1.5"/></svg>`,home:`<svg viewBox="0 0 48 48"><path d="M8 22 L24 8 L40 22 V40 H8 Z" fill="#ffd166" stroke="${he}" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 V28 H28 V40" fill="#fff" stroke="${he}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="20" r="2.4" fill="${he}"/></svg>`,lockOn:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q33 7 33 16 V22" fill="none" stroke="${he}" stroke-width="4"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#ffd166" stroke="${he}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${he}"/></svg>`,lockOff:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q31 7 32.5 13" fill="none" stroke="${he}" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#b6f0a8" stroke="${he}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${he}"/></svg>`,chat:`<svg viewBox="0 0 48 48"><path d="M8 12 Q8 6 14 6 H34 Q40 6 40 12 V26 Q40 32 34 32 H22 L13 40 V32 Q8 32 8 26 Z" fill="#fff3b0" stroke="${he}" stroke-width="3" stroke-linejoin="round"/><circle cx="17" cy="19" r="2.5" fill="${he}"/><circle cx="24" cy="19" r="2.5" fill="${he}"/><circle cx="31" cy="19" r="2.5" fill="${he}"/></svg>`,shield:`<svg viewBox="0 0 48 48"><path d="M24 5 L39 11 V23 Q39 36 24 43 Q9 36 9 23 V11 Z" fill="#c9a0dc" stroke="${he}" stroke-width="3" stroke-linejoin="round"/><path d="M17 24 L22 29 L31 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,solo:`<svg viewBox="0 0 48 48"><path d="M8 24 L24 9 L40 24 V41 H8 Z" fill="#ffd166" stroke="${he}" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="28" width="10" height="13" rx="4" fill="#fff" stroke="${he}" stroke-width="2.5"/><path d="M33 7 l2 4 4 .5 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.5z" fill="#ff8fab" stroke="${he}" stroke-width="1.5"/></svg>`};function q(e,t=2600){const n=document.createElement("div");n.className="toast",n.textContent=e,(document.getElementById("toastLane")??document.body).appendChild(n),setTimeout(()=>n.classList.add("out"),t),setTimeout(()=>n.remove(),t+400)}function _f(){return new Promise(e=>{let t=0,n=0,s="",o=0;const i=document.createElement("div");i.className="sheet adult",i.innerHTML='<div class="card adultCard"></div>',document.body.appendChild(i);const a=i.firstElementChild,r=()=>{t=6+Math.floor(Math.random()*4),n=3+Math.floor(Math.random()*7),s="",l()},l=()=>{a.innerHTML=`<button class="close" data-k="x">✕</button><h2>Grown-ups only</h2><p class="q" data-q="${t*n}">What is ${t} × ${n}?</p>
        <div class="ans">${s||"&nbsp;"}</div>
        <div class="pad">${[1,2,3,4,5,6,7,8,9,"⌫",0,"OK"].map(d=>`<button data-k="${d}">${d}</button>`).join("")}</div>`},c=d=>{i.remove(),e(d)};a.addEventListener("click",d=>{const f=d.target.closest("[data-k]")?.dataset.k;if(f){if(f==="x")return c(!1);if(f==="⌫")s=s.slice(0,-1);else if(f==="OK"){if(+s===t*n)return c(!0);if(++o>=3)return c(!1);a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400),r();return}else s.length<3&&(s+=f);l()}}),i.addEventListener("click",d=>{d.target===i&&c(!1)}),r()})}const st="#5a3d5c",fe=`stroke="${st}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,cr=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${st}"/><circle cx="${t}" cy="${n}" r="3" fill="${st}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,dr=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,fi='<ellipse cx="50" cy="97" rx="34" ry="3" fill="#000" opacity=".12"/>',$u=`<svg viewBox="0 0 40 30"><path d="M4 30 V16 Q4 2 20 2 Q36 2 36 16 V30 Z" fill="#3b2a3d" ${fe}/><circle cx="14" cy="18" r="1.6" fill="#fff" opacity=".8"/><circle cx="22" cy="18" r="1.6" fill="#fff" opacity=".8"/></svg>`,xu=`<svg viewBox="0 0 48 30"><path d="M4 27 Q10 22 22 23 L42 23 Q46 27 42 28 H6 Z" fill="#cdeccf" ${fe}/><circle cx="26" cy="15" r="11" fill="#ffb3c6" ${fe}/><path d="M26 15 m-5 0 a5 5 0 1 1 5 5" fill="none" ${fe}/><path d="M8 23 L5 13 M12 23 L12 13" ${fe}/></svg>`,_u=`<svg viewBox="0 0 30 30"><path d="M15 2 l3.6 8 8.4 1 -6.3 5.8 1.8 8.4 -7.5 -4.4 -7.5 4.4 1.8 -8.4 L3 11 l8.4 -1z" fill="#fff3b0" ${fe}/></svg>`,Mu=`<svg viewBox="0 0 30 22"><ellipse cx="15" cy="13" rx="13" ry="8" fill="#e6b88a" ${fe}/><circle cx="10" cy="11" r="1.8" fill="${st}"/><circle cx="18" cy="14" r="1.8" fill="${st}"/><circle cx="16" cy="9" r="1.5" fill="${st}"/></svg>`,Lu=`<svg viewBox="0 0 30 28"><path d="M15 26 C3 18 1 10 6 5 C10 1 14 4 15 7 C16 4 20 1 24 5 C29 10 27 18 15 26 Z" fill="#ffc8dd" ${fe}/></svg>`,Ki=[{name:"Cada",room:"living",x:150,y:382,w:40,h:30,taps:3,spot:$u,hello:"Squeak! Hi Cada!",item:{kind:"egg:cada-mouse",name:"Cada's Mouse",cat:"secrets",w:80,holdable:!0,svg:`${fi}<path d="M78 74 Q96 68 92 52" stroke="#ff9bb5" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="28" ry="18" fill="#d6d6e8" ${fe}/><circle cx="28" cy="40" r="13" fill="#d6d6e8" ${fe}/><circle cx="62" cy="38" r="13" fill="#d6d6e8" ${fe}/><circle cx="28" cy="40" r="7" fill="#ffc8dd"/><circle cx="62" cy="38" r="7" fill="#ffc8dd"/><circle cx="45" cy="56" r="20" fill="#e4e4f2" ${fe}/>${cr(38,52,54)}<circle cx="45" cy="64" r="3" fill="#ff8fab"/>${dr(32,58,62)}<text x="50" y="96" font-size="11" font-weight="900" text-anchor="middle" fill="${st}">C</text>`}},{name:"Sloane",room:"living",x:2290,y:383,w:48,h:30,taps:3,spot:xu,hello:"Hi Sloane! ✨",item:{kind:"egg:sloane-snail",name:"Sloane's Rainbow Snail",cat:"secrets",w:110,holdable:!0,svg:`${fi}<path d="M6 92 Q14 80 36 82 L84 82 Q94 90 84 94 H10 Z" fill="#cdeccf" ${fe}/><circle cx="56" cy="52" r="32" fill="#ff8fab" ${fe}/><circle cx="56" cy="52" r="24" fill="#ffd166"/><circle cx="56" cy="52" r="17" fill="#80ed99"/><circle cx="56" cy="52" r="10" fill="#8ecae6"/><circle cx="56" cy="52" r="4" fill="#c9a0dc"/><circle cx="56" cy="52" r="32" fill="none" ${fe}/><path d="M14 82 L8 60 M24 82 L24 60" ${fe}/><circle cx="8" cy="58" r="4" fill="${st}"/><circle cx="24" cy="58" r="4" fill="${st}"/>${dr(14,30,76)}`}},{name:"Chloe",room:"bedroom",x:2230,y:92,w:30,h:30,taps:5,spot:_u,item:{kind:"egg:chloe-starlamp",name:"Chloe's Star Lamp",cat:"secrets",w:100,holdable:!0,svg:`${fi}<circle cx="50" cy="38" r="34" fill="#fff3b0" opacity=".6"/><path d="M50 6 l8 17 19 2.5 -14 13 4 19 -17 -9.5 -17 9.5 4 -19 -14 -13 19 -2.5z" fill="#ffd166" ${fe}/>${cr(43,57,38)}<path d="M45 46 q5 4 10 0" ${fe} fill="none"/><rect x="46" y="66" width="8" height="22" rx="4" fill="#c9a0dc" ${fe}/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#b388d6" ${fe}/><text x="50" y="93" font-size="8" font-weight="900" text-anchor="middle" fill="#fff">CHLOE</text>`}},{name:"Quinn",room:"kitchen",x:80,y:588,w:30,h:22,taps:4,spot:Mu,hello:"Woof! Hi Quinn!",item:{kind:"egg:quinn-pup",name:"Quinn's Cookie Pup",cat:"secrets",w:110,holdable:!0,svg:`${fi}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#e6b88a" ${fe}/><circle cx="50" cy="44" r="27" fill="#f2d0a4" ${fe}/><ellipse cx="24" cy="46" rx="10" ry="17" fill="#b07d54" ${fe}/><ellipse cx="76" cy="46" rx="10" ry="17" fill="#b07d54" ${fe}/>${cr(41,59,42)}<ellipse cx="50" cy="53" rx="5" ry="4" fill="${st}"/>${dr(34,66,54)}<circle cx="84" cy="80" r="10" fill="#e6b88a" ${fe}/><circle cx="81" cy="78" r="1.8" fill="${st}"/><circle cx="87" cy="82" r="1.8" fill="${st}"/><text x="50" y="30" font-size="10" font-weight="900" text-anchor="middle" fill="${st}">Q</text>`}},{name:"Reagan",room:"salon",x:2300,y:352,w:30,h:28,taps:5,spot:Lu,item:{kind:"egg:reagan-frame",name:"Reagan's Frame",cat:"secrets",w:120,wall:!0,svg:`<rect x="8" y="10" width="84" height="84" rx="16" fill="#ff8fab" ${fe}/><rect x="18" y="20" width="64" height="64" rx="10" fill="#fff3f7" ${fe}/><text x="50" y="72" font-size="52" font-weight="900" text-anchor="middle" fill="#e879c6" stroke="${st}" stroke-width="2.5">R</text><circle cx="14" cy="16" r="6" fill="#ffd166" ${fe}/><circle cx="86" cy="88" r="6" fill="#ffd166" ${fe}/><path d="M76 24 l2 4 4 .5 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.5z" fill="#ffd166"/>`}}],Cu=Ki.map(e=>({...e.item,rooms:["any"],secret:e.name})),Mf=St("cozy-secrets"),Ua=()=>{try{return new Set(JSON.parse(localStorage.getItem(Mf)??"[]"))}catch{return new Set}},Su=e=>localStorage.setItem(Mf,JSON.stringify([...e]));function Bu(e){const t=document.createElement("div");t.className="eggs",e.world.appendChild(t);const n=new Map;for(const o of Ki){const i=document.createElement("div");i.className="eggspot",i.dataset.egg=o.name,i.style.left=(o.x-o.w/2)/e.roomW*100+"%",i.style.top=(o.y-o.h)/e.roomH*100+"%",i.style.width=o.w/e.roomW*100+"%",i.style.height=o.h/e.roomH*100+"%",i.innerHTML=o.spot,t.appendChild(i),i.addEventListener("pointerdown",a=>a.stopPropagation()),i.addEventListener("click",a=>{a.stopPropagation();const r=Date.now(),l=n.get(o.name)??{n:0,t:0};if(l.n=r-l.t<1500?l.n+1:1,l.t=r,n.set(o.name,l),i.classList.remove("poke"),i.offsetWidth,i.classList.add("poke"),e.tap(),l.n<o.taps)return;l.n=0;const c=Ua(),d=!c.has(o.name);c.add(o.name),Su(c),Hu(o,i),e.sparkle(),e.onFound(o.name,d)})}const s=()=>{const o=e.currentRoom();t.querySelectorAll(".eggspot").forEach(i=>{i.style.display=Ki.find(a=>a.name===i.dataset.egg).room===o?"":"none"})};return s(),{update:s}}function Hu(e,t){if(e.hello){const s=document.createElement("div");s.className="eggpop",s.innerHTML=`<div class="eggcritter"><svg viewBox="0 0 100 100">${e.item.svg}</svg></div><div class="bubble">${e.hello}</div>`,t.appendChild(s),setTimeout(()=>s.remove(),3200)}const n=document.createElement("div");n.className="eggbanner",n.innerHTML=`<span class="sp">✨</span><span class="nm">${[...e.name].map((s,o)=>`<i style="animation-delay:${o*70}ms">${s}</i>`).join("")}</span><span class="sp">✨</span>`,document.body.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3100),Lf()}function Lf(e=70){const t=["#ff8fab","#ffd166","#8ecae6","#80ed99","#c9a0dc","#ff9f68"],n=document.createElement("div");n.className="confetti",document.body.appendChild(n);for(let s=0;s<e;s++){const o=document.createElement("i");o.style.left=Math.random()*100+"vw",o.style.background=t[s%t.length],o.style.animationDelay=Math.random()*.5+"s",o.style.animationDuration=1.6+Math.random()*1.2+"s",o.style.setProperty("--r",Math.random()*720-360+"deg"),o.style.setProperty("--dx",Math.random()*160-80+"px"),s%3===0&&(o.style.borderRadius="50%"),n.appendChild(o)}setTimeout(()=>n.remove(),3600)}const Pu=`[
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
    "widthUnits": 140.0,
    "heightUnits": 112.0,
    "viewBox": [
      0.0,
      0.0,
      140.0,
      112.0
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
`,Tu=`[
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
]`,Wu="/kids-house-game/assets/alarm-clock-DOVobLzL.png",Ru="/kids-house-game/assets/alarm-clock-BCd1-e86.svg",Eu="/kids-house-game/assets/bedtime-snack-COvX4Nqo.png",Qu="/kids-house-game/assets/bedtime-snack-BoNDQqOK.svg",Au="/kids-house-game/assets/book-stack-BlyqbTA1.png",Uu="/kids-house-game/assets/book-stack-upnp1NwG.svg",zu="/kids-house-game/assets/bunk-bed-COiQly1s.png",Du="/kids-house-game/assets/bunk-bed-YZiRWNFR.svg",qu="/kids-house-game/assets/bunny-slippers-DajXa_JK.png",Zu="/kids-house-game/assets/bunny-slippers-PNucIc_Q.svg",Iu="/kids-house-game/assets/canopy-bed-Db9GIfyT.png",Ou="/kids-house-game/assets/canopy-bed-BwWkRhe2.svg",Nu="/kids-house-game/assets/cat-bed-ChP4s69B.png",Fu="/kids-house-game/assets/cat-bed-B8ULFbHc.svg",ju="/kids-house-game/assets/cloud-rug-Bv3GScgR.png",Vu="/kids-house-game/assets/cloud-rug-CFl6aZc5.svg",Gu="/kids-house-game/assets/cloud-shelf-BAmU3DSp.png",Yu="/kids-house-game/assets/cloud-shelf-DF5b_IoZ.svg",Ku="/kids-house-game/assets/cork-board-B8yw-MFd.png",Xu="/kids-house-game/assets/cork-board-Bj5OuLbv.svg",Ju="/kids-house-game/assets/daisy-pot-BQDVlAug.png",e1="/kids-house-game/assets/daisy-pot-Cy8SrSS6.svg",t1="/kids-house-game/assets/desk-UTaBcI2Q.png",n1="/kids-house-game/assets/desk-2rRtV3Vk.svg",s1="/kids-house-game/assets/dino-plush-yhz7rVZD.png",o1="/kids-house-game/assets/dino-plush-Dq_qccf0.svg",i1="/kids-house-game/assets/doll-house-DfYMaHqJ.png",a1="/kids-house-game/assets/doll-house-BrC3RiST.svg",r1="/kids-house-game/assets/dresser-jJcAkDG_.png",l1="/kids-house-game/assets/dresser-__9TGuYc.svg",c1="/kids-house-game/assets/egg-chair-DobnnZdC.png",d1="/kids-house-game/assets/egg-chair-CtiaqWNQ.svg",f1="/kids-house-game/assets/floor-fan-C2R5oDHp.png",g1="/kids-house-game/assets/floor-fan-Dt9SIAmB.svg",h1="/kids-house-game/assets/guinea-pig-BzHyXlGo.png",p1="/kids-house-game/assets/guinea-pig-CwLeNU_S.svg",u1="/kids-house-game/assets/hamster-cage-zv59jo6b.png",m1="/kids-house-game/assets/hamster-cage-lQ6r7saV.svg",y1="/kids-house-game/assets/heart-rug-DYGPCKpT.png",k1="/kids-house-game/assets/heart-rug-CBDvH6Q6.svg",b1="/kids-house-game/assets/lava-lamp-Df-lJpLx.png",v1="/kids-house-game/assets/lava-lamp-DEuHvlco.svg",w1="/kids-house-game/assets/moon-night-light-JPI5SkUV.png",$1="/kids-house-game/assets/moon-night-light-CAKsjYZv.svg",x1="/kids-house-game/assets/nightstand-D3WOPlqw.png",_1="/kids-house-game/assets/nightstand-Bgsh0YUi.svg",M1="/kids-house-game/assets/paper-lantern-mpw1jXzL.png",L1="/kids-house-game/assets/paper-lantern-CErOGyrT.svg",C1="/kids-house-game/assets/piggy-bank-DaSktUUA.png",S1="/kids-house-game/assets/piggy-bank-DsHrmOcp.svg",B1="/kids-house-game/assets/plant-stand-BpU338ra.png",H1="/kids-house-game/assets/plant-stand-DDyIDaL0.svg",P1="/kids-house-game/assets/play-tent-ih6xOGXC.png",T1="/kids-house-game/assets/play-tent-Bsawe52j.svg",W1="/kids-house-game/assets/star-mobile-Bqyd_ikl.png",R1="/kids-house-game/assets/star-mobile-DzOGs-Jo.svg",E1="/kids-house-game/assets/toy-chest-DhEoVFj0.png",Q1="/kids-house-game/assets/toy-chest-6iPrDiZH.svg",A1="/kids-house-game/assets/toy-robot-Bfkjfj_6.png",U1="/kids-house-game/assets/toy-robot-OaCEwmDT.svg",z1="/kids-house-game/assets/toy-train-DILjZiya.png",D1="/kids-house-game/assets/toy-train-D5GqAnpy.svg",q1="/kids-house-game/assets/unicorn-plush-5YQqQjND.png",Z1="/kids-house-game/assets/unicorn-plush-C0W1eEs9.svg",I1="/kids-house-game/assets/wardrobe-sJcJSWZ2.png",O1="/kids-house-game/assets/wardrobe-Dn492IK0.svg",N1="/kids-house-game/assets/bananas-D4irRkGy.png",F1="/kids-house-game/assets/bananas-aPQwdEVo.svg",j1="/kids-house-game/assets/bar-stool-xbwaa01H.png",V1="/kids-house-game/assets/bar-stool-DWxhX1Ah.svg",G1="/kids-house-game/assets/bread-loaf-DKmR5wPN.png",Y1="/kids-house-game/assets/bread-loaf-C9cEAYcl.svg",K1="/kids-house-game/assets/chick-DCnoMwEt.png",X1="/kids-house-game/assets/chick-BTEVfgqU.svg",J1="/kids-house-game/assets/china-hutch-K3xtlmqi.png",em="/kids-house-game/assets/china-hutch-BTmMY6rg.svg",tm="/kids-house-game/assets/cocoa-mug-BmqSzNJ6.png",nm="/kids-house-game/assets/cocoa-mug-CraNCc9b.svg",sm="/kids-house-game/assets/cookie-jar-CZsO9PSp.png",om="/kids-house-game/assets/cookie-jar-ripj0oyT.svg",im="/kids-house-game/assets/cooking-pot-BSKPlqyT.png",am="/kids-house-game/assets/cooking-pot-BWtfOm9f.svg",rm="/kids-house-game/assets/cupcake-KO1KLKav.png",lm="/kids-house-game/assets/cupcake-DFCw42xb.svg",cm="/kids-house-game/assets/dish-rack-DICSEn5E.png",dm="/kids-house-game/assets/dish-rack-BpVmmU6k.svg",fm="/kids-house-game/assets/fruit-bowl-BL5EkaC8.png",gm="/kids-house-game/assets/fruit-bowl-Dw9lsB3B.svg",hm="/kids-house-game/assets/frying-pan-BocrLcES.png",pm="/kids-house-game/assets/frying-pan-CTBY6MC_.svg",um="/kids-house-game/assets/happy-fridge-BTbpm-W1.png",mm="/kids-house-game/assets/happy-fridge-D7ENuEJs.svg",ym="/kids-house-game/assets/herb-box-DFtC2qBN.png",km="/kids-house-game/assets/herb-box-CdRxefnV.svg",bm="/kids-house-game/assets/high-chair-DZCqRJV8.png",vm="/kids-house-game/assets/high-chair-BQtLYlq4.svg",wm="/kids-house-game/assets/ice-cream-CLLMXjn9.png",$m="/kids-house-game/assets/ice-cream-DydSyNXx.svg",xm="/kids-house-game/assets/kettle-DScYOeEK.png",_m="/kids-house-game/assets/kettle-D1nuAiG_.svg",Mm="/kids-house-game/assets/kitchen-counter-cZcDRQIw.png",Lm="/kids-house-game/assets/kitchen-counter-C8sTAZ-V.svg",Cm="/kids-house-game/assets/kitchen-sink-DrP43iga.png",Sm="/kids-house-game/assets/kitchen-sink-CYjDcd1n.svg",Bm="/kids-house-game/assets/lemon-tree-BwA7W0cM.png",Hm="/kids-house-game/assets/lemon-tree-CZz-Vy3P.svg",Pm="/kids-house-game/assets/microwave-BJRDd-L-.png",Tm="/kids-house-game/assets/microwave-lopm-FCT.svg",Wm="/kids-house-game/assets/milk-bottle-D7UB6VD8.png",Rm="/kids-house-game/assets/milk-bottle-DxcUA6XT.svg",Em="/kids-house-game/assets/pancakes-CbisCK-C.png",Qm="/kids-house-game/assets/pancakes-CLqxnc5R.svg",Am="/kids-house-game/assets/pantry-shelf-DI_CgvVD.png",Um="/kids-house-game/assets/pantry-shelf-Azdxpmzd.svg",zm="/kids-house-game/assets/pendant-lamp-BhZanag5.png",Dm="/kids-house-game/assets/pendant-lamp-fZv6y1p0.svg",qm="/kids-house-game/assets/pet-bowl-Oe3KGELz.png",Zm="/kids-house-game/assets/pet-bowl-ETL_EOAP.svg",Im="/kids-house-game/assets/rice-cooker-DUTXsBbb.png",Om="/kids-house-game/assets/rice-cooker-JX0L4bi2.svg",Nm="/kids-house-game/assets/runner-rug-AYIsQudU.png",Fm="/kids-house-game/assets/runner-rug-BbUgZFy4.svg",jm="/kids-house-game/assets/spice-rack-8ll-6Q2f.png",Vm="/kids-house-game/assets/spice-rack-D9kAw-vT.svg",Gm="/kids-house-game/assets/stand-mixer-CP2fpC-Q.png",Ym="/kids-house-game/assets/stand-mixer-CZrLn00l.svg",Km="/kids-house-game/assets/teapot-iFnJNGiA.png",Xm="/kids-house-game/assets/teapot-CtPOJzEm.svg",Jm="/kids-house-game/assets/toaster-T2WkZkdo.png",e2="/kids-house-game/assets/toaster-CNk0hJDw.svg",t2="/kids-house-game/assets/utensil-rail-_vjcgBpy.png",n2="/kids-house-game/assets/utensil-rail-B0QkGP3A.svg",s2="/kids-house-game/assets/watermelon-slice-yHBcfKGj.png",o2="/kids-house-game/assets/watermelon-slice-VzvgalD5.svg",i2="/kids-house-game/assets/aquarium-rYRAu69m.png",a2="/kids-house-game/assets/aquarium-BlhJ9UCr.svg",r2="/kids-house-game/assets/arc-floor-lamp-CBq3G9j8.png",l2="/kids-house-game/assets/arc-floor-lamp-DL5cEVzq.svg",c2="/kids-house-game/assets/bean-bag-CMLYRsbz.png",d2="/kids-house-game/assets/bean-bag-CauyDuZQ.svg",f2="/kids-house-game/assets/bird-cage-qj5P0te2.png",g2="/kids-house-game/assets/bird-cage-xqeVahX7.svg",h2="/kids-house-game/assets/blanket-basket-5IQiUSS2.png",p2="/kids-house-game/assets/blanket-basket-B4LREUo9.svg",u2="/kids-house-game/assets/building-blocks-CzqAFUNB.png",m2="/kids-house-game/assets/building-blocks-DbtoodPT.svg",y2="/kids-house-game/assets/coffee-table-iKZ20Gpy.png",k2="/kids-house-game/assets/coffee-table-ZYO2ApH6.svg",b2="/kids-house-game/assets/comfy-armchair-U_SI3sk9.png",v2="/kids-house-game/assets/comfy-armchair-tjNYbfgO.svg",w2="/kids-house-game/assets/cubby-shelf-B0De91CO.png",$2="/kids-house-game/assets/cubby-shelf-CLzTUpiz.svg",x2="/kids-house-game/assets/daisy-rug-BqSOjPlJ.png",_2="/kids-house-game/assets/daisy-rug-CvOlxjsu.svg",M2="/kids-house-game/assets/fiddle-leaf-fig-DnvG8l2j.png",L2="/kids-house-game/assets/fiddle-leaf-fig-DiUNW4Q_.svg",C2="/kids-house-game/assets/fireplace-C9azNipx.png",S2="/kids-house-game/assets/fireplace-CqxIMN3Z.svg",B2="/kids-house-game/assets/globe-C-L7vS0t.png",H2="/kids-house-game/assets/globe-DN0sih3W.svg",P2="/kids-house-game/assets/hanging-planter-DGgUXZpP.png",T2="/kids-house-game/assets/hanging-planter-M9IHqztp.svg",W2="/kids-house-game/assets/monstera-plant-BbGZQtOh.png",R2="/kids-house-game/assets/monstera-plant-CLmuB_RM.svg",E2="/kids-house-game/assets/piano-DpS7nvdq.png",Q2="/kids-house-game/assets/piano-Y0KQ4rD2.svg",A2="/kids-house-game/assets/popcorn-CFk12JbR.png",U2="/kids-house-game/assets/popcorn-BD2d8sUH.svg",z2="/kids-house-game/assets/pouf-DY0Vcx75.png",D2="/kids-house-game/assets/pouf-as0li8On.svg",q2="/kids-house-game/assets/rainbow-rug-DwzLb6aY.png",Z2="/kids-house-game/assets/rainbow-rug-C5ZVauOA.svg",I2="/kids-house-game/assets/rainbow-wall-art--5LLrrQJ.png",O2="/kids-house-game/assets/rainbow-wall-art-CCXUPPen.svg",N2="/kids-house-game/assets/retro-radio-BIX4GYkL.png",F2="/kids-house-game/assets/retro-radio-B3T98xMQ.svg",j2="/kids-house-game/assets/rocking-chair-CDLlJFiP.png",V2="/kids-house-game/assets/rocking-chair-BgoIQu5H.svg",G2="/kids-house-game/assets/rocking-horse-Iz-CpscK.png",Y2="/kids-house-game/assets/rocking-horse-1WLLV43R.svg",K2="/kids-house-game/assets/snake-plant-DgPna4k9.png",X2="/kids-house-game/assets/snake-plant-BGDwPcMj.svg",J2="/kids-house-game/assets/string-lights-nDUZa5m1.png",ey="/kids-house-game/assets/string-lights-DGC0Ni2I.svg",ty="/kids-house-game/assets/succulent-trio-VYNH-o5B.png",ny="/kids-house-game/assets/succulent-trio-uPD-ljlL.svg",sy="/kids-house-game/assets/tassel-rug-BBXtknxh.png",oy="/kids-house-game/assets/tassel-rug-DolXtxfQ.svg",iy="/kids-house-game/assets/throw-pillow-BjuGXMYA.png",ay="/kids-house-game/assets/throw-pillow-qWyWQ9cT.svg",ry="/kids-house-game/assets/toy-car-Bwrt0-AT.png",ly="/kids-house-game/assets/toy-car-CTJy5H4V.svg",cy="/kids-house-game/assets/tulip-vase-CpQUgXPR.png",dy="/kids-house-game/assets/tulip-vase-o2vjI1Hg.svg",fy="/kids-house-game/assets/turtle-Bf8_yRql.png",gy="/kids-house-game/assets/turtle-B9Y6NDSv.svg",hy="/kids-house-game/assets/tv-stand-DnwT-hn4.png",py="/kids-house-game/assets/tv-stand-CcLHFc1J.svg",uy="/kids-house-game/assets/wall-shelf-Bs6mROe1.png",my="/kids-house-game/assets/wall-shelf-CCWuZ6Xl.svg",yy="/kids-house-game/assets/cc-bakery-shelf-dMrnZVB3.png",ky="/kids-house-game/assets/cc-bakery-shelf-BxdhLTTC.svg",by="/kids-house-game/assets/cc-breakfast-table-DwHbMV2p.png",vy="/kids-house-game/assets/cc-breakfast-table-DwaO0eFy.svg",wy="/kids-house-game/assets/cc-bubble-chair-DuDi-bRz.png",$y="/kids-house-game/assets/cc-bubble-chair-DncHA7F-.svg",xy="/kids-house-game/assets/cc-canopy-daybed-CAZpSo2a.png",_y="/kids-house-game/assets/cc-canopy-daybed-CVbt6QDr.svg",My="/kids-house-game/assets/cc-cloud-beanbag-BYcBLKf9.png",Ly="/kids-house-game/assets/cc-cloud-beanbag-SM0m-3qY.svg",Cy="/kids-house-game/assets/cc-cloud-lamp-v0UO1VrK.png",Sy="/kids-house-game/assets/cc-cloud-lamp-BWwxoCux.svg",By="/kids-house-game/assets/cc-cottage-aquarium-XYuN1CnR.png",Hy="/kids-house-game/assets/cc-cottage-aquarium-iY2D26Vq.svg",Py="/kids-house-game/assets/cc-cupcake-stand-jKA3zoCC.png",Ty="/kids-house-game/assets/cc-cupcake-stand-B08kdXZL.svg",Wy="/kids-house-game/assets/cc-dryer-chair-CP8q6yyq.png",Ry="/kids-house-game/assets/cc-dryer-chair-DQmosxUz.svg",Ey="/kids-house-game/assets/cc-fairy-garland-B4DVLP6L.png",Qy="/kids-house-game/assets/cc-fairy-garland-BncKvkRL.svg",Ay="/kids-house-game/assets/cc-fairy-shelf-DSmhC08i.png",Uy="/kids-house-game/assets/cc-fairy-shelf-CE6x7J1w.svg",zy="/kids-house-game/assets/cc-flower-kettle-DZFkbEk5.png",Dy="/kids-house-game/assets/cc-flower-kettle-ZTbAh26L.svg",qy="/kids-house-game/assets/cc-flower-lamp-hc1e4xxL.png",Zy="/kids-house-game/assets/cc-flower-lamp-CS2T2S89.svg",Iy="/kids-house-game/assets/cc-heart-bed-BtOx4_a4.png",Oy="/kids-house-game/assets/cc-heart-bed-76-z9nJg.svg",Ny="/kids-house-game/assets/cc-heart-clock-CLtzUj8w.png",Fy="/kids-house-game/assets/cc-heart-clock-ByixSFru.svg",jy="/kids-house-game/assets/cc-heart-pouf-C3vCLnoM.png",Vy="/kids-house-game/assets/cc-heart-pouf-DH5J2s2J.svg",Gy="/kids-house-game/assets/cc-heart-rug-CpvyM_wf.png",Yy="/kids-house-game/assets/cc-heart-rug-Jwmh-m0j.svg",Ky="/kids-house-game/assets/cc-jewel-box-DZ6IxYiU.png",Xy="/kids-house-game/assets/cc-jewel-box-qMbIQmo4.svg",Jy="/kids-house-game/assets/cc-light-vanity-BxKLJiVW.png",e4="/kids-house-game/assets/cc-light-vanity-DD4uQJ_7.svg",t4="/kids-house-game/assets/cc-macaron-jar-NI43JiPM.png",n4="/kids-house-game/assets/cc-macaron-jar-A0sT-Lvj.svg",s4="/kids-house-game/assets/cc-macrame-swing-x8sop4y4.png",o4="/kids-house-game/assets/cc-macrame-swing-qIcoPp0o.svg",i4="/kids-house-game/assets/cc-mani-chair-C1J_zCFX.png",a4="/kids-house-game/assets/cc-mani-chair-7AWb60tv.svg",r4="/kids-house-game/assets/cc-mint-fridge-7zQk2-Kj.png",l4="/kids-house-game/assets/cc-mint-fridge-Cc87e_gW.svg",c4="/kids-house-game/assets/cc-mushroom-stool-DeoO7P27.png",d4="/kids-house-game/assets/cc-mushroom-stool-B9-y9WNf.svg",f4="/kids-house-game/assets/cc-pastel-range-CXu-Gr6f.png",g4="/kids-house-game/assets/cc-pastel-range-D6cjzJTl.svg",h4="/kids-house-game/assets/cc-perfume-tray-DkUHaA_i.png",p4="/kids-house-game/assets/cc-perfume-tray-DN4chcIn.svg",u4="/kids-house-game/assets/cc-petal-table-DadCDnSy.png",m4="/kids-house-game/assets/cc-petal-table-QrNho7KH.svg",y4="/kids-house-game/assets/cc-plant-wall-CCxqRxsH.png",k4="/kids-house-game/assets/cc-plant-wall-BMii8_kR.svg",b4="/kids-house-game/assets/cc-reading-nook-Eq4Eh0MW.png",v4="/kids-house-game/assets/cc-reading-nook-wiDgasP8.svg",w4="/kids-house-game/assets/cc-record-player-LmfaPaE5.png",$4="/kids-house-game/assets/cc-record-player-BoxZhHLy.svg",x4="/kids-house-game/assets/cc-ribbon-mirror-BEsGok51.png",_4="/kids-house-game/assets/cc-ribbon-mirror-DiCje_iy.svg",M4="/kids-house-game/assets/cc-scallop-curtains-Cvab-FzV.png",L4="/kids-house-game/assets/cc-scallop-curtains-Bzhy2peV.svg",C4="/kids-house-game/assets/cc-scallop-loveseat-CR3Z2O-W.png",S4="/kids-house-game/assets/cc-scallop-loveseat-Dfi7dg3b.svg",B4="/kids-house-game/assets/cc-star-dresser-b15t-WLI.png",H4="/kids-house-game/assets/cc-star-dresser-2wqSnsip.svg",P4="/kids-house-game/assets/cc-teapot-set-ygQBLdbl.png",T4="/kids-house-game/assets/cc-teapot-set-DnZlJvn7.svg",W4="/kids-house-game/assets/cc-window-seat-D-Rfuuwm.png",R4="/kids-house-game/assets/cc-window-seat-BCOise4Z.svg",E4="/kids-house-game/assets/arched-shelf-Dt4oWiBK.png",Q4="/kids-house-game/assets/arched-shelf-XtiqRVaT.svg",A4="/kids-house-game/assets/blob-rug-Ckw1kSsa.png",U4="/kids-house-game/assets/blob-rug-Deh5k10s.svg",z4="/kids-house-game/assets/bubbly-plant-CV9ioei6.png",D4="/kids-house-game/assets/bubbly-plant-CFTOJd5Y.svg",q4="/kids-house-game/assets/bud-vase-Bzj5qGgr.png",Z4="/kids-house-game/assets/bud-vase-Dup4WQ5y.svg",I4="/kids-house-game/assets/comb-brush-CfTGGk1L.png",O4="/kids-house-game/assets/comb-brush-oPJeQv0v.svg",N4="/kids-house-game/assets/cream-jars-dLRXypJR.png",F4="/kids-house-game/assets/cream-jars-D6bxrnJR.svg",j4="/kids-house-game/assets/drop-lamp-DWqiPjZB.png",V4="/kids-house-game/assets/drop-lamp-CJg63ZKz.svg",G4="/kids-house-game/assets/droplet-buddy-DCjbvrlK.png",Y4="/kids-house-game/assets/droplet-buddy-DTpHggFh.svg",K4="/kids-house-game/assets/fancy-sofa-BRlr2j8I.png",X4="/kids-house-game/assets/fancy-sofa-kq2L0ob5.svg",J4="/kids-house-game/assets/flower-cart-C3W7v2RD.png",e6="/kids-house-game/assets/flower-cart-BWgfg0s_.svg",t6="/kids-house-game/assets/foot-spa-HwiSNgdS.png",n6="/kids-house-game/assets/foot-spa-DdA5_fj_.svg",s6="/kids-house-game/assets/globe-pendants-ChKRw_Bp.png",o6="/kids-house-game/assets/globe-pendants-DNV5WnAO.svg",i6="/kids-house-game/assets/glow-mirror-D4P3UibJ.png",a6="/kids-house-game/assets/glow-mirror-C_dTGwQc.svg",r6="/kids-house-game/assets/gold-floor-mirror-CSYqaszS.png",l6="/kids-house-game/assets/gold-floor-mirror-jfPQepmr.svg",c6="/kids-house-game/assets/hair-dryer-_nFRnXBv.png",d6="/kids-house-game/assets/hair-dryer-CAkhCf7J.svg",f6="/kids-house-game/assets/heart-plant-CN47o4my.png",g6="/kids-house-game/assets/heart-plant-fSU4uLVy.svg",h6="/kids-house-game/assets/heart-pouf-b76ZFT07.png",p6="/kids-house-game/assets/heart-pouf-BMVPBVKJ.svg",u6="/kids-house-game/assets/lilac-curtain-94MUZIqr.png",m6="/kids-house-game/assets/lilac-curtain-D_mFsZKu.svg",y6="/kids-house-game/assets/lotion-trio-wGXg7qdC.png",k6="/kids-house-game/assets/lotion-trio-D3lKwvho.svg",b6="/kids-house-game/assets/mani-lamp-B6MLP1xK.png",v6="/kids-house-game/assets/mani-lamp-B4SmvhvS.svg",w6="/kids-house-game/assets/nail-table-CP0_pEA8.png",$6="/kids-house-game/assets/nail-table-C3FitmuG.svg",x6="/kids-house-game/assets/pebble-rug-BgHMxQ6Q.png",_6="/kids-house-game/assets/pebble-rug-DHBZUggl.svg",M6="/kids-house-game/assets/perfume-bottle-F_MkREQh.png",L6="/kids-house-game/assets/perfume-bottle-BcNXSWTW.svg",C6="/kids-house-game/assets/pink-fountain-DtB69ljQ.png",S6="/kids-house-game/assets/pink-fountain-DQ3CIetr.svg",B6="/kids-house-game/assets/pink-vanity-CPmOesS7.png",H6="/kids-house-game/assets/pink-vanity-qE3SwdD6.svg",P6="/kids-house-game/assets/polish-bottle-B2f4PsGZ.png",T6="/kids-house-game/assets/polish-bottle-VWed8EQ-.svg",W6="/kids-house-game/assets/polish-rack-ANlncwDe.png",R6="/kids-house-game/assets/polish-rack-8Ph2n2nM.svg",E6="/kids-house-game/assets/reception-desk-DnhqgkHu.png",Q6="/kids-house-game/assets/reception-desk-D4Gevx64.svg",A6="/kids-house-game/assets/salon-chair-Bl31ZE_E.png",U6="/kids-house-game/assets/salon-chair-Wj2sOSW8.svg",z6="/kids-house-game/assets/scent-candle-BYUsO9s1.png",D6="/kids-house-game/assets/scent-candle-BEUE-6Uv.svg",q6="/kids-house-game/assets/spray-bottle-DJKZeNmL.png",Z6="/kids-house-game/assets/spray-bottle-Bc8iuceJ.svg",I6="/kids-house-game/assets/star-wall-sign-D_9XhB91.png",O6="/kids-house-game/assets/star-wall-sign-DvenTqvU.svg",N6="/kids-house-game/assets/swivel-stool-BGAwWXNX.png",F6="/kids-house-game/assets/swivel-stool-P-Egqq_Z.svg",j6="/kids-house-game/assets/tiered-tray-CGuVyK1K.png",V6="/kids-house-game/assets/tiered-tray-DLnZTsUF.svg",G6="/kids-house-game/assets/towel-cart-5At-syZP.png",Y6="/kids-house-game/assets/towel-cart-DJmR97UL.svg",K6="/kids-house-game/assets/towel-stack-D-pX5koc.png",X6="/kids-house-game/assets/towel-stack-C1qplZ4T.svg",J6="/kids-house-game/assets/vine-planter-mviuZvkw.png",ek="/kids-house-game/assets/vine-planter-Duhx9OMZ.svg",tk="/kids-house-game/assets/waiting-bench-DXbi7ObC.png",nk="/kids-house-game/assets/waiting-bench-BQuoXbE3.svg",sk="/kids-house-game/assets/wash-chair-CJo64U_O.png",ok="/kids-house-game/assets/wash-chair-sdgNnj79.svg",ik="/kids-house-game/assets/arched-mirror-2vakzmQ8.png",ak="/kids-house-game/assets/arched-mirror-ClJgTBd9.svg",rk="/kids-house-game/assets/big-monitor-BRiCdofl.png",lk="/kids-house-game/assets/big-monitor-jx5PnUa_.svg",ck="/kids-house-game/assets/boba-cup-Dn_S1oAa.png",dk="/kids-house-game/assets/boba-cup-CwUerXNm.svg",fk="/kids-house-game/assets/bubble-bath-D4AZavWB.png",gk="/kids-house-game/assets/bubble-bath-8VwrkImA.svg",hk="/kids-house-game/assets/cactus-buddy-D_lAS12Y.png",pk="/kids-house-game/assets/cactus-buddy-D3uacuVA.svg",uk="/kids-house-game/assets/caterpillar-plush-vK3r58Ch.png",mk="/kids-house-game/assets/caterpillar-plush-BhR8Pydf.svg",yk="/kids-house-game/assets/checker-bed-DD4Ra6RV.png",kk="/kids-house-game/assets/checker-bed-mtuxfPje.svg",bk="/kids-house-game/assets/checker-rug-C9Gs09p_.png",vk="/kids-house-game/assets/checker-rug-CmSO3Y4j.svg",wk="/kids-house-game/assets/clothes-rail-CJ8Du1xN.png",$k="/kids-house-game/assets/clothes-rail-BY-f9coz.svg",xk="/kids-house-game/assets/cloud-sofa-3eVlcAzs.png",_k="/kids-house-game/assets/cloud-sofa-CZS1Y5s-.svg",Mk="/kids-house-game/assets/cube-shelf-DPFNgFhk.png",Lk="/kids-house-game/assets/cube-shelf-DoI0tLGL.svg",Ck="/kids-house-game/assets/curvy-desk-BxyVtcg3.png",Sk="/kids-house-game/assets/curvy-desk-eWCvec1f.svg",Bk="/kids-house-game/assets/cute-speaker-Cy7ml0bm.png",Hk="/kids-house-game/assets/cute-speaker-DrVF9uns.svg",Pk="/kids-house-game/assets/desk-lamp-B39R5SBQ.png",Tk="/kids-house-game/assets/desk-lamp-C-VtrE1V.svg",Wk="/kids-house-game/assets/desk-mic-C-4XirP6.png",Rk="/kids-house-game/assets/desk-mic-BqYzh6ma.svg",Ek="/kids-house-game/assets/flower-lamp-DyDRXGpR.png",Qk="/kids-house-game/assets/flower-lamp-Dpz6tQ2x.svg",Ak="/kids-house-game/assets/frog-plush-NmeU5sHZ.png",Uk="/kids-house-game/assets/frog-plush-BhkTrE24.svg",zk="/kids-house-game/assets/game-controller-B6phnmU4.png",Dk="/kids-house-game/assets/game-controller-6gvwykQG.svg",qk="/kids-house-game/assets/gaming-chair-B7ZnwG2W.png",Zk="/kids-house-game/assets/gaming-chair-BCyGMzy0.svg",Ik="/kids-house-game/assets/hamster-pet-C09aLs5N.png",Ok="/kids-house-game/assets/hamster-pet-LBcghoJj.svg",Nk="/kids-house-game/assets/headphones-MRHfNh-e.png",Fk="/kids-house-game/assets/headphones-Cjjqt_92.svg",jk="/kids-house-game/assets/heart-light-B6LXGE4j.png",Vk="/kids-house-game/assets/heart-light-DfDwRHju.svg",Gk="/kids-house-game/assets/keyboard-Dvxz1PEW.png",Yk="/kids-house-game/assets/keyboard-Cbtwvtj1.svg",Kk="/kids-house-game/assets/mini-fridge-DgYceOBW.png",Xk="/kids-house-game/assets/mini-fridge-qdNm4NKf.svg",Jk="/kids-house-game/assets/pastel-wardrobe-CFIOdtrx.png",e8="/kids-house-game/assets/pastel-wardrobe-BubkWAN2.svg",t8="/kids-house-game/assets/phone-stand-CWfRuwT_.png",n8="/kids-house-game/assets/phone-stand-VLW-DsK-.svg",s8="/kids-house-game/assets/pothos-plant-mnKAaH_K.png",o8="/kids-house-game/assets/pothos-plant-C1I15M9a.svg",i8="/kids-house-game/assets/puffy-stool-B5z3sd2l.png",a8="/kids-house-game/assets/puffy-stool-CwjoblCa.svg",r8="/kids-house-game/assets/ring-light-BoqM9Lks.png",l8="/kids-house-game/assets/ring-light-CdxNAXA6.svg",c8="/kids-house-game/assets/side-table-round-x1NbWzDq.png",d8="/kids-house-game/assets/side-table-round-rCsBU0YO.svg",f8="/kids-house-game/assets/star-lamp-Bocs3YRP.png",g8="/kids-house-game/assets/star-lamp-CHKQnzvB.svg",h8="/kids-house-game/assets/sticker-board-CMn2BF_D.png",p8="/kids-house-game/assets/sticker-board-LUm1_I_P.svg",u8="/kids-house-game/assets/sunny-art-372bwMLG.png",m8="/kids-house-game/assets/sunny-art-C25M7k02.svg",y8="/kids-house-game/assets/sv-bean-bag-DlsJBRMG.png",k8="/kids-house-game/assets/sv-bean-bag-DdsCYd4e.svg",b8="/kids-house-game/assets/sv-cloud-rug-Bo5aP_HP.png",v8="/kids-house-game/assets/sv-cloud-rug-BvczSj77.svg",w8="/kids-house-game/assets/sv-wall-shelf-C61Y5OFn.png",$8="/kids-house-game/assets/sv-wall-shelf-BtJLzNMg.svg",x8="/kids-house-game/assets/vlog-camera-DAiD7LSW.png",_8="/kids-house-game/assets/vlog-camera-CBd28A7P.svg",M8="/kids-house-game/assets/wavy-floor-lamp-1BJBLV8q.png",L8="/kids-house-game/assets/wavy-floor-lamp-Iy8llzr8.svg",C8="/kids-house-game/assets/acorn-friend-SMoU5de2.png",S8="/kids-house-game/assets/acorn-friend-BsLiZ2Z_.svg",B8="/kids-house-game/assets/apple-tree-CN7tYao3.png",H8="/kids-house-game/assets/apple-tree-DGIUIjY1.svg",P8="/kids-house-game/assets/big-wardrobe-DcZpROWW.png",T8="/kids-house-game/assets/big-wardrobe-BnfnkPXl.svg",W8="/kids-house-game/assets/box-stack-DBdO-RRV.png",R8="/kids-house-game/assets/box-stack-ji13G2mP.svg",E8="/kids-house-game/assets/brick-fireplace-CxelyhgA.png",Q8="/kids-house-game/assets/brick-fireplace-BGCbiSK5.svg",A8="/kids-house-game/assets/bulletin-board-BWUCktvK.png",U8="/kids-house-game/assets/bulletin-board-DqA69wQH.svg",z8="/kids-house-game/assets/cozy-mug-DGMQRJK7.png",D8="/kids-house-game/assets/cozy-mug-CFJEPRKb.svg",q8="/kids-house-game/assets/cream-sofa-Dzaz9Eg9.png",Z8="/kids-house-game/assets/cream-sofa-CB4EWIDp.svg",I8="/kids-house-game/assets/fire-pit-FhRYTkJU.png",O8="/kids-house-game/assets/fire-pit-B1yBwTwI.svg",N8="/kids-house-game/assets/glass-cabinet-C1Dud5Om.png",F8="/kids-house-game/assets/glass-cabinet-BCHExP4F.svg",j8="/kids-house-game/assets/hanging-lantern-5_A0FrVU.png",V8="/kids-house-game/assets/hanging-lantern-DZbXB8L1.svg",G8="/kids-house-game/assets/knit-cushion-CeEpuawZ.png",Y8="/kids-house-game/assets/knit-cushion-DUewI6rR.svg",K8="/kids-house-game/assets/ladder-shelf-kDBx9ho_.png",X8="/kids-house-game/assets/ladder-shelf-DXYDmQiE.svg",J8="/kids-house-game/assets/landscape-art-CXy-fkYO.png",eb="/kids-house-game/assets/landscape-art-CdCqCPL2.svg",tb="/kids-house-game/assets/lattice-bench-BQ7wYgqI.png",nb="/kids-house-game/assets/lattice-bench-D3zCZTQp.svg",sb="/kids-house-game/assets/leaf-wreath-01dJ9WfP.png",ob="/kids-house-game/assets/leaf-wreath-DUjq1MWh.svg",ib="/kids-house-game/assets/mini-greenhouse-DLsY7-VZ.png",ab="/kids-house-game/assets/mini-greenhouse-CGE5F9A_.svg",rb="/kids-house-game/assets/moving-box-DszcEI-k.png",lb="/kids-house-game/assets/moving-box-CZXbXcJO.svg",cb="/kids-house-game/assets/picnic-basket-CYmGfWoy.png",db="/kids-house-game/assets/picnic-basket-D72DCNRY.svg",fb="/kids-house-game/assets/round-rug-DZTiY9p2.png",gb="/kids-house-game/assets/round-rug-D8ePosbv.svg",hb="/kids-house-game/assets/sale-sign-CLwCvavX.png",pb="/kids-house-game/assets/sale-sign-CXWpgQt5.svg",ub="/kids-house-game/assets/sprout-pot-BlPwmBjK.png",mb="/kids-house-game/assets/sprout-pot-BbXk09mS.svg",yb="/kids-house-game/assets/stripe-runner-CWfHHL2f.png",kb="/kids-house-game/assets/stripe-runner-ClycKEW5.svg",bb="/kids-house-game/assets/trailing-plant-BBqKhPvp.png",vb="/kids-house-game/assets/trailing-plant-NbG7dy8O.svg",wb="/kids-house-game/assets/wall-clock-ItDQFPVO.png",$b="/kids-house-game/assets/wall-clock-CDC1o6eG.svg",xb="/kids-house-game/assets/wh-arc-floor-lamp-Dg8j_uAI.png",_b="/kids-house-game/assets/wh-arc-floor-lamp-BKVes2Fd.svg",Mb="/kids-house-game/assets/wh-book-stack-9oDTUUnY.png",Lb="/kids-house-game/assets/wh-book-stack-DjDFey2h.svg",Cb="/kids-house-game/assets/wh-dresser-DhrzqcZ2.png",Sb="/kids-house-game/assets/wh-dresser-Y-jnNt5q.svg",Bb="/kids-house-game/assets/wh-fiddle-leaf-fig-Bt0Bc12k.png",Hb="/kids-house-game/assets/wh-fiddle-leaf-fig-B0-kGmHI.svg",Pb="/kids-house-game/assets/wh-kitchen-counter-BWikwkWo.png",Tb="/kids-house-game/assets/wh-kitchen-counter-BtBenu6u.svg",Wb="/kids-house-game/assets/wh-nightstand-BXusZ0A4.png",Rb="/kids-house-game/assets/wh-nightstand-DPUoV5aO.svg",Eb="/kids-house-game/assets/wh-pendant-lamp-DbfSrUho.png",Qb="/kids-house-game/assets/wh-pendant-lamp-DBg4p7hi.svg",Ab="/kids-house-game/assets/wh-snake-plant-kt_6Tus5.png",Ub="/kids-house-game/assets/wh-snake-plant-Cj3bHF25.svg",zb="/kids-house-game/assets/wh-string-lights-CWVP27K_.png",Db="/kids-house-game/assets/wh-string-lights-C3JVBkgW.svg",qb="/kids-house-game/assets/wh-teapot-BclPHtYN.png",Zb="/kids-house-game/assets/wh-teapot-kevlW5hN.svg",Ib="/kids-house-game/assets/wood-armchair-BoX1llWe.png",Ob="/kids-house-game/assets/wood-armchair-DNVhKBWe.svg",Nb="/kids-house-game/assets/wood-bookshelf-CfgOK-7q.png",Fb="/kids-house-game/assets/wood-bookshelf-CvT7GAuI.svg",jb="/kids-house-game/assets/wood-coffee-table-DmAJknnU.png",Vb="/kids-house-game/assets/wood-coffee-table-CuAR_7Kr.svg",Gb="/kids-house-game/assets/wood-desk-S1h5jwM2.png",Yb="/kids-house-game/assets/wood-desk-DPCJq_XQ.svg",Kb="/kids-house-game/assets/wood-stool-BWBID67e.png",Xb="/kids-house-game/assets/wood-stool-CV7YeZwC.svg",Jb="/kids-house-game/assets/wooden-bed-511IemjK.png",ev="/kids-house-game/assets/wooden-bed-Qj-sf8yq.svg",tv="/kids-house-game/assets/cc-butter-polka-DGTIwtTO.png",nv="/kids-house-game/assets/cc-butter-polka-CmiHLPHI.svg",sv="/kids-house-game/assets/cc-cream-hex-DMlsmhhY.png",ov="/kids-house-game/assets/cc-cream-hex-Bkf3o84Z.svg",iv="/kids-house-game/assets/cc-lavender-lattice-D6QyuSPi.png",av="/kids-house-game/assets/cc-lavender-lattice-DhxILx5n.svg",rv="/kids-house-game/assets/cc-lilac-gingham-C8gKChr3.png",lv="/kids-house-game/assets/cc-lilac-gingham-C-WPjvD8.svg",cv="/kids-house-game/assets/cc-mint-checks-Bj1xaUgE.png",dv="/kids-house-game/assets/cc-mint-checks-BKmyOLlr.svg",fv="/kids-house-game/assets/cc-mint-florals-DubHlfkl.png",gv="/kids-house-game/assets/cc-mint-florals-Dz8qRBHw.svg",hv="/kids-house-game/assets/cc-peach-scallops-3xV_Pu-6.png",pv="/kids-house-game/assets/cc-peach-scallops-GPn_mXbS.svg",uv="/kids-house-game/assets/cc-pink-plaid-C9HKdB4f.png",mv="/kids-house-game/assets/cc-pink-plaid-VgppBwax.svg",yv="/kids-house-game/assets/cc-rag-planks-B67vRZlX.png",kv="/kids-house-game/assets/cc-rag-planks-C5Hombhc.svg",bv="/kids-house-game/assets/cc-rose-herringbone-Cmke3vGv.png",vv="/kids-house-game/assets/cc-rose-herringbone-CQRix6_f.svg",wv="/kids-house-game/assets/lilac-stripes-DcsSoVwO.png",$v="/kids-house-game/assets/lilac-stripes-yb9DhjTf.svg",xv="/kids-house-game/assets/lilac-terrazzo-DOghNP_d.png",_v="/kids-house-game/assets/lilac-terrazzo-8CaN2qhK.svg",Mv="/kids-house-game/assets/mint-bubbles-DtsYAubK.png",Lv="/kids-house-game/assets/mint-bubbles-BIQM5a2P.svg",Cv="/kids-house-game/assets/pink-check-floor-DjPuYxlq.png",Sv="/kids-house-game/assets/pink-check-floor-Cy9k3Fal.svg",Bv="/kids-house-game/assets/pink-hearts-DP4TxPV5.png",Hv="/kids-house-game/assets/pink-hearts-BpVCT-98.svg",Pv="/kids-house-game/assets/cloud-sky-CbZL0zcC.svg",Tv="/kids-house-game/assets/pastel-planks-BAcEss7w.svg",Wv="/kids-house-game/assets/soft-carpet-BSwTSDW1.svg",Rv="/kids-house-game/assets/star-sprinkle-5bH7qjW0.svg",Ev="/kids-house-game/assets/tiny-hearts-C-RHlg1h.svg",Qv="/kids-house-game/assets/butter-check-floor-yLFbEdi4.png",Av="/kids-house-game/assets/butter-check-floor-C8HdmZ0P.svg",Uv="/kids-house-game/assets/mint-checks-7rTweT19.png",zv="/kids-house-game/assets/mint-checks-rWbOdhfH.svg",Dv="/kids-house-game/assets/sky-clouds-9-shWk3w.png",qv="/kids-house-game/assets/sky-clouds-DUJlygwI.svg",Zv="/kids-house-game/assets/sky-tiles-Cu-Ga741.png",Iv="/kids-house-game/assets/sky-tiles-xxuodD5m.svg",Ov="/kids-house-game/assets/sunny-stars-Bc3CbIvZ.png",Nv="/kids-house-game/assets/sunny-stars-C6fsFX70.svg",Fv="/kids-house-game/assets/leafy-cream-Cv5o-u-w.png",jv="/kids-house-game/assets/leafy-cream-WIcyLI1T.svg",Vv="/kids-house-game/assets/orange-gingham-BjUerG-F.png",Gv="/kids-house-game/assets/orange-gingham-CVNizWBt.svg",Yv="/kids-house-game/assets/terracotta-tiles-dXqpLLce.png",Kv="/kids-house-game/assets/terracotta-tiles-j3yOSRI7.svg",Xv="/kids-house-game/assets/wood-panel-BGEVUu4R.png",Jv="/kids-house-game/assets/wood-panel-Dob8WRpW.svg",ew="/kids-house-game/assets/wood-planks-vE8-OOXo.png",tw="/kids-house-game/assets/wood-planks-4TUYjAkF.svg",Vc={small:80,medium:150,large:260},nw={"welcome-home":"Welcome Home","sunny-vibes":"Sunny Vibes",glossy:"Glossy",cottage:"Cozy Cottage"},Cf=e=>nw[e]??e.replace(/[-_]+/g," ").replace(/\b\w/g,t=>t.toUpperCase()),sw=Object.assign({"../assets/items/manifest.json":Pu,"../assets/patterns/manifest.json":Tu}),Gc=Object.assign({"../assets/items/bedroom/alarm-clock.png":Wu,"../assets/items/bedroom/alarm-clock.svg":Ru,"../assets/items/bedroom/bedtime-snack.png":Eu,"../assets/items/bedroom/bedtime-snack.svg":Qu,"../assets/items/bedroom/book-stack.png":Au,"../assets/items/bedroom/book-stack.svg":Uu,"../assets/items/bedroom/bunk-bed.png":zu,"../assets/items/bedroom/bunk-bed.svg":Du,"../assets/items/bedroom/bunny-slippers.png":qu,"../assets/items/bedroom/bunny-slippers.svg":Zu,"../assets/items/bedroom/canopy-bed.png":Iu,"../assets/items/bedroom/canopy-bed.svg":Ou,"../assets/items/bedroom/cat-bed.png":Nu,"../assets/items/bedroom/cat-bed.svg":Fu,"../assets/items/bedroom/cloud-rug.png":ju,"../assets/items/bedroom/cloud-rug.svg":Vu,"../assets/items/bedroom/cloud-shelf.png":Gu,"../assets/items/bedroom/cloud-shelf.svg":Yu,"../assets/items/bedroom/cork-board.png":Ku,"../assets/items/bedroom/cork-board.svg":Xu,"../assets/items/bedroom/daisy-pot.png":Ju,"../assets/items/bedroom/daisy-pot.svg":e1,"../assets/items/bedroom/desk.png":t1,"../assets/items/bedroom/desk.svg":n1,"../assets/items/bedroom/dino-plush.png":s1,"../assets/items/bedroom/dino-plush.svg":o1,"../assets/items/bedroom/doll-house.png":i1,"../assets/items/bedroom/doll-house.svg":a1,"../assets/items/bedroom/dresser.png":r1,"../assets/items/bedroom/dresser.svg":l1,"../assets/items/bedroom/egg-chair.png":c1,"../assets/items/bedroom/egg-chair.svg":d1,"../assets/items/bedroom/floor-fan.png":f1,"../assets/items/bedroom/floor-fan.svg":g1,"../assets/items/bedroom/guinea-pig.png":h1,"../assets/items/bedroom/guinea-pig.svg":p1,"../assets/items/bedroom/hamster-cage.png":u1,"../assets/items/bedroom/hamster-cage.svg":m1,"../assets/items/bedroom/heart-rug.png":y1,"../assets/items/bedroom/heart-rug.svg":k1,"../assets/items/bedroom/lava-lamp.png":b1,"../assets/items/bedroom/lava-lamp.svg":v1,"../assets/items/bedroom/moon-night-light.png":w1,"../assets/items/bedroom/moon-night-light.svg":$1,"../assets/items/bedroom/nightstand.png":x1,"../assets/items/bedroom/nightstand.svg":_1,"../assets/items/bedroom/paper-lantern.png":M1,"../assets/items/bedroom/paper-lantern.svg":L1,"../assets/items/bedroom/piggy-bank.png":C1,"../assets/items/bedroom/piggy-bank.svg":S1,"../assets/items/bedroom/plant-stand.png":B1,"../assets/items/bedroom/plant-stand.svg":H1,"../assets/items/bedroom/play-tent.png":P1,"../assets/items/bedroom/play-tent.svg":T1,"../assets/items/bedroom/star-mobile.png":W1,"../assets/items/bedroom/star-mobile.svg":R1,"../assets/items/bedroom/toy-chest.png":E1,"../assets/items/bedroom/toy-chest.svg":Q1,"../assets/items/bedroom/toy-robot.png":A1,"../assets/items/bedroom/toy-robot.svg":U1,"../assets/items/bedroom/toy-train.png":z1,"../assets/items/bedroom/toy-train.svg":D1,"../assets/items/bedroom/unicorn-plush.png":q1,"../assets/items/bedroom/unicorn-plush.svg":Z1,"../assets/items/bedroom/wardrobe.png":I1,"../assets/items/bedroom/wardrobe.svg":O1,"../assets/items/kitchen/bananas.png":N1,"../assets/items/kitchen/bananas.svg":F1,"../assets/items/kitchen/bar-stool.png":j1,"../assets/items/kitchen/bar-stool.svg":V1,"../assets/items/kitchen/bread-loaf.png":G1,"../assets/items/kitchen/bread-loaf.svg":Y1,"../assets/items/kitchen/chick.png":K1,"../assets/items/kitchen/chick.svg":X1,"../assets/items/kitchen/china-hutch.png":J1,"../assets/items/kitchen/china-hutch.svg":em,"../assets/items/kitchen/cocoa-mug.png":tm,"../assets/items/kitchen/cocoa-mug.svg":nm,"../assets/items/kitchen/cookie-jar.png":sm,"../assets/items/kitchen/cookie-jar.svg":om,"../assets/items/kitchen/cooking-pot.png":im,"../assets/items/kitchen/cooking-pot.svg":am,"../assets/items/kitchen/cupcake.png":rm,"../assets/items/kitchen/cupcake.svg":lm,"../assets/items/kitchen/dish-rack.png":cm,"../assets/items/kitchen/dish-rack.svg":dm,"../assets/items/kitchen/fruit-bowl.png":fm,"../assets/items/kitchen/fruit-bowl.svg":gm,"../assets/items/kitchen/frying-pan.png":hm,"../assets/items/kitchen/frying-pan.svg":pm,"../assets/items/kitchen/happy-fridge.png":um,"../assets/items/kitchen/happy-fridge.svg":mm,"../assets/items/kitchen/herb-box.png":ym,"../assets/items/kitchen/herb-box.svg":km,"../assets/items/kitchen/high-chair.png":bm,"../assets/items/kitchen/high-chair.svg":vm,"../assets/items/kitchen/ice-cream.png":wm,"../assets/items/kitchen/ice-cream.svg":$m,"../assets/items/kitchen/kettle.png":xm,"../assets/items/kitchen/kettle.svg":_m,"../assets/items/kitchen/kitchen-counter.png":Mm,"../assets/items/kitchen/kitchen-counter.svg":Lm,"../assets/items/kitchen/kitchen-sink.png":Cm,"../assets/items/kitchen/kitchen-sink.svg":Sm,"../assets/items/kitchen/lemon-tree.png":Bm,"../assets/items/kitchen/lemon-tree.svg":Hm,"../assets/items/kitchen/microwave.png":Pm,"../assets/items/kitchen/microwave.svg":Tm,"../assets/items/kitchen/milk-bottle.png":Wm,"../assets/items/kitchen/milk-bottle.svg":Rm,"../assets/items/kitchen/pancakes.png":Em,"../assets/items/kitchen/pancakes.svg":Qm,"../assets/items/kitchen/pantry-shelf.png":Am,"../assets/items/kitchen/pantry-shelf.svg":Um,"../assets/items/kitchen/pendant-lamp.png":zm,"../assets/items/kitchen/pendant-lamp.svg":Dm,"../assets/items/kitchen/pet-bowl.png":qm,"../assets/items/kitchen/pet-bowl.svg":Zm,"../assets/items/kitchen/rice-cooker.png":Im,"../assets/items/kitchen/rice-cooker.svg":Om,"../assets/items/kitchen/runner-rug.png":Nm,"../assets/items/kitchen/runner-rug.svg":Fm,"../assets/items/kitchen/spice-rack.png":jm,"../assets/items/kitchen/spice-rack.svg":Vm,"../assets/items/kitchen/stand-mixer.png":Gm,"../assets/items/kitchen/stand-mixer.svg":Ym,"../assets/items/kitchen/teapot.png":Km,"../assets/items/kitchen/teapot.svg":Xm,"../assets/items/kitchen/toaster.png":Jm,"../assets/items/kitchen/toaster.svg":e2,"../assets/items/kitchen/utensil-rail.png":t2,"../assets/items/kitchen/utensil-rail.svg":n2,"../assets/items/kitchen/watermelon-slice.png":s2,"../assets/items/kitchen/watermelon-slice.svg":o2,"../assets/items/living/aquarium.png":i2,"../assets/items/living/aquarium.svg":a2,"../assets/items/living/arc-floor-lamp.png":r2,"../assets/items/living/arc-floor-lamp.svg":l2,"../assets/items/living/bean-bag.png":c2,"../assets/items/living/bean-bag.svg":d2,"../assets/items/living/bird-cage.png":f2,"../assets/items/living/bird-cage.svg":g2,"../assets/items/living/blanket-basket.png":h2,"../assets/items/living/blanket-basket.svg":p2,"../assets/items/living/building-blocks.png":u2,"../assets/items/living/building-blocks.svg":m2,"../assets/items/living/coffee-table.png":y2,"../assets/items/living/coffee-table.svg":k2,"../assets/items/living/comfy-armchair.png":b2,"../assets/items/living/comfy-armchair.svg":v2,"../assets/items/living/cubby-shelf.png":w2,"../assets/items/living/cubby-shelf.svg":$2,"../assets/items/living/daisy-rug.png":x2,"../assets/items/living/daisy-rug.svg":_2,"../assets/items/living/fiddle-leaf-fig.png":M2,"../assets/items/living/fiddle-leaf-fig.svg":L2,"../assets/items/living/fireplace.png":C2,"../assets/items/living/fireplace.svg":S2,"../assets/items/living/globe.png":B2,"../assets/items/living/globe.svg":H2,"../assets/items/living/hanging-planter.png":P2,"../assets/items/living/hanging-planter.svg":T2,"../assets/items/living/monstera-plant.png":W2,"../assets/items/living/monstera-plant.svg":R2,"../assets/items/living/piano.png":E2,"../assets/items/living/piano.svg":Q2,"../assets/items/living/popcorn.png":A2,"../assets/items/living/popcorn.svg":U2,"../assets/items/living/pouf.png":z2,"../assets/items/living/pouf.svg":D2,"../assets/items/living/rainbow-rug.png":q2,"../assets/items/living/rainbow-rug.svg":Z2,"../assets/items/living/rainbow-wall-art.png":I2,"../assets/items/living/rainbow-wall-art.svg":O2,"../assets/items/living/retro-radio.png":N2,"../assets/items/living/retro-radio.svg":F2,"../assets/items/living/rocking-chair.png":j2,"../assets/items/living/rocking-chair.svg":V2,"../assets/items/living/rocking-horse.png":G2,"../assets/items/living/rocking-horse.svg":Y2,"../assets/items/living/snake-plant.png":K2,"../assets/items/living/snake-plant.svg":X2,"../assets/items/living/string-lights.png":J2,"../assets/items/living/string-lights.svg":ey,"../assets/items/living/succulent-trio.png":ty,"../assets/items/living/succulent-trio.svg":ny,"../assets/items/living/tassel-rug.png":sy,"../assets/items/living/tassel-rug.svg":oy,"../assets/items/living/throw-pillow.png":iy,"../assets/items/living/throw-pillow.svg":ay,"../assets/items/living/toy-car.png":ry,"../assets/items/living/toy-car.svg":ly,"../assets/items/living/tulip-vase.png":cy,"../assets/items/living/tulip-vase.svg":dy,"../assets/items/living/turtle.png":fy,"../assets/items/living/turtle.svg":gy,"../assets/items/living/tv-stand.png":hy,"../assets/items/living/tv-stand.svg":py,"../assets/items/living/wall-shelf.png":uy,"../assets/items/living/wall-shelf.svg":my,"../assets/items/packs/cottage/cc-bakery-shelf.png":yy,"../assets/items/packs/cottage/cc-bakery-shelf.svg":ky,"../assets/items/packs/cottage/cc-breakfast-table.png":by,"../assets/items/packs/cottage/cc-breakfast-table.svg":vy,"../assets/items/packs/cottage/cc-bubble-chair.png":wy,"../assets/items/packs/cottage/cc-bubble-chair.svg":$y,"../assets/items/packs/cottage/cc-canopy-daybed.png":xy,"../assets/items/packs/cottage/cc-canopy-daybed.svg":_y,"../assets/items/packs/cottage/cc-cloud-beanbag.png":My,"../assets/items/packs/cottage/cc-cloud-beanbag.svg":Ly,"../assets/items/packs/cottage/cc-cloud-lamp.png":Cy,"../assets/items/packs/cottage/cc-cloud-lamp.svg":Sy,"../assets/items/packs/cottage/cc-cottage-aquarium.png":By,"../assets/items/packs/cottage/cc-cottage-aquarium.svg":Hy,"../assets/items/packs/cottage/cc-cupcake-stand.png":Py,"../assets/items/packs/cottage/cc-cupcake-stand.svg":Ty,"../assets/items/packs/cottage/cc-dryer-chair.png":Wy,"../assets/items/packs/cottage/cc-dryer-chair.svg":Ry,"../assets/items/packs/cottage/cc-fairy-garland.png":Ey,"../assets/items/packs/cottage/cc-fairy-garland.svg":Qy,"../assets/items/packs/cottage/cc-fairy-shelf.png":Ay,"../assets/items/packs/cottage/cc-fairy-shelf.svg":Uy,"../assets/items/packs/cottage/cc-flower-kettle.png":zy,"../assets/items/packs/cottage/cc-flower-kettle.svg":Dy,"../assets/items/packs/cottage/cc-flower-lamp.png":qy,"../assets/items/packs/cottage/cc-flower-lamp.svg":Zy,"../assets/items/packs/cottage/cc-heart-bed.png":Iy,"../assets/items/packs/cottage/cc-heart-bed.svg":Oy,"../assets/items/packs/cottage/cc-heart-clock.png":Ny,"../assets/items/packs/cottage/cc-heart-clock.svg":Fy,"../assets/items/packs/cottage/cc-heart-pouf.png":jy,"../assets/items/packs/cottage/cc-heart-pouf.svg":Vy,"../assets/items/packs/cottage/cc-heart-rug.png":Gy,"../assets/items/packs/cottage/cc-heart-rug.svg":Yy,"../assets/items/packs/cottage/cc-jewel-box.png":Ky,"../assets/items/packs/cottage/cc-jewel-box.svg":Xy,"../assets/items/packs/cottage/cc-light-vanity.png":Jy,"../assets/items/packs/cottage/cc-light-vanity.svg":e4,"../assets/items/packs/cottage/cc-macaron-jar.png":t4,"../assets/items/packs/cottage/cc-macaron-jar.svg":n4,"../assets/items/packs/cottage/cc-macrame-swing.png":s4,"../assets/items/packs/cottage/cc-macrame-swing.svg":o4,"../assets/items/packs/cottage/cc-mani-chair.png":i4,"../assets/items/packs/cottage/cc-mani-chair.svg":a4,"../assets/items/packs/cottage/cc-mint-fridge.png":r4,"../assets/items/packs/cottage/cc-mint-fridge.svg":l4,"../assets/items/packs/cottage/cc-mushroom-stool.png":c4,"../assets/items/packs/cottage/cc-mushroom-stool.svg":d4,"../assets/items/packs/cottage/cc-pastel-range.png":f4,"../assets/items/packs/cottage/cc-pastel-range.svg":g4,"../assets/items/packs/cottage/cc-perfume-tray.png":h4,"../assets/items/packs/cottage/cc-perfume-tray.svg":p4,"../assets/items/packs/cottage/cc-petal-table.png":u4,"../assets/items/packs/cottage/cc-petal-table.svg":m4,"../assets/items/packs/cottage/cc-plant-wall.png":y4,"../assets/items/packs/cottage/cc-plant-wall.svg":k4,"../assets/items/packs/cottage/cc-reading-nook.png":b4,"../assets/items/packs/cottage/cc-reading-nook.svg":v4,"../assets/items/packs/cottage/cc-record-player.png":w4,"../assets/items/packs/cottage/cc-record-player.svg":$4,"../assets/items/packs/cottage/cc-ribbon-mirror.png":x4,"../assets/items/packs/cottage/cc-ribbon-mirror.svg":_4,"../assets/items/packs/cottage/cc-scallop-curtains.png":M4,"../assets/items/packs/cottage/cc-scallop-curtains.svg":L4,"../assets/items/packs/cottage/cc-scallop-loveseat.png":C4,"../assets/items/packs/cottage/cc-scallop-loveseat.svg":S4,"../assets/items/packs/cottage/cc-star-dresser.png":B4,"../assets/items/packs/cottage/cc-star-dresser.svg":H4,"../assets/items/packs/cottage/cc-teapot-set.png":P4,"../assets/items/packs/cottage/cc-teapot-set.svg":T4,"../assets/items/packs/cottage/cc-window-seat.png":W4,"../assets/items/packs/cottage/cc-window-seat.svg":R4,"../assets/items/packs/glossy/arched-shelf.png":E4,"../assets/items/packs/glossy/arched-shelf.svg":Q4,"../assets/items/packs/glossy/blob-rug.png":A4,"../assets/items/packs/glossy/blob-rug.svg":U4,"../assets/items/packs/glossy/bubbly-plant.png":z4,"../assets/items/packs/glossy/bubbly-plant.svg":D4,"../assets/items/packs/glossy/bud-vase.png":q4,"../assets/items/packs/glossy/bud-vase.svg":Z4,"../assets/items/packs/glossy/comb-brush.png":I4,"../assets/items/packs/glossy/comb-brush.svg":O4,"../assets/items/packs/glossy/cream-jars.png":N4,"../assets/items/packs/glossy/cream-jars.svg":F4,"../assets/items/packs/glossy/drop-lamp.png":j4,"../assets/items/packs/glossy/drop-lamp.svg":V4,"../assets/items/packs/glossy/droplet-buddy.png":G4,"../assets/items/packs/glossy/droplet-buddy.svg":Y4,"../assets/items/packs/glossy/fancy-sofa.png":K4,"../assets/items/packs/glossy/fancy-sofa.svg":X4,"../assets/items/packs/glossy/flower-cart.png":J4,"../assets/items/packs/glossy/flower-cart.svg":e6,"../assets/items/packs/glossy/foot-spa.png":t6,"../assets/items/packs/glossy/foot-spa.svg":n6,"../assets/items/packs/glossy/globe-pendants.png":s6,"../assets/items/packs/glossy/globe-pendants.svg":o6,"../assets/items/packs/glossy/glow-mirror.png":i6,"../assets/items/packs/glossy/glow-mirror.svg":a6,"../assets/items/packs/glossy/gold-floor-mirror.png":r6,"../assets/items/packs/glossy/gold-floor-mirror.svg":l6,"../assets/items/packs/glossy/hair-dryer.png":c6,"../assets/items/packs/glossy/hair-dryer.svg":d6,"../assets/items/packs/glossy/heart-plant.png":f6,"../assets/items/packs/glossy/heart-plant.svg":g6,"../assets/items/packs/glossy/heart-pouf.png":h6,"../assets/items/packs/glossy/heart-pouf.svg":p6,"../assets/items/packs/glossy/lilac-curtain.png":u6,"../assets/items/packs/glossy/lilac-curtain.svg":m6,"../assets/items/packs/glossy/lotion-trio.png":y6,"../assets/items/packs/glossy/lotion-trio.svg":k6,"../assets/items/packs/glossy/mani-lamp.png":b6,"../assets/items/packs/glossy/mani-lamp.svg":v6,"../assets/items/packs/glossy/nail-table.png":w6,"../assets/items/packs/glossy/nail-table.svg":$6,"../assets/items/packs/glossy/pebble-rug.png":x6,"../assets/items/packs/glossy/pebble-rug.svg":_6,"../assets/items/packs/glossy/perfume-bottle.png":M6,"../assets/items/packs/glossy/perfume-bottle.svg":L6,"../assets/items/packs/glossy/pink-fountain.png":C6,"../assets/items/packs/glossy/pink-fountain.svg":S6,"../assets/items/packs/glossy/pink-vanity.png":B6,"../assets/items/packs/glossy/pink-vanity.svg":H6,"../assets/items/packs/glossy/polish-bottle.png":P6,"../assets/items/packs/glossy/polish-bottle.svg":T6,"../assets/items/packs/glossy/polish-rack.png":W6,"../assets/items/packs/glossy/polish-rack.svg":R6,"../assets/items/packs/glossy/reception-desk.png":E6,"../assets/items/packs/glossy/reception-desk.svg":Q6,"../assets/items/packs/glossy/salon-chair.png":A6,"../assets/items/packs/glossy/salon-chair.svg":U6,"../assets/items/packs/glossy/scent-candle.png":z6,"../assets/items/packs/glossy/scent-candle.svg":D6,"../assets/items/packs/glossy/spray-bottle.png":q6,"../assets/items/packs/glossy/spray-bottle.svg":Z6,"../assets/items/packs/glossy/star-wall-sign.png":I6,"../assets/items/packs/glossy/star-wall-sign.svg":O6,"../assets/items/packs/glossy/swivel-stool.png":N6,"../assets/items/packs/glossy/swivel-stool.svg":F6,"../assets/items/packs/glossy/tiered-tray.png":j6,"../assets/items/packs/glossy/tiered-tray.svg":V6,"../assets/items/packs/glossy/towel-cart.png":G6,"../assets/items/packs/glossy/towel-cart.svg":Y6,"../assets/items/packs/glossy/towel-stack.png":K6,"../assets/items/packs/glossy/towel-stack.svg":X6,"../assets/items/packs/glossy/vine-planter.png":J6,"../assets/items/packs/glossy/vine-planter.svg":ek,"../assets/items/packs/glossy/waiting-bench.png":tk,"../assets/items/packs/glossy/waiting-bench.svg":nk,"../assets/items/packs/glossy/wash-chair.png":sk,"../assets/items/packs/glossy/wash-chair.svg":ok,"../assets/items/packs/sunny-vibes/arched-mirror.png":ik,"../assets/items/packs/sunny-vibes/arched-mirror.svg":ak,"../assets/items/packs/sunny-vibes/big-monitor.png":rk,"../assets/items/packs/sunny-vibes/big-monitor.svg":lk,"../assets/items/packs/sunny-vibes/boba-cup.png":ck,"../assets/items/packs/sunny-vibes/boba-cup.svg":dk,"../assets/items/packs/sunny-vibes/bubble-bath.png":fk,"../assets/items/packs/sunny-vibes/bubble-bath.svg":gk,"../assets/items/packs/sunny-vibes/cactus-buddy.png":hk,"../assets/items/packs/sunny-vibes/cactus-buddy.svg":pk,"../assets/items/packs/sunny-vibes/caterpillar-plush.png":uk,"../assets/items/packs/sunny-vibes/caterpillar-plush.svg":mk,"../assets/items/packs/sunny-vibes/checker-bed.png":yk,"../assets/items/packs/sunny-vibes/checker-bed.svg":kk,"../assets/items/packs/sunny-vibes/checker-rug.png":bk,"../assets/items/packs/sunny-vibes/checker-rug.svg":vk,"../assets/items/packs/sunny-vibes/clothes-rail.png":wk,"../assets/items/packs/sunny-vibes/clothes-rail.svg":$k,"../assets/items/packs/sunny-vibes/cloud-sofa.png":xk,"../assets/items/packs/sunny-vibes/cloud-sofa.svg":_k,"../assets/items/packs/sunny-vibes/cube-shelf.png":Mk,"../assets/items/packs/sunny-vibes/cube-shelf.svg":Lk,"../assets/items/packs/sunny-vibes/curvy-desk.png":Ck,"../assets/items/packs/sunny-vibes/curvy-desk.svg":Sk,"../assets/items/packs/sunny-vibes/cute-speaker.png":Bk,"../assets/items/packs/sunny-vibes/cute-speaker.svg":Hk,"../assets/items/packs/sunny-vibes/desk-lamp.png":Pk,"../assets/items/packs/sunny-vibes/desk-lamp.svg":Tk,"../assets/items/packs/sunny-vibes/desk-mic.png":Wk,"../assets/items/packs/sunny-vibes/desk-mic.svg":Rk,"../assets/items/packs/sunny-vibes/flower-lamp.png":Ek,"../assets/items/packs/sunny-vibes/flower-lamp.svg":Qk,"../assets/items/packs/sunny-vibes/frog-plush.png":Ak,"../assets/items/packs/sunny-vibes/frog-plush.svg":Uk,"../assets/items/packs/sunny-vibes/game-controller.png":zk,"../assets/items/packs/sunny-vibes/game-controller.svg":Dk,"../assets/items/packs/sunny-vibes/gaming-chair.png":qk,"../assets/items/packs/sunny-vibes/gaming-chair.svg":Zk,"../assets/items/packs/sunny-vibes/hamster-pet.png":Ik,"../assets/items/packs/sunny-vibes/hamster-pet.svg":Ok,"../assets/items/packs/sunny-vibes/headphones.png":Nk,"../assets/items/packs/sunny-vibes/headphones.svg":Fk,"../assets/items/packs/sunny-vibes/heart-light.png":jk,"../assets/items/packs/sunny-vibes/heart-light.svg":Vk,"../assets/items/packs/sunny-vibes/keyboard.png":Gk,"../assets/items/packs/sunny-vibes/keyboard.svg":Yk,"../assets/items/packs/sunny-vibes/mini-fridge.png":Kk,"../assets/items/packs/sunny-vibes/mini-fridge.svg":Xk,"../assets/items/packs/sunny-vibes/pastel-wardrobe.png":Jk,"../assets/items/packs/sunny-vibes/pastel-wardrobe.svg":e8,"../assets/items/packs/sunny-vibes/phone-stand.png":t8,"../assets/items/packs/sunny-vibes/phone-stand.svg":n8,"../assets/items/packs/sunny-vibes/pothos-plant.png":s8,"../assets/items/packs/sunny-vibes/pothos-plant.svg":o8,"../assets/items/packs/sunny-vibes/puffy-stool.png":i8,"../assets/items/packs/sunny-vibes/puffy-stool.svg":a8,"../assets/items/packs/sunny-vibes/ring-light.png":r8,"../assets/items/packs/sunny-vibes/ring-light.svg":l8,"../assets/items/packs/sunny-vibes/side-table-round.png":c8,"../assets/items/packs/sunny-vibes/side-table-round.svg":d8,"../assets/items/packs/sunny-vibes/star-lamp.png":f8,"../assets/items/packs/sunny-vibes/star-lamp.svg":g8,"../assets/items/packs/sunny-vibes/sticker-board.png":h8,"../assets/items/packs/sunny-vibes/sticker-board.svg":p8,"../assets/items/packs/sunny-vibes/sunny-art.png":u8,"../assets/items/packs/sunny-vibes/sunny-art.svg":m8,"../assets/items/packs/sunny-vibes/sv-bean-bag.png":y8,"../assets/items/packs/sunny-vibes/sv-bean-bag.svg":k8,"../assets/items/packs/sunny-vibes/sv-cloud-rug.png":b8,"../assets/items/packs/sunny-vibes/sv-cloud-rug.svg":v8,"../assets/items/packs/sunny-vibes/sv-wall-shelf.png":w8,"../assets/items/packs/sunny-vibes/sv-wall-shelf.svg":$8,"../assets/items/packs/sunny-vibes/vlog-camera.png":x8,"../assets/items/packs/sunny-vibes/vlog-camera.svg":_8,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.png":M8,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.svg":L8,"../assets/items/packs/welcome-home/acorn-friend.png":C8,"../assets/items/packs/welcome-home/acorn-friend.svg":S8,"../assets/items/packs/welcome-home/apple-tree.png":B8,"../assets/items/packs/welcome-home/apple-tree.svg":H8,"../assets/items/packs/welcome-home/big-wardrobe.png":P8,"../assets/items/packs/welcome-home/big-wardrobe.svg":T8,"../assets/items/packs/welcome-home/box-stack.png":W8,"../assets/items/packs/welcome-home/box-stack.svg":R8,"../assets/items/packs/welcome-home/brick-fireplace.png":E8,"../assets/items/packs/welcome-home/brick-fireplace.svg":Q8,"../assets/items/packs/welcome-home/bulletin-board.png":A8,"../assets/items/packs/welcome-home/bulletin-board.svg":U8,"../assets/items/packs/welcome-home/cozy-mug.png":z8,"../assets/items/packs/welcome-home/cozy-mug.svg":D8,"../assets/items/packs/welcome-home/cream-sofa.png":q8,"../assets/items/packs/welcome-home/cream-sofa.svg":Z8,"../assets/items/packs/welcome-home/fire-pit.png":I8,"../assets/items/packs/welcome-home/fire-pit.svg":O8,"../assets/items/packs/welcome-home/glass-cabinet.png":N8,"../assets/items/packs/welcome-home/glass-cabinet.svg":F8,"../assets/items/packs/welcome-home/hanging-lantern.png":j8,"../assets/items/packs/welcome-home/hanging-lantern.svg":V8,"../assets/items/packs/welcome-home/knit-cushion.png":G8,"../assets/items/packs/welcome-home/knit-cushion.svg":Y8,"../assets/items/packs/welcome-home/ladder-shelf.png":K8,"../assets/items/packs/welcome-home/ladder-shelf.svg":X8,"../assets/items/packs/welcome-home/landscape-art.png":J8,"../assets/items/packs/welcome-home/landscape-art.svg":eb,"../assets/items/packs/welcome-home/lattice-bench.png":tb,"../assets/items/packs/welcome-home/lattice-bench.svg":nb,"../assets/items/packs/welcome-home/leaf-wreath.png":sb,"../assets/items/packs/welcome-home/leaf-wreath.svg":ob,"../assets/items/packs/welcome-home/mini-greenhouse.png":ib,"../assets/items/packs/welcome-home/mini-greenhouse.svg":ab,"../assets/items/packs/welcome-home/moving-box.png":rb,"../assets/items/packs/welcome-home/moving-box.svg":lb,"../assets/items/packs/welcome-home/picnic-basket.png":cb,"../assets/items/packs/welcome-home/picnic-basket.svg":db,"../assets/items/packs/welcome-home/round-rug.png":fb,"../assets/items/packs/welcome-home/round-rug.svg":gb,"../assets/items/packs/welcome-home/sale-sign.png":hb,"../assets/items/packs/welcome-home/sale-sign.svg":pb,"../assets/items/packs/welcome-home/sprout-pot.png":ub,"../assets/items/packs/welcome-home/sprout-pot.svg":mb,"../assets/items/packs/welcome-home/stripe-runner.png":yb,"../assets/items/packs/welcome-home/stripe-runner.svg":kb,"../assets/items/packs/welcome-home/trailing-plant.png":bb,"../assets/items/packs/welcome-home/trailing-plant.svg":vb,"../assets/items/packs/welcome-home/wall-clock.png":wb,"../assets/items/packs/welcome-home/wall-clock.svg":$b,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.png":xb,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.svg":_b,"../assets/items/packs/welcome-home/wh-book-stack.png":Mb,"../assets/items/packs/welcome-home/wh-book-stack.svg":Lb,"../assets/items/packs/welcome-home/wh-dresser.png":Cb,"../assets/items/packs/welcome-home/wh-dresser.svg":Sb,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.png":Bb,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.svg":Hb,"../assets/items/packs/welcome-home/wh-kitchen-counter.png":Pb,"../assets/items/packs/welcome-home/wh-kitchen-counter.svg":Tb,"../assets/items/packs/welcome-home/wh-nightstand.png":Wb,"../assets/items/packs/welcome-home/wh-nightstand.svg":Rb,"../assets/items/packs/welcome-home/wh-pendant-lamp.png":Eb,"../assets/items/packs/welcome-home/wh-pendant-lamp.svg":Qb,"../assets/items/packs/welcome-home/wh-snake-plant.png":Ab,"../assets/items/packs/welcome-home/wh-snake-plant.svg":Ub,"../assets/items/packs/welcome-home/wh-string-lights.png":zb,"../assets/items/packs/welcome-home/wh-string-lights.svg":Db,"../assets/items/packs/welcome-home/wh-teapot.png":qb,"../assets/items/packs/welcome-home/wh-teapot.svg":Zb,"../assets/items/packs/welcome-home/wood-armchair.png":Ib,"../assets/items/packs/welcome-home/wood-armchair.svg":Ob,"../assets/items/packs/welcome-home/wood-bookshelf.png":Nb,"../assets/items/packs/welcome-home/wood-bookshelf.svg":Fb,"../assets/items/packs/welcome-home/wood-coffee-table.png":jb,"../assets/items/packs/welcome-home/wood-coffee-table.svg":Vb,"../assets/items/packs/welcome-home/wood-desk.png":Gb,"../assets/items/packs/welcome-home/wood-desk.svg":Yb,"../assets/items/packs/welcome-home/wood-stool.png":Kb,"../assets/items/packs/welcome-home/wood-stool.svg":Xb,"../assets/items/packs/welcome-home/wooden-bed.png":Jb,"../assets/items/packs/welcome-home/wooden-bed.svg":ev}),Yc=Object.assign({"../assets/patterns/cottage/cc-butter-polka.png":tv,"../assets/patterns/cottage/cc-butter-polka.svg":nv,"../assets/patterns/cottage/cc-cream-hex.png":sv,"../assets/patterns/cottage/cc-cream-hex.svg":ov,"../assets/patterns/cottage/cc-lavender-lattice.png":iv,"../assets/patterns/cottage/cc-lavender-lattice.svg":av,"../assets/patterns/cottage/cc-lilac-gingham.png":rv,"../assets/patterns/cottage/cc-lilac-gingham.svg":lv,"../assets/patterns/cottage/cc-mint-checks.png":cv,"../assets/patterns/cottage/cc-mint-checks.svg":dv,"../assets/patterns/cottage/cc-mint-florals.png":fv,"../assets/patterns/cottage/cc-mint-florals.svg":gv,"../assets/patterns/cottage/cc-peach-scallops.png":hv,"../assets/patterns/cottage/cc-peach-scallops.svg":pv,"../assets/patterns/cottage/cc-pink-plaid.png":uv,"../assets/patterns/cottage/cc-pink-plaid.svg":mv,"../assets/patterns/cottage/cc-rag-planks.png":yv,"../assets/patterns/cottage/cc-rag-planks.svg":kv,"../assets/patterns/cottage/cc-rose-herringbone.png":bv,"../assets/patterns/cottage/cc-rose-herringbone.svg":vv,"../assets/patterns/glossy/lilac-stripes.png":wv,"../assets/patterns/glossy/lilac-stripes.svg":$v,"../assets/patterns/glossy/lilac-terrazzo.png":xv,"../assets/patterns/glossy/lilac-terrazzo.svg":_v,"../assets/patterns/glossy/mint-bubbles.png":Mv,"../assets/patterns/glossy/mint-bubbles.svg":Lv,"../assets/patterns/glossy/pink-check-floor.png":Cv,"../assets/patterns/glossy/pink-check-floor.svg":Sv,"../assets/patterns/glossy/pink-hearts.png":Bv,"../assets/patterns/glossy/pink-hearts.svg":Hv,"../assets/patterns/nursery/cloud-sky.svg":Pv,"../assets/patterns/nursery/pastel-planks.svg":Tv,"../assets/patterns/nursery/soft-carpet.svg":Wv,"../assets/patterns/nursery/star-sprinkle.svg":Rv,"../assets/patterns/nursery/tiny-hearts.svg":Ev,"../assets/patterns/sunny-vibes/butter-check-floor.png":Qv,"../assets/patterns/sunny-vibes/butter-check-floor.svg":Av,"../assets/patterns/sunny-vibes/mint-checks.png":Uv,"../assets/patterns/sunny-vibes/mint-checks.svg":zv,"../assets/patterns/sunny-vibes/sky-clouds.png":Dv,"../assets/patterns/sunny-vibes/sky-clouds.svg":qv,"../assets/patterns/sunny-vibes/sky-tiles.png":Zv,"../assets/patterns/sunny-vibes/sky-tiles.svg":Iv,"../assets/patterns/sunny-vibes/sunny-stars.png":Ov,"../assets/patterns/sunny-vibes/sunny-stars.svg":Nv,"../assets/patterns/welcome-home/leafy-cream.png":Fv,"../assets/patterns/welcome-home/leafy-cream.svg":jv,"../assets/patterns/welcome-home/orange-gingham.png":Vv,"../assets/patterns/welcome-home/orange-gingham.svg":Gv,"../assets/patterns/welcome-home/terracotta-tiles.png":Yv,"../assets/patterns/welcome-home/terracotta-tiles.svg":Kv,"../assets/patterns/welcome-home/wood-panel.png":Xv,"../assets/patterns/welcome-home/wood-panel.svg":Jv,"../assets/patterns/welcome-home/wood-planks.png":ew,"../assets/patterns/welcome-home/wood-planks.svg":tw});function ow(e,t){if(!e||!e.trim())return[];try{const n=JSON.parse(e);return(Array.isArray(n)?n:[...Array.isArray(n?.items)?n.items:[],...Array.isArray(n?.patterns)?n.patterns:[]]).filter(o=>o&&typeof o.slug=="string"&&o.slug.trim())}catch(n){return console.warn(`[packs] ${t} is not valid JSON; ignoring`,n),[]}}const Sf=Object.entries(sw).flatMap(([e,t])=>ow(t,e)),iw=["svg","png","webp","SVG","PNG","WEBP"];function Bf(e,t,n,s){for(const i of iw){const a=e[`../assets/${t}/${n}/${s}.${i}`];if(a)return a}const o=Object.keys(e).find(i=>i.split("/").pop().replace(/\.\w+$/,"")===s);return o?e[o]:void 0}const Kc={furniture:"furniture",appliance:"furniture",appliances:"furniture",seating:"furniture",storage:"furniture",bed:"furniture",table:"furniture",decor:"decor",rug:"decor",rugs:"decor",lighting:"decor",light:"decor",lamp:"decor",toy:"decor",toys:"decor","wall-art":"decor",art:"decor",beauty:"decor",plant:"plants",plants:"plants",flower:"plants",flowers:"plants",food:"food",drink:"food",drinks:"food",snack:"food",pet:"pets",pets:"pets",animal:"pets",animals:"pets"};function aw(e){const t=typeof e=="string"?e.trim().toLowerCase():"";return Kc[t]??Kc[t.replace(/s$/,"")]??"decor"}const Es=(e,t)=>typeof e=="string"&&e.trim()?e.trim().toLowerCase():t,Hf=e=>["wallpaper","floor"].includes(Es(e.type,"")),Xc=new Set,rw=Sf.filter(e=>!Hf(e)).flatMap(e=>{const t=Es(e.room,"any"),n=e.slug.trim();if(Xc.has(n))return[];Xc.add(n);const o=[e.svg,e.png].filter(h=>typeof h=="string").map(h=>Gc["../assets/items/"+h.replace(/^\.?\//,"")]).find(Boolean)??Bf(Gc,"items",t,n);if(!o)return console.warn(`[packs] no image for items/${t}/${n}`),[];const i=Es(e.pack,""),a=Es(e.size,"medium"),r=aw(e.category),l=typeof e.gameW=="number"&&e.gameW>20&&e.gameW<800?e.gameW:Vc[a]??Vc.medium,c=typeof e.widthUnits=="number"&&typeof e.heightUnits=="number"&&e.widthUnits>0&&e.heightUnits>0?e.heightUnits/e.widthUnits:1,d=Math.round(l*Math.min(4,Math.max(.2,c))),f=typeof e.holdable=="boolean"?e.holdable:a!=="large"&&r!=="furniture",g=e.tag==="lighting"||/lamp|light|lantern|candle/i.test(n);return[{kind:`pack:${n}`,name:e.name||n,cat:r,rooms:[t],w:l,h:d,wall:e.wall===!0||void 0,svg:"",img:o,pack:i||void 0,holdable:f,light:g||void 0}]}),qr=Sf.filter(Hf).flatMap(e=>{const t=Es(e.pack,"extra"),n=e.slug.trim(),o=[e.svg,e.png].filter(i=>typeof i=="string").map(i=>Yc["../assets/patterns/"+i.replace(/^\.?\//,"")]).find(Boolean)??Bf(Yc,"patterns",t,n);return o?[{id:`${t}/${n}`,name:e.name||n,pack:t,kind:Es(e.type,"wallpaper"),url:o}]:(console.warn(`[packs] no image for patterns/${t}/${n}`),[])}),Jc=Object.fromEntries(qr.map(e=>[e.id,e])),nn="#5a3d5c",H=`stroke="${nn}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Pf=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="2.4" fill="${nn}"/><circle cx="${t}" cy="${n}" r="2.4" fill="${nn}"/><circle cx="${e+.8}" cy="${n-.8}" r=".8" fill="#fff"/><circle cx="${t+.8}" cy="${n-.8}" r=".8" fill="#fff"/>`,Tf=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/><ellipse cx="${t}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/>`,Re='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>';function fr(e,t,n){return`${Re}<ellipse cx="50" cy="78" rx="28" ry="16" fill="${t}" ${H}/><path d="M24 62 Q50 48 76 62 V78 Q50 92 24 78 Z" fill="${t}" ${H}/>
    <circle cx="50" cy="40" r="18" fill="${e}" ${H}/>${Pf(43,57,40)}${Tf(38,62,48)}<path d="M46 50 q4 3 8 0" fill="none" ${H}/>
    <path d="M38 26 Q50 16 62 26" fill="${n}" ${H}/><circle cx="50" cy="24" r="3" fill="${n}" ${H}/>`}const Wf=[{kind:"crib",name:"Crib",cat:"furniture",w:260,svg:`${Re}<rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${H}/><path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${H}/><rect x="6" y="22" width="88" height="12" rx="6" fill="#9ad7f5" ${H}/><rect x="14" y="48" width="72" height="16" rx="6" fill="#ffe0ec"/><ellipse cx="32" cy="56" rx="8" ry="5" fill="#fff" ${H}/><ellipse cx="50" cy="56" rx="8" ry="5" fill="#c9e7ff" ${H}/>`},{kind:"bassinet",name:"Bassinet",cat:"furniture",w:170,svg:`${Re}<path d="M18 78 Q8 78 10 64 L22 36 H78 L90 64 Q92 78 82 78 Z" fill="#fff" ${H}/><ellipse cx="50" cy="36" rx="32" ry="10" fill="#fff" ${H}/><path d="M22 40 Q50 52 78 40" fill="#ffe0ec" ${H}/><ellipse cx="50" cy="44" rx="16" ry="7" fill="#fff"/><path d="M30 78 L22 94 M70 78 L78 94" ${H}/><ellipse cx="50" cy="90" rx="28" ry="4" fill="none" ${H}/><path d="M14 22 Q50 4 86 22" fill="none" stroke="#9ad7f5" stroke-width="6" stroke-linecap="round"/>`},{kind:"rocker",name:"Rocker",cat:"furniture",w:190,svg:`${Re}<path d="M16 88 Q50 98 84 88" fill="none" ${H}/><path d="M28 84 Q50 74 72 84" fill="#c9a0dc" ${H}/><rect x="30" y="28" width="40" height="36" rx="12" fill="#e4ccf2" ${H}/><path d="M22 48 Q18 70 30 80 H70 Q82 70 78 48 Z" fill="#f6e6ff" ${H}/><rect x="36" y="58" width="28" height="12" rx="6" fill="#ffc8dd" ${H}/><circle cx="50" cy="40" r="6" fill="#fff" opacity=".7"/>`},{kind:"changing-table",name:"Changing Table",cat:"furniture",w:230,svg:`${Re}<rect x="8" y="36" width="84" height="16" rx="8" fill="#fff" ${H}/><rect x="14" y="40" width="72" height="8" rx="4" fill="#ffd6e8"/><rect x="16" y="52" width="28" height="32" rx="6" fill="#bde0fe" ${H}/><rect x="56" y="52" width="28" height="32" rx="6" fill="#c9f0d8" ${H}/><path d="M22 60 H38 M22 68 H38 M62 60 H78 M62 68 H78" ${H}/><rect x="18" y="84" width="8" height="10" rx="2" fill="${nn}"/><rect x="74" y="84" width="8" height="10" rx="2" fill="${nn}"/><rect x="34" y="22" width="18" height="12" rx="3" fill="#ffe0ec" ${H}/><rect x="54" y="24" width="16" height="10" rx="3" fill="#fff6d8" ${H}/>`},{kind:"toy-bin",name:"Toy Bin",cat:"furniture",w:150,svg:`${Re}<path d="M14 40 H86 L78 90 H22 Z" fill="#ffd166" ${H}/><rect x="10" y="32" width="80" height="14" rx="7" fill="#ffe08a" ${H}/><circle cx="36" cy="58" r="8" fill="#ff8fab" ${H}/><rect x="50" y="50" width="16" height="16" rx="3" fill="#8ecae6" ${H}/><circle cx="62" cy="70" r="6" fill="#90e0a8" ${H}/>`},{kind:"baby-shelf",name:"Bookshelf",cat:"furniture",w:150,svg:`${Re}<rect x="14" y="8" width="72" height="84" rx="8" fill="#f3d2b5" ${H}/><path d="M14 36 H86 M14 64 H86" ${H}/><rect x="22" y="14" width="8" height="18" rx="2" fill="#ff8fab" ${H}/><rect x="32" y="18" width="8" height="14" rx="2" fill="#8ecae6" ${H}/><rect x="44" y="14" width="8" height="18" rx="2" fill="#ffd166" ${H}/><rect x="58" y="16" width="8" height="16" rx="2" fill="#90e0a8" ${H}/><circle cx="34" cy="50" r="7" fill="#ffadad" ${H}/><rect x="50" y="44" width="18" height="14" rx="3" fill="#c9a0dc" ${H}/><ellipse cx="40" cy="78" rx="14" ry="8" fill="#fff" ${H}/>`},{kind:"doll-rose",name:"Rose Doll",cat:"decor",w:80,svg:fr("#f6d3b0","#ffc2d4","#ff8fab")},{kind:"doll-honey",name:"Honey Doll",cat:"decor",w:80,svg:fr("#e0ac69","#cdeffd","#ffd166")},{kind:"doll-cocoa",name:"Cocoa Doll",cat:"decor",w:80,svg:fr("#8d5524","#d8f3dc","#c9a0dc")},{kind:"crib-mobile",name:"Crib Mobile",cat:"decor",w:150,wall:!0,svg:`<path d="M50 6 V22" ${H}/><ellipse cx="50" cy="28" rx="28" ry="8" fill="#fff" ${H}/><path d="M28 32 V48 M50 36 V58 M72 32 V48" ${H}/><circle cx="28" cy="56" r="8" fill="#ffd166" ${H}/><circle cx="50" cy="68" r="9" fill="#ff8fab" ${H}/><path d="M72 56 l6 4 -6 4 -6 -4 z" fill="#8ecae6" ${H}/><circle cx="28" cy="54" r="2" fill="#fff"/><circle cx="50" cy="66" r="2" fill="#fff"/>`},{kind:"night-light",name:"Night Light",cat:"decor",w:70,svg:`${Re}<circle cx="50" cy="46" r="22" fill="#fff6c8" ${H}/><circle cx="50" cy="46" r="12" fill="#ffe08a"/><path d="M50 18 V10 M30 26 L24 20 M70 26 L76 20 M24 46 H14 M86 46 H76" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><rect x="40" y="70" width="20" height="16" rx="4" fill="#c9a0dc" ${H}/><circle cx="50" cy="78" r="3" fill="#ff8fab"/>`},{kind:"bunny-plush",name:"Bunny Plush",cat:"decor",w:90,svg:`${Re}<ellipse cx="34" cy="28" rx="8" ry="18" fill="#fff" ${H}/><ellipse cx="66" cy="28" rx="8" ry="18" fill="#fff" ${H}/><ellipse cx="34" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="66" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="50" cy="74" rx="26" ry="18" fill="#fff" ${H}/><circle cx="50" cy="50" r="20" fill="#fff" ${H}/>${Pf(43,57,50)}<path d="M47 58 l3 3 3 -3" fill="none" ${H}/>${Tf(38,62,58)}`},{kind:"stacking-rings",name:"Stacking Rings",cat:"decor",w:70,svg:`${Re}<ellipse cx="50" cy="86" rx="26" ry="7" fill="#ff8fab" ${H}/><ellipse cx="50" cy="74" rx="20" ry="6" fill="#ffd166" ${H}/><ellipse cx="50" cy="64" rx="15" ry="5" fill="#8ecae6" ${H}/><ellipse cx="50" cy="56" rx="10" ry="4" fill="#90e0a8" ${H}/><rect x="46" y="28" width="8" height="40" rx="4" fill="#c9a0dc" ${H}/><circle cx="50" cy="24" r="7" fill="#ffb3c6" ${H}/>`},{kind:"rattle",name:"Rattle",cat:"decor",w:60,svg:`${Re}<circle cx="38" cy="40" r="20" fill="#ffd166" ${H}/><circle cx="32" cy="34" r="5" fill="#fff" opacity=".7"/><rect x="50" y="52" width="10" height="28" rx="5" fill="#ff8fab" ${H} transform="rotate(-20 55 66)"/><circle cx="68" cy="82" r="8" fill="#8ecae6" ${H}/>`},{kind:"baby-bottle",name:"Baby Bottle",cat:"food",w:55,svg:`${Re}<rect x="36" y="8" width="28" height="12" rx="4" fill="#c9a0dc" ${H}/><rect x="42" y="18" width="16" height="8" fill="#fff" ${H}/><path d="M30 30 H70 L66 88 Q50 96 34 88 Z" fill="#e7f6ff" ${H}/><path d="M32 48 H68 L66 80 Q50 88 34 80 Z" fill="#fff" opacity=".85"/><rect x="34" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="46" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="58" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/>`},{kind:"blocks",name:"Baby Blocks",cat:"decor",w:90,svg:`${Re}<rect x="14" y="58" width="28" height="28" rx="4" fill="#ff8fab" ${H}/><rect x="40" y="46" width="28" height="28" rx="4" fill="#ffd166" ${H}/><rect x="28" y="28" width="26" height="26" rx="4" fill="#8ecae6" ${H}/><path d="M20 72 H36 M48 60 H62 M34 42 H48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"rocking-horse",name:"Little Rocking Horse",cat:"decor",w:180,svg:`${Re}<path d="M12 86 Q50 98 88 82" fill="none" ${H}/><ellipse cx="48" cy="62" rx="26" ry="14" fill="#e6b88a" ${H}/><path d="M62 58 L84 40 Q92 36 90 48 L74 64 Z" fill="#f0d0b0" ${H}/><circle cx="82" cy="42" r="3" fill="${nn}"/><path d="M70 36 L76 24 L84 34" fill="#ff8fab" ${H}/><rect x="36" y="48" width="16" height="8" rx="3" fill="#c9a0dc" ${H}/><path d="M30 70 L22 84 M58 72 L66 86" ${H}/>`},{kind:"music-box",name:"Music Box",cat:"decor",w:80,svg:`${Re}<rect x="22" y="40" width="56" height="46" rx="8" fill="#f6d6ff" ${H}/><path d="M22 40 L50 22 L78 40" fill="#e4ccf2" ${H}/><circle cx="50" cy="64" r="10" fill="#fff" ${H}/><path d="M50 58 V70 M44 64 H56" ${H}/><circle cx="50" cy="30" r="4" fill="#ffd166" ${H}/>`},{kind:"cloud-rug",name:"Nursery Cloud Rug",cat:"decor",w:340,svg:`<ellipse cx="50" cy="78" rx="46" ry="16" fill="#e7f6ff" ${H}/><circle cx="28" cy="70" r="16" fill="#f4fbff" ${H}/><circle cx="50" cy="62" r="18" fill="#fff" ${H}/><circle cx="72" cy="70" r="16" fill="#f4fbff" ${H}/><ellipse cx="50" cy="78" rx="30" ry="8" fill="#d6f0ff"/>`},{kind:"play-mat",name:"Play Mat",cat:"decor",w:300,svg:`<rect x="6" y="62" width="88" height="30" rx="14" fill="#ffe0ec" ${H}/><path d="M50 70 C42 62 30 64 34 74 C38 82 50 88 50 88 C50 88 62 82 66 74 C70 64 58 62 50 70 Z" fill="#ff8fab" ${H}/><circle cx="22" cy="76" r="5" fill="#ffd166" ${H}/><circle cx="78" cy="76" r="5" fill="#8ecae6" ${H}/>`},{kind:"moon-art",name:"Moon and Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M58 18 A28 28 0 1 0 58 78 A18 18 0 1 1 58 18 Z" fill="#fff3b0" ${H}/><path d="M22 30 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1 z" fill="#ffd166" ${H}/><path d="M78 58 l2 5 5 1 -4 4 1 5 -4 -3 -4 3 1 -5 -4 -4 5 -1 z" fill="#c9e7ff" ${H}/>`},{kind:"nursery-dresser",name:"Nursery Dresser",cat:"furniture",w:170,svg:`${Re}<rect x="14" y="22" width="72" height="68" rx="8" fill="#f6e2c4" ${H}/><path d="M14 44 H86 M14 66 H86" ${H}/><circle cx="50" cy="34" r="3" fill="${nn}"/><circle cx="50" cy="55" r="3" fill="${nn}"/><circle cx="50" cy="76" r="3" fill="${nn}"/><rect x="30" y="10" width="18" height="12" rx="3" fill="#ffc2d4" ${H}/><rect x="52" y="12" width="16" height="10" rx="3" fill="#c9e7ff" ${H}/>`},{kind:"nursery-lamp",name:"Nursery Lamp",cat:"decor",w:80,svg:`${Re}<path d="M28 42 L36 12 H64 L72 42 Z" fill="#fff6c8" ${H}/><rect x="46" y="42" width="8" height="40" rx="4" fill="#c9a0dc" ${H}/><ellipse cx="50" cy="88" rx="20" ry="6" fill="#b388d6" ${H}/><circle cx="46" cy="24" r="3" fill="#fff" opacity=".85"/><path d="M34 20 q6 -8 4 -2" fill="none" stroke="#ffd166" stroke-width="2"/>`},{kind:"nursery-curtains",name:"Curtains",cat:"decor",w:180,wall:!0,svg:`<rect x="16" y="10" width="68" height="50" rx="6" fill="#cfefff" ${H}/><path d="M50 10 V60 M16 34 H84" ${H}/><path d="M8 8 Q18 28 10 92" fill="#ffd6e8" ${H}/><path d="M92 8 Q82 28 90 92" fill="#ffd6e8" ${H}/><rect x="6" y="6" width="88" height="8" rx="3" fill="#f3d2b5" ${H}/>`}],Ae="#5a3d5c",k=(e=3.5)=>`stroke="${Ae}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function ce(e,t,n){const s=Math.round(t*.62);return`<ellipse cx="${e}" cy="${n}" rx="${t}" ry="3.4" fill="${Ae}" opacity=".08"/><ellipse cx="${e}" cy="${(n+1.2).toFixed(1)}" rx="${s}" ry="1.55" fill="${Ae}" opacity=".12"/>`}function N(e,t=2.2){return`<path d="${e}" fill="none" stroke="#fff" stroke-width="${t}" stroke-linecap="round" opacity=".75"/>`}function De(e,t=1.15){return`<path d="${e}" fill="none" stroke="${Ae}" stroke-width="${t}" stroke-linecap="round" opacity=".2"/>`}function Wl(e,t,n=".7"){return`<radialGradient id="${e}" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="${t}" stop-opacity="${n}"/><stop offset="1" stop-color="${t}" stop-opacity="0"/></radialGradient>`}function Rl(e,t,n){return`<linearGradient id="${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t}"/><stop offset="1" stop-color="${n}"/></linearGradient>`}function lw(){return typeof location>"u"?!1:/(?:^|[?&])yard=1(?:&|$)/.test(location.search)}function Zr(){return typeof location>"u"?"":new URLSearchParams(location.search).get("shot")||""}const cw={v:1,hair:"pigtails",hairC:"#a0522d",skin:"#f6d2b5",eyes:"big",eyeC:"#5a321c",freckles:!0,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"skirt",bottomC:"#c9a0dc",dress:"sundress",dressC:"#ff8fab",shoes:"maryjanes",shoesC:"#ffd166",acc:["bow"],accC:"#ff7aa8"},dw=()=>Ho(cw),Ir=864,Or={x:1084,y:578,flip:!0},Sn={x:1184,y:255},ed={x:1146,y:578},Nr={x:940,y:540,flip:!0},Xi=1160,Rf={x:824,y:398,w:96,h:230},Ef={x:996,y:372,w:82,h:196},fw=[{kind:"yard-swing",x:1266,y:580,scale:132/280},{kind:"lemonade-cart",x:1254,y:471},{kind:"sandbox",x:940,y:482},{kind:"picnic-blanket",x:939,y:420}];function de(e){return{kind:e.kind,name:e.name,cat:e.cat,w:e.w,h:e.h,vb:e.vb,wall:e.wall,holdable:e.holdable??!1,rooms:["backyard"],svg:e.svg}}const gw=de({kind:"yard-swing",name:"A-Frame Swing",cat:"furniture",w:280,h:215,vb:"0 0 130 100",svg:`${ce(65,54,96)}
    <path d="M34 18 L50 18 L20 94 H4 Z" fill="#f3d2aa" ${k()}/>
    <path d="M42 24 L50 18 L18 70 H28 Z" fill="#d4a373"/>
    <path d="M80 18 L96 18 L126 94 H110 Z" fill="#e7c49a" ${k()}/>
    <path d="M108 22 L96 18 L126 94 H118 Z" fill="#c99366"/>
    ${De("M16 50 l8 28 M112 48 l8 30")}
    <rect x="22" y="6" width="86" height="14" rx="2" fill="#f6e0c4" ${k()}/>
    <rect x="86" y="9" width="18" height="8" rx="1" fill="#d4a373"/>
    <rect x="28" y="16" width="74" height="4" fill="#e7c49a"/>
    ${N("M28 10 h30")}
    <g class="swingSeat">
      <rect x="48" y="74" width="34" height="7" rx="1" fill="#f3d2aa" ${k(2.2)}/>
      <rect x="72" y="76" width="8" height="4" fill="#d4a373"/>
      <path d="M54 20 V78 M76 20 V78" fill="none" ${k(2.2)}/>
      ${N("M52 76 h14")}
    </g>`}),hw=de({kind:"sandbox",name:"Sandbox",cat:"furniture",w:120,h:54,vb:"0 0 160 72",svg:`${ce(80,64,68)}
    <path d="M108 38 L146 26 L146 52 L108 64 Z" fill="#e7c49a" ${k()}/>
    <path d="M126 36 L142 28 L142 48 L126 56 Z" fill="#c99366"/>
    <path d="M12 40 H108 V64 H12 Z" fill="#f3d2aa" ${k()}/>
    <path d="M12 40 L36 18 L146 18 L108 40 Z" fill="#f6e0c4" ${k()}/>
    <path d="M112 20 L142 20 L108 38 L90 38 Z" fill="#d4a373"/>
    <path d="M34 36 L52 24 L122 24 L100 36 Z" fill="#ffe08a" ${k(2.2)}/>
    <path d="M98 26 L118 26 L100 34 L86 34 Z" fill="#f0c36a"/>
    ${De("M48 30 q8 2 6 5 M68 28 q10 2 8 6 M58 34 h16")}
    <path d="M76 30 L100 36 L94 48 L70 42 Z" fill="#d7e6f2" ${k(2.2)}/>
    <path d="M88 34 L98 38 L94 44 L84 40 Z" fill="#b7c9d6"/>
    <path d="M52 8 L64 4 L90 34 L78 38 Z" fill="#f0d2b0" ${k()}/>
    <path d="M64 8 L72 6 L90 32 L82 34 Z" fill="#d4a373"/>
    <path d="M46 2 H66 V9 H46 Z" fill="#c99366" ${k(2)}/>
    ${N("M18 44 h26")}
    ${N("M44 22 h22")}`}),pw=de({kind:"little-slide",name:"Little Slide",cat:"furniture",w:150,h:188,vb:"0 0 110 140",svg:`${ce(56,44,134)}
    <path d="M50 34 H72 C94 36 102 56 98 82 L92 122 H70 L76 84 C78 60 72 46 52 44 Z" fill="#ffb3c6" ${k()}/>
    <path d="M72 38 C94 42 104 62 100 86 L94 122 H86 L92 86 C94 64 86 48 72 46 Z" fill="#e45d88"/>
    <rect x="14" y="34" width="8" height="96" rx="2" fill="#f3d2aa" ${k()}/>
    <rect x="36" y="34" width="8" height="96" rx="2" fill="#e7c49a" ${k()}/>
    <rect x="40" y="40" width="3" height="84" fill="#c99366"/>
    <rect x="14" y="52" width="30" height="5" rx="1" fill="#f6e0c4" ${k(2.2)}/>
    <rect x="14" y="70" width="30" height="5" rx="1" fill="#f6e0c4" ${k(2.2)}/>
    <rect x="14" y="88" width="30" height="5" rx="1" fill="#f6e0c4" ${k(2.2)}/>
    <rect x="14" y="106" width="30" height="5" rx="1" fill="#f6e0c4" ${k(2.2)}/>
    <rect x="6" y="18" width="56" height="22" rx="3" fill="#f3d2aa" ${k()}/>
    <rect x="6" y="34" width="56" height="6" fill="#d4a373"/>
    <path d="M48 20 H62 V40 H48 Z" fill="#c99366"/>
    ${N("M12 24 h22")}
    <rect x="12" y="6" width="5" height="16" rx="1" fill="#f0d2b0" ${k(2.2)}/>
    <rect x="40" y="6" width="5" height="16" rx="1" fill="#e7c49a" ${k(2.2)}/>
    <path d="M14 8 H43" fill="none" ${k(2.2)}/>
    <rect x="80" y="116" width="7" height="16" rx="1" fill="#f3d2aa" ${k(2)}/>
    ${N("M58 42 C74 48 86 66 86 88")}
    ${De("M80 64 q4 16 2 28")}`}),uw=de({kind:"yard-bench",name:"Garden Bench",cat:"furniture",w:140,h:100,vb:"0 0 140 100",svg:`${ce(70,58,96)}
    <rect x="10" y="8" width="12" height="86" rx="2" fill="#f3d2aa" ${k()}/>
    <rect x="118" y="8" width="12" height="86" rx="2" fill="#e7c49a" ${k()}/>
    <rect x="124" y="12" width="5" height="76" fill="#c99366"/>
    <rect x="28" y="52" width="10" height="42" rx="2" fill="#f0d2b0" ${k()}/>
    <rect x="102" y="52" width="10" height="42" rx="2" fill="#d4a373" ${k()}/>
    <rect x="108" y="56" width="3" height="32" fill="#c99366"/>
    <rect x="18" y="10" width="104" height="8" rx="1" fill="#f6e0c4" ${k(2.2)}/>
    <rect x="18" y="20" width="104" height="8" rx="1" fill="#f3d2aa" ${k(2.2)}/>
    <rect x="18" y="30" width="104" height="8" rx="1" fill="#f3d2aa" ${k(2.2)}/>
    <rect x="18" y="40" width="104" height="8" rx="1" fill="#e7c49a" ${k(2.2)}/>
    <rect x="18" y="48" width="104" height="7" rx="1" fill="#f6e0c4" ${k(2.2)}/>
    <rect x="18" y="57" width="104" height="7" rx="1" fill="#f3d2aa" ${k(2.2)}/>
    <rect x="18" y="66" width="104" height="7" rx="1" fill="#e7c49a" ${k(2.2)}/>
    <rect x="108" y="12" width="10" height="5" fill="#d4a373"/>
    <rect x="108" y="22" width="10" height="5" fill="#c99366"/>
    <rect x="108" y="50" width="10" height="4" fill="#d4a373"/>
    <rect x="108" y="68" width="10" height="4" fill="#c99366"/>
    <path d="M10 46 H40 V56 H10 Z" fill="#f6e0c4" ${k()}/>
    <path d="M100 46 H130 V56 H100 Z" fill="#e7c49a" ${k()}/>
    <path d="M116 48 H128 V54 H116 Z" fill="#c99366"/>
    ${N("M22 13 h28")}
    ${N("M14 48 h16")}
    ${De("M36 24 h48 M36 34 h44 M34 52 h52 M34 62 h46")}`}),mw=de({kind:"lemonade-cart",name:"Lemonade Cart",cat:"furniture",w:108,h:121,vb:"0 0 100 112",svg:`${ce(50,40,106)}
    <circle cx="30" cy="96" r="11" fill="${Ae}" ${k(2.2)}/><circle cx="30" cy="96" r="4.5" fill="#ffd166"/>
    <circle cx="72" cy="96" r="11" fill="${Ae}" ${k(2.2)}/><circle cx="72" cy="96" r="4.5" fill="#ffd166"/>
    <rect x="18" y="92" width="66" height="5" rx="2" fill="#c99366" ${k(2)}/>
    <rect x="16" y="46" width="68" height="46" rx="3" fill="#fff6ea" ${k()}/>
    <rect x="66" y="50" width="14" height="38" fill="#f0d2a4"/>
    ${De("M28 56 v28 M42 56 v28 M56 56 v28")}
    ${N("M20 52 v16")}
    <rect x="12" y="38" width="76" height="12" rx="2" fill="#ffe08a" ${k()}/>
    <rect x="66" y="40" width="18" height="8" fill="#f0c45c"/>
    <path d="M14 40 L22 14 H80 L88 40 Z" fill="#ff8fab" ${k()}/>
    <path d="M34 16 L38 40 H50 L46 15 Z" fill="#fff4f7"/>
    <path d="M58 15 L62 40 H74 L70 15 Z" fill="#fff4f7"/>
    <path d="M72 16 H80 L88 40 H76 Z" fill="#e45d88"/>
    ${N("M26 20 h18")}
    <path d="M28 52 H44 L42 72 H30 Z" fill="#fff" ${k(2)}/>
    <path d="M30 58 H42 L41 72 H31 Z" fill="#ffe566"/>
    <path d="M28 54 L22 58 L28 62 Z" fill="#fff" ${k(2)}/>
    <path d="M44 56 Q52 60 44 70" fill="none" ${k(2)}/>
    <path d="M56 60 H68 L66 72 H58 Z" fill="#fff" ${k(2)}/>
    <path d="M58 64 H66 L65 72 H59 Z" fill="#ffe566"/>
    <circle cx="78" cy="64" r="7" fill="#ffe566" ${k(2)}/>
    <path d="M78 58 v12 M72 64 h12" fill="none" stroke="#e0a83a" stroke-width="1.3"/>`}),yw=de({kind:"sun-lounger",name:"Sun Lounger",cat:"furniture",w:168,h:86,vb:"0 0 170 90",svg:`${ce(86,68,84)}
    <path d="M16 66 H28 L32 82 H12 Z" fill="#f3d2aa" ${k()}/>
    <path d="M126 64 H140 L146 82 H120 Z" fill="#d4a373" ${k()}/>
    <path d="M136 68 H142 L146 80 H138 Z" fill="#c99366"/>
    <path d="M12 52 H156 V64 H12 Z" fill="#f3d2aa" ${k()}/>
    <path d="M122 54 H154 V62 H122 Z" fill="#d4a373"/>
    <path d="M28 34 H36 L42 52 H32 Z" fill="#e7c49a" ${k()}/>
    <path d="M50 44 H150 L154 58 H54 Z" fill="#ffd4e2" ${k()}/>
    <path d="M128 48 H150 L154 58 H132 Z" fill="#e888a8"/>
    <path d="M18 6 L60 48 L48 58 L8 16 Z" fill="#ffb3c6" ${k()}/>
    <path d="M38 34 L54 48 L48 56 L30 42 Z" fill="#e45d88"/>
    <ellipse cx="22" cy="14" rx="11" ry="7" fill="#fff" ${k(2.2)}/>
    <path d="M22 8 H30 A7 7 0 0 1 30 20 H22 Z" fill="#ffd0e0"/>
    ${N("M22 12 L50 40")}
    ${De("M26 22 L52 46")}`}),kw=de({kind:"splash-pool",name:"Splash Pool",cat:"furniture",w:176,h:96,vb:"0 0 170 96",svg:`<defs>${Rl("ydpoolW","#f3fbff","#7ec8e3")}</defs>
    ${ce(85,72,90)}
    <ellipse cx="85" cy="58" rx="74" ry="28" fill="#8ecae6" ${k()}/>
    <path d="M22 52 Q40 34 78 40" fill="none" stroke="#ff8fab" stroke-width="16" stroke-linecap="round"/>
    <path d="M100 36 Q138 38 152 58" fill="none" stroke="#ffd166" stroke-width="14" stroke-linecap="round"/>
    <path d="M18 66 C22 82 50 90 85 90 C120 90 152 82 154 66 C148 78 120 84 85 84 C50 84 24 78 18 66 Z" fill="#5aa9c6"/>
    <ellipse cx="85" cy="54" rx="48" ry="16" fill="url(#ydpoolW)" ${k(2.2)}/>
    ${N("M36 50 q20 -10 36 0")}
    <circle cx="128" cy="48" r="4" fill="#fff" ${k(1.6)}/>
    <circle cx="128" cy="48" r="1.6" fill="#8ecae6"/>
    <path d="M70 46 q3 -8 1 0 M96 42 q4 -9 1 1" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`}),bw=de({kind:"picket-gate",name:"Picket Gate",cat:"furniture",w:110,h:150,vb:"0 0 100 136",svg:`${ce(50,38,130)}
    <rect x="6" y="16" width="12" height="110" rx="2" fill="#f7fff8" ${k()}/>
    <rect x="82" y="16" width="12" height="110" rx="2" fill="#e7f6ea" ${k()}/>
    <rect x="88" y="20" width="5" height="100" fill="#c5e0c8"/>
    <rect x="4" y="40" width="16" height="6" rx="1" fill="#c99366" ${k(2)}/>
    <rect x="4" y="96" width="16" height="6" rx="1" fill="#c99366" ${k(2)}/>
    <rect x="16" y="38" width="68" height="8" rx="2" fill="#fff" ${k(2.2)}/>
    <rect x="16" y="86" width="68" height="8" rx="2" fill="#fff" ${k(2.2)}/>
    <path d="M20 90 L28 98 L80 46 L72 38 Z" fill="#f7fff8" ${k(2.2)}/>
    <path d="M26 30 L32 14 L38 30 V112 H26 Z" fill="#fff" ${k(2.2)}/>
    <path d="M44 30 L50 14 L56 30 V112 H44 Z" fill="#f7fff8" ${k(2.2)}/>
    <path d="M62 30 L68 14 L74 30 V112 H62 Z" fill="#e7f6ea" ${k(2.2)}/>
    <path d="M68 22 L74 16 L74 108 H68 Z" fill="#c5e0c8"/>
    ${N("M28 36 v20")}
    <rect x="74" y="60" width="16" height="5" rx="1" fill="#c99366" ${k(2)}/>
    <circle cx="86" cy="62" r="2.6" fill="#ffd166" ${k(1.8)}/>`});function vw(){let e="";for(let t=0;t<6;t++)for(let n=0;n<13;n++)(t+n)%2===0&&(e+=`<rect x="${n*15-6}" y="${t*10}" width="15" height="10" fill="#ff8fab"/>`);return e}const ww=de({kind:"picnic-blanket",name:"Picnic Blanket",cat:"decor",w:110,h:36,vb:"0 0 180 59",svg:`<defs><clipPath id="ydging"><path d="M22 20 L156 12 L174 44 L36 52 Z"/></clipPath></defs>
    ${ce(96,74,54)}
    <path d="M22 20 L156 12 L174 44 L36 52 Z" fill="#fff0f5" ${k()}/>
    <g clip-path="url(#ydging)">${vw()}</g>
    <path d="M148 14 L170 42 L160 46 L138 18 Z" fill="#e45d88"/>
    <path d="M96 30 L128 26 L134 42 L100 46 Z" fill="#f3d2aa" ${k(2)}/>
    <path d="M120 28 L128 26 L134 42 L126 43 Z" fill="#c99366"/>
    <path d="M104 30 Q114 14 126 28" fill="none" ${k(2.2)}/>
    ${De("M104 34 h22 M104 38 h24",1)}
    ${N("M34 26 l28 -3")}`});function to(e,t,n,s){return`<path d="M${e-1.5} ${t+16} H${e+1.5} V${t+40} H${e-1.5} Z" fill="#3d9a68"/>
    <path d="M${e} ${t+24} C${e-16} ${t+18} ${e-14} ${t+36} ${e-1} ${t+34}" fill="#74c69d" ${k(1.6)}/>
    <path d="M${e} ${t+22} C${e+16} ${t+16} ${e+12} ${t+36} ${e+1} ${t+32}" fill="#52b788"/>
    <path d="M${e} ${t+18} C${e-10} ${t+8} ${e-8} ${t} ${e} ${t+6} C${e+8} ${t} ${e+10} ${t+8} ${e} ${t+18} Z" fill="${n}" ${k(1.8)}/>
    <path d="M${e+1} ${t+6} C${e+7} ${t+4} ${e+8} ${t+13} ${e+1} ${t+15} Z" fill="${s}"/>`}const $w=de({kind:"tulip-bed",name:"Tulip Bed",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`${ce(70,56,86)}
    <path d="M10 56 H130 L120 82 H20 Z" fill="#f0d2b0" ${k()}/>
    <path d="M96 58 H126 L118 78 H92 Z" fill="#d4a373"/>
    <path d="M16 56 Q70 42 124 56 Q70 64 16 56 Z" fill="#c4a484" ${k(2.2)}/>
    ${N("M22 60 h24")}
    ${to(32,16,"#ff8fab","#e45d88")}
    ${to(54,8,"#ffd166","#e0a83a")}
    ${to(76,4,"#ff7096","#e04578")}
    ${to(98,12,"#fff","#ffd0e0")}
    ${to(118,18,"#c9a0dc","#b388d6")}`}),xw=de({kind:"birdbath",name:"Birdbath",cat:"decor",w:84,h:126,vb:"0 0 80 120",svg:`<defs>${Rl("ydbathW","#f3fbff","#8ecae6")}</defs>
    ${ce(40,28,114)}
    <ellipse cx="40" cy="106" rx="20" ry="7" fill="#e7eef2" ${k()}/>
    <path d="M30 46 H50 C56 70 58 86 52 104 H28 C22 86 24 70 30 46 Z" fill="#f4f7f8" ${k()}/>
    <path d="M42 52 H50 C54 72 54 88 50 100 H44 Z" fill="#c5d0d6"/>
    ${N("M33 62 v22")}
    <ellipse cx="40" cy="40" rx="32" ry="13" fill="#f7fafb" ${k()}/>
    <path d="M40 28 C66 28 72 38 72 42 C72 52 58 54 40 54 C60 54 68 48 68 42 C68 36 58 32 40 34 Z" fill="#d5dee4"/>
    <ellipse cx="40" cy="38" rx="22" ry="7" fill="url(#ydbathW)" ${k(2.2)}/>
    ${N("M22 36 q10 -4 18 0")}
    <path d="M48 30 L40 24 L42 34 Z" fill="#f0c45c" ${k(1.6)}/>
    <ellipse cx="56" cy="28" rx="11" ry="6" fill="#ffd166" ${k(1.8)}/>
    <circle cx="66" cy="24" r="4.5" fill="#ffe08a" ${k(1.6)}/>
    <path d="M70 24 L77 26 L70 28 Z" fill="#e07a3f"/>
    <circle cx="67" cy="23" r="1" fill="${Ae}"/>
    <path d="M54 32 V40 M60 32 V40" fill="none" stroke="#c99366" stroke-width="1.4" stroke-linecap="round"/>`}),_w=de({kind:"lily-pond",name:"Lily Pond",cat:"decor",w:170,h:90,vb:"0 0 170 90",svg:`<defs>${Rl("ydpondW","#eaf6ff","#5aa9e6")}</defs>
    ${ce(85,70,84)}
    <ellipse cx="85" cy="54" rx="74" ry="28" fill="#c4a484" ${k()}/>
    <path d="M85 30 C142 32 158 48 158 56 C158 72 126 82 85 82 C124 80 150 68 150 56 C150 44 126 36 85 36 Z" fill="#a88462"/>
    <ellipse cx="85" cy="52" rx="62" ry="20" fill="url(#ydpondW)" ${k(2.2)}/>
    ${N("M40 46 q24 -8 42 2")}
    <path fill="#95d5b2" ${k(2)} fill-rule="evenodd" d="M58 54 m-16 0 a16 7 0 1 0 32 0 a16 7 0 1 0 -32 0 M58 50 L72 54 L58 58 Z"/>
    <path d="M66 50 L74 54 L66 56 Z" fill="#3d9a68"/>
    <path fill="#74c69d" ${k(2)} fill-rule="evenodd" d="M112 48 m-18 0 a18 8 0 1 0 36 0 a18 8 0 1 0 -36 0 M112 42 L128 48 L112 54 Z"/>
    <path d="M40 58 q-4 -16 2 -22 q6 8 2 16" fill="#52b788" ${k(1.6)}/>
    <path d="M108 40 l2 -8 l4 6 l4 -7 l2 8 l-4 3 z" fill="#ff8fab" ${k(1.6)}/>
    <path d="M112 36 l3 -6 l2 5 l3 -5 l1 6 z" fill="#fff" ${k(1.4)}/>
    <circle cx="112" cy="40" r="2.4" fill="#ffd166"/>`});function no(e,t,n,s,o=10){return`<path d="M${e} ${t-o-8} V${t-o}" fill="none" ${k(2.2)}/>
    <rect x="${e-4}" y="${t-o-2}" width="8" height="5" rx="1" fill="#c99366" ${k(1.8)}/>
    <circle cx="${e}" cy="${t}" r="${o}" fill="${n}" ${k()}/>
    <path d="M${e+1} ${t-o+3} H${e+o-1} V${t+o-3} H${e+2} Z" fill="${s}"/>
    ${N(`M${e-o+3} ${t-2} q2 -3 4 0`)}`}const Mw=de({kind:"patio-lights",name:"Patio Lights",cat:"decor",w:190,h:70,vb:"0 0 180 70",wall:!0,svg:`<path d="M8 12 Q50 32 90 12 Q130 32 172 14" fill="none" ${k()}/>
    ${no(28,40,"#fff6c8","#f0c45c")}
    ${no(64,46,"#ffc2d4","#e45d88")}
    ${no(100,36,"#fff1c2","#f0c45c")}
    ${no(136,46,"#c9f1ff","#7eb4dc")}
    ${no(164,34,"#ffd0e8","#e888a8",8)}`}),Lw=de({kind:"toadstool-light",name:"Toadstool Light",cat:"decor",w:70,h:84,vb:"0 0 80 96",svg:`<defs>${Wl("ydtoadG","#ffe7a0",".9")}</defs>
    ${ce(40,26,90)}
    <ellipse cx="40" cy="70" rx="18" ry="8" fill="url(#ydtoadG)"/>
    <path d="M32 58 H48 L52 84 H28 Z" fill="#fff7f8" ${k()}/>
    <path d="M42 60 H48 L50 82 H43 Z" fill="#f0d8cc"/>
    <path d="M6 58 Q40 8 74 58 Q40 74 6 58 Z" fill="#ff8fab" ${k()}/>
    <path d="M44 22 Q66 16 72 54 Q52 66 44 52 Z" fill="#e45d88"/>
    ${N("M18 48 q16 -12 26 -2")}
    <circle cx="26" cy="48" r="5" fill="#fff" ${k(2)}/>
    <circle cx="44" cy="40" r="6" fill="#fff" ${k(2)}/>
    <circle cx="36" cy="56" r="3.5" fill="#fff" ${k(2)}/>
    <path d="M22 52 h6 M40 46 h8" fill="none" stroke="#ffd0e0" stroke-width="1.2" stroke-linecap="round"/>`}),Cw=de({kind:"stepping-stones",name:"Stepping Stones",cat:"decor",w:160,h:64,vb:"0 0 160 70",svg:`${ce(80,66,64)}
    <path d="M8 40 L24 28 L50 32 L54 50 L30 58 L10 52 Z" fill="#f7f4ef" ${k()}/>
    <path d="M34 36 L50 32 L54 50 L36 54 Z" fill="#d9d3cc"/>
    <path d="M56 44 L78 32 L108 36 L112 56 L80 64 L58 58 Z" fill="#f4f1ec" ${k()}/>
    <path d="M86 40 L108 36 L112 56 L90 58 Z" fill="#d4cdc4"/>
    <path d="M110 30 L128 20 L154 28 L150 48 L124 52 L108 42 Z" fill="#e7e2dc" ${k()}/>
    <path d="M132 26 L152 28 L148 46 L130 44 Z" fill="#d0c9c2"/>
    ${N("M16 38 q8 -4 14 0")}
    ${De("M22 44 h12 M72 48 h16 M124 36 h12")}`}),Sw=de({kind:"pinwheel",name:"Pinwheel",cat:"decor",w:56,h:90,vb:"0 0 70 100",holdable:!0,svg:`${ce(35,16,96)}
    <rect x="31" y="44" width="6" height="50" rx="2" fill="#c99366" ${k()}/>
    <rect x="34" y="48" width="3" height="42" fill="#c99366"/>
    <path d="M34 40 L34 8 Q54 16 48 36 Z" fill="#ff8fab" ${k(2.2)}/>
    <path d="M42 18 Q50 28 36 34 Z" fill="#e45d88"/>
    <path d="M34 40 L62 32 Q58 54 40 50 Z" fill="#ffd166" ${k(2.2)}/>
    <path d="M54 38 Q58 48 42 46 Z" fill="#e0a83a"/>
    <path d="M34 40 L34 72 Q14 64 20 44 Z" fill="#8ecae6" ${k(2.2)}/>
    <path d="M26 58 Q16 50 32 46 Z" fill="#5aa9d6"/>
    <path d="M34 40 L6 48 Q12 26 28 30 Z" fill="#c9a0dc" ${k(2.2)}/>
    <path d="M16 36 Q14 28 28 34 Z" fill="#b388d6"/>
    <circle cx="34" cy="40" r="5" fill="#fff" ${k(2.2)}/>
    <circle cx="34" cy="40" r="1.8" fill="${Ae}"/>`}),Bw=de({kind:"rain-barrel",name:"Rain Barrel",cat:"decor",w:86,h:108,vb:"0 0 80 110",svg:`${ce(40,30,104)}
    <path d="M22 30 C12 48 12 78 22 98 H58 C68 78 68 48 58 30 Z" fill="#8ecae6" ${k()}/>
    <path d="M46 34 C58 48 60 76 54 96 H58 C66 76 66 50 56 32 Z" fill="#5aa9c6"/>
    ${De("M28 40 v48 M36 36 v54 M44 38 v50")}
    ${N("M24 42 v24")}
    <ellipse cx="40" cy="30" rx="20" ry="8" fill="#bde0fe" ${k()}/>
    <ellipse cx="46" cy="30" rx="10" ry="5" fill="#7eb4dc"/>
    <path d="M16 48 H64" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <path d="M14 74 H66" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <rect x="56" y="78" width="14" height="7" rx="2" fill="#d7ecff" ${k(2)}/>
    <path d="M70 81 h6" fill="none" ${k(2)}/>
    <path d="M34 18 q6 -8 12 0" fill="none" stroke="#7eb4dc" stroke-width="2.2" stroke-linecap="round"/>`}),Hw=de({kind:"butterfly-bush",name:"Butterfly Bush",cat:"plants",w:120,h:130,vb:"0 0 100 120",svg:`${ce(50,40,114)}
    <ellipse cx="32" cy="86" rx="22" ry="18" fill="#95d5b2" ${k(2.2)}/>
    <ellipse cx="70" cy="84" rx="24" ry="20" fill="#3d9a68" ${k(2.2)}/>
    <ellipse cx="50" cy="78" rx="36" ry="28" fill="#74c69d" ${k()}/>
    <path d="M18 90 Q50 108 84 88 Q68 100 50 102 Q30 100 18 90 Z" fill="#3d9a68"/>
    ${N("M24 68 q14 -8 26 2")}
    ${De("M28 80 q4 6 0 10 M46 72 q5 8 0 12 M66 78 q4 6 0 10")}
    <path d="M30 62 C28 44 32 26 35 24 C39 28 40 46 38 62 Z" fill="#c9a0dc" ${k(1.8)}/>
    <circle cx="33" cy="36" r="2.2" fill="#f7ecff"/><circle cx="36" cy="46" r="2.2" fill="#b388d6"/><circle cx="33" cy="54" r="2" fill="#f7ecff"/>
    <path d="M46 58 C44 36 50 14 53 12 C57 16 58 40 54 58 Z" fill="#b388d6" ${k(1.8)}/>
    <circle cx="50" cy="28" r="2.4" fill="#f7ecff"/><circle cx="53" cy="40" r="2.4" fill="#c9a0dc"/><circle cx="50" cy="50" r="2.2" fill="#f7ecff"/>
    <path d="M62 60 C62 42 68 28 71 26 C75 30 76 46 72 60 Z" fill="#a78bfa" ${k(1.8)}/>
    <circle cx="67" cy="38" r="2.2" fill="#f7ecff"/><circle cx="70" cy="48" r="2" fill="#c9a0dc"/>
    <path d="M14 26 C4 14 2 24 10 32 C14 36 18 32 18 28 Z" fill="#ff8fab" ${k(1.6)}/>
    <path d="M20 24 C30 12 34 24 26 34 C22 38 20 30 20 26 Z" fill="#c9a0dc" ${k(1.6)}/>
    <path d="M12 30 C6 36 6 46 14 46 C18 44 20 36 18 30 Z" fill="#ffd166" ${k(1.6)}/>
    <path d="M22 30 C30 36 32 46 24 48 C20 44 18 36 20 30 Z" fill="#8ecae6" ${k(1.6)}/>
    <ellipse cx="18" cy="32" rx="2" ry="7" fill="${Ae}"/>
    <path d="M16 26 Q12 18 10 14 M20 26 Q24 18 28 14" fill="none" stroke="${Ae}" stroke-width="1.3" stroke-linecap="round"/>`}),Pw=de({kind:"hedge-row",name:"Hedge Row",cat:"plants",w:190,h:96,vb:"0 0 180 96",svg:`${ce(90,78,90)}
    <path d="M16 84 C28 70 40 62 52 66 C62 52 78 50 90 62 C102 50 118 52 128 66 C140 58 156 64 164 74 L164 86 L16 86 Z" fill="#2f7d52"/>
    <path d="M10 82 L10 60 C10 50 18 46 26 50 C32 34 46 32 54 48 C60 30 76 28 84 46 C92 28 108 28 116 46 C124 30 140 32 148 48 C156 36 166 42 170 54 L170 82 Z" fill="#74c69d" ${k()}/>
    <path d="M148 46 C160 38 170 50 170 70 L170 82 L140 82 L146 58 Z" fill="#52b788"/>
    <path d="M22 64 C40 54 58 58 70 50 C84 60 100 48 116 56 C128 48 146 56 158 64" fill="none" stroke="#95d5b2" stroke-width="6" stroke-linecap="round" opacity=".85"/>
    <path d="M14 68 C48 78 132 76 166 66 L168 82 L12 82 Z" fill="#3d9a68"/>
    ${De("M28 58 q3 5 0 8 M48 54 q3 6 0 9 M70 52 q3 6 1 9 M94 52 q3 6 0 10 M118 54 q3 6 0 9 M142 56 q3 5 0 8")}
    ${N("M18 58 q10 -4 16 1")}
    ${N("M58 42 q12 -4 16 2")}`}),Tw=de({kind:"lemonade-cup",name:"Lemonade Cup",cat:"food",w:52,h:70,vb:"0 0 70 90",holdable:!0,svg:`${ce(35,22,84)}
    <path d="M18 32 H52 L46 76 H24 Z" fill="#fff" ${k()}/>
    <path d="M40 34 H50 L46 74 H40 Z" fill="#f0e6d8"/>
    <path d="M20 44 H50 L46 76 H24 Z" fill="#ffe566"/>
    <path d="M40 46 H48 L46 74 H40 Z" fill="#f0c45c"/>
    <ellipse cx="35" cy="44" rx="15" ry="6" fill="#fff3a0" ${k(2)}/>
    <ellipse cx="35" cy="32" rx="17" ry="7" fill="#fff" ${k()}/>
    <path d="M40 42 L48 16 H58" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="20" cy="30" r="8" fill="#ffe566" ${k(1.8)}/>
    <path d="M20 23 v14 M14 30 h12" fill="none" stroke="#fff" stroke-width="1.4"/>
    <path d="M16 26 q4 4 8 0 M16 34 q4 -4 8 0" fill="none" stroke="#e0a83a" stroke-width="1.2"/>
    ${N("M24 38 v14")}`}),Ww=de({kind:"picnic-table",name:"Picnic Table",cat:"furniture",w:180,h:110,vb:"0 0 160 100",svg:`${ce(80,68,96)}
    <rect x="18" y="62" width="124" height="10" rx="2" fill="#e7c49a" ${k()}/>
    <rect x="118" y="64" width="20" height="7" fill="#c99366"/>
    <rect x="28" y="70" width="8" height="24" rx="1" fill="#f3d2aa" ${k(2)}/>
    <rect x="124" y="70" width="8" height="24" rx="1" fill="#d4a373" ${k(2)}/>
    <rect x="8" y="78" width="40" height="8" rx="2" fill="#f6e0c4" ${k(2)}/>
    <rect x="112" y="78" width="40" height="8" rx="2" fill="#e7c49a" ${k(2)}/>
    <rect x="22" y="36" width="116" height="14" rx="2" fill="#f6e0c4" ${k()}/>
    <rect x="110" y="38" width="24" height="10" fill="#d4a373"/>
    <rect x="36" y="48" width="8" height="18" fill="#f3d2aa" ${k(2)}/>
    <rect x="116" y="48" width="8" height="18" fill="#d4a373" ${k(2)}/>
    ${N("M28 40 h36")}
    ${De("M40 42 h50 M34 66 h70")}`}),Rw=de({kind:"seesaw",name:"Seesaw",cat:"furniture",w:200,h:80,vb:"0 0 180 80",svg:`${ce(90,74,76)}
    <path d="M78 58 H102 L96 74 H84 Z" fill="#f3d2aa" ${k()}/>
    <path d="M94 60 H100 L96 72 H92 Z" fill="#c99366"/>
    <rect x="10" y="40" width="160" height="12" rx="3" fill="#ffd166" ${k()} transform="rotate(-8 90 46)"/>
    <rect x="130" y="28" width="28" height="8" fill="#e0a83a"/>
    <rect x="16" y="34" width="28" height="10" rx="2" fill="#ff8fab" ${k(2)}/>
    <rect x="136" y="22" width="28" height="10" rx="2" fill="#8ecae6" ${k(2)}/>
    ${N("M24 44 h40")}`}),Ew=de({kind:"wagon",name:"Wagon",cat:"furniture",w:130,h:90,vb:"0 0 130 90",svg:`${ce(64,50,86)}
    <circle cx="36" cy="74" r="12" fill="${Ae}" ${k(2)}/><circle cx="36" cy="74" r="5" fill="#ffd166"/>
    <circle cx="96" cy="74" r="12" fill="${Ae}" ${k(2)}/><circle cx="96" cy="74" r="5" fill="#ffd166"/>
    <path d="M22 40 H108 L100 68 H30 Z" fill="#e45d88" ${k()}/>
    <path d="M86 42 H106 L100 66 H84 Z" fill="#c93b68"/>
    <rect x="28" y="28" width="76" height="14" rx="3" fill="#ff8fab" ${k()}/>
    <path d="M108 36 H122 L118 58" fill="none" ${k(2.4)}/>
    ${N("M32 46 h28")}
    ${De("M40 54 h40")}`}),Qw=de({kind:"birdhouse",name:"Birdhouse",cat:"decor",w:70,h:120,vb:"0 0 80 130",svg:`${ce(40,22,124)}
    <rect x="34" y="70" width="12" height="50" rx="2" fill="#d4a373" ${k()}/>
    <rect x="40" y="74" width="5" height="42" fill="#c99366"/>
    <path d="M12 62 L40 28 L68 62 Z" fill="#e45d88" ${k()}/>
    <path d="M40 32 L66 60 H52 Z" fill="#c93b68"/>
    <rect x="18" y="60" width="44" height="36" rx="3" fill="#f6e0c4" ${k()}/>
    <rect x="48" y="64" width="10" height="28" fill="#e7c49a"/>
    <circle cx="40" cy="76" r="7" fill="#5a3d5c"/>
    <rect x="36" y="86" width="14" height="4" rx="1" fill="#d4a373" ${k(1.6)}/>
    ${N("M22 66 h12")}`}),Aw=de({kind:"sprinkler",name:"Sprinkler",cat:"decor",w:80,h:70,vb:"0 0 100 80",svg:`${ce(50,28,76)}
    <ellipse cx="50" cy="66" rx="22" ry="8" fill="#74c69d" ${k()}/>
    <rect x="44" y="40" width="12" height="26" rx="3" fill="#8ecae6" ${k()}/>
    <circle cx="50" cy="36" r="8" fill="#ffd166" ${k()}/>
    <path d="M50 28 C30 16 18 20 12 10" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 28 C70 14 84 18 90 8" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 26 C40 8 58 4 50 2" fill="none" stroke="#c9ecff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="12" cy="10" r="2.2" fill="#c9ecff"/><circle cx="90" cy="8" r="2.2" fill="#c9ecff"/><circle cx="50" cy="2" r="2.2" fill="#fff"/>
    ${N("M46 44 v10")}`}),Uw=de({kind:"beach-ball",name:"Beach Ball",cat:"decor",w:70,h:70,vb:"0 0 80 80",svg:`${ce(40,26,76)}
    <circle cx="40" cy="40" r="28" fill="#fff" ${k()}/>
    <path d="M40 12 A28 28 0 0 1 66 32 L40 40 Z" fill="#ff8fab"/>
    <path d="M66 48 A28 28 0 0 1 40 68 L40 40 Z" fill="#ffd166"/>
    <path d="M24 64 A28 28 0 0 1 14 36 L40 40 Z" fill="#8ecae6"/>
    <path d="M18 28 A28 28 0 0 1 40 12 L40 40 Z" fill="#b7e4c7"/>
    <circle cx="40" cy="40" r="5" fill="#fff" ${k(2)}/>
    ${N("M28 24 q6 -4 10 2")}`}),zw=de({kind:"patio-umbrella",name:"Patio Umbrella",cat:"furniture",w:150,h:180,vb:"0 0 120 150",svg:`${ce(60,36,144)}
    <path d="M10 58 Q60 18 110 58 L98 64 Q60 32 22 64 Z" fill="#ffb3c6" ${k()}/>
    <path d="M60 22 L108 56 L96 62 Z" fill="#e45d88"/>
    <path d="M28 40 Q44 30 60 36 Q76 28 96 42" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <rect x="56" y="58" width="8" height="78" rx="2" fill="#f3d2aa" ${k()}/>
    <rect x="60" y="62" width="3" height="70" fill="#d4a373"/>
    <rect x="40" y="128" width="40" height="8" rx="2" fill="#e7c49a" ${k(2)}/>
    ${N("M24 50 q16 -8 24 0")}`}),Dw=de({kind:"veggie-patch",name:"Vegetable Patch",cat:"plants",w:150,h:80,vb:"0 0 150 80",svg:`${ce(75,62,76)}
    <rect x="8" y="28" width="134" height="44" rx="4" fill="#c99366" ${k()}/>
    <rect x="16" y="34" width="118" height="32" fill="#8d6e4c"/>
    <path d="M36 48 C36 36 48 34 48 46 C48 34 60 36 58 48 Z" fill="#74c69d" ${k(2)}/>
    <path d="M78 50 C78 38 90 36 90 48 C90 36 102 38 100 50 Z" fill="#52b788" ${k(2)}/>
    <path d="M112 52 L120 30 L128 52 Z" fill="#ff922b" ${k(2)}/>
    <path d="M118 32 Q124 22 130 28" fill="none" stroke="#2f7d52" stroke-width="2" stroke-linecap="round"/>
    ${N("M18 36 h24")}`}),qw=de({kind:"hammock",name:"Hammock",cat:"furniture",w:190,h:110,vb:"0 0 170 100",svg:`${ce(85,70,96)}
    <rect x="8" y="18" width="10" height="74" rx="2" fill="#d4a373" ${k()}/>
    <rect x="152" y="18" width="10" height="74" rx="2" fill="#c99366" ${k()}/>
    <path d="M18 28 Q85 78 152 28" fill="none" stroke="#5a3d5c" stroke-width="2"/>
    <path d="M18 36 Q85 88 152 36 L152 48 Q85 96 18 48 Z" fill="#8ecae6" ${k()}/>
    <path d="M120 40 Q140 62 150 44 L150 54 Q136 74 112 52 Z" fill="#5fb0d8"/>
    ${N("M36 46 q24 10 30 4")}
    ${De("M40 58 q30 16 50 4")}`}),Zw=de({kind:"garden-gnome",name:"Garden Gnome",cat:"decor",w:64,h:100,vb:"0 0 70 110",svg:`${ce(35,22,104)}
    <path d="M18 78 H52 L48 100 H22 Z" fill="#3d7ec4" ${k()}/>
    <path d="M40 80 H50 L48 98 H42 Z" fill="#2c5f96"/>
    <circle cx="35" cy="62" r="16" fill="#f6d2b5" ${k()}/>
    <path d="M20 66 Q35 78 50 66 Q46 74 35 76 Q24 74 20 66 Z" fill="#fff"/>
    <circle cx="29" cy="60" r="2" fill="${Ae}"/><circle cx="41" cy="60" r="2" fill="${Ae}"/>
    <path d="M16 52 L35 18 L54 52 Z" fill="#e45d88" ${k()}/>
    <path d="M35 22 L52 50 H42 Z" fill="#c93b68"/>
    <ellipse cx="35" cy="52" rx="16" ry="4" fill="#ff8fab" ${k(2)}/>
    ${N("M22 40 l8 -8")}`}),Vo=[gw,hw,pw,uw,mw,yw,kw,bw,ww,$w,xw,_w,Mw,Lw,Cw,Sw,Bw,Hw,Pw,Tw,Ww,Rw,Ew,Qw,Aw,Uw,zw,Dw,qw,Zw];function Iw(e,t){for(const n of Vo)t[n.kind]||(e.push(n),t[n.kind]=n)}function gr(e,t,n){return`<g>
    <ellipse cx="${e-22*n}" cy="${t}" rx="${26*n}" ry="${14*n}" fill="#fff"/>
    <ellipse cx="${e+18*n}" cy="${t-2*n}" rx="${30*n}" ry="${16*n}" fill="#fff"/>
    <ellipse cx="${e}" cy="${t+4*n}" rx="${34*n}" ry="${13*n}" fill="#fff"/>
  </g>`}function Ow(e,t,n,s,o){const a=l=>`<rect x="${e-2}" y="${l}" width="${t-e+12+4}" height="8" rx="3" fill="#fff" ${k(2.2)}/><rect x="${(t-40).toFixed(1)}" y="${l+1}" width="30" height="6" rx="2" fill="#d5ead8"/>`;let r=a(n+26)+a(s-28);for(let l=e;l<=t;l+=o)r+=`<path d="M${l} ${n+12} L${l+12/2} ${n} L${l+12} ${n+12} V${s} H${l} Z" fill="#f7fff8" ${k(2.2)}/>`,r+=`<path d="M${(l+12*.58).toFixed(1)} ${n+10} H${l+12-1} V${s-4} H${(l+12*.58).toFixed(1)} Z" fill="#d5ead8"/>`,r+=`<path d="M${l+2} ${n+18} v22" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".75" fill="none"/>`;return r}function Nw(e,t){const s=150+46*t,o=372-s;return`<g id="yardTree">
    <rect x="${e-14*t}" y="${s}" width="${28*t}" height="${o}" rx="${6*t}" fill="#e7b98a" ${k()}/>
    <rect x="${e+4*t}" y="${s+8*t}" width="${8*t}" height="${o-16*t}" fill="#c99366"/>
    ${De(`M${e-4*t} ${s+28*t} v${36*t}`)}
    ${N(`M${e-8*t} ${s+16*t} v${22*t}`)}
    <ellipse cx="${e+8*t}" cy="${150+18*t}" rx="${78*t}" ry="${46*t}" fill="#2f7d52"/>
    <ellipse cx="${e-48*t}" cy="${150+10*t}" rx="${36*t}" ry="${30*t}" fill="#245e3e"/>
    <ellipse cx="${e-34*t}" cy="${150+16*t}" rx="${42*t}" ry="${34*t}" fill="#95d5b2" ${k(2.2)}/>
    <ellipse cx="${e}" cy="150" rx="${68*t}" ry="${50*t}" fill="#74c69d" ${k()}/>
    <ellipse cx="${e+40*t}" cy="${150+8*t}" rx="${40*t}" ry="${36*t}" fill="#3d9a68" ${k(2.2)}/>
    <ellipse cx="${e-8*t}" cy="${150-6*t}" rx="${28*t}" ry="${20*t}" fill="#b7e4c7" opacity=".95"/>
    ${De(`M${e-20*t} ${150+8*t} q${8*t} ${6*t} 0 ${12*t} M${e+10*t} ${150-4*t} q${8*t} ${6*t} 2 ${12*t} M${e+28*t} ${150+12*t} q${6*t} ${5*t} 0 ${10*t}`)}
    ${N(`M${e-36*t} ${150-18*t} q${16*t} -8 ${28*t} 2`)}
  </g>`}function Fw(){return`<svg class="yardWorld" viewBox="0 0 2400 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ydsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6eb6e8"/>
        <stop offset=".48" stop-color="#c5e6fb"/>
        <stop offset="1" stop-color="#fff3df"/>
      </linearGradient>
      ${Wl("ydsun","#ffe566",".55")}
    </defs>
    <rect width="2400" height="430" fill="url(#ydsky)"/>
    <circle id="ydSunGlow" cx="1180" cy="68" r="62" fill="url(#ydsun)"/>
    <circle id="ydSun" cx="1180" cy="68" r="30" fill="#ffe566"/>
    <circle cx="1170" cy="58" r="8" fill="#fff" opacity=".8"/>
    ${gr(980,96,1.05)}${gr(1320,78,.85)}${gr(1500,120,.7)}
    <rect y="360" width="2400" height="240" fill="#c6ef9a"/>
    <rect y="360" width="2400" height="28" fill="#e7f8c8"/>
    <rect y="520" width="2400" height="80" fill="#9ed67a"/>
    <path d="M1040 470 q30 -12 16 -6 M1200 510 q28 -12 14 -4 M1360 548 q24 -10 12 -4" fill="none" stroke="#3d9a68" stroke-width="1.2" stroke-linecap="round" opacity=".22"/>
    ${Ow(846,2118,258,372,24)}
    ${Nw(1184,.8)}
    <path d="M840 120 H1076 L1054 152 H862 Z" fill="#ffb3c6" ${k()}/>
    <path d="M960 126 H1064 L1046 148 H976 Z" fill="#e45d88"/>
    ${N("M876 132 h56")}
    <rect x="864" y="150" width="196" height="222" rx="4" fill="#fff6ea" ${k()}/>
    <rect x="1044" y="156" width="12" height="210" fill="#f0dcc4"/>
    ${De("M880 174 H1000 M880 202 H1000 M880 230 H990 M880 294 H1000 M880 334 H980")}
    <rect x="884" y="180" width="44" height="36" rx="4" fill="#c9ecff" ${k(2.2)}/>
    <rect x="912" y="184" width="12" height="28" fill="#8ecae6"/>
    <path d="M906 180 V216 M884 198 H928" fill="none" ${k(2.2)}/>
    ${N("M890 188 h12")}
  </svg>`}function jw(e,t,n,s,o){const i=(600-t)/600*100,a=(n/2400*100).toFixed(3),r=(s/600*100).toFixed(3);return o==="right"?`right:${((2400-(e+n/2))/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`:`left:${((e-n/2)/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`}function Vw(){return`<svg class="doorArt" viewBox="0 0 100 230">
    <rect x="4" y="2" width="92" height="226" rx="3" fill="#f3d2aa" ${k()}/>
    <rect x="76" y="6" width="16" height="218" fill="#d4a373"/>
    <rect x="14" y="12" width="72" height="206" rx="2" fill="#f6e9ff" ${k(2.2)}/>
    <rect x="70" y="16" width="12" height="198" fill="#d4b4e6"/>
    <rect x="24" y="22" width="52" height="42" rx="3" fill="#c9ecff" ${k(2.2)}/>
    <rect x="60" y="26" width="12" height="34" fill="#8ecae6"/>
    <path d="M50 22 V64 M24 43 H76" fill="none" ${k(2.2)}/>
    ${N("M28 28 h18")}
    <rect x="24" y="76" width="52" height="56" rx="3" fill="#f7ecff" ${k(2.2)}/>
    <rect x="62" y="80" width="10" height="48" fill="#e0c8f0"/>
    ${N("M28 84 v22")}
    <rect x="24" y="144" width="52" height="56" rx="3" fill="#f7ecff" ${k(2.2)}/>
    <rect x="62" y="148" width="10" height="48" fill="#e0c8f0"/>
    <circle cx="64" cy="126" r="4.2" fill="#ffd166" ${k(2.2)}/>
    <rect x="10" y="214" width="80" height="10" rx="2" fill="#e7c49a" ${k(2.2)}/>
  </svg>`}function Gw(e){const t=e==="living"?Rf:Ef,n=e==="living"?"backyard":"living",s=e==="living"?"Backyard":"Back inside",o=e==="yard"?"right":"left";return`<button type="button" class="yardDoor" data-yard-go="${n}" aria-label="${s}" style="${jw(t.x,t.y,t.w,t.h,o)}">${Vw()}<span class="yardHintLabel"><span>${s}</span></span></button>`}function El(e,t){const n=e.replace(/[&<>]/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[s]);return`<figure class="ysCard"><div class="ysArt">${t}</div><figcaption>${n}</figcaption></figure>`}function Yw(){return`<div class="yardSheet" data-yard-sheet="1"><h1>Backyard pieces</h1><div class="ysGrid">${Vo.map(t=>El(t.name,Ft(t))).join("")}</div></div>`}function Kw(e,t){return El(e,`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${t}</svg>`)}function Xw(){const e=(r,l)=>ce(r,l,96.4),t=`
    ${e(50,40)}
    <path d="M18 58 V30 Q18 18 32 18 H68 Q82 18 82 30 V58 Z" fill="#ffb7cc" ${k()}/>
    <path d="M56 24 H76 Q80 24 80 32 V52 H56 Z" fill="#e888a8"/>
    <circle cx="34" cy="38" r="3.4" fill="#ff8fab" ${k(2)}/><circle cx="33" cy="37" r="1.1" fill="#fff"/>
    <circle cx="50" cy="36" r="3.4" fill="#ff8fab" ${k(2)}/><circle cx="49" cy="35" r="1.1" fill="#fff"/>
    <circle cx="66" cy="38" r="3.4" fill="#e45d88" ${k(2)}/><circle cx="65" cy="37" r="1.1" fill="#fff"/>
    <rect x="4" y="44" width="20" height="38" rx="10" fill="#ff7096" ${k()}/>
    <ellipse cx="14" cy="44" rx="12" ry="9" fill="#ff9ab6" ${k()}/>
    <ellipse cx="9" cy="41" rx="4" ry="2.4" fill="#fff" opacity=".7"/>
    <rect x="76" y="44" width="20" height="38" rx="10" fill="#e04878" ${k()}/>
    <ellipse cx="86" cy="44" rx="12" ry="9" fill="#e45d88" ${k()}/>
    <rect x="20" y="64" width="60" height="16" rx="6" fill="#ff8fab" ${k()}/>
    <rect x="22" y="56" width="28" height="22" rx="7" fill="#ffe0ea" ${k(2.4)}/>
    <rect x="50" y="56" width="28" height="22" rx="7" fill="#ffc2d4" ${k(2.4)}/>
    <rect x="66" y="58" width="10" height="18" rx="4" fill="#e888a8"/>
    <path d="M26 60 h20 M54 60 h16 M26 74 h20 M54 74 h16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M50 58 v18" fill="none" stroke="#e45d88" stroke-width="2.2" stroke-linecap="round"/>
    <rect x="26" y="46" width="20" height="16" rx="5" fill="#fff" ${k(2.2)}/>
    <path d="M33 52 c-2.2 -3.2 -6.4 -.4 -3.4 2.6 c1 1.2 3.4 2.6 3.4 2.6 c0 0 2.4 -1.4 3.4 -2.6 c3 -3 -1.2 -5.8 -3.4 -2.6 z" fill="#ff8fab"/>
    <path d="M41 56 c-1.4 -2 -4.2 0 -2.2 1.8 c.7 .8 2.2 1.6 2.2 1.6 c0 0 1.5 -.8 2.2 -1.6 c2 -1.8 -.8 -3.8 -2.2 -1.8 z" fill="#7eb4dc"/>
    <rect x="16" y="84" width="7" height="10" rx="2" fill="${Ae}"/>
    <rect x="77" y="84" width="7" height="10" rx="2" fill="${Ae}"/>`,n=`
    <defs>${Wl("a2lamp-glow","#ffd56a",".95")}</defs>
    ${e(50,22)}
    <path d="M34 8 L42 8 L37 40 L24 40 Z" fill="#fff6d4"/>
    <path d="M42 8 L50 8 L50 40 L37 40 Z" fill="#ffe08a"/>
    <path d="M50 8 L58 8 L63 40 L50 40 Z" fill="#f0c45c"/>
    <path d="M58 8 L66 8 L76 40 L63 40 Z" fill="#e0a83a"/>
    <path d="M24 40 L34 8 H66 L76 40 Z" fill="none" ${k()}/>
    <path d="M42 8 L37 40 M50 8 V40 M58 8 L63 40" fill="none" stroke="${Ae}" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="50" cy="36" rx="20" ry="10" fill="url(#a2lamp-glow)"/>
    <rect x="46" y="40" width="8" height="42" rx="3" fill="#e4ccf2" ${k()}/>
    <rect x="50" y="44" width="4" height="34" rx="2" fill="#c49ad4"/>
    <ellipse cx="50" cy="88" rx="20" ry="6" fill="#d4b4e6" ${k()}/>
    <ellipse cx="60" cy="90" rx="8" ry="3" fill="#b888c8"/>
    <ellipse cx="42" cy="86" rx="6" ry="2" fill="#fff" opacity=".55"/>`,s=`
    ${e(50,30)}
    <ellipse cx="30" cy="40" rx="14" ry="22" fill="#b7ebc8" ${k()} transform="rotate(-30 30 40)"/>
    <path d="M34 28 C30 40 32 52 44 58" fill="#52b078"/>
    <ellipse cx="72" cy="42" rx="13" ry="20" fill="#3d9a68" ${k()} transform="rotate(26 72 42)"/>
    <path d="M50 66 C40 44 42 18 50 6 C58 18 60 44 50 66 Z" fill="#d8f6e4" ${k()}/>
    <path d="M54 18 C60 32 58 48 50 58 C56 44 58 28 54 18 Z" fill="#52b078"/>
    <path d="M50 14 V52" fill="none" stroke="#2f7a52" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
    <path d="M40 60 C34 50 24 48 22 38 C32 44 38 54 42 64 Z" fill="#74c69d" ${k(2.2)}/>
    <path d="M28 64 H74 L68 94 H34 Z" fill="#e8845a" ${k()}/>
    <path d="M58 66 H72 L68 92 H60 Z" fill="#c45c38"/>
    <rect x="22" y="58" width="58" height="10" rx="4" fill="#f0a078" ${k()}/>
    <rect x="56" y="60" width="20" height="6" rx="3" fill="#d47848"/>
    <ellipse cx="50" cy="65" rx="20" ry="3" fill="#a86a42" opacity=".4"/>
    <path d="M28 62 h14" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>`,o=Object.fromEntries(Vo.map(r=>[r.kind,r])),i=(r,l,c)=>Kw(r,l)+El(o[c].name,Ft(o[c]));return`<div class="yardSheet yardCompare" data-yard-compare="1"><h1>House style and the yard</h1><p class="ysNote">Sofa, lamp, and plant are the approved refresh. Swing, cart, and birdbath use the same light.</p><div class="ysPair">${i("Sofa",t,"yard-swing")+i("Lamp",n,"lemonade-cart")+i("Plant",s,"birdbath")}</div></div>`}const fo="#5a3d5c",A=`stroke="${fo}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Li='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>',Qf=[{kind:"soaking-tub",name:"Soaking Tub",cat:"furniture",w:250,h:200,vb:"0 0 120 96",svg:`<ellipse cx="60" cy="92" rx="48" ry="3.2" fill="#000" opacity=".12"/><rect x="18" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${A}/><rect x="92" y="78" width="10" height="12" rx="3" fill="#c9a0dc" ${A}/><path d="M14 58 Q8 58 10 46 L22 28 H98 L110 46 Q112 58 106 58 Z" fill="#fff" ${A}/><ellipse cx="60" cy="30" rx="44" ry="14" fill="#fff" ${A}/><ellipse cx="60" cy="32" rx="34" ry="9" fill="#d7f3ff"/><path d="M28 34 Q60 42 92 34" fill="none" stroke="#b9e6f8" stroke-width="4"/><rect x="96" y="8" width="8" height="22" rx="4" fill="#f7d27a" ${A}/><path d="M100 28 Q112 34 104 44" fill="none" ${A}/><circle cx="104" cy="46" r="3.2" fill="#a8d4ea" ${A}/><ellipse cx="46" cy="30" rx="8" ry="3" fill="#fff" opacity=".7"/>`},{kind:"bath-toilet",name:"Toilet",cat:"furniture",w:120,h:160,vb:"0 0 100 134",svg:`<ellipse cx="50" cy="128" rx="34" ry="4" fill="#000" opacity=".12"/><rect x="28" y="8" width="44" height="36" rx="8" fill="#fff" ${A}/><rect x="34" y="16" width="32" height="16" rx="4" fill="#e7f6ff"/><rect x="46" y="42" width="8" height="10" fill="#f4f7fb" ${A}/><ellipse cx="50" cy="78" rx="36" ry="22" fill="#fff" ${A}/><ellipse cx="50" cy="74" rx="24" ry="14" fill="#d7f3ff" ${A}/><path d="M18 70 Q50 58 82 70" fill="#fff" ${A}/><rect x="40" y="96" width="20" height="24" rx="4" fill="#f7f4ef" ${A}/>`},{kind:"sink-vanity",name:"Sink Vanity",cat:"furniture",w:210,h:190,vb:"0 0 110 100",svg:`<ellipse cx="55" cy="96" rx="46" ry="3.2" fill="#000" opacity=".12"/><rect x="10" y="48" width="90" height="42" rx="8" fill="#f6e2c4" ${A}/><path d="M55 48 V90" ${A}/><circle cx="28" cy="70" r="3" fill="${fo}"/><circle cx="82" cy="70" r="3" fill="${fo}"/><rect x="16" y="90" width="8" height="6" rx="2" fill="${fo}"/><rect x="86" y="90" width="8" height="6" rx="2" fill="${fo}"/><ellipse cx="55" cy="44" rx="40" ry="12" fill="#fff" ${A}/><ellipse cx="55" cy="44" rx="26" ry="7" fill="#d7f3ff"/><rect x="50" y="10" width="10" height="28" rx="4" fill="#f7d27a" ${A}/><path d="M55 36 Q70 40 66 48" fill="none" ${A}/><rect x="8" y="40" width="94" height="8" rx="3" fill="#f3d2b5" ${A}/>`},{kind:"bath-mirror",name:"Bath Mirror",cat:"decor",w:120,h:160,wall:!0,vb:"0 0 90 120",svg:`<path d="M45 8 C70 8 82 28 82 58 C82 92 68 112 45 112 C22 112 8 92 8 58 C8 28 20 8 45 8 Z" fill="#f7d27a" ${A}/><ellipse cx="45" cy="60" rx="26" ry="40" fill="#d7f4ff" ${A}/><path d="M30 36 l8 -8 M28 52 l18 -16" stroke="#fff" stroke-width="4" stroke-linecap="round"/><rect x="38" y="2" width="14" height="8" rx="3" fill="#f28fa6" ${A}/>`},{kind:"towel-bar",name:"Towel Bar",cat:"decor",w:170,h:116,wall:!0,vb:"0 0 150 102",svg:`<rect x="10" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${A}/><rect x="130" y="8" width="10" height="28" rx="4" fill="#f3d2b5" ${A}/><rect x="14" y="16" width="122" height="8" rx="4" fill="#c98d55" ${A}/><path d="M26 24 H124 V70 Q75 100 26 70 Z" fill="#f7d7e4" ${A}/><path d="M75 24 V88" stroke="#f28fa6" stroke-width="3"/><path d="M40 36 H110" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"bath-mat",name:"Bath Mat",cat:"decor",w:230,h:120,vb:"0 0 160 84",svg:`<ellipse cx="80" cy="78" rx="70" ry="5" fill="#000" opacity=".1"/><rect x="12" y="22" width="136" height="48" rx="18" fill="#f28fa6" ${A}/><rect x="24" y="32" width="112" height="28" rx="12" fill="#f7d7e4"/><path d="M40 46 H120 M40 54 H120" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>`},{kind:"rubber-ducky",name:"Rubber Ducky",cat:"decor",w:80,svg:`${Li}<ellipse cx="48" cy="68" rx="30" ry="26" fill="#f7d27a" ${A}/><circle cx="68" cy="40" r="18" fill="#ffe9a8" ${A}/><path d="M82 38 H98 Q102 44 92 48 H82 Z" fill="#f28fa6" ${A}/><ellipse cx="36" cy="74" rx="12" ry="8" fill="#f3c15a"/>`},{kind:"shower-curtain",name:"Shower Curtain",cat:"decor",w:150,h:260,holdable:!1,vb:"0 0 90 156",svg:`<rect x="8" y="8" width="74" height="8" rx="3" fill="#c98d55" ${A}/><circle cx="22" cy="16" r="3" fill="#f7d27a" ${A}/><circle cx="40" cy="16" r="3" fill="#f7d27a" ${A}/><circle cx="58" cy="16" r="3" fill="#f7d27a" ${A}/><circle cx="72" cy="16" r="3" fill="#f7d27a" ${A}/><path d="M12 18 Q8 80 16 146 H40 Q30 80 36 18 Z" fill="#d7f4ff" ${A}/><path d="M36 18 Q34 80 46 146 H74 Q84 80 78 18 Z" fill="#f7d7e4" ${A}/><path d="M24 40 Q18 70 26 100 M58 40 Q66 70 58 110" fill="none" stroke="#fff" stroke-width="3" opacity=".65"/>`},{kind:"soap-dish",name:"Soap Dish",cat:"decor",w:90,svg:`${Li}<ellipse cx="50" cy="78" rx="34" ry="12" fill="#fff" ${A}/><ellipse cx="50" cy="74" rx="26" ry="7" fill="#e7f6ff"/><rect x="28" y="48" width="44" height="22" rx="8" fill="#f7d7e4" ${A}/><path d="M36 56 H64" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"laundry-hamper",name:"Laundry Hamper",cat:"furniture",w:140,h:160,vb:"0 0 100 114",svg:`<ellipse cx="50" cy="108" rx="36" ry="4" fill="#000" opacity=".12"/><path d="M18 40 H82 L74 100 H26 Z" fill="#b9a0dc" ${A}/><path d="M24 58 H76 M26 74 H74" stroke="#fff" stroke-width="3" opacity=".55"/><ellipse cx="50" cy="40" rx="34" ry="10" fill="#c9b6e8" ${A}/><path d="M22 36 Q50 18 78 36" fill="#f7d7e4" ${A}/><path d="M40 28 Q50 40 62 26" fill="none" stroke="#f28fa6" stroke-width="4" stroke-linecap="round"/>`},{kind:"bath-stool",name:"Bath Stool",cat:"furniture",w:110,svg:`${Li}<ellipse cx="50" cy="58" rx="36" ry="12" fill="#f6e2c4" ${A}/><ellipse cx="50" cy="54" rx="28" ry="7" fill="#fff6ea"/><path d="M22 64 L16 92 M78 64 L84 92 M36 66 L34 92 M64 66 L66 92" ${A}/><path d="M18 90 H34 M66 90 H84" ${A}/>`}],Jw=[{kind:"floor-cushion",name:"Floor Cushion",cat:"decor",w:150,h:136,vb:"0 0 130 118",svg:`<ellipse cx="65" cy="112" rx="50" ry="4" fill="#000" opacity=".12"/><ellipse cx="65" cy="68" rx="52" ry="40" fill="#f28fa6" ${A}/><ellipse cx="65" cy="58" rx="40" ry="24" fill="#f7d7e4"/><path d="M38 64 Q65 82 92 64" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>`},{kind:"story-pillow",name:"Story Pillow",cat:"decor",w:120,h:100,vb:"0 0 110 92",svg:`<ellipse cx="55" cy="86" rx="40" ry="4" fill="#000" opacity=".12"/><rect x="14" y="28" width="82" height="52" rx="18" fill="#a8d4ea" ${A}/><path d="M55 40 l6 12 13 2 -10 8 2 13 -11 -7 -11 7 2 -13 -10 -8 13 -2 z" fill="#f7d27a" ${A}/>`},{kind:"berry-basket",name:"Berry Basket",cat:"food",w:100,svg:`${Li}<path d="M22 48 H78 L70 88 H30 Z" fill="#f3d2b5" ${A}/><path d="M30 58 H70 M32 70 H68 M34 80 H66" ${A}/><circle cx="40" cy="40" r="10" fill="#f28fa6" ${A}/><circle cx="58" cy="36" r="10" fill="#c94b6a" ${A}/><circle cx="70" cy="48" r="8" fill="#b9a0dc" ${A}/><path d="M34 36 Q40 28 46 36" fill="none" stroke="#7dce8a" stroke-width="3"/>`},{kind:"ribbon-tray",name:"Ribbon Tray",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`<ellipse cx="70" cy="84" rx="52" ry="4" fill="#000" opacity=".12"/><rect x="16" y="40" width="108" height="36" rx="12" fill="#fff" ${A}/><rect x="22" y="46" width="96" height="22" rx="8" fill="#f7d7e4"/><rect x="36" y="28" width="16" height="22" rx="5" fill="#a8d4ea" ${A}/><rect x="58" y="22" width="14" height="28" rx="5" fill="#f7d27a" ${A}/><path d="M96 24 Q110 16 112 32 Q100 28 104 40 Q92 34 96 24 Z" fill="#f28fa6" ${A}/>`}],Af=new Map;let Uf=!1;function za(){return Uf}function E_(e){Uf=e}function Qo(e){return Af.get(e)}function Q_(e,t){Af.set(e,t)}const ye="#5a3d5c",M=`stroke="${ye}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,_s=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${ye}"/><circle cx="${t}" cy="${n}" r="3" fill="${ye}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,gi=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,ue='<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>',Yt=[{kind:"sofa",name:"Sofa",cat:"furniture",w:260,svg:`${ue}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${M}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${M}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${M}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${M}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${M}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${ye}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${ye}"/>`},{kind:"armchair",name:"Armchair",cat:"furniture",w:150,svg:`${ue}<rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${M}/><rect x="6" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${M}/><rect x="72" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${M}/><rect x="24" y="58" width="52" height="24" rx="10" fill="#b8e0f2" ${M}/><rect x="20" y="86" width="6" height="10" rx="2" fill="${ye}"/><rect x="74" y="86" width="6" height="10" rx="2" fill="${ye}"/>`},{kind:"bed",name:"Bed",cat:"furniture",w:300,svg:`${ue}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${M}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${M}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${M}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${M}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${M}/>`},{kind:"table",name:"Table",cat:"furniture",w:200,svg:`${ue}<rect x="4" y="30" width="92" height="14" rx="7" fill="#f4a261" ${M}/><rect x="14" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${M}/><rect x="76" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${M}/><path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".5"/>`},{kind:"chair",name:"Chair",cat:"furniture",w:100,svg:`${ue}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${M}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${M}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${M}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${M}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/>`},{kind:"lamp",name:"Lamp",cat:"furniture",w:90,svg:`${ue}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${M}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${M}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${M}/><circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>`},{kind:"fridge",name:"Fridge",cat:"furniture",w:150,svg:`${ue}<rect x="16" y="4" width="68" height="90" rx="14" fill="#bde0fe" ${M}/><path d="M16 38 H84" ${M}/><rect x="70" y="14" width="5" height="16" rx="2" fill="${ye}"/><rect x="70" y="46" width="5" height="22" rx="2" fill="${ye}"/><circle cx="32" cy="22" r="5" fill="#ff8fab" ${M}/><rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${M}/>`},{kind:"stove",name:"Stove",cat:"furniture",w:170,svg:`${ue}<rect x="8" y="26" width="84" height="68" rx="12" fill="#ffadad" ${M}/><rect x="8" y="18" width="84" height="14" rx="6" fill="#ffd6a5" ${M}/><rect x="20" y="46" width="60" height="36" rx="8" fill="#5a3d5c" opacity=".85"/><rect x="26" y="52" width="48" height="8" rx="4" fill="#fff" opacity=".25"/><circle cx="22" cy="38" r="3" fill="${ye}"/><circle cx="36" cy="38" r="3" fill="${ye}"/><circle cx="78" cy="38" r="3" fill="${ye}"/>`},{kind:"bookshelf",name:"Shelf",cat:"furniture",w:170,svg:`${ue}<rect x="10" y="4" width="80" height="90" rx="10" fill="#d4a373" ${M}/><path d="M10 34 H90 M10 64 H90" ${M}/><rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${M}/><rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${M}/><rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${M}/><rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${M}/><rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${M}/><circle cx="34" cy="80" r="8" fill="#ffadad" ${M}/>`},{kind:"tub",name:"Bathtub",cat:"furniture",w:240,svg:`${ue}<circle cx="30" cy="40" r="7" fill="#bde0fe" ${M}/><circle cx="44" cy="34" r="9" fill="#e0f2ff" ${M}/><circle cx="60" cy="40" r="7" fill="#bde0fe" ${M}/><path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${M}/><rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${M}/><rect x="22" y="88" width="8" height="8" rx="2" fill="${ye}"/><rect x="70" y="88" width="8" height="8" rx="2" fill="${ye}"/>`},{kind:"rug",name:"Rug",cat:"decor",w:320,svg:`<ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${M}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${M}/><ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${M}/>`},{kind:"picture",name:"Picture",cat:"decor",w:130,wall:!0,svg:`<rect x="10" y="20" width="80" height="64" rx="8" fill="#ffd166" ${M}/><rect x="18" y="28" width="64" height="48" rx="4" fill="#bde0fe"/><circle cx="66" cy="40" r="7" fill="#fff3b0"/><path d="M18 76 L38 50 L52 64 L62 54 L82 76 Z" fill="#90e0a8" ${M}/>`},{kind:"window",name:"Window",cat:"decor",w:180,wall:!0,svg:`<rect class="winGlass" x="12" y="8" width="76" height="76" rx="38" fill="#a2d2ff" ${M}/><g class="winDay"><circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/></g><g class="winNight"><circle cx="62" cy="28" r="7" fill="#fff6d8"/><circle cx="28" cy="24" r="1.4" fill="#fff"/><circle cx="44" cy="20" r="1.1" fill="#fff"/><circle cx="70" cy="42" r="1.2" fill="#fff"/><circle cx="36" cy="46" r="1" fill="#fff"/></g><path d="M50 8 V84 M12 50 H88" ${M}/><path d="M4 8 Q20 40 10 90 M96 8 Q80 40 90 90" stroke="#ff8fab" stroke-width="9" fill="none" stroke-linecap="round"/>`},{kind:"clock",name:"Clock",cat:"decor",w:90,wall:!0,svg:`<circle cx="50" cy="50" r="38" fill="#fff" ${M}/><circle cx="50" cy="50" r="30" fill="#fff3b0"/><path d="M50 50 V28 M50 50 L64 58" ${M}/><circle cx="50" cy="50" r="3" fill="${ye}"/>${gi(30,70,66)}`},{kind:"stars",name:"Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M30 20 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffd166" ${M}/><path d="M70 40 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#ffadad" ${M}/><path d="M40 66 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#a2d2ff" ${M}/>`},{kind:"balloon",name:"Balloons",cat:"decor",w:110,svg:`<path d="M38 52 Q44 74 50 96 M64 46 Q58 72 50 96" stroke="${ye}" stroke-width="2" fill="none"/><ellipse cx="36" cy="32" rx="18" ry="22" fill="#ff8fab" ${M}/><ellipse cx="66" cy="28" rx="18" ry="22" fill="#a2d2ff" ${M}/><ellipse cx="30" cy="24" rx="4" ry="7" fill="#fff" opacity=".6"/>`},{kind:"teddy",name:"Teddy",cat:"decor",w:100,svg:`${ue}<circle cx="26" cy="22" r="10" fill="#d4a373" ${M}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${M}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${M}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${M}/>${_s(40,60,36)}<ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/><circle cx="50" cy="46" r="2.5" fill="${ye}"/>${gi(32,68,46)}`},{kind:"ball",name:"Ball",cat:"decor",w:70,svg:`${ue}<circle cx="50" cy="58" r="36" fill="#ffd166" ${M}/><path d="M18 46 Q50 66 82 46 M26 82 Q50 60 74 82" stroke="#ff7096" stroke-width="7" fill="none"/>`},{kind:"tv",name:"TV",cat:"decor",w:170,svg:`${ue}<rect x="6" y="14" width="88" height="62" rx="14" fill="#c9a0dc" ${M}/><rect x="16" y="22" width="68" height="46" rx="8" fill="#a2d2ff"/><path d="M30 6 L44 14 M70 6 L56 14" ${M}/><rect x="36" y="78" width="28" height="16" rx="4" fill="#b388d6" ${M}/>${_s(42,58,42)}<path d="M44 52 q6 5 12 0" ${M} fill="none"/>`},{kind:"plant",name:"Plant",cat:"plants",w:110,svg:`${ue}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${M} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${M} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${M}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${M}/><rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${M}/>`},{kind:"cactus",name:"Cactus",cat:"plants",w:80,svg:`${ue}<rect x="36" y="12" width="28" height="64" rx="14" fill="#80ed99" ${M}/><path d="M36 50 H24 a8 8 0 0 1 -8 -8 V34" fill="none" stroke="${ye}" stroke-width="3.5"/><rect x="12" y="26" width="12" height="22" rx="6" fill="#80ed99" ${M}/><circle cx="50" cy="12" r="6" fill="#ff8fab" ${M}/>${_s(44,56,40)}<path d="M28 74 H72 L66 96 H34 Z" fill="#c9a0dc" ${M}/>`},{kind:"flowers",name:"Flowers",cat:"plants",w:90,svg:`${ue}<path d="M50 70 V30 M50 60 Q30 50 30 30 M50 60 Q70 50 70 30" stroke="#52b788" stroke-width="4" fill="none"/><circle cx="50" cy="26" r="10" fill="#ff8fab" ${M}/><circle cx="30" cy="28" r="9" fill="#ffd166" ${M}/><circle cx="70" cy="28" r="9" fill="#a2d2ff" ${M}/><circle cx="50" cy="26" r="3" fill="#fff"/><path d="M32 66 H68 L62 96 H38 Z" fill="#a2d2ff" ${M}/>`},{kind:"tree",name:"Mini Tree",cat:"plants",w:140,svg:`${ue}<rect x="44" y="54" width="12" height="30" rx="4" fill="#b07d54" ${M}/><circle cx="50" cy="36" r="30" fill="#52b788" ${M}/><circle cx="38" cy="30" r="5" fill="#ff8fab"/><circle cx="62" cy="40" r="5" fill="#ff8fab"/><circle cx="52" cy="22" r="5" fill="#ff8fab"/><path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${M}/>`},{kind:"cake",name:"Cake",cat:"food",w:100,svg:`<rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${M}/><path d="M16 58 q8 10 17 0 q8 10 17 0 q8 10 17 0 q8 10 17 0" fill="#fff" ${M}/><rect x="46" y="28" width="8" height="22" rx="3" fill="#a2d2ff" ${M}/><path d="M50 14 q6 8 0 12 q-6 -4 0 -12" fill="#ffd166" ${M}/><ellipse cx="50" cy="92" rx="40" ry="5" fill="#fff" ${M}/>`},{kind:"apple",name:"Apple",cat:"food",w:60,svg:`<path d="M50 30 C20 18 8 50 22 74 C32 92 44 90 50 86 C56 90 68 92 78 74 C92 50 80 18 50 30 Z" fill="#ff6b6b" ${M}/><path d="M50 30 Q52 16 58 10" ${M} fill="none"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#80ed99" ${M} transform="rotate(-20 64 18)"/><ellipse cx="34" cy="46" rx="5" ry="9" fill="#fff" opacity=".5"/>`},{kind:"donut",name:"Donut",cat:"food",w:70,svg:`<circle cx="50" cy="58" r="36" fill="#e9c46a" ${M}/><path d="M18 52 Q20 26 50 24 Q80 26 82 52 Q76 62 66 56 Q56 66 46 58 Q34 66 24 58 Z" fill="#ff8fab" ${M}/><circle cx="50" cy="52" r="10" fill="#fff" ${M}/><rect x="30" y="36" width="6" height="3" rx="1.5" fill="#a2d2ff" transform="rotate(30 33 37)"/><rect x="64" y="38" width="6" height="3" rx="1.5" fill="#ffd166"/><rect x="56" y="30" width="6" height="3" rx="1.5" fill="#80ed99" transform="rotate(-30 59 31)"/>`},{kind:"pizza",name:"Pizza",cat:"food",w:80,svg:`<path d="M10 20 Q50 6 90 20 L50 94 Z" fill="#ffd166" ${M}/><path d="M10 20 Q50 6 90 20 L86 28 Q50 16 14 28 Z" fill="#e9a96a" ${M}/><circle cx="42" cy="38" r="7" fill="#ff6b6b" ${M}/><circle cx="62" cy="44" r="6" fill="#ff6b6b" ${M}/><circle cx="50" cy="62" r="6" fill="#ff6b6b" ${M}/>`},{kind:"juice",name:"Juice",cat:"food",w:55,svg:`<path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${M}/><path d="M27 44 H73 L70 92 H30 Z" fill="#ffb347"/><path d="M24 26 H76 L70 92 H30 Z" fill="none" ${M}/><path d="M58 30 L66 4" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="60" r="4" fill="#fff" opacity=".6"/>`},{kind:"cat",name:"Toy cat",cat:"pets",w:110,svg:`${ue}<path d="M78 80 Q98 70 90 50" stroke="#ffb347" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="30" ry="20" fill="#ffb347" ${M}/><path d="M22 30 L26 8 L40 22 M78 30 L74 8 L60 22" fill="#ffb347" ${M}/><circle cx="50" cy="42" r="28" fill="#ffc46b" ${M}/>${_s(40,60,40)}<path d="M46 50 q4 4 8 0" ${M} fill="none"/>${gi(32,68,50)}`},{kind:"dog",name:"Puppy",cat:"pets",w:120,svg:`${ue}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#f5ebe0" ${M}/><circle cx="50" cy="42" r="28" fill="#fff" ${M}/><ellipse cx="22" cy="44" rx="10" ry="18" fill="#b07d54" ${M}/><ellipse cx="78" cy="44" rx="10" ry="18" fill="#b07d54" ${M}/><circle cx="60" cy="34" r="8" fill="#e6b88a" opacity=".7"/>${_s(40,60,40)}<ellipse cx="50" cy="52" rx="5" ry="4" fill="${ye}"/><path d="M50 56 v6" ${M}/>`},{kind:"bunny",name:"Bunny",cat:"pets",w:90,svg:`${ue}<ellipse cx="36" cy="22" rx="8" ry="20" fill="#fff" ${M}/><ellipse cx="64" cy="22" rx="8" ry="20" fill="#fff" ${M}/><ellipse cx="36" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="64" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="50" cy="76" rx="28" ry="20" fill="#fff" ${M}/><circle cx="50" cy="52" r="22" fill="#fff" ${M}/>${_s(42,58,50)}<path d="M47 58 l3 3 3 -3" ${M} fill="none"/>${gi(36,64,58)}`},{kind:"fish",name:"Fish Bowl",cat:"pets",w:100,svg:`${ue}<circle cx="50" cy="54" r="40" fill="#cdeffd" ${M}/><path d="M14 46 H86" stroke="#8ecae6" stroke-width="3"/><path d="M60 64 l14 -8 v16 z" fill="#ff9f68" ${M}/><ellipse cx="46" cy="64" rx="16" ry="11" fill="#ffb347" ${M}/><circle cx="40" cy="62" r="2.5" fill="${ye}"/><circle cx="32" cy="38" r="3" fill="#fff" opacity=".8"/><rect x="24" y="10" width="52" height="8" rx="4" fill="#cdeffd" ${M}/>`},{kind:"kennel",name:"Dog Kennel",cat:"pets",w:210,h:175,holdable:!1,vb:"0 0 120 100",svg:`<ellipse cx="60" cy="97" rx="48" ry="3.2" fill="#000" opacity=".12"/><path d="M14 50 L60 12 L106 50 Z" fill="#ff8fab" ${M}/><path d="M28 46 L60 22 L92 46 Z" fill="#ffd6e4"/><rect x="20" y="46" width="80" height="50" rx="10" fill="#fff6ea" ${M}/><path d="M20 56 H100" stroke="#ffc2d4" stroke-width="7"/><path d="M34 96 V58 Q60 36 86 58 V96 Z" fill="#f3e4ff" ${M}/><path d="M40 96 V64 Q60 46 80 64 V96 Z" fill="#ffe8c7"/><circle cx="86" cy="64" r="8" fill="#bde0fe" ${M}/><circle cx="84" cy="62" r="2.2" fill="#fff" opacity=".9"/><path d="M28 62 l2.4 2.4 2.4-2.4 2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4z" fill="#ff8fab" ${M}/><circle cx="30" cy="90" r="3.2" fill="#fff" ${M}/><rect x="32" y="88.4" width="14" height="3.4" rx="1.7" fill="#fff" ${M}/><circle cx="48" cy="90" r="3.2" fill="#fff" ${M}/>`},{kind:"cat-tower",name:"Cat Tower",cat:"pets",w:150,h:225,holdable:!1,vb:"0 0 100 150",svg:`<ellipse cx="50" cy="146" rx="36" ry="3.4" fill="#000" opacity=".12"/><rect x="44" y="30" width="12" height="104" rx="6" fill="#c9a0dc" ${M}/><ellipse cx="50" cy="136" rx="34" ry="10" fill="#ffc8dd" ${M}/><ellipse cx="50" cy="132" rx="26" ry="6" fill="#fff6ea"/><ellipse cx="50" cy="102" rx="30" ry="8" fill="#bde0fe" ${M}/><ellipse cx="50" cy="98" rx="22" ry="4" fill="#fff" opacity=".8"/><ellipse cx="50" cy="64" rx="28" ry="8" fill="#ffd166" ${M}/><ellipse cx="50" cy="60" rx="20" ry="4" fill="#fff6d0"/><circle cx="50" cy="22" r="8" fill="#ff8fab" ${M}/><circle cx="47" cy="19" r="2.2" fill="#fff" opacity=".75"/><g class="dangle"><circle cx="22" cy="126" r="8" fill="#ffb3c6" ${M}/><path d="M22 126 q12 5 7 16" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/></g><circle cx="80" cy="92" r="3.4" fill="#ffd166" ${M}/>`},{kind:"vanity",name:"Vanity",cat:"furniture",w:230,svg:`${ue}<ellipse cx="50" cy="26" rx="24" ry="22" fill="#fff" ${M}/><ellipse cx="50" cy="26" rx="18" ry="16" fill="#cdeffd"/><path d="M38 18 l6 -6 M42 26 l10 -10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="12" r="3" fill="#ffd166" ${M}/><circle cx="74" cy="12" r="3" fill="#ffd166" ${M}/><rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${M}/><rect x="10" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${M}/><rect x="62" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${M}/><circle cx="24" cy="75" r="3" fill="${ye}"/><circle cx="76" cy="75" r="3" fill="${ye}"/><rect x="12" y="90" width="6" height="7" rx="2" fill="${ye}"/><rect x="82" y="90" width="6" height="7" rx="2" fill="${ye}"/>`},{kind:"stool",name:"Vanity Stool",cat:"furniture",w:90,svg:`${ue}<ellipse cx="50" cy="48" rx="34" ry="14" fill="#c9a0dc" ${M}/><ellipse cx="50" cy="44" rx="28" ry="9" fill="#e4ccf2"/><path d="M28 58 L22 94 M72 58 L78 94 M50 62 V94" ${M}/><ellipse cx="50" cy="78" rx="22" ry="4" fill="none" ${M}/>`},{kind:"perfume",name:"Perfume",cat:"decor",w:50,svg:`<rect x="40" y="8" width="20" height="14" rx="5" fill="#ffd166" ${M}/><rect x="46" y="20" width="8" height="10" fill="#fff" ${M}/><path d="M20 50 Q20 30 50 30 Q80 30 80 50 V80 Q80 94 66 94 H34 Q20 94 20 80 Z" fill="#ff8fab" ${M}/><ellipse cx="36" cy="52" rx="5" ry="10" fill="#fff" opacity=".6"/><path d="M50 56 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#fff" opacity=".8"/>`},{kind:"polish",name:"Nail Polish",cat:"decor",w:40,svg:`<rect x="38" y="4" width="24" height="40" rx="8" fill="${ye}"/><path d="M24 54 Q24 42 36 42 H64 Q76 42 76 54 V84 Q76 96 64 96 H36 Q24 96 24 84 Z" fill="#b388d6" ${M}/><ellipse cx="38" cy="62" rx="5" ry="12" fill="#fff" opacity=".55"/>`},{kind:"hairdryer",name:"Hair Dryer",cat:"decor",w:90,svg:`<path d="M60 52 L70 92 Q70 96 64 96 H58 Q52 96 52 90 L46 56 Z" fill="#a2d2ff" ${M}/><rect x="6" y="20" width="62" height="40" rx="20" fill="#bde0fe" ${M}/><ellipse cx="82" cy="40" rx="12" ry="20" fill="#ffc8dd" ${M}/><ellipse cx="82" cy="40" rx="6" ry="11" fill="#fff" ${M}/><circle cx="24" cy="40" r="7" fill="#fff" opacity=".7"/>`},{kind:"mirror",name:"Mirror",cat:"decor",w:120,wall:!0,svg:`<path d="M50 6 C74 6 88 24 88 50 C88 76 72 94 50 94 C28 94 12 76 12 50 C12 24 26 6 50 6 Z" fill="#ffd166" ${M}/><ellipse cx="50" cy="50" rx="30" ry="36" fill="#e0f4ff" ${M}/><path d="M36 34 l10 -10 M36 46 l20 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ff8fab" ${M}/>`}],zn={sofa:["living"],armchair:["living"],lamp:["living","bedroom"],tv:["living"],rug:["living","bedroom"],picture:["living","bedroom"],bookshelf:["living","bedroom"],bed:["bedroom"],teddy:["bedroom"],stars:["bedroom"],tub:["bedroom"],balloon:["any"],clock:["any"],window:["any"],ball:["any"],vanity:["salon"],stool:["salon"],perfume:["salon"],polish:["salon"],hairdryer:["salon"],mirror:["salon","bedroom"],fridge:["kitchen"],stove:["kitchen"],table:["kitchen","living"],chair:["kitchen","living"]};for(const e of Wf)zn[e.kind]=["nursery"];for(const e of Vo)zn[e.kind]=["backyard"];for(const e of Qf)zn[e.kind]=["bathroom"];zn["floor-cushion"]=["living"];zn["story-pillow"]=["bedroom"];zn["berry-basket"]=["kitchen"];zn["ribbon-tray"]=["salon"];Yt.push(...Wf,...Vo,...Qf,...Jw);for(const e of Yt)e.rooms=zn[e.kind]??(["food"].includes(e.cat)?["kitchen"]:["any"]);const e$=new Set(["rug","tv","tree"]);for(const e of Yt)e.holdable??=!e.wall&&e.cat!=="furniture"&&e.w<=150&&!e$.has(e.kind);const t$=[{kind:"ranch-egg",name:"Fresh Egg",cat:"ranch",w:50,holdable:!0,rooms:["any"],svg:`${ue}<path d="M50 30 C70 30 80 62 80 74 C80 90 66 96 50 96 C34 96 20 90 20 74 C20 62 30 30 50 30 Z" fill="#fff6e6" ${M}/><ellipse cx="40" cy="52" rx="6" ry="9" fill="#fff"/>`},{kind:"ranch-carrot",name:"Garden Carrot",cat:"ranch",w:70,holdable:!0,rooms:["any"],svg:`${ue}<path d="M30 40 L78 34 L40 96 Z" fill="#ff922b" ${M}/><path d="M44 50 l10 -2 M42 64 l8 -2 M44 78 l6 -1" ${M}/><path d="M72 36 Q80 14 92 14 M72 36 Q68 14 76 4 M72 36 Q90 30 96 36" fill="none" stroke="#40c057" stroke-width="7" stroke-linecap="round"/>`},{kind:"ranch-bouquet",name:"Ranch Flowers",cat:"ranch",w:80,holdable:!0,rooms:["any"],svg:`${ue}<path d="M50 94 L40 50 M50 94 L50 44 M50 94 L62 50" stroke="#40c057" stroke-width="5" stroke-linecap="round"/><path d="M36 78 L64 78 L56 96 L44 96 Z" fill="#c9a0dc" ${M}/>${[[38,40,"#ff8fab"],[50,30,"#ffd43b"],[64,40,"#74c0fc"],[44,52,"#ff922b"],[58,52,"#c9a0dc"]].map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="9" fill="${n}" ${M}/><circle cx="${e}" cy="${t}" r="3" fill="#fff3b0"/>`).join("")}`}];Yt.push(...rw,...Cu,...t$);const ke=Object.fromEntries(Yt.map(e=>[e.kind,e])),_o=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),Ke=e=>e.h??e.w,Ql=e=>e.img?`<img class="packimg" src="${_o(e.img)}" alt="${_o(e.name)}" draggable="false" />`:`<svg viewBox="${e.vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${e.svg}</svg>`,Ft=(e,t=!1)=>{const n=za()?Qo(e.kind):void 0;if(!n)return Ql(e);const s=t&&!e.wall?'<i class="artshade" aria-hidden="true"></i>':"",o=e.kind==="window"?'<i class="artnight" aria-hidden="true"></i>':"";return`${s}${o}<img class="packimg artimg" data-kind="${_o(e.kind)}" src="${_o(n)}" alt="${_o(e.name)}" draggable="false" />`},n$=(e,t)=>Ql(e);let td=!1;function s$(){td||typeof window>"u"||(td=!0,window.addEventListener("error",e=>{const t=e.target;if(!(t instanceof HTMLImageElement)||!t.classList.contains("artimg")||t.dataset.fell==="1")return;const n=ke[t.dataset.kind||""];if(!n)return;t.dataset.fell="1",t.parentElement?.querySelector(".artshade")?.remove(),t.parentElement?.querySelector(".artnight")?.remove();const s=document.createElement("div");s.innerHTML=Ql(n);const o=s.firstElementChild;o&&t.replaceWith(o)},!0))}const nd=new WeakMap;function o$(e){const t=nd.get(e);if(t)return t;if(!e.complete||!e.naturalWidth)return null;const n=document.createElement("canvas");n.width=e.naturalWidth,n.height=e.naturalHeight;const s=n.getContext("2d",{willReadFrequently:!0});if(!s)return null;try{s.drawImage(e,0,0)}catch{return null}const o=s.getImageData(0,0,n.width,n.height).data;return nd.set(e,o),o}function i$(e,t,n){const s=e.getBoundingClientRect();if(s.width<1||s.height<1||!e.naturalWidth)return null;let o=(t-s.left)/s.width;const i=(n-s.top)/s.height;e.closest(".flipped")&&(o=1-o);const a=e.naturalWidth,r=e.naturalHeight,l=Math.min(s.width/a,s.height/r),c=a*l,d=r*l,f=(s.width-c)*.5,g=s.height-d,h=(o*s.width-f)/l,u=(i*s.height-g)/l;return h<0||u<0||h>=a||u>=r?null:{x:h,y:u}}function Al(e,t,n){const s=o$(e),o=s&&i$(e,t,n);if(!s||!o)return!s;const i=Math.floor(o.x),r=(Math.floor(o.y)*e.naturalWidth+i)*4+3;return s[r]>24}function a$(e,t){const n=[];try{for(let s=0;s<12;s++){const o=document.elementFromPoint(e,t);if(!o)return null;const i=o.closest("img.artimg");if(i&&!Al(i,e,t)){n.push(i),i.style.pointerEvents="none";continue}return o}return null}finally{for(let s=0;s<n.length;s++)n[s].style.pointerEvents=""}}const r$="var(--line)",l$=1.4,Oe='fill="#3a1d3c" opacity=".14"',Fr='fill="#3a1d3c" opacity=".22"',Zt={l:[72,172],r:[128,172]},ns={l:[50,233],r:[150,233]},c$={l:[88,238],r:[112,238]};function T(e=3){return`stroke="${r$}" stroke-width="${(e*l$).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"`}function w(e){const n=(Math.round(e*10)/10).toFixed(1);return n.endsWith(".0")?n.slice(0,-2):n}function jr(e,t,n,s,o){const i=o*Math.PI/180,a=e-n,r=t-s,l=Math.cos(i),c=Math.sin(i);return{x:n+a*l-r*c,y:s+a*c+r*l}}function Mo(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=(n>>16&255)*(1-t),i=(n>>8&255)*(1-t),a=(n&255)*(1-t);return"#"+s(o)+s(i)+s(a)}function sd(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=n>>16&255,i=n>>8&255,a=n&255;return"#"+s(o+(255-o)*t)+s(i+(255-i)*t)+s(a+(255-a)*t)}function Vr(e,t,n,s,o=0){const i=e[0],a=e[1],r=e[0]===t[0]&&e[1]===t[1]?t[0]+.01:t[0],l=t[1],c=r-i,d=l-a,f=Math.hypot(c,d)||1,g=-d/f,h=c/f,u=(i+r)/2+g*o,b=(a+l)/2+h*o,_=n/2,m=s/2,p=(_+m)/2*1.04,v=[i+g*_,a+h*_],$=[r+g*m,l+h*m],P=[r-g*m,l-h*m],R=[i-g*_,a-h*_];return`M${w(v[0])} ${w(v[1])} Q${w(u+g*p)} ${w(b+h*p)} ${w($[0])} ${w($[1])} A${w(m)} ${w(m)} 0 0 1 ${w(P[0])} ${w(P[1])} Q${w(u-g*p)} ${w(b-h*p)} ${w(R[0])} ${w(R[1])} A${w(_)} ${w(_)} 0 0 1 ${w(v[0])} ${w(v[1])} Z`}function Da(e,t,n,s,o){const i=[],a=(t-e)/s;for(let r=0;r<s;r++){const l=e+r*a,c=l+a;i.push(`Q${w((l+c)/2)} ${w(n+o)} ${w(c)} ${w(n)}`)}return i.join(" ")}function Gr(e,t,n,s,o,i=0){const a=[];for(let r=0;r<s;r++){const l=i+2*Math.PI*r/s,c=i+2*Math.PI*(r+1)/s,d=(l+c)/2,f=e+n*Math.cos(l),g=t+n*Math.sin(l),h=e+n*Math.cos(c),u=t+n*Math.sin(c),b=e+(n+o)*Math.cos(d),_=t+(n+o)*Math.sin(d);r===0&&a.push(`M${w(f)} ${w(g)}`),a.push(`Q${w(b)} ${w(_)} ${w(h)} ${w(u)}`)}return a.join(" ")+" Z"}function ss(e,t,n,s){const o=e==="arm"?Zt[t]:c$[t],i=e==="arm"?t==="l"?s.armL:s.armR:t==="l"?s.legL:s.legR,a=e==="leg"?t==="l"?s.legLLift:s.legRLift:0,r=i||a?` transform="translate(0 ${w(-a)}) rotate(${w(i)} ${o[0]} ${o[1]})"`:"";return`<g class="${e} ${t}"${r} style="transform-box:view-box;transform-origin:${o[0]}px ${o[1]}px">${n}</g>`}const Bn="var(--line)";function sn(e,t=.8,n=2.2){return e.map(s=>`<path d="${s}" fill="none" stroke="var(--hair-shade)" stroke-width="${n}" stroke-linecap="round" opacity="${t}"/>`).join("")}function go(e,t=.32){return e.map(n=>`<path d="${n}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${t}"/>`).join("")}function mn(){return'<path d="M54 72 Q62 44 92 38 Q70 50 63 74 Z" fill="#fff" opacity=".45"/><path d="M60 64 Q70 48 86 42" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".8"/><path d="M104 37 Q130 38 145 58 Q128 46 106 43 Z" fill="#fff" opacity=".3"/><circle cx="72" cy="50" r="2" fill="#fff" opacity=".85"/>'}function lt(e,t,n){return n?`<path d="${e}" fill="url(#${t}h)"/>`:""}const od="M34 112 Q28 28 100 28 Q172 28 166 112 Q164 146 146 156 L54 156 Q36 146 34 112 Z";function kt(e,t){return`<path d="${od}" fill="var(--hair)" ${T(3.2)}/>${lt(od,e,t)}`}function hr(e,t,n,s,o,i,a=10){const r=Gr(e+2,t+3,n,12,7,s+.1),l=Gr(e,t,n-1,12,7,s);let c=`<path d="${r}" fill="var(--hair-shade)" ${T(3.2)}/><path d="${l}" fill="var(--hair)" ${T(3.2)}/>${lt(l,o,i)}`;for(let d=0;d<a;d++){const f=d*2.5+s,g=(n-6)*Math.sqrt((d+.5)/a),h=e+g*Math.cos(f),u=t+g*Math.sin(f);c+=`<path d="M${w(h-4)} ${w(u+1)} q1 -5 4.5 -4.5 q3.5 1 2.5 4.5" fill="none" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>`,u<t-2&&h<e+6&&(c+=`<path d="M${w(h-2.5)} ${w(u-2.5)} q2 -2 3.5 -1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`)}return c+=`<ellipse cx="${w(e-10)}" cy="${w(t-12)}" rx="6" ry="3.4" fill="#fff" opacity=".55" transform="rotate(-35 ${w(e-10)} ${w(t-12)})"/>`,c+=`<path d="M${w(e-16)} ${w(t-6)} Q${w(e-6)} ${w(t-18)} ${w(e+4)} ${w(t-14)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>`,c}function os(e,t,n,s=6,o=[],i=7){let a=`<path d="M${e} ${t-6} V${n}" stroke="${Bn}" stroke-width="${w(2*s+4.6)}" stroke-linecap="round"/><path d="M${e} ${t-6} V${n}" stroke="var(--hair)" stroke-width="${w(2*s)}" stroke-linecap="round"/>`,r=t,l=0;for(;r<n;){const c=l%2?1:-1;a+=`<path d="M${w(e-c)} ${w(r-4)} Q${w(e+c*s*1.05)} ${w(r-2)} ${w(e+c*s*.55)} ${w(r+4)} Q${w(e)} ${w(r+5.5)} ${w(e-c*1.4)} ${w(r+1)}" fill="none" stroke="var(--hair-shade)" stroke-width="1.7" stroke-linecap="round"/>`,c>0&&(a+=`<path d="M${w(e+1)} ${w(r-2)} q2.2 -.5 3 1.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>`),r+=i,l++}for(let c=0;c<o.length;c++){const d=o[c];a+=`<rect x="${w(e-6.2)}" y="${d-4}" width="12.4" height="8" rx="2.6" fill="var(--acc)" stroke="${Bn}" stroke-width="2"/><rect x="${w(e-4)}" y="${d-2.5}" width="2.6" height="4.5" rx="1" fill="#fff" opacity=".6"/>`}return a+=`<path d="M${e-4} ${n+2} q2 5 4 6 q2 -1 4 -6" fill="var(--hair)" stroke="${Bn}" stroke-width="2"/>`,a}function Ji(e,t,n,s=5.5){let o=`<path d="M${e} ${t} V${n}" stroke="${Bn}" stroke-width="${w(2*s+4)}" stroke-linecap="round"/><path d="M${e} ${t} V${n}" stroke="var(--hair)" stroke-width="${w(2*s)}" stroke-linecap="round"/>`;for(let i=t+8;i<n;i+=16)o+=`<path d="M${w(e-s*.7)} ${i} Q${e} ${i+5} ${w(e+s*.7)} ${i}" fill="none" stroke="var(--hair-shade)" stroke-width="1.6" opacity=".8"/>`;return o+=`<circle cx="${e}" cy="${n+3}" r="${w(s*.55)}" fill="var(--hair)" stroke="${Bn}" stroke-width="2"/>`,o}function pr(e,t,n,s){return`<path d="${e}" fill="var(--hair)" ${T(3)}/>${lt(e,t,n)}${sn(s)}${go(s.slice(0,2),.45)}`}function Ms(e,t,n){return`<ellipse cx="${e}" cy="${t}" rx="8" ry="5.5" fill="var(--acc)" ${T(2.4)} transform="rotate(${n} ${e} ${t})"/><ellipse cx="${e-1}" cy="${t-2}" rx="2.4" ry="1.3" fill="#fff" opacity=".6" transform="rotate(${n} ${e-1} ${t-2})"/>`}const yn='<path d="M42 104 Q44 76 70 66 Q86 74 100 58 Q114 74 130 66 Q156 76 158 104" fill="none" stroke="#3a1d3c" stroke-width="9" opacity=".12"/>';function zf(e){return e==="puffs"||e==="coily"?"puffs":e==="afro"?"afro":e==="braids"?"braids":e==="boxbraids"?"box":e==="locs"?"locs":e==="sidebraid"?"sidebraid":e==="crown"?"crown":e==="pony"?"pony":e==="sidepony"?"sidepony":e==="pigtails"?"pigtails":e==="halfup"?"halfup":e==="buns"?"buns":e==="topbun"?"topbun":e==="lowbun"?"lowbun":e==="long"?"long":e==="wavy"||e==="wavybob"?e==="wavy"?"wavy":"bob":e==="bob"||e==="curlybob"||e==="sidebangs"?"bob":e==="pixie"?"pixie":(e==="bangs"||e==="short")&&e==="bangs"?"bangs":"short"}function d$(e,t,n){const s=zf(e);if(s==="puffs"){const o=e==="coily"?26:30;return hr(48,52,o,0,t,n,12)+hr(152,52,o,.3,t,n,12)+`<path d="M42 112 Q38 48 100 44 Q162 48 158 112 Q154 144 100 146 Q46 144 42 112 Z" fill="var(--hair)" ${T(3.2)}/>`+Ms(66,68,-35)+Ms(134,68,35)}if(s==="afro")return hr(100,78,78,.2,t,n,14);if(s==="braids")return kt(t,n)+os(34,108,230,5.4,[196])+os(166,108,230,5.4,[196]);if(s==="box")return kt(t,n)+os(30,110,228,5,[200],10)+os(170,110,228,5,[200],10);if(s==="locs")return kt(t,n)+Ji(32,112,236)+Ji(168,112,236);if(s==="sidebraid")return kt(t,n);if(s==="pony"||s==="sidepony"||s==="halfup"){const o=s==="sidepony"?"M118 78 Q150 70 158 120 Q164 160 150 200 Q136 188 138 160 Q132 120 124 96 Z":"M126 40 Q178 28 180 92 Q184 132 168 168 Q160 196 174 220 Q148 212 145 182 Q140 156 152 124 Q160 90 132 64 Z",i=s==="halfup"?70:s==="sidepony"?86:44;return kt(t,n)+pr(o,t,n,s==="sidepony"?["M130 96 Q150 120 146 160","M138 110 Q154 140 148 180"]:["M146 56 Q170 88 160 130","M156 66 Q176 100 166 140","M150 150 Q148 180 160 206"])+Ms(s==="sidepony"?124:128,i,s==="sidepony"?-20:25)}if(s==="pigtails")return kt(t,n)+pr("M40 100 Q22 120 28 168 Q34 200 48 214 Q58 196 52 160 Q58 124 56 108 Z",t,n,["M40 120 Q32 150 40 184"])+pr("M160 100 Q178 120 172 168 Q166 200 152 214 Q142 196 148 160 Q142 124 144 108 Z",t,n,["M160 120 Q168 150 160 184"])+Ms(52,96,20)+Ms(148,96,-20);if(s==="buns"){let o="";for(const i of[52,148])o+=`<circle cx="${i}" cy="44" r="24" fill="var(--hair)" ${T(3.2)}/>${n?`<circle cx="${i}" cy="44" r="24" fill="url(#${t}h)"/>`:""}`,o+=sn([`M${i-14} 48 Q${i-14} 28 ${i} 26 Q${i+16} 30 ${i+14} 48`,`M${i-8} 54 Q${i+8} 56 ${i+12} 48`]),o+=`<path d="M${i-12} 34 Q${i-4} 24 ${i+4} 26" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>`;return o+kt(t,n)}if(s==="topbun")return`<circle cx="100" cy="30" r="26" fill="var(--hair)" ${T(3.2)}/>${n?`<circle cx="100" cy="30" r="26" fill="url(#${t}h)"/>`:""}<path d="M82 28 Q100 12 118 28" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>${sn(["M86 36 Q100 24 114 36","M90 42 Q100 34 110 42"])}${kt(t,n)}`;if(s==="lowbun")return kt(t,n)+`<circle cx="100" cy="168" r="22" fill="var(--hair)" ${T(3)}/>${n?`<circle cx="100" cy="168" r="22" fill="url(#${t}h)"/>`:""}${Ms(100,148,0)}`;if(s==="long"||s==="wavy"){const o=s==="wavy"?"M36 108 Q28 160 40 210 Q52 250 46 286 Q70 270 78 230 Q60 180 58 140 Q52 120 48 108 Z M164 108 Q172 160 160 210 Q148 250 154 286 Q130 270 122 230 Q140 180 142 140 Q148 120 152 108 Z":"M38 110 Q30 170 36 240 Q42 280 34 300 L70 292 Q64 240 66 180 Q62 140 56 112 Z M162 110 Q170 170 164 240 Q158 280 166 300 L130 292 Q136 240 134 180 Q138 140 144 112 Z";return`<path d="${o}" fill="var(--hair)" ${T(3)}/>${lt(o,t,n)}${kt(t,n)}`}if(s==="bob"){const o=e==="curlybob"?"M30 120 Q24 170 48 196 Q70 210 100 206 Q130 210 152 196 Q176 170 170 120 Q150 150 100 156 Q50 150 30 120 Z":"M32 116 Q26 168 50 190 Q78 204 100 200 Q122 204 150 190 Q174 168 168 116 Q150 148 100 154 Q50 148 32 116 Z";return`<path d="${o}" fill="var(--hair)" ${T(3.2)}/>${lt(o,t,n)}${kt(t,n)}`}return kt(t,n)}function f$(e,t,n){const s=zf(e),o='<path d="M100 34 V56" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>';if(s==="puffs"||s==="braids"||s==="box"||s==="locs"||s==="afro"||s==="bangs"){const a=s==="afro"?"M48 100 Q52 48 100 40 Q148 48 152 100 Q140 78 100 70 Q60 78 48 100 Z":s==="bangs"?"M40 108 Q36 40 100 34 Q164 40 160 108 L150 96 Q130 108 100 100 Q70 108 50 96 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q154 74 130 62 Q112 70 100 52 Q88 70 70 62 Q46 74 40 106 Z";let r=yn+`<path d="${a}" fill="var(--hair)" ${T(3.2)}/>${lt(a,t,n)}${o}`;return r+=sn(["M84 44 Q70 52 60 70","M116 44 Q130 52 140 70","M92 40 Q80 48 74 58","M108 40 Q120 48 126 58","M76 42 Q58 56 52 82","M124 42 Q142 56 148 82"]),r+=go(["M90 36 Q78 42 70 52","M112 36 Q124 42 132 52"]),s==="puffs"?(r+=`<path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="${Bn}" stroke-width="7" stroke-linecap="round"/><path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`,r+=`<path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="${Bn}" stroke-width="7" stroke-linecap="round"/><path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`):s==="braids"||s==="box"?(r+=os(48,114,200,5,[156],s==="box"?10:7),r+=os(152,114,200,5,[156],s==="box"?10:7)):s==="locs"&&(r+=Ji(46,116,210,4.6)+Ji(154,116,210,4.6)),r+mn()}if(s==="sidebraid"){const a="M40 108 Q36 36 100 32 Q164 36 160 100 Q140 78 100 70 Q70 80 40 108 Z";return yn+`<path d="${a}" fill="var(--hair)" ${T(3.2)}/>${lt(a,t,n)}${sn(["M70 46 Q86 60 96 74","M120 44 Q136 58 146 74"])}${os(150,100,210,5.6,[168],7)}${mn()}`}if(s==="crown"){const a="M40 106 Q36 36 100 32 Q164 36 160 106 Q150 80 100 74 Q50 80 40 106 Z";let r="";for(let l=0;l<7;l++){const c=58+l*14;r+=`<path d="M${c} 58 Q${c+7} 46 ${c+14} 58" fill="none" stroke="var(--hair-shade)" stroke-width="3.2" stroke-linecap="round"/>`}return yn+`<path d="${a}" fill="var(--hair)" ${T(3.2)}/>${lt(a,t,n)}${r}${mn()}`}if(s==="pony"||s==="sidepony"||s==="halfup"||s==="pigtails"){const a=s==="sidepony"?"M40 108 Q34 36 100 32 Q166 34 160 108 Q150 86 120 78 Q90 90 60 74 Q48 90 40 108 Z":"M40 108 Q34 34 100 32 Q166 34 160 108 Q156 84 144 72 Q128 86 104 80 Q86 78 72 68 Q60 84 48 84 Q42 94 40 108 Z";let r=yn+`<path d="${a}" fill="var(--hair)" ${T(3.2)}/>${lt(a,t,n)}`;return r+=`<path d="M40 104 Q36 120 44 132 Q46 116 50 106 Z" fill="var(--hair)" ${T(2.4)}/><path d="M160 104 Q164 120 156 132 Q154 116 150 106 Z" fill="var(--hair)" ${T(2.4)}/>`,r+=sn(["M70 46 Q90 60 104 74","M128 46 Q140 60 146 74","M96 40 Q110 56 116 66"]),r+=go(["M76 42 Q92 52 100 62"]),r+mn()}if(s==="buns"||s==="topbun"||s==="lowbun"){const a=s==="topbun"?"M44 108 Q40 50 100 46 Q160 50 156 108 Q148 82 100 74 Q52 82 44 108 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q152 80 138 70 Q126 80 112 76 Q104 82 100 74 Q96 82 88 76 Q74 80 62 70 Q48 80 40 106 Z";let r=yn+`<path d="${a}" fill="var(--hair)" ${T(3.2)}/>${lt(a,t,n)}`;if(r+=sn(["M80 42 Q72 56 68 68","M120 42 Q128 56 132 68","M100 36 Q98 56 100 70","M90 38 Q84 56 86 72","M110 38 Q116 56 114 72"]),r+=go(["M86 38 Q80 46 78 54","M114 38 Q120 46 122 54"]),s==="buns")for(const[l,c]of[[42,1],[158,-1]]){const d=`M${l} 100 q${-8*c} 14 ${-2*c} 24 q${5*c} 8 ${-1*c} 14`;r+=`<path d="${d}" fill="none" stroke="${Bn}" stroke-width="7" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`}return r+mn()}if(s==="long"||s==="wavy"||s==="bob"){const a=e==="sidebangs"||e==="wavybob"?"M38 108 Q34 40 70 36 Q100 34 112 48 Q90 70 48 78 Q36 90 38 108 Z M112 48 Q140 36 164 50 Q166 100 150 108 Q130 80 112 70 Z":"M40 108 Q34 36 100 32 Q166 36 160 108 Q152 78 128 68 Q112 78 100 60 Q88 78 72 68 Q48 78 40 108 Z";return yn+`<path d="${a}" fill="var(--hair)" ${T(3.2)}/>${lt(a,t,n)}${sn(["M78 46 Q68 64 64 80","M122 46 Q132 64 136 80","M100 38 V64"])}${go(["M88 40 Q80 50 76 60"])}${mn()}`}if(s==="pixie"){const a="M48 104 Q44 48 100 40 Q140 46 150 78 Q156 100 140 108 Q120 86 100 90 Q70 84 52 104 Z";return yn+`<path d="${a}" fill="var(--hair)" ${T(3.2)}/>${lt(a,t,n)}${sn(["M70 56 Q86 70 96 84","M118 52 Q132 66 138 82"])}${mn()}`}const i="M46 106 Q42 46 100 38 Q158 46 154 106 Q140 80 100 76 Q60 80 46 106 Z";return yn+`<path d="${i}" fill="var(--hair)" ${T(3.2)}/>${lt(i,t,n)}${o}${mn()}`}const qs="var(--line)";function Ul(e){return Math.abs(e.legL)>=40||Math.abs(e.legR)>=40}function gs(e,t,n,s=[]){const o=s.map(i=>`<path d="${i}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`).join("");return(n?`<path d="${e}" fill="url(#${t}c)"/>`:"")+o}function Yr(e,t,n){const s=(n+7).toFixed(1);return`<path d="${e}" fill="none" stroke="${qs}" stroke-width="${s}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function zl(e,t,n){return ss("arm",e,t,n)}function Ci(e,t,n=!1){const[s,o]=Zt[e],i=e==="l"?-1:1;let a=Yr(`M${s} ${o} L${s+7*i} ${o+20}`,"var(--top)",22);return n&&(a+=`<path d="M${s+7*i-12} ${o+17} H${s+7*i+12}" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round" opacity=".9" transform="rotate(${-18*i} ${s+7*i} ${o+17})"/>`),zl(e,a,t)}function Lo(e,t,n=!0){const[s,o]=Zt[e],[i,a]=ns[e],r=e==="l"?-1:1,l=(s+i)/2+6*r;let c=Yr(`M${s-2*r} ${o-2} Q${l} ${(o+a)/2-6} ${i-r} ${a-16}`,"var(--top)",21);return n&&(c+=Yr(`M${i-3*r} ${a-17} L${i-r} ${a-13}`,"var(--top-trim)",20)),zl(e,c,t)}function Kr(e,t,n=!1){const[s,o]=Zt[e],i=e==="l"?-1:1,a=s+4*i,r=o+8;let l=`<path d="${Gr(a,r,13,9,3.2)}" fill="var(--top)" ${T(2.8)}/>`;return l+=`<ellipse cx="${a-4*i}" cy="${r-5}" rx="5" ry="3" fill="#fff" opacity=".45"/>`,n&&(l+=`<path d="M${a-11} ${r+13} ${Da(a-11,a+11,r+13,4,3)}" fill="none" stroke="#fff" stroke-width="2.4"/>`),zl(e,l,t)}function vt(e,t){return e("l",t)+e("r",t)}const id="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 228 Q100 236 64 228 Z";function Yn(e,t,n,s,o,i,a="",r=[],l=!1){const c=`<path d="${t}" fill="var(--top)" ${T(3)}/>${gs(t,s,o,r)}${a}`;return`<g class="shirt" data-hem="${i}">${l?c+n:n+c}</g>`}function g$(e,t,n,s,o){if(t.dress)return"";const i=t.top;if(i==="hoodie"){const l="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L139 230 Q100 240 61 230 Z",c=`<path d="M120 162 Q132 164 134 170 L139 230 Q128 233 123 233 Z" ${Oe}/><path d="M72 172 Q76 164 86 163" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".38"/><path d="M78 159 Q100 182 122 159 Q120 152 100 152 Q80 152 78 159 Z" fill="var(--top-trim)" ${T(2.8)}/><path d="M92 172 v18 M108 172 v18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="92" cy="191" r="2.6" fill="#fff" ${T(1.8)}/><circle cx="108" cy="191" r="2.6" fill="#fff" ${T(1.8)}/><path d="M78 202 H122 L127 222 H73 Z" fill="var(--top)" ${T(2.6)}/><path d="M78 202 H122 L124 210 H76 Z" ${Oe}/><path d="M61 226 Q100 236 139 226 L139 234 Q100 244 61 234 Z" fill="var(--top-trim)" ${T(2.8)}/>`;return Yn(e,l,vt(Lo,e),n,s,o,c,["M74 196 q-2 12 2 22","M126 190 q2 14 0 26"])}if(i==="stripes"||i==="jersey"){const l="M68 168 Q74 158 92 158 H108 Q126 158 132 168 L135 232 Q100 238 65 232 Z",c=`${n}st`,d=i==="jersey"?'<path d="M70 176 H130 L128 188 H72 Z" fill="var(--top-trim)"/><path d="M68 210 H132 L130 222 H70 Z" fill="var(--top-trim)"/>':[166,179,192,205,218,231].map(u=>`<rect x="60" y="${u}" width="80" height="6" fill="var(--top-trim)"/>`).join(""),f=i==="jersey"?'<path d="M86 160 L100 176 L114 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/>':'<path d="M84 159 Q100 172 116 159" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',g=s?`<path d="${l}" fill="url(#${n}c)"/>`:"";return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${c}"><path d="${l}"/></clipPath></defs>${vt(u=>Ci(u,e,!0),e)}<path d="${l}" fill="var(--top)"/><g clip-path="url(#${c})">${g}<path d="M118 160 L135 168 L138 236 H120 Z" ${Oe}/>${d}</g><path d="${l}" fill="none" ${T(3)}/>${f}<path d="M78 198 q-2 12 1 24" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/><path d="M122 190 q2 14 0 28" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/></g>`}if(i==="sweater"||i==="cardigan"){const l=i==="cardigan"?"M68 168 Q74 158 92 158 H108 Q126 158 132 168 L134 232 H108 L100 210 L92 232 H66 Z":"M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 234 Q100 242 64 234 Z",c=`<path d="M118 166 L134 174 L136 230 Q120 236 112 228 Z" ${Oe}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M64 226 Q100 236 136 226" fill="none" stroke="var(--top-trim)" stroke-width="6" stroke-linecap="round"/>`,d=i==="cardigan"?[186,202,218].map(f=>`<circle cx="100" cy="${f}" r="2.4" fill="var(--top-trim)" ${T(1.4)}/>`).join(""):"";return Yn(e,l,vt(Lo,e),n,s,o,c+d,["M80 190 q-2 16 0 28","M120 188 q2 16 0 30"])}if(i==="tank"||i==="bib"){const l=i==="bib"?"M78 168 H122 L126 228 H74 Z":"M78 168 Q86 160 96 164 H104 Q114 160 122 168 L128 226 H72 Z",c=`<path d="M110 172 H126 L128 226 H114 Z" ${Oe}/><path d="M82 176 Q84 168 92 166" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".35"/>`,d=i==="bib"?`${c}<path d="M86 150 L78 168 M114 150 L122 168" stroke="${qs}" stroke-width="8" stroke-linecap="round"/><path d="M86 150 L78 168 M114 150 L122 168" stroke="var(--top)" stroke-width="4.5" stroke-linecap="round"/><rect x="90" y="176" width="20" height="16" rx="3" fill="var(--top-trim)" ${T(1.6)}/>`:`${c}<path d="M84 166 Q100 176 116 166" fill="none" stroke="var(--top-trim)" stroke-width="4"/>`;return Yn(e,l,"",n,s,o,d,["M88 190 q2 14 0 24"])}if(i==="puff"||i==="ruffle"){const l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L132 222 H68 Z",c=`<path d="M100 172 l-8 -5 v10 z M100 172 l8 -5 v10 z" fill="var(--top-trim)" ${T(1.8)}/><path d="M97 174 l-4 10 M103 174 l4 10" stroke="var(--top-trim)" stroke-width="2.6" stroke-linecap="round"/>`,d=(i==="ruffle"?`<path d="M68 166 Q74 178 82 166 Q90 180 100 166 Q110 180 118 166 Q126 180 132 166" fill="var(--top-trim)" ${T(2)}/>`:c)+`<path d="M118 162 Q128 164 130 170 L132 222 H120 Z" ${Oe}/><path d="M74 176 Q76 168 84 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return Yn(e,l,vt(Kr,e),n,s,o,d,["M86 190 q2 10 0 20","M116 188 q-2 12 0 22"],!0)}if(i==="button"){const l=id,c=[180,196,212].map(f=>`<circle cx="100" cy="${f}" r="2.6" fill="#fff" ${T(1.6)}/>`).join(""),d=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${Oe}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M100 164 V226" stroke="#fff" stroke-width="2" opacity=".7"/>${c}<path d="M82 160 Q100 172 118 160" fill="var(--top)" ${T(2.2)}/>`;return Yn(e,l,vt(f=>Ci(f,e,!1),e),n,s,o,d,["M78 196 q-1 12 2 20"])}if(i==="raincoat"){const l="M62 168 Q70 156 92 156 H108 Q130 156 138 168 L146 240 Q100 252 54 240 Z",c=`<path d="M120 164 L142 176 L146 236 Q124 244 116 232 Z" ${Oe}/><path d="M72 176 Q76 166 88 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M70 156 Q100 176 130 156" fill="none" stroke="var(--top-trim)" stroke-width="6"/><circle cx="100" cy="196" r="4" fill="var(--top-trim)" ${T(1.8)}/><path d="M78 214 H122" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round"/>`;return Yn(e,l,vt(Lo,e),n,s,o,c,["M76 190 q-4 18 -2 36","M124 188 q4 18 2 36"])}const a=id,r=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${Oe}/><path d="M84 160 Q100 172 116 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return Yn(e,a,vt(l=>Ci(l,e,!1),e),n,s,o,r,["M78 196 q-2 12 1 22","M122 194 q2 14 -1 24"])}function ad(e,t,n,s,o,i=!1,a=16){const r=e==="l"?88:112,l=e==="l"?-1:1,c=`M${r-a/2} 226 Q${r-a/2+l} ${n-20} ${r-a/2+2*l} ${n} H${r+a/2} Q${r+a/2} ${n-30} ${r+a/2-l} 226 Z`;let d=`<path d="${c}" fill="var(--bottom)" ${T(2.8)}/>`;return d+=gs(c,s,o,[`M${r-4*l} 240 Q${r} ${(226+n)/2} ${r+3*l} ${n-14}`]),e==="r"?d+=`<path d="M${r+1} 230 H${r+a/2} L${r+a/2} ${n} H${r+4} Z" ${Oe}/>`:d+=`<path d="M${r-2} 238 Q${r-6} ${(226+n)/2} ${r-2} ${n-10}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".3"/>`,i&&(d+=`<path d="M${r-a/2-1} ${n-8} H${r+a/2+1} V${n+1} H${r-a/2-1} Z" fill="var(--bottom-trim)" ${T(2)}/>`),ss("leg",e,d,t)}function h$(e,t,n,s){if(t.dress)return'<g data-layer="bottom"></g>';const o=t.bottom;if(Ul(e)&&(o==="skirt"||o==="tutu"||o==="overalls"))return`<g data-layer="bottom"><path class="skirt" d="${o==="tutu"?"M52 216 H148 L160 248 Q100 260 40 248 Z":"M62 218 H138 L152 252 Q100 264 48 252 Z"}" fill="var(--bottom)" ${T(3)}/></g>`;if(o==="skirt"){const g="M68 222 H132 L146 262 Q100 274 54 262 Z";return`<g data-layer="bottom"><path class="skirt" d="${g}" fill="var(--bottom)" ${T(3)}/>${gs(g,n,s,["M82 234 L76 258","M100 232 V266","M118 234 L126 258"])}<path d="M114 224 H132 L146 262 Q130 268 118 266 Z" ${Oe}/><path d="M72 228 Q66 246 64 258" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".3"/><path d="M84 236 v10 M116 236 v10" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/></g>`}if(o==="tutu")return'<g data-layer="bottom"></g>';if(o==="overalls"){const g="M66 220 H134 L139 264 H106 L100 254 L94 264 H61 Z";return`<g data-layer="bottom"><g class="leg" style="transform-box:view-box;transform-origin:100px 238px"><path d="${g}" fill="var(--bottom)" ${T(3)}/>${gs(g,n,s,["M78 232 Q74 248 72 260","M122 230 Q128 248 132 260"])}<path d="M118 222 H134 L139 264 H122 Z" ${Oe}/><path d="M64 258 H95 M105 258 H138" stroke="var(--bottom-trim)" stroke-width="4"/></g></g>`}const a=o==="shorts"?256:292,r=o==="joggers"||o==="jeans",l=o==="leggings"?12:o==="shorts"?18:16,c=ad("l",e,a,n,s,r,l)+ad("r",e,a,n,s,r,l),d=o==="jeans"?'<path d="M88 232 V286 M112 232 V286" stroke="#c9a24a" stroke-width="1.4" stroke-dasharray="2 3" opacity=".7"/>':"";return`<g data-layer="bottom">${`<path d="M70 220 H130 V230 H70 Z" fill="var(--bottom)" ${T(2.4)}/>`}${c}${d}</g>`}function p$(e,t,n,s){if(t.dress)return'<g data-layer="bottom-over"></g>';const o=t.bottom;if(o==="overalls"){const i="M78 180 H122 L124 228 H76 Z";return`<g data-layer="bottom-over"><path d="M80 176 L72 164 M120 176 L128 164" stroke="${qs}" stroke-width="12" stroke-linecap="round"/><path d="M80 176 L72 164 M120 176 L128 164" stroke="var(--bottom)" stroke-width="7.5" stroke-linecap="round"/><path d="${i}" fill="var(--bottom)" ${T(3)}/>${gs(i,n,s,["M86 200 q14 6 28 0"])}<path d="M88 190 H112 V206 Q100 212 88 206 Z" fill="var(--bottom-trim)" ${T(2.4)}/><circle cx="82" cy="186" r="3.6" fill="#fff" ${T(2)}/><circle cx="118" cy="186" r="3.6" fill="#fff" ${T(2)}/><path d="M66 222 H134 L135 230 H65 Z" fill="var(--bottom)" ${T(3)}/><path d="M108 180 H122 L124 228 H110 Z" ${Oe}/><path d="M82 182 v12" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/></g>`}if(o==="tutu"){if(Ul(e))return`<g data-layer="bottom-over"><path class="skirt" d="M58 220 H142 L154 246 Q100 256 46 246 Z" fill="var(--bottom)" ${T(2.4)}/></g>`;let i="";const a=[[266,50,150,8],[256,56,144,7],[246,64,136,6]];for(let l=0;l<a.length;l++){const[c,d,f,g]=a[l],h=`M${d+8} ${c-22} H${f-8} L${f} ${c} ${Da(f,d,c,6,g)} Z`;i+=`<path class="skirt" d="${h}" fill="var(--bottom)" ${T(2.4)}/>`,i+=`<path d="M${f-20} ${c-16} L${f-6} ${c-2}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".2"/>`}const r="M66 214 H134 V224 H66 Z";return`<g data-layer="bottom-over">${i}<path d="${r}" fill="var(--bottom-trim)" ${T(2.6)}/>${gs(r,n,s)}</g>`}return'<g data-layer="bottom-over"></g>'}function rd(e,t){return`<path d="M${e} ${t+2} c-3 -5 -9 -1 -5 3 l5 4 l5 -4 c4 -4 -2 -8 -5 -3z" fill="var(--top-trim)" opacity=".85"/>`}function u$(e,t,n,s,o){const i=t.dress;if(!i)return"";const a=`${n}dr`;let r="M72 210 H128 L150 268 Q100 282 50 268 Z",l="M72 168 Q78 158 94 158 H106 Q122 158 128 168 L130 214 H70 Z",c="",d=vt(u=>Kr(u,e,!0),e),f=!0;i==="sundress"?(r="M76 214 H124 L140 266 Q100 276 60 266 Z",c='<path d="M78 166 Q100 180 122 166" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',d="",f=!1):i==="party"?c=[[64,236],[86,228],[108,234],[130,242],[76,254],[100,250],[122,258],[92,188]].map(([b,_])=>rd(b,_)).join("")+`<path d="M100 214 l-10 -6 v12 z M100 214 l10 -6 v12 z" fill="var(--top-trim)" ${T(1.8)}/><path d="M52 262 Q100 276 148 262" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="1 5" opacity=".85"/>`:i==="pinafore"?(l="M80 176 H120 L122 214 H78 Z",c='<path d="M86 158 L80 178 M114 158 L120 178" stroke="var(--top)" stroke-width="5" stroke-linecap="round"/>',d="",f=!1,r="M74 212 H126 L142 264 Q100 274 58 264 Z"):i==="jumper"?(c=`<path d="M84 160 Q100 174 116 160" fill="var(--top-trim)" ${T(2)}/>`,d=vt(u=>Ci(u,e,!0),e),f=!1):i==="ballet"?(r="M78 214 H122 L132 250 Q100 258 68 250 Z",c=`<path d="M70 248 ${Da(70,130,248,5,5)}" fill="none" stroke="#fff" stroke-width="2"/>`,d=vt(Kr,e)):i==="nightgown"?(r="M80 214 H120 L132 270 Q100 278 68 270 Z",c='<path d="M88 164 Q100 176 112 164" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>',d=vt(Lo,e),f=!1):i==="raindress"?(r="M70 212 H130 L148 268 Q100 280 52 268 Z",c='<path d="M76 168 Q100 186 124 168" fill="none" stroke="var(--top-trim)" stroke-width="5"/><circle cx="100" cy="198" r="3.4" fill="var(--top-trim)"/>',d=vt(Lo,e),f=!1):(r="M70 214 H130 L152 266 Q100 280 48 266 Z",l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L131 216 H69 Z",c=[[66,236],[86,228],[110,232],[132,240],[76,254],[100,248],[124,258],[56,260],[144,262],[96,266],[84,182],[114,190],[100,200]].map(([b,_])=>rd(b,_)).join("")+`<path d="M112 214 H130 L152 266 Q138 271 128 272 Z" ${Oe}/><path d="M118 162 L130 168 L131 216 H120 Z" ${Oe}/><path d="M50 262 Q100 276 150 262" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9"/><path d="M60 226 Q56 244 54 258" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/><path d="M68 210 H132 V220 H68 Z" fill="var(--top-trim)" ${T(2.6)}/><path d="M100 215 l-13 -8 v16 z M100 215 l13 -8 v16 z" fill="var(--top-trim)" ${T(2.2)}/><circle cx="100" cy="215" r="3.6" fill="var(--top-trim)" ${T(2)}/><path d="M97 218 l-5 14 M103 218 l5 14" stroke="var(--top-trim)" stroke-width="3" stroke-linecap="round"/><path d="M80 158 Q78 172 94 170 Q99 166 100 162 Q101 166 106 170 Q122 172 120 158 Q100 164 80 158 Z" fill="#fff" ${T(2.4)}/>`),Ul(e)&&(r="M68 214 H132 L150 250 Q100 262 50 250 Z");const g=`${r} ${l}`,h=`<path class="skirt" d="${r}" fill="var(--top)" ${T(3)}/><path d="${l}" fill="var(--top)" ${T(3)}/><g clip-path="url(#${a})">${gs(g,n,s,["M80 226 Q74 248 70 266","M120 226 Q126 248 130 266"])}${c}</g>`;return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${a}"><path d="${g}"/></clipPath></defs>${f?h+d:d+h}</g>`}function m$(e,t,n,s){const o=e==="l"?`<g transform="translate(${2*s} 0) scale(-1 1)">${n}</g>`:n;return ss("leg",e,o,t)}function y$(e,t){const n=t.shoes;let s="";for(const o of["l","r"]){const i=o==="l"?87:113;let a="";if(n==="sneakers"||n==="lightup"){const r=n==="lightup"?`<circle cx="${i-4}" cy="292" r="2.2" fill="#ff8fab"/><circle cx="${i+4}" cy="296" r="2.2" fill="#8ecae6"/><circle cx="${i}" cy="300" r="2" fill="#ffd166"/>`:"";a=`<path d="M${i} 270 V286" fill="none" stroke="var(--sock)" stroke-width="16" stroke-linecap="round"/><path d="M${i-14} 296 Q${i-14} 284 ${i} 284 Q${i+14} 284 ${i+16} 296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+12} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${T(2.8)}/><path d="M${i-12} 304 H${i+18}" stroke="var(--shoe-trim)" stroke-width="3.5" stroke-linecap="round"/><path d="M${i-6} 290 l5 2 M${i-6} 295 l6 2" stroke="${qs}" stroke-width="1.8" stroke-linecap="round"/>${r}`}else if(n==="boots"||n==="rainboots"){const r=n==="rainboots"?248:258,l=n==="boots"?[[-6,272],[5,268],[-2,284],[7,290],[-8,294]].map(([c,d])=>`<circle cx="${i+c}" cy="${d}" r="2.6" fill="#fff" opacity=".9"/>`).join(""):"";a=`<path d="M${i-14} ${r} H${i+14} V296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+10} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${T(2.8)}/><path d="M${i-16} ${r-4} H${i+16} V${r+8} H${i-16} Z" fill="var(--shoe)" ${T(2.6)}/>`+l+(n==="rainboots"?`<path d="M${i-12} ${r+16} H${i+12}" stroke="var(--shoe-trim)" stroke-width="4" stroke-linecap="round"/>`:`<path d="M${i-6} ${r+14} V292" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".45"/>`)}else n==="maryjanes"?a=`<path d="M${i} 266 V290" fill="none" stroke="var(--sock)" stroke-width="15" stroke-linecap="round"/><path d="M${i-12} 274 ${Da(i-12,i+12,274,4,4)} L${i+12} 268 H${i-12} Z" fill="var(--sock)" ${T(2)}/><path d="M${i-13} 298 Q${i-13} 290 ${i} 290 Q${i+13} 290 ${i+14} 298 Q${i+20} 300 ${i+20} 304 Q${i+20} 309 ${i+8} 309 H${i-12} Q${i-16} 309 ${i-14} 302 Z" fill="var(--shoe)" ${T(2.8)}/><path d="M${i-10} 294 H${i+12}" stroke="${qs}" stroke-width="2"/><circle cx="${i+8}" cy="294" r="2.2" fill="var(--acc)"/>`:n==="sandals"?a=`<path d="M${i-12} 298 Q${i-12} 286 ${i} 286 Q${i+12} 286 ${i+14} 296 Q${i+18} 298 ${i+18} 302 Q${i+18} 306 ${i+8} 306 H${i-12} Q${i-16} 306 ${i-14} 300 Z" fill="var(--skin)" ${T(2.4)}/><path d="M${i-14} 304 H${i+18}" stroke="var(--shoe)" stroke-width="5" stroke-linecap="round"/><path d="M${i-8} 292 H${i+10} M${i+2} 300 L${i+8} 290" stroke="var(--shoe)" stroke-width="4" stroke-linecap="round"/><circle cx="${i+2}" cy="293" r="3" fill="var(--shoe-trim)" ${T(1.4)}/>`:n==="slippers"?a=`<path d="M${i-14} 292 Q${i-14} 280 ${i} 278 Q${i+16} 280 ${i+18} 294 Q${i+22} 296 ${i+20} 304 H${i-14} Q${i-18} 304 ${i-16} 296 Z" fill="var(--shoe)" ${T(2.8)}/><path d="M${i-6} 286 q6 -4 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`:a=`<ellipse cx="${i+2}" cy="304" rx="16" ry="7" fill="var(--shoe)" ${T(2.6)}/>`;s+=m$(o,e,a,i)}return`<g data-layer="shoes">${s}</g>`}const Df=new Set(["cap","beanie","sunhat"]),k$=new Set(["catears","earmuffs"]);function qf(e){return e==="afro"?28:e==="topbun"?20:e==="puffs"||e==="coily"?16:e==="buns"||e==="curlybob"?12:e==="long"||e==="wavy"||e==="wavybob"?8:0}function so(e,t,n){if(!Df.has(t)&&!k$.has(t))return n;const s=qf(e);return s?`<g data-hat="${t}" transform="translate(0 ${w(-s)})">${n}</g>`:n}function b$(e,t,n){let s="";for(let l=0;l<n.length;l++)Df.has(n[l])&&(s=n[l]);if(!s)return"";const o=qf(t),i=(s==="beanie"?58:s==="cap"?64:62)-o,a=Math.min(70,i),r=t==="afro"||t==="puffs"||t==="coily"?92:78;return`<mask id="${e}hm" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" data-brim="${w(a)}"><rect x="-30" y="-50" width="260" height="420" fill="#fff"/><rect x="${w(100-r)}" y="-50" width="${w(r*2)}" height="${w(a+50)}" fill="#000"/></mask>`}function ur(e,t,n){return`<g transform="translate(${e} ${t}) scale(${n})"><path d="M0 0 C-8 -14 -30 -14 -28 0 C-30 14 -8 14 0 0 Z" fill="var(--acc)" ${T(2.6)}/><path d="M0 0 C8 -14 30 -14 28 0 C30 14 8 14 0 0 Z" fill="var(--acc)" ${T(2.6)}/><rect x="-6" y="-7" width="12" height="14" rx="4" fill="var(--acc2)" ${T(2.2)}/></g>`}function v$(e){return`<g data-layer="accessory">${e.acc.map(n=>n==="glasses"?'<circle cx="76" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="124" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="76" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><circle cx="124" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3.2"/><path d="M58 108 L42 104 M142 108 L158 104" stroke="var(--frame)" stroke-width="3.2" stroke-linecap="round"/>':n==="square"?'<rect x="58" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><rect x="108" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><path d="M92 112 H108" stroke="var(--frame)" stroke-width="3.2"/>':n==="sunnies"?'<path d="M56 104 H94 Q96 122 76 122 Q56 122 56 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M106 104 H144 Q146 122 124 122 Q104 122 106 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3"/>':n==="bow"?ur(100,78,.7):n==="bigbow"?ur(100,70,1.15):n==="headband"?`<path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="${qs}" stroke-width="12" stroke-linecap="round"/><path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round"/>${ur(100,32,.85)}`:n==="flower"?`<g transform="translate(138 78)">${[0,60,120,180,240,300].map(s=>`<ellipse cx="0" cy="-8" rx="5" ry="8" fill="var(--acc)" ${T(1.6)} transform="rotate(${s})"/>`).join("")}<circle r="4.5" fill="var(--acc2)" ${T(1.6)}/></g>`:n==="cap"?so(e.hair,"cap",`<path d="M54 64 Q56 20 100 16 Q144 20 146 64 Q128 54 100 56 Q72 54 54 64 Z" fill="var(--acc)" ${T(3)}/><path d="M48 56 Q100 66 152 56 L156 62 Q100 70 44 62 Z" fill="var(--acc)" ${T(3)}/><circle cx="100" cy="18" r="4.5" fill="#fff" ${T(2)}/>`):n==="beanie"?so(e.hair,"beanie",`<path d="M50 66 Q48 14 100 8 Q152 14 150 66 Q128 56 100 58 Q72 56 50 66 Z" fill="var(--acc)" ${T(3)}/><path d="M50 58 H150" stroke="var(--acc2)" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="8" r="7" fill="var(--acc2)" ${T(2.4)}/>`):n==="sunhat"?so(e.hair,"sunhat",`<path d="M66 56 Q68 22 100 18 Q132 22 134 56 Q118 48 100 50 Q82 48 66 56 Z" fill="var(--acc)" ${T(3)}/><path d="M18 56 Q100 68 182 56 Q170 64 100 66 Q30 64 18 56 Z" fill="var(--acc)" ${T(3)}/><path d="M72 46 Q100 38 128 46" fill="none" stroke="var(--acc2)" stroke-width="4"/>`):n==="catears"?so(e.hair,"catears",`<path d="M58 62 L70 18 L86 60 Z" fill="var(--acc)" ${T(2.6)}/><path d="M114 60 L130 18 L142 62 Z" fill="var(--acc)" ${T(2.6)}/><path d="M64 54 L72 30 L80 52 Z" fill="var(--acc2)"/><path d="M120 52 L128 30 L136 54 Z" fill="var(--acc2)"/>`):n==="earmuffs"?so(e.hair,"earmuffs",`<path d="M44 68 Q48 26 100 22 Q152 26 156 68" fill="none" stroke="var(--acc)" stroke-width="6"/><circle cx="34" cy="86" r="14" fill="var(--acc)" ${T(2.8)}/><circle cx="166" cy="86" r="14" fill="var(--acc)" ${T(2.8)}/><circle cx="34" cy="86" r="6" fill="var(--acc2)"/><circle cx="166" cy="86" r="6" fill="var(--acc2)"/>`):"").join("")}</g>`}const w$=[{hip:1.5,head:4,armL:3,armR:-2,legL:0,legR:-3,legLLift:0,legRLift:0},{hip:-2,head:-5,armL:1,armR:-7,legL:4,legR:0,legLLift:2,legRLift:0},{hip:0,head:3,armL:2,armR:-2,legL:0,legR:0,legLLift:0,legRLift:0},{hip:-1.5,head:-4,armL:4,armR:-1,legL:5,legR:0,legLLift:3,legRLift:0}],$$={puffs:0,afro:0,pony:1,sidepony:1,pigtails:1,halfup:1,braids:2,boxbraids:2,locs:2,sidebraid:2,crown:2,buns:3,topbun:3,lowbun:3};function Zf(e){const t=e.hair||"buns";let n=$$[t];if(n===void 0){let s=0;for(let o=0;o<t.length;o++)s=(s+t.charCodeAt(o))%4;n=s}return w$[n]}function x$(e){const t=(n,s,o,i,a)=>{const r=jr(n,s,o,i,a),l=jr(r.x,r.y,100,238,e.hip);return{x:l.x/2,y:l.y/2}};return{left:t(ns.l[0],ns.l[1],Zt.l[0],Zt.l[1],e.armL),right:t(ns.r[0],ns.r[1],Zt.r[0],Zt.r[1],e.armR)}}function _$(e){const t=jr(100,244,100,238,e.hip);return Math.round(t.y/2*10)/10}function Dl(e){const t=parseInt(e.slice(1),16);return(t>>16&255)+(t>>8&255)+(t&255)}function M$(e){const t=Mo(e,.32);return Dl(t)<80?"#5a3a2c":t}function L$(e){return Dl(e)<140?"#3b2340":Mo(e,.12)}let ld=0;function C$(){return ld+=1,"a"+ld.toString(36)}function ho(e,t){return t.hip?`<g transform="rotate(${w(t.hip)} 100 238)">${e}</g>`:e}function oo(e,t,n=!1){const s=t.head?`<g transform="rotate(${w(t.head)} 100 158)">${e}</g>`:e;return ho(`<g${n?' class="dollhead" data-dollhead="1"':' class="dollhead"'}>${s}</g>`,t)}function S$(e,t,n){let s=`<defs><radialGradient id="${e}b"><stop offset="0" style="stop-color:var(--blush)" stop-opacity=".62"/><stop offset=".55" style="stop-color:var(--blush)" stop-opacity=".28"/><stop offset="1" style="stop-color:var(--blush)" stop-opacity="0"/></radialGradient>`;return s+=`<radialGradient id="${e}s"><stop offset="0" stop-color="#3a1d3c" stop-opacity=".3"/><stop offset=".6" stop-color="#3a1d3c" stop-opacity=".12"/><stop offset="1" stop-color="#3a1d3c" stop-opacity="0"/></radialGradient>`,s+=`<radialGradient id="${e}k" cx=".42" cy=".36" r=".75"><stop offset=".55" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".16"/></radialGradient>`,t&&(s+=`<linearGradient id="${e}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f1020" stop-opacity=".62"/><stop offset=".5" stop-color="#1f1020" stop-opacity=".05"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`,s+=`<linearGradient id="${e}c" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="146" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".2"/></linearGradient>`,s+=`<radialGradient id="${e}h" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1f1020" stop-opacity=".28"/></radialGradient>`),s+n+"</defs>"}function cd(e){const t=e==="l"?-1:1,n=Zt[e][0],s=Zt[e][1],o=ns[e][0],i=ns[e][1],a=o-t,r=i-7,l=-t;let c=`<path d="${Vr([n,s],[a,r],18,13,-3*t)}" fill="var(--skin)" ${T(3)}/>`;return c+=`<path class="hand" d="M${w(o-8)} ${w(i-4)} Q${w(o-8)} ${w(i-10)} ${w(o)} ${w(i-10)} Q${w(o+8)} ${w(i-10)} ${w(o+8)} ${w(i-3)} Q${w(o+8.5)} ${w(i+9)} ${w(o)} ${w(i+9.5)} Q${w(o-8.5)} ${w(i+9)} ${w(o-8)} ${w(i-4)} Z" fill="var(--skin)" ${T(2.8)}/>`,c+=`<ellipse cx="${w(o+7*l)}" cy="${w(i-1)}" rx="3.4" ry="5" fill="var(--skin)" ${T(2.4)} transform="rotate(${-20*l} ${w(o+7*l)} ${w(i-1)})"/>`,c+=`<path d="M${w(o-3*l)} ${w(i+3)} v4 M${w(o+.5*l)} ${w(i+3.5)} v4" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`,c+=`<ellipse cx="${w(o-3*l)}" cy="${w(i-5)}" rx="3" ry="1.8" fill="#fff" opacity=".35"/>`,c}function dd(e){const t=e==="l"?-1:1,n=e==="l"?88:112;let s=`<path d="${Vr([n,234],[n+t,294],21,15,1.5*t)}" fill="var(--skin)" ${T(3)}/>`;return s+=`<path d="${Vr([n+5*t,244],[n+5*t,290],6,4)}" ${Oe}/>`,s+=`<ellipse cx="${w(n+.5*t)}" cy="268" rx="4.5" ry="2.6" fill="#3a1d3c" opacity=".12"/>`,s+=`<path d="M${n-4} 265 q4 -2.5 8 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`,s}function fd(e,t,n,s,o,i){const a=n?-1:1,r=o==="big"||o==="bright"?1.08:o==="soft"?.94:1,l=(m,p)=>`${w(e+m*r)} ${w(t+p*r)}`,c=13.5*r,d=17*r;let f="";if(i&&o!=="soft"){const m=[.35,.95,1.57,2.2,2.8];for(let p=0;p<m.length;p++){const v=m[p];f+=`<path d="M${w(e+5.5*Math.cos(v)*r)} ${w(t+(4+6.5*Math.sin(v))*r)} L${w(e+11.5*Math.cos(v)*r)} ${w(t+(2+14*Math.sin(v))*r)}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>`}}const g=o==="soft"?2:2.6,h=o==="soft"?"":`<path d="M${l(-16*a,-8)} q${w(-6*a*r)} -2 ${w(-9*a*r)} ${w(-9*r)} M${l(-17*a,-2)} q${w(-6*a*r)} ${w(-.5*r)} ${w(-10*a*r)} ${w(-5*r)} M${l(-12*a,-15)} q${w(-3*a*r)} ${w(-4*r)} ${w(-4*a*r)} ${w(-9*r)}" fill="none" stroke="var(--lash)" stroke-width="2.2" stroke-linecap="round"/>`,u=o==="sparkle"||o==="bright"?`<path d="M${l(-9*a,-8)} l.7 1.6 1.6 .7 -1.6 .7 -.7 1.6 -.7 -1.6 -1.6 -.7 1.6 -.7 Z" fill="#fff" opacity=".9"/>`:"",b=i?`<ellipse cx="${e}" cy="${w(t+r)}" rx="${w(c)}" ry="${w(d)}" fill="url(#${s}i)"/>`:"",_=o==="sleepy"?`<path d="M${l(-17,-4)} Q${e} ${w(t+r)} ${l(17,-4)} L${l(18,-16)} Q${e} ${w(t-20*r)} ${l(-18,-16)} Z" fill="var(--skin)"/>`:"";return`<path d="M${l(-16,-2)} Q${l(-16,-20)} ${l(0,-20)} Q${l(16,-20)} ${l(16,-2)} Q${l(16,19)} ${l(0,19)} Q${l(-16,19)} ${l(-16,-2)} Z" fill="#fff"/><path d="M${l(-15,-4)} Q${e} ${w(t-21*r)} ${l(15,-4)} Q${e} ${w(t-14*r)} ${l(-15,-4)} Z" fill="#3a1d3c" opacity=".12"/><ellipse data-iris="1" cx="${e}" cy="${w(t+r)}" rx="${w(c)}" ry="${w(d)}" fill="var(--eye)"/>${b}${f}<ellipse cx="${e}" cy="${w(t+3*r)}" rx="${w(7*r)}" ry="${w(9*r)}" fill="#1f1020" opacity=".8"/><ellipse cx="${e}" cy="${w(t+r)}" rx="${w(11.3*r)}" ry="${w(14.8*r)}" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/><ellipse cx="${e}" cy="${w(t+r)}" rx="${w(c)}" ry="${w(d)}" fill="none" stroke="#1f1020" stroke-width="2" opacity=".55"/><path d="M${l(-9,12)} Q${e} ${w(t+19.5*r)} ${l(9,12)} Q${e} ${w(t+15.5*r)} ${l(-9,12)} Z" fill="#fff" opacity=".5"/><ellipse cx="${w(e-6*a*r)}" cy="${w(t-6*r)}" rx="${w(5.8*r)}" ry="${w(6.8*r)}" fill="#fff" transform="rotate(${-15*a} ${w(e-6*a*r)} ${w(t-6*r)})"/><circle cx="${w(e+6*a*r)}" cy="${w(t+8*r)}" r="${w(2.8*r)}" fill="#fff"/><circle cx="${w(e-4*a*r)}" cy="${w(t+10*r)}" r="${w(1.3*r)}" fill="#fff" opacity=".85"/><path d="M${l(7*a,-10)} l${w(r)} ${w(2.4*r)} ${w(2.4*r)} ${w(r)} ${w(-2.4*r)} ${w(r)} ${w(-r)} ${w(2.4*r)} ${w(-r)} ${w(-2.4*r)} ${w(-2.4*r)} ${w(-r)} ${w(2.4*r)} ${w(-r)} Z" fill="#fff"/>`+u+_+`<path d="M${l(-17,-1)} Q${l(-16,-21)} ${l(0,-21)} Q${l(16,-21)} ${l(17,-3)} Q${l(14.5,-18.6)} ${l(0,-18.8)} Q${l(-14.5,-18.6)} ${l(-15.5,-1)} Z" fill="var(--lash)" stroke="var(--lash)" stroke-width="${g}" stroke-linejoin="round"/>`+h+`<path d="M${l(-11,-23)} Q${e} ${w(t-27*r)} ${l(11,-23)}" fill="none" stroke="var(--line)" stroke-width="1.3" stroke-linecap="round" opacity=".22"/><path d="M${l(-5,20.5)} Q${e} ${w(t+22*r)} ${l(5,20.5)}" fill="none" stroke="var(--lash)" stroke-width="1.3" stroke-linecap="round" opacity=".28"/>`}function B$(e,t,n,s=!1){const o=e.blush?`<ellipse cx="64" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><ellipse cx="136" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><path d="M60 133 l3 -3 M66 134 l3 -3 M132 133 l3 -3 M138 134 l3 -3" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>`:"";let i="";if(e.freckles){const a=[[58,132],[64,136],[70,131],[130,131],[136,136],[142,132]];for(let r=0;r<a.length;r++)i+=`<circle cx="${a[r][0]}" cy="${a[r][1]}" r="1.5" fill="var(--freckle)" opacity=".7"/>`}return o+i+'<path data-brow="l" d="M64 86 Q74 80 85 84" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/><path data-brow="r" d="M115 84 Q126 80 136 86" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'+fd(76,112,!1,t,s?"sleepy":e.eyes,n)+fd(124,112,!0,t,s?"sleepy":e.eyes,n)+'<path d="M98 131 q2 1.8 4 0" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" opacity=".55"/><ellipse cx="101.5" cy="128.5" rx="1.6" ry="1" fill="#fff" opacity=".6"/><path d="M92 140 Q100 147.5 108 140" fill="none" stroke="var(--line)" stroke-width="2.8" stroke-linecap="round"/><path d="M96 142.6 Q100 145.4 104 142.6 Q100 144 96 142.6 Z" fill="#ff8fa8"/>'}function H$(e){const t="M40 102 Q38 38 100 38 Q162 38 160 102 Q160 140 132 153 Q116 160 100 160 Q84 160 68 153 Q40 140 40 102 Z";return`<ellipse cx="39" cy="114" rx="9" ry="11" fill="var(--skin)" ${T(3)}/><ellipse cx="161" cy="114" rx="9" ry="11" fill="var(--skin)" ${T(3)}/><ellipse cx="40" cy="115" rx="4" ry="6" ${Fr}/><ellipse cx="160" cy="115" rx="4" ry="6" ${Fr}/><path d="${t}" fill="var(--skin)" ${T(3.2)}/><path d="${t}" fill="url(#${e}k)"/>`}function P$(){return`<path d="M91 146 h18 v22 q-9 5 -18 0 Z" fill="var(--skin)" ${T(3)}/><path d="M91 150 h18 v9 q-9 6 -18 0 Z" ${Fr}/><path d="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z" fill="var(--skin)" ${T(3)}/>`}function T$(e,t){const n=Ns(e),s=t?.pose??Zf(n),o=t?.rich!==!1,i=t?.uid??C$(),a=_$(s),r=n.shoesC,l=r.toLowerCase()==="#ffffff"?n.dress?n.dressC:n.topC:sd(r,.28),c=n.dress?n.dressC:n.topC,d=Dl(c)>700?"#8fdcc0":Mo(c,.18),f=["--line:#5a3d5c",`--skin:${n.skin}`,`--hair:${n.hairC}`,`--hair-shade:${M$(n.hairC)}`,`--brow:${L$(n.hairC)}`,`--eye:${n.eyeC}`,"--lash:#3b2340","--blush:#ff6f91",`--freckle:${Mo(n.skin,.35)}`,`--top:${c}`,`--top-trim:${d}`,`--bottom:${n.dress?n.dressC:n.bottomC}`,`--bottom-trim:${Mo(n.dress?n.dressC:n.bottomC,.16)}`,`--shoe:${r}`,`--shoe-trim:${l}`,"--sock:#ffffff",`--acc:${n.accC}`,`--acc2:${sd(n.accC,.18)}`,"--frame:#6e4a5e"].join(";"),g=ss("leg","l",dd("l"),s)+ss("leg","r",dd("r"),s),h=ss("arm","l",`<g class="hand">${cd("l")}</g>`,s)+ss("arm","r",`<g class="hand">${cd("r")}</g>`,s),u=`<g data-layer="body">${g}${ho(P$()+h,s)}${oo(H$(i),s,!0)}</g>`,b=n.dress?u$(s,n,i,o,a):g$(s,n,i,o,a),_=`<g class="shadow"><ellipse cx="100" cy="308" rx="52" ry="9" fill="url(#${i}s)"/><ellipse cx="87" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/><ellipse cx="113" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/></g>`,m=b$(i,n.hair,n.acc),p=m?` mask="url(#${i}hm)"`:"",v=[`<g data-layer="hair-back">${oo(`<g${p}>${d$(n.hair,i,o)}</g>`,s)}</g>`,u,y$(s,n),ho(h$(s,n,i,o),s),ho(b,s),ho(p$(s,n,i,o),s),`<g data-layer="face">${oo(B$(n,i,o,t?.poseName==="lie"),s)}</g>`,`<g data-layer="hair-front">${oo(`<g${p}>${f$(n.hair,i,o)}</g>`,s)}</g>`,oo(v$(n),s)].join(""),$=n.dress||n.top;return`<svg${t?.poseName?` data-pose="${t.poseName}"`:""} data-chibi="1" data-hair="${n.hair}" data-top="${$}" viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" style="${f}">${S$(i,o,m)}${_}${v}</svg>`}function ql(){try{return typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("selector(&)")}catch{return!1}}function Go(e,t,n){const s=!!(t&&t.look2);e.classList.toggle("chibi",s);const o=s&&ql();e.classList.toggle("chibi-move",s&&(o||n)),e.classList.toggle("chibi-bob",s&&!o&&!n)}const Qe="#5a3d5c",le=`stroke="${Qe}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,W$=["little","kid","adult"],Yo={little:.78,kid:1,adult:1.28},po={left:{x:15,y:113},right:{x:85,y:113}};function qa(e,t){return e.look2?x$(t??Zf(e.look2)):t?{left:{x:22,y:96},right:{x:78,y:96}}:po}function If(e,t){return e===1?`<path d="M62 16 L76 8 L76 26 Z M62 16 L50 6 L48 24 Z" fill="#ff7aa8" stroke="${Qe}" stroke-width="3" stroke-linejoin="round"/><circle cx="62" cy="16" r="5" fill="#ffd166" stroke="${Qe}" stroke-width="3"/>`:e===2?`<circle cx="40" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${Qe}" stroke-width="3"/><circle cx="60" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${Qe}" stroke-width="3"/><path d="M49 48 h2" stroke="${Qe}" stroke-width="3"/>`:e===3?`<path d="M20 30 Q22 8 50 8 Q78 8 80 30 Z" fill="${t}" stroke="${Qe}" stroke-width="3.5" stroke-linejoin="round"/><path d="M60 28 Q84 26 92 32 Q80 36 60 34 Z" fill="${t}" stroke="${Qe}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="9" r="4" fill="#fff" stroke="${Qe}" stroke-width="3"/>`:""}function ea(e,t,n){return n?e===1?`<path d="M20 40 Q16 86 30 92 L70 92 Q84 86 80 40 Z" fill="${t}" ${le}/>`:e===2?`<circle cx="18" cy="34" r="12" fill="${t}" ${le}/><circle cx="82" cy="34" r="12" fill="${t}" ${le}/>`:e===3?`<circle cx="50" cy="8" r="13" fill="${t}" ${le}/>`:"":e===3?`<path d="M22 42 Q20 14 50 12 Q80 14 78 42 Q66 26 50 30 Q34 26 22 42 Z" fill="${t}" ${le}/>`:`<path d="M21 46 Q18 12 50 12 Q82 12 79 46 Q72 30 58 28 Q50 36 36 30 Q26 34 21 46 Z" fill="${t}" ${le}/>`}function tt(e,t){const n=Pl(t);return e.look2?T$(e.look2,{rich:ql(),pose:n??void 0,poseName:t||void 0}):t==="sit"||t==="lie"?R$(e,t):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${ea(e.hairStyle,e.hair,!0)}
  <rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${le}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${le}/>
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${Qe}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${Qe}"/>
  <rect class="arm" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${le} transform="rotate(12 22 82)"/>
  <rect class="arm" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${le} transform="rotate(-12 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${le}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${le}/>
  <circle cx="50" cy="44" r="30" fill="${e.skin}" ${le}/>
  ${ea(e.hairStyle,e.hair,!1)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${Qe}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${Qe}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${le} fill="none"/>
  ${If(e.acc??0,e.shirt)}
  <circle class="hand" cx="${po.left.x}" cy="${po.left.y}" r="6" fill="${e.skin}" ${le}/><circle class="hand" cx="${po.right.x}" cy="${po.right.y}" r="6" fill="${e.skin}" ${le}/>
</svg>`}function R$(e,t){const n=t==="sit"?`<rect class="leg" x="34" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${le} transform="rotate(-68 40 112)"/>
  <rect class="leg" x="53" y="108" width="13" height="28" rx="6" fill="${e.pants}" ${le} transform="rotate(68 60 112)"/>`:`<rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${le}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${le}/>`,s=t==="lie"?`<path d="M34 48 Q40 52 46 48" fill="none" ${le}/><path d="M54 48 Q60 52 66 48" fill="none" ${le}/>`:`<ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${Qe}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${Qe}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>`,o=`<ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${ea(e.hairStyle,e.hair,!0)}
  ${n}
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${Qe}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${Qe}"/>
  <rect class="arm" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${le} transform="rotate(28 22 82)"/>
  <rect class="arm" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${le} transform="rotate(-28 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${le}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${le}/>
  <g class="dollhead">
  <circle class="dollhead" data-dollhead="1" cx="50" cy="44" r="30" fill="${e.skin}" ${le}/>
  ${ea(e.hairStyle,e.hair,!1)}
  ${s}
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${le} fill="none"/>
  ${If(e.acc??0,e.shirt)}
  </g>
  <circle class="hand" cx="22" cy="96" r="6" fill="${e.skin}" ${le}/><circle class="hand" cx="78" cy="96" r="6" fill="${e.skin}" ${le}/>`;return`<svg data-pose="${t}" viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${o}</svg>`}const E$=[{id:"hair",name:"Hair"},{id:"face",name:"Face"},{id:"clothes",name:"Clothes"},{id:"shoes",name:"Shoes"},{id:"extras",name:"Extras"}],Q$={short:"Short",pixie:"Pixie",coily:"Coily",afro:"Afro",bangs:"Bangs",bob:"Bob",wavybob:"Wavy bob",curlybob:"Curly bob",sidebangs:"Side bangs",long:"Long",wavy:"Wavy",braids:"Braids",boxbraids:"Box braids",locs:"Locs",sidebraid:"Side braid",crown:"Crown",pony:"Ponytail",sidepony:"Side pony",pigtails:"Pigtails",halfup:"Half-up",buns:"Buns",puffs:"Puffs",topbun:"Top bun",lowbun:"Low bun"},A$={classic:"Tee",stripes:"Stripes",hoodie:"Hoodie",sweater:"Sweater",tank:"Tank",puff:"Puff",ruffle:"Ruffle",button:"Buttons",jersey:"Jersey",cardigan:"Cardigan",bib:"Bib",raincoat:"Raincoat"},U$={pants:"Pants",jeans:"Jeans",shorts:"Shorts",skirt:"Skirt",tutu:"Tutu",leggings:"Leggings",overalls:"Overalls",joggers:"Joggers"},z$={"":"No dress",twirl:"Twirl",sundress:"Sundress",party:"Party",pinafore:"Pinafore",jumper:"Jumper",ballet:"Ballet",nightgown:"Nightgown",raindress:"Rain"},D$={classic:"Classic",sneakers:"Sneakers",lightup:"Light-up",boots:"Boots",rainboots:"Rain boots",sandals:"Sandals",maryjanes:"Mary Janes",slippers:"Slippers"},q$={round:"Round",big:"Big",sleepy:"Sleepy",sparkle:"Sparkle",soft:"Soft",bright:"Bright"},Z$={glasses:"Glasses",square:"Square",sunnies:"Sunnies",bow:"Bow",bigbow:"Big bow",headband:"Headband",flower:"Flower",cap:"Cap",beanie:"Beanie",sunhat:"Sun hat",catears:"Cat ears",earmuffs:"Earmuffs"},I$={little:"Little",kid:"Kid",adult:"Grown-up"};let Ss="hair";function Xt(e,t,n,s){return`<button type="button" class="avOpt${s?" on":""}" data-act="${e}" data-v="${t}">${n}</button>`}function Si(e,t,n){return`<button type="button" class="avSw${n?" on":""}" style="background:${t}" data-act="${e}" data-v="${t}" aria-label="Color"></button>`}function Kn(e){return`<div class="avGrid">${e}</div>`}function io(e,t){return`<div class="avColors">${gt.map(n=>Si(e,n,n===t)).join("")}</div>`}function O$(e,t,n,s){const o=Ns(e.look2),i=e.id==="__me",a=Ss==="hair"?`<h3>Style</h3>${Kn(_a.map(c=>Xt("av-hair",c,Q$[c],o.hair===c)).join(""))}<h3>Color</h3><div class="avColors">${xa.map(c=>Si("av-hairC",c,o.hairC===c)).join("")}</div>`:Ss==="face"?`<h3>Skin</h3><div class="avColors">${$a.map(c=>Si("av-skin",c,o.skin===c)).join("")}</div><h3>Eyes</h3>${Kn(Ba.map(c=>Xt("av-eyes",c,q$[c],o.eyes===c)).join(""))}<h3>Eye color</h3><div class="avColors">${vl.map(c=>Si("av-eyeC",c,o.eyeC===c)).join("")}</div><div class="avToggles">${Xt("av-freckles",o.freckles?"0":"1","Freckles",o.freckles)}${Xt("av-blush",o.blush?"0":"1","Blush",o.blush)}</div>`:Ss==="clothes"?`<h3>Top</h3>${Kn(Ma.map(c=>Xt("av-top",c,A$[c],!o.dress&&o.top===c)).join(""))}${io("av-topC",o.topC)}<h3>Bottom</h3>${Kn(La.map(c=>Xt("av-bottom",c,U$[c],!o.dress&&o.bottom===c)).join(""))}${io("av-bottomC",o.bottomC)}<h3>Dress</h3>${Kn(Ca.map(c=>Xt("av-dress",c,z$[c],o.dress===c)).join(""))}${io("av-dressC",o.dressC)}`:Ss==="shoes"?`<h3>Shoes</h3>${Kn(Sa.map(c=>Xt("av-shoes",c,D$[c],o.shoes===c)).join(""))}${io("av-shoesC",o.shoesC)}`:`<h3>Extras</h3><p class="avHint">Pick up to two</p>${Kn(Ws.map(c=>Xt("av-acc",c,Z$[c],o.acc.indexOf(c)>=0)).join(""))}${io("av-accC",o.accC)}`,r=W$.map(c=>`<button type="button" class="avOpt sz${c===e.size?" on":""}" data-act="size" data-v="${c}">${I$[c]}</button>`).join(""),l=i?'<div class="meNote">This is you!</div>':`<button type="button" class="del${n?" sure":""}" data-act="delc">${s}<span>${n?"Tap again":""}</span></button>`;return`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${t}<div class="dress avLook"><div class="avStageWrap"><div class="avStage chibi-move">${tt(e)}</div>${l}<div class="avSizes">${r}</div></div><div class="avSide"><div class="avTabs">${E$.map(c=>`<button type="button" class="avTab${c.id===Ss?" on":""}" data-act="av-tab" data-v="${c.id}">${c.name}</button>`).join("")}</div><div class="avPane">${a}</div><div class="avBar"><button type="button" class="avSurprise" data-act="av-surprise">🎲 Surprise me</button><button type="button" class="avDone" data-act="close">Done</button></div></div></div>`}function N$(e,t,n){if(t==="av-tab")return(n==="hair"||n==="face"||n==="clothes"||n==="shoes"||n==="extras")&&(Ss=n),null;const s=Ns(e);if(t==="av-hair"&&_a.indexOf(n)>=0)return{...s,hair:n};if(t==="av-hairC")return{...s,hairC:n};if(t==="av-skin")return{...s,skin:n};if(t==="av-eyes"&&Ba.indexOf(n)>=0)return{...s,eyes:n};if(t==="av-eyeC")return{...s,eyeC:n};if(t==="av-freckles")return{...s,freckles:n==="1"};if(t==="av-blush")return{...s,blush:n==="1"};if(t==="av-top"&&Ma.indexOf(n)>=0)return{...s,top:n,dress:""};if(t==="av-topC")return{...s,topC:n};if(t==="av-bottom"&&La.indexOf(n)>=0)return{...s,bottom:n,dress:""};if(t==="av-bottomC")return{...s,bottomC:n};if(t==="av-dress"&&Ca.indexOf(n)>=0)return{...s,dress:n};if(t==="av-dressC")return{...s,dressC:n};if(t==="av-shoes"&&Sa.indexOf(n)>=0)return{...s,shoes:n};if(t==="av-shoesC")return{...s,shoesC:n};if(t==="av-accC")return{...s,accC:n};if(t==="av-acc"&&Ws.indexOf(n)>=0){const o=n,i=s.acc.slice(),a=i.indexOf(o);if(a>=0)i.splice(a,1);else{const r=qi(o),l=i.filter(c=>qi(c)!==r);return l.push(o),{...s,acc:l.slice(0,2)}}return{...s,acc:i}}return null}function F$(){try{return typeof navigator<"u"&&navigator.webdriver&&!window.__forceAvatarIntro?!1:localStorage.getItem(St("avatar-intro"))!=="1"}catch{return!1}}function j$(){try{localStorage.setItem(St("avatar-intro"),"1")}catch{}}const Bi="#5a3d5c";function mr(e,t,n,s,o){return`<path class="${e}" d="${t}" fill="none" stroke="${Bi}" stroke-width="${s}" stroke-linecap="round"/><path class="${e} cloth" d="${t}" fill="none" stroke="${n}" stroke-width="${o}" stroke-linecap="round"/>`}function V$(e){const t=Ns(e),n=t.skin,s=t.dress!=="",o=s||t.bottom==="skirt"||t.bottom==="tutu",i=o?n:t.bottomC,a=t.shoesC,r=s||t.bottom==="skirt"||t.bottom==="tutu";let l="";if(r){const g=s?t.dressC:t.bottomC;l+=`<path class="dress" d="M75 46 L89 46 L91 53 L73 53 Z" fill="${g}" stroke="${Bi}" stroke-width="1.1" stroke-linejoin="round"/>`}l+=mr("thigh","M76 44 Q83 48 88 54",i,6.2,4.8),l+=`<circle class="knee" cx="88" cy="56" r="2.3" fill="${i}" stroke="${Bi}" stroke-width="1.1"/>`;const c=t.shoes==="boots"||t.shoes==="rainboots";l+=mr("shin",c?"M88 58 Q90 64 91 68":"M88 58 Q90 65 91 70",o?n:i,5.8,4.4),!c&&(t.shoes==="sneakers"||t.shoes==="maryjanes"||t.shoes==="lightup")&&(l+=mr("shin","M90 66 Q90.6 68 91 70","#ffffff",5.4,4));const d=t.shoes==="sandals"?n:a,f=c?66:69;return l+=`<path class="shoe" d="M90 ${f} Q90 ${f-2} 94 ${f-2} Q99 ${f-2} 100 ${f+1} Q100 ${f+5} 95 ${f+5} Q90 ${f+5} 90 ${f+2} Z" fill="${d}" stroke="${Bi}" stroke-width="1.1" stroke-linejoin="round"/>`,t.shoes==="sandals"&&(l+=`<path d="M90 ${f+5} L100 ${f+5}" stroke="${a}" stroke-width="1.3" stroke-linecap="round"/>`,l+=`<path d="M93 ${f} L97 ${f+3}" stroke="${a}" stroke-width="1.1" stroke-linecap="round"/>`),`<svg class="rideleg" viewBox="0 0 160 130">${l}</svg>`}let Jt=null,Of=!0;const G$=e=>{Of=e};function oe(e,t,n="sine",s=0,o=.15){if(Of)try{Jt??=new(window.AudioContext||window.webkitAudioContext),Jt.state==="suspended"&&Jt.resume().catch(()=>{});const i=Jt.createOscillator(),a=Jt.createGain(),r=Jt.currentTime,l=Math.max(40,e*(.94+Math.random()*.12));i.type=n,i.frequency.setValueAtTime(l,r),s&&i.frequency.exponentialRampToValueAtTime(Math.max(40,l*s),r+t);const c=Math.min(.02,Math.max(.008,t*.22));if(a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(Math.max(2e-4,o),r+c),a.gain.exponentialRampToValueAtTime(.001,r+Math.max(t,c+.02)),n==="square"||n==="sawtooth"){const d=Jt.createBiquadFilter();d.type="lowpass",d.frequency.setValueAtTime(1400,r),d.Q.setValueAtTime(.7,r),i.connect(d).connect(a).connect(Jt.destination)}else i.connect(a).connect(Jt.destination);i.start(r),i.stop(r+t+.02)}catch{}}const B={pick:()=>oe(520,.12,"sine",1.6),drop:()=>{oe(380,.1,"triangle",.7),setTimeout(()=>oe(620,.08,"sine"),60)},pop:()=>oe(800,.15,"square",.3,.08),click:()=>oe(660,.07,"triangle"),swish:()=>oe(300,.25,"sine",2.5,.1),meow:()=>{oe(700,.12,"triangle",1.3,.1),setTimeout(()=>oe(900,.22,"triangle",.6,.1),110)},purr:()=>[0,90,180,270,360].forEach(e=>setTimeout(()=>oe(70,.09,"sawtooth",1,.05),e)),woof:()=>{oe(260,.09,"square",.6,.09),setTimeout(()=>oe(220,.12,"square",.5,.09),130)},spin:()=>oe(400,.35,"sine",2.2,.08),boing:()=>oe(200,.3,"sine",3,.1),splash:()=>[0,50,110].forEach((e,t)=>setTimeout(()=>oe(900-t*200,.12,"triangle",.4,.06),e)),moo:()=>{oe(160,.5,"sawtooth",.8,.07),setTimeout(()=>oe(140,.45,"sawtooth",.85,.06),380)},baa:()=>[0,90,180].forEach(e=>setTimeout(()=>oe(420,.1,"sawtooth",.95,.05),e)),bleat:()=>[0,70,140,210].forEach(e=>setTimeout(()=>oe(520,.07,"square",1.05,.04),e)),oink:()=>{oe(300,.12,"square",.6,.07),setTimeout(()=>oe(330,.12,"square",.55,.07),160)},peep:()=>[0,120,240].forEach((e,t)=>setTimeout(()=>oe(1800+t*150,.07,"sine",1.2,.08),e)),squeak:()=>oe(1400,.1,"sine",1.5,.08),neigh:()=>{oe(700,.5,"sawtooth",.6,.05),[0,60,120,180,240].forEach(e=>setTimeout(()=>oe(620-e,.06,"triangle",1,.04),300+e))},honk:()=>{oe(330,.18,"square",1,.07),setTimeout(()=>oe(330,.25,"square",1,.07),230)},munch:()=>[0,110,220,330].forEach(e=>setTimeout(()=>oe(180+Math.random()*60,.05,"square",.6,.05),e)),cluck:()=>[0,100,180].forEach((e,t)=>setTimeout(()=>oe(600+t*80,.06,"square",.8,.05),e)),plant:()=>{oe(260,.1,"triangle",.6),setTimeout(()=>oe(520,.1,"sine"),90)},water:()=>[0,60,120,180,240].forEach((e,t)=>setTimeout(()=>oe(1200-t*120,.08,"sine",.7,.05),e)),pickup:()=>[660,880,990].forEach((e,t)=>setTimeout(()=>oe(e,.1,"triangle"),t*60)),sparkle:()=>[880,1100,1320].forEach((e,t)=>setTimeout(()=>oe(e,.12),t*70))},Y$=/rug|lamp|light|plant|curtain|clock|window|lantern/;function K$(e){if(e.cat==="plants")return!0;const t=`${e.name} ${e.kind??""}`.toLowerCase();return Y$.test(t)}const Nf=new Set(["pack:ring-light","pack:desk-lamp"]);function Ff(e){const t=e.rooms??[];return t.includes("backyard")&&!t.includes("any")}function X$(e,t){if(t==="nursery"&&e.kind&&Nf.has(e.kind))return!1;if(t==="backyard")return Ff(e);if(t==="all"||!t)return!0;const n=e.rooms;return!n||n.length===0||n.includes(t)?!0:n.includes("any")?e.cat==="decor"||e.cat==="furniture"?K$(e):!0:!1}function J$(e,t,n,s,o){return e.secret&&!(o&&o.has(e.secret))||!s&&n==="backyard"&&!Ff(e)||n==="nursery"&&e.kind&&Nf.has(e.kind)?!1:t.startsWith("pack:")?e.pack===t.slice(5):e.cat!==t?!1:X$(e,s?"all":n)}function e3(e){const t=e.scale;let n=0;e.overflowR>1&&e.overflowL>1?n=-e.overflowL:e.overflowR>1?n=e.overflowR:e.overflowL>1&&(n=-e.overflowL);const s=e.cam+n/t,o=Math.max(0,Math.min(e.maxCam,s)),i=s-o,a=e.nudgeX&&Math.abs(i)>.5?e.kidX-i:e.kidX;return{cam:o,kidX:a}}function t3(e){const t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[1][0]).toUpperCase():"?"}function n3(e,t=3){const n=[...e].sort((r,l)=>r.x-l.x||r.id.localeCompare(l.id)),s=[],o=[],i=(r,l,c)=>s.some(d=>d.lane===c&&Math.abs(d.x-r)<(d.w+l)/2+8),a=[];for(const r of n){let l=-1;for(let c=0;c<t;c++)if(!i(r.x,r.w,c)){l=c;break}l<0?a.push(r):(s.push({x:r.x,w:r.w,lane:l}),o.push({id:r.id,lane:l,initials:!1}))}for(const r of a){const l=Math.min(r.w,44);let c=0;for(let d=0;d<t;d++)if(!i(r.x,l,d)){c=d;break}s.push({x:r.x,w:l,lane:c}),o.push({id:r.id,lane:c,initials:!0})}return o}let s3=0;function jf(e=document){const t=[...e.querySelectorAll(".nametag")].filter(o=>{const i=o.getBoundingClientRect();return i.width>2&&i.height>2});if(!t.length)return;const n=t.map(o=>{o.dataset.tagId||(o.dataset.tagId="tg"+(++s3).toString(36)),o.dataset.full||(o.dataset.full=(o.textContent||"").trim()),o.classList.contains("is-initials")||(o.dataset.fullW=String(o.getBoundingClientRect().width));const i=o.getBoundingClientRect(),a=Number(o.dataset.fullW)||i.width;return{id:o.dataset.tagId,x:i.left+i.width/2,w:a}}),s=new Map(n3(n).map(o=>[o.id,o]));for(const o of t){const i=s.get(o.dataset.tagId||"");if(!i)continue;const a=o.dataset.full||"",r=i.initials?t3(a):a;o.textContent!==r&&(o.textContent=r),o.classList.toggle("is-initials",i.initials),o.style.setProperty("--tag-lane",String(i.lane))}}function Za(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function o3(e){!e||Za()||(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),window.setTimeout(()=>e.classList.remove("wiggle"),480))}function i3(){document.addEventListener("pointerup",e=>{if(Za())return;const t=e.target?.closest("button");t&&(t.classList.remove("spring"),t.offsetWidth,t.classList.add("spring"))},!0)}const Vf="#5a3d5c",ot=`stroke="${Vf}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,a3={living:"#ff8fab",bedroom:"#c9a0dc",kitchen:"#8fd6a6",salon:"#f0a0d8",nursery:"#9ad7f5",bathroom:"#7ec8d6",backyard:"#80ed99"};function r3(e){const t=a3[e]??"#ffb3c6";return`<div class="sceneWin builtin-window" aria-hidden="true"><svg viewBox="0 0 160 180">
    <path d="M18 20 H142 V150 H18 Z" fill="#fff6ea" ${ot}/>
    <path d="M28 30 H132 V118 H28 Z" fill="#b9e3ff" ${ot}/>
    <path d="M80 30 V118 M28 74 H132" ${ot} stroke-width="3"/>
    <circle cx="48" cy="52" r="10" fill="#fff" opacity=".85"/>
    <ellipse cx="108" cy="48" rx="16" ry="8" fill="#fff" opacity=".8"/>
    <path d="M40 118 Q58 96 70 118 Q90 100 112 118" fill="#7dce8a" stroke="${Vf}" stroke-width="3"/>
    <rect x="96" y="86" width="8" height="32" rx="3" fill="#6b4a32" ${ot} stroke-width="2"/>
    <circle cx="100" cy="80" r="12" fill="#5cc985" ${ot} stroke-width="2"/>
    <path d="M8 16 Q6 80 16 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <path d="M152 16 Q154 80 144 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <rect x="46" y="146" width="68" height="12" rx="4" fill="#ffe7c2" ${ot}/>
  </svg></div>`}function l3(){return`<div class="sceneRug" aria-hidden="true"><svg viewBox="0 0 200 80">
    <ellipse cx="100" cy="48" rx="92" ry="24" fill="#ffc8dd" ${ot}/>
    <ellipse cx="100" cy="48" rx="64" ry="15" fill="#bde0fe" ${ot} stroke-width="3"/>
    <ellipse cx="100" cy="48" rx="28" ry="7" fill="#fff6ea"/>
  </svg></div>
  <div class="sceneLamp" aria-hidden="true"><svg viewBox="0 0 80 160">
    <path d="M18 52 L30 8 H50 L62 52 Z" fill="#ffd166" ${ot}/>
    <rect x="36" y="52" width="8" height="78" rx="4" fill="#c9a0dc" ${ot}/>
    <ellipse cx="40" cy="136" rx="26" ry="8" fill="#b388d6" ${ot}/>
    <circle cx="34" cy="28" r="4" fill="#fff" opacity=".8"/>
  </svg></div>
  <div class="scenePlant" aria-hidden="true"><svg viewBox="0 0 90 140">
    <path d="M45 128 C45 90 18 78 20 48 C40 58 44 80 45 128" fill="#5cc985" ${ot}/>
    <path d="M45 128 C45 92 74 70 78 40 C58 54 50 82 45 128" fill="#80ed99" ${ot}/>
    <path d="M45 128 C40 96 28 88 22 70" fill="none" stroke="#3d9a62" stroke-width="3"/>
    <path d="M30 132 H62 L56 118 H36 Z" fill="#e07a5f" ${ot}/>
    <ellipse cx="46" cy="126" rx="16" ry="5" fill="#c4634a"/>
  </svg></div>`}function c3(e,t){return t==="backyard"?[]:[{id:e("rug"),kind:"rug",x:1152,y:540,flip:!1,z:0,scale:1},{id:e("lamp"),kind:"lamp",x:804,y:470,flip:!1,z:0,scale:1},{id:e("plant"),kind:"plant",x:1584,y:480,flip:!1,z:0,scale:1}]}let Jn="",Gf=null;function d3(e){Gf=e,Jn=""}function f3(e,t,n){const s=Gf?.(t,n);if(s!=null){const r="custom|"+t;if(r===Jn&&e.childElementCount)return;Jn=r,e.innerHTML=s,e.dataset.room=t;return}if(t==="backyard"){const r="yard|"+t;if(r===Jn&&e.childElementCount)return;Jn=r,e.innerHTML="",e.dataset.room=t;return}const o=n.length===0,i=n.some(r=>/window|curtain/i.test(r.kind)),a=t+(o?"|e":"")+(i?"|w":"");a===Jn&&e.childElementCount||(Jn=a,e.innerHTML=(i?"":r3(t))+(o?l3():""),e.dataset.room=t)}const ve="#5a3d5c",L=(e=4)=>`stroke="${ve}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Ko=600,Rt=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],qt=(e,t,n=3)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${ve}"/><circle cx="${e+1}" cy="${t-1}" r="${n/3}" fill="#fff"/>`,is=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="5" ry="3" fill="#ff9bb5" opacity=".75"/>`,g3=(e,t,n,s)=>Rt.map((o,i)=>`<path d="M${e-n+i*s} ${t} A${n-i*s} ${n-i*s} 0 0 1 ${e+n-i*s} ${t}" fill="none" stroke="${o}" stroke-width="${s}"/>`).join(""),h3=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${L()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${L()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${L()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${L()}/></g>`,an=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-46" y="-50" width="92" height="50" rx="14" fill="#f5d27a" ${L()}/>
  <path d="M-30 -42 V-8 M0 -44 V-6 M30 -42 V-8" stroke="#d9a93f" stroke-width="4" stroke-linecap="round"/><path d="M-46 -26 H46" stroke="#c98a2e" stroke-width="5"/></g>`,p3=(e,t,n)=>{const s=Array.from({length:Math.floor((t-e)/70)+1},(o,i)=>`<rect x="${e+i*70-7}" y="${n-58}" width="14" height="64" rx="5" fill="#fff6e6" ${L(3)}/>`).join("");return`<rect x="${e}" y="${n-46}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${L(3)}/><rect x="${e}" y="${n-22}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${L(3)}/>${s}`};function u3(){const e=No;return`<svg class="parkScene ranchScene" viewBox="0 0 ${e} ${Ko}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="rcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7e8ff"/><stop offset="1" stop-color="#fff4fb"/></linearGradient></defs>
  <rect width="${e}" height="440" fill="url(#rcSky)"/>
  <g opacity=".55">${g3(1900,430,620,26)}</g>
  ${[160,820,1500,2300,3e3].map((t,n)=>`<g transform="translate(${t} ${70+n%2*34})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <g transform="translate(${e-200} 92)"><circle r="48" fill="#ffe066" ${L()}/>${qt(-15,-6,4)}${qt(13,-6,4)}<path d="M-14 12 Q0 24 14 12" fill="none" ${L(3)}/>${is(-26,8)}${is(26,8)}</g>
  <path d="M-50 370 Q600 230 1300 350 T2600 330 T${e+100} 360 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#a6e3a0"/><path d="M0 410 H${e}" ${L()}/>
  <path d="M0 566 Q900 530 1800 570 T${e} 552 V600 H0 Z" fill="#f2dcb8" opacity=".9"/>
  ${h3(3560,400,.8,"#4fbf7a")}
  <!-- entrance gate with a rainbow arch -->
  <g class="ranchSign"><g class="ranchSignArt"><rect x="40" y="290" width="24" height="210" rx="6" fill="#c99366" ${L()}/><rect x="196" y="290" width="24" height="210" rx="6" fill="#c99366" ${L()}/>
    <path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${ve}" stroke-width="44" stroke-linecap="round"/>
    ${Rt.map((t,n)=>`<path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${t}" stroke-width="${36-n*6}" stroke-linecap="round"/>`).join("")}
    <rect x="22" y="250" width="216" height="40" rx="14" fill="#fff6e6" ${L(3)}/><text x="130" y="277" text-anchor="middle" font-size="19" font-weight="900" fill="${ve}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  <!-- red barn with rainbow trim and banner -->
  <g transform="translate(270 0)">
    <path d="M0 470 V250 L60 180 H270 L330 250 V470 Z" fill="#ef5b5b" ${L(5)}/>
    <path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${ve}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    ${Rt.map((t,n)=>`<path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${t}" stroke-width="3" transform="translate(0 ${-7+n*2.8})" stroke-linejoin="round"/>`).join("")}
    <rect x="115" y="215" width="100" height="56" rx="10" fill="#fff6e6" ${L(4)}/><path d="M115 215 L215 271 M215 215 L115 271" stroke="#ef5b5b" stroke-width="6"/>
    <rect x="95" y="330" width="140" height="140" rx="8" fill="#fff6e6" ${L(4)}/><rect x="108" y="342" width="56" height="128" fill="#d94848" ${L(3)}/><rect x="166" y="342" width="56" height="128" fill="#d94848" ${L(3)}/>
    <path d="M108 342 L164 470 M164 342 L108 470 M166 342 L222 470 M222 342 L166 470" stroke="#fff6e6" stroke-width="6"/>
    <g class="barnBanner" transform="translate(165 300)"><g class="ranchSignArt">${Rt.map((t,n)=>`<rect x="${-120+n*40}" y="-16" width="40" height="30" fill="${t}"/>`).join("")}<rect x="-120" y="-16" width="240" height="30" fill="none" ${L(3)}/>
      <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${ve}" stroke-width="4" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  </g>
  ${an(640,560,.8)}${an(1950,470,.7)}${an(1880,470,.55)}${an(3115,470,.7)}${an(3115,425,.55)}
  <!-- the petting zoo moved into the barn: a sign by the barn door, sunflowers where the pen was -->
  ${Array.from({length:6},(t,n)=>{const s=1030+n*66,o=70+n%3*18;return`<g transform="translate(${s} 470)"><path d="M0 0 V-${o}" stroke="#40c057" stroke-width="6" stroke-linecap="round"/><ellipse cx="${n%2?9:-9}" cy="-${o/2}" rx="11" ry="5" fill="#69db7c" ${L(2.5)}/>${[0,45,90,135,180,225,270,315].map(i=>`<ellipse cx="${Math.cos(i*Math.PI/180)*14}" cy="${-o+Math.sin(i*Math.PI/180)*14}" rx="8" ry="5" transform="rotate(${i} ${Math.cos(i*Math.PI/180)*14} ${-o+Math.sin(i*Math.PI/180)*14})" fill="#ffd43b" ${L(2)}/>`).join("")}<circle cy="-${o}" r="10" fill="#a0522d" ${L(2.5)}/></g>`}).join("")}
  <!-- pond -->
  <ellipse cx="${Ge.x}" cy="${Ge.y}" rx="${Ge.rx}" ry="${Ge.ry}" fill="#8ecae6" ${L()}/><ellipse cx="${Ge.x-15}" cy="${Ge.y-6}" rx="70" ry="16" fill="#bde6f7"/>
  <!-- paddock fence + HORSES sign are their own depth layer (paddockFenceSVG) -->
  <!-- garden -->
  <rect x="3140" y="520" width="420" height="70" rx="20" fill="#b07d54" ${L()}/>
  <rect x="3260" y="430" width="160" height="40" rx="12" fill="#fff6e6" ${L(3)}/><text x="3340" y="458" text-anchor="middle" font-size="21" font-weight="900" fill="${ve}" font-family="Nunito, system-ui, sans-serif">GARDEN</text>
  <path d="M3340 470 V500" ${L(5)}/>
  </svg>`}function m3(){return`<svg class="fenceLayer" viewBox="0 0 ${No} ${Ko}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  ${p3(2400,3080,470)}
  <rect x="2640" y="380" width="180" height="40" rx="12" fill="#fff6e6" ${L(3)}/><text x="2730" y="408" text-anchor="middle" font-size="21" font-weight="900" fill="${ve}" font-family="Nunito, system-ui, sans-serif">HORSES</text>
  </svg>`}const Yf=[{name:"Goat",say:"Meh-eh-eh!",snd:"bleat"},{name:"Sheep",say:"Baa!",snd:"baa"},{name:"Piglet",say:"Oink oink!",snd:"oink"},{name:"Chicks",say:"Peep peep!",snd:"peep"},{name:"Bunny",say:"*wiggle wiggle*",snd:"squeak"},{name:"Cow",say:"Moooo!",snd:"moo"}],hi=(e,t,n,s=94)=>e.map((o,i)=>`<rect class="leg ${i%2?"b":"a"}" x="${o}" y="${t}" width="9" height="${s-t}" rx="4" fill="${n}" ${L(3)}/>`).join("");function Xr(e){switch(e){case 0:return`<svg viewBox="0 0 120 100">${hi([32,44,70,82],60,"#efe6dc")}<path class="tail" d="M24 50 l-8 -10" ${L(5)}/>
      <ellipse cx="58" cy="56" rx="34" ry="17" fill="#f4ede5" ${L()}/><g class="head"><path d="M86 30 l-6 -16 l10 10 Z M96 30 l2 -17 l5 13 Z" fill="#c9b8a8" ${L(3)}/>
      <ellipse cx="94" cy="40" rx="14" ry="16" fill="#f4ede5" ${L()}/><ellipse class="ear" cx="80" cy="36" rx="9" ry="4" fill="#e8d6c4" ${L(3)}/>${qt(98,36)}<path d="M98 56 q2 8 6 0" fill="#e8d6c4" ${L(3)}/>${is(102,46)}<circle cx="106" cy="44" r="2" fill="${ve}"/></g></svg>`;case 1:return`<svg viewBox="0 0 120 100">${hi([36,48,70,80],62,"#5a4a5c")}
      ${[[40,50],[56,44],[72,48],[86,56],[70,64],[48,64],[34,60]].map(([t,n])=>`<circle cx="${t}" cy="${n}" r="15" fill="#fff" ${L(3)}/>`).join("")}<ellipse cx="60" cy="55" rx="30" ry="14" fill="#fff"/>
      <g class="head"><ellipse cx="96" cy="46" rx="13" ry="15" fill="#6b5a6e" ${L()}/><circle cx="92" cy="32" r="8" fill="#fff" ${L(3)}/><ellipse class="ear" cx="82" cy="44" rx="8" ry="4" fill="#6b5a6e" ${L(3)}/>
      <circle cx="99" cy="42" r="3.2" fill="#fff"/><circle cx="99.5" cy="42" r="1.8" fill="${ve}"/>${is(102,52)}</g></svg>`;case 2:return`<svg viewBox="0 0 120 100">${hi([38,50,66,78],66,"#ffadc6")}<path class="tail" d="M28 54 q-10 -4 -6 -12 q6 0 2 8" fill="none" ${L(3)}/>
      <ellipse cx="58" cy="60" rx="32" ry="20" fill="#ffc2d4" ${L()}/><g class="head"><circle cx="90" cy="52" r="16" fill="#ffc2d4" ${L()}/><path d="M80 38 l2 -12 l9 8 Z" fill="#ffadc6" ${L(3)}/>
      <ellipse cx="104" cy="56" rx="7" ry="8" fill="#ff9bb8" ${L(3)}/><circle cx="102" cy="54" r="1.6" fill="${ve}"/><circle cx="106" cy="57" r="1.6" fill="${ve}"/>${qt(92,46)}${is(90,60)}</g></svg>`;case 3:return`<svg viewBox="0 0 120 100">${[[30,72,1],[62,66,1.15],[92,74,.95]].map(([t,n,s])=>`<g transform="translate(${t} ${n}) scale(${s})"><path d="M-4 16 v8 M4 16 v8" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="4" r="14" fill="#ffe066" ${L(3)}/><path d="M-8 2 q-6 4 0 8" fill="#ffd43b" ${L(2)}/><g class="head"><circle cx="5" cy="-8" r="9" fill="#ffe066" ${L(3)}/><path d="M13 -9 l7 2 l-7 3 Z" fill="#ff9f43" ${L(2)}/>${qt(7,-10,2.2)}</g></g>`).join("")}</svg>`;case 4:return`<svg viewBox="0 0 120 100"><circle class="tail" cx="30" cy="68" r="8" fill="#fff" ${L(3)}/><ellipse cx="56" cy="72" rx="28" ry="20" fill="#f6eef9" ${L()}/><ellipse cx="74" cy="90" rx="12" ry="5" fill="#f6eef9" ${L(3)}/>
      <g class="head"><ellipse class="ear" cx="78" cy="26" rx="7" ry="20" fill="#f6eef9" ${L(3)} transform="rotate(-12 78 26)"/><ellipse cx="78" cy="26" rx="3" ry="13" fill="#ffc2d4" transform="rotate(-12 78 26)"/>
      <ellipse cx="90" cy="28" rx="7" ry="20" fill="#f6eef9" ${L(3)} transform="rotate(10 90 28)"/><circle cx="86" cy="56" r="17" fill="#f6eef9" ${L()}/>${qt(92,52)}<circle cx="102" cy="58" r="2.5" fill="#ff8fab"/>${is(90,63)}</g></svg>`;default:return`<svg viewBox="0 0 120 100">${hi([30,42,72,84],62,"#fff")}<path class="tail" d="M20 50 q-6 14 0 26" fill="none" ${L(3)}/>
      <rect x="18" y="38" width="80" height="34" rx="16" fill="#fff" ${L()}/><path d="M30 40 q10 8 4 20 q-10 -2 -10 -14 Z M60 42 q14 2 10 18 q-12 4 -14 -8 Z" fill="${ve}"/><ellipse cx="60" cy="74" rx="8" ry="5" fill="#ffadc6" ${L(2)}/>
      <g class="head"><path d="M90 24 l-8 -8 M108 24 l8 -8" stroke="#f5d27a" stroke-width="5" stroke-linecap="round"/><rect x="86" y="22" width="26" height="30" rx="12" fill="#fff" ${L()}/>
      <ellipse cx="100" cy="52" rx="14" ry="10" fill="#ffc2d4" ${L(3)}/><circle cx="95" cy="52" r="1.8" fill="${ve}"/><circle cx="105" cy="52" r="1.8" fill="${ve}"/>${qt(94,34)}${qt(106,34)}
      <ellipse class="ear" cx="82" cy="30" rx="7" ry="4" fill="#fff" ${L(3)}/></g></svg>`}}const Ge={x:2265,y:520,rx:110,ry:34},y3=476,ta=[{name:"Chestnut",body:"#c97b45",mane:"#7a3f22",sock:"#fff6e6"},{name:"Snowy",body:"#fdf8f3",mane:"#d9cdc4",sock:"#e9ddd2"},{name:"Midnight",body:"#4a3f52",mane:"#2a2230",sock:"#6b5e74"},{name:"Sunny",body:"#f2c96b",mane:"#fff6e0",sock:"#fff6e0"},{name:"Rainbow Pony",body:"#fff0fa",mane:"rainbow",sock:"#ffd6ec"}];function Zl(e,t=!1){const n=ta[e]??ta[0],s=n.mane==="rainbow",o=s?Rt.map((r,l)=>{const c=124-l*1.6,d=14+l*2.4;return`<path d="M${c.toFixed(1)} ${d.toFixed(1)} q-6.5 2 -4.5 ${6+l*.35}" fill="none" stroke="${r}" stroke-width="5.5" stroke-linecap="round"/>`}).join(""):`<path d="M106 20 q-14 6 -18 30 q8 -6 10 -2 q4 -12 14 -18 Z" fill="${n.mane}" ${L(3)}/>`,i=s?`<g class="tail">${Rt.map((r,l)=>`<path d="M30 58 q-18 ${8+l*3} -14 ${36+l}" fill="none" stroke="${r}" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`:`<path class="tail" d="M30 56 q-20 10 -14 44 q10 -10 8 -20 q6 -10 10 -18 Z" fill="${n.mane}" ${L(3)}/>`,a=(r,l)=>`<g class="leg ${l}"><rect x="${r}" y="78" width="12" height="44" rx="5" fill="${n.body}" ${L(3)}/><rect x="${r}" y="110" width="12" height="12" rx="4" fill="${n.sock}" ${L(3)}/></g>`;return`<svg viewBox="0 0 160 130" class="horsesvg">${i}${a(40,"a")}${a(56,"b")}${a(96,"b")}${a(112,"a")}
    <ellipse cx="80" cy="68" rx="50" ry="24" fill="${n.body}" ${L()}/>
    ${t||s?`<path class="saddle" data-top="43" d="M64 46 q16 -6 32 0 l-2 22 q-14 4 -28 0 Z" fill="${s?"#b197fc":"#e8590c"}" ${L(3)}/>`:""}
    <g class="head"><path d="M108 66 L114 30 Q118 16 132 18 L148 36 Q152 46 142 48 L130 46 L128 70 Z" fill="${n.body}" ${L()}/>
    <path d="M114 22 l2 -14 l8 12 Z" fill="${n.body}" ${L(3)}/>${o}
    ${qt(130,30,3.4)}<circle cx="146" cy="42" r="2" fill="${ve}"/>${is(136,40)}
    ${s?`<path d="M120 14 l4 -14 l4 14 Z" fill="#ffd43b" ${L(2)}/>`:""}</g>
    ${s?'<g fill="#fff" opacity=".9"><path d="M60 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M92 74 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/></g>':""}</svg>`}const k3=`<svg viewBox="0 0 180 170"><path d="M10 70 L90 14 L170 70" fill="#ffa94d" ${L(5)}/>
  <rect x="24" y="66" width="132" height="84" rx="8" fill="#fff6e6" ${L()}/>${Rt.map((e,t)=>`<rect x="${24+t*22}" y="66" width="22" height="10" fill="${e}"/>`).join("")}
  <rect x="24" y="66" width="132" height="10" fill="none" ${L(3)}/><circle cx="90" cy="108" r="22" fill="#5a3d5c"/>
  <path d="M60 150 l-12 16 M120 150 l12 16" ${L(5)}/>
  <g class="hen"><ellipse cx="90" cy="118" rx="20" ry="14" fill="#fff" ${L(3)}/><circle cx="104" cy="104" r="10" fill="#fff" ${L(3)}/><path d="M100 94 q3 -8 8 0" fill="#ff6b6b" ${L(2)}/>
  <path d="M113 104 l7 2 -7 3 Z" fill="#ffa94d" ${L(2)}/>${qt(106,102,2)}</g>
  <text x="90" y="54" text-anchor="middle" font-size="16" font-weight="900" fill="${ve}" font-family="Nunito, system-ui, sans-serif">EGGS</text></svg>`,b3=`<svg viewBox="0 0 170 130"><rect x="80" y="30" width="54" height="50" rx="8" fill="#bde6f7" ${L()}/><rect x="74" y="24" width="66" height="10" rx="4" fill="#ff6b6b" ${L(3)}/>
  <rect x="20" y="62" width="130" height="34" rx="12" fill="#ff6b6b" ${L()}/><rect x="28" y="40" width="10" height="24" rx="3" fill="#868e96" ${L(3)}/>
  <circle cx="122" cy="98" r="28" fill="${ve}"/><circle cx="122" cy="98" r="13" fill="#ffd43b" ${L(3)}/><circle cx="44" cy="106" r="18" fill="${ve}"/><circle cx="44" cy="106" r="8" fill="#ffd43b" ${L(3)}/>
  <circle cx="26" cy="76" r="5" fill="#fff3b0" ${L(2)}/></svg>`,v3=`<svg viewBox="0 0 240 300"><rect x="104" y="160" width="32" height="140" rx="10" fill="#c99366" ${L()}/>
  <circle cx="120" cy="110" r="90" fill="#5cc985" ${L()}/><circle cx="62" cy="140" r="50" fill="#5cc985" ${L()}/><circle cx="180" cy="140" r="52" fill="#5cc985" ${L()}/>
  ${[[80,90],[150,70],[175,140],[100,150],[130,115],[60,140]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="11" fill="#ff6b6b" ${L(3)}/><path d="M${e} ${t-10} q2 -6 6 -7" fill="none" ${L(2)}/>`).join("")}</svg>`,gd=[[80,90],[150,70],[175,140],[100,150]],Kf=`<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="14" fill="#ff6b6b" ${L(3)}/><path d="M20 10 q2 -6 6 -7" fill="none" ${L(2.5)}/><ellipse cx="27" cy="8" rx="5" ry="3" fill="#5cc985" ${L(2)}/><circle cx="14" cy="18" r="3" fill="#fff" opacity=".6"/></svg>`,Ia=`<svg viewBox="0 0 40 40"><path d="M12 14 L32 10 L16 36 Z" fill="#ff922b" ${L(3)}/><path d="M18 18 l5 -1 M17 24 l4 -1" ${L(2)}/><path d="M30 10 q4 -8 8 -6 M30 10 q-2 -8 2 -10 M30 10 q6 -2 8 2" fill="none" stroke="#40c057" stroke-width="4" stroke-linecap="round"/></svg>`,w3=`<svg viewBox="0 0 40 40"><path d="M6 34 Q20 4 34 34 Z" fill="#f5d27a" ${L(3)}/><path d="M14 30 L18 14 M20 32 V10 M26 30 L22 14" stroke="#d9a93f" stroke-width="2.5" stroke-linecap="round"/></svg>`,Ao=`<svg viewBox="0 0 40 40"><path d="M20 4 C30 4 34 20 34 26 C34 34 28 38 20 38 C12 38 6 34 6 26 C6 20 10 4 20 4 Z" fill="#fff6e6" ${L(3)}/><circle cx="15" cy="16" r="3" fill="#fff"/></svg>`,Il=(e="#ff8fab")=>`<svg viewBox="0 0 40 40"><path d="M20 38 V20" stroke="#40c057" stroke-width="4" stroke-linecap="round"/>${[0,72,144,216,288].map(t=>`<circle cx="${20+Math.cos(t*Math.PI/180)*8}" cy="${14+Math.sin(t*Math.PI/180)*8}" r="7" fill="${e}" ${L(2.5)}/>`).join("")}<circle cx="20" cy="14" r="5" fill="#ffd43b" ${L(2)}/></svg>`,Xf={carrot:Ia,apple:Kf,hay:w3},$3=e=>`<svg viewBox="0 0 80 90"><g transform="translate(14 0) scale(1.3)">${Xf[e].replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g>
  <path d="M10 40 H70 L62 86 H18 Z" fill="${e==="carrot"?"#74c0fc":e==="apple"?"#ffa8c5":"#b2f2bb"}" ${L(4)}/><path d="M12 52 H68" stroke="#fff" stroke-width="4" opacity=".6"/></svg>`,x3=`<svg viewBox="0 0 60 50"><path d="M12 22 Q30 -6 48 22" fill="none" stroke="${ve}" stroke-width="7" stroke-linecap="round"/><path d="M12 22 Q30 -6 48 22" fill="none" stroke="#e0a96d" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 22 H56 L50 46 H10 Z" fill="#e0a96d" ${L(3.5)}/><path d="M12 30 H48 M14 38 H46" stroke="#b5793d" stroke-width="3"/></svg>`,hd=["#ff8fab","#c9a0dc","#ffd43b","#74c0fc","#ff922b"];function Jf(e,t,n){const s=`<ellipse cx="35" cy="76" rx="30" ry="11" fill="${e?.wet?"#7a4b2e":"#9c6b46"}" ${L(3)}/>`;if(!e)return`<svg viewBox="0 0 70 90">${s}<path d="M20 74 q4 -3 8 0 M36 78 q4 -3 8 0" stroke="#b5875f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;const o=hd[n%hd.length];let i="";t===0&&(i=`<circle cx="27" cy="72" r="3" fill="#f2dcb8" ${L(1.5)}/><circle cx="36" cy="75" r="3" fill="#f2dcb8" ${L(1.5)}/><circle cx="44" cy="71" r="3" fill="#f2dcb8" ${L(1.5)}/>`),t===1&&(i=`<path d="M35 72 V58" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="57" rx="7" ry="4" fill="#69db7c" ${L(2)}/><ellipse cx="41" cy="55" rx="7" ry="4" fill="#69db7c" ${L(2)}/>`),t===2&&(i=`<path d="M35 72 V40 M35 60 Q22 54 20 42 M35 56 Q48 50 50 38" stroke="#40c057" stroke-width="4" fill="none" stroke-linecap="round"/>${e.seed==="flower"?`<circle cx="35" cy="38" r="7" fill="#b2f2bb" ${L(2)}/>`:""}`),t===3&&(i=e.seed==="carrot"?`<path d="M26 74 L44 72 L35 86 Z" fill="#ff922b" ${L(2.5)}/><path d="M35 72 Q24 50 22 38 M35 72 Q36 48 36 34 M35 72 Q46 50 50 40" stroke="#40c057" stroke-width="5" fill="none" stroke-linecap="round"/>`:`<path d="M35 72 V34" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="54" rx="8" ry="4" fill="#69db7c" ${L(2)}/>${[0,72,144,216,288].map(l=>`<circle cx="${35+Math.cos(l*Math.PI/180)*10}" cy="${28+Math.sin(l*Math.PI/180)*10}" r="8" fill="${o}" ${L(2.5)}/>`).join("")}<circle cx="35" cy="28" r="6" fill="#ffd43b" ${L(2)}/>`);const a=e.wet?"":`<g class="needWater"><path d="M56 18 q6 10 0 14 q-6 -4 0 -14 Z" fill="#74c0fc" ${L(2)}/></g>`,r=t===3?`<g class="ready"><path d="M58 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffd43b" ${L(1.5)}/></g>`:"";return`<svg viewBox="0 0 70 90">${s}${i}${a}${r}</svg>`}const _3=`<svg viewBox="0 0 48 48">${Rt.map((e,t)=>`<path d="M${6+t*2.6} 38 A${18-t*2.6} ${18-t*2.6} 0 0 1 ${42-t*2.6} 38" fill="none" stroke="${e}" stroke-width="3"/>`).join("")}<path d="M4 38 H44" ${L(3)}/></svg>`,M3=`<svg viewBox="0 0 48 48"><path d="M10 34 Q24 22 38 34" fill="none" ${L(4)}/><path d="M24 30 V8 M16 16 L24 8 L32 16" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40 H40" ${L(4)}/></svg>`,L3=`<svg viewBox="0 0 200 320"><path d="M70 310 L84 120 H116 L130 310 Z" fill="#fff6e6" ${L(4)}/><path d="M78 200 H122 M74 260 H126" ${L(3)}/><rect x="88" y="262" width="24" height="48" rx="10" fill="#b197fc" ${L(3)}/>
  <path d="M78 124 L100 92 L122 124 Z" fill="#ff8fab" ${L(4)}/>
  <g class="sails" style="transform-origin:100px 110px">${[0,90,180,270].map(e=>`<g transform="rotate(${e} 100 110)"><path d="M100 110 L104 30 L126 30 L118 104 Z" fill="${["#ffd43b","#74c0fc","#ff8fab","#69db7c"][e/90]}" ${L(3)}/><path d="M108 40 H122 M107 58 H121 M106 76 H120" ${L(2)}/></g>`).join("")}<circle cx="100" cy="110" r="10" fill="#ffa94d" ${L(3)}/></g></svg>`,C3=["GOAT","SHEEP","PIGLET","CHICKS","BUNNY","COW"],S3=e=>`<g class="lantern" style="transform-origin:${e}px 146px"><path d="M${e} 146 V178" ${L(3)}/><circle cx="${e}" cy="204" r="34" fill="#fff3b0" opacity=".45"/>
  <path d="M${e-14} 182 H${e+14} L${e+11} 226 H${e-11} Z" fill="#ffe066" ${L(3)}/><rect x="${e-17}" y="176" width="34" height="8" rx="3" fill="#495057" ${L(2.5)}/><rect x="${e-15}" y="224" width="30" height="7" rx="3" fill="#495057" ${L(2.5)}/><ellipse cx="${e}" cy="205" rx="5" ry="9" fill="#ff922b"/></g>`;function B3(){const e=wl,t=Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64} 146 V440" stroke="#d4895f" stroke-width="3"/>`).join(""),n=Array.from({length:Math.ceil(e/46)},(o,i)=>{const a=i*46,r=160+Math.sin(i/3.1)*8;return`<path d="M${a} ${r} L${a+40} ${r} L${a+20} ${r+30} Z" fill="${Rt[i%6]}" ${L(2.5)}/>`}).join(""),s=$l.map((o,i)=>`<g><rect x="${o-96}" y="318" width="192" height="122" rx="6" fill="#f0c49a" ${L(4)}/>
    <path d="M${o-96} 350 H${o+96} M${o-96} 384 H${o+96} M${o-96} 412 H${o+96}" stroke="#d9a074" stroke-width="3"/><path d="M${o-96} 318 L${o+96} 440 M${o+96} 318 L${o-96} 440" stroke="#e0aa7e" stroke-width="7" opacity=".7"/>
    <rect x="${o-54}" y="284" width="108" height="30" rx="10" fill="#fff6e6" ${L(3)}/><text x="${o}" y="305" text-anchor="middle" font-size="17" font-weight="900" fill="${ve}" font-family="Nunito, system-ui, sans-serif">${C3[i]}</text></g>`).join("");return`<svg class="parkScene ranchScene barnScene" viewBox="0 0 ${e} ${Ko}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="440" fill="#e8a87c"/>${t}
  <!-- hay loft -->
  <rect width="${e}" height="128" fill="#c98a5e"/>${Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64+32} 0 V128" stroke="#b5764d" stroke-width="3"/>`).join("")}
  ${[120,260,420,980,1130,1290,1640,1790].map((o,i)=>an(o,126,i%3===1?.72:.85)).join("")}${[190,1060,1720].map(o=>an(o,82,.7)).join("")}
  <rect x="0" y="126" width="${e}" height="24" fill="#a8653a" ${L(4)}/>
  ${[0,1,2,3,4,5,6].map(o=>`<path d="M${120+o*280} 150 L${180+o*280} 210" stroke="#a8653a" stroke-width="12" stroke-linecap="round"/><path d="M${120+o*280} 150 L${180+o*280} 210" ${L(2)}/>`).join("")}
  <!-- ladder up to the loft -->
  <g transform="translate(1840 0)"><path d="M-22 150 L-30 440 M22 150 L30 440" stroke="#c99366" stroke-width="10" stroke-linecap="round"/>${[190,240,290,340,390].map(o=>`<path d="M${-22-(o-150)*.028} ${o} H${22+(o-150)*.028}" stroke="#c99366" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
  <!-- rainbow bunting + big rainbow banner -->
  <path d="M0 160 Q${e/2} 176 ${e} 160" fill="none" ${L(2)}/>${n}
  <g transform="translate(${e/2+60} 236)">${Rt.map((o,i)=>`<rect x="${-180+i*60}" y="-26" width="60" height="44" fill="${o}"/>`).join("")}<rect x="-180" y="-26" width="360" height="44" rx="4" fill="none" ${L(4)}/>
    <path d="M-180 -26 L-200 -4 L-180 18 M180 -26 L200 -4 L180 18" fill="#ff8fab" ${L(3)}/>
    <text x="0" y="6" text-anchor="middle" font-size="26" font-weight="900" fill="#fff" stroke="${ve}" stroke-width="5" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  <!-- round windows with daylight -->
  ${[440,1720].map(o=>`<circle cx="${o}" cy="236" r="34" fill="#c7e8ff" ${L(4)}/><path d="M${o-34} 236 H${o+34} M${o} 202 V270" ${L(3)}/>`).join("")}
  ${s}
  <!-- the big door (back outside) -->
  <rect x="24" y="200" width="206" height="244" rx="10" fill="#b5703f" ${L(4)}/>
  <rect x="38" y="214" width="178" height="230" fill="#c7e8ff"/><path d="M38 360 Q120 330 216 352 V444 H38 Z" fill="#a6e3a0"/><circle cx="180" cy="250" r="16" fill="#ffe066"/>
  <path d="M38 214 H216 V444 M38 214 V444" fill="none" ${L(4)}/>
  <!-- straw floor -->
  <rect x="0" y="438" width="${e}" height="162" fill="#f2d58a"/><path d="M0 440 H${e}" ${L(4)}/>
  ${Array.from({length:70},(o,i)=>{const a=i*137%e,r=470+i*53%120;return`<path d="M${a} ${r} l${14+i%3*4} ${i%2?-4:4}" stroke="#d9a93f" stroke-width="3" stroke-linecap="round"/>`}).join("")}
  <!-- feed station -->
  <g transform="translate(356 0)"><rect x="-70" y="456" width="140" height="34" rx="12" fill="#fff6e6" ${L(3)}/><text x="0" y="480" text-anchor="middle" font-size="16" font-weight="900" fill="${ve}" font-family="Nunito, system-ui, sans-serif">FOOD 🥕🍎🌾</text></g>
  ${an(1790,590,.8)}${an(1700,600,.65)}
  ${[290,660,1330,1590].map(S3).join("")}
  </svg>`}const na=600,wt="#5a3d5c",V=(e=4)=>`stroke="${wt}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function Xo(e){const t=Wo[e].seats,n=t<=2?140:t===4?110:100,s=(t-1)/2;return Array.from({length:t},(o,i)=>({x:Wo[e].x+(i-s)*n,y:558-Math.abs(i-s)*8}))}const pd=["#ff7eb3","#ffd43b","#66d9e8","#d0bfff","#fff"],Ut=(e,t,n=1,s="#fff")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -9 L2.2 -2.4 L9 -2.2 L3.4 2.2 L5.4 9 L0 4.6 L-5.4 9 L-3.4 2.2 L-9 -2.2 L-2.2 -2.4 Z" fill="${s}" stroke="${wt}" stroke-width="1.2" stroke-linejoin="round"/>`;function ud(e,t,n,s){const o=`<path d="M36 ${t} Q ${e/2} ${t+n+8} ${e-36} ${t}" fill="none" stroke="${wt}" stroke-width="3"/>`,i=Array.from({length:s},(a,r)=>{const l=s===1?.5:r/(s-1),c=48+l*(e-96),d=t+Math.sin(l*Math.PI)*n,f=pd[r%pd.length];return`<g class="bulb" style="animation-delay:-${r%8*.22}s"><line x1="${c}" y1="${d-16}" x2="${c}" y2="${d-6}" stroke="${wt}" stroke-width="2"/><circle cx="${c}" cy="${d}" r="7.5" fill="${f}" ${V(2)}/><circle cx="${c-2}" cy="${d-2}" r="2.2" fill="#fff" opacity=".85"/></g>`}).join("");return o+i}const ao=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">
  <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".12"/>
  <path d="M-40 10 Q-48 -22 -10 -28 Q10 -46 34 -18 Q50 2 34 18 Q8 32 -24 20 Q-42 16 -40 10 Z" fill="${n}" ${V(3)}/>
  <path d="M-18 -6 Q-4 -20 14 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <circle cx="16" cy="6" r="4" fill="#fff" opacity=".35"/>
</g>`,md=(e,t,n)=>`<g transform="translate(${e} ${t})">
  <ellipse cx="0" cy="16" rx="28" ry="9" fill="#000" opacity=".12"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="${n}" ${V(3)}/>
  <ellipse cx="-6" cy="-2" rx="12" ry="7" fill="#fff" opacity=".35"/>
  <path d="M0 -16 V-28" ${V(3)}/><circle cy="-32" r="6" fill="#ffd43b" ${V(2)}/>
</g>`;function ro(e,t,n,s,o,i=""){return`<g class="photoFrame${i}" transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-40" y="-52" width="80" height="104" rx="6" fill="#fff" ${V(3.5)}/>
    <rect x="-32" y="-44" width="64" height="72" rx="4" fill="${s}"/>
    ${o}
    <rect x="-10" y="-58" width="20" height="10" rx="2" fill="#ffe8a3" opacity=".85" transform="rotate(-8)"/>
  </g>`}function pi(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-28" y="-34" width="56" height="68" rx="3" fill="#fff" ${V(3)}/>
    <rect x="-22" y="-28" width="44" height="40" fill="${s}"/>
    ${o}
  </g>`}function ui(e,t,n,s){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="36" rx="26" ry="8" fill="#000" opacity=".12"/>
    <path d="M-18 36 L-12 -2 H12 L18 36 Z" fill="${n}" ${V(3)}/>
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c9a27a" ${V(2)}/>
    <ellipse cx="-16" cy="-16" rx="16" ry="22" fill="${s}" ${V(3)} transform="rotate(-18)"/>
    <ellipse cx="16" cy="-18" rx="16" ry="22" fill="${s}" ${V(3)} transform="rotate(16)"/>
    <ellipse cx="0" cy="-28" rx="14" ry="20" fill="${s}" ${V(3)}/>
    <circle cx="0" cy="-36" r="6" fill="#ff8ec8" ${V(2)}/>
  </g>`}function H3(e,t){return`<g transform="translate(${e} ${t})">
    <ellipse cx="28" cy="118" rx="32" ry="8" fill="#000" opacity=".12"/>
    <rect width="56" height="118" rx="10" fill="#e7fbff" ${V()}/>
    <rect y="52" width="56" height="8" fill="#d0f4ff" ${V(2)}/>
    <rect x="44" y="18" width="6" height="22" rx="3" fill="#ffd43b" ${V(2)}/>
    <rect x="44" y="70" width="6" height="28" rx="3" fill="#ffd43b" ${V(2)}/>
    <rect x="8" y="12" width="28" height="22" rx="4" fill="#fff" ${V(2)}/>
    <circle cx="16" cy="22" r="4" fill="#ff8ec8"/><circle cx="28" cy="24" r="3" fill="#ffd43b"/>
    <path d="M18 78 C14 72 8 74 12 82 C15 88 18 90 18 90 C18 90 21 88 24 82 C28 74 22 72 18 78 Z" fill="#ff4d94" ${V(1.5)}/>
  </g>`}function P3(e,t,n){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="6" rx="34" ry="9" fill="#000" opacity=".1"/>
    <path d="M-46 -16 C-50 -86 -26 -108 0 -110 C26 -108 50 -86 46 -16 Z" fill="#fff6fb" ${V()}/>
    <path d="M-32 -20 C-34 -74 -16 -90 0 -92 C16 -90 34 -74 32 -20 Z" fill="${n}"/>
    <ellipse cx="0" cy="-10" rx="40" ry="16" fill="${n}" ${V()}/>
    <ellipse cx="-8" cy="-16" rx="14" ry="6" fill="#fff" opacity=".4"/>
    <path d="M-22 -2 L-26 16 M22 -2 L26 16" fill="none" stroke="${wt}" stroke-width="4" stroke-linecap="round"/>
  </g>`}function T3(e){const t=Wo[e],n=t.game==="four"?"Four":"Slay",s=t.game==="four"?"#7ad7ea":e===0?"#ff8ec8":"#e0b0ff",o=t.game==="four"?"#b8f2ff":e===0?"#ffd0e6":"#ead9ff",i=t.seats>=6?250:t.seats>=4?200:150;return`${Xo(e).map(r=>P3(r.x,r.y,o)).join("")}
  <g transform="translate(${t.x} 500)">
    <ellipse cx="0" cy="28" rx="${i+18}" ry="20" fill="#000" opacity=".1"/>
    <rect x="-18" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${V(3)}/>
    <rect x="4" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${V(3)}/>
    <ellipse cx="0" cy="-4" rx="${i}" ry="30" fill="${s}" stroke="#ffd43b" stroke-width="6"/>
    <ellipse cx="0" cy="-4" rx="${i-16}" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <ellipse cx="${-i*.25}" cy="-12" rx="${i*.35}" ry="8" fill="#fff" opacity=".28"/>
    <text x="0" y="4" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="${wt}" stroke-width="4" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${n}</text>
  </g>`}const lo=(e,t,n=1,s="#ff4d94")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 4 C-6 -4 -14 -2 -10 6 C-7 12 0 16 0 16 C0 16 7 12 10 6 C14 -2 6 -4 0 4 Z" fill="${s}" stroke="${wt}" stroke-width="1.6" stroke-linejoin="round"/>`;function W3(){const e=Ra,t=[[120,200],[260,250],[640,210],[900,250],[1180,190],[1560,230],[1860,180],[2100,240],[2420,200],[2520,280]];return`<svg class="grScene" viewBox="0 0 ${e} ${na}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="${e}" height="${na}" fill="url(#grWall)"/>
  <rect y="390" width="${e}" height="80" fill="#fff6fb" opacity=".45"/>
  ${Array.from({length:8},(n,s)=>`<rect x="${40+s*330}" y="400" width="280" height="62" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`).join("")}
  <rect y="468" width="${e}" height="132" fill="url(#grFloor)"/>
  <rect y="464" width="${e}" height="12" fill="#ffd43b" ${V(3)}/>
  ${[720,1500,2150].map((n,s)=>`<ellipse cx="${n}" cy="548" rx="${s===1?210:280}" ry="42" fill="${s===1?"#d8f6ff":s===0?"#ffe0f0":"#f3e8ff"}" stroke="#fff" stroke-width="4" opacity=".8"/>`).join("")}
  ${ud(e,28,22,28)}
  ${ud(e,78,16,18)}
  ${t.map(([n,s],o)=>Ut(n,s,.7+o%3*.28,o%2?"#fff":"#ffd43b")).join("")}

  <g transform="translate(1180 70)">
    <rect x="20" y="20" width="220" height="150" rx="16" fill="url(#grSky)" ${V()}/>
    <path d="M20 70 H240 M130 20 V170" ${V(3)}/>
    <circle cx="78" cy="48" r="14" fill="#ffd43b" ${V(2)}/>
    <path d="M8 36 Q20 90 8 150" fill="#ff8ec8" ${V(3)}/><path d="M252 36 Q240 90 252 150" fill="#d0bfff" ${V(3)}/>
  </g>

  <g class="neonSign" transform="translate(560 168)">
    <g class="neonSignArt">
    <rect x="-228" y="-58" width="456" height="108" rx="28" fill="#2b1430" ${V(5)}/>
    <rect class="neonRing" x="-214" y="-44" width="428" height="80" rx="22" fill="none" stroke="#ff4d94" stroke-width="4"/>
    <path d="M-150 8 C-162 -14 -186 -8 -174 12 C-166 26 -150 36 -150 36 C-150 36 -134 26 -126 12 C-114 -8 -138 -14 -150 8 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="2"/>
    <text x="6" y="16" text-anchor="middle" font-size="40" font-weight="900" fill="#ff7eb3" stroke="#fff6fb" stroke-width="2" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY CLUB</text>
    </g>
  </g>

  ${ro(500,340,-6,"#ffe0f0",`${lo(0,8,1.4)}${Ut(-18,-16,.7,"#ffd43b")}${Ut(18,-10,.55,"#66d9e8")}`," frameAtHead")}
  ${ro(424,186,-8,"#ffe0f0",`${lo(0,8,1.4)}${Ut(-18,-16,.7,"#ffd43b")}${Ut(18,-10,.55,"#66d9e8")}`," framePhone")}
  ${ro(980,240,5,"#e7fbff",`<ellipse cx="0" cy="6" rx="16" ry="12" fill="#fff" ${V(2)}/><path d="M-6 6 Q0 -8 6 6" fill="none" stroke="${wt}" stroke-width="2"/><path d="M0 18 V28 M-12 24 H12" ${V(2)}/>`)}
  ${ro(1680,255,-4,"#fff3c4",`${Ut(0,2,1.5,"#ffd43b")}`)}
  ${ro(2360,245,6,"#f3e8ff",`${lo(0,4,1.3,"#d0bfff")}`)}
  ${pi(400,300,8,"#fff0f6",lo(0,-4,1.1))}
  ${pi(820,310,-7,"#e7fbff",Ut(0,-6,1,"#66d9e8"))}
  ${pi(1900,300,9,"#fff6e6",Ut(0,-6,1,"#ffd43b"))}
  ${pi(2280,320,-8,"#ffe0f0",lo(0,-4,1))}

  <g class="disco" transform="translate(1288 36)">
    <line y1="0" y2="22" stroke="${wt}" stroke-width="3"/>
    <circle cy="44" r="26" fill="url(#disco)" ${V(3)}/>
    <path d="M-14 36 L0 56 L14 36 M-8 48 H8" fill="none" stroke="#fff" stroke-width="2.5"/>
    ${Ut(-30,20,.45)}${Ut(32,28,.4,"#ffd43b")}
  </g>

  <g transform="translate(86 292)">
    <rect width="78" height="168" rx="12" fill="#ff8ec8" ${V()}/>
    <rect x="8" y="10" width="62" height="36" rx="8" fill="#fff6e6" ${V(2)}/>
    <text x="39" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="${wt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
    <circle cx="62" cy="96" r="5" fill="#ffd43b" ${V(2)}/>
    <rect x="22" y="118" width="34" height="8" rx="3" fill="#fff" opacity=".45"/>
  </g>

  ${ui(40,400,"#ffd43b","#8ce99a")}
  ${ui(1080,392,"#ff8ec8","#69db7c")}
  ${ui(1600,400,"#d0bfff","#8ce99a")}
  ${ui(2520,396,"#66d9e8","#69db7c")}
  ${H3(200,348)}
  <g transform="translate(2420 360)">
    <rect width="130" height="100" rx="14" fill="#fff6fb" ${V()}/>
    <rect y="28" width="130" height="10" fill="#ffd0e6" ${V(2)}/>
    <circle cx="28" cy="64" r="12" fill="#ffd43b" ${V(2)}/><circle cx="64" cy="66" r="10" fill="#ff8ec8" ${V(2)}/><rect x="86" y="52" width="28" height="22" rx="6" fill="#66d9e8" ${V(2)}/>
    <text x="65" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="${wt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">SNACKS</text>
  </g>

  ${ao(330,455,"#ff8ec8",1.05)}
  ${ao(1120,468,"#d0bfff")}
  ${ao(1360,470,"#8ce4f2",.9)}
  ${ao(1780,462,"#ffd43b")}
  ${md(1480,500,"#ffb3d9")}
  ${md(2e3,505,"#c9b3ff")}
  ${ao(2550,468,"#ff8ec8",.85)}

  ${Wo.map((n,s)=>T3(s)).join("")}
  </svg>`}const R3=`<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${wt}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`,Q="#5a3d5c",E3=`<svg viewBox="0 0 120 100"><rect x="0" y="62" width="120" height="38" rx="14" fill="#9fe0aa" stroke="${Q}" stroke-width="3"/>
  <path d="M18 70 L30 22 L42 70 M78 70 L90 22 L102 70" fill="none" stroke="#8ecae6" stroke-width="5" stroke-linecap="round"/><path d="M26 22 H94" stroke="#ff8fab" stroke-width="7" stroke-linecap="round"/>
  <path d="M50 22 V54 M66 22 V54" stroke="${Q}" stroke-width="2.5"/><rect x="45" y="52" width="26" height="7" rx="3" fill="#ff9f68" stroke="${Q}" stroke-width="2.5"/>
  <circle cx="104" cy="14" r="9" fill="#ffd166" stroke="${Q}" stroke-width="3"/></svg>`,eg=`<svg viewBox="0 0 120 100"><path d="M20 50 L60 16 L100 50" fill="#ff8fab" stroke="${Q}" stroke-width="4" stroke-linejoin="round"/><rect x="28" y="48" width="64" height="44" rx="6" fill="#fff6e6" stroke="${Q}" stroke-width="4"/>
  <rect x="52" y="64" width="16" height="28" rx="4" fill="#c9a0dc" stroke="${Q}" stroke-width="3"/><rect x="34" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${Q}" stroke-width="3"/><rect x="73" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${Q}" stroke-width="3"/></svg>`,Ol=`<svg viewBox="0 0 120 100"><path d="M40 18 L24 28 L14 46 L30 52 L34 44 V88 H86 V44 L90 52 L106 46 L96 28 L80 18 Q60 34 40 18 Z" fill="#8ecae6" stroke="${Q}" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="58" r="7" fill="#fff3b0" stroke="${Q}" stroke-width="3"/></svg>`,re=e=>`<div class="wnArt">${e}</div>`,tg=`<svg viewBox="0 0 120 100"><rect x="16" y="58" width="74" height="24" rx="10" fill="#fff" stroke="${Q}" stroke-width="4"/><circle cx="32" cy="70" r="7" fill="#ff8fab" stroke="${Q}" stroke-width="3"/><circle cx="52" cy="70" r="7" fill="#ffe066" stroke="${Q}" stroke-width="3"/><circle cx="72" cy="70" r="7" fill="#8ecae6" stroke="${Q}" stroke-width="3"/><path d="M86 46 l14 -16 8 8 -14 16z" fill="#ffd166" stroke="${Q}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="44" width="12" height="24" rx="4" fill="#c9a0dc" stroke="${Q}" stroke-width="3"/></svg>`,Q3=`<svg viewBox="0 0 120 100">${Rt.map((e,t)=>`<path d="M${12+t*6} 84 A${48-t*6} ${48-t*6} 0 0 1 ${108-t*6} 84" fill="none" stroke="${e}" stroke-width="6"/>`).join("")}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${Q}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${Q}" stroke-width="3"/></svg>`,A3=`<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${Ao.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g><g transform="translate(52 22) scale(1.4)">${Ao.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g></svg>`,Jr=(e,t,n,s)=>`<g transform="translate(${t} ${n}) scale(${s})">${e.replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"")}</g>`,U3=`<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${Q}" stroke-width="4"/>${Jr(bl(tt({skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6"})).replace('viewBox="14 2 72 74"','viewBox="0 0 100 160"'),26,12,.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`,z3=`<svg viewBox="0 0 120 100"><rect x="8" y="28" width="104" height="64" rx="16" fill="#fff0f6" stroke="${Q}" stroke-width="4"/><path d="M8 40 L60 12 L112 40" fill="#ff6b9a" stroke="${Q}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 58 C52 48 40 50 46 60 C50 68 60 74 60 74 C60 74 70 68 74 60 C80 50 68 48 60 58 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  ${[18,34,50,66,82,98].map((e,t)=>`<circle cx="${e}" cy="24" r="4" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" stroke="${Q}" stroke-width="1.5"/>`).join("")}</svg>`,D3=`<svg viewBox="0 0 120 100"><rect x="28" y="8" width="64" height="84" rx="12" fill="#fff" stroke="${Q}" stroke-width="4"/><rect x="28" y="8" width="64" height="84" rx="12" fill="none" stroke="#ff7eb3" stroke-width="6"/><path d="M48 36 L54 24 L60 34 L68 20 L76 34 L82 24 L88 36 Z" fill="#ffd43b" stroke="${Q}" stroke-width="2" stroke-linejoin="round"/><text x="60" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#ff4d94" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY</text></svg>`,q3=`<svg viewBox="0 0 120 100"><rect x="10" y="16" width="100" height="72" rx="14" fill="#fff6fb" stroke="${Q}" stroke-width="4"/>
  <path d="M36 58 C28 48 18 50 24 60 C28 68 36 74 36 74 C36 74 44 68 48 60 C54 50 44 48 36 58 Z" fill="#ff4d94" stroke="${Q}" stroke-width="2"/>
  <path d="M78 28 L82 40 H94 L84 48 L88 60 L78 52 L68 60 L72 48 L62 40 H74 Z" fill="#66d9e8" stroke="${Q}" stroke-width="2"/></svg>`,ng=`<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="22" rx="6" fill="#fff" stroke="${Q}" stroke-width="3"/><path d="M6 26 H42 M14 18 V40 M22 18 V40 M30 18 V40 M36 18 V40" stroke="${Q}" stroke-width="2.4"/><rect x="4" y="12" width="40" height="8" rx="4" fill="#9ad7f5" stroke="${Q}" stroke-width="3"/><ellipse cx="20" cy="32" rx="5" ry="3" fill="#ffe0ec"/><ellipse cx="30" cy="32" rx="5" ry="3" fill="#c9e7ff"/></svg>`,Z3=`<svg viewBox="0 0 120 100"><ellipse cx="60" cy="72" rx="50" ry="20" fill="#ffc2d4" stroke="${Q}" stroke-width="4"/><ellipse cx="60" cy="72" rx="32" ry="11" fill="#fff" stroke="${Q}" stroke-width="3"/><path d="M60 58 C50 46 36 48 42 60 C48 70 60 78 60 78 C60 78 72 70 78 60 C84 48 70 46 60 58 Z" fill="#ff4d94" stroke="${Q}" stroke-width="3"/><path d="M22 40 Q28 28 36 36" fill="none" stroke="#7dce8a" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="5" fill="#ffd166" stroke="${Q}" stroke-width="2"/></svg>`,I3=`<svg viewBox="0 0 120 100"><path d="M16 50 L60 14 L104 50" fill="#ff8fab" stroke="${Q}" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="48" width="68" height="40" rx="10" fill="#fff6ea" stroke="${Q}" stroke-width="4"/><path d="M42 88 V60 Q60 44 78 60 V88" fill="#ffe8c7" stroke="${Q}" stroke-width="3"/><circle cx="82" cy="64" r="7" fill="#bde0fe" stroke="${Q}" stroke-width="3"/><circle cx="80" cy="62" r="2" fill="#fff"/></svg>`,O3=`<svg viewBox="0 0 120 100"><rect x="28" y="38" width="64" height="42" rx="8" fill="#8ecae6" stroke="${Q}" stroke-width="4"/><path d="M28 44 L60 68 L92 44" fill="none" stroke="${Q}" stroke-width="4"/><path d="M76 30 V16" stroke="${Q}" stroke-width="4" stroke-linecap="round"/><path d="M76 16 H96 L90 23 L96 30 H76 Z" fill="#ff6b6b" stroke="${Q}" stroke-width="3"/></svg>`,N3=`<svg viewBox="0 0 120 100"><rect x="8" y="32" width="48" height="40" rx="14" fill="#fff3b0" stroke="${Q}" stroke-width="4"/><rect x="64" y="32" width="48" height="40" rx="14" fill="#fff" stroke="${Q}" stroke-width="4"/><path d="M26 44 L40 52 L26 60 Z" fill="${Q}"/><circle cx="88" cy="52" r="6" fill="#ff8fab" stroke="${Q}" stroke-width="3"/></svg>`,F3=`<svg viewBox="0 0 120 100"><rect x="16" y="18" width="36" height="58" rx="6" fill="#fff" stroke="${Q}" stroke-width="4"/><rect x="62" y="24" width="42" height="52" rx="6" fill="#e7f6ff" stroke="${Q}" stroke-width="4"/><circle cx="34" cy="66" r="2.4" fill="${Q}"/><circle cx="83" cy="66" r="2.4" fill="${Q}"/></svg>`,sg=`<svg viewBox="0 0 120 100"><rect x="28" y="16" width="64" height="72" rx="16" fill="#fff" stroke="${Q}" stroke-width="4"/><path d="M40 36 H80 M40 52 H80 M40 68 H80" fill="none" stroke="${Q}" stroke-width="5" stroke-linecap="round"/><circle cx="92" cy="24" r="12" fill="#ff6b9a" stroke="${Q}" stroke-width="3"/><text x="92" y="29" text-anchor="middle" font-size="14" font-weight="900" fill="#fff" font-family="Nunito, ui-rounded, system-ui, sans-serif">1</text></svg>`,j3=`<svg viewBox="0 0 120 100"><rect x="6" y="10" width="108" height="80" rx="18" fill="#2a2158" stroke="${Q}" stroke-width="4"/><circle cx="34" cy="42" r="14" fill="#ffd166" stroke="${Q}" stroke-width="3"/><path d="M78 28 a16 16 0 1 0 0 32 a12 12 0 1 1 0 -32z" fill="#fff6e4" stroke="${Q}" stroke-width="3"/><circle cx="92" cy="30" r="2" fill="#fff"/><circle cx="70" cy="24" r="1.6" fill="#fff"/><circle cx="100" cy="48" r="1.6" fill="#fff"/></svg>`,V3=`<svg viewBox="0 0 120 100"><circle cx="60" cy="52" r="34" fill="#fff6e4" stroke="${Q}" stroke-width="4"/><path d="M60 52 V32 M60 52 L76 60" stroke="${Q}" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="52" r="3" fill="${Q}"/><path d="M28 22 l4 6 M92 22 l-4 6" stroke="#ffb15c" stroke-width="4" stroke-linecap="round"/></svg>`,og=[{v:9,title:"Everything's tidied into the Menu!",lines:[{art:re(sg),text:"Everything's tidied into the <b>Menu</b>!"},{art:re(j3),text:"The world follows the <b>clock</b>: morning, day, golden evening, and night."},{art:re(V3),text:"Tap the <b>sun</b> and the <b>moon</b>. <b>Auto</b> follows the clock."}]},{v:8,title:"Make your look!",lines:[{art:re(O3),text:"Leave a <b>letter</b> in a friend's mailbox!"},{art:re(N3),text:"Tap <b>Play</b> or <b>Decorate</b>!"},{art:re(Ol),text:"<b>Make your look!</b> New hair, clothes, and colors."},{art:re(F3),text:"Update every iPad to see the <b>new outfits</b>!"}]},{v:7,title:"New Nursery!",lines:[{art:re(ng),text:"A new <b>Nursery</b> room, with a <b>crib</b> and a rocker!"},{art:re(Z3),text:"The <b>Cozy Cottage</b> furniture pack is in your drawer!"},{art:re(I3),text:"A <b>dog kennel</b> and a <b>cat tower</b> for your pets!"}]},{v:6,title:"The clubhouse is open!",lines:[{art:re(z3),text:"A glam <b>clubhouse</b> on the map!"},{art:re(D3),text:"Play <b>Slay</b> with friends at a table!"},{art:re(q3),text:"Line up <b>hearts</b> or <b>stars</b>!"}]},{v:5,title:"Your house looks even cozier!",lines:[{art:re(tg),text:"Wallpaper and floors show their <b>real patterns</b> when you paint!"},{art:re(Ds(0,"sit")),text:"Your cat is <b>big and cozy</b>, just like the toy cat."},{art:re(eg),text:"Tap <b>home</b> to come back from the map, the park, or the ranch."}]},{v:4,title:"A map of our neighborhood!",lines:[{art:re(kl),text:"Tap the <b>map</b> to go anywhere!"},{art:re(U3),text:"Tap a friend's face to <b>find her</b>."},{art:re(Xr(0)),text:"The petting zoo is inside the <b>barn</b> now!"}]},{v:3,title:"Rainbow Ranch is open!",lines:[{art:re(Q3),text:"Visit <b>Rainbow Ranch</b>!"},{art:re(Xr(1)),text:"Pet and feed animals at the <b>petting zoo</b>."},{art:re(`<svg viewBox="0 0 160 130">${Jr(Zl(4),0,0,1)}</svg>`),text:"Ride <b>horses</b> and the <b>rainbow pony</b>!"},{art:re(A3),text:"Collect <b>eggs</b> from the hens."},{art:re(`<svg viewBox="0 0 70 90">${Jr(Jf({seed:"carrot",wet:1},3,0),0,0,1)}</svg>`),text:"Grow carrots and flowers in the <b>garden</b>."}]},{v:2,title:"What's new!",lines:[{art:re(E3),text:"A new <b>park</b>! Swing, slide and splash with friends."},{art:re(Ds(3,"sit")),text:"Adopt a <b>cat</b>! She lives in your house."},{art:re(Eo(3,"stand")),text:"Adopt a <b>dog</b>! Take it to the park to play fetch."}]}],ig=og[0].v,ag={v:ig,title:"Welcome to your cozy house!",lines:[{art:re(eg),text:"Drag furniture into your rooms."},{art:re(Ol),text:"Dress up your friends."},{art:re(Ds(0,"sit")),text:"Tap the paw to adopt a pet!"}]},rg=St("cozy-whatsnew"),G3=1;function Y3(){try{const e=Number(localStorage.getItem(rg)),t=["cozy-house","cozy-house-v1","cozy-hood"].some(o=>localStorage.getItem(St(o))!==null);if(!e&&!t)return{kind:"welcome",entries:[ag]};const n=e||G3,s=og.filter(o=>o.v>n).slice(0,3);return s.length?{kind:"news",entries:s}:{kind:"none",entries:[]}}catch{return{kind:"none",entries:[]}}}function K3(){try{localStorage.setItem(rg,String(ig))}catch{}}function X3(e,t){const n=e==="welcome"?ag.title:t[0].title,s=t.flatMap(o=>o.lines).slice(0,5);return`<div class="wnBadge">${e==="welcome"?xf:t[0].v>=9?sg:t[0].v>=8?Ol:t[0].v>=7?ng:t[0].v>=6?R3:t[0].v>=5?tg:t[0].v>=4?kl:t[0].v>=3?_3:vu}</div>
    <h2 class="wnTitle">${n}</h2>
    <div class="wnList ${s.length>3?"many":""}">${s.map((o,i)=>`<div class="wnLine" style="animation-delay:${.15+i*.18}s">${o.art}<p>${o.text}</p></div>`).join("")}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`}const lg="cozy-sky",el={tint:"#fff6e4",body:"#ffe9f0",pageA:"#ffe0ec",pageB:"#e6ddff",spot:"#fff6fa",fieldA:"#c9f2c7",fieldB:"#8fd18a",win:"#a2d2ff",win2:"#b9e3ff",house:"#fff3b0",mapTint:"#ffffff"},yd={tint:"#e7b4cc",body:"#f6dce8",pageA:"#ffd0e6",pageB:"#e6d2f8",spot:"#fff0f6",fieldA:"#f6d0e2",fieldB:"#dcc8f0",win:"#f6c6de",win2:"#e4d0f8",house:"#ffe0ee",mapTint:"#f3c4dc"},kd={tint:"#ffb38a",body:"#ffe4dc",pageA:"#ffe0d6",pageB:"#f0d8ea",spot:"#fff6ee",fieldA:"#d4eec4",fieldB:"#a3cb8a",win:"#ffc48a",win2:"#ffd4b0",house:"#ffc56a",mapTint:"#ffb38a"},Bs={tint:"#2a2350",body:"#14182c",pageA:"#1c1748",pageB:"#101832",spot:"#2c2458",fieldA:"#1a2458",fieldB:"#0c1028",win:"#1a245c",win2:"#12183a",house:"#ffe9a0",mapTint:"#102044"},mi=[{m:0,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...Bs},{m:5*60,opacity:.7,map:.78,glow:.95,stars:.95,glass:1,phase:"night",...Bs},{m:5*60+35,opacity:.42,map:.34,glow:.55,stars:.42,glass:.8,phase:"dawn",...yd},{m:6*60+25,opacity:.14,map:.16,glow:.28,stars:.08,glass:.9,phase:"dawn",...yd},{m:7*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...el},{m:16*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...el},{m:17*60+5,opacity:.08,map:.1,glow:.4,stars:.02,glass:.55,phase:"golden",...kd},{m:18*60+10,opacity:.18,map:.2,glow:.62,stars:.06,glass:.82,phase:"golden",...kd},{m:19*60+5,opacity:.52,map:.68,glow:.9,stars:.55,glass:1,phase:"night",...Bs},{m:20*60+10,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...Bs},{m:24*60,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...Bs}],J3={phase:"day",opacity:0,map:0,glow:0,stars:0,glass:0,...el},e5={phase:"night",opacity:.7,map:.78,glow:1,stars:1,glass:1,...Bs};function bd(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function Bt(e,t,n){const s=bd(e),o=bd(t),i=a=>Math.round(s[a]+(o[a]-s[a])*n).toString(16).padStart(2,"0");return"#"+i(0)+i(1)+i(2)}const co=(e,t,n)=>e+(t-e)*n;function t5(e){const t=e.getHours()*60+e.getMinutes()+e.getSeconds()/60;let n=0;for(;n<mi.length-2&&t>=mi[n+1].m;)n++;const s=mi[n],o=mi[n+1],i=Math.max(1,o.m-s.m),a=Math.max(0,Math.min(1,(t-s.m)/i));return{phase:a<.5?s.phase:o.phase,opacity:co(s.opacity,o.opacity,a),map:co(s.map,o.map,a),glow:co(s.glow,o.glow,a),stars:co(s.stars,o.stars,a),glass:co(s.glass,o.glass,a),tint:Bt(s.tint,o.tint,a),body:Bt(s.body,o.body,a),pageA:Bt(s.pageA,o.pageA,a),pageB:Bt(s.pageB,o.pageB,a),spot:Bt(s.spot,o.spot,a),fieldA:Bt(s.fieldA,o.fieldA,a),fieldB:Bt(s.fieldB,o.fieldB,a),win:Bt(s.win,o.win,a),win2:Bt(s.win2,o.win2,a),house:Bt(s.house,o.house,a),mapTint:Bt(s.mapTint,o.mapTint,a)}}function vd(e,t){return t==="day"?J3:t==="night"?e5:t5(e)}function n5(e){return e==="day"||e==="night"||e==="auto"}function s5(e,t=!1){return t?!0:e==="lamp"||e==="window"||e==="stars"||e==="tv"||/lamp|light|lantern|candle|string-lights|night-light/i.test(e)}function wd(){try{if(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches)return!0}catch{}if(typeof navigator>"u")return!1;const e=navigator.hardwareConcurrency;if(typeof e=="number"&&e>0&&e<=2)return!0;const t=navigator.deviceMemory;return typeof t=="number"&&t>0&&t<=2}const $d={day:"night",night:"auto",auto:"day"},xd={day:"Day",night:"Night",auto:"Auto"},cg='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><g fill="none" stroke="#ffb15c" stroke-width="3" stroke-linecap="round"><path d="M24 7 V13 M24 35 V41 M7 24 H13 M35 24 H41 M12 12 L16 16 M32 32 L36 36 M36 12 L32 16 M16 32 L12 36"/></g></svg>',o5='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 8 a14 14 0 1 0 0 32 a11 11 0 1 1 0 -32z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="3"/><circle cx="14" cy="16" r="1.7" fill="#ffd166"/><circle cx="18" cy="28" r="1.2" fill="#fff"/><circle cx="11" cy="24" r="1" fill="#fff"/></svg>',i5='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="28" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M34 8 a9 9 0 1 0 0 18 a7 7 0 1 1 0 -18z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="14" cy="16" r="1.3" fill="#ffd166"/></svg>',a5={day:cg,night:o5,auto:i5},r5="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)";function l5(){if(document.getElementById("skyInk"))return;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.id="skyInk",e.setAttribute("aria-hidden","true"),e.setAttribute("width","0"),e.setAttribute("height","0"),e.style.cssText="position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none",e.innerHTML=`
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
  `,document.head.appendChild(t)}function c5(e){l5();const t=wd();let n=f5(),s=null,o=vd(new Date,n),i=0;e.innerHTML=`<button type="button" class="skyBtn" aria-label="Day. Tap for night.">${cg}</button>`;const a=e.querySelector("button"),r=h=>{o=h;const u=document.documentElement,b=Math.max(0,Math.min(1,h.glow));u.style.setProperty("--sky-opacity",h.opacity.toFixed(3)),u.style.setProperty("--sky-map-opacity",h.map.toFixed(3)),u.style.setProperty("--sky-glow",b.toFixed(3)),u.style.setProperty("--sky-stars",h.stars.toFixed(3)),u.style.setProperty("--sky-glass",h.glass.toFixed(3)),u.style.setProperty("--sky-tint",h.tint),u.style.setProperty("--sky-body",h.body),u.style.setProperty("--sky-page-a",h.pageA),u.style.setProperty("--sky-page-b",h.pageB),u.style.setProperty("--sky-spot",h.spot),u.style.setProperty("--sky-field-a",h.fieldA),u.style.setProperty("--sky-field-b",h.fieldB),u.style.setProperty("--sky-win",h.win),u.style.setProperty("--sky-win-2",h.win2),u.style.setProperty("--sky-house-win",h.house),u.style.setProperty("--sky-map-tint",h.mapTint),u.style.setProperty("--sky-glow-soft",`rgba(255, 186, 80, ${(b*.72).toFixed(3)})`),u.style.setProperty("--sky-glow-hot",`rgba(255, 220, 120, ${(b*.96).toFixed(3)})`),u.style.setProperty("--sky-glow-clear","rgba(255, 186, 80, 0)"),u.style.setProperty("--sky-glow-wash",`rgba(255, 170, 70, ${(b*.55).toFixed(3)})`),u.style.setProperty("--sky-glow-map",`rgba(255, 196, 110, ${(b*.7).toFixed(3)})`);const _=h.phase==="golden"?.24:h.phase==="dawn"?.22:0,m=h.phase==="golden"?"186, 110, 52":"140, 62, 18";u.style.setProperty("--sky-shadow",`rgba(${m}, ${_.toFixed(3)})`);const p=h.phase==="night"?.55:h.phase==="golden"?.08:h.phase==="dawn"?.16:0;u.style.setProperty("--sky-vig",`rgba(12, 10, 32, ${p.toFixed(3)})`);const v=h.phase==="golden"?"255, 196, 80":h.phase==="dawn"?"255, 214, 230":"255, 246, 214";u.style.setProperty("--sky-orb",`rgba(${v}, ${Math.min(1,h.glass).toFixed(3)})`),u.dataset.sky=h.phase,u.dataset.skyChoice=n,u.classList.toggle("sky-static",t),u.classList.toggle("sky-live",!t),a.innerHTML=a5[n],a.setAttribute("aria-label",`${xd[n]}. Tap for ${xd[$d[n]].toLowerCase()}.`)},l=()=>vd(s??new Date,n),c=()=>r(l()),d=()=>{i&&clearInterval(i),i=window.setInterval(()=>{s||c()},t?6e4:1e3)},f=h=>{n=h;try{localStorage.setItem(St(lg),n)}catch{}c()};a.addEventListener("click",()=>f($d[n])),document.documentElement.classList.toggle("sky-static",t),c(),d();const g=document.getElementById("mapWorld");g&&d5(g);try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change",()=>{const u=wd();document.documentElement.classList.toggle("sky-static",u),document.documentElement.classList.toggle("sky-live",!u)})}catch{}try{matchMedia(r5).addEventListener?.("change",()=>Hi())}catch{}return window.addEventListener("resize",()=>Hi()),new MutationObserver(()=>Hi()).observe(document.body,{attributes:!0,attributeFilter:["class"]}),{choice:()=>n,look:()=>o,setChoice(h){f(h)},freeze(h){s=h,c()}}}function Hi(){const e=document.getElementById("skyMount"),t=document.getElementById("menuDaySlot");e&&t&&e.parentElement!==t&&t.appendChild(e),t&&(t.hidden=!1),e&&(e.style.left="",e.style.top="")}function d5(e){const t=document.createElement("div");t.className="skyTint",t.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="skyLamps",n.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="skyBits",s.setAttribute("aria-hidden","true"),s.innerHTML='<i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i>';const o=()=>{e.contains(t)||e.appendChild(t),e.contains(n)||e.appendChild(n),e.contains(s)||e.appendChild(s)};o(),new MutationObserver(o).observe(e,{childList:!0})}function f5(){try{const e=localStorage.getItem(St(lg));if(n5(e))return e}catch{}return"auto"}const Hs=[{name:"Pink",fill:"#ff7eb3",ink:"#9d174d"},{name:"Lilac",fill:"#c9b3ff",ink:"#5f3dc4"},{name:"Aqua",fill:"#66d9e8",ink:"#0b7285"},{name:"Gold",fill:"#ffd43b",ink:"#e67700"}],Ve="#5a3d5c",yr=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),_d=e=>typeof e=="number"?e:{skip:10,rev:11,d2:12,wild:13,w4:14}[e]??0,Md=e=>typeof e.v=="number"?String(e.v):e.v==="skip"?"✕":e.v==="rev"?"↻":e.v==="d2"?"+2":e.v==="w4"?"+4":"♛",g5=e=>e.v==="skip"?"Nope":e.v==="rev"?"Flip":e.v==="d2"?"+2":e.v==="wild"||e.v==="w4"?"Crown":"",es=(e,t,n=1,s="#ffd43b")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -6 L1.4 -1.4 L6 -1 L1.6 1.4 L3 6 L0 3 L-3 6 L-1.6 1.4 L-6 -1 L-1.4 -1.4 Z" fill="${s}" stroke="${Ve}" stroke-width="1" stroke-linejoin="round"/>`,Pi=(e,t,n=1)=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 1.2 C-2.2 -1.6 -5.2 -0.6 -3.6 2.2 C-2.4 4 0 5.2 0 5.2 C0 5.2 2.4 4 3.6 2.2 C5.2 -0.6 2.2 -1.6 0 1.2 Z" fill="#ff4d94" stroke="${Ve}" stroke-width="1"/>`;function h5(e){return e.v==="wild"||e.v==="w4"?`<g transform="translate(14 28)">
      <path d="M4 26 L10 8 L18 16 L24 2 L30 16 L38 8 L44 26 Z" fill="#ffd43b" stroke="${Ve}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="4" y="26" width="40" height="8" rx="2" fill="#ffd43b" stroke="${Ve}" stroke-width="2.2"/>
      <circle cx="10" cy="8" r="2.4" fill="#ff7eb3"/><circle cx="24" cy="3" r="2.4" fill="#66d9e8"/><circle cx="38" cy="8" r="2.4" fill="#d0bfff"/>
      ${es(-2,0,.7)}${es(46,4,.65,"#fff")}${es(22,-4,.55,"#ff7eb3")}
    </g>${e.v==="w4"?`<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${Ve}" font-family="Nunito, ui-rounded, system-ui, sans-serif">+4</text>`:""}`:e.v==="d2"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff" stroke="${Ve}" stroke-width="2.4"/>
      ${Pi(14,8,1.35)}${Pi(32,8,1.35)}
      <path d="M12 26 Q23 34 34 26" fill="none" stroke="${Ve}" stroke-width="2.4" stroke-linecap="round"/>
      ${Pi(40,22,.8)}
    </g>`:e.v==="rev"?`<g fill="none" stroke="${Ve}" stroke-width="3.2" stroke-linecap="round">
      <path d="M16 40 C42 22 54 52 34 60 C16 68 12 46 30 40"/>
      <path d="M14 38 L22 30 L24 42" stroke-linejoin="round"/>
    </g>${es(48,28,.85)}${es(20,62,.6,"#ff7eb3")}${es(50,58,.55,"#66d9e8")}`:e.v==="skip"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff6d8" stroke="${Ve}" stroke-width="2.4"/>
      <rect x="8" y="12" width="14" height="9" rx="3" fill="#2b1430"/><rect x="24" y="12" width="14" height="9" rx="3" fill="#2b1430"/>
      <path d="M22 16.5 H24 M5 14 H2 M41 14 H44" stroke="${Ve}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 27 Q23 32 34 27" fill="none" stroke="${Ve}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`:""}function tl(e){const t=e.c===4,n=t?{fill:"#fff8ee",ink:Ve}:Hs[e.c]??Hs[0],s=typeof e.v=="number",o=g5(e),i=t?'<rect x="2" y="2" width="66" height="96" rx="13" fill="#fff8ee" stroke="#ff7eb3" stroke-width="4"/><rect x="5" y="5" width="60" height="90" rx="11" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="7.5" y="7.5" width="55" height="85" rx="9" fill="none" stroke="#66d9e8" stroke-width="1.6"/><rect x="9.5" y="9.5" width="51" height="81" rx="8" fill="none" stroke="#ffd43b" stroke-width="1.6"/>':`<rect x="2" y="2" width="66" height="96" rx="13" fill="${n.fill}" stroke="${Ve}" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`,a='<ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/>',r=`fill="${n.ink}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif"`,l=`<text x="8" y="16" font-size="13" font-weight="900" ${r}>${Md(e)}</text>`+(s?`<text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" ${r}>${Md(e)}</text>`:""),c=s?`<text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="${n.ink}" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${e.v}</text>`:`${h5(e)}${o?`<text x="35" y="92" text-anchor="middle" font-size="12" font-weight="900" ${r}>${o}</text>`:""}`;return`<svg viewBox="0 0 70 100">${i}${a}${l}${c}</svg>`}const p5=[[18,28],[40,28],[29,46],[18,64],[40,64],[29,78]].map(([e,t])=>Pi(e,t,.9)).join(""),u5=`<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff4d94" stroke="${Ve}" stroke-width="3"/>
  <rect x="7" y="7" width="56" height="86" rx="10" fill="none" stroke="#ffd43b" stroke-width="3"/>
  <rect x="11" y="11" width="48" height="78" rx="8" fill="#ff7eb3"/>
  ${p5}
  <circle cx="35" cy="50" r="14" fill="#fff6fb" stroke="${Ve}" stroke-width="2.4"/>
  ${es(35,50,1.15,"#ffd43b")}
</svg>`,dg=(e,t)=>{if(t.turn<0||t.drawn!=null&&e.id!==t.drawn)return!1;const n=t.top;return e.c===4||e.c===t.color||e.v===n.v&&n.c!==4};let nl=null,ct=null,Ls=-1,Ld=-1;function Cd(e,t){nl=e;const n=t.table,s=n.view;if(!s||!s.top){e.innerHTML="";return}n.tb!==Ld&&(ct=null,Ls=-1,Ld=n.tb);const o=n.you,i=o!==null&&Array.isArray(s.hand)?s.hand.slice():[];ct!==null&&!i.some(p=>p.id===ct)&&(ct=null);const a=s.ev;let r=null;if(a&&a.n!==Ls&&Ls>=0&&a.k==="play"&&a.card){const p=e.querySelector(`[data-card="${a.card.id}"]`)||e.querySelector(`[data-p="${a.p}"]`);p&&(r=p.getBoundingClientRect())}const c=n.phase==="play"&&s.turn>=0,d=c&&o!==null&&s.turn===o,f=o!==null&&i.length<=2&&i.length>0&&!s.slay?.[o]&&d,g=d&&s.drawn==null&&n.phase==="play",h=d&&s.drawn!=null&&n.phase==="play",u=i.sort((p,v)=>p.c-v.c||_d(p.v)-_d(v.v)),b=c?n.players[s.turn]:"",_=c?d?"Your turn!":`${yr(t.name(b))}'s turn`:"",m=Hs[s.color]??Hs[0];if(e.innerHTML=`<div class="slayFelt">
    ${_?`<div class="whose ${d?"yours":""}" id="whoseTurn">${_}<span class="slayDir" aria-hidden="true">${s.dir===1?"→":"←"}</span></div>`:""}
    <div class="slayOpps">${n.players.map((p,v)=>v===o?"":`<div class="slayOpp ${s.turn===v?"isTurn":""}" data-p="${v}" data-count="${s.counts?.[v]??0}"><span class="chipFace">${t.face(p)}</span><b>${yr(t.name(p))}</b><span class="cnt">${s.counts?.[v]??0}</span>${t.away(p)?'<i class="awayBadge">away</i>':""}${s.slay?.[v]?"<em>SLAY!</em>":""}</div>`).join("")}</div>
    <div class="slayPile">
      <button type="button" id="slayDeck" class="slayDeck" ${g?"":"disabled"} aria-label="Draw a card">${u5}<span>${s.deck??0}</span></button>
      <div id="slayDiscard" class="slayDiscard" data-top="${s.top.id}">${tl(s.top)}</div>
      <div class="nowColor" data-color="${s.color}" style="background:${m.fill}" aria-label="${m.name}"></div>
    </div>
    ${o===null?'<p class="watching">You are watching</p>':""}
    ${ct!==null?`<div id="crownPick" class="crownPick"><p>Pick a color for your Crown!</p><div class="crownRow">${Hs.map((p,v)=>`<button type="button" data-color="${v}" aria-label="${p.name}" style="background:${p.fill}"><span>${p.name}</span></button>`).join("")}</div></div>`:""}
    <div id="slayHand" class="slayHand ${d?"isTurn":""}">${u.map(p=>{const v=d&&n.phase==="play"&&dg(p,s),$=v?"can":d?"dim":"wait",P=typeof p.v=="number"?Hs[p.c].name+" "+p.v:p.v==="wild"?"Crown":p.v==="w4"?"Crown plus 4":p.v==="d2"?"plus 2":p.v==="rev"?"Flip":"Nope";return`<button type="button" class="slayCard ${$} ${p.id===s.drawn?"justDrew":""} ${p.id===ct?"picked":""}" data-card="${p.id}" data-c="${p.c}" data-v="${p.v}" aria-label="${yr(P)}" ${v?"":"disabled"}>${tl(p)}</button>`}).join("")}</div>
    ${c&&o!==null?`<button type="button" id="slayCall" class="slayCall ${f?"ready":""}" ${f?"":"disabled"}>SLAY!</button>`:""}
    <button type="button" id="slayPass" class="slayPass ${h?"":"hidden"}" ${h?"":"disabled"}>Pass</button>
  </div>`,a&&a.n!==Ls){const p=Ls;if(Ls=a.n,p>=0){if(a.k==="play"&&a.card){const v=e.querySelector("#slayDiscard");v&&m5(r,a.card,v.getBoundingClientRect()),a.card.v==="skip"?t.toast("Nope!"):a.card.v==="rev"?t.toast("Flip!"):a.card.v==="d2"?t.toast("+2!"):a.card.v==="w4"&&t.toast("Crown +4!"),t.sfx.swish()}a.vdrew&&t.toast("Forgot to say SLAY! Draw 2"),a.k==="slay"&&t.sfx.sparkle()}}}function m5(e,t,n){const s=document.createElement("div");s.className="flyCard",s.innerHTML=tl(t);const o=e?.width||70,i=e?.height||100;Object.assign(s.style,{left:(e?.left??innerWidth/2)+"px",top:(e?.top??80)+"px",width:o+"px",height:i+"px"}),document.body.appendChild(s),requestAnimationFrame(()=>{s.style.left=n.left+"px",s.style.top=n.top+"px",s.style.width=Math.max(n.width,70)+"px",s.style.height=Math.max(n.height,96)+"px"}),setTimeout(()=>s.remove(),560)}const y5={id:"slay",render:Cd,handle(e,t){const n=t.table.view,s=t.table.you;if(!n||t.table.phase!=="play"||s===null)return!1;const o=n.hand??[];if(e.closest("#slayCall"))return o.length<=2&&o.length>0&&!n.slay?.[s]&&(t.move({k:"slay"}),t.sfx.sparkle()),!0;if(e.closest("#slayDeck"))return n.turn===s&&n.drawn==null&&(ct=null,t.move({k:"draw"}),t.sfx.click()),!0;if(e.closest("#slayPass"))return n.turn===s&&n.drawn!=null&&(ct=null,t.move({k:"pass"}),t.sfx.click()),!0;const i=e.closest("#crownPick [data-color]");if(i&&ct!==null)return t.move({k:"play",id:ct,color:+i.dataset.color}),ct=null,t.sfx.sparkle(),!0;const a=e.closest("#slayHand [data-card]");if(!a||a.hasAttribute("disabled"))return!!a;const r=+a.dataset.card,l=o.find(c=>c.id===r);return!l||n.turn!==s||!dg(l,n)||(l.c===4?(ct=r,t.sfx.pop(),nl&&Cd(nl,t)):(ct=null,t.move({k:"play",id:r}),t.sfx.click())),!0}},fg="#5a3d5c",Sd=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),k5=`<svg viewBox="0 0 48 48"><path d="M24 42 C8 30 2 22 7 13 C11 6 20 8 24 16 C28 8 37 6 41 13 C46 22 40 30 24 42 Z" fill="#ff4d94" stroke="${fg}" stroke-width="3" stroke-linejoin="round"/><path d="M16 16 Q20 12 22 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`,b5=`<svg viewBox="0 0 48 48"><path d="M24 3 L29 17 H44 L32 26 L37 42 L24 33 L11 42 L16 26 L4 17 H19 Z" fill="#66d9e8" stroke="${fg}" stroke-width="3" stroke-linejoin="round"/><path d="M24 12 L26 18 H22 Z" fill="#fff" opacity=".8"/></svg>`,v5={id:"four",render(e,t){const n=t.table,s=n.view;if(!s||!Array.isArray(s.b)){e.innerHTML="";return}const o=n.you,i=o!==null&&s.turn===o&&n.phase==="play",a=new Set((s.line??[]).map(([b,_])=>b+":"+_)),r=s.last;let l="";for(let b=0;b<7;b++){const _=s.b[b];let m="";for(let v=5;v>=0;v--){const $=v<_.length?_[v]:null,P=a.has(b+":"+v)?" hot":"",R=r&&r.col===b&&r.row===v?" just":"";m+=`<span class="fourCell${$===0?" heart":$===1?" star":""}${P}${R}">${$===0?k5:$===1?b5:""}</span>`}const p=i&&_.length<6;l+=`<button type="button" class="fourCol" data-col="${b}" ${p?"":"disabled"} aria-label="Drop in column ${b+1}">${m}<span class="dropHint">${p?"▼":""}</span></button>`}const c=n.phase==="play"&&s.turn>=0,d=c?n.players[s.turn]:"",f=c?i?"Your turn!":`${Sd(t.name(d))}'s turn`:"",g=o===0?"You are <b>pink hearts</b>":o===1?"You are <b>aqua stars</b>":"Pink hearts and aqua stars",h=b=>b===0?"♥":"★",u=n.players.map((b,_)=>`<div class="playerChip ${s.turn===_?"isTurn":""}"><span class="chipFace">${t.face(b)}</span><b>${Sd(t.name(b))} ${h(_)}</b>${t.away(b)?'<i class="awayBadge">away</i>':""}</div>`).join("");e.innerHTML=`<div class="fourPlay">
      ${f?`<div class="whose ${i?"yours":""}" id="whoseTurn">${f}</div>`:""}
      <div class="fourChips">${u}</div>
      <p class="fourLegend">${g}</p>
      <div class="fourBoard" id="fourBoard">${l}</div>
    </div>`},handle(e,t){const n=e.closest(".fourCol");if(!n)return!1;const s=t.table.view,o=t.table.you;if(n.hasAttribute("disabled")||!s||o===null||s.turn!==o||t.table.phase!=="play")return!0;const i=+n.dataset.col;return!Number.isInteger(i)||s.b[i].length>=6||(t.move({col:i}),t.sfx.click()),!0}},Bd={slay:y5,four:v5},yi=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),w5={notHere:"Come into the clubhouse first!",taken:"Someone is sitting there!",playing:"You are already in this game!",playingElsewhere:"Finish your other game first!",notHost:"Waiting for the host…",needMore:"Play with friends on your street",tooMany:"That table is full!",notPlaying:"The game has not started!",notPlayer:"Sit down to play!",illegal:"You can't play that!",notAway:"She is still here!",tooSoon:"Give her a moment!",notSeated:"You are not at this table!",noMove:"No move to play!"};function $5(e){const t=document.getElementById("tableOverlay");let n=null,s="",o=0;const i=m=>m.away==null?0:m.away+Math.max(0,Date.now()-(m.receivedAt??Date.now())),a=()=>{o&&(clearInterval(o),o=0)},r=m=>{const p=!!m&&m.phase==="play"&&m.away!=null&&n!==null;p&&!o&&(o=window.setInterval(()=>f(),1e3)),p||a()},l=()=>e.hood(),c=()=>{const m=l();return!m||n===null?null:m.tables.get(n)??null},d=m=>{const p=l();return{table:m,me:p.pid,name:v=>p.players.get(v)?.nickname??"friend",face:v=>{const $=p.players.get(v)?.look;return $?bl(tt($)):""},move:v=>p.tbl({op:"move",tb:m.tb,m:v}),away:v=>{if(v===p.pid)return!1;const $=p.players.get(v);if($&&!$.online)return!0;const P=p.presence.get(v);return!P||P.where!=="gameroom"},toast:e.toast,sfx:e.sfx}};t.addEventListener("click",m=>{const p=m.target;if(p.closest("#tblBack")){h(),e.sfx.swish();return}if(p.closest("#tblLeave")){u();return}if(p.closest("#tblStart")){b();return}if(p.closest("#tblNudge")){_();return}const v=c();v&&Bd[v.game]?.handle(p,d(v))});function f(){const m=l(),p=c();if(!m||!p){t.classList.add("hidden"),t.innerHTML="",a();return}const v=uf[p.game],$=m.pid,P=p.seats.includes($),R=p.seats.filter(Boolean).length,W=p.phase==="play"&&p.you!==null&&p.view&&p.view.turn===p.you,F=p.view?.winPid??null;let ne="";if(p.phase==="over"){const at=F?m.players.get(F)?.nickname??"Friend":"";p.game==="slay"?ne=F?F===$?"You slayed!":`${yi(at)} slayed!`:"It's a tie!":ne=p.view?.draw||!F?"It's a tie!":F===$?"You got four!":`${yi(at)} got four!`;const ni=p.tb+":"+p.seq;F===$&&s!==ni&&(s=ni,e.confetti(),e.sfx.sparkle())}const se=i(p),I=p.phase==="play"&&P&&se>=K0&&p.you!==null&&!!p.view&&p.view.turn!==p.you&&p.view.turn>=0,ae=p.phase!=="play"&&p.host===$&&R>=v.minPlayers&&R<=v.maxPlayers,fn=P&&p.phase==="lobby"&&p.host!==$&&R>=v.minPlayers,At=P&&p.phase==="lobby"&&R<v.minPlayers;t.classList.remove("hidden"),t.dataset.tb=String(p.tb),t.dataset.phase=p.phase,t.dataset.game=p.game,t.dataset.you=p.you===null?"":String(p.you),t.innerHTML=`<div class="tblCard ${W?"yourTurn":""} game-${p.game}">
      <div class="tblTop"><h2>${yi(v.name)}</h2><div class="seatDots">${p.seats.map(at=>`<i class="${at?"on":""} ${at===$?"me":""}"></i>`).join("")}</div></div>
      ${ne?`<div class="winWrap"><div class="winBanner" id="winBanner">${ne}</div></div>`:""}
      <div id="tblStage"></div>
      <div class="tblBar">
        ${ae?'<button type="button" id="tblStart">Start</button>':""}
        ${fn?'<p class="tblWait">Waiting for the host…</p>':""}
        ${I?'<button type="button" id="tblNudge">Play for her</button>':""}
        <button type="button" id="tblBack">Back to room</button>
        <button type="button" id="tblLeave">Leave table</button>
      </div>
      ${At?'<p class="tblWait" id="needFriend">Play with friends on your street</p>':""}
    </div>`;const yt=t.querySelector("#tblStage");p.phase==="lobby"||!p.view?yt.innerHTML=g(p,m,$):Bd[p.game]?.render(yt,d(p)),r(p)}function g(m,p,v){return`<div class="lobby">${m.seats.map(($,P)=>`<div class="lobbySeat ${$?"filled":""} ${$===v?"me":""}">
      <span>${P+1}</span><b>${$?yi(p.players.get($)?.nickname??"friend"):"Empty"}</b>
      ${$&&$===m.host?"<i>host</i>":""}${$===v?"<i>you</i>":""}
    </div>`).join("")}</div>`}function h(){n=null,a(),t.classList.add("hidden"),t.innerHTML=""}function u(){const m=l(),p=c();m&&p&&p.seats.includes(m.pid)&&m.tbl({op:"leave",tb:p.tb}),e.sfx.click(),h()}function b(){const m=l(),p=c();m&&p&&(m.tbl({op:"start",tb:p.tb}),e.sfx.sparkle())}function _(){const m=l(),p=c();m&&p&&(m.tbl({op:"nudge",tb:p.tb}),e.sfx.click())}return{open(m){n=m,f()},close:h,refresh:f,fail(m,p){e.toast(w5[p]||"Try that again!"),e.sfx.pop(),n===m&&f()},isOpen:()=>n}}const x5=120,_5=192,M5=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let O=null,Hn=null,on=null,Hd=!1;const Dn=()=>(document.getElementById("gameroom")?.clientHeight||600)/na,Ti=()=>Hn;function Vs(){const e=O?.hood();if(!e)return null;for(const[t,n]of e.tables){const s=n.seats.indexOf(e.pid);if(s>=0){const o=Xo(Number(t))[s];return{tb:Number(t),seat:s,x:o.x,y:o.y}}}return null}function L5(){const e=O?.hood();if(!e)return!1;for(const[t,n]of e.players)if(t!==e.pid&&n.online)return!0;return!1}function C5(e){if(O=e,Hn=$5({hood:e.hood,toast:e.toast,confetti:()=>Lf(),sfx:e.sfx}),Hd)return Hn;Hd=!0;const t=document.getElementById("grWorld");return t.addEventListener("click",B5),t.addEventListener("pointerdown",n=>{n.target.closest(".grChair, .grTable, .grDoor, .pet")&&n.stopPropagation()}),Hn}function Nl(){if(!O)return;const e=Dn(),t=document.getElementById("grWorld"),n=o=>o*e+"px";t.style.width=Ra*e+"px",t.style.height=na*e+"px",t.style.setProperty("--sc",String(e));let s=W3();s+=`<button class="grDoor" data-gr="map" aria-label="Back to the map" style="left:${n(78)};top:${n(268)};width:${n(86)};height:${n(170)}"></button>`,Wo.forEach((o,i)=>{const a=o.seats>=6?560:o.seats>=4?440:340;s+=`<button class="grTable" data-tb="${i}" aria-label="${uf[o.game].name} table" style="left:${n(o.x-a/2)};top:${n(456)};width:${n(a)};height:${n(70)}"></button>`,Xo(i).forEach((r,l)=>{const c=76*e,d=72*e,f=Math.max(c,44),g=Math.max(d,44),h=(r.x-38)*e-(f-c)/2,u=(r.y-16)*e-(g-d)/2;s+=`<button class="grChair" data-tb="${i}" data-seat="${l}" aria-label="Empty chair" style="left:${h}px;top:${u}px;width:${f}px;height:${g}px"></button>`})}),s+='<div class="savatars" id="gavatars"></div>',t.innerHTML=s,Co()}function Co(){if(!O||O.view()!=="gameroom")return;const e=document.getElementById("gavatars");if(!e)return;const t=Dn(),n=new Set;for(const i of S5()){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&T5(a));const r=JSON.stringify(i.look)+i.name+(i.away?":away":"");if(a.dataset.look!==r){const g=a.querySelector(".bubble");a.innerHTML=`<div class="inner">${tt(i.look)}</div>${i.name?`<div class="nametag">${M5(i.name)}${i.away?'<i class="awayBadge">away</i>':""}</div>`:""}`,g&&a.appendChild(g),a.dataset.look=r}const l=(Yo[i.look.size]??1)*t*.95,c=x5*l,d=_5*l,f=i.seated?i.y-8:i.y;a.style.left=i.x*t-c/2+"px",a.style.top=f*t-d+"px",a.style.width=c+"px",a.style.height=d+"px",a.style.zIndex=String(100+Math.round(i.y)),a.classList.toggle("flipped",i.flip),a.classList.toggle("away",i.away),a.classList.toggle("seated",i.seated),Go(a,i.look,i.mine)}e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),O.refreshNear();const s=O.hood();document.querySelectorAll("#grWorld .grChair").forEach(i=>{const a=s?.tables.get(+i.dataset.tb)?.seats[+i.dataset.seat];i.classList.toggle("taken",!!a);const r=a?s.players.get(a)?.nickname:"";i.setAttribute("aria-label",r?r+" is sitting":"Empty chair")});const o=document.getElementById("grSolo");o&&o.classList.toggle("hidden",L5())}function S5(){const e=[],t=O.hood();if(t){const n=new Map;for(const[a,r]of t.tables)r.seats.forEach((l,c)=>{l&&n.set(l,Xo(Number(a))[c])});const s=[...t.presence.entries()],o=O.myPres();o&&s.push([t.pid,o]);const i=new Set;for(const[a,r]of s){if(r.where!=="gameroom")continue;const l=t.players.get(a);if(!l)continue;i.add(a);const c=n.get(a);e.push({key:a,look:l.look,name:l.nickname,x:c?.x??r.x,y:c?.y??r.y,flip:r.flip,mine:a===t.pid,away:!1,seated:!!c})}for(const[a,r]of n){if(i.has(a))continue;const l=t.players.get(a);l&&e.push({key:a,look:l.look,name:l.nickname,x:r.x,y:r.y,flip:!1,mine:!1,away:!0,seated:!0})}}else{const n=O.solo();if(n?.where==="gameroom"){const s=O.soloLook();e.push({key:"solo",look:s.look,name:"",x:n.x,y:n.y,flip:n.flip,mine:!0,away:!1,seated:!1})}}return e}function B5(e){if(!O||O.view()!=="gameroom")return;const t=e.target,n=t.closest(".savatar");if(n){const c=O.hood(),d=n.dataset.pid;if(c&&d){for(const[f,g]of c.tables)if(g.seats.includes(d)){Hn?.open(Number(f));return}}return}if(t.closest('[data-gr="map"]')){O.goMap();return}const s=t.closest(".grChair");if(s){H5(+s.dataset.tb,+s.dataset.seat);return}const o=t.closest(".grTable");if(o){if(!O.hood()){gg();return}Hn?.open(+o.dataset.tb),O.sfx.click();return}if(t.closest(".pet")||Vs())return;const i=document.getElementById("grWorld").getBoundingClientRect(),a=Dn(),r=(e.clientX-i.left)/a,l=(e.clientY-i.top)/a;l<430||(on={x:Math.max(60,Math.min(Ra-60,r)),y:Math.max(470,Math.min(590,l))})}function H5(e,t){if(!O)return;const n=O.hood();if(!n){gg();return}const s=n.tables.get(e)?.seats[t];if(s&&s!==n.pid){O.toast((n.players.get(s)?.nickname??"Someone")+" is sitting there!"),O.sfx.pop(),Hn?.open(e);return}on=null,n.tbl({op:"sit",tb:e,seat:t});const o=Xo(e)[t];O.setPres({where:"gameroom",x:o.x,y:Math.max(470,Math.min(590,o.y)),flip:!1}),Hn?.open(e),O.sfx.click()}function gg(){if(!O)return;const e=document.getElementById("grSolo");e&&(e.classList.remove("hidden"),e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),O.toast("Play with friends on your street"),O.sfx.pop()}function P5(e){if(!O||O.view()!=="gameroom"||!on)return;if(Vs()){on=null;return}const t=O.hood()?O.myPres():O.solo();if(!t||t.where!=="gameroom"){on=null;return}const n=on.x-t.x,s=on.y-t.y,o=Math.hypot(n,s);if(o<4){on=null;return}const i=Math.min(o,300*e),a={where:"gameroom",x:t.x+n/o*i,y:t.y+s/o*i,flip:Math.abs(n)>2?n<0:t.flip};O.setPres(a);const r=Dn(),l=document.getElementById("grScroll"),c=a.x*r-l.scrollLeft;(c<l.clientWidth*.22||c>l.clientWidth*.78)&&(l.scrollLeft=a.x*r-l.clientWidth/2)}function T5(e){e.addEventListener("pointerdown",t=>{if(!O||Vs())return;const n=O.hood()?O.myPres():O.solo();if(!n||n.where!=="gameroom")return;t.preventDefault(),t.stopPropagation(),on=null;const s=Dn(),o=document.getElementById("grWorld"),i=document.getElementById("grScroll"),a=m=>{const p=o.getBoundingClientRect();return{x:(m.clientX-p.left)/s,y:(m.clientY-p.top)/s}},r=a(t),l={x:n.x-r.x,y:n.y-r.y};let c=t,d=0,f=n.x,g=!1;const h=m=>{const p=O.hood()?O.myPres():O.solo();if(!p||p.where!=="gameroom")return;const v=a(m),$=Math.max(60,Math.min(Ra-60,v.x+l.x)),P=Math.max(470,Math.min(590,v.y+l.y));if(!g&&Math.hypot($-p.x,P-p.y)<6)return;g=!0;const R=Math.abs($-f)>3?$<f:p.flip;Math.abs($-f)>3&&(f=$),O.setPres({where:"gameroom",x:$,y:P,flip:R})},u=()=>{const m=i.getBoundingClientRect(),p=c.clientX<m.left+70?-12:c.clientX>m.right-70?12:0;p&&g&&(i.scrollLeft+=p,h(c)),d=requestAnimationFrame(u)};d=requestAnimationFrame(u),e.classList.add("lifted"),O.sfx.pick();const b=m=>{m.pointerId===t.pointerId&&(c=m,h(m))},_=m=>{m.pointerId===t.pointerId&&(cancelAnimationFrame(d),window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",_),e.classList.remove("lifted"),g&&O.sfx.drop())};window.addEventListener("pointermove",b),window.addEventListener("pointerup",_)})}const uo=Y3(),ee=hf();let qe=ee;const hg=[],Pd=new WeakSet;function pg(e){Pd.has(e)||(Pd.add(e),e.subscribe((t,n)=>{qe===e&&hg.forEach(s=>s(t,n))}))}pg(ee);const C={get:()=>qe.get(),dispatch(e){qe.dispatch(e)},subscribe:e=>{hg.push(e)}},ge=xn,Ce=$o,Zs=390;let X=1e3;const hs=()=>Math.max(0,ge-X),ug=375,mg=(e,t)=>e.wall?Math.min(t,ug):t,yg=12,Gs=(e,t)=>e.wall?t:Math.min(t,Ce-yg),qn=120,jt=192,Fl=[{id:"living",name:"Living Room",color:"#ff8fab"},{id:"bedroom",name:"Bedroom",color:"#b388d6"},{id:"kitchen",name:"Kitchen",color:"#5cc985"},{id:"salon",name:"Salon",color:"#f0a0d8"},{id:"nursery",name:"Nursery",color:"#9ad7f5"},{id:"bathroom",name:"Bathroom",color:"#7ec8d6"}],kg=e=>Fl.find(t=>t.id===e)?.color??"#ccc",jl=lw();Iw(Yt,ke);const Is=[{id:"__people",name:"People",icon:"",kind:"people"},...["furniture","decor","plants","food","pets"].map((e,t)=>({id:e,name:e,icon:["armchair","balloon","flowers","donut","cat"][t],kind:"cat"}))];Is.push({id:"secrets",name:"Secrets",icon:"egg:chloe-starlamp",kind:"cat"});for(const e of Yt)Is.some(t=>t.kind==="cat"&&t.id===e.cat)||Is.push({id:e.cat,name:e.cat,icon:e.kind,kind:"cat"});for(const e of Yt)e.pack&&!Is.some(t=>t.id==="pack:"+e.pack)&&Is.push({id:"pack:"+e.pack,name:Cf(e.pack),icon:e.kind,kind:"pack"});const kr=e=>Yt.filter(t=>J$(t,e,C.get().currentRoom,Vl==="all",Ua())),W5=["#ffd6e0","#d9ccff","#cdf3dc","#cfe8ff","#fff1b8","#ffe0c7","#ffffff","#f6c1ff"],R5=["#e8b98a","#f2d0a4","#c99366","#ffe7a8","#bfe3d0","#d6d6f5","#ffc8dd","#9fb4c7"],bt={paint:'<svg viewBox="0 0 48 48"><path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M28 12 L34 6 L42 14 L36 20" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/></svg>',shirt:'<svg viewBox="0 0 48 48"><path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',soundOn:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 17 Q37 24 32 31 M36 12 Q45 24 36 36" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',soundOff:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ddd" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M33 19 L43 29 M43 19 L33 29" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',flip:'<svg viewBox="0 0 48 48"><path d="M24 6 V42" stroke="#5a3d5c" stroke-width="3" stroke-dasharray="4 4"/><path d="M18 12 L6 36 H18 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M30 12 L42 36 H30 Z" fill="#fff" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',front:'<svg viewBox="0 0 48 48"><rect x="6" y="6" width="22" height="22" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="18" y="18" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',back:'<svg viewBox="0 0 48 48"><rect x="18" y="18" width="24" height="24" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="22" height="22" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',trash:'<svg viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="28" rx="5" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><rect x="8" y="9" width="32" height="7" rx="3.5" fill="#ffadad" stroke="#5a3d5c" stroke-width="3"/><path d="M20 21 V35 M28 21 V35" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',smaller:'<svg viewBox="0 0 48 48"><rect x="16" y="16" width="16" height="16" rx="4" fill="#bde0fe" stroke="#5a3d5c" stroke-width="3"/><path d="M8 24 H14 M34 24 H40" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',bigger:'<svg viewBox="0 0 48 48"><rect x="12" y="12" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M24 6 V11 M24 37 V42 M6 24 H11 M37 24 H42" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>'},E5='<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',Q5='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 15 H37 M11 24 H37 M11 33 H37" fill="none" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',A5='<svg class="mailGlyph" viewBox="0 0 48 48" aria-hidden="true"><g transform="translate(0 2)"><rect x="6" y="14" width="36" height="24" rx="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/><path d="M6 16 L24 30 L42 16" fill="none" stroke="#5a3d5c" stroke-width="3"/><path d="M34 12 V6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M34 6 H44 L40 10 L44 14 H34 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2"/></g></svg>',bg='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',U5=document.getElementById("app");U5.innerHTML=`
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${ft.chat}<span class="badge" id="chatBadge"></span></button>
    <button class="round" id="btnMenu" aria-label="Menu" aria-expanded="false">${Q5}<span class="badge" id="menuBadge"></span></button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${ft.home}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${wu}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${M3}</button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${kl}<span class="badge" id="mapBadge"></span></button>
  </div>
</div>
<div class="menuPop hidden" id="menuPop">
  <div class="menuCard" role="dialog" aria-label="Menu">
    <button type="button" class="close" id="menuClose" aria-label="Close">✕</button>
    <p class="menuGroup">My stuff</p>
    <button type="button" class="menuRow" id="btnPets" aria-label="Pets"><span class="mIco">${xf}</span><span class="mLabel">Pets</span></button>
    <button type="button" class="menuRow" id="btnDress" aria-label="Characters"><span class="mIco">${bt.shirt}</span><span class="mLabel">Characters</span></button>
    <button type="button" class="menuRow" id="btnPaint" aria-label="Colors"><span class="mIco">${bt.paint}</span><span class="mLabel">Wall &amp; floor colors</span></button>
    <button type="button" class="menuRow" id="secrets" aria-label="Surprises, 0 of 5"><span class="mIco secGift">🎁</span><span class="mLabel"><span class="secWord">Surprises </span><span class="secCount">0/5</span></span></button>
    <p class="menuGroup houseGroup">House</p>
    <button type="button" class="menuRow lockRow" id="btnLock" aria-label="Lock house"><span class="mIco" id="lockIco">${ft.lockOff}</span><span class="mLabel" id="lockLabel">Lock my house</span></button>
    <button type="button" class="menuRow mailRow" id="btnMail" aria-label="Mailbox"><span class="mIco">${A5}</span><span class="mLabel">Mailbox</span><span class="menuNew" id="mailNew"></span></button>
    <!-- Day / Night / Auto. The clock stays on Auto until she taps. -->
    <div id="menuDaySlot" class="menuSlot" hidden></div>
    <p class="menuGroup streetGroup">Street</p>
    <button type="button" class="menuRow grownRow" id="btnParent" aria-label="Grown-ups"><span class="mIco">${ft.shield}</span><span class="mLabel">Grown-ups</span></button>
    <button type="button" class="menuRow soloLeave" id="btnSolo" aria-label="Play in my own house"><span class="mIco">${ft.solo}</span><span class="mLabel">Play in my own house</span></button>
    <button type="button" class="menuRow friendRow" id="btnHood" aria-label="Friends"><span class="mIco">${ft.street}</span><span class="mLabel">Friends</span></button>
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
        <button data-a="smaller" aria-label="Smaller">${bt.smaller}</button><button data-a="bigger" aria-label="Bigger">${bt.bigger}</button><button data-a="flip" aria-label="Flip">${bt.flip}</button><button data-a="front" aria-label="Bring forward">${bt.front}</button><button data-a="back" aria-label="Send back">${bt.back}</button><button data-a="delete" class="danger" aria-label="Put away">${bt.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <div class="bin" id="bin">${bt.trash}</div>
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
<div class="street mapView hidden" id="street"><div class="mapSky">${Ih}</div><div class="mapMeadow">${Oh}</div><button class="mailCue" id="mailCue" type="button">You've got mail!</button><div class="mapWorld" id="mapWorld"></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>
<div id="toastLane"></div>
<div class="phoneNote" id="phoneNote"><div class="card"><h2>Turn sideways</h2><p>Turn your phone sideways for more room to play!</p><button class="phoneOk" id="phoneOk" type="button">OK!</button></div></div>
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>
<div id="skyMount"></div>`;const x=e=>document.getElementById(e),D=x("stage"),vg=x("world"),J=x("layer"),pe=x("toolbar"),Wi=x("bin");let Ue=null,Le=C.get().characters[0]?.id??null,dt="furniture",Vl="",sl="",z5=Date.now()%1e5;const ol=e=>`${e}-${Date.now().toString(36)}${(++z5).toString(36)}${Math.random().toString(36).slice(2,5)}`,Ye="__me";let y=null,S="house",_e=!1,xe="",sa=new Map,wg=!1;const we=hu(x("modeToggle"),{ownHouse:()=>!y||!xe||xe===y.myHouseId(),onChange:()=>{wg&&(Ys.matches?Qn():Zn())}}),Ri=au({send:(e,t,n,s)=>y?.sendMail(e,t,n,s),read:(e,t)=>y?.readMail(e,t),drop:(e,t)=>y?.dropMail(e,t),houseOf:e=>[...y?.players.values()??[]].find(t=>t.pid===e)?.houseId??"",houseName:e=>y?.houses.get(e)?.meta.name??"My House",lettersOf:e=>y?.houses.get(e)?.confirmed.mailbox?.letters??[],mine:e=>!!y&&y.houses.get(e)?.meta.ownerId===y.pid,toast:q,openOwn:()=>{const e=y?.myHouseId();e&&ac(e)},freeType:()=>!y||vf(y.settings)});we.sync(!0);const mo=new Map,oa={};let K=Fs,Qs=0;wg=!0;let Uo=null;const Oa=()=>{cancelAnimationFrame(Qs),Uo=null},Gl=e=>Math.max(0,Math.min(hs(),e));function Pe(e){K=Gl(e),oa[C.get().currentRoom]=K,vg.style.transform=`translate3d(${-K}px,0,0)`,x("nudgeL").classList.toggle("off",K<=1),x("nudgeR").classList.toggle("off",K>=hs()-1);const t=x("mmView");t.style.left=K/ge*100+"%",t.style.width=X/ge*100+"%",Ue&&Ug(C.get())}function Na(e){cancelAnimationFrame(Qs),e=Gl(e),Uo=e;const t=()=>{const n=e-K;if(Math.abs(n)<.5){Pe(e),Uo=null;return}Pe(K+n*.18),Qs=requestAnimationFrame(t)};Qs=requestAnimationFrame(t)}const Je=()=>D.getBoundingClientRect().width/X,D5="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)",Ys=window.matchMedia(D5);function q5(){const e=Ys.matches;document.body.classList.toggle("phone",e),document.body.classList.toggle("phone-portrait",e&&window.matchMedia("(orientation: portrait)").matches);const t=x("stageWrap");for(const n of[x("nudgeL"),x("nudgeR")]){const s=e?t:D;n.parentElement!==s&&s.appendChild(n)}}function $g(){const e=document.querySelector(".top");if(!e)return;const t=e.getBoundingClientRect(),n=document.body.classList.contains("phone")?t.bottom:t.height;document.documentElement.style.setProperty("--chrome-h",Math.ceil(n)+"px"),xg()}function xg(){const e=document.querySelector(".top");if(!e)return;const t=Math.ceil(e.getBoundingClientRect().bottom+16)+"px",n=document.getElementById("mailCue");n&&(n.style.top=t);const s=document.getElementById("toastLane");s&&(s.style.top=t)}function Z5(){const e=document.documentElement,t=document.getElementById("app");if(!(document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait"))){t.style.top="",t.style.height="",t.style.bottom="",e.style.removeProperty("--vvh"),e.style.removeProperty("--vvt");return}const s=window.visualViewport,o=Math.round(s?s.height:window.innerHeight),i=Math.round(s?s.offsetTop:0);e.style.setProperty("--vvh",o+"px"),e.style.setProperty("--vvt",i+"px"),t.style.top=i+"px",t.style.height=o+"px",t.style.bottom="auto"}function Zn(){q5(),Z5(),$g();const e=x("stageWrap"),t=document.body.classList.contains("phone"),n=e.clientWidth,s=e.clientHeight;if(t?s>n*.85:s>n+40){const a=n/Math.max(1,s);X=Math.round(Math.max(480,Math.min(860,Ce*a)))}else if(t){const a=n/Math.max(1,s);X=Math.round(Math.max(480,Math.min(ge,Ce*a)))}else X=1e3;X=Yl(X),D.style.width=X+"px",D.style.height=Ce+"px";const i=Math.min(n/X,s/Ce);if(D.style.left="",D.style.top="",D.style.transform=`translate(-50%,-50%) scale(${i})`,D.style.setProperty("--yard-sc",String(i||1)),t&&D.style.setProperty("--fit",String(Je())),_g(),K>hs())Pe(K);else{const a=x("mmView");a.style.left=K/ge*100+"%",a.style.width=X/ge*100+"%"}ze(),!t&&S==="house"&&ps(!1),X5(),S==="ranch"&&requestAnimationFrame(yl),S==="gameroom"&&requestAnimationFrame(Hh),Ks(),t&&S==="ranch"&&v_(),Mg(),we.hint(),nr(),Ln()}function _g(){const e=x("stageWrap"),t=document.body.classList.contains("phone")&&S==="house";for(const n of[x("nudgeL"),x("nudgeR")]){if(!t||n.parentElement!==e){n.style.marginTop="",n.style.left="",n.style.right="",n.style.top="";continue}const s=D.getBoundingClientRect(),o=e.getBoundingClientRect(),i=(s.top+s.bottom)/2-o.top;n.style.top=i+"px",n.style.marginTop=-n.offsetHeight/2+"px",n.style.left="",n.style.right=""}}function Mg(){document.body.classList.remove("secrets-chrome"),x("secrets")?.classList.remove("compact")}function ze(e=0){if(!document.body.classList.contains("phone"))return;if(S==="house"){Lg();return}const t=S==="park"?"parkScroll":S==="ranch"?"ranchScroll":S==="gameroom"?"grScroll":"";if(!t)return;const n=document.getElementById(t);if(!n||n.clientWidth<20){e<8&&requestAnimationFrame(()=>ze(e+1));return}const s=n.querySelector(".savatar.mine")??n.querySelector(".savatar");if(!s){e<8&&requestAnimationFrame(()=>ze(e+1));return}O5(n,[s,...s.querySelectorAll(".nametag")])&&e<8?requestAnimationFrame(()=>ze(e+1)):I5()}function I5(){va()&&(S==="gameroom"&&Bh([...document.querySelectorAll(".neonSignArt")],document.getElementById("grScroll")),S==="ranch"&&!_e&&(Ph(),wc()))}function O5(e,t){const s=e.getBoundingClientRect(),o=Math.min(s.right,window.innerWidth)-8,i=Math.max(s.left,0)+8;let a=0,r=0;for(const c of t){const d=c.getBoundingClientRect();d.width<2||d.height<2||(a=Math.max(a,d.right-o),r=Math.max(r,i-d.left))}if(a<=1&&r<=1)return!1;const l=e.scrollLeft;return a>1&&r>1?e.scrollLeft-=r:a>1?e.scrollLeft+=a:e.scrollLeft-=r,Math.abs(e.scrollLeft-l)>.5}function Lg(){ps(!1)}function Td(e){let t=0;for(const n of e){const s=ke[n.kind];!s||s.wall||(t=Math.max(t,s.w*et(n)))}return t}function N5(){if(S!=="house"||!we.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return 0;const e=C.get().rooms,t=C.get().currentRoom;let n=Td(e[t]?.items??[]);if(t==="backyard")for(const s of Object.keys(e))s!=="backyard"&&(n=Math.max(n,Td(e[s].items)));return n<40?0:Math.min(ge,Math.ceil(n/.55))}function Yl(e){const t=N5();return t&&e<t?t:e}function F5(){const e=Yl(X);if(e<=X+.5)return;X=e,D.style.width=X+"px";const t=x("stageWrap"),n=Math.min(t.clientWidth/X,t.clientHeight/Ce);if(D.style.transform=`translate(-50%,-50%) scale(${n})`,document.body.classList.contains("phone")&&D.style.setProperty("--fit",String(n)),K>hs())Pe(K);else{const s=x("mmView");s.style.left=K/ge*100+"%",s.style.width=X/ge*100+"%"}}let zo=null,Do=!1;function j5(){if(S!=="house"||!we.isPlay()||Math.min(window.innerWidth,window.innerHeight)>=500)return null;const e=C.get();if(e.currentRoom==="backyard")return null;let t=null,n=zo;if(y&&qe!==ee){const a=me();a&&a.where==="house"&&a.room===e.currentRoom&&(t=Et(e.currentRoom,us(y.pid,a),a).x,n||(n=us(y.pid,a)?.item??null))}if(t===null){const a=e.characters.find(r=>r.id===Le&&r.room===e.currentRoom)??e.characters.find(r=>r.room===e.currentRoom);if(!a)return null;t=Et(e.currentRoom,xt(a),a).x,n||(n=xt(a)?.item??null)}if(!n)return null;const s=e.rooms[e.currentRoom].items.find(a=>a.id===n),o=s&&ke[s.kind];if(!s||!o)return null;const i=o.w*et(s)/2;return{minX:Math.min(t-100,s.x-i),maxX:Math.max(t+100,s.x+i)}}function ps(e){if(S!=="house"||ms)return;if(C.get().currentRoom==="backyard"){Math.abs(K-Ir)>.5&&Pe(Ir),Ln();return}if(Do)return;const t=j5();if(t){const _=t.maxX-t.minX;let m=K;_+20*2>X?m=t.minX-20:(t.minX-20<m&&(m=t.minX-20),t.maxX+20>m+X&&(m=t.maxX+20-X)),m=Math.max(0,Math.min(hs(),m)),Math.abs(m-K)>.5&&Pe(m),Ln();return}const n=document.querySelector("#layer .char.avatar.mine")??document.querySelector("#layer .char");if(!n)return;const s=Je()||1,o=D.getBoundingClientRect(),i=8;let a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i;for(const b of["nudgeL","nudgeR"]){const _=x(b);if(!_||_.classList.contains("off")||_.offsetParent===null)continue;const m=_.getBoundingClientRect();m.width<2||m.height<2||(b==="nudgeL"?r=Math.max(r,m.right+6):a=Math.min(a,m.left-6))}a-r<48&&(a=Math.min(o.right,window.innerWidth)-i,r=Math.max(o.left,0)+i);const l=[n,...n.querySelectorAll(".nametag")];let c=0,d=0,f=1/0,g=-1/0;for(const b of l){const _=b.getBoundingClientRect();_.width<2||_.height<2||(c=Math.max(c,_.right-a),d=Math.max(d,r-_.left),f=Math.min(f,_.left),g=Math.max(g,_.right))}if(document.body.classList.contains("phone-portrait")&&f<1/0){const b=(f+g)/2-(r+a)/2;if(Math.abs(b)>3){Pe(K+b/s),Ln();return}}const h=V5(n),u=e3({cam:K,maxCam:hs(),kidX:h,overflowL:d,overflowR:c,scale:s,nudgeX:e});Math.abs(u.cam-K)>.5&&Pe(u.cam),e&&Math.abs(u.kidX-h)>.5&&G5(n,u.kidX),Ln()}function V5(e){if(e.dataset.pid&&y){const t=e.dataset.pid===y.pid?me():y.presence.get(e.dataset.pid);if(t&&t.where==="house")return t.x}return C.get().characters.find(t=>t.id===e.dataset.cid)?.x??0}function G5(e,t){if(e.dataset.pid&&y&&e.classList.contains("mine")){const o=me();if(!o||o.where!=="house")return;Te({...o,x:t}),mt();return}const n=e.dataset.cid;if(!n)return;const s=C.get().characters.find(o=>o.id===n);s&&C.dispatch({type:"char/move",id:n,room:C.get().currentRoom,x:t,y:s.y})}const Y5={living:"Living",bedroom:"Bed",kitchen:"Kitchen",salon:"Salon",nursery:"Nursery",bathroom:"Bath"};function Cg(){const e=S==="house",t=document.body.classList.contains("phone-portrait"),n=e&&!we.isPlay(),s=e&&X+1<ge,o=e&&(t?n:n||s);document.body.classList.toggle("show-minimap",o)}const K5='<svg class="tabIco" width="14" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6 L8 1 L15 6 V11 H1 Z" fill="currentColor"/></svg>';function Sg(){return document.body.classList.contains("phone")}function X5(){const e=Sg()?"c":"f";Cg(),e!==sl&&(sl=e,Eg(C.get()))}function Kl(){Ys.matches?Qn():Zn()}window.addEventListener("resize",Kl);Ys.addEventListener("change",Kl);let Wd="",br=!1;function Rd(){const e=x("stageWrap"),t=document.querySelector(".top"),n=document.querySelector(".tools"),s=a=>a?a.clientWidth+"x"+a.clientHeight:"0",o=window.visualViewport;return(o?Math.round(o.offsetTop)+"x"+Math.round(o.height)+"x"+Math.round(o.width):"")+" "+s(e)+" "+s(t)+" "+s(n)}function Bg(){const e=x("modeToggle"),t=document.querySelector(".tools"),n=document.getElementById("modeDock"),s=document.querySelector(".drawerTop");if(!e||!t||!n||!s)return!1;const o=document.body.classList.contains("phone"),i=o&&!document.body.classList.contains("phone-portrait"),a=i?t:o?n:s,r=e.parentElement===a;return n.hidden=!o||i,r?!1:(i?t.insertBefore(e,t.firstChild):o?n.appendChild(e):s.insertBefore(e,s.firstChild),!0)}function J5(){if(C.get().currentRoom==="backyard"||!document.body.classList.contains("phone-portrait")||!document.body.classList.contains("mode-play")||S!=="house")return;const e=x("stageWrap"),t=e.clientWidth,n=e.clientHeight;if(t<20||n<20||!(n>t*.85))return;const s=Math.min(ge,Yl(Math.max(280,Math.min(860,Math.round(Ce*t/n)))));if(Math.abs(s-X)<2)return;X=s,D.style.width=X+"px",D.style.height=Ce+"px";const o=Math.min(t/X,n/Ce);if(D.style.transform=`translate(-50%,-50%) scale(${o})`,D.style.setProperty("--fit",String(Je())),K>hs())Pe(K);else{const i=x("mmView");i.style.left=K/ge*100+"%",i.style.width=X/ge*100+"%"}_g(),Cg()}function Qn(){if(br||!Ys.matches)return;const e=Bg(),t=Rd()+(document.body.classList.contains("mode-play")?"p":"d");if(!(!e&&t===Wd)){br=!0;try{Zn(),J5(),ze(),Wd=Rd()+(document.body.classList.contains("mode-play")?"p":"d")}finally{br=!1}}}if(typeof ResizeObserver<"u"){const e=new ResizeObserver(()=>Qn()),t=document.querySelector(".top");t&&e.observe(t),e.observe(x("stageWrap"));const n=document.querySelector(".tools");n&&e.observe(n)}window.visualViewport&&(window.visualViewport.addEventListener("resize",()=>Qn()),window.visualViewport.addEventListener("scroll",()=>Qn()));D.addEventListener("scroll",()=>{D.scrollLeft=0,D.scrollTop=0});const $t=(e,t)=>{const n=D.getBoundingClientRect();return{x:(e-n.left)/n.width*X+K,y:(t-n.top)/n.height*Ce}},il=(e,t)=>{const n=D.getBoundingClientRect();return e>n.left&&e<n.right&&t>n.top&&t<n.bottom},Ed=(e,t)=>{const n=Wi.getBoundingClientRect();return e>n.left-20&&e<n.right+20&&t>n.top-20&&t<n.bottom+20},Jo=e=>Yo[e.size]??1,It=new Map;function ex(){return!y||qe===ee?!0:y.houses.get(xe)?.meta.ownerId===y.pid}function Fa(e){const t=ke[e.kind];return!t||!Fo(e.kind)?null:{id:e.id,kind:e.kind,x:e.x,footY:Gs(t,e.y),flip:!!e.flip,scale:et(e),w:t.w,h:Ke(t)}}function Et(e,t,n){if(!t)return n;const s=C.get().rooms[e]?.items.find(a=>a.id===t.item),o=s&&Fa(s);if(!o)return n;const i=of(o).find(a=>a.n===t.n);return i?{x:i.x,y:i.y}:n}function ia(e,t){const n=C.get(),s=[];for(const o of n.characters){if(o.id===e||o.room!==n.currentRoom)continue;const i=xt(o);i&&s.push({item:i.item,n:i.n})}if(y&&S==="house"){const o=(a,r)=>{if(a===t||r.where!=="house"||r.houseId!==xe||r.room!==n.currentRoom)return;const l=us(a,r);l&&s.push({item:l.item,n:l.n})};y.presence.forEach((a,r)=>o(r,a));const i=me();i&&y.pid!==t&&o(y.pid,i)}return s}function Hg(e,t){t?It.set(e,t):It.delete(e)}function yo(e,t,n,s,o){const a=!y||qe===ee||!!y?.speaksSit;a?It.delete("c:"+e):Hg("c:"+e,o),a?C.dispatch({type:"char/move",id:e,room:t,x:n,y:s,seat:o}):C.dispatch({type:"char/move",id:e,room:t,x:n,y:s})}function Ei(e,t,n,s,o){const{seat:i,...a}=e;if(y&&!y.speaksSit){Hg("p:"+y.pid,o?{item:o.id,pose:o.pose,n:o.n}:null),Te({...a,x:t,y:n,flip:s});return}y&&It.delete("p:"+y.pid),Te(o?{...a,x:t,y:n,flip:s,seat:o}:{...a,x:t,y:n,flip:s})}function xt(e){return e.seat?e.seat:It.get("c:"+e.id)??null}function us(e,t){return t.seat?{item:t.seat.id,pose:t.seat.pose,n:t.seat.n}:It.get("p:"+e)??null}function aa(e,t){const n=C.get(),s=document.elementsFromPoint(e,t),o=new Set;for(let i=0;i<s.length;i++){const a=s[i];if(!a||!a.closest)continue;const r=a.closest(".item");if(!r)continue;const l=r.dataset.id;if(!l||o.has(l))continue;o.add(l);const c=n.rooms[n.currentRoom].items.find(d=>d.id===l);if(c&&Fo(c.kind))return c}return null}function tx(e){const t=Wa(e);if(t)return"k-bed k-bed-"+t.clip;const n=e.toLowerCase();return/sofa|couch|loveseat/.test(n)?"k-sofa":/bench/.test(n)?"k-bench":/chair|stool|rocker/.test(n)?"k-chair":""}function nx(){const e=C.get(),t=new Map,n=(s,o)=>{const i=t.get(s);t.set(s,i===void 0?o:Math.max(i,o))};for(const s of e.characters){const o=s.room===e.currentRoom?xt(s):null;o&&n(o.item,o.n)}if(y&&S==="house"){const s=(i,a)=>{const r=a.where==="house"&&a.houseId===xe&&a.room===e.currentRoom?us(i,a):null;r&&n(r.item,r.n)};y.presence.forEach((i,a)=>s(a,i));const o=me();o&&s(y.pid,o)}return t}function sx(e,t){const n=Jo(e),s=qa(e,Pl(xt(e)?.pose))[t];let o=s.x;e.flip&&(o=100-o);const i=Et(e.room,xt(e),e);return{x:i.x+(o-50)/100*qn*n,y:i.y-jt*n+s.y/160*jt*n}}function Pg(e){const t=C.get();let n=null;for(const s of t.characters){if(s.room!==t.currentRoom)continue;const o=Jo(s),i=Et(s.room,xt(s),s),a=Math.abs(e.x-i.x)<qn*o/2+25&&e.y>i.y-jt*o-25&&e.y<i.y+20;for(const r of["left","right"]){if(s.held[r])continue;const l=sx(s,r),c=Math.hypot(e.x-l.x,e.y-l.y);(a||c<75)&&(!n||c<n.d)&&(n={c:s,hand:r,d:c})}}return n}const Tg=["none","radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)","repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)","linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)"],Wg="repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 125px), linear-gradient(rgba(0,0,0,.06), transparent 50%)",al=e=>`url('${e.replace(/'/g,"%27")}')`;function Rg(e){const t=e.rooms[e.currentRoom],n=x("wall"),s=x("floor"),o=t.wallTile?Jc[t.wallTile]:void 0;n.style.backgroundColor=t.wallpaper,o?(n.style.backgroundImage=al(o.url),n.style.backgroundSize="220px auto",n.style.backgroundPosition="0 0"):(n.style.backgroundImage=Tg[t.pattern]??"none",n.style.backgroundSize=t.pattern===1?"44px 44px":t.pattern===3?"60px 60px":"auto",n.style.backgroundPosition=t.pattern===3?"0 0, 30px 30px":"0 0");const i=t.floorTile?Jc[t.floorTile]:void 0;s.style.backgroundColor=t.floor,s.style.backgroundImage=i?`${al(i.url)}, linear-gradient(rgba(0,0,0,.06), transparent 50%)`:Wg,s.style.backgroundSize=i?"180px auto, auto":"auto",x("mmWall").style.background=t.wallpaper,x("mmFloor").style.background=t.floor,Ag(e)}function ra(e){const n=e.rooms[e.currentRoom].items.filter(o=>ke[o.kind]).map(o=>{const i=ke[o.kind];return`<i style="left:${o.x/ge*100}%;top:${(Gs(i,o.y)-Ke(i)*et(o)/2)/Ce*100}%"></i>`}).join(""),s=e.characters.filter(o=>o.room===e.currentRoom).map(o=>{const i=Et(e.currentRoom,xt(o),o);return`<b style="left:${i.x/ge*100}%;top:${(i.y-90)/Ce*100}%;background:${o.shirt}"></b>`}).join("");x("mmDots").innerHTML=n+s}function Eg(e){const t=Sg();sl=t?"c":"f",document.body.classList.toggle("tabs-compact",t),x("tabs").innerHTML=Fl.map(n=>{const s=t?Y5[n.id]??n.name:n.name;return`<button class="tab ${e.currentRoom===n.id||e.currentRoom==="backyard"&&n.id==="living"?"on":""}" data-room="${n.id}" style="--c:${n.color}" aria-label="${n.name}">${t?K5:""}${s}</button>`}).join("")}function vs(e,t,n,s,o){e.style.left=(t-s/2)/ge*100+"%",e.style.top=(n-o)/Ce*100+"%",e.style.width=s/ge*100+"%",e.style.height=o/Ce*100+"%"}function Qg(e,t){let n=e.w*t,s=Ke(e)*t;if((e.kind==="kennel"||e.kind==="cat-tower")&&document.body.classList.contains("phone")){const o=Math.max(.2,Je()||1),i=44*ge/(Math.max(1,X)*o),a=44/o;n<i&&(n=i),s<a&&(s=a)}return{w:n,h:s}}function Pt(e){const t=e.rooms[e.currentRoom],n=new Set;for(const s of t.items){const o=ke[s.kind];if(!o)continue;n.add(s.id);let i=J.querySelector(`.item[data-id="${s.id}"]`);i||(i=document.createElement("div"),i.className="item",i.dataset.id=s.id,i.innerHTML=`<div class="inner">${Ft(o,!0)}</div>`,J.appendChild(i),i.addEventListener("pointerdown",l=>yx(i,l))),i.dataset.kind=s.kind,i.classList.toggle("is-light",s5(s.kind,!!o.light));const a=Qg(o,et(s));vs(i,s.x,Gs(o,s.y),a.w,a.h);const r=1e3+s.z;i.style.zIndex=String(r),i.style.setProperty("--iz",String(r)),i.classList.toggle("flipped",s.flip),i.classList.toggle("sel",Ue===s.id)}J.querySelectorAll(".item").forEach(s=>{n.has(s.dataset.id)||s.remove()}),Ag(e),lx(),Xl(),Ug(e),ra(e)}function Xl(){const e=C.get(),t=nx(),n=new Set;t.forEach((s,o)=>{const i=e.rooms[e.currentRoom]?.items.find(g=>g.id===o),a=i&&ke[i.kind],r=i&&tx(i.kind);if(!i||!a||!r)return;n.add(o);let l=J.querySelector(`.seatFront[data-id="${o}"]`);l||(l=document.createElement("div"),l.className="seatFront",l.dataset.id=o,J.appendChild(l));const c=J.querySelector(`.item[data-id="${o}"] .inner`),d=l.querySelector(".inner");(!d||c&&d.innerHTML!==c.innerHTML)&&(l.innerHTML=`<div class="inner">${c?c.innerHTML:Ft(a,!0)}</div>`),l.className="seatFront "+r+(i.flip?" flipped":"");const f=Qg(a,et(i));vs(l,i.x,Gs(a,i.y),f.w,f.h),l.style.zIndex=String(1e3+i.z+3)}),J.querySelectorAll(".seatFront").forEach(s=>{n.has(s.dataset.id||"")||s.remove()})}let ms=!1,Qd=0;function Jl(e){performance.now()-Qd<80||(Qd=performance.now(),R_(e))}function ox(e,t){const n=D.querySelector(".yardDoor");if(!n)return null;const s=o=>{if(!o)return!1;const i=o.getBoundingClientRect();return i.width>2&&i.height>2&&e>=i.left&&e<=i.right&&t>=i.top&&t<=i.bottom};return s(n.querySelector(".yardHintLabel"))||s(n.querySelector(".doorArt"))||s(n)?n:null}function ix(e){e.addEventListener("pointerdown",t=>{if(t.button!==0)return;t.stopPropagation();const n=e.dataset.yardGo==="backyard"?"backyard":"living",s=t.clientX,o=t.clientY,i=t.pointerId;ms=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),ms=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),Jl(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)})}D.addEventListener("pointerdown",e=>{if(e.button!==0)return;const t=ox(e.clientX,e.clientY);if(!t||e.target instanceof Node&&t.contains(e.target))return;e.stopPropagation(),e.preventDefault();const n=t.dataset.yardGo==="backyard"?"backyard":"living",s=e.clientX,o=e.clientY,i=e.pointerId;ms=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),ms=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),Jl(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)},!0);function ax(e,t){return e.width>2&&t.width>2&&e.left<t.right-1&&e.right>t.left+1&&e.top<t.bottom-1&&e.bottom>t.top+1}function Ad(e){const t=e.getBoundingClientRect();let n=0;J.querySelectorAll(".item").forEach(s=>{if(s.classList.contains("is-light"))return;const o=ke[s.dataset.kind||""];if(!o||o.wall||!ax(s.getBoundingClientRect(),t))return;const i=parseInt(s.style.zIndex||"0",10)||0;i>n&&(n=i)}),e.style.zIndex=n?String(n+2):"2"}function Ag(e){const t=e.rooms[e.currentRoom];f3(x("scenery"),e.currentRoom,t.items),x("scenery").querySelectorAll(".yardDoor").forEach(o=>o.remove());const n=e.currentRoom==="living"?"backyard":e.currentRoom==="backyard"?"living":"",s=J.querySelector(".yardDoor");if(!n)J.querySelectorAll(".yardDoor").forEach(o=>o.remove());else if(!s||s.dataset.yardGo!==n){J.querySelectorAll(".yardDoor").forEach(i=>i.remove()),J.insertAdjacentHTML("beforeend",Gw(n==="backyard"?"living":"yard"));const o=J.querySelector(".yardDoor");o&&ix(o)}D.classList.toggle("room-yard",e.currentRoom==="backyard"),ua(),ms||Ln()}const Tt=new Map;function rx(e){const t=Jo(e),n=qn*t,s=jt*t,o=qa(e,Pl(xt(e)?.pose)),i=e.look2?.85:1;return["left","right"].map(a=>{const r=e.held[a],l=r&&ke[r.kind];if(!r||!l)return"";const c=et(r),d=Math.min(.7,120*t/Math.max(l.w,Ke(l))/c)*i,f=l.w*c*d,g=Ke(l)*c*d,h=o[a].x/100*n,u=o[a].y/160*s;return`<div class="held ${r.flip?"flipped":""}" data-hand="${a}" style="left:${(h-f/2)/n*100}%;top:${(u-g*.62)/s*100}%;width:${f/n*100}%;height:${g/s*100}%"><div class="inner">${Ft(l)}</div></div>`}).join("")}function lx(){let e=J.querySelector("#skyPuddles");e||(e=document.createElement("div"),e.id="skyPuddles",e.className="skyPuddles"),J.appendChild(e);const t=[...J.querySelectorAll(".item.is-light")];for(;e.children.length>t.length;)e.lastElementChild.remove();for(;e.children.length<t.length;)e.appendChild(document.createElement("i"));t.forEach((n,s)=>{const o=e.children[s],i=parseFloat(n.style.left),a=parseFloat(n.style.top),r=parseFloat(n.style.width),l=parseFloat(n.style.height),c=n.dataset.kind==="window"||n.dataset.kind==="tv";o.style.left=i-.6*r+"%",o.style.top=a-(c?.38:.5)*l+"%",o.style.width=2.2*r+"%",o.style.height=2*l+"%",o.style.zIndex=String(parseInt(n.style.zIndex||"1000",10))})}function Ot(e){const t=e.characters.filter(n=>n.room===e.currentRoom);for(const[n,s]of Tt)t.some(o=>o.id===n)||(s.remove(),Tt.delete(n));for(const n of t){let s=Tt.get(n.id);s||(s=document.createElement("div"),s.className="char",s.dataset.cid=n.id,s.innerHTML='<div class="inner"></div><div class="hands"></div>',J.appendChild(s),Tt.set(n.id,s),vx(s));const o=xt(n),i=o?.pose??null,a=g0(n)+(i||"");s.dataset.look!==a&&(s.querySelector(".inner").innerHTML=tt(n,i),s.dataset.look=a);const r=JSON.stringify([n.held.left?.id,n.held.left?.flip,n.held.right?.id,n.held.right?.flip,n.size,i]);s.dataset.held!==r&&(s.querySelector(".hands").innerHTML=rx(n),s.dataset.held=r);const l=Jo(n),c=Et(e.currentRoom,o,n);vs(s,c.x,c.y,qn*l,jt*l),s.style.zIndex=String(o?1e3+(e.rooms[e.currentRoom].items.find(f=>f.id===o.item)?.z??0)+1+o.n:5e3+Math.round(n.y)),s.classList.toggle("flipped",n.flip),s.classList.toggle("pose-sit",i==="sit"),s.classList.toggle("pose-lie",i==="lie"),s.classList.toggle("pose-lie-r",i==="lie"&&!!e.rooms[e.currentRoom].items.find(f=>f.id===o?.item)?.flip),s.classList.toggle("active",n.id===Le),Go(s,n,n.id===Le),s.classList.toggle("pose-swing",ht?.id===n.id);const d=qa(n);s.style.setProperty("--hx-l",d.left.x+"%"),s.style.setProperty("--hx-r",d.right.x+"%")}ra(e)}function ki(){const e=D.getBoundingClientRect(),t=e.width/Math.max(1,X),n=6,o=document.body.classList.contains("phone")?1/Math.max(.2,t):1,i=pe.offsetWidth,a=pe.offsetHeight,r=parseFloat(pe.style.left)/100*ge,l=parseFloat(pe.style.top)/100*Ce,c=pe.classList.contains("below"),d=r,f=c?l+a/2:l-a/2,g=o*i/2,h=o*a/2,u=$=>e.left+(n+$-K)*t,b=$=>e.top+(n+$)*t,_=u(d-g),m=u(d+g),p=b(f-h),v=b(f+h);return{left:_,right:m,top:p,bottom:v,width:m-_,height:v-p}}function cx(){const e=D.getBoundingClientRect(),t=4;let n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t,o=Math.max(e.top,0)+t,i=Math.min(e.bottom,window.innerHeight)-t;for(const a of["nudgeL","nudgeR"]){const r=x(a);if(!r||r.classList.contains("off")||r.offsetParent===null)continue;const l=r.getBoundingClientRect();l.width<2||l.height<2||(a==="nudgeL"?n=Math.max(n,l.right+4):s=Math.min(s,l.left-4))}return s-n<48&&(n=Math.max(e.left,0)+t,s=Math.min(e.right,window.innerWidth)-t),{left:n,right:s,top:o,bottom:i}}function bi(e,t){pe.style.left=e/ge*100+"%",pe.style.top=t/Ce*100+"%"}function Ug(e){const t=Ue&&e.rooms[e.currentRoom].items.find(b=>b.id===Ue);if(we.isPlay()||!t||!ke[t.kind]){pe.classList.add("hidden"),pe.classList.remove("below"),pe.style.maxWidth="";return}const n=ke[t.kind],s=Gs(n,t.y),o=s-Ke(n)*et(t),i=12;pe.classList.remove("hidden"),pe.style.maxWidth="",pe.classList.remove("below"),bi(t.x,o-i);const a=cx();ki().top<a.top&&(pe.classList.add("below"),bi(t.x,s+i));let r=ki();const l=a.right-a.left;if(r.width>l-2&&l>60){const b=pe.offsetWidth*((l-8)/Math.max(1,r.width));pe.style.maxWidth=Math.max(76,b)+"px",!pe.classList.contains("below")&&ki().top<a.top&&(pe.classList.add("below"),bi(t.x,s+i)),r=ki()}let c=0,d=0;if(r.left<a.left&&(c=a.left-r.left),r.right+c>a.right&&(c=a.right-r.right),r.width>a.right-a.left&&(c=(a.left+a.right)/2-(r.left+r.right)/2),r.top<a.top&&(d=a.top-r.top),r.bottom+d>a.bottom&&(d=a.bottom-r.bottom),Math.abs(c)>=.5||Math.abs(d)>=.5){const b=D.getBoundingClientRect().width/Math.max(1,X)||1,_=parseFloat(pe.style.left)/100*ge+c/b,m=parseFloat(pe.style.top)/100*Ce+d/b;bi(_,m)}const f=ds(t.size),g=rs.indexOf(f),h=pe.querySelector('[data-a="smaller"]'),u=pe.querySelector('[data-a="bigger"]');h&&(h.disabled=g<=0),u&&(u.disabled=g>=rs.length-1)}function zg(e){const t=x("soundIco");t&&(t.innerHTML=e.soundOn?bt.soundOn:bt.soundOff),x("btnSound").setAttribute("aria-label",e.soundOn?"Sound on":"Sound off"),G$(e.soundOn)}function ys(){const e=C.get();J.innerHTML="",Tt.clear(),Eg(e),Rg(e),Pt(e),Ot(e),zg(e);const t=e.characters.find(o=>o.room===e.currentRoom),n=y&&me(),s=n&&n.where==="house"?n.x:t?.x;Oa(),Pe(oa[e.currentRoom]??Gl(s!==void 0?s-X/2:Fs)),mt(),Vt(),document.body.classList.contains("phone")&&S==="house"&&requestAnimationFrame(()=>Lg())}const Ud=200,dx=2,la=[];let rl=0,Qi=!1,vr=0;const Dg=new Map;function ll(e){const t=document.getElementById("shelf");if(!t)return!1;const n=t.getBoundingClientRect();if(n.width<2||n.height<2)return!1;const s=e.getBoundingClientRect();return s.right>n.left-Ud&&s.left<n.right+Ud&&s.bottom>n.top-8&&s.top<n.bottom+8}const fx=3,ca=new Map;function cl(e,t){const n=(ca.get(t)||0)+1;if(ca.set(t,n),delete e.dataset.shelfq,n>=fx){delete e.dataset.artq;return}setTimeout(ec,300*n)}function Ps(){rl--,!Qi&&qg()}function zd(e,t){const n=document.createElement("div");n.innerHTML=Ft(t);const s=n.querySelector("img.artimg");if(!s){delete e.dataset.artq,Ps();return}const o=ca.get(t.kind)||0;if(o>0){const l=s.getAttribute("src")||"";s.setAttribute("src",l+(l.indexOf("?")>=0?"&":"?")+"retry="+o)}let i=!1;const a=l=>{if(!i){if(i=!0,l){const c=Array.prototype.slice.call(n.childNodes);if(Dg.set(t.kind,c),ca.delete(t.kind),e.isConnected&&e.dataset.artq==="1"){delete e.dataset.artq,e.innerHTML="";for(let d=0;d<c.length;d++)e.appendChild(c[d])}else{const d=document.querySelector(`#shelf button.thing[data-artq="1"][data-kind="${CSS.escape(t.kind)}"]`);if(d){delete d.dataset.artq,d.innerHTML="";for(let f=0;f<c.length;f++)d.appendChild(c[f])}}}else e.isConnected&&e.dataset.artq==="1"&&cl(e,t.kind);Ps()}},r=()=>{typeof s.decode=="function"?s.decode().then(()=>a(!0),()=>a(!0)):a(!0)};s.onload=r,s.onerror=()=>a(!1),s.complete&&s.naturalWidth>0&&r()}function qg(){if(!Qi){for(Qi=!0;rl<dx&&la.length;){const e=la.shift();if(!e||!e.isConnected||e.dataset.artq!=="1")continue;if(!ll(e)){delete e.dataset.shelfq;continue}const t=e.dataset.kind||"",n=ke[t];if(!n){delete e.dataset.artq;continue}if(rl++,Qo(t)){zd(e,n);continue}wa(()=>import("./load-CKZV8ru9.js"),[]).then(s=>s.loadArtKinds([t])).then(()=>{if(!e.isConnected||e.dataset.artq!=="1"){Ps();return}if(!Qo(t)){cl(e,t),Ps();return}if(!ll(e)){delete e.dataset.shelfq,Ps();return}zd(e,n)},()=>{e.isConnected&&e.dataset.artq==="1"&&cl(e,t),Ps()})}Qi=!1}}function gx(){const e=document.getElementById("shelf");if(!e||!za())return;const t=e.querySelectorAll('button.thing[data-artq="1"]');for(let n=0;n<t.length;n++){const s=t[n];s.dataset.shelfq!=="1"&&ll(s)&&(s.dataset.shelfq="1",la.push(s))}qg()}function ec(){vr||(vr=requestAnimationFrame(()=>{vr=0,gx()}))}function hx(){const e=document.getElementById("shelf");!e||e.dataset.artscroll==="1"||(e.dataset.artscroll="1",e.addEventListener("scroll",ec,{passive:!0}))}function Zg(){const e=document.getElementById("shelf");if(!e||!za())return;const t=e.querySelectorAll("button.thing[data-kind]");for(let n=0;n<t.length;n++){const s=t[n],o=s.dataset.kind||"";s.querySelector("img.artimg")||!(vc(o)||Qo(o))||(s.dataset.artq="1")}ec()}function Ig(){if(dt==="__people"){ut();return}Zg()}function px(e){const t=ff();if(!y)return;const n=me();if(!n||n.where!=="house"||!n.seat)return;let s="";if(e.type==="item/flip"||e.type==="item/delete")s=e.id;else if(e.type==="item/move"&&e.stand)s=e.id;else if(e.type==="char/hold")s=e.itemId;else return;if(!s||n.seat.id!==s||e.room!==n.room)return;const o=t&&t.id===s?t:null,i=o?Hr(o.kind)*(o.scale||1):Hr("bed"),a=af(o?o.x:n.x,i,n.x);It.delete("p:"+y.pid);const{seat:r,...l}=n;Te({...l,x:a.x,y:a.y})}C.subscribe((e,t)=>{switch(px(t),t.type){case"room/switch":{const n=D.classList.contains("room-yard");y&&qe!==ee&&Mx(t.room),ys(),ut(),(t.room==="backyard"||n||we.isPlay()&&Math.min(window.innerWidth,window.innerHeight)<500)&&Zn(),Ch(t.room);break}case"item/add":Pt(e),F5(),P_();break;case"game/reset":ys();break;case"room/wallpaper":case"room/floor":case"room/pattern":case"room/wallTile":case"room/floorTile":Rg(e);break;case"char/update":case"char/move":t.type==="char/move"&&ht&&!ko&&t.id===ht.id&&(ht=null),Ot(e),Xl(),ua(),S==="ranch"?Rn():S==="park"&&bs();break;case"char/add":case"char/delete":case"char/hold":case"char/release":Pt(e),Ot(e),mt(),dt==="__people"&&ut();break;case"item/move":case"item/flip":case"item/delete":case"item/size":Pt(e),Ot(e),mt();break;case"settings/sound":zg(e);break;default:Pt(e)}});function Xe(e){if(!e)return;const t=e.querySelector(":scope > .inner")??e;t.classList.remove("bounce"),t.offsetWidth,t.classList.add("bounce")}function tc(e,t,n=7){const s=x("fx"),o=["#ffd166","#ff8fab","#8ecae6","#80ed99","#c9a0dc"];for(let i=0;i<n;i++){const a=document.createElement("div");a.className="spark";const r=Math.PI*2*i/n+Math.random()*.5,l=40+Math.random()*30;a.style.left=e+"px",a.style.top=t+"px",a.style.background=o[i%o.length],a.style.setProperty("--dx",Math.cos(r)*l+"px"),a.style.setProperty("--dy",Math.sin(r)*l+"px"),s.appendChild(a),setTimeout(()=>a.remove(),650)}}const ja=e=>{const t=e?.getBoundingClientRect();t&&tc(t.left+t.width/2,t.top+t.height/2)};function nc(e,t){tc(e,t,10),B.pop()}function da(e){Tt.forEach((t,n)=>{t.classList.toggle("hold-target",!!e&&e.c.id===n),t.dataset.hand=e&&e.c.id===n?e.hand:""})}function Og(e,t){C.dispatch({type:"char/hold",id:e.c.id,hand:e.hand,room:e.c.room,itemId:t}),Ue=null,Pt(C.get());const n=Tt.get(e.c.id);Xe(n),ja(n?.querySelector(`.held[data-hand="${e.hand}"]`)),B.sparkle()}const Nt=new Map;let _t=!1,fa=0;const sc=()=>[...Nt.values()].reduce((e,t)=>e+t,0)/Nt.size;D.addEventListener("pointerdown",e=>{e.pointerType==="touch"&&(Nt.set(e.pointerId,e.clientX),Nt.size>=2&&(_t=!0,fa=sc(),Oa(),pe.classList.add("hidden")))},!0);window.addEventListener("pointermove",e=>{if(Nt.has(e.pointerId)&&(Nt.set(e.pointerId,e.clientX),_t&&Nt.size>=2)){const t=sc();Pe(K-(t-fa)/Je()),fa=t}},!0);const Ng=e=>{Nt.delete(e.pointerId),Nt.size<2&&_t&&(Nt.size===0?_t=!1:fa=sc())};window.addEventListener("pointerup",Ng,!0);window.addEventListener("pointercancel",Ng,!0);const Cs=80;function ux(e,t){const n=D.getBoundingClientRect();return t<n.top-40||t>n.bottom+10?0:e<n.left+Cs?-Math.min(1,(n.left+Cs-e)/Cs)*16:e>n.right-Cs?Math.min(1,(e-(n.right-Cs))/Cs)*16:0}function In(e,t){let n=e,s=0;const o=()=>{const r=_t?0:ux(n.clientX,n.clientY);if(r){const l=K;Pe(K+r),K!==l&&t.onMove(n)}s=requestAnimationFrame(o)};t.edgeScroll!==!1&&(s=requestAnimationFrame(o));const i=r=>{r.pointerId===e.pointerId&&(r.preventDefault(),n=r,_t||t.onMove(r))},a=r=>{r.pointerId===e.pointerId&&(cancelAnimationFrame(s),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",a),t.onUp(r))};window.addEventListener("pointermove",i,{passive:!1}),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a)}function mx(e){return new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,pointerId:e.pointerId,pointerType:e.pointerType,button:e.button,buttons:e.buttons,isPrimary:e.isPrimary})}function yx(e,t){const n=t.target,s=n&&n.closest?n.closest("img.artimg"):null;if(s&&!Al(s,t.clientX,t.clientY)){const o=a$(t.clientX,t.clientY),i=o?.closest(".item"),a=o?.closest(".char");i&&i!==e?(t.stopPropagation(),dl(i,t)):a&&(t.stopPropagation(),a.dispatchEvent(mx(t)));return}dl(e,t)}function kx(e,t){if(t.preventDefault(),t.stopPropagation(),_t)return;const n=e.dataset.id,s=t.clientX,o=t.clientY;In(t,{edgeScroll:!1,onMove(){},onUp(i){Math.hypot(i.clientX-s,i.clientY-o)>6||e_(e,n)}})}function dl(e,t,n=!1){if(t.preventDefault(),t.stopPropagation(),_t)return;if(we.isPlay()){kx(e,t);return}if(!Mt()){An(e);return}const s=C.get(),o=s.currentRoom,i=e.dataset.id,a=s.rooms[o].items.find(g=>g.id===i);if(!a)return;const r=ke[a.kind],l=$t(t.clientX,t.clientY),c={x:a.x-l.x,y:a.y-l.y};let d=n,f=null;Ue=i,C.dispatch({type:"item/front",room:o,id:i}),e.classList.add("lifted"),B.pick(),In(t,{onMove(g){const h=$t(g.clientX,g.clientY);Math.hypot(h.x-l.x,h.y-l.y)>6&&(d=!0),d&&(pe.classList.add("hidden"),Wi.classList.add("show")),Wi.classList.toggle("hot",Ed(g.clientX,g.clientY));const u=r.w*et(a)/2;C.dispatch({type:"item/move",room:o,id:i,x:Math.max(u*.6,Math.min(ge-u*.6,h.x+c.x)),y:mg(r,h.y+c.y),...d?{stand:!0}:{}}),d&&pe.classList.add("hidden"),f=d&&r.holdable?Pg(h):null,da(f)},onUp(g){if(e.classList.remove("lifted"),Wi.classList.remove("show","hot"),da(null),d&&Ed(g.clientX,g.clientY)){Ue=null,C.dispatch({type:"item/delete",room:o,id:i}),nc(g.clientX,g.clientY);return}if(d&&f){Og(f,i);return}d?(B.drop(),Xe(e)):(B.click(),dh(i),o3(e)),Pt(C.get())}})}function bx(e,t,n){if(n.preventDefault(),n.stopPropagation(),_t||we.isPlay())return;const s=e.dataset.cid,o=t.dataset.hand,i=C.get().characters.find(d=>d.id===s),a=i?.held[o];if(!i||!a)return;const r=t.getBoundingClientRect(),l=$t(r.left+r.width/2,r.bottom);C.dispatch({type:"char/release",id:s,hand:o,x:l.x,y:l.y});const c=J.querySelector(`.item[data-id="${a.id}"]`);c&&dl(c,n,!0)}function vx(e){e.addEventListener("pointerdown",t=>{const n=t.target.closest(".held"),s=n?.querySelector("img.artimg"),o=!!s&&!Al(s,t.clientX,t.clientY);if(n&&!o){if(we.isPlay()){t.preventDefault(),t.stopPropagation();return}if(!Mt()){t.stopPropagation(),An(e);return}return bx(e,n,t)}if(t.preventDefault(),t.stopPropagation(),_t||we.isPlay()&&!ex())return;if(!Mt()){An(e);return}Ue=null,Pt(C.get());const i=e.dataset.cid;Le=i;const a=C.get(),r=a.characters.find(h=>h.id===i);if(!r)return;const l=$t(t.clientX,t.clientY),c=Et(a.currentRoom,xt(r),r),d={x:c.x-l.x,y:c.y-l.y};let f=c.x,g=!1;e.classList.add("lifted"),B.pick(),Ot(C.get()),Do=!0,In(t,{onMove(h){const u=$t(h.clientX,h.clientY),b=u.x+d.x;if(Math.hypot(u.x-l.x,u.y-l.y)>6&&(g=!0),!g)return;const _=C.get().characters.find(p=>p.id===i);if(!_)return;if(Math.abs(b-f)>3){const p=b<f;p!==_.flip&&C.dispatch({type:"char/update",id:i,patch:{flip:p}}),f=b}const m=Math.max(Zs+40,u.y+d.y);yo(i,a.currentRoom,b,m,null),we.isPlay()&&(zo=aa(h.clientX,h.clientY)?.id??null),document.querySelectorAll(".tab").forEach(p=>p.classList.remove("drop")),document.elementFromPoint(h.clientX,h.clientY)?.closest(".tab:not(.on)")?.classList.add("drop")},onUp(h){Do=!1,zo=null,e.classList.remove("lifted"),document.querySelectorAll(".tab").forEach(v=>v.classList.remove("drop"));const u=document.elementFromPoint(h.clientX,h.clientY)?.closest("[data-room]"),b=C.get().characters.find(v=>v.id===i);if(!g||!b){B.click();return}if(u&&u.dataset.room!==a.currentRoom){const v=u.getBoundingClientRect();tc(v.left+v.width/2,v.top+v.height/2,9),B.swish(),yo(i,u.dataset.room,b.x,b.y,null);return}const _=$t(h.clientX,h.clientY),m=_.x+d.x,p=Math.max(Zs+40,_.y+d.y);if(we.isPlay()){const v=aa(h.clientX,h.clientY),$=Ii({mode:"play",via:"drag",releaseX:m,releaseY:p,piece:v?Fa(v):null,occupied:ia(i)});yo(i,a.currentRoom,$.x,$.y,$.seat)}else yo(i,a.currentRoom,m,p,null);B.drop(),Xe(e),requestAnimationFrame(()=>ps(!0))}})})}function wx(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),we.isPlay()){n.stopPropagation();return}if(!Mt()){An(e);return}const s=document.createElement("div");s.className="ghost",s.innerHTML=Ft(t),document.body.appendChild(s);const o=Math.max(1,60/(Math.max(t.w,Ke(t))*Je())),i=t.w*Je()*o,a=Ke(t)*Je()*o;s.style.width=i+"px",s.style.height=a+"px";let r=null;const l=f=>{s.style.left=f.clientX-i/2+"px",s.style.top=f.clientY-a*.8+"px",r=t.holdable&&il(f.clientX,f.clientY)?Pg($t(f.clientX,f.clientY)):null,da(r)};l(n),B.pick(),e.classList.add("pressed");const c=n.clientX,d=n.clientY;In(n,{onMove:l,onUp(f){s.remove(),e.classList.remove("pressed"),da(null);const g=C.get().currentRoom,h=Math.hypot(f.clientX-c,f.clientY-d)<8;let u,b;if(h)u=K+380+Math.random()*240,b=t.wall?Math.min(ug,200+Ke(t)/2):500+Math.random()*40;else if(il(f.clientX,f.clientY)){const p=$t(f.clientX,f.clientY);u=p.x,b=mg(t,p.y+Ke(t)*.2)}else return;const _={id:ol(t.kind.replace(/[^a-z0-9-]/gi,"")),kind:t.kind,x:u,y:b,flip:!1,z:0,scale:1};if(g!=="backyard"&&C.get().rooms[g].items.length===0){const p=c3(v=>ol(v),g);for(let v=0;v<p.length;v++)C.dispatch({type:"item/add",room:g,item:p[v]})}if(C.dispatch({type:"item/add",room:g,item:_}),!h&&r){Og(r,_.id);return}Ue=_.id,Pt(C.get());const m=J.querySelector(`.item[data-id="${_.id}"]`);Xe(m),ja(m),B.sparkle()}})})}function $x(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),we.isPlay())return;if(!Mt()){An(e);return}const s=C.get().characters.find(g=>g.id===t);if(!s)return;const o=Jo(s),i=qn*o*Je(),a=jt*o*Je(),r=document.createElement("div");r.className="ghost",r.innerHTML=tt(s),r.style.width=i+"px",r.style.height=a+"px",document.body.appendChild(r);const l=g=>{r.style.left=g.clientX-i/2+"px",r.style.top=g.clientY-a*.85+"px"},c=n.clientX,d=n.clientY;let f=!1;r.style.visibility="hidden",In(n,{onMove(g){Math.hypot(g.clientX-c,g.clientY-d)>8&&(f=!0,r.style.visibility=""),l(g)},onUp(g){if(r.remove(),!f){B.click(),Le=t,Os("dress");return}if(!il(g.clientX,g.clientY))return;const h=$t(g.clientX,g.clientY),u=C.get().currentRoom;C.dispatch({type:"char/move",id:t,room:u,x:h.x,y:Math.max(Zs+40,h.y+jt*o*.15)}),Le=t,Ot(C.get());const b=Tt.get(t);Xe(b),ja(b),B.sparkle()}})})}function Fg(){if(!Mt())return An(null),null;const e=C.get();if(e.characters.length>=js)return null;const t=ol("c"),n=Pa();C.dispatch({type:"char/add",char:En({id:t,...Ha(n),look2:n,room:e.currentRoom,x:K+300+Math.random()*400,y:520+Math.random()*40})}),Le=t,Ot(C.get());const s=Tt.get(t);return Xe(s),ja(s),B.sparkle(),t}function xx(){return Vl==="all"?"all":C.get().currentRoom}function ut(){const e=C.get().currentRoom,t=xx(),n=Fl.find(l=>l.id===e)?.name??"This room",s=t==="all";x("roomFilter").innerHTML=`<button class="rf ${s?"on":""}" data-rf="${s?"room":"all"}">${s?"Just "+n:"All rooms"}</button>`;const o=kr("secrets").length>0,i=Is.filter(l=>l.id!=="secrets"&&(l.kind==="people"||l.kind==="pack"&&e!=="backyard"||kr(l.id).length));!(dt==="secrets"&&o)&&!i.some(l=>l.id===dt)&&(dt=i[1]?.id??"__people"),x("cats").innerHTML=i.map(l=>`<button class="cat ${l.kind} ${l.id===dt?"on":""}" data-cat="${l.id}" aria-label="${l.name}" title="${l.name}">${l.kind==="people"?E5:l.kind==="pack"?`<span class="packicon">${Ft(ke[l.icon])}</span><span class="packname">${l.name}</span>`:Ft(ke[l.icon])}</button>`).join("")+(o?`<button class="cat secretTab ${dt==="secrets"?"on":""}" data-cat="secrets" aria-label="Secrets" title="Secrets">🎁</button>`:"");const a=x("shelf");if(la.length=0,a.innerHTML="",!Mt()){a.innerHTML='<div class="empty locked">🔒 This house is look-only right now</div>';return}if(dt==="__people"){const l=C.get(),c=ks();if(c){const d=document.createElement("button");d.className="thing person me",d.setAttribute("aria-label","Me"),d.innerHTML=`<div class="face">${tt(c)}</div><span class="meStar">★</span>`,d.addEventListener("click",()=>{B.click(),Le=Ye,Os("dress")}),a.appendChild(d)}for(const d of l.characters){const f=document.createElement("button");f.className="thing person",f.setAttribute("aria-label","Character"),f.innerHTML=`<div class="face">${tt(d)}</div><span class="where" style="background:${kg(d.room)}"></span>`,a.appendChild(f),$x(f,d.id)}if(l.characters.length<js){const d=document.createElement("button");d.className="thing add",d.setAttribute("aria-label","New character"),d.innerHTML=bg,d.addEventListener("click",()=>{Fg()&&(ut(),Os("dress"))}),a.appendChild(d)}return}const r=kr(dt);r.length||(a.innerHTML='<div class="empty">Nothing here yet!</div>');for(const l of r){const c=document.createElement("button");c.className="thing",c.setAttribute("aria-label",l.name),c.dataset.kind=l.kind;const d=za()&&Qo(l.kind)?Dg.get(l.kind):void 0;if(d)for(let f=0;f<d.length;f++)c.appendChild(d[f]);else c.innerHTML=n$(l,vc(l.kind));a.appendChild(c),wx(c,l)}a.scrollLeft=0,oc(),hx(),Zg()}function oc(){const e=document.querySelector(".drawerTop"),t=document.getElementById("drawerBar");!e||!t||t.classList.toggle("more",e.scrollWidth-e.clientWidth-e.scrollLeft>6)}document.querySelector(".drawerTop").addEventListener("scroll",oc,{passive:!0});window.addEventListener("resize",oc);function Dd(e,t,n){return`<div class="sw">${e.map(s=>`<button class="dot ${s===t?"on":""}" style="background:${s}" data-act="${n}" data-v="${s}"></button>`).join("")}</div>`}let qo=null,Ts=!1;function _x(e){if(e===Ye){const n=ks();if(!n||n.look2)return;wn(Ye,Ho(Di(n)));return}const t=C.get().characters.find(n=>n.id===e);!t||t.look2||wn(e,{...Ho(Di(t)),size:t.size})}function tn(){const e=C.get(),t=x("card");if(qo==="paint"){t.classList.remove("avCard");const n=e.rooms[e.currentRoom],s=qr.filter(a=>a.kind==="wallpaper"),o=qr.filter(a=>a.kind==="floor"),i=(a,r,l,c)=>`<button class="dot pat tile ${a.id===r?"on":""}" data-act="${l}" data-v="${a.id}" title="${a.name} (${Cf(a.pack)})" style="background-color:${c};background-image:${al(a.url)};background-size:48px auto"></button>`;t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${Dd(W5,n.wallpaper,"wall")}
      <h3>Wallpaper</h3><div class="sw">${Tg.map((a,r)=>`<button class="dot pat ${!n.wallTile&&r===n.pattern?"on":""}" data-act="pat" data-v="${r}" style="background-color:${n.wallpaper};background-image:${a};background-size:${r===1?"16px 16px":r===3?"20px 20px":"auto"}"></button>`).join("")}${s.map(a=>i(a,n.wallTile,"wtile",n.wallpaper)).join("")}</div>
      <h3>Floor</h3>${Dd(R5,n.floor,"floor")}
      ${o.length?`<h3>Floor style</h3><div class="sw"><button class="dot pat ${n.floorTile?"":"on"}" data-act="ftile" data-v="" style="background-color:${n.floor};background-image:${Wg}"></button>${o.map(a=>i(a,n.floorTile,"ftile",n.floor)).join("")}</div>`:""}`}else if(qo==="dress"){t.classList.add("avCard");let n=e,s=ks(),o=s?En({id:Ye,...s}):null,i=Le===Ye&&o?o:n.characters.find(r=>r.id===Le)??o??n.characters[0];i&&!i.look2&&_x(i.id),n=C.get(),s=ks(),o=s?En({id:Ye,...s}):null,i=Le===Ye&&o?o:n.characters.find(r=>r.id===Le)??o??n.characters[0];const a=`<div class="picker">${o?`<button class="pk me ${i?.id===Ye?"on":""}" data-act="pickc" data-v="${Ye}"><div class="face">${tt(o)}</div><span class="meStar">★</span></button>`:""}${n.characters.map(r=>`<button class="pk ${r.id===i?.id?"on":""}" data-act="pickc" data-v="${r.id}"><div class="face">${tt(r)}</div><span class="where" style="background:${kg(r.room)}"></span></button>`).join("")}${n.characters.length<js?`<button class="pk add" data-act="newc">${bg}</button>`:""}</div>`;if(!i){t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${a}<div class="dress"><p class="hint">Tap + to make someone new!</p></div>`;return}Le=i.id,t.innerHTML=O$(i,a,Ts,bt.trash)}}function Os(e){qo=e,Ts=!1,tn(),x("sheet").classList.remove("hidden"),B.swish()}x("sheet").addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(e.target===x("sheet")||t?.dataset.act==="close"){x("sheet").classList.add("hidden"),qo=null,B.click(),dt==="__people"&&ut();return}if(!t)return;const n=C.get(),s=n.currentRoom,o=t.dataset.v,i=Le??"",a=t.dataset.act;if(a!=="delc"&&(Ts=!1),a&&a.indexOf("av-")===0){const r=i===Ye?ks():C.get().characters.find(d=>d.id===i);if(a==="av-surprise"){wn(i,{...Ho(Pa()),size:r?.size??"kid"}),B.sparkle(),tn(),Xe(document.querySelector(".avStage"));return}const l=r?.look2??Di(r??{}),c=N$(l,a,o??"");if(!c){B.click(),tn();return}wn(i,{...Ho(c),size:r?.size??"kid"}),B.sparkle(),tn(),Xe(document.querySelector(".avStage"));return}switch(a){case"wall":C.dispatch({type:"room/wallpaper",room:s,color:o});break;case"floor":C.dispatch({type:"room/floor",room:s,color:o});break;case"pat":C.dispatch({type:"room/pattern",room:s,pattern:+o});break;case"wtile":C.dispatch({type:"room/wallTile",room:s,tile:o});break;case"ftile":C.dispatch({type:"room/floorTile",room:s,tile:o||null});break;case"skin":case"hair":case"shirt":case"pants":wn(i,{[a]:o});break;case"hs":wn(i,{hairStyle:+o});break;case"acc":wn(i,{acc:+o});break;case"size":{const r=i===Ye?ks():C.get().characters.find(l=>l.id===i);wn(i,{size:o,...r?.look2?{look2:r.look2}:{}}),Ot(C.get());break}case"pickc":Le=o,Ot(C.get()),B.click(),tn();return;case"newc":if(!Fg())return;break;case"delc":if(i===Ye||!Mt())return;if(!Ts){Ts=!0,B.click(),tn();return}Ts=!1;{const l=Tt.get(i)?.getBoundingClientRect();C.dispatch({type:"char/delete",id:i}),l?nc(l.left+l.width/2,l.top+l.height/2):B.pop()}Le=C.get().characters[0]?.id??null,tn();return}B.sparkle(),tn(),Xe(document.querySelector(".preview"))});x("tabs").addEventListener("click",e=>{const t=e.target.closest("[data-room]");if(!t)return;const n=t.dataset.room;n!==C.get().currentRoom&&(Ue=null,B.swish(),D.classList.remove("swap"),D.offsetWidth,D.classList.add("swap"),C.dispatch({type:"room/switch",room:n}))});x("cats").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");t&&(dt=t.dataset.cat,B.click(),ut())});x("roomFilter").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");if(t){dt=t.dataset.cat,B.click(),ut();return}const n=e.target.closest("[data-rf]");n&&(Vl=n.dataset.rf==="all"?"all":"",B.click(),ut())});pe.addEventListener("pointerdown",e=>e.stopPropagation());pe.addEventListener("click",e=>{const t=e.target.closest("[data-a]");if(!t||!Ue)return;if(!Mt()){An(null);return}const n=C.get().currentRoom,s=Ue,o=J.querySelector(`.item[data-id="${s}"]`);switch(t.dataset.a){case"smaller":case"bigger":{const i=C.get().rooms[n].items.find(l=>l.id===s);if(!i)break;const a=rs.indexOf(ds(i.size)),r=t.dataset.a==="smaller"?a-1:a+1;if(r<0||r>=rs.length)break;C.dispatch({type:"item/size",room:n,id:s,size:rs[r]}),B.click(),Xe(o);break}case"flip":C.dispatch({type:"item/flip",room:n,id:s}),B.swish(),Xe(o);break;case"front":C.dispatch({type:"item/front",room:n,id:s}),B.click(),Xe(o);break;case"back":C.dispatch({type:"item/back",room:n,id:s}),B.click(),Xe(o);break;case"delete":{const i=o?.getBoundingClientRect();Ue=null,C.dispatch({type:"item/delete",room:n,id:s}),i&&nc(i.left+i.width/2,i.top+i.height/2);break}}});D.addEventListener("pointerdown",e=>{if(e.target.closest(".nudge"))return;Oa();const t=e.clientX,n=K;let s=!1,o=0,i=e.clientX,a=performance.now();In(e,{edgeScroll:!1,onMove(r){if(Math.abs(r.clientX-t)>6&&(s=!0),!s)return;const l=performance.now();o=(r.clientX-i)/Math.max(1,l-a),i=r.clientX,a=l,Pe(n-(r.clientX-t)/Je())},onUp(){if(!s){Ue&&(Ue=null,Pt(C.get()));return}if(_t)return;let r=-o*16/Je();const l=()=>{Math.abs(r)<.3||(Pe(K+r),r*=.92,Qs=requestAnimationFrame(l))};Qs=requestAnimationFrame(l)}})});D.addEventListener("wheel",e=>{e.preventDefault(),Oa(),Pe(K+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/Je())},{passive:!1});x("nudgeL").addEventListener("pointerdown",e=>{e.stopPropagation(),B.swish(),Na((Uo??K)-X*.6)});x("nudgeR").addEventListener("pointerdown",e=>{e.stopPropagation(),B.swish(),Na((Uo??K)+X*.6)});const qd=x("minimap");qd.addEventListener("pointerdown",e=>{e.stopPropagation(),e.preventDefault();const t=n=>{const s=qd.getBoundingClientRect();Na((n.clientX-s.left)/s.width*ge-X/2)};t(e),B.click(),In(e,{edgeScroll:!1,onMove:t,onUp(){}})});x("btnPaint").addEventListener("click",()=>{if(!Mt())return An(null);Os("paint")});x("btnDress").addEventListener("click",()=>Os("dress"));x("btnSound").addEventListener("click",()=>{C.dispatch({type:"settings/sound",on:!C.get().soundOn}),B.click()});document.addEventListener("gesturestart",e=>e.preventDefault());document.addEventListener("contextmenu",e=>e.preventDefault());"serviceWorker"in navigator&&navigator.serviceWorker.register("/kids-house-game/sw.js");window.__store=C;window.__items=Object.fromEntries(Yt.filter(e=>e.img).map(e=>[e.kind,{w:e.w,h:Ke(e),cat:e.cat,holdable:e.holdable,svg:e.img.includes(".svg")}]));window.__cam={get:()=>K,set:Pe};window.__phoneShowKids=()=>ze();window.__avatar={richAvatars:ql,randomLook2:Pa,look2FromLegacy:Di,legacyFromLook2:Ha,sanitizeLook2:Oo,handsFor:qa};window.__frameHouseKid=()=>ps(!0);window.__layoutNameTags=()=>jf();window.__lie={bedArt:Wa,lieBedKinds:H0,lieOffset:Zi,lieSpot:W0,box(e){const t=ke[e];return t?{w:t.w,h:Ke(t)}:null}};window.__paint=()=>{mt()};const te=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Mt(){return!y||qe===ee||y.canEdit(xe)}function An(e){B.pop();const t=x("houseTag");t.classList.add("show"),t.classList.remove("wiggle"),t.offsetWidth,t.classList.add("wiggle"),window.clearTimeout(ga),ga=window.setTimeout(()=>{S==="house"&&y&&!document.body.classList.contains("own-house")||t.classList.remove("show")},2e3),e&&(e.classList.remove("nope"),e.offsetWidth,e.classList.add("nope")),q("🔒 Look-only house: ask the owner to unlock it!",1800)}const me=()=>y?.myPresence()??null,ks=()=>y?y.players.get(y.pid)?.look??null:null;function wn(e,t){if(e===Ye){const n=ks();if(!n||!y)return;y.setLook(jo({...n,...t})),mt(),S==="street"&&ha(),S==="park"&&bs(),S==="ranch"&&Rn();return}C.dispatch({type:"char/update",id:e,patch:t})}function Te(e){y?.setPresence(e)}function Mx(e){const t=me();t&&t.where==="house"&&Te({...t,room:e})}function jg(e){qe=e,pg(e),Ue=null,setTimeout(()=>Th.update());for(const t of Object.keys(oa))delete oa[t];Le=e===ee?e.get().characters[0]?.id??null:Ye,ys(),ut()}function ic(e,t,n){return`<div class="inner">${tt(e,n)}</div><div class="nametag">${te(t)}</div>`}function mt(){const e=new Set;if(y&&qe!==ee&&S==="house"){const t=C.get().currentRoom,n=[...y.presence.entries()],s=me();s&&n.push([y.pid,s]);for(const[o,i]of n){const a=y.players.get(o);if(!a||i.where!=="house"||i.houseId!==xe||i.room!==t)continue;e.add(o);let r=mo.get(o);(!r||!r.isConnected)&&(r=document.createElement("div"),r.className="char avatar "+(o===y.pid?"mine":"other"),r.dataset.pid=o,J.appendChild(r),mo.set(o,r),o===y.pid?Lx(r):r.addEventListener("pointerdown",b=>{b.preventDefault(),b.stopPropagation()}));const l=a.look,c=us(o,i),d=c?.pose??null,f=JSON.stringify(l)+a.nickname+(d||"");if(r.dataset.look!==f){const b=r.querySelector(".bubble");r.innerHTML=ic(l,a.nickname,d),b&&r.appendChild(b),r.dataset.look=f}const g=Yo[l.size]??1,h=Et(t,c,i);vs(r,h.x,h.y,qn*g,jt*g);const u=c&&C.get().rooms[t].items.find(b=>b.id===c.item);r.style.zIndex=String(u?1e3+u.z+1+c.n:5e3+Math.round(i.y)),r.classList.toggle("flipped",i.flip),r.classList.toggle("pose-sit",d==="sit"),r.classList.toggle("pose-lie",d==="lie"),r.classList.toggle("pose-lie-r",d==="lie"&&!!u?.flip),Go(r,l,o===y.pid)}}for(const[t,n]of mo)(!e.has(t)||!n.isConnected)&&(e.has(t)||n.remove(),mo.delete(t));Xl(),ws()}function Lx(e){e.addEventListener("pointerdown",t=>{if(t.preventDefault(),t.stopPropagation(),_t||!y)return;const n=me();if(!n||n.where!=="house")return;const s=$t(t.clientX,t.clientY),o=Et(C.get().currentRoom,us(y.pid,n),n),i={x:o.x-s.x,y:o.y-s.y};let a=o.x,r=!1;e.classList.add("lifted"),B.pick(),Do=!0,In(t,{onMove(l){const c=$t(l.clientX,l.clientY),d=me();if(!d||d.where!=="house"||(Math.hypot(c.x-s.x,c.y-s.y)>6&&(r=!0),!r))return;const f=Math.max(40,Math.min(ge-40,c.x+i.x)),g=Math.max(Zs+40,Math.min(Ce,c.y+i.y)),h=Math.abs(f-a)>3?f<a:d.flip;Math.abs(f-a)>3&&(a=f),Ei(d,f,g,h,null),mt(),ra(C.get()),we.isPlay()&&(zo=aa(l.clientX,l.clientY)?.id??null)},onUp(l){Do=!1,zo=null,e.classList.remove("lifted");const c=me();if(!r||!c||c.where!=="house"){B.click();return}const d=$t(l.clientX,l.clientY),f=Math.max(40,Math.min(ge-40,d.x+i.x)),g=Math.max(Zs+40,Math.min(Ce,d.y+i.y));if(we.isPlay()){const h=aa(l.clientX,l.clientY),u=Ii({mode:"play",via:"drag",releaseX:f,releaseY:g,piece:h?Fa(h):null,occupied:ia(void 0,y.pid)}),b=u.seat?{id:u.seat.item,pose:u.seat.pose,n:u.seat.n}:null;Ei(c,u.x,u.y,c.flip,b)}else Ei(c,f,g,c.flip,null);mt(),ra(C.get()),B.drop(),Xe(e),requestAnimationFrame(()=>ps(!0))}})})}function Cx(e){return e.kind==="text"?e.v:(e.kind==="phrase"?xo:mf)[e.v]??""}function Ks(){const e=document.querySelectorAll(".bubble");if(!document.body.classList.contains("phone")){e.forEach(s=>{(s.style.marginLeft||s.style.marginTop)&&(s.style.marginLeft="",s.style.marginTop="")});return}const t=D.getBoundingClientRect(),n=Je()||1;e.forEach(s=>{s.style.marginLeft="0px",s.style.marginTop="0px";const o=s.getBoundingClientRect();let i=0;o.width>=t.width-8||o.left<t.left+4?i=t.left+4-o.left:o.right>t.right-4&&(i=t.right-4-o.right);let a=0;o.top<t.top+4?a=t.top+4-o.top:o.bottom>t.bottom-4&&(a=t.bottom-4-o.bottom),i&&(s.style.marginLeft=i/n+"px"),a&&(s.style.marginTop=a/n+"px")})}function Sx(e,t){const n=S==="street"?document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`):S==="park"?document.querySelector(`#pavatars .savatar[data-pid="${e}"]`):S==="ranch"?document.querySelector(`#ravatars .savatar[data-pid="${e}"]`):S==="gameroom"?document.querySelector(`#gavatars .savatar[data-pid="${e}"]`):mo.get(e),s=n?[n]:[];for(const o of s){o.querySelector(".bubble")?.remove();const i=document.createElement("div");i.className="bubble"+(t.kind==="emote"?" emote":""),i.textContent=Cx(t),o.appendChild(i),Ks(),setTimeout(()=>i.classList.add("out"),4600),setTimeout(()=>i.remove(),5e3)}e!==y?.pid&&B.click()}function Va(){const e=me();if(!y||!e)return 0;let t=0;return y.presence.forEach(n=>{Vp(e,n)&&t++}),t}function ws(){const e=Va();x("btnChat").classList.toggle("glow",e>0),Ga();const t=document.getElementById("chatNear");t&&(t.textContent=e?`${e} friend${e>1?"s":""} nearby can hear you`:"Walk closer to a friend to talk!",x("chatTray").classList.toggle("nobody",!e))}function Vg(){const e=x("chatTray");if(!y)return;const t=document.body.classList.contains("phone"),n=`<div class="phrases">${xo.map((a,r)=>`<button data-phrase="${r}">${te(a)}</button>`).join("")}</div>`,s=y.settings.freeChat?`<form class="typed" id="chatForm"><input id="chatInput" maxlength="${Bl}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>`:'<div class="presetsOnly">Picking from the bubbles above 💬</div>',o=t?'<button type="button" class="chatMore" data-chat="more">more</button>':"";e.innerHTML=`<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${mf.map((a,r)=>`<button data-emote="${r}">${a}</button>`).join("")}</div>
    ${o}
    <div class="chatExtra${t?" hidden":""}">${n}${s}</div>`,ws(),document.getElementById("chatForm")?.addEventListener("submit",a=>{a.preventDefault();const r=x("chatInput"),l=Ep(r.value);if(!l.ok){x("chatWarn").textContent=Ea[l.reason]??"",B.pop();return}if(!Va()){q("Walk closer to a friend to talk!");return}y.say({kind:"text",v:l.text}),r.value="",x("chatWarn").textContent="",r.blur()})}x("chatTray").addEventListener("click",e=>{const t=e.target;if(!y)return;if(t.closest('[data-chat="close"]')){x("chatTray").classList.add("hidden");return}const n=t.closest('[data-chat="more"]');if(n){const i=x("chatTray").querySelector(".chatExtra");i?.classList.toggle("hidden"),n.textContent=i&&!i.classList.contains("hidden")?"less":"more";return}const s=t.closest("[data-emote]"),o=t.closest("[data-phrase]");if(!(!s&&!o)){if(!Va()){q("Walk closer to a friend to talk!");return}y.say(s?{kind:"emote",v:+s.dataset.emote}:{kind:"phrase",v:+o.dataset.phrase}),B.click()}});x("btnChat").addEventListener("click",()=>{x("chatTray").classList.toggle("hidden")||(Vg(),B.swish())});function Vt(){const e=document.body.classList,n=!!y&&qe!==ee&&S==="house"?y.houses.get(xe):void 0,s=!!n&&n.meta.ownerId===y.pid;if(e.toggle("mode-hood",!!y),e.toggle("view-street",S!=="house"),e.toggle("view-park",S==="park"),e.toggle("view-ranch",S==="ranch"),e.toggle("view-map",S==="street"),e.toggle("view-gameroom",S==="gameroom"),e.toggle("in-barn",S==="ranch"&&_e),e.toggle("mode-play",S==="house"&&we.isPlay()),bc(),eh(),e.toggle("own-house",s),e.toggle("locked",!!n&&!Mt()),e.toggle("has-hood",!!Qa()),Ga(),n){const o=y.players.get(n.meta.ownerId)?.nickname??"";x("houseTag").innerHTML=`${n.meta.locked?"🔒 ":""}<b>${te(n.meta.name)}</b>${s?" · yours":o?" · "+te(o):""}`;const i=x("lockIco");i&&(i.innerHTML=n.meta.locked?ft.lockOn:ft.lockOff);const a=n.meta.locked?"Unlock my house":"Lock my house";x("btnLock").setAttribute("aria-label",n.meta.locked?"Unlock house":"Lock house");const r=x("lockLabel");r&&(r.textContent=a)}ws(),Bx(),document.body.classList.contains("phone")&&$g()}let wr="",ga=0;function Bx(){const e=x("houseTag"),t=!!y&&S==="house"&&!document.body.classList.contains("own-house");if(S!=="house"||!y){wr="",e.classList.remove("show");return}if(t){e.classList.add("show");return}const n=xe||"solo";wr!==n&&(wr=n,e.classList.add("show"),window.clearTimeout(ga),ga=window.setTimeout(()=>e.classList.remove("show"),2e3))}x("btnLock").addEventListener("click",()=>{const e=y?.houses.get(xe);!e||e.meta.ownerId!==y.pid||(y.lock(e.meta.id,!e.meta.locked),B.click(),q(e.meta.locked?"Unlocked: friends can decorate!":"Locked: friends can look but not change things"))});const nt=new Map;let Zd="",fl=0,Be={w:ln,h:cn,portrait:!1};function Hx(){return document.body.classList.contains("phone-portrait")}function Gg(){const e=x("street"),t=Math.max(1,e.clientWidth),n=Math.max(1,e.clientHeight);return Math.min(t/Be.w,n/Be.h)}function Px(e){const t=x("street"),n=x("mapWorld"),s=Be.w*e,o=Be.h*e;n.style.marginLeft=Math.max(0,Math.floor((t.clientWidth-s)/2))+"px",n.style.marginTop=Math.max(0,Math.floor((t.clientHeight-o)/2))+"px",t.scrollLeft=0,t.scrollTop=0,Yg()}function Yg(){const e=x("street"),t=x("mapWorld"),n=4,s=e.clientWidth-n,o=e.clientHeight-n,i=t.offsetLeft,a=t.offsetTop;t.querySelectorAll(".mapSign").forEach(r=>{r.style.transform="translateX(-50%)";const l=r.offsetWidth,c=r.offsetHeight,d=i+r.offsetLeft-l/2,f=a+r.offsetTop;let g=0,h=0;d<n&&(g=n-d),d+l+g>s&&(g-=d+l+g-s),f<n&&(h=n-f),f+c+h>o&&(h-=f+c+h-o),Tx(r,g,h,i,a,n,s,o)})}function Tx(e,t,n,s,o,i,a,r){const l=[...e.parentElement.querySelectorAll(".mapMail")],c=()=>{const f=e.offsetWidth,g=e.offsetHeight,h=s+e.offsetLeft-f/2+t,u=o+e.offsetTop+n;return{left:h,top:u,right:h+f,bottom:u+g,width:f,height:g}};for(let f=0;f<6;f++){const g=c(),h=l.find($=>{const P=s+$.offsetLeft,R=o+$.offsetTop,W=P+$.offsetWidth,F=R+$.offsetHeight;return g.right>P+2&&g.left<W-2&&g.bottom>R+2&&g.top<F-2});if(!h)break;const u=s+h.offsetLeft,b=o+h.offsetTop,_=b+h.offsetHeight,m=c(),p=_+4-m.top,v=m.bottom-(b-4);m.top+p+m.height<=r?n+=p:m.top-v>=i?n-=v:t-=Math.min(m.right,u+h.offsetWidth)-Math.max(m.left,u)+6}const d=c();d.left<i&&(t+=i-d.left),d.right>a&&(t-=d.right-a),d.top<i&&(n+=i-d.top),d.bottom>r&&(n-=d.bottom-r),e.style.transform=Math.abs(t)>.5||Math.abs(n)>.5?`translate(calc(-50% + ${t.toFixed(1)}px), ${n.toFixed(1)}px)`:"translateX(-50%)"}document.fonts?.ready.then(()=>{S==="street"&&Yg()});function Wx(){return y?[...y.houses.values()].map(e=>e.meta).sort((e,t)=>e.slot-t.slot):[]}function Rx(e){const s=Math.round(97.5),o=Math.max(1,Math.ceil(e/(e===1?1:2))),i=158,a=318,l=a+(o-1)*i+s/2+108,c=Math.max(1020,l+78),d=Math.max(l,Math.min(c-88,Math.round(c*.74))),f=e===1?[280]:[150,410],g=e===1?1:2,h=Array.from({length:e},(u,b)=>({x:f[b%g],y:a+Math.floor(b/g)*i}));return{w:560,h:c,hw:104,hh:s,houses:h,square:{x:280,y:d},park:{x:96,y:122},club:{x:280,y:116},ranch:{x:458,y:120}}}function as(e=!1){if(S!=="street")return;const t=x("mapWorld"),n=Wx(),s=y?n.map(g=>({id:g.id,name:g.name,style:g.style,locked:g.locked,mine:g.ownerId===y.pid,lit:!!y.players.get(g.ownerId)?.online})):fl?Array.from({length:fl},(g,h)=>({id:"fake"+h,name:["Reagan","Quinn","Chloe","Sloane","Cada","Emma","Olivia","Charlotte","Amelia","Sophia","Isabella","Mia"][h%12]+"'s House",style:h,locked:h===3,mine:h===0,lit:h%3!==1})):[null],o=Hx()?Rx(Math.max(1,s.length)):null;Be=o?{w:o.w,h:o.h,portrait:!0}:{w:ln,h:cn,portrait:!1};const i=Gg(),a=(Be.portrait?"P":"L")+Be.w+"x"+Be.h+":"+i.toFixed(3)+JSON.stringify(n)+(y?n.map(g=>(y.players.get(g.ownerId)?.online?1:0)+($r(g.id)?"u":"")).join("")+y.pid:"solo");if(!e&&a===Zd&&t.querySelector("#mapFaces")){ha();return}Zd=a,t.style.width=Be.w*i+"px",t.style.height=Be.h*i+"px",t.style.setProperty("--sc",String(i)),t.innerHTML=`<div class="mapClip">${o?zh(o.w,o.h):Uh()}</div>`;const r=t.querySelector(".mapClip"),l=g=>g*i+"px";nt.clear();const c=s.length;let d="",f="";if(o){const{hw:g,hh:h}=o,u=34,b=40;s.forEach((v,$)=>{const P=o.houses[$]??o.houses[0],R=v?`house:${v.id}`:"home",W=v?v.name:"My House";nt.set(v?"house:"+v.id:"home",{x:P.x,y:P.y-h/2-8});const F=!!(v&&$r(v.id)),se=P.x<o.w/2?Math.max(4,P.x-g/2-u-8):Math.min(o.w-u-4,P.x+g/2+8),I=Math.max(4,Math.min(o.h-b-4,P.y-h*.42));d+=`<button class="mapSpot mapHouse ${v?.mine||!v?"mine":""}" data-go="${R}" aria-label="${te(W)}" style="left:${l(P.x-g/2)};top:${l(P.y-h/2)};width:${l(g)};height:${l(h)}">${Yi(v?v.style:0,{lit:v?v.lit:!0})}${v?.locked?'<span class="lockBadge">🔒</span>':""}${v?.mine||!v?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${F?"up":""}" data-mail="${v?v.id:"home"}" aria-label="${te(W)} mailbox" style="left:${l(se)};top:${l(I)};width:${l(u)};height:${l(b)}">${Fc(F)}</button>`,f+=`<div class="mapSign ${v?.mine||!v?"mine":""}" style="left:${l(P.x)};top:${l(P.y+h/2+2)}">${te(W)}</div>`});const _=(v,$,P,R,W,F,ne,se,I)=>{d+=`<button class="mapSpot ${v}" data-go="${$}" aria-label="${P}" style="left:${l(W-ne/2)};top:${l(F-se/2)};width:${l(ne)};height:${l(se)}">${R}</button>`,f+=`<div class="mapSign place" style="left:${l(W)};top:${l(F+I)}">${P==="The park"?"Park":P==="Rainbow Ranch"?"Rainbow Ranch":"Clubhouse"}</div>`};_("mapPark","park","The park",Sc,o.park.x,o.park.y,148,126,68),_("mapRanch","ranch","Rainbow Ranch",Bc,o.ranch.x,o.ranch.y,156,128,72),_("mapClub","gameroom","The clubhouse",Hc,o.club.x,o.club.y,146,120,68),nt.set("park",{x:o.park.x,y:o.park.y-78}),nt.set("ranch",{x:o.ranch.x,y:o.ranch.y-80}),nt.set("barn",{x:o.ranch.x,y:o.ranch.y+8}),nt.set("gameroom",{x:o.club.x,y:o.club.y-74}),nt.set("square",o.square);const m=[{x:o.park.x,y:o.park.y,r:90},{x:o.ranch.x,y:o.ranch.y,r:96},{x:o.club.x,y:o.club.y,r:88},{x:o.square.x,y:o.square.y,r:70},...o.houses.map(v=>({x:v.x,y:v.y,r:78}))],p=o.w/2;r.insertAdjacentHTML("beforeend",Cc(m,(v,$)=>Math.abs(v-p)<34,o.w,o.h)+Zh(o.w,o.h,m)+d+'<div class="mapFaces" id="mapFaces"></div>')}else{const g=t.querySelector("#mapRoad"),h=g.getTotalLength(),u=Array.from({length:160},($,P)=>g.getPointAtLength(h*P/159)),b=($,P)=>u.some(R=>Math.hypot(R.x-$,R.y-P)<50),_=gl(),m=c>8?80:94,p=m*300/320,v=Kg(g,c,_);s.forEach(($,P)=>{const R=v[P],W=$?`house:${$.id}`:"home",F=$?$.name:"My House";nt.set($?"house:"+$.id:"home",{x:R.x,y:R.y-p/2-4});const ne=!!($&&$r($.id)),se=34,I=40,ae=14/i,fn=Math.max(4,Math.min(ln-se-4,R.x+m/2+ae)),At=Math.max(4,Math.min(cn-I-4,R.y-p*.22));d+=`<button class="mapSpot mapHouse ${$?.mine||!$?"mine":""}" data-go="${W}" aria-label="${te(F)}" style="left:${l(R.x-m/2)};top:${l(R.y-p/2)};width:${l(m)};height:${l(p)}">${Yi($?$.style:0,{lit:$?$.lit:!0})}${$?.locked?'<span class="lockBadge">🔒</span>':""}${$?.mine||!$?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${ne?"up":""}" data-mail="${$?$.id:"home"}" aria-label="${te(F)} mailbox" style="left:${l(fn)};top:${l(At)};width:${l(se)};height:${l(I)}">${Fc(ne)}</button>`,f+=`<div class="mapSign ${$?.mine||!$?"mine":""}" style="left:${l(R.x)};top:${l(R.y+p/2-2)}">${te(F)}</div>`}),d+=`<button class="mapSpot mapPark" data-go="park" aria-label="The park" style="left:${l(kn.x-100)};top:${l(kn.y-85)};width:${l(200)};height:${l(170)}">${Sc}</button>`,f+=`<div class="mapSign place" style="left:${l(kn.x)};top:${l(kn.y+70)}">Park</div>`,d+=`<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${l(zt.x-110)};top:${l(zt.y-90)};width:${l(220)};height:${l(180)}">${Bc}</button>`,f+=`<div class="mapSign place" style="left:${l(zt.x)};top:${l(zt.y+78)}">Rainbow Ranch</div>`,d+=`<button class="mapSpot mapClub" data-go="gameroom" aria-label="The clubhouse" style="left:${l(bn.x-95)};top:${l(bn.y-78)};width:${l(190)};height:${l(156)}">${Hc}</button>`,f+=`<div class="mapSign place" style="left:${l(bn.x)};top:${l(bn.y+82)}">Clubhouse</div>`,nt.set("park",{x:kn.x,y:kn.y-60}),nt.set("ranch",{x:zt.x-30,y:zt.y-60}),nt.set("barn",{x:zt.x+10,y:zt.y+10}),nt.set("gameroom",{x:bn.x,y:bn.y-52}),r.insertAdjacentHTML("beforeend",Cc(_,b)+d+'<div class="mapFaces" id="mapFaces"></div>')}t.insertAdjacentHTML("beforeend",f),ha(),Px(i)}const gl=()=>[{x:kn.x,y:kn.y,r:115},{x:zt.x,y:zt.y,r:125},{x:Dt.x,y:Dt.y,r:100},{x:bn.x,y:bn.y,r:90}];function Kg(e,t,n){const s=e.getTotalLength(),o=[];for(let i=0;i<t;i++){const a=t===1?.2:.05+.75*i/(t-1),r=e.getPointAtLength(s*a),l=e.getPointAtLength(Math.min(s,s*a+3));let c=-(l.y-r.y),d=l.x-r.x;const f=Math.hypot(c,d)||1;c/=f,d/=f;const g=[1,-1].map(b=>({x:r.x+c*72*b,y:r.y+d*72*b})).map(b=>({...b,score:Math.min(...n.map(_=>Math.hypot(_.x-b.x,_.y-b.y)-_.r),b.x-50,ln-50-b.x,b.y-60,cn-40-b.y)})),h=i%2?g:[g[1],g[0]],u=h[0].score>0||h[0].score>=h[1].score?h[0]:h[1];u.x=Math.max(60,Math.min(ln-60,u.x)),u.y=Math.max(62,Math.min(cn-72,u.y)),n.push({x:u.x,y:u.y,r:70}),o.push({x:u.x,y:u.y})}return o}window.__mapFake=e=>{fl=e,as(!0)};window.__mapLayout=e=>{const t=document.querySelector("#mapRoad");if(!t)return null;const n=Kg(t,e,gl());let s=1e9,o=1e9,i=!0;return n.forEach((a,r)=>{n.forEach((l,c)=>{c>r&&(s=Math.min(s,Math.hypot(a.x-l.x,a.y-l.y)))}),gl().forEach(l=>{o=Math.min(o,Math.hypot(a.x-l.x,a.y-l.y)-l.r)}),(a.x<55||a.x>ln-55||a.y<60||a.y>cn-70)&&(i=!1)}),{n:e,minHouse:s,minSpot:o,inside:i}};function Xg(e){return e.where==="house"&&e.houseId?{kind:"house",houseId:e.houseId,room:e.room}:e.where==="park"||e.where==="ranch"||e.where==="barn"||e.where==="gameroom"?{kind:e.where}:{kind:"square"}}const Ex=e=>e.kind==="house"?"house:"+e.houseId:e.kind;function ha(){const e=document.getElementById("mapFaces");if(!e||S!=="street")return;const t=Gg(),n=new Set,s=[];if(y){const i=[...y.presence.entries()],a=me();a&&i.push([y.pid,a]);for(const[r,l]of i){const c=y.players.get(r);c&&s.push({key:r,look:c.look,name:c.nickname,mine:r===y.pid,place:Xg(l)})}}else{const i=ee.get().characters[0];i&&s.push({key:"solo",look:jo(i),name:"You",mine:!0,place:{kind:"square"}})}const o=new Map;for(const i of s){const a=Ex(i.place);o.has(a)||o.set(a,[]),o.get(a).push(i)}for(const[i,a]of o)a.sort((r,l)=>r.mine?-1:l.mine?1:r.name.localeCompare(l.name)),a.forEach((r,l)=>{let c,d;const f=nt.get("square")??{x:Dt.x,y:Dt.y};if(i==="square")if(Be.portrait){const m=Math.floor(l/3),p=l%3,v=Math.min(3,a.length-m*3);c=f.x+(p-(v-1)/2)*176,d=f.y+m*112}else if(a.length===1)c=Dt.x,d=Dt.y;else{const b=-Math.PI/2+l*(Math.PI*2/a.length);c=Dt.x+Math.cos(b)*78,d=Dt.y+Math.sin(b)*78}else{const b=nt.get(i)??f,_=Be.portrait?2:3,m=Be.portrait?150:64,p=Math.floor(l/_),v=l%_,$=Math.min(_,a.length-p*_);c=b.x+(v-($-1)/2)*m,d=b.y-p*(Be.portrait?108:64)}Be.portrait&&(c=Math.max(100,Math.min(Be.w-100,c)),d=Math.max(48,Math.min(Be.h-84,d))),n.add(r.key);let g=e.querySelector(`.mapFace[data-pid="${r.key}"]`);g||(g=document.createElement("button"),g.className="mapFace "+(r.mine?"mine":"other"),g.dataset.pid=r.key,g.setAttribute("aria-label",r.mine?"You":r.name),e.appendChild(g));const h=JSON.stringify(r.look)+r.name;if(g.dataset.look!==h){const b=g.querySelector(".bubble");g.innerHTML=`<span class="face">${bl(tt(r.look))}</span><span class="fname">${te(r.mine?"You":r.name)}</span>`,b&&g.appendChild(b),g.dataset.look=h}g.dataset.place=i;const u=Be.portrait?62:46;g.style.left=(c-u/2)*t+"px",g.style.top=(d-u/2)*t+"px",g.style.width=g.style.height=u*t+"px"});e.querySelectorAll(".mapFace").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),ws()}function Jg(e,t){const n=x("mapWorld");if(t&&!n.classList.contains("zoomIn")){const s=t.getBoundingClientRect(),o=n.getBoundingClientRect();n.style.transformOrigin=`${s.left+s.width/2-o.left}px ${s.top+s.height/2-o.top}px`,n.classList.remove("mapIn"),n.classList.add("zoomIn"),B.swish(),setTimeout(()=>{n.classList.remove("zoomIn"),Id(e)},360)}else Id(e)}function ei(e){e.classList.remove("sceneIn"),e.offsetWidth,e.classList.add("sceneIn"),setTimeout(()=>e.classList.remove("sceneIn"),600)}function Id(e){e.kind==="house"?nh(e.houseId,e.room):e.kind==="home"?th():e.kind==="park"?Ox():e.kind==="ranch"?Io(!1):e.kind==="barn"?Io(!0):e.kind==="gameroom"&&Nx()}function Qx(e){const t=y?.presence.get(e);if(!y||!t)return;const n=Xg(t),s=y.players.get(e)?.nickname??"your friend";if(n.kind==="square"){q(`${s} is on the map too! 👋`);return}const o=document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`)??void 0;Jg(n,o),setTimeout(()=>{const i=me();if(!i||!y)return;const a=t.x+(t.x>300?-110:110);if(n.kind==="house"&&i.where==="house")Te({...i,x:a,y:t.y}),mt(),Na(a-X/2);else if((n.kind==="park"||n.kind==="ranch"||n.kind==="barn")&&i.where===n.kind){Wt({...i,x:a,y:Math.max(ls,Math.min(dn,t.y)),flip:a>t.x});const r=n.kind==="park"?On():Qt(),l=x(n.kind==="park"?"parkScroll":"ranchScroll");requestAnimationFrame(()=>{l.scrollLeft=t.x*r-l.clientWidth/2,ze()})}else if(n.kind==="gameroom"&&i.where==="gameroom"){const r=Vs();r||Wt({where:"gameroom",x:a,y:Math.max(ls,Math.min(dn,t.y)),flip:a>t.x});const l=Dn(),c=x("grScroll"),d=r?.x??t.x;requestAnimationFrame(()=>{c.scrollLeft=d*l-c.clientWidth/2,ze()})}q(`You found ${s}! 💕`)},420)}function $r(e){if(!y)return!1;const t=y.houses.get(e);return!!t&&t.meta.ownerId===y.pid&&Ml(t.confirmed.mailbox)>0}let vi=0;function eh(){xg();const e=document.getElementById("mailCue"),t=y?.myHouseId()??"",n=y&&t?Ml(y.houses.get(t)?.confirmed.mailbox):0;if(!y||S!=="street"||n<=0){n<=0&&(vi=0),e?.classList.remove("show");return}vi!==n&&(vi=n,e?.classList.add("show"),window.setTimeout(()=>{vi===n&&e?.classList.remove("show")},8e3))}function Ga(){const e=y?.myHouseId()??"",t=y&&e?Ml(y.houses.get(e)?.confirmed.mailbox):0,n=x("menuBadge");n.textContent=t>9?"9+":String(t),n.classList.toggle("on",t>0);const s=document.getElementById("mailNew");s&&(s.textContent=t>0?t===1?"1 new":t+" new":"",s.classList.toggle("on",t>0));const o=y?y.presence.size:0,i=x("mapBadge");i.textContent=o>9?"9+":String(o),i.classList.toggle("on",o>0),x("btnMap").setAttribute("aria-label",o>0?`Map, ${o} friends online`:"Map");const a=Va(),r=x("chatBadge");r.textContent=a>9?"9+":String(a),r.classList.toggle("on",a>0)}function hl(e){e&&document.querySelectorAll(".toast").forEach(t=>t.remove()),x("menuPop").classList.toggle("hidden",!e),x("btnMenu").setAttribute("aria-expanded",e?"true":"false"),e&&Ga(),Ax()}function Ax(){const e=x("houseTag");if(e.style.top="",!e.classList.contains("show")||x("menuPop").classList.contains("hidden"))return;const t=document.querySelector(".menuCard");if(!t)return;const n=x("stageWrap").getBoundingClientRect(),s=t.getBoundingClientRect(),o=e.getBoundingClientRect();if(!(o.top<s.bottom-2&&o.bottom>s.top+2&&o.left<s.right-2&&o.right>s.left+2))return;const a=s.bottom-n.top+8;a+o.height<n.height-8?e.style.top=a+"px":e.style.top=Math.max(8,n.height-o.height-10)+"px"}x("btnMenu").addEventListener("click",()=>{hl(x("menuPop").classList.contains("hidden")),B.click()});x("menuPop").addEventListener("click",e=>{const t=e.target;if(t.id==="menuPop"||t.closest("#menuClose")){hl(!1);return}t.closest(".menuRow")&&hl(!1)});x("btnMail").addEventListener("click",()=>{const e=y?.myHouseId();e?ac(e):q("Join a street to send letters!")});x("secrets").addEventListener("click",()=>{if(S!=="house"){q("Surprises are hiding in your house!");return}we.isPlay()&&x("modeDecorate").click(),dt="secrets",ut(),q("Surprises are in your drawer!")});function ac(e){if(!y||e==="home"||!y.houses.has(e)){q("Join a street to send letters!");return}const t=y.houses.get(e);Ri.open(e,t.meta.name,t.meta.ownerId===y.pid,t.confirmed.mailbox?.letters??[]),B.click()}x("mapWorld").addEventListener("click",e=>{const t=e.target;if(S!=="street")return;const n=t.closest(".mapMail");if(n){ac(n.dataset.mail||"home");return}const s=t.closest(".mapFace");if(s){s.classList.contains("mine")?(Xe(s),B.pop(),q("That's you! Tap a place to go there")):Qx(s.dataset.pid);return}const o=t.closest("[data-go]");if(!o)return;const i=o.dataset.go;Jg(i.startsWith("house:")?{kind:"house",houseId:i.slice(6)}:{kind:i},o)});function $s(){x("street").classList.add("hidden"),x("park").classList.add("hidden"),x("ranch").classList.add("hidden"),x("gameroom").classList.add("hidden"),Ti()?.close(),x("chatTray").classList.add("hidden"),x("sheet").classList.add("hidden")}function As(){Me=null,it=[],_e=!1,y?Te({where:"street",x:600,y:540,flip:!1}):pt=null,$s(),S="street",x("street").classList.remove("hidden"),x("streetTitle").textContent=y?"Our Neighborhood":"My Map",Vt(),as(!0);const e=x("mapWorld");e.style.transformOrigin="50% 50%",e.classList.remove("zoomIn","mapIn"),e.offsetWidth,e.classList.add("mapIn"),B.swish()}function th(){if(y){const e=y.myHouseId();e&&y.houses.has(e)&&nh(e);return}$s(),S="house",pt=null,we.sync(!0),Vt(),ys(),ei(x("stageWrap")),B.sparkle(),Qn()}function nh(e,t="living"){if(!y||!y.houses.has(e))return;xe=e,S="house",_e=!1,we.sync(e===y.myHouseId());let n=sa.get(e);n||(n=Kp(y,e,{get:()=>ee.get().soundOn,set:s=>ee.dispatch({type:"settings/sound",on:s})}),sa.set(e,n)),n.dispatch({type:"room/switch",room:t}),Te({where:"house",houseId:e,room:t,x:900+Math.random()*300,y:540,flip:!1}),$s(),jg(n),ei(x("stageWrap")),B.sparkle(),Qn()}function rc(){y?.close(),y=null,sa=new Map,S="house",xe="",pt=null,Me=null,it=[],_e=!1,x("elsewhere").classList.add("hidden"),$s(),we.sync(!0),jg(ee),Vt()}x("btnMap").addEventListener("click",()=>{if(S==="street"){B.pop();return}As()});x("btnHome").addEventListener("click",()=>{if(S==="house"&&(!y||xe===y.myHouseId())){B.pop();return}th()});x("phoneOk").addEventListener("click",()=>{x("phoneNote").classList.add("hidden"),B.click()});x("elsewhereGo").addEventListener("click",()=>{B.click(),y?.connect()});x("btnSolo").addEventListener("click",()=>{rc(),q("Playing in your own house 🏠")});window.addEventListener("resize",()=>{S==="street"&&as(!0),S==="park"&&dc(),S==="ranch"&&yc(),S==="gameroom"&&Nl(),ze()});function lc(e){y=e,sa=new Map,e.on("players",()=>{y===e&&(S==="street"?as():S==="park"?bs():S==="ranch"?(Rn(),bc()):S==="gameroom"?Co():(mt(),Vt()),qo==="dress"&&tn())}),e.on("houses",()=>{y===e&&(S==="street"?as():S==="house"&&!e.houses.has(xe)&&(q("That house is gone now"),As()))}),e.on("houseMeta",t=>{y!==e||t!==xe||S!=="house"||(Ue=null,Vt(),Pt(C.get()),ut(),Mt()||x("sheet").classList.add("hidden"))}),e.on("pres",()=>{y===e&&(S==="street"?ha():S==="park"?bs():S==="ranch"?Rn():S==="gameroom"?Co():mt())}),e.on("ranch",()=>{y===e&&S==="ranch"&&tr(!0)}),e.on("ranchFail",t=>{y===e&&ul(t)}),e.on("noride",()=>{if(y!==e)return;const t=me();if(t?.ride!==void 0){const{ride:n,...s}=t;Te(s),Rn()}q("Someone is riding that horse!")}),e.on("fx",(t,n)=>{y===e&&d_(t,n)}),e.on("bubble",(t,n)=>{y===e&&Sx(t,n)}),e.on("sayFail",t=>q(t==="presetsOnly"?"Typing is turned off: pick a bubble!":Ea[t]||"Couldn't send that")),e.on("mailbox",()=>{y===e&&(S==="street"&&as(!0),eh(),Ri.refresh(),Ga())}),e.on("mailFail",t=>{y===e&&Ri.fail(t)}),e.on("settings",()=>{y===e&&(x("chatTray").classList.contains("hidden")||Vg(),Ri.refresh())}),e.on("removed",()=>{q("A grown-up took this iPad off the street");const t=e.cfg;rn({url:t.url,code:t.code,id:t.id,parentKey:t.parentKey}),rc()}),e.on("status",t=>{y===e&&(document.body.classList.toggle("reconnecting",t!=="online"&&!e.replaced),(t==="online"||t==="connecting")&&x("elsewhere").classList.add("hidden"))}),e.on("replaced",()=>{y===e&&x("elsewhere").classList.remove("hidden")}),e.on("table",()=>{if(y===e){if(S==="gameroom"){const t=Vs(),n=me();t&&n?.where==="gameroom"&&Math.hypot(n.x-t.x,n.y-t.y)>40&&Te({where:"gameroom",x:t.x,y:Math.max(ls,Math.min(dn,t.y)),flip:n.flip}),Co()}Ti()?.refresh()}}),e.on("tblFail",(t,n)=>{y===e&&Ti()?.fail(t,n)}),e.on("welcome",()=>{if(y===e)if(S==="street")as(!0);else if(S==="park"||S==="ranch"){const t=me();t&&Te(t),S==="park"?dc():yc(),ze()}else if(S==="gameroom"){const t=me();t&&Te(t),Nl(),ze(),Ti()?.refresh()}else e.houses.has(xe)?ys():As()}),As()}async function Ux(){Vt();const e=Qa(),t=zs();if(!e||!t?.token||t.url!==e)return;const n=new Aa(t),s=await n.connect();s==="ok"?lc(n):(n.close(),s!=="closed"&&q("Couldn't reach the street. Playing at home!"))}function Lt(e,t,n=""){const s=document.createElement("div");s.className="sheet hoodSheet "+n,s.innerHTML=`<div class="card">${e}</div>`,document.body.appendChild(s),B.swish();const o=()=>s.remove();return s.addEventListener("click",i=>{const a=i.target;if(a===s||a.closest('[data-m="close"]'))return o();t(a,o,s)}),{root:s,close:o}}const Ct='<button class="close" data-m="close">✕</button>';x("btnHood").addEventListener("click",()=>zx());function zx(){const e=Qa();if(!e){Lt(`${Ct}<h2>Neighborhood</h2><p class="hint">The street isn't open yet. Ask a grown-up to set it up!</p>`,()=>{});return}const t=zs()?.url===e?zs():null;Lt(`${Ct}<h2>Neighborhood</h2><div class="bigBtns">
      ${t?.token?`<button class="big go" data-m="go">${ft.street}<span>Go to my street</span></button>`:`<button class="big go" data-m="join">${ft.street}<span>Join a friend's street</span></button>`}
      <button class="big grown" data-m="create">${ft.shield}<span>${t?.parentKey?"Grown-ups":"Grown-ups: start a street"}</span></button></div>`,async(n,s)=>{const o=n.closest("[data-m]")?.dataset.m;if(o==="go"){s();const i=new Aa(t),a=await i.connect();a==="ok"?lc(i):(i.close(),q(a.startsWith("badtoken")?"Please join again":"Couldn't reach the street"))}o==="join"&&(s(),So(e)),o==="create"&&(s(),await _f()&&(t?.parentKey?Ya():Dx(e)))})}async function Dx(e){let t;try{t=await Gp(e)}catch{q("Couldn't create a street right now");return}rn({url:e,code:t.code,id:t.id,parentKey:t.parentKey}),Lt(`${Ct}<h2>Your street is ready!</h2><p class="hint">Kids join with this code (you can pick your own on the grown-up screen):</p><div class="code" id="newCode">${t.code}</div>
    <p class="hint small">Grown-up key (keep it private; it opens the grown-up screen on another device):<br><b class="key" id="parentKey">${t.parentKey}</b></p>
    <div class="bigBtns"><button class="big grown" data-m="setup">${ft.shield}<span>Add kids' names &amp; code</span></button>
    <button class="big go" data-m="joinhere">${ft.street}<span>Join on this iPad</span></button></div>`,(n,s)=>{n.closest('[data-m="joinhere"]')&&(s(),cc(e,t.code)),n.closest('[data-m="setup"]')&&(s(),Ya())})}function So(e,t=""){const n=Lt(`${Ct}<h2>Join a street</h2><p class="hint">Type the code a grown-up gave you</p>
    <form id="codeForm" class="codeForm"><input id="codeInput" maxlength="${Sl}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="CODE"/><button type="submit" class="go">Next</button></form>
    <p class="err">${te(t)}</p>`,()=>{}),s=n.root.querySelector("#codeInput");setTimeout(()=>s.focus(),50),s.addEventListener("input",()=>{s.value=Fi(s.value)}),n.root.querySelector("#codeForm").addEventListener("submit",o=>{o.preventDefault();const i=Fi(s.value);if(!ep(i)){n.close(),So(e,"That code looks wrong. Try again!");return}n.close(),cc(e,i)})}async function cc(e,t,n=""){let s;try{s=await Yp(e,t)}catch{So(e,"Couldn't reach the street. Try again!");return}if("slow"in s){So(e,"Too many tries. Ask a grown-up and try again in a few minutes.");return}if(!s.exists){So(e,"Hmm, we couldn't find that street.");return}window.__lastLookupId=s.id,qx(e,t,s.id,s.roster,n)}function qx(e,t,n,s,o=""){if(s.length){Lt(`${Ct}<h2>Who are you?</h2>${o?`<p class="err">${te(o)}</p>`:'<p class="hint">Tap your name</p>'}<div class="nicks roster">${s.map((i,a)=>`<button data-nick="${a}" ${i.claimed?"disabled":""}>${te(i.name)}${i.claimed?"<small>signed in</small>":""}</button>`).join("")}</div>
      <p class="hint small">Not on the list? Ask a grown-up to add your name.</p>`,(i,a)=>{const r=i.closest("[data-nick]");if(!r||r.disabled)return;a();const l=s[+r.dataset.nick];l.hasHouse?sh(e,t,n,l.name,void 0):Od(e,t,n,l.name)},"wide");return}Lt(`${Ct}<h2>Pick your street name</h2>${o?`<p class="err">${te(o)}</p>`:""}<div class="nicks">${Uc.map((i,a)=>`<button data-nick="${a}">${te(i)}</button>`).join("")}</div>`,(i,a)=>{const r=i.closest("[data-nick]");r&&(a(),Od(e,t,n,Uc[+r.dataset.nick]))},"wide")}function Od(e,t,n,s){Lt(`${Ct}<h2>Hi, ${te(s)}!</h2><p class="hint">What should your house on the street be?</p>
    <div class="bigBtns"><button class="big go" data-m="bring">${Yi(2)}<span>Bring my house</span></button>
    <button class="big" data-m="fresh">${Yi(5)}<span>Start a new one</span></button></div>`,(o,i)=>{const a=o.closest("[data-m]")?.dataset.m;a&&(i(),sh(e,t,n,s,a==="bring"))})}async function sh(e,t,n,s,o){const i=ee.get(),a=i.characters[0],r=jo(a??{});let l;if(o&&(l=i,a)){const{reduce:u}=await wa(async()=>{const{reduce:b}=await Promise.resolve().then(()=>O0);return{reduce:b}},void 0);l=u(i,{type:"char/delete",id:a.id})}const c=zs(),d={url:e,code:t,id:n,parentKey:c?.id===n||c?.code===t?c.parentKey:void 0},f=i.dog?{name:i.dog.name,breed:i.dog.breed}:null,g=new Aa(d),h=await g.connect({nickname:s,look:r,house:l,dog:f});if(h==="ok"){rn(g.cfg),lc(g),q(`Welcome to the street, ${s}!`),F$()&&(j$(),Le=Ye,Os("dress"));return}g.close(),h.startsWith("nickname")?cc(e,t,h.endsWith("notOnList")?"That name is not on the list anymore.":"That name is already signed in on another iPad. Ask a grown-up!"):q(h==="full"?"That street is full":"Couldn't join right now")}x("btnParent").addEventListener("click",async()=>{await _f()&&Ya()});const Zx={codeTaken:"That code is already used by another street. Try adding a number!",badCode:"Codes are 4–16 letters or numbers.",badName:"Use a first name only (letters).",rosterFull:`Up to ${tp} names.`,nameInUse:"Remove that player first.",codeFixed:"This street's code can't be changed."};async function Ya(){const e=zs();if(!e)return;if(!e.parentKey){const a=Lt(`${Ct}<h2>Grown-up key</h2><p class="hint">Enter the key you got when the street was made</p><form id="keyForm" class="codeForm"><input id="keyInput" autocomplete="off" spellcheck="false"/><button class="go">OK</button></form>`,()=>{});a.root.querySelector("#keyForm").addEventListener("submit",r=>{r.preventDefault(),e.parentKey=a.root.querySelector("#keyInput").value.trim(),rn(e),y&&(y.cfg.parentKey=e.parentKey),a.close(),Ya()});return}let t=y;t||(t=new Aa({...e,token:void 0}),await t.connect());const n=t,s=a=>o.root.querySelector(a).value,o=Lt(`${Ct}<h2>Grown-up screen</h2><div id="parentBody"><p class="hint">Loading…</p></div>`,async a=>{const r=a.closest("[data-p]");if(!r)return;const l=r.dataset.p;if(l==="free"&&n.parent({op:"freeChat",on:r.dataset.on!=="1"}),l==="freeMail"&&n.parent({op:"freeMail",on:r.dataset.on!=="1"}),l==="rename"&&n.parent({op:"rename",houseId:r.dataset.hid,name:s(`input[data-hid="${r.dataset.hid}"]`)}),l==="add"&&n.parent({op:"rosterAdd",name:r.dataset.name??s("#rosterInput")}),l==="unname"&&n.parent({op:"rosterRemove",name:r.dataset.name}),l==="unclaim"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again";return}n.parent({op:"unclaim",name:r.dataset.name})}if(l==="setcode"&&n.parent({op:"setCode",code:s("#codeEdit")}),l==="remove"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again to remove";return}n.parent({op:"remove",pid:r.dataset.pid})}if(l==="mailClear"||l==="mailClearAll"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent=l==="mailClearAll"?"Tap again to clear every mailbox":r.dataset.id?"Tap again":"Tap again to clear this mailbox";return}l==="mailClearAll"?n.parent({op:"mailClearAll"}):n.parent({op:"mailClear",houseId:r.dataset.hid,...r.dataset.id?{id:r.dataset.id}:{}})}if(l==="leave"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again: forget this street here";return}rn(null),o.close(),rc(),q("This iPad left the street")}},"wide parent");o.root.addEventListener("submit",a=>{a.preventDefault();const r=a.target.id;r==="rosterForm"&&n.parent({op:"rosterAdd",name:s("#rosterInput")}),r==="codeForm2"&&n.parent({op:"setCode",code:s("#codeEdit")})});const i=a=>{const r=new Date(a);return Number.isFinite(r.getTime())?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r.getMonth()]+" "+r.getDate()+", "+r.getFullYear():""};n.on("parentInfo",a=>{const r=o.root.querySelector("#parentBody");if(!r)return;const l=zs();l&&l.code!==a.code&&(l.code=a.code,rn(l)),n.cfg.code=a.code;const c=a.roster??[],d=new Set(c.map(m=>m.name.toLowerCase())),f=np.filter(m=>!d.has(m.toLowerCase())),g=c[0]?.name??"Reagan",h=Array.isArray(a.mail)?a.mail:[],u=h.some(m=>m.letters&&m.letters.length),b=vf(a.settings),_=h.map(m=>`<div class="pMailHouse"><div class="pMailName">${te(m.name||"House")}</div>${(m.letters||[]).slice().reverse().map(p=>`<div class="pLetter"><b>${te(p.from)}</b><span class="pWhen">${te(i(p.at))}</span><p>${te(p.text)}</p><button type="button" class="danger" data-p="mailClear" data-hid="${te(m.houseId)}" data-id="${te(p.id)}">Clear</button></div>`).join("")||'<p class="hint">No letters.</p>'}${(m.letters||[]).length?`<button type="button" class="danger" data-p="mailClear" data-hid="${te(m.houseId)}">Clear this mailbox</button>`:""}</div>`).join("");r.innerHTML=`${a.note?`<p class="err" id="pNote">${te(Zx[a.note]??a.note)}</p>`:""}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${te(a.code)}</div></div>
        <div><div class="label">Free typing</div><button class="toggle ${a.settings.freeChat?"on":""}" data-p="free" data-on="${a.settings.freeChat?1:0}" id="pFree">${a.settings.freeChat?"On":"Off (presets only)"}</button><p class="hint small">Chat bubbles. Off means preset phrases only.</p></div>
        <div><div class="label">Let kids type their own letters</div><button class="toggle ${b?"on":""}" data-p="freeMail" data-on="${b?1:0}" id="pFreeMail">${b?"On":"Off (presets only)"}</button><p class="hint small">Letters only. Off means preset phrases only.</p></div></div>
      <div class="label">Letters</div><div id="parentMail">${_||'<p class="hint">No letters right now.</p>'}${u?'<button type="button" class="danger" data-p="mailClearAll" id="mailClearAll">Clear every mailbox</button>':""}</div>
      <form class="pAdd" id="codeForm2"><input id="codeEdit" maxlength="${Sl}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="e.g. ${te(Fi(g))}7"/><button data-p="setcode" type="button">Use this code</button></form>
      <p class="hint small">Tip: a word plus a number (like ${te(Fi(g))}7) is easy to remember and harder to guess. Not case-sensitive.</p>
      <div class="label">Kids' names (sign-in list)</div>
      <div class="roster">${c.map(m=>`<span class="rName ${m.claimed?"claimed":""}"><b>${te(m.name)}</b>${m.claimed?`<i>signed in</i><button data-p="unclaim" data-name="${te(m.name)}">Reset</button>`:m.hasHouse?"<i>not signed in</i>":`<button class="x" data-p="unname" data-name="${te(m.name)}" aria-label="Remove name">×</button>`}</span>`).join("")||'<p class="hint">No names yet: kids pick a fun nickname instead.</p>'}</div>
      <form class="pAdd" id="rosterForm"><input id="rosterInput" maxlength="20" autocomplete="off" placeholder="First name"/><button data-p="add" type="button">Add</button></form>
      ${f.length?`<div class="sugg">${f.map(m=>`<button data-p="add" data-name="${m}">+ ${m}</button>`).join("")}</div>`:""}
      <div class="label">Houses</div>${a.houses.map(m=>`<div class="pHouse"><input data-hid="${m.id}" value="${te(m.name)}" maxlength="24"/><button data-p="rename" data-hid="${m.id}">Rename</button></div>`).join("")||'<p class="hint">No houses yet.</p>'}
      <div class="label">Players</div>${a.players.map(m=>`<div class="pPlayer"><span class="dot ${m.online?"on":""}"></span>${te(m.nickname)}<button class="danger" data-p="remove" data-pid="${m.pid}">Remove</button></div>`).join("")||'<p class="hint">Nobody has joined yet.</p>'}
      <p class="hint small">Letters stay on the server for up to 30 days. They are filtered, and only a first name is stored. You can clear them here, or turn off “Let kids type their own letters” so new letters use preset phrases. Chat bubbles are only relayed to kids standing nearby and are not saved. No emails or last names. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays).</p>
      <button class="danger wideBtn" data-p="leave">Forget this street on this device</button>`}),n.on("error",a=>{a==="badkey"&&(q("That grown-up key didn't work"),e.parentKey=void 0,rn(e),o.close())}),n.parent({op:"info"})}let pt=null;function On(){return x("park").clientHeight/Tl}const Ix=()=>{const e=ee.get();return e.characters.find(t=>t.id===e.dog?.owner)??e.characters[0]},Gt=()=>y?me():pt;function Wt(e){y?Te(e):pt=e,S==="ranch"?Rn():S==="gameroom"?Co():bs()}function Pn(e="park"){if(y){const n=[],s=[...y.presence.entries()],o=me();o&&s.push([y.pid,o]);for(const[i,a]of s){const r=y.players.get(i);r&&a.where===e&&n.push({key:i,look:r.look,name:r.nickname,p:a,mine:i===y.pid,dog:r.dog??null})}return n}const t=Ix();return pt&&pt.where===e?[{key:"solo",look:jo(t??{}),name:"",p:pt,mine:!0,dog:ee.get().dog??null}]:[]}function dc(){const e=On(),t=x("parkWorld"),n=s=>s*e+"px";t.style.width=Hl*e+"px",t.style.height=Tl*e+"px",t.style.setProperty("--sc",String(e)),t.innerHTML=yu()+Qr.map((s,o)=>s.kind==="swing"?`<div class="swing" data-swing="${o}" style="left:${n(s.x-30)};top:${n(Ht)};width:${n(60)};height:${n(240)}">${ku}</div>`:"").join("")+Qr.map((s,o)=>`<button class="pspot k-${s.kind}" data-spot="${o}" aria-label="${s.kind}" style="left:${n(s.x-50)};top:${n(s.y-(s.kind==="swing"?70:55))};width:${n(100)};height:${n(s.kind==="swing"?90:65)}"></button>`).join("")+`<button class="pspot slide" data-act="slide" aria-label="Slide" style="left:${n(ie.ladder-45)};top:${n(ie.top.y-30)};width:${n(130)};height:${n(560-ie.top.y+30)}"></button><button class="pspot pond" data-act="splash" aria-label="Pond" style="left:${n(1235)};top:${n(462)};width:${n(370)};height:${n(105)}"></button><button class="pspot gate" data-act="exit" aria-label="Back to the street" style="left:${n(25)};top:${n(240)};width:${n(180)};height:${n(260)}"></button><div class="ripples" id="ripples"></div><button class="ball" id="ball" aria-label="Ball">${bu}</button><div class="savatars" id="pavatars"></div>`,pa(),bs(),ze()}const Nd=2400;function bs(){const e=document.getElementById("pavatars");if(!e||S!=="park")return;const t=On(),n=new Set,s=new Set;for(const o of Pn()){n.add(o.key);let i=e.querySelector(`.savatar[data-pid="${o.key}"]`);i||(i=document.createElement("div"),i.className="savatar "+(o.mine?"mine":"other"),i.dataset.pid=o.key,e.appendChild(i),o.mine&&oh(i));const a=JSON.stringify(o.look)+o.name;if(i.dataset.look!==a){const f=i.querySelector(".bubble");i.innerHTML=o.name?ic(o.look,o.name):`<div class="inner">${tt(o.look)}</div>`,f&&i.appendChild(f),i.dataset.look=a}const r=(Yo[o.look.size]??1)*t*.95,l=qn*r,c=jt*r;i.style.left=o.p.x*t-l/2+"px",i.style.top=o.p.y*t-c+"px",i.style.width=l+"px",i.style.height=c+"px",i.style.zIndex=String(100+Math.round(o.p.y)),i.classList.toggle("flipped",o.p.flip),Go(i,o.look,o.mine);const d=o.p.pose??"";i.dataset.pose!==d&&(i.classList.remove("pose-sit","pose-swing","pose-slide"),i.offsetWidth,d==="slide"&&(i.style.setProperty("--sx",(ie.top.x-ie.bottom.x)*t+"px"),i.style.setProperty("--sy",(ie.top.y-ie.bottom.y)*t+"px")),d&&i.classList.add("pose-"+d),i.dataset.pose=d),d==="swing"?(i.style.transformOrigin=`50% ${(Ht-o.p.y)*t+c}px`,i.style.animationDelay=-(Date.now()%Nd)/1e3+"s",s.add(o.p.spot??-1)):(i.style.transformOrigin="",i.style.animationDelay="")}e.querySelectorAll(".savatar").forEach(o=>{n.has(o.dataset.pid)||o.remove()}),document.querySelectorAll("#parkWorld .swing").forEach(o=>{const i=s.has(+o.dataset.swing);i&&!o.classList.contains("swinging")&&(o.style.animationDelay=-(Date.now()%Nd)/1e3+"s"),o.classList.toggle("swinging",i)}),ws()}function oh(e){e.addEventListener("pointerdown",t=>{t.preventDefault(),t.stopPropagation();const n=Gt();if(!n||n.where!=="park"&&n.where!=="ranch"&&n.where!=="barn")return;const s=n.where!=="park",o=n.where;it=[];const i=x(s?"ranchScroll":"parkScroll"),a=s?Qt():On(),r=o==="barn"?wl:s?No:Hl,l=v=>{const $=x(s?"ranchWorld":"parkWorld").getBoundingClientRect();return{x:(v.clientX-$.left)/a,y:(v.clientY-$.top)/a}},c=l(t),d={x:n.x-c.x,y:n.y-c.y};let f=t,g=0,h=n.x,u=!1;const b=v=>{const $=l(v),P=Gt();if(!P)return;const R=Math.max(60,Math.min(r-60,$.x+d.x)),W=Math.max(470,Math.min(590,$.y+d.y));if(!u&&Math.hypot(R-P.x,W-P.y)<6)return;u=!0;const F=Math.abs(R-h)>3?R<h:P.flip;Math.abs(R-h)>3&&(h=R),Wt(o==="barn"?{where:"barn",x:R,y:W,flip:F}:s?{where:"ranch",x:R,y:W,flip:F,...P.ride!==void 0?{ride:P.ride}:{}}:{where:"park",x:R,y:W,flip:F})},_=()=>{const v=i.getBoundingClientRect(),$=f.clientX<v.left+70?-10:f.clientX>v.right-70?10:0;$&&u&&(i.scrollLeft+=$,b(f)),g=requestAnimationFrame(_)};g=requestAnimationFrame(_),e.classList.add("lifted"),B.pick();const m=v=>{v.pointerId===t.pointerId&&(f=v,b(v))},p=v=>{v.pointerId===t.pointerId&&(cancelAnimationFrame(g),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",p),e.classList.remove("lifted"),B.drop())};window.addEventListener("pointermove",m),window.addEventListener("pointerup",p)})}x("parkWorld").addEventListener("pointerdown",e=>{e.target.closest(".pspot, .ball, .pet")&&e.stopPropagation()});x("parkWorld").addEventListener("click",e=>{const t=e.target,n=Gt();if(!n)return;if(t.closest("#ball")){Fx();return}const s=t.closest("[data-spot]");if(s){const i=+s.dataset.spot,a=Qr[i];if(n.spot===i&&n.pose){Wt({where:"park",x:a.x,y:Math.min(590,a.y+40),flip:n.flip});return}if(Pn().some(r=>!r.mine&&r.p.spot===i&&r.p.pose)){q("Someone is already there!");return}Wt({where:"park",x:a.x,y:a.y,flip:n.flip,pose:a.kind==="swing"?"swing":"sit",spot:i}),a.kind==="swing"?B.boing():B.drop();return}const o=t.closest("[data-act]")?.dataset.act;if(o==="slide"&&(Wt({where:"park",x:ie.bottom.x,y:ie.bottom.y,flip:!1,pose:"slide"}),B.swish(),setTimeout(()=>{const i=Gt();i?.pose==="slide"&&Wt({where:"park",x:i.x,y:i.y,flip:i.flip})},1500)),o==="splash"){const i=x("parkWorld").getBoundingClientRect(),a=(e.clientX-i.left)/On();ih(a),y?.fx({k:"splash",x:a})}o==="exit"&&ah()});function ih(e){const t=document.getElementById("ripples");if(!t||S!=="park")return;const n=On();for(let s=0;s<2;s++){const o=document.createElement("div");o.className="ripple";const i=(120+s*70)*n;Object.assign(o.style,{left:e*n-i/2+"px",top:512*n-i*.18+"px",width:i+"px",height:i*.36+"px",animationDelay:s*.15+"s"}),t.appendChild(o),setTimeout(()=>o.remove(),1400)}for(let s=0;s<6;s++){const o=document.createElement("div");o.className="drop",Object.assign(o.style,{left:e*n+"px",top:505*n+"px"}),o.style.setProperty("--dx",(s-2.5)*14+"px"),t.appendChild(o),setTimeout(()=>o.remove(),900)}B.splash()}function Ox(){$s(),it=[],_e=!1,S="park",x("park").classList.remove("hidden"),ei(x("park"));const e={where:"park",x:290,y:548,flip:!1};y?Te(e):pt=e,x("streetTitle").textContent="The Park",Vt(),dc(),requestAnimationFrame(()=>{const t=x("parkScroll");t.scrollLeft=0,ze()}),B.sparkle()}function ah(){As()}function Nx(){$s(),it=[],_e=!1,S="gameroom",x("gameroom").classList.remove("hidden");const e=Vs(),t=e?{where:"gameroom",x:e.x,y:Math.max(ls,Math.min(dn,e.y)),flip:!1}:{where:"gameroom",x:va()?520:280,y:560,flip:!1};y?Te(t):pt=t,x("streetTitle").textContent="The Clubhouse",Vt(),Nl(),requestAnimationFrame(()=>{const n=Dn(),s=x("grScroll"),o=e?.x??(va()?520:280);s.scrollLeft=Math.max(0,o*n-s.clientWidth/2),ze(),Hh()}),ei(x("gameroom")),B.sparkle()}x("btnLeavePark").addEventListener("click",()=>{S==="ranch"&&_e?Io(!1):ah()});let _n={x:2620,y:565},Me=null;function pa(e=!1){const t=document.getElementById("ball");if(!t)return;const n=On(),s=34*n;e||t.classList.remove("flying"),t.style.left=_n.x*n-s/2+"px",t.style.top=_n.y*n-s+"px",t.style.width=t.style.height=s+"px"}function Fx(){if(Me)return;const e=Ne.x0+40+Math.random()*(Ne.x1-Ne.x0-80),t=Ne.y0+25+Math.random()*(Ne.y1-Ne.y0-35);rh(y?y.pid:"solo",e,t),y?.fx({k:"ball",x:e,y:t})}function rh(e,t,n){if(S!=="park")return;const s=document.getElementById("ball");_n={x:t,y:n},Me={thrower:e,phase:"fly",dog:null,until:performance.now()+12e3},s&&(s.classList.remove("flying"),s.offsetWidth,s.classList.add("flying"),pa(!0)),B.boing(),setTimeout(()=>{Me?.phase==="fly"&&(Me.phase="chase",document.getElementById("ball")?.classList.remove("flying"),Mn.size||(Me=null))},650)}function jx(e){if(!y)return pt;const t=e===y.pid?me():y.presence.get(e);return t&&t.where==="park"?t:null}const Mn=new Map,xr=e=>(t,n,s,o,i)=>{t.style.left=(n-o/2)*e+"px",t.style.top=(s-i)*e+"px",t.style.width=o*e+"px",t.style.height=i*e+"px"};function Vx(){const e=[];if(S==="house"){const t=C.get(),n={box:J,place:vs,z:s=>String(4e3+Math.round(s)),scale:1};if(y&&qe!==ee){const s=[...y.presence.entries()],o=me();o&&s.push([y.pid,o]);for(const[i,a]of s){const r=y.players.get(i)?.dog;if(r&&a.where==="house"&&a.houseId===xe&&a.room===t.currentRoom){const l=Et(t.currentRoom,us(i,a),a);e.push({key:i,dog:r,x:l.x,y:l.y,flip:a.flip,...n})}}}else if(t.dog){const s=t.characters.find(o=>o.id===t.dog.owner)??t.characters[0];if(s&&s.room===t.currentRoom){const o=Et(s.room,xt(s),s);e.push({key:"solo",dog:t.dog,x:o.x,y:o.y,flip:s.flip,...n})}}}else if(S==="park"){const t=document.getElementById("pavatars");if(!t)return e;const n=On();for(const s of Pn())s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:xr(n),z:o=>String(Math.round(o)-200),scale:.95})}else if(S==="ranch"){const t=document.getElementById("ravatars");if(!t)return e;const n=Qt();for(const s of Pn(_e?"barn":"ranch"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:xr(n),z:o=>String(100+Math.round(o)),scale:.95,riding:s.p.ride!==void 0})}else if(S==="gameroom"){const t=document.getElementById("gavatars");if(!t)return e;const n=Dn();for(const s of Pn("gameroom"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:xr(n),z:o=>String(Math.round(o)-200),scale:.95})}return e}let Fd=performance.now();function Gx(e,t){const n=new Set;for(const s of Vx()){if(Xx(s.key))continue;n.add(s.key);let o=Mn.get(s.key);const i=s.flip?1:-1,a=!s.riding&&S==="house"&&C.get().currentRoom==="backyard",r=s.riding?200:78;let l=a?ed.x:s.x+i*r;s.riding?l=Math.max(50,Math.min(No-50,l)):S==="house"&&!a&&(l=hh(l,46));const c=a?ed.y:Math.min(595,s.y+(s.riding?28:6));if(!o||o.box!==s.box||!o.el.isConnected){o?.el.remove();const $=document.createElement("div");$.className="pet pet-dog",$.dataset.dog=s.key,s.box.appendChild($),Yx($,s.key),o={el:$,box:s.box,x:l,y:c,flip:s.flip,pose:"",look:"",idle:1,trickUntil:0,sitTrick:!1},Mn.set(s.key,o)}let d=l,f=c,g=s.riding?980:320;if(Me&&e>Me.until&&(Me=null,pa()),Me&&S==="park"){if(Me.phase==="chase")d=_n.x,f=_n.y,g=950,Math.hypot(o.x-d,o.y-f)<28&&(Me.phase="carry",Me.dog=s.key,B.woof());else if(Me.phase==="carry"&&Me.dog===s.key){const $=jx(Me.thrower)??{x:(Ne.x0+Ne.x1)/2,y:540};d=$.x+60,f=Math.min(590,$.y+6),g=750,_n={x:o.x+(o.flip?-40:40),y:o.y-30*s.scale},Math.hypot(o.x-d,o.y-f)<26&&(_n={x:$.x+70,y:Math.min(590,$.y+12)},Me=null,Ai(o,"♥"),B.sparkle()),pa()}}const h=e<o.trickUntil,u=d-o.x,b=f-o.y,_=Math.hypot(u,b);let m=!1;if(_>(Me?4:10)&&!h){const $=Za()?_:Math.min(_,g*t);o.x+=u/_*$,o.y+=b/_*$,m=!0,Math.abs(u)>1.5&&(o.flip=u<0),o.idle=0}else o.idle+=t,!h&&o.idle>.3&&Math.abs(s.x-o.x)>4&&(o.flip=s.x<o.x);const p=h&&o.sitTrick?"sit":m?"stand":o.idle>.9?"sit":"stand",v=p+s.dog.breed;if(o.pose+o.look!==p+v){const $=[...o.el.querySelectorAll(".bubble, .kennelBtn")];o.el.innerHTML=`<div class="inner">${Eo(s.dog.breed,p)}</div>`;for(const P of $)o.el.appendChild(P);o.pose=p,o.look=v}o.el.dataset.name=s.dog.name,o.el.classList.toggle("walking",m),o.el.classList.toggle("flipped",o.flip),s.place(o.el,o.x,o.y,92*s.scale,71*s.scale),o.el.style.zIndex=s.z(o.y+1),fh(o.el,s.key,!1)}for(const[s,o]of Mn)n.has(s)||(o.el.remove(),Mn.delete(s))}function Ai(e,t){e.el.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.el.appendChild(n),Ks(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const jd=new Map;function lh(e,t){const n=Mn.get(e);if(!n)return;const s=n.el.dataset.name??"";n.trickUntil=performance.now()+1400,n.sitTrick=t===0,n.el.classList.remove("spin","hop"),n.el.offsetWidth,t===0&&(Ai(n,`${s} sits! 🐾`),B.pop()),t===1&&(n.el.classList.add("spin"),Ai(n,"Wheee! ✨"),B.spin()),t===2&&(n.el.classList.add("hop"),Ai(n,"Woof! Woof!"),B.woof())}function Yx(e,t){e.addEventListener("pointerdown",n=>{n.stopPropagation(),n.preventDefault()}),e.addEventListener("click",n=>{n.stopPropagation();const s=(jd.get(t)??0)%3;jd.set(t,s+1),lh(t,s),y&&y.fx({k:"trick",owner:t,v:s})})}function Ka(e){const t=e?.dogKennel?.item;if(!t||!e)return null;for(const n of Object.values(e.rooms)){const s=n.items.find(o=>o.id===t&&o.kind==="kennel");if(s)return s}return null}function Kx(e){if(e==="solo")return ee.get();if(!y)return null;const t=y.players.get(e)?.houseId;return t?y.view(t):null}function Xx(e){return!!Ka(Kx(e))}function fc(){if(y){const e=y.myHouseId();return e?y.view(e):null}return ee.get()}function ch(){if(S!=="house")return null;const e=C.get(),t=Ka(e);if(!t||!e.rooms[e.currentRoom]?.items.some(n=>n.id===t.id))return null;if(y&&qe!==ee){const n=y.houses.get(xe)?.meta.ownerId,s=n?y.players.get(n)?.dog??null:null;return!n||!s?null:{key:n,dog:s,item:t}}return e.dog?{key:"solo",dog:e.dog,item:t}:null}function Jx(){const e=fc();if(!e)return null;const t=ma()?C.get().currentRoom:null;let n=null,s=null;for(const[o,i]of Object.entries(e.rooms))for(const a of i.items)a.kind==="kennel"&&((!n||a.z>=n.z)&&(n=a),o===t&&(!s||a.z>=s.z)&&(s=a));return s??n}function wi(e){if(!pc()){q("Adopt a dog first!");return}vo({type:"dog/kennel",item:e}),e?(B.pop(),q("Rest well, puppy!")):(B.woof(),q("Come on, puppy!"))}function gc(e){if(!pc()){q("Adopt a dog first!");return}const t=Ka(fc());if(e===void 0){if(t){wi(null);return}const n=Jx();if(!n){q("Put a dog kennel down first!");return}wi(n.id);return}t?.id===e?wi(null):wi(e)}function dh(e){const t=C.get(),n=t.rooms[t.currentRoom]?.items.find(s=>s.id===e);if(n){if(n.kind==="kennel"){ma()&&gc(n.id);return}n.kind==="cat-tower"&&l_()}}function e_(e,t){const n=C.get(),s=n.rooms[n.currentRoom]?.items.find(i=>i.id===t);if(!s)return;const o=du(s.kind);if(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),B.click(),o==="kennel"||o==="tower"){dh(t);return}if(o==="lamp"){e.classList.toggle("lamp-on");return}if(o==="open"){e.classList.toggle("opened");return}o==="sit"&&n_(s),o==="swing"&&t_(s)}let ht=null,ko=!1;function ua(){J.querySelectorAll(".item.swinging").forEach(e=>{(!ht||e.dataset.id!==ht.item)&&e.classList.remove("swinging")}),ht&&J.querySelector(`.item[data-id="${ht.item}"]`)?.classList.add("swinging")}function t_(e){const t=C.get(),n=t.characters.find(i=>i.id===Le&&i.room===t.currentRoom)??t.characters.find(i=>i.room===t.currentRoom);if(!n)return;if(ht?.id===n.id&&ht.item===e.id){ht=null,ko=!0,C.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x+70,y:Math.max(e.y,520)}),ko=!1,ua();return}const s=ke[e.kind],o=e.y-(s?Ke(s)*et(e)*.26:40);ht={id:n.id,item:e.id},ko=!0,C.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x,y:o}),ko=!1,ua()}function n_(e){const t=Fa(e);if(!t)return;if(y&&S==="house"){const i=me();if(!i||i.where!=="house")return;if(!y.speaksSit){const r="p:"+y.pid,l=It.get(r)?.item===e.id,c=Math.max(Zs+40,t.footY-8);l?It.delete(r):It.set(r,{item:e.id,pose:t&&Fo(e.kind).pose,n:0});const{seat:d,...f}=i;Te({...f,x:e.x,y:c,flip:!1}),mt();return}const a=Ii({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:ia(void 0,y.pid),alreadyOn:i.seat?.id===e.id?e.id:null});if(a.toast){q(a.toast),B.pop();return}if(!a.moved)return;Ei(i,a.x,a.y,!1,a.seat?{id:a.seat.item,pose:a.seat.pose,n:a.seat.n}:null),mt(),ps(!1);return}const n=C.get(),s=n.characters.find(i=>i.id===Le&&i.room===n.currentRoom)??n.characters.find(i=>i.room===n.currentRoom);if(!s)return;const o=Ii({mode:"play",via:"tap",releaseX:e.x,releaseY:t.footY,piece:t,occupied:ia(s.id),alreadyOn:s.seat?.item===e.id?e.id:null});if(o.toast){q(o.toast),B.pop();return}o.moved&&(yo(s.id,n.currentRoom,o.x,o.y,o.seat),ps(!1))}function fh(e,t,n){const s=y?t===y.pid:t==="solo";let o=e.querySelector(".kennelBtn");if(!s){o?.remove();return}o||(o=document.createElement("button"),o.type="button",o.className="kennelBtn",o.addEventListener("pointerdown",i=>{i.stopPropagation(),i.preventDefault()}),o.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault(),gc()}),e.appendChild(o)),o.textContent=n?"Out":"Kennel",s_(o)}function s_(e){if(S!=="house"){e.style.left=e.style.right=e.style.top=e.style.bottom=e.style.transform="";return}const t=e.parentElement;if(!t)return;const n=D.getBoundingClientRect().width/D.offsetWidth||1,s=D.getBoundingClientRect(),o=4,i={l:s.left+o,t:s.top+o,r:s.right-o,b:s.bottom-o},a=J.querySelector(".char")?.getBoundingClientRect(),r=J.querySelector('.item[data-kind="sofa"]')?.getBoundingClientRect(),l=[...J.querySelectorAll(".pet-cat, .item")].map(E=>E.getBoundingClientRect()).filter(E=>E.width>2&&E.height>2),c=(E,U)=>!!U&&E.left<U.right-1&&E.right>U.left+1&&E.top<U.bottom-1&&E.bottom>U.top+1,d=(E,U)=>c(E,U)?Math.max(0,Math.min(E.right,U.right)-Math.max(E.left,U.left))*Math.max(0,Math.min(E.bottom,U.bottom)-Math.max(E.top,U.top)):0,f=E=>{let U=0;E.left<i.l&&(U+=(i.l-E.left)*8),E.right>i.r&&(U+=(E.right-i.r)*8),E.top<i.t&&(U+=(i.t-E.top)*8),E.bottom>i.b&&(U+=(E.bottom-i.b)*8),U+=d(E,a)*4,U+=d(E,r)*4;for(const Kt of l)U+=d(E,Kt)*4;return U},g=t.getBoundingClientRect(),h=!a||g.left+g.width/2<=a.left+a.width/2,u=E=>({left:E?"0px":"auto",right:E?"auto":"0px",top:"46%",bottom:"auto",transform:E?"translate(-108%, -50%)":"translate(108%, -50%)"}),b=[u(h),u(!h),{left:"50%",right:"auto",top:"0px",bottom:"auto",transform:"translate(-50%, -115%)"}];let _=b[0],m=1/0;for(const E of b){Object.assign(e.style,E);const U=f(e.getBoundingClientRect());U<m&&(m=U,_=E)}Object.assign(e.style,_);let p=e.getBoundingClientRect(),v=0,$=0;p.left<i.l&&(v+=i.l-p.left),p.right>i.r&&(v-=p.right-i.r),p.top<i.t&&($+=i.t-p.top),p.bottom>i.b&&($-=p.bottom-i.b);const P=E=>{if(!E)return;const U=()=>new DOMRect(p.left+v,p.top+$,p.width,p.height);if(!c(U(),E))return;const Kt=Math.min(U().bottom,E.bottom)-Math.max(U().top,E.top),Nn=E.bottom+4-U().top,Fe=E.top-4-U().bottom,Ze=Fn=>U().top+Fn>=i.t&&U().bottom+Fn<=i.b;if(Kt<p.height*.5&&Ze(Nn)){$+=Nn;return}if(Kt<p.height*.5&&Ze(Fe)){$+=Fe;return}const $e=E.left-i.l,rt=i.r-E.right,hn=E===r?a:r,ii=(Fn,Wh)=>{if(!hn)return!1;const Rh=Wh?Fn-p.width:Fn,Eh=new DOMRect(Rh,U().top,p.width,p.height);return c(Eh,hn)};rt>=p.width+4&&!ii(E.right+4,!1)?v+=E.right+4-U().left:$e>=p.width+4&&!ii(E.left-4,!0)?v+=E.left-4-U().right:Ze(Nn)?$+=Nn:Ze(Fe)&&($+=Fe)};P(a),P(r);const R=t.querySelector(".inner")?.getBoundingClientRect(),W=R&&R.width>2?R:g,F=J.querySelector(".pet-cat")?.getBoundingClientRect(),ne=J.querySelector('.item[data-kind="sandbox"]')?.getBoundingClientRect(),se=J.querySelector('.item[data-kind="yard-bench"]')?.getBoundingClientRect(),I=[...J.querySelectorAll('.item[data-kind="yard-swing"], .item[data-kind="picnic-blanket"], .item[data-kind="lemonade-cart"], .item[data-kind="tulip-bed"]')].map(E=>E.getBoundingClientRect()),ae=D.querySelector(".yardDoor"),fn=ae?[ae,ae.querySelector(".yardHintLabel"),ae.querySelector(".doorArt")].map(E=>E?.getBoundingClientRect()):[],At=document.getElementById("secrets"),yt=At&&At.offsetParent?At.getBoundingClientRect():void 0,at=yt&&yt.width>2&&yt.left<i.r&&yt.right>i.l&&yt.top<i.b&&yt.bottom>i.t?yt:void 0,ni=at?new DOMRect(at.left-8,at.top-8,at.width+16,at.height+16):void 0,$c=[a,r,F,ne,se,ni,...I,...fn].filter(E=>!!E&&E.width>2&&E.height>2),gn=new DOMRect(p.left+v,p.top+$,p.width,p.height),xc=W.left+W.width/2,_c=W.top+W.height/2,si=E=>Math.hypot(E.left+E.width/2-xc,E.top+E.height/2-_c),Mc=E=>{const U=Math.min(E.right,W.right)-Math.max(E.left,W.left),Kt=Math.min(E.bottom,W.bottom)-Math.max(E.top,W.top);return U>1&&Kt>1},sr=E=>E.left>=i.l-.5&&E.right<=i.r+.5&&E.top>=i.t-.5&&E.bottom<=i.b+.5&&$c.every(U=>!c(E,U))&&!Mc(E);let oi=gn;if(!sr(gn)||si(gn)>150){const E=[],U=(Fe,Ze)=>{let $e=Fe,rt=Ze;$e<i.l&&($e=i.l),rt<i.t&&(rt=i.t),$e+p.width>i.r&&($e=Math.max(i.l,i.r-p.width)),rt+p.height>i.b&&(rt=Math.max(i.t,i.b-p.height)),E.push(new DOMRect($e,rt,p.width,p.height))};U(W.left+(W.width-p.width)/2,W.top-p.height-8),U(W.right-p.width,W.top-p.height-6),U(W.left,W.top-p.height-6),a&&U(a.right+6,W.top-p.height-8),se&&U(se.left-p.width-6,se.top-p.height-6),a&&se&&U(a.right+6,se.top-p.height-6),a&&(U(a.left-12,a.top-p.height-8),U(i.l,a.top-p.height-10),U(a.left+(a.width-p.width)/2,a.top-p.height-8)),U(i.r-p.width,W.top-p.height-6),U(W.right+8,W.top+(W.height-p.height)/2),U(W.left-p.width-8,W.top+(W.height-p.height)/2),U(gn.left,gn.top);for(const Fe of[p.width*.65,p.width*1.05,88,120,155])for(let Ze=0;Ze<8;Ze++){const $e=Ze*Math.PI/4;U(xc+Math.cos($e)*Fe-p.width/2,_c+Math.sin($e)*Fe-p.height/2)}const Kt=Fe=>{let Ze=1/0,$e=null;for(const rt of E){if(!sr(rt)||si(rt)>Fe)continue;const hn=si(rt);hn<Ze&&(Ze=hn,$e=rt)}return $e},Nn=Kt(170)??Kt(360);if(Nn)oi=Nn;else if(!sr(gn)){let Fe=null,Ze=1/0;for(const $e of E){if($e.left<i.l-.5||$e.right>i.r+.5||$e.top<i.t-.5||$e.bottom>i.b+.5)continue;const hn=(Mc($e)?1e4:0)+$c.reduce((ii,Fn)=>ii+d($e,Fn),0)+si($e);hn<Ze&&(Ze=hn,Fe=$e)}Fe&&(oi=Fe)}}v+=oi.left-gn.left,$+=oi.top-gn.top,(v||$)&&(e.style.transform=`${e.style.transform} translate(${(v/n).toFixed(1)}px, ${($/n).toFixed(1)}px)`)}function o_(e,t){e.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.appendChild(n),Ks(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const bo=new Map;function i_(){const e=new Set,t=ch();if(t){e.add(t.key);const n=tu(t.dog.name,Date.now()),s=ke[t.item.kind],i=(s?Gs(s,t.item.y):Math.min(t.item.y,Ce-yg))-(n==="peek"?24:2);let a=bo.get(t.key);if(!a||!a.el.isConnected){a?.el.remove();const l=document.createElement("div");l.className="pet pet-dog kenneled",l.dataset.dog="kennel:"+t.key,J.appendChild(l),l.addEventListener("pointerdown",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),c.preventDefault())}),l.addEventListener("click",c=>{c.target.closest(".kennelBtn")||(c.stopPropagation(),o_(l,`${l.dataset.name??"Puppy"} is resting`))}),a={el:l,pose:"",look:"",x:t.item.x,y:i},bo.set(t.key,a)}const r=n==="rest"?"sleep":"sit";if(a.pose!==r||a.look!==n+t.dog.breed){for(const l of[...a.el.children])l.matches(".bubble, .kennelBtn")||l.remove();a.el.insertAdjacentHTML("afterbegin",`<div class="inner">${Eo(t.dog.breed,r)}</div>${n==="rest"?'<div class="zzz"><b>Zzz</b><i>z</i><i>z</i><i>z</i></div>':""}`),a.pose=r,a.look=n+t.dog.breed}a.el.dataset.name=t.dog.name,a.el.classList.toggle("rest",n==="rest"),a.el.classList.toggle("peek",n==="peek"),a.x=t.item.x,a.y=i,vs(a.el,t.item.x,i,100,77),a.el.style.zIndex=String(1e3+t.item.z+1),fh(a.el,t.key,!0)}for(const[n,s]of bo)e.has(n)||(s.el.remove(),bo.delete(n))}let G=null,$i="",_r=0,hc=0,Ui={x:0,perch:0,leap:!1};const a_=562;function gh(e){return(e.rooms[e.currentRoom]?.items.filter(n=>n.kind==="cat-tower")??[]).reduce((n,s)=>!n||s.z>=n.z?s:n,null)}function Vd(e){return e==="cat-bed"||e==="pet-bed"||e==="dog-bed"||e==="pack:cat-bed"||/(?:^|:)cat-bed$|(?:^|:)pet-bed$/.test(e)}function r_(e){const t=e.rooms[e.currentRoom]?.items??[],n=t.filter(a=>Vd(a.kind)),s=t.filter(a=>a.kind==="bed"),o=(n.length?n:s).reduce((a,r)=>!a||r.z>=a.z?r:a,null);if(!o)return null;const i=ke[o.kind];return{x:o.x,y:o.y,h:i?Ke(i)*et(o):80,pet:Vd(o.kind)}}function l_(){const e=C.get();!e.cat||e.cat.room!==e.currentRoom||!gh(e)||(hc=performance.now()+900,B.boing(),y?.fx({k:"leap"}))}function c_(){const e=C.get(),t=S==="house"?e.cat:null;if(!t||t.room!==e.currentRoom){G&&(G.remove(),G=null,$i="",_r=0);return}(!G||!G.isConnected)&&(G=document.createElement("div"),G.className="pet pet-cat",J.appendChild(G),$i="",G.addEventListener("pointerdown",R=>{R.stopPropagation(),R.preventDefault()}),G.addEventListener("click",R=>{R.stopPropagation(),ph(),y&&y.fx({k:"purr"})}));const n=gh(e),s=n?null:r_(e),o=n?ke[n.kind]:void 0,i=n&&o?Ke(o)*et(n):0,a=nu(t,Date.now(),n?{x:n.x}:null,s?{x:s.x}:null,Za()),r=!!n&&performance.now()<hc,l=r?2:a.perch,c=r&&n?n.x:a.x,d=r?"play":a.mood,f=d==="walk"?"stand":d==="nap"?"nap":"sit",g=f+t.coat+(l?"p":"");if(g!==$i){const R=[...G.querySelectorAll(".bubble, .heart")];G.innerHTML=`<div class="inner">${Ds(t.coat,f)}</div>${f==="nap"?'<div class="zzz"><i>z</i><i>z</i><i>z</i></div>':""}`;for(const W of R)G.appendChild(W);$i=g}if(l>0&&_r===0){G.classList.add("hop");const R=G;setTimeout(()=>R.classList.remove("hop"),420)}_r=l,G.dataset.name=t.name,G.dataset.mood=d,G.dataset.perch=String(l),G.dataset.leap=r?"1":"0",G.dataset.curl=a.curl?"1":"0",G.classList.toggle("walking",d==="walk"),G.classList.toggle("groom",d==="groom"),G.classList.toggle("play",d==="play"&&!r),G.classList.toggle("leap",r),G.classList.toggle("flipped",a.flip),G.classList.toggle("curl",a.curl===1),J.querySelectorAll(".item.toy-live").forEach(R=>R.classList.remove("toy-live")),n&&d==="play"&&l&&!r&&J.querySelector(`.item[data-id="${n.id}"]`)?.classList.add("toy-live");const h=window.__pinCat,u=!!(h&&Number.isFinite(h.x)),b=u&&Number.isFinite(h.y)?h.y:a_,_=!u&&l&&n?eu(n.y,i,l):!u&&a.curl&&s?s.y-s.h*(s.pet?.38:.2):b,m=e.currentRoom==="backyard"&&!l,p=!u&&l?92:m?115:128,v=!u&&l?110:m?135:150,$=u?h.x:e.currentRoom==="backyard"?Sn.x:hh(c,v/2),P=!u&&e.currentRoom==="backyard"&&!l?Sn.y:_;vs(G,$,P,v,p),G.style.zIndex=String(4e3+Math.round(P)),Ui={x:$,perch:l,leap:r}}function hh(e,t){const n=C.get().currentRoom,s=n==="backyard"?Ef:n==="living"?Rf:null;if(!s)return e;const o=s.x-s.w/2-t-16,i=s.x+s.w/2+t+16;return e<=o||e>=i?e:e<s.x?o:i}function ph(){if(!G)return;B.purr(),setTimeout(()=>B.meow(),250),G.querySelector(".bubble")?.remove();const e=document.createElement("div");e.className="bubble petBubble",e.textContent=`${G.dataset.name} purrs ♥`,G.appendChild(e),Ks(),setTimeout(()=>e.classList.add("out"),1500),setTimeout(()=>e.remove(),1900),G.classList.remove("happy"),G.offsetWidth,G.classList.add("happy");for(let t=0;t<5;t++){const n=document.createElement("div");n.className="heart",n.textContent="♥",n.style.left=20+Math.random()*60+"%",n.style.animationDelay=t*.12+"s",n.style.color=["#ff6b9a","#ff8fab","#e879c6"][t%3],G.appendChild(n),setTimeout(()=>n.remove(),1800)}}function d_(e,t){if(t.k==="zoo"||t.k==="apple"||t.k==="honk"||t.k==="hen"){M_(t);return}t.k==="trick"?lh(t.owner,t.v):t.k==="purr"?S==="house"&&ph():t.k==="leap"?S==="house"&&(hc=performance.now()+900):t.k==="ball"?rh(e,t.x,t.y):t.k==="splash"&&ih(t.x)}function uh(e){const t=Math.min(.05,Math.max(0,(e-Fd)/1e3));Fd=e;try{Gx(e,t),i_(),c_(),C_(e,t),P5(t),jf()}catch{}requestAnimationFrame(uh)}function f_(){return y?y.view(y.myHouseId())?.cat??null:ee.get().cat??null}function pc(){return y?y.players.get(y.pid)?.dog??null:ee.get().dog??null}function vo(e){if(y){const t=y.myHouseId();t&&y.dispatch(t,e)}else ee.dispatch(e)}const ma=()=>S==="house"&&(!y||qe===ee||xe===y.myHouseId());function g_(e="cat"){const t=f_(),n=pc(),s=ee.get().characters,o={tab:e,coat:t?.coat??0,catName:t?.name??"",breed:n?.breed??0,dogName:n?.name??"",owner:n?.owner??s[0]?.id,err:"",bye:!1},i=Lt("",(l,c)=>{const d=h=>l.closest(`[${h}]`)?.getAttribute(h);if(d("data-pt")){o.tab=d("data-pt"),o.err="",o.bye=!1,r();return}if(d("data-coat")!=null){o.coat=+d("data-coat"),B.click(),r();return}if(d("data-breed")!=null){o.breed=+d("data-breed"),B.click(),r();return}if(d("data-cname")){o.catName=d("data-cname"),B.click(),r();return}if(d("data-dname")){o.dogName=d("data-dname"),B.click(),r();return}if(d("data-owner")){o.owner=d("data-owner"),B.click(),r();return}const f=d("data-pa");if(!f)return;const g=(i.root.querySelector("#petName")?.value??"").trim();if(f==="adoptCat"||f==="adoptDog"){const h=g||(f==="adoptCat"?o.catName:o.dogName),u=Np(h);if(!u){o.err=h?"Hmm, try a different name!":"Pick a name first!",B.pop(),r();return}if(f==="adoptCat"){const b=ma(),_={name:u,coat:o.coat,room:b?C.get().currentRoom:t?.room??"living",x:b?Math.max(200,Math.min(ge-200,K+X/2)):t?.x??1200};vo({type:"cat/set",cat:_}),B.meow(),c(),q(t?`${u} looks great! 🐱`:b?`${u} moved in! 🐱`:`${u} is waiting at your house! 🐱`)}else{const b=y?{name:u,breed:o.breed}:{name:u,breed:o.breed,owner:o.owner};y?(y.setDog(b),S==="park"&&bs()):ee.dispatch({type:"dog/set",dog:b}),B.woof(),c(),q(n?`${u} looks great! 🐶`:`${u} is your new best friend! 🐶`)}return}if(f==="callCat"){vo({type:"cat/move",room:C.get().currentRoom,x:Math.max(200,Math.min(ge-200,K+X/2))}),B.meow(),c();return}if(f==="kennelDog"){gc(),c();return}if(f==="bye"){if(!o.bye){o.bye=!0,r();return}o.tab==="cat"?vo({type:"cat/set",cat:null}):(vo({type:"dog/kennel",item:null}),y?y.setDog(null):ee.dispatch({type:"dog/set",dog:null})),c(),q("They went to live with a kind friend 💛");return}},"wide pets"),a=i.root.querySelector(".card");function r(){const l=o.tab==="cat",c=l?t:n,d=l?Ip:Op,f=l?o.catName:o.dogName,g=i.root.querySelector("#petName")?.value??"";a.innerHTML=`${Ct}<h2>Pets</h2>
      <div class="petTabs"><button data-pt="cat" class="${l?"on":""}">🐱 Cat</button><button data-pt="dog" class="${l?"":"on"}">🐶 Dog</button></div>
      <p class="hint small">${l?y?"Your cat lives in your house. Friends can see her when they visit!":"Your cat lives in your house. She naps, purrs, and plays!":y?"Your dog follows you everywhere: the street, friends' houses, and the park!":"Your dog follows you around the house and to the park!"}</p>
      <div class="petRow"><div class="petPreview">${l?Ds(o.coat,"sit"):Eo(o.breed,"stand")}</div>
        <div class="swatches">${(l?Ur:zr).map((h,u)=>`<button ${l?"data-coat":"data-breed"}="${u}" class="${u===(l?o.coat:o.breed)?"on":""}"><div>${l?Ds(u,"sit"):Eo(u,"stand")}</div><span>${h.name}</span></button>`).join("")}</div></div>
      <div class="label">Name</div>
      <div class="nameChips">${d.map(h=>`<button ${l?"data-cname":"data-dname"}="${h}" class="${h===f?"on":""}">${h}</button>`).join("")}</div>
      <input id="petName" class="petName" maxlength="14" autocomplete="off" placeholder="…or type a name" value="${te(g)}"/>
      ${o.err?`<p class="err" id="petErr">${te(o.err)}</p>`:""}
      ${!l&&!y&&s.length>1?`<div class="label">Who does your dog follow?</div><div class="walkers">${s.map(h=>`<button data-owner="${h.id}" class="${h.id===o.owner?"on":""}">${tt(h)}</button>`).join("")}</div>`:""}
      <div class="petBtns"><button class="go" data-pa="${l?"adoptCat":"adoptDog"}" id="adoptBtn">${c?"Save":"Adopt! 💛"}</button>
        ${l&&t&&ma()?'<button data-pa="callCat" id="callCat">Here, kitty!</button>':""}
        ${!l&&n?`<button data-pa="kennelDog" id="kennelDog">${Ka(fc())?"Come, puppy!":"Kennel"}</button>`:""}
        ${c?`<button class="danger" data-pa="bye">${o.bye?"Tap again to say goodbye":"Find a new home"}</button>`:""}</div>`}r()}x("btnPets").addEventListener("click",()=>g_(S==="house"?"cat":"dog"));requestAnimationFrame(uh);window.__pets=()=>{const e=ch(),t=e?bo.get(e.key):void 0;return{dogs:[...Mn.keys()],dogPos:Object.fromEntries([...Mn].map(([n,s])=>[n,{x:Math.round(s.x),y:Math.round(s.y)}])),cat:G?{mood:G.dataset.mood,name:G.dataset.name,perch:Ui.perch,x:Math.round(Ui.x),leap:Ui.leap,curl:G.dataset.curl==="1"}:null,kennel:e&&t?{x:Math.round(t.x),y:Math.round(t.y),pose:t.pose,name:e.dog.name,item:e.item.id}:null,dogKennel:C.get().dogKennel??null,fetch:Me?.phase??null,ball:_n,view:S}};function Qt(){return x("ranch").clientHeight/Ko}let it=[];const Zo=e=>String(100+Math.round(e)),mh=220,h_=mh*130/160,yh=156,p_=yh*130/160,u_=.6,m_=3.5,y_=3,pl=10,Tn=new Map,zi=new Map;function ya(e,t,n=pl){const s=(e-Ge.x)/(Ge.rx+n),o=(t-Ge.y)/(Ge.ry+n);return s*s+o*o<1}function Mr(e,t,n,s){for(let o=0;o<=18;o++){const i=o/18;if(ya(e+(n-e)*i,t+(s-t)*i))return!0}return!1}function ka(e,t){return{x:Math.max(70,Math.min(mc()-70,e)),y:Math.max(ls,Math.min(dn,t))}}function k_(e,t){const n=ka(t.x,t.y);if(ya(n.x,n.y,6))return null;if(!Mr(e.x,e.y,n.x,n.y))return[n];const s=Ge.x-Ge.rx-pl-28,o=Ge.x+Ge.rx+pl+28;let i=null,a=1/0;for(const r of[ls+1,dn-2]){const l=[];let c=e.x,d=e.y;const f=(_,m)=>{const p=ka(_,m);l.push(p),c=p.x,d=p.y};Mr(c,d,c,r)&&f(c<Ge.x?s:o,d),Math.abs(d-r)>3&&f(c,r),Math.abs(c-n.x)>3&&f(n.x,r),l.push(n);let g=!0,h=e.x,u=e.y,b=0;for(const _ of l){if(Mr(h,u,_.x,_.y)||ya(_.x,_.y,4)){g=!1;break}b+=Math.hypot(_.x-h,_.y-u),h=_.x,u=_.y}g&&b<a&&(i=l,a=b)}return i}function kh(e,t){const n=Gt();if(!n)return;const s={x:Math.max(60,Math.min(mc()-60,e)),y:Math.max(ls,Math.min(dn,t))};if(n.ride!==void 0&&n.where==="ranch"){const o=k_(n,s);if(!o){q("The horse won't splash through the pond!"),B.pop();return}it=o}else it=[s]}function b_(e){if(e.look2)return V$(e.look2);const t=e.pants,n="#5a3d5c",s=(o,i,a,r)=>`<path class="${o}" d="${i}" fill="none" stroke="${n}" stroke-width="${a}" stroke-linecap="round"/><path class="${o} cloth" d="${i}" fill="none" stroke="${t}" stroke-width="${r}" stroke-linecap="round"/>`;return`<svg class="rideleg" viewBox="0 0 160 130">${s("thigh","M66 56 L102 66",13,8)}${s("shin","M102 68 L106 104",12,7.2)}<circle class="knee" cx="102" cy="67" r="6.2" fill="${t}" stroke="${n}" stroke-width="3.5"/><ellipse class="shoe" cx="116" cy="106" rx="11" ry="5.2" fill="${n}"/></svg>`}function Wn(){return document.body.classList.contains("phone")&&document.body.classList.contains("phone-portrait")&&!_e}function Xa(){if(!Wn())return Jd.map((t,n)=>n);const e=[0,2,4];for(const t of Pn("ranch")){const n=t.p.ride;n!==void 0&&e.indexOf(n)<0&&e.push(n)}return e}function Un(e){if(!Wn())return Jd[e];const t=Xa(),n=t.indexOf(e),s=t.length,o=n<0?0:n,i=uc().w/2,a=2400+i+18,r=3080-i-18;return s<=1?Math.round((a+r)/2):Math.round(a+(r-a)*o/(s-1))}function uc(){return Wn()?{w:131,h:106}:{w:150,h:122}}function ba(e,t,n){const s=Qt(),{w:o,h:i}=uc();e.style.left=(t-o/2)*s+"px",e.style.top=(n-i)*s+"px",e.style.width=o*s+"px",e.style.height=i*s+"px",e.style.zIndex=Zo(n)}function v_(){if(S!=="ranch"||_e||!document.body.classList.contains("phone"))return;const e=new Set(Xa());document.querySelectorAll("#ranchWorld .horse").forEach(t=>{const n=+t.dataset.horse;t.classList.toggle("stallOff",Wn()&&!e.has(n)),!(!e.has(n)||Tn.has(n)||t.classList.contains("away"))&&ba(t,Un(n),cs)})}function w_(e,t,n){if(Tn.has(e)||Math.hypot(t-Un(e),n-cs)<26)return;Tn.set(e,{x:t,y:n});const s=document.querySelector(`#ranchWorld .horse[data-horse="${e}"]`);s&&(s.classList.add("trotting"),s.classList.remove("away"),s.classList.toggle("flipped",Un(e)<t),ba(s,t,n))}function $_(e,t,n){const s=n?-1:1;for(const o of[s*118,-s*118,s*160,-s*78])for(const i of[0,30,-26,48]){const a=ka(e+o,t+i);if(!(Math.hypot(a.x-e,a.y-t)<50)&&!ya(a.x,a.y,8))return a}return ka(e,t)}let Gd=0,bh=0;const Ja=()=>y?y.now():Date.now(),er=()=>_l(y?y.ranch.plots:ee.get().garden),ti=()=>xl(y?y.players.get(y.pid)?.basket:ee.get().basket),mc=()=>_e?wl:No,vh=()=>_e?"barn":"ranch",wh=()=>{const e=new Map;for(const t of Pn("ranch"))t.p.ride!==void 0&&e.set(t.p.ride,t);return e};function ul(e){const t={taken:"A friend just planted there!",wet:"Already watered 💧",notReady:"Still growing! 🌱",full:"Your basket is full!",slow:"The hen is laying… try again!",none:"Your basket has none left",nohouse:"Go home to put it in your room"};t[e]&&(q(t[e]),B.pop())}function Us(e){if(y){const o=Br(er(),ti(),e,Ja(),e.op==="egg"?Gd:0);return typeof o=="string"?(ul(o),!1):(e.op==="egg"&&(Gd=Date.now()),y.ranchOp(e),!0)}const t=ee.get(),n=Date.now(),s=Br(_l(t.garden),xl(t.basket),e,n,t.lastEgg??0);return typeof s=="string"?(ul(s),!1):(ee.dispatch({type:"ranch/op",op:e,now:n}),tr(!0),bc(),!0)}function Io(e=!1){const t=S==="ranch"&&_e&&!e;$s(),x("ranch").classList.remove("hidden"),Me=null,it=[],S="ranch",_e=e;const n=e?{where:"barn",x:170,y:560,flip:!1}:{where:"ranch",x:t?Lr:130,y:t?520:565,flip:!1};y?Te(n):pt=n,x("streetTitle").textContent=e?"The Barn":"Rainbow Ranch",Vt(),yc(),requestAnimationFrame(()=>{const s=x("ranchScroll"),o=Qt();s.scrollLeft=t?Math.max(0,Lr*o-s.clientWidth/2):0,yl()}),setTimeout(yl,650),ei(x("ranch")),e?B.swish():B.sparkle()}x("btnHopOff").addEventListener("click",()=>$h());function yc(){const e=Qt(),t=x("ranchWorld"),n=o=>o*e+"px",s=(o,i,a,r)=>`left:${n(o-a/2)};top:${n(i-r)};width:${n(a)};height:${n(r)};z-index:${Zo(i)}`;if(t.style.width=mc()*e+"px",t.style.height=Ko*e+"px",t.style.setProperty("--sc",String(e)),_e){t.innerHTML=B3()+`<button class="rprop barnExit" data-r="exit" aria-label="Go outside" style="${s(127,444,206,244)}"><span class="exitHint"><span>Outside ☀️</span></span></button>`+ts.map((o,i)=>`<button class="animal" data-animal="${i}" aria-label="${Yf[i].name}" style="${s($l[i],p0+30,128,107)}">${Xr(i)}</button>`).join("")+[300,1244].map(o=>["carrot","apple","hay"].map((i,a)=>`<button class="bucket" data-feed="${i}" aria-label="${i} bucket" style="${s(o+a*56,592,54,62)}">${$3(i)}</button>`).join("")).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',Rn(),ze();return}t.innerHTML=u3()+m3().replace("<svg ",`<svg style="z-index:${Zo(y3)}" `)+`<button class="rprop barnDoor" data-r="barn" aria-label="Go into the barn" style="${s(Lr,472,150,150)}"><span class="doorHint"><span>Petting zoo inside! 🐐</span></span></button><button class="rprop windmill" data-r="mill" aria-label="Windmill" style="${s(1540,478,150,240)}">${L3}</button><button class="rprop henHouse" data-r="egg" aria-label="Hen house" style="${s(715,482,180,170)}">${k3}</button><button class="rprop tractor" data-r="honk" aria-label="Tractor" style="${s(900,580,170,130)}">${b3}</button><button class="rprop appleTree" data-r="apple" aria-label="Apple tree" style="${s(2085,482,240,300)}">${v3}</button>`+u0.map((o,i)=>{const a=uc();return`<button class="horse${Wn()&&Xa().indexOf(i)<0?" stallOff":""}" data-horse="${i}" aria-label="${ta[i].name} horse" style="${s(Un(i),cs,a.w,a.h)}">${Zl(i)}</button>`}).join("")+Array.from({length:Cr},(o,i)=>`<button class="plot" data-plot="${i}" aria-label="Garden plot" style="${s(y0(i),594,66,86)}"></button>`).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',tr(!0),Rn(),ze()}const xi=[];function tr(e=!1){if(S!=="ranch"||_e)return;const t=er(),n=Ja();document.querySelectorAll("#ranchWorld .plot").forEach(s=>{const o=+s.dataset.plot,i=t[o]??null,a=Ta(i,n),r=JSON.stringify(i)+a;!e&&xi[o]===r||(xi[o]!==void 0&&xi[o]!==r&&a>0&&(s.classList.remove("grow"),s.offsetWidth,s.classList.add("grow")),xi[o]=r,s.innerHTML=Jf(i,a,o),s.dataset.stage=i?String(a):"empty")})}function Rn(){const e=document.getElementById("ravatars");if(!e||S!=="ranch")return;const t=Qt(),n=new Set,s=new Set;let o=!1;for(const i of Pn(vh())){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&oh(a));const r=JSON.stringify(i.look)+i.name;if(a.dataset.look!==r){const h=a.querySelector(".bubble");a.innerHTML=i.name?ic(i.look,i.name):`<div class="inner">${tt(i.look)}</div>`,h&&a.appendChild(h),a.dataset.look=r,a.dataset.ride=""}const l=i.p.ride,c=(Yo[i.look.size]??1)*t*.95*(l!==void 0?u_:1),d=qn*c,f=jt*c;if(a.dataset.ride!==String(l??"")&&(a.querySelector(".mount")?.remove(),l!==void 0&&a.insertAdjacentHTML("afterbegin",`<div class="mount" data-mount="${l}">${Zl(l,!0)}${b_(i.look)}</div>`),a.dataset.ride=String(l??"")),a.classList.toggle("riding",l!==void 0),l!==void 0){s.add(l),i.mine&&(o=!0),zi.set(l,{x:i.p.x,y:i.p.y});const h=Wn()?yh:mh,u=Wn()?p_:h_,b=h*t,_=u*t,m=a.querySelector(".mount");m.style.width=b+"px",m.style.height=_+"px",m.style.left=(d-b)/2+"px",m.style.top=f-_+"px";const p=Number(a.querySelector(".shirt")?.getAttribute("data-hem")??126),v=Number(m.querySelector(".saddle")?.getAttribute("data-top")??43),$=(p+m_/2)/160*f,P=f-_+(v-y_/2)/130*_;a.style.setProperty("--lift",$-P+"px");const R=m.querySelector(".rideleg");R&&(R.style.left="0",R.style.top="0",R.style.width="100%",R.style.height="100%")}else a.style.removeProperty("--lift");const g=parseFloat(a.dataset.lx??"NaN");Number.isFinite(g)&&Math.abs(g-i.p.x)>2&&(a.classList.add("moving"),clearTimeout(+(a.dataset.mt??0)),a.dataset.mt=String(window.setTimeout(()=>a.classList.remove("moving"),260))),a.dataset.lx=String(i.p.x),a.style.left=i.p.x*t-d/2+"px",a.style.top=i.p.y*t-f+"px",a.style.width=d+"px",a.style.height=f+"px",a.style.zIndex=Zo(i.p.y),a.classList.toggle("flipped",i.p.flip),Go(a,i.look,i.mine)}if(e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),document.body.classList.contains("phone")){const i=new Set(Xa());document.querySelectorAll("#ranchWorld .horse").forEach(a=>{a.classList.toggle("stallOff",Wn()&&!i.has(+a.dataset.horse))})}document.querySelectorAll("#ranchWorld .horse").forEach(i=>{const a=+i.dataset.horse;s.has(a)?(i.classList.add("away"),Tn.delete(a)):i.classList.remove("away")});for(const[i,a]of[...zi])s.has(i)||(w_(i,a.x,a.y),zi.delete(i));document.body.classList.toggle("riding",o),ws()}function x_(e){const t=Gt();if(!t||t.where!=="ranch")return;const n=wh().get(e);if(n&&!n.mine){q("Someone is riding!"),B.pop();return}if(t.ride!==void 0){if(n?.mine||t.ride===e){$h();return}kh(Un(e),Math.min(dn,cs+8));return}it=[],Tn.delete(e),Wt({where:"ranch",x:Un(e),y:Math.min(dn,cs+8),flip:!1,ride:e}),B.neigh(),q(`You're riding ${ta[e].name}! Tap the ground to gallop 🐴`)}function $h(){const e=Gt();if(!e||e.ride===void 0)return;const t=e.ride,{ride:n,...s}=e;it=[];const o=$_(s.x,s.y,s.flip);zi.set(t,{x:s.x,y:s.y}),Wt({...s,x:o.x,y:o.y}),B.drop()}function kc(e,t){const n=e<ts.length?document.querySelector(`#ranchWorld .animal[data-animal="${e}"]`):document.querySelector(`#ranchWorld .horse[data-horse="${e-ts.length}"]:not(.away)`)??document.querySelector(`#ravatars .mount[data-mount="${e-ts.length}"]`);if(!n||S!=="ranch")return;const s=e>=ts.length,o=s?{say:"Neigh! ♥",snd:"neigh"}:Yf[e];n.classList.remove("hop","munch"),n.offsetWidth,n.classList.add(t?"munch":"hop"),setTimeout(()=>n.classList.remove("hop","munch"),1400),n.querySelector(".abubble")?.remove();const i=document.createElement("div");i.className="bubble petBubble abubble",i.textContent=t?`Yum! Munch munch ${t===1?"🥕":t===2?"🍎":"🌾"}`:o.say,n.appendChild(i),Ks(),setTimeout(()=>i.classList.add("out"),1400),setTimeout(()=>i.remove(),1800);for(let a=0;a<(t?6:4);a++){const r=document.createElement("div");r.className="heart",r.textContent="♥",r.style.left=15+Math.random()*70+"%",r.style.animationDelay=a*.12+"s",r.style.color=["#ff6b9a","#ff8fab","#e879c6","#b197fc"][a%4],n.appendChild(r),setTimeout(()=>r.remove(),1900)}B[o.snd]?.(),t&&setTimeout(()=>B.munch(),250)}function xh(){const e=document.querySelector("#ranchWorld .henHouse");e&&(e.classList.remove("lay"),e.offsetWidth,e.classList.add("lay"),B.cluck())}function __(){const e=document.querySelector("#ranchWorld .henHouse"),t=x("basketChip");if(!e)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=document.createElement("div");o.className="flyEgg",o.innerHTML=Ao,document.body.appendChild(o),Object.assign(o.style,{left:n.left+n.width/2-18+"px",top:n.top+n.height*.6+"px"}),requestAnimationFrame(()=>{o.style.left=s.left+s.width/2-18+"px",o.style.top=s.top+"px",o.style.transform="scale(.6) rotate(200deg)"}),setTimeout(()=>{o.remove(),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")},650)}function _h(e){const t=document.getElementById("rfx");if(!t||S!=="ranch")return;const n=Qt(),[s,o]=gd[e]??gd[0],i=1965+s,a=182+o,r=i+(e%2?26:-22),l=575+e*4,c=document.createElement("button");c.className="fallenApple",c.dataset.feed="apple",c.setAttribute("aria-label","Apple"),c.innerHTML=Kf;const d=32*n;Object.assign(c.style,{width:d+"px",height:d+"px",left:i*n-d/2+"px",top:a*n-d/2+"px",zIndex:Zo(l)}),t.appendChild(c),requestAnimationFrame(()=>{c.style.left=r*n-d/2+"px",c.style.top=l*n-d+"px",c.classList.add("fallen")});const f=document.querySelector("#ranchWorld .appleTree");f?.classList.remove("shake"),f?.offsetWidth,f?.classList.add("shake"),B.boing(),setTimeout(()=>c.remove(),12e3)}function Mh(){const e=document.querySelector("#ranchWorld .tractor");e?.classList.remove("bounce"),e?.offsetWidth,e?.classList.add("bounce"),B.honk()}function M_(e){e.k==="zoo"?kc(e.a,e.f):e.k==="apple"?_h(e.v):e.k==="honk"?Mh():e.k==="hen"&&xh()}function Yd(e,t){const n=document.elementFromPoint(e,t);if(!n)return null;const s=n.closest("[data-animal]");if(s)return+s.dataset.animal;const o=n.closest(".horse:not(.away)");if(o)return ts.length+ +o.dataset.horse;const i=n.closest(".savatar.riding");return i?.dataset.ride?ts.length+ +i.dataset.ride:null}function ml(e,t,n){e.preventDefault(),e.stopPropagation();const s=document.createElement("div");s.className="feedGhost",s.innerHTML=Xf[t],document.body.appendChild(s);const o=u=>{s.style.left=u.clientX-30+"px",s.style.top=u.clientY-50+"px"};o(e),B.pick();let i=0;const a=e.clientX,r=e.clientY;n instanceof HTMLElement&&(n.style.visibility="hidden");let l=e.clientX,c=0;const d=x("ranchScroll"),f=()=>{const u=d.getBoundingClientRect(),b=l<u.left+60?-12:l>u.right-60?12:0;b&&i>12&&S==="ranch"&&(d.scrollLeft+=b),c=requestAnimationFrame(f)};c=requestAnimationFrame(f);const g=u=>{if(u.pointerId!==e.pointerId)return;l=u.clientX,i=Math.max(i,Math.hypot(u.clientX-a,u.clientY-r)),o(u),document.querySelectorAll(".feedHover").forEach(_=>_.classList.remove("feedHover")),Yd(u.clientX,u.clientY)!==null&&document.elementFromPoint(u.clientX,u.clientY)?.closest(".animal, .horse, .savatar")?.classList.add("feedHover")},h=u=>{if(u.pointerId!==e.pointerId)return;cancelAnimationFrame(c),window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",h),s.remove(),bh=Date.now(),document.querySelectorAll(".feedHover").forEach(m=>m.classList.remove("feedHover"));const b=Yd(u.clientX,u.clientY);if(b===null){n instanceof HTMLElement&&(n.style.visibility=""),i<12?q("Drag the food onto an animal! 🥕"):B.drop();return}if(n==="basket"&&!Us({op:"use",kind:"carrot"}))return;n instanceof HTMLElement&&n.remove();const _=m0.indexOf(t);kc(b,_),y?.fx({k:"zoo",a:b,f:_})};window.addEventListener("pointermove",g),window.addEventListener("pointerup",h)}x("ranchWorld").addEventListener("pointerdown",e=>{const t=e.target,n=t.closest(".bucket");if(n)return ml(e,n.dataset.feed,"bucket");const s=t.closest(".fallenApple");if(s)return ml(e,"apple",s);t.closest(".rprop, .animal, .horse, .plot, .pet")&&e.stopPropagation()});x("ranchWorld").addEventListener("click",e=>{const t=e.target;if(!Gt()||S!=="ranch"||Date.now()-bh<400)return;const s=t.closest("[data-animal]");if(s){const f=+s.dataset.animal;kc(f,0),y?.fx({k:"zoo",a:f,f:0});return}const o=t.closest("[data-horse]");if(o){x_(+o.dataset.horse);return}const i=t.closest("[data-r]")?.dataset.r;if(i==="egg"){xh(),Us({op:"egg"})&&(__(),B.pickup());return}if(i==="honk"){Mh(),y?.fx({k:"honk"});return}if(i==="apple"){const f=Math.floor(Math.random()*4);_h(f),y?.fx({k:"apple",v:f});return}if(i==="barn"){Io(!0);return}if(i==="exit"){Io(!1);return}if(i==="mill"){const f=t.closest(".windmill");f?.classList.remove("whirl"),f?.offsetWidth,f?.classList.add("whirl"),B.swish();return}const a=t.closest("[data-plot]");if(a){L_(+a.dataset.plot,a);return}if(t.closest(".bucket, .fallenApple, .savatar, .pet"))return;const r=x("ranchWorld").getBoundingClientRect(),l=Qt(),c=(e.clientX-r.left)/l,d=(e.clientY-r.top)/l;d<400||kh(c,d)});function L_(e,t){const n=er()[e]??null,s=Ta(n,Ja());if(document.querySelector(".seedPick")?.remove(),!n){const o=document.createElement("div");o.className="seedPick",o.innerHTML=`<button data-seed="carrot">${Ia}<span>Carrot</span></button><button data-seed="flower">${Il()}<span>Flower</span></button>`,t.parentElement.appendChild(o),o.style.left=t.offsetLeft+t.offsetWidth/2+"px",o.style.top=t.offsetTop-8+"px",o.addEventListener("pointerdown",i=>i.stopPropagation()),o.addEventListener("click",i=>{i.stopPropagation();const a=i.target.closest("[data-seed]")?.dataset.seed;o.remove(),a&&Us({op:"plant",i:e,seed:a})&&(B.plant(),q("Planted! Now tap it to water 💧"))}),setTimeout(()=>o.remove(),6e3);return}if(!n.wet){Us({op:"water",i:e})&&(B.water(),t.classList.remove("watering"),t.offsetWidth,t.classList.add("watering"));return}if(s<3){q("Still growing! 🌱"),B.pop();return}Us({op:"pick",i:e})&&(B.pickup(),q(n.seed==="carrot"?"A carrot for your basket! 🥕":"Pretty flowers for your basket! 🌸"))}let Kd=0;function C_(e,t){if(S!=="ranch")return;const n=Date.now();if(document.querySelectorAll("#ranchWorld .animal").forEach(s=>{const o=+s.dataset.animal,i=Qt(),a=n/5200+o*1.7,r=(_e?$l:h0)[o]+Math.sin(a)*32;s.style.left=(r-s.offsetWidth/i/2)*i+"px",s.classList.toggle("flipped",Math.cos(a)<0),s.classList.toggle("walking",Math.abs(Math.cos(a))>.35)}),e-Kd>1e3&&(Kd=e,tr()),it.length){const s=Gt();if(!s||s.where!==vh())it=[];else{const o=it[0],i=s.ride!==void 0?720:300,a=o.x-s.x,r=o.y-s.y,l=Math.hypot(a,r);if(l<6)it.shift();else{const c=Math.min(l,i*t),d={...s,x:s.x+a/l*c,y:s.y+r/l*c,flip:Math.abs(a)>2?a<0:s.flip};Wt(d);const f=Qt(),g=x("ranchScroll"),h=d.x*f-g.scrollLeft;h>-40&&h<g.clientWidth+40&&(h<g.clientWidth*.2||h>g.clientWidth*.8)&&(g.scrollLeft=d.x*f-g.clientWidth/2)}}}for(const[s,o]of Tn){const i=document.querySelector(`#ranchWorld .horse[data-horse="${s}"]`);if(!i||i.classList.contains("away")){Tn.delete(s);continue}const a=Un(s)-o.x,r=cs-o.y,l=Math.hypot(a,r);if(l<8){Tn.delete(s),i.classList.remove("trotting","flipped"),ba(i,Un(s),cs);continue}const c=Math.min(l,460*t);o.x+=a/l*c,o.y+=r/l*c,i.classList.add("trotting"),i.classList.toggle("flipped",a<0),ba(i,o.x,o.y)}}function bc(){const e=document.getElementById("basketChip");if(!e)return;const t=S==="house"&&(!y||qe===ee||xe===y.myHouseId()),n=ti(),o=n.egg+n.carrot+n.flower>0&&(S==="ranch"||t);e.classList.toggle("hidden",!o),e.classList.toggle("inHouse",S==="house"),o&&(e.innerHTML=`<span class="bIcon">${x3}</span><span class="bcount" data-kind="egg">${Ao}<b>${n.egg}</b></span><span class="bcount" data-kind="carrot">${Ia}<b>${n.carrot}</b></span><span class="bcount" data-kind="flower">${Il()}<b>${n.flower}</b></span>`)}x("basketChip").addEventListener("pointerdown",e=>{e.target.closest('.bcount[data-kind="carrot"]')&&S==="ranch"&&ti().carrot>0&&ml(e,"carrot","basket")});x("basketChip").addEventListener("click",()=>S_());function S_(){const e=S==="house"&&(!y||qe===ee||xe===y.myHouseId()),t={egg:["Eggs",Ao],carrot:["Carrots",Ia],flower:["Flowers",Il()]},n=Lt("",(o,i)=>{const a=o.closest("[data-take]")?.dataset.take;if(!a)return;if(!e){q("Take it home to put it in your room! 🏠");return}const r="r"+Math.random().toString(36).slice(2,10),l=Math.max(120,Math.min(ge-120,K+X/2+(Math.random()-.5)*300));Us({op:"take",kind:a,id:r,room:C.get().currentRoom,x:l})&&(B.drop(),i(),q("It's in your room! Drag it to a hand to carry it ✋"))},"basketSheet"),s=ti();n.root.querySelector(".card").innerHTML=`${Ct}<h2>My Basket</h2><p class="hint small">${e?"Tap one to put it in your room.":"Collect eggs, carrots and flowers at Rainbow Ranch, then take them home!"}</p>
    <div class="basketRows">${ef.map(o=>`<button class="bRow" data-take="${o}" ${s[o]?"":"disabled"}>${t[o][1]}<b>${s[o]}</b><span>${t[o][0]}</span></button>`).join("")}</div>`}window.__ranch=()=>({view:S,inBarn:_e,plots:er().map(e=>e?{seed:e.seed,stage:Ta(e,Ja()),wet:!!e.wet}:null),basket:ti(),me:Gt(),ridden:[...wh().keys()]});function B_(){if(uo.kind==="none")return;K3(),Lt(X3(uo.kind,uo.entries),(t,n)=>{t.closest("#wnGo")&&(B.sparkle(),n())},"whatsNew "+uo.kind).root.querySelector(".card").insertAdjacentHTML("afterbegin",Ct)}setTimeout(B_,500);window.__whatsnew=uo;window.__hood=()=>y;window.__hood_url=()=>Qa();window.__ui=()=>({view:S,currentHouseId:xe,mode:y?"hood":"solo",play:we.mode()});C5({hood:()=>y,view:()=>S,solo:()=>pt,myPres:me,setPres:Wt,toast:q,refreshNear:ws,sfx:B,goMap:As,soloLook:()=>{const e=ee.get();return{look:jo(e.characters[0]??{}),dog:e.dog??null}}});function Lh(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n.items)t.add(s.kind);for(const n of e.characters)n.held.left&&t.add(n.held.left.kind),n.held.right&&t.add(n.held.right.kind);return[...t]}let _i=null,vc=()=>!1;function Ch(e){return _i||(_i=wa(()=>import("./load-CKZV8ru9.js"),[]).then(t=>(vc=t.hasArt,t.boot(location.search,Lh(C.get())))).then(t=>{for(let n=0;n<t.length;n++)if(ke[t[n]]){ys();break}Ig()}),_i)}function H_(e){const t=new Set(e),n=C.get();let s=!1;for(const o of n.rooms[n.currentRoom].items){const i=ke[o.kind];if(!t.has(o.kind)||!i)continue;const a=J.querySelector(`.item[data-id="${o.id}"] .inner`);!a||a.querySelector("img.artimg")||(a.innerHTML=Ft(i,!0),s=!0)}s&&(Tt.forEach(o=>{delete o.dataset.held}),Ot(n),Ig())}function P_(){return wa(()=>import("./load-CKZV8ru9.js"),[]).then(e=>e.boot(location.search,Lh(C.get()))).then(e=>{H_(e.filter(t=>!!ke[t]))})}s$();i3();d3(e=>e==="backyard"?Fw():null);x("scenery").addEventListener("click",e=>{const t=e.target.closest("[data-yard-go]");t&&Jl(t.dataset.yardGo==="backyard"?"backyard":"living")});const T_=c5(x("skyMount"));window.__sky=T_;ys();ut();Zn();W_();Zn();nr();Bg();Hi();Ys.matches?Qn():Zn();requestAnimationFrame(()=>{Zn(),nr(),Kl()});function W_(){if(!jl)return;const e=Zr(),t=C.get().characters[0];if(!t)return;const n=e==="door";if(C.dispatch({type:"char/update",id:t.id,patch:{...dw(),flip:n?Nr.flip:Or.flip}}),C.dispatch({type:"cat/set",cat:{name:"Clover",coat:3,room:n?"living":"backyard",x:n?Xi:Sn.x}}),C.dispatch({type:"dog/set",dog:{name:"Sunny",breed:3,owner:t.id}}),!C.get().rooms.backyard.items.some(s=>s.kind==="yard-swing"))for(const s of fw)C.dispatch({type:"item/add",room:"backyard",item:{id:"yp-"+s.kind,kind:s.kind,x:s.x,y:s.y,flip:!1,z:1,scale:s.scale??1}});if(e!=="sheet"){const s=n?Nr:Or;C.dispatch({type:"char/move",id:t.id,room:n?"living":"backyard",x:s.x,y:s.y}),C.dispatch({type:"room/switch",room:n?"living":"backyard"})}window.__pinCat=n?{x:Xi}:{x:Sn.x,y:Sn.y},e==="play"?x("modePlay").click():(e==="decorate"||e==="door")&&x("modeDecorate").click(),e==="sheet"&&document.body.insertAdjacentHTML("beforeend",Yw()),e==="compare"&&document.body.insertAdjacentHTML("beforeend",Xw()),document.body.dataset.yard="ready"}function R_(e){const t=C.get(),n=e==="backyard"?Or:Nr;ht=null;const s=t.characters.find(o=>o.id===Le&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(s&&(C.dispatch({type:"char/update",id:s.id,patch:{flip:n.flip}}),C.dispatch({type:"char/move",id:s.id,room:e,x:n.x,y:n.y})),jl&&t.cat&&(C.dispatch({type:"cat/move",room:e,x:e==="backyard"?Sn.x:Xi}),window.__pinCat=e==="backyard"?{x:Sn.x,y:Sn.y}:{x:Xi}),C.dispatch({type:"room/switch",room:e}),y&&qe!==ee){const o=me();o&&o.where==="house"&&Te({...o,room:e,x:n.x,y:n.y,flip:n.flip})}requestAnimationFrame(()=>nr())}function nr(){if(C.get().currentRoom==="backyard"){Pe(Ir),Ln();return}if(!jl||Zr()==="sheet"||Zr()==="compare")return;const e=C.get().characters.find(t=>t.room===C.get().currentRoom);e&&Pe(e.x-X/2),Ln()}function Ln(){if(ms||D.getBoundingClientRect().width<20)return;const t=Je()||parseFloat(D.style.getPropertyValue("--yard-sc"))||1;D.style.setProperty("--yard-sc",String(t));const n=[...D.querySelectorAll(".yardDoor")];for(const u of n){u.style.minWidth="",u.style.transform="";const b=u.querySelector(".yardHintLabel");if(!b)continue;b.style.transform="",b.style.translate="";const _=b.querySelector("span");_&&(_.style.transform="");const m=Math.max(13,16/t);b.style.fontSize=m+"px",b.style.lineHeight="1";const p=38/t;b.style.height=p+"px";const v=3/t,$=Math.max(0,(p-v*2-m)/2);b.style.padding=`${$.toFixed(2)}px ${(14/t).toFixed(2)}px`}const s=n[0];if(!s)return;const o=s.querySelector(".doorArt"),i=s.querySelector(".yardHintLabel"),a=6,r=()=>{const u=D.getBoundingClientRect(),b=s.getBoundingClientRect(),_=o?.getBoundingClientRect(),m=i?.getBoundingClientRect(),p=[b,_,m].filter(W=>!!W&&W.width>2&&W.height>2),v=Math.min(...p.map(W=>W.top)),$=Math.max(...p.map(W=>W.bottom));let P=u.left+a,R=u.right-a;for(const W of["nudgeL","nudgeR"]){const F=x(W);if(!F||F.classList.contains("off")||F.offsetParent===null)continue;const ne=F.getBoundingClientRect();if(ne.width<2||ne.height<2)continue;const se=ae=>ae.top<ne.bottom-1&&ae.bottom>ne.top+1,I=[b,_].some(ae=>ae&&ae.width>2&&se(ae));!I&&(v>=ne.bottom-1||$<=ne.top+1)||(W==="nudgeL"&&I?P=Math.max(P,ne.right+8):W==="nudgeR"&&I&&(R=Math.min(R,ne.left-8)))}return{leftLimit:P,rightLimit:R,doorR:b,artR:_,hintR:m}};let l=0,c=0;for(;l++<4;){const{leftLimit:u,rightLimit:b,doorR:_,artR:m}=r();let p=0;const v=Math.min(_.left,m&&m.width>2?m.left:_.left),$=Math.max(_.right,m&&m.width>2?m.right:_.right);if(v<u&&(p+=u-v),$+p>b&&(p-=$+p-b),Math.abs(p)<.5)break;c+=p,s.style.transform=`translate(${(c/t).toFixed(1)}px, 0)`}if(!i){Ad(s);return}const d=i.querySelector("span");if(d){const u=document.createRange();u.selectNodeContents(d);const b=u.getBoundingClientRect(),_=i.getBoundingClientRect(),m=(_.top+_.bottom-(b.top+b.bottom))/2,p=d;b.height>2&&Math.abs(m)>=.1?p.style.transform=`translateY(${(m/t).toFixed(2)}px)`:p.style.transform=""}const f=i.getBoundingClientRect(),g=D.getBoundingClientRect();let h=0;if(C.get().currentRoom==="backyard"&&o){const u=o.getBoundingClientRect();u.width>2&&(h+=(u.left+u.right)/2-(f.left+f.right)/2)}f.left+h<g.left+a?h+=g.left+a-(f.left+h):f.right+h>g.right-a&&(h-=f.right+h-(g.right-a)),Math.abs(h)>.5?i.style.translate=`calc(-50% + ${(h/t).toFixed(1)}px) 0`:i.style.translate="",Ad(s)}Ch(C.get().currentRoom);const Sh=()=>{const e=Ua().size,t=Ki.length,n=x("secrets"),s=n.querySelector(".secCount");s&&(s.textContent=`${e}/${t}`),n.setAttribute("aria-label",`Surprises, ${e} of ${t}`),Mg()};function va(){return window.innerHeight>window.innerWidth+40}function Bh(e,t){for(const I of e)I.style.transform="";if(!va()||!e.length)return;const n=t&&t.clientWidth>20?t.getBoundingClientRect():{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth};if(n.width<20)return;const s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,window.innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,window.innerHeight)-s,l=Math.max(40,i-o),c=Math.max(40,r-a),f=e.map(I=>I.getBoundingClientRect()).filter(I=>I.width>2&&I.height>2);if(!f.length)return;const g=Math.min(...f.map(I=>I.left)),h=Math.max(...f.map(I=>I.right)),u=Math.min(...f.map(I=>I.top)),b=Math.max(...f.map(I=>I.bottom)),_=Math.max(1,h-g),m=Math.max(1,b-u),p=Math.min(1,l/_,c/m);if(p>.995&&g>=o-1&&h<=i+1&&u>=a-1&&b<=r+1)return;const $=e[0].getScreenCTM(),P=$&&Math.hypot($.a,$.b)||1,R=(g+h)/2,W=(u+b)/2,F=m*p,ne=(o+i)/2,se=u>=a&&b<=r?W:Math.min(Math.max(W,a+F/2),r-F/2);for(const I of e){const ae=I.getBoundingClientRect(),fn=(ae.left+ae.right)/2,At=(ae.top+ae.bottom)/2,yt=ne+(fn-R)*p,at=se+(At-W)*p;I.style.transformBox="fill-box",I.style.transformOrigin="center",I.style.transform=`translate(${((yt-fn)/P).toFixed(2)}px, ${((at-At)/P).toFixed(2)}px) scale(${p.toFixed(3)})`}}function Hh(){if(S!=="gameroom")return;const e=document.getElementById("grScroll");Bh([...document.querySelectorAll(".neonSignArt")],e)}function yl(){S!=="ranch"||_e||(document.querySelectorAll(".ranchSignArt").forEach(e=>{e.style.transform=""}),ze(),Ph(),wc())}function wc(){if(S!=="ranch"||_e)return;const e=document.getElementById("ranchScroll");if(!e)return;const t=e.getBoundingClientRect();document.querySelectorAll(".ranchSignArt").forEach(n=>{const s=n.getBoundingClientRect(),o=Math.min(t.right,innerWidth),i=Math.max(0,t.left-s.left)+Math.max(0,s.right-o);n.style.visibility=s.width>20&&i<8?"visible":"hidden"})}x("ranchScroll").addEventListener("scroll",()=>{S==="ranch"&&!_e&&wc()},{passive:!0});function Ph(){const e=document.querySelector(".doorHint"),t=document.getElementById("ranchScroll");if(!e||!t)return;e.style.transform="translateX(-50%)";const n=t.getBoundingClientRect(),s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,innerHeight)-s,l=e.getBoundingClientRect();let c=0;l.right>i&&(c-=l.right-i),l.left+c<o&&(c+=o-(l.left+c));let d=0;const f=t.querySelector(".savatar");if(f){const g=f.getBoundingClientRect(),u=f.querySelector(".nametag")?.getBoundingClientRect(),b=!!(u&&u.width>4&&u.height>4),_=b?Math.min(g.top,u.top):g.top,m=b?Math.min(g.left,u.left):g.left,p=b?Math.max(g.right,u.right):g.right,v=l.left+c;l.right+c>m-6&&v<p+6&&l.bottom+d>_-6&&l.top<g.top+g.height*.72&&(d+=_-48-(l.bottom+d))}if(l.top+d<a&&(d+=a-(l.top+d)),document.body.classList.contains("phone-portrait")){const g=document.querySelector(".ranchSign .ranchSignArt");if(g){const h=g.getBoundingClientRect(),u=l.left+c,b=l.right+c,_=l.top+d,m=l.bottom+d;if(h.width>20&&h.height>h.width*.7&&b>h.left+4&&u<h.right-4&&m>h.top+4&&_<h.bottom-4){let v=h.top-16-m;_+v<a&&(v+=a-(_+v));const P=f?.querySelector(".nametag")?.getBoundingClientRect(),R=m+v;!(P&&P.width>4&&P.height>4&&R>P.top-12&&b>P.left-6&&u<P.right+6)&&R<=r&&(d+=v)}}}(c||d)&&(e.style.transform=`translate(calc(-50% + ${c.toFixed(1)}px), ${d.toFixed(1)}px)`)}const Th=Bu({world:vg,roomW:ge,roomH:Ce,currentRoom:()=>C.get().currentRoom,sparkle:()=>B.sparkle(),tap:()=>B.click(),onFound:(e,t)=>{if(Sh(),t){const n=x("secrets");n.classList.remove("pulse"),n.offsetWidth,n.classList.add("pulse"),setTimeout(()=>q("🎁 A secret surprise appeared in your drawer!"),1400),ut()}}});C.subscribe((e,t)=>{(t.type==="room/switch"||t.type==="game/reset")&&Th.update()});Sh();window.__eggs=()=>({found:[...Ua()]});Ux();export{wa as _,Q_ as r,E_ as s};
