const isStrShorterOrEquil = (str, maxLength) => str.length <= maxLength;

// console.log(isStrShorterOrEquil('проверяемая строка', 20)); //true
// console.log(isStrShorterOrEquil('проверяемая строка', 18)); //true
// console.log(isStrShorterOrEquil('проверяемая строка', 10)); //false


const isPalindrom = (str) => {
  const editedStr = str.replaceAll(' ', '').toLowerCase();
  const copiedStr = editedStr.slice();
  const reversedStr = copiedStr.split('').reverse().join('');
  return(editedStr === reversedStr);
};

// console.log(isPalindrom('топот')); //true
// console.log(isPalindrom('ДовОд')); //true
// console.log(isPalindrom('Кекс')); //false
// console.log(isPalindrom('Лёша на полке клопа нашёл ')); //true


const getNumbers = (str) => {

  const regExp = /\d*/g;
  let result = str.toString().match(regExp).join('');
  if (!result) {
    result = NaN;
  }
  return result;
};

// console.log(getNumbers('2023 год')); //2023
// console.log(getNumbers('ECMAScript 2022')); //2022
// console.log(getNumbers('1 кефир, 0.5 батона')); //105
// console.log(getNumbers('агент 007')); //007
// console.log(getNumbers('а я томат')); //NaN
// console.log(getNumbers(2023)); //2023
// console.log(getNumbers(-1)); //1
// console.log(getNumbers(1.5)); //15

