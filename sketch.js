let gameState = "home";
let player;
let coins = [];
let ammo = 0;
let obstacles = [];
let platforms = [];
let restartButton;
let homeButton;
let gameOver = false;
let bgMusic;
let jumpSound;
let bullets = [];

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
  coins = [];
  ammo = 0;
  
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

  // Show ammo count
  fill(255, 223, 0);
  textSize(32);
  textAlign(RIGHT, TOP);
  text('Ammo: ' + ammo, width - 30, 30);
  

 
  
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

  // coins
  for (let i = coins.length - 1; i >= 0; i--) {
    let c = coins[i];
    c.update();
    c.show();
    if (c.hits(player)) {
      c.collect();
      coins.splice(i, 1);
      ammo++;
    } else if (c.offScreen()) {
      coins.splice(i, 1);
    }
  }

  // Coin spawn logic
  if (frameCount % 180 === 0) { // about every 3 seconds at 60fps
    // Spawn coin at random position not overlapping obstacles
    let valid = false;
    let tries = 0;
    let newCoin;
    while (!valid && tries < 10) {
      newCoin = new Coin();
      valid = true;
      for (let o of obstacles) {
        if (
          newCoin.x > o.x - 40 && newCoin.x < o.x + o.width + 40 &&
          newCoin.y > o.y - 40 && newCoin.y < o.y + Math.abs(o.height) + 40
        ) {
          valid = false;
          break;
        }
      }
      tries++;
    }
    if (valid) coins.push(newCoin);
  }
  
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
  ammo = 0;
    noLoop();
    text("GAME OVER", width/2 - 75, height/2 - 75);
    gameState = "gameOver";
    
    if (!restartButton) {
  restartButton = createButton('Restart');
  styleButton(restartButton, width/2 + 75 , height/2 + 20);
  restartButton.mousePressed(restartGame);
    }
    
    if (!homeButton) {
  homeButton = createButton('Home');
  styleButton(homeButton, width/2 - 175, height/2 + 20);
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

  // bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    let b = bullets[i];
    b.update();
    b.show();

    // Check for collisions with obstacles
    for (let j = obstacles.length - 1; j >= 0; j--) {
      let o = obstacles[j];
      // Only allow bullet to hit white obstacles (color 'black')
      if (b.hits(o) && o.color === 'black') {
        // Remove both bullet and obstacle on hit
        bullets.splice(i, 1);
        obstacles.splice(j, 1);
        score.add(5); // Award extra points for hitting an obstacle
        
        
        // Spawn a new random obstacle at least 200px away from all others
        let tries = 0;
        let newObs, plat, height_, obstacleY, valid;
        do {
          plat = random(platforms);
          height_ = random(200, 300);
          if (plat == platforms[0]) {
            obstacleY = plat.y + plat.h;
          } else {
            obstacleY = plat.y - height_;
          }
          let newX = width + random(200, 400); // spawn off-screen to right
          newObs = new Obstacle(obstacleY, height_, newX);
          valid = true;
          for (let obs of obstacles) {
            if (Math.abs(newObs.x - obs.x) < 200) {
              valid = false;
              break;
            }
          }
          tries++;
        } while (!valid && tries < 10);
        obstacles.push(newObs);
        break; // Exit the inner loop since the bullet is gone
      }
    }

    // Remove bullet if it goes off screen
    if (b.offScreen()) {
      bullets.splice(i, 1);
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

    if (key === 'v' || key === 'V') {
      if (ammo > 0) {
        // Spawn bullet from the center-right of the player
        let b = new Bullet(
          player.x + player.size / 2, // right edge of player
          player.y,                    // vertically centered
          10,                           // speed
          20,                           // bullet width
          10                            // bullet height
        );
        bullets.push(b);
        ammo--;
      }
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

