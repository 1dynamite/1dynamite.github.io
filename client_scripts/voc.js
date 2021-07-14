export function tobeChanged(){
    let vocabs = document.getElementsByClassName("vocabulary-items")[0];
vocabs.addEventListener("click", openDefinitionsPanel);
//let h = document.getElementsByClassName("word-definitions")[0].offsetHeight;
document.getElementsByClassName("word-definitions")[0].style.height = "0%";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* let myMap1 = new Map([["gap1", "labour"], ["gap2", "ethnic groups"], ["gap3", "international cuisine"]]);
let myMap2 = new Map([["gap1", "multinational"], ["gap2", "outlets"], ["gap3", "obesity"], ["gap4", "monopoly"], ["gap5", "poverty"], ["gap6", "diet"], ["gap7", "farms"], ["gap8", "supermarkets"], ["gap9", "consumption"]]); */

document.getElementsByClassName("submit-button")[0].onclick = displayResult(0, "1");
document.getElementsByClassName("reset-button")[0].onclick = resetGapFill(0);

document.getElementsByClassName("submit-button")[1].onclick = displayResult(1, "2");
document.getElementsByClassName("reset-button")[1].onclick = resetGapFill(1);

}


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
function displayResult(index, inid){
    return function(){
        let newMap = new Map();
        let userInput = userInputMap(index);
        let arr = [];
        for(let [key, value] of userInput) {
            arr.push({key: key, value: value});
        }
        let sendObj = {id: inid, value: arr};

        fetch ("server_scripts/gapfill.js", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sendObj)
        })
        .then(x => x.json())
        .then(y => { 
            for(let i of y)
                newMap.set(i.key, i.value);
            let correctAnswers = 0;
            for (let [key, value] of newMap){
                if(value)
                {
                    document.getElementsByClassName("gapFill")[index].querySelector(`input[name=${key}]`).style.outline = "3px solid green";
                    correctAnswers++;
                }
                else   
                    document.getElementsByClassName("gapFill")[index].querySelector(`input[name=${key}]`).style.outline = "3px solid red";
            }
            document.getElementsByClassName("reset-button")[index].style.display = "inline";
            document.getElementsByClassName("moreInfo")[index].innerHTML = correctAnswers + "/" + newMap.size + " correct answers";
        });
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