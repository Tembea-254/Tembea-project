// Login/Signup functionality
class LoginSignupManager {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.signupForm = document.getElementById('signupForm');
        this.switchText = document.getElementById('loginSignupSwitch');
        this.title = document.getElementById('loginSignupTitle');
        this.init();
    }

    init() {
        if (this.loginForm && this.signupForm) {
            // Set initial state
            this.loginForm.classList.add('show');
            this.signupForm.classList.add('hide');
            
            // Attach event listener
            if (this.switchText) {
                this.switchText.onclick = () => this.toggle();
            }
        }
    }

    toggle() {
        if (this.loginForm.classList.contains('show')) {
            // Switch to signup
            this.loginForm.classList.remove('show');
            this.loginForm.classList.add('hide');
            this.signupForm.classList.remove('hide');
            this.signupForm.classList.add('show');
            this.title.textContent = 'Sign Up';
            this.switchText.textContent = 'Already have an account? Login';
        } else {
            // Switch to login
            this.loginForm.classList.remove('hide');
            this.loginForm.classList.add('show');
            this.signupForm.classList.remove('show');
            this.signupForm.classList.add('hide');
            this.title.textContent = 'Login';
            this.switchText.textContent = "Don't have an account? Sign Up";
        }
    }
}

// Global function for backward compatibility
window.toggleLoginSignup = () => {
    window.loginSignupManager?.toggle();
};

// Export class
window.LoginSignupManager = LoginSignupManager;
