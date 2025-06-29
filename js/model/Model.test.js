import { Model } from '../model/Model.js'

describe('Model', () => {
  it('should load data and provide access to it', async () => {
    const mockData = {
      title: 'Mocked Title',
      resources: [{ title: 'Mocked Resource' }]
    }
    const mockDataService = {
      getAppData: jest.fn().mockResolvedValue(mockData)
    }

    const model = new Model(mockDataService)
    const listener = jest.fn()

    model.subscribe(listener)
    await model.loadData()

    expect(model.getTitle()).toBe('Mocked Title')
    expect(model.getResources()).toEqual([{ title: 'Mocked Resource' }])
    expect(listener).toHaveBeenCalledWith(mockData)
  })
})
