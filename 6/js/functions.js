const checkLength = (str = '', maxLength = 1) => str.length <= maxLength;

const cheсkPalindrom = (str = '') => {
  const normStr = str.replaceAll(/\s+/g, '').toUpperCase();
  let result = '';

  for (let i = normStr.length - 1; i >= 0; i--) {
    result += normStr.at(i);
  }
  return result === normStr;
};

const returnNumber = (str = '') => {
  const returnStr = str.toString().replaceAll(/\D/g, '');
  return parseInt(returnStr, 10);
};

/*
let checkLength = function (str, maxLength) {
  return str.length <= maxLength;
};

let chekPalindrome = function (str) {
  let normStr = string.replaceAll(' ', '').toUpperCase();
  let result = '';

  for (let i = normStr.length - 1; i >= 0; i--) {
    result += normStr.at(i);
  }
 return result === normStr;
};

let returnNumber = function (str) {
  let = normStr = string.toString().replaceAll(/\D/g, '');
  return normStr;
  };
  */
