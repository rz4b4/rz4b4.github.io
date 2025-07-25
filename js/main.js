document.addEventListener('DOMContentLoaded', () => {
    // Typing effect for rzaba
    const name = 'rzaba\'s intergalactic hub';
    const typed = document.getElementById('rzaba-typed');
    let i = 0;
    function type() {
        if (typed && i <= name.length) {
            typed.textContent = name.slice(0, i) + (i < name.length ? '_' : '');
            i++;
            setTimeout(type, 180);
        } else if (typed) {
            typed.textContent = name;
        }
    }
    type();

    // Contact form feedback and mailto redirect
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            const mailto = `mailto:rzaba@example.com?subject=Contact%20from%20${encodeURIComponent(name)}&body=Email:%20${encodeURIComponent(email)}%0A%0A${encodeURIComponent(message)}`;
            window.location.href = mailto;
        });
    }

    // HUB STATS: fetch weather for Vatican and generate cosmic radiation
    // Store previous values for smooth transitions
    let prev = {};
    // Store static values for shield, visitors, warp
    let staticStats = null;
    function getStaticStats() {
        const shieldStates = ['nominal', 'warning', 'critical'];
        const shieldIdx = Math.random() < 0.85 ? 0 : (Math.random() < 0.7 ? 1 : 2);
        const shield = shieldStates[shieldIdx];
        const warpStates = ['ready', 'charging', 'offline'];
        const warpIdx = Math.random() < 0.7 ? 0 : (Math.random() < 0.5 ? 1 : 2);
        const warp = warpStates[warpIdx];
        const visitors = Math.floor(Math.random() * 256) + 1;
        return { shield, warp, visitors };
    }
    async function updateStats(reveal = false) {
        if (!staticStats) staticStats = getStaticStats();
        // Helper for small random walk with rare spikes
        function nextVal(key, base, min, max, step, spikeChance = 0.03, spikeSize = 3) {
            let v = prev[key] !== undefined ? prev[key] : base;
            if (Math.random() < spikeChance) {
                v += (Math.random() - 0.5) * spikeSize * step;
            } else {
                v += (Math.random() - 0.5) * step;
            }
            v = Math.max(min, Math.min(max, v));
            prev[key] = v;
            return v;
        }
        const temp = nextVal('temp', 22, -10, 40, 0.15).toFixed(2);
        const humidity = nextVal('humidity', 50, 10, 90, 0.7).toFixed(1);
        const outside = nextVal('outside', -270, -273.2, -265, 0.07, 0.02, 2).toFixed(2);
        const radiation = nextVal('radiation', 0.2, 0.05, 1.2, 0.01, 0.04, 0.3).toFixed(2);
        const solar = nextVal('solar', 60, 0, 120, 1.2, 0.04, 20).toFixed(1);
        const pressure = nextVal('pressure', 1013, 950, 1060, 0.7, 0.03, 10).toFixed(1);
        const oxygen = nextVal('oxygen', 20.9, 15, 25, 0.03, 0.02, 1).toFixed(2);
        const co2 = nextVal('co2', 420, 300, 2000, 2, 0.03, 100).toFixed(0);
        const { shield, warp, visitors } = staticStats;
        const power = nextVal('power', 90, 0, 100, 0.5, 0.03, 10).toFixed(1);
        // Set values
        const tempEl = document.getElementById('stat-temp');
        const humEl = document.getElementById('stat-humidity');
        const outEl = document.getElementById('stat-outside');
        const radEl = document.getElementById('stat-radiation');
        const solarEl = document.getElementById('stat-solar');
        const pressureEl = document.getElementById('stat-pressure');
        const oxygenEl = document.getElementById('stat-oxygen');
        const co2El = document.getElementById('stat-co2');
        const visitorsEl = document.getElementById('stat-visitors');
        const shieldEl = document.getElementById('stat-shield');
        const powerEl = document.getElementById('stat-power');
        const warpEl = document.getElementById('stat-warp');
        if (tempEl) {
            tempEl.innerHTML = temp + '<span class="stat-unit"> °C</span>';
            tempEl.className = 'stat-value ' + (temp < 0 || temp > 35 ? 'stat-danger' : temp < 5 || temp > 30 ? 'stat-warning' : 'stat-safe');
            if (reveal) {
                setTimeout(() => {
                    tempEl.classList.add('revealed');
                    const unit = tempEl.querySelector('.stat-unit');
                    if (unit) unit.classList.add('revealed');
                }, 200);
            }
        }
        if (humEl) {
            humEl.innerHTML = humidity + '<span class="stat-unit"> %</span>';
            humEl.className = 'stat-value ' + (humidity < 20 || humidity > 80 ? 'stat-danger' : humidity < 30 || humidity > 70 ? 'stat-warning' : 'stat-safe');
            if (reveal) {
                setTimeout(() => {
                    humEl.classList.add('revealed');
                    const unit = humEl.querySelector('.stat-unit');
                    if (unit) unit.classList.add('revealed');
                }, 500);
            }
        }
        if (outEl) {
            outEl.innerHTML = outside + '<span class="stat-unit"> °C</span>';
            outEl.className = 'stat-value ' + (outside < -273.15 || outside > -265 ? 'stat-danger' : outside < -272 || outside > -268 ? 'stat-warning' : 'stat-safe');
            if (reveal) {
                setTimeout(() => {
                    outEl.classList.add('revealed');
                    const unit = outEl.querySelector('.stat-unit');
                    if (unit) unit.classList.add('revealed');
                }, 650);
            }
        }
        if (radEl) {
            radEl.innerHTML = radiation + '<span class="stat-unit"> μSv/h</span>';
            radEl.className = 'stat-value ' + (radiation > 0.3 ? (radiation > 0.5 ? 'stat-danger' : 'stat-warning') : 'stat-safe');
            if (reveal) {
                setTimeout(() => {
                    radEl.classList.add('revealed');
                    const unit = radEl.querySelector('.stat-unit');
                    if (unit) unit.classList.add('revealed');
                }, 800);
            }
        }
        if (solarEl) {
            solarEl.innerHTML = solar + '<span class="stat-unit"> kW</span>';
            solarEl.className = 'stat-value ' + (solar < 10 ? 'stat-danger' : solar < 20 ? 'stat-warning' : 'stat-safe');
            if (reveal) {
                setTimeout(() => {
                    solarEl.classList.add('revealed');
                    const unit = solarEl.querySelector('.stat-unit');
                    if (unit) unit.classList.add('revealed');
                }, 950);
            }
        }
        if (pressureEl) {
            pressureEl.innerHTML = pressure + '<span class="stat-unit"> hPa</span>';
            pressureEl.className = 'stat-value ' + (pressure < 980 || pressure > 1040 ? 'stat-danger' : pressure < 995 || pressure > 1025 ? 'stat-warning' : 'stat-safe');
            if (reveal) setTimeout(() => { pressureEl.classList.add('revealed'); const unit = pressureEl.querySelector('.stat-unit'); if (unit) unit.classList.add('revealed'); }, 1100);
        }
        if (oxygenEl) {
            oxygenEl.innerHTML = oxygen + '<span class="stat-unit"> %</span>';
            oxygenEl.className = 'stat-value ' + (oxygen < 19.5 || oxygen > 23.5 ? 'stat-danger' : oxygen < 20.5 || oxygen > 22.5 ? 'stat-warning' : 'stat-safe');
            if (reveal) setTimeout(() => { oxygenEl.classList.add('revealed'); const unit = oxygenEl.querySelector('.stat-unit'); if (unit) unit.classList.add('revealed'); }, 1250);
        }
        if (co2El) {
            co2El.innerHTML = co2 + '<span class="stat-unit"> ppm</span>';
            co2El.className = 'stat-value ' + (co2 > 1000 ? 'stat-danger' : co2 > 600 ? 'stat-warning' : 'stat-safe');
            if (reveal) setTimeout(() => { co2El.classList.add('revealed'); const unit = co2El.querySelector('.stat-unit'); if (unit) unit.classList.add('revealed'); }, 1400);
        }
        if (visitorsEl) {
            visitorsEl.innerHTML = visitors + '<span class="stat-unit"></span>';
            visitorsEl.className = 'stat-value stat-safe';
            if (reveal) setTimeout(() => { visitorsEl.classList.add('revealed'); }, 1550);
        }
        if (shieldEl) {
            shieldEl.innerHTML = shield + '<span class="stat-unit"></span>';
            shieldEl.className = 'stat-value ' + (shield === 'critical' ? 'stat-danger' : shield === 'warning' ? 'stat-warning' : 'stat-safe');
            if (reveal) setTimeout(() => { shieldEl.classList.add('revealed'); }, 1700);
        }
        if (powerEl) {
            powerEl.innerHTML = power + '<span class="stat-unit"> %</span>';
            powerEl.className = 'stat-value ' + (power < 20 ? 'stat-danger' : power < 50 ? 'stat-warning' : 'stat-safe');
            if (reveal) setTimeout(() => { powerEl.classList.add('revealed'); const unit = powerEl.querySelector('.stat-unit'); if (unit) unit.classList.add('revealed'); }, 1850);
        }
        if (warpEl) {
            warpEl.innerHTML = warp + '<span class="stat-unit"></span>';
            warpEl.className = 'stat-value ' + (warp === 'offline' ? 'stat-danger' : warp === 'charging' ? 'stat-warning' : 'stat-safe');
            if (reveal) setTimeout(() => { warpEl.classList.add('revealed'); }, 2000);
        }
        // Last updated timestamp
        const updatedEl = document.getElementById('stats-updated');
        if (updatedEl) {
            const now = new Date();
            updatedEl.textContent = 'last updated: ' + now.toLocaleTimeString();
        }
    }
    updateStats(true);
    setInterval(() => updateStats(false), 1000);
});