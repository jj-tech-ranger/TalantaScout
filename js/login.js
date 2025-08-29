// TalantaScout Login JavaScript
// Authentication and package selection functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeLoginForm();
    initializeDemoAccounts();
    initializePackageModal();
    checkURLParameters();
});

function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    // Password visibility toggle
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        });
    }
    
    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
}

function initializeDemoAccounts() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            const email = this.getAttribute('data-email');
            const password = this.getAttribute('data-password');
            
            // Fill form with demo credentials
            document.getElementById('userRole').value = role;
            document.getElementById('email').value = email;
            document.getElementById('password').value = password;
            
            // Auto-submit after a short delay
            setTimeout(() => {
                handleLogin();
            }, 500);
        });
    });
}

function initializePackageModal() {
    const packageModal = document.getElementById('packageModal');
    const closePackageModal = document.getElementById('closePackageModal');
    const packageCards = document.querySelectorAll('.package-card');
    
    if (closePackageModal) {
        closePackageModal.addEventListener('click', function() {
            packageModal.classList.remove('active');
        });
    }
    
    // Package selection
    packageCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            packageCards.forEach(c => c.classList.remove('selected'));
            
            // Select current card
            this.classList.add('selected');
            
            const packageType = this.getAttribute('data-package');
            const userRole = sessionStorage.getItem('selectedRole');
            
            // Redirect to appropriate dashboard
            setTimeout(() => {
                redirectToDashboard(userRole, packageType);
            }, 1000);
        });
    });
    
    // Close modal when clicking overlay
    if (packageModal) {
        packageModal.addEventListener('click', function(e) {
            if (e.target === packageModal) {
                packageModal.classList.remove('active');
            }
        });
    }
}

function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    
    if (role) {
        const roleSelect = document.getElementById('userRole');
        if (roleSelect) {
            roleSelect.value = role;
        }
    }
}

