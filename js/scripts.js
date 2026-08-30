// ============================================
// YEALMUN 2026 - COMPLETE & OPTIMIZED JS
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ---------- 1. MOBİL MENÜ VE EKRAN BOYUTU YÖNETİMİ ----------
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
        mobileNavLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    navList.classList.remove('active-mobile');
                    document.body.classList.remove('menu-open');
                }
            });
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                if (navList.classList.contains('active-mobile')) {
                    navList.classList.remove('active-mobile');
                }
                if (document.body.classList.contains('menu-open')) {
                    document.body.classList.remove('menu-open');
                }
            }
        });
    }

    // ---------- 2. GERİ SAYIM SAYACI (SABİT UTC+3 ZAMAN DİLİMİ) ----------
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        // Türkiye saati ile etkinlik başlangıcı (UTC+3)
        const targetDate = new Date('2026-10-16T00:00:00+03:00').getTime();

        function updateCountdown() {
            const now = Date.now();
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

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ---------- 3. SCROLL REVEAL (SAYFA İÇİ ANİMASYONLAR) ----------
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -20px 0px'
            });

            revealElements.forEach(function (el) {
                revealObserver.observe(el);
            });
        } else {
            revealElements.forEach(function (el) {
                el.classList.add('visible');
            });
        }
    }

    // ---------- 4. AKTİF MENÜ TESPİTİ (URL PARAMETRE & HASH KORUMALI) ----------
    const path = window.location.pathname;
    let currentPage = path.substring(path.lastIndexOf('/') + 1).split('?')[0].split('#')[0];

    if (!currentPage || currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
        const href = link.getAttribute('href');
        if (!href) return;

        const hrefPage = href.substring(href.lastIndexOf('/') + 1).split('?')[0].split('#')[0];
        
        const cleanCurrent = currentPage.replace(/\.html$/, '');
        const cleanHref = hrefPage.replace(/\.html$/, '');

        if (currentPage === hrefPage || cleanCurrent === cleanHref) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});