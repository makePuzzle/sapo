import React, { Component } from "react";
import Bubble from "./bubble.js";
import Field from "./field.js";

let count = [
    {
        color:"#ff9380"
    },{
        color:"#80ff8b"
    },{
        color:"#8880ff"
    }
];

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
            controller: [],
            exist: true,
            setExist: this.setExist.bind(this),
            field:{
                color: "#000000",
                opacity: 0,
                open: false,
                bubble: ''
            },
            setField: this.setField.bind(this)
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

    setExist = value => {
        this.setState({ exist: value });
    }

    resize(){
        // 창 크기 변화에 따라 너비 높이 전달
        this.setState(prevState=>({stage: {...prevState.stage, width: document.body.clientWidth}}));
        this.setState(prevState=>({stage: {...prevState.stage, height: document.body.clientHeight}}));
    }

    // 컴퍼넌트 첫 로드 시 buildController 실행
    componentDidMount(){
        this.buildController();
    }

    // 읽어온 버블의 갯수만큼 컨트롤러에 각 버블컨트롤 내역을 저장할 배열 생성
    buildController(){
        // let newController = [];
        // for(let c=0; c < count.length; c++){
        //     newController.push(new Array)
        // }
        this.setState({controller:count});
    };

    setField(color, opacity, open, bubble){
        this.setState({field:{color:color, opacity:opacity, open:open, bubble:bubble}})
    }

    render(){
        console.log(this.state.controller)
        console.log("부모의견 :"+this.state.exist)
        return(
            <div id="Ocean">
                {this.state.controller.map((d,i) => {
                    if(true){
                        return(
                            <Bubble 
                                index={i}
                                color={d.color}
                                z={this.state.z}
                                stage={this.state.stage}
                                exist={this.state.exist}
                                setExist={this.state.setExist}
                                setField={this.state.setField}
                            />
                        )
                    }else{
                        return undefined
                    }
                })}
                <Field
                    field={this.state.field}
                    setField={this.state.setField}
                />
            </div>
        )
    }
}