// About page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initAboutPage();
});

function initAboutPage() {
    initTimeline();
    initTechItems();
    initEducationCards();
    initImageHover();
}

// Timeline animations
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            dot.style.transform = 'scale(1.2)';
            content.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            dot.style.transform = 'scale(1)';
            content.style.boxShadow = '';
        });
        
        // Add click effect
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
            const contributions = this.querySelector('.timeline-contributions');
            
            if (this.classList.contains('expanded')) {
                contributions.style.maxHeight = contributions.scrollHeight + 'px';
                contributions.style.opacity = '1';
            } else {
                contributions.style.maxHeight = '0';
                contributions.style.opacity = '0';
            }
        });
        
        // Initially hide contributions on mobile
        if (window.innerWidth <= 768) {
            const contributions = item.querySelector('.timeline-contributions');
            contributions.style.maxHeight = '0';
            contributions.style.opacity = '0';
            contributions.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
            contributions.style.overflow = 'hidden';
        }
    });
}

// Tech items interaction
function initTechItems() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(14, 165, 233, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add click effect
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Visual feedback
            const originalBg = this.style.background;
            this.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.style.background = originalBg;
                this.style.color = '';
            }, 300);
        });
    });
}

// Education cards interaction
function initEducationCards() {
    const educationCards = document.querySelectorAll('.education-content, .languages-content');
    
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Profile image hover effect
function initImageHover() {
    const imageFrame = document.querySelector('.image-frame');
    const profileImage = document.querySelector('.profile-image');
    const frameGlow = document.querySelector('.frame-glow');
    
    if (imageFrame && profileImage && frameGlow) {
        imageFrame.addEventListener('mouseenter', function() {
            profileImage.style.transform = 'scale(1.05)';
            frameGlow.style.opacity = '0.4';
            frameGlow.style.filter = 'blur(30px)';
            
            // Add subtle rotation
            this.style.transform = 'rotate(2deg)';
        });
        
        imageFrame.addEventListener('mouseleave', function() {
            profileImage.style.transform = '';
            frameGlow.style.opacity = '0.2';
            frameGlow.style.filter = 'blur(20px)';
            this.style.transform = '';
        });
    }
}

// Add parallax effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.about-header');
    const scrolled = window.pageYOffset;
    
    if (header) {
        const content = header.querySelector('.header-content');
        if (content) {
            content.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
});

// Initialize animation for philosophy icons
function animatePhilosophyIcons() {
    const philosophyIcons = document.querySelectorAll('.philosophy-icon');
    
    philosophyIcons.forEach((icon, index) => {
        // Add random floating animation
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 5;
            const randomY = (Math.random() - 0.5) * 5;
            icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 500);
    });
}

// Call after page loads
window.addEventListener('load', function() {
    animatePhilosophyIcons();
});