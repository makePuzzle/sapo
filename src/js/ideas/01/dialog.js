import { Worm } from './worm.js';

const FPS = 1000 / 60;
const FOLLOW_SPEED = 0.8;

const woodCords = [
    [8,6,true],[9,6,true],[10,6,true],[11,6,true],[12,6,true],
    [8,7,true],[9,7,true],[10,7,true],[11,7,true],[12,7,true],
    [8,8,true],[9,8,true],[10,8,true],[11,8,true],[12,8,true],
    [8,9,true],[9,9,true],[10,9,true],[11,9,true],[12,9,true],
    [8,10,true],[9,10,true],[10,10,true],[11,10,true],[12,10,true],
    [8,11,true],[9,11,true],[10,11,true],[11,11,true],[12,11,true]
];

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
        this.target = new Worm();
        this.posAsCord = (cord, XorY) => {
            if(XorY === "x"){
                return this.stageWidth * cord / 30;
            }else if(XorY === "y"){
                return this.stageHeight * cord / 15;
            }
        };
    }

    resize(stageWidth, stageHeight){
        // stageWidth, stageHeight 기억
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        // worm 이동 가능 좌표값 (3,6) ~ (17,11)
        // worm 시작 위치 좌표값 (3,11)(4,11)(5,11),(6,11)
        this.startCord.x = 6;
        this.startCord.y = 11;
        // 첫 시작 좌표 설정
        if(this.prev0Cord.x === 0 && this.prev0Cord.y === 0){
            this.prev0Cord.x = this.startCord.x;
            this.prev0Cord.y = this.startCord.y;
            this.prev0Cord.x = this.startCord.x;
            this.prev0Cord.y = this.startCord.y;
            this.prev1Cord.x = this.startCord.x - 1;
            this.prev1Cord.y = this.startCord.y;
            this.prev2Cord.x = this.startCord.x - 2;
            this.prev2Cord.y = this.startCord.y;
            this.prev3Cord.x = this.startCord.x - 3;
            this.prev3Cord.y = this.startCord.y;
        };

        // 좌표에 따른 포지션 설정
        // pos0 머리, pos1 가슴, pos2 배, pos3 꼬리
        this.pos0.x = this.posAsCord(this.prev0Cord.x, "x");
        this.pos0.y = this.posAsCord(this.prev0Cord.y, "y");
        this.pos1.x = this.posAsCord(this.prev1Cord.x, "x");
        this.pos1.y = this.posAsCord(this.prev1Cord.y, "y");
        this.pos2.x = this.posAsCord(this.prev2Cord.x, "x");
        this.pos2.y = this.posAsCord(this.prev2Cord.y, "y");
        this.pos3.x = this.posAsCord(this.prev3Cord.x, "x");
        this.pos3.y = this.posAsCord(this.prev3Cord.y, "y");

        // worm 의 부품 블록의 너비, 높이
        this.WIDTH = stageWidth / 30 * 9/10;
        this.HEIGHT = this.WIDTH;
    }

    animate(ctx){
        ctx.beginPath();

        // draw worm dynamically
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

        // draw wood
        let headCord = [this.prev0Cord.x, this.prev0Cord.y];
        
        const isExistinArr = (arr1, arr2) => {
            if (arr1[0] !== arr2[0]) {
                return false;
            };
            if (arr1[1] !== arr2[1]) {
                return false;
            };
            return true;
        };

        woodCords.some((woodCord, i) => {
            if(isExistinArr(woodCord, headCord)){
                woodCords[i][2] = false;
            };
        });
        
        ctx.fillStyle = `#cdbddb`;
        for(let i = 0; i < woodCords.length; i++){
            if(woodCords[i][2]){
                ctx.fillRect(
                    this.posAsCord(woodCords[i][0], "x"),
                    this.posAsCord(woodCords[i][1], "y"),
                    this.WIDTH, this.HEIGHT
                );
            }
        };

        // draw quiz
        let quizCords = [
            [21,6],
            [20,7],[21,7],
            [21,8],
            [21,9],
            [21,10],
            [20,11],[21,11],[22,11]];
        ctx.fillStyle = `#cdbddb`;
        for(let i = 0; i < quizCords.length; i++){
            ctx.fillRect(
                this.posAsCord(quizCords[i][0], "x"),
                this.posAsCord(quizCords[i][1], "y"),
                this.WIDTH, this.HEIGHT
            );
        }
    }

    arrowKeyDown(key){
        // 조건 1. 입력키가 방향키일것
        // 조건 2. (3,5)~(17,11)을 벗어나지 말것
        // 조건 3. 이동하고자 하는 좌표가 prve1Cord의 좌표와 겹치지 말것
        if( 
            key === 'ArrowUp' &&
            this.prev0Cord.y >= 6 &&
            this.prev0Cord.y - 1 !== this.prev1Cord.y
        ){
            this.target = this.prev0Cord.clone().moveUp();

            this.prev3Cord = this.prev2Cord.clone();
            this.prev2Cord = this.prev1Cord.clone();
            this.prev1Cord = this.prev0Cord.clone();
            this.prev0Cord = this.target.clone();
            return this;
        }else if( 
            key === 'ArrowDown' &&
            this.prev0Cord.y <= 10 &&
            this.prev0Cord.y + 1 !== this.prev1Cord.y
        ){
            this.target = this.prev0Cord.clone().moveDown();

            this.prev3Cord = this.prev2Cord.clone();
            this.prev2Cord = this.prev1Cord.clone();
            this.prev1Cord = this.prev0Cord.clone();
            this.prev0Cord = this.target.clone();
            return this;
        } else if( 
            key === 'ArrowLeft' &&
            this.prev0Cord.x >= 4 &&
            this.prev0Cord.x - 1 !== this.prev1Cord.x
        ){
            this.target = this.prev0Cord.clone().moveLeft();

            this.prev3Cord = this.prev2Cord.clone();
            this.prev2Cord = this.prev1Cord.clone();
            this.prev1Cord = this.prev0Cord.clone();
            this.prev0Cord = this.target.clone();
            return this;
        } else if( 
            key === 'ArrowRight' &&
            this.prev0Cord.x <= 16 &&
            this.prev0Cord.x + 1 !== this.prev1Cord.x
        ){
            this.target = this.prev0Cord.clone().moveRight();

            this.prev3Cord = this.prev2Cord.clone();
            this.prev2Cord = this.prev1Cord.clone();
            this.prev1Cord = this.prev0Cord.clone();
            this.prev0Cord = this.target.clone();
            return this;
        }else{
            console.log('ELSE')
            return null;
        }
    }
}