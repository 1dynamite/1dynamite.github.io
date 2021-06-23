import { carouselModule } from "./modules/carousel.js";

let m = document.getElementsByClassName("carousel")[0].getAttribute("m-rl");
let cycle = document.getElementsByClassName("carousel")[0].getAttribute("cycle");
let itemsPerSlide = document.getElementsByClassName("carousel")[0].getAttribute("itemsPerSlide");
carouselModule(+m, +cycle, +itemsPerSlide, 0);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

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
