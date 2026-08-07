/* ==========================================================
    ScamShield AI
    urlChecker.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeURLScanner();

});

/* ==========================================================
INITIALIZE
========================================================== */

function initializeURLScanner() {

    const button =
        document.getElementById("scanURL");

    if (!button) return;

    button.addEventListener("click", scanURL);

}

/* ==========================================================
MAIN FUNCTION
========================================================== */

function scanURL() {

    const input =
        document.getElementById("urlInput");

    const url =
        input.value.trim();

    if (url === "") {

        alert("Please enter a URL.");

        return;

    }

    const result =
        analyzeURL(url);

    updateURLUI(result);

}

/* ==========================================================
URL DETECTION ENGINE
========================================================== */

function analyzeURL(url) {

    let score = 0;

    const reasons = [];
    const recommendations = [];

    const value = url.trim().toLowerCase();

    /* ==========================================
       URL VALIDATION
    ========================================== */

    try {

        new URL(value);

    } catch (error) {

        return {

            score: 100,

            status: "Invalid URL",

            reasons: [
                "The URL format is invalid."
            ],

            recommendations: [
                "Enter a valid URL including https://"
            ]

        };

    }

    /* ==========================================
       HTTPS CHECK
    ========================================== */

    if (!value.startsWith("https://")) {

        score += 15;

        reasons.push(
            "Website is not using HTTPS."
        );

    }

    /* ==========================================
       IP ADDRESS DETECTION
    ========================================== */

    const ipRegex =
        /https?:\/\/(\d{1,3}\.){3}\d{1,3}/;

    if (ipRegex.test(value)) {

        score += 25;

        reasons.push(
            "Website uses an IP address instead of a domain."
        );

    }

    /* ==========================================
       URL SHORTENERS
    ========================================== */

    const shorteners = [

        "bit.ly",
        "tinyurl",
        "t.co",
        "goo.gl",
        "is.gd",
        "cutt.ly",
        "rb.gy",
        "ow.ly"

    ];

    shorteners.forEach(site => {

        if (value.includes(site)) {

            score += 20;

            reasons.push(
                `Shortened URL detected (${site}).`
            );

        }

    });

    /* ==========================================
       SUSPICIOUS DOMAINS
    ========================================== */

    const suspiciousDomains = [

        ".xyz",
        ".top",
        ".click",
        ".live",
        ".buzz",
        ".shop",
        ".gq",
        ".tk",
        ".cf",
        ".ml"

    ];

    suspiciousDomains.forEach(domain => {

        if (value.includes(domain)) {

            score += 20;

            reasons.push(
                `Suspicious domain detected (${domain}).`
            );

        }

    });

    /* ==========================================
       PHISHING KEYWORDS
    ========================================== */

    const phishingWords = [

        "login",
        "signin",
        "verify",
        "verification",
        "secure",
        "account",
        "bank",
        "payment",
        "wallet",
        "update",
        "kyc",
        "otp",
        "password",
        "confirm"

    ];

    phishingWords.forEach(word => {

        if (value.includes(word)) {

            score += 6;

            reasons.push(
                `Contains phishing keyword: "${word}".`
            );

        }

    });

    /* ==========================================
       @ SYMBOL
    ========================================== */

    if (value.includes("@")) {

        score += 15;

        reasons.push(
            "Contains '@' symbol which may hide the true destination."
        );

    }

    /* ==========================================
       EXCESSIVE SUBDOMAINS
    ========================================== */

    const hostname =
        new URL(value).hostname;

    const dots =
        hostname.split(".").length;

    if (dots >= 4) {

        score += 15;

        reasons.push(
            "Contains multiple subdomains."
        );

    }

    /* ==========================================
       LONG URL
    ========================================== */

    if (value.length > 120) {

        score += 10;

        reasons.push(
            "Very long URLs may hide malicious content."
        );

    }

    /* ==========================================
       URL ENCODING
    ========================================== */

    if (
        value.includes("%20") ||
        value.includes("%2f") ||
        value.includes("%3a")
    ) {

        score += 10;

        reasons.push(
            "Contains encoded characters."
        );

    }

    /* ==========================================
       DOUBLE SLASH
    ========================================== */

    const afterProtocol =
        value.replace("https://", "")
             .replace("http://", "");

    if (afterProtocol.includes("//")) {

        score += 10;

        reasons.push(
            "Contains multiple forward slashes."
        );

    }

    /* ==========================================
       LIMIT SCORE
    ========================================== */

    if (score > 100)
        score = 100;

    /* ==========================================
       RECOMMENDATIONS
    ========================================== */

    if (score >= 75) {

        recommendations.push(
            "Do NOT visit this website."
        );

        recommendations.push(
            "Do NOT enter passwords or OTPs."
        );

        recommendations.push(
            "Report the website if possible."
        );

    }

    else if (score >= 50) {

        recommendations.push(
            "Proceed with extreme caution."
        );

        recommendations.push(
            "Verify the website independently."
        );

    }

    else if (score >= 20) {

        recommendations.push(
            "Check the domain carefully before continuing."
        );

    }

    else {

        recommendations.push(
            "No major phishing indicators detected."
        );

    }

    /* ==========================================
       STATUS
    ========================================== */

    let status = "Safe";

    if (score >= 75)
        status = "Danger";

    else if (score >= 50)
        status = "Suspicious";

    else if (score >= 20)
        status = "Low Risk";

    return {

        score,
        status,
        reasons,
        recommendations

    };

}

