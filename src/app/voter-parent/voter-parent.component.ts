import { Component } from '@angular/core';

@Component({
  selector: 'app-voter-parent',
  template: `
    <h2>should mankind colonize the universals</h2>
    <h3>Agreed: {{agreed}}, Disagreed: {{disagreed}}</h3>
    <app-voter-child *ngFor="let voter of voters"
      [name]="voter"
      (voted)="onVoted($event)"
    >
    </app-voter-child>
  `,
  styleUrls: ['./voter-parent.component.scss']
})
export class VoterParentComponent {
  agreed = 0;
  disagreed = 0;
  voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];

  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }
}
