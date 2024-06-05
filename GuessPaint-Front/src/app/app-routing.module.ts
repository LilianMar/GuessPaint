import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinGameComponent } from './join-game/join-game.component';
import { GameComponent } from './game/game.component';
import { RoomListComponent } from './room-list/room-list.component';

const routes: Routes = [
  { path: 'join', component: JoinGameComponent },
  { path: 'game', component: GameComponent },
  { path: 'rooms', component: RoomListComponent },
  { path: '', redirectTo: '/join', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
