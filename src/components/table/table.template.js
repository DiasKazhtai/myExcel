const CODES = {
  A: 65,
  Z: 90
}

// function toCell() {
//     return 
// }

// function toColumn(col) {
//   return 
// }

function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row">
      <div class="row-info" data-type="resizable" >
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1 // Compute cols count
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((element, index)=>{
         return  `
          <div class="column" data-type="resizable" >
            ${String.fromCharCode(65 + index)}
            <div class="col-resize" data-resize="col" data-index=${index + 1}></div>
          </div>
        `
      })
      .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map((element , index)=> {
              return    `
                 <div class="cell" contenteditable data-index="${index + 1}"></div>
                    `
           })
        .join('')
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
