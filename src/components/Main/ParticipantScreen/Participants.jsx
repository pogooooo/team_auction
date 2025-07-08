import {useState} from "react";
import { Link } from 'react-router-dom';


const Participants = (props) => {

    const [SelectedFilter, setSelectedFilter] = useState(['TOP', 'MID', 'JUG', 'ADC', 'SUP']);

    const noneSelected = 'cursor-pointer bg-lckWhite border-lckBlack border-[2px] rounded-md h-[30px] mr-[5px] text-center'
    const selected = 'cursor-pointer bg-lckBlack border-lckBlack text-lckWhite border-[2px] rounded-md h-[30px] mr-[5px] text-center'

    const toggleFilter = (filter) => {
        setSelectedFilter((prev) =>
            prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter]
        );

        console.log(SelectedFilter)
    };

    if (!props.participant) return null;

    const filteredParticipants = Object.entries(props.participant).filter(
        ([, info]) => {
            const lineFilters = SelectedFilter.filter(f => f !== 'NO_TEAM');
            const lineMatched = lineFilters.length === 0 || lineFilters.includes(info.line);
            const teamMatched = SelectedFilter.includes('NO_TEAM') ? info.team === null : true;

            return lineMatched && teamMatched;
        }
    );


    return(
        <div className='max-xl2:hidden relative w-[470px] h-[600px] border-2 border-lckBlack rounded-md p-[5px] text-lckBlack transform transition duration-150 ease-in-out hover:scale-[1.03]'>
            <div className='font-chaney text-xl cursor-default mb-[10px]'>participant</div>

            <div className='flex'>
                {['TOP', 'JUG', 'MID', 'ADC', 'SUP'].map((role) => (
                    <div key={role} className={`${SelectedFilter.includes(role) ? selected : noneSelected} w-[50px]`} onClick={() => toggleFilter(role)}>
                        {role}
                    </div>
                ))}
            </div>
            <div>
                <div className={`${SelectedFilter.includes('NO_TEAM') ? selected : noneSelected} mt-[5px] w-[100px]`} onClick={() => toggleFilter('NO_TEAM')}>
                    팀이 없는
                </div>
            </div>

            <hr className='border-lckBlack border-[1px] mt-[5px] mb-[10px]'/>

            {filteredParticipants.map(([name, info]) => (
                <div key={name} className='flex w-[100%] justify-center font-bold'>
                    <div className='overflow-x-auto whitespace-nowrap w-[137px] p-[3px] text-center border-b-[1px] border-r-[1px] border-lckBlack/50'>{name}</div>
                    <div className='w-[10%] p-[3px] text-center border-b-[1px] border-r-[1px] border-lckBlack/50'>{info.line}</div>
                    <div className='w-[22%] p-[3px] text-center border-b-[1px] border-r-[1px] border-lckBlack/50'>{info.tier}</div>
                    <div className='overflow-x-auto whitespace-nowrap w-[136px] p-[3px] text-center border-b-[1px] border-lckBlack/50'>{info.champ}</div>
                </div>
            ))}

            <Link to='/participant' className='text-lckWhite border-[2px] border-lckBlack text-center bg-lckBlack w-[50px] rounded-md p-[5px] cursor-pointer absolute right-[10px] bottom-[5px] active:bg-lckWhite active:text-lckBlack'>Edit</Link>

        </div>
    );
}

export default Participants;
