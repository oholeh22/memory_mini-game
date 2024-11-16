import React from 'react'

export default function GameInfo({matchedCards, onReset}) {
  return (
    <div className='game-info'>
        <div className='matchedPairs'>Matched Pairs: {matchedCards.length / 2}</div>
        <button onClick={onReset} >Reset Game</button>
    </div>
  )
}
