// Footer Section JavaScript
class FooterManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupNewsletterForm();
        this.setupBackToTop();
        this.setupAnimations();
        this.setupSocialLinks();
    }

    setupNewsletterForm() {
        // Handle both forms - the one in footer section and the main footer
        const newsletterForms = document.querySelectorAll('#newsletterForm, #newsletterFormMain');
        
        newsletterForms.forEach(form => {
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();

                    const btn = e.target.querySelector('.btn-newsletter');
                    const input = e.target.querySelector('input[type="email"]');
                    const originalBtnContent = btn.innerHTML;

                    // Show loading state
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    btn.disabled = true;

                    // Simulate API call
                    setTimeout(() => {
                        btn.innerHTML = '<i class="fas fa-check-circle"></i>';
                        btn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                        input.value = '';

                        // Show success message
                        const successMsg = document.createElement('div');
                        successMsg.className = 'alert alert-success alert-dismissible fade show mt-2';
                        successMsg.innerHTML = `
                            <small><i class="fas fa-check-circle me-1"></i>Thanks for subscribing!</small>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
                        `;
                        e.target.appendChild(successMsg);

                        // Reset button after 3 seconds
                        setTimeout(() => {
                            btn.innerHTML = originalBtnContent;
                            btn.disabled = false;
                            btn.style.background = '';
                            if (successMsg.parentNode) {
                                successMsg.remove();
                            }
                        }, 3000);
                    }, 2000);
                });
            }
        });
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
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

        // Observe footer sections
        const footerSections = document.querySelectorAll('.footer-section .footer-column, .footer-section .footer-logo');
        footerSections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(40px)';
            section.style.transition = `all 0.8s ease ${index * 0.2}s`;
            observer.observe(section);
        });

        // Add floating animation to footer elements
        const floatingElements = document.querySelectorAll('.footer-section .social-icon, .footer-section .newsletter-form');
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }

    setupSocialLinks() {
        // Add hover effects to social icons
        const socialIcons = document.querySelectorAll('.footer-section .social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function () {
                this.style.animationPlayState = 'paused';
            });

            icon.addEventListener('mouseleave', function () {
                this.style.animationPlayState = 'running';
            });
        });

        // Footer links hover effect
        const footerLinks = document.querySelectorAll('.footer-section .footer-links a');
        footerLinks.forEach(link => {
            link.addEventListener('mouseenter', function () {
                this.style.paddingLeft = '10px';
            });

            link.addEventListener('mouseleave', function () {
                this.style.paddingLeft = '0';
            });
        });

        // Newsletter input focus effects
        const newsletterInput = document.querySelector('.footer-section .newsletter-form input');
        if (newsletterInput) {
            newsletterInput.addEventListener('focus', function () {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.boxShadow = '0 0 20px rgba(218, 165, 32, 0.3)';
            });

            newsletterInput.addEventListener('blur', function () {
                this.parentElement.style.transform = 'scale(1)';
                this.parentElement.style.boxShadow = 'none';
            });
        }
    }
}

// Export for use in main.js
window.FooterManager = FooterManager;
