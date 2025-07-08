import Target from './Target.jsx'
import Bidder from './Bidder.jsx'
import {useState} from "react";
import Api from '../../Other/Api.jsx'
import WarningScreen from "../../Other/WarningScreen.jsx";

const BidderScreen = (props) => {

    const [point, setPoint] = useState(0);
    const [warning, setWarning] = useState('');

    const bidConfirm = async () => {

        if(Object.entries(props.target).length <= 0) {
            setWarning('경매가 시작되지 않았습니다.')
            setTimeout(() => setWarning(''), 2000);
        }

        if(Object.keys(props.bidder).length === 0) {
            setWarning('입찰자가 없습니다.')
            setTimeout(() => setWarning(''), 2000);
        }

        const targetName = Object.entries(props.target)[0][0];
        const targetLine = props.target[targetName].line;

        const duplicate = Object.entries(props.participant).some(([, info]) => {
            return info.team === props.bidder.name && info.line === targetLine;
        });

        if (duplicate) {
            setWarning(`${props.bidder.name}팀에 ${targetLine} 라인 팀원이 존재합니다.`);
            setTimeout(() => setWarning(''), 2000);
            return;
        }

        //입찰자 정보 초기화
        await Api.post('/game/bid/bidder/clear')

        //잔여 포인트 업데이트
        await Api.put('/game/participant/edit/point', {nickname:props.bidder.name, point:props.leader[props.bidder.name]-point})

        //타겟의 팀 지정
        await Api.put('/game/participant/edit/team', {nickname:targetName, team:props.bidder.name})

        //경매 0번 삭제
        await Api.post('/game/bid/target/sell')
    }

    const outflow = async () => {
        await Api.post('/game/bid/state', {order:props.order+1})
    }

    return(
        <div className='flex w-[1200px] justify-center mt-[70px]'>
            <Target target={props.target} order={props.order} />
            <Bidder leader={props.leader} bidder={props.bidder} point={point} setPoint={setPoint} />
            <div className='w-[170px] h-[180px] mt-[25px]'>
                {/*확정 버튼*/}
                <div onClick={bidConfirm} className='cursor-pointer border-[2px] border-lckBlack w-[170px] h-[85px] rounded-md bg-lckBlack font-sans font-bold text-lckWhite text-xl flex justify-center items-center transform transition duration-150 ease-in-out hover:scale-[1.03] active:bg-lckWhite active:text-lckBlack'>확정</div>
                {/*유찰 버튼*/}
                <div onClick={outflow} className='cursor-pointer border-[2px] border-lckBlack w-[170px] h-[85px] mt-[10px] rounded-md bg-lckBlack font-sans font-bold text-lckWhite text-xl flex justify-center items-center transform transition duration-150 ease-in-out hover:scale-[1.03] active:bg-lckWhite active:text-lckBlack'>유찰</div>
            </div>

            {warning && (
                <WarningScreen warning={warning} />
            )}
        </div>
    );
}

export default BidderScreen;
