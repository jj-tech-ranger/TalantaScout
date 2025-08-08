document.addEventListener("DOMContentLoaded", function() {
    const roleSelection = document.getElementById("roleSelection");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const roleOptions = document.querySelectorAll(".role-option");
    const selectedRoleText = document.getElementById("selectedRoleText");
    const changeRole = document.getElementById("changeRole");
    const signupLink = document.getElementById("signupLink");
    const signinLink = document.getElementById("signinLink");
    const authForm = document.getElementById("authForm");
    const registerForm = document.getElementById("registerForm");
    const demoLogin = document.getElementById("demoLogin");
    const togglePassword = document.getElementById("togglePassword");
    const loadingOverlay = document.getElementById("loadingOverlay");

    let selectedRole = "";

    // Placeholder for showToast function, assuming it would be in a global.js or similar
    // For now, a simple console log or alert can be used.
    function showToast(message, type) {
        console.log(`Toast (${type}): ${message}`);
        // In a real application, you would display a visual toast notification here.
        // Example: alert(message);
    }

    // Check for role parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get("role");
    if (roleParam) {
        selectRole(roleParam);
    }

    // Role selection
    roleOptions.forEach(option => {
        option.addEventListener("click", function() {
            // Remove 'selected' class from all options
            roleOptions.forEach(opt => opt.classList.remove("selected"));
            // Add 'selected' class to the clicked option
            this.classList.add("selected");

            const role = this.dataset.role;
            selectRole(role);
        });
    });

    function selectRole(role) {
        selectedRole = role;
        selectedRoleText.textContent = role.charAt(0).toUpperCase() + role.slice(1);

        // Update selected role icon
        const roleIcon = document.querySelector(`[data-role="${role}"] .role-icon i`).className;
        document.querySelector("#selectedRole i").className = roleIcon;

        // Show login form
        roleSelection.style.display = "none";
        loginForm.style.display = "block";
    }

    // Change role
    changeRole.addEventListener("click", function() {
        loginForm.style.display = "none";
        signupForm.style.display = "none";
        roleSelection.style.display = "block";
        // Remove 'selected' class when changing role
        roleOptions.forEach(opt => opt.classList.remove("selected"));
    });

    // Toggle between login and signup
    signupLink.addEventListener("click", function(e) {
        e.preventDefault();
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    });

    signinLink.addEventListener("click", function(e) {
        e.preventDefault();
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    });

    // Toggle password visibility
    togglePassword.addEventListener("click", function() {
        const passwordInput = document.getElementById("password");
        const icon = this.querySelector("i");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.className = "fas fa-eye-slash";
        } else {
            passwordInput.type = "password";
            icon.className = "fas fa-eye";
        }
    });

    // Show loading overlay
    function showLoading() {
        loadingOverlay.classList.add("active");
    }

    // Hide loading overlay
    function hideLoading() {
        loadingOverlay.classList.remove("active");
    }

    // Demo login
    demoLogin.addEventListener("click", function() {
        if (!selectedRole) {
            showToast("Please select a role first", "error");
            return;
        }

        showLoading();

        // Simulate login process
        setTimeout(() => {
            localStorage.setItem("userRole", selectedRole);
            localStorage.setItem("userName", "Demo User");
            localStorage.setItem("userPackage", "Gold");
            localStorage.setItem("isLoggedIn", "true");

            // Redirect to appropriate dashboard
            window.location.href = `${selectedRole}/dashboard.html`;
        }, 2000);
    });

    // Login form submission
    authForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!selectedRole || !email || !password) {
            showToast("Please fill in all fields", "error");
            return;
        }

        showLoading();

        // Simulate login process
        setTimeout(() => {
            localStorage.setItem("userRole", selectedRole);
            localStorage.setItem("userName", email.split("@")[0]);
            localStorage.setItem("userPackage", "Silver");
            localStorage.setItem("isLoggedIn", "true");

            // Redirect to appropriate dashboard
            window.location.href = `${selectedRole}/dashboard.html`;
        }, 2000);
    });

    // Register form submission
    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("signupEmail").value;
        const county = document.getElementById("county").value;
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const agreeTerms = document.getElementById("agreeTerms").checked;

        if (!firstName || !lastName || !email || !county || !password || !confirmPassword) {
            showToast("Please fill in all fields", "error");
            return;
        }

        if (password !== confirmPassword) {
            showToast("Passwords do not match", "error");
            return;
        }

        if (!agreeTerms) {
            showToast("Please agree to the Terms of Service and Privacy Policy", "error");
            return;
        }

        showLoading();

        // Simulate registration process
        setTimeout(() => {
            // In a real application, you would send this data to a backend
            console.log("Registration Data:", { firstName, lastName, email, county, password });
            showToast("Registration successful! Please sign in.", "success");
            hideLoading();
            // Switch back to login form after successful registration
            signupForm.style.display = "none";
            loginForm.style.display = "block";
        }, 2000);
    });
});


