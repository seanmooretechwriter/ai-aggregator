import { DataService } from './DataService.js'

global.fetch = jest.fn()

describe('DataService', () => {
  it('should fetch and return the application data for tools', async () => {
    const mockResources = [{ title: 'Test Resource' }]
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResources)
    })

    const appData = await DataService.getAppData()

    expect(fetch).toHaveBeenCalledWith('../../data/tools.json')
    expect(appData).toEqual({
      title: 'AI Coding Tools',
      resources: mockResources
    })
  })

  it('should fetch and return the application data for databases', async () => {
    const mockResources = [{ title: 'DB Resource' }]
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResources)
    })

    const appData = await DataService.getAppData('databases')

    expect(fetch).toHaveBeenCalledWith('../../data/databases.json')
    expect(appData).toEqual({
      title: 'AI Databases & Storage',
      resources: mockResources
    })
  })
})
