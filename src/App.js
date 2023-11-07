import { useState } from "react";

// create square with 2 atributtes value and onSquaresClick
function Square({ value, onSquareClick }) {

// Show the square, and his value
  return (
    <button
      className={`square ${value === "X" ? "blue" : "red"}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}




export default function Board() {
  // build list squares items, null value 
  const [xIsNext, setxIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
 


  //function create a "list copy", and after put X at the square
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
  
    // faz a atualização do estado das casas no tabuleiro do jogo da velha 
    //com as novas marcações feitas pelos jogadores.
    setSquares(nextSquares);
    
    //invert the value state x to o, or the inverse. 
    setxIsNext(!xIsNext);



  }

  
// take on result from calculateWinner and storage at const winner.
//So, the var status is create to be used more later, if the winner game is true the status will be Winner or NextPlayer
  const winner = calculateWinner(squares);
  
  let status;

  if (winner) {
    status = "O vencedor é: " + winner
  } else {
    status = "O próximo a jogar é: " + (xIsNext? "X" : "O ")
  }


  //show the components Squares, where will be mark the X or O
  return <div className="square-Master">
    <div className="status"> {status} </div>

    <div className="row-123">
    <div className="row-1">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>

    <div className="row-2">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>

    <div className="row-3">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
    </div>
    
    </div>

  // calculate the winner through the lines, if is X or O
  function  calculateWinner(squares) {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];//So, the value at the squares [a], is the winner.
      }
    }
    return null;
  }
}