(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const l={tools:"AI Coding Tools",blogs:"AI Blogs & Newsletters",learn:"AI Learning Resources",models:"AI Models & Frameworks",vendors:"AI Vendors & Platforms",chatbots:"Popular AI Chatbots"},c={async getAppData(n="tools"){const o=await(await fetch(`../../data/${n}.json`)).json();return{title:l[n]||"AI Resources",resources:o}}};class d{constructor(){this.listeners=[]}subscribe(e){this.listeners.push(e)}unsubscribe(e){this.listeners=this.listeners.filter(o=>o!==e)}notify(e){this.listeners.forEach(o=>o(e))}}class u extends d{constructor(e){super(),this.dataService=e,this.data={title:"",resources:[]},this.type="tools"}async loadData(e=this.type){this.type=e,this.data=await this.dataService.getAppData(e),this.notify(this.data)}setType(e){e!==this.type&&this.loadData(e)}getTitle(){return this.data.title}getResources(){return this.data.resources||[]}getType(){return this.type}}class h{constructor(e){this.model=e}run(){this.model.loadData()}}const p=[{key:"tools",label:"Tools"},{key:"blogs",label:"Blogs"},{key:"learn",label:"Learn"},{key:"models",label:"Models"},{key:"vendors",label:"Vendors"},{key:"chatbots",label:"Chatbots"}];class y{constructor(e,o,a){this.appContainer=document.getElementById(e),this.model=o,this.onTypeChange=a,this.model.subscribe(()=>this.render()),this.render()}render(){const e=this.model.getTitle(),o=this.model.getResources(),a=this.model.getType(),t=`
      <nav class="navbar">
        ${p.map(s=>`
            <button class="nav-btn${s.key===a?" active":""}" data-type="${s.key}">${s.label}</button>
          `).join("")}
      </nav>
    `,r=o.map(s=>`
      <li>
        <a href="${s.url}" target="_blank">${s.title}</a>
        <span>(${a==="chatbots"?s.vendor:s.category})</span>
      </li>
    `).join("");this.appContainer.innerHTML=`
      ${t}
      <h1>${e}</h1>
      <ul>${r}</ul>
    `,this.appContainer.querySelectorAll(".nav-btn").forEach(s=>{s.onclick=f=>{const i=s.getAttribute("data-type");i&&i!==a&&this.onTypeChange&&this.onTypeChange(i)}})}}document.addEventListener("DOMContentLoaded",()=>{const n=new u(c);new y("app",n,o=>n.setType(o)),new h(n).run()});
