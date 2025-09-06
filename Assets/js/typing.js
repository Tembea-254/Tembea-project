// Auto-typing text functionality
class TypingAnimation {
    constructor() {
        this.phrases = [
            "Discover Kenya with AR/VR",
            "AI-Powered Travel Planning", 
            "Immersive Cultural Experiences",
            "Real-time Translation Magic",
            "Your Adventure Awaits"
        ];
        this.currentPhrase = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.typingElement = null;
        this.isInitialized = false;
    }

    init() {
        // Wait for DOM to be ready and try multiple times if needed
        this.findTypingElement();
    }

    findTypingElement() {
        this.typingElement = document.getElementById('typingText');
        
        if (this.typingElement && !this.isInitialized) {
            console.log('Typing element found, starting animation...');
            this.isInitialized = true;
            
            // Start the animation immediately without clearing content
            this.currentPhrase = 0;
            this.currentChar = 0;
            this.isDeleting = false;
            
            // Begin typing animation
            this.typeText();
        } else if (!this.typingElement) {
            console.log('Typing element not found, retrying...');
            setTimeout(() => this.findTypingElement(), 100);
        }
    }

    makeElementVisible() {
        if (this.typingElement) {
            this.typingElement.style.cssText = `
                color: #ffffff !important;
                font-size: 1.5rem !important;
                font-weight: bold !important;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.3) !important;
                background: rgba(0,0,0,0.4) !important;
                padding: 15px 20px !important;
                border-radius: 10px !important;
                z-index: 100 !important;
                position: relative !important;
                display: block !important;
                margin-top: 80px !important;
                margin-bottom: 25px !important;
                min-height: 80px !important;
                opacity: 1 !important;
                visibility: visible !important;
                line-height: 1.4 !important;
            `;
            
            // Start with cursor visible
            this.typingElement.innerHTML = '<span class="cursor">|</span>';
            console.log('Typing element made visible');
        }
    }

    typeText() {
        if (!this.typingElement || !this.isInitialized) {
            console.log('Typing element not available, stopping animation');
            return;
        }

        const current = this.phrases[this.currentPhrase];
        console.log(`Typing phase: ${this.isDeleting ? 'deleting' : 'typing'}, phrase: "${current}", char: ${this.currentChar}`);
        
        if (this.isDeleting) {
            // Deleting characters
            if (this.currentChar > 0) {
                this.currentChar--;
                const currentText = current.substring(0, this.currentChar);
                this.typingElement.innerHTML = currentText + '<span class="cursor">|</span>';
                setTimeout(() => this.typeText(), 30);
            } else {
                // Finished deleting, move to next phrase
                this.isDeleting = false;
                this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
                console.log(`Moving to next phrase: "${this.phrases[this.currentPhrase]}"`);
                setTimeout(() => this.typeText(), 800);
            }
        } else {
            // Typing characters
            if (this.currentChar < current.length) {
                this.currentChar++;
                const currentText = current.substring(0, this.currentChar);
                this.typingElement.innerHTML = currentText + '<span class="cursor">|</span>';
                setTimeout(() => this.typeText(), 80);
            } else {
                // Finished typing current phrase, pause then start deleting
                console.log(`Finished typing: "${current}"`);
                setTimeout(() => {
                    this.isDeleting = true;
                    this.typeText();
                }, 2000);
            }
        }
    }

    // Method to restart animation if needed
    restart() {
        console.log('Restarting typing animation...');
        this.isInitialized = false;
        this.currentPhrase = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        
        // Clear any existing content
        if (this.typingElement) {
            this.typingElement.innerHTML = '<span class="cursor">|</span>';
        }
        
        // Reinitialize
        this.init();
    }

    // Method to start typing immediately (for emergency fallback)
    startTyping() {
        if (this.typingElement && !this.isInitialized) {
            console.log('Starting typing animation directly...');
            this.isInitialized = true;
            this.makeElementVisible();
            this.currentPhrase = 0;
            this.currentChar = 0;
            this.isDeleting = false;
            this.typeText();
        }
    }
}

// Export class
window.TypingAnimation = TypingAnimation;
