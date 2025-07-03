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

    let resourcesHtml = ''
    if (currentType === 'news') {
      // Group news by date (MM/DD/YY)
      const grouped = {}
      resources.forEach(resource => {
        const d = new Date(resource.createDate)
        const dateStr = d.toLocaleDateString('en-US', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit'
        })
        if (!grouped[dateStr]) grouped[dateStr] = []
        grouped[dateStr].push(resource)
      })
      resourcesHtml = Object.entries(grouped)
        .sort(
          (a, b) => new Date(b[1][0].createDate) - new Date(a[1][0].createDate)
        )
        .map(
          ([date, items]) => `
          <li class="news-date-heading" style="margin-top:18px; margin-bottom:4px; color:#bdbdbd; font-size:0.98rem; font-style:italic; list-style:none;">${date}</li>
          ${items
            .map(
              resource => `
                <li>
                  <a href="${resource.url}" target="_blank">${resource.title}</a>
                  <span>(${resource.category})</span>
                </li>
              `
            )
            .join('')}
        `
        )
        .join('')
    } else {
      resourcesHtml = resources
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
    }

    this.appContainer.innerHTML = `
      ${selectHtml}
      <h1>${title}</h1>
      <ul>${resourcesHtml}</ul>
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
