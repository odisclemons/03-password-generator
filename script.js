// gonna use the ascii table to generate the letters and numbers
// the corresponding arrays will store the range of each type of character in ascii
// special characters are kinda split all over the place so i'll hard code an array of them
const numbers = [48, 57];
const upperCase = [65, 90];
const lowerCase = [97, 123];
//prettier-ignore
const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(" , ")", "_", "+", ")"];

var passwordLength;
var numOfChars = 2;

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
async function writePassword() {
  var password = await generatePassword();
  var passwordText = document.querySelector("#password");
  console.log(password, password.length);
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

async function generatePassword() {
  let tempPassword = "";

  //find out how many characters their password should be and then divide each type of allowed character evenly
  //keep asking them until you get a valid answer also
  // do {
  //   var passwordLength = parseInt(
  //     prompt(
  //       "How long should your password be? (between 8 and 128 characters only)"
  //     )
  //   );
  // } while (isNaN(passwordLength) || passwordLength > 128 || passwordLength < 8);
  passwordLength = 14;
  numOfChars = 0;

  let useUpperCase = confirm("Would you like uppercase characters?");

  let useLowerCase = confirm("How about lowercase ones?");
  let useNumbers = confirm("Numbers in your password?");
  let useSpecialChars = confirm("Would you like special characters?");

  // I just learned if you simply add those true false values js converts them to integers
  // So lets add them and divide the password length by the total number of different types of characters
  // That way we generate an evenly distributed amount of each in the password
  numOfChars = Math.floor(
    passwordLength /
      (useUpperCase + useLowerCase + useNumbers + useSpecialChars)
  );
  console.log(numOfChars);

  if (useUpperCase) tempPassword += await generateChars(upperCase, numOfChars);
  console.log(tempPassword);
  if (useLowerCase) tempPassword += await generateChars(lowerCase, numOfChars);
  console.log(tempPassword);
  if (useNumbers) tempPassword += await generateChars(numbers, numOfChars);
  console.log(tempPassword);
  if (useSpecialChars)
    tempPassword += await generateChars(specialChars, numOfChars);
  console.log(tempPassword);
  tempPassword = await addPadding(tempPassword);
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

// if the passwordLength isnt evenely divisibly by numOfChars, we wont generate the amount of characters
// the user specified.  The way i'll solve that is by adding random characters until the length is correct
function addPadding(tempPassword) {
  return new Promise((res, rej) => {
    let padding = "";
    let i = 0;
    //if the password is the right length, no need for padding.  just return it
    if (tempPassword.length === passwordLength) res(tempPassword);

    //figure out the difference between the amount of chars we generate vs how many we need
    let difference = passwordLength - tempPassword.length;
    let min = lowerCase[0];
    let max = lowerCase[1];

    //loop and generate random lowercase chars
    do {
      i++;
      padding += String.fromCharCode(randomNum(min, max));
      if (i === difference) res(tempPassword + padding);
    } while (i < difference + 1);
  });
}
