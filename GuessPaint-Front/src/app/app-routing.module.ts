import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinGameComponent } from './join-game/join-game.component';
import { GameComponent } from './game/game.component';
import { ChatComponent } from './game/chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: '/join', pathMatch: 'full' },
  { path: 'join', component: JoinGameComponent },
  { path: 'game', component: GameComponent },
  { path: 'chat', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
