const playerScoreSpan = document.getElementById('player-score');
const opponentScoreSpan = document.getElementById('opponent-score');
const choiceButtons = document.querySelectorAll('.choice-btn');
const choices= ['rock','paper','scissors'];
const winGameSound = new Audio('sound/YOU-WIN.mp3');
const loseGameSound = new Audio('sound/YOU-LOSE.mp3');
const coinsCountSpan = document.getElementById('coins-count');
const currentBetSpan = document.getElementById('current-bet');
const betPlusBtn = document.getElementById('bet-plus');
const betMinusBtn = document.getElementById('bet-minus');
const toggleBetBtn = document.getElementById('toggle-bet-btn');
const opponentImg = document.getElementById('opponent-img');

let playerScore =0;
let opponentScore=0;
let coins = 100;
let currentBet = 20;
let isBettingActive = false;

toggleBetBtn.addEventListener('click', () => {
    isBettingActive = !isBettingActive; 

    if (isBettingActive) {
        toggleBetBtn.textContent = 'Bet: ON 🎲';
        toggleBetBtn.classList.add('bet-active');
    } else {
        toggleBetBtn.textContent = 'Bet: OFF 🛑';
        toggleBetBtn.classList.remove('bet-active');
    }
});

function addPlayerPoint(){
    if(playerScore<10 && opponentScore<10){
        playerScore++;
        playerScoreSpan.textContent =playerScore;
    }
    if(playerScore===10){
        if(isBettingActive){
       coins += currentBet; 
       coinsCountSpan.textContent = coins;
        }
       winGameSound.play();
       alert("CONGRATS BRO , YOU WIN!");
       resetGame();
    }
}

function addOpponentPoint(){
    if(playerScore<10&&opponentScore <10){
        opponentScore++;
        opponentScoreSpan.textContent = opponentScore;
        if (opponentScore === 10 || coins === 0) {
             loseGameSound.play();
            if (isBettingActive ) {
                coins -= currentBet; 
                  coinsCountSpan.textContent = coins;
            }
                if(coins===0){
                alert("Game Over,you loose all your money 💸");
                exitGame();
            } else {
                alert("SORRY,YOU LOOSE😞");
            }
            resetGame();
        }
    }
}

const resetBtn = document.getElementById('reset-btn');
const exitBtn = document.getElementById('exit-btn');

function resetGame(){
    playerScore=0;
    opponentScore=0;
    playerScoreSpan.textContent=0;
    opponentScoreSpan.textContent=0;
}

resetBtn.addEventListener('click',resetGame);

function exitGame(){
    window.close();
}

exitBtn.addEventListener('click', exitGame);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        exitGame();
    }
});

function getPcChoice(){
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerChoice){
    const PcChoice = getPcChoice();

    const imageMap={rock:'images/rock.jpg',paper:'images/paper.jpg'
        ,scissors: 'images/scissors.png'
    };
    const opponentImg = document.getElementById('opponent-img');
    if (opponentImg) {
        opponentImg.src = imageMap[PcChoice];
    }
    console.log("YOUR Choice:" + playerChoice);
    console.log("YOUR Opponent Choice:" + PcChoice);

    if(playerChoice === PcChoice){
        console.log("DRAW!");
        return;
    }

    if (
    (playerChoice === 'rock' && PcChoice === 'scissors') ||
        (playerChoice === 'paper' && PcChoice === 'rock') ||
        (playerChoice === 'scissors' && PcChoice === 'paper')
    ){
        console.log("YOU WIN THE ROUND!");
        addPlayerPoint();
    }
    else{
        console.log("YOU LOSE THE ROUND!");
        addOpponentPoint();
    }
}

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (playerScore < 10 && opponentScore < 10) {
            playRound(button.id);
        }
    });
});

betPlusBtn.addEventListener('click', () => {
    if (currentBet + 20 <= coins) {
        currentBet += 20;
        currentBetSpan.textContent = currentBet;
    }
});

betMinusBtn.addEventListener('click', () => {
    if (currentBet - 20 >= 20) { 
        currentBet -= 20;
        currentBetSpan.textContent = currentBet;
    }
});

function disableGame() {
    choiceButtons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.cursor = 'not-allowed';
    });
   betPlusBtn.disabled = true;
    betMinusBtn.disabled = true;
}



