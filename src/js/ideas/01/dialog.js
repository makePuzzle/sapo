import { Worm } from './worm.js';

import quizLogic from "./quizzes/01.json";

const FPS = 1000 / 60;
const FOLLOW_SPEED = 0.8;

const woodCords = [
    [8,6,true,0],[9,6,true,0],[10,6,true,0],[11,6,true,0],[12,6,true,0],
    [8,7,true,0],[9,7,true,0],[10,7,true,0],[11,7,true,0],[12,7,true,0],
    [8,8,true,0],[9,8,true,0],[10,8,true,0],[11,8,true,0],[12,8,true,0],
    [8,9,true,0],[9,9,true,0],[10,9,true,0],[11,9,true,0],[12,9,true,0],
    [8,10,true,0],[9,10,true,0],[10,10,true,0],[11,10,true,0],[12,10,true,0],
    [8,11,true,0],[9,11,true,0],[10,11,true,0],[11,11,true,0],[12,11,true,0]
];

const quizCords = new Array;
quizCords.push(quizLogic.leadCord)
for(let q = 0; q < quizLogic.log.length; q++){
    quizCords.push([
        quizLogic.leadCord[0] + quizLogic.log[q][0],
        quizLogic.leadCord[1] + quizLogic.log[q][1]
    ])
};

const groundCords = [
    [0,12],[1,12],[2,12],[3,12],[4,12],[5,12],[6,12],[7,12],[8,12],[9,12],
    [10,12],[11,12],[12,12],[13,12],[14,12],[15,12],[16,12],[17,12],[18,12],[19,12],
    [20,12],[21,12],[22,12],[23,12],[24,12],[25,12],[26,12],[27,12],[28,12],[29,12],
    [0,13],[1,13],[2,13],[3,13],[4,13],[5,13],[6,13],[7,13],[8,13],[9,13],
    [10,13],[11,13],[12,13],[13,13],[14,13],[15,13],[16,13],[17,13],[18,13],[19,13],
    [20,13],[21,13],[22,13],[23,13],[24,13],[25,13],[26,13],[27,13],[28,13],[29,13],
    [0,14],[1,14],[2,14],[3,14],[4,14],[5,14],[6,14],[7,14],[8,14],[9,14],
    [10,14],[11,14],[12,14],[13,14],[14,14],[15,14],[16,14],[17,14],[18,14],[19,14],
    [20,14],[21,14],[22,14],[23,14],[24,14],[25,14],[26,14],[27,14],[28,14],[29,14],
];

