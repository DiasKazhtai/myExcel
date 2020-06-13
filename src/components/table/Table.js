import {ExcelComponent} from '../../core/ExcelComponent'
import {$} from '../../core/dom'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {isCell, matrix, shouldResize, nextSelector} from './table.functions'
import {TableSelection} from './TableSelection'

export class Table extends ExcelComponent {
  static className (){
    return 'excel__table'
  }

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()


    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
    this.$emit('table:select', $cell)

    this.emmiter.subscribe('formula:input', text => {
      this.selection.current.text(text)
    })
    
    this.emmiter.subscribe('formula:done', ()=>{
      this.selection.current.focus()
    })
  }
  
  onKeydown (event){
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']

    const {key} = event

    if(keys.includes(key) && !event.shiftKey){
      event.preventDefault()
      const id =  this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selection.select($next)
      this.$emit('table:select', $next)

    }
    nextSelector(key, id)
  }

  

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onInput(event){
    this.$emit('table:input', $(event.target))
  }

}

