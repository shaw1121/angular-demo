import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-pipe',
  templateUrl: './date-pipe.component.html',
  styleUrls: ['./date-pipe.component.scss']
})
export class DatePipeComponent implements OnInit {

  today: number = Date.now();

  constructor() { }

  ngOnInit() {
  }

}
