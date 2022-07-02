const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {

    //Listens for button click
    button.addEventListener('click', () => {
    playerSelection = button.id

    //Adds a class to playerAnimation that starts it
    const key = document.querySelector(`.playerAnimation`)

/*     //Changes the ending background image to button.id that was retrieved
    document.documentElement.style
    .setProperty('--end-background-image', `url(images/${button.id}.png)`); */

    /* Had to remove instead of using "playerAnimation playing",
    that ended up forcing the animation back to "playing"
    state after animation was done */
    key.classList.remove('playerAnimation')
    key.classList.add(`playing`)

    console.log(key)
    game()
});
});


const resultOutput = document.querySelector('#result')

function computerPlay(){
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

function userPlay(){
    let userInput = playerSelection;
    return userInput;
}


function playRound(computerPlay, userPlay){
    if (userPlay == "rock" && computerPlay == "scissors" || userPlay == "scissors" && computerPlay == "paper" || userPlay == "paper" && computerPlay == "rock") {
        result = 0
    }   else if (userPlay == "rock" && computerPlay == "rock" || userPlay == "scissors" && computerPlay == "scissors" || userPlay == "paper" && computerPlay == "paper") {
        result = 1
    }   else {
        result = 2
    }
    const BothChoicesText = document.createElement('p');
    BothChoicesText.classList.add('BothChoicesText')
    BothChoicesText.textContent = `You go for a ${userPlay} and the computer opts for ${computerPlay}`;
    resultOutput.appendChild(BothChoicesText);

    /* console.log(`You go for a ${userPlay} and the computer opts for ${computerPlay}`) */
    return result;

}

function game(){
    let playerScore = 0
    let computerScore = 0
    /* if(playerSelection != "") { */
        for (let rounds = 0; rounds < 5; rounds++) {
            roundResult = playRound(computerPlay(), userPlay())

            if (roundResult == 0){
                playerScore++;
    
                const playerWonText = document.createElement('p');
                playerWonText.classList.add('playerWonText')
                playerWonText.textContent = "You won and scored a point.";
                resultOutput.appendChild(playerWonText);
    
                /* console.log("You won and scored a point.") */
            } else if (roundResult == 1){
                const playerDrewText = document.createElement('p');
                playerDrewText.classList.add('playerDrewText')
                playerDrewText.textContent = "You drew.";
                resultOutput.appendChild(playerDrewText);
    
                /* console.log("You drew.") */
            } else {
                computerScore++
                const playerLostText = document.createElement('p');
                playerLostText.classList.add('playerLostText')
                playerLostText.textContent = "You lost.";
                resultOutput.appendChild(playerLostText);
    
                /* console.log("The computer won and scored a point.") */
            }
    
            const scoreText = document.createElement('p');
            scoreText.classList.add('scoreText')
            scoreText.textContent = `Your score is ${playerScore} and the computers is ${computerScore}.`;
            resultOutput.appendChild(scoreText);
    
            console.log(`Your score is ${playerScore} and the computers is ${computerScore}`)
            console.log(playerSelection)
            }
        }
    


/* Problemet är att spelet (funktionen game()) startar genom att man trycker på en av knapparna.
I och med att det inte finns något i game() som gör att man någonsin igen behöver trycka på en knapp, körs alla rundor igenom
utan att spelare får göra val för runda 2-5

Vad behövs?

game() längst ned

lägg in condition för om if loopen ska börja rulla. ska inte starta om player select är tom. sedan när första rundan är över så sätter den player select till tom igen

*/