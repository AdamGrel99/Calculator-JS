// funkcja, która wyświetla liczby na ekranie
function addNumFun(){
  // Chroni przed wpisywaniem zbyt dużej ilości cyfr w wyswietlaczu
  if(currentNumber.innerHTML.length > 14){
    return
  }

  // Warunki zabezpieczające przed nadmiernym wpisywaniem przecinka oraz
  // kosmetyczne poprawki dla przecinka i zera na początku
  if((currentNumber.innerHTML === '' || currentNumber.innerHTML === SYMBOL_E || currentNumber.innerHTML === SYMBOL_PI || currentNumber.innerHTML === '0') && this.textContent === '.'){
    return currentNumber.innerHTML = '0.'
  } 
  else if(currentNumber.innerHTML.includes('.') && this.textContent === '.'){
    return
  }

  // Warunek dla wyświetlenia tylko e
  if(this.textContent === SYMBOL_E){
    if(currentNumber.innerHTML.includes(SYMBOL_E) === true){
      return
    }
    return currentNumber.innerHTML = this.textContent
  }

  // Warunek dla wyświetlenia tylko pi
  if(this.textContent === SYMBOL_PI){
    if(currentNumber.innerHTML.includes(SYMBOL_PI) === true){
      return
    }
    return currentNumber.innerHTML = this.textContent
  }

  // Warunek pozwalający po wyświetleniu pi lub e lub 0 na zmiane wartości
  if (currentNumber.innerHTML === SYMBOL_PI || currentNumber.innerHTML === SYMBOL_E || currentNumber.innerHTML === '0'){
    return currentNumber.innerHTML = this.textContent
  }

  currentNumber.innerHTML += this.textContent;
}

// funkcja, która wykonuje operacje w zależności od dzialania
function operationFun(){
  // Chroni przed kliknięciem w przycisk operacyjny, kiedy nie ma podanej żadnej liczby oraz
  // dodaje liczbe ujemna
  if(currentNumber.innerHTML === ''){
    if(this.textContent === '-'){
      currentNumber.innerHTML = '-';
    }
    return
  }

  // To się wykonuje, kiedy zamiast nacisnąć przycisk równości jeszcze raz wykonamy przycisk operacji
  if(currentNumber.innerHTML !== '' && previousNumber.innerHTML !== ''){
    equalsFun();
  }

  // Tutaj wykonujemy operację dla jednoargumentowych działań i dwuargumentowych działań
  if(this.textContent === 'sin' || this.textContent === 'cos' || this.textContent === 'tan' || this.textContent === 'cot' || this.textContent === '!' || this.textContent === SYMBOL_SQRT || this.textContent === SYMBOL_SQRT_TO_3){
    calculations(this.textContent);
  }else{ 
    // Tutaj manipulujemy w jaki sposob maja się rzeczy wyświetlać w okienku na dzialania matematyczne
    if(this.textContent === 'log'){
      tempNumberToLog = currentNumber.innerHTML;
      mathOperation.innerHTML = `log(${tempNumberToLog}) z`;
    }else{
      mathOperation.innerHTML = this.textContent;
      previousNumber.innerHTML = currentNumber.innerHTML;
    }
    currentNumber.innerHTML = '';
  }
}

// funkcja, która usuwa ostatni element w wyświrtlonej liczbie
function deleteFun(){
  currentNumber.innerHTML = currentNumber.innerHTML.slice(0, -1);
}

// funkcja resetująca kalkulator
function clearFun(){
  currentNumber.innerHTML = '';
  previousNumber.innerHTML = '';
  mathOperation.innerHTML = '';
}

// funkcja zwracająca wynik
function equalsFun(){
  //Chroni przed nacisnieciem przycisku rownosci kiedy nie podamy argumentów
  if(previousNumber.innerHTML === '' && currentNumber.innerHTML === ''){
    return
  }
  calculations(mathOperation.innerHTML);
}

// funkcja czyszcząca historie
function clearHistoryFun(){
  listOfHistoryItem.textContent = '';
    if(listOfHistoryItem.textContent === '') {
      clearHistory.classList.remove('active');
    }
}

