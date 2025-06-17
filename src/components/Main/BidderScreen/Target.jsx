

const Target = (props) => {
    return(
        <div className='font-sans font-bold mr-[10px]'>
            {/*title*/}
            <div className='font-chaney font-medium text-xl h-[25px] cursor-default'>target</div>

            <div style={{width: 'clamp(150px, 16vw, 300px)'}} className='h-[180px] border-lckBlack border-2 rounded-md p-[10px] flex flex-col justify-center min-w-[150px] min-h-[150px] max-w-[300px] max-h-[180px] transform transition duration-150 ease-in-out hover:scale-[1.03]'>
                {/*summoner name*/}
                <div className='text-lg mb-[5%] cursor-default'>
                    {Object.keys(props.list)[0]}
                </div>

                <hr className='border-lckBlack border-[1px]'/>

                {/*tier, line*/}
                <div className='text-sm mb-[2%] mt-[2%] cursor-default'>
                    {Object.keys(props.list.pogoo)[0]} | {props.list.pogoo.ADC.tier}
                </div>

                <hr className='border-lckBlack border-[1px]'/>

                {/*champ*/}
                <div className='text-sm mt-[2%] cursor-default'>
                    {props.list.pogoo.ADC.champ}
                </div>
            </div>
        </div>
    );
}

export default Target;
