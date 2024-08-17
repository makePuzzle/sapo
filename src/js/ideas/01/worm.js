export class Worm {
    constructor(x, y){
        this.x = x || 0;
        this.y = y || 0;
    }

    moveRight(n){
        this.x += n;
        return this;
    }

    moveLeft(n){
        this.x -= n;
        return this;
    }

    moveDown(n){
        this.y += n;
        return this;
    }

    moveUp(n){
        this.y -= n;
        return this;
    }

    clone(){
        return new Worm(this.x, this.y);
    }
}