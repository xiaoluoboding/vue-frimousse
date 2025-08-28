(function(e,t){typeof exports==`object`&&typeof module<`u`?module.exports=t(require(`vue`)):typeof define==`function`&&define.amd?define([`vue`],t):(e=typeof globalThis<`u`?globalThis:e||self,e.MyComponent=t(e.Vue))})(this,function(e){var t=Object.create,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,a=Object.getPrototypeOf,o=Object.prototype.hasOwnProperty,s=(e,t,a,s)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var c=i(t),l=0,u=c.length,d;l<u;l++)d=c[l],!o.call(e,d)&&d!==a&&n(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(s=r(t,d))||s.enumerable});return e},c=(e,r,i)=>(i=e==null?{}:t(a(e)),s(r||!e||!e.__esModule?n(i,`default`,{value:e,enumerable:!0}):i,e));e=c(e);let l={class:`greetings`},u={class:`green`};var d=(0,e.defineComponent)({__name:`MyComponent`,props:{msg:{}},setup(t){return(t,n)=>((0,e.openBlock)(),(0,e.createElementBlock)(`div`,l,[(0,e.createElementVNode)(`h1`,u,(0,e.toDisplayString)(t.msg),1)]))}}),f=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},p=f(d,[[`__scopeId`,`data-v-32b9fa64`]]);let m={install(e){e.component(`MyComponent`,p),e.provide(`MyComponent`,p),typeof window<`u`&&(window.MyComponent=p)}};var h=m;return h});function e(e,t=`top`){if(!e||typeof document>`u`)return;let n=document.head||document.querySelector(`head`),r=n.querySelector(`:first-child`),i=document.createElement(`style`);i.appendChild(document.createTextNode(e)),t===`top`&&r?n.insertBefore(i,r):n.appendChild(i)}e(`
h1[data-v-32b9fa64] {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}
.greetings h1[data-v-32b9fa64] {
  text-align: center;
}
@media (min-width: 1024px) {
.greetings h1[data-v-32b9fa64] {
    text-align: left;
}
}
`,`top`);