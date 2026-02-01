// Skills page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initSkillsPage();
});

function initSkillsPage() {
    initTechTags();
    initPracticeCards();
    initToolTags();
    initSoftSkills();
    initLanguageCards();
    initVisualAnimation();
    initProgressBars();
}

// Tech tags interaction
function initTechTags() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(14, 165, 233, 0.2)';
            
            // Add electric effect
            this.style.animation = 'electricPulse 1s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.animation = '';
        });
        
        // Click to highlight
        tag.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Remove highlight from all tags
            techTags.forEach(t => {
                t.classList.remove('highlighted');
                t.style.background = '';
            });
            
            // Add highlight to clicked tag
            this.classList.add('highlighted');
            this.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
            this.style.color = 'white';
            this.style.borderColor = 'transparent';
            
            // Remove highlight after 2 seconds
            setTimeout(() => {
                this.classList.remove('highlighted');
                this.style.background = '';
                this.style.color = '';
                this.style.borderColor = '';
            }, 2000);
        });
    });
}

// Practice cards interaction
function initPracticeCards() {
    const practiceItems = document.querySelectorAll('.practice-item');
    
    practiceItems.forEach(item => {
        const icon = item.querySelector('.practice-icon');
        
        item.addEventListener('mouseenter', function() {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.animation = 'iconFloat 1s ease-in-out infinite, glowPulse 2s ease-in-out infinite';
        });
        
        item.addEventListener('mouseleave', function() {
            icon.style.transform = '';
            icon.style.animation = 'iconFloat 3s ease-in-out infinite';
        });
        
        // Add click effect
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            icon.style.transform = 'scale(1.15)';
            
            setTimeout(() => {
                this.style.transform = '';
                icon.style.transform = '';
            }, 200);
        });
    });
}

// Tool tags interaction
function initToolTags() {
    const toolTags = document.querySelectorAll('.tool-tag');
    
    toolTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Soft skills interaction
function initSoftSkills() {
    const softSkillItems = document.querySelectorAll('.soft-skill-item');
    
    softSkillItems.forEach(item => {
        const icon = item.querySelector('.soft-skill-icon');
        
        item.addEventListener('mouseenter', function() {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.boxShadow = '0 10px 20px rgba(14, 165, 233, 0.3)';
            
            // Add pulse animation
            item.style.animation = 'pulse 1s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            icon.style.transform = '';
            icon.style.boxShadow = '';
            item.style.animation = '';
        });
    });
}

// Language cards interaction
function initLanguageCards() {
    const languageCards = document.querySelectorAll('.language-card');
    
    languageCards.forEach(card => {
        const icon = card.querySelector('.language-icon');
        
        card.addEventListener('mouseenter', function() {
            icon.style.transform = 'scale(1.2) rotateY(180deg)';
            icon.style.boxShadow = '0 10px 25px rgba(14, 165, 233, 0.3)';
            
            // Animate the level indicator
            const level = card.querySelector('.language-level');
            level.style.transform = 'scale(1.1)';
            level.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
            level.style.color = 'white';
        });
        
        card.addEventListener('mouseleave', function() {
            icon.style.transform = '';
            icon.style.boxShadow = '';
            
            const level = card.querySelector('.language-level');
            level.style.transform = '';
            level.style.background = '';
            level.style.color = '';
        });
    });
}

// Visual animation in header
function initVisualAnimation() {
    const dots = document.querySelectorAll('.dot');
    const lines = document.querySelectorAll('.line');
    
    // Animate dots with random movement
    dots.forEach(dot => {
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            dot.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            
            setTimeout(() => {
                dot.style.transform = dot.style.transform.replace(/translate\([^)]*\)/, '');
            }, 1000);
        }, 3000);
    });
    
    // Animate lines with opacity pulse
    lines.forEach(line => {
        setInterval(() => {
            line.style.opacity = Math.random() * 0.5 + 0.3;
            line.style.height = `${Math.random() * 50 + 100}%`;
        }, 2000);
    });
}

// Initialize progress bars for skills (visual representation)
function initProgressBars() {
    // Add CSS for progress bars
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .skill-category {
            position: relative;
            overflow: hidden;
        }
        
        .skill-category::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            transition: width 0.5s ease;
        }
        
        .skill-category:hover::after {
            width: 100%;
        }
        
        @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 10px rgba(14, 165, 233, 0.5); }
            50% { box-shadow: 0 0 20px rgba(14, 165, 233, 0.8); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(0.98); }
        }
    `;
    document.head.appendChild(progressStyle);
}

// Add CSS for electric effect
const electricStyle = document.createElement('style');
electricStyle.textContent = `
    @keyframes electricPulse {
        0%, 100% {
            box-shadow: 0 0 5px var(--primary), 0 0 10px var(--primary);
        }
        50% {
            box-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 30px var(--primary);
        }
    }
`;
document.head.appendChild(electricStyle);

// Initialize category icons animation
// window.addEventListener('load', function() {
//     const categoryIcons = document.querySelectorAll('.category-icon');
    
//     categoryIcons.forEach(icon => {
//         // Add random floating animation
//         setInterval(() => {
//             const randomX = (Math.random() - 0.5) * 5;
//             const randomY = (Math.random() - 0.5) * 5;
//             icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
//         }, 2000);
//     });
// });