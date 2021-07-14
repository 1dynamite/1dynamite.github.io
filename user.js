import { sliderFunc } from "./client_scripts/main.js";
import { gapfillFunc } from "./client_scripts/lis.js";
import { tobeChanged } from "./client_scripts/voc.js";
import {readJS} from "./client_scripts/read.js";
import { List } from "./modules/utility.js";
sliderFunc();
/////////////////////////////////////////////////////////////////////////////////////////////////

let topicsPanel = document.getElementsByClassName("list-of-topics")[0];
document.getElementsByClassName("browse")[0].addEventListener("click", dropDown(topicsPanel));



function dropDown(elem) {
    return function() {
        if(elem.style.display == "block")
        elem.style.display = "none";
    else 
        elem.style.display = "block";
    }
}

let introObj = {path: "pages/globalization/intro.html", func: sliderFunc, index: 0};
let lisObj = {path: "pages/globalization/listening.html", func: gapfillFunc, index: 1};
let vocObj = {path: "pages/globalization/vocab.html", func: tobeChanged, index: 2};
let readObj = {path: "pages/globalization/reading.html", func: readJS, index: 3};
let newList = new List([introObj, lisObj, vocObj, readObj]);
let firstElem = newList.head;
let secondElem = firstElem.next;
let thirdElem = secondElem.next;
let fourthElem = thirdElem.next;
let navNext = document.getElementsByClassName("navSkill")[0].lastElementChild;
navNext.addEventListener("click", () => updatePage(secondElem));

let ageing = {header: "Ageing", introPath: "pages/ageing/intro.html", lisPath: "pages/ageing/listening.html",
    vocPath: "pages/ageing/vocab.html", readPath: "pages/ageing/reading.html"};
let architecture = {header: "Architecture", introPath: "pages/architecture/intro.html", 
    lisPath: "pages/architecture/listening.html", vocPath: "pages/architecture/vocab.html", readPath: "pages/architecture/reading.html"};
let art_design = {header: "Art & Design", introPath: "pages/art_design/intro.html", lisPath: "pages/art_design/listening.html",
    vocPath: "pages/art_design/vocab.html", readPath: "pages/art_design/reading.html"};
let education = {header: "Education", introPath: "pages/education/intro.html", lisPath: "pages/education/listening.html",
    vocPath: "pages/education/vocab.html", readPath: "pages/education/reading.html"};
let energy = {header: "Energy", introPath: "pages/energy/intro.html", lisPath: "pages/energy/listening.html",
    vocPath: "pages/energy/vocab.html", readPath: "pages/energy/reading.html"};
let environment = {header: "Environment", introPath: "pages/environment/intro.html", lisPath: "pages/environment/listening.html",
    vocPath: "pages/environment/vocab.html", readPath: "pages/environment/reading.html"};
let manufacturing = {header: "Manufacturing", introPath: "pages/manufacturing/intro.html", lisPath: "pages/manufacturing/listening.html",
    vocPath: "pages/manufacturing/vocab.html", readPath: "pages/manufacturing/reading.html"};
let medicine = {header: "Medicine", introPath: "pages/medicine/intro.html", lisPath: "pages/medicine/listening.html",
    vocPath: "pages/medicine/vocab.html", readPath: "pages/medicine/reading.html"};
let risk = {header: "Risk", introPath: "pages/risk/intro.html", lisPath: "pages/risk/listening.html",
    vocPath: "pages/risk/vocab.html", readPath: "pages/risk/reading.html"};
let globalization = {header: "Globalization", introPath: "pages/globalization/intro.html", lisPath: "pages/globalization/listening.html",
    vocPath: "pages/globalization/vocab.html", readPath: "pages/globalization/reading.html"};

document.getElementsByClassName("topic-item")[0].addEventListener("click", () => getLesson(ageing));
document.getElementsByClassName("topic-item")[1].addEventListener("click", () => getLesson(architecture));
document.getElementsByClassName("topic-item")[2].addEventListener("click", () => getLesson(art_design));
document.getElementsByClassName("topic-item")[3].addEventListener("click", () => getLesson(education));
document.getElementsByClassName("topic-item")[4].addEventListener("click", () => getLesson(energy));
document.getElementsByClassName("topic-item")[5].addEventListener("click", () => getLesson(environment));
document.getElementsByClassName("topic-item")[6].addEventListener("click", () => getLesson(globalization));
document.getElementsByClassName("topic-item")[7].addEventListener("click", () => getLesson(manufacturing));
document.getElementsByClassName("topic-item")[8].addEventListener("click", () => getLesson(medicine));
document.getElementsByClassName("topic-item")[9].addEventListener("click", () => getLesson(risk));

function getLesson(lessonObj) {
    document.getElementsByClassName("header-text")[0].innerHTML = lessonObj.header;
    topicsPanel.style.display = "none";
    document.getElementsByClassName("selectedItem")[0].classList.remove("selectedItem");
    document.getElementsByClassName("inPageBrowsing")[0].children[0].classList.add("selectedItem");
    fetch (lessonObj.introPath)
    .then(x => x.text())
    .then(y => { 
        document.getElementById("dynamic-content-2").innerHTML = y;
        sliderFunc();
        let navNext = document.getElementsByClassName("navSkill")[0].lastElementChild;
        navNext.addEventListener("click", () => updatePage(secondElem));
    });
    introObj = {path: lessonObj.introPath, func: sliderFunc, index: 0};
    lisObj = {path: lessonObj.lisPath, func: gapfillFunc, index: 1};
    vocObj = {path: lessonObj.vocPath, func: tobeChanged, index: 2};
    readObj = {path: lessonObj.readPath, func: readJS, index: 3};
    newList = new List([introObj, lisObj, vocObj, readObj]);
    firstElem = newList.head;
    secondElem = firstElem.next;
    thirdElem = secondElem.next;
    fourthElem = thirdElem.next;
}




let menuList = document.getElementsByClassName("inPageBrowsing")[0].children;
menuList[0].addEventListener("click", () => updatePage(firstElem));
menuList[1].addEventListener("click", () => updatePage(secondElem));
menuList[2].addEventListener("click", () => updatePage(thirdElem));
menuList[3].addEventListener("click", () => updatePage(fourthElem));

function updatePage(listElem) {
    
        document.getElementsByClassName("selectedItem")[0].classList.remove("selectedItem");
        document.getElementsByClassName("inPageBrowsing")[0].children[listElem.value.index].classList.add("selectedItem");

        fetch (listElem.value.path)
        .then(x => x.text())
        .then(y => { 
            document.getElementById("dynamic-content-2").innerHTML = y;
            listElem.value.func();

            if(listElem == firstElem)
            {
                let navNext = document.getElementsByClassName("navSkill")[0].lastElementChild;
                navNext.addEventListener("click", () => updatePage(listElem.next));
            }
            else if(listElem == fourthElem)
            {
                let navPrev = document.getElementsByClassName("navSkill")[0].firstElementChild;
                navPrev.addEventListener("click", () => updatePage(listElem.prev));
            }
            else {
                let navPrev = document.getElementsByClassName("navSkill")[0].firstElementChild;
                navPrev.addEventListener("click", () => updatePage(listElem.prev));
                let navNext = document.getElementsByClassName("navSkill")[0].lastElementChild;
                navNext.addEventListener("click", () => updatePage(listElem.next));
            }
    });
    
}
