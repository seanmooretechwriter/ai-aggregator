import { Model } from '../model/Model.js'

export class AppController {
  constructor (model) {
    this.model = model
  }

  run () {
    this.model.loadData()
  }
}
