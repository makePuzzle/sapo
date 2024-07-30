import React, { Component } from "react";
// import { Dialog } from "./dialog.js";

export default class App_01 extends Component{
    constructor(props){
        super(props);
        //  canvas, context 생성
        this.canvas = document.createElement("canvas");
        this.fieldDOM = document.getElementById("Field");
        this.fieldDOM.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        // Dialog들이 들어있는 items 배열 구성
        this.items = [];
        this.total = 1;
        for(let i = 0; i < this.total; i++){
            // this.items[i] = new Dialog();
        }
        
        // 창 크기 변화 인식 후 그에 맞춰 화면 재구성
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
    
        window.requestAnimationFrame(this.animate.bind(this));
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

    render(){
        return(
            <div>one 1</div>
        )
    }
}