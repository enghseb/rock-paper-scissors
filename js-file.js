//Variables needed for the game
playerScore = 0
computerScore = 0
rounds = 0
winner = 0

function delay(time) {
    /* Makes it possible to delay time by xx ms */
    return new Promise(resolve => setTimeout(resolve, time));
  }

function computerPlay(){
    /* Randomizes the computers hand to either rock, scissors or paper */
    randomNumber =  Math.random() * 3;
    //Used to get a number without decimals
    randomNumberFloored = Math.floor(randomNumber)
    computerSelection = ""
    if (randomNumberFloored == 0) {
        computerSelection = "rock";
    }   else if (randomNumberFloored == 1) {
        computerSelection = "scissors";
    }   else {
        computerSelection = "paper";
    }

   return computerSelection;
}

function playRound(computerPlay, playerSelection){
    /* Plays out the winner of the round and returns the score*/
    rounds++
    if (playerSelection == "rock" && computerPlay == "scissors" || playerSelection == "scissors" && computerPlay == "paper" || playerSelection == "paper" && computerPlay == "rock") {
        playerScore++
        winner = 0
        console.log(winner)
    }   else if (playerSelection == "rock" && computerPlay == "rock" || playerSelection == "scissors" && computerPlay == "scissors" || playerSelection == "paper" && computerPlay == "paper") {
        winner = 1
        console.log(winner)
    }   else {
        computerScore++
        winner = 2
        console.log(winner)
    }
}

function changeTextContent(elementById, textContent) {
    /* Changes textContent in DOM by ID */
    const elementToChange = document.getElementById(elementById);
    elementToChange.textContent = textContent;
}

function setCssProperty(variable, property) {
    /*Changes a .css variable */
    document.documentElement.style
    .setProperty(variable, property)
}
    
function setResultBoxVariable(winner) {
    /* Sets variables for what the resultbox should say */
    if(winner == 0) {
        textContentRock = "YOU"
        textContentPaper = "GOT A"
        textContentScissors = "POINT"
    } else if(winner == 1) {
        textContentRock = "IT"
        textContentPaper = "WAS A"
        textContentScissors = "DRAW"
    } else {
        textContentRock = "CPU"
        textContentPaper = "GOT A"
        textContentScissors = "POINT"
    }
}

function setResultBoxText(setting) {
    /* Updates the result box. 
    Setting 0 = default (show the default playing buttons)
    Setting 1 = set to variable (show result) */
    if(setting == 1){
        changeTextContent("rock", textContentRock)
        changeTextContent("paper", textContentPaper)
        changeTextContent("scissors", textContentScissors)
    } else {
        changeTextContent("rock", "Rock")
        changeTextContent("paper", "Paper")
        changeTextContent("scissors", "Scissors")
    }
}

//Game
    //Listens for button click
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
    button.addEventListener('click', () => {
        
        //Buttons become unclickable
        setCssProperty('--buttonUnclickable-pointer-events', 'none')

        /* Buttons animation gets started, swap color text
        to turn it invisible while it's also changed to
        reflect point or not */
        setCssProperty('--buttonColor-color', 'red')
        setCssProperty('--buttonStartAnimation-animation', 'animateButton 1s forwards, showResult 1.5s forwards')
        setCssProperty('--buttonStartAnimationDelay-animation-delay', '0s, 1.5s, 4s')

        //Queries the player/comp hand images, then changes class so that the animation begins
        const playerKey = document.querySelector(`.playerAnimation`)
        const compKey = document.querySelector('.compAnimation')
        playerKey.classList = "playing"
        compKey.classList = "compPlaying"
        
        //Plays a round with the players selection, and the outcome of the function computer play
        playerSelection = button.id
        computerSelection = computerPlay()
        result = playRound(computerSelection, playerSelection)
        
        //Sets the correct variables for changing the resultbox and then changes the DOM text
        setResultBoxVariable(winner)
        setResultBoxText(1)

        //Makes the ending of the animation show the correct image according to button pressed/computer hand
        setCssProperty('--end-background-image', `url(images/${button.id}.png)`)
        setCssProperty('--compEnd-background-image', `url(images/${computerSelection}_flipped.png)`)

        //Makes sure we can play more than one round
        const animated = document.querySelector('.playing');
        animated.addEventListener('animationend', () => {
            //Delay has to be used, otherwise the animation gets cut off and we can't see the result
            delay(1500).then(() => {
            
            //Updates the score number in DOM
            changeTextContent("score-player", `${playerScore}`)
            changeTextContent("score-computer", `${computerScore}`)

            //Resets the start position of divs making, putting the hands back to start position
            playerKey.classList = "playerAnimation";
            compKey.classList = "compAnimation"

            //Turns the result text back into buttons, that are clickable again.
            setCssProperty('--buttonStartAnimation-animation', 'animateButtonBack 1.5s forwards')
            setResultBoxText(0)
            setCssProperty('--buttonUnclickable-pointer-events', 'auto')
            changeTextContent("resultText", `You played ${playerSelection} and the CPU played ${computerSelection}. ${textContentRock} ${textContentPaper} ${textContentScissors}`)
        });
        });
});
});