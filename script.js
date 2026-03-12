/**
 * CREAZIFY - Conversion Engineering Core Script
 * Year 2026 Standards
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it's revealed, we don't need to observe it anymore
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for fixed nav
                    behavior: 'smooth'
                });
            }

            // Re-evaluating active offsets and close states for anchor links natively
            // (Previously mobile menu close block was here, now handled natively via scrolling nav)
        });
    });

    // 4. Optimized Background & Nav Scroll Handling
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.pageYOffset;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Throttle heavy operations
                highlightNav();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    const sections = ['problem', 'lab', 'process'];
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let current = '';
        const scrollPos = window.pageYOffset + 150; // Offset for detection

        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = id;
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // 5. Throttled Mouse Interactions (Ultra Optimized)
    const cursor = document.getElementById('custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    let mx = 0, my = 0;
    let cx = 0, cy = 0;
    let mouseActive = false;

    // Efficiency Engine: Only update cards that are VISIBLE to save CPU
    const cards = document.querySelectorAll('.bento-card, .comp-card');
    const visibleCards = new Set();

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) visibleCards.add(entry.target);
            else visibleCards.delete(entry.target);
        });
    }, { threshold: 0.01 });

    cards.forEach(card => cardObserver.observe(card));

    const handleMouseMove = (e) => {
        mx = e.clientX;
        my = e.clientY;

        if (!mouseActive) {
            window.requestAnimationFrame(() => {
                visibleCards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty('--mouse-x', `${mx - rect.left}px`);
                    card.style.setProperty('--mouse-y', `${my - rect.top}px`);
                });
                mouseActive = false;
            });
            mouseActive = true;
        }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Strategy Lab Scrolling Logic
    // All buttons with trigger-booking will scroll to the inline lab
    const bookingButtons = document.querySelectorAll('.trigger-booking');
    bookingButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('booking-lab');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    // Optimized Animation Loop for Cursor (Tez & Snappy)
    function render() {
        // High-rate interpolation for a fast 'Aura' feel
        cx += (mx - cx) * 0.4;
        cy += (my - cy) * 0.4;

        if (follower) {
            // Hardware acceleration (translate3d) for zero-lag
            follower.style.transform = `translate3d(${cx - 30}px, ${cy - 30}px, 0)`;
        }
        requestAnimationFrame(render);
    }
    render();

    // Dynamic Cursor State
    const interactables = document.querySelectorAll('a, button, .bento-card, .btn-primary, .btn-outline');
    interactables.forEach(item => {
        item.addEventListener('mouseenter', () => cursor.classList.add('active'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-outline');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
            btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });
    });

    // 6. Portfolio / Lab section interaction
    // We can add a "shimmer" effect to the blurred items
    const masonryItems = document.querySelectorAll('.masonry-item');
    masonryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 100}ms`;
        // Randomized pulse animation
        setInterval(() => {
            item.style.opacity = 0.5 + Math.random() * 0.5;
        }, 2000 + Math.random() * 3000);
    });

});
