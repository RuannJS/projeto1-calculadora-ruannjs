
// HTML LINK
const input = document.querySelector('.input')
const operationOutput = document.querySelector('.operation .value')
const resultOutput = document.querySelector('.result .value')
const modal = document.querySelector('.modal-body')
const history = document.querySelector('#history')



// KEY AND RESULT ACCESS
let answer = ''
let previousKey = ''
let lastResult = ''


// DATA STORAGE
let data = {
    operation: [],
    formula: []
}


// BUTTONS 
let calculatorButtons = [
    {
        name: "clear",
        symbol: "CE",
        formula: false,
        type: "key"
    }
    ,
    {
        name: "allClear",
        symbol: "AC",
        formula: false,
        type: "key"
    }
    ,
    {
        name: "percentage",
        symbol: "%",
        formula: '/100',
        type: "operator"
    }
    ,
    {
        name: "openParentheses",
        symbol: "(",
        formula: '(',
        type: "parentheses"

    }
    ,
    {
        name: "closeParentheses",
        symbol: ")",
        formula: ')',
        type: "parentheses"
    }
    ,
    {
        name: "add",
        symbol: "+",
        formula: "+",
        type: "operator"
    }

    ,
    {
        name: "subtract",
        symbol: "-",
        formula: "-",
        type: "operator"
    }

    ,
    {
        name: "multiplication",
        symbol: "x",
        formula: "*",
        type: "operator"
    }

    ,
    {
        name: "division",
        symbol: "÷",
        formula: "/",
        type: "operator"
    }
    ,
    {

        name: "1",
        symbol: 1,
        formula: 1,
        type: "number"
    }
    ,
    {
        name: "2",
        symbol: 2,
        formula: 2,
        type: "number"
    }
    ,
    {
        name: "3",
        symbol: 3,
        formula: 3,
        type: "number"
    }
    ,
    {
        name: "4",
        symbol: 4,
        formula: 4,
        type: "number"
    }
    ,
    {
        name: "5",
        symbol: 5,
        formula: 5,
        type: "number"
    }
    ,
    {
        name: "6",
        symbol: 6,
        formula: 6,
        type: "number"
    }
    ,
    {
        name: "7",
        symbol: 7,
        formula: 7,
        type: "number"
    }
    ,
    {
        name: "8",
        symbol: 8,
        formula: 8,
        type: "number"
    }
    ,
    {
        name: "9",
        symbol: 9,
        formula: 9,
        type: "number"
    }
    ,
    {
        name: "0",
        symbol: 0,
        formula: 0,
        type: "number"
    }
    ,
    {
        name: "decimal",
        symbol: ".",
        formula: '.',
        type: "decimal"
    }
    // CALCULATE
    ,
    {
        name: "calculate",
        symbol: "=",
        formula: "=",
        type: "calculate"
    }

]

createCalculator()

// CREATING BUTTONS

function createCalculator() {
    const buttonsPerRow = 3
    let addedButtons = 0

    input.innerHTML += `<div class="row"></div>`

    calculatorButtons.forEach(button => {
        const type = button.type
        const name = button.name
        const symbol = button.symbol
        if (addedButtons % buttonsPerRow == 0) {
            input.innerHTML += `<div class="row"></div>`
        }
        const row = document.querySelector(".row:last-child")
        if (type == 'operator' || type == 'parentheses') {
            row.innerHTML += `<button class="col btn btn-md btn-warning m-1" id="${name}"> ${symbol} </button>`
        } else if (type == 'key') {
            row.innerHTML += `<button class="col btn btn-md btn-success m-1" id="${name}"> ${symbol} </button>`
        } else if (type == 'calculate') {
            row.innerHTML += `<button class="col btn btn-md btn-primary m-1" id="${name}"> ${symbol} </button>`
        } else {
            row.innerHTML += `<button class="col btn btn-md btn-dark m-1" id="${name}"> ${symbol} </button>`
        }
        addedButtons++
    })

    // HISTORY MODAL DEFAULT
    if (history.textContent == '') {
        history.textContent += `Waiting for your math problems!`
    }
}



// INTERFACE UPDATES
function updateOutputOperation(operation) {
    operationOutput.innerHTML = operation
}

function updateOutputResult(result) {
    resultOutput.innerHTML = result
}


// TARGETING BUTTONS

