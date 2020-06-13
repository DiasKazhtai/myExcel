import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emmiter = options.emmiter
    this.unsubscribers = []
    this.prepare()
  }

  //Настраиваем наш компонент до init
  prepare() {

  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  //Уведолмяем слушателей
  $emit (event, ...args){
    this.emmiter.emit(event, ...args)
  }

  //Подписываемся на событие event
  $on(event, fn){
    this.emmiter.subscirbe(event, fn)
    this.unsubscribers.push(unsub)
  }

  //Инициализируем компонент добавляем Dom слушателей
  init() {
    this.initDOMListeners()
  }

  //Удаляем компонент чистим слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
