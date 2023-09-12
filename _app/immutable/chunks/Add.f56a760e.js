import{r as P,d as X}from"./index.8ef45e43.js";import{S as G,y as U,n as J,a as D,i as A,t as Y,j as Z,e as ee,r as j,d as te,b as w,z as re,k as se}from"./context.2e9e4e74.js";import{s as W,C as g,D as b,h as Q,d as m,j as a,i as z,u as O,v as x,W as ie,X as L}from"./scheduler.be789cb2.js";import{S as K,i as N}from"./index.63f467a8.js";class ne extends G{constructor(e,t){super(),this.client=e,this.options=t,this.trackedProps=new Set,this.selectError=null,this.bindMethods(),this.setOptions(t)}bindMethods(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(this.currentQuery.addObserver(this),B(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return T(this.currentQuery,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return T(this.currentQuery,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.clearStaleTimeout(),this.clearRefetchInterval(),this.currentQuery.removeObserver(this)}setOptions(e,t){const r=this.options,i=this.currentQuery;if(this.options=this.client.defaultQueryOptions(e),U(r,this.options)||this.client.getQueryCache().notify({type:"observerOptionsUpdated",query:this.currentQuery,observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=r.queryKey),this.updateQuery();const s=this.hasListeners();s&&V(this.currentQuery,i,this.options,r)&&this.executeFetch(),this.updateResult(t),s&&(this.currentQuery!==i||this.options.enabled!==r.enabled||this.options.staleTime!==r.staleTime)&&this.updateStaleTimeout();const c=this.computeRefetchInterval();s&&(this.currentQuery!==i||this.options.enabled!==r.enabled||c!==this.currentRefetchInterval)&&this.updateRefetchInterval(c)}getOptimisticResult(e){const t=this.client.getQueryCache().build(this.client,e),r=this.createResult(t,e);return ue(this,r,e)&&(this.currentResult=r,this.currentResultOptions=this.options,this.currentResultState=this.currentQuery.state),r}getCurrentResult(){return this.currentResult}trackResult(e){const t={};return Object.keys(e).forEach(r=>{Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:()=>(this.trackedProps.add(r),e[r])})}),t}getCurrentQuery(){return this.currentQuery}remove(){this.client.getQueryCache().remove(this.currentQuery)}refetch({refetchPage:e,...t}={}){return this.fetch({...t,meta:{refetchPage:e}})}fetchOptimistic(e){const t=this.client.defaultQueryOptions(e),r=this.client.getQueryCache().build(this.client,t);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,t))}fetch(e){var t;return this.executeFetch({...e,cancelRefetch:(t=e.cancelRefetch)!=null?t:!0}).then(()=>(this.updateResult(),this.currentResult))}executeFetch(e){this.updateQuery();let t=this.currentQuery.fetch(this.options,e);return e!=null&&e.throwOnError||(t=t.catch(J)),t}updateStaleTimeout(){if(this.clearStaleTimeout(),D||this.currentResult.isStale||!A(this.options.staleTime))return;const t=Y(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout(()=>{this.currentResult.isStale||this.updateResult()},t)}computeRefetchInterval(){var e;return typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.currentResult.data,this.currentQuery):(e=this.options.refetchInterval)!=null?e:!1}updateRefetchInterval(e){this.clearRefetchInterval(),this.currentRefetchInterval=e,!(D||this.options.enabled===!1||!A(this.currentRefetchInterval)||this.currentRefetchInterval===0)&&(this.refetchIntervalId=setInterval(()=>{(this.options.refetchIntervalInBackground||Z.isFocused())&&this.executeFetch()},this.currentRefetchInterval))}updateTimers(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())}clearStaleTimeout(){this.staleTimeoutId&&(clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0)}clearRefetchInterval(){this.refetchIntervalId&&(clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0)}createResult(e,t){const r=this.currentQuery,i=this.options,s=this.currentResult,c=this.currentResultState,u=this.currentResultOptions,l=e!==r,d=l?e.state:this.currentQueryInitialState,o=l?this.currentResult:this.previousQueryResult,{state:h}=e;let{dataUpdatedAt:C,error:S,errorUpdatedAt:I,fetchStatus:R,status:f}=h,p=!1,M=!1,v;if(t._optimisticResults){const y=this.hasListeners(),k=!y&&B(e,t),H=y&&V(e,r,t,i);(k||H)&&(R=ee(e.options.networkMode)?"fetching":"paused",C||(f="loading")),t._optimisticResults==="isRestoring"&&(R="idle")}if(t.keepPreviousData&&!h.dataUpdatedAt&&o!=null&&o.isSuccess&&f!=="error")v=o.data,C=o.dataUpdatedAt,f=o.status,p=!0;else if(t.select&&typeof h.data<"u")if(s&&h.data===(c==null?void 0:c.data)&&t.select===this.selectFn)v=this.selectResult;else try{this.selectFn=t.select,v=t.select(h.data),v=j(s==null?void 0:s.data,v,t),this.selectResult=v,this.selectError=null}catch(y){this.selectError=y}else v=h.data;if(typeof t.placeholderData<"u"&&typeof v>"u"&&f==="loading"){let y;if(s!=null&&s.isPlaceholderData&&t.placeholderData===(u==null?void 0:u.placeholderData))y=s.data;else if(y=typeof t.placeholderData=="function"?t.placeholderData():t.placeholderData,t.select&&typeof y<"u")try{y=t.select(y),this.selectError=null}catch(k){this.selectError=k}typeof y<"u"&&(f="success",v=j(s==null?void 0:s.data,y,t),M=!0)}this.selectError&&(S=this.selectError,v=this.selectResult,I=Date.now(),f="error");const E=R==="fetching",_=f==="loading",F=f==="error";return{status:f,fetchStatus:R,isLoading:_,isSuccess:f==="success",isError:F,isInitialLoading:_&&E,data:v,dataUpdatedAt:C,error:S,errorUpdatedAt:I,failureCount:h.fetchFailureCount,failureReason:h.fetchFailureReason,errorUpdateCount:h.errorUpdateCount,isFetched:h.dataUpdateCount>0||h.errorUpdateCount>0,isFetchedAfterMount:h.dataUpdateCount>d.dataUpdateCount||h.errorUpdateCount>d.errorUpdateCount,isFetching:E,isRefetching:E&&!_,isLoadingError:F&&h.dataUpdatedAt===0,isPaused:R==="paused",isPlaceholderData:M,isPreviousData:p,isRefetchError:F&&h.dataUpdatedAt!==0,isStale:$(e,t),refetch:this.refetch,remove:this.remove}}updateResult(e){const t=this.currentResult,r=this.createResult(this.currentQuery,this.options);if(this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,U(r,t))return;this.currentResult=r;const i={cache:!0},s=()=>{if(!t)return!0;const{notifyOnChangeProps:c}=this.options,u=typeof c=="function"?c():c;if(u==="all"||!u&&!this.trackedProps.size)return!0;const l=new Set(u??this.trackedProps);return this.options.useErrorBoundary&&l.add("error"),Object.keys(this.currentResult).some(d=>{const o=d;return this.currentResult[o]!==t[o]&&l.has(o)})};(e==null?void 0:e.listeners)!==!1&&s()&&(i.listeners=!0),this.notify({...i,...e})}updateQuery(){const e=this.client.getQueryCache().build(this.client,this.options);if(e===this.currentQuery)return;const t=this.currentQuery;this.currentQuery=e,this.currentQueryInitialState=e.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(t==null||t.removeObserver(this),e.addObserver(this))}onQueryUpdate(e){const t={};e.type==="success"?t.onSuccess=!e.manual:e.type==="error"&&!te(e.error)&&(t.onError=!0),this.updateResult(t),this.hasListeners()&&this.updateTimers()}notify(e){w.batch(()=>{if(e.onSuccess){var t,r,i,s;(t=(r=this.options).onSuccess)==null||t.call(r,this.currentResult.data),(i=(s=this.options).onSettled)==null||i.call(s,this.currentResult.data,null)}else if(e.onError){var c,u,l,d;(c=(u=this.options).onError)==null||c.call(u,this.currentResult.error),(l=(d=this.options).onSettled)==null||l.call(d,void 0,this.currentResult.error)}e.listeners&&this.listeners.forEach(({listener:o})=>{o(this.currentResult)}),e.cache&&this.client.getQueryCache().notify({query:this.currentQuery,type:"observerResultsUpdated"})})}}function ae(n,e){return e.enabled!==!1&&!n.state.dataUpdatedAt&&!(n.state.status==="error"&&e.retryOnMount===!1)}function B(n,e){return ae(n,e)||n.state.dataUpdatedAt>0&&T(n,e,e.refetchOnMount)}function T(n,e,t){if(e.enabled!==!1){const r=typeof t=="function"?t(n):t;return r==="always"||r!==!1&&$(n,e)}return!1}function V(n,e,t,r){return t.enabled!==!1&&(n!==e||r.enabled===!1)&&(!t.suspense||n.state.status!=="error")&&$(n,t)}function $(n,e){return n.isStaleByTime(e.staleTime)}function ue(n,e,t){return t.keepPreviousData?!1:t.placeholderData!==void 0?e.isPlaceholderData:!U(n.getCurrentResult(),e)}function ce(){return re()}function le(n,e){const t=ce(),r=t.defaultQueryOptions(n);r._optimisticResults="optimistic";let i=new e(t,r);r.onError&&(r.onError=w.batchCalls(r.onError)),r.onSuccess&&(r.onSuccess=w.batchCalls(r.onSuccess)),r.onSettled&&(r.onSettled=w.batchCalls(r.onSettled)),P(i).subscribe(u=>{i=u,i.setOptions(r,{listeners:!1})});const s=P(i.getCurrentResult(),u=>i.subscribe(w.batchCalls(u))),{subscribe:c}=X(s,u=>(u=i.getOptimisticResult(r),r.notifyOnChangeProps?u:i.trackResult(u)));return{subscribe:c}}function ge(n,e,t){const r=se(n,e,t);return le(r,ne)}function oe(n){let e,t,r,i,s,c;return{c(){e=g("svg"),t=g("path"),r=g("path"),i=g("path"),s=g("line"),c=g("line"),this.h()},l(u){e=b(u,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0,fill:!0,stroke:!0,"stroke-width":!0,"stroke-linecap":!0,"stroke-linejoin":!0});var l=Q(e);t=b(l,"path",{d:!0}),Q(t).forEach(m),r=b(l,"path",{d:!0}),Q(r).forEach(m),i=b(l,"path",{d:!0}),Q(i).forEach(m),s=b(l,"line",{x1:!0,x2:!0,y1:!0,y2:!0}),Q(s).forEach(m),c=b(l,"line",{x1:!0,x2:!0,y1:!0,y2:!0}),Q(c).forEach(m),l.forEach(m),this.h()},h(){a(t,"d","M3 6h18"),a(r,"d","M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"),a(i,"d","M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"),a(s,"x1","10"),a(s,"x2","10"),a(s,"y1","11"),a(s,"y2","17"),a(c,"x1","14"),a(c,"x2","14"),a(c,"y1","11"),a(c,"y2","17"),a(e,"class",n[0]),a(e,"xmlns","http://www.w3.org/2000/svg"),a(e,"width","24"),a(e,"height","24"),a(e,"viewBox","0 0 24 24"),a(e,"fill","none"),a(e,"stroke","currentColor"),a(e,"stroke-width","2"),a(e,"stroke-linecap","round"),a(e,"stroke-linejoin","round")},m(u,l){z(u,e,l),O(e,t),O(e,r),O(e,i),O(e,s),O(e,c)},p(u,[l]){l&1&&a(e,"class",u[0])},i:x,o:x,d(u){u&&m(e)}}}function he(n,e,t){let{class:r=""}=e;return n.$$set=i=>{"class"in i&&t(0,r=i.class)},[r]}class be extends K{constructor(e){super(),N(this,e,he,oe,W,{class:0})}}function q(n){const e=n-1;return e*e*e+1}function Qe(n){const e=Math.cos(n*Math.PI*.5);return Math.abs(e)<1e-14?1:1-e}function Ce(n,{delay:e=0,duration:t=400,easing:r=ie}={}){const i=+getComputedStyle(n).opacity;return{delay:e,duration:t,easing:r,css:s=>`opacity: ${s*i}`}}function Oe(n,{delay:e=0,duration:t=400,easing:r=q,x:i=0,y:s=0,opacity:c=0}={}){const u=getComputedStyle(n),l=+u.opacity,d=u.transform==="none"?"":u.transform,o=l*(1-c),[h,C]=L(i),[S,I]=L(s);return{delay:e,duration:t,easing:r,css:(R,f)=>`
			transform: ${d} translate(${(1-R)*h}${C}, ${(1-R)*S}${I});
			opacity: ${l-o*f}`}}function Se(n,{delay:e=0,duration:t=400,easing:r=q,axis:i="y"}={}){const s=getComputedStyle(n),c=+s.opacity,u=i==="y"?"height":"width",l=parseFloat(s[u]),d=i==="y"?["top","bottom"]:["left","right"],o=d.map(p=>`${p[0].toUpperCase()}${p.slice(1)}`),h=parseFloat(s[`padding${o[0]}`]),C=parseFloat(s[`padding${o[1]}`]),S=parseFloat(s[`margin${o[0]}`]),I=parseFloat(s[`margin${o[1]}`]),R=parseFloat(s[`border${o[0]}Width`]),f=parseFloat(s[`border${o[1]}Width`]);return{delay:e,duration:t,easing:r,css:p=>`overflow: hidden;opacity: ${Math.min(p*20,1)*c};${u}: ${p*l}px;padding-${d[0]}: ${p*h}px;padding-${d[1]}: ${p*C}px;margin-${d[0]}: ${p*S}px;margin-${d[1]}: ${p*I}px;border-${d[0]}-width: ${p*R}px;border-${d[1]}-width: ${p*f}px;`}}function de(n){let e,t,r;return{c(){e=g("svg"),t=g("path"),r=g("path"),this.h()},l(i){e=b(i,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0,fill:!0,stroke:!0,"stroke-width":!0,"stroke-linecap":!0,"stroke-linejoin":!0});var s=Q(e);t=b(s,"path",{d:!0}),Q(t).forEach(m),r=b(s,"path",{d:!0}),Q(r).forEach(m),s.forEach(m),this.h()},h(){a(t,"d","M5 12h14"),a(r,"d","M12 5v14"),a(e,"class",n[0]),a(e,"xmlns","http://www.w3.org/2000/svg"),a(e,"width","24"),a(e,"height","24"),a(e,"viewBox","0 0 24 24"),a(e,"fill","none"),a(e,"stroke","currentColor"),a(e,"stroke-width","2"),a(e,"stroke-linecap","round"),a(e,"stroke-linejoin","round")},m(i,s){z(i,e,s),O(e,t),O(e,r)},p(i,[s]){s&1&&a(e,"class",i[0])},i:x,o:x,d(i){i&&m(e)}}}function fe(n,e,t){let{class:r=""}=e;return n.$$set=i=>{"class"in i&&t(0,r=i.class)},[r]}class Ie extends K{constructor(e){super(),N(this,e,fe,de,W,{class:0})}}export{Ie as A,be as T,Se as a,Oe as b,ge as c,Ce as f,Qe as s,ce as u};