input.addEventListener("click", event => {

    const targetButton = event.target

    calculatorButtons.forEach(button => {

        if (button.name == targetButton.id) {
            calculator(button)
        }
    })
})

// CALCULATOR FUNCTIONS

function calculator(buttonObject) {

    validateContent(buttonObject)

    let symbol = buttonObject.symbol
    let formula = buttonObject.formula
    let type = buttonObject.type
    let name = buttonObject.name


    // NUMBERS
    if (type == 'number') {
        data.operation.push(symbol)
        data.formula.push(formula)
        previousKey = 'number'
    }

    // OPERATORS 
    else if (type == 'operator') {
        data.operation.push(symbol)
        data.formula.push(formula)
        if (name == 'percentage') {
            previousKey = 'percentage'
        } else {
            previousKey = 'operator'
        }
    }

    // PARENTHESES
    else if (type == 'parentheses') {
        data.operation.push(symbol)
        data.formula.push(formula)
        if (name == 'openParentheses') {
            previousKey = 'openParentheses'
        } else {
            previousKey = 'closeParentheses'
        }

        // DECIMAL
    }
    else if (type == 'decimal') {
        data.operation.push(symbol)
        data.formula.push(formula)
        previousKey = 'decimal'
    }

    // CALCULATE
    else if (type == 'calculate') {
        let joinedFormula = data.formula.join('')
        let result
        try {
            result = eval(joinedFormula)
        } catch (error) {
            if (error instanceof SyntaxError) {
                result = "Syntax Error!"
                updateOutputResult(result)
                return
            }
        }
        answer = data.operation.join('')
        lastResult = eval(joinedFormula)
        updateOutputOperation(data.operation.join(''))
        data.operation = [result]
        updateOutputResult(answer + ' =')
        previousKey = 'calculate'
        updateHistoryModal(answer, lastResult)
    }

    // KEYS

    if (type == 'key') {
        if (name == 'clear') {
            popData()
            updateOutputResult('Ans = ' + lastResult)
            console.log(data.operation)
            previousKey = 'clear'
            if (data.operation.length == 0) {
                updateOutputOperation(0)
                data.operation = []
                data.formula = []
            } else {
                updateOutputOperation(data.operation.join(''))
            }
        } else if (name == 'allClear') {
            updateOutputOperation(0)
            updateOutputResult('Ans = ' + lastResult)
            data.operation = []
            data.formula = []
            previousKey = 'allClear'
        }
    } else {
        updateOutputOperation(data.operation.join(''))
    }
}

// VALIDATING CONTENT

function validateContent(buttonObject) {


    let type = buttonObject.type
    let name = buttonObject.name

    // PREVIOUS KEYS
    if (type == 'operator') {
        if (previousKey == 'operator') {
            popData()
        }
        else if (previousKey == 'calculate') {
            data.operation = [lastResult]
            data.formula = [lastResult]
            updateOutputResult('Ans = ' + lastResult)
            updateOutputOperation(lastResult)
        }
    }
    else if (type == 'decimal') {
        if (previousKey == 'decimal') {
            popData()
        } else if (previousKey == 'calculate') {
            data.operation = []
            data.formula = []
            updateOutputResult('Ans = ' + lastResult)
        }
    }
    else if (type == 'number') {
        if (previousKey == 'percentage') {
            data.operation.push('x')
            data.formula.push('*')
        } else if (previousKey == 'calculate') {
            data.operation = []
            data.formula = []
            updateOutputResult('Ans = ' + lastResult)
        } else if (previousKey == 'closeParentheses') {
            data.operation.push('x')
            data.formula.push('*')
            console.log('cheguei')
        }
    }
    else if (type == 'parentheses') {
        if (previousKey == 'parentheses') {
            popData()
        }
        else if (name == 'openParentheses' && previousKey == 'number') {
            data.operation.push('x')
            data.formula.push('*')
        }
        else if (name == 'closeParentheses') {
            if (!data.operation.includes('(')) {
                popData()
            }
            else if (previousKey == 'parentheses') {
                popData()
            }
        }
    }
}

// DATA POP SHORTCUT
function popData() {
    data.formula.pop()
    data.operation.pop()
}

// HISTORY MODAL

function updateHistoryModal(operation, result) {
    history.textContent = 'Here are your math problems!'
    modal.innerHTML += `<p>${operation} = ${result}</p>`
}
