// gonna use the ascii table to generate the letters and numbers
// the corresponding arrays will store the range of each type of character in ascii
// special characters are kinda split all over the place so i'll hard code an array of some
const numbers = [48, 57];
const upperCase = [65, 90];
const lowerCase = [97, 123];
//prettier-ignore
const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(" , ")", "_", "+", ")"];

// by default our password length and number of each character to get
var passwordLength = 8;
var numOfEach = 2;
var optionsSelected = false;
var useUpperCase, useLowerCase, useNumbers, useSpecialChars;

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
async function writePassword() {
  // wait for results of generatePassword
  var password = await generatePassword();
  var passwordText = document.querySelector("#password");
  // console.log(password, password.length);
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

async function generatePassword() {
  let tempPassword = "";

  !optionsSelected ? selectOptions() : null;
  // I just learned if you simply add those true false values js converts them to integers
  // So lets add them and divide the password length by the total number of different types of characters
  // That way we generate an evenly distributed amount of each in the password
  numOfEach = Math.floor(
    passwordLength /
      (useUpperCase + useLowerCase + useNumbers + useSpecialChars)
  );

  if (useUpperCase) tempPassword += await generateChars(upperCase);
  if (useLowerCase) tempPassword += await generateChars(lowerCase);
  if (useNumbers) tempPassword += await generateChars(numbers);
  if (useSpecialChars) tempPassword += await generateChars(specialChars);

  //if all options are false, they didnt select one.  prompt them and try again
  if (!useUpperCase && !useLowerCase && !useNumbers && !useSpecialChars) {
    alert("You must select at least 1 type of option for your password.");
    generatePassword();
    return;
  }

  optionsSelected = true;
  tempPassword = await addPadding(tempPassword);
  tempPassword = await shuffle(tempPassword);
  return tempPassword;
}

function selectOptions() {
  // find out how many characters their password should be and then divide each type of allowed character evenly
  // also, keep asking them until you get a valid answer.  default to 8 chars
  do {
    passwordLength = parseInt(
      prompt(
        "How long should your password be? (between 8 and 128 characters only)",
        8
      )
    );
  } while (isNaN(passwordLength) || passwordLength > 128 || passwordLength < 8);

  //prompt for each type of character
  useUpperCase = confirm("Would you like uppercase characters?");
  useLowerCase = confirm("How about lowercase ones?");
  useNumbers = confirm("Numbers in your password?");
  useSpecialChars = confirm("Would you like special characters?");
}

function generateChars(typeOfChar) {
  return new Promise((res) => {
    let tempPassword = "";
    let i = 0;
    let min = typeOfChar[0];
    let max = typeOfChar[1];

    do {
      i++;
      // if typeOfChar length is 2, it is either upperCase, lowerCase, or a number
      // otherwise it is the much longer specialChars array
      tempPassword =
        typeOfChar.length === 2
          ? tempPassword + String.fromCharCode(randomNum(min, max))
          : tempPassword + specialChars[randomNum(0, specialChars.length - 1)];
      if (i === numOfEach) res(tempPassword);
    } while (i < numOfEach + 1);
  });
}

// one-liner from stackOverflow to generate random number between min and max values
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// shuffle resulting string of characters
function shuffle(tempPassword) {
  return new Promise((res) => {
    // take tempPassword and turn into array using spread operator
    let pwd = [...tempPassword];
    let currentIndex = 0;
    let len = tempPassword.length;

    // loop through each index in array of characters
    do {
      currentIndex++;
      // pick a random index in the array
      let randIndex = randomNum(0, len - 1);

      // save that character of the current index temporarily.
      // we gonna swap it with a random one
      let temp = pwd[currentIndex];

      // save character at a random index into the current index
      pwd[currentIndex] = pwd[randIndex];

      // take the character we saved in temp and place it in the random index
      pwd[randIndex] = temp;

      // if we reached the final index, resolve promise with a joined version of
      // the pwd array with an empty string. results is the array is one word again
      if (currentIndex === len) res(pwd.join(""));
    } while (currentIndex < len);
  });
}

// if the passwordLength isnt evenely divisibly by numOfEach, we wont generate the amount of characters
// the user specified.  The way i'll solve that is by adding random characters until the length is correct
// I forgot that maybe they want a password of only numbers or something, so instead of
// just using random lowercase letters, I will take a random character we already picked
// and just pad the end of the passwor with it
function addPadding(tempPassword) {
  return new Promise((res) => {
    let padding = "";
    let i = 0;
    //if the password is the right length, no need for padding.  just return it
    if (tempPassword.length === passwordLength) res(tempPassword);

    //figure out the difference between the amount of chars we generate vs how many we need
    let difference = passwordLength - tempPassword.length;
    let randomChar = [...tempPassword][randomNum(0, tempPassword.length - 1)];

    //loop and add randomly selected character to end of tempPassword
    do {
      i++;
      padding += randomChar;
      // when we reach the goal, resolve the promise
      if (i === difference) res(tempPassword + padding);
    } while (i < difference + 1);
  });
}
