import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  board!: Array<string>;
  stateBoard: Array<{ id: number; values: string }> = [];
  XIsPlayer: boolean = true;
  winner?: string = '';
  onePlayer: boolean = false;
  twoPlayer: boolean = false;
  clickedStateBoard: boolean = false;
  playerX: string = '';
  playerO: string = '';
  playerNamesEntered: boolean = false;
  currentPlayerName: string = '';
  boardLocked!: boolean;
  index!: number;

  startGame() {
    if (this.playerX) {
      this.playerNamesEntered = true;
      this.currentPlayerName = this.playerX; // Set the initial player turn
    }
  }

  winningOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  ngOnInit(): void {
    this.board = new Array(9).fill('');
  }

  get player() {
    return this.XIsPlayer ? 'X' : 'O';
  }

  replay() {
    this.board = new Array(9).fill('');
    this.stateBoard = [];
    this.XIsPlayer = true;
    this.clickedStateBoard = false;
    this.winner = '';
    this.boardLocked = false;

    if (this.onePlayer && this.currentPlayerName === this.playerO) {
      this.generateRandomNumber();
      this.decideWinner();
    } else if (this.twoPlayer && this.currentPlayerName === this.playerX) {
      console.log('trueeee');
    } else {
      return;
    }
  }

  reset() {
    this.board = new Array(9).fill('');
    this.stateBoard = [];
    this.onePlayer = false;
    this.twoPlayer = false;
    this.XIsPlayer = true;
    this.clickedStateBoard = false;
    this.playerX = '';
    this.playerO = '';
    this.playerNamesEntered = false;
    this.replay();
  }

  OnePlayer() {
    this.onePlayer = true;
    this.playerO = 'computer';
    this.twoPlayer = false;
    return this.onePlayer;
  }

  TwoPlayers() {
    this.twoPlayer = true;
    this.onePlayer = false;
    return this.twoPlayer;
  }

  setToClickedState(stateIndex: number) {
    console.log('stateindex is ' + stateIndex);
    let newBoard = new Array(9).fill('');
    for (let i = 0; i <= stateIndex; i++) {
      let element = this.stateBoard[i];
      console.log(element);
      newBoard[element.id] = element.values;
    }
    this.currentPlayerName =
      this.currentPlayerName === this.playerX ? this.playerO : this.playerX;
    this.board = newBoard;
    this.clickedStateBoard = true;
    return this.board;
  }

  //player can click the board only if it's not on a historical state. For every move we check for the winner
  movePlayer(index: number): any {
    if (
      !this.clickedStateBoard &&
      this.board[index] === '' &&
      !this.boardLocked
    ) {
      if (this.onePlayer) {
        //if we have the option to play with the computer, the next move will be set randomly
        this.board[index] = this.player;
        this.stateBoard.push({ id: index, values: this.player });

        this.XIsPlayer = !this.XIsPlayer;
        this.decideWinner();
        this.boardLocked = this.winner !== '';
        if (!this.boardLocked) {
          setTimeout(() => {
            this.generateRandomNumber();
            this.boardLocked = false;
          }, 1000);
        }
      } else if (this.twoPlayer) {
        this.board[index] = this.player;
        this.stateBoard.push({ id: index, values: this.player });
        this.XIsPlayer = !this.XIsPlayer;
        this.currentPlayerName =
          this.player === 'X' ? this.playerX : this.playerO;

        this.decideWinner();
        if (this.winner) {
          this.boardLocked = true; // Lock the board after deciding the winner
        }
      }
    } else {
      return this.board;
    }
  }

  generateRandomNumber(): void {
    if (this.winner !== '') {
      this.boardLocked = true;
    }

    let hasMoved = false;
    while (!hasMoved && this.stateBoard.length < 8) {
      let possibleIndex = Math.floor(Math.random() * 9);
      if (this.board[possibleIndex] == '') {
        this.board[possibleIndex] = this.player;
        this.stateBoard.push({ id: possibleIndex, values: this.player });
        this.XIsPlayer = !this.XIsPlayer;
        this.decideWinner();
        hasMoved = true;
        this.boardLocked = true;
      }
    }
  }

  private decideWinner() {
    let boardIsFull = this.board.every((cell) => cell !== '');
    for (let i = 0; i < this.winningOptions.length; i++) {
      let checkOneMatch = this.winningOptions[i]; //one of the possible options of winning
      let move1 = checkOneMatch[0]; //first move
      let move2 = checkOneMatch[1]; //second move
      let move3 = checkOneMatch[2]; //third move, checks the value
      //if all the three moves are the same (means that we have 3X or 3O), we have a winner
      if (
        this.board[move1] != '' &&
        this.board[move1] === this.board[move2] &&
        this.board[move2] === this.board[move3] &&
        this.board[move1] === this.board[move3]
      ) {
        if (this.player === 'X') {
          this.winner = this.playerO === 'computer' ? 'COMPUTER' : this.playerO;
        }
        if (this.player === 'O') {
          this.winner = this.playerX;
        }
        this.boardLocked = true;
        return;
      }
    }
    if (boardIsFull) {
      this.winner = "No one (It's a draw)";
    } else {
    }
  }
}
