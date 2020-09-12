import { Component, OnInit } from '@angular/core';

import { SpaceService } from './space.service';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-space-launch-programs',
  templateUrl: './space-launch-programs.component.html',
  styleUrls: ['./space-launch-programs.component.css']
})
export class SpaceLaunchProgramsComponent implements OnInit {
  spacePrograms: Array<{}>;
  filter: {
    launchYears: Array<{ year: number, active: boolean }>,
    successfullLaunch: boolean,
    successfullLand: boolean
  };

  defaultParms;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private spaceService: SpaceService) {
    this.spacePrograms = [];
    this.filter = {
      launchYears: [
        { year: 2006, active: false },
        { year: 2007, active: false },
        { year: 2008, active: false },
        { year: 2009, active: false },
        { year: 2010, active: false },
        { year: 2011, active: false },
        { year: 2012, active: false },
        { year: 2013, active: false },
        { year: 2014, active: false },
        { year: 2015, active: false },
        { year: 2016, active: false },
      ],
      successfullLaunch: null,
      successfullLand: null
    };

    this._activatedRoute.queryParams.subscribe((queryParams) => {
      if (Object.keys(queryParams).length) {

      }
      console.log('[queryParams]', queryParams);
      this.updateFilters(queryParams);
      this.getSpacePrograms(queryParams);
    })
  }

  ngOnInit() {

  }

  getSpacePrograms(queryParams): void {
    this.spaceService.getSpaceProgramsApi({ ...{ "limit": 100 }, ...queryParams })
      .subscribe((spacePrograms) => {
        // const launchYears = [];
        // spacePrograms.map((acc) => {
        //   if (launchYears.indexOf(acc['launch_year']) == -1) {
        //     launchYears.push(acc['launch_year'])
        //   }
        // });
        // console.log(launchYears);
        this.spacePrograms = spacePrograms;
      });
  }

  navigateTo(type, param) {

    const queryParams = { ...this._activatedRoute.snapshot.queryParams };
    // const queryParams = {};

    // if (Object.keys(currentQueryParams).length) {
    //   for (let key in currentQueryParams) {
    //     queryParams[key] = currentQueryParams[key];
    //   }
    // }
    if (queryParams[type] != undefined) {
      if (queryParams[type] == param+"") {
        delete queryParams[type];
      } else {
        queryParams[type] = param;
      }
    } else {
      queryParams[type] = param;
    }
    this._router.navigate(['space-launch-programs'], { queryParams: queryParams })
  }

  updateFilters(queryParams) {
    let filter = {
      launchYears: [],
      successfullLaunch: null,
      successfullLand: null
    };
    // if (queryParams['launch_year']) {
    let launchYears = [...this.filter.launchYears];
    launchYears = launchYears.map((launchYear) => {
      launchYear = { ...launchYear }
      launchYear.active = false;
      if (launchYear.year == queryParams['launch_year']) {
        launchYear.active = true;
      }
      return launchYear;
    });
    filter['launchYears'] = launchYears;
    // }
    // if (queryParams['launch_success'] != undefined) {
    filter['successfullLaunch'] = queryParams['launch_success'] != undefined ? queryParams['launch_success'] : null;
    // } else {
    //   filter['successfullLaunch'] = null;
    // }
    // if (queryParams['land_success'] != undefined) {
    filter['successfullLand'] = queryParams['land_success'] != undefined ? queryParams['land_success'] : null;
    // } else {
    //   filter['successfullLand'] = null;
    // }
    this.filter = filter;
  }
}
