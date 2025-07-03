const Team = (props) => {
    if (!props.leader || !props.participant) {
        return null;
    }

    return (
        <div className='overflow-y-auto w-[700px] h-[600px] border-[2px] border-lckBlack rounded-md text-lckBlack flex flex-col items-center transform transition duration-150 ease-in-out hover:scale-[1.03]'>
            {Object.entries(props.leader).map(([nickname, point]) => (
                <div key={nickname} className='w-[90%] mt-[10px] border-[1px] border-lckBlack rounded-md p-[10px]'>
                    <div className='font-chaney text-lg mb-[10px]'>
                        {nickname}'s team
                    </div>
                    <div className='flex justify-between'>
                        {['TOP', 'JUG', 'MID', 'ADC', 'SUP'].map((pos) => {
                            const playerEntry = Object.entries(props.participant).find(
                                ([, pinfo]) => pinfo.team === nickname && pinfo.line === pos
                            );

                            return (
                                <div key={pos} className="w-[19%] min-h-[120px]">
                                    <div className="text-lg font-bold text-center">{pos}</div>

                                    {playerEntry ? (
                                        <div className="border-[1px] border-lckBlack rounded-md min-h-[90px] text-sm font-bold flex flex-col justify-between p-[5px]">
                                            <div>{playerEntry[0]}</div>
                                            <hr className="border-lckBlack" />
                                            <div>{playerEntry[1].tier}</div>
                                            <hr className="border-lckBlack" />
                                            <div>{playerEntry[1].champ}</div>
                                        </div>
                                    ) : (
                                        <div className="border-[1px] border-lckBlack rounded-md h-[90px]"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Team;
