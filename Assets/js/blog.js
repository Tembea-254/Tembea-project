 // Animation observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach((card, index) => {
            card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
            observer.observe(card);
        });

        // See More/Show Less functionality
        const seeMoreBtn = document.querySelector('.see-more-btn');
        const showLessBtn = document.querySelector('.show-less-btn');
        const moreBlogs = document.querySelector('.more-blogs');

        seeMoreBtn.addEventListener('click', () => {
            moreBlogs.classList.remove('hidden');
            moreBlogs.style.opacity = '0';
            moreBlogs.style.transform = 'translateY(20px)';
            setTimeout(() => {
                moreBlogs.style.transition = 'all 0.5s ease';
                moreBlogs.style.opacity = '1';
                moreBlogs.style.transform = 'translateY(0)';
            }, 100);
            seeMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'block';
        });

        showLessBtn.addEventListener('click', () => {
            moreBlogs.style.opacity = '0';
            moreBlogs.style.transform = 'translateY(20px)';
            setTimeout(() => {
                moreBlogs.classList.add('hidden');
                moreBlogs.style.transition = '';
            }, 500);
            showLessBtn.style.display = 'none';
            seeMoreBtn.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });