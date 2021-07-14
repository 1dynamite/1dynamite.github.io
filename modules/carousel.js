import {List, createDiv} from './utility.js';

export function carouselModule(margin, translateTime, slides, crslNum) {
  if(document.getElementsByClassName("zoomed-in")[0])
    document.getElementsByClassName("zoomed-in")[0].remove();
  let str = "box-shadow 0.3s, transform " + 0 + "s, opacity " + 0 + "s";
  document.styleSheets[1].cssRules[1].style.transition = str;

  let carouselContainer = document.getElementsByClassName("carousel")[crslNum];
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

/* document.getElementById("demo").innerHTML = tiles.length; */
/* ---------------------------------------------------------------------------------- */

let temp = document.createElement("div");
temp.className = "zoomed-in";
document.body.appendChild(temp);
let clonedDataItems = createDiv(n);
for(let i = 0; i != n; i++) {
  let cln = tiles[i].firstElementChild.cloneNode("true");
  clonedDataItems[i].appendChild(cln);
}
for(let i of clonedDataItems) {
  i.className = "cloned-data-items";
  i.firstElementChild.firstElementChild.className = "temp";
  temp.appendChild(i);
}

let arrowRight = document.createElement("i");
let arrowLeft = document.createElement("i");
let exitIcon = document.createElement("span");
exitIcon.innerHTML = "&times";
exitIcon.className = "exit-icon";
arrowRight.className = "fa fa-angle-right z-control-right";
arrowLeft.className = "fa fa-angle-left z-control-left";
temp.appendChild(arrowRight);
temp.appendChild(arrowLeft);
temp.appendChild(exitIcon);


let clonedItemsList = new List(clonedDataItems);
let currentItem = clonedItemsList.head;

document.getElementsByClassName("z-control-right")[0].addEventListener("click", displayNextImage);
document.getElementsByClassName("z-control-left")[0].addEventListener("click", displayPrevImage);

function displayNextImage() {
  currentItem.value.style.display = "none";
  currentItem.next.value.style.display = "block";
  currentItem = currentItem.next;
}
function displayPrevImage() {
  currentItem.value.style.display = "none";
  currentItem.prev.value.style.display = "block";
  currentItem = currentItem.prev;
}
let tilesVSzoomedIn = new Map();
for(let i = 0; i != n; i++) {
  tilesVSzoomedIn.set(tiles[i], currentItem);
  currentItem = currentItem.next;
}


carouselContainer.addEventListener("click", function(e) {
  if(e.target.parentElement.className == "carousel-item" || e.target.parentElement.className == "tile"){

    temp.style.display = "flex";
    let tmp = e.target.parentElement.className == "tile" ? e.target.parentElement : e.target.parentElement.parentElement;
    
    currentItem = tilesVSzoomedIn.get(tmp);
    currentItem.value.style.display = "block";
  }
});
exitIcon.addEventListener("click", () => {temp.style.display = "none"; currentItem.value.style.display = "none"});

document.getElementsByClassName("controls-right")[0].addEventListener("mouseover", function (){
  document.getElementById("rightControl").style.boxShadow = "0rem 0.4rem 1.2rem rgb(105, 105, 105)"
});
document.getElementsByClassName("controls-right")[0].addEventListener("mouseout", function (){
  document.getElementById("rightControl").style.boxShadow = "0 0.2rem 0.7rem rgb(131, 130, 130)"
});
document.getElementsByClassName("controls-left")[0].addEventListener("mouseover", function (){
  document.getElementById("leftControl").style.boxShadow = "0rem 0.4rem 1.2rem rgb(105, 105, 105)"
});
document.getElementsByClassName("controls-left")[0].addEventListener("mouseout", function (){
  document.getElementById("leftControl").style.boxShadow = "0 0.2rem 0.7rem rgb(131, 130, 130)"
});

/* ---------------------------------------------------------------------------------- */

let list = new List(tiles);
let firstNode = list.tail;
function calculatePositions(num) {
  let carouselWidth = document.getElementsByClassName("carousel")[0].clientWidth;
  let tileWidth = document.getElementsByClassName("tile")[0].clientWidth;
  let leftPad = (carouselWidth - num * (tileWidth + margin))/2;
  let arr = [];
  for(let i = 0; i != n; i++)
    arr.push(leftPad + i * (tileWidth + margin) - (tileWidth + margin));
  return arr;
}
let arr = calculatePositions(slides);
let newarr = [];
for(let i = 2; i != arr.length; i++){
  newarr.push(arr[i]);
}
newarr.push(arr[0]);
newarr.push(arr[1]);

let tempref = firstNode.next;
for(let i = 0; i != n-slides; i++) {
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
    /* document.styleSheets[1].cssRules[1].style.transition = "transform " + translateTime + 
      "s, opacity " + 0.5 + "s"; */
    firstNode.prev.value.style.opacity = "1";
    firstNode.get(slides - 1).value.style.opacity = "0";
    translate(newarr);
    firstNode = firstNode.prev;
    setTimeout(addHandler, translateTime * 1000);
}
function translateOnClick_right(){
  removeHandler();
  /* document.styleSheets[1].cssRules[1].style.transition = "transform " + translateTime + 
    "s, opacity " + 0.5 + "s"; */
  firstNode.value.style.opacity = "0";
  firstNode.get(slides).value.style.opacity = "1";
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

  let strB = "box-shadow 0.3s, transform " + translateTime + "s, opacity " + 0.5 + "s";
  
setTimeout(() => document.styleSheets[1].cssRules[1].style.transition = strB, 300);


}

