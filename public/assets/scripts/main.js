function main(){
  let graphContainer1 = document.getElementById('graph1')
  let graphContainer2 = document.getElementById('graph2')
  let graphOneSort = document.getElementById('sort-type-1')
  let graphTwoSort = document.getElementById('sort-type-2')
  let graph1 = new Graph(graphContainer1, [1,2,3,3,4,5,5,6,7,8,9,10,11,12,13,14,15,16])
  let graph2 = new Graph(graphContainer2, [1,2,3,3,4,5,5,6,7,8,9,10,11,12,13,14,15,16])

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


  graph1.shuffle();
  graph2.shuffle();

  let shuffleButton = document.getElementById('shuffleButton')
  let sortButton = document.getElementById('sortButton')

  shuffleButton.addEventListener('click', () => {
    graph1.shuffle();
    graph2.shuffle();
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
