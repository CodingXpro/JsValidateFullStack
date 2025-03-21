document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const inputs = {
        firstname: document.getElementById("firstname"),
        lastname: document.getElementById("lastname"),
        email: document.getElementById("email"),
        username: document.getElementById("username"),
        password: document.getElementById("password"),
        cpassword: document.getElementById("cpassword"),
    };

    // Show error message
    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.classList.add("error");
        formControl.classList.remove("success");
        const small = formControl.querySelector("small");
        small.innerText = message;
        small.style.visibility = "visible";
    }

    // Show success
    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.classList.add("success");
        formControl.classList.remove("error");
        const small = formControl.querySelector("small");
        small.innerText = "";
        small.style.visibility = "hidden";
    }

    // Validate email format
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Capitalize first letter for error messages
    function formatFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

    // Validate required fields
    function validateRequired(fields) {
        let isValid = true;
        fields.forEach((input) => {
            if (!input.value.trim()) {
                showError(input, `${formatFieldName(input)} is required`);
                isValid = false;
            } else {
                showSuccess(input);
            }
        });
        return isValid;
    }

    // Validate input length
    function validateLength(input, min, max) {
        if (input.value.length < min) {
            showError(input, `${formatFieldName(input)} must be at least ${min} characters`);
            return false;
        } else if (input.value.length > max) {
            showError(input, `${formatFieldName(input)} must be less than ${max} characters`);
            return false;
        }
        showSuccess(input);
        return true;
    }

    // Validate email format
    function validateEmail(input) {
        if (!isValidEmail(input.value.trim())) {
            showError(input, "Email is not valid");
            return false;
        }
        showSuccess(input);
        return true;
    }

    // Validate password match
    function validatePasswordMatch(password1, password2) {
        if (password1.value !== password2.value) {
            showError(password2, "Passwords do not match");
            return false;
        }
        showSuccess(password2);
        return true;
    }

    // Reset errors on input change
    Object.values(inputs).forEach((input) => {
        input.addEventListener("input", () => showSuccess(input));
    });

    // Form submit event
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const { firstname, lastname, email, username, password, cpassword } = inputs;

        // Perform validation
        const isFormValid =
            validateRequired([firstname, lastname, email, username, password, cpassword]) &&
            validateLength(password, 4, 20) &&
            validateEmail(email) &&
            validatePasswordMatch(password, cpassword);

        if (!isFormValid) return;

        // Prepare data for API
        const userData = {
            firstname: firstname.value.trim(),
            lastname: lastname.value.trim(),
            email: email.value.trim(),
            username: username.value.trim(),
            password: password.value,
            confirmPassword: cpassword.value,
        };

        try {
            const response = await fetch("http://localhost:8000/api/v1/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful!");
                form.reset();
                Object.values(inputs).forEach(showSuccess); // Reset validation styles
            } else {
                alert(`Error: ${data.message || "Something went wrong!"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to connect to the server. Please try again.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const signInButton = document.getElementById("signButton");
    // const signInButton = document.getElementById("signButton");

    signInButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission
        window.location.href = "sigin.html"; // Redirect to the sign-in page
    });
   
});
