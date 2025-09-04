// Main JavaScript file - coordinates all components
class TembeaApp {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Initialize all components
        this.components.navigation = new NavigationManager();
        this.components.videoManager = new VideoManager();
        this.components.floatingVideoPlayer = new FloatingVideoPlayer();
        this.components.typingAnimation = new TypingAnimation();
        this.components.imageCarousel = new ImageCarousel();
        this.components.aboutManager = new AboutManager();
        this.components.loginSignupManager = new LoginSignupManager();
        this.components.aiPlanner = new AIPlanner();

        // Store global references for backward compatibility
        window.navigationManager = this.components.navigation;
        window.videoManager = this.components.videoManager;
        window.floatingVideoPlayer = this.components.floatingVideoPlayer;
        window.typingAnimation = this.components.typingAnimation;
        window.imageCarousel = this.components.imageCarousel;
        window.aboutManager = this.components.aboutManager;
        window.loginSignupManager = this.components.loginSignupManager;
        window.aiPlanner = this.components.aiPlanner;

        // Initialize typing animation
        this.components.typingAnimation.init();

        // Handle spinner
        this.handleSpinner();

        console.log('Tembea254 app initialized successfully!');
    }

    handleSpinner() {
        const spinnerOverlay = document.getElementById('spinner-overlay');
        if (spinnerOverlay) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    spinnerOverlay.style.display = 'none';
                }, 1500);
            });
        }
    }
}

// Initialize the app
window.tembeaApp = new TembeaApp();
