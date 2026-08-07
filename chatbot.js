/* ==========================================================
    ScamShield AI
    chatbot.js
    Version 2.0
========================================================== */

"use strict";

/* ==========================================================
CHATBOT CLASS
========================================================== */

class ScamShieldChatbot {

    constructor() {

        this.messages =
            document.getElementById("chatMessages");

        this.input =
            document.getElementById("chatInput");

        this.sendButton =
            document.getElementById("sendChat");

        this.clearButton =
            document.getElementById("clearChatBtn");

        this.exportButton =
            document.getElementById("exportChatBtn");

        this.suggestionButtons =
            document.querySelectorAll(".suggestion");

        this.chatHistory = [];

        this.typing = false;

        this.initialize();

        this.lastQuestion = "";

    }

    /* ======================================================
       INITIALIZE
    ====================================================== */

    initialize() {

        if (
            !this.messages ||
            !this.input ||
            !this.sendButton
        ) return;

this.attachEvents();

this.enableCopyButtons();

this.loadHistory();

    }

    /* ======================================================
       EVENTS
    ====================================================== */

    attachEvents() {

        this.sendButton.addEventListener(
            "click",
            () => this.sendMessage()
        );

        this.input.addEventListener(
            "keypress",
            e => {

                if (e.key === "Enter") {

                    this.sendMessage();

                }

            }
        );

        if (this.clearButton) {

            this.clearButton.addEventListener(
                "click",
                () => this.clearChat()
            );

        }

        if (this.exportButton) {

            this.exportButton.addEventListener(
                "click",
                () => this.exportChat()
            );

        }

        this.suggestionButtons.forEach(button => {

            button.addEventListener("click", () => {

                this.input.value =
                    button.textContent.trim();

                this.sendMessage();

            });

        });

    }

    /* ======================================================
       SEND MESSAGE
    ====================================================== */

    sendMessage() {

        const text =
            this.input.value.trim();

        if (!text) return;

        this.addMessage(
            "user",
            text
        );

        this.input.value = "";

        this.showTyping();

        setTimeout(() => {

            const reply =
                this.generateResponse(text);

            this.hideTyping();

            this.addMessage(
                "bot",
                reply
            );

        }, 900);

    }

    /* ======================================================
       ADD MESSAGE
    ====================================================== */

    addMessage(type, message) {

        const div =
            document.createElement("div");

        div.className =
            type === "user"
            ? "user-message"
            : "bot-message";

        div.innerHTML = `

            <div class="chat-content">

                ${message}

            </div>

            <div class="chat-footer">

                <small>

                    ${this.currentTime()}

                </small>

                ${
                    type === "bot"
                    ?

                    `<button class="copyBtn">

                        Copy

                    </button>`

                    :

                    ""

                }

            </div>

        `;

        this.messages.appendChild(div);

        this.messages.scrollTop =
            this.messages.scrollHeight;

        this.chatHistory.push({

            type,

            message,

            time:
                this.currentTime()

        });

        this.saveHistory();

    }

    /* ======================================================
       TYPING INDICATOR
    ====================================================== */

    showTyping() {

        if (this.typing) return;

        this.typing = true;

        const div =
            document.createElement("div");

        div.id =
            "typingIndicator";

        div.className =
            "bot-message";

        div.innerHTML =

            `🤖 <i>ScamShield AI is typing...</i>`;

        this.messages.appendChild(div);

        this.messages.scrollTop =
            this.messages.scrollHeight;

    }

    hideTyping() {

        this.typing = false;

        const typing =
            document.getElementById(
                "typingIndicator"
            );

        if (typing)
            typing.remove();

    }

    /* ======================================================
       CURRENT TIME
    ====================================================== */

    currentTime() {

        return new Date()
            .toLocaleTimeString([], {

                hour: "2-digit",

                minute: "2-digit"

            });

    }
    /* ======================================================
       KNOWLEDGE BASE
    ====================================================== */

