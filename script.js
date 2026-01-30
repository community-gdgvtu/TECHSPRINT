/* ============================
   SECURITY LOCKS
============================ */

// Disable right click
document.addEventListener("contextmenu", e => e.preventDefault());

// Disable inspect & shortcuts
document.addEventListener("keydown", e => {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
    ) {
        e.preventDefault();
        return false;
    }
});

// Detect DevTools
setInterval(() => {
    if (
        window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160
    ) {
        document.body.innerHTML =
            "<h1 style='margin-top:25%;text-align:center;'>Access Denied</h1>";
    }
}, 1000);

/* ============================
   IST TIMER LOGIC
============================ */

const TARGET_HOUR = 19;   // 7 PM
const TARGET_MINUTE = 30;

function getISTDate() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const parts = formatter.formatToParts(now);
    const get = t => Number(parts.find(p => p.type === t).value);

    return new Date(
        get("year"),
        get("month") - 1,
        get("day"),
        get("hour"),
        get("minute"),
        get("second")
    );
}

function updateTimer() {
    const nowIST = getISTDate();

    document.getElementById("current-time").textContent =
        nowIST.toLocaleTimeString("en-IN", { hour12: true });

    const target = new Date(nowIST);
    target.setHours(TARGET_HOUR, TARGET_MINUTE, 0, 0);

    if (nowIST >= target) {
        clearInterval(timer);
        revealResults();
        return;
    }

    const diff = target - nowIST;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    document.getElementById("time-remaining").textContent =
        `${h}h ${m}m ${s}s`;
}

function revealResults() {
    document.getElementById("results").hidden = false;
    document.getElementById("time-remaining").textContent =
        "Results Declared 🎉";
}

const timer = setInterval(updateTimer, 1000);
updateTimer();
