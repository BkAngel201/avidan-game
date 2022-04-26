import React, { useState, useRef, useEffect, useCallback } from "react";




function StartGameComponent({ setStartGame, startGame }) {
    const startRef = useRef()
    const fileRef = useRef()
    const [createRaffleInfo, setCreateRaffleInfo] = useState(null);
    const [newGame, setNewGame] = useState(true);


    useEffect(() => {
        startRef.current.style.display = 'flex'
        if (localStorage.getItem("raffleCards") && localStorage.getItem("raffleEmployees")) {
            setNewGame(false)
            setCreateRaffleInfo([])
        }
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

            if (json.CardsContestInfo && json.EmployeesContestInfo) {
                setCreateRaffleInfo(json)
                setNewGame(true)
            }
        }
        reader.readAsText(fileContent);

    }

    const saveAndStartGame = () => {

        if (newGame) {
            localStorage.setItem("raffleCards", JSON.stringify(createRaffleInfo.CardsContestInfo))
            localStorage.setItem("raffleEmployees", JSON.stringify(createRaffleInfo.EmployeesContestInfo))
            localStorage.setItem('rafflePage', 1)
        }
        setTimeout(() => {
            setStartGame(true)
        }, 1500)
    }
    const selectFile = () => {
        fileRef.current.click()
        console.log('asd')
    }


    return (
        <div className="start-container" ref={startRef}>
            <div className="title">
                <div>Best of the Best</div>
                <div>F&I Manager's Cash Bash 2022</div>
            </div>
            <div className="middle">
                <img src="./img/logoRafle.png" onClick={selectFile}/>
            </div>
            <input type="file" onChange={handleFileSelected} accept=".json" ref={fileRef} style={{display: 'none'}}/>
            <div className="button">

                <button onClick={saveAndStartGame} disabled={!createRaffleInfo}>
                    Show Results
                </button>
            </div>
        </div>
    )
}

export default StartGameComponent;