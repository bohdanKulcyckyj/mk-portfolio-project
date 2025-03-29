const worksContainer = document.querySelector(".works-section-container");
const worksPagination = document.querySelector(".works-pagination");
const worksGallery = document.querySelector(".works-gallery");
const galleryPagination = document.querySelector("#gallery-pagination");

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
    
    if(windowWidth <= mobileBreakpoint) {
        result = 4;
    } else if (windowWidth <= tabletBreakpoint) {
        result = 6;
    } else {
        result = 9;
    }

    return result;
}

function showGalleryImage(index) {
    document.querySelector("#curr-gallery-img").src = `./assets/works/img${index}.jpg`;
    currGalleryImgIndex = index;
    galleryPagination.innerHTML = currGalleryImgIndex + " / " + worksCount;
}

function loadWorks(pageIndex, maxDisplayed) {
    let item = "";
    let imgId = "";
    let tmp = pageIndex - 1;
    let indexStart = tmp * maxDisplayed + 1;
    let indexEnd = (pageIndex * maxDisplayed) > worksCount ? worksCount : (pageIndex * maxDisplayed);
    worksContainer.innerHTML = "";
    currPageIndex = pageIndex;

    for(let i = indexStart; i <= indexEnd; i++) {
        item = `<div><img id="img-${i}" src="./assets/works/img${i}.jpg"></div>`;
        worksContainer.innerHTML += item;
    }

    for(let i = indexStart; i <= indexEnd; i++) {
        imgId = `#img-${i}`;
        document.querySelector(imgId)?.addEventListener("click", () => {
            worksGallery.style.display = "block";
            showGalleryImage(i);
        });
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

document.querySelector("#close-gallery")?.addEventListener("click", () => {
    worksGallery.style.display = "none";
});

document.querySelector("#prev")?.addEventListener("click", () => {
    if(currGalleryImgIndex > 1) {
        currGalleryImgIndex--;
    } else {
        currGalleryImgIndex = worksCount;
    }
    showGalleryImage(currGalleryImgIndex);
});

document.querySelector("#next")?.addEventListener("click", () => {
    if(currGalleryImgIndex < worksCount) {
        currGalleryImgIndex++;
    } else {
        currGalleryImgIndex = 1;
    }
    showGalleryImage(currGalleryImgIndex);
});