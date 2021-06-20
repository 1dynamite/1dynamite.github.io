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