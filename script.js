const passwordInput = document.getElementById("password");
const strengthMeter = document.getElementById("strength-meter-fill");
const strengthText = document.getElementById("strength-text");

const lengthReq = document.getElementById("length").querySelector('span:first-child');
const uppercaseReq = document.getElementById("uppercase").querySelector('span:first-child');
const lowercaseReq = document.getElementById("lowercase").querySelector('span:first-child');
const numberReq = document.getElementById("number").querySelector('span:first-child');
const specialCharReq = document.getElementById("special").querySelector('span:first-child');

const lengthRegex = /.{8,}/;
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const numberRegex = /[0-9]/;
const specialCharRegex = /[!@#$%^&*]/;

passwordInput.addEventListener('input', updateStrength);

function updateStrength() {
    const password = passwordInput.value;
    let strength = 0;

    const requirements = [
        { regex: lengthRegex, element: lengthReq },
        { regex: uppercaseRegex, element: uppercaseReq },
        { regex: lowercaseRegex, element: lowercaseReq },
        { regex: numberRegex, element: numberReq },
        { regex: specialCharRegex, element: specialCharReq },
    ];

    requirements.forEach(req => {
        const isValid = req.regex.test(password);
        if (isValid) {
            strength += 20;
            req.element.textContent = '✔';
            req.element.style.color = 'green';
        } else {
            req.element.textContent = '✘';
            req.element.style.color = 'red';
        }
    });

    strengthMeter.style.width = `${strength}%`;

    if (password.length === 0) {
        strengthText.textContent = 'No Password';
        strengthMeter.style.backgroundColor = '#e0e0e0';
    } else if (strength <= 20) {
        strengthText.textContent = 'Very Weak';
        strengthMeter.style.backgroundColor = '#ff4d4d';
    } else if (strength <= 40) {
        strengthText.textContent = 'Weak';
        strengthMeter.style.backgroundColor = '#ff944d';
    } else if (strength <= 60) {
        strengthText.textContent = 'Moderate';
        strengthMeter.style.backgroundColor = '#ffff4d';
    } else if (strength <= 80) {
        strengthText.textContent = 'Strong';
        strengthMeter.style.backgroundColor = '#a3ff4d';
    } else {
        strengthText.textContent = 'Very Strong';
        strengthMeter.style.backgroundColor = '#4dffff';
    }
}

function togglePasswordVisiblity() {
    const toggleIcon = document.getElementById("toggle-icon");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}

function copyPassword() {
    const password = passwordInput.value;
    if (!password) return;

    navigator.clipboard.writeText(password).then(() => {
        const tooltip = document.getElementById("copy-tooltip");
        tooltip.classList.add("show");

        setTimeout(() => {
            tooltip.classList.remove("show");
        }, 1500);
    }).catch(() => {
        alert("Failed to copy password.");
    });
}

updateStrength();