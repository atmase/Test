/* ==========================================================
   ScamShield AI
   app.js
   Main Application Controller
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();
    initializeHeaderButtons();
    initializeHomeButtons();
    initializeQuickActions();
    initializeToolButtons();
    initializeCounters();

});

/* ==========================================================
PAGE NAVIGATION
========================================================== */

function navigateTo(pageName) {

    // Navigation Buttons
    document.querySelectorAll(".nav").forEach(nav => {

        nav.classList.remove("active");

        if (nav.dataset.page === pageName) {
            nav.classList.add("active");
        }

    });

    // Pages
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageName);

    if (page) {
        page.classList.add("active");
    }

    // Page Title
    const title = document.getElementById("pageTitle");

    const activeNav = document.querySelector(
        `.nav[data-page="${pageName}"] span`
    );

    if (activeNav) {
        title.textContent = activeNav.textContent;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

/* ==========================================================
SIDEBAR NAVIGATION
========================================================== */

function initializeNavigation() {

    document.querySelectorAll(".nav").forEach(button => {

        button.addEventListener("click", () => {

            navigateTo(button.dataset.page);

        });

    });

}

/* ==========================================================
HEADER BUTTONS
========================================================== */

function initializeHeaderButtons() {

    const notificationBtn = document.getElementById("notificationBtn");
    const themeBtn = document.getElementById("themeBtn");

    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            alert(
`🛡 ScamShield AI

System Status: Protected

• No active threats
• All scans completed
• Your security score is Excellent`
            );

        });

    }

    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("light");

            const icon = themeBtn.querySelector("i");

            if (document.body.classList.contains("light")) {

                icon.className = "fa-solid fa-sun";

            } else {

                icon.className = "fa-solid fa-moon";

            }

        });

    }

}

/* ==========================================================
HOME PAGE BUTTONS
========================================================== */

function initializeHomeButtons() {

    const scanNow = document.getElementById("scanNow");
    const learnMore = document.getElementById("learnMore");

    if (scanNow) {

        scanNow.addEventListener("click", () => {

            navigateTo("analyzer");

        });

    }

    if (learnMore) {

        learnMore.addEventListener("click", () => {

            navigateTo("education");

        });

    }

}

/* ==========================================================
QUICK ACTIONS
========================================================== */

function initializeQuickActions() {

    document.querySelectorAll(".action-card").forEach(btn => {

        const page = btn.dataset.page;

        if (page) {

            btn.addEventListener("click", () => {

                navigateTo(page);

            });

        }

    });

}

/* ==========================================================
SECURITY TOOL BUTTONS
========================================================== */

function initializeToolButtons() {

    document.querySelectorAll(".tool-btn").forEach(btn => {

        const page = btn.dataset.page;

        if (page) {

            btn.addEventListener("click", () => {

                navigateTo(page);

            });

        }

    });

}

/* ==========================================================
ANIMATED COUNTERS
========================================================== */

function animateCounter(element, target) {

    if (!element) return;

    let current = 0;

    const increment = target / 120;

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            current = target;
            clearInterval(timer);

        }

        element.textContent = Math.floor(current).toLocaleString();

    }, 15);

}

function initializeCounters() {

    animateCounter(
        document.getElementById("threatCount"),
        12584
    );

    animateCounter(
        document.getElementById("scanCount"),
        53281
    );

    const accuracy = document.getElementById("accuracyCount");

    if (accuracy) {
        accuracy.textContent = "99.8%";
    }

    const uptime = document.getElementById("uptimeCount");

    if (uptime) {
        uptime.textContent = "24/7";
    }

}

/* ==========================================================
CARD HOVER EFFECT
========================================================== */

document.addEventListener("mousemove", () => {

    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background =
                `radial-gradient(circle at ${x}px ${y}px,
                rgba(59,130,246,.18),
                rgba(255,255,255,.05))`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.background = "";

        });

    });

});

/* ==========================================================
KEYBOARD SHORTCUTS
========================================================== */

document.addEventListener("keydown", e => {

    switch (e.key) {

        case "1":
            navigateTo("home");
            break;

        case "2":
            navigateTo("analyzer");
            break;

        case "3":
            navigateTo("url");
            break;

        case "4":
            navigateTo("upi");
            break;

        case "5":
            navigateTo("transaction");
            break;

        case "6":
            navigateTo("chat");
            break;

        case "7":
            navigateTo("dashboard");
            break;

        case "8":
            navigateTo("education");
            break;

        case "9":
            navigateTo("emergency");
            break;

        case "0":
            navigateTo("settings");
            break;

    }

});

/* ==========================================================
END OF FILE
========================================================== */
