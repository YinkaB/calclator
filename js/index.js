class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
    // Clear display function
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
    // Delete input function
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    // add number to the screen
    appendNumber(number) {
      // limiting the user to only one period
      if (number === '.' && this.currentOperand.includes('.')) return
      // appending number to the screen instead of adding them up
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    // Function for operation buttons
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
    // Function for the Calculations
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      // check if the user types in a number or not
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
    // Display Digits
    getDisplayNumber(number) {
      return number
    }
    // Function that updates values on output screen
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
// Variable declarartions  
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// Creating a calculator based on the calculator class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Looping all over the different buttons to add eventlisteners
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})
  
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
  
equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})
  
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})
  
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
