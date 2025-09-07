// contact.js
        // Enhanced form submission handling
        document.getElementById('contactForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = 'Sending...';

            // Simulate form submission
            setTimeout(() => {
                // Reset button
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent Successfully!';
                submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';

                // Reset form
                this.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2500);
        });

        // Enhanced form field animations
        const formControls = document.querySelectorAll('.form-control, .form-select');
        formControls.forEach(control => {
            control.addEventListener('focus', function () {
                this.parentElement.style.transform = 'translateY(-3px)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });

            control.addEventListener('blur', function () {
                this.parentElement.style.transform = 'translateY(0)';
            });

            // Add typing effect
            control.addEventListener('input', function () {
                if (this.value.length > 0) {
                    this.style.borderColor = 'var(--tourism-secondary)';
                } else {
                    this.style.borderColor = '#e9ecef';
                }
            });
        });

        // Enhanced scroll animations with stagger effect
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

        // Observe contact cards for staggered animation
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
            observer.observe(card);
        });

        // Parallax effect for background decorations
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.bg-decoration');
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        });

        // Add smooth reveal animation for form
        const form = document.querySelector('.contact-form');
        const formObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0) rotate(-3deg)';
                }
            });
        });

        form.style.opacity = '0';
        form.style.transform = 'translateX(-60px) rotate(-10deg)';
        formObserver.observe(form);

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

        // Add click ripple effect to buttons
        document.querySelectorAll('.btn-submit').forEach(button => {
            button.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple');
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
 