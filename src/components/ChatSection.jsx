const ChatSection = () => {
    return (
        <section className="h-2/3 flex flex-col justify-between p-4">
            <div className="overflow-y-auto mb-2 space-y-1">
                <div className="text-sm">홍길동: 안녕하세요!</div>
                <div className="text-sm">이순신: 반갑습니다</div>
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="채팅 입력..."
                    className="border flex-1 px-4 py-2 rounded-lg"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                    전송
                </button>
            </div>
        </section>
    )
}

export default ChatSection
