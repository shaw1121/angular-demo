import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // 单例服务
})
export class MessageService {

  messages: string[] = [];

  add (message: string) {
    this.messages.push(message);
  }

  clear () {
    this.messages = [];
  }

  constructor() { }
}
