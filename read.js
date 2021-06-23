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