// symbole matematyczne
const SYMBOL_SQRT = '\u221A';
const SYMBOL_SQRT_TO_3 = '\u221B';
const SYMBOL_E = '\u2107';
const SYMBOL_PI = '\u03C0';

// zmienne pomocnicze
let result = '';        // zmienna result musi być stringiem aby nie pojawił się problem z wykonaniem działania niedozwolonego (Przykład to silnia, gdy wykonujemy dzialanie z liczby niedozwolonej)
let tempNumber = 0;
let tempPrevNumber = 0;
let tempNumberToLog = 0;

const isNatural = (num) => {
  if(num > 0 && Math.floor(num) === num){
    return true;
  }
  return false;
} 

const silnia = (n) => {
  if(n == 0)
    return 1

  if (n > 1)
    return n * silnia(n-1);
  else
    return 1;
}

const getLog = (x, y) => {
  if(x > 0 && y > 0 && x != 1)
    return Math.log(y) / Math.log(x);
  return 
}

const cot = (n) => {
  if(Math.sin(n) === 0)
    return
  return Math.cos(n) / Math.sin(n);
}

const tan = (n) => {
  // Zabezpiecza przed dzieleniem cos(n) = 0 
  if(n % (Math.PI / 2) === 0 && n % Math.PI != 0 && n != 0)
    return
  return Math.sin(n) / Math.cos(n);
}

const fromDegreesToRadians = (n) => {
  return  Math.PI * n / 180
}

// Jeżeli za przecinkiem sa same zera to zwróć prawde, jesli jest jakas liczba to zwróć fałsz
const ifAfterComaIsNumber = (string1) => {
  let IsComa = false;
  
  for (let letter of string1){
    if(IsComa){
      if(letter !== '0'){
        return false;
      }
    }
    
    if(letter === '.'){
      IsComa = true;
    } 
  }

  return true;
}

const roundFun = (string1) => {
  const indexOfComa = string1.indexOf('.');
  let counter = 0;

  for(let i = indexOfComa + 1; i < string1.length; i++){
    counter++;
  }

  if(counter > 6){
    return 6;
  }
    
  return counter;
}

const checkLastIndex = (string1) => {
  while(string1.endsWith('0')){
    string1 = string1.slice(0, -1);
  }

  // zabezpiecza przed wynikiem równym 0. 
  if(string1.endsWith('.')){
    string1 = string1.slice(0, -1);
  }

  // zabezpiecza przed sytuacją kiedy jest -0
  if(string1 === '-0'){
    string1 = '0';
  }

  return string1;
}