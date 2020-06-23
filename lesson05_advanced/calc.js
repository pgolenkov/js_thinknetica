'use strict';

let action, result;
let operand1 = '';
let operand2 = '';

const operand1Field = document.getElementById('operand1');
const actionField = document.getElementById('action');
const operand2Field = document.getElementById('operand2');
const resultField = document.getElementById('result');

const table = document.getElementsByTagName('table')[0];
table.addEventListener('click', click);
document.addEventListener('keydown', press);

function calcReset() {
    operand1 = '';
    operand2 = '';
    action = null;
    result = null;

    operand1Field.value = '';
    operand2Field.value = '';
    actionField.value = '';
    resultField.value = '';
}

function calcSetAction(actionValue) {
    if (action || !operand1.length)
        return;

    action = actionValue;
    actionField.value = action;
}

function calcResult() {
    if (!operand2.length)
        return;
    const number1 = parseInt(operand1);
    const number2 = parseInt(operand2);

    switch (action) {
        case '+':
            result = number1 + number2;
            break;
        case '-':
            result = number1 - number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            result = number1 / number2;
            break;
    };

    resultField.value = result;
}

function calcDigit(digit) {
    if (action) {
        operand2 = operand2.concat(digit);
        operand2Field.value = operand2;
    } else {
        operand1 = operand1.concat(digit);
        operand1Field.value = operand1;
    }
}


function click(event) {
    const button = event.target;

    if (button.tagName !== 'TD')
        return;

    if (button.dataset.reset)
        calcReset();

    if (result)
        return;

    if (button.dataset.action)
        calcSetAction(button.dataset.action)

    if (button.dataset.result)
        calcResult();

    if (!isNaN(button.dataset.value))
        calcDigit(button.dataset.value);
}

function press(event) {
    if (event.code === 'Escape')
        calcReset();

    if (result)
        return;

    if (['+', '-', '*', '/'].indexOf(event.key) > -1)
        calcSetAction(event.key)

    if (event.key === '=')
        calcResult();

    if (event.key >= '0' && event.key <= '9')
        calcDigit(event.key);
}