    knowledgeBase = [

        {
            topic: "Phishing",
            keywords: [
                "phishing",
                "fake email",
                "email scam",
                "fake website"
            ],
            response: `
<b>🎣 Phishing Attack</b><br><br>

Phishing is a cyber attack where criminals pretend to be trusted organizations to steal:

• Passwords
• OTPs
• Bank details
• Credit card information

<b>How to stay safe:</b><br>

✔ Check the sender carefully<br>
✔ Verify website URLs<br>
✔ Never share OTPs<br>
✔ Avoid clicking unknown links
`
        },

        {
            topic: "OTP",
            keywords: [
                "otp",
                "one time password",
                "verification code"
            ],
            response: `
<b>🔐 OTP Safety</b><br><br>

Never share your OTP with anyone.

Banks, payment apps and government agencies never ask for your OTP over calls, SMS or email.

Sharing your OTP can allow attackers to complete unauthorized transactions.
`
        },

        {
            topic: "UPI",
            keywords: [
                "upi",
                "upi fraud",
                "upi scam",
                "payment"
            ],
            response: `
<b>💳 UPI Fraud Prevention</b><br><br>

Before sending money:

✔ Verify the recipient name
✔ Verify the UPI ID
✔ Never enter your PIN to receive money
✔ Avoid unknown QR codes

If someone asks you to enter your UPI PIN to receive money, it is a scam.
`
        },

        {
            topic: "QR Code",
            keywords: [
                "qr",
                "qr code"
            ],
            response: `
<b>📷 QR Code Scam</b><br><br>

Scanning a QR code generally starts a payment process.

If someone says:

"Scan this QR code to receive money"

that is a common scam tactic.

Always verify before scanning.
`
        },

        {
            topic: "Password",
            keywords: [
                "password",
                "strong password"
            ],
            response: `
<b>🔑 Password Security</b><br><br>

A strong password should:

• Be at least 12 characters
• Include uppercase letters
• Include lowercase letters
• Include numbers
• Include symbols

Never reuse passwords across multiple websites.
`
        },

        {
            topic: "Banking",
            keywords: [
                "bank",
                "banking",
                "account blocked"
            ],
            response: `
<b>🏦 Banking Safety</b><br><br>

Banks never ask for:

• OTP
• ATM PIN
• CVV
• Internet banking password

Never share these details with anyone.
`
        },

        {
            topic: "Investment Scam",
            keywords: [
                "investment",
                "double money",
                "profit"
            ],
            response: `
<b>📈 Investment Scam</b><br><br>

Warning signs:

• Guaranteed returns
• Double your money
• Zero risk investments
• Pressure to invest quickly

Always verify financial companies before investing.
`
        },

        {
            topic: "Crypto Scam",
            keywords: [
                "crypto",
                "bitcoin",
                "ethereum"
            ],
            response: `
<b>🪙 Crypto Scam</b><br><br>

Be cautious of:

• Guaranteed profits
• Celebrity investment groups
• Fake crypto exchanges
• Recovery scams

Research thoroughly before investing.
`
        },

        {
            topic: "Job Scam",
            keywords: [
                "job",
                "job scam",
                "work from home"
            ],
            response: `
<b>💼 Job Scam</b><br><br>

Common warning signs:

• Paying registration fees
• Unrealistic salaries
• No interview
• Urgent joining

Legitimate employers rarely ask candidates to pay money.
`
        },

        {
            topic: "Greeting",
            keywords: [
                "hello",
                "hi",
                "hey"
            ],
            response: `
👋 Hello!

I'm <b>ScamShield AI</b>.

You can ask me about:

• Phishing
• OTP Safety
• Banking Fraud
• UPI Fraud
• QR Code Scams
• Password Security
• Crypto Scams
• Job Scams
• Online Safety
`
        }

    ];

    /* ======================================================
       GENERATE RESPONSE
    ====================================================== */

    generateResponse(question) {

        const query =
            question.toLowerCase();

        // Remember last user question
        this.lastQuestion = question;

        for (const item of this.knowledgeBase) {

            const found =
                item.keywords.some(keyword =>
                    query.includes(keyword)
                );

            if (found) {

                return item.response;

            }

        }

        return `
<b>🤖 ScamShield AI</b><br><br>

I couldn't find an exact answer.

Try asking about:

• Phishing
• OTP Safety
• UPI Fraud
• Banking Security
• Passwords
• QR Code Scams
• Investment Scams
• Crypto Scams
• Job Scams
• Online Safety

I'm continuously learning to help you stay safe online.
`;

    }

        /* ======================================================
       SAVE CHAT HISTORY
    ====================================================== */

    saveHistory() {

        localStorage.setItem(
            "scamshield_chat_history",
            JSON.stringify(this.chatHistory)
        );

    }

    /* ======================================================
       LOAD CHAT HISTORY
    ====================================================== */

