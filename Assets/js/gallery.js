
        // Gallery Tab Functionality with Proper Open/Close
        const galleryTabs = document.querySelectorAll('.gallery-tab');
        const galleryGrids = document.querySelectorAll('.gallery-grid');

        galleryTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const category = this.getAttribute('data-category');

                // If clicking the same tab, don't do anything
                if (this.classList.contains('active')) {
                    return;
                }

                // Add loading animation
                this.innerHTML = this.textContent + '<span class="loading"></span>';

                // Remove active class from all tabs and grids (close previous)
                galleryTabs.forEach(t => t.classList.remove('active'));
                galleryGrids.forEach(g => g.classList.remove('active'));

                // Simulate loading delay for smooth transition
                setTimeout(() => {
                    // Remove loading animation
                    const loading = this.querySelector('.loading');
                    if (loading) loading.remove();

                    // Add active class to clicked tab and corresponding grid (open new)
                    this.classList.add('active');
                    const targetGrid = document.querySelector(`.gallery-grid[data-category="${category}"]`);
                    if (targetGrid) {
                        targetGrid.classList.add('active');

                        // Trigger re-animation for tilted cards
                        const items = targetGrid.querySelectorAll('.gallery-item');
                        items.forEach((item, index) => {
                            item.style.animation = 'none';
                            item.offsetHeight; // Trigger reflow
                            item.style.animation = `tiltIn 0.8s ease-out forwards`;
                            item.style.animationDelay = `${(index + 1) * 0.1}s`;
                        });
                    }
                }, 300);
            });
        });

        // Add enhanced hover effects to place cards
        const placeCards = document.querySelectorAll('.place-card');
        placeCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function () {
                this.style.background = `linear-gradient(135deg, var(--tourism-accent) 0%, var(--tourism-gold) 100%)`;
                this.style.transform = `rotate(0deg) translateY(-15px) scale(1.05)`;
            });

            card.addEventListener('mouseleave', function () {
                this.style.background = `linear-gradient(135deg, var(--tourism-primary) 0%, var(--tourism-secondary) 100%)`;
                // Reset to original tilt
                const rotations = ['-3deg', '2deg', '2deg', '-2deg'];
                this.style.transform = `rotate(${rotations[index]}) translateY(0) scale(1)`;
            });
        });

        // Animate gallery items on click with ripple effect
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', function () {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    background-color: rgba(255, 255, 255, 0.7);
                    left: 50%;
                    top: 50%;
                    width: 20px;
                    height: 20px;
                    margin-left: -10px;
                    margin-top: -10px;
                    pointer-events: none;
                `;

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Smooth scroll reveal animation for sections
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

        // Observe sections for scroll animations
        document.querySelectorAll('.frame-5, .section-4').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s ease-out';
            observer.observe(section);
        });

        // Initialize first gallery animation on page load
        setTimeout(() => {
            const activeGrid = document.querySelector('.gallery-grid.active');
            if (activeGrid) {
                const items = activeGrid.querySelectorAll('.gallery-item');
                items.forEach((item, index) => {
                    item.style.animationDelay = `${(index + 1) * 0.1}s`;
                });
            }
        }, 500);

        // Enhanced star animation on page load
        setTimeout(() => {
            const stars = document.querySelectorAll('.star');
            stars.forEach((star, index) => {
                star.style.animationDelay = `${index * 0.2}s`;
            });
        }, 1000);
   