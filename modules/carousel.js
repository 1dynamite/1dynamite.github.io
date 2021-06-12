import {List, createDiv} from './utility.js';

export function carouselModule(margin, translateTime) {
  let carouselContainer = document.getElementsByClassName("carousel")[0];
let n = 3 + 1;
let tiles = createDiv(n);
for(let i of tiles) {
    i.className = "tile";
    carouselContainer.appendChild(i);
}


let list = new List(tiles);
let firstNode = list.head;
let carouselWidth = document.getElementsByClassName("carousel")[0].offsetWidth;
let tileWidth = document.getElementsByClassName("tile")[0].clientWidth;
let leftPad = (carouselWidth - 3 * (tileWidth + margin))/2;
let arr = [];
for(let i = 0; i != n; i++) {
    arr.push(leftPad + i * (tileWidth + margin));
}

function translate() {
    let tempItem = firstNode;
    let i = 0;
    do {
        tempItem.value.style.transform = 'translate(' + arr[i] + 'px, 0)';
        tempItem = tempItem.next;
        i++;
    } while(firstNode != tempItem)
    firstNode = firstNode.next;
}
translate();
addHandler();
function translateOnClick(){
    removeHandler();
    document.styleSheets[0].cssRules[1].style.transition = "transform " + translateTime + "s";
    translate();
    setTimeout(addHandler, translateTime * 1000);
} 

function removeHandler() {
    document.getElementsByClassName("carousel")[0].removeEventListener("click", translateOnClick);
  }
function addHandler() {
    document.getElementsByClassName("carousel")[0].addEventListener("click", translateOnClick);
  }
/* 
document.getElementById("demo").innerHTML = newList.head.prev.value; */
}

