import { Component } from "react";
import { Link } from "react-router-dom";

export default class Bubble extends Component{
    constructor(props){
        super(props);
        this.state={
            data: this.props.data,
            location:{
                x: Math.random() - 0.5,
                y: Math.random() - 0.5
            },
            exist: this.props.exist,
            z_left: this.props.z.max - this.props.z.cur <= 0 ? 1 : this.props.z.max - this.props.z.cur,
            setField: this.props.setField
        }
    }

    componentDidUpdate(prevProps, prevState){
        // z값(스크롤)에 변화가 생기면
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

    bubblePop(e){
        const bubble = e.target;
        // bubble style 순서
        // width, height, left, top, opacity, box-shadow, background-color
        // 즉시 살짝 커짐, 투명도 유지
        bubble.setAttribute('style', `
            ${bubble.style[0]}: ${bubble.style[bubble.style[0]]};
            ${bubble.style[1]}: ${bubble.style[bubble.style[1]]};
            ${bubble.style[2]}: ${bubble.style[bubble.style[2]]};
            ${bubble.style[3]}: ${bubble.style[bubble.style[3]]};
            ${bubble.style[4]}: ${bubble.style[bubble.style[4]] * 1};
            ${bubble.style[5]}: ${bubble.style[bubble.style[5]]};
            ${bubble.style[6]}: ${bubble.style[bubble.style[6]]};
            transform: translate(-50%,-50%) scale(1.4);
            z-index: 1000;
        `);
        // 0.5초 뒤 살짝 작아짐, 투명도 남은 수치의 50% 만큼 증가
        setTimeout(()=>{
            bubble.setAttribute('style', `
                ${bubble.style[0]}: ${bubble.style[bubble.style[0]]};
                ${bubble.style[1]}: ${bubble.style[bubble.style[1]]};
                ${bubble.style[2]}: ${bubble.style[bubble.style[2]]};
                ${bubble.style[3]}: ${bubble.style[bubble.style[3]]};
                ${bubble.style[4]}: ${bubble.style[bubble.style[4]] / 2 + 0.5};
                ${bubble.style[5]}: ${bubble.style[bubble.style[5]]};
                ${bubble.style[6]}: ${bubble.style[bubble.style[6]]};
                transform: translate(-50%,-50%) scale(0.7);
                z-index: 1000;
            `);
        }, 400)
        // 1초 뒤 화면을 가득 채움, 투명도 없음
        setTimeout(()=>{
            bubble.setAttribute('style', `
                ${bubble.style[0]}: ${bubble.style[bubble.style[0]]};
                ${bubble.style[1]}: ${bubble.style[bubble.style[1]]};
                ${bubble.style[2]}: ${bubble.style[bubble.style[2]]};
                ${bubble.style[3]}: ${bubble.style[bubble.style[3]]};
                ${bubble.style[4]}: 100%;
                ${bubble.style[5]}: ${bubble.style[bubble.style[5]]};
                ${bubble.style[6]}: ${bubble.style[bubble.style[6]]};
                transform: translate(-50%,-50%) scale(60);
                z-index: 1000;
            `);
        }, 900)
        // 1초 뒤 화면을 가득 채움, 투명도 없음
        setTimeout(()=>{
            this.state.setField(this.state.data, 1, true, bubble)
        }, 1100)
    }

    render(){
        console.log(`z_left: ${this.state.z_left}`);
        console.log(`depth: ${this.state.data.depth}`);
        const z_left_by_depth = (this.props.z.max - this.props.z.cur <= 0 ? 1 : this.props.z.max - this.props.z.cur) - this.props.data.depth;
        console.log(z_left_by_depth)
        return(
            <Link 
                to={`/${(this.state.data.index < 10) ? '0' + this.state.data.index.toString() : this.state.data.index.toString()}`}
                className="bubble" 
                style={{
                    width: `calc(1000px / ${z_left_by_depth})`, 
                    height: `calc(1000px / ${z_left_by_depth})`,
                    left: `calc(50% + ${this.state.location.x / z_left_by_depth} * 500%)`,
                    top: `calc(50% + ${this.state.location.y / z_left_by_depth} * 500%)`,
                    opacity: `${4 / z_left_by_depth}`,
                    boxShadow: `0 0 ${z_left_by_depth / 4}px 14px ${this.state.data.color}`,
                    backgroundColor: `${this.state.data.color}`
                }}
                onClick={(e)=>{this.bubblePop(e)}}
            ></Link>
        )
    }
}