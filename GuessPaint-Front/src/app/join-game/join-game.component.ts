import { Component , OnInit} from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrl: './join-game.component.css'
})
export class JoinGameComponent implements OnInit{
  modalOpen = false;
  joinRoomForm : FormGroup = new FormGroup({
    userName: new FormControl('',[ Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    roomId: new FormControl('',[ Validators.required])
  });
  avatarList = [
    {name: 'avatar0', src: 'img/avatar/avatar0.PNG'},
    {name: 'avatar1', src: 'img/avatar/avatar1.jpg'},
    {name: 'avatar2', src: 'img/avatar/avatar2.PNG'},
    {name: 'avatar3', src: 'img/avatar/avatar3.PNG'},
    {name: 'avatar4', src: 'img/avatar/avatar4.PNG'},
    {name: 'avatar5', src: 'img/avatar/avatar5.PNG'},
    {name: 'avatar6', src: 'img/avatar/avatar6.PNG'},
    {name: 'avatar7', src: 'img/avatar/avatar7.PNG'},
    {name: 'avatar8', src: 'img/avatar/avatar8.PNG'},
    {name: 'avatar9', src: 'img/avatar/avatar9.PNG'},
    {name: 'avatar10', src: 'img/avatar/avatar10.PNG'},
    {name: 'avatar12', src: 'img/avatar/avatar12.PNG'}
  ];
  avatarSelected = this.avatarList[0];

  constructor() { }

  ngOnInit(): void {
  }

  changeAvatar(){
    this.modalOpen = true;
  }

  closeAvatarSelection(){
    this.modalOpen = false;
  }

  selectAvatar(avatar: any){
    this.avatarSelected = avatar;
    this.modalOpen = false;
  }

  joinRoom(){
    console.log(this.joinRoomForm.value);
  }

}
