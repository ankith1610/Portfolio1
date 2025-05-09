// DOM Elements
const navLinksItems = document.querySelectorAll(".nav-link");
const contactForm = document.querySelector("#contact-form");

// Smooth scrolling
navLinksItems.forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
        });
    });
});

// Contact Form Submission
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData.entries());
    console.log("Form submitted:", formObject);
    alert("Thank you for your message!");
    contactForm.reset();
});