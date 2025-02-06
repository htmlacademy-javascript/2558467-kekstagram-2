let checkLength = function (string, maxLength) {
  return string.length <= maxLength;
};

let chekPalindrome = function (string) {
  let normString = string.replaceAll(' ', '').toUpperCase();
  let result = '';

  for (let i = normString.length - 1; i >= 0; i--) {
    result += normString.at(i);
  }
 return result === normString;
};

let returnNumber = function (string) {
  normString = string.toString().replaceAll(/\D/g, '');
  return normString;
  };