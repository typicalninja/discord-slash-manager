var O=Object.defineProperty;var R=(t,e,n)=>e in t?O(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>(R(t,typeof e!="symbol"?e+"":e,n),n);function G(){}const ct=t=>t;function I(t,e){for(const n in e)t[n]=e[n];return t}function z(t){return t()}function lt(){return Object.create(null)}function F(t){t.forEach(z)}function ot(t){return typeof t=="function"}function ut(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let p;function at(t,e){return t===e?!0:(p||(p=document.createElement("a")),p.href=e,t===p.href)}function ft(t){return Object.keys(t).length===0}function L(t,...e){if(t==null){for(const i of e)i(void 0);return G}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function _t(t){let e;return L(t,n=>e=n)(),e}function dt(t,e,n){t.$$.on_destroy.push(L(e,n))}function ht(t,e,n,i){if(t){const r=S(t,e,n,i);return t[0](r)}}function S(t,e,n,i){return t[1]&&i?I(n.ctx.slice(),t[1](i(e))):n.ctx}function mt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],s=Math.max(e.dirty.length,r.length);for(let l=0;l<s;l+=1)o[l]=e.dirty[l]|r[l];return o}return e.dirty|r}return e.dirty}function pt(t,e,n,i,r,o){if(r){const s=S(e,n,i,o);t.p(s,r)}}function yt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function gt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}let g=!1;function bt(){g=!0}function xt(){g=!1}function W(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function J(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let u=0;u<e.length;u++){const a=e[u];a.claim_order!==void 0&&c.push(a)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const u=e[c].claim_order,a=(r>0&&e[n[r]].claim_order<=u?r+1:W(1,r,B=>e[n[B]].claim_order,u))-1;i[c]=n[a]+1;const k=a+1;n[k]=c,r=Math.max(k,r)}const o=[],s=[];let l=e.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(o.push(e[c-1]);l>=c;l--)s.push(e[l]);l--}for(;l>=0;l--)s.push(e[l]);o.reverse(),s.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<s.length;c++){for(;u<o.length&&s[c].claim_order>=o[u].claim_order;)u++;const a=u<o.length?o[u]:null;t.insertBefore(s[c],a)}}function K(t,e){t.appendChild(e)}function Q(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function vt(t){const e=w("style");return e.textContent="/* empty */",U(Q(t),e),e.sheet}function U(t,e){return K(t.head||t,e),e.sheet}function V(t,e){if(g){for(J(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function X(t,e,n){t.insertBefore(e,n||null)}function Y(t,e,n){g&&!n?V(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function v(t){t.parentNode&&t.parentNode.removeChild(t)}function w(t){return document.createElement(t)}function H(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function T(t){return document.createTextNode(t)}function Et(){return T(" ")}function Nt(){return T("")}function wt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Tt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function kt(t){return t.dataset.svelteH}function At(t){return Array.from(t.childNodes)}function j(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function P(t,e,n,i,r=!1){j(t);const o=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const l=t[s];if(e(l)){const c=n(l);return c===void 0?t.splice(s,1):t[s]=c,r||(t.claim_info.last_index=s),l}}for(let s=t.claim_info.last_index-1;s>=0;s--){const l=t[s];if(e(l)){const c=n(l);return c===void 0?t.splice(s,1):t[s]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function D(t,e,n,i){return P(t,r=>r.nodeName===e,r=>{const o=[];for(let s=0;s<r.attributes.length;s++){const l=r.attributes[s];n[l.name]||o.push(l.name)}o.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Ct(t,e,n){return D(t,e,n,w)}function Mt(t,e,n){return D(t,e,n,H)}function Z(t,e){return P(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>T(e),!0)}function Lt(t){return Z(t," ")}function A(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return-1}function St(t,e){const n=A(t,"HTML_TAG_START",0),i=A(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new C(e);j(t);const r=t.splice(n,i-n+1);v(r[0]),v(r[r.length-1]);const o=r.slice(1,r.length-1);for(const s of o)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new C(e,o)}function Ht(t,e){e=""+e,t.data!==e&&(t.data=e)}function jt(t,e){t.value=e??""}function Pt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Dt(t,e,n){for(let i=0;i<t.options.length;i+=1){const r=t.options[i];if(r.__value===e){r.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function qt(t){const e=t.querySelector(":checked");return e&&e.__value}function $(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}class tt{constructor(e=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=H(n.nodeName):this.e=w(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)X(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(v)}}class C extends tt{constructor(n=!1,i){super(n);f(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)Y(this.t,this.n[i],n)}}function Bt(t,e){return new t(e)}let y;function b(t){y=t}function h(){if(!y)throw new Error("Function called outside component initialization");return y}function Ot(t){h().$$.on_mount.push(t)}function Rt(t){h().$$.after_update.push(t)}function Gt(t){h().$$.on_destroy.push(t)}function It(){const t=h();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const o=$(e,n,{cancelable:i});return r.slice().forEach(s=>{s.call(t,o)}),!o.defaultPrevented}return!0}}function zt(t,e){return h().$$.context.set(t,e),e}function Ft(t){return h().$$.context.get(t)}const m=[],M=[];let d=[];const E=[],q=Promise.resolve();let N=!1;function et(){N||(N=!0,q.then(it))}function Wt(){return et(),q}function nt(t){d.push(t)}function Jt(t){E.push(t)}const x=new Set;let _=0;function it(){if(_!==0)return;const t=y;do{try{for(;_<m.length;){const e=m[_];_++,b(e),rt(e.$$)}}catch(e){throw m.length=0,_=0,e}for(b(null),m.length=0,_=0;M.length;)M.pop()();for(let e=0;e<d.length;e+=1){const n=d[e];x.has(n)||(x.add(n),n())}d.length=0}while(m.length);for(;E.length;)E.pop()();N=!1,x.clear(),b(t)}function rt(t){if(t.fragment!==null){t.update(),F(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(nt)}}function Kt(t){const e=[],n=[];d.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),d=e}export{it as $,mt as A,Gt as B,H as C,Mt as D,wt as E,F,It as G,I as H,gt as I,ot as J,L as K,ct as L,at as M,nt as N,Jt as O,_t as P,jt as Q,qt as R,C as S,St as T,Dt as U,zt as V,Ft as W,Q as X,vt as Y,$ as Z,lt as _,Et as a,ft as a0,Kt as a1,y as a2,b as a3,z as a4,m as a5,et as a6,bt as a7,xt as a8,Rt as b,Lt as c,v as d,Nt as e,w as f,Ct as g,At as h,Y as i,Tt as j,Pt as k,T as l,Z as m,Ht as n,Ot as o,M as p,Bt as q,kt as r,ut as s,Wt as t,V as u,G as v,dt as w,ht as x,pt as y,yt as z};