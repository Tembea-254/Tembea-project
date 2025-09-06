// Navigation functionality
class NavigationManager {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        // Attach click event to nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const sectionId = href.substring(1);
                    this.showSection(sectionId);
                    e.preventDefault();
                }
            });
        });

        // Add hover and active effects
        this.setupMouseEvents();
        
        // Show home section by default
        this.showSection('home');
    }

    showSection(sectionId) {
        console.log(`Switching to section: ${sectionId}`);
        
        this.sections.forEach(sec => {
            sec.classList.remove('active');
            sec.style.display = 'none';
            sec.style.opacity = '0';
            sec.style.transform = 'translateY(40px)';
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            
            // Use a small delay to ensure the display change takes effect
            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
                targetSection.style.transition = 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)';
            }, 10);
            
            // Handle home section video background
            if (sectionId === 'home') {
                this.activateHomeVideo();
                // Ensure typing animation is running on home section
                setTimeout(() => {
                    if (window.typingAnimation && window.typingAnimation.isInitialized) {
                        // Animation is already running
                        console.log('Typing animation already running');
                    } else if (window.typingAnimation) {
                        console.log('Starting typing animation for home section');
                        window.typingAnimation.restart();
                    }
                }, 100);
            } else {
                this.deactivateHomeVideo();
            }
            
            // Scroll to top for all sections
            window.scrollTo(0, 0);
            
            console.log(`Successfully switched to section: ${sectionId}`);
        } else {
            console.error(`Section with ID '${sectionId}' not found`);
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
