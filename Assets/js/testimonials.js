// Testimonials Section JavaScript
class TestimonialsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnimations();
        this.setupCarousel();
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

        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
            observer.observe(card);
        });
    }

    setupCarousel() {
        // Initialize Bootstrap carousel with custom settings
        const carousel = document.getElementById('testimonialCarousel');
        if (carousel) {
            // Add pause on hover
            carousel.addEventListener('mouseenter', () => {
                const bsCarousel = bootstrap.Carousel.getInstance(carousel);
                if (bsCarousel) {
                    bsCarousel.pause();
                }
            });

            carousel.addEventListener('mouseleave', () => {
                const bsCarousel = bootstrap.Carousel.getInstance(carousel);
                if (bsCarousel) {
                    bsCarousel.cycle();
                }
            });

            // Add custom slide transition effects
            carousel.addEventListener('slide.bs.carousel', (event) => {
                const activeCards = event.relatedTarget.querySelectorAll('.testimonial-card');
                activeCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(40px)';
                    setTimeout(() => {
                        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                });
            });
        }
    }
}

// Export for use in main.js
window.TestimonialsManager = TestimonialsManager;
