const guessLetters = document.querySelector (".guessed-letters"); //The unordered list where the player’s guessed letters will appear
const guessLetterbutton = document.querySelector (".guess"); //The button with the text “Guess!” in it
const letterInput = document.querySelector (".letter"); //The text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress"); //The empty paragraph where the word in progress will appear
const remainingGuess = document.querySelector (".remaining");//The paragraph where the remaining guesses will display
const remainingMessageSpan = document.querySelector(".remaining span"); //The span inside the paragraph where the remaining guesses will display
const message = document.querySelector (".message");//The empty paragraph where messages will appear when the player guesses a letter
const playAgainButton = document.querySelector(".play-again"); //The hidden button that will appear prompting the player to play again

let word = "magnolia";
const guessedLetters =[];
let remainingGuesses = 8;

//fetch random word
const getWord = async function () {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //console.log (words);
    const wordArray = words.split("\n");
    //console.log (wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
}
 getWord();



//element with circle symbols (●) to represent each letter in the word
const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word) {
        console.log (letter);
        placeholderLetters.push ("●");
    }
  wordInProgress.innerText =placeholderLetters.join("");
  //use an array and then join it back to a string using the .join("") method.
    
};


guessLetterbutton.addEventListener("click", function (e){
    e.preventDefault();
   //Because you’re working with a form, you want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page
    message.innerText = "";
    const letter = letterInput.value;
    const goodGuess = validateInput(letter);

    if (goodGuess) {
        makeGuess(letter);
    }
    letterInput.value ="";
    //empty the value of the input
});

const validateInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    
    if (input.lenght === 0) {
        //check if the input is empty
        message.innerText = "Please enter a letter.";
    } else if (input.lenght > 1) {
        //check if the player enter more than one letter
        message.innerText = "Please enter one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        //check if they’ve entered a character that doesn’t match the regular expression pattern
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        //If all the other conditions aren’t met, the input is a letter, which is what you’re looking for!
        return input;
    }
};

const makeGuess = function(letter){
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = "You already put that letter. Try again.";
    } else {
        guessedLetters.push (letter);
        console.log (guessedLetters);
        guessesRemaining(letter);
        showGuessedLetters();
        //the letter displays when it hasn’t been guessed before.

        updateWordInProgress(guessedLetters);
        
    }
};

const showGuessedLetters = function (){
    guessLetters.innerHTML ="";
    //Empty the innerHTML of the unordered list where the player’s guessed letters will display.
    for (const letter of guessedLetters) {
        const li = document.createElement ("li");
        li.innerText = letter;
        guessLetters.append (li);
    }
};

const updateWordInProgress = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    //change the word variable to uppercase

    const wordArray = wordUpper.split("");
    //split the word string into an array so that the letter can appear in the guessedLetters array

    const showWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    wordInProgress.innerText = showWord.join("");
    //to update the empty paragraph where the word in progress will appear
    
    checkIfWin();
};

const guessesRemaining = function (guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){
        message.innerText =`Sorry! ${guess} is not in the word!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The ${guess} is in included!`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Sorry, game is over! The correct answer is <span class="highlight"> ${word} </span>.`;
    } else if (remainingGuesses === 1){
        remainingMessageSpan.innerText = `You have ${remainingGuesses} guess`;
    } else{
        remainingMessageSpan.innerText = `${remainingGuesses} guesses`;
    }

};

const checkIfWin = function (){
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add ("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

