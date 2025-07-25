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
    async function updateStats(reveal = false) {
        // Open-Meteo API (no key needed)
        const lat = 41.9029; // Vatican
        const lon = 12.4534;
        let temp = '--', humidity = '--';
        try {
            const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m`);
            const data = await resp.json();
            if (data.current_weather) {
                temp = data.current_weather.temperature;
            }
            if (data.hourly && data.hourly.relative_humidity_2m) {
                // Find closest hour
                const now = new Date();
                const idx = data.hourly.time.findIndex(t => t.startsWith(now.toISOString().slice(0, 13)));
                if (idx !== -1) humidity = data.hourly.relative_humidity_2m[idx];
            }
        } catch (e) { }
        // Random cosmic radiation (μSv/h)
        const radiation = (Math.random() * 0.5 + 0.1).toFixed(2);
        // Random outside temperature around -270°C
        const outside = (-270 + (Math.random() - 0.5) * 2).toFixed(2);
        // Set values
        const tempEl = document.getElementById('stat-temp');
        const humEl = document.getElementById('stat-humidity');
        const radEl = document.getElementById('stat-radiation');
        const outEl = document.getElementById('stat-outside');
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
    }
    updateStats(true);
    setInterval(updateStats, 60000);
});