    loadHistory() {

        const saved =
            localStorage.getItem(
                "scamshield_chat_history"
            );

        if (!saved)
            return;

        try {

            this.chatHistory =
                JSON.parse(saved);

            this.messages.innerHTML = "";

            this.chatHistory.forEach(chat => {

                const div =
                    document.createElement("div");

                div.className =
                    chat.type === "user"
                    ? "user-message"
                    : "bot-message";

                div.innerHTML = `

                    <div class="chat-content">

                        ${chat.message}

                    </div>

                    <div class="chat-footer">

                        <small>

                            ${chat.time}

                        </small>

                        ${chat.type === "bot"
                            ? `<button class="copyBtn">Copy</button>`
                            : ""}

                    </div>

                `;

                this.messages.appendChild(div);

            });

            this.messages.scrollTop =
                this.messages.scrollHeight;

        }

        catch {

            localStorage.removeItem(
                "scamshield_chat_history"
            );

        }

    }

    /* ======================================================
       CLEAR CHAT
    ====================================================== */

    clearChat() {

        if (!confirm(
            "Clear the entire conversation?"
        )) {

            return;

        }

        this.chatHistory = [];

        localStorage.removeItem(
            "scamshield_chat_history"
        );

        this.messages.innerHTML = `

            <div class="bot-message">

                <div class="chat-content">

                    👋 Welcome back!

                    <br><br>

                    Ask me anything about:

                    <br><br>

                    • Phishing

                    <br>

                    • UPI Fraud

                    <br>

                    • Banking Security

                    <br>

                    • Password Safety

                    <br>

                    • Online Scams

                </div>

            </div>

        `;

    }

    /* ======================================================
       EXPORT CHAT
    ====================================================== */

    exportChat() {

        if (
            this.chatHistory.length === 0
        ) {

            alert(
                "No chat history available."
            );

            return;

        }

        let text =

            "ScamShield AI Chat History\n\n";

        this.chatHistory.forEach(chat => {

            text +=

                `[${chat.time}] ` +

                `${chat.type.toUpperCase()}:\n` +

                `${chat.message}\n\n`;

        });

        const blob =

            new Blob(

                [text],

                {

                    type: "text/plain"

                }

            );

        const url =
            URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        a.href = url;

        a.download =
            "ScamShield-Chat.txt";

        a.click();

        URL.revokeObjectURL(url);

    }

    /* ======================================================
       COPY BOT RESPONSES
    ====================================================== */

    enableCopyButtons() {

        this.messages.addEventListener(
            "click",

            event => {

                if (
                    !event.target.classList.contains(
                        "copyBtn"
                    )
                ) {

                    return;

                }

                const message =

                    event.target
                        .closest(".bot-message")
                        .querySelector(".chat-content")
                        .innerText;

                navigator.clipboard
                    .writeText(message);

                event.target.innerText =
                    "Copied!";

                setTimeout(() => {

                    event.target.innerText =
                        "Copy";

                }, 1500);

            }

        );

    }

        /* ======================================================
       SMART SUGGESTIONS
    ====================================================== */

    showSuggestions() {

        const suggestions = [

            "What is phishing?",

            "How can I identify fake websites?",

            "Is it safe to share my OTP?",

            "How does UPI fraud work?",

            "How do I report cybercrime?"

        ];

        const container =
            document.getElementById("chatSuggestions");

        if (!container) return;

        container.innerHTML = "";

        suggestions.forEach(question => {

            const button =
                document.createElement("button");

            button.className =
                "suggestion";

            button.textContent =
                question;

            button.addEventListener("click", () => {

                this.input.value =
                    question;

                this.sendMessage();

            });

            container.appendChild(button);

        });

    }

    /* ======================================================
       WELCOME MESSAGE
    ====================================================== */

    showWelcomeMessage() {

        if (this.chatHistory.length > 0)
            return;

        this.addMessage(
            "bot",

            `👋 <b>Welcome to ScamShield AI</b>

            <br><br>

            I can help you with:

            <br><br>

            • Phishing Detection

            <br>

            • UPI Fraud

            <br>

            • Banking Security

            <br>

            • QR Code Scams

            <br>

            • Password Safety

            <br>

            • Online Scam Awareness

            <br><br>

            Ask me anything to get started.`
        );

    }

    /* ======================================================
       IMPROVED INITIALIZATION
    ====================================================== */

    start() {

        this.showSuggestions();

        this.showWelcomeMessage();

    }

}

/* ==========================================================
INITIALIZE CHATBOT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const chatbot = new ScamShieldChatbot();

    chatbot.start();

});

    
