// Partnership Section JavaScript
class PartnershipManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnimations();
        this.setupLogoCarousel();
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

        const sectionHeader = document.querySelector('.partnership-section .section-header');
        if (sectionHeader) {
            sectionHeader.style.opacity = '0';
            sectionHeader.style.transform = 'translateY(40px)';
            sectionHeader.style.transition = 'all 0.8s ease';
            observer.observe(sectionHeader);
        }

        const logoContainer = document.querySelector('.logo-container');
        if (logoContainer) {
            logoContainer.style.opacity = '0';
            logoContainer.style.transform = 'translateY(40px)';
            logoContainer.style.transition = 'all 0.8s ease 0.3s';
            observer.observe(logoContainer);
        }
    }

    setupLogoCarousel() {
        const logoContainer = document.querySelector('.logo-container');
        const logoItems = document.querySelectorAll('.logo-item');
        
        if (logoContainer && logoItems.length > 0) {
            // Pause animation on hover
            logoContainer.addEventListener('mouseenter', () => {
                logoContainer.style.animationPlayState = 'paused';
            });

            logoContainer.addEventListener('mouseleave', () => {
                logoContainer.style.animationPlayState = 'running';
            });

            // Add individual hover effects to logo items
            logoItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'scale(1.1)';
                    item.style.zIndex = '10';
                });

                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'scale(1)';
                    item.style.zIndex = '1';
                });
            });
        }
    }
}

// Export for use in main.js
window.PartnershipManager = PartnershipManager;
