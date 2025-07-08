
const WarningScreen = (props) => {

    return(
        <div className={`absolute font-bold text-sm p-[10px] text-lckWhite right-[10px] top-[50px] bg-lckBlack rounded-md`}>
            ❗WARNING : {props.warning}
        </div>
    )
}

export default WarningScreen
