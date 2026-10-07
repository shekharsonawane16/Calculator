const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");

let firstNumber = "";
let operator = "";
let waitingForSecondNumber = false;

function inputNumber(number) {
    if (waitingForSecondNumber) {
        display.value = "";
        waitingForSecondNumber = false;
    }

    if (number === "." && display.value.includes(".")) {
        return;
    }

    display.value += number;
}

function inputOperator(nextOperator) {
    if (display.value === "" && firstNumber === "") {
        return;
    }

    if (operator && !waitingForSecondNumber) {
        calculate();
    }

    firstNumber = display.value;
    operator = nextOperator;
    waitingForSecondNumber = true;
}

function calculate() {
    if (!firstNumber || !operator || display.value === "") {
        return;
    }

    const secondNumber = parseFloat(display.value);
    const first = parseFloat(firstNumber);

    let result;

    switch (operator) {
        case "+":
            result = first + secondNumber;
            break;

        case "-":
            result = first - secondNumber;
            break;

        case "*":
            result = first * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                display.value = "Cannot divide by 0";
                resetCalculator();
                return;
            }

            result = first / secondNumber;
            break;

        case "%":
            result = first % secondNumber;
            break;

        default:
            return;
    }

    display.value = Number(result.toFixed(10));
    firstNumber = "";
    operator = "";
    waitingForSecondNumber = false;
}

function clearDisplay() {
    display.value = "";
    resetCalculator();
}

function resetCalculator() {
    firstNumber = "";
    operator = "";
    waitingForSecondNumber = false;
}

function backspace() {
    if (!waitingForSecondNumber) {
        display.value = display.value.slice(0, -1);
    }
}

// Button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {

        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === "clear") {
            clearDisplay();
            return;
        }

        if (action === "backspace") {
            backspace();
            return;
        }

        if (action === "calculate") {
            calculate();
            return;
        }

        if (["+", "-", "*", "/", "%"].includes(value)) {
            inputOperator(value);
        } else {
            inputNumber(value);
        }
    });
});

// Keyboard support
document.addEventListener("keydown", event => {

    const key = event.key;

    if (/^[0-9.]$/.test(key)) {
        inputNumber(key);
    }

    if (["+", "-", "*", "/", "%"].includes(key)) {
        inputOperator(key);
    }

    if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }

    if (key === "Backspace") {
        backspace();
    }

    if (key === "Escape" || key.toLowerCase() === "c") {
        clearDisplay();
    }
});
