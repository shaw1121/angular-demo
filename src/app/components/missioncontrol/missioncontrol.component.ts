import { MissionService } from './../../service/mission.service';
import { Component }          from '@angular/core';

// 父组件
@Component({
  selector: 'app-mission-control',
  templateUrl: './missioncontrol.component.html',
  providers: [MissionService]
})
export class MissionControlComponent {
  astronauts = ['Lovell', 'Swigert', 'Haise'];
  history: string[] = [];
  missions = ['Fly to the moon!',
              'Fly to mars!',
              'Fly to Vegas!'];
  nextMission = 0;

  constructor(private missionService: MissionService) {
    // 
    missionService.missionConfirmed$.subscribe(
      // subscriber
      // {next: astronaut => {
      //   this.history.push(`${astronaut} confirmed the mission`);
      // }}

      // another format
      astronaut => {
        this.history.push(`${astronaut} confirmed the mission`);
      }
    );
  }

  announce() {
    let mission = this.missions[this.nextMission++];
    this.missionService.announceMission(mission);
    this.history.push(`Mission "${mission}" announced`);

    if (this.nextMission >= this.missions.length) { 
      this.nextMission = 0; 
    }
  }
}