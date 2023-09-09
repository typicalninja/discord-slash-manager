import{s as K,f as h,a as w,l as Q,g as m,h as B,r as E,c as C,m as X,d as M,j as i,i as Y,u as r,O as N,E as F,v as G,F as Z,N as $,o as ee}from"../chunks/scheduler.80efcbe1.js";import{S as te,i as re}from"../chunks/index.27e9b36e.js";import{a as q,b as ne}from"../chunks/localStore.6c964045.js";import{g as W}from"../chunks/navigation.b6010dac.js";import{f as oe,g as se}from"../chunks/api.379eae5e.js";import{d as ae}from"../chunks/constants.85e98373.js";import{b as J}from"../chunks/paths.e13e6876.js";import{t as P}from"../chunks/Toaster.svelte_svelte_type_style_lang.7ad7c14e.js";async function le(){const t=await oe("oauth2/@me"),{application:s}=t.data;return(s==null?void 0:s.bot)??{}}function ie(t){let s,e,c,T="Login",p,a,v="Enter your client id and client secret",I,y,x="NOT your client token",k,l,_=`Data is not sent to any 3rd party servers,
            everything you do is only recorded to the <span class="font-bold">localStorage</span> and can be deleted if you need to.`,L,b,O='Get your application credentials from here <a href="https://discord.com/developers/applications" class="text-blurple-200 hover:underline">discord.com/developers/applications</a>',A,u,D,d,U,g,j,S,H,z,R;return{c(){s=h("div"),e=h("div"),c=h("h1"),c.textContent=T,p=w(),a=h("p"),a.textContent=v,I=w(),y=h("p"),y.textContent=x,k=w(),l=h("p"),l.innerHTML=_,L=w(),b=h("p"),b.innerHTML=O,A=w(),u=h("input"),D=w(),d=h("input"),U=w(),g=h("button"),j=Q("Login with token 🚀"),this.h()},l(n){s=m(n,"DIV",{class:!0});var f=B(s);e=m(f,"DIV",{class:!0});var o=B(e);c=m(o,"H1",{class:!0,"data-svelte-h":!0}),E(c)!=="svelte-1iq98bf"&&(c.textContent=T),p=C(o),a=m(o,"P",{class:!0,"data-svelte-h":!0}),E(a)!=="svelte-15jhly7"&&(a.textContent=v),I=C(o),y=m(o,"P",{class:!0,"data-svelte-h":!0}),E(y)!=="svelte-8qzf74"&&(y.textContent=x),k=C(o),l=m(o,"P",{class:!0,"data-svelte-h":!0}),E(l)!=="svelte-1erpz9n"&&(l.innerHTML=_),L=C(o),b=m(o,"P",{"data-svelte-h":!0}),E(b)!=="svelte-15pky1h"&&(b.innerHTML=O),A=C(o),u=m(o,"INPUT",{type:!0,placeholder:!0,class:!0}),D=C(o),d=m(o,"INPUT",{type:!0,placeholder:!0,class:!0}),U=C(o),g=m(o,"BUTTON",{class:!0});var V=B(g);j=X(V,"Login with token 🚀"),V.forEach(M),o.forEach(M),f.forEach(M),this.h()},h(){i(c,"class","font-bold font-mono text-3xl"),i(a,"class","text-lg"),i(y,"class","text-sm font-bold"),i(l,"class","text-sm font-medium text-primary-300"),i(u,"type","text"),u.readOnly=t[2],i(u,"placeholder","Client Id"),i(u,"class","bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none"),i(d,"type","password"),d.readOnly=t[2],i(d,"placeholder","Client Secret"),i(d,"class","bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none"),g.disabled=S=t[3]||t[2],i(g,"class",H=(t[2]||t[3]?"bg-primary-600 cursor-not-allowed":"bg-blurple-600 hover:bg-blurple-700")+" p-2 rounded-lg"),i(e,"class","bg-primary-800 shadow-lg shadow-primary-900 border border-primary-700 opacity-90 rounded-lg p-3 w-1/2 flex flex-col gap-2 mt-9"),i(s,"class","flex justify-center")},m(n,f){Y(n,s,f),r(s,e),r(e,c),r(e,p),r(e,a),r(e,I),r(e,y),r(e,k),r(e,l),r(e,L),r(e,b),r(e,A),r(e,u),N(u,t[0]),r(e,D),r(e,d),N(d,t[1]),r(e,U),r(e,g),r(g,j),z||(R=[F(u,"input",t[5]),F(d,"input",t[6]),F(g,"click",t[4])],z=!0)},p(n,[f]){f&4&&(u.readOnly=n[2]),f&1&&u.value!==n[0]&&N(u,n[0]),f&4&&(d.readOnly=n[2]),f&2&&d.value!==n[1]&&N(d,n[1]),f&12&&S!==(S=n[3]||n[2])&&(g.disabled=S),f&12&&H!==(H=(n[2]||n[3]?"bg-primary-600 cursor-not-allowed":"bg-blurple-600 hover:bg-blurple-700")+" p-2 rounded-lg")&&i(g,"class",H)},i:G,o:G,d(n){n&&M(s),z=!1,Z(R)}}}function ue(t,s,e){let c,T=$(q),p=T.clientId,a=T.clientSecret,v=!1;async function I(){if(!c){e(2,v=!0),q.update(l=>({...l,clientId:p,clientSecret:a}));try{const l=await se(p,a);q.update(O=>({...O,accessToken:l}));const{username:_,discriminator:L,id:b}=await le();if(typeof _!="string"||typeof b!="string")throw new TypeError("API Returned non string values");return ne.set({username:_,discriminator:L,id:b}),e(2,v=!1),W(`${J}/dashboard`)}catch(l){throw console.log("Error while verifying",l),q.update(_=>({..._,accessToken:""})),e(2,v=!1),P.error("Error occurred while logging in"),P.error(`${l}`),new Error("Failed to login")}}}async function y(){if(!ae.test(p))return P.error("Client ID is invalid");P.promise(I(),{loading:"Logging in...",success:"Logged in, redirecting...",error:"Could not log in, check your credentials"})}ee(()=>{T.accessToken!==""&&(P.success("Already logged in, redirecting"),W(`${J}/dashboard`))});function x(){p=this.value,e(0,p)}function k(){a=this.value,e(1,a)}return t.$$.update=()=>{t.$$.dirty&3&&e(3,c=p===""||a==="")},[p,a,v,c,y,x,k]}class be extends te{constructor(s){super(),re(this,s,ue,ie,K,{})}}export{be as component};
