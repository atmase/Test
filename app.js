/* ==========================================================
   ScamShield AI
   app.js
   Core Navigation & UI Controller
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();
    initializeTheme();
    initializeButtons();

});

/* ==========================================================
NAVIGATION
========================================================== */

function initializeNavigation() {

    const navButtons = document.querySelectorAll(".nav");
    const pages = document.querySelectorAll(".page");
    const pageTitle = document.getElementById("pageTitle");

    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            const target = button.dataset.page;

            // Active Navigation
            navButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            // Hide all pages
            pages.forEach(page =>
                page.classList.remove("active")
            );

            // Show selected page
            const selectedPage =
                document.getElementById(target);

            if (selectedPage) {

                selectedPage.classList.add("active");

            }

            // Update Title
            pageTitle.textContent =
                button.querySelector("span").innerText;

            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });

}

/* ==========================================================
HOME PAGE BUTTONS
========================================================== */

function initializeButtons() {

    const scanButton =
        document.getElementById("scanNow");

    if (scanButton) {

        scanButton.addEventListener("click", () => {

            navigateTo("analyzer");

        });

    }

    const learnButton =
        document.getElementById("learnMore");

    if (learnButton) {

        learnButton.addEventListener("click", () => {

            navigateTo("education");

        });

    }

}

/* ==========================================================
PAGE NAVIGATION
========================================================== */

function navigateTo(pageName) {

    document
        .querySelectorAll(".nav")
        .forEach(nav => {

            nav.classList.remove("active");

            if (nav.dataset.page === pageName) {

                nav.classList.add("active");

            }

        });

    document
        .querySelectorAll(".page")
        .forEach(page =>
            page.classList.remove("active")
        );

    const page =
        document.getElementById(pageName);

    if (page) {

        page.classList.add("active");

    }

    const pageTitle =
        document.getElementById("pageTitle");

    const activeButton =
        document.querySelector(
            `.nav[data-page="${pageName}"] span`
        );

    if (activeButton) {

        pageTitle.textContent =
            activeButton.innerText;

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

/* ==========================================================
THEME TOGGLE
========================================================== */

function initializeTheme() {

    const buttons =
        document.querySelectorAll(".header-actions button");

    if (buttons.length < 2) return;

    const themeButton = buttons[1];

    let darkMode = true;

    themeButton.addEventListener("click", () => {

        darkMode = !darkMode;

        if (darkMode) {

            document.body.classList.remove("light");

            themeButton.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        } else {

            document.body.classList.add("light");

            themeButton.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        }

    });

}

/* ==========================================================
NOTIFICATION BUTTON
========================================================== */

const notificationButton =
    document.querySelector(".header-actions button");

if (notificationButton) {

    notificationButton.addEventListener("click", () => {

        alert(
            "🛡 ScamShield AI\n\nNo new threats detected.\nYour device is protected."
        );

    });

}

/* ==========================================================
ANIMATE STATISTICS
========================================================== */

function animateCounter(element, target) {

    let count = 0;

    const increment = target / 100;

    const timer = setInterval(() => {

        count += increment;

        if (count >= target) {

            count = target;

            clearInterval(timer);

        }

        element.innerText =
            Math.floor(count).toLocaleString();

    }, 15);

}

window.addEventListener("load", () => {

    const cards =
        document.querySelectorAll(".stats .card h2");

    if (cards.length >= 4) {

        animateCounter(cards[0], 12584);

        animateCounter(cards[1], 53281);

        cards[2].innerText = "99.8%";

        cards[3].innerText = "24/7";

    }

});

/* ==========================================================
FLOATING EFFECT
========================================================== */

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.background =
            `radial-gradient(circle at ${x}px ${y}px,
            rgba(59,130,246,.20),
            rgba(255,255,255,.05))`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background =
            "rgba(255,255,255,.05)";

    });

});

/* ==========================================================
KEYBOARD SHORTCUTS
========================================================== */

document.addEventListener("keydown", e => {

    if (e.key === "1") navigateTo("home");

    if (e.key === "2") navigateTo("analyzer");

    if (e.key === "3") navigateTo("url");

    if (e.key === "4") navigateTo("upi");

    if (e.key === "5") navigateTo("transaction");

    if (e.key === "6") navigateTo("chat");

    if (e.key === "7") navigateTo("dashboard");

    if (e.key === "8") navigateTo("education");

});

/* ==========================================================
END OF FILE
========================================================== */
