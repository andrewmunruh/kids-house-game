(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const wf="modulepreload",$f=function(e){return"/kids-house-game/"+e},Wl={},Sr=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(n.map(l=>{if(l=$f(l),l in Wl)return;Wl[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":wf,c||(g.as="script"),g.crossOrigin="",g.href=l,r&&g.setAttribute("nonce",r),document.head.appendChild(g),c)return new Promise((f,p)=>{g.addEventListener("load",f),g.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return o.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})},ho="#5a3d5c",A=(e=4)=>`stroke="${ho}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,wa=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],en=1e3,tn=700,$a="M 30 660 C 150 640, 200 540, 330 545 S 540 650, 690 600 S 925 470, 850 375 S 640 330, 520 355 S 270 385, 250 285 S 330 145, 480 150 S 700 200, 790 150",fn={x:115,y:170},Ht={x:880,y:120},Wt={x:600,y:480},hn={x:400,y:260},Xc=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity=".1"/><rect x="-5" y="2" width="10" height="20" rx="4" fill="#c99366" ${A(3)}/><circle cx="0" cy="-10" r="20" fill="${s}" ${A(3)}/><circle cx="-12" cy="-2" r="12" fill="${s}" ${A(3)}/><circle cx="12" cy="-3" r="13" fill="${s}" ${A(3)}/><circle cx="-5" cy="-16" r="5" fill="#fff" opacity=".35"/></g>`,zn=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})" fill="#fff"><ellipse cx="0" cy="10" rx="46" ry="22"/><ellipse cx="-36" cy="16" rx="28" ry="16"/><ellipse cx="38" cy="14" rx="30" ry="18"/><ellipse cx="10" cy="2" rx="24" ry="18"/></g>`,oo=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">${[0,72,144,216,288].map(o=>`<circle cx="${(Math.cos(o*Math.PI/180)*8).toFixed(1)}" cy="${(Math.sin(o*Math.PI/180)*8).toFixed(1)}" r="6.5" fill="${n}" ${A(2)}/>`).join("")}<circle r="4.5" fill="#ffd43b" ${A(2)}/></g>`,pn=(e,t,n)=>`<g transform="translate(${e} ${t})">${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*4}" cy="${Math.sin(s*Math.PI/180)*4}" r="3.6" fill="${n}"/>`).join("")}<circle r="2.6" fill="#ffd43b"/></g>`;function xf(){return`<svg class="mapBg" viewBox="0 0 ${en} ${tn}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${en}" height="${tn}" rx="34" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="160" cy="420" rx="150" ry="90"/><ellipse cx="760" cy="250" rx="170" ry="70"/><ellipse cx="480" cy="640" rx="140" ry="50"/><ellipse cx="930" cy="600" rx="90" ry="110"/></g>
  <g fill="#93d78e" opacity=".7"><ellipse cx="420" cy="260" rx="70" ry="30"/><ellipse cx="80" cy="560" rx="60" ry="26"/><ellipse cx="700" cy="420" rx="50" ry="22"/></g>
  <!-- pond -->
  <ellipse cx="120" cy="470" rx="72" ry="40" fill="#8ecae6" ${A()}/><ellipse cx="108" cy="462" rx="42" ry="16" fill="#bde6f7"/><path d="M150 480 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <!-- side paths to the park and the ranch -->
  <path d="M250 285 Q190 250 150 215" fill="none" stroke="${ho}" stroke-width="30" stroke-linecap="round"/><path d="M250 285 Q190 250 150 215" fill="none" stroke="#f2dcb8" stroke-width="22" stroke-linecap="round"/>
  <!-- the street -->
  <path d="${$a}" fill="none" stroke="${ho}" stroke-width="58" stroke-linecap="round"/>
  <path id="mapRoad" d="${$a}" fill="none" stroke="#f2dcb8" stroke-width="48" stroke-linecap="round"/>
  <path d="${$a}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 16" stroke-linecap="round" opacity=".9"/>
  <!-- town square -->
  <g transform="translate(${Wt.x} ${Wt.y})"><circle r="74" fill="#f7e6c8" ${A()}/><circle r="74" fill="none" stroke="#e6cfa6" stroke-width="10" stroke-dasharray="10 12" transform="scale(.82)"/>
    <circle r="30" fill="#bde6f7" ${A()}/><circle r="13" fill="#fff6e6" ${A(3)}/><path d="M0 -13 Q-8 -32 -16 -20 M0 -13 Q8 -32 16 -20 M0 -13 V-34" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>
    ${pn(-52,-40,"#ff8fab")}${pn(54,-38,"#b197fc")}${pn(-56,40,"#ffd43b")}${pn(52,44,"#ff8fab")}</g>
  ${[[60,330,"#ff8fab"],[300,470,"#b197fc"],[430,560,"#ffd43b"],[760,520,"#ff8fab"],[950,260,"#b197fc"],[600,260,"#ffd43b"],[380,90,"#ff8fab"],[40,120,"#b197fc"],[960,420,"#ffd43b"],[840,640,"#b197fc"],[210,620,"#ff8fab"]].map(([e,t,n])=>pn(+e,+t,String(n))+pn(+e+14,+t+8,String(n))).join("")}
  </svg>`}function Tl(e,t,n=en,s=tn){const o=[];let i=7;const a=()=>(i=(i*9301+49297)%233280)/233280;for(let r=0;r<260&&o.length<34;r++){const l=30+a()*(n-60),c=40+a()*(s-70);t(l,c)||e.some(d=>Math.hypot(d.x-l,d.y-c)<d.r)||(e.push({x:l,y:c,r:46}),o.push(Xc(l,c,.75+a()*.45,["#5cc985","#4fbf7a","#78d39a"][r%3])))}return`<svg class="mapTrees" viewBox="0 0 ${n} ${s}" xmlns="http://www.w3.org/2000/svg">${o.join("")}</svg>`}function _f(e,t){const n=e/2,s=`M ${n} 36 C ${n-36} ${t*.28}, ${n+28} ${t*.48}, ${n-8} ${t*.68} S ${n+18} ${t*.86}, ${n} ${t-28}`;return`<svg class="mapBg" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="${t}" rx="28" fill="#a6e3a0"/>
  <g fill="#b6f0c8"><ellipse cx="${e*.22}" cy="${t*.22}" rx="90" ry="48"/><ellipse cx="${e*.78}" cy="${t*.42}" rx="80" ry="40"/><ellipse cx="${e*.3}" cy="${t*.72}" rx="100" ry="46"/></g>
  <ellipse cx="78" cy="${t*.58}" rx="46" ry="28" fill="#8ecae6" ${A()}/><ellipse cx="70" cy="${t*.56}" rx="24" ry="10" fill="#bde6f7"/>
  <path d="${s}" fill="none" stroke="${ho}" stroke-width="44" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#f2dcb8" stroke-width="34" stroke-linecap="round"/>
  <path d="${s}" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round" opacity=".9"/>
  ${[[40,250,"#ff8fab"],[500,280,"#b197fc"],[70,520,"#ffd43b"],[490,640,"#ff8fab"],[50,860,"#74c0fc"],[500,980,"#ffd43b"]].map(([o,i,a])=>pn(+o,+i,String(a))+pn(+o+16,+i+10,String(a))).join("")}
  </svg>`}const Mf=(e,t,n=1,s="#4fbf7a")=>`<g transform="translate(${e} ${t}) scale(${n})"><ellipse cx="0" cy="10" rx="28" ry="8" fill="#000" opacity=".08"/><circle cx="-14" cy="-2" r="16" fill="${s}" ${A(3)}/><circle cx="14" cy="0" r="18" fill="${s}" ${A(3)}/><circle cx="0" cy="-12" r="14" fill="${s}" ${A(3)}/><circle cx="-4" cy="-16" r="4" fill="#fff" opacity=".28"/></g>`,Lf=(e,t,n="#ff8fab")=>`<g transform="translate(${e} ${t})"><ellipse cx="-7" cy="-2" rx="8" ry="5" fill="${n}" ${A(2)} transform="rotate(-24)"/><ellipse cx="7" cy="-2" rx="8" ry="5" fill="${n}" ${A(2)} transform="rotate(24)"/><ellipse cx="-6" cy="4" rx="6" ry="4" fill="#b197fc" ${A(1.6)} transform="rotate(18)"/><ellipse cx="6" cy="4" rx="6" ry="4" fill="#b197fc" ${A(1.6)} transform="rotate(-18)"/><path d="M0 -6 V8" ${A(2)}/></g>`;function Cf(e,t,n){const s=e/2,o=(g,f,p)=>f>t*.4&&f<t-28&&Math.abs(g-s)>52&&!n.some(u=>Math.hypot(u.x-g,u.y-f)<u.r+p),i=[.07,.15,.22,.78,.85,.93],a=[.46,.54,.62,.7,.78,.86,.93],r=["#ff8fab","#b197fc","#ffd43b","#74c0fc","#69db7c"],l=[];let c=0;a.forEach((g,f)=>{i.forEach((p,u)=>{const b=Math.round(e*p+((f+u)%2?8:-6)),M=Math.round(t*g);if((f+u)%3===0){if(!o(b,M,34))return;l.push(Mf(b,M,.85+u%2*.15,["#4fbf7a","#5cc985","#3dae6a"][(f+u)%3]))}else{if(!o(b,M,18))return;const m=r[(f*2+u)%r.length];l.push(oo(b,M,m,.85)),(f+u)%2===0&&o(b+18,M+12,14)&&l.push(oo(b+18,M+12,r[(f+u+2)%r.length],.7))}c++})});const d=[[e*.2,t*.5],[e*.8,t*.66],[e*.18,t*.84]];for(const[g,f]of d)o(g,f,16)&&l.push(Lf(Math.round(g),Math.round(f),c%2?"#ffd43b":"#ff8fab"));return`<svg class="mapMeadowFill" viewBox="0 0 ${e} ${t}" xmlns="http://www.w3.org/2000/svg">${l.join("")}</svg>`}const Sf=`<svg class="mapSkyArt" viewBox="0 0 900 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
  ${zn(280,28,1.05)}${zn(430,8,.8)}${zn(560,36,.95)}
  ${zn(250,88,.75)}${zn(390,108,1.05)}${zn(540,96,.85)}${zn(640,78,.7)}
  <g fill="none" stroke-linecap="round">
    ${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M300 ${118+t*6} A70 48 0 0 1 430 ${112+t*6}" stroke="${e}" stroke-width="5"/>`).join("")}
  </g>
</svg>`,Bf=`<svg class="mapMeadowArt" viewBox="0 0 900 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
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
  ${[[48,188,"#ff8fab",.85],[120,176,"#ffd43b",.7],[200,198,"#b197fc",.9],[280,172,"#ff8fab",.75],[360,204,"#74c0fc",.8],[450,178,"#ffd43b",.85],[530,200,"#ff8fab",.75],[620,174,"#b197fc",.8],[700,196,"#69db7c",.7],[790,180,"#ffd43b",.85]].map(([e,t,n,s])=>oo(+e,+t,String(n),+s)).join("")}
  ${[[80,248,"#ff8fab"],[160,268,"#b197fc"],[250,242,"#ffd43b"],[340,274,"#ff8fab"],[430,250,"#74c0fc"],[520,270,"#b197fc"],[610,246,"#ffd43b"],[700,272,"#ff8fab"],[790,252,"#69db7c"]].map(([e,t,n])=>oo(+e,+t,String(n),1.05)).join("")}
  ${[[110,304,"#ffd43b"],[230,292,"#ff8fab"],[360,308,"#b197fc"],[490,294,"#74c0fc"],[620,306,"#ff8fab"],[750,296,"#ffd43b"]].map(([e,t,n])=>oo(+e,+t,String(n),.9)).join("")}
</svg>`,Rl=`<svg viewBox="0 0 200 170"><ellipse class="parkLawn" cx="100" cy="100" rx="94" ry="62" fill="#7fd68a" ${A()}/>
  <ellipse cx="62" cy="120" rx="30" ry="14" fill="#8ecae6" ${A(3)}/>
  <path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round"/><path d="M96 60 L80 120 M96 60 L112 120 M150 60 L134 120 M150 60 L166 120 M92 60 H154" fill="none" ${A(2)}/>
  <path d="M112 62 V100 M134 62 V100" ${A(2.5)}/><rect x="104" y="98" width="16" height="7" rx="3" fill="#ffd43b" ${A(2.5)}/><rect x="126" y="98" width="16" height="7" rx="3" fill="#74c0fc" ${A(2.5)}/>
  ${Xc(40,66,1)}
  <path d="M150 128 L176 88 H186 L162 132 Z" fill="#b197fc" ${A(3)}/><path d="M178 88 V132" ${A(4)}/>
</svg>`,Ul=`<svg viewBox="0 0 220 180"><ellipse class="ranchGrass" cx="110" cy="132" rx="104" ry="44" fill="#a6e3a0" ${A()}/>
  ${wa.map((e,t)=>`<path d="M${20+t*7} 120 A${90-t*7} ${84-t*7} 0 0 1 ${200-t*7} 120" fill="none" stroke="${e}" stroke-width="7"/>`).join("")}
  <path d="M60 140 V82 L80 58 H140 L160 82 V140 Z" fill="#ef5b5b" ${A(4)}/>
  <path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${ho}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  ${wa.map((e,t)=>`<path d="M56 84 L80 54 H140 L164 84" fill="none" stroke="${e}" stroke-width="1.3" transform="translate(0 ${-3+t*1.2})"/>`).join("")}
  <rect x="88" y="100" width="44" height="40" rx="3" fill="#d94848" ${A(3)}/><path d="M88 100 L132 140 M132 100 L88 140" stroke="#fff6e6" stroke-width="3"/>
  <rect x="94" y="70" width="32" height="18" rx="4" fill="#fff6e6" ${A(3)}/>
  <path d="M10 150 H52 M168 150 H212 M14 140 V158 M30 140 V158 M46 140 V158 M174 140 V158 M190 140 V158 M206 140 V158" stroke="#fff6e6" stroke-width="5" stroke-linecap="round"/><path d="M10 150 H52 M168 150 H212" ${A(1.5)}/>
  <g transform="translate(178 122) scale(.42)"><ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" ${A(5)}/><path d="M24 -8 L40 -34 L54 -26 L36 2 Z" fill="#fff" ${A(5)}/>${wa.slice(0,4).map((e,t)=>`<path d="M38 ${-34+t*5} q-14 4 -20 14" fill="none" stroke="${e}" stroke-width="5" stroke-linecap="round"/>`).join("")}<path d="M-20 14 V34 M20 14 V34" ${A(6)}/></g>
</svg>`,El=`<svg viewBox="0 0 190 156">
  <ellipse cx="95" cy="118" rx="88" ry="32" fill="#ffd0e6" ${A()}/>
  <path d="M28 108 V62 L95 28 L162 62 V108 Z" fill="#fff0f6" ${A(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="#ff6b9a" ${A(4)}/>
  <path d="M22 66 L95 22 L168 66" fill="none" stroke="#ffd43b" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="78" y="78" width="34" height="30" rx="4" fill="#ff8ec8" ${A(3)}/>
  <path d="M95 86 C90 80 82 82 86 90 C90 96 95 100 95 100 C95 100 100 96 104 90 C108 82 100 80 95 86 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  <rect x="42" y="74" width="22" height="16" rx="3" fill="#66d9e8" ${A(2)}/><rect x="126" y="74" width="22" height="16" rx="3" fill="#d0bfff" ${A(2)}/>
  ${[36,52,68,84,100,116,132,148].map((e,t)=>`<circle class="clubBulb" cx="${e}" cy="58" r="3.2" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" ${A(1.4)}/>`).join("")}
  <circle cx="154" cy="48" r="3" fill="#fff" opacity=".9"/><circle cx="40" cy="44" r="2.4" fill="#fff" opacity=".85"/>
</svg>`,Br=`<svg viewBox="0 0 48 48"><path d="M6 12 L17 8 L31 13 L42 9 V36 L31 40 L17 35 L6 39 Z" fill="#fff3b0" ${A(3)}/><path d="M17 8 V35 M31 13 V40" ${A(2.5)}/><path d="M9 30 Q16 22 22 27 T38 18" fill="none" stroke="#ff8fab" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/><circle cx="36" cy="18" r="4" fill="#ff6b6b" ${A(2)}/></svg>`,Hr=e=>e.indexOf("data-chibi")>=0?e.replace('viewBox="0 0 200 320"','viewBox="24 0 152 168"'):e.replace('viewBox="0 0 100 160"','viewBox="14 2 72 74"'),Hf={},vt=e=>(Hf?.VITE_STORE_PREFIX??"")+e,Pf=400,Zi=["#ffe0c4","#f6d2b5","#f1c27d","#e0ac69","#c9956c","#c68642","#a86b3c","#8d5524","#5c3a1e","#3d2914"],qi=["#2b1d16","#5b3a29","#a0522d","#f4d58d","#ff8fab","#8ecae6","#b388d6","#ff9f43","#1d1416","#c8602a","#7a4b32","#f7f1e8"],Pr=["#5a321c","#3f9b52","#3d7ec4","#c48a3a","#7b4fb8"],lt=["#ff7aa8","#ffd166","#5aa9e6","#80ed99","#c9a0dc","#ff9f68","#ffffff","#5a3d5c","#ff8f7a","#7ec8c3","#f7f3ee","#f4a3c8","#6b8e4e","#e8d5b5","#ef6b6b","#3d4a6b"],Ii=["short","bob","buns","topbun","pixie","long","wavy","puffs","afro","curlybob","coily","boxbraids","braids","sidebraid","crown","pony","sidepony","pigtails","lowbun","locs","halfup","bangs","sidebangs","wavybob"],Oi=["classic","stripes","hoodie","sweater","tank","puff","ruffle","button","jersey","cardigan","bib","raincoat"],Ni=["pants","jeans","shorts","skirt","tutu","leggings","overalls","joggers"],ji=["","twirl","sundress","party","pinafore","jumper","ballet","nightgown","raindress"],Fi=["classic","sneakers","lightup","boots","rainboots","sandals","maryjanes","slippers"],Vi=["round","big","sleepy","sparkle","soft","bright"],vs=["glasses","square","sunnies","bow","bigbow","headband","flower","cap","beanie","sunhat","catears","earmuffs"],Wf=new Set(Ii),Tf=new Set(Oi),Rf=new Set(Ni),Uf=new Set(ji),Ef=new Set(Fi),Qf=new Set(Vi),Af=new Set(vs),zf=new Set(["short","pixie","coily","afro","bangs"]),Df=new Set(["buns","puffs"]),Zf=new Set(["topbun","lowbun"]),qf={hair:"buns",hairC:"#5b3a29",skin:"#f1c27d",eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"pants",bottomC:"#5aa9e6",dress:"",dressC:"#ff7aa8",shoes:"classic",shoesC:"#5a3d5c",accC:"#ffd166"};function If(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function gs(e,t){return typeof e=="string"&&t.has(e)}function Nt(e,t){if(typeof e!="string")return null;const n=e.trim().toLowerCase();for(let s=0;s<t.length;s++)if(t[s]===n)return t[s];return null}function _o(e){if(!If(e))return null;let t=0;try{t=JSON.stringify(e).length}catch{return null}if(t>Pf)return null;const n={v:1};gs(e.hair,Wf)&&(n.hair=e.hair);const s=Nt(e.hairC,qi);s&&(n.hairC=s);const o=Nt(e.skin,Zi);o&&(n.skin=o),gs(e.eyes,Qf)&&(n.eyes=e.eyes);const i=Nt(e.eyeC,Pr);i&&(n.eyeC=i),(e.freckles===!0||e.freckles===!1)&&(n.freckles=e.freckles),(e.blush===!0||e.blush===!1)&&(n.blush=e.blush),gs(e.top,Tf)&&(n.top=e.top);const a=Nt(e.topC,lt);a&&(n.topC=a),gs(e.bottom,Rf)&&(n.bottom=e.bottom);const r=Nt(e.bottomC,lt);r&&(n.bottomC=r),gs(e.dress,Uf)&&(n.dress=e.dress);const l=Nt(e.dressC,lt);l&&(n.dressC=l),gs(e.shoes,Ef)&&(n.shoes=e.shoes);const c=Nt(e.shoesC,lt);if(c&&(n.shoesC=c),Array.isArray(e.acc)){const g=[];for(let f=0;f<e.acc.length&&g.length<2;f++){const p=e.acc[f];typeof p=="string"&&Af.has(p)&&g.indexOf(p)<0&&g.push(p)}n.acc=g}const d=Nt(e.accC,lt);return d&&(n.accC=d),n}function Ps(e){const t=qf,n=e??{};return{v:1,hair:n.hair??t.hair,hairC:n.hairC??t.hairC,skin:n.skin??t.skin,eyes:n.eyes??t.eyes,eyeC:n.eyeC??t.eyeC,freckles:n.freckles??t.freckles,blush:n.blush??t.blush,top:n.top??t.top,topC:n.topC??t.topC,bottom:n.bottom??t.bottom,bottomC:n.bottomC??t.bottomC,dress:n.dress??t.dress,dressC:n.dressC??t.dressC,shoes:n.shoes??t.shoes,shoesC:n.shoesC??t.shoesC,acc:n.acc?n.acc.slice():[],accC:n.accC??t.accC}}function Ql(e){const t=/^#([0-9a-f]{6})$/i.exec(e.trim());if(!t){const s=/^#([0-9a-f]{3})$/i.exec(e.trim());return s?[parseInt(s[1][0]+s[1][0],16),parseInt(s[1][1]+s[1][1],16),parseInt(s[1][2]+s[1][2],16)]:null}const n=parseInt(t[1],16);return[n>>16&255,n>>8&255,n&255]}function Zo(e,t){const n=Nt(e,t);if(n)return n;const s=Ql(e);if(!s)return t[0];let o=t[0],i=1e12;for(let a=0;a<t.length;a++){const r=Ql(t[a]);if(!r)continue;const l=(s[0]-r[0])*(s[0]-r[0])+(s[1]-r[1])*(s[1]-r[1])+(s[2]-r[2])*(s[2]-r[2]);l<i&&(i=l,o=t[a])}return o}function Of(e){return zf.has(e)?0:Df.has(e)?2:Zf.has(e)?3:1}function Nf(e){for(let t=0;t<e.length;t++){const n=e[t];if(n==="glasses"||n==="square"||n==="sunnies")return 2}for(let t=0;t<e.length;t++){const n=e[t];if(n==="cap"||n==="beanie"||n==="sunhat")return 3}for(let t=0;t<e.length;t++){const n=e[t];if(n==="bow"||n==="bigbow")return 1}return 0}function Gi(e){const t=Ps(e),n=t.dress!=="";return{skin:t.skin,hair:t.hairC,hairStyle:Of(t.hair),shirt:n?t.dressC:t.topC,pants:n?t.dressC:t.bottomC,acc:Nf(t.acc)}}const jf=["short","bob","buns","topbun"];function ui(e){const t=typeof e.hairStyle=="number"&&e.hairStyle>=0&&e.hairStyle<=3?Math.round(e.hairStyle):0,n=e.acc===1?["bow"]:e.acc===2?["glasses"]:e.acc===3?["cap"]:[],s=Zo(String(e.shirt??""),lt);return{v:1,hair:jf[t],hairC:Zo(String(e.hair??""),qi),skin:Zo(String(e.skin??""),Zi),eyes:"round",eyeC:"#5a321c",freckles:!1,blush:!0,top:"classic",topC:s,bottom:"pants",bottomC:Zo(String(e.pants??""),lt),dress:"",dressC:s,shoes:"classic",shoesC:"#5a3d5c",acc:n,accC:"#ffd166"}}function po(e){const t=_o(e)??{},n=Ps(t);return{...Gi(n),look2:n}}const Ff=new Set(["glasses","square","sunnies"]),Vf=new Set(["bow","bigbow","flower","headband"]),Gf=new Set(["cap","beanie","sunhat","catears","earmuffs"]);function mi(e){return Ff.has(e)?"face":Vf.has(e)?"bow":Gf.has(e)?"hat":"other"}function Me(e,t){return t[Math.floor(e()*t.length)]}function Yi(e=Math.random){const t=e()<.38,n=e();let s=[];if(n<.22)s=[];else if(n<.68)s=[Me(e,vs)];else{const o=Me(e,vs),i=vs.filter(a=>mi(a)!==mi(o));s=[o,Me(e,i)]}return{v:1,hair:Me(e,Ii),hairC:Me(e,qi),skin:Me(e,Zi),eyes:Me(e,Vi),eyeC:Me(e,Pr),freckles:e()<.4,blush:e()<.85,top:Me(e,Oi),topC:Me(e,lt),bottom:Me(e,Ni),bottomC:Me(e,lt),dress:t?Me(e,ji.filter(o=>o!=="")):"",dressC:Me(e,lt),shoes:Me(e,Fi),shoesC:Me(e,lt),acc:s,accC:Me(e,lt)}}function Yf(e,t=Math.random){const n=e.characters[0];if(!n)return e;const s=Yi(t),o=Gi(s),i=e.characters.slice();return i[0]={...n,...o,look2:s},{...e,characters:i}}function Kf(e){return[e.skin,e.hair,e.hairStyle,e.shirt,e.pants,e.acc,e.look2?JSON.stringify(e.look2):""].join("|")}const Mo=3600,es=470,nn=590,Fn=["goat","sheep","piglet","chicks","bunny","cow"],Xf=[1085,1215,1345,1470,1600,1735],Jf=520,Wr=1900,Tr=[600,800,1e3,1200,1400,1600],Za=435,eh=["Chestnut","Snowy","Midnight","Sunny","Rainbow"],Jc=[2470,2600,2730,2860,2990],ts=540,th=["pet","carrot","apple","hay"],qa=6,nh=e=>3175+e*68,sh=8e4,Ia=20,oh=1500,ed=["egg","carrot","flower"],ih={egg:"ranch-egg",carrot:"ranch-carrot",flower:"ranch-bouquet"},ah=()=>({egg:0,carrot:0,flower:0}),rh=(e,t,n)=>Number.isInteger(e)&&e>=t&&e<=n?e:null;function Rr(e){const t=ah();if(!e||typeof e!="object")return t;for(const n of ed)t[n]=rh(e[n],0,Ia)??0;return t}function Ur(e){const t=Array(qa).fill(null);if(Array.isArray(e))for(let n=0;n<qa;n++){const s=e[n];if(!s||s.seed!=="carrot"&&s.seed!=="flower")continue;const o=Number(s.at),i=Number(s.wet);Number.isFinite(o)&&Number.isFinite(i)&&(t[n]={seed:s.seed,at:o,wet:i})}return t}function Ki(e,t){if(!e||!e.wet)return 0;const n=(t-e.wet)/sh;return n>=1?3:n>=.4?2:1}function Oa(e,t,n,s,o=0){const i=e.slice(),a={...t};switch(n.op){case"plant":return i[n.i]?"taken":(i[n.i]={seed:n.seed,at:s,wet:0},{plots:i,basket:a,garden:!0});case"water":{const r=i[n.i];return r?r.wet?"wet":(i[n.i]={...r,wet:s},{plots:i,basket:a,garden:!0}):"empty"}case"pick":{const r=i[n.i];return r?Ki(r,s)<3?"notReady":a[r.seed]>=Ia?"full":(a[r.seed]++,i[n.i]=null,{plots:i,basket:a,garden:!0,got:r.seed}):"empty"}case"egg":return s-o<oh?"slow":a.egg>=Ia?"full":(a.egg++,{plots:i,basket:a,garden:!1,got:"egg"});case"use":return a.carrot<=0?"none":(a.carrot--,{plots:i,basket:a,garden:!1});case"take":return a[n.kind]<=0?"none":(a[n.kind]--,{plots:i,basket:a,garden:!1})}}const mn=80,lh=30*24*60*60*1e3,ch=5,td=6,ln=["#ffd6e8","#fff3b0","#d8f5e8","#e6d6ff","#d6efff"],dh=/^m[A-Za-z0-9]{4,40}$/,gh=/^[A-Za-z0-9:_\/.-]{1,80}$/;function xa(e,t=Date.now()){const n=Math.floor((t-e)/864e5);return n<=0?"today":n===1?"yesterday":n<7?"a few days ago":"a while ago"}function fh(e,t=Date.now()){const n=e?.letters;if(!Array.isArray(n))return null;const s=[];for(const i of n.slice(-30*2)){if(!i||typeof i!="object")continue;const a=i;if(typeof a.id!="string"||!dh.test(a.id)||typeof a.from!="string")continue;const r=a.from.normalize("NFC").replace(/\s+/g," ").trim();if(!r||r.length>24||typeof a.fromPid!="string"||!gh.test(a.fromPid)||typeof a.text!="string"||a.text.length>mn||typeof a.at!="number"||!Number.isFinite(a.at)||t-a.at>lh||a.at>t+864e5||!Number.isInteger(a.color)||a.color<0||a.color>=ch||!Number.isInteger(a.sticker)||a.sticker<0||a.sticker>=td)continue;const l=a.text.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(l.length>mn)continue;const c={id:a.id,from:r,fromPid:a.fromPid,text:l,color:a.color,sticker:a.sticker,at:a.at};a.read===!0&&(c.read=!0),s.push(c)}const o=s.slice(-30);return o.length?{letters:o}:null}function Er(e){return e?.letters.filter(t=>!t.read&&t.text).length??0}const uo=["living","bedroom","kitchen","salon","nursery","backyard"],nd=["living","bedroom","kitchen","salon","nursery","backyard"],yn=2400,io=600,sd=1e3,Ws=(yn-sd)/2,Ts=8,hh=/^[A-Za-z0-9:_\/.-]{1,80}$/;function Qr(e){const t=e?.dogKennel;if(!t||typeof t!="object"||typeof t.item!="string"||!hh.test(t.item))return null;const n=e.rooms;if(!n)return null;for(const s of Object.values(n))if(s?.items?.some(o=>o&&o.id===t.item&&o.kind==="kennel"))return{item:t.item};return null}function ph(e,t){return Qr({dogKennel:{item:t},rooms:e.rooms})!==null}const D=(e,t,n,s,o=1)=>({id:e+"-"+s,kind:e,x:t+Ws,y:n,flip:!1,z:s,scale:o});function vn(){return{version:3,houseId:"local",currentRoom:"living",rooms:{living:{wallpaper:"#ffd6e0",floor:"#e8b98a",pattern:1,items:[D("sofa",470,470,1),D("lamp",230,470,2),D("plant",760,480,3),D("rug",480,530,0),D("picture",470,200,4),D("cat",600,520,5),D("window",-350,230,6),D("armchair",-300,480,7),D("bookshelf",1250,470,8),D("tree",1500,480,9),D("clock",1100,170,10)]},bedroom:{wallpaper:"#d9ccff",floor:"#f2d0a4",pattern:2,items:[D("bed",450,480,1),D("window",750,230,2),D("teddy",330,500,3),D("stars",300,180,4),D("tub",1350,480,5),D("lamp",-250,470,6),D("flowers",-150,500,7)]},salon:{wallpaper:"#ffe0f0",floor:"#f6d6ff",pattern:2,items:[D("rug",470,540,0),D("mirror",470,150,1),D("vanity",470,480,2),D("perfume",400,345,3),D("polish",450,345,4),D("hairdryer",560,340,5),D("stool",470,545,6),D("lamp",200,470,7),D("flowers",780,480,8),D("picture",780,200,9),D("chair",-250,490,10),D("mirror",-250,170,11),D("plant",1300,480,12)]},kitchen:{wallpaper:"#cdf3dc",floor:"#ffe7a8",pattern:3,items:[D("fridge",200,470,1),D("table",520,500,2),D("cake",520,395,3),D("stove",800,470,4),D("chair",380,500,5),D("chair",660,500,6),D("juice",470,395,7),D("plant",-300,480,8),D("fish",1300,480,9)]},nursery:{wallpaper:"#d6f3ff",floor:"#f3ddc4",pattern:1,items:[D("cloud-rug",480,545,0),D("crib",470,480,1),D("crib-mobile",470,155,2),D("rocker",780,490,3)]},backyard:{wallpaper:"#c5ecff",floor:"#b6e3a8",pattern:0,items:[{id:"yard-bench-1",kind:"yard-bench",x:1122,y:372,flip:!1,z:1,scale:1},{id:"tulip-bed-2",kind:"tulip-bed",x:946,y:580,flip:!1,z:2,scale:1}]}},characters:[Sn({id:"c1",skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6",room:"living",x:330+Ws,y:540})],soundOn:!0,dogKennel:null}}function Sn(e){return{skin:"#f1c27d",hair:"#5b3a29",hairStyle:0,shirt:"#ff7aa8",pants:"#5aa9e6",size:"kid",acc:0,room:"living",x:yn/2,y:540,flip:!1,held:{left:null,right:null},...e}}const Dn=(e,t,n)=>Math.max(t,Math.min(n,e)),As=e=>e.items.reduce((t,n)=>Math.max(t,n.z),0),uh=e=>e.items.reduce((t,n)=>Math.min(t,n.z),0);function qo(e,t,n){return{...e,characters:e.characters.map(s=>s.id===t?n(s):s)}}function De(e,t,n){const s=e.rooms[t];if(!s)return e;const o=n(s);return o===s?e:{...e,rooms:{...e.rooms,[t]:o}}}function mh(e){const t=new Set;let n=!1;const s=e.map(o=>{if(!t.has(o.id))return t.add(o.id),o;n=!0;const i=String(o.id).replace(/-d\d+$/,"").replace(/[^A-Za-z0-9:_/.-]/g,"").slice(0,72)||"item";let a=2,r=(i+"-d"+a).slice(0,80);for(;t.has(r);)a+=1,r=(i+"-d"+a).slice(0,80);return t.add(r),{...o,id:r}});return n?s:e}function yh(e){let t=!1;const n={...e.rooms};for(const s of uo){const o=e.rooms[s];if(!o||!Array.isArray(o.items))continue;const i=mh(o.items);i!==o.items&&(n[s]={...o,items:i},t=!0)}return t?{...e,rooms:n}:e}function od(e){if(!e||!e.rooms)return e;const t=vn().rooms,n=e.rooms;let s=!1;for(const i of uo){const a=n[i];(!a||typeof a!="object"||!Array.isArray(a.items))&&(s=!0)}const o=s?(()=>{const i={...n};for(const a of uo){const r=n[a];(!r||typeof r!="object"||!Array.isArray(r.items))&&(i[a]=t[a])}return{...e,rooms:i}})():e;return yh(o)}function yi(e,t){switch(t.type){case"room/switch":return e.rooms[t.room]?{...e,currentRoom:t.room}:e;case"item/add":return De(e,t.room,n=>n.items.length>=80||n.items.some(s=>s.id===t.item.id)?n:{...n,items:[...n.items,{...t.item,z:As(n)+1}]});case"item/move":return De(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,x:Dn(t.x,0,yn),y:Dn(t.y,40,io)}:s)}));case"item/flip":return De(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,flip:!s.flip}:s)}));case"item/front":return De(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:As(n)+1}:s)}));case"item/back":return De(e,t.room,n=>({...n,items:n.items.map(s=>s.id===t.id?{...s,z:uh(n)-1}:s)}));case"item/delete":{const n=e.rooms[t.room]?.items.some(o=>o.id===t.id&&o.kind==="kennel"),s=De(e,t.room,o=>({...o,items:o.items.filter(i=>i.id!==t.id)}));return n&&e.dogKennel?.item===t.id?{...s,dogKennel:null}:s}case"room/wallpaper":return De(e,t.room,n=>({...n,wallpaper:t.color}));case"room/floor":return De(e,t.room,n=>({...n,floor:t.color}));case"room/pattern":return De(e,t.room,n=>({...n,pattern:t.pattern,wallTile:null}));case"room/wallTile":return De(e,t.room,n=>({...n,wallTile:t.tile}));case"room/floorTile":return De(e,t.room,n=>({...n,floorTile:t.tile}));case"char/add":return e.characters.length>=Ts||e.characters.some(n=>n.id===t.char.id)?e:{...e,characters:[...e.characters,t.char]};case"char/update":return qo(e,t.id,n=>{const{look2:s,...o}=t.patch,i={...n,...o};return"look2"in t.patch&&(s?i.look2=s:delete i.look2),i});case"char/move":return e.rooms[t.room]?qo(e,t.id,n=>({...n,room:t.room,x:Dn(t.x,0,yn),y:Dn(t.y,60,io)})):e;case"char/delete":{const n=e.characters.find(o=>o.id===t.id);if(!n)return e;let s={...e,characters:e.characters.filter(o=>o.id!==t.id)};return["left","right"].forEach((o,i)=>{const a=n.held[o];a&&(s=De(s,n.room,r=>({...r,items:[...r.items,{...a,x:n.x+(i?40:-40),y:n.y,z:As(r)+1}]})))}),s}case"char/hold":{const n=e.characters.find(a=>a.id===t.id),s=e.rooms[t.room]?.items.find(a=>a.id===t.itemId);if(!n||!s||n.held[t.hand]||n.room!==t.room)return e;const o=De(e,t.room,a=>({...a,items:a.items.filter(r=>r.id!==t.itemId)})),i=qo(o,t.id,a=>({...a,held:{...a.held,[t.hand]:s}}));return s.kind==="kennel"&&e.dogKennel?.item===t.itemId?{...i,dogKennel:null}:i}case"char/release":{const n=e.characters.find(i=>i.id===t.id),s=n?.held[t.hand];if(!n||!s)return e;const o=qo(e,t.id,i=>({...i,held:{...i.held,[t.hand]:null}}));return De(o,n.room,i=>({...i,items:[...i.items,{...s,x:Dn(t.x,0,yn),y:Dn(t.y,40,io),z:As(i)+1}]}))}case"cat/set":return{...e,cat:t.cat};case"cat/move":return e.cat&&e.rooms[t.room]?{...e,cat:{...e.cat,room:t.room,x:Dn(t.x,100,yn-100)}}:e;case"dog/set":return{...e,dog:t.dog};case"dog/kennel":return t.item===null?e.dogKennel?{...e,dogKennel:null}:e:!ph(e,t.item)||e.dogKennel?.item===t.item?e:{...e,dogKennel:{item:t.item}};case"ranch/op":{const n=t.op;if(n.op==="take"){const i=e.rooms[n.room];if(i&&i.items.some(a=>a.id===n.id))return e}const s=Oa(Ur(e.garden),Rr(e.basket),t.op,t.now,e.lastEgg??0);if(typeof s=="string")return e;let o={...e,garden:s.plots,basket:s.basket,lastEgg:t.op.op==="egg"?t.now:e.lastEgg};if(t.op.op==="take"&&o.rooms[t.op.room]){const i=t.op;o=De(o,i.room,a=>a.items.length>=80?a:{...a,items:[...a.items,{id:i.id,kind:ih[i.kind],x:i.x,y:560,flip:!1,z:As(a)+1,scale:1}]})}return o}case"settings/sound":return{...e,soundOn:t.on};case"game/reset":return vn()}}const Al=vt("cozy-house"),kh=vt("cozy-house-v1");function Ar(e){if(!e||typeof e!="object"||!e.rooms)return vn();let t=e;if(t.version===1){const c=g=>(Number(g)||0)+Ws,d={};for(const[g,f]of Object.entries(t.rooms))d[g]={...f,items:(f.items??[]).map(p=>({...p,x:c(p.x)}))};t={...t,version:2,rooms:d,character:{...t.character,x:c(t.character?.x)}}}if(t.version===2){const c=t.character??{};t={...t,version:3,characters:[Sn({...c,id:"c1",size:"kid",acc:0,held:{left:null,right:null}})]},delete t.character}if(t.version!==3)return vn();const n=vn(),s=(Array.isArray(t.characters)?t.characters:[]).slice(0,Ts).map((c,d)=>{const g=c?.look2,f=Sn({...c,id:String(c.id??"c"+(d+1)),held:{left:c.held?.left??null,right:c.held?.right??null}});if(delete f.look2,g!=null){const p=_o(g);p&&(f.look2=p)}return f}),o=od({...n,...t,rooms:{...n.rooms,...t.rooms},characters:s}),i=Qr(o),a=i===o.dogKennel?o:{...o,dogKennel:i},r=fh(a.mailbox);let l=a;if(r)l={...l,mailbox:r};else if(l.mailbox){const{mailbox:c,...d}=l;l=d}return bh(l)}function bh(e){const t=e.currentRoom,n=nd.includes(t),s=a=>uo.includes(a);let o=!1;const i=e.characters.map(a=>{const r=a.room;return!s(r)||!n&&r===t?(o=!0,{...a,room:"living"}):a});return n&&!o?e:{...e,currentRoom:n?e.currentRoom:"living",characters:i}}function id(){let e;try{const s=localStorage.getItem(Al)??localStorage.getItem(kh);e=s?Ar(JSON.parse(s)):vn(),!s&&typeof navigator<"u"&&!navigator.webdriver&&(e=Yf(e))}catch{e=vn()}const t=[];let n;return{get:()=>e,subscribe(s){t.push(s)},dispatch(s){e=yi(e,s),t.forEach(o=>o(e,s)),clearTimeout(n),n=window.setTimeout(()=>{try{localStorage.setItem(Al,JSON.stringify(e))}catch{}},250)}}}const vh=Object.freeze(Object.defineProperty({__proto__:null,MAX_CHARS:Ts,ROOM_H:io,ROOM_IDS:uo,ROOM_W:yn,SCENE_ROOMS:nd,V1_OFFSET:Ws,V1_ROOM_W:sd,createStore:id,ensureRooms:od,initialState:vn,migrate:Ar,newCharacter:Sn,reduce:yi,validKennel:Qr},Symbol.toStringTag,{value:"Module"}));function Na(e,t){for(let n=e.length-1;n>0;n--){const s=Math.floor(t()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}const ad=4,zl=7,wh=30;function $h(){const e=[];let t=0;for(let n=0;n<ad;n++){e.push({id:t++,c:n,v:0});for(let s=1;s<=9;s++)for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s});for(const s of["skip","rev","d2"])for(let o=0;o<2;o++)e.push({id:t++,c:n,v:s})}for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"wild"});for(let n=0;n<4;n++)e.push({id:t++,c:4,v:"w4"});return e}const ja=e=>e.discard[e.discard.length-1],zs=(e,t)=>t.c===4||t.c===e.color||t.v===ja(e).v&&ja(e).c!==4,cn=(e,t,n=1)=>{const s=e.hands.length;return((t+e.dir*n)%s+s)%s};function Fa(e,t,n,s){const o=[];for(let i=0;i<n&&e.hands[t].length<wh;i++){if(!e.deck.length){const r=e.discard.pop();if(e.deck=Na(e.discard.map(l=>l),s),e.discard=[r],!e.deck.length)break}const a=e.deck.pop();e.hands[t].push(a),o.push(a)}return e.hands[t].length>1&&(e.slay[t]=!1),o}function xh(e,t){if(e.owe!==null&&e.hands[e.owe]?.length===1&&!e.slay[e.owe]){const n=e.owe;return e.owe=null,{victim:n,vdrew:Fa(e,n,2,t).length}}return e.owe=null,{}}const Dl=e=>{const t=[0,0,0,0];return e.forEach(n=>{n.c<4&&t[n.c]++}),t.indexOf(Math.max(...t))},_h={id:"slay",name:"Slay",minPlayers:2,maxPlayers:6,setup(e,t){const n=Na($h(),t),s=Array.from({length:e},()=>n.splice(-zl,zl));let o=n.length-1;for(;typeof n[o].v!="number";)o--;const i=n.splice(o,1)[0];return{deck:n,discard:[i],hands:s,color:i.c,turn:Math.floor(t()*e),dir:1,drawn:null,slay:s.map(()=>!1),owe:null,winner:null,ev:{n:0,p:-1,k:"start",card:i}}},cleanMove(e){return!e||typeof e!="object"?null:e.k==="play"&&Number.isInteger(e.id)&&e.id>=0&&e.id<108?{k:"play",id:e.id,...Number.isInteger(e.color)&&e.color>=0&&e.color<ad?{color:e.color}:{}}:e.k==="draw"||e.k==="pass"||e.k==="slay"?{k:e.k}:null},legal(e,t,n){if(e.winner!==null)return!1;if(n.k==="slay")return e.hands[t].length<=2&&!e.slay[t];if(t!==e.turn)return!1;if(n.k==="draw")return e.drawn===null;if(n.k==="pass")return e.drawn!==null;const s=e.hands[t].find(o=>o.id===n.id);return!s||e.drawn!==null&&s.id!==e.drawn||s.c===4&&n.color===void 0?!1:zs(e,s)},apply(e,t,n,s){const o=e.ev.n+1;if(n.k==="slay")return e.slay[t]=!0,e.owe===t&&(e.owe=null),e.ev={n:o,p:t,k:"slay"},e;const i=xh(e,s);if(n.k==="draw"){const d=Fa(e,t,1,s),g=d[0];if(g&&zs(e,g))e.drawn=g.id,e.ev={n:o,p:t,k:"draw",drew:1,...i};else{if(e.drawn=null,e.ev={n:o,p:t,k:"draw",drew:d.length,...i},e.stuck=d.length?0:(e.stuck??0)+1,(e.stuck??0)>=e.hands.length){const f=Math.min(...e.hands.map(p=>p.length));return e.winner=e.hands.findIndex(p=>p.length===f),e.turn=-1,e}e.turn=cn(e,t)}return e}if(n.k==="pass")return e.drawn=null,e.turn=cn(e,t),e.ev={n:o,p:t,k:"pass",...i},e;e.stuck=0;const a=e.hands[t],r=a.splice(a.findIndex(d=>d.id===n.id),1)[0];e.discard.push(r),e.drawn=null,e.color=r.c===4?n.color:r.c;const l={n:o,p:t,k:"play",card:r,color:e.color,...i};if(!a.length)return e.winner=t,e.turn=-1,e.ev=l,e;a.length===1&&!e.slay[t]&&(e.owe=t);const c=e.hands.length===2;if(r.v==="rev")e.dir=e.dir===1?-1:1,e.turn=c?t:cn(e,t);else if(r.v==="skip")l.skipped=cn(e,t),e.turn=cn(e,t,2);else if(r.v==="d2"||r.v==="w4"){const d=cn(e,t);l.skipped=d;const g=r.v==="d2"?2:4;l.drew=Fa(e,d,g,s).length,e.turn=cn(e,t,2)}else e.turn=cn(e,t);return e.ev=l,e},turn:e=>e.winner!==null?-1:e.turn,winner:e=>e.winner,view(e,t){return{top:ja(e),color:e.color,turn:e.winner!==null?-1:e.turn,dir:e.dir,deck:e.deck.length,counts:e.hands.map(n=>n.length),slay:e.slay,winner:e.winner,ev:e.ev,...t!==null&&e.hands[t]?{hand:e.hands[t],drawn:t===e.turn?e.drawn:null}:{}}},autoMove(e,t){if(t!==e.turn)return null;if(e.drawn!==null){const s=e.hands[t].find(o=>o.id===e.drawn);return s&&zs(e,s)?{k:"play",id:s.id,...s.c===4?{color:Dl(e.hands[t])}:{}}:{k:"pass"}}const n=e.hands[t].find(s=>zs(e,s)&&s.c!==4)??e.hands[t].find(s=>zs(e,s));return n?{k:"play",id:n.id,...n.c===4?{color:Dl(e.hands[t])}:{}}:{k:"draw"}},removePlayer(e,t,n){if(e.hands.length<=2)return null;const s=e.turn===t;return e.deck.unshift(...e.hands[t]),Na(e.deck,n),e.hands.splice(t,1),e.slay.splice(t,1),e.owe===t?e.owe=null:e.owe!==null&&e.owe>t&&e.owe--,e.turn>t&&e.turn--,s&&(e.drawn=null,e.dir===-1?e.turn=((t-1)%e.hands.length+e.hands.length)%e.hands.length:e.turn=t%e.hands.length),e.ev={n:e.ev.n+1,p:t,k:"left"},e}},Va=7,si=6,Mh=(e,t,n)=>{const s=e[t][n];for(const[o,i]of[[1,0],[0,1],[1,1],[1,-1]]){const a=[[t,n]];for(const r of[1,-1])for(let l=1;l<4;l++){const c=t+o*l*r,d=n+i*l*r;if(c<0||c>=Va||d<0||d>=si||e[c][d]!==s)break;a.push([c,d])}if(a.length>=4)return a}return null},Lh={id:"four",name:"Four in a Row",minPlayers:2,maxPlayers:2,setup:(e,t)=>({b:Array.from({length:Va},()=>[]),turn:t()<.5?0:1,winner:null,draw:!1,line:null,last:null,n:0}),cleanMove:e=>e&&Number.isInteger(e.col)&&e.col>=0&&e.col<Va?{col:e.col}:null,legal:(e,t,n)=>e.winner===null&&!e.draw&&t===e.turn&&e.b[n.col].length<si,apply(e,t,n){e.b[n.col].push(t);const s=e.b[n.col].length-1;e.last={col:n.col,row:s,p:t},e.n++;const o=Mh(e.b,n.col,s);return o?(e.winner=t,e.line=o,e.turn=-1):e.b.every(i=>i.length>=si)?(e.draw=!0,e.turn=-1):e.turn=1-t,e},turn:e=>e.turn,winner:e=>e.winner,view:e=>e,autoMove:(e,t)=>{if(t!==e.turn)return null;const s=[3,2,4,1,5,0,6].find(o=>e.b[o].length<si);return s===void 0?null:{col:s}},removePlayer:()=>null},rd={slay:_h,four:Lh},Xi=2600,mo=[{game:"slay",seats:6,x:720},{game:"four",seats:2,x:1500},{game:"slay",seats:4,x:2150}],Ch=2e4,Sh=["A-Frame Swing","Acorn Friend","Alarm Clock","Apple","Apple Tree","Arc Floor Lamp","Arc Lamp","Arched Mirror","Arched Shelf","Armchair","Autumn Wreath","Baby Blocks","Baby Bottle","Bakery Shelf","Ball","Balloons","Bananas","Bar Stool","Bassinet","Bathtub","Beach Ball","Bean Bag","Bed","Big Leaf Plant","Big Monitor","Big Wardrobe","Birdbath","Birdhouse","Birdie","Blanket Basket","Blocks","Boba Buddy","Book Stack","Books","Bookshelf","Box Stack","Bread","Brush & Comb","Bubble Aquarium","Bubble Bath","Bubble Chair","Bubble-Gum Rug","Bubbly Fountain","Bubbly Plant","Bud Vase","Bulletin Board","Bunk Bed","Bunny","Bunny Plush","Bunny Slippers","Butterfly Bush","Cactus","Cactus Buddy","Cada's Mouse","Cake","Candle Jar","Canopy Bed","Canopy Daybed","Cat Bed","Cat Tower","Caterpillar Plush","Chair","Changing Table","Checker Rug","Checkered Bed","Chick","Chloe's Star Lamp","Clock","Clothes Rail","Clothesline","Cloud Beanbag","Cloud Lamp","Cloud Rug","Cloud Shelf","Cocoa Doll","Cocoa Mug","Coffee Table","Comfy Chair","Cookie Jar","Cooking Pot","Cottage Heart Pouf","Cottage Heart Rug","Counter","Cozy Fireplace","Cozy Lights","Cozy Mug","Cozy Nightstand","Cozy Reading Nook","Cozy Snake Plant","Cozy Teapot","Cream Jars","Cream Sofa","Crib","Crib Mobile","Cubby Shelf","Cube Shelf","Cupcake","Cupcake Stand","Curtains","Curvy Yellow Desk","Cute Keyboard","Cute Speaker","Daisy Pot","Daisy Rug","Desk","Desk Lamp","Desk Mic","Dino Plushie","Dish Cabinet","Dish Rack","Dog Kennel","Doll House","Donut","Dresser","Droplet Buddy","Egg Pan","Fairy-Light Garland","Fairy-Light Shelf","Fan","Fancy Sofa","Fiddle-Leaf Fig","Fig Tree","Fire Pit","Fireplace","Fish Bowl","Fish Tank","Flower Cart","Flower Floor Lamp","Flower Kettle","Flower Lamp","Flowers","Foot Spa","Fresh Egg","Fridge","Frog Plush","Fruit Bowl","Game Controller","Gaming Chair","Garden Bench","Garden Carrot","Garden Gnome","Glass Cabinet","Globe","Globe Pendants","Glossy Hair Dryer","Glow Mirror","Gold Floor Mirror","Guinea Pig","Hair Dryer","Hair-Dryer Chair","Hair-Wash Chair","Hammock","Hamster House","Hamster Pal","Hanging Lamp","Hanging Lantern","Hanging Plant","Hanging Vine Planter","Happy Fridge","Headphones","Heart Headboard Bed","Heart Pouf","Heart Rug","Heart Wall Clock","Heart Wall Light","Heart-Leaf Plant","Hedge Row","Herb Box","High Chair","Honey Doll","Ice Cream","Jewelry Box","Juice","Kettle","Kitchen Counter","Knit Cushion","Ladder Shelf","Lamp","Landscape Art","Lattice Bench","Lava Lamp","Lemon Tree","Lemonade Cart","Lemonade Cup","Lighted Vanity","Lilac Curtain","Lily Pond","Little Rocking Horse","Little Slide","Little Sprout","Lotion Bottles","Macaron Jar","Macrame Swing Chair","Mani-Pedi Chair","Manicure Table","Microwave","Milk","Milk & Cookies","Mini Fridge","Mini Greenhouse","Mini Tree","Mint Fridge","Mint Pebble Rug","Mirror","Mixer","Moon and Stars","Moon Night-Light","Moving Box","Mushroom Stool","Music Box","Nail Dryer","Nail Polish","Nail Polish Rack","Night Light","Nightstand","Nursery Cloud Rug","Nursery Dresser","Nursery Lamp","Pancakes","Pantry","Paper Lantern","Pastel Range","Pastel Wardrobe","Patio Lights","Patio Umbrella","Pendant Lamp","Perfume","Perfume Bottle","Perfume Tray","Pet Bowl","Petal Coffee Table","Phone on a Stand","Piano","Picket Gate","Picnic Basket","Picnic Blanket","Picnic Table","Picture","Piggy Bank","Pillow","Pin Board","Pink Vanity","Pinwheel","Pizza","Plant","Plant Stand","Plant Wall","Play Mat","Play Tent","Polish Bottle","Popcorn","Pothos Plant","Pouf","Puffy Cloud Sofa","Puffy Stool","Puppy","Quinn's Cookie Pup","Radio","Rain Barrel","Rainbow Art","Rainbow Rug","Ranch Flowers","Rattle","Reagan's Frame","Reception Desk","Record Player","Ribbon Mirror","Rice Cooker","Ring Light","Robot","Rocker","Rocking Chair","Rocking Horse","Rose Doll","Round Breakfast Table","Round Side Table","Round Woven Rug","Rug","Runner Rug","Salon Chair","Sandbox","Scallop Curtains","Scalloped Loveseat","Seesaw","Shelf","Sink","Sloane's Rainbow Snail","Snake Plant","Sofa","Sparkle Wall Light","Spice Rack","Splash Pool","Spray Bottle","Sprinkler","Stacking Rings","Star Dresser","Star Lamp","Star Mobile","Stars","Stepping Stones","Sticker Board","Stove","String Lights","Striped Runner","Succulents","Sun Lounger","Sunny Art","Sunny Bean Bag","Sunny Cloud Rug","Sunny Shelf","Swing Chair","Swivel Stool","Table","Tassel Rug","Teapot","Teapot Set","Teddy","Tiered Tray","Toadstool Light","Toaster","Towel Cart","Towel Stack","Toy Bin","Toy Car","Toy cat","Toy Chest","Toy Train","Trailing Plant Shelf","Tulip Bed","Tulip Vase","Turtle","TV","TV Stand","Unicorn Plushie","Utensil Rail","Vanity","Vanity Stool","Vegetable Patch","Vlog Camera","Wagon","Waiting Bench","Wall Shelf","Wardrobe","Water-Drop Lamp","Watermelon","Wavy Floor Lamp","Window","Window Seat","Wood Armchair","Wood Bookshelf","Wood Coffee Table","Wood Desk","Wood Dresser","Wood Stool","Wood Wall Clock","Wooden Bed","Yard Sign"],Bh=4,zr=16,ki=e=>String(e??"").toUpperCase().replace(/[^A-Z0-9]/g,""),Hh=e=>e.length>=Bh&&e.length<=zr&&/^[A-Z0-9]+$/.test(e),Ph=12,Wh=["Cada","Chloe","Quinn","Reagan","Sloane"],Th=460,Rh=320,Zl=["Sunny Bunny","Bubbly Panda","Sparkle Kitty","Happy Hippo","Cozy Koala","Jolly Jelly","Zippy Fox","Dreamy Deer","Giggly Goose","Peachy Pup","Minty Mouse","Rainbow Duck","Cuddly Cub","Starry Owl","Bouncy Frog","Lucky Lamb","Snuggly Seal","Twinkle Tiger","Berry Bear","Cloudy Llama","Pebble Penguin","Honey Hedgehog","Marshmallow Moose","Cupcake Cat"],ao=["Hi!","Come over!","I love your house!","Let's play!","Follow me!","Look at this!","Want a snack?","Nice!","Yes!","No thanks","Hehe","Be right back","Bye!","Let's decorate!","Wanna race?","So cute!"],ld=["👋","😀","😂","😍","😮","😢","🎉","⭐","❤️","👍","🍕","🐱","🌈","🎶","💤","✨"],Dr=60,Uh={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t","@":"a",$:"s","!":"i","+":"t"},_a=["fuck","fuk","fck","shit","sht","bitch","btch","bastard","asshole","ass","dick","cock","pussy","cunt","whore","slut","damn","crap","piss","fag","faggot","retard","nigger","nigga","porn","sex","sexy","nude","naked","boob","boobs","penis","vagina","kill","suicide","stupid","idiot","dumb","hate","loser","shutup","wtf","stfu","gtfo","bs"],Eh=["zero","oh","one","two","three","four","five","six","seven","eight","nine","ten"],Qh=[/\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i,/\bi\s*live\s+(at|on|in)\b/i,/\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,/\b(password|passcode|zip\s*code|postcode)\b/i,/\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i],Ah=/(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i,zh=/\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i,Dh=/@\w/,Zh=/\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;function qh(e,t=Dr){if(typeof e!="string")return{ok:!1,reason:"empty"};const n=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();if(!n)return{ok:!1,reason:"empty"};if(n.length>t)return{ok:!1,reason:"long"};if(Ah.test(n))return{ok:!1,reason:"link"};if(zh.test(n)||Dh.test(n))return{ok:!1,reason:"contact"};if((n.match(/\d/g)??[]).length>=5||/\d[\d\s().\-]{4,}\d/.test(n)||Zh.test(n))return{ok:!1,reason:"contact"};const o=n.toLowerCase().split(/[^a-z]+/).filter(Boolean);let i=0;for(const c of o)if(i=Eh.includes(c)?i+1:0,i>=4)return{ok:!1,reason:"contact"};if(Qh.some(c=>c.test(n)))return{ok:!1,reason:"personal"};const a=n.toLowerCase().replace(/[0-9@$!+]/g,c=>Uh[c]??c),r=a.split(/[^a-z]+/).filter(Boolean),l=a.replace(/[^a-z]/g,"").replace(/(.)\1{2,}/g,"$1$1");return r.some(c=>_a.includes(c)||_a.includes(c.replace(/(.)\1+/g,"$1")))||_a.filter(c=>c.length>=5).some(c=>l.includes(c))?{ok:!1,reason:"words"}:{ok:!0,text:n}}const Ih={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t",8:"b","@":"a",$:"s","!":"i","+":"t",v:"u","|":"k","<":"k","#":"h"};function Oh(e){return/^f+u+c+k+$/.test(e)||/^f+u+k+$/.test(e)||/^f+c+k+$/.test(e)||/^s+h+i+t+$/.test(e)||/^s+h+t+$/.test(e)||/^b+i+t+c+h+$/.test(e)||/^b+t+c+h+$/.test(e)||/^a+s+h+o+l+e+$/.test(e)||/^d+u+m+b+a+s+$/.test(e)||/^n+i+g{2,}e+r+$/.test(e)||/^n+i+g{2,}a+$/.test(e)||/^f+a+g+$/.test(e)||/^f+a+g+o+t+$/.test(e)||/^r+e+t+a+r+d+$/.test(e)||/^k+y+s+$/.test(e)}function Nh(e){return/^c+u+n+t+$/.test(e)||/^a+h+o+l+e+$/.test(e)||/^k+i+k+e+$/.test(e)||/^c+h+i+n+k+$/.test(e)||/^s+p+i+c+$/.test(e)||/^c+o{2,}n+$/.test(e)||/^w+e+t+b+a+c+k+$/.test(e)||/^t+r+a+n+y+$/.test(e)||/^t+r+a+n+i+$/.test(e)||/^d+y+k+e+$/.test(e)||/^b+e+a+n+e+r+$/.test(e)||/^g+o{2,}k+$/.test(e)||/^r+a+g+h+e+a+d+$/.test(e)||/^t+o+w+e+l+h+e+a+d+$/.test(e)||/^h+e+i+l+h+i+t+l+e+r+$/.test(e)}const jh=new Set(["spicy","spices","spicing","spicey","spicier","spiciest","cocky","chinking","spicer","gooky","slutty","twatt"]);function Fh(e,t){if(!/^[a-z]+$/.test(e)||t&&jh.has(e))return!1;const n=[e],s=["ing","in","ers","er","ed","es","y","s"];for(let o=0;o<s.length;o++){const i=s[o];e.endsWith(i)&&e.length>i.length+2&&n.push(e.slice(0,-i.length))}for(let o=0;o<n.length;o++)if(Oh(n[o])||t&&Nh(n[o]))return!0;return!1}function Vh(e){if(!e.includes("*"))return[e];const t=e.split("*").length-1,n=e.replace(/\*/g,""),s=n?[n]:[];if(t<1||t>3)return s;const o=e.split(""),i=[];for(let r=0;r<o.length;r++)o[r]==="*"&&i.push(r);const a=r=>{if(r===i.length){s.push(o.join(""));return}for(let l=97;l<=122;l++)o[i[r]]=String.fromCharCode(l),a(r+1)};return a(0),s}const ql=["mother","sonofa","horse","bull","dip"],Il=["face","head","you"];function ws(e,t){const n=e.replace(/ph(?=u+c+k)/g,"f").replace(/ph(?=u+k)/g,"f");if(Fh(n,t)||/^w+t+f+$/.test(n)||/^s+t+f+u+$/.test(n))return!0;for(let s=0;s<ql.length;s++){const o=ql[s];if(n.startsWith(o)&&n.length>o.length+2&&ws(n.slice(o.length),t))return!0}for(let s=0;s<Il.length;s++){const o=Gh(n,Il[s]);if(o&&ws(o,t))return!0}return!!(n.length>4&&n.endsWith("s")&&!n.endsWith("ss")&&ws(n.slice(0,-1),t))}function Gh(e,t){let n=e.length;for(let s=t.length-1;s>=0;s--){const o=t[s];if(n===0||e[n-1]!==o)return null;for(;n>0&&e[n-1]===o;)n--}return n<=2?null:e.slice(0,n)}function bi(e){let t="";for(let n=0;n<e.length;n++)t+=Ih[e[n]]??e[n];return t}const Yh={ѕ:"s",һ:"h",с:"c",а:"a",е:"e",о:"o",р:"p",і:"i",х:"x",у:"y",к:"k"};function Kh(e){const n=e.replace(/[\u00ad\u0336\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").normalize("NFKC").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase();let s="";for(let o=0;o<n.length;o++)s+=Yh[n[o]]??n[o];return s}const Xh=new Set(["it","its","it's","is","as","a","i","uh","oh","so","he","she","hi","um","umm","hmm","hm","ah","eh","er","ow","ha","hey","yo","ok","yeah","yes","no","nah","wow","ho","ooh","ahh","uhh","ohh"]);function yo(e){return e>="a"&&e<="z"||e>="0"&&e<="9"||"@$!+*v|#<".includes(e)}function Ol(e,t){let n=t;for(;n<e.length&&e[n]==="!";)n++;if(n>=e.length||!yo(e[n])||e[n]==="!")return null;const s=e[n];let o=n+1;for(;o<e.length&&e[o]==="!";)o++;return o<e.length&&yo(e[o])?null:{ch:s,end:o}}function Jh(e,t){const n=e.length,s=" .-_~";let o=0;for(;o<n;){if(o>0&&yo(e[o-1])){o++;continue}const i=Ol(e,o);if(!i){o++;continue}const a=[i.ch];let r=i.end;for(;r<n&&s.includes(e[r]);){const l=Ol(e,r+1);if(!l)break;a.push(l.ch),r=l.end}if(a.length>=2){const l=bi(a.join("")).replace(/\*/g,"");if(ws(l,t))return!0}o=Math.max(o+1,r)}return!1}function ns(e){return e.replace(/^!+/,"").replace(/!+$/,"")}function vi(e){return bi(ns(e)).replace(/\*/g,"")}function cd(e){return/[0-9@$!+*|#<]/.test(ns(e))}function ep(e){return ns(e).length===1}function tp(e){const t=ns(e);return t.length<2||cd(e)?!1:/^sh+$/.test(t)||Xh.has(t)}function np(e){let t="space";for(let n=0;n<e.length;n++){const s=e[n];if(!(s===" "||s==="	"||s===`
`||s==="\r")){if(s==="-"){t="hyphen";continue}return"punct"}}return t}function sp(e){const t=[];let n=0,s="";for(;n<e.length;){if(!yo(e[n])){s+=e[n],n++;continue}let o=n+1;for(;o<e.length&&yo(e[o]);)o++;t.push({text:e.slice(n,o),gap:t.length===0?"start":np(s)}),s="",n=o}return t}function op(e){const t=[bi(e)];if(e.charAt(0)==="!"||e.charAt(e.length-1)==="!"){const n=e.replace(/^!+/,"").replace(/!+$/,"");n&&n!==e&&t.push(bi(n))}return t}function ip(e){for(let t=0;t<e.length;t++){if(!/^k+i+l+$/.test(e[t]))continue;const n=e[t+1]||"",s=e[t+2]||"";if(/^y+o+u+r+s+e+l+f+$/.test(n)||/^u+r+s+e+l+f+$/.test(n)||/^u+r+$/.test(n)&&/^s+e+l+f+$/.test(s))return!0}return!1}function ap(e,t,n){if(ns(e[n].text)!=="coon")return!1;const s=n>0?t[n-1]:"",o=t[n+1]||"";return s==="maine"||o==="cat"}function rp(e,t,n){return n===t+1&&e[n].gap==="space"&&/^a+$/.test(vi(e[t].text))&&/^h+o+l+e+$/.test(vi(e[n].text))}function lp(e,t,n){return ns(e[n].text)!=="dyke"?!1:n>0&&ns(e[n-1].text)==="van"}function cp(e){for(let t=0;t<e.length-1;t++)if(/^h+e+i+l+$/.test(e[t])&&/^h+i+t+l+e+r+$/.test(e[t+1]))return!0;return!1}function dp(e,t=!0){const n=Kh(e);if(Jh(n,t))return!0;const s=sp(n),o=s.map(a=>op(a.text)),i=s.map(a=>vi(a.text));if(ip(i)||t&&cp(i))return!0;for(let a=0;a<o.length;a++)if(!(t&&(ap(s,i,a)||lp(s,i,a))))for(let r=0;r<o[a].length;r++){const l=Vh(o[a][r]);for(let c=0;c<l.length;c++)if(ws(l[c].replace(/\*/g,""),t))return!0}for(let a=0;a<s.length;a++){let r="",l=0,c=!1,d=!1;for(let g=a;g<s.length&&g<a+8;g++){if(g>a){const f=s[g].gap,p=s[g-1].text;if(f==="punct"||f==="start"||p.endsWith("!")||s[g].text.startsWith("!")||f!=="space"&&f!=="hyphen")break}if(r+=vi(s[g].text),ep(s[g].text)&&l++,tp(s[g].text)&&(c=!0),cd(s[g].text)&&(d=!0),g!==a&&!(c&&l<2&&!d)&&ws(r,t)){if(t&&rp(s,a,g))break;return!0}}}return!1}function dd(e,t,n,s=!1){if(typeof e!="string")return{ok:!1,reason:"empty"};const o=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return o?o.length>t?{ok:!1,reason:"long"}:dp(o,!s)?{ok:!1,reason:n}:{ok:!0,text:o}:{ok:!1,reason:"empty"}}function gp(e,t=Dr){return dd(e,t,"words")}const Ji={long:"That is a bit long!",link:"No links, please!",contact:"Keep numbers and contact info secret!",personal:"Keep personal info secret!",words:"Let's use kind words!",mail:"Oops, try different words!",empty:""},gd={};for(const e of["АA","аa","ВB","вb","ЕE","еe","КK","кk","МM","мm","НH","нh","ОO","оo","РP","рp","СC","сc","ТT","тt","УY","уy","ХX","хx","ІI","іi","ЈJ","јj","ЅS","ѕs","ЁE","ёe","ЇI","їi","ΑA","ΕE","ΖZ","ΗH","ΙI","ΚK","ΜM","ΝN","ΟO","ΡP","ΤT","ΥY","ΧX","αa","εe","ζz","ιi","κk","νv","οo","ρp","τt","υu","χx"])gd[e[0]]=e[1];function fp(e){let t="";for(const n of e)t+=gd[n]??n;return t}function hp(e){return fp(String(e).normalize("NFKC")).replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\p{M}]/gu,"").replace(/[\p{Extended_Pictographic}\p{S}\p{P}]+/gu,"").replace(/\s+/g," ").trim()}function pp(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(()=>{const e=[...new Set(Sh.map(t=>hp(t)).filter(t=>t.length>=2))].sort((t,n)=>n.length-t.length);return new RegExp(`(^|[^A-Za-z])(?:${e.map(pp).join("|")})(?![A-Za-z])`,"gi")})();const Nl=(e,t,n)=>typeof e=="number"&&Number.isFinite(e)?Math.max(t,Math.min(n,e)):null,up=(e,t,n=80)=>typeof e=="string"&&e.length<=n&&t.test(e)?e:null,mp=/^#[0-9a-fA-F]{3,8}$/,yp=["little","kid","adult"];function kp(e){if(!e||typeof e!="object")return null;const t={};for(const n of["skin","hair","shirt","pants"])if(n in e){const s=up(e[n],mp,9);if(!s)return null;t[n]=s}if("hairStyle"in e){const n=Nl(e.hairStyle,0,3);if(n===null)return null;t.hairStyle=Math.round(n)}if("acc"in e){const n=Nl(e.acc,0,3);if(n===null)return null;t.acc=Math.round(n)}if("size"in e){if(!yp.includes(e.size))return null;t.size=e.size}if("flip"in e){if(typeof e.flip!="boolean")return null;t.flip=e.flip}return"look2"in e&&(t.look2=_o(e.look2)??null),Object.keys(t).length?t:null}function Lo(e){const t=Sn({id:"x"}),n=kp({skin:e?.skin,hair:e?.hair,hairStyle:e?.hairStyle,shirt:e?.shirt,pants:e?.pants,size:e?.size,acc:e?.acc})??{},s=i=>n[i]??t[i],o={skin:s("skin"),hair:s("hair"),hairStyle:s("hairStyle"),shirt:s("shirt"),pants:s("pants"),size:s("size"),acc:s("acc")};if(e&&typeof e=="object"&&"look2"in e){const i=_o(e.look2);i&&(o.look2=i)}return o}const jl=4,bp=["Mittens","Luna","Biscuit","Pumpkin","Whiskers","Mochi","Pepper","Noodle","Ginger","Socks"],vp=["Buddy","Coco","Max","Daisy","Peanut","Rocket","Bella","Waffles","Scout","Honey"];function wp(e){const t=String(e??"").normalize("NFC").replace(/\s+/g," ").trim();return!/^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u.test(t)||(t.match(/\d/g)??[]).length>2?null:qh(t).ok?t:null}function $p(e,t=[]){return dd(e,mn,"mail")}function fd(e){return typeof e.freeMail=="boolean"?e.freeMail:e.freeChat}const Zr=2900,Ga=[{kind:"swing",x:430,y:500},{kind:"swing",x:570,y:500},{kind:"blanket",x:1730,y:548},{kind:"blanket",x:1850,y:548},{kind:"bench",x:2025,y:512},{kind:"bench",x:2105,y:512},{kind:"bench",x:2225,y:512},{kind:"bench",x:2305,y:512}],te={top:{x:905,y:330},bottom:{x:1110,y:545},ladder:850},Ee={x0:2440,x1:2840,y0:470,y1:585},xp=(e,t)=>e.where===t.where&&(e.where!=="house"||e.houseId===t.houseId&&e.room===t.room),_p=(e,t)=>xp(e,t)&&Math.abs(e.x-t.x)<=Th&&Math.abs(e.y-t.y)<=Rh;function Io(e){try{return Ar(e)}catch{return e}}const Ya=vt("cozy-hood"),Ls=()=>{try{return JSON.parse(localStorage.getItem(Ya)??"null")}catch{return null}},Kt=e=>{e?localStorage.setItem(Ya,JSON.stringify(e)):localStorage.removeItem(Ya)};function ea(){const e=new URLSearchParams(location.search).get("hood");return e?e.replace(/\/$/,""):"https://cozy-hood.andrewmunruh.workers.dev".replace(/\/$/,"")}async function Mp(e){const t=await fetch(e+"/api/create",{method:"POST"});if(!t.ok)throw new Error("create failed "+t.status);return t.json()}async function Lp(e,t){const n=await fetch(`${e}/api/hood/${encodeURIComponent(t)}`);if(n.status===429)return{slow:!0};if(!n.ok)throw new Error("lookup failed");return n.json()}const Fl=e=>e.type==="item/move"?"im:"+e.id:e.type==="char/move"?"cm:"+e.id:null;class ta{constructor(t){this.cfg=t,this.ws=null,this.pid="",this.settings={freeChat:!0},this.players=new Map,this.houses=new Map,this.presence=new Map,this.status="offline",this.replaced=!1,this.ranch={plots:[],skew:0},this.tables=new Map,this.handlers=new Map,this.cid=1,this.flushT=0,this.presT=0,this.lastPres=null,this.presDirty=!1,this.closedByUs=!1,this.retry=0,this.retryT=0,this.epoch=0,this.stableT=0,this.outbox=[]}on(t,n){(this.handlers.get(t)??this.handlers.set(t,[]).get(t)).push(n)}emit(t,...n){this.handlers.get(t)?.forEach(s=>s(...n))}send(t){return this.ws?.readyState!==WebSocket.OPEN?!1:(this.ws.send(JSON.stringify(t)),!0)}reliable(t){this.send(t)||(t.t==="lock"?this.outbox=this.outbox.filter(n=>!(n.t==="lock"&&n.houseId===t.houseId)):(t.t==="look"||t.t==="dog")&&(this.outbox=this.outbox.filter(n=>n.t!==t.t)),this.outbox.push(t),this.outbox.length>8&&this.outbox.splice(0,this.outbox.length-8))}flushOutbox(){if(this.ws?.readyState!==WebSocket.OPEN||!this.outbox.length)return;const t=this.outbox;this.outbox=[];for(const n of t)this.send(n)||this.outbox.push(n)}scheduleRetry(){if(this.closedByUs||this.replaced||!this.cfg.token||this.retryT)return;const t=this.epoch,n=Math.min(15e3,400*2**Math.min(this.retry,6));this.retry++,this.retryT=window.setTimeout(()=>{this.retryT=0,!(t!==this.epoch||this.closedByUs||this.replaced||!this.cfg.token)&&this.connect()},n)}armStable(){this.stableT&&clearTimeout(this.stableT),this.stableT=window.setTimeout(()=>{this.stableT=0,this.retry=0},1e4)}clearStable(){this.stableT&&(clearTimeout(this.stableT),this.stableT=0)}connect(t){this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.closedByUs=!1,this.replaced=!1,this.status="connecting",this.emit("status",this.status);const n=this.ws;return new Promise(s=>{let o=!1;const i=r=>{o||(o=!0,s(r))},a=new WebSocket(this.cfg.url.replace(/^http/,"ws")+"/ws/"+encodeURIComponent(this.cfg.id??this.cfg.code));if(this.ws=a,n&&n!==a)try{n.close()}catch{}a.onopen=()=>{t&&!this.cfg.token?this.send({t:"join",...t,v:jl,pet:1,mail:1}):this.cfg.token?this.send({t:"hello",token:this.cfg.token,v:jl,pet:1,mail:1}):i("notoken")},a.onmessage=r=>{const l=JSON.parse(r.data);this.handle(l),l.t==="welcome"&&(this.armStable(),i("ok")),l.t==="error"&&i(l.code+(l.msg?":"+l.msg:"")),l.t==="removed"&&i("removed")},a.onclose=r=>{if(this.ws===a){if(this.clearStable(),this.ws=null,this.status="offline",i("closed"),r.code===4e3){this.replaced=!0,this.emit("status",this.status),this.emit("replaced");return}this.emit("status",this.status),this.scheduleRetry()}},a.onerror=()=>{}})}close(){this.closedByUs=!0,this.replaced=!1,this.epoch++,this.outbox=[],this.clearStable(),this.retryT&&(clearTimeout(this.retryT),this.retryT=0),this.presT&&(clearTimeout(this.presT),this.presT=0);try{this.ws?.close()}catch{}this.ws=null,this.status="offline",clearInterval(this.flushT)}handle(t){switch(t.t){case"joined":this.cfg.token=t.token,this.cfg.pid=t.pid,Kt(this.cfg);break;case"welcome":this.pid=t.pid,this.settings=t.settings,this.status="online",this.players=new Map(t.players.map(n=>[n.pid,n]));{const n=this.houses;this.houses=new Map;for(const s of t.houses){const{state:o,...i}=s,a=n.get(s.id);this.houses.set(s.id,{meta:i,confirmed:Io(o),pending:a?a.pending.filter(r=>!r.sent):[],view:null})}}this.presence=new Map(Object.entries(t.presence)),this.presence.delete(this.pid),t.ranch&&(this.ranch={plots:t.ranch.plots,skew:t.ranch.now-Date.now()});{const n=new Map;for(const s of t.tables??[])n.set(s.tb,this.stampTable(s));this.tables=n}clearInterval(this.flushT),this.flushT=window.setInterval(()=>this.flush(),60),this.lastPres&&(this.presDirty=!0),this.flushPres(),this.flushOutbox(),this.emit("welcome"),this.emit("status",this.status);break;case"act":{const n=this.houses.get(t.houseId);if(!n)return;n.confirmed=yi(Io(n.confirmed),t.action);const s=t.by===this.pid&&n.pending[0]?.cid===t.cid;s&&n.pending.shift(),n.view=null,s||this.emit("act",t.houseId,t.action);break}case"nack":{const n=this.houses.get(t.houseId);if(!n)return;n.pending=n.pending.filter(s=>s.cid!==t.cid),t.state&&(n.confirmed=Io(t.state)),n.view=null,this.emit("reset",t.houseId,t.reason);break}case"pres":t.pid!==this.pid&&(t.p?this.presence.set(t.pid,t.p):this.presence.delete(t.pid),this.emit("pres",t.pid));break;case"players":this.players=new Map(t.players.map(n=>[n.pid,n])),this.emit("players");break;case"house":{const{state:n,...s}=t.house;this.houses.set(s.id,{meta:s,confirmed:Io(n),pending:[],view:null}),this.emit("houses");break}case"houseMeta":{const n=this.houses.get(t.meta.id);n&&(n.meta=t.meta,this.emit("houses"),this.emit("houseMeta",t.meta.id));break}case"houseGone":this.houses.delete(t.houseId),this.emit("houses"),this.emit("houseGone",t.houseId);break;case"settings":this.settings=t.settings,this.emit("settings");break;case"bubble":this.emit("bubble",t.pid,t.b);break;case"fx":this.emit("fx",t.pid,t.fx);break;case"ranch":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch");break;case"ranchFail":this.ranch={plots:t.plots,skew:t.now-Date.now()},this.emit("ranch"),this.emit("ranchFail",t.reason);break;case"noride":this.emit("noride",t.ride);break;case"table":{const n=this.stampTable(t.table);this.tables.set(n.tb,n),this.emit("table",n);break}case"tblFail":this.emit("tblFail",t.tb,t.reason);break;case"sayFail":this.emit("sayFail",t.reason);break;case"mailbox":{const n=this.houses.get(t.houseId);if(!n)return;if(t.mailbox?.letters?.length)n.confirmed={...n.confirmed,mailbox:t.mailbox};else{const{mailbox:s,...o}=n.confirmed;n.confirmed=o}n.view=null,this.emit("mailbox",t.houseId);break}case"mailFail":this.emit("mailFail",t.reason);break;case"parentInfo":this.emit("parentInfo",t);break;case"error":this.emit("error",t.code),t.code==="badtoken"&&(this.cfg.token=void 0,this.cfg.pid=void 0,Kt(this.cfg));break;case"removed":this.closedByUs=!0,this.emit("removed");break}}stampTable(t){const n=this.tables.get(t.tb),s=n&&n.away===t.away&&n.receivedAt?n.receivedAt:Date.now();return{...t,receivedAt:s}}view(t){const n=this.houses.get(t);return n?n.view??=n.pending.reduce((s,o)=>yi(s,o.action),n.confirmed):null}myHouseId(){return this.players.get(this.pid)?.houseId??""}canEdit(t){const n=this.houses.get(t);return!!n&&(!n.meta.locked||n.meta.ownerId===this.pid)}dispatch(t,n){const s=this.houses.get(t);if(!s)return;const o=Fl(n),i=s.pending[s.pending.length-1];o&&i&&!i.sent&&Fl(i.action)===o?i.action=n:s.pending.push({cid:this.cid++,action:n,sent:!1}),s.view=null}flush(){for(const[t,n]of this.houses)for(const s of n.pending)!s.sent&&this.send({t:"act",houseId:t,cid:s.cid,action:s.action})&&(s.sent=!0);this.flushPres()}setPresence(t){this.lastPres=t,this.presDirty=!0,this.presT||this.flushPres()}flushPres(){if(!(!this.presDirty||!this.lastPres)){if(!this.send({t:"pres",p:this.lastPres})){!this.closedByUs&&!this.presT&&(this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90));return}this.presDirty=!1,this.presT&&clearTimeout(this.presT),this.presT=window.setTimeout(()=>{this.presT=0,this.flushPres()},90)}}myPresence(){return this.lastPres}say(t){this.reliable({t:"say",b:t})}lock(t,n){this.reliable({t:"lock",houseId:t,locked:n})}setLook(t){this.reliable({t:"look",look:t});const n=this.players.get(this.pid);n&&(n.look=t)}setDog(t){this.reliable({t:"dog",dog:t});const n=this.players.get(this.pid);n&&(n.dog=t)}fx(t){this.reliable({t:"fx",fx:t})}ranchOp(t){this.reliable({t:"ranch",o:t})}tbl(t){this.reliable({t:"tbl",...t})}sendMail(t,n,s,o){this.reliable({t:"mail",op:"send",houseId:t,text:n,color:s,sticker:o})}readMail(t,n){this.reliable({t:"mail",op:"read",houseId:t,id:n})}dropMail(t,n){this.reliable({t:"mail",op:"drop",houseId:t,id:n})}now(){return Date.now()+this.ranch.skew}parent(t){this.cfg.parentKey&&this.reliable({t:"parent",key:this.cfg.parentKey,...t})}}function Cp(e,t,n,s="living"){let o=s;const i=[],a=()=>({...e.view(t),currentRoom:o,soundOn:n.get()}),r=l=>{if(e.houses.has(t)){const c=a();i.forEach(d=>d(c,l))}};return e.on("act",(l,c)=>{l===t&&r(c)}),e.on("reset",l=>{l===t&&r({type:"game/reset"})}),{houseId:t,get:a,subscribe(l){i.push(l)},dispatch(l){if(l.type==="room/switch")o=l.room;else if(l.type==="settings/sound")n.set(l.on);else{if(l.type==="game/reset")return;if(!e.canEdit(t))return;e.dispatch(t,l)}r(l)}}}const Ce="#5a3d5c",G=`stroke="${Ce}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,Ka=[{name:"Tabby",body:"#ffb26b",stripe:"#e8893a",belly:"#ffe3c4"},{name:"Smokey",body:"#b9b6c9",stripe:"#8f8ba3",belly:"#ecebf3"},{name:"Tuxedo",body:"#4f4660",stripe:"",belly:"#ffffff"},{name:"Calico",body:"#fff6ec",stripe:"",belly:"#fff6ec"}],Xa=[{name:"Pup",body:"#f2d0a4",ear:"#b07d54",snout:"#fbe7cc"},{name:"Poodle",body:"#fff0f6",ear:"#ffc8dd",snout:"#fff7fb"},{name:"Dachshund",body:"#c07a45",ear:"#7d4a26",snout:"#d99a68"},{name:"Golden",body:"#f4b860",ear:"#e09a3e",snout:"#fbd9a0"},{name:"Spotty",body:"#ffffff",ear:"#4a3f52",snout:"#ffffff"}],Sp=(e,t,n,s=!1)=>s?`<path d="M${e-3} ${n} q3 3 6 0 M${t-3} ${n} q3 3 6 0" fill="none" ${G} stroke-width="2.5"/>`:`<circle cx="${e}" cy="${n}" r="2.8" fill="${Ce}"/><circle cx="${t}" cy="${n}" r="2.8" fill="${Ce}"/><circle cx="${e+.9}" cy="${n-.9}" r=".9" fill="#fff"/><circle cx="${t+.9}" cy="${n-.9}" r=".9" fill="#fff"/>`,Ja=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="4" ry="2.4" fill="#ff9bb5" opacity=".75"/>`;function Cs(e,t="stand"){const n=Ka[e]??Ka[0],s="#ffb3c6",o=(i,a,r,l)=>`
    <path d="M${i-13} ${a-8} L${i-10} ${a-25} L${i-1} ${a-13} Z" fill="${n.body}" ${G}/><path d="M${i-10.5} ${a-11} L${i-9.5} ${a-20} L${i-4} ${a-13} Z" fill="${s}"/>
    <path d="M${i+1} ${a-13} L${i+11} ${a-26} L${i+13} ${a-7} Z" fill="${e===3?"#f4a259":n.body}" ${G}/><path d="M${i+4} ${a-13} L${i+10} ${a-21} L${i+11} ${a-11} Z" fill="${s}"/>
    <circle cx="${i}" cy="${a}" r="${r}" fill="${n.body}" ${G}/>
    ${e===3?`<path d="M${i+2} ${a-r+1} a${r} ${r} 0 0 1 ${r-3} ${r-2} q-6 2 -${r-3} -${r-3}z" fill="#f4a259"/>`:""}
    ${e===2?`<ellipse cx="${i+2}" cy="${a+7}" rx="9" ry="7" fill="#fff"/>`:""}
    ${n.stripe?`<path d="M${i-4} ${a-r+2} v5 M${i+2} ${a-r+1} v6 M${i+8} ${a-r+3} v4" ${G} stroke="${n.stripe}" stroke-width="2.5"/>`:""}
    ${Sp(i-4,i+7,a,l)}
    <path d="M${i+3} ${a+4} l-2.5 -2 h5 z" fill="#ff8fab"/><path d="M${i+.5} ${a+6} q2.5 2.5 5 0" fill="none" ${G} stroke-width="2"/>
    ${Ja(i-8,a+5)}${Ja(i+12,a+5)}
    <path d="M${i+r-2} ${a+3} l9 -2 M${i+r-2} ${a+6} l9 2" ${G} stroke-width="1.6"/>`;return t==="nap"?`<svg viewBox="0 0 120 100" class="catsvg nap">
    <g class="breathe"><path class="tail" d="M28 84 Q22 96 64 94" fill="none" stroke="${Ce}" stroke-width="11" stroke-linecap="round"/><path d="M28 84 Q22 96 64 94" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="76" rx="36" ry="18" fill="${n.body}" ${G}/>
    ${e===3?'<ellipse cx="44" cy="72" rx="12" ry="8" fill="#f4a259"/><ellipse cx="66" cy="70" rx="9" ry="6" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 62 q3 6 0 12 M56 61 q3 6 0 12 M68 62 q3 6 0 11" fill="none" ${G} stroke="${n.stripe}" stroke-width="3"/>`:""}
    ${o(90,76,15,!0)}</g></svg>`:t==="sit"?`<svg viewBox="0 0 120 100" class="catsvg sit">
    <path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${Ce}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M50 92 Q18 96 24 70" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="70" rx="20" ry="25" fill="${n.body}" ${G}/>
    <ellipse cx="70" cy="74" rx="10" ry="15" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="54" cy="66" rx="9" ry="12" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M50 60 q5 2 4 8 M49 72 q5 2 4 8" fill="none" ${G} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect x="62" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${G}/><rect x="74" y="74" width="9" height="21" rx="4.5" fill="${n.body}" ${G}/>
    ${e===2?'<ellipse cx="66.5" cy="93" rx="4" ry="2.5" fill="#fff"/><ellipse cx="78.5" cy="93" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(72,36,17,!1)}</svg>`:`<svg viewBox="0 0 120 100" class="catsvg stand">
    <path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${Ce}" stroke-width="11" stroke-linecap="round"/><path class="tail" d="M32 58 Q8 54 12 26" fill="none" stroke="${n.body}" stroke-width="6" stroke-linecap="round"/>
    <rect class="leg b" x="34" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${G}/><rect class="leg a" x="74" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${G}/>
    <ellipse cx="58" cy="58" rx="32" ry="17" fill="${n.body}" ${G}/>
    <ellipse cx="64" cy="66" rx="20" ry="7" fill="${n.belly}"/>
    ${e===3?'<ellipse cx="46" cy="52" rx="12" ry="9" fill="#f4a259"/><ellipse cx="68" cy="50" rx="9" ry="7" fill="#5a4a52"/>':""}
    ${n.stripe?`<path d="M44 43 q3 6 0 12 M56 42 q3 6 0 12 M68 43 q3 6 0 11" fill="none" ${G} stroke="${n.stripe}" stroke-width="3"/>`:""}
    <rect class="leg a" x="44" y="64" width="9" height="30" rx="4.5" fill="${n.body}" ${G}/><rect class="leg b" x="84" y="62" width="9" height="32" rx="4.5" fill="${n.body}" ${G}/>
    ${e===2?'<ellipse cx="48.5" cy="92" rx="4" ry="2.5" fill="#fff"/><ellipse cx="88.5" cy="92" rx="4" ry="2.5" fill="#fff"/>':""}
    ${o(90,40,17,!1)}</svg>`}function ko(e,t="stand"){const n=Xa[e]??Xa[0],s=t==="sleep",o=e===2,i=e===1,a=e===3,r=e===4,l=o?66:58,c=o?70:62,d=94-c,g=o?102:92,f=o?50:40,p=(_,P)=>i?`<rect class="leg ${P}" x="${_+2}" y="${c}" width="6" height="${d}" rx="3" fill="${n.body}" ${G}/><circle class="leg ${P}" cx="${_+5}" cy="91" r="6" fill="${n.body}" ${G}/>`:`<rect class="leg ${P}" x="${_}" y="${c}" width="10" height="${d}" rx="5" fill="${n.body}" ${G}/>`,u=i?`<circle cx="44" cy="58" r="15" fill="${n.body}" ${G}/><circle cx="70" cy="56" r="17" fill="${n.body}" ${G}/><ellipse cx="57" cy="58" rx="22" ry="12" fill="${n.body}"/>`:`<ellipse cx="${o?62:58}" cy="${l}" rx="${o?42:32}" ry="${o?13:17}" fill="${n.body}" ${G}/>`,b=r?`<circle cx="46" cy="54" r="5" fill="${Ce}"/><circle cx="64" cy="62" r="4" fill="${Ce}"/><circle cx="72" cy="50" r="3.5" fill="${Ce}"/><circle cx="38" cy="64" r="3" fill="${Ce}"/>`:"",M=i?`<g class="tail"><path d="M30 52 L22 38" ${G}/><circle cx="21" cy="34" r="7" fill="${n.body}" ${G}/></g>`:a?`<path class="tail" d="M30 52 Q10 50 14 30 Q20 40 30 46" fill="${n.body}" ${G}/>`:`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${Ce}" stroke-width="9" stroke-linecap="round"/>`,m=!i&&!a?`<path class="tail" d="M30 52 Q16 44 18 30" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`:"",h=`
    ${i?`<circle cx="${g-2}" cy="${f-16}" r="10" fill="${n.body}" ${G}/>`:""}
    <circle cx="${g}" cy="${f}" r="17" fill="${n.body}" ${G}/>
    ${r?`<circle cx="${g-6}" cy="${f-8}" r="4" fill="${Ce}"/>`:""}
    <ellipse cx="${g+13}" cy="${f+7}" rx="11" ry="8" fill="${n.snout}" ${G}/>
    <circle cx="${g+22}" cy="${f+4}" r="4" fill="${Ce}"/>
    <path d="M${g+14} ${f+12} q4 3 8 0" fill="none" ${G} stroke-width="2"/>
    ${s?"":`<path class="tongue" d="M${g+16} ${f+13} q2 7 6 0" fill="#ff8fab" ${G} stroke-width="2"/>`}
    ${s?`<path d="M${g+2} ${f-4} q3 3 6 0" fill="none" ${G} stroke-width="2.4"/>`:`<circle cx="${g+5}" cy="${f-3}" r="3" fill="${Ce}"/><circle cx="${g+6}" cy="${f-4}" r="1" fill="#fff"/>`}
    ${Ja(g+2,f+8)}
    ${i?`<circle cx="${g-9}" cy="${f+8}" r="9" fill="${n.ear}" ${G}/>`:`<ellipse class="ear" cx="${g-9}" cy="${f+4}" rx="7" ry="${a||o?14:12}" fill="${n.ear}" ${G} transform="rotate(12 ${g-9} ${f+4})"/>`}
    <path d="M${g-12} ${f+14} q10 6 20 2" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/><circle cx="${g-1}" cy="${f+19}" r="3" fill="#ffd166" ${G} stroke-width="1.5"/>`,v=i?`<g class="tail"><path d="M42 86 L28 80" ${G}/><circle cx="25" cy="78" r="7" fill="${n.body}" ${G}/></g>`:`<path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${Ce}" stroke-width="9" stroke-linecap="round"/><path class="tail" d="M42 88 Q24 90 24 74" fill="none" stroke="${n.body}" stroke-width="4.5" stroke-linecap="round"/>`;return t==="sit"||t==="sleep"?`<svg viewBox="0 0 130 100" class="dogsvg ${s?"sleep":"sit"}">${v}
    <ellipse cx="60" cy="70" rx="22" ry="24" fill="${n.body}" ${G}/>${r?`<circle cx="54" cy="66" r="5" fill="${Ce}"/><circle cx="64" cy="80" r="4" fill="${Ce}"/>`:""}
    ${p(62,"a")}${p(74,"b")}<g transform="translate(-22 -2)">${h}</g></svg>`:`<svg viewBox="0 0 130 100" class="dogsvg stand">${M}${m}
    ${p(o?30:34,"b")}${p(o?82:72,"a")}
    ${u}${b}
    ${p(o?42:46,"a")}${p(o?94:84,"b")}
    ${h}</svg>`}const hd=e=>{let t=2166136261;for(const n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0},On=(e,t)=>{let n=(e^Math.imul(t,2654435761))>>>0;return n^=n>>>15,n=Math.imul(n,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296},Vl=18,Bp={1:.35,2:.6};function Hp(e,t,n){return e-t*Bp[n]}function Pp(e,t){const s=Math.floor(t/1e3/2.8);return On(hd(e||"pup"),s)<.62?"rest":"peek"}function Wp(e,t,n,s,o=!1){const i=hd(e.name+":"+e.coat+":"+e.room+":"+Math.round(e.x)+(n?":t"+Math.round(n.x):"")),a=t/1e3,r=Math.floor(a/Vl),l=a-r*Vl;if(!n){const m=X=>Math.max(160,Math.min(2240,e.x+(On(i,X)-.5)*760)),h=m(r-1);let v=m(r);const _=On(i+7,r),P=_<.45?"nap":_<.75?"sit":"groom",R=!!(s&&P==="nap"&&On(i+13,r)<.72);R&&s&&(v=Math.max(160,Math.min(2240,s.x)));const T=Math.abs(v-h),N=Math.min(5,T/110);return l<N&&!o?{x:h+(v-h)*(l/N),mood:"walk",flip:v<h,perch:0,curl:0}:{x:v,mood:P,flip:v<h,perch:0,curl:R?1:0}}const c=Math.max(160,Math.min(2240,n.x)),d=On(i+5,r)<.45?2:1,g=Math.max(160,Math.min(2240,c+(On(i,r)-.5)*420)),f=Math.abs(c-g),p=Math.min(4.2,Math.max(.6,f/160)),u=c<g;if(l<p&&!o)return{x:g+(c-g)*(l/p),mood:"walk",flip:u,perch:0,curl:0};const b=On(i+11,r),M=b<.34?"nap":b<.67?"sit":"play";return{x:c,mood:M,flip:u,perch:d,curl:0}}const wi="#5a3d5c",he=`stroke="${wi}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`,Ds=[`<svg viewBox="0 0 48 48"><path d="M24 40 C16 32 6 26 10 16 C14 8 24 12 24 20 C24 12 34 8 38 16 C42 26 32 32 24 40 Z" fill="#ff6b9a" ${he}/></svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd166" ${he}/></svg>`,`<svg viewBox="0 0 48 48"><circle cx="24" cy="22" r="6" fill="#ff8fab" ${he}/>${[0,60,120,180,240,300].map(e=>`<circle cx="${24+Math.cos(e*Math.PI/180)*12}" cy="${22+Math.sin(e*Math.PI/180)*12}" r="5" fill="#ffd166" ${he}/>`).join("")}<path d="M24 34 V44" ${he}/></svg>`,`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="10" fill="#ffb26b" ${he}/><circle cx="34" cy="20" r="8" fill="#ffc46b" ${he}/><path d="M28 14 L30 6 L36 14" fill="#ffb26b" ${he}/><circle cx="32" cy="19" r="1.4" fill="${wi}"/><circle cx="37" cy="19" r="1.4" fill="${wi}"/></svg>`,`<svg viewBox="0 0 48 48">${["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7"].map((e,t)=>`<path d="M8 ${30-t*4} Q24 ${10-t*3} 40 ${30-t*4}" fill="none" stroke="${e}" stroke-width="4"/>`).join("")}</svg>`,`<svg viewBox="0 0 48 48"><path d="M24 6 l3 10 10 1 -8 6 3 10 -8 -5 -8 5 3 -10 -8 -6 10 -1z" fill="#fff3b0" ${he}/><circle cx="12" cy="34" r="3" fill="#ff8fab" ${he}/><circle cx="36" cy="36" r="2.4" fill="#bde0fe" ${he}/></svg>`];function Gl(e){const t=e?`<g class="flag"><path d="M30 16 V6" ${he}/><path d="M30 6 H42 L38 11 L42 16 H30 Z" fill="#ff6b6b" ${he}/></g>`:`<g class="flag"><path d="M18 28 H28" ${he}/><path d="M18 22 H28 L25 25 L28 28 H18 Z" fill="#ffd166" ${he}/></g>`;return`<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="68" rx="18" ry="3" fill="#000" opacity=".12"/>
    <rect x="30" y="40" width="5" height="26" rx="2" fill="#c99366" ${he}/>
    <path d="M8 40 V22 Q8 8 32 8 Q56 8 56 22 V40 Z" fill="#8ecae6" ${he}/>
    <path d="M8 28 H56" ${he}/>
    <rect x="14" y="32" width="36" height="16" rx="4" fill="#fff6e6" ${he}/>
    <circle cx="32" cy="40" r="3" fill="${wi}"/>
    ${t}
  </svg>`}function Tp(e,t=[]){const n=$p(e,t);return n.ok?{ok:!0,text:n.text}:{ok:!1,msg:n.reason==="empty"?"Write a little note!":Ji[n.reason]||"Oops, try different words!"}}const Rp={...Ji,empty:"Write a little note!",slow:"Let's wait a moment!",full:"This mailbox is full!",notyours:"Only she can open her mail.",nohouse:"That house is not on the street.",gone:"That letter is already gone.",toobig:"The mailbox is too full!",presetsOnly:"Typing is turned off: pick a phrase!",unread:"She still has your letters! Wait until she reads them."};function Up(e){return Rp[e]||"Let's try that again!"}function Ep(e){let t="",n="",s=!1,o="",i=0,a=0,r=-1,l="",c="";const d=()=>document.getElementById("mailCue");d()?.addEventListener("click",()=>{e.openOwn()});function g(){t="",n="",document.getElementById("mailSheet")?.remove()}function f(){let m=document.getElementById("mailSheet");return m||(m=document.createElement("div"),m.id="mailSheet",m.className="sheet mailSheet",m.innerHTML='<div class="card" id="mailCard"></div>',document.body.appendChild(m),m.addEventListener("click",h=>{const v=h.target;if(v===m||v.closest('[data-m="close"]')){g();return}u(v)}),m.addEventListener("input",h=>{const v=h.target;if(v.id!=="mailText")return;const _=document.getElementById("mailCount");_&&(_.textContent=`${v.value.length}/${mn}`)})),m}function p(){if(!t)return;const m=f().querySelector("#mailText")?.value??"",h=e.mine(t),v=e.lettersOf(t),_=e.houseName(t),P=f().querySelector("#mailCard");if(n&&h&&!s){const T=v.find(N=>N.id===n);if(T&&T.text){b(T);return}n=""}if(s||!h){const T=e.freeType(),N=o?`Reply to ${e.houseName(o)||"your friend"}`:h?"Leave a letter":`Letter for ${_}`,X=T?`<textarea id="mailText" class="mailBox" maxlength="${mn}" placeholder="Hi! Come play!"></textarea>
        <div class="mailCount" id="mailCount">0/${mn}</div>`:`<h3>Phrase</h3><div class="phrases mailPhrases">${ao.map((Z,se)=>`<button type="button" data-phrase="${se}" class="${se===r?"on":""}">${Ze(Z)}</button>`).join("")}</div>`;P.innerHTML=`<button class="close" data-m="close">✕</button><h2>${Ze(N)}</h2>
        <p class="hint">${T?"A short note. Your name goes on it for you.":"Pick a phrase. Your name goes on it for you."}</p>
        ${X}
        <h3>Paper</h3><div class="mailRow">${ln.map((Z,se)=>`<button class="swatch ${se===i?"on":""}" data-color="${se}" style="background:${Z}" aria-label="Paper ${se+1}"></button>`).join("")}</div>
        <h3>Sticker</h3><div class="mailRow">${Ds.slice(0,td).map((Z,se)=>`<button class="stick ${se===a?"on":""}" data-sticker="${se}" aria-label="Sticker ${se+1}">${Z}</button>`).join("")}</div>
        ${l?`<p class="mailErr" id="mailErr">${Ze(l)}</p>`:""}
        <button class="mailSend" id="mailSend" type="button">Send</button>
        ${h&&v.length?'<button class="mailRow" data-act="back" type="button" style="margin-top:8px">Back to my mail</button>':""}`;const J=f().querySelector("#mailText");if(J&&m){J.value=m;const Z=document.getElementById("mailCount");Z&&(Z.textContent=`${m.length}/${mn}`)}return}const R=v.length?v.slice().reverse().map(T=>T.text?`<button type="button" class="letter ${T.read?"":"fresh"}" data-letter="${Ze(T.id)}" style="background:${ln[T.color]??ln[0]}">
        <span class="sticker">${Ds[T.sticker]??Ds[0]}</span>
        <span class="who">${Ze(T.from)}</span><span class="when">${Ze(xa(T.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${he}/><path d="M4 8 L40 24 L76 8" fill="${ln[T.color]??"#fff"}" ${he}/></svg>
      </button>`:`<div class="letter" style="background:${ln[T.color]??ln[0]}"><span class="who">Your letter</span><span class="when">${Ze(xa(T.at))}</span><span class="statusChip ${T.read?"read":""}">${T.read?"Read":"Delivered"}</span></div>`).join(""):'<p class="hint">No letters yet. Your flag pops up when one arrives!</p>';P.innerHTML=`<button class="close" data-m="close">✕</button><h2>${Ze(_)} mailbox</h2>${R}
      <div class="mailRow"><button type="button" data-act="write">Write a letter</button></div>
      ${l?`<p class="mailErr">${Ze(l)}</p>`:""}`}function u(m){const h=m.closest(".mailPhrases [data-phrase]");if(h){r=+h.dataset.phrase,l="",p();return}const v=m.closest("[data-color]");if(v){i=+v.dataset.color,p();return}const _=m.closest("[data-sticker]");if(_){a=+_.dataset.sticker,p();return}if(m.closest("#mailSend"))return M();const P=m.closest("[data-act]")?.dataset.act;if(P==="write"){s=!0,o="",n="",l="",p();return}if(P==="back"){s=!1,o="",n="",l="",p();return}if(P==="reply"){const J=e.houseOf(m.closest("[data-from]")?.dataset.from??"");if(!J){e.toast("They are not on the street anymore.");return}o=J,s=!0,n="",l="",t=J,p();return}if(P==="drop"){const J=m.closest("[data-id]")?.dataset.id??"";if(c!==J){c=J,e.toast("Tap again to throw it away");return}c="",e.drop(t,J);return}const R=m.closest("[data-letter]");if(!R)return;const T=R.dataset.letter,X=e.lettersOf(t).find(J=>J.id===T);X&&(!e.mine(t)||!X.text||(X.read||e.read(t,T),n=T,b(X)))}function b(m){const h=Qp(m.text),v=f().querySelector("#mailCard");v.innerHTML=`<button class="close" data-m="close">✕</button>
      <div class="letter open read" style="background:${ln[m.color]??ln[0]}" data-id="${Ze(m.id)}" data-from="${Ze(m.fromPid)}">
        <span class="sticker">${Ds[m.sticker]??Ds[0]}</span>
        <span class="who">${Ze(m.from)}</span><span class="when">${Ze(xa(m.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${he}/><path class="flap" d="M4 8 L40 24 L76 8" fill="#fff" ${he}/></svg>
        <p class="words">${Ze(h??"")}</p>
        <span class="mailRow"><button type="button" data-act="reply">Reply</button><button type="button" class="throw" data-act="drop">${c===m.id?"Tap again":"Throw away"}</button></span>
      </div>
      <button type="button" data-act="back">All my mail</button>
      ${l?`<p class="mailErr">${Ze(l)}</p>`:""}`}function M(){let m="";if(e.freeType()){const v=f().querySelector("#mailText")?.value??"",_=Tp(v);if(!_.ok){l=_.msg,p();const P=f().querySelector("#mailText");P&&(P.value=v);return}m=_.text}else{if(r<0||r>=ao.length){l="Pick a phrase!",p();return}m=ao[r]}const h=o||t;l="",e.send(h,m,i,a),e.toast("On its way!"),e.mine(h)?(s=!1,o="",t=h,p()):g()}return{open(m,h,v,_){t=m,n="",s=!v,o="",l="",c="",i=0,a=0,r=-1,p()},fail(m){l=Up(m),t?p():e.toast(l)},refresh(){t&&p()},syncCue(m){d()?.classList.toggle("show",m)}}}function Qp(e){if(!e)return null;const t=e.normalize("NFKC").replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g,"").replace(/\s+/g," ").trim();return!t||t.length>mn?null:t}function Ze(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const pd=()=>vt("cozy-play");function Ap(){try{return localStorage.getItem(pd())==="play"?"play":"decorate"}catch{return"decorate"}}function zp(e){try{localStorage.setItem(pd(),e)}catch{}}function Dp(e){return e==="kennel"?"kennel":e==="cat-tower"?"tower":e==="yard-swing"?"swing":e==="lamp"||/(^|:)lamp|starlamp|light/.test(e)?"lamp":e==="fridge"||e==="stove"||e==="vanity"||e==="bookshelf"||e==="window"||e==="mirror"||e==="tv"||/fridge|stove|cabinet|drawer|vanity/.test(e)?"open":e==="sofa"||e==="armchair"||e==="chair"||e==="stool"||e==="bed"||e==="crib"||/(sofa|armchair|chair|stool|bench)/.test(e)?"sit":"wiggle"}const Zp='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22 V12 a3 3 0 0 1 6 0 V22" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M24 22 V10 a3 3 0 0 1 6 0 V24" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M30 24 V14 a3 3 0 0 1 6 0 V26" fill="#fff6e6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M14 22 V16 a3 3 0 0 0-6 0 V28 c0 8 6 14 16 14 h4 c8 0 12-5 12-12 V26" fill="#ffe0b8" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M34 8 l1.2 3 3 .4 -2.2 2 .6 3 -2.6-1.6 -2.6 1.6 .6-3 -2.2-2 3-.4z" fill="#ffd166" stroke="#5a3d5c" stroke-width="1.4"/></svg>',qp='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 34 L22 22 L30 30 L18 42 Q10 42 10 34 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M22 22 L32 12 L38 18 L28 28 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 12 L36 6 L42 12 L38 18" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 36 h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M8 14 l2 1 M40 34 l2 2 M8 40 l3 -1" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>';function Ip(e,t){let n="decorate";const s=e.querySelector("#modePlay"),o=e.querySelector("#modeDecorate");s.querySelector(".modeIco").innerHTML=Zp,o.querySelector(".modeIco").innerHTML=qp;const i=()=>{const c=n==="play";document.body.classList.toggle("mode-play",c),s.classList.toggle("on",c),o.classList.toggle("on",!c),s.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-pressed",c?"false":"true")},a=(c,d)=>{n=c,d&&zp(c),i(),t.onChange?.()};e.addEventListener("pointerdown",c=>c.stopPropagation()),e.addEventListener("click",c=>{const d=c.target.closest("[data-mode]");if(!d)return;const g=d.dataset.mode==="play"?"play":"decorate";a(g,t.ownHouse())}),i();let r=!1;return{mode:()=>n,isPlay:()=>n==="play",sync(c){a(c?Ap():"play",!1)},hint:()=>{if(r||!document.body.classList.contains("phone"))return;const c=vt("cozy-mode-hint");try{if(localStorage.getItem(c)){r=!0;return}}catch{r=!0;return}r=!0;const d=document.createElement("p");d.className="modeHint",d.textContent="Play: tap things! Decorate: move things!",e.appendChild(d);let g=!1;const f=()=>{if(!g){g=!0,d.remove(),window.removeEventListener("pointerdown",f);try{localStorage.setItem(c,"1")}catch{}}};window.setTimeout(f,2800),d.addEventListener("click",f),window.addEventListener("pointerdown",f)}}}const _e="#5a3d5c",j=(e=4)=>`stroke="${_e}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,qr=600,$t=250,Zn=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})">
  <rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${j()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${j()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${j()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${j()}/>
  <circle cx="-18" cy="-78" r="9" fill="#fff" opacity=".35"/></g>`,Op=(e,t,n)=>`<g transform="translate(${e} ${t})"><path d="M0 0 V-16" ${j(3)}/>${[0,72,144,216,288].map(s=>`<circle cx="${Math.cos(s*Math.PI/180)*6}" cy="${-20+Math.sin(s*Math.PI/180)*6}" r="5" fill="${n}" ${j(2)}/>`).join("")}<circle cx="0" cy="-20" r="4" fill="#ffd166" ${j(2)}/></g>`,Yl=e=>`<g transform="translate(${e} 0)">
  <rect x="-80" y="452" width="160" height="12" rx="6" fill="#ff9f68" ${j()}/><rect x="-80" y="470" width="160" height="12" rx="6" fill="#ff9f68" ${j()}/>
  <rect x="-70" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${j(3)}/><rect x="60" y="500" width="10" height="34" rx="4" fill="#8d6e63" ${j(3)}/>
  <rect x="-86" y="490" width="172" height="14" rx="7" fill="#ffb385" ${j()}/></g>`;function Np(){const e=Zr,t=Array.from({length:Math.floor((Ee.x1-Ee.x0+40)/34)},(n,s)=>`<path d="M${Ee.x0-20+s*34} 470 V428 l8 -10 l8 10 V470 Z" fill="#fff6e6" ${j(3)}/>`).join("");return`<svg class="parkScene" viewBox="0 0 ${e} ${qr}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient>
  <pattern id="pkCheck" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#fff"/><rect width="15" height="15" fill="#ff8fab"/><rect x="15" y="15" width="15" height="15" fill="#ff8fab"/></pattern></defs>
  <rect width="${e}" height="440" fill="url(#pkSky)"/>
  ${[180,900,1600,2300].map((n,s)=>`<g transform="translate(${n} ${70+s%2*30})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <circle cx="${e-220}" cy="90" r="46" fill="#ffe066" ${j(4)}/>
  <path d="M-50 360 Q500 220 1100 340 T2300 330 T${e+100} 350 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#9fe0aa"/><path d="M0 410 H${e}" ${j(4)}/>
  <path d="M0 560 Q700 520 1400 565 T${e} 545 V600 H0 Z" fill="#f6e3c3" opacity=".9"/>
  ${Zn(260,390,.9)}${Zn(720,380,1.05,"#4fbf7a")}${Zn(1230,385,.8)}${Zn(1640,380,1,"#4fbf7a")}${Zn(1990,388,.85)}${Zn(2380,380,.95)}${Zn(2860,390,.9,"#4fbf7a")}
  ${[[300,470,"#ff8fab"],[690,455,"#c9a0dc"],[1210,470,"#ffd166"],[1960,450,"#8ecae6"],[2390,470,"#ff8fab"],[1580,590,"#c9a0dc"],[140,585,"#ffd166"]].map(([n,s,o])=>Op(+n,+s,String(o))).join("")}
  <!-- gate back to the street -->
  <g><rect x="40" y="300" width="22" height="200" rx="6" fill="#c99366" ${j()}/><rect x="168" y="300" width="22" height="200" rx="6" fill="#c99366" ${j()}/>
    <path d="M30 312 Q115 240 200 312" fill="none" stroke="${_e}" stroke-width="16" stroke-linecap="round"/><path d="M30 312 Q115 240 200 312" fill="none" stroke="#ff9f68" stroke-width="9" stroke-linecap="round"/>
    <rect x="62" y="252" width="106" height="36" rx="12" fill="#fff6e6" ${j(3)}/><text x="115" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="${_e}" font-family="Nunito, system-ui, sans-serif">PARK</text></g>
  <!-- swing set (seats are separate so they can swing) -->
  <g><path d="M350 ${$t} L310 500 M350 ${$t} L390 500 M650 ${$t} L610 500 M650 ${$t} L690 500" stroke="${_e}" stroke-width="14" stroke-linecap="round"/>
    <path d="M350 ${$t} L310 500 M350 ${$t} L390 500 M650 ${$t} L610 500 M650 ${$t} L690 500" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/>
    <rect x="330" y="${$t-10}" width="340" height="20" rx="10" fill="#ff8fab" ${j()}/></g>
  <!-- slide -->
  <g><path d="M${te.ladder-20} 560 V${te.top.y} M${te.ladder+30} 560 V${te.top.y}" stroke="${_e}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${te.ladder-20} 560 V${te.top.y} M${te.ladder+30} 560 V${te.top.y}" stroke="#c9a0dc" stroke-width="6" stroke-linecap="round"/>
    ${[380,420,460,500,540].map(n=>`<path d="M${te.ladder-20} ${n} H${te.ladder+30}" ${j(5)}/>`).join("")}
    <rect x="${te.ladder-30}" y="${te.top.y-14}" width="100" height="18" rx="8" fill="#ffd166" ${j()}/>
    <path d="M${te.ladder+60} ${te.top.y-10} C 1000 ${te.top.y} 1010 520 ${te.bottom.x+40} 548 L${te.bottom.x+40} 572 C 990 548 975 ${te.top.y+30} ${te.ladder+60} ${te.top.y+14} Z" fill="#ffd166" ${j()}/>
    <path d="M${te.ladder+70} ${te.top.y-2} C 990 ${te.top.y+8} 1000 525 ${te.bottom.x+30} 552" fill="none" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/></g>
  <!-- splash pond -->
  <g class="pondArt"><ellipse cx="1420" cy="515" rx="185" ry="52" fill="#8ecae6" ${j()}/><ellipse cx="1420" cy="510" rx="150" ry="36" fill="#b5e3f5"/>
    <ellipse cx="1340" cy="520" rx="24" ry="9" fill="#80ed99" ${j(3)}/><ellipse cx="1500" cy="505" rx="20" ry="8" fill="#80ed99" ${j(3)}/>
    <g transform="translate(1440 500)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ffd166" ${j(3)}/><circle cx="16" cy="-12" r="9" fill="#ffd166" ${j(3)}/><path d="M24 -12 l8 2 l-8 3 z" fill="#ff9f68" ${j(2)}/><circle cx="18" cy="-14" r="1.8" fill="${_e}"/></g></g>
  <!-- picnic blanket -->
  <g><path d="M1670 530 L1910 530 L1940 580 L1640 580 Z" fill="url(#pkCheck)" ${j()}/>
    <g transform="translate(1915 520)"><rect x="-26" y="-20" width="52" height="32" rx="8" fill="#e6b88a" ${j(3)}/><path d="M-18 -20 Q0 -46 18 -20" fill="none" ${j(4)}/><circle cx="-10" cy="-24" r="7" fill="#ff6b6b" ${j(2)}/></g></g>
  ${Yl(2065)}${Yl(2265)}
  <!-- dog area -->
  <g>${t}<path d="M${Ee.x0-20} 440 H${Ee.x1+20}" ${j(3)}/>
    <g transform="translate(${Ee.x0+10} 380)"><rect x="-6" y="0" width="12" height="70" fill="#c99366" ${j(3)}/><rect x="-55" y="-34" width="110" height="38" rx="10" fill="#fff6e6" ${j(3)}/>
      <text x="0" y="-8" text-anchor="middle" font-size="20" font-weight="900" fill="${_e}" font-family="Nunito, system-ui, sans-serif">DOGS 🐾</text></g>
    <g transform="translate(${Ee.x1-30} 470)"><path d="M-50 0 V-60 L0 -100 L50 -60 V0 Z" fill="#ff8fab" ${j()}/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="${_e}" stroke-width="14" stroke-linecap="round"/><path d="M-62 -54 L0 -108 L62 -54" fill="none" stroke="#c9a0dc" stroke-width="8" stroke-linecap="round"/><path d="M-20 0 V-30 a20 20 0 0 1 40 0 V0 Z" fill="#5a3d5c"/></g>
    <g transform="translate(${Ee.x0+120} 500)"><rect x="-12" y="-30" width="24" height="34" rx="8" fill="#ff6b6b" ${j(3)}/><rect x="-18" y="-18" width="36" height="8" rx="4" fill="#ff6b6b" ${j(3)}/><circle cx="0" cy="-32" r="10" fill="#ff6b6b" ${j(3)}/></g></g>
  </svg>`}const jp=`<svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M10 0 V222 M50 0 V222" stroke="${_e}" stroke-width="4"/><rect x="0" y="216" width="60" height="14" rx="6" fill="#ff9f68" ${j(3)}/></svg>`,Fp=`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#ffd166" ${j(3)}/><path d="M6 16 Q20 24 34 16 M8 27 Q20 19 32 27" fill="none" stroke="#fff" stroke-width="3"/></svg>`,Vp=`<svg viewBox="0 0 48 48"><rect x="20" y="28" width="8" height="14" rx="3" fill="#c99366" stroke="${_e}" stroke-width="3"/><circle cx="24" cy="20" r="13" fill="#5cc985" stroke="${_e}" stroke-width="3"/><circle cx="19" cy="16" r="3" fill="#fff" opacity=".5"/></svg>`,ud=`<svg viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="10" ry="8" fill="#ff8fab" stroke="${_e}" stroke-width="3"/><circle cx="13" cy="20" r="4.5" fill="#ff8fab" stroke="${_e}" stroke-width="3"/><circle cx="20" cy="13" r="4.5" fill="#ff8fab" stroke="${_e}" stroke-width="3"/><circle cx="28" cy="13" r="4.5" fill="#ff8fab" stroke="${_e}" stroke-width="3"/><circle cx="35" cy="20" r="4.5" fill="#ff8fab" stroke="${_e}" stroke-width="3"/></svg>`,Gp=`<svg viewBox="0 0 48 48"><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="${_e}" stroke-width="4" stroke-linecap="round"/><path d="M8 40 V20 Q24 4 40 20 V40" fill="none" stroke="#ff9f68" stroke-width="2"/><path d="M16 40 V26 M24 40 V22 M32 40 V26" stroke="${_e}" stroke-width="3" stroke-linecap="round"/></svg>`,le="#5a3d5c",ve=`stroke="${le}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,Oo=[{body:"#ffd6e0",roof:"#ff7aa8",door:"#8fd3ff",trim:"#fff6e6"},{body:"#d9f2ff",roof:"#5aa9e6",door:"#ffd166",trim:"#ffffff"},{body:"#e3f9d9",roof:"#5cc985",door:"#ff9f68",trim:"#fffbe6"},{body:"#fff1b8",roof:"#ff9f43",door:"#c9a0dc",trim:"#ffffff"},{body:"#eadcff",roof:"#9b7bd8",door:"#80ed99",trim:"#fff6fb"},{body:"#ffe0c7",roof:"#e07a5f",door:"#5fb0d8",trim:"#fffaf0"},{body:"#d8f5ef",roof:"#2fb3a3",door:"#ff8fab",trim:"#ffffff"},{body:"#fde2f3",roof:"#e879c6",door:"#ffd166",trim:"#fff"}];function $i(e,t={}){const n=Oo[(e%Oo.length+Oo.length)%Oo.length],s=e%2===1,o=t.lit?"#fff3b0":"#cfe8ff",i=s?`<path d="M22 138 Q22 36 160 30 Q298 36 298 138 Z" fill="${n.roof}" ${ve}/><path d="M60 110 Q70 60 120 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`:`<path d="M14 140 L160 26 L306 140 Z" fill="${n.roof}" ${ve}/><path d="M70 110 L140 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`;return`<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="294" rx="150" ry="8" fill="#000" opacity=".12"/>
  <rect x="${s?232:220}" y="${s?36:44}" width="30" height="56" rx="6" fill="${n.trim}" ${ve}/>
  <rect x="44" y="124" width="232" height="168" rx="20" fill="${n.body}" ${ve}/>
  ${i}
  <g class="houseWin" fill="${o}"><circle cx="160" cy="${s?92:98}" r="18" ${ve}/><rect x="62" y="160" width="62" height="58" rx="18" ${ve}/><rect x="196" y="160" width="62" height="58" rx="18" ${ve}/></g>
  <path d="M160 ${s?74:80} V${s?110:116} M142 ${s?92:98} H178" ${ve}/>
  <path d="M93 160 V218 M62 189 H124" ${ve}/><path d="M227 160 V218 M196 189 H258" ${ve}/>
  <rect x="56" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${ve}/><rect x="190" y="216" width="74" height="16" rx="8" fill="${n.trim}" ${ve}/>
  <circle cx="72" cy="212" r="7" fill="#ff8fab" ${ve}/><circle cx="92" cy="208" r="7" fill="#ffd166" ${ve}/><circle cx="112" cy="212" r="7" fill="#ff8fab" ${ve}/>
  <circle cx="208" cy="212" r="7" fill="#c9a0dc" ${ve}/><circle cx="228" cy="208" r="7" fill="#80ed99" ${ve}/><circle cx="248" cy="212" r="7" fill="#c9a0dc" ${ve}/>
  <path d="M132 292 V226 Q132 196 160 196 Q188 196 188 226 V292 Z" fill="${n.door}" ${ve}/>
  <circle cx="176" cy="250" r="5" fill="${le}"/><path d="M146 222 Q160 212 174 222" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>
  <rect x="118" y="286" width="84" height="10" rx="5" fill="${n.trim}" ${ve}/>
</svg>`}const rt={street:`<svg viewBox="0 0 48 48"><circle cx="16" cy="15" r="7" fill="#ffd166" stroke="${le}" stroke-width="3"/><circle cx="32" cy="15" r="7" fill="#ff8fab" stroke="${le}" stroke-width="3"/><circle cx="13.5" cy="14.5" r="1.2" fill="${le}"/><circle cx="18.5" cy="14.5" r="1.2" fill="${le}"/><circle cx="29.5" cy="14.5" r="1.2" fill="${le}"/><circle cx="34.5" cy="14.5" r="1.2" fill="${le}"/><path d="M13 18 q3 2.2 6 0 M29 18 q3 2.2 6 0" fill="none" stroke="${le}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 40 Q16 28 24 33 Q32 38 40 28" fill="none" stroke="#5cc985" stroke-width="4" stroke-linecap="round"/><circle cx="16" cy="36" r="2.2" fill="#fff" stroke="${le}" stroke-width="1.5"/><circle cx="32" cy="32" r="2.2" fill="#fff" stroke="${le}" stroke-width="1.5"/></svg>`,home:`<svg viewBox="0 0 48 48"><path d="M8 22 L24 8 L40 22 V40 H8 Z" fill="#ffd166" stroke="${le}" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 V28 H28 V40" fill="#fff" stroke="${le}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="20" r="2.4" fill="${le}"/></svg>`,lockOn:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q33 7 33 16 V22" fill="none" stroke="${le}" stroke-width="4"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#ffd166" stroke="${le}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${le}"/></svg>`,lockOff:`<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q31 7 32.5 13" fill="none" stroke="${le}" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#b6f0a8" stroke="${le}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${le}"/></svg>`,chat:`<svg viewBox="0 0 48 48"><path d="M8 12 Q8 6 14 6 H34 Q40 6 40 12 V26 Q40 32 34 32 H22 L13 40 V32 Q8 32 8 26 Z" fill="#fff3b0" stroke="${le}" stroke-width="3" stroke-linejoin="round"/><circle cx="17" cy="19" r="2.5" fill="${le}"/><circle cx="24" cy="19" r="2.5" fill="${le}"/><circle cx="31" cy="19" r="2.5" fill="${le}"/></svg>`,shield:`<svg viewBox="0 0 48 48"><path d="M24 5 L39 11 V23 Q39 36 24 43 Q9 36 9 23 V11 Z" fill="#c9a0dc" stroke="${le}" stroke-width="3" stroke-linejoin="round"/><path d="M17 24 L22 29 L31 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,solo:`<svg viewBox="0 0 48 48"><path d="M8 24 L24 9 L40 24 V41 H8 Z" fill="#ffd166" stroke="${le}" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="28" width="10" height="13" rx="4" fill="#fff" stroke="${le}" stroke-width="2.5"/><path d="M33 7 l2 4 4 .5 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.5z" fill="#ff8fab" stroke="${le}" stroke-width="1.5"/></svg>`};function z(e,t=2600){const n=document.createElement("div");n.className="toast",n.textContent=e,(document.getElementById("toastLane")??document.body).appendChild(n),setTimeout(()=>n.classList.add("out"),t),setTimeout(()=>n.remove(),t+400)}function md(){return new Promise(e=>{let t=0,n=0,s="",o=0;const i=document.createElement("div");i.className="sheet adult",i.innerHTML='<div class="card adultCard"></div>',document.body.appendChild(i);const a=i.firstElementChild,r=()=>{t=6+Math.floor(Math.random()*4),n=3+Math.floor(Math.random()*7),s="",l()},l=()=>{a.innerHTML=`<button class="close" data-k="x">✕</button><h2>Grown-ups only</h2><p class="q" data-q="${t*n}">What is ${t} × ${n}?</p>
        <div class="ans">${s||"&nbsp;"}</div>
        <div class="pad">${[1,2,3,4,5,6,7,8,9,"⌫",0,"OK"].map(d=>`<button data-k="${d}">${d}</button>`).join("")}</div>`},c=d=>{i.remove(),e(d)};a.addEventListener("click",d=>{const g=d.target.closest("[data-k]")?.dataset.k;if(g){if(g==="x")return c(!1);if(g==="⌫")s=s.slice(0,-1);else if(g==="OK"){if(+s===t*n)return c(!0);if(++o>=3)return c(!1);a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400),r();return}else s.length<3&&(s+=g);l()}}),i.addEventListener("click",d=>{d.target===i&&c(!1)}),r()})}const Ge="#5a3d5c",re=`stroke="${Ge}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,Ma=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${Ge}"/><circle cx="${t}" cy="${n}" r="3" fill="${Ge}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,La=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,No='<ellipse cx="50" cy="97" rx="34" ry="3" fill="#000" opacity=".12"/>',Yp=`<svg viewBox="0 0 40 30"><path d="M4 30 V16 Q4 2 20 2 Q36 2 36 16 V30 Z" fill="#3b2a3d" ${re}/><circle cx="14" cy="18" r="1.6" fill="#fff" opacity=".8"/><circle cx="22" cy="18" r="1.6" fill="#fff" opacity=".8"/></svg>`,Kp=`<svg viewBox="0 0 48 30"><path d="M4 27 Q10 22 22 23 L42 23 Q46 27 42 28 H6 Z" fill="#cdeccf" ${re}/><circle cx="26" cy="15" r="11" fill="#ffb3c6" ${re}/><path d="M26 15 m-5 0 a5 5 0 1 1 5 5" fill="none" ${re}/><path d="M8 23 L5 13 M12 23 L12 13" ${re}/></svg>`,Xp=`<svg viewBox="0 0 30 30"><path d="M15 2 l3.6 8 8.4 1 -6.3 5.8 1.8 8.4 -7.5 -4.4 -7.5 4.4 1.8 -8.4 L3 11 l8.4 -1z" fill="#fff3b0" ${re}/></svg>`,Jp=`<svg viewBox="0 0 30 22"><ellipse cx="15" cy="13" rx="13" ry="8" fill="#e6b88a" ${re}/><circle cx="10" cy="11" r="1.8" fill="${Ge}"/><circle cx="18" cy="14" r="1.8" fill="${Ge}"/><circle cx="16" cy="9" r="1.5" fill="${Ge}"/></svg>`,e0=`<svg viewBox="0 0 30 28"><path d="M15 26 C3 18 1 10 6 5 C10 1 14 4 15 7 C16 4 20 1 24 5 C29 10 27 18 15 26 Z" fill="#ffc8dd" ${re}/></svg>`,xi=[{name:"Cada",room:"living",x:150,y:382,w:40,h:30,taps:3,spot:Yp,hello:"Squeak! Hi Cada!",item:{kind:"egg:cada-mouse",name:"Cada's Mouse",cat:"secrets",w:80,holdable:!0,svg:`${No}<path d="M78 74 Q96 68 92 52" stroke="#ff9bb5" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="28" ry="18" fill="#d6d6e8" ${re}/><circle cx="28" cy="40" r="13" fill="#d6d6e8" ${re}/><circle cx="62" cy="38" r="13" fill="#d6d6e8" ${re}/><circle cx="28" cy="40" r="7" fill="#ffc8dd"/><circle cx="62" cy="38" r="7" fill="#ffc8dd"/><circle cx="45" cy="56" r="20" fill="#e4e4f2" ${re}/>${Ma(38,52,54)}<circle cx="45" cy="64" r="3" fill="#ff8fab"/>${La(32,58,62)}<text x="50" y="96" font-size="11" font-weight="900" text-anchor="middle" fill="${Ge}">C</text>`}},{name:"Sloane",room:"living",x:2290,y:383,w:48,h:30,taps:3,spot:Kp,hello:"Hi Sloane! ✨",item:{kind:"egg:sloane-snail",name:"Sloane's Rainbow Snail",cat:"secrets",w:110,holdable:!0,svg:`${No}<path d="M6 92 Q14 80 36 82 L84 82 Q94 90 84 94 H10 Z" fill="#cdeccf" ${re}/><circle cx="56" cy="52" r="32" fill="#ff8fab" ${re}/><circle cx="56" cy="52" r="24" fill="#ffd166"/><circle cx="56" cy="52" r="17" fill="#80ed99"/><circle cx="56" cy="52" r="10" fill="#8ecae6"/><circle cx="56" cy="52" r="4" fill="#c9a0dc"/><circle cx="56" cy="52" r="32" fill="none" ${re}/><path d="M14 82 L8 60 M24 82 L24 60" ${re}/><circle cx="8" cy="58" r="4" fill="${Ge}"/><circle cx="24" cy="58" r="4" fill="${Ge}"/>${La(14,30,76)}`}},{name:"Chloe",room:"bedroom",x:2230,y:92,w:30,h:30,taps:5,spot:Xp,item:{kind:"egg:chloe-starlamp",name:"Chloe's Star Lamp",cat:"secrets",w:100,holdable:!0,svg:`${No}<circle cx="50" cy="38" r="34" fill="#fff3b0" opacity=".6"/><path d="M50 6 l8 17 19 2.5 -14 13 4 19 -17 -9.5 -17 9.5 4 -19 -14 -13 19 -2.5z" fill="#ffd166" ${re}/>${Ma(43,57,38)}<path d="M45 46 q5 4 10 0" ${re} fill="none"/><rect x="46" y="66" width="8" height="22" rx="4" fill="#c9a0dc" ${re}/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#b388d6" ${re}/><text x="50" y="93" font-size="8" font-weight="900" text-anchor="middle" fill="#fff">CHLOE</text>`}},{name:"Quinn",room:"kitchen",x:80,y:588,w:30,h:22,taps:4,spot:Jp,hello:"Woof! Hi Quinn!",item:{kind:"egg:quinn-pup",name:"Quinn's Cookie Pup",cat:"secrets",w:110,holdable:!0,svg:`${No}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#e6b88a" ${re}/><circle cx="50" cy="44" r="27" fill="#f2d0a4" ${re}/><ellipse cx="24" cy="46" rx="10" ry="17" fill="#b07d54" ${re}/><ellipse cx="76" cy="46" rx="10" ry="17" fill="#b07d54" ${re}/>${Ma(41,59,42)}<ellipse cx="50" cy="53" rx="5" ry="4" fill="${Ge}"/>${La(34,66,54)}<circle cx="84" cy="80" r="10" fill="#e6b88a" ${re}/><circle cx="81" cy="78" r="1.8" fill="${Ge}"/><circle cx="87" cy="82" r="1.8" fill="${Ge}"/><text x="50" y="30" font-size="10" font-weight="900" text-anchor="middle" fill="${Ge}">Q</text>`}},{name:"Reagan",room:"salon",x:2300,y:352,w:30,h:28,taps:5,spot:e0,item:{kind:"egg:reagan-frame",name:"Reagan's Frame",cat:"secrets",w:120,wall:!0,svg:`<rect x="8" y="10" width="84" height="84" rx="16" fill="#ff8fab" ${re}/><rect x="18" y="20" width="64" height="64" rx="10" fill="#fff3f7" ${re}/><text x="50" y="72" font-size="52" font-weight="900" text-anchor="middle" fill="#e879c6" stroke="${Ge}" stroke-width="2.5">R</text><circle cx="14" cy="16" r="6" fill="#ffd166" ${re}/><circle cx="86" cy="88" r="6" fill="#ffd166" ${re}/><path d="M76 24 l2 4 4 .5 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.5z" fill="#ffd166"/>`}}],t0=xi.map(e=>({...e.item,rooms:["any"],secret:e.name})),yd=vt("cozy-secrets"),na=()=>{try{return new Set(JSON.parse(localStorage.getItem(yd)??"[]"))}catch{return new Set}},n0=e=>localStorage.setItem(yd,JSON.stringify([...e]));function s0(e){const t=document.createElement("div");t.className="eggs",e.world.appendChild(t);const n=new Map;for(const o of xi){const i=document.createElement("div");i.className="eggspot",i.dataset.egg=o.name,i.style.left=(o.x-o.w/2)/e.roomW*100+"%",i.style.top=(o.y-o.h)/e.roomH*100+"%",i.style.width=o.w/e.roomW*100+"%",i.style.height=o.h/e.roomH*100+"%",i.innerHTML=o.spot,t.appendChild(i),i.addEventListener("pointerdown",a=>a.stopPropagation()),i.addEventListener("click",a=>{a.stopPropagation();const r=Date.now(),l=n.get(o.name)??{n:0,t:0};if(l.n=r-l.t<1500?l.n+1:1,l.t=r,n.set(o.name,l),i.classList.remove("poke"),i.offsetWidth,i.classList.add("poke"),e.tap(),l.n<o.taps)return;l.n=0;const c=na(),d=!c.has(o.name);c.add(o.name),n0(c),o0(o,i),e.sparkle(),e.onFound(o.name,d)})}const s=()=>{const o=e.currentRoom();t.querySelectorAll(".eggspot").forEach(i=>{i.style.display=xi.find(a=>a.name===i.dataset.egg).room===o?"":"none"})};return s(),{update:s}}function o0(e,t){if(e.hello){const s=document.createElement("div");s.className="eggpop",s.innerHTML=`<div class="eggcritter"><svg viewBox="0 0 100 100">${e.item.svg}</svg></div><div class="bubble">${e.hello}</div>`,t.appendChild(s),setTimeout(()=>s.remove(),3200)}const n=document.createElement("div");n.className="eggbanner",n.innerHTML=`<span class="sp">✨</span><span class="nm">${[...e.name].map((s,o)=>`<i style="animation-delay:${o*70}ms">${s}</i>`).join("")}</span><span class="sp">✨</span>`,document.body.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3100),kd()}function kd(e=70){const t=["#ff8fab","#ffd166","#8ecae6","#80ed99","#c9a0dc","#ff9f68"],n=document.createElement("div");n.className="confetti",document.body.appendChild(n);for(let s=0;s<e;s++){const o=document.createElement("i");o.style.left=Math.random()*100+"vw",o.style.background=t[s%t.length],o.style.animationDelay=Math.random()*.5+"s",o.style.animationDuration=1.6+Math.random()*1.2+"s",o.style.setProperty("--r",Math.random()*720-360+"deg"),o.style.setProperty("--dx",Math.random()*160-80+"px"),s%3===0&&(o.style.borderRadius="50%"),n.appendChild(o)}setTimeout(()=>n.remove(),3600)}const i0=`[
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
`,a0=`[
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
]`,r0="/kids-house-game/assets/alarm-clock-DOVobLzL.png",l0="/kids-house-game/assets/alarm-clock-BCd1-e86.svg",c0="/kids-house-game/assets/bedtime-snack-COvX4Nqo.png",d0="/kids-house-game/assets/bedtime-snack-BoNDQqOK.svg",g0="/kids-house-game/assets/book-stack-BlyqbTA1.png",f0="/kids-house-game/assets/book-stack-upnp1NwG.svg",h0="/kids-house-game/assets/bunk-bed-COiQly1s.png",p0="/kids-house-game/assets/bunk-bed-YZiRWNFR.svg",u0="/kids-house-game/assets/bunny-slippers-DajXa_JK.png",m0="/kids-house-game/assets/bunny-slippers-PNucIc_Q.svg",y0="/kids-house-game/assets/canopy-bed-Db9GIfyT.png",k0="/kids-house-game/assets/canopy-bed-BwWkRhe2.svg",b0="/kids-house-game/assets/cat-bed-ChP4s69B.png",v0="/kids-house-game/assets/cat-bed-B8ULFbHc.svg",w0="/kids-house-game/assets/cloud-rug-Bv3GScgR.png",$0="/kids-house-game/assets/cloud-rug-CFl6aZc5.svg",x0="/kids-house-game/assets/cloud-shelf-BAmU3DSp.png",_0="/kids-house-game/assets/cloud-shelf-DF5b_IoZ.svg",M0="/kids-house-game/assets/cork-board-B8yw-MFd.png",L0="/kids-house-game/assets/cork-board-Bj5OuLbv.svg",C0="/kids-house-game/assets/daisy-pot-BQDVlAug.png",S0="/kids-house-game/assets/daisy-pot-Cy8SrSS6.svg",B0="/kids-house-game/assets/desk-UTaBcI2Q.png",H0="/kids-house-game/assets/desk-2rRtV3Vk.svg",P0="/kids-house-game/assets/dino-plush-yhz7rVZD.png",W0="/kids-house-game/assets/dino-plush-Dq_qccf0.svg",T0="/kids-house-game/assets/doll-house-DfYMaHqJ.png",R0="/kids-house-game/assets/doll-house-BrC3RiST.svg",U0="/kids-house-game/assets/dresser-jJcAkDG_.png",E0="/kids-house-game/assets/dresser-__9TGuYc.svg",Q0="/kids-house-game/assets/egg-chair-DobnnZdC.png",A0="/kids-house-game/assets/egg-chair-CtiaqWNQ.svg",z0="/kids-house-game/assets/floor-fan-C2R5oDHp.png",D0="/kids-house-game/assets/floor-fan-Dt9SIAmB.svg",Z0="/kids-house-game/assets/guinea-pig-BzHyXlGo.png",q0="/kids-house-game/assets/guinea-pig-CwLeNU_S.svg",I0="/kids-house-game/assets/hamster-cage-zv59jo6b.png",O0="/kids-house-game/assets/hamster-cage-lQ6r7saV.svg",N0="/kids-house-game/assets/heart-rug-DYGPCKpT.png",j0="/kids-house-game/assets/heart-rug-CBDvH6Q6.svg",F0="/kids-house-game/assets/lava-lamp-Df-lJpLx.png",V0="/kids-house-game/assets/lava-lamp-DEuHvlco.svg",G0="/kids-house-game/assets/moon-night-light-JPI5SkUV.png",Y0="/kids-house-game/assets/moon-night-light-CAKsjYZv.svg",K0="/kids-house-game/assets/nightstand-D3WOPlqw.png",X0="/kids-house-game/assets/nightstand-Bgsh0YUi.svg",J0="/kids-house-game/assets/paper-lantern-mpw1jXzL.png",eu="/kids-house-game/assets/paper-lantern-CErOGyrT.svg",tu="/kids-house-game/assets/piggy-bank-DaSktUUA.png",nu="/kids-house-game/assets/piggy-bank-DsHrmOcp.svg",su="/kids-house-game/assets/plant-stand-BpU338ra.png",ou="/kids-house-game/assets/plant-stand-DDyIDaL0.svg",iu="/kids-house-game/assets/play-tent-ih6xOGXC.png",au="/kids-house-game/assets/play-tent-Bsawe52j.svg",ru="/kids-house-game/assets/star-mobile-Bqyd_ikl.png",lu="/kids-house-game/assets/star-mobile-DzOGs-Jo.svg",cu="/kids-house-game/assets/toy-chest-DhEoVFj0.png",du="/kids-house-game/assets/toy-chest-6iPrDiZH.svg",gu="/kids-house-game/assets/toy-robot-Bfkjfj_6.png",fu="/kids-house-game/assets/toy-robot-OaCEwmDT.svg",hu="/kids-house-game/assets/toy-train-DILjZiya.png",pu="/kids-house-game/assets/toy-train-D5GqAnpy.svg",uu="/kids-house-game/assets/unicorn-plush-5YQqQjND.png",mu="/kids-house-game/assets/unicorn-plush-C0W1eEs9.svg",yu="/kids-house-game/assets/wardrobe-sJcJSWZ2.png",ku="/kids-house-game/assets/wardrobe-Dn492IK0.svg",bu="/kids-house-game/assets/bananas-D4irRkGy.png",vu="/kids-house-game/assets/bananas-aPQwdEVo.svg",wu="/kids-house-game/assets/bar-stool-xbwaa01H.png",$u="/kids-house-game/assets/bar-stool-DWxhX1Ah.svg",xu="/kids-house-game/assets/bread-loaf-DKmR5wPN.png",_u="/kids-house-game/assets/bread-loaf-C9cEAYcl.svg",Mu="/kids-house-game/assets/chick-DCnoMwEt.png",Lu="/kids-house-game/assets/chick-BTEVfgqU.svg",Cu="/kids-house-game/assets/china-hutch-K3xtlmqi.png",Su="/kids-house-game/assets/china-hutch-BTmMY6rg.svg",Bu="/kids-house-game/assets/cocoa-mug-BmqSzNJ6.png",Hu="/kids-house-game/assets/cocoa-mug-CraNCc9b.svg",Pu="/kids-house-game/assets/cookie-jar-CZsO9PSp.png",Wu="/kids-house-game/assets/cookie-jar-ripj0oyT.svg",Tu="/kids-house-game/assets/cooking-pot-BSKPlqyT.png",Ru="/kids-house-game/assets/cooking-pot-BWtfOm9f.svg",Uu="/kids-house-game/assets/cupcake-KO1KLKav.png",Eu="/kids-house-game/assets/cupcake-DFCw42xb.svg",Qu="/kids-house-game/assets/dish-rack-DICSEn5E.png",Au="/kids-house-game/assets/dish-rack-BpVmmU6k.svg",zu="/kids-house-game/assets/fruit-bowl-BL5EkaC8.png",Du="/kids-house-game/assets/fruit-bowl-Dw9lsB3B.svg",Zu="/kids-house-game/assets/frying-pan-BocrLcES.png",qu="/kids-house-game/assets/frying-pan-CTBY6MC_.svg",Iu="/kids-house-game/assets/happy-fridge-BTbpm-W1.png",Ou="/kids-house-game/assets/happy-fridge-D7ENuEJs.svg",Nu="/kids-house-game/assets/herb-box-DFtC2qBN.png",ju="/kids-house-game/assets/herb-box-CdRxefnV.svg",Fu="/kids-house-game/assets/high-chair-DZCqRJV8.png",Vu="/kids-house-game/assets/high-chair-BQtLYlq4.svg",Gu="/kids-house-game/assets/ice-cream-CLLMXjn9.png",Yu="/kids-house-game/assets/ice-cream-DydSyNXx.svg",Ku="/kids-house-game/assets/kettle-DScYOeEK.png",Xu="/kids-house-game/assets/kettle-D1nuAiG_.svg",Ju="/kids-house-game/assets/kitchen-counter-cZcDRQIw.png",em="/kids-house-game/assets/kitchen-counter-C8sTAZ-V.svg",tm="/kids-house-game/assets/kitchen-sink-DrP43iga.png",nm="/kids-house-game/assets/kitchen-sink-CYjDcd1n.svg",sm="/kids-house-game/assets/lemon-tree-BwA7W0cM.png",om="/kids-house-game/assets/lemon-tree-CZz-Vy3P.svg",im="/kids-house-game/assets/microwave-BJRDd-L-.png",am="/kids-house-game/assets/microwave-lopm-FCT.svg",rm="/kids-house-game/assets/milk-bottle-D7UB6VD8.png",lm="/kids-house-game/assets/milk-bottle-DxcUA6XT.svg",cm="/kids-house-game/assets/pancakes-CbisCK-C.png",dm="/kids-house-game/assets/pancakes-CLqxnc5R.svg",gm="/kids-house-game/assets/pantry-shelf-DI_CgvVD.png",fm="/kids-house-game/assets/pantry-shelf-Azdxpmzd.svg",hm="/kids-house-game/assets/pendant-lamp-BhZanag5.png",pm="/kids-house-game/assets/pendant-lamp-fZv6y1p0.svg",um="/kids-house-game/assets/pet-bowl-Oe3KGELz.png",mm="/kids-house-game/assets/pet-bowl-ETL_EOAP.svg",ym="/kids-house-game/assets/rice-cooker-DUTXsBbb.png",km="/kids-house-game/assets/rice-cooker-JX0L4bi2.svg",bm="/kids-house-game/assets/runner-rug-AYIsQudU.png",vm="/kids-house-game/assets/runner-rug-BbUgZFy4.svg",wm="/kids-house-game/assets/spice-rack-8ll-6Q2f.png",$m="/kids-house-game/assets/spice-rack-D9kAw-vT.svg",xm="/kids-house-game/assets/stand-mixer-CP2fpC-Q.png",_m="/kids-house-game/assets/stand-mixer-CZrLn00l.svg",Mm="/kids-house-game/assets/teapot-iFnJNGiA.png",Lm="/kids-house-game/assets/teapot-CtPOJzEm.svg",Cm="/kids-house-game/assets/toaster-T2WkZkdo.png",Sm="/kids-house-game/assets/toaster-CNk0hJDw.svg",Bm="/kids-house-game/assets/utensil-rail-_vjcgBpy.png",Hm="/kids-house-game/assets/utensil-rail-B0QkGP3A.svg",Pm="/kids-house-game/assets/watermelon-slice-yHBcfKGj.png",Wm="/kids-house-game/assets/watermelon-slice-VzvgalD5.svg",Tm="/kids-house-game/assets/aquarium-rYRAu69m.png",Rm="/kids-house-game/assets/aquarium-BlhJ9UCr.svg",Um="/kids-house-game/assets/arc-floor-lamp-CBq3G9j8.png",Em="/kids-house-game/assets/arc-floor-lamp-DL5cEVzq.svg",Qm="/kids-house-game/assets/bean-bag-CMLYRsbz.png",Am="/kids-house-game/assets/bean-bag-CauyDuZQ.svg",zm="/kids-house-game/assets/bird-cage-qj5P0te2.png",Dm="/kids-house-game/assets/bird-cage-xqeVahX7.svg",Zm="/kids-house-game/assets/blanket-basket-5IQiUSS2.png",qm="/kids-house-game/assets/blanket-basket-B4LREUo9.svg",Im="/kids-house-game/assets/building-blocks-CzqAFUNB.png",Om="/kids-house-game/assets/building-blocks-DbtoodPT.svg",Nm="/kids-house-game/assets/coffee-table-iKZ20Gpy.png",jm="/kids-house-game/assets/coffee-table-ZYO2ApH6.svg",Fm="/kids-house-game/assets/comfy-armchair-U_SI3sk9.png",Vm="/kids-house-game/assets/comfy-armchair-tjNYbfgO.svg",Gm="/kids-house-game/assets/cubby-shelf-B0De91CO.png",Ym="/kids-house-game/assets/cubby-shelf-CLzTUpiz.svg",Km="/kids-house-game/assets/daisy-rug-BqSOjPlJ.png",Xm="/kids-house-game/assets/daisy-rug-CvOlxjsu.svg",Jm="/kids-house-game/assets/fiddle-leaf-fig-DnvG8l2j.png",e1="/kids-house-game/assets/fiddle-leaf-fig-DiUNW4Q_.svg",t1="/kids-house-game/assets/fireplace-C9azNipx.png",n1="/kids-house-game/assets/fireplace-CqxIMN3Z.svg",s1="/kids-house-game/assets/globe-C-L7vS0t.png",o1="/kids-house-game/assets/globe-DN0sih3W.svg",i1="/kids-house-game/assets/hanging-planter-DGgUXZpP.png",a1="/kids-house-game/assets/hanging-planter-M9IHqztp.svg",r1="/kids-house-game/assets/monstera-plant-BbGZQtOh.png",l1="/kids-house-game/assets/monstera-plant-CLmuB_RM.svg",c1="/kids-house-game/assets/piano-DpS7nvdq.png",d1="/kids-house-game/assets/piano-Y0KQ4rD2.svg",g1="/kids-house-game/assets/popcorn-CFk12JbR.png",f1="/kids-house-game/assets/popcorn-BD2d8sUH.svg",h1="/kids-house-game/assets/pouf-DY0Vcx75.png",p1="/kids-house-game/assets/pouf-as0li8On.svg",u1="/kids-house-game/assets/rainbow-rug-DwzLb6aY.png",m1="/kids-house-game/assets/rainbow-rug-C5ZVauOA.svg",y1="/kids-house-game/assets/rainbow-wall-art--5LLrrQJ.png",k1="/kids-house-game/assets/rainbow-wall-art-CCXUPPen.svg",b1="/kids-house-game/assets/retro-radio-BIX4GYkL.png",v1="/kids-house-game/assets/retro-radio-B3T98xMQ.svg",w1="/kids-house-game/assets/rocking-chair-CDLlJFiP.png",$1="/kids-house-game/assets/rocking-chair-BgoIQu5H.svg",x1="/kids-house-game/assets/rocking-horse-Iz-CpscK.png",_1="/kids-house-game/assets/rocking-horse-1WLLV43R.svg",M1="/kids-house-game/assets/snake-plant-DgPna4k9.png",L1="/kids-house-game/assets/snake-plant-BGDwPcMj.svg",C1="/kids-house-game/assets/string-lights-nDUZa5m1.png",S1="/kids-house-game/assets/string-lights-DGC0Ni2I.svg",B1="/kids-house-game/assets/succulent-trio-VYNH-o5B.png",H1="/kids-house-game/assets/succulent-trio-uPD-ljlL.svg",P1="/kids-house-game/assets/tassel-rug-BBXtknxh.png",W1="/kids-house-game/assets/tassel-rug-DolXtxfQ.svg",T1="/kids-house-game/assets/throw-pillow-BjuGXMYA.png",R1="/kids-house-game/assets/throw-pillow-qWyWQ9cT.svg",U1="/kids-house-game/assets/toy-car-Bwrt0-AT.png",E1="/kids-house-game/assets/toy-car-CTJy5H4V.svg",Q1="/kids-house-game/assets/tulip-vase-CpQUgXPR.png",A1="/kids-house-game/assets/tulip-vase-o2vjI1Hg.svg",z1="/kids-house-game/assets/turtle-Bf8_yRql.png",D1="/kids-house-game/assets/turtle-B9Y6NDSv.svg",Z1="/kids-house-game/assets/tv-stand-DnwT-hn4.png",q1="/kids-house-game/assets/tv-stand-CcLHFc1J.svg",I1="/kids-house-game/assets/wall-shelf-Bs6mROe1.png",O1="/kids-house-game/assets/wall-shelf-CCWuZ6Xl.svg",N1="/kids-house-game/assets/cc-bakery-shelf-dMrnZVB3.png",j1="/kids-house-game/assets/cc-bakery-shelf-BxdhLTTC.svg",F1="/kids-house-game/assets/cc-breakfast-table-DwHbMV2p.png",V1="/kids-house-game/assets/cc-breakfast-table-DwaO0eFy.svg",G1="/kids-house-game/assets/cc-bubble-chair-DuDi-bRz.png",Y1="/kids-house-game/assets/cc-bubble-chair-DncHA7F-.svg",K1="/kids-house-game/assets/cc-canopy-daybed-CAZpSo2a.png",X1="/kids-house-game/assets/cc-canopy-daybed-CVbt6QDr.svg",J1="/kids-house-game/assets/cc-cloud-beanbag-BYcBLKf9.png",e2="/kids-house-game/assets/cc-cloud-beanbag-SM0m-3qY.svg",t2="/kids-house-game/assets/cc-cloud-lamp-v0UO1VrK.png",n2="/kids-house-game/assets/cc-cloud-lamp-BWwxoCux.svg",s2="/kids-house-game/assets/cc-cottage-aquarium-XYuN1CnR.png",o2="/kids-house-game/assets/cc-cottage-aquarium-iY2D26Vq.svg",i2="/kids-house-game/assets/cc-cupcake-stand-jKA3zoCC.png",a2="/kids-house-game/assets/cc-cupcake-stand-B08kdXZL.svg",r2="/kids-house-game/assets/cc-dryer-chair-CP8q6yyq.png",l2="/kids-house-game/assets/cc-dryer-chair-DQmosxUz.svg",c2="/kids-house-game/assets/cc-fairy-garland-B4DVLP6L.png",d2="/kids-house-game/assets/cc-fairy-garland-BncKvkRL.svg",g2="/kids-house-game/assets/cc-fairy-shelf-DSmhC08i.png",f2="/kids-house-game/assets/cc-fairy-shelf-CE6x7J1w.svg",h2="/kids-house-game/assets/cc-flower-kettle-DZFkbEk5.png",p2="/kids-house-game/assets/cc-flower-kettle-ZTbAh26L.svg",u2="/kids-house-game/assets/cc-flower-lamp-hc1e4xxL.png",m2="/kids-house-game/assets/cc-flower-lamp-CS2T2S89.svg",y2="/kids-house-game/assets/cc-heart-bed-BtOx4_a4.png",k2="/kids-house-game/assets/cc-heart-bed-76-z9nJg.svg",b2="/kids-house-game/assets/cc-heart-clock-CLtzUj8w.png",v2="/kids-house-game/assets/cc-heart-clock-ByixSFru.svg",w2="/kids-house-game/assets/cc-heart-pouf-C3vCLnoM.png",$2="/kids-house-game/assets/cc-heart-pouf-DH5J2s2J.svg",x2="/kids-house-game/assets/cc-heart-rug-CpvyM_wf.png",_2="/kids-house-game/assets/cc-heart-rug-Jwmh-m0j.svg",M2="/kids-house-game/assets/cc-jewel-box-DZ6IxYiU.png",L2="/kids-house-game/assets/cc-jewel-box-qMbIQmo4.svg",C2="/kids-house-game/assets/cc-light-vanity-BxKLJiVW.png",S2="/kids-house-game/assets/cc-light-vanity-DD4uQJ_7.svg",B2="/kids-house-game/assets/cc-macaron-jar-NI43JiPM.png",H2="/kids-house-game/assets/cc-macaron-jar-A0sT-Lvj.svg",P2="/kids-house-game/assets/cc-macrame-swing-x8sop4y4.png",W2="/kids-house-game/assets/cc-macrame-swing-qIcoPp0o.svg",T2="/kids-house-game/assets/cc-mani-chair-C1J_zCFX.png",R2="/kids-house-game/assets/cc-mani-chair-7AWb60tv.svg",U2="/kids-house-game/assets/cc-mint-fridge-7zQk2-Kj.png",E2="/kids-house-game/assets/cc-mint-fridge-Cc87e_gW.svg",Q2="/kids-house-game/assets/cc-mushroom-stool-DeoO7P27.png",A2="/kids-house-game/assets/cc-mushroom-stool-B9-y9WNf.svg",z2="/kids-house-game/assets/cc-pastel-range-CXu-Gr6f.png",D2="/kids-house-game/assets/cc-pastel-range-D6cjzJTl.svg",Z2="/kids-house-game/assets/cc-perfume-tray-DkUHaA_i.png",q2="/kids-house-game/assets/cc-perfume-tray-DN4chcIn.svg",I2="/kids-house-game/assets/cc-petal-table-DadCDnSy.png",O2="/kids-house-game/assets/cc-petal-table-QrNho7KH.svg",N2="/kids-house-game/assets/cc-plant-wall-CCxqRxsH.png",j2="/kids-house-game/assets/cc-plant-wall-BMii8_kR.svg",F2="/kids-house-game/assets/cc-reading-nook-Eq4Eh0MW.png",V2="/kids-house-game/assets/cc-reading-nook-wiDgasP8.svg",G2="/kids-house-game/assets/cc-record-player-LmfaPaE5.png",Y2="/kids-house-game/assets/cc-record-player-BoxZhHLy.svg",K2="/kids-house-game/assets/cc-ribbon-mirror-BEsGok51.png",X2="/kids-house-game/assets/cc-ribbon-mirror-DiCje_iy.svg",J2="/kids-house-game/assets/cc-scallop-curtains-Cvab-FzV.png",ey="/kids-house-game/assets/cc-scallop-curtains-Bzhy2peV.svg",ty="/kids-house-game/assets/cc-scallop-loveseat-CR3Z2O-W.png",ny="/kids-house-game/assets/cc-scallop-loveseat-Dfi7dg3b.svg",sy="/kids-house-game/assets/cc-star-dresser-b15t-WLI.png",oy="/kids-house-game/assets/cc-star-dresser-2wqSnsip.svg",iy="/kids-house-game/assets/cc-teapot-set-ygQBLdbl.png",ay="/kids-house-game/assets/cc-teapot-set-DnZlJvn7.svg",ry="/kids-house-game/assets/cc-window-seat-D-Rfuuwm.png",ly="/kids-house-game/assets/cc-window-seat-BCOise4Z.svg",cy="/kids-house-game/assets/arched-shelf-Dt4oWiBK.png",dy="/kids-house-game/assets/arched-shelf-XtiqRVaT.svg",gy="/kids-house-game/assets/blob-rug-Ckw1kSsa.png",fy="/kids-house-game/assets/blob-rug-Deh5k10s.svg",hy="/kids-house-game/assets/bubbly-plant-CV9ioei6.png",py="/kids-house-game/assets/bubbly-plant-CFTOJd5Y.svg",uy="/kids-house-game/assets/bud-vase-Bzj5qGgr.png",my="/kids-house-game/assets/bud-vase-BF-nd69Q.svg",yy="/kids-house-game/assets/comb-brush-CfTGGk1L.png",ky="/kids-house-game/assets/comb-brush-oPJeQv0v.svg",by="/kids-house-game/assets/cream-jars-dLRXypJR.png",vy="/kids-house-game/assets/cream-jars-D6bxrnJR.svg",wy="/kids-house-game/assets/drop-lamp-DWqiPjZB.png",$y="/kids-house-game/assets/drop-lamp-CJg63ZKz.svg",xy="/kids-house-game/assets/droplet-buddy-DCjbvrlK.png",_y="/kids-house-game/assets/droplet-buddy-DTpHggFh.svg",My="/kids-house-game/assets/fancy-sofa-BRlr2j8I.png",Ly="/kids-house-game/assets/fancy-sofa-kq2L0ob5.svg",Cy="/kids-house-game/assets/flower-cart-C3W7v2RD.png",Sy="/kids-house-game/assets/flower-cart-BWgfg0s_.svg",By="/kids-house-game/assets/foot-spa-HwiSNgdS.png",Hy="/kids-house-game/assets/foot-spa-DdA5_fj_.svg",Py="/kids-house-game/assets/globe-pendants-ChKRw_Bp.png",Wy="/kids-house-game/assets/globe-pendants-DNV5WnAO.svg",Ty="/kids-house-game/assets/glow-mirror-D4P3UibJ.png",Ry="/kids-house-game/assets/glow-mirror-C_dTGwQc.svg",Uy="/kids-house-game/assets/gold-floor-mirror-CSYqaszS.png",Ey="/kids-house-game/assets/gold-floor-mirror-jfPQepmr.svg",Qy="/kids-house-game/assets/hair-dryer-_nFRnXBv.png",Ay="/kids-house-game/assets/hair-dryer-CAkhCf7J.svg",zy="/kids-house-game/assets/heart-plant-CN47o4my.png",Dy="/kids-house-game/assets/heart-plant-fSU4uLVy.svg",Zy="/kids-house-game/assets/heart-pouf-b76ZFT07.png",qy="/kids-house-game/assets/heart-pouf-BMVPBVKJ.svg",Iy="/kids-house-game/assets/lilac-curtain-94MUZIqr.png",Oy="/kids-house-game/assets/lilac-curtain-D_mFsZKu.svg",Ny="/kids-house-game/assets/lotion-trio-wGXg7qdC.png",jy="/kids-house-game/assets/lotion-trio-D3lKwvho.svg",Fy="/kids-house-game/assets/mani-lamp-B6MLP1xK.png",Vy="/kids-house-game/assets/mani-lamp-B4SmvhvS.svg",Gy="/kids-house-game/assets/nail-table-CP0_pEA8.png",Yy="/kids-house-game/assets/nail-table-C3FitmuG.svg",Ky="/kids-house-game/assets/pebble-rug-BgHMxQ6Q.png",Xy="/kids-house-game/assets/pebble-rug-DHBZUggl.svg",Jy="/kids-house-game/assets/perfume-bottle-F_MkREQh.png",e4="/kids-house-game/assets/perfume-bottle-BcNXSWTW.svg",t4="/kids-house-game/assets/pink-fountain-DtB69ljQ.png",n4="/kids-house-game/assets/pink-fountain-DQ3CIetr.svg",s4="/kids-house-game/assets/pink-vanity-CPmOesS7.png",o4="/kids-house-game/assets/pink-vanity-qE3SwdD6.svg",i4="/kids-house-game/assets/polish-bottle-B2f4PsGZ.png",a4="/kids-house-game/assets/polish-bottle-VWed8EQ-.svg",r4="/kids-house-game/assets/polish-rack-ANlncwDe.png",l4="/kids-house-game/assets/polish-rack-8Ph2n2nM.svg",c4="/kids-house-game/assets/reception-desk-DnhqgkHu.png",d4="/kids-house-game/assets/reception-desk-D4Gevx64.svg",g4="/kids-house-game/assets/salon-chair-Bl31ZE_E.png",f4="/kids-house-game/assets/salon-chair-Wj2sOSW8.svg",h4="/kids-house-game/assets/scent-candle-BYUsO9s1.png",p4="/kids-house-game/assets/scent-candle-BEUE-6Uv.svg",u4="/kids-house-game/assets/spray-bottle-DJKZeNmL.png",m4="/kids-house-game/assets/spray-bottle-Bc8iuceJ.svg",y4="/kids-house-game/assets/star-wall-sign-D_9XhB91.png",k4="/kids-house-game/assets/star-wall-sign-DvenTqvU.svg",b4="/kids-house-game/assets/swivel-stool-BGAwWXNX.png",v4="/kids-house-game/assets/swivel-stool-P-Egqq_Z.svg",w4="/kids-house-game/assets/tiered-tray-CGuVyK1K.png",$4="/kids-house-game/assets/tiered-tray-DLnZTsUF.svg",x4="/kids-house-game/assets/towel-cart-5At-syZP.png",_4="/kids-house-game/assets/towel-cart-DJmR97UL.svg",M4="/kids-house-game/assets/towel-stack-D-pX5koc.png",L4="/kids-house-game/assets/towel-stack-C1qplZ4T.svg",C4="/kids-house-game/assets/vine-planter-mviuZvkw.png",S4="/kids-house-game/assets/vine-planter-Duhx9OMZ.svg",B4="/kids-house-game/assets/waiting-bench-DXbi7ObC.png",H4="/kids-house-game/assets/waiting-bench-BQuoXbE3.svg",P4="/kids-house-game/assets/wash-chair-CJo64U_O.png",W4="/kids-house-game/assets/wash-chair-sdgNnj79.svg",T4="/kids-house-game/assets/arched-mirror-2vakzmQ8.png",R4="/kids-house-game/assets/arched-mirror-ClJgTBd9.svg",U4="/kids-house-game/assets/big-monitor-BRiCdofl.png",E4="/kids-house-game/assets/big-monitor-jx5PnUa_.svg",Q4="/kids-house-game/assets/boba-cup-Dn_S1oAa.png",A4="/kids-house-game/assets/boba-cup-CwUerXNm.svg",z4="/kids-house-game/assets/bubble-bath-D4AZavWB.png",D4="/kids-house-game/assets/bubble-bath-8VwrkImA.svg",Z4="/kids-house-game/assets/cactus-buddy-D_lAS12Y.png",q4="/kids-house-game/assets/cactus-buddy-D3uacuVA.svg",I4="/kids-house-game/assets/caterpillar-plush-vK3r58Ch.png",O4="/kids-house-game/assets/caterpillar-plush-BhR8Pydf.svg",N4="/kids-house-game/assets/checker-bed-DD4Ra6RV.png",j4="/kids-house-game/assets/checker-bed-mtuxfPje.svg",F4="/kids-house-game/assets/checker-rug-C9Gs09p_.png",V4="/kids-house-game/assets/checker-rug-CmSO3Y4j.svg",G4="/kids-house-game/assets/clothes-rail-CJ8Du1xN.png",Y4="/kids-house-game/assets/clothes-rail-BY-f9coz.svg",K4="/kids-house-game/assets/cloud-sofa-3eVlcAzs.png",X4="/kids-house-game/assets/cloud-sofa-CZS1Y5s-.svg",J4="/kids-house-game/assets/cube-shelf-DPFNgFhk.png",e6="/kids-house-game/assets/cube-shelf-DoI0tLGL.svg",t6="/kids-house-game/assets/curvy-desk-BxyVtcg3.png",n6="/kids-house-game/assets/curvy-desk-eWCvec1f.svg",s6="/kids-house-game/assets/cute-speaker-Cy7ml0bm.png",o6="/kids-house-game/assets/cute-speaker-DrVF9uns.svg",i6="/kids-house-game/assets/desk-lamp-B39R5SBQ.png",a6="/kids-house-game/assets/desk-lamp-C-VtrE1V.svg",r6="/kids-house-game/assets/desk-mic-C-4XirP6.png",l6="/kids-house-game/assets/desk-mic-BqYzh6ma.svg",c6="/kids-house-game/assets/flower-lamp-DyDRXGpR.png",d6="/kids-house-game/assets/flower-lamp-Dpz6tQ2x.svg",g6="/kids-house-game/assets/frog-plush-NmeU5sHZ.png",f6="/kids-house-game/assets/frog-plush-BhkTrE24.svg",h6="/kids-house-game/assets/game-controller-B6phnmU4.png",p6="/kids-house-game/assets/game-controller-6gvwykQG.svg",u6="/kids-house-game/assets/gaming-chair-B7ZnwG2W.png",m6="/kids-house-game/assets/gaming-chair-BCyGMzy0.svg",y6="/kids-house-game/assets/hamster-pet-C09aLs5N.png",k6="/kids-house-game/assets/hamster-pet-LBcghoJj.svg",b6="/kids-house-game/assets/headphones-MRHfNh-e.png",v6="/kids-house-game/assets/headphones-Cjjqt_92.svg",w6="/kids-house-game/assets/heart-light-B6LXGE4j.png",$6="/kids-house-game/assets/heart-light-DfDwRHju.svg",x6="/kids-house-game/assets/keyboard-Dvxz1PEW.png",_6="/kids-house-game/assets/keyboard-Cbtwvtj1.svg",M6="/kids-house-game/assets/mini-fridge-DgYceOBW.png",L6="/kids-house-game/assets/mini-fridge-qdNm4NKf.svg",C6="/kids-house-game/assets/pastel-wardrobe-CFIOdtrx.png",S6="/kids-house-game/assets/pastel-wardrobe-BubkWAN2.svg",B6="/kids-house-game/assets/phone-stand-CWfRuwT_.png",H6="/kids-house-game/assets/phone-stand-VLW-DsK-.svg",P6="/kids-house-game/assets/pothos-plant-mnKAaH_K.png",W6="/kids-house-game/assets/pothos-plant-C1I15M9a.svg",T6="/kids-house-game/assets/puffy-stool-B5z3sd2l.png",R6="/kids-house-game/assets/puffy-stool-CwjoblCa.svg",U6="/kids-house-game/assets/ring-light-BoqM9Lks.png",E6="/kids-house-game/assets/ring-light-CdxNAXA6.svg",Q6="/kids-house-game/assets/side-table-round-x1NbWzDq.png",A6="/kids-house-game/assets/side-table-round-rCsBU0YO.svg",z6="/kids-house-game/assets/star-lamp-Bocs3YRP.png",D6="/kids-house-game/assets/star-lamp-CHKQnzvB.svg",Z6="/kids-house-game/assets/sticker-board-CMn2BF_D.png",q6="/kids-house-game/assets/sticker-board-LUm1_I_P.svg",I6="/kids-house-game/assets/sunny-art-372bwMLG.png",O6="/kids-house-game/assets/sunny-art-C25M7k02.svg",N6="/kids-house-game/assets/sv-bean-bag-DlsJBRMG.png",j6="/kids-house-game/assets/sv-bean-bag-DdsCYd4e.svg",F6="/kids-house-game/assets/sv-cloud-rug-Bo5aP_HP.png",V6="/kids-house-game/assets/sv-cloud-rug-BvczSj77.svg",G6="/kids-house-game/assets/sv-wall-shelf-C61Y5OFn.png",Y6="/kids-house-game/assets/sv-wall-shelf-BtJLzNMg.svg",K6="/kids-house-game/assets/vlog-camera-DAiD7LSW.png",X6="/kids-house-game/assets/vlog-camera-CBd28A7P.svg",J6="/kids-house-game/assets/wavy-floor-lamp-1BJBLV8q.png",ek="/kids-house-game/assets/wavy-floor-lamp-Iy8llzr8.svg",tk="/kids-house-game/assets/acorn-friend-SMoU5de2.png",nk="/kids-house-game/assets/acorn-friend-BsLiZ2Z_.svg",sk="/kids-house-game/assets/apple-tree-CN7tYao3.png",ok="/kids-house-game/assets/apple-tree-DGIUIjY1.svg",ik="/kids-house-game/assets/big-wardrobe-DcZpROWW.png",ak="/kids-house-game/assets/big-wardrobe-BnfnkPXl.svg",rk="/kids-house-game/assets/box-stack-DBdO-RRV.png",lk="/kids-house-game/assets/box-stack-ji13G2mP.svg",ck="/kids-house-game/assets/brick-fireplace-CxelyhgA.png",dk="/kids-house-game/assets/brick-fireplace-BGCbiSK5.svg",gk="/kids-house-game/assets/bulletin-board-BWUCktvK.png",fk="/kids-house-game/assets/bulletin-board-DqA69wQH.svg",hk="/kids-house-game/assets/cozy-mug-DGMQRJK7.png",pk="/kids-house-game/assets/cozy-mug-CFJEPRKb.svg",uk="/kids-house-game/assets/cream-sofa-Dzaz9Eg9.png",mk="/kids-house-game/assets/cream-sofa-CB4EWIDp.svg",yk="/kids-house-game/assets/fire-pit-FhRYTkJU.png",kk="/kids-house-game/assets/fire-pit-B1yBwTwI.svg",bk="/kids-house-game/assets/glass-cabinet-C1Dud5Om.png",vk="/kids-house-game/assets/glass-cabinet-BCHExP4F.svg",wk="/kids-house-game/assets/hanging-lantern-5_A0FrVU.png",$k="/kids-house-game/assets/hanging-lantern-DZbXB8L1.svg",xk="/kids-house-game/assets/knit-cushion-CeEpuawZ.png",_k="/kids-house-game/assets/knit-cushion-DUewI6rR.svg",Mk="/kids-house-game/assets/ladder-shelf-kDBx9ho_.png",Lk="/kids-house-game/assets/ladder-shelf-DXYDmQiE.svg",Ck="/kids-house-game/assets/landscape-art-CXy-fkYO.png",Sk="/kids-house-game/assets/landscape-art-CdCqCPL2.svg",Bk="/kids-house-game/assets/lattice-bench-BQ7wYgqI.png",Hk="/kids-house-game/assets/lattice-bench-D3zCZTQp.svg",Pk="/kids-house-game/assets/leaf-wreath-01dJ9WfP.png",Wk="/kids-house-game/assets/leaf-wreath-DUjq1MWh.svg",Tk="/kids-house-game/assets/mini-greenhouse-DLsY7-VZ.png",Rk="/kids-house-game/assets/mini-greenhouse-CGE5F9A_.svg",Uk="/kids-house-game/assets/moving-box-DszcEI-k.png",Ek="/kids-house-game/assets/moving-box-CZXbXcJO.svg",Qk="/kids-house-game/assets/picnic-basket-CYmGfWoy.png",Ak="/kids-house-game/assets/picnic-basket-D72DCNRY.svg",zk="/kids-house-game/assets/round-rug-DZTiY9p2.png",Dk="/kids-house-game/assets/round-rug-D8ePosbv.svg",Zk="/kids-house-game/assets/sale-sign-CLwCvavX.png",qk="/kids-house-game/assets/sale-sign-CXWpgQt5.svg",Ik="/kids-house-game/assets/sprout-pot-BlPwmBjK.png",Ok="/kids-house-game/assets/sprout-pot-BbXk09mS.svg",Nk="/kids-house-game/assets/stripe-runner-CWfHHL2f.png",jk="/kids-house-game/assets/stripe-runner-ClycKEW5.svg",Fk="/kids-house-game/assets/trailing-plant-BBqKhPvp.png",Vk="/kids-house-game/assets/trailing-plant-NbG7dy8O.svg",Gk="/kids-house-game/assets/wall-clock-ItDQFPVO.png",Yk="/kids-house-game/assets/wall-clock-CDC1o6eG.svg",Kk="/kids-house-game/assets/wh-arc-floor-lamp-Dg8j_uAI.png",Xk="/kids-house-game/assets/wh-arc-floor-lamp-BKVes2Fd.svg",Jk="/kids-house-game/assets/wh-book-stack-9oDTUUnY.png",e8="/kids-house-game/assets/wh-book-stack-DjDFey2h.svg",t8="/kids-house-game/assets/wh-dresser-DhrzqcZ2.png",n8="/kids-house-game/assets/wh-dresser-Y-jnNt5q.svg",s8="/kids-house-game/assets/wh-fiddle-leaf-fig-Bt0Bc12k.png",o8="/kids-house-game/assets/wh-fiddle-leaf-fig-B0-kGmHI.svg",i8="/kids-house-game/assets/wh-kitchen-counter-BWikwkWo.png",a8="/kids-house-game/assets/wh-kitchen-counter-BtBenu6u.svg",r8="/kids-house-game/assets/wh-nightstand-BXusZ0A4.png",l8="/kids-house-game/assets/wh-nightstand-DPUoV5aO.svg",c8="/kids-house-game/assets/wh-pendant-lamp-DbfSrUho.png",d8="/kids-house-game/assets/wh-pendant-lamp-DBg4p7hi.svg",g8="/kids-house-game/assets/wh-snake-plant-kt_6Tus5.png",f8="/kids-house-game/assets/wh-snake-plant-Cj3bHF25.svg",h8="/kids-house-game/assets/wh-string-lights-CWVP27K_.png",p8="/kids-house-game/assets/wh-string-lights-C3JVBkgW.svg",u8="/kids-house-game/assets/wh-teapot-BclPHtYN.png",m8="/kids-house-game/assets/wh-teapot-kevlW5hN.svg",y8="/kids-house-game/assets/wood-armchair-BoX1llWe.png",k8="/kids-house-game/assets/wood-armchair-DNVhKBWe.svg",b8="/kids-house-game/assets/wood-bookshelf-CfgOK-7q.png",v8="/kids-house-game/assets/wood-bookshelf-CvT7GAuI.svg",w8="/kids-house-game/assets/wood-coffee-table-DmAJknnU.png",$8="/kids-house-game/assets/wood-coffee-table-CuAR_7Kr.svg",x8="/kids-house-game/assets/wood-desk-S1h5jwM2.png",_8="/kids-house-game/assets/wood-desk-DPCJq_XQ.svg",M8="/kids-house-game/assets/wood-stool-BWBID67e.png",L8="/kids-house-game/assets/wood-stool-CV7YeZwC.svg",C8="/kids-house-game/assets/wooden-bed-511IemjK.png",S8="/kids-house-game/assets/wooden-bed-Qj-sf8yq.svg",B8="/kids-house-game/assets/cc-butter-polka-DGTIwtTO.png",H8="/kids-house-game/assets/cc-butter-polka-CmiHLPHI.svg",P8="/kids-house-game/assets/cc-cream-hex-DMlsmhhY.png",W8="/kids-house-game/assets/cc-cream-hex-Bkf3o84Z.svg",T8="/kids-house-game/assets/cc-lavender-lattice-D6QyuSPi.png",R8="/kids-house-game/assets/cc-lavender-lattice-DhxILx5n.svg",U8="/kids-house-game/assets/cc-lilac-gingham-C8gKChr3.png",E8="/kids-house-game/assets/cc-lilac-gingham-C-WPjvD8.svg",Q8="/kids-house-game/assets/cc-mint-checks-Bj1xaUgE.png",A8="/kids-house-game/assets/cc-mint-checks-BKmyOLlr.svg",z8="/kids-house-game/assets/cc-mint-florals-DubHlfkl.png",D8="/kids-house-game/assets/cc-mint-florals-Dz8qRBHw.svg",Z8="/kids-house-game/assets/cc-peach-scallops-3xV_Pu-6.png",q8="/kids-house-game/assets/cc-peach-scallops-GPn_mXbS.svg",I8="/kids-house-game/assets/cc-pink-plaid-C9HKdB4f.png",O8="/kids-house-game/assets/cc-pink-plaid-VgppBwax.svg",N8="/kids-house-game/assets/cc-rag-planks-B67vRZlX.png",j8="/kids-house-game/assets/cc-rag-planks-C5Hombhc.svg",F8="/kids-house-game/assets/cc-rose-herringbone-Cmke3vGv.png",V8="/kids-house-game/assets/cc-rose-herringbone-CQRix6_f.svg",G8="/kids-house-game/assets/lilac-stripes-DcsSoVwO.png",Y8="/kids-house-game/assets/lilac-stripes-yb9DhjTf.svg",K8="/kids-house-game/assets/lilac-terrazzo-DOghNP_d.png",X8="/kids-house-game/assets/lilac-terrazzo-8CaN2qhK.svg",J8="/kids-house-game/assets/mint-bubbles-DtsYAubK.png",eb="/kids-house-game/assets/mint-bubbles-BIQM5a2P.svg",tb="/kids-house-game/assets/pink-check-floor-DjPuYxlq.png",nb="/kids-house-game/assets/pink-check-floor-Cy9k3Fal.svg",sb="/kids-house-game/assets/pink-hearts-DP4TxPV5.png",ob="/kids-house-game/assets/pink-hearts-BpVCT-98.svg",ib="/kids-house-game/assets/cloud-sky-CbZL0zcC.svg",ab="/kids-house-game/assets/pastel-planks-BAcEss7w.svg",rb="/kids-house-game/assets/soft-carpet-BSwTSDW1.svg",lb="/kids-house-game/assets/star-sprinkle-5bH7qjW0.svg",cb="/kids-house-game/assets/tiny-hearts-C-RHlg1h.svg",db="/kids-house-game/assets/butter-check-floor-yLFbEdi4.png",gb="/kids-house-game/assets/butter-check-floor-C8HdmZ0P.svg",fb="/kids-house-game/assets/mint-checks-7rTweT19.png",hb="/kids-house-game/assets/mint-checks-rWbOdhfH.svg",pb="/kids-house-game/assets/sky-clouds-9-shWk3w.png",ub="/kids-house-game/assets/sky-clouds-DUJlygwI.svg",mb="/kids-house-game/assets/sky-tiles-Cu-Ga741.png",yb="/kids-house-game/assets/sky-tiles-xxuodD5m.svg",kb="/kids-house-game/assets/sunny-stars-Bc3CbIvZ.png",bb="/kids-house-game/assets/sunny-stars-C6fsFX70.svg",vb="/kids-house-game/assets/leafy-cream-Cv5o-u-w.png",wb="/kids-house-game/assets/leafy-cream-WIcyLI1T.svg",$b="/kids-house-game/assets/orange-gingham-BjUerG-F.png",xb="/kids-house-game/assets/orange-gingham-CVNizWBt.svg",_b="/kids-house-game/assets/terracotta-tiles-dXqpLLce.png",Mb="/kids-house-game/assets/terracotta-tiles-j3yOSRI7.svg",Lb="/kids-house-game/assets/wood-panel-BGEVUu4R.png",Cb="/kids-house-game/assets/wood-panel-Dob8WRpW.svg",Sb="/kids-house-game/assets/wood-planks-vE8-OOXo.png",Bb="/kids-house-game/assets/wood-planks-4TUYjAkF.svg",Kl={small:80,medium:150,large:260},Hb={"welcome-home":"Welcome Home","sunny-vibes":"Sunny Vibes",glossy:"Glossy",cottage:"Cozy Cottage"},bd=e=>Hb[e]??e.replace(/[-_]+/g," ").replace(/\b\w/g,t=>t.toUpperCase()),Pb=Object.assign({"../assets/items/manifest.json":i0,"../assets/patterns/manifest.json":a0}),Xl=Object.assign({"../assets/items/bedroom/alarm-clock.png":r0,"../assets/items/bedroom/alarm-clock.svg":l0,"../assets/items/bedroom/bedtime-snack.png":c0,"../assets/items/bedroom/bedtime-snack.svg":d0,"../assets/items/bedroom/book-stack.png":g0,"../assets/items/bedroom/book-stack.svg":f0,"../assets/items/bedroom/bunk-bed.png":h0,"../assets/items/bedroom/bunk-bed.svg":p0,"../assets/items/bedroom/bunny-slippers.png":u0,"../assets/items/bedroom/bunny-slippers.svg":m0,"../assets/items/bedroom/canopy-bed.png":y0,"../assets/items/bedroom/canopy-bed.svg":k0,"../assets/items/bedroom/cat-bed.png":b0,"../assets/items/bedroom/cat-bed.svg":v0,"../assets/items/bedroom/cloud-rug.png":w0,"../assets/items/bedroom/cloud-rug.svg":$0,"../assets/items/bedroom/cloud-shelf.png":x0,"../assets/items/bedroom/cloud-shelf.svg":_0,"../assets/items/bedroom/cork-board.png":M0,"../assets/items/bedroom/cork-board.svg":L0,"../assets/items/bedroom/daisy-pot.png":C0,"../assets/items/bedroom/daisy-pot.svg":S0,"../assets/items/bedroom/desk.png":B0,"../assets/items/bedroom/desk.svg":H0,"../assets/items/bedroom/dino-plush.png":P0,"../assets/items/bedroom/dino-plush.svg":W0,"../assets/items/bedroom/doll-house.png":T0,"../assets/items/bedroom/doll-house.svg":R0,"../assets/items/bedroom/dresser.png":U0,"../assets/items/bedroom/dresser.svg":E0,"../assets/items/bedroom/egg-chair.png":Q0,"../assets/items/bedroom/egg-chair.svg":A0,"../assets/items/bedroom/floor-fan.png":z0,"../assets/items/bedroom/floor-fan.svg":D0,"../assets/items/bedroom/guinea-pig.png":Z0,"../assets/items/bedroom/guinea-pig.svg":q0,"../assets/items/bedroom/hamster-cage.png":I0,"../assets/items/bedroom/hamster-cage.svg":O0,"../assets/items/bedroom/heart-rug.png":N0,"../assets/items/bedroom/heart-rug.svg":j0,"../assets/items/bedroom/lava-lamp.png":F0,"../assets/items/bedroom/lava-lamp.svg":V0,"../assets/items/bedroom/moon-night-light.png":G0,"../assets/items/bedroom/moon-night-light.svg":Y0,"../assets/items/bedroom/nightstand.png":K0,"../assets/items/bedroom/nightstand.svg":X0,"../assets/items/bedroom/paper-lantern.png":J0,"../assets/items/bedroom/paper-lantern.svg":eu,"../assets/items/bedroom/piggy-bank.png":tu,"../assets/items/bedroom/piggy-bank.svg":nu,"../assets/items/bedroom/plant-stand.png":su,"../assets/items/bedroom/plant-stand.svg":ou,"../assets/items/bedroom/play-tent.png":iu,"../assets/items/bedroom/play-tent.svg":au,"../assets/items/bedroom/star-mobile.png":ru,"../assets/items/bedroom/star-mobile.svg":lu,"../assets/items/bedroom/toy-chest.png":cu,"../assets/items/bedroom/toy-chest.svg":du,"../assets/items/bedroom/toy-robot.png":gu,"../assets/items/bedroom/toy-robot.svg":fu,"../assets/items/bedroom/toy-train.png":hu,"../assets/items/bedroom/toy-train.svg":pu,"../assets/items/bedroom/unicorn-plush.png":uu,"../assets/items/bedroom/unicorn-plush.svg":mu,"../assets/items/bedroom/wardrobe.png":yu,"../assets/items/bedroom/wardrobe.svg":ku,"../assets/items/kitchen/bananas.png":bu,"../assets/items/kitchen/bananas.svg":vu,"../assets/items/kitchen/bar-stool.png":wu,"../assets/items/kitchen/bar-stool.svg":$u,"../assets/items/kitchen/bread-loaf.png":xu,"../assets/items/kitchen/bread-loaf.svg":_u,"../assets/items/kitchen/chick.png":Mu,"../assets/items/kitchen/chick.svg":Lu,"../assets/items/kitchen/china-hutch.png":Cu,"../assets/items/kitchen/china-hutch.svg":Su,"../assets/items/kitchen/cocoa-mug.png":Bu,"../assets/items/kitchen/cocoa-mug.svg":Hu,"../assets/items/kitchen/cookie-jar.png":Pu,"../assets/items/kitchen/cookie-jar.svg":Wu,"../assets/items/kitchen/cooking-pot.png":Tu,"../assets/items/kitchen/cooking-pot.svg":Ru,"../assets/items/kitchen/cupcake.png":Uu,"../assets/items/kitchen/cupcake.svg":Eu,"../assets/items/kitchen/dish-rack.png":Qu,"../assets/items/kitchen/dish-rack.svg":Au,"../assets/items/kitchen/fruit-bowl.png":zu,"../assets/items/kitchen/fruit-bowl.svg":Du,"../assets/items/kitchen/frying-pan.png":Zu,"../assets/items/kitchen/frying-pan.svg":qu,"../assets/items/kitchen/happy-fridge.png":Iu,"../assets/items/kitchen/happy-fridge.svg":Ou,"../assets/items/kitchen/herb-box.png":Nu,"../assets/items/kitchen/herb-box.svg":ju,"../assets/items/kitchen/high-chair.png":Fu,"../assets/items/kitchen/high-chair.svg":Vu,"../assets/items/kitchen/ice-cream.png":Gu,"../assets/items/kitchen/ice-cream.svg":Yu,"../assets/items/kitchen/kettle.png":Ku,"../assets/items/kitchen/kettle.svg":Xu,"../assets/items/kitchen/kitchen-counter.png":Ju,"../assets/items/kitchen/kitchen-counter.svg":em,"../assets/items/kitchen/kitchen-sink.png":tm,"../assets/items/kitchen/kitchen-sink.svg":nm,"../assets/items/kitchen/lemon-tree.png":sm,"../assets/items/kitchen/lemon-tree.svg":om,"../assets/items/kitchen/microwave.png":im,"../assets/items/kitchen/microwave.svg":am,"../assets/items/kitchen/milk-bottle.png":rm,"../assets/items/kitchen/milk-bottle.svg":lm,"../assets/items/kitchen/pancakes.png":cm,"../assets/items/kitchen/pancakes.svg":dm,"../assets/items/kitchen/pantry-shelf.png":gm,"../assets/items/kitchen/pantry-shelf.svg":fm,"../assets/items/kitchen/pendant-lamp.png":hm,"../assets/items/kitchen/pendant-lamp.svg":pm,"../assets/items/kitchen/pet-bowl.png":um,"../assets/items/kitchen/pet-bowl.svg":mm,"../assets/items/kitchen/rice-cooker.png":ym,"../assets/items/kitchen/rice-cooker.svg":km,"../assets/items/kitchen/runner-rug.png":bm,"../assets/items/kitchen/runner-rug.svg":vm,"../assets/items/kitchen/spice-rack.png":wm,"../assets/items/kitchen/spice-rack.svg":$m,"../assets/items/kitchen/stand-mixer.png":xm,"../assets/items/kitchen/stand-mixer.svg":_m,"../assets/items/kitchen/teapot.png":Mm,"../assets/items/kitchen/teapot.svg":Lm,"../assets/items/kitchen/toaster.png":Cm,"../assets/items/kitchen/toaster.svg":Sm,"../assets/items/kitchen/utensil-rail.png":Bm,"../assets/items/kitchen/utensil-rail.svg":Hm,"../assets/items/kitchen/watermelon-slice.png":Pm,"../assets/items/kitchen/watermelon-slice.svg":Wm,"../assets/items/living/aquarium.png":Tm,"../assets/items/living/aquarium.svg":Rm,"../assets/items/living/arc-floor-lamp.png":Um,"../assets/items/living/arc-floor-lamp.svg":Em,"../assets/items/living/bean-bag.png":Qm,"../assets/items/living/bean-bag.svg":Am,"../assets/items/living/bird-cage.png":zm,"../assets/items/living/bird-cage.svg":Dm,"../assets/items/living/blanket-basket.png":Zm,"../assets/items/living/blanket-basket.svg":qm,"../assets/items/living/building-blocks.png":Im,"../assets/items/living/building-blocks.svg":Om,"../assets/items/living/coffee-table.png":Nm,"../assets/items/living/coffee-table.svg":jm,"../assets/items/living/comfy-armchair.png":Fm,"../assets/items/living/comfy-armchair.svg":Vm,"../assets/items/living/cubby-shelf.png":Gm,"../assets/items/living/cubby-shelf.svg":Ym,"../assets/items/living/daisy-rug.png":Km,"../assets/items/living/daisy-rug.svg":Xm,"../assets/items/living/fiddle-leaf-fig.png":Jm,"../assets/items/living/fiddle-leaf-fig.svg":e1,"../assets/items/living/fireplace.png":t1,"../assets/items/living/fireplace.svg":n1,"../assets/items/living/globe.png":s1,"../assets/items/living/globe.svg":o1,"../assets/items/living/hanging-planter.png":i1,"../assets/items/living/hanging-planter.svg":a1,"../assets/items/living/monstera-plant.png":r1,"../assets/items/living/monstera-plant.svg":l1,"../assets/items/living/piano.png":c1,"../assets/items/living/piano.svg":d1,"../assets/items/living/popcorn.png":g1,"../assets/items/living/popcorn.svg":f1,"../assets/items/living/pouf.png":h1,"../assets/items/living/pouf.svg":p1,"../assets/items/living/rainbow-rug.png":u1,"../assets/items/living/rainbow-rug.svg":m1,"../assets/items/living/rainbow-wall-art.png":y1,"../assets/items/living/rainbow-wall-art.svg":k1,"../assets/items/living/retro-radio.png":b1,"../assets/items/living/retro-radio.svg":v1,"../assets/items/living/rocking-chair.png":w1,"../assets/items/living/rocking-chair.svg":$1,"../assets/items/living/rocking-horse.png":x1,"../assets/items/living/rocking-horse.svg":_1,"../assets/items/living/snake-plant.png":M1,"../assets/items/living/snake-plant.svg":L1,"../assets/items/living/string-lights.png":C1,"../assets/items/living/string-lights.svg":S1,"../assets/items/living/succulent-trio.png":B1,"../assets/items/living/succulent-trio.svg":H1,"../assets/items/living/tassel-rug.png":P1,"../assets/items/living/tassel-rug.svg":W1,"../assets/items/living/throw-pillow.png":T1,"../assets/items/living/throw-pillow.svg":R1,"../assets/items/living/toy-car.png":U1,"../assets/items/living/toy-car.svg":E1,"../assets/items/living/tulip-vase.png":Q1,"../assets/items/living/tulip-vase.svg":A1,"../assets/items/living/turtle.png":z1,"../assets/items/living/turtle.svg":D1,"../assets/items/living/tv-stand.png":Z1,"../assets/items/living/tv-stand.svg":q1,"../assets/items/living/wall-shelf.png":I1,"../assets/items/living/wall-shelf.svg":O1,"../assets/items/packs/cottage/cc-bakery-shelf.png":N1,"../assets/items/packs/cottage/cc-bakery-shelf.svg":j1,"../assets/items/packs/cottage/cc-breakfast-table.png":F1,"../assets/items/packs/cottage/cc-breakfast-table.svg":V1,"../assets/items/packs/cottage/cc-bubble-chair.png":G1,"../assets/items/packs/cottage/cc-bubble-chair.svg":Y1,"../assets/items/packs/cottage/cc-canopy-daybed.png":K1,"../assets/items/packs/cottage/cc-canopy-daybed.svg":X1,"../assets/items/packs/cottage/cc-cloud-beanbag.png":J1,"../assets/items/packs/cottage/cc-cloud-beanbag.svg":e2,"../assets/items/packs/cottage/cc-cloud-lamp.png":t2,"../assets/items/packs/cottage/cc-cloud-lamp.svg":n2,"../assets/items/packs/cottage/cc-cottage-aquarium.png":s2,"../assets/items/packs/cottage/cc-cottage-aquarium.svg":o2,"../assets/items/packs/cottage/cc-cupcake-stand.png":i2,"../assets/items/packs/cottage/cc-cupcake-stand.svg":a2,"../assets/items/packs/cottage/cc-dryer-chair.png":r2,"../assets/items/packs/cottage/cc-dryer-chair.svg":l2,"../assets/items/packs/cottage/cc-fairy-garland.png":c2,"../assets/items/packs/cottage/cc-fairy-garland.svg":d2,"../assets/items/packs/cottage/cc-fairy-shelf.png":g2,"../assets/items/packs/cottage/cc-fairy-shelf.svg":f2,"../assets/items/packs/cottage/cc-flower-kettle.png":h2,"../assets/items/packs/cottage/cc-flower-kettle.svg":p2,"../assets/items/packs/cottage/cc-flower-lamp.png":u2,"../assets/items/packs/cottage/cc-flower-lamp.svg":m2,"../assets/items/packs/cottage/cc-heart-bed.png":y2,"../assets/items/packs/cottage/cc-heart-bed.svg":k2,"../assets/items/packs/cottage/cc-heart-clock.png":b2,"../assets/items/packs/cottage/cc-heart-clock.svg":v2,"../assets/items/packs/cottage/cc-heart-pouf.png":w2,"../assets/items/packs/cottage/cc-heart-pouf.svg":$2,"../assets/items/packs/cottage/cc-heart-rug.png":x2,"../assets/items/packs/cottage/cc-heart-rug.svg":_2,"../assets/items/packs/cottage/cc-jewel-box.png":M2,"../assets/items/packs/cottage/cc-jewel-box.svg":L2,"../assets/items/packs/cottage/cc-light-vanity.png":C2,"../assets/items/packs/cottage/cc-light-vanity.svg":S2,"../assets/items/packs/cottage/cc-macaron-jar.png":B2,"../assets/items/packs/cottage/cc-macaron-jar.svg":H2,"../assets/items/packs/cottage/cc-macrame-swing.png":P2,"../assets/items/packs/cottage/cc-macrame-swing.svg":W2,"../assets/items/packs/cottage/cc-mani-chair.png":T2,"../assets/items/packs/cottage/cc-mani-chair.svg":R2,"../assets/items/packs/cottage/cc-mint-fridge.png":U2,"../assets/items/packs/cottage/cc-mint-fridge.svg":E2,"../assets/items/packs/cottage/cc-mushroom-stool.png":Q2,"../assets/items/packs/cottage/cc-mushroom-stool.svg":A2,"../assets/items/packs/cottage/cc-pastel-range.png":z2,"../assets/items/packs/cottage/cc-pastel-range.svg":D2,"../assets/items/packs/cottage/cc-perfume-tray.png":Z2,"../assets/items/packs/cottage/cc-perfume-tray.svg":q2,"../assets/items/packs/cottage/cc-petal-table.png":I2,"../assets/items/packs/cottage/cc-petal-table.svg":O2,"../assets/items/packs/cottage/cc-plant-wall.png":N2,"../assets/items/packs/cottage/cc-plant-wall.svg":j2,"../assets/items/packs/cottage/cc-reading-nook.png":F2,"../assets/items/packs/cottage/cc-reading-nook.svg":V2,"../assets/items/packs/cottage/cc-record-player.png":G2,"../assets/items/packs/cottage/cc-record-player.svg":Y2,"../assets/items/packs/cottage/cc-ribbon-mirror.png":K2,"../assets/items/packs/cottage/cc-ribbon-mirror.svg":X2,"../assets/items/packs/cottage/cc-scallop-curtains.png":J2,"../assets/items/packs/cottage/cc-scallop-curtains.svg":ey,"../assets/items/packs/cottage/cc-scallop-loveseat.png":ty,"../assets/items/packs/cottage/cc-scallop-loveseat.svg":ny,"../assets/items/packs/cottage/cc-star-dresser.png":sy,"../assets/items/packs/cottage/cc-star-dresser.svg":oy,"../assets/items/packs/cottage/cc-teapot-set.png":iy,"../assets/items/packs/cottage/cc-teapot-set.svg":ay,"../assets/items/packs/cottage/cc-window-seat.png":ry,"../assets/items/packs/cottage/cc-window-seat.svg":ly,"../assets/items/packs/glossy/arched-shelf.png":cy,"../assets/items/packs/glossy/arched-shelf.svg":dy,"../assets/items/packs/glossy/blob-rug.png":gy,"../assets/items/packs/glossy/blob-rug.svg":fy,"../assets/items/packs/glossy/bubbly-plant.png":hy,"../assets/items/packs/glossy/bubbly-plant.svg":py,"../assets/items/packs/glossy/bud-vase.png":uy,"../assets/items/packs/glossy/bud-vase.svg":my,"../assets/items/packs/glossy/comb-brush.png":yy,"../assets/items/packs/glossy/comb-brush.svg":ky,"../assets/items/packs/glossy/cream-jars.png":by,"../assets/items/packs/glossy/cream-jars.svg":vy,"../assets/items/packs/glossy/drop-lamp.png":wy,"../assets/items/packs/glossy/drop-lamp.svg":$y,"../assets/items/packs/glossy/droplet-buddy.png":xy,"../assets/items/packs/glossy/droplet-buddy.svg":_y,"../assets/items/packs/glossy/fancy-sofa.png":My,"../assets/items/packs/glossy/fancy-sofa.svg":Ly,"../assets/items/packs/glossy/flower-cart.png":Cy,"../assets/items/packs/glossy/flower-cart.svg":Sy,"../assets/items/packs/glossy/foot-spa.png":By,"../assets/items/packs/glossy/foot-spa.svg":Hy,"../assets/items/packs/glossy/globe-pendants.png":Py,"../assets/items/packs/glossy/globe-pendants.svg":Wy,"../assets/items/packs/glossy/glow-mirror.png":Ty,"../assets/items/packs/glossy/glow-mirror.svg":Ry,"../assets/items/packs/glossy/gold-floor-mirror.png":Uy,"../assets/items/packs/glossy/gold-floor-mirror.svg":Ey,"../assets/items/packs/glossy/hair-dryer.png":Qy,"../assets/items/packs/glossy/hair-dryer.svg":Ay,"../assets/items/packs/glossy/heart-plant.png":zy,"../assets/items/packs/glossy/heart-plant.svg":Dy,"../assets/items/packs/glossy/heart-pouf.png":Zy,"../assets/items/packs/glossy/heart-pouf.svg":qy,"../assets/items/packs/glossy/lilac-curtain.png":Iy,"../assets/items/packs/glossy/lilac-curtain.svg":Oy,"../assets/items/packs/glossy/lotion-trio.png":Ny,"../assets/items/packs/glossy/lotion-trio.svg":jy,"../assets/items/packs/glossy/mani-lamp.png":Fy,"../assets/items/packs/glossy/mani-lamp.svg":Vy,"../assets/items/packs/glossy/nail-table.png":Gy,"../assets/items/packs/glossy/nail-table.svg":Yy,"../assets/items/packs/glossy/pebble-rug.png":Ky,"../assets/items/packs/glossy/pebble-rug.svg":Xy,"../assets/items/packs/glossy/perfume-bottle.png":Jy,"../assets/items/packs/glossy/perfume-bottle.svg":e4,"../assets/items/packs/glossy/pink-fountain.png":t4,"../assets/items/packs/glossy/pink-fountain.svg":n4,"../assets/items/packs/glossy/pink-vanity.png":s4,"../assets/items/packs/glossy/pink-vanity.svg":o4,"../assets/items/packs/glossy/polish-bottle.png":i4,"../assets/items/packs/glossy/polish-bottle.svg":a4,"../assets/items/packs/glossy/polish-rack.png":r4,"../assets/items/packs/glossy/polish-rack.svg":l4,"../assets/items/packs/glossy/reception-desk.png":c4,"../assets/items/packs/glossy/reception-desk.svg":d4,"../assets/items/packs/glossy/salon-chair.png":g4,"../assets/items/packs/glossy/salon-chair.svg":f4,"../assets/items/packs/glossy/scent-candle.png":h4,"../assets/items/packs/glossy/scent-candle.svg":p4,"../assets/items/packs/glossy/spray-bottle.png":u4,"../assets/items/packs/glossy/spray-bottle.svg":m4,"../assets/items/packs/glossy/star-wall-sign.png":y4,"../assets/items/packs/glossy/star-wall-sign.svg":k4,"../assets/items/packs/glossy/swivel-stool.png":b4,"../assets/items/packs/glossy/swivel-stool.svg":v4,"../assets/items/packs/glossy/tiered-tray.png":w4,"../assets/items/packs/glossy/tiered-tray.svg":$4,"../assets/items/packs/glossy/towel-cart.png":x4,"../assets/items/packs/glossy/towel-cart.svg":_4,"../assets/items/packs/glossy/towel-stack.png":M4,"../assets/items/packs/glossy/towel-stack.svg":L4,"../assets/items/packs/glossy/vine-planter.png":C4,"../assets/items/packs/glossy/vine-planter.svg":S4,"../assets/items/packs/glossy/waiting-bench.png":B4,"../assets/items/packs/glossy/waiting-bench.svg":H4,"../assets/items/packs/glossy/wash-chair.png":P4,"../assets/items/packs/glossy/wash-chair.svg":W4,"../assets/items/packs/sunny-vibes/arched-mirror.png":T4,"../assets/items/packs/sunny-vibes/arched-mirror.svg":R4,"../assets/items/packs/sunny-vibes/big-monitor.png":U4,"../assets/items/packs/sunny-vibes/big-monitor.svg":E4,"../assets/items/packs/sunny-vibes/boba-cup.png":Q4,"../assets/items/packs/sunny-vibes/boba-cup.svg":A4,"../assets/items/packs/sunny-vibes/bubble-bath.png":z4,"../assets/items/packs/sunny-vibes/bubble-bath.svg":D4,"../assets/items/packs/sunny-vibes/cactus-buddy.png":Z4,"../assets/items/packs/sunny-vibes/cactus-buddy.svg":q4,"../assets/items/packs/sunny-vibes/caterpillar-plush.png":I4,"../assets/items/packs/sunny-vibes/caterpillar-plush.svg":O4,"../assets/items/packs/sunny-vibes/checker-bed.png":N4,"../assets/items/packs/sunny-vibes/checker-bed.svg":j4,"../assets/items/packs/sunny-vibes/checker-rug.png":F4,"../assets/items/packs/sunny-vibes/checker-rug.svg":V4,"../assets/items/packs/sunny-vibes/clothes-rail.png":G4,"../assets/items/packs/sunny-vibes/clothes-rail.svg":Y4,"../assets/items/packs/sunny-vibes/cloud-sofa.png":K4,"../assets/items/packs/sunny-vibes/cloud-sofa.svg":X4,"../assets/items/packs/sunny-vibes/cube-shelf.png":J4,"../assets/items/packs/sunny-vibes/cube-shelf.svg":e6,"../assets/items/packs/sunny-vibes/curvy-desk.png":t6,"../assets/items/packs/sunny-vibes/curvy-desk.svg":n6,"../assets/items/packs/sunny-vibes/cute-speaker.png":s6,"../assets/items/packs/sunny-vibes/cute-speaker.svg":o6,"../assets/items/packs/sunny-vibes/desk-lamp.png":i6,"../assets/items/packs/sunny-vibes/desk-lamp.svg":a6,"../assets/items/packs/sunny-vibes/desk-mic.png":r6,"../assets/items/packs/sunny-vibes/desk-mic.svg":l6,"../assets/items/packs/sunny-vibes/flower-lamp.png":c6,"../assets/items/packs/sunny-vibes/flower-lamp.svg":d6,"../assets/items/packs/sunny-vibes/frog-plush.png":g6,"../assets/items/packs/sunny-vibes/frog-plush.svg":f6,"../assets/items/packs/sunny-vibes/game-controller.png":h6,"../assets/items/packs/sunny-vibes/game-controller.svg":p6,"../assets/items/packs/sunny-vibes/gaming-chair.png":u6,"../assets/items/packs/sunny-vibes/gaming-chair.svg":m6,"../assets/items/packs/sunny-vibes/hamster-pet.png":y6,"../assets/items/packs/sunny-vibes/hamster-pet.svg":k6,"../assets/items/packs/sunny-vibes/headphones.png":b6,"../assets/items/packs/sunny-vibes/headphones.svg":v6,"../assets/items/packs/sunny-vibes/heart-light.png":w6,"../assets/items/packs/sunny-vibes/heart-light.svg":$6,"../assets/items/packs/sunny-vibes/keyboard.png":x6,"../assets/items/packs/sunny-vibes/keyboard.svg":_6,"../assets/items/packs/sunny-vibes/mini-fridge.png":M6,"../assets/items/packs/sunny-vibes/mini-fridge.svg":L6,"../assets/items/packs/sunny-vibes/pastel-wardrobe.png":C6,"../assets/items/packs/sunny-vibes/pastel-wardrobe.svg":S6,"../assets/items/packs/sunny-vibes/phone-stand.png":B6,"../assets/items/packs/sunny-vibes/phone-stand.svg":H6,"../assets/items/packs/sunny-vibes/pothos-plant.png":P6,"../assets/items/packs/sunny-vibes/pothos-plant.svg":W6,"../assets/items/packs/sunny-vibes/puffy-stool.png":T6,"../assets/items/packs/sunny-vibes/puffy-stool.svg":R6,"../assets/items/packs/sunny-vibes/ring-light.png":U6,"../assets/items/packs/sunny-vibes/ring-light.svg":E6,"../assets/items/packs/sunny-vibes/side-table-round.png":Q6,"../assets/items/packs/sunny-vibes/side-table-round.svg":A6,"../assets/items/packs/sunny-vibes/star-lamp.png":z6,"../assets/items/packs/sunny-vibes/star-lamp.svg":D6,"../assets/items/packs/sunny-vibes/sticker-board.png":Z6,"../assets/items/packs/sunny-vibes/sticker-board.svg":q6,"../assets/items/packs/sunny-vibes/sunny-art.png":I6,"../assets/items/packs/sunny-vibes/sunny-art.svg":O6,"../assets/items/packs/sunny-vibes/sv-bean-bag.png":N6,"../assets/items/packs/sunny-vibes/sv-bean-bag.svg":j6,"../assets/items/packs/sunny-vibes/sv-cloud-rug.png":F6,"../assets/items/packs/sunny-vibes/sv-cloud-rug.svg":V6,"../assets/items/packs/sunny-vibes/sv-wall-shelf.png":G6,"../assets/items/packs/sunny-vibes/sv-wall-shelf.svg":Y6,"../assets/items/packs/sunny-vibes/vlog-camera.png":K6,"../assets/items/packs/sunny-vibes/vlog-camera.svg":X6,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.png":J6,"../assets/items/packs/sunny-vibes/wavy-floor-lamp.svg":ek,"../assets/items/packs/welcome-home/acorn-friend.png":tk,"../assets/items/packs/welcome-home/acorn-friend.svg":nk,"../assets/items/packs/welcome-home/apple-tree.png":sk,"../assets/items/packs/welcome-home/apple-tree.svg":ok,"../assets/items/packs/welcome-home/big-wardrobe.png":ik,"../assets/items/packs/welcome-home/big-wardrobe.svg":ak,"../assets/items/packs/welcome-home/box-stack.png":rk,"../assets/items/packs/welcome-home/box-stack.svg":lk,"../assets/items/packs/welcome-home/brick-fireplace.png":ck,"../assets/items/packs/welcome-home/brick-fireplace.svg":dk,"../assets/items/packs/welcome-home/bulletin-board.png":gk,"../assets/items/packs/welcome-home/bulletin-board.svg":fk,"../assets/items/packs/welcome-home/cozy-mug.png":hk,"../assets/items/packs/welcome-home/cozy-mug.svg":pk,"../assets/items/packs/welcome-home/cream-sofa.png":uk,"../assets/items/packs/welcome-home/cream-sofa.svg":mk,"../assets/items/packs/welcome-home/fire-pit.png":yk,"../assets/items/packs/welcome-home/fire-pit.svg":kk,"../assets/items/packs/welcome-home/glass-cabinet.png":bk,"../assets/items/packs/welcome-home/glass-cabinet.svg":vk,"../assets/items/packs/welcome-home/hanging-lantern.png":wk,"../assets/items/packs/welcome-home/hanging-lantern.svg":$k,"../assets/items/packs/welcome-home/knit-cushion.png":xk,"../assets/items/packs/welcome-home/knit-cushion.svg":_k,"../assets/items/packs/welcome-home/ladder-shelf.png":Mk,"../assets/items/packs/welcome-home/ladder-shelf.svg":Lk,"../assets/items/packs/welcome-home/landscape-art.png":Ck,"../assets/items/packs/welcome-home/landscape-art.svg":Sk,"../assets/items/packs/welcome-home/lattice-bench.png":Bk,"../assets/items/packs/welcome-home/lattice-bench.svg":Hk,"../assets/items/packs/welcome-home/leaf-wreath.png":Pk,"../assets/items/packs/welcome-home/leaf-wreath.svg":Wk,"../assets/items/packs/welcome-home/mini-greenhouse.png":Tk,"../assets/items/packs/welcome-home/mini-greenhouse.svg":Rk,"../assets/items/packs/welcome-home/moving-box.png":Uk,"../assets/items/packs/welcome-home/moving-box.svg":Ek,"../assets/items/packs/welcome-home/picnic-basket.png":Qk,"../assets/items/packs/welcome-home/picnic-basket.svg":Ak,"../assets/items/packs/welcome-home/round-rug.png":zk,"../assets/items/packs/welcome-home/round-rug.svg":Dk,"../assets/items/packs/welcome-home/sale-sign.png":Zk,"../assets/items/packs/welcome-home/sale-sign.svg":qk,"../assets/items/packs/welcome-home/sprout-pot.png":Ik,"../assets/items/packs/welcome-home/sprout-pot.svg":Ok,"../assets/items/packs/welcome-home/stripe-runner.png":Nk,"../assets/items/packs/welcome-home/stripe-runner.svg":jk,"../assets/items/packs/welcome-home/trailing-plant.png":Fk,"../assets/items/packs/welcome-home/trailing-plant.svg":Vk,"../assets/items/packs/welcome-home/wall-clock.png":Gk,"../assets/items/packs/welcome-home/wall-clock.svg":Yk,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.png":Kk,"../assets/items/packs/welcome-home/wh-arc-floor-lamp.svg":Xk,"../assets/items/packs/welcome-home/wh-book-stack.png":Jk,"../assets/items/packs/welcome-home/wh-book-stack.svg":e8,"../assets/items/packs/welcome-home/wh-dresser.png":t8,"../assets/items/packs/welcome-home/wh-dresser.svg":n8,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.png":s8,"../assets/items/packs/welcome-home/wh-fiddle-leaf-fig.svg":o8,"../assets/items/packs/welcome-home/wh-kitchen-counter.png":i8,"../assets/items/packs/welcome-home/wh-kitchen-counter.svg":a8,"../assets/items/packs/welcome-home/wh-nightstand.png":r8,"../assets/items/packs/welcome-home/wh-nightstand.svg":l8,"../assets/items/packs/welcome-home/wh-pendant-lamp.png":c8,"../assets/items/packs/welcome-home/wh-pendant-lamp.svg":d8,"../assets/items/packs/welcome-home/wh-snake-plant.png":g8,"../assets/items/packs/welcome-home/wh-snake-plant.svg":f8,"../assets/items/packs/welcome-home/wh-string-lights.png":h8,"../assets/items/packs/welcome-home/wh-string-lights.svg":p8,"../assets/items/packs/welcome-home/wh-teapot.png":u8,"../assets/items/packs/welcome-home/wh-teapot.svg":m8,"../assets/items/packs/welcome-home/wood-armchair.png":y8,"../assets/items/packs/welcome-home/wood-armchair.svg":k8,"../assets/items/packs/welcome-home/wood-bookshelf.png":b8,"../assets/items/packs/welcome-home/wood-bookshelf.svg":v8,"../assets/items/packs/welcome-home/wood-coffee-table.png":w8,"../assets/items/packs/welcome-home/wood-coffee-table.svg":$8,"../assets/items/packs/welcome-home/wood-desk.png":x8,"../assets/items/packs/welcome-home/wood-desk.svg":_8,"../assets/items/packs/welcome-home/wood-stool.png":M8,"../assets/items/packs/welcome-home/wood-stool.svg":L8,"../assets/items/packs/welcome-home/wooden-bed.png":C8,"../assets/items/packs/welcome-home/wooden-bed.svg":S8}),Jl=Object.assign({"../assets/patterns/cottage/cc-butter-polka.png":B8,"../assets/patterns/cottage/cc-butter-polka.svg":H8,"../assets/patterns/cottage/cc-cream-hex.png":P8,"../assets/patterns/cottage/cc-cream-hex.svg":W8,"../assets/patterns/cottage/cc-lavender-lattice.png":T8,"../assets/patterns/cottage/cc-lavender-lattice.svg":R8,"../assets/patterns/cottage/cc-lilac-gingham.png":U8,"../assets/patterns/cottage/cc-lilac-gingham.svg":E8,"../assets/patterns/cottage/cc-mint-checks.png":Q8,"../assets/patterns/cottage/cc-mint-checks.svg":A8,"../assets/patterns/cottage/cc-mint-florals.png":z8,"../assets/patterns/cottage/cc-mint-florals.svg":D8,"../assets/patterns/cottage/cc-peach-scallops.png":Z8,"../assets/patterns/cottage/cc-peach-scallops.svg":q8,"../assets/patterns/cottage/cc-pink-plaid.png":I8,"../assets/patterns/cottage/cc-pink-plaid.svg":O8,"../assets/patterns/cottage/cc-rag-planks.png":N8,"../assets/patterns/cottage/cc-rag-planks.svg":j8,"../assets/patterns/cottage/cc-rose-herringbone.png":F8,"../assets/patterns/cottage/cc-rose-herringbone.svg":V8,"../assets/patterns/glossy/lilac-stripes.png":G8,"../assets/patterns/glossy/lilac-stripes.svg":Y8,"../assets/patterns/glossy/lilac-terrazzo.png":K8,"../assets/patterns/glossy/lilac-terrazzo.svg":X8,"../assets/patterns/glossy/mint-bubbles.png":J8,"../assets/patterns/glossy/mint-bubbles.svg":eb,"../assets/patterns/glossy/pink-check-floor.png":tb,"../assets/patterns/glossy/pink-check-floor.svg":nb,"../assets/patterns/glossy/pink-hearts.png":sb,"../assets/patterns/glossy/pink-hearts.svg":ob,"../assets/patterns/nursery/cloud-sky.svg":ib,"../assets/patterns/nursery/pastel-planks.svg":ab,"../assets/patterns/nursery/soft-carpet.svg":rb,"../assets/patterns/nursery/star-sprinkle.svg":lb,"../assets/patterns/nursery/tiny-hearts.svg":cb,"../assets/patterns/sunny-vibes/butter-check-floor.png":db,"../assets/patterns/sunny-vibes/butter-check-floor.svg":gb,"../assets/patterns/sunny-vibes/mint-checks.png":fb,"../assets/patterns/sunny-vibes/mint-checks.svg":hb,"../assets/patterns/sunny-vibes/sky-clouds.png":pb,"../assets/patterns/sunny-vibes/sky-clouds.svg":ub,"../assets/patterns/sunny-vibes/sky-tiles.png":mb,"../assets/patterns/sunny-vibes/sky-tiles.svg":yb,"../assets/patterns/sunny-vibes/sunny-stars.png":kb,"../assets/patterns/sunny-vibes/sunny-stars.svg":bb,"../assets/patterns/welcome-home/leafy-cream.png":vb,"../assets/patterns/welcome-home/leafy-cream.svg":wb,"../assets/patterns/welcome-home/orange-gingham.png":$b,"../assets/patterns/welcome-home/orange-gingham.svg":xb,"../assets/patterns/welcome-home/terracotta-tiles.png":_b,"../assets/patterns/welcome-home/terracotta-tiles.svg":Mb,"../assets/patterns/welcome-home/wood-panel.png":Lb,"../assets/patterns/welcome-home/wood-panel.svg":Cb,"../assets/patterns/welcome-home/wood-planks.png":Sb,"../assets/patterns/welcome-home/wood-planks.svg":Bb});function Wb(e,t){if(!e||!e.trim())return[];try{const n=JSON.parse(e);return(Array.isArray(n)?n:[...Array.isArray(n?.items)?n.items:[],...Array.isArray(n?.patterns)?n.patterns:[]]).filter(o=>o&&typeof o.slug=="string"&&o.slug.trim())}catch(n){return console.warn(`[packs] ${t} is not valid JSON; ignoring`,n),[]}}const vd=Object.entries(Pb).flatMap(([e,t])=>Wb(t,e)),Tb=["svg","png","webp","SVG","PNG","WEBP"];function wd(e,t,n,s){for(const i of Tb){const a=e[`../assets/${t}/${n}/${s}.${i}`];if(a)return a}const o=Object.keys(e).find(i=>i.split("/").pop().replace(/\.\w+$/,"")===s);return o?e[o]:void 0}const ec={furniture:"furniture",appliance:"furniture",appliances:"furniture",seating:"furniture",storage:"furniture",bed:"furniture",table:"furniture",decor:"decor",rug:"decor",rugs:"decor",lighting:"decor",light:"decor",lamp:"decor",toy:"decor",toys:"decor","wall-art":"decor",art:"decor",beauty:"decor",plant:"plants",plants:"plants",flower:"plants",flowers:"plants",food:"food",drink:"food",drinks:"food",snack:"food",pet:"pets",pets:"pets",animal:"pets",animals:"pets"};function Rb(e){const t=typeof e=="string"?e.trim().toLowerCase():"";return ec[t]??ec[t.replace(/s$/,"")]??"decor"}const $s=(e,t)=>typeof e=="string"&&e.trim()?e.trim().toLowerCase():t,$d=e=>["wallpaper","floor"].includes($s(e.type,"")),tc=new Set,Ub=vd.filter(e=>!$d(e)).flatMap(e=>{const t=$s(e.room,"any"),n=e.slug.trim();if(tc.has(n))return[];tc.add(n);const o=[e.svg,e.png].filter(p=>typeof p=="string").map(p=>Xl["../assets/items/"+p.replace(/^\.?\//,"")]).find(Boolean)??wd(Xl,"items",t,n);if(!o)return console.warn(`[packs] no image for items/${t}/${n}`),[];const i=$s(e.pack,""),a=$s(e.size,"medium"),r=Rb(e.category),l=typeof e.gameW=="number"&&e.gameW>20&&e.gameW<800?e.gameW:Kl[a]??Kl.medium,c=typeof e.widthUnits=="number"&&typeof e.heightUnits=="number"&&e.widthUnits>0&&e.heightUnits>0?e.heightUnits/e.widthUnits:1,d=Math.round(l*Math.min(4,Math.max(.2,c))),g=typeof e.holdable=="boolean"?e.holdable:a!=="large"&&r!=="furniture",f=e.tag==="lighting"||/lamp|light|lantern|candle/i.test(n);return[{kind:`pack:${n}`,name:e.name||n,cat:r,rooms:[t],w:l,h:d,wall:e.wall===!0||void 0,svg:"",img:o,pack:i||void 0,holdable:g,light:f||void 0}]}),er=vd.filter($d).flatMap(e=>{const t=$s(e.pack,"extra"),n=e.slug.trim(),o=[e.svg,e.png].filter(i=>typeof i=="string").map(i=>Jl["../assets/patterns/"+i.replace(/^\.?\//,"")]).find(Boolean)??wd(Jl,"patterns",t,n);return o?[{id:`${t}/${n}`,name:e.name||n,pack:t,kind:$s(e.type,"wallpaper"),url:o}]:(console.warn(`[packs] no image for patterns/${t}/${n}`),[])}),nc=Object.fromEntries(er.map(e=>[e.id,e])),Ft="#5a3d5c",H=`stroke="${Ft}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,xd=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="2.4" fill="${Ft}"/><circle cx="${t}" cy="${n}" r="2.4" fill="${Ft}"/><circle cx="${e+.8}" cy="${n-.8}" r=".8" fill="#fff"/><circle cx="${t+.8}" cy="${n-.8}" r=".8" fill="#fff"/>`,_d=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/><ellipse cx="${t}" cy="${n}" rx="3.2" ry="2" fill="#ff9bb5" opacity=".75"/>`,Le='<ellipse cx="50" cy="97" rx="36" ry="3" fill="#000" opacity=".12"/>';function Ca(e,t,n){return`${Le}<ellipse cx="50" cy="78" rx="28" ry="16" fill="${t}" ${H}/><path d="M24 62 Q50 48 76 62 V78 Q50 92 24 78 Z" fill="${t}" ${H}/>
    <circle cx="50" cy="40" r="18" fill="${e}" ${H}/>${xd(43,57,40)}${_d(38,62,48)}<path d="M46 50 q4 3 8 0" fill="none" ${H}/>
    <path d="M38 26 Q50 16 62 26" fill="${n}" ${H}/><circle cx="50" cy="24" r="3" fill="${n}" ${H}/>`}const Md=[{kind:"crib",name:"Crib",cat:"furniture",w:260,svg:`${Le}<rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${H}/><path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${H}/><rect x="6" y="22" width="88" height="12" rx="6" fill="#9ad7f5" ${H}/><rect x="14" y="48" width="72" height="16" rx="6" fill="#ffe0ec"/><ellipse cx="32" cy="56" rx="8" ry="5" fill="#fff" ${H}/><ellipse cx="50" cy="56" rx="8" ry="5" fill="#c9e7ff" ${H}/>`},{kind:"bassinet",name:"Bassinet",cat:"furniture",w:170,svg:`${Le}<path d="M18 78 Q8 78 10 64 L22 36 H78 L90 64 Q92 78 82 78 Z" fill="#fff" ${H}/><ellipse cx="50" cy="36" rx="32" ry="10" fill="#fff" ${H}/><path d="M22 40 Q50 52 78 40" fill="#ffe0ec" ${H}/><ellipse cx="50" cy="44" rx="16" ry="7" fill="#fff"/><path d="M30 78 L22 94 M70 78 L78 94" ${H}/><ellipse cx="50" cy="90" rx="28" ry="4" fill="none" ${H}/><path d="M14 22 Q50 4 86 22" fill="none" stroke="#9ad7f5" stroke-width="6" stroke-linecap="round"/>`},{kind:"rocker",name:"Rocker",cat:"furniture",w:190,svg:`${Le}<path d="M16 88 Q50 98 84 88" fill="none" ${H}/><path d="M28 84 Q50 74 72 84" fill="#c9a0dc" ${H}/><rect x="30" y="28" width="40" height="36" rx="12" fill="#e4ccf2" ${H}/><path d="M22 48 Q18 70 30 80 H70 Q82 70 78 48 Z" fill="#f6e6ff" ${H}/><rect x="36" y="58" width="28" height="12" rx="6" fill="#ffc8dd" ${H}/><circle cx="50" cy="40" r="6" fill="#fff" opacity=".7"/>`},{kind:"changing-table",name:"Changing Table",cat:"furniture",w:230,svg:`${Le}<rect x="8" y="36" width="84" height="16" rx="8" fill="#fff" ${H}/><rect x="14" y="40" width="72" height="8" rx="4" fill="#ffd6e8"/><rect x="16" y="52" width="28" height="32" rx="6" fill="#bde0fe" ${H}/><rect x="56" y="52" width="28" height="32" rx="6" fill="#c9f0d8" ${H}/><path d="M22 60 H38 M22 68 H38 M62 60 H78 M62 68 H78" ${H}/><rect x="18" y="84" width="8" height="10" rx="2" fill="${Ft}"/><rect x="74" y="84" width="8" height="10" rx="2" fill="${Ft}"/><rect x="34" y="22" width="18" height="12" rx="3" fill="#ffe0ec" ${H}/><rect x="54" y="24" width="16" height="10" rx="3" fill="#fff6d8" ${H}/>`},{kind:"toy-bin",name:"Toy Bin",cat:"furniture",w:150,svg:`${Le}<path d="M14 40 H86 L78 90 H22 Z" fill="#ffd166" ${H}/><rect x="10" y="32" width="80" height="14" rx="7" fill="#ffe08a" ${H}/><circle cx="36" cy="58" r="8" fill="#ff8fab" ${H}/><rect x="50" y="50" width="16" height="16" rx="3" fill="#8ecae6" ${H}/><circle cx="62" cy="70" r="6" fill="#90e0a8" ${H}/>`},{kind:"baby-shelf",name:"Bookshelf",cat:"furniture",w:150,svg:`${Le}<rect x="14" y="8" width="72" height="84" rx="8" fill="#f3d2b5" ${H}/><path d="M14 36 H86 M14 64 H86" ${H}/><rect x="22" y="14" width="8" height="18" rx="2" fill="#ff8fab" ${H}/><rect x="32" y="18" width="8" height="14" rx="2" fill="#8ecae6" ${H}/><rect x="44" y="14" width="8" height="18" rx="2" fill="#ffd166" ${H}/><rect x="58" y="16" width="8" height="16" rx="2" fill="#90e0a8" ${H}/><circle cx="34" cy="50" r="7" fill="#ffadad" ${H}/><rect x="50" y="44" width="18" height="14" rx="3" fill="#c9a0dc" ${H}/><ellipse cx="40" cy="78" rx="14" ry="8" fill="#fff" ${H}/>`},{kind:"doll-rose",name:"Rose Doll",cat:"decor",w:80,svg:Ca("#f6d3b0","#ffc2d4","#ff8fab")},{kind:"doll-honey",name:"Honey Doll",cat:"decor",w:80,svg:Ca("#e0ac69","#cdeffd","#ffd166")},{kind:"doll-cocoa",name:"Cocoa Doll",cat:"decor",w:80,svg:Ca("#8d5524","#d8f3dc","#c9a0dc")},{kind:"crib-mobile",name:"Crib Mobile",cat:"decor",w:150,wall:!0,svg:`<path d="M50 6 V22" ${H}/><ellipse cx="50" cy="28" rx="28" ry="8" fill="#fff" ${H}/><path d="M28 32 V48 M50 36 V58 M72 32 V48" ${H}/><circle cx="28" cy="56" r="8" fill="#ffd166" ${H}/><circle cx="50" cy="68" r="9" fill="#ff8fab" ${H}/><path d="M72 56 l6 4 -6 4 -6 -4 z" fill="#8ecae6" ${H}/><circle cx="28" cy="54" r="2" fill="#fff"/><circle cx="50" cy="66" r="2" fill="#fff"/>`},{kind:"night-light",name:"Night Light",cat:"decor",w:70,svg:`${Le}<circle cx="50" cy="46" r="22" fill="#fff6c8" ${H}/><circle cx="50" cy="46" r="12" fill="#ffe08a"/><path d="M50 18 V10 M30 26 L24 20 M70 26 L76 20 M24 46 H14 M86 46 H76" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><rect x="40" y="70" width="20" height="16" rx="4" fill="#c9a0dc" ${H}/><circle cx="50" cy="78" r="3" fill="#ff8fab"/>`},{kind:"bunny-plush",name:"Bunny Plush",cat:"decor",w:90,svg:`${Le}<ellipse cx="34" cy="28" rx="8" ry="18" fill="#fff" ${H}/><ellipse cx="66" cy="28" rx="8" ry="18" fill="#fff" ${H}/><ellipse cx="34" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="66" cy="30" rx="3" ry="10" fill="#ffc8dd"/><ellipse cx="50" cy="74" rx="26" ry="18" fill="#fff" ${H}/><circle cx="50" cy="50" r="20" fill="#fff" ${H}/>${xd(43,57,50)}<path d="M47 58 l3 3 3 -3" fill="none" ${H}/>${_d(38,62,58)}`},{kind:"stacking-rings",name:"Stacking Rings",cat:"decor",w:70,svg:`${Le}<ellipse cx="50" cy="86" rx="26" ry="7" fill="#ff8fab" ${H}/><ellipse cx="50" cy="74" rx="20" ry="6" fill="#ffd166" ${H}/><ellipse cx="50" cy="64" rx="15" ry="5" fill="#8ecae6" ${H}/><ellipse cx="50" cy="56" rx="10" ry="4" fill="#90e0a8" ${H}/><rect x="46" y="28" width="8" height="40" rx="4" fill="#c9a0dc" ${H}/><circle cx="50" cy="24" r="7" fill="#ffb3c6" ${H}/>`},{kind:"rattle",name:"Rattle",cat:"decor",w:60,svg:`${Le}<circle cx="38" cy="40" r="20" fill="#ffd166" ${H}/><circle cx="32" cy="34" r="5" fill="#fff" opacity=".7"/><rect x="50" y="52" width="10" height="28" rx="5" fill="#ff8fab" ${H} transform="rotate(-20 55 66)"/><circle cx="68" cy="82" r="8" fill="#8ecae6" ${H}/>`},{kind:"baby-bottle",name:"Baby Bottle",cat:"food",w:55,svg:`${Le}<rect x="36" y="8" width="28" height="12" rx="4" fill="#c9a0dc" ${H}/><rect x="42" y="18" width="16" height="8" fill="#fff" ${H}/><path d="M30 30 H70 L66 88 Q50 96 34 88 Z" fill="#e7f6ff" ${H}/><path d="M32 48 H68 L66 80 Q50 88 34 80 Z" fill="#fff" opacity=".85"/><rect x="34" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="46" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/><rect x="58" y="40" width="8" height="4" rx="1" fill="#9ad7f5"/>`},{kind:"blocks",name:"Baby Blocks",cat:"decor",w:90,svg:`${Le}<rect x="14" y="58" width="28" height="28" rx="4" fill="#ff8fab" ${H}/><rect x="40" y="46" width="28" height="28" rx="4" fill="#ffd166" ${H}/><rect x="28" y="28" width="26" height="26" rx="4" fill="#8ecae6" ${H}/><path d="M20 72 H36 M48 60 H62 M34 42 H48" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},{kind:"rocking-horse",name:"Little Rocking Horse",cat:"decor",w:180,svg:`${Le}<path d="M12 86 Q50 98 88 82" fill="none" ${H}/><ellipse cx="48" cy="62" rx="26" ry="14" fill="#e6b88a" ${H}/><path d="M62 58 L84 40 Q92 36 90 48 L74 64 Z" fill="#f0d0b0" ${H}/><circle cx="82" cy="42" r="3" fill="${Ft}"/><path d="M70 36 L76 24 L84 34" fill="#ff8fab" ${H}/><rect x="36" y="48" width="16" height="8" rx="3" fill="#c9a0dc" ${H}/><path d="M30 70 L22 84 M58 72 L66 86" ${H}/>`},{kind:"music-box",name:"Music Box",cat:"decor",w:80,svg:`${Le}<rect x="22" y="40" width="56" height="46" rx="8" fill="#f6d6ff" ${H}/><path d="M22 40 L50 22 L78 40" fill="#e4ccf2" ${H}/><circle cx="50" cy="64" r="10" fill="#fff" ${H}/><path d="M50 58 V70 M44 64 H56" ${H}/><circle cx="50" cy="30" r="4" fill="#ffd166" ${H}/>`},{kind:"cloud-rug",name:"Nursery Cloud Rug",cat:"decor",w:340,svg:`<ellipse cx="50" cy="78" rx="46" ry="16" fill="#e7f6ff" ${H}/><circle cx="28" cy="70" r="16" fill="#f4fbff" ${H}/><circle cx="50" cy="62" r="18" fill="#fff" ${H}/><circle cx="72" cy="70" r="16" fill="#f4fbff" ${H}/><ellipse cx="50" cy="78" rx="30" ry="8" fill="#d6f0ff"/>`},{kind:"play-mat",name:"Play Mat",cat:"decor",w:300,svg:`<rect x="6" y="62" width="88" height="30" rx="14" fill="#ffe0ec" ${H}/><path d="M50 70 C42 62 30 64 34 74 C38 82 50 88 50 88 C50 88 62 82 66 74 C70 64 58 62 50 70 Z" fill="#ff8fab" ${H}/><circle cx="22" cy="76" r="5" fill="#ffd166" ${H}/><circle cx="78" cy="76" r="5" fill="#8ecae6" ${H}/>`},{kind:"moon-art",name:"Moon and Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M58 18 A28 28 0 1 0 58 78 A18 18 0 1 1 58 18 Z" fill="#fff3b0" ${H}/><path d="M22 30 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1 z" fill="#ffd166" ${H}/><path d="M78 58 l2 5 5 1 -4 4 1 5 -4 -3 -4 3 1 -5 -4 -4 5 -1 z" fill="#c9e7ff" ${H}/>`},{kind:"nursery-dresser",name:"Nursery Dresser",cat:"furniture",w:170,svg:`${Le}<rect x="14" y="22" width="72" height="68" rx="8" fill="#f6e2c4" ${H}/><path d="M14 44 H86 M14 66 H86" ${H}/><circle cx="50" cy="34" r="3" fill="${Ft}"/><circle cx="50" cy="55" r="3" fill="${Ft}"/><circle cx="50" cy="76" r="3" fill="${Ft}"/><rect x="30" y="10" width="18" height="12" rx="3" fill="#ffc2d4" ${H}/><rect x="52" y="12" width="16" height="10" rx="3" fill="#c9e7ff" ${H}/>`},{kind:"nursery-lamp",name:"Nursery Lamp",cat:"decor",w:80,svg:`${Le}<path d="M28 42 L36 12 H64 L72 42 Z" fill="#fff6c8" ${H}/><rect x="46" y="42" width="8" height="40" rx="4" fill="#c9a0dc" ${H}/><ellipse cx="50" cy="88" rx="20" ry="6" fill="#b388d6" ${H}/><circle cx="46" cy="24" r="3" fill="#fff" opacity=".85"/><path d="M34 20 q6 -8 4 -2" fill="none" stroke="#ffd166" stroke-width="2"/>`},{kind:"nursery-curtains",name:"Curtains",cat:"decor",w:180,wall:!0,svg:`<rect x="16" y="10" width="68" height="50" rx="6" fill="#cfefff" ${H}/><path d="M50 10 V60 M16 34 H84" ${H}/><path d="M8 8 Q18 28 10 92" fill="#ffd6e8" ${H}/><path d="M92 8 Q82 28 90 92" fill="#ffd6e8" ${H}/><rect x="6" y="6" width="88" height="8" rx="3" fill="#f3d2b5" ${H}/>`}],Se="#5a3d5c",y=(e=3.5)=>`stroke="${Se}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function ie(e,t,n){const s=Math.round(t*.62);return`<ellipse cx="${e}" cy="${n}" rx="${t}" ry="3.4" fill="${Se}" opacity=".08"/><ellipse cx="${e}" cy="${(n+1.2).toFixed(1)}" rx="${s}" ry="1.55" fill="${Se}" opacity=".12"/>`}function O(e,t=2.2){return`<path d="${e}" fill="none" stroke="#fff" stroke-width="${t}" stroke-linecap="round" opacity=".75"/>`}function Pe(e,t=1.15){return`<path d="${e}" fill="none" stroke="${Se}" stroke-width="${t}" stroke-linecap="round" opacity=".2"/>`}function Ir(e,t,n=".7"){return`<radialGradient id="${e}" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="${t}" stop-opacity="${n}"/><stop offset="1" stop-color="${t}" stop-opacity="0"/></radialGradient>`}function Or(e,t,n){return`<linearGradient id="${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t}"/><stop offset="1" stop-color="${n}"/></linearGradient>`}function Eb(){return typeof location>"u"?!1:/(?:^|[?&])yard=1(?:&|$)/.test(location.search)}function tr(){return typeof location>"u"?"":new URLSearchParams(location.search).get("shot")||""}const Qb={v:1,hair:"pigtails",hairC:"#a0522d",skin:"#f6d2b5",eyes:"big",eyeC:"#5a321c",freckles:!0,blush:!0,top:"classic",topC:"#ff7aa8",bottom:"skirt",bottomC:"#c9a0dc",dress:"sundress",dressC:"#ff8fab",shoes:"maryjanes",shoesC:"#ffd166",acc:["bow"],accC:"#ff7aa8"},Ab=()=>po(Qb),nr=864,sr={x:1084,y:578,flip:!0},wn={x:1184,y:255},sc={x:1146,y:578},or={x:940,y:540,flip:!0},_i=1160,Ld={x:824,y:398,w:96,h:230},Cd={x:996,y:372,w:82,h:196},zb=[{kind:"yard-swing",x:1266,y:580,scale:132/280},{kind:"lemonade-cart",x:1254,y:471},{kind:"sandbox",x:940,y:482},{kind:"picnic-blanket",x:939,y:420}];function ae(e){return{kind:e.kind,name:e.name,cat:e.cat,w:e.w,h:e.h,vb:e.vb,wall:e.wall,holdable:e.holdable??!1,rooms:["backyard"],svg:e.svg}}const Db=ae({kind:"yard-swing",name:"A-Frame Swing",cat:"furniture",w:280,h:215,vb:"0 0 130 100",svg:`${ie(65,54,96)}
    <path d="M34 18 L50 18 L20 94 H4 Z" fill="#f3d2aa" ${y()}/>
    <path d="M42 24 L50 18 L18 70 H28 Z" fill="#d4a373"/>
    <path d="M80 18 L96 18 L126 94 H110 Z" fill="#e7c49a" ${y()}/>
    <path d="M108 22 L96 18 L126 94 H118 Z" fill="#c99366"/>
    ${Pe("M16 50 l8 28 M112 48 l8 30")}
    <rect x="22" y="6" width="86" height="14" rx="2" fill="#f6e0c4" ${y()}/>
    <rect x="86" y="9" width="18" height="8" rx="1" fill="#d4a373"/>
    <rect x="28" y="16" width="74" height="4" fill="#e7c49a"/>
    ${O("M28 10 h30")}
    <g class="swingSeat">
      <rect x="48" y="74" width="34" height="7" rx="1" fill="#f3d2aa" ${y(2.2)}/>
      <rect x="72" y="76" width="8" height="4" fill="#d4a373"/>
      <path d="M54 20 V78 M76 20 V78" fill="none" ${y(2.2)}/>
      ${O("M52 76 h14")}
    </g>`}),Zb=ae({kind:"sandbox",name:"Sandbox",cat:"furniture",w:120,h:54,vb:"0 0 160 72",svg:`${ie(80,64,68)}
    <path d="M108 38 L146 26 L146 52 L108 64 Z" fill="#e7c49a" ${y()}/>
    <path d="M126 36 L142 28 L142 48 L126 56 Z" fill="#c99366"/>
    <path d="M12 40 H108 V64 H12 Z" fill="#f3d2aa" ${y()}/>
    <path d="M12 40 L36 18 L146 18 L108 40 Z" fill="#f6e0c4" ${y()}/>
    <path d="M112 20 L142 20 L108 38 L90 38 Z" fill="#d4a373"/>
    <path d="M34 36 L52 24 L122 24 L100 36 Z" fill="#ffe08a" ${y(2.2)}/>
    <path d="M98 26 L118 26 L100 34 L86 34 Z" fill="#f0c36a"/>
    ${Pe("M48 30 q8 2 6 5 M68 28 q10 2 8 6 M58 34 h16")}
    <path d="M76 30 L100 36 L94 48 L70 42 Z" fill="#d7e6f2" ${y(2.2)}/>
    <path d="M88 34 L98 38 L94 44 L84 40 Z" fill="#b7c9d6"/>
    <path d="M52 8 L64 4 L90 34 L78 38 Z" fill="#f0d2b0" ${y()}/>
    <path d="M64 8 L72 6 L90 32 L82 34 Z" fill="#d4a373"/>
    <path d="M46 2 H66 V9 H46 Z" fill="#c99366" ${y(2)}/>
    ${O("M18 44 h26")}
    ${O("M44 22 h22")}`}),qb=ae({kind:"little-slide",name:"Little Slide",cat:"furniture",w:150,h:188,vb:"0 0 110 140",svg:`${ie(56,44,134)}
    <path d="M50 34 H72 C94 36 102 56 98 82 L92 122 H70 L76 84 C78 60 72 46 52 44 Z" fill="#ffb3c6" ${y()}/>
    <path d="M72 38 C94 42 104 62 100 86 L94 122 H86 L92 86 C94 64 86 48 72 46 Z" fill="#e45d88"/>
    <rect x="14" y="34" width="8" height="96" rx="2" fill="#f3d2aa" ${y()}/>
    <rect x="36" y="34" width="8" height="96" rx="2" fill="#e7c49a" ${y()}/>
    <rect x="40" y="40" width="3" height="84" fill="#c99366"/>
    <rect x="14" y="52" width="30" height="5" rx="1" fill="#f6e0c4" ${y(2.2)}/>
    <rect x="14" y="70" width="30" height="5" rx="1" fill="#f6e0c4" ${y(2.2)}/>
    <rect x="14" y="88" width="30" height="5" rx="1" fill="#f6e0c4" ${y(2.2)}/>
    <rect x="14" y="106" width="30" height="5" rx="1" fill="#f6e0c4" ${y(2.2)}/>
    <rect x="6" y="18" width="56" height="22" rx="3" fill="#f3d2aa" ${y()}/>
    <rect x="6" y="34" width="56" height="6" fill="#d4a373"/>
    <path d="M48 20 H62 V40 H48 Z" fill="#c99366"/>
    ${O("M12 24 h22")}
    <rect x="12" y="6" width="5" height="16" rx="1" fill="#f0d2b0" ${y(2.2)}/>
    <rect x="40" y="6" width="5" height="16" rx="1" fill="#e7c49a" ${y(2.2)}/>
    <path d="M14 8 H43" fill="none" ${y(2.2)}/>
    <rect x="80" y="116" width="7" height="16" rx="1" fill="#f3d2aa" ${y(2)}/>
    ${O("M58 42 C74 48 86 66 86 88")}
    ${Pe("M80 64 q4 16 2 28")}`}),Ib=ae({kind:"yard-bench",name:"Garden Bench",cat:"furniture",w:140,h:100,vb:"0 0 140 100",svg:`${ie(70,58,96)}
    <rect x="10" y="8" width="12" height="86" rx="2" fill="#f3d2aa" ${y()}/>
    <rect x="118" y="8" width="12" height="86" rx="2" fill="#e7c49a" ${y()}/>
    <rect x="124" y="12" width="5" height="76" fill="#c99366"/>
    <rect x="28" y="52" width="10" height="42" rx="2" fill="#f0d2b0" ${y()}/>
    <rect x="102" y="52" width="10" height="42" rx="2" fill="#d4a373" ${y()}/>
    <rect x="108" y="56" width="3" height="32" fill="#c99366"/>
    <rect x="18" y="10" width="104" height="8" rx="1" fill="#f6e0c4" ${y(2.2)}/>
    <rect x="18" y="20" width="104" height="8" rx="1" fill="#f3d2aa" ${y(2.2)}/>
    <rect x="18" y="30" width="104" height="8" rx="1" fill="#f3d2aa" ${y(2.2)}/>
    <rect x="18" y="40" width="104" height="8" rx="1" fill="#e7c49a" ${y(2.2)}/>
    <rect x="18" y="48" width="104" height="7" rx="1" fill="#f6e0c4" ${y(2.2)}/>
    <rect x="18" y="57" width="104" height="7" rx="1" fill="#f3d2aa" ${y(2.2)}/>
    <rect x="18" y="66" width="104" height="7" rx="1" fill="#e7c49a" ${y(2.2)}/>
    <rect x="108" y="12" width="10" height="5" fill="#d4a373"/>
    <rect x="108" y="22" width="10" height="5" fill="#c99366"/>
    <rect x="108" y="50" width="10" height="4" fill="#d4a373"/>
    <rect x="108" y="68" width="10" height="4" fill="#c99366"/>
    <path d="M10 46 H40 V56 H10 Z" fill="#f6e0c4" ${y()}/>
    <path d="M100 46 H130 V56 H100 Z" fill="#e7c49a" ${y()}/>
    <path d="M116 48 H128 V54 H116 Z" fill="#c99366"/>
    ${O("M22 13 h28")}
    ${O("M14 48 h16")}
    ${Pe("M36 24 h48 M36 34 h44 M34 52 h52 M34 62 h46")}`}),Ob=ae({kind:"lemonade-cart",name:"Lemonade Cart",cat:"furniture",w:108,h:121,vb:"0 0 100 112",svg:`${ie(50,40,106)}
    <circle cx="30" cy="96" r="11" fill="${Se}" ${y(2.2)}/><circle cx="30" cy="96" r="4.5" fill="#ffd166"/>
    <circle cx="72" cy="96" r="11" fill="${Se}" ${y(2.2)}/><circle cx="72" cy="96" r="4.5" fill="#ffd166"/>
    <rect x="18" y="92" width="66" height="5" rx="2" fill="#c99366" ${y(2)}/>
    <rect x="16" y="46" width="68" height="46" rx="3" fill="#fff6ea" ${y()}/>
    <rect x="66" y="50" width="14" height="38" fill="#f0d2a4"/>
    ${Pe("M28 56 v28 M42 56 v28 M56 56 v28")}
    ${O("M20 52 v16")}
    <rect x="12" y="38" width="76" height="12" rx="2" fill="#ffe08a" ${y()}/>
    <rect x="66" y="40" width="18" height="8" fill="#f0c45c"/>
    <path d="M14 40 L22 14 H80 L88 40 Z" fill="#ff8fab" ${y()}/>
    <path d="M34 16 L38 40 H50 L46 15 Z" fill="#fff4f7"/>
    <path d="M58 15 L62 40 H74 L70 15 Z" fill="#fff4f7"/>
    <path d="M72 16 H80 L88 40 H76 Z" fill="#e45d88"/>
    ${O("M26 20 h18")}
    <path d="M28 52 H44 L42 72 H30 Z" fill="#fff" ${y(2)}/>
    <path d="M30 58 H42 L41 72 H31 Z" fill="#ffe566"/>
    <path d="M28 54 L22 58 L28 62 Z" fill="#fff" ${y(2)}/>
    <path d="M44 56 Q52 60 44 70" fill="none" ${y(2)}/>
    <path d="M56 60 H68 L66 72 H58 Z" fill="#fff" ${y(2)}/>
    <path d="M58 64 H66 L65 72 H59 Z" fill="#ffe566"/>
    <circle cx="78" cy="64" r="7" fill="#ffe566" ${y(2)}/>
    <path d="M78 58 v12 M72 64 h12" fill="none" stroke="#e0a83a" stroke-width="1.3"/>`}),Nb=ae({kind:"sun-lounger",name:"Sun Lounger",cat:"furniture",w:168,h:86,vb:"0 0 170 90",svg:`${ie(86,68,84)}
    <path d="M16 66 H28 L32 82 H12 Z" fill="#f3d2aa" ${y()}/>
    <path d="M126 64 H140 L146 82 H120 Z" fill="#d4a373" ${y()}/>
    <path d="M136 68 H142 L146 80 H138 Z" fill="#c99366"/>
    <path d="M12 52 H156 V64 H12 Z" fill="#f3d2aa" ${y()}/>
    <path d="M122 54 H154 V62 H122 Z" fill="#d4a373"/>
    <path d="M28 34 H36 L42 52 H32 Z" fill="#e7c49a" ${y()}/>
    <path d="M50 44 H150 L154 58 H54 Z" fill="#ffd4e2" ${y()}/>
    <path d="M128 48 H150 L154 58 H132 Z" fill="#e888a8"/>
    <path d="M18 6 L60 48 L48 58 L8 16 Z" fill="#ffb3c6" ${y()}/>
    <path d="M38 34 L54 48 L48 56 L30 42 Z" fill="#e45d88"/>
    <ellipse cx="22" cy="14" rx="11" ry="7" fill="#fff" ${y(2.2)}/>
    <path d="M22 8 H30 A7 7 0 0 1 30 20 H22 Z" fill="#ffd0e0"/>
    ${O("M22 12 L50 40")}
    ${Pe("M26 22 L52 46")}`}),jb=ae({kind:"splash-pool",name:"Splash Pool",cat:"furniture",w:176,h:96,vb:"0 0 170 96",svg:`<defs>${Or("ydpoolW","#f3fbff","#7ec8e3")}</defs>
    ${ie(85,72,90)}
    <ellipse cx="85" cy="58" rx="74" ry="28" fill="#8ecae6" ${y()}/>
    <path d="M22 52 Q40 34 78 40" fill="none" stroke="#ff8fab" stroke-width="16" stroke-linecap="round"/>
    <path d="M100 36 Q138 38 152 58" fill="none" stroke="#ffd166" stroke-width="14" stroke-linecap="round"/>
    <path d="M18 66 C22 82 50 90 85 90 C120 90 152 82 154 66 C148 78 120 84 85 84 C50 84 24 78 18 66 Z" fill="#5aa9c6"/>
    <ellipse cx="85" cy="54" rx="48" ry="16" fill="url(#ydpoolW)" ${y(2.2)}/>
    ${O("M36 50 q20 -10 36 0")}
    <circle cx="128" cy="48" r="4" fill="#fff" ${y(1.6)}/>
    <circle cx="128" cy="48" r="1.6" fill="#8ecae6"/>
    <path d="M70 46 q3 -8 1 0 M96 42 q4 -9 1 1" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`}),Fb=ae({kind:"picket-gate",name:"Picket Gate",cat:"furniture",w:110,h:150,vb:"0 0 100 136",svg:`${ie(50,38,130)}
    <rect x="6" y="16" width="12" height="110" rx="2" fill="#f7fff8" ${y()}/>
    <rect x="82" y="16" width="12" height="110" rx="2" fill="#e7f6ea" ${y()}/>
    <rect x="88" y="20" width="5" height="100" fill="#c5e0c8"/>
    <rect x="4" y="40" width="16" height="6" rx="1" fill="#c99366" ${y(2)}/>
    <rect x="4" y="96" width="16" height="6" rx="1" fill="#c99366" ${y(2)}/>
    <rect x="16" y="38" width="68" height="8" rx="2" fill="#fff" ${y(2.2)}/>
    <rect x="16" y="86" width="68" height="8" rx="2" fill="#fff" ${y(2.2)}/>
    <path d="M20 90 L28 98 L80 46 L72 38 Z" fill="#f7fff8" ${y(2.2)}/>
    <path d="M26 30 L32 14 L38 30 V112 H26 Z" fill="#fff" ${y(2.2)}/>
    <path d="M44 30 L50 14 L56 30 V112 H44 Z" fill="#f7fff8" ${y(2.2)}/>
    <path d="M62 30 L68 14 L74 30 V112 H62 Z" fill="#e7f6ea" ${y(2.2)}/>
    <path d="M68 22 L74 16 L74 108 H68 Z" fill="#c5e0c8"/>
    ${O("M28 36 v20")}
    <rect x="74" y="60" width="16" height="5" rx="1" fill="#c99366" ${y(2)}/>
    <circle cx="86" cy="62" r="2.6" fill="#ffd166" ${y(1.8)}/>`});function Vb(){let e="";for(let t=0;t<6;t++)for(let n=0;n<13;n++)(t+n)%2===0&&(e+=`<rect x="${n*15-6}" y="${t*10}" width="15" height="10" fill="#ff8fab"/>`);return e}const Gb=ae({kind:"picnic-blanket",name:"Picnic Blanket",cat:"decor",w:110,h:36,vb:"0 0 180 59",svg:`<defs><clipPath id="ydging"><path d="M22 20 L156 12 L174 44 L36 52 Z"/></clipPath></defs>
    ${ie(96,74,54)}
    <path d="M22 20 L156 12 L174 44 L36 52 Z" fill="#fff0f5" ${y()}/>
    <g clip-path="url(#ydging)">${Vb()}</g>
    <path d="M148 14 L170 42 L160 46 L138 18 Z" fill="#e45d88"/>
    <path d="M96 30 L128 26 L134 42 L100 46 Z" fill="#f3d2aa" ${y(2)}/>
    <path d="M120 28 L128 26 L134 42 L126 43 Z" fill="#c99366"/>
    <path d="M104 30 Q114 14 126 28" fill="none" ${y(2.2)}/>
    ${Pe("M104 34 h22 M104 38 h24",1)}
    ${O("M34 26 l28 -3")}`});function Zs(e,t,n,s){return`<path d="M${e-1.5} ${t+16} H${e+1.5} V${t+40} H${e-1.5} Z" fill="#3d9a68"/>
    <path d="M${e} ${t+24} C${e-16} ${t+18} ${e-14} ${t+36} ${e-1} ${t+34}" fill="#74c69d" ${y(1.6)}/>
    <path d="M${e} ${t+22} C${e+16} ${t+16} ${e+12} ${t+36} ${e+1} ${t+32}" fill="#52b788"/>
    <path d="M${e} ${t+18} C${e-10} ${t+8} ${e-8} ${t} ${e} ${t+6} C${e+8} ${t} ${e+10} ${t+8} ${e} ${t+18} Z" fill="${n}" ${y(1.8)}/>
    <path d="M${e+1} ${t+6} C${e+7} ${t+4} ${e+8} ${t+13} ${e+1} ${t+15} Z" fill="${s}"/>`}const Yb=ae({kind:"tulip-bed",name:"Tulip Bed",cat:"decor",w:140,h:90,vb:"0 0 140 90",svg:`${ie(70,56,86)}
    <path d="M10 56 H130 L120 82 H20 Z" fill="#f0d2b0" ${y()}/>
    <path d="M96 58 H126 L118 78 H92 Z" fill="#d4a373"/>
    <path d="M16 56 Q70 42 124 56 Q70 64 16 56 Z" fill="#c4a484" ${y(2.2)}/>
    ${O("M22 60 h24")}
    ${Zs(32,16,"#ff8fab","#e45d88")}
    ${Zs(54,8,"#ffd166","#e0a83a")}
    ${Zs(76,4,"#ff7096","#e04578")}
    ${Zs(98,12,"#fff","#ffd0e0")}
    ${Zs(118,18,"#c9a0dc","#b388d6")}`}),Kb=ae({kind:"birdbath",name:"Birdbath",cat:"decor",w:84,h:126,vb:"0 0 80 120",svg:`<defs>${Or("ydbathW","#f3fbff","#8ecae6")}</defs>
    ${ie(40,28,114)}
    <ellipse cx="40" cy="106" rx="20" ry="7" fill="#e7eef2" ${y()}/>
    <path d="M30 46 H50 C56 70 58 86 52 104 H28 C22 86 24 70 30 46 Z" fill="#f4f7f8" ${y()}/>
    <path d="M42 52 H50 C54 72 54 88 50 100 H44 Z" fill="#c5d0d6"/>
    ${O("M33 62 v22")}
    <ellipse cx="40" cy="40" rx="32" ry="13" fill="#f7fafb" ${y()}/>
    <path d="M40 28 C66 28 72 38 72 42 C72 52 58 54 40 54 C60 54 68 48 68 42 C68 36 58 32 40 34 Z" fill="#d5dee4"/>
    <ellipse cx="40" cy="38" rx="22" ry="7" fill="url(#ydbathW)" ${y(2.2)}/>
    ${O("M22 36 q10 -4 18 0")}
    <path d="M48 30 L40 24 L42 34 Z" fill="#f0c45c" ${y(1.6)}/>
    <ellipse cx="56" cy="28" rx="11" ry="6" fill="#ffd166" ${y(1.8)}/>
    <circle cx="66" cy="24" r="4.5" fill="#ffe08a" ${y(1.6)}/>
    <path d="M70 24 L77 26 L70 28 Z" fill="#e07a3f"/>
    <circle cx="67" cy="23" r="1" fill="${Se}"/>
    <path d="M54 32 V40 M60 32 V40" fill="none" stroke="#c99366" stroke-width="1.4" stroke-linecap="round"/>`}),Xb=ae({kind:"lily-pond",name:"Lily Pond",cat:"decor",w:170,h:90,vb:"0 0 170 90",svg:`<defs>${Or("ydpondW","#eaf6ff","#5aa9e6")}</defs>
    ${ie(85,70,84)}
    <ellipse cx="85" cy="54" rx="74" ry="28" fill="#c4a484" ${y()}/>
    <path d="M85 30 C142 32 158 48 158 56 C158 72 126 82 85 82 C124 80 150 68 150 56 C150 44 126 36 85 36 Z" fill="#a88462"/>
    <ellipse cx="85" cy="52" rx="62" ry="20" fill="url(#ydpondW)" ${y(2.2)}/>
    ${O("M40 46 q24 -8 42 2")}
    <path fill="#95d5b2" ${y(2)} fill-rule="evenodd" d="M58 54 m-16 0 a16 7 0 1 0 32 0 a16 7 0 1 0 -32 0 M58 50 L72 54 L58 58 Z"/>
    <path d="M66 50 L74 54 L66 56 Z" fill="#3d9a68"/>
    <path fill="#74c69d" ${y(2)} fill-rule="evenodd" d="M112 48 m-18 0 a18 8 0 1 0 36 0 a18 8 0 1 0 -36 0 M112 42 L128 48 L112 54 Z"/>
    <path d="M40 58 q-4 -16 2 -22 q6 8 2 16" fill="#52b788" ${y(1.6)}/>
    <path d="M108 40 l2 -8 l4 6 l4 -7 l2 8 l-4 3 z" fill="#ff8fab" ${y(1.6)}/>
    <path d="M112 36 l3 -6 l2 5 l3 -5 l1 6 z" fill="#fff" ${y(1.4)}/>
    <circle cx="112" cy="40" r="2.4" fill="#ffd166"/>`});function qs(e,t,n,s,o=10){return`<path d="M${e} ${t-o-8} V${t-o}" fill="none" ${y(2.2)}/>
    <rect x="${e-4}" y="${t-o-2}" width="8" height="5" rx="1" fill="#c99366" ${y(1.8)}/>
    <circle cx="${e}" cy="${t}" r="${o}" fill="${n}" ${y()}/>
    <path d="M${e+1} ${t-o+3} H${e+o-1} V${t+o-3} H${e+2} Z" fill="${s}"/>
    ${O(`M${e-o+3} ${t-2} q2 -3 4 0`)}`}const Jb=ae({kind:"patio-lights",name:"Patio Lights",cat:"decor",w:190,h:70,vb:"0 0 180 70",wall:!0,svg:`<path d="M8 12 Q50 32 90 12 Q130 32 172 14" fill="none" ${y()}/>
    ${qs(28,40,"#fff6c8","#f0c45c")}
    ${qs(64,46,"#ffc2d4","#e45d88")}
    ${qs(100,36,"#fff1c2","#f0c45c")}
    ${qs(136,46,"#c9f1ff","#7eb4dc")}
    ${qs(164,34,"#ffd0e8","#e888a8",8)}`}),ev=ae({kind:"toadstool-light",name:"Toadstool Light",cat:"decor",w:70,h:84,vb:"0 0 80 96",svg:`<defs>${Ir("ydtoadG","#ffe7a0",".9")}</defs>
    ${ie(40,26,90)}
    <ellipse cx="40" cy="70" rx="18" ry="8" fill="url(#ydtoadG)"/>
    <path d="M32 58 H48 L52 84 H28 Z" fill="#fff7f8" ${y()}/>
    <path d="M42 60 H48 L50 82 H43 Z" fill="#f0d8cc"/>
    <path d="M6 58 Q40 8 74 58 Q40 74 6 58 Z" fill="#ff8fab" ${y()}/>
    <path d="M44 22 Q66 16 72 54 Q52 66 44 52 Z" fill="#e45d88"/>
    ${O("M18 48 q16 -12 26 -2")}
    <circle cx="26" cy="48" r="5" fill="#fff" ${y(2)}/>
    <circle cx="44" cy="40" r="6" fill="#fff" ${y(2)}/>
    <circle cx="36" cy="56" r="3.5" fill="#fff" ${y(2)}/>
    <path d="M22 52 h6 M40 46 h8" fill="none" stroke="#ffd0e0" stroke-width="1.2" stroke-linecap="round"/>`}),tv=ae({kind:"stepping-stones",name:"Stepping Stones",cat:"decor",w:160,h:64,vb:"0 0 160 70",svg:`${ie(80,66,64)}
    <path d="M8 40 L24 28 L50 32 L54 50 L30 58 L10 52 Z" fill="#f7f4ef" ${y()}/>
    <path d="M34 36 L50 32 L54 50 L36 54 Z" fill="#d9d3cc"/>
    <path d="M56 44 L78 32 L108 36 L112 56 L80 64 L58 58 Z" fill="#f4f1ec" ${y()}/>
    <path d="M86 40 L108 36 L112 56 L90 58 Z" fill="#d4cdc4"/>
    <path d="M110 30 L128 20 L154 28 L150 48 L124 52 L108 42 Z" fill="#e7e2dc" ${y()}/>
    <path d="M132 26 L152 28 L148 46 L130 44 Z" fill="#d0c9c2"/>
    ${O("M16 38 q8 -4 14 0")}
    ${Pe("M22 44 h12 M72 48 h16 M124 36 h12")}`}),nv=ae({kind:"pinwheel",name:"Pinwheel",cat:"decor",w:56,h:90,vb:"0 0 70 100",holdable:!0,svg:`${ie(35,16,96)}
    <rect x="31" y="44" width="6" height="50" rx="2" fill="#c99366" ${y()}/>
    <rect x="34" y="48" width="3" height="42" fill="#c99366"/>
    <path d="M34 40 L34 8 Q54 16 48 36 Z" fill="#ff8fab" ${y(2.2)}/>
    <path d="M42 18 Q50 28 36 34 Z" fill="#e45d88"/>
    <path d="M34 40 L62 32 Q58 54 40 50 Z" fill="#ffd166" ${y(2.2)}/>
    <path d="M54 38 Q58 48 42 46 Z" fill="#e0a83a"/>
    <path d="M34 40 L34 72 Q14 64 20 44 Z" fill="#8ecae6" ${y(2.2)}/>
    <path d="M26 58 Q16 50 32 46 Z" fill="#5aa9d6"/>
    <path d="M34 40 L6 48 Q12 26 28 30 Z" fill="#c9a0dc" ${y(2.2)}/>
    <path d="M16 36 Q14 28 28 34 Z" fill="#b388d6"/>
    <circle cx="34" cy="40" r="5" fill="#fff" ${y(2.2)}/>
    <circle cx="34" cy="40" r="1.8" fill="${Se}"/>`}),sv=ae({kind:"rain-barrel",name:"Rain Barrel",cat:"decor",w:86,h:108,vb:"0 0 80 110",svg:`${ie(40,30,104)}
    <path d="M22 30 C12 48 12 78 22 98 H58 C68 78 68 48 58 30 Z" fill="#8ecae6" ${y()}/>
    <path d="M46 34 C58 48 60 76 54 96 H58 C66 76 66 50 56 32 Z" fill="#5aa9c6"/>
    ${Pe("M28 40 v48 M36 36 v54 M44 38 v50")}
    ${O("M24 42 v24")}
    <ellipse cx="40" cy="30" rx="20" ry="8" fill="#bde0fe" ${y()}/>
    <ellipse cx="46" cy="30" rx="10" ry="5" fill="#7eb4dc"/>
    <path d="M16 48 H64" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <path d="M14 74 H66" fill="none" stroke="#c99366" stroke-width="4" stroke-linecap="round"/>
    <rect x="56" y="78" width="14" height="7" rx="2" fill="#d7ecff" ${y(2)}/>
    <path d="M70 81 h6" fill="none" ${y(2)}/>
    <path d="M34 18 q6 -8 12 0" fill="none" stroke="#7eb4dc" stroke-width="2.2" stroke-linecap="round"/>`}),ov=ae({kind:"butterfly-bush",name:"Butterfly Bush",cat:"plants",w:120,h:130,vb:"0 0 100 120",svg:`${ie(50,40,114)}
    <ellipse cx="32" cy="86" rx="22" ry="18" fill="#95d5b2" ${y(2.2)}/>
    <ellipse cx="70" cy="84" rx="24" ry="20" fill="#3d9a68" ${y(2.2)}/>
    <ellipse cx="50" cy="78" rx="36" ry="28" fill="#74c69d" ${y()}/>
    <path d="M18 90 Q50 108 84 88 Q68 100 50 102 Q30 100 18 90 Z" fill="#3d9a68"/>
    ${O("M24 68 q14 -8 26 2")}
    ${Pe("M28 80 q4 6 0 10 M46 72 q5 8 0 12 M66 78 q4 6 0 10")}
    <path d="M30 62 C28 44 32 26 35 24 C39 28 40 46 38 62 Z" fill="#c9a0dc" ${y(1.8)}/>
    <circle cx="33" cy="36" r="2.2" fill="#f7ecff"/><circle cx="36" cy="46" r="2.2" fill="#b388d6"/><circle cx="33" cy="54" r="2" fill="#f7ecff"/>
    <path d="M46 58 C44 36 50 14 53 12 C57 16 58 40 54 58 Z" fill="#b388d6" ${y(1.8)}/>
    <circle cx="50" cy="28" r="2.4" fill="#f7ecff"/><circle cx="53" cy="40" r="2.4" fill="#c9a0dc"/><circle cx="50" cy="50" r="2.2" fill="#f7ecff"/>
    <path d="M62 60 C62 42 68 28 71 26 C75 30 76 46 72 60 Z" fill="#a78bfa" ${y(1.8)}/>
    <circle cx="67" cy="38" r="2.2" fill="#f7ecff"/><circle cx="70" cy="48" r="2" fill="#c9a0dc"/>
    <path d="M14 26 C4 14 2 24 10 32 C14 36 18 32 18 28 Z" fill="#ff8fab" ${y(1.6)}/>
    <path d="M20 24 C30 12 34 24 26 34 C22 38 20 30 20 26 Z" fill="#c9a0dc" ${y(1.6)}/>
    <path d="M12 30 C6 36 6 46 14 46 C18 44 20 36 18 30 Z" fill="#ffd166" ${y(1.6)}/>
    <path d="M22 30 C30 36 32 46 24 48 C20 44 18 36 20 30 Z" fill="#8ecae6" ${y(1.6)}/>
    <ellipse cx="18" cy="32" rx="2" ry="7" fill="${Se}"/>
    <path d="M16 26 Q12 18 10 14 M20 26 Q24 18 28 14" fill="none" stroke="${Se}" stroke-width="1.3" stroke-linecap="round"/>`}),iv=ae({kind:"hedge-row",name:"Hedge Row",cat:"plants",w:190,h:96,vb:"0 0 180 96",svg:`${ie(90,78,90)}
    <path d="M16 84 C28 70 40 62 52 66 C62 52 78 50 90 62 C102 50 118 52 128 66 C140 58 156 64 164 74 L164 86 L16 86 Z" fill="#2f7d52"/>
    <path d="M10 82 L10 60 C10 50 18 46 26 50 C32 34 46 32 54 48 C60 30 76 28 84 46 C92 28 108 28 116 46 C124 30 140 32 148 48 C156 36 166 42 170 54 L170 82 Z" fill="#74c69d" ${y()}/>
    <path d="M148 46 C160 38 170 50 170 70 L170 82 L140 82 L146 58 Z" fill="#52b788"/>
    <path d="M22 64 C40 54 58 58 70 50 C84 60 100 48 116 56 C128 48 146 56 158 64" fill="none" stroke="#95d5b2" stroke-width="6" stroke-linecap="round" opacity=".85"/>
    <path d="M14 68 C48 78 132 76 166 66 L168 82 L12 82 Z" fill="#3d9a68"/>
    ${Pe("M28 58 q3 5 0 8 M48 54 q3 6 0 9 M70 52 q3 6 1 9 M94 52 q3 6 0 10 M118 54 q3 6 0 9 M142 56 q3 5 0 8")}
    ${O("M18 58 q10 -4 16 1")}
    ${O("M58 42 q12 -4 16 2")}`}),av=ae({kind:"lemonade-cup",name:"Lemonade Cup",cat:"food",w:52,h:70,vb:"0 0 70 90",holdable:!0,svg:`${ie(35,22,84)}
    <path d="M18 32 H52 L46 76 H24 Z" fill="#fff" ${y()}/>
    <path d="M40 34 H50 L46 74 H40 Z" fill="#f0e6d8"/>
    <path d="M20 44 H50 L46 76 H24 Z" fill="#ffe566"/>
    <path d="M40 46 H48 L46 74 H40 Z" fill="#f0c45c"/>
    <ellipse cx="35" cy="44" rx="15" ry="6" fill="#fff3a0" ${y(2)}/>
    <ellipse cx="35" cy="32" rx="17" ry="7" fill="#fff" ${y()}/>
    <path d="M40 42 L48 16 H58" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="20" cy="30" r="8" fill="#ffe566" ${y(1.8)}/>
    <path d="M20 23 v14 M14 30 h12" fill="none" stroke="#fff" stroke-width="1.4"/>
    <path d="M16 26 q4 4 8 0 M16 34 q4 -4 8 0" fill="none" stroke="#e0a83a" stroke-width="1.2"/>
    ${O("M24 38 v14")}`}),rv=ae({kind:"picnic-table",name:"Picnic Table",cat:"furniture",w:180,h:110,vb:"0 0 160 100",svg:`${ie(80,68,96)}
    <rect x="18" y="62" width="124" height="10" rx="2" fill="#e7c49a" ${y()}/>
    <rect x="118" y="64" width="20" height="7" fill="#c99366"/>
    <rect x="28" y="70" width="8" height="24" rx="1" fill="#f3d2aa" ${y(2)}/>
    <rect x="124" y="70" width="8" height="24" rx="1" fill="#d4a373" ${y(2)}/>
    <rect x="8" y="78" width="40" height="8" rx="2" fill="#f6e0c4" ${y(2)}/>
    <rect x="112" y="78" width="40" height="8" rx="2" fill="#e7c49a" ${y(2)}/>
    <rect x="22" y="36" width="116" height="14" rx="2" fill="#f6e0c4" ${y()}/>
    <rect x="110" y="38" width="24" height="10" fill="#d4a373"/>
    <rect x="36" y="48" width="8" height="18" fill="#f3d2aa" ${y(2)}/>
    <rect x="116" y="48" width="8" height="18" fill="#d4a373" ${y(2)}/>
    ${O("M28 40 h36")}
    ${Pe("M40 42 h50 M34 66 h70")}`}),lv=ae({kind:"seesaw",name:"Seesaw",cat:"furniture",w:200,h:80,vb:"0 0 180 80",svg:`${ie(90,74,76)}
    <path d="M78 58 H102 L96 74 H84 Z" fill="#f3d2aa" ${y()}/>
    <path d="M94 60 H100 L96 72 H92 Z" fill="#c99366"/>
    <rect x="10" y="40" width="160" height="12" rx="3" fill="#ffd166" ${y()} transform="rotate(-8 90 46)"/>
    <rect x="130" y="28" width="28" height="8" fill="#e0a83a"/>
    <rect x="16" y="34" width="28" height="10" rx="2" fill="#ff8fab" ${y(2)}/>
    <rect x="136" y="22" width="28" height="10" rx="2" fill="#8ecae6" ${y(2)}/>
    ${O("M24 44 h40")}`}),cv=ae({kind:"wagon",name:"Wagon",cat:"furniture",w:130,h:90,vb:"0 0 130 90",svg:`${ie(64,50,86)}
    <circle cx="36" cy="74" r="12" fill="${Se}" ${y(2)}/><circle cx="36" cy="74" r="5" fill="#ffd166"/>
    <circle cx="96" cy="74" r="12" fill="${Se}" ${y(2)}/><circle cx="96" cy="74" r="5" fill="#ffd166"/>
    <path d="M22 40 H108 L100 68 H30 Z" fill="#e45d88" ${y()}/>
    <path d="M86 42 H106 L100 66 H84 Z" fill="#c93b68"/>
    <rect x="28" y="28" width="76" height="14" rx="3" fill="#ff8fab" ${y()}/>
    <path d="M108 36 H122 L118 58" fill="none" ${y(2.4)}/>
    ${O("M32 46 h28")}
    ${Pe("M40 54 h40")}`}),dv=ae({kind:"birdhouse",name:"Birdhouse",cat:"decor",w:70,h:120,vb:"0 0 80 130",svg:`${ie(40,22,124)}
    <rect x="34" y="70" width="12" height="50" rx="2" fill="#d4a373" ${y()}/>
    <rect x="40" y="74" width="5" height="42" fill="#c99366"/>
    <path d="M12 62 L40 28 L68 62 Z" fill="#e45d88" ${y()}/>
    <path d="M40 32 L66 60 H52 Z" fill="#c93b68"/>
    <rect x="18" y="60" width="44" height="36" rx="3" fill="#f6e0c4" ${y()}/>
    <rect x="48" y="64" width="10" height="28" fill="#e7c49a"/>
    <circle cx="40" cy="76" r="7" fill="#5a3d5c"/>
    <rect x="36" y="86" width="14" height="4" rx="1" fill="#d4a373" ${y(1.6)}/>
    ${O("M22 66 h12")}`}),gv=ae({kind:"sprinkler",name:"Sprinkler",cat:"decor",w:80,h:70,vb:"0 0 100 80",svg:`${ie(50,28,76)}
    <ellipse cx="50" cy="66" rx="22" ry="8" fill="#74c69d" ${y()}/>
    <rect x="44" y="40" width="12" height="26" rx="3" fill="#8ecae6" ${y()}/>
    <circle cx="50" cy="36" r="8" fill="#ffd166" ${y()}/>
    <path d="M50 28 C30 16 18 20 12 10" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 28 C70 14 84 18 90 8" fill="none" stroke="#8ecae6" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 26 C40 8 58 4 50 2" fill="none" stroke="#c9ecff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="12" cy="10" r="2.2" fill="#c9ecff"/><circle cx="90" cy="8" r="2.2" fill="#c9ecff"/><circle cx="50" cy="2" r="2.2" fill="#fff"/>
    ${O("M46 44 v10")}`}),fv=ae({kind:"beach-ball",name:"Beach Ball",cat:"decor",w:70,h:70,vb:"0 0 80 80",svg:`${ie(40,26,76)}
    <circle cx="40" cy="40" r="28" fill="#fff" ${y()}/>
    <path d="M40 12 A28 28 0 0 1 66 32 L40 40 Z" fill="#ff8fab"/>
    <path d="M66 48 A28 28 0 0 1 40 68 L40 40 Z" fill="#ffd166"/>
    <path d="M24 64 A28 28 0 0 1 14 36 L40 40 Z" fill="#8ecae6"/>
    <path d="M18 28 A28 28 0 0 1 40 12 L40 40 Z" fill="#b7e4c7"/>
    <circle cx="40" cy="40" r="5" fill="#fff" ${y(2)}/>
    ${O("M28 24 q6 -4 10 2")}`}),hv=ae({kind:"patio-umbrella",name:"Patio Umbrella",cat:"furniture",w:150,h:180,vb:"0 0 120 150",svg:`${ie(60,36,144)}
    <path d="M10 58 Q60 18 110 58 L98 64 Q60 32 22 64 Z" fill="#ffb3c6" ${y()}/>
    <path d="M60 22 L108 56 L96 62 Z" fill="#e45d88"/>
    <path d="M28 40 Q44 30 60 36 Q76 28 96 42" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <rect x="56" y="58" width="8" height="78" rx="2" fill="#f3d2aa" ${y()}/>
    <rect x="60" y="62" width="3" height="70" fill="#d4a373"/>
    <rect x="40" y="128" width="40" height="8" rx="2" fill="#e7c49a" ${y(2)}/>
    ${O("M24 50 q16 -8 24 0")}`}),pv=ae({kind:"veggie-patch",name:"Vegetable Patch",cat:"plants",w:150,h:80,vb:"0 0 150 80",svg:`${ie(75,62,76)}
    <rect x="8" y="28" width="134" height="44" rx="4" fill="#c99366" ${y()}/>
    <rect x="16" y="34" width="118" height="32" fill="#8d6e4c"/>
    <path d="M36 48 C36 36 48 34 48 46 C48 34 60 36 58 48 Z" fill="#74c69d" ${y(2)}/>
    <path d="M78 50 C78 38 90 36 90 48 C90 36 102 38 100 50 Z" fill="#52b788" ${y(2)}/>
    <path d="M112 52 L120 30 L128 52 Z" fill="#ff922b" ${y(2)}/>
    <path d="M118 32 Q124 22 130 28" fill="none" stroke="#2f7d52" stroke-width="2" stroke-linecap="round"/>
    ${O("M18 36 h24")}`}),uv=ae({kind:"hammock",name:"Hammock",cat:"furniture",w:190,h:110,vb:"0 0 170 100",svg:`${ie(85,70,96)}
    <rect x="8" y="18" width="10" height="74" rx="2" fill="#d4a373" ${y()}/>
    <rect x="152" y="18" width="10" height="74" rx="2" fill="#c99366" ${y()}/>
    <path d="M18 28 Q85 78 152 28" fill="none" stroke="#5a3d5c" stroke-width="2"/>
    <path d="M18 36 Q85 88 152 36 L152 48 Q85 96 18 48 Z" fill="#8ecae6" ${y()}/>
    <path d="M120 40 Q140 62 150 44 L150 54 Q136 74 112 52 Z" fill="#5fb0d8"/>
    ${O("M36 46 q24 10 30 4")}
    ${Pe("M40 58 q30 16 50 4")}`}),mv=ae({kind:"garden-gnome",name:"Garden Gnome",cat:"decor",w:64,h:100,vb:"0 0 70 110",svg:`${ie(35,22,104)}
    <path d="M18 78 H52 L48 100 H22 Z" fill="#3d7ec4" ${y()}/>
    <path d="M40 80 H50 L48 98 H42 Z" fill="#2c5f96"/>
    <circle cx="35" cy="62" r="16" fill="#f6d2b5" ${y()}/>
    <path d="M20 66 Q35 78 50 66 Q46 74 35 76 Q24 74 20 66 Z" fill="#fff"/>
    <circle cx="29" cy="60" r="2" fill="${Se}"/><circle cx="41" cy="60" r="2" fill="${Se}"/>
    <path d="M16 52 L35 18 L54 52 Z" fill="#e45d88" ${y()}/>
    <path d="M35 22 L52 50 H42 Z" fill="#c93b68"/>
    <ellipse cx="35" cy="52" rx="16" ry="4" fill="#ff8fab" ${y(2)}/>
    ${O("M22 40 l8 -8")}`}),Co=[Db,Zb,qb,Ib,Ob,Nb,jb,Fb,Gb,Yb,Kb,Xb,Jb,ev,tv,nv,sv,ov,iv,av,rv,lv,cv,dv,gv,fv,hv,pv,uv,mv];function yv(e,t){for(const n of Co)t[n.kind]||(e.push(n),t[n.kind]=n)}function Sa(e,t,n){return`<g>
    <ellipse cx="${e-22*n}" cy="${t}" rx="${26*n}" ry="${14*n}" fill="#fff"/>
    <ellipse cx="${e+18*n}" cy="${t-2*n}" rx="${30*n}" ry="${16*n}" fill="#fff"/>
    <ellipse cx="${e}" cy="${t+4*n}" rx="${34*n}" ry="${13*n}" fill="#fff"/>
  </g>`}function kv(e,t,n,s,o){const a=l=>`<rect x="${e-2}" y="${l}" width="${t-e+12+4}" height="8" rx="3" fill="#fff" ${y(2.2)}/><rect x="${(t-40).toFixed(1)}" y="${l+1}" width="30" height="6" rx="2" fill="#d5ead8"/>`;let r=a(n+26)+a(s-28);for(let l=e;l<=t;l+=o)r+=`<path d="M${l} ${n+12} L${l+12/2} ${n} L${l+12} ${n+12} V${s} H${l} Z" fill="#f7fff8" ${y(2.2)}/>`,r+=`<path d="M${(l+12*.58).toFixed(1)} ${n+10} H${l+12-1} V${s-4} H${(l+12*.58).toFixed(1)} Z" fill="#d5ead8"/>`,r+=`<path d="M${l+2} ${n+18} v22" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".75" fill="none"/>`;return r}function bv(e,t){const s=150+46*t,o=372-s;return`<g id="yardTree">
    <rect x="${e-14*t}" y="${s}" width="${28*t}" height="${o}" rx="${6*t}" fill="#e7b98a" ${y()}/>
    <rect x="${e+4*t}" y="${s+8*t}" width="${8*t}" height="${o-16*t}" fill="#c99366"/>
    ${Pe(`M${e-4*t} ${s+28*t} v${36*t}`)}
    ${O(`M${e-8*t} ${s+16*t} v${22*t}`)}
    <ellipse cx="${e+8*t}" cy="${150+18*t}" rx="${78*t}" ry="${46*t}" fill="#2f7d52"/>
    <ellipse cx="${e-48*t}" cy="${150+10*t}" rx="${36*t}" ry="${30*t}" fill="#245e3e"/>
    <ellipse cx="${e-34*t}" cy="${150+16*t}" rx="${42*t}" ry="${34*t}" fill="#95d5b2" ${y(2.2)}/>
    <ellipse cx="${e}" cy="150" rx="${68*t}" ry="${50*t}" fill="#74c69d" ${y()}/>
    <ellipse cx="${e+40*t}" cy="${150+8*t}" rx="${40*t}" ry="${36*t}" fill="#3d9a68" ${y(2.2)}/>
    <ellipse cx="${e-8*t}" cy="${150-6*t}" rx="${28*t}" ry="${20*t}" fill="#b7e4c7" opacity=".95"/>
    ${Pe(`M${e-20*t} ${150+8*t} q${8*t} ${6*t} 0 ${12*t} M${e+10*t} ${150-4*t} q${8*t} ${6*t} 2 ${12*t} M${e+28*t} ${150+12*t} q${6*t} ${5*t} 0 ${10*t}`)}
    ${O(`M${e-36*t} ${150-18*t} q${16*t} -8 ${28*t} 2`)}
  </g>`}function vv(){return`<svg class="yardWorld" viewBox="0 0 2400 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ydsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6eb6e8"/>
        <stop offset=".48" stop-color="#c5e6fb"/>
        <stop offset="1" stop-color="#fff3df"/>
      </linearGradient>
      ${Ir("ydsun","#ffe566",".55")}
    </defs>
    <rect width="2400" height="430" fill="url(#ydsky)"/>
    <circle id="ydSunGlow" cx="1180" cy="68" r="62" fill="url(#ydsun)"/>
    <circle id="ydSun" cx="1180" cy="68" r="30" fill="#ffe566"/>
    <circle cx="1170" cy="58" r="8" fill="#fff" opacity=".8"/>
    ${Sa(980,96,1.05)}${Sa(1320,78,.85)}${Sa(1500,120,.7)}
    <rect y="360" width="2400" height="240" fill="#c6ef9a"/>
    <rect y="360" width="2400" height="28" fill="#e7f8c8"/>
    <rect y="520" width="2400" height="80" fill="#9ed67a"/>
    <path d="M1040 470 q30 -12 16 -6 M1200 510 q28 -12 14 -4 M1360 548 q24 -10 12 -4" fill="none" stroke="#3d9a68" stroke-width="1.2" stroke-linecap="round" opacity=".22"/>
    ${kv(846,2118,258,372,24)}
    ${bv(1184,.8)}
    <path d="M840 120 H1076 L1054 152 H862 Z" fill="#ffb3c6" ${y()}/>
    <path d="M960 126 H1064 L1046 148 H976 Z" fill="#e45d88"/>
    ${O("M876 132 h56")}
    <rect x="864" y="150" width="196" height="222" rx="4" fill="#fff6ea" ${y()}/>
    <rect x="1044" y="156" width="12" height="210" fill="#f0dcc4"/>
    ${Pe("M880 174 H1000 M880 202 H1000 M880 230 H990 M880 294 H1000 M880 334 H980")}
    <rect x="884" y="180" width="44" height="36" rx="4" fill="#c9ecff" ${y(2.2)}/>
    <rect x="912" y="184" width="12" height="28" fill="#8ecae6"/>
    <path d="M906 180 V216 M884 198 H928" fill="none" ${y(2.2)}/>
    ${O("M890 188 h12")}
  </svg>`}function wv(e,t,n,s,o){const i=(600-t)/600*100,a=(n/2400*100).toFixed(3),r=(s/600*100).toFixed(3);return o==="right"?`right:${((2400-(e+n/2))/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`:`left:${((e-n/2)/2400*100).toFixed(3)}%;bottom:${i.toFixed(3)}%;width:${a}%;height:${r}%`}function $v(){return`<svg class="doorArt" viewBox="0 0 100 230">
    <rect x="4" y="2" width="92" height="226" rx="3" fill="#f3d2aa" ${y()}/>
    <rect x="76" y="6" width="16" height="218" fill="#d4a373"/>
    <rect x="14" y="12" width="72" height="206" rx="2" fill="#f6e9ff" ${y(2.2)}/>
    <rect x="70" y="16" width="12" height="198" fill="#d4b4e6"/>
    <rect x="24" y="22" width="52" height="42" rx="3" fill="#c9ecff" ${y(2.2)}/>
    <rect x="60" y="26" width="12" height="34" fill="#8ecae6"/>
    <path d="M50 22 V64 M24 43 H76" fill="none" ${y(2.2)}/>
    ${O("M28 28 h18")}
    <rect x="24" y="76" width="52" height="56" rx="3" fill="#f7ecff" ${y(2.2)}/>
    <rect x="62" y="80" width="10" height="48" fill="#e0c8f0"/>
    ${O("M28 84 v22")}
    <rect x="24" y="144" width="52" height="56" rx="3" fill="#f7ecff" ${y(2.2)}/>
    <rect x="62" y="148" width="10" height="48" fill="#e0c8f0"/>
    <circle cx="64" cy="126" r="4.2" fill="#ffd166" ${y(2.2)}/>
    <rect x="10" y="214" width="80" height="10" rx="2" fill="#e7c49a" ${y(2.2)}/>
  </svg>`}function xv(e){const t=e==="living"?Ld:Cd,n=e==="living"?"backyard":"living",s=e==="living"?"Backyard":"Back inside",o=e==="yard"?"right":"left";return`<button type="button" class="yardDoor" data-yard-go="${n}" aria-label="${s}" style="${wv(t.x,t.y,t.w,t.h,o)}">${$v()}<span class="yardHintLabel"><span>${s}</span></span></button>`}function Nr(e,t){const n=e.replace(/[&<>]/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[s]);return`<figure class="ysCard"><div class="ysArt">${t}</div><figcaption>${n}</figcaption></figure>`}function _v(){return`<div class="yardSheet" data-yard-sheet="1"><h1>Backyard pieces</h1><div class="ysGrid">${Co.map(t=>Nr(t.name,Jt(t))).join("")}</div></div>`}function Mv(e,t){return Nr(e,`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${t}</svg>`)}function Lv(){const e=(r,l)=>ie(r,l,96.4),t=`
    ${e(50,40)}
    <path d="M18 58 V30 Q18 18 32 18 H68 Q82 18 82 30 V58 Z" fill="#ffb7cc" ${y()}/>
    <path d="M56 24 H76 Q80 24 80 32 V52 H56 Z" fill="#e888a8"/>
    <circle cx="34" cy="38" r="3.4" fill="#ff8fab" ${y(2)}/><circle cx="33" cy="37" r="1.1" fill="#fff"/>
    <circle cx="50" cy="36" r="3.4" fill="#ff8fab" ${y(2)}/><circle cx="49" cy="35" r="1.1" fill="#fff"/>
    <circle cx="66" cy="38" r="3.4" fill="#e45d88" ${y(2)}/><circle cx="65" cy="37" r="1.1" fill="#fff"/>
    <rect x="4" y="44" width="20" height="38" rx="10" fill="#ff7096" ${y()}/>
    <ellipse cx="14" cy="44" rx="12" ry="9" fill="#ff9ab6" ${y()}/>
    <ellipse cx="9" cy="41" rx="4" ry="2.4" fill="#fff" opacity=".7"/>
    <rect x="76" y="44" width="20" height="38" rx="10" fill="#e04878" ${y()}/>
    <ellipse cx="86" cy="44" rx="12" ry="9" fill="#e45d88" ${y()}/>
    <rect x="20" y="64" width="60" height="16" rx="6" fill="#ff8fab" ${y()}/>
    <rect x="22" y="56" width="28" height="22" rx="7" fill="#ffe0ea" ${y(2.4)}/>
    <rect x="50" y="56" width="28" height="22" rx="7" fill="#ffc2d4" ${y(2.4)}/>
    <rect x="66" y="58" width="10" height="18" rx="4" fill="#e888a8"/>
    <path d="M26 60 h20 M54 60 h16 M26 74 h20 M54 74 h16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M50 58 v18" fill="none" stroke="#e45d88" stroke-width="2.2" stroke-linecap="round"/>
    <rect x="26" y="46" width="20" height="16" rx="5" fill="#fff" ${y(2.2)}/>
    <path d="M33 52 c-2.2 -3.2 -6.4 -.4 -3.4 2.6 c1 1.2 3.4 2.6 3.4 2.6 c0 0 2.4 -1.4 3.4 -2.6 c3 -3 -1.2 -5.8 -3.4 -2.6 z" fill="#ff8fab"/>
    <path d="M41 56 c-1.4 -2 -4.2 0 -2.2 1.8 c.7 .8 2.2 1.6 2.2 1.6 c0 0 1.5 -.8 2.2 -1.6 c2 -1.8 -.8 -3.8 -2.2 -1.8 z" fill="#7eb4dc"/>
    <rect x="16" y="84" width="7" height="10" rx="2" fill="${Se}"/>
    <rect x="77" y="84" width="7" height="10" rx="2" fill="${Se}"/>`,n=`
    <defs>${Ir("a2lamp-glow","#ffd56a",".95")}</defs>
    ${e(50,22)}
    <path d="M34 8 L42 8 L37 40 L24 40 Z" fill="#fff6d4"/>
    <path d="M42 8 L50 8 L50 40 L37 40 Z" fill="#ffe08a"/>
    <path d="M50 8 L58 8 L63 40 L50 40 Z" fill="#f0c45c"/>
    <path d="M58 8 L66 8 L76 40 L63 40 Z" fill="#e0a83a"/>
    <path d="M24 40 L34 8 H66 L76 40 Z" fill="none" ${y()}/>
    <path d="M42 8 L37 40 M50 8 V40 M58 8 L63 40" fill="none" stroke="${Se}" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="50" cy="36" rx="20" ry="10" fill="url(#a2lamp-glow)"/>
    <rect x="46" y="40" width="8" height="42" rx="3" fill="#e4ccf2" ${y()}/>
    <rect x="50" y="44" width="4" height="34" rx="2" fill="#c49ad4"/>
    <ellipse cx="50" cy="88" rx="20" ry="6" fill="#d4b4e6" ${y()}/>
    <ellipse cx="60" cy="90" rx="8" ry="3" fill="#b888c8"/>
    <ellipse cx="42" cy="86" rx="6" ry="2" fill="#fff" opacity=".55"/>`,s=`
    ${e(50,30)}
    <ellipse cx="30" cy="40" rx="14" ry="22" fill="#b7ebc8" ${y()} transform="rotate(-30 30 40)"/>
    <path d="M34 28 C30 40 32 52 44 58" fill="#52b078"/>
    <ellipse cx="72" cy="42" rx="13" ry="20" fill="#3d9a68" ${y()} transform="rotate(26 72 42)"/>
    <path d="M50 66 C40 44 42 18 50 6 C58 18 60 44 50 66 Z" fill="#d8f6e4" ${y()}/>
    <path d="M54 18 C60 32 58 48 50 58 C56 44 58 28 54 18 Z" fill="#52b078"/>
    <path d="M50 14 V52" fill="none" stroke="#2f7a52" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
    <path d="M40 60 C34 50 24 48 22 38 C32 44 38 54 42 64 Z" fill="#74c69d" ${y(2.2)}/>
    <path d="M28 64 H74 L68 94 H34 Z" fill="#e8845a" ${y()}/>
    <path d="M58 66 H72 L68 92 H60 Z" fill="#c45c38"/>
    <rect x="22" y="58" width="58" height="10" rx="4" fill="#f0a078" ${y()}/>
    <rect x="56" y="60" width="20" height="6" rx="3" fill="#d47848"/>
    <ellipse cx="50" cy="65" rx="20" ry="3" fill="#a86a42" opacity=".4"/>
    <path d="M28 62 h14" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>`,o=Object.fromEntries(Co.map(r=>[r.kind,r])),i=(r,l,c)=>Mv(r,l)+Nr(o[c].name,Jt(o[c]));return`<div class="yardSheet yardCompare" data-yard-compare="1"><h1>House style and the yard</h1><p class="ysNote">Sofa, lamp, and plant are the approved refresh. Swing, cart, and birdbath use the same light.</p><div class="ysPair">${i("Sofa",t,"yard-swing")+i("Lamp",n,"lemonade-cart")+i("Plant",s,"birdbath")}</div></div>`}const Sd=new Map;let Bd=!1;function Cv(){return Bd}function Y5(e){Bd=e}function Sv(e){return Sd.get(e)}function K5(e,t){Sd.set(e,t)}const fe="#5a3d5c",x=`stroke="${fe}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,fs=(e,t,n)=>`<circle cx="${e}" cy="${n}" r="3" fill="${fe}"/><circle cx="${t}" cy="${n}" r="3" fill="${fe}"/><circle cx="${e+1}" cy="${n-1}" r="1" fill="#fff"/><circle cx="${t+1}" cy="${n-1}" r="1" fill="#fff"/>`,jo=(e,t,n)=>`<ellipse cx="${e}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${t}" cy="${n}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`,ge='<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>',Zt=[{kind:"sofa",name:"Sofa",cat:"furniture",w:260,svg:`${ge}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${x}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${x}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${x}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${x}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${x}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${fe}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${fe}"/>`},{kind:"armchair",name:"Armchair",cat:"furniture",w:150,svg:`${ge}<rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${x}/><rect x="6" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${x}/><rect x="72" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${x}/><rect x="24" y="58" width="52" height="24" rx="10" fill="#b8e0f2" ${x}/><rect x="20" y="86" width="6" height="10" rx="2" fill="${fe}"/><rect x="74" y="86" width="6" height="10" rx="2" fill="${fe}"/>`},{kind:"bed",name:"Bed",cat:"furniture",w:300,svg:`${ge}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${x}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${x}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${x}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${x}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${x}/>`},{kind:"table",name:"Table",cat:"furniture",w:200,svg:`${ge}<rect x="4" y="30" width="92" height="14" rx="7" fill="#f4a261" ${x}/><rect x="14" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${x}/><rect x="76" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${x}/><path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".5"/>`},{kind:"chair",name:"Chair",cat:"furniture",w:100,svg:`${ge}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${x}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${x}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${x}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${x}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/>`},{kind:"lamp",name:"Lamp",cat:"furniture",w:90,svg:`${ge}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${x}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${x}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${x}/><circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>`},{kind:"fridge",name:"Fridge",cat:"furniture",w:150,svg:`${ge}<rect x="16" y="4" width="68" height="90" rx="14" fill="#bde0fe" ${x}/><path d="M16 38 H84" ${x}/><rect x="70" y="14" width="5" height="16" rx="2" fill="${fe}"/><rect x="70" y="46" width="5" height="22" rx="2" fill="${fe}"/><circle cx="32" cy="22" r="5" fill="#ff8fab" ${x}/><rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${x}/>`},{kind:"stove",name:"Stove",cat:"furniture",w:170,svg:`${ge}<rect x="8" y="26" width="84" height="68" rx="12" fill="#ffadad" ${x}/><rect x="8" y="18" width="84" height="14" rx="6" fill="#ffd6a5" ${x}/><rect x="20" y="46" width="60" height="36" rx="8" fill="#5a3d5c" opacity=".85"/><rect x="26" y="52" width="48" height="8" rx="4" fill="#fff" opacity=".25"/><circle cx="22" cy="38" r="3" fill="${fe}"/><circle cx="36" cy="38" r="3" fill="${fe}"/><circle cx="78" cy="38" r="3" fill="${fe}"/>`},{kind:"bookshelf",name:"Shelf",cat:"furniture",w:170,svg:`${ge}<rect x="10" y="4" width="80" height="90" rx="10" fill="#d4a373" ${x}/><path d="M10 34 H90 M10 64 H90" ${x}/><rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${x}/><rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${x}/><rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${x}/><rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${x}/><rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${x}/><circle cx="34" cy="80" r="8" fill="#ffadad" ${x}/>`},{kind:"tub",name:"Bathtub",cat:"furniture",w:240,svg:`${ge}<circle cx="30" cy="40" r="7" fill="#bde0fe" ${x}/><circle cx="44" cy="34" r="9" fill="#e0f2ff" ${x}/><circle cx="60" cy="40" r="7" fill="#bde0fe" ${x}/><path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${x}/><rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${x}/><rect x="22" y="88" width="8" height="8" rx="2" fill="${fe}"/><rect x="70" y="88" width="8" height="8" rx="2" fill="${fe}"/>`},{kind:"rug",name:"Rug",cat:"decor",w:320,svg:`<ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${x}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${x}/><ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${x}/>`},{kind:"picture",name:"Picture",cat:"decor",w:130,wall:!0,svg:`<rect x="10" y="20" width="80" height="64" rx="8" fill="#ffd166" ${x}/><rect x="18" y="28" width="64" height="48" rx="4" fill="#bde0fe"/><circle cx="66" cy="40" r="7" fill="#fff3b0"/><path d="M18 76 L38 50 L52 64 L62 54 L82 76 Z" fill="#90e0a8" ${x}/>`},{kind:"window",name:"Window",cat:"decor",w:180,wall:!0,svg:`<rect class="winGlass" x="12" y="8" width="76" height="76" rx="38" fill="#a2d2ff" ${x}/><g class="winDay"><circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/></g><g class="winNight"><circle cx="62" cy="28" r="7" fill="#fff6d8"/><circle cx="28" cy="24" r="1.4" fill="#fff"/><circle cx="44" cy="20" r="1.1" fill="#fff"/><circle cx="70" cy="42" r="1.2" fill="#fff"/><circle cx="36" cy="46" r="1" fill="#fff"/></g><path d="M50 8 V84 M12 50 H88" ${x}/><path d="M4 8 Q20 40 10 90 M96 8 Q80 40 90 90" stroke="#ff8fab" stroke-width="9" fill="none" stroke-linecap="round"/>`},{kind:"clock",name:"Clock",cat:"decor",w:90,wall:!0,svg:`<circle cx="50" cy="50" r="38" fill="#fff" ${x}/><circle cx="50" cy="50" r="30" fill="#fff3b0"/><path d="M50 50 V28 M50 50 L64 58" ${x}/><circle cx="50" cy="50" r="3" fill="${fe}"/>${jo(30,70,66)}`},{kind:"stars",name:"Stars",cat:"decor",w:140,wall:!0,svg:`<path d="M30 20 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffd166" ${x}/><path d="M70 40 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#ffadad" ${x}/><path d="M40 66 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#a2d2ff" ${x}/>`},{kind:"balloon",name:"Balloons",cat:"decor",w:110,svg:`<path d="M38 52 Q44 74 50 96 M64 46 Q58 72 50 96" stroke="${fe}" stroke-width="2" fill="none"/><ellipse cx="36" cy="32" rx="18" ry="22" fill="#ff8fab" ${x}/><ellipse cx="66" cy="28" rx="18" ry="22" fill="#a2d2ff" ${x}/><ellipse cx="30" cy="24" rx="4" ry="7" fill="#fff" opacity=".6"/>`},{kind:"teddy",name:"Teddy",cat:"decor",w:100,svg:`${ge}<circle cx="26" cy="22" r="10" fill="#d4a373" ${x}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${x}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${x}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${x}/>${fs(40,60,36)}<ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/><circle cx="50" cy="46" r="2.5" fill="${fe}"/>${jo(32,68,46)}`},{kind:"ball",name:"Ball",cat:"decor",w:70,svg:`${ge}<circle cx="50" cy="58" r="36" fill="#ffd166" ${x}/><path d="M18 46 Q50 66 82 46 M26 82 Q50 60 74 82" stroke="#ff7096" stroke-width="7" fill="none"/>`},{kind:"tv",name:"TV",cat:"decor",w:170,svg:`${ge}<rect x="6" y="14" width="88" height="62" rx="14" fill="#c9a0dc" ${x}/><rect x="16" y="22" width="68" height="46" rx="8" fill="#a2d2ff"/><path d="M30 6 L44 14 M70 6 L56 14" ${x}/><rect x="36" y="78" width="28" height="16" rx="4" fill="#b388d6" ${x}/>${fs(42,58,42)}<path d="M44 52 q6 5 12 0" ${x} fill="none"/>`},{kind:"plant",name:"Plant",cat:"plants",w:110,svg:`${ge}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${x} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${x} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${x}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${x}/><rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${x}/>`},{kind:"cactus",name:"Cactus",cat:"plants",w:80,svg:`${ge}<rect x="36" y="12" width="28" height="64" rx="14" fill="#80ed99" ${x}/><path d="M36 50 H24 a8 8 0 0 1 -8 -8 V34" fill="none" stroke="${fe}" stroke-width="3.5"/><rect x="12" y="26" width="12" height="22" rx="6" fill="#80ed99" ${x}/><circle cx="50" cy="12" r="6" fill="#ff8fab" ${x}/>${fs(44,56,40)}<path d="M28 74 H72 L66 96 H34 Z" fill="#c9a0dc" ${x}/>`},{kind:"flowers",name:"Flowers",cat:"plants",w:90,svg:`${ge}<path d="M50 70 V30 M50 60 Q30 50 30 30 M50 60 Q70 50 70 30" stroke="#52b788" stroke-width="4" fill="none"/><circle cx="50" cy="26" r="10" fill="#ff8fab" ${x}/><circle cx="30" cy="28" r="9" fill="#ffd166" ${x}/><circle cx="70" cy="28" r="9" fill="#a2d2ff" ${x}/><circle cx="50" cy="26" r="3" fill="#fff"/><path d="M32 66 H68 L62 96 H38 Z" fill="#a2d2ff" ${x}/>`},{kind:"tree",name:"Mini Tree",cat:"plants",w:140,svg:`${ge}<rect x="44" y="54" width="12" height="30" rx="4" fill="#b07d54" ${x}/><circle cx="50" cy="36" r="30" fill="#52b788" ${x}/><circle cx="38" cy="30" r="5" fill="#ff8fab"/><circle cx="62" cy="40" r="5" fill="#ff8fab"/><circle cx="52" cy="22" r="5" fill="#ff8fab"/><path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${x}/>`},{kind:"cake",name:"Cake",cat:"food",w:100,svg:`<rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${x}/><path d="M16 58 q8 10 17 0 q8 10 17 0 q8 10 17 0 q8 10 17 0" fill="#fff" ${x}/><rect x="46" y="28" width="8" height="22" rx="3" fill="#a2d2ff" ${x}/><path d="M50 14 q6 8 0 12 q-6 -4 0 -12" fill="#ffd166" ${x}/><ellipse cx="50" cy="92" rx="40" ry="5" fill="#fff" ${x}/>`},{kind:"apple",name:"Apple",cat:"food",w:60,svg:`<path d="M50 30 C20 18 8 50 22 74 C32 92 44 90 50 86 C56 90 68 92 78 74 C92 50 80 18 50 30 Z" fill="#ff6b6b" ${x}/><path d="M50 30 Q52 16 58 10" ${x} fill="none"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#80ed99" ${x} transform="rotate(-20 64 18)"/><ellipse cx="34" cy="46" rx="5" ry="9" fill="#fff" opacity=".5"/>`},{kind:"donut",name:"Donut",cat:"food",w:70,svg:`<circle cx="50" cy="58" r="36" fill="#e9c46a" ${x}/><path d="M18 52 Q20 26 50 24 Q80 26 82 52 Q76 62 66 56 Q56 66 46 58 Q34 66 24 58 Z" fill="#ff8fab" ${x}/><circle cx="50" cy="52" r="10" fill="#fff" ${x}/><rect x="30" y="36" width="6" height="3" rx="1.5" fill="#a2d2ff" transform="rotate(30 33 37)"/><rect x="64" y="38" width="6" height="3" rx="1.5" fill="#ffd166"/><rect x="56" y="30" width="6" height="3" rx="1.5" fill="#80ed99" transform="rotate(-30 59 31)"/>`},{kind:"pizza",name:"Pizza",cat:"food",w:80,svg:`<path d="M10 20 Q50 6 90 20 L50 94 Z" fill="#ffd166" ${x}/><path d="M10 20 Q50 6 90 20 L86 28 Q50 16 14 28 Z" fill="#e9a96a" ${x}/><circle cx="42" cy="38" r="7" fill="#ff6b6b" ${x}/><circle cx="62" cy="44" r="6" fill="#ff6b6b" ${x}/><circle cx="50" cy="62" r="6" fill="#ff6b6b" ${x}/>`},{kind:"juice",name:"Juice",cat:"food",w:55,svg:`<path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${x}/><path d="M27 44 H73 L70 92 H30 Z" fill="#ffb347"/><path d="M24 26 H76 L70 92 H30 Z" fill="none" ${x}/><path d="M58 30 L66 4" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="60" r="4" fill="#fff" opacity=".6"/>`},{kind:"cat",name:"Toy cat",cat:"pets",w:110,svg:`${ge}<path d="M78 80 Q98 70 90 50" stroke="#ffb347" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="30" ry="20" fill="#ffb347" ${x}/><path d="M22 30 L26 8 L40 22 M78 30 L74 8 L60 22" fill="#ffb347" ${x}/><circle cx="50" cy="42" r="28" fill="#ffc46b" ${x}/>${fs(40,60,40)}<path d="M46 50 q4 4 8 0" ${x} fill="none"/>${jo(32,68,50)}`},{kind:"dog",name:"Puppy",cat:"pets",w:120,svg:`${ge}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#f5ebe0" ${x}/><circle cx="50" cy="42" r="28" fill="#fff" ${x}/><ellipse cx="22" cy="44" rx="10" ry="18" fill="#b07d54" ${x}/><ellipse cx="78" cy="44" rx="10" ry="18" fill="#b07d54" ${x}/><circle cx="60" cy="34" r="8" fill="#e6b88a" opacity=".7"/>${fs(40,60,40)}<ellipse cx="50" cy="52" rx="5" ry="4" fill="${fe}"/><path d="M50 56 v6" ${x}/>`},{kind:"bunny",name:"Bunny",cat:"pets",w:90,svg:`${ge}<ellipse cx="36" cy="22" rx="8" ry="20" fill="#fff" ${x}/><ellipse cx="64" cy="22" rx="8" ry="20" fill="#fff" ${x}/><ellipse cx="36" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="64" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="50" cy="76" rx="28" ry="20" fill="#fff" ${x}/><circle cx="50" cy="52" r="22" fill="#fff" ${x}/>${fs(42,58,50)}<path d="M47 58 l3 3 3 -3" ${x} fill="none"/>${jo(36,64,58)}`},{kind:"fish",name:"Fish Bowl",cat:"pets",w:100,svg:`${ge}<circle cx="50" cy="54" r="40" fill="#cdeffd" ${x}/><path d="M14 46 H86" stroke="#8ecae6" stroke-width="3"/><path d="M60 64 l14 -8 v16 z" fill="#ff9f68" ${x}/><ellipse cx="46" cy="64" rx="16" ry="11" fill="#ffb347" ${x}/><circle cx="40" cy="62" r="2.5" fill="${fe}"/><circle cx="32" cy="38" r="3" fill="#fff" opacity=".8"/><rect x="24" y="10" width="52" height="8" rx="4" fill="#cdeffd" ${x}/>`},{kind:"kennel",name:"Dog Kennel",cat:"pets",w:210,h:175,holdable:!1,vb:"0 0 120 100",svg:`<ellipse cx="60" cy="97" rx="48" ry="3.2" fill="#000" opacity=".12"/><path d="M14 50 L60 12 L106 50 Z" fill="#ff8fab" ${x}/><path d="M28 46 L60 22 L92 46 Z" fill="#ffd6e4"/><rect x="20" y="46" width="80" height="50" rx="10" fill="#fff6ea" ${x}/><path d="M20 56 H100" stroke="#ffc2d4" stroke-width="7"/><path d="M34 96 V58 Q60 36 86 58 V96 Z" fill="#f3e4ff" ${x}/><path d="M40 96 V64 Q60 46 80 64 V96 Z" fill="#ffe8c7"/><circle cx="86" cy="64" r="8" fill="#bde0fe" ${x}/><circle cx="84" cy="62" r="2.2" fill="#fff" opacity=".9"/><path d="M28 62 l2.4 2.4 2.4-2.4 2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4z" fill="#ff8fab" ${x}/><circle cx="30" cy="90" r="3.2" fill="#fff" ${x}/><rect x="32" y="88.4" width="14" height="3.4" rx="1.7" fill="#fff" ${x}/><circle cx="48" cy="90" r="3.2" fill="#fff" ${x}/>`},{kind:"cat-tower",name:"Cat Tower",cat:"pets",w:150,h:225,holdable:!1,vb:"0 0 100 150",svg:`<ellipse cx="50" cy="146" rx="36" ry="3.4" fill="#000" opacity=".12"/><rect x="44" y="30" width="12" height="104" rx="6" fill="#c9a0dc" ${x}/><ellipse cx="50" cy="136" rx="34" ry="10" fill="#ffc8dd" ${x}/><ellipse cx="50" cy="132" rx="26" ry="6" fill="#fff6ea"/><ellipse cx="50" cy="102" rx="30" ry="8" fill="#bde0fe" ${x}/><ellipse cx="50" cy="98" rx="22" ry="4" fill="#fff" opacity=".8"/><ellipse cx="50" cy="64" rx="28" ry="8" fill="#ffd166" ${x}/><ellipse cx="50" cy="60" rx="20" ry="4" fill="#fff6d0"/><circle cx="50" cy="22" r="8" fill="#ff8fab" ${x}/><circle cx="47" cy="19" r="2.2" fill="#fff" opacity=".75"/><g class="dangle"><circle cx="22" cy="126" r="8" fill="#ffb3c6" ${x}/><path d="M22 126 q12 5 7 16" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/></g><circle cx="80" cy="92" r="3.4" fill="#ffd166" ${x}/>`},{kind:"vanity",name:"Vanity",cat:"furniture",w:230,svg:`${ge}<ellipse cx="50" cy="26" rx="24" ry="22" fill="#fff" ${x}/><ellipse cx="50" cy="26" rx="18" ry="16" fill="#cdeffd"/><path d="M38 18 l6 -6 M42 26 l10 -10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="12" r="3" fill="#ffd166" ${x}/><circle cx="74" cy="12" r="3" fill="#ffd166" ${x}/><rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${x}/><rect x="10" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${x}/><rect x="62" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${x}/><circle cx="24" cy="75" r="3" fill="${fe}"/><circle cx="76" cy="75" r="3" fill="${fe}"/><rect x="12" y="90" width="6" height="7" rx="2" fill="${fe}"/><rect x="82" y="90" width="6" height="7" rx="2" fill="${fe}"/>`},{kind:"stool",name:"Vanity Stool",cat:"furniture",w:90,svg:`${ge}<ellipse cx="50" cy="48" rx="34" ry="14" fill="#c9a0dc" ${x}/><ellipse cx="50" cy="44" rx="28" ry="9" fill="#e4ccf2"/><path d="M28 58 L22 94 M72 58 L78 94 M50 62 V94" ${x}/><ellipse cx="50" cy="78" rx="22" ry="4" fill="none" ${x}/>`},{kind:"perfume",name:"Perfume",cat:"decor",w:50,svg:`<rect x="40" y="8" width="20" height="14" rx="5" fill="#ffd166" ${x}/><rect x="46" y="20" width="8" height="10" fill="#fff" ${x}/><path d="M20 50 Q20 30 50 30 Q80 30 80 50 V80 Q80 94 66 94 H34 Q20 94 20 80 Z" fill="#ff8fab" ${x}/><ellipse cx="36" cy="52" rx="5" ry="10" fill="#fff" opacity=".6"/><path d="M50 56 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#fff" opacity=".8"/>`},{kind:"polish",name:"Nail Polish",cat:"decor",w:40,svg:`<rect x="38" y="4" width="24" height="40" rx="8" fill="${fe}"/><path d="M24 54 Q24 42 36 42 H64 Q76 42 76 54 V84 Q76 96 64 96 H36 Q24 96 24 84 Z" fill="#b388d6" ${x}/><ellipse cx="38" cy="62" rx="5" ry="12" fill="#fff" opacity=".55"/>`},{kind:"hairdryer",name:"Hair Dryer",cat:"decor",w:90,svg:`<path d="M60 52 L70 92 Q70 96 64 96 H58 Q52 96 52 90 L46 56 Z" fill="#a2d2ff" ${x}/><rect x="6" y="20" width="62" height="40" rx="20" fill="#bde0fe" ${x}/><ellipse cx="82" cy="40" rx="12" ry="20" fill="#ffc8dd" ${x}/><ellipse cx="82" cy="40" rx="6" ry="11" fill="#fff" ${x}/><circle cx="24" cy="40" r="7" fill="#fff" opacity=".7"/>`},{kind:"mirror",name:"Mirror",cat:"decor",w:120,wall:!0,svg:`<path d="M50 6 C74 6 88 24 88 50 C88 76 72 94 50 94 C28 94 12 76 12 50 C12 24 26 6 50 6 Z" fill="#ffd166" ${x}/><ellipse cx="50" cy="50" rx="30" ry="36" fill="#e0f4ff" ${x}/><path d="M36 34 l10 -10 M36 46 l20 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ff8fab" ${x}/>`}],jr={sofa:["living"],armchair:["living"],lamp:["living","bedroom"],tv:["living"],rug:["living","bedroom"],picture:["living","bedroom"],bookshelf:["living","bedroom"],bed:["bedroom"],teddy:["bedroom"],stars:["bedroom"],tub:["bedroom"],balloon:["any"],clock:["any"],window:["any"],ball:["any"],vanity:["salon"],stool:["salon"],perfume:["salon"],polish:["salon"],hairdryer:["salon"],mirror:["salon","bedroom"],fridge:["kitchen"],stove:["kitchen"],table:["kitchen","living"],chair:["kitchen","living"]};for(const e of Md)jr[e.kind]=["nursery"];for(const e of Co)jr[e.kind]=["backyard"];Zt.push(...Md,...Co);for(const e of Zt)e.rooms=jr[e.kind]??(["food"].includes(e.cat)?["kitchen"]:["any"]);const Bv=new Set(["rug","tv","tree"]);for(const e of Zt)e.holdable??=!e.wall&&e.cat!=="furniture"&&e.w<=150&&!Bv.has(e.kind);const Hv=[{kind:"ranch-egg",name:"Fresh Egg",cat:"ranch",w:50,holdable:!0,rooms:["any"],svg:`${ge}<path d="M50 30 C70 30 80 62 80 74 C80 90 66 96 50 96 C34 96 20 90 20 74 C20 62 30 30 50 30 Z" fill="#fff6e6" ${x}/><ellipse cx="40" cy="52" rx="6" ry="9" fill="#fff"/>`},{kind:"ranch-carrot",name:"Garden Carrot",cat:"ranch",w:70,holdable:!0,rooms:["any"],svg:`${ge}<path d="M30 40 L78 34 L40 96 Z" fill="#ff922b" ${x}/><path d="M44 50 l10 -2 M42 64 l8 -2 M44 78 l6 -1" ${x}/><path d="M72 36 Q80 14 92 14 M72 36 Q68 14 76 4 M72 36 Q90 30 96 36" fill="none" stroke="#40c057" stroke-width="7" stroke-linecap="round"/>`},{kind:"ranch-bouquet",name:"Ranch Flowers",cat:"ranch",w:80,holdable:!0,rooms:["any"],svg:`${ge}<path d="M50 94 L40 50 M50 94 L50 44 M50 94 L62 50" stroke="#40c057" stroke-width="5" stroke-linecap="round"/><path d="M36 78 L64 78 L56 96 L44 96 Z" fill="#c9a0dc" ${x}/>${[[38,40,"#ff8fab"],[50,30,"#ffd43b"],[64,40,"#74c0fc"],[44,52,"#ff922b"],[58,52,"#c9a0dc"]].map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="9" fill="${n}" ${x}/><circle cx="${e}" cy="${t}" r="3" fill="#fff3b0"/>`).join("")}`}];Zt.push(...Ub,...t0,...Hv);const We=Object.fromEntries(Zt.map(e=>[e.kind,e])),ro=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),ct=e=>e.h??e.w,Hd=e=>e.img?`<img class="packimg" src="${ro(e.img)}" alt="${ro(e.name)}" draggable="false" />`:`<svg viewBox="${e.vb??"0 0 100 100"}" xmlns="http://www.w3.org/2000/svg">${e.svg}</svg>`,Jt=(e,t=!1)=>{const n=Cv()?Sv(e.kind):void 0;if(!n)return Hd(e);const s=t&&!e.wall?'<i class="artshade" aria-hidden="true"></i>':"",o=e.kind==="window"?'<i class="artnight" aria-hidden="true"></i>':"";return`${s}${o}<img class="packimg artimg" data-kind="${ro(e.kind)}" src="${ro(n)}" alt="${ro(e.name)}" draggable="false" />`};let oc=!1;function Pv(){oc||typeof window>"u"||(oc=!0,window.addEventListener("error",e=>{const t=e.target;if(!(t instanceof HTMLImageElement)||!t.classList.contains("artimg")||t.dataset.fell==="1")return;const n=We[t.dataset.kind||""];if(!n)return;t.dataset.fell="1",t.parentElement?.querySelector(".artshade")?.remove(),t.parentElement?.querySelector(".artnight")?.remove();const s=document.createElement("div");s.innerHTML=Hd(n);const o=s.firstElementChild;o&&t.replaceWith(o)},!0))}const ic=new WeakMap;function Wv(e){const t=ic.get(e);if(t)return t;if(!e.complete||!e.naturalWidth)return null;const n=document.createElement("canvas");n.width=e.naturalWidth,n.height=e.naturalHeight;const s=n.getContext("2d",{willReadFrequently:!0});if(!s)return null;try{s.drawImage(e,0,0)}catch{return null}const o=s.getImageData(0,0,n.width,n.height).data;return ic.set(e,o),o}function Tv(e,t,n){const s=e.getBoundingClientRect();if(s.width<1||s.height<1||!e.naturalWidth)return null;let o=(t-s.left)/s.width;const i=(n-s.top)/s.height;e.closest(".flipped")&&(o=1-o);const a=e.naturalWidth,r=e.naturalHeight,l=Math.min(s.width/a,s.height/r),c=a*l,d=r*l,g=(s.width-c)*.5,f=s.height-d,p=(o*s.width-g)/l,u=(i*s.height-f)/l;return p<0||u<0||p>=a||u>=r?null:{x:p,y:u}}function Fr(e,t,n){const s=Wv(e),o=s&&Tv(e,t,n);if(!s||!o)return!s;const i=Math.floor(o.x),r=(Math.floor(o.y)*e.naturalWidth+i)*4+3;return s[r]>24}function Rv(e,t){const n=[];try{for(let s=0;s<12;s++){const o=document.elementFromPoint(e,t);if(!o)return null;const i=o.closest("img.artimg");if(i&&!Fr(i,e,t)){n.push(i),i.style.pointerEvents="none";continue}return o}return null}finally{for(let s=0;s<n.length;s++)n[s].style.pointerEvents=""}}const Uv="var(--line)",Ev=1.4,Ue='fill="#3a1d3c" opacity=".14"',ir='fill="#3a1d3c" opacity=".22"',Rt={l:[72,172],r:[128,172]},Vn={l:[50,233],r:[150,233]},Qv={l:[88,238],r:[112,238]};function W(e=3){return`stroke="${Uv}" stroke-width="${(e*Ev).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"`}function w(e){const n=(Math.round(e*10)/10).toFixed(1);return n.endsWith(".0")?n.slice(0,-2):n}function ar(e,t,n,s,o){const i=o*Math.PI/180,a=e-n,r=t-s,l=Math.cos(i),c=Math.sin(i);return{x:n+a*l-r*c,y:s+a*c+r*l}}function lo(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=(n>>16&255)*(1-t),i=(n>>8&255)*(1-t),a=(n&255)*(1-t);return"#"+s(o)+s(i)+s(a)}function ac(e,t){const n=parseInt(e.slice(1),16),s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0"),o=n>>16&255,i=n>>8&255,a=n&255;return"#"+s(o+(255-o)*t)+s(i+(255-i)*t)+s(a+(255-a)*t)}function rr(e,t,n,s,o=0){const i=e[0],a=e[1],r=e[0]===t[0]&&e[1]===t[1]?t[0]+.01:t[0],l=t[1],c=r-i,d=l-a,g=Math.hypot(c,d)||1,f=-d/g,p=c/g,u=(i+r)/2+f*o,b=(a+l)/2+p*o,M=n/2,m=s/2,h=(M+m)/2*1.04,v=[i+f*M,a+p*M],_=[r+f*m,l+p*m],P=[r-f*m,l-p*m],R=[i-f*M,a-p*M];return`M${w(v[0])} ${w(v[1])} Q${w(u+f*h)} ${w(b+p*h)} ${w(_[0])} ${w(_[1])} A${w(m)} ${w(m)} 0 0 1 ${w(P[0])} ${w(P[1])} Q${w(u-f*h)} ${w(b-p*h)} ${w(R[0])} ${w(R[1])} A${w(M)} ${w(M)} 0 0 1 ${w(v[0])} ${w(v[1])} Z`}function sa(e,t,n,s,o){const i=[],a=(t-e)/s;for(let r=0;r<s;r++){const l=e+r*a,c=l+a;i.push(`Q${w((l+c)/2)} ${w(n+o)} ${w(c)} ${w(n)}`)}return i.join(" ")}function lr(e,t,n,s,o,i=0){const a=[];for(let r=0;r<s;r++){const l=i+2*Math.PI*r/s,c=i+2*Math.PI*(r+1)/s,d=(l+c)/2,g=e+n*Math.cos(l),f=t+n*Math.sin(l),p=e+n*Math.cos(c),u=t+n*Math.sin(c),b=e+(n+o)*Math.cos(d),M=t+(n+o)*Math.sin(d);r===0&&a.push(`M${w(g)} ${w(f)}`),a.push(`Q${w(b)} ${w(M)} ${w(p)} ${w(u)}`)}return a.join(" ")+" Z"}function Gn(e,t,n,s){const o=e==="arm"?Rt[t]:Qv[t],i=e==="arm"?t==="l"?s.armL:s.armR:t==="l"?s.legL:s.legR,a=e==="leg"?t==="l"?s.legLLift:s.legRLift:0,r=i||a?` transform="translate(0 ${w(-a)}) rotate(${w(i)} ${o[0]} ${o[1]})"`:"";return`<g class="${e} ${t}"${r} style="transform-box:view-box;transform-origin:${o[0]}px ${o[1]}px">${n}</g>`}const $n="var(--line)";function Vt(e,t=.8,n=2.2){return e.map(s=>`<path d="${s}" fill="none" stroke="var(--hair-shade)" stroke-width="${n}" stroke-linecap="round" opacity="${t}"/>`).join("")}function Ys(e,t=.32){return e.map(n=>`<path d="${n}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${t}"/>`).join("")}function dn(){return'<path d="M54 72 Q62 44 92 38 Q70 50 63 74 Z" fill="#fff" opacity=".45"/><path d="M60 64 Q70 48 86 42" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".8"/><path d="M104 37 Q130 38 145 58 Q128 46 106 43 Z" fill="#fff" opacity=".3"/><circle cx="72" cy="50" r="2" fill="#fff" opacity=".85"/>'}function ot(e,t,n){return n?`<path d="${e}" fill="url(#${t}h)"/>`:""}const rc="M34 112 Q28 28 100 28 Q172 28 166 112 Q164 146 146 156 L54 156 Q36 146 34 112 Z";function ht(e,t){return`<path d="${rc}" fill="var(--hair)" ${W(3.2)}/>${ot(rc,e,t)}`}function Ba(e,t,n,s,o,i,a=10){const r=lr(e+2,t+3,n,12,7,s+.1),l=lr(e,t,n-1,12,7,s);let c=`<path d="${r}" fill="var(--hair-shade)" ${W(3.2)}/><path d="${l}" fill="var(--hair)" ${W(3.2)}/>${ot(l,o,i)}`;for(let d=0;d<a;d++){const g=d*2.5+s,f=(n-6)*Math.sqrt((d+.5)/a),p=e+f*Math.cos(g),u=t+f*Math.sin(g);c+=`<path d="M${w(p-4)} ${w(u+1)} q1 -5 4.5 -4.5 q3.5 1 2.5 4.5" fill="none" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>`,u<t-2&&p<e+6&&(c+=`<path d="M${w(p-2.5)} ${w(u-2.5)} q2 -2 3.5 -1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`)}return c+=`<ellipse cx="${w(e-10)}" cy="${w(t-12)}" rx="6" ry="3.4" fill="#fff" opacity=".55" transform="rotate(-35 ${w(e-10)} ${w(t-12)})"/>`,c+=`<path d="M${w(e-16)} ${w(t-6)} Q${w(e-6)} ${w(t-18)} ${w(e+4)} ${w(t-14)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>`,c}function Yn(e,t,n,s=6,o=[],i=7){let a=`<path d="M${e} ${t-6} V${n}" stroke="${$n}" stroke-width="${w(2*s+4.6)}" stroke-linecap="round"/><path d="M${e} ${t-6} V${n}" stroke="var(--hair)" stroke-width="${w(2*s)}" stroke-linecap="round"/>`,r=t,l=0;for(;r<n;){const c=l%2?1:-1;a+=`<path d="M${w(e-c)} ${w(r-4)} Q${w(e+c*s*1.05)} ${w(r-2)} ${w(e+c*s*.55)} ${w(r+4)} Q${w(e)} ${w(r+5.5)} ${w(e-c*1.4)} ${w(r+1)}" fill="none" stroke="var(--hair-shade)" stroke-width="1.7" stroke-linecap="round"/>`,c>0&&(a+=`<path d="M${w(e+1)} ${w(r-2)} q2.2 -.5 3 1.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>`),r+=i,l++}for(let c=0;c<o.length;c++){const d=o[c];a+=`<rect x="${w(e-6.2)}" y="${d-4}" width="12.4" height="8" rx="2.6" fill="var(--acc)" stroke="${$n}" stroke-width="2"/><rect x="${w(e-4)}" y="${d-2.5}" width="2.6" height="4.5" rx="1" fill="#fff" opacity=".6"/>`}return a+=`<path d="M${e-4} ${n+2} q2 5 4 6 q2 -1 4 -6" fill="var(--hair)" stroke="${$n}" stroke-width="2"/>`,a}function Mi(e,t,n,s=5.5){let o=`<path d="M${e} ${t} V${n}" stroke="${$n}" stroke-width="${w(2*s+4)}" stroke-linecap="round"/><path d="M${e} ${t} V${n}" stroke="var(--hair)" stroke-width="${w(2*s)}" stroke-linecap="round"/>`;for(let i=t+8;i<n;i+=16)o+=`<path d="M${w(e-s*.7)} ${i} Q${e} ${i+5} ${w(e+s*.7)} ${i}" fill="none" stroke="var(--hair-shade)" stroke-width="1.6" opacity=".8"/>`;return o+=`<circle cx="${e}" cy="${n+3}" r="${w(s*.55)}" fill="var(--hair)" stroke="${$n}" stroke-width="2"/>`,o}function Ha(e,t,n,s){return`<path d="${e}" fill="var(--hair)" ${W(3)}/>${ot(e,t,n)}${Vt(s)}${Ys(s.slice(0,2),.45)}`}function hs(e,t,n){return`<ellipse cx="${e}" cy="${t}" rx="8" ry="5.5" fill="var(--acc)" ${W(2.4)} transform="rotate(${n} ${e} ${t})"/><ellipse cx="${e-1}" cy="${t-2}" rx="2.4" ry="1.3" fill="#fff" opacity=".6" transform="rotate(${n} ${e-1} ${t-2})"/>`}const gn='<path d="M42 104 Q44 76 70 66 Q86 74 100 58 Q114 74 130 66 Q156 76 158 104" fill="none" stroke="#3a1d3c" stroke-width="9" opacity=".12"/>';function Pd(e){return e==="puffs"||e==="coily"?"puffs":e==="afro"?"afro":e==="braids"?"braids":e==="boxbraids"?"box":e==="locs"?"locs":e==="sidebraid"?"sidebraid":e==="crown"?"crown":e==="pony"?"pony":e==="sidepony"?"sidepony":e==="pigtails"?"pigtails":e==="halfup"?"halfup":e==="buns"?"buns":e==="topbun"?"topbun":e==="lowbun"?"lowbun":e==="long"?"long":e==="wavy"||e==="wavybob"?e==="wavy"?"wavy":"bob":e==="bob"||e==="curlybob"||e==="sidebangs"?"bob":e==="pixie"?"pixie":(e==="bangs"||e==="short")&&e==="bangs"?"bangs":"short"}function Av(e,t,n){const s=Pd(e);if(s==="puffs"){const o=e==="coily"?26:30;return Ba(48,52,o,0,t,n,12)+Ba(152,52,o,.3,t,n,12)+`<path d="M42 112 Q38 48 100 44 Q162 48 158 112 Q154 144 100 146 Q46 144 42 112 Z" fill="var(--hair)" ${W(3.2)}/>`+hs(66,68,-35)+hs(134,68,35)}if(s==="afro")return Ba(100,78,78,.2,t,n,14);if(s==="braids")return ht(t,n)+Yn(34,108,230,5.4,[196])+Yn(166,108,230,5.4,[196]);if(s==="box")return ht(t,n)+Yn(30,110,228,5,[200],10)+Yn(170,110,228,5,[200],10);if(s==="locs")return ht(t,n)+Mi(32,112,236)+Mi(168,112,236);if(s==="sidebraid")return ht(t,n);if(s==="pony"||s==="sidepony"||s==="halfup"){const o=s==="sidepony"?"M118 78 Q150 70 158 120 Q164 160 150 200 Q136 188 138 160 Q132 120 124 96 Z":"M126 40 Q178 28 180 92 Q184 132 168 168 Q160 196 174 220 Q148 212 145 182 Q140 156 152 124 Q160 90 132 64 Z",i=s==="halfup"?70:s==="sidepony"?86:44;return ht(t,n)+Ha(o,t,n,s==="sidepony"?["M130 96 Q150 120 146 160","M138 110 Q154 140 148 180"]:["M146 56 Q170 88 160 130","M156 66 Q176 100 166 140","M150 150 Q148 180 160 206"])+hs(s==="sidepony"?124:128,i,s==="sidepony"?-20:25)}if(s==="pigtails")return ht(t,n)+Ha("M40 100 Q22 120 28 168 Q34 200 48 214 Q58 196 52 160 Q58 124 56 108 Z",t,n,["M40 120 Q32 150 40 184"])+Ha("M160 100 Q178 120 172 168 Q166 200 152 214 Q142 196 148 160 Q142 124 144 108 Z",t,n,["M160 120 Q168 150 160 184"])+hs(52,96,20)+hs(148,96,-20);if(s==="buns"){let o="";for(const i of[52,148])o+=`<circle cx="${i}" cy="44" r="24" fill="var(--hair)" ${W(3.2)}/>${n?`<circle cx="${i}" cy="44" r="24" fill="url(#${t}h)"/>`:""}`,o+=Vt([`M${i-14} 48 Q${i-14} 28 ${i} 26 Q${i+16} 30 ${i+14} 48`,`M${i-8} 54 Q${i+8} 56 ${i+12} 48`]),o+=`<path d="M${i-12} 34 Q${i-4} 24 ${i+4} 26" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>`;return o+ht(t,n)}if(s==="topbun")return`<circle cx="100" cy="30" r="26" fill="var(--hair)" ${W(3.2)}/>${n?`<circle cx="100" cy="30" r="26" fill="url(#${t}h)"/>`:""}<path d="M82 28 Q100 12 118 28" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>${Vt(["M86 36 Q100 24 114 36","M90 42 Q100 34 110 42"])}${ht(t,n)}`;if(s==="lowbun")return ht(t,n)+`<circle cx="100" cy="168" r="22" fill="var(--hair)" ${W(3)}/>${n?`<circle cx="100" cy="168" r="22" fill="url(#${t}h)"/>`:""}${hs(100,148,0)}`;if(s==="long"||s==="wavy"){const o=s==="wavy"?"M36 108 Q28 160 40 210 Q52 250 46 286 Q70 270 78 230 Q60 180 58 140 Q52 120 48 108 Z M164 108 Q172 160 160 210 Q148 250 154 286 Q130 270 122 230 Q140 180 142 140 Q148 120 152 108 Z":"M38 110 Q30 170 36 240 Q42 280 34 300 L70 292 Q64 240 66 180 Q62 140 56 112 Z M162 110 Q170 170 164 240 Q158 280 166 300 L130 292 Q136 240 134 180 Q138 140 144 112 Z";return`<path d="${o}" fill="var(--hair)" ${W(3)}/>${ot(o,t,n)}${ht(t,n)}`}if(s==="bob"){const o=e==="curlybob"?"M30 120 Q24 170 48 196 Q70 210 100 206 Q130 210 152 196 Q176 170 170 120 Q150 150 100 156 Q50 150 30 120 Z":"M32 116 Q26 168 50 190 Q78 204 100 200 Q122 204 150 190 Q174 168 168 116 Q150 148 100 154 Q50 148 32 116 Z";return`<path d="${o}" fill="var(--hair)" ${W(3.2)}/>${ot(o,t,n)}${ht(t,n)}`}return ht(t,n)}function zv(e,t,n){const s=Pd(e),o='<path d="M100 34 V56" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>';if(s==="puffs"||s==="braids"||s==="box"||s==="locs"||s==="afro"||s==="bangs"){const a=s==="afro"?"M48 100 Q52 48 100 40 Q148 48 152 100 Q140 78 100 70 Q60 78 48 100 Z":s==="bangs"?"M40 108 Q36 40 100 34 Q164 40 160 108 L150 96 Q130 108 100 100 Q70 108 50 96 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q154 74 130 62 Q112 70 100 52 Q88 70 70 62 Q46 74 40 106 Z";let r=gn+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${ot(a,t,n)}${o}`;return r+=Vt(["M84 44 Q70 52 60 70","M116 44 Q130 52 140 70","M92 40 Q80 48 74 58","M108 40 Q120 48 126 58","M76 42 Q58 56 52 82","M124 42 Q142 56 148 82"]),r+=Ys(["M90 36 Q78 42 70 52","M112 36 Q124 42 132 52"]),s==="puffs"?(r+=`<path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="${$n}" stroke-width="7" stroke-linecap="round"/><path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`,r+=`<path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="${$n}" stroke-width="7" stroke-linecap="round"/><path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`):s==="braids"||s==="box"?(r+=Yn(48,114,200,5,[156],s==="box"?10:7),r+=Yn(152,114,200,5,[156],s==="box"?10:7)):s==="locs"&&(r+=Mi(46,116,210,4.6)+Mi(154,116,210,4.6)),r+dn()}if(s==="sidebraid"){const a="M40 108 Q36 36 100 32 Q164 36 160 100 Q140 78 100 70 Q70 80 40 108 Z";return gn+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${ot(a,t,n)}${Vt(["M70 46 Q86 60 96 74","M120 44 Q136 58 146 74"])}${Yn(150,100,210,5.6,[168],7)}${dn()}`}if(s==="crown"){const a="M40 106 Q36 36 100 32 Q164 36 160 106 Q150 80 100 74 Q50 80 40 106 Z";let r="";for(let l=0;l<7;l++){const c=58+l*14;r+=`<path d="M${c} 58 Q${c+7} 46 ${c+14} 58" fill="none" stroke="var(--hair-shade)" stroke-width="3.2" stroke-linecap="round"/>`}return gn+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${ot(a,t,n)}${r}${dn()}`}if(s==="pony"||s==="sidepony"||s==="halfup"||s==="pigtails"){const a=s==="sidepony"?"M40 108 Q34 36 100 32 Q166 34 160 108 Q150 86 120 78 Q90 90 60 74 Q48 90 40 108 Z":"M40 108 Q34 34 100 32 Q166 34 160 108 Q156 84 144 72 Q128 86 104 80 Q86 78 72 68 Q60 84 48 84 Q42 94 40 108 Z";let r=gn+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${ot(a,t,n)}`;return r+=`<path d="M40 104 Q36 120 44 132 Q46 116 50 106 Z" fill="var(--hair)" ${W(2.4)}/><path d="M160 104 Q164 120 156 132 Q154 116 150 106 Z" fill="var(--hair)" ${W(2.4)}/>`,r+=Vt(["M70 46 Q90 60 104 74","M128 46 Q140 60 146 74","M96 40 Q110 56 116 66"]),r+=Ys(["M76 42 Q92 52 100 62"]),r+dn()}if(s==="buns"||s==="topbun"||s==="lowbun"){const a=s==="topbun"?"M44 108 Q40 50 100 46 Q160 50 156 108 Q148 82 100 74 Q52 82 44 108 Z":"M40 106 Q36 36 100 32 Q164 36 160 106 Q152 80 138 70 Q126 80 112 76 Q104 82 100 74 Q96 82 88 76 Q74 80 62 70 Q48 80 40 106 Z";let r=gn+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${ot(a,t,n)}`;if(r+=Vt(["M80 42 Q72 56 68 68","M120 42 Q128 56 132 68","M100 36 Q98 56 100 70","M90 38 Q84 56 86 72","M110 38 Q116 56 114 72"]),r+=Ys(["M86 38 Q80 46 78 54","M114 38 Q120 46 122 54"]),s==="buns")for(const[l,c]of[[42,1],[158,-1]]){const d=`M${l} 100 q${-8*c} 14 ${-2*c} 24 q${5*c} 8 ${-1*c} 14`;r+=`<path d="${d}" fill="none" stroke="${$n}" stroke-width="7" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`}return r+dn()}if(s==="long"||s==="wavy"||s==="bob"){const a=e==="sidebangs"||e==="wavybob"?"M38 108 Q34 40 70 36 Q100 34 112 48 Q90 70 48 78 Q36 90 38 108 Z M112 48 Q140 36 164 50 Q166 100 150 108 Q130 80 112 70 Z":"M40 108 Q34 36 100 32 Q166 36 160 108 Q152 78 128 68 Q112 78 100 60 Q88 78 72 68 Q48 78 40 108 Z";return gn+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${ot(a,t,n)}${Vt(["M78 46 Q68 64 64 80","M122 46 Q132 64 136 80","M100 38 V64"])}${Ys(["M88 40 Q80 50 76 60"])}${dn()}`}if(s==="pixie"){const a="M48 104 Q44 48 100 40 Q140 46 150 78 Q156 100 140 108 Q120 86 100 90 Q70 84 52 104 Z";return gn+`<path d="${a}" fill="var(--hair)" ${W(3.2)}/>${ot(a,t,n)}${Vt(["M70 56 Q86 70 96 84","M118 52 Q132 66 138 82"])}${dn()}`}const i="M46 106 Q42 46 100 38 Q158 46 154 106 Q140 80 100 76 Q60 80 46 106 Z";return gn+`<path d="${i}" fill="var(--hair)" ${W(3.2)}/>${ot(i,t,n)}${o}${dn()}`}const Ss="var(--line)";function ss(e,t,n,s=[]){const o=s.map(i=>`<path d="${i}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`).join("");return(n?`<path d="${e}" fill="url(#${t}c)"/>`:"")+o}function cr(e,t,n){const s=(n+7).toFixed(1);return`<path d="${e}" fill="none" stroke="${Ss}" stroke-width="${s}" stroke-linecap="round"/><path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function Vr(e,t,n){return Gn("arm",e,t,n)}function oi(e,t,n=!1){const[s,o]=Rt[e],i=e==="l"?-1:1;let a=cr(`M${s} ${o} L${s+7*i} ${o+20}`,"var(--top)",22);return n&&(a+=`<path d="M${s+7*i-12} ${o+17} H${s+7*i+12}" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round" opacity=".9" transform="rotate(${-18*i} ${s+7*i} ${o+17})"/>`),Vr(e,a,t)}function co(e,t,n=!0){const[s,o]=Rt[e],[i,a]=Vn[e],r=e==="l"?-1:1,l=(s+i)/2+6*r;let c=cr(`M${s-2*r} ${o-2} Q${l} ${(o+a)/2-6} ${i-r} ${a-16}`,"var(--top)",21);return n&&(c+=cr(`M${i-3*r} ${a-17} L${i-r} ${a-13}`,"var(--top-trim)",20)),Vr(e,c,t)}function dr(e,t,n=!1){const[s,o]=Rt[e],i=e==="l"?-1:1,a=s+4*i,r=o+8;let l=`<path d="${lr(a,r,13,9,3.2)}" fill="var(--top)" ${W(2.8)}/>`;return l+=`<ellipse cx="${a-4*i}" cy="${r-5}" rx="5" ry="3" fill="#fff" opacity=".45"/>`,n&&(l+=`<path d="M${a-11} ${r+13} ${sa(a-11,a+11,r+13,4,3)}" fill="none" stroke="#fff" stroke-width="2.4"/>`),Vr(e,l,t)}function pt(e,t){return e("l",t)+e("r",t)}const lc="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 228 Q100 236 64 228 Z";function qn(e,t,n,s,o,i,a="",r=[],l=!1){const c=`<path d="${t}" fill="var(--top)" ${W(3)}/>${ss(t,s,o,r)}${a}`;return`<g class="shirt" data-hem="${i}">${l?c+n:n+c}</g>`}function Dv(e,t,n,s,o){if(t.dress)return"";const i=t.top;if(i==="hoodie"){const l="M66 168 Q72 158 92 158 H108 Q128 158 134 168 L139 230 Q100 240 61 230 Z",c=`<path d="M120 162 Q132 164 134 170 L139 230 Q128 233 123 233 Z" ${Ue}/><path d="M72 172 Q76 164 86 163" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".38"/><path d="M78 159 Q100 182 122 159 Q120 152 100 152 Q80 152 78 159 Z" fill="var(--top-trim)" ${W(2.8)}/><path d="M92 172 v18 M108 172 v18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="92" cy="191" r="2.6" fill="#fff" ${W(1.8)}/><circle cx="108" cy="191" r="2.6" fill="#fff" ${W(1.8)}/><path d="M78 202 H122 L127 222 H73 Z" fill="var(--top)" ${W(2.6)}/><path d="M78 202 H122 L124 210 H76 Z" ${Ue}/><path d="M61 226 Q100 236 139 226 L139 234 Q100 244 61 234 Z" fill="var(--top-trim)" ${W(2.8)}/>`;return qn(e,l,pt(co,e),n,s,o,c,["M74 196 q-2 12 2 22","M126 190 q2 14 0 26"])}if(i==="stripes"||i==="jersey"){const l="M68 168 Q74 158 92 158 H108 Q126 158 132 168 L135 232 Q100 238 65 232 Z",c=`${n}st`,d=i==="jersey"?'<path d="M70 176 H130 L128 188 H72 Z" fill="var(--top-trim)"/><path d="M68 210 H132 L130 222 H70 Z" fill="var(--top-trim)"/>':[166,179,192,205,218,231].map(u=>`<rect x="60" y="${u}" width="80" height="6" fill="var(--top-trim)"/>`).join(""),g=i==="jersey"?'<path d="M86 160 L100 176 L114 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/>':'<path d="M84 159 Q100 172 116 159" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',f=s?`<path d="${l}" fill="url(#${n}c)"/>`:"";return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${c}"><path d="${l}"/></clipPath></defs>${pt(u=>oi(u,e,!0),e)}<path d="${l}" fill="var(--top)"/><g clip-path="url(#${c})">${f}<path d="M118 160 L135 168 L138 236 H120 Z" ${Ue}/>${d}</g><path d="${l}" fill="none" ${W(3)}/>${g}<path d="M78 198 q-2 12 1 24" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/><path d="M122 190 q2 14 0 28" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".22"/></g>`}if(i==="sweater"||i==="cardigan"){const l=i==="cardigan"?"M68 168 Q74 158 92 158 H108 Q126 158 132 168 L134 232 H108 L100 210 L92 232 H66 Z":"M66 168 Q72 158 92 158 H108 Q128 158 134 168 L136 234 Q100 242 64 234 Z",c=`<path d="M118 166 L134 174 L136 230 Q120 236 112 228 Z" ${Ue}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M64 226 Q100 236 136 226" fill="none" stroke="var(--top-trim)" stroke-width="6" stroke-linecap="round"/>`,d=i==="cardigan"?[186,202,218].map(g=>`<circle cx="100" cy="${g}" r="2.4" fill="var(--top-trim)" ${W(1.4)}/>`).join(""):"";return qn(e,l,pt(co,e),n,s,o,c+d,["M80 190 q-2 16 0 28","M120 188 q2 16 0 30"])}if(i==="tank"||i==="bib"){const l=i==="bib"?"M78 168 H122 L126 228 H74 Z":"M78 168 Q86 160 96 164 H104 Q114 160 122 168 L128 226 H72 Z",c=`<path d="M110 172 H126 L128 226 H114 Z" ${Ue}/><path d="M82 176 Q84 168 92 166" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".35"/>`,d=i==="bib"?`${c}<path d="M86 150 L78 168 M114 150 L122 168" stroke="${Ss}" stroke-width="8" stroke-linecap="round"/><path d="M86 150 L78 168 M114 150 L122 168" stroke="var(--top)" stroke-width="4.5" stroke-linecap="round"/><rect x="90" y="176" width="20" height="16" rx="3" fill="var(--top-trim)" ${W(1.6)}/>`:`${c}<path d="M84 166 Q100 176 116 166" fill="none" stroke="var(--top-trim)" stroke-width="4"/>`;return qn(e,l,"",n,s,o,d,["M88 190 q2 14 0 24"])}if(i==="puff"||i==="ruffle"){const l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L132 222 H68 Z",c=`<path d="M100 172 l-8 -5 v10 z M100 172 l8 -5 v10 z" fill="var(--top-trim)" ${W(1.8)}/><path d="M97 174 l-4 10 M103 174 l4 10" stroke="var(--top-trim)" stroke-width="2.6" stroke-linecap="round"/>`,d=(i==="ruffle"?`<path d="M68 166 Q74 178 82 166 Q90 180 100 166 Q110 180 118 166 Q126 180 132 166" fill="var(--top-trim)" ${W(2)}/>`:c)+`<path d="M118 162 Q128 164 130 170 L132 222 H120 Z" ${Ue}/><path d="M74 176 Q76 168 84 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return qn(e,l,pt(dr,e),n,s,o,d,["M86 190 q2 10 0 20","M116 188 q-2 12 0 22"],!0)}if(i==="button"){const l=lc,c=[180,196,212].map(g=>`<circle cx="100" cy="${g}" r="2.6" fill="#fff" ${W(1.6)}/>`).join(""),d=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${Ue}/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M100 164 V226" stroke="#fff" stroke-width="2" opacity=".7"/>${c}<path d="M82 160 Q100 172 118 160" fill="var(--top)" ${W(2.2)}/>`;return qn(e,l,pt(g=>oi(g,e,!1),e),n,s,o,d,["M78 196 q-1 12 2 20"])}if(i==="raincoat"){const l="M62 168 Q70 156 92 156 H108 Q130 156 138 168 L146 240 Q100 252 54 240 Z",c=`<path d="M120 164 L142 176 L146 236 Q124 244 116 232 Z" ${Ue}/><path d="M72 176 Q76 166 88 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/><path d="M70 156 Q100 176 130 156" fill="none" stroke="var(--top-trim)" stroke-width="6"/><circle cx="100" cy="196" r="4" fill="var(--top-trim)" ${W(1.8)}/><path d="M78 214 H122" stroke="var(--top-trim)" stroke-width="4" stroke-linecap="round"/>`;return qn(e,l,pt(co,e),n,s,o,c,["M76 190 q-4 18 -2 36","M124 188 q4 18 2 36"])}const a=lc,r=`<path d="M118 168 L134 176 L136 228 Q118 234 112 224 Z" ${Ue}/><path d="M84 160 Q100 172 116 160" fill="none" stroke="var(--top-trim)" stroke-width="5"/><path d="M74 176 Q78 168 86 166" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".38"/>`;return qn(e,a,pt(l=>oi(l,e,!1),e),n,s,o,r,["M78 196 q-2 12 1 22","M122 194 q2 14 -1 24"])}function cc(e,t,n,s,o,i=!1,a=16){const r=e==="l"?88:112,l=e==="l"?-1:1,c=`M${r-a/2} 226 Q${r-a/2+l} ${n-20} ${r-a/2+2*l} ${n} H${r+a/2} Q${r+a/2} ${n-30} ${r+a/2-l} 226 Z`;let d=`<path d="${c}" fill="var(--bottom)" ${W(2.8)}/>`;return d+=ss(c,s,o,[`M${r-4*l} 240 Q${r} ${(226+n)/2} ${r+3*l} ${n-14}`]),e==="r"?d+=`<path d="M${r+1} 230 H${r+a/2} L${r+a/2} ${n} H${r+4} Z" ${Ue}/>`:d+=`<path d="M${r-2} 238 Q${r-6} ${(226+n)/2} ${r-2} ${n-10}" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".3"/>`,i&&(d+=`<path d="M${r-a/2-1} ${n-8} H${r+a/2+1} V${n+1} H${r-a/2-1} Z" fill="var(--bottom-trim)" ${W(2)}/>`),Gn("leg",e,d,t)}function Zv(e,t,n,s){if(t.dress)return'<g data-layer="bottom"></g>';const o=t.bottom;if(o==="skirt"){const f="M68 222 H132 L146 262 Q100 274 54 262 Z";return`<g data-layer="bottom"><path class="skirt" d="${f}" fill="var(--bottom)" ${W(3)}/>${ss(f,n,s,["M82 234 L76 258","M100 232 V266","M118 234 L126 258"])}<path d="M114 224 H132 L146 262 Q130 268 118 266 Z" ${Ue}/><path d="M72 228 Q66 246 64 258" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".3"/><path d="M84 236 v10 M116 236 v10" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/></g>`}if(o==="tutu")return'<g data-layer="bottom"></g>';if(o==="overalls"){const f="M66 220 H134 L139 264 H106 L100 254 L94 264 H61 Z";return`<g data-layer="bottom"><g class="leg" style="transform-box:view-box;transform-origin:100px 238px"><path d="${f}" fill="var(--bottom)" ${W(3)}/>${ss(f,n,s,["M78 232 Q74 248 72 260","M122 230 Q128 248 132 260"])}<path d="M118 222 H134 L139 264 H122 Z" ${Ue}/><path d="M64 258 H95 M105 258 H138" stroke="var(--bottom-trim)" stroke-width="4"/></g></g>`}const a=o==="shorts"?256:292,r=o==="joggers"||o==="jeans",l=o==="leggings"?12:o==="shorts"?18:16,c=cc("l",e,a,n,s,r,l)+cc("r",e,a,n,s,r,l),d=o==="jeans"?'<path d="M88 232 V286 M112 232 V286" stroke="#c9a24a" stroke-width="1.4" stroke-dasharray="2 3" opacity=".7"/>':"";return`<g data-layer="bottom">${`<path d="M70 220 H130 V230 H70 Z" fill="var(--bottom)" ${W(2.4)}/>`}${c}${d}</g>`}function qv(e,t,n,s){if(t.dress)return'<g data-layer="bottom-over"></g>';const o=t.bottom;if(o==="overalls"){const i="M78 180 H122 L124 228 H76 Z";return`<g data-layer="bottom-over"><path d="M80 176 L72 164 M120 176 L128 164" stroke="${Ss}" stroke-width="12" stroke-linecap="round"/><path d="M80 176 L72 164 M120 176 L128 164" stroke="var(--bottom)" stroke-width="7.5" stroke-linecap="round"/><path d="${i}" fill="var(--bottom)" ${W(3)}/>${ss(i,n,s,["M86 200 q14 6 28 0"])}<path d="M88 190 H112 V206 Q100 212 88 206 Z" fill="var(--bottom-trim)" ${W(2.4)}/><circle cx="82" cy="186" r="3.6" fill="#fff" ${W(2)}/><circle cx="118" cy="186" r="3.6" fill="#fff" ${W(2)}/><path d="M66 222 H134 L135 230 H65 Z" fill="var(--bottom)" ${W(3)}/><path d="M108 180 H122 L124 228 H110 Z" ${Ue}/><path d="M82 182 v12" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/></g>`}if(o==="tutu"){let i="";const a=[[266,50,150,8],[256,56,144,7],[246,64,136,6]];for(let l=0;l<a.length;l++){const[c,d,g,f]=a[l],p=`M${d+8} ${c-22} H${g-8} L${g} ${c} ${sa(g,d,c,6,f)} Z`;i+=`<path class="skirt" d="${p}" fill="var(--bottom)" ${W(2.4)}/>`,i+=`<path d="M${g-20} ${c-16} L${g-6} ${c-2}" fill="none" stroke="#3a1d3c" stroke-width="2.4" stroke-linecap="round" opacity=".2"/>`}const r="M66 214 H134 V224 H66 Z";return`<g data-layer="bottom-over">${i}<path d="${r}" fill="var(--bottom-trim)" ${W(2.6)}/>${ss(r,n,s)}</g>`}return'<g data-layer="bottom-over"></g>'}function dc(e,t){return`<path d="M${e} ${t+2} c-3 -5 -9 -1 -5 3 l5 4 l5 -4 c4 -4 -2 -8 -5 -3z" fill="var(--top-trim)" opacity=".85"/>`}function Iv(e,t,n,s,o){const i=t.dress;if(!i)return"";const a=`${n}dr`;let r="M72 210 H128 L150 268 Q100 282 50 268 Z",l="M72 168 Q78 158 94 158 H106 Q122 158 128 168 L130 214 H70 Z",c="",d=pt(u=>dr(u,e,!0),e),g=!0;i==="sundress"?(r="M76 214 H124 L140 266 Q100 276 60 266 Z",c='<path d="M78 166 Q100 180 122 166" fill="none" stroke="var(--top-trim)" stroke-width="5"/>',d="",g=!1):i==="party"?c=[[64,236],[86,228],[108,234],[130,242],[76,254],[100,250],[122,258],[92,188]].map(([b,M])=>dc(b,M)).join("")+`<path d="M100 214 l-10 -6 v12 z M100 214 l10 -6 v12 z" fill="var(--top-trim)" ${W(1.8)}/><path d="M52 262 Q100 276 148 262" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="1 5" opacity=".85"/>`:i==="pinafore"?(l="M80 176 H120 L122 214 H78 Z",c='<path d="M86 158 L80 178 M114 158 L120 178" stroke="var(--top)" stroke-width="5" stroke-linecap="round"/>',d="",g=!1,r="M74 212 H126 L142 264 Q100 274 58 264 Z"):i==="jumper"?(c=`<path d="M84 160 Q100 174 116 160" fill="var(--top-trim)" ${W(2)}/>`,d=pt(u=>oi(u,e,!0),e),g=!1):i==="ballet"?(r="M78 214 H122 L132 250 Q100 258 68 250 Z",c=`<path d="M70 248 ${sa(70,130,248,5,5)}" fill="none" stroke="#fff" stroke-width="2"/>`,d=pt(dr,e)):i==="nightgown"?(r="M80 214 H120 L132 270 Q100 278 68 270 Z",c='<path d="M88 164 Q100 176 112 164" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>',d=pt(co,e),g=!1):i==="raindress"?(r="M70 212 H130 L148 268 Q100 280 52 268 Z",c='<path d="M76 168 Q100 186 124 168" fill="none" stroke="var(--top-trim)" stroke-width="5"/><circle cx="100" cy="198" r="3.4" fill="var(--top-trim)"/>',d=pt(co,e),g=!1):(r="M70 214 H130 L152 266 Q100 280 48 266 Z",l="M70 168 Q76 158 92 158 H108 Q124 158 130 168 L131 216 H69 Z",c=[[66,236],[86,228],[110,232],[132,240],[76,254],[100,248],[124,258],[56,260],[144,262],[96,266],[84,182],[114,190],[100,200]].map(([b,M])=>dc(b,M)).join("")+`<path d="M112 214 H130 L152 266 Q138 271 128 272 Z" ${Ue}/><path d="M118 162 L130 168 L131 216 H120 Z" ${Ue}/><path d="M50 262 Q100 276 150 262" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9"/><path d="M60 226 Q56 244 54 258" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/><path d="M68 210 H132 V220 H68 Z" fill="var(--top-trim)" ${W(2.6)}/><path d="M100 215 l-13 -8 v16 z M100 215 l13 -8 v16 z" fill="var(--top-trim)" ${W(2.2)}/><circle cx="100" cy="215" r="3.6" fill="var(--top-trim)" ${W(2)}/><path d="M97 218 l-5 14 M103 218 l5 14" stroke="var(--top-trim)" stroke-width="3" stroke-linecap="round"/><path d="M80 158 Q78 172 94 170 Q99 166 100 162 Q101 166 106 170 Q122 172 120 158 Q100 164 80 158 Z" fill="#fff" ${W(2.4)}/>`);const f=`${r} ${l}`,p=`<path class="skirt" d="${r}" fill="var(--top)" ${W(3)}/><path d="${l}" fill="var(--top)" ${W(3)}/><g clip-path="url(#${a})">${ss(f,n,s,["M80 226 Q74 248 70 266","M120 226 Q126 248 130 266"])}${c}</g>`;return`<g class="shirt" data-hem="${o}"><defs><clipPath id="${a}"><path d="${f}"/></clipPath></defs>${g?p+d:d+p}</g>`}function Ov(e,t,n,s){const o=e==="l"?`<g transform="translate(${2*s} 0) scale(-1 1)">${n}</g>`:n;return Gn("leg",e,o,t)}function Nv(e,t){const n=t.shoes;let s="";for(const o of["l","r"]){const i=o==="l"?87:113;let a="";if(n==="sneakers"||n==="lightup"){const r=n==="lightup"?`<circle cx="${i-4}" cy="292" r="2.2" fill="#ff8fab"/><circle cx="${i+4}" cy="296" r="2.2" fill="#8ecae6"/><circle cx="${i}" cy="300" r="2" fill="#ffd166"/>`:"";a=`<path d="M${i} 270 V286" fill="none" stroke="var(--sock)" stroke-width="16" stroke-linecap="round"/><path d="M${i-14} 296 Q${i-14} 284 ${i} 284 Q${i+14} 284 ${i+16} 296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+12} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${W(2.8)}/><path d="M${i-12} 304 H${i+18}" stroke="var(--shoe-trim)" stroke-width="3.5" stroke-linecap="round"/><path d="M${i-6} 290 l5 2 M${i-6} 295 l6 2" stroke="${Ss}" stroke-width="1.8" stroke-linecap="round"/>${r}`}else if(n==="boots"||n==="rainboots"){const r=n==="rainboots"?248:258,l=n==="boots"?[[-6,272],[5,268],[-2,284],[7,290],[-8,294]].map(([c,d])=>`<circle cx="${i+c}" cy="${d}" r="2.6" fill="#fff" opacity=".9"/>`).join(""):"";a=`<path d="M${i-14} ${r} H${i+14} V296 Q${i+22} 298 ${i+22} 304 Q${i+22} 310 ${i+10} 310 H${i-14} Q${i-18} 310 ${i-16} 302 Z" fill="var(--shoe)" ${W(2.8)}/><path d="M${i-16} ${r-4} H${i+16} V${r+8} H${i-16} Z" fill="var(--shoe)" ${W(2.6)}/>`+l+(n==="rainboots"?`<path d="M${i-12} ${r+16} H${i+12}" stroke="var(--shoe-trim)" stroke-width="4" stroke-linecap="round"/>`:`<path d="M${i-6} ${r+14} V292" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".45"/>`)}else n==="maryjanes"?a=`<path d="M${i} 266 V290" fill="none" stroke="var(--sock)" stroke-width="15" stroke-linecap="round"/><path d="M${i-12} 274 ${sa(i-12,i+12,274,4,4)} L${i+12} 268 H${i-12} Z" fill="var(--sock)" ${W(2)}/><path d="M${i-13} 298 Q${i-13} 290 ${i} 290 Q${i+13} 290 ${i+14} 298 Q${i+20} 300 ${i+20} 304 Q${i+20} 309 ${i+8} 309 H${i-12} Q${i-16} 309 ${i-14} 302 Z" fill="var(--shoe)" ${W(2.8)}/><path d="M${i-10} 294 H${i+12}" stroke="${Ss}" stroke-width="2"/><circle cx="${i+8}" cy="294" r="2.2" fill="var(--acc)"/>`:n==="sandals"?a=`<path d="M${i-12} 298 Q${i-12} 286 ${i} 286 Q${i+12} 286 ${i+14} 296 Q${i+18} 298 ${i+18} 302 Q${i+18} 306 ${i+8} 306 H${i-12} Q${i-16} 306 ${i-14} 300 Z" fill="var(--skin)" ${W(2.4)}/><path d="M${i-14} 304 H${i+18}" stroke="var(--shoe)" stroke-width="5" stroke-linecap="round"/><path d="M${i-8} 292 H${i+10} M${i+2} 300 L${i+8} 290" stroke="var(--shoe)" stroke-width="4" stroke-linecap="round"/><circle cx="${i+2}" cy="293" r="3" fill="var(--shoe-trim)" ${W(1.4)}/>`:n==="slippers"?a=`<path d="M${i-14} 292 Q${i-14} 280 ${i} 278 Q${i+16} 280 ${i+18} 294 Q${i+22} 296 ${i+20} 304 H${i-14} Q${i-18} 304 ${i-16} 296 Z" fill="var(--shoe)" ${W(2.8)}/><path d="M${i-6} 286 q6 -4 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`:a=`<ellipse cx="${i+2}" cy="304" rx="16" ry="7" fill="var(--shoe)" ${W(2.6)}/>`;s+=Ov(o,e,a,i)}return`<g data-layer="shoes">${s}</g>`}const Wd=new Set(["cap","beanie","sunhat"]),jv=new Set(["catears","earmuffs"]);function Td(e){return e==="afro"?28:e==="topbun"?20:e==="puffs"||e==="coily"?16:e==="buns"||e==="curlybob"?12:e==="long"||e==="wavy"||e==="wavybob"?8:0}function Is(e,t,n){if(!Wd.has(t)&&!jv.has(t))return n;const s=Td(e);return s?`<g data-hat="${t}" transform="translate(0 ${w(-s)})">${n}</g>`:n}function Fv(e,t,n){let s="";for(let l=0;l<n.length;l++)Wd.has(n[l])&&(s=n[l]);if(!s)return"";const o=Td(t),i=(s==="beanie"?58:s==="cap"?64:62)-o,a=Math.min(70,i),r=t==="afro"||t==="puffs"||t==="coily"?92:78;return`<mask id="${e}hm" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" data-brim="${w(a)}"><rect x="-30" y="-50" width="260" height="420" fill="#fff"/><rect x="${w(100-r)}" y="-50" width="${w(r*2)}" height="${w(a+50)}" fill="#000"/></mask>`}function Pa(e,t,n){return`<g transform="translate(${e} ${t}) scale(${n})"><path d="M0 0 C-8 -14 -30 -14 -28 0 C-30 14 -8 14 0 0 Z" fill="var(--acc)" ${W(2.6)}/><path d="M0 0 C8 -14 30 -14 28 0 C30 14 8 14 0 0 Z" fill="var(--acc)" ${W(2.6)}/><rect x="-6" y="-7" width="12" height="14" rx="4" fill="var(--acc2)" ${W(2.2)}/></g>`}function Vv(e){return`<g data-layer="accessory">${e.acc.map(n=>n==="glasses"?'<circle cx="76" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="124" cy="113" r="18" fill="#fff" opacity=".12"/><circle cx="76" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><circle cx="124" cy="113" r="18" fill="none" stroke="var(--frame)" stroke-width="3.4"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3.2"/><path d="M58 108 L42 104 M142 108 L158 104" stroke="var(--frame)" stroke-width="3.2" stroke-linecap="round"/>':n==="square"?'<rect x="58" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><rect x="108" y="98" width="34" height="28" rx="6" fill="#fff" opacity=".1" stroke="var(--frame)" stroke-width="3.4"/><path d="M92 112 H108" stroke="var(--frame)" stroke-width="3.2"/>':n==="sunnies"?'<path d="M56 104 H94 Q96 122 76 122 Q56 122 56 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M106 104 H144 Q146 122 124 122 Q104 122 106 104 Z" fill="#3a2a40" opacity=".72" stroke="var(--frame)" stroke-width="3"/><path d="M94 110 H106" stroke="var(--frame)" stroke-width="3"/>':n==="bow"?Pa(100,78,.7):n==="bigbow"?Pa(100,70,1.15):n==="headband"?`<path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="${Ss}" stroke-width="12" stroke-linecap="round"/><path d="M40 96 Q42 40 100 34 Q158 40 160 96" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round"/>${Pa(100,32,.85)}`:n==="flower"?`<g transform="translate(138 78)">${[0,60,120,180,240,300].map(s=>`<ellipse cx="0" cy="-8" rx="5" ry="8" fill="var(--acc)" ${W(1.6)} transform="rotate(${s})"/>`).join("")}<circle r="4.5" fill="var(--acc2)" ${W(1.6)}/></g>`:n==="cap"?Is(e.hair,"cap",`<path d="M54 64 Q56 20 100 16 Q144 20 146 64 Q128 54 100 56 Q72 54 54 64 Z" fill="var(--acc)" ${W(3)}/><path d="M48 56 Q100 66 152 56 L156 62 Q100 70 44 62 Z" fill="var(--acc)" ${W(3)}/><circle cx="100" cy="18" r="4.5" fill="#fff" ${W(2)}/>`):n==="beanie"?Is(e.hair,"beanie",`<path d="M50 66 Q48 14 100 8 Q152 14 150 66 Q128 56 100 58 Q72 56 50 66 Z" fill="var(--acc)" ${W(3)}/><path d="M50 58 H150" stroke="var(--acc2)" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="8" r="7" fill="var(--acc2)" ${W(2.4)}/>`):n==="sunhat"?Is(e.hair,"sunhat",`<path d="M66 56 Q68 22 100 18 Q132 22 134 56 Q118 48 100 50 Q82 48 66 56 Z" fill="var(--acc)" ${W(3)}/><path d="M18 56 Q100 68 182 56 Q170 64 100 66 Q30 64 18 56 Z" fill="var(--acc)" ${W(3)}/><path d="M72 46 Q100 38 128 46" fill="none" stroke="var(--acc2)" stroke-width="4"/>`):n==="catears"?Is(e.hair,"catears",`<path d="M58 62 L70 18 L86 60 Z" fill="var(--acc)" ${W(2.6)}/><path d="M114 60 L130 18 L142 62 Z" fill="var(--acc)" ${W(2.6)}/><path d="M64 54 L72 30 L80 52 Z" fill="var(--acc2)"/><path d="M120 52 L128 30 L136 54 Z" fill="var(--acc2)"/>`):n==="earmuffs"?Is(e.hair,"earmuffs",`<path d="M44 68 Q48 26 100 22 Q152 26 156 68" fill="none" stroke="var(--acc)" stroke-width="6"/><circle cx="34" cy="86" r="14" fill="var(--acc)" ${W(2.8)}/><circle cx="166" cy="86" r="14" fill="var(--acc)" ${W(2.8)}/><circle cx="34" cy="86" r="6" fill="var(--acc2)"/><circle cx="166" cy="86" r="6" fill="var(--acc2)"/>`):"").join("")}</g>`}const Gv=[{hip:1.5,head:4,armL:3,armR:-2,legL:0,legR:-3,legLLift:0,legRLift:0},{hip:-2,head:-5,armL:1,armR:-7,legL:4,legR:0,legLLift:2,legRLift:0},{hip:0,head:3,armL:2,armR:-2,legL:0,legR:0,legLLift:0,legRLift:0},{hip:-1.5,head:-4,armL:4,armR:-1,legL:5,legR:0,legLLift:3,legRLift:0}],Yv={puffs:0,afro:0,pony:1,sidepony:1,pigtails:1,halfup:1,braids:2,boxbraids:2,locs:2,sidebraid:2,crown:2,buns:3,topbun:3,lowbun:3};function Rd(e){const t=e.hair||"buns";let n=Yv[t];if(n===void 0){let s=0;for(let o=0;o<t.length;o++)s=(s+t.charCodeAt(o))%4;n=s}return Gv[n]}function Kv(e){const t=(n,s,o,i,a)=>{const r=ar(n,s,o,i,a),l=ar(r.x,r.y,100,238,e.hip);return{x:l.x/2,y:l.y/2}};return{left:t(Vn.l[0],Vn.l[1],Rt.l[0],Rt.l[1],e.armL),right:t(Vn.r[0],Vn.r[1],Rt.r[0],Rt.r[1],e.armR)}}function Xv(e){const t=ar(100,244,100,238,e.hip);return Math.round(t.y/2*10)/10}function Gr(e){const t=parseInt(e.slice(1),16);return(t>>16&255)+(t>>8&255)+(t&255)}function Jv(e){const t=lo(e,.32);return Gr(t)<80?"#5a3a2c":t}function ew(e){return Gr(e)<140?"#3b2340":lo(e,.12)}let gc=0;function tw(){return gc+=1,"a"+gc.toString(36)}function Ks(e,t){return t.hip?`<g transform="rotate(${w(t.hip)} 100 238)">${e}</g>`:e}function Os(e,t){const n=t.head?`<g transform="rotate(${w(t.head)} 100 158)">${e}</g>`:e;return Ks(n,t)}function nw(e,t,n){let s=`<defs><radialGradient id="${e}b"><stop offset="0" style="stop-color:var(--blush)" stop-opacity=".62"/><stop offset=".55" style="stop-color:var(--blush)" stop-opacity=".28"/><stop offset="1" style="stop-color:var(--blush)" stop-opacity="0"/></radialGradient>`;return s+=`<radialGradient id="${e}s"><stop offset="0" stop-color="#3a1d3c" stop-opacity=".3"/><stop offset=".6" stop-color="#3a1d3c" stop-opacity=".12"/><stop offset="1" stop-color="#3a1d3c" stop-opacity="0"/></radialGradient>`,s+=`<radialGradient id="${e}k" cx=".42" cy=".36" r=".75"><stop offset=".55" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".16"/></radialGradient>`,t&&(s+=`<linearGradient id="${e}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f1020" stop-opacity=".62"/><stop offset=".5" stop-color="#1f1020" stop-opacity=".05"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`,s+=`<linearGradient id="${e}c" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="146" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".2"/></linearGradient>`,s+=`<radialGradient id="${e}h" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1f1020" stop-opacity=".28"/></radialGradient>`),s+n+"</defs>"}function fc(e){const t=e==="l"?-1:1,n=Rt[e][0],s=Rt[e][1],o=Vn[e][0],i=Vn[e][1],a=o-t,r=i-7,l=-t;let c=`<path d="${rr([n,s],[a,r],18,13,-3*t)}" fill="var(--skin)" ${W(3)}/>`;return c+=`<path class="hand" d="M${w(o-8)} ${w(i-4)} Q${w(o-8)} ${w(i-10)} ${w(o)} ${w(i-10)} Q${w(o+8)} ${w(i-10)} ${w(o+8)} ${w(i-3)} Q${w(o+8.5)} ${w(i+9)} ${w(o)} ${w(i+9.5)} Q${w(o-8.5)} ${w(i+9)} ${w(o-8)} ${w(i-4)} Z" fill="var(--skin)" ${W(2.8)}/>`,c+=`<ellipse cx="${w(o+7*l)}" cy="${w(i-1)}" rx="3.4" ry="5" fill="var(--skin)" ${W(2.4)} transform="rotate(${-20*l} ${w(o+7*l)} ${w(i-1)})"/>`,c+=`<path d="M${w(o-3*l)} ${w(i+3)} v4 M${w(o+.5*l)} ${w(i+3.5)} v4" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`,c+=`<ellipse cx="${w(o-3*l)}" cy="${w(i-5)}" rx="3" ry="1.8" fill="#fff" opacity=".35"/>`,c}function hc(e){const t=e==="l"?-1:1,n=e==="l"?88:112;let s=`<path d="${rr([n,234],[n+t,294],21,15,1.5*t)}" fill="var(--skin)" ${W(3)}/>`;return s+=`<path d="${rr([n+5*t,244],[n+5*t,290],6,4)}" ${Ue}/>`,s+=`<ellipse cx="${w(n+.5*t)}" cy="268" rx="4.5" ry="2.6" fill="#3a1d3c" opacity=".12"/>`,s+=`<path d="M${n-4} 265 q4 -2.5 8 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`,s}function pc(e,t,n,s,o,i){const a=n?-1:1,r=o==="big"||o==="bright"?1.08:o==="soft"?.94:1,l=(m,h)=>`${w(e+m*r)} ${w(t+h*r)}`,c=13.5*r,d=17*r;let g="";if(i&&o!=="soft"){const m=[.35,.95,1.57,2.2,2.8];for(let h=0;h<m.length;h++){const v=m[h];g+=`<path d="M${w(e+5.5*Math.cos(v)*r)} ${w(t+(4+6.5*Math.sin(v))*r)} L${w(e+11.5*Math.cos(v)*r)} ${w(t+(2+14*Math.sin(v))*r)}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>`}}const f=o==="soft"?2:2.6,p=o==="soft"?"":`<path d="M${l(-16*a,-8)} q${w(-6*a*r)} -2 ${w(-9*a*r)} ${w(-9*r)} M${l(-17*a,-2)} q${w(-6*a*r)} ${w(-.5*r)} ${w(-10*a*r)} ${w(-5*r)} M${l(-12*a,-15)} q${w(-3*a*r)} ${w(-4*r)} ${w(-4*a*r)} ${w(-9*r)}" fill="none" stroke="var(--lash)" stroke-width="2.2" stroke-linecap="round"/>`,u=o==="sparkle"||o==="bright"?`<path d="M${l(-9*a,-8)} l.7 1.6 1.6 .7 -1.6 .7 -.7 1.6 -.7 -1.6 -1.6 -.7 1.6 -.7 Z" fill="#fff" opacity=".9"/>`:"",b=i?`<ellipse cx="${e}" cy="${w(t+r)}" rx="${w(c)}" ry="${w(d)}" fill="url(#${s}i)"/>`:"",M=o==="sleepy"?`<path d="M${l(-17,-4)} Q${e} ${w(t+r)} ${l(17,-4)} L${l(18,-16)} Q${e} ${w(t-20*r)} ${l(-18,-16)} Z" fill="var(--skin)"/>`:"";return`<path d="M${l(-16,-2)} Q${l(-16,-20)} ${l(0,-20)} Q${l(16,-20)} ${l(16,-2)} Q${l(16,19)} ${l(0,19)} Q${l(-16,19)} ${l(-16,-2)} Z" fill="#fff"/><path d="M${l(-15,-4)} Q${e} ${w(t-21*r)} ${l(15,-4)} Q${e} ${w(t-14*r)} ${l(-15,-4)} Z" fill="#3a1d3c" opacity=".12"/><ellipse data-iris="1" cx="${e}" cy="${w(t+r)}" rx="${w(c)}" ry="${w(d)}" fill="var(--eye)"/>${b}${g}<ellipse cx="${e}" cy="${w(t+3*r)}" rx="${w(7*r)}" ry="${w(9*r)}" fill="#1f1020" opacity=".8"/><ellipse cx="${e}" cy="${w(t+r)}" rx="${w(11.3*r)}" ry="${w(14.8*r)}" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/><ellipse cx="${e}" cy="${w(t+r)}" rx="${w(c)}" ry="${w(d)}" fill="none" stroke="#1f1020" stroke-width="2" opacity=".55"/><path d="M${l(-9,12)} Q${e} ${w(t+19.5*r)} ${l(9,12)} Q${e} ${w(t+15.5*r)} ${l(-9,12)} Z" fill="#fff" opacity=".5"/><ellipse cx="${w(e-6*a*r)}" cy="${w(t-6*r)}" rx="${w(5.8*r)}" ry="${w(6.8*r)}" fill="#fff" transform="rotate(${-15*a} ${w(e-6*a*r)} ${w(t-6*r)})"/><circle cx="${w(e+6*a*r)}" cy="${w(t+8*r)}" r="${w(2.8*r)}" fill="#fff"/><circle cx="${w(e-4*a*r)}" cy="${w(t+10*r)}" r="${w(1.3*r)}" fill="#fff" opacity=".85"/><path d="M${l(7*a,-10)} l${w(r)} ${w(2.4*r)} ${w(2.4*r)} ${w(r)} ${w(-2.4*r)} ${w(r)} ${w(-r)} ${w(2.4*r)} ${w(-r)} ${w(-2.4*r)} ${w(-2.4*r)} ${w(-r)} ${w(2.4*r)} ${w(-r)} Z" fill="#fff"/>`+u+M+`<path d="M${l(-17,-1)} Q${l(-16,-21)} ${l(0,-21)} Q${l(16,-21)} ${l(17,-3)} Q${l(14.5,-18.6)} ${l(0,-18.8)} Q${l(-14.5,-18.6)} ${l(-15.5,-1)} Z" fill="var(--lash)" stroke="var(--lash)" stroke-width="${f}" stroke-linejoin="round"/>`+p+`<path d="M${l(-11,-23)} Q${e} ${w(t-27*r)} ${l(11,-23)}" fill="none" stroke="var(--line)" stroke-width="1.3" stroke-linecap="round" opacity=".22"/><path d="M${l(-5,20.5)} Q${e} ${w(t+22*r)} ${l(5,20.5)}" fill="none" stroke="var(--lash)" stroke-width="1.3" stroke-linecap="round" opacity=".28"/>`}function sw(e,t,n){const s=e.blush?`<ellipse cx="64" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><ellipse cx="136" cy="135" rx="16" ry="10" fill="url(#${t}b)"/><path d="M60 133 l3 -3 M66 134 l3 -3 M132 133 l3 -3 M138 134 l3 -3" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>`:"";let o="";if(e.freckles){const i=[[58,132],[64,136],[70,131],[130,131],[136,136],[142,132]];for(let a=0;a<i.length;a++)o+=`<circle cx="${i[a][0]}" cy="${i[a][1]}" r="1.5" fill="var(--freckle)" opacity=".7"/>`}return s+o+'<path data-brow="l" d="M64 86 Q74 80 85 84" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/><path data-brow="r" d="M115 84 Q126 80 136 86" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'+pc(76,112,!1,t,e.eyes,n)+pc(124,112,!0,t,e.eyes,n)+'<path d="M98 131 q2 1.8 4 0" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" opacity=".55"/><ellipse cx="101.5" cy="128.5" rx="1.6" ry="1" fill="#fff" opacity=".6"/><path d="M92 140 Q100 147.5 108 140" fill="none" stroke="var(--line)" stroke-width="2.8" stroke-linecap="round"/><path d="M96 142.6 Q100 145.4 104 142.6 Q100 144 96 142.6 Z" fill="#ff8fa8"/>'}function ow(e){const t="M40 102 Q38 38 100 38 Q162 38 160 102 Q160 140 132 153 Q116 160 100 160 Q84 160 68 153 Q40 140 40 102 Z";return`<ellipse cx="39" cy="114" rx="9" ry="11" fill="var(--skin)" ${W(3)}/><ellipse cx="161" cy="114" rx="9" ry="11" fill="var(--skin)" ${W(3)}/><ellipse cx="40" cy="115" rx="4" ry="6" ${ir}/><ellipse cx="160" cy="115" rx="4" ry="6" ${ir}/><path d="${t}" fill="var(--skin)" ${W(3.2)}/><path d="${t}" fill="url(#${e}k)"/>`}function iw(){return`<path d="M91 146 h18 v22 q-9 5 -18 0 Z" fill="var(--skin)" ${W(3)}/><path d="M91 150 h18 v9 q-9 6 -18 0 Z" ${ir}/><path d="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z" fill="var(--skin)" ${W(3)}/>`}function aw(e,t){const n=Ps(e),s=Rd(n),o=t?.rich!==!1,i=t?.uid??tw(),a=Xv(s),r=n.shoesC,l=r.toLowerCase()==="#ffffff"?n.dress?n.dressC:n.topC:ac(r,.28),c=n.dress?n.dressC:n.topC,d=Gr(c)>700?"#8fdcc0":lo(c,.18),g=["--line:#5a3d5c",`--skin:${n.skin}`,`--hair:${n.hairC}`,`--hair-shade:${Jv(n.hairC)}`,`--brow:${ew(n.hairC)}`,`--eye:${n.eyeC}`,"--lash:#3b2340","--blush:#ff6f91",`--freckle:${lo(n.skin,.35)}`,`--top:${c}`,`--top-trim:${d}`,`--bottom:${n.dress?n.dressC:n.bottomC}`,`--bottom-trim:${lo(n.dress?n.dressC:n.bottomC,.16)}`,`--shoe:${r}`,`--shoe-trim:${l}`,"--sock:#ffffff",`--acc:${n.accC}`,`--acc2:${ac(n.accC,.18)}`,"--frame:#6e4a5e"].join(";"),f=Gn("leg","l",hc("l"),s)+Gn("leg","r",hc("r"),s),p=Gn("arm","l",`<g class="hand">${fc("l")}</g>`,s)+Gn("arm","r",`<g class="hand">${fc("r")}</g>`,s),u=`<g data-layer="body">${f}${Ks(iw()+p,s)}${Os(ow(i),s)}</g>`,b=n.dress?Iv(s,n,i,o,a):Dv(s,n,i,o,a),M=`<g class="shadow"><ellipse cx="100" cy="308" rx="52" ry="9" fill="url(#${i}s)"/><ellipse cx="87" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/><ellipse cx="113" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/></g>`,m=Fv(i,n.hair,n.acc),h=m?` mask="url(#${i}hm)"`:"",v=[`<g data-layer="hair-back">${Os(`<g${h}>${Av(n.hair,i,o)}</g>`,s)}</g>`,u,Nv(s,n),Ks(Zv(s,n,i,o),s),Ks(b,s),Ks(qv(s,n,i,o),s),`<g data-layer="face">${Os(sw(n,i,o),s)}</g>`,`<g data-layer="hair-front">${Os(`<g${h}>${zv(n.hair,i,o)}</g>`,s)}</g>`,Os(Vv(n),s)].join(""),_=n.dress||n.top;return`<svg data-chibi="1" data-hair="${n.hair}" data-top="${_}" viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" style="${g}">${nw(i,o,m)}${M}${v}</svg>`}function Yr(){try{return typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("selector(&)")}catch{return!1}}function So(e,t,n){const s=!!(t&&t.look2);e.classList.toggle("chibi",s);const o=s&&Yr();e.classList.toggle("chibi-move",s&&(o||n)),e.classList.toggle("chibi-bob",s&&!o&&!n)}const it="#5a3d5c",Re=`stroke="${it}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`,rw=["little","kid","adult"],Bo={little:.78,kid:1,adult:1.28},Xs={left:{x:15,y:113},right:{x:85,y:113}};function oa(e){return e.look2?Kv(Rd(e.look2)):Xs}function lw(e,t){return e===1?`<path d="M62 16 L76 8 L76 26 Z M62 16 L50 6 L48 24 Z" fill="#ff7aa8" stroke="${it}" stroke-width="3" stroke-linejoin="round"/><circle cx="62" cy="16" r="5" fill="#ffd166" stroke="${it}" stroke-width="3"/>`:e===2?`<circle cx="40" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${it}" stroke-width="3"/><circle cx="60" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${it}" stroke-width="3"/><path d="M49 48 h2" stroke="${it}" stroke-width="3"/>`:e===3?`<path d="M20 30 Q22 8 50 8 Q78 8 80 30 Z" fill="${t}" stroke="${it}" stroke-width="3.5" stroke-linejoin="round"/><path d="M60 28 Q84 26 92 32 Q80 36 60 34 Z" fill="${t}" stroke="${it}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="9" r="4" fill="#fff" stroke="${it}" stroke-width="3"/>`:""}function uc(e,t,n){return n?e===1?`<path d="M20 40 Q16 86 30 92 L70 92 Q84 86 80 40 Z" fill="${t}" ${Re}/>`:e===2?`<circle cx="18" cy="34" r="12" fill="${t}" ${Re}/><circle cx="82" cy="34" r="12" fill="${t}" ${Re}/>`:e===3?`<circle cx="50" cy="8" r="13" fill="${t}" ${Re}/>`:"":e===3?`<path d="M22 42 Q20 14 50 12 Q80 14 78 42 Q66 26 50 30 Q34 26 22 42 Z" fill="${t}" ${Re}/>`:`<path d="M21 46 Q18 12 50 12 Q82 12 79 46 Q72 30 58 28 Q50 36 36 30 Q26 34 21 46 Z" fill="${t}" ${Re}/>`}function Fe(e){return e.look2?aw(e.look2,{rich:Yr()}):`<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${uc(e.hairStyle,e.hair,!0)}
  <rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${Re}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${e.pants}" ${Re}/>
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${it}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${it}"/>
  <rect class="arm" x="16" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${Re} transform="rotate(12 22 82)"/>
  <rect class="arm" x="72" y="80" width="12" height="34" rx="6" fill="${e.skin}" ${Re} transform="rotate(-12 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${e.shirt}" ${Re}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${e.skin}" ${Re}/>
  <circle cx="50" cy="44" r="30" fill="${e.skin}" ${Re}/>
  ${uc(e.hairStyle,e.hair,!1)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${it}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${it}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${Re} fill="none"/>
  ${lw(e.acc??0,e.shirt)}
  <circle class="hand" cx="${Xs.left.x}" cy="${Xs.left.y}" r="6" fill="${e.skin}" ${Re}/><circle class="hand" cx="${Xs.right.x}" cy="${Xs.right.y}" r="6" fill="${e.skin}" ${Re}/>
</svg>`}const cw=[{id:"hair",name:"Hair"},{id:"face",name:"Face"},{id:"clothes",name:"Clothes"},{id:"shoes",name:"Shoes"},{id:"extras",name:"Extras"}],dw={short:"Short",pixie:"Pixie",coily:"Coily",afro:"Afro",bangs:"Bangs",bob:"Bob",wavybob:"Wavy bob",curlybob:"Curly bob",sidebangs:"Side bangs",long:"Long",wavy:"Wavy",braids:"Braids",boxbraids:"Box braids",locs:"Locs",sidebraid:"Side braid",crown:"Crown",pony:"Ponytail",sidepony:"Side pony",pigtails:"Pigtails",halfup:"Half-up",buns:"Buns",puffs:"Puffs",topbun:"Top bun",lowbun:"Low bun"},gw={classic:"Tee",stripes:"Stripes",hoodie:"Hoodie",sweater:"Sweater",tank:"Tank",puff:"Puff",ruffle:"Ruffle",button:"Buttons",jersey:"Jersey",cardigan:"Cardigan",bib:"Bib",raincoat:"Raincoat"},fw={pants:"Pants",jeans:"Jeans",shorts:"Shorts",skirt:"Skirt",tutu:"Tutu",leggings:"Leggings",overalls:"Overalls",joggers:"Joggers"},hw={"":"No dress",twirl:"Twirl",sundress:"Sundress",party:"Party",pinafore:"Pinafore",jumper:"Jumper",ballet:"Ballet",nightgown:"Nightgown",raindress:"Rain"},pw={classic:"Classic",sneakers:"Sneakers",lightup:"Light-up",boots:"Boots",rainboots:"Rain boots",sandals:"Sandals",maryjanes:"Mary Janes",slippers:"Slippers"},uw={round:"Round",big:"Big",sleepy:"Sleepy",sparkle:"Sparkle",soft:"Soft",bright:"Bright"},mw={glasses:"Glasses",square:"Square",sunnies:"Sunnies",bow:"Bow",bigbow:"Big bow",headband:"Headband",flower:"Flower",cap:"Cap",beanie:"Beanie",sunhat:"Sun hat",catears:"Cat ears",earmuffs:"Earmuffs"},yw={little:"Little",kid:"Kid",adult:"Grown-up"};let ms="hair";function It(e,t,n,s){return`<button type="button" class="avOpt${s?" on":""}" data-act="${e}" data-v="${t}">${n}</button>`}function ii(e,t,n){return`<button type="button" class="avSw${n?" on":""}" style="background:${t}" data-act="${e}" data-v="${t}" aria-label="Color"></button>`}function In(e){return`<div class="avGrid">${e}</div>`}function Ns(e,t){return`<div class="avColors">${lt.map(n=>ii(e,n,n===t)).join("")}</div>`}function kw(e,t,n,s){const o=Ps(e.look2),i=e.id==="__me",a=ms==="hair"?`<h3>Style</h3>${In(Ii.map(c=>It("av-hair",c,dw[c],o.hair===c)).join(""))}<h3>Color</h3><div class="avColors">${qi.map(c=>ii("av-hairC",c,o.hairC===c)).join("")}</div>`:ms==="face"?`<h3>Skin</h3><div class="avColors">${Zi.map(c=>ii("av-skin",c,o.skin===c)).join("")}</div><h3>Eyes</h3>${In(Vi.map(c=>It("av-eyes",c,uw[c],o.eyes===c)).join(""))}<h3>Eye color</h3><div class="avColors">${Pr.map(c=>ii("av-eyeC",c,o.eyeC===c)).join("")}</div><div class="avToggles">${It("av-freckles",o.freckles?"0":"1","Freckles",o.freckles)}${It("av-blush",o.blush?"0":"1","Blush",o.blush)}</div>`:ms==="clothes"?`<h3>Top</h3>${In(Oi.map(c=>It("av-top",c,gw[c],!o.dress&&o.top===c)).join(""))}${Ns("av-topC",o.topC)}<h3>Bottom</h3>${In(Ni.map(c=>It("av-bottom",c,fw[c],!o.dress&&o.bottom===c)).join(""))}${Ns("av-bottomC",o.bottomC)}<h3>Dress</h3>${In(ji.map(c=>It("av-dress",c,hw[c],o.dress===c)).join(""))}${Ns("av-dressC",o.dressC)}`:ms==="shoes"?`<h3>Shoes</h3>${In(Fi.map(c=>It("av-shoes",c,pw[c],o.shoes===c)).join(""))}${Ns("av-shoesC",o.shoesC)}`:`<h3>Extras</h3><p class="avHint">Pick up to two</p>${In(vs.map(c=>It("av-acc",c,mw[c],o.acc.indexOf(c)>=0)).join(""))}${Ns("av-accC",o.accC)}`,r=rw.map(c=>`<button type="button" class="avOpt sz${c===e.size?" on":""}" data-act="size" data-v="${c}">${yw[c]}</button>`).join(""),l=i?'<div class="meNote">This is you!</div>':`<button type="button" class="del${n?" sure":""}" data-act="delc">${s}<span>${n?"Tap again":""}</span></button>`;return`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${t}<div class="dress avLook"><div class="avStageWrap"><div class="avStage chibi-move">${Fe(e)}</div>${l}<div class="avSizes">${r}</div></div><div class="avSide"><div class="avTabs">${cw.map(c=>`<button type="button" class="avTab${c.id===ms?" on":""}" data-act="av-tab" data-v="${c.id}">${c.name}</button>`).join("")}</div><div class="avPane">${a}</div><div class="avBar"><button type="button" class="avSurprise" data-act="av-surprise">🎲 Surprise me</button><button type="button" class="avDone" data-act="close">Done</button></div></div></div>`}function bw(e,t,n){if(t==="av-tab")return(n==="hair"||n==="face"||n==="clothes"||n==="shoes"||n==="extras")&&(ms=n),null;const s=Ps(e);if(t==="av-hair"&&Ii.indexOf(n)>=0)return{...s,hair:n};if(t==="av-hairC")return{...s,hairC:n};if(t==="av-skin")return{...s,skin:n};if(t==="av-eyes"&&Vi.indexOf(n)>=0)return{...s,eyes:n};if(t==="av-eyeC")return{...s,eyeC:n};if(t==="av-freckles")return{...s,freckles:n==="1"};if(t==="av-blush")return{...s,blush:n==="1"};if(t==="av-top"&&Oi.indexOf(n)>=0)return{...s,top:n,dress:""};if(t==="av-topC")return{...s,topC:n};if(t==="av-bottom"&&Ni.indexOf(n)>=0)return{...s,bottom:n,dress:""};if(t==="av-bottomC")return{...s,bottomC:n};if(t==="av-dress"&&ji.indexOf(n)>=0)return{...s,dress:n};if(t==="av-dressC")return{...s,dressC:n};if(t==="av-shoes"&&Fi.indexOf(n)>=0)return{...s,shoes:n};if(t==="av-shoesC")return{...s,shoesC:n};if(t==="av-accC")return{...s,accC:n};if(t==="av-acc"&&vs.indexOf(n)>=0){const o=n,i=s.acc.slice(),a=i.indexOf(o);if(a>=0)i.splice(a,1);else{const r=mi(o),l=i.filter(c=>mi(c)!==r);return l.push(o),{...s,acc:l.slice(0,2)}}return{...s,acc:i}}return null}function vw(){try{return typeof navigator<"u"&&navigator.webdriver&&!window.__forceAvatarIntro?!1:localStorage.getItem(vt("avatar-intro"))!=="1"}catch{return!1}}function ww(){try{localStorage.setItem(vt("avatar-intro"),"1")}catch{}}const ai="#5a3d5c";function Wa(e,t,n,s,o){return`<path class="${e}" d="${t}" fill="none" stroke="${ai}" stroke-width="${s}" stroke-linecap="round"/><path class="${e} cloth" d="${t}" fill="none" stroke="${n}" stroke-width="${o}" stroke-linecap="round"/>`}function $w(e){const t=Ps(e),n=t.skin,s=t.dress!=="",o=s||t.bottom==="skirt"||t.bottom==="tutu",i=o?n:t.bottomC,a=t.shoesC,r=s||t.bottom==="skirt"||t.bottom==="tutu";let l="";if(r){const f=s?t.dressC:t.bottomC;l+=`<path class="dress" d="M75 46 L89 46 L91 53 L73 53 Z" fill="${f}" stroke="${ai}" stroke-width="1.1" stroke-linejoin="round"/>`}l+=Wa("thigh","M76 44 Q83 48 88 54",i,6.2,4.8),l+=`<circle class="knee" cx="88" cy="56" r="2.3" fill="${i}" stroke="${ai}" stroke-width="1.1"/>`;const c=t.shoes==="boots"||t.shoes==="rainboots";l+=Wa("shin",c?"M88 58 Q90 64 91 68":"M88 58 Q90 65 91 70",o?n:i,5.8,4.4),!c&&(t.shoes==="sneakers"||t.shoes==="maryjanes"||t.shoes==="lightup")&&(l+=Wa("shin","M90 66 Q90.6 68 91 70","#ffffff",5.4,4));const d=t.shoes==="sandals"?n:a,g=c?66:69;return l+=`<path class="shoe" d="M90 ${g} Q90 ${g-2} 94 ${g-2} Q99 ${g-2} 100 ${g+1} Q100 ${g+5} 95 ${g+5} Q90 ${g+5} 90 ${g+2} Z" fill="${d}" stroke="${ai}" stroke-width="1.1" stroke-linejoin="round"/>`,t.shoes==="sandals"&&(l+=`<path d="M90 ${g+5} L100 ${g+5}" stroke="${a}" stroke-width="1.3" stroke-linecap="round"/>`,l+=`<path d="M93 ${g} L97 ${g+3}" stroke="${a}" stroke-width="1.1" stroke-linecap="round"/>`),`<svg class="rideleg" viewBox="0 0 160 130">${l}</svg>`}let Ot=null,Ud=!0;const xw=e=>{Ud=e};function ee(e,t,n="sine",s=0,o=.15){if(Ud)try{Ot??=new(window.AudioContext||window.webkitAudioContext),Ot.state==="suspended"&&Ot.resume().catch(()=>{});const i=Ot.createOscillator(),a=Ot.createGain(),r=Ot.currentTime,l=Math.max(40,e*(.94+Math.random()*.12));i.type=n,i.frequency.setValueAtTime(l,r),s&&i.frequency.exponentialRampToValueAtTime(Math.max(40,l*s),r+t);const c=Math.min(.02,Math.max(.008,t*.22));if(a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(Math.max(2e-4,o),r+c),a.gain.exponentialRampToValueAtTime(.001,r+Math.max(t,c+.02)),n==="square"||n==="sawtooth"){const d=Ot.createBiquadFilter();d.type="lowpass",d.frequency.setValueAtTime(1400,r),d.Q.setValueAtTime(.7,r),i.connect(d).connect(a).connect(Ot.destination)}else i.connect(a).connect(Ot.destination);i.start(r),i.stop(r+t+.02)}catch{}}const B={pick:()=>ee(520,.12,"sine",1.6),drop:()=>{ee(380,.1,"triangle",.7),setTimeout(()=>ee(620,.08,"sine"),60)},pop:()=>ee(800,.15,"square",.3,.08),click:()=>ee(660,.07,"triangle"),swish:()=>ee(300,.25,"sine",2.5,.1),meow:()=>{ee(700,.12,"triangle",1.3,.1),setTimeout(()=>ee(900,.22,"triangle",.6,.1),110)},purr:()=>[0,90,180,270,360].forEach(e=>setTimeout(()=>ee(70,.09,"sawtooth",1,.05),e)),woof:()=>{ee(260,.09,"square",.6,.09),setTimeout(()=>ee(220,.12,"square",.5,.09),130)},spin:()=>ee(400,.35,"sine",2.2,.08),boing:()=>ee(200,.3,"sine",3,.1),splash:()=>[0,50,110].forEach((e,t)=>setTimeout(()=>ee(900-t*200,.12,"triangle",.4,.06),e)),moo:()=>{ee(160,.5,"sawtooth",.8,.07),setTimeout(()=>ee(140,.45,"sawtooth",.85,.06),380)},baa:()=>[0,90,180].forEach(e=>setTimeout(()=>ee(420,.1,"sawtooth",.95,.05),e)),bleat:()=>[0,70,140,210].forEach(e=>setTimeout(()=>ee(520,.07,"square",1.05,.04),e)),oink:()=>{ee(300,.12,"square",.6,.07),setTimeout(()=>ee(330,.12,"square",.55,.07),160)},peep:()=>[0,120,240].forEach((e,t)=>setTimeout(()=>ee(1800+t*150,.07,"sine",1.2,.08),e)),squeak:()=>ee(1400,.1,"sine",1.5,.08),neigh:()=>{ee(700,.5,"sawtooth",.6,.05),[0,60,120,180,240].forEach(e=>setTimeout(()=>ee(620-e,.06,"triangle",1,.04),300+e))},honk:()=>{ee(330,.18,"square",1,.07),setTimeout(()=>ee(330,.25,"square",1,.07),230)},munch:()=>[0,110,220,330].forEach(e=>setTimeout(()=>ee(180+Math.random()*60,.05,"square",.6,.05),e)),cluck:()=>[0,100,180].forEach((e,t)=>setTimeout(()=>ee(600+t*80,.06,"square",.8,.05),e)),plant:()=>{ee(260,.1,"triangle",.6),setTimeout(()=>ee(520,.1,"sine"),90)},water:()=>[0,60,120,180,240].forEach((e,t)=>setTimeout(()=>ee(1200-t*120,.08,"sine",.7,.05),e)),pickup:()=>[660,880,990].forEach((e,t)=>setTimeout(()=>ee(e,.1,"triangle"),t*60)),sparkle:()=>[880,1100,1320].forEach((e,t)=>setTimeout(()=>ee(e,.12),t*70))},_w=/rug|lamp|light|plant|curtain|clock|window|lantern/;function Mw(e){if(e.cat==="plants")return!0;const t=`${e.name} ${e.kind??""}`.toLowerCase();return _w.test(t)}const Ed=new Set(["pack:ring-light","pack:desk-lamp"]);function Qd(e){const t=e.rooms??[];return t.includes("backyard")&&!t.includes("any")}function Lw(e,t){if(t==="nursery"&&e.kind&&Ed.has(e.kind))return!1;if(t==="backyard")return Qd(e);if(t==="all"||!t)return!0;const n=e.rooms;return!n||n.length===0||n.includes(t)?!0:n.includes("any")?e.cat==="decor"||e.cat==="furniture"?Mw(e):!0:!1}function Cw(e,t,n,s,o){return e.secret&&!(o&&o.has(e.secret))||!s&&n==="backyard"&&!Qd(e)||n==="nursery"&&e.kind&&Ed.has(e.kind)?!1:t.startsWith("pack:")?e.pack===t.slice(5):e.cat!==t?!1:Lw(e,s?"all":n)}function Sw(e){const t=e.scale;let n=0;e.overflowR>1&&e.overflowL>1?n=-e.overflowL:e.overflowR>1?n=e.overflowR:e.overflowL>1&&(n=-e.overflowL);const s=e.cam+n/t,o=Math.max(0,Math.min(e.maxCam,s)),i=s-o,a=e.nudgeX&&Math.abs(i)>.5?e.kidX-i:e.kidX;return{cam:o,kidX:a}}function Bw(e){const t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[1][0]).toUpperCase():"?"}function Hw(e,t=3){const n=[...e].sort((r,l)=>r.x-l.x||r.id.localeCompare(l.id)),s=[],o=[],i=(r,l,c)=>s.some(d=>d.lane===c&&Math.abs(d.x-r)<(d.w+l)/2+8),a=[];for(const r of n){let l=-1;for(let c=0;c<t;c++)if(!i(r.x,r.w,c)){l=c;break}l<0?a.push(r):(s.push({x:r.x,w:r.w,lane:l}),o.push({id:r.id,lane:l,initials:!1}))}for(const r of a){const l=Math.min(r.w,44);let c=0;for(let d=0;d<t;d++)if(!i(r.x,l,d)){c=d;break}s.push({x:r.x,w:l,lane:c}),o.push({id:r.id,lane:c,initials:!0})}return o}let Pw=0;function Ad(e=document){const t=[...e.querySelectorAll(".nametag")].filter(o=>{const i=o.getBoundingClientRect();return i.width>2&&i.height>2});if(!t.length)return;const n=t.map(o=>{o.dataset.tagId||(o.dataset.tagId="tg"+(++Pw).toString(36)),o.dataset.full||(o.dataset.full=(o.textContent||"").trim()),o.classList.contains("is-initials")||(o.dataset.fullW=String(o.getBoundingClientRect().width));const i=o.getBoundingClientRect(),a=Number(o.dataset.fullW)||i.width;return{id:o.dataset.tagId,x:i.left+i.width/2,w:a}}),s=new Map(Hw(n).map(o=>[o.id,o]));for(const o of t){const i=s.get(o.dataset.tagId||"");if(!i)continue;const a=o.dataset.full||"",r=i.initials?Bw(a):a;o.textContent!==r&&(o.textContent=r),o.classList.toggle("is-initials",i.initials),o.style.setProperty("--tag-lane",String(i.lane))}}function ia(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function Ww(e){!e||ia()||(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),window.setTimeout(()=>e.classList.remove("wiggle"),480))}function Tw(){document.addEventListener("pointerup",e=>{if(ia())return;const t=e.target?.closest("button");t&&(t.classList.remove("spring"),t.offsetWidth,t.classList.add("spring"))},!0)}const zd="#5a3d5c",Ye=`stroke="${zd}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`,Rw={living:"#ff8fab",bedroom:"#c9a0dc",kitchen:"#8fd6a6",salon:"#f0a0d8",nursery:"#9ad7f5",backyard:"#80ed99"};function Uw(e){const t=Rw[e]??"#ffb3c6";return`<div class="sceneWin builtin-window" aria-hidden="true"><svg viewBox="0 0 160 180">
    <path d="M18 20 H142 V150 H18 Z" fill="#fff6ea" ${Ye}/>
    <path d="M28 30 H132 V118 H28 Z" fill="#b9e3ff" ${Ye}/>
    <path d="M80 30 V118 M28 74 H132" ${Ye} stroke-width="3"/>
    <circle cx="48" cy="52" r="10" fill="#fff" opacity=".85"/>
    <ellipse cx="108" cy="48" rx="16" ry="8" fill="#fff" opacity=".8"/>
    <path d="M40 118 Q58 96 70 118 Q90 100 112 118" fill="#7dce8a" stroke="${zd}" stroke-width="3"/>
    <rect x="96" y="86" width="8" height="32" rx="3" fill="#6b4a32" ${Ye} stroke-width="2"/>
    <circle cx="100" cy="80" r="12" fill="#5cc985" ${Ye} stroke-width="2"/>
    <path d="M8 16 Q6 80 16 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <path d="M152 16 Q154 80 144 154" fill="none" stroke="${t}" stroke-width="16" stroke-linecap="round"/>
    <rect x="46" y="146" width="68" height="12" rx="4" fill="#ffe7c2" ${Ye}/>
  </svg></div>`}function Ew(){return`<div class="sceneRug" aria-hidden="true"><svg viewBox="0 0 200 80">
    <ellipse cx="100" cy="48" rx="92" ry="24" fill="#ffc8dd" ${Ye}/>
    <ellipse cx="100" cy="48" rx="64" ry="15" fill="#bde0fe" ${Ye} stroke-width="3"/>
    <ellipse cx="100" cy="48" rx="28" ry="7" fill="#fff6ea"/>
  </svg></div>
  <div class="sceneLamp" aria-hidden="true"><svg viewBox="0 0 80 160">
    <path d="M18 52 L30 8 H50 L62 52 Z" fill="#ffd166" ${Ye}/>
    <rect x="36" y="52" width="8" height="78" rx="4" fill="#c9a0dc" ${Ye}/>
    <ellipse cx="40" cy="136" rx="26" ry="8" fill="#b388d6" ${Ye}/>
    <circle cx="34" cy="28" r="4" fill="#fff" opacity=".8"/>
  </svg></div>
  <div class="scenePlant" aria-hidden="true"><svg viewBox="0 0 90 140">
    <path d="M45 128 C45 90 18 78 20 48 C40 58 44 80 45 128" fill="#5cc985" ${Ye}/>
    <path d="M45 128 C45 92 74 70 78 40 C58 54 50 82 45 128" fill="#80ed99" ${Ye}/>
    <path d="M45 128 C40 96 28 88 22 70" fill="none" stroke="#3d9a62" stroke-width="3"/>
    <path d="M30 132 H62 L56 118 H36 Z" fill="#e07a5f" ${Ye}/>
    <ellipse cx="46" cy="126" rx="16" ry="5" fill="#c4634a"/>
  </svg></div>`}function Qw(e,t){return t==="backyard"?[]:[{id:e("rug"),kind:"rug",x:1152,y:540,flip:!1,z:0,scale:1},{id:e("lamp"),kind:"lamp",x:804,y:470,flip:!1,z:0,scale:1},{id:e("plant"),kind:"plant",x:1584,y:480,flip:!1,z:0,scale:1}]}let Nn="",Dd=null;function Aw(e){Dd=e,Nn=""}function zw(e,t,n){const s=Dd?.(t,n);if(s!=null){const r="custom|"+t;if(r===Nn&&e.childElementCount)return;Nn=r,e.innerHTML=s,e.dataset.room=t;return}if(t==="backyard"){const r="yard|"+t;if(r===Nn&&e.childElementCount)return;Nn=r,e.innerHTML="",e.dataset.room=t;return}const o=n.length===0,i=n.some(r=>/window|curtain/i.test(r.kind)),a=t+(o?"|e":"")+(i?"|w":"");a===Nn&&e.childElementCount||(Nn=a,e.innerHTML=(i?"":Uw(t))+(o?Ew():""),e.dataset.room=t)}const pe="#5a3d5c",L=(e=4)=>`stroke="${pe}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`,Ho=600,Mt=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#b197fc"],Tt=(e,t,n=3)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${pe}"/><circle cx="${e+1}" cy="${t-1}" r="${n/3}" fill="#fff"/>`,Kn=(e,t)=>`<ellipse cx="${e}" cy="${t}" rx="5" ry="3" fill="#ff9bb5" opacity=".75"/>`,Dw=(e,t,n,s)=>Mt.map((o,i)=>`<path d="M${e-n+i*s} ${t} A${n-i*s} ${n-i*s} 0 0 1 ${e+n-i*s} ${t}" fill="none" stroke="${o}" stroke-width="${s}"/>`).join(""),Zw=(e,t,n=1,s="#5cc985")=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-12" y="-10" width="24" height="70" rx="8" fill="#c99366" ${L()}/>
  <circle cx="0" cy="-60" r="58" fill="${s}" ${L()}/><circle cx="-30" cy="-40" r="34" fill="${s}" ${L()}/><circle cx="32" cy="-38" r="36" fill="${s}" ${L()}/></g>`,Yt=(e,t,n=1)=>`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-46" y="-50" width="92" height="50" rx="14" fill="#f5d27a" ${L()}/>
  <path d="M-30 -42 V-8 M0 -44 V-6 M30 -42 V-8" stroke="#d9a93f" stroke-width="4" stroke-linecap="round"/><path d="M-46 -26 H46" stroke="#c98a2e" stroke-width="5"/></g>`,qw=(e,t,n)=>{const s=Array.from({length:Math.floor((t-e)/70)+1},(o,i)=>`<rect x="${e+i*70-7}" y="${n-58}" width="14" height="64" rx="5" fill="#fff6e6" ${L(3)}/>`).join("");return`<rect x="${e}" y="${n-46}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${L(3)}/><rect x="${e}" y="${n-22}" width="${t-e}" height="11" rx="5" fill="#fff6e6" ${L(3)}/>${s}`};function Iw(){const e=Mo;return`<svg class="parkScene ranchScene" viewBox="0 0 ${e} ${Ho}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="rcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7e8ff"/><stop offset="1" stop-color="#fff4fb"/></linearGradient></defs>
  <rect width="${e}" height="440" fill="url(#rcSky)"/>
  <g opacity=".55">${Dw(1900,430,620,26)}</g>
  ${[160,820,1500,2300,3e3].map((t,n)=>`<g transform="translate(${t} ${70+n%2*34})"><ellipse cx="0" cy="0" rx="70" ry="24" fill="#fff"/><ellipse cx="40" cy="-14" rx="40" ry="22" fill="#fff"/><ellipse cx="-36" cy="-8" rx="30" ry="18" fill="#fff"/></g>`).join("")}
  <g transform="translate(${e-200} 92)"><circle r="48" fill="#ffe066" ${L()}/>${Tt(-15,-6,4)}${Tt(13,-6,4)}<path d="M-14 12 Q0 24 14 12" fill="none" ${L(3)}/>${Kn(-26,8)}${Kn(26,8)}</g>
  <path d="M-50 370 Q600 230 1300 350 T2600 330 T${e+100} 360 V460 H-50 Z" fill="#b6f0c8"/>
  <rect x="0" y="410" width="${e}" height="190" fill="#a6e3a0"/><path d="M0 410 H${e}" ${L()}/>
  <path d="M0 566 Q900 530 1800 570 T${e} 552 V600 H0 Z" fill="#f2dcb8" opacity=".9"/>
  ${Zw(3560,400,.8,"#4fbf7a")}
  <!-- entrance gate with a rainbow arch -->
  <g class="ranchSign"><g class="ranchSignArt"><rect x="40" y="290" width="24" height="210" rx="6" fill="#c99366" ${L()}/><rect x="196" y="290" width="24" height="210" rx="6" fill="#c99366" ${L()}/>
    <path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${pe}" stroke-width="44" stroke-linecap="round"/>
    ${Mt.map((t,n)=>`<path d="M18 312 A112 100 0 0 1 242 312" fill="none" stroke="${t}" stroke-width="${36-n*6}" stroke-linecap="round"/>`).join("")}
    <rect x="22" y="250" width="216" height="40" rx="14" fill="#fff6e6" ${L(3)}/><text x="130" y="277" text-anchor="middle" font-size="19" font-weight="900" fill="${pe}" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  <!-- red barn with rainbow trim and banner -->
  <g transform="translate(270 0)">
    <path d="M0 470 V250 L60 180 H270 L330 250 V470 Z" fill="#ef5b5b" ${L(5)}/>
    <path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${pe}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    ${Mt.map((t,n)=>`<path d="M-10 254 L60 172 H270 L340 254" fill="none" stroke="${t}" stroke-width="3" transform="translate(0 ${-7+n*2.8})" stroke-linejoin="round"/>`).join("")}
    <rect x="115" y="215" width="100" height="56" rx="10" fill="#fff6e6" ${L(4)}/><path d="M115 215 L215 271 M215 215 L115 271" stroke="#ef5b5b" stroke-width="6"/>
    <rect x="95" y="330" width="140" height="140" rx="8" fill="#fff6e6" ${L(4)}/><rect x="108" y="342" width="56" height="128" fill="#d94848" ${L(3)}/><rect x="166" y="342" width="56" height="128" fill="#d94848" ${L(3)}/>
    <path d="M108 342 L164 470 M164 342 L108 470 M166 342 L222 470 M222 342 L166 470" stroke="#fff6e6" stroke-width="6"/>
    <g class="barnBanner" transform="translate(165 300)"><g class="ranchSignArt">${Mt.map((t,n)=>`<rect x="${-120+n*40}" y="-16" width="40" height="30" fill="${t}"/>`).join("")}<rect x="-120" y="-16" width="240" height="30" fill="none" ${L(3)}/>
      <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" stroke="${pe}" stroke-width="4" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g></g>
  </g>
  ${Yt(640,560,.8)}${Yt(1950,470,.7)}${Yt(1880,470,.55)}${Yt(3115,470,.7)}${Yt(3115,425,.55)}
  <!-- the petting zoo moved into the barn: a sign by the barn door, sunflowers where the pen was -->
  ${Array.from({length:6},(t,n)=>{const s=1030+n*66,o=70+n%3*18;return`<g transform="translate(${s} 470)"><path d="M0 0 V-${o}" stroke="#40c057" stroke-width="6" stroke-linecap="round"/><ellipse cx="${n%2?9:-9}" cy="-${o/2}" rx="11" ry="5" fill="#69db7c" ${L(2.5)}/>${[0,45,90,135,180,225,270,315].map(i=>`<ellipse cx="${Math.cos(i*Math.PI/180)*14}" cy="${-o+Math.sin(i*Math.PI/180)*14}" rx="8" ry="5" transform="rotate(${i} ${Math.cos(i*Math.PI/180)*14} ${-o+Math.sin(i*Math.PI/180)*14})" fill="#ffd43b" ${L(2)}/>`).join("")}<circle cy="-${o}" r="10" fill="#a0522d" ${L(2.5)}/></g>`}).join("")}
  <!-- pond -->
  <ellipse cx="${Ie.x}" cy="${Ie.y}" rx="${Ie.rx}" ry="${Ie.ry}" fill="#8ecae6" ${L()}/><ellipse cx="${Ie.x-15}" cy="${Ie.y-6}" rx="70" ry="16" fill="#bde6f7"/>
  <!-- paddock fence + HORSES sign are their own depth layer (paddockFenceSVG) -->
  <!-- garden -->
  <rect x="3140" y="520" width="420" height="70" rx="20" fill="#b07d54" ${L()}/>
  <rect x="3260" y="430" width="160" height="40" rx="12" fill="#fff6e6" ${L(3)}/><text x="3340" y="458" text-anchor="middle" font-size="21" font-weight="900" fill="${pe}" font-family="Nunito, system-ui, sans-serif">GARDEN</text>
  <path d="M3340 470 V500" ${L(5)}/>
  </svg>`}function Ow(){return`<svg class="fenceLayer" viewBox="0 0 ${Mo} ${Ho}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  ${qw(2400,3080,470)}
  <rect x="2640" y="380" width="180" height="40" rx="12" fill="#fff6e6" ${L(3)}/><text x="2730" y="408" text-anchor="middle" font-size="21" font-weight="900" fill="${pe}" font-family="Nunito, system-ui, sans-serif">HORSES</text>
  </svg>`}const Zd=[{name:"Goat",say:"Meh-eh-eh!",snd:"bleat"},{name:"Sheep",say:"Baa!",snd:"baa"},{name:"Piglet",say:"Oink oink!",snd:"oink"},{name:"Chicks",say:"Peep peep!",snd:"peep"},{name:"Bunny",say:"*wiggle wiggle*",snd:"squeak"},{name:"Cow",say:"Moooo!",snd:"moo"}],Fo=(e,t,n,s=94)=>e.map((o,i)=>`<rect class="leg ${i%2?"b":"a"}" x="${o}" y="${t}" width="9" height="${s-t}" rx="4" fill="${n}" ${L(3)}/>`).join("");function gr(e){switch(e){case 0:return`<svg viewBox="0 0 120 100">${Fo([32,44,70,82],60,"#efe6dc")}<path class="tail" d="M24 50 l-8 -10" ${L(5)}/>
      <ellipse cx="58" cy="56" rx="34" ry="17" fill="#f4ede5" ${L()}/><g class="head"><path d="M86 30 l-6 -16 l10 10 Z M96 30 l2 -17 l5 13 Z" fill="#c9b8a8" ${L(3)}/>
      <ellipse cx="94" cy="40" rx="14" ry="16" fill="#f4ede5" ${L()}/><ellipse class="ear" cx="80" cy="36" rx="9" ry="4" fill="#e8d6c4" ${L(3)}/>${Tt(98,36)}<path d="M98 56 q2 8 6 0" fill="#e8d6c4" ${L(3)}/>${Kn(102,46)}<circle cx="106" cy="44" r="2" fill="${pe}"/></g></svg>`;case 1:return`<svg viewBox="0 0 120 100">${Fo([36,48,70,80],62,"#5a4a5c")}
      ${[[40,50],[56,44],[72,48],[86,56],[70,64],[48,64],[34,60]].map(([t,n])=>`<circle cx="${t}" cy="${n}" r="15" fill="#fff" ${L(3)}/>`).join("")}<ellipse cx="60" cy="55" rx="30" ry="14" fill="#fff"/>
      <g class="head"><ellipse cx="96" cy="46" rx="13" ry="15" fill="#6b5a6e" ${L()}/><circle cx="92" cy="32" r="8" fill="#fff" ${L(3)}/><ellipse class="ear" cx="82" cy="44" rx="8" ry="4" fill="#6b5a6e" ${L(3)}/>
      <circle cx="99" cy="42" r="3.2" fill="#fff"/><circle cx="99.5" cy="42" r="1.8" fill="${pe}"/>${Kn(102,52)}</g></svg>`;case 2:return`<svg viewBox="0 0 120 100">${Fo([38,50,66,78],66,"#ffadc6")}<path class="tail" d="M28 54 q-10 -4 -6 -12 q6 0 2 8" fill="none" ${L(3)}/>
      <ellipse cx="58" cy="60" rx="32" ry="20" fill="#ffc2d4" ${L()}/><g class="head"><circle cx="90" cy="52" r="16" fill="#ffc2d4" ${L()}/><path d="M80 38 l2 -12 l9 8 Z" fill="#ffadc6" ${L(3)}/>
      <ellipse cx="104" cy="56" rx="7" ry="8" fill="#ff9bb8" ${L(3)}/><circle cx="102" cy="54" r="1.6" fill="${pe}"/><circle cx="106" cy="57" r="1.6" fill="${pe}"/>${Tt(92,46)}${Kn(90,60)}</g></svg>`;case 3:return`<svg viewBox="0 0 120 100">${[[30,72,1],[62,66,1.15],[92,74,.95]].map(([t,n,s])=>`<g transform="translate(${t} ${n}) scale(${s})"><path d="M-4 16 v8 M4 16 v8" stroke="#ff9f43" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="4" r="14" fill="#ffe066" ${L(3)}/><path d="M-8 2 q-6 4 0 8" fill="#ffd43b" ${L(2)}/><g class="head"><circle cx="5" cy="-8" r="9" fill="#ffe066" ${L(3)}/><path d="M13 -9 l7 2 l-7 3 Z" fill="#ff9f43" ${L(2)}/>${Tt(7,-10,2.2)}</g></g>`).join("")}</svg>`;case 4:return`<svg viewBox="0 0 120 100"><circle class="tail" cx="30" cy="68" r="8" fill="#fff" ${L(3)}/><ellipse cx="56" cy="72" rx="28" ry="20" fill="#f6eef9" ${L()}/><ellipse cx="74" cy="90" rx="12" ry="5" fill="#f6eef9" ${L(3)}/>
      <g class="head"><ellipse class="ear" cx="78" cy="26" rx="7" ry="20" fill="#f6eef9" ${L(3)} transform="rotate(-12 78 26)"/><ellipse cx="78" cy="26" rx="3" ry="13" fill="#ffc2d4" transform="rotate(-12 78 26)"/>
      <ellipse cx="90" cy="28" rx="7" ry="20" fill="#f6eef9" ${L(3)} transform="rotate(10 90 28)"/><circle cx="86" cy="56" r="17" fill="#f6eef9" ${L()}/>${Tt(92,52)}<circle cx="102" cy="58" r="2.5" fill="#ff8fab"/>${Kn(90,63)}</g></svg>`;default:return`<svg viewBox="0 0 120 100">${Fo([30,42,72,84],62,"#fff")}<path class="tail" d="M20 50 q-6 14 0 26" fill="none" ${L(3)}/>
      <rect x="18" y="38" width="80" height="34" rx="16" fill="#fff" ${L()}/><path d="M30 40 q10 8 4 20 q-10 -2 -10 -14 Z M60 42 q14 2 10 18 q-12 4 -14 -8 Z" fill="${pe}"/><ellipse cx="60" cy="74" rx="8" ry="5" fill="#ffadc6" ${L(2)}/>
      <g class="head"><path d="M90 24 l-8 -8 M108 24 l8 -8" stroke="#f5d27a" stroke-width="5" stroke-linecap="round"/><rect x="86" y="22" width="26" height="30" rx="12" fill="#fff" ${L()}/>
      <ellipse cx="100" cy="52" rx="14" ry="10" fill="#ffc2d4" ${L(3)}/><circle cx="95" cy="52" r="1.8" fill="${pe}"/><circle cx="105" cy="52" r="1.8" fill="${pe}"/>${Tt(94,34)}${Tt(106,34)}
      <ellipse class="ear" cx="82" cy="30" rx="7" ry="4" fill="#fff" ${L(3)}/></g></svg>`}}const Ie={x:2265,y:520,rx:110,ry:34},Nw=476,Li=[{name:"Chestnut",body:"#c97b45",mane:"#7a3f22",sock:"#fff6e6"},{name:"Snowy",body:"#fdf8f3",mane:"#d9cdc4",sock:"#e9ddd2"},{name:"Midnight",body:"#4a3f52",mane:"#2a2230",sock:"#6b5e74"},{name:"Sunny",body:"#f2c96b",mane:"#fff6e0",sock:"#fff6e0"},{name:"Rainbow Pony",body:"#fff0fa",mane:"rainbow",sock:"#ffd6ec"}];function Kr(e,t=!1){const n=Li[e]??Li[0],s=n.mane==="rainbow",o=s?Mt.map((r,l)=>{const c=124-l*1.6,d=14+l*2.4;return`<path d="M${c.toFixed(1)} ${d.toFixed(1)} q-6.5 2 -4.5 ${6+l*.35}" fill="none" stroke="${r}" stroke-width="5.5" stroke-linecap="round"/>`}).join(""):`<path d="M106 20 q-14 6 -18 30 q8 -6 10 -2 q4 -12 14 -18 Z" fill="${n.mane}" ${L(3)}/>`,i=s?`<g class="tail">${Mt.map((r,l)=>`<path d="M30 58 q-18 ${8+l*3} -14 ${36+l}" fill="none" stroke="${r}" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`:`<path class="tail" d="M30 56 q-20 10 -14 44 q10 -10 8 -20 q6 -10 10 -18 Z" fill="${n.mane}" ${L(3)}/>`,a=(r,l)=>`<g class="leg ${l}"><rect x="${r}" y="78" width="12" height="44" rx="5" fill="${n.body}" ${L(3)}/><rect x="${r}" y="110" width="12" height="12" rx="4" fill="${n.sock}" ${L(3)}/></g>`;return`<svg viewBox="0 0 160 130" class="horsesvg">${i}${a(40,"a")}${a(56,"b")}${a(96,"b")}${a(112,"a")}
    <ellipse cx="80" cy="68" rx="50" ry="24" fill="${n.body}" ${L()}/>
    ${t||s?`<path class="saddle" data-top="43" d="M64 46 q16 -6 32 0 l-2 22 q-14 4 -28 0 Z" fill="${s?"#b197fc":"#e8590c"}" ${L(3)}/>`:""}
    <g class="head"><path d="M108 66 L114 30 Q118 16 132 18 L148 36 Q152 46 142 48 L130 46 L128 70 Z" fill="${n.body}" ${L()}/>
    <path d="M114 22 l2 -14 l8 12 Z" fill="${n.body}" ${L(3)}/>${o}
    ${Tt(130,30,3.4)}<circle cx="146" cy="42" r="2" fill="${pe}"/>${Kn(136,40)}
    ${s?`<path d="M120 14 l4 -14 l4 14 Z" fill="#ffd43b" ${L(2)}/>`:""}</g>
    ${s?'<g fill="#fff" opacity=".9"><path d="M60 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M92 74 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z"/></g>':""}</svg>`}const jw=`<svg viewBox="0 0 180 170"><path d="M10 70 L90 14 L170 70" fill="#ffa94d" ${L(5)}/>
  <rect x="24" y="66" width="132" height="84" rx="8" fill="#fff6e6" ${L()}/>${Mt.map((e,t)=>`<rect x="${24+t*22}" y="66" width="22" height="10" fill="${e}"/>`).join("")}
  <rect x="24" y="66" width="132" height="10" fill="none" ${L(3)}/><circle cx="90" cy="108" r="22" fill="#5a3d5c"/>
  <path d="M60 150 l-12 16 M120 150 l12 16" ${L(5)}/>
  <g class="hen"><ellipse cx="90" cy="118" rx="20" ry="14" fill="#fff" ${L(3)}/><circle cx="104" cy="104" r="10" fill="#fff" ${L(3)}/><path d="M100 94 q3 -8 8 0" fill="#ff6b6b" ${L(2)}/>
  <path d="M113 104 l7 2 -7 3 Z" fill="#ffa94d" ${L(2)}/>${Tt(106,102,2)}</g>
  <text x="90" y="54" text-anchor="middle" font-size="16" font-weight="900" fill="${pe}" font-family="Nunito, system-ui, sans-serif">EGGS</text></svg>`,Fw=`<svg viewBox="0 0 170 130"><rect x="80" y="30" width="54" height="50" rx="8" fill="#bde6f7" ${L()}/><rect x="74" y="24" width="66" height="10" rx="4" fill="#ff6b6b" ${L(3)}/>
  <rect x="20" y="62" width="130" height="34" rx="12" fill="#ff6b6b" ${L()}/><rect x="28" y="40" width="10" height="24" rx="3" fill="#868e96" ${L(3)}/>
  <circle cx="122" cy="98" r="28" fill="${pe}"/><circle cx="122" cy="98" r="13" fill="#ffd43b" ${L(3)}/><circle cx="44" cy="106" r="18" fill="${pe}"/><circle cx="44" cy="106" r="8" fill="#ffd43b" ${L(3)}/>
  <circle cx="26" cy="76" r="5" fill="#fff3b0" ${L(2)}/></svg>`,Vw=`<svg viewBox="0 0 240 300"><rect x="104" y="160" width="32" height="140" rx="10" fill="#c99366" ${L()}/>
  <circle cx="120" cy="110" r="90" fill="#5cc985" ${L()}/><circle cx="62" cy="140" r="50" fill="#5cc985" ${L()}/><circle cx="180" cy="140" r="52" fill="#5cc985" ${L()}/>
  ${[[80,90],[150,70],[175,140],[100,150],[130,115],[60,140]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="11" fill="#ff6b6b" ${L(3)}/><path d="M${e} ${t-10} q2 -6 6 -7" fill="none" ${L(2)}/>`).join("")}</svg>`,mc=[[80,90],[150,70],[175,140],[100,150]],qd=`<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="14" fill="#ff6b6b" ${L(3)}/><path d="M20 10 q2 -6 6 -7" fill="none" ${L(2.5)}/><ellipse cx="27" cy="8" rx="5" ry="3" fill="#5cc985" ${L(2)}/><circle cx="14" cy="18" r="3" fill="#fff" opacity=".6"/></svg>`,aa=`<svg viewBox="0 0 40 40"><path d="M12 14 L32 10 L16 36 Z" fill="#ff922b" ${L(3)}/><path d="M18 18 l5 -1 M17 24 l4 -1" ${L(2)}/><path d="M30 10 q4 -8 8 -6 M30 10 q-2 -8 2 -10 M30 10 q6 -2 8 2" fill="none" stroke="#40c057" stroke-width="4" stroke-linecap="round"/></svg>`,Gw=`<svg viewBox="0 0 40 40"><path d="M6 34 Q20 4 34 34 Z" fill="#f5d27a" ${L(3)}/><path d="M14 30 L18 14 M20 32 V10 M26 30 L22 14" stroke="#d9a93f" stroke-width="2.5" stroke-linecap="round"/></svg>`,bo=`<svg viewBox="0 0 40 40"><path d="M20 4 C30 4 34 20 34 26 C34 34 28 38 20 38 C12 38 6 34 6 26 C6 20 10 4 20 4 Z" fill="#fff6e6" ${L(3)}/><circle cx="15" cy="16" r="3" fill="#fff"/></svg>`,Xr=(e="#ff8fab")=>`<svg viewBox="0 0 40 40"><path d="M20 38 V20" stroke="#40c057" stroke-width="4" stroke-linecap="round"/>${[0,72,144,216,288].map(t=>`<circle cx="${20+Math.cos(t*Math.PI/180)*8}" cy="${14+Math.sin(t*Math.PI/180)*8}" r="7" fill="${e}" ${L(2.5)}/>`).join("")}<circle cx="20" cy="14" r="5" fill="#ffd43b" ${L(2)}/></svg>`,Id={carrot:aa,apple:qd,hay:Gw},Yw=e=>`<svg viewBox="0 0 80 90"><g transform="translate(14 0) scale(1.3)">${Id[e].replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g>
  <path d="M10 40 H70 L62 86 H18 Z" fill="${e==="carrot"?"#74c0fc":e==="apple"?"#ffa8c5":"#b2f2bb"}" ${L(4)}/><path d="M12 52 H68" stroke="#fff" stroke-width="4" opacity=".6"/></svg>`,Kw=`<svg viewBox="0 0 60 50"><path d="M12 22 Q30 -6 48 22" fill="none" stroke="${pe}" stroke-width="7" stroke-linecap="round"/><path d="M12 22 Q30 -6 48 22" fill="none" stroke="#e0a96d" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 22 H56 L50 46 H10 Z" fill="#e0a96d" ${L(3.5)}/><path d="M12 30 H48 M14 38 H46" stroke="#b5793d" stroke-width="3"/></svg>`,yc=["#ff8fab","#c9a0dc","#ffd43b","#74c0fc","#ff922b"];function Od(e,t,n){const s=`<ellipse cx="35" cy="76" rx="30" ry="11" fill="${e?.wet?"#7a4b2e":"#9c6b46"}" ${L(3)}/>`;if(!e)return`<svg viewBox="0 0 70 90">${s}<path d="M20 74 q4 -3 8 0 M36 78 q4 -3 8 0" stroke="#b5875f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;const o=yc[n%yc.length];let i="";t===0&&(i=`<circle cx="27" cy="72" r="3" fill="#f2dcb8" ${L(1.5)}/><circle cx="36" cy="75" r="3" fill="#f2dcb8" ${L(1.5)}/><circle cx="44" cy="71" r="3" fill="#f2dcb8" ${L(1.5)}/>`),t===1&&(i=`<path d="M35 72 V58" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="57" rx="7" ry="4" fill="#69db7c" ${L(2)}/><ellipse cx="41" cy="55" rx="7" ry="4" fill="#69db7c" ${L(2)}/>`),t===2&&(i=`<path d="M35 72 V40 M35 60 Q22 54 20 42 M35 56 Q48 50 50 38" stroke="#40c057" stroke-width="4" fill="none" stroke-linecap="round"/>${e.seed==="flower"?`<circle cx="35" cy="38" r="7" fill="#b2f2bb" ${L(2)}/>`:""}`),t===3&&(i=e.seed==="carrot"?`<path d="M26 74 L44 72 L35 86 Z" fill="#ff922b" ${L(2.5)}/><path d="M35 72 Q24 50 22 38 M35 72 Q36 48 36 34 M35 72 Q46 50 50 40" stroke="#40c057" stroke-width="5" fill="none" stroke-linecap="round"/>`:`<path d="M35 72 V34" stroke="#40c057" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="54" rx="8" ry="4" fill="#69db7c" ${L(2)}/>${[0,72,144,216,288].map(l=>`<circle cx="${35+Math.cos(l*Math.PI/180)*10}" cy="${28+Math.sin(l*Math.PI/180)*10}" r="8" fill="${o}" ${L(2.5)}/>`).join("")}<circle cx="35" cy="28" r="6" fill="#ffd43b" ${L(2)}/>`);const a=e.wet?"":`<g class="needWater"><path d="M56 18 q6 10 0 14 q-6 -4 0 -14 Z" fill="#74c0fc" ${L(2)}/></g>`,r=t===3?`<g class="ready"><path d="M58 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffd43b" ${L(1.5)}/></g>`:"";return`<svg viewBox="0 0 70 90">${s}${i}${a}${r}</svg>`}const Xw=`<svg viewBox="0 0 48 48">${Mt.map((e,t)=>`<path d="M${6+t*2.6} 38 A${18-t*2.6} ${18-t*2.6} 0 0 1 ${42-t*2.6} 38" fill="none" stroke="${e}" stroke-width="3"/>`).join("")}<path d="M4 38 H44" ${L(3)}/></svg>`,Jw=`<svg viewBox="0 0 48 48"><path d="M10 34 Q24 22 38 34" fill="none" ${L(4)}/><path d="M24 30 V8 M16 16 L24 8 L32 16" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40 H40" ${L(4)}/></svg>`,e$=`<svg viewBox="0 0 200 320"><path d="M70 310 L84 120 H116 L130 310 Z" fill="#fff6e6" ${L(4)}/><path d="M78 200 H122 M74 260 H126" ${L(3)}/><rect x="88" y="262" width="24" height="48" rx="10" fill="#b197fc" ${L(3)}/>
  <path d="M78 124 L100 92 L122 124 Z" fill="#ff8fab" ${L(4)}/>
  <g class="sails" style="transform-origin:100px 110px">${[0,90,180,270].map(e=>`<g transform="rotate(${e} 100 110)"><path d="M100 110 L104 30 L126 30 L118 104 Z" fill="${["#ffd43b","#74c0fc","#ff8fab","#69db7c"][e/90]}" ${L(3)}/><path d="M108 40 H122 M107 58 H121 M106 76 H120" ${L(2)}/></g>`).join("")}<circle cx="100" cy="110" r="10" fill="#ffa94d" ${L(3)}/></g></svg>`,t$=["GOAT","SHEEP","PIGLET","CHICKS","BUNNY","COW"],n$=e=>`<g class="lantern" style="transform-origin:${e}px 146px"><path d="M${e} 146 V178" ${L(3)}/><circle cx="${e}" cy="204" r="34" fill="#fff3b0" opacity=".45"/>
  <path d="M${e-14} 182 H${e+14} L${e+11} 226 H${e-11} Z" fill="#ffe066" ${L(3)}/><rect x="${e-17}" y="176" width="34" height="8" rx="3" fill="#495057" ${L(2.5)}/><rect x="${e-15}" y="224" width="30" height="7" rx="3" fill="#495057" ${L(2.5)}/><ellipse cx="${e}" cy="205" rx="5" ry="9" fill="#ff922b"/></g>`;function s$(){const e=Wr,t=Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64} 146 V440" stroke="#d4895f" stroke-width="3"/>`).join(""),n=Array.from({length:Math.ceil(e/46)},(o,i)=>{const a=i*46,r=160+Math.sin(i/3.1)*8;return`<path d="M${a} ${r} L${a+40} ${r} L${a+20} ${r+30} Z" fill="${Mt[i%6]}" ${L(2.5)}/>`}).join(""),s=Tr.map((o,i)=>`<g><rect x="${o-96}" y="318" width="192" height="122" rx="6" fill="#f0c49a" ${L(4)}/>
    <path d="M${o-96} 350 H${o+96} M${o-96} 384 H${o+96} M${o-96} 412 H${o+96}" stroke="#d9a074" stroke-width="3"/><path d="M${o-96} 318 L${o+96} 440 M${o+96} 318 L${o-96} 440" stroke="#e0aa7e" stroke-width="7" opacity=".7"/>
    <rect x="${o-54}" y="284" width="108" height="30" rx="10" fill="#fff6e6" ${L(3)}/><text x="${o}" y="305" text-anchor="middle" font-size="17" font-weight="900" fill="${pe}" font-family="Nunito, system-ui, sans-serif">${t$[i]}</text></g>`).join("");return`<svg class="parkScene ranchScene barnScene" viewBox="0 0 ${e} ${Ho}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${e}" height="440" fill="#e8a87c"/>${t}
  <!-- hay loft -->
  <rect width="${e}" height="128" fill="#c98a5e"/>${Array.from({length:Math.ceil(e/64)},(o,i)=>`<path d="M${i*64+32} 0 V128" stroke="#b5764d" stroke-width="3"/>`).join("")}
  ${[120,260,420,980,1130,1290,1640,1790].map((o,i)=>Yt(o,126,i%3===1?.72:.85)).join("")}${[190,1060,1720].map(o=>Yt(o,82,.7)).join("")}
  <rect x="0" y="126" width="${e}" height="24" fill="#a8653a" ${L(4)}/>
  ${[0,1,2,3,4,5,6].map(o=>`<path d="M${120+o*280} 150 L${180+o*280} 210" stroke="#a8653a" stroke-width="12" stroke-linecap="round"/><path d="M${120+o*280} 150 L${180+o*280} 210" ${L(2)}/>`).join("")}
  <!-- ladder up to the loft -->
  <g transform="translate(1840 0)"><path d="M-22 150 L-30 440 M22 150 L30 440" stroke="#c99366" stroke-width="10" stroke-linecap="round"/>${[190,240,290,340,390].map(o=>`<path d="M${-22-(o-150)*.028} ${o} H${22+(o-150)*.028}" stroke="#c99366" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
  <!-- rainbow bunting + big rainbow banner -->
  <path d="M0 160 Q${e/2} 176 ${e} 160" fill="none" ${L(2)}/>${n}
  <g transform="translate(${e/2+60} 236)">${Mt.map((o,i)=>`<rect x="${-180+i*60}" y="-26" width="60" height="44" fill="${o}"/>`).join("")}<rect x="-180" y="-26" width="360" height="44" rx="4" fill="none" ${L(4)}/>
    <path d="M-180 -26 L-200 -4 L-180 18 M180 -26 L200 -4 L180 18" fill="#ff8fab" ${L(3)}/>
    <text x="0" y="6" text-anchor="middle" font-size="26" font-weight="900" fill="#fff" stroke="${pe}" stroke-width="5" paint-order="stroke" font-family="Nunito, system-ui, sans-serif">RAINBOW RANCH</text></g>
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
  <g transform="translate(356 0)"><rect x="-70" y="456" width="140" height="34" rx="12" fill="#fff6e6" ${L(3)}/><text x="0" y="480" text-anchor="middle" font-size="16" font-weight="900" fill="${pe}" font-family="Nunito, system-ui, sans-serif">FOOD 🥕🍎🌾</text></g>
  ${Yt(1790,590,.8)}${Yt(1700,600,.65)}
  ${[290,660,1330,1590].map(n$).join("")}
  </svg>`}const Ci=600,mt="#5a3d5c",F=(e=4)=>`stroke="${mt}" stroke-width="${e}" stroke-linejoin="round" stroke-linecap="round"`;function Po(e){const t=mo[e].seats,n=t<=2?140:t===4?110:100,s=(t-1)/2;return Array.from({length:t},(o,i)=>({x:mo[e].x+(i-s)*n,y:558-Math.abs(i-s)*8}))}const kc=["#ff7eb3","#ffd43b","#66d9e8","#d0bfff","#fff"],Bt=(e,t,n=1,s="#fff")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -9 L2.2 -2.4 L9 -2.2 L3.4 2.2 L5.4 9 L0 4.6 L-5.4 9 L-3.4 2.2 L-9 -2.2 L-2.2 -2.4 Z" fill="${s}" stroke="${mt}" stroke-width="1.2" stroke-linejoin="round"/>`;function bc(e,t,n,s){const o=`<path d="M36 ${t} Q ${e/2} ${t+n+8} ${e-36} ${t}" fill="none" stroke="${mt}" stroke-width="3"/>`,i=Array.from({length:s},(a,r)=>{const l=s===1?.5:r/(s-1),c=48+l*(e-96),d=t+Math.sin(l*Math.PI)*n,g=kc[r%kc.length];return`<g class="bulb" style="animation-delay:-${r%8*.22}s"><line x1="${c}" y1="${d-16}" x2="${c}" y2="${d-6}" stroke="${mt}" stroke-width="2"/><circle cx="${c}" cy="${d}" r="7.5" fill="${g}" ${F(2)}/><circle cx="${c-2}" cy="${d-2}" r="2.2" fill="#fff" opacity=".85"/></g>`}).join("");return o+i}const js=(e,t,n,s=1)=>`<g transform="translate(${e} ${t}) scale(${s})">
  <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".12"/>
  <path d="M-40 10 Q-48 -22 -10 -28 Q10 -46 34 -18 Q50 2 34 18 Q8 32 -24 20 Q-42 16 -40 10 Z" fill="${n}" ${F(3)}/>
  <path d="M-18 -6 Q-4 -20 14 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>
  <circle cx="16" cy="6" r="4" fill="#fff" opacity=".35"/>
</g>`,vc=(e,t,n)=>`<g transform="translate(${e} ${t})">
  <ellipse cx="0" cy="16" rx="28" ry="9" fill="#000" opacity=".12"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="${n}" ${F(3)}/>
  <ellipse cx="-6" cy="-2" rx="12" ry="7" fill="#fff" opacity=".35"/>
  <path d="M0 -16 V-28" ${F(3)}/><circle cy="-32" r="6" fill="#ffd43b" ${F(2)}/>
</g>`;function Fs(e,t,n,s,o,i=""){return`<g class="photoFrame${i}" transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-40" y="-52" width="80" height="104" rx="6" fill="#fff" ${F(3.5)}/>
    <rect x="-32" y="-44" width="64" height="72" rx="4" fill="${s}"/>
    ${o}
    <rect x="-10" y="-58" width="20" height="10" rx="2" fill="#ffe8a3" opacity=".85" transform="rotate(-8)"/>
  </g>`}function Vo(e,t,n,s,o){return`<g transform="translate(${e} ${t}) rotate(${n})">
    <rect x="-28" y="-34" width="56" height="68" rx="3" fill="#fff" ${F(3)}/>
    <rect x="-22" y="-28" width="44" height="40" fill="${s}"/>
    ${o}
  </g>`}function Go(e,t,n,s){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="36" rx="26" ry="8" fill="#000" opacity=".12"/>
    <path d="M-18 36 L-12 -2 H12 L18 36 Z" fill="${n}" ${F(3)}/>
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c9a27a" ${F(2)}/>
    <ellipse cx="-16" cy="-16" rx="16" ry="22" fill="${s}" ${F(3)} transform="rotate(-18)"/>
    <ellipse cx="16" cy="-18" rx="16" ry="22" fill="${s}" ${F(3)} transform="rotate(16)"/>
    <ellipse cx="0" cy="-28" rx="14" ry="20" fill="${s}" ${F(3)}/>
    <circle cx="0" cy="-36" r="6" fill="#ff8ec8" ${F(2)}/>
  </g>`}function o$(e,t){return`<g transform="translate(${e} ${t})">
    <ellipse cx="28" cy="118" rx="32" ry="8" fill="#000" opacity=".12"/>
    <rect width="56" height="118" rx="10" fill="#e7fbff" ${F()}/>
    <rect y="52" width="56" height="8" fill="#d0f4ff" ${F(2)}/>
    <rect x="44" y="18" width="6" height="22" rx="3" fill="#ffd43b" ${F(2)}/>
    <rect x="44" y="70" width="6" height="28" rx="3" fill="#ffd43b" ${F(2)}/>
    <rect x="8" y="12" width="28" height="22" rx="4" fill="#fff" ${F(2)}/>
    <circle cx="16" cy="22" r="4" fill="#ff8ec8"/><circle cx="28" cy="24" r="3" fill="#ffd43b"/>
    <path d="M18 78 C14 72 8 74 12 82 C15 88 18 90 18 90 C18 90 21 88 24 82 C28 74 22 72 18 78 Z" fill="#ff4d94" ${F(1.5)}/>
  </g>`}function i$(e,t,n){return`<g transform="translate(${e} ${t})">
    <ellipse cx="0" cy="6" rx="34" ry="9" fill="#000" opacity=".1"/>
    <path d="M-46 -16 C-50 -86 -26 -108 0 -110 C26 -108 50 -86 46 -16 Z" fill="#fff6fb" ${F()}/>
    <path d="M-32 -20 C-34 -74 -16 -90 0 -92 C16 -90 34 -74 32 -20 Z" fill="${n}"/>
    <ellipse cx="0" cy="-10" rx="40" ry="16" fill="${n}" ${F()}/>
    <ellipse cx="-8" cy="-16" rx="14" ry="6" fill="#fff" opacity=".4"/>
    <path d="M-22 -2 L-26 16 M22 -2 L26 16" fill="none" stroke="${mt}" stroke-width="4" stroke-linecap="round"/>
  </g>`}function a$(e){const t=mo[e],n=t.game==="four"?"Four":"Slay",s=t.game==="four"?"#7ad7ea":e===0?"#ff8ec8":"#e0b0ff",o=t.game==="four"?"#b8f2ff":e===0?"#ffd0e6":"#ead9ff",i=t.seats>=6?250:t.seats>=4?200:150;return`${Po(e).map(r=>i$(r.x,r.y,o)).join("")}
  <g transform="translate(${t.x} 500)">
    <ellipse cx="0" cy="28" rx="${i+18}" ry="20" fill="#000" opacity=".1"/>
    <rect x="-18" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${F(3)}/>
    <rect x="4" y="8" width="14" height="36" rx="4" fill="#e7c8a0" ${F(3)}/>
    <ellipse cx="0" cy="-4" rx="${i}" ry="30" fill="${s}" stroke="#ffd43b" stroke-width="6"/>
    <ellipse cx="0" cy="-4" rx="${i-16}" ry="18" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>
    <ellipse cx="${-i*.25}" cy="-12" rx="${i*.35}" ry="8" fill="#fff" opacity=".28"/>
    <text x="0" y="4" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="${mt}" stroke-width="4" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${n}</text>
  </g>`}const Vs=(e,t,n=1,s="#ff4d94")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 4 C-6 -4 -14 -2 -10 6 C-7 12 0 16 0 16 C0 16 7 12 10 6 C14 -2 6 -4 0 4 Z" fill="${s}" stroke="${mt}" stroke-width="1.6" stroke-linejoin="round"/>`;function r$(){const e=Xi,t=[[120,200],[260,250],[640,210],[900,250],[1180,190],[1560,230],[1860,180],[2100,240],[2420,200],[2520,280]];return`<svg class="grScene" viewBox="0 0 ${e} ${Ci}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="${e}" height="${Ci}" fill="url(#grWall)"/>
  <rect y="390" width="${e}" height="80" fill="#fff6fb" opacity=".45"/>
  ${Array.from({length:8},(n,s)=>`<rect x="${40+s*330}" y="400" width="280" height="62" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`).join("")}
  <rect y="468" width="${e}" height="132" fill="url(#grFloor)"/>
  <rect y="464" width="${e}" height="12" fill="#ffd43b" ${F(3)}/>
  ${[720,1500,2150].map((n,s)=>`<ellipse cx="${n}" cy="548" rx="${s===1?210:280}" ry="42" fill="${s===1?"#d8f6ff":s===0?"#ffe0f0":"#f3e8ff"}" stroke="#fff" stroke-width="4" opacity=".8"/>`).join("")}
  ${bc(e,28,22,28)}
  ${bc(e,78,16,18)}
  ${t.map(([n,s],o)=>Bt(n,s,.7+o%3*.28,o%2?"#fff":"#ffd43b")).join("")}

  <g transform="translate(1180 70)">
    <rect x="20" y="20" width="220" height="150" rx="16" fill="url(#grSky)" ${F()}/>
    <path d="M20 70 H240 M130 20 V170" ${F(3)}/>
    <circle cx="78" cy="48" r="14" fill="#ffd43b" ${F(2)}/>
    <path d="M8 36 Q20 90 8 150" fill="#ff8ec8" ${F(3)}/><path d="M252 36 Q240 90 252 150" fill="#d0bfff" ${F(3)}/>
  </g>

  <g class="neonSign" transform="translate(560 168)">
    <g class="neonSignArt">
    <rect x="-228" y="-58" width="456" height="108" rx="28" fill="#2b1430" ${F(5)}/>
    <rect class="neonRing" x="-214" y="-44" width="428" height="80" rx="22" fill="none" stroke="#ff4d94" stroke-width="4"/>
    <path d="M-150 8 C-162 -14 -186 -8 -174 12 C-166 26 -150 36 -150 36 C-150 36 -134 26 -126 12 C-114 -8 -138 -14 -150 8 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="2"/>
    <text x="6" y="16" text-anchor="middle" font-size="40" font-weight="900" fill="#ff7eb3" stroke="#fff6fb" stroke-width="2" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY CLUB</text>
    </g>
  </g>

  ${Fs(500,340,-6,"#ffe0f0",`${Vs(0,8,1.4)}${Bt(-18,-16,.7,"#ffd43b")}${Bt(18,-10,.55,"#66d9e8")}`," frameAtHead")}
  ${Fs(424,186,-8,"#ffe0f0",`${Vs(0,8,1.4)}${Bt(-18,-16,.7,"#ffd43b")}${Bt(18,-10,.55,"#66d9e8")}`," framePhone")}
  ${Fs(980,240,5,"#e7fbff",`<ellipse cx="0" cy="6" rx="16" ry="12" fill="#fff" ${F(2)}/><path d="M-6 6 Q0 -8 6 6" fill="none" stroke="${mt}" stroke-width="2"/><path d="M0 18 V28 M-12 24 H12" ${F(2)}/>`)}
  ${Fs(1680,255,-4,"#fff3c4",`${Bt(0,2,1.5,"#ffd43b")}`)}
  ${Fs(2360,245,6,"#f3e8ff",`${Vs(0,4,1.3,"#d0bfff")}`)}
  ${Vo(400,300,8,"#fff0f6",Vs(0,-4,1.1))}
  ${Vo(820,310,-7,"#e7fbff",Bt(0,-6,1,"#66d9e8"))}
  ${Vo(1900,300,9,"#fff6e6",Bt(0,-6,1,"#ffd43b"))}
  ${Vo(2280,320,-8,"#ffe0f0",Vs(0,-4,1))}

  <g class="disco" transform="translate(1288 36)">
    <line y1="0" y2="22" stroke="${mt}" stroke-width="3"/>
    <circle cy="44" r="26" fill="url(#disco)" ${F(3)}/>
    <path d="M-14 36 L0 56 L14 36 M-8 48 H8" fill="none" stroke="#fff" stroke-width="2.5"/>
    ${Bt(-30,20,.45)}${Bt(32,28,.4,"#ffd43b")}
  </g>

  <g transform="translate(86 292)">
    <rect width="78" height="168" rx="12" fill="#ff8ec8" ${F()}/>
    <rect x="8" y="10" width="62" height="36" rx="8" fill="#fff6e6" ${F(2)}/>
    <text x="39" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="${mt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">MAP</text>
    <circle cx="62" cy="96" r="5" fill="#ffd43b" ${F(2)}/>
    <rect x="22" y="118" width="34" height="8" rx="3" fill="#fff" opacity=".45"/>
  </g>

  ${Go(40,400,"#ffd43b","#8ce99a")}
  ${Go(1080,392,"#ff8ec8","#69db7c")}
  ${Go(1600,400,"#d0bfff","#8ce99a")}
  ${Go(2520,396,"#66d9e8","#69db7c")}
  ${o$(200,348)}
  <g transform="translate(2420 360)">
    <rect width="130" height="100" rx="14" fill="#fff6fb" ${F()}/>
    <rect y="28" width="130" height="10" fill="#ffd0e6" ${F(2)}/>
    <circle cx="28" cy="64" r="12" fill="#ffd43b" ${F(2)}/><circle cx="64" cy="66" r="10" fill="#ff8ec8" ${F(2)}/><rect x="86" y="52" width="28" height="22" rx="6" fill="#66d9e8" ${F(2)}/>
    <text x="65" y="20" text-anchor="middle" font-size="13" font-weight="900" fill="${mt}" font-family="Nunito, ui-rounded, system-ui, sans-serif">SNACKS</text>
  </g>

  ${js(330,455,"#ff8ec8",1.05)}
  ${js(1120,468,"#d0bfff")}
  ${js(1360,470,"#8ce4f2",.9)}
  ${js(1780,462,"#ffd43b")}
  ${vc(1480,500,"#ffb3d9")}
  ${vc(2e3,505,"#c9b3ff")}
  ${js(2550,468,"#ff8ec8",.85)}

  ${mo.map((n,s)=>a$(s)).join("")}
  </svg>`}const l$=`<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="10" fill="#2b1430" stroke="${mt}" stroke-width="3"/><path d="M24 32 C16 26 12 22 14 17 C16 13 21 14 24 18 C27 14 32 13 34 17 C36 22 32 26 24 32 Z" fill="#ff4d94" stroke="#ffd0ea" stroke-width="1.5"/><circle cx="10" cy="8" r="2.2" fill="#ffd43b"/><circle cx="24" cy="5" r="2.2" fill="#66d9e8"/><circle cx="38" cy="8" r="2.2" fill="#d0bfff"/></svg>`,E="#5a3d5c",c$=`<svg viewBox="0 0 120 100"><rect x="0" y="62" width="120" height="38" rx="14" fill="#9fe0aa" stroke="${E}" stroke-width="3"/>
  <path d="M18 70 L30 22 L42 70 M78 70 L90 22 L102 70" fill="none" stroke="#8ecae6" stroke-width="5" stroke-linecap="round"/><path d="M26 22 H94" stroke="#ff8fab" stroke-width="7" stroke-linecap="round"/>
  <path d="M50 22 V54 M66 22 V54" stroke="${E}" stroke-width="2.5"/><rect x="45" y="52" width="26" height="7" rx="3" fill="#ff9f68" stroke="${E}" stroke-width="2.5"/>
  <circle cx="104" cy="14" r="9" fill="#ffd166" stroke="${E}" stroke-width="3"/></svg>`,Nd=`<svg viewBox="0 0 120 100"><path d="M20 50 L60 16 L100 50" fill="#ff8fab" stroke="${E}" stroke-width="4" stroke-linejoin="round"/><rect x="28" y="48" width="64" height="44" rx="6" fill="#fff6e6" stroke="${E}" stroke-width="4"/>
  <rect x="52" y="64" width="16" height="28" rx="4" fill="#c9a0dc" stroke="${E}" stroke-width="3"/><rect x="34" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${E}" stroke-width="3"/><rect x="73" y="58" width="13" height="13" rx="3" fill="#bfe6ff" stroke="${E}" stroke-width="3"/></svg>`,Jr=`<svg viewBox="0 0 120 100"><path d="M40 18 L24 28 L14 46 L30 52 L34 44 V88 H86 V44 L90 52 L106 46 L96 28 L80 18 Q60 34 40 18 Z" fill="#8ecae6" stroke="${E}" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="58" r="7" fill="#fff3b0" stroke="${E}" stroke-width="3"/></svg>`,oe=e=>`<div class="wnArt">${e}</div>`,jd=`<svg viewBox="0 0 120 100"><rect x="16" y="58" width="74" height="24" rx="10" fill="#fff" stroke="${E}" stroke-width="4"/><circle cx="32" cy="70" r="7" fill="#ff8fab" stroke="${E}" stroke-width="3"/><circle cx="52" cy="70" r="7" fill="#ffe066" stroke="${E}" stroke-width="3"/><circle cx="72" cy="70" r="7" fill="#8ecae6" stroke="${E}" stroke-width="3"/><path d="M86 46 l14 -16 8 8 -14 16z" fill="#ffd166" stroke="${E}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="44" width="12" height="24" rx="4" fill="#c9a0dc" stroke="${E}" stroke-width="3"/></svg>`,d$=`<svg viewBox="0 0 120 100">${Mt.map((e,t)=>`<path d="M${12+t*6} 84 A${48-t*6} ${48-t*6} 0 0 1 ${108-t*6} 84" fill="none" stroke="${e}" stroke-width="6"/>`).join("")}
  <path d="M38 92 V62 L60 44 L82 62 V92 Z" fill="#ef5b5b" stroke="${E}" stroke-width="3.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="22" fill="#fff6e6" stroke="${E}" stroke-width="3"/></svg>`,g$=`<svg viewBox="0 0 120 100"><g transform="translate(22 8) scale(1.9)">${bo.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g><g transform="translate(52 22) scale(1.4)">${bo.replace('<svg viewBox="0 0 40 40">',"").replace("</svg>","")}</g></svg>`,fr=(e,t,n,s)=>`<g transform="translate(${t} ${n}) scale(${s})">${e.replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"")}</g>`,f$=`<svg viewBox="0 0 120 100"><circle cx="60" cy="50" r="40" fill="#fff" stroke="${E}" stroke-width="4"/>${fr(Hr(Fe({skin:"#f1c27d",hair:"#5b3a29",hairStyle:2,shirt:"#ff7aa8",pants:"#5aa9e6"})).replace('viewBox="14 2 72 74"','viewBox="0 0 100 160"'),26,12,.68)}<circle cx="60" cy="50" r="40" fill="none" stroke="#ff6b9a" stroke-width="5"/></svg>`,h$=`<svg viewBox="0 0 120 100"><rect x="8" y="28" width="104" height="64" rx="16" fill="#fff0f6" stroke="${E}" stroke-width="4"/><path d="M8 40 L60 12 L112 40" fill="#ff6b9a" stroke="${E}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 58 C52 48 40 50 46 60 C50 68 60 74 60 74 C60 74 70 68 74 60 C80 50 68 48 60 58 Z" fill="#ff4d94" stroke="#fff" stroke-width="1.5"/>
  ${[18,34,50,66,82,98].map((e,t)=>`<circle cx="${e}" cy="24" r="4" fill="${["#ff7eb3","#ffd43b","#66d9e8","#d0bfff"][t%4]}" stroke="${E}" stroke-width="1.5"/>`).join("")}</svg>`,p$=`<svg viewBox="0 0 120 100"><rect x="28" y="8" width="64" height="84" rx="12" fill="#fff" stroke="${E}" stroke-width="4"/><rect x="28" y="8" width="64" height="84" rx="12" fill="none" stroke="#ff7eb3" stroke-width="6"/><path d="M48 36 L54 24 L60 34 L68 20 L76 34 L82 24 L88 36 Z" fill="#ffd43b" stroke="${E}" stroke-width="2" stroke-linejoin="round"/><text x="60" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#ff4d94" font-family="Nunito, ui-rounded, system-ui, sans-serif">SLAY</text></svg>`,u$=`<svg viewBox="0 0 120 100"><rect x="10" y="16" width="100" height="72" rx="14" fill="#fff6fb" stroke="${E}" stroke-width="4"/>
  <path d="M36 58 C28 48 18 50 24 60 C28 68 36 74 36 74 C36 74 44 68 48 60 C54 50 44 48 36 58 Z" fill="#ff4d94" stroke="${E}" stroke-width="2"/>
  <path d="M78 28 L82 40 H94 L84 48 L88 60 L78 52 L68 60 L72 48 L62 40 H74 Z" fill="#66d9e8" stroke="${E}" stroke-width="2"/></svg>`,Fd=`<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="22" rx="6" fill="#fff" stroke="${E}" stroke-width="3"/><path d="M6 26 H42 M14 18 V40 M22 18 V40 M30 18 V40 M36 18 V40" stroke="${E}" stroke-width="2.4"/><rect x="4" y="12" width="40" height="8" rx="4" fill="#9ad7f5" stroke="${E}" stroke-width="3"/><ellipse cx="20" cy="32" rx="5" ry="3" fill="#ffe0ec"/><ellipse cx="30" cy="32" rx="5" ry="3" fill="#c9e7ff"/></svg>`,m$=`<svg viewBox="0 0 120 100"><ellipse cx="60" cy="72" rx="50" ry="20" fill="#ffc2d4" stroke="${E}" stroke-width="4"/><ellipse cx="60" cy="72" rx="32" ry="11" fill="#fff" stroke="${E}" stroke-width="3"/><path d="M60 58 C50 46 36 48 42 60 C48 70 60 78 60 78 C60 78 72 70 78 60 C84 48 70 46 60 58 Z" fill="#ff4d94" stroke="${E}" stroke-width="3"/><path d="M22 40 Q28 28 36 36" fill="none" stroke="#7dce8a" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="5" fill="#ffd166" stroke="${E}" stroke-width="2"/></svg>`,y$=`<svg viewBox="0 0 120 100"><path d="M16 50 L60 14 L104 50" fill="#ff8fab" stroke="${E}" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="48" width="68" height="40" rx="10" fill="#fff6ea" stroke="${E}" stroke-width="4"/><path d="M42 88 V60 Q60 44 78 60 V88" fill="#ffe8c7" stroke="${E}" stroke-width="3"/><circle cx="82" cy="64" r="7" fill="#bde0fe" stroke="${E}" stroke-width="3"/><circle cx="80" cy="62" r="2" fill="#fff"/></svg>`,k$=`<svg viewBox="0 0 120 100"><rect x="28" y="38" width="64" height="42" rx="8" fill="#8ecae6" stroke="${E}" stroke-width="4"/><path d="M28 44 L60 68 L92 44" fill="none" stroke="${E}" stroke-width="4"/><path d="M76 30 V16" stroke="${E}" stroke-width="4" stroke-linecap="round"/><path d="M76 16 H96 L90 23 L96 30 H76 Z" fill="#ff6b6b" stroke="${E}" stroke-width="3"/></svg>`,b$=`<svg viewBox="0 0 120 100"><rect x="8" y="32" width="48" height="40" rx="14" fill="#fff3b0" stroke="${E}" stroke-width="4"/><rect x="64" y="32" width="48" height="40" rx="14" fill="#fff" stroke="${E}" stroke-width="4"/><path d="M26 44 L40 52 L26 60 Z" fill="${E}"/><circle cx="88" cy="52" r="6" fill="#ff8fab" stroke="${E}" stroke-width="3"/></svg>`,v$=`<svg viewBox="0 0 120 100"><rect x="16" y="18" width="36" height="58" rx="6" fill="#fff" stroke="${E}" stroke-width="4"/><rect x="62" y="24" width="42" height="52" rx="6" fill="#e7f6ff" stroke="${E}" stroke-width="4"/><circle cx="34" cy="66" r="2.4" fill="${E}"/><circle cx="83" cy="66" r="2.4" fill="${E}"/></svg>`,Vd=`<svg viewBox="0 0 120 100"><rect x="28" y="16" width="64" height="72" rx="16" fill="#fff" stroke="${E}" stroke-width="4"/><path d="M40 36 H80 M40 52 H80 M40 68 H80" fill="none" stroke="${E}" stroke-width="5" stroke-linecap="round"/><circle cx="92" cy="24" r="12" fill="#ff6b9a" stroke="${E}" stroke-width="3"/><text x="92" y="29" text-anchor="middle" font-size="14" font-weight="900" fill="#fff" font-family="Nunito, ui-rounded, system-ui, sans-serif">1</text></svg>`,w$=`<svg viewBox="0 0 120 100"><rect x="6" y="10" width="108" height="80" rx="18" fill="#2a2158" stroke="${E}" stroke-width="4"/><circle cx="34" cy="42" r="14" fill="#ffd166" stroke="${E}" stroke-width="3"/><path d="M78 28 a16 16 0 1 0 0 32 a12 12 0 1 1 0 -32z" fill="#fff6e4" stroke="${E}" stroke-width="3"/><circle cx="92" cy="30" r="2" fill="#fff"/><circle cx="70" cy="24" r="1.6" fill="#fff"/><circle cx="100" cy="48" r="1.6" fill="#fff"/></svg>`,$$=`<svg viewBox="0 0 120 100"><circle cx="60" cy="52" r="34" fill="#fff6e4" stroke="${E}" stroke-width="4"/><path d="M60 52 V32 M60 52 L76 60" stroke="${E}" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="52" r="3" fill="${E}"/><path d="M28 22 l4 6 M92 22 l-4 6" stroke="#ffb15c" stroke-width="4" stroke-linecap="round"/></svg>`,Gd=[{v:9,title:"Everything's tidied into the Menu!",lines:[{art:oe(Vd),text:"Everything's tidied into the <b>Menu</b>!"},{art:oe(w$),text:"The world follows the <b>clock</b>: morning, day, golden evening, and night."},{art:oe($$),text:"Tap the <b>sun</b> and the <b>moon</b>. <b>Auto</b> follows the clock."}]},{v:8,title:"Make your look!",lines:[{art:oe(k$),text:"Leave a <b>letter</b> in a friend's mailbox!"},{art:oe(b$),text:"Tap <b>Play</b> or <b>Decorate</b>!"},{art:oe(Jr),text:"<b>Make your look!</b> New hair, clothes, and colors."},{art:oe(v$),text:"Update every iPad to see the <b>new outfits</b>!"}]},{v:7,title:"New Nursery!",lines:[{art:oe(Fd),text:"A new <b>Nursery</b> room, with a <b>crib</b> and a rocker!"},{art:oe(m$),text:"The <b>Cozy Cottage</b> furniture pack is in your drawer!"},{art:oe(y$),text:"A <b>dog kennel</b> and a <b>cat tower</b> for your pets!"}]},{v:6,title:"The clubhouse is open!",lines:[{art:oe(h$),text:"A glam <b>clubhouse</b> on the map!"},{art:oe(p$),text:"Play <b>Slay</b> with friends at a table!"},{art:oe(u$),text:"Line up <b>hearts</b> or <b>stars</b>!"}]},{v:5,title:"Your house looks even cozier!",lines:[{art:oe(jd),text:"Wallpaper and floors show their <b>real patterns</b> when you paint!"},{art:oe(Cs(0,"sit")),text:"Your cat is <b>big and cozy</b>, just like the toy cat."},{art:oe(Nd),text:"Tap <b>home</b> to come back from the map, the park, or the ranch."}]},{v:4,title:"A map of our neighborhood!",lines:[{art:oe(Br),text:"Tap the <b>map</b> to go anywhere!"},{art:oe(f$),text:"Tap a friend's face to <b>find her</b>."},{art:oe(gr(0)),text:"The petting zoo is inside the <b>barn</b> now!"}]},{v:3,title:"Rainbow Ranch is open!",lines:[{art:oe(d$),text:"Visit <b>Rainbow Ranch</b>!"},{art:oe(gr(1)),text:"Pet and feed animals at the <b>petting zoo</b>."},{art:oe(`<svg viewBox="0 0 160 130">${fr(Kr(4),0,0,1)}</svg>`),text:"Ride <b>horses</b> and the <b>rainbow pony</b>!"},{art:oe(g$),text:"Collect <b>eggs</b> from the hens."},{art:oe(`<svg viewBox="0 0 70 90">${fr(Od({seed:"carrot",wet:1},3,0),0,0,1)}</svg>`),text:"Grow carrots and flowers in the <b>garden</b>."}]},{v:2,title:"What's new!",lines:[{art:oe(c$),text:"A new <b>park</b>! Swing, slide and splash with friends."},{art:oe(Cs(3,"sit")),text:"Adopt a <b>cat</b>! She lives in your house."},{art:oe(ko(3,"stand")),text:"Adopt a <b>dog</b>! Take it to the park to play fetch."}]}],Yd=Gd[0].v,Kd={v:Yd,title:"Welcome to your cozy house!",lines:[{art:oe(Nd),text:"Drag furniture into your rooms."},{art:oe(Jr),text:"Dress up your friends."},{art:oe(Cs(0,"sit")),text:"Tap the paw to adopt a pet!"}]},Xd=vt("cozy-whatsnew"),x$=1;function _$(){try{const e=Number(localStorage.getItem(Xd)),t=["cozy-house","cozy-house-v1","cozy-hood"].some(o=>localStorage.getItem(vt(o))!==null);if(!e&&!t)return{kind:"welcome",entries:[Kd]};const n=e||x$,s=Gd.filter(o=>o.v>n).slice(0,3);return s.length?{kind:"news",entries:s}:{kind:"none",entries:[]}}catch{return{kind:"none",entries:[]}}}function M$(){try{localStorage.setItem(Xd,String(Yd))}catch{}}function L$(e,t){const n=e==="welcome"?Kd.title:t[0].title,s=t.flatMap(o=>o.lines).slice(0,5);return`<div class="wnBadge">${e==="welcome"?ud:t[0].v>=9?Vd:t[0].v>=8?Jr:t[0].v>=7?Fd:t[0].v>=6?l$:t[0].v>=5?jd:t[0].v>=4?Br:t[0].v>=3?Xw:Vp}</div>
    <h2 class="wnTitle">${n}</h2>
    <div class="wnList ${s.length>3?"many":""}">${s.map((o,i)=>`<div class="wnLine" style="animation-delay:${.15+i*.18}s">${o.art}<p>${o.text}</p></div>`).join("")}</div>
    <button class="wnGo" id="wnGo">Let's play!</button>`}const Jd="cozy-sky",hr={tint:"#fff6e4",body:"#ffe9f0",pageA:"#ffe0ec",pageB:"#e6ddff",spot:"#fff6fa",fieldA:"#c9f2c7",fieldB:"#8fd18a",win:"#a2d2ff",win2:"#b9e3ff",house:"#fff3b0",mapTint:"#ffffff"},wc={tint:"#e7b4cc",body:"#f6dce8",pageA:"#ffd0e6",pageB:"#e6d2f8",spot:"#fff0f6",fieldA:"#f6d0e2",fieldB:"#dcc8f0",win:"#f6c6de",win2:"#e4d0f8",house:"#ffe0ee",mapTint:"#f3c4dc"},$c={tint:"#ffb38a",body:"#ffe4dc",pageA:"#ffe0d6",pageB:"#f0d8ea",spot:"#fff6ee",fieldA:"#d4eec4",fieldB:"#a3cb8a",win:"#ffc48a",win2:"#ffd4b0",house:"#ffc56a",mapTint:"#ffb38a"},ys={tint:"#2a2350",body:"#14182c",pageA:"#1c1748",pageB:"#101832",spot:"#2c2458",fieldA:"#1a2458",fieldB:"#0c1028",win:"#1a245c",win2:"#12183a",house:"#ffe9a0",mapTint:"#102044"},Yo=[{m:0,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...ys},{m:5*60,opacity:.7,map:.78,glow:.95,stars:.95,glass:1,phase:"night",...ys},{m:5*60+35,opacity:.42,map:.34,glow:.55,stars:.42,glass:.8,phase:"dawn",...wc},{m:6*60+25,opacity:.14,map:.16,glow:.28,stars:.08,glass:.9,phase:"dawn",...wc},{m:7*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...hr},{m:16*60+15,opacity:0,map:0,glow:0,stars:0,glass:0,phase:"day",...hr},{m:17*60+5,opacity:.08,map:.1,glow:.4,stars:.02,glass:.55,phase:"golden",...$c},{m:18*60+10,opacity:.18,map:.2,glow:.62,stars:.06,glass:.82,phase:"golden",...$c},{m:19*60+5,opacity:.52,map:.68,glow:.9,stars:.55,glass:1,phase:"night",...ys},{m:20*60+10,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...ys},{m:24*60,opacity:.7,map:.78,glow:1,stars:1,glass:1,phase:"night",...ys}],C$={phase:"day",opacity:0,map:0,glow:0,stars:0,glass:0,...hr},S$={phase:"night",opacity:.7,map:.78,glow:1,stars:1,glass:1,...ys};function xc(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function wt(e,t,n){const s=xc(e),o=xc(t),i=a=>Math.round(s[a]+(o[a]-s[a])*n).toString(16).padStart(2,"0");return"#"+i(0)+i(1)+i(2)}const Gs=(e,t,n)=>e+(t-e)*n;function B$(e){const t=e.getHours()*60+e.getMinutes()+e.getSeconds()/60;let n=0;for(;n<Yo.length-2&&t>=Yo[n+1].m;)n++;const s=Yo[n],o=Yo[n+1],i=Math.max(1,o.m-s.m),a=Math.max(0,Math.min(1,(t-s.m)/i));return{phase:a<.5?s.phase:o.phase,opacity:Gs(s.opacity,o.opacity,a),map:Gs(s.map,o.map,a),glow:Gs(s.glow,o.glow,a),stars:Gs(s.stars,o.stars,a),glass:Gs(s.glass,o.glass,a),tint:wt(s.tint,o.tint,a),body:wt(s.body,o.body,a),pageA:wt(s.pageA,o.pageA,a),pageB:wt(s.pageB,o.pageB,a),spot:wt(s.spot,o.spot,a),fieldA:wt(s.fieldA,o.fieldA,a),fieldB:wt(s.fieldB,o.fieldB,a),win:wt(s.win,o.win,a),win2:wt(s.win2,o.win2,a),house:wt(s.house,o.house,a),mapTint:wt(s.mapTint,o.mapTint,a)}}function _c(e,t){return t==="day"?C$:t==="night"?S$:B$(e)}function H$(e){return e==="day"||e==="night"||e==="auto"}function P$(e,t=!1){return t?!0:e==="lamp"||e==="window"||e==="stars"||e==="tv"||/lamp|light|lantern|candle|string-lights|night-light/i.test(e)}function Mc(){try{if(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches)return!0}catch{}if(typeof navigator>"u")return!1;const e=navigator.hardwareConcurrency;if(typeof e=="number"&&e>0&&e<=2)return!0;const t=navigator.deviceMemory;return typeof t=="number"&&t>0&&t<=2}const Lc={day:"night",night:"auto",auto:"day"},Cc={day:"Day",night:"Night",auto:"Auto"},eg='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><g fill="none" stroke="#ffb15c" stroke-width="3" stroke-linecap="round"><path d="M24 7 V13 M24 35 V41 M7 24 H13 M35 24 H41 M12 12 L16 16 M32 32 L36 36 M36 12 L32 16 M16 32 L12 36"/></g></svg>',W$='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 8 a14 14 0 1 0 0 32 a11 11 0 1 1 0 -32z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="3"/><circle cx="14" cy="16" r="1.7" fill="#ffd166"/><circle cx="18" cy="28" r="1.2" fill="#fff"/><circle cx="11" cy="24" r="1" fill="#fff"/></svg>',T$='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="28" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M34 8 a9 9 0 1 0 0 18 a7 7 0 1 1 0 -18z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="14" cy="16" r="1.3" fill="#ffd166"/></svg>',R$={day:eg,night:W$,auto:T$},U$="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)";function E$(){if(document.getElementById("skyInk"))return;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.id="skyInk",e.setAttribute("aria-hidden","true"),e.setAttribute("width","0"),e.setAttribute("height","0"),e.style.cssText="position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none",e.innerHTML=`
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
  `,document.head.appendChild(t)}function Q$(e){E$();const t=Mc();let n=z$(),s=null,o=_c(new Date,n),i=0;e.innerHTML=`<button type="button" class="skyBtn" aria-label="Day. Tap for night.">${eg}</button>`;const a=e.querySelector("button"),r=p=>{o=p;const u=document.documentElement,b=Math.max(0,Math.min(1,p.glow));u.style.setProperty("--sky-opacity",p.opacity.toFixed(3)),u.style.setProperty("--sky-map-opacity",p.map.toFixed(3)),u.style.setProperty("--sky-glow",b.toFixed(3)),u.style.setProperty("--sky-stars",p.stars.toFixed(3)),u.style.setProperty("--sky-glass",p.glass.toFixed(3)),u.style.setProperty("--sky-tint",p.tint),u.style.setProperty("--sky-body",p.body),u.style.setProperty("--sky-page-a",p.pageA),u.style.setProperty("--sky-page-b",p.pageB),u.style.setProperty("--sky-spot",p.spot),u.style.setProperty("--sky-field-a",p.fieldA),u.style.setProperty("--sky-field-b",p.fieldB),u.style.setProperty("--sky-win",p.win),u.style.setProperty("--sky-win-2",p.win2),u.style.setProperty("--sky-house-win",p.house),u.style.setProperty("--sky-map-tint",p.mapTint),u.style.setProperty("--sky-glow-soft",`rgba(255, 186, 80, ${(b*.72).toFixed(3)})`),u.style.setProperty("--sky-glow-hot",`rgba(255, 220, 120, ${(b*.96).toFixed(3)})`),u.style.setProperty("--sky-glow-clear","rgba(255, 186, 80, 0)"),u.style.setProperty("--sky-glow-wash",`rgba(255, 170, 70, ${(b*.55).toFixed(3)})`),u.style.setProperty("--sky-glow-map",`rgba(255, 196, 110, ${(b*.7).toFixed(3)})`);const M=p.phase==="golden"?.24:p.phase==="dawn"?.22:0,m=p.phase==="golden"?"186, 110, 52":"140, 62, 18";u.style.setProperty("--sky-shadow",`rgba(${m}, ${M.toFixed(3)})`);const h=p.phase==="night"?.55:p.phase==="golden"?.08:p.phase==="dawn"?.16:0;u.style.setProperty("--sky-vig",`rgba(12, 10, 32, ${h.toFixed(3)})`);const v=p.phase==="golden"?"255, 196, 80":p.phase==="dawn"?"255, 214, 230":"255, 246, 214";u.style.setProperty("--sky-orb",`rgba(${v}, ${Math.min(1,p.glass).toFixed(3)})`),u.dataset.sky=p.phase,u.dataset.skyChoice=n,u.classList.toggle("sky-static",t),u.classList.toggle("sky-live",!t),a.innerHTML=R$[n],a.setAttribute("aria-label",`${Cc[n]}. Tap for ${Cc[Lc[n]].toLowerCase()}.`)},l=()=>_c(s??new Date,n),c=()=>r(l()),d=()=>{i&&clearInterval(i),i=window.setInterval(()=>{s||c()},t?6e4:1e3)},g=p=>{n=p;try{localStorage.setItem(vt(Jd),n)}catch{}c()};a.addEventListener("click",()=>g(Lc[n])),document.documentElement.classList.toggle("sky-static",t),c(),d();const f=document.getElementById("mapWorld");f&&A$(f);try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change",()=>{const u=Mc();document.documentElement.classList.toggle("sky-static",u),document.documentElement.classList.toggle("sky-live",!u)})}catch{}try{matchMedia(U$).addEventListener?.("change",()=>ri())}catch{}return window.addEventListener("resize",()=>ri()),new MutationObserver(()=>ri()).observe(document.body,{attributes:!0,attributeFilter:["class"]}),{choice:()=>n,look:()=>o,setChoice(p){g(p)},freeze(p){s=p,c()}}}function ri(){const e=document.getElementById("skyMount"),t=document.getElementById("menuDaySlot");e&&t&&e.parentElement!==t&&t.appendChild(e),t&&(t.hidden=!1),e&&(e.style.left="",e.style.top="")}function A$(e){const t=document.createElement("div");t.className="skyTint",t.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="skyLamps",n.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="skyBits",s.setAttribute("aria-hidden","true"),s.innerHTML='<i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i>';const o=()=>{e.contains(t)||e.appendChild(t),e.contains(n)||e.appendChild(n),e.contains(s)||e.appendChild(s)};o(),new MutationObserver(o).observe(e,{childList:!0})}function z$(){try{const e=localStorage.getItem(vt(Jd));if(H$(e))return e}catch{}return"auto"}const ks=[{name:"Pink",fill:"#ff7eb3",ink:"#9d174d"},{name:"Lilac",fill:"#c9b3ff",ink:"#5f3dc4"},{name:"Aqua",fill:"#66d9e8",ink:"#0b7285"},{name:"Gold",fill:"#ffd43b",ink:"#e67700"}],qe="#5a3d5c",Ta=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Sc=e=>typeof e=="number"?e:{skip:10,rev:11,d2:12,wild:13,w4:14}[e]??0,Bc=e=>typeof e.v=="number"?String(e.v):e.v==="skip"?"✕":e.v==="rev"?"↻":e.v==="d2"?"+2":e.v==="w4"?"+4":"♛",D$=e=>e.v==="skip"?"Nope":e.v==="rev"?"Flip":e.v==="d2"?"+2":e.v==="wild"||e.v==="w4"?"Crown":"",jn=(e,t,n=1,s="#ffd43b")=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 -6 L1.4 -1.4 L6 -1 L1.6 1.4 L3 6 L0 3 L-3 6 L-1.6 1.4 L-6 -1 L-1.4 -1.4 Z" fill="${s}" stroke="${qe}" stroke-width="1" stroke-linejoin="round"/>`,li=(e,t,n=1)=>`<path transform="translate(${e} ${t}) scale(${n})" d="M0 1.2 C-2.2 -1.6 -5.2 -0.6 -3.6 2.2 C-2.4 4 0 5.2 0 5.2 C0 5.2 2.4 4 3.6 2.2 C5.2 -0.6 2.2 -1.6 0 1.2 Z" fill="#ff4d94" stroke="${qe}" stroke-width="1"/>`;function Z$(e){return e.v==="wild"||e.v==="w4"?`<g transform="translate(14 28)">
      <path d="M4 26 L10 8 L18 16 L24 2 L30 16 L38 8 L44 26 Z" fill="#ffd43b" stroke="${qe}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="4" y="26" width="40" height="8" rx="2" fill="#ffd43b" stroke="${qe}" stroke-width="2.2"/>
      <circle cx="10" cy="8" r="2.4" fill="#ff7eb3"/><circle cx="24" cy="3" r="2.4" fill="#66d9e8"/><circle cx="38" cy="8" r="2.4" fill="#d0bfff"/>
      ${jn(-2,0,.7)}${jn(46,4,.65,"#fff")}${jn(22,-4,.55,"#ff7eb3")}
    </g>${e.v==="w4"?`<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${qe}" font-family="Nunito, ui-rounded, system-ui, sans-serif">+4</text>`:""}`:e.v==="d2"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff" stroke="${qe}" stroke-width="2.4"/>
      ${li(14,8,1.35)}${li(32,8,1.35)}
      <path d="M12 26 Q23 34 34 26" fill="none" stroke="${qe}" stroke-width="2.4" stroke-linecap="round"/>
      ${li(40,22,.8)}
    </g>`:e.v==="rev"?`<g fill="none" stroke="${qe}" stroke-width="3.2" stroke-linecap="round">
      <path d="M16 40 C42 22 54 52 34 60 C16 68 12 46 30 40"/>
      <path d="M14 38 L22 30 L24 42" stroke-linejoin="round"/>
    </g>${jn(48,28,.85)}${jn(20,62,.6,"#ff7eb3")}${jn(50,58,.55,"#66d9e8")}`:e.v==="skip"?`<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff6d8" stroke="${qe}" stroke-width="2.4"/>
      <rect x="8" y="12" width="14" height="9" rx="3" fill="#2b1430"/><rect x="24" y="12" width="14" height="9" rx="3" fill="#2b1430"/>
      <path d="M22 16.5 H24 M5 14 H2 M41 14 H44" stroke="${qe}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 27 Q23 32 34 27" fill="none" stroke="${qe}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`:""}function pr(e){const t=e.c===4,n=t?{fill:"#fff8ee",ink:qe}:ks[e.c]??ks[0],s=typeof e.v=="number",o=D$(e),i=t?'<rect x="2" y="2" width="66" height="96" rx="13" fill="#fff8ee" stroke="#ff7eb3" stroke-width="4"/><rect x="5" y="5" width="60" height="90" rx="11" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="7.5" y="7.5" width="55" height="85" rx="9" fill="none" stroke="#66d9e8" stroke-width="1.6"/><rect x="9.5" y="9.5" width="51" height="81" rx="8" fill="none" stroke="#ffd43b" stroke-width="1.6"/>':`<rect x="2" y="2" width="66" height="96" rx="13" fill="${n.fill}" stroke="${qe}" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`,a='<ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/>',r=`fill="${n.ink}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif"`,l=`<text x="8" y="16" font-size="13" font-weight="900" ${r}>${Bc(e)}</text>`+(s?`<text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" ${r}>${Bc(e)}</text>`:""),c=s?`<text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="${n.ink}" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${e.v}</text>`:`${Z$(e)}${o?`<text x="35" y="92" text-anchor="middle" font-size="12" font-weight="900" ${r}>${o}</text>`:""}`;return`<svg viewBox="0 0 70 100">${i}${a}${l}${c}</svg>`}const q$=[[18,28],[40,28],[29,46],[18,64],[40,64],[29,78]].map(([e,t])=>li(e,t,.9)).join(""),I$=`<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff4d94" stroke="${qe}" stroke-width="3"/>
  <rect x="7" y="7" width="56" height="86" rx="10" fill="none" stroke="#ffd43b" stroke-width="3"/>
  <rect x="11" y="11" width="48" height="78" rx="8" fill="#ff7eb3"/>
  ${q$}
  <circle cx="35" cy="50" r="14" fill="#fff6fb" stroke="${qe}" stroke-width="2.4"/>
  ${jn(35,50,1.15,"#ffd43b")}
</svg>`,tg=(e,t)=>{if(t.turn<0||t.drawn!=null&&e.id!==t.drawn)return!1;const n=t.top;return e.c===4||e.c===t.color||e.v===n.v&&n.c!==4};let ur=null,at=null,ps=-1,Hc=-1;function Pc(e,t){ur=e;const n=t.table,s=n.view;if(!s||!s.top){e.innerHTML="";return}n.tb!==Hc&&(at=null,ps=-1,Hc=n.tb);const o=n.you,i=o!==null&&Array.isArray(s.hand)?s.hand.slice():[];at!==null&&!i.some(h=>h.id===at)&&(at=null);const a=s.ev;let r=null;if(a&&a.n!==ps&&ps>=0&&a.k==="play"&&a.card){const h=e.querySelector(`[data-card="${a.card.id}"]`)||e.querySelector(`[data-p="${a.p}"]`);h&&(r=h.getBoundingClientRect())}const c=n.phase==="play"&&s.turn>=0,d=c&&o!==null&&s.turn===o,g=o!==null&&i.length<=2&&i.length>0&&!s.slay?.[o]&&d,f=d&&s.drawn==null&&n.phase==="play",p=d&&s.drawn!=null&&n.phase==="play",u=i.sort((h,v)=>h.c-v.c||Sc(h.v)-Sc(v.v)),b=c?n.players[s.turn]:"",M=c?d?"Your turn!":`${Ta(t.name(b))}'s turn`:"",m=ks[s.color]??ks[0];if(e.innerHTML=`<div class="slayFelt">
    ${M?`<div class="whose ${d?"yours":""}" id="whoseTurn">${M}<span class="slayDir" aria-hidden="true">${s.dir===1?"→":"←"}</span></div>`:""}
    <div class="slayOpps">${n.players.map((h,v)=>v===o?"":`<div class="slayOpp ${s.turn===v?"isTurn":""}" data-p="${v}" data-count="${s.counts?.[v]??0}"><span class="chipFace">${t.face(h)}</span><b>${Ta(t.name(h))}</b><span class="cnt">${s.counts?.[v]??0}</span>${t.away(h)?'<i class="awayBadge">away</i>':""}${s.slay?.[v]?"<em>SLAY!</em>":""}</div>`).join("")}</div>
    <div class="slayPile">
      <button type="button" id="slayDeck" class="slayDeck" ${f?"":"disabled"} aria-label="Draw a card">${I$}<span>${s.deck??0}</span></button>
      <div id="slayDiscard" class="slayDiscard" data-top="${s.top.id}">${pr(s.top)}</div>
      <div class="nowColor" data-color="${s.color}" style="background:${m.fill}" aria-label="${m.name}"></div>
    </div>
    ${o===null?'<p class="watching">You are watching</p>':""}
    ${at!==null?`<div id="crownPick" class="crownPick"><p>Pick a color for your Crown!</p><div class="crownRow">${ks.map((h,v)=>`<button type="button" data-color="${v}" aria-label="${h.name}" style="background:${h.fill}"><span>${h.name}</span></button>`).join("")}</div></div>`:""}
    <div id="slayHand" class="slayHand ${d?"isTurn":""}">${u.map(h=>{const v=d&&n.phase==="play"&&tg(h,s),_=v?"can":d?"dim":"wait",P=typeof h.v=="number"?ks[h.c].name+" "+h.v:h.v==="wild"?"Crown":h.v==="w4"?"Crown plus 4":h.v==="d2"?"plus 2":h.v==="rev"?"Flip":"Nope";return`<button type="button" class="slayCard ${_} ${h.id===s.drawn?"justDrew":""} ${h.id===at?"picked":""}" data-card="${h.id}" data-c="${h.c}" data-v="${h.v}" aria-label="${Ta(P)}" ${v?"":"disabled"}>${pr(h)}</button>`}).join("")}</div>
    ${c&&o!==null?`<button type="button" id="slayCall" class="slayCall ${g?"ready":""}" ${g?"":"disabled"}>SLAY!</button>`:""}
    <button type="button" id="slayPass" class="slayPass ${p?"":"hidden"}" ${p?"":"disabled"}>Pass</button>
  </div>`,a&&a.n!==ps){const h=ps;if(ps=a.n,h>=0){if(a.k==="play"&&a.card){const v=e.querySelector("#slayDiscard");v&&O$(r,a.card,v.getBoundingClientRect()),a.card.v==="skip"?t.toast("Nope!"):a.card.v==="rev"?t.toast("Flip!"):a.card.v==="d2"?t.toast("+2!"):a.card.v==="w4"&&t.toast("Crown +4!"),t.sfx.swish()}a.vdrew&&t.toast("Forgot to say SLAY! Draw 2"),a.k==="slay"&&t.sfx.sparkle()}}}function O$(e,t,n){const s=document.createElement("div");s.className="flyCard",s.innerHTML=pr(t);const o=e?.width||70,i=e?.height||100;Object.assign(s.style,{left:(e?.left??innerWidth/2)+"px",top:(e?.top??80)+"px",width:o+"px",height:i+"px"}),document.body.appendChild(s),requestAnimationFrame(()=>{s.style.left=n.left+"px",s.style.top=n.top+"px",s.style.width=Math.max(n.width,70)+"px",s.style.height=Math.max(n.height,96)+"px"}),setTimeout(()=>s.remove(),560)}const N$={id:"slay",render:Pc,handle(e,t){const n=t.table.view,s=t.table.you;if(!n||t.table.phase!=="play"||s===null)return!1;const o=n.hand??[];if(e.closest("#slayCall"))return o.length<=2&&o.length>0&&!n.slay?.[s]&&(t.move({k:"slay"}),t.sfx.sparkle()),!0;if(e.closest("#slayDeck"))return n.turn===s&&n.drawn==null&&(at=null,t.move({k:"draw"}),t.sfx.click()),!0;if(e.closest("#slayPass"))return n.turn===s&&n.drawn!=null&&(at=null,t.move({k:"pass"}),t.sfx.click()),!0;const i=e.closest("#crownPick [data-color]");if(i&&at!==null)return t.move({k:"play",id:at,color:+i.dataset.color}),at=null,t.sfx.sparkle(),!0;const a=e.closest("#slayHand [data-card]");if(!a||a.hasAttribute("disabled"))return!!a;const r=+a.dataset.card,l=o.find(c=>c.id===r);return!l||n.turn!==s||!tg(l,n)||(l.c===4?(at=r,t.sfx.pop(),ur&&Pc(ur,t)):(at=null,t.move({k:"play",id:r}),t.sfx.click())),!0}},ng="#5a3d5c",Wc=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),j$=`<svg viewBox="0 0 48 48"><path d="M24 42 C8 30 2 22 7 13 C11 6 20 8 24 16 C28 8 37 6 41 13 C46 22 40 30 24 42 Z" fill="#ff4d94" stroke="${ng}" stroke-width="3" stroke-linejoin="round"/><path d="M16 16 Q20 12 22 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`,F$=`<svg viewBox="0 0 48 48"><path d="M24 3 L29 17 H44 L32 26 L37 42 L24 33 L11 42 L16 26 L4 17 H19 Z" fill="#66d9e8" stroke="${ng}" stroke-width="3" stroke-linejoin="round"/><path d="M24 12 L26 18 H22 Z" fill="#fff" opacity=".8"/></svg>`,V$={id:"four",render(e,t){const n=t.table,s=n.view;if(!s||!Array.isArray(s.b)){e.innerHTML="";return}const o=n.you,i=o!==null&&s.turn===o&&n.phase==="play",a=new Set((s.line??[]).map(([b,M])=>b+":"+M)),r=s.last;let l="";for(let b=0;b<7;b++){const M=s.b[b];let m="";for(let v=5;v>=0;v--){const _=v<M.length?M[v]:null,P=a.has(b+":"+v)?" hot":"",R=r&&r.col===b&&r.row===v?" just":"";m+=`<span class="fourCell${_===0?" heart":_===1?" star":""}${P}${R}">${_===0?j$:_===1?F$:""}</span>`}const h=i&&M.length<6;l+=`<button type="button" class="fourCol" data-col="${b}" ${h?"":"disabled"} aria-label="Drop in column ${b+1}">${m}<span class="dropHint">${h?"▼":""}</span></button>`}const c=n.phase==="play"&&s.turn>=0,d=c?n.players[s.turn]:"",g=c?i?"Your turn!":`${Wc(t.name(d))}'s turn`:"",f=o===0?"You are <b>pink hearts</b>":o===1?"You are <b>aqua stars</b>":"Pink hearts and aqua stars",p=b=>b===0?"♥":"★",u=n.players.map((b,M)=>`<div class="playerChip ${s.turn===M?"isTurn":""}"><span class="chipFace">${t.face(b)}</span><b>${Wc(t.name(b))} ${p(M)}</b>${t.away(b)?'<i class="awayBadge">away</i>':""}</div>`).join("");e.innerHTML=`<div class="fourPlay">
      ${g?`<div class="whose ${i?"yours":""}" id="whoseTurn">${g}</div>`:""}
      <div class="fourChips">${u}</div>
      <p class="fourLegend">${f}</p>
      <div class="fourBoard" id="fourBoard">${l}</div>
    </div>`},handle(e,t){const n=e.closest(".fourCol");if(!n)return!1;const s=t.table.view,o=t.table.you;if(n.hasAttribute("disabled")||!s||o===null||s.turn!==o||t.table.phase!=="play")return!0;const i=+n.dataset.col;return!Number.isInteger(i)||s.b[i].length>=6||(t.move({col:i}),t.sfx.click()),!0}},Tc={slay:N$,four:V$},Ko=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),G$={notHere:"Come into the clubhouse first!",taken:"Someone is sitting there!",playing:"You are already in this game!",playingElsewhere:"Finish your other game first!",notHost:"Waiting for the host…",needMore:"Play with friends on your street",tooMany:"That table is full!",notPlaying:"The game has not started!",notPlayer:"Sit down to play!",illegal:"You can't play that!",notAway:"She is still here!",tooSoon:"Give her a moment!",notSeated:"You are not at this table!",noMove:"No move to play!"};function Y$(e){const t=document.getElementById("tableOverlay");let n=null,s="",o=0;const i=m=>m.away==null?0:m.away+Math.max(0,Date.now()-(m.receivedAt??Date.now())),a=()=>{o&&(clearInterval(o),o=0)},r=m=>{const h=!!m&&m.phase==="play"&&m.away!=null&&n!==null;h&&!o&&(o=window.setInterval(()=>g(),1e3)),h||a()},l=()=>e.hood(),c=()=>{const m=l();return!m||n===null?null:m.tables.get(n)??null},d=m=>{const h=l();return{table:m,me:h.pid,name:v=>h.players.get(v)?.nickname??"friend",face:v=>{const _=h.players.get(v)?.look;return _?Hr(Fe(_)):""},move:v=>h.tbl({op:"move",tb:m.tb,m:v}),away:v=>{if(v===h.pid)return!1;const _=h.players.get(v);if(_&&!_.online)return!0;const P=h.presence.get(v);return!P||P.where!=="gameroom"},toast:e.toast,sfx:e.sfx}};t.addEventListener("click",m=>{const h=m.target;if(h.closest("#tblBack")){p(),e.sfx.swish();return}if(h.closest("#tblLeave")){u();return}if(h.closest("#tblStart")){b();return}if(h.closest("#tblNudge")){M();return}const v=c();v&&Tc[v.game]?.handle(h,d(v))});function g(){const m=l(),h=c();if(!m||!h){t.classList.add("hidden"),t.innerHTML="",a();return}const v=rd[h.game],_=m.pid,P=h.seats.includes(_),R=h.seats.filter(Boolean).length,T=h.phase==="play"&&h.you!==null&&h.view&&h.view.turn===h.you,N=h.view?.winPid??null;let X="";if(h.phase==="over"){const nt=N?m.players.get(N)?.nickname??"Friend":"";h.game==="slay"?X=N?N===_?"You slayed!":`${Ko(nt)} slayed!`:"It's a tie!":X=h.view?.draw||!N?"It's a tie!":N===_?"You got four!":`${Ko(nt)} got four!`;const Qo=h.tb+":"+h.seq;N===_&&s!==Qo&&(s=Qo,e.confetti(),e.sfx.sparkle())}const J=i(h),Z=h.phase==="play"&&P&&J>=Ch&&h.you!==null&&!!h.view&&h.view.turn!==h.you&&h.view.turn>=0,se=h.phase!=="play"&&h.host===_&&R>=v.minPlayers&&R<=v.maxPlayers,on=P&&h.phase==="lobby"&&h.host!==_&&R>=v.minPlayers,St=P&&h.phase==="lobby"&&R<v.minPlayers;t.classList.remove("hidden"),t.dataset.tb=String(h.tb),t.dataset.phase=h.phase,t.dataset.game=h.game,t.dataset.you=h.you===null?"":String(h.you),t.innerHTML=`<div class="tblCard ${T?"yourTurn":""} game-${h.game}">
      <div class="tblTop"><h2>${Ko(v.name)}</h2><div class="seatDots">${h.seats.map(nt=>`<i class="${nt?"on":""} ${nt===_?"me":""}"></i>`).join("")}</div></div>
      ${X?`<div class="winWrap"><div class="winBanner" id="winBanner">${X}</div></div>`:""}
      <div id="tblStage"></div>
      <div class="tblBar">
        ${se?'<button type="button" id="tblStart">Start</button>':""}
        ${on?'<p class="tblWait">Waiting for the host…</p>':""}
        ${Z?'<button type="button" id="tblNudge">Play for her</button>':""}
        <button type="button" id="tblBack">Back to room</button>
        <button type="button" id="tblLeave">Leave table</button>
      </div>
      ${St?'<p class="tblWait" id="needFriend">Play with friends on your street</p>':""}
    </div>`;const ft=t.querySelector("#tblStage");h.phase==="lobby"||!h.view?ft.innerHTML=f(h,m,_):Tc[h.game]?.render(ft,d(h)),r(h)}function f(m,h,v){return`<div class="lobby">${m.seats.map((_,P)=>`<div class="lobbySeat ${_?"filled":""} ${_===v?"me":""}">
      <span>${P+1}</span><b>${_?Ko(h.players.get(_)?.nickname??"friend"):"Empty"}</b>
      ${_&&_===m.host?"<i>host</i>":""}${_===v?"<i>you</i>":""}
    </div>`).join("")}</div>`}function p(){n=null,a(),t.classList.add("hidden"),t.innerHTML=""}function u(){const m=l(),h=c();m&&h&&h.seats.includes(m.pid)&&m.tbl({op:"leave",tb:h.tb}),e.sfx.click(),p()}function b(){const m=l(),h=c();m&&h&&(m.tbl({op:"start",tb:h.tb}),e.sfx.sparkle())}function M(){const m=l(),h=c();m&&h&&(m.tbl({op:"nudge",tb:h.tb}),e.sfx.click())}return{open(m){n=m,g()},close:p,refresh:g,fail(m,h){e.toast(G$[h]||"Try that again!"),e.sfx.pop(),n===m&&g()},isOpen:()=>n}}const K$=120,X$=192,J$=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let q=null,xn=null,Gt=null,Rc=!1;const Tn=()=>(document.getElementById("gameroom")?.clientHeight||600)/Ci,ci=()=>xn;function Rs(){const e=q?.hood();if(!e)return null;for(const[t,n]of e.tables){const s=n.seats.indexOf(e.pid);if(s>=0){const o=Po(Number(t))[s];return{tb:Number(t),seat:s,x:o.x,y:o.y}}}return null}function e3(){const e=q?.hood();if(!e)return!1;for(const[t,n]of e.players)if(t!==e.pid&&n.online)return!0;return!1}function t3(e){if(q=e,xn=Y$({hood:e.hood,toast:e.toast,confetti:()=>kd(),sfx:e.sfx}),Rc)return xn;Rc=!0;const t=document.getElementById("grWorld");return t.addEventListener("click",s3),t.addEventListener("pointerdown",n=>{n.target.closest(".grChair, .grTable, .grDoor, .pet")&&n.stopPropagation()}),xn}function el(){if(!q)return;const e=Tn(),t=document.getElementById("grWorld"),n=o=>o*e+"px";t.style.width=Xi*e+"px",t.style.height=Ci*e+"px",t.style.setProperty("--sc",String(e));let s=r$();s+=`<button class="grDoor" data-gr="map" aria-label="Back to the map" style="left:${n(78)};top:${n(268)};width:${n(86)};height:${n(170)}"></button>`,mo.forEach((o,i)=>{const a=o.seats>=6?560:o.seats>=4?440:340;s+=`<button class="grTable" data-tb="${i}" aria-label="${rd[o.game].name} table" style="left:${n(o.x-a/2)};top:${n(456)};width:${n(a)};height:${n(70)}"></button>`,Po(i).forEach((r,l)=>{const c=76*e,d=72*e,g=Math.max(c,44),f=Math.max(d,44),p=(r.x-38)*e-(g-c)/2,u=(r.y-16)*e-(f-d)/2;s+=`<button class="grChair" data-tb="${i}" data-seat="${l}" aria-label="Empty chair" style="left:${p}px;top:${u}px;width:${g}px;height:${f}px"></button>`})}),s+='<div class="savatars" id="gavatars"></div>',t.innerHTML=s,go()}function go(){if(!q||q.view()!=="gameroom")return;const e=document.getElementById("gavatars");if(!e)return;const t=Tn(),n=new Set;for(const i of n3()){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&a3(a));const r=JSON.stringify(i.look)+i.name+(i.away?":away":"");if(a.dataset.look!==r){const f=a.querySelector(".bubble");a.innerHTML=`<div class="inner">${Fe(i.look)}</div>${i.name?`<div class="nametag">${J$(i.name)}${i.away?'<i class="awayBadge">away</i>':""}</div>`:""}`,f&&a.appendChild(f),a.dataset.look=r}const l=(Bo[i.look.size]??1)*t*.95,c=K$*l,d=X$*l,g=i.seated?i.y-8:i.y;a.style.left=i.x*t-c/2+"px",a.style.top=g*t-d+"px",a.style.width=c+"px",a.style.height=d+"px",a.style.zIndex=String(100+Math.round(i.y)),a.classList.toggle("flipped",i.flip),a.classList.toggle("away",i.away),a.classList.toggle("seated",i.seated),So(a,i.look,i.mine)}e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),q.refreshNear();const s=q.hood();document.querySelectorAll("#grWorld .grChair").forEach(i=>{const a=s?.tables.get(+i.dataset.tb)?.seats[+i.dataset.seat];i.classList.toggle("taken",!!a);const r=a?s.players.get(a)?.nickname:"";i.setAttribute("aria-label",r?r+" is sitting":"Empty chair")});const o=document.getElementById("grSolo");o&&o.classList.toggle("hidden",e3())}function n3(){const e=[],t=q.hood();if(t){const n=new Map;for(const[a,r]of t.tables)r.seats.forEach((l,c)=>{l&&n.set(l,Po(Number(a))[c])});const s=[...t.presence.entries()],o=q.myPres();o&&s.push([t.pid,o]);const i=new Set;for(const[a,r]of s){if(r.where!=="gameroom")continue;const l=t.players.get(a);if(!l)continue;i.add(a);const c=n.get(a);e.push({key:a,look:l.look,name:l.nickname,x:c?.x??r.x,y:c?.y??r.y,flip:r.flip,mine:a===t.pid,away:!1,seated:!!c})}for(const[a,r]of n){if(i.has(a))continue;const l=t.players.get(a);l&&e.push({key:a,look:l.look,name:l.nickname,x:r.x,y:r.y,flip:!1,mine:!1,away:!0,seated:!0})}}else{const n=q.solo();if(n?.where==="gameroom"){const s=q.soloLook();e.push({key:"solo",look:s.look,name:"",x:n.x,y:n.y,flip:n.flip,mine:!0,away:!1,seated:!1})}}return e}function s3(e){if(!q||q.view()!=="gameroom")return;const t=e.target,n=t.closest(".savatar");if(n){const c=q.hood(),d=n.dataset.pid;if(c&&d){for(const[g,f]of c.tables)if(f.seats.includes(d)){xn?.open(Number(g));return}}return}if(t.closest('[data-gr="map"]')){q.goMap();return}const s=t.closest(".grChair");if(s){o3(+s.dataset.tb,+s.dataset.seat);return}const o=t.closest(".grTable");if(o){if(!q.hood()){sg();return}xn?.open(+o.dataset.tb),q.sfx.click();return}if(t.closest(".pet")||Rs())return;const i=document.getElementById("grWorld").getBoundingClientRect(),a=Tn(),r=(e.clientX-i.left)/a,l=(e.clientY-i.top)/a;l<430||(Gt={x:Math.max(60,Math.min(Xi-60,r)),y:Math.max(470,Math.min(590,l))})}function o3(e,t){if(!q)return;const n=q.hood();if(!n){sg();return}const s=n.tables.get(e)?.seats[t];if(s&&s!==n.pid){q.toast((n.players.get(s)?.nickname??"Someone")+" is sitting there!"),q.sfx.pop(),xn?.open(e);return}Gt=null,n.tbl({op:"sit",tb:e,seat:t});const o=Po(e)[t];q.setPres({where:"gameroom",x:o.x,y:Math.max(470,Math.min(590,o.y)),flip:!1}),xn?.open(e),q.sfx.click()}function sg(){if(!q)return;const e=document.getElementById("grSolo");e&&(e.classList.remove("hidden"),e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump")),q.toast("Play with friends on your street"),q.sfx.pop()}function i3(e){if(!q||q.view()!=="gameroom"||!Gt)return;if(Rs()){Gt=null;return}const t=q.hood()?q.myPres():q.solo();if(!t||t.where!=="gameroom"){Gt=null;return}const n=Gt.x-t.x,s=Gt.y-t.y,o=Math.hypot(n,s);if(o<4){Gt=null;return}const i=Math.min(o,300*e),a={where:"gameroom",x:t.x+n/o*i,y:t.y+s/o*i,flip:Math.abs(n)>2?n<0:t.flip};q.setPres(a);const r=Tn(),l=document.getElementById("grScroll"),c=a.x*r-l.scrollLeft;(c<l.clientWidth*.22||c>l.clientWidth*.78)&&(l.scrollLeft=a.x*r-l.clientWidth/2)}function a3(e){e.addEventListener("pointerdown",t=>{if(!q||Rs())return;const n=q.hood()?q.myPres():q.solo();if(!n||n.where!=="gameroom")return;t.preventDefault(),t.stopPropagation(),Gt=null;const s=Tn(),o=document.getElementById("grWorld"),i=document.getElementById("grScroll"),a=m=>{const h=o.getBoundingClientRect();return{x:(m.clientX-h.left)/s,y:(m.clientY-h.top)/s}},r=a(t),l={x:n.x-r.x,y:n.y-r.y};let c=t,d=0,g=n.x,f=!1;const p=m=>{const h=q.hood()?q.myPres():q.solo();if(!h||h.where!=="gameroom")return;const v=a(m),_=Math.max(60,Math.min(Xi-60,v.x+l.x)),P=Math.max(470,Math.min(590,v.y+l.y));if(!f&&Math.hypot(_-h.x,P-h.y)<6)return;f=!0;const R=Math.abs(_-g)>3?_<g:h.flip;Math.abs(_-g)>3&&(g=_),q.setPres({where:"gameroom",x:_,y:P,flip:R})},u=()=>{const m=i.getBoundingClientRect(),h=c.clientX<m.left+70?-12:c.clientX>m.right-70?12:0;h&&f&&(i.scrollLeft+=h,p(c)),d=requestAnimationFrame(u)};d=requestAnimationFrame(u),e.classList.add("lifted"),q.sfx.pick();const b=m=>{m.pointerId===t.pointerId&&(c=m,p(m))},M=m=>{m.pointerId===t.pointerId&&(cancelAnimationFrame(d),window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",M),e.classList.remove("lifted"),f&&q.sfx.drop())};window.addEventListener("pointermove",b),window.addEventListener("pointerup",M)})}const Js=_$(),ne=id();let Je=ne;const og=[],Uc=new WeakSet;function ig(e){Uc.has(e)||(Uc.add(e),e.subscribe((t,n)=>{Je===e&&og.forEach(s=>s(t,n))}))}ig(ne);const S={get:()=>Je.get(),dispatch(e){Je.dispatch(e)},subscribe:e=>{og.push(e)}},me=yn,Ne=io,ra=390;let de=1e3;const Wo=()=>Math.max(0,me-de),ag=375,rg=(e,t)=>e.wall?Math.min(t,ag):t,Rn=120,Qt=192,tl=[{id:"living",name:"Living Room",color:"#ff8fab"},{id:"bedroom",name:"Bedroom",color:"#b388d6"},{id:"kitchen",name:"Kitchen",color:"#5cc985"},{id:"salon",name:"Salon",color:"#f0a0d8"},{id:"nursery",name:"Nursery",color:"#9ad7f5"}],lg=e=>tl.find(t=>t.id===e)?.color??"#ccc",nl=Eb();yv(Zt,We);const Bs=[{id:"__people",name:"People",icon:"",kind:"people"},...["furniture","decor","plants","food","pets"].map((e,t)=>({id:e,name:e,icon:["armchair","balloon","flowers","donut","cat"][t],kind:"cat"}))];Bs.push({id:"secrets",name:"Secrets",icon:"egg:chloe-starlamp",kind:"cat"});for(const e of Zt)Bs.some(t=>t.kind==="cat"&&t.id===e.cat)||Bs.push({id:e.cat,name:e.cat,icon:e.kind,kind:"cat"});for(const e of Zt)e.pack&&!Bs.some(t=>t.id==="pack:"+e.pack)&&Bs.push({id:"pack:"+e.pack,name:bd(e.pack),icon:e.kind,kind:"pack"});const Ra=e=>Zt.filter(t=>Cw(t,e,S.get().currentRoom,sl==="all",na())),r3=["#ffd6e0","#d9ccff","#cdf3dc","#cfe8ff","#fff1b8","#ffe0c7","#ffffff","#f6c1ff"],l3=["#e8b98a","#f2d0a4","#c99366","#ffe7a8","#bfe3d0","#d6d6f5","#ffc8dd","#9fb4c7"],Pt={paint:'<svg viewBox="0 0 48 48"><path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M28 12 L34 6 L42 14 L36 20" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/></svg>',shirt:'<svg viewBox="0 0 48 48"><path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',soundOn:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 17 Q37 24 32 31 M36 12 Q45 24 36 36" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',soundOff:'<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ddd" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M33 19 L43 29 M43 19 L33 29" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>',flip:'<svg viewBox="0 0 48 48"><path d="M24 6 V42" stroke="#5a3d5c" stroke-width="3" stroke-dasharray="4 4"/><path d="M18 12 L6 36 H18 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M30 12 L42 36 H30 Z" fill="#fff" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',front:'<svg viewBox="0 0 48 48"><rect x="6" y="6" width="22" height="22" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="18" y="18" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',back:'<svg viewBox="0 0 48 48"><rect x="18" y="18" width="24" height="24" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="22" height="22" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>',trash:'<svg viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="28" rx="5" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><rect x="8" y="9" width="32" height="7" rx="3.5" fill="#ffadad" stroke="#5a3d5c" stroke-width="3"/><path d="M20 21 V35 M28 21 V35" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>'},c3='<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>',d3='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 15 H37 M11 24 H37 M11 33 H37" fill="none" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',g3='<svg class="mailGlyph" viewBox="0 0 48 48" aria-hidden="true"><g transform="translate(0 2)"><rect x="6" y="14" width="36" height="24" rx="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/><path d="M6 16 L24 30 L42 16" fill="none" stroke="#5a3d5c" stroke-width="3"/><path d="M34 12 V6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M34 6 H44 L40 10 L44 14 H34 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2"/></g></svg>',cg='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>',f3=document.getElementById("app");f3.innerHTML=`
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${rt.chat}<span class="badge" id="chatBadge"></span></button>
    <button class="round" id="btnMenu" aria-label="Menu" aria-expanded="false">${d3}<span class="badge" id="menuBadge"></span></button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${rt.home}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${Gp}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${Jw}</button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${Br}<span class="badge" id="mapBadge"></span></button>
  </div>
</div>
<div class="menuPop hidden" id="menuPop">
  <div class="menuCard" role="dialog" aria-label="Menu">
    <button type="button" class="close" id="menuClose" aria-label="Close">✕</button>
    <p class="menuGroup">My stuff</p>
    <button type="button" class="menuRow" id="btnPets" aria-label="Pets"><span class="mIco">${ud}</span><span class="mLabel">Pets</span></button>
    <button type="button" class="menuRow" id="btnDress" aria-label="Characters"><span class="mIco">${Pt.shirt}</span><span class="mLabel">Characters</span></button>
    <button type="button" class="menuRow" id="btnPaint" aria-label="Colors"><span class="mIco">${Pt.paint}</span><span class="mLabel">Wall &amp; floor colors</span></button>
    <button type="button" class="menuRow" id="secrets" aria-label="Surprises, 0 of 5"><span class="mIco secGift">🎁</span><span class="mLabel"><span class="secWord">Surprises </span><span class="secCount">0/5</span></span></button>
    <p class="menuGroup houseGroup">House</p>
    <button type="button" class="menuRow lockRow" id="btnLock" aria-label="Lock house"><span class="mIco" id="lockIco">${rt.lockOff}</span><span class="mLabel" id="lockLabel">Lock my house</span></button>
    <button type="button" class="menuRow mailRow" id="btnMail" aria-label="Mailbox"><span class="mIco">${g3}</span><span class="mLabel">Mailbox</span><span class="menuNew" id="mailNew"></span></button>
    <!-- Day / Night / Auto. The clock stays on Auto until she taps. -->
    <div id="menuDaySlot" class="menuSlot" hidden></div>
    <p class="menuGroup streetGroup">Street</p>
    <button type="button" class="menuRow grownRow" id="btnParent" aria-label="Grown-ups"><span class="mIco">${rt.shield}</span><span class="mLabel">Grown-ups</span></button>
    <button type="button" class="menuRow soloLeave" id="btnSolo" aria-label="Play in my own house"><span class="mIco">${rt.solo}</span><span class="mLabel">Play in my own house</span></button>
    <button type="button" class="menuRow friendRow" id="btnHood" aria-label="Friends"><span class="mIco">${rt.street}</span><span class="mLabel">Friends</span></button>
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
        <button data-a="flip">${Pt.flip}</button><button data-a="front">${Pt.front}</button><button data-a="back">${Pt.back}</button><button data-a="delete" class="danger">${Pt.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <div class="bin" id="bin">${Pt.trash}</div>
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
<div class="street mapView hidden" id="street"><div class="mapSky">${Sf}</div><div class="mapMeadow">${Bf}</div><button class="mailCue" id="mailCue" type="button">You've got mail!</button><div class="mapWorld" id="mapWorld"></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>
<div id="toastLane"></div>
<div class="phoneNote" id="phoneNote"><div class="card"><h2>Turn sideways</h2><p>Turn your phone sideways for more room to play!</p><button class="phoneOk" id="phoneOk" type="button">OK!</button></div></div>
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>
<div id="skyMount"></div>`;const $=e=>document.getElementById(e),I=$("stage"),dg=$("world"),ce=$("layer"),Xt=$("toolbar"),di=$("bin");let Be=null,we=S.get().characters[0]?.id??null,ut="furniture",sl="",mr="",h3=Date.now()%1e5;const yr=e=>`${e}-${Date.now().toString(36)}${(++h3).toString(36)}${Math.random().toString(36).slice(2,5)}`,Oe="__me";let k=null,C="house",ye=!1,$e="",Si=new Map,gg=!1;const tt=Ip($("modeToggle"),{ownHouse:()=>!k||!$e||$e===k.myHouseId(),onChange:()=>{gg&&(Us.matches?Bn():Un())}}),gi=Ep({send:(e,t,n,s)=>k?.sendMail(e,t,n,s),read:(e,t)=>k?.readMail(e,t),drop:(e,t)=>k?.dropMail(e,t),houseOf:e=>[...k?.players.values()??[]].find(t=>t.pid===e)?.houseId??"",houseName:e=>k?.houses.get(e)?.meta.name??"My House",lettersOf:e=>k?.houses.get(e)?.confirmed.mailbox?.letters??[],mine:e=>!!k&&k.houses.get(e)?.meta.ownerId===k.pid,toast:z,openOwn:()=>{const e=k?.myHouseId();e&&hl(e)},freeType:()=>!k||fd(k.settings)});tt.sync(!0);const eo=new Map,Bi={};let Y=Ws,xs=0;gg=!0;let vo=null;const la=()=>{cancelAnimationFrame(xs),vo=null},ol=e=>Math.max(0,Math.min(Wo(),e));function Ae(e){Y=ol(e),Bi[S.get().currentRoom]=Y,dg.style.transform=`translate3d(${-Y}px,0,0)`,$("nudgeL").classList.toggle("off",Y<=1),$("nudgeR").classList.toggle("off",Y>=Wo()-1);const t=$("mmView");t.style.left=Y/me*100+"%",t.style.width=de/me*100+"%",Be&&Lg(S.get())}function ca(e){cancelAnimationFrame(xs),e=ol(e),vo=e;const t=()=>{const n=e-Y;if(Math.abs(n)<.5){Ae(e),vo=null;return}Ae(Y+n*.18),xs=requestAnimationFrame(t)};xs=requestAnimationFrame(t)}const je=()=>I.getBoundingClientRect().width/de,p3="(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)",Us=window.matchMedia(p3);function u3(){const e=Us.matches;document.body.classList.toggle("phone",e),document.body.classList.toggle("phone-portrait",e&&window.matchMedia("(orientation: portrait)").matches);const t=$("stageWrap");for(const n of[$("nudgeL"),$("nudgeR")]){const s=e?t:I;n.parentElement!==s&&s.appendChild(n)}}function fg(){const e=document.querySelector(".top");if(!e)return;const t=e.getBoundingClientRect(),n=document.body.classList.contains("phone")?t.bottom:t.height;document.documentElement.style.setProperty("--chrome-h",Math.ceil(n)+"px"),hg()}function hg(){const e=document.querySelector(".top");if(!e)return;const t=Math.ceil(e.getBoundingClientRect().bottom+16)+"px",n=document.getElementById("mailCue");n&&(n.style.top=t);const s=document.getElementById("toastLane");s&&(s.style.top=t)}function m3(){const e=document.documentElement,t=document.getElementById("app");if(!(document.body.classList.contains("phone")&&!document.body.classList.contains("phone-portrait"))){t.style.top="",t.style.height="",t.style.bottom="",e.style.removeProperty("--vvh"),e.style.removeProperty("--vvt");return}const s=window.visualViewport,o=Math.round(s?s.height:window.innerHeight),i=Math.round(s?s.offsetTop:0);e.style.setProperty("--vvh",o+"px"),e.style.setProperty("--vvt",i+"px"),t.style.top=i+"px",t.style.height=o+"px",t.style.bottom="auto"}function Un(){u3(),m3(),fg();const e=$("stageWrap"),t=document.body.classList.contains("phone"),n=e.clientWidth,s=e.clientHeight;if(t?s>n*.85:s>n+40){const a=n/Math.max(1,s);de=Math.round(Math.max(480,Math.min(860,Ne*a)))}else if(t){const a=n/Math.max(1,s);de=Math.round(Math.max(480,Math.min(me,Ne*a)))}else de=1e3;I.style.width=de+"px",I.style.height=Ne+"px";const i=Math.min(n/de,s/Ne);if(I.style.left="",I.style.top="",I.style.transform=`translate(-50%,-50%) scale(${i})`,I.style.setProperty("--yard-sc",String(i||1)),t&&I.style.setProperty("--fit",String(je())),pg(),Y>Wo())Ae(Y);else{const a=$("mmView");a.style.left=Y/me*100+"%",a.style.width=de/me*100+"%"}He(),!t&&C==="house"&&To(!1),x3(),C==="ranch"&&requestAnimationFrame(Cr),C==="gameroom"&&requestAnimationFrame(uf),Qs(),t&&C==="ranch"&&U5(),ug(),tt.hint(),ba(),Jn()}function pg(){const e=$("stageWrap"),t=document.body.classList.contains("phone")&&C==="house";for(const n of[$("nudgeL"),$("nudgeR")]){if(!t||n.parentElement!==e){n.style.marginTop="",n.style.left="",n.style.right="",n.style.top="";continue}const s=I.getBoundingClientRect(),o=e.getBoundingClientRect(),i=(s.top+s.bottom)/2-o.top;n.style.top=i+"px",n.style.marginTop=-n.offsetHeight/2+"px",n.style.left="",n.style.right=""}}function ug(){document.body.classList.remove("secrets-chrome"),$("secrets")?.classList.remove("compact")}function He(e=0){if(!document.body.classList.contains("phone"))return;if(C==="house"){mg();return}const t=C==="park"?"parkScroll":C==="ranch"?"ranchScroll":C==="gameroom"?"grScroll":"";if(!t)return;const n=document.getElementById(t);if(!n||n.clientWidth<20){e<8&&requestAnimationFrame(()=>He(e+1));return}const s=n.querySelector(".savatar.mine")??n.querySelector(".savatar");if(!s){e<8&&requestAnimationFrame(()=>He(e+1));return}k3(n,[s,...s.querySelectorAll(".nametag")])&&e<8?requestAnimationFrame(()=>He(e+1)):y3()}function y3(){Di()&&(C==="gameroom"&&pf([...document.querySelectorAll(".neonSignArt")],document.getElementById("grScroll")),C==="ranch"&&!ye&&(mf(),Cl()))}function k3(e,t){const s=e.getBoundingClientRect(),o=Math.min(s.right,window.innerWidth)-8,i=Math.max(s.left,0)+8;let a=0,r=0;for(const c of t){const d=c.getBoundingClientRect();d.width<2||d.height<2||(a=Math.max(a,d.right-o),r=Math.max(r,i-d.left))}if(a<=1&&r<=1)return!1;const l=e.scrollLeft;return a>1&&r>1?e.scrollLeft-=r:a>1?e.scrollLeft+=a:e.scrollLeft-=r,Math.abs(e.scrollLeft-l)>.5}function mg(){To(!1)}function To(e){if(C!=="house"||os)return;if(S.get().currentRoom==="backyard"){Math.abs(Y-nr)>.5&&Ae(nr),Jn();return}const t=document.querySelector("#layer .char.avatar.mine")??document.querySelector("#layer .char");if(!t)return;const n=je()||1,s=I.getBoundingClientRect(),o=8;let i=Math.min(s.right,window.innerWidth)-o,a=Math.max(s.left,0)+o;for(const u of["nudgeL","nudgeR"]){const b=$(u);if(!b||b.classList.contains("off")||b.offsetParent===null)continue;const M=b.getBoundingClientRect();M.width<2||M.height<2||(u==="nudgeL"?a=Math.max(a,M.right+6):i=Math.min(i,M.left-6))}i-a<48&&(i=Math.min(s.right,window.innerWidth)-o,a=Math.max(s.left,0)+o);const r=[t,...t.querySelectorAll(".nametag")];let l=0,c=0,d=1/0,g=-1/0;for(const u of r){const b=u.getBoundingClientRect();b.width<2||b.height<2||(l=Math.max(l,b.right-i),c=Math.max(c,a-b.left),d=Math.min(d,b.left),g=Math.max(g,b.right))}if(document.body.classList.contains("phone-portrait")&&d<1/0){const u=(d+g)/2-(a+i)/2;if(Math.abs(u)>3){Ae(Y+u/n),Jn();return}}const f=b3(t),p=Sw({cam:Y,maxCam:Wo(),kidX:f,overflowL:c,overflowR:l,scale:n,nudgeX:e});Math.abs(p.cam-Y)>.5&&Ae(p.cam),e&&Math.abs(p.kidX-f)>.5&&v3(t,p.kidX),Jn()}function b3(e){if(e.dataset.pid&&k){const t=e.dataset.pid===k.pid?be():k.presence.get(e.dataset.pid);if(t&&t.where==="house")return t.x}return S.get().characters.find(t=>t.id===e.dataset.cid)?.x??0}function v3(e,t){if(e.dataset.pid&&k&&e.classList.contains("mine")){const o=be();if(!o||o.where!=="house")return;Qe({...o,x:t}),Pn();return}const n=e.dataset.cid;if(!n)return;const s=S.get().characters.find(o=>o.id===n);s&&S.dispatch({type:"char/move",id:n,room:S.get().currentRoom,x:t,y:s.y})}const w3={living:"Living",bedroom:"Bed",kitchen:"Kitchen",salon:"Salon",nursery:"Nursery"};function yg(){const e=C==="house",t=document.body.classList.contains("phone-portrait"),n=e&&!tt.isPlay(),s=e&&de+1<me,o=e&&(t?n:n||s);document.body.classList.toggle("show-minimap",o)}const $3='<svg class="tabIco" width="14" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6 L8 1 L15 6 V11 H1 Z" fill="currentColor"/></svg>';function kg(){return document.body.classList.contains("phone")?window.matchMedia("(max-width: 700px)").matches:!1}function x3(){const e=kg()?"c":"f";yg(),e!==mr&&(mr=e,_g(S.get()))}function il(){Us.matches?Bn():Un()}window.addEventListener("resize",il);Us.addEventListener("change",il);let Ec="",Ua=!1;function Qc(){const e=$("stageWrap"),t=document.querySelector(".top"),n=document.querySelector(".tools"),s=a=>a?a.clientWidth+"x"+a.clientHeight:"0",o=window.visualViewport;return(o?Math.round(o.offsetTop)+"x"+Math.round(o.height)+"x"+Math.round(o.width):"")+" "+s(e)+" "+s(t)+" "+s(n)}function bg(){const e=$("modeToggle"),t=document.querySelector(".tools"),n=document.getElementById("modeDock"),s=document.querySelector(".drawerTop");if(!e||!t||!n||!s)return!1;const o=document.body.classList.contains("phone"),i=o&&!document.body.classList.contains("phone-portrait"),a=i?t:o?n:s,r=e.parentElement===a;return n.hidden=!o||i,r?!1:(i?t.insertBefore(e,t.firstChild):o?n.appendChild(e):s.insertBefore(e,s.firstChild),!0)}function _3(){if(S.get().currentRoom==="backyard"||!document.body.classList.contains("phone-portrait")||!document.body.classList.contains("mode-play")||C!=="house")return;const e=$("stageWrap"),t=e.clientWidth,n=e.clientHeight;if(t<20||n<20||!(n>t*.85))return;const s=Math.max(280,Math.min(860,Math.round(Ne*t/n)));if(Math.abs(s-de)<2)return;de=s,I.style.width=de+"px",I.style.height=Ne+"px";const o=Math.min(t/de,n/Ne);if(I.style.transform=`translate(-50%,-50%) scale(${o})`,I.style.setProperty("--fit",String(je())),Y>Wo())Ae(Y);else{const i=$("mmView");i.style.left=Y/me*100+"%",i.style.width=de/me*100+"%"}pg(),yg()}function Bn(){if(Ua||!Us.matches)return;const e=bg(),t=Qc()+(document.body.classList.contains("mode-play")?"p":"d");if(!(!e&&t===Ec)){Ua=!0;try{Un(),_3(),He(),Ec=Qc()+(document.body.classList.contains("mode-play")?"p":"d")}finally{Ua=!1}}}if(typeof ResizeObserver<"u"){const e=new ResizeObserver(()=>Bn()),t=document.querySelector(".top");t&&e.observe(t),e.observe($("stageWrap"));const n=document.querySelector(".tools");n&&e.observe(n)}window.visualViewport&&(window.visualViewport.addEventListener("resize",()=>Bn()),window.visualViewport.addEventListener("scroll",()=>Bn()));I.addEventListener("scroll",()=>{I.scrollLeft=0,I.scrollTop=0});const At=(e,t)=>{const n=I.getBoundingClientRect();return{x:(e-n.left)/n.width*de+Y,y:(t-n.top)/n.height*Ne}},kr=(e,t)=>{const n=I.getBoundingClientRect();return e>n.left&&e<n.right&&t>n.top&&t<n.bottom},Ac=(e,t)=>{const n=di.getBoundingClientRect();return e>n.left-20&&e<n.right+20&&t>n.top-20&&t<n.bottom+20},Ro=e=>Bo[e.size]??1;function M3(e,t){const n=Ro(e),s=oa(e)[t];let o=s.x;return e.flip&&(o=100-o),{x:e.x+(o-50)/100*Rn*n,y:e.y-Qt*n+s.y/160*Qt*n}}function vg(e){const t=S.get();let n=null;for(const s of t.characters){if(s.room!==t.currentRoom)continue;const o=Ro(s),i=Math.abs(e.x-s.x)<Rn*o/2+25&&e.y>s.y-Qt*o-25&&e.y<s.y+20;for(const a of["left","right"]){if(s.held[a])continue;const r=M3(s,a),l=Math.hypot(e.x-r.x,e.y-r.y);(i||l<75)&&(!n||l<n.d)&&(n={c:s,hand:a,d:l})}}return n}const wg=["none","radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)","repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)","linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)"],$g="repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 125px), linear-gradient(rgba(0,0,0,.06), transparent 50%)",br=e=>`url('${e.replace(/'/g,"%27")}')`;function xg(e){const t=e.rooms[e.currentRoom],n=$("wall"),s=$("floor"),o=t.wallTile?nc[t.wallTile]:void 0;n.style.backgroundColor=t.wallpaper,o?(n.style.backgroundImage=br(o.url),n.style.backgroundSize="220px auto",n.style.backgroundPosition="0 0"):(n.style.backgroundImage=wg[t.pattern]??"none",n.style.backgroundSize=t.pattern===1?"44px 44px":t.pattern===3?"60px 60px":"auto",n.style.backgroundPosition=t.pattern===3?"0 0, 30px 30px":"0 0");const i=t.floorTile?nc[t.floorTile]:void 0;s.style.backgroundColor=t.floor,s.style.backgroundImage=i?`${br(i.url)}, linear-gradient(rgba(0,0,0,.06), transparent 50%)`:$g,s.style.backgroundSize=i?"180px auto, auto":"auto",$("mmWall").style.background=t.wallpaper,$("mmFloor").style.background=t.floor,Mg(e)}function al(e){const n=e.rooms[e.currentRoom].items.filter(o=>We[o.kind]).map(o=>`<i style="left:${o.x/me*100}%;top:${(o.y-ct(We[o.kind])*o.scale/2)/Ne*100}%"></i>`).join(""),s=e.characters.filter(o=>o.room===e.currentRoom).map(o=>`<b style="left:${o.x/me*100}%;top:${(o.y-90)/Ne*100}%;background:${o.shirt}"></b>`).join("");$("mmDots").innerHTML=n+s}function _g(e){const t=kg();mr=t?"c":"f",document.body.classList.toggle("tabs-compact",t),$("tabs").innerHTML=tl.map(n=>{const s=t?w3[n.id]??n.name:n.name;return`<button class="tab ${e.currentRoom===n.id||e.currentRoom==="backyard"&&n.id==="living"?"on":""}" data-room="${n.id}" style="--c:${n.color}" aria-label="${n.name}">${t?$3:""}${s}</button>`}).join("")}function Es(e,t,n,s,o){e.style.left=(t-s/2)/me*100+"%",e.style.top=(n-o)/Ne*100+"%",e.style.width=s/me*100+"%",e.style.height=o/Ne*100+"%"}function L3(e,t){let n=e.w*t,s=ct(e)*t;if((e.kind==="kennel"||e.kind==="cat-tower")&&document.body.classList.contains("phone")){const o=Math.max(.2,je()||1),i=44*me/(Math.max(1,de)*o),a=44/o;n<i&&(n=i),s<a&&(s=a)}return{w:n,h:s}}function Ut(e){const t=e.rooms[e.currentRoom],n=new Set;for(const s of t.items){const o=We[s.kind];if(!o)continue;n.add(s.id);let i=ce.querySelector(`.item[data-id="${s.id}"]`);i||(i=document.createElement("div"),i.className="item",i.dataset.id=s.id,i.innerHTML=`<div class="inner">${Jt(o,!0)}</div>`,ce.appendChild(i),i.addEventListener("pointerdown",l=>T3(i,l))),i.dataset.kind=s.kind,i.classList.toggle("is-light",P$(s.kind,!!o.light));const a=L3(o,s.scale);Es(i,s.x,s.y,a.w,a.h);const r=1e3+s.z;i.style.zIndex=String(r),i.style.setProperty("--iz",String(r)),i.classList.toggle("flipped",s.flip),i.classList.toggle("sel",Be===s.id)}ce.querySelectorAll(".item").forEach(s=>{n.has(s.dataset.id)||s.remove()}),Mg(e),H3(),Lg(e),al(e)}let os=!1,zc=0;function rl(e){performance.now()-zc<80||(zc=performance.now(),G5(e))}function C3(e,t){const n=I.querySelector(".yardDoor");if(!n)return null;const s=o=>{if(!o)return!1;const i=o.getBoundingClientRect();return i.width>2&&i.height>2&&e>=i.left&&e<=i.right&&t>=i.top&&t<=i.bottom};return s(n.querySelector(".yardHintLabel"))||s(n.querySelector(".doorArt"))||s(n)?n:null}function S3(e){e.addEventListener("pointerdown",t=>{if(t.button!==0)return;t.stopPropagation();const n=e.dataset.yardGo==="backyard"?"backyard":"living",s=t.clientX,o=t.clientY,i=t.pointerId;os=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),os=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),rl(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)})}I.addEventListener("pointerdown",e=>{if(e.button!==0)return;const t=C3(e.clientX,e.clientY);if(!t||e.target instanceof Node&&t.contains(e.target))return;e.stopPropagation(),e.preventDefault();const n=t.dataset.yardGo==="backyard"?"backyard":"living",s=e.clientX,o=e.clientY,i=e.pointerId;os=!0;const a=r=>{r.pointerId===i&&(window.removeEventListener("pointerup",a,!0),window.removeEventListener("pointercancel",a,!0),os=!1,r.type!=="pointercancel"&&(Math.hypot(r.clientX-s,r.clientY-o)>14||(r.preventDefault(),r.stopPropagation(),rl(n))))};window.addEventListener("pointerup",a,!0),window.addEventListener("pointercancel",a,!0)},!0);function Mg(e){const t=e.rooms[e.currentRoom];zw($("scenery"),e.currentRoom,t.items);const n=$("scenery"),s=e.currentRoom==="living"?"backyard":e.currentRoom==="backyard"?"living":"",o=n.querySelector(".yardDoor");if(!s)n.querySelectorAll(".yardDoor").forEach(i=>i.remove());else if(!o||o.dataset.yardGo!==s){n.querySelectorAll(".yardDoor").forEach(a=>a.remove()),n.insertAdjacentHTML("beforeend",xv(s==="backyard"?"living":"yard"));const i=n.querySelector(".yardDoor");i&&S3(i)}I.classList.toggle("room-yard",e.currentRoom==="backyard"),Ui(),os||Jn()}const xt=new Map;function B3(e){const t=Ro(e),n=Rn*t,s=Qt*t,o=oa(e),i=e.look2?.85:1;return["left","right"].map(a=>{const r=e.held[a],l=r&&We[r.kind];if(!r||!l)return"";const c=Math.min(.7,120*t/Math.max(l.w,ct(l))/r.scale)*i,d=l.w*r.scale*c,g=ct(l)*r.scale*c,f=o[a].x/100*n,p=o[a].y/160*s;return`<div class="held ${r.flip?"flipped":""}" data-hand="${a}" style="left:${(f-d/2)/n*100}%;top:${(p-g*.62)/s*100}%;width:${d/n*100}%;height:${g/s*100}%"><div class="inner">${Jt(l)}</div></div>`}).join("")}function H3(){let e=ce.querySelector("#skyPuddles");e||(e=document.createElement("div"),e.id="skyPuddles",e.className="skyPuddles"),ce.appendChild(e);const t=[...ce.querySelectorAll(".item.is-light")];for(;e.children.length>t.length;)e.lastElementChild.remove();for(;e.children.length<t.length;)e.appendChild(document.createElement("i"));t.forEach((n,s)=>{const o=e.children[s],i=parseFloat(n.style.left),a=parseFloat(n.style.top),r=parseFloat(n.style.width),l=parseFloat(n.style.height),c=n.dataset.kind==="window"||n.dataset.kind==="tv";o.style.left=i-.6*r+"%",o.style.top=a-(c?.38:.5)*l+"%",o.style.width=2.2*r+"%",o.style.height=2*l+"%",o.style.zIndex=String(parseInt(n.style.zIndex||"1000",10))})}function sn(e){const t=e.characters.filter(n=>n.room===e.currentRoom);for(const[n,s]of xt)t.some(o=>o.id===n)||(s.remove(),xt.delete(n));for(const n of t){let s=xt.get(n.id);s||(s=document.createElement("div"),s.className="char",s.dataset.cid=n.id,s.innerHTML='<div class="inner"></div><div class="hands"></div>',ce.appendChild(s),xt.set(n.id,s),U3(s));const o=Kf(n);s.dataset.look!==o&&(s.querySelector(".inner").innerHTML=Fe(n),s.dataset.look=o);const i=JSON.stringify([n.held.left?.id,n.held.left?.flip,n.held.right?.id,n.held.right?.flip,n.size]);s.dataset.held!==i&&(s.querySelector(".hands").innerHTML=B3(n),s.dataset.held=i);const a=Ro(n);Es(s,n.x,n.y,Rn*a,Qt*a),s.style.zIndex=String(5e3+Math.round(n.y)),s.classList.toggle("flipped",n.flip),s.classList.toggle("active",n.id===we),So(s,n,n.id===we),s.classList.toggle("pose-swing",dt?.id===n.id);const r=oa(n);s.style.setProperty("--hx-l",r.left.x+"%"),s.style.setProperty("--hx-r",r.right.x+"%")}al(e)}function Lg(e){const t=Be&&e.rooms[e.currentRoom].items.find(o=>o.id===Be);if(!t||!We[t.kind]){Xt.classList.add("hidden");return}const n=We[t.kind],s=t.y-ct(n)*t.scale-20;Xt.classList.remove("hidden"),Xt.style.left=Math.max(Y+130,Math.min(Y+de-130,t.x))/me*100+"%",Xt.style.top=Math.max(40,s)/Ne*100+"%"}function Cg(e){const t=$("soundIco");t&&(t.innerHTML=e.soundOn?Pt.soundOn:Pt.soundOff),$("btnSound").setAttribute("aria-label",e.soundOn?"Sound on":"Sound off"),xw(e.soundOn)}function is(){const e=S.get();ce.innerHTML="",xt.clear(),_g(e),xg(e),Ut(e),sn(e),Cg(e);const t=e.characters.find(o=>o.room===e.currentRoom),n=k&&be(),s=n&&n.where==="house"?n.x:t?.x;la(),Ae(Bi[e.currentRoom]??ol(s!==void 0?s-de/2:Ws)),Pn(),zt(),document.body.classList.contains("phone")&&C==="house"&&requestAnimationFrame(()=>mg())}S.subscribe((e,t)=>{switch(t.type){case"room/switch":{const n=I.classList.contains("room-yard");k&&Je!==ne&&D3(t.room),is(),et(),(t.room==="backyard"||n)&&Un(),ff(t.room);break}case"item/add":Ut(e),j5();break;case"game/reset":is();break;case"room/wallpaper":case"room/floor":case"room/pattern":case"room/wallTile":case"room/floorTile":xg(e);break;case"char/update":case"char/move":t.type==="char/move"&&dt&&!to&&t.id===dt.id&&(dt=null),sn(e),Ui(),C==="ranch"?Cn():C==="park"&&rs();break;case"char/add":case"char/delete":case"char/hold":case"char/release":Ut(e),sn(e),ut==="__people"&&et();break;case"settings/sound":Cg(e);break;default:Ut(e)}});function Xe(e){if(!e)return;const t=e.querySelector(":scope > .inner")??e;t.classList.remove("bounce"),t.offsetWidth,t.classList.add("bounce")}function ll(e,t,n=7){const s=$("fx"),o=["#ffd166","#ff8fab","#8ecae6","#80ed99","#c9a0dc"];for(let i=0;i<n;i++){const a=document.createElement("div");a.className="spark";const r=Math.PI*2*i/n+Math.random()*.5,l=40+Math.random()*30;a.style.left=e+"px",a.style.top=t+"px",a.style.background=o[i%o.length],a.style.setProperty("--dx",Math.cos(r)*l+"px"),a.style.setProperty("--dy",Math.sin(r)*l+"px"),s.appendChild(a),setTimeout(()=>a.remove(),650)}}const da=e=>{const t=e?.getBoundingClientRect();t&&ll(t.left+t.width/2,t.top+t.height/2)};function cl(e,t){ll(e,t,10),B.pop()}function Hi(e){xt.forEach((t,n)=>{t.classList.toggle("hold-target",!!e&&e.c.id===n),t.dataset.hand=e&&e.c.id===n?e.hand:""})}function Sg(e,t){S.dispatch({type:"char/hold",id:e.c.id,hand:e.hand,room:e.c.room,itemId:t}),Be=null,Ut(S.get());const n=xt.get(e.c.id);Xe(n),da(n?.querySelector(`.held[data-hand="${e.hand}"]`)),B.sparkle()}const Et=new Map;let Lt=!1,Pi=0;const dl=()=>[...Et.values()].reduce((e,t)=>e+t,0)/Et.size;I.addEventListener("pointerdown",e=>{e.pointerType==="touch"&&(Et.set(e.pointerId,e.clientX),Et.size>=2&&(Lt=!0,Pi=dl(),la(),Xt.classList.add("hidden")))},!0);window.addEventListener("pointermove",e=>{if(Et.has(e.pointerId)&&(Et.set(e.pointerId,e.clientX),Lt&&Et.size>=2)){const t=dl();Ae(Y-(t-Pi)/je()),Pi=t}},!0);const Bg=e=>{Et.delete(e.pointerId),Et.size<2&&Lt&&(Et.size===0?Lt=!1:Pi=dl())};window.addEventListener("pointerup",Bg,!0);window.addEventListener("pointercancel",Bg,!0);const us=80;function P3(e,t){const n=I.getBoundingClientRect();return t<n.top-40||t>n.bottom+10?0:e<n.left+us?-Math.min(1,(n.left+us-e)/us)*16:e>n.right-us?Math.min(1,(e-(n.right-us))/us)*16:0}function ls(e,t){let n=e,s=0;const o=()=>{const r=Lt?0:P3(n.clientX,n.clientY);if(r){const l=Y;Ae(Y+r),Y!==l&&t.onMove(n)}s=requestAnimationFrame(o)};t.edgeScroll!==!1&&(s=requestAnimationFrame(o));const i=r=>{r.pointerId===e.pointerId&&(r.preventDefault(),n=r,Lt||t.onMove(r))},a=r=>{r.pointerId===e.pointerId&&(cancelAnimationFrame(s),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",a),t.onUp(r))};window.addEventListener("pointermove",i,{passive:!1}),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a)}function W3(e){return new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,pointerId:e.pointerId,pointerType:e.pointerType,button:e.button,buttons:e.buttons,isPrimary:e.isPrimary})}function T3(e,t){const n=t.target,s=n&&n.closest?n.closest("img.artimg"):null;if(s&&!Fr(s,t.clientX,t.clientY)){const o=Rv(t.clientX,t.clientY),i=o?.closest(".item"),a=o?.closest(".char");i&&i!==e?(t.stopPropagation(),vr(i,t)):a&&(t.stopPropagation(),a.dispatchEvent(W3(t)));return}vr(e,t)}function vr(e,t,n=!1){if(t.preventDefault(),t.stopPropagation(),Lt)return;if(tt.isPlay()){u5(e,e.dataset.id);return}if(!yt()){Hn(e);return}const s=S.get(),o=s.currentRoom,i=e.dataset.id,a=s.rooms[o].items.find(f=>f.id===i);if(!a)return;const r=We[a.kind],l=At(t.clientX,t.clientY),c={x:a.x-l.x,y:a.y-l.y};let d=n,g=null;Be=i,S.dispatch({type:"item/front",room:o,id:i}),e.classList.add("lifted"),B.pick(),ls(t,{onMove(f){const p=At(f.clientX,f.clientY);Math.hypot(p.x-l.x,p.y-l.y)>6&&(d=!0),d&&(Xt.classList.add("hidden"),di.classList.add("show")),di.classList.toggle("hot",Ac(f.clientX,f.clientY));const u=r.w*a.scale/2;S.dispatch({type:"item/move",room:o,id:i,x:Math.max(u*.6,Math.min(me-u*.6,p.x+c.x)),y:rg(r,p.y+c.y)}),d&&Xt.classList.add("hidden"),g=d&&r.holdable?vg(p):null,Hi(g)},onUp(f){if(e.classList.remove("lifted"),di.classList.remove("show","hot"),Hi(null),d&&Ac(f.clientX,f.clientY)){Be=null,S.dispatch({type:"item/delete",room:o,id:i}),cl(f.clientX,f.clientY);return}if(d&&g){Sg(g,i);return}d?(B.drop(),Xe(e)):(B.click(),Vg(i),Ww(e)),Ut(S.get())}})}function R3(e,t,n){if(n.preventDefault(),n.stopPropagation(),Lt||tt.isPlay())return;const s=e.dataset.cid,o=t.dataset.hand,i=S.get().characters.find(d=>d.id===s),a=i?.held[o];if(!i||!a)return;const r=t.getBoundingClientRect(),l=At(r.left+r.width/2,r.bottom);S.dispatch({type:"char/release",id:s,hand:o,x:l.x,y:l.y});const c=ce.querySelector(`.item[data-id="${a.id}"]`);c&&vr(c,n,!0)}function U3(e){e.addEventListener("pointerdown",t=>{const n=t.target.closest(".held"),s=n?.querySelector("img.artimg"),o=!!s&&!Fr(s,t.clientX,t.clientY);if(n&&!o){if(tt.isPlay()){t.preventDefault(),t.stopPropagation();return}if(!yt()){t.stopPropagation(),Hn(e);return}return R3(e,n,t)}if(t.preventDefault(),t.stopPropagation(),Lt)return;if(!yt()){Hn(e);return}Be=null,Ut(S.get());const i=e.dataset.cid;we=i;const a=S.get(),r=a.characters.find(f=>f.id===i);if(!r)return;const l=At(t.clientX,t.clientY),c={x:r.x-l.x,y:r.y-l.y};let d=r.x,g=!1;e.classList.add("lifted"),B.pick(),sn(S.get()),ls(t,{onMove(f){const p=At(f.clientX,f.clientY),u=p.x+c.x;Math.hypot(p.x-l.x,p.y-l.y)>6&&(g=!0);const b=S.get().characters.find(M=>M.id===i);if(b){if(Math.abs(u-d)>3){const M=u<d;M!==b.flip&&S.dispatch({type:"char/update",id:i,patch:{flip:M}}),d=u}S.dispatch({type:"char/move",id:i,room:a.currentRoom,x:u,y:Math.max(ra+40,p.y+c.y)}),document.querySelectorAll(".tab").forEach(M=>M.classList.remove("drop")),document.elementFromPoint(f.clientX,f.clientY)?.closest(".tab:not(.on)")?.classList.add("drop")}},onUp(f){e.classList.remove("lifted"),document.querySelectorAll(".tab").forEach(b=>b.classList.remove("drop"));const p=document.elementFromPoint(f.clientX,f.clientY)?.closest("[data-room]"),u=S.get().characters.find(b=>b.id===i);if(g&&u&&p&&p.dataset.room!==a.currentRoom){const b=p.getBoundingClientRect();ll(b.left+b.width/2,b.top+b.height/2,9),B.swish(),S.dispatch({type:"char/move",id:i,room:p.dataset.room,x:u.x,y:u.y});return}B.drop(),Xe(e),g&&requestAnimationFrame(()=>To(!0))}})})}function E3(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),tt.isPlay()){n.stopPropagation();return}if(!yt()){Hn(e);return}const s=document.createElement("div");s.className="ghost",s.innerHTML=Jt(t),document.body.appendChild(s);const o=Math.max(1,60/(Math.max(t.w,ct(t))*je())),i=t.w*je()*o,a=ct(t)*je()*o;s.style.width=i+"px",s.style.height=a+"px";let r=null;const l=g=>{s.style.left=g.clientX-i/2+"px",s.style.top=g.clientY-a*.8+"px",r=t.holdable&&kr(g.clientX,g.clientY)?vg(At(g.clientX,g.clientY)):null,Hi(r)};l(n),B.pick(),e.classList.add("pressed");const c=n.clientX,d=n.clientY;ls(n,{onMove:l,onUp(g){s.remove(),e.classList.remove("pressed"),Hi(null);const f=S.get().currentRoom,p=Math.hypot(g.clientX-c,g.clientY-d)<8;let u,b;if(p)u=Y+380+Math.random()*240,b=t.wall?Math.min(ag,200+ct(t)/2):500+Math.random()*40;else if(kr(g.clientX,g.clientY)){const h=At(g.clientX,g.clientY);u=h.x,b=rg(t,h.y+ct(t)*.2)}else return;const M={id:yr(t.kind.replace(/[^a-z0-9-]/gi,"")),kind:t.kind,x:u,y:b,flip:!1,z:0,scale:1};if(f!=="backyard"&&S.get().rooms[f].items.length===0){const h=Qw(v=>yr(v),f);for(let v=0;v<h.length;v++)S.dispatch({type:"item/add",room:f,item:h[v]})}if(S.dispatch({type:"item/add",room:f,item:M}),!p&&r){Sg(r,M.id);return}Be=M.id,Ut(S.get());const m=ce.querySelector(`.item[data-id="${M.id}"]`);Xe(m),da(m),B.sparkle()}})})}function Q3(e,t){e.addEventListener("pointerdown",n=>{if(n.preventDefault(),tt.isPlay())return;if(!yt()){Hn(e);return}const s=S.get().characters.find(f=>f.id===t);if(!s)return;const o=Ro(s),i=Rn*o*je(),a=Qt*o*je(),r=document.createElement("div");r.className="ghost",r.innerHTML=Fe(s),r.style.width=i+"px",r.style.height=a+"px",document.body.appendChild(r);const l=f=>{r.style.left=f.clientX-i/2+"px",r.style.top=f.clientY-a*.85+"px"},c=n.clientX,d=n.clientY;let g=!1;r.style.visibility="hidden",ls(n,{onMove(f){Math.hypot(f.clientX-c,f.clientY-d)>8&&(g=!0,r.style.visibility=""),l(f)},onUp(f){if(r.remove(),!g){B.click(),we=t,Hs("dress");return}if(!kr(f.clientX,f.clientY))return;const p=At(f.clientX,f.clientY),u=S.get().currentRoom;S.dispatch({type:"char/move",id:t,room:u,x:p.x,y:Math.max(ra+40,p.y+Qt*o*.15)}),we=t,sn(S.get());const b=xt.get(t);Xe(b),da(b),B.sparkle()}})})}function Hg(){if(!yt())return Hn(null),null;const e=S.get();if(e.characters.length>=Ts)return null;const t=yr("c"),n=Yi();S.dispatch({type:"char/add",char:Sn({id:t,...Gi(n),look2:n,room:e.currentRoom,x:Y+300+Math.random()*400,y:520+Math.random()*40})}),we=t,sn(S.get());const s=xt.get(t);return Xe(s),da(s),B.sparkle(),t}function A3(){return sl==="all"?"all":S.get().currentRoom}function et(){const e=S.get().currentRoom,t=A3(),n=tl.find(l=>l.id===e)?.name??"This room",s=t==="all";$("roomFilter").innerHTML=`<button class="rf ${s?"on":""}" data-rf="${s?"room":"all"}">${s?"Just "+n:"All rooms"}</button>`;const o=Ra("secrets").length>0,i=Bs.filter(l=>l.id!=="secrets"&&(l.kind==="people"||l.kind==="pack"&&e!=="backyard"||Ra(l.id).length));!(ut==="secrets"&&o)&&!i.some(l=>l.id===ut)&&(ut=i[1]?.id??"__people"),$("cats").innerHTML=i.map(l=>`<button class="cat ${l.kind} ${l.id===ut?"on":""}" data-cat="${l.id}" aria-label="${l.name}" title="${l.name}">${l.kind==="people"?c3:l.kind==="pack"?`<span class="packicon">${Jt(We[l.icon])}</span><span class="packname">${l.name}</span>`:Jt(We[l.icon])}</button>`).join("")+(o?`<button class="cat secretTab ${ut==="secrets"?"on":""}" data-cat="secrets" aria-label="Secrets" title="Secrets">🎁</button>`:"");const a=$("shelf");if(a.innerHTML="",!yt()){a.innerHTML='<div class="empty locked">🔒 This house is look-only right now</div>';return}if(ut==="__people"){const l=S.get(),c=as();if(c){const d=document.createElement("button");d.className="thing person me",d.setAttribute("aria-label","Me"),d.innerHTML=`<div class="face">${Fe(c)}</div><span class="meStar">★</span>`,d.addEventListener("click",()=>{B.click(),we=Oe,Hs("dress")}),a.appendChild(d)}for(const d of l.characters){const g=document.createElement("button");g.className="thing person",g.setAttribute("aria-label","Character"),g.innerHTML=`<div class="face">${Fe(d)}</div><span class="where" style="background:${lg(d.room)}"></span>`,a.appendChild(g),Q3(g,d.id)}if(l.characters.length<Ts){const d=document.createElement("button");d.className="thing add",d.setAttribute("aria-label","New character"),d.innerHTML=cg,d.addEventListener("click",()=>{Hg()&&(et(),Hs("dress"))}),a.appendChild(d)}return}const r=Ra(ut);r.length||(a.innerHTML='<div class="empty">Nothing here yet!</div>');for(const l of r){const c=document.createElement("button");c.className="thing",c.setAttribute("aria-label",l.name),c.innerHTML=Jt(l),a.appendChild(c),E3(c,l)}a.scrollLeft=0,gl()}function gl(){const e=document.querySelector(".drawerTop"),t=document.getElementById("drawerBar");!e||!t||t.classList.toggle("more",e.scrollWidth-e.clientWidth-e.scrollLeft>6)}document.querySelector(".drawerTop").addEventListener("scroll",gl,{passive:!0});window.addEventListener("resize",gl);function Dc(e,t,n){return`<div class="sw">${e.map(s=>`<button class="dot ${s===t?"on":""}" style="background:${s}" data-act="${n}" data-v="${s}"></button>`).join("")}</div>`}let wo=null,bs=!1;function z3(e){if(e===Oe){const n=as();if(!n||n.look2)return;un(Oe,po(ui(n)));return}const t=S.get().characters.find(n=>n.id===e);!t||t.look2||un(e,{...po(ui(t)),size:t.size})}function jt(){const e=S.get(),t=$("card");if(wo==="paint"){t.classList.remove("avCard");const n=e.rooms[e.currentRoom],s=er.filter(a=>a.kind==="wallpaper"),o=er.filter(a=>a.kind==="floor"),i=(a,r,l,c)=>`<button class="dot pat tile ${a.id===r?"on":""}" data-act="${l}" data-v="${a.id}" title="${a.name} (${bd(a.pack)})" style="background-color:${c};background-image:${br(a.url)};background-size:48px auto"></button>`;t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${Dc(r3,n.wallpaper,"wall")}
      <h3>Wallpaper</h3><div class="sw">${wg.map((a,r)=>`<button class="dot pat ${!n.wallTile&&r===n.pattern?"on":""}" data-act="pat" data-v="${r}" style="background-color:${n.wallpaper};background-image:${a};background-size:${r===1?"16px 16px":r===3?"20px 20px":"auto"}"></button>`).join("")}${s.map(a=>i(a,n.wallTile,"wtile",n.wallpaper)).join("")}</div>
      <h3>Floor</h3>${Dc(l3,n.floor,"floor")}
      ${o.length?`<h3>Floor style</h3><div class="sw"><button class="dot pat ${n.floorTile?"":"on"}" data-act="ftile" data-v="" style="background-color:${n.floor};background-image:${$g}"></button>${o.map(a=>i(a,n.floorTile,"ftile",n.floor)).join("")}</div>`:""}`}else if(wo==="dress"){t.classList.add("avCard");let n=e,s=as(),o=s?Sn({id:Oe,...s}):null,i=we===Oe&&o?o:n.characters.find(r=>r.id===we)??o??n.characters[0];i&&!i.look2&&z3(i.id),n=S.get(),s=as(),o=s?Sn({id:Oe,...s}):null,i=we===Oe&&o?o:n.characters.find(r=>r.id===we)??o??n.characters[0];const a=`<div class="picker">${o?`<button class="pk me ${i?.id===Oe?"on":""}" data-act="pickc" data-v="${Oe}"><div class="face">${Fe(o)}</div><span class="meStar">★</span></button>`:""}${n.characters.map(r=>`<button class="pk ${r.id===i?.id?"on":""}" data-act="pickc" data-v="${r.id}"><div class="face">${Fe(r)}</div><span class="where" style="background:${lg(r.room)}"></span></button>`).join("")}${n.characters.length<Ts?`<button class="pk add" data-act="newc">${cg}</button>`:""}</div>`;if(!i){t.innerHTML=`<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${a}<div class="dress"><p class="hint">Tap + to make someone new!</p></div>`;return}we=i.id,t.innerHTML=kw(i,a,bs,Pt.trash)}}function Hs(e){wo=e,bs=!1,jt(),$("sheet").classList.remove("hidden"),B.swish()}$("sheet").addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(e.target===$("sheet")||t?.dataset.act==="close"){$("sheet").classList.add("hidden"),wo=null,B.click(),ut==="__people"&&et();return}if(!t)return;const n=S.get(),s=n.currentRoom,o=t.dataset.v,i=we??"",a=t.dataset.act;if(a!=="delc"&&(bs=!1),a&&a.indexOf("av-")===0){const r=i===Oe?as():S.get().characters.find(d=>d.id===i);if(a==="av-surprise"){un(i,{...po(Yi()),size:r?.size??"kid"}),B.sparkle(),jt(),Xe(document.querySelector(".avStage"));return}const l=r?.look2??ui(r??{}),c=bw(l,a,o??"");if(!c){B.click(),jt();return}un(i,{...po(c),size:r?.size??"kid"}),B.sparkle(),jt(),Xe(document.querySelector(".avStage"));return}switch(a){case"wall":S.dispatch({type:"room/wallpaper",room:s,color:o});break;case"floor":S.dispatch({type:"room/floor",room:s,color:o});break;case"pat":S.dispatch({type:"room/pattern",room:s,pattern:+o});break;case"wtile":S.dispatch({type:"room/wallTile",room:s,tile:o});break;case"ftile":S.dispatch({type:"room/floorTile",room:s,tile:o||null});break;case"skin":case"hair":case"shirt":case"pants":un(i,{[a]:o});break;case"hs":un(i,{hairStyle:+o});break;case"acc":un(i,{acc:+o});break;case"size":{const r=i===Oe?as():S.get().characters.find(l=>l.id===i);un(i,{size:o,...r?.look2?{look2:r.look2}:{}}),sn(S.get());break}case"pickc":we=o,sn(S.get()),B.click(),jt();return;case"newc":if(!Hg())return;break;case"delc":if(i===Oe||!yt())return;if(!bs){bs=!0,B.click(),jt();return}bs=!1;{const l=xt.get(i)?.getBoundingClientRect();S.dispatch({type:"char/delete",id:i}),l?cl(l.left+l.width/2,l.top+l.height/2):B.pop()}we=S.get().characters[0]?.id??null,jt();return}B.sparkle(),jt(),Xe(document.querySelector(".preview"))});$("tabs").addEventListener("click",e=>{const t=e.target.closest("[data-room]");if(!t)return;const n=t.dataset.room;n!==S.get().currentRoom&&(Be=null,B.swish(),I.classList.remove("swap"),I.offsetWidth,I.classList.add("swap"),S.dispatch({type:"room/switch",room:n}))});$("cats").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");t&&(ut=t.dataset.cat,B.click(),et())});$("roomFilter").addEventListener("click",e=>{const t=e.target.closest("[data-cat]");if(t){ut=t.dataset.cat,B.click(),et();return}const n=e.target.closest("[data-rf]");n&&(sl=n.dataset.rf==="all"?"all":"",B.click(),et())});Xt.addEventListener("pointerdown",e=>e.stopPropagation());Xt.addEventListener("click",e=>{const t=e.target.closest("[data-a]");if(!t||!Be)return;if(!yt()){Hn(null);return}const n=S.get().currentRoom,s=Be,o=ce.querySelector(`.item[data-id="${s}"]`);switch(t.dataset.a){case"flip":S.dispatch({type:"item/flip",room:n,id:s}),B.swish(),Xe(o);break;case"front":S.dispatch({type:"item/front",room:n,id:s}),B.click(),Xe(o);break;case"back":S.dispatch({type:"item/back",room:n,id:s}),B.click(),Xe(o);break;case"delete":{const i=o?.getBoundingClientRect();Be=null,S.dispatch({type:"item/delete",room:n,id:s}),i&&cl(i.left+i.width/2,i.top+i.height/2);break}}});I.addEventListener("pointerdown",e=>{if(e.target.closest(".nudge"))return;la();const t=e.clientX,n=Y;let s=!1,o=0,i=e.clientX,a=performance.now();ls(e,{edgeScroll:!1,onMove(r){if(Math.abs(r.clientX-t)>6&&(s=!0),!s)return;const l=performance.now();o=(r.clientX-i)/Math.max(1,l-a),i=r.clientX,a=l,Ae(n-(r.clientX-t)/je())},onUp(){if(!s){Be&&(Be=null,Ut(S.get()));return}if(Lt)return;let r=-o*16/je();const l=()=>{Math.abs(r)<.3||(Ae(Y+r),r*=.92,xs=requestAnimationFrame(l))};xs=requestAnimationFrame(l)}})});I.addEventListener("wheel",e=>{e.preventDefault(),la(),Ae(Y+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/je())},{passive:!1});$("nudgeL").addEventListener("pointerdown",e=>{e.stopPropagation(),B.swish(),ca((vo??Y)-de*.6)});$("nudgeR").addEventListener("pointerdown",e=>{e.stopPropagation(),B.swish(),ca((vo??Y)+de*.6)});const Zc=$("minimap");Zc.addEventListener("pointerdown",e=>{e.stopPropagation(),e.preventDefault();const t=n=>{const s=Zc.getBoundingClientRect();ca((n.clientX-s.left)/s.width*me-de/2)};t(e),B.click(),ls(e,{edgeScroll:!1,onMove:t,onUp(){}})});$("btnPaint").addEventListener("click",()=>{if(!yt())return Hn(null);Hs("paint")});$("btnDress").addEventListener("click",()=>Hs("dress"));$("btnSound").addEventListener("click",()=>{S.dispatch({type:"settings/sound",on:!S.get().soundOn}),B.click()});document.addEventListener("gesturestart",e=>e.preventDefault());document.addEventListener("contextmenu",e=>e.preventDefault());"serviceWorker"in navigator&&navigator.serviceWorker.register("/kids-house-game/sw.js");window.__store=S;window.__items=Object.fromEntries(Zt.filter(e=>e.img).map(e=>[e.kind,{w:e.w,h:ct(e),cat:e.cat,holdable:e.holdable,svg:e.img.includes(".svg")}]));window.__cam={get:()=>Y,set:Ae};window.__phoneShowKids=()=>He();window.__avatar={richAvatars:Yr,randomLook2:Yi,look2FromLegacy:ui,legacyFromLook2:Gi,sanitizeLook2:_o,handsFor:oa};window.__frameHouseKid=()=>To(!0);window.__layoutNameTags=()=>Ad();const K=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function yt(){return!k||Je===ne||k.canEdit($e)}function Hn(e){B.pop();const t=$("houseTag");t.classList.add("show"),t.classList.remove("wiggle"),t.offsetWidth,t.classList.add("wiggle"),window.clearTimeout(Wi),Wi=window.setTimeout(()=>{C==="house"&&k&&!document.body.classList.contains("own-house")||t.classList.remove("show")},2e3),e&&(e.classList.remove("nope"),e.offsetWidth,e.classList.add("nope")),z("🔒 Look-only house: ask the owner to unlock it!",1800)}const be=()=>k?.myPresence()??null,as=()=>k?k.players.get(k.pid)?.look??null:null;function un(e,t){if(e===Oe){const n=as();if(!n||!k)return;k.setLook(Lo({...n,...t})),Pn(),C==="street"&&Ti(),C==="park"&&rs(),C==="ranch"&&Cn();return}S.dispatch({type:"char/update",id:e,patch:t})}function Qe(e){k?.setPresence(e)}function D3(e){const t=be();t&&t.where==="house"&&Qe({...t,room:e})}function Pg(e){Je=e,ig(e),Be=null,setTimeout(()=>yf.update());for(const t of Object.keys(Bi))delete Bi[t];we=e===ne?e.get().characters[0]?.id??null:Oe,is(),et()}function fl(e,t){return`<div class="inner">${Fe(e)}</div><div class="nametag">${K(t)}</div>`}function Pn(){const e=new Set;if(k&&Je!==ne&&C==="house"){const t=S.get().currentRoom,n=[...k.presence.entries()],s=be();s&&n.push([k.pid,s]);for(const[o,i]of n){const a=k.players.get(o);if(!a||i.where!=="house"||i.houseId!==$e||i.room!==t)continue;e.add(o);let r=eo.get(o);(!r||!r.isConnected)&&(r=document.createElement("div"),r.className="char avatar "+(o===k.pid?"mine":"other"),r.dataset.pid=o,ce.appendChild(r),eo.set(o,r),o===k.pid&&Z3(r));const l=a.look,c=JSON.stringify(l)+a.nickname;if(r.dataset.look!==c){const g=r.querySelector(".bubble");r.innerHTML=fl(l,a.nickname),g&&r.appendChild(g),r.dataset.look=c}const d=Bo[l.size]??1;Es(r,i.x,i.y,Rn*d,Qt*d),r.style.zIndex=String(5e3+Math.round(i.y)),r.classList.toggle("flipped",i.flip),So(r,l,o===k.pid)}}for(const[t,n]of eo)(!e.has(t)||!n.isConnected)&&(e.has(t)||n.remove(),eo.delete(t));cs()}function Z3(e){e.addEventListener("pointerdown",t=>{if(t.preventDefault(),t.stopPropagation(),Lt||!k)return;const n=be();if(!n||n.where!=="house")return;const s=At(t.clientX,t.clientY),o={x:n.x-s.x,y:n.y-s.y};let i=n.x;e.classList.add("lifted"),B.pick(),ls(t,{onMove(a){const r=At(a.clientX,a.clientY),l=be();if(!l||l.where!=="house")return;const c=Math.max(40,Math.min(me-40,r.x+o.x)),d=Math.max(ra+40,Math.min(Ne,r.y+o.y)),g=Math.abs(c-i)>3?c<i:l.flip;Math.abs(c-i)>3&&(i=c),Qe({...l,x:c,y:d,flip:g}),Pn(),al(S.get())},onUp(){e.classList.remove("lifted"),B.drop(),Xe(e),requestAnimationFrame(()=>To(!0))}})})}function q3(e){return e.kind==="text"?e.v:(e.kind==="phrase"?ao:ld)[e.v]??""}function Qs(){const e=document.querySelectorAll(".bubble");if(!document.body.classList.contains("phone")){e.forEach(s=>{(s.style.marginLeft||s.style.marginTop)&&(s.style.marginLeft="",s.style.marginTop="")});return}const t=I.getBoundingClientRect(),n=je()||1;e.forEach(s=>{s.style.marginLeft="0px",s.style.marginTop="0px";const o=s.getBoundingClientRect();let i=0;o.width>=t.width-8||o.left<t.left+4?i=t.left+4-o.left:o.right>t.right-4&&(i=t.right-4-o.right);let a=0;o.top<t.top+4?a=t.top+4-o.top:o.bottom>t.bottom-4&&(a=t.bottom-4-o.bottom),i&&(s.style.marginLeft=i/n+"px"),a&&(s.style.marginTop=a/n+"px")})}function I3(e,t){const n=C==="street"?document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`):C==="park"?document.querySelector(`#pavatars .savatar[data-pid="${e}"]`):C==="ranch"?document.querySelector(`#ravatars .savatar[data-pid="${e}"]`):C==="gameroom"?document.querySelector(`#gavatars .savatar[data-pid="${e}"]`):eo.get(e),s=n?[n]:[];for(const o of s){o.querySelector(".bubble")?.remove();const i=document.createElement("div");i.className="bubble"+(t.kind==="emote"?" emote":""),i.textContent=q3(t),o.appendChild(i),Qs(),setTimeout(()=>i.classList.add("out"),4600),setTimeout(()=>i.remove(),5e3)}e!==k?.pid&&B.click()}function ga(){const e=be();if(!k||!e)return 0;let t=0;return k.presence.forEach(n=>{_p(e,n)&&t++}),t}function cs(){const e=ga();$("btnChat").classList.toggle("glow",e>0),fa();const t=document.getElementById("chatNear");t&&(t.textContent=e?`${e} friend${e>1?"s":""} nearby can hear you`:"Walk closer to a friend to talk!",$("chatTray").classList.toggle("nobody",!e))}function Wg(){const e=$("chatTray");if(!k)return;const t=document.body.classList.contains("phone"),n=`<div class="phrases">${ao.map((a,r)=>`<button data-phrase="${r}">${K(a)}</button>`).join("")}</div>`,s=k.settings.freeChat?`<form class="typed" id="chatForm"><input id="chatInput" maxlength="${Dr}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>`:'<div class="presetsOnly">Picking from the bubbles above 💬</div>',o=t?'<button type="button" class="chatMore" data-chat="more">more</button>':"";e.innerHTML=`<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${ld.map((a,r)=>`<button data-emote="${r}">${a}</button>`).join("")}</div>
    ${o}
    <div class="chatExtra${t?" hidden":""}">${n}${s}</div>`,cs(),document.getElementById("chatForm")?.addEventListener("submit",a=>{a.preventDefault();const r=$("chatInput"),l=gp(r.value);if(!l.ok){$("chatWarn").textContent=Ji[l.reason]??"",B.pop();return}if(!ga()){z("Walk closer to a friend to talk!");return}k.say({kind:"text",v:l.text}),r.value="",$("chatWarn").textContent="",r.blur()})}$("chatTray").addEventListener("click",e=>{const t=e.target;if(!k)return;if(t.closest('[data-chat="close"]')){$("chatTray").classList.add("hidden");return}const n=t.closest('[data-chat="more"]');if(n){const i=$("chatTray").querySelector(".chatExtra");i?.classList.toggle("hidden"),n.textContent=i&&!i.classList.contains("hidden")?"less":"more";return}const s=t.closest("[data-emote]"),o=t.closest("[data-phrase]");if(!(!s&&!o)){if(!ga()){z("Walk closer to a friend to talk!");return}k.say(s?{kind:"emote",v:+s.dataset.emote}:{kind:"phrase",v:+o.dataset.phrase}),B.click()}});$("btnChat").addEventListener("click",()=>{$("chatTray").classList.toggle("hidden")||(Wg(),B.swish())});function zt(){const e=document.body.classList,n=!!k&&Je!==ne&&C==="house"?k.houses.get($e):void 0,s=!!n&&n.meta.ownerId===k.pid;if(e.toggle("mode-hood",!!k),e.toggle("view-street",C!=="house"),e.toggle("view-park",C==="park"),e.toggle("view-ranch",C==="ranch"),e.toggle("view-map",C==="street"),e.toggle("view-gameroom",C==="gameroom"),e.toggle("in-barn",C==="ranch"&&ye),e.toggle("mode-play",C==="house"&&tt.isPlay()),Ll(),Ag(),e.toggle("own-house",s),e.toggle("locked",!!n&&!yt()),e.toggle("has-hood",!!ea()),fa(),n){const o=k.players.get(n.meta.ownerId)?.nickname??"";$("houseTag").innerHTML=`${n.meta.locked?"🔒 ":""}<b>${K(n.meta.name)}</b>${s?" · yours":o?" · "+K(o):""}`;const i=$("lockIco");i&&(i.innerHTML=n.meta.locked?rt.lockOn:rt.lockOff);const a=n.meta.locked?"Unlock my house":"Lock my house";$("btnLock").setAttribute("aria-label",n.meta.locked?"Unlock house":"Lock house");const r=$("lockLabel");r&&(r.textContent=a)}cs(),O3(),document.body.classList.contains("phone")&&fg()}let Ea="",Wi=0;function O3(){const e=$("houseTag"),t=!!k&&C==="house"&&!document.body.classList.contains("own-house");if(C!=="house"||!k){Ea="",e.classList.remove("show");return}if(t){e.classList.add("show");return}const n=$e||"solo";Ea!==n&&(Ea=n,e.classList.add("show"),window.clearTimeout(Wi),Wi=window.setTimeout(()=>e.classList.remove("show"),2e3))}$("btnLock").addEventListener("click",()=>{const e=k?.houses.get($e);!e||e.meta.ownerId!==k.pid||(k.lock(e.meta.id,!e.meta.locked),B.click(),z(e.meta.locked?"Unlocked: friends can decorate!":"Locked: friends can look but not change things"))});const Ve=new Map;let qc="",wr=0,xe={w:en,h:tn,portrait:!1};function N3(){return document.body.classList.contains("phone-portrait")}function Tg(){const e=$("street"),t=Math.max(1,e.clientWidth),n=Math.max(1,e.clientHeight);return Math.min(t/xe.w,n/xe.h)}function j3(e){const t=$("street"),n=$("mapWorld"),s=xe.w*e,o=xe.h*e;n.style.marginLeft=Math.max(0,Math.floor((t.clientWidth-s)/2))+"px",n.style.marginTop=Math.max(0,Math.floor((t.clientHeight-o)/2))+"px",t.scrollLeft=0,t.scrollTop=0,Rg()}function Rg(){const e=$("street"),t=$("mapWorld"),n=4,s=e.clientWidth-n,o=e.clientHeight-n,i=t.offsetLeft,a=t.offsetTop;t.querySelectorAll(".mapSign").forEach(r=>{r.style.transform="translateX(-50%)";const l=r.offsetWidth,c=r.offsetHeight,d=i+r.offsetLeft-l/2,g=a+r.offsetTop;let f=0,p=0;d<n&&(f=n-d),d+l+f>s&&(f-=d+l+f-s),g<n&&(p=n-g),g+c+p>o&&(p-=g+c+p-o),F3(r,f,p,i,a,n,s,o)})}function F3(e,t,n,s,o,i,a,r){const l=[...e.parentElement.querySelectorAll(".mapMail")],c=()=>{const g=e.offsetWidth,f=e.offsetHeight,p=s+e.offsetLeft-g/2+t,u=o+e.offsetTop+n;return{left:p,top:u,right:p+g,bottom:u+f,width:g,height:f}};for(let g=0;g<6;g++){const f=c(),p=l.find(_=>{const P=s+_.offsetLeft,R=o+_.offsetTop,T=P+_.offsetWidth,N=R+_.offsetHeight;return f.right>P+2&&f.left<T-2&&f.bottom>R+2&&f.top<N-2});if(!p)break;const u=s+p.offsetLeft,b=o+p.offsetTop,M=b+p.offsetHeight,m=c(),h=M+4-m.top,v=m.bottom-(b-4);m.top+h+m.height<=r?n+=h:m.top-v>=i?n-=v:t-=Math.min(m.right,u+p.offsetWidth)-Math.max(m.left,u)+6}const d=c();d.left<i&&(t+=i-d.left),d.right>a&&(t-=d.right-a),d.top<i&&(n+=i-d.top),d.bottom>r&&(n-=d.bottom-r),e.style.transform=Math.abs(t)>.5||Math.abs(n)>.5?`translate(calc(-50% + ${t.toFixed(1)}px), ${n.toFixed(1)}px)`:"translateX(-50%)"}document.fonts?.ready.then(()=>{C==="street"&&Rg()});function V3(){return k?[...k.houses.values()].map(e=>e.meta).sort((e,t)=>e.slot-t.slot):[]}function G3(e){const s=Math.round(97.5),o=Math.max(1,Math.ceil(e/(e===1?1:2))),i=158,a=318,l=a+(o-1)*i+s/2+108,c=Math.max(1020,l+78),d=Math.max(l,Math.min(c-88,Math.round(c*.74))),g=e===1?[280]:[150,410],f=e===1?1:2,p=Array.from({length:e},(u,b)=>({x:g[b%f],y:a+Math.floor(b/f)*i}));return{w:560,h:c,hw:104,hh:s,houses:p,square:{x:280,y:d},park:{x:96,y:122},club:{x:280,y:116},ranch:{x:458,y:120}}}function Xn(e=!1){if(C!=="street")return;const t=$("mapWorld"),n=V3(),s=k?n.map(f=>({id:f.id,name:f.name,style:f.style,locked:f.locked,mine:f.ownerId===k.pid,lit:!!k.players.get(f.ownerId)?.online})):wr?Array.from({length:wr},(f,p)=>({id:"fake"+p,name:["Reagan","Quinn","Chloe","Sloane","Cada","Emma","Olivia","Charlotte","Amelia","Sophia","Isabella","Mia"][p%12]+"'s House",style:p,locked:p===3,mine:p===0,lit:p%3!==1})):[null],o=N3()?G3(Math.max(1,s.length)):null;xe=o?{w:o.w,h:o.h,portrait:!0}:{w:en,h:tn,portrait:!1};const i=Tg(),a=(xe.portrait?"P":"L")+xe.w+"x"+xe.h+":"+i.toFixed(3)+JSON.stringify(n)+(k?n.map(f=>(k.players.get(f.ownerId)?.online?1:0)+(Qa(f.id)?"u":"")).join("")+k.pid:"solo");if(!e&&a===qc&&t.querySelector("#mapFaces")){Ti();return}qc=a,t.style.width=xe.w*i+"px",t.style.height=xe.h*i+"px",t.style.setProperty("--sc",String(i)),t.innerHTML=`<div class="mapClip">${o?_f(o.w,o.h):xf()}</div>`;const r=t.querySelector(".mapClip"),l=f=>f*i+"px";Ve.clear();const c=s.length;let d="",g="";if(o){const{hw:f,hh:p}=o,u=34,b=40;s.forEach((v,_)=>{const P=o.houses[_]??o.houses[0],R=v?`house:${v.id}`:"home",T=v?v.name:"My House";Ve.set(v?"house:"+v.id:"home",{x:P.x,y:P.y-p/2-8});const N=!!(v&&Qa(v.id)),J=P.x<o.w/2?Math.max(4,P.x-f/2-u-8):Math.min(o.w-u-4,P.x+f/2+8),Z=Math.max(4,Math.min(o.h-b-4,P.y-p*.42));d+=`<button class="mapSpot mapHouse ${v?.mine||!v?"mine":""}" data-go="${R}" aria-label="${K(T)}" style="left:${l(P.x-f/2)};top:${l(P.y-p/2)};width:${l(f)};height:${l(p)}">${$i(v?v.style:0,{lit:v?v.lit:!0})}${v?.locked?'<span class="lockBadge">🔒</span>':""}${v?.mine||!v?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${N?"up":""}" data-mail="${v?v.id:"home"}" aria-label="${K(T)} mailbox" style="left:${l(J)};top:${l(Z)};width:${l(u)};height:${l(b)}">${Gl(N)}</button>`,g+=`<div class="mapSign ${v?.mine||!v?"mine":""}" style="left:${l(P.x)};top:${l(P.y+p/2+2)}">${K(T)}</div>`});const M=(v,_,P,R,T,N,X,J,Z)=>{d+=`<button class="mapSpot ${v}" data-go="${_}" aria-label="${P}" style="left:${l(T-X/2)};top:${l(N-J/2)};width:${l(X)};height:${l(J)}">${R}</button>`,g+=`<div class="mapSign place" style="left:${l(T)};top:${l(N+Z)}">${P==="The park"?"Park":P==="Rainbow Ranch"?"Rainbow Ranch":"Clubhouse"}</div>`};M("mapPark","park","The park",Rl,o.park.x,o.park.y,148,126,68),M("mapRanch","ranch","Rainbow Ranch",Ul,o.ranch.x,o.ranch.y,156,128,72),M("mapClub","gameroom","The clubhouse",El,o.club.x,o.club.y,146,120,68),Ve.set("park",{x:o.park.x,y:o.park.y-78}),Ve.set("ranch",{x:o.ranch.x,y:o.ranch.y-80}),Ve.set("barn",{x:o.ranch.x,y:o.ranch.y+8}),Ve.set("gameroom",{x:o.club.x,y:o.club.y-74}),Ve.set("square",o.square);const m=[{x:o.park.x,y:o.park.y,r:90},{x:o.ranch.x,y:o.ranch.y,r:96},{x:o.club.x,y:o.club.y,r:88},{x:o.square.x,y:o.square.y,r:70},...o.houses.map(v=>({x:v.x,y:v.y,r:78}))],h=o.w/2;r.insertAdjacentHTML("beforeend",Tl(m,(v,_)=>Math.abs(v-h)<34,o.w,o.h)+Cf(o.w,o.h,m)+d+'<div class="mapFaces" id="mapFaces"></div>')}else{const f=t.querySelector("#mapRoad"),p=f.getTotalLength(),u=Array.from({length:160},(_,P)=>f.getPointAtLength(p*P/159)),b=(_,P)=>u.some(R=>Math.hypot(R.x-_,R.y-P)<50),M=$r(),m=c>8?80:94,h=m*300/320,v=Ug(f,c,M);s.forEach((_,P)=>{const R=v[P],T=_?`house:${_.id}`:"home",N=_?_.name:"My House";Ve.set(_?"house:"+_.id:"home",{x:R.x,y:R.y-h/2-4});const X=!!(_&&Qa(_.id)),J=34,Z=40,se=14/i,on=Math.max(4,Math.min(en-J-4,R.x+m/2+se)),St=Math.max(4,Math.min(tn-Z-4,R.y-h*.22));d+=`<button class="mapSpot mapHouse ${_?.mine||!_?"mine":""}" data-go="${T}" aria-label="${K(N)}" style="left:${l(R.x-m/2)};top:${l(R.y-h/2)};width:${l(m)};height:${l(h)}">${$i(_?_.style:0,{lit:_?_.lit:!0})}${_?.locked?'<span class="lockBadge">🔒</span>':""}${_?.mine||!_?'<span class="homeBadge">★</span>':""}</button>
        <button class="mapMail ${X?"up":""}" data-mail="${_?_.id:"home"}" aria-label="${K(N)} mailbox" style="left:${l(on)};top:${l(St)};width:${l(J)};height:${l(Z)}">${Gl(X)}</button>`,g+=`<div class="mapSign ${_?.mine||!_?"mine":""}" style="left:${l(R.x)};top:${l(R.y+h/2-2)}">${K(N)}</div>`}),d+=`<button class="mapSpot mapPark" data-go="park" aria-label="The park" style="left:${l(fn.x-100)};top:${l(fn.y-85)};width:${l(200)};height:${l(170)}">${Rl}</button>`,g+=`<div class="mapSign place" style="left:${l(fn.x)};top:${l(fn.y+70)}">Park</div>`,d+=`<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${l(Ht.x-110)};top:${l(Ht.y-90)};width:${l(220)};height:${l(180)}">${Ul}</button>`,g+=`<div class="mapSign place" style="left:${l(Ht.x)};top:${l(Ht.y+78)}">Rainbow Ranch</div>`,d+=`<button class="mapSpot mapClub" data-go="gameroom" aria-label="The clubhouse" style="left:${l(hn.x-95)};top:${l(hn.y-78)};width:${l(190)};height:${l(156)}">${El}</button>`,g+=`<div class="mapSign place" style="left:${l(hn.x)};top:${l(hn.y+82)}">Clubhouse</div>`,Ve.set("park",{x:fn.x,y:fn.y-60}),Ve.set("ranch",{x:Ht.x-30,y:Ht.y-60}),Ve.set("barn",{x:Ht.x+10,y:Ht.y+10}),Ve.set("gameroom",{x:hn.x,y:hn.y-52}),r.insertAdjacentHTML("beforeend",Tl(M,b)+d+'<div class="mapFaces" id="mapFaces"></div>')}t.insertAdjacentHTML("beforeend",g),Ti(),j3(i)}const $r=()=>[{x:fn.x,y:fn.y,r:115},{x:Ht.x,y:Ht.y,r:125},{x:Wt.x,y:Wt.y,r:100},{x:hn.x,y:hn.y,r:90}];function Ug(e,t,n){const s=e.getTotalLength(),o=[];for(let i=0;i<t;i++){const a=t===1?.2:.05+.75*i/(t-1),r=e.getPointAtLength(s*a),l=e.getPointAtLength(Math.min(s,s*a+3));let c=-(l.y-r.y),d=l.x-r.x;const g=Math.hypot(c,d)||1;c/=g,d/=g;const f=[1,-1].map(b=>({x:r.x+c*72*b,y:r.y+d*72*b})).map(b=>({...b,score:Math.min(...n.map(M=>Math.hypot(M.x-b.x,M.y-b.y)-M.r),b.x-50,en-50-b.x,b.y-60,tn-40-b.y)})),p=i%2?f:[f[1],f[0]],u=p[0].score>0||p[0].score>=p[1].score?p[0]:p[1];u.x=Math.max(60,Math.min(en-60,u.x)),u.y=Math.max(62,Math.min(tn-72,u.y)),n.push({x:u.x,y:u.y,r:70}),o.push({x:u.x,y:u.y})}return o}window.__mapFake=e=>{wr=e,Xn(!0)};window.__mapLayout=e=>{const t=document.querySelector("#mapRoad");if(!t)return null;const n=Ug(t,e,$r());let s=1e9,o=1e9,i=!0;return n.forEach((a,r)=>{n.forEach((l,c)=>{c>r&&(s=Math.min(s,Math.hypot(a.x-l.x,a.y-l.y)))}),$r().forEach(l=>{o=Math.min(o,Math.hypot(a.x-l.x,a.y-l.y)-l.r)}),(a.x<55||a.x>en-55||a.y<60||a.y>tn-70)&&(i=!1)}),{n:e,minHouse:s,minSpot:o,inside:i}};function Eg(e){return e.where==="house"&&e.houseId?{kind:"house",houseId:e.houseId,room:e.room}:e.where==="park"||e.where==="ranch"||e.where==="barn"||e.where==="gameroom"?{kind:e.where}:{kind:"square"}}const Y3=e=>e.kind==="house"?"house:"+e.houseId:e.kind;function Ti(){const e=document.getElementById("mapFaces");if(!e||C!=="street")return;const t=Tg(),n=new Set,s=[];if(k){const i=[...k.presence.entries()],a=be();a&&i.push([k.pid,a]);for(const[r,l]of i){const c=k.players.get(r);c&&s.push({key:r,look:c.look,name:c.nickname,mine:r===k.pid,place:Eg(l)})}}else{const i=ne.get().characters[0];i&&s.push({key:"solo",look:Lo(i),name:"You",mine:!0,place:{kind:"square"}})}const o=new Map;for(const i of s){const a=Y3(i.place);o.has(a)||o.set(a,[]),o.get(a).push(i)}for(const[i,a]of o)a.sort((r,l)=>r.mine?-1:l.mine?1:r.name.localeCompare(l.name)),a.forEach((r,l)=>{let c,d;const g=Ve.get("square")??{x:Wt.x,y:Wt.y};if(i==="square")if(xe.portrait){const m=Math.floor(l/3),h=l%3,v=Math.min(3,a.length-m*3);c=g.x+(h-(v-1)/2)*176,d=g.y+m*112}else if(a.length===1)c=Wt.x,d=Wt.y;else{const b=-Math.PI/2+l*(Math.PI*2/a.length);c=Wt.x+Math.cos(b)*78,d=Wt.y+Math.sin(b)*78}else{const b=Ve.get(i)??g,M=xe.portrait?2:3,m=xe.portrait?150:64,h=Math.floor(l/M),v=l%M,_=Math.min(M,a.length-h*M);c=b.x+(v-(_-1)/2)*m,d=b.y-h*(xe.portrait?108:64)}xe.portrait&&(c=Math.max(100,Math.min(xe.w-100,c)),d=Math.max(48,Math.min(xe.h-84,d))),n.add(r.key);let f=e.querySelector(`.mapFace[data-pid="${r.key}"]`);f||(f=document.createElement("button"),f.className="mapFace "+(r.mine?"mine":"other"),f.dataset.pid=r.key,f.setAttribute("aria-label",r.mine?"You":r.name),e.appendChild(f));const p=JSON.stringify(r.look)+r.name;if(f.dataset.look!==p){const b=f.querySelector(".bubble");f.innerHTML=`<span class="face">${Hr(Fe(r.look))}</span><span class="fname">${K(r.mine?"You":r.name)}</span>`,b&&f.appendChild(b),f.dataset.look=p}f.dataset.place=i;const u=xe.portrait?62:46;f.style.left=(c-u/2)*t+"px",f.style.top=(d-u/2)*t+"px",f.style.width=f.style.height=u*t+"px"});e.querySelectorAll(".mapFace").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),cs()}function Qg(e,t){const n=$("mapWorld");if(t&&!n.classList.contains("zoomIn")){const s=t.getBoundingClientRect(),o=n.getBoundingClientRect();n.style.transformOrigin=`${s.left+s.width/2-o.left}px ${s.top+s.height/2-o.top}px`,n.classList.remove("mapIn"),n.classList.add("zoomIn"),B.swish(),setTimeout(()=>{n.classList.remove("zoomIn"),Ic(e)},360)}else Ic(e)}function Uo(e){e.classList.remove("sceneIn"),e.offsetWidth,e.classList.add("sceneIn"),setTimeout(()=>e.classList.remove("sceneIn"),600)}function Ic(e){e.kind==="house"?Dg(e.houseId,e.room):e.kind==="home"?zg():e.kind==="park"?i5():e.kind==="ranch"?xo(!1):e.kind==="barn"?xo(!0):e.kind==="gameroom"&&a5()}function K3(e){const t=k?.presence.get(e);if(!k||!t)return;const n=Eg(t),s=k.players.get(e)?.nickname??"your friend";if(n.kind==="square"){z(`${s} is on the map too! 👋`);return}const o=document.querySelector(`#mapFaces .mapFace[data-pid="${e}"]`)??void 0;Qg(n,o),setTimeout(()=>{const i=be();if(!i||!k)return;const a=t.x+(t.x>300?-110:110);if(n.kind==="house"&&i.where==="house")Qe({...i,x:a,y:t.y}),Pn(),ca(a-de/2);else if((n.kind==="park"||n.kind==="ranch"||n.kind==="barn")&&i.where===n.kind){_t({...i,x:a,y:Math.max(es,Math.min(nn,t.y)),flip:a>t.x});const r=n.kind==="park"?En():Ct(),l=$(n.kind==="park"?"parkScroll":"ranchScroll");requestAnimationFrame(()=>{l.scrollLeft=t.x*r-l.clientWidth/2,He()})}else if(n.kind==="gameroom"&&i.where==="gameroom"){const r=Rs();r||_t({where:"gameroom",x:a,y:Math.max(es,Math.min(nn,t.y)),flip:a>t.x});const l=Tn(),c=$("grScroll"),d=r?.x??t.x;requestAnimationFrame(()=>{c.scrollLeft=d*l-c.clientWidth/2,He()})}z(`You found ${s}! 💕`)},420)}function Qa(e){if(!k)return!1;const t=k.houses.get(e);return!!t&&t.meta.ownerId===k.pid&&Er(t.confirmed.mailbox)>0}let Xo=0;function Ag(){hg();const e=document.getElementById("mailCue"),t=k?.myHouseId()??"",n=k&&t?Er(k.houses.get(t)?.confirmed.mailbox):0;if(!k||C!=="street"||n<=0){n<=0&&(Xo=0),e?.classList.remove("show");return}Xo!==n&&(Xo=n,e?.classList.add("show"),window.setTimeout(()=>{Xo===n&&e?.classList.remove("show")},8e3))}function fa(){const e=k?.myHouseId()??"",t=k&&e?Er(k.houses.get(e)?.confirmed.mailbox):0,n=$("menuBadge");n.textContent=t>9?"9+":String(t),n.classList.toggle("on",t>0);const s=document.getElementById("mailNew");s&&(s.textContent=t>0?t===1?"1 new":t+" new":"",s.classList.toggle("on",t>0));const o=k?k.presence.size:0,i=$("mapBadge");i.textContent=o>9?"9+":String(o),i.classList.toggle("on",o>0),$("btnMap").setAttribute("aria-label",o>0?`Map, ${o} friends online`:"Map");const a=ga(),r=$("chatBadge");r.textContent=a>9?"9+":String(a),r.classList.toggle("on",a>0)}function xr(e){e&&document.querySelectorAll(".toast").forEach(t=>t.remove()),$("menuPop").classList.toggle("hidden",!e),$("btnMenu").setAttribute("aria-expanded",e?"true":"false"),e&&fa(),X3()}function X3(){const e=$("houseTag");if(e.style.top="",!e.classList.contains("show")||$("menuPop").classList.contains("hidden"))return;const t=document.querySelector(".menuCard");if(!t)return;const n=$("stageWrap").getBoundingClientRect(),s=t.getBoundingClientRect(),o=e.getBoundingClientRect();if(!(o.top<s.bottom-2&&o.bottom>s.top+2&&o.left<s.right-2&&o.right>s.left+2))return;const a=s.bottom-n.top+8;a+o.height<n.height-8?e.style.top=a+"px":e.style.top=Math.max(8,n.height-o.height-10)+"px"}$("btnMenu").addEventListener("click",()=>{xr($("menuPop").classList.contains("hidden")),B.click()});$("menuPop").addEventListener("click",e=>{const t=e.target;if(t.id==="menuPop"||t.closest("#menuClose")){xr(!1);return}t.closest(".menuRow")&&xr(!1)});$("btnMail").addEventListener("click",()=>{const e=k?.myHouseId();e?hl(e):z("Join a street to send letters!")});$("secrets").addEventListener("click",()=>{if(C!=="house"){z("Surprises are hiding in your house!");return}tt.isPlay()&&$("modeDecorate").click(),ut="secrets",et(),z("Surprises are in your drawer!")});function hl(e){if(!k||e==="home"||!k.houses.has(e)){z("Join a street to send letters!");return}const t=k.houses.get(e);gi.open(e,t.meta.name,t.meta.ownerId===k.pid,t.confirmed.mailbox?.letters??[]),B.click()}$("mapWorld").addEventListener("click",e=>{const t=e.target;if(C!=="street")return;const n=t.closest(".mapMail");if(n){hl(n.dataset.mail||"home");return}const s=t.closest(".mapFace");if(s){s.classList.contains("mine")?(Xe(s),B.pop(),z("That's you! Tap a place to go there")):K3(s.dataset.pid);return}const o=t.closest("[data-go]");if(!o)return;const i=o.dataset.go;Qg(i.startsWith("house:")?{kind:"house",houseId:i.slice(6)}:{kind:i},o)});function ds(){$("street").classList.add("hidden"),$("park").classList.add("hidden"),$("ranch").classList.add("hidden"),$("gameroom").classList.add("hidden"),ci()?.close(),$("chatTray").classList.add("hidden"),$("sheet").classList.add("hidden")}function _s(){ke=null,Ke=[],ye=!1,k?Qe({where:"street",x:600,y:540,flip:!1}):gt=null,ds(),C="street",$("street").classList.remove("hidden"),$("streetTitle").textContent=k?"Our Neighborhood":"My Map",zt(),Xn(!0);const e=$("mapWorld");e.style.transformOrigin="50% 50%",e.classList.remove("zoomIn","mapIn"),e.offsetWidth,e.classList.add("mapIn"),B.swish()}function zg(){if(k){const e=k.myHouseId();e&&k.houses.has(e)&&Dg(e);return}ds(),C="house",gt=null,tt.sync(!0),zt(),is(),Uo($("stageWrap")),B.sparkle(),Bn()}function Dg(e,t="living"){if(!k||!k.houses.has(e))return;$e=e,C="house",ye=!1,tt.sync(e===k.myHouseId());let n=Si.get(e);n||(n=Cp(k,e,{get:()=>ne.get().soundOn,set:s=>ne.dispatch({type:"settings/sound",on:s})}),Si.set(e,n)),n.dispatch({type:"room/switch",room:t}),Qe({where:"house",houseId:e,room:t,x:900+Math.random()*300,y:540,flip:!1}),ds(),Pg(n),Uo($("stageWrap")),B.sparkle(),Bn()}function pl(){k?.close(),k=null,Si=new Map,C="house",$e="",gt=null,ke=null,Ke=[],ye=!1,$("elsewhere").classList.add("hidden"),ds(),tt.sync(!0),Pg(ne),zt()}$("btnMap").addEventListener("click",()=>{if(C==="street"){B.pop();return}_s()});$("btnHome").addEventListener("click",()=>{if(C==="house"&&(!k||$e===k.myHouseId())){B.pop();return}zg()});$("phoneOk").addEventListener("click",()=>{$("phoneNote").classList.add("hidden"),B.click()});$("elsewhereGo").addEventListener("click",()=>{B.click(),k?.connect()});$("btnSolo").addEventListener("click",()=>{pl(),z("Playing in your own house 🏠")});window.addEventListener("resize",()=>{C==="street"&&Xn(!0),C==="park"&&yl(),C==="ranch"&&_l(),C==="gameroom"&&el(),He()});function ul(e){k=e,Si=new Map,e.on("players",()=>{k===e&&(C==="street"?Xn():C==="park"?rs():C==="ranch"?(Cn(),Ll()):C==="gameroom"?go():(Pn(),zt()),wo==="dress"&&jt())}),e.on("houses",()=>{k===e&&(C==="street"?Xn():C==="house"&&!e.houses.has($e)&&(z("That house is gone now"),_s()))}),e.on("houseMeta",t=>{k!==e||t!==$e||C!=="house"||(Be=null,zt(),Ut(S.get()),et(),yt()||$("sheet").classList.add("hidden"))}),e.on("pres",()=>{k===e&&(C==="street"?Ti():C==="park"?rs():C==="ranch"?Cn():C==="gameroom"?go():Pn())}),e.on("ranch",()=>{k===e&&C==="ranch"&&ka(!0)}),e.on("ranchFail",t=>{k===e&&Mr(t)}),e.on("noride",()=>{if(k!==e)return;const t=be();if(t?.ride!==void 0){const{ride:n,...s}=t;Qe(s),Cn()}z("Someone is riding that horse!")}),e.on("fx",(t,n)=>{k===e&&M5(t,n)}),e.on("bubble",(t,n)=>{k===e&&I3(t,n)}),e.on("sayFail",t=>z(t==="presetsOnly"?"Typing is turned off: pick a bubble!":Ji[t]||"Couldn't send that")),e.on("mailbox",()=>{k===e&&(C==="street"&&Xn(!0),Ag(),gi.refresh(),fa())}),e.on("mailFail",t=>{k===e&&gi.fail(t)}),e.on("settings",()=>{k===e&&($("chatTray").classList.contains("hidden")||Wg(),gi.refresh())}),e.on("removed",()=>{z("A grown-up took this iPad off the street");const t=e.cfg;Kt({url:t.url,code:t.code,id:t.id,parentKey:t.parentKey}),pl()}),e.on("status",t=>{k===e&&(document.body.classList.toggle("reconnecting",t!=="online"&&!e.replaced),(t==="online"||t==="connecting")&&$("elsewhere").classList.add("hidden"))}),e.on("replaced",()=>{k===e&&$("elsewhere").classList.remove("hidden")}),e.on("table",()=>{if(k===e){if(C==="gameroom"){const t=Rs(),n=be();t&&n?.where==="gameroom"&&Math.hypot(n.x-t.x,n.y-t.y)>40&&Qe({where:"gameroom",x:t.x,y:Math.max(es,Math.min(nn,t.y)),flip:n.flip}),go()}ci()?.refresh()}}),e.on("tblFail",(t,n)=>{k===e&&ci()?.fail(t,n)}),e.on("welcome",()=>{if(k===e)if(C==="street")Xn(!0);else if(C==="park"||C==="ranch"){const t=be();t&&Qe(t),C==="park"?yl():_l(),He()}else if(C==="gameroom"){const t=be();t&&Qe(t),el(),He(),ci()?.refresh()}else e.houses.has($e)?is():_s()}),_s()}async function J3(){zt();const e=ea(),t=Ls();if(!e||!t?.token||t.url!==e)return;const n=new ta(t),s=await n.connect();s==="ok"?ul(n):(n.close(),s!=="closed"&&z("Couldn't reach the street. Playing at home!"))}function kt(e,t,n=""){const s=document.createElement("div");s.className="sheet hoodSheet "+n,s.innerHTML=`<div class="card">${e}</div>`,document.body.appendChild(s),B.swish();const o=()=>s.remove();return s.addEventListener("click",i=>{const a=i.target;if(a===s||a.closest('[data-m="close"]'))return o();t(a,o,s)}),{root:s,close:o}}const bt='<button class="close" data-m="close">✕</button>';$("btnHood").addEventListener("click",()=>e5());function e5(){const e=ea();if(!e){kt(`${bt}<h2>Neighborhood</h2><p class="hint">The street isn't open yet. Ask a grown-up to set it up!</p>`,()=>{});return}const t=Ls()?.url===e?Ls():null;kt(`${bt}<h2>Neighborhood</h2><div class="bigBtns">
      ${t?.token?`<button class="big go" data-m="go">${rt.street}<span>Go to my street</span></button>`:`<button class="big go" data-m="join">${rt.street}<span>Join a friend's street</span></button>`}
      <button class="big grown" data-m="create">${rt.shield}<span>${t?.parentKey?"Grown-ups":"Grown-ups: start a street"}</span></button></div>`,async(n,s)=>{const o=n.closest("[data-m]")?.dataset.m;if(o==="go"){s();const i=new ta(t),a=await i.connect();a==="ok"?ul(i):(i.close(),z(a.startsWith("badtoken")?"Please join again":"Couldn't reach the street"))}o==="join"&&(s(),fo(e)),o==="create"&&(s(),await md()&&(t?.parentKey?ha():t5(e)))})}async function t5(e){let t;try{t=await Mp(e)}catch{z("Couldn't create a street right now");return}Kt({url:e,code:t.code,id:t.id,parentKey:t.parentKey}),kt(`${bt}<h2>Your street is ready!</h2><p class="hint">Kids join with this code (you can pick your own on the grown-up screen):</p><div class="code" id="newCode">${t.code}</div>
    <p class="hint small">Grown-up key (keep it private; it opens the grown-up screen on another device):<br><b class="key" id="parentKey">${t.parentKey}</b></p>
    <div class="bigBtns"><button class="big grown" data-m="setup">${rt.shield}<span>Add kids' names &amp; code</span></button>
    <button class="big go" data-m="joinhere">${rt.street}<span>Join on this iPad</span></button></div>`,(n,s)=>{n.closest('[data-m="joinhere"]')&&(s(),ml(e,t.code)),n.closest('[data-m="setup"]')&&(s(),ha())})}function fo(e,t=""){const n=kt(`${bt}<h2>Join a street</h2><p class="hint">Type the code a grown-up gave you</p>
    <form id="codeForm" class="codeForm"><input id="codeInput" maxlength="${zr}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="CODE"/><button type="submit" class="go">Next</button></form>
    <p class="err">${K(t)}</p>`,()=>{}),s=n.root.querySelector("#codeInput");setTimeout(()=>s.focus(),50),s.addEventListener("input",()=>{s.value=ki(s.value)}),n.root.querySelector("#codeForm").addEventListener("submit",o=>{o.preventDefault();const i=ki(s.value);if(!Hh(i)){n.close(),fo(e,"That code looks wrong. Try again!");return}n.close(),ml(e,i)})}async function ml(e,t,n=""){let s;try{s=await Lp(e,t)}catch{fo(e,"Couldn't reach the street. Try again!");return}if("slow"in s){fo(e,"Too many tries. Ask a grown-up and try again in a few minutes.");return}if(!s.exists){fo(e,"Hmm, we couldn't find that street.");return}window.__lastLookupId=s.id,n5(e,t,s.id,s.roster,n)}function n5(e,t,n,s,o=""){if(s.length){kt(`${bt}<h2>Who are you?</h2>${o?`<p class="err">${K(o)}</p>`:'<p class="hint">Tap your name</p>'}<div class="nicks roster">${s.map((i,a)=>`<button data-nick="${a}" ${i.claimed?"disabled":""}>${K(i.name)}${i.claimed?"<small>signed in</small>":""}</button>`).join("")}</div>
      <p class="hint small">Not on the list? Ask a grown-up to add your name.</p>`,(i,a)=>{const r=i.closest("[data-nick]");if(!r||r.disabled)return;a();const l=s[+r.dataset.nick];l.hasHouse?Zg(e,t,n,l.name,void 0):Oc(e,t,n,l.name)},"wide");return}kt(`${bt}<h2>Pick your street name</h2>${o?`<p class="err">${K(o)}</p>`:""}<div class="nicks">${Zl.map((i,a)=>`<button data-nick="${a}">${K(i)}</button>`).join("")}</div>`,(i,a)=>{const r=i.closest("[data-nick]");r&&(a(),Oc(e,t,n,Zl[+r.dataset.nick]))},"wide")}function Oc(e,t,n,s){kt(`${bt}<h2>Hi, ${K(s)}!</h2><p class="hint">What should your house on the street be?</p>
    <div class="bigBtns"><button class="big go" data-m="bring">${$i(2)}<span>Bring my house</span></button>
    <button class="big" data-m="fresh">${$i(5)}<span>Start a new one</span></button></div>`,(o,i)=>{const a=o.closest("[data-m]")?.dataset.m;a&&(i(),Zg(e,t,n,s,a==="bring"))})}async function Zg(e,t,n,s,o){const i=ne.get(),a=i.characters[0],r=Lo(a??{});let l;if(o&&(l=i,a)){const{reduce:u}=await Sr(async()=>{const{reduce:b}=await Promise.resolve().then(()=>vh);return{reduce:b}},void 0);l=u(i,{type:"char/delete",id:a.id})}const c=Ls(),d={url:e,code:t,id:n,parentKey:c?.id===n||c?.code===t?c.parentKey:void 0},g=i.dog?{name:i.dog.name,breed:i.dog.breed}:null,f=new ta(d),p=await f.connect({nickname:s,look:r,house:l,dog:g});if(p==="ok"){Kt(f.cfg),ul(f),z(`Welcome to the street, ${s}!`),vw()&&(ww(),we=Oe,Hs("dress"));return}f.close(),p.startsWith("nickname")?ml(e,t,p.endsWith("notOnList")?"That name is not on the list anymore.":"That name is already signed in on another iPad. Ask a grown-up!"):z(p==="full"?"That street is full":"Couldn't join right now")}$("btnParent").addEventListener("click",async()=>{await md()&&ha()});const s5={codeTaken:"That code is already used by another street. Try adding a number!",badCode:"Codes are 4–16 letters or numbers.",badName:"Use a first name only (letters).",rosterFull:`Up to ${Ph} names.`,nameInUse:"Remove that player first.",codeFixed:"This street's code can't be changed."};async function ha(){const e=Ls();if(!e)return;if(!e.parentKey){const a=kt(`${bt}<h2>Grown-up key</h2><p class="hint">Enter the key you got when the street was made</p><form id="keyForm" class="codeForm"><input id="keyInput" autocomplete="off" spellcheck="false"/><button class="go">OK</button></form>`,()=>{});a.root.querySelector("#keyForm").addEventListener("submit",r=>{r.preventDefault(),e.parentKey=a.root.querySelector("#keyInput").value.trim(),Kt(e),k&&(k.cfg.parentKey=e.parentKey),a.close(),ha()});return}let t=k;t||(t=new ta({...e,token:void 0}),await t.connect());const n=t,s=a=>o.root.querySelector(a).value,o=kt(`${bt}<h2>Grown-up screen</h2><div id="parentBody"><p class="hint">Loading…</p></div>`,async a=>{const r=a.closest("[data-p]");if(!r)return;const l=r.dataset.p;if(l==="free"&&n.parent({op:"freeChat",on:r.dataset.on!=="1"}),l==="freeMail"&&n.parent({op:"freeMail",on:r.dataset.on!=="1"}),l==="rename"&&n.parent({op:"rename",houseId:r.dataset.hid,name:s(`input[data-hid="${r.dataset.hid}"]`)}),l==="add"&&n.parent({op:"rosterAdd",name:r.dataset.name??s("#rosterInput")}),l==="unname"&&n.parent({op:"rosterRemove",name:r.dataset.name}),l==="unclaim"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again";return}n.parent({op:"unclaim",name:r.dataset.name})}if(l==="setcode"&&n.parent({op:"setCode",code:s("#codeEdit")}),l==="remove"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again to remove";return}n.parent({op:"remove",pid:r.dataset.pid})}if(l==="mailClear"||l==="mailClearAll"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent=l==="mailClearAll"?"Tap again to clear every mailbox":r.dataset.id?"Tap again":"Tap again to clear this mailbox";return}l==="mailClearAll"?n.parent({op:"mailClearAll"}):n.parent({op:"mailClear",houseId:r.dataset.hid,...r.dataset.id?{id:r.dataset.id}:{}})}if(l==="leave"){if(r.dataset.sure!=="1"){r.dataset.sure="1",r.textContent="Tap again: forget this street here";return}Kt(null),o.close(),pl(),z("This iPad left the street")}},"wide parent");o.root.addEventListener("submit",a=>{a.preventDefault();const r=a.target.id;r==="rosterForm"&&n.parent({op:"rosterAdd",name:s("#rosterInput")}),r==="codeForm2"&&n.parent({op:"setCode",code:s("#codeEdit")})});const i=a=>{const r=new Date(a);return Number.isFinite(r.getTime())?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r.getMonth()]+" "+r.getDate()+", "+r.getFullYear():""};n.on("parentInfo",a=>{const r=o.root.querySelector("#parentBody");if(!r)return;const l=Ls();l&&l.code!==a.code&&(l.code=a.code,Kt(l)),n.cfg.code=a.code;const c=a.roster??[],d=new Set(c.map(m=>m.name.toLowerCase())),g=Wh.filter(m=>!d.has(m.toLowerCase())),f=c[0]?.name??"Reagan",p=Array.isArray(a.mail)?a.mail:[],u=p.some(m=>m.letters&&m.letters.length),b=fd(a.settings),M=p.map(m=>`<div class="pMailHouse"><div class="pMailName">${K(m.name||"House")}</div>${(m.letters||[]).slice().reverse().map(h=>`<div class="pLetter"><b>${K(h.from)}</b><span class="pWhen">${K(i(h.at))}</span><p>${K(h.text)}</p><button type="button" class="danger" data-p="mailClear" data-hid="${K(m.houseId)}" data-id="${K(h.id)}">Clear</button></div>`).join("")||'<p class="hint">No letters.</p>'}${(m.letters||[]).length?`<button type="button" class="danger" data-p="mailClear" data-hid="${K(m.houseId)}">Clear this mailbox</button>`:""}</div>`).join("");r.innerHTML=`${a.note?`<p class="err" id="pNote">${K(s5[a.note]??a.note)}</p>`:""}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${K(a.code)}</div></div>
        <div><div class="label">Free typing</div><button class="toggle ${a.settings.freeChat?"on":""}" data-p="free" data-on="${a.settings.freeChat?1:0}" id="pFree">${a.settings.freeChat?"On":"Off (presets only)"}</button><p class="hint small">Chat bubbles. Off means preset phrases only.</p></div>
        <div><div class="label">Let kids type their own letters</div><button class="toggle ${b?"on":""}" data-p="freeMail" data-on="${b?1:0}" id="pFreeMail">${b?"On":"Off (presets only)"}</button><p class="hint small">Letters only. Off means preset phrases only.</p></div></div>
      <div class="label">Letters</div><div id="parentMail">${M||'<p class="hint">No letters right now.</p>'}${u?'<button type="button" class="danger" data-p="mailClearAll" id="mailClearAll">Clear every mailbox</button>':""}</div>
      <form class="pAdd" id="codeForm2"><input id="codeEdit" maxlength="${zr}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="e.g. ${K(ki(f))}7"/><button data-p="setcode" type="button">Use this code</button></form>
      <p class="hint small">Tip: a word plus a number (like ${K(ki(f))}7) is easy to remember and harder to guess. Not case-sensitive.</p>
      <div class="label">Kids' names (sign-in list)</div>
      <div class="roster">${c.map(m=>`<span class="rName ${m.claimed?"claimed":""}"><b>${K(m.name)}</b>${m.claimed?`<i>signed in</i><button data-p="unclaim" data-name="${K(m.name)}">Reset</button>`:m.hasHouse?"<i>not signed in</i>":`<button class="x" data-p="unname" data-name="${K(m.name)}" aria-label="Remove name">×</button>`}</span>`).join("")||'<p class="hint">No names yet: kids pick a fun nickname instead.</p>'}</div>
      <form class="pAdd" id="rosterForm"><input id="rosterInput" maxlength="20" autocomplete="off" placeholder="First name"/><button data-p="add" type="button">Add</button></form>
      ${g.length?`<div class="sugg">${g.map(m=>`<button data-p="add" data-name="${m}">+ ${m}</button>`).join("")}</div>`:""}
      <div class="label">Houses</div>${a.houses.map(m=>`<div class="pHouse"><input data-hid="${m.id}" value="${K(m.name)}" maxlength="24"/><button data-p="rename" data-hid="${m.id}">Rename</button></div>`).join("")||'<p class="hint">No houses yet.</p>'}
      <div class="label">Players</div>${a.players.map(m=>`<div class="pPlayer"><span class="dot ${m.online?"on":""}"></span>${K(m.nickname)}<button class="danger" data-p="remove" data-pid="${m.pid}">Remove</button></div>`).join("")||'<p class="hint">Nobody has joined yet.</p>'}
      <p class="hint small">Letters stay on the server for up to 30 days. They are filtered, and only a first name is stored. You can clear them here, or turn off “Let kids type their own letters” so new letters use preset phrases. Chat bubbles are only relayed to kids standing nearby and are not saved. No emails or last names. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays).</p>
      <button class="danger wideBtn" data-p="leave">Forget this street on this device</button>`}),n.on("error",a=>{a==="badkey"&&(z("That grown-up key didn't work"),e.parentKey=void 0,Kt(e),o.close())}),n.parent({op:"info"})}let gt=null;function En(){return $("park").clientHeight/qr}const o5=()=>{const e=ne.get();return e.characters.find(t=>t.id===e.dog?.owner)??e.characters[0]},Dt=()=>k?be():gt;function _t(e){k?Qe(e):gt=e,C==="ranch"?Cn():C==="gameroom"?go():rs()}function _n(e="park"){if(k){const n=[],s=[...k.presence.entries()],o=be();o&&s.push([k.pid,o]);for(const[i,a]of s){const r=k.players.get(i);r&&a.where===e&&n.push({key:i,look:r.look,name:r.nickname,p:a,mine:i===k.pid,dog:r.dog??null})}return n}const t=o5();return gt&&gt.where===e?[{key:"solo",look:Lo(t??{}),name:"",p:gt,mine:!0,dog:ne.get().dog??null}]:[]}function yl(){const e=En(),t=$("parkWorld"),n=s=>s*e+"px";t.style.width=Zr*e+"px",t.style.height=qr*e+"px",t.style.setProperty("--sc",String(e)),t.innerHTML=Np()+Ga.map((s,o)=>s.kind==="swing"?`<div class="swing" data-swing="${o}" style="left:${n(s.x-30)};top:${n($t)};width:${n(60)};height:${n(240)}">${jp}</div>`:"").join("")+Ga.map((s,o)=>`<button class="pspot k-${s.kind}" data-spot="${o}" aria-label="${s.kind}" style="left:${n(s.x-50)};top:${n(s.y-(s.kind==="swing"?70:55))};width:${n(100)};height:${n(s.kind==="swing"?90:65)}"></button>`).join("")+`<button class="pspot slide" data-act="slide" aria-label="Slide" style="left:${n(te.ladder-45)};top:${n(te.top.y-30)};width:${n(130)};height:${n(560-te.top.y+30)}"></button><button class="pspot pond" data-act="splash" aria-label="Pond" style="left:${n(1235)};top:${n(462)};width:${n(370)};height:${n(105)}"></button><button class="pspot gate" data-act="exit" aria-label="Back to the street" style="left:${n(25)};top:${n(240)};width:${n(180)};height:${n(260)}"></button><div class="ripples" id="ripples"></div><button class="ball" id="ball" aria-label="Ball">${Fp}</button><div class="savatars" id="pavatars"></div>`,Ri(),rs(),He()}const Nc=2400;function rs(){const e=document.getElementById("pavatars");if(!e||C!=="park")return;const t=En(),n=new Set,s=new Set;for(const o of _n()){n.add(o.key);let i=e.querySelector(`.savatar[data-pid="${o.key}"]`);i||(i=document.createElement("div"),i.className="savatar "+(o.mine?"mine":"other"),i.dataset.pid=o.key,e.appendChild(i),o.mine&&qg(i));const a=JSON.stringify(o.look)+o.name;if(i.dataset.look!==a){const g=i.querySelector(".bubble");i.innerHTML=o.name?fl(o.look,o.name):`<div class="inner">${Fe(o.look)}</div>`,g&&i.appendChild(g),i.dataset.look=a}const r=(Bo[o.look.size]??1)*t*.95,l=Rn*r,c=Qt*r;i.style.left=o.p.x*t-l/2+"px",i.style.top=o.p.y*t-c+"px",i.style.width=l+"px",i.style.height=c+"px",i.style.zIndex=String(100+Math.round(o.p.y)),i.classList.toggle("flipped",o.p.flip),So(i,o.look,o.mine);const d=o.p.pose??"";i.dataset.pose!==d&&(i.classList.remove("pose-sit","pose-swing","pose-slide"),i.offsetWidth,d==="slide"&&(i.style.setProperty("--sx",(te.top.x-te.bottom.x)*t+"px"),i.style.setProperty("--sy",(te.top.y-te.bottom.y)*t+"px")),d&&i.classList.add("pose-"+d),i.dataset.pose=d),d==="swing"?(i.style.transformOrigin=`50% ${($t-o.p.y)*t+c}px`,i.style.animationDelay=-(Date.now()%Nc)/1e3+"s",s.add(o.p.spot??-1)):(i.style.transformOrigin="",i.style.animationDelay="")}e.querySelectorAll(".savatar").forEach(o=>{n.has(o.dataset.pid)||o.remove()}),document.querySelectorAll("#parkWorld .swing").forEach(o=>{const i=s.has(+o.dataset.swing);i&&!o.classList.contains("swinging")&&(o.style.animationDelay=-(Date.now()%Nc)/1e3+"s"),o.classList.toggle("swinging",i)}),cs()}function qg(e){e.addEventListener("pointerdown",t=>{t.preventDefault(),t.stopPropagation();const n=Dt();if(!n||n.where!=="park"&&n.where!=="ranch"&&n.where!=="barn")return;const s=n.where!=="park",o=n.where;Ke=[];const i=$(s?"ranchScroll":"parkScroll"),a=s?Ct():En(),r=o==="barn"?Wr:s?Mo:Zr,l=v=>{const _=$(s?"ranchWorld":"parkWorld").getBoundingClientRect();return{x:(v.clientX-_.left)/a,y:(v.clientY-_.top)/a}},c=l(t),d={x:n.x-c.x,y:n.y-c.y};let g=t,f=0,p=n.x,u=!1;const b=v=>{const _=l(v),P=Dt();if(!P)return;const R=Math.max(60,Math.min(r-60,_.x+d.x)),T=Math.max(470,Math.min(590,_.y+d.y));if(!u&&Math.hypot(R-P.x,T-P.y)<6)return;u=!0;const N=Math.abs(R-p)>3?R<p:P.flip;Math.abs(R-p)>3&&(p=R),_t(o==="barn"?{where:"barn",x:R,y:T,flip:N}:s?{where:"ranch",x:R,y:T,flip:N,...P.ride!==void 0?{ride:P.ride}:{}}:{where:"park",x:R,y:T,flip:N})},M=()=>{const v=i.getBoundingClientRect(),_=g.clientX<v.left+70?-10:g.clientX>v.right-70?10:0;_&&u&&(i.scrollLeft+=_,b(g)),f=requestAnimationFrame(M)};f=requestAnimationFrame(M),e.classList.add("lifted"),B.pick();const m=v=>{v.pointerId===t.pointerId&&(g=v,b(v))},h=v=>{v.pointerId===t.pointerId&&(cancelAnimationFrame(f),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",h),e.classList.remove("lifted"),B.drop())};window.addEventListener("pointermove",m),window.addEventListener("pointerup",h)})}$("parkWorld").addEventListener("pointerdown",e=>{e.target.closest(".pspot, .ball, .pet")&&e.stopPropagation()});$("parkWorld").addEventListener("click",e=>{const t=e.target,n=Dt();if(!n)return;if(t.closest("#ball")){r5();return}const s=t.closest("[data-spot]");if(s){const i=+s.dataset.spot,a=Ga[i];if(n.spot===i&&n.pose){_t({where:"park",x:a.x,y:Math.min(590,a.y+40),flip:n.flip});return}if(_n().some(r=>!r.mine&&r.p.spot===i&&r.p.pose)){z("Someone is already there!");return}_t({where:"park",x:a.x,y:a.y,flip:n.flip,pose:a.kind==="swing"?"swing":"sit",spot:i}),a.kind==="swing"?B.boing():B.drop();return}const o=t.closest("[data-act]")?.dataset.act;if(o==="slide"&&(_t({where:"park",x:te.bottom.x,y:te.bottom.y,flip:!1,pose:"slide"}),B.swish(),setTimeout(()=>{const i=Dt();i?.pose==="slide"&&_t({where:"park",x:i.x,y:i.y,flip:i.flip})},1500)),o==="splash"){const i=$("parkWorld").getBoundingClientRect(),a=(e.clientX-i.left)/En();Ig(a),k?.fx({k:"splash",x:a})}o==="exit"&&Og()});function Ig(e){const t=document.getElementById("ripples");if(!t||C!=="park")return;const n=En();for(let s=0;s<2;s++){const o=document.createElement("div");o.className="ripple";const i=(120+s*70)*n;Object.assign(o.style,{left:e*n-i/2+"px",top:512*n-i*.18+"px",width:i+"px",height:i*.36+"px",animationDelay:s*.15+"s"}),t.appendChild(o),setTimeout(()=>o.remove(),1400)}for(let s=0;s<6;s++){const o=document.createElement("div");o.className="drop",Object.assign(o.style,{left:e*n+"px",top:505*n+"px"}),o.style.setProperty("--dx",(s-2.5)*14+"px"),t.appendChild(o),setTimeout(()=>o.remove(),900)}B.splash()}function i5(){ds(),Ke=[],ye=!1,C="park",$("park").classList.remove("hidden"),Uo($("park"));const e={where:"park",x:290,y:548,flip:!1};k?Qe(e):gt=e,$("streetTitle").textContent="The Park",zt(),yl(),requestAnimationFrame(()=>{const t=$("parkScroll");t.scrollLeft=0,He()}),B.sparkle()}function Og(){_s()}function a5(){ds(),Ke=[],ye=!1,C="gameroom",$("gameroom").classList.remove("hidden");const e=Rs(),t=e?{where:"gameroom",x:e.x,y:Math.max(es,Math.min(nn,e.y)),flip:!1}:{where:"gameroom",x:Di()?520:280,y:560,flip:!1};k?Qe(t):gt=t,$("streetTitle").textContent="The Clubhouse",zt(),el(),requestAnimationFrame(()=>{const n=Tn(),s=$("grScroll"),o=e?.x??(Di()?520:280);s.scrollLeft=Math.max(0,o*n-s.clientWidth/2),He(),uf()}),Uo($("gameroom")),B.sparkle()}$("btnLeavePark").addEventListener("click",()=>{C==="ranch"&&ye?xo(!1):Og()});let kn={x:2620,y:565},ke=null;function Ri(e=!1){const t=document.getElementById("ball");if(!t)return;const n=En(),s=34*n;e||t.classList.remove("flying"),t.style.left=kn.x*n-s/2+"px",t.style.top=kn.y*n-s+"px",t.style.width=t.style.height=s+"px"}function r5(){if(ke)return;const e=Ee.x0+40+Math.random()*(Ee.x1-Ee.x0-80),t=Ee.y0+25+Math.random()*(Ee.y1-Ee.y0-35);Ng(k?k.pid:"solo",e,t),k?.fx({k:"ball",x:e,y:t})}function Ng(e,t,n){if(C!=="park")return;const s=document.getElementById("ball");kn={x:t,y:n},ke={thrower:e,phase:"fly",dog:null,until:performance.now()+12e3},s&&(s.classList.remove("flying"),s.offsetWidth,s.classList.add("flying"),Ri(!0)),B.boing(),setTimeout(()=>{ke?.phase==="fly"&&(ke.phase="chase",document.getElementById("ball")?.classList.remove("flying"),bn.size||(ke=null))},650)}function l5(e){if(!k)return gt;const t=e===k.pid?be():k.presence.get(e);return t&&t.where==="park"?t:null}const bn=new Map,Aa=e=>(t,n,s,o,i)=>{t.style.left=(n-o/2)*e+"px",t.style.top=(s-i)*e+"px",t.style.width=o*e+"px",t.style.height=i*e+"px"};function c5(){const e=[];if(C==="house"){const t=S.get(),n={box:ce,place:Es,z:s=>String(4e3+Math.round(s)),scale:1};if(k&&Je!==ne){const s=[...k.presence.entries()],o=be();o&&s.push([k.pid,o]);for(const[i,a]of s){const r=k.players.get(i)?.dog;r&&a.where==="house"&&a.houseId===$e&&a.room===t.currentRoom&&e.push({key:i,dog:r,x:a.x,y:a.y,flip:a.flip,...n})}}else if(t.dog){const s=t.characters.find(o=>o.id===t.dog.owner)??t.characters[0];s&&s.room===t.currentRoom&&e.push({key:"solo",dog:t.dog,x:s.x,y:s.y,flip:s.flip,...n})}}else if(C==="park"){const t=document.getElementById("pavatars");if(!t)return e;const n=En();for(const s of _n())s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Aa(n),z:o=>String(Math.round(o)-200),scale:.95})}else if(C==="ranch"){const t=document.getElementById("ravatars");if(!t)return e;const n=Ct();for(const s of _n(ye?"barn":"ranch"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Aa(n),z:o=>String(100+Math.round(o)),scale:.95,riding:s.p.ride!==void 0})}else if(C==="gameroom"){const t=document.getElementById("gavatars");if(!t)return e;const n=Tn();for(const s of _n("gameroom"))s.dog&&e.push({key:s.key,dog:s.dog,x:s.p.x,y:s.p.y,flip:s.p.flip,box:t,place:Aa(n),z:o=>String(Math.round(o)-200),scale:.95})}return e}let jc=performance.now();function d5(e,t){const n=new Set;for(const s of c5()){if(h5(s.key))continue;n.add(s.key);let o=bn.get(s.key);const i=s.flip?1:-1,a=!s.riding&&C==="house"&&S.get().currentRoom==="backyard",r=s.riding?200:78;let l=a?sc.x:s.x+i*r;s.riding?l=Math.max(50,Math.min(Mo-50,l)):C==="house"&&!a&&(l=Kg(l,46));const c=a?sc.y:Math.min(595,s.y+(s.riding?28:6));if(!o||o.box!==s.box||!o.el.isConnected){o?.el.remove();const _=document.createElement("div");_.className="pet pet-dog",_.dataset.dog=s.key,s.box.appendChild(_),g5(_,s.key),o={el:_,box:s.box,x:l,y:c,flip:s.flip,pose:"",look:"",idle:1,trickUntil:0,sitTrick:!1},bn.set(s.key,o)}let d=l,g=c,f=s.riding?980:320;if(ke&&e>ke.until&&(ke=null,Ri()),ke&&C==="park"){if(ke.phase==="chase")d=kn.x,g=kn.y,f=950,Math.hypot(o.x-d,o.y-g)<28&&(ke.phase="carry",ke.dog=s.key,B.woof());else if(ke.phase==="carry"&&ke.dog===s.key){const _=l5(ke.thrower)??{x:(Ee.x0+Ee.x1)/2,y:540};d=_.x+60,g=Math.min(590,_.y+6),f=750,kn={x:o.x+(o.flip?-40:40),y:o.y-30*s.scale},Math.hypot(o.x-d,o.y-g)<26&&(kn={x:_.x+70,y:Math.min(590,_.y+12)},ke=null,fi(o,"♥"),B.sparkle()),Ri()}}const p=e<o.trickUntil,u=d-o.x,b=g-o.y,M=Math.hypot(u,b);let m=!1;if(M>(ke?4:10)&&!p){const _=ia()?M:Math.min(M,f*t);o.x+=u/M*_,o.y+=b/M*_,m=!0,Math.abs(u)>1.5&&(o.flip=u<0),o.idle=0}else o.idle+=t,!p&&o.idle>.3&&Math.abs(s.x-o.x)>4&&(o.flip=s.x<o.x);const h=p&&o.sitTrick?"sit":m?"stand":o.idle>.9?"sit":"stand",v=h+s.dog.breed;if(o.pose+o.look!==h+v){const _=[...o.el.querySelectorAll(".bubble, .kennelBtn")];o.el.innerHTML=`<div class="inner">${ko(s.dog.breed,h)}</div>`;for(const P of _)o.el.appendChild(P);o.pose=h,o.look=v}o.el.dataset.name=s.dog.name,o.el.classList.toggle("walking",m),o.el.classList.toggle("flipped",o.flip),s.place(o.el,o.x,o.y,92*s.scale,71*s.scale),o.el.style.zIndex=s.z(o.y+1),Gg(o.el,s.key,!1)}for(const[s,o]of bn)n.has(s)||(o.el.remove(),bn.delete(s))}function fi(e,t){e.el.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.el.appendChild(n),Qs(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const Fc=new Map;function jg(e,t){const n=bn.get(e);if(!n)return;const s=n.el.dataset.name??"";n.trickUntil=performance.now()+1400,n.sitTrick=t===0,n.el.classList.remove("spin","hop"),n.el.offsetWidth,t===0&&(fi(n,`${s} sits! 🐾`),B.pop()),t===1&&(n.el.classList.add("spin"),fi(n,"Wheee! ✨"),B.spin()),t===2&&(n.el.classList.add("hop"),fi(n,"Woof! Woof!"),B.woof())}function g5(e,t){e.addEventListener("pointerdown",n=>{n.stopPropagation(),n.preventDefault()}),e.addEventListener("click",n=>{n.stopPropagation();const s=(Fc.get(t)??0)%3;Fc.set(t,s+1),jg(t,s),k&&k.fx({k:"trick",owner:t,v:s})})}function pa(e){const t=e?.dogKennel?.item;if(!t||!e)return null;for(const n of Object.values(e.rooms)){const s=n.items.find(o=>o.id===t&&o.kind==="kennel");if(s)return s}return null}function f5(e){if(e==="solo")return ne.get();if(!k)return null;const t=k.players.get(e)?.houseId;return t?k.view(t):null}function h5(e){return!!pa(f5(e))}function kl(){if(k){const e=k.myHouseId();return e?k.view(e):null}return ne.get()}function Fg(){if(C!=="house")return null;const e=S.get(),t=pa(e);if(!t||!e.rooms[e.currentRoom]?.items.some(n=>n.id===t.id))return null;if(k&&Je!==ne){const n=k.houses.get($e)?.meta.ownerId,s=n?k.players.get(n)?.dog??null:null;return!n||!s?null:{key:n,dog:s,item:t}}return e.dog?{key:"solo",dog:e.dog,item:t}:null}function p5(){const e=kl();if(!e)return null;const t=Ei()?S.get().currentRoom:null;let n=null,s=null;for(const[o,i]of Object.entries(e.rooms))for(const a of i.items)a.kind==="kennel"&&((!n||a.z>=n.z)&&(n=a),o===t&&(!s||a.z>=s.z)&&(s=a));return s??n}function Jo(e){if(!wl()){z("Adopt a dog first!");return}so({type:"dog/kennel",item:e}),e?(B.pop(),z("Rest well, puppy!")):(B.woof(),z("Come on, puppy!"))}function bl(e){if(!wl()){z("Adopt a dog first!");return}const t=pa(kl());if(e===void 0){if(t){Jo(null);return}const n=p5();if(!n){z("Put a dog kennel down first!");return}Jo(n.id);return}t?.id===e?Jo(null):Jo(e)}function Vg(e){const t=S.get(),n=t.rooms[t.currentRoom]?.items.find(s=>s.id===e);if(n){if(n.kind==="kennel"){Ei()&&bl(n.id);return}n.kind==="cat-tower"&&x5()}}function u5(e,t){const n=S.get(),s=n.rooms[n.currentRoom]?.items.find(i=>i.id===t);if(!s)return;const o=Dp(s.kind);if(e.classList.remove("wiggle"),e.offsetWidth,e.classList.add("wiggle"),B.click(),o==="kennel"||o==="tower"){Vg(t);return}if(o==="lamp"){e.classList.toggle("lamp-on");return}if(o==="open"){e.classList.toggle("opened");return}o==="sit"&&y5(s),o==="swing"&&m5(s)}let dt=null,to=!1;function Ui(){ce.querySelectorAll(".item.swinging").forEach(e=>{(!dt||e.dataset.id!==dt.item)&&e.classList.remove("swinging")}),dt&&ce.querySelector(`.item[data-id="${dt.item}"]`)?.classList.add("swinging")}function m5(e){const t=S.get(),n=t.characters.find(i=>i.id===we&&i.room===t.currentRoom)??t.characters.find(i=>i.room===t.currentRoom);if(!n)return;if(dt?.id===n.id&&dt.item===e.id){dt=null,to=!0,S.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x+70,y:Math.max(e.y,520)}),to=!1,Ui();return}const s=We[e.kind],o=e.y-(s?ct(s)*e.scale*.26:40);dt={id:n.id,item:e.id},to=!0,S.dispatch({type:"char/move",id:n.id,room:t.currentRoom,x:e.x,y:o}),to=!1,Ui()}function y5(e){const t=Math.max(ra+40,e.y-8);if(k&&C==="house"){const o=be();o&&o.where==="house"&&(Qe({...o,x:e.x,y:t,flip:!1}),Pn());return}const n=S.get(),s=n.characters.find(o=>o.id===we&&o.room===n.currentRoom)??n.characters.find(o=>o.room===n.currentRoom);s&&S.dispatch({type:"char/move",id:s.id,room:n.currentRoom,x:e.x,y:t})}function Gg(e,t,n){const s=k?t===k.pid:t==="solo";let o=e.querySelector(".kennelBtn");if(!s){o?.remove();return}o||(o=document.createElement("button"),o.type="button",o.className="kennelBtn",o.addEventListener("pointerdown",i=>{i.stopPropagation(),i.preventDefault()}),o.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault(),bl()}),e.appendChild(o)),o.textContent=n?"Out":"Kennel",k5(o)}function k5(e){if(C!=="house"){e.style.left=e.style.right=e.style.top=e.style.bottom=e.style.transform="";return}const t=e.parentElement;if(!t)return;const n=I.getBoundingClientRect().width/I.offsetWidth||1,s=I.getBoundingClientRect(),o=4,i={l:s.left+o,t:s.top+o,r:s.right-o,b:s.bottom-o},a=ce.querySelector(".char")?.getBoundingClientRect(),r=ce.querySelector('.item[data-kind="sofa"]')?.getBoundingClientRect(),l=[...ce.querySelectorAll(".pet-cat, .item")].map(U=>U.getBoundingClientRect()).filter(U=>U.width>2&&U.height>2),c=(U,Q)=>!!Q&&U.left<Q.right-1&&U.right>Q.left+1&&U.top<Q.bottom-1&&U.bottom>Q.top+1,d=(U,Q)=>c(U,Q)?Math.max(0,Math.min(U.right,Q.right)-Math.max(U.left,Q.left))*Math.max(0,Math.min(U.bottom,Q.bottom)-Math.max(U.top,Q.top)):0,g=U=>{let Q=0;U.left<i.l&&(Q+=(i.l-U.left)*8),U.right>i.r&&(Q+=(U.right-i.r)*8),U.top<i.t&&(Q+=(i.t-U.top)*8),U.bottom>i.b&&(Q+=(U.bottom-i.b)*8),Q+=d(U,a)*4,Q+=d(U,r)*4;for(const qt of l)Q+=d(U,qt)*4;return Q},f=t.getBoundingClientRect(),p=!a||f.left+f.width/2<=a.left+a.width/2,u=U=>({left:U?"0px":"auto",right:U?"auto":"0px",top:"46%",bottom:"auto",transform:U?"translate(-108%, -50%)":"translate(108%, -50%)"}),b=[u(p),u(!p),{left:"50%",right:"auto",top:"0px",bottom:"auto",transform:"translate(-50%, -115%)"}];let M=b[0],m=1/0;for(const U of b){Object.assign(e.style,U);const Q=g(e.getBoundingClientRect());Q<m&&(m=Q,M=U)}Object.assign(e.style,M);let h=e.getBoundingClientRect(),v=0,_=0;h.left<i.l&&(v+=i.l-h.left),h.right>i.r&&(v-=h.right-i.r),h.top<i.t&&(_+=i.t-h.top),h.bottom>i.b&&(_-=h.bottom-i.b);const P=U=>{if(!U)return;const Q=()=>new DOMRect(h.left+v,h.top+_,h.width,h.height);if(!c(Q(),U))return;const qt=Math.min(Q().bottom,U.bottom)-Math.max(Q().top,U.top),Qn=U.bottom+4-Q().top,ze=U.top-4-Q().bottom,Te=An=>Q().top+An>=i.t&&Q().bottom+An<=i.b;if(qt<h.height*.5&&Te(Qn)){_+=Qn;return}if(qt<h.height*.5&&Te(ze)){_+=ze;return}const ue=U.left-i.l,st=i.r-U.right,rn=U===r?a:r,Do=(An,kf)=>{if(!rn)return!1;const bf=kf?An-h.width:An,vf=new DOMRect(bf,Q().top,h.width,h.height);return c(vf,rn)};st>=h.width+4&&!Do(U.right+4,!1)?v+=U.right+4-Q().left:ue>=h.width+4&&!Do(U.left-4,!0)?v+=U.left-4-Q().right:Te(Qn)?_+=Qn:Te(ze)&&(_+=ze)};P(a),P(r);const R=t.querySelector(".inner")?.getBoundingClientRect(),T=R&&R.width>2?R:f,N=ce.querySelector(".pet-cat")?.getBoundingClientRect(),X=ce.querySelector('.item[data-kind="sandbox"]')?.getBoundingClientRect(),J=ce.querySelector('.item[data-kind="yard-bench"]')?.getBoundingClientRect(),Z=[...ce.querySelectorAll('.item[data-kind="yard-swing"], .item[data-kind="picnic-blanket"], .item[data-kind="lemonade-cart"], .item[data-kind="tulip-bed"]')].map(U=>U.getBoundingClientRect()),se=I.querySelector(".yardDoor"),on=se?[se,se.querySelector(".yardHintLabel"),se.querySelector(".doorArt")].map(U=>U?.getBoundingClientRect()):[],St=document.getElementById("secrets"),ft=St&&St.offsetParent?St.getBoundingClientRect():void 0,nt=ft&&ft.width>2&&ft.left<i.r&&ft.right>i.l&&ft.top<i.b&&ft.bottom>i.t?ft:void 0,Qo=nt?new DOMRect(nt.left-8,nt.top-8,nt.width+16,nt.height+16):void 0,Sl=[a,r,N,X,J,Qo,...Z,...on].filter(U=>!!U&&U.width>2&&U.height>2),an=new DOMRect(h.left+v,h.top+_,h.width,h.height),Bl=T.left+T.width/2,Hl=T.top+T.height/2,Ao=U=>Math.hypot(U.left+U.width/2-Bl,U.top+U.height/2-Hl),Pl=U=>{const Q=Math.min(U.right,T.right)-Math.max(U.left,T.left),qt=Math.min(U.bottom,T.bottom)-Math.max(U.top,T.top);return Q>1&&qt>1},va=U=>U.left>=i.l-.5&&U.right<=i.r+.5&&U.top>=i.t-.5&&U.bottom<=i.b+.5&&Sl.every(Q=>!c(U,Q))&&!Pl(U);let zo=an;if(!va(an)||Ao(an)>150){const U=[],Q=(ze,Te)=>{let ue=ze,st=Te;ue<i.l&&(ue=i.l),st<i.t&&(st=i.t),ue+h.width>i.r&&(ue=Math.max(i.l,i.r-h.width)),st+h.height>i.b&&(st=Math.max(i.t,i.b-h.height)),U.push(new DOMRect(ue,st,h.width,h.height))};Q(T.left+(T.width-h.width)/2,T.top-h.height-8),Q(T.right-h.width,T.top-h.height-6),Q(T.left,T.top-h.height-6),a&&Q(a.right+6,T.top-h.height-8),J&&Q(J.left-h.width-6,J.top-h.height-6),a&&J&&Q(a.right+6,J.top-h.height-6),a&&(Q(a.left-12,a.top-h.height-8),Q(i.l,a.top-h.height-10),Q(a.left+(a.width-h.width)/2,a.top-h.height-8)),Q(i.r-h.width,T.top-h.height-6),Q(T.right+8,T.top+(T.height-h.height)/2),Q(T.left-h.width-8,T.top+(T.height-h.height)/2),Q(an.left,an.top);for(const ze of[h.width*.65,h.width*1.05,88,120,155])for(let Te=0;Te<8;Te++){const ue=Te*Math.PI/4;Q(Bl+Math.cos(ue)*ze-h.width/2,Hl+Math.sin(ue)*ze-h.height/2)}const qt=ze=>{let Te=1/0,ue=null;for(const st of U){if(!va(st)||Ao(st)>ze)continue;const rn=Ao(st);rn<Te&&(Te=rn,ue=st)}return ue},Qn=qt(170)??qt(360);if(Qn)zo=Qn;else if(!va(an)){let ze=null,Te=1/0;for(const ue of U){if(ue.left<i.l-.5||ue.right>i.r+.5||ue.top<i.t-.5||ue.bottom>i.b+.5)continue;const rn=(Pl(ue)?1e4:0)+Sl.reduce((Do,An)=>Do+d(ue,An),0)+Ao(ue);rn<Te&&(Te=rn,ze=ue)}ze&&(zo=ze)}}v+=zo.left-an.left,_+=zo.top-an.top,(v||_)&&(e.style.transform=`${e.style.transform} translate(${(v/n).toFixed(1)}px, ${(_/n).toFixed(1)}px)`)}function b5(e,t){e.querySelector(".bubble")?.remove();const n=document.createElement("div");n.className="bubble petBubble",n.textContent=t,e.appendChild(n),Qs(),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700)}const no=new Map;function v5(){const e=new Set,t=Fg();if(t){e.add(t.key);const n=Pp(t.dog.name,Date.now()),s=t.item.y-(n==="peek"?24:2);let o=no.get(t.key);if(!o||!o.el.isConnected){o?.el.remove();const a=document.createElement("div");a.className="pet pet-dog kenneled",a.dataset.dog="kennel:"+t.key,ce.appendChild(a),a.addEventListener("pointerdown",r=>{r.target.closest(".kennelBtn")||(r.stopPropagation(),r.preventDefault())}),a.addEventListener("click",r=>{r.target.closest(".kennelBtn")||(r.stopPropagation(),b5(a,`${a.dataset.name??"Puppy"} is resting`))}),o={el:a,pose:"",look:"",x:t.item.x,y:s},no.set(t.key,o)}const i=n==="rest"?"sleep":"sit";if(o.pose!==i||o.look!==n+t.dog.breed){const a=[...o.el.querySelectorAll(".bubble, .kennelBtn")];o.el.innerHTML=`<div class="inner">${ko(t.dog.breed,i)}</div>${n==="rest"?'<div class="zzz"><b>Zzz</b><i>z</i><i>z</i><i>z</i></div>':""}`;for(const r of a)o.el.appendChild(r);o.pose=i,o.look=n+t.dog.breed}o.el.dataset.name=t.dog.name,o.el.classList.toggle("rest",n==="rest"),o.el.classList.toggle("peek",n==="peek"),o.x=t.item.x,o.y=s,Es(o.el,t.item.x,s,100,77),o.el.style.zIndex=String(1e3+t.item.z+1),Gg(o.el,t.key,!0)}for(const[n,s]of no)e.has(n)||(s.el.remove(),no.delete(n))}let V=null,ei="",za=0,vl=0,hi={x:0,perch:0,leap:!1};const w5=562;function Yg(e){return(e.rooms[e.currentRoom]?.items.filter(n=>n.kind==="cat-tower")??[]).reduce((n,s)=>!n||s.z>=n.z?s:n,null)}function Vc(e){return e==="cat-bed"||e==="pet-bed"||e==="dog-bed"||e==="pack:cat-bed"||/(?:^|:)cat-bed$|(?:^|:)pet-bed$/.test(e)}function $5(e){const t=e.rooms[e.currentRoom]?.items??[],n=t.filter(a=>Vc(a.kind)),s=t.filter(a=>a.kind==="bed"),o=(n.length?n:s).reduce((a,r)=>!a||r.z>=a.z?r:a,null);if(!o)return null;const i=We[o.kind];return{x:o.x,y:o.y,h:i?ct(i)*o.scale:80,pet:Vc(o.kind)}}function x5(){const e=S.get();!e.cat||e.cat.room!==e.currentRoom||!Yg(e)||(vl=performance.now()+900,B.boing(),k?.fx({k:"leap"}))}function _5(){const e=S.get(),t=C==="house"?e.cat:null;if(!t||t.room!==e.currentRoom){V&&(V.remove(),V=null,ei="",za=0);return}(!V||!V.isConnected)&&(V=document.createElement("div"),V.className="pet pet-cat",ce.appendChild(V),ei="",V.addEventListener("pointerdown",R=>{R.stopPropagation(),R.preventDefault()}),V.addEventListener("click",R=>{R.stopPropagation(),Xg(),k&&k.fx({k:"purr"})}));const n=Yg(e),s=n?null:$5(e),o=n?We[n.kind]:void 0,i=n&&o?ct(o)*n.scale:0,a=Wp(t,Date.now(),n?{x:n.x}:null,s?{x:s.x}:null,ia()),r=!!n&&performance.now()<vl,l=r?2:a.perch,c=r&&n?n.x:a.x,d=r?"play":a.mood,g=d==="walk"?"stand":d==="nap"?"nap":"sit",f=g+t.coat+(l?"p":"");if(f!==ei){const R=[...V.querySelectorAll(".bubble, .heart")];V.innerHTML=`<div class="inner">${Cs(t.coat,g)}</div>${g==="nap"?'<div class="zzz"><i>z</i><i>z</i><i>z</i></div>':""}`;for(const T of R)V.appendChild(T);ei=f}if(l>0&&za===0){V.classList.add("hop");const R=V;setTimeout(()=>R.classList.remove("hop"),420)}za=l,V.dataset.name=t.name,V.dataset.mood=d,V.dataset.perch=String(l),V.dataset.leap=r?"1":"0",V.dataset.curl=a.curl?"1":"0",V.classList.toggle("walking",d==="walk"),V.classList.toggle("groom",d==="groom"),V.classList.toggle("play",d==="play"&&!r),V.classList.toggle("leap",r),V.classList.toggle("flipped",a.flip),V.classList.toggle("curl",a.curl===1),ce.querySelectorAll(".item.toy-live").forEach(R=>R.classList.remove("toy-live")),n&&d==="play"&&l&&!r&&ce.querySelector(`.item[data-id="${n.id}"]`)?.classList.add("toy-live");const p=window.__pinCat,u=!!(p&&Number.isFinite(p.x)),b=u&&Number.isFinite(p.y)?p.y:w5,M=!u&&l&&n?Hp(n.y,i,l):!u&&a.curl&&s?s.y-s.h*(s.pet?.38:.2):b,m=e.currentRoom==="backyard"&&!l,h=!u&&l?92:m?115:128,v=!u&&l?110:m?135:150,_=u?p.x:e.currentRoom==="backyard"?wn.x:Kg(c,v/2),P=!u&&e.currentRoom==="backyard"&&!l?wn.y:M;Es(V,_,P,v,h),V.style.zIndex=String(4e3+Math.round(P)),hi={x:_,perch:l,leap:r}}function Kg(e,t){const n=S.get().currentRoom,s=n==="backyard"?Cd:n==="living"?Ld:null;if(!s)return e;const o=s.x-s.w/2-t-16,i=s.x+s.w/2+t+16;return e<=o||e>=i?e:e<s.x?o:i}function Xg(){if(!V)return;B.purr(),setTimeout(()=>B.meow(),250),V.querySelector(".bubble")?.remove();const e=document.createElement("div");e.className="bubble petBubble",e.textContent=`${V.dataset.name} purrs ♥`,V.appendChild(e),Qs(),setTimeout(()=>e.classList.add("out"),1500),setTimeout(()=>e.remove(),1900),V.classList.remove("happy"),V.offsetWidth,V.classList.add("happy");for(let t=0;t<5;t++){const n=document.createElement("div");n.className="heart",n.textContent="♥",n.style.left=20+Math.random()*60+"%",n.style.animationDelay=t*.12+"s",n.style.color=["#ff6b9a","#ff8fab","#e879c6"][t%3],V.appendChild(n),setTimeout(()=>n.remove(),1800)}}function M5(e,t){if(t.k==="zoo"||t.k==="apple"||t.k==="honk"||t.k==="hen"){D5(t);return}t.k==="trick"?jg(t.owner,t.v):t.k==="purr"?C==="house"&&Xg():t.k==="leap"?C==="house"&&(vl=performance.now()+900):t.k==="ball"?Ng(e,t.x,t.y):t.k==="splash"&&Ig(t.x)}function Jg(e){const t=Math.min(.05,Math.max(0,(e-jc)/1e3));jc=e;try{d5(e,t),v5(),_5(),q5(e,t),i3(t),Ad()}catch{}requestAnimationFrame(Jg)}function L5(){return k?k.view(k.myHouseId())?.cat??null:ne.get().cat??null}function wl(){return k?k.players.get(k.pid)?.dog??null:ne.get().dog??null}function so(e){if(k){const t=k.myHouseId();t&&k.dispatch(t,e)}else ne.dispatch(e)}const Ei=()=>C==="house"&&(!k||Je===ne||$e===k.myHouseId());function C5(e="cat"){const t=L5(),n=wl(),s=ne.get().characters,o={tab:e,coat:t?.coat??0,catName:t?.name??"",breed:n?.breed??0,dogName:n?.name??"",owner:n?.owner??s[0]?.id,err:"",bye:!1},i=kt("",(l,c)=>{const d=p=>l.closest(`[${p}]`)?.getAttribute(p);if(d("data-pt")){o.tab=d("data-pt"),o.err="",o.bye=!1,r();return}if(d("data-coat")!=null){o.coat=+d("data-coat"),B.click(),r();return}if(d("data-breed")!=null){o.breed=+d("data-breed"),B.click(),r();return}if(d("data-cname")){o.catName=d("data-cname"),B.click(),r();return}if(d("data-dname")){o.dogName=d("data-dname"),B.click(),r();return}if(d("data-owner")){o.owner=d("data-owner"),B.click(),r();return}const g=d("data-pa");if(!g)return;const f=(i.root.querySelector("#petName")?.value??"").trim();if(g==="adoptCat"||g==="adoptDog"){const p=f||(g==="adoptCat"?o.catName:o.dogName),u=wp(p);if(!u){o.err=p?"Hmm, try a different name!":"Pick a name first!",B.pop(),r();return}if(g==="adoptCat"){const b=Ei(),M={name:u,coat:o.coat,room:b?S.get().currentRoom:t?.room??"living",x:b?Math.max(200,Math.min(me-200,Y+de/2)):t?.x??1200};so({type:"cat/set",cat:M}),B.meow(),c(),z(t?`${u} looks great! 🐱`:b?`${u} moved in! 🐱`:`${u} is waiting at your house! 🐱`)}else{const b=k?{name:u,breed:o.breed}:{name:u,breed:o.breed,owner:o.owner};k?(k.setDog(b),C==="park"&&rs()):ne.dispatch({type:"dog/set",dog:b}),B.woof(),c(),z(n?`${u} looks great! 🐶`:`${u} is your new best friend! 🐶`)}return}if(g==="callCat"){so({type:"cat/move",room:S.get().currentRoom,x:Math.max(200,Math.min(me-200,Y+de/2))}),B.meow(),c();return}if(g==="kennelDog"){bl(),c();return}if(g==="bye"){if(!o.bye){o.bye=!0,r();return}o.tab==="cat"?so({type:"cat/set",cat:null}):(so({type:"dog/kennel",item:null}),k?k.setDog(null):ne.dispatch({type:"dog/set",dog:null})),c(),z("They went to live with a kind friend 💛");return}},"wide pets"),a=i.root.querySelector(".card");function r(){const l=o.tab==="cat",c=l?t:n,d=l?bp:vp,g=l?o.catName:o.dogName,f=i.root.querySelector("#petName")?.value??"";a.innerHTML=`${bt}<h2>Pets</h2>
      <div class="petTabs"><button data-pt="cat" class="${l?"on":""}">🐱 Cat</button><button data-pt="dog" class="${l?"":"on"}">🐶 Dog</button></div>
      <p class="hint small">${l?k?"Your cat lives in your house. Friends can see her when they visit!":"Your cat lives in your house. She naps, purrs, and plays!":k?"Your dog follows you everywhere: the street, friends' houses, and the park!":"Your dog follows you around the house and to the park!"}</p>
      <div class="petRow"><div class="petPreview">${l?Cs(o.coat,"sit"):ko(o.breed,"stand")}</div>
        <div class="swatches">${(l?Ka:Xa).map((p,u)=>`<button ${l?"data-coat":"data-breed"}="${u}" class="${u===(l?o.coat:o.breed)?"on":""}"><div>${l?Cs(u,"sit"):ko(u,"stand")}</div><span>${p.name}</span></button>`).join("")}</div></div>
      <div class="label">Name</div>
      <div class="nameChips">${d.map(p=>`<button ${l?"data-cname":"data-dname"}="${p}" class="${p===g?"on":""}">${p}</button>`).join("")}</div>
      <input id="petName" class="petName" maxlength="14" autocomplete="off" placeholder="…or type a name" value="${K(f)}"/>
      ${o.err?`<p class="err" id="petErr">${K(o.err)}</p>`:""}
      ${!l&&!k&&s.length>1?`<div class="label">Who does your dog follow?</div><div class="walkers">${s.map(p=>`<button data-owner="${p.id}" class="${p.id===o.owner?"on":""}">${Fe(p)}</button>`).join("")}</div>`:""}
      <div class="petBtns"><button class="go" data-pa="${l?"adoptCat":"adoptDog"}" id="adoptBtn">${c?"Save":"Adopt! 💛"}</button>
        ${l&&t&&Ei()?'<button data-pa="callCat" id="callCat">Here, kitty!</button>':""}
        ${!l&&n?`<button data-pa="kennelDog" id="kennelDog">${pa(kl())?"Come, puppy!":"Kennel"}</button>`:""}
        ${c?`<button class="danger" data-pa="bye">${o.bye?"Tap again to say goodbye":"Find a new home"}</button>`:""}</div>`}r()}$("btnPets").addEventListener("click",()=>C5(C==="house"?"cat":"dog"));requestAnimationFrame(Jg);window.__pets=()=>{const e=Fg(),t=e?no.get(e.key):void 0;return{dogs:[...bn.keys()],dogPos:Object.fromEntries([...bn].map(([n,s])=>[n,{x:Math.round(s.x),y:Math.round(s.y)}])),cat:V?{mood:V.dataset.mood,name:V.dataset.name,perch:hi.perch,x:Math.round(hi.x),leap:hi.leap,curl:V.dataset.curl==="1"}:null,kennel:e&&t?{x:Math.round(t.x),y:Math.round(t.y),pose:t.pose,name:e.dog.name,item:e.item.id}:null,dogKennel:S.get().dogKennel??null,fetch:ke?.phase??null,ball:kn,view:C}};function Ct(){return $("ranch").clientHeight/Ho}let Ke=[];const $o=e=>String(100+Math.round(e)),ef=220,S5=ef*130/160,tf=156,B5=tf*130/160,H5=.6,P5=3.5,W5=3,_r=10,Mn=new Map,pi=new Map;function Qi(e,t,n=_r){const s=(e-Ie.x)/(Ie.rx+n),o=(t-Ie.y)/(Ie.ry+n);return s*s+o*o<1}function Da(e,t,n,s){for(let o=0;o<=18;o++){const i=o/18;if(Qi(e+(n-e)*i,t+(s-t)*i))return!0}return!1}function Ai(e,t){return{x:Math.max(70,Math.min(xl()-70,e)),y:Math.max(es,Math.min(nn,t))}}function T5(e,t){const n=Ai(t.x,t.y);if(Qi(n.x,n.y,6))return null;if(!Da(e.x,e.y,n.x,n.y))return[n];const s=Ie.x-Ie.rx-_r-28,o=Ie.x+Ie.rx+_r+28;let i=null,a=1/0;for(const r of[es+1,nn-2]){const l=[];let c=e.x,d=e.y;const g=(M,m)=>{const h=Ai(M,m);l.push(h),c=h.x,d=h.y};Da(c,d,c,r)&&g(c<Ie.x?s:o,d),Math.abs(d-r)>3&&g(c,r),Math.abs(c-n.x)>3&&g(n.x,r),l.push(n);let f=!0,p=e.x,u=e.y,b=0;for(const M of l){if(Da(p,u,M.x,M.y)||Qi(M.x,M.y,4)){f=!1;break}b+=Math.hypot(M.x-p,M.y-u),p=M.x,u=M.y}f&&b<a&&(i=l,a=b)}return i}function nf(e,t){const n=Dt();if(!n)return;const s={x:Math.max(60,Math.min(xl()-60,e)),y:Math.max(es,Math.min(nn,t))};if(n.ride!==void 0&&n.where==="ranch"){const o=T5(n,s);if(!o){z("The horse won't splash through the pond!"),B.pop();return}Ke=o}else Ke=[s]}function R5(e){if(e.look2)return $w(e.look2);const t=e.pants,n="#5a3d5c",s=(o,i,a,r)=>`<path class="${o}" d="${i}" fill="none" stroke="${n}" stroke-width="${a}" stroke-linecap="round"/><path class="${o} cloth" d="${i}" fill="none" stroke="${t}" stroke-width="${r}" stroke-linecap="round"/>`;return`<svg class="rideleg" viewBox="0 0 160 130">${s("thigh","M66 56 L102 66",13,8)}${s("shin","M102 68 L106 104",12,7.2)}<circle class="knee" cx="102" cy="67" r="6.2" fill="${t}" stroke="${n}" stroke-width="3.5"/><ellipse class="shoe" cx="116" cy="106" rx="11" ry="5.2" fill="${n}"/></svg>`}function Ln(){return document.body.classList.contains("phone")&&document.body.classList.contains("phone-portrait")&&!ye}function ua(){if(!Ln())return Jc.map((t,n)=>n);const e=[0,2,4];for(const t of _n("ranch")){const n=t.p.ride;n!==void 0&&e.indexOf(n)<0&&e.push(n)}return e}function Wn(e){if(!Ln())return Jc[e];const t=ua(),n=t.indexOf(e),s=t.length,o=n<0?0:n,i=$l().w/2,a=2400+i+18,r=3080-i-18;return s<=1?Math.round((a+r)/2):Math.round(a+(r-a)*o/(s-1))}function $l(){return Ln()?{w:131,h:106}:{w:150,h:122}}function zi(e,t,n){const s=Ct(),{w:o,h:i}=$l();e.style.left=(t-o/2)*s+"px",e.style.top=(n-i)*s+"px",e.style.width=o*s+"px",e.style.height=i*s+"px",e.style.zIndex=$o(n)}function U5(){if(C!=="ranch"||ye||!document.body.classList.contains("phone"))return;const e=new Set(ua());document.querySelectorAll("#ranchWorld .horse").forEach(t=>{const n=+t.dataset.horse;t.classList.toggle("stallOff",Ln()&&!e.has(n)),!(!e.has(n)||Mn.has(n)||t.classList.contains("away"))&&zi(t,Wn(n),ts)})}function E5(e,t,n){if(Mn.has(e)||Math.hypot(t-Wn(e),n-ts)<26)return;Mn.set(e,{x:t,y:n});const s=document.querySelector(`#ranchWorld .horse[data-horse="${e}"]`);s&&(s.classList.add("trotting"),s.classList.remove("away"),s.classList.toggle("flipped",Wn(e)<t),zi(s,t,n))}function Q5(e,t,n){const s=n?-1:1;for(const o of[s*118,-s*118,s*160,-s*78])for(const i of[0,30,-26,48]){const a=Ai(e+o,t+i);if(!(Math.hypot(a.x-e,a.y-t)<50)&&!Qi(a.x,a.y,8))return a}return Ai(e,t)}let Gc=0,sf=0;const ma=()=>k?k.now():Date.now(),ya=()=>Ur(k?k.ranch.plots:ne.get().garden),Eo=()=>Rr(k?k.players.get(k.pid)?.basket:ne.get().basket),xl=()=>ye?Wr:Mo,of=()=>ye?"barn":"ranch",af=()=>{const e=new Map;for(const t of _n("ranch"))t.p.ride!==void 0&&e.set(t.p.ride,t);return e};function Mr(e){const t={taken:"A friend just planted there!",wet:"Already watered 💧",notReady:"Still growing! 🌱",full:"Your basket is full!",slow:"The hen is laying… try again!",none:"Your basket has none left",nohouse:"Go home to put it in your room"};t[e]&&(z(t[e]),B.pop())}function Ms(e){if(k){const o=Oa(ya(),Eo(),e,ma(),e.op==="egg"?Gc:0);return typeof o=="string"?(Mr(o),!1):(e.op==="egg"&&(Gc=Date.now()),k.ranchOp(e),!0)}const t=ne.get(),n=Date.now(),s=Oa(Ur(t.garden),Rr(t.basket),e,n,t.lastEgg??0);return typeof s=="string"?(Mr(s),!1):(ne.dispatch({type:"ranch/op",op:e,now:n}),ka(!0),Ll(),!0)}function xo(e=!1){const t=C==="ranch"&&ye&&!e;ds(),$("ranch").classList.remove("hidden"),ke=null,Ke=[],C="ranch",ye=e;const n=e?{where:"barn",x:170,y:560,flip:!1}:{where:"ranch",x:t?Za:130,y:t?520:565,flip:!1};k?Qe(n):gt=n,$("streetTitle").textContent=e?"The Barn":"Rainbow Ranch",zt(),_l(),requestAnimationFrame(()=>{const s=$("ranchScroll"),o=Ct();s.scrollLeft=t?Math.max(0,Za*o-s.clientWidth/2):0,Cr()}),setTimeout(Cr,650),Uo($("ranch")),e?B.swish():B.sparkle()}$("btnHopOff").addEventListener("click",()=>rf());function _l(){const e=Ct(),t=$("ranchWorld"),n=o=>o*e+"px",s=(o,i,a,r)=>`left:${n(o-a/2)};top:${n(i-r)};width:${n(a)};height:${n(r)};z-index:${$o(i)}`;if(t.style.width=xl()*e+"px",t.style.height=Ho*e+"px",t.style.setProperty("--sc",String(e)),ye){t.innerHTML=s$()+`<button class="rprop barnExit" data-r="exit" aria-label="Go outside" style="${s(127,444,206,244)}"><span class="exitHint"><span>Outside ☀️</span></span></button>`+Fn.map((o,i)=>`<button class="animal" data-animal="${i}" aria-label="${Zd[i].name}" style="${s(Tr[i],Jf+30,128,107)}">${gr(i)}</button>`).join("")+[300,1244].map(o=>["carrot","apple","hay"].map((i,a)=>`<button class="bucket" data-feed="${i}" aria-label="${i} bucket" style="${s(o+a*56,592,54,62)}">${Yw(i)}</button>`).join("")).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',Cn(),He();return}t.innerHTML=Iw()+Ow().replace("<svg ",`<svg style="z-index:${$o(Nw)}" `)+`<button class="rprop barnDoor" data-r="barn" aria-label="Go into the barn" style="${s(Za,472,150,150)}"><span class="doorHint"><span>Petting zoo inside! 🐐</span></span></button><button class="rprop windmill" data-r="mill" aria-label="Windmill" style="${s(1540,478,150,240)}">${e$}</button><button class="rprop henHouse" data-r="egg" aria-label="Hen house" style="${s(715,482,180,170)}">${jw}</button><button class="rprop tractor" data-r="honk" aria-label="Tractor" style="${s(900,580,170,130)}">${Fw}</button><button class="rprop appleTree" data-r="apple" aria-label="Apple tree" style="${s(2085,482,240,300)}">${Vw}</button>`+eh.map((o,i)=>{const a=$l();return`<button class="horse${Ln()&&ua().indexOf(i)<0?" stallOff":""}" data-horse="${i}" aria-label="${Li[i].name} horse" style="${s(Wn(i),ts,a.w,a.h)}">${Kr(i)}</button>`}).join("")+Array.from({length:qa},(o,i)=>`<button class="plot" data-plot="${i}" aria-label="Garden plot" style="${s(nh(i),594,66,86)}"></button>`).join("")+'<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>',ka(!0),Cn(),He()}const ti=[];function ka(e=!1){if(C!=="ranch"||ye)return;const t=ya(),n=ma();document.querySelectorAll("#ranchWorld .plot").forEach(s=>{const o=+s.dataset.plot,i=t[o]??null,a=Ki(i,n),r=JSON.stringify(i)+a;!e&&ti[o]===r||(ti[o]!==void 0&&ti[o]!==r&&a>0&&(s.classList.remove("grow"),s.offsetWidth,s.classList.add("grow")),ti[o]=r,s.innerHTML=Od(i,a,o),s.dataset.stage=i?String(a):"empty")})}function Cn(){const e=document.getElementById("ravatars");if(!e||C!=="ranch")return;const t=Ct(),n=new Set,s=new Set;let o=!1;for(const i of _n(of())){n.add(i.key);let a=e.querySelector(`.savatar[data-pid="${i.key}"]`);a||(a=document.createElement("div"),a.className="savatar "+(i.mine?"mine":"other"),a.dataset.pid=i.key,e.appendChild(a),i.mine&&qg(a));const r=JSON.stringify(i.look)+i.name;if(a.dataset.look!==r){const p=a.querySelector(".bubble");a.innerHTML=i.name?fl(i.look,i.name):`<div class="inner">${Fe(i.look)}</div>`,p&&a.appendChild(p),a.dataset.look=r,a.dataset.ride=""}const l=i.p.ride,c=(Bo[i.look.size]??1)*t*.95*(l!==void 0?H5:1),d=Rn*c,g=Qt*c;if(a.dataset.ride!==String(l??"")&&(a.querySelector(".mount")?.remove(),l!==void 0&&a.insertAdjacentHTML("afterbegin",`<div class="mount" data-mount="${l}">${Kr(l,!0)}${R5(i.look)}</div>`),a.dataset.ride=String(l??"")),a.classList.toggle("riding",l!==void 0),l!==void 0){s.add(l),i.mine&&(o=!0),pi.set(l,{x:i.p.x,y:i.p.y});const p=Ln()?tf:ef,u=Ln()?B5:S5,b=p*t,M=u*t,m=a.querySelector(".mount");m.style.width=b+"px",m.style.height=M+"px",m.style.left=(d-b)/2+"px",m.style.top=g-M+"px";const h=Number(a.querySelector(".shirt")?.getAttribute("data-hem")??126),v=Number(m.querySelector(".saddle")?.getAttribute("data-top")??43),_=(h+P5/2)/160*g,P=g-M+(v-W5/2)/130*M;a.style.setProperty("--lift",_-P+"px");const R=m.querySelector(".rideleg");R&&(R.style.left="0",R.style.top="0",R.style.width="100%",R.style.height="100%")}else a.style.removeProperty("--lift");const f=parseFloat(a.dataset.lx??"NaN");Number.isFinite(f)&&Math.abs(f-i.p.x)>2&&(a.classList.add("moving"),clearTimeout(+(a.dataset.mt??0)),a.dataset.mt=String(window.setTimeout(()=>a.classList.remove("moving"),260))),a.dataset.lx=String(i.p.x),a.style.left=i.p.x*t-d/2+"px",a.style.top=i.p.y*t-g+"px",a.style.width=d+"px",a.style.height=g+"px",a.style.zIndex=$o(i.p.y),a.classList.toggle("flipped",i.p.flip),So(a,i.look,i.mine)}if(e.querySelectorAll(".savatar").forEach(i=>{n.has(i.dataset.pid)||i.remove()}),document.body.classList.contains("phone")){const i=new Set(ua());document.querySelectorAll("#ranchWorld .horse").forEach(a=>{a.classList.toggle("stallOff",Ln()&&!i.has(+a.dataset.horse))})}document.querySelectorAll("#ranchWorld .horse").forEach(i=>{const a=+i.dataset.horse;s.has(a)?(i.classList.add("away"),Mn.delete(a)):i.classList.remove("away")});for(const[i,a]of[...pi])s.has(i)||(E5(i,a.x,a.y),pi.delete(i));document.body.classList.toggle("riding",o),cs()}function A5(e){const t=Dt();if(!t||t.where!=="ranch")return;const n=af().get(e);if(n&&!n.mine){z("Someone is riding!"),B.pop();return}if(t.ride!==void 0){if(n?.mine||t.ride===e){rf();return}nf(Wn(e),Math.min(nn,ts+8));return}Ke=[],Mn.delete(e),_t({where:"ranch",x:Wn(e),y:Math.min(nn,ts+8),flip:!1,ride:e}),B.neigh(),z(`You're riding ${Li[e].name}! Tap the ground to gallop 🐴`)}function rf(){const e=Dt();if(!e||e.ride===void 0)return;const t=e.ride,{ride:n,...s}=e;Ke=[];const o=Q5(s.x,s.y,s.flip);pi.set(t,{x:s.x,y:s.y}),_t({...s,x:o.x,y:o.y}),B.drop()}function Ml(e,t){const n=e<Fn.length?document.querySelector(`#ranchWorld .animal[data-animal="${e}"]`):document.querySelector(`#ranchWorld .horse[data-horse="${e-Fn.length}"]:not(.away)`)??document.querySelector(`#ravatars .mount[data-mount="${e-Fn.length}"]`);if(!n||C!=="ranch")return;const s=e>=Fn.length,o=s?{say:"Neigh! ♥",snd:"neigh"}:Zd[e];n.classList.remove("hop","munch"),n.offsetWidth,n.classList.add(t?"munch":"hop"),setTimeout(()=>n.classList.remove("hop","munch"),1400),n.querySelector(".abubble")?.remove();const i=document.createElement("div");i.className="bubble petBubble abubble",i.textContent=t?`Yum! Munch munch ${t===1?"🥕":t===2?"🍎":"🌾"}`:o.say,n.appendChild(i),Qs(),setTimeout(()=>i.classList.add("out"),1400),setTimeout(()=>i.remove(),1800);for(let a=0;a<(t?6:4);a++){const r=document.createElement("div");r.className="heart",r.textContent="♥",r.style.left=15+Math.random()*70+"%",r.style.animationDelay=a*.12+"s",r.style.color=["#ff6b9a","#ff8fab","#e879c6","#b197fc"][a%4],n.appendChild(r),setTimeout(()=>r.remove(),1900)}B[o.snd]?.(),t&&setTimeout(()=>B.munch(),250)}function lf(){const e=document.querySelector("#ranchWorld .henHouse");e&&(e.classList.remove("lay"),e.offsetWidth,e.classList.add("lay"),B.cluck())}function z5(){const e=document.querySelector("#ranchWorld .henHouse"),t=$("basketChip");if(!e)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),o=document.createElement("div");o.className="flyEgg",o.innerHTML=bo,document.body.appendChild(o),Object.assign(o.style,{left:n.left+n.width/2-18+"px",top:n.top+n.height*.6+"px"}),requestAnimationFrame(()=>{o.style.left=s.left+s.width/2-18+"px",o.style.top=s.top+"px",o.style.transform="scale(.6) rotate(200deg)"}),setTimeout(()=>{o.remove(),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump")},650)}function cf(e){const t=document.getElementById("rfx");if(!t||C!=="ranch")return;const n=Ct(),[s,o]=mc[e]??mc[0],i=1965+s,a=182+o,r=i+(e%2?26:-22),l=575+e*4,c=document.createElement("button");c.className="fallenApple",c.dataset.feed="apple",c.setAttribute("aria-label","Apple"),c.innerHTML=qd;const d=32*n;Object.assign(c.style,{width:d+"px",height:d+"px",left:i*n-d/2+"px",top:a*n-d/2+"px",zIndex:$o(l)}),t.appendChild(c),requestAnimationFrame(()=>{c.style.left=r*n-d/2+"px",c.style.top=l*n-d+"px",c.classList.add("fallen")});const g=document.querySelector("#ranchWorld .appleTree");g?.classList.remove("shake"),g?.offsetWidth,g?.classList.add("shake"),B.boing(),setTimeout(()=>c.remove(),12e3)}function df(){const e=document.querySelector("#ranchWorld .tractor");e?.classList.remove("bounce"),e?.offsetWidth,e?.classList.add("bounce"),B.honk()}function D5(e){e.k==="zoo"?Ml(e.a,e.f):e.k==="apple"?cf(e.v):e.k==="honk"?df():e.k==="hen"&&lf()}function Yc(e,t){const n=document.elementFromPoint(e,t);if(!n)return null;const s=n.closest("[data-animal]");if(s)return+s.dataset.animal;const o=n.closest(".horse:not(.away)");if(o)return Fn.length+ +o.dataset.horse;const i=n.closest(".savatar.riding");return i?.dataset.ride?Fn.length+ +i.dataset.ride:null}function Lr(e,t,n){e.preventDefault(),e.stopPropagation();const s=document.createElement("div");s.className="feedGhost",s.innerHTML=Id[t],document.body.appendChild(s);const o=u=>{s.style.left=u.clientX-30+"px",s.style.top=u.clientY-50+"px"};o(e),B.pick();let i=0;const a=e.clientX,r=e.clientY;n instanceof HTMLElement&&(n.style.visibility="hidden");let l=e.clientX,c=0;const d=$("ranchScroll"),g=()=>{const u=d.getBoundingClientRect(),b=l<u.left+60?-12:l>u.right-60?12:0;b&&i>12&&C==="ranch"&&(d.scrollLeft+=b),c=requestAnimationFrame(g)};c=requestAnimationFrame(g);const f=u=>{if(u.pointerId!==e.pointerId)return;l=u.clientX,i=Math.max(i,Math.hypot(u.clientX-a,u.clientY-r)),o(u),document.querySelectorAll(".feedHover").forEach(M=>M.classList.remove("feedHover")),Yc(u.clientX,u.clientY)!==null&&document.elementFromPoint(u.clientX,u.clientY)?.closest(".animal, .horse, .savatar")?.classList.add("feedHover")},p=u=>{if(u.pointerId!==e.pointerId)return;cancelAnimationFrame(c),window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",p),s.remove(),sf=Date.now(),document.querySelectorAll(".feedHover").forEach(m=>m.classList.remove("feedHover"));const b=Yc(u.clientX,u.clientY);if(b===null){n instanceof HTMLElement&&(n.style.visibility=""),i<12?z("Drag the food onto an animal! 🥕"):B.drop();return}if(n==="basket"&&!Ms({op:"use",kind:"carrot"}))return;n instanceof HTMLElement&&n.remove();const M=th.indexOf(t);Ml(b,M),k?.fx({k:"zoo",a:b,f:M})};window.addEventListener("pointermove",f),window.addEventListener("pointerup",p)}$("ranchWorld").addEventListener("pointerdown",e=>{const t=e.target,n=t.closest(".bucket");if(n)return Lr(e,n.dataset.feed,"bucket");const s=t.closest(".fallenApple");if(s)return Lr(e,"apple",s);t.closest(".rprop, .animal, .horse, .plot, .pet")&&e.stopPropagation()});$("ranchWorld").addEventListener("click",e=>{const t=e.target;if(!Dt()||C!=="ranch"||Date.now()-sf<400)return;const s=t.closest("[data-animal]");if(s){const g=+s.dataset.animal;Ml(g,0),k?.fx({k:"zoo",a:g,f:0});return}const o=t.closest("[data-horse]");if(o){A5(+o.dataset.horse);return}const i=t.closest("[data-r]")?.dataset.r;if(i==="egg"){lf(),Ms({op:"egg"})&&(z5(),B.pickup());return}if(i==="honk"){df(),k?.fx({k:"honk"});return}if(i==="apple"){const g=Math.floor(Math.random()*4);cf(g),k?.fx({k:"apple",v:g});return}if(i==="barn"){xo(!0);return}if(i==="exit"){xo(!1);return}if(i==="mill"){const g=t.closest(".windmill");g?.classList.remove("whirl"),g?.offsetWidth,g?.classList.add("whirl"),B.swish();return}const a=t.closest("[data-plot]");if(a){Z5(+a.dataset.plot,a);return}if(t.closest(".bucket, .fallenApple, .savatar, .pet"))return;const r=$("ranchWorld").getBoundingClientRect(),l=Ct(),c=(e.clientX-r.left)/l,d=(e.clientY-r.top)/l;d<400||nf(c,d)});function Z5(e,t){const n=ya()[e]??null,s=Ki(n,ma());if(document.querySelector(".seedPick")?.remove(),!n){const o=document.createElement("div");o.className="seedPick",o.innerHTML=`<button data-seed="carrot">${aa}<span>Carrot</span></button><button data-seed="flower">${Xr()}<span>Flower</span></button>`,t.parentElement.appendChild(o),o.style.left=t.offsetLeft+t.offsetWidth/2+"px",o.style.top=t.offsetTop-8+"px",o.addEventListener("pointerdown",i=>i.stopPropagation()),o.addEventListener("click",i=>{i.stopPropagation();const a=i.target.closest("[data-seed]")?.dataset.seed;o.remove(),a&&Ms({op:"plant",i:e,seed:a})&&(B.plant(),z("Planted! Now tap it to water 💧"))}),setTimeout(()=>o.remove(),6e3);return}if(!n.wet){Ms({op:"water",i:e})&&(B.water(),t.classList.remove("watering"),t.offsetWidth,t.classList.add("watering"));return}if(s<3){z("Still growing! 🌱"),B.pop();return}Ms({op:"pick",i:e})&&(B.pickup(),z(n.seed==="carrot"?"A carrot for your basket! 🥕":"Pretty flowers for your basket! 🌸"))}let Kc=0;function q5(e,t){if(C!=="ranch")return;const n=Date.now();if(document.querySelectorAll("#ranchWorld .animal").forEach(s=>{const o=+s.dataset.animal,i=Ct(),a=n/5200+o*1.7,r=(ye?Tr:Xf)[o]+Math.sin(a)*32;s.style.left=(r-s.offsetWidth/i/2)*i+"px",s.classList.toggle("flipped",Math.cos(a)<0),s.classList.toggle("walking",Math.abs(Math.cos(a))>.35)}),e-Kc>1e3&&(Kc=e,ka()),Ke.length){const s=Dt();if(!s||s.where!==of())Ke=[];else{const o=Ke[0],i=s.ride!==void 0?720:300,a=o.x-s.x,r=o.y-s.y,l=Math.hypot(a,r);if(l<6)Ke.shift();else{const c=Math.min(l,i*t),d={...s,x:s.x+a/l*c,y:s.y+r/l*c,flip:Math.abs(a)>2?a<0:s.flip};_t(d);const g=Ct(),f=$("ranchScroll"),p=d.x*g-f.scrollLeft;p>-40&&p<f.clientWidth+40&&(p<f.clientWidth*.2||p>f.clientWidth*.8)&&(f.scrollLeft=d.x*g-f.clientWidth/2)}}}for(const[s,o]of Mn){const i=document.querySelector(`#ranchWorld .horse[data-horse="${s}"]`);if(!i||i.classList.contains("away")){Mn.delete(s);continue}const a=Wn(s)-o.x,r=ts-o.y,l=Math.hypot(a,r);if(l<8){Mn.delete(s),i.classList.remove("trotting","flipped"),zi(i,Wn(s),ts);continue}const c=Math.min(l,460*t);o.x+=a/l*c,o.y+=r/l*c,i.classList.add("trotting"),i.classList.toggle("flipped",a<0),zi(i,o.x,o.y)}}function Ll(){const e=document.getElementById("basketChip");if(!e)return;const t=C==="house"&&(!k||Je===ne||$e===k.myHouseId()),n=Eo(),o=n.egg+n.carrot+n.flower>0&&(C==="ranch"||t);e.classList.toggle("hidden",!o),e.classList.toggle("inHouse",C==="house"),o&&(e.innerHTML=`<span class="bIcon">${Kw}</span><span class="bcount" data-kind="egg">${bo}<b>${n.egg}</b></span><span class="bcount" data-kind="carrot">${aa}<b>${n.carrot}</b></span><span class="bcount" data-kind="flower">${Xr()}<b>${n.flower}</b></span>`)}$("basketChip").addEventListener("pointerdown",e=>{e.target.closest('.bcount[data-kind="carrot"]')&&C==="ranch"&&Eo().carrot>0&&Lr(e,"carrot","basket")});$("basketChip").addEventListener("click",()=>I5());function I5(){const e=C==="house"&&(!k||Je===ne||$e===k.myHouseId()),t={egg:["Eggs",bo],carrot:["Carrots",aa],flower:["Flowers",Xr()]},n=kt("",(o,i)=>{const a=o.closest("[data-take]")?.dataset.take;if(!a)return;if(!e){z("Take it home to put it in your room! 🏠");return}const r="r"+Math.random().toString(36).slice(2,10),l=Math.max(120,Math.min(me-120,Y+de/2+(Math.random()-.5)*300));Ms({op:"take",kind:a,id:r,room:S.get().currentRoom,x:l})&&(B.drop(),i(),z("It's in your room! Drag it to a hand to carry it ✋"))},"basketSheet"),s=Eo();n.root.querySelector(".card").innerHTML=`${bt}<h2>My Basket</h2><p class="hint small">${e?"Tap one to put it in your room.":"Collect eggs, carrots and flowers at Rainbow Ranch, then take them home!"}</p>
    <div class="basketRows">${ed.map(o=>`<button class="bRow" data-take="${o}" ${s[o]?"":"disabled"}>${t[o][1]}<b>${s[o]}</b><span>${t[o][0]}</span></button>`).join("")}</div>`}window.__ranch=()=>({view:C,inBarn:ye,plots:ya().map(e=>e?{seed:e.seed,stage:Ki(e,ma()),wet:!!e.wet}:null),basket:Eo(),me:Dt(),ridden:[...af().keys()]});function O5(){if(Js.kind==="none")return;M$(),kt(L$(Js.kind,Js.entries),(t,n)=>{t.closest("#wnGo")&&(B.sparkle(),n())},"whatsNew "+Js.kind).root.querySelector(".card").insertAdjacentHTML("afterbegin",bt)}setTimeout(O5,500);window.__whatsnew=Js;window.__hood=()=>k;window.__hood_url=()=>ea();window.__ui=()=>({view:C,currentHouseId:$e,mode:k?"hood":"solo",play:tt.mode()});t3({hood:()=>k,view:()=>C,solo:()=>gt,myPres:be,setPres:_t,toast:z,refreshNear:cs,sfx:B,goMap:_s,soloLook:()=>{const e=ne.get();return{look:Lo(e.characters[0]??{}),dog:e.dog??null}}});function gf(e){const t=new Set;for(const n of Object.values(e.rooms))for(const s of n.items)t.add(s.kind);for(const n of e.characters)n.held.left&&t.add(n.held.left.kind),n.held.right&&t.add(n.held.right.kind);return[...t]}let ni=null;function ff(e){return ni||(ni=Sr(()=>import("./load-DBmmcDaX.js"),[]).then(t=>t.boot(location.search,gf(S.get()))).then(t=>{for(let n=0;n<t.length;n++)if(We[t[n]]){is(),et();return}}),ni)}function N5(e){const t=new Set(e),n=S.get();let s=!1;for(const o of n.rooms[n.currentRoom].items){const i=We[o.kind];if(!t.has(o.kind)||!i)continue;const a=ce.querySelector(`.item[data-id="${o.id}"] .inner`);!a||a.querySelector("img.artimg")||(a.innerHTML=Jt(i,!0),s=!0)}s&&(xt.forEach(o=>{delete o.dataset.held}),sn(n),et())}function j5(){return Sr(()=>import("./load-DBmmcDaX.js"),[]).then(e=>e.boot(location.search,gf(S.get()))).then(e=>{N5(e.filter(t=>!!We[t]))})}Pv();Tw();Aw(e=>e==="backyard"?vv():null);$("scenery").addEventListener("click",e=>{const t=e.target.closest("[data-yard-go]");t&&rl(t.dataset.yardGo==="backyard"?"backyard":"living")});const F5=Q$($("skyMount"));window.__sky=F5;is();et();Un();V5();Un();ba();bg();ri();Us.matches?Bn():Un();requestAnimationFrame(()=>{Un(),ba(),il()});function V5(){if(!nl)return;const e=tr(),t=S.get().characters[0];if(!t)return;const n=e==="door";if(S.dispatch({type:"char/update",id:t.id,patch:{...Ab(),flip:n?or.flip:sr.flip}}),S.dispatch({type:"cat/set",cat:{name:"Clover",coat:3,room:n?"living":"backyard",x:n?_i:wn.x}}),S.dispatch({type:"dog/set",dog:{name:"Sunny",breed:3,owner:t.id}}),!S.get().rooms.backyard.items.some(s=>s.kind==="yard-swing"))for(const s of zb)S.dispatch({type:"item/add",room:"backyard",item:{id:"yp-"+s.kind,kind:s.kind,x:s.x,y:s.y,flip:!1,z:1,scale:s.scale??1}});if(e!=="sheet"){const s=n?or:sr;S.dispatch({type:"char/move",id:t.id,room:n?"living":"backyard",x:s.x,y:s.y}),S.dispatch({type:"room/switch",room:n?"living":"backyard"})}window.__pinCat=n?{x:_i}:{x:wn.x,y:wn.y},e==="play"?$("modePlay").click():(e==="decorate"||e==="door")&&$("modeDecorate").click(),e==="sheet"&&document.body.insertAdjacentHTML("beforeend",_v()),e==="compare"&&document.body.insertAdjacentHTML("beforeend",Lv()),document.body.dataset.yard="ready"}function G5(e){const t=S.get(),n=e==="backyard"?sr:or;dt=null;const s=t.characters.find(o=>o.id===we&&o.room===t.currentRoom)??t.characters.find(o=>o.room===t.currentRoom);if(s&&(S.dispatch({type:"char/update",id:s.id,patch:{flip:n.flip}}),S.dispatch({type:"char/move",id:s.id,room:e,x:n.x,y:n.y})),nl&&t.cat&&(S.dispatch({type:"cat/move",room:e,x:e==="backyard"?wn.x:_i}),window.__pinCat=e==="backyard"?{x:wn.x,y:wn.y}:{x:_i}),S.dispatch({type:"room/switch",room:e}),k&&Je!==ne){const o=be();o&&o.where==="house"&&Qe({...o,room:e,x:n.x,y:n.y,flip:n.flip})}requestAnimationFrame(()=>ba())}function ba(){if(S.get().currentRoom==="backyard"){Ae(nr),Jn();return}if(!nl||tr()==="sheet"||tr()==="compare")return;const e=S.get().characters.find(t=>t.room===S.get().currentRoom);e&&Ae(e.x-de/2),Jn()}function Jn(){if(os||I.getBoundingClientRect().width<20)return;const t=je()||parseFloat(I.style.getPropertyValue("--yard-sc"))||1;I.style.setProperty("--yard-sc",String(t));const n=[...I.querySelectorAll(".yardDoor")];for(const u of n){u.style.minWidth="",u.style.transform="";const b=u.querySelector(".yardHintLabel");if(!b)continue;b.style.transform="",b.style.translate="";const M=b.querySelector("span");M&&(M.style.transform="");const m=Math.max(13,16/t);b.style.fontSize=m+"px",b.style.lineHeight="1";const h=38/t;b.style.height=h+"px";const v=3/t,_=Math.max(0,(h-v*2-m)/2);b.style.padding=`${_.toFixed(2)}px ${(14/t).toFixed(2)}px`}const s=n[0];if(!s)return;const o=s.querySelector(".doorArt"),i=s.querySelector(".yardHintLabel"),a=6,r=()=>{const u=I.getBoundingClientRect(),b=s.getBoundingClientRect(),M=o?.getBoundingClientRect(),m=i?.getBoundingClientRect(),h=[b,M,m].filter(T=>!!T&&T.width>2&&T.height>2),v=Math.min(...h.map(T=>T.top)),_=Math.max(...h.map(T=>T.bottom));let P=u.left+a,R=u.right-a;for(const T of["nudgeL","nudgeR"]){const N=$(T);if(!N||N.classList.contains("off")||N.offsetParent===null)continue;const X=N.getBoundingClientRect();if(X.width<2||X.height<2)continue;const J=se=>se.top<X.bottom-1&&se.bottom>X.top+1,Z=[b,M].some(se=>se&&se.width>2&&J(se));!Z&&(v>=X.bottom-1||_<=X.top+1)||(T==="nudgeL"&&Z?P=Math.max(P,X.right+8):T==="nudgeR"&&Z&&(R=Math.min(R,X.left-8)))}return{leftLimit:P,rightLimit:R,doorR:b,artR:M,hintR:m}};let l=0,c=0;for(;l++<4;){const{leftLimit:u,rightLimit:b,doorR:M,artR:m}=r();let h=0;const v=Math.min(M.left,m&&m.width>2?m.left:M.left),_=Math.max(M.right,m&&m.width>2?m.right:M.right);if(v<u&&(h+=u-v),_+h>b&&(h-=_+h-b),Math.abs(h)<.5)break;c+=h,s.style.transform=`translate(${(c/t).toFixed(1)}px, 0)`}if(!i)return;const d=i.querySelector("span");if(d){const u=document.createRange();u.selectNodeContents(d);const b=u.getBoundingClientRect(),M=i.getBoundingClientRect(),m=(M.top+M.bottom-(b.top+b.bottom))/2,h=d;b.height>2&&Math.abs(m)>=.1?h.style.transform=`translateY(${(m/t).toFixed(2)}px)`:h.style.transform=""}const g=i.getBoundingClientRect(),f=I.getBoundingClientRect();let p=0;if(S.get().currentRoom==="backyard"&&o){const u=o.getBoundingClientRect();u.width>2&&(p+=(u.left+u.right)/2-(g.left+g.right)/2)}g.left+p<f.left+a?p+=f.left+a-(g.left+p):g.right+p>f.right-a&&(p-=g.right+p-(f.right-a)),Math.abs(p)>.5?i.style.translate=`calc(-50% + ${(p/t).toFixed(1)}px) 0`:i.style.translate=""}ff(S.get().currentRoom);const hf=()=>{const e=na().size,t=xi.length,n=$("secrets"),s=n.querySelector(".secCount");s&&(s.textContent=`${e}/${t}`),n.setAttribute("aria-label",`Surprises, ${e} of ${t}`),ug()};function Di(){return window.innerHeight>window.innerWidth+40}function pf(e,t){for(const Z of e)Z.style.transform="";if(!Di()||!e.length)return;const n=t&&t.clientWidth>20?t.getBoundingClientRect():{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth};if(n.width<20)return;const s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,window.innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,window.innerHeight)-s,l=Math.max(40,i-o),c=Math.max(40,r-a),g=e.map(Z=>Z.getBoundingClientRect()).filter(Z=>Z.width>2&&Z.height>2);if(!g.length)return;const f=Math.min(...g.map(Z=>Z.left)),p=Math.max(...g.map(Z=>Z.right)),u=Math.min(...g.map(Z=>Z.top)),b=Math.max(...g.map(Z=>Z.bottom)),M=Math.max(1,p-f),m=Math.max(1,b-u),h=Math.min(1,l/M,c/m);if(h>.995&&f>=o-1&&p<=i+1&&u>=a-1&&b<=r+1)return;const _=e[0].getScreenCTM(),P=_&&Math.hypot(_.a,_.b)||1,R=(f+p)/2,T=(u+b)/2,N=m*h,X=(o+i)/2,J=u>=a&&b<=r?T:Math.min(Math.max(T,a+N/2),r-N/2);for(const Z of e){const se=Z.getBoundingClientRect(),on=(se.left+se.right)/2,St=(se.top+se.bottom)/2,ft=X+(on-R)*h,nt=J+(St-T)*h;Z.style.transformBox="fill-box",Z.style.transformOrigin="center",Z.style.transform=`translate(${((ft-on)/P).toFixed(2)}px, ${((nt-St)/P).toFixed(2)}px) scale(${h.toFixed(3)})`}}function uf(){if(C!=="gameroom")return;const e=document.getElementById("grScroll");pf([...document.querySelectorAll(".neonSignArt")],e)}function Cr(){C!=="ranch"||ye||(document.querySelectorAll(".ranchSignArt").forEach(e=>{e.style.transform=""}),He(),mf(),Cl())}function Cl(){if(C!=="ranch"||ye)return;const e=document.getElementById("ranchScroll");if(!e)return;const t=e.getBoundingClientRect();document.querySelectorAll(".ranchSignArt").forEach(n=>{const s=n.getBoundingClientRect(),o=Math.min(t.right,innerWidth),i=Math.max(0,t.left-s.left)+Math.max(0,s.right-o);n.style.visibility=s.width>20&&i<8?"visible":"hidden"})}$("ranchScroll").addEventListener("scroll",()=>{C==="ranch"&&!ye&&Cl()},{passive:!0});function mf(){const e=document.querySelector(".doorHint"),t=document.getElementById("ranchScroll");if(!e||!t)return;e.style.transform="translateX(-50%)";const n=t.getBoundingClientRect(),s=8,o=Math.max(n.left,0)+s,i=Math.min(n.right,innerWidth)-s,a=Math.max(n.top,0)+s,r=Math.min(n.bottom,innerHeight)-s,l=e.getBoundingClientRect();let c=0;l.right>i&&(c-=l.right-i),l.left+c<o&&(c+=o-(l.left+c));let d=0;const g=t.querySelector(".savatar");if(g){const f=g.getBoundingClientRect(),u=g.querySelector(".nametag")?.getBoundingClientRect(),b=!!(u&&u.width>4&&u.height>4),M=b?Math.min(f.top,u.top):f.top,m=b?Math.min(f.left,u.left):f.left,h=b?Math.max(f.right,u.right):f.right,v=l.left+c;l.right+c>m-6&&v<h+6&&l.bottom+d>M-6&&l.top<f.top+f.height*.72&&(d+=M-48-(l.bottom+d))}if(l.top+d<a&&(d+=a-(l.top+d)),document.body.classList.contains("phone-portrait")){const f=document.querySelector(".ranchSign .ranchSignArt");if(f){const p=f.getBoundingClientRect(),u=l.left+c,b=l.right+c,M=l.top+d,m=l.bottom+d;if(p.width>20&&p.height>p.width*.7&&b>p.left+4&&u<p.right-4&&m>p.top+4&&M<p.bottom-4){let v=p.top-16-m;M+v<a&&(v+=a-(M+v));const P=g?.querySelector(".nametag")?.getBoundingClientRect(),R=m+v;!(P&&P.width>4&&P.height>4&&R>P.top-12&&b>P.left-6&&u<P.right+6)&&R<=r&&(d+=v)}}}(c||d)&&(e.style.transform=`translate(calc(-50% + ${c.toFixed(1)}px), ${d.toFixed(1)}px)`)}const yf=s0({world:dg,roomW:me,roomH:Ne,currentRoom:()=>S.get().currentRoom,sparkle:()=>B.sparkle(),tap:()=>B.click(),onFound:(e,t)=>{if(hf(),t){const n=$("secrets");n.classList.remove("pulse"),n.offsetWidth,n.classList.add("pulse"),setTimeout(()=>z("🎁 A secret surprise appeared in your drawer!"),1400),et()}}});S.subscribe((e,t)=>{(t.type==="room/switch"||t.type==="game/reset")&&yf.update()});hf();window.__eggs=()=>({found:[...na()]});J3();export{Sr as _,K5 as r,Y5 as s};
