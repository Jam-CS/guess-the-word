const guessLetter = document.querySelector (".guessed-letters"); //The unordered list where the player’s guessed letters will appear
const button = document.querySelector (".guess"); //The button with the text “Guess!” in it
const letterInput = document.querySelector (".letter"); //The text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress"); //The empty paragraph where the word in progress will appear
const remainingGuess = document.querySelector (".remaining");//The paragraph where the remaining guesses will display
const remainingMessage = document.querySelector(".remaining span"); //The span inside the paragraph where the remaining guesses will display
const message = document.querySelector (".message");//The empty paragraph where messages will appear when the player guesses a letter
const playAgainButton = document.querySelector(".play-again"); //The hidden button that will appear prompting the player to play again

const word = "magnolia";

const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word) {
        console.log (letter);
        placeholderLetters.push ("●");
    }
  wordInProgress.innerText =placeholderLetters.join("");
    
};
placeholder(word);

button.addEventListener("click", function (e){
    e.preventDefault();
    const input = letterInput.value;
    console.log(input);
    letterInput.value ="";

});