class Obstacle{
  constructor(platformY,height_, x = width) {
    this.x = x;
    this.y = platformY;
    this.width = 30 + random(20);
    this.speed = 6;
    this.color = random(['red','blue']);
    this.height = height_;
  }
  
  update(){
    this.x -= this.speed;
  }
  
  show(){
    if(this.color == "red"){
      fill(255,0,0);
    }
    else{
      fill(0,200,255);
    }
    
    if(this.height < 0){
    rect(this.x, this.y + this.height, this.width, -this.height);
} else {
    rect(this.x, this.y, this.width, this.height);
}
  }
  
  hits(player){
    if(player.color != this.color){
        return (
            player.x < this.x + this.width &&
            player.x + player.size > this.x &&
            player.y < this.y + this.height &&
            player.y + player.size > this.y
        );
    }
    return false;
}
  
  offScreen(){
    return(this.x + this.width < 0);
  }
}