/* ============================================
   RUBLAND INDUSTRIES — CONTACT PAGE SCRIPTS
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

    // --- Map Image Colorization ---
    const mapImage = document.querySelector('.map-card img');
    if (mapImage) {
        const colorizeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('colorized');
                } else if (isTouchDevice) {
                    entry.target.classList.remove('colorized');
                }
            });
        }, { threshold: 0.3 });
        colorizeObserver.observe(mapImage);
    }

    // --- Form Input Animations ---
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = '';
        });

        // Floating label effect — add filled state
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    });

    // --- Form Submit Animation ---
    const submitBtn = document.querySelector('.btn-submit');
    const form = document.querySelector('.inquiry-form');
    if (submitBtn && form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = form.querySelector('input[placeholder*="Thomas Kurian"]').value;
            const phone = form.querySelector('input[type="tel"]').value;
            const yieldVal = form.querySelector('input[placeholder*="amount"]').value;
            const sheets = form.querySelector('input[placeholder*="quantity"]').value;
            const location = form.querySelector('input[placeholder*="Pala, Kottayam"]').value;
            const message = form.querySelector('textarea').value;

            // Generate WhatsApp message
            const waTarget = "919745344800";
            const waMessage = `*New Inquiry for Rubland Industries*%0A%0A` +
                              `*Name:* ${name}%0A` +
                              `*Phone:* ${phone}%0A` +
                              `*Yield:* ${yieldVal} L/Day%0A` +
                              `*Sheets:* ${sheets} per Day%0A` +
                              `*Location:* ${location}%0A` +
                              `*Message:* ${message}`;

            // Pulse animation
            submitBtn.style.transform = 'scale(0.95)';
            submitBtn.innerHTML = '<span class="material-symbols-outlined" style="animation: pulse 1s infinite">pending</span> Redirecting to WhatsApp...';
            submitBtn.style.background = '#25D366'; // WhatsApp Green
            
            setTimeout(() => {
                window.open(`https://wa.me/${waTarget}?text=${waMessage}`, '_blank');
                submitBtn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Message Sent!';
            }, 1000);

            setTimeout(() => {
                submitBtn.style.transform = '';
            }, 1200);

            // Reset after 5s
            setTimeout(() => {
                submitBtn.innerHTML = 'Submit Professional Inquiry <span class="material-symbols-outlined">send</span>';
                submitBtn.style.background = '';
                form.reset();
            }, 5000);
        });
    }

    // --- Bento Card Tilt (desktop) ---
    if (!isTouchDevice) {
        document.querySelectorAll('.gm-card, .hq-card, .reach-card, .subsidy-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `translateY(-4px) perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // --- Button Ripple ---
    document.querySelectorAll('.btn-primary, .btn-submit').forEach(btn => {
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

    // --- Trust Bar Counter Animation ---
    const trustItems = document.querySelectorAll('.trust-item');
    const trustObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease both';
                entry.target.style.animationDelay = `${Array.from(trustItems).indexOf(entry.target) * 0.15}s`;
            }
        });
    }, { threshold: 0.3 });
    trustItems.forEach(item => trustObserver.observe(item));
});
