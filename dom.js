// DOM 
// Elementy dla przycisków kalkulatora
const numbers = document.querySelectorAll('.number');
const actions = document.querySelectorAll('.action');
const deleteLastNumber = document.querySelectorAll('.delete');
const clearAll = document.querySelector('.clear');
const equals = document.querySelector('.equals');

// Elementy Ekranu
const currentNumber = document.querySelector('.actual-input');
const previousNumber = document.querySelector('.history-input');
const mathOperation = document.querySelector('.math-input');

// Elementy historii obliczeń
const clearHistory = document.querySelector('.clear-history-button');
const listOfHistoryItem = document.querySelector('.history-lists');