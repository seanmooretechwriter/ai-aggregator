import { DataService } from './DataService.js'

global.fetch = jest.fn()

describe('DataService', () => {
  it('should fetch and return the application data', async () => {
    const mockResources = [{ title: 'Test Resource' }]
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResources)
    })

    const appData = await DataService.getAppData()

    expect(fetch).toHaveBeenCalledWith('../../data/resources.json')
    expect(appData).toEqual({
      title: 'AI Coding Resources',
      resources: mockResources
    })
  })
})
