/* ==========================================================
    ScamShield AI
    upi.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeUPIChecker();

});

/* ==========================================================
INITIALIZE
========================================================== */

function initializeUPIChecker() {

    const verifyButton = document.getElementById("verifyUPI");

    if (!verifyButton) return;

    verifyButton.addEventListener("click", verifyUPI);

}

/* ==========================================================
MAIN FUNCTION
========================================================== */

function verifyUPI() {

    const input = document.getElementById("upiInput");

    const upiId = input.value.trim().toLowerCase();

    if (upiId === "") {

        alert("Please enter a UPI ID.");

        return;

    }

    const result = analyzeUPI(upiId);

    updateUPIUI(result);

    logScanToHistory(
        "UPI Checker",
        result.status,
        result.score
    );

}

/* ==========================================================
UPI DETECTION ENGINE
========================================================== */

function analyzeUPI(upiId) {

    let score = 0;

    const reasons = [];
    const recommendations = [];

    /* ==========================================
       VALID UPI FORMAT
    ========================================== */

    const upiRegex = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,20}$/;

    if (!upiRegex.test(upiId)) {

        score = 100;

        reasons.push(
            "Invalid UPI ID format."
        );

        recommendations.push(
            "Check the UPI ID before making any payment."
        );

        return {

            score,
            status: "Invalid",
            reasons,
            recommendations

        };

    }

    /* ==========================================
       SUSPICIOUS KEYWORDS
    ========================================== */

    const suspiciousWords = [

        "offer",
        "gift",
        "winner",
        "reward",
        "loan",
        "refund",
        "cashback",
        "support",
        "help",
        "verify",
        "security"

    ];

    suspiciousWords.forEach(word => {

        if (upiId.includes(word)) {

            score += 15;

            reasons.push(
                `Contains suspicious keyword: "${word}".`
            );

        }

    });

    /* ==========================================
       SUSPICIOUS HANDLES
    ========================================== */

    const suspiciousHandles = [

        "@paytmcash",
        "@winner",
        "@gift",
        "@reward",
        "@bonus"

    ];

    suspiciousHandles.forEach(handle => {

        if (upiId.includes(handle)) {

            score += 25;

            reasons.push(
                `Suspicious payment handle detected (${handle}).`
            );

        }

    });

    /* ==========================================
       EXCESSIVE NUMBERS
    ========================================== */

    const numbers = upiId.match(/\d/g);

    if (numbers && numbers.length >= 8) {

        score += 15;

        reasons.push(
            "UPI ID contains many numeric characters."
        );

    }

    /* ==========================================
       VERY LONG USERNAME
    ========================================== */

    const username = upiId.split("@")[0];

    if (username.length > 20) {

        score += 10;

        reasons.push(
            "Username is unusually long."
        );

    }

    /* ==========================================
       RECOMMENDATIONS
    ========================================== */

    if (score >= 75) {

        recommendations.push(
            "Avoid sending money to this UPI ID."
        );

        recommendations.push(
            "Verify the recipient independently."
        );

    }

    else if (score >= 40) {

        recommendations.push(
            "Double-check the recipient name before paying."
        );

    }

    else {

        recommendations.push(
            "No major fraud indicators detected."
        );

    }

    /* ==========================================
       STATUS
    ========================================== */

    let status = "Verified";

    if (score >= 75)
        status = "High Risk";

    else if (score >= 40)
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
UPDATE UPI UI
========================================================== */

function updateUPIUI(result) {

    const status = document.getElementById("upiStatus");
    const list = document.getElementById("upiResult");

    if (!status || !list) return;

    status.textContent = result.status;

    let color = "#22c55e";

    switch (result.status) {

        case "High Risk":
        case "Invalid":
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

    status.style.color = color;

    list.innerHTML = "";

    // Verdict summary
    const verdictLi = document.createElement("li");
    verdictLi.className = "verdict";
    verdictLi.textContent = `Verdict: ${result.status} — risk score ${result.score}/100.`;
    list.appendChild(verdictLi);

    // Reasons
    const reasonsHeader = document.createElement("li");
    reasonsHeader.className = "section-label";
    reasonsHeader.textContent = "Risk Indicators Found";
    list.appendChild(reasonsHeader);

    if (result.reasons.length === 0) {

        const li = document.createElement("li");
        li.innerHTML = `<strong>✔</strong> No suspicious signals found for this UPI ID.`;
        list.appendChild(li);

    } else {

        result.reasons.forEach(reason => {

            const li = document.createElement("li");
            li.innerHTML = `<strong>⚠</strong> ${reason}`;
            list.appendChild(li);

        });

    }

    // Recommendations
    if (result.recommendations.length > 0) {

        const recHeader = document.createElement("li");
        recHeader.className = "section-label";
        recHeader.textContent = "Recommended Actions";
        list.appendChild(recHeader);

        result.recommendations.forEach(item => {

            const li = document.createElement("li");
            li.innerHTML = `<strong>✔</strong> ${item}`;
            list.appendChild(li);

        });

    }

}

/* ==========================================================
END OF upi.js
========================================================== */
