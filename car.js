const score = document.querySelector('.score');
const highScore = document.querySelector('.highScore');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const clickToStart = document.querySelector('.clickToStart');
const carTurn = new Audio('car-turn.wav');
const carBack = new Audio('back-music.mp3');
const gameOver = new Audio('game-over.wav');
clickToStart.addEventListener('click', Start);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
//default positioning and key values
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,

};
//Defaul speed and score
let player = {
    speed: 5,
    score: 0,
    highScore: 0

};

function keyDown(e) {
    keys[e.key] = true;

};
function keyUp(e) {
    keys[e.key] = false;
};

//Starting the game

function Start() {
    gameArea.innerHTML = "";
    startScreen.classList.add('hide');
    player.isStart = true;
    player.score = 0;
    window.requestAnimationFrame(Play);
//creating the road lines
    carBack.play();

    for (i = 0; i < 5; i++) {
        let roadLines = document.createElement('div');
        roadLines.setAttribute('class', 'roadLines');
        roadLines.y = (i * 140);
        roadLines.style.top = roadLines.y + "px";
        gameArea.appendChild(roadLines);
    }
//Creating opponents cars
    for (i = 0; i < 3; i++) {
        let Opponents = document.createElement('div');
        Opponents.setAttribute('class', 'Opponents');
        Opponents.y = ((i) * -300);
        Opponents.style.top = Opponents.y + "px";
        gameArea.appendChild(Opponents);
        Opponents.style.left = Math.floor(Math.random() * 350) + "px";
        Opponents.style.backgroundColor = randomColor();
    }


// Creating main car

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;



};

//to generate random colors for opponents cars


function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);

    }
    return "#" + c() + c() + c();
};

//play the game

function Play() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if (player.isStart) {
        moveLines();
        moveOpponents(car)
        
//movement of car
        if (keys.ArrowUp && player.y > (road.top + 70)) {
            player.y -= player.speed
            carTurn.play();

        };

        if (keys.ArrowDown && player.y < (road.height - 75)) {
            player.y += player.speed
            carTurn.play();


        };
        if (keys.ArrowRight && player.x < 350) {
            player.x += player.speed
            carTurn.play();


        };
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed
            carTurn.play();


        };
        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';


        player.score++;
//for Game speed
        player.speed += 0.001;
        

//for setting High Score in Local storage
        
       player.highScore = localStorage.getItem('newHighScore');
       
       if (player.score > player.highScore) {
           player.highScore++;
           localStorage.setItem('newHighScore',player.highScore)
           highScore.style.top = "80px";
        };
        window.requestAnimationFrame(Play);
        score.innerHTML = "Score" + ":" + (player.score);
        highScore.innerHTML = "HighScore" + ":" + (player.highScore - 1);
    };


};

//Road lines creation
function moveLines() {
    let roadLines = document.querySelectorAll('.roadLines');
    roadLines.forEach(function (item) {
        if (item.y >= 700)
            item.y -= 700;
        item.y += player.speed;
        item.style.top = item.y + 'px';
    });
};
// Opponent cars  movements
function moveOpponents(car) {
    let Opponents = document.querySelectorAll('.Opponents');
    Opponents.forEach(function (item) {
        if (isCollide(car, item)) {
            endGame()
        }
        if (item.y >= 750) {
            item.y -= 900;
            item.style.left = Math.floor(Math.random() * 350) + "px";

        }

        item.y += player.speed;
        item.style.top = item.y + 'px';

    });

};

// check if car collided with Opponent or not  

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
};

// If collided Game over function

function endGame() {
    player.isStart = false;
    player.speed = 5;
    startScreen.classList.remove('hide');
    carBack.pause();
    gameOver.play();



};
// background sound looping

carBack.loop = true;


