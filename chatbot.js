/* ==========================================================
    ScamShield AI
    chatbot.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeChatbot();

});

/* ==========================================================
INITIALIZE
========================================================== */

function initializeChatbot() {

    const sendButton =
        document.getElementById("sendChat");

    const input =
        document.getElementById("chatInput");

    if (!sendButton || !input) return;

    sendButton.addEventListener("click", sendMessage);

    input.addEventListener("keypress", e => {

        if (e.key === "Enter") {

            sendMessage();

        }

    });

}

/* ==========================================================
SEND MESSAGE
========================================================== */

function sendMessage() {

    const input =
        document.getElementById("chatInput");

    const text =
        input.value.trim();

    if (text === "") return;

    addUserMessage(text);

    input.value = "";

    setTimeout(() => {

        const reply =
            generateResponse(text);

        addBotMessage(reply);

    }, 600);

}

/* ==========================================================
ADD USER MESSAGE
========================================================== */

function addUserMessage(message) {

    const container =
        document.getElementById("chatMessages");

    const div =
        document.createElement("div");

    div.className = "user-message";

    div.textContent = message;

    container.appendChild(div);

    scrollChat();

}

/* ==========================================================
ADD BOT MESSAGE
========================================================== */

function addBotMessage(message) {

    const container =
        document.getElementById("chatMessages");

    const div =
        document.createElement("div");

    div.className = "bot-message";

    div.innerHTML = message;

    container.appendChild(div);

    scrollChat();

}

/* ==========================================================
AUTO SCROLL
========================================================== */

function scrollChat() {

    const container =
        document.getElementById("chatMessages");

    container.scrollTop =
        container.scrollHeight;

}

/* ==========================================================
AI KNOWLEDGE BASE
========================================================== */

const knowledgeBase = [

    {
        keywords: ["phishing", "phishing email", "fake email"],
        answer: `
<b>🎣 Phishing Attack</b><br><br>

Phishing is a cyber attack where criminals impersonate trusted organizations to steal:

• Passwords
• OTPs
• Banking details
• Credit card information

<b>Stay Safe:</b>

✔ Verify the sender's email address<br>
✔ Don't click suspicious links<br>
✔ Never share your OTP<br>
✔ Contact the organization directly
`
    },

    {
        keywords: ["otp", "one time password"],
        answer: `
<b>🔐 OTP Safety</b><br><br>

An OTP should NEVER be shared.

Banks, UPI providers and government agencies NEVER ask for your OTP.

If someone asks for your OTP, it is almost certainly a scam.
`
    },

    {
        keywords: ["upi", "upi fraud", "payment"],
        answer: `
<b>💳 UPI Safety</b><br><br>

Before sending money:

✔ Verify the receiver's name
✔ Double-check the UPI ID
✔ Never enter your UPI PIN to receive money
✔ Avoid unknown QR codes
`
    },

    {
        keywords: ["qr", "qr code"],
        answer: `
<b>📷 QR Code Scam</b><br><br>

Scammers often send QR codes claiming you'll receive money.

Reality:

Scanning a QR code usually starts a PAYMENT.

Always verify before scanning.
`
    },

    {
        keywords: ["password", "strong password"],
        answer: `
<b>🔑 Password Tips</b><br><br>

Use:

• 12+ characters
• Uppercase
• Lowercase
• Numbers
• Symbols

Never reuse passwords across websites.
`
    },

    {
        keywords: ["bank", "banking"],
        answer: `
<b>🏦 Banking Security</b><br><br>

Banks never ask for:

• OTP
• PIN
• CVV
• Internet banking password

Never share these with anyone.
`
    },

    {
        keywords: ["crypto", "bitcoin"],
        answer: `
<b>🪙 Crypto Scam Warning</b><br><br>

Be cautious of:

• Guaranteed returns
• Double your money offers
• Fake investment groups
• Celebrity endorsements

If it sounds too good to be true, it probably is.
`
    },

    {
        keywords: ["job", "job scam"],
        answer: `
<b>💼 Job Scam</b><br><br>

Warning signs:

• Asking for registration fees
• Asking you to pay before joining
• Unrealistic salaries
• No interview process
`
    },

    {
        keywords: ["investment"],
        answer: `
<b>📈 Investment Scam</b><br><br>

Always verify:

✔ SEBI registration
✔ Company website
✔ Reviews
✔ Official contact details

Avoid "Guaranteed Profit" schemes.
`
    },

    {
        keywords: ["hello", "hi", "hey"],
        answer: `
👋 Hello!

I'm ScamShield AI.

I can help you with:

• Phishing
• UPI Fraud
• Banking Security
• Passwords
• QR Code Scams
• Online Safety
• Cybercrime Guidance
`
    }

];

