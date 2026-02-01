// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
});

function initScrollAnimations() {
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation for child elements
                if (entry.target.classList.contains('stagger-children')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animated');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
            
            // Fade out scroll indicator
            const scrollIndicator = heroSection.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                const opacity = 1 - (scrolled / 300);
                scrollIndicator.style.opacity = Math.max(opacity, 0);
            }
        }
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.project-card, .metric-card, .tech-category, .principle-card');
    cards.forEach(card => {
        card.classList.add('hover-lift', 'hover-glow');
    });
    
    // Add text gradient animation to specific elements
    const gradientElements = document.querySelectorAll('.hero-name, .metric-value');
    gradientElements.forEach(el => {
        el.classList.add('text-gradient-animate');
    });
    
    // Add animated background to certain sections
    const animatedBgSections = document.querySelectorAll('.hero-section, .cta-section');
    animatedBgSections.forEach(section => {
        section.classList.add('animated-bg');
    });
}