export class Dialog{
    constructor(){
        this.startCord = new Worm();
        this.pos0 = new Worm();
        this.pos1 = new Worm();
        this.pos2 = new Worm();
        this.pos3 = new Worm();
        this.prev0Cord = new Worm();
        this.prev1Cord = new Worm();
        this.prev2Cord = new Worm();
        this.prev3Cord = new Worm();
        this.target = new Worm();

        this.posAsCord = (cord, XorY) => {
            if(XorY === "x"){
                return this.stageWidth * cord / 30;
            }else if(XorY === "y"){
                return this.stageHeight * cord / 15;
            }
        };

        this.isExistinArr = (arr1, arr2) => {
            if(arr1[0] !== arr2[0]){
                return false;
            };
            if(arr1[1] !== arr2[1]){
                return false;
            };
            return true;
        };

        this.compare = (woodCords, quizLogic) => {
            // 아직 벌레에게 먹히지 않은 나무 블록들의 좌표를 모은 배열 생성
            let surviveWoods = woodCords.filter(woodCord => woodCord[2] === true);
            if(surviveWoods.length > 0){
                // surviveWoods의 첫번째 요소의 x, y 좌표값을 변수 선언
                let leadCord_surv_x = surviveWoods[0][0];
                let leadCord_surv_y = surviveWoods[0][1];

                // quizlog와 leadCord를 합쳐 현재 상황에서 가질수 있는 답지 생성
                let answer = quizLogic.log.map(log => [leadCord_surv_x+log[0], leadCord_surv_y+log[1]]);
                answer.unshift([leadCord_surv_x, leadCord_surv_y]);
                if(surviveWoods.length !== answer.length){
                    return false;
                }else{
                    let i = 0;
                    for(; i < answer.length; i++){
                        if(
                            surviveWoods[i][0] !== answer[i][0] ||
                            surviveWoods[i][1] !== answer[i][1]
                        ){
                            break;
                        }
                    };
                    return i === answer.length ? true : false;
                };
            };
        };

        this.isWormFall = (wormCords, woodCords) => {
            // wormCords가 surviveWoods 또는 groundCords에 걸릴때까지 낙하
            let surviveWoods = woodCords.filter(woodCord => woodCord[2] === true);
            
            // 각각의 worm 블록에 대해 실행
            let n = 0;
            for(let w = 0; w < wormCords.length; w++){
                // 4. 추출된 y 좌표값중 가장 작은값을 선언
                // ( 해당 worm 블록과 같은 x 선상, 보다 아래 있지만 그중 가장 위에 있는 블록의 y 좌표값)
                let closestFloor = Math.min(...surviveWoods
                    // 1. 해당 worm 블록과 x 좌표가 일치하는 surviveWoods 필터링
                    .filter(surviveWood => 
                        surviveWood[0] === wormCords[w].x
                    )
                    // 2. 그 중 worm 블록보다 아래에 있는 wood 필터링
                    .filter(wood => 
                        wood[1] > wormCords[w].y
                    )
                    // 3. 그 wood들의 y 좌표값만 추출
                    .map(wood => 
                        wood[1]
                    )
                );
                console.log(
                    ...surviveWoods
                    .filter(surviveWood => 
                        surviveWood[0] === wormCords[w].x
                    )
                )
                console.log(`${w}: ${closestFloor}`)
                if(
                    // worm 블록과 x선상 겹치는 wood 블록이 없고 
                    // 바닥에서 떨어져 있는 경우
                    closestFloor === Infinity && 
                    wormCords[w].y !== 11
                ){
                    n = n;
                }else if(
                    // worm 블록이 바닥에 있는 경우
                    wormCords[w].y === 11
                ){
                    n++;
                }else if(
                    // worm 블록 바로 아래에 wood 블록이 있는 경우
                    closestFloor - wormCords[w].y === 1
                ){
                    n++;
                }else{
                    // worm 블록과 x선상 겹치는 wood 블록이 있지만
                    // worm 블록 바로 아래에 바닥도 wood 블록도 없는 경우
                    n = n;
                };
            };

            // 하나의 worm 블록이라도 어딘가에 걸쳐있다면 n 값이 증가
            // n 값이 0 그대로라면 한칸 낙하
            return n === 0 ? true : false;
        };

        this.divMass = (woodCords) => {
            // 아직 벌레에게 먹히지 않은 나무 블록들의 좌표를 모은 배열 생성
            let surviveWoods = woodCords.filter(woodCord => woodCord[2] === true);
            // 살아남은 나무블록들 중 최상단 최좌측의 블록을 leadMass로 지정하고
            // leadMass의 소속을 1번으로 설정
            let leadMass = surviveWoods[0];
            leadMass[3] = 1;
            // leadMass와 우측 또는 하단으로 붙어있는 블록을 찾고
            // 또 그 블록과 우측 또는 하단으로 붙어있는 블록을 찾기를 반복
            // 그 과정에서 찾아진 블록들의 소속을 leadMass와 같은 소속으로 설정
        };
    }

