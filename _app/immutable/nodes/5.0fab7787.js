import{s as q,n as L,k as V,o as B}from"../chunks/scheduler.5c7fdb1c.js";import{S as N,i as O,g as l,s as h,m as U,h as i,j,x as g,c as v,n as z,f as x,k as p,a as A,y as a,D as F}from"../chunks/index.21959a4f.js";import{a as $,b as G}from"../chunks/localStore.3ee7e119.js";import{g as H}from"../chunks/navigation.95f2663e.js";import{b as M}from"../chunks/paths.6a5b220f.js";function J(f){let e,t,o,w="Logout",y,d,D="Everything done here? 😅",b,c,E="If you liked it please star us on github 🌟",_,r,I=`Data is not sent to any 3rd party servers,
            everything you do is only recorded to the <span class="font-bold">localStorage</span> and can be deleted if you need to.
            Logout does not delete any cached data!!`,C,n,k,T,P;return{c(){e=l("div"),t=l("div"),o=l("h1"),o.textContent=w,y=h(),d=l("p"),d.textContent=D,b=h(),c=l("p"),c.textContent=E,_=h(),r=l("p"),r.innerHTML=I,C=h(),n=l("button"),k=U("Logout 💔"),this.h()},l(u){e=i(u,"DIV",{class:!0});var m=j(e);t=i(m,"DIV",{class:!0});var s=j(t);o=i(s,"H1",{class:!0,"data-svelte-h":!0}),g(o)!=="svelte-15yndtu"&&(o.textContent=w),y=v(s),d=i(s,"P",{"data-svelte-h":!0}),g(d)!=="svelte-1bjxb2m"&&(d.textContent=D),b=v(s),c=i(s,"P",{"data-svelte-h":!0}),g(c)!=="svelte-w0qe6x"&&(c.textContent=E),_=v(s),r=i(s,"P",{class:!0,"data-svelte-h":!0}),g(r)!=="svelte-1mf0ujk"&&(r.innerHTML=I),C=v(s),n=i(s,"BUTTON",{class:!0});var S=j(n);k=z(S,"Logout 💔"),S.forEach(x),s.forEach(x),m.forEach(x),this.h()},h(){p(o,"class","font-bold font-mono text-3xl"),p(r,"class","text-sm font-medium text-primary-300"),n.disabled=f[0].accessToken==="",p(n,"class","bg-red-500 hover:bg-red-600 p-2 rounded-lg"),p(t,"class","bg-primary-800 shadow-lg shadow-primary-900 border border-primary-700 opacity-90 rounded-lg p-3 w-1/2 flex flex-col gap-2 mt-9"),p(e,"class","flex justify-center")},m(u,m){A(u,e,m),a(e,t),a(t,o),a(t,y),a(t,d),a(t,b),a(t,c),a(t,_),a(t,r),a(t,C),a(t,n),a(n,k),T||(P=F(n,"click",f[1]),T=!0)},p:L,i:L,o:L,d(u){u&&x(e),T=!1,P()}}}function K(f){let e=V($);function t(){$.update(o=>({...o,accessToken:""})),G.set({username:"",discriminator:"",id:""}),H(`${M}/login`)}return B(()=>{e.accessToken===""&&H(`${M}/login`)}),[e,t]}class Z extends N{constructor(e){super(),O(this,e,K,J,q,{})}}export{Z as component};
