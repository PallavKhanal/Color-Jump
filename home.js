
let playButton, rulesButton;

function setupHome() {
  playButton = createButton("Play Game");
  rulesButton = createButton("How to Play");

  styleButton(playButton, width / 2 - 80, height / 2);
  styleButton(rulesButton, width / 2 - 80, height / 2 + 80);

  playButton.mousePressed(() => {
    hideHomeButtons();
    restartGame();
    gameState = "playing";
  });

  rulesButton.mousePressed(() => {
    hideHomeButtons();
    showRules();
    gameState = "rules";
  });
}

function drawHome() {
  background(0);
  textAlign(CENTER);
  textSize(70);
  fill(0, 255, 255);
  text(" Color Dash", width / 2, height / 2 - 120);
}

function hideHomeButtons() {
  playButton.hide();
  rulesButton.hide();
}

function showHomeButtons() {
  playButton.show();
  rulesButton.show();
}
