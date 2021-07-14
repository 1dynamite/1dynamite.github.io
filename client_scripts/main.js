import { carouselModule } from "../modules/carousel.js";

 export function sliderFunc(){
    let m = document.getElementsByClassName("carousel")[0].getAttribute("m-rl");
    let cycle = document.getElementsByClassName("carousel")[0].getAttribute("cycle");
    let itemsPerSlide = document.getElementsByClassName("carousel")[0].getAttribute("itemsPerSlide");
    
    carouselModule(+m, +cycle, +itemsPerSlide, 0);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

