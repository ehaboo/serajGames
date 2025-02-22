const divBox = document.getElementById("divBox");
const starBox = document.getElementById("starBox");
const inputBox = document.getElementById("inputBox");
const oneMoreButton = document.getElementById("oneMoreButton");
const popup = document.getElementById("popup");
const letters = "abcdefghijklmnopqrstuvwxyz";


let counterWinner = 0;
let counter = 0;
let selectedSquare = null;
let letter = "";

function createLetterSquares() {
    inputBox.innerHTML = "";
    letters.split("").forEach((char, index) => {
        const square = document.createElement("div");
        square.className = "letter-square";
        square.textContent = char;
        square.onclick = function () {
            changeLetter(char, square);
        };
        inputBox.appendChild(square);
    });
}

function changeLetter(newLetter, square) {
    starBox.innerHTML = "";
    if (selectedSquare) {
        selectedSquare.style.backgroundColor = "";
    }
    selectedSquare = square;
    square.style.backgroundColor = "yellow";
    letter = newLetter;
    oneMoreButton.disabled = false; 
    showRandomSpans();
}

function getRandomLetter() {
    return letters[Math.floor(Math.random() * letters.length)];
}

function showRandomSpans() {
    if (!letter) {
        oneMoreButton.disabled = true; 
        return;
    }
    divBox.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const span = document.createElement("span");
        span.id = `L${i}`;
        span.textContent = getRandomLetter();
        span.onclick = function () {
            if (span.textContent === letter) {
                counterWinner++;
                if (counterWinner === 5) {
                    divBox.style.fontSize = "300px";
                    divBox.innerHTML = "🏆";
                    counterWinner = 0;
                    counter = 0;
                }
                span.innerText = "👏";
                const audio = new Audio("./assets/audio/clap.mp3");
                audio.play();
                setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }, 4000);
                starBox.innerHTML += "⭐";

                console.log(counterWinner);

            } else {
                counter++;
                if (counter === 5) {
                    divBox.innerHTML = "😭";
                    counter = 0;
                    counterWinner = 0;
                    const audio = new Audio("./assets/audio/boo.mp3");
                    audio.play();
                    setTimeout(() => {
                        audio.pause();
                        audio.currentTime = 0;
                    }, 4000);
                    divBox.style.fontSize = "300px";
                }
                span.innerText = "😢";
            }
        };
        divBox.appendChild(span);
    }
}

function resetGame() {
    starBox.innerHTML = "";
    counter = 0;
    counterWinner = 0;
    selectedSquare = null;
    letter = "";
    divBox.innerHTML = `<h1>Welcome Seraj</h1><img src="./assets/images/icon.png" width="70" height="70" alt="">`; 
    divBox.style.fontSize = ""; 
    oneMoreButton.disabled = true;

    createLetterSquares();
}

function showPopup() {
    popup.style.display = "flex";
}

function closePopup() {
    popup.style.display = "none";
}

setTimeout(showPopup, 1000); 
resetGame();