// ScoutMe Platform JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            
            // Reset hamburger bars
            const bars = hamburger?.querySelectorAll('.bar');
            if (bars) {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            
            // Reset hamburger bars
            const bars = hamburger?.querySelectorAll('.bar');
            if (bars) {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        }
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('role-card') || 
                    entry.target.classList.contains('testimonial-card') || 
                    entry.target.classList.contains('pricing-card')) {
                    
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.role-card, .testimonial-card, .pricing-card, .section-title, .hero-content');
    animatedElements.forEach(el => observer.observe(el));
    
    // Role card interactions
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 215, 0, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: 50%;
                top: 50%;
                margin-left: -50px;
                margin-top: -50px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add click tracking
        card.addEventListener('click', function() {
            const role = this.dataset.role;
            console.log(`Role card clicked: ${role}`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Highlight popular features
            if (this.classList.contains('popular')) {
                const features = this.querySelectorAll('.pricing-features li');
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.transform = 'translateX(5px)';
                        feature.style.color = 'var(--primary-color)';
                    }, index * 50);
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const features = this.querySelectorAll('.pricing-features li');
            features.forEach(feature => {
                feature.style.transform = '';
                feature.style.color = '';
            });
        });
    });
    
    // Testimonial card rotation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function rotateTestimonials() {
        testimonialCards.forEach((card, index) => {
            card.style.opacity = index === currentTestimonial ? '1' : '0.7';
            card.style.transform = index === currentTestimonial ? 'scale(1.02)' : 'scale(1)';
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }
    
    // Start testimonial rotation
    if (testimonialCards.length > 0) {
        setInterval(rotateTestimonials, 4000);
    }
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(3px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
        
        // Add click ripple effect
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${rate * 0.5}px)`;
            heroImage.style.transform = `translateY(${rate * 0.3}px)`;
        }
    });
    
    // Dynamic counter animation for pricing
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Animate pricing numbers when they come into view
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const amount = entry.target.querySelector('.amount');
                if (amount && !amount.classList.contains('animated')) {
                    amount.classList.add('animated');
                    const target = parseInt(amount.textContent);
                    amount.textContent = '0';
                    animateCounter(amount, target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    pricingCards.forEach(card => priceObserver.observe(card));
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Form validation (if forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimized scroll handler
    const optimizedScrollHandler = debounce(function() {
        // Any additional scroll-based functionality
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        // Update progress indicator if needed
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    }, 10);
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Stagger animation for hero elements
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in-up');
            }, index * 200);
        });
    });
    
    // Error handling for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
    
    // Service Worker registration (for future PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // navigator.serviceWorker.register('/sw.js')
            //     .then(registration => console.log('SW registered'))
            //     .catch(error => console.log('SW registration failed'));
        });
    }
    
    console.log('ScoutMe platform initialized successfully!');
});

// CSS animations for JavaScript-triggered effects
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--accent-color) !important;
        outline-offset: 2px !important;
    }
    
    .loaded .hero-title,
    .loaded .hero-subtitle,
    .loaded .hero-buttons {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--gradient-accent);
        z-index: 9999;
        transition: width 0.1s ease;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    /* Enhanced focus states */
    .btn:focus-visible {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.2);
    }
    
    /* Smooth transitions for all interactive elements */
    .role-card,
    .testimonial-card,
    .pricing-card,
    .btn {
        will-change: transform;
    }
    
    /* Reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
        .fade-in-up {
            animation: none !important;
        }
        
        .ripple {
            display: none !important;
        }
        
        * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
        }
    }
`;

document.head.appendChild(style);



    // Theme Toggle
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === "dark-theme") {
            themeToggleBtn.querySelector("i").classList.replace("fa-moon", "fa-sun");
        }
    }

    themeToggleBtn?.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        let theme = "light-theme";
        if (document.body.classList.contains("dark-theme")) {
            theme = "dark-theme";
            themeToggleBtn.querySelector("i").classList.replace("fa-moon", "fa-sun");
        } else {
            themeToggleBtn.querySelector("i").classList.replace("fa-sun", "fa-moon");
        }
        localStorage.setItem("theme", theme);
    });

    // Fix for pricing display issue (re-animating on theme change)
    const pricingCards = document.querySelectorAll(".pricing-card");
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const amount = entry.target.querySelector(".amount");
                if (amount && !amount.classList.contains("animated")) {
                    amount.classList.add("animated");
                    const target = parseInt(amount.textContent.replace(/,/g, "")); // Remove commas for parsing
                    amount.textContent = "0";
                    animateCounter(amount, target);
                }
            }
        });
    }, { threshold: 0.5 });

    pricingCards.forEach(card => priceObserver.observe(card));

    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString(); // Add toLocaleString for comma formatting
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString(); // Add toLocaleString for comma formatting
            }
        }
        
        updateCounter();
    }

    // Re-initialize pricing animation on theme change to ensure correct display
    themeToggleBtn?.addEventListener("click", () => {
        pricingCards.forEach(card => {
            const amount = card.querySelector(".amount");
            if (amount) {
                amount.classList.remove("animated"); // Remove animated class to re-trigger animation
                const target = parseInt(amount.textContent.replace(/,/g, ""));
                amount.textContent = "0";
                animateCounter(amount, target);
            }
        });
    });


