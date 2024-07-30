import React, { Component } from "react";

export default class App_02 extends Component{
    constructor(props){
        super(props);
        //  canvas, context 생성
        this.canvas = document.createElement("canvas");
        this.fieldDOM = document.getElementById("Field");
        this.fieldDOM.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
    }
    render(){
        return(
            <div>two 2</div>
        )
    }
}