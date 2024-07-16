import { Depth } from "./depth.js";

const FOLLOW_SPEED = 0.08;
const WIDTH = 260;
const HEIGHT = 260;

export class Dialog {
    constructor(){
        this.pos = new Depth();
        this.target = new Depth();
        this.prevPos = new Depth();
        this.downPos = new Depth();
        this.speedPos = new Depth();
        this.startPos = new Depth();
        this.mousePos = new Depth();
        this.centerPos = new Depth();
        this.origin = new Depth();
    }

    resize(stageWidth, stageHeight){
        // 물체의 위치를 랜덤하게 지정
        // this.pos.x = Math.random() * (stageWidth - WIDTH);
        // this.pos.y = Math.random() * (stageHeight - HEIGHT);
        this.pos.x = 800;
        this.pos.y = 300;
        this.pos.z = 10;
        this.target = this.pos.clone();
        this.prevPos = this.pos.clone();
    }

    animate(ctx){
        // const move = this.target.clone().subtract(this.pos).reduce(FOLLOW_SPEED);
        const zoom = this.target.clone()
        this.pos.add(zoom);

        ctx.beginPath();
        ctx.fillStyle = `#f4e55a`;
        ctx.fillRect(this.pos.x, this.pos.y, WIDTH, HEIGHT);
    }

    move(point){
        console.log('move')
        this.target = this.startPos.clone().add(point).subtract(this.downPos);
    }

    up(scroll){

    }
}