/* ==========================================================
UPDATE URL SCANNER UI
========================================================== */

function updateURLUI(result) {

    const riskTitle = document.getElementById("urlRisk");
    const riskScore = document.getElementById("urlScore");
    const riskBar = document.getElementById("urlBar");
    const resultList = document.getElementById("urlResult");

    if (!riskTitle || !riskScore || !riskBar || !resultList)
        return;

    // Animate score
    animateURLScore(riskScore, result.score);

    // Status
    riskTitle.textContent = result.status;

    // Progress Bar
    riskBar.style.width = result.score + "%";

    // Default Colors (Safe)
    let color = "#22c55e";

    switch (result.status) {

        case "Danger":
            color = "#ef4444";
            break;

        case "Suspicious":
            color = "#f97316";
            break;

        case "Low Risk":
            color = "#facc15";
            break;

        default:
            color = "#22c55e";

    }

    riskTitle.style.color = color;
    riskScore.style.color = color;
    riskBar.style.background = color;

    // Clear previous results
    resultList.innerHTML = "";

    // Reasons
    result.reasons.forEach(reason => {

        const li = document.createElement("li");

        li.innerHTML =
            `<span style="color:#ef4444;">⚠</span> ${reason}`;

        resultList.appendChild(li);

    });

    // Recommendations
    result.recommendations.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML =
            `<span style="color:#22c55e;">✔</span> ${item}`;

        resultList.appendChild(li);

    });

    if (
        result.reasons.length === 0 &&
        result.recommendations.length === 0
    ) {

        resultList.innerHTML =
            "<li>No issues detected.</li>";

    }

}

/* ==========================================================
ANIMATE SCORE
========================================================== */

function animateURLScore(element, target) {

    let current = 0;

    const timer = setInterval(() => {

        current++;

        if (current >= target) {

            current = target;

            clearInterval(timer);

        }

        element.textContent =
            current + "% Risk";

    }, 15);

}

/* ==========================================================
RESET SCANNER
========================================================== */

function resetURLScanner() {

    document.getElementById("urlInput").value = "";

    document.getElementById("urlRisk").textContent =
        "SAFE";

    document.getElementById("urlRisk").style.color =
        "#22c55e";

    document.getElementById("urlScore").textContent =
        "Awaiting Scan";

    document.getElementById("urlScore").style.color =
        "#22c55e";

    document.getElementById("urlBar").style.width =
        "0%";

    document.getElementById("urlBar").style.background =
        "#22c55e";

    document.getElementById("urlResult").innerHTML =
        "<li>Enter a website URL to begin analysis.</li>";

}

/* ==========================================================
OPTIONAL SAMPLE URL
========================================================== */

/*

window.addEventListener("load", () => {

    document.getElementById("urlInput").value =
    "https://secure-bank-login.xyz/verify-account";

});

*/

/* ==========================================================
END OF urlChecker.js
========================================================== */
