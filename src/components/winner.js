import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




function Winner({ list, goToWinners, setGoToWinners, lastWinners }) {
    const winnerRef = useRef()
    const firstRef = useRef()
    const secondRef = useRef()
    const thirdRef = useRef()
    const topListRef = useRef()
    const buttonContinue = useRef()
    const [topWinners, setTopWinners] = useState([])
    const [trumpetShort, setTrumpetShort] = useState(null)

    useEffect(() => {
        setTrumpetShort(new Audio('./audio/trumpetWinner.mp3'))
    }, [])

    useEffect(() => {
        if (goToWinners) {

           
            
            setTopWinners([...list].filter((l, index) => (index > 2 & index < 18)))

            setTimeout(() => {
                winnerRef.current.style.display = 'block '
                setTimeout(() => {
                    trumpetShort.play().then(() => {
                        setTimeout(() => {
                            trumpetShort.pause()
                            trumpetShort.currentTime = 0
                        }, 7000)
                    })
                    winnerRef.current.firstChild.classList.remove('hide')
                    winnerRef.current.classList.remove('hide')
                    setTimeout(() => {
                        firstRef.current.firstChild.classList.add('container')
                        setTimeout(() => {
                            secondRef.current.firstChild.classList.add('container')
                            setTimeout(() => {
                                thirdRef.current.firstChild.classList.add('container')
                                setTimeout(() => {
                                    let listCount = 0
                                    let inUsers = setInterval(() => {
                                        topListRef.current.childNodes[listCount].classList.remove('hide')
                                        if (listCount == (topListRef.current.childNodes.length - 1)) {
                                            clearInterval(inUsers)
                                            setTimeout(() => {
                                                if (!lastWinners) {
                                                    buttonContinue.current.classList.remove('hide')
                                                }
                                            }, 500)
                                        }
                                        listCount++
                                    }, 100)

                                }, 500)
                            }, 100)
                        }, 100)
                    }, 100)
                }, 500)
            }, 100)
        } else {
            winnerRef.current.classList.add('hide')
            winnerRef.current.firstChild.classList.add('hide')
            firstRef.current.firstChild.classList.remove('container')
            secondRef.current.firstChild.classList.remove('container')
            thirdRef.current.firstChild.classList.remove('container')
            setTopWinners([])
            topListRef.current.childNodes.forEach(l => {
                l.classList.add('hide')
            })
            if (lastWinners) {
                buttonContinue.current.classList.add('hide')
            }
            setTimeout(() => {
                winnerRef.current.style = ''
            }, 900)
        }
    }, [goToWinners])

    let formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="winner-container hide" ref={winnerRef}>
            <div className="top-text hide">
                {
                    lastWinners ? 'Raffle Winners' : 'Positions until this moment of the Competition :P'
                }
            </div>
            <div className="top-positions">
                <div className="third-position" ref={thirdRef}>
                    <div className="">
                        <div className="money-amount"><span>$</span>{formatPrice(list[2].amount)}</div>
                        <div className="winner-name">{list[2].name.split(',')[1] + ' ' + list[2].name.split(',')[0]}</div>
                    </div>
                </div>
                <div className="first-position" ref={firstRef}>
                    <div className="">
                        <div className="money-amount"><span>$</span>{formatPrice(list[0].amount)}</div>
                        <div className="winner-name">{list[0].name.split(',')[1] + ' ' + list[0].name.split(',')[0]}</div>
                    </div>
                </div>
                <div className="second-position" ref={secondRef}>
                    <div className="">
                        <div className="money-amount"><span>$</span>{formatPrice(list[1].amount)}</div>
                        <div className="winner-name">{list[1].name.split(',')[1] + ' ' + list[1].name.split(',')[0]}</div>
                    </div>
                </div>
            </div>
            <div className="bottom-section">
                <div className="other-tops" ref={topListRef}>
                    {
                        topWinners.map((tW, index) => (
                            <div key={index} className="people hide">
                                <div className="container">
                                    <div className="name">{tW.name.split(',')[1] + ' ' + tW.name.split(',')[0]}</div>
                                    <div className="store">{tW.store}</div>
                                </div>
                                <div className="money"><span>$</span><div>{formatPrice(tW.amount)}</div></div>
                            </div>

                        ))
                    }
                </div>
                {
                    lastWinners ? '' : <button className="hide" onClick={() => { setGoToWinners(false) }} ref={buttonContinue}>Continue</button>
                }

            </div>
        </div>
    )
}

export default Winner;