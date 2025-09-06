// Contact Section JavaScript
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactForm();
        this.setupAnimations();
        this.setupFormValidation();
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Enhanced form field animations
        const formControls = document.querySelectorAll('.contact-section .form-control, .contact-section .form-select');
        formControls.forEach(control => {
            control.addEventListener('focus', function () {
                this.parentElement.style.transform = 'translateY(-3px)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });

            control.addEventListener('blur', function () {
                this.parentElement.style.transform = 'translateY(0)';
            });

            control.addEventListener('input', function () {
                if (this.value.length > 0) {
                    this.style.borderColor = 'var(--tourism-secondary)';
                } else {
                    this.style.borderColor = '#e9ecef';
                }
            });
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const submitBtn = e.target.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';

            // Reset form
            e.target.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2500);
    }

    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe contact cards for staggered animation
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
            observer.observe(card);
        });

        // Smooth reveal animation for form
        const form = document.querySelector('.contact-form');
        if (form) {
            const formObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0) rotate(-2deg)';
                    }
                });
            });

            form.style.opacity = '0';
            form.style.transform = 'translateX(-60px) rotate(-10deg)';
            formObserver.observe(form);
        }
    }

    setupFormValidation() {
        // Add real-time validation feedback
        const requiredFields = document.querySelectorAll('.contact-section [required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '#28a745';
                }
            });
        });
    }
}

// Export for use in main.js
window.ContactManager = ContactManager;
