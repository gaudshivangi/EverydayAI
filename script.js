/**
 * Everyday AI — Main JavaScript
 * Digital Literacy Program
 * Author: Ekta Pandey
 */

// ===================================
// DOM Ready
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    setActiveNavLink();
    initCounterAnimation();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
    initTypewriter();
    initParticles();
    createScrollToTopButton();
});

// ===================================
// Navigation Menu Toggle
// ===================================

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===================================
// Active Nav Link
// ===================================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===================================
// Navbar — Shrink + Glow on Scroll
// ===================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const current = window.pageYOffset;

        // Shrink effect
        if (current > 60) {
            navbar.style.background    = 'rgba(10,14,26,0.97)';
            navbar.style.borderBottom  = '1px solid rgba(0,229,255,0.25)';
            navbar.style.boxShadow     = '0 4px 30px rgba(0,229,255,0.08)';
        } else {
            navbar.style.background    = 'rgba(10,14,26,0.85)';
            navbar.style.borderBottom  = '1px solid rgba(0,229,255,0.15)';
            navbar.style.boxShadow     = '0 4px 24px rgba(0,0,0,0.3)';
        }

        // Hide on scroll down, show on scroll up
        if (current > lastScroll && current > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        navbar.style.transition = 'all 0.35s ease';
        lastScroll = current <= 0 ? 0 : current;
    }, { passive: true });
}

// ===================================
// Typewriter Effect (Hero)
// ===================================

