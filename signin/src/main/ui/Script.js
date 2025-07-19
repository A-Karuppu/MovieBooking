// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signInBtn = document.querySelector('.sign-in-btn');
const googleBtn = document.getElementById('googleBtn');
const createAccountBtn = document.getElementById('createAccountBtn');
const forgotPasswordLink = document.querySelector('.forgot-password');

// Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(input, message) {
    input.classList.add('error');
    let errorElement = input.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(input) {
    input.classList.remove('error');
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function showLoading(button) {
    button.classList.add('btn-loading');
    button.disabled = true;
}

function hideLoading(button) {
    button.classList.remove('btn-loading');
    button.disabled = false;
}

// Event Listeners
emailInput.addEventListener('input', function() {
    clearError(this);
});

passwordInput.addEventListener('input', function() {
    clearError(this);
});

// Login form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let isValid = true;

    // Clear previous errors
    clearError(emailInput);
    clearError(passwordInput);

    // Validate email
    if (!email) {
        showError(emailInput, 'Email address is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (!password) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordInput, 'Password must be at least 6 characters long');
        isValid = false;
    }

    if (!isValid) return;

    // Show loading state
    showLoading(signInBtn);

    try {
        // Simulate API call
        await simulateLogin(email, password);

        // Success - redirect or show success message
        showNotification('Login successful! Redirecting...', 'success');

        // Simulate redirect after 2 seconds
        setTimeout(() => {
            // window.location.href = '/dashboard';
            console.log('Redirecting to dashboard...');
        }, 2000);

    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        hideLoading(signInBtn);
    }
});

// Google sign in
googleBtn.addEventListener('click', async function() {
    showLoading(googleBtn);

    try {
        // Simulate Google OAuth
        await simulateGoogleLogin();
        showNotification('Google sign-in successful! Redirecting...', 'success');

        setTimeout(() => {
            console.log('Redirecting to dashboard...');
        }, 2000);

    } catch (error) {
        showNotification('Google sign-in failed. Please try again.', 'error');
    } finally {
        hideLoading(googleBtn);
    }
});

// Create account button
createAccountBtn.addEventListener('click', function() {
    // Redirect to sign up page
    // window.location.href = '/signup';
    showNotification('Redirecting to sign up page...', 'info');
    console.log('Redirecting to sign up...');
});

// Forgot password link
forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    // window.location.href = '/forgot-password';
    showNotification('Redirecting to password reset...', 'info');
    console.log('Redirecting to password reset...');
});

// Simulate API calls
async function simulateLogin(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate different responses based on email
            if (email === 'demo@example.com' && password === 'password123') {
                resolve({ success: true, user: { email, name: 'Demo User' } });
            } else if (email === 'admin@example.com' && password === 'admin123') {
                resolve({ success: true, user: { email, name: 'Admin User' } });
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 1500);
    });
}

async function simulateGoogleLogin() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random success/failure for demo
            if (Math.random() > 0.2) {
                resolve({ success: true, user: { email: 'google@example.com', name: 'Google User' } });
            } else {
                reject(new Error('Google authentication failed'));
            }
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles for notification
    const styles = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    `;

    notification.style.cssText = styles;

    // Set colors based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            notification.style.color = 'white';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            notification.style.color = 'white';
            break;
        case 'info':
            notification.style.backgroundColor = '#3b82f6';
            notification.style.color = 'white';
            break;
        default:
            notification.style.backgroundColor = '#6b7280';
            notification.style.color = 'white';
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Enter key should submit form if focus is on input
    if (e.key === 'Enter') {
        if (emailInput === document.activeElement || passwordInput === document.activeElement) {
            loginForm.dispatchEvent(new Event('submit'));
        }
    }
});

// Demo credentials info (remove in production)
console.log('Demo credentials:');
console.log('Email: demo@example.com, Password: password123');
console.log('Email: admin@example.com, Password: admin123');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Focus on email input
    emailInput.focus();

    // Check if user is coming from a redirect
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message) {
        showNotification(decodeURIComponent(message), 'info');
    }
});