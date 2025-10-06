class Platform {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  show() {
  noStroke();
  fill(50); // dark grey
  rect(this.x, this.y, this.w, this.h);
  }
}