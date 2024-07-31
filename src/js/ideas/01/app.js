import React, { Component } from "react";
import { Worm } from "./worm.js";

export default class App_01 extends Component{
    constructor(props){
        super(props);

        //  canvas, context 생성
        this.canvas = document.createElement("canvas");
        this.fieldDOM = document.getElementById("Field");
        this.fieldDOM.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        // // Dialog들이 들어있는 items 배열 구성
        // this.items = [];
        // this.total = 1;
        // for(let i = 0; i < this.total; i++){
        //     // this.items[i] = new Dialog();
        // }
        
        // 창 크기 변화 인식 후 그에 맞춰 화면 재구성
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        // worm 생성 (width, height, x, y)
        this.worm = new Worm(300,300,300,450)
    
        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        // 브라우저 창 크기에 따른 canvas의 너비 높이 설정
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
    
        // context 설정
        this.ctx.scale = (2,2);
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));

        this.worm.draw(this.ctx);
    }

    render(){
        return(
            <div>one 1</div>
        )
    }
}