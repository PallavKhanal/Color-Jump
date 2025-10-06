    let backButton;

function setupRules() {
  backButton = createButton("← Back");
  styleButton(backButton, width / 2 - 60, height - 120);
  backButton.mousePressed(() => {
    hideRules();
    showHomeButtons();
    gameState = "home";
  });
  backButton.hide();
}

function drawRules() {
  background(0);
  textAlign(CENTER);
  textSize(50);
  fill(0, 255, 255);
  text("HOW TO PLAY", width / 2, 100);

  textSize(22);
  fill(255);
  text(
    "1. Move with Spacebar to the other Platform \n" +
    "2. Match your color with obstacles or jump to other platform.\n" +
    "3. White obstacles always block you.\n" +
    "4. Survive as long as possible!",
    width / 2, height / 2
  );
}

function showRules() {
  backButton.show();
}

function hideRules() {
  backButton.hide();
}
