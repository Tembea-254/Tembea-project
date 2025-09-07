// Navigation functionality
class NavigationManager {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        // Attach click event to nav links for smooth scrolling
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default hash behavior
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const sectionId = href.substring(1);
                    this.scrollToSection(sectionId);
                }
            });
        });

        // Add hover and active effects
        this.setupMouseEvents();

        // Ensure home video is active if starting on home
        if (window.location.hash === '#home' || !window.location.hash) {
            this.activateHomeVideo();
        }
    }

    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });

            // Handle home section video background
            if (sectionId === 'home') {
                this.activateHomeVideo();
            } else {
                this.deactivateHomeVideo();
            }

            // Update active nav link
            this.navLinks.forEach(link => {
                link.classList.toggle('nav-active', link.getAttribute('href') === `#${sectionId}`);
            });
        }
    }

    activateHomeVideo() {
        const video1 = document.getElementById('video1');
        const video2 = document.getElementById('video2');
        if (video1) {
            video1.style.opacity = '1';
            video1.style.zIndex = '-1';
        }
        // Start video switching interval
        if (!window.videoSwitchInterval) {
            window.videoSwitchInterval = setInterval(() => {
                window.videoManager?.switchVideo();
            }, 15000);
        }
    }

    deactivateHomeVideo() {
        // Stop video switching when not on home
        if (window.videoSwitchInterval) {
            clearInterval(window.videoSwitchInterval);
            window.videoSwitchInterval = null;
        }
    }

    setupMouseEvents() {
        this.navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.classList.add('nav-hover');
            });
            
            link.addEventListener('mouseleave', () => {
                link.classList.remove('nav-hover');
            });
            
            link.addEventListener('mousedown', () => {
                link.classList.add('nav-active');
            });
            
            link.addEventListener('mouseup', () => {
                link.classList.remove('nav-active');
            });
        });
    }
}

// Export for use in main.js
window.NavigationManager = NavigationManager;
