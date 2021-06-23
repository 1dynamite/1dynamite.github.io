let vocabs = document.getElementsByClassName("vocabulary-items")[0];
vocabs.addEventListener("click", openDefinitionsPanel);
//let h = document.getElementsByClassName("word-definitions")[0].offsetHeight;
document.getElementsByClassName("word-definitions")[0].style.height = "0%";
function openDefinitionsPanel(e) {
    let def = document.getElementsByClassName("word-definitions")[0];
    if(def.style.height == "0%") 
    {
        setTimeout(function (){def.style.overflow = "auto"}, 300);
        def.style.height = "300%";;
        def.style.padding = "1em";
        //vocabs.style.marginBottom = h + "px";
    }
    else if(e.target.className != "word-definitions" && e.target.parentElement.nodeName != "DL") {
        def.style.overflow = "hidden";
        def.style.height = "0%";
        def.style.padding = "0%";
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* let myMap1 = new Map([["gap1", "labour"], ["gap2", "ethnic groups"], ["gap3", "international cuisine"]]);
let myMap2 = new Map([["gap1", "labour"], ["gap2", "ethnic groups"], ["gap3", "internationalcuisine"]]);
let newMap = seeIfMatch(myMap1, myMap2);
document.getElementById("demo").innerHTML = newMap.get("gap3"); */

//document.getElementById("demo").innerHTML = document.getElementById("vg1Gap1").value;
let myMap1 = new Map([["gap1", "labour"], ["gap2", "ethnic groups"], ["gap3", "international cuisine"]]);
let myMap2 = new Map([["gap1", "multinational"], ["gap2", "outlets"], ["gap3", "obesity"], ["gap4", "monopoly"], ["gap5", "poverty"], ["gap6", "diet"], ["gap7", "farms"], ["gap8", "supermarkets"], ["gap9", "consumption"]]);
function displayResult(firstMap, index){
        return function(){
            let secondMap = userInputMap(index);
            let newMap = seeIfMatch(firstMap, secondMap);
            let correctAnswers = 0;
            for (let [key, value] of newMap){
                if(value) {
                    document.getElementsByClassName("gapFill")[index].querySelector(`input[name=${key}]`).style.outline = "3px solid green";
                    correctAnswers++;
                }
                else   
                    document.getElementsByClassName("gapFill")[index].querySelector(`input[name=${key}]`).style.outline = "3px solid red";
            }
            document.getElementsByClassName("reset-button")[index].style.display = "inline";
            document.getElementsByClassName("moreInfo")[index].innerHTML = correctAnswers + "/" + newMap.size + " correct answers";
        }
}
function userInputMap(index){
    let newArray = document.getElementsByClassName("gapFill")[index].getElementsByTagName("input");
    let newMap = new Map();
    for(let i of newArray) {
        newMap.set(i.name, i.value);
    }
    return newMap;
}


document.getElementsByClassName("submit-button")[0].onclick = displayResult(myMap1, 0);
document.getElementsByClassName("reset-button")[0].onclick = resetGapFill(0);


document.getElementsByClassName("submit-button")[1].onclick = displayResult(myMap2, 1);
document.getElementsByClassName("reset-button")[1].onclick = resetGapFill(1);




function resetGapFill(index){
    return function(){
        let ar = document.getElementsByClassName("gapFill")[index].querySelectorAll("input");
        for(let i of ar)
        {
            i.style.outline = "none";
            i.value = "";
        }
        document.getElementsByClassName("reset-button")[index].style.display = "none";
        document.getElementsByClassName("moreInfo")[index].innerHTML = "";
    }
}

function seeIfMatch(firstMap, secondMap) {
    let newMap = new Map();
    
    for (let [key, value] of firstMap) {
        if(secondMap.get(key) != value)
            newMap.set(key, false);
        else 
            newMap.set(key, true);
      }
      return newMap;
}

let topicsPanel = document.getElementsByClassName("list-of-topics")[0];
document.getElementsByClassName("browse")[0].addEventListener("click", dropDown(topicsPanel));

let loginPanel = document.getElementsByClassName("login-panel")[0];
document.getElementsByClassName("login")[0].addEventListener("click", dropDown(loginPanel));

function dropDown(elem) {
    return function() {
        if(elem.style.display == "block")
        elem.style.display = "none";
    else 
        elem.style.display = "block";
    }
}