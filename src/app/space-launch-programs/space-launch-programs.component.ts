import { Component, OnInit } from '@angular/core';

import { SpaceService } from './space.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-space-launch-programs',
  templateUrl: './space-launch-programs.component.html',
  styleUrls: ['./space-launch-programs.component.css']
})
export class SpaceLaunchProgramsComponent implements OnInit {
  spacePrograms: Array<{}>;
  filter: {
    launchYears: Array<{year: number, active: boolean}>,
    successfulLaunch: boolean,
    successfullLanding: boolean
  };

  defaultParms;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private spaceService: SpaceService) {
    this.spacePrograms = [];
    this.filter = {
      launchYears: [
        {year: 2006, active: false},
        {year: 2007, active: false},
        {year: 2008, active: false},
        {year: 2009, active: false},
        {year: 2010, active: false},
        {year: 2011, active: false},
        {year: 2012, active: false},
        {year: 2013, active: false},
      ],
      successfulLaunch: null,
      successfullLanding: null
    };

  }

  ngOnInit() {
    this.getSpacePrograms();
  }

  getSpacePrograms(): void {
    this.spaceService.getSpaceProgramsApi({ "limit": 100 })
      .subscribe((spacePrograms) => {
        const launchYears = [];
        spacePrograms.map((acc) => {
          // console.log(acc)
          if (launchYears.indexOf(acc['launch_year']) == -1) {
            launchYears.push(acc['launch_year'])
          }
        });
        // this.filter.launchYears = launchYears;
        console.log(launchYears);
        this.spacePrograms = spacePrograms;
      });
  }

  navigateTo(type, param) {

    if(type == 'launch_year'){
      this.filter.launchYears = this.filter.launchYears.map((launchYear)=>{
        launchYear.active = false;
        if(launchYear.year == param){
          launchYear.active = !launchYear.active;
        }
        return launchYear;
      })
    }else if(type == 'launch_success'){
      this.filter.successfulLaunch = !this.filter.successfulLaunch;
    }
    else{
      this.filter.successfullLanding = !this.filter.successfullLanding;      
    }

    const currentQueryParams = this._activatedRoute.snapshot.queryParams;
    const queryParams = {};

    if (Object.keys(currentQueryParams).length) {
      for (let key in currentQueryParams) {
        queryParams[key] = currentQueryParams[key];
      }
    }
    queryParams[type] = param;
    this._router.navigate(['space-launch-programs'], { queryParams: queryParams })
  }
}
