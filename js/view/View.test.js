import { View } from './View.js'
import { Model } from '../model/Model.js'
import { DataService } from '../service/DataService.js'

jest.mock('../service/DataService.js')

describe('View', () => {
  it('should render the title when the model notifies it of a change', async () => {
    document.body.innerHTML = `<div id="app"></div>`
    DataService.getAppData.mockResolvedValue({
      title: 'New Title',
      resources: []
    })

    const model = new Model(DataService)
    const view = new View('app', model)

    await model.loadData()

    const appContainer = document.getElementById('app')
    expect(appContainer.innerHTML).toContain('<h1>New Title</h1>')
    expect(appContainer.querySelector('ul')).not.toBeNull()
  })

  it('should render the title and resources list', () => {
    document.body.innerHTML = `<div id="app"></div>`

    const mockModel = {
      getTitle: () => 'Test Title',
      getResources: () => [
        {
          url: 'http://test.com',
          title: 'Test Resource',
          category: 'Test'
        }
      ],
      subscribe: jest.fn()
    }

    const view = new View('app', mockModel)
    view.render()

    const appContainer = document.getElementById('app')
    expect(appContainer.querySelector('h1').textContent).toBe('Test Title')
    expect(appContainer.querySelector('ul')).not.toBeNull()
    expect(appContainer.querySelector('li').textContent).toContain(
      'Test Resource'
    )
  })
})
