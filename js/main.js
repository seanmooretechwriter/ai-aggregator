import { AppController } from './controller/AppController.js'
import { View } from './view/View.js'
import { Model } from './model/Model.js'
import { DataService } from './service/DataService.js'

// Application Entry Point
document.addEventListener('DOMContentLoaded', () => {
  const model = new Model(DataService)
  const view = new View('app', model, type => model.setType(type))
  const app = new AppController(model)
  app.run()
})
