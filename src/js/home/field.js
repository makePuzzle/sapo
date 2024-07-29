import React, { Component } from "react";
import { ArrowBackCircleOutline } from "react-ionicons";
import { Routes, Route } from "react-router-dom";
import App_01 from '../ideas/01/app.js';
import App_02 from '../ideas/02/app.js';
import App_03 from '../ideas/03/app.js';

export default class Field extends Component{
    constructor(props){
        super(props);
        this.state={
            field: this.props.field,
            setField: this.props.setField
        }
        // 창 크기 변화 인식 후 그에 맞춰 화면 재구성
        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

    }

    resize(){
        // 창 크기 변화에 따라 너비 높이 전달
        this.setState(prevState=>({stage: {...prevState.stage, width: document.body.clientWidth}}));
        this.setState(prevState=>({stage: {...prevState.stage, height: document.body.clientHeight}}));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.field !== prevProps.field) {
            this.setState({ field: this.props.field });
        }
    }

    fieldPop(){
        const thisBubble = this.state.field.bubbleDOM;
        this.state.setField(
            {
                index:0,
                color:"",
                title:""
            }, 
            0, 
            false, 
            thisBubble
        );
        thisBubble.setAttribute('style', `
            ${thisBubble.style[0]}: ${thisBubble.style[thisBubble.style[0]]};
            ${thisBubble.style[1]}: ${thisBubble.style[thisBubble.style[1]]};
            ${thisBubble.style[2]}: ${thisBubble.style[thisBubble.style[2]]};
            ${thisBubble.style[3]}: ${thisBubble.style[thisBubble.style[3]]};
            ${thisBubble.style[4]}: 0;
            ${thisBubble.style[5]}: ${thisBubble.style[thisBubble.style[5]]};
            ${thisBubble.style[6]}: ${thisBubble.style[thisBubble.style[6]]};
            transform: translate(-50%,-50%) scale(0.2);
            z-index: 2;
        `);
        setTimeout(()=>{
            thisBubble.setAttribute('style', `
                ${thisBubble.style[0]}: ${thisBubble.style[thisBubble.style[0]]};
                ${thisBubble.style[1]}: ${thisBubble.style[thisBubble.style[1]]};
                ${thisBubble.style[2]}: ${thisBubble.style[thisBubble.style[2]]};
                ${thisBubble.style[3]}: ${thisBubble.style[thisBubble.style[3]]};
                ${thisBubble.style[4]}: 0.7;
                ${thisBubble.style[5]}: ${thisBubble.style[thisBubble.style[5]]};
                ${thisBubble.style[6]}: ${thisBubble.style[thisBubble.style[6]]};
            transform: translate(-50%,-50%) scale(1);
            z-index: 2;
            `);
        }, 500)
    }

    render(){
        console.log(this.state.field)
        return(
            <div 
                id="Field"
                style={{
                    backgroundColor: `${this.state.field.data.color}`,
                    opacity: `${this.state.field.opacity}`,
                    zIndex: `${this.state.field.open ? 1001 : 1}`
                }}
                // className={this.state.field.data.index}
            >
                <ArrowBackCircleOutline
                    color={'#24242b'}
                    height="40px"
                    width="40px"
                    onClick={()=>{this.fieldPop()}}
                    style={{cursor:"pointer", position:"absolute", top:"6px", left:"10px"}}
                />
                <Routes>
                    <Route path="/01" element={ <App_01 /> }></Route>
                    <Route path="/02" element={ <App_02 /> }></Route>
                    <Route path="/03" element={ <App_03 /> }></Route>
                </Routes>
            </div>
        )
    }
}