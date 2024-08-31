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

        this.isCorrect = false;
        this.setIsCorrect = this.setIsCorrect.bind(this);

        this.isWait = false;
        this.setIsWait = this.setIsWait.bind(this);

        this.quizNumber = -1;
        this.setQuizNumber = this.setQuizNumber.bind(this);

        // dialog를 this에 생성
        this.dialog = new Dialog();

        // 창 크기 변화 인식 후 그에 맞춰 화면 재구성
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
    
        window.requestAnimationFrame(this.animate.bind(this));

        // 방향키 인식
        document.addEventListener('keyup', this.arrowPress.bind(this), false);
    }

    // 키 입력 잠금 장치
    setKeyLock(bool){
        this.keyLock = bool;
    };

    // 정답인지 알리는 장치
    setIsCorrect(bool){
        this.isCorrect = bool;
    };

    // 애니메이션 대기 화면인지 알리는 장치
    setIsWait(bool){
        this.isWait = bool;
    };

    // 퀴즈번호를 변경하는 장치
    setQuizNumber(num){
        this.quizNumber = num;
    };

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
    };

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));

        if(!this.isWait){
            this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    
            // Dialog > animate
            this.dialog.animate(this.ctx, this.setKeyLock, this.setIsCorrect);
        };

        console.log(this.isCorrect, this.quizNumber, !this.isWait)
        console.log((this.isCorrect || this.quizNumber == -1) && !this.isWait)
        // 정답이거나 첫문제일경우 실행
        if((this.isCorrect || this.quizNumber == -1) && !this.isWait){
            // 애니메이션 대기 설정
            this.setIsWait(true);

            // 정답 신호 해제
            this.setIsCorrect(false);
            
            // 첫 문제의 경우 딜레이 없이 좌표값 세팅
            if(this.quizNumber == -1){
                // 퀴즈번호 증가
                this.setQuizNumber(this.quizNumber + 1);

                // 애니메이션 대기 해제
                this.setIsWait(false);

                // 다음 퀴즈에 해당하는 좌표에 따라 블록을 그려냄
                this.dialog.setCords(this.quizNumber);

                // 방향키 입력 잠금 해제
                this.setKeyLock(false);
            }
            // 이후 문제들에 관하여는 2초뒤에 문제가 세팅 되도록함
            else{
                // 2초 뒤에 실행
                setTimeout(() => {
                    console.log('settimeout')
                    // 퀴즈번호 증가
                    this.setQuizNumber(this.quizNumber + 1);
                    
                    // 다음 퀴즈에 해당하는 좌표에 따라 블록을 그려냄
                    this.dialog.setCords(this.quizNumber);

                    // 방향키 입력 잠금 해제
                    this.setKeyLock(false);
                }, 2000);

                // 애니메이션 대기 해제
                this.setIsWait(false);
            }
        };
    };

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
                        this.dialog.setPosAsCords(wormCordArr[wormCordArr.length - 1]);
                        this.setKeyLock(false);
                    }, 200);
                }
            }
        }
    };

    render(){
        return(
            <div></div>
        )
    };
}