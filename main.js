import { carouselModule } from "./modules/carousel.js";

let m = document.getElementsByClassName("carousel")[0].getAttribute("m-rl");
let cycle = document.getElementsByClassName("carousel")[0].getAttribute("cycle");
let itemsPerSlide = document.getElementsByClassName("carousel")[0].getAttribute("itemsPerSlide");
carouselModule(+m, +cycle, +itemsPerSlide);