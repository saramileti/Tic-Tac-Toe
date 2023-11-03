import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  singlePlayer: string = '';
  gameMode?: '' | 'single' | 'two-players';

  player1Name: string = '';
  player2Name: string = '';
  squares: any = [];
  xIsNext = true;
  winner = '';
  counter = 0;
  isdraw = '';
  freshpage = true;
  gameStarted = false;

  setGameMode(mode: 'single' | 'two-players') {
    this.gameMode = mode;
    if (mode === 'single') {
      this.singlePlayer = this.player1Name; // Store the name when switching to single-player mode
      this.player1Name = ''; // Clear the name of player 1
      this.gameStarted = true; // Set the gameStarted flag to true
    }
  }

  ngOnInit(): void {}

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.isdraw = '';
    this.counter = 0;
    this.freshpage = false;
    this.gameStarted = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  // makeMove(idx: number) {
  //   if (!this.squares[idx]) {
  //     this.squares.splice(idx, 1, this.player);
  //     this.xIsNext = !this.xIsNext;
  //     this.counter++;
  //   }
  //   this.winner = this.calculateWinner();

  //   if (!this.winner && this.counter == 9) {
  //     this.isdraw = 'yes';
  //   }
  // }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 2, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  // resetGameMode() {
  //   this.gameMode = '';
  //   this.gameStarted = false;
  // }

  makeMove(idx: number) {
    if (!this.winner && !this.isdraw) {
      if (!this.squares[idx]) {
        this.squares.splice(idx, 1, this.player);
        this.xIsNext = !this.xIsNext;
        this.counter++;
      }
      this.winner = this.calculateWinner();
  
      if (this.winner) {
        // Game is over with a winner
        this.isdraw = '';
        this.gameOver(); // Call the gameOver method to handle the game over state
      } else if (this.counter === 9) {
        // Game is a draw
        this.isdraw = 'yes';
        this.gameOver(); // Call the gameOver method to handle the game over state
      }
    }
  }
  
  gameOver() {
    // Handle game over logic here, e.g., show a message or provide a "Play Again" option
  }
  
  resetGameMode() {
    this.gameMode = '';
    this.gameStarted = false;
    this.winner = ''; // Reset the winner state
    this.isdraw = ''; // Reset the draw state
    this.counter = 0; // Reset the move counter
    this.squares = Array(9).fill(null); // Reset the squares
  }

  playAgain() {
    this.resetGameMode(); // Reset the game mode
    this.squares = Array(9).fill(null); // Reset the squares
    this.winner = ''; // Reset the winner
    this.isdraw = ''; // Reset the draw state
    this.counter = 0; // Reset the move counter
}

  
}
