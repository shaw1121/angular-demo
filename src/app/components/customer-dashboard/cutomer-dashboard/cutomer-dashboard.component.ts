import { Observable } from 'rxjs';
import { Observer } from 'rxjs'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cutomer-dashboard',
  templateUrl: './cutomer-dashboard.component.html',
  styleUrls: ['./cutomer-dashboard.component.scss']
})
export class CutomerDashboardComponent {

  greeting: Promise<string>|null = null;
  arrived: boolean = false;

  constructor() { 
    this.reset(); 
  }

  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
 
  private resolve: Function|null = null;
 
  reset() {
    this.arrived = false;
    this.greeting = new Promise<string>((resolve, reject) => { 
      this.resolve = resolve; 
    });
  }
 
  clicked() {
    if (this.arrived) {
      this.reset();
    } else {
      this.resolve !('hi there!');
      this.arrived = true;
    }
  }
}
