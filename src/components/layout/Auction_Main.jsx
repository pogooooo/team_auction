import '/public/fonts.css'
import BidderScreen from '../Main/BidderScreen/BidderScreen.jsx'
import Participants from '../Main/Participants.jsx'
// import Team from '../Main/Team.jsx'

const Auction_Main = () => {
    return(
        <div className='bg-lckWhite w-screen h-screen flex justify-center'>
            <BidderScreen/>
            <div>
                {/*<Participants />*/}
                {/*<Team />*/}
            </div>
        </div>
    )
}

export default Auction_Main
