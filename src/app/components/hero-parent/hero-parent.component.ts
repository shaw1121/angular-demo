import { HEROES } from './../../model/heroes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-parent',
  template: `
    <h2>{{master}} controls {{heroes.length}} heroes</h2>
    <app-hero-child *ngFor="let hero of heroes"
      [hero]="hero"
      [master]="master">
    </app-hero-child>
  `,
  styleUrls: ['./hero-parent.component.scss']
})
export class HeroParentComponent {
  heroes = HEROES;
  master = 'Master';
}
