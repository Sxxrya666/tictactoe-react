import {useState} from 'react'

function Square ({onSquareClick, value}){
    return <button onClick={onSquareClick} className='square'>{value}</button>
}

export default function Board(){

  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  function detectClick(idx){
      const nextConsecutiveSquares = squares.slice()
      if(squares[idx] || calculateWinner(squares)) return

      if (xIsNext){
          nextConsecutiveSquares[idx] = 'X'
      } 
      else {
          nextConsecutiveSquares[idx] = 'O'
      }
      setSquares(nextConsecutiveSquares)
      setXIsNext(!xIsNext);
}

const winner = calculateWinner(squares)
let loserOrWinnerstatus

if(winner){
    loserOrWinnerstatus = 'Winner: ' + winner 
} else{
    loserOrWinnerstatus = 'Next Player: ' + (xIsNext ? 'X' : 'O')
}

return <>
    <div>{loserOrWinnerstatus}</div>
    <div className='board-row'>
        <Square value={squares[0]} onSquareClick={()=>detectClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>detectClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>detectClick(2)}/>
    </div>
    <div className='board-row'>
        <Square value={squares[3]} onSquareClick={()=>detectClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>detectClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>detectClick(5)}/>
    </div>
    <div className='board-row'>
        <Square value={squares[6]} onSquareClick={()=>detectClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>detectClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=>detectClick(8)}/>
    </div>

  </>
}

function calculateWinner(squares){
    const boardLines = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,4,8], [2,4,6], 
      [0,3,6], [1,4,7], [2,5,8]
    ]

    for (let i =0 ; i < boardLines.length; i++){
        const [a,b,c] = boardLines[i]
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                // return the first spot if all bingo
                return squares[a] 
            }
        }
        return null
  }
