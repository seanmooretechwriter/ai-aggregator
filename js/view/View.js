const TYPES = [
  { key: 'tools', label: 'Tools' },
  { key: 'news', label: 'News' },
  { key: 'learn', label: 'Learn' },
  { key: 'community', label: 'Community' },
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

    // Only render the select dropdown for navigation
    const selectHtml = `
      <div class="nav-select-row">
        <label for="nav-select" class="nav-label">Sections:</label>
        <select id="nav-select">
          ${TYPES.map(
            type =>
              `<option value="${type.key}"${
                type.key === currentType ? ' selected' : ''
              }>${type.label}</option>`
          ).join('')}
        </select>
      </div>
    `

    this.appContainer.innerHTML = `
      ${selectHtml}
      <h1>${title}</h1>
      <ul>${resources
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
        .join('')}</ul>
    `

    // Add event listener for select dropdown
    const navSelect = this.appContainer.querySelector('#nav-select')
    if (navSelect) {
      navSelect.onchange = e => {
        const type = navSelect.value
        if (type && type !== currentType && this.onTypeChange) {
          this.onTypeChange(type)
        }
      }
    }
  }
}
