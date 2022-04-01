import { render } from "react-dom";
import React, { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";
import shuffle from "lodash/shuffle";

import ListOpenEnvelopes from './components/listOpenEnvelopes'
import Carrousel from './components/carrousel'
import Winner from './components/winner'
import StartGameComponent from './components/startGameComponent'

function App() {
    const [players, setPlayers] = useState([])
    const [activePlayer, setActivePlayer] = useState(null)
    const [money, setMoney] = useState(null)
    const [page, setPage] = useState(null)
    const [goToWinners, setGoToWinners] = useState(null)
    const [lastWinners, setLastWinners] = useState(null)
    const [startGame, setStartGame] = useState(null)
    const [animateReorder, setAnimateReorder] = useState(false)


    let updateActiveUser = (value) => {
        setActivePlayer(value)
    }
    let updateMoney = (value) => {
        setMoney(value)
    }

    let winnerInfo = (id) => {
        return players.find(p => p.index == id)
    }

    useEffect(() => {
        setPlayers(JSON.parse(localStorage.getItem("raffleEmployees")))

    }, [startGame])

    return (
        <div className="app-container">
            <StartGameComponent setStartGame={setStartGame} startGame={startGame} />
            {startGame &&
                <>
                    <ListOpenEnvelopes animateReorder={animateReorder} setAnimateReorder={setAnimateReorder} list={players} activePlayer={activePlayer} updateActiveUser={updateActiveUser} money={money} setPlayers={setPlayers} goToWinners={goToWinners} page={page} startGame={startGame} />
                    <Carrousel setAnimateReorder={setAnimateReorder} activePlayer={activePlayer} list={players} updateActiveUser={updateActiveUser} updateMoney={updateMoney} money={money} page={page} setPage={setPage} winnerInfo={winnerInfo} setGoToWinners={setGoToWinners} goToWinners={goToWinners} setLastWinners={setLastWinners} lastWinners={lastWinners} startGame={startGame} />
                    <Winner list={players} goToWinners={goToWinners} setGoToWinners={setGoToWinners} lastWinners={lastWinners} />
                </>
            }
        </div>
    );
}



export default App
