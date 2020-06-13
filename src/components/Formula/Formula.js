import {ExcelComponent} from '../../core/ExcelComponent'
import { $ } from '../../core/dom'

export class Formula extends ExcelComponent {
  static className (){
    return 'excel__formula'
  }

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }
  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="input" class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  init(){
    super.init()

    this.$formula = this.$root.find('#input')

    this.emmiter.subscribe('table:select', $cell => {
      this.$formula.text($cell.text())
    })

    this.emmiter.subscribe('table:input', $cell =>{
      this.$formula.text($cell.text())
    })
  }

  onKeydown (event) {
    const keys = ['Enter', 'Tab']
    if(keys.includes(event.key)){
      event.preventDefault()
      this.$emit('formula:done')
    }
      
  }
  
}
