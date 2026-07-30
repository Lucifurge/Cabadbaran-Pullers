/*==================================================
    CABADBARAN PULLERS
    Official Website JavaScript
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initStickyHeader();
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initLoader();
    initRevealAnimation();
    initCounters();
    initFAQ();
    initContactForm();
    initNewsletter();
    initRippleEffect();
    initHeroParallax();
    initActiveNavigation();

});

/*==================================================
    STICKY HEADER
==================================================*/

function initStickyHeader() {

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    });

}

/*==================================================
    MOBILE MENU
==================================================*/

function initMobileMenu() {

    const button = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    if (!button || !nav) return;

    button.addEventListener("click", () => {

        nav.classList.toggle("active");
        button.classList.toggle("active");

    });

    document.querySelectorAll("nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");
            button.classList.remove("active");

        });

    });

}

/*==================================================
    SMOOTH SCROLL
==================================================*/

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e){

            const target = document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        });

    });

}

/*==================================================
    BACK TO TOP
==================================================*/

function initBackToTop(){

    const btn = document.getElementById("backToTop");

    if(!btn) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>600){

            btn.classList.add("show");

        }else{

            btn.classList.remove("show");

        }

    });

    btn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}

/*==================================================
    LOADING SCREEN
==================================================*/

function initLoader(){

    const loader=document.getElementById("loader");

    if(!loader) return;

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            loader.classList.add("hide");

        },800);

    });

}

/*==================================================
    SCROLL REVEAL
==================================================*/

function initRevealAnimation(){

    const items=document.querySelectorAll(
        ".section-header,.leader-card,.committee-card,.membership-card,.shirt-card,.why-card,.feature,.mission-card,.stat-box,.payment-card,.faq-item,.contact-card,.timeline-item,.sponsor-card"
    );

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

            }

        });

    },{

        threshold:.15

    });

    items.forEach(item=>observer.observe(item));

}

/*==================================================
    COUNTER ANIMATION
==================================================*/

function initCounters(){

    const counters=document.querySelectorAll(".stat-box h2,.hero-stats h2");

    counters.forEach(counter=>{

        const value=counter.innerText.replace(/\D/g,'');

        if(value==="") return;

        const target=parseInt(value);

        let current=0;

        const speed=Math.max(15,2000/target);

        const update=()=>{

            current++;

            counter.innerHTML=current+"+";

            if(current<target){

                setTimeout(update,speed);

            }else{

                if(counter.innerHTML.includes("2025")){

                    counter.innerHTML="2025";

                }

            }

        };

        const observer=new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    update();

                    observer.disconnect();

                }

            });

        });

        observer.observe(counter);

    });

}

/*==================================================
    FAQ ACCORDION
==================================================*/

function initFAQ(){

    document.querySelectorAll(".faq-item").forEach(item=>{

        item.addEventListener("click",()=>{

            item.classList.toggle("open");

        });

    });

}

/*==================================================
    CONTACT FORM
==================================================*/

function initContactForm(){

    const form=document.querySelector(".contact-form form");

    if(!form) return;

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        alert("Thank you! Your message has been received.");

        form.reset();

    });

}

/*==================================================
    NEWSLETTER
==================================================*/

function initNewsletter(){

    const form=document.querySelector(".newsletter form");

    if(!form) return;

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        const input=form.querySelector("input");

        if(input.value===""){

            alert("Please enter your email.");

            return;

        }

        alert("Successfully subscribed!");

        input.value="";

    });

}

/*==================================================
    RIPPLE BUTTON EFFECT
==================================================*/

function initRippleEffect(){

    document.querySelectorAll(".btn-primary,.btn-secondary").forEach(button=>{

        button.addEventListener("click",function(e){

            const ripple=document.createElement("span");

            ripple.className="ripple";

            ripple.style.left=e.offsetX+"px";

            ripple.style.top=e.offsetY+"px";

            this.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },600);

        });

    });

}

/*==================================================
    HERO PARALLAX
==================================================*/

function initHeroParallax(){

    const hero=document.querySelector(".hero-image img");

    if(!hero) return;

    window.addEventListener("scroll",()=>{

        hero.style.transform=`translateY(${window.scrollY*.12}px)`;

    });

}

/*==================================================
    ACTIVE NAVIGATION
==================================================*/

function initActiveNavigation(){

    const sections=document.querySelectorAll("section");

    const navLinks=document.querySelectorAll("nav a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-120;

            if(window.scrollY>=top){

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

}
