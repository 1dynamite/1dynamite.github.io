import { sliderFunc } from "./client_scripts/main.js";
import { gapfillFunc } from "./client_scripts/lis.js";
import { tobeChanged } from "./client_scripts/voc.js";
import {readJS} from "./client_scripts/read.js";
import { List } from "./modules/utility.js";
sliderFunc();
/////////////////////////////////////////////////////////////////////////////////////////////////

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


document.getElementById("myForm").addEventListener("submit", () => {
    let myForm = document.getElementById("myForm");
    let formData = new FormData(myForm);
    let o = {
        username: formData.get('uname'), 
        password: formData.get('pwrd'), 
        title: formData.get('user')
    };
    fetch ("hey.html", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(o)
    })
    .then(x => x.json())
    .then(y => { 
        if(y.status == 1){
            let newEl = document.createElement('div');
            newEl.className = "login";
            newEl.innerHTML = y.username;
            document.getElementsByClassName("div3")[0].replaceChild(newEl, document.getElementsByClassName("login")[0]);
            document.getElementsByClassName("login-panel")[0].style.display = "none";
            document.getElementsByClassName("login")[0].addEventListener("click", logoutEvent);
        }
        else{
            document.getElementById("login-message").style.width = "160px";
            document.getElementById("login-message").innerHTML = y.message;
            document.getElementById("login-message").style.display = "block";
        }
    });
});
fetch("logged_in.js")
.then(x => x.json())
.then(y => {
    if(y.loggedin){
        let newEl = document.createElement('div');
        newEl.className = "login";
        newEl.innerHTML = y.username;
        document.getElementsByClassName("div3")[0].replaceChild(newEl, document.getElementsByClassName("login")[0]);
        document.getElementsByClassName("login-panel")[0].style.display = "none";
        document.getElementsByClassName("login")[0].addEventListener("click", logoutEvent);
    }
});

function logitout(){
    fetch("logout.js");
    document.getElementsByClassName("login")[0].innerHTML = "login";
    document.getElementsByClassName("login")[0].removeEventListener("click", logoutEvent);
    document.getElementsByClassName("login")[0].addEventListener("click", dropDown(loginPanel));
    document.getElementsByClassName("log-out")[0].style.display = "none";
    document.getElementById("pwrd").value = "";
    document.getElementById("login-message").innerHTML = "";

    

}

function logoutEvent(){
    let elem = document.getElementsByClassName("log-out")[0];
    if(elem.style.display == "block")
        elem.style.display = "none";
    else 
        elem.style.display = "block";
}
document.getElementsByClassName("log-out")[0].addEventListener("click", logitout);




