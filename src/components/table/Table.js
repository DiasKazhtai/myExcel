import {ExcelComponent} from '../../core/ExcelComponent'
import {createTable} from './table.template'
import {$} from '../../core/dom'

export class Table extends ExcelComponent {
  static className (){
    return 'excel__table'
  }

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const numForResize =  event.target.getAttribute('data-index')
      const elemForResize = document.querySelectorAll(`[data-index = "${numForResize}"]`)
     
      if(event.target.classList.contains('col-resize')){
        document.onmousemove = e => {
          const delta = e.pageX - coords.right
          const value = coords.width + delta
          $parent.$el.style.width = value + 'px'
          elemForResize.forEach((elem, index)=>{
            elem.style = `width:${value}px`
          })
        }
      }
      if(event.target.classList.contains('row-resize')){
        document.onmousemove = e => {
          const delta = e.pageY - coords.bottom
          const value = coords.height + Math.floor(delta)
          $parent.$el.style.height = value + 'px'
          elemForResize.forEach((elem, index)=>{
            elem.style = `height:${value}px`
          })
        }
      }
    

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
  


