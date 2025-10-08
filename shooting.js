class Bullet{
    constructor(x,y, speed, width, height){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = width;
        this.height = height;
    }
    update(){
        this.x += this.speed;
    }
    show(){
        fill (255);
        rect(this.x, this.y, this.width, this.height);
    }
    offScreen(){
        return this.x > width;
    }       
    hits(obstacle){
        return (this.x < obstacle.x + obstacle.width &&
                this.x + this.width > obstacle.x &&
                this.y < obstacle.y + obstacle.height &&
                this.y + this.height > obstacle.y);
    }

}