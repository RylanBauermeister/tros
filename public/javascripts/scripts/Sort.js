class Sort{
  constructor(settings){
    this.graph = settings.graph
    this.access = settings.access
    this.swap = settings.swap
    this.compare = settings.compare
  }

  async insertionSort(){
    let array = this.graph.items;
    for(let i = 1; i < array.length; i++){
      await this.sleep(this.access)
      if(array[i] < array[i-1]){
        let move = array[i]
        let j = 0;
        while(move >= array[j]){
          await this.sleep(this.access)
          j++;
        }
        this.graph.move(i, j)
        array.splice(i, 1)
        array.splice(j, 0, move)
        await this.sleep(this.swap)
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
        if(array[i] < array[i-1]){
          this.graph.swap(i, i-1)
          await this.sleep(this.swap)
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
      let swapIndex = subArray.indexOf(minElement) + i
      if( i !== swapIndex){
        this.graph.swap(i, swapIndex)
        await this.sleep(this.swap)
      }
    }
  }

  async mergeSort(){

  }

  async quickSort(){
    
  }

  sleep(miliseconds){
    return new Promise(resolve => setTimeout(resolve, miliseconds));
  }

}
