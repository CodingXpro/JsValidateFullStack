document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const getStartedButton = document.getElementById("getstart");
    
    const inputs = {
        email: document.getElementById("email"),
        password: document.getElementById("password"),
    };

    // Show error message
    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.classList.add("error");
        formControl.classList.remove("success");
        formControl.querySelector("small").innerText = message;
    }

    // Show success
    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.classList.add("success");
        formControl.classList.remove("error");
        formControl.querySelector("small").innerText = "";
    }

    // Validate email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Format field name
    function formatFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

    // Validate required fields
    function validateRequired(fields) {
        return fields.every(input => {
            if (!input.value.trim()) {
                showError(input, `${formatFieldName(input)} is required`);
                return false;
            }
            showSuccess(input);
            return true;
        });
    }

    // Validate input length
    function validateLength(input, min, max) {
        const length = input.value.length;
        if (length < min) {
            showError(input, `${formatFieldName(input)} must be at least ${min} characters`);
            return false;
        } 
        if (length > max) {
            showError(input, `${formatFieldName(input)} must be less than ${max} characters`);
            return false;
        }
        showSuccess(input);
        return true;
    }

    // Validate email
    function validateEmail(input) {
        if (!isValidEmail(input.value.trim())) {
            showError(input, "Email is not valid");
            return false;
        }
        showSuccess(input);
        return true;
    }

    // Reset errors on input change
    Object.values(inputs).forEach(input => {
        input.addEventListener("input", () => showSuccess(input));
    });

    // Handle form submission
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = inputs.email.value.trim();
        const password = inputs.password.value.trim();

        if (!validateRequired([inputs.email, inputs.password]) || !validateEmail(inputs.email)) {
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Login Response:", data);

            if (response.ok) {
                localStorage.setItem("token", data.token); // Store token
                alert("Login successful!");
                window.location.href = "index.html"; // Redirect to dashboard
            } else {
                showError(inputs.email, data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    });

    // Handle Get Started button click
    if (getStartedButton) {
        getStartedButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent form submission
            window.location.href = "index.html"; // Redirect to sign-in page
        });
    }
});
