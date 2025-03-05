const hamburgerButton = document.querySelector("#hamburgerButton");
const closeButton = document.querySelector("#closeButton");
const linksMobile = document.querySelector(".nav-links-mobile")
const mobileMenu = document.querySelector("#mobileMenu");
const hamburger = document.querySelector(".hamburger");
hamburgerButton.addEventListener("click", function () {
    mobileMenu.classList.add("flex");
    hamburger.classList.add("none");
});
closeButton.addEventListener("click", function () {
    mobileMenu.classList.remove("flex");
    hamburger.classList.remove("none");
});
linksMobile.addEventListener("click", function () {
    mobileMenu.classList.remove("flex");
    hamburger.classList.remove("none");
})