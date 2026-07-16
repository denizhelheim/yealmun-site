// scripts.js - YEALMUN (sade, efekt yok)
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

    // Apply butonu (apply.html'deki "Başvuru formuna git" butonu)
    const applyBtn = document.getElementById('applyButton');
    if (applyBtn && applyBtn.getAttribute('href') === '#') {
        applyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('The application form will be available soon. Please check back later.');
        });
    }

    // Mevcut sayfaya göre aktif nav linki vurgula
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});