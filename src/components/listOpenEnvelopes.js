import React, { useEffect, useRef, useState } from "react";
import { useTransition, animated } from "react-spring";




function ListOpenEnvelopes({ list, activePlayer, updateActiveUser, money, setPlayers, goToWinners, animateReorder, setAnimateReorder, page, startGame }) {

    const listRef = useRef()
    const [animateSelection, setAnimateSelection] = useState(null)
    const [animateMoney, setAnimateMoney] = useState(null)
    const [inListId, setInListId] = useState(null)
    const [firstOrder, setFirstOrder] = useState(true)
    const [listToChange, setListToChange] = useState([])
    const [coin, setCoin] = useState(null)

    useEffect(() => {
        setCoin(new Audio('./audio/coin.mp3'))
    }, [])
    
    const height = 70;
    const transitions = useTransition(
        list.map((data, i) => ({ ...data, y: i * height })),
        d => d.userCode,
        {
            from: { position: "absolute", opacity: 0 },
            leave: { height: 0, opacity: 0 },
            enter: ({ y }) => ({ y, opacity: 1 }),
            update: ({ y }) => ({ y })
        }
    );

    let calcScrollPos = (item) => {

        let m = listRef.current.offsetHeight / 2;
        let t = listRef.current.offsetTop - listRef.current.scrollTop + m;
        let position = listRef.current.childNodes[parseInt(item)].getBoundingClientRect();

        return position.top - t;
    }

    useEffect(() => {
        if (startGame) {
            setTimeout(() => {
                let listCount = 0
                let inUsers = setInterval(() => {
                    listRef.current.childNodes[listCount].classList = ['outter-container']
                    if (listCount == 19) {
                        clearInterval(inUsers)
                        setFirstOrder(false)
                    }
                    listCount++
                }, 100)
            }, 200)
            
        }
    }, [startGame])

    useEffect(() => {
        //if (goToWinners) {
        //    let listCount = 0
        //    let inUsers = setInterval(() => {
        //        listRef.current.childNodes[listCount].classList = 'outter-container outside'
        //        if (listCount == 19) {
        //            clearInterval(inUsers)
        //        }
        //        listCount++
        //    }, 100)
        //}
    }, [goToWinners])

    useEffect(() => {
        if (activePlayer != null) {
            setInListId(null)
            setInListId(list.findIndex(l => l.index == activePlayer))
        }
    }, [activePlayer])

    useEffect(() => {
        if (inListId != null) {
            setAnimateSelection(true)
        }
    }, [inListId])

    useEffect(() => {
        if (animateSelection) {

            listRef.current.scroll({ top: calcScrollPos(inListId), behavior: 'smooth' })
            setTimeout(() => {
                let itsMoving = false
                listRef.current.childNodes[parseInt(inListId)].addEventListener('transitionend', (e) => {
                    if (!itsMoving) {
                        itsMoving = true
                        setTimeout(() => {
                            setAnimateMoney(true)
                            setAnimateSelection(false)
                        }, 400)
                    }
                });
                listRef.current.childNodes[parseInt(inListId)].firstChild.classList.add('grow')

            }, 600)

        }
    }, [animateSelection])


    useEffect(() => {
        if (animateMoney) {
            let moneyPerIteration = money < 10000 ? (money / 50) : (money / 75)
            let actualMoney = list[inListId].amount
            let shouldBeMoney = parseInt(list[inListId].amount + money)
            if (money < 10000) {
                coin.play().then(() => {
                    setTimeout(() => {
                        coin.pause();
                        coin.currentTime = 0;
                    }, 900)
                })
            } else {
                coin.play().then(() => {
                    setTimeout(() => {
                        coin.pause();
                        coin.currentTime = 0;
                    }, 1300)
                })
            }

            const iteration = setInterval(() => {
                actualMoney += moneyPerIteration
                list[inListId].amount = parseInt(actualMoney)
                setPlayers([...list])
                if (actualMoney >= shouldBeMoney) {
                    clearInterval(iteration)
                    
                    listRef.current.childNodes[parseInt(inListId)].firstChild.classList.remove('grow')
                    list[inListId].envelopes = list[inListId].envelopes - 1
                    setPlayers([...list])
                    setTimeout(() => {
                        setListToChange([...listToChange, { listId: inListId, amount: parseInt(actualMoney) }])
                        setAnimateMoney(false)
                        updateActiveUser(null)
                        setAnimateSelection(null)
                        setAnimateMoney(null)
                        setInListId(null)
                    }, 900)
                }
            }, 2)

            const soundIteration = setInterval(() => {

            }, 500)
        }
    }, [animateMoney])


    useEffect(() => {
        if (animateReorder) {
            setPlayers([...list].sort((a, b) => b.amount - a.amount))
            listRef.current.scroll({ top: 0, behavior: 'smooth' })
            setAnimateReorder(false)
        }
    }, [animateReorder])


    let formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="list-container" ref={listRef}>
            {transitions.map(({ l, props: { y, ...rest }, key }, index) => (
                <animated.div
                    key={key}
                    className={(firstOrder) && index < 20 ? "outter-container outside" : "outter-container"}
                    style={{
                        transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
                        ...rest
                    }}
                >
                    <div className={"list-item " + (list[index].envelopes ? "" : " completed")}>
                        <div className="info-section">
                            <div className="name">{(list[index].name.split(',')[1] + ' ' + list[index].name.split(',')[0]).toLowerCase()}</div>
                            <div className="dealer"><span>Remaining: {list[index].envelopes}</span>{list[index].store} </div>
                        </div>
                        <div className="money"><span>$</span><div>{formatPrice(list[index].amount)}</div></div>
                    </div>
                </animated.div>
            ))}
        </div>
    );
}

export default ListOpenEnvelopes;
