// gonna use the ascii table to generate the letters and numbers
// the corresponding arrays will store the range of each type of character in ascii
// special characters are kinda split all over the place so i'll hard code an array of them
const numbers = [48, 57];
const uperCase = [65, 90];
const lowerCase = [97, 123];
//prettier-ignore
const specialCharList = ["!", "@", "#", "$", "%", "^", "&", "*", "(" , ")", "_", "+", ")"];

// for (var code = 32; code < 127; code++) {
//   var chr = String.fromCharCode(code);

//   var line = chr + "\t" + code + "\t" + code.toString(16).toUpperCase();
//   console.log(line);
// }

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
async function writePassword() {
  var password = await generatePassword();
  var passwordText = document.querySelector("#password");
  console.log(password);
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

async function generatePassword() {
  let tempPassword;
  let numOfChars = 2;

  //find out how many characters their password should be and then divide each type of allowed character evenly
  //keep asking them until you get a valid answer also
  // do {
  //   var passwordLength = parseInt(
  //     prompt(
  //       "How long should your password be? (between 8 and 128 characters only)"
  //     )
  //   );
  // } while (isNaN(passwordLength) || passwordLength > 128 || passwordLength < 8);
  passwordLength = 8;
  numOfChars = passwordLength / numOfChars;

  let upperCase = confirm("Would you like uppercase characters?");
  if (upperCase) password = await generateChars(uperCase, numOfChars);
  console.log(password);
  let lowerCase = confirm("How about lowercase ones?");
  let numbers = confirm("Numbers in your password?");
  let specialChars = confirm("Would you like special characters?");

  return { upperCase, lowerCase, numbers, specialChars, passwordLength };
}

function generateChars(typeOfChar, numOfChars) {
  return new Promise((res, rej) => {
    let tempPassword = "";

    if (typeOfChar.length === 2) {
      let i = 0;
      let min = typeOfChar[0];
      let max = typeOfChar[1];
      do {
        i++;
        tempPassword = tempPassword + String.fromCharCode(randomNum(min, max));
        if (i === numOfChars) res(tempPassword);
      } while (i < numOfChars + 1);
    }
  });
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
