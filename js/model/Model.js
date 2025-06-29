import { DataService } from '../service/DataService.js'
import { Observer } from '../core/Observer.js'

export class Model extends Observer {
  constructor (dataService) {
    super()
    this.dataService = dataService
    this.data = { title: '', resources: [] }
    this.type = 'tools'
  }

  async loadData (type = this.type) {
    this.type = type
    this.data = await this.dataService.getAppData(type)
    this.notify(this.data)
  }

  setType (type) {
    if (type !== this.type) {
      this.loadData(type)
    }
  }

  getTitle () {
    return this.data.title
  }

  getResources () {
    return this.data.resources || []
  }

  getType () {
    return this.type
  }
}
