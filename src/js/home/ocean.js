import { Component } from "react";
import Bubble from "./bubble";

export default class Ocean extends Component{
    constructor(props){
        super(props);
        this.state={
            z: {
                cur: 1,
                min: 1,
                max: 50
            },
            stage: {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        }

        // 휠 인식 후 z값 변경
        document.addEventListener('wheel', e=>{
            let wheel = e.wheelDeltaY;
            
            if( wheel > 0 ){
                if(this.state.z.min - 1 < this.state.z.cur && this.state.z.cur < this.state.z.max){
                    this.setState(prevState=>({z: {...prevState.z, cur: this.state.z.cur + 1}}));
                    console.log("up")
                }
            }else{
                if(this.state.z.min < this.state.z.cur && this.state.z.cur < this.state.z.max + 1){
                    console.log("down")
                    this.setState(prevState=>({z: {...prevState.z, cur: this.state.z.cur - 1}}));
                }
            }
        }, false);
    }
    render(){
        console.log(this.state.z)
        return(
            <div id="Ocean">
                <Bubble 
                    z={this.state.z}
                    stage={this.state.stage}
                />
            </div>
        )
    }
}