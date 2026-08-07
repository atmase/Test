/* ==========================================================
   ScamShield AI
   dashboard.js
   Renders real scan-history stats + a chart on the
   Security Dashboard page, using the scan log that
   analyzer.js / urlChecker.js / upi.js / transaction.js
   write to via StorageManager (see storage.js).
========================================================== */

let dashboardChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {

    renderDashboard();

    const clearBtn = document.getElementById("clearHistoryBtn");

    if (clearBtn) {

        clearBtn.addEventListener("click", () => {

            const confirmed = confirm(
                "Clear all scan history? This cannot be undone."
            );

            if (confirmed) {
                StorageManager.clearHistory();
                renderDashboard();
            }

        });

    }

    // Re-render whenever the Dashboard nav button is clicked,
    // so numbers stay fresh after new scans are run elsewhere.
    document.querySelectorAll('.nav[data-page="dashboard"]')
        .forEach(btn => btn.addEventListener("click", renderDashboard));

});

function renderDashboard() {

    if (typeof StorageManager === "undefined") return;

    const stats = StorageManager.getStats();
    const history = StorageManager.getHistory();

    updateStatCards(stats);
    updateChart(stats);
    updateHistoryList(history);

}

function updateStatCards(stats) {

    const totalEl = document.getElementById("dashTotalScans");
    const highRiskEl = document.getElementById("dashHighRisk");
    const safeEl = document.getElementById("dashSafeCount");

    if (totalEl) totalEl.textContent = stats.total.toLocaleString();
    if (highRiskEl) highRiskEl.textContent = stats.highRisk.toLocaleString();
    if (safeEl) safeEl.textContent = stats.safe.toLocaleString();

}

function updateChart(stats) {

    const canvas = document.getElementById("dashboardChart");

    if (!canvas || typeof Chart === "undefined") return;

    const data = [
        stats.safe,
        stats.lowRisk,
        stats.suspicious,
        stats.highRisk
    ];

    const hasData = data.some(n => n > 0);

    if (dashboardChartInstance) {
        dashboardChartInstance.destroy();
    }

    dashboardChartInstance = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: ["Safe", "Low Risk", "Suspicious", "High Risk"],

            datasets: [{

                data: hasData ? data : [1, 0, 0, 0],

                backgroundColor: [
                    "#22c55e",
                    "#facc15",
                    "#f97316",
                    "#ef4444"
                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            plugins: {

                legend: {
                    position: "bottom",
                    labels: { color: "#b6c2d9" }
                },

                tooltip: {
                    enabled: hasData
                }

            }

        }

    });

}

function updateHistoryList(history) {

    const list = document.getElementById("dashboardHistoryList");

    if (!list) return;

    list.innerHTML = "";

    if (history.length === 0) {

        const li = document.createElement("li");
        li.className = "empty";
        li.textContent =
            "No scans yet — run a check in any tool to see it here.";
        list.appendChild(li);
        return;

    }

    const statusColors = {
        "Safe": "#22c55e",
        "Low Risk": "#facc15",
        "Suspicious": "#f97316",
        "High Risk": "#ef4444"
    };

    history.slice(0, 10).forEach(scan => {

        const li = document.createElement("li");

        const left = document.createElement("span");
        left.textContent =
            `${scan.tool} — ${formatTimestamp(scan.timestamp)}`;

        const right = document.createElement("span");
        right.className = "dash-status";
        right.textContent = scan.status;
        right.style.background = statusColors[scan.status] || "#94a3b8";
        right.style.color = "#0b1225";

        li.appendChild(left);
        li.appendChild(right);
        list.appendChild(li);

    });

}

function formatTimestamp(ts) {

    if (!ts) return "";

    const diffMs = Date.now() - ts;
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin} min ago`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} hr ago`;

    const diffDay = Math.floor(diffHr / 24);
    return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;

}
