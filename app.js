/*==================================================
CABADBARAN PULLERS
app.js
Part 1
==================================================*/

"use strict";

/*==================================================
SELECTORS
==================================================*/

const header = document.querySelector("header");
const navLinks = document.querySelectorAll(".nav-links a");
const scrollTopBtn = document.getElementById("scrollTop");
const loadingOverlay = document.getElementById("loadingOverlay");
const sections = document.querySelectorAll("section");

/*==================================================
LOADING SCREEN
==================================================*/

window.addEventListener("load", () => {

    if (!loadingOverlay) return;

    loadingOverlay.style.transition =
        "opacity .7s ease";

    loadingOverlay.style.opacity = "0";

    setTimeout(() => {

        loadingOverlay.style.display = "none";

    },700);

});

/*==================================================
STICKY HEADER
==================================================*/

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

/*==================================================
SCROLL TO TOP BUTTON
==================================================*/

window.addEventListener("scroll",()=>{

    if(!scrollTopBtn) return;

    if(window.scrollY > 500){

        scrollTopBtn.style.opacity="1";
        scrollTopBtn.style.pointerEvents="all";
        scrollTopBtn.style.transform="translateY(0)";

    }else{

        scrollTopBtn.style.opacity="0";
        scrollTopBtn.style.pointerEvents="none";
        scrollTopBtn.style.transform="translateY(20px)";

    }

});

if(scrollTopBtn){

scrollTopBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/*==================================================
SMOOTH NAVIGATION
==================================================*/

navLinks.forEach(link=>{

link.addEventListener("click",(e)=>{

const href=link.getAttribute("href");

if(!href.startsWith("#")) return;

e.preventDefault();

const target=document.querySelector(href);

if(!target) return;

window.scrollTo({

top:target.offsetTop-80,

behavior:"smooth"

});

});

});

/*==================================================
ACTIVE NAVIGATION
==================================================*/

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-180;
const height=section.offsetHeight;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/*==================================================
FADE IN ON SCROLL
==================================================*/

const observer=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade");

}

});

},

{

threshold:.2

}

);

sections.forEach(section=>{

observer.observe(section);

});

/*==================================================
UTILITY
==================================================*/

function sleep(ms){

return new Promise(resolve=>setTimeout(resolve,ms));

}

function random(min,max){

return Math.floor(

Math.random()*(max-min+1)

)+min;

}

console.log(
"%cCabadbaran Pullers Website Loaded",
"color:gold;font-size:18px;font-weight:bold;"
);
