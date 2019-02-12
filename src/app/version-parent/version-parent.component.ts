import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-version-parent',
  template: `
    <h2>Source code version</h2>
    <button (click)="newMinor()">New minor version</button>
    <button (click)="newMajor()">New major version</button>
    <app-version-child [major]="major" [minor]="minor"></app-version-child>
  `,
  styleUrls: ['./version-parent.component.scss']
})
export class VersionParentComponent {
  major = 1;
  minor = 11;

  newMinor () {
    this.minor++;
  }

  newMajor () {
    this.major++;
    this.minor = 0;
  }
}
