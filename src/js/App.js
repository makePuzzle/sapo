import { Depth } from "./depth.js";
import { Dialog } from "./dialog.js";

class Field {
  constructor(){
    //  canvas, context 생성
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // 해상도에 따른 픽셀비율 설정
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.curDepth = new Depth();
    // this.curItem = null;

    // Dialog들이 들어있는 items 배열 구성
    this.items = [];
    this.total = 1;
    for(let i = 0; i < this.total; i++){
      this.items[i] = new Dialog();
    }

    // 창 크기 변화 인식 후 그에 맞춰 화면 재구성
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
    
    window.requestAnimationFrame(this.animate.bind(this));

    // 휠 인식 후 up down 함수 실행
    document.addEventListener('wheel', e=>{
      let wheel = e.wheelDeltaY;
    
      if( wheel > 0 ){
        this.scrollUp.bind(this)
        console.log('up')
      }else{
        this.scrollDown.bind(this)
        console.log('down')
      }
    }, false);
  }

  resize(){
    // canvas의 너비 높이 설정 ( 해상도와 창 크기 고려 )
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    // context 설정
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 3;
    this.ctx. shadowBlur = 6;
    this.ctx.shadowColor = `rgba(0, 0, 0, 0.1)`;
    this.ctx.lineWidth = 2;

    for(let i = 0; i < this.items.length; i++){
      this.items[i].resize(this.stageWidth, this.stageHeight);
    }
  }

  animate(){
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for(let i = 0; i < this.items.length; i++){
      this.items[i].animate(this.ctx);
    }
  }

  scrollUp(e){
    this.curDepth.z = e.clientY;

    for(let i = 0; i < this.items.length; i++){
      this.items[i].move(this.mousePos.clone());
    }
  }

  scrollDown(e){
    this.curDepth.y = e.clientY;

    for(let i = 0; i < this.items.length; i++){
      this.items[i].move(this.mousePos.clone());
    }
  }
}

window.onload = () => {
  new Field();
}

export default Field;