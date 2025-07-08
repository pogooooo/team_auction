import '/public/fonts.css'
import BidderScreen from './Main/BidderScreen/BidderScreen.jsx'
import Participants from './Main/ParticipantScreen/Participants.jsx'
import Team from './Main/TeamScreen/Team.jsx'
import Api from './Other/Api.jsx'

const AuctionMain = (props) => {

    const resetAuction = async () => {
        const response = await Api.delete('/game/participant/reset')
        console.log(response.data)
    }

    const resetPoint = async () => {
        const res = await Api.get('/game/participant/leader');
        const leaders = res.data;

        // 병렬로 요청 보내기
        const updatePromises = Object.entries(leaders).map(([nickname, ]) =>
            Api.put('/game/participant/edit/point', {
                nickname,
                point: 1000,
            })
        );

        await Api.post('/game/bid/bidder/clear')

        await Promise.all(updatePromises);
    }

    return(
        <div className='bg-lckWhite w-screen h-screen flex items-center flex-col font-sans'>
            {!props.load && !props.err && (
                <>
                    <BidderScreen bidder={props.bidder} target={props.target} leader={props.leader}
                                  participant={props.participant} order={props.order}/>
                    <div className="flex flex-row justify-around w-[1190px] mt-[50px] cursor-default">
                        <Team participant={props.participant} leader={props.leader}/>
                        <Participants participant={props.participant}/>
                    </div>

                    <div onClick={async () => {
                        await resetAuction();
                        props.setTarget();
                    }}
                         className='active:bg-lckWhite active:text-lckBlack active:border-lckBlack active:border-[2px] fixed bottom-[100px] right-10 cursor-pointer text-xl font-bold bg-lckBlack text-lckWhite w-[120px] h-[50px] flex items-center justify-center rounded-md'>
                        초기화
                    </div>

                    <div onClick={async () => {
                        await resetPoint();
                        props.setTarget();
                    }}
                         className='active:bg-lckWhite active:text-lckBlack active:border-lckBlack active:border-[2px] fixed bottom-10 right-10 cursor-pointer text-xl font-bold bg-lckBlack text-lckWhite w-[120px] h-[50px] flex items-center justify-center rounded-md'>
                        시작 하기
                    </div>
                </>
            )}
        </div>
    )
}

export default AuctionMain
