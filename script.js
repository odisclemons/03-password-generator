// gonna use the ascii table to generate the letters and numbers
// the corresponding arrays will store the range of each type of character in ascii
// special characters are kinda split all over the place so i'll hard code an array of them
const numbers = [48, 57];
const uperCase = [65, 90];
const lowerCase = [97, 123];
//prettier-ignore
const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(" , ")", "_", "+", ")"];

var passwordLength;

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
  let tempPassword = "";
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
  passwordLength = 12;
  numOfChars = 0;

  let useUpperCase = confirm("Would you like uppercase characters?");

  let useLowerCase = confirm("How about lowercase ones?");
  let useNumbers = confirm("Numbers in your password?");
  let useSpecialChars = confirm("Would you like special characters?");

  // I just learned if you simply add those true false values js converts them to integers
  // So lets add them and divide the password length by the total number of different types of characters
  // That way we generate an evenly distributed amount of each in the password
  numOfChars =
    passwordLength /
    (useUpperCase + useLowerCase + useNumbers + useSpecialChars);

  if (useUpperCase) tempPassword += await generateChars(uperCase, numOfChars);
  console.log(tempPassword);
  if (useLowerCase) tempPassword += await generateChars(lowerCase, numOfChars);
  console.log(tempPassword);
  if (useNumbers) tempPassword += await generateChars(numbers, numOfChars);
  console.log(tempPassword);
  if (useSpecialChars)
    tempPassword += await generateChars(specialChars, numOfChars);
  console.log(tempPassword);
  return tempPassword;
}

function generateChars(typeOfChar, numOfChars) {
  return new Promise((res, rej) => {
    let tempPassword = "";
    let i = 0;
    if (typeOfChar.length === 2) {
      let min = typeOfChar[0];
      let max = typeOfChar[1];
      do {
        i++;
        tempPassword = tempPassword + String.fromCharCode(randomNum(min, max));
        if (i === numOfChars) res(tempPassword);
      } while (i < numOfChars + 1);
    } else {
      if (numOfChars)
        do {
          i++;
          tempPassword =
            tempPassword + specialChars[randomNum(0, specialChars.length - 1)];
          if (i === numOfChars) res(tempPassword);
        } while (i < numOfChars + 1);
    }
  });
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function determineNumOfChars() {}
