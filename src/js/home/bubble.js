import { Component } from "react";

export default class Bubble extends Component{
    constructor(props){
        super(props);
        this.state={
            location:{
                x: Math.random() - 0.5,
                y: Math.random() - 0.5
            }
        }
    }
    render(){
        return(
            <div className="bubble" style={{
                "width": `calc(${this.props.z.cur} * 20px)`, 
                "height": `calc(${this.props.z.cur} * 20px)`,
                "left": `calc(${this.state.location.x + 1} * 50%)`,
                "top": `calc(${this.state.location.y + 1} * 50%)`
            }}>{this.props.z.cur}</div>
        )
    }
}