// scripts.js – Mobil menü, geri sayım sayacı, apply uyarısı
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navList = document.querySelector('.nav-list');
    if (mobileBtn && navList) {
        const toggleMenu = function(forceClose) {
            const shouldOpen = typeof forceClose === 'boolean' ? !forceClose : navList.classList.contains('active-mobile') === false;
            navList.classList.toggle('active-mobile', shouldOpen);
            document.body.classList.toggle('menu-open', shouldOpen);
            mobileBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
        };

        mobileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        navList.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                toggleMenu(true);
            });
        });

        document.addEventListener('click', function(event) {
            if (!navList.contains(event.target) && !mobileBtn.contains(event.target)) {
                toggleMenu(true);
            }
        });
    }

    // Geri sayım sayacı (17 Nisan 2026 00:00:00)
    const targetDate = new Date('2026-04-17T00:00:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
            return;
        }

        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Sayfa yüklendiğinde ve her saniye güncelle
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Apply butonu uyarısı (apply.html)
    const applyBtn = document.getElementById('applyButton');
    if (applyBtn) {
        applyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('The application form will be available soon. Please check back later.');
        });
    }

    // Aktif navlink vurgusu (mevcut sayfaya göre)
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});