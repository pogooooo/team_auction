import { useState } from 'react'
import SimpleAuctionItemCard from './SimpleAuctionItemCard'

const POSITIONS = ['TOP', 'JUG', 'MID', 'ADC', 'SUP']

const CompletedTeams = ({ teams = [] }) => {
    const [teamStates, setTeamStates] = useState(
        teams.map(team => {
            const lineup = Array(5).fill(null)
            team.forEach(member => {
                const preferred = POSITIONS.find(pos => member[pos] && member[pos] !== 'X' && member[pos] !== '')
                if (preferred) {
                    const idx = POSITIONS.indexOf(preferred)
                    lineup[idx] = member
                }
            })
            return lineup
        })
    )

    const handlePositionChange = (teamIdx, fromIdx, toIdx) => {
        setTeamStates(prev => {
            const updated = [...prev]
            const team = [...updated[teamIdx]]
            const existing = team[toIdx]
            team[toIdx] = team[fromIdx]
            team[fromIdx] = existing
            updated[teamIdx] = team
            return updated
        })
    }

    return (
        <section className="flex flex-col h-screen ">
            <h2 className="flex-1 text-2xl content-center text-center font-bold mb-4"></h2>
            <div className="flex-1 grid grid-rows-4 gap-2 border-t-2">
                {teamStates.map((lineup, teamIdx) => (
                    <div key={teamIdx} className="bg-white shadow p-4 overflow-hidden flex flex-col">
                        <h3 className="text-lg font-semibold mb-2">팀 {teamIdx + 1}</h3>
                        <div className="grid grid-cols-5 gap-2 flex-1">
                            {lineup.map((player, posIdx) => (
                                <div key={posIdx} className="flex flex-col items-center">
                                    <span className="text-xs font-medium mb-1 text-gray-500">{POSITIONS[posIdx]}</span>
                                    {player ? (
                                        <SimpleAuctionItemCard
                                            item={player}
                                            onRoleChange={(newRole) => {
                                                const newIdx = POSITIONS.indexOf(newRole)
                                                if (newIdx !== -1 && newIdx !== posIdx) {
                                                    handlePositionChange(teamIdx, posIdx, newIdx)
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full min-h-[80px] max-h-[80px] border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-sm text-gray-400">
                                            빈 슬롯
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default CompletedTeams
