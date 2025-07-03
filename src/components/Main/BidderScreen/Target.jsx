import axios from "axios";

const Target = (props) => {
    // target의 엔트리 배열
    const entries = Object.entries(props.target);

    // 첫 번째 타겟
    const firstTarget = entries.length > 0 ? entries[0] : null;

    return (
        <div className='font-sans font-bold mr-[10px]'>

            {/* title */}
            <div className='font-chaney font-medium text-xl h-[25px] cursor-default'>target</div>

            <div
                style={{ width: 'clamp(150px, 16vw, 300px)' }}
                className='h-[180px] border-lckBlack border-2 rounded-md p-[10px] flex flex-col justify-center min-w-[150px] min-h-[150px] max-w-[300px] max-h-[180px] transform transition duration-150 ease-in-out hover:scale-[1.03]'
            >
                {firstTarget ? (
                    <>
                        {/* summoner name */}
                        <div className='text-lg mb-[5%] cursor-default'>
                            {firstTarget[0]}
                        </div>

                        <hr className='border-lckBlack border-[1px]' />

                        {/* tier, line */}
                        <div className='text-sm mb-[2%] mt-[2%] cursor-default'>
                            {firstTarget[1].line} | {firstTarget[1].tier}
                        </div>

                        <hr className='border-lckBlack border-[1px]' />

                        {/* champ */}
                        <div className='text-sm mt-[2%] cursor-default'>
                            {firstTarget[1].champ}
                        </div>
                    </>
                ) : (
                    <div className='text-center text-sm text-lckBlack/50'>
                        Not started
                    </div>
                )}
            </div>
        </div>
    );
};

export default Target;
