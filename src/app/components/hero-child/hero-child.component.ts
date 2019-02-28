import { Hero } from './../../model/hero';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero-child',
  template: `
    <h3>{{hero.name}} says: </h3>
    <p>I, {{hero.name}}, am at your service, {{masterName}}.</p>
  `
})
export class HeroChildComponent {
  @Input() hero: Hero;
  // tslint:disable-next-line:no-input-rename
  @Input('master') masterName: string;
}
