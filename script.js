let mode = "";
let player1Choice = null;
let wins = 0, losses = 0, draws = 0;
let p1Wins = 0, p2Wins = 0;
let player1Name = "Player 1", player2Name = "Player 2";

const choices = ["Rock", "Paper", "Scissor"];

function showNameInput() {
  document.getElementById("start-page").classList.add("hidden");
  document.getElementById("name-page").classList.remove("hidden");
}

function startPvP() {
  player1Name = document.getElementById("player1-name").value || "Player 1";
  player2Name = document.getElementById("player2-name").value || "Player 2";
  mode = "pvp";

  document.getElementById("name-page").classList.add("hidden");
  document.getElementById("game-page").classList.remove("hidden");

  document.getElementById("mode-title").textContent = `Mode: ${player1Name} vs ${player2Name} 👥`;
  document.getElementById("player1-label").textContent = player1Name;
  document.getElementById("player2-label").textContent = player2Name;

  document.getElementById("score-pvc").classList.add("hidden");
  document.getElementById("score-pvp").classList.remove("hidden");
}

function chooseMode(selectedMode) {
  mode = selectedMode;
  document.getElementById("start-page").classList.add("hidden");
  document.getElementById("game-page").classList.remove("hidden");

  if (mode === "computer") {
    document.getElementById("mode-title").textContent = "Mode: Player vs Computer 🤖";
    document.getElementById("player1-label").textContent = "Player";
    document.getElementById("player2-label").textContent = "Computer";
    document.getElementById("score-pvc").classList.remove("hidden");
    document.getElementById("score-pvp").classList.add("hidden");
  }
}

function play(choice) {
  resetHands(); // clear old animations

  if (mode === "computer") {
    let compChoice = choices[Math.floor(Math.random() * 3)];
    document.getElementById("user1-img").src = `assets/${choice}.png`;
    document.getElementById("user2-img").src = `assets/${compChoice}.png`;

    let result = getResult(choice, compChoice);

    if (result === "win") {
      document.getElementById("winner").textContent = "🎉 You Won!";
      highlightWinner("user1-img");
      launchConfetti(); // confetti only triggers when player wins
      wins++;
    } else if (result === "lose") {
      document.getElementById("winner").textContent = "❌ You Lost!";
      highlightWinner("user2-img");
      // no confetti here
      losses++;
    } else {
      document.getElementById("winner").textContent = "🤝 It's a Draw!";
      shakeHands();
      draws++;
    }
    updateScore();
  } 
  else if (mode === "pvp") {
    if (!player1Choice) {
      player1Choice = choice;
      document.getElementById("user1-img").src = `assets/${choice}.png`;
      document.getElementById("winner").textContent = `${player2Name}, make your move!`;
    } else {
      document.getElementById("user2-img").src = `assets/${choice}.png`;
      let result = getResult(player1Choice, choice);

      if (result === "win") {
        document.getElementById("winner").textContent = `🎉 ${player1Name} Wins!`;
        highlightWinner("user1-img");
        launchConfetti(); // confetti only triggers for the winner
        p1Wins++;
      } else if (result === "lose") {
        document.getElementById("winner").textContent = `🎉 ${player2Name} Wins!`;
        highlightWinner("user2-img");
        launchConfetti(); // confetti only triggers for the winner
        p2Wins++;
      } else {
        document.getElementById("winner").textContent = "🤝 It's a Draw!";
        shakeHands();
        draws++;
      }
      player1Choice = null;
      updateScore();
    }
  }

  // reset after 2 seconds
  setTimeout(resetHands, 3000);
}

function launchConfetti() {
  const duration = 1.5 * 1000; // 1.5 seconds
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 10,
      angle: 60,
      spread: 60,
      origin: { x: 0 } // left side
    });
    confetti({
      particleCount: 10,
      angle: 120,
      spread: 60,
      origin: { x: 1 } // right side
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function getResult(choice1, choice2) {
  if (choice1 === choice2) return "draw";
  if (
    (choice1 === "Rock" && choice2 === "Scissor") ||
    (choice1 === "Scissor" && choice2 === "Paper") ||
    (choice1 === "Paper" && choice2 === "Rock")
  ) return "win";
  return "lose";
}

function highlightWinner(id) {
  document.getElementById(id).classList.add("scale-150", "translate-y-[-20px]", "transition", "duration-500");
}

function resetHands() {
  document.getElementById("user1-img").className = "w-32 h-32";
  document.getElementById("user2-img").className = "w-32 h-32 flip";
  document.getElementById("user1-img").src = "assets/Rock.png";
  document.getElementById("user2-img").src = "assets/Rock.png";
}

function shakeHands() {
  document.getElementById("user1-img").classList.add("shake");
  document.getElementById("user2-img").classList.add("shake");
}

function updateScore() {
  if (mode === "computer") {
    document.getElementById("wins").textContent = `Wins: ${wins}`;
    document.getElementById("losses").textContent = `Losses: ${losses}`;
    document.getElementById("draws").textContent = `Draws: ${draws}`;
  } else {
    document.getElementById("p1Wins").textContent = `${player1Name} Wins: ${p1Wins}`;
    document.getElementById("p2Wins").textContent = `${player2Name} Wins: ${p2Wins}`;
    document.getElementById("pvpDraws").textContent = `Draws: ${draws}`;
  }
}

function refreshScore() {
  wins = losses = draws = 0;
  p1Wins = p2Wins = 0;
  updateScore();
}

function resetGame() {
  player1Choice = null;
  document.getElementById("start-page").classList.remove("hidden");
  document.getElementById("game-page").classList.add("hidden");
  document.getElementById("name-page").classList.add("hidden");
  document.getElementById("winner").textContent = "Winner: -";
  resetHands();
}
