// DOM Elements
const body = document.querySelector("body")
const themeToggle = document.querySelector(".theme-toggle")
const nav = document.querySelector("nav")
const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelector(".nav-links")
const navLinksItems = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll(".section")
const projectsScroll = document.querySelector(".projects-scroll")
const scrollBtnPrev = document.querySelector(".scroll-btn.prev")
const scrollBtnNext = document.querySelector(".scroll-btn.next")
const dots = document.querySelectorAll(".dot")
const contactForm = document.getElementById("contact-form")
const cursor = document.querySelector(".cursor")
const cursorFollower = document.querySelector(".cursor-follower")

// Theme Toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode")
  localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light")
})

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  body.classList.add("dark-mode")
} else if (savedTheme === "light") {
  body.classList.remove("dark-mode")
}

// Navigation
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled")
  } else {
    nav.classList.remove("scrolled")
  }

  // Update active nav link based on scroll position
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinksItems.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active")
    }
  })
})

// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  navLinks.classList.toggle("active")
})

// Close mobile menu when a link is clicked
navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navLinks.classList.remove("active")
  })
})

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    })
  })
})

// Projects Horizontal Scroll
let scrollPosition = 0
const cardWidth = 370 // Card width + gap

scrollBtnPrev.addEventListener("click", () => {
  scrollPosition = Math.max(scrollPosition - cardWidth, 0)
  updateScroll()
})

scrollBtnNext.addEventListener("click", () => {
  scrollPosition = Math.min(scrollPosition + cardWidth, projectsScroll.scrollWidth - projectsScroll.clientWidth)
  updateScroll()
})

function updateScroll() {
  projectsScroll.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  })

  // Update dots
  const scrollPercentage = scrollPosition / (projectsScroll.scrollWidth - projectsScroll.clientWidth)
  const activeDotIndex = Math.min(Math.floor(scrollPercentage * dots.length), dots.length - 1)

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeDotIndex)
  })
}

// Click on dots to scroll
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const scrollWidth = projectsScroll.scrollWidth - projectsScroll.clientWidth
    scrollPosition = (index / (dots.length - 1)) * scrollWidth
    updateScroll()
  })
})

// Contact Form Submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const formObject = Object.fromEntries(formData.entries())

  // Here you would typically send the form data to a server
  console.log("Form submitted:", formObject)

  // Show success message (in a real app, this would happen after successful submission)
  alert("Thank you for your message! I will get back to you soon.")
  contactForm.reset()
})

// Custom Cursor - simplified
document.addEventListener("mousemove", (e) => {
  if (cursor) {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  }

  if (cursorFollower) {
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  }
})

// Cursor effects on interactive elements
const interactiveElements = document.querySelectorAll("a, button, .menu-toggle, .theme-toggle")

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "20px"
    cursor.style.height = "20px"
    cursorFollower.style.width = "40px"
    cursorFollower.style.height = "40px"
  })

  el.addEventListener("mouseleave", () => {
    cursor.style.width = "10px"
    cursor.style.height = "10px"
    cursorFollower.style.width = "30px"
    cursorFollower.style.height = "30px"
  })
})

// Animate elements when they come into view
const observerOptions = {
  threshold: 0.2,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in")
    }
  })
}, observerOptions)

document.querySelectorAll(".section > *").forEach((el) => {
  el.classList.add("animate-element")
  observer.observe(el)
})

// Add animation classes
document.querySelectorAll(".animate-element").forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.1}s`
})

// Snake and Ladders Game Preview (simplified version)
// In a real implementation, this would be a fully functional game
const snakeGamePreview = () => {
  // This is just a placeholder for the Snake and Ladders game functionality
  console.log("Snake and Ladders game preview initialized")

  // The actual game would be implemented here with canvas or DOM manipulation
}

// Initialize any preview functionality
window.addEventListener("load", () => {
  snakeGamePreview()
})
