const checkLength = (str = '', maxLength = 1) => str.length <= maxLength;

const chekPalindrom = (str = '') => {
  str = str.replaceAll('/\s+/g', '').toUpperCase();
  let result = '';

  for (let i = str.length - 1; i >= 0; i--) {
    result += str.at(i);
  }
  return result === str;
};

const returnNumber = (str = '') => {
  str = str.toString().replaceAll(/\D/g, '');
  return parseInt(str, 10);
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