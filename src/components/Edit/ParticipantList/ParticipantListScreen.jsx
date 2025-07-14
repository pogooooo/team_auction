import Api from '../../Other/Api.jsx'
import {useState} from "react";


const ParticipantListScreen = (props) => {
    const [deletePopup, setDeletePopup] = useState({
        visible: false,
        x: 0,
        y: 0,
        targetNickname: null,
    });

    const filteredParticipants = Object.entries(props.user).filter(([username]) =>
        Object.prototype.hasOwnProperty.call(props.participant, username)
    );

    const updateParticipantLine = async (nickname, line) => {
        const response = await Api.put('/game/participant/edit/line', {
            nickname,
            line,
        });
        console.log('참가 라인 업데이트 성공:', response.data);
    }

    const toggleLeader = async (nickname, checked) => {
        if (checked) {
            const res = await Api.put('/game/participant/edit/leader', { nickname });
            console.log(`리더 설정 성공:`, res.data);
        } else {
            const res = await Api.put('/game/participant/edit/unleader', {nickname});
            console.log(`리더 해제 성공:`, res.data);
        }
    }

    const handleContextMenu = (event, nickname) => {
        event.preventDefault();
        setDeletePopup({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            targetNickname: nickname,
        });
    };

    const handleClickOutside = () => {
        if (deletePopup.visible) {
            setDeletePopup({ ...deletePopup, visible: false });
        }
    };

    const handleRemoveParticipant = async () => {
        const nickname = deletePopup.targetNickname;

        const leaderRes = await Api.put('/game/participant/edit/unleader', {
            nickname: nickname
        });
        console.log('리더 해제 성공:', leaderRes.data);

        const response = await Api.delete('/game/participant/delete', {
            data: { nickname }
        });
        console.log('참가 취소 성공:', response.data);
        setDeletePopup({ ...deletePopup, visible: false });
    };

    return(
        <div onClick={handleClickOutside}
             className='text-lckBlack p-[5px] border-lckBlack border-[2px] border-b-[0px] rounded-t-md w-[580px] h-[85vh]'>
            <div className='flex justify-between'>
                <div className='font-chaney text-lg cursor-default'>participant list</div>
                <div className='text-lckBlack/70 mt-[10px]'>참가자 : {Object.keys(props.participant).length} | 팀장 : {Object.values(props.participant).filter((p) => p.leader === 1).length}</div>
            </div>

            <div className="w-[100%] h-[90%] mt-[20px] overflow-y-auto flex flex-col">
                {/* list title */}
                <div className="flex">
                    <div className="p-[5px] border-lckBlack border-[1px] rounded-tl-md w-[35%] flex items-center justify-center">
                        닉네임
                    </div>
                    <div className="flex w-[50%]">
                        <div className="p-[5px] w-[40%] border-lckBlack border-l-0 border-[1px] flex items-center justify-center">
                            라인
                        </div>
                        <div className="p-[5px] w-[30%] border-lckBlack border-l-0 border-[1px] flex items-center justify-center">
                            티어
                        </div>
                        <div className="p-[5px] w-[30%] border-lckBlack border-l-0 border-[1px] flex items-center justify-center">
                            참가 라인
                        </div>
                    </div>
                    <div className="p-[5px] w-[15%] rounded-tr-md border-lckBlack border-l-0 border-[1px] flex items-center justify-center">
                        팀장
                    </div>
                </div>

                {/* participant list */}
                {filteredParticipants.map(([username, lines], index) => (
                    <div key={username}
                         onContextMenu={(e) => handleContextMenu(e, username)}
                         className={`flex w-[100%] ${index % 2 === 0 ? 'bg-lckWhite' : 'bg-lckBlack/10'}`}>
                        {/*user name*/}
                        <div className='p-[5px] w-[35%] flex items-center justify-center cursor-default border-lckBlack/50 border-r-[1px] border-b-[1px]'>
                            {username}
                        </div>

                        {/*user info*/}
                        <div className='w-[50%] h-max-[100%] overflow-y-auto'>
                            {Object.entries(lines).map(([line, info]) => (
                                <div key={line} className='flex w-[100%]'>
                                    <div
                                        className='p-[5px] cursor-default w-[40%] border-r-[1px] border-b-[1px] border-lckBlack/50 flex items-center justify-center'>{line}</div>
                                    <div
                                        className='p-[5px] w-[30%] border-r-[1px] border-b-[1px] border-lckBlack/50 flex items-center justify-center'>{info.tier}</div>
                                    <label className="flex items-center justify-center cursor-pointer w-[30%] border-lckBlack/50 border-b-[1px] border-r-[1px]">
                                        <input
                                            type="radio"
                                            name={`line-${username}`}
                                            value={line}
                                            onChange={() => updateParticipantLine(username, line)}
                                            className="hidden peer"
                                            checked={props.participant[username]?.line === line}
                                        />
                                        <div className="w-5 h-5 rounded-full border-2 border-lckBlack/30 flex items-center justify-center peer-checked:border-lckBlack transition-all duration-100">
                                            <div
                                                className=" w-3 h-3 rounded-full bg-lckBlack opacity-0 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-100">
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <label className="flex items-center justify-center cursor-pointer w-[15%] border-lckBlack/50 border-r-[1px] border-b-[1px]">
                            <input
                                type="checkbox"
                                className="hidden peer"
                                checked={props.participant && props.participant[username]?.leader === 1}
                                onChange={(e) => toggleLeader(username, e.target.checked)}
                            />
                            <div className="w-5 h-5 border-2 border-lckBlack/30 rounded-sm flex items-center justify-center peer-checked:bg-lckBlack transition-all duration-100">
                                {/* 체크 아이콘 */}
                                <svg
                                    className="w-3 h-3 text-lckWhite opacity-0 peer-checked:opacity-100 transition-all duration-100"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                        </label>
                    </div>
                ))}
            </div>

            {deletePopup.visible && (
                <div
                    style={{
                        position: "fixed",
                        top: deletePopup.y,
                        left: deletePopup.x,
                        backgroundColor: "rgba(28,25,43,0.8)",
                        color: '#E2E4F2',
                        padding: "2px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        zIndex: 1,
                        userSelect: "none",
                    }}
                    onClick={handleRemoveParticipant}
                >
                    참가 취소
                </div>
            )}
        </div>
    )
}

export default ParticipantListScreen
