const TYPES = [
  { key: 'tools', label: 'Tools' },
  { key: 'learn', label: 'Learn' },
  { key: 'models', label: 'Models' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'databases', label: 'DBs' },
  { key: 'chatbots', label: 'Chatbots' }
]

export class View {
  constructor (containerId, model, onTypeChange) {
    this.appContainer = document.getElementById(containerId)
    this.model = model
    this.onTypeChange = onTypeChange

    this.model.subscribe(() => this.render())
    this.render()
  }

  render () {
    const title = this.model.getTitle()
    const resources = this.model.getResources()
    const currentType = this.model.getType()

    const navbarHtml = `
      <nav class="navbar">
        ${TYPES.map(
          type => `
            <button class="nav-btn${
              type.key === currentType ? ' active' : ''
            }" data-type="${type.key}">${type.label}</button>
          `
        ).join('')}
      </nav>
    `

    const resourcesHtml = resources
      .map(
        resource => `
      <li>
        <a href="${resource.url}" target="_blank">${resource.title}</a>
        <span>(${
          currentType === 'chatbots' ? resource.vendor : resource.category
        })</span>
      </li>
    `
      )
      .join('')

    this.appContainer.innerHTML = `
      ${navbarHtml}
      <h1>${title}</h1>
      <ul>${resourcesHtml}</ul>
    `

    // Add event listeners for navbar buttons
    this.appContainer.querySelectorAll('.nav-btn').forEach(btn => {
      btn.onclick = e => {
        const type = btn.getAttribute('data-type')
        if (type && type !== currentType && this.onTypeChange) {
          this.onTypeChange(type)
        }
      }
    })
  }
}
