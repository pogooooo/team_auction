import CompletedTeams from '../CompletedTeams'

const AuctionSidebarLeft = ({ completedTeams }) => {
    return (
        <aside className="w-[50rem] flex flex-col border-r bg-white">
            <CompletedTeams teams={completedTeams} />
        </aside>
    )
}

export default AuctionSidebarLeft
