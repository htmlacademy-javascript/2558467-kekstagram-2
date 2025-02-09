let checkLength = function (str, maxLength) {
  return str.length <= maxLength;
};

let chekPalindrome = function (str) {
  let normStr = str.replaceAll(' ', '').toUpperCase();
  let result = '';

  for (let i = normStr.length - 1; i >= 0; i--) {
    result += normStr.at(i);
  }
 return result === normStr;
};

let returnNumber = function (str) {
  normStr = str.toString().replaceAll(/\D/g, '');
  return parseInt(normStr, 10);
  };