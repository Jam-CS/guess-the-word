const guessLetters = document.querySelector (".guessed-letters"); //The unordered list where the player’s guessed letters will appear
const guessLetterbutton = document.querySelector (".guess"); //The button with the text “Guess!” in it
const letterInput = document.querySelector (".letter"); //The text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress"); //The empty paragraph where the word in progress will appear
const remainingGuess = document.querySelector (".remaining");//The paragraph where the remaining guesses will display
const remainingMessage = document.querySelector(".remaining span"); //The span inside the paragraph where the remaining guesses will display
const message = document.querySelector (".message");//The empty paragraph where messages will appear when the player guesses a letter
const playAgainButton = document.querySelector(".play-again"); //The hidden button that will appear prompting the player to play again

const word = "magnolia";
const guessedLetters =[];

const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word) {
        console.log (letter);
        placeholderLetters.push ("●");
    }
  wordInProgress.innerText =placeholderLetters.join("");
    
};
placeholder(word);

guessLetterbutton.addEventListener("click", function (e){
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value ="";
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

const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already put that letter. Try again.";
    } else {
        guessedLetters.push (guess);
        console.log (guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function (){
    guessLetters.innerHTML ="";
    for (const letter of guessedLetters) {
        const li = document.createElement ("li");
        li.innerText = letter;
        guessLetters.append (li);
    }
};

const updateWordInProgress = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    wordInProgress.innerText = showWord.join("");
    checkIfWin();
};

const checkIfWin = function (){
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add ("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};