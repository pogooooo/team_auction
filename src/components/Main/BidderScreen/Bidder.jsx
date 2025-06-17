import {useState} from "react";

const Bidder = () => {
    const [open, setOpen] = useState(true);

    return(
        <div className='font-sans mr-[10px] text-lckBlack'>
            {/*title*/}
            <div className='font-chaney text-xl h-[25px] cursor-default'>bidder</div>

            <div style={{width: 'clamp(500px, 50vw, 700px)'}} className='w-[700px] h-[180px] border-lckBlack border-2 rounded-md flex flex-row items-center transform transition duration-150 ease-in-out hover:scale-[1.03]'>
                {/*current bidder*/}
                <div className='max-xl:w-[50%] w-[33.33%] h-[100%] p-[10px] cursor-default'>
                    <div className='text-lg font-bold h-[20%]'>현재 입찰자</div>
                    <div className='text-base flex justify-center items-center h-[60%]'>pogoo#1000 | 560p</div>
                </div>

                <hr className='border-lckBlack border-[1px] h-[90%]'/>

                {/*point*/}
                <div className='w-[33.33%] h-[100%] p-[10px] max-xl:w-0 max-xl:p-0 overflow-hidden cursor-default'>
                    <div className='text-lg font-bold h-[20%]'>잔여 포인트</div>
                    <div className='flex flex-col items-center justify-center h-[70%]'>
                        {new Array(4).fill().map((item, index) => (
                            <div className='flex justify-between w-[80%] text-sm'>
                                <div>pogoo</div>
                                <div>{(index+1)*100}p</div>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className='max-xl:hidden border-lckBlack border-[1px] h-[90%]'/>

                {/*present point*/}
                <div className='max-xl:w-[50%] relative w-[33.33%] h-[100%] flex flex-col items-center justify-center'>
                    <div className='absolute top-[30px] bg-lckWhite w-[80%] min-h-[30px] flex flex-col p-[5px] border-lckBlack border-[1px] rounded-md mb-[10px]'>
                        <div onClick={() => setOpen(!open)} className='flex justify-between items-center cursor-pointer'>
                            <div className='text-sm text-lckBlack/50'>팀을 선택해주세요.</div>
                            <div className='w-0 h-0 border-x-[5px] border-x-transparent border-t-[9px] border-lckBlack'></div>
                        </div>
                        {open && (
                            <div className={` overflow-hidden ${open ? "max-h-[200px]" : "max-h-0"} bg-lckWhite`}>
                                <div className="">팀 A</div>
                                <div className="">팀 B</div>
                                <div className="">팀 C</div>
                            </div>
                        )}
                    </div>

                    <div className='w-[80%] mt-[30%]'>
                        <input className='w-[94%] bg-lckWhite border-b-lckBlack border-[1px] focus:outline-none mb-[10px]'/>p
                    </div>

                    <div className='text-lckWhite bg-lckBlack w-[80px] h-[25px] flex justify-center items-center rounded-md text-sm cursor-pointer'>입찰</div>
                </div>
            </div>
        </div>
    );
}

export default Bidder;
