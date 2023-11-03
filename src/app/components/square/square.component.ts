import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  @Input () value?: 'X' | 'O';

  constructor(private router: Router){

  }

  gameIsOver() {
    // Game is over, navigate to the "game-over" route with the game status
    this.router.navigate(['/game']);
  }

  returnToMainBoard() {
    this.router.navigate(['game']); // Navigate back to the main board
  }

}