    setBase(stageWidth, stageHeight){
        // stageWidth, stageHeight 기억
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        // worm 의 부품 블록의 너비, 높이
        this.WIDTH = stageWidth / 30 * 9/10;
        this.HEIGHT = this.WIDTH;

        // worm 이동 가능 좌표값 (3,6) ~ (17,11)
        // worm 시작 위치 좌표값 (3,11)(4,11)(5,11),(6,11)
        this.startCord.x = 6;
        this.startCord.y = 11;
        // 첫 시작 좌표 설정
        if(this.prev0Cord.x === 0 && this.prev0Cord.y === 0){
            this.prev0Cord.x = this.startCord.x;
            this.prev0Cord.y = this.startCord.y;
            this.prev0Cord.x = this.startCord.x;
            this.prev0Cord.y = this.startCord.y;
            this.prev1Cord.x = this.startCord.x - 1;
            this.prev1Cord.y = this.startCord.y;
            this.prev2Cord.x = this.startCord.x - 2;
            this.prev2Cord.y = this.startCord.y;
            this.prev3Cord.x = this.startCord.x - 3;
            this.prev3Cord.y = this.startCord.y;
        };

        let startwormCord = [
            this.prev0Cord,
            this.prev1Cord,
            this.prev2Cord,
            this.prev3Cord
        ];
        return startwormCord;
    }

    setPosAsCords(wormCordEl){
        // 좌표에 따른 포지션 설정 
        // pos0 머리, pos1 가슴, pos2 배, pos3 꼬리
        this.pos0.x = this.posAsCord(wormCordEl[0].x, "x");
        this.pos0.y = this.posAsCord(wormCordEl[0].y, "y");
        this.pos1.x = this.posAsCord(wormCordEl[1].x, "x");
        this.pos1.y = this.posAsCord(wormCordEl[1].y, "y");
        this.pos2.x = this.posAsCord(wormCordEl[2].x, "x");
        this.pos2.y = this.posAsCord(wormCordEl[2].y, "y");
        this.pos3.x = this.posAsCord(wormCordEl[3].x, "x");
        this.pos3.y = this.posAsCord(wormCordEl[3].y, "y");
        
        this.prev0Cord = wormCordEl[0];
        this.prev1Cord = wormCordEl[1];
        this.prev2Cord = wormCordEl[2];
        this.prev3Cord = wormCordEl[3];
    }

    animate(ctx){
        ctx.beginPath();

        // draw worm dynamically
        ctx.fillStyle = `#000000`;
        ctx.fillRect(
            this.pos0.x,
            this.pos0.y, 
            this.WIDTH, this.HEIGHT
        );
        ctx.fillStyle = `#333333`;
        ctx.fillRect(
            this.pos1.x,
            this.pos1.y, 
            this.WIDTH, this.HEIGHT
        );
        ctx.fillStyle = `#666666`;
        ctx.fillRect(
            this.pos2.x,
            this.pos2.y, 
            this.WIDTH, this.HEIGHT
        );
        ctx.fillStyle = `#999999`;
        ctx.fillRect(
            this.pos3.x,
            this.pos3.y, 
            this.WIDTH, this.HEIGHT
        );

        // draw ground
        ctx.fillStyle = `#b196ff`;
        for(let i = 0; i < groundCords.length; i++){
            ctx.fillRect(
                this.posAsCord(groundCords[i][0], "x"),
                this.posAsCord(groundCords[i][1], "y"),
                this.WIDTH, this.HEIGHT
            );
        };

        // draw wood
        // woodCords는 외부 파일에서 가져옴 / 문제에 따라 블록개수 다르게 생성
        ctx.fillStyle = `#cdbddb`;
        for(let i = 0; i < woodCords.length; i++){
            if(woodCords[i][2]){
                ctx.fillRect(
                    this.posAsCord(woodCords[i][0], "x"),
                    this.posAsCord(woodCords[i][1], "y"),
                    this.WIDTH, this.HEIGHT
                );
            }
        };

        // draw quiz
        ctx.fillStyle = `#cdbddb`;
        for(let i = 0; i < quizCords.length; i++){
            ctx.fillRect(
                this.posAsCord(quizCords[i][0], "x"),
                this.posAsCord(quizCords[i][1], "y"),
                this.WIDTH, this.HEIGHT
            );
        };

        // 정답과 같은지 확인하는 코드.
        // 정답과 일치하면 축하 창과 다음 문제로 넘어가는 코드 작성해야됨.
        console.log(this.compare(woodCords, quizLogic));
    }

