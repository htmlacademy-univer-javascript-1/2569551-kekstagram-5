const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength();

function isPalindrom (string) {

  const stringWithoutSpaces = string.replaceAll(' ', '').toUpperCase();

  let reversedString = '';

  for (let i = stringWithoutSpaces.length - 1; i >= 0; i--) {
    reversedString += stringWithoutSpaces[i];
  }
  return stringWithoutSpaces === reversedString;
}

isPalindrom();

function getNumber (input) {
  const string = String(input);
  let number = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(input[i], 10))) {
      number += string[i];
    }
  }

  const result = parseInt(number, 10);
  return Number.isNaN(result) ? NaN : result;
}

getNumber();
