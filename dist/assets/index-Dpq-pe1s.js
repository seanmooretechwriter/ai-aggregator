(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const u={tools:"AI Coding Tools",news:"AI News",learn:"AI Learning Resources",community:"AI Community & Media",models:"AI Models",frameworks:"AI & LLM Frameworks",databases:"AI Databases & Storage",chatbots:"Popular AI Chatbots"},p={async getAppData(n="tools"){const o=await(await fetch(`../../data/${n}.json`)).json();return{title:u[n]||"AI Resources",resources:o}}};class h{constructor(){this.listeners=[]}subscribe(e){this.listeners.push(e)}unsubscribe(e){this.listeners=this.listeners.filter(o=>o!==e)}notify(e){this.listeners.forEach(o=>o(e))}}class m extends h{constructor(e){super(),this.dataService=e,this.data={title:"",resources:[]},this.type="tools"}async loadData(e=this.type){this.type=e,this.data=await this.dataService.getAppData(e),this.notify(this.data)}setType(e){e!==this.type&&this.loadData(e)}getTitle(){return this.data.title}getResources(){return this.data.resources||[]}getType(){return this.type}}class y{constructor(e){this.model=e}run(){this.model.loadData()}}const f=[{key:"tools",label:"Tools"},{key:"news",label:"News"},{key:"learn",label:"Learn"},{key:"community",label:"Community"},{key:"models",label:"Models"},{key:"frameworks",label:"Frameworks"},{key:"databases",label:"DBs"},{key:"chatbots",label:"Chatbots"}];class b{constructor(e,o,i){this.appContainer=document.getElementById(e),this.model=o,this.onTypeChange=i,this.model.subscribe(()=>this.render()),this.render()}render(){const e=this.model.getTitle(),o=this.model.getResources(),i=this.model.getType(),t=`
      <div class="nav-select-row">
        <label for="nav-select" class="nav-label">Sections:</label>
        <select id="nav-select">
          ${f.map(a=>`<option value="${a.key}"${a.key===i?" selected":""}>${a.label}</option>`).join("")}
        </select>
      </div>
    `;let s="";if(i==="news"){const a={};o.forEach(r=>{const c=new Date(r.createDate).toLocaleDateString("en-US",{year:"2-digit",month:"2-digit",day:"2-digit"});a[c]||(a[c]=[]),a[c].push(r)}),s=Object.entries(a).sort((r,d)=>new Date(d[1][0].createDate)-new Date(r[1][0].createDate)).map(([r,d])=>`
          <li class="news-date-heading" style="margin-top:18px; margin-bottom:4px; color:#bdbdbd; font-size:0.98rem; font-style:italic; list-style:none;">${r}</li>
          ${d.map(c=>`
                <li>
                  <a href="${c.url}" target="_blank">${c.title}</a>
                  <span>(${c.category})</span>
                </li>
              `).join("")}
        `).join("")}else s=o.map(a=>`
            <li>
              <a href="${a.url}" target="_blank">${a.title}</a>
              <span>(${i==="chatbots"?a.vendor:a.category})</span>
            </li>
          `).join("");this.appContainer.innerHTML=`
      ${t}
      <h1>${e}</h1>
      <ul>${s}</ul>
    `;const l=this.appContainer.querySelector("#nav-select");l&&(l.onchange=a=>{const r=l.value;r&&r!==i&&this.onTypeChange&&this.onTypeChange(r)})}}document.addEventListener("DOMContentLoaded",()=>{const n=new m(p);new b("app",n,o=>n.setType(o)),new y(n).run()});
