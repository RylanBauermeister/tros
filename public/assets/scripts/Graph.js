class Graph {

  constructor(container, items){
    this.container = container
    this.items = items
    this.calculateWidth();
    this.maxItem = Math.max(...items)
    this.renderColumns()
  }


  calculateColumnHeight(value){
    return this.container.clientHeight * (value / this.maxItem) -2
  }

  clearColumns(){
    while(this.container.firstChild){
      this.container.firstChild.remove()
    }
  }

  calculateWidth(){
    this.columnWidth = this.container.clientWidth / (this.items.length) - 2.03 + 'px'
  }

  shuffle() {
    for (let i = this.items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
    this.renderColumns();
  }

  swap(i, j){
    const firstColumn = this.container.childNodes[i].cloneNode(true);
    const secondColumn = this.container.childNodes[j].cloneNode(true);

    firstColumn.classList.add("changed")
    secondColumn.classList.add("changed")
    this.container.replaceChild(firstColumn, this.container.childNodes[j])
    this.container.replaceChild(secondColumn, this.container.childNodes[i])
    setTimeout(() => {
      firstColumn.classList.remove("changed")
      secondColumn.classList.remove("changed")
    }, 1000)

    let hold = this.items[i]
    this.items[i] = this.items[j]
    this.items[j] = hold;
  }

  move(i, j){
    const column = this.container.childNodes[i];
    column.classList.add("changed")
    this.container.insertBefore(column, this.container.childNodes[j])
    setTimeout(() => {
      column.classList.remove("changed")
    }, 1000)

  }


  renderColumns(){
    this.calculateWidth();
    this.clearColumns();
    for(let i = 0; i < this.items.length; i++){
      let column = document.createElement('div')
      column.style.width = this.columnWidth
      column.style.height = this.calculateColumnHeight(this.items[i]) + 'px'
      column.classList.add('column')
      this.container.appendChild(column)
    }
  }

}
