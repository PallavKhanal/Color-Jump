class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.targetY = y;
    this.speed = 5;
    this.color = "blue";
    this.onUpper = false;

    // animation control
    this.currentFrame = 0;
    this.lastSwitchTime = 0;
    this.frameDelay = 300; // 0.3 seconds
  }

  update() {
    // Smooth transition between platforms
    this.y = lerp(this.y, this.targetY, 0.2);

    // handle sprite animation
    if (millis() - this.lastSwitchTime > this.frameDelay) {
      this.currentFrame = 1 - this.currentFrame; // toggles 0 ↔ 1
      this.lastSwitchTime = millis();
    }
  }

  show() {
    // Choose correct image based on color and animation frame
    let img;
    if (this.color === "blue") {
      img = this.currentFrame === 0 ? blueUp : blueDown;
    } else {
      img = this.currentFrame === 0 ? redUp : redDown;
    }

    push();
    imageMode(CENTER);
    translate(this.x + this.size / 2, this.y + this.size / 2);

    // Flip vertically if on upper platform
    if (this.onUpper) scale(1, -1);

    image(img, 0, 0, this.size, this.size);
    pop();
  }

  switchPlatforms(platforms) {
    if (this.targetY === platforms[1].y - this.size) {
      // Going up
      this.targetY = platforms[0].y + platforms[0].h;
      this.onUpper = true;
    } else if (this.targetY === platforms[0].y + platforms[0].h) {
      // Going down
      this.targetY = platforms[1].y - this.size;
      this.onUpper = false;
    }
  }

  switchColor() {
    this.color = this.color === "red" ? "blue" : "red";
  }
}
