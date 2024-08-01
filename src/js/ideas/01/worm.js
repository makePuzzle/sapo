export class Worm {
    constructor(x, y){
        this.x = x || 0;
        this.y = y || 0;
    }

    moveRight(){
        if(this.x <= 16){
            this.x += 1;
        }
        return this;
    }

    moveLeft(){
        this.x -= 1;
        return this;
    }

    moveDown(){
        this.y += 1;
        return this;
    }

    moveUp(){
        this.y -= 1;
        return this;
    }

    clone(){
        return new Worm(this.x, this.y);
    }
}