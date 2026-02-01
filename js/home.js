// Home page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initHomePage();
});

function initHomePage() {
    // Add interactive effects to tech stack items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
            enhanceValueSection();

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Download resume button functionality
    const downloadResumeBtns = document.querySelectorAll('.btn-secondary');
    downloadResumeBtns.forEach(btn => {
        if (btn.textContent.includes('Download Resume')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create download simulation
                const downloadText = document.createElement('div');
                downloadText.textContent = 'Resume downloading...';
                downloadText.style.position = 'fixed';
                downloadText.style.bottom = '20px';
                downloadText.style.right = '20px';
                downloadText.style.background = 'var(--dark-bg)';
                downloadText.style.color = 'var(--text)';
                downloadText.style.padding = '1rem 1.5rem';
                downloadText.style.borderRadius = '8px';
                downloadText.style.border = '1px solid var(--primary)';
                downloadText.style.zIndex = '1000';
                downloadText.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                
                document.body.appendChild(downloadText);
                
                setTimeout(() => {
                    downloadText.remove();
                    
                    // Show success message
                    const successText = document.createElement('div');
                    successText.textContent = '✓ Resume downloaded successfully!';
                    successText.style.position = 'fixed';
                    successText.style.bottom = '20px';
                    successText.style.right = '20px';
                    successText.style.background = 'var(--success)';
                    successText.style.color = 'white';
                    successText.style.padding = '1rem 1.5rem';
                    successText.style.borderRadius = '8px';
                    successText.style.zIndex = '1000';
                    successText.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                    
                    document.body.appendChild(successText);
                    
                    setTimeout(() => {
                        successText.remove();
                    }, 3000);
                }, 1500);
            });
        }
    });
    
    // Add typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-title .subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
    // Start typing after a delay
    setTimeout(typeWriter, 1000);
    }
    
    // Create floating particles effect (alternative to particles.js)
    createFloatingParticles();
}

// Create subtle floating particles
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    particlesContainer.style.overflow = 'hidden';
    
    document.body.appendChild(particlesContainer);
    
    const particleCount = 30;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(14, 165, 233, 0.2)';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px rgba(14, 165, 233, 0.5)';
        
        // Random starting position
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        particle.style.left = startX + '%';
        particle.style.top = startY + '%';
        
        particlesContainer.appendChild(particle);
        
        particles.push({
            element: particle,
            x: startX,
            y: startY,
            speedX: (Math.random() - 0.5) * 0.1,
            speedY: (Math.random() - 0.5) * 0.1,
            radius: Math.random() * 3 + 1
        });
    }
    
    // Animate particles
    function animateParticles() {
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > 100) p.speedX *= -1;
            if (p.y < 0 || p.y > 100) p.speedY *= -1;
            
            // Keep within bounds
            p.x = Math.max(0, Math.min(100, p.x));
            p.y = Math.max(0, Math.min(100, p.y));
            
            p.element.style.left = p.x + '%';
            p.element.style.top = p.y + '%';
            
            // Subtle opacity pulse
            const opacity = 0.1 + Math.sin(Date.now() * 0.001 + p.x) * 0.1;
            p.element.style.opacity = opacity;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

function enhanceValueSection() {
    const valueItems = document.querySelectorAll('.value-item');
    
    valueItems.forEach((item, index) => {
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.value-icon');
            const title = this.querySelector('.value-title');
            
            icon.style.animation = 'iconFloat 1s ease-in-out infinite, glowPulse 1s ease-in-out infinite';
            title.style.color = 'var(--primary)';
            title.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.value-icon');
            const title = this.querySelector('.value-title');
            
            icon.style.animation = `iconFloat 3s ease-in-out infinite ${index * 0.6}s`;
            title.style.color = '';
            title.style.transform = '';
        });
        
        // Add click effect
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}