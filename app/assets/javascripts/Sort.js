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

  increaseCompares(num = 1){
    this.counts.compare = this.counts.compare + num
    this.graph.setCompares(this.counts.compare)
  }

  increaseSwaps(num = 1){
    this.counts.swap = this.counts.swap + num
    this.graph.setSwaps(this.counts.swap)
  }

  increaseAccesses(num = 1){
    this.counts.access = this.counts.access + num
    this.graph.setAccesses(this.counts.access)
  }

  resetCounts(){
    this.counts = {
      access: 0,
      swap: 0,
      compare: 0
    }
    this.graph.resetStats()
  }

  async insertionSort(){
    let array = this.graph.items;
    for(let i = 1; i < array.length; i++){
      await this.sleep(this.access)
      this.increaseAccesses()
      await this.sleep(this.compare)
      this.increaseCompares()
      if(array[i] < array[i-1]){
        let move = array[i]
        let j = 0;
        while(move >= array[j]){
          await this.sleep(this.access)
          this.increaseAccesses()
          j++;
        }
        this.graph.move(i, j)
        array.splice(i, 1)
        array.splice(j, 0, move)
        await this.sleep(this.swap)
        this.increaseSwaps()
      }
    }
  }

  // swap(i, j){
  //   [this.graph.items[i], this.graph.items[j]] = [this.graph.items[j], this.graph.items[i]]
  // }

  async bubbleSort(){
    let array = this.graph.items;
    let swapped = true;
    while(swapped){
      swapped = false;
      for(let i = 1; i < array.length; i++){
        await this.sleep(this.access)
        this.increaseAccesses()
        await this.sleep(this.compare)
        this.increaseCompares()
        if(array[i] < array[i-1]){
          this.graph.swap(i, i-1)
          await this.sleep(this.swap)
          this.increaseSwaps()
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
      await this.sleep(this.access * subArray.length)
      this.increaseAccesses(subArray.length)
      await this.sleep(this.compare * subArray.length)
      this.increaseCompares(subArray.length)
      let swapIndex = subArray.indexOf(minElement) + i
      if( i !== swapIndex){
        this.graph.swap(i, swapIndex)
        await this.sleep(this.swap)
        this.increaseSwaps()
      }
    }
  }

  async merge(arr1, arr2){
    let result = [];
    await this.sleep(this.access * arr1.length + this.access * arr2.length)
    this.increaseAccesses(arr1.length + arr2.length)
    await this.sleep(this.compare * Math.min(arr1.length, arr2.length))
    this.increaseCompares(Math.min(arr1.length, arr2.length))
    while(arr1.length !== 0 && arr2.length !== 0){
      result.push( arr1[0] < arr2[0] ? arr1.shift() : arr2.shift() )
      await this.sleep(this.swap)
      this.increaseSwaps()
    }
    return (arr2.length === 0 ? result.concat(arr1) : arr1.length === 0 ? result.concat(arr2) : result)
  }

  async mergeSort(arr = this.graph.items, start = 0){
    if(arr.length === 1 || arr.length === 0){
      return arr;
    }
    // arr = await Promise.resolve(arr)
    let half = Math.floor(arr.length/2)
    let firstArray = await this.mergeSort(arr.slice(0, half), start)
    let secondArray = await this.mergeSort(arr.slice(half), start + half)
    arr = await this.merge(firstArray, secondArray)
    this.graph.update(arr, start);
    return arr;
  }


  async quickSort(){

  }

  sleep(miliseconds){
    return new Promise(resolve => setTimeout(resolve, miliseconds));
  }

}
