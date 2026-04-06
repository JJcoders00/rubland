/* ============================================
   RUBLAND INDUSTRIES — PRODUCTS PAGE SCRIPTS
   Made by JJ Coders
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Progress ---
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.prepend(scrollProgress);

    // --- Navbar ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.style.width = (scrollY / docHeight) * 100 + '%';
        navbar.classList.toggle('scrolled', scrollY > 50);
    });

    // --- Mobile Menu ---
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            mobileMenu.classList.toggle('show');
        });
        mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
            navToggle.classList.remove('open');
            mobileMenu.classList.remove('show');
        }));
    }

    // --- Touch Device Detection ---
    const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.matchMedia('(hover: none)').matches;

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Image Colorization on Scroll ---
    const grayscaleImages = document.querySelectorAll('.structure-image, .incinerator-image');
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

    // --- Table Row Staggered Animation ---
    const tableRows = document.querySelectorAll('.product-table tbody tr');
    const tableObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const rows = entry.target.querySelectorAll ? [entry.target] : [];
                entry.target.style.animation = `tableRowSlide 0.6s ease ${entry.target.dataset.delay || '0s'} both`;
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    tableRows.forEach((row, i) => {
        row.style.opacity = '0';
        row.dataset.delay = `${i * 0.15}s`;
        tableObserver.observe(row);
    });

    // --- Feature Card Hover Tilt (desktop) ---
    if (!isTouchDevice) {
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `translateX(8px) perspective(600px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // --- Button Ripple ---
    document.querySelectorAll('.btn-primary, .btn-specs, .btn-cta-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            ripple.style.cssText = `
                position:absolute; border-radius:50%; background:rgba(255,255,255,0.3);
                width:0; height:0; left:${e.clientX-rect.left}px; top:${e.clientY-rect.top}px;
                transform:translate(-50%,-50%); pointer-events:none;
                animation: rippleEffect 0.6s ease-out forwards;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `@keyframes rippleEffect { to { width:300px; height:300px; opacity:0; } }`;
    document.head.appendChild(rippleStyle);

    // --- Parallax on hero dots ---
    const gridOverlay = document.querySelector('.technical-grid');
    if (gridOverlay) {
        window.addEventListener('scroll', () => {
            if (window.scrollY < 500) {
                gridOverlay.style.transform = `translateY(${window.scrollY * 0.2}px)`;
            }
        });
    }
});
