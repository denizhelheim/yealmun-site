// ============================================
// YEALMUN 2026 - ULTRA MODERN JS
// Scroll animasyonları, navbar, mobil menü, sayaç
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // ---------- MOBIL MENU ----------
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navList = document.querySelector('.nav-list');
    if (mobileBtn && navList) {
        mobileBtn.addEventListener('click', function (e) {
            if (window.innerWidth > 768) return;
            e.stopPropagation();
            navList.classList.toggle('active-mobile');
            document.body.classList.toggle('menu-open');
        });

        document.addEventListener('click', function (event) {
            if (window.innerWidth > 768) return;
            if (!navList.contains(event.target) && !mobileBtn.contains(event.target)) {
                navList.classList.remove('active-mobile');
                document.body.classList.remove('menu-open');
            }
        });

        const mobileNavLinks = navList.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    navList.classList.remove('active-mobile');
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }

    // ---------- NAVBAR SCROLL ----------
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ---------- GERİ SAYIM SAYACI (16 Ekim 2026) ----------
    const targetDate = new Date('2026-10-16T00:00:00').getTime();

    function updateCountdown() {
        const now = Date.now();
        const diff = targetDate - now;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

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

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ---------- SCROLL REVEAL ----------
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ---------- AKTIF NAVLINK ----------
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const hrefPage = href.split('/').pop();
        if (hrefPage === currentPage) {
            link.classList.add('active');
        }
    });

    // ---------- PAGE TRANSITION (smooth slide-left, flicker yok) ----------
    (function () {
        const TRANS_MS = 360;
        const overlay = document.createElement('div');
        overlay.className = 'page-transition hidden'; // başlangıçta gizli
        document.body.appendChild(overlay);

        // overlay'i hemen gizle (sayfa yüklenirken gözükmesin)
        requestAnimationFrame(() => {
            overlay.classList.add('hidden');
        });

        document.addEventListener('click', function (e) {
            const anchor = e.target.closest('a');
            if (!anchor) return;
            const href = anchor.getAttribute('href');
            if (!href) return;
            if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;
            if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
            if (href.startsWith('#')) return;
            try {
                const url = new URL(href, window.location.href);
                if (url.origin !== window.location.origin) return;
            } catch (err) {
                return;
            }
            if (anchor.hash && (!anchor.pathname || anchor.pathname === window.location.pathname)) return;

            e.preventDefault();
            document.body.classList.add('page-transitioning');
            overlay.classList.remove('hidden');
            overlay.classList.add('active');
            setTimeout(() => { window.location.href = anchor.href; }, TRANS_MS);
        }, true);
    })();

});