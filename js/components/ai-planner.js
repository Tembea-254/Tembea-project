// AI Planning functionality
class AIPlanner {
    constructor() {
        this.loadingDots = document.getElementById('loadingDots');
    }

    generatePlan() {
        if (this.loadingDots) {
            this.loadingDots.className = 'loading-dots';
            this.loadingDots.textContent = '';
            
            setTimeout(() => {
                this.loadingDots.className = '';
                this.loadingDots.textContent = ' (Plan generated!)';
            }, 2000);
        }
    }
}

// Global function for backward compatibility
window.generateAIPlan = () => {
    window.aiPlanner?.generatePlan();
};

// Export class
window.AIPlanner = AIPlanner;
