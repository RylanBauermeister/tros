const RECORDS_URL = 'postgres://cgwecytjsxdhni:0df2eef90033e851c30328044bc64ab452fd0b368167c00d7f5e1f420d9c12eb@ec2-174-129-240-67.compute-1.amazonaws.com:5432/dbjmltr86c4kr0/api/v1/records/'
const PREFS_URL = 'postgres://cgwecytjsxdhni:0df2eef90033e851c30328044bc64ab452fd0b368167c00d7f5e1f420d9c12eb@ec2-174-129-240-67.compute-1.amazonaws.com:5432/dbjmltr86c4kr0/api/v1/site_prefs/'
const SORTS = {
  'insertion': "Insertion Sort",
  'selection': "Selection Sort",
  'merge': "Merge Sort",
  'bubble': "Bubble Sort",
  'quick': "Quick Sort"
}

let ARRAY_SIZE;

function changeArraySize (num, ...graphs) {
    ARRAY_SIZE = num;
    let newArray = randomArray(num)
    graphs.forEach(graph => {
      graph.items = newArray.slice(0)
      graph.renderColumns()
    })

    fetch(PREFS_URL+"1", {
      method: "PATCH",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        array_size: num
      })
    })

}

function randomArray(size){
  let results = []
  for(let i = 0; i < size; i++){
    results.push(Math.floor(Math.random() * size) + 1)
  }
  return results;
}

function updateTimings(access, compare, swap){
  let accessSpan = document.getElementById('access')
  let swapSpan = document.getElementById('swap')
  let compareSpan = document.getElementById('compare')
  accessSpan.textContent = access
  swapSpan.textContent = swap
  compareSpan.textContent = compare
}

function saveSorts(...sorts){
  sorts.forEach(sort => {
    fetch(RECORDS_URL, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sort_type: sort.type,
        access_time: sort.access,
        swap_time: sort.swap,
        compare_time: sort.compare,
        accesses: sort.counts.access,
        swaps: sort.counts.swap,
        compares: sort.counts.compare,
        array_size: ARRAY_SIZE,
        total_ms: sort.totalMs
      })
    })
    .then(res => res.json())
    .then(json => {
      appendNewRecord(json)
    })
  })

}

function populateRecords(){
  fetch(RECORDS_URL)
  .then(res => res.json())
  .then(addRecords)
}

function addRecords(records){
  let recordsContainer = document.getElementById('sort-records')
  records.forEach(record => {
    recordsContainer.prepend(addRecord(record))
  })
}

function addRecord(record){
  let recordDiv = document.createElement('div')
  let title = document.createElement('h3')
  title.textContent = SORTS[record.sort_type]

  let list = document.createElement('ul');
  let access = document.createElement('li')
  access.textContent = `${record.accesses} accesses at ${record.access_time}ms`
  let swap = document.createElement('li')
  swap.textContent = `${record.swaps} swaps at ${record.swap_time}ms`
  let compare = document.createElement('li')
  compare.textContent = `${record.compares} compares at ${record.compare_time}ms`

  let sizeDiv = document.createElement('div')
  sizeDiv.textContent = `Array of ${record.array_size} items`
  sizeDiv.classList.add("record-sizing")

  let totalTimeDiv = document.createElement('div')
  totalTimeDiv.textContent = `Total Time: ${record.total_ms}ms`
  totalTimeDiv.classList.add("record-timing")

  let deleteButton = document.createElement('button')
  deleteButton.textContent = "Delete"
  deleteButton.classList.add("deleteButton")

  deleteButton.addEventListener('click', ev => {
    deleteRecord(record.id)
    .then(() => {
      recordDiv.remove()
    })
  })

  appendChildren(list, access, swap, compare)

  recordDiv.classList.add('record-item')
  appendChildren(recordDiv, sizeDiv, totalTimeDiv, title, list, deleteButton)

  return recordDiv;
}

function deleteRecord(id){
  return fetch(RECORDS_URL + id, {
    method: "DELETE",
    headers: {
      'content-type': 'application/json'
    }
  })
}

function appendNewRecord(record){
  let recordsContainer = document.getElementById('sort-records')
  recordsContainer.prepend(addRecord(record))
}

function appendChildren(elem, ...args){
  args.forEach(arg => elem.appendChild(arg))
}

function getSitePreferences(){
  fetch(PREFS_URL)
  .then(res => res.json())
  .then(setupSite)
}

function makeGraphs(numGraphs, preferences){
  ARRAY_SIZE = preferences.array_size
  let results = [];
  let data = randomArray(preferences.array_size)
  for(let i = 0; i < numGraphs; i++){
    let graphContainer = document.getElementById(`graph${i+1}`)
    results.push(new Graph(graphContainer, data.slice(0)))
  }
  return results;
}

function makeSorts(preferences, ...graphs){
  const results = []
  for (let i = 0; i < graphs.length; i++){
    let newSort = new Sort({
      graph: graphs[i],
      access: preferences.access_time,
      swap: preferences.swap_time,
      compare: preferences.compare_time
    })
    newSort.resetCounts();
    results.push(newSort)
  }
  return results;
}

