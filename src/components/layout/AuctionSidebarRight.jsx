import ChatSection from '../ChatSection'
import RemainingItems from '../RemainingItems'
import UserListSection from '../UserListSection'

const AuctionSidebarRight = ({ users, items, activeTab, setActiveTab }) => {
    return (
        <div className="h-screen flex flex-col w-[40rem] border-l">
            <div className="p-4">
                <UserListSection users={users} />
            </div>
            <div className="flex border-t bg-white text-sm font-medium text-gray-600">
                <button
                    className={`flex-1 py-2 ${activeTab === 'chat' ? 'bg-gray-200 font-semibold' : ''}`}
                    onClick={() => setActiveTab('chat')}
                >
                    채팅방
                </button>
                <button
                    className={`flex-1 py-2 ${activeTab === 'remaining' ? 'bg-gray-200 font-semibold' : ''}`}
                    onClick={() => setActiveTab('remaining')}
                >
                    남은 팀원
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'chat' ? <ChatSection /> : <RemainingItems items={items} />}
            </div>
        </div>
    )
}

export default AuctionSidebarRight
