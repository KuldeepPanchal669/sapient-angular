import { Component, OnInit } from '@angular/core';

import { HeroService } from '../hero.service';
import { SpaceService } from './space.service';

@Component({
  selector: 'app-space-launch-programs',
  templateUrl: './space-launch-programs.component.html',
  styleUrls: ['./space-launch-programs.component.css']
})
export class SpaceLaunchProgramsComponent implements OnInit {
  spacePrograms: Array<{}>;

  constructor(private spaceService: SpaceService) { }

  ngOnInit() {
    this.getSpacePrograms();
  }

  getSpacePrograms(): void {
    this.spaceService.getSpaceProgramsApi()
    .subscribe(spacePrograms => this.spacePrograms = spacePrograms);
  }
}
