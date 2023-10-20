import React, { useState, useEffect } from 'react';
import Square from '../Square';
import './Board.css';

function Board(props) {
    console.log(props);
    const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
    const [xIsNext, setXIsNext] = useState(true);

    function handleSquareClick(row, col) {
        // Make a copy of the board array
        const boardCopy = [...board];

        // Return if the square is already filled or if the game is over
        if (boardCopy[row][col] || calculateWinner(boardCopy)[0]) {
            return;
        }

        // Create a new row array that contains a copy of the current row array
        const newRow = [...boardCopy[row]];

        // Update the value of the clicked square in the new row array
        newRow[col] = xIsNext ? 'X' : 'O';
        //console.log(xIsNext ? 'X' : 'O');

        // Replace the current row array with the new row array in the boardCopy array
        boardCopy[row] = newRow;

        // Set the board with the updated boardCopy array
        setBoard(boardCopy);

        // Switch the player
        setXIsNext(!xIsNext);

    }

    function calculateWinner(board, n = 3) {
        const directions = [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const color = board[i][j];
                if (!color) continue;

                for (const direction of directions) {
                    let count = 1;
                    let x = i + direction.x;
                    let y = j + direction.y;
                    const squares = [[i, j]];
                    while (x >= 0 && x < board.length && y >= 0 && y < board[x].length && board[x][y] === color) {
                        count++;
                        squares.push([x, y]);
                        x += direction.x;
                        y += direction.y;
                    }
                    if (count >= n) {
                        return [color, squares];
                    }
                }
            }
        }
        return [null, null];
    }

    function renderSquare(row, col) {
        const value = board[row][col];
        var svg = null;
        if (value === 'X') {
            svg = <svg viewBox="0 0 100 100" className="mark mark-x line">
                <line x1="10" y1="10" x2="90" y2="90" stroke="#47827b" strokeWidth="15" />
                <line x1="90" y1="10" x2="10" y2="90" stroke="#47827b" strokeWidth="15" />
            </svg>
        }
        if (value === 'O') {
            svg = <svg viewBox="0 0 100 100" className="o mark-o circle">
                <circle cx="50" cy="50" r="40" stroke="#f0ffff" strokeWidth="14" fill="none" />
            </svg>

        }

        return (
            <Square onClick={() => handleSquareClick(row, col)}>
                {svg}
            </Square>
        );
    }

    function isBoardFull(board) {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] === null) {
                    return false; // if any cell is empty, the board is not full
                }
            }
        }
        return true; // all cells are filled, board is full
    }

    function drawWinningLine([winner, squares]) {
        if (squares) {
            //set line color
            let color = "";
            if (winner === 'X') { color = "#47827b" }
            else { color = "#f0ffff" }
            console.log(color);
            const horizontal = ["15.5%", "49.5%", "83.5%"];
            const vertical = ["16.65%", "49.9%", "83.4%"];
            const copySquares = [...squares];
            for (let i = 0; i < copySquares.length; i++) {
                for (let j = 0; j < copySquares[i].length; j++) {
                    copySquares[i][j]++; // increment the current element
                }
            }
            const [StartX, StartY] = copySquares[0];
            const [EndX, EndY] = copySquares[2];

            //horizontal
            if (StartX === EndX) {
                console.log("horizontal");
                return (
                    <line x1="5%" y1={horizontal[StartX - 1]} x2="95%" y2={horizontal[StartX - 1]} stroke={color} strokeWidth={10} className="winning-line draw-line" />
                );
            }
            // vertical
            else if (StartY === EndY) {
                console.log("vertical");
                return (
                    <line x1={vertical[StartY - 1]} y1="5%" x2={vertical[StartY - 1]} y2="95%" stroke={color} strokeWidth={10} className="winning-line draw-line" />
                );
            }
            //diagonal
            else {
                console.log();
                if (JSON.stringify(copySquares[0]) === JSON.stringify([1, 1]) && JSON.stringify(copySquares[2]) === JSON.stringify([3, 3])) {
                    console.log("top-left to bottom-right");
                    return (
                        <line x1="5%" y1="4%" x2="94.25%" y2="94.5%" stroke={color} strokeWidth={10} className="diag draw-line" />
                    );
                } else {
                    console.log("top-right to bottom-left");
                    return (
                        <line x1="5.5%" y1="95%" x2="94.25%" y2="4.5%" stroke={color} strokeWidth={10} className="diag draw-line" />
                    );
                }
            }



        }
        return null;
    }

    useEffect(() => {
        const winner = calculateWinner(board)[0];
        if (winner) {
            setTimeout(() => {
                window.alert(`Congratulations! ${winner} is the winner!`);
                setBoard(Array(3).fill(Array(3).fill(null)));
                setXIsNext(true);
                props.onWin(winner);
            }, 700);
        } else if (isBoardFull(board)) {
            setTimeout(() => {
                window.alert(`Draw!`);
                setBoard(Array(3).fill(Array(3).fill(null)));
                setXIsNext(true);
            }, 500);
        }
    }, [board, props.onWin]);

    return (
        <div className="board-container">
            <div className="board-row">
                {renderSquare(0, 0)}
                {renderSquare(0, 1)}
                {renderSquare(0, 2)}
            </div>
            <div className="board-row">
                {renderSquare(1, 0)}
                {renderSquare(1, 1)}
                {renderSquare(1, 2)}
            </div>
            <div className="board-row">
                {renderSquare(2, 0)}
                {renderSquare(2, 1)}
                {renderSquare(2, 2)}
            </div>
            <svg className="board-grid">
                <line x1="33%" y1="2%" x2="33%" y2="98%" stroke="#285550" strokeWidth={20} strokeLinecap="round" className="line-animation" />
                <line x1="67%" y1="2%" x2="67%" y2="98%" stroke="#285550" strokeWidth={20} strokeLinecap="round" className="line-animation" />
                <line x1="2%" y1="33%" x2="98%" y2="33%" stroke="#285550" strokeWidth={20} strokeLinecap="round" className="line-animation" />
                <line x1="2%" y1="67%" x2="98%" y2="67%" stroke="#285550" strokeWidth={20} strokeLinecap="round" className="line-animation" />
                {drawWinningLine(calculateWinner(board))}
            </svg>
        </div>
    );
}

export default Board;