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
        this.typingElement = document.getElementById('typingText');
    }

    init() {
        if (this.typingElement) {
            this.typeText();
        }
    }

    typeText() {
        const current = this.phrases[this.currentPhrase];
        
        if (this.isDeleting) {
            this.typingElement.innerHTML = current.substring(0, this.currentChar - 1) + '<span class="cursor">|</span>';
            this.currentChar--;
            
            if (this.currentChar === 0) {
                this.isDeleting = false;
                this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
                setTimeout(() => this.typeText(), 500);
            } else {
                setTimeout(() => this.typeText(), 50);
            }
        } else {
            this.typingElement.innerHTML = current.substring(0, this.currentChar + 1) + '<span class="cursor">|</span>';
            this.currentChar++;
            
            if (this.currentChar === current.length) {
                setTimeout(() => {
                    this.isDeleting = true;
                    this.typeText();
                }, 3000);
            } else {
                setTimeout(() => this.typeText(), 100);
            }
        }
    }
}

// Export class
window.TypingAnimation = TypingAnimation;
