

const ParticipantTableScreen = (props) => {

    const lineUsers = ['TOP', 'JUG', 'MID', 'ADC', 'SUP'].map(lineName =>
        Object.entries(props.participant)
            .filter(([username, info]) => info.line === lineName)
            .map(([username]) => username)
    );

    return(
        <div className='border-lckBlack border-[2px] p-[5px] cursor-default border-b-0 rounded-t-md w-[500px] h-[85vh]'>
            <div className='font-chaney text-lg'>participant table</div>

            <div className='mt-[20px] h-[90%] overflow-y-auto'>
                <div className='flex'>
                    {['TOP', 'JUG', 'MID', 'ADC', 'SUP'].map((line, idx, arr) => (
                        <div className={`border-lckBlack border w-[20%] h-[30px] flex items-center justify-center ${idx === arr.length - 1 ? 'border-r' : 'border-r-0'} ${idx === 0 ? 'rounded-tl-md' : ''} ${idx === arr.length - 1 ? 'rounded-tr-md' : ''}`}>
                            {line}
                        </div>
                    ))}
                </div>
                <div>
                    {Array.from({length: Math.max(...lineUsers.map(arr => arr.length))}).map((_, rowIdx) => (
                        <div key={rowIdx} className="flex">
                            {lineUsers.map((userList, colIdx) => (
                                <div key={colIdx} className='overflow-x-auto whitespace-nowrap flex items-center p-[5px] h-[45px] w-[20%] border-l-[1px] border-b-[1px] border-lckBlack/50'>
                                    {userList[rowIdx] || ""}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ParticipantTableScreen
