// scripts.js - YEALMUN interaktif fonksiyonlar + sayfalar arası fade geçiş
document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobil menü toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navList = document.querySelector('.nav-list');
    if (mobileBtn && navList) {
        mobileBtn.addEventListener('click', () => {
            navList.classList.toggle('active-mobile');
        });
        document.addEventListener('click', function(event) {
            if (!navList.contains(event.target) && !mobileBtn.contains(event.target) && navList.classList.contains('active-mobile')) {
                navList.classList.remove('active-mobile');
            }
        });
    }

    // 2. Sayfalar arası fade geçiş efekti (sadece aynı origin içindeki linkler için)
    const allLinks = document.querySelectorAll('a');
    const currentOrigin = window.location.origin;
    allLinks.forEach(link => {
        // Sadece dahili linkler (hash veya dışarı değil, aynı domain)
        if (link.href.startsWith(currentOrigin) && !link.href.includes('#') && link.getAttribute('target') !== '_blank') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetUrl = link.href;
                // body'e fade-out class'ı ekle
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 200); // 200ms geçiş süresi (CSS'de 0.25s)
            });
        }
    });

    // Sayfa yüklendiğinde fade-in efekti (başlangıçta gizli değil, zaten görünür ama kısa bir animasyon için)
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 10);

    // 3. Başvuru butonu için (basvurular.html sayfasında)
    const applyButton = document.getElementById('applyButton');
    if (applyButton && applyButton.getAttribute('href') === '#') {
        applyButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Google Forms başvuru linki henüz eklenmemiştir. Lütfen daha sonra tekrar deneyiniz.');
        });
    }

    // 4. Aktif navlink vurgusu (mevcut sayfaya göre)
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('active');
        }
    });
});