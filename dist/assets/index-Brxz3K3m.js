(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const d={tools:"AI Coding Tools",news:"AI News",learn:"AI Learning Resources",community:"AI Community & Media",models:"AI Models",frameworks:"AI & LLM Frameworks",databases:"AI Databases & Storage",chatbots:"Popular AI Chatbots"},u={async getAppData(r="tools"){const a=await(await fetch(`../../data/${r}.json`)).json();return{title:d[r]||"AI Resources",resources:a}}};class p{constructor(){this.listeners=[]}subscribe(e){this.listeners.push(e)}unsubscribe(e){this.listeners=this.listeners.filter(a=>a!==e)}notify(e){this.listeners.forEach(a=>a(e))}}class h extends p{constructor(e){super(),this.dataService=e,this.data={title:"",resources:[]},this.type="tools"}async loadData(e=this.type){this.type=e,this.data=await this.dataService.getAppData(e),this.notify(this.data)}setType(e){e!==this.type&&this.loadData(e)}getTitle(){return this.data.title}getResources(){return this.data.resources||[]}getType(){return this.type}}class m{constructor(e){this.model=e}run(){this.model.loadData()}}const y=[{key:"tools",label:"Tools"},{key:"news",label:"News"},{key:"learn",label:"Learn"},{key:"community",label:"Community"},{key:"models",label:"Models"},{key:"frameworks",label:"Frameworks"},{key:"databases",label:"DBs"},{key:"chatbots",label:"Chatbots"}];class f{constructor(e,a,n){this.appContainer=document.getElementById(e),this.model=a,this.onTypeChange=n,this.model.subscribe(()=>this.render()),this.render()}render(){const e=this.model.getTitle(),a=this.model.getResources(),n=this.model.getType(),t=`
      <div class="nav-select-row">
        <label for="nav-select" class="nav-label">Sections:</label>
        <select id="nav-select">
          ${y.map(s=>`<option value="${s.key}"${s.key===n?" selected":""}>${s.label}</option>`).join("")}
        </select>
      </div>
    `;let o="";n==="news"?o=a.sort((s,l)=>new Date(l.createDate)-new Date(s.createDate)).map(s=>{const c=new Date(s.createDate).toLocaleDateString("en-US",{year:"2-digit",month:"2-digit",day:"2-digit",timeZone:"UTC"});return`
            <li>
              <a href="${s.url}" target="_blank">${s.title}</a>
              <span>(${s.category})</span>
              <span style="color:#bdbdbd; font-size:0.9rem; font-style:italic; margin-left:8px;">${c}</span>
            </li>
          `}).join(""):o=a.map(s=>`
            <li>
              <a href="${s.url}" target="_blank">${s.title}</a>
              <span>(${n==="chatbots"?s.vendor:s.category})</span>
            </li>
          `).join(""),this.appContainer.innerHTML=`
      ${t}
      <h1>${e}</h1>
      <ul>${o}</ul>
    `;const i=this.appContainer.querySelector("#nav-select");i&&(i.onchange=s=>{const l=i.value;l&&l!==n&&this.onTypeChange&&this.onTypeChange(l)})}}document.addEventListener("DOMContentLoaded",()=>{const r=new h(u);new f("app",r,a=>r.setType(a)),new m(r).run()});
