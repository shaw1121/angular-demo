import { Component } from '@angular/core';

@Component({
  selector: 'app-voter-parent',
  templateUrl: './voter-parent.component.html'
})
export class VoterParentComponent {
  agreed = 0;
  disagreed = 0;
  voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];

  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }
}
