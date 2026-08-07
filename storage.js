/* ==========================================
   ScamShield AI - Storage Manager
========================================== */

const StorageManager = {

    key: "scamshield_history",

    getHistory() {

        return JSON.parse(
            localStorage.getItem(this.key)
        ) || [];

    },

    saveHistory(history) {

        localStorage.setItem(
            this.key,
            JSON.stringify(history)
        );

    },

    addScan(scan) {

        const history =
            this.getHistory();

        history.unshift({

            id: Date.now(),

            ...scan

        });

        // Keep the log from growing without bound
        this.saveHistory(history.slice(0, 200));

    },

    clearHistory() {

        localStorage.removeItem(this.key);

    },

    getStats() {

        const history =
            this.getHistory();

        return {

            total: history.length,

            safe: history.filter(
                x => x.status === "Safe"
            ).length,

            lowRisk: history.filter(
                x => x.status === "Low Risk"
            ).length,

            suspicious: history.filter(
                x => x.status === "Suspicious"
            ).length,

            highRisk: history.filter(
                x => x.status === "High Risk"
            ).length

        };

    }

};

/* ==========================================
   Shared helper used by every scan tool to
   log a result. Normalizes each tool's own
   status/level wording into the 4 buckets
   StorageManager.getStats() understands:
   "Safe" | "Low Risk" | "Suspicious" | "High Risk"
========================================== */

function logScanToHistory(tool, rawStatus, score) {

    // Respect the "Save Scan History" toggle in Settings, if set.
    try {

        const settings = JSON.parse(
            localStorage.getItem("scamshield_settings")
        );

        if (settings && settings.saveHistory === false) {
            return;
        }

    } catch (error) {
        // If settings can't be read, default to saving history.
    }

    const statusMap = {

        "Safe": "Safe",
        "Verified": "Safe",
        "Low Risk": "Low Risk",
        "Medium Risk": "Suspicious",
        "Suspicious": "Suspicious",
        "High Risk": "High Risk",
        "Danger": "High Risk",
        "Invalid": "High Risk",
        "Invalid URL": "High Risk"

    };

    StorageManager.addScan({

        tool,
        status: statusMap[rawStatus] || rawStatus,
        score: typeof score === "number" ? score : null,
        timestamp: Date.now()

    });

}
