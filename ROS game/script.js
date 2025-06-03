
function getComputerChoice() {
  let comuterRandom = ["Rock","Paper","Scissors"];
  return comuterRandom[Math.floor(Math.random() * 3)];

}


function getResult(playerChoice, computerChoice) {

  let score;


  if(playerChoice === computerChoice ){
    score = 0;
  }

  else if(playerChoice == "Rock" && computerChoice == "Scissors" ){
    score = 1;

  }else if(playerChoice == "Paper" && computerChoice == "Rock" ){
    score = 1;

  }else if(playerChoice == "Scissors" && computerChoice == "Paper"){
    score = 1;

  }else{
    score = -1;
  }

  return score;
}



function showResult(score, playerChoice, computerChoice) {

  let result = document.getElementById("result");

  switch(score){
    case -1: result.innerText = "Prohrál si!"; break
    case 0:result.innerText = "Remíza!"; break
    case 1:result.innerText = "Vyhrál si!"; break
  }


  let hands = document.getElementById("hands");
  hands.innerText = `👱 ${playerChoice} vs 🤖 ${computerChoice}`;
  
  let playerScore = document.getElementById("player-score");
  playerScore.innerText = `${Number(playerScore.innerText) + score}`


}


function onClickRPS(playerChoice) {
  const computer = getComputerChoice();
  const result = getResult(playerChoice.value,computer);
  showResult(result,playerChoice.value,computer);
}

function playGame() {

  let buttons = document.querySelectorAll(".rpsButton");

  buttons.forEach((button) =>{
    button.addEventListener("click",(e) =>{
        onClickRPS(button);
    })
  })
 
  document.getElementById("endGameButton").addEventListener("click",() =>{
    endGame()
  })
}


function endGame() {
  let hands = document.getElementById("hands");
  let playerScore = document.getElementById("player-score");
  let result = document.getElementById("result");

  hands.innerText = "";
  playerScore.innerText ="" ;
  result.innerText = "";


}

playGame()