    // Newsletter form submission
        document.getElementById('newsletterForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = this.querySelector('.btn-newsletter');
            const input = this.querySelector('input[type="email"]');
            const originalBtnContent = btn.innerHTML;

            // Show loading state
            btn.innerHTML = '<i class="bi bi-hourglass-split"></i>';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="bi bi-check-circle"></i>';
                btn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                input.value = '';

                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success alert-dismissible fade show mt-2';
                successMsg.innerHTML = `
                    <small><i class="bi bi-check-circle me-1"></i>Thanks for subscribing!</small>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
                `;
                this.appendChild(successMsg);

                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalBtnContent;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 2000);
        });

        // Back to top functionality
        const backToTopBtn = document.getElementById('backToTop');

        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Animate elements on scroll
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

        // Observe footer sections
        document.querySelectorAll('.footer-section').forEach(section => {
            observer.observe(section);
        });

        // Add hover effects to social icons
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function () {
                this.style.animationPlayState = 'paused';
            });

            icon.addEventListener('mouseleave', function () {
                this.style.animationPlayState = 'running';
            });
        });

        // Footer links hover effect
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            link.addEventListener('mouseenter', function () {
                this.style.paddingLeft = '10px';
            });

            link.addEventListener('mouseleave', function () {
                this.style.paddingLeft = '0';
            });
        });

        // Add floating animation to footer elements
        const floatingElements = document.querySelectorAll('.social-icon, .newsletter-form');
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
            element.style.animation += ', float 6s ease-in-out infinite';
        });

        // Newsletter input focus effects
        const newsletterInput = document.querySelector('.newsletter-form input');
        newsletterInput.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.boxShadow = '0 0 20px rgba(218, 165, 32, 0.3)';
        });

        newsletterInput.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
            this.parentElement.style.boxShadow = 'none';
        });
  