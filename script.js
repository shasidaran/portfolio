// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6UREfCNw0Vc2rrMnWG4O0srzkZ_2UL6Y",
  authDomain: "portfolio2-6b4e4.firebaseapp.com",
  projectId: "portfolio2-6b4e4",
  storageBucket: "portfolio2-6b4e4.firebasestorage.app",
  messagingSenderId: "355283880301",
  appId: "1:355283880301:web:b8938247c161c6a215b264"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Correct capitalization

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
    messageBox.classList.remove("error", "success");

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
      messageBox.classList.add("success");
      form.reset();
    } catch (err) {
      console.error(err);
      messageBox.textContent = "Error sending message.";
      messageBox.classList.remove("success");
      messageBox.classList.add("error");
    }
  });

  // Scroll animations
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.2
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible"); // ✅ Matches CSS .section.visible
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});