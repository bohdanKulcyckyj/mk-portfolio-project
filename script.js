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
    const nav = document.querySelector('#top-navigation');
    if(window.innerWidth <= 880) {
        if(!menuOpen) {
            menuBtn.classList.add("open");
            nav.style.top = '0';
            nav.style.right = '0';
            menuOpen = true;
        } else {
            nav.style.top = '-1000%';
            menuOpen = false;
            menuBtn.classList.remove("open");
        }
        return;
    }
    return;
}


document.querySelector("#logo").addEventListener("click", () => {
    //location.reload();
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    handleMobileMenu();
});

menuBtn.addEventListener("click", handleMobileMenu);