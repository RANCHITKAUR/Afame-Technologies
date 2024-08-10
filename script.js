document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');

    let currentValue = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const btnValue = button.textContent;

            if (btnValue === 'AC') {
                currentValue = '';
                display.textContent = '';
            } else if (btnValue === 'CE' || btnValue === 'Backspace') {
                // Handle backspace functionality
                currentValue = currentValue.slice(0, -1);
                display.textContent = currentValue;
            } else if (btnValue === '=') {
                try {
                    // Sanitize and evaluate the expression
                    const sanitizedExpression = currentValue
                        .replace(/--/g, '+') // Handle double minus signs
                        .replace(/[^-()\d/*+.]/g, ''); // Remove invalid characters

                    // Evaluate using Function constructor
                    currentValue = Function('"use strict"; return (' + sanitizedExpression + ')')();
                    
                    // Check for special cases
                    if (currentValue === Infinity || isNaN(currentValue)) {
                        display.textContent = 'Error';
                    } else {
                        display.textContent = currentValue;
                    }

                    resultDisplayed = true;
                } catch (error) {
                    display.textContent = 'Error';
                }
            } else if (btnValue === '%') {
                if (currentValue) {
                    // Calculate percentage
                    currentValue = (parseFloat(currentValue) / 100).toString();
                    display.textContent = currentValue;
                }
            } else if (btnValue === '+/-') {
                // Toggle between positive and negative
                if (currentValue) {
                    if (currentValue.charAt(0) === '-') {
                        currentValue = currentValue.slice(1);
                    } else {
                        currentValue = '-' + currentValue;
                    }
                    display.textContent = currentValue;
                }
            } else {
                if (resultDisplayed && !isNaN(btnValue)) {
                    currentValue = btnValue;
                    resultDisplayed = false;
                } else {
                    currentValue += btnValue;
                }
                display.textContent = currentValue;
            }
        });
    });
});

const themeToggleBtn = document.querySelector('.theme-toggler');
const calculator = document.querySelector('.calculator');
const togglerIcon = document.querySelector('.toggler-icon');
let isDark = true;

themeToggleBtn.onclick = () => {
    calculator.classList.toggle('dark');
    themeToggleBtn.classList.toggle('active');
    isDark = !isDark;
};
