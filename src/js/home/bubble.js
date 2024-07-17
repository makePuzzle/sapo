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
        let z_left = this.props.z.max - this.props.z.cur <= 0 ? 1 : this.props.z.max - this.props.z.cur;
        let isOut = false;
        if(
            // 너비 또는 높이 둘중 한측에서라도 이탈자라면 이탈자 이다.
            // 버블의 중심이 화면 밖에 있어야 하고, 버블이 화면 경계선과 닿아 있지 않으면 이탈이다.
            (
                Math.abs( this.state.location.x / z_left * 500 ) > 50
                &&
                this.props.stage.width * Math.abs( Math.abs( this.state.location.x / z_left * 5 ) - 0.5) > 1000 / z_left
                
            )||(
                Math.abs( this.state.location.y / z_left * 500 ) > 50
                &&
                this.props.stage.height * Math.abs( Math.abs( this.state.location.y / z_left * 5 ) - 0.5) > 1000 / z_left
            )
        ){
            console.log('Im Gone!!!!!!!!!!!!!!!!!!')
        }else{
            console.log('still here')
        }
        return(
            <div className="bubble" style={{
                "width": `calc(1000px / ${z_left})`, 
                "height": `calc(1000px / ${z_left})`,
                "left": `calc(50% + ${this.state.location.x / z_left} * 500%)`,
                "top": `calc(50% + ${this.state.location.y / z_left} * 500%)`
            }}></div>
        )
    }
}