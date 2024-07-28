import React, { Component } from "react";
import { ArrowBackCircleOutline } from 'react-ionicons'

export default class Field extends Component{
    constructor(props){
        super(props);
        this.state={
            field: this.props.field,
            setField: this.props.setField
        }
        // 창 크기 변화 인식 후 그에 맞춰 화면 재구성
        window.addEventListener('resize', this.resize.bind(this), false);
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
        const thisBubble = this.state.field.bubble;
        this.state.setField("#000000", 0, false, thisBubble);
        thisBubble.setAttribute('style', `
            ${thisBubble.style[0]}: ${thisBubble.style[thisBubble.style[0]]};
            ${thisBubble.style[1]}: ${thisBubble.style[thisBubble.style[1]]};
            ${thisBubble.style[2]}: ${thisBubble.style[thisBubble.style[2]]};
            ${thisBubble.style[3]}: ${thisBubble.style[thisBubble.style[3]]};
            ${thisBubble.style[4]}: ${thisBubble.style[thisBubble.style[4]] * 1};
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
                ${thisBubble.style[4]}: ${thisBubble.style[thisBubble.style[4]] * 1};
                ${thisBubble.style[5]}: ${thisBubble.style[thisBubble.style[5]]};
                ${thisBubble.style[6]}: ${thisBubble.style[thisBubble.style[6]]};
            transform: translate(-50%,-50%) scale(1);
            z-index: 2;
            `);
        }, 500)
    }

    
    render(){
        return(
            <div 
                id="Field"
                style={{
                    backgroundColor: `${this.state.field.color}`,
                    opacity: `${this.state.field.opacity}`,
                    zIndex: `${this.state.field.open ? 1001 : 1}`
                }}
            >
                <ArrowBackCircleOutline
                    color={'#24242b'}
                    height="40px"
                    width="40px"
                    onClick={()=>{this.fieldPop()}}
                />
            </div>
        )
    }
}