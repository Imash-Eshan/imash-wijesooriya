// Contact page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initContactPage();
});

function initContactPage() {
    initFormValidation();
    initFormSubmission();
    initContactMethods();
    initAvailabilityCards();
    initLocationCard();
}

// Form validation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('.form-input');
    const errorMessages = form.querySelectorAll('.error-message');
    
    inputs.forEach((input, index) => {
        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        // Blur validation
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Focus effect
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('.input-focus-line').style.width = '100%';
            clearError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + 'Error');
    
    // Clear previous error
    clearError(field);
    
    // Check required fields
    if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Message length validation
    if (field.id === 'message' && value) {
        if (value.length < 10) {
            showError(field, 'Message should be at least 10 characters');
            return false;
        }
    }
    
    return true;
}

function showError(field, message) {
    const errorElement = document.getElementById(field.id + 'Error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Add error styling to input
    field.style.borderColor = 'var(--danger)';
    field.parentElement.querySelector('.input-focus-line').style.background = 'var(--danger)';
    
    // Shake animation
    field.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

function clearError(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    
    // Reset input styling
    field.style.borderColor = '';
    field.parentElement.querySelector('.input-focus-line').style.background = 
        'linear-gradient(90deg, var(--primary), var(--secondary))';
}

// Form submission
function initFormSubmission() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = form.querySelectorAll('.form-input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            // Shake form for error
            form.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                form.style.animation = '';
            }, 500);
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Hide any previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Simulate API call (replace with actual form submission)
        setTimeout(() => {
            // For demo purposes, we'll randomly show success or error
            const isSuccess = Math.random() > 0.2; // 80% success rate for demo
            
            if (isSuccess) {
                // Show success message
                successMessage.style.display = 'flex';
                form.reset();
                
                // Reset focus line widths
                const focusLines = form.querySelectorAll('.input-focus-line');
                focusLines.forEach(line => {
                    line.style.width = '0';
                });
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                // Show error message
                errorMessage.style.display = 'flex';
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Reset button
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Contact methods interaction
function initContactMethods() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        const icon = method.querySelector('.method-icon');
        const link = method.querySelector('.method-link');
        
        method.addEventListener('mouseenter', function() {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
            
            // Pulse animation for link
            link.style.animation = 'pulse 1s ease';
        });
        
        method.addEventListener('mouseleave', function() {
            icon.style.transform = '';
            icon.style.boxShadow = '';
            link.style.animation = '';
        });
        
        // Click effect
        method.addEventListener('click', function(e) {
            if (!e.target.closest('.method-link')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });
}

// Availability cards interaction
// Availability cards interaction
function initAvailabilityCards() {
    const availabilityItems = document.querySelectorAll('.availability-item');
    
    availabilityItems.forEach(item => {
        const icon = item.querySelector('.availability-icon');
        
        item.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.animation = 'iconFloat 1s ease-in-out infinite';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = '';
                icon.style.animation = '';
            }
        });
    });
}

// Location card interaction
function initLocationCard() {
    const locationCard = document.querySelector('.location-card');
    const statusDot = document.querySelector('.status-dot');
    
    if (locationCard) {
        locationCard.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.location-icon');
            icon.style.transform = 'scale(1.1) rotate(10deg)';
            icon.style.boxShadow = '0 10px 25px rgba(14, 165, 233, 0.3)';
            
            // Speed up status dot animation
            statusDot.style.animationDuration = '1s';
        });
        
        locationCard.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.location-icon');
            icon.style.transform = '';
            icon.style.boxShadow = '';
            statusDot.style.animationDuration = '2s';
        });
    }
}

// Visual effects
// Add CSS animations
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes iconFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .contact-method, .availability-item, .location-card {
        cursor: pointer;
    }
`;
document.head.appendChild(contactStyles);

// Initialize when page loads
window.addEventListener('load', function() {
    // Add subtle parallax to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.contact-header');
        
        if (header) {
            const content = header.querySelector('.header-content');
            if (content) {
                content.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
        }
    });
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(e) {
    e.preventDefault(); // prevent default page reload

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            document.getElementById("successMessage").style.display = "block";
            document.getElementById("errorMessage").style.display = "none";
            form.reset();
        } else {
            throw new Error("Form submission failed.");
        }
    } catch (error) {
        document.getElementById("successMessage").style.display = "none";
        document.getElementById("errorMessage").style.display = "block";
        console.error(error);
    }
});
