const TITLES = {
  tools: 'AI Coding Tools',
  learn: 'AI Learning Resources',
  models: 'AI Models',
  frameworks: 'AI & LLM Frameworks',
  databases: 'AI Databases & Storage',
  chatbots: 'Popular AI Chatbots'
}

export const DataService = {
  async getAppData (type = 'tools') {
    const response = await fetch(`../../data/${type}.json`)
    const resources = await response.json()
    return {
      title: TITLES[type] || 'AI Resources',
      resources: resources
    }
  }
}
