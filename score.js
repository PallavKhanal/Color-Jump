class ScoreManager{
  constructor(){
    this.currentScore = 0;
    
    this.highScore = this.loadHighScore();
  }
  
  show(){
    fill(0);
    textSize(24);
    textAlign(LEFT, TOP);
    text("Score: " + this.currentScore, 20, 20);
    text("High Score: " + this.highScore, 20, 50);
  }
  
  loadHighScore(){
    let hs = localStorage.getItem("highScore");
    return hs ? int(hs) : 0;
  }
  
  saveHighScore(){
    localStorage.setItem("highScore", this.highScore);
  }
  
  reset(){
    this.currentScore = 0;
  }
  
  add(points = 1){
    this.currentScore += points;
    if (this.currentScore > this.highScore) {
      this.highScore = this.currentScore;
      this.saveHighScore();
    }
    
  }
}