// gallery

const pictureEl = document.querySelector(".homepage__item--gallery .homepage__item-img");
const sourceEl = pictureEl.querySelector("source");
const imgEl = pictureEl.querySelector("img");

const textEl = document.querySelector(".homepage__item-slide");
const textTitle = textEl.querySelector("h1");
const textDesc = textEl.querySelector("p");

const slides = [
    {
        desktop: "/assets/images/desktop-image-hero-1.jpg",
        mobile: "/assets/images/mobile-image-hero-1.jpg",
        alt: "chairs and a table with a plant",
        title: "Discover innovative ways to decorate",
        description:
            "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
    },
    {
        desktop: "/assets/images/desktop-image-hero-2.jpg",
        mobile: "/assets/images/mobile-image-hero-2.jpg",
        alt: "orange coloured chair",
        title: "We are available all across the globe",
        description:
            "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we're in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
    },
    {
        desktop: "/assets/images/desktop-image-hero-3.jpg",
        mobile: "/assets/images/mobile-image-hero-3.jpg",
        alt: "orange coloured chair",
        title: "Manufactured with the best materials",
        description:
            "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
    },
];

let current = 0;

function updateSlide(index) {
    imgEl.classList.add("is-fading");
    textEl.classList.add("is-fading");

    imgEl.addEventListener(
        "transitionend",
        () => {
            const slide = slides[index];
            sourceEl.srcset = slide.desktop;
            imgEl.src = slide.mobile;
            imgEl.alt = slide.alt;

            textTitle.textContent = slide.title;
            textDesc.textContent = slide.description;

            void imgEl.offsetWidth;
            void textEl.offsetWidth;

            imgEl.classList.remove("is-fading");
            textEl.classList.remove("is-fading");
        },
        { once: true }
    );
}

const leftArrowBtn = document.querySelector(".homepage__item-nav-arrow-btn--left");
const rightArrowBtn = document.querySelector(".homepage__item-nav-arrow-btn--right");

leftArrowBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlide(current);
});

rightArrowBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    updateSlide(current);
});

updateSlide(current);

// nav

const body = document.querySelector("body");
const main = document.querySelector("main");
const btnOpen = document.getElementById("nav-button-open");
const btnClose = document.getElementById("nav-button-close");
const navContent = document.querySelector(".nav__content");
const navOverlay = document.querySelector(".nav__overlay");
const media = window.matchMedia("( width < 69.375em )");

function openMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "true");
    body.classList.add("no-scroll");
    navContent.removeAttribute("inert");
    main.setAttribute("inert", "");
    btnClose.focus();
}

function closeMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "false");
    body.classList.remove("no-scroll");
    navContent.setAttribute("inert", "");
    main.removeAttribute("inert");
    btnOpen.focus();
}

function handleOutsideMenuClick(e) {
    const isMenuOpen = navContent.style.display === "flex";
    const isClickInsideMenu = navContent.contains(e.target);
    const isClickOnOpenBtn = e.target.closest("#nav-button-open");

    if (isMenuOpen && !isClickInsideMenu && !isClickOnOpenBtn) {
        closeMobileMenu();
    }
}

function setupNav(e) {
    if (e.matches) {
        navContent.setAttribute("inert", "");
        setTimeout(() => {
            navContent.style.display = "flex";
            navOverlay.style.display = "block";
        }, 500);
    } else {
        navContent.removeAttribute("inert");
        navContent.style.display = "";
        main.removeAttribute("inert");
    }
}
setupNav(media);
media.addEventListener("change", setupNav);

btnOpen.addEventListener("click", openMobileMenu);

btnClose.addEventListener("click", closeMobileMenu);

document.addEventListener("click", handleOutsideMenuClick);