function initTypewriter() {
    const el = document.querySelector('.hero h2');
    if (!el) return;

    const phrases = [
        'Digital Literacy Program on AI in Everyday Applications',
        'Understanding AI — Simply and Responsibly',
        'Empowering Communities Through AI Awareness',
    ];

    let phraseIndex = 0;
    let charIndex   = 0;
    let isDeleting  = false;
    const originalText = el.textContent.trim();

    // Only run on index page (hero h2 must exist)
    el.textContent = '';
    el.style.borderRight = '2px solid var(--primary-color)';
    el.style.display     = 'inline-block';
    el.style.animation   = 'none';  // remove fade-in so typewriter controls it
    el.style.opacity     = '1';

    function type() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 35 : 65;

        if (!isDeleting && charIndex === current.length) {
            speed = 2200;    // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting  = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 800);
}

// ===================================
// Counter Animation
// ===================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-target]');

    const animateCounter = (counter) => {
        const target    = parseInt(counter.getAttribute('data-target'));
        const duration  = 2000;
        const increment = target / (duration / 16);
        let current     = 0;

        const tick = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(tick);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        tick();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ===================================
// Smooth Scroll
// ===================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// ===================================
// Scroll Animations — staggered reveal
// ===================================

function initScrollAnimations() {
    const targets = document.querySelectorAll(
        '.glass-card, .intro-card, .obj-item, .scope-block, ' +
        '.objective-card, .stat-item, .outcome-item, .scope-category'
    );

    targets.forEach((el, i) => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = `opacity 0.55s ease ${(i % 4) * 0.1}s, transform 0.55s ease ${(i % 4) * 0.1}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
}

// ===================================
// Hero Particles (canvas)
// ===================================

function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
        opacity: 0.55;
    `;
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let W, H, particles;
    const COUNT = 70;

    function resize() {
        W = canvas.width  = hero.offsetWidth;
        H = canvas.height = hero.offsetHeight;
    }

    function Particle() {
        this.reset = function () {
            this.x    = Math.random() * W;
            this.y    = Math.random() * H;
            this.r    = Math.random() * 1.8 + 0.4;
            this.vx   = (Math.random() - 0.5) * 0.35;
            this.vy   = (Math.random() - 0.5) * 0.35;
            this.life = Math.random();
            this.color = Math.random() > 0.5
                ? `rgba(0,229,255,${Math.random() * 0.7 + 0.2})`
                : `rgba(167,139,250,${Math.random() * 0.5 + 0.15})`;
        };
        this.reset();
    }

    function init() {
        resize();
        particles = Array.from({ length: COUNT }, () => new Particle());
    }

    // Connect nearby particles with lines
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,229,255,${0.12 * (1 - dist / 120)})`;
                    ctx.lineWidth   = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        drawConnections();

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Wrap edges
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener('resize', () => { resize(); });
}

// ===================================
// Scroll-to-Top Button
// ===================================

function createScrollToTopButton() {
    const btn = document.createElement('button');
    btn.innerHTML   = '<i class="fas fa-arrow-up"></i>';
    btn.className   = 'scroll-to-top';
    btn.style.cssText = `
        position: fixed; bottom: 28px; right: 28px;
        width: 46px; height: 46px; border-radius: 50%;
        background: transparent;
        border: 1.5px solid rgba(0,229,255,0.4);
        color: var(--primary-color);
        font-size: 1rem;
        cursor: none;
        opacity: 0; pointer-events: none;
        transition: opacity 0.3s ease, transform 0.3s ease,
                    background 0.25s ease, border-color 0.25s ease;
        z-index: 998;
        backdrop-filter: blur(8px);
        box-shadow: 0 4px 20px rgba(0,229,255,0.15);
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 350) {
            btn.style.opacity       = '1';
            btn.style.pointerEvents = 'auto';
        } else {
            btn.style.opacity       = '0';
            btn.style.pointerEvents = 'none';
        }
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    btn.addEventListener('mouseenter', () => {
        btn.style.background   = 'rgba(0,229,255,0.12)';
        btn.style.borderColor  = 'rgba(0,229,255,0.9)';
        btn.style.transform    = 'translateY(-4px)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.background   = 'transparent';
        btn.style.borderColor  = 'rgba(0,229,255,0.4)';
        btn.style.transform    = 'translateY(0)';
    });
}

// ===================================
// Form Validation
// ===================================

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    let isValid = true;
    form.querySelectorAll('input[required], textarea[required]').forEach(input => {
        const empty = !input.value.trim();
        const badEmail = input.type === 'email' && input.value.trim() && !validateEmail(input.value);
        if (empty || badEmail) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    return isValid;
}

// ===================================
// Notification Toast
// ===================================

function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const note = document.createElement('div');
    note.className = 'notification';

    const isSuccess = type === 'success';
    note.style.cssText = `
        position: fixed; top: 80px; right: 24px;
        padding: 0.9rem 1.4rem;
        background: ${isSuccess ? 'rgba(0,229,255,0.1)' : 'rgba(239,68,68,0.1)'};
        color: ${isSuccess ? 'var(--primary-color)' : '#f87171'};
        border: 1px solid ${isSuccess ? 'rgba(0,229,255,0.35)' : 'rgba(239,68,68,0.35)'};
        border-radius: 10px;
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        font-size: 0.88rem; font-weight: 500;
        z-index: 9999;
        display: flex; align-items: center; gap: 0.6rem;
        transform: translateX(120%);
        transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    `;

    const icon = isSuccess ? 'fa-circle-check' : 'fa-circle-xmark';
    note.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    document.body.appendChild(note);

    // Slide in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => { note.style.transform = 'translateX(0)'; });
    });

    setTimeout(() => {
        note.style.transform = 'translateX(120%)';
        setTimeout(() => note.remove(), 400);
    }, 3200);
}

// ===================================
// Local Storage Helpers
// ===================================

const storage = {
    set: (key, value) => {
        try { localStorage.setItem(key, JSON.stringify(value)); return true; }
        catch (e) { console.error('Storage error:', e); return false; }
    },
    get: (key) => {
        try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : null; }
        catch (e) { console.error('Storage error:', e); return null; }
    },
    remove: (key) => {
        try { localStorage.removeItem(key); return true; }
        catch (e) { console.error('Storage error:', e); return false; }
    }
};

// ===================================
// Page Load
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// Export (Node / bundler compat)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateEmail, validateForm, showNotification, storage };
}