// funkcja wykonująca obliczenia
function calculations(expression){
  // funkcje konwertujace wartość z wyświetlacza oraz wyjatki pi i e na liczby
  if(currentNumber.innerHTML === SYMBOL_E){
    tempNumber = Math.E;
  }else if(currentNumber.innerHTML === SYMBOL_PI){
    tempNumber = Math.PI;
  }else{
    tempNumber = Number(currentNumber.innerHTML);
  }

  if(previousNumber.innerHTML === SYMBOL_E){
    tempPrevNumber = Math.E;
  }else if(previousNumber.innerHTML === SYMBOL_PI){
    tempPrevNumber = Math.PI;
  }else{
    tempPrevNumber = Number(previousNumber.innerHTML);
  }
  
  // W zależności od działania wykonaj obliczenie
  switch(expression){
    case 'sin':
      result = Math.sin(fromDegreesToRadians(tempNumber));
      break;
    case 'cos':
      result = Math.cos(fromDegreesToRadians(tempNumber));
      break;
    case 'tan':
      result = tan(fromDegreesToRadians(tempNumber));
      break;
    case 'cot':
      result = cot(fromDegreesToRadians(tempNumber));
      break;
    case SYMBOL_SQRT:
      // zabezpiecza przed pierwiastkowaniem liczby ujemnej
      if (tempNumber < 0)
        return
      result = Math.sqrt(tempNumber);
      break;
    case SYMBOL_SQRT_TO_3:
      result = Math.cbrt(tempNumber);
      break; 
    case '!':
      if(isNatural(tempNumber) || tempNumber === 0){
        result = silnia(tempNumber);
      }
      break;
    case '+':
      result = tempNumber + tempPrevNumber;
      break;
    case '-':
      result = tempPrevNumber - tempNumber;
      break;
    case '/':
      result = tempPrevNumber / tempNumber;
      break;
    case '*':
      result = tempNumber * tempPrevNumber;
      break;
    case '^':
      result = Math.pow(tempPrevNumber, tempNumber);
      break;
    case 'mod':
      result = tempPrevNumber % tempNumber;
      break;
    case `log(${tempNumberToLog}) z`:
      result = getLog(Number(tempNumberToLog), tempNumber);
      break;
  }

  // Zabezpieczenie dla przypadku kiedy result nie zostanie przypisany do żadnej wartości (wtedy jest on stringiem poprzedniego przypadku lub przy pierwszy wartością domyślną)
  if(typeof(result) === 'string' || typeof(result) === 'undefined')
    return

  // Koryguje zaokrąglenia do maksymalnie 6 cyfr po przecinku oraz długość ogromnej liczby
  if(ifAfterComaIsNumber(result.toString())){
    result = result.toFixed(0);
  }else{
    result = checkLastIndex(result.toFixed(roundFun(result.toString())));
  } 

  if(result.length > 14){
    result = Number(result).toPrecision(12);
  }
  
  addElementToHistory(expression);
  clearHistory.classList.add('active');
  currentNumber.innerHTML = result;
  previousNumber.innerHTML = '';
  mathOperation.innerHTML = '';
}

// Funkcja dodająca elementy do historii
function addElementToHistory(a){
  const newHistoryItem = document.createElement('div');

  if(mathOperation.innerHTML === ''){
    newHistoryItem.innerHTML = `${a} ( ${currentNumber.innerHTML} ) = ${result}`
  }else{
    newHistoryItem.innerHTML = `${previousNumber.innerHTML} ${mathOperation.innerHTML} ${currentNumber.innerHTML} = ${result}`
  }

  newHistoryItem.classList.add('element-in-history-list');
  listOfHistoryItem.appendChild(newHistoryItem);
}








// Nasłuchiwanie przycisków
numbers.forEach((button) => {
  button.addEventListener('click', addNumFun);
});

actions.forEach((button) => {
  button.addEventListener('click', operationFun);
});

deleteLastNumber.forEach((button) => {
  button.addEventListener('click', deleteFun);
});

clearAll.addEventListener('click', clearFun);

equals.addEventListener('click', equalsFun);

clearHistory.addEventListener('click', clearHistoryFun);