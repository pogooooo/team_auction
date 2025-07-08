import UserListScreen from './Edit/UserList/UserListScreen.jsx';
import ParticipantTableScreen from './Edit/ParticipantTable/ParticipantTableScreen.jsx';
import ParticipantListScreen from './Edit/ParticipantList/ParticipantListScreen.jsx';
import { Link } from 'react-router-dom';

const ParticipantEdit = (props) => {
    return(
        <div className='w-[1700px] flex justify-between absolute bottom-0 font-sans'>
            <UserListScreen
                participant={props.participant}
                user={props.user}
                leader={props.leader}
            />
            <ParticipantTableScreen
                participant={props.participant}
            />
            <ParticipantListScreen
                participant={props.participant}
                user={props.user}
            />
            {/*<div className='w-[49%] flex flex-col justify-between'>*/}
            {/*    <ParticipantTableScreen*/}
            {/*        participant={props.participant}*/}
            {/*    />*/}
            {/*    <ParticipantListScreen*/}
            {/*        participant={props.participant}*/}
            {/*        user={props.user}*/}
            {/*    />*/}
            {/*</div>*/}

            <Link to='/' className='active:bg-lckWhite active:text-lckBlack active:border-lckBlack active:border-[2px] fixed bottom-10 right-10 cursor-pointer text-xl font-bold bg-lckBlack text-lckWhite w-[120px] h-[50px] flex items-center justify-center rounded-md'>
                경매
            </Link>

        </div>
    )
}

export default ParticipantEdit
