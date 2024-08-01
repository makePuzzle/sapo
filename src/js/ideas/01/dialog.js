import { Worm } from './worm.js';

const FPS = 1000 / 60;
const FOLLOW_SPEED = 0.8;

export class Dialog{
    constructor(){
        this.startCord = new Worm();
        this.pos0 = new Worm();
        this.pos1 = new Worm();
        this.pos2 = new Worm();
        this.pos3 = new Worm();
        this.prev0Cord = new Worm();
        this.prev1Cord = new Worm();
        this.prev2Cord = new Worm();
        this.prev3Cord = new Worm();
        this.headCord = new Worm();
        this.target = new Worm();
    }

    resize(stageWidth, stageHeight){
        // worm 이동 가능 좌표값 (3,6) ~ (17,11)
        // worm 시작 위치 좌표값 (3,11)(4,11)(5,11),(6,11)
        this.startCord.x = 6;
        this.startCord.y = 11;
        if(this.headCord.x === 0 && this.headCord.y === 0){
            this.headCord.x = this.startCord.x;
            this.headCord.y = this.startCord.y;
            this.prev0Cord.x = this.startCord.x;
            this.prev0Cord.y = this.startCord.y;
            this.prev1Cord.x = this.startCord.x - 1;
            this.prev1Cord.y = this.startCord.y;
            this.prev2Cord.x = this.startCord.x - 2;
            this.prev2Cord.y = this.startCord.y;
            this.prev3Cord.x = this.startCord.x - 3;
            this.prev3Cord.y = this.startCord.y;
        };

        // pos0 머리, pos1 가슴, pos2 배, pos3 꼬리
        this.pos0.x = stageWidth * this.prev0Cord.x/30;
        this.pos0.y = stageHeight * this.prev0Cord.y/15;
        this.pos1.x = stageWidth * this.prev1Cord.x/30;
        this.pos1.y = stageHeight * this.prev1Cord.y/15;
        this.pos2.x = stageWidth * this.prev2Cord.x/30;
        this.pos2.y = stageHeight * this.prev2Cord.y/15;
        this.pos3.x = stageWidth * this.prev3Cord.x/30;
        this.pos3.y = stageHeight * this.prev3Cord.y/15;

        // worm 의 부품 블록의 너비, 높이
        this.WIDTH = stageWidth / 30 * 9/10;
        this.HEIGHT = stageWidth / 30 * 9/10;
    }

    animate(ctx){

        ctx.beginPath();
        ctx.fillStyle = `#000000`;
        ctx.fillRect(
            this.pos0.x,
            this.pos0.y, 
            this.WIDTH, this.HEIGHT
        );
        ctx.fillStyle = `#333333`;
        ctx.fillRect(
            this.pos1.x,
            this.pos1.y, 
            this.WIDTH, this.HEIGHT
        );
        ctx.fillStyle = `#666666`;
        ctx.fillRect(
            this.pos2.x,
            this.pos2.y, 
            this.WIDTH, this.HEIGHT
        );
        ctx.fillStyle = `#999999`;
        ctx.fillRect(
            this.pos3.x,
            this.pos3.y, 
            this.WIDTH, this.HEIGHT
        );
    }

    arrowKeyDown(key){
        if( key === 'ArrowUp' ){
            this.headCord = this.prev0Cord.clone();
            this.target = this.headCord.clone().moveUp();

            this.prev3Cord = this.prev2Cord.clone();
            this.prev2Cord = this.prev1Cord.clone();
            this.prev1Cord = this.prev0Cord.clone();
            this.prev0Cord = this.target.clone();
            return this;
        }else if( key === 'ArrowDown' ){
            this.headCord = this.prev0Cord.clone();
            this.target = this.headCord.clone().moveDown();

            this.prev3Cord = this.prev2Cord.clone();
            this.prev2Cord = this.prev1Cord.clone();
            this.prev1Cord = this.prev0Cord.clone();
            this.prev0Cord = this.target.clone();
            return this;
        } else if( key === 'ArrowLeft' ){
            this.headCord = this.prev0Cord.clone();
            this.target = this.headCord.clone().moveLeft();

            this.prev3Cord = this.prev2Cord.clone();
            this.prev2Cord = this.prev1Cord.clone();
            this.prev1Cord = this.prev0Cord.clone();
            this.prev0Cord = this.target.clone();
            return this;
        } else if( key === 'ArrowRight' ){
            this.headCord = this.prev0Cord.clone();
            this.target = this.headCord.clone().moveRight();

            this.prev3Cord = this.prev2Cord.clone();
            this.prev2Cord = this.prev1Cord.clone();
            this.prev1Cord = this.prev0Cord.clone();
            this.prev0Cord = this.target.clone();
            return this;
        }else{
            return null;
        }
    }
}