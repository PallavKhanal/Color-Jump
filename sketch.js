let gameState = "home";
let player;
let obstacles = [];
let platforms = [];
let restartButton;
let homeButton;
let gameOver = false;
let bgMusic;
let jumpSound;

function preload() {
  bgMusic = loadSound('bgMusic.mp3');
  jumpSound = loadSound('jump.mp3');
  blueUp = loadImage('blueUp.png');
  blueDown = loadImage('blueDown.png');
  redUp = loadImage('redUp.png');
  redDown = loadImage('redDown.png');
}

function setup() {
  createCanvas(1000, 700);

  setupHome();
  setupRules();
  
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = "cyan";
  
  score = new ScoreManager();
  
  
  platforms.push(new Platform(0, 150, width, 20));
  platforms.push(new Platform(0, 550, width, 20));
  
  player = new Player(75, platforms[1].y - 40)
  
   for (let i = 0; i < 5; i++) {
    let plat = random(platforms);
     let height_ = random(200,300)
    
     if (plat == platforms[0]) {      
    obstacleY = plat.y + plat.h   ;     
    } 
     else {                           
    obstacleY = plat.y - height_ ;      
     };
     
     
     let x_ = i*300;
     obstacles.push(new Obstacle(obstacleY, height_, x_ ));
  }
  
}

function draw() {
  background(0);

 
  
  if(gameState == "home"){
    drawHome();
  }
  else if (gameState == "rules") {
  drawRules();
  }
  else if(gameState == "playing"){
    //platforms
  for (let p of platforms){
    p.show();
  }
  
  // player
  player.update();
  player.show();
  
  //obstacles
 
  for (let i = obstacles.length-1; i >= 0; i--) {
  let o = obstacles[i];
  o.update();
  o.show();
    
    
    //score
    if (!o.passed && o.x + o.width < player.x) {
      score.add(1);
      o.passed = true; // mark obstacle as passed
    }

  // Show the score
  score.show();

  if (o.hits(player)) { 
    noLoop();
    text("GAME OVER", width/2 - 75, height/2 - 75);
    gameState = "gameOver";
    
    if (!restartButton) {
        restartButton = createButton('Restart');
        restartButton.position(width/2 + 75 , height/2 + 20); // below GAME OVER text
        restartButton.size(100, 40);
        restartButton.mousePressed(restartGame);
    }
    
    if (!homeButton) {
    homeButton = createButton('Home');
    homeButton.position(width/2 - 175, height/2 + 20); 
    homeButton.size(100, 40);
    homeButton.mousePressed(() => {
        gameState = "home";
        setupHome();
        drawHome();
        

        // cleanup both buttons
        if (restartButton) {
            restartButton.remove();
            restartButton = null;
        }
        if (homeButton) {
            homeButton.remove();
            homeButton = null;
        }

        loop(); // resume draw loop for home screen
    });
}
}

  if (o.offScreen()) {
    obstacles.splice(i,1);
    
    let plat = random(platforms);
     let height_ = random(200,300)
     let obstacleY;
    
     if (plat == platforms[0]) {      
    obstacleY = plat.y + plat.h   ;     
    } 
     else {                           
    obstacleY = plat.y - height_ ;      
     };
     obstacles.push(new Obstacle(obstacleY, height_));
  }
  }
    
  }



}    


  


function keyPressed(){
  if (gameState === "home" && keyCode === ENTER) {
    restartGame(); // start from home
  }

  if (gameState === "playing") {
    if (key === ' ') {
      player.switchPlatforms(platforms);
      
      if (jumpSound && !jumpSound.isPlaying()) {
        jumpSound.setVolume(0.2);
        jumpSound.play();
      }
    }
    if (key === 'C' || key === 'c') {
      player.switchColor();
    }
  }
  
  else if (gameState === "rules") {
  drawRules();
  }

  if (gameState === "gameOver") {
    if (key === 'R' || key === 'r') {
      restartGame(); // restart
    }
    if (key === 'H' || key === 'h') {
      gameState = "home"; // back to home
       if (restartButton) {
        restartButton.remove();
        restartButton = null;
    }
      
      if (homeButton) {
        homeButton.remove();
        homeButton = null;
    }
      loop();
     

    }
  }
}


function restartGame() {
    // Remove the button if it exists
    if (restartButton) {
        restartButton.remove();
        restartButton = null;
    }
    
    if (bgMusic && !bgMusic.isPlaying()) {
    bgMusic.setVolume(0.2);
    bgMusic.loop();
  }
  
   if (homeButton) {
        homeButton.remove();
        homeButton = null;
    }

    // Reset game state
  
    gameOver = false;
    obstacles = [];
    player = new Player(75, platforms[1].y - 40);

    // Reset score
    score.reset(); 

    // Recreate initial obstacles
    for (let i = 0; i < 5; i++) {
        let plat = random(platforms);
        let height_ = random(200,300);
        let obstacleY;
        if (plat == platforms[0]) {      
            obstacleY = plat.y + plat.h;
        } else {                           
            obstacleY = plat.y - height_;
        }
        let x_ = i * 300;
        obstacles.push(new Obstacle(obstacleY, height_, x_));
    }

    loop(); 
    gameState = "playing"; 
}

function styleButton(btn, x, y) {
  btn.position(x, y);
  btn.size(160, 50);
  btn.style('background-color', 'black');
  btn.style('color', '#0ff');
  btn.style('font-size', '18px');
  btn.style('border', '2px solid #0ff');
  btn.style('border-radius', '12px');
  btn.style('box-shadow', '0 0 10px #0ff');
  btn.mouseOver(() => btn.style('box-shadow', '0 0 20px #0ff'));
  btn.mouseOut(() => btn.style('box-shadow', '0 0 10px #0ff'));
}

