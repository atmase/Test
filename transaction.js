/* ==========================================================
    ScamShield AI
    transaction.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeTransactionChecker();

});

/* ==========================================================
INITIALIZE
========================================================== */

function initializeTransactionChecker() {

    const button =
        document.getElementById("verifyTransaction");

    if (!button) return;

    button.addEventListener("click", verifyTransaction);

}

/* ==========================================================
MAIN FUNCTION
========================================================== */

function verifyTransaction() {

    const input =
        document.getElementById("transactionInput");

    const transactionId =
        input.value.trim().toUpperCase();

    if (transactionId === "") {

        alert("Please enter a Transaction ID.");

        return;

    }

    const result =
        analyzeTransaction(transactionId);

    updateTransactionUI(result);

}

/* ==========================================================
TRANSACTION DETECTION ENGINE
========================================================== */

function analyzeTransaction(transactionId) {

    let score = 0;

    const reasons = [];
    const recommendations = [];

    /* ==========================================
       LENGTH CHECK
    ========================================== */

    if (transactionId.length < 8) {

        score += 30;

        reasons.push(
            "Transaction ID is unusually short."
        );

    }

    if (transactionId.length > 35) {

        score += 15;

        reasons.push(
            "Transaction ID is unusually long."
        );

    }

    /* ==========================================
       VALID FORMAT
    ========================================== */

    const validPattern =
        /^[A-Z0-9]+$/;

    if (!validPattern.test(transactionId)) {

        score += 40;

        reasons.push(
            "Contains invalid characters."
        );

    }

    /* ==========================================
       SAME CHARACTER REPEATED
    ========================================== */

    if (/^(.)\1+$/.test(transactionId)) {

        score += 40;

        reasons.push(
            "Transaction ID contains repeated characters."
        );

    }

    /* ==========================================
       SEQUENTIAL NUMBERS
    ========================================== */

    if (
        transactionId.includes("123456") ||
        transactionId.includes("111111") ||
        transactionId.includes("000000")
    ) {

        score += 25;

        reasons.push(
            "Contains predictable number sequence."
        );

    }

    /* ==========================================
       SUSPICIOUS WORDS
    ========================================== */

    const suspiciousWords = [

        "TEST",
        "FAKE",
        "DEMO",
        "VERIFY",
        "PAYMENT",
        "SUCCESS",
        "FREE"

    ];

    suspiciousWords.forEach(word => {

        if (transactionId.includes(word)) {

            score += 15;

            reasons.push(
                `Contains suspicious text: "${word}".`
            );

        }

    });

    /* ==========================================
       TOO MANY LETTERS
    ========================================== */

    const letters =
        transactionId.match(/[A-Z]/g);

    if (letters && letters.length > 18) {

        score += 10;

        reasons.push(
            "Contains an unusually high number of letters."
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
            "Treat this transaction as suspicious."
        );

        recommendations.push(
            "Verify directly with your bank."
        );

        recommendations.push(
            "Do not trust screenshots alone."
        );

    }

    else if (score >= 40) {

        recommendations.push(
            "Verify this transaction before accepting it."
        );

    }

    else {

        recommendations.push(
            "No obvious fraud indicators detected."
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
UPDATE TRANSACTION UI
========================================================== */

function updateTransactionUI(result) {

    const status =
        document.getElementById("transactionStatus");

    const list =
        document.getElementById("transactionResult");

    if (!status || !list) return;

    status.textContent = result.status;

    let color = "#22c55e";

    if (result.status === "High Risk") {

        color = "#ef4444";

    }

    else if (result.status === "Suspicious") {

        color = "#f97316";

    }

    else if (result.status === "Low Risk") {

        color = "#facc15";

    }

    status.style.color = color;

    list.innerHTML = "";

    result.reasons.forEach(reason => {

        const li = document.createElement("li");

        li.innerHTML =
            `<strong>⚠</strong> ${reason}`;

        list.appendChild(li);

    });

    result.recommendations.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML =
            `<strong>✔</strong> ${item}`;

        list.appendChild(li);

    });

    if (
        result.reasons.length === 0 &&
        result.recommendations.length === 0
    ) {

        list.innerHTML =
            "<li>No issues detected.</li>";

    }

}

/* ==========================================================
END OF transaction.js
========================================================== */
