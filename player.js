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
  
  show(){
    if(this.color == "blue")
    {fill(0, 200, 255);}
    else{
      fill(255,0,0)
}
    
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