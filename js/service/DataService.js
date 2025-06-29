const TITLES = {
  tools: 'AI Coding Tools',
  blogs: 'AI Blogs & Newsletters',
  learn: 'AI Learning Resources',
  models: 'AI Models & Frameworks',
  vendors: 'AI Vendors & Platforms',
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
