import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameLog } from 'src/app/game-log';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent {
  @ Input() logs!: GameLog[];
  @Output() logClick =  new EventEmitter<number>();

  handleLogClick(index: number){
    this.logClick.emit(index)

  }

}