/* ==========================================================
AI RESPONSE ENGINE
========================================================== */

function generateResponse(question) {

    const query = question.toLowerCase();

    for (const topic of knowledgeBase) {

        for (const keyword of topic.keywords) {

            if (query.includes(keyword)) {

                return topic.answer;

            }

        }

    }

    return `
<b>🤖 ScamShield AI</b><br><br>

I couldn't find an exact answer.

You can ask me about:

• Phishing
• OTP scams
• UPI fraud
• QR code scams
• Password safety
• Banking security
• Crypto scams
• Job scams
• Investment fraud
• Online safety

I'll do my best to help.
`;

}

/* ==========================================================
CHATBOT ENHANCEMENTS
========================================================== */

function showTypingIndicator() {

    const container =
        document.getElementById("chatMessages");

    const typing =
        document.createElement("div");

    typing.className = "bot-message";

    typing.id = "typingIndicator";

    typing.innerHTML =
        "🤖 <i>ScamShield AI is typing...</i>";

    container.appendChild(typing);

    scrollChat();

}

function removeTypingIndicator() {

    const typing =
        document.getElementById("typingIndicator");

    if (typing) {

        typing.remove();

    }

}

/* ==========================================================
CURRENT TIME
========================================================== */

function getCurrentTime() {

    return new Date().toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

}

/* ==========================================================
OVERRIDE BOT MESSAGE
========================================================== */

function addBotMessage(message) {

    const container =
        document.getElementById("chatMessages");

    const div =
        document.createElement("div");

    div.className = "bot-message";

    div.innerHTML = `

        <div class="chat-content">

            ${message}

        </div>

        <div class="chat-footer">

            <small>${getCurrentTime()}</small>

            <button class="copyBtn">

                Copy

            </button>

        </div>

    `;

    container.appendChild(div);

    scrollChat();

}

/* ==========================================================
OVERRIDE USER MESSAGE
========================================================== */

function addUserMessage(message) {

    const container =
        document.getElementById("chatMessages");

    const div =
        document.createElement("div");

    div.className = "user-message";

    div.innerHTML = `

        <div class="chat-content">

            ${message}

        </div>

        <small>

            ${getCurrentTime()}

        </small>

    `;

    container.appendChild(div);

    scrollChat();

}

/* ==========================================================
OVERRIDE SEND MESSAGE
========================================================== */

function sendMessage() {

    const input =
        document.getElementById("chatInput");

    const text =
        input.value.trim();

    if (!text)
        return;

    addUserMessage(text);

    input.value = "";

    showTypingIndicator();

    setTimeout(() => {

        removeTypingIndicator();

        const reply =
            generateResponse(text);

        addBotMessage(reply);

    }, 900);

}

/* ==========================================================
COPY RESPONSE
========================================================== */

document.addEventListener("click", e => {

    if (!e.target.classList.contains("copyBtn"))
        return;

    const text =
        e.target.parentElement
               .previousElementSibling
               .innerText;

    navigator.clipboard.writeText(text);

    e.target.textContent = "Copied!";

    setTimeout(() => {

        e.target.textContent = "Copy";

    }, 1500);

});

/* ==========================================================
CLEAR CHAT
========================================================== */

function clearChat() {

    const container =
        document.getElementById("chatMessages");

    container.innerHTML = `

    <div class="bot-message">

        👋 Hello!

        <br><br>

        I'm ScamShield AI.

        Ask me anything about

        cyber security,

        phishing,

        UPI fraud,

        online scams,

        passwords,

        banking,

        or cybercrime.

    </div>

    `;

}

