// About section navigation and management
class AboutManager {
    constructor() {
        this.current = 0;
        this.interval = null;
        this.isUserInteracting = false;
        this.userInteractionTimeout = null;
        this.sections = document.querySelectorAll('#aboutSections .about-section-content');
        this.navBtns = document.querySelectorAll('.about-nav-btn');
        this.images = document.querySelectorAll('.showcase-image');
        this.captionElement = document.getElementById('visualCaption');
        this.captions = [
            "Innovation meets tradition in the heart of Kenya",
            "Cutting-edge technology for seamless experiences",
            "Authentic culture enhanced by smart technology", 
            "Everything you need for the perfect adventure",
            "Your next journey awaits with Tembea254"
        ];
        this.init();
    }

    init() {
        if (this.sections.length > 0) {
            this.showSection(0);
            this.startInterval();
            this.addHoverListeners();
        }
    }

    addHoverListeners() {
        // Add hover listeners to navigation buttons
        this.navBtns.forEach((btn, index) => {
            btn.addEventListener('mouseenter', () => {
                this.handleUserInteraction();
                this.showSection(index);
            });
            
            btn.addEventListener('mouseleave', () => {
                // Small delay before resuming auto-cycle
                setTimeout(() => {
                    this.resumeAutoMode();
                }, 500);
            });
            
            btn.addEventListener('click', () => {
                this.handleUserInteraction();
                this.showSection(index);
                // Longer pause for click interactions
                this.pauseAutoMode(10000); // 10 seconds pause
            });
        });
    }

    handleUserInteraction() {
        this.isUserInteracting = true;
        this.pauseAutoMode();
    }

    pauseAutoMode(duration = 5000) {
        clearInterval(this.interval);
        clearTimeout(this.userInteractionTimeout);
        
        this.userInteractionTimeout = setTimeout(() => {
            this.isUserInteracting = false;
            this.startInterval();
        }, duration);
    }

    resumeAutoMode() {
        if (!this.isUserInteracting) {
            this.startInterval();
        }
    }

    showSection(idx) {
        // Prevent rapid switching during user interaction
        if (this.isUserInteracting && this.switchingTimeout) {
            clearTimeout(this.switchingTimeout);
        }

        this.switchingTimeout = setTimeout(() => {
            this.sections.forEach((sec, i) => {
                sec.classList.remove('active-content');
                if (i === idx) {
                    sec.style.display = 'block';
                    setTimeout(() => sec.classList.add('active-content'), 50);
                } else {
                    sec.style.display = 'none';
                }
            });
            
            // Update navigation buttons with smooth transition
            this.navBtns.forEach((btn, i) => {
                btn.classList.toggle('active', i === idx);
            });
            
            // Update showcase images
            this.images.forEach((img, i) => {
                img.classList.toggle('active', i === idx);
            });
            
            // Update caption
            if (this.captionElement) {
                this.captionElement.textContent = this.captions[idx] || this.captions[0];
            }
            
            this.current = idx;
        }, this.isUserInteracting ? 0 : 100);
    }

    nextSection() {
        // Only auto-advance if user is not interacting
        if (!this.isUserInteracting) {
            let idx = (this.current + 1) % 5;
            this.showSection(idx);
        }
    }

    startInterval() {
        clearInterval(this.interval);
        this.interval = setInterval(() => this.nextSection(), 8000);
    }

    resetInterval() {
        if (!this.isUserInteracting) {
            this.startInterval();
        }
    }
}

// Global function for backward compatibility
window.showAboutSection = (idx) => {
    if (window.aboutManager) {
        window.aboutManager.handleUserInteraction();
        window.aboutManager.showSection(idx);
        window.aboutManager.pauseAutoMode(8000); // 8 seconds pause for manual clicks
    }
};

// Export class
window.AboutManager = AboutManager;
