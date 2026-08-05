// scripts.js – Mobil menü, geri sayım sayacı, apply uyarısı
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navList = document.querySelector('.nav-list');
    if (mobileBtn && navList) {
        mobileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navList.classList.toggle('active-mobile');
        });
        document.addEventListener('click', function(event) {
            if (!navList.contains(event.target) && !mobileBtn.contains(event.target)) {
                navList.classList.remove('active-mobile');
            }
        });
    }

    // Geri sayım sayacı (16 Ekim 2026 00:00:00)
    const targetDate = new Date('2026-10-16T00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Sayfa yüklendiğinde ve her saniye güncelle
    updateCountdown();
    setInterval(updateCountdown, 1000);

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