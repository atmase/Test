/* ==========================================================
   ScamShield AI
   settings.js
========================================================== */

const SETTINGS_KEY = "scamshield_settings";

const DEFAULT_SETTINGS = {

    notifications: true,
    saveHistory: true,
    darkTheme: true,
    language: "English"

};

function getSettings() {

    try {

        return {
            ...DEFAULT_SETTINGS,
            ...JSON.parse(localStorage.getItem(SETTINGS_KEY))
        };

    } catch (error) {

        return { ...DEFAULT_SETTINGS };

    }

}

function saveSettings(settings) {

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

}

document.addEventListener("DOMContentLoaded", () => {

    const notifications = document.getElementById("settingNotifications");
    const saveHistory = document.getElementById("settingSaveHistory");
    const darkTheme = document.getElementById("settingDarkTheme");
    const language = document.getElementById("settingLanguage");
    const note = document.getElementById("settingsSavedNote");

    if (!notifications || !saveHistory || !darkTheme || !language) return;

    const settings = getSettings();

    notifications.checked = settings.notifications;
    saveHistory.checked = settings.saveHistory;
    darkTheme.checked = settings.darkTheme;

    if (language.querySelector(`option[value="${settings.language}"]`) ||
        [...language.options].some(o => o.textContent === settings.language)) {
        language.value = settings.language;
    }

    // Apply the saved theme on load (in case it was changed on a
    // previous visit) — keeps body.light and this checkbox in sync.
    document.body.classList.toggle("light", !settings.darkTheme);
    syncThemeIcon(!settings.darkTheme);

    function persist() {

        const updated = {

            notifications: notifications.checked,
            saveHistory: saveHistory.checked,
            darkTheme: darkTheme.checked,
            language: language.value

        };

        saveSettings(updated);
        showSavedNote();

    }

    function showSavedNote() {

        if (!note) return;

        note.textContent = "Settings saved.";
        note.classList.add("visible");

        clearTimeout(showSavedNote._timer);
        showSavedNote._timer = setTimeout(() => {
            note.classList.remove("visible");
        }, 1500);

    }

    notifications.addEventListener("change", persist);
    saveHistory.addEventListener("change", persist);
    language.addEventListener("change", persist);

    darkTheme.addEventListener("change", () => {

        document.body.classList.toggle("light", !darkTheme.checked);
        syncThemeIcon(!darkTheme.checked);
        persist();

    });

    // Keep this checkbox in sync when the header theme button
    // (moon/sun icon) is used instead of this Settings toggle.
    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            const isLight = document.body.classList.contains("light");
            darkTheme.checked = !isLight;
            persist();

        });

    }

});

function syncThemeIcon(isLight) {

    const themeBtn = document.getElementById("themeBtn");

    if (!themeBtn) return;

    const icon = themeBtn.querySelector("i");

    if (!icon) return;

    icon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";

}
