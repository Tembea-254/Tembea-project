// popular.js
        document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.popular-card');
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInRotate 0.6s ease forwards';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            cards.forEach(card => observer.observe(card));

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
                    window.scrollTo({ top: document.querySelector('.popular-section').offsetTop, behavior: 'smooth' });
                });
            }
        });
  