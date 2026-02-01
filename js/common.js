// Common functionality for all pages

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize common components
    initNavbar();
    initAnimations();
    initButtons();
    initElectricEffects();
    
    // Add page load class for initial animations
    document.body.classList.add('page-load');
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            if (navMenu.style.display === 'flex') {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.right = '0';
                navMenu.style.background = 'rgba(10, 10, 15, 0.95)';
                navMenu.style.backdropFilter = 'blur(10px)';
                navMenu.style.padding = '2rem';
                navMenu.style.borderRadius = '0 0 0 12px';
                navMenu.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                navMenu.style.borderTop = 'none';
                navMenu.style.gap = '1.5rem';
                navMenu.style.width = '200px';
            }
        });
        
        // Close menu on link click
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
            });
        });
        
        // Responsive menu handling
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.style.display = 'flex';
                navMenu.style.position = 'static';
                navMenu.style.background = 'transparent';
                navMenu.style.padding = '0';
                navMenu.style.flexDirection = 'row';
                navMenu.style.width = 'auto';
                navMenu.style.border = 'none';
            } else {
                navMenu.style.display = 'none';
            }
        });
    }
}

// Button hover effects
function initButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.2)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            ripple.style.pointerEvents = 'none';
            
            e.target.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Electric effects for certain elements
function initElectricEffects() {
    // Add electric effect to certain elements on hover
    const electricElements = document.querySelectorAll('.project-card, .tech-category, .principle-card');
    
    electricElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.classList.add('electric-effect');
        });
        
        el.addEventListener('mouseleave', function() {
            this.classList.remove('electric-effect');
        });
    });
}

// Initialize animations
function initAnimations() {
    // Will be overridden by animations.js
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add CSS for loaded images
const lazyLoadStyle = document.createElement('style');
lazyLoadStyle.textContent = `
    img[data-src] {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(lazyLoadStyle);