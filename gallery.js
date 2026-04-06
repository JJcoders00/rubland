/* ============================================
   RUBLAND INDUSTRIES — GALLERY SCRIPTS
   Industrial Dark Theme | Made by JJ Coders
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // --- Mobile Menu ---
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
        });
    }

    // --- Detect Touch ---
    const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

    // --- Intersection Observer: Reveal & Colorize ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (isTouchDevice || window.innerWidth <= 1024) {
                    const img = entry.target.querySelector('.gallery-img');
                    if (img) img.classList.add('colorized');
                }
            } else if (isTouchDevice) {
                const img = entry.target.querySelector('.gallery-img');
                if (img) img.classList.remove('colorized');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.gallery-item').forEach(el => revealObserver.observe(el));

    // --- Filter functionality ---
    const tabs = document.querySelectorAll('.tab-btn');
    const items = document.querySelectorAll('.gallery-item');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');
            
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 400);
                }
            });
        });
    });

    // --- Lightbox functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            if (imgSrc) {
                lightboxImg.src = imgSrc;
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

});
