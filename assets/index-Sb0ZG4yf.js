(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const kg="modulepreload",bg=function(e){return"/kids-house-game/"+e},Rr={},Oa=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(n.map(l=>{if(l=bg(l),l in Rr)return;Rr[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":kg,c||(g.as="script"),g.crossOrigin="",g.href=l,r&&g.setAttribute("nonce",r),document.head.appendChild(g),c)return new Promise((f,h)=>{g.addEventListener("load",f),g.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return o.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})},zs="#5a3d5c",E=(e=4)=>`stroke="${zs}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Ii=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],Et=1e3,Qt=700,qi="M 30 660 C 150 640, 200 540, 330 545 S 540 650, 690 600 S 925 470, 850 375 S 640 330, 520 355 S 270 385, 250 285 S 330 145, 480 150 S 700 200, 790 150",Nt={x:115,y:170},pt={x:880,y:120},mt={x:600,y:480},jt={x:400,y:260},sc=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${E(3)}/><circle cx="0" cy="-10" r="20" fill="${s}" ${E(3)}/><circle cx="-12" cy="-2" r="12" fill="${s}" ${E(3)}/><circle cx="12" cy="-3" r="13" fill="${s}" ${E(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`,un=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})" fill="#fff"><ellipse cx="0" cy="10" rx="46" ry="22"/><ellipse cx="-36" cy="16" rx="28" ry="16"/><ellipse cx="38" cy="14" rx="30" ry="18"/><ellipse cx="10" cy="2" rx="24" ry="18"/></g>`,Ts=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">${[0,72,144,216,288].map(o=>`<circle cx="${(Math.cos(o*Math.PI/180)*8).toFixed(1)}" cy="${(Math.sin(o*Math.PI/180)*8).toFixed(1)}" r="6.5" fill="${n}" ${E(2)}/>`).join("")}<circle r="4.5" fill="#ffd43b" ${E(2)}/></g>`,Ft=(e,t,n)=>`<g transform="translate(${e} ${t})">${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*4}" cy="${Math.sin(s*Math.PI/180)*4}" r="3.6" fill="${n}"/>`).join("")}<circle r="2.6" fill="#ffd43b"/></g>`;function vg(){return`<svg class="mapBg" viewBox="0 0 ${Et} ${Qt}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${Et}" height="${Qt}" rx="34" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="160" cy="420" rx="150" ry="90"/><ellipse cx="760" cy="250" rx="170" ry="70"/><ellipse cx="480" cy="640" rx="140" ry="50"/><ellipse cx="930" cy="600" rx="90" ry="110"/></g>
  <g fill="#93d78e" opacity=".7"><ellipse cx="420" cy="260" rx="70" ry="30"/><ellipse cx="80" cy="560" rx="60" ry="26"/><ellipse cx="700" cy="420" rx="50" ry="22"/></g>
  <!-- pond -->
  <ellipse cx="120" cy="470" rx="72" ry="40" fill="#8ecae6" ${E()}/><ellipse cx="108" cy="462" rx="42" ry="16" fill="#bde6f7"/><path d="M150 480 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <!-- side paths to the park and the ranch -->
  <path d="M250 285 Q190 250 150 215" fill="none" stroke="${zs}" stroke-width="30" stroke-linecap="round"/><path d="M250 285 Q190 250 150 215" fill="none" stroke="#f2dcb8" stroke-width="22" stroke-linecap="round"/>
  <!-- the street -->
  <path d="${qi}" fill="none" stroke="${zs}" stroke-width="58" stroke-linecap="round"/>
  <path id="mapRoad" d="${qi}" fill="none" stroke="#f2dcb8" stroke-width="48" stroke-linecap="round"/>
  <path d="${qi}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 16" stroke-linecap="round" opacity=".9"/>
  <!-- town square -->
  <g transform="translate(${mt.x} ${mt.y})"><circle r="74" fill="#f7e6c8" ${E()}/><circle r="74" fill="none" stroke="#e6cfa6" stroke-width="10" stroke-dasharray="10 12" transform="scale(.82)"/>
    <circle r="30" fill="#bde6f7" ${E()}/><circle r="13" fill="#fff6e6" ${E(3)}/><path d="M0 -13 Q-8 -32 -16 -20 M0 -13 Q8 -32 16 -20 M0 -13 V-34" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>
    ${Ft(-52,-40,"#ff8fab")}${Ft(54,-38,"#b197fc")}${Ft(-56,40,"#ffd43b")}${Ft(52,44,"#ff8fab")}</g>
  ${[[60,330,"#ff8fab"],[300,470,"#b197fc"],[430,560,"#ffd43b"],[760,520,"#ff8fab"],[950,260,"#b197fc"],[600,260,"#ffd43b"],[380,90,"#ff8fab"],[40,120,"#b197fc"],[960,420,"#ffd43b"],[840,640,"#b197fc"],[210,620,"#ff8fab"]].map(([e,t,n])=>Ft(+e,+t,String(n))+Ft(+e+14,+t+8,String(n))).join("")}
  </svg>`}function zr(e,t,n=Et,s=Qt){const o=[];let i=7;const a=()=>(i=(i*9301+49297)%233280)/233280;for(let r=0;r<260&&o.length<34;r++){const l=30+a()*(n-60),c=40+a()*(s-70);t(l,c)||e.some(d=>Math.hypot(d.x-l,d.y-c)<d.r)||(e.push({x:l,y:c,r:46}),o.push(sc(l,c,.75+a()*.45,["#5cc985","#4fbf7a","#78d39a"][r%3])))}return`<svg class="mapTrees" viewBox="0 0 ${n} ${s}" xmlns="http://www.w3.org/2000/svg">${o.join("")}</svg>`}function wg(e,t){const n=e/2,s=`M ${n} 36 C ${n-36} ${t*.28}, ${n+28} ${t*.48}, ${n-8} ${t*.68} S ${n+18} ${t*.86}, ${n} ${t-28}`;return`<svg class="mapBg" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="${t}" rx="28" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="${e*.22}" cy="${t*.22}" rx="90" ry="48"/><ellipse cx="${e*.78}" cy="${t*.42}" rx="80" ry="40"/><ellipse cx="${e*.3}" cy="${t*.72}" rx="100" ry="46"/></g>
  <ellipse cx="78" cy="${t*.58}" rx="46" ry="28" fill="#8ecae6" ${E()}/><ellipse cx="70" cy="${t*.56}" rx="24" ry="10" fill="#bde6f7"/>
  <path d="${s}" fill="none" stroke="${zs}" stroke-width="44" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#f2dcb8" stroke-width="34" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round" opacity=".9"/>
  ${[[40,250,"#ff8fab"],[500,280,"#b197fc"],[70,520,"#ffd43b"],[490,640,"#ff8fab"],[50,860,"#74c0fc"],[500,980,"#ffd43b"]].map(([o,i,a])=>Ft(+o,+i,String(a))+Ft(+o+16,+i+10,String(a))).join("")}
  </svg>`}const $g=(e,t,n=1,s="#4fbf7a")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="10" rx="28" ry="8" fill="#000" opacity=".08"/><circle cx="-14" cy="-2" r="16" fill="${s}" ${E(3)}/><circle cx="14" cy="0" r="18" fill="${s}" ${E(3)}/><circle cx="0" cy="-12" r="14" fill="${s}" ${E(3)}/><circle cx="-4" cy="-16" r="4" fill="#fff" opacity=".28"/></g>`,xg=(e,t,n="#ff8fab")=>`<g transform="translate(${e} ${t})"><ellipse cx="-7" cy="-2" rx="8" ry="5" fill="${n}" ${E(2)} transform="rotate(-24)"/><ellipse cx="7" cy="-2" rx="8" ry="5" fill="${n}" ${E(2)} transform="rotate(24)"/><ellipse cx="-6" cy="4" rx="6" ry="4" fill="#b197fc" ${E(1.6)} transform="rotate(18)"/><ellipse cx="6" cy="4" rx="6" ry="4" fill="#b197fc" ${E(1.6)} transform="rotate(-18)"/><path d="M0 -6 V8" ${E(2)}/></g>`;function _g(e,t,n){const s=e/2,o=(g,f,h)=>f>t*.4&&f<t-28&&Math.abs(g-s)>52&&!n.some(p=>Math.hypot(p.x-g,p.y-f)<p.r+h),i=[.07,.15,.22,.78,.85,.93],a=[.46,.54,.62,.7,.78,.86,.93],r=["#ff8fab","#b197fc","#ffd43b","#74c0fc","#69db7c"],l=[];let c=0;a.forEach((g,f)=>{i.forEach((h,p)=>{const b=Math.round(e*h+((f+p)%2?8:-6)),_=Math.round(t*g);if((f+p)%3===0){if(!o(b,_,34))return;l.push($g(b,_,.85+p%2*.15,["#4fbf7a","#5cc985","#3dae6a"][(f+p)%3]))}else{if(!o(b,_,18))return;const m=r[(f*2+p)%r.length];l.push(Ts(b,_,m,.85)),(f+p)%2===0&&o(b+18,_+12,14)&&l.push(Ts(b+18,_+12,r[(f+p+2)%r.length],.7))}c++})});const d=[[e*.2,t*.5],[e*.8,t*.66],[e*.18,t*.84]];for(const[g,f]of d)o(g,f,16)&&l.push(xg(Math.round(g),Math.round(f),c%2?"#ffd43b":"#ff8fab"));return`<svg class="mapMeadowFill" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">${l.join("")}</svg>`}const Mg=`<svg class="mapSkyArt" viewBox="0 0 900 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
  ${un(280,28,1.05)}${un(430,8,.8)}${un(560,36,.95)}
  ${un(250,88,.75)}${un(390,108,1.05)}${un(540,96,.85)}${un(640,78,.7)}
  <g fill="none" stroke-linecap="round">
    ${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M300 ${118+t*6} A70 48 0 0 1 430 ${112+t*6}" stroke="${e}" stroke-width="5"/>`).join("")}
  </g>
</svg>`,Lg=`<svg class="mapMeadowArt" viewBox="0 0 900 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
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
  ${[[48,188,"#ff8fab",.85],[120,176,"#ffd43b",.7],[200,198,"#b197fc",.9],[280,172,"#ff8fab",.75],[360,204,"#74c0fc",.8],[450,178,"#ffd43b",.85],[530,200,"#ff8fab",.75],[620,174,"#b197fc",.8],[700,196,"#69db7c",.7],[790,180,"#ffd43b",.85]].map(([e,t,n,s])=>Ts(+e,+t,String(n),+s)).join("")}
  ${[[80,248,"#ff8fab"],[160,268,"#b197fc"],[250,242,"#ffd43b"],[340,274,"#ff8fab"],[430,250,"#74c0fc"],[520,270,"#b197fc"],[610,246,"#ffd43b"],[700,272,"#ff8fab"],[790,252,"#69db7c"]].map(([e,t,n])=>Ts(+e,+t,String(n),1.05)).join("")}
  ${[[110,304,"#ffd43b"],[230,292,"#ff8fab"],[360,308,"#b197fc"],[490,294,"#74c0fc"],[620,306,"#ff8fab"],[750,296,"#ffd43b"]].map(([e,t,n])=>Ts(+e,+t,String(n),.9)).join("")}
</svg>`,Dr=`<svg viewBox="0 0 200 170"><ellipse class="parkLawn" cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${E()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${E(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${E(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${E(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${E(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${E(2.5)}/>
  ${sc(40,66,1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${E(3)}/><path d="M178 88 V132" ${E(4)}/>
</svg>`,Ir=`<svg viewBox="0 0 220 180"><ellipse class="ranchGrass" cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${E()}/>
  ${Ii.map((e,t)=>`<path d="M${20+t*7} 120 A${90-t*7} ${84-t*7} 0 0 1 ${200-t*7} 120" fill="none" stroke="${e}" stroke-width="7"/>`).join("")}
  <path d="M60 140 V82 L80 58 H140 L160 82 V140 Z" fill="#ef5b5b" ${E(4)}/>
  <path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${zs}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  ${Ii.map((e,t)=>`<path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${e}" stroke-width="1.3" transform="translate(0 ${-3+t*1.2})"/>`).join("")}
  <rect x="88" y="100" width="44" height="40" rx="3" fill="#d94848" ${E(3)}/><path d="M88 100 L132 140 M132 100 L88 140" stroke="#fff6e6" stroke-width="3"/>
  <rect x="94" y="70" width="32" height="18" rx="4" fill="#fff6e6" ${E(3)}/>
  <path d="M10 150 H52 M168 150 H212 M14 140 V158 M30 140 V158 M46 140 V158 M174 140 V158 M190 140 V158 M206 140 V158" stroke="#fff6e6" stroke-width="5" stroke-linecap="round"/><path d="M10 150 H52 M168 150 H212" ${E(1.5)}/>
  <g transform="translate(178 122) scale(.42)"><ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" ${E(5)}/><path d="M24 -8 L40 -34 L54 -26 L36 2 Z" fill="#fff" ${E(5)}/>${Ii.slice(0,4).map((e,t)=>`<path d="M38 ${-34+t*5} q-14 4 -20 14" fill="none" stroke="${e}" stroke-width="5" stroke-linecap="round"/>`).join("")}<path d="M-20 14 V34 M20 14 V34" ${E(6)}/></g>
</svg>`,qr=`<svg viewBox="0 0 190 156">
  <ellipse cx="95" cy="118" rx="88" ry="32" fill="#ffd0e6" ${E()}/>
  <path d="M28 108 V62 L95 28 L162 62 V108 Z" fill="#fff0f6" ${E(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="#ff6b9a" ${E(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="none" stroke="#ffd43b" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="78" y="78" width="34" height="30" rx="4" fill="#ff8ec8" ${E(3)}/>
  <path d="M95 86 C90 80 82 82 86 90 C90 96 95 100 95 100 C95 100 100 96 104 90 C108 82 100 80 95 86 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  <rect x="42" y="74" width="22" height="16" rx="3" fill="#66d9e8" ${E(2)}/><rect x="126" y="74" width="22" height="16" rx="3" fill="#d0bfff" ${E(2)}/>
  ${[36,52,68,84,100,116,132,148].map((e,t)=>`<circle class="clubBulb" cx="${e}" cy="58" r="3.2" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" ${E(1.4)}/>`).join("")}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`,Na=`<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${E(3)}/><path d="M17 8 V35 M31 13 V40" ${E(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${E(2)}/></svg>`,ja=e=>e.indexOf("data-chibi")>=0?e.replace('viewBox="0 0 200 320"','viewBox="24 0 152 168"'):e.replace('viewBox="0 0 100 160"','viewBox="14 2 72 74"'),Cg={},it=e=>(Cg?.VITE_STORE_PREFIX??"")+e,Sg=400,ci=["#ffe0c4","#f6d2b5","#f1c27d","#e0ac69","#c9956c","#c68642","#a86b3c","#8d5524","#5c3a1e","#3d2914"],di=["#2b1d16","#5b3a29","#a0522d","#f4d58d","#ff8fab","#8ecae6","#b388d6","#ff9f43","#1d1416","#c8602a","#7a4b32","#f7f1e8"],Fa=["#5a321c","#3f9b52","#3d7ec4","#c48a3a","#7b4fb8"],Ze=["#ff7aa8","#ffd166","#5aa9e6","#80ed99","#c9a0dc","#ff9f68","#ffffff","#5a3d5c","#ff8f7a","#7ec8c3","#f7f3ee","#f4a3c8","#6b8e4e","#e8d5b5","#ef6b6b","#3d4a6b"],gi=["short","bob","buns","topbun","pixie","long","wavy","puffs","afro","curlybob","coily","boxbraids","braids","sidebraid","crown","pony","sidepony","pigtails","lowbun","locs","halfup","bangs","sidebangs","wavybob"],fi=["classic","stripes","hoodie","sweater","tank","puff","ruffle","button","jersey","cardigan","bib","raincoat"],hi=["pants","jeans","shorts","skirt","tutu","leggings","overalls","joggers"],pi=["","twirl","sundress","party","pinafore","jumper","ballet","nightgown","raindress"],ui=["classic","sneakers","lightup","boots","rainboots","sandals","maryjanes","slippers"],mi=["round","big","sleepy","sparkle","soft","bright"],Kn=["glasses","square","sunnies","bow","bigbow","headband","flower","cap","beanie","sunhat","catears","earmuffs"],Bg=new Set(gi),Wg=new Set(fi),Tg=new Set(hi),Pg=new Set(pi),Hg=new Set(ui),Ug=new Set(mi),Eg=new Set(Kn),Qg=new Set(["short","pixie","coily","afro","bangs"]),Ag=new Set(["buns","puffs"]),Rg=new Set(["topbun","lowbun"]),zg={hair:"buns",hairC:"#5b3a29",skin:"#f1c27d",eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"pants",bottomC:"#5aa9e6",dress:"",dressC:"#ff7aa8",shoes:"classic",shoesC:"#5a3d5c",accC:"#ffd166"};function Dg(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function In(e,t){return typeof e=="string"&&t.has(e)}function Ct(e,t){if(typeof e!="string")return null;const n=e.trim().toLowerCase();for(let s=0;s<t.length;s++)if(t[s]===n)return t[s];return null}function Gs(e){if(!Dg(e))return null;let t=0;try{t=JSON.stringify(e).length}catch{return null}if(t>Sg)return null;const n={v:1};In(e.hair,Bg)&&(n.hair=e.hair);const s=Ct(e.hairC,di);s&&(n.hairC=s);const o=Ct(e.skin,ci);o&&(n.skin=o),In(e.eyes,Ug)&&(n.eyes=e.eyes);const i=Ct(e.eyeC,Fa);i&&(n.eyeC=i),(e.freckles===!0||e.freckles===!1)&&(n.freckles=e.freckles),(e.blush===!0||e.blush===!1)&&(n.blush=e.blush),In(e.top,Wg)&&(n.top=e.top);const a=Ct(e.topC,Ze);a&&(n.topC=a),In(e.bottom,Tg)&&(n.bottom=e.bottom);const r=Ct(e.bottomC,Ze);r&&(n.bottomC=r),In(e.dress,Pg)&&(n.dress=e.dress);const l=Ct(e.dressC,Ze);l&&(n.dressC=l),In(e.shoes,Hg)&&(n.shoes=e.shoes);const c=Ct(e.shoesC,Ze);if(c&&(n.shoesC=c),Array.isArray(e.acc)){const g=[];for(let f=0;f<e.acc.length&&g.length<2;f++){const h=e.acc[f];typeof h=="string"&&Eg.has(h)&&g.indexOf(h)<0&&g.push(h)}n.acc=g}const d=Ct(e.accC,Ze);return d&&(n.accC=d),n}function rs(e){const t=zg,n=e??{};return{v:1,hair:n.hair??t.hair,hairC:n.hairC??t.hairC,skin:n.skin??t.skin,eyes:n.eyes??t.eyes,eyeC:n.eyeC??t.eyeC,freckles:n.freckles??t.freckles,blush:n.blush??t.blush,top:n.top??t.top,topC:n.topC??t.topC,bottom:n.bottom??t.bottom,bottomC:n.bottomC??t.bottomC,dress:n.dress??t.dress,dressC:n.dressC??t.dressC,shoes:n.shoes??t.shoes,shoesC:n.shoesC??t.shoesC,acc:n.acc?n.acc.slice():[],accC:n.accC??t.accC}}function Or(e){const t=/^#([0-9a-f]{6})$/i.exec(e.trim());if(!t){const s=/^#([0-9a-f]{3})$/i.exec(e.trim());return s?[parseInt(s[1][0]+s[1][0],16),parseInt(s[1][1]+s[1][1],16),parseInt(s[1][2]+s[1][2],16)]:null}const n=parseInt(t[1],16);return[n>>16&255,n>>8&255,n&255]}function co(e,t){const n=Ct(e,t);if(n)return n;const s=Or(e);if(!s)return t[0];let o=t[0],i=1e12;for(let a=0;a<t.length;a++){const r=Or(t[a]);if(!r)continue;const l=(s[0]-r[0])*(s[0]-r[0])+(s[1]-r[1])*(s[1]-r[1])+(s[2]-r[2])*(s[2]-r[2]);l<i&&(i=l,o=t[a])}return o}function Ig(e){return Qg.has(e)?0:Ag.has(e)?2:Rg.has(e)?3:1}function qg(e){for(let t=0;t<e.length;t++){const n=e[t];if(n==="glasses"||n==="square"||n==="sunnies")return 2}for(let t=0;t<e.length;t++){const n=e[t];if(n==="cap"||n==="beanie"||n==="sunhat")return 3}for(let t=0;t<e.length;t++){const n=e[t];if(n==="bow"||n==="bigbow")return 1}return 0}function yi(e){const t=rs(e),n=t.dress!=="";return{skin:t.skin,hair:t.hairC,hairStyle:Ig(t.hair),shirt:n?t.dressC:t.topC,pants:n?t.dressC:t.bottomC,acc:qg(t.acc)}}const Og=["short","bob","buns","topbun"];function Ro(e){const t=typeof e.hairStyle=="number"&&e.hairStyle>=0&&e.hairStyle<=3?Math.round(e.hairStyle):0,n=e.acc===1?["bow"]:e.acc===2?["glasses"]:e.acc===3?["cap"]:[],s=co(String(e.shirt??""),Ze);return{v:1,hair:Og[t],hairC:co(String(e.hair??""),di),skin:co(String(e.skin??""),ci),eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:s,bottom:"pants",bottomC:co(String(e.pants??""),Ze),dress:"",dressC:s,shoes:"classic",shoesC:"#5a3d5c",acc:n,accC:"#ffd166"}}function zo(e){const t=Gs(e)??{},n=rs(t);return{...yi(n),look2:n}}const Ng=new Set(["glasses","square","sunnies"]),jg=new Set(["bow","bigbow","flower","headband"]),Fg=new Set(["cap","beanie","sunhat","catears","earmuffs"]);function Do(e){return Ng.has(e)?"face":jg.has(e)?"bow":Fg.has(e)?"hat":"other"}function ke(e,t){return t[Math.floor(e()*t.length)]}function ki(e=Math.random){const t=e()<.38,n=e();let s=[];if(n<.22)s=[];else if(n<.68)s=[ke(e,Kn)];else{const o=ke(e,Kn),i=Kn.filter(a=>Do(a)!==Do(o));s=[o,ke(e,i)]}return{v:1,hair:ke(e,gi),hairC:ke(e,di),skin:ke(e,ci),eyes:ke(e,mi),eyeC:ke(e,Fa),freckles:e()<.4,blush:e()<.85,top:ke(e,fi),topC:ke(e,Ze),bottom:ke(e,hi),bottomC:ke(e,Ze),dress:t?ke(e,pi.filter(o=>o!=="")):"",dressC:ke(e,Ze),shoes:ke(e,ui),shoesC:ke(e,Ze),acc:s,accC:ke(e,Ze)}}function Zg(e,t=Math.random){const n=e.characters[0];if(!n)return e;const s=ki(t),o=yi(s),i=e.characters.slice();return i[0]={...n,...o,look2:s},{...e,characters:i}}function Vg(e){return[e.skin,e.hair,e.hairStyle,e.shirt,e.pants,e.acc,e.look2?JSON.stringify(e.look2):""].join("|")}const Ks=3600,Bn=470,At=590,$n=["goat","sheep","piglet","chicks","bunny","cow"],Gg=[1085,1215,1345,1470,1600,1735],Kg=520,Za=1900,Va=[600,800,1e3,1200,1400,1600],aa=435,Yg=["Chestnut","Snowy","Midnight","Sunny","Rainbow"],oc=[2470,2600,2730,2860,2990],Wn=540,Xg=["pet","carrot","apple","hay"],ra=6,Jg=e=>3175+e*68,ef=8e4,la=20,tf=1500,ic=["egg","carrot","flower"],nf={egg:"ranch-egg",carrot:"ranch-carrot",flower:"ranch-bouquet"},sf=()=>({egg:0,carrot:0,flower:0}),of=(e,t,n)=>Number.isInteger(e)&&e>=t&&e<=n?e:null;function Ga(e){const t=sf();if(!e||typeof e!="object")return t;for(const n of ic)t[n]=of(e[n],0,la)??0;return t}function Ka(e){const t=Array(ra).fill(null);if(Array.isArray(e))for(let n=0;n<ra;n++){const s=e[n];if(!s||s.seed!=="carrot"&&s.seed!=="flower")continue;const o=Number(s.at),i=Number(s.wet);Number.isFinite(o)&&Number.isFinite(i)&&(t[n]={seed:s.seed,at:o,wet:i})}return t}function bi(e,t){if(!e||!e.wet)return 0;const n=(t-e.wet)/ef;return n>=1?3:n>=.4?2:1}function ca(e,t,n,s,o=0){const i=e.slice(),a={...t};switch(n.op){case"plant":return i[n.i]?"taken":(i[n.i]={seed:n.seed,at:s,wet:0},{plots:i,basket:a,garden:!0});case"water":{const r=i[n.i];return r?r.wet?"wet":(i[n.i]={...r,wet:s},{plots:i,basket:a,garden:!0}):"empty"}case"pick":{const r=i[n.i];return r?bi(r,s)<3?"notReady":a[r.seed]>=la?"full":(a[r.seed]++,i[n.i]=null,{plots:i,basket:a,garden:!0,got:r.seed}):"empty"}case"egg":return s-o<tf?"slow":a.egg>=la?"full":(a.egg++,{plots:i,basket:a,garden:!1,got:"egg"});case"use":return a.carrot<=0?"none":(a.carrot--,{plots:i,basket:a,garden:!1});case"take":return a[n.kind]<=0?"none":(a[n.kind]--,{plots:i,basket:a,garden:!1})}}const Vt=80,af=30*24*60*60*1e3,rf=5,ac=6,Dt=["#ffd6e8","#fff3b0","#d8f5e8","#e6d6ff","#d6efff"],lf=/^m[A-Za-z0-9]{4,40}$/,cf=/^[A-Za-z0-9:_\/.-]{1,80}$/;function Oi(e,t=Date.now()){const n=Math.floor((t-e)/864e5);return n<=0?"today":n===1?"yesterday":n<7?"a few days ago":"a while ago"}function df(e,t=Date.now()){const n=e?.letters;if(!Array.isArray(n))return null;const s=[];for(const i of n.slice(-30*2)){if(!i||typeof i!="object")continue;const a=i;if(typeof a.id!="string"||!lf.test(a.id)||typeof a.from!="string")continue;const r=a.from.normalize("NFC").replace(/\s+/g," ").trim();if(!r||r.length>24||typeof a.fromPid!="string"||!cf.test(a.fromPid)||typeof a.text!="string"||a.text.length>Vt||typeof a.at!="number"||!Number.isFinite(a.at)||t-a.at>af||a.at>t+864e5||!Number.isInteger(a.color)||a.color<0||a.color>=rf||!Number.isInteger(a.sticker)||a.sticker<0||a.sticker>=ac)continue;const l=a.text.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(l.length>Vt)continue;const c={id:a.id,from:r,fromPid:a.fromPid,text:l,color:a.color,sticker:a.sticker,at:a.at};a.read===!0&&(c.read=!0),s.push(c)}const o=s.slice(-30);return o.length?{letters:o}:null}function Ya(e){return e?.letters.filter(t=>!t.read&&t.text).length??0}const Ds=["living","bedroom","kitchen","salon","nursery","backyard"],rc=["living","bedroom","kitchen","salon","nursery"],Gt=2400,Ps=600,lc=1e3,ls=(Gt-lc)/2,cs=8,gf=/^[A-Za-z0-9:_\/.-]{1,80}$/;function Xa(e){const t=e?.dogKennel;if(!t||typeof t!="object"||typeof t.item!="string"||!gf.test(t.item))return null;const n=e.rooms;if(!n)return null;for(const s of Object.values(n))if(s?.items?.some(o=>o&&o.id===t.item&&o.kind==="kennel"))return{item:t.item};return null}function ff(e,t){return Xa({dogKennel:{item:t},rooms:e.rooms})!==null}const A=(e,t,n,s,o=1)=>({id:e+"-"+s,kind:e,x:t+ls,y:n,flip:!1,z:s,scale:o});function Xt(){return{version:3,houseId:"local",currentRoom:"living",rooms:{living:{wallpaper:"#ffd6e0",floor:"#e8b98a",pattern:1,items:[A("sofa",470,470,1),A("lamp",230,470,2),A("plant",760,480,3),A("rug",480,530,0),A("picture",470,200,4),A("cat",600,520,5),A("window",-350,230,6),A("armchair",-300,480,7),A("bookshelf",1250,470,8),A("tree",1500,480,9),A("clock",1100,170,10)]},bedroom:{wallpaper:"#d9ccff",floor:"#f2d0a4",pattern:2,items:[A("bed",450,480,1),A("window",750,230,2),A("teddy",330,500,3),A("stars",300,180,4),A("tub",1350,480,5),A("lamp",-250,470,6),A("flowers",-150,500,7)]},salon:{wallpaper:"#ffe0f0",floor:"#f6d6ff",pattern:2,items:[A("rug",470,540,0),A("mirror",470,150,1),A("vanity",470,480,2),A("perfume",400,345,3),A("polish",450,345,4),A("hairdryer",560,340,5),A("stool",470,545,6),A("lamp",200,470,7),A("flowers",780,480,8),A("picture",780,200,9),A("chair",-250,490,10),A("mirror",-250,170,11),A("plant",1300,480,12)]},kitchen:{wallpaper:"#cdf3dc",floor:"#ffe7a8",pattern:3,items:[A("fridge",200,470,1),A("table",520,500,2),A("cake",520,395,3),A("stove",800,470,4),A("chair",380,500,5),A("chair",660,500,6),A("juice",470,395,7),A("plant",-300,480,8),A("fish",1300,480,9)]},nursery:{wallpaper:"#d6f3ff",floor:"#f3ddc4",pattern:1,items:[A("cloud-rug",480,545,0),A("crib",470,480,1),A("crib-mobile",470,155,2),A("rocker",780,490,3)]},backyard:{wallpaper:"#c5ecff",floor:"#b6e3a8",pattern:0,items:[]}},characters:[an({id:"c1",skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6",room:"living",x:330+ls,y:540})],soundOn:!0,dogKennel:null}}function an(e){return{skin:"#f1c27d",hair:"#5b3a29",hairStyle:0,shirt:"#ff7aa8",pants:"#5aa9e6",size:"kid",acc:0,room:"living",x:Gt/2,y:540,flip:!1,held:{left:null,right:null},...e}}const mn=(e,t,n)=>Math.max(t,Math.min(n,e)),ps=e=>e.items.reduce((t,n)=>Math.max(t,n.z),0),hf=e=>e.items.reduce((t,n)=>Math.min(t,n.z),0);function go(e,t,n){return{...e,characters:e.characters.map(s=>s.id===t?n(s):s)}}function Le(e,t,n){const s=e.rooms[t];if(!s)return e;const o=n(s);return o===s?e:{...e,rooms:{...e.rooms,[t]:o}}}function pf(e){const t=new Set;let n=!1;const s=e.map(o=>{if(!t.has(o.id))return t.add(o.id),o;n=!0;const i=String(o.id).replace(/-d\d+$/,"").replace(/[^A-Za-z0-9:_/.-]/g,"").slice(0,72)||"item";let a=2,r=(i+"-d"+a).slice(0,80);for(;t.has(r);)a+=1,r=(i+"-d"+a).slice(0,80);return t.add(r),{...o,id:r}});return n?s:e}function uf(e){let t=!1;const n={...e.rooms};for(const s of Ds){const o=e.rooms[s];if(!o||!Array.isArray(o.items))continue;const i=pf(o.items);i!==o.items&&(n[s]={...o,items:i},t=!0)}return t?{...e,rooms:n}:e}function cc(e){if(!e||!e.rooms)return e;const t=Xt().rooms,n=e.rooms;let s=!1;for(const i of Ds){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(s=!0)}const o=s?(()=>{const i={...n};for(const a of Ds){const r=n[a];(!r||typeof r!="object"||!Array.isArray(r.items))&&(i[a]=t[a])}return{...e,rooms:i}})():e;return uf(o)}function Io(e,t){switch(t.type){case"room/switch":return e.rooms[t.room]?{...e,currentRoom:t.room}:e;case"item/add":return Le(e,t.room,n=>n.items.length>=80||n.items.some(s=>s.id===t.item.id)?n:{...n,items:[...n.items,{...t.item,z:ps(n)+1}]});case"item/move":return Le(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,x:mn(t.x,0,Gt),y:mn(t.y,40,Ps)}:s)}));case"item/flip":return Le(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,flip:!s.flip}:s)}));case"item/front":return Le(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:ps(n)+1}:s)}));case"item/back":return Le(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:hf(n)-1}:s)}));case"item/delete":{const n=e.rooms[t.room]?.items.some(o=>o.id===t.id&&o.kind==="kennel"),s=Le(e,t.room,o=>({...o,items:o.items.filter(i=>i.id!==t.id)}));return n&&e.dogKennel?.item===t.id?{...s,dogKennel:null}:s}case"room/wallpaper":return Le(e,t.room,n=>({...n,wallpaper:t.color}));case"room/floor":return Le(e,t.room,n=>({...n,floor:t.color}));case"room/pattern":return Le(e,t.room,n=>({...n,pattern:t.pattern,wallTile:null}));case"room/wallTile":return Le(e,t.room,n=>({...n,wallTile:t.tile}));case"room/floorTile":return Le(e,t.room,n=>({...n,floorTile:t.tile}));case"char/add":return e.characters.length>=cs||e.characters.some(n=>n.id===t.char.id)?e:{...e,characters:[...e.characters,t.char]};case"char/update":return go(e,t.id,n=>{const{look2:s,...o}=t.patch,i={...n,...o};return"look2"in t.patch&&(s?i.look2=s:delete i.look2),i});case"char/move":return e.rooms[t.room]?go(e,t.id,n=>({...n,room:t.room,x:mn(t.x,0,Gt),y:mn(t.y,60,Ps)})):e;case"char/delete":{const n=e.characters.find(o=>o.id===t.id);if(!n)return e;let s={...e,characters:e.characters.filter(o=>o.id!==t.id)};return["left","right"].forEach((o,i)=>{const a=n.held[o];a&&(s=Le(s,n.room,r=>({...r,items:[...r.items,{...a,x:n.x+(i?40:-40),y:n.y,z:ps(r)+1}]})))}),s}case"char/hold":{const n=e.characters.find(a=>a.id===t.id),s=e.rooms[t.room]?.items.find(a=>a.id===t.itemId);if(!n||!s||n.held[t.hand]||n.room!==t.room)return e;const o=Le(e,t.room,a=>({...a,items:a.items.filter(r=>r.id!==t.itemId)})),i=go(o,t.id,a=>({...a,held:{...a.held,[t.hand]:s}}));return s.kind==="kennel"&&e.dogKennel?.item===t.itemId?{...i,dogKennel:null}:i}case"char/release":{const n=e.characters.find(i=>i.id===t.id),s=n?.held[t.hand];if(!n||!s)return e;const o=go(e,t.id,i=>({...i,held:{...i.held,[t.hand]:null}}));return Le(o,n.room,i=>({...i,items:[...i.items,{...s,x:mn(t.x,0,Gt),y:mn(t.y,40,Ps),z:ps(i)+1}]}))}case"cat/set":return{...e,cat:t.cat};case"cat/move":return e.cat&&e.rooms[t.room]?{...e,cat:{...e.cat,room:t.room,x:mn(t.x,100,Gt-100)}}:e;case"dog/set":return{...e,dog:t.dog};case"dog/kennel":return t.item===null?e.dogKennel?{...e,dogKennel:null}:e:!ff(e,t.item)||e.dogKennel?.item===t.item?e:{...e,dogKennel:{item:t.item}};case"ranch/op":{const n=t.op;if(n.op==="take"){const i=e.rooms[n.room];if(i&&i.items.some(a=>a.id===n.id))return e}const s=ca(Ka(e.garden),Ga(e.basket),t.op,t.now,e.lastEgg??0);if(typeof s=="string")return e;let o={...e,garden:s.plots,basket:s.basket,lastEgg:t.op.op==="egg"?t.now:e.lastEgg};if(t.op.op==="take"&&o.rooms[t.op.room]){const i=t.op;o=Le(o,i.room,a=>a.items.length>=80?a:{...a,items:[...a.items,{id:i.id,kind:nf[i.kind],x:i.x,y:560,flip:!1,z:ps(a)+1,scale:1}]})}return o}case"settings/sound":return{...e,soundOn:t.on};case"game/reset":return Xt()}}const Nr=it("cozy-house"),mf=it("cozy-house-v1");function Ja(e){if(!e||typeof e!="object"||!e.rooms)return Xt();let t=e;if(t.version===1){const c=g=>(Number(g)||0)+ls,d={};for(const[g,f]of Object.entries(t.rooms))d[g]={...f,items:(f.items??[]).map(h=>({...h,x:c(h.x)}))};t={...t,version:2,rooms:d,character:{...t.character,x:c(t.character?.x)}}}if(t.version===2){const c=t.character??{};t={...t,version:3,characters:[an({...c,id:"c1",size:"kid",acc:0,held:{left:null,right:null}})]},delete t.character}if(t.version!==3)return Xt();const n=Xt(),s=(Array.isArray(t.characters)?t.characters:[]).slice(0,cs).map((c,d)=>{const g=c?.look2,f=an({...c,id:String(c.id??"c"+(d+1)),held:{left:c.held?.left??null,right:c.held?.right??null}});if(delete f.look2,g!=null){const h=Gs(g);h&&(f.look2=h)}return f}),o=cc({...n,...t,rooms:{...n.rooms,...t.rooms},characters:s}),i=Xa(o),a=i===o.dogKennel?o:{...o,dogKennel:i},r=df(a.mailbox);let l=a;if(r)l={...l,mailbox:r};else if(l.mailbox){const{mailbox:c,...d}=l;l=d}return yf(l)}function yf(e){const t=e.currentRoom,n=rc.includes(t),s=a=>Ds.includes(a);let o=!1;const i=e.characters.map(a=>{const r=a.room;return!s(r)||!n&&r===t?(o=!0,{...a,room:"living"}):a});return n&&!o?e:{...e,currentRoom:n?e.currentRoom:"living",characters:i}}function dc(){let e;try{const s=localStorage.getItem(Nr)??localStorage.getItem(mf);e=s?Ja(JSON.parse(s)):Xt(),!s&&typeof navigator<"u"&&!navigator.webdriver&&(e=Zg(e))}catch{e=Xt()}const t=[];let n;return{get:()=>e,subscribe(s){t.push(s)},dispatch(s){e=Io(e,s),t.forEach(o=>o(e,s)),clearTimeout(n),n=window.setTimeout(()=>{try{localStorage.setItem(Nr,JSON.stringify(e))}catch{}},250)}}}const kf=Object.freeze(Object.defineProperty({__proto__:null,MAX_CHARS:cs,ROOM_H:Ps,ROOM_IDS:Ds,ROOM_W:Gt,TAB_ROOMS:rc,V1_OFFSET:ls,V1_ROOM_W:lc,createStore:dc,ensureRooms:cc,initialState:Xt,migrate:Ja,newCharacter:an,reduce:Io,validKennel:Xa},Symbol.toStringTag,{value:"Module"}));function da(e,t){for(let n=e.length-1;n>0;n--){const s=Math.floor(t()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}const gc=4,jr=7,bf=30;function vf(){const e=[];let t=0;for(let n=0;n<gc;n++){e.push({id:t++,c:n,v:0});for(let s=1;s<=9;s++)for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s});for(const s of["skip","rev","d2"])for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s})}for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"wild"});for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"w4"});return e}const ga=e=>e.discard[e.discard.length-1],us=(e,t)=>t.c===4||t.c===e.color||t.v===ga(e).v&&ga(e).c!==4,It=(e,t,n=1)=>{const s=e.hands.length;return((t+e.dir*n)%s+s)%s};function fa(e,t,n,s){const o=[];for(let i=0;i<n&&e.hands[t].length<bf;i++){if(!e.deck.length){const r=e.discard.pop();if(e.deck=da(e.discard.map(l=>l),s),e.discard=[r],!e.deck.length)break}const a=e.deck.pop();e.hands[t].push(a),o.push(a)}return e.hands[t].length>1&&(e.slay[t]=!1),o}function wf(e,t){if(e.owe!==null&&e.hands[e.owe]?.length===1&&!e.slay[e.owe]){const n=e.owe;return e.owe=null,{victim:n,vdrew:fa(e,n,2,t).length}}return e.owe=null,{}}const Fr=e=>{const t=[0,0,0,0];return e.forEach(n=>{n.c<4&&t[n.c]++}),t.indexOf(Math.max(...t))},$f={id:"slay",name:"Slay",minPlayers:2,maxPlayers:6,setup(e,t){const n=da(vf(),t),s=Array.from({length:e},()=>n.splice(-jr,jr));let o=n.length-1;for(;typeof n[o].v!="number";)o--;const i=n.splice(o,1)[0];return{deck:n,discard:[i],hands:s,color:i.c,turn:Math.floor(t()*e),dir:1,drawn:null,slay:s.map(()=>!1),owe:null,winner:null,ev:{n:0,p:-1,k:"start",card:i}}},cleanMove(e){return!e||typeof e!="object"?null:e.k==="play"&&Number.isInteger(e.id)&&e.id>=0&&e.id<108?{k:"play",id:e.id,...Number.isInteger(e.color)&&e.color>=0&&e.color<gc?{color:e.color}:{}}:e.k==="draw"||e.k==="pass"||e.k==="slay"?{k:e.k}:null},legal(e,t,n){if(e.winner!==null)return!1;if(n.k==="slay")return e.hands[t].length<=2&&!e.slay[t];if(t!==e.turn)return!1;if(n.k==="draw")return e.drawn===null;if(n.k==="pass")return e.drawn!==null;const s=e.hands[t].find(o=>o.id===n.id);return!s||e.drawn!==null&&s.id!==e.drawn||s.c===4&&n.color===void 0?!1:us(e,s)},apply(e,t,n,s){const o=e.ev.n+1;if(n.k==="slay")return e.slay[t]=!0,e.owe===t&&(e.owe=null),e.ev={n:o,p:t,k:"slay"},e;const i=wf(e,s);if(n.k==="draw"){const d=fa(e,t,1,s),g=d[0];if(g&&us(e,g))e.drawn=g.id,e.ev={n:o,p:t,k:"draw",drew:1,...i};else{if(e.drawn=null,e.ev={n:o,p:t,k:"draw",drew:d.length,...i},e.stuck=d.length?0:(e.stuck??0)+1,(e.stuck??0)>=e.hands.length){const f=Math.min(...e.hands.map(h=>h.length));return e.winner=e.hands.findIndex(h=>h.length===f),e.turn=-1,e}e.turn=It(e,t)}return e}if(n.k==="pass")return e.drawn=null,e.turn=It(e,t),e.ev={n:o,p:t,k:"pass",...i},e;e.stuck=0;const a=e.hands[t],r=a.splice(a.findIndex(d=>d.id===n.id),1)[0];e.discard.push(r),e.drawn=null,e.color=r.c===4?n.color:r.c;const l={n:o,p:t,k:"play",card:r,color:e.color,...i};if(!a.length)return e.winner=t,e.turn=-1,e.ev=l,e;a.length===1&&!e.slay[t]&&(e.owe=t);const c=e.hands.length===2;if(r.v==="rev")e.dir=e.dir===1?-1:1,e.turn=c?t:It(e,t);else if(r.v==="skip")l.skipped=It(e,t),e.turn=It(e,t,2);else if(r.v==="d2"||r.v==="w4"){const d=It(e,t);l.skipped=d;const g=r.v==="d2"?2:4;l.drew=fa(e,d,g,s).length,e.turn=It(e,t,2)}else e.turn=It(e,t);return e.ev=l,e},turn:e=>e.winner!==null?-1:e.turn,winner:e=>e.winner,view(e,t){return{top:ga(e),color:e.color,turn:e.winner!==null?-1:e.turn,dir:e.dir,deck:e.deck.length,counts:e.hands.map(n=>n.length),slay:e.slay,winner:e.winner,ev:e.ev,...t!==null&&e.hands[t]?{hand:e.hands[t],drawn:t===e.turn?e.drawn:null}:{}}},autoMove(e,t){if(t!==e.turn)return null;if(e.drawn!==null){const s=e.hands[t].find(o=>o.id===e.drawn);return s&&us(e,s)?{k:"play",id:s.id,...s.c===4?{color:Fr(e.hands[t])}:{}}:{k:"pass"}}const n=e.hands[t].find(s=>us(e,s)&&s.c!==4)??e.hands[t].find(s=>us(e,s));return n?{k:"play",id:n.id,...n.c===4?{color:Fr(e.hands[t])}:{}}:{k:"draw"}},removePlayer(e,t,n){if(e.hands.length<=2)return null;const s=e.turn===t;return e.deck.unshift(...e.hands[t]),da(e.deck,n),e.hands.splice(t,1),e.slay.splice(t,1),e.owe===t?e.owe=null:e.owe!==null&&e.owe>t&&e.owe--,e.turn>t&&e.turn--,s&&(e.drawn=null,e.dir===-1?e.turn=((t-1)%e.hands.length+e.hands.length)%e.hands.length:e.turn=t%e.hands.length),e.ev={n:e.ev.n+1,p:t,k:"left"},e}},ha=7,Lo=6,xf=(e,t,n)=>{const s=e[t][n];for(const[o,i]of[[1,0],[0,1],[1,1],[1,-1]]){const a=[[t,n]];for(const r of[1,-1])for(let l=1;l<4;l++){const c=t+o*l*r,d=n+i*l*r;if(c<0||c>=ha||d<0||d>=Lo||e[c][d]!==s)break;a.push([c,d])}if(a.length>=4)return a}return null},_f={id:"four",name:"Four in a Row",minPlayers:2,maxPlayers:2,setup:(e,t)=>({b:Array.from({length:ha},()=>[]),turn:t()<.5?0:1,winner:null,draw:!1,line:null,last:null,n:0}),cleanMove:e=>e&&Number.isInteger(e.col)&&e.col>=0&&e.col<ha?{col:e.col}:null,legal:(e,t,n)=>e.winner===null&&!e.draw&&t===e.turn&&e.b[n.col].length<Lo,apply(e,t,n){e.b[n.col].push(t);const s=e.b[n.col].length-1;e.last={col:n.col,row:s,p:t},e.n++;const o=xf(e.b,n.col,s);return o?(e.winner=t,e.line=o,e.turn=-1):e.b.every(i=>i.length>=Lo)?(e.draw=!0,e.turn=-1):e.turn=1-t,e},turn:e=>e.turn,winner:e=>e.winner,view:e=>e,autoMove:(e,t)=>{if(t!==e.turn)return null;const s=[3,2,4,1,5,0,6].find(o=>e.b[o].length<Lo);return s===void 0?null:{col:s}},removePlayer:()=>null},fc={slay:$f,four:_f},vi=2600,Is=[{game:"slay",seats:6,x:720},{game:"four",seats:2,x:1500},{game:"slay",seats:4,x:2150}],Mf=2e4,Lf=["Acorn Friend","Alarm Clock","Apple","Apple Tree","Arc Floor Lamp","Arc Lamp","Arched Mirror","Arched Shelf","Armchair","Autumn Wreath","Baby Blocks","Baby Bottle","Bakery Shelf","Ball","Balloons","Bananas","Bar Stool","Bassinet","Bathtub","Bean Bag","Bed","Big Leaf Plant","Big Monitor","Big Wardrobe","Birdie","Blanket Basket","Blocks","Boba Buddy","Book Stack","Books","Bookshelf","Box Stack","Bread","Brush & Comb","Bubble Aquarium","Bubble Bath","Bubble Chair","Bubble-Gum Rug","Bubbly Fountain","Bubbly Plant","Bud Vase","Bulletin Board","Bunk Bed","Bunny","Bunny Plush","Bunny Slippers","Cactus","Cactus Buddy","Cada's Mouse","Cake","Candle Jar","Canopy Bed","Canopy Daybed","Cat Bed","Cat Tower","Caterpillar Plush","Chair","Changing Table","Checker Rug","Checkered Bed","Chick","Chloe's Star Lamp","Clock","Clothes Rail","Cloud Beanbag","Cloud Lamp","Cloud Rug","Cloud Shelf","Cocoa Doll","Cocoa Mug","Coffee Table","Comfy Chair","Cookie Jar","Cooking Pot","Cottage Heart Pouf","Cottage Heart Rug","Counter","Cozy Fireplace","Cozy Lights","Cozy Mug","Cozy Nightstand","Cozy Reading Nook","Cozy Snake Plant","Cozy Teapot","Cream Jars","Cream Sofa","Crib","Crib Mobile","Cubby Shelf","Cube Shelf","Cupcake","Cupcake Stand","Curtains","Curvy Yellow Desk","Cute Keyboard","Cute Speaker","Daisy Pot","Daisy Rug","Desk","Desk Lamp","Desk Mic","Dino Plushie","Dish Cabinet","Dish Rack","Dog Kennel","Doll House","Donut","Dresser","Droplet Buddy","Egg Pan","Fairy-Light Garland","Fairy-Light Shelf","Fan","Fancy Sofa","Fiddle-Leaf Fig","Fig Tree","Fire Pit","Fireplace","Fish Bowl","Fish Tank","Flower Cart","Flower Floor Lamp","Flower Kettle","Flower Lamp","Flowers","Foot Spa","Fresh Egg","Fridge","Frog Plush","Fruit Bowl","Game Controller","Gaming Chair","Garden Carrot","Glass Cabinet","Globe","Globe Pendants","Glossy Hair Dryer","Glow Mirror","Gold Floor Mirror","Guinea Pig","Hair Dryer","Hair-Dryer Chair","Hair-Wash Chair","Hamster House","Hamster Pal","Hanging Lamp","Hanging Lantern","Hanging Plant","Hanging Vine Planter","Happy Fridge","Headphones","Heart Headboard Bed","Heart Pouf","Heart Rug","Heart Wall Clock","Heart Wall Light","Heart-Leaf Plant","Herb Box","High Chair","Honey Doll","Ice Cream","Jewelry Box","Juice","Kettle","Kitchen Counter","Knit Cushion","Ladder Shelf","Lamp","Landscape Art","Lattice Bench","Lava Lamp","Lemon Tree","Lighted Vanity","Lilac Curtain","Little Rocking Horse","Little Sprout","Lotion Bottles","Macaron Jar","Macrame Swing Chair","Mani-Pedi Chair","Manicure Table","Microwave","Milk","Milk & Cookies","Mini Fridge","Mini Greenhouse","Mini Tree","Mint Fridge","Mint Pebble Rug","Mirror","Mixer","Moon and Stars","Moon Night-Light","Moving Box","Mushroom Stool","Music Box","Nail Dryer","Nail Polish","Nail Polish Rack","Night Light","Nightstand","Nursery Cloud Rug","Nursery Dresser","Nursery Lamp","Pancakes","Pantry","Paper Lantern","Pastel Range","Pastel Wardrobe","Pendant Lamp","Perfume","Perfume Bottle","Perfume Tray","Pet Bowl","Petal Coffee Table","Phone on a Stand","Piano","Picnic Basket","Picture","Piggy Bank","Pillow","Pin Board","Pink Vanity","Pizza","Plant","Plant Stand","Plant Wall","Play Mat","Play Tent","Polish Bottle","Popcorn","Pothos Plant","Pouf","Puffy Cloud Sofa","Puffy Stool","Puppy","Quinn's Cookie Pup","Radio","Rainbow Art","Rainbow Rug","Ranch Flowers","Rattle","Reagan's Frame","Reception Desk","Record Player","Ribbon Mirror","Rice Cooker","Ring Light","Robot","Rocker","Rocking Chair","Rocking Horse","Rose Doll","Round Breakfast Table","Round Side Table","Round Woven Rug","Rug","Runner Rug","Salon Chair","Scallop Curtains","Scalloped Loveseat","Shelf","Sink","Sloane's Rainbow Snail","Snake Plant","Sofa","Sparkle Wall Light","Spice Rack","Spray Bottle","Stacking Rings","Star Dresser","Star Lamp","Star Mobile","Stars","Sticker Board","Stove","String Lights","Striped Runner","Succulents","Sunny Art","Sunny Bean Bag","Sunny Cloud Rug","Sunny Shelf","Swing Chair","Swivel Stool","Table","Tassel Rug","Teapot","Teapot Set","Teddy","Tiered Tray","Toaster","Towel Cart","Towel Stack","Toy Bin","Toy Car","Toy cat","Toy Chest","Toy Train","Trailing Plant Shelf","Tulip Vase","Turtle","TV","TV Stand","Unicorn Plushie","Utensil Rail","Vanity","Vanity Stool","Vlog Camera","Waiting Bench","Wall Shelf","Wardrobe","Water-Drop Lamp","Watermelon","Wavy Floor Lamp","Window","Window Seat","Wood Armchair","Wood Bookshelf","Wood Coffee Table","Wood Desk","Wood Dresser","Wood Stool","Wood Wall Clock","Wooden Bed","Yard Sign"],Cf=4,er=16,qo=e=>String(e??"").toUpperCase().replace(/[^A-Z0-9]/g,""),Sf=e=>e.length>=Cf&&e.length<=er&&/^[A-Z0-9]+$/.test(e),Bf=12,Wf=["Cada","Chloe","Quinn","Reagan","Sloane"],Tf=460,Pf=320,Zr=["Sunny Bunny","Bubbly Panda","Sparkle Kitty","Happy Hippo","Cozy Koala","Jolly Jelly","Zippy Fox","Dreamy Deer","Giggly Goose","Peachy Pup","Minty Mouse","Rainbow Duck","Cuddly Cub","Starry Owl","Bouncy Frog","Lucky Lamb","Snuggly Seal","Twinkle Tiger","Berry Bear","Cloudy Llama","Pebble Penguin","Honey Hedgehog","Marshmallow Moose","Cupcake Cat"],Hs=["Hi!","Come over!","I love your house!","Let's play!","Follow me!","Look at this!","Want a snack?","Nice!","Yes!","No thanks","Hehe","Be right back","Bye!","Let's decorate!","Wanna race?","So cute!"],hc=["👋","😀","😂","😍","😮","😢","🎉","⭐","❤️","👍","🍕","🐱","🌈","🎶","💤","✨"],tr=60,Hf={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t","@":"a",$:"s","!":"i","+":"t"},Ni=["fuck","fuk","fck","shit","sht","bitch","btch","bastard","asshole","ass","dick","cock","pussy","cunt","whore","slut","damn","crap","piss","fag","faggot","retard","nigger","nigga","porn","sex","sexy","nude","naked","boob","boobs","penis","vagina","kill","suicide","stupid","idiot","dumb","hate","loser","shutup","wtf","stfu","gtfo","bs"],Uf=["zero","oh","one","two","three","four","five","six","seven","eight","nine","ten"],Ef=[/\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i,/\bi\s*live\s+(at|on|in)\b/i,/\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,/\b(password|passcode|zip\s*code|postcode)\b/i,/\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i],Qf=/(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i,Af=/\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i,Rf=/@\w/,zf=/\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;function Df(e,t=tr){if(typeof e!="string")return{ok:!1,reason:"empty"};const n=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(!n)return{ok:!1,reason:"empty"};if(n.length>t)return{ok:!1,reason:"long"};if(Qf.test(n))return{ok:!1,reason:"link"};if(Af.test(n)||Rf.test(n))return{ok:!1,reason:"contact"};if((n.match(/\d/g)??[]).length>=5||/\d[\d\s().\-]{4,}\d/.test(n)||zf.test(n))return{ok:!1,reason:"contact"};const o=n.toLowerCase().split(/[^a-z]+/).filter(Boolean);let i=0;for(const c of o)if(i=Uf.includes(c)?i+1:0,i>=4)return{ok:!1,reason:"contact"};if(Ef.some(c=>c.test(n)))return{ok:!1,reason:"personal"};const a=n.toLowerCase().replace(/[0-9@$!+]/g,c=>Hf[c]??c),r=a.split(/[^a-z]+/).filter(Boolean),l=a.replace(/[^a-z]/g,"").replace(/(.)\1{2,}/g,"$1$1");return r.some(c=>Ni.includes(c)||Ni.includes(c.replace(/(.)\1+/g,"$1")))||Ni.filter(c=>c.length>=5).some(c=>l.includes(c))?{ok:!1,reason:"words"}:{ok:!0,text:n}}const If={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t",8:"b","@":"a",$:"s","!":"i","+":"t",v:"u","|":"k","<":"k","#":"h"};function qf(e){return/^f+u+c+k+$/.test(e)||/^f+u+k+$/.test(e)||/^f+c+k+$/.test(e)||/^s+h+i+t+$/.test(e)||/^s+h+t+$/.test(e)||/^b+i+t+c+h+$/.test(e)||/^b+t+c+h+$/.test(e)||/^a+s+h+o+l+e+$/.test(e)||/^d+u+m+b+a+s+$/.test(e)||/^n+i+g{2,}e+r+$/.test(e)||/^n+i+g{2,}a+$/.test(e)||/^f+a+g+$/.test(e)||/^f+a+g+o+t+$/.test(e)||/^r+e+t+a+r+d+$/.test(e)||/^k+y+s+$/.test(e)}function Of(e){return/^c+u+n+t+$/.test(e)||/^a+h+o+l+e+$/.test(e)||/^k+i+k+e+$/.test(e)||/^c+h+i+n+k+$/.test(e)||/^s+p+i+c+$/.test(e)||/^c+o{2,}n+$/.test(e)||/^w+e+t+b+a+c+k+$/.test(e)||/^t+r+a+n+y+$/.test(e)||/^t+r+a+n+i+$/.test(e)||/^d+y+k+e+$/.test(e)||/^b+e+a+n+e+r+$/.test(e)||/^g+o{2,}k+$/.test(e)||/^r+a+g+h+e+a+d+$/.test(e)||/^t+o+w+e+l+h+e+a+d+$/.test(e)||/^h+e+i+l+h+i+t+l+e+r+$/.test(e)}const Nf=new Set(["spicy","spices","spicing","spicey","spicier","spiciest","cocky","chinking","spicer","gooky","slutty","twatt"]);function jf(e,t){if(!/^[a-z]+$/.test(e)||t&&Nf.has(e))return!1;const n=[e],s=["ing","in","ers","er","ed","es","y","s"];for(let o=0;o<s.length;o++){const i=s[o];e.endsWith(i)&&e.length>i.length+2&&n.push(e.slice(0,-i.length))}for(let o=0;o<n.length;o++)if(qf(n[o])||t&&Of(n[o]))return!0;return!1}function Ff(e){if(!e.includes("*"))return[e];const t=e.split("*").length-1,n=e.replace(/\*/g,""),s=n?[n]:[];if(t<1||t>3)return s;const o=e.split(""),i=[];for(let r=0;r<o.length;r++)o[r]==="*"&&i.push(r);const a=r=>{if(r===i.length){s.push(o.join(""));return}for(let l=97;l<=122;l++)o[i[r]]=String.fromCharCode(l),a(r+1)};return a(0),s}const Vr=["mother","sonofa","horse","bull","dip"],Gr=["face","head","you"];function Yn(e,t){const n=e.replace(/ph(?=u+c+k)/g,"f").replace(/ph(?=u+k)/g,"f");if(jf(n,t)||/^w+t+f+$/.test(n)||/^s+t+f+u+$/.test(n))return!0;for(let s=0;s<Vr.length;s++){const o=Vr[s];if(n.startsWith(o)&&n.length>o.length+2&&Yn(n.slice(o.length),t))return!0}for(let s=0;s<Gr.length;s++){const o=Zf(n,Gr[s]);if(o&&Yn(o,t))return!0}return!!(n.length>4&&n.endsWith("s")&&!n.endsWith("ss")&&Yn(n.slice(0,-1),t))}function Zf(e,t){let n=e.length;for(let s=t.length-1;s>=0;s--){const o=t[s];if(n===0||e[n-1]!==o)return null;for(;n>0&&e[n-1]===o;)n--}return n<=2?null:e.slice(0,n)}function Oo(e){let t="";for(let n=0;n<e.length;n++)t+=If[e[n]]??e[n];return t}const Vf={ѕ:"s",һ:"h",с:"c",а:"a",е:"e",о:"o",р:"p",і:"i",х:"x",у:"y",к:"k"};function Gf(e){const n=e.replace(/[\u00ad\u0336\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").normalize("NFKC").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase();let s="";for(let o=0;o<n.length;o++)s+=Vf[n[o]]??n[o];return s}const Kf=new Set(["it","its","it's","is","as","a","i","uh","oh","so","he","she","hi","um","umm","hmm","hm","ah","eh","er","ow","ha","hey","yo","ok","yeah","yes","no","nah","wow","ho","ooh","ahh","uhh","ohh"]);function qs(e){return e>="a"&&e<="z"||e>="0"&&e<="9"||"@$!+*v|#<".includes(e)}function Kr(e,t){let n=t;for(;n<e.length&&e[n]==="!";)n++;if(n>=e.length||!qs(e[n])||e[n]==="!")return null;const s=e[n];let o=n+1;for(;o<e.length&&e[o]==="!";)o++;return o<e.length&&qs(e[o])?null:{ch:s,end:o}}function Yf(e,t){const n=e.length,s=" .-_~";let o=0;for(;o<n;){if(o>0&&qs(e[o-1])){o++;continue}const i=Kr(e,o);if(!i){o++;continue}const a=[i.ch];let r=i.end;for(;r<n&&s.includes(e[r]);){const l=Kr(e,r+1);if(!l)break;a.push(l.ch),r=l.end}if(a.length>=2){const l=Oo(a.join("")).replace(/\*/g,"");if(Yn(l,t))return!0}o=Math.max(o+1,r)}return!1}function Tn(e){return e.replace(/^!+/,"").replace(/!+$/,"")}function No(e){return Oo(Tn(e)).replace(/\*/g,"")}function pc(e){return/[0-9@$!+*|#<]/.test(Tn(e))}function Xf(e){return Tn(e).length===1}function Jf(e){const t=Tn(e);return t.length<2||pc(e)?!1:/^sh+$/.test(t)||Kf.has(t)}function eh(e){let t="space";for(let n=0;n<e.length;n++){const s=e[n];if(!(s===" "||s==="	"||s===`
`||s==="\r")){if(s==="-"){t="hyphen";continue}return"punct"}}return t}function th(e){const t=[];let n=0,s="";for(;n<e.length;){if(!qs(e[n])){s+=e[n],n++;continue}let o=n+1;for(;o<e.length&&qs(e[o]);)o++;t.push({text:e.slice(n,o),gap:t.length===0?"start":eh(s)}),s="",n=o}return t}function nh(e){const t=[Oo(e)];if(e.charAt(0)==="!"||e.charAt(e.length-1)==="!"){const n=e.replace(/^!+/,"").replace(/!+$/,"");n&&n!==e&&t.push(Oo(n))}return t}function sh(e){for(let t=0;t<e.length;t++){if(!/^k+i+l+$/.test(e[t]))continue;const n=e[t+1]||"",s=e[t+2]||"";if(/^y+o+u+r+s+e+l+f+$/.test(n)||/^u+r+s+e+l+f+$/.test(n)||/^u+r+$/.test(n)&&/^s+e+l+f+$/.test(s))return!0}return!1}function oh(e,t,n){if(Tn(e[n].text)!=="coon")return!1;const s=n>0?t[n-1]:"",o=t[n+1]||"";return s==="maine"||o==="cat"}function ih(e,t,n){return n===t+1&&e[n].gap==="space"&&/^a+$/.test(No(e[t].text))&&/^h+o+l+e+$/.test(No(e[n].text))}function ah(e,t,n){return Tn(e[n].text)!=="dyke"?!1:n>0&&Tn(e[n-1].text)==="van"}function rh(e){for(let t=0;t<e.length-1;t++)if(/^h+e+i+l+$/.test(e[t])&&/^h+i+t+l+e+r+$/.test(e[t+1]))return!0;return!1}function lh(e,t=!0){const n=Gf(e);if(Yf(n,t))return!0;const s=th(n),o=s.map(a=>nh(a.text)),i=s.map(a=>No(a.text));if(sh(i)||t&&rh(i))return!0;for(let a=0;a<o.length;a++)if(!(t&&(oh(s,i,a)||ah(s,i,a))))for(let r=0;r<o[a].length;r++){const l=Ff(o[a][r]);for(let c=0;c<l.length;c++)if(Yn(l[c].replace(/\*/g,""),t))return!0}for(let a=0;a<s.length;a++){let r="",l=0,c=!1,d=!1;for(let g=a;g<s.length&&g<a+8;g++){if(g>a){const f=s[g].gap,h=s[g-1].text;if(f==="punct"||f==="start"||h.endsWith("!")||s[g].text.startsWith("!")||f!=="space"&&f!=="hyphen")break}if(r+=No(s[g].text),Xf(s[g].text)&&l++,Jf(s[g].text)&&(c=!0),pc(s[g].text)&&(d=!0),g!==a&&!(c&&l<2&&!d)&&Yn(r,t)){if(t&&ih(s,a,g))break;return!0}}}return!1}function uc(e,t,n,s=!1){if(typeof e!="string")return{ok:!1,reason:"empty"};const o=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return o?o.length>t?{ok:!1,reason:"long"}:lh(o,!s)?{ok:!1,reason:n}:{ok:!0,text:o}:{ok:!1,reason:"empty"}}function ch(e,t=tr){return uc(e,t,"words")}const wi={long:"That is a bit long!",link:"No links, please!",contact:"Keep numbers and contact info secret!",personal:"Keep personal info secret!",words:"Let's use kind words!",mail:"Oops, try different words!",empty:""},mc={};for(const e of["АA","аa","ВB","вb","ЕE","еe","КK","кk","МM","мm","НH","нh","ОO","оo","РP","рp","СC","сc","ТT","тt","УY","уy","ХX","хx","ІI","іi","ЈJ","јj","ЅS","ѕs","ЁE","ёe","ЇI","їi","ΑA","ΕE","ΖZ","ΗH","ΙI","ΚK","ΜM","ΝN","ΟO","ΡP","ΤT","ΥY","ΧX","αa","εe","ζz","ιi","κk","νv","οo","ρp","τt","υu","χx"])mc[e[0]]=e[1];function dh(e){let t="";for(const n of e)t+=mc[n]??n;return t}function gh(e){return dh(String(e).normalize("NFKC")).replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\p{M}]/gu,"").replace(/[\p{Extended_Pictographic}\p{S}\p{P}]+/gu,"").replace(/\s+/g," ").trim()}function fh(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(()=>{const e=[...new Set(Lf.map(t=>gh(t)).filter(t=>t.length>=2))].sort((t,n)=>n.length-t.length);return new RegExp(`(^|[^A-Za-z])(?:${e.map(fh).join("|")})(?![A-Za-z])`,"gi")})();const Yr=(e,t,n)=>typeof e=="number"&&Number.isFinite(e)?Math.max(t,Math.min(n,e)):null,hh=(e,t,n=80)=>typeof e=="string"&&e.length<=n&&t.test(e)?e:null,ph=/^#[0-9a-fA-F]{3,8}$/,uh=["little","kid","adult"];function mh(e){if(!e||typeof e!="object")return null;const t={};for(const n of["skin","hair","shirt","pants"])if(n in e){const s=hh(e[n],ph,9);if(!s)return null;t[n]=s}if("hairStyle"in e){const n=Yr(e.hairStyle,0,3);if(n===null)return null;t.hairStyle=Math.round(n)}if("acc"in e){const n=Yr(e.acc,0,3);if(n===null)return null;t.acc=Math.round(n)}if("size"in e){if(!uh.includes(e.size))return null;t.size=e.size}if("flip"in e){if(typeof e.flip!="boolean")return null;t.flip=e.flip}return"look2"in e&&(t.look2=Gs(e.look2)??null),Object.keys(t).length?t:null}function Ys(e){const t=an({id:"x"}),n=mh({skin:e?.skin,hair:e?.hair,hairStyle:e?.hairStyle,shirt:e?.shirt,pants:e?.pants,size:e?.size,acc:e?.acc})??{},s=i=>n[i]??t[i],o={skin:s("skin"),hair:s("hair"),hairStyle:s("hairStyle"),shirt:s("shirt"),pants:s("pants"),size:s("size"),acc:s("acc")};if(e&&typeof e=="object"&&"look2"in e){const i=Gs(e.look2);i&&(o.look2=i)}return o}const Xr=4,yh=["Mittens","Luna","Biscuit","Pumpkin","Whiskers","Mochi","Pepper","Noodle","Ginger","Socks"],kh=["Buddy","Coco","Max","Daisy","Peanut","Rocket","Bella","Waffles","Scout","Honey"];function bh(e){const t=String(e??"").normalize("NFC").replace(/\s+/g," ").trim();return!/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u.test(t)||(t.match(/\d/g)??[]).length>2?null:Df(t).ok?t:null}function vh(e,t=[]){return uc(e,Vt,"mail")}function yc(e){return typeof e.freeMail=="boolean"?e.freeMail:e.freeChat}const nr=2900,pa=[{kind:"swing",x:430,y:500},{kind:"swing",x:570,y:500},{kind:"blanket",x:1730,y:548},{kind:"blanket",x:1850,y:548},{kind:"bench",x:2025,y:512},{kind:"bench",x:2105,y:512},{kind:"bench",x:2225,y:512},{kind:"bench",x:2305,y:512}],V={top:{x:905,y:330},bottom:{x:1110,y:545},ladder:850},Me={x0:2440,x1:2840,y0:470,y1:585},wh=(e,t)=>e.where===t.where&&(e.where!=="house"||e.houseId===t.houseId&&e.room===t.room),$h=(e,t)=>wh(e,t)&&Math.abs(e.x-t.x)<=Tf&&Math.abs(e.y-t.y)<=Pf;function fo(e){try{return Ja(e)}catch{return e}}const ua=it("cozy-hood"),ns=()=>{try{return JSON.parse(localStorage.getItem(ua)??"null")}catch{return null}},Ht=e=>{e?localStorage.setItem(ua,JSON.stringify(e)):localStorage.removeItem(ua)};function $i(){const e=new URLSearchParams(location.search).get("hood");return e?e.replace(/\/$/,""):"https://cozy-hood.andrewmunruh.workers.dev".replace(/\/$/,"")}async function xh(e){const t=await fetch(e+"/api/create",{method:"POST"});if(!t.ok)throw new Error("create failed "+t.status);return t.json()}async function _h(e,t){const n=await fetch(`${e}/api/hood/${encodeURIComponent(t)}`);if(n.status===429)return{slow:!0};if(!n.ok)throw new Error("lookup failed");return n.json()}const Jr=e=>e.type==="item/move"?"im:"+e.id:e.type==="char/move"?"cm:"+e.id:null;class xi{constructor(t){this.cfg=t,this.ws=null,this.pid="",this.settings={freeChat:!0},this.players=new Map,this.houses=new Map,this.presence=new Map,this.status="offline",this.replaced=!1,this.ranch={plots:[],skew:0},this.tables=new Map,this.handlers=new Map,this.cid=1,this.flushT=0,this.presT=0,this.lastPres=null,this.presDirty=!1,this.closedByUs=!1,this.retry=0,this.retryT=0,this.epoch=0,this.stableT=0,this.outbox=[]}on(t,n){(this.handlers.get(t)??this.handlers.set(t,[]).get(t)).push(n)}emit(t,...n){this.handlers.get(t)?.forEach(s=>s(...n))}send(t){return this.ws?.readyState!==WebSocket.OPEN?!1:(this.ws.send(JSON.stringify(t)),!0)}reliable(t){this.send(t)||(t.t==="lock"?this.outbox=this.outbox.filter(n=>!(n.t==="lock"&&n.houseId===t.houseId)):(t.t==="look"||t.t==="dog")&&(this.outbox=this.outbox.filter(n=>n.t!==t.t)),this.outbox.push(t),this.outbox.length>8&&this.outbox.splice(0,this.outbox.length-8))}flushOutbox(){if(this.ws?.readyState!==WebSocket.OPEN||!this.outbox.length)return;const t=this.outbox;this.outbox=[];for(const n of t)this.send(n)||this.outbox.push(n)}scheduleRetry(){if(this.closedByUs||this.replaced||!this.cfg.token||this.retryT)return;const t=this.epoch,n=Math.min(15e3,400*2**Math.min(this.retry,6));this.retry++,this.retryT=window.setTimeout(()=>{this.retryT=0,!(t!==this.epoch||this.closedByUs||this.replaced||!this.cfg.token)&&this.connect()},n)}armStable(){this.stableT&&clearTimeout(this.stableT),this.stableT=window.setTimeout(()=>{this.stableT=0,this.retry=0},1e4)}clearStable(){this.stableT&&(clearTimeout(this.stableT),this.stableT=0)}connect(t){this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.closedByUs=!1,this.replaced=!1,this.status="connecting",this.emit("status",this.status);const n=this.ws;return new Promise(s=>{let o=!1;const i=r=>{o||(o=!0,s(r))},a=new WebSocket(this.cfg.url.replace(/^http/,"ws")+"/ws/"+encodeURIComponent(this.cfg.id??this.cfg.code));if(this.ws=a,n&&n!==a)try{n.close()}catch{}a.onopen=()=>{t&&!this.cfg.token?this.send({t:"join",...t,v:Xr,pet:1,mail:1}):this.cfg.token?this.send({t:"hello",token:this.cfg.token,v:Xr,pet:1,mail:1}):i("notoken")},a.onmessage=r=>{const l=JSON.parse(r.data);this.handle(l),l.t==="welcome"&&(this.armStable(),i("ok")),l.t==="error"&&i(l.code+(l.msg?":"+l.msg:"")),l.t==="removed"&&i("removed")},a.onclose=r=>{if(this.ws===a){if(this.clearStable(),this.ws=null,this.status="offline",i("closed"),r.code===4e3){this.replaced=!0,this.emit("status",this.status),this.emit("replaced");return}this.emit("status",this.status),this.scheduleRetry()}},a.onerror=()=>{}})}close(){this.closedByUs=!0,this.replaced=!1,this.epoch++,this.outbox=[],this.clearStable(),this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.presT&&(clearTimeout(this.presT),this.presT=0);try{this.ws?.close()}catch{}this.ws=null,this.status="offline",clearInterval(this.flushT)}handle(t){switch(t.t){case"joined":this.cfg.token=t.token,this.cfg.pid=t.pid,Ht(this.cfg);break;case"welcome":this.pid=t.pid,this.settings=t.settings,this.status="online",this.players=new Map(t.players.map(n=>[n.pid,n]));{const n=this.houses;this.houses=new Map;for(const s of t.houses){const{state:o,...i}=s,a=n.get(s.id);this.houses.set(s.id,{meta:i,confirmed:fo(o),pending:a?a.pending.filter(r=>!r.sent):[],view:null})}}this.presence=new Map(Object.entries(t.presence)),this.presence.delete(this.pid),t.ranch&&(this.ranch={plots:t.ranch.plots,skew:t.ranch.now-Date.now()});{const n=new Map;for(const s of t.tables??[])n.set(s.tb,this.stampTable(s));this.tables=n}clearInterval(this.flushT),this.flushT=window.setInterval(()=>this.flush(),60),this.lastPres&&(this.presDirty=!0),this.flushPres(),this.flushOutbox(),this.emit("welcome"),this.emit("status",this.status);break;case"act":{const n=this.houses.get(t.houseId);if(!n)return;n.confirmed=Io(fo(n.confirmed),t.action);const s=t.by===this.pid&&n.pending[0]?.cid===t.cid;s&&n.pending.shift(),n.view=null,s||this.emit("act",t.houseId,t.action);break}case"nack":{const n=this.houses.get(t.houseId);if(!n)return;n.pending=n.pending.filter(s=>s.cid!==t.cid),t.state&&(n.confirmed=fo(t.state)),n.view=null,this.emit("reset",t.houseId,t.reason);break}case"pres":t.pid!==this.pid&&(t.p?this.presence.set(t.pid,t.p):this.presence.delete(t.pid),this.emit("pres",t.pid));break;case"players":this.players=new Map(t.players.map(n=>[n.pid,n])),this.emit("players");break;case"house":{const{state:n,...s}=t.house;this.houses.set(s.id,{meta:s,confirmed:fo(n),pending:[],view:null}),this.emit("houses");break}case"houseMeta":{const n=this.houses.get(t.meta.id);n&&(n.meta=t.meta,this.emit("houses"),this.emit("houseMeta",t.meta.id));break}case"houseGone":this.houses.delete(t.houseId),this.emit("houses"),this.emit("houseGone",t.houseId);break;case"settings":this.settings=t.settings,this.emit("settings");break;case"bubble":this.emit("bubble",t.pid,t.b);break;case"fx":this.emit("fx",t.pid,t.fx);break;case"ranch":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch");break;case"ranchFail":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch"),this.emit("ranchFail",t.reason);break;case"noride":this.emit("noride",t.ride);break;case"table":{const n=this.stampTable(t.table);this.tables.set(n.tb,n),this.emit("table",n);break}case"tblFail":this.emit("tblFail",t.tb,t.reason);break;case"sayFail":this.emit("sayFail",t.reason);break;case"mailbox":{const n=this.houses.get(t.houseId);if(!n)return;if(t.mailbox?.letters?.length)n.confirmed={...n.confirmed,mailbox:t.mailbox};else{const{mailbox:s,...o}=n.confirmed;n.confirmed=o}n.view=null,this.emit("mailbox",t.houseId);break}case"mailFail":this.emit("mailFail",t.reason);break;case"parentInfo":this.emit("parentInfo",t);break;case"error":this.emit("error",t.code),t.code==="badtoken"&&(this.cfg.token=void 0,this.cfg.pid=void 0,Ht(this.cfg));break;case"removed":this.closedByUs=!0,this.emit("removed");break}}stampTable(t){const n=this.tables.get(t.tb),s=n&&n.away===t.away&&n.receivedAt?n.receivedAt:Date.now();return{...t,receivedAt:s}}view(t){const n=this.houses.get(t);return n?n.view??=n.pending.reduce((s,o)=>Io(s,o.action),n.confirmed):null}myHouseId(){return this.players.get(this.pid)?.houseId??""}canEdit(t){const n=this.houses.get(t);return!!n&&(!n.meta.locked||n.meta.ownerId===this.pid)}dispatch(t,n){const s=this.houses.get(t);if(!s)return;const o=Jr(n),i=s.pending[s.pending.length-1];o&&i&&!i.sent&&Jr(i.action)===o?i.action=n:s.pending.push({cid:this.cid++,action:n,sent:!1}),s.view=null}flush(){for(const[t,n]of this.houses)for(const s of n.pending)!s.sent&&this.send({t:"act",houseId:t,cid:s.cid,action:s.action})&&(s.sent=!0);this.flushPres()}setPresence(t){this.lastPres=t,this.presDirty=!0,this.presT||this.flushPres()}flushPres(){if(!(!this.presDirty||!this.lastPres)){if(!this.send({t:"pres",p:this.lastPres})){!this.closedByUs&&!this.presT&&(this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90));return}this.presDirty=!1,this.presT&&clearTimeout(this.presT),this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90)}}myPresence(){return this.lastPres}say(t){this.reliable({t:"say",b:t})}lock(t,n){this.reliable({t:"lock",houseId:t,locked:n})}setLook(t){this.reliable({t:"look",look:t});const n=this.players.get(this.pid);n&&(n.look=t)}setDog(t){this.reliable({t:"dog",dog:t});const n=this.players.get(this.pid);n&&(n.dog=t)}fx(t){this.reliable({t:"fx",fx:t})}ranchOp(t){this.reliable({t:"ranch",o:t})}tbl(t){this.reliable({t:"tbl",...t})}sendMail(t,n,s,o){this.reliable({t:"mail",op:"send",houseId:t,text:n,color:s,sticker:o})}readMail(t,n){this.reliable({t:"mail",op:"read",houseId:t,id:n})}dropMail(t,n){this.reliable({t:"mail",op:"drop",houseId:t,id:n})}now(){return Date.now()+this.ranch.skew}parent(t){this.cfg.parentKey&&this.reliable({t:"parent",key:this.cfg.parentKey,...t})}}function Mh(e,t,n,s="living"){let o=s;const i=[],a=()=>({...e.view(t),currentRoom:o,soundOn:n.get()}),r=l=>{if(e.houses.has(t)){const c=a();i.forEach(d=>d(c,l))}};return e.on("act",(l,c)=>{l===t&&r(c)}),e.on("reset",l=>{l===t&&r({type:"game/reset"})}),{houseId:t,get:a,subscribe(l){i.push(l)},dispatch(l){if(l.type==="room/switch")o=l.room;else if(l.type==="settings/sound")n.set(l.on);else{if(l.type==="game/reset")return;if(!e.canEdit(t))return;e.dispatch(t,l)}r(l)}}}const ve="#5a3d5c",q=`stroke="${ve}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,ma=[{name:"Tabby",body:"#ffb26b",stripe:"#e8893a",belly:"#ffe3c4"},{name:"Smokey",body:"#b9b6c9",stripe:"#8f8ba3",belly:"#ecebf3"},{name:"Tuxedo",body:"#4f4660",stripe:"",belly:"#ffffff"},{name:"Calico",body:"#fff6ec",stripe:"",belly:"#fff6ec"}],ya=[{name:"Pup",body:"#f2d0a4",ear:"#b07d54",snout:"#fbe7cc"},{name:"Poodle",body:"#fff0f6",ear:"#ffc8dd",snout:"#fff7fb"},{name:"Dachshund",body:"#c07a45",ear:"#7d4a26",snout:"#d99a68"},{name:"Golden",body:"#f4b860",ear:"#e09a3e",snout:"#fbd9a0"},{name:"Spotty",body:"#ffffff",ear:"#4a3f52",snout:"#ffffff"}],Lh=(e,t,n,s=!1)=>s?`<path d="M${e-3} ${n} q3 3 6 0 M${t-3} ${n} q3 3 6 0" fill="none" ${q} stroke-width="2.5"/>`:`<circle cx="${e}" cy="${n}" r="2.8" fill="${ve}"/><circle cx="${t}" cy="${n}" r="2.8" fill="${ve}"/><circle cx="${e+.9}" cy="${n-.9}" r=".9" fill="#fff"/><circle cx="${t+.9}" cy="${n-.9}" r=".9" fill="#fff"/>`,ka=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>`;function ss(e,t="stand"){const n=ma[e]??ma[0],s="#ffb3c6",o=(i,a,r,l)=>`
    <path d="M${i-13} ${a-8} L${i-10} ${a-25} L${i-1} ${a-13} Z" fill="${n.body}" ${q}/><path d="M${i-10.5} ${a-11} L${i-9.5} ${a-20} L${i-4} ${a-13} Z" fill="${s}"/>
    <path d="M${i+1} ${a-13} L${i+11} ${a-26} L${i+13} ${a-7} Z" fill="${e===3?"#f4a259":n.body}" ${q}/><path d="M${i+4} ${a-13} L${i+10} ${a-21} L${i+11} ${a-11} Z" fill="${s}"/>
    <circle cx="${i}" cy="${a}" r="${r}" fill="${n.body}" ${q}/>
    ${e===3?`<path d="M${i+2} ${a-r+1} a${r} ${r} 0 0 1 ${r-3} ${r-2} q-6 2 -${r-3} -${r-3}z" fill="#f4a259"/>`:""}
    ${e===2?`<ellipse cx="${i+2}" cy="${a+7}" rx="9" ry="7" fill="#fff"/>`:""}
    ${n.stripe?`<path d="M${i-4} ${a-r+2} v5 M${i+2} ${a-r+1} v6 M${i+8} ${a-r+3} v4" ${q} stroke="${n.stripe}" stroke-width="2.5"/>`:""}
    ${Lh(i-4,i+7,a,l)}
    <path d="M${i+3} ${a+4} l-2.5 -2 h5 z" fill="#ff8fab"/><path d="M${i+.5} ${a+6} q2.5 2.5 5 0" fill="none" ${q} stroke-width="2"/>
    ${ka(i-8,a+5)}${ka(i+12,a+5)}
    <path d="M${i+r-2} ${a+3} l9 -2 M${i+r-2} ${a+6} l9 2" ${q} stroke-width="1.6"/>`;return t==="nap"?`<svg viewBox="0 0 120 100" class="catsvg nap">
    <g class="breathe"><path class="tail" d="M28 84 Q22 96 64 94" fill="none" stroke="${ve}" stroke-width="11" stroke-linecap="round"/><path d="M28 84 Q22 96 64 94" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="76" rx="36" ry="18" fill="${n.body}" ${q}/>
    ${e===3?'<ellipse cx="44" cy="72" rx="12" ry="8" fill="#f4a259"/><ellipse cx="66" cy="70" rx="9" ry="6" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 62 q3 6 0 12 M56 61 q3 6 0 12 M68 62 q3 6 0 11" fill="none" ${q} stroke="${n.stripe}" stroke-width="3"/>`:""}
    ${o(90,76,15,!0)}</g></svg>`:t==="sit"?`<svg viewBox="0 0 120 100" class="catsvg sit">
    <path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${ve}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="70" rx="20" ry="25" fill="${n.body}" ${q}/>
    <ellipse cx="70" cy="74" rx="10" ry="15" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="54" cy="66" rx="9" ry="12" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M50 60 q5 2 4 8 M49 72 q5 2 4 8" fill="none" ${q} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect x="62" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${q}/><rect x="74" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${q}/>
    ${e===2?'<ellipse cx="66.5" cy="93" rx="4" ry="2.5" fill="#fff"/><ellipse cx="78.5" cy="93" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(72,36,17,!1)}</svg>`:`<svg viewBox="0 0 120 100" class="catsvg stand">
    <path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${ve}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <rect class="leg b" x="34" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${q}/><rect class="leg a" x="74" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${q}/>
    <ellipse cx="58" cy="58" rx="32" ry="17" fill="${n.body}" ${q}/>
    <ellipse cx="64" cy="66" rx="20" ry="7" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="46" cy="52" rx="12" ry="9" fill="#f4a259"/><ellipse cx="68" cy="50" rx="9" ry="7" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 43 q3 6 0 12 M56 42 q3 6 0 12 M68 43 q3 6 0 11" fill="none" ${q} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect class="leg a" x="44" y="64" width="9" height="30" rx="4.5" fill="${n.body}" ${q}/><rect class="leg b" x="84" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${q}/>
    ${e===2?'<ellipse cx="48.5" cy="92" rx="4" ry="2.5" fill="#fff"/><ellipse cx="88.5" cy="92" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(90,40,17,!1)}</svg>`}function Os(e,t="stand"){const n=ya[e]??ya[0],s=t==="sleep",o=e===2,i=e===1,a=e===3,r=e===4,l=o?66:58,c=o?70:62,d=94-c,g=o?102:92,f=o?50:40,h=(M,T)=>i?`<rect class="leg ${T}" x="${M+2}" y="${c}" width="6" height="${d}" rx="3" fill="${n.body}" ${q}/><circle class="leg ${T}" cx="${M+5}" cy="91" r="6" fill="${n.body}" ${q}/>`:`<rect class="leg ${T}" x="${M}" y="${c}" width="10" height="${d}" rx="5" fill="${n.body}" ${q}/>`,p=i?`<circle cx="44" cy="58" r="15" fill="${n.body}" ${q}/><circle cx="70" cy="56" r="17" fill="${n.body}" ${q}/><ellipse cx="57" cy="58" rx="22" ry="12" fill="${n.body}"/>`:`<ellipse cx="${o?62:58}" cy="${l}" rx="${o?42:32}" ry="${o?13:17}" fill="${n.body}" ${q}/>`,b=r?`<circle cx="46" cy="54" r="5" fill="${ve}"/><circle cx="64" cy="62" r="4" fill="${ve}"/><circle cx="72" cy="50" r="3.5" fill="${ve}"/><circle cx="38" cy="64" r="3" fill="${ve}"/>`:"",_=i?`<g class="tail"><path d="M30 52 L22 38" ${q}/><circle cx="21" cy="34" r="7" fill="${n.body}" ${q}/></g>`:a?`<path class="tail" d="M30 52 Q10 50 14 30 Q20 40 30 46" fill="${n.body}" ${q}/>`:`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${ve}" stroke-width="9" stroke-linecap="round"/>`,m=!i&&!a?`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`:"",u=`
    ${i?`<circle cx="${g-2}" cy="${f-16}" r="10" fill="${n.body}" ${q}/>`:""}
    <circle cx="${g}" cy="${f}" r="17" fill="${n.body}" ${q}/>
    ${r?`<circle cx="${g-6}" cy="${f-8}" r="4" fill="${ve}"/>`:""}
    <ellipse cx="${g+13}" cy="${f+7}" rx="11" ry="8" fill="${n.snout}" ${q}/>
    <circle cx="${g+22}" cy="${f+4}" r="4" fill="${ve}"/>
    <path d="M${g+14} ${f+12} q4 3 8 0" fill="none" ${q} stroke-width="2"/>
    ${s?"":`<path class="tongue" d="M${g+16} ${f+13} q2 7 6 0" fill="#ff8fab" ${q} stroke-width="2"/>`}
    ${s?`<path d="M${g+2} ${f-4} q3 3 6 0" fill="none" ${q} stroke-width="2.4"/>`:`<circle cx="${g+5}" cy="${f-3}" r="3" fill="${ve}"/><circle cx="${g+6}" cy="${f-4}" r="1" fill="#fff"/>`}
    ${ka(g+2,f+8)}
    ${i?`<circle cx="${g-9}" cy="${f+8}" r="9" fill="${n.ear}" ${q}/>`:`<ellipse class="ear" cx="${g-9}" cy="${f+4}" rx="7" ry="${a||o?14:12}" fill="${n.ear}" ${q} transform="rotate(12 ${g-9} ${f+4})"/>`}
    <path d="M${g-12} ${f+14} q10 6 20 2" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/><circle cx="${g-1}" cy="${f+19}" r="3" fill="#ffd166" ${q} stroke-width="1.5"/>`,k=i?`<g class="tail"><path d="M42 86 L28 80" ${q}/><circle cx="25" cy="78" r="7" fill="${n.body}" ${q}/></g>`:`<path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${ve}" stroke-width="9" stroke-linecap="round"/><path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`;return t==="sit"||t==="sleep"?`<svg viewBox="0 0 130 100" class="dogsvg ${s?"sleep":"sit"}">${k}
    <ellipse cx="60" cy="70" rx="22" ry="24" fill="${n.body}" ${q}/>${r?`<circle cx="54" cy="66" r="5" fill="${ve}"/><circle cx="64" cy="80" r="4" fill="${ve}"/>`:""}
    ${h(62,"a")}${h(74,"b")}<g transform="translate(-22 -2)">${u}</g></svg>`:`<svg viewBox="0 0 130 100" class="dogsvg stand">${_}${m}
    ${h(o?30:34,"b")}${h(o?82:72,"a")}
    ${p}${b}
    ${h(o?42:46,"a")}${h(o?94:84,"b")}
    ${u}</svg>`}const kc=e=>{let t=2166136261;for(const n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0},vn=(e,t)=>{let n=(e^Math.imul(t,2654435761))>>>0;return n^=n>>>15,n=Math.imul(n,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296},el=18,Ch={1:.35,2:.6};function Sh(e,t,n){return e-t*Ch[n]}function Bh(e,t){const s=Math.floor(t/1e3/2.8);return vn(kc(e||"pup"),s)<.62?"rest":"peek"}function Wh(e,t,n,s,o=!1){const i=kc(e.name+":"+e.coat+":"+e.room+":"+Math.round(e.x)+(n?":t"+Math.round(n.x):"")),a=t/1e3,r=Math.floor(a/el),l=a-r*el;if(!n){const m=ae=>Math.max(160,Math.min(2240,e.x+(vn(i,ae)-.5)*760)),u=m(r-1);let k=m(r);const M=vn(i+7,r),T=M<.45?"nap":M<.75?"sit":"groom",H=!!(s&&T==="nap"&&vn(i+13,r)<.72);H&&s&&(k=Math.max(160,Math.min(2240,s.x)));const U=Math.abs(k-u),F=Math.min(5,U/110);return l<F&&!o?{x:u+(k-u)*(l/F),mood:"walk",flip:k<u,perch:0,curl:0}:{x:k,mood:T,flip:k<u,perch:0,curl:H?1:0}}const c=Math.max(160,Math.min(2240,n.x)),d=vn(i+5,r)<.45?2:1,g=Math.max(160,Math.min(2240,c+(vn(i,r)-.5)*420)),f=Math.abs(c-g),h=Math.min(4.2,Math.max(.6,f/160)),p=c<g;if(l<h&&!o)return{x:g+(c-g)*(l/h),mood:"walk",flip:p,perch:0,curl:0};const b=vn(i+11,r),_=b<.34?"nap":b<.67?"sit":"play";return{x:c,mood:_,flip:p,perch:d,curl:0}}const jo="#5a3d5c",oe=`stroke="${jo}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,ms=[`<svg viewBox="0 0 48 48"><path d="M24 40 C16 32 6 26 10 16 C14 8 24 12 24 20 C24 12 34 8 38 16 C42 26 32 32 24 40 Z" fill="#ff6b9a" ${oe}/></svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd166" ${oe}/></svg>`,`<svg viewBox="0 0 48 48"><circle cx="24" cy="22" r="6" fill="#ff8fab" ${oe}/>${[0,60,120,180,240,300].map(e=>`<circle cx="${24+Math.cos(e*Math.PI/180)*12}" cy="${22+Math.sin(e*Math.PI/180)*12}" r="5" fill="#ffd166" ${oe}/>`).join("")}<path d="M24 34 V44" ${oe}/></svg>`,`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="10" fill="#ffb26b" ${oe}/><circle cx="34" cy="20" r="8" fill="#ffc46b" ${oe}/><path d="M28 14 L30 6 L36 14" fill="#ffb26b" ${oe}/><circle cx="32" cy="19" r="1.4" fill="${jo}"/><circle cx="37" cy="19" r="1.4" fill="${jo}"/></svg>`,`<svg viewBox="0 0 48 48">${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M8 ${30-t*4} Q24 ${10-t*3} 40 ${30-t*4}" fill="none" stroke="${e}" stroke-width="4"/>`).join("")}</svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l3 10 10 1 -8 6 3 10 -8 -5 -8 5 3 -10 -8 -6 10 -1z" fill="#fff3b0" ${oe}/><circle cx="12" cy="34" r="3" fill="#ff8fab" ${oe}/><circle cx="36" cy="36" r="2.4" fill="#bde0fe" ${oe}/></svg>`];function tl(e){const t=e?`<g class="flag"><path d="M30 16 V6" ${oe}/><path d="M30 6 H42 L38 11 L42 16 H30 Z" fill="#ff6b6b" ${oe}/></g>`:`<g class="flag"><path d="M18 28 H28" ${oe}/><path d="M18 22 H28 L25 25 L28 28 H18 Z" fill="#ffd166" ${oe}/></g>`;return`<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="68" rx="18" ry="3" fill="#000" opacity=".12"/>
    <rect x="30" y="40" width="5" height="26" rx="2" fill="#c99366" ${oe}/>
    <path d="M8 40 V22 Q8 8 32 8 Q56 8 56 22 V40 Z" fill="#8ecae6" ${oe}/>
    <path d="M8 28 H56" ${oe}/>
    <rect x="14" y="32" width="36" height="16" rx="4" fill="#fff6e6" ${oe}/>
    <circle cx="32" cy="40" r="3" fill="${jo}"/>
    ${t}
  </svg>`}function Th(e,t=[]){const n=vh(e,t);return n.ok?{ok:!0,text:n.text}:{ok:!1,msg:n.reason==="empty"?"Write a little note!":wi[n.reason]||"Oops, try different words!"}}const Ph={...wi,empty:"Write a little note!",slow:"Let's wait a moment!",full:"This mailbox is full!",notyours:"Only she can open her mail.",nohouse:"That house is not on the street.",gone:"That letter is already gone.",toobig:"The mailbox is too full!",presetsOnly:"Typing is turned off: pick a phrase!",unread:"She still has your letters! Wait until she reads them."};function Hh(e){return Ph[e]||"Let's try that again!"}function Uh(e){let t="",n="",s=!1,o="",i=0,a=0,r=-1,l="",c="";const d=()=>document.getElementById("mailCue");d()?.addEventListener("click",()=>{e.openOwn()});function g(){t="",n="",document.getElementById("mailSheet")?.remove()}function f(){let m=document.getElementById("mailSheet");return m||(m=document.createElement("div"),m.id="mailSheet",m.className="sheet mailSheet",m.innerHTML='<div class="card" id="mailCard"></div>',document.body.appendChild(m),m.addEventListener("click",u=>{const k=u.target;if(k===m||k.closest('[data-m="close"]')){g();return}p(k)}),m.addEventListener("input",u=>{const k=u.target;if(k.id!=="mailText")return;const M=document.getElementById("mailCount");M&&(M.textContent=`${k.value.length}/${Vt}`)})),m}function h(){if(!t)return;const m=f().querySelector("#mailText")?.value??"",u=e.mine(t),k=e.lettersOf(t),M=e.houseName(t),T=f().querySelector("#mailCard");if(n&&u&&!s){const U=k.find(F=>F.id===n);if(U&&U.text){b(U);return}n=""}if(s||!u){const U=e.freeType(),F=o?`Reply to ${e.houseName(o)||"your friend"}`:u?"Leave a letter":`Letter for ${M}`,ae=U?`<textarea id="mailText" class="mailBox" maxlength="${Vt}" placeholder="Hi! Come play!"></textarea>
        <div class="mailCount" id="mailCount">0/${Vt}</div>`:`<h3>Phrase</h3><div class="phrases mailPhrases">${Hs.map((O,fe)=>`<button type="button" data-phrase="${fe}" class="${fe===r?"on":""}">${Ce(O)}</button>`).join("")}</div>`;T.innerHTML=`<button class="close" data-m="close">✕</button><h2>${Ce(F)}</h2>
        <p class="hint">${U?"A short note. Your name goes on it for you.":"Pick a phrase. Your name goes on it for you."}</p>
        ${ae}
        <h3>Paper</h3><div class="mailRow">${Dt.map((O,fe)=>`<button class="swatch ${fe===i?"on":""}" data-color="${fe}" style="background:${O}" aria-label="Paper ${fe+1}"></button>`).join("")}</div>
        <h3>Sticker</h3><div class="mailRow">${ms.slice(0,ac).map((O,fe)=>`<button class="stick ${fe===a?"on":""}" data-sticker="${fe}" aria-label="Sticker ${fe+1}">${O}</button>`).join("")}</div>
        ${l?`<p class="mailErr" id="mailErr">${Ce(l)}</p>`:""}
        <button class="mailSend" id="mailSend" type="button">Send</button>
        ${u&&k.length?'<button class="mailRow" data-act="back" type="button" style="margin-top:8px">Back to my mail</button>':""}`;const se=f().querySelector("#mailText");if(se&&m){se.value=m;const O=document.getElementById("mailCount");O&&(O.textContent=`${m.length}/${Vt}`)}return}const H=k.length?k.slice().reverse().map(U=>U.text?`<button type="button" class="letter ${U.read?"":"fresh"}" data-letter="${Ce(U.id)}" style="background:${Dt[U.color]??Dt[0]}">
        <span class="sticker">${ms[U.sticker]??ms[0]}</span>
        <span class="who">${Ce(U.from)}</span><span class="when">${Ce(Oi(U.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${oe}/><path d="M4 8 L40 24 L76 8" fill="${Dt[U.color]??"#fff"}" ${oe}/></svg>
      </button>`:`<div class="letter" style="background:${Dt[U.color]??Dt[0]}"><span class="who">Your letter</span><span class="when">${Ce(Oi(U.at))}</span><span class="statusChip ${U.read?"read":""}">${U.read?"Read":"Delivered"}</span></div>`).join(""):'<p class="hint">No letters yet. Your flag pops up when one arrives!</p>';T.innerHTML=`<button class="close" data-m="close">✕</button><h2>${Ce(M)} mailbox</h2>${H}
      <div class="mailRow"><button type="button" data-act="write">Write a letter</button></div>
      ${l?`<p class="mailErr">${Ce(l)}</p>`:""}`}function p(m){const u=m.closest(".mailPhrases [data-phrase]");if(u){r=+u.dataset.phrase,l="",h();return}const k=m.closest("[data-color]");if(k){i=+k.dataset.color,h();return}const M=m.closest("[data-sticker]");if(M){a=+M.dataset.sticker,h();return}if(m.closest("#mailSend"))return _();const T=m.closest("[data-act]")?.dataset.act;if(T==="write"){s=!0,o="",n="",l="",h();return}if(T==="back"){s=!1,o="",n="",l="",h();return}if(T==="reply"){const se=e.houseOf(m.closest("[data-from]")?.dataset.from??"");if(!se){e.toast("They are not on the street anymore.");return}o=se,s=!0,n="",l="",t=se,h();return}if(T==="drop"){const se=m.closest("[data-id]")?.dataset.id??"";if(c!==se){c=se,e.toast("Tap again to throw it away");return}c="",e.drop(t,se);return}const H=m.closest("[data-letter]");if(!H)return;const U=H.dataset.letter,ae=e.lettersOf(t).find(se=>se.id===U);ae&&(!e.mine(t)||!ae.text||(ae.read||e.read(t,U),n=U,b(ae)))}function b(m){const u=Eh(m.text),k=f().querySelector("#mailCard");k.innerHTML=`<button class="close" data-m="close">✕</button>
      <div class="letter open read" style="background:${Dt[m.color]??Dt[0]}" data-id="${Ce(m.id)}" data-from="${Ce(m.fromPid)}">
        <span class="sticker">${ms[m.sticker]??ms[0]}</span>
        <span class="who">${Ce(m.from)}</span><span class="when">${Ce(Oi(m.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${oe}/><path class="flap" d="M4 8 L40 24 L76 8" fill="#fff" ${oe}/></svg>
        <p class="words">${Ce(u??"")}</p>
        <span class="mailRow"><button type="button" data-act="reply">Reply</button><button type="button" class="throw" data-act="drop">${c===m.id?"Tap again":"Throw away"}</button></span>
      </div>
      <button type="button" data-act="back">All my mail</button>
      ${l?`<p class="mailErr">${Ce(l)}</p>`:""}`}function _(){let m="";if(e.freeType()){const k=f().querySelector("#mailText")?.value??"",M=Th(k);if(!M.ok){l=M.msg,h();const T=f().querySelector("#mailText");T&&(T.value=k);return}m=M.text}else{if(r<0||r>=Hs.length){l="Pick a phrase!",h();return}m=Hs[r]}const u=o||t;l="",e.send(u,m,i,a),e.toast("On its way!"),e.mine(u)?(s=!1,o="",t=u,h()):g()}return{open(m,u,k,M){t=m,n="",s=!k,o="",l="",c="",i=0,a=0,r=-1,h()},fail(m){l=Hh(m),t?h():e.toast(l)},refresh(){t&&h()},syncCue(m){d()?.classList.toggle("show",m)}}}function Eh(e){if(!e)return null;const t=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return!t||t.length>Vt?null:t}function Ce(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const bc=()=>it("cozy-play");function Qh(){try{return localStorage.getItem(bc())==="play"?"play":"decorate"}catch{return"decorate"}}function Ah(e){try{localStorage.setItem(bc(),e)}catch{}}function Rh(e){return e==="kennel"?"kennel":e==="cat-tower"?"tower":e==="lamp"||/(^|:)lamp|starlamp|light/.test(e)?"lamp":e==="fridge"||e==="stove"||e==="vanity"||e==="bookshelf"||e==="window"||e==="mirror"||e==="tv"||/fridge|stove|cabinet|drawer|vanity/.test(e)?"open":e==="sofa"||e==="armchair"||e==="chair"||e==="stool"||e==="bed"||e==="crib"||/(sofa|armchair|chair|stool|bench)/.test(e)?"sit":"wiggle"}const zh='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M34 8 l1.2 3 3 .4 -2.2 2 .6 3 -2.6-1.6 -2.6 1.6 .6-3 -2.2-2 3-.4z" fill="#ffd166" stroke="#5a3d5c" stroke-width="1.4"/></svg>',Dh='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 36 h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M8 14 l2 1 M40 34 l2 2 M8 40 l3 -1" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>';function Ih(e,t){let n="decorate";const s=e.querySelector("#modePlay"),o=e.querySelector("#modeDecorate");s.querySelector(".modeIco").innerHTML=zh,o.querySelector(".modeIco").innerHTML=Dh;const i=()=>{const c=n==="play";document.body.classList.toggle("mode-play",c),s.classList.toggle("on",c),o.classList.toggle("on",!c),s.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-pressed",c?"false":"true")},a=(c,d)=>{n=c,d&&Ah(c),i(),t.onChange?.()};e.addEventListener("pointerdown",c=>c.stopPropagation()),e.addEventListener("click",c=>{const d=c.target.closest("[data-mode]");if(!d)return;const g=d.dataset.mode==="play"?"play":"decorate";a(g,t.ownHouse())}),i();let r=!1;return{mode:()=>n,isPlay:()=>n==="play",sync(c){a(c?Qh():"play",!1)},hint:()=>{if(r||!document.body.classList.contains("phone"))return;const c=it("cozy-mode-hint");try{if(localStorage.getItem(c)){r=!0;return}}catch{r=!0;return}r=!0;const d=document.createElement("p");d.className="modeHint",d.textContent="Play: tap things! Decorate: move things!",e.appendChild(d);let g=!1;const f=()=>{if(!g){g=!0,d.remove(),window.removeEventListener("pointerdown",f);try{localStorage.setItem(c,"1")}catch{}}};window.setTimeout(f,2800),d.addEventListener("click",f),window.addEventListener("pointerdown",f)}}}const ue="#5a3d5c",z=(e=4)=>`stroke="${ue}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,sr=600,rt=250,yn=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})">
  <rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${z()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${z()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${z()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${z()}/>
  <circle cx="-18" cy="-78" r="9" fill="#fff" opacity=".35"/></g>`,qh=(e,t,n)=>`<g transform="translate(${e} ${t})"><path d="M0 0 V-16" ${z(3)}/>${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*6}" cy="${-20+Math.sin(s*Math.PI/180)*6}" r="5" fill="${n}" ${z(2)}/>`).join("")}<circle cx="0" cy="-20" r="4" fill="#ffd166" ${z(2)}/></g>`,nl=e=>`<g transform="translate(${e} 0)">
  <rect x="-80" y="452" width="160" height="12" rx="6" fill="#ff9f68" ${z()}/><rect x="-80" y="470" width="160" height="12" rx="6" fill="#ff9f68" ${z()}/>
  <rect x="-70" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${z(3)}/><rect x="60" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${z(3)}/>
  <rect x="-86" y="490" width="172" height="14" rx="7" fill="#ffb385" ${z()}/></g>`;function Oh(){const e=nr,t=Array.from({length:Math.floor((Me.x1-Me.x0+40)/34)},(n,s)=>`<path d="M${Me.x0-20+s*34} 470 V428 l8 -10 l8 10 V470 Z" fill="#fff6e6" ${z(3)}/>`).join("");return`<svg class="parkScene" viewBox="0 0 ${e} ${sr}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient>
  <pattern id="pkCheck" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><rect width="15" height="15" fill="#ff8fab"/><rect x="15" y="15" width="15" height="15" fill="#ff8fab"/></pattern></defs>
  <rect width="${e}" height="440" fill="url(#pkSky)"/>
  ${[180,900,1600,2300].map((n,s)=>`<g transform="translate(${n} ${70+s%2*30})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <circle cx="${e-220}" cy="90" r="46" fill="#ffe066" ${z(4)}/>
  <path d="M-50 360 Q500 220 1100 340 T2300 330 T${e+100} 350 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#9fe0aa"/><path d="M0 410 H${e}" ${z(4)}/>
  <path d="M0 560 Q700 520 1400 565 T${e} 545 V600 H0 Z" fill="#f6e3c3" opacity=".9"/>
  ${yn(260,390,.9)}${yn(720,380,1.05,"#4fbf7a")}${yn(1230,385,.8)}${yn(1640,380,1,"#4fbf7a")}${yn(1990,388,.85)}${yn(2380,380,.95)}${yn(2860,390,.9,"#4fbf7a")}
  ${[[300,470,"#ff8fab"],[690,455,"#c9a0dc"],[1210,470,"#ffd166"],[1960,450,"#8ecae6"],[2390,470,"#ff8fab"],[1580,590,"#c9a0dc"],[140,585,"#ffd166"]].map(([n,s,o])=>qh(+n,+s,String(o))).join("")}
  <!-- gate back to the street -->
  <g><rect x="40" y="300" width="22" height="200" rx="6" fill="#c99366" ${z()}/><rect x="168" y="300" width="22" height="200" rx="6" fill="#c99366" ${z()}/>
    <path d="M30 312 Q115 240 200 312" fill="none" stroke="${ue}" stroke-width="16" stroke-linecap="round"/><path d="M30 312 Q115 240 200 312" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
    <rect x="62" y="252" width="106" height="36" rx="12" fill="#fff6e6" ${z(3)}/><text x="115" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="${ue}" font-family="Nunito, system-ui, sans-serif">PARK</text></g>
  <!-- swing set (seats are separate so they can swing) -->
  <g><path d="M350 ${rt} L310 500 M350 ${rt} L390 500 M650 ${rt} L610 500 M650 ${rt} L690 500" stroke="${ue}" stroke-width="14" stroke-linecap="round"/>
    <path d="M350 ${rt} L310 500 M350 ${rt} L390 500 M650 ${rt} L610 500 M650 ${rt} L690 500" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/>
    <rect x="330" y="${rt-10}" width="340" height="20" rx="10" fill="#ff8fab" ${z()}/></g>
  <!-- slide -->
  <g><path d="M${V.ladder-20} 560 V${V.top.y} M${V.ladder+30} 560 V${V.top.y}" stroke="${ue}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${V.ladder-20} 560 V${V.top.y} M${V.ladder+30} 560 V${V.top.y}" stroke="#c9a0dc" stroke-width="6" stroke-linecap="round"/>
    ${[380,420,460,500,540].map(n=>`<path d="M${V.ladder-20} ${n} H${V.ladder+30}" ${z(5)}/>`).join("")}
    <rect x="${V.ladder-30}" y="${V.top.y-14}" width="100" height="18" rx="8" fill="#ffd166" ${z()}/>
    <path d="M${V.ladder+60} ${V.top.y-10} C 1000 ${V.top.y} 1010 520 ${V.bottom.x+40} 548 L${V.bottom.x+40} 572 C 990 548 975 ${V.top.y+30} ${V.ladder+60} ${V.top.y+14} Z" fill="#ffd166" ${z()}/>
    <path d="M${V.ladder+70} ${V.top.y-2} C 990 ${V.top.y+8} 1000 525 ${V.bottom.x+30} 552" fill="none" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/></g>
  <!-- splash pond -->
  <g class="pondArt"><ellipse cx="1420" cy="515" rx="185" ry="52" fill="#8ecae6" ${z()}/><ellipse cx="1420" cy="510" rx="150" ry="36" fill="#b5e3f5"/>
    <ellipse cx="1340" cy="520" rx="24" ry="9" fill="#80ed99" ${z(3)}/><ellipse cx="1500" cy="505" rx="20" ry="8" fill="#80ed99" ${z(3)}/>
    <g transform="translate(1440 500)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ffd166" ${z(3)}/><circle cx="16" cy="-12" r="9" fill="#ffd166" ${z(3)}/><path d="M24 -12 l8 2 l-8 3 z" fill="#ff9f68" ${z(2)}/><circle cx="18" cy="-14" r="1.8" fill="${ue}"/></g></g>
  <!-- picnic blanket -->
  <g><path d="M1670 530 L1910 530 L1940 580 L1640 580 Z" fill="url(#pkCheck)" ${z()}/>
    <g transform="translate(1915 520)"><rect x="-26" y="-20" width="52" height="32" rx="8" fill="#e6b88a" ${z(3)}/><path d="M-18 -20 Q0 -46 18 -20" fill="none" ${z(4)}/><circle cx="-10" cy="-24" r="7" fill="#ff6b6b" ${z(2)}/></g></g>
  ${nl(2065)}${nl(2265)}
  <!-- dog area -->
  <g>${t}<path d="M${Me.x0-20} 440 H${Me.x1+20}" ${z(3)}/>
    <g transform="translate(${Me.x0+10} 380)"><rect x="-6" y="0" width="12" height="70" fill="#c99366" ${z(3)}/><rect x="-55" y="-34" width="110" height="38" rx="10" fill="#fff6e6" ${z(3)}/>
      <text x="0" y="-8" text-anchor="middle" font-size="20" font-weight="900" fill="${ue}" font-family="Nunito, system-ui, sans-serif">DOGS 🐾</text></g>
    <g transform="translate(${Me.x1-30} 470)"><path d="M-50 0 V-60 L0 -100 L50 -60 V0 Z" fill="#ff8fab" ${z()}/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="${ue}" stroke-width="14" stroke-linecap="round"/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="#c9a0dc" stroke-width="8" stroke-linecap="round"/><path d="M-20 0 V-30 a20 20 0 0 1 40 0 V0 Z" fill="#5a3d5c"/></g>
    <g transform="translate(${Me.x0+120} 500)"><rect x="-12" y="-30" width="24" height="34" rx="8" fill="#ff6b6b" ${z(3)}/><rect x="-18" y="-18" width="36" height="8" rx="4" fill="#ff6b6b" ${z(3)}/><circle cx="0" cy="-32" r="10" fill="#ff6b6b" ${z(3)}/></g></g>
  </svg>`}const Nh=`<svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M10 0 V222 M50 0 V222" stroke="${ue}" stroke-width="4"/><rect x="0" y="216" width="60" height="14" rx="6" fill="#ff9f68" ${z(3)}/></svg>`,jh=`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffd166" ${z(3)}/><path d="M6 16 Q20 24 34 16 M8 27 Q20 19 32 27" fill="none" stroke="#fff" stroke-width="3"/></svg>`,Fh=`<svg viewBox="0 0 48 48"><rect x="20" y="28" width="8" height="14" rx="3" fill="#c99366" stroke="${ue}" stroke-width="3"/><circle cx="24" cy="20" r="13" fill="#5cc985" stroke="${ue}" stroke-width="3"/><circle cx="19" cy="16" r="3" fill="#fff" opacity=".5"/></svg>`,vc=`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8" fill="#ff8fab" stroke="${ue}" stroke-width="3"/><circle cx="13" cy="20" r="4.5" fill="#ff8fab" stroke="${ue}" stroke-width="3"/><circle cx="20" cy="13" r="4.5" fill="#ff8fab" stroke="${ue}" stroke-width="3"/><circle cx="28" cy="13" r="4.5" fill="#ff8fab" stroke="${ue}" stroke-width="3"/><circle cx="35" cy="20" r="4.5" fill="#ff8fab" stroke="${ue}" stroke-width="3"/></svg>`,Zh=`<svg viewBox="0 0 48 48"><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="${ue}" stroke-width="4" stroke-linecap="round"/><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="#ff9f68" stroke-width="2"/><path d="M16 40 V26 M24 40 V22 M32 40 V26" stroke="${ue}" stroke-width="3" stroke-linecap="round"/></svg>`,X="#5a3d5c",de=`stroke="${X}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,ho=[{body:"#ffd6e0",roof:"#ff7aa8",door:"#8fd3ff",trim:"#fff6e6"},{body:"#d9f2ff",roof:"#5aa9e6",door:"#ffd166",trim:"#ffffff"},{body:"#e3f9d9",roof:"#5cc985",door:"#ff9f68",trim:"#fffbe6"},{body:"#fff1b8",roof:"#ff9f43",door:"#c9a0dc",trim:"#ffffff"},{body:"#eadcff",roof:"#9b7bd8",door:"#80ed99",trim:"#fff6fb"},{body:"#ffe0c7",roof:"#e07a5f",door:"#5fb0d8",trim:"#fffaf0"},{body:"#d8f5ef",roof:"#2fb3a3",door:"#ff8fab",trim:"#ffffff"},{body:"#fde2f3",roof:"#e879c6",door:"#ffd166",trim:"#fff"}];function Fo(e,t={}){const n=ho[(e%ho.length+ho.length)%ho.length],s=e%2===1,o=t.lit?"#fff3b0":"#cfe8ff",i=s?`<path d="M22 138 Q22 36 160 30 Q298 36 298 138 Z" fill="${n.roof}" ${de}/><path d="M60 110 Q70 60 120 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`:`<path d="M14 140 L160 26 L306 140 Z" fill="${n.roof}" ${de}/><path d="M70 110 L140 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`;return`<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="294" rx="150" ry="8" fill="#000" opacity=".12"/>
  <rect x="${s?232:220}" y="${s?36:44}" width="30" height="56" rx="6" fill="${n.trim}" ${de}/>
  <rect x="44" y="124" width="232" height="168" rx="20" fill="${n.body}" ${de}/>
  ${i}
  <g class="houseWin" fill="${o}"><circle cx="160" cy="${s?92:98}" r="18" ${de}/><rect x="62" y="160" width="62" height="58" rx="18" ${de}/><rect x="196" y="160" width="62" height="58" rx="18" ${de}/></g>
  <path d="M160 ${s?74:80} V${s?110:116} M142 ${s?92:98} H178" ${de}/>
  <path d="M93 160 V218 M62 189 H124" ${de}/><path d="M227 160 V218 M196 189 H258" ${de}/>
  <rect x="56" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${de}/><rect x="190" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${de}/>
  <circle cx="72" cy="212" r="7" fill="#ff8fab" ${de}/><circle cx="92" cy="208" r="7" fill="#ffd166" ${de}/><circle cx="112" cy="212" r="7" fill="#ff8fab" ${de}/>
  <circle cx="208" cy="212" r="7" fill="#c9a0dc" ${de}/><circle cx="228" cy="208" r="7" fill="#80ed99" ${de}/><circle cx="248" cy="212" r="7" fill="#c9a0dc" ${de}/>
  <path d="M132 292 V226 Q132 196 160 196 Q188 196 188 226 V292 Z" fill="${n.door}" ${de}/>
  <circle cx="176" cy="250" r="5" fill="${X}"/><path d="M146 222 Q160 212 174 222" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>
  <rect x="118" y="286" width="84" height="10" rx="5" fill="${n.trim}" ${de}/>
</svg>`}const Fe={street:`<svg viewBox="0 0 48 48"><circle cx="16" cy="15" r="7" fill="#ffd166" stroke="${X}" stroke-width="3"/><circle cx="32" cy="15" r="7" fill="#ff8fab" stroke="${X}" stroke-width="3"/><circle cx="13.5" cy="14.5" r="1.2" fill="${X}"/><circle cx="18.5" cy="14.5" r="1.2" fill="${X}"/><circle cx="29.5" cy="14.5" r="1.2" fill="${X}"/><circle cx="34.5" cy="14.5" r="1.2" fill="${X}"/><path d="M13 18 q3 2.2 6 0 M29 18 q3 2.2 6 0" fill="none" stroke="${X}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 40 Q16 28 24 33 Q32 38 40 28" fill="none" stroke="#5cc985" stroke-width="4" stroke-linecap="round"/><circle cx="16" cy="36" r="2.2" fill="#fff" stroke="${X}" stroke-width="1.5"/><circle cx="32" cy="32" r="2.2" fill="#fff" stroke="${X}" stroke-width="1.5"/></svg>`,home:`<svg viewBox="0 0 48 48"><path d="M8 22 L24 8 L40 22 V40 H8 Z" fill="#ffd166" stroke="${X}" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 V28 H28 V40" fill="#fff" stroke="${X}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="20" r="2.4" fill="${X}"/></svg>`,lockOn:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q33 7 33 16 V22" fill="none" stroke="${X}" stroke-width="4"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#ffd166" stroke="${X}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${X}"/></svg>`,lockOff:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q31 7 32.5 13" fill="none" stroke="${X}" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#b6f0a8" stroke="${X}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${X}"/></svg>`,chat:`<svg viewBox="0 0 48 48"><path d="M8 12 Q8 6 14 6 H34 Q40 6 40 12 V26 Q40 32 34 32 H22 L13 40 V32 Q8 32 8 26 Z" fill="#fff3b0" stroke="${X}" stroke-width="3" stroke-linejoin="round"/><circle cx="17" cy="19" r="2.5" fill="${X}"/><circle cx="24" cy="19" r="2.5" fill="${X}"/><circle cx="31" cy="19" r="2.5" fill="${X}"/></svg>`,shield:`<svg viewBox="0 0 48 48"><path d="M24 5 L39 11 V23 Q39 36 24 43 Q9 36 9 23 V11 Z" fill="#c9a0dc" stroke="${X}" stroke-width="3" stroke-linejoin="round"/><path d="M17 24 L22 29 L31 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,solo:`<svg viewBox="0 0 48 48"><path d="M8 24 L24 9 L40 24 V41 H8 Z" fill="#ffd166" stroke="${X}" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="28" width="10" height="13" rx="4" fill="#fff" stroke="${X}" stroke-width="2.5"/><path d="M33 7 l2 4 4 .5 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.5z" fill="#ff8fab" stroke="${X}" stroke-width="1.5"/></svg>`};function Q(e,t=2600){const n=document.createElement("div");n.className="toast",n.textContent=e,(document.getElementById("toastLane")??document.body).appendChild(n),setTimeout(()=>n.classList.add("out"),t),setTimeout(()=>n.remove(),t+400)}function wc(){return new Promise(e=>{let t=0,n=0,s="",o=0;const i=document.createElement("div");i.className="sheet adult",i.innerHTML='<div class="card adultCard"></div>',document.body.appendChild(i);const a=i.firstElementChild,r=()=>{t=6+Math.floor(Math.random()*4),n=3+Math.floor(Math.random()*7),s="",l()},l=()=>{a.innerHTML=`<button class="close" data-k="x">✕</button><h2>Grown-ups only</h2><p class="q" data-q="${t*n}">What is ${t} × ${n}?</p>
        <div class="ans">${s||"&nbsp;"}</div>
        <div class="pad">${[1,2,3,4,5,6,7,8,9,"⌫",0,"OK"].map(d=>`<button data-k="${d}">${d}</button>`).join("")}</div>`},c=d=>{i.remove(),e(d)};a.addEventListener("click",d=>{const g=d.target.closest("[data-k]")?.dataset.k;if(g){if(g==="x")return c(!1);if(g==="⌫")s=s.slice(0,-1);else if(g==="OK"){if(+s===t*n)return c(!0);if(++o>=3)return c(!1);a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400),r();return}else s.length<3&&(s+=g);l()}}),i.addEventListener("click",d=>{d.target===i&&c(!1)}),r()})}const Qe="#5a3d5c",Y=`stroke="${Qe}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,ji=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${Qe}"/><circle cx="${t}" cy="${n}" r="3" fill="${Qe}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,Fi=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,po='<ellipse cx="50" cy="97" rx="34" ry="3" fill="#000" opacity=".12"/>',Vh=`<svg viewBox="0 0 40 30"><path d="M4 30 V16 Q4 2 20 2 Q36 2 36 16 V30 Z" fill="#3b2a3d" ${Y}/><circle cx="14" cy="18" r="1.6" fill="#fff" opacity=".8"/><circle cx="22" cy="18" r="1.6" fill="#fff" opacity=".8"/></svg>`,Gh=`<svg viewBox="0 0 48 30"><path d="M4 27 Q10 22 22 23 L42 23 Q46 27 42 28 H6 Z" fill="#cdeccf" ${Y}/><circle cx="26" cy="15" r="11" fill="#ffb3c6" ${Y}/><path d="M26 15 m-5 0 a5 5 0 1 1 5 5" fill="none" ${Y}/><path d="M8 23 L5 13 M12 23 L12 13" ${Y}/></svg>`,Kh=`<svg viewBox="0 0 30 30"><path d="M15 2 l3.6 8 8.4 1 -6.3 5.8 1.8 8.4 -7.5 -4.4 -7.5 4.4 1.8 -8.4 L3 11 l8.4 -1z" fill="#fff3b0" ${Y}/></svg>`,Yh=`<svg viewBox="0 0 30 22"><ellipse cx="15" cy="13" rx="13" ry="8" fill="#e6b88a" ${Y}/><circle cx="10" cy="11" r="1.8" fill="${Qe}"/><circle cx="18" cy="14" r="1.8" fill="${Qe}"/><circle cx="16" cy="9" r="1.5" fill="${Qe}"/></svg>`,Xh=`<svg viewBox="0 0 30 28"><path d="M15 26 C3 18 1 10 6 5 C10 1 14 4 15 7 C16 4 20 1 24 5 C29 10 27 18 15 26 Z" fill="#ffc8dd" ${Y}/></svg>`,Zo=[{name:"Cada",room:"living",x:150,y:382,w:40,h:30,taps:3,spot:Vh,hello:"Squeak! Hi Cada!",item:{kind:"egg:cada-mouse",name:"Cada's Mouse",cat:"secrets",w:80,holdable:!0,svg:`${po}<path d="M78 74 Q96 68 92 52" stroke="#ff9bb5" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="28" ry="18" fill="#d6d6e8" ${Y}/><circle cx="28" cy="40" r="13" fill="#d6d6e8" ${Y}/><circle cx="62" cy="38" r="13" fill="#d6d6e8" ${Y}/><circle cx="28" cy="40" r="7" fill="#ffc8dd"/><circle cx="62" cy="38" r="7" fill="#ffc8dd"/><circle cx="45" cy="56" r="20" fill="#e4e4f2" ${Y}/>${ji(38,52,54)}<circle cx="45" cy="64" r="3" fill="#ff8fab"/>${Fi(32,58,62)}<text x="50" y="96" font-size="11" font-weight="900" text-anchor="middle" fill="${Qe}">C</text>`}},{name:"Sloane",room:"living",x:2290,y:383,w:48,h:30,taps:3,spot:Gh,hello:"Hi Sloane! ✨",item:{kind:"egg:sloane-snail",name:"Sloane's Rainbow Snail",cat:"secrets",w:110,holdable:!0,svg:`${po}<path d="M6 92 Q14 80 36 82 L84 82 Q94 90 84 94 H10 Z" fill="#cdeccf" ${Y}/><circle cx="56" cy="52" r="32" fill="#ff8fab" ${Y}/><circle cx="56" cy="52" r="24" fill="#ffd166"/><circle cx="56" cy="52" r="17" fill="#80ed99"/><circle cx="56" cy="52" r="10" fill="#8ecae6"/><circle cx="56" cy="52" r="4" fill="#c9a0dc"/><circle cx="56" cy="52" r="32" fill="none" ${Y}/><path d="M14 82 L8 60 M24 82 L24 60" ${Y}/><circle cx="8" cy="58" r="4" fill="${Qe}"/><circle cx="24" cy="58" r="4" fill="${Qe}"/>${Fi(14,30,76)}`}},{name:"Chloe",room:"bedroom",x:2230,y:92,w:30,h:30,taps:5,spot:Kh,item:{kind:"egg:chloe-starlamp",name:"Chloe's Star Lamp",cat:"secrets",w:100,holdable:!0,svg:`${po}<circle cx="50" cy="38" r="34" fill="#fff3b0" opacity=".6"/><path d="M50 6 l8 17 19 2.5 -14 13 4 19 -17 -9.5 -17 9.5 4 -19 -14 -13 19 -2.5z" fill="#ffd166" ${Y}/>${ji(43,57,38)}<path d="M45 46 q5 4 10 0" ${Y} fill="none"/><rect x="46" y="66" width="8" height="22" rx="4" fill="#c9a0dc" ${Y}/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#b388d6" ${Y}/><text x="50" y="93" font-size="8" font-weight="900" text-anchor="middle" fill="#fff">CHLOE</text>`}},{name:"Quinn",room:"kitchen",x:80,y:588,w:30,h:22,taps:4,spot:Yh,hello:"Woof! Hi Quinn!",item:{kind:"egg:quinn-pup",name:"Quinn's Cookie Pup",cat:"secrets",w:110,holdable:!0,svg:`${po}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#e6b88a" ${Y}/><circle cx="50" cy="44" r="27" fill="#f2d0a4" ${Y}/><ellipse cx="24" cy="46" rx="10" ry="17" fill="#b07d54" ${Y}/><ellipse cx="76" cy="46" rx="10" ry="17" fill="#b07d54" ${Y}/>${ji(41,59,42)}<ellipse cx="50" cy="53" rx="5" ry="4" fill="${Qe}"/>${Fi(34,66,54)}<circle cx="84" cy="80" r="10" fill="#e6b88a" ${Y}/><circle cx="81" cy="78" r="1.8" fill="${Qe}"/><circle cx="87" cy="82" r="1.8" fill="${Qe}"/><text x="50" y="30" font-size="10" font-weight="900" text-anchor="middle" fill="${Qe}">Q</text>`}},{name:"Reagan",room:"salon",x:2300,y:352,w:30,h:28,taps:5,spot:Xh,item:{kind:"egg:reagan-frame",name:"Reagan's Frame",cat:"secrets",w:120,wall:!0,svg:`<rect x="8" y="10" width="84" height="84" rx="16" fill="#ff8fab" ${Y}/><rect x="18" y="20" width="64" height="64" rx="10" fill="#fff3f7" ${Y}/><text x="50" y="72" font-size="52" font-weight="900" text-anchor="middle" fill="#e879c6" stroke="${Qe}" stroke-width="2.5">R</text><circle cx="14" cy="16" r="6" fill="#ffd166" ${Y}/><circle cx="86" cy="88" r="6" fill="#ffd166" ${Y}/><path d="M76 24 l2 4 4 .5 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.5z" fill="#ffd166"/>`}}],Jh=Zo.map(e=>({...e.item,rooms:["any"],secret:e.name})),$c=it("cozy-secrets"),_i=()=>{try{return new Set(JSON.parse(localStorage.getItem($c)??"[]"))}catch{return new Set}},ep=e=>localStorage.setItem($c,JSON.stringify([...e]));function tp(e){const t=document.createElement("div");t.className="eggs",e.world.appendChild(t);const n=new Map;for(const o of Zo){const i=document.createElement("div");i.className="eggspot",i.dataset.egg=o.name,i.style.left=(o.x-o.w/2)/e.roomW*100+"%",i.style.top=(o.y-o.h)/e.roomH*100+"%",i.style.width=o.w/e.roomW*100+"%",i.style.height=o.h/e.roomH*100+"%",i.innerHTML=o.spot,t.appendChild(i),i.addEventListener("pointerdown",a=>a.stopPropagation()),i.addEventListener("click",a=>{a.stopPropagation();const r=Date.now(),l=n.get(o.name)??{n:0,t:0};if(l.n=r-l.t<1500?l.n+1:1,l.t=r,n.set(o.name,l),i.classList.remove("poke"),i.offsetWidth,i.classList.add("poke"),e.tap(),l.n<o.taps)return;l.n=0;const c=_i(),d=!c.has(o.name);c.add(o.name),ep(c),np(o,i),e.sparkle(),e.onFound(o.name,d)})}const s=()=>{const o=e.currentRoom();t.querySelectorAll(".eggspot").forEach(i=>{i.style.display=Zo.find(a=>a.name===i.dataset.egg).room===o?"":"none"})};return s(),{update:s}}function np(e,t){if(e.hello){const s=document.createElement("div");s.className="eggpop",s.innerHTML=`<div class="eggcritter"><svg viewBox="0 0 100 100">${e.item.svg}</svg></div><div class="bubble">${e.hello}</div>`,t.appendChild(s),setTimeout(()=>s.remove(),3200)}const n=document.createElement("div");n.className="eggbanner",n.innerHTML=`<span class="sp">✨</span><span class="nm">${[...e.name].map((s,o)=>`<i style="animation-delay:${o*70}ms">${s}</i>`).join("")}</span><span class="sp">✨</span>`,document.body.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3100),xc()}function xc(e=70){const t=["#ff8fab","#ffd166","#8ecae6","#80ed99","#c9a0dc","#ff9f68"],n=document.createElement("div");n.className="confetti",document.body.appendChild(n);for(let s=0;s<e;s++){const o=document.createElement("i");o.style.left=Math.random()*100+"vw",o.style.background=t[s%t.length],o.style.animationDelay=Math.random()*.5+"s",o.style.animationDuration=1.6+Math.random()*1.2+"s",o.style.setProperty("--r",Math.random()*720-360+"deg"),o.style.setProperty("--dx",Math.random()*160-80+"px"),s%3===0&&(o.style.borderRadius="50%"),n.appendChild(o)}setTimeout(()=>n.remove(),3600)}const sp=`[
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
`,op=`[
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
]`,ip="/kids-house-game/assets/alarm-clock-DOVobLzL.png",ap="/kids-house-game/assets/alarm-clock-BCd1-e86.svg",rp="/kids-house-game/assets/bedtime-snack-COvX4Nqo.png",lp="/kids-house-game/assets/bedtime-snack-BoNDQqOK.svg",cp="/kids-house-game/assets/book-stack-BlyqbTA1.png",dp="/kids-house-game/assets/book-stack-upnp1NwG.svg",gp="/kids-house-game/assets/bunk-bed-COiQly1s.png",fp="/kids-house-game/assets/bunk-bed-YZiRWNFR.svg",hp="/kids-house-game/assets/bunny-slippers-DajXa_JK.png",pp="/kids-house-game/assets/bunny-slippers-PNucIc_Q.svg",up="/kids-house-game/assets/canopy-bed-Db9GIfyT.png",mp="/kids-house-game/assets/canopy-bed-BwWkRhe2.svg",yp="/kids-house-game/assets/cat-bed-ChP4s69B.png",kp="/kids-house-game/assets/cat-bed-B8ULFbHc.svg",bp="/kids-house-game/assets/cloud-rug-Bv3GScgR.png",vp="/kids-house-game/assets/cloud-rug-CFl6aZc5.svg",wp="/kids-house-game/assets/cloud-shelf-BAmU3DSp.png",$p="/kids-house-game/assets/cloud-shelf-DF5b_IoZ.svg",xp="/kids-house-game/assets/cork-board-B8yw-MFd.png",_p="/kids-house-game/assets/cork-board-Bj5OuLbv.svg",Mp="/kids-house-game/assets/daisy-pot-BQDVlAug.png",Lp="/kids-house-game/assets/daisy-pot-Cy8SrSS6.svg",Cp="/kids-house-game/assets/desk-UTaBcI2Q.png",Sp="/kids-house-game/assets/desk-2rRtV3Vk.svg",Bp="/kids-house-game/assets/dino-plush-yhz7rVZD.png",Wp="/kids-house-game/assets/dino-plush-Dq_qccf0.svg",Tp="/kids-house-game/assets/doll-house-DfYMaHqJ.png",Pp="/kids-house-game/assets/doll-house-BrC3RiST.svg",Hp="/kids-house-game/assets/dresser-jJcAkDG_.png",Up="/kids-house-game/assets/dresser-__9TGuYc.svg",Ep="/kids-house-game/assets/egg-chair-DobnnZdC.png",Qp="/kids-house-game/assets/egg-chair-CtiaqWNQ.svg",Ap="/kids-house-game/assets/floor-fan-C2R5oDHp.png",Rp="/kids-house-game/assets/floor-fan-Dt9SIAmB.svg",zp="/kids-house-game/assets/guinea-pig-BzHyXlGo.png",Dp="/kids-house-game/assets/guinea-pig-CwLeNU_S.svg",Ip="/kids-house-game/assets/hamster-cage-zv59jo6b.png",qp="/kids-house-game/assets/hamster-cage-lQ6r7saV.svg",Op="/kids-house-game/assets/heart-rug-DYGPCKpT.png",Np="/kids-house-game/assets/heart-rug-CBDvH6Q6.svg",jp="/kids-house-game/assets/lava-lamp-Df-lJpLx.png",Fp="/kids-house-game/assets/lava-lamp-DEuHvlco.svg",Zp="/kids-house-game/assets/moon-night-light-JPI5SkUV.png",Vp="/kids-house-game/assets/moon-night-light-CAKsjYZv.svg",Gp="/kids-house-game/assets/nightstand-D3WOPlqw.png",Kp="/kids-house-game/assets/nightstand-Bgsh0YUi.svg",Yp="/kids-house-game/assets/paper-lantern-mpw1jXzL.png",Xp="/kids-house-game/assets/paper-lantern-CErOGyrT.svg",Jp="/kids-house-game/assets/piggy-bank-DaSktUUA.png",e0="/kids-house-game/assets/piggy-bank-DsHrmOcp.svg",t0="/kids-house-game/assets/plant-stand-BpU338ra.png",n0="/kids-house-game/assets/plant-stand-DDyIDaL0.svg",s0="/kids-house-game/assets/play-tent-ih6xOGXC.png",o0="/kids-house-game/assets/play-tent-Bsawe52j.svg",i0="/kids-house-game/assets/star-mobile-Bqyd_ikl.png",a0="/kids-house-game/assets/star-mobile-DzOGs-Jo.svg",r0="/kids-house-game/assets/toy-chest-DhEoVFj0.png",l0="/kids-house-game/assets/toy-chest-6iPrDiZH.svg",c0="/kids-house-game/assets/toy-robot-Bfkjfj_6.png",d0="/kids-house-game/assets/toy-robot-OaCEwmDT.svg",g0="/kids-house-game/assets/toy-train-DILjZiya.png",f0="/kids-house-game/assets/toy-train-D5GqAnpy.svg",h0="/kids-house-game/assets/unicorn-plush-5YQqQjND.png",p0="/kids-house-game/assets/unicorn-plush-C0W1eEs9.svg",u0="/kids-house-game/assets/wardrobe-sJcJSWZ2.png",m0="/kids-house-game/assets/wardrobe-Dn492IK0.svg",y0="/kids-house-game/assets/bananas-D4irRkGy.png",k0="/kids-house-game/assets/bananas-aPQwdEVo.svg",b0="/kids-house-game/assets/bar-stool-xbwaa01H.png",v0="/kids-house-game/assets/bar-stool-DWxhX1Ah.svg",w0="/kids-house-game/assets/bread-loaf-DKmR5wPN.png",$0="/kids-house-game/assets/bread-loaf-C9cEAYcl.svg",x0="/kids-house-game/assets/chick-DCnoMwEt.png",_0="/kids-house-game/assets/chick-BTEVfgqU.svg",M0="/kids-house-game/assets/china-hutch-K3xtlmqi.png",L0="/kids-house-game/assets/china-hutch-BTmMY6rg.svg",C0="/kids-house-game/assets/cocoa-mug-BmqSzNJ6.png",S0="/kids-house-game/assets/cocoa-mug-CraNCc9b.svg",B0="/kids-house-game/assets/cookie-jar-CZsO9PSp.png",W0="/kids-house-game/assets/cookie-jar-ripj0oyT.svg",T0="/kids-house-game/assets/cooking-pot-BSKPlqyT.png",P0="/kids-house-game/assets/cooking-pot-BWtfOm9f.svg",H0="/kids-house-game/assets/cupcake-KO1KLKav.png",U0="/kids-house-game/assets/cupcake-DFCw42xb.svg",E0="/kids-house-game/assets/dish-rack-DICSEn5E.png",Q0="/kids-house-game/assets/dish-rack-BpVmmU6k.svg",A0="/kids-house-game/assets/fruit-bowl-BL5EkaC8.png",R0="/kids-house-game/assets/fruit-bowl-Dw9lsB3B.svg",z0="/kids-house-game/assets/frying-pan-BocrLcES.png",D0="/kids-house-game/assets/frying-pan-CTBY6MC_.svg",I0="/kids-house-game/assets/happy-fridge-BTbpm-W1.png",q0="/kids-house-game/assets/happy-fridge-D7ENuEJs.svg",O0="/kids-house-game/assets/herb-box-DFtC2qBN.png",N0="/kids-house-game/assets/herb-box-CdRxefnV.svg",j0="/kids-house-game/assets/high-chair-DZCqRJV8.png",F0="/kids-house-game/assets/high-chair-BQtLYlq4.svg",Z0="/kids-house-game/assets/ice-cream-CLLMXjn9.png",V0="/kids-house-game/assets/ice-cream-DydSyNXx.svg",G0="/kids-house-game/assets/kettle-DScYOeEK.png",K0="/kids-house-game/assets/kettle-D1nuAiG_.svg",Y0="/kids-house-game/assets/kitchen-counter-cZcDRQIw.png",X0="/kids-house-game/assets/kitchen-counter-C8sTAZ-V.svg",J0="/kids-house-game/assets/kitchen-sink-DrP43iga.png",eu="/kids-house-game/assets/kitchen-sink-CYjDcd1n.svg",tu="/kids-house-game/assets/lemon-tree-BwA7W0cM.png",nu="/kids-house-game/assets/lemon-tree-CZz-Vy3P.svg",su="/kids-house-game/assets/microwave-BJRDd-L-.png",ou="/kids-house-game/assets/microwave-lopm-FCT.svg",iu="/kids-house-game/assets/milk-bottle-D7UB6VD8.png",au="/kids-house-game/assets/milk-bottle-DxcUA6XT.svg",ru="/kids-house-game/assets/pancakes-CbisCK-C.png",lu="/kids-house-game/assets/pancakes-CLqxnc5R.svg",cu="/kids-house-game/assets/pantry-shelf-DI_CgvVD.png",du="/kids-house-game/assets/pantry-shelf-Azdxpmzd.svg",gu="/kids-house-game/assets/pendant-lamp-BhZanag5.png",fu="/kids-house-game/assets/pendant-lamp-fZv6y1p0.svg",hu="/kids-house-game/assets/pet-bowl-Oe3KGELz.png",pu="/kids-house-game/assets/pet-bowl-ETL_EOAP.svg",uu="/kids-house-game/assets/rice-cooker-DUTXsBbb.png",mu="/kids-house-game/assets/rice-cooker-JX0L4bi2.svg",yu="/kids-house-game/assets/runner-rug-AYIsQudU.png",ku="/kids-house-game/assets/runner-rug-BbUgZFy4.svg",bu="/kids-house-game/assets/spice-rack-8ll-6Q2f.png",vu="/kids-house-game/assets/spice-rack-D9kAw-vT.svg",wu="/kids-house-game/assets/stand-mixer-CP2fpC-Q.png",$u="/kids-house-game/assets/stand-mixer-CZrLn00l.svg",xu="/kids-house-game/assets/teapot-iFnJNGiA.png",_u="/kids-house-game/assets/teapot-CtPOJzEm.svg",Mu="/kids-house-game/assets/toaster-T2WkZkdo.png",Lu="/kids-house-game/assets/toaster-CNk0hJDw.svg",Cu="/kids-house-game/assets/utensil-rail-_vjcgBpy.png",Su="/kids-house-game/assets/utensil-rail-B0QkGP3A.svg",Bu="/kids-house-game/assets/watermelon-slice-yHBcfKGj.png",Wu="/kids-house-game/assets/watermelon-slice-VzvgalD5.svg",Tu="/kids-house-game/assets/aquarium-rYRAu69m.png",Pu="/kids-house-game/assets/aquarium-BlhJ9UCr.svg",Hu="/kids-house-game/assets/arc-floor-lamp-CBq3G9j8.png",Uu="/kids-house-game/assets/arc-floor-lamp-DL5cEVzq.svg",Eu="/kids-house-game/assets/bean-bag-CMLYRsbz.png",Qu="/kids-house-game/assets/bean-bag-CauyDuZQ.svg",Au="/kids-house-game/assets/bird-cage-qj5P0te2.png",Ru="/kids-house-game/assets/bird-cage-xqeVahX7.svg",zu="/kids-house-game/assets/blanket-basket-5IQiUSS2.png",Du="/kids-house-game/assets/blanket-basket-B4LREUo9.svg",Iu="/kids-house-game/assets/building-blocks-CzqAFUNB.png",qu="/kids-house-game/assets/building-blocks-DbtoodPT.svg",Ou="/kids-house-game/assets/coffee-table-iKZ20Gpy.png",Nu="/kids-house-game/assets/coffee-table-ZYO2ApH6.svg",ju="/kids-house-game/assets/comfy-armchair-U_SI3sk9.png",Fu="/kids-house-game/assets/comfy-armchair-tjNYbfgO.svg",Zu="/kids-house-game/assets/cubby-shelf-B0De91CO.png",Vu="/kids-house-game/assets/cubby-shelf-CLzTUpiz.svg",Gu="/kids-house-game/assets/daisy-rug-BqSOjPlJ.png",Ku="/kids-house-game/assets/daisy-rug-CvOlxjsu.svg",Yu="/kids-house-game/assets/fiddle-leaf-fig-DnvG8l2j.png",Xu="/kids-house-game/assets/fiddle-leaf-fig-DiUNW4Q_.svg",Ju="/kids-house-game/assets/fireplace-C9azNipx.png",em="/kids-house-game/assets/fireplace-CqxIMN3Z.svg",tm="/kids-house-game/assets/globe-C-L7vS0t.png",nm="/kids-house-game/assets/globe-DN0sih3W.svg",sm="/kids-house-game/assets/hanging-planter-DGgUXZpP.png",om="/kids-house-game/assets/hanging-planter-M9IHqztp.svg",im="/kids-house-game/assets/monstera-plant-BbGZQtOh.png",am="/kids-house-game/assets/monstera-plant-CLmuB_RM.svg",rm="/kids-house-game/assets/piano-DpS7nvdq.png",lm="/kids-house-game/assets/piano-Y0KQ4rD2.svg",cm="/kids-house-game/assets/popcorn-CFk12JbR.png",dm="/kids-house-game/assets/popcorn-BD2d8sUH.svg",gm="/kids-house-game/assets/pouf-DY0Vcx75.png",fm="/kids-house-game/assets/pouf-as0li8On.svg",hm="/kids-house-game/assets/rainbow-rug-DwzLb6aY.png",pm="/kids-house-game/assets/rainbow-rug-C5ZVauOA.svg",um="/kids-house-game/assets/rainbow-wall-art--5LLrrQJ.png",mm="/kids-house-game/assets/rainbow-wall-art-CCXUPPen.svg",ym="/kids-house-game/assets/retro-radio-BIX4GYkL.png",km="/kids-house-game/assets/retro-radio-B3T98xMQ.svg",bm="/kids-house-game/assets/rocking-chair-CDLlJFiP.png",vm="/kids-house-game/assets/rocking-chair-BgoIQu5H.svg",wm="/kids-house-game/assets/rocking-horse-Iz-CpscK.png",$m="/kids-house-game/assets/rocking-horse-1WLLV43R.svg",xm="/kids-house-game/assets/snake-plant-DgPna4k9.png",_m="/kids-house-game/assets/snake-plant-BGDwPcMj.svg",Mm="/kids-house-game/assets/string-lights-nDUZa5m1.png",Lm="/kids-house-game/assets/string-lights-DGC0Ni2I.svg",Cm="/kids-house-game/assets/succulent-trio-VYNH-o5B.png",Sm="/kids-house-game/assets/succulent-trio-uPD-ljlL.svg",Bm="/kids-house-game/assets/tassel-rug-BBXtknxh.png",Wm="/kids-house-game/assets/tassel-rug-DolXtxfQ.svg",Tm="/kids-house-game/assets/throw-pillow-BjuGXMYA.png",Pm="/kids-house-game/assets/throw-pillow-qWyWQ9cT.svg",Hm="/kids-house-game/assets/toy-car-Bwrt0-AT.png",Um="/kids-house-game/assets/toy-car-CTJy5H4V.svg",Em="/kids-house-game/assets/tulip-vase-CpQUgXPR.png",Qm="/kids-house-game/assets/tulip-vase-o2vjI1Hg.svg",Am="/kids-house-game/assets/turtle-Bf8_yRql.png",Rm="/kids-house-game/assets/turtle-B9Y6NDSv.svg",zm="/kids-house-game/assets/tv-stand-DnwT-hn4.png",Dm="/kids-house-game/assets/tv-stand-CcLHFc1J.svg",Im="/kids-house-game/assets/wall-shelf-Bs6mROe1.png",qm="/kids-house-game/assets/wall-shelf-CCWuZ6Xl.svg",Om="/kids-house-game/assets/cc-bakery-shelf-dMrnZVB3.png",Nm="/kids-house-game/assets/cc-bakery-shelf-BxdhLTTC.svg",jm="/kids-house-game/assets/cc-breakfast-table-DwHbMV2p.png",Fm="/kids-house-game/assets/cc-breakfast-table-DwaO0eFy.svg",Zm="/kids-house-game/assets/cc-bubble-chair-DuDi-bRz.png",Vm="/kids-house-game/assets/cc-bubble-chair-DncHA7F-.svg",Gm="/kids-house-game/assets/cc-canopy-daybed-CAZpSo2a.png",Km="/kids-house-game/assets/cc-canopy-daybed-CVbt6QDr.svg",Ym="/kids-house-game/assets/cc-cloud-beanbag-BYcBLKf9.png",Xm="/kids-house-game/assets/cc-cloud-beanbag-SM0m-3qY.svg",Jm="/kids-house-game/assets/cc-cloud-lamp-v0UO1VrK.png",e1="/kids-house-game/assets/cc-cloud-lamp-BWwxoCux.svg",t1="/kids-house-game/assets/cc-cottage-aquarium-XYuN1CnR.png",n1="/kids-house-game/assets/cc-cottage-aquarium-iY2D26Vq.svg",s1="/kids-house-game/assets/cc-cupcake-stand-jKA3zoCC.png",o1="/kids-house-game/assets/cc-cupcake-stand-B08kdXZL.svg",i1="/kids-house-game/assets/cc-dryer-chair-CP8q6yyq.png",a1="/kids-house-game/assets/cc-dryer-chair-DQmosxUz.svg",r1="/kids-house-game/assets/cc-fairy-garland-B4DVLP6L.png",l1="/kids-house-game/assets/cc-fairy-garland-BncKvkRL.svg",c1="/kids-house-game/assets/cc-fairy-shelf-DSmhC08i.png",d1="/kids-house-game/assets/cc-fairy-shelf-CE6x7J1w.svg",g1="/kids-house-game/assets/cc-flower-kettle-DZFkbEk5.png",f1="/kids-house-game/assets/cc-flower-kettle-ZTbAh26L.svg",h1="/kids-house-game/assets/cc-flower-lamp-hc1e4xxL.png",p1="/kids-house-game/assets/cc-flower-lamp-CS2T2S89.svg",u1="/kids-house-game/assets/cc-heart-bed-BtOx4_a4.png",m1="/kids-house-game/assets/cc-heart-bed-76-z9nJg.svg",y1="/kids-house-game/assets/cc-heart-clock-CLtzUj8w.png",k1="/kids-house-game/assets/cc-heart-clock-ByixSFru.svg",b1="/kids-house-game/assets/cc-heart-pouf-C3vCLnoM.png",v1="/kids-house-game/assets/cc-heart-pouf-DH5J2s2J.svg",w1="/kids-house-game/assets/cc-heart-rug-CpvyM_wf.png",$1="/kids-house-game/assets/cc-heart-rug-Jwmh-m0j.svg",x1="/kids-house-game/assets/cc-jewel-box-DZ6IxYiU.png",_1="/kids-house-game/assets/cc-jewel-box-qMbIQmo4.svg",M1="/kids-house-game/assets/cc-light-vanity-BxKLJiVW.png",L1="/kids-house-game/assets/cc-light-vanity-DD4uQJ_7.svg",C1="/kids-house-game/assets/cc-macaron-jar-NI43JiPM.png",S1="/kids-house-game/assets/cc-macaron-jar-A0sT-Lvj.svg",B1="/kids-house-game/assets/cc-macrame-swing-x8sop4y4.png",W1="/kids-house-game/assets/cc-macrame-swing-qIcoPp0o.svg",T1="/kids-house-game/assets/cc-mani-chair-C1J_zCFX.png",P1="/kids-house-game/assets/cc-mani-chair-7AWb60tv.svg",H1="/kids-house-game/assets/cc-mint-fridge-7zQk2-Kj.png",U1="/kids-house-game/assets/cc-mint-fridge-Cc87e_gW.svg",E1="/kids-house-game/assets/cc-mushroom-stool-DeoO7P27.png",Q1="/kids-house-game/assets/cc-mushroom-stool-B9-y9WNf.svg",A1="/kids-house-game/assets/cc-pastel-range-CXu-Gr6f.png",R1="/kids-house-game/assets/cc-pastel-range-D6cjzJTl.svg",z1="/kids-house-game/assets/cc-perfume-tray-DkUHaA_i.png",D1="/kids-house-game/assets/cc-perfume-tray-DN4chcIn.svg",I1="/kids-house-game/assets/cc-petal-table-DadCDnSy.png",q1="/kids-house-game/assets/cc-petal-table-QrNho7KH.svg",O1="/kids-house-game/assets/cc-plant-wall-CCxqRxsH.png",N1="/kids-house-game/assets/cc-plant-wall-BMii8_kR.svg",j1="/kids-house-game/assets/cc-reading-nook-Eq4Eh0MW.png",F1="/kids-house-game/assets/cc-reading-nook-wiDgasP8.svg",Z1="/kids-house-game/assets/cc-record-player-LmfaPaE5.png",V1="/kids-house-game/assets/cc-record-player-BoxZhHLy.svg",G1="/kids-house-game/assets/cc-ribbon-mirror-BEsGok51.png",K1="/kids-house-game/assets/cc-ribbon-mirror-DiCje_iy.svg",Y1="/kids-house-game/assets/cc-scallop-curtains-Cvab-FzV.png",X1="/kids-house-game/assets/cc-scallop-curtains-Bzhy2peV.svg",J1="/kids-house-game/assets/cc-scallop-loveseat-CR3Z2O-W.png",e2="/kids-house-game/assets/cc-scallop-loveseat-Dfi7dg3b.svg",t2="/kids-house-game/assets/cc-star-dresser-b15t-WLI.png",n2="/kids-house-game/assets/cc-star-dresser-2wqSnsip.svg",s2="/kids-house-game/assets/cc-teapot-set-ygQBLdbl.png",o2="/kids-house-game/assets/cc-teapot-set-DnZlJvn7.svg",i2="/kids-house-game/assets/cc-window-seat-D-Rfuuwm.png",a2="/kids-house-game/assets/cc-window-seat-BCOise4Z.svg",r2="/kids-house-game/assets/arched-shelf-Dt4oWiBK.png",l2="/kids-house-game/assets/arched-shelf-XtiqRVaT.svg",c2="/kids-house-game/assets/blob-rug-Ckw1kSsa.png",d2="/kids-house-game/assets/blob-rug-Deh5k10s.svg",g2="/kids-house-game/assets/bubbly-plant-CV9ioei6.png",f2="/kids-house-game/assets/bubbly-plant-CFTOJd5Y.svg",h2="/kids-house-game/assets/bud-vase-Bzj5qGgr.png",p2="/kids-house-game/assets/bud-vase-BF-nd69Q.svg",u2="/kids-house-game/assets/comb-brush-CfTGGk1L.png",m2="/kids-house-game/assets/comb-brush-oPJeQv0v.svg",y2="/kids-house-game/assets/cream-jars-dLRXypJR.png",k2="/kids-house-game/assets/cream-jars-D6bxrnJR.svg",b2="/kids-house-game/assets/drop-lamp-DWqiPjZB.png",v2="/kids-house-game/assets/drop-lamp-CJg63ZKz.svg",w2="/kids-house-game/assets/droplet-buddy-DCjbvrlK.png",$2="/kids-house-game/assets/droplet-buddy-DTpHggFh.svg",x2="/kids-house-game/assets/fancy-sofa-BRlr2j8I.png",_2="/kids-house-game/assets/fancy-sofa-kq2L0ob5.svg",M2="/kids-house-game/assets/flower-cart-C3W7v2RD.png",L2="/kids-house-game/assets/flower-cart-BWgfg0s_.svg",C2="/kids-house-game/assets/foot-spa-HwiSNgdS.png",S2="/kids-house-game/assets/foot-spa-DdA5_fj_.svg",B2="/kids-house-game/assets/globe-pendants-ChKRw_Bp.png",W2="/kids-house-game/assets/globe-pendants-DNV5WnAO.svg",T2="/kids-house-game/assets/glow-mirror-D4P3UibJ.png",P2="/kids-house-game/assets/glow-mirror-C_dTGwQc.svg",H2="/kids-house-game/assets/gold-floor-mirror-CSYqaszS.png",U2="/kids-house-game/assets/gold-floor-mirror-jfPQepmr.svg",E2="/kids-house-game/assets/hair-dryer-_nFRnXBv.png",Q2="/kids-house-game/assets/hair-dryer-CAkhCf7J.svg",A2="/kids-house-game/assets/heart-plant-CN47o4my.png",R2="/kids-house-game/assets/heart-plant-fSU4uLVy.svg",z2="/kids-house-game/assets/heart-pouf-b76ZFT07.png",D2="/kids-house-game/assets/heart-pouf-BMVPBVKJ.svg",I2="/kids-house-game/assets/lilac-curtain-94MUZIqr.png",q2="/kids-house-game/assets/lilac-curtain-D_mFsZKu.svg",O2="/kids-house-game/assets/lotion-trio-wGXg7qdC.png",N2="/kids-house-game/assets/lotion-trio-D3lKwvho.svg",j2="/kids-house-game/assets/mani-lamp-B6MLP1xK.png",F2="/kids-house-game/assets/mani-lamp-B4SmvhvS.svg",Z2="/kids-house-game/assets/nail-table-CP0_pEA8.png",V2="/kids-house-game/assets/nail-table-C3FitmuG.svg",G2="/kids-house-game/assets/pebble-rug-BgHMxQ6Q.png",K2="/kids-house-game/assets/pebble-rug-DHBZUggl.svg",Y2="/kids-house-game/assets/perfume-bottle-F_MkREQh.png",X2="/kids-house-game/assets/perfume-bottle-BcNXSWTW.svg",J2="/kids-house-game/assets/pink-fountain-DtB69ljQ.png",ey="/kids-house-game/assets/pink-fountain-DQ3CIetr.svg",ty="/kids-house-game/assets/pink-vanity-CPmOesS7.png",ny="/kids-house-game/assets/pink-vanity-qE3SwdD6.svg",sy="/kids-house-game/assets/polish-bottle-B2f4PsGZ.png",oy="/kids-house-game/assets/polish-bottle-VWed8EQ-.svg",iy="/kids-house-game/assets/polish-rack-ANlncwDe.png",ay="/kids-house-game/assets/polish-rack-8Ph2n2nM.svg",ry="/kids-house-game/assets/reception-desk-DnhqgkHu.png",ly="/kids-house-game/assets/reception-desk-D4Gevx64.svg",cy="/kids-house-game/assets/salon-chair-Bl31ZE_E.png",dy="/kids-house-game/assets/salon-chair-Wj2sOSW8.svg",gy="/kids-house-game/assets/scent-candle-BYUsO9s1.png",fy="/kids-house-game/assets/scent-candle-BEUE-6Uv.svg",hy="/kids-house-game/assets/spray-bottle-DJKZeNmL.png",py="/kids-house-game/assets/spray-bottle-Bc8iuceJ.svg",uy="/kids-house-game/assets/star-wall-sign-D_9XhB91.png",my="/kids-house-game/assets/star-wall-sign-DvenTqvU.svg",yy="/kids-house-game/assets/swivel-stool-BGAwWXNX.png",ky="/kids-house-game/assets/swivel-stool-P-Egqq_Z.svg",by="/kids-house-game/assets/tiered-tray-CGuVyK1K.png",vy="/kids-house-game/assets/tiered-tray-DLnZTsUF.svg",wy="/kids-house-game/assets/towel-cart-5At-syZP.png",$y="/kids-house-game/assets/towel-cart-DJmR97UL.svg",xy="/kids-house-game/assets/towel-stack-D-pX5koc.png",_y="/kids-house-game/assets/towel-stack-C1qplZ4T.svg",My="/kids-house-game/assets/vine-planter-mviuZvkw.png",Ly="/kids-house-game/assets/vine-planter-Duhx9OMZ.svg",Cy="/kids-house-game/assets/waiting-bench-DXbi7ObC.png",Sy="/kids-house-game/assets/waiting-bench-BQuoXbE3.svg",By="/kids-house-game/assets/wash-chair-CJo64U_O.png",Wy="/kids-house-game/assets/wash-chair-sdgNnj79.svg",Ty="/kids-house-game/assets/arched-mirror-2vakzmQ8.png",Py="/kids-house-game/assets/arched-mirror-ClJgTBd9.svg",Hy="/kids-house-game/assets/big-monitor-BRiCdofl.png",Uy="/kids-house-game/assets/big-monitor-jx5PnUa_.svg",Ey="/kids-house-game/assets/boba-cup-Dn_S1oAa.png",Qy="/kids-house-game/assets/boba-cup-CwUerXNm.svg",Ay="/kids-house-game/assets/bubble-bath-D4AZavWB.png",Ry="/kids-house-game/assets/bubble-bath-8VwrkImA.svg",zy="/kids-house-game/assets/cactus-buddy-D_lAS12Y.png",Dy="/kids-house-game/assets/cactus-buddy-D3uacuVA.svg",Iy="/kids-house-game/assets/caterpillar-plush-vK3r58Ch.png",qy="/kids-house-game/assets/caterpillar-plush-BhR8Pydf.svg",Oy="/kids-house-game/assets/checker-bed-DD4Ra6RV.png",Ny="/kids-house-game/assets/checker-bed-mtuxfPje.svg",jy="/kids-house-game/assets/checker-rug-C9Gs09p_.png",Fy="/kids-house-game/assets/checker-rug-CmSO3Y4j.svg",Zy="/kids-house-game/assets/clothes-rail-CJ8Du1xN.png",Vy="/kids-house-game/assets/clothes-rail-BY-f9coz.svg",Gy="/kids-house-game/assets/cloud-sofa-3eVlcAzs.png",Ky="/kids-house-game/assets/cloud-sofa-CZS1Y5s-.svg",Yy="/kids-house-game/assets/cube-shelf-DPFNgFhk.png",Xy="/kids-house-game/assets/cube-shelf-DoI0tLGL.svg",Jy="/kids-house-game/assets/curvy-desk-BxyVtcg3.png",ek="/kids-house-game/assets/curvy-desk-eWCvec1f.svg",tk="/kids-house-game/assets/cute-speaker-Cy7ml0bm.png",nk="/kids-house-game/assets/cute-speaker-DrVF9uns.svg",sk="/kids-house-game/assets/desk-lamp-B39R5SBQ.png",ok="/kids-house-game/assets/desk-lamp-C-VtrE1V.svg",ik="/kids-house-game/assets/desk-mic-C-4XirP6.png",ak="/kids-house-game/assets/desk-mic-BqYzh6ma.svg",rk="/kids-house-game/assets/flower-lamp-DyDRXGpR.png",lk="/kids-house-game/assets/flower-lamp-Dpz6tQ2x.svg",ck="/kids-house-game/assets/frog-plush-NmeU5sHZ.png",dk="/kids-house-game/assets/frog-plush-BhkTrE24.svg",gk="/kids-house-game/assets/game-controller-B6phnmU4.png",fk="/kids-house-game/assets/game-controller-6gvwykQG.svg",hk="/kids-house-game/assets/gaming-chair-B7ZnwG2W.png",pk="/kids-house-game/assets/gaming-chair-BCyGMzy0.svg",uk="/kids-house-game/assets/hamster-pet-C09aLs5N.png",mk="/kids-house-game/assets/hamster-pet-LBcghoJj.svg",yk="/kids-house-game/assets/headphones-MRHfNh-e.png",kk="/kids-house-game/assets/headphones-Cjjqt_92.svg",bk="/kids-house-game/assets/heart-light-B6LXGE4j.png",vk="/kids-house-game/assets/heart-light-DfDwRHju.svg",wk="/kids-house-game/assets/keyboard-Dvxz1PEW.png",$k="/kids-house-game/assets/keyboard-Cbtwvtj1.svg",xk="/kids-house-game/assets/mini-fridge-DgYceOBW.png",_k="/kids-house-game/assets/mini-fridge-qdNm4NKf.svg",Mk="/kids-house-game/assets/pastel-wardrobe-CFIOdtrx.png",Lk="/kids-house-game/assets/pastel-wardrobe-BubkWAN2.svg",Ck="/kids-house-game/assets/phone-stand-CWfRuwT_.png",Sk="/kids-house-game/assets/phone-stand-VLW-DsK-.svg",Bk="/kids-house-game/assets/pothos-plant-mnKAaH_K.png",Wk="/kids-house-game/assets/pothos-plant-C1I15M9a.svg",Tk="/kids-house-game/assets/puffy-stool-B5z3sd2l.png",Pk="/kids-house-game/assets/puffy-stool-CwjoblCa.svg",Hk="/kids-house-game/assets/ring-light-BoqM9Lks.png",Uk="/kids-house-game/assets/ring-light-CdxNAXA6.svg",Ek="/kids-house-game/assets/side-table-round-x1NbWzDq.png",Qk="/kids-house-game/assets/side-table-round-rCsBU0YO.svg",Ak="/kids-house-game/assets/star-lamp-Bocs3YRP.png",Rk="/kids-house-game/assets/star-lamp-CHKQnzvB.svg",zk="/kids-house-game/assets/sticker-board-CMn2BF_D.png",Dk="/kids-house-game/assets/sticker-board-LUm1_I_P.svg",Ik="/kids-house-game/assets/sunny-art-372bwMLG.png",qk="/kids-house-game/assets/sunny-art-C25M7k02.svg",Ok="/kids-house-game/assets/sv-bean-bag-DlsJBRMG.png",Nk="/kids-house-game/assets/sv-bean-bag-DdsCYd4e.svg",jk="/kids-house-game/assets/sv-cloud-rug-Bo5aP_HP.png",Fk="/kids-house-game/assets/sv-cloud-rug-BvczSj77.svg",Zk="/kids-house-game/assets/sv-wall-shelf-C61Y5OFn.png",Vk="/kids-house-game/assets/sv-wall-shelf-BtJLzNMg.svg",Gk="/kids-house-game/assets/vlog-camera-DAiD7LSW.png",Kk="/kids-house-game/assets/vlog-camera-CBd28A7P.svg",Yk="/kids-house-game/assets/wavy-floor-lamp-1BJBLV8q.png",Xk="/kids-house-game/assets/wavy-floor-lamp-Iy8llzr8.svg",Jk="/kids-house-game/assets/acorn-friend-SMoU5de2.png",eb="/kids-house-game/assets/acorn-friend-BsLiZ2Z_.svg",tb="/kids-house-game/assets/apple-tree-CN7tYao3.png",nb="/kids-house-game/assets/apple-tree-DGIUIjY1.svg",sb="/kids-house-game/assets/big-wardrobe-DcZpROWW.png",ob="/kids-house-game/assets/big-wardrobe-BnfnkPXl.svg",ib="/kids-house-game/assets/box-stack-DBdO-RRV.png",ab="/kids-house-game/assets/box-stack-ji13G2mP.svg",rb="/kids-house-game/assets/brick-fireplace-CxelyhgA.png",lb="/kids-house-game/assets/brick-fireplace-BGCbiSK5.svg",cb="/kids-house-game/assets/bulletin-board-BWUCktvK.png",db="/kids-house-game/assets/bulletin-board-DqA69wQH.svg",gb="/kids-house-game/assets/cozy-mug-DGMQRJK7.png",fb="/kids-house-game/assets/cozy-mug-CFJEPRKb.svg",hb="/kids-house-game/assets/cream-sofa-Dzaz9Eg9.png",pb="/kids-house-game/assets/cream-sofa-CB4EWIDp.svg",ub="/kids-house-game/assets/fire-pit-FhRYTkJU.png",mb="/kids-house-game/assets/fire-pit-De3s05T8.svg",yb="/kids-house-game/assets/glass-cabinet-C1Dud5Om.png",kb="/kids-house-game/assets/glass-cabinet-BCHExP4F.svg",bb="/kids-house-game/assets/hanging-lantern-5_A0FrVU.png",vb="/kids-house-game/assets/hanging-lantern-DZbXB8L1.svg",wb="/kids-house-game/assets/knit-cushion-CeEpuawZ.png",$b="/kids-house-game/assets/knit-cushion-DUewI6rR.svg",xb="/kids-house-game/assets/ladder-shelf-kDBx9ho_.png",_b="/kids-house-game/assets/ladder-shelf-DXYDmQiE.svg",Mb="/kids-house-game/assets/landscape-art-CXy-fkYO.png",Lb="/kids-house-game/assets/landscape-art-CdCqCPL2.svg",Cb="/kids-house-game/assets/lattice-bench-BQ7wYgqI.png",Sb="/kids-house-game/assets/lattice-bench-D3zCZTQp.svg",Bb="/kids-house-game/assets/leaf-wreath-01dJ9WfP.png",Wb="/kids-house-game/assets/leaf-wreath-DUjq1MWh.svg",Tb="/kids-house-game/assets/mini-greenhouse-DLsY7-VZ.png",Pb="/kids-house-game/assets/mini-greenhouse-CGE5F9A_.svg",Hb="/kids-house-game/assets/moving-box-DszcEI-k.png",Ub="/kids-house-game/assets/moving-box-CZXbXcJO.svg",Eb="/kids-house-game/assets/picnic-basket-CYmGfWoy.png",Qb="/kids-house-game/assets/picnic-basket-D72DCNRY.svg",Ab="/kids-house-game/assets/round-rug-DZTiY9p2.png",Rb="/kids-house-game/assets/round-rug-D8ePosbv.svg",zb="/kids-house-game/assets/sale-sign-CLwCvavX.png",Db="/kids-house-game/assets/sale-sign-CXWpgQt5.svg",Ib="/kids-house-game/assets/sprout-pot-BlPwmBjK.png",qb="/kids-house-game/assets/sprout-pot-BbXk09mS.svg",Ob="/kids-house-game/assets/stripe-runner-CWfHHL2f.png",Nb="/kids-house-game/assets/stripe-runner-ClycKEW5.svg",jb="/kids-house-game/assets/trailing-plant-BBqKhPvp.png",Fb="/kids-house-game/assets/trailing-plant-NbG7dy8O.svg",Zb="/kids-house-game/assets/wall-clock-ItDQFPVO.png",Vb="/kids-house-game/assets/wall-clock-CDC1o6eG.svg",Gb="/kids-house-game/assets/wh-arc-floor-lamp-Dg8j_uAI.png",Kb="/kids-house-game/assets/wh-arc-floor-lamp-BKVes2Fd.svg",Yb="/kids-house-game/assets/wh-book-stack-9oDTUUnY.png",Xb="/kids-house-game/assets/wh-book-stack-DjDFey2h.svg",Jb="/kids-house-game/assets/wh-dresser-DhrzqcZ2.png",ev="/kids-house-game/assets/wh-dresser-Y-jnNt5q.svg",tv="/kids-house-game/assets/wh-fiddle-leaf-fig-Bt0Bc12k.png",nv="/kids-house-game/assets/wh-fiddle-leaf-fig-B0-kGmHI.svg",sv="/kids-house-game/assets/wh-kitchen-counter-BWikwkWo.png",ov="/kids-house-game/assets/wh-kitchen-counter-BtBenu6u.svg",iv="/kids-house-game/assets/wh-nightstand-BXusZ0A4.png",av="/kids-house-game/assets/wh-nightstand-DPUoV5aO.svg",rv="/kids-house-game/assets/wh-pendant-lamp-DbfSrUho.png",lv="/kids-house-game/assets/wh-pendant-lamp-DBg4p7hi.svg",cv="/kids-house-game/assets/wh-snake-plant-kt_6Tus5.png",dv="/kids-house-game/assets/wh-snake-plant-Cj3bHF25.svg",gv="/kids-house-game/assets/wh-string-lights-CWVP27K_.png",fv="/kids-house-game/assets/wh-string-lights-C3JVBkgW.svg",hv="/kids-house-game/assets/wh-teapot-BclPHtYN.png",pv="/kids-house-game/assets/wh-teapot-kevlW5hN.svg",uv="/kids-house-game/assets/wood-armchair-BoX1llWe.png",mv="/kids-house-game/assets/wood-armchair-DNVhKBWe.svg",yv="/kids-house-game/assets/wood-bookshelf-CfgOK-7q.png",kv="/kids-house-game/assets/wood-bookshelf-CvT7GAuI.svg",bv="/kids-house-game/assets/wood-coffee-table-DmAJknnU.png",vv="/kids-house-game/assets/wood-coffee-table-CuAR_7Kr.svg",wv="/kids-house-game/assets/wood-desk-S1h5jwM2.png",$v="/kids-house-game/assets/wood-desk-DPCJq_XQ.svg",xv="/kids-house-game/assets/wood-stool-BWBID67e.png",_v="/kids-house-game/assets/wood-stool-CV7YeZwC.svg",Mv="/kids-house-game/assets/wooden-bed-511IemjK.png",Lv="/kids-house-game/assets/wooden-bed-Qj-sf8yq.svg",Cv="/kids-house-game/assets/cc-butter-polka-DGTIwtTO.png",Sv="/kids-house-game/assets/cc-butter-polka-CmiHLPHI.svg",Bv="/kids-house-game/assets/cc-cream-hex-DMlsmhhY.png",Wv="/kids-house-game/assets/cc-cream-hex-Bkf3o84Z.svg",Tv="/kids-house-game/assets/cc-lavender-lattice-D6QyuSPi.png",Pv="/kids-house-game/assets/cc-lavender-lattice-DhxILx5n.svg",Hv="/kids-house-game/assets/cc-lilac-gingham-C8gKChr3.png",Uv="/kids-house-game/assets/cc-lilac-gingham-C-WPjvD8.svg",Ev="/kids-house-game/assets/cc-mint-checks-Bj1xaUgE.png",Qv="/kids-house-game/assets/cc-mint-checks-BKmyOLlr.svg",Av="/kids-house-game/assets/cc-mint-florals-DubHlfkl.png",Rv="/kids-house-game/assets/cc-mint-florals-Dz8qRBHw.svg",zv="/kids-house-game/assets/cc-peach-scallops-3xV_Pu-6.png",Dv="/kids-house-game/assets/cc-peach-scallops-GPn_mXbS.svg",Iv="/kids-house-game/assets/cc-pink-plaid-C9HKdB4f.png",qv="/kids-house-game/assets/cc-pink-plaid-VgppBwax.svg",Ov="/kids-house-game/assets/cc-rag-planks-B67vRZlX.png",Nv="/kids-house-game/assets/cc-rag-planks-C5Hombhc.svg",jv="/kids-house-game/assets/cc-rose-herringbone-Cmke3vGv.png",Fv="/kids-house-game/assets/cc-rose-herringbone-CQRix6_f.svg",Zv="/kids-house-game/assets/lilac-stripes-DcsSoVwO.png",Vv="/kids-house-game/assets/lilac-stripes-yb9DhjTf.svg",Gv="/kids-house-game/assets/lilac-terrazzo-DOghNP_d.png",Kv="/kids-house-game/assets/lilac-terrazzo-8CaN2qhK.svg",Yv="/kids-house-game/assets/mint-bubbles-DtsYAubK.png",Xv="/kids-house-game/assets/mint-bubbles-BIQM5a2P.svg",Jv="/kids-house-game/assets/pink-check-floor-DjPuYxlq.png",e4="/kids-house-game/assets/pink-check-floor-Cy9k3Fal.svg",t4="/kids-house-game/assets/pink-hearts-DP4TxPV5.png",n4="/kids-house-game/assets/pink-hearts-BpVCT-98.svg",s4="/kids-house-game/assets/cloud-sky-CbZL0zcC.svg",o4="/kids-house-game/assets/pastel-planks-BAcEss7w.svg",i4="/kids-house-game/assets/soft-carpet-BSwTSDW1.svg",a4="/kids-house-game/assets/star-sprinkle-5bH7qjW0.svg",r4="/kids-house-game/assets/tiny-hearts-C-RHlg1h.svg",l4="/kids-house-game/assets/butter-check-floor-yLFbEdi4.png",c4="/kids-house-game/assets/butter-check-floor-C8HdmZ0P.svg",d4="/kids-house-game/assets/mint-checks-7rTweT19.png",g4="/kids-house-game/assets/mint-checks-rWbOdhfH.svg",f4="/kids-house-game/assets/sky-clouds-9-shWk3w.png",h4="/kids-house-game/assets/sky-clouds-DUJlygwI.svg",p4="/kids-house-game/assets/sky-tiles-Cu-Ga741.png",u4="/kids-house-game/assets/sky-tiles-xxuodD5m.svg",m4="/kids-house-game/assets/sunny-stars-Bc3CbIvZ.png",y4="/kids-house-game/assets/sunny-stars-C6fsFX70.svg",k4="/kids-house-game/assets/leafy-cream-Cv5o-u-w.png",b4="/kids-house-game/assets/leafy-cream-WIcyLI1T.svg",v4="/kids-house-game/assets/orange-gingham-BjUerG-F.png",w4="/kids-house-game/assets/orange-gingham-CVNizWBt.svg",$4="/kids-house-game/assets/terracotta-tiles-dXqpLLce.png",x4="/kids-house-game/assets/terracotta-tiles-j3yOSRI7.svg",_4="/kids-house-game/assets/wood-panel-BGEVUu4R.png",M4="/kids-house-game/assets/wood-panel-Dob8WRpW.svg",L4="/kids-house-game/assets/wood-planks-vE8-OOXo.png",C4="/kids-house-game/assets/wood-planks-4TUYjAkF.svg",sl={small:80,medium:150,large:260},S4={"welcome-home":"Welcome Home","sunny-vibes":"Sunny Vibes",glossy:"Glossy",cottage:"Cozy Cottage"},_c=e=>S4[e]??e.replace(/[-_]+/g," ").replace(/\b\w/g,t=>t.toUpperCase()),B4=Object.assign({"../assets/items/manifest.json":sp,"../assets/patterns/manifest.json":op}),ol=Object.assign({"../assets/items/bedroom/alarm-clock.png":ip,"../assets/items/bedroom/alarm-clock.svg":ap,"../assets/items/bedroom/bedtime-snack.png":rp,"../assets/items/bedroom/bedtime-snack.svg":lp,"../assets/items/bedroom/book-stack.png":cp,"../assets/items/bedroom/book-stack.svg":dp,"../assets/items/bedroom/bunk-bed.png":gp,"../assets/items/bedroom/bunk-bed.svg":fp,"../assets/items/bedroom/bunny-slippers.png":hp,"../assets/items/bedroom/bunny-slippers.svg":pp,"../assets/items/bedroom/canopy-bed.png":up,"../assets/items/bedroom/canopy-bed.svg":mp,"../assets/items/bedroom/cat-bed.png":yp,"../assets/items/bedroom/cat-bed.svg":kp,"../assets/items/bedroom/cloud-rug.png":bp,"../assets/items/bedroom/cloud-rug.svg":vp,"../assets/items/bedroom/cloud-shelf.png":wp,"../assets/items/bedroom/cloud-shelf.svg":$p,"../assets/items/bedroom/cork-board.png":xp,"../assets/items/bedroom/cork-board.svg":_p,"../assets/items/bedroom/daisy-pot.png":Mp,"../assets/items/bedroom/daisy-pot.svg":Lp,"../assets/items/bedroom/desk.png":Cp,"../assets/items/bedroom/desk.svg":Sp,"../assets/items/bedroom/dino-plush.png":Bp,"../assets/items/bedroom/dino-plush.svg":Wp,"../assets/items/bedroom/doll-house.png":Tp,"../assets/items/bedroom/doll-house.svg":Pp,"../assets/items/bedroom/dresser.png":Hp,"../assets/items/bedroom/dresser.svg":Up,"../assets/items/bedroom/egg-chair.png":Ep,"../assets/items/bedroom/egg-chair.svg":Qp,"../assets/items/bedroom/floor-fan.png":Ap,"../assets/items/bedroom/floor-fan.svg":Rp,"../assets/items/bedroom/guinea-pig.png":zp,"../assets/items/bedroom/guinea-pig.svg":Dp,"../assets/items/bedroom/hamster-cage.png":Ip,"../assets/items/bedroom/hamster-cage.svg":qp,"../assets/items/bedroom/heart-rug.png":Op,"../assets/items/bedroom/heart-rug.svg":Np,"../assets/items/bedroom/lava-lamp.png":jp,"../assets/items/bedroom/lava-lamp.svg":Fp,"../assets/items/bedroom/moon-night-light.png":Zp,"../assets/items/bedroom/moon-night-light.svg":Vp,"../assets/items/bedroom/nightstand.png":Gp,"../assets/items/bedroom/nightstand.svg":Kp,"../assets/items/bedroom/paper-lantern.png":Yp,"../assets/items/bedroom/paper-lantern.svg":Xp,"../assets/items/bedroom/piggy-bank.png":Jp,"../assets/items/bedroom/piggy-bank.svg":e0,"../assets/items/bedroom/plant-stand.png":t0,"../assets/items/bedroom/plant-stand.svg":n0,"../assets/items/bedroom/play-tent.png":s0,"../assets/items/bedroom/play-tent.svg":o0,"../assets/items/bedroom/star-mobile.png":i0,"../assets/items/bedroom/star-mobile.svg":a0,"../assets/items/bedroom/toy-chest.png":r0,"../assets/items/bedroom/toy-chest.svg":l0,"../assets/items/bedroom/toy-robot.png":c0,"../assets/items/bedroom/toy-robot.svg":d0,"../assets/items/bedroom/toy-train.png":g0,"../assets/items/bedroom/toy-train.svg":f0,"../assets/items/bedroom/unicorn-plush.png":h0,"../assets/items/bedroom/unicorn-plush.svg":p0,"../assets/items/bedroom/wardrobe.png":u0,"../assets/items/bedroom/wardrobe.svg":m0,"../assets/items/kitchen/bananas.png":y0,"../assets/items/kitchen/bananas.svg":k0,"../assets/items/kitchen/bar-stool.png":b0,"../assets/items/kitchen/bar-stool.svg":v0,"../assets/items/kitchen/bread-loaf.png":w0,"../assets/items/kitchen/bread-loaf.svg":$0,"../assets/items/kitchen/chick.png":x0,"../assets/items/kitchen/chick.svg":_0,"../assets/items/kitchen/china-hutch.png":M0,"../assets/items/kitchen/china-hutch.svg":L0,"../assets/items/kitchen/cocoa-mug.png":C0,"../assets/items/kitchen/cocoa-mug.svg":S0,"../assets/items/kitchen/cookie-jar.png":B0,"../assets/items/kitchen/cookie-jar.svg":W0,"../assets/items/kitchen/cooking-pot.png":T0,"../assets/items/kitchen/cooking-pot.svg":P0,"../assets/items/kitchen/cupcake.png":H0,"../assets/items/kitchen/cupcake.svg":U0,"../assets/items/kitchen/dish-rack.png":E0,"../assets/items/kitchen/dish-rack.svg":Q0,"../assets/items/kitchen/fruit-bowl.png":A0,"../assets/items/kitchen/fruit-bowl.svg":R0,"../assets/items/kitchen/frying-pan.png":z0,"../assets/items/kitchen/frying-pan.svg":D0,"../assets/items/kitchen/happy-fridge.png":I0,"../assets/items/kitchen/happy-fridge.svg":q0,"../assets/items/kitchen/herb-box.png":O0,"../assets/items/kitchen/herb-box.svg":N0,"../assets/items/kitchen/high-chair.png":j0,"../assets/items/kitchen/high-chair.svg":F0,"../assets/items/kitchen/ice-cream.png":Z0,"../assets/items/kitchen/ice-cream.svg":V0,"../assets/items/kitchen/kettle.png":G0,"../assets/items/kitchen/kettle.svg":K0,"../assets/items/kitchen/kitchen-counter.png":Y0,"../assets/items/kitchen/kitchen-counter.svg":X0,"../assets/items/kitchen/kitchen-sink.png":J0,"../assets/items/kitchen/kitchen-sink.svg":eu,"../assets/items/kitchen/lemon-tree.png":tu,"../assets/items/kitchen/lemon-tree.svg":nu,"../assets/items/kitchen/microwave.png":su,"../assets/items/kitchen/microwave.svg":ou,"../assets/items/kitchen/milk-bottle.png":iu,"../assets/items/kitchen/milk-bottle.svg":au,"../assets/items/kitchen/pancakes.png":ru,"../assets/items/kitchen/pancakes.svg":lu,"../assets/items/kitchen/pantry-shelf.png":cu,"../assets/items/kitchen/pantry-shelf.svg":du,"../assets/items/kitchen/pendant-lamp.png":gu,"../assets/items/kitchen/pendant-lamp.svg":fu,"../assets/items/kitchen/pet-bowl.png":hu,"../assets/items/kitchen/pet-bowl.svg":pu,"../assets/items/kitchen/rice-cooker.png":uu,"../assets/items/kitchen/rice-cooker.svg":mu,"../assets/items/kitchen/runner-rug.png":yu,"../assets/items/kitchen/runner-rug.svg":ku,"../assets/items/kitchen/spice-rack.png":bu,"../assets/items/kitchen/spice-rack.svg":vu,"../assets/items/kitchen/stand-mixer.png":wu,"../assets/items/kitchen/stand-mixer.svg":$u,"../assets/items/kitchen/teapot.png":xu,"../assets/items/kitchen/teapot.svg":_u,"../assets/items/kitchen/toaster.png":Mu,"../assets/items/kitchen/toaster.svg":Lu,"../assets/items/kitchen/utensil-rail.png":Cu,"../assets/items/kitchen/utensil-rail.svg":Su,"../assets/items/kitchen/watermelon-slice.png":Bu,"../assets/items/kitchen/watermelon-slice.svg":Wu,"../assets/items/living/aquarium.png":Tu,"../assets/items/living/aquarium.svg":Pu,"../assets/items/living/arc-floor-lamp.png":Hu,"../assets/items/living/arc-floor-lamp.svg":Uu,"../assets/items/living/bean-bag.png":Eu,"../assets/items/living/bean-bag.svg":Qu,"../assets/items/living/bird-cage.png":Au,"../assets/items/living/bird-cage.svg":Ru,"../assets/items/living/blanket-basket.png":zu,"../assets/items/living/blanket-basket.svg":Du,"../assets/items/living/building-blocks.png":Iu,"../assets/items/living/building-blocks.svg":qu,"../assets/items/living/coffee-table.png":Ou,"../assets/items/living/coffee-table.svg":Nu,"../assets/items/living/comfy-armchair.png":ju,"../assets/items/living/comfy-armchair.svg":Fu,"../assets/items/living/cubby-shelf.png":Zu,"../assets/items/living/cubby-shelf.svg":Vu,"../assets/items/living/daisy-rug.png":Gu,"../assets/items/living/daisy-rug.svg":Ku,"../assets/items/living/fiddle-leaf-fig.png":Yu,"../assets/items/living/fiddle-leaf-fig.svg":Xu,"../assets/items/living/fireplace.png":Ju,"../assets/items/living/fireplace.svg":em,"../assets/items/living/globe.png":tm,"../assets/items/living/globe.svg":nm,"../assets/items/living/hanging-planter.png":sm,"../assets/items/living/hanging-planter.svg":om,"../assets/items/living/monstera-plant.png":im,"../assets/items/living/monstera-plant.svg":am,"../assets/items/living/piano.png":rm,"../assets/items/living/piano.svg":lm,"../assets/items/living/popcorn.png":cm,"../assets/items/living/popcorn.svg":dm,"../assets/items/living/pouf.png":gm,"../assets/items/living/pouf.svg":fm,"../assets/items/living/rainbow-rug.png":hm,"../assets/items/living/rainbow-rug.svg":pm,"../assets/items/living/rainbow-wall-art.png":um,"../assets/items/living/rainbow-wall-art.svg":mm,"../assets/items/living/retro-radio.png":ym,"../assets/items/living/retro-radio.svg":km,"../assets/items/living/rocking-chair.png":bm,"../assets/items/living/rocking-chair.svg":vm,"../assets/items/living/rocking-horse.png":wm,"../assets/items/living/rocking-horse.svg":$m,"../assets/items/living/snake-plant.png":xm,"../assets/items/living/snake-plant.svg":_m,"../assets/items/living/string-lights.png":Mm,"../assets/items/living/string-lights.svg":Lm,"../assets/items/living/succulent-trio.png":Cm,"../assets/items/living/succulent-trio.svg":Sm,"../assets/items/living/tassel-rug.png":Bm,"../assets/items/living/tassel-rug.svg":Wm,"../assets/items/living/throw-pillow.png":Tm,"../assets/items/living/throw-pillow.svg":Pm,"../assets/items/living/toy-car.png":Hm,"../assets/items/living/toy-car.svg":Um,"../assets/items/living/tulip-vase.png":Em,"../assets/items/living/tulip-vase.svg":Qm,"../assets/items/living/turtle.png":Am,"../assets/items/living/turtle.svg":Rm,"../assets/items/living/tv-stand.png":zm,"../assets/items/living/tv-stand.svg":Dm,"../assets/items/living/wall-shelf.png":Im,"../assets/items/living/wall-shelf.svg":qm,"../assets/items/packs/cottage/cc-bakery-shelf.png":Om,"../assets/items/packs/cottage/cc-bakery-shelf.svg":Nm,"../assets/items/packs/cottage/cc-breakfast-table.png":jm,"../assets/items/packs/cottage/cc-breakfast-table.svg":Fm,"../assets/items/packs/cottage/cc-bubble-chair.png":Zm,"../assets/items/packs/cottage/cc-bubble-chair.svg":Vm,"../assets/items/packs/cottage/cc-canopy-daybed.png":Gm,"../assets/items/packs/cottage/cc-canopy-daybed.svg":Km,"../assets/items/packs/cottage/cc-cloud-beanbag.png":Ym,"../assets/items/packs/cottage/cc-cloud-beanbag.svg":Xm,"../assets/items/packs/cottage/cc-cloud-lamp.png":Jm,"../assets/items/packs/cottage/cc-cloud-lamp.svg":e1,"../assets/items/packs/cottage/cc-cottage-aquarium.png":t1,"../assets/items/packs/cottage/cc-cottage-aquarium.svg":n1,"../assets/items/packs/cottage/cc-cupcake-stand.png":s1,"../assets/items/packs/cottage/cc-cupcake-stand.svg":o1,"../assets/items/packs/cottage/cc-dryer-chair.png":i1,"../assets/items/packs/cottage/cc-dryer-chair.svg":a1,"../assets/items/packs/cottage/cc-fairy-garland.png":r1,"../assets/items/packs/cottage/cc-fairy-garland.svg":l1,"../assets/items/packs/cottage/cc-fairy-shelf.png":c1,"../assets/items/packs/cottage/cc-fairy-shelf.svg":d1,"../assets/items/packs/cottage/cc-flower-kettle.png":g1,"../assets/items/packs/cottage/cc-flower-kettle.svg":f1,"../assets/items/packs/cottage/cc-flower-lamp.png":h1,"../assets/items/packs/cottage/cc-flower-lamp.svg":p1,"../assets/items/packs/cottage/cc-heart-bed.png":u1,"../assets/items/packs/cottage/cc-heart-bed.svg":m1,"../assets/items/packs/cottage/cc-heart-clock.png":y1,"../assets/items/packs/cottage/cc-heart-clock.svg":k1,"../assets/items/packs/cottage/cc-heart-pouf.png":b1,"../assets/items/packs/cottage/cc-heart-pouf.svg":v1,"../assets/items/packs/cottage/cc-heart-rug.png":w1,"../assets/items/packs/cottage/cc-heart-rug.svg":$1,"../assets/items/packs/cottage/cc-jewel-box.png":x1,"../assets/items/packs/cottage/cc-jewel-box.svg":_1,"../assets/items/packs/cottage/cc-light-vanity.png":M1,"../assets/items/packs/cottage/cc-light-vanity.svg":L1,"../assets/items/packs/cottage/cc-macaron-jar.png":C1,"../assets/items/packs/cottage/cc-macaron-jar.svg":S1,"../assets/items/packs/cottage/cc-macrame-swing.png":B1,"../assets/items/packs/cottage/cc-macrame-swing.svg":W1,"../assets/items/packs/cottage/cc-mani-chair.png":T1,"../assets/items/packs/cottage/cc-mani-chair.svg":P1,"../assets/items/packs/cottage/cc-mint-fridge.png":H1,"../assets/items/packs/cottage/cc-mint-fridge.svg":U1,"../assets/items/packs/cottage/cc-mushroom-stool.png":E1,"../assets/items/packs/cottage/cc-mushroom-stool.svg":Q1,"../assets/items/packs/cottage/cc-pastel-range.png":A1,"../assets/items/packs/cottage/cc-pastel-range.svg":R1,"../assets/items/packs/cottage/cc-perfume-tray.png":z1,"../assets/items/packs/cottage/cc-perfume-tray.svg":D1,"../assets/items/packs/cottage/cc-petal-table.png":I1,"../assets/items/packs/cottage/cc-petal-table.svg":q1,"../assets/items/packs/cottage/cc-plant-wall.png":O1,"../assets/items/packs/cottage/cc-plant-wall.svg":N1,"../assets/items/packs/cottage/cc-reading-nook.png":j1,"../assets/items/packs/cottage/cc-reading-nook.svg":F1,"../assets/items/packs/cottage/cc-record-player.png":Z1,"../assets/items/packs/cottage/cc-record-player.svg":V1,"../assets/items/packs/cottage/cc-ribbon-mirror.png":G1,"../assets/items/packs/cottage/cc-ribbon-mirror.svg":K1,"../assets/items/packs/cottage/cc-scallop-curtains.png":Y1,"../assets/items/packs/cottage/cc-scallop-curtains.svg":X1,"../assets/items/packs/cottage/cc-scallop-loveseat.png":J1,"../assets/items/packs/cottage/cc-scallop-loveseat.svg":e2,"../assets/items/packs/cottage/cc-star-dresser.png":t2,"../assets/items/packs/cottage/cc-star-dresser.svg":n2,"../assets/items/packs/cottage/cc-teapot-set.png":s2,"../assets/items/packs/cottage/cc-teapot-set.svg":o2,"../assets/items/packs/cottage/cc-window-seat.png":i2,"../assets/items/packs/cottage/cc-window-seat.svg":a2,"../assets/items/packs/glossy/arched-shelf.png":r2,"../assets/items/packs/glossy/arched-shelf.svg":l2,"../assets/items/packs/glossy/blob-rug.png":c2,"../assets/items/packs/glossy/blob-rug.svg":d2,"../assets/items/packs/glossy/bubbly-plant.png":g2,"../assets/items/packs/glossy/bubbly-plant.svg":f2,"../assets/items/packs/glossy/bud-vase.png":h2,"../assets/items/packs/glossy/bud-vase.svg":p2,"../assets/items/packs/glossy/comb-brush.png":u2,"../assets/items/packs/glossy/comb-brush.svg":m2,"../assets/items/packs/glossy/cream-jars.png":y2,"../assets/items/packs/glossy/cream-jars.svg":k2,"../assets/items/packs/glossy/drop-lamp.png":b2,"../assets/items/packs/glossy/drop-lamp.svg":v2,"../assets/items/packs/glossy/droplet-buddy.png":w2,"../assets/items/packs/glossy/droplet-buddy.svg":$2,"../assets/items/packs/glossy/fancy-sofa.png":x2,"../assets/items/packs/glossy/fancy-sofa.svg":_2,"../assets/items/packs/glossy/flower-cart.png":M2,"../assets/items/packs/glossy/flower-cart.svg":L2,"../assets/items/packs/glossy/foot-spa.png":C2,"../assets/items/packs/glossy/foot-spa.svg":S2,"../assets/items/packs/glossy/globe-pendants.png":B2,"../assets/items/packs/glossy/globe-pendants.svg":W2,"../assets/items/packs/glossy/glow-mirror.png":T2,"../assets/items/packs/glossy/glow-mirror.svg":P2,"../assets/items/packs/glossy/gold-floor-mirror.png":H2,"../assets/items/packs/glossy/gold-floor-mirror.svg":U2,"../assets/items/packs/glossy/hair-dryer.png":E2,"../assets/items/packs/glossy/hair-dryer.svg":Q2,"../assets/items/packs/glossy/heart-plant.png":A2,"../assets/items/packs/glossy/heart-plant.svg":R2,"../assets/items/packs/glossy/heart-pouf.png":z2,"../assets/items/packs/glossy/heart-pouf.svg":D2,"../assets/items/packs/glossy/lilac-curtain.png":I2,"../assets/items/packs/glossy/lilac-curtain.svg":q2,"../assets/items/packs/glossy/lotion-trio.png":O2,"../assets/items/packs/glossy/lotion-trio.svg":N2,"../assets/items/packs/glossy/mani-lamp.png":j2,"../assets/items/packs/glossy/mani-lamp.svg":F2,"../assets/items/packs/glossy/nail-table.png":Z2,"../assets/items/packs/glossy/nail-table.svg":V2,"../assets/items/packs/glossy/pebble-rug.png":G2,"../assets/items/packs/glossy/pebble-rug.svg":K2,"../assets/items/packs/glossy/perfume-bottle.png":Y2,"../assets/items/packs/glossy/perfume-bottle.svg":X2,"../assets/items/packs/glossy/pink-fountain.png":J2,"../assets/items/packs/glossy/pink-fountain.svg":ey,"../assets/items/packs/glossy/pink-vanity.png":ty,"../assets/items/packs/glossy/pink-vanity.svg":ny,"../assets/items/packs/glossy/polish-bottle.png":sy,"../assets/items/packs/glossy/polish-bottle.svg":oy,"../assets/items/packs/glossy/polish-rack.png":iy,"../assets/items/packs/glossy/polish-rack.svg":ay,"../assets/items/packs/glossy/reception-desk.png":ry,"../assets/items/packs/glossy/reception-desk.svg":ly,"../assets/items/packs/glossy/salon-chair.png":cy,"../assets/items/packs/glossy/salon-chair.svg":dy,"../assets/items/packs/glossy/scent-candle.png":gy,"../assets/items/packs/glossy/scent-candle.svg":fy,"../assets/items/packs/glossy/spray-bottle.png":hy,"../assets/items/packs/glossy/spray-bottle.svg":py,"../assets/items/packs/glossy/star-wall-sign.png":uy,"../assets/items/packs/glossy/star-wall-sign.svg":my,"../assets/items/packs/glossy/swivel-stool.png":yy,"../assets/items/packs/glossy/swivel-stool.svg":ky,"../assets/items/packs/glossy/tiered-tray.png":by,"../assets/items/packs/glossy/tiered-tray.svg":vy,"../assets/items/packs/glossy/towel-cart.png":wy,"../assets/items/packs/glossy/towel-cart.svg":$y,"../assets/items/packs/glossy/towel-stack.png":xy,"../assets/items/packs/glossy/towel-stack.svg":_y,"../assets/items/packs/glossy/vine-planter.png":My,"../assets/items/packs/glossy/vine-planter.svg":Ly,"../assets/items/packs/glossy/waiting-bench.png":Cy,"../assets/items/packs/glossy/waiting-bench.svg":Sy,"../assets/items/packs/glossy/wash-chair.png":By,"../assets/items/packs/glossy/wash-chair.svg":Wy,"../assets/items/packs/sunny-vibes/arched-mirror.png":Ty,"../assets/items/packs/sunny-vibes/arched-mirror.svg":Py,"../assets/items/packs/sunny-vibes/big-monitor.png":Hy,"../assets/items/packs/sunny-vibes/big-monitor.svg":Uy,"../assets/items/packs/sunny-vibes/boba-cup.png":Ey,"../assets/items/packs/sunny-vibes/boba-cup.svg":Qy,"../assets/items/packs/sunny-vibes/bubble-bath.png":Ay,"../assets/items/packs/sunny-vibes/bubble-bath.svg":Ry,"../assets/items/packs/sunny-vibes/cactus-buddy.png":zy,"../assets/items/packs/sunny-vibes/cactus-buddy.svg":Dy,"../assets/items/packs/sunny-vibes/caterpillar-plush.png":Iy,"../assets/items/packs/sunny-vibes/caterpillar-plush.svg":qy,"../assets/items/packs/sunny-vibes/checker-bed.png":Oy,"../assets/items/packs/sunny-vibes/checker-bed.svg":Ny,"../assets/items/packs/sunny-vibes/checker-rug.png":jy,"../assets/items/packs/sunny-vibes/checker-rug.svg":Fy,"../assets/items/packs/sunny-vibes/clothes-rail.png":Zy,"../assets/items/packs/sunny-vibes/clothes-rail.svg":Vy,"../assets/items/packs/sunny-vibes/cloud-sofa.png":Gy,"../assets/items/packs/sunny-vibes/cloud-sofa.svg":Ky,"../assets/items/packs/sunny-vibes/cube-shelf.png":Yy,"../assets/items/packs/sunny-vibes/cube-shelf.svg":Xy,"../assets/items/packs/sunny-vibes/curvy-desk.png":Jy,"../assets/items/packs/sunny-vibes/curvy-desk.svg":ek,"../assets/items/packs/sunny-vibes/cute-speaker.png":tk,"../assets/items/packs/sunny-vibes/cute-speaker.svg":nk,"../assets/items/packs/sunny-vibes/desk-lamp.png":sk,"../assets/items/packs/sunny-vibes/desk-lamp.svg":ok,"../assets/items/packs/sunny-vibes/desk-mic.png":ik,"../assets/items/packs/sunny-vibes/desk-mic.svg":ak,"../assets/items/packs/sunny-vibes/flower-lamp.png":rk,"../assets/items/packs/sunny-vibes/flower-lamp.svg":lk,"../assets/items/packs/sunny-vibes/frog-plush.png":ck,"../assets/items/packs/sunny-vibes/frog-plush.svg":dk,"../assets/items/packs/sunny-vibes/game-controller.png":gk,"../assets/items/packs/sunny-vibes/game-controller.svg":fk,"../assets/items/packs/sunny-vibes/gaming-chair.png":hk,"../assets/items/packs/sunny-vibes/gaming-chair.svg":pk,"../assets/items/packs/sunny-vibes/hamster-pet.png":uk,"../assets/items/packs/sunny-vibes/hamster-pet.svg":mk,"../assets/items/packs/sunny-vibes/headphones.png":yk,"../assets/items/packs/sunny-vibes/headphones.svg":kk,"../assets/items/packs/sunny-vibes/heart-light.png":bk,"../assets/items/packs/sunny-vibes/heart-light.svg":vk,"../assets/items/packs/sunny-vibes/keyboard.png":wk,"../assets/items/packs/sunny-vibes/keyboard.svg":$k,"../assets/items/packs/sunny-vibes/mini-fridge.png":xk,"../assets/items/packs/sunny-vibes/mini-fridge.svg":_k,"../assets/items/packs/sunny-vibes/pastel-wardrobe.png":Mk,"../assets/items/packs/sunny-vibes/pastel-wardrobe.svg":Lk,"../assets/items/packs/sunny-vibes/phone-stand.png":Ck,"../assets/items/packs/sunny-vibes/phone-stand.svg":Sk,"../assets/items/packs/sunny-vibes/pothos-plant.png":Bk,"../assets/items/packs/sunny-vibes/pothos-plant.svg":Wk,"../assets/items/packs/sunny-vibes/puffy-stool.png":Tk,"../assets/items/packs/sunny-vibes/puffy-stool.svg":Pk,"../assets/items/packs/sunny-vibes/ring-light.png":Hk,"../assets/items/packs/sunny-vibes/ring-light.svg":Uk,"../assets/items/packs/sunny-vibes/side-table-round.png":Ek,"../assets/items/packs/sunny-vibes/side-table-round.svg":Qk,"../assets/items/packs/sunny-vibes/star-lamp.png":Ak,"../assets/items/packs/sunny-vibes/star-lamp.svg":Rk,"../assets/items/packs/sunny-vibes/sticker-board.png":zk,"../assets/items/packs/sunny-vibes/sticker-board.svg":Dk,"../assets/items/packs/sunny-vibes/sunny-art.png":Ik,"../assets/items/packs/sunny-vibes/sunny-art.svg":qk,"../assets/items/packs/sunny-vibes/sv-bean-bag.png":Ok,"../assets/items/packs/sunny-vibes/sv-bean-bag.svg":Nk,"../assets/items/packs/sunny-vibes/sv-cloud-rug.png":jk,"../assets/items/packs/sunny-vibes/sv-cloud-rug.svg":Fk,"../assets/items/packs/sunny-vibes/sv-wall-shelf.png":Zk,"../assets/items/packs/sunny-vibes/sv-wall-shelf.svg":Vk,"../assets/items/packs/sunny-vibes/vlog-camera.png":Gk,"../assets/items/packs/sunny-vibes/vlog-camera.svg":Kk,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.png":Yk,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.svg":Xk,"../assets/items/packs/welcome-home/acorn-friend.png":Jk,"../assets/items/packs/welcome-home/acorn-friend.svg":eb,"../assets/items/packs/welcome-home/apple-tree.png":tb,"../assets/items/packs/welcome-home/apple-tree.svg":nb,"../assets/items/packs/welcome-home/big-wardrobe.png":sb,"../assets/items/packs/welcome-home/big-wardrobe.svg":ob,"../assets/items/packs/welcome-home/box-stack.png":ib,"../assets/items/packs/welcome-home/box-stack.svg":ab,"../assets/items/packs/welcome-home/brick-fireplace.png":rb,"../assets/items/packs/welcome-home/brick-fireplace.svg":lb,"../assets/items/packs/welcome-home/bulletin-board.png":cb,"../assets/items/packs/welcome-home/bulletin-board.svg":db,"../assets/items/packs/welcome-home/cozy-mug.png":gb,"../assets/items/packs/welcome-home/cozy-mug.svg":fb,"../assets/items/packs/welcome-home/cream-sofa.png":hb,"../assets/items/packs/welcome-home/cream-sofa.svg":pb,"../assets/items/packs/welcome-home/fire-pit.png":ub,"../assets/items/packs/welcome-home/fire-pit.svg":mb,"../assets/items/packs/welcome-home/glass-cabinet.png":yb,"../assets/items/packs/welcome-home/glass-cabinet.svg":kb,"../assets/items/packs/welcome-home/hanging-lantern.png":bb,"../assets/items/packs/welcome-home/hanging-lantern.svg":vb,"../assets/items/packs/welcome-home/knit-cushion.png":wb,"../assets/items/packs/welcome-home/knit-cushion.svg":$b,"../assets/items/packs/welcome-home/ladder-shelf.png":xb,"../assets/items/packs/welcome-home/ladder-shelf.svg":_b,"../assets/items/packs/welcome-home/landscape-art.png":Mb,"../assets/items/packs/welcome-home/landscape-art.svg":Lb,"../assets/items/packs/welcome-home/lattice-bench.png":Cb,"../assets/items/packs/welcome-home/lattice-bench.svg":Sb,"../assets/items/packs/welcome-home/leaf-wreath.png":Bb,"../assets/items/packs/welcome-home/leaf-wreath.svg":Wb,"../assets/items/packs/welcome-home/mini-greenhouse.png":Tb,"../assets/items/packs/welcome-home/mini-greenhouse.svg":Pb,"../assets/items/packs/welcome-home/moving-box.png":Hb,"../assets/items/packs/welcome-home/moving-box.svg":Ub,"../assets/items/packs/welcome-home/picnic-basket.png":Eb,"../assets/items/packs/welcome-home/picnic-basket.svg":Qb,"../assets/items/packs/welcome-home/round-rug.png":Ab,"../assets/items/packs/welcome-home/round-rug.svg":Rb,"../assets/items/packs/welcome-home/sale-sign.png":zb,"../assets/items/packs/welcome-home/sale-sign.svg":Db,"../assets/items/packs/welcome-home/sprout-pot.png":Ib,"../assets/items/packs/welcome-home/sprout-pot.svg":qb,"../assets/items/packs/welcome-home/stripe-runner.png":Ob,"../assets/items/packs/welcome-home/stripe-runner.svg":Nb,"../assets/items/packs/welcome-home/trailing-plant.png":jb,"../assets/items/packs/welcome-home/trailing-plant.svg":Fb,"../assets/items/packs/welcome-home/wall-clock.png":Zb,"../assets/items/packs/welcome-home/wall-clock.svg":Vb,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.png":Gb,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.svg":Kb,"../assets/items/packs/welcome-home/wh-book-stack.png":Yb,"../assets/items/packs/welcome-home/wh-book-stack.svg":Xb,"../assets/items/packs/welcome-home/wh-dresser.png":Jb,"../assets/items/packs/welcome-home/wh-dresser.svg":ev,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.png":tv,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.svg":nv,"../assets/items/packs/welcome-home/wh-kitchen-counter.png":sv,"../assets/items/packs/welcome-home/wh-kitchen-counter.svg":ov,"../assets/items/packs/welcome-home/wh-nightstand.png":iv,"../assets/items/packs/welcome-home/wh-nightstand.svg":av,"../assets/items/packs/welcome-home/wh-pendant-lamp.png":rv,"../assets/items/packs/welcome-home/wh-pendant-lamp.svg":lv,"../assets/items/packs/welcome-home/wh-snake-plant.png":cv,"../assets/items/packs/welcome-home/wh-snake-plant.svg":dv,"../assets/items/packs/welcome-home/wh-string-lights.png":gv,"../assets/items/packs/welcome-home/wh-string-lights.svg":fv,"../assets/items/packs/welcome-home/wh-teapot.png":hv,"../assets/items/packs/welcome-home/wh-teapot.svg":pv,"../assets/items/packs/welcome-home/wood-armchair.png":uv,"../assets/items/packs/welcome-home/wood-armchair.svg":mv,"../assets/items/packs/welcome-home/wood-bookshelf.png":yv,"../assets/items/packs/welcome-home/wood-bookshelf.svg":kv,"../assets/items/packs/welcome-home/wood-coffee-table.png":bv,"../assets/items/packs/welcome-home/wood-coffee-table.svg":vv,"../assets/items/packs/welcome-home/wood-desk.png":wv,"../assets/items/packs/welcome-home/wood-desk.svg":$v,"../assets/items/packs/welcome-home/wood-stool.png":xv,"../assets/items/packs/welcome-home/wood-stool.svg":_v,"../assets/items/packs/welcome-home/wooden-bed.png":Mv,"../assets/items/packs/welcome-home/wooden-bed.svg":Lv}),il=Object.assign({"../assets/patterns/cottage/cc-butter-polka.png":Cv,"../assets/patterns/cottage/cc-butter-polka.svg":Sv,"../assets/patterns/cottage/cc-cream-hex.png":Bv,"../assets/patterns/cottage/cc-cream-hex.svg":Wv,"../assets/patterns/cottage/cc-lavender-lattice.png":Tv,"../assets/patterns/cottage/cc-lavender-lattice.svg":Pv,"../assets/patterns/cottage/cc-lilac-gingham.png":Hv,"../assets/patterns/cottage/cc-lilac-gingham.svg":Uv,"../assets/patterns/cottage/cc-mint-checks.png":Ev,"../assets/patterns/cottage/cc-mint-checks.svg":Qv,"../assets/patterns/cottage/cc-mint-florals.png":Av,"../assets/patterns/cottage/cc-mint-florals.svg":Rv,"../assets/patterns/cottage/cc-peach-scallops.png":zv,"../assets/patterns/cottage/cc-peach-scallops.svg":Dv,"../assets/patterns/cottage/cc-pink-plaid.png":Iv,"../assets/patterns/cottage/cc-pink-plaid.svg":qv,"../assets/patterns/cottage/cc-rag-planks.png":Ov,"../assets/patterns/cottage/cc-rag-planks.svg":Nv,"../assets/patterns/cottage/cc-rose-herringbone.png":jv,"../assets/patterns/cottage/cc-rose-herringbone.svg":Fv,"../assets/patterns/glossy/lilac-stripes.png":Zv,"../assets/patterns/glossy/lilac-stripes.svg":Vv,"../assets/patterns/glossy/lilac-terrazzo.png":Gv,"../assets/patterns/glossy/lilac-terrazzo.svg":Kv,"../assets/patterns/glossy/mint-bubbles.png":Yv,"../assets/patterns/glossy/mint-bubbles.svg":Xv,"../assets/patterns/glossy/pink-check-floor.png":Jv,"../assets/patterns/glossy/pink-check-floor.svg":e4,"../assets/patterns/glossy/pink-hearts.png":t4,"../assets/patterns/glossy/pink-hearts.svg":n4,"../assets/patterns/nursery/cloud-sky.svg":s4,"../assets/patterns/nursery/pastel-planks.svg":o4,"../assets/patterns/nursery/soft-carpet.svg":i4,"../assets/patterns/nursery/star-sprinkle.svg":a4,"../assets/patterns/nursery/tiny-hearts.svg":r4,"../assets/patterns/sunny-vibes/butter-check-floor.png":l4,"../assets/patterns/sunny-vibes/butter-check-floor.svg":c4,"../assets/patterns/sunny-vibes/mint-checks.png":d4,"../assets/patterns/sunny-vibes/mint-checks.svg":g4,"../assets/patterns/sunny-vibes/sky-clouds.png":f4,"../assets/patterns/sunny-vibes/sky-clouds.svg":h4,"../assets/patterns/sunny-vibes/sky-tiles.png":p4,"../assets/patterns/sunny-vibes/sky-tiles.svg":u4,"../assets/patterns/sunny-vibes/sunny-stars.png":m4,"../assets/patterns/sunny-vibes/sunny-stars.svg":y4,"../assets/patterns/welcome-home/leafy-cream.png":k4,"../assets/patterns/welcome-home/leafy-cream.svg":b4,"../assets/patterns/welcome-home/orange-gingham.png":v4,"../assets/patterns/welcome-home/orange-gingham.svg":w4,"../assets/patterns/welcome-home/terracotta-tiles.png":$4,"../assets/patterns/welcome-home/terracotta-tiles.svg":x4,"../assets/patterns/welcome-home/wood-panel.png":_4,"../assets/patterns/welcome-home/wood-panel.svg":M4,"../assets/patterns/welcome-home/wood-planks.png":L4,"../assets/patterns/welcome-home/wood-planks.svg":C4});function W4(e,t){if(!e||!e.trim())return[];try{const n=JSON.parse(e);return(Array.isArray(n)?n:[...Array.isArray(n?.items)?n.items:[],...Array.isArray(n?.patterns)?n.patterns:[]]).filter(o=>o&&typeof o.slug=="string"&&o.slug.trim())}catch(n){return console.warn(`[packs] ${t} is not valid JSON; ignoring`,n),[]}}const Mc=Object.entries(B4).flatMap(([e,t])=>W4(t,e)),T4=["svg","png","webp","SVG","PNG","WEBP"];function Lc(e,t,n,s){for(const i of T4){const a=e[`../assets/${t}/${n}/${s}.${i}`];if(a)return a}const o=Object.keys(e).find(i=>i.split("/").pop().replace(/\.\w+$/,"")===s);return o?e[o]:void 0}const al={furniture:"furniture",appliance:"furniture",appliances:"furniture",seating:"furniture",storage:"furniture",bed:"furniture",table:"furniture",decor:"decor",rug:"decor",rugs:"decor",lighting:"decor",light:"decor",lamp:"decor",toy:"decor",toys:"decor","wall-art":"decor",art:"decor",beauty:"decor",plant:"plants",plants:"plants",flower:"plants",flowers:"plants",food:"food",drink:"food",drinks:"food",snack:"food",pet:"pets",pets:"pets",animal:"pets",animals:"pets"};function P4(e){const t=typeof e=="string"?e.trim().toLowerCase():"";return al[t]??al[t.replace(/s$/,"")]??"decor"}const Xn=(e,t)=>typeof e=="string"&&e.trim()?e.trim().toLowerCase():t,Cc=e=>["wallpaper","floor"].includes(Xn(e.type,"")),rl=new Set,H4=Mc.filter(e=>!Cc(e)).flatMap(e=>{const t=Xn(e.room,"any"),n=e.slug.trim();if(rl.has(n))return[];rl.add(n);const o=[e.svg,e.png].filter(h=>typeof h=="string").map(h=>ol["../assets/items/"+h.replace(/^\.?\//,"")]).find(Boolean)??Lc(ol,"items",t,n);if(!o)return console.warn(`[packs] no image for items/${t}/${n}`),[];const i=Xn(e.pack,""),a=Xn(e.size,"medium"),r=P4(e.category),l=typeof e.gameW=="number"&&e.gameW>20&&e.gameW<800?e.gameW:sl[a]??sl.medium,c=typeof e.widthUnits=="number"&&typeof e.heightUnits=="number"&&e.widthUnits>0&&e.heightUnits>0?e.heightUnits/e.widthUnits:1,d=Math.round(l*Math.min(4,Math.max(.2,c))),g=typeof e.holdable=="boolean"?e.holdable:a!=="large"&&r!=="furniture",f=e.tag==="lighting"||/lamp|light|lantern|candle/i.test(n);return[{kind:`pack:${n}`,name:e.name||n,cat:r,rooms:[t],w:l,h:d,wall:e.wall===!0||void 0,svg:"",img:o,pack:i||void 0,holdable:g,light:f||void 0}]}),ba=Mc.filter(Cc).flatMap(e=>{const t=Xn(e.pack,"extra"),n=e.slug.trim(),o=[e.svg,e.png].filter(i=>typeof i=="string").map(i=>il["../assets/patterns/"+i.replace(/^\.?\//,"")]).find(Boolean)??Lc(il,"patterns",t,n);return o?[{id:`${t}/${n}`,name:e.name||n,pack:t,kind:Xn(e.type,"wallpaper"),url:o}]:(console.warn(`[packs] no image for patterns/${t}/${n}`),[])}),ll=Object.fromEntries(ba.map(e=>[e.id,e])),Bt="#5a3d5c",S=`stroke="${Bt}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Sc=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="2.4" fill="${Bt}"/><circle cx="${t}" cy="${n}" r="2.4" fill="${Bt}"/><circle cx="${e+.8}" cy="${n-.8}" r=".8" fill="#fff"/><circle cx="${t+.8}" cy="${n-.8}" r=".8" fill="#fff"/>`,Bc=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/><ellipse cx="${t}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/>`,be='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>';function Zi(e,t,n){return`${be}<ellipse cx="50" cy="78" rx="28" ry="16" fill="${t}" ${S}/><path d="M24 62 Q50 48 76 62 V78 Q50 92 24 78 Z" fill="${t}" ${S}/>
    <circle cx="50" cy="40" r="18" fill="${e}" ${S}/>${Sc(43,57,40)}${Bc(38,62,48)}<path d="M46 50 q4 3 8 0" fill="none" ${S}/>
    <path d="M38 26 Q50 16 62 26" fill="${n}" ${S}/><circle cx="50" cy="24" r="3" fill="${n}" ${S}/>`}const Wc=[{kind:"crib",name:"Crib",cat:"furniture",w:260,svg:`${be}<rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${S}/><path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${S}/><rect x="6" y="22" width="88" height="12" rx="6" fill="#9ad7f5" ${S}/><rect x="14" y="48" width="72" height="16" rx="6" fill="#ffe0ec"/><ellipse cx="32" cy="56" rx="8" ry="5" fill="#fff" ${S}/><ellipse cx="50" cy="56" rx="8" ry="5" fill="#c9e7ff" ${S}/>`},{kind:"bassinet",name:"Bassinet",cat:"furniture",w:170,svg:`${be}<path d="M18 78 Q8 78 10 64 L22 36 H78 L90 64 Q92 78 82 78 Z" fill="#fff" ${S}/><ellipse cx="50" cy="36" rx="32" ry="10" fill="#fff" ${S}/><path d="M22 40 Q50 52 78 40" fill="#ffe0ec" ${S}/><ellipse cx="50" cy="44" rx="16" ry="7" fill="#fff"/><path d="M30 78 L22 94 M70 78 L78 94" ${S}/><ellipse cx="50" cy="90" rx="28" ry="4" fill="none" ${S}/><path d="M14 22 Q50 4 86 22" fill="none" stroke="#9ad7f5" stroke-width="6" stroke-linecap="round"/>`},{kind:"rocker",name:"Rocker",cat:"furniture",w:190,svg:`${be}<path d="M16 88 Q50 98 84 88" fill="none" ${S}/><path d="M28 84 Q50 74 72 84" fill="#c9a0dc" ${S}/><rect x="30" y="28" width="40" height="36" rx="12" fill="#e4ccf2" ${S}/><path d="M22 48 Q18 70 30 80 H70 Q82 70 78 48 Z" fill="#f6e6ff" ${S}/><rect x="36" y="58" width="28" height="12" rx="6" fill="#ffc8dd" ${S}/><circle cx="50" cy="40" r="6" fill="#fff" opacity=".7"/>`},{kind:"changing-table",name:"Changing Table",cat:"furniture",w:230,svg:`${be}<rect x="8" y="36" width="84" height="16" rx="8" fill="#fff" ${S}/><rect x="14" y="40" width="72" height="8" rx="4" fill="#ffd6e8"/><rect x="16" y="52" width="28" height="32" rx="6" fill="#bde0fe" ${S}/><rect x="56" y="52" width="28" height="32" rx="6" fill="#c9f0d8" ${S}/><path d="M22 60 H38 M22 68 H38 M62 60 H78 M62 68 H78" ${S}/><rect x="18" y="84" width="8" height="10" rx="2" fill="${Bt}"/><rect x="74" y="84" width="8" height="10" rx="2" fill="${Bt}"/><rect x="34" y="22" width="18" height="12" rx="3" fill="#ffe0ec" ${S}/><rect x="54" y="24" width="16" height="10" rx="3" fill="#fff6d8" ${S}/>`},{kind:"toy-bin",name:"Toy Bin",cat:"furniture",w:150,svg:`${be}<path d="M14 40 H86 L78 90 H22 Z" fill="#ffd166" ${S}/><rect x="10" y="32" width="80" height="14" rx="7" fill="#ffe08a" ${S}/><circle cx="36" cy="58" r="8" fill="#ff8fab" ${S}/><rect x="50" y="50" width="16" height="16" rx="3" fill="#8ecae6" ${S}/><circle cx="62" cy="70" r="6" fill="#90e0a8" ${S}/>`},{kind:"baby-shelf",name:"Bookshelf",cat:"furniture",w:150,svg:`${be}<rect x="14" y="8" width="72" height="84" rx="8" fill="#f3d2b5" ${S}/><path d="M14 36 H86 M14 64 H86" ${S}/><rect x="22" y="14" width="8" height="18" rx="2" fill="#ff8fab" ${S}/><rect x="32" y="18" width="8" height="14" rx="2" fill="#8ecae6" ${S}/><rect x="44" y="14" width="8" height="18" rx="2" fill="#ffd166" ${S}/><rect x="58" y="16" width="8" height="16" rx="2" fill="#90e0a8" ${S}/><circle cx="34" cy="50" r="7" fill="#ffadad" ${S}/><rect x="50" y="44" width="18" height="14" rx="3" fill="#c9a0dc" ${S}/><ellipse cx="40" cy="78" rx="14" ry="8" fill="#fff" ${S}/>`},{kind:"doll-rose",name:"Rose Doll",cat:"decor",w:80,svg:Zi("#f6d3b0","#ffc2d4","#ff8fab")},{kind:"doll-honey",name:"Honey Doll",cat:"decor",w:80,svg:Zi("#e0ac69","#cdeffd","#ffd166")},{kind:"doll-cocoa",name:"Cocoa Doll",cat:"decor",w:80,svg:Zi("#8d5524","#d8f3dc","#c9a0dc")},{kind:"crib-mobile",name:"Crib Mobile",cat:"decor",w:150,wall:!0,svg:`<path d="M50 6 V22" ${S}/><ellipse cx="50" cy="28" rx="28" ry="8" fill="#fff" ${S}/><path d="M28 32 V48 M50 36 V58 M72 32 V48" ${S}/><circle cx="28" cy="56" r="8" fill="#ffd166" ${S}/><circle cx="50" cy="68" r="9" fill="#ff8fab" ${S}/><path d="M72 56 l6 4 -6 4 -6 -4 z" fill="#8ecae6" ${S}/><circle cx="28" cy="54" r="2" fill="#fff"/><circle cx="50" cy="66" r="2" fill="#fff"/>`},{kind:"night-light",name:"Night Light",cat:"decor",w:70,svg:`${be}<circle cx="50" cy="46" r="22" fill="#fff6c8" ${S}/><circle cx="50" cy="46" r="12" fill="#ffe08a"/><path d="M50 18 V10 M30 26 L24 20 M70 26 L76 20 M24 46 H14 M86 46 H76" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><rect x="40" y="70" width="20" height="16" rx="4" fill="#c9a0dc" ${S}/><circle cx="50" cy="78" r="3" fill="#ff8fab"/>`},{kind:"bunny-plush",name:"Bunny Plush",cat:"decor",w:90,svg:`${be}<ellipse cx="34" cy="28" rx="8" ry="18" fill="#fff" ${S}/><ellipse cx="66" cy="28" rx="8" ry="18" fill="#fff" ${S}/><ellipse cx="34" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="66" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="50" cy="74" rx="26" ry="18" fill="#fff" ${S}/><circle cx="50" cy="50" r="20" fill="#fff" ${S}/>${Sc(43,57,50)}<path d="M47 58 l3 3 3 -3" fill="none" ${S}/>${Bc(38,62,58)}`},{kind:"stacking-rings",name:"Stacking Rings",cat:"decor",w:70,svg:`${be}<ellipse cx="50" cy="86" rx="26" ry="7" fill="#ff8fab" ${S}/><ellipse cx="50" cy="74" rx="20" ry="6" fill="#ffd166" ${S}/><ellipse cx="50" cy="64" rx="15" ry="5" fill="#8ecae6" ${S}/><ellipse cx="50" cy="56" rx="10" ry="4" fill="#90e0a8" ${S}/><rect x="46" y="28" width="8" height="40" rx="4" fill="#c9a0dc" ${S}/><circle cx="50" cy="24" r="7" fill="#ffb3c6" ${S}/>`},{kind:"rattle",name:"Rattle",cat:"decor",w:60,svg:`${be}<circle cx="38" cy="40" r="20" fill="#ffd166" ${S}/><circle cx="32" cy="34" r="5" fill="#fff" opacity=".7"/><rect x="50" y="52" width="10" height="28" rx="5" fill="#ff8fab" ${S} transform="rotate(-20 55 66)"/><circle cx="68" cy="82" r="8" fill="#8ecae6" ${S}/>`},{kind:"baby-bottle",name:"Baby Bottle",cat:"food",w:55,svg:`${be}<rect x="36" y="8" width="28" height="12" rx="4" fill="#c9a0dc" ${S}/><rect x="42" y="18" width="16" height="8" fill="#fff" ${S}/><path d="M30 30 H70 L66 88 Q50 96 34 88 Z" fill="#e7f6ff" ${S}/><path d="M32 48 H68 L66 80 Q50 88 34 80 Z" fill="#fff" opacity=".85"/><rect x="34" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="46" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="58" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/>`},{kind:"blocks",name:"Baby Blocks",cat:"decor",w:90,svg:`${be}<rect x="14" y="58" width="28" height="28" rx="4" fill="#ff8fab" ${S}/><rect x="40" y="46" width="28" height="28" rx="4" fill="#ffd166" ${S}/><rect x="28" y="28" width="26" height="26" rx="4" fill="#8ecae6" ${S}/><path d="M20 72 H36 M48 60 H62 M34 42 H48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"rocking-horse",name:"Little Rocking Horse",cat:"decor",w:180,svg:`${be}<path d="M12 86 Q50 98 88 82" fill="none" ${S}/><ellipse cx="48" cy="62" rx="26" ry="14" fill="#e6b88a" ${S}/><path d="M62 58 L84 40 Q92 36 90 48 L74 64 Z" fill="#f0d0b0" ${S}/><circle cx="82" cy="42" r="3" fill="${Bt}"/><path d="M70 36 L76 24 L84 34" fill="#ff8fab" ${S}/><rect x="36" y="48" width="16" height="8" rx="3" fill="#c9a0dc" ${S}/><path d="M30 70 L22 84 M58 72 L66 86" ${S}/>`},{kind:"music-box",name:"Music Box",cat:"decor",w:80,svg:`${be}<rect x="22" y="40" width="56" height="46" rx="8" fill="#f6d6ff" ${S}/><path d="M22 40 L50 22 L78 40" fill="#e4ccf2" ${S}/><circle cx="50" cy="64" r="10" fill="#fff" ${S}/><path d="M50 58 V70 M44 64 H56" ${S}/><circle cx="50" cy="30" r="4" fill="#ffd166" ${S}/>`},{kind:"cloud-rug",name:"Nursery Cloud Rug",cat:"decor",w:340,svg:`<ellipse cx="50" cy="78" rx="46" ry="16" fill="#e7f6ff" ${S}/><circle cx="28" cy="70" r="16" fill="#f4fbff" ${S}/><circle cx="50" cy="62" r="18" fill="#fff" ${S}/><circle cx="72" cy="70" r="16" fill="#f4fbff" ${S}/><ellipse cx="50" cy="78" rx="30" ry="8" fill="#d6f0ff"/>`},{kind:"play-mat",name:"Play Mat",cat:"decor",w:300,svg:`<rect x="6" y="62" width="88" height="30" rx="14" fill="#ffe0ec" ${S}/><path d="M50 70 C42 62 30 64 34 74 C38 82 50 88 50 88 C50 88 62 82 66 74 C70 64 58 62 50 70 Z" fill="#ff8fab" ${S}/><circle cx="22" cy="76" r="5" fill="#ffd166" ${S}/><circle cx="78" cy="76" r="5" fill="#8ecae6" ${S}/>`},{kind:"moon-art",name:"Moon and Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M58 18 A28 28 0 1 0 58 78 A18 18 0 1 1 58 18 Z" fill="#fff3b0" ${S}/><path d="M22 30 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1 z" fill="#ffd166" ${S}/><path d="M78 58 l2 5 5 1 -4 4 1 5 -4 -3 -4 3 1 -5 -4 -4 5 -1 z" fill="#c9e7ff" ${S}/>`},{kind:"nursery-dresser",name:"Nursery Dresser",cat:"furniture",w:170,svg:`${be}<rect x="14" y="22" width="72" height="68" rx="8" fill="#f6e2c4" ${S}/><path d="M14 44 H86 M14 66 H86" ${S}/><circle cx="50" cy="34" r="3" fill="${Bt}"/><circle cx="50" cy="55" r="3" fill="${Bt}"/><circle cx="50" cy="76" r="3" fill="${Bt}"/><rect x="30" y="10" width="18" height="12" rx="3" fill="#ffc2d4" ${S}/><rect x="52" y="12" width="16" height="10" rx="3" fill="#c9e7ff" ${S}/>`},{kind:"nursery-lamp",name:"Nursery Lamp",cat:"decor",w:80,svg:`${be}<path d="M28 42 L36 12 H64 L72 42 Z" fill="#fff6c8" ${S}/><rect x="46" y="42" width="8" height="40" rx="4" fill="#c9a0dc" ${S}/><ellipse cx="50" cy="88" rx="20" ry="6" fill="#b388d6" ${S}/><circle cx="46" cy="24" r="3" fill="#fff" opacity=".85"/><path d="M34 20 q6 -8 4 -2" fill="none" stroke="#ffd166" stroke-width="2"/>`},{kind:"nursery-curtains",name:"Curtains",cat:"decor",w:180,wall:!0,svg:`<rect x="16" y="10" width="68" height="50" rx="6" fill="#cfefff" ${S}/><path d="M50 10 V60 M16 34 H84" ${S}/><path d="M8 8 Q18 28 10 92" fill="#ffd6e8" ${S}/><path d="M92 8 Q82 28 90 92" fill="#ffd6e8" ${S}/><rect x="6" y="6" width="88" height="8" rx="3" fill="#f3d2b5" ${S}/>`}],Tc=new Map;let Pc=!1;function U4(){return Pc}function G$(e){Pc=e}function E4(e){return Tc.get(e)}function K$(e,t){Tc.set(e,t)}const ne="#5a3d5c",w=`stroke="${ne}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,qn=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${ne}"/><circle cx="${t}" cy="${n}" r="3" fill="${ne}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,uo=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,ee='<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>',zt=[{kind:"sofa",name:"Sofa",cat:"furniture",w:260,svg:`${ee}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${w}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${w}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${w}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${w}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${w}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${ne}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${ne}"/>`},{kind:"armchair",name:"Armchair",cat:"furniture",w:150,svg:`${ee}<rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${w}/><rect x="6" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${w}/><rect x="72" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${w}/><rect x="24" y="58" width="52" height="24" rx="10" fill="#b8e0f2" ${w}/><rect x="20" y="86" width="6" height="10" rx="2" fill="${ne}"/><rect x="74" y="86" width="6" height="10" rx="2" fill="${ne}"/>`},{kind:"bed",name:"Bed",cat:"furniture",w:300,svg:`${ee}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${w}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${w}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${w}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${w}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${w}/>`},{kind:"table",name:"Table",cat:"furniture",w:200,svg:`${ee}<rect x="4" y="30" width="92" height="14" rx="7" fill="#f4a261" ${w}/><rect x="14" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${w}/><rect x="76" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${w}/><path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".5"/>`},{kind:"chair",name:"Chair",cat:"furniture",w:100,svg:`${ee}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${w}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${w}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${w}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${w}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/>`},{kind:"lamp",name:"Lamp",cat:"furniture",w:90,svg:`${ee}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${w}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${w}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${w}/><circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>`},{kind:"fridge",name:"Fridge",cat:"furniture",w:150,svg:`${ee}<rect x="16" y="4" width="68" height="90" rx="14" fill="#bde0fe" ${w}/><path d="M16 38 H84" ${w}/><rect x="70" y="14" width="5" height="16" rx="2" fill="${ne}"/><rect x="70" y="46" width="5" height="22" rx="2" fill="${ne}"/><circle cx="32" cy="22" r="5" fill="#ff8fab" ${w}/><rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${w}/>`},{kind:"stove",name:"Stove",cat:"furniture",w:170,svg:`${ee}<rect x="8" y="26" width="84" height="68" rx="12" fill="#ffadad" ${w}/><rect x="8" y="18" width="84" height="14" rx="6" fill="#ffd6a5" ${w}/><rect x="20" y="46" width="60" height="36" rx="8" fill="#5a3d5c" opacity=".85"/><rect x="26" y="52" width="48" height="8" rx="4" fill="#fff" opacity=".25"/><circle cx="22" cy="38" r="3" fill="${ne}"/><circle cx="36" cy="38" r="3" fill="${ne}"/><circle cx="78" cy="38" r="3" fill="${ne}"/>`},{kind:"bookshelf",name:"Shelf",cat:"furniture",w:170,svg:`${ee}<rect x="10" y="4" width="80" height="90" rx="10" fill="#d4a373" ${w}/><path d="M10 34 H90 M10 64 H90" ${w}/><rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${w}/><rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${w}/><rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${w}/><rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${w}/><rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${w}/><circle cx="34" cy="80" r="8" fill="#ffadad" ${w}/>`},{kind:"tub",name:"Bathtub",cat:"furniture",w:240,svg:`${ee}<circle cx="30" cy="40" r="7" fill="#bde0fe" ${w}/><circle cx="44" cy="34" r="9" fill="#e0f2ff" ${w}/><circle cx="60" cy="40" r="7" fill="#bde0fe" ${w}/><path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${w}/><rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${w}/><rect x="22" y="88" width="8" height="8" rx="2" fill="${ne}"/><rect x="70" y="88" width="8" height="8" rx="2" fill="${ne}"/>`},{kind:"rug",name:"Rug",cat:"decor",w:320,svg:`<ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${w}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${w}/><ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${w}/>`},{kind:"picture",name:"Picture",cat:"decor",w:130,wall:!0,svg:`<rect x="10" y="20" width="80" height="64" rx="8" fill="#ffd166" ${w}/><rect x="18" y="28" width="64" height="48" rx="4" fill="#bde0fe"/><circle cx="66" cy="40" r="7" fill="#fff3b0"/><path d="M18 76 L38 50 L52 64 L62 54 L82 76 Z" fill="#90e0a8" ${w}/>`},{kind:"window",name:"Window",cat:"decor",w:180,wall:!0,svg:`<rect class="winGlass" x="12" y="8" width="76" height="76" rx="38" fill="#a2d2ff" ${w}/><g class="winDay"><circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/></g><g class="winNight"><circle cx="62" cy="28" r="7" fill="#fff6d8"/><circle cx="28" cy="24" r="1.4" fill="#fff"/><circle cx="44" cy="20" r="1.1" fill="#fff"/><circle cx="70" cy="42" r="1.2" fill="#fff"/><circle cx="36" cy="46" r="1" fill="#fff"/></g><path d="M50 8 V84 M12 50 H88" ${w}/><path d="M4 8 Q20 40 10 90 M96 8 Q80 40 90 90" stroke="#ff8fab" stroke-width="9" fill="none" stroke-linecap="round"/>`},{kind:"clock",name:"Clock",cat:"decor",w:90,wall:!0,svg:`<circle cx="50" cy="50" r="38" fill="#fff" ${w}/><circle cx="50" cy="50" r="30" fill="#fff3b0"/><path d="M50 50 V28 M50 50 L64 58" ${w}/><circle cx="50" cy="50" r="3" fill="${ne}"/>${uo(30,70,66)}`},{kind:"stars",name:"Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M30 20 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffd166" ${w}/><path d="M70 40 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#ffadad" ${w}/><path d="M40 66 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#a2d2ff" ${w}/>`},{kind:"balloon",name:"Balloons",cat:"decor",w:110,svg:`<path d="M38 52 Q44 74 50 96 M64 46 Q58 72 50 96" stroke="${ne}" stroke-width="2" fill="none"/><ellipse cx="36" cy="32" rx="18" ry="22" fill="#ff8fab" ${w}/><ellipse cx="66" cy="28" rx="18" ry="22" fill="#a2d2ff" ${w}/><ellipse cx="30" cy="24" rx="4" ry="7" fill="#fff" opacity=".6"/>`},{kind:"teddy",name:"Teddy",cat:"decor",w:100,svg:`${ee}<circle cx="26" cy="22" r="10" fill="#d4a373" ${w}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${w}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${w}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${w}/>${qn(40,60,36)}<ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/><circle cx="50" cy="46" r="2.5" fill="${ne}"/>${uo(32,68,46)}`},{kind:"ball",name:"Ball",cat:"decor",w:70,svg:`${ee}<circle cx="50" cy="58" r="36" fill="#ffd166" ${w}/><path d="M18 46 Q50 66 82 46 M26 82 Q50 60 74 82" stroke="#ff7096" stroke-width="7" fill="none"/>`},{kind:"tv",name:"TV",cat:"decor",w:170,svg:`${ee}<rect x="6" y="14" width="88" height="62" rx="14" fill="#c9a0dc" ${w}/><rect x="16" y="22" width="68" height="46" rx="8" fill="#a2d2ff"/><path d="M30 6 L44 14 M70 6 L56 14" ${w}/><rect x="36" y="78" width="28" height="16" rx="4" fill="#b388d6" ${w}/>${qn(42,58,42)}<path d="M44 52 q6 5 12 0" ${w} fill="none"/>`},{kind:"plant",name:"Plant",cat:"plants",w:110,svg:`${ee}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${w} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${w} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${w}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${w}/><rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${w}/>`},{kind:"cactus",name:"Cactus",cat:"plants",w:80,svg:`${ee}<rect x="36" y="12" width="28" height="64" rx="14" fill="#80ed99" ${w}/><path d="M36 50 H24 a8 8 0 0 1 -8 -8 V34" fill="none" stroke="${ne}" stroke-width="3.5"/><rect x="12" y="26" width="12" height="22" rx="6" fill="#80ed99" ${w}/><circle cx="50" cy="12" r="6" fill="#ff8fab" ${w}/>${qn(44,56,40)}<path d="M28 74 H72 L66 96 H34 Z" fill="#c9a0dc" ${w}/>`},{kind:"flowers",name:"Flowers",cat:"plants",w:90,svg:`${ee}<path d="M50 70 V30 M50 60 Q30 50 30 30 M50 60 Q70 50 70 30" stroke="#52b788" stroke-width="4" fill="none"/><circle cx="50" cy="26" r="10" fill="#ff8fab" ${w}/><circle cx="30" cy="28" r="9" fill="#ffd166" ${w}/><circle cx="70" cy="28" r="9" fill="#a2d2ff" ${w}/><circle cx="50" cy="26" r="3" fill="#fff"/><path d="M32 66 H68 L62 96 H38 Z" fill="#a2d2ff" ${w}/>`},{kind:"tree",name:"Mini Tree",cat:"plants",w:140,svg:`${ee}<rect x="44" y="54" width="12" height="30" rx="4" fill="#b07d54" ${w}/><circle cx="50" cy="36" r="30" fill="#52b788" ${w}/><circle cx="38" cy="30" r="5" fill="#ff8fab"/><circle cx="62" cy="40" r="5" fill="#ff8fab"/><circle cx="52" cy="22" r="5" fill="#ff8fab"/><path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${w}/>`},{kind:"cake",name:"Cake",cat:"food",w:100,svg:`<rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${w}/><path d="M16 58 q8 10 17 0 q8 10 17 0 q8 10 17 0 q8 10 17 0" fill="#fff" ${w}/><rect x="46" y="28" width="8" height="22" rx="3" fill="#a2d2ff" ${w}/><path d="M50 14 q6 8 0 12 q-6 -4 0 -12" fill="#ffd166" ${w}/><ellipse cx="50" cy="92" rx="40" ry="5" fill="#fff" ${w}/>`},{kind:"apple",name:"Apple",cat:"food",w:60,svg:`<path d="M50 30 C20 18 8 50 22 74 C32 92 44 90 50 86 C56 90 68 92 78 74 C92 50 80 18 50 30 Z" fill="#ff6b6b" ${w}/><path d="M50 30 Q52 16 58 10" ${w} fill="none"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#80ed99" ${w} transform="rotate(-20 64 18)"/><ellipse cx="34" cy="46" rx="5" ry="9" fill="#fff" opacity=".5"/>`},{kind:"donut",name:"Donut",cat:"food",w:70,svg:`<circle cx="50" cy="58" r="36" fill="#e9c46a" ${w}/><path d="M18 52 Q20 26 50 24 Q80 26 82 52 Q76 62 66 56 Q56 66 46 58 Q34 66 24 58 Z" fill="#ff8fab" ${w}/><circle cx="50" cy="52" r="10" fill="#fff" ${w}/><rect x="30" y="36" width="6" height="3" rx="1.5" fill="#a2d2ff" transform="rotate(30 33 37)"/><rect x="64" y="38" width="6" height="3" rx="1.5" fill="#ffd166"/><rect x="56" y="30" width="6" height="3" rx="1.5" fill="#80ed99" transform="rotate(-30 59 31)"/>`},{kind:"pizza",name:"Pizza",cat:"food",w:80,svg:`<path d="M10 20 Q50 6 90 20 L50 94 Z" fill="#ffd166" ${w}/><path d="M10 20 Q50 6 90 20 L86 28 Q50 16 14 28 Z" fill="#e9a96a" ${w}/><circle cx="42" cy="38" r="7" fill="#ff6b6b" ${w}/><circle cx="62" cy="44" r="6" fill="#ff6b6b" ${w}/><circle cx="50" cy="62" r="6" fill="#ff6b6b" ${w}/>`},{kind:"juice",name:"Juice",cat:"food",w:55,svg:`<path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${w}/><path d="M27 44 H73 L70 92 H30 Z" fill="#ffb347"/><path d="M24 26 H76 L70 92 H30 Z" fill="none" ${w}/><path d="M58 30 L66 4" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="60" r="4" fill="#fff" opacity=".6"/>`},{kind:"cat",name:"Toy cat",cat:"pets",w:110,svg:`${ee}<path d="M78 80 Q98 70 90 50" stroke="#ffb347" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="30" ry="20" fill="#ffb347" ${w}/><path d="M22 30 L26 8 L40 22 M78 30 L74 8 L60 22" fill="#ffb347" ${w}/><circle cx="50" cy="42" r="28" fill="#ffc46b" ${w}/>${qn(40,60,40)}<path d="M46 50 q4 4 8 0" ${w} fill="none"/>${uo(32,68,50)}`},{kind:"dog",name:"Puppy",cat:"pets",w:120,svg:`${ee}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#f5ebe0" ${w}/><circle cx="50" cy="42" r="28" fill="#fff" ${w}/><ellipse cx="22" cy="44" rx="10" ry="18" fill="#b07d54" ${w}/><ellipse cx="78" cy="44" rx="10" ry="18" fill="#b07d54" ${w}/><circle cx="60" cy="34" r="8" fill="#e6b88a" opacity=".7"/>${qn(40,60,40)}<ellipse cx="50" cy="52" rx="5" ry="4" fill="${ne}"/><path d="M50 56 v6" ${w}/>`},{kind:"bunny",name:"Bunny",cat:"pets",w:90,svg:`${ee}<ellipse cx="36" cy="22" rx="8" ry="20" fill="#fff" ${w}/><ellipse cx="64" cy="22" rx="8" ry="20" fill="#fff" ${w}/><ellipse cx="36" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="64" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="50" cy="76" rx="28" ry="20" fill="#fff" ${w}/><circle cx="50" cy="52" r="22" fill="#fff" ${w}/>${qn(42,58,50)}<path d="M47 58 l3 3 3 -3" ${w} fill="none"/>${uo(36,64,58)}`},{kind:"fish",name:"Fish Bowl",cat:"pets",w:100,svg:`${ee}<circle cx="50" cy="54" r="40" fill="#cdeffd" ${w}/><path d="M14 46 H86" stroke="#8ecae6" stroke-width="3"/><path d="M60 64 l14 -8 v16 z" fill="#ff9f68" ${w}/><ellipse cx="46" cy="64" rx="16" ry="11" fill="#ffb347" ${w}/><circle cx="40" cy="62" r="2.5" fill="${ne}"/><circle cx="32" cy="38" r="3" fill="#fff" opacity=".8"/><rect x="24" y="10" width="52" height="8" rx="4" fill="#cdeffd" ${w}/>`},{kind:"kennel",name:"Dog Kennel",cat:"pets",w:210,h:175,holdable:!1,vb:"0 0 120 100",svg:`<ellipse cx="60" cy="97" rx="48" ry="3.2" fill="#000" opacity=".12"/><path d="M14 50 L60 12 L106 50 Z" fill="#ff8fab" ${w}/><path d="M28 46 L60 22 L92 46 Z" fill="#ffd6e4"/><rect x="20" y="46" width="80" height="50" rx="10" fill="#fff6ea" ${w}/><path d="M20 56 H100" stroke="#ffc2d4" stroke-width="7"/><path d="M34 96 V58 Q60 36 86 58 V96 Z" fill="#f3e4ff" ${w}/><path d="M40 96 V64 Q60 46 80 64 V96 Z" fill="#ffe8c7"/><circle cx="86" cy="64" r="8" fill="#bde0fe" ${w}/><circle cx="84" cy="62" r="2.2" fill="#fff" opacity=".9"/><path d="M28 62 l2.4 2.4 2.4-2.4 2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4z" fill="#ff8fab" ${w}/><circle cx="30" cy="90" r="3.2" fill="#fff" ${w}/><rect x="32" y="88.4" width="14" height="3.4" rx="1.7" fill="#fff" ${w}/><circle cx="48" cy="90" r="3.2" fill="#fff" ${w}/>`},{kind:"cat-tower",name:"Cat Tower",cat:"pets",w:150,h:225,holdable:!1,vb:"0 0 100 150",svg:`<ellipse cx="50" cy="146" rx="36" ry="3.4" fill="#000" opacity=".12"/><rect x="44" y="30" width="12" height="104" rx="6" fill="#c9a0dc" ${w}/><ellipse cx="50" cy="136" rx="34" ry="10" fill="#ffc8dd" ${w}/><ellipse cx="50" cy="132" rx="26" ry="6" fill="#fff6ea"/><ellipse cx="50" cy="102" rx="30" ry="8" fill="#bde0fe" ${w}/><ellipse cx="50" cy="98" rx="22" ry="4" fill="#fff" opacity=".8"/><ellipse cx="50" cy="64" rx="28" ry="8" fill="#ffd166" ${w}/><ellipse cx="50" cy="60" rx="20" ry="4" fill="#fff6d0"/><circle cx="50" cy="22" r="8" fill="#ff8fab" ${w}/><circle cx="47" cy="19" r="2.2" fill="#fff" opacity=".75"/><g class="dangle"><circle cx="22" cy="126" r="8" fill="#ffb3c6" ${w}/><path d="M22 126 q12 5 7 16" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/></g><circle cx="80" cy="92" r="3.4" fill="#ffd166" ${w}/>`},{kind:"vanity",name:"Vanity",cat:"furniture",w:230,svg:`${ee}<ellipse cx="50" cy="26" rx="24" ry="22" fill="#fff" ${w}/><ellipse cx="50" cy="26" rx="18" ry="16" fill="#cdeffd"/><path d="M38 18 l6 -6 M42 26 l10 -10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="12" r="3" fill="#ffd166" ${w}/><circle cx="74" cy="12" r="3" fill="#ffd166" ${w}/><rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${w}/><rect x="10" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${w}/><rect x="62" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${w}/><circle cx="24" cy="75" r="3" fill="${ne}"/><circle cx="76" cy="75" r="3" fill="${ne}"/><rect x="12" y="90" width="6" height="7" rx="2" fill="${ne}"/><rect x="82" y="90" width="6" height="7" rx="2" fill="${ne}"/>`},{kind:"stool",name:"Vanity Stool",cat:"furniture",w:90,svg:`${ee}<ellipse cx="50" cy="48" rx="34" ry="14" fill="#c9a0dc" ${w}/><ellipse cx="50" cy="44" rx="28" ry="9" fill="#e4ccf2"/><path d="M28 58 L22 94 M72 58 L78 94 M50 62 V94" ${w}/><ellipse cx="50" cy="78" rx="22" ry="4" fill="none" ${w}/>`},{kind:"perfume",name:"Perfume",cat:"decor",w:50,svg:`<rect x="40" y="8" width="20" height="14" rx="5" fill="#ffd166" ${w}/><rect x="46" y="20" width="8" height="10" fill="#fff" ${w}/><path d="M20 50 Q20 30 50 30 Q80 30 80 50 V80 Q80 94 66 94 H34 Q20 94 20 80 Z" fill="#ff8fab" ${w}/><ellipse cx="36" cy="52" rx="5" ry="10" fill="#fff" opacity=".6"/><path d="M50 56 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#fff" opacity=".8"/>`},{kind:"polish",name:"Nail Polish",cat:"decor",w:40,svg:`<rect x="38" y="4" width="24" height="40" rx="8" fill="${ne}"/><path d="M24 54 Q24 42 36 42 H64 Q76 42 76 54 V84 Q76 96 64 96 H36 Q24 96 24 84 Z" fill="#b388d6" ${w}/><ellipse cx="38" cy="62" rx="5" ry="12" fill="#fff" opacity=".55"/>`},{kind:"hairdryer",name:"Hair Dryer",cat:"decor",w:90,svg:`<path d="M60 52 L70 92 Q70 96 64 96 H58 Q52 96 52 90 L46 56 Z" fill="#a2d2ff" ${w}/><rect x="6" y="20" width="62" height="40" rx="20" fill="#bde0fe" ${w}/><ellipse cx="82" cy="40" rx="12" ry="20" fill="#ffc8dd" ${w}/><ellipse cx="82" cy="40" rx="6" ry="11" fill="#fff" ${w}/><circle cx="24" cy="40" r="7" fill="#fff" opacity=".7"/>`},{kind:"mirror",name:"Mirror",cat:"decor",w:120,wall:!0,svg:`<path d="M50 6 C74 6 88 24 88 50 C88 76 72 94 50 94 C28 94 12 76 12 50 C12 24 26 6 50 6 Z" fill="#ffd166" ${w}/><ellipse cx="50" cy="50" rx="30" ry="36" fill="#e0f4ff" ${w}/><path d="M36 34 l10 -10 M36 46 l20 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ff8fab" ${w}/>`}],Hc={sofa:["living"],armchair:["living"],lamp:["living","bedroom"],tv:["living"],rug:["living","bedroom"],picture:["living","bedroom"],bookshelf:["living","bedroom"],bed:["bedroom"],teddy:["bedroom"],stars:["bedroom"],tub:["bedroom"],balloon:["any"],clock:["any"],window:["any"],ball:["any"],vanity:["salon"],stool:["salon"],perfume:["salon"],polish:["salon"],hairdryer:["salon"],mirror:["salon","bedroom"],fridge:["kitchen"],stove:["kitchen"],table:["kitchen","living"],chair:["kitchen","living"]};for(const e of Wc)Hc[e.kind]=["nursery"];zt.push(...Wc);for(const e of zt)e.rooms=Hc[e.kind]??(["food"].includes(e.cat)?["kitchen"]:["any"]);const Q4=new Set(["rug","tv","tree"]);for(const e of zt)e.holdable??=!e.wall&&e.cat!=="furniture"&&e.w<=150&&!Q4.has(e.kind);const A4=[{kind:"ranch-egg",name:"Fresh Egg",cat:"ranch",w:50,holdable:!0,rooms:["any"],svg:`${ee}<path d="M50 30 C70 30 80 62 80 74 C80 90 66 96 50 96 C34 96 20 90 20 74 C20 62 30 30 50 30 Z" fill="#fff6e6" ${w}/><ellipse cx="40" cy="52" rx="6" ry="9" fill="#fff"/>`},{kind:"ranch-carrot",name:"Garden Carrot",cat:"ranch",w:70,holdable:!0,rooms:["any"],svg:`${ee}<path d="M30 40 L78 34 L40 96 Z" fill="#ff922b" ${w}/><path d="M44 50 l10 -2 M42 64 l8 -2 M44 78 l6 -1" ${w}/><path d="M72 36 Q80 14 92 14 M72 36 Q68 14 76 4 M72 36 Q90 30 96 36" fill="none" stroke="#40c057" stroke-width="7" stroke-linecap="round"/>`},{kind:"ranch-bouquet",name:"Ranch Flowers",cat:"ranch",w:80,holdable:!0,rooms:["any"],svg:`${ee}<path d="M50 94 L40 50 M50 94 L50 44 M50 94 L62 50" stroke="#40c057" stroke-width="5" stroke-linecap="round"/><path d="M36 78 L64 78 L56 96 L44 96 Z" fill="#c9a0dc" ${w}/>${[[38,40,"#ff8fab"],[50,30,"#ffd43b"],[64,40,"#74c0fc"],[44,52,"#ff922b"],[58,52,"#c9a0dc"]].map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="9" fill="${n}" ${w}/><circle cx="${e}" cy="${t}" r="3" fill="#fff3b0"/>`).join("")}`}];zt.push(...H4,...Jh,...A4);const He=Object.fromEntries(zt.map(e=>[e.kind,e])),Us=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),et=e=>e.h??e.w,Uc=e=>e.img?`<img class="packimg" src="${Us(e.img)}" alt="${Us(e.name)}" draggable="false" />`:`<svg viewBox="${e.vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${e.svg}</svg>`,Sn=(e,t=!1)=>{const n=U4()?E4(e.kind):void 0;if(!n)return Uc(e);const s=t&&!e.wall?'<i class="artshade" aria-hidden="true"></i>':"",o=e.kind==="window"?'<i class="artnight" aria-hidden="true"></i>':"";return`${s}${o}<img class="packimg artimg" data-kind="${Us(e.kind)}" src="${Us(n)}" alt="${Us(e.name)}" draggable="false" />`};let cl=!1;function R4(){cl||typeof window>"u"||(cl=!0,window.addEventListener("error",e=>{const t=e.target;if(!(t instanceof HTMLImageElement)||!t.classList.contains("artimg")||t.dataset.fell==="1")return;const n=He[t.dataset.kind||""];if(!n)return;t.dataset.fell="1",t.parentElement?.querySelector(".artshade")?.remove(),t.parentElement?.querySelector(".artnight")?.remove();const s=document.createElement("div");s.innerHTML=Uc(n);const o=s.firstElementChild;o&&t.replaceWith(o)},!0))}const dl=new WeakMap;function z4(e){const t=dl.get(e);if(t)return t;if(!e.complete||!e.naturalWidth)return null;const n=document.createElement("canvas");n.width=e.naturalWidth,n.height=e.naturalHeight;const s=n.getContext("2d",{willReadFrequently:!0});if(!s)return null;try{s.drawImage(e,0,0)}catch{return null}const o=s.getImageData(0,0,n.width,n.height).data;return dl.set(e,o),o}function D4(e,t,n){const s=e.getBoundingClientRect();if(s.width<1||s.height<1||!e.naturalWidth)return null;let o=(t-s.left)/s.width;const i=(n-s.top)/s.height;e.closest(".flipped")&&(o=1-o);const a=e.naturalWidth,r=e.naturalHeight,l=Math.min(s.width/a,s.height/r),c=a*l,d=r*l,g=(s.width-c)*.5,f=s.height-d,h=(o*s.width-g)/l,p=(i*s.height-f)/l;return h<0||p<0||h>=a||p>=r?null:{x:h,y:p}}function or(e,t,n){const s=z4(e),o=s&&D4(e,t,n);if(!s||!o)return!s;const i=Math.floor(o.x),r=(Math.floor(o.y)*e.naturalWidth+i)*4+3;return s[r]>24}function I4(e,t){const n=[];try{for(let s=0;s<12;s++){const o=document.elementFromPoint(e,t);if(!o)return null;const i=o.closest("img.artimg");if(i&&!or(i,e,t)){n.push(i),i.style.pointerEvents="none";continue}return o}return null}finally{for(let s=0;s<n.length;s++)n[s].style.pointerEvents=""}}const q4="var(--line)",O4=1.4,_e='fill="#3a1d3c" opacity=".14"',va='fill="#3a1d3c" opacity=".22"',kt={l:[72,172],r:[128,172]},xn={l:[50,233],r:[150,233]},N4={l:[88,238],r:[112,238]};function W(e=3){return`stroke="${q4}" stroke-width="${(e*O4).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"`}function v(e){const n=(Math.round(e*10)/10).toFixed(1);return n.endsWith(".0")?n.slice(0,-2):n}function wa(e,t,n,s,o){const i=o*Math.PI/180,a=e-n,r=t-s,l=Math.cos(i),c=Math.sin(i);return{x:n+a*l-r*c,y:s+a*c+r*l}}function Es(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=(n>>16&255)*(1-t),i=(n>>8&255)*(1-t),a=(n&255)*(1-t);return"#"+s(o)+s(i)+s(a)}function gl(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=n>>16&255,i=n>>8&255,a=n&255;return"#"+s(o+(255-o)*t)+s(i+(255-i)*t)+s(a+(255-a)*t)}function $a(e,t,n,s,o=0){const i=e[0],a=e[1],r=e[0]===t[0]&&e[1]===t[1]?t[0]+.01:t[0],l=t[1],c=r-i,d=l-a,g=Math.hypot(c,d)||1,f=-d/g,h=c/g,p=(i+r)/2+f*o,b=(a+l)/2+h*o,_=n/2,m=s/2,u=(_+m)/2*1.04,k=[i+f*_,a+h*_],M=[r+f*m,l+h*m],T=[r-f*m,l-h*m],H=[i-f*_,a-h*_];return`M${v(k[0])} ${v(k[1])} Q${v(p+f*u)} ${v(b+h*u)} ${v(M[0])} ${v(M[1])} A${v(m)} ${v(m)} 0 0 1 ${v(T[0])} ${v(T[1])} Q${v(p-f*u)} ${v(b-h*u)} ${v(H[0])} ${v(H[1])} A${v(_)} ${v(_)} 0 0 1 ${v(k[0])} ${v(k[1])} Z`}function Mi(e,t,n,s,o){const i=[],a=(t-e)/s;for(let r=0;r<s;r++){const l=e+r*a,c=l+a;i.push(`Q${v((l+c)/2)} ${v(n+o)} ${v(c)} ${v(n)}`)}return i.join(" ")}function xa(e,t,n,s,o,i=0){const a=[];for(let r=0;r<s;r++){const l=i+2*Math.PI*r/s,c=i+2*Math.PI*(r+1)/s,d=(l+c)/2,g=e+n*Math.cos(l),f=t+n*Math.sin(l),h=e+n*Math.cos(c),p=t+n*Math.sin(c),b=e+(n+o)*Math.cos(d),_=t+(n+o)*Math.sin(d);r===0&&a.push(`M${v(g)} ${v(f)}`),a.push(`Q${v(b)} ${v(_)} ${v(h)} ${v(p)}`)}return a.join(" ")+" Z"}function _n(e,t,n,s){const o=e==="arm"?kt[t]:N4[t],i=e==="arm"?t==="l"?s.armL:s.armR:t==="l"?s.legL:s.legR,a=e==="leg"?t==="l"?s.legLLift:s.legRLift:0,r=i||a?` transform="translate(0 ${v(-a)}) rotate(${v(i)} ${o[0]} ${o[1]})"`:"";return`<g class="${e} ${t}"${r} style="transform-box:view-box;transform-origin:${o[0]}px ${o[1]}px">${n}</g>`}const Jt="var(--line)";function Wt(e,t=.8,n=2.2){return e.map(s=>`<path d="${s}" fill="none" stroke="var(--hair-shade)" stroke-width="${n}" stroke-linecap="round" opacity="${t}"/>`).join("")}function _s(e,t=.32){return e.map(n=>`<path d="${n}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${t}"/>`).join("")}function qt(){return'<path d="M54 72 Q62 44 92 38 Q70 50 63 74 Z" fill="#fff" opacity=".45"/><path d="M60 64 Q70 48 86 42" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".8"/><path d="M104 37 Q130 38 145 58 Q128 46 106 43 Z" fill="#fff" opacity=".3"/><circle cx="72" cy="50" r="2" fill="#fff" opacity=".85"/>'}function Oe(e,t,n){return n?`<path d="${e}" fill="url(#${t}h)"/>`:""}const fl="M34 112 Q28 28 100 28 Q172 28 166 112 Q164 146 146 156 L54 156 Q36 146 34 112 Z";function Ye(e,t){return`<path d="${fl}" fill="var(--hair)" ${W(3.2)}/>${Oe(fl,e,t)}`}function Vi(e,t,n,s,o,i,a=10){const r=xa(e+2,t+3,n,12,7,s+.1),l=xa(e,t,n-1,12,7,s);let c=`<path d="${r}" fill="var(--hair-shade)" ${W(3.2)}/><path d="${l}" fill="var(--hair)" ${W(3.2)}/>${Oe(l,o,i)}`;for(let d=0;d<a;d++){const g=d*2.5+s,f=(n-6)*Math.sqrt((d+.5)/a),h=e+f*Math.cos(g),p=t+f*Math.sin(g);c+=`<path d="M${v(h-4)} ${v(p+1)} q1 -5 4.5 -4.5 q3.5 1 2.5 4.5" fill="none" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>`,p<t-2&&h<e+6&&(c+=`<path d="M${v(h-2.5)} ${v(p-2.5)} q2 -2 3.5 -1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`)}return c+=`<ellipse cx="${v(e-10)}" cy="${v(t-12)}" rx="6" ry="3.4" fill="#fff" opacity=".55" transform="rotate(-35 ${v(e-10)} ${v(t-12)})"/>`,c+=`<path d="M${v(e-16)} ${v(t-6)} Q${v(e-6)} ${v(t-18)} ${v(e+4)} ${v(t-14)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>`,c}function Mn(e,t,n,s=6,o=[],i=7){let a=`<path d="M${e} ${t-6} V${n}" stroke="${Jt}" stroke-width="${v(2*s+4.6)}" stroke-linecap="round"/><path d="M${e} ${t-6} V${n}" stroke="var(--hair)" stroke-width="${v(2*s)}" stroke-linecap="round"/>`,r=t,l=0;for(;r<n;){const c=l%2?1:-1;a+=`<path d="M${v(e-c)} ${v(r-4)} Q${v(e+c*s*1.05)} ${v(r-2)} ${v(e+c*s*.55)} ${v(r+4)} Q${v(e)} ${v(r+5.5)} ${v(e-c*1.4)} ${v(r+1)}" fill="none" stroke="var(--hair-shade)" stroke-width="1.7" stroke-linecap="round"/>`,c>0&&(a+=`<path d="M${v(e+1)} ${v(r-2)} q2.2 -.5 3 1.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>`),r+=i,l++}for(let c=0;c<o.length;c++){const d=o[c];a+=`<rect x="${v(e-6.2)}" y="${d-4}" width="12.4" height="8" rx="2.6" fill="var(--acc)" stroke="${Jt}" stroke-width="2"/><rect x="${v(e-4)}" y="${d-2.5}" width="2.6" height="4.5" rx="1" fill="#fff" opacity=".6"/>`}return a+=`<path d="M${e-4} ${n+2} q2 5 4 6 q2 -1 4 -6" fill="var(--hair)" stroke="${Jt}" stroke-width="2"/>`,a}function Vo(e,t,n,s=5.5){let o=`<path d="M${e} ${t} V${n}" stroke="${Jt}" stroke-width="${v(2*s+4)}" stroke-linecap="round"/><path d="M${e} ${t} V${n}" stroke="var(--hair)" stroke-width="${v(2*s)}" stroke-linecap="round"/>`;for(let i=t+8;i<n;i+=16)o+=`<path d="M${v(e-s*.7)} ${i} Q${e} ${i+5} ${v(e+s*.7)} ${i}" fill="none" stroke="var(--hair-shade)" stroke-width="1.6" opacity=".8"/>`;return o+=`<circle cx="${e}" cy="${n+3}" r="${v(s*.55)}" fill="var(--hair)" stroke="${Jt}" stroke-width="2"/>`,o}function Gi(e,t,n,s){return`<path d="${e}" fill="var(--hair)" ${W(3)}/>${Oe(e,t,n)}${Wt(s)}${_s(s.slice(0,2),.45)}`}function On(e,t,n){return`<ellipse cx="${e}" cy="${t}" rx="8" ry="5.5" fill="var(--acc)" ${W(2.4)} transform="rotate(${n} ${e} ${t})"/><ellipse cx="${e-1}" cy="${t-2}" rx="2.4" ry="1.3" fill="#fff" opacity=".6" transform="rotate(${n} ${e-1} ${t-2})"/>`}const Ot='<path d="M42 104 Q44 76 70 66 Q86 74 100 58 Q114 74 130 66 Q156 76 158 104" fill="none" stroke="#3a1d3c" stroke-width="9" opacity=".12"/>';function Ec(e){return e==="puffs"||e==="coily"?"puffs":e==="afro"?"afro":e==="braids"?"braids":e==="boxbraids"?"box":e==="locs"?"locs":e==="sidebraid"?"sidebraid":e==="crown"?"crown":e==="pony"?"pony":e==="sidepony"?"sidepony":e==="pigtails"?"pigtails":e==="halfup"?"halfup":e==="buns"?"buns":e==="topbun"?"topbun":e==="lowbun"?"lowbun":e==="long"?"long":e==="wavy"||e==="wavybob"?e==="wavy"?"wavy":"bob":e==="bob"||e==="curlybob"||e==="sidebangs"?"bob":e==="pixie"?"pixie":(e==="bangs"||e==="short")&&e==="bangs"?"bangs":"short"}function j4(e,t,n){const s=Ec(e);if(s==="puffs"){const o=e==="coily"?26:30;return Vi(48,52,o,0,t,n,12)+Vi(152,52,o,.3,t,n,12)+`<path d="M42 112 Q38 48 100 44 Q162 48 158 112 Q154 144 100 146 Q46 144 42 112 Z" fill="var(--hair)" ${W(3.2)}/>`+On(66,68,-35)+On(134,68,35)}if(s==="afro")return Vi(100,78,78,.2,t,n,14);if(s==="braids")return Ye(t,n)+Mn(34,108,230,5.4,[196])+Mn(166,108,230,5.4,[196]);if(s==="box")return Ye(t,n)+Mn(30,110,228,5,[200],10)+Mn(170,110,228,5,[200],10);if(s==="locs")return Ye(t,n)+Vo(32,112,236)+Vo(168,112,236);if(s==="sidebraid")return Ye(t,n);if(s==="pony"||s==="sidepony"||s==="halfup"){const o=s==="sidepony"?"M118 78 Q150 70 158 120 Q164 160 150 200 Q136 188 138 160 Q132 120 124 96 Z":"M126 40 Q178 28 180 92 Q184 132 168 168 Q160 196 174 220 Q148 212 145 182 Q140 156 152 124 Q160 90 132 64 Z",i=s==="halfup"?70:s==="sidepony"?86:44;return Ye(t,n)+Gi(o,t,n,s==="sidepony"?["M130 96 Q150 120 146 160","M138 110 Q154 140 148 180"]:["M146 56 Q170 88 160 130","M156 66 Q176 100 166 140","M150 150 Q148 180 160 206"])+On(s==="sidepony"?124:128,i,s==="sidepony"?-20:25)}if(s==="pigtails")return Ye(t,n)+Gi("M40 100 Q22 120 28 168 Q34 200 48 214 Q58 196 52 160 Q58 124 56 108 Z",t,n,["M40 120 Q32 150 40 184"])+Gi("M160 100 Q178 120 172 168 Q166 200 152 214 Q142 196 148 160 Q142 124 144 108 Z",t,n,["M160 120 Q168 150 160 184"])+On(52,96,20)+On(148,96,-20);if(s==="buns"){let o="";for(const i of[52,148])o+=`<circle cx="${i}" cy="44" r="24" fill="var(--hair)" ${W(3.2)}/>${n?`<circle cx="${i}" cy="44" r="24" fill="url(#${t}h)"/>`:""}`,o+=Wt([`M${i-14} 48 Q${i-14} 28 ${i} 26 Q${i+16} 30 ${i+14} 48`,`M${i-8} 54 Q${i+8} 56 ${i+12} 48`]),o+=`<path d="M${i-12} 34 Q${i-4} 24 ${i+4} 26" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>`;return o+Ye(t,n)}if(s==="topbun")return`<circle cx="100" cy="30" r="26" fill="var(--hair)" ${W(3.2)}/>${n?`<circle cx="100" cy="30" r="26" fill="url(#${t}h)"/>`:""}<path d="M82 28 Q100 12 118 28" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>${Wt(["M86 36 Q100 24 114 36","M90 42 Q100 34 110 42"])}${Ye(t,n)}`;if(s==="lowbun")return Ye(t,n)+`<circle cx="100" cy="168" r="22" fill="var(--hair)" ${W(3)}/>${n?`<circle cx="100" cy="168" r="22" fill="url(#${t}h)"/>`:""}${On(100,148,0)}`;if(s==="long"||s==="wavy"){const o=s==="wavy"?"M36 108 Q28 160 40 210 Q52 250 46 286 Q70 270 78 230 Q60 180 58 140 Q52 120 48 108 Z M164 108 Q172 160 160 210 Q148 250 154 286 Q130 270 122 230 Q140 180 142 140 Q148 120 152 108 Z":"M38 110 Q30 170 36 240 Q42 280 34 300 L70 292 Q64 240 66 180 Q62 140 56 112 Z M162 110 Q170 170 164 240 Q158 280 166 300 L130 292 Q136 240 134 180 Q138 140 144 112 Z";return`<path d="${o}" fill="var(--hair)" ${W(3)}/>${Oe(o,t,n)}${Ye(t,n)}`}if(s==="bob"){const o=e==="curlybob"?"M30 120 Q24 170 48 196 Q70 210 100 206 Q130 210 152 196 Q176 170 170 120 Q150 150 100 156 Q50 150 30 120 Z":"M32 116 Q26 168 50 190 Q78 204 100 200 Q122 204 150 190 Q174 168 168 116 Q150 148 100 154 Q50 148 32 116 Z";return`<path d="${o}" fill="var(--hair)" ${W(3.2)}/>${Oe(o,t,n)}${Ye(t,n)}`}return Ye(t,n)}function F4(e,t,n){const s=Ec(e),o='<path d="M100 34 V56" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>';if(s==="puffs"||s==="braids"||s==="box"||s==="locs"||s==="afro"||s==="bangs"){const a=s==="afro"?"M48 100 Q52 48 100 40 Q148 48 152 100 Q140 78 100 70 Q60 78 48 100 Z":s==="bangs"?"M40 108 Q36 40 100 34 Q164 40 160 108 L150 96 Q130 108 100 100 Q70 108 50 96 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q154 74 130 62 Q112 70 100 52 Q88 70 70 62 Q46 74 40 106 Z";let r=Ot+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${Oe(a,t,n)}${o}`;return r+=Wt(["M84 44 Q70 52 60 70","M116 44 Q130 52 140 70","M92 40 Q80 48 74 58","M108 40 Q120 48 126 58","M76 42 Q58 56 52 82","M124 42 Q142 56 148 82"]),r+=_s(["M90 36 Q78 42 70 52","M112 36 Q124 42 132 52"]),s==="puffs"?(r+=`<path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="${Jt}" stroke-width="7" stroke-linecap="round"/><path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`,r+=`<path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="${Jt}" stroke-width="7" stroke-linecap="round"/><path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`):s==="braids"||s==="box"?(r+=Mn(48,114,200,5,[156],s==="box"?10:7),r+=Mn(152,114,200,5,[156],s==="box"?10:7)):s==="locs"&&(r+=Vo(46,116,210,4.6)+Vo(154,116,210,4.6)),r+qt()}if(s==="sidebraid"){const a="M40 108 Q36 36 100 32 Q164 36 160 100 Q140 78 100 70 Q70 80 40 108 Z";return Ot+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${Oe(a,t,n)}${Wt(["M70 46 Q86 60 96 74","M120 44 Q136 58 146 74"])}${Mn(150,100,210,5.6,[168],7)}${qt()}`}if(s==="crown"){const a="M40 106 Q36 36 100 32 Q164 36 160 106 Q150 80 100 74 Q50 80 40 106 Z";let r="";for(let l=0;l<7;l++){const c=58+l*14;r+=`<path d="M${c} 58 Q${c+7} 46 ${c+14} 58" fill="none" stroke="var(--hair-shade)" stroke-width="3.2" stroke-linecap="round"/>`}return Ot+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${Oe(a,t,n)}${r}${qt()}`}if(s==="pony"||s==="sidepony"||s==="halfup"||s==="pigtails"){const a=s==="sidepony"?"M40 108 Q34 36 100 32 Q166 34 160 108 Q150 86 120 78 Q90 90 60 74 Q48 90 40 108 Z":"M40 108 Q34 34 100 32 Q166 34 160 108 Q156 84 144 72 Q128 86 104 80 Q86 78 72 68 Q60 84 48 84 Q42 94 40 108 Z";let r=Ot+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${Oe(a,t,n)}`;return r+=`<path d="M40 104 Q36 120 44 132 Q46 116 50 106 Z" fill="var(--hair)" ${W(2.4)}/><path d="M160 104 Q164 120 156 132 Q154 116 150 106 Z" fill="var(--hair)" ${W(2.4)}/>`,r+=Wt(["M70 46 Q90 60 104 74","M128 46 Q140 60 146 74","M96 40 Q110 56 116 66"]),r+=_s(["M76 42 Q92 52 100 62"]),r+qt()}if(s==="buns"||s==="topbun"||s==="lowbun"){const a=s==="topbun"?"M44 108 Q40 50 100 46 Q160 50 156 108 Q148 82 100 74 Q52 82 44 108 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q152 80 138 70 Q126 80 112 76 Q104 82 100 74 Q96 82 88 76 Q74 80 62 70 Q48 80 40 106 Z";let r=Ot+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${Oe(a,t,n)}`;if(r+=Wt(["M80 42 Q72 56 68 68","M120 42 Q128 56 132 68","M100 36 Q98 56 100 70","M90 38 Q84 56 86 72","M110 38 Q116 56 114 72"]),r+=_s(["M86 38 Q80 46 78 54","M114 38 Q120 46 122 54"]),s==="buns")for(const[l,c]of[[42,1],[158,-1]]){const d=`M${l} 100 q${-8*c} 14 ${-2*c} 24 q${5*c} 8 ${-1*c} 14`;r+=`<path d="${d}" fill="none" stroke="${Jt}" stroke-width="7" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`}return r+qt()}if(s==="long"||s==="wavy"||s==="bob"){const a=e==="sidebangs"||e==="wavybob"?"M38 108 Q34 40 70 36 Q100 34 112 48 Q90 70 48 78 Q36 90 38 108 Z M112 48 Q140 36 164 50 Q166 100 150 108 Q130 80 112 70 Z":"M40 108 Q34 36 100 32 Q166 36 160 108 Q152 78 128 68 Q112 78 100 60 Q88 78 72 68 Q48 78 40 108 Z";return Ot+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${Oe(a,t,n)}${Wt(["M78 46 Q68 64 64 80","M122 46 Q132 64 136 80","M100 38 V64"])}${_s(["M88 40 Q80 50 76 60"])}${qt()}`}if(s==="pixie"){const a="M48 104 Q44 48 100 40 Q140 46 150 78 Q156 100 140 108 Q120 86 100 90 Q70 84 52 104 Z";return Ot+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${Oe(a,t,n)}${Wt(["M70 56 Q86 70 96 84","M118 52 Q132 66 138 82"])}${qt()}`}const i="M46 106 Q42 46 100 38 Q158 46 154 106 Q140 80 100 76 Q60 80 46 106 Z";return Ot+`<path d="${i}" fill="var(--hair)" ${W(3.2)}/>${Oe(i,t,n)}${o}${qt()}`}const os="var(--line)";function Pn(e,t,n,s=[]){const o=s.map(i=>`<path d="${i}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`).join("");return(n?`<path d="${e}" fill="url(#${t}c)"/>`:"")+o}function _a(e,t,n){const s=(n+7).toFixed(1);return`<path d="${e}" fill="none" stroke="${os}" stroke-width="${s}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function ir(e,t,n){return _n("arm",e,t,n)}function Co(e,t,n=!1){const[s,o]=kt[e],i=e==="l"?-1:1;let a=_a(`M${s} ${o} L${s+7*i} ${o+20}`,"var(--top)",22);return n&&(a+=`<path d="M${s+7*i-12} ${o+17} H${s+7*i+12}" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round" opacity=".9" transform="rotate(${-18*i} ${s+7*i} ${o+17})"/>`),ir(e,a,t)}function Qs(e,t,n=!0){const[s,o]=kt[e],[i,a]=xn[e],r=e==="l"?-1:1,l=(s+i)/2+6*r;let c=_a(`M${s-2*r} ${o-2} Q${l} ${(o+a)/2-6} ${i-r} ${a-16}`,"var(--top)",21);return n&&(c+=_a(`M${i-3*r} ${a-17} L${i-r} ${a-13}`,"var(--top-trim)",20)),ir(e,c,t)}function Ma(e,t,n=!1){const[s,o]=kt[e],i=e==="l"?-1:1,a=s+4*i,r=o+8;let l=`<path d="${xa(a,r,13,9,3.2)}" fill="var(--top)" ${W(2.8)}/>`;return l+=`<ellipse cx="${a-4*i}" cy="${r-5}" rx="5" ry="3" fill="#fff" opacity=".45"/>`,n&&(l+=`<path d="M${a-11} ${r+13} ${Mi(a-11,a+11,r+13,4,3)}" fill="none" stroke="#fff" stroke-width="2.4"/>`),ir(e,l,t)}function Xe(e,t){return e("l",t)+e("r",t)}const hl="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 228 Q100 236 64 228 Z";function kn(e,t,n,s,o,i,a="",r=[],l=!1){const c=`<path d="${t}" fill="var(--top)" ${W(3)}/>${Pn(t,s,o,r)}${a}`;return`<g class="shirt" data-hem="${i}">${l?c+n:n+c}</g>`}function Z4(e,t,n,s,o){if(t.dress)return"";const i=t.top;if(i==="hoodie"){const l="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L139 230 Q100 240 61 230 Z",c=`<path d="M120 162 Q132 164 134 170 L139 230 Q128 233 123 233 Z" ${_e}/><path d="M72 172 Q76 164 86 163" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".38"/><path d="M78 159 Q100 182 122 159 Q120 152 100 152 Q80 152 78 159 Z" fill="var(--top-trim)" ${W(2.8)}/><path d="M92 172 v18 M108 172 v18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="92" cy="191" r="2.6" fill="#fff" ${W(1.8)}/><circle cx="108" cy="191" r="2.6" fill="#fff" ${W(1.8)}/><path d="M78 202 H122 L127 222 H73 Z" fill="var(--top)" ${W(2.6)}/><path d="M78 202 H122 L124 210 H76 Z" ${_e}/><path d="M61 226 Q100 236 139 226 L139 234 Q100 244 61 234 Z" fill="var(--top-trim)" ${W(2.8)}/>`;return kn(e,l,Xe(Qs,e),n,s,o,c,["M74 196 q-2 12 2 22","M126 190 q2 14 0 26"])}if(i==="stripes"||i==="jersey"){const l="M68 168 Q74 158 92 158 H108 Q126 158 132 168 L135 232 Q100 238 65 232 Z",c=`${n}st`,d=i==="jersey"?'<path d="M70 176 H130 L128 188 H72 Z" fill="var(--top-trim)"/><path d="M68 210 H132 L130 222 H70 Z" fill="var(--top-trim)"/>':[166,179,192,205,218,231].map(p=>`<rect x="60" y="${p}" width="80" height="6" fill="var(--top-trim)"/>`).join(""),g=i==="jersey"?'<path d="M86 160 L100 176 L114 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/>':'<path d="M84 159 Q100 172 116 159" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',f=s?`<path d="${l}" fill="url(#${n}c)"/>`:"";return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${c}"><path d="${l}"/></clipPath></defs>${Xe(p=>Co(p,e,!0),e)}<path d="${l}" fill="var(--top)"/><g clip-path="url(#${c})">${f}<path d="M118 160 L135 168 L138 236 H120 Z" ${_e}/>${d}</g><path d="${l}" fill="none" ${W(3)}/>${g}<path d="M78 198 q-2 12 1 24" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/><path d="M122 190 q2 14 0 28" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/></g>`}if(i==="sweater"||i==="cardigan"){const l=i==="cardigan"?"M68 168 Q74 158 92 158 H108 Q126 158 132 168 L134 232 H108 L100 210 L92 232 H66 Z":"M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 234 Q100 242 64 234 Z",c=`<path d="M118 166 L134 174 L136 230 Q120 236 112 228 Z" ${_e}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M64 226 Q100 236 136 226" fill="none" stroke="var(--top-trim)" stroke-width="6" stroke-linecap="round"/>`,d=i==="cardigan"?[186,202,218].map(g=>`<circle cx="100" cy="${g}" r="2.4" fill="var(--top-trim)" ${W(1.4)}/>`).join(""):"";return kn(e,l,Xe(Qs,e),n,s,o,c+d,["M80 190 q-2 16 0 28","M120 188 q2 16 0 30"])}if(i==="tank"||i==="bib"){const l=i==="bib"?"M78 168 H122 L126 228 H74 Z":"M78 168 Q86 160 96 164 H104 Q114 160 122 168 L128 226 H72 Z",c=`<path d="M110 172 H126 L128 226 H114 Z" ${_e}/><path d="M82 176 Q84 168 92 166" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".35"/>`,d=i==="bib"?`${c}<path d="M86 150 L78 168 M114 150 L122 168" stroke="${os}" stroke-width="8" stroke-linecap="round"/><path d="M86 150 L78 168 M114 150 L122 168" stroke="var(--top)" stroke-width="4.5" stroke-linecap="round"/><rect x="90" y="176" width="20" height="16" rx="3" fill="var(--top-trim)" ${W(1.6)}/>`:`${c}<path d="M84 166 Q100 176 116 166" fill="none" stroke="var(--top-trim)" stroke-width="4"/>`;return kn(e,l,"",n,s,o,d,["M88 190 q2 14 0 24"])}if(i==="puff"||i==="ruffle"){const l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L132 222 H68 Z",c=`<path d="M100 172 l-8 -5 v10 z M100 172 l8 -5 v10 z" fill="var(--top-trim)" ${W(1.8)}/><path d="M97 174 l-4 10 M103 174 l4 10" stroke="var(--top-trim)" stroke-width="2.6" stroke-linecap="round"/>`,d=(i==="ruffle"?`<path d="M68 166 Q74 178 82 166 Q90 180 100 166 Q110 180 118 166 Q126 180 132 166" fill="var(--top-trim)" ${W(2)}/>`:c)+`<path d="M118 162 Q128 164 130 170 L132 222 H120 Z" ${_e}/><path d="M74 176 Q76 168 84 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return kn(e,l,Xe(Ma,e),n,s,o,d,["M86 190 q2 10 0 20","M116 188 q-2 12 0 22"],!0)}if(i==="button"){const l=hl,c=[180,196,212].map(g=>`<circle cx="100" cy="${g}" r="2.6" fill="#fff" ${W(1.6)}/>`).join(""),d=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${_e}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M100 164 V226" stroke="#fff" stroke-width="2" opacity=".7"/>${c}<path d="M82 160 Q100 172 118 160" fill="var(--top)" ${W(2.2)}/>`;return kn(e,l,Xe(g=>Co(g,e,!1),e),n,s,o,d,["M78 196 q-1 12 2 20"])}if(i==="raincoat"){const l="M62 168 Q70 156 92 156 H108 Q130 156 138 168 L146 240 Q100 252 54 240 Z",c=`<path d="M120 164 L142 176 L146 236 Q124 244 116 232 Z" ${_e}/><path d="M72 176 Q76 166 88 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M70 156 Q100 176 130 156" fill="none" stroke="var(--top-trim)" stroke-width="6"/><circle cx="100" cy="196" r="4" fill="var(--top-trim)" ${W(1.8)}/><path d="M78 214 H122" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round"/>`;return kn(e,l,Xe(Qs,e),n,s,o,c,["M76 190 q-4 18 -2 36","M124 188 q4 18 2 36"])}const a=hl,r=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${_e}/><path d="M84 160 Q100 172 116 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return kn(e,a,Xe(l=>Co(l,e,!1),e),n,s,o,r,["M78 196 q-2 12 1 22","M122 194 q2 14 -1 24"])}function pl(e,t,n,s,o,i=!1,a=16){const r=e==="l"?88:112,l=e==="l"?-1:1,c=`M${r-a/2} 226 Q${r-a/2+l} ${n-20} ${r-a/2+2*l} ${n} H${r+a/2} Q${r+a/2} ${n-30} ${r+a/2-l} 226 Z`;let d=`<path d="${c}" fill="var(--bottom)" ${W(2.8)}/>`;return d+=Pn(c,s,o,[`M${r-4*l} 240 Q${r} ${(226+n)/2} ${r+3*l} ${n-14}`]),e==="r"?d+=`<path d="M${r+1} 230 H${r+a/2} L${r+a/2} ${n} H${r+4} Z" ${_e}/>`:d+=`<path d="M${r-2} 238 Q${r-6} ${(226+n)/2} ${r-2} ${n-10}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".3"/>`,i&&(d+=`<path d="M${r-a/2-1} ${n-8} H${r+a/2+1} V${n+1} H${r-a/2-1} Z" fill="var(--bottom-trim)" ${W(2)}/>`),_n("leg",e,d,t)}function V4(e,t,n,s){if(t.dress)return'<g data-layer="bottom"></g>';const o=t.bottom;if(o==="skirt"){const f="M68 222 H132 L146 262 Q100 274 54 262 Z";return`<g data-layer="bottom"><path class="skirt" d="${f}" fill="var(--bottom)" ${W(3)}/>${Pn(f,n,s,["M82 234 L76 258","M100 232 V266","M118 234 L126 258"])}<path d="M114 224 H132 L146 262 Q130 268 118 266 Z" ${_e}/><path d="M72 228 Q66 246 64 258" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".3"/><path d="M84 236 v10 M116 236 v10" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/></g>`}if(o==="tutu")return'<g data-layer="bottom"></g>';if(o==="overalls"){const f="M66 220 H134 L139 264 H106 L100 254 L94 264 H61 Z";return`<g data-layer="bottom"><g class="leg" style="transform-box:view-box;transform-origin:100px 238px"><path d="${f}" fill="var(--bottom)" ${W(3)}/>${Pn(f,n,s,["M78 232 Q74 248 72 260","M122 230 Q128 248 132 260"])}<path d="M118 222 H134 L139 264 H122 Z" ${_e}/><path d="M64 258 H95 M105 258 H138" stroke="var(--bottom-trim)" stroke-width="4"/></g></g>`}const a=o==="shorts"?256:292,r=o==="joggers"||o==="jeans",l=o==="leggings"?12:o==="shorts"?18:16,c=pl("l",e,a,n,s,r,l)+pl("r",e,a,n,s,r,l),d=o==="jeans"?'<path d="M88 232 V286 M112 232 V286" stroke="#c9a24a" stroke-width="1.4" stroke-dasharray="2 3" opacity=".7"/>':"";return`<g data-layer="bottom">${`<path d="M70 220 H130 V230 H70 Z" fill="var(--bottom)" ${W(2.4)}/>`}${c}${d}</g>`}function G4(e,t,n,s){if(t.dress)return'<g data-layer="bottom-over"></g>';const o=t.bottom;if(o==="overalls"){const i="M78 180 H122 L124 228 H76 Z";return`<g data-layer="bottom-over"><path d="M80 176 L72 164 M120 176 L128 164" stroke="${os}" stroke-width="12" stroke-linecap="round"/><path d="M80 176 L72 164 M120 176 L128 164" stroke="var(--bottom)" stroke-width="7.5" stroke-linecap="round"/><path d="${i}" fill="var(--bottom)" ${W(3)}/>${Pn(i,n,s,["M86 200 q14 6 28 0"])}<path d="M88 190 H112 V206 Q100 212 88 206 Z" fill="var(--bottom-trim)" ${W(2.4)}/><circle cx="82" cy="186" r="3.6" fill="#fff" ${W(2)}/><circle cx="118" cy="186" r="3.6" fill="#fff" ${W(2)}/><path d="M66 222 H134 L135 230 H65 Z" fill="var(--bottom)" ${W(3)}/><path d="M108 180 H122 L124 228 H110 Z" ${_e}/><path d="M82 182 v12" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/></g>`}if(o==="tutu"){let i="";const a=[[266,50,150,8],[256,56,144,7],[246,64,136,6]];for(let l=0;l<a.length;l++){const[c,d,g,f]=a[l],h=`M${d+8} ${c-22} H${g-8} L${g} ${c} ${Mi(g,d,c,6,f)} Z`;i+=`<path class="skirt" d="${h}" fill="var(--bottom)" ${W(2.4)}/>`,i+=`<path d="M${g-20} ${c-16} L${g-6} ${c-2}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".2"/>`}const r="M66 214 H134 V224 H66 Z";return`<g data-layer="bottom-over">${i}<path d="${r}" fill="var(--bottom-trim)" ${W(2.6)}/>${Pn(r,n,s)}</g>`}return'<g data-layer="bottom-over"></g>'}function ul(e,t){return`<path d="M${e} ${t+2} c-3 -5 -9 -1 -5 3 l5 4 l5 -4 c4 -4 -2 -8 -5 -3z" fill="var(--top-trim)" opacity=".85"/>`}function K4(e,t,n,s,o){const i=t.dress;if(!i)return"";const a=`${n}dr`;let r="M72 210 H128 L150 268 Q100 282 50 268 Z",l="M72 168 Q78 158 94 158 H106 Q122 158 128 168 L130 214 H70 Z",c="",d=Xe(p=>Ma(p,e,!0),e),g=!0;i==="sundress"?(r="M76 214 H124 L140 266 Q100 276 60 266 Z",c='<path d="M78 166 Q100 180 122 166" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',d="",g=!1):i==="party"?c=[[64,236],[86,228],[108,234],[130,242],[76,254],[100,250],[122,258],[92,188]].map(([b,_])=>ul(b,_)).join("")+`<path d="M100 214 l-10 -6 v12 z M100 214 l10 -6 v12 z" fill="var(--top-trim)" ${W(1.8)}/><path d="M52 262 Q100 276 148 262" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="1 5" opacity=".85"/>`:i==="pinafore"?(l="M80 176 H120 L122 214 H78 Z",c='<path d="M86 158 L80 178 M114 158 L120 178" stroke="var(--top)" stroke-width="5" stroke-linecap="round"/>',d="",g=!1,r="M74 212 H126 L142 264 Q100 274 58 264 Z"):i==="jumper"?(c=`<path d="M84 160 Q100 174 116 160" fill="var(--top-trim)" ${W(2)}/>`,d=Xe(p=>Co(p,e,!0),e),g=!1):i==="ballet"?(r="M78 214 H122 L132 250 Q100 258 68 250 Z",c=`<path d="M70 248 ${Mi(70,130,248,5,5)}" fill="none" stroke="#fff" stroke-width="2"/>`,d=Xe(Ma,e)):i==="nightgown"?(r="M80 214 H120 L132 270 Q100 278 68 270 Z",c='<path d="M88 164 Q100 176 112 164" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>',d=Xe(Qs,e),g=!1):i==="raindress"?(r="M70 212 H130 L148 268 Q100 280 52 268 Z",c='<path d="M76 168 Q100 186 124 168" fill="none" stroke="var(--top-trim)" stroke-width="5"/><circle cx="100" cy="198" r="3.4" fill="var(--top-trim)"/>',d=Xe(Qs,e),g=!1):(r="M70 214 H130 L152 266 Q100 280 48 266 Z",l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L131 216 H69 Z",c=[[66,236],[86,228],[110,232],[132,240],[76,254],[100,248],[124,258],[56,260],[144,262],[96,266],[84,182],[114,190],[100,200]].map(([b,_])=>ul(b,_)).join("")+`<path d="M112 214 H130 L152 266 Q138 271 128 272 Z" ${_e}/><path d="M118 162 L130 168 L131 216 H120 Z" ${_e}/><path d="M50 262 Q100 276 150 262" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9"/><path d="M60 226 Q56 244 54 258" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/><path d="M68 210 H132 V220 H68 Z" fill="var(--top-trim)" ${W(2.6)}/><path d="M100 215 l-13 -8 v16 z M100 215 l13 -8 v16 z" fill="var(--top-trim)" ${W(2.2)}/><circle cx="100" cy="215" r="3.6" fill="var(--top-trim)" ${W(2)}/><path d="M97 218 l-5 14 M103 218 l5 14" stroke="var(--top-trim)" stroke-width="3" stroke-linecap="round"/><path d="M80 158 Q78 172 94 170 Q99 166 100 162 Q101 166 106 170 Q122 172 120 158 Q100 164 80 158 Z" fill="#fff" ${W(2.4)}/>`);const f=`${r} ${l}`,h=`<path class="skirt" d="${r}" fill="var(--top)" ${W(3)}/><path d="${l}" fill="var(--top)" ${W(3)}/><g clip-path="url(#${a})">${Pn(f,n,s,["M80 226 Q74 248 70 266","M120 226 Q126 248 130 266"])}${c}</g>`;return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${a}"><path d="${f}"/></clipPath></defs>${g?h+d:d+h}</g>`}function Y4(e,t,n,s){const o=e==="l"?`<g transform="translate(${2*s} 0) scale(-1 1)">${n}</g>`:n;return _n("leg",e,o,t)}function X4(e,t){const n=t.shoes;let s="";for(const o of["l","r"]){const i=o==="l"?87:113;let a="";if(n==="sneakers"||n==="lightup"){const r=n==="lightup"?`<circle cx="${i-4}" cy="292" r="2.2" fill="#ff8fab"/><circle cx="${i+4}" cy="296" r="2.2" fill="#8ecae6"/><circle cx="${i}" cy="300" r="2" fill="#ffd166"/>`:"";a=`<path d="M${i} 270 V286" fill="none" stroke="var(--sock)" stroke-width="16" stroke-linecap="round"/><path d="M${i-14} 296 Q${i-14} 284 ${i} 284 Q${i+14} 284 ${i+16} 296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+12} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${W(2.8)}/><path d="M${i-12} 304 H${i+18}" stroke="var(--shoe-trim)" stroke-width="3.5" stroke-linecap="round"/><path d="M${i-6} 290 l5 2 M${i-6} 295 l6 2" stroke="${os}" stroke-width="1.8" stroke-linecap="round"/>${r}`}else if(n==="boots"||n==="rainboots"){const r=n==="rainboots"?248:258,l=n==="boots"?[[-6,272],[5,268],[-2,284],[7,290],[-8,294]].map(([c,d])=>`<circle cx="${i+c}" cy="${d}" r="2.6" fill="#fff" opacity=".9"/>`).join(""):"";a=`<path d="M${i-14} ${r} H${i+14} V296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+10} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${W(2.8)}/><path d="M${i-16} ${r-4} H${i+16} V${r+8} H${i-16} Z" fill="var(--shoe)" ${W(2.6)}/>`+l+(n==="rainboots"?`<path d="M${i-12} ${r+16} H${i+12}" stroke="var(--shoe-trim)" stroke-width="4" stroke-linecap="round"/>`:`<path d="M${i-6} ${r+14} V292" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".45"/>`)}else n==="maryjanes"?a=`<path d="M${i} 266 V290" fill="none" stroke="var(--sock)" stroke-width="15" stroke-linecap="round"/><path d="M${i-12} 274 ${Mi(i-12,i+12,274,4,4)} L${i+12} 268 H${i-12} Z" fill="var(--sock)" ${W(2)}/><path d="M${i-13} 298 Q${i-13} 290 ${i} 290 Q${i+13} 290 ${i+14} 298 Q${i+20} 300 ${i+20} 304 Q${i+20} 309 ${i+8} 309 H${i-12} Q${i-16} 309 ${i-14} 302 Z" fill="var(--shoe)" ${W(2.8)}/><path d="M${i-10} 294 H${i+12}" stroke="${os}" stroke-width="2"/><circle cx="${i+8}" cy="294" r="2.2" fill="var(--acc)"/>`:n==="sandals"?a=`<path d="M${i-12} 298 Q${i-12} 286 ${i} 286 Q${i+12} 286 ${i+14} 296 Q${i+18} 298 ${i+18} 302 Q${i+18} 306 ${i+8} 306 H${i-12} Q${i-16} 306 ${i-14} 300 Z" fill="var(--skin)" ${W(2.4)}/><path d="M${i-14} 304 H${i+18}" stroke="var(--shoe)" stroke-width="5" stroke-linecap="round"/><path d="M${i-8} 292 H${i+10} M${i+2} 300 L${i+8} 290" stroke="var(--shoe)" stroke-width="4" stroke-linecap="round"/><circle cx="${i+2}" cy="293" r="3" fill="var(--shoe-trim)" ${W(1.4)}/>`:n==="slippers"?a=`<path d="M${i-14} 292 Q${i-14} 280 ${i} 278 Q${i+16} 280 ${i+18} 294 Q${i+22} 296 ${i+20} 304 H${i-14} Q${i-18} 304 ${i-16} 296 Z" fill="var(--shoe)" ${W(2.8)}/><path d="M${i-6} 286 q6 -4 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`:a=`<ellipse cx="${i+2}" cy="304" rx="16" ry="7" fill="var(--shoe)" ${W(2.6)}/>`;s+=Y4(o,e,a,i)}return`<g data-layer="shoes">${s}</g>`}const Qc=new Set(["cap","beanie","sunhat"]),J4=new Set(["catears","earmuffs"]);function Ac(e){return e==="afro"?28:e==="topbun"?20:e==="puffs"||e==="coily"?16:e==="buns"||e==="curlybob"?12:e==="long"||e==="wavy"||e==="wavybob"?8:0}function ys(e,t,n){if(!Qc.has(t)&&!J4.has(t))return n;const s=Ac(e);return s?`<g data-hat="${t}" transform="translate(0 ${v(-s)})">${n}</g>`:n}function e6(e,t,n){let s="";for(let l=0;l<n.length;l++)Qc.has(n[l])&&(s=n[l]);if(!s)return"";const o=Ac(t),i=(s==="beanie"?58:s==="cap"?64:62)-o,a=Math.min(70,i),r=t==="afro"||t==="puffs"||t==="coily"?92:78;return`<mask id="${e}hm" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" data-brim="${v(a)}"><rect x="-30" y="-50" width="260" height="420" fill="#fff"/><rect x="${v(100-r)}" y="-50" width="${v(r*2)}" height="${v(a+50)}" fill="#000"/></mask>`}function Ki(e,t,n){return`<g transform="translate(${e} ${t}) scale(${n})"><path d="M0 0 C-8 -14 -30 -14 -28 0 C-30 14 -8 14 0 0 Z" fill="var(--acc)" ${W(2.6)}/><path d="M0 0 C8 -14 30 -14 28 0 C30 14 8 14 0 0 Z" fill="var(--acc)" ${W(2.6)}/><rect x="-6" y="-7" width="12" height="14" rx="4" fill="var(--acc2)" ${W(2.2)}/></g>`}function t6(e){return`<g data-layer="accessory">${e.acc.map(n=>n==="glasses"?'<circle cx="76" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="124" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="76" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><circle cx="124" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3.2"/><path d="M58 108 L42 104 M142 108 L158 104" stroke="var(--frame)" stroke-width="3.2" stroke-linecap="round"/>':n==="square"?'<rect x="58" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><rect x="108" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><path d="M92 112 H108" stroke="var(--frame)" stroke-width="3.2"/>':n==="sunnies"?'<path d="M56 104 H94 Q96 122 76 122 Q56 122 56 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M106 104 H144 Q146 122 124 122 Q104 122 106 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3"/>':n==="bow"?Ki(100,78,.7):n==="bigbow"?Ki(100,70,1.15):n==="headband"?`<path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="${os}" stroke-width="12" stroke-linecap="round"/><path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round"/>${Ki(100,32,.85)}`:n==="flower"?`<g transform="translate(138 78)">${[0,60,120,180,240,300].map(s=>`<ellipse cx="0" cy="-8" rx="5" ry="8" fill="var(--acc)" ${W(1.6)} transform="rotate(${s})"/>`).join("")}<circle r="4.5" fill="var(--acc2)" ${W(1.6)}/></g>`:n==="cap"?ys(e.hair,"cap",`<path d="M54 64 Q56 20 100 16 Q144 20 146 64 Q128 54 100 56 Q72 54 54 64 Z" fill="var(--acc)" ${W(3)}/><path d="M48 56 Q100 66 152 56 L156 62 Q100 70 44 62 Z" fill="var(--acc)" ${W(3)}/><circle cx="100" cy="18" r="4.5" fill="#fff" ${W(2)}/>`):n==="beanie"?ys(e.hair,"beanie",`<path d="M50 66 Q48 14 100 8 Q152 14 150 66 Q128 56 100 58 Q72 56 50 66 Z" fill="var(--acc)" ${W(3)}/><path d="M50 58 H150" stroke="var(--acc2)" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="8" r="7" fill="var(--acc2)" ${W(2.4)}/>`):n==="sunhat"?ys(e.hair,"sunhat",`<path d="M66 56 Q68 22 100 18 Q132 22 134 56 Q118 48 100 50 Q82 48 66 56 Z" fill="var(--acc)" ${W(3)}/><path d="M18 56 Q100 68 182 56 Q170 64 100 66 Q30 64 18 56 Z" fill="var(--acc)" ${W(3)}/><path d="M72 46 Q100 38 128 46" fill="none" stroke="var(--acc2)" stroke-width="4"/>`):n==="catears"?ys(e.hair,"catears",`<path d="M58 62 L70 18 L86 60 Z" fill="var(--acc)" ${W(2.6)}/><path d="M114 60 L130 18 L142 62 Z" fill="var(--acc)" ${W(2.6)}/><path d="M64 54 L72 30 L80 52 Z" fill="var(--acc2)"/><path d="M120 52 L128 30 L136 54 Z" fill="var(--acc2)"/>`):n==="earmuffs"?ys(e.hair,"earmuffs",`<path d="M44 68 Q48 26 100 22 Q152 26 156 68" fill="none" stroke="var(--acc)" stroke-width="6"/><circle cx="34" cy="86" r="14" fill="var(--acc)" ${W(2.8)}/><circle cx="166" cy="86" r="14" fill="var(--acc)" ${W(2.8)}/><circle cx="34" cy="86" r="6" fill="var(--acc2)"/><circle cx="166" cy="86" r="6" fill="var(--acc2)"/>`):"").join("")}</g>`}const n6=[{hip:1.5,head:4,armL:3,armR:-2,legL:0,legR:-3,legLLift:0,legRLift:0},{hip:-2,head:-5,armL:1,armR:-7,legL:4,legR:0,legLLift:2,legRLift:0},{hip:0,head:3,armL:2,armR:-2,legL:0,legR:0,legLLift:0,legRLift:0},{hip:-1.5,head:-4,armL:4,armR:-1,legL:5,legR:0,legLLift:3,legRLift:0}],s6={puffs:0,afro:0,pony:1,sidepony:1,pigtails:1,halfup:1,braids:2,boxbraids:2,locs:2,sidebraid:2,crown:2,buns:3,topbun:3,lowbun:3};function Rc(e){const t=e.hair||"buns";let n=s6[t];if(n===void 0){let s=0;for(let o=0;o<t.length;o++)s=(s+t.charCodeAt(o))%4;n=s}return n6[n]}function o6(e){const t=(n,s,o,i,a)=>{const r=wa(n,s,o,i,a),l=wa(r.x,r.y,100,238,e.hip);return{x:l.x/2,y:l.y/2}};return{left:t(xn.l[0],xn.l[1],kt.l[0],kt.l[1],e.armL),right:t(xn.r[0],xn.r[1],kt.r[0],kt.r[1],e.armR)}}function i6(e){const t=wa(100,244,100,238,e.hip);return Math.round(t.y/2*10)/10}function ar(e){const t=parseInt(e.slice(1),16);return(t>>16&255)+(t>>8&255)+(t&255)}function a6(e){const t=Es(e,.32);return ar(t)<80?"#5a3a2c":t}function r6(e){return ar(e)<140?"#3b2340":Es(e,.12)}let ml=0;function l6(){return ml+=1,"a"+ml.toString(36)}function Ms(e,t){return t.hip?`<g transform="rotate(${v(t.hip)} 100 238)">${e}</g>`:e}function ks(e,t){const n=t.head?`<g transform="rotate(${v(t.head)} 100 158)">${e}</g>`:e;return Ms(n,t)}function c6(e,t,n){let s=`<defs><radialGradient id="${e}b"><stop offset="0" style="stop-color:var(--blush)" stop-opacity=".62"/><stop offset=".55" style="stop-color:var(--blush)" stop-opacity=".28"/><stop offset="1" style="stop-color:var(--blush)" stop-opacity="0"/></radialGradient>`;return s+=`<radialGradient id="${e}s"><stop offset="0" stop-color="#3a1d3c" stop-opacity=".3"/><stop offset=".6" stop-color="#3a1d3c" stop-opacity=".12"/><stop offset="1" stop-color="#3a1d3c" stop-opacity="0"/></radialGradient>`,s+=`<radialGradient id="${e}k" cx=".42" cy=".36" r=".75"><stop offset=".55" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".16"/></radialGradient>`,t&&(s+=`<linearGradient id="${e}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f1020" stop-opacity=".62"/><stop offset=".5" stop-color="#1f1020" stop-opacity=".05"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`,s+=`<linearGradient id="${e}c" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="146" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".2"/></linearGradient>`,s+=`<radialGradient id="${e}h" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1f1020" stop-opacity=".28"/></radialGradient>`),s+n+"</defs>"}function yl(e){const t=e==="l"?-1:1,n=kt[e][0],s=kt[e][1],o=xn[e][0],i=xn[e][1],a=o-t,r=i-7,l=-t;let c=`<path d="${$a([n,s],[a,r],18,13,-3*t)}" fill="var(--skin)" ${W(3)}/>`;return c+=`<path class="hand" d="M${v(o-8)} ${v(i-4)} Q${v(o-8)} ${v(i-10)} ${v(o)} ${v(i-10)} Q${v(o+8)} ${v(i-10)} ${v(o+8)} ${v(i-3)} Q${v(o+8.5)} ${v(i+9)} ${v(o)} ${v(i+9.5)} Q${v(o-8.5)} ${v(i+9)} ${v(o-8)} ${v(i-4)} Z" fill="var(--skin)" ${W(2.8)}/>`,c+=`<ellipse cx="${v(o+7*l)}" cy="${v(i-1)}" rx="3.4" ry="5" fill="var(--skin)" ${W(2.4)} transform="rotate(${-20*l} ${v(o+7*l)} ${v(i-1)})"/>`,c+=`<path d="M${v(o-3*l)} ${v(i+3)} v4 M${v(o+.5*l)} ${v(i+3.5)} v4" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`,c+=`<ellipse cx="${v(o-3*l)}" cy="${v(i-5)}" rx="3" ry="1.8" fill="#fff" opacity=".35"/>`,c}function kl(e){const t=e==="l"?-1:1,n=e==="l"?88:112;let s=`<path d="${$a([n,234],[n+t,294],21,15,1.5*t)}" fill="var(--skin)" ${W(3)}/>`;return s+=`<path d="${$a([n+5*t,244],[n+5*t,290],6,4)}" ${_e}/>`,s+=`<ellipse cx="${v(n+.5*t)}" cy="268" rx="4.5" ry="2.6" fill="#3a1d3c" opacity=".12"/>`,s+=`<path d="M${n-4} 265 q4 -2.5 8 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`,s}function bl(e,t,n,s,o,i){const a=n?-1:1,r=o==="big"||o==="bright"?1.08:o==="soft"?.94:1,l=(m,u)=>`${v(e+m*r)} ${v(t+u*r)}`,c=13.5*r,d=17*r;let g="";if(i&&o!=="soft"){const m=[.35,.95,1.57,2.2,2.8];for(let u=0;u<m.length;u++){const k=m[u];g+=`<path d="M${v(e+5.5*Math.cos(k)*r)} ${v(t+(4+6.5*Math.sin(k))*r)} L${v(e+11.5*Math.cos(k)*r)} ${v(t+(2+14*Math.sin(k))*r)}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>`}}const f=o==="soft"?2:2.6,h=o==="soft"?"":`<path d="M${l(-16*a,-8)} q${v(-6*a*r)} -2 ${v(-9*a*r)} ${v(-9*r)} M${l(-17*a,-2)} q${v(-6*a*r)} ${v(-.5*r)} ${v(-10*a*r)} ${v(-5*r)} M${l(-12*a,-15)} q${v(-3*a*r)} ${v(-4*r)} ${v(-4*a*r)} ${v(-9*r)}" fill="none" stroke="var(--lash)" stroke-width="2.2" stroke-linecap="round"/>`,p=o==="sparkle"||o==="bright"?`<path d="M${l(-9*a,-8)} l.7 1.6 1.6 .7 -1.6 .7 -.7 1.6 -.7 -1.6 -1.6 -.7 1.6 -.7 Z" fill="#fff" opacity=".9"/>`:"",b=i?`<ellipse cx="${e}" cy="${v(t+r)}" rx="${v(c)}" ry="${v(d)}" fill="url(#${s}i)"/>`:"",_=o==="sleepy"?`<path d="M${l(-17,-4)} Q${e} ${v(t+r)} ${l(17,-4)} L${l(18,-16)} Q${e} ${v(t-20*r)} ${l(-18,-16)} Z" fill="var(--skin)"/>`:"";return`<path d="M${l(-16,-2)} Q${l(-16,-20)} ${l(0,-20)} Q${l(16,-20)} ${l(16,-2)} Q${l(16,19)} ${l(0,19)} Q${l(-16,19)} ${l(-16,-2)} Z" fill="#fff"/><path d="M${l(-15,-4)} Q${e} ${v(t-21*r)} ${l(15,-4)} Q${e} ${v(t-14*r)} ${l(-15,-4)} Z" fill="#3a1d3c" opacity=".12"/><ellipse data-iris="1" cx="${e}" cy="${v(t+r)}" rx="${v(c)}" ry="${v(d)}" fill="var(--eye)"/>${b}${g}<ellipse cx="${e}" cy="${v(t+3*r)}" rx="${v(7*r)}" ry="${v(9*r)}" fill="#1f1020" opacity=".8"/><ellipse cx="${e}" cy="${v(t+r)}" rx="${v(11.3*r)}" ry="${v(14.8*r)}" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/><ellipse cx="${e}" cy="${v(t+r)}" rx="${v(c)}" ry="${v(d)}" fill="none" stroke="#1f1020" stroke-width="2" opacity=".55"/><path d="M${l(-9,12)} Q${e} ${v(t+19.5*r)} ${l(9,12)} Q${e} ${v(t+15.5*r)} ${l(-9,12)} Z" fill="#fff" opacity=".5"/><ellipse cx="${v(e-6*a*r)}" cy="${v(t-6*r)}" rx="${v(5.8*r)}" ry="${v(6.8*r)}" fill="#fff" transform="rotate(${-15*a} ${v(e-6*a*r)} ${v(t-6*r)})"/><circle cx="${v(e+6*a*r)}" cy="${v(t+8*r)}" r="${v(2.8*r)}" fill="#fff"/><circle cx="${v(e-4*a*r)}" cy="${v(t+10*r)}" r="${v(1.3*r)}" fill="#fff" opacity=".85"/><path d="M${l(7*a,-10)} l${v(r)} ${v(2.4*r)} ${v(2.4*r)} ${v(r)} ${v(-2.4*r)} ${v(r)} ${v(-r)} ${v(2.4*r)} ${v(-r)} ${v(-2.4*r)} ${v(-2.4*r)} ${v(-r)} ${v(2.4*r)} ${v(-r)} Z" fill="#fff"/>`+p+_+`<path d="M${l(-17,-1)} Q${l(-16,-21)} ${l(0,-21)} Q${l(16,-21)} ${l(17,-3)} Q${l(14.5,-18.6)} ${l(0,-18.8)} Q${l(-14.5,-18.6)} ${l(-15.5,-1)} Z" fill="var(--lash)" stroke="var(--lash)" stroke-width="${f}" stroke-linejoin="round"/>`+h+`<path d="M${l(-11,-23)} Q${e} ${v(t-27*r)} ${l(11,-23)}" fill="none" stroke="var(--line)" stroke-width="1.3" stroke-linecap="round" opacity=".22"/><path d="M${l(-5,20.5)} Q${e} ${v(t+22*r)} ${l(5,20.5)}" fill="none" stroke="var(--lash)" stroke-width="1.3" stroke-linecap="round" opacity=".28"/>`}function d6(e,t,n){const s=e.blush?`<ellipse cx="64" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><ellipse cx="136" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><path d="M60 133 l3 -3 M66 134 l3 -3 M132 133 l3 -3 M138 134 l3 -3" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>`:"";let o="";if(e.freckles){const i=[[58,132],[64,136],[70,131],[130,131],[136,136],[142,132]];for(let a=0;a<i.length;a++)o+=`<circle cx="${i[a][0]}" cy="${i[a][1]}" r="1.5" fill="var(--freckle)" opacity=".7"/>`}return s+o+'<path data-brow="l" d="M64 86 Q74 80 85 84" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/><path data-brow="r" d="M115 84 Q126 80 136 86" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'+bl(76,112,!1,t,e.eyes,n)+bl(124,112,!0,t,e.eyes,n)+'<path d="M98 131 q2 1.8 4 0" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" opacity=".55"/><ellipse cx="101.5" cy="128.5" rx="1.6" ry="1" fill="#fff" opacity=".6"/><path d="M92 140 Q100 147.5 108 140" fill="none" stroke="var(--line)" stroke-width="2.8" stroke-linecap="round"/><path d="M96 142.6 Q100 145.4 104 142.6 Q100 144 96 142.6 Z" fill="#ff8fa8"/>'}function g6(e){const t="M40 102 Q38 38 100 38 Q162 38 160 102 Q160 140 132 153 Q116 160 100 160 Q84 160 68 153 Q40 140 40 102 Z";return`<ellipse cx="39" cy="114" rx="9" ry="11" fill="var(--skin)" ${W(3)}/><ellipse cx="161" cy="114" rx="9" ry="11" fill="var(--skin)" ${W(3)}/><ellipse cx="40" cy="115" rx="4" ry="6" ${va}/><ellipse cx="160" cy="115" rx="4" ry="6" ${va}/><path d="${t}" fill="var(--skin)" ${W(3.2)}/><path d="${t}" fill="url(#${e}k)"/>`}function f6(){return`<path d="M91 146 h18 v22 q-9 5 -18 0 Z" fill="var(--skin)" ${W(3)}/><path d="M91 150 h18 v9 q-9 6 -18 0 Z" ${va}/><path d="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z" fill="var(--skin)" ${W(3)}/>`}function h6(e,t){const n=rs(e),s=Rc(n),o=t?.rich!==!1,i=t?.uid??l6(),a=i6(s),r=n.shoesC,l=r.toLowerCase()==="#ffffff"?n.dress?n.dressC:n.topC:gl(r,.28),c=n.dress?n.dressC:n.topC,d=ar(c)>700?"#8fdcc0":Es(c,.18),g=["--line:#5a3d5c",`--skin:${n.skin}`,`--hair:${n.hairC}`,`--hair-shade:${a6(n.hairC)}`,`--brow:${r6(n.hairC)}`,`--eye:${n.eyeC}`,"--lash:#3b2340","--blush:#ff6f91",`--freckle:${Es(n.skin,.35)}`,`--top:${c}`,`--top-trim:${d}`,`--bottom:${n.dress?n.dressC:n.bottomC}`,`--bottom-trim:${Es(n.dress?n.dressC:n.bottomC,.16)}`,`--shoe:${r}`,`--shoe-trim:${l}`,"--sock:#ffffff",`--acc:${n.accC}`,`--acc2:${gl(n.accC,.18)}`,"--frame:#6e4a5e"].join(";"),f=_n("leg","l",kl("l"),s)+_n("leg","r",kl("r"),s),h=_n("arm","l",`<g class="hand">${yl("l")}</g>`,s)+_n("arm","r",`<g class="hand">${yl("r")}</g>`,s),p=`<g data-layer="body">${f}${Ms(f6()+h,s)}${ks(g6(i),s)}</g>`,b=n.dress?K4(s,n,i,o,a):Z4(s,n,i,o,a),_=`<g class="shadow"><ellipse cx="100" cy="308" rx="52" ry="9" fill="url(#${i}s)"/><ellipse cx="87" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/><ellipse cx="113" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/></g>`,m=e6(i,n.hair,n.acc),u=m?` mask="url(#${i}hm)"`:"",k=[`<g data-layer="hair-back">${ks(`<g${u}>${j4(n.hair,i,o)}</g>`,s)}</g>`,p,X4(s,n),Ms(V4(s,n,i,o),s),Ms(b,s),Ms(G4(s,n,i,o),s),`<g data-layer="face">${ks(d6(n,i,o),s)}</g>`,`<g data-layer="hair-front">${ks(`<g${u}>${F4(n.hair,i,o)}</g>`,s)}</g>`,ks(t6(n),s)].join(""),M=n.dress||n.top;return`<svg data-chibi="1" data-hair="${n.hair}" data-top="${M}" viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" style="${g}">${c6(i,o,m)}${_}${k}</svg>`}function rr(){try{return typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("selector(&)")}catch{return!1}}function Xs(e,t,n){const s=!!(t&&t.look2);e.classList.toggle("chibi",s);const o=s&&rr();e.classList.toggle("chibi-move",s&&(o||n)),e.classList.toggle("chibi-bob",s&&!o&&!n)}const Ne="#5a3d5c",xe=`stroke="${Ne}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,p6=["little","kid","adult"],Js={little:.78,kid:1,adult:1.28},Ls={left:{x:15,y:113},right:{x:85,y:113}};function Li(e){return e.look2?o6(Rc(e.look2)):Ls}function u6(e,t){return e===1?`<path d="M62 16 L76 8 L76 26 Z M62 16 L50 6 L48 24 Z" fill="#ff7aa8" stroke="${Ne}" stroke-width="3" stroke-linejoin="round"/><circle cx="62" cy="16" r="5" fill="#ffd166" stroke="${Ne}" stroke-width="3"/>`:e===2?`<circle cx="40" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${Ne}" stroke-width="3"/><circle cx="60" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${Ne}" stroke-width="3"/><path d="M49 48 h2" stroke="${Ne}" stroke-width="3"/>`:e===3?`<path d="M20 30 Q22 8 50 8 Q78 8 80 30 Z" fill="${t}" stroke="${Ne}" stroke-width="3.5" stroke-linejoin="round"/><path d="M60 28 Q84 26 92 32 Q80 36 60 34 Z" fill="${t}" stroke="${Ne}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="9" r="4" fill="#fff" stroke="${Ne}" stroke-width="3"/>`:""}function vl(e,t,n){return n?e===1?`<path d="M20 40 Q16 86 30 92 L70 92 Q84 86 80 40 Z" fill="${t}" ${xe}/>`:e===2?`<circle cx="18" cy="34" r="12" fill="${t}" ${xe}/><circle cx="82" cy="34" r="12" fill="${t}" ${xe}/>`:e===3?`<circle cx="50" cy="8" r="13" fill="${t}" ${xe}/>`:"":e===3?`<path d="M22 42 Q20 14 50 12 Q80 14 78 42 Q66 26 50 30 Q34 26 22 42 Z" fill="${t}" ${xe}/>`:`<path d="M21 46 Q18 12 50 12 Q82 12 79 46 Q72 30 58 28 Q50 36 36 30 Q26 34 21 46 Z" fill="${t}" ${xe}/>`}function Ue(e){return e.look2?h6(e.look2,{rich:rr()}):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${vl(e.hairStyle,e.hair,!0)}
  <rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${xe}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${xe}/>
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${Ne}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${Ne}"/>
  <rect class="arm" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${xe} transform="rotate(12 22 82)"/>
  <rect class="arm" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${xe} transform="rotate(-12 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${xe}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${xe}/>
  <circle cx="50" cy="44" r="30" fill="${e.skin}" ${xe}/>
  ${vl(e.hairStyle,e.hair,!1)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${Ne}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${Ne}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${xe} fill="none"/>
  ${u6(e.acc??0,e.shirt)}
  <circle class="hand" cx="${Ls.left.x}" cy="${Ls.left.y}" r="6" fill="${e.skin}" ${xe}/><circle class="hand" cx="${Ls.right.x}" cy="${Ls.right.y}" r="6" fill="${e.skin}" ${xe}/>
</svg>`}const m6=[{id:"hair",name:"Hair"},{id:"face",name:"Face"},{id:"clothes",name:"Clothes"},{id:"shoes",name:"Shoes"},{id:"extras",name:"Extras"}],y6={short:"Short",pixie:"Pixie",coily:"Coily",afro:"Afro",bangs:"Bangs",bob:"Bob",wavybob:"Wavy bob",curlybob:"Curly bob",sidebangs:"Side bangs",long:"Long",wavy:"Wavy",braids:"Braids",boxbraids:"Box braids",locs:"Locs",sidebraid:"Side braid",crown:"Crown",pony:"Ponytail",sidepony:"Side pony",pigtails:"Pigtails",halfup:"Half-up",buns:"Buns",puffs:"Puffs",topbun:"Top bun",lowbun:"Low bun"},k6={classic:"Tee",stripes:"Stripes",hoodie:"Hoodie",sweater:"Sweater",tank:"Tank",puff:"Puff",ruffle:"Ruffle",button:"Buttons",jersey:"Jersey",cardigan:"Cardigan",bib:"Bib",raincoat:"Raincoat"},b6={pants:"Pants",jeans:"Jeans",shorts:"Shorts",skirt:"Skirt",tutu:"Tutu",leggings:"Leggings",overalls:"Overalls",joggers:"Joggers"},v6={"":"No dress",twirl:"Twirl",sundress:"Sundress",party:"Party",pinafore:"Pinafore",jumper:"Jumper",ballet:"Ballet",nightgown:"Nightgown",raindress:"Rain"},w6={classic:"Classic",sneakers:"Sneakers",lightup:"Light-up",boots:"Boots",rainboots:"Rain boots",sandals:"Sandals",maryjanes:"Mary Janes",slippers:"Slippers"},$6={round:"Round",big:"Big",sleepy:"Sleepy",sparkle:"Sparkle",soft:"Soft",bright:"Bright"},x6={glasses:"Glasses",square:"Square",sunnies:"Sunnies",bow:"Bow",bigbow:"Big bow",headband:"Headband",flower:"Flower",cap:"Cap",beanie:"Beanie",sunhat:"Sun hat",catears:"Cat ears",earmuffs:"Earmuffs"},_6={little:"Little",kid:"Kid",adult:"Grown-up"};let Fn="hair";function Mt(e,t,n,s){return`<button type="button" class="avOpt${s?" on":""}" data-act="${e}" data-v="${t}">${n}</button>`}function So(e,t,n){return`<button type="button" class="avSw${n?" on":""}" style="background:${t}" data-act="${e}" data-v="${t}" aria-label="Color"></button>`}function bn(e){return`<div class="avGrid">${e}</div>`}function bs(e,t){return`<div class="avColors">${Ze.map(n=>So(e,n,n===t)).join("")}</div>`}function M6(e,t,n,s){const o=rs(e.look2),i=e.id==="__me",a=Fn==="hair"?`<h3>Style</h3>${bn(gi.map(c=>Mt("av-hair",c,y6[c],o.hair===c)).join(""))}<h3>Color</h3><div class="avColors">${di.map(c=>So("av-hairC",c,o.hairC===c)).join("")}</div>`:Fn==="face"?`<h3>Skin</h3><div class="avColors">${ci.map(c=>So("av-skin",c,o.skin===c)).join("")}</div><h3>Eyes</h3>${bn(mi.map(c=>Mt("av-eyes",c,$6[c],o.eyes===c)).join(""))}<h3>Eye color</h3><div class="avColors">${Fa.map(c=>So("av-eyeC",c,o.eyeC===c)).join("")}</div><div class="avToggles">${Mt("av-freckles",o.freckles?"0":"1","Freckles",o.freckles)}${Mt("av-blush",o.blush?"0":"1","Blush",o.blush)}</div>`:Fn==="clothes"?`<h3>Top</h3>${bn(fi.map(c=>Mt("av-top",c,k6[c],!o.dress&&o.top===c)).join(""))}${bs("av-topC",o.topC)}<h3>Bottom</h3>${bn(hi.map(c=>Mt("av-bottom",c,b6[c],!o.dress&&o.bottom===c)).join(""))}${bs("av-bottomC",o.bottomC)}<h3>Dress</h3>${bn(pi.map(c=>Mt("av-dress",c,v6[c],o.dress===c)).join(""))}${bs("av-dressC",o.dressC)}`:Fn==="shoes"?`<h3>Shoes</h3>${bn(ui.map(c=>Mt("av-shoes",c,w6[c],o.shoes===c)).join(""))}${bs("av-shoesC",o.shoesC)}`:`<h3>Extras</h3><p class="avHint">Pick up to two</p>${bn(Kn.map(c=>Mt("av-acc",c,x6[c],o.acc.indexOf(c)>=0)).join(""))}${bs("av-accC",o.accC)}`,r=p6.map(c=>`<button type="button" class="avOpt sz${c===e.size?" on":""}" data-act="size" data-v="${c}">${_6[c]}</button>`).join(""),l=i?'<div class="meNote">This is you!</div>':`<button type="button" class="del${n?" sure":""}" data-act="delc">${s}<span>${n?"Tap again":""}</span></button>`;return`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${t}<div class="dress avLook"><div class="avStageWrap"><div class="avStage chibi-move">${Ue(e)}</div>${l}<div class="avSizes">${r}</div></div><div class="avSide"><div class="avTabs">${m6.map(c=>`<button type="button" class="avTab${c.id===Fn?" on":""}" data-act="av-tab" data-v="${c.id}">${c.name}</button>`).join("")}</div><div class="avPane">${a}</div><div class="avBar"><button type="button" class="avSurprise" data-act="av-surprise">🎲 Surprise me</button><button type="button" class="avDone" data-act="close">Done</button></div></div></div>`}function L6(e,t,n){if(t==="av-tab")return(n==="hair"||n==="face"||n==="clothes"||n==="shoes"||n==="extras")&&(Fn=n),null;const s=rs(e);if(t==="av-hair"&&gi.indexOf(n)>=0)return{...s,hair:n};if(t==="av-hairC")return{...s,hairC:n};if(t==="av-skin")return{...s,skin:n};if(t==="av-eyes"&&mi.indexOf(n)>=0)return{...s,eyes:n};if(t==="av-eyeC")return{...s,eyeC:n};if(t==="av-freckles")return{...s,freckles:n==="1"};if(t==="av-blush")return{...s,blush:n==="1"};if(t==="av-top"&&fi.indexOf(n)>=0)return{...s,top:n,dress:""};if(t==="av-topC")return{...s,topC:n};if(t==="av-bottom"&&hi.indexOf(n)>=0)return{...s,bottom:n,dress:""};if(t==="av-bottomC")return{...s,bottomC:n};if(t==="av-dress"&&pi.indexOf(n)>=0)return{...s,dress:n};if(t==="av-dressC")return{...s,dressC:n};if(t==="av-shoes"&&ui.indexOf(n)>=0)return{...s,shoes:n};if(t==="av-shoesC")return{...s,shoesC:n};if(t==="av-accC")return{...s,accC:n};if(t==="av-acc"&&Kn.indexOf(n)>=0){const o=n,i=s.acc.slice(),a=i.indexOf(o);if(a>=0)i.splice(a,1);else{const r=Do(o),l=i.filter(c=>Do(c)!==r);return l.push(o),{...s,acc:l.slice(0,2)}}return{...s,acc:i}}return null}function C6(){try{return typeof navigator<"u"&&navigator.webdriver&&!window.__forceAvatarIntro?!1:localStorage.getItem(it("avatar-intro"))!=="1"}catch{return!1}}function S6(){try{localStorage.setItem(it("avatar-intro"),"1")}catch{}}const Bo="#5a3d5c";function Yi(e,t,n,s,o){return`<path class="${e}" d="${t}" fill="none" stroke="${Bo}" stroke-width="${s}" stroke-linecap="round"/><path class="${e} cloth" d="${t}" fill="none" stroke="${n}" stroke-width="${o}" stroke-linecap="round"/>`}function B6(e){const t=rs(e),n=t.skin,s=t.dress!=="",o=s||t.bottom==="skirt"||t.bottom==="tutu",i=o?n:t.bottomC,a=t.shoesC,r=s||t.bottom==="skirt"||t.bottom==="tutu";let l="";if(r){const f=s?t.dressC:t.bottomC;l+=`<path class="dress" d="M75 46 L89 46 L91 53 L73 53 Z" fill="${f}" stroke="${Bo}" stroke-width="1.1" stroke-linejoin="round"/>`}l+=Yi("thigh","M76 44 Q83 48 88 54",i,6.2,4.8),l+=`<circle class="knee" cx="88" cy="56" r="2.3" fill="${i}" stroke="${Bo}" stroke-width="1.1"/>`;const c=t.shoes==="boots"||t.shoes==="rainboots";l+=Yi("shin",c?"M88 58 Q90 64 91 68":"M88 58 Q90 65 91 70",o?n:i,5.8,4.4),!c&&(t.shoes==="sneakers"||t.shoes==="maryjanes"||t.shoes==="lightup")&&(l+=Yi("shin","M90 66 Q90.6 68 91 70","#ffffff",5.4,4));const d=t.shoes==="sandals"?n:a,g=c?66:69;return l+=`<path class="shoe" d="M90 ${g} Q90 ${g-2} 94 ${g-2} Q99 ${g-2} 100 ${g+1} Q100 ${g+5} 95 ${g+5} Q90 ${g+5} 90 ${g+2} Z" fill="${d}" stroke="${Bo}" stroke-width="1.1" stroke-linejoin="round"/>`,t.shoes==="sandals"&&(l+=`<path d="M90 ${g+5} L100 ${g+5}" stroke="${a}" stroke-width="1.3" stroke-linecap="round"/>`,l+=`<path d="M93 ${g} L97 ${g+3}" stroke="${a}" stroke-width="1.1" stroke-linecap="round"/>`),`<svg class="rideleg" viewBox="0 0 160 130">${l}</svg>`}let Lt=null,zc=!0;const W6=e=>{zc=e};function Z(e,t,n="sine",s=0,o=.15){if(zc)try{Lt??=new(window.AudioContext||window.webkitAudioContext),Lt.state==="suspended"&&Lt.resume();const i=Lt.createOscillator(),a=Lt.createGain(),r=Lt.currentTime,l=Math.max(40,e*(.94+Math.random()*.12));i.type=n,i.frequency.setValueAtTime(l,r),s&&i.frequency.exponentialRampToValueAtTime(Math.max(40,l*s),r+t);const c=Math.min(.02,Math.max(.008,t*.22));if(a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(Math.max(2e-4,o),r+c),a.gain.exponentialRampToValueAtTime(.001,r+Math.max(t,c+.02)),n==="square"||n==="sawtooth"){const d=Lt.createBiquadFilter();d.type="lowpass",d.frequency.setValueAtTime(1400,r),d.Q.setValueAtTime(.7,r),i.connect(d).connect(a).connect(Lt.destination)}else i.connect(a).connect(Lt.destination);i.start(r),i.stop(r+t+.02)}catch{}}const C={pick:()=>Z(520,.12,"sine",1.6),drop:()=>{Z(380,.1,"triangle",.7),setTimeout(()=>Z(620,.08,"sine"),60)},pop:()=>Z(800,.15,"square",.3,.08),click:()=>Z(660,.07,"triangle"),swish:()=>Z(300,.25,"sine",2.5,.1),meow:()=>{Z(700,.12,"triangle",1.3,.1),setTimeout(()=>Z(900,.22,"triangle",.6,.1),110)},purr:()=>[0,90,180,270,360].forEach(e=>setTimeout(()=>Z(70,.09,"sawtooth",1,.05),e)),woof:()=>{Z(260,.09,"square",.6,.09),setTimeout(()=>Z(220,.12,"square",.5,.09),130)},spin:()=>Z(400,.35,"sine",2.2,.08),boing:()=>Z(200,.3,"sine",3,.1),splash:()=>[0,50,110].forEach((e,t)=>setTimeout(()=>Z(900-t*200,.12,"triangle",.4,.06),e)),moo:()=>{Z(160,.5,"sawtooth",.8,.07),setTimeout(()=>Z(140,.45,"sawtooth",.85,.06),380)},baa:()=>[0,90,180].forEach(e=>setTimeout(()=>Z(420,.1,"sawtooth",.95,.05),e)),bleat:()=>[0,70,140,210].forEach(e=>setTimeout(()=>Z(520,.07,"square",1.05,.04),e)),oink:()=>{Z(300,.12,"square",.6,.07),setTimeout(()=>Z(330,.12,"square",.55,.07),160)},peep:()=>[0,120,240].forEach((e,t)=>setTimeout(()=>Z(1800+t*150,.07,"sine",1.2,.08),e)),squeak:()=>Z(1400,.1,"sine",1.5,.08),neigh:()=>{Z(700,.5,"sawtooth",.6,.05),[0,60,120,180,240].forEach(e=>setTimeout(()=>Z(620-e,.06,"triangle",1,.04),300+e))},honk:()=>{Z(330,.18,"square",1,.07),setTimeout(()=>Z(330,.25,"square",1,.07),230)},munch:()=>[0,110,220,330].forEach(e=>setTimeout(()=>Z(180+Math.random()*60,.05,"square",.6,.05),e)),cluck:()=>[0,100,180].forEach((e,t)=>setTimeout(()=>Z(600+t*80,.06,"square",.8,.05),e)),plant:()=>{Z(260,.1,"triangle",.6),setTimeout(()=>Z(520,.1,"sine"),90)},water:()=>[0,60,120,180,240].forEach((e,t)=>setTimeout(()=>Z(1200-t*120,.08,"sine",.7,.05),e)),pickup:()=>[660,880,990].forEach((e,t)=>setTimeout(()=>Z(e,.1,"triangle"),t*60)),sparkle:()=>[880,1100,1320].forEach((e,t)=>setTimeout(()=>Z(e,.12),t*70))},T6=/rug|lamp|light|plant|curtain|clock|window|lantern/;function P6(e){if(e.cat==="plants")return!0;const t=`${e.name} ${e.kind??""}`.toLowerCase();return T6.test(t)}const Dc=new Set(["pack:ring-light","pack:desk-lamp"]);function H6(e,t){if(t==="nursery"&&e.kind&&Dc.has(e.kind))return!1;if(t==="all"||!t)return!0;const n=e.rooms;return!n||n.length===0||n.includes(t)?!0:n.includes("any")?e.cat==="decor"||e.cat==="furniture"?P6(e):!0:!1}function U6(e,t,n,s,o){return e.secret&&!(o&&o.has(e.secret))||n==="nursery"&&e.kind&&Dc.has(e.kind)?!1:t.startsWith("pack:")?e.pack===t.slice(5):e.cat!==t?!1:H6(e,s?"all":n)}function E6(e){const t=e.scale;let n=0;e.overflowR>1&&e.overflowL>1?n=-e.overflowL:e.overflowR>1?n=e.overflowR:e.overflowL>1&&(n=-e.overflowL);const s=e.cam+n/t,o=Math.max(0,Math.min(e.maxCam,s)),i=s-o,a=e.nudgeX&&Math.abs(i)>.5?e.kidX-i:e.kidX;return{cam:o,kidX:a}}function Q6(e){const t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[1][0]).toUpperCase():"?"}function A6(e,t=3){const n=[...e].sort((r,l)=>r.x-l.x||r.id.localeCompare(l.id)),s=[],o=[],i=(r,l,c)=>s.some(d=>d.lane===c&&Math.abs(d.x-r)<(d.w+l)/2+8),a=[];for(const r of n){let l=-1;for(let c=0;c<t;c++)if(!i(r.x,r.w,c)){l=c;break}l<0?a.push(r):(s.push({x:r.x,w:r.w,lane:l}),o.push({id:r.id,lane:l,initials:!1}))}for(const r of a){const l=Math.min(r.w,44);let c=0;for(let d=0;d<t;d++)if(!i(r.x,l,d)){c=d;break}s.push({x:r.x,w:l,lane:c}),o.push({id:r.id,lane:c,initials:!0})}return o}let R6=0;function Ic(e=document){const t=[...e.querySelectorAll(".nametag")].filter(o=>{const i=o.getBoundingClientRect();return i.width>2&&i.height>2});if(!t.length)return;const n=t.map(o=>{o.dataset.tagId||(o.dataset.tagId="tg"+(++R6).toString(36)),o.dataset.full||(o.dataset.full=(o.textContent||"").trim()),o.classList.contains("is-initials")||(o.dataset.fullW=String(o.getBoundingClientRect().width));const i=o.getBoundingClientRect(),a=Number(o.dataset.fullW)||i.width;return{id:o.dataset.tagId,x:i.left+i.width/2,w:a}}),s=new Map(A6(n).map(o=>[o.id,o]));for(const o of t){const i=s.get(o.dataset.tagId||"");if(!i)continue;const a=o.dataset.full||"",r=i.initials?Q6(a):a;o.textContent!==r&&(o.textContent=r),o.classList.toggle("is-initials",i.initials),o.style.setProperty("--tag-lane",String(i.lane))}}function Ci(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function z6(e){!e||Ci()||(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),window.setTimeout(()=>e.classList.remove("wiggle"),480))}function D6(){document.addEventListener("pointerup",e=>{if(Ci())return;const t=e.target?.closest("button");t&&(t.classList.remove("spring"),t.offsetWidth,t.classList.add("spring"))},!0)}const qc="#5a3d5c",Ae=`stroke="${qc}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,I6={living:"#ff8fab",bedroom:"#c9a0dc",kitchen:"#8fd6a6",salon:"#f0a0d8",nursery:"#9ad7f5",backyard:"#80ed99"};function q6(e){const t=I6[e]??"#ffb3c6";return`<div class="sceneWin builtin-window" aria-hidden="true"><svg viewBox="0 0 160 180">
    <path d="M18 20 H142 V150 H18 Z" fill="#fff6ea" ${Ae}/>
    <path d="M28 30 H132 V118 H28 Z" fill="#b9e3ff" ${Ae}/>
    <path d="M80 30 V118 M28 74 H132" ${Ae} stroke-width="3"/>
    <circle cx="48" cy="52" r="10" fill="#fff" opacity=".85"/>
    <ellipse cx="108" cy="48" rx="16" ry="8" fill="#fff" opacity=".8"/>
    <path d="M40 118 Q58 96 70 118 Q90 100 112 118" fill="#7dce8a" stroke="${qc}" stroke-width="3"/>
    <rect x="96" y="86" width="8" height="32" rx="3" fill="#6b4a32" ${Ae} stroke-width="2"/>
    <circle cx="100" cy="80" r="12" fill="#5cc985" ${Ae} stroke-width="2"/>
    <path d="M8 16 Q6 80 16 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <path d="M152 16 Q154 80 144 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <rect x="46" y="146" width="68" height="12" rx="4" fill="#ffe7c2" ${Ae}/>
  </svg></div>`}function O6(){return`<div class="sceneRug" aria-hidden="true"><svg viewBox="0 0 200 80">
    <ellipse cx="100" cy="48" rx="92" ry="24" fill="#ffc8dd" ${Ae}/>
    <ellipse cx="100" cy="48" rx="64" ry="15" fill="#bde0fe" ${Ae} stroke-width="3"/>
    <ellipse cx="100" cy="48" rx="28" ry="7" fill="#fff6ea"/>
  </svg></div>
  <div class="sceneLamp" aria-hidden="true"><svg viewBox="0 0 80 160">
    <path d="M18 52 L30 8 H50 L62 52 Z" fill="#ffd166" ${Ae}/>
    <rect x="36" y="52" width="8" height="78" rx="4" fill="#c9a0dc" ${Ae}/>
    <ellipse cx="40" cy="136" rx="26" ry="8" fill="#b388d6" ${Ae}/>
    <circle cx="34" cy="28" r="4" fill="#fff" opacity=".8"/>
  </svg></div>
  <div class="scenePlant" aria-hidden="true"><svg viewBox="0 0 90 140">
    <path d="M45 128 C45 90 18 78 20 48 C40 58 44 80 45 128" fill="#5cc985" ${Ae}/>
    <path d="M45 128 C45 92 74 70 78 40 C58 54 50 82 45 128" fill="#80ed99" ${Ae}/>
    <path d="M45 128 C40 96 28 88 22 70" fill="none" stroke="#3d9a62" stroke-width="3"/>
    <path d="M30 132 H62 L56 118 H36 Z" fill="#e07a5f" ${Ae}/>
    <ellipse cx="46" cy="126" rx="16" ry="5" fill="#c4634a"/>
  </svg></div>`}function N6(e){return[{id:e("rug"),kind:"rug",x:1152,y:540,flip:!1,z:0,scale:1},{id:e("lamp"),kind:"lamp",x:804,y:470,flip:!1,z:0,scale:1},{id:e("plant"),kind:"plant",x:1584,y:480,flip:!1,z:0,scale:1}]}let wl="";function Oc(e,t,n){const s=n.length===0,o=n.some(a=>/window|curtain/i.test(a.kind)),i=t+(s?"|e":"")+(o?"|w":"");i===wl&&e.childElementCount||(wl=i,e.innerHTML=(o?"":q6(t))+(s?O6():""),e.dataset.room=t)}const ie="#5a3d5c",x=(e=4)=>`stroke="${ie}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,eo=600,dt=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],yt=(e,t,n=3)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${ie}"/><circle cx="${e+1}" cy="${t-1}" r="${n/3}" fill="#fff"/>`,Ln=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="5" ry="3" fill="#ff9bb5" opacity=".75"/>`,j6=(e,t,n,s)=>dt.map((o,i)=>`<path d="M${e-n+i*s} ${t} A${n-i*s} ${n-i*s} 0 0 1 ${e+n-i*s} ${t}" fill="none" stroke="${o}" stroke-width="${s}"/>`).join(""),F6=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${x()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${x()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${x()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${x()}/></g>`,Pt=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-46" y="-50" width="92" height="50" rx="14" fill="#f5d27a" ${x()}/>
  <path d="M-30 -42 V-8 M0 -44 V-6 M30 -42 V-8" stroke="#d9a93f" stroke-width="4" stroke-linecap="round"/><path d="M-46 -26 H46" stroke="#c98a2e" stroke-width="5"/></g>`,Z6=(e,t,n)=>{const s=Array.from({length:Math.floor((t-e)/70)+1},(o,i)=>`<rect x="${e+i*70-7}" y="${n-58}" width="14" height="64" rx="5" fill="#fff6e6" ${x(3)}/>`).join("");return`<rect x="${e}" y="${n-46}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${x(3)}/><rect x="${e}" y="${n-22}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${x(3)}/>${s}`};function V6(){const e=Ks;return`<svg class="parkScene ranchScene" viewBox="0 0 ${e} ${eo}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="rcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7e8ff"/><stop offset="1" stop-color="#fff4fb"/></linearGradient></defs>
  <rect width="${e}" height="440" fill="url(#rcSky)"/>
  <g opacity=".55">${j6(1900,430,620,26)}</g>
  ${[160,820,1500,2300,3e3].map((t,n)=>`<g transform="translate(${t} ${70+n%2*34})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <g transform="translate(${e-200} 92)"><circle r="48" fill="#ffe066" ${x()}/>${yt(-15,-6,4)}${yt(13,-6,4)}<path d="M-14 12 Q0 24 14 12" fill="none" ${x(3)}/>${Ln(-26,8)}${Ln(26,8)}</g>
  <path d="M-50 370 Q600 230 1300 350 T2600 330 T${e+100} 360 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#a6e3a0"/><path d="M0 410 H${e}" ${x()}/>
  <path d="M0 566 Q900 530 1800 570 T${e} 552 V600 H0 Z" fill="#f2dcb8" opacity=".9"/>
  ${F6(3560,400,.8,"#4fbf7a")}
  <!-- entrance gate with a rainbow arch -->
  <g class="ranchSign"><g class="ranchSignArt"><rect x="40" y="290" width="24" height="210" rx="6" fill="#c99366" ${x()}/><rect x="196" y="290" width="24" height="210" rx="6" fill="#c99366" ${x()}/>
    <path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${ie}" stroke-width="44" stroke-linecap="round"/>
    ${dt.map((t,n)=>`<path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${t}" stroke-width="${36-n*6}" stroke-linecap="round"/>`).join("")}
    <rect x="22" y="250" width="216" height="40" rx="14" fill="#fff6e6" ${x(3)}/><text x="130" y="277" text-anchor="middle" font-size="19" font-weight="900" fill="${ie}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  <!-- red barn with rainbow trim and banner -->
  <g transform="translate(270 0)">
    <path d="M0 470 V250 L60 180 H270 L330 250 V470 Z" fill="#ef5b5b" ${x(5)}/>
    <path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${ie}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    ${dt.map((t,n)=>`<path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${t}" stroke-width="3" transform="translate(0 ${-7+n*2.8})" stroke-linejoin="round"/>`).join("")}
    <rect x="115" y="215" width="100" height="56" rx="10" fill="#fff6e6" ${x(4)}/><path d="M115 215 L215 271 M215 215 L115 271" stroke="#ef5b5b" stroke-width="6"/>
    <rect x="95" y="330" width="140" height="140" rx="8" fill="#fff6e6" ${x(4)}/><rect x="108" y="342" width="56" height="128" fill="#d94848" ${x(3)}/><rect x="166" y="342" width="56" height="128" fill="#d94848" ${x(3)}/>
    <path d="M108 342 L164 470 M164 342 L108 470 M166 342 L222 470 M222 342 L166 470" stroke="#fff6e6" stroke-width="6"/>
    <g class="barnBanner" transform="translate(165 300)"><g class="ranchSignArt">${dt.map((t,n)=>`<rect x="${-120+n*40}" y="-16" width="40" height="30" fill="${t}"/>`).join("")}<rect x="-120" y="-16" width="240" height="30" fill="none" ${x(3)}/>
      <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${ie}" stroke-width="4" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  </g>
  ${Pt(640,560,.8)}${Pt(1950,470,.7)}${Pt(1880,470,.55)}${Pt(3115,470,.7)}${Pt(3115,425,.55)}
  <!-- the petting zoo moved into the barn: a sign by the barn door, sunflowers where the pen was -->
  ${Array.from({length:6},(t,n)=>{const s=1030+n*66,o=70+n%3*18;return`<g transform="translate(${s} 470)"><path d="M0 0 V-${o}" stroke="#40c057" stroke-width="6" stroke-linecap="round"/><ellipse cx="${n%2?9:-9}" cy="-${o/2}" rx="11" ry="5" fill="#69db7c" ${x(2.5)}/>${[0,45,90,135,180,225,270,315].map(i=>`<ellipse cx="${Math.cos(i*Math.PI/180)*14}" cy="${-o+Math.sin(i*Math.PI/180)*14}" rx="8" ry="5" transform="rotate(${i} ${Math.cos(i*Math.PI/180)*14} ${-o+Math.sin(i*Math.PI/180)*14})" fill="#ffd43b" ${x(2)}/>`).join("")}<circle cy="-${o}" r="10" fill="#a0522d" ${x(2.5)}/></g>`}).join("")}
  <!-- pond -->
  <ellipse cx="${Be.x}" cy="${Be.y}" rx="${Be.rx}" ry="${Be.ry}" fill="#8ecae6" ${x()}/><ellipse cx="${Be.x-15}" cy="${Be.y-6}" rx="70" ry="16" fill="#bde6f7"/>
  <!-- paddock fence + HORSES sign are their own depth layer (paddockFenceSVG) -->
  <!-- garden -->
  <rect x="3140" y="520" width="420" height="70" rx="20" fill="#b07d54" ${x()}/>
  <rect x="3260" y="430" width="160" height="40" rx="12" fill="#fff6e6" ${x(3)}/><text x="3340" y="458" text-anchor="middle" font-size="21" font-weight="900" fill="${ie}" font-family="Nunito, system-ui, sans-serif">GARDEN</text>
  <path d="M3340 470 V500" ${x(5)}/>
  </svg>`}function G6(){return`<svg class="fenceLayer" viewBox="0 0 ${Ks} ${eo}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  ${Z6(2400,3080,470)}
  <rect x="2640" y="380" width="180" height="40" rx="12" fill="#fff6e6" ${x(3)}/><text x="2730" y="408" text-anchor="middle" font-size="21" font-weight="900" fill="${ie}" font-family="Nunito, system-ui, sans-serif">HORSES</text>
  </svg>`}const Nc=[{name:"Goat",say:"Meh-eh-eh!",snd:"bleat"},{name:"Sheep",say:"Baa!",snd:"baa"},{name:"Piglet",say:"Oink oink!",snd:"oink"},{name:"Chicks",say:"Peep peep!",snd:"peep"},{name:"Bunny",say:"*wiggle wiggle*",snd:"squeak"},{name:"Cow",say:"Moooo!",snd:"moo"}],mo=(e,t,n,s=94)=>e.map((o,i)=>`<rect class="leg ${i%2?"b":"a"}" x="${o}" y="${t}" width="9" height="${s-t}" rx="4" fill="${n}" ${x(3)}/>`).join("");function La(e){switch(e){case 0:return`<svg viewBox="0 0 120 100">${mo([32,44,70,82],60,"#efe6dc")}<path class="tail" d="M24 50 l-8 -10" ${x(5)}/>
      <ellipse cx="58" cy="56" rx="34" ry="17" fill="#f4ede5" ${x()}/><g class="head"><path d="M86 30 l-6 -16 l10 10 Z M96 30 l2 -17 l5 13 Z" fill="#c9b8a8" ${x(3)}/>
      <ellipse cx="94" cy="40" rx="14" ry="16" fill="#f4ede5" ${x()}/><ellipse class="ear" cx="80" cy="36" rx="9" ry="4" fill="#e8d6c4" ${x(3)}/>${yt(98,36)}<path d="M98 56 q2 8 6 0" fill="#e8d6c4" ${x(3)}/>${Ln(102,46)}<circle cx="106" cy="44" r="2" fill="${ie}"/></g></svg>`;case 1:return`<svg viewBox="0 0 120 100">${mo([36,48,70,80],62,"#5a4a5c")}
      ${[[40,50],[56,44],[72,48],[86,56],[70,64],[48,64],[34,60]].map(([t,n])=>`<circle cx="${t}" cy="${n}" r="15" fill="#fff" ${x(3)}/>`).join("")}<ellipse cx="60" cy="55" rx="30" ry="14" fill="#fff"/>
      <g class="head"><ellipse cx="96" cy="46" rx="13" ry="15" fill="#6b5a6e" ${x()}/><circle cx="92" cy="32" r="8" fill="#fff" ${x(3)}/><ellipse class="ear" cx="82" cy="44" rx="8" ry="4" fill="#6b5a6e" ${x(3)}/>
      <circle cx="99" cy="42" r="3.2" fill="#fff"/><circle cx="99.5" cy="42" r="1.8" fill="${ie}"/>${Ln(102,52)}</g></svg>`;case 2:return`<svg viewBox="0 0 120 100">${mo([38,50,66,78],66,"#ffadc6")}<path class="tail" d="M28 54 q-10 -4 -6 -12 q6 0 2 8" fill="none" ${x(3)}/>
      <ellipse cx="58" cy="60" rx="32" ry="20" fill="#ffc2d4" ${x()}/><g class="head"><circle cx="90" cy="52" r="16" fill="#ffc2d4" ${x()}/><path d="M80 38 l2 -12 l9 8 Z" fill="#ffadc6" ${x(3)}/>
      <ellipse cx="104" cy="56" rx="7" ry="8" fill="#ff9bb8" ${x(3)}/><circle cx="102" cy="54" r="1.6" fill="${ie}"/><circle cx="106" cy="57" r="1.6" fill="${ie}"/>${yt(92,46)}${Ln(90,60)}</g></svg>`;case 3:return`<svg viewBox="0 0 120 100">${[[30,72,1],[62,66,1.15],[92,74,.95]].map(([t,n,s])=>`<g transform="translate(${t} ${n}) scale(${s})"><path d="M-4 16 v8 M4 16 v8" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="4" r="14" fill="#ffe066" ${x(3)}/><path d="M-8 2 q-6 4 0 8" fill="#ffd43b" ${x(2)}/><g class="head"><circle cx="5" cy="-8" r="9" fill="#ffe066" ${x(3)}/><path d="M13 -9 l7 2 l-7 3 Z" fill="#ff9f43" ${x(2)}/>${yt(7,-10,2.2)}</g></g>`).join("")}</svg>`;case 4:return`<svg viewBox="0 0 120 100"><circle class="tail" cx="30" cy="68" r="8" fill="#fff" ${x(3)}/><ellipse cx="56" cy="72" rx="28" ry="20" fill="#f6eef9" ${x()}/><ellipse cx="74" cy="90" rx="12" ry="5" fill="#f6eef9" ${x(3)}/>
      <g class="head"><ellipse class="ear" cx="78" cy="26" rx="7" ry="20" fill="#f6eef9" ${x(3)} transform="rotate(-12 78 26)"/><ellipse cx="78" cy="26" rx="3" ry="13" fill="#ffc2d4" transform="rotate(-12 78 26)"/>
      <ellipse cx="90" cy="28" rx="7" ry="20" fill="#f6eef9" ${x(3)} transform="rotate(10 90 28)"/><circle cx="86" cy="56" r="17" fill="#f6eef9" ${x()}/>${yt(92,52)}<circle cx="102" cy="58" r="2.5" fill="#ff8fab"/>${Ln(90,63)}</g></svg>`;default:return`<svg viewBox="0 0 120 100">${mo([30,42,72,84],62,"#fff")}<path class="tail" d="M20 50 q-6 14 0 26" fill="none" ${x(3)}/>
      <rect x="18" y="38" width="80" height="34" rx="16" fill="#fff" ${x()}/><path d="M30 40 q10 8 4 20 q-10 -2 -10 -14 Z M60 42 q14 2 10 18 q-12 4 -14 -8 Z" fill="${ie}"/><ellipse cx="60" cy="74" rx="8" ry="5" fill="#ffadc6" ${x(2)}/>
      <g class="head"><path d="M90 24 l-8 -8 M108 24 l8 -8" stroke="#f5d27a" stroke-width="5" stroke-linecap="round"/><rect x="86" y="22" width="26" height="30" rx="12" fill="#fff" ${x()}/>
      <ellipse cx="100" cy="52" rx="14" ry="10" fill="#ffc2d4" ${x(3)}/><circle cx="95" cy="52" r="1.8" fill="${ie}"/><circle cx="105" cy="52" r="1.8" fill="${ie}"/>${yt(94,34)}${yt(106,34)}
      <ellipse class="ear" cx="82" cy="30" rx="7" ry="4" fill="#fff" ${x(3)}/></g></svg>`}}const Be={x:2265,y:520,rx:110,ry:34},K6=476,Go=[{name:"Chestnut",body:"#c97b45",mane:"#7a3f22",sock:"#fff6e6"},{name:"Snowy",body:"#fdf8f3",mane:"#d9cdc4",sock:"#e9ddd2"},{name:"Midnight",body:"#4a3f52",mane:"#2a2230",sock:"#6b5e74"},{name:"Sunny",body:"#f2c96b",mane:"#fff6e0",sock:"#fff6e0"},{name:"Rainbow Pony",body:"#fff0fa",mane:"rainbow",sock:"#ffd6ec"}];function lr(e,t=!1){const n=Go[e]??Go[0],s=n.mane==="rainbow",o=s?dt.map((r,l)=>{const c=124-l*1.6,d=14+l*2.4;return`<path d="M${c.toFixed(1)} ${d.toFixed(1)} q-6.5 2 -4.5 ${6+l*.35}" fill="none" stroke="${r}" stroke-width="5.5" stroke-linecap="round"/>`}).join(""):`<path d="M106 20 q-14 6 -18 30 q8 -6 10 -2 q4 -12 14 -18 Z" fill="${n.mane}" ${x(3)}/>`,i=s?`<g class="tail">${dt.map((r,l)=>`<path d="M30 58 q-18 ${8+l*3} -14 ${36+l}" fill="none" stroke="${r}" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`:`<path class="tail" d="M30 56 q-20 10 -14 44 q10 -10 8 -20 q6 -10 10 -18 Z" fill="${n.mane}" ${x(3)}/>`,a=(r,l)=>`<g class="leg ${l}"><rect x="${r}" y="78" width="12" height="44" rx="5" fill="${n.body}" ${x(3)}/><rect x="${r}" y="110" width="12" height="12" rx="4" fill="${n.sock}" ${x(3)}/></g>`;return`<svg viewBox="0 0 160 130" class="horsesvg">${i}${a(40,"a")}${a(56,"b")}${a(96,"b")}${a(112,"a")}
    <ellipse cx="80" cy="68" rx="50" ry="24" fill="${n.body}" ${x()}/>
    ${t||s?`<path class="saddle" data-top="43" d="M64 46 q16 -6 32 0 l-2 22 q-14 4 -28 0 Z" fill="${s?"#b197fc":"#e8590c"}" ${x(3)}/>`:""}
    <g class="head"><path d="M108 66 L114 30 Q118 16 132 18 L148 36 Q152 46 142 48 L130 46 L128 70 Z" fill="${n.body}" ${x()}/>
    <path d="M114 22 l2 -14 l8 12 Z" fill="${n.body}" ${x(3)}/>${o}
    ${yt(130,30,3.4)}<circle cx="146" cy="42" r="2" fill="${ie}"/>${Ln(136,40)}
    ${s?`<path d="M120 14 l4 -14 l4 14 Z" fill="#ffd43b" ${x(2)}/>`:""}</g>
    ${s?'<g fill="#fff" opacity=".9"><path d="M60 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M92 74 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/></g>':""}</svg>`}const Y6=`<svg viewBox="0 0 180 170"><path d="M10 70 L90 14 L170 70" fill="#ffa94d" ${x(5)}/>
  <rect x="24" y="66" width="132" height="84" rx="8" fill="#fff6e6" ${x()}/>${dt.map((e,t)=>`<rect x="${24+t*22}" y="66" width="22" height="10" fill="${e}"/>`).join("")}
  <rect x="24" y="66" width="132" height="10" fill="none" ${x(3)}/><circle cx="90" cy="108" r="22" fill="#5a3d5c"/>
  <path d="M60 150 l-12 16 M120 150 l12 16" ${x(5)}/>
  <g class="hen"><ellipse cx="90" cy="118" rx="20" ry="14" fill="#fff" ${x(3)}/><circle cx="104" cy="104" r="10" fill="#fff" ${x(3)}/><path d="M100 94 q3 -8 8 0" fill="#ff6b6b" ${x(2)}/>
  <path d="M113 104 l7 2 -7 3 Z" fill="#ffa94d" ${x(2)}/>${yt(106,102,2)}</g>
  <text x="90" y="54" text-anchor="middle" font-size="16" font-weight="900" fill="${ie}" font-family="Nunito, system-ui, sans-serif">EGGS</text></svg>`,X6=`<svg viewBox="0 0 170 130"><rect x="80" y="30" width="54" height="50" rx="8" fill="#bde6f7" ${x()}/><rect x="74" y="24" width="66" height="10" rx="4" fill="#ff6b6b" ${x(3)}/>
  <rect x="20" y="62" width="130" height="34" rx="12" fill="#ff6b6b" ${x()}/><rect x="28" y="40" width="10" height="24" rx="3" fill="#868e96" ${x(3)}/>
  <circle cx="122" cy="98" r="28" fill="${ie}"/><circle cx="122" cy="98" r="13" fill="#ffd43b" ${x(3)}/><circle cx="44" cy="106" r="18" fill="${ie}"/><circle cx="44" cy="106" r="8" fill="#ffd43b" ${x(3)}/>
  <circle cx="26" cy="76" r="5" fill="#fff3b0" ${x(2)}/></svg>`,J6=`<svg viewBox="0 0 240 300"><rect x="104" y="160" width="32" height="140" rx="10" fill="#c99366" ${x()}/>
  <circle cx="120" cy="110" r="90" fill="#5cc985" ${x()}/><circle cx="62" cy="140" r="50" fill="#5cc985" ${x()}/><circle cx="180" cy="140" r="52" fill="#5cc985" ${x()}/>
  ${[[80,90],[150,70],[175,140],[100,150],[130,115],[60,140]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="11" fill="#ff6b6b" ${x(3)}/><path d="M${e} ${t-10} q2 -6 6 -7" fill="none" ${x(2)}/>`).join("")}</svg>`,$l=[[80,90],[150,70],[175,140],[100,150]],jc=`<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="14" fill="#ff6b6b" ${x(3)}/><path d="M20 10 q2 -6 6 -7" fill="none" ${x(2.5)}/><ellipse cx="27" cy="8" rx="5" ry="3" fill="#5cc985" ${x(2)}/><circle cx="14" cy="18" r="3" fill="#fff" opacity=".6"/></svg>`,Si=`<svg viewBox="0 0 40 40"><path d="M12 14 L32 10 L16 36 Z" fill="#ff922b" ${x(3)}/><path d="M18 18 l5 -1 M17 24 l4 -1" ${x(2)}/><path d="M30 10 q4 -8 8 -6 M30 10 q-2 -8 2 -10 M30 10 q6 -2 8 2" fill="none" stroke="#40c057" stroke-width="4" stroke-linecap="round"/></svg>`,e8=`<svg viewBox="0 0 40 40"><path d="M6 34 Q20 4 34 34 Z" fill="#f5d27a" ${x(3)}/><path d="M14 30 L18 14 M20 32 V10 M26 30 L22 14" stroke="#d9a93f" stroke-width="2.5" stroke-linecap="round"/></svg>`,Ns=`<svg viewBox="0 0 40 40"><path d="M20 4 C30 4 34 20 34 26 C34 34 28 38 20 38 C12 38 6 34 6 26 C6 20 10 4 20 4 Z" fill="#fff6e6" ${x(3)}/><circle cx="15" cy="16" r="3" fill="#fff"/></svg>`,cr=(e="#ff8fab")=>`<svg viewBox="0 0 40 40"><path d="M20 38 V20" stroke="#40c057" stroke-width="4" stroke-linecap="round"/>${[0,72,144,216,288].map(t=>`<circle cx="${20+Math.cos(t*Math.PI/180)*8}" cy="${14+Math.sin(t*Math.PI/180)*8}" r="7" fill="${e}" ${x(2.5)}/>`).join("")}<circle cx="20" cy="14" r="5" fill="#ffd43b" ${x(2)}/></svg>`,Fc={carrot:Si,apple:jc,hay:e8},t8=e=>`<svg viewBox="0 0 80 90"><g transform="translate(14 0) scale(1.3)">${Fc[e].replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g>
  <path d="M10 40 H70 L62 86 H18 Z" fill="${e==="carrot"?"#74c0fc":e==="apple"?"#ffa8c5":"#b2f2bb"}" ${x(4)}/><path d="M12 52 H68" stroke="#fff" stroke-width="4" opacity=".6"/></svg>`,n8=`<svg viewBox="0 0 60 50"><path d="M12 22 Q30 -6 48 22" fill="none" stroke="${ie}" stroke-width="7" stroke-linecap="round"/><path d="M12 22 Q30 -6 48 22" fill="none" stroke="#e0a96d" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 22 H56 L50 46 H10 Z" fill="#e0a96d" ${x(3.5)}/><path d="M12 30 H48 M14 38 H46" stroke="#b5793d" stroke-width="3"/></svg>`,xl=["#ff8fab","#c9a0dc","#ffd43b","#74c0fc","#ff922b"];function Zc(e,t,n){const s=`<ellipse cx="35" cy="76" rx="30" ry="11" fill="${e?.wet?"#7a4b2e":"#9c6b46"}" ${x(3)}/>`;if(!e)return`<svg viewBox="0 0 70 90">${s}<path d="M20 74 q4 -3 8 0 M36 78 q4 -3 8 0" stroke="#b5875f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;const o=xl[n%xl.length];let i="";t===0&&(i=`<circle cx="27" cy="72" r="3" fill="#f2dcb8" ${x(1.5)}/><circle cx="36" cy="75" r="3" fill="#f2dcb8" ${x(1.5)}/><circle cx="44" cy="71" r="3" fill="#f2dcb8" ${x(1.5)}/>`),t===1&&(i=`<path d="M35 72 V58" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="57" rx="7" ry="4" fill="#69db7c" ${x(2)}/><ellipse cx="41" cy="55" rx="7" ry="4" fill="#69db7c" ${x(2)}/>`),t===2&&(i=`<path d="M35 72 V40 M35 60 Q22 54 20 42 M35 56 Q48 50 50 38" stroke="#40c057" stroke-width="4" fill="none" stroke-linecap="round"/>${e.seed==="flower"?`<circle cx="35" cy="38" r="7" fill="#b2f2bb" ${x(2)}/>`:""}`),t===3&&(i=e.seed==="carrot"?`<path d="M26 74 L44 72 L35 86 Z" fill="#ff922b" ${x(2.5)}/><path d="M35 72 Q24 50 22 38 M35 72 Q36 48 36 34 M35 72 Q46 50 50 40" stroke="#40c057" stroke-width="5" fill="none" stroke-linecap="round"/>`:`<path d="M35 72 V34" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="54" rx="8" ry="4" fill="#69db7c" ${x(2)}/>${[0,72,144,216,288].map(l=>`<circle cx="${35+Math.cos(l*Math.PI/180)*10}" cy="${28+Math.sin(l*Math.PI/180)*10}" r="8" fill="${o}" ${x(2.5)}/>`).join("")}<circle cx="35" cy="28" r="6" fill="#ffd43b" ${x(2)}/>`);const a=e.wet?"":`<g class="needWater"><path d="M56 18 q6 10 0 14 q-6 -4 0 -14 Z" fill="#74c0fc" ${x(2)}/></g>`,r=t===3?`<g class="ready"><path d="M58 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffd43b" ${x(1.5)}/></g>`:"";return`<svg viewBox="0 0 70 90">${s}${i}${a}${r}</svg>`}const s8=`<svg viewBox="0 0 48 48">${dt.map((e,t)=>`<path d="M${6+t*2.6} 38 A${18-t*2.6} ${18-t*2.6} 0 0 1 ${42-t*2.6} 38" fill="none" stroke="${e}" stroke-width="3"/>`).join("")}<path d="M4 38 H44" ${x(3)}/></svg>`,o8=`<svg viewBox="0 0 48 48"><path d="M10 34 Q24 22 38 34" fill="none" ${x(4)}/><path d="M24 30 V8 M16 16 L24 8 L32 16" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40 H40" ${x(4)}/></svg>`,i8=`<svg viewBox="0 0 200 320"><path d="M70 310 L84 120 H116 L130 310 Z" fill="#fff6e6" ${x(4)}/><path d="M78 200 H122 M74 260 H126" ${x(3)}/><rect x="88" y="262" width="24" height="48" rx="10" fill="#b197fc" ${x(3)}/>
  <path d="M78 124 L100 92 L122 124 Z" fill="#ff8fab" ${x(4)}/>
  <g class="sails" style="transform-origin:100px 110px">${[0,90,180,270].map(e=>`<g transform="rotate(${e} 100 110)"><path d="M100 110 L104 30 L126 30 L118 104 Z" fill="${["#ffd43b","#74c0fc","#ff8fab","#69db7c"][e/90]}" ${x(3)}/><path d="M108 40 H122 M107 58 H121 M106 76 H120" ${x(2)}/></g>`).join("")}<circle cx="100" cy="110" r="10" fill="#ffa94d" ${x(3)}/></g></svg>`,a8=["GOAT","SHEEP","PIGLET","CHICKS","BUNNY","COW"],r8=e=>`<g class="lantern" style="transform-origin:${e}px 146px"><path d="M${e} 146 V178" ${x(3)}/><circle cx="${e}" cy="204" r="34" fill="#fff3b0" opacity=".45"/>
  <path d="M${e-14} 182 H${e+14} L${e+11} 226 H${e-11} Z" fill="#ffe066" ${x(3)}/><rect x="${e-17}" y="176" width="34" height="8" rx="3" fill="#495057" ${x(2.5)}/><rect x="${e-15}" y="224" width="30" height="7" rx="3" fill="#495057" ${x(2.5)}/><ellipse cx="${e}" cy="205" rx="5" ry="9" fill="#ff922b"/></g>`;function l8(){const e=Za,t=Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64} 146 V440" stroke="#d4895f" stroke-width="3"/>`).join(""),n=Array.from({length:Math.ceil(e/46)},(o,i)=>{const a=i*46,r=160+Math.sin(i/3.1)*8;return`<path d="M${a} ${r} L${a+40} ${r} L${a+20} ${r+30} Z" fill="${dt[i%6]}" ${x(2.5)}/>`}).join(""),s=Va.map((o,i)=>`<g><rect x="${o-96}" y="318" width="192" height="122" rx="6" fill="#f0c49a" ${x(4)}/>
    <path d="M${o-96} 350 H${o+96} M${o-96} 384 H${o+96} M${o-96} 412 H${o+96}" stroke="#d9a074" stroke-width="3"/><path d="M${o-96} 318 L${o+96} 440 M${o+96} 318 L${o-96} 440" stroke="#e0aa7e" stroke-width="7" opacity=".7"/>
    <rect x="${o-54}" y="284" width="108" height="30" rx="10" fill="#fff6e6" ${x(3)}/><text x="${o}" y="305" text-anchor="middle" font-size="17" font-weight="900" fill="${ie}" font-family="Nunito, system-ui, sans-serif">${a8[i]}</text></g>`).join("");return`<svg class="parkScene ranchScene barnScene" viewBox="0 0 ${e} ${eo}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="440" fill="#e8a87c"/>${t}
  <!-- hay loft -->
  <rect width="${e}" height="128" fill="#c98a5e"/>${Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64+32} 0 V128" stroke="#b5764d" stroke-width="3"/>`).join("")}
  ${[120,260,420,980,1130,1290,1640,1790].map((o,i)=>Pt(o,126,i%3===1?.72:.85)).join("")}${[190,1060,1720].map(o=>Pt(o,82,.7)).join("")}
  <rect x="0" y="126" width="${e}" height="24" fill="#a8653a" ${x(4)}/>
  ${[0,1,2,3,4,5,6].map(o=>`<path d="M${120+o*280} 150 L${180+o*280} 210" stroke="#a8653a" stroke-width="12" stroke-linecap="round"/><path d="M${120+o*280} 150 L${180+o*280} 210" ${x(2)}/>`).join("")}
  <!-- ladder up to the loft -->
  <g transform="translate(1840 0)"><path d="M-22 150 L-30 440 M22 150 L30 440" stroke="#c99366" stroke-width="10" stroke-linecap="round"/>${[190,240,290,340,390].map(o=>`<path d="M${-22-(o-150)*.028} ${o} H${22+(o-150)*.028}" stroke="#c99366" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
  <!-- rainbow bunting + big rainbow banner -->
  <path d="M0 160 Q${e/2} 176 ${e} 160" fill="none" ${x(2)}/>${n}
  <g transform="translate(${e/2+60} 236)">${dt.map((o,i)=>`<rect x="${-180+i*60}" y="-26" width="60" height="44" fill="${o}"/>`).join("")}<rect x="-180" y="-26" width="360" height="44" rx="4" fill="none" ${x(4)}/>
    <path d="M-180 -26 L-200 -4 L-180 18 M180 -26 L200 -4 L180 18" fill="#ff8fab" ${x(3)}/>
    <text x="0" y="6" text-anchor="middle" font-size="26" font-weight="900" fill="#fff" stroke="${ie}" stroke-width="5" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
  <!-- round windows with daylight -->
  ${[440,1720].map(o=>`<circle cx="${o}" cy="236" r="34" fill="#c7e8ff" ${x(4)}/><path d="M${o-34} 236 H${o+34} M${o} 202 V270" ${x(3)}/>`).join("")}
  ${s}
  <!-- the big door (back outside) -->
  <rect x="24" y="200" width="206" height="244" rx="10" fill="#b5703f" ${x(4)}/>
  <rect x="38" y="214" width="178" height="230" fill="#c7e8ff"/><path d="M38 360 Q120 330 216 352 V444 H38 Z" fill="#a6e3a0"/><circle cx="180" cy="250" r="16" fill="#ffe066"/>
  <path d="M38 214 H216 V444 M38 214 V444" fill="none" ${x(4)}/>
  <!-- straw floor -->
  <rect x="0" y="438" width="${e}" height="162" fill="#f2d58a"/><path d="M0 440 H${e}" ${x(4)}/>
  ${Array.from({length:70},(o,i)=>{const a=i*137%e,r=470+i*53%120;return`<path d="M${a} ${r} l${14+i%3*4} ${i%2?-4:4}" stroke="#d9a93f" stroke-width="3" stroke-linecap="round"/>`}).join("")}
  <!-- feed station -->
  <g transform="translate(356 0)"><rect x="-70" y="456" width="140" height="34" rx="12" fill="#fff6e6" ${x(3)}/><text x="0" y="480" text-anchor="middle" font-size="16" font-weight="900" fill="${ie}" font-family="Nunito, system-ui, sans-serif">FOOD 🥕🍎🌾</text></g>
  ${Pt(1790,590,.8)}${Pt(1700,600,.65)}
  ${[290,660,1330,1590].map(r8).join("")}
  </svg>`}const Ko=600,tt="#5a3d5c",D=(e=4)=>`stroke="${tt}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function to(e){const t=Is[e].seats,n=t<=2?140:t===4?110:100,s=(t-1)/2;return Array.from({length:t},(o,i)=>({x:Is[e].x+(i-s)*n,y:558-Math.abs(i-s)*8}))}const _l=["#ff7eb3","#ffd43b","#66d9e8","#d0bfff","#fff"],ht=(e,t,n=1,s="#fff")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -9 L2.2 -2.4 L9 -2.2 L3.4 2.2 L5.4 9 L0 4.6 L-5.4 9 L-3.4 2.2 L-9 -2.2 L-2.2 -2.4 Z" fill="${s}" stroke="${tt}" stroke-width="1.2" stroke-linejoin="round"/>`;function Ml(e,t,n,s){const o=`<path d="M36 ${t} Q ${e/2} ${t+n+8} ${e-36} ${t}" fill="none" stroke="${tt}" stroke-width="3"/>`,i=Array.from({length:s},(a,r)=>{const l=s===1?.5:r/(s-1),c=48+l*(e-96),d=t+Math.sin(l*Math.PI)*n,g=_l[r%_l.length];return`<g class="bulb" style="animation-delay:-${r%8*.22}s"><line x1="${c}" y1="${d-16}" x2="${c}" y2="${d-6}" stroke="${tt}" stroke-width="2"/><circle cx="${c}" cy="${d}" r="7.5" fill="${g}" ${D(2)}/><circle cx="${c-2}" cy="${d-2}" r="2.2" fill="#fff" opacity=".85"/></g>`}).join("");return o+i}const vs=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">
  <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".12"/>
  <path d="M-40 10 Q-48 -22 -10 -28 Q10 -46 34 -18 Q50 2 34 18 Q8 32 -24 20 Q-42 16 -40 10 Z" fill="${n}" ${D(3)}/>
  <path d="M-18 -6 Q-4 -20 14 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <circle cx="16" cy="6" r="4" fill="#fff" opacity=".35"/>
</g>`,Ll=(e,t,n)=>`<g transform="translate(${e} ${t})">
  <ellipse cx="0" cy="16" rx="28" ry="9" fill="#000" opacity=".12"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="${n}" ${D(3)}/>
  <ellipse cx="-6" cy="-2" rx="12" ry="7" fill="#fff" opacity=".35"/>
  <path d="M0 -16 V-28" ${D(3)}/><circle cy="-32" r="6" fill="#ffd43b" ${D(2)}/>
</g>`;function ws(e,t,n,s,o,i=""){return`<g class="photoFrame${i}" transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-40" y="-52" width="80" height="104" rx="6" fill="#fff" ${D(3.5)}/>
    <rect x="-32" y="-44" width="64" height="72" rx="4" fill="${s}"/>
    ${o}
    <rect x="-10" y="-58" width="20" height="10" rx="2" fill="#ffe8a3" opacity=".85" transform="rotate(-8)"/>
  </g>`}function yo(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-28" y="-34" width="56" height="68" rx="3" fill="#fff" ${D(3)}/>
    <rect x="-22" y="-28" width="44" height="40" fill="${s}"/>
    ${o}
  </g>`}function ko(e,t,n,s){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="36" rx="26" ry="8" fill="#000" opacity=".12"/>
    <path d="M-18 36 L-12 -2 H12 L18 36 Z" fill="${n}" ${D(3)}/>
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c9a27a" ${D(2)}/>
    <ellipse cx="-16" cy="-16" rx="16" ry="22" fill="${s}" ${D(3)} transform="rotate(-18)"/>
    <ellipse cx="16" cy="-18" rx="16" ry="22" fill="${s}" ${D(3)} transform="rotate(16)"/>
    <ellipse cx="0" cy="-28" rx="14" ry="20" fill="${s}" ${D(3)}/>
    <circle cx="0" cy="-36" r="6" fill="#ff8ec8" ${D(2)}/>
  </g>`}function c8(e,t){return`<g transform="translate(${e} ${t})">
    <ellipse cx="28" cy="118" rx="32" ry="8" fill="#000" opacity=".12"/>
    <rect width="56" height="118" rx="10" fill="#e7fbff" ${D()}/>
    <rect y="52" width="56" height="8" fill="#d0f4ff" ${D(2)}/>
    <rect x="44" y="18" width="6" height="22" rx="3" fill="#ffd43b" ${D(2)}/>
    <rect x="44" y="70" width="6" height="28" rx="3" fill="#ffd43b" ${D(2)}/>
    <rect x="8" y="12" width="28" height="22" rx="4" fill="#fff" ${D(2)}/>
    <circle cx="16" cy="22" r="4" fill="#ff8ec8"/><circle cx="28" cy="24" r="3" fill="#ffd43b"/>
    <path d="M18 78 C14 72 8 74 12 82 C15 88 18 90 18 90 C18 90 21 88 24 82 C28 74 22 72 18 78 Z" fill="#ff4d94" ${D(1.5)}/>
  </g>`}function d8(e,t,n){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="6" rx="34" ry="9" fill="#000" opacity=".1"/>
    <path d="M-46 -16 C-50 -86 -26 -108 0 -110 C26 -108 50 -86 46 -16 Z" fill="#fff6fb" ${D()}/>
    <path d="M-32 -20 C-34 -74 -16 -90 0 -92 C16 -90 34 -74 32 -20 Z" fill="${n}"/>
    <ellipse cx="0" cy="-10" rx="40" ry="16" fill="${n}" ${D()}/>
    <ellipse cx="-8" cy="-16" rx="14" ry="6" fill="#fff" opacity=".4"/>
    <path d="M-22 -2 L-26 16 M22 -2 L26 16" fill="none" stroke="${tt}" stroke-width="4" stroke-linecap="round"/>
  </g>`}function g8(e){const t=Is[e],n=t.game==="four"?"Four":"Slay",s=t.game==="four"?"#7ad7ea":e===0?"#ff8ec8":"#e0b0ff",o=t.game==="four"?"#b8f2ff":e===0?"#ffd0e6":"#ead9ff",i=t.seats>=6?250:t.seats>=4?200:150;return`${to(e).map(r=>d8(r.x,r.y,o)).join("")}
  <g transform="translate(${t.x} 500)">
    <ellipse cx="0" cy="28" rx="${i+18}" ry="20" fill="#000" opacity=".1"/>
    <rect x="-18" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${D(3)}/>
    <rect x="4" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${D(3)}/>
    <ellipse cx="0" cy="-4" rx="${i}" ry="30" fill="${s}" stroke="#ffd43b" stroke-width="6"/>
    <ellipse cx="0" cy="-4" rx="${i-16}" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <ellipse cx="${-i*.25}" cy="-12" rx="${i*.35}" ry="8" fill="#fff" opacity=".28"/>
    <text x="0" y="4" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="${tt}" stroke-width="4" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${n}</text>
  </g>`}const $s=(e,t,n=1,s="#ff4d94")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 4 C-6 -4 -14 -2 -10 6 C-7 12 0 16 0 16 C0 16 7 12 10 6 C14 -2 6 -4 0 4 Z" fill="${s}" stroke="${tt}" stroke-width="1.6" stroke-linejoin="round"/>`;function f8(){const e=vi,t=[[120,200],[260,250],[640,210],[900,250],[1180,190],[1560,230],[1860,180],[2100,240],[2420,200],[2520,280]];return`<svg class="grScene" viewBox="0 0 ${e} ${Ko}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="${e}" height="${Ko}" fill="url(#grWall)"/>
  <rect y="390" width="${e}" height="80" fill="#fff6fb" opacity=".45"/>
  ${Array.from({length:8},(n,s)=>`<rect x="${40+s*330}" y="400" width="280" height="62" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`).join("")}
  <rect y="468" width="${e}" height="132" fill="url(#grFloor)"/>
  <rect y="464" width="${e}" height="12" fill="#ffd43b" ${D(3)}/>
  ${[720,1500,2150].map((n,s)=>`<ellipse cx="${n}" cy="548" rx="${s===1?210:280}" ry="42" fill="${s===1?"#d8f6ff":s===0?"#ffe0f0":"#f3e8ff"}" stroke="#fff" stroke-width="4" opacity=".8"/>`).join("")}
  ${Ml(e,28,22,28)}
  ${Ml(e,78,16,18)}
  ${t.map(([n,s],o)=>ht(n,s,.7+o%3*.28,o%2?"#fff":"#ffd43b")).join("")}

  <g transform="translate(1180 70)">
    <rect x="20" y="20" width="220" height="150" rx="16" fill="url(#grSky)" ${D()}/>
    <path d="M20 70 H240 M130 20 V170" ${D(3)}/>
    <circle cx="78" cy="48" r="14" fill="#ffd43b" ${D(2)}/>
    <path d="M8 36 Q20 90 8 150" fill="#ff8ec8" ${D(3)}/><path d="M252 36 Q240 90 252 150" fill="#d0bfff" ${D(3)}/>
  </g>

  <g class="neonSign" transform="translate(560 168)">
    <g class="neonSignArt">
    <rect x="-228" y="-58" width="456" height="108" rx="28" fill="#2b1430" ${D(5)}/>
    <rect class="neonRing" x="-214" y="-44" width="428" height="80" rx="22" fill="none" stroke="#ff4d94" stroke-width="4"/>
    <path d="M-150 8 C-162 -14 -186 -8 -174 12 C-166 26 -150 36 -150 36 C-150 36 -134 26 -126 12 C-114 -8 -138 -14 -150 8 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="2"/>
    <text x="6" y="16" text-anchor="middle" font-size="40" font-weight="900" fill="#ff7eb3" stroke="#fff6fb" stroke-width="2" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY CLUB</text>
    </g>
  </g>

  ${ws(500,340,-6,"#ffe0f0",`${$s(0,8,1.4)}${ht(-18,-16,.7,"#ffd43b")}${ht(18,-10,.55,"#66d9e8")}`," frameAtHead")}
  ${ws(424,186,-8,"#ffe0f0",`${$s(0,8,1.4)}${ht(-18,-16,.7,"#ffd43b")}${ht(18,-10,.55,"#66d9e8")}`," framePhone")}
  ${ws(980,240,5,"#e7fbff",`<ellipse cx="0" cy="6" rx="16" ry="12" fill="#fff" ${D(2)}/><path d="M-6 6 Q0 -8 6 6" fill="none" stroke="${tt}" stroke-width="2"/><path d="M0 18 V28 M-12 24 H12" ${D(2)}/>`)}
  ${ws(1680,255,-4,"#fff3c4",`${ht(0,2,1.5,"#ffd43b")}`)}
  ${ws(2360,245,6,"#f3e8ff",`${$s(0,4,1.3,"#d0bfff")}`)}
  ${yo(400,300,8,"#fff0f6",$s(0,-4,1.1))}
  ${yo(820,310,-7,"#e7fbff",ht(0,-6,1,"#66d9e8"))}
  ${yo(1900,300,9,"#fff6e6",ht(0,-6,1,"#ffd43b"))}
  ${yo(2280,320,-8,"#ffe0f0",$s(0,-4,1))}

  <g class="disco" transform="translate(1288 36)">
    <line y1="0" y2="22" stroke="${tt}" stroke-width="3"/>
    <circle cy="44" r="26" fill="url(#disco)" ${D(3)}/>
    <path d="M-14 36 L0 56 L14 36 M-8 48 H8" fill="none" stroke="#fff" stroke-width="2.5"/>
    ${ht(-30,20,.45)}${ht(32,28,.4,"#ffd43b")}
  </g>

  <g transform="translate(86 292)">
    <rect width="78" height="168" rx="12" fill="#ff8ec8" ${D()}/>
    <rect x="8" y="10" width="62" height="36" rx="8" fill="#fff6e6" ${D(2)}/>
    <text x="39" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="${tt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
    <circle cx="62" cy="96" r="5" fill="#ffd43b" ${D(2)}/>
    <rect x="22" y="118" width="34" height="8" rx="3" fill="#fff" opacity=".45"/>
  </g>

  ${ko(40,400,"#ffd43b","#8ce99a")}
  ${ko(1080,392,"#ff8ec8","#69db7c")}
  ${ko(1600,400,"#d0bfff","#8ce99a")}
  ${ko(2520,396,"#66d9e8","#69db7c")}
  ${c8(200,348)}
  <g transform="translate(2420 360)">
    <rect width="130" height="100" rx="14" fill="#fff6fb" ${D()}/>
    <rect y="28" width="130" height="10" fill="#ffd0e6" ${D(2)}/>
    <circle cx="28" cy="64" r="12" fill="#ffd43b" ${D(2)}/><circle cx="64" cy="66" r="10" fill="#ff8ec8" ${D(2)}/><rect x="86" y="52" width="28" height="22" rx="6" fill="#66d9e8" ${D(2)}/>
    <text x="65" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="${tt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">SNACKS</text>
  </g>

  ${vs(330,455,"#ff8ec8",1.05)}
  ${vs(1120,468,"#d0bfff")}
  ${vs(1360,470,"#8ce4f2",.9)}
  ${vs(1780,462,"#ffd43b")}
  ${Ll(1480,500,"#ffb3d9")}
  ${Ll(2e3,505,"#c9b3ff")}
  ${vs(2550,468,"#ff8ec8",.85)}

  ${Is.map((n,s)=>g8(s)).join("")}
  </svg>`}const h8=`<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${tt}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`,P="#5a3d5c",p8=`<svg viewBox="0 0 120 100"><rect x="0" y="62" width="120" height="38" rx="14" fill="#9fe0aa" stroke="${P}" stroke-width="3"/>
  <path d="M18 70 L30 22 L42 70 M78 70 L90 22 L102 70" fill="none" stroke="#8ecae6" stroke-width="5" stroke-linecap="round"/><path d="M26 22 H94" stroke="#ff8fab" stroke-width="7" stroke-linecap="round"/>
  <path d="M50 22 V54 M66 22 V54" stroke="${P}" stroke-width="2.5"/><rect x="45" y="52" width="26" height="7" rx="3" fill="#ff9f68" stroke="${P}" stroke-width="2.5"/>
  <circle cx="104" cy="14" r="9" fill="#ffd166" stroke="${P}" stroke-width="3"/></svg>`,Vc=`<svg viewBox="0 0 120 100"><path d="M20 50 L60 16 L100 50" fill="#ff8fab" stroke="${P}" stroke-width="4" stroke-linejoin="round"/><rect x="28" y="48" width="64" height="44" rx="6" fill="#fff6e6" stroke="${P}" stroke-width="4"/>
  <rect x="52" y="64" width="16" height="28" rx="4" fill="#c9a0dc" stroke="${P}" stroke-width="3"/><rect x="34" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${P}" stroke-width="3"/><rect x="73" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${P}" stroke-width="3"/></svg>`,dr=`<svg viewBox="0 0 120 100"><path d="M40 18 L24 28 L14 46 L30 52 L34 44 V88 H86 V44 L90 52 L106 46 L96 28 L80 18 Q60 34 40 18 Z" fill="#8ecae6" stroke="${P}" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="58" r="7" fill="#fff3b0" stroke="${P}" stroke-width="3"/></svg>`,K=e=>`<div class="wnArt">${e}</div>`,Gc=`<svg viewBox="0 0 120 100"><rect x="16" y="58" width="74" height="24" rx="10" fill="#fff" stroke="${P}" stroke-width="4"/><circle cx="32" cy="70" r="7" fill="#ff8fab" stroke="${P}" stroke-width="3"/><circle cx="52" cy="70" r="7" fill="#ffe066" stroke="${P}" stroke-width="3"/><circle cx="72" cy="70" r="7" fill="#8ecae6" stroke="${P}" stroke-width="3"/><path d="M86 46 l14 -16 8 8 -14 16z" fill="#ffd166" stroke="${P}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="44" width="12" height="24" rx="4" fill="#c9a0dc" stroke="${P}" stroke-width="3"/></svg>`,u8=`<svg viewBox="0 0 120 100">${dt.map((e,t)=>`<path d="M${12+t*6} 84 A${48-t*6} ${48-t*6} 0 0 1 ${108-t*6} 84" fill="none" stroke="${e}" stroke-width="6"/>`).join("")}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${P}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${P}" stroke-width="3"/></svg>`,m8=`<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${Ns.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g><g transform="translate(52 22) scale(1.4)">${Ns.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g></svg>`,Ca=(e,t,n,s)=>`<g transform="translate(${t} ${n}) scale(${s})">${e.replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"")}</g>`,y8=`<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${P}" stroke-width="4"/>${Ca(ja(Ue({skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6"})).replace('viewBox="14 2 72 74"','viewBox="0 0 100 160"'),26,12,.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`,k8=`<svg viewBox="0 0 120 100"><rect x="8" y="28" width="104" height="64" rx="16" fill="#fff0f6" stroke="${P}" stroke-width="4"/><path d="M8 40 L60 12 L112 40" fill="#ff6b9a" stroke="${P}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 58 C52 48 40 50 46 60 C50 68 60 74 60 74 C60 74 70 68 74 60 C80 50 68 48 60 58 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  ${[18,34,50,66,82,98].map((e,t)=>`<circle cx="${e}" cy="24" r="4" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" stroke="${P}" stroke-width="1.5"/>`).join("")}</svg>`,b8=`<svg viewBox="0 0 120 100"><rect x="28" y="8" width="64" height="84" rx="12" fill="#fff" stroke="${P}" stroke-width="4"/><rect x="28" y="8" width="64" height="84" rx="12" fill="none" stroke="#ff7eb3" stroke-width="6"/><path d="M48 36 L54 24 L60 34 L68 20 L76 34 L82 24 L88 36 Z" fill="#ffd43b" stroke="${P}" stroke-width="2" stroke-linejoin="round"/><text x="60" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#ff4d94" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY</text></svg>`,v8=`<svg viewBox="0 0 120 100"><rect x="10" y="16" width="100" height="72" rx="14" fill="#fff6fb" stroke="${P}" stroke-width="4"/>
  <path d="M36 58 C28 48 18 50 24 60 C28 68 36 74 36 74 C36 74 44 68 48 60 C54 50 44 48 36 58 Z" fill="#ff4d94" stroke="${P}" stroke-width="2"/>
  <path d="M78 28 L82 40 H94 L84 48 L88 60 L78 52 L68 60 L72 48 L62 40 H74 Z" fill="#66d9e8" stroke="${P}" stroke-width="2"/></svg>`,Kc=`<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="22" rx="6" fill="#fff" stroke="${P}" stroke-width="3"/><path d="M6 26 H42 M14 18 V40 M22 18 V40 M30 18 V40 M36 18 V40" stroke="${P}" stroke-width="2.4"/><rect x="4" y="12" width="40" height="8" rx="4" fill="#9ad7f5" stroke="${P}" stroke-width="3"/><ellipse cx="20" cy="32" rx="5" ry="3" fill="#ffe0ec"/><ellipse cx="30" cy="32" rx="5" ry="3" fill="#c9e7ff"/></svg>`,w8=`<svg viewBox="0 0 120 100"><ellipse cx="60" cy="72" rx="50" ry="20" fill="#ffc2d4" stroke="${P}" stroke-width="4"/><ellipse cx="60" cy="72" rx="32" ry="11" fill="#fff" stroke="${P}" stroke-width="3"/><path d="M60 58 C50 46 36 48 42 60 C48 70 60 78 60 78 C60 78 72 70 78 60 C84 48 70 46 60 58 Z" fill="#ff4d94" stroke="${P}" stroke-width="3"/><path d="M22 40 Q28 28 36 36" fill="none" stroke="#7dce8a" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="5" fill="#ffd166" stroke="${P}" stroke-width="2"/></svg>`,$8=`<svg viewBox="0 0 120 100"><path d="M16 50 L60 14 L104 50" fill="#ff8fab" stroke="${P}" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="48" width="68" height="40" rx="10" fill="#fff6ea" stroke="${P}" stroke-width="4"/><path d="M42 88 V60 Q60 44 78 60 V88" fill="#ffe8c7" stroke="${P}" stroke-width="3"/><circle cx="82" cy="64" r="7" fill="#bde0fe" stroke="${P}" stroke-width="3"/><circle cx="80" cy="62" r="2" fill="#fff"/></svg>`,x8=`<svg viewBox="0 0 120 100"><rect x="28" y="38" width="64" height="42" rx="8" fill="#8ecae6" stroke="${P}" stroke-width="4"/><path d="M28 44 L60 68 L92 44" fill="none" stroke="${P}" stroke-width="4"/><path d="M76 30 V16" stroke="${P}" stroke-width="4" stroke-linecap="round"/><path d="M76 16 H96 L90 23 L96 30 H76 Z" fill="#ff6b6b" stroke="${P}" stroke-width="3"/></svg>`,_8=`<svg viewBox="0 0 120 100"><rect x="8" y="32" width="48" height="40" rx="14" fill="#fff3b0" stroke="${P}" stroke-width="4"/><rect x="64" y="32" width="48" height="40" rx="14" fill="#fff" stroke="${P}" stroke-width="4"/><path d="M26 44 L40 52 L26 60 Z" fill="${P}"/><circle cx="88" cy="52" r="6" fill="#ff8fab" stroke="${P}" stroke-width="3"/></svg>`,M8=`<svg viewBox="0 0 120 100"><rect x="16" y="18" width="36" height="58" rx="6" fill="#fff" stroke="${P}" stroke-width="4"/><rect x="62" y="24" width="42" height="52" rx="6" fill="#e7f6ff" stroke="${P}" stroke-width="4"/><circle cx="34" cy="66" r="2.4" fill="${P}"/><circle cx="83" cy="66" r="2.4" fill="${P}"/></svg>`,Yc=`<svg viewBox="0 0 120 100"><rect x="28" y="16" width="64" height="72" rx="16" fill="#fff" stroke="${P}" stroke-width="4"/><path d="M40 36 H80 M40 52 H80 M40 68 H80" fill="none" stroke="${P}" stroke-width="5" stroke-linecap="round"/><circle cx="92" cy="24" r="12" fill="#ff6b9a" stroke="${P}" stroke-width="3"/><text x="92" y="29" text-anchor="middle" font-size="14" font-weight="900" fill="#fff" font-family="Nunito, ui-rounded, system-ui, sans-serif">1</text></svg>`,L8=`<svg viewBox="0 0 120 100"><rect x="6" y="10" width="108" height="80" rx="18" fill="#2a2158" stroke="${P}" stroke-width="4"/><circle cx="34" cy="42" r="14" fill="#ffd166" stroke="${P}" stroke-width="3"/><path d="M78 28 a16 16 0 1 0 0 32 a12 12 0 1 1 0 -32z" fill="#fff6e4" stroke="${P}" stroke-width="3"/><circle cx="92" cy="30" r="2" fill="#fff"/><circle cx="70" cy="24" r="1.6" fill="#fff"/><circle cx="100" cy="48" r="1.6" fill="#fff"/></svg>`,C8=`<svg viewBox="0 0 120 100"><circle cx="60" cy="52" r="34" fill="#fff6e4" stroke="${P}" stroke-width="4"/><path d="M60 52 V32 M60 52 L76 60" stroke="${P}" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="52" r="3" fill="${P}"/><path d="M28 22 l4 6 M92 22 l-4 6" stroke="#ffb15c" stroke-width="4" stroke-linecap="round"/></svg>`,Xc=[{v:9,title:"Everything's tidied into the Menu!",lines:[{art:K(Yc),text:"Everything's tidied into the <b>Menu</b>!"},{art:K(L8),text:"The world follows the <b>clock</b>: morning, day, golden evening, and night."},{art:K(C8),text:"Tap the <b>sun</b> and the <b>moon</b>. <b>Auto</b> follows the clock."}]},{v:8,title:"Make your look!",lines:[{art:K(x8),text:"Leave a <b>letter</b> in a friend's mailbox!"},{art:K(_8),text:"Tap <b>Play</b> or <b>Decorate</b>!"},{art:K(dr),text:"<b>Make your look!</b> New hair, clothes, and colors."},{art:K(M8),text:"Update every iPad to see the <b>new outfits</b>!"}]},{v:7,title:"New Nursery!",lines:[{art:K(Kc),text:"A new <b>Nursery</b> room, with a <b>crib</b> and a rocker!"},{art:K(w8),text:"The <b>Cozy Cottage</b> furniture pack is in your drawer!"},{art:K($8),text:"A <b>dog kennel</b> and a <b>cat tower</b> for your pets!"}]},{v:6,title:"The clubhouse is open!",lines:[{art:K(k8),text:"A glam <b>clubhouse</b> on the map!"},{art:K(b8),text:"Play <b>Slay</b> with friends at a table!"},{art:K(v8),text:"Line up <b>hearts</b> or <b>stars</b>!"}]},{v:5,title:"Your house looks even cozier!",lines:[{art:K(Gc),text:"Wallpaper and floors show their <b>real patterns</b> when you paint!"},{art:K(ss(0,"sit")),text:"Your cat is <b>big and cozy</b>, just like the toy cat."},{art:K(Vc),text:"Tap <b>home</b> to come back from the map, the park, or the ranch."}]},{v:4,title:"A map of our neighborhood!",lines:[{art:K(Na),text:"Tap the <b>map</b> to go anywhere!"},{art:K(y8),text:"Tap a friend's face to <b>find her</b>."},{art:K(La(0)),text:"The petting zoo is inside the <b>barn</b> now!"}]},{v:3,title:"Rainbow Ranch is open!",lines:[{art:K(u8),text:"Visit <b>Rainbow Ranch</b>!"},{art:K(La(1)),text:"Pet and feed animals at the <b>petting zoo</b>."},{art:K(`<svg viewBox="0 0 160 130">${Ca(lr(4),0,0,1)}</svg>`),text:"Ride <b>horses</b> and the <b>rainbow pony</b>!"},{art:K(m8),text:"Collect <b>eggs</b> from the hens."},{art:K(`<svg viewBox="0 0 70 90">${Ca(Zc({seed:"carrot",wet:1},3,0),0,0,1)}</svg>`),text:"Grow carrots and flowers in the <b>garden</b>."}]},{v:2,title:"What's new!",lines:[{art:K(p8),text:"A new <b>park</b>! Swing, slide and splash with friends."},{art:K(ss(3,"sit")),text:"Adopt a <b>cat</b>! She lives in your house."},{art:K(Os(3,"stand")),text:"Adopt a <b>dog</b>! Take it to the park to play fetch."}]}],Jc=Xc[0].v,ed={v:Jc,title:"Welcome to your cozy house!",lines:[{art:K(Vc),text:"Drag furniture into your rooms."},{art:K(dr),text:"Dress up your friends."},{art:K(ss(0,"sit")),text:"Tap the paw to adopt a pet!"}]},td=it("cozy-whatsnew"),S8=1;function B8(){try{const e=Number(localStorage.getItem(td)),t=["cozy-house","cozy-house-v1","cozy-hood"].some(o=>localStorage.getItem(it(o))!==null);if(!e&&!t)return{kind:"welcome",entries:[ed]};const n=e||S8,s=Xc.filter(o=>o.v>n).slice(0,3);return s.length?{kind:"news",entries:s}:{kind:"none",entries:[]}}catch{return{kind:"none",entries:[]}}}function W8(){try{localStorage.setItem(td,String(Jc))}catch{}}function T8(e,t){const n=e==="welcome"?ed.title:t[0].title,s=t.flatMap(o=>o.lines).slice(0,5);return`<div class="wnBadge">${e==="welcome"?vc:t[0].v>=9?Yc:t[0].v>=8?dr:t[0].v>=7?Kc:t[0].v>=6?h8:t[0].v>=5?Gc:t[0].v>=4?Na:t[0].v>=3?s8:Fh}</div>
    <h2 class="wnTitle">${n}</h2>
    <div class="wnList ${s.length>3?"many":""}">${s.map((o,i)=>`<div class="wnLine" style="animation-delay:${.15+i*.18}s">${o.art}<p>${o.text}</p></div>`).join("")}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`}const nd="cozy-sky",Sa={tint:"#fff6e4",body:"#ffe9f0",pageA:"#ffe0ec",pageB:"#e6ddff",spot:"#fff6fa",fieldA:"#c9f2c7",fieldB:"#8fd18a",win:"#a2d2ff",win2:"#b9e3ff",house:"#fff3b0",mapTint:"#ffffff"},Cl={tint:"#e7b4cc",body:"#f6dce8",pageA:"#ffd0e6",pageB:"#e6d2f8",spot:"#fff0f6",fieldA:"#f6d0e2",fieldB:"#dcc8f0",win:"#f6c6de",win2:"#e4d0f8",house:"#ffe0ee",mapTint:"#f3c4dc"},Sl={tint:"#ffb38a",body:"#ffe4dc",pageA:"#ffe0d6",pageB:"#f0d8ea",spot:"#fff6ee",fieldA:"#d4eec4",fieldB:"#a3cb8a",win:"#ffc48a",win2:"#ffd4b0",house:"#ffc56a",mapTint:"#ffb38a"},Zn={tint:"#2a2350",body:"#14182c",pageA:"#1c1748",pageB:"#101832",spot:"#2c2458",fieldA:"#1a2458",fieldB:"#0c1028",win:"#1a245c",win2:"#12183a",house:"#ffe9a0",mapTint:"#102044"},bo=[{m:0,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...Zn},{m:5*60,opacity:.7,map:.78,glow:.95,stars:.95,glass:1,phase:"night",...Zn},{m:5*60+35,opacity:.42,map:.34,glow:.55,stars:.42,glass:.8,phase:"dawn",...Cl},{m:6*60+25,opacity:.14,map:.16,glow:.28,stars:.08,glass:.9,phase:"dawn",...Cl},{m:7*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...Sa},{m:16*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...Sa},{m:17*60+5,opacity:.08,map:.1,glow:.4,stars:.02,glass:.55,phase:"golden",...Sl},{m:18*60+10,opacity:.18,map:.2,glow:.62,stars:.06,glass:.82,phase:"golden",...Sl},{m:19*60+5,opacity:.52,map:.68,glow:.9,stars:.55,glass:1,phase:"night",...Zn},{m:20*60+10,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...Zn},{m:24*60,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...Zn}],P8={phase:"day",opacity:0,map:0,glow:0,stars:0,glass:0,...Sa},H8={phase:"night",opacity:.7,map:.78,glow:1,stars:1,glass:1,...Zn};function Bl(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function at(e,t,n){const s=Bl(e),o=Bl(t),i=a=>Math.round(s[a]+(o[a]-s[a])*n).toString(16).padStart(2,"0");return"#"+i(0)+i(1)+i(2)}const xs=(e,t,n)=>e+(t-e)*n;function U8(e){const t=e.getHours()*60+e.getMinutes()+e.getSeconds()/60;let n=0;for(;n<bo.length-2&&t>=bo[n+1].m;)n++;const s=bo[n],o=bo[n+1],i=Math.max(1,o.m-s.m),a=Math.max(0,Math.min(1,(t-s.m)/i));return{phase:a<.5?s.phase:o.phase,opacity:xs(s.opacity,o.opacity,a),map:xs(s.map,o.map,a),glow:xs(s.glow,o.glow,a),stars:xs(s.stars,o.stars,a),glass:xs(s.glass,o.glass,a),tint:at(s.tint,o.tint,a),body:at(s.body,o.body,a),pageA:at(s.pageA,o.pageA,a),pageB:at(s.pageB,o.pageB,a),spot:at(s.spot,o.spot,a),fieldA:at(s.fieldA,o.fieldA,a),fieldB:at(s.fieldB,o.fieldB,a),win:at(s.win,o.win,a),win2:at(s.win2,o.win2,a),house:at(s.house,o.house,a),mapTint:at(s.mapTint,o.mapTint,a)}}function Wl(e,t){return t==="day"?P8:t==="night"?H8:U8(e)}function E8(e){return e==="day"||e==="night"||e==="auto"}function Q8(e,t=!1){return t?!0:e==="lamp"||e==="window"||e==="stars"||e==="tv"||/lamp|light|lantern|candle|string-lights|night-light/i.test(e)}function Tl(){try{if(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches)return!0}catch{}if(typeof navigator>"u")return!1;const e=navigator.hardwareConcurrency;if(typeof e=="number"&&e>0&&e<=2)return!0;const t=navigator.deviceMemory;return typeof t=="number"&&t>0&&t<=2}const Pl={day:"night",night:"auto",auto:"day"},Hl={day:"Day",night:"Night",auto:"Auto"},sd='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><g fill="none" stroke="#ffb15c" stroke-width="3" stroke-linecap="round"><path d="M24 7 V13 M24 35 V41 M7 24 H13 M35 24 H41 M12 12 L16 16 M32 32 L36 36 M36 12 L32 16 M16 32 L12 36"/></g></svg>',A8='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 8 a14 14 0 1 0 0 32 a11 11 0 1 1 0 -32z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="3"/><circle cx="14" cy="16" r="1.7" fill="#ffd166"/><circle cx="18" cy="28" r="1.2" fill="#fff"/><circle cx="11" cy="24" r="1" fill="#fff"/></svg>',R8='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="28" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M34 8 a9 9 0 1 0 0 18 a7 7 0 1 1 0 -18z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="14" cy="16" r="1.3" fill="#ffd166"/></svg>',z8={day:sd,night:A8,auto:R8},D8="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)";function I8(){if(document.getElementById("skyInk"))return;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.id="skyInk",e.setAttribute("aria-hidden","true"),e.setAttribute("width","0"),e.setAttribute("height","0"),e.style.cssText="position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none",e.innerHTML=`
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
  `,document.head.appendChild(t)}function q8(e){I8();const t=Tl();let n=N8(),s=null,o=Wl(new Date,n),i=0;e.innerHTML=`<button type="button" class="skyBtn" aria-label="Day. Tap for night.">${sd}</button>`;const a=e.querySelector("button"),r=h=>{o=h;const p=document.documentElement,b=Math.max(0,Math.min(1,h.glow));p.style.setProperty("--sky-opacity",h.opacity.toFixed(3)),p.style.setProperty("--sky-map-opacity",h.map.toFixed(3)),p.style.setProperty("--sky-glow",b.toFixed(3)),p.style.setProperty("--sky-stars",h.stars.toFixed(3)),p.style.setProperty("--sky-glass",h.glass.toFixed(3)),p.style.setProperty("--sky-tint",h.tint),p.style.setProperty("--sky-body",h.body),p.style.setProperty("--sky-page-a",h.pageA),p.style.setProperty("--sky-page-b",h.pageB),p.style.setProperty("--sky-spot",h.spot),p.style.setProperty("--sky-field-a",h.fieldA),p.style.setProperty("--sky-field-b",h.fieldB),p.style.setProperty("--sky-win",h.win),p.style.setProperty("--sky-win-2",h.win2),p.style.setProperty("--sky-house-win",h.house),p.style.setProperty("--sky-map-tint",h.mapTint),p.style.setProperty("--sky-glow-soft",`rgba(255, 186, 80, ${(b*.72).toFixed(3)})`),p.style.setProperty("--sky-glow-hot",`rgba(255, 220, 120, ${(b*.96).toFixed(3)})`),p.style.setProperty("--sky-glow-clear","rgba(255, 186, 80, 0)"),p.style.setProperty("--sky-glow-wash",`rgba(255, 170, 70, ${(b*.55).toFixed(3)})`),p.style.setProperty("--sky-glow-map",`rgba(255, 196, 110, ${(b*.7).toFixed(3)})`);const _=h.phase==="golden"?.24:h.phase==="dawn"?.22:0,m=h.phase==="golden"?"186, 110, 52":"140, 62, 18";p.style.setProperty("--sky-shadow",`rgba(${m}, ${_.toFixed(3)})`);const u=h.phase==="night"?.55:h.phase==="golden"?.08:h.phase==="dawn"?.16:0;p.style.setProperty("--sky-vig",`rgba(12, 10, 32, ${u.toFixed(3)})`);const k=h.phase==="golden"?"255, 196, 80":h.phase==="dawn"?"255, 214, 230":"255, 246, 214";p.style.setProperty("--sky-orb",`rgba(${k}, ${Math.min(1,h.glass).toFixed(3)})`),p.dataset.sky=h.phase,p.dataset.skyChoice=n,p.classList.toggle("sky-static",t),p.classList.toggle("sky-live",!t),a.innerHTML=z8[n],a.setAttribute("aria-label",`${Hl[n]}. Tap for ${Hl[Pl[n]].toLowerCase()}.`)},l=()=>Wl(s??new Date,n),c=()=>r(l()),d=()=>{i&&clearInterval(i),i=window.setInterval(()=>{s||c()},t?6e4:1e3)},g=h=>{n=h;try{localStorage.setItem(it(nd),n)}catch{}c()};a.addEventListener("click",()=>g(Pl[n])),document.documentElement.classList.toggle("sky-static",t),c(),d();const f=document.getElementById("mapWorld");f&&O8(f);try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change",()=>{const p=Tl();document.documentElement.classList.toggle("sky-static",p),document.documentElement.classList.toggle("sky-live",!p)})}catch{}try{matchMedia(D8).addEventListener?.("change",()=>Wo())}catch{}return window.addEventListener("resize",()=>Wo()),new MutationObserver(()=>Wo()).observe(document.body,{attributes:!0,attributeFilter:["class"]}),{choice:()=>n,look:()=>o,setChoice(h){g(h)},freeze(h){s=h,c()}}}function Wo(){const e=document.getElementById("skyMount"),t=document.getElementById("menuDaySlot");e&&t&&e.parentElement!==t&&t.appendChild(e),t&&(t.hidden=!1),e&&(e.style.left="",e.style.top="")}function O8(e){const t=document.createElement("div");t.className="skyTint",t.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="skyLamps",n.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="skyBits",s.setAttribute("aria-hidden","true"),s.innerHTML='<i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i>';const o=()=>{e.contains(t)||e.appendChild(t),e.contains(n)||e.appendChild(n),e.contains(s)||e.appendChild(s)};o(),new MutationObserver(o).observe(e,{childList:!0})}function N8(){try{const e=localStorage.getItem(it(nd));if(E8(e))return e}catch{}return"auto"}const Vn=[{name:"Pink",fill:"#ff7eb3",ink:"#9d174d"},{name:"Lilac",fill:"#c9b3ff",ink:"#5f3dc4"},{name:"Aqua",fill:"#66d9e8",ink:"#0b7285"},{name:"Gold",fill:"#ffd43b",ink:"#e67700"}],Se="#5a3d5c",Xi=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Ul=e=>typeof e=="number"?e:{skip:10,rev:11,d2:12,wild:13,w4:14}[e]??0,El=e=>typeof e.v=="number"?String(e.v):e.v==="skip"?"✕":e.v==="rev"?"↻":e.v==="d2"?"+2":e.v==="w4"?"+4":"♛",j8=e=>e.v==="skip"?"Nope":e.v==="rev"?"Flip":e.v==="d2"?"+2":e.v==="wild"||e.v==="w4"?"Crown":"",wn=(e,t,n=1,s="#ffd43b")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -6 L1.4 -1.4 L6 -1 L1.6 1.4 L3 6 L0 3 L-3 6 L-1.6 1.4 L-6 -1 L-1.4 -1.4 Z" fill="${s}" stroke="${Se}" stroke-width="1" stroke-linejoin="round"/>`,To=(e,t,n=1)=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 1.2 C-2.2 -1.6 -5.2 -0.6 -3.6 2.2 C-2.4 4 0 5.2 0 5.2 C0 5.2 2.4 4 3.6 2.2 C5.2 -0.6 2.2 -1.6 0 1.2 Z" fill="#ff4d94" stroke="${Se}" stroke-width="1"/>`;function F8(e){return e.v==="wild"||e.v==="w4"?`<g transform="translate(14 28)">
      <path d="M4 26 L10 8 L18 16 L24 2 L30 16 L38 8 L44 26 Z" fill="#ffd43b" stroke="${Se}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="4" y="26" width="40" height="8" rx="2" fill="#ffd43b" stroke="${Se}" stroke-width="2.2"/>
      <circle cx="10" cy="8" r="2.4" fill="#ff7eb3"/><circle cx="24" cy="3" r="2.4" fill="#66d9e8"/><circle cx="38" cy="8" r="2.4" fill="#d0bfff"/>
      ${wn(-2,0,.7)}${wn(46,4,.65,"#fff")}${wn(22,-4,.55,"#ff7eb3")}
    </g>${e.v==="w4"?`<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${Se}" font-family="Nunito, ui-rounded, system-ui, sans-serif">+4</text>`:""}`:e.v==="d2"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff" stroke="${Se}" stroke-width="2.4"/>
      ${To(14,8,1.35)}${To(32,8,1.35)}
      <path d="M12 26 Q23 34 34 26" fill="none" stroke="${Se}" stroke-width="2.4" stroke-linecap="round"/>
      ${To(40,22,.8)}
    </g>`:e.v==="rev"?`<g fill="none" stroke="${Se}" stroke-width="3.2" stroke-linecap="round">
      <path d="M16 40 C42 22 54 52 34 60 C16 68 12 46 30 40"/>
      <path d="M14 38 L22 30 L24 42" stroke-linejoin="round"/>
    </g>${wn(48,28,.85)}${wn(20,62,.6,"#ff7eb3")}${wn(50,58,.55,"#66d9e8")}`:e.v==="skip"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff6d8" stroke="${Se}" stroke-width="2.4"/>
      <rect x="8" y="12" width="14" height="9" rx="3" fill="#2b1430"/><rect x="24" y="12" width="14" height="9" rx="3" fill="#2b1430"/>
      <path d="M22 16.5 H24 M5 14 H2 M41 14 H44" stroke="${Se}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 27 Q23 32 34 27" fill="none" stroke="${Se}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`:""}function Ba(e){const t=e.c===4,n=t?{fill:"#fff8ee",ink:Se}:Vn[e.c]??Vn[0],s=typeof e.v=="number",o=j8(e),i=t?'<rect x="2" y="2" width="66" height="96" rx="13" fill="#fff8ee" stroke="#ff7eb3" stroke-width="4"/><rect x="5" y="5" width="60" height="90" rx="11" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="7.5" y="7.5" width="55" height="85" rx="9" fill="none" stroke="#66d9e8" stroke-width="1.6"/><rect x="9.5" y="9.5" width="51" height="81" rx="8" fill="none" stroke="#ffd43b" stroke-width="1.6"/>':`<rect x="2" y="2" width="66" height="96" rx="13" fill="${n.fill}" stroke="${Se}" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`,a='<ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/>',r=`fill="${n.ink}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif"`,l=`<text x="8" y="16" font-size="13" font-weight="900" ${r}>${El(e)}</text>`+(s?`<text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" ${r}>${El(e)}</text>`:""),c=s?`<text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="${n.ink}" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${e.v}</text>`:`${F8(e)}${o?`<text x="35" y="92" text-anchor="middle" font-size="12" font-weight="900" ${r}>${o}</text>`:""}`;return`<svg viewBox="0 0 70 100">${i}${a}${l}${c}</svg>`}const Z8=[[18,28],[40,28],[29,46],[18,64],[40,64],[29,78]].map(([e,t])=>To(e,t,.9)).join(""),V8=`<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff4d94" stroke="${Se}" stroke-width="3"/>
  <rect x="7" y="7" width="56" height="86" rx="10" fill="none" stroke="#ffd43b" stroke-width="3"/>
  <rect x="11" y="11" width="48" height="78" rx="8" fill="#ff7eb3"/>
  ${Z8}
  <circle cx="35" cy="50" r="14" fill="#fff6fb" stroke="${Se}" stroke-width="2.4"/>
  ${wn(35,50,1.15,"#ffd43b")}
</svg>`,od=(e,t)=>{if(t.turn<0||t.drawn!=null&&e.id!==t.drawn)return!1;const n=t.top;return e.c===4||e.c===t.color||e.v===n.v&&n.c!==4};let Wa=null,je=null,Nn=-1,Ql=-1;function Al(e,t){Wa=e;const n=t.table,s=n.view;if(!s||!s.top){e.innerHTML="";return}n.tb!==Ql&&(je=null,Nn=-1,Ql=n.tb);const o=n.you,i=o!==null&&Array.isArray(s.hand)?s.hand.slice():[];je!==null&&!i.some(u=>u.id===je)&&(je=null);const a=s.ev;let r=null;if(a&&a.n!==Nn&&Nn>=0&&a.k==="play"&&a.card){const u=e.querySelector(`[data-card="${a.card.id}"]`)||e.querySelector(`[data-p="${a.p}"]`);u&&(r=u.getBoundingClientRect())}const c=n.phase==="play"&&s.turn>=0,d=c&&o!==null&&s.turn===o,g=o!==null&&i.length<=2&&i.length>0&&!s.slay?.[o]&&d,f=d&&s.drawn==null&&n.phase==="play",h=d&&s.drawn!=null&&n.phase==="play",p=i.sort((u,k)=>u.c-k.c||Ul(u.v)-Ul(k.v)),b=c?n.players[s.turn]:"",_=c?d?"Your turn!":`${Xi(t.name(b))}'s turn`:"",m=Vn[s.color]??Vn[0];if(e.innerHTML=`<div class="slayFelt">
    ${_?`<div class="whose ${d?"yours":""}" id="whoseTurn">${_}<span class="slayDir" aria-hidden="true">${s.dir===1?"→":"←"}</span></div>`:""}
    <div class="slayOpps">${n.players.map((u,k)=>k===o?"":`<div class="slayOpp ${s.turn===k?"isTurn":""}" data-p="${k}" data-count="${s.counts?.[k]??0}"><span class="chipFace">${t.face(u)}</span><b>${Xi(t.name(u))}</b><span class="cnt">${s.counts?.[k]??0}</span>${t.away(u)?'<i class="awayBadge">away</i>':""}${s.slay?.[k]?"<em>SLAY!</em>":""}</div>`).join("")}</div>
    <div class="slayPile">
      <button type="button" id="slayDeck" class="slayDeck" ${f?"":"disabled"} aria-label="Draw a card">${V8}<span>${s.deck??0}</span></button>
      <div id="slayDiscard" class="slayDiscard" data-top="${s.top.id}">${Ba(s.top)}</div>
      <div class="nowColor" data-color="${s.color}" style="background:${m.fill}" aria-label="${m.name}"></div>
    </div>
    ${o===null?'<p class="watching">You are watching</p>':""}
    ${je!==null?`<div id="crownPick" class="crownPick"><p>Pick a color for your Crown!</p><div class="crownRow">${Vn.map((u,k)=>`<button type="button" data-color="${k}" aria-label="${u.name}" style="background:${u.fill}"><span>${u.name}</span></button>`).join("")}</div></div>`:""}
    <div id="slayHand" class="slayHand ${d?"isTurn":""}">${p.map(u=>{const k=d&&n.phase==="play"&&od(u,s),M=k?"can":d?"dim":"wait",T=typeof u.v=="number"?Vn[u.c].name+" "+u.v:u.v==="wild"?"Crown":u.v==="w4"?"Crown plus 4":u.v==="d2"?"plus 2":u.v==="rev"?"Flip":"Nope";return`<button type="button" class="slayCard ${M} ${u.id===s.drawn?"justDrew":""} ${u.id===je?"picked":""}" data-card="${u.id}" data-c="${u.c}" data-v="${u.v}" aria-label="${Xi(T)}" ${k?"":"disabled"}>${Ba(u)}</button>`}).join("")}</div>
    ${c&&o!==null?`<button type="button" id="slayCall" class="slayCall ${g?"ready":""}" ${g?"":"disabled"}>SLAY!</button>`:""}
    <button type="button" id="slayPass" class="slayPass ${h?"":"hidden"}" ${h?"":"disabled"}>Pass</button>
  </div>`,a&&a.n!==Nn){const u=Nn;if(Nn=a.n,u>=0){if(a.k==="play"&&a.card){const k=e.querySelector("#slayDiscard");k&&G8(r,a.card,k.getBoundingClientRect()),a.card.v==="skip"?t.toast("Nope!"):a.card.v==="rev"?t.toast("Flip!"):a.card.v==="d2"?t.toast("+2!"):a.card.v==="w4"&&t.toast("Crown +4!"),t.sfx.swish()}a.vdrew&&t.toast("Forgot to say SLAY! Draw 2"),a.k==="slay"&&t.sfx.sparkle()}}}function G8(e,t,n){const s=document.createElement("div");s.className="flyCard",s.innerHTML=Ba(t);const o=e?.width||70,i=e?.height||100;Object.assign(s.style,{left:(e?.left??innerWidth/2)+"px",top:(e?.top??80)+"px",width:o+"px",height:i+"px"}),document.body.appendChild(s),requestAnimationFrame(()=>{s.style.left=n.left+"px",s.style.top=n.top+"px",s.style.width=Math.max(n.width,70)+"px",s.style.height=Math.max(n.height,96)+"px"}),setTimeout(()=>s.remove(),560)}const K8={id:"slay",render:Al,handle(e,t){const n=t.table.view,s=t.table.you;if(!n||t.table.phase!=="play"||s===null)return!1;const o=n.hand??[];if(e.closest("#slayCall"))return o.length<=2&&o.length>0&&!n.slay?.[s]&&(t.move({k:"slay"}),t.sfx.sparkle()),!0;if(e.closest("#slayDeck"))return n.turn===s&&n.drawn==null&&(je=null,t.move({k:"draw"}),t.sfx.click()),!0;if(e.closest("#slayPass"))return n.turn===s&&n.drawn!=null&&(je=null,t.move({k:"pass"}),t.sfx.click()),!0;const i=e.closest("#crownPick [data-color]");if(i&&je!==null)return t.move({k:"play",id:je,color:+i.dataset.color}),je=null,t.sfx.sparkle(),!0;const a=e.closest("#slayHand [data-card]");if(!a||a.hasAttribute("disabled"))return!!a;const r=+a.dataset.card,l=o.find(c=>c.id===r);return!l||n.turn!==s||!od(l,n)||(l.c===4?(je=r,t.sfx.pop(),Wa&&Al(Wa,t)):(je=null,t.move({k:"play",id:r}),t.sfx.click())),!0}},id="#5a3d5c",Rl=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Y8=`<svg viewBox="0 0 48 48"><path d="M24 42 C8 30 2 22 7 13 C11 6 20 8 24 16 C28 8 37 6 41 13 C46 22 40 30 24 42 Z" fill="#ff4d94" stroke="${id}" stroke-width="3" stroke-linejoin="round"/><path d="M16 16 Q20 12 22 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`,X8=`<svg viewBox="0 0 48 48"><path d="M24 3 L29 17 H44 L32 26 L37 42 L24 33 L11 42 L16 26 L4 17 H19 Z" fill="#66d9e8" stroke="${id}" stroke-width="3" stroke-linejoin="round"/><path d="M24 12 L26 18 H22 Z" fill="#fff" opacity=".8"/></svg>`,J8={id:"four",render(e,t){const n=t.table,s=n.view;if(!s||!Array.isArray(s.b)){e.innerHTML="";return}const o=n.you,i=o!==null&&s.turn===o&&n.phase==="play",a=new Set((s.line??[]).map(([b,_])=>b+":"+_)),r=s.last;let l="";for(let b=0;b<7;b++){const _=s.b[b];let m="";for(let k=5;k>=0;k--){const M=k<_.length?_[k]:null,T=a.has(b+":"+k)?" hot":"",H=r&&r.col===b&&r.row===k?" just":"";m+=`<span class="fourCell${M===0?" heart":M===1?" star":""}${T}${H}">${M===0?Y8:M===1?X8:""}</span>`}const u=i&&_.length<6;l+=`<button type="button" class="fourCol" data-col="${b}" ${u?"":"disabled"} aria-label="Drop in column ${b+1}">${m}<span class="dropHint">${u?"▼":""}</span></button>`}const c=n.phase==="play"&&s.turn>=0,d=c?n.players[s.turn]:"",g=c?i?"Your turn!":`${Rl(t.name(d))}'s turn`:"",f=o===0?"You are <b>pink hearts</b>":o===1?"You are <b>aqua stars</b>":"Pink hearts and aqua stars",h=b=>b===0?"♥":"★",p=n.players.map((b,_)=>`<div class="playerChip ${s.turn===_?"isTurn":""}"><span class="chipFace">${t.face(b)}</span><b>${Rl(t.name(b))} ${h(_)}</b>${t.away(b)?'<i class="awayBadge">away</i>':""}</div>`).join("");e.innerHTML=`<div class="fourPlay">
      ${g?`<div class="whose ${i?"yours":""}" id="whoseTurn">${g}</div>`:""}
      <div class="fourChips">${p}</div>
      <p class="fourLegend">${f}</p>
      <div class="fourBoard" id="fourBoard">${l}</div>
    </div>`},handle(e,t){const n=e.closest(".fourCol");if(!n)return!1;const s=t.table.view,o=t.table.you;if(n.hasAttribute("disabled")||!s||o===null||s.turn!==o||t.table.phase!=="play")return!0;const i=+n.dataset.col;return!Number.isInteger(i)||s.b[i].length>=6||(t.move({col:i}),t.sfx.click()),!0}},zl={slay:K8,four:J8},vo=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),ew={notHere:"Come into the clubhouse first!",taken:"Someone is sitting there!",playing:"You are already in this game!",playingElsewhere:"Finish your other game first!",notHost:"Waiting for the host…",needMore:"Play with friends on your street",tooMany:"That table is full!",notPlaying:"The game has not started!",notPlayer:"Sit down to play!",illegal:"You can't play that!",notAway:"She is still here!",tooSoon:"Give her a moment!",notSeated:"You are not at this table!",noMove:"No move to play!"};function tw(e){const t=document.getElementById("tableOverlay");let n=null,s="",o=0;const i=m=>m.away==null?0:m.away+Math.max(0,Date.now()-(m.receivedAt??Date.now())),a=()=>{o&&(clearInterval(o),o=0)},r=m=>{const u=!!m&&m.phase==="play"&&m.away!=null&&n!==null;u&&!o&&(o=window.setInterval(()=>g(),1e3)),u||a()},l=()=>e.hood(),c=()=>{const m=l();return!m||n===null?null:m.tables.get(n)??null},d=m=>{const u=l();return{table:m,me:u.pid,name:k=>u.players.get(k)?.nickname??"friend",face:k=>{const M=u.players.get(k)?.look;return M?ja(Ue(M)):""},move:k=>u.tbl({op:"move",tb:m.tb,m:k}),away:k=>{if(k===u.pid)return!1;const M=u.players.get(k);if(M&&!M.online)return!0;const T=u.presence.get(k);return!T||T.where!=="gameroom"},toast:e.toast,sfx:e.sfx}};t.addEventListener("click",m=>{const u=m.target;if(u.closest("#tblBack")){h(),e.sfx.swish();return}if(u.closest("#tblLeave")){p();return}if(u.closest("#tblStart")){b();return}if(u.closest("#tblNudge")){_();return}const k=c();k&&zl[k.game]?.handle(u,d(k))});function g(){const m=l(),u=c();if(!m||!u){t.classList.add("hidden"),t.innerHTML="",a();return}const k=fc[u.game],M=m.pid,T=u.seats.includes(M),H=u.seats.filter(Boolean).length,U=u.phase==="play"&&u.you!==null&&u.view&&u.view.turn===u.you,F=u.view?.winPid??null;let ae="";if(u.phase==="over"){const pn=F?m.players.get(F)?.nickname??"Friend":"";u.game==="slay"?ae=F?F===M?"You slayed!":`${vo(pn)} slayed!`:"It's a tie!":ae=u.view?.draw||!F?"It's a tie!":F===M?"You got four!":`${vo(pn)} got four!`;const Ar=u.tb+":"+u.seq;F===M&&s!==Ar&&(s=Ar,e.confetti(),e.sfx.sparkle())}const se=i(u),O=u.phase==="play"&&T&&se>=Mf&&u.you!==null&&!!u.view&&u.view.turn!==u.you&&u.view.turn>=0,fe=u.phase!=="play"&&u.host===M&&H>=k.minPlayers&&H<=k.maxPlayers,zn=T&&u.phase==="lobby"&&u.host!==M&&H>=k.minPlayers,Dn=T&&u.phase==="lobby"&&H<k.minPlayers;t.classList.remove("hidden"),t.dataset.tb=String(u.tb),t.dataset.phase=u.phase,t.dataset.game=u.game,t.dataset.you=u.you===null?"":String(u.you),t.innerHTML=`<div class="tblCard ${U?"yourTurn":""} game-${u.game}">
      <div class="tblTop"><h2>${vo(k.name)}</h2><div class="seatDots">${u.seats.map(pn=>`<i class="${pn?"on":""} ${pn===M?"me":""}"></i>`).join("")}</div></div>
      ${ae?`<div class="winWrap"><div class="winBanner" id="winBanner">${ae}</div></div>`:""}
      <div id="tblStage"></div>
      <div class="tblBar">
        ${fe?'<button type="button" id="tblStart">Start</button>':""}
        ${zn?'<p class="tblWait">Waiting for the host…</p>':""}
        ${O?'<button type="button" id="tblNudge">Play for her</button>':""}
        <button type="button" id="tblBack">Back to room</button>
        <button type="button" id="tblLeave">Leave table</button>
      </div>
      ${Dn?'<p class="tblWait" id="needFriend">Play with friends on your street</p>':""}
    </div>`;const lo=t.querySelector("#tblStage");u.phase==="lobby"||!u.view?lo.innerHTML=f(u,m,M):zl[u.game]?.render(lo,d(u)),r(u)}function f(m,u,k){return`<div class="lobby">${m.seats.map((M,T)=>`<div class="lobbySeat ${M?"filled":""} ${M===k?"me":""}">
      <span>${T+1}</span><b>${M?vo(u.players.get(M)?.nickname??"friend"):"Empty"}</b>
      ${M&&M===m.host?"<i>host</i>":""}${M===k?"<i>you</i>":""}
    </div>`).join("")}</div>`}function h(){n=null,a(),t.classList.add("hidden"),t.innerHTML=""}function p(){const m=l(),u=c();m&&u&&u.seats.includes(m.pid)&&m.tbl({op:"leave",tb:u.tb}),e.sfx.click(),h()}function b(){const m=l(),u=c();m&&u&&(m.tbl({op:"start",tb:u.tb}),e.sfx.sparkle())}function _(){const m=l(),u=c();m&&u&&(m.tbl({op:"nudge",tb:u.tb}),e.sfx.click())}return{open(m){n=m,g()},close:h,refresh:g,fail(m,u){e.toast(ew[u]||"Try that again!"),e.sfx.pop(),n===m&&g()},isOpen:()=>n}}const nw=120,sw=192,ow=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let R=null,en=null,Tt=null,Dl=!1;const gn=()=>(document.getElementById("gameroom")?.clientHeight||600)/Ko,Po=()=>en;function ds(){const e=R?.hood();if(!e)return null;for(const[t,n]of e.tables){const s=n.seats.indexOf(e.pid);if(s>=0){const o=to(Number(t))[s];return{tb:Number(t),seat:s,x:o.x,y:o.y}}}return null}function iw(){const e=R?.hood();if(!e)return!1;for(const[t,n]of e.players)if(t!==e.pid&&n.online)return!0;return!1}function aw(e){if(R=e,en=tw({hood:e.hood,toast:e.toast,confetti:()=>xc(),sfx:e.sfx}),Dl)return en;Dl=!0;const t=document.getElementById("grWorld");return t.addEventListener("click",lw),t.addEventListener("pointerdown",n=>{n.target.closest(".grChair, .grTable, .grDoor, .pet")&&n.stopPropagation()}),en}function gr(){if(!R)return;const e=gn(),t=document.getElementById("grWorld"),n=o=>o*e+"px";t.style.width=vi*e+"px",t.style.height=Ko*e+"px",t.style.setProperty("--sc",String(e));let s=f8();s+=`<button class="grDoor" data-gr="map" aria-label="Back to the map" style="left:${n(78)};top:${n(268)};width:${n(86)};height:${n(170)}"></button>`,Is.forEach((o,i)=>{const a=o.seats>=6?560:o.seats>=4?440:340;s+=`<button class="grTable" data-tb="${i}" aria-label="${fc[o.game].name} table" style="left:${n(o.x-a/2)};top:${n(456)};width:${n(a)};height:${n(70)}"></button>`,to(i).forEach((r,l)=>{const c=76*e,d=72*e,g=Math.max(c,44),f=Math.max(d,44),h=(r.x-38)*e-(g-c)/2,p=(r.y-16)*e-(f-d)/2;s+=`<button class="grChair" data-tb="${i}" data-seat="${l}" aria-label="Empty chair" style="left:${h}px;top:${p}px;width:${g}px;height:${f}px"></button>`})}),s+='<div class="savatars" id="gavatars"></div>',t.innerHTML=s,As()}function As(){if(!R||R.view()!=="gameroom")return;const e=document.getElementById("gavatars");if(!e)return;const t=gn(),n=new Set;for(const i of rw()){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&gw(a));const r=JSON.stringify(i.look)+i.name+(i.away?":away":"");if(a.dataset.look!==r){const f=a.querySelector(".bubble");a.innerHTML=`<div class="inner">${Ue(i.look)}</div>${i.name?`<div class="nametag">${ow(i.name)}${i.away?'<i class="awayBadge">away</i>':""}</div>`:""}`,f&&a.appendChild(f),a.dataset.look=r}const l=(Js[i.look.size]??1)*t*.95,c=nw*l,d=sw*l,g=i.seated?i.y-8:i.y;a.style.left=i.x*t-c/2+"px",a.style.top=g*t-d+"px",a.style.width=c+"px",a.style.height=d+"px",a.style.zIndex=String(100+Math.round(i.y)),a.classList.toggle("flipped",i.flip),a.classList.toggle("away",i.away),a.classList.toggle("seated",i.seated),Xs(a,i.look,i.mine)}e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),R.refreshNear();const s=R.hood();document.querySelectorAll("#grWorld .grChair").forEach(i=>{const a=s?.tables.get(+i.dataset.tb)?.seats[+i.dataset.seat];i.classList.toggle("taken",!!a);const r=a?s.players.get(a)?.nickname:"";i.setAttribute("aria-label",r?r+" is sitting":"Empty chair")});const o=document.getElementById("grSolo");o&&o.classList.toggle("hidden",iw())}function rw(){const e=[],t=R.hood();if(t){const n=new Map;for(const[a,r]of t.tables)r.seats.forEach((l,c)=>{l&&n.set(l,to(Number(a))[c])});const s=[...t.presence.entries()],o=R.myPres();o&&s.push([t.pid,o]);const i=new Set;for(const[a,r]of s){if(r.where!=="gameroom")continue;const l=t.players.get(a);if(!l)continue;i.add(a);const c=n.get(a);e.push({key:a,look:l.look,name:l.nickname,x:c?.x??r.x,y:c?.y??r.y,flip:r.flip,mine:a===t.pid,away:!1,seated:!!c})}for(const[a,r]of n){if(i.has(a))continue;const l=t.players.get(a);l&&e.push({key:a,look:l.look,name:l.nickname,x:r.x,y:r.y,flip:!1,mine:!1,away:!0,seated:!0})}}else{const n=R.solo();if(n?.where==="gameroom"){const s=R.soloLook();e.push({key:"solo",look:s.look,name:"",x:n.x,y:n.y,flip:n.flip,mine:!0,away:!1,seated:!1})}}return e}function lw(e){if(!R||R.view()!=="gameroom")return;const t=e.target,n=t.closest(".savatar");if(n){const c=R.hood(),d=n.dataset.pid;if(c&&d){for(const[g,f]of c.tables)if(f.seats.includes(d)){en?.open(Number(g));return}}return}if(t.closest('[data-gr="map"]')){R.goMap();return}const s=t.closest(".grChair");if(s){cw(+s.dataset.tb,+s.dataset.seat);return}const o=t.closest(".grTable");if(o){if(!R.hood()){ad();return}en?.open(+o.dataset.tb),R.sfx.click();return}if(t.closest(".pet")||ds())return;const i=document.getElementById("grWorld").getBoundingClientRect(),a=gn(),r=(e.clientX-i.left)/a,l=(e.clientY-i.top)/a;l<430||(Tt={x:Math.max(60,Math.min(vi-60,r)),y:Math.max(470,Math.min(590,l))})}function cw(e,t){if(!R)return;const n=R.hood();if(!n){ad();return}const s=n.tables.get(e)?.seats[t];if(s&&s!==n.pid){R.toast((n.players.get(s)?.nickname??"Someone")+" is sitting there!"),R.sfx.pop(),en?.open(e);return}Tt=null,n.tbl({op:"sit",tb:e,seat:t});const o=to(e)[t];R.setPres({where:"gameroom",x:o.x,y:Math.max(470,Math.min(590,o.y)),flip:!1}),en?.open(e),R.sfx.click()}function ad(){if(!R)return;const e=document.getElementById("grSolo");e&&(e.classList.remove("hidden"),e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),R.toast("Play with friends on your street"),R.sfx.pop()}function dw(e){if(!R||R.view()!=="gameroom"||!Tt)return;if(ds()){Tt=null;return}const t=R.hood()?R.myPres():R.solo();if(!t||t.where!=="gameroom"){Tt=null;return}const n=Tt.x-t.x,s=Tt.y-t.y,o=Math.hypot(n,s);if(o<4){Tt=null;return}const i=Math.min(o,300*e),a={where:"gameroom",x:t.x+n/o*i,y:t.y+s/o*i,flip:Math.abs(n)>2?n<0:t.flip};R.setPres(a);const r=gn(),l=document.getElementById("grScroll"),c=a.x*r-l.scrollLeft;(c<l.clientWidth*.22||c>l.clientWidth*.78)&&(l.scrollLeft=a.x*r-l.clientWidth/2)}function gw(e){e.addEventListener("pointerdown",t=>{if(!R||ds())return;const n=R.hood()?R.myPres():R.solo();if(!n||n.where!=="gameroom")return;t.preventDefault(),t.stopPropagation(),Tt=null;const s=gn(),o=document.getElementById("grWorld"),i=document.getElementById("grScroll"),a=m=>{const u=o.getBoundingClientRect();return{x:(m.clientX-u.left)/s,y:(m.clientY-u.top)/s}},r=a(t),l={x:n.x-r.x,y:n.y-r.y};let c=t,d=0,g=n.x,f=!1;const h=m=>{const u=R.hood()?R.myPres():R.solo();if(!u||u.where!=="gameroom")return;const k=a(m),M=Math.max(60,Math.min(vi-60,k.x+l.x)),T=Math.max(470,Math.min(590,k.y+l.y));if(!f&&Math.hypot(M-u.x,T-u.y)<6)return;f=!0;const H=Math.abs(M-g)>3?M<g:u.flip;Math.abs(M-g)>3&&(g=M),R.setPres({where:"gameroom",x:M,y:T,flip:H})},p=()=>{const m=i.getBoundingClientRect(),u=c.clientX<m.left+70?-12:c.clientX>m.right-70?12:0;u&&f&&(i.scrollLeft+=u,h(c)),d=requestAnimationFrame(p)};d=requestAnimationFrame(p),e.classList.add("lifted"),R.sfx.pick();const b=m=>{m.pointerId===t.pointerId&&(c=m,h(m))},_=m=>{m.pointerId===t.pointerId&&(cancelAnimationFrame(d),window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",_),e.classList.remove("lifted"),f&&R.sfx.drop())};window.addEventListener("pointermove",b),window.addEventListener("pointerup",_)})}const Cs=B8(),G=dc();let Ge=G;const rd=[],Il=new WeakSet;function ld(e){Il.has(e)||(Il.add(e),e.subscribe((t,n)=>{Ge===e&&rd.forEach(s=>s(t,n))}))}ld(G);const B={get:()=>Ge.get(),dispatch(e){Ge.dispatch(e)},subscribe:e=>{rd.push(e)}},re=Gt,Te=Ps,Bi=390;let te=1e3;const no=()=>Math.max(0,re-te),cd=375,dd=(e,t)=>e.wall?Math.min(t,cd):t,fn=120,wt=192,fr=[{id:"living",name:"Living Room",color:"#ff8fab"},{id:"bedroom",name:"Bedroom",color:"#b388d6"},{id:"kitchen",name:"Kitchen",color:"#5cc985"},{id:"salon",name:"Salon",color:"#f0a0d8"},{id:"nursery",name:"Nursery",color:"#9ad7f5"}],gd=e=>fr.find(t=>t.id===e)?.color??"#ccc",is=[{id:"__people",name:"People",icon:"",kind:"people"},...["furniture","decor","plants","food","pets"].map((e,t)=>({id:e,name:e,icon:["armchair","balloon","flowers","donut","cat"][t],kind:"cat"}))];is.push({id:"secrets",name:"Secrets",icon:"egg:chloe-starlamp",kind:"cat"});for(const e of zt)is.some(t=>t.kind==="cat"&&t.id===e.cat)||is.push({id:e.cat,name:e.cat,icon:e.kind,kind:"cat"});for(const e of zt)e.pack&&!is.some(t=>t.id==="pack:"+e.pack)&&is.push({id:"pack:"+e.pack,name:_c(e.pack),icon:e.kind,kind:"pack"});const Ji=e=>zt.filter(t=>U6(t,e,B.get().currentRoom,hr==="all",_i())),fw=["#ffd6e0","#d9ccff","#cdf3dc","#cfe8ff","#fff1b8","#ffe0c7","#ffffff","#f6c1ff"],hw=["#e8b98a","#f2d0a4","#c99366","#ffe7a8","#bfe3d0","#d6d6f5","#ffc8dd","#9fb4c7"],ut={paint:'<svg viewBox="0 0 48 48"><path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M28 12 L34 6 L42 14 L36 20" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/></svg>',shirt:'<svg viewBox="0 0 48 48"><path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',soundOn:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 17 Q37 24 32 31 M36 12 Q45 24 36 36" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',soundOff:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ddd" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M33 19 L43 29 M43 19 L33 29" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',flip:'<svg viewBox="0 0 48 48"><path d="M24 6 V42" stroke="#5a3d5c" stroke-width="3" stroke-dasharray="4 4"/><path d="M18 12 L6 36 H18 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M30 12 L42 36 H30 Z" fill="#fff" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',front:'<svg viewBox="0 0 48 48"><rect x="6" y="6" width="22" height="22" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="18" y="18" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',back:'<svg viewBox="0 0 48 48"><rect x="18" y="18" width="24" height="24" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="22" height="22" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',trash:'<svg viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="28" rx="5" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><rect x="8" y="9" width="32" height="7" rx="3.5" fill="#ffadad" stroke="#5a3d5c" stroke-width="3"/><path d="M20 21 V35 M28 21 V35" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>'},pw='<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',uw='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 15 H37 M11 24 H37 M11 33 H37" fill="none" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',mw='<svg class="mailGlyph" viewBox="0 0 48 48" aria-hidden="true"><g transform="translate(0 2)"><rect x="6" y="14" width="36" height="24" rx="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/><path d="M6 16 L24 30 L42 16" fill="none" stroke="#5a3d5c" stroke-width="3"/><path d="M34 12 V6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M34 6 H44 L40 10 L44 14 H34 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2"/></g></svg>',fd='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',yw=document.getElementById("app");yw.innerHTML=`
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${Fe.chat}<span class="badge" id="chatBadge"></span></button>
    <button class="round" id="btnMenu" aria-label="Menu" aria-expanded="false">${uw}<span class="badge" id="menuBadge"></span></button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${Fe.home}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${Zh}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${o8}</button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${Na}<span class="badge" id="mapBadge"></span></button>
  </div>
</div>
<div class="menuPop hidden" id="menuPop">
  <div class="menuCard" role="dialog" aria-label="Menu">
    <button type="button" class="close" id="menuClose" aria-label="Close">✕</button>
    <p class="menuGroup">My stuff</p>
    <button type="button" class="menuRow" id="btnPets" aria-label="Pets"><span class="mIco">${vc}</span><span class="mLabel">Pets</span></button>
    <button type="button" class="menuRow" id="btnDress" aria-label="Characters"><span class="mIco">${ut.shirt}</span><span class="mLabel">Characters</span></button>
    <button type="button" class="menuRow" id="btnPaint" aria-label="Colors"><span class="mIco">${ut.paint}</span><span class="mLabel">Wall &amp; floor colors</span></button>
    <button type="button" class="menuRow" id="secrets" aria-label="Surprises, 0 of 5"><span class="mIco secGift">🎁</span><span class="mLabel"><span class="secWord">Surprises </span><span class="secCount">0/5</span></span></button>
    <p class="menuGroup houseGroup">House</p>
    <button type="button" class="menuRow lockRow" id="btnLock" aria-label="Lock house"><span class="mIco" id="lockIco">${Fe.lockOff}</span><span class="mLabel" id="lockLabel">Lock my house</span></button>
    <button type="button" class="menuRow mailRow" id="btnMail" aria-label="Mailbox"><span class="mIco">${mw}</span><span class="mLabel">Mailbox</span><span class="menuNew" id="mailNew"></span></button>
    <!-- Day / Night / Auto. The clock stays on Auto until she taps. -->
    <div id="menuDaySlot" class="menuSlot" hidden></div>
    <p class="menuGroup streetGroup">Street</p>
    <button type="button" class="menuRow grownRow" id="btnParent" aria-label="Grown-ups"><span class="mIco">${Fe.shield}</span><span class="mLabel">Grown-ups</span></button>
    <button type="button" class="menuRow soloLeave" id="btnSolo" aria-label="Play in my own house"><span class="mIco">${Fe.solo}</span><span class="mLabel">Play in my own house</span></button>
    <button type="button" class="menuRow friendRow" id="btnHood" aria-label="Friends"><span class="mIco">${Fe.street}</span><span class="mLabel">Friends</span></button>
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
        <button data-a="flip">${ut.flip}</button><button data-a="front">${ut.front}</button><button data-a="back">${ut.back}</button><button data-a="delete" class="danger">${ut.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <div class="bin" id="bin">${ut.trash}</div>
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
<div class="street mapView hidden" id="street"><div class="mapSky">${Mg}</div><div class="mapMeadow">${Lg}</div><button class="mailCue" id="mailCue" type="button">You've got mail!</button><div class="mapWorld" id="mapWorld"></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>
<div id="toastLane"></div>
<div class="phoneNote" id="phoneNote"><div class="card"><h2>Turn sideways</h2><p>Turn your phone sideways for more room to play!</p><button class="phoneOk" id="phoneOk" type="button">OK!</button></div></div>
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>
<div id="skyMount"></div>`;const $=e=>document.getElementById(e),J=$("stage"),hd=$("world"),ye=$("layer"),Ut=$("toolbar"),Ho=$("bin");let we=null,me=B.get().characters[0]?.id??null,Je="furniture",hr="",Ta="",kw=Date.now()%1e5;const Pa=e=>`${e}-${Date.now().toString(36)}${(++kw).toString(36)}${Math.random().toString(36).slice(2,5)}`,We="__me";let y=null,L="house",le=!1,he="",Yo=new Map,pd=!1;const qe=Ih($("modeToggle"),{ownHouse:()=>!y||!he||he===y.myHouseId(),onChange:()=>{pd&&(gs.matches?rn():so())}}),Uo=Uh({send:(e,t,n,s)=>y?.sendMail(e,t,n,s),read:(e,t)=>y?.readMail(e,t),drop:(e,t)=>y?.dropMail(e,t),houseOf:e=>[...y?.players.values()??[]].find(t=>t.pid===e)?.houseId??"",houseName:e=>y?.houses.get(e)?.meta.name??"My House",lettersOf:e=>y?.houses.get(e)?.confirmed.mailbox?.letters??[],mine:e=>!!y&&y.houses.get(e)?.meta.ownerId===y.pid,toast:Q,openOwn:()=>{const e=y?.myHouseId();e&&$r(e)},freeType:()=>!y||yc(y.settings)});qe.sync(!0);const Ss=new Map,Xo={};let j=ls,Jn=0;pd=!0;let js=null;const Wi=()=>{cancelAnimationFrame(Jn),js=null},pr=e=>Math.max(0,Math.min(no(),e));function Ke(e){j=pr(e),Xo[B.get().currentRoom]=j,hd.style.transform=`translate3d(${-j}px,0,0)`,$("nudgeL").classList.toggle("off",j<=1),$("nudgeR").classList.toggle("off",j>=no()-1);const t=$("mmView");t.style.left=j/re*100+"%",t.style.width=te/re*100+"%",we&&Sd(B.get())}function Ti(e){cancelAnimationFrame(Jn),e=pr(e),js=e;const t=()=>{const n=e-j;if(Math.abs(n)<.5){Ke(e),js=null;return}Ke(j+n*.18),Jn=requestAnimationFrame(t)};Jn=requestAnimationFrame(t)}const ze=()=>J.getBoundingClientRect().width/te,bw="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)",gs=window.matchMedia(bw);function vw(){const e=gs.matches;document.body.classList.toggle("phone",e),document.body.classList.toggle("phone-portrait",e&&window.matchMedia("(orientation: portrait)").matches);const t=$("stageWrap");for(const n of[$("nudgeL"),$("nudgeR")]){const s=e?t:J;n.parentElement!==s&&s.appendChild(n)}}function ud(){const e=document.querySelector(".top");if(!e)return;const t=e.getBoundingClientRect(),n=document.body.classList.contains("phone")?t.bottom:t.height;document.documentElement.style.setProperty("--chrome-h",Math.ceil(n)+"px"),md()}function md(){const e=document.querySelector(".top");if(!e)return;const t=Math.ceil(e.getBoundingClientRect().bottom+16)+"px",n=document.getElementById("mailCue");n&&(n.style.top=t);const s=document.getElementById("toastLane");s&&(s.style.top=t)}function ww(){const e=document.documentElement,t=document.getElementById("app");if(!(document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait"))){t.style.top="",t.style.height="",t.style.bottom="",e.style.removeProperty("--vvh"),e.style.removeProperty("--vvt");return}const s=window.visualViewport,o=Math.round(s?s.height:window.innerHeight),i=Math.round(s?s.offsetTop:0);e.style.setProperty("--vvh",o+"px"),e.style.setProperty("--vvt",i+"px"),t.style.top=i+"px",t.style.height=o+"px",t.style.bottom="auto"}function so(){vw(),ww(),ud();const e=$("stageWrap"),t=document.body.classList.contains("phone"),n=e.clientWidth,s=e.clientHeight;if(t?s>n*.85:s>n+40){const a=n/Math.max(1,s);te=Math.round(Math.max(480,Math.min(860,Te*a)))}else if(t){const a=n/Math.max(1,s);te=Math.round(Math.max(480,Math.min(re,Te*a)))}else te=1e3;J.style.width=te+"px",J.style.height=Te+"px";const i=Math.min(n/te,s/Te);if(J.style.left="",J.style.top="",J.style.transform=`translate(-50%,-50%) scale(${i})`,t&&J.style.setProperty("--fit",String(ze())),yd(),j>no())Ke(j);else{const a=$("mmView");a.style.left=j/re*100+"%",a.style.width=te/re*100+"%"}$e(),!t&&L==="house"&&oo(!1),Sw(),L==="ranch"&&requestAnimationFrame(qa),L==="gameroom"&&requestAnimationFrame(ug),hs(),t&&L==="ranch"&&Q$(),kd(),qe.hint()}function yd(){const e=$("stageWrap"),t=document.body.classList.contains("phone")&&L==="house";for(const n of[$("nudgeL"),$("nudgeR")]){if(!t||n.parentElement!==e){n.style.top="",n.style.marginTop="",n.style.left="",n.style.right="";continue}const s=J.getBoundingClientRect(),o=e.getBoundingClientRect(),i=(s.top+s.bottom)/2-o.top;n.style.top=i+"px",n.style.marginTop=-n.offsetHeight/2+"px",n.style.left="",n.style.right=""}}function kd(){document.body.classList.remove("secrets-chrome"),$("secrets")?.classList.remove("compact")}function $e(e=0){if(!document.body.classList.contains("phone"))return;if(L==="house"){bd();return}const t=L==="park"?"parkScroll":L==="ranch"?"ranchScroll":L==="gameroom"?"grScroll":"";if(!t)return;const n=document.getElementById(t);if(!n||n.clientWidth<20){e<8&&requestAnimationFrame(()=>$e(e+1));return}const s=n.querySelector(".savatar.mine")??n.querySelector(".savatar");if(!s){e<8&&requestAnimationFrame(()=>$e(e+1));return}xw(n,[s,...s.querySelectorAll(".nametag")])&&e<8?requestAnimationFrame(()=>$e(e+1)):$w()}function $w(){li()&&(L==="gameroom"&&pg([...document.querySelectorAll(".neonSignArt")],document.getElementById("grScroll")),L==="ranch"&&!le&&(mg(),Qr()))}function xw(e,t){const s=e.getBoundingClientRect(),o=Math.min(s.right,window.innerWidth)-8,i=Math.max(s.left,0)+8;let a=0,r=0;for(const c of t){const d=c.getBoundingClientRect();d.width<2||d.height<2||(a=Math.max(a,d.right-o),r=Math.max(r,i-d.left))}if(a<=1&&r<=1)return!1;const l=e.scrollLeft;return a>1&&r>1?e.scrollLeft-=r:a>1?e.scrollLeft+=a:e.scrollLeft-=r,Math.abs(e.scrollLeft-l)>.5}function bd(){oo(!1)}function oo(e){if(L!=="house")return;const t=document.querySelector("#layer .char.avatar.mine")??document.querySelector("#layer .char");if(!t)return;const n=ze()||1,s=J.getBoundingClientRect(),o=8;let i=Math.min(s.right,window.innerWidth)-o,a=Math.max(s.left,0)+o;for(const p of["nudgeL","nudgeR"]){const b=$(p);if(!b||b.classList.contains("off")||b.offsetParent===null)continue;const _=b.getBoundingClientRect();_.width<2||_.height<2||(p==="nudgeL"?a=Math.max(a,_.right+6):i=Math.min(i,_.left-6))}i-a<48&&(i=Math.min(s.right,window.innerWidth)-o,a=Math.max(s.left,0)+o);const r=[t,...t.querySelectorAll(".nametag")];let l=0,c=0,d=1/0,g=-1/0;for(const p of r){const b=p.getBoundingClientRect();b.width<2||b.height<2||(l=Math.max(l,b.right-i),c=Math.max(c,a-b.left),d=Math.min(d,b.left),g=Math.max(g,b.right))}if(document.body.classList.contains("phone-portrait")&&d<1/0){const p=(d+g)/2-(a+i)/2;if(Math.abs(p)>3){Ke(j+p/n);return}}const f=_w(t),h=E6({cam:j,maxCam:no(),kidX:f,overflowL:c,overflowR:l,scale:n,nudgeX:e});Math.abs(h.cam-j)>.5&&Ke(h.cam),e&&Math.abs(h.kidX-f)>.5&&Mw(t,h.kidX)}function _w(e){if(e.dataset.pid&&y){const t=e.dataset.pid===y.pid?ge():y.presence.get(e.dataset.pid);if(t&&t.where==="house")return t.x}return B.get().characters.find(t=>t.id===e.dataset.cid)?.x??0}function Mw(e,t){if(e.dataset.pid&&y&&e.classList.contains("mine")){const o=ge();if(!o||o.where!=="house")return;Pe({...o,x:t}),cn();return}const n=e.dataset.cid;if(!n)return;const s=B.get().characters.find(o=>o.id===n);s&&B.dispatch({type:"char/move",id:n,room:B.get().currentRoom,x:t,y:s.y})}const Lw={living:"Living",bedroom:"Bed",kitchen:"Kitchen",salon:"Salon",nursery:"Nursery"};function vd(){const e=L==="house",t=document.body.classList.contains("phone-portrait"),n=e&&!qe.isPlay(),s=e&&te+1<re,o=e&&(t?n:n||s);document.body.classList.toggle("show-minimap",o)}const Cw='<svg class="tabIco" width="14" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6 L8 1 L15 6 V11 H1 Z" fill="currentColor"/></svg>';function wd(){return document.body.classList.contains("phone")?window.matchMedia("(max-width: 700px)").matches:!1}function Sw(){const e=wd()?"c":"f";vd(),e!==Ta&&(Ta=e,Cd(B.get()))}function ur(){gs.matches?rn():so()}window.addEventListener("resize",ur);gs.addEventListener("change",ur);let ql="",ea=!1;function Ol(){const e=$("stageWrap"),t=document.querySelector(".top"),n=document.querySelector(".tools"),s=a=>a?a.clientWidth+"x"+a.clientHeight:"0",o=window.visualViewport;return(o?Math.round(o.offsetTop)+"x"+Math.round(o.height)+"x"+Math.round(o.width):"")+" "+s(e)+" "+s(t)+" "+s(n)}function $d(){const e=$("modeToggle"),t=document.querySelector(".tools"),n=document.getElementById("modeDock"),s=document.querySelector(".drawerTop");if(!e||!t||!n||!s)return!1;const o=document.body.classList.contains("phone"),i=o&&!document.body.classList.contains("phone-portrait"),a=i?t:o?n:s,r=e.parentElement===a;return n.hidden=!o||i,r?!1:(i?t.insertBefore(e,t.firstChild):o?n.appendChild(e):s.insertBefore(e,s.firstChild),!0)}function Bw(){if(!document.body.classList.contains("phone-portrait")||!document.body.classList.contains("mode-play")||L!=="house")return;const e=$("stageWrap"),t=e.clientWidth,n=e.clientHeight;if(t<20||n<20||!(n>t*.85))return;const s=Math.max(280,Math.min(860,Math.round(Te*t/n)));if(Math.abs(s-te)<2)return;te=s,J.style.width=te+"px",J.style.height=Te+"px";const o=Math.min(t/te,n/Te);if(J.style.transform=`translate(-50%,-50%) scale(${o})`,J.style.setProperty("--fit",String(ze())),j>no())Ke(j);else{const i=$("mmView");i.style.left=j/re*100+"%",i.style.width=te/re*100+"%"}yd(),vd()}function rn(){if(ea||!gs.matches)return;const e=$d(),t=Ol()+(document.body.classList.contains("mode-play")?"p":"d");if(!(!e&&t===ql)){ea=!0;try{so(),Bw(),$e(),ql=Ol()+(document.body.classList.contains("mode-play")?"p":"d")}finally{ea=!1}}}if(typeof ResizeObserver<"u"){const e=new ResizeObserver(()=>rn()),t=document.querySelector(".top");t&&e.observe(t),e.observe($("stageWrap"));const n=document.querySelector(".tools");n&&e.observe(n)}window.visualViewport&&(window.visualViewport.addEventListener("resize",()=>rn()),window.visualViewport.addEventListener("scroll",()=>rn()));J.addEventListener("scroll",()=>{J.scrollLeft=0,J.scrollTop=0});const $t=(e,t)=>{const n=J.getBoundingClientRect();return{x:(e-n.left)/n.width*te+j,y:(t-n.top)/n.height*Te}},Ha=(e,t)=>{const n=J.getBoundingClientRect();return e>n.left&&e<n.right&&t>n.top&&t<n.bottom},Nl=(e,t)=>{const n=Ho.getBoundingClientRect();return e>n.left-20&&e<n.right+20&&t>n.top-20&&t<n.bottom+20},io=e=>Js[e.size]??1;function Ww(e,t){const n=io(e),s=Li(e)[t];let o=s.x;return e.flip&&(o=100-o),{x:e.x+(o-50)/100*fn*n,y:e.y-wt*n+s.y/160*wt*n}}function xd(e){const t=B.get();let n=null;for(const s of t.characters){if(s.room!==t.currentRoom)continue;const o=io(s),i=Math.abs(e.x-s.x)<fn*o/2+25&&e.y>s.y-wt*o-25&&e.y<s.y+20;for(const a of["left","right"]){if(s.held[a])continue;const r=Ww(s,a),l=Math.hypot(e.x-r.x,e.y-r.y);(i||l<75)&&(!n||l<n.d)&&(n={c:s,hand:a,d:l})}}return n}const _d=["none","radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)","repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)","linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)"],Md="repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 125px), linear-gradient(rgba(0,0,0,.06), transparent 50%)",Ua=e=>`url('${e.replace(/'/g,"%27")}')`;function Ld(e){const t=e.rooms[e.currentRoom],n=$("wall"),s=$("floor"),o=t.wallTile?ll[t.wallTile]:void 0;n.style.backgroundColor=t.wallpaper,o?(n.style.backgroundImage=Ua(o.url),n.style.backgroundSize="220px auto",n.style.backgroundPosition="0 0"):(n.style.backgroundImage=_d[t.pattern]??"none",n.style.backgroundSize=t.pattern===1?"44px 44px":t.pattern===3?"60px 60px":"auto",n.style.backgroundPosition=t.pattern===3?"0 0, 30px 30px":"0 0");const i=t.floorTile?ll[t.floorTile]:void 0;s.style.backgroundColor=t.floor,s.style.backgroundImage=i?`${Ua(i.url)}, linear-gradient(rgba(0,0,0,.06), transparent 50%)`:Md,s.style.backgroundSize=i?"180px auto, auto":"auto",$("mmWall").style.background=t.wallpaper,$("mmFloor").style.background=t.floor,Oc($("scenery"),e.currentRoom,t.items)}function mr(e){const n=e.rooms[e.currentRoom].items.filter(o=>He[o.kind]).map(o=>`<i style="left:${o.x/re*100}%;top:${(o.y-et(He[o.kind])*o.scale/2)/Te*100}%"></i>`).join(""),s=e.characters.filter(o=>o.room===e.currentRoom).map(o=>`<b style="left:${o.x/re*100}%;top:${(o.y-90)/Te*100}%;background:${o.shirt}"></b>`).join("");$("mmDots").innerHTML=n+s}function Cd(e){const t=wd();Ta=t?"c":"f",document.body.classList.toggle("tabs-compact",t),$("tabs").innerHTML=fr.map(n=>{const s=t?Lw[n.id]??n.name:n.name;return`<button class="tab ${e.currentRoom===n.id?"on":""}" data-room="${n.id}" style="--c:${n.color}" aria-label="${n.name}">${t?Cw:""}${s}</button>`}).join("")}function fs(e,t,n,s,o){e.style.left=(t-s/2)/re*100+"%",e.style.top=(n-o)/Te*100+"%",e.style.width=s/re*100+"%",e.style.height=o/Te*100+"%"}function Tw(e,t){let n=e.w*t,s=et(e)*t;if((e.kind==="kennel"||e.kind==="cat-tower")&&document.body.classList.contains("phone")){const o=Math.max(.2,ze()||1),i=44*re/(Math.max(1,te)*o),a=44/o;n<i&&(n=i),s<a&&(s=a)}return{w:n,h:s}}function bt(e){const t=e.rooms[e.currentRoom],n=new Set;for(const s of t.items){const o=He[s.kind];if(!o)continue;n.add(s.id);let i=ye.querySelector(`.item[data-id="${s.id}"]`);i||(i=document.createElement("div"),i.className="item",i.dataset.id=s.id,i.innerHTML=`<div class="inner">${Sn(o,!0)}</div>`,ye.appendChild(i),i.addEventListener("pointerdown",l=>Qw(i,l))),i.dataset.kind=s.kind,i.classList.toggle("is-light",Q8(s.kind,!!o.light));const a=Tw(o,s.scale);fs(i,s.x,s.y,a.w,a.h);const r=1e3+s.z;i.style.zIndex=String(r),i.style.setProperty("--iz",String(r)),i.classList.toggle("flipped",s.flip),i.classList.toggle("sel",we===s.id)}ye.querySelectorAll(".item").forEach(s=>{n.has(s.dataset.id)||s.remove()}),Hw(),Oc($("scenery"),e.currentRoom,t.items),Sd(e),mr(e)}const lt=new Map;function Pw(e){const t=io(e),n=fn*t,s=wt*t,o=Li(e),i=e.look2?.85:1;return["left","right"].map(a=>{const r=e.held[a],l=r&&He[r.kind];if(!r||!l)return"";const c=Math.min(.7,120*t/Math.max(l.w,et(l))/r.scale)*i,d=l.w*r.scale*c,g=et(l)*r.scale*c,f=o[a].x/100*n,h=o[a].y/160*s;return`<div class="held ${r.flip?"flipped":""}" data-hand="${a}" style="left:${(f-d/2)/n*100}%;top:${(h-g*.62)/s*100}%;width:${d/n*100}%;height:${g/s*100}%"><div class="inner">${Sn(l)}</div></div>`}).join("")}function Hw(){let e=ye.querySelector("#skyPuddles");e||(e=document.createElement("div"),e.id="skyPuddles",e.className="skyPuddles"),ye.appendChild(e);const t=[...ye.querySelectorAll(".item.is-light")];for(;e.children.length>t.length;)e.lastElementChild.remove();for(;e.children.length<t.length;)e.appendChild(document.createElement("i"));t.forEach((n,s)=>{const o=e.children[s],i=parseFloat(n.style.left),a=parseFloat(n.style.top),r=parseFloat(n.style.width),l=parseFloat(n.style.height),c=n.dataset.kind==="window"||n.dataset.kind==="tv";o.style.left=i-.6*r+"%",o.style.top=a-(c?.38:.5)*l+"%",o.style.width=2.2*r+"%",o.style.height=2*l+"%",o.style.zIndex=String(parseInt(n.style.zIndex||"1000",10))})}function Rt(e){const t=e.characters.filter(n=>n.room===e.currentRoom);for(const[n,s]of lt)t.some(o=>o.id===n)||(s.remove(),lt.delete(n));for(const n of t){let s=lt.get(n.id);s||(s=document.createElement("div"),s.className="char",s.dataset.cid=n.id,s.innerHTML='<div class="inner"></div><div class="hands"></div>',ye.appendChild(s),lt.set(n.id,s),Rw(s));const o=Vg(n);s.dataset.look!==o&&(s.querySelector(".inner").innerHTML=Ue(n),s.dataset.look=o);const i=JSON.stringify([n.held.left?.id,n.held.left?.flip,n.held.right?.id,n.held.right?.flip,n.size]);s.dataset.held!==i&&(s.querySelector(".hands").innerHTML=Pw(n),s.dataset.held=i);const a=io(n);fs(s,n.x,n.y,fn*a,wt*a),s.style.zIndex=String(5e3+Math.round(n.y)),s.classList.toggle("flipped",n.flip),s.classList.toggle("active",n.id===me),Xs(s,n,n.id===me);const r=Li(n);s.style.setProperty("--hx-l",r.left.x+"%"),s.style.setProperty("--hx-r",r.right.x+"%")}mr(e)}function Sd(e){const t=we&&e.rooms[e.currentRoom].items.find(o=>o.id===we);if(!t||!He[t.kind]){Ut.classList.add("hidden");return}const n=He[t.kind],s=t.y-et(n)*t.scale-20;Ut.classList.remove("hidden"),Ut.style.left=Math.max(j+130,Math.min(j+te-130,t.x))/re*100+"%",Ut.style.top=Math.max(40,s)/Te*100+"%"}function Bd(e){const t=$("soundIco");t&&(t.innerHTML=e.soundOn?ut.soundOn:ut.soundOff),$("btnSound").setAttribute("aria-label",e.soundOn?"Sound on":"Sound off"),W6(e.soundOn)}function Hn(){const e=B.get();ye.innerHTML="",lt.clear(),Cd(e),Ld(e),bt(e),Rt(e),Bd(e);const t=e.characters.find(o=>o.room===e.currentRoom),n=y&&ge(),s=n&&n.where==="house"?n.x:t?.x;Wi(),Ke(Xo[e.currentRoom]??pr(s!==void 0?s-te/2:ls)),cn(),xt(),document.body.classList.contains("phone")&&L==="house"&&requestAnimationFrame(()=>bd())}B.subscribe((e,t)=>{switch(t.type){case"room/switch":y&&Ge!==G&&Ow(t.room),Hn(),Ie(),fg(t.room);break;case"item/add":bt(e),Z$();break;case"game/reset":Hn();break;case"room/wallpaper":case"room/floor":case"room/pattern":case"room/wallTile":case"room/floorTile":Ld(e);break;case"char/update":case"char/move":Rt(e),L==="ranch"?on():L==="park"&&En();break;case"char/add":case"char/delete":case"char/hold":case"char/release":bt(e),Rt(e),Je==="__people"&&Ie();break;case"settings/sound":Bd(e);break;default:bt(e)}});function De(e){if(!e)return;const t=e.querySelector(":scope > .inner")??e;t.classList.remove("bounce"),t.offsetWidth,t.classList.add("bounce")}function yr(e,t,n=7){const s=$("fx"),o=["#ffd166","#ff8fab","#8ecae6","#80ed99","#c9a0dc"];for(let i=0;i<n;i++){const a=document.createElement("div");a.className="spark";const r=Math.PI*2*i/n+Math.random()*.5,l=40+Math.random()*30;a.style.left=e+"px",a.style.top=t+"px",a.style.background=o[i%o.length],a.style.setProperty("--dx",Math.cos(r)*l+"px"),a.style.setProperty("--dy",Math.sin(r)*l+"px"),s.appendChild(a),setTimeout(()=>a.remove(),650)}}const Pi=e=>{const t=e?.getBoundingClientRect();t&&yr(t.left+t.width/2,t.top+t.height/2)};function kr(e,t){yr(e,t,10),C.pop()}function Jo(e){lt.forEach((t,n)=>{t.classList.toggle("hold-target",!!e&&e.c.id===n),t.dataset.hand=e&&e.c.id===n?e.hand:""})}function Wd(e,t){B.dispatch({type:"char/hold",id:e.c.id,hand:e.hand,room:e.c.room,itemId:t}),we=null,bt(B.get());const n=lt.get(e.c.id);De(n),Pi(n?.querySelector(`.held[data-hand="${e.hand}"]`)),C.sparkle()}const vt=new Map;let gt=!1,ei=0;const br=()=>[...vt.values()].reduce((e,t)=>e+t,0)/vt.size;J.addEventListener("pointerdown",e=>{e.pointerType==="touch"&&(vt.set(e.pointerId,e.clientX),vt.size>=2&&(gt=!0,ei=br(),Wi(),Ut.classList.add("hidden")))},!0);window.addEventListener("pointermove",e=>{if(vt.has(e.pointerId)&&(vt.set(e.pointerId,e.clientX),gt&&vt.size>=2)){const t=br();Ke(j-(t-ei)/ze()),ei=t}},!0);const Td=e=>{vt.delete(e.pointerId),vt.size<2&&gt&&(vt.size===0?gt=!1:ei=br())};window.addEventListener("pointerup",Td,!0);window.addEventListener("pointercancel",Td,!0);const jn=80;function Uw(e,t){const n=J.getBoundingClientRect();return t<n.top-40||t>n.bottom+10?0:e<n.left+jn?-Math.min(1,(n.left+jn-e)/jn)*16:e>n.right-jn?Math.min(1,(e-(n.right-jn))/jn)*16:0}function Qn(e,t){let n=e,s=0;const o=()=>{const r=gt?0:Uw(n.clientX,n.clientY);if(r){const l=j;Ke(j+r),j!==l&&t.onMove(n)}s=requestAnimationFrame(o)};t.edgeScroll!==!1&&(s=requestAnimationFrame(o));const i=r=>{r.pointerId===e.pointerId&&(r.preventDefault(),n=r,gt||t.onMove(r))},a=r=>{r.pointerId===e.pointerId&&(cancelAnimationFrame(s),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",a),t.onUp(r))};window.addEventListener("pointermove",i,{passive:!1}),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a)}function Ew(e){return new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,pointerId:e.pointerId,pointerType:e.pointerType,button:e.button,buttons:e.buttons,isPrimary:e.isPrimary})}function Qw(e,t){const n=t.target,s=n&&n.closest?n.closest("img.artimg"):null;if(s&&!or(s,t.clientX,t.clientY)){const o=I4(t.clientX,t.clientY),i=o?.closest(".item"),a=o?.closest(".char");i&&i!==e?(t.stopPropagation(),Ea(i,t)):a&&(t.stopPropagation(),a.dispatchEvent(Ew(t)));return}Ea(e,t)}function Ea(e,t,n=!1){if(t.preventDefault(),t.stopPropagation(),gt)return;if(qe.isPlay()){k$(e,e.dataset.id);return}if(!nt()){ln(e);return}const s=B.get(),o=s.currentRoom,i=e.dataset.id,a=s.rooms[o].items.find(f=>f.id===i);if(!a)return;const r=He[a.kind],l=$t(t.clientX,t.clientY),c={x:a.x-l.x,y:a.y-l.y};let d=n,g=null;we=i,B.dispatch({type:"item/front",room:o,id:i}),e.classList.add("lifted"),C.pick(),Qn(t,{onMove(f){const h=$t(f.clientX,f.clientY);Math.hypot(h.x-l.x,h.y-l.y)>6&&(d=!0),d&&(Ut.classList.add("hidden"),Ho.classList.add("show")),Ho.classList.toggle("hot",Nl(f.clientX,f.clientY));const p=r.w*a.scale/2;B.dispatch({type:"item/move",room:o,id:i,x:Math.max(p*.6,Math.min(re-p*.6,h.x+c.x)),y:dd(r,h.y+c.y)}),d&&Ut.classList.add("hidden"),g=d&&r.holdable?xd(h):null,Jo(g)},onUp(f){if(e.classList.remove("lifted"),Ho.classList.remove("show","hot"),Jo(null),d&&Nl(f.clientX,f.clientY)){we=null,B.dispatch({type:"item/delete",room:o,id:i}),kr(f.clientX,f.clientY);return}if(d&&g){Wd(g,i);return}d?(C.drop(),De(e)):(C.click(),Kd(i),z6(e)),bt(B.get())}})}function Aw(e,t,n){if(n.preventDefault(),n.stopPropagation(),gt||qe.isPlay())return;const s=e.dataset.cid,o=t.dataset.hand,i=B.get().characters.find(d=>d.id===s),a=i?.held[o];if(!i||!a)return;const r=t.getBoundingClientRect(),l=$t(r.left+r.width/2,r.bottom);B.dispatch({type:"char/release",id:s,hand:o,x:l.x,y:l.y});const c=ye.querySelector(`.item[data-id="${a.id}"]`);c&&Ea(c,n,!0)}function Rw(e){e.addEventListener("pointerdown",t=>{const n=t.target.closest(".held"),s=n?.querySelector("img.artimg"),o=!!s&&!or(s,t.clientX,t.clientY);if(n&&!o){if(qe.isPlay()){t.preventDefault(),t.stopPropagation();return}if(!nt()){t.stopPropagation(),ln(e);return}return Aw(e,n,t)}if(t.preventDefault(),t.stopPropagation(),gt)return;if(!nt()){ln(e);return}we=null,bt(B.get());const i=e.dataset.cid;me=i;const a=B.get(),r=a.characters.find(f=>f.id===i);if(!r)return;const l=$t(t.clientX,t.clientY),c={x:r.x-l.x,y:r.y-l.y};let d=r.x,g=!1;e.classList.add("lifted"),C.pick(),Rt(B.get()),Qn(t,{onMove(f){const h=$t(f.clientX,f.clientY),p=h.x+c.x;Math.hypot(h.x-l.x,h.y-l.y)>6&&(g=!0);const b=B.get().characters.find(_=>_.id===i);if(b){if(Math.abs(p-d)>3){const _=p<d;_!==b.flip&&B.dispatch({type:"char/update",id:i,patch:{flip:_}}),d=p}B.dispatch({type:"char/move",id:i,room:a.currentRoom,x:p,y:Math.max(Bi+40,h.y+c.y)}),document.querySelectorAll(".tab").forEach(_=>_.classList.remove("drop")),document.elementFromPoint(f.clientX,f.clientY)?.closest(".tab:not(.on)")?.classList.add("drop")}},onUp(f){e.classList.remove("lifted"),document.querySelectorAll(".tab").forEach(b=>b.classList.remove("drop"));const h=document.elementFromPoint(f.clientX,f.clientY)?.closest("[data-room]"),p=B.get().characters.find(b=>b.id===i);if(g&&p&&h&&h.dataset.room!==a.currentRoom){const b=h.getBoundingClientRect();yr(b.left+b.width/2,b.top+b.height/2,9),C.swish(),B.dispatch({type:"char/move",id:i,room:h.dataset.room,x:p.x,y:p.y});return}C.drop(),De(e),g&&requestAnimationFrame(()=>oo(!0))}})})}function zw(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),qe.isPlay()){n.stopPropagation();return}if(!nt()){ln(e);return}const s=document.createElement("div");s.className="ghost",s.innerHTML=Sn(t),document.body.appendChild(s);const o=Math.max(1,60/(Math.max(t.w,et(t))*ze())),i=t.w*ze()*o,a=et(t)*ze()*o;s.style.width=i+"px",s.style.height=a+"px";let r=null;const l=g=>{s.style.left=g.clientX-i/2+"px",s.style.top=g.clientY-a*.8+"px",r=t.holdable&&Ha(g.clientX,g.clientY)?xd($t(g.clientX,g.clientY)):null,Jo(r)};l(n),C.pick(),e.classList.add("pressed");const c=n.clientX,d=n.clientY;Qn(n,{onMove:l,onUp(g){s.remove(),e.classList.remove("pressed"),Jo(null);const f=B.get().currentRoom,h=Math.hypot(g.clientX-c,g.clientY-d)<8;let p,b;if(h)p=j+380+Math.random()*240,b=t.wall?Math.min(cd,200+et(t)/2):500+Math.random()*40;else if(Ha(g.clientX,g.clientY)){const u=$t(g.clientX,g.clientY);p=u.x,b=dd(t,u.y+et(t)*.2)}else return;const _={id:Pa(t.kind.replace(/[^a-z0-9-]/gi,"")),kind:t.kind,x:p,y:b,flip:!1,z:0,scale:1};if(B.get().rooms[f].items.length===0){const u=N6(k=>Pa(k));for(let k=0;k<u.length;k++)B.dispatch({type:"item/add",room:f,item:u[k]})}if(B.dispatch({type:"item/add",room:f,item:_}),!h&&r){Wd(r,_.id);return}we=_.id,bt(B.get());const m=ye.querySelector(`.item[data-id="${_.id}"]`);De(m),Pi(m),C.sparkle()}})})}function Dw(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),qe.isPlay())return;if(!nt()){ln(e);return}const s=B.get().characters.find(f=>f.id===t);if(!s)return;const o=io(s),i=fn*o*ze(),a=wt*o*ze(),r=document.createElement("div");r.className="ghost",r.innerHTML=Ue(s),r.style.width=i+"px",r.style.height=a+"px",document.body.appendChild(r);const l=f=>{r.style.left=f.clientX-i/2+"px",r.style.top=f.clientY-a*.85+"px"},c=n.clientX,d=n.clientY;let g=!1;r.style.visibility="hidden",Qn(n,{onMove(f){Math.hypot(f.clientX-c,f.clientY-d)>8&&(g=!0,r.style.visibility=""),l(f)},onUp(f){if(r.remove(),!g){C.click(),me=t,as("dress");return}if(!Ha(f.clientX,f.clientY))return;const h=$t(f.clientX,f.clientY),p=B.get().currentRoom;B.dispatch({type:"char/move",id:t,room:p,x:h.x,y:Math.max(Bi+40,h.y+wt*o*.15)}),me=t,Rt(B.get());const b=lt.get(t);De(b),Pi(b),C.sparkle()}})})}function Pd(){if(!nt())return ln(null),null;const e=B.get();if(e.characters.length>=cs)return null;const t=Pa("c"),n=ki();B.dispatch({type:"char/add",char:an({id:t,...yi(n),look2:n,room:e.currentRoom,x:j+300+Math.random()*400,y:520+Math.random()*40})}),me=t,Rt(B.get());const s=lt.get(t);return De(s),Pi(s),C.sparkle(),t}function Iw(){return hr==="all"?"all":B.get().currentRoom}function Ie(){const e=B.get().currentRoom,t=Iw(),n=fr.find(l=>l.id===e)?.name??"This room",s=t==="all";$("roomFilter").innerHTML=`<button class="rf ${s?"on":""}" data-rf="${s?"room":"all"}">${s?"Just "+n:"All rooms"}</button>`;const o=Ji("secrets").length>0,i=is.filter(l=>l.id!=="secrets"&&(l.kind==="people"||l.kind==="pack"||Ji(l.id).length));!(Je==="secrets"&&o)&&!i.some(l=>l.id===Je)&&(Je=i[1]?.id??"__people"),$("cats").innerHTML=i.map(l=>`<button class="cat ${l.kind} ${l.id===Je?"on":""}" data-cat="${l.id}" aria-label="${l.name}" title="${l.name}">${l.kind==="people"?pw:l.kind==="pack"?`<span class="packicon">${Sn(He[l.icon])}</span><span class="packname">${l.name}</span>`:Sn(He[l.icon])}</button>`).join("")+(o?`<button class="cat secretTab ${Je==="secrets"?"on":""}" data-cat="secrets" aria-label="Secrets" title="Secrets">🎁</button>`:"");const a=$("shelf");if(a.innerHTML="",!nt()){a.innerHTML='<div class="empty locked">🔒 This house is look-only right now</div>';return}if(Je==="__people"){const l=B.get(),c=Un();if(c){const d=document.createElement("button");d.className="thing person me",d.setAttribute("aria-label","Me"),d.innerHTML=`<div class="face">${Ue(c)}</div><span class="meStar">★</span>`,d.addEventListener("click",()=>{C.click(),me=We,as("dress")}),a.appendChild(d)}for(const d of l.characters){const g=document.createElement("button");g.className="thing person",g.setAttribute("aria-label","Character"),g.innerHTML=`<div class="face">${Ue(d)}</div><span class="where" style="background:${gd(d.room)}"></span>`,a.appendChild(g),Dw(g,d.id)}if(l.characters.length<cs){const d=document.createElement("button");d.className="thing add",d.setAttribute("aria-label","New character"),d.innerHTML=fd,d.addEventListener("click",()=>{Pd()&&(Ie(),as("dress"))}),a.appendChild(d)}return}const r=Ji(Je);r.length||(a.innerHTML='<div class="empty">Nothing here yet!</div>');for(const l of r){const c=document.createElement("button");c.className="thing",c.setAttribute("aria-label",l.name),c.innerHTML=Sn(l),a.appendChild(c),zw(c,l)}a.scrollLeft=0,vr()}function vr(){const e=document.querySelector(".drawerTop"),t=document.getElementById("drawerBar");!e||!t||t.classList.toggle("more",e.scrollWidth-e.clientWidth-e.scrollLeft>6)}document.querySelector(".drawerTop").addEventListener("scroll",vr,{passive:!0});window.addEventListener("resize",vr);function jl(e,t,n){return`<div class="sw">${e.map(s=>`<button class="dot ${s===t?"on":""}" style="background:${s}" data-act="${n}" data-v="${s}"></button>`).join("")}</div>`}let Fs=null,Gn=!1;function qw(e){if(e===We){const n=Un();if(!n||n.look2)return;Zt(We,zo(Ro(n)));return}const t=B.get().characters.find(n=>n.id===e);!t||t.look2||Zt(e,{...zo(Ro(t)),size:t.size})}function St(){const e=B.get(),t=$("card");if(Fs==="paint"){t.classList.remove("avCard");const n=e.rooms[e.currentRoom],s=ba.filter(a=>a.kind==="wallpaper"),o=ba.filter(a=>a.kind==="floor"),i=(a,r,l,c)=>`<button class="dot pat tile ${a.id===r?"on":""}" data-act="${l}" data-v="${a.id}" title="${a.name} (${_c(a.pack)})" style="background-color:${c};background-image:${Ua(a.url)};background-size:48px auto"></button>`;t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${jl(fw,n.wallpaper,"wall")}
      <h3>Wallpaper</h3><div class="sw">${_d.map((a,r)=>`<button class="dot pat ${!n.wallTile&&r===n.pattern?"on":""}" data-act="pat" data-v="${r}" style="background-color:${n.wallpaper};background-image:${a};background-size:${r===1?"16px 16px":r===3?"20px 20px":"auto"}"></button>`).join("")}${s.map(a=>i(a,n.wallTile,"wtile",n.wallpaper)).join("")}</div>
      <h3>Floor</h3>${jl(hw,n.floor,"floor")}
      ${o.length?`<h3>Floor style</h3><div class="sw"><button class="dot pat ${n.floorTile?"":"on"}" data-act="ftile" data-v="" style="background-color:${n.floor};background-image:${Md}"></button>${o.map(a=>i(a,n.floorTile,"ftile",n.floor)).join("")}</div>`:""}`}else if(Fs==="dress"){t.classList.add("avCard");let n=e,s=Un(),o=s?an({id:We,...s}):null,i=me===We&&o?o:n.characters.find(r=>r.id===me)??o??n.characters[0];i&&!i.look2&&qw(i.id),n=B.get(),s=Un(),o=s?an({id:We,...s}):null,i=me===We&&o?o:n.characters.find(r=>r.id===me)??o??n.characters[0];const a=`<div class="picker">${o?`<button class="pk me ${i?.id===We?"on":""}" data-act="pickc" data-v="${We}"><div class="face">${Ue(o)}</div><span class="meStar">★</span></button>`:""}${n.characters.map(r=>`<button class="pk ${r.id===i?.id?"on":""}" data-act="pickc" data-v="${r.id}"><div class="face">${Ue(r)}</div><span class="where" style="background:${gd(r.room)}"></span></button>`).join("")}${n.characters.length<cs?`<button class="pk add" data-act="newc">${fd}</button>`:""}</div>`;if(!i){t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${a}<div class="dress"><p class="hint">Tap + to make someone new!</p></div>`;return}me=i.id,t.innerHTML=M6(i,a,Gn,ut.trash)}}function as(e){Fs=e,Gn=!1,St(),$("sheet").classList.remove("hidden"),C.swish()}$("sheet").addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(e.target===$("sheet")||t?.dataset.act==="close"){$("sheet").classList.add("hidden"),Fs=null,C.click(),Je==="__people"&&Ie();return}if(!t)return;const n=B.get(),s=n.currentRoom,o=t.dataset.v,i=me??"",a=t.dataset.act;if(a!=="delc"&&(Gn=!1),a&&a.indexOf("av-")===0){const r=i===We?Un():B.get().characters.find(d=>d.id===i);if(a==="av-surprise"){Zt(i,{...zo(ki()),size:r?.size??"kid"}),C.sparkle(),St(),De(document.querySelector(".avStage"));return}const l=r?.look2??Ro(r??{}),c=L6(l,a,o??"");if(!c){C.click(),St();return}Zt(i,{...zo(c),size:r?.size??"kid"}),C.sparkle(),St(),De(document.querySelector(".avStage"));return}switch(a){case"wall":B.dispatch({type:"room/wallpaper",room:s,color:o});break;case"floor":B.dispatch({type:"room/floor",room:s,color:o});break;case"pat":B.dispatch({type:"room/pattern",room:s,pattern:+o});break;case"wtile":B.dispatch({type:"room/wallTile",room:s,tile:o});break;case"ftile":B.dispatch({type:"room/floorTile",room:s,tile:o||null});break;case"skin":case"hair":case"shirt":case"pants":Zt(i,{[a]:o});break;case"hs":Zt(i,{hairStyle:+o});break;case"acc":Zt(i,{acc:+o});break;case"size":{const r=i===We?Un():B.get().characters.find(l=>l.id===i);Zt(i,{size:o,...r?.look2?{look2:r.look2}:{}}),Rt(B.get());break}case"pickc":me=o,Rt(B.get()),C.click(),St();return;case"newc":if(!Pd())return;break;case"delc":if(i===We||!nt())return;if(!Gn){Gn=!0,C.click(),St();return}Gn=!1;{const l=lt.get(i)?.getBoundingClientRect();B.dispatch({type:"char/delete",id:i}),l?kr(l.left+l.width/2,l.top+l.height/2):C.pop()}me=B.get().characters[0]?.id??null,St();return}C.sparkle(),St(),De(document.querySelector(".preview"))});$("tabs").addEventListener("click",e=>{const t=e.target.closest("[data-room]");if(!t)return;const n=t.dataset.room;n!==B.get().currentRoom&&(we=null,C.swish(),J.classList.remove("swap"),J.offsetWidth,J.classList.add("swap"),B.dispatch({type:"room/switch",room:n}))});$("cats").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");t&&(Je=t.dataset.cat,C.click(),Ie())});$("roomFilter").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");if(t){Je=t.dataset.cat,C.click(),Ie();return}const n=e.target.closest("[data-rf]");n&&(hr=n.dataset.rf==="all"?"all":"",C.click(),Ie())});Ut.addEventListener("pointerdown",e=>e.stopPropagation());Ut.addEventListener("click",e=>{const t=e.target.closest("[data-a]");if(!t||!we)return;if(!nt()){ln(null);return}const n=B.get().currentRoom,s=we,o=ye.querySelector(`.item[data-id="${s}"]`);switch(t.dataset.a){case"flip":B.dispatch({type:"item/flip",room:n,id:s}),C.swish(),De(o);break;case"front":B.dispatch({type:"item/front",room:n,id:s}),C.click(),De(o);break;case"back":B.dispatch({type:"item/back",room:n,id:s}),C.click(),De(o);break;case"delete":{const i=o?.getBoundingClientRect();we=null,B.dispatch({type:"item/delete",room:n,id:s}),i&&kr(i.left+i.width/2,i.top+i.height/2);break}}});J.addEventListener("pointerdown",e=>{if(e.target.closest(".nudge"))return;Wi();const t=e.clientX,n=j;let s=!1,o=0,i=e.clientX,a=performance.now();Qn(e,{edgeScroll:!1,onMove(r){if(Math.abs(r.clientX-t)>6&&(s=!0),!s)return;const l=performance.now();o=(r.clientX-i)/Math.max(1,l-a),i=r.clientX,a=l,Ke(n-(r.clientX-t)/ze())},onUp(){if(!s){we&&(we=null,bt(B.get()));return}if(gt)return;let r=-o*16/ze();const l=()=>{Math.abs(r)<.3||(Ke(j+r),r*=.92,Jn=requestAnimationFrame(l))};Jn=requestAnimationFrame(l)}})});J.addEventListener("wheel",e=>{e.preventDefault(),Wi(),Ke(j+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/ze())},{passive:!1});$("nudgeL").addEventListener("pointerdown",e=>{e.stopPropagation(),C.swish(),Ti((js??j)-te*.6)});$("nudgeR").addEventListener("pointerdown",e=>{e.stopPropagation(),C.swish(),Ti((js??j)+te*.6)});const Fl=$("minimap");Fl.addEventListener("pointerdown",e=>{e.stopPropagation(),e.preventDefault();const t=n=>{const s=Fl.getBoundingClientRect();Ti((n.clientX-s.left)/s.width*re-te/2)};t(e),C.click(),Qn(e,{edgeScroll:!1,onMove:t,onUp(){}})});$("btnPaint").addEventListener("click",()=>{if(!nt())return ln(null);as("paint")});$("btnDress").addEventListener("click",()=>as("dress"));$("btnSound").addEventListener("click",()=>{B.dispatch({type:"settings/sound",on:!B.get().soundOn}),C.click()});document.addEventListener("gesturestart",e=>e.preventDefault());document.addEventListener("contextmenu",e=>e.preventDefault());"serviceWorker"in navigator&&navigator.serviceWorker.register("/kids-house-game/sw.js");window.__store=B;window.__items=Object.fromEntries(zt.filter(e=>e.img).map(e=>[e.kind,{w:e.w,h:et(e),cat:e.cat,holdable:e.holdable,svg:e.img.includes(".svg")}]));window.__cam={get:()=>j,set:Ke};window.__phoneShowKids=()=>$e();window.__avatar={richAvatars:rr,randomLook2:ki,look2FromLegacy:Ro,legacyFromLook2:yi,sanitizeLook2:Gs,handsFor:Li};window.__frameHouseKid=()=>oo(!0);window.__layoutNameTags=()=>Ic();const N=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function nt(){return!y||Ge===G||y.canEdit(he)}function ln(e){C.pop();const t=$("houseTag");t.classList.add("show"),t.classList.remove("wiggle"),t.offsetWidth,t.classList.add("wiggle"),window.clearTimeout(ti),ti=window.setTimeout(()=>{L==="house"&&y&&!document.body.classList.contains("own-house")||t.classList.remove("show")},2e3),e&&(e.classList.remove("nope"),e.offsetWidth,e.classList.add("nope")),Q("🔒 Look-only house: ask the owner to unlock it!",1800)}const ge=()=>y?.myPresence()??null,Un=()=>y?y.players.get(y.pid)?.look??null:null;function Zt(e,t){if(e===We){const n=Un();if(!n||!y)return;y.setLook(Ys({...n,...t})),cn(),L==="street"&&ni(),L==="park"&&En(),L==="ranch"&&on();return}B.dispatch({type:"char/update",id:e,patch:t})}function Pe(e){y?.setPresence(e)}function Ow(e){const t=ge();t&&t.where==="house"&&Pe({...t,room:e})}function Hd(e){Ge=e,ld(e),we=null,setTimeout(()=>yg.update());for(const t of Object.keys(Xo))delete Xo[t];me=e===G?e.get().characters[0]?.id??null:We,Hn(),Ie()}function wr(e,t){return`<div class="inner">${Ue(e)}</div><div class="nametag">${N(t)}</div>`}function cn(){const e=new Set;if(y&&Ge!==G&&L==="house"){const t=B.get().currentRoom,n=[...y.presence.entries()],s=ge();s&&n.push([y.pid,s]);for(const[o,i]of n){const a=y.players.get(o);if(!a||i.where!=="house"||i.houseId!==he||i.room!==t)continue;e.add(o);let r=Ss.get(o);(!r||!r.isConnected)&&(r=document.createElement("div"),r.className="char avatar "+(o===y.pid?"mine":"other"),r.dataset.pid=o,ye.appendChild(r),Ss.set(o,r),o===y.pid&&Nw(r));const l=a.look,c=JSON.stringify(l)+a.nickname;if(r.dataset.look!==c){const g=r.querySelector(".bubble");r.innerHTML=wr(l,a.nickname),g&&r.appendChild(g),r.dataset.look=c}const d=Js[l.size]??1;fs(r,i.x,i.y,fn*d,wt*d),r.style.zIndex=String(5e3+Math.round(i.y)),r.classList.toggle("flipped",i.flip),Xs(r,l,o===y.pid)}}for(const[t,n]of Ss)(!e.has(t)||!n.isConnected)&&(e.has(t)||n.remove(),Ss.delete(t));An()}function Nw(e){e.addEventListener("pointerdown",t=>{if(t.preventDefault(),t.stopPropagation(),gt||!y)return;const n=ge();if(!n||n.where!=="house")return;const s=$t(t.clientX,t.clientY),o={x:n.x-s.x,y:n.y-s.y};let i=n.x;e.classList.add("lifted"),C.pick(),Qn(t,{onMove(a){const r=$t(a.clientX,a.clientY),l=ge();if(!l||l.where!=="house")return;const c=Math.max(40,Math.min(re-40,r.x+o.x)),d=Math.max(Bi+40,Math.min(Te,r.y+o.y)),g=Math.abs(c-i)>3?c<i:l.flip;Math.abs(c-i)>3&&(i=c),Pe({...l,x:c,y:d,flip:g}),cn(),mr(B.get())},onUp(){e.classList.remove("lifted"),C.drop(),De(e),requestAnimationFrame(()=>oo(!0))}})})}function jw(e){return e.kind==="text"?e.v:(e.kind==="phrase"?Hs:hc)[e.v]??""}function hs(){const e=document.querySelectorAll(".bubble");if(!document.body.classList.contains("phone")){e.forEach(s=>{(s.style.marginLeft||s.style.marginTop)&&(s.style.marginLeft="",s.style.marginTop="")});return}const t=J.getBoundingClientRect(),n=ze()||1;e.forEach(s=>{s.style.marginLeft="0px",s.style.marginTop="0px";const o=s.getBoundingClientRect();let i=0;o.width>=t.width-8||o.left<t.left+4?i=t.left+4-o.left:o.right>t.right-4&&(i=t.right-4-o.right);let a=0;o.top<t.top+4?a=t.top+4-o.top:o.bottom>t.bottom-4&&(a=t.bottom-4-o.bottom),i&&(s.style.marginLeft=i/n+"px"),a&&(s.style.marginTop=a/n+"px")})}function Fw(e,t){const n=L==="street"?document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`):L==="park"?document.querySelector(`#pavatars .savatar[data-pid="${e}"]`):L==="ranch"?document.querySelector(`#ravatars .savatar[data-pid="${e}"]`):L==="gameroom"?document.querySelector(`#gavatars .savatar[data-pid="${e}"]`):Ss.get(e),s=n?[n]:[];for(const o of s){o.querySelector(".bubble")?.remove();const i=document.createElement("div");i.className="bubble"+(t.kind==="emote"?" emote":""),i.textContent=jw(t),o.appendChild(i),hs(),setTimeout(()=>i.classList.add("out"),4600),setTimeout(()=>i.remove(),5e3)}e!==y?.pid&&C.click()}function Hi(){const e=ge();if(!y||!e)return 0;let t=0;return y.presence.forEach(n=>{$h(e,n)&&t++}),t}function An(){const e=Hi();$("btnChat").classList.toggle("glow",e>0),Ui();const t=document.getElementById("chatNear");t&&(t.textContent=e?`${e} friend${e>1?"s":""} nearby can hear you`:"Walk closer to a friend to talk!",$("chatTray").classList.toggle("nobody",!e))}function Ud(){const e=$("chatTray");if(!y)return;const t=document.body.classList.contains("phone"),n=`<div class="phrases">${Hs.map((a,r)=>`<button data-phrase="${r}">${N(a)}</button>`).join("")}</div>`,s=y.settings.freeChat?`<form class="typed" id="chatForm"><input id="chatInput" maxlength="${tr}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>`:'<div class="presetsOnly">Picking from the bubbles above 💬</div>',o=t?'<button type="button" class="chatMore" data-chat="more">more</button>':"";e.innerHTML=`<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${hc.map((a,r)=>`<button data-emote="${r}">${a}</button>`).join("")}</div>
    ${o}
    <div class="chatExtra${t?" hidden":""}">${n}${s}</div>`,An(),document.getElementById("chatForm")?.addEventListener("submit",a=>{a.preventDefault();const r=$("chatInput"),l=ch(r.value);if(!l.ok){$("chatWarn").textContent=wi[l.reason]??"",C.pop();return}if(!Hi()){Q("Walk closer to a friend to talk!");return}y.say({kind:"text",v:l.text}),r.value="",$("chatWarn").textContent="",r.blur()})}$("chatTray").addEventListener("click",e=>{const t=e.target;if(!y)return;if(t.closest('[data-chat="close"]')){$("chatTray").classList.add("hidden");return}const n=t.closest('[data-chat="more"]');if(n){const i=$("chatTray").querySelector(".chatExtra");i?.classList.toggle("hidden"),n.textContent=i&&!i.classList.contains("hidden")?"less":"more";return}const s=t.closest("[data-emote]"),o=t.closest("[data-phrase]");if(!(!s&&!o)){if(!Hi()){Q("Walk closer to a friend to talk!");return}y.say(s?{kind:"emote",v:+s.dataset.emote}:{kind:"phrase",v:+o.dataset.phrase}),C.click()}});$("btnChat").addEventListener("click",()=>{$("chatTray").classList.toggle("hidden")||(Ud(),C.swish())});function xt(){const e=document.body.classList,n=!!y&&Ge!==G&&L==="house"?y.houses.get(he):void 0,s=!!n&&n.meta.ownerId===y.pid;if(e.toggle("mode-hood",!!y),e.toggle("view-street",L!=="house"),e.toggle("view-park",L==="park"),e.toggle("view-ranch",L==="ranch"),e.toggle("view-map",L==="street"),e.toggle("view-gameroom",L==="gameroom"),e.toggle("in-barn",L==="ranch"&&le),e.toggle("mode-play",L==="house"&&qe.isPlay()),Er(),Dd(),e.toggle("own-house",s),e.toggle("locked",!!n&&!nt()),e.toggle("has-hood",!!$i()),Ui(),n){const o=y.players.get(n.meta.ownerId)?.nickname??"";$("houseTag").innerHTML=`${n.meta.locked?"🔒 ":""}<b>${N(n.meta.name)}</b>${s?" · yours":o?" · "+N(o):""}`;const i=$("lockIco");i&&(i.innerHTML=n.meta.locked?Fe.lockOn:Fe.lockOff);const a=n.meta.locked?"Unlock my house":"Lock my house";$("btnLock").setAttribute("aria-label",n.meta.locked?"Unlock house":"Lock house");const r=$("lockLabel");r&&(r.textContent=a)}An(),Zw(),document.body.classList.contains("phone")&&ud()}let ta="",ti=0;function Zw(){const e=$("houseTag"),t=!!y&&L==="house"&&!document.body.classList.contains("own-house");if(L!=="house"||!y){ta="",e.classList.remove("show");return}if(t){e.classList.add("show");return}const n=he||"solo";ta!==n&&(ta=n,e.classList.add("show"),window.clearTimeout(ti),ti=window.setTimeout(()=>e.classList.remove("show"),2e3))}$("btnLock").addEventListener("click",()=>{const e=y?.houses.get(he);!e||e.meta.ownerId!==y.pid||(y.lock(e.meta.id,!e.meta.locked),C.click(),Q(e.meta.locked?"Unlocked: friends can decorate!":"Locked: friends can look but not change things"))});const Ee=new Map;let Zl="",Qa=0,pe={w:Et,h:Qt,portrait:!1};function Vw(){return document.body.classList.contains("phone-portrait")}function Ed(){const e=$("street"),t=Math.max(1,e.clientWidth),n=Math.max(1,e.clientHeight);return Math.min(t/pe.w,n/pe.h)}function Gw(e){const t=$("street"),n=$("mapWorld"),s=pe.w*e,o=pe.h*e;n.style.marginLeft=Math.max(0,Math.floor((t.clientWidth-s)/2))+"px",n.style.marginTop=Math.max(0,Math.floor((t.clientHeight-o)/2))+"px",t.scrollLeft=0,t.scrollTop=0,Qd()}function Qd(){const e=$("street"),t=$("mapWorld"),n=4,s=e.clientWidth-n,o=e.clientHeight-n,i=t.offsetLeft,a=t.offsetTop;t.querySelectorAll(".mapSign").forEach(r=>{r.style.transform="translateX(-50%)";const l=r.offsetWidth,c=r.offsetHeight,d=i+r.offsetLeft-l/2,g=a+r.offsetTop;let f=0,h=0;d<n&&(f=n-d),d+l+f>s&&(f-=d+l+f-s),g<n&&(h=n-g),g+c+h>o&&(h-=g+c+h-o),Kw(r,f,h,i,a,n,s,o)})}function Kw(e,t,n,s,o,i,a,r){const l=[...e.parentElement.querySelectorAll(".mapMail")],c=()=>{const g=e.offsetWidth,f=e.offsetHeight,h=s+e.offsetLeft-g/2+t,p=o+e.offsetTop+n;return{left:h,top:p,right:h+g,bottom:p+f,width:g,height:f}};for(let g=0;g<6;g++){const f=c(),h=l.find(M=>{const T=s+M.offsetLeft,H=o+M.offsetTop,U=T+M.offsetWidth,F=H+M.offsetHeight;return f.right>T+2&&f.left<U-2&&f.bottom>H+2&&f.top<F-2});if(!h)break;const p=s+h.offsetLeft,b=o+h.offsetTop,_=b+h.offsetHeight,m=c(),u=_+4-m.top,k=m.bottom-(b-4);m.top+u+m.height<=r?n+=u:m.top-k>=i?n-=k:t-=Math.min(m.right,p+h.offsetWidth)-Math.max(m.left,p)+6}const d=c();d.left<i&&(t+=i-d.left),d.right>a&&(t-=d.right-a),d.top<i&&(n+=i-d.top),d.bottom>r&&(n-=d.bottom-r),e.style.transform=Math.abs(t)>.5||Math.abs(n)>.5?`translate(calc(-50% + ${t.toFixed(1)}px), ${n.toFixed(1)}px)`:"translateX(-50%)"}document.fonts?.ready.then(()=>{L==="street"&&Qd()});function Yw(){return y?[...y.houses.values()].map(e=>e.meta).sort((e,t)=>e.slot-t.slot):[]}function Xw(e){const s=Math.round(97.5),o=Math.max(1,Math.ceil(e/(e===1?1:2))),i=158,a=318,l=a+(o-1)*i+s/2+108,c=Math.max(1020,l+78),d=Math.max(l,Math.min(c-88,Math.round(c*.74))),g=e===1?[280]:[150,410],f=e===1?1:2,h=Array.from({length:e},(p,b)=>({x:g[b%f],y:a+Math.floor(b/f)*i}));return{w:560,h:c,hw:104,hh:s,houses:h,square:{x:280,y:d},park:{x:96,y:122},club:{x:280,y:116},ranch:{x:458,y:120}}}function Cn(e=!1){if(L!=="street")return;const t=$("mapWorld"),n=Yw(),s=y?n.map(f=>({id:f.id,name:f.name,style:f.style,locked:f.locked,mine:f.ownerId===y.pid,lit:!!y.players.get(f.ownerId)?.online})):Qa?Array.from({length:Qa},(f,h)=>({id:"fake"+h,name:["Reagan","Quinn","Chloe","Sloane","Cada","Emma","Olivia","Charlotte","Amelia","Sophia","Isabella","Mia"][h%12]+"'s House",style:h,locked:h===3,mine:h===0,lit:h%3!==1})):[null],o=Vw()?Xw(Math.max(1,s.length)):null;pe=o?{w:o.w,h:o.h,portrait:!0}:{w:Et,h:Qt,portrait:!1};const i=Ed(),a=(pe.portrait?"P":"L")+pe.w+"x"+pe.h+":"+i.toFixed(3)+JSON.stringify(n)+(y?n.map(f=>(y.players.get(f.ownerId)?.online?1:0)+(na(f.id)?"u":"")).join("")+y.pid:"solo");if(!e&&a===Zl&&t.querySelector("#mapFaces")){ni();return}Zl=a,t.style.width=pe.w*i+"px",t.style.height=pe.h*i+"px",t.style.setProperty("--sc",String(i)),t.innerHTML=`<div class="mapClip">${o?wg(o.w,o.h):vg()}</div>`;const r=t.querySelector(".mapClip"),l=f=>f*i+"px";Ee.clear();const c=s.length;let d="",g="";if(o){const{hw:f,hh:h}=o,p=34,b=40;s.forEach((k,M)=>{const T=o.houses[M]??o.houses[0],H=k?`house:${k.id}`:"home",U=k?k.name:"My House";Ee.set(k?"house:"+k.id:"home",{x:T.x,y:T.y-h/2-8});const F=!!(k&&na(k.id)),se=T.x<o.w/2?Math.max(4,T.x-f/2-p-8):Math.min(o.w-p-4,T.x+f/2+8),O=Math.max(4,Math.min(o.h-b-4,T.y-h*.42));d+=`<button class="mapSpot mapHouse ${k?.mine||!k?"mine":""}" data-go="${H}" aria-label="${N(U)}" style="left:${l(T.x-f/2)};top:${l(T.y-h/2)};width:${l(f)};height:${l(h)}">${Fo(k?k.style:0,{lit:k?k.lit:!0})}${k?.locked?'<span class="lockBadge">🔒</span>':""}${k?.mine||!k?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${F?"up":""}" data-mail="${k?k.id:"home"}" aria-label="${N(U)} mailbox" style="left:${l(se)};top:${l(O)};width:${l(p)};height:${l(b)}">${tl(F)}</button>`,g+=`<div class="mapSign ${k?.mine||!k?"mine":""}" style="left:${l(T.x)};top:${l(T.y+h/2+2)}">${N(U)}</div>`});const _=(k,M,T,H,U,F,ae,se,O)=>{d+=`<button class="mapSpot ${k}" data-go="${M}" aria-label="${T}" style="left:${l(U-ae/2)};top:${l(F-se/2)};width:${l(ae)};height:${l(se)}">${H}</button>`,g+=`<div class="mapSign place" style="left:${l(U)};top:${l(F+O)}">${T==="The park"?"Park":T==="Rainbow Ranch"?"Rainbow Ranch":"Clubhouse"}</div>`};_("mapPark","park","The park",Dr,o.park.x,o.park.y,148,126,68),_("mapRanch","ranch","Rainbow Ranch",Ir,o.ranch.x,o.ranch.y,156,128,72),_("mapClub","gameroom","The clubhouse",qr,o.club.x,o.club.y,146,120,68),Ee.set("park",{x:o.park.x,y:o.park.y-78}),Ee.set("ranch",{x:o.ranch.x,y:o.ranch.y-80}),Ee.set("barn",{x:o.ranch.x,y:o.ranch.y+8}),Ee.set("gameroom",{x:o.club.x,y:o.club.y-74}),Ee.set("square",o.square);const m=[{x:o.park.x,y:o.park.y,r:90},{x:o.ranch.x,y:o.ranch.y,r:96},{x:o.club.x,y:o.club.y,r:88},{x:o.square.x,y:o.square.y,r:70},...o.houses.map(k=>({x:k.x,y:k.y,r:78}))],u=o.w/2;r.insertAdjacentHTML("beforeend",zr(m,(k,M)=>Math.abs(k-u)<34,o.w,o.h)+_g(o.w,o.h,m)+d+'<div class="mapFaces" id="mapFaces"></div>')}else{const f=t.querySelector("#mapRoad"),h=f.getTotalLength(),p=Array.from({length:160},(M,T)=>f.getPointAtLength(h*T/159)),b=(M,T)=>p.some(H=>Math.hypot(H.x-M,H.y-T)<50),_=Aa(),m=c>8?80:94,u=m*300/320,k=Ad(f,c,_);s.forEach((M,T)=>{const H=k[T],U=M?`house:${M.id}`:"home",F=M?M.name:"My House";Ee.set(M?"house:"+M.id:"home",{x:H.x,y:H.y-u/2-4});const ae=!!(M&&na(M.id)),se=34,O=40,fe=14/i,zn=Math.max(4,Math.min(Et-se-4,H.x+m/2+fe)),Dn=Math.max(4,Math.min(Qt-O-4,H.y-u*.22));d+=`<button class="mapSpot mapHouse ${M?.mine||!M?"mine":""}" data-go="${U}" aria-label="${N(F)}" style="left:${l(H.x-m/2)};top:${l(H.y-u/2)};width:${l(m)};height:${l(u)}">${Fo(M?M.style:0,{lit:M?M.lit:!0})}${M?.locked?'<span class="lockBadge">🔒</span>':""}${M?.mine||!M?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${ae?"up":""}" data-mail="${M?M.id:"home"}" aria-label="${N(F)} mailbox" style="left:${l(zn)};top:${l(Dn)};width:${l(se)};height:${l(O)}">${tl(ae)}</button>`,g+=`<div class="mapSign ${M?.mine||!M?"mine":""}" style="left:${l(H.x)};top:${l(H.y+u/2-2)}">${N(F)}</div>`}),d+=`<button class="mapSpot mapPark" data-go="park" aria-label="The park" style="left:${l(Nt.x-100)};top:${l(Nt.y-85)};width:${l(200)};height:${l(170)}">${Dr}</button>`,g+=`<div class="mapSign place" style="left:${l(Nt.x)};top:${l(Nt.y+70)}">Park</div>`,d+=`<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${l(pt.x-110)};top:${l(pt.y-90)};width:${l(220)};height:${l(180)}">${Ir}</button>`,g+=`<div class="mapSign place" style="left:${l(pt.x)};top:${l(pt.y+78)}">Rainbow Ranch</div>`,d+=`<button class="mapSpot mapClub" data-go="gameroom" aria-label="The clubhouse" style="left:${l(jt.x-95)};top:${l(jt.y-78)};width:${l(190)};height:${l(156)}">${qr}</button>`,g+=`<div class="mapSign place" style="left:${l(jt.x)};top:${l(jt.y+82)}">Clubhouse</div>`,Ee.set("park",{x:Nt.x,y:Nt.y-60}),Ee.set("ranch",{x:pt.x-30,y:pt.y-60}),Ee.set("barn",{x:pt.x+10,y:pt.y+10}),Ee.set("gameroom",{x:jt.x,y:jt.y-52}),r.insertAdjacentHTML("beforeend",zr(_,b)+d+'<div class="mapFaces" id="mapFaces"></div>')}t.insertAdjacentHTML("beforeend",g),ni(),Gw(i)}const Aa=()=>[{x:Nt.x,y:Nt.y,r:115},{x:pt.x,y:pt.y,r:125},{x:mt.x,y:mt.y,r:100},{x:jt.x,y:jt.y,r:90}];function Ad(e,t,n){const s=e.getTotalLength(),o=[];for(let i=0;i<t;i++){const a=t===1?.2:.05+.75*i/(t-1),r=e.getPointAtLength(s*a),l=e.getPointAtLength(Math.min(s,s*a+3));let c=-(l.y-r.y),d=l.x-r.x;const g=Math.hypot(c,d)||1;c/=g,d/=g;const f=[1,-1].map(b=>({x:r.x+c*72*b,y:r.y+d*72*b})).map(b=>({...b,score:Math.min(...n.map(_=>Math.hypot(_.x-b.x,_.y-b.y)-_.r),b.x-50,Et-50-b.x,b.y-60,Qt-40-b.y)})),h=i%2?f:[f[1],f[0]],p=h[0].score>0||h[0].score>=h[1].score?h[0]:h[1];p.x=Math.max(60,Math.min(Et-60,p.x)),p.y=Math.max(62,Math.min(Qt-72,p.y)),n.push({x:p.x,y:p.y,r:70}),o.push({x:p.x,y:p.y})}return o}window.__mapFake=e=>{Qa=e,Cn(!0)};window.__mapLayout=e=>{const t=document.querySelector("#mapRoad");if(!t)return null;const n=Ad(t,e,Aa());let s=1e9,o=1e9,i=!0;return n.forEach((a,r)=>{n.forEach((l,c)=>{c>r&&(s=Math.min(s,Math.hypot(a.x-l.x,a.y-l.y)))}),Aa().forEach(l=>{o=Math.min(o,Math.hypot(a.x-l.x,a.y-l.y)-l.r)}),(a.x<55||a.x>Et-55||a.y<60||a.y>Qt-70)&&(i=!1)}),{n:e,minHouse:s,minSpot:o,inside:i}};function Rd(e){return e.where==="house"&&e.houseId?{kind:"house",houseId:e.houseId,room:e.room}:e.where==="park"||e.where==="ranch"||e.where==="barn"||e.where==="gameroom"?{kind:e.where}:{kind:"square"}}const Jw=e=>e.kind==="house"?"house:"+e.houseId:e.kind;function ni(){const e=document.getElementById("mapFaces");if(!e||L!=="street")return;const t=Ed(),n=new Set,s=[];if(y){const i=[...y.presence.entries()],a=ge();a&&i.push([y.pid,a]);for(const[r,l]of i){const c=y.players.get(r);c&&s.push({key:r,look:c.look,name:c.nickname,mine:r===y.pid,place:Rd(l)})}}else{const i=G.get().characters[0];i&&s.push({key:"solo",look:Ys(i),name:"You",mine:!0,place:{kind:"square"}})}const o=new Map;for(const i of s){const a=Jw(i.place);o.has(a)||o.set(a,[]),o.get(a).push(i)}for(const[i,a]of o)a.sort((r,l)=>r.mine?-1:l.mine?1:r.name.localeCompare(l.name)),a.forEach((r,l)=>{let c,d;const g=Ee.get("square")??{x:mt.x,y:mt.y};if(i==="square")if(pe.portrait){const m=Math.floor(l/3),u=l%3,k=Math.min(3,a.length-m*3);c=g.x+(u-(k-1)/2)*176,d=g.y+m*112}else if(a.length===1)c=mt.x,d=mt.y;else{const b=-Math.PI/2+l*(Math.PI*2/a.length);c=mt.x+Math.cos(b)*78,d=mt.y+Math.sin(b)*78}else{const b=Ee.get(i)??g,_=pe.portrait?2:3,m=pe.portrait?150:64,u=Math.floor(l/_),k=l%_,M=Math.min(_,a.length-u*_);c=b.x+(k-(M-1)/2)*m,d=b.y-u*(pe.portrait?108:64)}pe.portrait&&(c=Math.max(100,Math.min(pe.w-100,c)),d=Math.max(48,Math.min(pe.h-84,d))),n.add(r.key);let f=e.querySelector(`.mapFace[data-pid="${r.key}"]`);f||(f=document.createElement("button"),f.className="mapFace "+(r.mine?"mine":"other"),f.dataset.pid=r.key,f.setAttribute("aria-label",r.mine?"You":r.name),e.appendChild(f));const h=JSON.stringify(r.look)+r.name;if(f.dataset.look!==h){const b=f.querySelector(".bubble");f.innerHTML=`<span class="face">${ja(Ue(r.look))}</span><span class="fname">${N(r.mine?"You":r.name)}</span>`,b&&f.appendChild(b),f.dataset.look=h}f.dataset.place=i;const p=pe.portrait?62:46;f.style.left=(c-p/2)*t+"px",f.style.top=(d-p/2)*t+"px",f.style.width=f.style.height=p*t+"px"});e.querySelectorAll(".mapFace").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),An()}function zd(e,t){const n=$("mapWorld");if(t&&!n.classList.contains("zoomIn")){const s=t.getBoundingClientRect(),o=n.getBoundingClientRect();n.style.transformOrigin=`${s.left+s.width/2-o.left}px ${s.top+s.height/2-o.top}px`,n.classList.remove("mapIn"),n.classList.add("zoomIn"),C.swish(),setTimeout(()=>{n.classList.remove("zoomIn"),Vl(e)},360)}else Vl(e)}function ao(e){e.classList.remove("sceneIn"),e.offsetWidth,e.classList.add("sceneIn"),setTimeout(()=>e.classList.remove("sceneIn"),600)}function Vl(e){e.kind==="house"?qd(e.houseId,e.room):e.kind==="home"?Id():e.kind==="park"?l$():e.kind==="ranch"?Vs(!1):e.kind==="barn"?Vs(!0):e.kind==="gameroom"&&c$()}function e$(e){const t=y?.presence.get(e);if(!y||!t)return;const n=Rd(t),s=y.players.get(e)?.nickname??"your friend";if(n.kind==="square"){Q(`${s} is on the map too! 👋`);return}const o=document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`)??void 0;zd(n,o),setTimeout(()=>{const i=ge();if(!i||!y)return;const a=t.x+(t.x>300?-110:110);if(n.kind==="house"&&i.where==="house")Pe({...i,x:a,y:t.y}),cn(),Ti(a-te/2);else if((n.kind==="park"||n.kind==="ranch"||n.kind==="barn")&&i.where===n.kind){ct({...i,x:a,y:Math.max(Bn,Math.min(At,t.y)),flip:a>t.x});const r=n.kind==="park"?hn():ft(),l=$(n.kind==="park"?"parkScroll":"ranchScroll");requestAnimationFrame(()=>{l.scrollLeft=t.x*r-l.clientWidth/2,$e()})}else if(n.kind==="gameroom"&&i.where==="gameroom"){const r=ds();r||ct({where:"gameroom",x:a,y:Math.max(Bn,Math.min(At,t.y)),flip:a>t.x});const l=gn(),c=$("grScroll"),d=r?.x??t.x;requestAnimationFrame(()=>{c.scrollLeft=d*l-c.clientWidth/2,$e()})}Q(`You found ${s}! 💕`)},420)}function na(e){if(!y)return!1;const t=y.houses.get(e);return!!t&&t.meta.ownerId===y.pid&&Ya(t.confirmed.mailbox)>0}let wo=0;function Dd(){md();const e=document.getElementById("mailCue"),t=y?.myHouseId()??"",n=y&&t?Ya(y.houses.get(t)?.confirmed.mailbox):0;if(!y||L!=="street"||n<=0){n<=0&&(wo=0),e?.classList.remove("show");return}wo!==n&&(wo=n,e?.classList.add("show"),window.setTimeout(()=>{wo===n&&e?.classList.remove("show")},8e3))}function Ui(){const e=y?.myHouseId()??"",t=y&&e?Ya(y.houses.get(e)?.confirmed.mailbox):0,n=$("menuBadge");n.textContent=t>9?"9+":String(t),n.classList.toggle("on",t>0);const s=document.getElementById("mailNew");s&&(s.textContent=t>0?t===1?"1 new":t+" new":"",s.classList.toggle("on",t>0));const o=y?y.presence.size:0,i=$("mapBadge");i.textContent=o>9?"9+":String(o),i.classList.toggle("on",o>0),$("btnMap").setAttribute("aria-label",o>0?`Map, ${o} friends online`:"Map");const a=Hi(),r=$("chatBadge");r.textContent=a>9?"9+":String(a),r.classList.toggle("on",a>0)}function Ra(e){e&&document.querySelectorAll(".toast").forEach(t=>t.remove()),$("menuPop").classList.toggle("hidden",!e),$("btnMenu").setAttribute("aria-expanded",e?"true":"false"),e&&Ui(),t$()}function t$(){const e=$("houseTag");if(e.style.top="",!e.classList.contains("show")||$("menuPop").classList.contains("hidden"))return;const t=document.querySelector(".menuCard");if(!t)return;const n=$("stageWrap").getBoundingClientRect(),s=t.getBoundingClientRect(),o=e.getBoundingClientRect();if(!(o.top<s.bottom-2&&o.bottom>s.top+2&&o.left<s.right-2&&o.right>s.left+2))return;const a=s.bottom-n.top+8;a+o.height<n.height-8?e.style.top=a+"px":e.style.top=Math.max(8,n.height-o.height-10)+"px"}$("btnMenu").addEventListener("click",()=>{Ra($("menuPop").classList.contains("hidden")),C.click()});$("menuPop").addEventListener("click",e=>{const t=e.target;if(t.id==="menuPop"||t.closest("#menuClose")){Ra(!1);return}t.closest(".menuRow")&&Ra(!1)});$("btnMail").addEventListener("click",()=>{const e=y?.myHouseId();e?$r(e):Q("Join a street to send letters!")});$("secrets").addEventListener("click",()=>{if(L!=="house"){Q("Surprises are hiding in your house!");return}qe.isPlay()&&$("modeDecorate").click(),Je="secrets",Ie(),Q("Surprises are in your drawer!")});function $r(e){if(!y||e==="home"||!y.houses.has(e)){Q("Join a street to send letters!");return}const t=y.houses.get(e);Uo.open(e,t.meta.name,t.meta.ownerId===y.pid,t.confirmed.mailbox?.letters??[]),C.click()}$("mapWorld").addEventListener("click",e=>{const t=e.target;if(L!=="street")return;const n=t.closest(".mapMail");if(n){$r(n.dataset.mail||"home");return}const s=t.closest(".mapFace");if(s){s.classList.contains("mine")?(De(s),C.pop(),Q("That's you! Tap a place to go there")):e$(s.dataset.pid);return}const o=t.closest("[data-go]");if(!o)return;const i=o.dataset.go;zd(i.startsWith("house:")?{kind:"house",houseId:i.slice(6)}:{kind:i},o)});function Rn(){$("street").classList.add("hidden"),$("park").classList.add("hidden"),$("ranch").classList.add("hidden"),$("gameroom").classList.add("hidden"),Po()?.close(),$("chatTray").classList.add("hidden"),$("sheet").classList.add("hidden")}function es(){ce=null,Re=[],le=!1,y?Pe({where:"street",x:600,y:540,flip:!1}):Ve=null,Rn(),L="street",$("street").classList.remove("hidden"),$("streetTitle").textContent=y?"Our Neighborhood":"My Map",xt(),Cn(!0);const e=$("mapWorld");e.style.transformOrigin="50% 50%",e.classList.remove("zoomIn","mapIn"),e.offsetWidth,e.classList.add("mapIn"),C.swish()}function Id(){if(y){const e=y.myHouseId();e&&y.houses.has(e)&&qd(e);return}Rn(),L="house",Ve=null,qe.sync(!0),xt(),Hn(),ao($("stageWrap")),C.sparkle(),rn()}function qd(e,t="living"){if(!y||!y.houses.has(e))return;he=e,L="house",le=!1,qe.sync(e===y.myHouseId());let n=Yo.get(e);n||(n=Mh(y,e,{get:()=>G.get().soundOn,set:s=>G.dispatch({type:"settings/sound",on:s})}),Yo.set(e,n)),n.dispatch({type:"room/switch",room:t}),Pe({where:"house",houseId:e,room:t,x:900+Math.random()*300,y:540,flip:!1}),Rn(),Hd(n),ao($("stageWrap")),C.sparkle(),rn()}function xr(){y?.close(),y=null,Yo=new Map,L="house",he="",Ve=null,ce=null,Re=[],le=!1,$("elsewhere").classList.add("hidden"),Rn(),qe.sync(!0),Hd(G),xt()}$("btnMap").addEventListener("click",()=>{if(L==="street"){C.pop();return}es()});$("btnHome").addEventListener("click",()=>{if(L==="house"&&(!y||he===y.myHouseId())){C.pop();return}Id()});$("phoneOk").addEventListener("click",()=>{$("phoneNote").classList.add("hidden"),C.click()});$("elsewhereGo").addEventListener("click",()=>{C.click(),y?.connect()});$("btnSolo").addEventListener("click",()=>{xr(),Q("Playing in your own house 🏠")});window.addEventListener("resize",()=>{L==="street"&&Cn(!0),L==="park"&&Lr(),L==="ranch"&&Hr(),L==="gameroom"&&gr(),$e()});function _r(e){y=e,Yo=new Map,e.on("players",()=>{y===e&&(L==="street"?Cn():L==="park"?En():L==="ranch"?(on(),Er()):L==="gameroom"?As():(cn(),xt()),Fs==="dress"&&St())}),e.on("houses",()=>{y===e&&(L==="street"?Cn():L==="house"&&!e.houses.has(he)&&(Q("That house is gone now"),es()))}),e.on("houseMeta",t=>{y!==e||t!==he||L!=="house"||(we=null,xt(),bt(B.get()),Ie(),nt()||$("sheet").classList.add("hidden"))}),e.on("pres",()=>{y===e&&(L==="street"?ni():L==="park"?En():L==="ranch"?on():L==="gameroom"?As():cn())}),e.on("ranch",()=>{y===e&&L==="ranch"&&Di(!0)}),e.on("ranchFail",t=>{y===e&&Da(t)}),e.on("noride",()=>{if(y!==e)return;const t=ge();if(t?.ride!==void 0){const{ride:n,...s}=t;Pe(s),on()}Q("Someone is riding that horse!")}),e.on("fx",(t,n)=>{y===e&&L$(t,n)}),e.on("bubble",(t,n)=>{y===e&&Fw(t,n)}),e.on("sayFail",t=>Q(t==="presetsOnly"?"Typing is turned off: pick a bubble!":wi[t]||"Couldn't send that")),e.on("mailbox",()=>{y===e&&(L==="street"&&Cn(!0),Dd(),Uo.refresh(),Ui())}),e.on("mailFail",t=>{y===e&&Uo.fail(t)}),e.on("settings",()=>{y===e&&($("chatTray").classList.contains("hidden")||Ud(),Uo.refresh())}),e.on("removed",()=>{Q("A grown-up took this iPad off the street");const t=e.cfg;Ht({url:t.url,code:t.code,id:t.id,parentKey:t.parentKey}),xr()}),e.on("status",t=>{y===e&&(document.body.classList.toggle("reconnecting",t!=="online"&&!e.replaced),(t==="online"||t==="connecting")&&$("elsewhere").classList.add("hidden"))}),e.on("replaced",()=>{y===e&&$("elsewhere").classList.remove("hidden")}),e.on("table",()=>{if(y===e){if(L==="gameroom"){const t=ds(),n=ge();t&&n?.where==="gameroom"&&Math.hypot(n.x-t.x,n.y-t.y)>40&&Pe({where:"gameroom",x:t.x,y:Math.max(Bn,Math.min(At,t.y)),flip:n.flip}),As()}Po()?.refresh()}}),e.on("tblFail",(t,n)=>{y===e&&Po()?.fail(t,n)}),e.on("welcome",()=>{if(y===e)if(L==="street")Cn(!0);else if(L==="park"||L==="ranch"){const t=ge();t&&Pe(t),L==="park"?Lr():Hr(),$e()}else if(L==="gameroom"){const t=ge();t&&Pe(t),gr(),$e(),Po()?.refresh()}else e.houses.has(he)?Hn():es()}),es()}async function n$(){xt();const e=$i(),t=ns();if(!e||!t?.token||t.url!==e)return;const n=new xi(t),s=await n.connect();s==="ok"?_r(n):(n.close(),s!=="closed"&&Q("Couldn't reach the street. Playing at home!"))}function st(e,t,n=""){const s=document.createElement("div");s.className="sheet hoodSheet "+n,s.innerHTML=`<div class="card">${e}</div>`,document.body.appendChild(s),C.swish();const o=()=>s.remove();return s.addEventListener("click",i=>{const a=i.target;if(a===s||a.closest('[data-m="close"]'))return o();t(a,o,s)}),{root:s,close:o}}const ot='<button class="close" data-m="close">✕</button>';$("btnHood").addEventListener("click",()=>s$());function s$(){const e=$i();if(!e){st(`${ot}<h2>Neighborhood</h2><p class="hint">The street isn't open yet. Ask a grown-up to set it up!</p>`,()=>{});return}const t=ns()?.url===e?ns():null;st(`${ot}<h2>Neighborhood</h2><div class="bigBtns">
      ${t?.token?`<button class="big go" data-m="go">${Fe.street}<span>Go to my street</span></button>`:`<button class="big go" data-m="join">${Fe.street}<span>Join a friend's street</span></button>`}
      <button class="big grown" data-m="create">${Fe.shield}<span>${t?.parentKey?"Grown-ups":"Grown-ups: start a street"}</span></button></div>`,async(n,s)=>{const o=n.closest("[data-m]")?.dataset.m;if(o==="go"){s();const i=new xi(t),a=await i.connect();a==="ok"?_r(i):(i.close(),Q(a.startsWith("badtoken")?"Please join again":"Couldn't reach the street"))}o==="join"&&(s(),Rs(e)),o==="create"&&(s(),await wc()&&(t?.parentKey?Ei():o$(e)))})}async function o$(e){let t;try{t=await xh(e)}catch{Q("Couldn't create a street right now");return}Ht({url:e,code:t.code,id:t.id,parentKey:t.parentKey}),st(`${ot}<h2>Your street is ready!</h2><p class="hint">Kids join with this code (you can pick your own on the grown-up screen):</p><div class="code" id="newCode">${t.code}</div>
    <p class="hint small">Grown-up key (keep it private; it opens the grown-up screen on another device):<br><b class="key" id="parentKey">${t.parentKey}</b></p>
    <div class="bigBtns"><button class="big grown" data-m="setup">${Fe.shield}<span>Add kids' names &amp; code</span></button>
    <button class="big go" data-m="joinhere">${Fe.street}<span>Join on this iPad</span></button></div>`,(n,s)=>{n.closest('[data-m="joinhere"]')&&(s(),Mr(e,t.code)),n.closest('[data-m="setup"]')&&(s(),Ei())})}function Rs(e,t=""){const n=st(`${ot}<h2>Join a street</h2><p class="hint">Type the code a grown-up gave you</p>
    <form id="codeForm" class="codeForm"><input id="codeInput" maxlength="${er}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="CODE"/><button type="submit" class="go">Next</button></form>
    <p class="err">${N(t)}</p>`,()=>{}),s=n.root.querySelector("#codeInput");setTimeout(()=>s.focus(),50),s.addEventListener("input",()=>{s.value=qo(s.value)}),n.root.querySelector("#codeForm").addEventListener("submit",o=>{o.preventDefault();const i=qo(s.value);if(!Sf(i)){n.close(),Rs(e,"That code looks wrong. Try again!");return}n.close(),Mr(e,i)})}async function Mr(e,t,n=""){let s;try{s=await _h(e,t)}catch{Rs(e,"Couldn't reach the street. Try again!");return}if("slow"in s){Rs(e,"Too many tries. Ask a grown-up and try again in a few minutes.");return}if(!s.exists){Rs(e,"Hmm, we couldn't find that street.");return}window.__lastLookupId=s.id,i$(e,t,s.id,s.roster,n)}function i$(e,t,n,s,o=""){if(s.length){st(`${ot}<h2>Who are you?</h2>${o?`<p class="err">${N(o)}</p>`:'<p class="hint">Tap your name</p>'}<div class="nicks roster">${s.map((i,a)=>`<button data-nick="${a}" ${i.claimed?"disabled":""}>${N(i.name)}${i.claimed?"<small>signed in</small>":""}</button>`).join("")}</div>
      <p class="hint small">Not on the list? Ask a grown-up to add your name.</p>`,(i,a)=>{const r=i.closest("[data-nick]");if(!r||r.disabled)return;a();const l=s[+r.dataset.nick];l.hasHouse?Od(e,t,n,l.name,void 0):Gl(e,t,n,l.name)},"wide");return}st(`${ot}<h2>Pick your street name</h2>${o?`<p class="err">${N(o)}</p>`:""}<div class="nicks">${Zr.map((i,a)=>`<button data-nick="${a}">${N(i)}</button>`).join("")}</div>`,(i,a)=>{const r=i.closest("[data-nick]");r&&(a(),Gl(e,t,n,Zr[+r.dataset.nick]))},"wide")}function Gl(e,t,n,s){st(`${ot}<h2>Hi, ${N(s)}!</h2><p class="hint">What should your house on the street be?</p>
    <div class="bigBtns"><button class="big go" data-m="bring">${Fo(2)}<span>Bring my house</span></button>
    <button class="big" data-m="fresh">${Fo(5)}<span>Start a new one</span></button></div>`,(o,i)=>{const a=o.closest("[data-m]")?.dataset.m;a&&(i(),Od(e,t,n,s,a==="bring"))})}async function Od(e,t,n,s,o){const i=G.get(),a=i.characters[0],r=Ys(a??{});let l;if(o&&(l=i,a)){const{reduce:p}=await Oa(async()=>{const{reduce:b}=await Promise.resolve().then(()=>kf);return{reduce:b}},void 0);l=p(i,{type:"char/delete",id:a.id})}const c=ns(),d={url:e,code:t,id:n,parentKey:c?.id===n||c?.code===t?c.parentKey:void 0},g=i.dog?{name:i.dog.name,breed:i.dog.breed}:null,f=new xi(d),h=await f.connect({nickname:s,look:r,house:l,dog:g});if(h==="ok"){Ht(f.cfg),_r(f),Q(`Welcome to the street, ${s}!`),C6()&&(S6(),me=We,as("dress"));return}f.close(),h.startsWith("nickname")?Mr(e,t,h.endsWith("notOnList")?"That name is not on the list anymore.":"That name is already signed in on another iPad. Ask a grown-up!"):Q(h==="full"?"That street is full":"Couldn't join right now")}$("btnParent").addEventListener("click",async()=>{await wc()&&Ei()});const a$={codeTaken:"That code is already used by another street. Try adding a number!",badCode:"Codes are 4–16 letters or numbers.",badName:"Use a first name only (letters).",rosterFull:`Up to ${Bf} names.`,nameInUse:"Remove that player first.",codeFixed:"This street's code can't be changed."};async function Ei(){const e=ns();if(!e)return;if(!e.parentKey){const a=st(`${ot}<h2>Grown-up key</h2><p class="hint">Enter the key you got when the street was made</p><form id="keyForm" class="codeForm"><input id="keyInput" autocomplete="off" spellcheck="false"/><button class="go">OK</button></form>`,()=>{});a.root.querySelector("#keyForm").addEventListener("submit",r=>{r.preventDefault(),e.parentKey=a.root.querySelector("#keyInput").value.trim(),Ht(e),y&&(y.cfg.parentKey=e.parentKey),a.close(),Ei()});return}let t=y;t||(t=new xi({...e,token:void 0}),await t.connect());const n=t,s=a=>o.root.querySelector(a).value,o=st(`${ot}<h2>Grown-up screen</h2><div id="parentBody"><p class="hint">Loading…</p></div>`,async a=>{const r=a.closest("[data-p]");if(!r)return;const l=r.dataset.p;if(l==="free"&&n.parent({op:"freeChat",on:r.dataset.on!=="1"}),l==="freeMail"&&n.parent({op:"freeMail",on:r.dataset.on!=="1"}),l==="rename"&&n.parent({op:"rename",houseId:r.dataset.hid,name:s(`input[data-hid="${r.dataset.hid}"]`)}),l==="add"&&n.parent({op:"rosterAdd",name:r.dataset.name??s("#rosterInput")}),l==="unname"&&n.parent({op:"rosterRemove",name:r.dataset.name}),l==="unclaim"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again";return}n.parent({op:"unclaim",name:r.dataset.name})}if(l==="setcode"&&n.parent({op:"setCode",code:s("#codeEdit")}),l==="remove"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again to remove";return}n.parent({op:"remove",pid:r.dataset.pid})}if(l==="mailClear"||l==="mailClearAll"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent=l==="mailClearAll"?"Tap again to clear every mailbox":r.dataset.id?"Tap again":"Tap again to clear this mailbox";return}l==="mailClearAll"?n.parent({op:"mailClearAll"}):n.parent({op:"mailClear",houseId:r.dataset.hid,...r.dataset.id?{id:r.dataset.id}:{}})}if(l==="leave"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again: forget this street here";return}Ht(null),o.close(),xr(),Q("This iPad left the street")}},"wide parent");o.root.addEventListener("submit",a=>{a.preventDefault();const r=a.target.id;r==="rosterForm"&&n.parent({op:"rosterAdd",name:s("#rosterInput")}),r==="codeForm2"&&n.parent({op:"setCode",code:s("#codeEdit")})});const i=a=>{const r=new Date(a);return Number.isFinite(r.getTime())?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r.getMonth()]+" "+r.getDate()+", "+r.getFullYear():""};n.on("parentInfo",a=>{const r=o.root.querySelector("#parentBody");if(!r)return;const l=ns();l&&l.code!==a.code&&(l.code=a.code,Ht(l)),n.cfg.code=a.code;const c=a.roster??[],d=new Set(c.map(m=>m.name.toLowerCase())),g=Wf.filter(m=>!d.has(m.toLowerCase())),f=c[0]?.name??"Reagan",h=Array.isArray(a.mail)?a.mail:[],p=h.some(m=>m.letters&&m.letters.length),b=yc(a.settings),_=h.map(m=>`<div class="pMailHouse"><div class="pMailName">${N(m.name||"House")}</div>${(m.letters||[]).slice().reverse().map(u=>`<div class="pLetter"><b>${N(u.from)}</b><span class="pWhen">${N(i(u.at))}</span><p>${N(u.text)}</p><button type="button" class="danger" data-p="mailClear" data-hid="${N(m.houseId)}" data-id="${N(u.id)}">Clear</button></div>`).join("")||'<p class="hint">No letters.</p>'}${(m.letters||[]).length?`<button type="button" class="danger" data-p="mailClear" data-hid="${N(m.houseId)}">Clear this mailbox</button>`:""}</div>`).join("");r.innerHTML=`${a.note?`<p class="err" id="pNote">${N(a$[a.note]??a.note)}</p>`:""}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${N(a.code)}</div></div>
        <div><div class="label">Free typing</div><button class="toggle ${a.settings.freeChat?"on":""}" data-p="free" data-on="${a.settings.freeChat?1:0}" id="pFree">${a.settings.freeChat?"On":"Off (presets only)"}</button><p class="hint small">Chat bubbles. Off means preset phrases only.</p></div>
        <div><div class="label">Let kids type their own letters</div><button class="toggle ${b?"on":""}" data-p="freeMail" data-on="${b?1:0}" id="pFreeMail">${b?"On":"Off (presets only)"}</button><p class="hint small">Letters only. Off means preset phrases only.</p></div></div>
      <div class="label">Letters</div><div id="parentMail">${_||'<p class="hint">No letters right now.</p>'}${p?'<button type="button" class="danger" data-p="mailClearAll" id="mailClearAll">Clear every mailbox</button>':""}</div>
      <form class="pAdd" id="codeForm2"><input id="codeEdit" maxlength="${er}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="e.g. ${N(qo(f))}7"/><button data-p="setcode" type="button">Use this code</button></form>
      <p class="hint small">Tip: a word plus a number (like ${N(qo(f))}7) is easy to remember and harder to guess. Not case-sensitive.</p>
      <div class="label">Kids' names (sign-in list)</div>
      <div class="roster">${c.map(m=>`<span class="rName ${m.claimed?"claimed":""}"><b>${N(m.name)}</b>${m.claimed?`<i>signed in</i><button data-p="unclaim" data-name="${N(m.name)}">Reset</button>`:m.hasHouse?"<i>not signed in</i>":`<button class="x" data-p="unname" data-name="${N(m.name)}" aria-label="Remove name">×</button>`}</span>`).join("")||'<p class="hint">No names yet: kids pick a fun nickname instead.</p>'}</div>
      <form class="pAdd" id="rosterForm"><input id="rosterInput" maxlength="20" autocomplete="off" placeholder="First name"/><button data-p="add" type="button">Add</button></form>
      ${g.length?`<div class="sugg">${g.map(m=>`<button data-p="add" data-name="${m}">+ ${m}</button>`).join("")}</div>`:""}
      <div class="label">Houses</div>${a.houses.map(m=>`<div class="pHouse"><input data-hid="${m.id}" value="${N(m.name)}" maxlength="24"/><button data-p="rename" data-hid="${m.id}">Rename</button></div>`).join("")||'<p class="hint">No houses yet.</p>'}
      <div class="label">Players</div>${a.players.map(m=>`<div class="pPlayer"><span class="dot ${m.online?"on":""}"></span>${N(m.nickname)}<button class="danger" data-p="remove" data-pid="${m.pid}">Remove</button></div>`).join("")||'<p class="hint">Nobody has joined yet.</p>'}
      <p class="hint small">Letters stay on the server for up to 30 days. They are filtered, and only a first name is stored. You can clear them here, or turn off “Let kids type their own letters” so new letters use preset phrases. Chat bubbles are only relayed to kids standing nearby and are not saved. No emails or last names. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays).</p>
      <button class="danger wideBtn" data-p="leave">Forget this street on this device</button>`}),n.on("error",a=>{a==="badkey"&&(Q("That grown-up key didn't work"),e.parentKey=void 0,Ht(e),o.close())}),n.parent({op:"info"})}let Ve=null;function hn(){return $("park").clientHeight/sr}const r$=()=>{const e=G.get();return e.characters.find(t=>t.id===e.dog?.owner)??e.characters[0]},_t=()=>y?ge():Ve;function ct(e){y?Pe(e):Ve=e,L==="ranch"?on():L==="gameroom"?As():En()}function tn(e="park"){if(y){const n=[],s=[...y.presence.entries()],o=ge();o&&s.push([y.pid,o]);for(const[i,a]of s){const r=y.players.get(i);r&&a.where===e&&n.push({key:i,look:r.look,name:r.nickname,p:a,mine:i===y.pid,dog:r.dog??null})}return n}const t=r$();return Ve&&Ve.where===e?[{key:"solo",look:Ys(t??{}),name:"",p:Ve,mine:!0,dog:G.get().dog??null}]:[]}function Lr(){const e=hn(),t=$("parkWorld"),n=s=>s*e+"px";t.style.width=nr*e+"px",t.style.height=sr*e+"px",t.style.setProperty("--sc",String(e)),t.innerHTML=Oh()+pa.map((s,o)=>s.kind==="swing"?`<div class="swing" data-swing="${o}" style="left:${n(s.x-30)};top:${n(rt)};width:${n(60)};height:${n(240)}">${Nh}</div>`:"").join("")+pa.map((s,o)=>`<button class="pspot k-${s.kind}" data-spot="${o}" aria-label="${s.kind}" style="left:${n(s.x-50)};top:${n(s.y-(s.kind==="swing"?70:55))};width:${n(100)};height:${n(s.kind==="swing"?90:65)}"></button>`).join("")+`<button class="pspot slide" data-act="slide" aria-label="Slide" style="left:${n(V.ladder-45)};top:${n(V.top.y-30)};width:${n(130)};height:${n(560-V.top.y+30)}"></button><button class="pspot pond" data-act="splash" aria-label="Pond" style="left:${n(1235)};top:${n(462)};width:${n(370)};height:${n(105)}"></button><button class="pspot gate" data-act="exit" aria-label="Back to the street" style="left:${n(25)};top:${n(240)};width:${n(180)};height:${n(260)}"></button><div class="ripples" id="ripples"></div><button class="ball" id="ball" aria-label="Ball">${jh}</button><div class="savatars" id="pavatars"></div>`,si(),En(),$e()}const Kl=2400;function En(){const e=document.getElementById("pavatars");if(!e||L!=="park")return;const t=hn(),n=new Set,s=new Set;for(const o of tn()){n.add(o.key);let i=e.querySelector(`.savatar[data-pid="${o.key}"]`);i||(i=document.createElement("div"),i.className="savatar "+(o.mine?"mine":"other"),i.dataset.pid=o.key,e.appendChild(i),o.mine&&Nd(i));const a=JSON.stringify(o.look)+o.name;if(i.dataset.look!==a){const g=i.querySelector(".bubble");i.innerHTML=o.name?wr(o.look,o.name):`<div class="inner">${Ue(o.look)}</div>`,g&&i.appendChild(g),i.dataset.look=a}const r=(Js[o.look.size]??1)*t*.95,l=fn*r,c=wt*r;i.style.left=o.p.x*t-l/2+"px",i.style.top=o.p.y*t-c+"px",i.style.width=l+"px",i.style.height=c+"px",i.style.zIndex=String(100+Math.round(o.p.y)),i.classList.toggle("flipped",o.p.flip),Xs(i,o.look,o.mine);const d=o.p.pose??"";i.dataset.pose!==d&&(i.classList.remove("pose-sit","pose-swing","pose-slide"),i.offsetWidth,d==="slide"&&(i.style.setProperty("--sx",(V.top.x-V.bottom.x)*t+"px"),i.style.setProperty("--sy",(V.top.y-V.bottom.y)*t+"px")),d&&i.classList.add("pose-"+d),i.dataset.pose=d),d==="swing"?(i.style.transformOrigin=`50% ${(rt-o.p.y)*t+c}px`,i.style.animationDelay=-(Date.now()%Kl)/1e3+"s",s.add(o.p.spot??-1)):(i.style.transformOrigin="",i.style.animationDelay="")}e.querySelectorAll(".savatar").forEach(o=>{n.has(o.dataset.pid)||o.remove()}),document.querySelectorAll("#parkWorld .swing").forEach(o=>{const i=s.has(+o.dataset.swing);i&&!o.classList.contains("swinging")&&(o.style.animationDelay=-(Date.now()%Kl)/1e3+"s"),o.classList.toggle("swinging",i)}),An()}function Nd(e){e.addEventListener("pointerdown",t=>{t.preventDefault(),t.stopPropagation();const n=_t();if(!n||n.where!=="park"&&n.where!=="ranch"&&n.where!=="barn")return;const s=n.where!=="park",o=n.where;Re=[];const i=$(s?"ranchScroll":"parkScroll"),a=s?ft():hn(),r=o==="barn"?Za:s?Ks:nr,l=k=>{const M=$(s?"ranchWorld":"parkWorld").getBoundingClientRect();return{x:(k.clientX-M.left)/a,y:(k.clientY-M.top)/a}},c=l(t),d={x:n.x-c.x,y:n.y-c.y};let g=t,f=0,h=n.x,p=!1;const b=k=>{const M=l(k),T=_t();if(!T)return;const H=Math.max(60,Math.min(r-60,M.x+d.x)),U=Math.max(470,Math.min(590,M.y+d.y));if(!p&&Math.hypot(H-T.x,U-T.y)<6)return;p=!0;const F=Math.abs(H-h)>3?H<h:T.flip;Math.abs(H-h)>3&&(h=H),ct(o==="barn"?{where:"barn",x:H,y:U,flip:F}:s?{where:"ranch",x:H,y:U,flip:F,...T.ride!==void 0?{ride:T.ride}:{}}:{where:"park",x:H,y:U,flip:F})},_=()=>{const k=i.getBoundingClientRect(),M=g.clientX<k.left+70?-10:g.clientX>k.right-70?10:0;M&&p&&(i.scrollLeft+=M,b(g)),f=requestAnimationFrame(_)};f=requestAnimationFrame(_),e.classList.add("lifted"),C.pick();const m=k=>{k.pointerId===t.pointerId&&(g=k,b(k))},u=k=>{k.pointerId===t.pointerId&&(cancelAnimationFrame(f),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",u),e.classList.remove("lifted"),C.drop())};window.addEventListener("pointermove",m),window.addEventListener("pointerup",u)})}$("parkWorld").addEventListener("pointerdown",e=>{e.target.closest(".pspot, .ball, .pet")&&e.stopPropagation()});$("parkWorld").addEventListener("click",e=>{const t=e.target,n=_t();if(!n)return;if(t.closest("#ball")){d$();return}const s=t.closest("[data-spot]");if(s){const i=+s.dataset.spot,a=pa[i];if(n.spot===i&&n.pose){ct({where:"park",x:a.x,y:Math.min(590,a.y+40),flip:n.flip});return}if(tn().some(r=>!r.mine&&r.p.spot===i&&r.p.pose)){Q("Someone is already there!");return}ct({where:"park",x:a.x,y:a.y,flip:n.flip,pose:a.kind==="swing"?"swing":"sit",spot:i}),a.kind==="swing"?C.boing():C.drop();return}const o=t.closest("[data-act]")?.dataset.act;if(o==="slide"&&(ct({where:"park",x:V.bottom.x,y:V.bottom.y,flip:!1,pose:"slide"}),C.swish(),setTimeout(()=>{const i=_t();i?.pose==="slide"&&ct({where:"park",x:i.x,y:i.y,flip:i.flip})},1500)),o==="splash"){const i=$("parkWorld").getBoundingClientRect(),a=(e.clientX-i.left)/hn();jd(a),y?.fx({k:"splash",x:a})}o==="exit"&&Fd()});function jd(e){const t=document.getElementById("ripples");if(!t||L!=="park")return;const n=hn();for(let s=0;s<2;s++){const o=document.createElement("div");o.className="ripple";const i=(120+s*70)*n;Object.assign(o.style,{left:e*n-i/2+"px",top:512*n-i*.18+"px",width:i+"px",height:i*.36+"px",animationDelay:s*.15+"s"}),t.appendChild(o),setTimeout(()=>o.remove(),1400)}for(let s=0;s<6;s++){const o=document.createElement("div");o.className="drop",Object.assign(o.style,{left:e*n+"px",top:505*n+"px"}),o.style.setProperty("--dx",(s-2.5)*14+"px"),t.appendChild(o),setTimeout(()=>o.remove(),900)}C.splash()}function l$(){Rn(),Re=[],le=!1,L="park",$("park").classList.remove("hidden"),ao($("park"));const e={where:"park",x:290,y:548,flip:!1};y?Pe(e):Ve=e,$("streetTitle").textContent="The Park",xt(),Lr(),requestAnimationFrame(()=>{const t=$("parkScroll");t.scrollLeft=0,$e()}),C.sparkle()}function Fd(){es()}function c$(){Rn(),Re=[],le=!1,L="gameroom",$("gameroom").classList.remove("hidden");const e=ds(),t=e?{where:"gameroom",x:e.x,y:Math.max(Bn,Math.min(At,e.y)),flip:!1}:{where:"gameroom",x:li()?520:280,y:560,flip:!1};y?Pe(t):Ve=t,$("streetTitle").textContent="The Clubhouse",xt(),gr(),requestAnimationFrame(()=>{const n=gn(),s=$("grScroll"),o=e?.x??(li()?520:280);s.scrollLeft=Math.max(0,o*n-s.clientWidth/2),$e(),ug()}),ao($("gameroom")),C.sparkle()}$("btnLeavePark").addEventListener("click",()=>{L==="ranch"&&le?Vs(!1):Fd()});let Kt={x:2620,y:565},ce=null;function si(e=!1){const t=document.getElementById("ball");if(!t)return;const n=hn(),s=34*n;e||t.classList.remove("flying"),t.style.left=Kt.x*n-s/2+"px",t.style.top=Kt.y*n-s+"px",t.style.width=t.style.height=s+"px"}function d$(){if(ce)return;const e=Me.x0+40+Math.random()*(Me.x1-Me.x0-80),t=Me.y0+25+Math.random()*(Me.y1-Me.y0-35);Zd(y?y.pid:"solo",e,t),y?.fx({k:"ball",x:e,y:t})}function Zd(e,t,n){if(L!=="park")return;const s=document.getElementById("ball");Kt={x:t,y:n},ce={thrower:e,phase:"fly",dog:null,until:performance.now()+12e3},s&&(s.classList.remove("flying"),s.offsetWidth,s.classList.add("flying"),si(!0)),C.boing(),setTimeout(()=>{ce?.phase==="fly"&&(ce.phase="chase",document.getElementById("ball")?.classList.remove("flying"),Yt.size||(ce=null))},650)}function g$(e){if(!y)return Ve;const t=e===y.pid?ge():y.presence.get(e);return t&&t.where==="park"?t:null}const Yt=new Map,sa=e=>(t,n,s,o,i)=>{t.style.left=(n-o/2)*e+"px",t.style.top=(s-i)*e+"px",t.style.width=o*e+"px",t.style.height=i*e+"px"};function f$(){const e=[];if(L==="house"){const t=B.get(),n={box:ye,place:fs,z:s=>String(4e3+Math.round(s)),scale:1};if(y&&Ge!==G){const s=[...y.presence.entries()],o=ge();o&&s.push([y.pid,o]);for(const[i,a]of s){const r=y.players.get(i)?.dog;r&&a.where==="house"&&a.houseId===he&&a.room===t.currentRoom&&e.push({key:i,dog:r,x:a.x,y:a.y,flip:a.flip,...n})}}else if(t.dog){const s=t.characters.find(o=>o.id===t.dog.owner)??t.characters[0];s&&s.room===t.currentRoom&&e.push({key:"solo",dog:t.dog,x:s.x,y:s.y,flip:s.flip,...n})}}else if(L==="park"){const t=document.getElementById("pavatars");if(!t)return e;const n=hn();for(const s of tn())s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:sa(n),z:o=>String(Math.round(o)-200),scale:.95})}else if(L==="ranch"){const t=document.getElementById("ravatars");if(!t)return e;const n=ft();for(const s of tn(le?"barn":"ranch"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:sa(n),z:o=>String(100+Math.round(o)),scale:.95,riding:s.p.ride!==void 0})}else if(L==="gameroom"){const t=document.getElementById("gavatars");if(!t)return e;const n=gn();for(const s of tn("gameroom"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:sa(n),z:o=>String(Math.round(o)-200),scale:.95})}return e}let Yl=performance.now();function h$(e,t){const n=new Set;for(const s of f$()){if(m$(s.key))continue;n.add(s.key);let o=Yt.get(s.key);const i=s.flip?1:-1,a=s.riding?200:78;let r=s.x+i*a;s.riding&&(r=Math.max(50,Math.min(Ks-50,r)));const l=Math.min(595,s.y+(s.riding?28:6));if(!o||o.box!==s.box||!o.el.isConnected){o?.el.remove();const k=document.createElement("div");k.className="pet pet-dog",k.dataset.dog=s.key,s.box.appendChild(k),p$(k,s.key),o={el:k,box:s.box,x:r,y:l,flip:s.flip,pose:"",look:"",idle:1,trickUntil:0,sitTrick:!1},Yt.set(s.key,o)}let c=r,d=l,g=s.riding?980:320;if(ce&&e>ce.until&&(ce=null,si()),ce&&L==="park"){if(ce.phase==="chase")c=Kt.x,d=Kt.y,g=950,Math.hypot(o.x-c,o.y-d)<28&&(ce.phase="carry",ce.dog=s.key,C.woof());else if(ce.phase==="carry"&&ce.dog===s.key){const k=g$(ce.thrower)??{x:(Me.x0+Me.x1)/2,y:540};c=k.x+60,d=Math.min(590,k.y+6),g=750,Kt={x:o.x+(o.flip?-40:40),y:o.y-30*s.scale},Math.hypot(o.x-c,o.y-d)<26&&(Kt={x:k.x+70,y:Math.min(590,k.y+12)},ce=null,Eo(o,"♥"),C.sparkle()),si()}}const f=e<o.trickUntil,h=c-o.x,p=d-o.y,b=Math.hypot(h,p);let _=!1;if(b>(ce?4:10)&&!f){const k=Ci()?b:Math.min(b,g*t);o.x+=h/b*k,o.y+=p/b*k,_=!0,Math.abs(h)>1.5&&(o.flip=h<0),o.idle=0}else o.idle+=t,!f&&o.idle>.3&&Math.abs(s.x-o.x)>4&&(o.flip=s.x<o.x);const m=f&&o.sitTrick?"sit":_?"stand":o.idle>.9?"sit":"stand",u=m+s.dog.breed;if(o.pose+o.look!==m+u){const k=[...o.el.querySelectorAll(".bubble, .kennelBtn")];o.el.innerHTML=`<div class="inner">${Os(s.dog.breed,m)}</div>`;for(const M of k)o.el.appendChild(M);o.pose=m,o.look=u}o.el.dataset.name=s.dog.name,o.el.classList.toggle("walking",_),o.el.classList.toggle("flipped",o.flip),s.place(o.el,o.x,o.y,92*s.scale,71*s.scale),o.el.style.zIndex=s.z(o.y+1),Yd(o.el,s.key,!1)}for(const[s,o]of Yt)n.has(s)||(o.el.remove(),Yt.delete(s))}function Eo(e,t){e.el.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.el.appendChild(n),hs(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const Xl=new Map;function Vd(e,t){const n=Yt.get(e);if(!n)return;const s=n.el.dataset.name??"";n.trickUntil=performance.now()+1400,n.sitTrick=t===0,n.el.classList.remove("spin","hop"),n.el.offsetWidth,t===0&&(Eo(n,`${s} sits! 🐾`),C.pop()),t===1&&(n.el.classList.add("spin"),Eo(n,"Wheee! ✨"),C.spin()),t===2&&(n.el.classList.add("hop"),Eo(n,"Woof! Woof!"),C.woof())}function p$(e,t){e.addEventListener("pointerdown",n=>{n.stopPropagation(),n.preventDefault()}),e.addEventListener("click",n=>{n.stopPropagation();const s=(Xl.get(t)??0)%3;Xl.set(t,s+1),Vd(t,s),y&&y.fx({k:"trick",owner:t,v:s})})}function Qi(e){const t=e?.dogKennel?.item;if(!t||!e)return null;for(const n of Object.values(e.rooms)){const s=n.items.find(o=>o.id===t&&o.kind==="kennel");if(s)return s}return null}function u$(e){if(e==="solo")return G.get();if(!y)return null;const t=y.players.get(e)?.houseId;return t?y.view(t):null}function m$(e){return!!Qi(u$(e))}function Cr(){if(y){const e=y.myHouseId();return e?y.view(e):null}return G.get()}function Gd(){if(L!=="house")return null;const e=B.get(),t=Qi(e);if(!t||!e.rooms[e.currentRoom]?.items.some(n=>n.id===t.id))return null;if(y&&Ge!==G){const n=y.houses.get(he)?.meta.ownerId,s=n?y.players.get(n)?.dog??null:null;return!n||!s?null:{key:n,dog:s,item:t}}return e.dog?{key:"solo",dog:e.dog,item:t}:null}function y$(){const e=Cr();if(!e)return null;const t=oi()?B.get().currentRoom:null;let n=null,s=null;for(const[o,i]of Object.entries(e.rooms))for(const a of i.items)a.kind==="kennel"&&((!n||a.z>=n.z)&&(n=a),o===t&&(!s||a.z>=s.z)&&(s=a));return s??n}function $o(e){if(!Wr()){Q("Adopt a dog first!");return}Ws({type:"dog/kennel",item:e}),e?(C.pop(),Q("Rest well, puppy!")):(C.woof(),Q("Come on, puppy!"))}function Sr(e){if(!Wr()){Q("Adopt a dog first!");return}const t=Qi(Cr());if(e===void 0){if(t){$o(null);return}const n=y$();if(!n){Q("Put a dog kennel down first!");return}$o(n.id);return}t?.id===e?$o(null):$o(e)}function Kd(e){const t=B.get(),n=t.rooms[t.currentRoom]?.items.find(s=>s.id===e);if(n){if(n.kind==="kennel"){oi()&&Sr(n.id);return}n.kind==="cat-tower"&&_$()}}function k$(e,t){const n=B.get(),s=n.rooms[n.currentRoom]?.items.find(i=>i.id===t);if(!s)return;const o=Rh(s.kind);if(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),C.click(),o==="kennel"||o==="tower"){Kd(t);return}if(o==="lamp"){e.classList.toggle("lamp-on");return}if(o==="open"){e.classList.toggle("opened");return}o==="sit"&&b$(s)}function b$(e){const t=Math.max(Bi+40,e.y-8);if(y&&L==="house"){const o=ge();o&&o.where==="house"&&(Pe({...o,x:e.x,y:t,flip:!1}),cn());return}const n=B.get(),s=n.characters.find(o=>o.id===me&&o.room===n.currentRoom)??n.characters.find(o=>o.room===n.currentRoom);s&&B.dispatch({type:"char/move",id:s.id,room:n.currentRoom,x:e.x,y:t})}function Yd(e,t,n){const s=y?t===y.pid:t==="solo";let o=e.querySelector(".kennelBtn");if(!s){o?.remove();return}o||(o=document.createElement("button"),o.type="button",o.className="kennelBtn",o.addEventListener("pointerdown",i=>{i.stopPropagation(),i.preventDefault()}),o.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault(),Sr()}),e.appendChild(o)),o.textContent=n?"Out":"Kennel"}function v$(e,t){e.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.appendChild(n),hs(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const Bs=new Map;function w$(){const e=new Set,t=Gd();if(t){e.add(t.key);const n=Bh(t.dog.name,Date.now()),s=t.item.y-(n==="peek"?24:2);let o=Bs.get(t.key);if(!o||!o.el.isConnected){o?.el.remove();const a=document.createElement("div");a.className="pet pet-dog kenneled",a.dataset.dog="kennel:"+t.key,ye.appendChild(a),a.addEventListener("pointerdown",r=>{r.target.closest(".kennelBtn")||(r.stopPropagation(),r.preventDefault())}),a.addEventListener("click",r=>{r.target.closest(".kennelBtn")||(r.stopPropagation(),v$(a,`${a.dataset.name??"Puppy"} is resting`))}),o={el:a,pose:"",look:"",x:t.item.x,y:s},Bs.set(t.key,o)}const i=n==="rest"?"sleep":"sit";if(o.pose!==i||o.look!==n+t.dog.breed){const a=[...o.el.querySelectorAll(".bubble, .kennelBtn")];o.el.innerHTML=`<div class="inner">${Os(t.dog.breed,i)}</div>${n==="rest"?'<div class="zzz"><b>Zzz</b><i>z</i><i>z</i><i>z</i></div>':""}`;for(const r of a)o.el.appendChild(r);o.pose=i,o.look=n+t.dog.breed}o.el.dataset.name=t.dog.name,o.el.classList.toggle("rest",n==="rest"),o.el.classList.toggle("peek",n==="peek"),o.x=t.item.x,o.y=s,fs(o.el,t.item.x,s,100,77),o.el.style.zIndex=String(1e3+t.item.z+1),Yd(o.el,t.key,!0)}for(const[n,s]of Bs)e.has(n)||(s.el.remove(),Bs.delete(n))}let I=null,xo="",oa=0,Br=0,Qo={x:0,perch:0,leap:!1};const $$=562;function Xd(e){return(e.rooms[e.currentRoom]?.items.filter(n=>n.kind==="cat-tower")??[]).reduce((n,s)=>!n||s.z>=n.z?s:n,null)}function Jl(e){return e==="cat-bed"||e==="pet-bed"||e==="dog-bed"||e==="pack:cat-bed"||/(?:^|:)cat-bed$|(?:^|:)pet-bed$/.test(e)}function x$(e){const t=e.rooms[e.currentRoom]?.items??[],n=t.filter(a=>Jl(a.kind)),s=t.filter(a=>a.kind==="bed"),o=(n.length?n:s).reduce((a,r)=>!a||r.z>=a.z?r:a,null);if(!o)return null;const i=He[o.kind];return{x:o.x,y:o.y,h:i?et(i)*o.scale:80,pet:Jl(o.kind)}}function _$(){const e=B.get();!e.cat||e.cat.room!==e.currentRoom||!Xd(e)||(Br=performance.now()+900,C.boing(),y?.fx({k:"leap"}))}function M$(){const e=B.get(),t=L==="house"?e.cat:null;if(!t||t.room!==e.currentRoom){I&&(I.remove(),I=null,xo="",oa=0);return}(!I||!I.isConnected)&&(I=document.createElement("div"),I.className="pet pet-cat",ye.appendChild(I),xo="",I.addEventListener("pointerdown",_=>{_.stopPropagation(),_.preventDefault()}),I.addEventListener("click",_=>{_.stopPropagation(),Jd(),y&&y.fx({k:"purr"})}));const n=Xd(e),s=n?null:x$(e),o=n?He[n.kind]:void 0,i=n&&o?et(o)*n.scale:0,a=Wh(t,Date.now(),n?{x:n.x}:null,s?{x:s.x}:null,Ci()),r=!!n&&performance.now()<Br,l=r?2:a.perch,c=r&&n?n.x:a.x,d=r?"play":a.mood,g=d==="walk"?"stand":d==="nap"?"nap":"sit",f=g+t.coat+(l?"p":"");if(f!==xo){const _=[...I.querySelectorAll(".bubble, .heart")];I.innerHTML=`<div class="inner">${ss(t.coat,g)}</div>${g==="nap"?'<div class="zzz"><i>z</i><i>z</i><i>z</i></div>':""}`;for(const m of _)I.appendChild(m);xo=f}if(l>0&&oa===0){I.classList.add("hop");const _=I;setTimeout(()=>_.classList.remove("hop"),420)}oa=l,I.dataset.name=t.name,I.dataset.mood=d,I.dataset.perch=String(l),I.dataset.leap=r?"1":"0",I.dataset.curl=a.curl?"1":"0",I.classList.toggle("walking",d==="walk"),I.classList.toggle("groom",d==="groom"),I.classList.toggle("play",d==="play"&&!r),I.classList.toggle("leap",r),I.classList.toggle("flipped",a.flip),I.classList.toggle("curl",a.curl===1),ye.querySelectorAll(".item.toy-live").forEach(_=>_.classList.remove("toy-live")),n&&d==="play"&&l&&!r&&ye.querySelector(`.item[data-id="${n.id}"]`)?.classList.add("toy-live");const h=window.__pinCat,p=!!(h&&Number.isFinite(h.x)),b=!p&&l&&n?Sh(n.y,i,l):!p&&a.curl&&s?s.y-s.h*(s.pet?.38:.2):$$;fs(I,p?h.x:c,b,!p&&l?110:150,!p&&l?92:128),I.style.zIndex=String(4e3+Math.round(b)),Qo={x:p?h.x:c,perch:l,leap:r}}function Jd(){if(!I)return;C.purr(),setTimeout(()=>C.meow(),250),I.querySelector(".bubble")?.remove();const e=document.createElement("div");e.className="bubble petBubble",e.textContent=`${I.dataset.name} purrs ♥`,I.appendChild(e),hs(),setTimeout(()=>e.classList.add("out"),1500),setTimeout(()=>e.remove(),1900),I.classList.remove("happy"),I.offsetWidth,I.classList.add("happy");for(let t=0;t<5;t++){const n=document.createElement("div");n.className="heart",n.textContent="♥",n.style.left=20+Math.random()*60+"%",n.style.animationDelay=t*.12+"s",n.style.color=["#ff6b9a","#ff8fab","#e879c6"][t%3],I.appendChild(n),setTimeout(()=>n.remove(),1800)}}function L$(e,t){if(t.k==="zoo"||t.k==="apple"||t.k==="honk"||t.k==="hen"){I$(t);return}t.k==="trick"?Vd(t.owner,t.v):t.k==="purr"?L==="house"&&Jd():t.k==="leap"?L==="house"&&(Br=performance.now()+900):t.k==="ball"?Zd(e,t.x,t.y):t.k==="splash"&&jd(t.x)}function eg(e){const t=Math.min(.05,Math.max(0,(e-Yl)/1e3));Yl=e;try{h$(e,t),w$(),M$(),O$(e,t),dw(t),Ic()}catch{}requestAnimationFrame(eg)}function C$(){return y?y.view(y.myHouseId())?.cat??null:G.get().cat??null}function Wr(){return y?y.players.get(y.pid)?.dog??null:G.get().dog??null}function Ws(e){if(y){const t=y.myHouseId();t&&y.dispatch(t,e)}else G.dispatch(e)}const oi=()=>L==="house"&&(!y||Ge===G||he===y.myHouseId());function S$(e="cat"){const t=C$(),n=Wr(),s=G.get().characters,o={tab:e,coat:t?.coat??0,catName:t?.name??"",breed:n?.breed??0,dogName:n?.name??"",owner:n?.owner??s[0]?.id,err:"",bye:!1},i=st("",(l,c)=>{const d=h=>l.closest(`[${h}]`)?.getAttribute(h);if(d("data-pt")){o.tab=d("data-pt"),o.err="",o.bye=!1,r();return}if(d("data-coat")!=null){o.coat=+d("data-coat"),C.click(),r();return}if(d("data-breed")!=null){o.breed=+d("data-breed"),C.click(),r();return}if(d("data-cname")){o.catName=d("data-cname"),C.click(),r();return}if(d("data-dname")){o.dogName=d("data-dname"),C.click(),r();return}if(d("data-owner")){o.owner=d("data-owner"),C.click(),r();return}const g=d("data-pa");if(!g)return;const f=(i.root.querySelector("#petName")?.value??"").trim();if(g==="adoptCat"||g==="adoptDog"){const h=f||(g==="adoptCat"?o.catName:o.dogName),p=bh(h);if(!p){o.err=h?"Hmm, try a different name!":"Pick a name first!",C.pop(),r();return}if(g==="adoptCat"){const b=oi(),_={name:p,coat:o.coat,room:b?B.get().currentRoom:t?.room??"living",x:b?Math.max(200,Math.min(re-200,j+te/2)):t?.x??1200};Ws({type:"cat/set",cat:_}),C.meow(),c(),Q(t?`${p} looks great! 🐱`:b?`${p} moved in! 🐱`:`${p} is waiting at your house! 🐱`)}else{const b=y?{name:p,breed:o.breed}:{name:p,breed:o.breed,owner:o.owner};y?(y.setDog(b),L==="park"&&En()):G.dispatch({type:"dog/set",dog:b}),C.woof(),c(),Q(n?`${p} looks great! 🐶`:`${p} is your new best friend! 🐶`)}return}if(g==="callCat"){Ws({type:"cat/move",room:B.get().currentRoom,x:Math.max(200,Math.min(re-200,j+te/2))}),C.meow(),c();return}if(g==="kennelDog"){Sr(),c();return}if(g==="bye"){if(!o.bye){o.bye=!0,r();return}o.tab==="cat"?Ws({type:"cat/set",cat:null}):(Ws({type:"dog/kennel",item:null}),y?y.setDog(null):G.dispatch({type:"dog/set",dog:null})),c(),Q("They went to live with a kind friend 💛");return}},"wide pets"),a=i.root.querySelector(".card");function r(){const l=o.tab==="cat",c=l?t:n,d=l?yh:kh,g=l?o.catName:o.dogName,f=i.root.querySelector("#petName")?.value??"";a.innerHTML=`${ot}<h2>Pets</h2>
      <div class="petTabs"><button data-pt="cat" class="${l?"on":""}">🐱 Cat</button><button data-pt="dog" class="${l?"":"on"}">🐶 Dog</button></div>
      <p class="hint small">${l?y?"Your cat lives in your house. Friends can see her when they visit!":"Your cat lives in your house. She naps, purrs, and plays!":y?"Your dog follows you everywhere: the street, friends' houses, and the park!":"Your dog follows you around the house and to the park!"}</p>
      <div class="petRow"><div class="petPreview">${l?ss(o.coat,"sit"):Os(o.breed,"stand")}</div>
        <div class="swatches">${(l?ma:ya).map((h,p)=>`<button ${l?"data-coat":"data-breed"}="${p}" class="${p===(l?o.coat:o.breed)?"on":""}"><div>${l?ss(p,"sit"):Os(p,"stand")}</div><span>${h.name}</span></button>`).join("")}</div></div>
      <div class="label">Name</div>
      <div class="nameChips">${d.map(h=>`<button ${l?"data-cname":"data-dname"}="${h}" class="${h===g?"on":""}">${h}</button>`).join("")}</div>
      <input id="petName" class="petName" maxlength="14" autocomplete="off" placeholder="…or type a name" value="${N(f)}"/>
      ${o.err?`<p class="err" id="petErr">${N(o.err)}</p>`:""}
      ${!l&&!y&&s.length>1?`<div class="label">Who does your dog follow?</div><div class="walkers">${s.map(h=>`<button data-owner="${h.id}" class="${h.id===o.owner?"on":""}">${Ue(h)}</button>`).join("")}</div>`:""}
      <div class="petBtns"><button class="go" data-pa="${l?"adoptCat":"adoptDog"}" id="adoptBtn">${c?"Save":"Adopt! 💛"}</button>
        ${l&&t&&oi()?'<button data-pa="callCat" id="callCat">Here, kitty!</button>':""}
        ${!l&&n?`<button data-pa="kennelDog" id="kennelDog">${Qi(Cr())?"Come, puppy!":"Kennel"}</button>`:""}
        ${c?`<button class="danger" data-pa="bye">${o.bye?"Tap again to say goodbye":"Find a new home"}</button>`:""}</div>`}r()}$("btnPets").addEventListener("click",()=>S$(L==="house"?"cat":"dog"));requestAnimationFrame(eg);window.__pets=()=>{const e=Gd(),t=e?Bs.get(e.key):void 0;return{dogs:[...Yt.keys()],dogPos:Object.fromEntries([...Yt].map(([n,s])=>[n,{x:Math.round(s.x),y:Math.round(s.y)}])),cat:I?{mood:I.dataset.mood,name:I.dataset.name,perch:Qo.perch,x:Math.round(Qo.x),leap:Qo.leap,curl:I.dataset.curl==="1"}:null,kennel:e&&t?{x:Math.round(t.x),y:Math.round(t.y),pose:t.pose,name:e.dog.name,item:e.item.id}:null,dogKennel:B.get().dogKennel??null,fetch:ce?.phase??null,ball:Kt,view:L}};function ft(){return $("ranch").clientHeight/eo}let Re=[];const Zs=e=>String(100+Math.round(e)),tg=220,B$=tg*130/160,ng=156,W$=ng*130/160,T$=.6,P$=3.5,H$=3,za=10,nn=new Map,Ao=new Map;function ii(e,t,n=za){const s=(e-Be.x)/(Be.rx+n),o=(t-Be.y)/(Be.ry+n);return s*s+o*o<1}function ia(e,t,n,s){for(let o=0;o<=18;o++){const i=o/18;if(ii(e+(n-e)*i,t+(s-t)*i))return!0}return!1}function ai(e,t){return{x:Math.max(70,Math.min(Pr()-70,e)),y:Math.max(Bn,Math.min(At,t))}}function U$(e,t){const n=ai(t.x,t.y);if(ii(n.x,n.y,6))return null;if(!ia(e.x,e.y,n.x,n.y))return[n];const s=Be.x-Be.rx-za-28,o=Be.x+Be.rx+za+28;let i=null,a=1/0;for(const r of[Bn+1,At-2]){const l=[];let c=e.x,d=e.y;const g=(_,m)=>{const u=ai(_,m);l.push(u),c=u.x,d=u.y};ia(c,d,c,r)&&g(c<Be.x?s:o,d),Math.abs(d-r)>3&&g(c,r),Math.abs(c-n.x)>3&&g(n.x,r),l.push(n);let f=!0,h=e.x,p=e.y,b=0;for(const _ of l){if(ia(h,p,_.x,_.y)||ii(_.x,_.y,4)){f=!1;break}b+=Math.hypot(_.x-h,_.y-p),h=_.x,p=_.y}f&&b<a&&(i=l,a=b)}return i}function sg(e,t){const n=_t();if(!n)return;const s={x:Math.max(60,Math.min(Pr()-60,e)),y:Math.max(Bn,Math.min(At,t))};if(n.ride!==void 0&&n.where==="ranch"){const o=U$(n,s);if(!o){Q("The horse won't splash through the pond!"),C.pop();return}Re=o}else Re=[s]}function E$(e){if(e.look2)return B6(e.look2);const t=e.pants,n="#5a3d5c",s=(o,i,a,r)=>`<path class="${o}" d="${i}" fill="none" stroke="${n}" stroke-width="${a}" stroke-linecap="round"/><path class="${o} cloth" d="${i}" fill="none" stroke="${t}" stroke-width="${r}" stroke-linecap="round"/>`;return`<svg class="rideleg" viewBox="0 0 160 130">${s("thigh","M66 56 L102 66",13,8)}${s("shin","M102 68 L106 104",12,7.2)}<circle class="knee" cx="102" cy="67" r="6.2" fill="${t}" stroke="${n}" stroke-width="3.5"/><ellipse class="shoe" cx="116" cy="106" rx="11" ry="5.2" fill="${n}"/></svg>`}function sn(){return document.body.classList.contains("phone")&&document.body.classList.contains("phone-portrait")&&!le}function Ai(){if(!sn())return oc.map((t,n)=>n);const e=[0,2,4];for(const t of tn("ranch")){const n=t.p.ride;n!==void 0&&e.indexOf(n)<0&&e.push(n)}return e}function dn(e){if(!sn())return oc[e];const t=Ai(),n=t.indexOf(e),s=t.length,o=n<0?0:n,i=Tr().w/2,a=2400+i+18,r=3080-i-18;return s<=1?Math.round((a+r)/2):Math.round(a+(r-a)*o/(s-1))}function Tr(){return sn()?{w:131,h:106}:{w:150,h:122}}function ri(e,t,n){const s=ft(),{w:o,h:i}=Tr();e.style.left=(t-o/2)*s+"px",e.style.top=(n-i)*s+"px",e.style.width=o*s+"px",e.style.height=i*s+"px",e.style.zIndex=Zs(n)}function Q$(){if(L!=="ranch"||le||!document.body.classList.contains("phone"))return;const e=new Set(Ai());document.querySelectorAll("#ranchWorld .horse").forEach(t=>{const n=+t.dataset.horse;t.classList.toggle("stallOff",sn()&&!e.has(n)),!(!e.has(n)||nn.has(n)||t.classList.contains("away"))&&ri(t,dn(n),Wn)})}function A$(e,t,n){if(nn.has(e)||Math.hypot(t-dn(e),n-Wn)<26)return;nn.set(e,{x:t,y:n});const s=document.querySelector(`#ranchWorld .horse[data-horse="${e}"]`);s&&(s.classList.add("trotting"),s.classList.remove("away"),s.classList.toggle("flipped",dn(e)<t),ri(s,t,n))}function R$(e,t,n){const s=n?-1:1;for(const o of[s*118,-s*118,s*160,-s*78])for(const i of[0,30,-26,48]){const a=ai(e+o,t+i);if(!(Math.hypot(a.x-e,a.y-t)<50)&&!ii(a.x,a.y,8))return a}return ai(e,t)}let ec=0,og=0;const Ri=()=>y?y.now():Date.now(),zi=()=>Ka(y?y.ranch.plots:G.get().garden),ro=()=>Ga(y?y.players.get(y.pid)?.basket:G.get().basket),Pr=()=>le?Za:Ks,ig=()=>le?"barn":"ranch",ag=()=>{const e=new Map;for(const t of tn("ranch"))t.p.ride!==void 0&&e.set(t.p.ride,t);return e};function Da(e){const t={taken:"A friend just planted there!",wet:"Already watered 💧",notReady:"Still growing! 🌱",full:"Your basket is full!",slow:"The hen is laying… try again!",none:"Your basket has none left",nohouse:"Go home to put it in your room"};t[e]&&(Q(t[e]),C.pop())}function ts(e){if(y){const o=ca(zi(),ro(),e,Ri(),e.op==="egg"?ec:0);return typeof o=="string"?(Da(o),!1):(e.op==="egg"&&(ec=Date.now()),y.ranchOp(e),!0)}const t=G.get(),n=Date.now(),s=ca(Ka(t.garden),Ga(t.basket),e,n,t.lastEgg??0);return typeof s=="string"?(Da(s),!1):(G.dispatch({type:"ranch/op",op:e,now:n}),Di(!0),Er(),!0)}function Vs(e=!1){const t=L==="ranch"&&le&&!e;Rn(),$("ranch").classList.remove("hidden"),ce=null,Re=[],L="ranch",le=e;const n=e?{where:"barn",x:170,y:560,flip:!1}:{where:"ranch",x:t?aa:130,y:t?520:565,flip:!1};y?Pe(n):Ve=n,$("streetTitle").textContent=e?"The Barn":"Rainbow Ranch",xt(),Hr(),requestAnimationFrame(()=>{const s=$("ranchScroll"),o=ft();s.scrollLeft=t?Math.max(0,aa*o-s.clientWidth/2):0,qa()}),setTimeout(qa,650),ao($("ranch")),e?C.swish():C.sparkle()}$("btnHopOff").addEventListener("click",()=>rg());function Hr(){const e=ft(),t=$("ranchWorld"),n=o=>o*e+"px",s=(o,i,a,r)=>`left:${n(o-a/2)};top:${n(i-r)};width:${n(a)};height:${n(r)};z-index:${Zs(i)}`;if(t.style.width=Pr()*e+"px",t.style.height=eo*e+"px",t.style.setProperty("--sc",String(e)),le){t.innerHTML=l8()+`<button class="rprop barnExit" data-r="exit" aria-label="Go outside" style="${s(127,444,206,244)}"><span class="exitHint"><span>Outside ☀️</span></span></button>`+$n.map((o,i)=>`<button class="animal" data-animal="${i}" aria-label="${Nc[i].name}" style="${s(Va[i],Kg+30,128,107)}">${La(i)}</button>`).join("")+[300,1244].map(o=>["carrot","apple","hay"].map((i,a)=>`<button class="bucket" data-feed="${i}" aria-label="${i} bucket" style="${s(o+a*56,592,54,62)}">${t8(i)}</button>`).join("")).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',on(),$e();return}t.innerHTML=V6()+G6().replace("<svg ",`<svg style="z-index:${Zs(K6)}" `)+`<button class="rprop barnDoor" data-r="barn" aria-label="Go into the barn" style="${s(aa,472,150,150)}"><span class="doorHint"><span>Petting zoo inside! 🐐</span></span></button><button class="rprop windmill" data-r="mill" aria-label="Windmill" style="${s(1540,478,150,240)}">${i8}</button><button class="rprop henHouse" data-r="egg" aria-label="Hen house" style="${s(715,482,180,170)}">${Y6}</button><button class="rprop tractor" data-r="honk" aria-label="Tractor" style="${s(900,580,170,130)}">${X6}</button><button class="rprop appleTree" data-r="apple" aria-label="Apple tree" style="${s(2085,482,240,300)}">${J6}</button>`+Yg.map((o,i)=>{const a=Tr();return`<button class="horse${sn()&&Ai().indexOf(i)<0?" stallOff":""}" data-horse="${i}" aria-label="${Go[i].name} horse" style="${s(dn(i),Wn,a.w,a.h)}">${lr(i)}</button>`}).join("")+Array.from({length:ra},(o,i)=>`<button class="plot" data-plot="${i}" aria-label="Garden plot" style="${s(Jg(i),594,66,86)}"></button>`).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',Di(!0),on(),$e()}const _o=[];function Di(e=!1){if(L!=="ranch"||le)return;const t=zi(),n=Ri();document.querySelectorAll("#ranchWorld .plot").forEach(s=>{const o=+s.dataset.plot,i=t[o]??null,a=bi(i,n),r=JSON.stringify(i)+a;!e&&_o[o]===r||(_o[o]!==void 0&&_o[o]!==r&&a>0&&(s.classList.remove("grow"),s.offsetWidth,s.classList.add("grow")),_o[o]=r,s.innerHTML=Zc(i,a,o),s.dataset.stage=i?String(a):"empty")})}function on(){const e=document.getElementById("ravatars");if(!e||L!=="ranch")return;const t=ft(),n=new Set,s=new Set;let o=!1;for(const i of tn(ig())){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&Nd(a));const r=JSON.stringify(i.look)+i.name;if(a.dataset.look!==r){const h=a.querySelector(".bubble");a.innerHTML=i.name?wr(i.look,i.name):`<div class="inner">${Ue(i.look)}</div>`,h&&a.appendChild(h),a.dataset.look=r,a.dataset.ride=""}const l=i.p.ride,c=(Js[i.look.size]??1)*t*.95*(l!==void 0?T$:1),d=fn*c,g=wt*c;if(a.dataset.ride!==String(l??"")&&(a.querySelector(".mount")?.remove(),l!==void 0&&a.insertAdjacentHTML("afterbegin",`<div class="mount" data-mount="${l}">${lr(l,!0)}${E$(i.look)}</div>`),a.dataset.ride=String(l??"")),a.classList.toggle("riding",l!==void 0),l!==void 0){s.add(l),i.mine&&(o=!0),Ao.set(l,{x:i.p.x,y:i.p.y});const h=sn()?ng:tg,p=sn()?W$:B$,b=h*t,_=p*t,m=a.querySelector(".mount");m.style.width=b+"px",m.style.height=_+"px",m.style.left=(d-b)/2+"px",m.style.top=g-_+"px";const u=Number(a.querySelector(".shirt")?.getAttribute("data-hem")??126),k=Number(m.querySelector(".saddle")?.getAttribute("data-top")??43),M=(u+P$/2)/160*g,T=g-_+(k-H$/2)/130*_;a.style.setProperty("--lift",M-T+"px");const H=m.querySelector(".rideleg");H&&(H.style.left="0",H.style.top="0",H.style.width="100%",H.style.height="100%")}else a.style.removeProperty("--lift");const f=parseFloat(a.dataset.lx??"NaN");Number.isFinite(f)&&Math.abs(f-i.p.x)>2&&(a.classList.add("moving"),clearTimeout(+(a.dataset.mt??0)),a.dataset.mt=String(window.setTimeout(()=>a.classList.remove("moving"),260))),a.dataset.lx=String(i.p.x),a.style.left=i.p.x*t-d/2+"px",a.style.top=i.p.y*t-g+"px",a.style.width=d+"px",a.style.height=g+"px",a.style.zIndex=Zs(i.p.y),a.classList.toggle("flipped",i.p.flip),Xs(a,i.look,i.mine)}if(e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),document.body.classList.contains("phone")){const i=new Set(Ai());document.querySelectorAll("#ranchWorld .horse").forEach(a=>{a.classList.toggle("stallOff",sn()&&!i.has(+a.dataset.horse))})}document.querySelectorAll("#ranchWorld .horse").forEach(i=>{const a=+i.dataset.horse;s.has(a)?(i.classList.add("away"),nn.delete(a)):i.classList.remove("away")});for(const[i,a]of[...Ao])s.has(i)||(A$(i,a.x,a.y),Ao.delete(i));document.body.classList.toggle("riding",o),An()}function z$(e){const t=_t();if(!t||t.where!=="ranch")return;const n=ag().get(e);if(n&&!n.mine){Q("Someone is riding!"),C.pop();return}if(t.ride!==void 0){if(n?.mine||t.ride===e){rg();return}sg(dn(e),Math.min(At,Wn+8));return}Re=[],nn.delete(e),ct({where:"ranch",x:dn(e),y:Math.min(At,Wn+8),flip:!1,ride:e}),C.neigh(),Q(`You're riding ${Go[e].name}! Tap the ground to gallop 🐴`)}function rg(){const e=_t();if(!e||e.ride===void 0)return;const t=e.ride,{ride:n,...s}=e;Re=[];const o=R$(s.x,s.y,s.flip);Ao.set(t,{x:s.x,y:s.y}),ct({...s,x:o.x,y:o.y}),C.drop()}function Ur(e,t){const n=e<$n.length?document.querySelector(`#ranchWorld .animal[data-animal="${e}"]`):document.querySelector(`#ranchWorld .horse[data-horse="${e-$n.length}"]:not(.away)`)??document.querySelector(`#ravatars .mount[data-mount="${e-$n.length}"]`);if(!n||L!=="ranch")return;const s=e>=$n.length,o=s?{say:"Neigh! ♥",snd:"neigh"}:Nc[e];n.classList.remove("hop","munch"),n.offsetWidth,n.classList.add(t?"munch":"hop"),setTimeout(()=>n.classList.remove("hop","munch"),1400),n.querySelector(".abubble")?.remove();const i=document.createElement("div");i.className="bubble petBubble abubble",i.textContent=t?`Yum! Munch munch ${t===1?"🥕":t===2?"🍎":"🌾"}`:o.say,n.appendChild(i),hs(),setTimeout(()=>i.classList.add("out"),1400),setTimeout(()=>i.remove(),1800);for(let a=0;a<(t?6:4);a++){const r=document.createElement("div");r.className="heart",r.textContent="♥",r.style.left=15+Math.random()*70+"%",r.style.animationDelay=a*.12+"s",r.style.color=["#ff6b9a","#ff8fab","#e879c6","#b197fc"][a%4],n.appendChild(r),setTimeout(()=>r.remove(),1900)}C[o.snd]?.(),t&&setTimeout(()=>C.munch(),250)}function lg(){const e=document.querySelector("#ranchWorld .henHouse");e&&(e.classList.remove("lay"),e.offsetWidth,e.classList.add("lay"),C.cluck())}function D$(){const e=document.querySelector("#ranchWorld .henHouse"),t=$("basketChip");if(!e)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=document.createElement("div");o.className="flyEgg",o.innerHTML=Ns,document.body.appendChild(o),Object.assign(o.style,{left:n.left+n.width/2-18+"px",top:n.top+n.height*.6+"px"}),requestAnimationFrame(()=>{o.style.left=s.left+s.width/2-18+"px",o.style.top=s.top+"px",o.style.transform="scale(.6) rotate(200deg)"}),setTimeout(()=>{o.remove(),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")},650)}function cg(e){const t=document.getElementById("rfx");if(!t||L!=="ranch")return;const n=ft(),[s,o]=$l[e]??$l[0],i=1965+s,a=182+o,r=i+(e%2?26:-22),l=575+e*4,c=document.createElement("button");c.className="fallenApple",c.dataset.feed="apple",c.setAttribute("aria-label","Apple"),c.innerHTML=jc;const d=32*n;Object.assign(c.style,{width:d+"px",height:d+"px",left:i*n-d/2+"px",top:a*n-d/2+"px",zIndex:Zs(l)}),t.appendChild(c),requestAnimationFrame(()=>{c.style.left=r*n-d/2+"px",c.style.top=l*n-d+"px",c.classList.add("fallen")});const g=document.querySelector("#ranchWorld .appleTree");g?.classList.remove("shake"),g?.offsetWidth,g?.classList.add("shake"),C.boing(),setTimeout(()=>c.remove(),12e3)}function dg(){const e=document.querySelector("#ranchWorld .tractor");e?.classList.remove("bounce"),e?.offsetWidth,e?.classList.add("bounce"),C.honk()}function I$(e){e.k==="zoo"?Ur(e.a,e.f):e.k==="apple"?cg(e.v):e.k==="honk"?dg():e.k==="hen"&&lg()}function tc(e,t){const n=document.elementFromPoint(e,t);if(!n)return null;const s=n.closest("[data-animal]");if(s)return+s.dataset.animal;const o=n.closest(".horse:not(.away)");if(o)return $n.length+ +o.dataset.horse;const i=n.closest(".savatar.riding");return i?.dataset.ride?$n.length+ +i.dataset.ride:null}function Ia(e,t,n){e.preventDefault(),e.stopPropagation();const s=document.createElement("div");s.className="feedGhost",s.innerHTML=Fc[t],document.body.appendChild(s);const o=p=>{s.style.left=p.clientX-30+"px",s.style.top=p.clientY-50+"px"};o(e),C.pick();let i=0;const a=e.clientX,r=e.clientY;n instanceof HTMLElement&&(n.style.visibility="hidden");let l=e.clientX,c=0;const d=$("ranchScroll"),g=()=>{const p=d.getBoundingClientRect(),b=l<p.left+60?-12:l>p.right-60?12:0;b&&i>12&&L==="ranch"&&(d.scrollLeft+=b),c=requestAnimationFrame(g)};c=requestAnimationFrame(g);const f=p=>{if(p.pointerId!==e.pointerId)return;l=p.clientX,i=Math.max(i,Math.hypot(p.clientX-a,p.clientY-r)),o(p),document.querySelectorAll(".feedHover").forEach(_=>_.classList.remove("feedHover")),tc(p.clientX,p.clientY)!==null&&document.elementFromPoint(p.clientX,p.clientY)?.closest(".animal, .horse, .savatar")?.classList.add("feedHover")},h=p=>{if(p.pointerId!==e.pointerId)return;cancelAnimationFrame(c),window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",h),s.remove(),og=Date.now(),document.querySelectorAll(".feedHover").forEach(m=>m.classList.remove("feedHover"));const b=tc(p.clientX,p.clientY);if(b===null){n instanceof HTMLElement&&(n.style.visibility=""),i<12?Q("Drag the food onto an animal! 🥕"):C.drop();return}if(n==="basket"&&!ts({op:"use",kind:"carrot"}))return;n instanceof HTMLElement&&n.remove();const _=Xg.indexOf(t);Ur(b,_),y?.fx({k:"zoo",a:b,f:_})};window.addEventListener("pointermove",f),window.addEventListener("pointerup",h)}$("ranchWorld").addEventListener("pointerdown",e=>{const t=e.target,n=t.closest(".bucket");if(n)return Ia(e,n.dataset.feed,"bucket");const s=t.closest(".fallenApple");if(s)return Ia(e,"apple",s);t.closest(".rprop, .animal, .horse, .plot, .pet")&&e.stopPropagation()});$("ranchWorld").addEventListener("click",e=>{const t=e.target;if(!_t()||L!=="ranch"||Date.now()-og<400)return;const s=t.closest("[data-animal]");if(s){const g=+s.dataset.animal;Ur(g,0),y?.fx({k:"zoo",a:g,f:0});return}const o=t.closest("[data-horse]");if(o){z$(+o.dataset.horse);return}const i=t.closest("[data-r]")?.dataset.r;if(i==="egg"){lg(),ts({op:"egg"})&&(D$(),C.pickup());return}if(i==="honk"){dg(),y?.fx({k:"honk"});return}if(i==="apple"){const g=Math.floor(Math.random()*4);cg(g),y?.fx({k:"apple",v:g});return}if(i==="barn"){Vs(!0);return}if(i==="exit"){Vs(!1);return}if(i==="mill"){const g=t.closest(".windmill");g?.classList.remove("whirl"),g?.offsetWidth,g?.classList.add("whirl"),C.swish();return}const a=t.closest("[data-plot]");if(a){q$(+a.dataset.plot,a);return}if(t.closest(".bucket, .fallenApple, .savatar, .pet"))return;const r=$("ranchWorld").getBoundingClientRect(),l=ft(),c=(e.clientX-r.left)/l,d=(e.clientY-r.top)/l;d<400||sg(c,d)});function q$(e,t){const n=zi()[e]??null,s=bi(n,Ri());if(document.querySelector(".seedPick")?.remove(),!n){const o=document.createElement("div");o.className="seedPick",o.innerHTML=`<button data-seed="carrot">${Si}<span>Carrot</span></button><button data-seed="flower">${cr()}<span>Flower</span></button>`,t.parentElement.appendChild(o),o.style.left=t.offsetLeft+t.offsetWidth/2+"px",o.style.top=t.offsetTop-8+"px",o.addEventListener("pointerdown",i=>i.stopPropagation()),o.addEventListener("click",i=>{i.stopPropagation();const a=i.target.closest("[data-seed]")?.dataset.seed;o.remove(),a&&ts({op:"plant",i:e,seed:a})&&(C.plant(),Q("Planted! Now tap it to water 💧"))}),setTimeout(()=>o.remove(),6e3);return}if(!n.wet){ts({op:"water",i:e})&&(C.water(),t.classList.remove("watering"),t.offsetWidth,t.classList.add("watering"));return}if(s<3){Q("Still growing! 🌱"),C.pop();return}ts({op:"pick",i:e})&&(C.pickup(),Q(n.seed==="carrot"?"A carrot for your basket! 🥕":"Pretty flowers for your basket! 🌸"))}let nc=0;function O$(e,t){if(L!=="ranch")return;const n=Date.now();if(document.querySelectorAll("#ranchWorld .animal").forEach(s=>{const o=+s.dataset.animal,i=ft(),a=n/5200+o*1.7,r=(le?Va:Gg)[o]+Math.sin(a)*32;s.style.left=(r-s.offsetWidth/i/2)*i+"px",s.classList.toggle("flipped",Math.cos(a)<0),s.classList.toggle("walking",Math.abs(Math.cos(a))>.35)}),e-nc>1e3&&(nc=e,Di()),Re.length){const s=_t();if(!s||s.where!==ig())Re=[];else{const o=Re[0],i=s.ride!==void 0?720:300,a=o.x-s.x,r=o.y-s.y,l=Math.hypot(a,r);if(l<6)Re.shift();else{const c=Math.min(l,i*t),d={...s,x:s.x+a/l*c,y:s.y+r/l*c,flip:Math.abs(a)>2?a<0:s.flip};ct(d);const g=ft(),f=$("ranchScroll"),h=d.x*g-f.scrollLeft;h>-40&&h<f.clientWidth+40&&(h<f.clientWidth*.2||h>f.clientWidth*.8)&&(f.scrollLeft=d.x*g-f.clientWidth/2)}}}for(const[s,o]of nn){const i=document.querySelector(`#ranchWorld .horse[data-horse="${s}"]`);if(!i||i.classList.contains("away")){nn.delete(s);continue}const a=dn(s)-o.x,r=Wn-o.y,l=Math.hypot(a,r);if(l<8){nn.delete(s),i.classList.remove("trotting","flipped"),ri(i,dn(s),Wn);continue}const c=Math.min(l,460*t);o.x+=a/l*c,o.y+=r/l*c,i.classList.add("trotting"),i.classList.toggle("flipped",a<0),ri(i,o.x,o.y)}}function Er(){const e=document.getElementById("basketChip");if(!e)return;const t=L==="house"&&(!y||Ge===G||he===y.myHouseId()),n=ro(),o=n.egg+n.carrot+n.flower>0&&(L==="ranch"||t);e.classList.toggle("hidden",!o),e.classList.toggle("inHouse",L==="house"),o&&(e.innerHTML=`<span class="bIcon">${n8}</span><span class="bcount" data-kind="egg">${Ns}<b>${n.egg}</b></span><span class="bcount" data-kind="carrot">${Si}<b>${n.carrot}</b></span><span class="bcount" data-kind="flower">${cr()}<b>${n.flower}</b></span>`)}$("basketChip").addEventListener("pointerdown",e=>{e.target.closest('.bcount[data-kind="carrot"]')&&L==="ranch"&&ro().carrot>0&&Ia(e,"carrot","basket")});$("basketChip").addEventListener("click",()=>N$());function N$(){const e=L==="house"&&(!y||Ge===G||he===y.myHouseId()),t={egg:["Eggs",Ns],carrot:["Carrots",Si],flower:["Flowers",cr()]},n=st("",(o,i)=>{const a=o.closest("[data-take]")?.dataset.take;if(!a)return;if(!e){Q("Take it home to put it in your room! 🏠");return}const r="r"+Math.random().toString(36).slice(2,10),l=Math.max(120,Math.min(re-120,j+te/2+(Math.random()-.5)*300));ts({op:"take",kind:a,id:r,room:B.get().currentRoom,x:l})&&(C.drop(),i(),Q("It's in your room! Drag it to a hand to carry it ✋"))},"basketSheet"),s=ro();n.root.querySelector(".card").innerHTML=`${ot}<h2>My Basket</h2><p class="hint small">${e?"Tap one to put it in your room.":"Collect eggs, carrots and flowers at Rainbow Ranch, then take them home!"}</p>
    <div class="basketRows">${ic.map(o=>`<button class="bRow" data-take="${o}" ${s[o]?"":"disabled"}>${t[o][1]}<b>${s[o]}</b><span>${t[o][0]}</span></button>`).join("")}</div>`}window.__ranch=()=>({view:L,inBarn:le,plots:zi().map(e=>e?{seed:e.seed,stage:bi(e,Ri()),wet:!!e.wet}:null),basket:ro(),me:_t(),ridden:[...ag().keys()]});function j$(){if(Cs.kind==="none")return;W8(),st(T8(Cs.kind,Cs.entries),(t,n)=>{t.closest("#wnGo")&&(C.sparkle(),n())},"whatsNew "+Cs.kind).root.querySelector(".card").insertAdjacentHTML("afterbegin",ot)}setTimeout(j$,500);window.__whatsnew=Cs;window.__hood=()=>y;window.__hood_url=()=>$i();window.__ui=()=>({view:L,currentHouseId:he,mode:y?"hood":"solo",play:qe.mode()});aw({hood:()=>y,view:()=>L,solo:()=>Ve,myPres:ge,setPres:ct,toast:Q,refreshNear:An,sfx:C,goMap:es,soloLook:()=>{const e=G.get();return{look:Ys(e.characters[0]??{}),dog:e.dog??null}}});function gg(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n.items)t.add(s.kind);for(const n of e.characters)n.held.left&&t.add(n.held.left.kind),n.held.right&&t.add(n.held.right.kind);return[...t]}let Mo=null;function fg(e){return Mo||(Mo=Oa(()=>import("./load-0f8kje-w.js"),[]).then(t=>t.boot(location.search,gg(B.get()))).then(t=>{for(let n=0;n<t.length;n++)if(He[t[n]]){Hn(),Ie();return}}),Mo)}function F$(e){const t=new Set(e),n=B.get();let s=!1;for(const o of n.rooms[n.currentRoom].items){const i=He[o.kind];if(!t.has(o.kind)||!i)continue;const a=ye.querySelector(`.item[data-id="${o.id}"] .inner`);!a||a.querySelector("img.artimg")||(a.innerHTML=Sn(i,!0),s=!0)}s&&(lt.forEach(o=>{delete o.dataset.held}),Rt(n),Ie())}function Z$(){return Oa(()=>import("./load-0f8kje-w.js"),[]).then(e=>e.boot(location.search,gg(B.get()))).then(e=>{F$(e.filter(t=>!!He[t]))})}R4();D6();const V$=q8($("skyMount"));window.__sky=V$;Hn();Ie();so();$d();Wo();gs.matches?rn():so();requestAnimationFrame(ur);fg(B.get().currentRoom);const hg=()=>{const e=_i().size,t=Zo.length,n=$("secrets"),s=n.querySelector(".secCount");s&&(s.textContent=`${e}/${t}`),n.setAttribute("aria-label",`Surprises, ${e} of ${t}`),kd()};function li(){return window.innerHeight>window.innerWidth+40}function pg(e,t){for(const O of e)O.style.transform="";if(!li()||!e.length)return;const n=t&&t.clientWidth>20?t.getBoundingClientRect():{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth};if(n.width<20)return;const s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,window.innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,window.innerHeight)-s,l=Math.max(40,i-o),c=Math.max(40,r-a),g=e.map(O=>O.getBoundingClientRect()).filter(O=>O.width>2&&O.height>2);if(!g.length)return;const f=Math.min(...g.map(O=>O.left)),h=Math.max(...g.map(O=>O.right)),p=Math.min(...g.map(O=>O.top)),b=Math.max(...g.map(O=>O.bottom)),_=Math.max(1,h-f),m=Math.max(1,b-p),u=Math.min(1,l/_,c/m);if(u>.995&&f>=o-1&&h<=i+1&&p>=a-1&&b<=r+1)return;const M=e[0].getScreenCTM(),T=M&&Math.hypot(M.a,M.b)||1,H=(f+h)/2,U=(p+b)/2,F=m*u,ae=(o+i)/2,se=p>=a&&b<=r?U:Math.min(Math.max(U,a+F/2),r-F/2);for(const O of e){const fe=O.getBoundingClientRect(),zn=(fe.left+fe.right)/2,Dn=(fe.top+fe.bottom)/2,lo=ae+(zn-H)*u,pn=se+(Dn-U)*u;O.style.transformBox="fill-box",O.style.transformOrigin="center",O.style.transform=`translate(${((lo-zn)/T).toFixed(2)}px, ${((pn-Dn)/T).toFixed(2)}px) scale(${u.toFixed(3)})`}}function ug(){if(L!=="gameroom")return;const e=document.getElementById("grScroll");pg([...document.querySelectorAll(".neonSignArt")],e)}function qa(){L!=="ranch"||le||(document.querySelectorAll(".ranchSignArt").forEach(e=>{e.style.transform=""}),$e(),mg(),Qr())}function Qr(){if(L!=="ranch"||le)return;const e=document.getElementById("ranchScroll");if(!e)return;const t=e.getBoundingClientRect();document.querySelectorAll(".ranchSignArt").forEach(n=>{const s=n.getBoundingClientRect(),o=Math.min(t.right,innerWidth),i=Math.max(0,t.left-s.left)+Math.max(0,s.right-o);n.style.visibility=s.width>20&&i<8?"visible":"hidden"})}$("ranchScroll").addEventListener("scroll",()=>{L==="ranch"&&!le&&Qr()},{passive:!0});function mg(){const e=document.querySelector(".doorHint"),t=document.getElementById("ranchScroll");if(!e||!t)return;e.style.transform="translateX(-50%)";const n=t.getBoundingClientRect(),s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,innerHeight)-s,l=e.getBoundingClientRect();let c=0;l.right>i&&(c-=l.right-i),l.left+c<o&&(c+=o-(l.left+c));let d=0;const g=t.querySelector(".savatar");if(g){const f=g.getBoundingClientRect(),p=g.querySelector(".nametag")?.getBoundingClientRect(),b=!!(p&&p.width>4&&p.height>4),_=b?Math.min(f.top,p.top):f.top,m=b?Math.min(f.left,p.left):f.left,u=b?Math.max(f.right,p.right):f.right,k=l.left+c;l.right+c>m-6&&k<u+6&&l.bottom+d>_-6&&l.top<f.top+f.height*.72&&(d+=_-48-(l.bottom+d))}if(l.top+d<a&&(d+=a-(l.top+d)),document.body.classList.contains("phone-portrait")){const f=document.querySelector(".ranchSign .ranchSignArt");if(f){const h=f.getBoundingClientRect(),p=l.left+c,b=l.right+c,_=l.top+d,m=l.bottom+d;if(h.width>20&&h.height>h.width*.7&&b>h.left+4&&p<h.right-4&&m>h.top+4&&_<h.bottom-4){let k=h.top-16-m;_+k<a&&(k+=a-(_+k));const T=g?.querySelector(".nametag")?.getBoundingClientRect(),H=m+k;!(T&&T.width>4&&T.height>4&&H>T.top-12&&b>T.left-6&&p<T.right+6)&&H<=r&&(d+=k)}}}(c||d)&&(e.style.transform=`translate(calc(-50% + ${c.toFixed(1)}px), ${d.toFixed(1)}px)`)}const yg=tp({world:hd,roomW:re,roomH:Te,currentRoom:()=>B.get().currentRoom,sparkle:()=>C.sparkle(),tap:()=>C.click(),onFound:(e,t)=>{if(hg(),t){const n=$("secrets");n.classList.remove("pulse"),n.offsetWidth,n.classList.add("pulse"),setTimeout(()=>Q("🎁 A secret surprise appeared in your drawer!"),1400),Ie()}}});B.subscribe((e,t)=>{(t.type==="room/switch"||t.type==="game/reset")&&yg.update()});hg();window.__eggs=()=>({found:[..._i()]});n$();export{Oa as _,K$ as r,G$ as s};
