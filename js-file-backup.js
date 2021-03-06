const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {

    //Listens for button click
    button.addEventListener('click', () => {
    playerSelection = button.id

    //Adds a class to playerAnimation that starts it
    const playerKey = document.querySelector(`.playerAnimation`)
    const compKey = document.querySelector('.compAnimation')

    //Changes the ending background image for player to button.id that was retrieved
    document.documentElement.style
    .setProperty('--end-background-image', `url(images/${button.id}.png)`);



    /* Had to remove instead of using "playerAnimation playing",
    that ended up forcing the animation back to "playing"
    state after animation was done */
    playerKey.classList.remove('playerAnimation')
    playerKey.classList.add(`playing`)
    compKey.classList.remove('compAnimation')
    compKey.classList.add(`compPlaying`)


    console.log(playerKey)
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

function playerSelection(){
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

    // Makes the background image become the correct hand for computer, after animation has ended
    document.documentElement.style
    .setProperty('--compEnd-background-image', `url(images/${computerSelection}_flipped.png)`);

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
        for (let rounds = 0; rounds < 1; rounds++) {
            roundResult = playRound(computerPlay(), playerSelection())

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
    
game()

/* Problemet ??r att spelet (funktionen game()) startar genom att man trycker p?? en av knapparna.
I och med att det inte finns n??got i game() som g??r att man n??gonsin igen beh??ver trycka p?? en knapp, k??rs alla rundor igenom
utan att spelare f??r g??ra val f??r runda 2-5

Vad beh??vs?

game() l??ngst ned

l??gg in condition f??r om if loopen ska b??rja rulla. ska inte starta om player select ??r tom. sedan n??r f??rsta rundan ??r ??ver s?? s??tter den player select till tom igen

*/