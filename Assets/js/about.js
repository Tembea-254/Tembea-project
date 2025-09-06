// About section navigation and management
class AboutManager {
    constructor() {
        this.current = 0;
        this.interval = null;
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
        }
    }

    showSection(idx) {
        this.sections.forEach((sec, i) => {
            sec.classList.remove('active-content');
            if (i === idx) {
                sec.style.display = 'block';
                setTimeout(() => sec.classList.add('active-content'), 10);
            } else {
                sec.style.display = 'none';
            }
        });
        
        // Update navigation buttons
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
        this.resetInterval();
    }

    nextSection() {
        let idx = (this.current + 1) % 5;
        this.showSection(idx);
    }

    startInterval() {
        this.interval = setInterval(() => this.nextSection(), 8000);
    }

    resetInterval() {
        clearInterval(this.interval);
        this.startInterval();
    }
}

// Global function for backward compatibility
window.showAboutSection = (idx) => {
    window.aboutManager?.showSection(idx);
};

// Export class
window.AboutManager = AboutManager;
