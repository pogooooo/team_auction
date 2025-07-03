import '/public/fonts.css'
import BidderScreen from './Main/BidderScreen/BidderScreen.jsx'
import Participants from './Main/ParticipantScreen/Participants.jsx'
import Team from './Main/TeamScreen/Team.jsx'
import {useEffect, useState} from "react";
import axios from "axios";

const Auction_Main = (props) => {

    return(
        <div className='bg-lckWhite w-screen h-screen flex items-center flex-col font-sans'>
            {!props.load && !props.err && (
                <>
                    <BidderScreen bidder={props.bidder} target={props.target} leader={props.leader} participant={props.participant} />
                    <div className="flex flex-row justify-around w-[1190px] mt-[50px] cursor-default">
                        <Team participant={props.participant} leader={props.leader} />
                        <Participants participant={props.participant} />
                    </div>
                    <div onClick={props.setTarget} className='fixed bottom-10 right-10 cursor-pointer text-xl font-bold bg-lckBlack text-lckWhite w-[120px] h-[50px] flex items-center justify-center rounded-md'>시작 하기</div>
                </>
            )}
        </div>
    )
}

export default Auction_Main
