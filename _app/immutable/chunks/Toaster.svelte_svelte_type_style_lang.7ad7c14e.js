var f=Object.defineProperty;var l=(i,e,s)=>e in i?f(i,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[e]=s;var r=(i,e,s)=>(l(i,typeof e!="symbol"?e+"":e,s),s);let b=0;class p{constructor(){r(this,"subscribers");r(this,"toasts");r(this,"subscribe",e=>(this.subscribers.push(e),()=>{const s=this.subscribers.indexOf(e);this.subscribers.splice(s,1)}));r(this,"publish",e=>{this.subscribers.forEach(s=>s(e))});r(this,"addToast",e=>{this.publish(e),this.toasts=[...this.toasts,e]});r(this,"create",e=>{var o;const{message:s,...t}=e,n=typeof(e==null?void 0:e.id)=="number"||e.id&&((o=e.id)==null?void 0:o.length)>0?e.id:b++;return this.toasts.find(u=>u.id===n)?this.toasts=this.toasts.map(u=>u.id===n?(this.publish({...u,...e,id:n,title:s}),{...u,...e,id:n,title:s}):u):this.addToast({title:s,...t,id:n}),n});r(this,"dismiss",e=>(e||this.toasts.forEach(s=>{this.subscribers.forEach(t=>t({id:s.id,dismiss:!0}))}),this.subscribers.forEach(s=>s({id:e,dismiss:!0})),e));r(this,"message",(e,s)=>this.create({...s,message:e}));r(this,"error",(e,s)=>this.create({...s,message:e,type:"error"}));r(this,"success",(e,s)=>this.create({...s,type:"success",message:e}));r(this,"info",(e,s)=>this.create({...s,type:"info",message:e}));r(this,"warning",(e,s)=>this.create({...s,type:"warning",message:e}));r(this,"promise",(e,s)=>{const t=this.create({...s,promise:e,type:"loading",message:s==null?void 0:s.loading});return(e instanceof Promise?e:e()).then(h=>{const o=typeof(s==null?void 0:s.success)=="function"?s.success(h):s==null?void 0:s.success;this.create({id:t,type:"success",message:o})}).catch(h=>{const o=typeof(s==null?void 0:s.error)=="function"?s.error(h):s==null?void 0:s.error;this.create({id:t,type:"error",message:o})}),t});r(this,"custom",(e,s)=>{const t=(s==null?void 0:s.id)||b++;this.publish({component:e,id:t,...s})});this.subscribers=[],this.toasts=[]}}const c=new p;function m(i,e){const s=(e==null?void 0:e.id)||b++;return c.addToast({title:i,...e,id:s}),s}const g=m,E=Object.assign(g,{success:c.success,info:c.info,warning:c.warning,error:c.error,custom:c.custom,message:c.message,promise:c.promise,dismiss:c.dismiss}),T=i=>({subscribe:i});export{c as T,E as t,T as u};