'use client'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auction_Main from './components/Auction_Main.jsx'
import ParticipantEdit from './components/ParticipantEdit.jsx'
import LoadingScreen from './components/Other/LoadingScreen.jsx'
import ErrorScreen from './components/Other/ErrorScreen.jsx'

import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {

    const [webSocket, setWebSocket] = useState(null);
    const [participant, setParticipant] = useState({})
    const [leader, setLeader] = useState({})
    const [target, setTarget] = useState({})
    const [bidder, setBidder] = useState({})

    const [Loading, setLoading] = useState(true)
    const [Error, setError] = useState(false)

    const getParticipant = async () => {
        const response = await axios.get('http://localhost:3000/game/participant')
        setParticipant(Object.values(response)[0])
    }

    const getLeader = async () => {
        const response = await axios.get('http://localhost:3000/game/participant/leader')
        setLeader(Object.values(response)[0])
    }

    const getTarget = async () => {
        const response = await axios.get('http://localhost:3000/game/bid/target')
        setTarget(Object.values(response)[0])
    }

    const getBidder = async () => {
        const response = await axios.get('http://localhost:3000/game/bid/bidder')
        setBidder(Object.values(response)[0])
    }

    const getData = async () => {
        try{
            setLoading(true)
            setError(false)

            getParticipant()
            getLeader()
            getTarget()
            getBidder()

            // const participantRes = await axios.get('http://localhost:3000/game/participant')
            // const leaderRes = await axios.get('http://localhost:3000/game/participant/leader')
            // const targetRes = await axios.get('http://localhost:3000/game/bid/target')
            // const bidderRes = await axios.get('http://localhost:3000/game/bid/bidder')
            //
            // // 상태에 저장
            // setParticipant(Object.values(participantRes)[0]);
            // setLeader(Object.values(leaderRes)[0])
            // setTarget(Object.values(targetRes)[0])
            // setBidder(Object.values(bidderRes)[0])

        }
        catch (err){
            setError(true)
            console.log(err)
        }
        finally {
            setLoading(false)
        }

    }

    //target 순서 지정 명령
    const setTargetData = async () => {
        try{
            setError(false)
            await axios.post('http://localhost:3000/game/bid/target');
        }
        catch (err){
            setError(true)
            console.log(err)
        }
    }

    useEffect(() => {
        const socket = new WebSocket('http://localhost:3000')

        socket.onopen = () => {
            console.log('webSocket connected')
        }

        socket.onmessage = (event) => {
            console.log('Received message : ', event.data)

            const data = Object.entries(JSON.parse(event.data))[0][1]
            console.log(data)

            if(data === 'DATA_UPDATE') {
                getData()
                return
            }

            if(data === 'PARTICIPANT_UPDATE') {
                getParticipant()
                return
            }

            if(data === 'LEADER_UPDATE') {
                getLeader()
                return
            }

            if(data === 'TARGET_UPDATE') {
                getTarget()
                return
            }
        }

        socket.onclose = () => {
            console.log('webSocket disconnected')
        }

        setWebSocket(socket)

        getData()

        return () => {
            socket.close();
        };
    }, [])

    return (
        <BrowserRouter>
            <div className="w-screen h-screen flex items-center justify-center">
                {Loading ? (
                    <LoadingScreen />
                ) : Error ? (
                    <ErrorScreen />
                ) : (
                    <Routes>
                        <Route
                            path="/"
                            element={<Auction_Main
                                setLoading={setLoading}
                                setError={setError}
                                participant={participant}
                                bidder={bidder}
                                target={target}
                                leader={leader}
                                setTarget={setTargetData}/>
                            }
                        />
                        <Route path="/participant" element={<ParticipantEdit />} />
                    </Routes>
                )}
            </div>
        </BrowserRouter>
    );

}

export default App
