// Check if document is still loading
if (document.readState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var calculated = false;
// Javascript only runs when page is done loading 
function ready () {
    // Boolean if calculator already calculated or not
    // Digit button functionality
    var digitButtons = document.getElementsByClassName('digit-button');
    for (var i = 0; i < digitButtons.length; i++) {
        digitButtons[i].addEventListener('click', addToOperand);

    }
    // Decimal button functionality
    document.getElementsByClassName('decimal-button')[0].addEventListener('click', addDecimal);
    // Operation button functionality
    var operationButtons = document.getElementsByClassName('operation-button');
    for (var i = 0; i < operationButtons.length; i++) {
        operationButtons[i].addEventListener('click', addOperation);
    }
    // Clear button functionality
    var clearButton = document.getElementsByClassName('clear-button')[0];
    clearButton.addEventListener('click', clearValues);
    // Equals button functionality
    document.getElementsByClassName('equals-button')[0].addEventListener('click', equalsButtonStuff);
}

function addToOperand(event) {
    console.log(calculated)
    var operand = document.getElementsByClassName('operand')[0];
    if (calculated) {
        operand.innerText = event.target.innerText;
        calculated = false;
    }
    else {
        if (event.target.innerText == "0" && operand.innerText[0] == "0" && operand.innerText.length == 1) {
            return;
        }
        if (operand.innerText == "0") {
            operand.innerText = event.target.innerText;
        }
        else {
            operand.innerText = operand.innerText + event.target.innerText;
        }
    }
}

function addDecimal(event) {
    var operand = document.getElementsByClassName('operand')[0];
    if (calculated) {
        operand.innerText = event.target.innerText;
        calculated = false;
    }
    else {
        if (operand.innerText.includes(".")) {
            return;
        }
        operand.innerText += event.target.innerText;
    }
}

function addOperation(event) {

    // Check if there's already a string in the prev-operand
    var prevOperand = document.getElementsByClassName('prev-operand')[0];

    if (prevOperand.innerText != "") {
        return;
    }
    var operation = event.target.innerText;
    var operand = document.getElementsByClassName('operand')[0];

    prevOperand.innerText = operand.innerText + " " + operation;
    operand.innerText = "";

}

function clearValues() {

    if (calculated) {
        calculated = false;
    }
    document.getElementsByClassName('operand')[0].innerText = "";
    document.getElementsByClassName('prev-operand')[0].innerText = "";
}

function equalsButtonStuff() {
    // Get previous operand stuff

    var prevOperandElement = document.getElementsByClassName('prev-operand')[0];
    if (prevOperandElement.innerText == "") {
        calculated = true;
        return;
    }
    var prevOperandList = prevOperandElement.innerText.split(" ");
    var prevOperand = parseFloat(prevOperandList[0]);
    var operation = prevOperandList[1];
    var operandElement = document.getElementsByClassName('operand')[0];
    var operand = parseFloat(operandElement.innerText);

    // Do the calculation
    // console.log(prevOperand, operation, operand);
    var result;
    if (operation == "÷") {
        result = prevOperand / operand;
    }
    else if (operation == "x") {
        result = prevOperand * operand;
    }
    else if (operation == "-") {
        result = prevOperand - operand;
    }
    else {
        result = prevOperand + operand;
    }

    // // Set the stuff

    document.getElementsByClassName('prev-operand')[0].innerText = ""
    document.getElementsByClassName('operand')[0].innerText = result;
    calculated = true;

}

