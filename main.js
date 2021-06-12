import { carouselModule } from "./modules/carousel.js";

let m = document.getElementsByClassName("carousel")[0].getAttribute("m-rl");
let cycle = document.getElementsByClassName("carousel")[0].getAttribute("cycle");
carouselModule(+m, +cycle);