function randomArray(size){
  let results = []
  for(let i = 0; i < size; i++){
    results.push(Math.floor(Math.random() * size) + 1)
  }
  return results;
}

function updateTimings(access, swap, compare){
  let accessSpan = document.getElementById('access')
  let swapSpan = document.getElementById('swap')
  let compareSpan = document.getElementById('compare')
  console.log(accessSpan.textContent)
  accessSpan.textContent = access
  swapSpan.textContent = swap
  compareSpan.textContent = compare

}

function main(){
  let graphContainer1 = document.getElementById('graph1')
  let graphContainer2 = document.getElementById('graph2')

  let graphOneSort = document.getElementById('sort-type-1')
  let graphTwoSort = document.getElementById('sort-type-2')

  let data = randomArray(20)
  let graph1 = new Graph(graphContainer1, data.slice(0))
  let graph2 = new Graph(graphContainer2, data.slice(0))

  updateTimings(50,10,10)

  let sort1 = new Sort({
    graph: graph1,
    access: 50,
    swap: 10,
    compare: 10
  })
  let sort2 = new Sort({
    graph: graph2,
    access: 50,
    swap: 10,
    compare: 10
  })

  let shuffleButton = document.getElementById('shuffleButton')
  let sortButton = document.getElementById('sortButton')

  shuffleButton.addEventListener('click', () => {
    graph2.items = graph1.shuffle();
    graph2.renderColumns();
  })

  sortButton.addEventListener('click', () => {
    sort1[graphOneSort.value + "Sort"]();
    sort2[graphTwoSort.value + "Sort"]();
  })

  window.addEventListener('resize', () => {
    graph1.renderColumns();
    graph2.renderColumns();
  })

}

document.addEventListener('DOMContentLoaded', main)
