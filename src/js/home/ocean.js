import React, { Component } from "react";
import Bubble from "./bubble.js";

export default class Ocean extends Component{
    constructor(props){
        super(props);
        this.state={
            z: {
                cur: 1,
                min: 1,
                max: 501
            },
            stage: {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            },
            bubbles: [1,2,3,4]
        }
        // 창 크기 변화 인식 후 그에 맞춰 화면 재구성
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        // 휠 인식 후 z값 변경
        document.addEventListener('wheel', e=>{
            let wheel = e.wheelDeltaY;
            // scroll up 이면 z값 5 증가, down 이면 5 감소
            // 애니메이션의 가속효과가 극대화 되도록 1이 아닌 5씩 증감하도록 했음
            if( wheel > 0 ){
                if(this.state.z.min - 1 < this.state.z.cur && this.state.z.cur < this.state.z.max){
                    this.setState(prevState=>({z: {...prevState.z, cur: this.state.z.cur + 2}}));
                    console.log("up")
                }
            }else{
                if(this.state.z.min < this.state.z.cur && this.state.z.cur < this.state.z.max + 1){
                    console.log("down")
                    this.setState(prevState=>({z: {...prevState.z, cur: this.state.z.cur - 2}}));
                }
            }
        }, false);
    }

    resize(){
        // 창 크기 변화에 따라 너비 높이 전달
        this.setState(prevState=>({stage: {...prevState.stage, width: document.body.clientWidth}}));
        this.setState(prevState=>({stage: {...prevState.stage, height: document.body.clientHeight}}));
    }
    count = [
        {

        }
    ];
    render(){
        console.log(this.state.z)
        return(
            <div id="Ocean">
                {this.count.map((c,i) => {
                    if(true){
                        return(
                            <Bubble 
                                z={this.state.z}
                                stage={this.state.stage}
                                index={i}
                            />
                        )
                    }else{
                        return undefined
                    }
                })}
            </div>
        )
    }
}