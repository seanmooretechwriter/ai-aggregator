(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const l={tools:"AI Coding Tools",learn:"AI Learning Resources",models:"AI Models",frameworks:"AI & LLM Frameworks",databases:"AI Databases & Storage",chatbots:"Popular AI Chatbots"},c={async getAppData(a="tools"){const r=await(await fetch(`../../data/${a}.json`)).json();return{title:l[a]||"AI Resources",resources:r}}};class d{constructor(){this.listeners=[]}subscribe(e){this.listeners.push(e)}unsubscribe(e){this.listeners=this.listeners.filter(r=>r!==e)}notify(e){this.listeners.forEach(r=>r(e))}}class u extends d{constructor(e){super(),this.dataService=e,this.data={title:"",resources:[]},this.type="tools"}async loadData(e=this.type){this.type=e,this.data=await this.dataService.getAppData(e),this.notify(this.data)}setType(e){e!==this.type&&this.loadData(e)}getTitle(){return this.data.title}getResources(){return this.data.resources||[]}getType(){return this.type}}class h{constructor(e){this.model=e}run(){this.model.loadData()}}const p=[{key:"tools",label:"Tools"},{key:"learn",label:"Learn"},{key:"models",label:"Models"},{key:"frameworks",label:"Frameworks"},{key:"databases",label:"DBs"},{key:"chatbots",label:"Chatbots"}];class f{constructor(e,r,n){this.appContainer=document.getElementById(e),this.model=r,this.onTypeChange=n,this.model.subscribe(()=>this.render()),this.render()}render(){const e=this.model.getTitle(),r=this.model.getResources(),n=this.model.getType(),t=`
      <nav class="navbar">
        ${p.map(s=>`
            <button class="nav-btn${s.key===n?" active":""}" data-type="${s.key}">${s.label}</button>
          `).join("")}
      </nav>
    `,o=r.map(s=>`
      <li>
        <a href="${s.url}" target="_blank">${s.title}</a>
        <span>(${n==="chatbots"?s.vendor:s.category})</span>
      </li>
    `).join("");this.appContainer.innerHTML=`
      ${t}
      <h1>${e}</h1>
      <ul>${o}</ul>
    `,this.appContainer.querySelectorAll(".nav-btn").forEach(s=>{s.onclick=y=>{const i=s.getAttribute("data-type");i&&i!==n&&this.onTypeChange&&this.onTypeChange(i)}})}}document.addEventListener("DOMContentLoaded",()=>{const a=new u(c);new f("app",a,r=>a.setType(r)),new h(a).run()});
