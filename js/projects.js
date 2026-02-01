// Projects page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initProjectsPage();
});

function initProjectsPage() {
    initFiltering();
    initSearch();
    initProjectCards();
    initTypeBadges();
    initScrollEffects();
}

// Project filtering functionality
function initFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-detail, .personal-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projects.forEach(project => {
                const categories = project.getAttribute('data-categories').split(',');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    project.style.display = 'block';
                    
                    // Animate in
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
            
            // Animate filter button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const projects = document.querySelectorAll('.project-detail, .personal-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            projects.forEach(project => {
                const title = project.querySelector('.project-title, .personal-title').textContent.toLowerCase();
                const description = project.querySelector('.project-short-description, .personal-description').textContent.toLowerCase();
                const techStack = project.querySelectorAll('.tech-tag');
                let techText = '';
                techStack.forEach(tag => {
                    techText += tag.textContent.toLowerCase() + ' ';
                });
                
                if (searchTerm === '' || 
                    title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    techText.includes(searchTerm)) {
                    
                    project.style.display = 'block';
                    
                    // Animate in
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
}

// Project cards interaction
function initProjectCards() {
    const projectDetails = document.querySelectorAll('.project-detail');
    const personalCards = document.querySelectorAll('.personal-card');
    
    // Enterprise project details
    projectDetails.forEach(project => {
        project.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.project-badge');
            if (badge) {
                badge.style.transform = 'translateY(-3px) scale(1.05)';
            }
            
            // Highlight tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(-2px)';
            });
        });
        
        project.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.project-badge');
            if (badge) {
                badge.style.transform = '';
            }
            
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = '';
            });
        });
        
        // Click effect for detail cards
        const detailCards = project.querySelectorAll('.detail-card');
        detailCards.forEach(card => {
            card.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Pulse animation
                this.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            });
        });
    });
    
    // Personal cards
    personalCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.personal-badge');
            if (badge) {
                badge.style.transform = 'translateY(-3px) scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.personal-badge');
            if (badge) {
                badge.style.transform = '';
            }
        });
        
        // Expand/collapse functionality for mobile
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!e.target.closest('.personal-link')) {
                    this.classList.toggle('expanded');
                    
                    const content = this.querySelector('.personal-content');
                    if (this.classList.contains('expanded')) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    } else {
                        content.style.maxHeight = '';
                    }
                }
            }
        });
    });
}

// Type badges interaction
function initTypeBadges() {
    const typeBadges = document.querySelectorAll('.type-badge');
    
    typeBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Click to filter
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const category = this.classList[1]; // enterprise, integration, etc.
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
            
            if (filterBtn) {
                filterBtn.click();
                
                // Scroll to filters
                document.querySelector('.filters-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
}

// Scroll effects for project cards
// Scroll effects for project cards
function initScrollEffects() {
    let lastScrollTop = 0;
    const headerHeight = 100; // Approximate height of header section
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const filtersSection = document.querySelector('.filters-section');
        
        if (filtersSection) {
            // Check if we're in the header area (top of page)
            if (scrollTop <= headerHeight) {
                // At top of page - always show filters
                filtersSection.style.transform = 'translateY(0)';
                filtersSection.style.opacity = '1';
                filtersSection.style.transition = 'all 0.3s ease';
            } else {
                // Below header area - show/hide based on scroll direction
                if (scrollTop > lastScrollTop) {
                    // Scrolling down - hide filters
                    filtersSection.style.transform = 'translateY(-100%)';
                    filtersSection.style.opacity = '0';
                } else {
                    // Scrolling up - show filters
                    filtersSection.style.transform = 'translateY(0)';
                    filtersSection.style.opacity = '1';
                }
            }
        }
        
        lastScrollTop = scrollTop;
        
        // Parallax effect for header
        const header = document.querySelector('.projects-header');
        if (header) {
            const scrolled = scrollTop;
            const content = header.querySelector('.header-content');
            if (content) {
                content.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
        }
    });
    
    // Also add a check on initial load
    window.addEventListener('load', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const filtersSection = document.querySelector('.filters-section');
        
        if (filtersSection && scrollTop <= headerHeight) {
            filtersSection.style.transform = 'translateY(0)';
            filtersSection.style.opacity = '1';
        }
    });
}
// Add CSS for pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.98); }
    }
    
    .project-detail, .personal-card {
        transition: opacity 0.3s ease, transform 0.3s ease, display 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .personal-content {
            transition: max-height 0.3s ease;
            overflow: hidden;
        }
    }
`;
document.head.appendChild(pulseStyle);

// Initialize project counter animation
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
        }, 30);
    });
}

// Initialize when page loads
window.addEventListener('load', function() {
    animateCounters();
    
    // Add glow effect to featured badges
    const badges = document.querySelectorAll('.project-badge, .personal-badge');
    badges.forEach(badge => {
        setInterval(() => {
            const glow = badge.querySelector('.badge-glow') || badge;
            glow.style.filter = `blur(${10 + Math.random() * 5}px)`;
            glow.style.opacity = `${0.4 + Math.random() * 0.2}`;
        }, 2000);
    });
});