import React, { Component } from "react";
import { Dialog } from "./dialog.js";

export default class App_01 extends Component{
    constructor(props){
        super(props);

        //  canvas, context 생성
        this.canvas = document.createElement("canvas");
        this.fieldDOM = document.getElementById("Field");
        this.fieldDOM.insertBefore(this.canvas, this.fieldDOM.firstChild);
        this.ctx = this.canvas.getContext("2d");
        
        this.pressKey = null;
        this.keyLock = false;
        this.setKeyLock = this.setKeyLock.bind(this);

        // dialog를 this에 생성
        this.dialog = new Dialog();

        // 창 크기 변화 인식 후 그에 맞춰 화면 재구성
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
    
        window.requestAnimationFrame(this.animate.bind(this));

        // 방향키 인식
        document.addEventListener('keyup', this.arrowPress.bind(this), false);
    }

    setKeyLock(bool){
        this.keyLock = bool;
    }

    resize(){
        // 브라우저 창 크기에 따른 canvas의 너비 높이 설정
        if(document.body.clientHeight * 2 >= document.body.clientWidth){
            this.stageWidth = document.body.clientWidth;
            this.stageHeight = document.body.clientWidth / 2;
        }else{
            this.stageWidth = document.body.clientHeight * 2;
            this.stageHeight = document.body.clientHeight;
        }
        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;
    
        // context 설정
        this.ctx.scale = (2,2);

        const startwormCord = this.dialog.setBase(this.stageWidth, this.stageHeight);
        this.dialog.setPosAsCords(startwormCord);
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        // Dialog > animate
        this.dialog.animate(this.ctx, this.setKeyLock);
    }

    arrowPress(e){
        if(!this.keyLock){
            this.setKeyLock(true);
            this.pressKey = e.key;

            // 눌린 버튼이 방향키라면 this.startCord, this.prevCord, this.target 반환
            // 눌린 버튼이 방향키가 아니면 null 반환
            const wormCordArr = this.dialog.arrowKeyDown(this.pressKey);

            if(wormCordArr){
                if(wormCordArr.length === 1){
                    this.dialog.setPosAsCords(wormCordArr[0]);
                    this.keyLock = false;
                }else if(wormCordArr.length > 1){
                    this.dialog.setPosAsCords(wormCordArr[0]);
                    setTimeout(() => {
                        this.dialog.setPosAsCords(wormCordArr[wormCordArr.length-1]);
                        this.setKeyLock(false);
                    }, 200);
                }
            }
        }
    }

    render(){
        return(
            <div></div>
        )
    }
}