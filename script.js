// select HTML elements
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const prev = document.querySelector(".prev")
const current = document.querySelector(".current")
const equals = document.querySelector(".equals")
const clear = document.querySelector(".clear-screen")
const deleteNumber = document.querySelector(".delete-number")

// start with empty screen
current.textContent = ''
prev.textContent = ''

// declare variables
let firstNumber;
let secondNumber;
let currentOperator;
let result;
let index;

// add eventListeners to different buttons
numbers.forEach(number =>
    // check for edge cases, otherwise add current digit to screen
    number.addEventListener('click', () => {
        let digit = number.textContent
        if (number.textContent === '.' && (current.textContent.includes('.') ||
            current.textContent === '') || (current.textContent == '0' && number.textContent !== '.')) {
                return
            }
        else if (prev.textContent.includes('=') && !current.textContent.includes(currentOperator)) {
            clearScreen()
            addDigit(digit)
        }
        else {
            addDigit(digit)
        }
    })
)

operators.forEach(operator =>
    // check for edge cases, otherwise add current operator 
    operator.addEventListener('click', () => {
        index = current.textContent.indexOf(currentOperator)
        firstNumber = current.textContent.slice(0, index)
        secondNumber = current.textContent.slice(index + 1)
        if (current.textContent === '') {
            if (operator.textContent !== '-') return
        }
        else if (index == current.textContent.length - 1 ) {
            return
        }
        // enable chaining operations
        else if (current.textContent.includes(currentOperator)) {
            let prevOperator = currentOperator
            currentOperator = operator.textContent
            result = calculate(firstNumber, prevOperator, secondNumber)
            prev.textContent = result
            firstNumber = result
            current.textContent = firstNumber + currentOperator
        } 
        else {
            currentOperator = operator.textContent
            addOperator(currentOperator)
        }   
    })
)


equals.addEventListener('click', () => {
    // check for edge cases, otherwise call calculate function and display the result
    index = current.textContent.indexOf(currentOperator)
    firstNumber = current.textContent.slice(0, index)
    secondNumber = current.textContent.slice(index + 1)
    if (current.textContent === '' || index == current.textContent.length - 1 ||
        index === 0) {
        return
    }
    else if ((prev.textContent.includes('=') || prev.textContent === '') &&
            !current.textContent.includes(currentOperator)) {
        return
    }
    else if (currentOperator === '÷' && secondNumber == 0) {
        clearScreen()
        alert("Can't divide by 0!")
        return
    }
    else {
        result = calculate(firstNumber, currentOperator, secondNumber)
        prev.textContent = current.textContent + '='
        current.textContent = result
    }
})

// calls a helper function when clicked
clear.addEventListener('click', clearScreen)
deleteNumber.addEventListener('click', deleteLastDigit)

// helper functions:
// adds digits to the screen
function addDigit(number) {
    current.textContent = current.textContent + number
}
// adds operators to the screen
function addOperator(operator) {
    current.textContent = current.textContent + operator
}

/*
 calculate function takes 3 parameters and calls helper math function according to
 current operator;
 returns the result of the calculation
 */
function calculate(a, operator, b) {
    let result
    switch (operator) {
        case '+':
            result = add(a, b)
            break
        case '-':
            result = subtract(a, b)
            break
        case '×':
            result = multiply(a, b)
            break
        case '÷':
            result = divide(a, b)
            break
    }
    return result
}
// clears the screen and resets values
function clearScreen() {
    current.textContent = ''
    prev.textContent = ''
    firstNumber = ''
    secondNumber = ''
    currentOperator = null
    result = ''
}
// deletes the last character from the screen
function deleteLastDigit() {
    current.textContent = current.textContent.slice(0, -1)
}
// simple math functions that take 2 values, operate and return the result
function add(a, b) {
    return parseFloat(a) + parseFloat(b)
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    let quotient = a / b
    // check if the result is int or float
    if (quotient % 1 === 0) {
        return quotient
    }
    else
    // if result is float round it
    return parseFloat(quotient.toFixed(9))
}