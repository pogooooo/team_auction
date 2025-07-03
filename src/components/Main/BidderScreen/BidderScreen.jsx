import Target from './Target.jsx'
import Bidder from './Bidder.jsx'
import {useState} from "react";

const BidderScreen = (props) => {

    const bidConfirm = () => {
    }

    const outflow = () => {
    }

    return(
        <div className='flex w-[1200px] justify-center mt-[50px]'>
            <Target target={props.target} />
            <Bidder leader={props.leader} bidder={props.bidder} />
            <div className='w-[170px] h-[180px] mt-[25px]'>
                {/*확정 버튼*/}
                <div onClick={bidConfirm} className='cursor-pointer border-[2px] border-lckBlack w-[170px] h-[85px] rounded-md bg-lckBlack font-sans font-bold text-lckWhite text-xl flex justify-center items-center transform transition duration-150 ease-in-out hover:scale-[1.03] active:bg-lckWhite active:text-lckBlack'>확정</div>
                {/*유찰 버튼*/}
                <div onClick={outflow} className='cursor-pointer border-[2px] border-lckBlack w-[170px] h-[85px] mt-[10px] rounded-md bg-lckBlack font-sans font-bold text-lckWhite text-xl flex justify-center items-center transform transition duration-150 ease-in-out hover:scale-[1.03] active:bg-lckWhite active:text-lckBlack'>유찰</div>
            </div>
        </div>
    );
}

export default BidderScreen;
