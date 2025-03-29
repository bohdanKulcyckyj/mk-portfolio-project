const menuBtn = document.querySelector("#menu-btn-container");
const nav = document.querySelector('#top-navigation');
let menuOpen = false;
//Automatically up to date year in footer
document.querySelector("#copyright-year").innerHTML = new Date().getFullYear();
//Smooth Scrolling
const navigateSmooth = (id) => {
    let element = document.querySelector(id);
    if(id === "#landing-section") {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    } else if(id === "#works-section") {
        window.scrollTo({top: element.offsetTop  - 120, left: 0, behavior: 'smooth'});
    } else {
        window.scrollTo({top: element.offsetTop, left: 0, behavior: 'smooth'});
    }
    handleMobileMenu();
}

const handleMobileMenu = () => {
    console.log("hej")
    const nav = document.querySelector('#top-navigation');
    if(window.innerWidth <= 880) {
        if(!menuOpen) {
            nav.classList.add("open");
            nav.classList.remove("close");
            menuBtn.classList.add("open");
            menuOpen = true;
        } else {
            menuOpen = false;
            nav.classList.remove("open");
            nav.classList.add("close");
            menuBtn.classList.remove("open");
        }
        return;
    }
    return;
}

menuBtn.addEventListener("click", handleMobileMenu);
