import { Observer } from './Observer.js'

describe('Observer', () => {
  it('should subscribe and notify a listener', () => {
    const observer = new Observer()
    const listener = jest.fn()
    const data = { message: 'hello' }

    observer.subscribe(listener)
    observer.notify(data)

    expect(listener).toHaveBeenCalledWith(data)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should unsubscribe a listener', () => {
    const observer = new Observer()
    const listener = jest.fn()

    observer.subscribe(listener)
    observer.unsubscribe(listener)
    observer.notify()

    expect(listener).not.toHaveBeenCalled()
  })
})
