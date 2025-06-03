'use client'

import { useState } from 'react'
import AuctionSidebarLeft from './AuctionSidebarLeft'
import AuctionSidebarRight from './AuctionSidebarRight'
import AuctionMain from './AuctionMain'
import { exampleAuctionItems } from '../../data/exampleAuctionItems'

const exampleUsers = [
    { name: '홍길동', points: 1000, team: 1 },
    { name: '이순신', points: 950, team: 2 },
    { name: '강감찬', points: 880, team: 3 },
]

const exampleCompleted = {
    teams: [
        [exampleAuctionItems[2], exampleAuctionItems[3]],
        [exampleAuctionItems[4]],
        [],
        []
    ],
    failed: [exampleAuctionItems[0], exampleAuctionItems[1]]
}

const AuctionApp = () => {
    const [activeTab, setActiveTab] = useState('chat')
    const [highestBid, setHighestBid] = useState({ name: '', amount: 0 })
    const [bidLogs, setBidLogs] = useState([])

    const currentUser = {
        name: '홍길동',
        points: 1000
    }

    const handleNewBid = (name, amount) => {
        if (amount > highestBid.amount) {
            setHighestBid({ name, amount })
            setBidLogs(prev => [{ name, amount }, ...prev.slice(0, 4)])
        }
    }

    return (
        <div className="w-screen h-screen flex">
            <AuctionSidebarLeft completedTeams={exampleCompleted.teams} />
            <AuctionMain
                currentItem={exampleAuctionItems[5]}
                onNewBid={handleNewBid}
                highestBid={highestBid}
                bidLogs={bidLogs}
                currentUser={currentUser}
            />
            <AuctionSidebarRight
                users={exampleUsers}
                items={exampleAuctionItems.slice(6)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>
    )
}

export default AuctionApp
