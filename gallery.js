const worksContainer = document.querySelector(".works-section-container");
const worksPagination = document.querySelector(".works-pagination");
const worksGallery = document.querySelector(".works-gallery");
const galleryPagination = document.querySelector("#gallery-pagination");

const smallMobileBreakpoint = 330;
const mobileBreakpoint = 600;
const tabletBreakpoint = 880;
const worksCount = 27;

let currGalleryImgIndex = 1;
let currPageIndex = 1;

worksGallery.style.display = "none";

let itemsOnPage = setItemsOnPage();
loadWorks(currPageIndex, itemsOnPage);
loadPaginationIndexes();

function setItemsOnPage() {
    let result;
    let windowWidth = window.innerWidth;
    if(windowWidth <= smallMobileBreakpoint) {
        result = 6;
    } else if(windowWidth <= mobileBreakpoint) {
        result = 6;
    } else if (windowWidth <= tabletBreakpoint) {
        result = 9;
    } else {
        result = 12;
    }

    return result;
}

function showGalleryImage(index) {
    worksGallery.style.display = "block";
    document.querySelector("#curr-gallery-img").src = `./assets/works/img${index}.jpg`;
    currGalleryImgIndex = index;
    galleryPagination.innerHTML = currGalleryImgIndex + " / " + worksCount;
}

function loadWorks(pageIndex, maxDisplayed) {
    let tmp = pageIndex - 1;
    const indexStart = tmp * maxDisplayed + 1;
    const indexEnd = (pageIndex * maxDisplayed) > worksCount ? worksCount : (pageIndex * maxDisplayed);
    currPageIndex = pageIndex;

    for(let i = 1; i <= worksCount; i++) {
        const currentImage = document.querySelector(`#img-${i}`)
        if(!currentImage) continue;
        if(i >= indexStart && i <= indexEnd) {
            currentImage.parentElement.style.display = "block";
            currentImage.style.display = "block";
        } else {
            currentImage.parentElement.style.display = "none";
            currentImage.style.display = "none";
        }
    }

    document.querySelectorAll(".pagination-index")?.forEach(_item => {
        if(_item.innerHTML == currPageIndex) {
            _item.classList.add("active");

        } else {
            _item.classList.remove("active");
        }
    });
}

function loadPaginationIndexes() {
    worksPagination.innerHTML = "";
    let tmp = 1;
    worksPagination.innerHTML += `<div id="prev-page" class="pagination-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg></div>`;

    for(let i = 1; i <= Math.ceil(worksCount / itemsOnPage); i++) {
        worksPagination.innerHTML += `<div onclick="loadWorks(${i}, ${itemsOnPage})" class="pagination-item pagination-index${currPageIndex == i ? " active" : ""}">${i}</div>`;
    }

    worksPagination.innerHTML += `<div id="next-page" class="pagination-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
</svg></div>`;

    document.querySelector("#prev-page")?.addEventListener("click", () => {
        if(currPageIndex > 1) {
            currPageIndex--;
            loadWorks(currPageIndex, itemsOnPage);
        }
    });

    document.querySelector("#next-page")?.addEventListener("click", () => {
        if(currPageIndex < Math.ceil(worksCount / itemsOnPage)) {
            currPageIndex++;
            loadWorks(currPageIndex, itemsOnPage);
        }
    });
}

const galleryClose = document.querySelector("#close-gallery")
galleryClose?.addEventListener("click", () => {
    worksGallery.style.display = "none";
});

const galleryPrev = document.querySelector("#prev")
galleryPrev?.addEventListener("click", () => {
    if(currGalleryImgIndex > 1) {
        currGalleryImgIndex--;
    } else {
        currGalleryImgIndex = worksCount;
    }
    showGalleryImage(currGalleryImgIndex);
});

const galleryNext = document.querySelector("#next")
galleryNext?.addEventListener("click", () => {
    if(currGalleryImgIndex < worksCount) {
        currGalleryImgIndex++;
    } else {
        currGalleryImgIndex = 1;
    }
    showGalleryImage(currGalleryImgIndex);
});

window.addEventListener("resize", () => {
    const currItemsOnPage = setItemsOnPage();
    if(currItemsOnPage !== itemsOnPage) {
        itemsOnPage = currItemsOnPage;
        loadWorks(currPageIndex, itemsOnPage);
        loadPaginationIndexes();
    }
})

worksGallery.addEventListener("click", (e) => {
    console.log(e)
    console.log(e.target);
    console.log(e.target.id);

    const allowedSelectors = ["works-gallery-container", "gallery-pagination-container", "gallery-pagination"];
    allowedSelectors.forEach(_selector => {
        if(e.target.classList.contains(_selector) || e.target.id === _selector) {
            worksGallery.style.display = "none";
        }
    });
});