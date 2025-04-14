document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signUp');
    const loginButton = document.getElementById('login');
    const container = document.getElementById('main');
    
    const isMobile = window.innerWidth <= 768;
    
    // If on mobile, create mobile navigation
    if (isMobile) {
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        
        const mobileSignUp = document.createElement('button');
        mobileSignUp.textContent = 'SIGN UP';
        mobileSignUp.id = 'mobile-signup';
        mobileSignUp.addEventListener('click', function() {
            container.classList.add('right-panel-active');
            mobileSignUp.style.display = 'none'; // Hide signup button
            mobileLogin.style.display = 'block'; // Show login button
            mobileLogin.style.background = '#7765e3';
            mobileLogin.style.color = '#fff';
            mobileLogin.style.border = 'none';
        });
        
        const mobileLogin = document.createElement('button');
        mobileLogin.textContent = 'LOGIN';
        mobileLogin.id = 'mobile-login';
        mobileLogin.style.background = '#7765e3';
        mobileLogin.style.color = '#fff';
        mobileLogin.addEventListener('click', function() {
            container.classList.remove('right-panel-active');
            mobileLogin.style.display = 'none'; // Hide login button
            mobileSignUp.style.display = 'block'; // Show signup button
            mobileSignUp.style.background = '#7765e3';
            mobileSignUp.style.color = '#fff';
            mobileSignUp.style.border = 'none';
        });
        
        // Set initial state based on which panel is active
        if (container.classList.contains('right-panel-active')) {
            // Signup page is showing
            mobileSignUp.style.display = 'none';
            mobileLogin.style.display = 'block';
        } else {
            // Login page is showing
            mobileSignUp.style.display = 'block';
            mobileLogin.style.display = 'none';
        }
        
        mobileNav.appendChild(mobileSignUp);
        mobileNav.appendChild(mobileLogin);
        
        // Add to container
        container.appendChild(mobileNav);
    }
    
    // Desktop event listeners
    if (signUpButton) {
        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });
    }
    
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });
    }
    
    // Prevent form submissions
    const signupForm = document.querySelector('.sign-up-container form');
    const loginForm = document.querySelector('.login-container form');

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form validation and submission logic here
            console.log('Sign up form submitted');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form validation and submission logic here
            console.log('Login form submitted');
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const isNowMobile = window.innerWidth <= 768;
        
        // If changing between mobile and desktop, reload the page
        if (isNowMobile !== isMobile) {
            location.reload();
        }
    });
});