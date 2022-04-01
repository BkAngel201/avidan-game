import React, { useState, useRef, useEffect, useCallback } from "react";




function StartGameComponent({ setStartGame, startGame }) {
    const startRef = useRef()
    const [createRaffleInfo, setCreateRaffleInfo] = useState(null);


    useEffect(() => {
        startRef.current.style.display = 'flex'
    }, [])

    useEffect(() => {
        if (startGame) {
            startRef.current.classList.add('hide')
            setTimeout(() => {
                startRef.current.style.display = 'none'
            }, 900)
        }
    }, [startGame])

    const handleFileSelected = (e) => {
        let fileContent = e.target.files[0]
        var reader = new FileReader();

        reader.onload = function (event) {
            let str = event.target.result;
            let json = JSON.parse(str);

            setCreateRaffleInfo(json)
        }
        reader.readAsText(fileContent);

    }

    const saveAndStartGame = () => {
        localStorage.setItem("raffleCards", JSON.stringify(createRaffleInfo.CardsContestInfo))
        localStorage.setItem("raffleEmployees", JSON.stringify(createRaffleInfo.EmployeesContestInfo))
        setStartGame(true)
    }


    return (
        <div className="start-container" ref={startRef}>
            <div className="title">
                <div>Best of the Best F&I Managers Rafle</div>
                <div>2022</div>
            </div>
            <div className="middle">
                <img src="./img/logoRafle.png" />
            </div>
            <div className="button">
                <input type="file" onChange={handleFileSelected} accept=".json" />
                <button onClick={saveAndStartGame} disabled={!createRaffleInfo}>
                    Begin the Party
                </button>
            </div>
        </div>
    )
}

export default StartGameComponent;