function handleLogin() {
    const role = document.getElementById('userRole').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Basic validation
    if (!role || !email || !password) {
        showError('Please fill in all required fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    submitBtn.disabled = true;
    
    // Simulate authentication
    setTimeout(() => {
        if (authenticateUser(email, password, role)) {
            // Store user session
            const userSession = {
                role: role,
                email: email,
                loginTime: new Date().toISOString(),
                rememberMe: rememberMe
            };
            
            if (rememberMe) {
                localStorage.setItem('userSession', JSON.stringify(userSession));
            } else {
                sessionStorage.setItem('userSession', JSON.stringify(userSession));
            }
            
            // Store selected role for package selection
            sessionStorage.setItem('selectedRole', role);
            
            // Show package selection modal for non-admin users
            if (role !== 'admin') {
                showPackageModal();
            } else {
                // Redirect admin directly to dashboard
                redirectToDashboard(role, null);
            }
        } else {
            showError('Invalid credentials. Please try again.');
        }
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function authenticateUser(email, password, role) {
    // Demo authentication - in real app, this would be an API call
    const demoCredentials = {
        'player@demo.com': { password: 'demo123', role: 'player' },
        'scout@demo.com': { password: 'demo123', role: 'scout' },
        'coach@demo.com': { password: 'demo123', role: 'coach' },
        'admin@demo.com': { password: 'demo123', role: 'admin' }
    };
    
    const user = demoCredentials[email];
    return user && user.password === password && user.role === role;
}

function showPackageModal() {
    const packageModal = document.getElementById('packageModal');
    if (packageModal) {
        packageModal.classList.add('active');
    }
}

function redirectToDashboard(role, packageType) {
    let redirectUrl;
    
    if (role === 'admin') {
        redirectUrl = 'templates/admin/dashboard.html';
    } else {
        const pkg = packageType || 'basic';
        redirectUrl = `templates/${role}/${pkg}/dashboard.html`;
    }
    
    // Add loading animation
    document.body.style.opacity = '0.5';
    
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 500);
}

function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    // Insert error message
    const form = document.getElementById('loginForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add CSS for error messages and animations
const loginStyles = `
<style>
.error-message {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: #ffebee;
    color: #c62828;
    border: 1px solid #ffcdd2;
    border-radius: 8px;
    margin-bottom: 20px;
    animation: slideDown 0.3s ease;
}

.error-message i {
    color: #d32f2f;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.package-card {
    transition: all 0.3s ease;
    cursor: pointer;
}

.package-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.package-card.selected {
    border-color: var(--primary-color);
    background: var(--primary-color);
    color: white;
    transform: scale(1.05);
}

.package-card.selected .package-price {
    color: var(--accent-light);
}

.demo-btn {
    transition: all 0.3s ease;
}

.demo-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.demo-btn:active {
    transform: translateY(0);
}

.login-form {
    position: relative;
}

.form-group {
    position: relative;
}

.form-group input:focus + label,
.form-group select:focus + label {
    color: var(--primary-color);
}

.password-input {
    position: relative;
}

.password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-light);
    cursor: pointer;
    padding: 5px;
    transition: color 0.3s ease;
}

.password-toggle:hover {
    color: var(--primary-color);
}

.checkbox-container {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
}

.checkbox-container input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: var(--primary-color);
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
}

.btn:disabled:hover {
    transform: none !important;
}

/* Loading animation for page transition */
body.loading {
    transition: opacity 0.5s ease;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .login-container {
        grid-template-columns: 1fr;
        margin: 10px;
    }
    
    .login-left {
        padding: 30px 20px;
    }
    
    .login-right {
        padding: 30px 20px;
    }
    
    .demo-grid {
        grid-template-columns: 1fr;
    }
    
    .package-grid {
        grid-template-columns: 1fr;
    }
}

/* Dark theme support */
[data-theme="dark"] .error-message {
    background: #3e2723;
    color: #ff8a80;
    border-color: #5d4037;
}

[data-theme="dark"] .package-card {
    background: var(--background-light);
    border-color: var(--border-color);
}

[data-theme="dark"] .package-card:hover {
    background: var(--background-dark);
}

[data-theme="dark"] .demo-btn {
    background: var(--background-light);
    border-color: var(--border-color);
    color: var(--text-color);
}

[data-theme="dark"] .demo-btn:hover {
    background: var(--background-dark);
}

/* Enhanced focus states */
.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 77, 0, 0.1);
}

/* Smooth transitions */
* {
    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

/* Accessibility improvements */
.btn:focus,
.demo-btn:focus,
.package-card:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

/* Animation for successful login */
@keyframes successPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.success-animation {
    animation: successPulse 0.6s ease;
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', loginStyles);

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// Auto-focus first empty field
window.addEventListener('load', function() {
    const roleSelect = document.getElementById('userRole');
    const emailInput = document.getElementById('email');
    
    if (roleSelect && !roleSelect.value) {
        roleSelect.focus();
    } else if (emailInput && !emailInput.value) {
        emailInput.focus();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn && !submitBtn.disabled) {
            handleLogin();
        }
    }
    
    // Escape key to close modals
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }
});

// Form validation on input
document.addEventListener('input', function(e) {
    if (e.target.type === 'email') {
        const isValid = isValidEmail(e.target.value);
        e.target.style.borderColor = isValid ? 'var(--success-color)' : 'var(--alert-color)';
    }
});

// Remember form data in session storage
document.addEventListener('input', function(e) {
    if (e.target.id === 'userRole' || e.target.id === 'email') {
        sessionStorage.setItem(e.target.id, e.target.value);
    }
});

// Restore form data on page load
window.addEventListener('load', function() {
    const savedRole = sessionStorage.getItem('userRole');
    const savedEmail = sessionStorage.getItem('email');
    
    if (savedRole) {
        const roleSelect = document.getElementById('userRole');
        if (roleSelect) roleSelect.value = savedRole;
    }
    
    if (savedEmail) {
        const emailInput = document.getElementById('email');
        if (emailInput) emailInput.value = savedEmail;
    }
});

