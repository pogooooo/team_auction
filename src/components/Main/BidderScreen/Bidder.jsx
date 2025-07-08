import {useState} from "react";
import Api from '../../Other/Api.jsx'
import WarningScreen from "../../Other/WarningScreen.jsx";

const Bidder = (props) => {
    const [open, setOpen] = useState(false);
    const [team, setTeam] = useState(null);

    const [warning, setWarning] = useState('')

    const pointOnChange = (e) => {
        const value = e.target.value;

        if (/^\d+$/.test(value)) {
            props.setPoint(value);
        }
    }

    const betting = async () => {

        if(team === null){
            setWarning('팀을 선택해 주세요.')
            setTimeout(() => setWarning(''), 2000)
            return
        }

        if(props.leader[team] < props.point){
            setWarning('잔여 포인트가 부족합니다.');
            setTimeout(() => setWarning(''), 2000);
            return
        }

        if (props.bidder && Object.keys(props.bidder).length > 0 && props.bidder.point >= Number(props.point)) {
            setWarning(`현재 입찰 포인트(${props.bidder.point}p)보다 높은 금액을 입력하세요.`);
            setTimeout(() => setWarning(''), 2000);
            return;
        }

        try {
            const CurrentBidder = await Api.post('/game/bid/bidder', {name: team, point: Number(props.point)});
            console.log('Server response:', CurrentBidder.data);
            return
        } catch (err) {
            console.error("Failed to set order state:", err);
            throw err;
        }
    }

    return(
        <div className='font-sans mr-[10px] text-lckBlack'>
            {/*title*/}
            <div className='font-chaney text-xl h-[25px] cursor-default'>bidder</div>

            <div style={{width: 'clamp(500px, 50vw, 700px)'}}
                 className='w-[700px] h-[180px] border-lckBlack border-2 rounded-md flex flex-row items-center transform transition duration-150 ease-in-out hover:scale-[1.03]'>
                {/*current bidder*/}
                <div className='max-xl:w-[50%] w-[33.33%] h-[100%] p-[10px] cursor-default'>
                    <div className='text-lg font-bold h-[20%]'>현재 입찰자</div>
                    <div className='text-sm font-bold flex justify-center items-center h-[60%]'>{Object.keys(props.bidder).length === 0 ? <div className='text-lckBlack/50 font-bold'>No bidder exists</div> : <div className=''>{props.bidder.name} : {props.bidder.point}p</div>}</div>
                </div>

                <hr className='border-lckBlack border-[1px] h-[90%]'/>

                {/*point*/}
                <div className='w-[33.33%] h-[100%] p-[10px] max-xl:w-0 max-xl:p-0 overflow-hidden cursor-default'>
                    <div className='text-lg font-bold h-[20%]'>잔여 포인트</div>
                    <div className='flex flex-col items-center justify-center h-[70%]'>
                        {props.leader && Object.keys(props.leader).length > 0 ? (
                            Object.entries(props.leader).map(([nickname, point], index) => (
                                <div key={index} className="font-bold flex justify-between w-[80%] text-sm">
                                    <div>{nickname}</div>
                                    <div>{point}p</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-lckBlack/50 font-bold text-center w-full">No leaders available</div>
                        )}
                    </div>
                </div>

                <hr className='max-xl:hidden border-lckBlack border-[1px] h-[90%]'/>

                {/*betting*/}
                <div className='max-xl:w-[50%] relative w-[33.33%] h-[100%] flex flex-col items-center justify-center'>
                    <div className='absolute top-[30px] bg-lckWhite w-[80%] min-h-[30px] flex flex-col p-[5px] border-lckBlack border-[1px] rounded-md mb-[10px]'>
                        <div onClick={() => setOpen(!open)}
                             className='flex justify-between items-center cursor-pointer'>
                            {team ? <div className='text-sm text-lckBlack'>팀 {team}</div> :
                                <div className='text-sm text-lckBlack/50'>팀을 선택해주세요</div>}
                            <div
                                className='w-0 h-0 border-x-[5px] border-x-transparent border-t-[9px] border-lckBlack'></div>
                        </div>
                        {open && (
                            <div className={`overflow-hidden ${open ? "max-h-[200px]" : "max-h-0"} bg-lckWhite`}>
                                {props.leader && Object.keys(props.leader).length > 0 ? (
                                    Object.keys(props.leader).map((nickname, index) => (
                                        <div onClick={() => {setTeam(nickname);setOpen(false);}} key={index} className="p-[2px] text-sm cursor-pointer font-bold">팀 {nickname}</div>
                                    ))
                                ) : (
                                    <div className="text-center text-lckBlack/50 font-bold">팀 정보가 없습니다</div>
                                )}
                            </div>
                        )}
                    </div>


                    <div className='w-[80%] mt-[30%]'>
                        <input type='number' onChange={(e) => pointOnChange(e)} className='w-[90%] bg-lckWhite border-b-lckBlack border-[1px] focus:outline-none mb-[10px] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'/>p
                    </div>

                    {/*입찰 버튼*/}
                    <div onClick={betting} className='text-lckWhite bg-lckBlack w-[80px] h-[25px] flex justify-center items-center rounded-md text-sm cursor-pointer border-[2px] border-lckBlack active:bg-lckWhite active:text-lckBlack'>입찰</div>
                </div>
            </div>

            {warning && (
                <WarningScreen warning={warning} />
            )}
        </div>
    );
}

export default Bidder;
