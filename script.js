// Import Firebase SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8uV3peJ-eYFlKZUcoh9KCl3Ccvz7hbyw",
  authDomain: "portfolio-c8144.firebaseapp.com",
  projectId: "portfolio-c8144",
  storageBucket: "portfolio-c8144.firebasestorage.app",
  messagingSenderId: "487223212225",
  appId: "1:487223212225:web:f96bc7352e1bf013373c40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Form submission logic
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Show "sending..." feedback
    messageBox.textContent = "Sending...";
    messageBox.classList.remove("error");

    try {
      const docRef = await addDoc(collection(db, "contact_messages"), {
        name,
        email,
        message,
        createdAt: serverTimestamp()
      });

      console.log("Message stored with ID:", docRef.id);
      messageBox.textContent = "Message sent successfully!";
      messageBox.classList.remove("error");
      form.reset();
    } catch (error) {
      console.error("analytics error:", error);
      messageBox.textContent = "Error sending message.";
      messageBox.classList.add("error");
    }
  });

  // Scroll animations
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.2
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});