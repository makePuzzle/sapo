import { Component } from "react";

export default class Bubble extends Component{
    constructor(props){
        super(props);
        this.state={
            location:{
                x: Math.random() - 0.5,
                y: Math.random() - 0.5
            },
            exist: this.props.exist,
            z_left: this.props.z.max - this.props.z.cur <= 0 ? 1 : this.props.z.max - this.props.z.cur
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.z !== this.props.z){
            this.setState({ z_left: this.props.z.max - this.props.z.cur <= 0 ? 1 : this.props.z.max - this.props.z.cur });
            if(
                // 너비 또는 높이 둘중 한측에서라도 이탈자라면 이탈자 이다.
                // 버블의 중심이 화면 밖에 있어야 하고, 버블이 화면 경계선과 닿아 있지 않으면 이탈이다.
                (
                    (
                        Math.abs( this.state.location.x / this.state.z_left * 500 ) > 50
                        &&
                        this.props.stage.width * Math.abs( Math.abs( this.state.location.x / this.state.z_left * 5 ) - 0.5) > 1000 / this.state.z_left
                        
                    )||(
                        Math.abs( this.state.location.y / this.state.z_left * 500 ) > 50
                        &&
                        this.props.stage.height * Math.abs( Math.abs( this.state.location.y / this.state.z_left * 5 ) - 0.5) > 1000 / this.state.z_left
                    )
                )||
                // 또는 버블이 너무 멀리 있어 투명도가 0.02보다 낮으면 없는것으로 간주한다.
                (
                    ( 4 / this.state.z_left ) < 0.03
                )
            ){
                // 버블이 화면에서 사라졌을 때 작동할 코드
                this.props.setExist( false );
            }else{
                // 버블이 화면상에 보일 때 작동할 코드
                this.props.setExist( true );
            }
        }
    }

    render(){
        return(
            <div className="bubble" style={{
                width: `calc(1000px / ${this.state.z_left})`, 
                height: `calc(1000px / ${this.state.z_left})`,
                left: `calc(50% + ${this.state.location.x / this.state.z_left} * 500%)`,
                top: `calc(50% + ${this.state.location.y / this.state.z_left} * 500%)`,
                opacity: `${4 / this.state.z_left}`,
                boxShadow: `0 0 ${this.state.z_left / 4}px 14px rgb(128, 255, 212)`
            }}></div>
        )
    }
}