function attachEventListeners() {
  let sideMenu = document.getElementById('side-menu')
  let openBubble = document.getElementById('open-bubble');

  openBubble.addEventListener('click', ev => {
    if(sideMenu.classList.contains("open")){
      sideMenu.classList.remove("open")
      ev.target.textContent = ">>"
    } else {
      sideMenu.classList.add("open")
      ev.target.textContent = "<<"
    }
  })

  window.addEventListener('keydown', ev => {
    if (ev.keyCode === 27){
      if(sideMenu.classList.contains("open")){
        sideMenu.classList.remove("open")
        openBubble.textContent = ">>"
      }
    }
  })
}

function addEasterEgg(){
  let header = document.getElementsByTagName('h1')[0]
  let titleLetters = header.children;
  header.addEventListener('click', () => {
    if (!header.classList.contains("unscrambled")){
      titleLetters[4].style.transform = 'translateX(-3em)'
      titleLetters[3].style.transform = 'translateX(-1.5em)'
      titleLetters[1].style.transform = 'translateX(2.25em)'
      titleLetters[0].style.transform = 'translateX(2.25em)'
      header.classList.add('unscrambled')
    } else {
      titleLetters[4].style.transform = 'translateX(0)'
      titleLetters[3].style.transform = 'translateX(0)'
      titleLetters[1].style.transform = 'translateX(0)'
      titleLetters[0].style.transform = 'translateX(0)'
      header.classList.remove('unscrambled')
    }

  })

}

function setupSite(preferences){
  preferences = preferences[0]
  let graphOneSort = document.getElementById('sort-type-1')
  let graphTwoSort = document.getElementById('sort-type-2')

  let [graph1, graph2] = makeGraphs(2, preferences);
  let [sort1, sort2] = makeSorts(preferences, graph1, graph2)

  let shuffleButton = document.getElementById('shuffleButton')
  let sortButton = document.getElementById('sortButton')
  let saveButton = document.getElementById('saveButton')

  let graphSizing = document.getElementById('array-sizing')
  let weighting = document.getElementById('weighting')

  weighting.elements['Access'].value = preferences.access_time;
  weighting.elements['Swap'].value = preferences.swap_time;
  weighting.elements['Compare'].value = preferences.compare_time;
  graphSizing.elements['array_size'].value = preferences.array_size

  updateTimings(preferences.access_time, preferences.compare_time, preferences.swap_time)

  shuffleButton.addEventListener('click', () => {
    saveButton.setAttribute('disabled', 'disabled')
    graph2.items = graph1.shuffle();
    graph2.renderColumns();
  })

  sortButton.addEventListener('click', () => {
    saveButton.setAttribute('disabled', 'disabled')
    let done = 0;
    sort1.resetCounts();
    sort2.resetCounts();
    sort1[graphOneSort.value + "Sort"]()
    .then(() => {
      let sorter = sort1
      let time = sorter.access * sorter.counts.access +
                 sorter.swap * sorter.counts.swap +
                 sorter.compare * sorter.counts.compare;
      sorter.totalMs = time;
      document.getElementById('time-span-1').textContent = time + "ms"
      if (++done === 2){
        saveButton.removeAttribute('disabled')
      }
    });
    sort2[graphTwoSort.value + "Sort"]()
    .then(() => {
      let sorter = sort2
      let time = sorter.access * sorter.counts.access +
                 sorter.swap * sorter.counts.swap +
                 sorter.compare * sorter.counts.compare;
      sorter.totalMs = time;
      document.getElementById('time-span-2').textContent = time + "ms"
      if (++done === 2){
        saveButton.removeAttribute('disabled')
      }
    });
  })

  saveButton.addEventListener('click', ev => {
    sort1.type = graphOneSort.value;
    sort2.type = graphTwoSort.value;
    saveSorts(sort1, sort2)
  })

  window.addEventListener('resize', () => {
    graph1.renderColumns();
    graph2.renderColumns();
  })

  graphSizing.addEventListener('submit', ev => {
    ev.preventDefault();
    saveButton.setAttribute('disabled', 'disabled')
    let newSize = parseInt(ev.target.elements['array_size'].value)

    changeArraySize(newSize, graph1, graph2);
    sort1.resetCounts();
    sort2.resetCounts();
  })

  weighting.addEventListener('submit', ev => {
    ev.preventDefault();
    saveButton.setAttribute('disabled', 'disabled')
    let access = parseInt(ev.target.elements['Access'].value)
    let compare = parseInt(ev.target.elements['Compare'].value)
    let swap = parseInt(ev.target.elements['Swap'].value)
    updateTimings(access, compare, swap)
    sort1.updateTimings(access, compare, swap)
    sort2.updateTimings(access, compare, swap)

    fetch(PREFS_URL+"1", {
      method: "PATCH",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        access_time: parseInt(access),
        compare_time: parseInt(compare),
        swap_time: parseInt(swap)
      })
    })
  })
}

function main(){
  populateRecords();
  getSitePreferences();
  attachEventListeners();
  addEasterEgg();
}

document.addEventListener('DOMContentLoaded', main)
