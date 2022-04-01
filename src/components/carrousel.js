import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope as faEnvelopeColor, faBahai, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons'
import ReactCanvasConfetti from "react-canvas-confetti";

function Carrousel({ activePlayer, updateActiveUser, updateMoney, page, setPage, winnerInfo, setGoToWinners, setAnimateReorder, goToWinners, setLastWinners, lastWinners, startGame }) {
    const listRef = useRef()
    const dividerRef = useRef()
    const priceBackground = useRef()
    const priceAmount = useRef()
    const pageRef = useRef()
    const confettiCanvas = useRef()
    const [moneyReveal, setMoneyReveal] = useState(null)
    const [whoosh, setWhoosh] = useState(null)
    const [wheel, setWheel] = useState(null)
    const [explotion, setExplotion] = useState(null)
    const [explotion2, setExplotion2] = useState(null)
    const [roll, setRoll] = useState(null)
    const [tada, setTada] = useState(null)
    const [fuzz, setFuzz] = useState(null)
    let [envelopes, setEnvelopes] = useState(null)
    let [playing, setPlaying] = useState(null)
    let [stopOnNextEnvelope, setStopOnNextEnvelope] = useState(null)
    let [startEnvelopeAnimation, setStartEnvelopeAnimation] = useState(null)
    let [envelopesToShow, setEnvelopesToShow] = useState([])
    let [cardAnimated, setCardAnimated] = useState(0)
    let [pagesAmount, setPagesAmount] = useState([])
    let [perPages, setPerPages] = useState(25)

    //confetti
    const refAnimationInstance = useRef(null);

    const [intervalId, setIntervalId] = useState();

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
        setMoneyReveal(new Audio('./audio/money_reveal.mp3'))
        setWhoosh(new Audio('./audio/whoosh.mp3'))
        setWheel(new Audio('./audio/wheel.mp3'))
        setExplotion(new Audio('./audio/explotion.mp3'))
        setExplotion2(new Audio('./audio/explotion2.mp3'))
        setRoll(new Audio('./audio/roll.mp3'))
        setTada(new Audio('./audio/tada.mp3'))
        setFuzz(new Audio('./audio/fuzz.mp3'))
    }, []);

    const nextTickAnimationSnow = useCallback(() => {
        if (refAnimationInstance.current) {
            refAnimationInstance.current(Snow(60, 0));
            refAnimationInstance.current(Snow(120, 1));
        }
    }, []);
    const nextTickAnimationPride = useCallback(() => {
        if (refAnimationInstance.current) {
            refAnimationInstance.current(Pride(60, 0));
            refAnimationInstance.current(Pride(120, 1));
        }
    }, []);

    const startAnimationSnow = useCallback(() => {
        if (!intervalId) {
            setIntervalId(setInterval(nextTickAnimationSnow, 16));
        }
    }, [nextTickAnimationSnow, intervalId]);

    const startAnimationPride = useCallback(() => {
        if (!intervalId) {
            setIntervalId(setInterval(nextTickAnimationPride, 16));
        }
    }, [nextTickAnimationPride, intervalId]);

    const stopAnimation = useCallback(() => {
        clearInterval(intervalId);
        setIntervalId(null);
        refAnimationInstance.current && refAnimationInstance.current.reset();
    }, [intervalId]);

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    }, [intervalId]);

    const makeShot = useCallback((particleRatio, opts, x, y) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { x: x, y: y },
                particleCount: Math.floor(200 * particleRatio)
            });
    }, []);

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function Snow(angle, originX) {
        return {
            particleCount: 1,
            startVelocity: 0,
            ticks: 200,
            gravity: 0.3,
            origin: {
                x: Math.random(),
                y: Math.random() * 0.999 - 0.2
            },
            colors: ["#69dff4"],
            shapes: ["circle"],
            scalar: randomInRange(0.4, 1)
        };
    }

    function Pride(angle, originX) {
        return {
            particleCount: 3,
            angle,
            spread: 55,
            origin: { x: originX },
            colors: ["#bb0000", "#ffffff"]
        };
    }

    const fire = useCallback((x, y, angle = 90) => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55,
            angle
        }, x, y);
        makeShot(0.28, {
            spread: 126,
            startVelocity: 55,
            angle
        }, x, y);
        makeShot(0.45, {
            spread: 76,
            startVelocity: 55,
            angle
        }, x, y);
        makeShot(0.15, {
            spread: 86,
            startVelocity: 55,
            angle
        }, x, y);

        makeShot(0.2, {
            spread: 60,
            angle
        }, x, y);

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
            angle
        }, x, y);

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
            angle
        }, x, y);

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45,
            angle
        }, x, y);
    }, [makeShot]);

    //-----------------------------




    let formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        if (playing == true && activePlayer == null) {
            if (envelopesToShow.some(e => e.count == false)) {
                setStartEnvelopeAnimation(true)
            } else {
                setAnimateReorder(true)
                listRef.current.childNodes.forEach((el, index) => {
                    let topOffset = Math.floor(Math.random() * (30 - (-30)) + (-30))
                    let bottomOffset = Math.floor(Math.random() * (30 - (-30)) + (-30))
                    listRef.current.childNodes[index].lastChild.style.top = 'calc(50% - 90px + (' + topOffset + 'px))';
                    listRef.current.childNodes[index].lastChild.style.left = 'calc(50% - 90px + (' + bottomOffset + 'px))';
                    setTimeout(() => {
                        listRef.current.childNodes[index].lastChild.style.top = 'calc(50% - 90px)';
                        listRef.current.childNodes[index].lastChild.style.left = 'calc(2500px)';

                    }, 1800)
                })
                if (page != pagesAmount.length) {

                    setTimeout(() => {
                        listRef.current.childNodes.forEach((el, index) => {
                            listRef.current.childNodes[index].lastChild.classList = 'envelope outside move-fast'
                            listRef.current.childNodes[index].lastChild.style.top = '-200px';
                            listRef.current.childNodes[index].lastChild.style.left = '50%';
                            setTimeout(() => {
                                listRef.current.childNodes[index].lastChild.classList = 'envelope outside'
                                listRef.current.childNodes[index].lastChild.firstChild.classList.remove('hide')
                            }, 100)
                        })
                        setTimeout(() => {
                            setPage(page + 1)
                        }, 500)
                    }, 3000)
                } else {
                    setTimeout(() => {
                        setGoToWinners(true)
                        setLastWinners(true)
                    }, 700)
                }
            }
        }
    }, [activePlayer])

    useEffect(() => {
        if (startGame) {
            let temp = []
            let min = Math.ceil(0);
            let max = Math.floor(76);
            
            setEnvelopes([...JSON.parse(localStorage.getItem("raffleCards"))])

            setPage(1)
            document.addEventListener('keyup', function handler(e) {
                e.stopPropagation()
                e.preventDefault()
                if (e.keyCode == 32) {
                    setPlaying(true)
                    this.removeEventListener('keyup', handler, false);
                }
            })
        }

    }, [startGame])

    useEffect(() => {
        if (page) {
            setEnvelopesToShow(envelopes.slice(((page - 1) * perPages), page * perPages))
        }
    }, [page])

    useEffect(() => {
        if (lastWinners) {
            confettiCanvas.current.firstChild.classList.remove('hide')

            setTimeout(() => {
                explotion2.play().then(() => {
                    setTimeout(() => {
                        explotion2.pause()
                        explotion2.currentTime = 0
                    }, 5000)
                })
                fire(0.5, 1, 90)
                fire(0.5, 0, 270)
                setTimeout(() => {
                    fire(0.3, 1, 90)
                    fire(0.7, 1, 90)
                    fire(0.3, 0, 270)
                    fire(0.7, 0, 270)
                    startAnimationSnow()
                    setTimeout(() => {
                        fire(0, 0.7, 360)
                        fire(1, 0.3, 180)
                        setTimeout(() => {
                            fire(0, 0.3, 360)
                            fire(1, 0.7, 180)
                        }, 1000)
                    }, 1000)
                }, 800)

            }, 1200)
        }
    }, [lastWinners])

    useEffect(() => {
        if (!envelopesToShow.some(e => e.count)) {

            envelopesToShow.forEach((e, index) => {
                setTimeout(() => {
                    pageRef.current.classList.remove('hide')
                    let position = listRef.current.childNodes[index].getBoundingClientRect()
                    listRef.current.childNodes[index].lastChild.style.top = (position.top - 90) + 'px';
                    listRef.current.childNodes[index].lastChild.style.left = (position.left - 40) + 'px';
                }, 50 * index)

            })
            if (playing) {
                setTimeout(() => {
                    setGoToWinners(true)
                    setPlaying(false)
                }, 2000)
            }

        }
    }, [envelopesToShow])

    useEffect(() => {
        setPagesAmount([...new Array(amountOfPages())])
    }, [envelopes])

    useEffect(() => {
        if (goToWinners == false) {
            setPlaying(true)
        }
    }, [goToWinners])

    useEffect(() => {
        if (playing == true) {
            setStartEnvelopeAnimation(true)
            document.addEventListener('keyup', function handler(e) {
                e.stopPropagation()
                e.preventDefault()
                if (e.keyCode == 32) {
                    if (!goToWinners && startGame) {
                        setPlaying(false)
                        this.removeEventListener('keyup', handler, false);
                    }
                }
            })
        } else {
            document.addEventListener('keyup', function handler(e) {
                e.stopPropagation()
                e.preventDefault()
                if (e.keyCode == 32) {
                    if (!goToWinners && startGame) {
                        setPlaying(true)
                        this.removeEventListener('keyup', handler, false);
                    }
                }
            })
        }
    }, [playing])


    useEffect(() => {
        if (startEnvelopeAnimation) {
            let activeEnvelopeIndex = envelopesToShow.findIndex(e => e.count == false)
            let activeEnvelope = envelopesToShow[activeEnvelopeIndex]
            console.log(activeEnvelope, activeEnvelopeIndex)

            priceBackground.current.style.display = 'flex'

            if (activeEnvelope.priceLevel == 1) {
                setTimeout(() => {
                    listRef.current.childNodes[activeEnvelopeIndex].lastChild.classList.add('envelope-grow')
                    setTimeout(() => {
                        roll.play().then(() => {
                            setTimeout(() => {
                                roll.pause()
                                roll.currentTime = 0
                            }, 3000)
                        })

                    }, 200)
                    priceBackground.current.classList.add('show')
                    priceBackground.current.firstChild.classList.add('blow')
                    priceBackground.current.lastChild.classList.add('blow-c')
                }, 1)
                setTimeout(() => {
                    listRef.current.childNodes[activeEnvelopeIndex].lastChild.firstChild.classList.add('hide')
                    setTimeout(() => {
                        listRef.current.childNodes[activeEnvelopeIndex].lastChild.classList.add('flip')
                        setTimeout(() => {
                            whoosh.play().then(() => {
                                setTimeout(() => {
                                    whoosh.pause()
                                    whoosh.currentTime = 0
                                }, 1000)
                            })

                        }, 300)
                        setTimeout(() => {
                            tada.play().then(() => {
                                setTimeout(() => {
                                    tada.pause()
                                    tada.currentTime = 0
                                }, 1300)
                            })

                        }, 500)
                    }, 500)

                    setTimeout(() => {

                        fire(0.3, 0.7)
                        explotion.play().then(() => {
                            setTimeout(() => {
                                explotion.pause()
                                explotion.currentTime = 0
                            }, 2700)
                        })
                        fire(0.5, 0.7)
                        fire(0.7, 0.7)
                        startAnimationPride()
                        fuzz.play().then(() => {
                            setTimeout(() => {
                                fuzz.pause()
                                fuzz.currentTime = 0
                            }, 4200)
                        })
                        setTimeout(() => {
                            fire(0.3, 0.7)
                            fire(0.5, 0.7)
                            fire(0.7, 0.7)

                        }, 2000)

                        setTimeout(() => {
                            confettiCanvas.current.firstChild.classList.add('hide')
                            priceBackground.current.classList.add('hide')
                            setTimeout(() => {
                                listRef.current.childNodes[activeEnvelopeIndex].lastChild.classList.add('show-price')
                                listRef.current.childNodes[activeEnvelopeIndex].lastChild.classList.remove('envelope-grow')
                                setTimeout(() => {
                                    stopAnimation()

                                    updateMoney(activeEnvelope.price)
                                    updateActiveUser(null)
                                    updateActiveUser(activeEnvelope.winner)



                                    setTimeout(() => {
                                        let position = listRef.current.childNodes[activeEnvelopeIndex].getBoundingClientRect()
                                        listRef.current.childNodes[activeEnvelopeIndex].lastChild.style.top = (position.top - 90) + 'px';
                                        listRef.current.childNodes[activeEnvelopeIndex].lastChild.style.left = (position.left - 40) + 'px';

                                        priceBackground.current.style.display = 'none'
                                        setStartEnvelopeAnimation(false)
                                        setEnvelopesToShow(envelopesToShow.map(eS => (eS.index == activeEnvelope.index ? { ...eS, count: true } : { ...eS })))
                                        setEnvelopes(envelopes.map(e => (e.index == activeEnvelope.index ? { ...e, count: true } : { ...e })))
                                        priceBackground.current.classList.remove('show')
                                        priceBackground.current.firstChild.classList.remove('blow')
                                        priceBackground.current.lastChild.classList.remove('blow-c')
                                        priceBackground.current.classList.remove('hide')
                                    }, 1000)
                                    confettiCanvas.current.firstChild.classList.remove('hide')
                                }, 700)
                            }, 900)
                        }, 4000)
                    }, 900)
                }, 2500)
            } else if (activeEnvelope.priceLevel == 2) {
                moneyReveal.pause()
                moneyReveal.currentTime = 0
                setTimeout(() => {
                    listRef.current.childNodes[activeEnvelopeIndex].lastChild.firstChild.classList.add('hide')
                    setTimeout(() => {
                        listRef.current.childNodes[activeEnvelopeIndex].lastChild.classList.add('flip-small')
                        setTimeout(() => {
                            moneyReveal.play().then(() => {
                                setTimeout(() => {
                                    moneyReveal.pause()
                                    moneyReveal.currentTime = 0
                                }, 1000)
                            })
                            whoosh.play().then(() => {
                                setTimeout(() => {
                                    whoosh.pause()
                                    whoosh.currentTime = 0
                                }, 800)
                            })
                        }, 1)
                        setTimeout(() => {
                            updateMoney(activeEnvelope.price)
                            updateActiveUser(null)
                            updateActiveUser(activeEnvelope.winner)

                            setStartEnvelopeAnimation(false)
                            setEnvelopesToShow(envelopesToShow.map(eS => (eS.index == activeEnvelope.index ? { ...eS, count: true } : { ...eS })))
                            setEnvelopes(envelopes.map(e => (e.index == activeEnvelope.index ? { ...e, count: true } : { ...e })))

                        }, 1000)
                    }, 300)
                }, 1)
            }
        }
    }, [startEnvelopeAnimation])

    let amountOfPages = () => {
        return envelopes ? Math.ceil(envelopes.length / perPages) : 0
    }

    return (
        <div className="envelope-section" ref={confettiCanvas}>

            <ReactCanvasConfetti refConfetti={getInstance} className="confetti" />
            <div className="price-background" ref={priceBackground}>
                <FontAwesomeIcon icon={faBahai} className={'explotion'} />
                <FontAwesomeIcon icon={faBahai} className={'explotion-circle'} />
            </div>
            <div className="envelope-container" ref={listRef}>
                {
                    envelopesToShow.map((e, index) => (

                        <div key={index} className="envelope-area">
                            <div className="envelope outside">
                                <div className="card-name">
                                    {winnerInfo(e.winner).name.split(',')[1]}
                                    <br />
                                    {winnerInfo(e.winner).name.split(',')[0]}
                                </div>
                                <div className="card">
                                    <div className="front face">
                                        <div className="dollar-sign top">$</div>
                                        <div className="dollar-sign bottom">$</div>
                                        <img src="./img/logoRafle.png" />
                                        <div className="card-money">
                                            {
                                                formatPrice(e.price)
                                            }
                                        </div>
                                    </div>
                                    <div className="back face">
                                        <div className={index % 2 ? "inside-container red" : "inside-container blue"}>
                                            <div className="inside-background">
                                                <img src={index % 2 ? "./img/red.png" : "./img/blue.png"} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>




                    ))
                }




            </div>
            <div className="pagination hide" ref={pageRef}>
                {
                    pagesAmount.map((pA, index) => (
                        <div key={index} className={(index + 1) == page ? "pages active" : "pages"}></div>
                    ))
                }
            </div>
        </div>
    );
}

export default Carrousel;
