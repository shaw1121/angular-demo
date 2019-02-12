import { Component, OnChanges, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-version-child',
  template: `
    <h3>Version {{major}}.{{minor}}</h3>
    <h4>Change log:</h4>
    <ul>
      <li *ngFor="let change of changeLog">{{change}}</li>
    </ul>
  `,
  styleUrls: ['./version-child.component.scss']
})
export class VersionChildComponent implements OnChanges {

  @Input() major: number;
  @Input() minor: number;
  changeLog: string[] = [];

  ngOnChanges (changes: {[propKey: string]: SimpleChange}) {
    const log: string[] = [];
    // tslint:disable-next-line:forin
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);

      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }
}
