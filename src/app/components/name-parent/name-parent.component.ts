import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-parent',
  template: `
    <h3>master controls {{names.length}} names</h3>
    <app-name-child *ngFor="let name of names" [name]="name"></app-name-child>
  `,
  styleUrls: ['./name-parent.component.scss']
})
export class NameParentComponent {

  names = ['shaw', ' ', ' cha ng '];

}
