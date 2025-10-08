class Coin {
  constructor() {
    this.size = 30;
    this.x = random(width + 50, width + 300); // spawn off-screen to the right
    // Spawn y only on or between platforms
    let minY = min(platforms[0].y + platforms[0].h, platforms[1].y - this.size);
    let maxY = max(platforms[0].y + platforms[0].h, platforms[1].y - this.size);
    this.y = random(minY, maxY);
    this.active = true;
    this.speed = 6; // match obstacle speed
  }
  update() {
    this.x -= this.speed;
  }

  show() {
    if (this.active) {
      fill(255, 223, 0); // gold color
      ellipse(this.x, this.y, this.size);
      stroke(255);
      strokeWeight(2);
      noFill();
      ellipse(this.x, this.y, this.size + 6);
      noStroke();
    }
  }
  offScreen() {
    return this.x + this.size < 0;
  }

  hits(player) {
    return (
      this.active &&
      player.x < this.x + this.size / 2 &&
      player.x + player.size > this.x - this.size / 2 &&
      player.y < this.y + this.size / 2 &&
      player.y + player.size > this.y - this.size / 2
    );
  }

  collect() {
    this.active = false;
  }
}
