import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { SquareComponent } from './components/square/square.component';

const routes: Routes = [
  { path: '', component: BoardComponent },
  { path: 'game', component: SquareComponent },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
