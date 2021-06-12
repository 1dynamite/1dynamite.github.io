import {List, createDiv} from './utility.js';

export function carouselModule(margin, translateTime) {
  let carouselContainer = document.getElementsByClassName("carousel")[0];
  let carouselItems = document.getElementsByClassName("carousel-item");
  let length = carouselItems.length;
let n = 2 * length ;
let tiles = createDiv(n);


for(let i = 0; i != length; i++) {
  tiles[i].appendChild(carouselItems[0]);
}

for(let i = 0; (n-length) != i; i++)
  { 
    let cln = tiles[i].firstChild.cloneNode("true");
    tiles[length + i].appendChild(cln);
  }


for(let i of tiles) {
    i.className = "tile";
    carouselContainer.appendChild(i);
}



let list = new List(tiles);
let firstNode = list.tail;
let carouselWidth = document.getElementsByClassName("carousel")[0].clientWidth;
let tileWidth = document.getElementsByClassName("tile")[0].clientWidth;
let leftPad = (carouselWidth - length * (tileWidth + margin))/2;
let arr = [];
for(let i = 0; i != n; i++) {
    arr.push(leftPad + i * (tileWidth + margin) - (tileWidth + margin));
}
let newarr = [];
for(let i = 2; i != arr.length; i++){
  newarr.push(arr[i]);
}
newarr.push(arr[0]);
newarr.push(arr[1]);

/* firstNode.value.style.opacity = "0";
firstNode.prev.value.style.opacity = "0";
firstNode.prev.prev.value.style.opacity = "0"; */
let tempref = firstNode.next;
for(let i = 0; i != length; i++) {
  tempref.prev.value.style.opacity = "0";
  tempref = tempref.prev;
}
function translate(A) {
    let tempItem = firstNode;
    let i = 0;
    do {
        tempItem.value.style.transform = 'translate(' + A[i] + 'px, 0)';
        tempItem = tempItem.next;
        i++;
    } while(firstNode != tempItem)
}
translate(arr);
firstNode = firstNode.next;
addHandler();
function translateOnClick_left(){
    removeHandler();
    document.styleSheets[1].cssRules[1].style.transition = "transform " + translateTime + 
      "s, opacity " + 0.5 + "s";
    firstNode.prev.value.style.opacity = "1";
    firstNode.get(length - 1).value.style.opacity = "0";
    translate(newarr);
    firstNode = firstNode.prev;
    setTimeout(addHandler, translateTime * 1000);
}
function translateOnClick_right(){
  removeHandler();
  document.styleSheets[1].cssRules[1].style.transition = "transform " + translateTime + 
    "s, opacity " + 0.5 + "s";
  firstNode.value.style.opacity = "0";
  firstNode.get(length).value.style.opacity = "1";
  translate(arr);
  firstNode = firstNode.next;
  setTimeout(addHandler, translateTime * 1000);
} 

function removeHandler() {
    document.getElementsByClassName("controls-left")[0].removeEventListener("click", translateOnClick_left);
    document.getElementsByClassName("controls-right")[0].removeEventListener("click", translateOnClick_right);
  }
function addHandler() {
    document.getElementsByClassName("controls-left")[0].addEventListener("click", translateOnClick_left);
    document.getElementsByClassName("controls-right")[0].addEventListener("click", translateOnClick_right);
  }

//document.getElementById("demo").innerHTML = document.styleSheets[1].cssRules.length;
}

