// ================= FIREBASE IMPORTS =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= FIREBASE CONFIG (UNCHANGED) =================
const firebaseConfig = {
  apiKey: "AIzaSyCWpp-y0OQ0RfT3ghf5zCnZGWgIzhUbudU",
  authDomain: "dsr-super-admin.firebaseapp.com",
  projectId: "dsr-super-admin",
  appId: "1:494683172524:web:c7d40a4456d574fc187909"
};

// ================= INIT =================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===================================================
// 🔐 LOGIN — FINAL GUARANTEED FIX
// ===================================================
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return; // dashboard page

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorBox = document.getElementById("error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (!emailValue || !passwordValue) {
      errorBox.innerText = "Email aur password dono bharo";
      return;
    }

    errorBox.innerText = "Logging in...";

    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(() => {
        window.location.href = "dashboard.html";
      })
      .catch(err => {
        errorBox.innerText = err.message;
        console.error("LOGIN ERROR:", err);
      });
  });
});

// ===================================================
// 🔒 DASHBOARD PROTECTION
// ===================================================
window.checkAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
    }
  });
};

// ===================================================
// 🚪 LOGOUT
/
