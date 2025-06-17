import Target from './Target.jsx'
import Bidder from './Bidder.jsx'

const BidderScreen = () => {

    const test_participants_list = {
        pogoo : {
            ADC : { tier: 'GOLD 2', champ : '카이사, 징크스, 사미라'},
            MID : { tier: 'GOLD 2', champ : '신드라, 리산드라, 베이가'}
        }
    }

    return(
        <div className='flex w-[1200px] justify-center mt-[50px]'>
            <Target list={test_participants_list} />
            <Bidder />
            <div className='w-[170px] h-[180px] mt-[25px]'>
                <div className='w-[170px] h-[85px] rounded-md bg-lckBlack font-sans font-bold text-lckWhite text-xl flex justify-center items-center'>확정</div>
                <div className='w-[170px] h-[85px] mt-[10px] rounded-md bg-lckBlack font-sans font-bold text-lckWhite text-xl flex justify-center items-center'>시작</div>
            </div>
        </div>
    );
}

export default BidderScreen;
