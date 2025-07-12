(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const d={tools:"AI Coding Tools",news:"AI News",learn:"AI Learning Resources",community:"AI Community & Media",models:"AI Models",frameworks:"AI & LLM Frameworks",databases:"AI Databases & Storage",chatbots:"Popular AI Chatbots"},u={async getAppData(n="tools"){const o=await(await fetch(`../../data/${n}.json`)).json();return{title:d[n]||"AI Resources",resources:o}}};class p{constructor(){this.listeners=[]}subscribe(e){this.listeners.push(e)}unsubscribe(e){this.listeners=this.listeners.filter(o=>o!==e)}notify(e){this.listeners.forEach(o=>o(e))}}class h extends p{constructor(e){super(),this.dataService=e,this.data={title:"",resources:[]},this.type="news"}async loadData(e=this.type){this.type=e,this.data=await this.dataService.getAppData(e),this.notify(this.data)}setType(e){e!==this.type&&this.loadData(e)}getTitle(){return this.data.title}getResources(){return this.data.resources||[]}getType(){return this.type}}class m{constructor(e){this.model=e}run(){this.model.loadData()}}const y=[{key:"news",label:"News"},{key:"tools",label:"Tools"},{key:"learn",label:"Learn"},{key:"community",label:"Community"},{key:"models",label:"Models"},{key:"frameworks",label:"Frameworks"},{key:"databases",label:"DBs"},{key:"chatbots",label:"Chatbots"}];class f{constructor(e,o,r){this.appContainer=document.getElementById(e),this.model=o,this.onTypeChange=r,this.model.subscribe(()=>this.render()),this.render()}render(){const e=this.model.getTitle(),o=this.model.getResources(),r=this.model.getType(),t=`
      <div class="nav-select-row">
        <label for="nav-select" class="nav-label">Sections:</label>
        <select id="nav-select">
          ${y.map(s=>`<option value="${s.key}"${s.key===r?" selected":""}>${s.label}</option>`).join("")}
        </select>
      </div>
    `;let a="";r==="news"?a=o.sort((s,l)=>new Date(l.createDate)-new Date(s.createDate)).map(s=>{const c=new Date(s.createDate).toLocaleDateString("en-US",{year:"2-digit",month:"2-digit",day:"2-digit",timeZone:"UTC"});return`
            <li>
              <a href="${s.url}" target="_blank">${s.title}</a>
              <span>(${s.category})</span>
              <span style="color:#bdbdbd; font-size:0.9rem; font-style:italic; margin-left:8px;">${c}</span>
            </li>
          `}).join(""):a=o.map(s=>`
            <li>
              <a href="${s.url}" target="_blank">${s.title}</a>
              <span>(${r==="chatbots"?s.vendor:s.category})</span>
            </li>
          `).join(""),this.appContainer.innerHTML=`
      ${t}
      <h1>${e}</h1>
      <ul>${a}</ul>
    `;const i=this.appContainer.querySelector("#nav-select");i&&(i.onchange=s=>{const l=i.value;l&&l!==r&&this.onTypeChange&&this.onTypeChange(l)})}}document.addEventListener("DOMContentLoaded",()=>{const n=new h(u);new f("app",n,o=>n.setType(o)),new m(n).run()});
