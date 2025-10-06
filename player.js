class Player{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 40;
    this.targetY = y;
    this.speed = 5;
    this.color = "blue";
    
  }
  
  update(){
    this.y = lerp(this.y, this.targetY, 0.2);
  }
  
  show() {
  noStroke();
  if (this.color == "blue") fill(50, 200, 255); // neon blue
  else fill(255, 50, 50);                       // neon red
  
  drawingContext.shadowBlur = 25;
  drawingContext.shadowColor = this.color;
  rect(this.x, this.y, this.size, this.size, 8);
  drawingContext.shadowBlur = 0;
  

    
    rect(this.x, this.y, this.size, this.size);
  }
  
  switchPlatforms(platforms){
    if(this.targetY === platforms[1].y - this.size){
       this.targetY = platforms[0].y + platforms[0].h;
    }
    else if(this.targetY === platforms[0].y + platforms[0].h){ 
      this.targetY = platforms[1].y - this.size;
    }
  }
  
  switchColor(){
    if(this.color == "red")
      {
        this.color = "blue";
      }
    else{
      this.color = "red";
    }
  }
}
