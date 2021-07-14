export function gapfillFunc() {
    //let myMap1 = new Map([["gap1", "media"], ["gap2", "traditional"], ["gap3", "labour"], ["gap4", "obvious"], ["gap5", "cultures"], ["gap6", "migration"], ["gap7", "ethnic"], ["gap8", "variety"], ["gap9", "identity"]]);

document.getElementsByClassName("submit-button")[0].onclick = displayResult(0, "0");
document.getElementsByClassName("reset-button")[0].onclick = resetGapFill(0)
}

/* let secondMap = userInputMap(index);
let newMap = seeIfMatch(firstMap, secondMap); */

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
