import{s as Y,n as J,r as Z,k as $,o as ee}from"../chunks/scheduler.5c7fdb1c.js";import{S as te,i as ne,g as m,s as k,m as le,h as g,j as V,x,c as w,n as se,f as L,k as u,a as X,y as s,C as M,D as B}from"../chunks/index.21959a4f.js";import{a as q,b as ae}from"../chunks/localStore.3ee7e119.js";import{g as K}from"../chunks/navigation.2c693d71.js";import{f as re,g as oe}from"../chunks/api.3d2a0698.js";import{d as ie}from"../chunks/constants.85e98373.js";import{b as Q}from"../chunks/paths.906bffba.js";async function ue(){const n=await re("oauth2/@me"),{application:t}=n.data;return(t==null?void 0:t.bot)??{}}function W(n){let t,e="Please wait..., verifying credentials";return{c(){t=m("p"),t.textContent=e},l(a){t=g(a,"P",{"data-svelte-h":!0}),x(t)!=="svelte-uv8z2c"&&(t.textContent=e)},m(a,_){X(a,t,_)},d(a){a&&L(t)}}}function de(n){let t,e,a,_="Login",f,i,T="Enter your client id and client secret",P,y,S="NOT your client token",b,d,E=`Data is not sent to any 3rd party servers,
            everything you do is only recorded to the <span class="font-bold">localStorage</span> and can be deleted if you need to.`,I,C,R='Get your application credentials from here <a href="https://discord.com/developers/applications" class="text-blurple-200 hover:underline">discord.com/developers/applications</a>',D,c,N,p,U,v,j,O,H,z,A,G,o=n[2]&&W();return{c(){t=m("div"),e=m("div"),a=m("h1"),a.textContent=_,f=k(),i=m("p"),i.textContent=T,P=k(),y=m("p"),y.textContent=S,b=k(),d=m("p"),d.innerHTML=E,I=k(),C=m("p"),C.innerHTML=R,D=k(),c=m("input"),N=k(),p=m("input"),U=k(),v=m("button"),j=le("Login with token 🚀"),z=k(),o&&o.c(),this.h()},l(r){t=g(r,"DIV",{class:!0});var h=V(t);e=g(h,"DIV",{class:!0});var l=V(e);a=g(l,"H1",{class:!0,"data-svelte-h":!0}),x(a)!=="svelte-1iq98bf"&&(a.textContent=_),f=w(l),i=g(l,"P",{class:!0,"data-svelte-h":!0}),x(i)!=="svelte-15jhly7"&&(i.textContent=T),P=w(l),y=g(l,"P",{class:!0,"data-svelte-h":!0}),x(y)!=="svelte-8qzf74"&&(y.textContent=S),b=w(l),d=g(l,"P",{class:!0,"data-svelte-h":!0}),x(d)!=="svelte-1erpz9n"&&(d.innerHTML=E),I=w(l),C=g(l,"P",{"data-svelte-h":!0}),x(C)!=="svelte-15pky1h"&&(C.innerHTML=R),D=w(l),c=g(l,"INPUT",{type:!0,placeholder:!0,class:!0}),N=w(l),p=g(l,"INPUT",{type:!0,placeholder:!0,class:!0}),U=w(l),v=g(l,"BUTTON",{class:!0});var F=V(v);j=se(F,"Login with token 🚀"),F.forEach(L),z=w(l),o&&o.l(l),l.forEach(L),h.forEach(L),this.h()},h(){u(a,"class","font-bold font-mono text-3xl"),u(i,"class","text-lg"),u(y,"class","text-sm font-bold"),u(d,"class","text-sm font-medium text-primary-300"),u(c,"type","text"),c.readOnly=n[2],u(c,"placeholder","Client Id"),u(c,"class","bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none"),u(p,"type","password"),p.readOnly=n[2],u(p,"placeholder","Client Secret"),u(p,"class","bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none"),v.disabled=O=n[3]||n[2],u(v,"class",H=(n[2]||n[3]?"bg-primary-600 cursor-not-allowed":"bg-blurple-600 hover:bg-blurple-700")+" p-2 rounded-lg"),u(e,"class","bg-primary-800 shadow-lg shadow-primary-900 border border-primary-700 opacity-90 rounded-lg p-3 w-1/2 flex flex-col gap-2 mt-9"),u(t,"class","flex justify-center")},m(r,h){X(r,t,h),s(t,e),s(e,a),s(e,f),s(e,i),s(e,P),s(e,y),s(e,b),s(e,d),s(e,I),s(e,C),s(e,D),s(e,c),M(c,n[0]),s(e,N),s(e,p),M(p,n[1]),s(e,U),s(e,v),s(v,j),s(e,z),o&&o.m(e,null),A||(G=[B(c,"input",n[5]),B(p,"input",n[6]),B(v,"click",n[4])],A=!0)},p(r,[h]){h&4&&(c.readOnly=r[2]),h&1&&c.value!==r[0]&&M(c,r[0]),h&4&&(p.readOnly=r[2]),h&2&&p.value!==r[1]&&M(p,r[1]),h&12&&O!==(O=r[3]||r[2])&&(v.disabled=O),h&12&&H!==(H=(r[2]||r[3]?"bg-primary-600 cursor-not-allowed":"bg-blurple-600 hover:bg-blurple-700")+" p-2 rounded-lg")&&u(v,"class",H),r[2]?o||(o=W(),o.c(),o.m(e,null)):o&&(o.d(1),o=null)},i:J,o:J,d(r){r&&L(t),o&&o.d(),A=!1,Z(G)}}}function ce(n,t,e){let a,_=$(q),f=_.clientId,i=_.clientSecret,T=!1;async function P(){if(!a){if(!ie.test(f))return alert("Id is invalid.");e(2,T=!0),q.update(b=>({...b,clientId:f,clientSecret:i}));try{const b=await oe(f,i);q.update(C=>({...C,accessToken:b}));const{username:d,discriminator:E,id:I}=await ue();if(typeof d!="string"||typeof I!="string")throw new TypeError("API Returned non string values");ae.set({username:d,discriminator:E,id:I}),K(`${Q}/dashboard`)}catch(b){console.log("Error while verifying",b),q.update(d=>({...d,accessToken:""})),alert("Verification failed, try again (check your credentials)")}e(2,T=!1)}}ee(()=>{_.accessToken!==""&&K(`${Q}/dashboard`)});function y(){f=this.value,e(0,f)}function S(){i=this.value,e(1,i)}return n.$$.update=()=>{n.$$.dirty&3&&e(3,a=f===""||i==="")},[f,i,T,a,P,y,S]}class be extends te{constructor(t){super(),ne(this,t,ce,de,Y,{})}}export{be as component};