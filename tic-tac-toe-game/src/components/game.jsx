import React, { useState } from 'react';
import Square from './square';

const Game = () => {
    // State for storing the Tic-Tac-Toe board (9 squares)
    const [board, setBoard] = useState(Array(9).fill(null));
    
    // State for tracking the current player (X or O)
    const [player, setPlayer] = useState("X");
    
    // State for checking if the game is over
    const [gameOver, setGameOver] = useState(false);

    // History of wins for X and O
    const [history , setHistory] = useState({
        X:0,
        O:0
    })

    // Function to handle a click on a square
    const handleOnClick = (index) => {
        // If the square is already filled or the game is over, do nothing
        if (board[index] || gameOver) {
            return;
        }

        // Copy the current board and update the clicked square
        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        // Switch the player (X → O or O → X)
        setPlayer(player === "X" ? "O" : "X");

        // Check if there's a winner
        let winnerResult = checkForWinner(newBoard);
        if (winnerResult != null) {
            setGameOver(true);
            alert(`Player ${winnerResult} has won the game`);
            setHistory(prevState => {
                return (
                    {
                        ...prevState,
                        [winnerResult] : prevState[winnerResult] + 1,
                    }
                )
            })
            return;
        }

        // Check if it's a draw (all squares filled and no winner)
        let drawResult = checkForDraw(newBoard);
        if (drawResult) {
            setGameOver(true);
            alert(`Game is over, It's a Draw!`);
            return;
        }
    };

    // Function to check if there's a winner
    const checkForWinner = (square) => {
        const winnerCombination = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal wins
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical wins
            [0, 4, 8], [2, 4, 6]             // Diagonal wins
        ];

        // Loop through all winning combinations to check if any player has won
        for (let i = 0; i < winnerCombination.length; i++) {
            const [a, b, c] = winnerCombination[i];

            // If all three squares have the same value (X or O), return the winner
            if (square[a] && square[a] === square[b] && square[a] === square[c]) {
                return square[a];
            }
        }

        return null; // No winner yet
    };

    // Function to check if the game is a draw
    const checkForDraw = (square) => {
        return !square.includes(null); // If there are no empty squares, it's a draw
    };

    
    // Function to reset the game
    const handleOnReset = () => {
        setBoard(Array(9).fill(null)); // Reset board to initial state
        setGameOver(false); // Reset game status
        setPlayer("X"); // Set the first player to X
    };

    return (
        <>
            <div className='h-screen flex flex-col items-center justify-center bg-gray-900 text-white'>
                {/* Title */}
                <h1 className="text-3xl font-bold mb-10 text-blue-400 shadow-lg">
                    Tic-Tac-Toe Game using ReactJS
                </h1>

                {/* Game Board */}
                <div className="board">
                    {board.map((item, index) => (
                        <Square 
                            clickBtn={handleOnClick} 
                            key={index} 
                            value={item} 
                            index={index}
                        />
                    ))}
                </div>

                {/* Reset Button */}
                <div className="mt-3">
                    <button
                        onClick={handleOnReset}
                        className="px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
                    >
                        Reset Game
                    </button>
                </div>

                {/* Win History */}
                <div className="mt-8 bg-gray-800 rounded-lg p-4 shadow-md w-64 text-center">
                    <h2 className="text-xl font-bold text-yellow-400 mb-4">Win History</h2>
                    <div className="text-lg font-medium mb-2">
                        <span className="text-blue-500">Player X: </span>{history.X}
                    </div>
                    <div className="text-lg font-medium">
                        <span className="text-red-500">Player O: </span>{history.O}
                    </div>
                    <div className="mt-2">
                        <button
                            onClick={() => {
                                setHistory({ X: 0, O: 0 }); // Reset the win history
                            }}
                            className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
                        >
                            Reset History
                        </button>
                    </div>
                </div>
            </div>


            
        </>
    );
};

export default Game;
