import Api from '../../Other/Api.jsx'
import {useState} from "react";


const AddUserModal = (props) => {
    const [nickname, setNickname] = useState('');
    const [line, setLine] = useState('');
    const [tier, setTier] = useState('');
    const [champ, setChamp] = useState('');

    const addUser = async () => {
        const response = await Api.post('/users/add',
            {nickname:nickname, line:line, tier:tier, champ:champ});
        console.log('Successfully added the user : ', response.data);

        props.setModal(false)
    }

    return(
        <div className='font-sans text-lckBlack w-[100vw] h-[100vh] bg-lckBlack/50 fixed top-0 left-0 flex items-center justify-center'>
            <div className='w-[30vw] h-[30vh] bg-lckWhite rounded-md flex flex-col items-center justify-center '>
                <div className='flex'>
                    <div className='border-lckBlack border-[1px] border-r-0 border-b-0 rounded-tl-md w-[150px] text-center'>닉네임</div>
                    <div className='border-lckBlack border-[1px] border-r-0 border-b-0 w-[50px] text-center'>라인</div>
                    <div className='border-lckBlack border-[1px] border-r-0 border-b-0 w-[100px] text-center'>티어</div>
                    <div className='border-lckBlack border-[1px] border-b-0 rounded-tr-md w-[200px] text-center'>챔프</div>
                </div>

                <div className='flex'>
                    <input placeholder='nickname'
                           onChange={(e) => setNickname(e.target.value)}
                           className='outline-0 bg-lckWhite rounded-bl-md text-center border-r-0 border-[1px] border-lckBlack w-[150px]'/>
                    <input placeholder='line'
                           onChange={(e) => setLine(e.target.value)}
                           className='outline-0 bg-lckWhite text-center border-r-0 border-[1px] border-lckBlack w-[50px]'/>
                    <input placeholder='tier'
                           onChange={(e) => setTier(e.target.value)}
                           className='outline-0 bg-lckWhite text-center border-r-0 border-[1px] border-lckBlack w-[100px]'/>
                    <input placeholder='champ'
                           onChange={(e) => setChamp(e.target.value)}
                           className='outline-0 bg-lckWhite rounded-br-md text-center border-[1px] border-lckBlack w-[200px]'/>
                </div>

                <div className='flex w-[50%] justify-between mt-[30px]'>
                    <div onClick={addUser}
                         className='cursor-pointer w-[100px] h-[50px] flex items-center justify-center rounded-md font-bold text-lckWhite bg-lckBlack'>
                        확정
                    </div>
                    <div onClick={() => props.setModal(false)}
                         className='cursor-pointer w-[100px] h-[50px] flex items-center justify-center rounded-md font-bold text-lckWhite bg-lckBlack'>
                        취소
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUserModal
