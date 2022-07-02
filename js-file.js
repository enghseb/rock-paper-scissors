//Variables needed for the game
playerScore = 0
computerScore = 0
rounds = 0

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
        console.log("Test")
        return 0
    }   else if (playerSelection == "rock" && computerPlay == "rock" || playerSelection == "scissors" && computerPlay == "scissors" || playerSelection == "paper" && computerPlay == "paper") {
        return 1
    }   else {
        return 2
    }
}

function score(result){
    /*Checks the score, prints correct data for score
    and updates variables so the score is correct */
    const resultOutput = document.querySelector('#result')

    if(result == 0) {
        playerScore++
        const   playerWonText = document.createElement('p');
        playerWonText.classList.add('playerWonText')
        playerWonText.textContent = "You won and scored a point.";
        resultOutput.appendChild(playerWonText);
    } else if (result == 1){
        const playerDrewText = document.createElement('p');
        playerDrewText.classList.add('playerDrewText')
        playerDrewText.textContent = "You drew.";
        resultOutput.appendChild(playerDrewText);
    } else {
        computerScore++
        const playerLostText = document.createElement('p');
        playerLostText.classList.add('playerLostText')
        playerLostText.textContent = "You lost.";
        resultOutput.appendChild(playerLostText);
    }

console.log(playerScore)
console.log(computerScore)
console.log(rounds)
/* console.log(playerSelection) */
}

function changeTextContent(elementById, textContent) {
    const elementToChange = document.getElementById(elementById);
    elementToChange.textContent = textContent;
}
    

//Game
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {

    //Listens for button click
    button.addEventListener('click', () => {
        
        //Buttons become unclickable
        document.documentElement.style
        .setProperty('--buttonUnclickable-pointer-events', 'none')

        //Buttons animation start
        document.documentElement.style
        .setProperty('--buttonColor-color', 'red')
        document.documentElement.style
        .setProperty('--buttonStartAnimation-animation', 'animateButton 1s forwards, showResult 1.5s forwards')
        document.documentElement.style
        .setProperty('--buttonStartAnimationDelay-animation-delay', '0s, 1s')
        changeTextContent("rock", "YOU")
        changeTextContent("paper", "GOT     A")
        changeTextContent("scissors", "POINT")
        
            


        //Queries the player/comp hand images, then changes class so that the animation begins
        const playerKey = document.querySelector(`.playerAnimation`)
        const compKey = document.querySelector('.compAnimation')
        playerKey.classList.remove('playerAnimation')
        playerKey.classList.add(`playing`)
        compKey.classList.remove('compAnimation')
        compKey.classList.add(`compPlaying`)

        //Makes the ending of the animation show the correct image according to button pressed/computer hand
        document.documentElement.style
        .setProperty('--end-background-image', `url(images/${button.id}.png)`);
        
        //Plays a round with the players selection, and the outcome of the function computer play
        playerSelection = button.id
        result = playRound(computerPlay(), playerSelection)
        //Runs the result through the score function
        score(result)

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
        });

        });
    
});
});