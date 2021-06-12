function getTranslateX(element){
    let b = window.getComputedStyle(element);
    let matrix = new WebKitCSSMatrix(b.transform);
    return matrix.m41;
  }
  
  class ListItem {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
  }
  class List {
    constructor(array) {
        this.length = array.length;
        if(array.length > 0) {
            let firstListItem = new ListItem(array[0]);
            let prevListItem = firstListItem;
            array.splice(0, 1);
  
            for(let i of array)
            {
                let listItem = new ListItem(i);
                prevListItem.next = listItem;
                listItem.prev = prevListItem;
                prevListItem = listItem;
            }
            let lastListItem = prevListItem;
  
  
            this.head = firstListItem;
            this.tail = lastListItem;
  
            this.head.prev = lastListItem;
            this.tail.next = firstListItem;
        } else {
            this.head = null;
            this.tail = null;
        }
    }
    map(func, other) {
        if(this.length != 0) {
            let next = this.head;
            do {
                func(next, other);
                next = next.next;
            } while(next != this.head)
        }
    }
  }
  
  function createDiv(howMany) {
    let array = [];
    let newDiv = null;
    let newContent = null;
    for(let i = 0; howMany != i; i++) {
        newDiv = document.createElement("div");
        newContent = document.createTextNode("" + (i +1));
        newDiv.appendChild(newContent);
        array.push(newDiv);
    }
    return array;
  }
  
  export {createDiv, List};
  //document.styleSheets[0].cssRules[1].style.backgroundColor = "pink";