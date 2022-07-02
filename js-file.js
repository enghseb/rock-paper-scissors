//Variables needed for the game
playerScore = 0
computerScore = 0
rounds = 0
winner = 0

function delay(time) {
    /* Makes it possible to delay time by xxxx ms */
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
    const elementToChange = document.getElementById(elementById);
    elementToChange.textContent = textContent;
}
    
function showResult(winner) {
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



//Game
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {

    //Listens for button click
    button.addEventListener('click', () => {
        
        //Buttons become unclickable
        document.documentElement.style
        .setProperty('--buttonUnclickable-pointer-events', 'none')

        /* Buttons animation gets started, swap color text
        to turn it invisible while it's also changed to
        reflect point or not */
        document.documentElement.style
        .setProperty('--buttonColor-color', 'red')
        document.documentElement.style
        .setProperty('--buttonStartAnimation-animation', 'animateButton 1s forwards, showResult 1.5s forwards')
        document.documentElement.style
        .setProperty('--buttonStartAnimationDelay-animation-delay', '0s, 1.5s, 4s')

        
        //Queries the player/comp hand images, then changes class so that the animation begins
        const playerKey = document.querySelector(`.playerAnimation`)
        const compKey = document.querySelector('.compAnimation')
        playerKey.classList.remove('playerAnimation')
        playerKey.classList.add(`playing`)
        compKey.classList.remove('compAnimation')
        compKey.classList.add(`compPlaying`)
        
        //Plays a round with the players selection, and the outcome of the function computer play
        playerSelection = button.id
        computerSelection = computerPlay()
        console.log(playerSelection)
        console.log(computerSelection)
        result = playRound(computerSelection, playerSelection)
        
        //Checks what the resultbox should say and then changes the text
        showResult(winner)
        changeTextContent("rock", textContentRock)
        changeTextContent("paper", textContentPaper)
        changeTextContent("scissors", textContentScissors)

        //Makes the ending of the animation show the correct image according to button pressed/computer hand
        document.documentElement.style
        .setProperty('--end-background-image', `url(images/${button.id}.png)`);
        document.documentElement.style
        .setProperty('--compEnd-background-image', `url(images/${computerSelection}_flipped.png)`);

        //Runs the result through the score function, also gets it as var so we can run it through the showResult function
        /* winner = score(result) */
        console.log("test")

        //Makes sure we can play more than one round
        const animated = document.querySelector('.playing');
        animated.addEventListener('animationend', () => {
            console.log(animated)
            //Delay has to be used, otherwise the animation gets cut off and we can't see the result
            delay(1500).then(() => {
            
            //Updates the score number in DOM
            const playerScoreElement = document.getElementById('score-player');
            playerScoreElement.textContent = `${playerScore}`;
            const computerScoreElement = document.getElementById('score-computer');
            computerScoreElement.textContent = `${computerScore}`;

            //Resets the start position of divs making, putting the hands back to start position
            playerKey.classList.remove('playing')
            playerKey.classList.add(`playerAnimation`);
            compKey.classList.remove('compPlaying')
            compKey.classList.add(`compAnimation`)
            document.documentElement.style

            //Turns the result text back into buttons, that are clickable again.
            .setProperty('--buttonStartAnimation-animation', 'animateButtonBack 1.5s forwards')
            changeTextContent("rock", "Rock")
            changeTextContent("paper", "Paper")
            changeTextContent("scissors", "Scissors")
            document.documentElement.style
            .setProperty('--buttonUnclickable-pointer-events', 'auto')
            changeTextContent("resultText", `You played ${playerSelection} and the CPU played ${computerSelection}. ${textContentRock} ${textContentPaper} ${textContentScissors}`)
        });

        });
    
});
});