/* ==========================================================
    ScamShield AI
    analyzer.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeAnalyzer();

});

/* ==========================================================
INITIALIZE
========================================================== */

function initializeAnalyzer() {

    const analyzeButton =
        document.getElementById("analyzeMessage");

    if (!analyzeButton) return;

    analyzeButton.addEventListener("click", analyzeMessage);

}

/* ==========================================================
MAIN ANALYSIS
========================================================== */

function analyzeMessage() {

    const input =
        document.getElementById("messageInput");

    const text =
        input.value.trim();

    if (text.length === 0) {

        alert("Please paste a suspicious message.");

        return;

    }

    const result =
        performAnalysis(text);

    updateAnalyzerUI(result);

}

/* ==========================================================
SCAM DETECTION ENGINE
========================================================== */

function performAnalysis(text) {

    const content = text.toLowerCase();

    let score = 0;
    const reasons = [];
    const recommendations = [];

    /* ==========================================
       Keyword Groups
    ========================================== */

    const keywordGroups = {

        otp: [
            "otp",
            "one time password",
            "verification code",
            "security code"
        ],

        banking: [
            "bank",
            "sbi",
            "hdfc",
            "icici",
            "axis",
            "account",
            "net banking",
            "debit card",
            "credit card"
        ],

        urgency: [
            "urgent",
            "immediately",
            "within 24 hours",
            "expire",
            "blocked",
            "suspended",
            "last warning",
            "act now"
        ],

        payment: [
            "upi",
            "pay now",
            "payment",
            "wallet",
            "refund",
            "cashback",
            "reward"
        ],

        lottery: [
            "lottery",
            "winner",
            "congratulations",
            "prize",
            "gift",
            "jackpot"
        ],

        investment: [
            "bitcoin",
            "crypto",
            "investment",
            "profit",
            "double money",
            "guaranteed return"
        ],

        kyc: [
            "kyc",
            "update kyc",
            "verify account",
            "reactivate account"
        ]
    };

    /* ==========================================
       Scan Keywords
    ========================================== */

    Object.keys(keywordGroups).forEach(group => {

        keywordGroups[group].forEach(keyword => {

            if (content.includes(keyword)) {

                score += 8;

                reasons.push(
                    `Contains suspicious keyword: "${keyword}"`
                );

            }

        });

    });

    /* ==========================================
       URL Detection
    ========================================== */

    const urlRegex =
        /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;

    const urls = content.match(urlRegex);

    if (urls) {

        score += 20;

        reasons.push(
            "Contains website link."
        );

    }

    /* ==========================================
       Phone Number Detection
    ========================================== */

    const phoneRegex =
        /(\+91[\s-]?)?[6-9]\d{9}/g;

    if (phoneRegex.test(content)) {

        score += 10;

        reasons.push(
            "Contains phone number."
        );

    }

    /* ==========================================
       Email Detection
    ========================================== */

    const emailRegex =
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/ig;

    if (emailRegex.test(content)) {

        score += 10;

        reasons.push(
            "Contains email address."
        );

    }

    /* ==========================================
       Suspicious Domains
    ========================================== */

    const badDomains = [

        ".xyz",
        ".top",
        ".click",
        ".live",
        ".shop",
        ".buzz"

    ];

    badDomains.forEach(domain => {

        if (content.includes(domain)) {

            score += 15;

            reasons.push(
                `Suspicious domain detected (${domain})`
            );

        }

    });

    /* ==========================================
       Uppercase Abuse
    ========================================== */

    const upperCaseWords =
        text.match(/[A-Z]{4,}/g);

    if (upperCaseWords &&
        upperCaseWords.length >= 3) {

        score += 8;

        reasons.push(
            "Excessive capital letters."
        );

    }

    /* ==========================================
       Multiple Exclamation Marks
    ========================================== */

    if ((text.match(/!/g) || []).length >= 3) {

        score += 5;

        reasons.push(
            "Excessive punctuation."
        );

    }

    /* ==========================================
       Urgency Pattern
    ========================================== */

    if (
        content.includes("click here") ||
        content.includes("verify now") ||
        content.includes("login now")
    ) {

        score += 15;

        reasons.push(
            "Attempts to create urgency."
        );

    }

    /* ==========================================
       Clamp Score
    ========================================== */

    if (score > 100)
        score = 100;

    /* ==========================================
       Recommendations
    ========================================== */

    if (score >= 75) {

        recommendations.push(
            "Do NOT click any links."
        );

        recommendations.push(
            "Do NOT share OTP or passwords."
        );

        recommendations.push(
            "Report this message."
        );

    }

    else if (score >= 50) {

        recommendations.push(
            "Verify the sender."
        );

        recommendations.push(
            "Avoid replying."
        );

    }

    else if (score >= 20) {

        recommendations.push(
            "Proceed carefully."
        );

    }

    else {

        recommendations.push(
            "No major scam indicators found."
        );

    }

    return {

        score,

        reasons,

        recommendations,

        level:
            getThreatLevel(score)

    };

}

/* ==========================================================
THREAT LEVEL
========================================================== */

function getThreatLevel(score) {

    if (score >= 75)
        return "High Risk";

    if (score >= 50)
        return "Medium Risk";

    if (score >= 20)
        return "Low Risk";

    return "Safe";

}

/* ==========================================================
UPDATE ANALYZER UI
========================================================== */

function updateAnalyzerUI(result) {

    const riskPercent = document.getElementById("riskPercent");
    const riskStatus = document.getElementById("riskStatus");
    const riskBar = document.getElementById("riskBar");
    const analysisOutput = document.getElementById("analysisOutput");

    // Animate Risk Percentage
    animateRiskNumber(riskPercent, result.score);

    // Update Status
    riskStatus.textContent = result.level;

    // Progress Bar
    riskBar.style.width = result.score + "%";

    // Reset Colors
    riskBar.style.background = "#22c55e";
    riskPercent.style.color = "#22c55e";

    if (result.score >= 75) {

        riskBar.style.background = "#ef4444";
        riskPercent.style.color = "#ef4444";

    } else if (result.score >= 50) {

        riskBar.style.background = "#f97316";
        riskPercent.style.color = "#f97316";

    } else if (result.score >= 20) {

        riskBar.style.background = "#facc15";
        riskPercent.style.color = "#facc15";

    }

    // Clear Previous Results
    analysisOutput.innerHTML = "";

    // Threat Reasons
    result.reasons.forEach(reason => {

        const li = document.createElement("li");
        li.innerHTML = `<strong>⚠</strong> ${reason}`;
        analysisOutput.appendChild(li);

    });

    // Recommendations
    result.recommendations.forEach(recommendation => {

        const li = document.createElement("li");
        li.innerHTML = `<strong>✔</strong> ${recommendation}`;
        analysisOutput.appendChild(li);

    });

}

/* ==========================================================
RISK ANIMATION
========================================================== */

function animateRiskNumber(element, target) {

    let current = 0;

    const timer = setInterval(() => {

        current++;

        if (current >= target) {

            current = target;
            clearInterval(timer);

        }

        element.textContent = current + "%";

    }, 15);

}

/* ==========================================================
OPTIONAL SAMPLE MESSAGE
========================================================== */

// Uncomment this block if you want to preload
// a demo scam message during testing.

/*

window.addEventListener("load", () => {

    document.getElementById("messageInput").value =

`Dear Customer,

Your SBI account has been suspended.

Click here immediately:
https://secure-bank-login.xyz

Verify your OTP within 10 minutes
to avoid account closure.

Thank you.`;

});

*/

/* ==========================================================
END OF analyzer.js
========================================================== */
