class Sort{
  constructor(settings){
    this.graph = settings.graph
    this.access = settings.access
    this.swap = settings.swap
    this.compare = settings.compare
    this.totalMs = 0;

    this.resetCounts()
  }

  updateTimings(access, compare, swap){
    this.access = access
    this.swap = swap
    this.compare = compare
  }

  resetCounts(){
    this.counts = {
      access: 0,
      swap: 0,
      compare: 0
    }
    this.graph.resetStats()
  }

  async increaseCompares(num = 1){
    await this.sleep(num * this.compare)
    this.counts.compare = this.counts.compare + num
    this.graph.setCompares(this.counts.compare)
  }

  async increaseSwaps(num = 1){
    await this.sleep(num * this.swap)
    this.counts.swap = this.counts.swap + num
    this.graph.setSwaps(this.counts.swap)
  }

  async increaseAccesses(num = 1){
    await this.sleep(num * this.access)
    this.counts.access = this.counts.access + num
    this.graph.setAccesses(this.counts.access)
  }

  async insertionSort(){
    let array = this.graph.items;
    for(let i = 1; i < array.length; i++){
      await this.increaseAccesses()
      await this.increaseCompares()
      if(array[i] < array[i-1]){
        let move = array[i]
        let j = 0;
        while(move >= array[j]){
          await this.increaseAccesses()
          await this.increaseCompares()
          j++;
        }
        this.graph.move(i, j)
        array.splice(i, 1)
        array.splice(j, 0, move)
        await this.increaseSwaps()
      }
    }
  }

  async bubbleSort(){
    let array = this.graph.items;
    let swapped = true;
    while(swapped){
      swapped = false;
      for(let i = 1; i < array.length; i++){
        await this.increaseAccesses()
        await this.increaseCompares()
        if(array[i] < array[i-1]){
          this.graph.swap(i, i-1)
          await this.increaseSwaps()
          swapped = true;
        }
      }
    }
  }

  async selectionSort(){
    let array = this.graph.items;

    for(let i = 0; i < array.length; i++){
      let subArray = array.slice(i)
      let minElement = Math.min(...subArray)
      await this.increaseAccesses(subArray.length)
      await this.increaseCompares(subArray.length)
      let swapIndex = subArray.indexOf(minElement) + i
      if( i !== swapIndex){
        this.graph.swap(i, swapIndex)
        await this.increaseSwaps()
      }
    }
  }

  async merge(arr1, arr2){
    let result = [];
    await this.increaseAccesses(arr1.length + arr2.length)
    await this.increaseCompares(Math.min(arr1.length, arr2.length))
    while(arr1.length !== 0 && arr2.length !== 0){
      result.push( arr1[0] < arr2[0] ? arr1.shift() : arr2.shift() )
      await this.increaseSwaps()
    }
    return (arr2.length === 0 ? result.concat(arr1) : arr1.length === 0 ? result.concat(arr2) : result)
  }

  async mergeSort(arr = this.graph.items, start = 0){
    if(arr.length === 1 || arr.length === 0){
      return arr;
    }
    let half = Math.floor(arr.length/2)
    let firstArray = await this.mergeSort(arr.slice(0, half), start)
    let secondArray = await this.mergeSort(arr.slice(half), start + half)
    arr = await this.merge(firstArray, secondArray)
    this.graph.update(arr, start);
    return arr;
  }

  async partition(low, high){
    let pivot = this.graph.items[high]
    let i = low-1;

    for(let j = low; j < high; j++){
      await this.increaseAccesses()
      await this.increaseCompares()
      if(this.graph.items[j] <= pivot){
        this.graph.swap(++i, j)
        await this.increaseSwaps()
      }
    }

    this.graph.swap(i + 1, high)
    await this.increaseSwaps()
    return i + 1
  }


  async quickSort(low = 0, high = this.graph.items.length-1){
    if (low < high){
      let pivot = await this.partition(low, high)
      await this.quickSort(low, pivot-1)
      await this.quickSort(pivot+1, high)
    }

    window.result = this.graph.items
  }

  sleep(miliseconds){
    return new Promise(resolve => setTimeout(resolve, miliseconds));
  }

}
