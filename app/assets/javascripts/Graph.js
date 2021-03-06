class Graph {

  constructor(container, items){
    this.container = container
    this.items = items
    this.calculateWidth();
    this.renderColumns()
  }

  get maxItem() {
    return Math.max(...this.items)
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
    this.columnWidth = Math.floor(this.container.clientWidth / (this.items.length) - 2) + 'px'
  }

  shuffle() {
    for (let i = this.items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
    this.renderColumns();
    return this.items.slice(0)
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

  update(arr, start){
    let size = arr.length
    this.items.splice(start, size, ...arr)
    this.renderColumns();
    for(let i = start; i < start+size; i++){
      this.container.childNodes[i].classList.add("changed")
    }
  }

  getStatsContainer(){
    return this.container.parentNode.querySelector('.data')
  }

  setAccesses(num){
    let dataContainer = this.getStatsContainer()
    let stats = dataContainer.querySelector('ul')
    let accesses = stats.querySelector('span.num-access')
    accesses.textContent = num
  }

  setSwaps(num){
    let dataContainer = this.getStatsContainer()
    let stats = dataContainer.querySelector('ul')
    let swaps = stats.querySelector('span.num-swap')
    swaps.textContent = num
  }

  setCompares(num){
    let dataContainer = this.getStatsContainer()
    let stats = dataContainer.querySelector('ul')
    let compares = stats.querySelector('span.num-compare')
    compares.textContent = num
  }

  resetStats(){
    let dataContainer = this.getStatsContainer()
    let stats = dataContainer.querySelector('ul')
    let compares = stats.querySelector('span.num-compare')
    let swaps = stats.querySelector('span.num-swap')
    let accesses = stats.querySelector('span.num-access')

    accesses.textContent = '0';
    swaps.textContent = '0';
    compares.textContent = '0';

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