    arrowKeyDown(key){
        // 조건 1. 입력키가 방향키일것
        // 조건 2. (3,5)~(17,11)을 벗어나지 말것
        // 조건 3. 이동하고자 하는 좌표가 prve1Cord의 좌표와 겹치지 말것
        if(
            key === 'ArrowUp' ||
            key === 'ArrowDown' ||
            key === 'ArrowLeft' ||
            key === 'ArrowRight'
        ){
            let wormCordArr = new Array;

            if(
                key === 'ArrowUp' &&
                this.prev0Cord.y >= 2 &&
                this.prev0Cord.y - 1 !== this.prev1Cord.y
            ){
                this.target = this.prev0Cord.clone().moveUp();
            }else if(
                key === 'ArrowDown' &&
                this.prev0Cord.y <= 10 &&
                this.prev0Cord.y + 1 !== this.prev1Cord.y
            ){
                this.target = this.prev0Cord.clone().moveDown();
            }else if(
                key === 'ArrowLeft' &&
                this.prev0Cord.x >= 4 &&
                this.prev0Cord.x - 1 !== this.prev1Cord.x
            ){
                this.target = this.prev0Cord.clone().moveLeft();
            }else if(
                key === 'ArrowRight' &&
                this.prev0Cord.x <= 16 &&
                this.prev0Cord.x + 1 !== this.prev1Cord.x
            ){
                this.target = this.prev0Cord.clone().moveRight();
            }else{
                this.target = this.prev0Cord.clone();
                this.prev0Cord = this.prev1Cord.clone();
                this.prev1Cord = this.prev2Cord.clone();
                this.prev2Cord = this.prev3Cord.clone();
            };

            wormCordArr.push([
                this.target.clone(),
                this.prev0Cord.clone(),
                this.prev1Cord.clone(),
                this.prev2Cord.clone()
            ]);

            // 벌레먹은 파트는 3번째 인자값을 false로 변경하여 화면에 표출하지 않도록 함
            let headCord = [this.target.x, this.target.y];
            woodCords.some((woodCord, i) => {
                if(this.isExistinArr(woodCord, headCord)){
                    woodCords[i][2] = false;
                };
            });
            
            console.log(wormCordArr[0])
            console.log([this.target, this.prev0Cord, this.prev1Cord, this.prev2Cord])
            // 애벌레 활동 가능 최대 높이가 10 이므로 최대 10번 반복
            for(let h = 0; h < 10; h++){
                if(
                    this.isWormFall(
                        [this.target, this.prev0Cord, this.prev1Cord, this.prev2Cord], 
                        woodCords
                    )
                ){
                    // 낙하 상황 시 한단계 떨어진 좌표를 배열에 저장
                    wormCordArr.push([
                        this.target.clone().moveDown(),
                        this.prev0Cord.clone().moveDown(),
                        this.prev1Cord.clone().moveDown(),
                        this.prev2Cord.clone().moveDown()
                    ]);

                    // 낙하가 종료되었는지 판단하기 위해 변화값을 this에 저장하지만
                    // 저장한 내용이 즉시 애니메이션에 반영되는것은 아니고 그 과정을 배열에 저장하고 반환함.
                    this.target = this.target.clone().moveDown();
                    this.prev0Cord = this.prev0Cord.clone().moveDown();
                    this.prev1Cord = this.prev1Cord.clone().moveDown();
                    this.prev2Cord = this.prev2Cord.clone().moveDown();
                }else{
                    // 지지 상황 시 반복문 중지
                    break;
                };
            };
            return wormCordArr;
        }
    }
}