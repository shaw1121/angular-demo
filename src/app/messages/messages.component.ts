import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  //  messageService 属性必须是公共属性，因为你将会在模板中绑定到它
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
