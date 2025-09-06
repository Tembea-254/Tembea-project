// Popular Destinations JavaScript
class PopularManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnimations();
        this.setupExpandableContent();
    }

    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInRotate 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const cards = document.querySelectorAll('.popular-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }

    setupExpandableContent() {
        const exploreBtn = document.querySelector('.explore-btn');
        const showLessBtn = document.querySelector('.show-less-btn');
        const moreCards = document.querySelector('.more-cards');

        if (exploreBtn && showLessBtn && moreCards) {
            exploreBtn.addEventListener('click', () => {
                moreCards.classList.remove('hidden');
                void moreCards.offsetWidth; // reflow for animation
                moreCards.classList.add('show');
                exploreBtn.style.display = 'none';
                showLessBtn.style.display = 'block';
            });

            showLessBtn.addEventListener('click', () => {
                moreCards.classList.remove('show');
                setTimeout(() => {
                    moreCards.classList.add('hidden');
                }, 500); // wait for transition
                showLessBtn.style.display = 'none';
                exploreBtn.style.display = 'block';
                
                // Scroll back to popular section
                const popularSection = document.querySelector('.popular-section');
                if (popularSection) {
                    popularSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
}

// Export for use in main.js
window.PopularManager = PopularManager;
