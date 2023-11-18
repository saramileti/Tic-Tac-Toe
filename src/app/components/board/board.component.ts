import { Component, OnInit } from '@angular/core';

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
  boardLocked?: boolean;

  startGame() {
    //debugger
    console.log('Starting game...');
    console.log(
      'Initial values - playerX:',
      this.playerX,
      'playerO:',
      this.playerO
    );

    if (this.playerX) {
      this.playerNamesEntered = true;
      this.currentPlayerName = this.playerX; // Set the initial player turn
    }

    console.log('After setting currentPlayerName:', this.currentPlayerName);
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

  reset() {
    this.board = new Array(9).fill('');
    this.stateBoard = [];
    this.XIsPlayer = true;
    this.winner = undefined;
    this.clickedStateBoard = false;
    this.playerX = '';
    this.playerO = '';

    this.playerNamesEntered = false;
    this.currentPlayerName = '';
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
    console.log('board on this state is ' + this.board);
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
        this.boardLocked = true;
        //if we have the option to play with the computer, the next move will be set randomly
        this.board[index] = this.player;
        this.stateBoard.push({ id: index, values: this.player });

        this.XIsPlayer = !this.XIsPlayer;

        setTimeout(() => {
          this.generateRandomNumber();
          this.boardLocked = false;
        }, 1000);

        this.decideWinner();
      } else {
        this.board[index] = this.player;
        console.log(this.player);
        this.stateBoard.push({ id: index, values: this.player });
        this.XIsPlayer = !this.XIsPlayer;

        console.log(this.stateBoard);
        this.currentPlayerName =
          this.player === 'X' ? this.playerX : this.playerO;

        this.decideWinner();
      }
    } else {
      return this.board;
    }
  }

  generateRandomNumber(): void {
    if (this.winner !== '') {
      return; // Do nothing if there is already a winner
    }
    //debugger
    let hasMoved = false;

    while (!hasMoved && this.stateBoard.length < 8) {
      let possibleIndex = Math.floor(Math.random() * 9);

      if (this.board[possibleIndex] == '') {
        this.board[possibleIndex] = this.player;
        this.stateBoard.push({ id: possibleIndex, values: this.player });
        this.XIsPlayer = !this.XIsPlayer;
        this.decideWinner();
        hasMoved = true;
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
        console.log('Winner Found!');
        console.log('this.player:', this.player);
        console.log('this.playerO:', this.playerO);
        console.log('this.playerX:', this.playerX);
        console.log('Setting winner...');
        //debugger;

        if (this.player === 'X') {
          this.winner = this.playerO === 'computer' ? 'COMPUTER' : this.playerO;
        }
        if (this.player === 'O') {
          this.winner = this.playerX === 'computer' ? 'COMPUTER' : this.playerX;
        }
        console.log('Winner set to:', this.winner);
        return;
      }
    }
    if (boardIsFull) {
      console.log("Game ended without a winner. It's a draw!");
      this.winner = "No one (It's a draw)";
    }
  }
}
