import { AppController } from './AppController.js'

describe('AppController', () => {
  it('should tell the model to load data when it runs', () => {
    const mockModel = {
      loadData: jest.fn()
    }

    const controller = new AppController(mockModel)
    controller.run()

    expect(mockModel.loadData).toHaveBeenCalledTimes(1)
  })
})
