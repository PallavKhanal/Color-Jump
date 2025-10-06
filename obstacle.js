class Obstacle {
  constructor(platformY, height_, x = width) {
    this.x = x;
    this.y = platformY;
    this.width = 30 + random(20);
    this.speed = 6;
    
    // Include black obstacles occasionally
    const colors = ['red', 'blue', 'black'];
    this.color = random(colors);
    
    this.height = height_;
    this.passed = false;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
  noStroke();
  if (this.color == "red") fill(255, 50, 50);        // Neon red
  else if (this.color == "blue") fill(50, 200, 255); // Neon blue
  else fill(255, 255, 255);                          // White for black obstacles (neon style)
  
  // Neon glow effect 
  drawingContext.shadowBlur = 25;
  drawingContext.shadowColor = this.color === "black" ? 'white' : this.color;

  if (this.height < 0) {
    rect(this.x, this.y + this.height, this.width, -this.height, 5);
  } else {
    rect(this.x, this.y, this.width, this.height, 5);
  }

  drawingContext.shadowBlur = 0; // reset glow
}

  hits(player) {
    // black obstacles always collide
    if (
      player.x < this.x + this.width &&
      player.x + player.size > this.x &&
      player.y < this.y + this.height &&
      player.y + player.size > this.y
    ) {
      if (this.color === "black") {
        return true; // always hits
      } else if (player.color !== this.color) {
        return true; // normal rule
      }
    }
    return false;
  }

  offScreen() {
    return this.x + this.width < 0;
  }
}
