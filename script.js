// script.js - Smooth scrolling and reveal animations
// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Configuration
  const SCROLL_THRESHOLD = 0.1;

  // Section reveal on scroll using Intersection Observer
  const sections = document.querySelectorAll(".section");
  const observerOptions = {
    threshold: SCROLL_THRESHOLD,
  };

  // Observer callback - adds 'active' class when section comes into view
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all sections
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      // Only prevent default if it's an internal link
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
});
