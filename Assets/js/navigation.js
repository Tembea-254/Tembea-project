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
        this.sections.forEach(sec => {
            if (sec.id === sectionId) {
                sec.style.display = 'block';
                sec.style.opacity = '1';
                sec.style.transform = 'translateY(0)';
                sec.style.transition = 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)';
                
                // Handle home section video background
                if (sectionId === 'home') {
                    this.activateHomeVideo();
                } else {
                    this.deactivateHomeVideo();
                }
            } else {
                sec.style.display = 'none';
                sec.style.opacity = '0';
                sec.style.transform = 'translateY(40px)';
            }
        });
        window.scrollTo(0, 0);
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
