import {useState} from "react";
import Api from '../../Other/Api.jsx'

import AddUserModal from "./AddUserModal";


const UserListScreen = (props) => {
    const [SelectedFilter, setSelectedFilter] = useState(['TOP', 'MID', 'JUG', 'ADC', 'SUP']);
    const [openModal, setOpenModal] = useState(false);
    const [deletePopup, setDeletePopup] = useState({
        visible: false,
        x: 0,
        y: 0,
        targetUsername: null,
        targetLine: null,
    });
    const [editingChamps, setEditingChamps] = useState({});

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
    const filteredUser = Object.entries(props.user).filter(([username, lines]) => {
        // 1. 라인 조건
        const selectedLines = SelectedFilter.filter(f =>
            ['TOP', 'JUG', 'MID', 'ADC', 'SUP'].includes(f)
        );

        const lineMatched =
            selectedLines.length === 0 ||
            Object.keys(lines).some(line => selectedLines.includes(line));

        const participantSelected = SelectedFilter.includes('PARTICIPANT');
        const notParticipantSelected = SelectedFilter.includes('NOT_PARTICIPANT');
        const isParticipant = Object.prototype.hasOwnProperty.call(props.participant, username);

        let participantMatched = true;
        if (participantSelected && !notParticipantSelected) {
            participantMatched = isParticipant;
        } else if (!participantSelected && notParticipantSelected) {
            participantMatched = !isParticipant;
        } else if (!participantSelected && !notParticipantSelected) {
            participantMatched = true;
        } else if (participantSelected && notParticipantSelected) {
            participantMatched = true; // 둘 다 선택되면 조건 해제
        }

        return lineMatched && participantMatched;
    })

    // 참가자 추가
    const addParticipant = async (nickname) => {
        try {
            const response = await Api.post('/game/participant/add',
                {nickname: nickname})
            console.log('successfully add participant : ', response.data)
        }
        catch (error) {
            console.error('failed add participant : ', error.message)
        }
    }

    // 우클릭 이벤트
    const handleTierContextMenu = (event, username, line) => {
        event.preventDefault(); // 기본 우클릭 메뉴 방지

        setDeletePopup({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            targetUsername: username,
            targetLine: line,
        });
    };

    const handleClickOutside = () => {
        if (deletePopup.visible) {
            setDeletePopup({ ...deletePopup, visible: false });
        }
    };

    const handleDelete = async () => {
        const nickname = deletePopup.targetUsername
        const line = deletePopup.targetLine

        const leaderData = props.leader[nickname]
        console.log(leaderData)
        if (leaderData) {
            const leaderDelete = await Api.put('/game/participant/edit/unleader', {
                nickname:nickname
            });
            console.log('delete leader : ', leaderDelete.data);
        }

        //유저 삭제
        const userDelete = await Api.delete('/users/delete',
            {data: {nickname, line}})
        console.log('delete user : ', userDelete.data)

        //참가자 존재 확인, 삭제
        const gameData = props.participant[nickname];

        if (gameData) {
            const participantDelete = await Api.delete('/game/participant/delete', {data: {nickname}})
            console.log('delete participant : ', participantDelete.data)
        }
    }

    // 챔피언 수정
    const updateChamp = async (nickname, line, champ) => {
        const response = await Api.put('/users/update/champ', {
            nickname,
            line,
            champ,
        });
        console.log('챔피언 업데이트 성공:', response.data);

        const participantData = props.participant[nickname];
        if (participantData && participantData.line === line) {
            const updateParticipant = await Api.put('/game/participant/edit/line', {
                nickname,
                line,
            });
            console.log('참가자 챔피언 동기화 성공:', updateParticipant.data);
        }
    }

    return(
        <div onClick={handleClickOutside}
             className='border-lckBlack text-lckBlack border-[2px] border-b-[0px] p-[5px] rounded-t-md w-[49%] h-[85vh] h-max-[85vh]'>
            <div className='font-chaney text-lg cursor-default'>user list</div>

            {/*categories*/}
            <div>
                <div className='flex mt-[10px]'>
                    {['TOP', 'JUG', 'MID', 'ADC', 'SUP'].map((pos) => (
                        <div key={pos} className={`${SelectedFilter.includes(pos) ? selected : noneSelected} w-[80px]`}
                             onClick={() => toggleFilter(pos)}>{pos}</div>
                    ))}
                </div>
                <div className='flex mt-[5px]'>
                    {['PARTICIPANT', 'NOT_PARTICIPANT'].map(state => (
                        <div key={state}
                             className={`${SelectedFilter.includes(state) ? selected : noneSelected} w-[120px]`}
                             onClick={() => toggleFilter(state)}>
                            {state === 'PARTICIPANT' ? '참가한' : '참가하지 않은'}
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-[100%] max-h-[calc(85vh-150px)] overflow-y-auto mt-[30px]'>
                {/*list title*/}
                <div className='flex'>
                    <div className='p-[5px] border-lckBlack border-[1px] rounded-tl-md w-[35%] flex items-center justify-center'>닉네임</div>
                    <div className='flex w-[100%]'>
                        <div className='p-[5px] border-lckBlack border-l-0 border-[1px] w-[10%] flex items-center justify-center'>라인</div>
                        <div className='p-[5px] border-lckBlack border-[1px] border-l-0 w-[25%] flex items-center justify-center'>티어</div>
                        <div className='p-[5px] border-lckBlack border-[1px] border-l-0 rounded-tr-md w-[65%] flex items-center justify-center'>주 챔피언</div>
                    </div>
                </div>

                {/*user list*/}
                {filteredUser.map(([username, lines], index) => (
                    <div key={username} className={`flex w-[100%] ${index % 2 === 0 ? 'bg-lckWhite' : 'bg-lckBlack/10'}`}>
                        {/*user name*/}
                        <div onClick={() => addParticipant(username)}
                             title='참가하기 위해 클릭하세요'
                             className='p-[5px] w-[35%] flex items-center justify-center cursor-pointer border-lckBlack/50 border-r-[1px] border-b-[1px]'>
                            {username}
                        </div>

                        {/*user info*/}
                        <div className='w-[100%] h-max-[100%] overflow-y-auto'>
                            {Object.entries(lines).map(([line, info]) => (
                                <div onContextMenu={(e) => handleTierContextMenu(e, username, line)} key={line} className='flex w-[100%]'>
                                    <div className='p-[5px] cursor-default w-[10%] border-r-[1px] border-b-[1px] border-lckBlack/50 flex items-center justify-center'>{line}</div>
                                    <div className='p-[5px] w-[25%] border-r-[1px] border-b-[1px] border-lckBlack/50 flex items-center justify-center'>{info.tier}</div>
                                    <div className='p-[5px] w-[65%] border-b-[1px] border-lckBlack/50 flex items-center justify-center'>
                                        <input onChange={(e) => {setEditingChamps((prev) => ({...prev, [`${username}_${line}`]: e.target.value, }));}}
                                               value={editingChamps[`${username}_${line}`] !== undefined  ? editingChamps[`${username}_${line}`] : info.champ}
                                               onBlur={() => {
                                                   const champToUpdate = editingChamps[`${username}_${line}`] !== undefined
                                                       ? editingChamps[`${username}_${line}`]
                                                       : info.champ;

                                                   updateChamp(username, line, champToUpdate);
                                                   setEditingChamps((prev) => {
                                                       const newState = { ...prev };
                                                       delete newState[`${username}_${line}`];
                                                       return newState;
                                                   });
                                               }}
                                               className={`bg-opacity-0 w-[100%] outline-0 text-center bg-lckWhite`}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/*add user button*/}
                <div onClick={() => setOpenModal(true)}
                     className='w-[100%] mt-[-1px] cursor-pointer rounded-b-md border-[1px] border-lckBlack font-bold text-center'>
                    +
                </div>
            </div>

            {deletePopup.visible && (
                <div style={{position: "fixed", top: deletePopup.y, left: deletePopup.x, backgroundColor: "rgba(28,25,43,0.8)", color: '#E2E4F2', padding: "2px 10px", borderRadius: "5px", cursor: "pointer", zIndex: 1, userSelect: "none",}}
                    onClick={handleDelete}>
                    삭제
                </div>
            )}

            {openModal && (
                <AddUserModal setModal={setOpenModal} />
            )}
        </div>
    )
}

export default UserListScreen
