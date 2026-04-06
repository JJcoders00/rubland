/* ============================================
   RUBLAND INDUSTRIES — ABOUT US SCRIPTS
   Industrial Dark Theme | Made by JJ Coders
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Progress Bar ---
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.prepend(scrollProgress);

    // --- Navbar ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.style.width = (scrollY / docHeight) * 100 + '%';
        if (scrollY > 50) navbar.classList.add('scrolled');
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

    // --- Intersection Observer: Reveal ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Intersection Observer: Image Colorization ---
    const grayscaleImages = document.querySelectorAll('.story-image, .reach-map');
    const colorizeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('colorized');
            } else if (isTouchDevice) {
                entry.target.classList.remove('colorized');
            }
        });
    }, { threshold: 0.3 });
    grayscaleImages.forEach(img => colorizeObserver.observe(img));

    // --- Counter Animation ---
    const stats = document.querySelectorAll('.reach-stat-item h3');
    let countersStarted = false;
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    if (stats.length > 0) statsObserver.observe(document.querySelector('.reach-stats'));

    function animateCounters() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                }
            }, 30);
        });
    }
});
