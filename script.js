const TARGET_HOUR = 19;   // 7 PM
const TARGET_MINUTE = 30;

function getISTDate() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const parts = formatter.formatToParts(now);
    const get = type => Number(parts.find(p => p.type === type).value);

    return new Date(
        get('year'),
        get('month') - 1,
        get('day'),
        get('hour'),
        get('minute'),
        get('second')
    );
}

function updateTimer() {
    const nowIST = getISTDate();

    document.getElementById('current-time').textContent =
        nowIST.toLocaleTimeString('en-IN', { hour12: true });

    const target = new Date(nowIST);
    target.setHours(TARGET_HOUR, TARGET_MINUTE, 0, 0);

    if (nowIST >= target) {
        clearInterval(timer);
        document.getElementById('results').hidden = false;
        document.getElementById('time-remaining').textContent = "Results Declared 🎉";
        return;
    }

    const diff = target - nowIST;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    document.getElementById('time-remaining').textContent =
        `${h}h ${m}m ${s}s`;
}

const timer = setInterval(updateTimer, 1000);
updateTimer();
