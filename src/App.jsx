'use client'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuctionMain from './components/AuctionMain.jsx'
import ParticipantEdit from './components/ParticipantEdit.jsx'
import LoadingScreen from './components/Other/LoadingScreen.jsx'
import ErrorScreen from './components/Other/ErrorScreen.jsx'
import Api from './components/Other/Api.jsx'

import {useEffect, useState} from "react";

const App = () => {

    const [webSocket, setWebSocket] = useState(null);
    const [participant, setParticipant] = useState({})
    const [leader, setLeader] = useState({})
    const [target, setTarget] = useState({})
    const [bidder, setBidder] = useState({})
    const [order, setOrder] = useState({})
    const [user, setUser] = useState({})

    const [Loading, setLoading] = useState(true)
    const [Error, setError] = useState(false)

    const getParticipant = async () => {
        const response = await Api.get('/game/participant')
        setParticipant(Object.values(response)[0])
    }

    const getLeader = async () => {
        const response = await Api.get('/game/participant/leader')
        setLeader(Object.values(response)[0])
    }

    const getTarget = async () => {
        const response = await Api.get('/game/bid/target')
        setTarget(Object.values(response)[0])
    }

    const getBidder = async () => {
        const response = await Api.get('/game/bid/bidder')
        setBidder(Object.values(response)[0])
    }

    const getOrder = async () => {
        const response = await Api.get('/game/bid/state')
        setOrder(Object.values(response)[0])
    }

    const getUser = async () => {
        const response = await Api.get('/users')
        setUser(Object.values(response)[0])
    }

    const getData = async () => {
        try{
            setLoading(true)

            getParticipant()
            getLeader()
            getTarget()
            getBidder()
            getOrder()
            getUser()

        }
        catch (err){
            setError(true)
            console.log(err)
        }
        finally {
            setLoading(false)
        }

    }

    //target 순서 지정
    const setTargetData = async () => {
        try{
            await Api.post('/game/bid/target');
        }
        catch (err){
            setError(true)
            console.log(err)
        }
    }

    useEffect(() => {
        const socket = new WebSocket('https://team-auction-api.onrender.com')

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

            if(data === 'BIDDER_UPDATE') {
                getBidder()
                return
            }

            if(data === 'ORDER_UPDATE') {
                getOrder()
                return
            }

            if(data === 'USER_UPDATE') {
                getUser()
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
            <div className="bg-lckWhite w-screen h-screen flex items-center justify-center">
                {Loading ? (
                    <LoadingScreen />
                ) : Error ? (
                    <ErrorScreen />
                ) : (
                    <Routes>
                        <Route
                            path="/"
                            element={<AuctionMain
                                setLoading={setLoading}
                                setError={setError}
                                participant={participant}
                                bidder={bidder}
                                target={target}
                                leader={leader}
                                order={order}
                                setTarget={setTargetData}/>
                            }
                        />
                        <Route
                            path="/participant"
                            element={<ParticipantEdit
                                participant={participant}
                                user = {user}
                                leader = {leader}
                            />}
                        />
                    </Routes>
                )}
            </div>
        </BrowserRouter>
    );

}

export default App
