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
    let userInput = prompt("Rock, Paper or Scissors?");
    let userInputLowerCase = userInput.toLowerCase();

    return userInputLowerCase;
}


function playRound(computerPlay, userPlay){
    if (userPlay == "rock" && computerPlay == "scissors" || userPlay == "scissors" && computerPlay == "paper" || userPlay == "paper" && computerPlay == "rock") {
        result = 0
    }   else if (userPlay == "rock" && computerPlay == "rock" || userPlay == "scissors" && computerPlay == "scissors" || userPlay == "paper" && computerPlay == "paper") {
        result = 1
    }   else {
        result = 2
    }
    console.log(`You go for a ${userPlay} and the computer opts for ${computerPlay}`)
    return result;

}

function game(){
    let playerScore = 0
    let computerScore = 0

    for (let rounds = 0; rounds < 1; rounds++) {
        roundResult = playRound(computerPlay(), userPlay())
        if (roundResult == 0){
            playerScore++;
            console.log("You won and scored a point.")
        } else if (roundResult == 1){
            console.log("You drew.")
        } else {
            computerScore++
            console.log("The computer won and scored a point.")
        }

        console.log(`Your score is ${playerScore} and the computers is ${computerScore}`)
        }
    }

    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {

    button.addEventListener('click', () => {
        playerSelection = button.id
        console.log(playerSelection);
    });
});

game()