class CustomDate{
    constructor(stringDate)
    {
        this.date = new Date(stringDate);
    }
    relative(){
        let msecPast = this.date.getTime();
        let msecCurrent = new Date().getTime();
        let timePassed = new Date(msecCurrent - msecPast);
        timePassed.setFullYear(timePassed.getFullYear() - 1970);

        if(timePassed.getUTCFullYear() > 0){
            let years = (1 == timePassed.getUTCFullYear()) ? "a year ago" : timePassed.getUTCFullYear() + " years ago";
            return years;
        }
        else if(timePassed.getUTCMonth() > 0){
            let months = (1 == timePassed.getUTCMonth()) ? "a month ago" : timePassed.getUTCMonth() + " months ago";
            return months;
        }
        else if(timePassed.getUTCDate() > 1){
            let days = (1 == timePassed.getUTCDate()) ? "a day ago" : timePassed.getUTCDate() + " days ago";
            return days;
        }
        else if(timePassed.getUTCHours() > 0){
            let hours = (1 == timePassed.getUTCHours()) ? "an hour ago" : timePassed.getUTCHours() + " hours ago";
            return hours;
        }
        else if(timePassed.getUTCMinutes() > 0){
            let minutes = (1 == timePassed.getUTCMinutes()) ? "a minute ago" : timePassed.getUTCMinutes() + " minutes ago";
            return minutes;
        }
        else {
            
            return "just now";
        }
    }
}
class CommentObjs{
    #path;
    constructor(path){
        this.#path = path;
    }
    async get(){
        let x = await fetch(this.#path)
        let y = await x.json();
        for(let i of y)
            i.date = new CustomDate(i.date);
        return y;
    }
}
class Comment{
    constructor(commentObj){
        let comment = document.createElement('div');
        comment.className = "comment";

        let userIcon = document.createElement('span');
        userIcon.className = "fas fa-user user-icon"

        let username = document.createElement('span');
        username.className = "username";
        username.innerHTML = commentObj.username;

        let date = document.createElement('span');
        date.className = "posted-when";
        date.innerHTML = commentObj.date.relative();

        let commentText = document.createElement('p');
        commentText.className = "comment-text";
        commentText.innerHTML = commentObj.value;

        let div = document.createElement('div');
        div.appendChild(username);
        div.appendChild(date);
        div.appendChild(commentText);

        comment.appendChild(userIcon);
        comment.appendChild(div);


        comment.HTMLdate = date;
        comment.date = commentObj.date;
        //this.date = commentObj.date;
        this.comment = comment;
        //this.HTMLdate = date;
    }
}
class Comments{
    constructor(commentObjs){
        let arr = [];
        for(let i of commentObjs)
            arr.push(new Comment(i).comment);
        this.comments = arr;
    }
}

class CommentsSection{
    #commentSection;
    commentCount;
    constructor(element, path){
        let userIcon = document.createElement('i');
        userIcon.className = "fas fa-user user-icon";
        let textarea = document.createElement('textarea');
        textarea.placeholder = "Add a comment...";
        textarea.className = "textarea";
        textarea.addEventListener("input", (e) => {
            e.target.style.height = "2.1rem";
            e.target.style.height = e.target.scrollHeight + 2 + "px";
        });
        textarea.addEventListener("focus", (e) => {
            this.button.style.color = "rgb(253, 253, 253)";
            this.button.style.backgroundColor = "#4285f4";
        });
        textarea.addEventListener("blur", (e) => {
            this.button.style.color = "rgb(143, 143, 143)";
            this.button.style.backgroundColor = "whitesmoke";
        });
        this.textarea = textarea;
        let textRow = document.createElement('div');
        textRow.className = "text-row";
        textRow.appendChild(userIcon);
        textRow.appendChild(textarea);
        /* let textId = null;
        do{
            textId = Math.random() + "";
        }
        while(document.getElementById(textId));
        textarea.id = textId; */
        

        let button = document.createElement('button');
        button.className = "comment-button";
        button.innerHTML = "Submit";
        button.addEventListener("click", () => {
            this.messageBox.innerHTML = "";
            if(this.textarea.value != "")
                fetch(path, {
                    method: 'POST',
                    headers: {'Content-Type': 'text/plain'},
                    body: this.textarea.value
                })
                .then(x => x.json())
                .then(y => {
                    if(y.status)
                        {
                            let icon = "<i class=\"fas fa-exclamation-circle attention-icon\"></i>"
                            this.messageBox.innerHTML = icon + y.message;
                        }
                    else{
                        let commentObj = y.value[0];
                        commentObj.date = new CustomDate(commentObj.date);
                        let comment = new Comment(commentObj);
                        this.prepend([comment.comment]);
                        this.textarea.value = "";
                    }
                });
        });
        this.button = button;

        let messageBox = document.createElement('div');
        messageBox.className = "message-box";
   
        this.messageBox = messageBox;
        
        let b_m_container = document.createElement('div');
        b_m_container.className = "b-m-container";
        b_m_container.appendChild(messageBox);
        b_m_container.appendChild(button);

        let commentsContainer = document.createElement('div');
        this.commentsContainer = commentsContainer;

        element.appendChild(textRow);
        element.appendChild(b_m_container);
        element.appendChild(commentsContainer);
        
        this.#commentSection = element;
    }
    append(comments){
        for(let i of comments)
            this.commentsContainer.appendChild(i);
    }
    prepend(comments){
        if(comments.length != 0)
        {
            if(this.commentsContainer.children.length != 0){
                for(let i = comments.length - 1; i != -1; i--){
                    this.commentsContainer.insertBefore(comments[i], this.commentsContainer.firstElementChild);
                }
            }
            else {
                this.append(comments);
            }
        }
    }
    getComments(){
        return this.commentsContainer.children;
    }
}

let element = document.getElementsByClassName("comment-section")[0];
let commentSection = new CommentsSection(element, "post_comment.js");
let commentObjs = new CommentObjs("fetch_comments.js");

function getVisibleElements(sortedArray){
    let visibleElements = [];
    let rect = null;
    for(let i of sortedArray){
        rect = i.getBoundingClientRect();
        if(rect.y > 0 && rect.y < window.innerHeight)
            visibleElements.push(i);
        else 
            return visibleElements;
    }
    return [];
}

window.addEventListener("scroll", async () => {
   /*  let visisbleElements = getVisibleElements(commentSection.getComments());
    for(let i of visisbleElements)
        i.HTMLdate.innerHTML = i.date.relative(); */
        
    if (document.documentElement.scrollHeight - window.scrollY === document.documentElement.clientHeight)
    {

        let com = await commentObjs.get();
        //console.log(typeof(com));
        //console.log(com[0].username);
        let comments = new Comments(com).comments;

        commentSection.append(comments);
    }
});

setInterval(() => {
    //let visisbleElements = getVisibleElements();
    for(let i of commentSection.getComments())
        i.HTMLdate.innerHTML = i.date.relative();
}, 60000);


/* (() => {
    let visisbleElements = getVisibleElements(commentSection.getComments());
    for(let i of visisbleElements)
    

}, 1000); */