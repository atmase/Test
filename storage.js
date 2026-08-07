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

        this.saveHistory(history);

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

            suspicious: history.filter(
                x => x.status === "Suspicious"
            ).length,

            highRisk: history.filter(
                x => x.status === "High Risk"
            ).length

        };

    }

};
