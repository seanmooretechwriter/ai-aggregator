(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const l={tools:"AI Coding Tools",news:"AI News",learn:"AI Learning Resources",community:"AI Community & Media",models:"AI Models",frameworks:"AI & LLM Frameworks",databases:"AI Databases & Storage",chatbots:"Popular AI Chatbots"},c={async getAppData(a="tools"){const o=await(await fetch(`../../data/${a}.json`)).json();return{title:l[a]||"AI Resources",resources:o}}};class d{constructor(){this.listeners=[]}subscribe(e){this.listeners.push(e)}unsubscribe(e){this.listeners=this.listeners.filter(o=>o!==e)}notify(e){this.listeners.forEach(o=>o(e))}}class u extends d{constructor(e){super(),this.dataService=e,this.data={title:"",resources:[]},this.type="tools"}async loadData(e=this.type){this.type=e,this.data=await this.dataService.getAppData(e),this.notify(this.data)}setType(e){e!==this.type&&this.loadData(e)}getTitle(){return this.data.title}getResources(){return this.data.resources||[]}getType(){return this.type}}class h{constructor(e){this.model=e}run(){this.model.loadData()}}const p=[{key:"tools",label:"Tools"},{key:"news",label:"News"},{key:"learn",label:"Learn"},{key:"community",label:"Community"},{key:"models",label:"Models"},{key:"frameworks",label:"Frameworks"},{key:"databases",label:"DBs"},{key:"chatbots",label:"Chatbots"}];class m{constructor(e,o,n){this.appContainer=document.getElementById(e),this.model=o,this.onTypeChange=n,this.model.subscribe(()=>this.render()),this.render()}render(){const e=this.model.getTitle(),o=this.model.getResources(),n=this.model.getType(),t=`
      <div class="nav-select-row">
        <label for="nav-select" class="nav-label">Sections:</label>
        <select id="nav-select">
          ${p.map(r=>`<option value="${r.key}"${r.key===n?" selected":""}>${r.label}</option>`).join("")}
        </select>
      </div>
    `;this.appContainer.innerHTML=`
      ${t}
      <h1>${e}</h1>
      <ul>${o.map(r=>`
        <li>
          <a href="${r.url}" target="_blank">${r.title}</a>
          <span>(${n==="chatbots"?r.vendor:r.category})</span>
        </li>
      `).join("")}</ul>
    `;const s=this.appContainer.querySelector("#nav-select");s&&(s.onchange=r=>{const i=s.value;i&&i!==n&&this.onTypeChange&&this.onTypeChange(i)})}}document.addEventListener("DOMContentLoaded",()=>{const a=new u(c);new m("app",a,o=>a.setType(o)),new h(a).run()});
